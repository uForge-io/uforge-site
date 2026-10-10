---
icon: lucide/cpu
description: "Introducción a la CPU STAR-MC1 de Arm China basada en Armv8-M Mainline, su relación de modelo de software con Cortex-M33 y sus implicaciones para el firmware SF32."
tags:
    - Arquitectura
---
# STAR-MC1 { #star-mc1 }

## Introducción { #introduction }

**STAR-MC1** es una IP de CPU de Arm China basada en **Armv8-M Mainline**, el perfil de arquitectura que también utiliza Cortex-M33. Esto ofrece un modelo de software Armv8-M familiar, pero no garantiza que el firmware para Cortex-M33 pueda reutilizarse sin cambios. Las extensiones arquitectónicas opcionales, la configuración del núcleo, los periféricos del SoC, la configuración de arranque y del enlazador, y la compatibilidad del SDK pueden variar. Use el software para Cortex-M33 como punto de partida de una portabilidad y valídelo con el dispositivo y el SDK de destino.

En los dispositivos SF32 que incorporan STAR-MC1, la documentación de SiFli puede denominar a la CPU de aplicación **Arm Cortex-M33**, **Cortex-M33 STAR-MC1** o, simplemente, **STAR-MC1**, según el contexto y el nivel de detalle. Estas denominaciones, por sí solas, no confirman las funciones opcionales del núcleo ni la configuración exacta del SoC; para elegir un componente, consulte la documentación de cada referencia candidata.

Lea esta página cuando ya conozca la familia Arm Cortex-M y necesite posicionar correctamente STAR-MC1 en términos de software, rendimiento o selección de componentes. Explica qué se mantiene familiar, qué puede variar según la implementación del SoC y por qué STAR-MC1 no debe considerarse un sustituto directo del Cortex-M7.

Aquí, compatibilidad significa compartir el modelo de software arquitectónico de Armv8-M, no que una imagen de firmware pueda sustituirse directamente. Antes de reutilizar firmware, compruebe las funciones del núcleo, las opciones del compilador, el código de arranque, la distribución de memoria del enlazador, la asignación de interrupciones, los controladores de periféricos y la configuración de seguridad del SoC y SDK de destino.

## Posicionamiento para desarrolladores { #positioning-for-developers }

No conviene entender STAR-MC1 como **un procesador fijo situado entre Cortex-M33 y Cortex-M7**. Es una IP de CPU **Armv8-M Mainline** configurable y compatible con Cortex-M33. Su valor está en combinar el modelo de software de MCU conocido con funciones opcionales de memoria y aceleración —como caché, memoria estrechamente acoplada (TCM), instrucciones DSP, una interfaz de coprocesador y TrustZone— cuando las implementa el SoC final.

<div align="center"><em>Tabla: Dónde encaja STAR-MC1 en la familia Cortex-M</em></div>

<div align="center" markdown>

| Si parte de | Qué sigue siendo familiar en STAR-MC1 | La diferencia práctica | No dé por hecho que |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | El desarrollo bare-metal y con RTOS, las interrupciones, el DMA y el trabajo de drivers de periféricos. | STAR-MC1 usa el modelo de software Armv8-M más reciente y puede exponer opciones de memoria y aceleración más potentes. | Los binarios de Cortex-M4, las suposiciones de Armv7E-M o las mismas funciones de depuración/seguridad se apliquen sin cambios. |
| Cortex-M33 | Modelo de programación, excepciones y herramientas Armv8-M. | La implementación del SoC puede ofrecer más margen en el sistema de memoria para cargas que usan intensivamente Flash/PSRAM, la interfaz de usuario, el audio o la conectividad. | Todos los dispositivos basados en STAR-MC1 tengan habilitados caché, TCM, DSP, FPU, CDE o TrustZone. |
| Cortex-M7 | La necesidad de gestionar la ubicación de la memoria, el comportamiento de la caché, la coherencia del DMA y la latencia en tiempo real. | STAR-MC1 mantiene una base Armv8-M de clase MCU y está orientado a diseños IoT flexibles con un consumo ajustado. | Sea un sustituto directo del Cortex-M7 o tenga el mismo rendimiento, sistema de memoria y ecosistema de software. |

</div>

Para un proyecto SF32, seleccione el dispositivo por su memoria, periféricos y soporte de SDK documentados, no únicamente por la etiqueta STAR-MC1. El material público de STAR-MC1 describe Armv8-M e identifica la caché, TCM, DSP, las interfaces de coprocesador y TrustZone como posibles funciones. La documentación del SoC debe confirmar cuáles están implementadas y habilitadas en cada producto.

## Por qué importa STAR-MC1 { #why-star-mc1-matters }

Los MCU Cortex-M33 tradicionales son excelentes para el control embebido seguro y de bajo consumo, pero los productos conectados modernos a menudo necesitan algo más que lógica de control. Los wearables, las pantallas inteligentes, los productos de audio Bluetooth y los dispositivos de IA en el borde también pueden requerir interfaces de usuario ágiles, más memoria externa, procesamiento de señales y transferencias frecuentes de datos gráficos o de audio.

STAR-MC1 puede atender estas cargas mediante cachés, TCM e instrucciones personalizadas opcionales, cuando el SoC las implementa y el software las utiliza eficazmente. Estas funciones pueden reducir las esperas de memoria o acelerar operaciones concretas sin abandonar el modelo de desarrollo de MCU. Verifique las ventajas de rendimiento y consumo de energía en el dispositivo final con cargas representativas; ninguna está garantizada por el nombre del núcleo.

## Comparación de la familia Cortex-M { #cortex-m-family-comparison }

La siguiente tabla resume dónde encaja STAR-MC1 entre los procesadores Cortex-M comunes. Las capacidades exactas dependen de la implementación final del SoC, pero el posicionamiento es útil al elegir una arquitectura para un producto.

Para abreviar, la tabla usa `CM3`, `CM4`, `CM33`, `CM55` y `CM7` para los procesadores Cortex-M correspondientes.

<div align="center"><em>Tabla: Comparación de la familia Cortex-M</em></div>

<div align="center" markdown>

| Característica | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Arquitectura Arm | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| Pipeline | 3 etapas, ejecución en orden | 3 etapas, ejecución en orden | 3 etapas, ejecución en orden | Ejecución en orden; número de etapas no especificado en el TRM público | 4 etapas, ejecución en orden; 5 etapas con Helium | 6 etapas, superescalar |
| Interfaz de bus de sistema principal | 3 × AMBA AHB-Lite (Harvard) | 3 × AMBA AHB-Lite (Harvard) | 2 interfaces AMBA 5 AHB5: C-AHB + S-AHB | 2 interfaces AMBA 5 AHB5: C-AHB + S-AHB | AMBA 5 AXI5 de 64 bits; interfaz AHB de 32 bits para periféricos; interfaz esclava AHB de 64 bits para TCM | AMBA 4 AXI de 64 bits; interfaz AHB de 32 bits para periféricos; interfaz esclava AHB de 32 bits para TCM |
| Soporte TrustZone | No | No | Opcional; depende del SoC | Opcional; depende del SoC | Opcional; depende del SoC | No |
| Instrucciones DSP | Sin extensión DSP dedicada | Extensión DSP nativa | Extensión DSP opcional | Extensión DSP opcional | Extensión DSP nativa; Helium (MVE) opcional | Extensión DSP nativa |
| Arm Helium (MVE) | No soportado | No soportado | No soportado | No soportado | Opcional; MVE de enteros o de punto flotante, según configuración | No soportado |
| Unidad de punto flotante | Sin función nativa en la IP | Precisión simple opcional | Precisión simple opcional | Precisión simple opcional | FP16/FP32/FP64 escalar opcional; FP16/FP32 vectorial opcional | Precisión simple/doble opcional |
| I-cache / D-cache | No incluidos en la IP del procesador; el SoC puede añadir caché fuera de esa IP | No incluidos en la IP del procesador; el SoC puede añadir caché fuera de esa IP | No incluidos en la IP del procesador; el SoC puede añadir caché fuera de esa IP | Opcionales en la IP; su presencia y configuración dependen de la implementación | Opcionales en la IP; su presencia y configuración dependen de la implementación | Opcionales en la IP; su presencia y configuración dependen de la implementación |
| Instrucciones personalizadas Arm / CDE | Sin función nativa en la IP | Sin función nativa en la IP | Arm define la codificación de CDE; el SoC define las operaciones y rutas de datos personalizadas; CDE entero opcional y CDE de punto flotante dependiente de la FPU/configuración | El TRM de STAR-MC1 describe los módulos GPR CDE y FPCDE; la implementación y disponibilidad en el producto dependen de la configuración del SoC | Arm define la codificación de CDE; el SoC define las operaciones y rutas de datos personalizadas; opcional desde r1, no disponible en r0 | Sin función nativa en la IP |
| Compatibilidad de software | Base | Compatible con CM3 | Modelo de software Armv8-M; requiere herramientas Armv8-M | Compatible con CM33 | Compatible con CM33; Helium requiere soporte de la cadena de herramientas Armv8.1-M | Compatible con CM4 (misma familia Armv7E-M) |
| Referencia de CoreMark/MHz* | 3,34 | 3,42 | 4,02 | 4,02† | 4,20 | 5,01 |
| Demanda de potencia relativa (cualitativa)‡ | Muy baja | Baja | Baja | Baja | Media | Alta |
| Perfil de cómputo (cualitativo) | Control escalar de bajo consumo | DSP escalar en tiempo real | MCU escalar seguro y configurable | CPU escalar compatible con CM33; la caché, la TCM y las instrucciones personalizadas implementadas por el SoC pueden mejorar el rendimiento a nivel de sistema | DSP/ML vectorial cuando Helium está habilitado | Alto rendimiento escalar y ancho de banda de memoria |
| Aplicaciones típicas sugeridas | Control de baja complejidad y nodos de sensores sencillos | Control de motores, DSP de audio y procesamiento de sensores | Dispositivos conectados seguros y control IoT | Wearables con interfaces de usuario avanzadas, audio Bluetooth y productos IoT basados en Flash/PSRAM | Fusión de sensores mediante ML, voz/audio, visión y DSP | HMI con buena respuesta, control de alto rendimiento y redes |

</div>

\* Estas cifras de referencia proceden de la [tabla comparativa Cortex-M de Arm, versión 2020](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431). No son puntuaciones actuales universales ni una clasificación directa de SoC terminados: el compilador, el sistema de memoria, la configuración de caché y la configuración del benchmark afectan el resultado.

† STAR-MC1 usa aquí la cifra de referencia de CM33 porque es compatible con CM33. Esta es una base de comparación, no un resultado de STAR-MC1 publicado por Arm o medido.

‡ Esta es una guía de posicionamiento arquitectónico, no datos de silicio medidos. El consumo real depende de la tecnología de proceso, el voltaje, la frecuencia, la arquitectura de memoria, las funciones habilitadas, los periféricos, el ciclo de trabajo del firmware y la implementación final del SoC.

Las filas de pipeline y bus resumen el pipeline de ejecución principal y la interfaz de memoria de sistema de cada IP. CM33 y STAR-MC1 comparten la disposición de bus C-AHB/S-AHB. La caché y otras funciones de memoria opcionales son independientes de esa interfaz de bus, y su disponibilidad depende de la configuración y la implementación del SoC. Esto no es una afirmación sobre las interfaces habilitadas en cada SoC terminado. Los puertos de depuración, trazado, coprocesador y otros puertos opcionales no se listan.

Referencias de IP de procesador de Arm: [hoja de datos de CM3](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14), [documentación de CM4](https://support.arm.com/compute-ip/cortex-m4), [manual de referencia técnica de CM33](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954), [hoja de datos de CM55](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5) y [hoja de datos de CM7](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf), y el [manual técnico de STAR-MC1](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).

## Mejoras arquitectónicas { #architectural-enhancements }

STAR-MC1 se construye sobre Cortex-M33 en lugar de reemplazarlo. Las adiciones más importantes son mejoras a nivel de implementación que ayudan al núcleo a pasar menos tiempo esperando por la memoria y más tiempo ejecutando trabajo útil.

### Cachés de instrucciones y datos { #instruction-and-data-caches }

La disponibilidad y configuración de la caché de instrucciones (**I-cache**) y la caché de datos (**D-cache**) dependen de la implementación del SoC. Cuando estén implementadas y habilitadas, resultan especialmente valiosas en sistemas que ejecutan código desde Flash externa, acceden a PSRAM o ejecutan pilas de interfaz de usuario y middleware más grandes.

Los principales beneficios son:

- Lectura de instrucciones más rápida desde memorias distintas de la SRAM.
- Menor latencia promedio de acceso a datos.
- Mejor rendimiento para gráficos, audio, pilas de protocolo y frameworks de interfaz de usuario.
- Menor presión sobre el bus de memoria cuando se reutiliza el mismo código o datos.

Los drivers que comparten búferes cacheables con DMA, controladores de pantalla, interfaces de audio u otros maestros de bus deben seguir las reglas del SDK o RTOS cuando el hardware no garantiza la coherencia. Antes de que un periférico lea datos escritos por la CPU, limpie la caché para escribirlos en memoria. Prepare el búfer receptor antes de una escritura DMA e invalide las líneas obsoletas después de completar la transferencia y antes de que la CPU lea el resultado. La CPU no debe acceder al búfer mientras lo controle el DMA. Reserve líneas de caché completas sin compartirlas con datos ajenos y respete las comprobaciones de finalización y las barreras de memoria de la plataforma. Los búferes no cacheables o coherentes por hardware también requieren sus propias reglas de sincronización. Consulte [PSRAM y otros tipos de memoria](psram-and-memory-types.md#caches-and-external-memory-execution) para los detalles de propiedad del búfer y los riesgos de las líneas sucias.

### Extensión de ruta de datos personalizada Armv8-M { #armv8-m-custom-datapath-extension }

En la IP, Arm define la codificación de las instrucciones CDE y el diseñador del SoC define las operaciones y rutas de datos personalizadas. CM33 admite CDE entero opcional; el CDE de punto flotante depende de la FPU y de la configuración. El TRM de STAR-MC1 describe los módulos GPR CDE y FPCDE, pero esa descripción de la IP no confirma que CDE esté disponible en un dispositivo SF32 o SDK concretos. Las notas de la versión [v2.5.1 de SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1) registran una corrección de la habilitación accidental de CDE en SF32LB57x; confirme el soporte en el dispositivo y SDK exactos antes de depender de esta función. CM55 ofrece CDE opcional desde r1, pero no en r0. CP0–CP7 son espacios de codificación asignados a coprocesadores o CDE; no representan ocho instrucciones personalizadas ni ocho aceleradores adicionales. Confirme también la revisión del núcleo, los módulos implementados y el soporte del compilador y SDK. Consulte la [hoja de datos de CM33](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf), las [notas sobre revisiones de CDE de CM55](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips) y los capítulos B7/B8 del TRM de STAR-MC1.

Esto puede ser útil para cargas de trabajo como:

- Procesamiento digital de señales.
- Criptografía.
- Primitivas de visión por computadora.
- Rutinas de cálculo de aprendizaje automático.
- Cálculos de fusión de sensores.

CDE no acelera automáticamente todas las aplicaciones. El software debe utilizar las funciones del compilador, las bibliotecas o los componentes de SDK del proveedor que generen las instrucciones personalizadas pertinentes. Cuando el SoC y la pila de software admiten CDE, este ofrece una vía clara para acelerar funciones específicas de la aplicación sin trasladar la carga de trabajo a un procesador de aplicación independiente.

### Optimización del sistema de memoria { #memory-system-optimization }

Muchas cargas de trabajo de MCU modernas están limitadas no solo por la frecuencia de la CPU, sino también por la latencia y el ancho de banda de la memoria. Por ello, el diseño del sistema de memoria de STAR-MC1 y las funciones de caché que el SoC implemente y habilite son importantes para los dispositivos de clase SF32, donde las aplicaciones pueden combinar SRAM interna, Flash en el mismo encapsulado, PSRAM, búferes de pantalla y DMA de periféricos.

Las mayores ganancias suelen aparecer cuando:

- El código se ejecuta desde Flash o memoria externa en lugar de SRAM estrechamente acoplada.
- Los frameworks de interfaz de usuario acceden repetidamente a datos de imágenes, fuentes o diseño.
- Las tareas de audio, Bluetooth, gráficos y aplicación se ejecutan concurrentemente.
- El conjunto de trabajo cabe bien en la caché.

Los bucles puramente limitados por CPU que ya se ejecutan desde SRAM rápida pueden mostrar una mejora menor.

## Características de rendimiento { #performance-characteristics }

STAR-MC1 no debe describirse como una mejora automática de métricas de benchmark sintéticas pequeñas de CPU como **CoreMark/MHz** o **DMIPS/MHz**. Esos benchmarks miden principalmente cargas de trabajo compactas de enteros y suelen ser lo suficientemente pequeños como para ejecutarse desde memoria local rápida. En esa situación, las cachés de instrucciones y datos pueden ofrecer poca o ninguna mejora visible frente a una implementación estándar de clase Cortex-M33.

STAR-MC1 es un núcleo compatible con Cortex-M33 con un subsistema de memoria configurable y aceleración opcional para cargas específicas. Estas funciones pueden ayudar cuando la aplicación está limitada por los accesos a memoria, la latencia de Flash o PSRAM externas, los recursos gráficos, las pilas de protocolos o el acceso repetido a conjuntos grandes de código y datos. La ventaja depende de las funciones implementadas y de cómo las utilice la aplicación.

<div align="center"><em>Tabla: Características de rendimiento</em></div>

<div align="center" markdown>

| Tipo de carga de trabajo | Beneficio esperado de STAR-MC1 | Motivo |
|:--------------|:--------------------------|:----|
| Bucles pequeños tipo CoreMark/DMIPS | Generalmente limitado | El conjunto de trabajo es pequeño y puede ya caber en memoria rápida. |
| Código que se ejecuta desde Flash o PSRAM | Suele mejorar | Si el SoC implementa y habilita la I-cache, puede reducir las esperas de lectura de instrucciones. |
| Interfaz de usuario, gráficos y middleware con uso intensivo de datos | Suele mejorar | Si el SoC implementa y habilita la D-cache, puede reducir la latencia de los accesos repetidos a datos. |
| Cargas de periféricos con uso intensivo de DMA | Depende del diseño del software | Los búferes cacheables sin coherencia por hardware requieren mantenimiento de caché; todos necesitan control de propiedad y sincronización. |
| Rutinas de cálculo con CDE | Posible mejora | Las instrucciones personalizadas pueden acelerar operaciones seleccionadas. |

</div>

## Qué significa esto para los desarrolladores de SF32 { #what-this-means-for-sf32-developers }

Para desarrollar firmware SF32, trate STAR-MC1 como un procesador de aplicación compatible con Cortex-M33. Evalúe las funciones de memoria y aceleración implementadas según los requisitos de código, datos y temporización de la aplicación.

En la práctica:

- Trate el firmware para Cortex-M33 como punto de partida para portar el código fuente, no como una imagen intercambiable; confirme la configuración del dispositivo y la compatibilidad del SDK antes de reutilizarlo.
- Los conceptos de RTOS, interrupciones, privilegios, TrustZone y depuración siguen siendo familiares para los desarrolladores de Cortex-M.
- Las aplicaciones sensibles al rendimiento deben ubicar cuidadosamente el código y los datos críticos, y usar las API de caché y memoria del SDK.
- Los búferes DMA cacheables requieren mantenimiento explícito de caché si el hardware no garantiza la coherencia; todos los búferes DMA necesitan control seguro de propiedad y sincronización.
- Las cargas de trabajo de gráficos, audio, IA y conectividad se benefician más cuando la pila de software usa eficazmente los aceleradores de hardware y la jerarquía de memoria del SoC.

El núcleo no pretende reemplazar cada caso de uso de Cortex-M7. Si una aplicación requiere el máximo rendimiento de un solo núcleo a mayor consumo, los dispositivos de clase Cortex-M7 pueden seguir siendo apropiados. Sin embargo, para productos conectados alimentados por batería, STAR-MC1 ofrece un equilibrio útil de compatibilidad, rendimiento y eficiencia energética.

## Aplicaciones adecuadas { #good-application-fits }

Los dispositivos basados en STAR-MC1 son candidatos para productos que necesitan acelerar los accesos a memoria u operaciones específicas sin salir de las restricciones de consumo e integración de un MCU. Merecen especial atención cuando la latencia de memoria importa más que la puntuación de un benchmark compacto como CoreMark/DMIPS. Seleccione el SoC por sus funciones implementadas y el rendimiento medido con la carga real, no por una supuesta ventaja sobre cualquier Cortex-M33 convencional.

Ejemplos típicos incluyen:

- Relojes inteligentes y rastreadores de actividad física.
- Dispositivos de audio Bluetooth.
- Dispositivos médicos vestibles y de monitorización de la salud.
- Pantallas inteligentes y sistemas HMI compactos.
- Dispositivos de sensores con IA en el borde.
- Productos que usan LVGL u otros frameworks de interfaz de usuario embebida.
- Dispositivos que ejecutan código desde memorias Flash o PSRAM de gran capacidad.

## Conclusiones clave { #key-takeaways }

- STAR-MC1 es compatible con Cortex-M33, por lo que conserva el modelo de software embebido Armv8-M familiar.
- Cuando el SoC habilita las cachés de instrucciones y datos, estas pueden mejorar el rendimiento real, especialmente cuando el código y los datos residen fuera de la SRAM interna rápida.
- CDE proporciona una vía para la aceleración de instrucciones personalizadas cuando el SoC y la pila de software lo soportan.
- STAR-MC1 combina un modelo de software compatible con CM33 con funciones configurables de memoria y aceleración; compare los SoC concretos y las cargas medidas, no solo los nombres de los núcleos.
- En los dispositivos SF32 que incorporan STAR-MC1, el núcleo y las funciones que implemente el SoC junto con él pueden facilitar aplicaciones más avanzadas de gráficos, audio, AIoT y wearables, manteniendo un modelo de desarrollo propio de MCU.

---

Véase también [Familia SF32](../../sf32-products/family/SF32_family.md) para conocer la posición de STAR-MC1 dentro de la gama de chips SF32LB5x.

Referencia principal: [Manual de referencia técnica de Arm China STAR-MC1](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).
