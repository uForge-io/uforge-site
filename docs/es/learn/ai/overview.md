---
icon: lucide/brain-circuit
title: "Resumen de IA"
description: "Guía para ejecutar IA en dispositivos SF32: elección del dispositivo, HAL NNACC, dimensionamiento de memoria y planificación de inferencias según el presupuesto energético."
tags:
  - IA
---

# Resumen de IA { #ai-overview }

## Resumen { #overview }

Esta guía explica cómo implementar IA en el dispositivo con SF32: elegir el dispositivo, preparar el modelo para la ruta de ejecución prevista, dimensionar la memoria y programar las inferencias dentro del presupuesto energético del producto. Presupone los conocimientos de hardware explicados en [Acelerador de IA](accelerator.md). Léalo primero para conocer el papel y los límites del acelerador.

El SDK expone operaciones aceleradas mediante el HAL **NNACC** (acelerador de redes neuronales), con ejemplos separados del [HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/hal/nnacc/README_EN.md) y del [controlador de RT-Thread](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/rt_device/nnacc/README_EN.md). Estos ejemplos validan una operación individual de convolución depthwise (por canal), no el despliegue completo de un modelo entrenado. Utilícelos para comprobar primero una operación; seleccione y verifique por separado el entorno de ejecución, las herramientas de conversión y la implementación de cada capa.

Los detalles de implementación citados a continuación corresponden al SDK v2.5.1. Ni esos detalles ni la disponibilidad de NNACC por familia garantizan la compatibilidad con un componente concreto, un entorno de ejecución o conversor de modelos completos, la compatibilidad de operadores, un fallback automático en CPU ni la entrada de cámara. Verifique estos puntos con la revisión y configuración exactas del SDK, la revisión del chip, el entorno elegido y la placa.

Utilice esta página si es responsable de definir el producto y desplegar una función de IA: qué debe decidir el dispositivo localmente, cuánta memoria y energía puede consumir, y cómo debe responder ante datos reales de los sensores. Complementa el artículo del acelerador, que explica los límites del hardware.

## Defina qué debe decidir el producto localmente { #define-what-the-product-needs-to-decide-locally }

Comience por la decisión de producto, no por el modelo:

- ¿Qué debe clasificar o detectar el dispositivo por sí mismo, sin depender de un teléfono ni de una consulta a la nube?
- ¿Qué sensores aportan datos para esa decisión: movimiento, audio, señales biométricas, cámara o una combinación?
- ¿Con qué frecuencia debe ejecutarse la decisión, y con qué rapidez debe responder?
- ¿Qué sucede si el modelo en el dispositivo se equivoca? ¿Es más costoso un falso positivo o un falso negativo?
- ¿Necesitará el modelo actualizarse alguna vez en el campo, y cómo?

Estas respuestas determinan todo lo demás: el tamaño del modelo, el presupuesto de memoria, la selección del dispositivo y cuánto tiempo puede permanecer en reposo entre inferencias.

## Elija el dispositivo SF32 adecuado { #pick-the-right-sf32-device }

No todos los dispositivos SF32 están orientados a las mismas cargas de trabajo de IA:

<div align="center"><em>Tabla: Criterios para elegir un dispositivo SF32</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Requisito | Orientación para elegir el dispositivo |
|:------------|:-------------------------|
| Clasificación ligera y ocasional en un producto con costos optimizados | SF32LB52x: mantenga los modelos pequeños y priorice su ejecución en CPU. |
| Dispositivo portátil BLE con necesidades básicas de fusión de sensores | SF32LB55x |
| Canalización de sensores o multimedia más rica junto con interfaz de usuario | SF32LB56x |
| IA de borde como función principal: modelos más grandes, entrada de cámara si la admite el dispositivo elegido, o requisitos estrictos de latencia | SF32LB58x |

</div>

Utilice la tabla como punto de partida, no como garantía de que el modelo cabrá o funcionará con eficiencia. Compruebe la memoria, las interfaces de sensores, la instancia del acelerador y el soporte del SDK del componente concreto frente a la carga completa. La [guía NNACC del SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) indica un acelerador en la HCPU de SF32LB55x y otro en la de SF32LB56x, además de uno en cada subsistema HCPU y LCPU de SF32LB58x. La guía no establece si SF32LB52x o SF32LB57x disponen de NNACC; la falta de documentación debe interpretarse como disponibilidad no confirmada, no como prueba de que esas familias carezcan del acelerador. El número de instancias no demuestra compatibilidad del modelo ni eficiencia energética. Consulte [Posicionamiento por familia de dispositivos](accelerator.md#device-family-positioning) para el contexto de selección.

## Flujo de desarrollo del modelo { #the-model-development-workflow }

El despliegue de un modelo en SF32 suele seguir estas etapas, con independencia del caso de uso:

1. **Entrene o seleccione un modelo** en una estación de trabajo, usando datos que realmente se parezcan a lo que el sensor verá en el campo; los datos limpios de laboratorio a menudo se comportan de forma muy diferente a la entrada ruidosa de sensores en condiciones reales.
2. **Redúzcalo para las restricciones embebidas**, mediante la elección de arquitectura, poda o cuantización, antes de abordar la conversión específica del acelerador.
3. **Exporte el modelo y asigne sus operaciones** al entorno de inferencia elegido y a los operadores, disposiciones y formatos numéricos realmente admitidos por el SDK objetivo. La existencia del HAL NNACC no proporciona por sí sola un conversor de modelos completos ni un entorno de ejecución de grafos.
4. **Valide numéricamente** después de la conversión y la cuantización; no asuma que la precisión de escritorio se traslada sin cambios.
5. **Integre** el preprocesamiento, la inferencia y el posprocesamiento en el firmware; el modelo es una llamada de función dentro de una canalización más grande.
6. **Mida y evalúe** la latencia, el uso de memoria, el consumo energético y la precisión en hardware real, no solo en simulación.
7. **Pruebe bajo carga combinada realista**: Bluetooth, pantalla y sensores activos al mismo tiempo que la inferencia, no de forma aislada.

Un error habitual de integración es optimizar el modelo sin medir el preprocesamiento, los búferes y el posprocesamiento. Estas etapas pueden costar tanto como la inferencia acelerada; mida la ruta completa.

## Defina los requisitos de ejecución { #define-the-runtime-contract }

Antes de convertir un modelo, documente los requisitos exactos que debe cumplir el firmware durante la ejecución:

<div align="center"><em>Tabla: Requisitos de ejecución del modelo</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Requisito | Decisión que debe definirse |
|:--------------|:----------------------|
| Forma de entrada | Ventana de muestra, tamaño de imagen, número de canales, disposición del tensor. |
| Formato numérico | Ancho de entero, manejo de escala/punto cero, conjunto de datos de calibración. |
| Conjunto de operadores | Capas que deben ejecutarse en NNACC y capas que pueden ejecutarse como alternativa en CPU (fallback). |
| Objetivo de latencia | Latencia de la canalización de extremo a extremo, no solo el tiempo del acelerador. |
| Techo de memoria | Pesos, activaciones, tensores de entrada/salida, búferes de pre/posprocesamiento. |
| Política de actualización | Si el modelo puede cambiarse mediante OTA y cómo se valida. |

</div>

Los responsables de aprendizaje automático y firmware deben revisar estos requisitos. Si cambia la forma de los tensores, el formato o el conjunto de operadores del modelo sin actualizar el firmware, el problema puede manifestarse como una precisión deficiente o una latencia inestable, en lugar de producir un error de compilación evidente.

## Revise los operadores y las rutas alternativas { #operator-and-fallback-review }

Revise cada operador, sus parámetros y su ruta real de ejecución antes de elegir un modelo. La implementación en CPU o la alternativa automática deben estar expresamente disponibles en el entorno elegido; una operación no admitida también puede impedir el despliegue. Incluso un modelo pequeño puede resultar lento si ejecuta capas frecuentes en CPU o repite conversiones de disposición.

<div align="center"><em>Tabla: Revisión de operadores y rutas de ejecución</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Clase | Significado | Acción |
|:------|:--------|:-------|
| Acelerado | Compatible directamente con la ruta NNACC del dispositivo objetivo. | Preferible para las capas más utilizadas. |
| Alternativa en CPU (fallback) | El entorno elegido o el firmware proporciona una implementación en CPU verificada. | Mida su costo; acéptela solo si la canalización completa cumple sus objetivos. |
| Conversión necesaria | Requiere conversión de disposición, tipo o formato. | Incluya el costo de conversión en el presupuesto de latencia y energía. |
| No admitido | No disponible en el entorno de ejecución objetivo. | Reemplace la capa o cambie la arquitectura del modelo. |

</div>

El criterio de aprobación no es "el modelo se ejecuta". El criterio de aprobación es "la canalización completa cumple los objetivos de precisión, latencia, memoria y energía con la misma distribución de datos que el producto ve en el campo".

## Cuantización y presupuesto de memoria { #quantization-and-memory-budgeting }

Los modelos compactos y cuantizados son habituales en IA para microcontroladores, a menudo con enteros de 8 bits en lugar de punto flotante. Elija el formato numérico admitido por la ruta real de ejecución. Antes de fijar la arquitectura, dimensione la memoria para todos estos elementos, no solo para los pesos:

<div align="center"><em>Tabla: Elementos del presupuesto de memoria y cuantización</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Elemento que consume memoria | Notas |
|:------------------|:------|
| Pesos del modelo | Reducidos significativamente por la cuantización, pero siguen siendo la huella base. |
| Tensores de entrada | Dimensionados por la ventana del sensor, la resolución de imagen o la longitud del cuadro de audio. |
| Activaciones intermedias | Fáciles de subestimar; pueden exceder el tamaño de los pesos para algunas arquitecturas. |
| Tensores de salida | Generalmente pequeños, pero no los olvide al calcular el presupuesto. |
| Búferes de pre/posprocesamiento | El filtrado, la segmentación en tramas, la extracción de características y la aplicación de umbrales necesitan memoria de trabajo. |
| Memoria de otras funciones simultáneas | Los búferes de la interfaz de usuario, Bluetooth y audio compiten al mismo tiempo por la misma SRAM/PSRAM. |

</div>

La cuantización puede reducir memoria y cómputo, pero vuelva a comprobar la precisión tras la conversión con datos representativos de los sensores. La guía del SDK v2.5.1 documenta aceleración para `arm_convolve_1x1_HWC_q7_fast_nonsquare`, `arm_convolve_HWC_q7_basic_nonsquare` y `arm_depthwise_separable_conv_HWC_q7_nonsquare`. La [configuración del HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) utiliza búferes de 8 bits y desplazamientos del sesgo y de la salida; esto no demuestra que los puntos cero y las escalas por canal de cualquier modelo int8 moderno sean directamente compatibles. Verifique la equivalencia numérica y defina, para cada capa no admitida, una implementación en CPU, una conversión o el rechazo del despliegue.

## Ubicación de búferes y jerarquía de memoria { #buffer-placement-and-the-memory-hierarchy }

El ancho de banda de memoria puede limitar la IA aunque haya capacidad de cómputo disponible. En dispositivos SF32 con SRAM, Flash, PSRAM y cachés de instrucciones/datos de STAR-MC1, compruebe la accesibilidad de la memoria y el costo de ubicar cada búfer:

- Sitúe tensores y búferes intermedios de uso frecuente en memoria accesible tanto para la CPU como para la instancia del acelerador elegida, respetando la alineación y la disposición requeridas.
- Mantenga pesos grandes o recursos de uso ocasional en memoria externa solo si la ruta de ejecución admite esa ubicación. Si deben copiarse a memoria accesible para el acelerador, incluya la copia en los presupuestos de memoria, latencia y energía.
- Durante una transferencia, solo la CPU o el acelerador/DMA debe tener el control del búfer compartido. Antes del acceso del hardware, prepare todo el rango alineado a líneas de caché: limpie las líneas de caché que contienen datos de entrada escritos por la CPU y gestione las líneas modificadas del búfer de salida según las reglas del SDK para escrituras del dispositivo. Espere a que termine la transferencia antes de invalidar la salida y devolver el control a la CPU. No modifique el búfer ni otros datos que compartan sus líneas de caché mientras el hardware los utilice.

La [implementación del HAL v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) comprueba que los búferes no crucen límites de ventanas de direcciones de 1 MiB (1 048 576 bytes) y que la entrada y el sesgo estén en la misma ventana. Verifique las direcciones asignadas, no solo la memoria libre total. El inicio bloqueante espera la finalización mediante sondeo; la ruta por interrupciones exige gestionar correctamente la IRQ y notificar la finalización. Compruebe los valores de retorno y defina una recuperación ante fallos y esperas acotadas en la aplicación, sin presuponer un tiempo límite en el entorno del modelo.

Consulte [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization) para consideraciones de caché y sistema de memoria en este tipo de patrón de acceso mixto.

## Hoja de cálculo para dimensionar la memoria { #memory-sizing-worksheet }

Utilice una hoja de trabajo de memoria antes de la integración del firmware. Complétela con cifras del peor caso, no con estimaciones promedio:

<div align="center"><em>Tabla: Hoja de cálculo para dimensionar la memoria</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Búfer | Factor que determina el tamaño | Ubicación recomendada |
|:-------|:------------|:---------------------|
| Ventana de entrada sin procesar | Frecuencia de muestreo × canales × duración de la ventana × bytes por muestra, más relleno de la disposición | Memoria accesible por DMA si captura un periférico. |
| Espacio de trabajo de preprocesamiento | Filtros, FFT/MFCC, normalización, redimensionado/recorte | SRAM rápida cuando se reutiliza en cada inferencia. |
| Pesos del modelo | Tamaño del modelo cuantizado | Flash/PSRAM si el entorno de ejecución lo admite; SRAM solo para las secciones de uso frecuente. |
| Activaciones | Los tensores intermedios más grandes | Memoria rápida accesible para el acelerador. |
| Salida/posprocesamiento | Clases, cajas, puntuaciones, estado de suavizado | SRAM; generalmente pequeño pero sensible a la latencia. |
| Búferes de coexistencia | Audio, pantalla, Bluetooth, registro de eventos | Presupueste el uso simultáneo, no solo después de que la IA "quepa". |

</div>

Deje margen para la pila, el heap, los objetos de RTOS, el registro de eventos y OTA. Un modelo que solo cabe cuando todos los demás subsistemas están deshabilitados no es un modelo listo para producto.

## Construcción de la canalización completa { #building-the-full-pipeline }

El acelerador es una etapa de la canalización que va del sensor a la decisión. A continuación se describen tres rutas de entrada habituales.

### Audio y voz { #audio-and-voice }

La detección de palabras clave, los disparadores basados en palabras de activación y la clasificación de eventos de audio requieren capturar el micrófono, dividir la señal en tramas y extraer características antes de iniciar la inferencia. El [Resumen del audio local](../audio/overview.md) explica la captura y la gestión de búferes de esta canalización; el acelerador solo resulta útil si el audio de entrada se captura y almacena en búfer de forma eficiente desde el principio.

### Movimiento y fusión de sensores { #motion-and-sensor-fusion }

El reconocimiento de gestos, la clasificación de actividad y el análisis biométrico suelen usar datos del acelerómetro, el giroscopio u otros sensores. Mida por separado el funcionamiento del sensor, la captura, el preprocesamiento y la inferencia antes de decidir qué domina el consumo. Agrupar muestras y capturar por interrupciones puede reducir despertares si lo permiten la latencia y la cobertura de señales; no siempre compensan el costo del modelo. Consulte el [Resumen del diseño de bajo consumo](../low-power/overview.md#ai-and-sensor-power-tuning).

### Cámara e imágenes { #camera-and-image-input }

La entrada de cámara puede imponer costos importantes de captura, búferes, ancho de banda e inferencia. La carga real depende de la resolución, la frecuencia de fotogramas, el funcionamiento del sensor y el modelo. Si la precisión lo permite, reduzca la imagen o procese una región de interés. Elija un modelo para restricciones embebidas, sin asumir que un modelo de visión para escritorio puede desplegarse sin cambios.

## Planificación de inferencias según el consumo energético { #power-aware-inference-scheduling }

Elija la planificación para cumplir la cobertura de detección y el tiempo de respuesta. La inferencia periódica es válida cuando el producto necesita decisiones regulares; condicionar la ejecución a eventos solo es útil si no se pierden señales necesarias.

- Cuando resulte adecuado, inicie la inferencia con datos nuevos y útiles, como un umbral de sensor o una trama de audio completa. Mantenga el procesamiento periódico cuando sea necesario y verifique los falsos negativos y el peor tiempo de respuesta tras cambiar el disparador.
- Agrupe muestras donde los requisitos de latencia lo permitan, en lugar de ejecutar muchas inferencias pequeñas.
- Cuando el dispositivo y el SDK lo permitan, ejecute la detección ligera y permanente en el procesador de bajo consumo, en vez de activar la CPU principal de la aplicación con cada muestra.
- Mida la **energía por inferencia** integrando la potencia de alimentación medida (tensión de alimentación × corriente) durante un intervalo definido. Incluya captura, pre/posprocesamiento y transiciones de activación/reposo en el presupuesto de la función. Procesar más rápido puede reducir la energía activa o permitir un reposo más temprano, pero el beneficio depende de la corriente, el tráfico de memoria y el resto del sistema.

La guía de consumo energético a nivel de sistema está en el [Resumen del diseño de bajo consumo](../low-power/overview.md). Consúltelo junto con este artículo para cualquier función de IA que deba ejecutarse de forma continua o casi continua.

## Equilibrio entre precisión, latencia y consumo energético { #the-accuracy-latency-power-tradeoff }

Estas son implicaciones habituales para el diseño, no relaciones fijas. Mida la precisión real del modelo y la energía de la canalización completa al tomar estas decisiones:

<div align="center"><em>Tabla: Equilibrio entre precisión, latencia y consumo energético</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Prioridad | Implicaciones habituales para el diseño |
|:---------|:--------------------------|
| Mayor precisión | Modelo más grande, más características de entrada, ventana más larga, más memoria. |
| Menor latencia | Ventanas de captura más cortas, ejecución más rápida o decisiones más frecuentes; verifique las consecuencias sobre precisión y energía. |
| Menor energía | Inferencias menos frecuentes, modelo compacto, ubicación eficiente en memoria y periodos de reposo más largos entre ejecuciones. |

</div>

Antes de ajustar el sistema, defina qué debe priorizar el producto. Un detector de gestos puede admitir un pequeño aumento de latencia para prolongar la autonomía; un disparador de voz suele necesitar una respuesta rápida y debe evitar activaciones falsas que desperdicien energía.

## Actualización del modelo y validación en campo { #model-update-and-field-validation }

Si la función de IA puede mejorar después del lanzamiento, diseñe el mecanismo de actualización del modelo desde el principio:

- Cuando sea posible, versione el modelo por separado del firmware y registre en el paquete del modelo la especificación de entrada prevista.
- Verifique la autenticidad, la integridad y la compatibilidad con el entorno de ejecución y la entrada antes de activar el paquete. La activación debe tolerar actualizaciones interrumpidas y permitir volver a una versión válida si falla la comprobación de arranque.
- Almacene la calibración, los umbrales y las constantes de posprocesamiento junto con la versión del modelo que los requiere.
- Registre suficientes estadísticas de campo para diagnosticar la deriva sin almacenar innecesariamente datos brutos y privados de sensores.
- Vuelva a ejecutar las pruebas de energía y coexistencia después de cada actualización de modelo; una mejora en la precisión del modelo puede seguir siendo una regresión del producto si hace que el sistema despierte con más frecuencia.

## Diagnóstico del rendimiento y la precisión de la IA { #debugging-ai-performance-and-accuracy }

<div align="center"><em>Tabla: Diagnóstico del rendimiento y la precisión de la IA</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Síntoma | Aspecto que conviene revisar |
|:--------|:----------------------|
| El modelo se ejecuta pero la precisión cae frente a los resultados de la estación de trabajo | Desajuste de cuantización/calibración, o datos de entrenamiento no representativos del ruido real del sensor. |
| La inferencia es más lenta de lo esperado | Ejecución real de capas en CPU, conversión de disposición, ancho de banda de memoria o competencia por la planificación. |
| El sistema nunca alcanza el nivel de bajo consumo esperado | Despertares innecesarios, controladores/relojes activos, bloqueos de gestión de energía o una operación del acelerador sin finalizar. |
| La función funciona de forma independiente pero falla en el producto completo | No se probó bajo carga combinada (Bluetooth + pantalla + sensores activos juntos). |
| Alto consumo a pesar de un modelo "rápido" | Se mide la latencia en lugar de la energía por inferencia; la ruta de códec/sensor se dejó activa entre ejecuciones. |
| Salida intermitente incorrecta en búferes compartidos | Preparación de líneas de caché, líneas modificadas, reutilización prematura, falta de finalización o acceso simultáneo de CPU y hardware. |

</div>

## Errores comunes { #common-mistakes }

- Elegir la arquitectura del modelo antes de comprobar qué operadores acelera realmente el entorno de ejecución objetivo.
- Portar un modelo de escala de escritorio en lugar de diseñar para las restricciones embebidas desde el principio.
- Ignorar el costo de memoria de las activaciones intermedias y presupuestar solo los pesos del modelo.
- Ejecutar inferencias sin comprobar que la frecuencia y el disparador cumplen la cobertura de entrada y el tiempo de respuesta requeridos.
- Validar la precisión solo con datos limpios de laboratorio, nunca con ruido realista de campo/sensor.
- Probar la función de IA de forma aislada y descubrir problemas de coexistencia solo después de la integración completa del producto.
- Optimizar la latencia del modelo mientras se ignoran las etapas de pre y posprocesamiento a su alrededor.

## Lista de comprobación para la puesta en marcha { #bring-up-checklist }

- [ ] Defina la decisión local que el producto necesita tomar y la compensación aceptable de latencia/precisión/energía.
- [ ] Seleccione el dispositivo SF32 según el tamaño del modelo y las necesidades de memoria, no solo el objetivo de costo.
- [ ] Construya y valide la canalización completa (captura -> preprocesamiento -> inferencia -> posprocesamiento) primero con un modelo de prueba mínimo, luego con el modelo de producción.
- [ ] Convierta y cuantice el modelo real, luego valide la precisión con datos de sensor realistas.
- [ ] Presupueste la memoria para los pesos, los tensores de entrada/salida y las activaciones intermedias en conjunto.
- [ ] Valide el manejo de coherencia de caché para cualquier búfer compartido entre CPU/acelerador.
- [ ] Valide la planificación periódica o por eventos frente a la cobertura de detección, la peor latencia y el presupuesto energético medido.
- [ ] Perfile la energía por inferencia bajo carga combinada del sistema (Bluetooth, pantalla, sensores activos).
- [ ] Vuelva a validar la precisión y la energía después de cualquier cambio de cuantización, modelo o planificación.

## Conclusiones clave { #key-takeaways }

- Comience por la decisión de producto y los datos del sensor, no por la arquitectura del modelo; el modelo es una etapa en una canalización más grande.
- Utilice el posicionamiento de familias para preseleccionar y verifique después el componente, el SDK, la asignación de operadores, la memoria y la carga simultánea.
- Presupueste la memoria para toda la canalización (pesos, tensores, activaciones, búferes de pre/posprocesamiento), no solo el tamaño del archivo del modelo.
- Elija inferencias periódicas o por eventos que conserven la cobertura necesaria y mida la energía de la función completa, sin tratar la velocidad del modelo como un resultado de consumo.
- Pruebe la precisión con datos de campo realistas y pruebe la función completa bajo carga combinada del sistema, no de forma aislada.
