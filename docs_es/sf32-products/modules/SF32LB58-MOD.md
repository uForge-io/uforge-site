---
icon: lucide/card-sim
description: "SF32LB58-MOD: módulo Bluetooth de bajo consumo basado en MCU SF32LB586VDD36; configuración estándar con 16 + 16 MB de HPI-PSRAM y 1 MB de QSPI-NOR, además de variantes NOR, NAND o eMMC."
tags:
  - Hardware
  - Módulo
---

# SF32LB58-MOD { #sf32lb58-mod }

## Visión general { #overview }

SF32LB58-MOD es un módulo Bluetooth de bajo consumo basado en el MCU SF32LB586VDD36 de SiFli. La configuración estándar incluye 16 + 16 MB de HPI-PSRAM y 1 MB de QSPI-NOR. El módulo de 24 × 24 × 3,1 mm integra la plataforma de tres núcleos, el circuito de RF, el cristal y varias configuraciones de memoria, además de ofrecer interfaces externas para pantalla, audio, almacenamiento y control.

El módulo integra el chip BGA256, la ruta de RF, el cristal y la memoria de alta velocidad, lo que reduce el enrutamiento correspondiente en la placa portadora del producto. El producto final aún requiere validación de RF y las aprobaciones reglamentarias aplicables. Antes de cerrar el diseño de la placa portadora, confirme la opción de antena y la configuración de memoria del SKU seleccionado.

Según el SKU elegido, la plataforma puede combinar HPI-PSRAM con almacenamiento QSPI-NOR, QSPI-NAND o eMMC. Las interfaces del módulo permiten desarrollar productos con funciones de pantalla, audio, almacenamiento y conectividad sobre una plataforma basada en MCU.

DS5802 V0.1 describe una antena PCB integrada en el módulo y opciones para conectar una antena externa. La antena externa puede conectarse mediante pads castellados o el conector externo de primera generación, compatible con conectores Hirose U.FL, I-PEX MHFI y Amphenol AMC. La hoja de datos no indica qué opción corresponde a cada SKU; confirme con SiFli la implementación de antena del módulo elegido antes de finalizar el diseño de la placa portadora.

!!! info
    Consulte [SF32LB58x](../chips/SF32LB58x.md) para conocer la arquitectura y los periféricos de la familia de chips. Esta página se centra en la integración del módulo, sus configuraciones de memoria, las líneas de alimentación y los criterios de selección del producto.

## Aplicaciones { #applications }

SiFli enumera las siguientes áreas de aplicación para SF32LB58-MOD:

- Dispositivos vestibles: relojes inteligentes de gama alta, pulseras inteligentes, dispositivos médicos vestibles y equipos de fitness
- Industria: soluciones de visualización económicas, interfaces HMI gráficas, centros de control de sensores industriales, monitorización de equipos e instrumentos
- Automoción: unidades centrales de control para vehículos eléctricos, llaves de coche y dispositivos vestibles que funcionan como mandos a distancia para vehículos
- Domótica: electrodomésticos inteligentes pequeños y medianos, y cerraduras inteligentes
- Uso general: concentradores de sensores de bajo consumo y Bluetooth Mesh
- Ejemplos de AIoT: reconocimiento de comandos de voz, hogar inteligente, llaves inteligentes y paneles de control inteligentes

Considere SF32LB58-MOD cuando el diseño requiera una o varias de estas características:

- Integración en el módulo del chip BGA256, la ruta de RF, el cristal y la memoria de alta velocidad
- Antena PCB integrada o antena externa conectada mediante pads castellados o un conector compatible con Hirose U.FL, I-PEX MHFI y Amphenol AMC; confirme la configuración según el SKU
- Configuraciones de almacenamiento QSPI-NOR, QSPI-NAND o eMMC según el SKU
- Interfaces externas para pantalla, audio, almacenamiento y control

## Recursos de desarrollo { #development-resources }

[Hoja de datos del módulo]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Introducción al chip]: ../chips/SF32LB58x.md
[Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar kits de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Hoja de datos del módulo]__
- :fontawesome-solid-microchip: __[Introducción al chip]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specifications }

### Cómputo y memoria { #compute-and-memory }

- 2 núcleos de aplicación Arm Cortex-M33 STAR-MC1, hasta 240 MHz
- 1 núcleo Arm Cortex-M33 STAR-MC1 de bajo consumo, programable por el usuario, hasta 96 MHz
- Hasta 370 DMIPS / 984 EEMBC CoreMark por núcleo de aplicación
- Hasta 148 DMIPS / 394 EEMBC CoreMark en el núcleo de bajo consumo
- 2176 KB de SRAM (HCPU) + 512 KB de SRAM (ACPU) + 1056 KB de SRAM de retención (LCPU)
- FPU de precisión simple y MPU en todos los núcleos

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth de modo dual 5.3 con soporte de BLE Audio
- Sensibilidad de hasta -107,5 dBm en BLE Long Range a 125 kbps
- Potencia máxima de transmisión: 19 dBm (BR/BLE) y 13 dBm (EDR2/EDR3)
- Corriente pico de recepción en BR/EDR2/EDR3: 2,2 mA a 3,3 V

### Gráficos, pantalla y multimedia { #graphics-display-and-multimedia }

- Motor gráfico ePicasso 2.0 2D/2.5D
- Motor de gráficos vectoriales Vivante GCNanoUltraV
- Códec JPEG por hardware
- Los dos controladores LCD admiten 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI y JDI
- TurboPixel: extDMA comprime con pérdida el framebuffer final con una relación fija y el controlador de pantalla lo descomprime. Así se reducen el ancho de banda de PSRAM y la capacidad de framebuffer que requiere una carga de trabajo determinada.
- Ambos controladores LCD admiten el modo de pantalla siempre activa (always-on display).

### Audio { #audio }

- 2 DAC de audio de 24 bits
- 2 ADC Sigma-Delta de 24 bits
- 2 interfaces PDM (PDM1/PDM2)
- 3 interfaces I2S, todas en modo maestro; I2S1 solo admite entrada, mientras que I2S2 e I2S3 admiten entrada y salida
- Entrada y salida de audio analógico disponibles a través de la interfaz del módulo

La [guía de diseño de hardware SF32LB58x](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html) de SiFli enumera dos entradas de micrófono PDM (PDM1 y PDM2). Una interfaz PDM puede transportar dos canales de micrófono: el [ejemplo PDM del SDK de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) muestra la captura de dos micrófonos por los canales izquierdo y derecho de una interfaz, además de una configuración de cuatro micrófonos con PDM1 y PDM2. Sin embargo, SF32LB58-MOD no figura entre las plataformas compatibles con ese ejemplo. Para este módulo, confirme en el SDK de destino la configuración admitida de micrófonos y canales, y compruebe la multiplexación de pines y el diseño de la placa portadora. No deduzca que admite cuatro micrófonos solo por contar las interfaces PDM.

### Interfaces de almacenamiento y variantes de módulo { #storage-interfaces-and-module-variants }

<div align="center"><em>Variantes de módulo SF32LB58-MOD</em></div>

<div align="center" markdown>

| Código de módulo | Almacenamiento seleccionable | PSRAM | Flash estándar | Temperatura | Dimensiones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C a +85 °C | 24 × 24 × 3,1 mm |

</div>

La [guía de modelos de módulos de SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) recoge estas variantes, indica que el eMMC puede incluirse como dispositivo interno y señala que se pueden personalizar otras configuraciones. Elija el SKU según el tipo y la capacidad de almacenamiento que necesite y confirme con SiFli la disponibilidad actual y la configuración de memoria. Compruebe también que el SDK y el firmware de destino admiten el dispositivo y la ruta de arranque y almacenamiento elegidos.

### Alimentación, encapsulado y E/S { #power-package-and-io }

- Encapsulado del módulo: 24 × 24 × 3,1 mm
- Temperatura de funcionamiento: de −40 °C a +85 °C
- VDD_3V3: 2,97–3,6 V
- VDD_1V8: 1,7–1,95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1,7–3,6 V
- VDD_3V3 alimenta AVDD33_ANA, AVDD33_AUD y AVDD_USB; si el módulo lleva eMMC, también alimenta su entrada VDD. SiFli recomienda un LDO para esta línea de alimentación.
- VDD_1V8 alimenta PVDD1, PVDD2, AVDD_BRF y AVDD18_DSI, además de la memoria integrada en el encapsulado.
- VDDIOA alimenta las E/S PA, excepto PA00–PA11, la Flash externa y VIO del eMMC cuando está instalado. VDDIOA2 alimenta las E/S PA00–PA11; VDDIOB alimenta las E/S PB.
- Interfaz de módulo de 138 pines; los pines multiplexados ofrecen funciones como GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS y audio

## Productos relacionados { #related-products }

### Chip { #chip }

Basado en [SF32LB58x](../chips/SF32LB58x.md). Consulte la página del chip para conocer la arquitectura de gráficos, memoria y pantalla de la familia.

### Kits de desarrollo { #development-kits }

La placa [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) permite validar el firmware y probar la pantalla, el audio y las rutas de almacenamiento antes de diseñar una placa portadora personalizada para el módulo.

### Productos de referencia { #reference-products }

Las áreas de aplicación indicadas por SiFli incluyen dispositivos vestibles, equipos industriales de visualización y HMI, productos de control para vehículos, electrodomésticos inteligentes, concentradores de sensores de bajo consumo y productos Bluetooth Mesh.
