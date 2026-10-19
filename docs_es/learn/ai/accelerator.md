---
icon: lucide/microchip
description: "Operadores NNACC de SF32, funciones de CPU y entorno de inferencia, límites de memoria y evaluación de latencia y energía."
tags:
  - IA
---
# Acelerador de IA { #ai-accelerator }

## Introducción { #introduction }

El **acelerador de IA**, denominado NNACC en el SDK, ejecuta operaciones de redes neuronales compatibles en determinados dispositivos SF32. Permite aplicaciones de **IA en el borde**, con inferencia local en lugar de depender de un servicio en la nube. La reducción de latencia, ocupación de CPU o energía depende del modelo, la ubicación de los datos, la implementación de software y la carga del producto completo.

Los dispositivos vestibles, los equipos de seguimiento de la salud, las pantallas inteligentes, los accesorios de voz, los sistemas de fusión de sensores y los productos AIoT compactos son aplicaciones posibles. Estos equipos alimentados por batería suelen combinar Bluetooth, gráficos, audio, sensores e interacción con el usuario. Delegar en el hardware las operaciones compatibles puede liberar tiempo de CPU para otras tareas, pero la capacidad de respuesta y el ahorro energético deben medirse.

Las funciones de IA disponibles dependen del dispositivo SF32 y del soporte que ofrezca el SDK. Antes de decidir la arquitectura del modelo o la distribución de memoria, consulte la hoja de datos, el manual de referencia y la documentación del SDK del chip elegido.

La información sobre las operaciones CMSIS-NN y los recursos NNACC por dispositivo que se presenta a continuación se basa en la documentación de SiFli-SDK v2.5.1. La guía NNACC de esa versión especifica recursos para SF32LB55x/56x/58x, pero no establece su disponibilidad en SF32LB52x ni SF32LB57x; esa omisión no demuestra que carezcan de NNACC. Las comprobaciones de ventanas de direcciones, el comportamiento de espera y la configuración de GC032A son observaciones de las fuentes HAL o del controlador de esa versión, no garantías universales para todas las revisiones de silicio ni versiones del SDK. La guía y los ejemplos NNACC citados no demuestran que exista un conversor de modelos o un entorno de ejecución de grafos completo, una alternativa automática en CPU ni compatibilidad de captura de cámara para todos los componentes y placas. Antes de cerrar el diseño, verifique la revisión y configuración exactas del SDK, la revisión del chip, el entorno de inferencia y la placa.

Consulte esta página para determinar si una función de IA local encaja en el dispositivo SF32 elegido y cómo repartir la cadena de inferencia entre los sensores, la CPU, la memoria y el acelerador. Para integrar y desplegar modelos, consulte primero el [Resumen de IA](overview.md).

## Por qué importa la IA en el dispositivo { #why-on-device-ai-matters }

Muchos productos embebidos necesitan ofrecer funciones inteligentes sin transmitir continuamente datos sin procesar a un teléfono o servicio en la nube. La IA en el dispositivo puede aportar varias ventajas:

- Potencialmente, menor latencia: la inferencia local puede evitar el trayecto de ida y vuelta al teléfono o a la nube, pero mida en el producto completo la latencia desde la captura del sensor hasta la decisión.
- Mejor privacidad, porque los datos biométricos, de audio o de movimiento brutos pueden permanecer locales.
- Menor tráfico inalámbrico, porque solo es necesario transmitir eventos o resúmenes.
- Mejor comportamiento sin conexión, porque las funciones principales pueden funcionar sin acceso a la red.
- Menor potencia media solo si la función completa consume menos energía durante el mismo intervalo de uso, con precisión y cobertura de detección equivalentes e incluida la sobrecarga de delegar operaciones al acelerador.

En los dispositivos vestibles y AIoT, estos beneficios son concretos. Un reloj puede clasificar gestos, detectar niveles de actividad, supervisar señales de salud, reconocer activadores de voz sencillos o procesar datos de sensores, sin que la pantalla, Bluetooth y el procesador de aplicación pierdan capacidad de respuesta.

Estos beneficios tienen condiciones. El procesamiento local reduce el tráfico inalámbrico solo si el producto evita enviar datos brutos; la privacidad sigue exigiendo almacenamiento adecuado, controles de acceso y protección de los datos transmitidos. Los casos siguientes son posibilidades de diseño, no una afirmación de que el SDK incluya todos los modelos.

## Posición en el sistema SF32 { #position-in-the-sf32-system }

Una cadena simplificada de IA en el borde en SF32 se representa así:

<div align="center"><em>Diagrama: Etapas de procesamiento e inferencia controlada por firmware</em></div>

```text
Sensores / Audio / Cámara
        │
        ▼
Preprocesamiento
  - filtrado
  - segmentación en tramas
  - normalización
  - extracción de características
        │
        ▼
Firmware / entorno de inferencia
  - orquestación del grafo del modelo
  - operaciones compatibles con NNACC
  - otras operaciones en la CPU, si están implementadas
        │
        ▼
Postprocesamiento
  - aplicación de umbrales
  - suavizado
  - detección de eventos
  - decisiones de la aplicación
        │
        ▼
Aplicación, UI, Bluetooth o almacenamiento
```

El acelerador es solo una parte de la cadena completa de IA. El producto también debe adquirir datos, gestionar búferes, preprocesar las entradas, planificar la inferencia, posprocesar los resultados y aplicar la lógica de decisión. Por lo general, se obtiene un mejor rendimiento al diseñar toda la cadena teniendo en cuenta la jerarquía de memoria y los aceleradores disponibles, en lugar de tratar la inferencia como una llamada de función aislada.

## Qué hace el acelerador de IA { #what-the-ai-accelerator-does }

Los aceleradores de IA son útiles porque muchas aplicaciones de redes neuronales repiten los mismos patrones matemáticos miles o millones de veces. Entre ellos se encuentran las convoluciones, las multiplicaciones de matrices, las operaciones vectoriales, las funciones de activación, las operaciones de agrupamiento (pooling) y otras operaciones de aritmética de punto fijo. El hardware dedicado puede ejecutar determinadas operaciones con mayor eficiencia energética que una CPU de propósito general.

Estos son ejemplos de cálculos de redes neuronales, no una lista de operaciones compatibles con NNACC de SF32. La [guía NNACC de SiFli-SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) documenta la aceleración de tres funciones de convolución q7 de CMSIS-NN, incluida la convolución depthwise (por canal), y afirma que la implementación de CMSIS-NN con NNACC es 8 veces más rápida que la implementación ARM DSP de CMSIS-NN. La guía no indica las condiciones de prueba de esta cifra; tómela como una comparación publicada por el proveedor, no como garantía de que reduzca la latencia o el consumo energético del modelo completo. Compruebe cada operador del modelo y su formato numérico frente a la implementación elegida; no suponga que la multiplicación matricial, la activación o el pooling cuentan con aceleración independiente. El SDK también ofrece API HAL para controlar directamente el acelerador, pero no dé por hecho que ninguna de estas interfaces incluya un conversor completo de modelos o un entorno de ejecución del grafo. El firmware o un entorno de inferencia independiente debe coordinar las capas y gestionar los búferes; la ejecución alternativa en CPU también requiere una implementación para los operadores no compatibles.

Los dispositivos SF32 tienen límites de memoria y ancho de banda, así que conviene empezar con un modelo embebido compacto. Compruebe la disponibilidad de NNACC y la compatibilidad de los operadores para la pieza exacta; después, mida la memoria, la latencia y la energía de toda la cadena. No deduzca la compatibilidad únicamente por el nombre de la familia.

Entre las aplicaciones habituales de IA se encuentran:

- Detección de palabras clave o detección simple de eventos de voz.
- Reconocimiento de gestos a partir de datos de acelerómetro y giroscopio.
- Clasificación de actividad y detección de estado de movimiento.
- Fusión de sensores para dispositivos vestibles y de salud.
- Análisis de señales biométricas, dependiendo del soporte de sensores y algoritmos.
- Clasificación sencilla de imágenes o clasificación basada en cámara, en dispositivos con entrada de cámara.
- Detección de anomalías y filtrado local de eventos.

## Roles de la CPU, el acelerador y la memoria { #cpu-accelerator-and-memory-roles }

Para entender el reparto de tareas, considere que la CPU coordina el proceso y que el acelerador ejecuta determinadas operaciones de cálculo intensivo.

<div align="center"><em>Tabla: Roles de la CPU, el acelerador y la memoria</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Componente | Rol típico |
|:----------|:-------------|
| **CPU de aplicación** | Ejecuta la lógica de la aplicación, planifica la inferencia, gestiona los búferes y controla la interfaz de usuario, Bluetooth, almacenamiento y políticas del sistema. |
| **Procesador de bajo consumo** | Puede encargarse de la supervisión continua de sensores o de tareas en segundo plano en los dispositivos donde sea programable por el usuario. |
| **Acelerador de IA** | Ejecuta operaciones compatibles con NNACC; compare el tiempo de CPU y la energía de toda la cadena con la implementación de referencia por software. |
| **DMA / sistema de memoria** | Proporciona acceso a memoria y transferencias cuando están configuradas; no todas las entradas o salidas de NNACC necesitan una copia DMA independiente. |
| **Otros aceleradores** | Los bloques de audio, gráficos, criptografía o procesamiento de sensores pueden contribuir a la cadena completa del producto. |

</div>

El acelerador no sustituye a la CPU ni ejecuta por sí solo cualquier modelo. El firmware sigue preparando entradas, configurando operaciones compatibles, esperando su finalización, procesando resultados y controlando la aplicación. Una operación no compatible solo puede ejecutarse en la CPU si el entorno de inferencia o la aplicación dispone de esa implementación; de lo contrario, el despliegue puede fallar. La presencia de hardware no garantiza una alternativa automática en la CPU.

## Posicionamiento por familia de dispositivos { #device-family-positioning }

Elija el dispositivo según los operadores, el presupuesto de memoria y la carga del producto completo, no según una clasificación general de rendimiento entre familias. La guía del SDK v2.5.1 documenta un NNACC en la HCPU de SF32LB55x y otro en la de SF32LB56x, además de uno en cada subsistema HCPU y LCPU de SF32LB58x. Estos recursos sirven para la selección, pero no garantizan que el modelo completo se ejecute más rápido o consuma menos energía. Verifique la disponibilidad, la memoria accesible y el soporte de software para la referencia y configuración concretas.

<div align="center"><em>Tabla: Posicionamiento por familia de dispositivos</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Familia de dispositivos | Posicionamiento para IA |
|:--------------|:---------------|
| **SF32LB52x** | Considérelo para Bluetooth, audio y HMI básica con coste ajustado; tome una implementación ligera en CPU como referencia salvo que se verifique una aceleración específica. |
| **SF32LB55x** | Adecuado para dispositivos BLE vestibles y productos con numerosos sensores; útil para tareas de detección de bajo consumo y algoritmos compactos. |
| **SF32LB56x** | Considérelo para UI más completas, HMI conectada y cadenas de sensores o multimedia; verifique la configuración elegida y los operadores compatibles con el NNACC de HCPU. |
| **SF32LB57x** | La guía citada no establece la disponibilidad de NNACC para esta familia; verifique el componente, la placa y el soporte de operadores, runtime y memoria del SDK antes de elegirlo para IA. |
| **SF32LB58x** | Considérelo para cargas que combinan IA, gráficos y audio cuando la memoria y los recursos HCPU/LCPU de la referencia elegida cubran los requisitos del producto; verifique operadores, costes de integración y energía medida. |

</div>

Esta tabla sirve de orientación para elegir producto, pero no sustituye a la hoja de datos. Verifique para la referencia elegida la disponibilidad del acelerador, los operadores admitidos, los límites de memoria y las herramientas del SDK.

## Flujo de desarrollo del modelo { #model-development-flow }

El desarrollo habitual de un modelo de IA embebida consta de varias etapas:

1. Entrene o elija un modelo en un equipo de desarrollo con datos representativos.
2. Adapte el modelo a las restricciones del sistema embebido mediante selección, poda, cuantización o cambios de arquitectura.
3. Elija o implemente el entorno de inferencia y la representación del modelo; compruebe la cobertura de operadores y la compatibilidad numérica con los kernels del SDK elegidos. No suponga que la HAL de NNACC incluye un conversor de modelos completos.
4. Valide la precisión numérica después de la conversión y la cuantización.
5. Integre el preprocesamiento, la inferencia y el posprocesamiento en el firmware.
6. Mida y perfile la latencia, el uso de memoria, el consumo y la precisión en el hardware objetivo.
7. Pruebe cargas reales con Bluetooth, pantalla, audio y sensores funcionando en paralelo, incluidas las transiciones de entrada y salida de los estados de bajo consumo previstos.

El error más común es optimizar únicamente la red neuronal y descuidar el resto de la cadena. En muchos productos embebidos, el preprocesamiento, las transferencias de memoria, la temporización de los sensores y el posprocesamiento son tan importantes como el propio acelerador.

## Cuantización y tamaño del modelo { #quantization-and-model-size }

La IA en microcontroladores suele depender de modelos compactos y formatos numéricos eficientes. Los modelos cuantizados, que a menudo usan enteros de 8 bits, pueden reducir la memoria ocupada, el ancho de banda necesario y el coste de cálculo frente a los modelos de coma flotante.

Un modelo de 8 bits no es automáticamente compatible con NNACC. La [configuración de la HAL del SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) utiliza búferes `int8_t` y campos `bias_shift` / `out_shift`. Esto no demuestra compatibilidad con puntos cero arbitrarios, escalas por canal ni todos los operadores int8 actuales. Compruebe la disposición de los tensores, el tratamiento del signo, los desplazamientos y la representación del sesgo frente al kernel concreto; después compare sus salidas con una referencia por software usando entradas representativas y valores límite.

La cuantización implica algunos compromisos:

- Puede mejorar en gran medida la eficiencia.
- Puede reducir el tamaño del modelo y la memoria de tensores.
- Puede reducir la precisión si el modelo no se entrena o calibra cuidadosamente.
- Algunos operadores quizá no tengan una correspondencia directa en el acelerador o en el entorno de ejecución.

Antes de llevar el modelo a producción, mida tanto su precisión como el rendimiento del sistema tras la conversión. Un modelo que funciona bien durante el entrenamiento en un ordenador puede comportarse de otra manera una vez cuantizado, al recibir datos de sensores ruidosos y al integrarse con el preprocesamiento del sistema embebido.

## Consideraciones de memoria y ancho de banda { #memory-and-bandwidth-considerations }

Las tareas de IA pueden exigir mucha memoria aunque el modelo parezca pequeño. El sistema puede necesitar espacio para:

- Pesos del modelo.
- Tensores de entrada.
- Búferes de activación intermedios.
- Tensores de salida.
- Tramas de audio, ventanas de datos de sensores o fotogramas de cámara.
- Búferes de preprocesamiento y posprocesamiento.
- Datos de la interfaz de usuario, Bluetooth y otras aplicaciones que se ejecutan en paralelo.

Según la configuración de SRAM interna, Flash, PSRAM y caché del dispositivo elegido, sitúe los tensores de uso frecuente y los búferes intermedios donde la CPU y el acelerador puedan acceder con eficiencia. Presupueste conjuntamente almacenamiento externo, búferes de trabajo y copias, no solo el tamaño del modelo.

Primero verifique que el NNACC elegido pueda acceder a cada búfer; los datos en Flash o PSRAM externas pueden necesitar copias a búferes de trabajo. Incluya el tiempo de copia, la RAM de trabajo y la energía en el presupuesto. La [implementación de la HAL del SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) redondea los tamaños comprobados a múltiplos de 4 bytes y rechaza un búfer si su inicio y su final comprobado pertenecen a ventanas de direcciones distintas de 1 MiB (1 048 576 bytes). La entrada y el sesgo también deben compartir ventana. Un final situado exactamente en el límite de la siguiente ventana tampoco pasa la comprobación. Planifique las asignaciones según estas reglas y compruebe los errores devueltos antes de iniciar la siguiente operación.

Si la CPU comparte búferes con DMA o NNACC, asigne un único propietario durante cada transferencia u operación. Escriba en memoria las líneas de caché de las entradas modificadas por la CPU antes de que el hardware las lea. Prepare las líneas de caché del destino según el SDK antes de la escritura del hardware, para que las líneas sucias de la CPU no sobrescriban después el resultado. Tras confirmar la finalización, invalide las copias obsoletas de la CPU antes de leer la salida. Alinee los rangos de mantenimiento a líneas completas y evite compartirlas con otros datos en uso. Limpiar una copia antigua de la salida después de que el hardware la escriba puede destruir el resultado; limpiar e invalidar no son operaciones intercambiables.

## Cadenas de audio, sensores y cámara { #audio-sensor-and-camera-pipelines }

La aceleración de IA rara vez funciona sola. Generalmente es parte de una cadena de sensores, audio o cámara.

### Audio y voz { #audio-and-voice }

La detección de voz o eventos de audio puede incluir entrada de micrófono, búferes DMA, división en tramas, filtrado, extracción de características, inferencia y suavizado de resultados. NNACC ejecuta operaciones neuronales compatibles; el firmware o el entorno elegido gestiona el resto del grafo, y la CPU o el subsistema de audio administra las muestras y características. Sigue siendo necesario disponer del modelo y de una implementación de software validada.

Los ejemplos típicos incluyen:

- Detección de palabras clave.
- Detección de palabras de activación, según el soporte del software.
- Clasificación de escena o evento de audio.
- Detección de actividad de voz.

### Movimiento y fusión de sensores { #motion-and-sensor-fusion }

En los dispositivos vestibles, los datos pueden proceder de acelerómetros, giroscopios, sensores de frecuencia cardíaca, sensores de SpO2, circuitos de adquisición de ECG y otros periféricos. La IA puede clasificar estados de movimiento, gestos, patrones de actividad o características de señales relacionadas con la salud.

Agrupe muestras y utilice interrupciones cuando lo permitan la cobertura de detección y la latencia exigidas. Trasladar tareas de fondo adecuadas a un procesador de bajo consumo programable por el usuario puede reducir los despertares de la CPU de aplicación, pero incluya su actividad, el muestreo y los despertares en la comparación. No desactive la adquisición necesaria para detectar el evento.

### Cámara y entrada de imagen { #camera-and-image-input }

La entrada de cámara depende del chip, encapsulado, placa y controlador de captura concretos. El [controlador del sensor GC032A del SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/customer/peripherals/camera/gc032a/drv_gc032a.c) configura una salida DVP de 8 bits o SPI de dos bits; esto no demuestra que ambas rutas de captura funcionen en todos los dispositivos SF32. Antes de elegir la cámara, verifique pines, soporte de captura mediante periféricos o PTM, temporización del sensor y controlador. Las imágenes suelen requerir búferes y ancho de banda mayores que el audio o el movimiento, pero compare las resoluciones y frecuencias reales.

Considere imágenes más pequeñas, regiones de interés, frecuencias de fotogramas menores o un modelo diseñado para sistemas embebidos. Recortar por firmware después de la captura reduce la entrada del modelo, pero no necesariamente el tráfico de la cámara ni el búfer de captura; para reducir esos costes puede ser necesario recortar en el sensor o adquirir menos datos.

## Planificación y gestión de energía { #scheduling-and-power-management }

Las tareas de IA deben planificarse teniendo en cuenta el resto del sistema. Un producto vestible puede necesitar mantener Bluetooth conectado, actualizar la pantalla, capturar audio, leer sensores y ejecutar inferencia sin exceder los objetivos de energía o latencia.

Las buenas prácticas de planificación incluyen:

- Elija inferencia periódica o activada por eventos según la cobertura de detección, el riesgo de omitir eventos y los requisitos de latencia.
- Evite bucles de sondeo cuando las interrupciones o los eventos puedan iniciar el procesamiento.
- Agrupe muestras de sensores cuando los requisitos de latencia lo permitan.
- Limite la latencia desde la entrada hasta la decisión sin acortar la ventana necesaria para una detección fiable.
- Coordine las cargas de trabajo de IA con la actividad de pantalla y Bluetooth.
- Devuelva la CPU y el acelerador a los estados de bajo consumo permitidos tras confirmar la finalización, transferir los búferes y liberar los bloqueos de gestión energética; mantenga activos la adquisición necesaria y otros trabajos pendientes.

Mida la energía de la función completa integrando a lo largo del tiempo la potencia de alimentación medida (tensión de alimentación × corriente); no se limite a la latencia de inferencia. Incluya adquisición, preprocesamiento, copias, aceleración, operaciones alternativas en la CPU, posprocesamiento e intervalos inactivos. Una ejecución más rápida puede reducir la energía activa sin adelantar el reposo; el ahorro depende de las demás cargas del sistema. Compare una cobertura de detección y una precisión equivalentes antes de reducir la frecuencia de inferencia.

En el SDK v2.5.1, el inicio bloqueante de la HAL espera la finalización mediante polling, sin un tiempo límite explícito propio. El modo de interrupción requiere un manejador IRQ operativo y notificación de finalización. Compruebe los errores de inicio, limite la espera en la aplicación y defina la recuperación antes de reutilizar búferes o liberar bloqueos de gestión energética.

## Equilibrio entre precisión, latencia y consumo { #accuracy-latency-and-power-tradeoffs }

El diseño de IA embebida exige equilibrar precisión, latencia y consumo de energía.

<div align="center"><em>Tabla: Compromisos entre precisión, latencia y consumo</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Objetivo | Implicaciones habituales de diseño |
|:-----|:------------------------|
| Mayor precisión | Puede requerir un modelo mayor, más características o una ventana de entrada más larga; valide la mejora real de precisión y el coste de memoria. |
| Menor latencia | Reduzca los retrasos de adquisición, espera y cálculo. Una ventana más corta puede perjudicar la precisión; una tasa de inferencia mayor puede aumentar la energía. |
| Menor consumo | Utilice modelos compactos y una ubicación eficiente; reduzca la frecuencia de inferencia solo si la cobertura de detección lo permite y verifique las políticas de adquisición y reposo. |

</div>

El equilibrio adecuado depende del producto. Un detector de gestos puede tolerar un pequeño retardo si con ello ahorra energía. Un activador por voz puede necesitar una respuesta rápida, pero también debe evitar falsos despertares. Un algoritmo de seguimiento de la salud puede priorizar la robustez y la autonomía a largo plazo frente a una clasificación inmediata.

## Guía práctica de diseño { #practical-design-guidance }

Al planificar un producto de IA en SF32, empiece por el comportamiento del producto en lugar del modelo:

- ¿Qué decisión debe tomar el dispositivo localmente?
- ¿Qué sensores proporcionan los datos de entrada?
- ¿Con qué frecuencia debe ejecutarse la inferencia?
- ¿Qué latencia es aceptable?
- ¿Cuál es el presupuesto máximo de memoria para los pesos del modelo y los tensores?
- ¿Se puede cuantizar el modelo sin perder demasiada precisión?
- ¿Qué operaciones aceleran el chip y el SDK seleccionados?
- ¿Qué sucede cuando Bluetooth, la pantalla, el audio y la inferencia funcionan a la vez?
- ¿Cómo se validará la precisión del modelo con datos reales del producto?
- ¿Cómo actualizará o reemplazará el firmware el modelo en el campo, si es necesario?

Un producto de IA embebida bien diseñado combina un modelo compacto, una recopilación cuidadosa de datos, una asignación de memoria adaptada al hardware, mediciones del rendimiento con cargas de trabajo representativas y una estrategia energética que evita activaciones innecesarias.

## Casos de uso típicos { #typical-use-cases }

Considere la aceleración de IA de SF32 para inferencia local compacta en productos conectados y alimentados por batería cuando los operadores compatibles y el presupuesto medido del sistema lo permitan:

- Reconocimiento de gestos en relojes, pulseras y dispositivos de mano.
- Clasificación de actividad para productos de fitness y salud.
- Detección de eventos de voz o palabras clave para accesorios de audio.
- Algoritmos de fusión de sensores para dispositivos vestibles.
- Análisis de señales biométricas cuando lo permitan los sensores y el software.
- Detección local de anomalías para dispositivos inteligentes.
- Clasificación sencilla de imágenes o eventos activados por la cámara, en dispositivos con entrada de cámara.
- Una HMI que adapta su comportamiento al contexto de uso.

## Conclusiones clave { #key-takeaways }

- NNACC puede delegar operaciones compatibles al hardware y reducir la ocupación de CPU; las ventajas de latencia y energía deben verificarse para la función completa.
- Forma parte de una cadena completa que también incluye sensores, entrada de audio o cámara, preprocesamiento, transferencias de memoria, posprocesamiento y lógica de aplicación.
- El SDK v2.5.1 documenta recursos NNACC en SF32LB55x, SF32LB56x y SF32LB58x, pero no establece su disponibilidad en SF32LB52x ni SF32LB57x; verifique el componente y la carga concretos, sin inferir disponibilidad o ausencia por el nombre de la familia.
- El rendimiento real depende del tamaño y la cuantización del modelo, los operadores compatibles, la ubicación de los datos en memoria, el mantenimiento de la caché, el comportamiento del DMA y el entorno de ejecución del SDK.
- La inferencia local resulta útil si cumple los objetivos de respuesta, funcionamiento sin conexión, privacidad o tráfico inalámbrico del producto; el hardware acelerador por sí solo no garantiza esos beneficios.
