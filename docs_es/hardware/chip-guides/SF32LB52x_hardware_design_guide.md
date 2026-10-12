---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware de la MCU SF32LB52x: descripción del dispositivo, flujo de diseño y enlaces a las páginas de esquemático, diseño de PCB, revisión y listas de comprobación."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB52x { #sf32lb52x-hardware-design-guide }

## 1. Introducción { #1-introduction }

Esta guía reúne recomendaciones de diseño y material de referencia respaldado por fuentes para productos basados en la familia de microcontroladores AIoT de ultrabajo consumo SF32LB52x. Está dirigida a ingenieros de hardware, diseñadores de PCB y desarrolladores de producto que trabajan en dispositivos vestibles alimentados por batería y otros sistemas embebidos compactos.

La guía cubre todo el proceso de desarrollo de hardware: diseño de alimentación, circuitos de reloj, diseño RF, interfaces de pantalla y almacenamiento, circuitos de audio, recomendaciones de diseño de PCB y aspectos de fabricación. Seguir estas pautas ayuda a reducir los riesgos de desarrollo, mejorar la fiabilidad del sistema y acortar el ciclo de desarrollo del producto.

Se presupone que el lector tiene conocimientos básicos de diseño de hardware embebido y elaboración de esquemáticos. Esta guía complementa la hoja de datos, el manual de referencia y la documentación del SDK del SF32LB52x, que siguen siendo las fuentes definitivas para las especificaciones eléctricas detalladas, el funcionamiento de los periféricos y el desarrollo de software.

La guía integra en un único flujo de trabajo de ingeniería dos notas originales de aplicación de hardware de SiFli: una para las variantes SF32LB520/3/5/7 alimentadas por batería y otra para las variantes 52B/D/E/G/J con alimentación regulada externamente. Cuando las fuentes originales usan términos inconsistentes, esta guía prioriza los números de pieza comerciales exactos, la descripción explícita del comportamiento de los dominios de alimentación y la claridad necesaria para la revisión previa a la liberación.

## 2. Recursos de desarrollo { #2-development-resources }
[Resumen de producto SF32LB52x]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[Hoja de datos SF32LB52x]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[Manual de referencia SF32LB52x]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[Guía de diseño de hardware SF32LB52x (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Guía de diseño de hardware SF32LB52x (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[Módulo SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[Archivos KiCad]: https://github.com/OpenSiFli/kicad-libraries
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/
[Lista de proveedores aprobados por SiFli]: ../cad-components/sifli-approved-vendor-list.md
[Lista de proveedores aprobados por SiFli (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumen de producto SF32LB52x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB52x]__
- :fontawesome-solid-file-pdf: __[Manual de referencia SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware SF32LB52x (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware SF32LB52x (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__
- :fontawesome-brands-github: __[Archivos KiCad]__
- :fontawesome-solid-sim-card: __[Módulo SF32LB52-MOD-1]__

</div>

## 3. Descripción del dispositivo { #3-device-overview }

La familia SF32LB52x integra procesadores STAR-MC1 de doble núcleo, conectividad Bluetooth, aceleración gráfica, audio integrado, interfaces de pantalla, controladores de almacenamiento y gestión de alimentación en un encapsulado QFN68 compacto. Está optimizada para productos en los que son importantes el coste de la lista de materiales (BOM), la autonomía y el área de PCB.

### 3.1. Características { #31-features }

La familia integra:

- Procesadores Arm China STAR-MC1 de doble núcleo, compatibles con Arm Cortex-M33 y equipados con FPU y MPU
- Radio Bluetooth 5.3 de modo dual
- Acelerador gráfico 2D/2.5D ePicasso 2.0
- Controlador de pantalla compatible con SPI, QSPI, 8080, JDI y EPD de 8 bits
- Dispositivo USB 2.0 Full-Speed
- Interfaz de almacenamiento SDIO/eMMC en las variantes compatibles
- Interfaces de audio analógico y digital
- PMU, convertidor DC/DC y reguladores LDO integrados
- Encapsulado QFN68 con hasta 44/45 GPIO

### 3.2. Variantes { #32-variants }

La familia SF32LB52x se divide, según su arquitectura de alimentación, en dos grupos prácticos de diseño: dispositivos alimentados por batería y dispositivos con alimentación regulada externamente.

=== "SF32LB520/3/5/7 (alimentado por batería)"

    Este grupo integra en el chip un **módulo de gestión de carga y una PMU**. Puede conectarse directamente a una batería de iones de litio de una celda y también admite soluciones de carga externas.

    <div align="center"><em>Tabla 3.2-1: correspondencia de modelos (variante alimentada por batería)</em></div>

    <div align="center" markdown>

    | Modelo | Memoria en el mismo encapsulado | Alimentación | Nota de diseño |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR Flash | Batería de ion-litio, 3,2–4,7 V, recargable | Arranca de forma predeterminada desde la Flash integrada en el encapsulado; `VDD18_VOUT` requiere una alimentación externa de 3,3 V |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | Batería de ion-litio, 3,2–4,7 V, recargable | Debe arrancar desde almacenamiento externo |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | Batería de ion-litio, 3,2–4,7 V, recargable | Debe arrancar desde almacenamiento externo |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | Batería de ion-litio, 3,2–4,7 V, recargable | Debe arrancar desde almacenamiento externo |

    </div>

=== "52B/D/E/G/J (alimentación externa regulada)"

    Este grupo integra el **PMU** en el chip, pero no incluye circuitos de carga. Se alimenta desde una fuente externa regulada.

    <div align="center"><em>Tabla 3.2-2: correspondencia de modelos (variante con alimentación externa regulada)</em></div>

    <div align="center" markdown>

    | Modelo | Memoria en el mismo encapsulado | Alimentación | Nota de diseño |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | 1 MB QSPI-NOR Flash | 2,97–3,63 V, no recargable | `VDD_SIP` requiere una alimentación externa de 1,8 V o 3,3 V |
    | SF32LB52BU56 | 4 MB QSPI-NOR Flash | 2,97–3,63 V, no recargable | `VDD_SIP` requiere una alimentación externa de 3,3 V |
    | SF32LB52DUB6 | 4 MB OPI-PSRAM | 1,71–1,98 V, no recargable | `VDD_SIP` requiere una alimentación externa de 1,8 V |
    | SF32LB52EUB6 | 4 MB OPI-PSRAM | 2,97–3,63 V, no recargable | `VDD_SIP` puede alimentarse desde el LDO interno |
    | SF32LB52GUC6 | 8 MB OPI-PSRAM | 2,97–3,63 V, no recargable | `VDD_SIP` puede alimentarse desde el LDO interno |
    | SF32LB52JUD6 | 16 MB OPI-PSRAM | 2,97–3,63 V, no recargable | `VDD_SIP` puede alimentarse desde el LDO interno |

    </div>

### 3.3. Encapsulados { #33-packages }

Ambos grupos de diseño utilizan el mismo encapsulado QFN68.

<div align="center"><em>Tabla 3.3-1: información del encapsulado</em></div>

<div align="center" markdown>

| Nombre del encapsulado | Dimensiones | Paso entre pines |
|:---|:---|:---|
| QFN68L | 7 mm x 7 mm x 0,85 mm | 0,35 mm |

</div>

Los dos grupos de diseño difieren ligeramente en sus recursos periféricos. El grupo alimentado por batería dispone de 44 GPIO y el grupo con alimentación externa regulada, de 45; la diferencia se debe a que algunos pines de las variantes con batería están reservados para la carga.

- 44/45 GPIO
- 3 UART
- 4 I2C
- 2 GPTIM
- 2 SPI
- 1 interfaz de audio I2S
- 1 interfaz de almacenamiento SDIO
- 1 interfaz de audio PDM
- 1 salida de audio analógica diferencial
- 1 entrada de audio analógica no diferencial (single-ended)
- Interfaz SPI de pantalla de 1/2/4 líneas de datos e interfaz de pantalla JDI serie
- Admite pantallas con o sin GRAM
- Admite descarga por UART y depuración por software

A continuación se muestran los diagramas de distribución de pines. Sus diferencias se revisan de nuevo en la sección de diseño del esquemático.

![Figura 3.3-1: distribución de pines QFN68L de SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-1: distribución de pines QFN68L de SF32LB520/3/5/7</em></div>

![Figura 3.3-2: distribución de pines QFN68L de 52B/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-2: distribución de pines QFN68L de 52B/E/G/J</em></div>

### 3.4. Aplicaciones { #34-applications }

Sus aplicaciones habituales son sistemas embebidos portátiles en los que son esenciales una larga autonomía y un formato compacto. Por ejemplo:

- Relojes inteligentes de gama básica y pulseras de actividad
- Módulos Bluetooth y adaptadores inalámbricos
- Accesorios de audio Bluetooth
- Sensores inteligentes y dispositivos vestibles
- Etiquetas electrónicas para estanterías y credenciales inteligentes
- Lectores de libros electrónicos
- Impresoras portátiles de etiquetas
- Pantallas para bicicletas y patinetes eléctricos
- Dispositivos conectados de interfaz hombre-máquina (HMI)
- Equipos industriales y médicos portátiles
- Otros dispositivos AIoT alimentados por batería

## 4. Diseño de un vistazo { #4-design-at-a-glance }

### 4.1. Arquitectura de hardware { #41-hardware-architecture }

La tabla siguiente resume la arquitectura de hardware recomendada para una aplicación típica con SF32LB52x. Úsela como referencia rápida antes de consultar las pautas detalladas de las secciones posteriores.

<div align="center"><em>Tabla 4.1-1: resumen de diseño de un vistazo</em></div>

<div align="center" markdown>

| Bloque de hardware | Implementación habitual |
|:---|:---|
| Encapsulado | QFN68L, 7 mm x 7 mm x 0,85 mm, paso de 0,35 mm |
| PCB | Se recomienda una PCB PTH de 4 capas |
| Alimentación | Batería Li-ion/Li-Po de una celda o fuente externa regulada, según la variante del dispositivo |
| Carga de batería | Cargador integrado en las variantes compatibles o un CI de carga externo, con o sin gestión de la ruta de alimentación (PPM) |
| Inductor Buck | 4,7 uH ±20 %, DCR ≤ 0,4 Ω, Isat ≥ 450 mA |
| Cristal | Cristal principal de 48 MHz y cristal RTC de 32,768 kHz |
| RF | Pista de impedancia controlada de 50 Ω con espacio reservado para la red de adaptación π |
| Pantalla | SPI de 3 y 4 líneas, Dual-SPI, Quad-SPI (hasta 512 x 512), JDI y EPD de 8 bits |
| Táctil | Controlador táctil capacitivo I2C compatible con salida del modo de reposo por interrupción |
| Almacenamiento | Flash/PSRAM SiP, SPI NOR externa, SPI NAND, SD NAND o eMMC, según la variante |
| Audio | Entrada de micrófono analógica, salida DAC diferencial y PA externo |
| Sensores | Sensores I2C/SPI como acelerómetro, giroscopio, sensor geomagnético, sensor de frecuencia cardiaca, SpO2 y ECG |
| Háptica | Motor de vibración controlado por PWM |
| Depuración | DBG_UART en PA18/PA19, multiplexado con SWD |

</div>


### 4.2. Flujo de diseño de hardware { #42-hardware-design-flow }

Siga la guía en el orden en que suelen fijarse las decisiones de hardware. El flujo siguiente mantiene visibles las decisiones iniciales de arquitectura antes de pasar al detalle del esquemático y la PCB.

<div align="center"><em>Tabla 4.2-1: flujo de diseño de hardware</em></div>

<div align="center" markdown>

| Paso | Decisión de diseño | Secciones principales |
|:---|:---|:---|
| 1 | Seleccione el dispositivo comercial exacto y la variante de alimentación | Descripción del dispositivo, selección de variante |
| 2 | Confirme el encapsulado, el número de GPIO y los pines de función fija | Encapsulados, pautas de diseño del esquemático |
| 3 | Defina el sistema mínimo: árbol de alimentación, almacenamiento de arranque, pines bootstrap, acceso de depuración, relojes y estrategia de salida del modo de reposo | Diseño del sistema mínimo, almacenamiento, depuración, generación de reloj |
| 4 | Seleccione la topología RF, la pantalla, el audio, los sensores y las demás interfaces del producto | Generación de reloj, RF, interfaces de usuario, almacenamiento y conectividad |
| 5 | Revise el apilado de PCB, fanout, impedancias y trazado de señales sensibles | Pautas de diseño de PCB |
| 6 | Compare con los esquemáticos, diseños de PCB y figuras mecánicas y de alimentación de referencia de las fuentes | Apéndices A–E |
| 7 | Reserve acceso para puesta en marcha, depuración, calibración y pruebas de producción | Depuración, producción, lista de comprobación de revisión del diseño |

</div>

**Árbol de decisión de diseño**

- ¿Necesita funcionamiento con batería de una celda recargable por USB? Empiece por `SF32LB520/3/5/7`.
- ¿Necesita alimentación externa regulada o arranque desde eMMC? Empiece por `52B/D/E/G/J`.
- ¿Necesita EPD paralelo de 8 bits? Use la ruta de diseño con alimentación externa regulada, salvo que SiFli confirme la opción alimentada por batería para el diseño exacto.
- ¿Necesita la menor corriente de espera posible? Defina la conmutación de alimentación del almacenamiento, los interruptores de carga de los sensores y el aislamiento de alimentación de la pantalla antes de colocar los componentes en la PCB.

### 4.3. Cómo utilizar esta guía { #43-how-to-use-this-guide }

Antes de empezar con el esquemático, confirme el número de pieza comercial exacto, ya que la familia SF32LB52x se divide en dos grupos prácticos: `SF32LB520/3/5/7`, alimentado por batería, y `52B/D/E/G/J`, con alimentación regulada externamente. Use la sección 3.2 para elegir el grupo; las secciones 5.1 y 5.2 para revisar el sistema mínimo y la alimentación; las secciones 5.6.1 y 5.7.1 para comprobar el almacenamiento de arranque y el acceso de depuración; las secciones 5 y 6 para revisar las pautas del esquemático y la PCB; los apéndices A–E para comparar las figuras de referencia originales; y la sección 7 como lista de comprobación para la liberación.

Al reutilizar un esquemático SF32LB52x antiguo, revise primero los pines de alimentación, la alimentación de la memoria SiP, el riel del almacenamiento de arranque, los pines DBG_UART/SWD, la carga del cristal, la huella de la red de adaptación RF y los puntos de prueba de producción. Estos elementos suelen ser las fuentes de riesgos de puesta en marcha que pasan inadvertidos.

### 4.4. Paquete de evidencias de revisión { #44-review-evidence-pack }

Antes de liberar el hardware, recopile el PDF del esquemático, el apilado de PCB, el informe de impedancia, la comprobación de componentes frente a la AVL, el informe DRC y capturas de los diseños RF, de cristal, USB, SDIO/eMMC, audio, alimentación y almacenamiento de arranque. Archive las evidencias junto con la revisión de la placa para poder relacionar problemas posteriores de firmware, RF o producción con la base de hardware revisada.


## 5. Uso de las listas de comprobación { #using-the-checklists }

Esta guía ofrece dos niveles de cobertura mediante listas de comprobación. Las listas breves incluidas en las secciones 5.1.1.5, 5.5.3 y 7 reúnen los puntos de mayor riesgo para una autocomprobación rápida de ingeniería. La [Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) (sección 5.8) y la [Lista de comprobación del diseño de PCB](SF32LB52x_pcb_layout_checklist.md) (sección 6.15) reproducen punto por punto la [*Lista de comprobación de esquemático y PCB SF32LB52*][Lista de comprobación de esquemático y PCB SF32LB52 de SiFli (XLSX)] (V1.0, 2026-01-21) completa de SiFli, publicada junto con la guía de diseño de hardware en la [Wiki de SiFli][Índice de guías de diseño de hardware de chips de SiFli (Wiki)]. Abarca tanto las variantes SF32LB520/3/5/7 alimentadas por batería como las 52B/D/E/G/J alimentadas externamente.

Cada punto de ambas listas indica a qué variante(s) SF32LB52x se aplica y si es obligatorio (Required: debe aprobarse antes de la liberación) u opcional (Optional: recomendado cuando se utiliza esa función). «Todas las variantes» («All variants») comprende SF32LB520/3/5/7 y 52B/D/E/G/J, salvo que se especifique un subconjunto. El texto en color y el texto con <span class="flag-red flag-yellow">fondo amarillo</span> conservan el énfasis de revisión de la hoja de cálculo original. La fuente no explica el motivo de cada resaltado; considérelos avisos adicionales de revisión, no sustitutos de los elementos sin resaltar de la misma tabla. El formato mantiene intencionadamente la disposición de la hoja de cálculo, pero cuando el texto original sea incompleto, inconsistente o demasiado escueto, interprételo junto con la guía de diseño, la hoja de datos, el manual de referencia y la guía de números de modelo de SiFli.

Use la [Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) durante la revisión del esquemático, antes de comenzar el diseño de PCB. Use la [Lista de comprobación del diseño de PCB](SF32LB52x_pcb_layout_checklist.md) durante la revisión del diseño, antes de liberar los Gerber. En la práctica, cada revisión suele realizarse dos veces: primero por el ingeniero de diseño y después por un revisor independiente, antes de congelar el diseño o liberarlo a fabricación.

Para obtener mejores resultados, utilice la lista como registro de aprobación, no como material de lectura:

1. Confirme primero la variante exacta de silicio, especialmente si el diseño podría basarse en dispositivos 520/3/5/7 o 52B/D/E/G/J.
2. Durante la revisión, marque cada elemento como aprobado / no aprobado / no aplicable (pass / fail / not applicable) en lugar de limitarse a leer la tabla.
3. Si un punto hace referencia al medio de arranque, el tipo de pantalla o el comportamiento del interruptor de alimentación, compruébelo con el esquemático real y el capítulo correspondiente de la guía.
4. Si alguna expresión de la fuente es ambigua, anote el número de pieza exacto y la hipótesis de diseño en las notas de revisión antes de la liberación.

<div align="center"><em>Tabla 5-1: plantilla de registro de revisión</em></div>

<div align="center" markdown>

| Campo | Valor |
|:---|:---|
| Nombre del cliente | |
| Nombre del diseño del cliente | |
| Fecha de envío para revisión | |
| Revisor inicial | |
| Fecha de revisión inicial | |
| Revisor de seguimiento | |
| Fecha de revisión de seguimiento | |

</div>

<div align="center"><em>Tabla 5-2: historial de versiones del documento de listas de comprobación</em></div>

<div align="center" markdown>

| N.º | Versión | Fecha | Notas de publicación |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Publicación inicial del documento de listas de comprobación del esquemático y PCB |

</div>

[Lista de comprobación de esquemático y PCB SF32LB52 de SiFli (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[Índice de guías de diseño de hardware de chips de SiFli (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

## 6. Continúe con la guía de diseño { #continue-the-design-guide }

La guía completa continúa en las siguientes páginas, cada una dedicada a una etapa del proceso de diseño.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Pautas de diseño del esquemático](SF32LB52x_schematic_design.md)__ — sistema mínimo, alimentación, generación de reloj, RF, interfaces de usuario, almacenamiento y conectividad, y acceso para fabricación, en tres páginas
- :fontawesome-solid-list-check: __[Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md)__ — lista detallada para revisar el esquemático (sección 5.8)
- :fontawesome-solid-microchip: __[Pautas de diseño de PCB](SF32LB52x_pcb_layout.md)__ — pautas de huella, apilado, fanout y trazado de reloj, RF, audio, USB, SDIO y alimentación
- :fontawesome-solid-list-check: __[Lista de comprobación del diseño de PCB](SF32LB52x_pcb_layout_checklist.md)__ — lista detallada para revisar el diseño de PCB (sección 6.15)
- :fontawesome-solid-book-open: __[Lista de comprobación de revisión del diseño y referencias](SF32LB52x_review_and_reference.md)__ — lista de comprobación de liberación, documentos relacionados, apéndices de referencias de esquemático/PCB/mecánica/alimentación e historial de revisiones

</div>
