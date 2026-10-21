---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware de la MCU SF32LB57x: sistema mínimo, alimentación, reloj, RF, pantalla, cámara, almacenamiento y directrices de diseño de PCB."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB57x { #sf32lb57x-hardware-design-guide }

## 1. Introducción { #1-introduction }

Esta guía ofrece recomendaciones y material de referencia para diseñar productos basados en la familia de microcontroladores SF32LB57x, con un alto nivel de integración para AIoT. Está dirigida a ingenieros de hardware, diseñadores de PCB y responsables del desarrollo de producto que crean dispositivos vestibles, terminales inteligentes portátiles, equipos para el hogar inteligente y otros productos conectados de bajo consumo.

La guía abarca todo el proceso de desarrollo de hardware: arquitectura de alimentación, circuitos de reloj, diseño RF, interfaces de pantalla y cámara, almacenamiento y configuración de arranque, circuitos de audio, diseño de PCB, validación y preparación para fabricación. Seguir estas pautas ayuda a reducir los riesgos de diseño en el esquemático y la PCB, conservar el comportamiento de bajo consumo y cumplir los requisitos de encapsulado, alimentación e interfaces del SF32LB57x.

Se presuponen conocimientos básicos de diseño de hardware integrado y captura de esquemáticos. Esta guía complementa la hoja de datos, el manual de usuario, la nota oficial de aplicación de hardware, los archivos de diseño de referencia y la Lista de proveedores aprobados por SiFli (AVL). Para las especificaciones eléctricas, la multiplexación de pines, las dimensiones del encapsulado, la cualificación de componentes y los límites de producción, consulte esas fuentes oficiales, que son las que prevalecen.

## 2. Recursos de desarrollo { #2-development-resources }

[Resumen de producto SF32LB57x]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Hoja de datos SF32LB57x]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[Manual de usuario SF32LB57x]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Nota de aplicación de hardware SF32LB57x]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Lista de proveedores aprobados por SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Resumen de producto SF32LB57x]__
- :fontawesome-solid-file-pdf: __[Hoja de datos SF32LB57x]__
- :fontawesome-solid-file-pdf: __[Manual de usuario SF32LB57x]__
- :fontawesome-solid-file-lines: __[Nota de aplicación de hardware SF32LB57x]__
- :fontawesome-solid-file-excel: __[Lista de proveedores aprobados por SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

## 3. Descripción del dispositivo { #3-device-overview }

### 3.1. Características { #31-features }

Los recursos típicos del SF32LB57x incluyen:

- Hasta 58 GPIO<!-- BGA-ONLY -->; algunas variantes BGA112 disponen de seis E/S adicionales que pueden utilizarse para MPI3 o configurarse mediante pull-up/pull-down como salidas estáticas de propósito general (GP); consulte la sección Encapsulados<!-- /BGA-ONLY -->.
- 3 UART, 4 I2C, 2 SPI y 2 CAN.
- 2 GPTIM (4 canales cada uno), 2 LPTIM, 2 ATIM (cada uno con 3 canales diferenciales o 4 de extremo único), 1 PWM (5 canales) y 1 PTM (16 canales).
- 4 salidas de reloj RTC; en estados de suspensión, 4 salidas de reloj de baja frecuencia (máximo de 16 kHz).
- 2 SDIO y 3 interfaces de almacenamiento MPI.
- 2 interfaces de audio I2S y 2 PDM; 1 salida de audio analógica diferencial y 2 entradas de audio analógicas diferenciales.
- 1 USB 2.0 FS.
- 1 GPADC (12 canales).
- 1 controlador de pantalla LCDC (DPI de 24 bits, 8080 de 8/16 bits, QSPI, EPD de 8/16 bits y JDI serie/paralelo).
- 1 interfaz de cámara DCMI (DVP de hasta 16 bits, SPI de 2 líneas de datos y QSPI de 4 líneas de datos).
- 10 fuentes de activación por hardware.
- Depuración mediante DBG-UART y SWD; descarga mediante DBG-UART, SWD, UART y USB.

!!! note "Alcance de las interfaces de pantalla"
    La nota de aplicación de hardware enumera SPI/QSPI, DPI de 24 bits, 8080 de 16 bits, EPD de 16 bits y JDI serie/paralelo en el resumen de interfaces LCDC del SF32LB57x. MIPI-DSI aparece en la lista de compatibilidad de ciertos circuitos integrados controladores de pantalla, pero no en ese resumen de interfaces LCDC directas del chip. No interprete la mención del controlador de panel como confirmación de una interfaz host MIPI-DSI nativa en el chip; antes de elegir el diseño, confirme con SiFli la ruta del controlador de pantalla concreto.

### 3.2. Variantes { #32-variants }

SF32LB57x incluye dos familias de alimentación:

<div align="center"><em>Tabla 3.2-1: resumen de números de pieza y variantes de alimentación</em></div>

<div align="center" markdown>

| Familia | Referencias habituales | Significado para el diseño |
|:-------|:---------------------|:---------------|
| Variantes alimentadas por batería | 570 / 573 / 575 / 576 / 577 / 578 / 579 | Para productos con batería de ion-litio. El diseño suele incluir VBAT, VCC, VBUS y un circuito de carga integrado o externo. |
| Variantes con alimentación de 3,3 V | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | Para sistemas alimentados por una fuente externa regulada de 3,3 V. PVDD, AVDD, VDDIO y otros rieles relacionados se suministran externamente. |

</div>

!!! warning
    Las dos familias de alimentación tienen conexiones, comportamiento de encendido y algunas definiciones de encapsulado diferentes. Confirme la referencia comercial exacta antes de reutilizar otro diseño.

### 3.3. Encapsulados { #33-packages }

Entre las opciones habituales se incluyen QFN68L, QFN80L<!-- BGA-ONLY --> y BGA112<!-- /BGA-ONLY -->. Los datos de encapsulado del SF32LB57x indican dos variantes de grosor para cada encapsulado, y las familias alimentadas por batería y a 3,3 V tienen diagramas de pines distintos. Seleccione siempre la distribución de pines, el POD, el patrón de pads y el plano de esténcil correspondientes a la referencia comercial exacta.

<div align="center"><em>Tabla 3.3-1: opciones de encapsulado y aspectos de diseño</em></div>

<div align="center" markdown>

| Encapsulado | Tamaño habitual | Paso | Aspectos de diseño |
|:--------|:-------------|:------|:-------------|
| QFN68L | 7 mm x 7 mm | 0,35 mm | Adecuado para diseños compactos; revise la conexión a tierra del pad expuesto, las aberturas del esténcil y la capacidad para distribuir las pistas desde el encapsulado en la capa superior. |
| QFN80L | 8 mm x 8 mm | 0,35 mm | Ofrece más recursos de E/S; revise las diferencias entre dominios de alimentación y los grupos de pines de pantalla y almacenamiento. |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,4 mm | Ocupa poco espacio, pero la distribución de pistas desde el encapsulado es más compleja; confirme pronto las capacidades del proceso de PCB. |
<!-- /BGA-ONLY -->

</div>

QFN68L y QFN80L solo ofrecen el número de GPIO especificado para cada referencia comercial; no incluyen E/S adicionales para MPI3 ni como salidas estáticas.

<!-- BGA-ONLY -->
!!! note "Disponibilidad de GPIO en BGA112"
    Solo aplicable a BGA112. SF32LB57x integra MPI1, MPI2 y MPI3. Consulte la [convención de nomenclatura de SF32](../../sf32-products/family/SF32_namingrule.md) para conocer la posición de la memoria integrada asociada a cada interfaz. En cualquiera de estas tres configuraciones de memoria integrada en el encapsulado, no se puede acceder a los pines MPI2 y MPI3 desde el exterior del encapsulado, por lo que solo quedan disponibles 58 GPIO fijos: (1) una PSRAM integrada en cada una de MPI1 y MPI2; (2) una única PSRAM de 256 Mb integrada en MPI2; o (3) una Flash NOR integrada en MPI3. `SF32LB57GVD776` corresponde al caso (3): su segundo `7` indica que el componente interno usa MPI3, por lo que solo hay 58 GPIO disponibles. Fuera de estas tres configuraciones, las seis E/S BGA112 asociadas a MPI3 pueden utilizarse para MPI3 o como salidas estáticas de propósito general (GP) configuradas con pull-up o pull-down; no son GPIO de libre asignación. Por tanto, `58 + 6` en `SF32LB57ZVN7N6` significa 58 GPIO más seis E/S para MPI3 o salidas estáticas, no 64 GPIO de libre asignación.
<!-- /BGA-ONLY -->

<div align="center"><em>Tabla 3.3-2: dimensiones de los encapsulados</em></div>

<div align="center" markdown>

| Encapsulado | Tamaño del cuerpo | Grosor del chip | Paso |
|:--------|:----------|:---------------|:------|
| QFN68L | 7 mm x 7 mm | 0,9 mm | 0,35 mm |
| QFN68L | 7 mm x 7 mm | 1,1 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 0,9 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 1,1 mm | 0,35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,98 mm | 0,4 mm |
| BGA112 | 5,4 mm x 4,4 mm | 1,03 mm | 0,4 mm |
<!-- /BGA-ONLY -->

</div>

Puntos de revisión recomendados:

- La numeración de pines coincide con la asignación indicada en la hoja de datos.
- Los pines de alimentación, GND, RF, cristal, USB, pantalla, arranque y depuración están ubicados correctamente.
- La conexión a tierra del pad expuesto del QFN y las vías térmicas cumplen las reglas de montaje.
<!-- BGA-ONLY -->
- Se han confirmado con el proveedor de PCB la distribución de pistas del BGA, las vías ciegas/enterradas, la máscara de soldadura, las aberturas del esténcil y la capacidad de montaje.
<!-- /BGA-ONLY -->

![Figura 3.3-1: regla de nomenclatura de los números de pieza SF32LB57x](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-1: regla de nomenclatura de los números de pieza SF32LB57x</em></div>

![Figura 3.3-2: asignación de pines de la variante QFN68L alimentada por batería](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-2: asignación de pines de la variante QFN68L alimentada por batería</em></div>

![Figura 3.3-3: asignación de pines de la variante QFN68L con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-3: asignación de pines de la variante QFN68L con alimentación de 3,3 V</em></div>

![Figura 3.3-4: asignación de pines de la variante QFN80L alimentada por batería](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-4: asignación de pines de la variante QFN80L alimentada por batería</em></div>

![Figura 3.3-5: asignación de pines de la variante QFN80L con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-5: asignación de pines de la variante QFN80L con alimentación de 3,3 V</em></div>

<!-- BGA-ONLY -->
![Figura 3.3-6: asignación de pines de la variante BGA112 alimentada por batería](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-6: asignación de pines de la variante BGA112 alimentada por batería</em></div>

![Figura 3.3-7: asignación de pines de la variante BGA112 con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 3.3-7: asignación de pines de la variante BGA112 con alimentación de 3,3 V</em></div>
<!-- /BGA-ONLY -->

### 3.4. Funciones principales de hardware { #34-major-hardware-features }

- Dos familias prácticas de alimentación: variantes alimentadas por batería y variantes con fuente externa regulada de 3,3 V.
- Encapsulados QFN68L, QFN80L<!-- BGA-ONLY --> y BGA112<!-- /BGA-ONLY -->, cada uno con requisitos específicos de asignación de pines, patrón de pads, esténcil y proceso de PCB.
- Compatibilidad con pantallas SPI/QSPI, 8080, RGB/DPI, EPD y JDI, según las capacidades y la asignación de pines de cada dispositivo; consulte en la Sección 3.1 el alcance de MIPI-DSI.
- Opciones de almacenamiento y arranque mediante memoria integrada en el encapsulado y almacenamiento externo MPI/SDIO.
- Los diseños de RF, cristales, audio, cámara, pantalla, USB, SDIO y alimentación requieren una revisión conjunta temprana del esquemático y la PCB.

### 3.5. Aplicaciones habituales { #35-typical-applications }

SF32LB57x es adecuado para productos que requieren funciones de IA, cámara o pantalla avanzada, además de conectividad Bluetooth, en un formato compacto:

- Relojes inteligentes, relojes deportivos y otros dispositivos vestibles
- Dispositivos inteligentes portátiles y controladores para el hogar inteligente
- Sensores con IA y dispositivos de inferencia en el borde
- Productos Bluetooth con cámara
- Dispositivos con pantallas que utilicen interfaces SPI/QSPI, RGB/DPI, 8080, EPD o JDI, según el dispositivo y la topología del controlador seleccionados
- Productos que necesitan un encapsulado QFN<!-- BGA-ONLY --> o BGA<!-- /BGA-ONLY --> compacto con abundantes opciones de GPIO y almacenamiento

## 4. Diseño de un vistazo { #4-design-at-a-glance }

### 4.1. Arquitectura de hardware { #41-hardware-architecture }

<div align="center"><em>Tabla 4.1-1: diseño de un vistazo</em></div>

<div align="center" markdown>

| Elemento de diseño | Implementación habitual |
|:---|:---|
| Familias de alimentación | Variantes alimentadas por batería o variantes con fuente externa regulada de 3,3 V; no mezcle los esquemáticos de alimentación |
| Encapsulados | QFN68L, QFN80L<!-- BGA-ONLY --> y BGA112<!-- /BGA-ONLY -->; elija la distribución de pines, el POD, el patrón de pads y el plano de esténcil según la referencia comercial exacta |
| Proceso de PCB | Confirme con el proveedor de PCB/montaje los requisitos de pads QFN, vías del pad expuesto y esténcil<!-- BGA-ONLY -->; para BGA, confirme pronto la viabilidad de la distribución de pistas desde el encapsulado y del proceso de fabricación<!-- /BGA-ONLY --> |
| Relojes | Cristal principal de 48 MHz y cristal RTC de 32,768 kHz |
| RF | Ruta de antena de 50 Ω, red de adaptación π cerca del chip y filtrado local de la alimentación RF |
| Pantalla | SPI/QSPI, 8080, RGB/DPI, EPD o JDI, según las capacidades y la asignación de pines del dispositivo; consulte en la Sección 3.1 el alcance de MIPI-DSI |
| Almacenamiento | Memoria integrada en el encapsulado y opciones de almacenamiento externo MPI/SDIO; defina el medio de arranque antes del diseño de PCB |
| Audio | Opciones de entrada/salida analógica, PDM/I2S, polarización de micrófono, referencia de audio y PA externo |
| Cámara | Interfaz DCMI; diseñe su trazado y alimentación como una interfaz de alta velocidad sensible al ruido |
| Depuración y producción | DBG-UART, SWD, configuración de arranque, PA00/PA01/PA34, rieles de alimentación y puntos de prueba de producción |

</div>

### 4.2. Flujo de diseño de hardware { #42-hardware-design-flow }

<div align="center"><em>Tabla 4.2-1: flujo de diseño de hardware</em></div>

<div align="center" markdown>

| Paso | Decisión de diseño | Secciones principales |
|:---|:---|:---|
| 1 | Confirmar la referencia comercial exacta, la familia de alimentación, el encapsulado y la distribución de pines | Descripción del dispositivo |
| 2 | Fijar el almacenamiento de arranque, la interfaz de pantalla, el uso de cámara, el acceso de depuración y los objetivos de bajo consumo | Diseño de un vistazo, diseño del esquemático |
| 3 | Definir el árbol de alimentación, la estrategia de carga/OVP, los componentes BUCK/LDO y el comportamiento de encendido | Sistema de alimentación |
| 4 | Seleccionar las fuentes de reloj, la topología RF, el almacenamiento, la pantalla, el audio, la cámara y las interfaces generales | Generación de reloj, RF, interfaces de usuario, almacenamiento y conectividad |
| 5 | Revisar la huella del encapsulado, el apilado, la distribución de pistas desde el encapsulado y el trazado de RF, cristales, USB, SDIO, pantalla, audio y alimentación | Directrices de diseño de PCB |
| 6 | Completar la autocomprobación del diseño por parte del cliente y archivar el esquemático, el diseño, AVL, DRC/ERC, impedancias y evidencias de alimentación, RF y producción antes de EVT | Autocomprobación del diseño por parte del cliente |

</div>

### 4.3. Cómo utilizar esta guía { #43-how-to-use-this-guide }

Consulte esta guía siguiendo el orden de revisión de una placa. Primero confirme la referencia comercial exacta de SF32LB57x y la familia de alimentación, defina el encapsulado y el proceso de PCB, y revise la hoja de datos junto con el esquemático del sistema mínimo correspondiente al apartado 5.1. Después, defina el árbol de alimentación, el medio de arranque y el acceso necesario para depuración y descarga; asigne las funciones de E/S a partir de la tabla de multiplexación de pines según los requisitos del producto. Una vez fijado el sistema mínimo, revise los relojes, RF, pantalla, almacenamiento, audio, cámara, interfaces generales, diseño de PCB y acceso de producción. El apartado 5 establece la base del esquemático, el apartado 6 la base de implementación de PCB y el apartado 7 la autocomprobación del diseño por parte del cliente antes de liberar el esquemático o el diseño.

### 4.4. Paquete de evidencias para la revisión { #44-review-evidence-pack }

Antes de EVT, archive las versiones de la hoja de datos, el manual de usuario y el diseño de referencia; el PDF del esquemático; el apilado de PCB; los informes de impedancia y DRC/ERC; el árbol de alimentación; el presupuesto de consumo para los modos de bajo consumo; las rutas de carga y arranque; y la lista de puntos de prueba de producción. Guarde también capturas centradas en RF, cristales, USB, SDIO, pantalla, cámara, audio, GPADC y la salida de pistas desde el encapsulado.

## Continuación de la guía de diseño { #continue-the-design-guide }

La guía completa continúa en las siguientes páginas, cada una dedicada a una etapa del proceso de diseño.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Sistema mínimo y alimentación](SF32LB57x_schematic_system_power.md)__ — correspondencia entre encapsulado y familia de alimentación, pines de configuración de arranque, medio de arranque, acceso de depuración/descarga, árbol de alimentación, carga/OVP, BUCK, rieles de bajo consumo y modos de funcionamiento
- :fontawesome-solid-wave-square: __[Reloj, RF e interfaces de usuario](SF32LB57x_schematic_clock_rf_interfaces.md)__ — cristales de 48 MHz y 32,768 kHz, adaptación RF y ruta de antena, pantalla, táctil/retroiluminación, audio, cámara, botones y motor
- :fontawesome-solid-database: __[Almacenamiento y fabricación](SF32LB57x_schematic_storage_mfg.md)__ — almacenamiento, arranque, GPIO, tablas de asignación de pines del IO MUX y matriz, UART/I2C/SPI/SDIO/USB/CAN/GPADC, grabación de producción, calibración y acceso para útiles de prueba
- :fontawesome-solid-list-check: __[Lista de comprobación del esquemático](SF32LB57x_schematic_checklist.md)__ — lista detallada para revisar el esquemático (apartado 5.8)
- :fontawesome-solid-microchip: __[Directrices de diseño de PCB](SF32LB57x_pcb_layout.md)__ — apilado, restricciones críticas de PCB, trazado de alimentación/cristal/RF/analógico/audio/alta velocidad, EMI/ESD/EOS y figuras de referencia
- :fontawesome-solid-list-check: __[Lista de comprobación del diseño de PCB](SF32LB57x_pcb_layout_checklist.md)__ — lista detallada para revisar el diseño de PCB (apartado 6.10)
- :fontawesome-solid-book-open: __[Lista de comprobación de revisión de diseño y referencias](SF32LB57x_review_and_reference.md)__ — autocomprobación del diseño por parte del cliente, documentos y referencias relacionados, apéndices e historial de revisiones

</div>
