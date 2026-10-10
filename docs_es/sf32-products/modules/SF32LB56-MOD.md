---
icon: lucide/card-sim
description: "SF32LB56-MOD: familia de módulos MCU Bluetooth 5.3 de bajo consumo y propósito general basada en SF32LB56xV, con 4 MB + 8 MB de OPI-PSRAM en el encapsulado y Flash configurada según el SKU."
tags:
  - Hardware
  - Módulo
---

# SF32LB56-MOD { #sf32lb56-mod }

## Visión general { #overview }

SF32LB56-MOD es una familia de módulos MCU Bluetooth de propósito general y bajo consumo de SiFli, basada en la plataforma SF32LB56xV. La configuración estándar utiliza el SF32LB566VCB36 con 4 MB + 8 MB de OPI-PSRAM en el encapsulado y 1 MB de QSPI-NOR. El módulo reúne en un formato compacto procesamiento MCU de doble núcleo, Bluetooth 5.3 con BLE Audio, aceleración gráfica, interfaces de audio, variantes de Flash según el SKU e integración de RF.

El módulo integra el trayecto de RF, el cristal y la memoria de alta velocidad; ofrece una antena PCB integrada o una antena externa conectada mediante un conector compatible con IPEX. El producto final aún requiere validación de RF, y el diseño de la placa portadora debe adaptarse a la opción elegida. Sus interfaces y configuraciones de memoria permiten atender las necesidades de productos con pantalla, audio, sensores y procesamiento local.

La familia ofrece varias configuraciones de memoria; todas miden 18,0 × 32,9 × 3,1 mm y funcionan entre -40 y 85 °C. La [guía de diseño de hardware del SF32LB56-MOD](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md), basada en DS5602 V0.3, ofrece más detalles sobre la antena y el diseño de la placa. La guía de modelos de módulos de SiFli enumera las configuraciones de memoria, pero no especifica qué opción de antena corresponde a cada SKU. Antes de cerrar el diseño de la placa portadora, confirme con SiFli la configuración de antena del módulo elegido.

!!! info
    Las capacidades de cómputo, gráficos y audio que se resumen a continuación corresponden a la plataforma SF32LB56xV integrada en el módulo; la disponibilidad externa depende del pinout del módulo y de la multiplexación de pines. Consulte [SF32LB56x](../chips/SF32LB56x.md) para conocer la arquitectura y el conjunto completo de periféricos del chip. Esta página se centra en la integración del módulo, la memoria según el SKU, las líneas de alimentación y los criterios de selección.

## Aplicaciones { #applications }

SiFli enumera las siguientes áreas de aplicación para SF32LB56-MOD:

- Dispositivos vestibles: relojes inteligentes de gama alta, pulseras inteligentes, dispositivos médicos vestibles y equipos de fitness
- Industria: soluciones de visualización económicas, interfaces HMI gráficas, centros de control para sensores industriales, monitorización de equipos e instrumentos
- Automoción: unidades centrales de control para vehículos eléctricos, llaves de coche y dispositivos vestibles para controlar vehículos a distancia
- Domótica: electrodomésticos inteligentes pequeños y medianos, y cerraduras inteligentes
- Uso general: concentradores de sensores de bajo consumo y Bluetooth Mesh
- Ejemplos de AIoT: reconocimiento de comandos de voz, hogar inteligente, llaves inteligentes y paneles de control inteligentes

Considere SF32LB56-MOD cuando el diseño requiera una o varias de estas características:

- Integración en el módulo del trayecto de RF, la opción de antena, el cristal y la memoria de alta velocidad
- Distintas configuraciones de memoria entre los SKU indicados
- Interfaces para pantalla, audio, sensores y procesamiento local
- Dimensiones compactas para productos con espacio limitado

## Recursos de desarrollo { #development-resources }

[Hoja de datos del módulo]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Introducción al chip]: ../chips/SF32LB56x.md
[Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[Guía de diseño de hardware de SF32LB56x]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Comprar muestras]: https://sifli.taobao.com/
[Comprar kits de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Hoja de datos del módulo]__
- :fontawesome-solid-microchip: __[Introducción al chip]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware de SF32LB56x]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specifications }

### Cómputo y memoria { #compute-and-memory }

- HCPU: Arm Cortex-M33 STAR-MC1, hasta 240 MHz y hasta 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1, hasta 96 MHz y hasta 148 DMIPS / 394 EEMBC CoreMark
- Memoria HCPU: caché de instrucciones de 32 KB, caché de datos de 16 KB y 800 KB de SRAM, incluidos 128 KB de SRAM de retención
- Memoria LCPU: caché de instrucciones de 16 KB, caché de datos de 8 KB y 160 KB de SRAM de retención
- FPU de precisión simple y MPU en ambos núcleos
- Acelerador matricial para redes neuronales y aceleradores de procesamiento de señales para cargas de trabajo locales más exigentes

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth de modo dual 5.3 con soporte de BLE Audio
- Sensibilidad: -100 dBm en BLE a 1 Mbps, -96,3 dBm en BR, -95,5 dBm en EDR2 y -88,5 dBm en EDR3
- Potencia máxima de transmisión: 19 dBm en BR/BLE y 13 dBm en EDR2/EDR3
- Corriente pico de recepción en BR: 2,2 mA a 3,3 V

### Gráficos y pantalla { #graphics-and-display }

- Motor gráfico 2D/2.5D ePicasso 2.0
- Rotación, escalado, reflejo y mezcla alfa por hardware
- Cargas de trabajo gráficas de hasta 1024 × 1024
- Descompresión gráfica sin pérdidas con eZip 2.0 y soporte para animaciones eZip-A
- Soporte de LCD para 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB y JDI
- TurboPixel: extDMA comprime con pérdida el framebuffer final con una relación fija y el controlador de pantalla lo descomprime. Así se reducen el ancho de banda de PSRAM y la capacidad de framebuffer que requiere una carga de trabajo determinada.

### Audio { #audio }

- 1x DAC de audio de 24 bits
- 1x ADC de audio Sigma-Delta de 24 bits
- 2 interfaces PDM (PDM1/PDM2), cada una compatible con los canales izquierdo y derecho
- 1 interfaz I2S
- Conversión de tasa de muestreo de audio y aceleración de EQ

Cada interfaz PDM puede conectar hasta dos micrófonos digitales, por lo que las dos interfaces admiten hasta cuatro en total. El número de interfaces PDM no equivale al número de micrófonos; la conectividad real depende de la multiplexación de pines y del diseño de la placa.

### Variantes de memoria y módulo { #memory-and-module-variants }

<div align="center"><em>Configuraciones de memoria de SF32LB56-MOD</em></div>

<div align="center" markdown>

| Código de módulo | Flash según SKU | PSRAM | Flash estándar | Temperatura | Dimensiones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

La [guía de modelos de módulos de SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) recoge estas tres configuraciones y señala que se pueden personalizar otras. Confirme con SiFli la disponibilidad actual de los SKU y su configuración de memoria.

SiFli identifica como configuración estándar la combinación de SF32LB566VCB36 con 4 MB + 8 MB de OPI-PSRAM en el encapsulado y 1 MB de QSPI-NOR; esta memoria coincide con la configuración N16R12N1. La guía no asigna una referencia de chip específica a A128R12N1 ni D128R12N1. Confirme con SiFli la referencia exacta del chip para cualquiera de esos SKU.

### Alimentación y E/S { #power-and-io }

- Rango de funcionamiento recomendado de VDD_3V3: 2,97–3,6 V
- Rango de funcionamiento recomendado de VDD_1V8: 1,7–1,95 V
- Rango de funcionamiento recomendado de VDDIO: 1,7–3,6 V
- VDD_3V3, VDD_1V8 y VDDIO deben alimentarse simultáneamente
- El nivel de interfaz de PA00–PA11 es fijo, de 3,3 V, y no depende de VDDIO
- Interfaz de módulo de 89 pines
- Temperatura de funcionamiento: de -40 a 85 °C

## Productos relacionados { #related-products }

### Chip { #chip }

Basado en [SF32LB56x](../chips/SF32LB56x.md), concretamente en la familia de plataformas SF32LB56xV. Consulte la página del chip para conocer la arquitectura, las funciones de pantalla y audio, y las opciones de encapsulado de la familia.

### Kits de desarrollo { #development-kits }

La [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) permite validar la pantalla, el audio, el almacenamiento y los controladores de periféricos. Su documentación contempla las configuraciones N16R12N1 y A128R12N1; compruebe la referencia impresa en el módulo y la revisión de la placa antes de usar su memoria como base del diseño.

### Productos de referencia { #reference-products }

Las áreas de aplicación indicadas por SiFli incluyen dispositivos vestibles, equipos industriales de visualización y HMI, productos de control para vehículos, electrodomésticos inteligentes, concentradores de sensores de bajo consumo y productos Bluetooth Mesh.
