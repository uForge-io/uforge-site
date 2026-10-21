---
icon: lucide/microchip
description: "SF32LB56x: familia avanzada de MCU Bluetooth de modo dual y consumo ultrabajo para pantallas avanzadas, audio integrado, memoria externa y procesamiento siempre activo."
tags:
    - Hardware
    - Chip
---

# SF32LB56x { #sf32lb56x }

## Visión general { #overview }

La serie SF32LB56x es una familia avanzada de microcontroladores AIoT de consumo ultrabajo para productos que necesitan Bluetooth de modo dual, gráficos más avanzados, audio integrado, memoria externa y más opciones de visualización y almacenamiento que las familias SF32LB de gama inferior.

La familia utiliza una arquitectura big.LITTLE de doble núcleo: un procesador de aplicación Arm Cortex-M33 STAR-MC1[^1] de alto rendimiento, con una frecuencia de hasta 240 MHz, y un procesador Arm Cortex-M33 STAR-MC1 de consumo ultrabajo, de hasta 96 MHz. El núcleo principal se ocupa de la interfaz de usuario, la pantalla, el almacenamiento y la lógica del producto; el núcleo de bajo consumo gestiona la detección siempre activa, el modo de espera y el control de Bluetooth con un presupuesto energético menor.

La ficha de producto y la hoja de datos oficiales de SiFli presentan SF32LB56x como una opción de mayor integración para dispositivos conectados con abundantes funciones de pantalla y audio. La familia incorpora Bluetooth 5.3 de modo dual con BLE Audio, gráficos ePicasso 2.0, ADC y DAC de audio integrados, un acelerador para TinyML, opciones de Flash integrada en el encapsulado y más interfaces para memoria externa y pantallas. Es una opción adecuada cuando el diseño supera las capacidades de SF32LB55x en conectividad inalámbrica, visualización o audio, pero sigue necesitando la eficiencia y el nivel de integración propios de una MCU.

También es importante consultar la guía de modelos de chips de SiFli: las interfaces de pantalla disponibles en SF32LB56x dependen del encapsulado. Por ello, el código de pedido y el encapsulado deben definirse al establecer la arquitectura, no dejarse para la fase final del diseño de la PCB.

[^1]: STAR-MC1 es una IP configurable de CPU embebida Armv8-M Mainline de Arm China. En los dispositivos SF32 compatibles, SiFli lo documenta como un procesador de aplicación Arm Cortex-M33 STAR-MC1. Su modelo de software de clase Cortex-M33 ayuda a que el firmware, middleware, adaptaciones de RTOS y herramientas Cortex-M33 existentes se puedan reutilizar, sujeto al trabajo normal de integración específico del dispositivo. Sus configuraciones CU, SP y SE varían principalmente en capacidad de caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para el componente SF32 exacto. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

## Aplicaciones { #applications }

**SF32LB56x se recomienda para** productos Bluetooth de modo dual que necesitan mejores prestaciones de pantalla y audio, más almacenamiento o mayor capacidad de procesamiento local, por ejemplo:

- Relojes inteligentes y pulseras inteligentes
- Dispositivos portátiles con interfaz gráfica
- Dispositivos médicos y de atención sanitaria
- Productos HMI conectados
- Terminales portátiles industriales
- Cerraduras y electrodomésticos inteligentes
- Concentradores de sensores de bajo consumo
- Pantallas avanzadas para bicicletas y patinetes eléctricos

Elija SF32LB56x si el diseño requiere una o varias de estas capacidades:

- Bluetooth 5.3 de modo dual con BLE Audio
- ADC y DAC de audio HiFi integrados
- Tareas de visualización y cargas gráficas más exigentes
- Interfaz de pantalla DPI/RGB
- Wi-Fi externo mediante SDIO; almacenamiento externo mediante SD/SDIO o eMMC
- Más GPIO con la opción WBBGA175
- Más margen para ejecutar simultáneamente cargas TinyML, audio e interfaz de usuario

## Recursos de desarrollo { #development-resources }

[Ficha de producto]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[Hoja de datos]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[Guía de diseño de hardware (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Guía de diseño de hardware (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Fuente de la nota de aplicación de hardware (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Fuente de la nota de aplicación de hardware (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Guía de diseño de hardware (μForge.io)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Fuente de la lista de comprobación de diseño de hardware]: https://wiki.sifli.com/hardware/index.html
[Documentación del SDK]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[Referencia de la API]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha de producto]__
- :fontawesome-solid-file-pdf: __[Hoja de datos]__
- :fontawesome-solid-file-pdf: __[Manual de usuario]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Fuente de la nota de aplicación de hardware (U)]__
- :fontawesome-brands-github: __[Fuente de la nota de aplicación de hardware (V)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (μForge.io)]__
- :fontawesome-solid-book: __[Documentación del SDK]__
- :fontawesome-solid-book-open: __[Referencia de la API]__
- :fontawesome-solid-list-check: __[Fuente de la lista de comprobación de diseño de hardware]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Cómputo y memoria { #compute-and-memory }

- Procesador de aplicación Arm Cortex-M33 STAR-MC1 de alto rendimiento (HCPU), hasta 240 MHz
- Procesador Arm Cortex-M33 STAR-MC1 de consumo ultrabajo (LCPU), hasta 96 MHz
- Hasta 370 DMIPS / 984 EEMBC CoreMark en HCPU
- Hasta 148 DMIPS / 394 EEMBC CoreMark en LCPU
- Sistema de memoria HCPU: caché de instrucciones de 32 KB y caché de datos de 16 KB; 800 KB de SRAM, incluidos 128 KB de SRAM de retención
- Sistema de memoria LCPU: caché de instrucciones de 16 KB y caché de datos de 8 KB; 160 KB de SRAM de retención
- Opciones de QSPI-NOR integrada en el encapsulado de 512 KB o 1 MB
- Interfaces de memoria externa para QSPI-NOR, SPI-NAND, QPI/OPI-PSRAM, SD/SDIO y eMMC

### Gráficos, pantalla e IA { #graphics-display-and-ai }

- Aceleración gráfica 2D/2.5D ePicasso 2.0
- Composición alfa de cuatro capas más una capa de fondo
- Rotación, escalado, espejo y conversión de formatos habituales por hardware
- Capacidad de procesamiento gráfico de hasta 1024 × 1024
- Descompresión gráfica sin pérdidas eZip 2.0 con soporte nativo de animación eZip-A
- En las variantes compatibles, el controlador LCD admite 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB y JDI; la disponibilidad depende del encapsulado y del código de pedido exactos
- TurboPixel: extDMA comprime el framebuffer final con pérdida y una relación fija; el controlador de pantalla lo descomprime, lo que reduce el ancho de banda y la capacidad de PSRAM necesarios
- Acelerador matricial de redes neuronales para TinyML, de hasta 1,92 GOPS y más de 10 TOPS/W

### Audio y conectividad inalámbrica { #audio-and-wireless-connectivity }

- Bluetooth 5.3 de modo dual con BLE Audio
- Sensibilidad: -100 dBm en BLE a 1 Mbps, -96,3 dBm en BR, -95,5 dBm en EDR2 y -88,5 dBm en EDR3
- Potencia máxima de transmisión: 19 dBm en BR/BLE y 13 dBm en EDR2/EDR3
- Corriente pico de recepción BR: 2,2 mA a 3,3 V
- 1 DAC de audio HiFi de 24 bits con SNR de 108 dB
- 1 ADC de audio HiFi de 24 bits con SNR de 99 dB
- 2 interfaces PDM y 1 interfaz I2S

### Seguridad { #security }

- Aceleradores de hardware AES, HASH y CRC
- Generador de números aleatorios verdaderos (TRNG)
- PSA Certified Level 1

### Periféricos y E/S { #peripherals-and-ios }

- 6 interfaces UART
- 7 interfaces I2C
- 4 interfaces SPI
- 1 interfaz ISO7816
- 1 interfaz USB 2.0 FS
- 4 interfaces MPI
- 2 interfaces SD/SDIO/eMMC: una de 4 bits y otra de 8 bits
- 1 ADC SAR de propósito general de 12 bits con 8 canales
- Sensor de temperatura
- 2 comparadores de tensión de bajo consumo
- Controlador de tareas periféricas (PTC)
- Hasta 120 GPIO, según el encapsulado

### Alimentación y encapsulado { #power-supply-and-package }

- Rango de tensión de alimentación: 1,71 a 3,63 V
- Temperatura de funcionamiento: −40 °C a +85 °C
- Regulador buck de alta eficiencia y LDO de bajo consumo integrados
- Corriente en modo de suspensión con activación por RTC: 600 nA
- Corriente en modo de suspensión con activación por pin: 300 nA
- Opciones de encapsulado: QFN68L y WBBGA175

## Variantes de familia { #family-variants }

SF32LB56x incluye variantes compactas QFN68L y variantes WBBGA175 con más E/S y distintas opciones de memoria integrada. Elija pronto el código de pedido exacto: las interfaces de pantalla, la cantidad disponible de GPIO, la capacidad de almacenamiento, los requisitos de fabricación de la PCB y las posibilidades de migrar a un módulo varían considerablemente entre variantes.

Las variantes de la tabla tienen un rango de alimentación documentado de 1,71 a 3,63 V y funcionan de −40 °C a +85 °C. Los dominios de alimentación de GPIO admiten de 1,71 a 3,45 V; las líneas de E/S de la memoria integrada tienen límites propios. Consulte la guía de hardware de la variante U o V correspondiente antes de definir los niveles de interfaz.

**Discrepancia documental para `SF32LB566VCB36`:** la [guía de modelos de chips de SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) indica 1 MB de QSPI-NOR integrada en el encapsulado, mientras que la información de pedido de la versión anterior de la [hoja de datos DS5601 V1.9.2](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf) indica 4 Mb (0,5 MB). El [índice actual de documentación de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst) enlaza DS5601 V1.9.3, pero no fue posible verificar la información de pedido de esa versión en esta revisión; por tanto, no se debe asumir que la discrepancia anterior siga vigente ni que se haya corregido. Esta tabla sigue la guía de modelos de chips. Antes de cerrar la BOM, compruebe el dato en V1.9.3 o confirme con SiFli el código de pedido exacto y la configuración de memoria suministrada.

<div align="center"><em>Variantes representativas de la familia SF32LB56x</em></div>

<div align="center" markdown>

| Código de pedido de ejemplo | Encapsulado | GPIO de HCPU / LCPU | Memoria integrada | Interfaz de pantalla | Aplicación típica |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB de Flash QSPI-NOR | QSPI | Dispositivos vestibles básicos, pantallas de papel electrónico o HMI compactas de la serie 56, con poca memoria y un trazado de salida de pines sencillo en la PCB |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB de OPI-PSRAM + 512 KB de Flash QSPI-NOR | QSPI | Diseño gráfico compacto que necesita más memoria para el framebuffer que la variante básica 560 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB de OPI-PSRAM + 512 KB de Flash QSPI-NOR | QSPI | Interfaz de usuario compacta de mayor resolución que aún puede usar un encapsulado QFN de menor coste |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB de OPI-PSRAM + 512 KB de Flash QSPI-NOR | QSPI | Producto compacto con uso intensivo de memoria y más recursos locales, sin pasar a BGA |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | 8 MB + 4 MB de OPI-PSRAM + 1 MB de Flash QSPI-NOR | DPI / QSPI / 8080 / JDI | Dispositivo vestible o HMI completa que necesita más opciones de pantalla, más E/S y el mismo silicio que SF32LB56-MOD |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB de OPI-PSRAM + 1 MB de Flash QSPI-NOR | DPI / QSPI / 8080 / JDI | Diseño con muchas E/S que prioriza una única región de PSRAM de mayor capacidad y un enrutamiento avanzado de pantalla, sin usar el chip estándar del módulo |

</div>

## Ruta de integración { #integration-path }

Siga estos pasos para convertir una selección preliminar de SF32LB56x en un diseño validado:

1. **Valide la ruta de firmware.** Empiece por la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Después, siga el [flujo de trabajo del SDK](../../develop/platforms/sifli-sdk/overview.md) y pruebe los [ejemplos](../../develop/examples/index.md) para verificar las rutas de pantalla, audio, Bluetooth y almacenamiento que requiere el producto.
2. **Elija el medio de integración.** Evalúe [SF32LB56-MOD](../modules/SF32LB56-MOD.md) para reducir el trabajo de integración de RF y memoria de alta velocidad, o use [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) para validar el diseño a nivel de placa.
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, consulte la [guía de diseño de hardware](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) y sus listas de comprobación del [esquemático](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md) y del diseño de PCB. Asegúrese de que el encapsulado U/V y la interfaz de pantalla correspondan a la variante elegida.
4. **Verifique la fuente de referencia.** Compruebe el código de pedido y el encapsulado exactos en la [hoja de datos][Hoja de datos], el [manual de usuario][Manual de usuario], la guía de hardware aplicable para [U][Guía de diseño de hardware (U, wiki.sifli.com)] o [V][Guía de diseño de hardware (V, wiki.sifli.com)] y la [fuente de la nota de aplicación de hardware U][Fuente de la nota de aplicación de hardware (U)] o [V][Fuente de la nota de aplicación de hardware (V)] correspondiente.

<!-- uf-faq:start -->
## Preguntas frecuentes { #frequently-asked-questions }

**¿Cuáles son las especificaciones principales del SF32LB56x?**
El SF32LB56x combina una CPU de aplicación (Cortex-M33 @240 MHz) con un núcleo de bajo consumo (Cortex-M33 @48/96 MHz, un núcleo programable por el usuario), 960 KB de SRAM interna y Bluetooth dual (BT clásico + BLE). Gráficos: ePicasso 2.0. Encapsulado: QFN68 / BGA175 (7 × 7 mm (QFN), 6.5 × 6.1 mm (BGA)). USB 2.0 FS. Valores de la familia; verifique la hoja de datos del número de pieza exacto.

**¿Qué interfaces de pantalla admite el SF32LB56x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. La disponibilidad varía según el número de pieza y el encapsulado.

**¿Cuánta memoria en el encapsulado ofrece el SF32LB56x?**
Hasta 16 MB de PSRAM y hasta 1 MB de Flash NOR en el encapsulado, según el número de pieza.

**¿Qué tensión de alimentación necesita el SF32LB56x?**
1.71–3.63 V, según la variante. Confirme el rango exacto en la hoja de datos.

**¿Por dónde empezar un diseño de hardware con el SF32LB56x?**
Empiece con la [guía de diseño de hardware del SF32LB56x](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) para esquemático, alimentación, reloj/RF y diseño de PCB, y use después las listas de verificación de esquemático y layout antes de liberar la placa.
<!-- uf-faq:end -->

## Productos relacionados { #related-products }

### Módulo { #module }

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) integra el chip SF32LB566VCB36, la memoria, el diseño de RF y las opciones de antena en un módulo listo para incorporar al producto. Es una opción adecuada para aprovechar las prestaciones de SF32LB56x y reducir los riesgos asociados al diseño de RF, la adaptación de antena, la colocación del cristal y la integración de memoria de alta velocidad.

### Placas de desarrollo { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) es un punto de partida práctico para poner en marcha el firmware y validar la pantalla, el audio, el almacenamiento, la RF y el consumo antes de decidirse por un diseño con el chip integrado directamente o por un módulo.

### Productos de referencia { #reference-products }

Entre los productos basados en SF32LB56x se encuentran los relojes inteligentes avanzados, los paneles HMI conectados, los dispositivos sanitarios, los terminales portátiles industriales, los instrumentos portátiles y las pantallas avanzadas para bicicletas y patinetes eléctricos.
