---
icon: lucide/microchip
description: "SF32LB52x: familia de MCU AIoT de doble núcleo Arm Cortex-M33 orientada a diseños de bajo coste para productos portátiles y AIoT compactos; incluye las variantes con batería SF32LB520/3/5/7 y las variantes de alimentación externa 52B/D/E/G/J."
tags:
    - Hardware
    - Chip
---

# SF32LB52x { #sf32lb52x }

## Visión general { #overview }

SF32LB52x es una familia de MCU de SiFli pensada para relojes y otros dispositivos portátiles de gama básica, interfaces HMI gráficas compactas, periféricos Bluetooth y productos AIoT con espacio limitado que necesitan pantalla, audio, almacenamiento y conectividad inalámbrica integrados, con un diseño optimizado en coste.

A nivel de plataforma, la familia combina un núcleo de aplicación Arm Cortex-M33 STAR-MC1[^1] a 240 MHz con un núcleo controlador Bluetooth dedicado de bajo consumo a 24 MHz. Esta arquitectura permite ejecutar una interfaz de usuario ágil y la pila de la aplicación mientras mantiene separadas la conectividad Bluetooth y las tareas que deben permanecer activas.

Para la planificación del producto, las variantes principales de la guía de modelos de chips de SiFli se dividen en dos grupos según su alimentación:

- **SF32LB520/3/5/7**: variantes alimentadas por batería de ion-litio, con una ruta de carga integrada.
- **52B/D/E/G/J**: variantes de alimentación externa. 52B/E/G/J están destinadas a sistemas estándar de 3,3 V, mientras que **52D** está diseñada para una línea de alimentación específica de 1,8 V en aplicaciones de consumo ultrabajo.

Los grupos no son intercambiables directamente en una misma placa: las familias con batería y de alimentación externa no son compatibles pin a pin. Además, la variante 52D de 1,8 V es eléctricamente distinta del grupo 52B/E/G/J de 3,3 V, aunque sus encapsulados tengan una disposición similar.

[^1]: STAR-MC1 es una IP configurable de CPU embebida Armv8-M Mainline de Arm China. En los dispositivos SF32 compatibles, SiFli lo documenta como un procesador de aplicación Arm Cortex-M33 STAR-MC1. Su modelo de software de clase Cortex-M33 facilita reutilizar el firmware, el middleware, las adaptaciones para RTOS y las herramientas existentes para Cortex-M33, aunque cada dispositivo requiere el trabajo habitual de integración específico. Las configuraciones CU, SP y SE varían principalmente en caché, TCM, XIPU y TrustZone; las instrucciones personalizadas de Arm/CDE y la interfaz de coprocesador son capacidades opcionales que deben verificarse para el componente SF32 concreto. La documentación de SiFli puede usar ***Arm Cortex-M33 STAR-MC1*** o ***Arm Cortex-M33*** según el contexto.

## Aplicaciones { #applications }

**SF32LB52x se recomienda para** productos centrados en Bluetooth en los que el coste, el nivel de integración y la autonomía son factores de diseño prioritarios, por ejemplo:

- Relojes inteligentes y pulseras de actividad de gama básica
- Módulos Bluetooth y adaptadores inalámbricos
- Accesorios de audio Bluetooth
- Sensores inteligentes y otros dispositivos portátiles
- Etiquetas electrónicas para estanterías y credenciales inteligentes
- Impresoras de etiquetas portátiles
- Pantallas para bicicletas y patinetes eléctricos
- Dispositivos HMI básicos basados en LVGL

## Recursos de desarrollo { #development-resources }

[Ficha de producto (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Hoja de datos (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Ficha de producto (familia SF32LB52X con alimentación externa)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Hoja de datos (familia SF32LB52X con alimentación externa)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Guía de diseño de hardware (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Guía de diseño de hardware (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Comprar muestras]: https://sifli.taobao.com/
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Ficha de producto (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Hoja de datos (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Ficha de producto (familia SF32LB52X con alimentación externa)]__
- :fontawesome-solid-file-pdf: __[Hoja de datos (familia SF32LB52X con alimentación externa)]__
- :fontawesome-solid-file-pdf: __[Manual de usuario]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specs }

### Cómputo y memoria { #compute-and-memory }

- Núcleo de aplicación Arm Cortex-M33 STAR-MC1 de hasta 240 MHz, con DSP y MPU
- Núcleo controlador Bluetooth Arm Cortex-M33 STAR-MC1 dedicado, a 24 MHz
- Caché de instrucciones de 32 KB + caché de datos de 16 KB
- 512 KB de SRAM para aplicaciones y 64 KB de SRAM para el controlador Bluetooth
- Memoria integrada en el encapsulado según la variante, desde 1 MB de QSPI-NOR hasta 16 MB de OPI-PSRAM

### Gráficos y audio { #graphics-and-audio }

- Acelerador gráfico 2D/2.5D ePicasso 2.0
- Decodificador de hardware eZip 2.0 para compresión gráfica sin pérdidas
- Controlador LCD dedicado compatible con SPI/DSPI/QSPI (incluido SPI para papel electrónico) y con interfaz 8080 de 8 bits
- 1 ADC de audio de 24 bits, con una relación señal/ruido (SNR) de 99 dB
- 1 DAC de audio de 24 bits, con una relación señal/ruido (SNR) de 109 dB

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth 5.3 de modo dual (Bluetooth Classic y BLE)
- Potencia de transmisión máxima:
    - 19 dBm para BLE/BR
    - 13 dBm para BT/EDR2 y BT/EDR3
- Sensibilidad: -100 dBm a BLE/1 Mbps
- Núcleo controlador Bluetooth Arm Cortex-M33 STAR-MC1 dedicado, con 64 KB de SRAM y frecuencia de 24 MHz
- La ficha de producto indica una corriente de suspensión de 2 µA; la corriente de reposo del sistema depende del modo de funcionamiento y de las fugas de la placa

### Seguridad { #security }

- Aceleradores de hardware AES/HASH/CRC
- TRNG
- PSA Certified Level 1

### Periféricos y E/S { #peripherals-and-ios }

- 3x UART
- 4x I2C
- 2x SPI
- 1 USB 2.0 FS
- 1 I2S
- 1 interfaz PDM (admite hasta dos micrófonos digitales)
- 1 SD 3.0/SDIO 3.0/eMMC
- 1 ADC de propósito general de 12 bits
- Sensor de temperatura
- Temporizadores RTC y watchdog
- 44 o 45 GPIO según la variante

### Alimentación { #power-supply }

- **Grupo alimentado por batería: SF32LB520/3/5/7**: alimentación directa desde una batería Li-ion/Li-Po de una celda; está destinado a diseños basados en la arquitectura de alimentación con carga integrada.

- **Grupo de alimentación externa de 3,3 V: 52B/E/G/J**: destinado a sistemas con alimentación externa regulada; las variantes del grupo son compatibles pin a pin entre sí.

- **Grupo de alimentación externa de 1,8 V: SF32LB52D**: destinado a diseños especiales de ultra bajo consumo a 1,8 V; no es eléctricamente intercambiable con las variantes de 3,3 V.

Los grupos con batería y de alimentación externa corresponden a configuraciones de silicio distintas y **no son compatibles pin a pin** entre sí.

## Variantes de la familia { #family-variants }

Para las variantes principales incluidas en la guía de modelos de chips de SiFli, la división práctica es:

- **SF32LB520/3/5/7**: grupo alimentado por batería de iones de litio; las variantes son compatibles pin a pin dentro del grupo
- **52B/E/G/J**: grupo estándar con alimentación externa de 3,3 V; las variantes son compatibles pin a pin dentro del grupo
- **SF32LB52D**: variante especial con alimentación externa de 1,8 V para aplicaciones de consumo ultrabajo

Si se cambia de nivel de memoria, las variantes más próximas son:

- 520 ↔ 52B
- 523 ↔ 52E, con 52D como contraparte de 1,8 V
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>Variantes principales de SF32LB52x</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Encapsulado | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Tamaño | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm |
| Paso | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Memoria integrada en el encapsulado | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| Rango de alimentación | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 2,97–3,63 V | 2,97–3,63 V | 1,71–1,98 V | 2,97–3,63 V | 2,97–3,63 V | 2,97–3,63 V |
| Tensión de E/S | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatura de funcionamiento | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C | −40 a +85 °C |

</div>

Esta tabla resume las variantes principales de la [guía de modelos de chips de SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html); no es un catálogo completo de referencias. La hoja de datos enlazada para la familia con alimentación externa también incluye **SF32LB52HUD6** (1,8 V, QFN68L, PSRAM de 128 Mb), mientras que la guía de diseño de hardware utiliza además los patrones de sufijo `52AUx6` y `52D/F/HUx6`. Las fuentes disponibles no ofrecen una única tabla coherente con todas las variantes. Antes de liberar el diseño, confirme en la hoja de datos vigente el estado de pedido, los límites de alimentación, la interfaz de memoria y las características de E/S de cualquier SKU de este tipo.

## Ruta de integración { #integration-path }

Siga estos pasos para convertir una selección preliminar de SF32LB52x en un diseño validado:

1. **Valide el entorno de firmware.** Empiece por la [guía de inicio del SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Después, siga el [flujo de trabajo del SiFli SDK](../../develop/platforms/sifli-sdk/overview.md) y pruebe los [ejemplos](../../develop/examples/index.md) para verificar los periféricos necesarios y el funcionamiento de Bluetooth.
2. **Elija el medio de integración.** Si el producto puede usar un módulo de RF ya integrado, evalúe [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md). Si no, elija la [placa de desarrollo SF32LB52](../devkits/SF32LB52-DevKit-LCD.md) más adecuada para validar pronto el firmware y los periféricos.
3. **Diseñe y revise el hardware.** Antes de liberar el esquemático o el diseño de la placa, consulte la [guía de diseño de hardware](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) y sus listas de comprobación del [esquemático](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) y del [diseño de PCB](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md). Confirme que la variante pertenece al grupo de alimentación correcto: 520/3/5/7, 52B/E/G/J o 52D.
4. **Verifique la fuente de referencia.** Consulte la [hoja de datos](#development-resources) correspondiente y la guía de diseño de hardware de SiFli para [520/3/5/7][Guía de diseño de hardware (520/3/5/7)] o [52B/D/E/G/J][Guía de diseño de hardware (52B/D/E/G/J)], comprobando el código de pedido y el encapsulado exactos.

## Productos relacionados { #related-products }

### Módulo { #module }

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) combina el chip SF32LB525UC6 —que, en la configuración estándar, incorpora 8 MB de OPI-PSRAM en su encapsulado— con una red de adaptación de RF. El módulo mide 27,9 × 18,0 × 3,1 mm y está pensado para proyectos que necesitan las prestaciones de SF32LB52 sin asumir el diseño y la validación de RF a nivel de chip.

### Placas de desarrollo { #development-kits }

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) es la placa principal del ecosistema de módulos SF32LB52 para la puesta en marcha con pantalla; ofrece conexiones LCD QSPI y MCU/8080.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) es una placa núcleo compacta con alimentación externa, pensada para poner en marcha rápidamente el firmware, las GPIO y las funciones de bajo consumo en variantes de la clase 52B/52J.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) es la placa de desarrollo más pequeña de la serie 52 y resulta útil cuando el producto final tiene restricciones de espacio.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) está orientada a la evaluación de diseños con batería y a las primeras pruebas de productos compactos de bajo consumo.

### Productos de referencia { #reference-products }

Entre las aplicaciones habituales de SF32LB52 se encuentran los relojes inteligentes de gama básica, las pulseras de actividad, los accesorios Bluetooth, los controles gráficos compactos, las etiquetas electrónicas para estanterías, las credenciales inteligentes, las impresoras portátiles de etiquetas y las pantallas para bicicletas o patinetes eléctricos en las que el coste es un factor importante.

!!! note "Contenido autogenerado"
    Esta página se ha redactado sin un documento fuente específico. Verifique las afirmaciones técnicas en la documentación oficial de SiFli antes de basarse en ellas.
