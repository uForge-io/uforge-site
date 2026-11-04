---
icon: lucide/card-sim
description: "SF32LB56-MOD: módulos MCU Bluetooth 5.3 de bajo consumo basados en SF32LB56xV, con 4 MB + 8 MB de OPI-PSRAM integrada y variantes de Flash según el SKU."
tags:
  - Hardware
  - Módulo
---

# SF32LB56-MOD { #sf32lb56-mod }

## Visión general { #overview }

SF32LB56-MOD es una familia de módulos MCU Bluetooth de propósito general y bajo consumo de SiFli, basada en la plataforma SF32LB56xV. La configuración estándar utiliza el SF32LB566VCB36 con 4 MB + 8 MB de OPI-PSRAM en el encapsulado y 1 MB de QSPI-NOR. En un formato compacto, el módulo integra una MCU de doble núcleo, Bluetooth 5.3 con BLE Audio, aceleración gráfica e interfaces de audio, además de distintas variantes de Flash según el SKU y una ruta de señal de RF integrada.

El módulo integra la ruta de señal de RF, el cristal y la memoria de alta velocidad. Puede incorporar una antena PCB o conectarse a una antena externa mediante un conector compatible con IPEX. El producto final también debe someterse a validación de RF, y el diseño de la placa portadora debe adaptarse a la opción elegida. Sus interfaces y configuraciones de memoria permiten desarrollar productos con pantalla, audio, sensores y procesamiento local.

La familia ofrece varias configuraciones de memoria; todas miden 18,0 × 32,9 × 3,1 mm y funcionan entre -40 y 85 °C. La [guía de diseño de hardware del SF32LB56-MOD](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md), basada en DS5602 V0.3, ofrece más detalles sobre la antena y el diseño de la placa. La guía de modelos de módulos de SiFli enumera las configuraciones de memoria, pero no especifica qué opción de antena corresponde a cada SKU. Antes de cerrar el diseño de la placa portadora, confirme con SiFli la configuración de antena del módulo elegido.

!!! info
    Las capacidades de cómputo, gráficos y audio que se resumen a continuación corresponden a la plataforma SF32LB56xV integrada en el módulo; la disponibilidad externa depende del pinout del módulo y de la multiplexación de pines. Consulte [SF32LB56x](../chips/SF32LB56x.md) para conocer la arquitectura y el conjunto completo de periféricos del chip. Esta página se centra en la integración del módulo, la memoria según el SKU, las líneas de alimentación y los criterios de selección.

## Aplicaciones { #applications }

SiFli enumera las siguientes áreas de aplicación para SF32LB56-MOD:

- Dispositivos vestibles: relojes inteligentes de gama alta, pulseras inteligentes, dispositivos médicos vestibles y equipos de fitness
- Industria: soluciones de visualización económicas, interfaces HMI gráficas, centros de control para sensores industriales, supervisión de equipos e instrumentos
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
[Comprar placas de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Hoja de datos del módulo]__
- :fontawesome-solid-microchip: __[Introducción al chip]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware de SF32LB56x]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar placas de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specifications }

### Marcados reglamentarios { #regulatory-markings }

Los diseños de las etiquetas que proporciona SiFli para **SF32LB56-MOD-N16R12N1** y **SF32LB56-MOD-A128R12N1** muestran los identificadores siguientes y el marcado CE.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 780px; margin: 1rem auto;">
<figure style="margin: 0;">
<a href="assets/SF32LB56-MOD/N16R12N1-label.jpg"><img src="assets/SF32LB56-MOD/N16R12N1-label.jpg" alt="SF32LB56-MOD-N16R12N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB56-MOD-N16R12N1</figcaption>
</figure>
<figure style="margin: 0;">
<a href="assets/SF32LB56-MOD/A128R12N1-label.jpg"><img src="assets/SF32LB56-MOD/A128R12N1-label.jpg" alt="SF32LB56-MOD-A128R12N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB56-MOD-A128R12N1</figcaption>
</figure>
</div>

<div align="center" markdown>

*Marcados de las etiquetas SF32LB56-MOD proporcionadas*

| Campo | Valor impreso |
| --- | --- |
| Variantes etiquetadas | `SF32LB56-MOD-N16R12N1`, `SF32LB56-MOD-A128R12N1` |
| FCC | `2BVUV-SF32LB56` |
| IC | `35666-SF32LB56` |
| CMIIT ID | `25J3260UM187` |
| HVIN | `SF32LB56` |
| Marcado CE | Presente en ambas etiquetas |

</div>

Estos datos transcriben las etiquetas; no constituyen una comprobación independiente de registros de certificación ni de una declaración de conformidad. Confirme con SiFli la documentación de aprobación, las condiciones de antena y las instrucciones de integración para la revisión exacta del módulo. No extienda estos marcados a otras variantes sin documentación que lo respalde. El marcado del módulo no demuestra la conformidad del producto final.

### Interfaces de almacenamiento y variantes de módulo { #storage-interfaces-and-module-variants }

<span id="memory-and-module-variants"></span>

<div align="center"><em>Variantes de módulo SF32LB56-MOD</em></div>

<div align="center" markdown>

| Código de módulo | Almacenamiento seleccionable | PSRAM | Flash estándar | Temperatura | Dimensiones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

!!! note "Personalización"
    Para consultar otras configuraciones del módulo o solicitar una personalización, [contacte con μForge.io](../../about/contact.md).

La [guía de modelos de módulos de SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) recoge estas tres configuraciones y permite solicitar otras personalizadas. Confirme con SiFli la disponibilidad actual de cada SKU y su configuración de memoria.

SiFli identifica como configuración estándar la combinación de SF32LB566VCB36 con 4 MB + 8 MB de OPI-PSRAM y 1 MB de QSPI-NOR; esta configuración de memoria coincide con N16R12N1. La guía no asigna una referencia de chip específica a A128R12N1 ni D128R12N1. Confirme con SiFli qué chip corresponde a cada uno de esos SKU.

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
- 2 interfaces PDM (PDM1/PDM2); DS5602 V0.3 indica dos entradas para micrófono digital
- 1 interfaz I2S
- Conversión de tasa de muestreo de audio y aceleración de EQ

La figura de asignación recomendada ofrece estas opciones: PDM1_DATA en PA20 o PA64, PDM1_CLK en PA24 o PA69, PDM2_DATA en PA25 o PA71 y PDM2_CLK en PA26 o PA73. Son alternativas de multiplexación de pines, no una confirmación del trazado de la placa portadora. DS5602 V0.3 no confirma el uso compartido de canales ni una configuración de cuatro micrófonos. Antes de diseñar un sistema con varios micrófonos, verifique el modo admitido y el trazado real de la placa.

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

### Placas de desarrollo { #development-kits }

La [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) permite validar la pantalla, el audio, el almacenamiento y los controladores de periféricos. Su documentación contempla las configuraciones N16R12N1 y A128R12N1; compruebe la referencia impresa en el módulo y la revisión de la placa antes de usar su memoria como base del diseño.

### Productos de referencia { #reference-products }

Las áreas de aplicación indicadas por SiFli incluyen dispositivos vestibles, equipos industriales de visualización y HMI, productos de control para vehículos, electrodomésticos inteligentes, concentradores de sensores de bajo consumo y productos Bluetooth Mesh.
