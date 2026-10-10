---
icon: lucide/memory-stick
description: "PSRAM en sistemas embebidos: cómo la RAM pseudoestática extiende la SRAM, en qué se diferencia de DRAM, RRAM y MRAM, y cómo ubicar datos en una jerarquía de memoria SF32."
tags:
    - Arquitectura
    - Memoria
    - Aprendizaje
---

# PSRAM frente a otros tipos de memoria para sistemas embebidos { #psram-vs-other-embedded-memory-types }

En muchos productos embebidos, la PSRAM —**RAM pseudoestática**— complementa la capacidad limitada de la SRAM interna con memoria de trabajo adicional. Puede alojar framebuffers, recursos gráficos grandes, búferes de audio, datos de modelos o conjuntos de trabajo de la aplicación que no caben en la SRAM. En algunos productos de bajo consumo, como los wearables, puede reducir el consumo del sistema frente a un subsistema de DRAM discreta; el resultado depende de los dispositivos de memoria, el controlador, los estados de funcionamiento y la carga de trabajo. Sigue siendo memoria volátil: no sustituye a la Flash ni es necesariamente apropiada para datos con requisitos estrictos de latencia.

Esta guía explica cómo decidir qué datos ubicar en SRAM, PSRAM o almacenamiento persistente. Para confirmar qué memoria incluye un SKU concreto, consulte la [Familia SF32](../../sf32-products/family/SF32_family.md) y la documentación correspondiente al chip, módulo o placa seleccionados.

!!! tip "El modelo en una frase"
    PSRAM utiliza internamente celdas dinámicas similares a las de la DRAM y gestiona el refresco dentro del dispositivo, por lo que el host puede acceder a ella de forma parecida a la SRAM.

La regla práctica es sencilla: use PSRAM para ampliar la capacidad, reserve SRAM para las tareas deterministas y de baja latencia, y tenga en cuenta que la interfaz de memoria externa comparte un presupuesto limitado de rendimiento y consumo.

## Estática y dinámica: de dónde viene «pseudo» { #static-vs-dynamic-where-pseudo-comes-from }

En este contexto, **estática** y **dinámica** describen cómo conserva un bit una celda de RAM mientras está alimentada. **No** indican si los datos sobreviven a un corte de alimentación: tanto la SRAM como la DRAM son volátiles.

- Un bit de **SRAM** se mantiene en un latch estático. Una vez escrito, permanece válido sin refresco periódico mientras el dispositivo esté alimentado y funcionando dentro de especificación. La contrapartida es una celda de memoria más grande, lo que limita la capacidad y eleva el área de silicio y el costo por bit.
- Un bit de **DRAM** se mantiene como carga en un condensador. Esa carga se fuga con el tiempo, por lo que el bit debe leerse y restaurarse periódicamente —una operación de **refresco**— antes de que la carga caiga demasiado. La celda más pequeña le da a la DRAM una ventaja de densidad, pero normalmente requiere un controlador compatible con DRAM que programe el refresco y respete sus reglas de temporización.

La PSRAM suele usar internamente una **matriz de celdas dinámicas, similar a la DRAM**. El dispositivo PSRAM realiza el refresco y oculta gran parte del control específico de la DRAM dentro del encapsulado. Por eso, su modelo de acceso desde el host se parece más al de la SRAM: el host lee y escribe en un espacio de memoria direccionable sin tener que programar el refresco periódico. Esto no significa que toda PSRAM comparta la interfaz eléctrica o la temporización de la SRAM. Es **pseudoestática** porque la RAM dinámica *imita el comportamiento externo de la RAM estática*, no porque la propia celda de almacenamiento se haya vuelto estática.

La simplificación está en la interfaz, no en la eliminación de las contrapartidas físicas. La PSRAM sigue teniendo latencia de comando específica del dispositivo, comportamiento de ráfaga, límites de reloj, modos de suspensión, restricciones de acceso y consumo de energía. Consulte la hoja de datos del dispositivo seleccionado; no dé por hecho que todos los dispositivos PSRAM son intercambiables.

!!! note "Lo que la PSRAM no es"
    La PSRAM no es almacenamiento no volátil y no garantiza por sí sola una latencia comparable a la SRAM interna ni un ancho de banda suficiente para el sistema. Resuelve un problema de capacidad; el dispositivo y la carga de trabajo seleccionados determinan el costo en latencia, consumo y ancho de banda.

## Comparación de tipos de memoria { #memory-type-comparison }

<div align="center"><em>Tabla: comparación de tipos de memoria embebida</em></div>

<div align="center" markdown>

| Tipo de memoria | ¿Conserva los datos sin alimentación? | Característica central | Ventaja habitual | Principal compromiso de diseño | Uso habitual en sistemas embebidos |
|:------------|:----------------------------|:--------------------|:-----------------|:----------------------|:----------------------|
| **SRAM** | No | Latch estático; sin refresco | La SRAM interna suele ofrecer una latencia baja y predecible; la temporización real depende de la ruta de memoria del SoC y de la contención | Ineficiente en área, por lo que la capacidad en chip es limitada; las corrientes de fuga importan en diseños siempre activos | Pilas, código/datos de uso frecuente, descriptores DMA, búferes necesarios para atender interrupciones con baja latencia y memorias estrechamente acopladas |
| **DRAM** | No | Almacenamiento basado en condensador con refresco gestionado externamente y un controlador DRAM | Alta densidad y bajo costo por bit en grandes capacidades | Refresco, complejidad del controlador, temporización de fila/banco y tareas de gestión de energía | Memoria principal en sistemas con procesador de aplicación y sistemas embebidos de alta capacidad |
| **PSRAM** | No | Almacenamiento similar a DRAM, con refresco y control gestionados dentro del dispositivo de memoria y un modelo de acceso desde el host similar al de la SRAM | Amplía la capacidad de trabajo más allá de la SRAM interna; en algunos diseños de ancho de banda bajo o moderado, puede simplificar la integración y reducir el consumo del sistema frente a un subsistema de DRAM discreta | Latencia más alta y menos predecible que la SRAM interna; ancho de banda de interfaz limitado y compartido con otros clientes | Framebuffers, búferes grandes de UI/audio/IA, recursos descomprimidos y conjuntos de trabajo de aplicación |
| **RRAM / ReRAM** | Sí | La resistencia de una celda cambia para representar datos | Memoria embebida no volátil potencialmente compacta y bajo consumo en espera | El comportamiento de escritura, la durabilidad, la retención, la variabilidad y la disponibilidad dependen en gran medida del proceso y del producto | Configuración no volátil, almacenamiento de código/datos o usos especializados de memoria embebida cuando exista una tecnología compatible |
| **MRAM** | Sí | El estado magnético representa los datos | Acceso no volátil rápido, alta durabilidad y sin refresco | El costo, la densidad, la energía de escritura y la capacidad disponible varían según la generación y el producto MRAM | Estado persistente, almacenamiento de código/datos o datos de trabajo no volátiles rápidos en dispositivos compatibles |

</div>

La tabla es cualitativa. «Más rápido», «más denso» y «menor consumo» son orientaciones generales, pero no bastan para seleccionar un componente. El nodo de proceso, la interfaz, la temperatura, el patrón de acceso, el modo de espera, el encapsulado y la configuración del controlador pueden invertir una comparación aparentemente obvia.

### Por qué la PSRAM es adecuada para productos de bajo consumo { #why-psram-fits-low-power-products }

La PSRAM suele estar orientada a un punto de operación distinto al de la DRAM discreta convencional: capacidad y ancho de banda moderados, una interfaz más simple, menos sobrecarga para el controlador y modos de bajo consumo en el dispositivo. En algunos wearables, equipos portátiles y sistemas alimentados por batería que no necesitan un ancho de banda comparable al de la DRAM, esta combinación puede reducir el consumo del sistema. No es una garantía general: compare los dispositivos de memoria, el controlador, los estados de funcionamiento y una carga representativa en el sistema de destino.

Esto no es una promesa universal por byte o por acceso. Una interfaz PSRAM operada a una frecuencia de reloj elevada, un framebuffer leído continuamente o un tráfico intenso de pantalla/audio/IA pueden seguir dominando el presupuesto de consumo de la memoria. Compare las corrientes en actividad, en espera, de retención y durante la reanudación para los dispositivos seleccionados, con el reloj, el voltaje, la temperatura y el patrón de acceso reales. Use modos como Half-Sleep cuando estén disponibles y resulten beneficiosos.

## Dónde encaja cada tipo de memoria en el sistema { #where-each-memory-fits-in-a-system }

Piense en términos de vida útil de los datos y urgencia de acceso:

1. Coloque en la SRAM interna u otra memoria documentada de baja latencia el código o los datos **sensibles a las interrupciones, de acceso frecuente y críticos en latencia**.
2. Coloque los **conjuntos de trabajo activos grandes** en PSRAM cuando el beneficio de capacidad supere el costo de latencia y ancho de banda.
3. Coloque los **datos que deben sobrevivir a la pérdida de energía** en una tecnología no volátil: comúnmente Flash NOR, Flash NAND, eMMC, o —en sistemas que lo ofrezcan— RRAM o MRAM.
4. Mantenga los **recursos de acceso poco frecuente** en almacenamiento no volátil y traslade o decodifique solo la parte necesaria para la operación actual.

Un diseño embebido común es por tanto:

<div align="center"><em>Diagrama: Distribución típica de memoria en un sistema embebido</em></div>

```text
Imagen de firmware, recursos y ajustes que deben conservarse -> Almacenamiento no volátil
Búferes grandes activos y framebuffers   -> PSRAM
Pilas de uso frecuente, estado de control y datos DMA -> SRAM interna
```

Esta es una estrategia de ubicación, no una regla que deba aplicarse a todos los búferes. Puede convenir almacenar en SRAM una imagen pequeña que se reutiliza con frecuencia; un modelo grande puede permanecer en Flash o PSRAM; un sistema de pantalla puede necesitar PSRAM simplemente porque un framebuffer completo no cabe en la memoria interna.

## El ancho de banda de la interfaz limita el rendimiento de la PSRAM { #psram-performance-is-an-interface-budget }

La capacidad de la PSRAM no hace que su ancho de banda sea ilimitado. El host accede a ella mediante interfaces como OPI o HPI en las configuraciones SF32 compatibles. Esa ruta puede ser compartida por la CPU, las cachés, DMA, los gráficos, el barrido de pantalla, el audio, la conectividad inalámbrica y el almacenamiento. Aunque la capacidad de PSRAM sea suficiente, el producto puede presentar tirones o sufrir falta de datos en el búfer (underrun) cuando varios clientes solicitan la interfaz a la vez.

### Ancho de interfaz y tasa de transferencia { #interface-width-and-transfer-rate }

La tasa de carga útil bruta está determinada por el ancho de las líneas de datos, las transferencias por reloj y el reloj de interfaz seleccionado:

`payload rate (MB/s) = data lines × transfers per clock × interface clock (MHz) ÷ 8`

Las filas DTR/DDR siguientes suponen dos transferencias por ciclo, y las de doble canal suponen que ambos canales funcionan simultáneamente a la frecuencia indicada. Son supuestos de cálculo, no una confirmación de que todos los chips, encapsulados, dispositivos de memoria o configuraciones del SDK admitan esos modos o frecuencias.

<div align="center"><em>Tabla: tasa teórica de carga útil de memoria serial</em></div>

<div align="center" markdown>

| Interfaz y modo de transferencia | Líneas de datos de carga útil | Transferencias por reloj | Tasa de carga útil por MHz | Frecuencia de referencia para comparar | Tasa de carga útil teórica |
|:----------------------------|:------------------:|:-------------------:|:-------------------:|:-----------------------------------:|:------------------------:|
| QSPI / STR | 4 | 1 | 0,5 MB/s | 72 MHz | 36 MB/s |
| QSPI / DTR | 4 | 2 | 1 MB/s | 72 MHz | 72 MB/s |
| OPI / DDR | 8 | 2 | 2 MB/s | 144 MHz | 288 MB/s |
| OPI de doble canal / DDR | 2 × 8 = 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR | 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI de doble canal / DDR | 2 × 16 = 32 | 2 | 8 MB/s | 144 MHz | 1 152 MB/s |

</div>

La columna de líneas de datos cuenta las señales de carga útil, no el reloj, la selección de chip ni otros pines de control. Estas frecuencias son ejemplos documentados, no límites para toda la familia. La [guía de SF32LB52-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md) especifica OPI-PSRAM a 144 MHz y QSPI-NOR a 72 MHz en modo STR; la [guía de SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb58x/SF32LB58-DevKit-LCD.md) especifica HPI-PSRAM a 144 MHz y variantes de la placa con Flash externa a 72 MHz. La fila QSPI/DTR usa 72 MHz únicamente para aislar el efecto de la transferencia de doble tasa de datos. Las filas de doble canal suponen que ambos canales pueden usarse simultáneamente; muestran el ancho de bus agregado, no garantizan que un flujo de CPU obtenga el doble de tasa efectiva. Estos son **límites teóricos de carga útil del bus**, no rendimiento de aplicación medido. Los ciclos de comando/dirección, los ciclos dummy, el refresco, los cambios de sentido lectura/escritura, los límites del controlador, los fallos de caché, el arbitraje de DMA, la integridad de la señal en el PCB y los clientes concurrentes reducen la tasa utilizable. El chip, el encapsulado, el dispositivo de memoria y la configuración del SDK seleccionados determinan lo que es válido.

La [guía de modelos de chip de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) enumera ejemplos de configuraciones de doble canal: **SF32LB566VCB36** tiene 8 MB de OPI-PSRAM en MPI1 y 4 MB en MPI2; **SF32LB586VDD36** tiene 16 MB de HPI-PSRAM en cada interfaz; y **SF32LB587VEE56** tiene 32 MB de HPI-PSRAM en cada interfaz. Estos números de pieza ilustran la topología de memoria; no garantizan que un único cliente alcance la carga útil agregada de la tabla. Antes de dimensionar un diseño sensible al ancho de banda, confirme la referencia completa y el mapa de memoria del SDK: otros encapsulados o SKU de la misma familia pueden usar una configuración diferente.

### Por qué importan los dos canales de memoria { #why-two-memory-channels-matter }

El beneficio más valioso de una disposición de doble canal no es simplemente una cifra de ancho de banda agregado más alta. Cuando el mapa de memoria SF32 seleccionado y la configuración de pantalla/controlador permiten asignar memoria de forma independiente, se puede reservar un canal para el cliente con mayores exigencias de ancho de banda y usar el otro para el resto de los accesos del sistema.

Una pantalla RGB/DPI es un ejemplo común. Su controlador debe leer el framebuffer continuamente a la frecuencia del reloj de píxel; una lectura retrasada puede provocar una falta de datos en el búfer (underrun), artefactos visuales o un refresco inestable. Ubicar el framebuffer en la memoria atendida por un canal de PSRAM y colocar en el otro los recursos de UI, los búferes de audio y otros datos de trabajo que utilizan la CPU, ePicasso o DMA puede reducir la contención evitable en la ruta de lectura de la pantalla.

Use esto como una estrategia de asignación de ancho de banda, no como una promesa automática. Verifique que el dispositivo seleccionado exponga el mapeo de canales requerido, que la dirección base del framebuffer caiga en el canal previsto y que el controlador de pantalla y los demás maestros de bus puedan usar los canales de forma independiente. Mida la estabilidad del escaneo, el tiempo de cuadro y la carga concurrente de audio/Bluetooth/CPU; el intercalado de direcciones, una interconexión compartida o un diseño de búfer inadecuado pueden reducir el beneficio esperado.

### Cachés y ejecución desde memoria externa { #caches-and-external-memory-execution }

Cuando el código o los datos residen en DRAM/PSRAM externa, la **I-cache** y la **D-cache** pueden reducir sustancialmente los accesos lentos repetidos en dispositivos SF32 que las admitan, siempre que estén habilitadas y las regiones correspondientes estén mapeadas como cacheables:

- La **I-cache** mantiene cerca de la CPU las líneas de instrucciones obtenidas recientemente. El código con localidad —como bucles, funciones reutilizadas, rutas de RTOS o código de UI— puede evitar obtenciones repetidas desde PSRAM o NOR tras un llenado de caché.
- La **D-cache** mantiene cerca de la CPU las líneas de datos leídas recientemente. Ayuda en las lecturas repetidas de tablas, recursos y datos de trabajo por parte de la CPU, pero no elimina el ancho de banda usado por un flujo de una sola pasada.
- **El DMA no coherente exige gestionar la propiedad del búfer y mantener la caché.** Si el búfer es cacheable y el hardware no garantiza la coherencia, limpie los datos escritos por la CPU antes de que los lea el DMA o un periférico. Antes de una escritura del DMA, siga el procedimiento de preparación del búfer de recepción de la plataforma para que las líneas sucias no sobrescriban después los datos recibidos. Una vez completada la transferencia, invalide las líneas obsoletas antes de que la CPU lea el resultado. La CPU no debe acceder al búfer mientras pertenezca al DMA.

Alinee la dirección inicial y el tamaño asignado de los búferes DMA a líneas de caché completas, sin compartir líneas con datos ajenos. Invalidar una línea sucia compartida puede descartar los cambios de otra variable; limpiarla después de una escritura del DMA puede sobrescribir los datos nuevos. Use las API del SDK o RTOS seleccionado y respete su tamaño de línea, las comprobaciones de finalización y las barreras de memoria necesarias. No copie sin verificar las API ni los valores de alineación de otro procesador. Los búferes no cacheables o coherentes por hardware siguen las reglas de sincronización de su plataforma.

Por lo tanto, la caché es una optimización de localidad, no un sustituto de un presupuesto de ancho de banda. La lectura continua del framebuffer para su visualización o una transferencia de búfer única pueden seguir consumiendo la interfaz PSRAM a casi la tasa de datos requerida.

### Copia de código a PSRAM durante el arranque (no XIP) { #boot-copy-and-execute-in-place-from-psram }

Las guías de arranque de SiFli para SF32LB52x y SF32LB58x documentan configuraciones en las que la aplicación almacenada en NAND Flash externa se copia a PSRAM para ejecutarse; ambas guías también describen una opción con Flash SD externa mediante SDIO. SiFli denomina a este modo **no XIP**: XIP ejecuta el código directamente desde una dirección de NOR Flash, por lo que coinciden las direcciones de almacenamiento y ejecución; en no XIP, el código se copia desde Flash a RAM y ambas direcciones difieren. Consulte la [guía de arranque de SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_development/startup_flow.html) y la [guía de arranque de SF32LB58x (en chino)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_development/startup_flow.html). Son configuraciones documentadas, no una garantía para todos los SKU o placas. Confirme el medio de arranque, el mapa de memoria, la configuración del enlazador y de las particiones, y el SDK admitidos por el dispositivo objetivo. Ejecutar código seleccionado desde PSRAM puede reservar la escasa SRAM interna para otros usos, pero no garantiza una ejecución más rápida; mida cargas de trabajo representativas con la configuración de caché y la contención reales.

En configuraciones representativas de SiFli, la NOR QSPI/STR de 72 MHz tiene un tope de carga útil bruta de 36 MB/s, mientras que la PSRAM OPI/DDR y HPI/DDR de 144 MHz alcanzan 288 MB/s y 576 MB/s respectivamente; las variantes de doble canal alcanzan 576 MB/s y 1 152 MB/s en conjunto. Estas cifras son límites de carga útil de la interfaz, no resultados de rendimiento de aplicaciones. En una configuración compatible, un mayor ancho de banda de PSRAM puede ofrecer más margen para la lectura de instrucciones, pero no demuestra por sí solo que ejecutar desde PSRAM sea más rápido. El resultado depende de la latencia del dispositivo de memoria, la localidad del código, la configuración de la caché, la contención de la PSRAM y si la aplicación está limitada por CPU, por caché o por ancho de banda. Mida el tiempo de arranque, el comportamiento de fallos de caché y cargas de trabajo representativas; no deduzca el rendimiento de la aplicación a partir de la relación entre tasas brutas del bus.

Para un diseño intensivo en PSRAM, valide estas preguntas en el hardware objetivo:

- ¿Qué lee y escribe la PSRAM concurrentemente durante el escenario de usuario pico?
- ¿Se lee el búfer secuencialmente, en ráfagas, aleatoriamente o repetidamente por la CPU?
- ¿El comportamiento de la caché reduce los accesos repetidos, y son correctos los pasos de mantenimiento de caché alrededor del DMA?
- ¿Puede un framebuffer usar actualizaciones parciales, búferes de dibujo más pequeños o compresión en lugar de una asignación de framebuffer completo más grande?
- ¿Qué sucede cuando el refresco de pantalla, el audio Bluetooth y el trabajo de la aplicación ocurren juntos?
- ¿El comportamiento de espera o suspensión de la PSRAM seleccionada cumple con el requisito de retención y duración de batería?

Mida el tiempo de cuadro, los underruns de búfer, las esperas de CPU, la corriente y el comportamiento de recuperación. No infiera el rendimiento del sistema únicamente a partir de la capacidad de la PSRAM o el ancho de la interfaz.

## Half-Sleep en las PSRAM de AP Memory compatibles { #half-sleep-on-applicable-ap-memory-psram }

Algunos dispositivos PSRAM de AP Memory ofrecen el modo **Half-Sleep**: un estado de consumo ultrabajo que conserva los datos almacenados. Es útil cuando un búfer grande debe permanecer válido mientras el sistema pausa la actividad de PSRAM, pero el producto no puede permitirse volver a cargar el búfer desde Flash o recalcularlo después de cada intervalo de inactividad.

Half-Sleep es un **modo de bajo consumo específico del dispositivo**, no una función genérica de PSRAM. La [hoja de datos de PSRAM AP Memory APS6408L-OBMx DDR OPI Xccela](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) documenta una implementación de esta función. Su temporización de entrada y salida, la codificación del registro de modo, el comportamiento de reloj permitido, la corriente, los límites de temperatura y las garantías de retención **no son portables** entre familias o revisiones de PSRAM. Use la hoja de datos exacta y el soporte del SDK para el dispositivo instalado.

### Ahorro relativo de energía { #relative-power-saving }

Las comparaciones siguientes se basan en la hoja de datos de AP Memory Rev. 3.7, disponible en el [sitio web del fabricante](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf). Confirme la revisión y el componente instalado antes de aplicar sus límites.

Para la misma pieza de referencia APS6408L-OBMx con **retención de toda la matriz de memoria**, AP Memory publica las siguientes corrientes típicas medias de espera y Half-Sleep. Al mismo voltaje de alimentación, la reducción relativa de corriente es también la reducción relativa de consumo de la PSRAM.

<div align="center"><em>Tabla: ahorro de Half-Sleep en APS6408L-OBMx con retención de toda la matriz</em></div>

<div align="center" markdown>

| Temperatura | Corriente de espera estándar | Corriente Half-Sleep | Reducción relativa |
|:------------|:------------------------:|:------------------:|:------------------:|
| 25 °C | 66 µA | 20 µA | alrededor del 70% |
| 85 °C | 190 µA | 120 µA | alrededor del 37% |

</div>

A 25 °C, Half-Sleep usa por tanto aproximadamente el **30% de la corriente de espera estándar de la pieza de referencia** mientras conserva toda la matriz de memoria. El ahorro es menor a 85 °C porque la corriente de retención aumenta con la temperatura. Estas cifras comparan dos estados de inactividad/retención —no Half-Sleep frente a la corriente activa de lectura/escritura— y son valores típicos, no garantías de diseño. Los ajustes de refresco parcial de la matriz pueden cambiar aún más la corriente, pero pueden no retener cada región de memoria; úselos solo cuando la política de retención de datos lo permita.

### Reglas de diseño para Half-Sleep { #design-rules-for-half-sleep }

No confunda la condición de 150 ms para la corriente con los 150 µs de duración mínima de Half-Sleep y los 150 µs de temporización de salida indicados en la tabla 30 de esta revisión. Una corriente media baja puede incluir picos durante el refresco: verifique la respuesta del regulador y del desacoplo. A diferencia de Half-Sleep, Deep Power Down pierde el contenido de memoria y restablece los registros de modo al salir.

Las notas de las tablas de corriente de la hoja de datos de referencia especifican un dispositivo de 64 Mb sin conmutación del reloj; las cifras de refresco lento a 25 °C requieren activar Slow Refresh Frequency. El rango especificado para VDD y VDDQ es de 1,62 a 1,98 V. La corriente especificada de Half-Sleep solo se garantiza después de 150 ms en ese modo; esto no convierte los valores típicos de la tabla en límites garantizados. Para períodos de inactividad más cortos, mida la forma de onda completa de entrada, retención y salida, en lugar de aplicar la corriente estabilizada a todo el intervalo.

- Entre en Half-Sleep solo después de que todos los clientes de CPU, DMA, pantalla, audio, conectividad inalámbrica y almacenamiento hayan dejado de acceder a la región de PSRAM. Una transacción durante la entrada o la suspensión puede corromper la transferencia o despertar el dispositivo inesperadamente.
- Trate la salida como un costo de activación programado. El firmware debe respetar la temporización de salida especificada antes de que el código, el DMA o un controlador de periférico vuelva a acceder a la PSRAM.
- Mantenga la alimentación de la PSRAM y las señales requeridas por el dispositivo seleccionado dentro de su especificación de retención. Half-Sleep retiene los datos solo mientras se cumplan sus condiciones de energía documentadas; no es un reemplazo del almacenamiento no volátil.
- Mida el estado completo del sistema, no solo la corriente de la PSRAM. Los ahorros pueden perderse si la CPU, la pantalla, el reloj de interfaz u otro subsistema permanece activo.

En períodos de inactividad cortos, el costo de entrar y salir del modo puede superar el ahorro. En pausas más largas, conservar un framebuffer, un recurso decodificado o un búfer de modelo en Half-Sleep evita recargas o reconstrucciones costosas. Determine el tiempo a partir del cual se obtiene un ahorro neto con la energía medida en actividad, Half-Sleep y reactivación en la placa objetivo.

## PSRAM en diseños SF32 { #psram-in-sf32-designs }

Las configuraciones de memoria SF32 dependen del SKU, el encapsulado y el módulo. La documentación de módulos de SiFli lista opciones OPI-PSRAM y HPI-PSRAM en toda la gama de módulos SF32LB5x; también muestra que la capacidad y la topología varían según el código de módulo. Algunas configuraciones integran la PSRAM en el mismo encapsulado, mientras que otros productos exponen una interfaz de memoria externa. Ni la presencia de un nombre de familia SF32 ni la presencia de una interfaz de memoria externa prueban que cada variante incluya PSRAM.

Use la página de producto exacta y la guía de diseño para confirmar la capacidad, la interfaz, las restricciones de encapsulado, los requisitos de enrutado y las limitaciones de periféricos concurrentes. En el diseño de aplicaciones, los usos habituales de la PSRAM son:

- **Gráficos:** use PSRAM para framebuffers grandes, búferes de dibujo, imágenes o fuentes cuando la SRAM sea insuficiente. El [Resumen de gráficos](../graphics/overview.md) explica el flujo de renderizado a pantalla y las consecuencias de ancho de banda de la PSRAM.
- **Audio y Bluetooth:** úsela para colas o recursos de mayor tamaño solo después de probar el tráfico concurrente; las estructuras de control sensibles a la latencia deben permanecer en la memoria de baja latencia apropiada.
- **IA:** úsela para pesos de modelos o tensores grandes cuando sea necesario. Mantenga los búferes de acceso frecuente o sensibles a la latencia en una región de memoria adecuada según la documentación.
- **Compresión:** [eZip](../graphics/ezip.md) puede reducir el tamaño de los recursos almacenados y el tráfico antes de la decodificación. En los dispositivos SF32LB55x, SF32LB56x y SF32LB58x compatibles, [TurboPixel](../graphics/turbopixel.md) reduce el espacio de PSRAM que ocupa el framebuffer final y el ancho de banda que necesita mediante una relación fija de compresión con pérdida; no es un formato para almacenar recursos.

## Reglas prácticas de selección { #practical-selection-rules }

Elija PSRAM cuando el problema sea de capacidad y la carga de trabajo pueda tolerar los límites de latencia y ancho de banda de la ruta de memoria seleccionada. Prefiera más SRAM interna —o rediseñe el búfer— cuando el problema sea la latencia determinista, los accesos aleatorios pequeños y frecuentes, o una ruta de DMA/control crítica en tiempo. Elija memoria no volátil cuando los datos deban persistir tras la pérdida de energía; elija RRAM o MRAM solo cuando la documentación exacta del SoC o del producto de memoria indique su disponibilidad y límites de operación.

La arquitectura más robusta combina deliberadamente varios niveles: almacenamiento no volátil para conservar los datos, PSRAM para grandes conjuntos de datos activos y SRAM para las tareas que deben ejecutarse con rapidez y de forma predecible.
