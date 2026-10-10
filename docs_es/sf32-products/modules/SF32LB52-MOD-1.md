---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: familia de módulos MCU Bluetooth 5.3 de bajo consumo para SF32LB52x, con circuito de RF y cristal de 48 MHz integrados y opciones de antena según el SKU."
tags:
  - Hardware
  - Módulo
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## Visión general { #overview }

SF32LB52-MOD-1 es una familia de módulos MCU de bajo consumo con Bluetooth, basada en la plataforma SF32LB52x. La variante estándar N16R8 incorpora el SF32LB525UC6. El módulo de 27,9 × 18,0 × 3,1 mm integra la plataforma Arm Cortex-M33 STAR-MC1 de doble núcleo, el circuito de RF, un cristal de 48 MHz y la conexión de antena. El tipo de antena depende del código de producto: puede ser una antena PCB integrada en el módulo o una antena externa conectada mediante IPEX.

DS5203 V0.3 documenta una antena PCB integrada en el módulo e indica que también hay otro modelo compatible con una antena externa mediante IPEX, pero no asigna las opciones de antena a los SKU de memoria publicados. Antes de cerrar el diseño de la placa portadora, confirme con SiFli la configuración de antena exacta. El producto final aún requiere validación de RF y la certificación aplicable a nivel de producto. Las interfaces expuestas permiten implementar funciones Bluetooth, gráficas y de audio en productos conectados compactos.

Según el SKU seleccionado, el chip montado en el módulo puede llevar OPI-PSRAM en su encapsulado. Las interfaces disponibles proporcionan acceso a las principales funciones de la familia de chips, como GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS y señales de audio analógico.

!!! info
    Consulte [SF32LB52x](../chips/SF32LB52x.md) para conocer la arquitectura y los periféricos de la familia de chips. Esta página se centra en la integración del módulo, su alimentación, encapsulado y selección de variantes.

## Aplicaciones { #applications }

**SF32LB52-MOD-1 se recomienda para productos que necesitan Bluetooth, gráficos y audio, pero quieren reducir los riesgos de RF y diseño de placa.** Por ejemplo:

- Relojes inteligentes, pulseras de actividad y dispositivos médicos vestibles
- Concentradores de sensores Bluetooth y accesorios conectados
- Cerraduras inteligentes, dispositivos para el hogar conectado y electrodomésticos compactos
- Productos HMI con pantalla gráfica pequeña
- Llaveros electrónicos para vehículos y mandos a distancia vestibles
- Dispositivos conectados con pantalla y coste ajustado

Considere SF32LB52-MOD-1 si el proyecto necesita una o varias de estas ventajas:

- Integración de RF a nivel de módulo, con opciones de antena PCB o antena externa
- Acceso, a través de la interfaz del módulo, a las funciones Bluetooth, gráficas y de audio de la plataforma
- Reutilización del software y las funciones periféricas de SF32LB52x
- Formato compacto para dispositivos vestibles y productos HMI con espacio limitado

## Recursos de desarrollo { #development-resources }

[Hoja de datos del módulo]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Introducción al chip]: ../chips/SF32LB52x.md
[Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Guía original de diseño (wiki.sifli.com, variante EPD)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Comprar muestras]: https://sifli.taobao.com/
[Comprar kits de desarrollo]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Hoja de datos del módulo]__
- :fontawesome-solid-microchip: __[Introducción al chip]__
- :fontawesome-solid-file-lines: __[Guía de diseño de hardware]__
- :fontawesome-solid-file-lines: __[Guía original de diseño (wiki.sifli.com, variante EPD)]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__
- :fontawesome-solid-cart-shopping: __[Comprar kits de desarrollo]__

</div>

---

## Características y especificaciones { #features-and-specifications }

### Cómputo y memoria { #compute-and-memory }

- Núcleo de aplicación Arm Cortex-M33 STAR-MC1 (HCPU), hasta 240 MHz y con un rendimiento máximo de 370 DMIPS / 984 EEMBC CoreMark
- Caché de instrucciones de 32 KB y caché de datos de 16 KB
- 512 KB de SRAM de retención
- Núcleo Arm Cortex-M33 STAR-MC1 dedicado de muy bajo consumo (LCPU), hasta 24 MHz, con 64 KB de SRAM de retención
- FPU de precisión simple y MPU en ambos núcleos
- OPI-PSRAM opcional en el encapsulado del chip, según el SKU del módulo

### Conectividad inalámbrica { #wireless-connectivity }

- Bluetooth de modo dual 5.3 con soporte de BLE Audio
- Sensibilidad: -100 dBm (BLE/1 Mbps), -96,3 dBm (BR) y -95,5 dBm (EDR2)
- Potencia máxima de transmisión: 19 dBm (BR/BLE) y 13 dBm (EDR2/EDR3)
- Corriente pico de recepción en BR: 2,4 mA a 3,8 V

### Gráficos y pantalla { #graphics-and-display }

- Motor gráfico 2D/2.5D ePicasso 2.0
- Acelerador de descompresión gráfica sin pérdidas eZip 2.0
- Controlador LCD que soporta interfaces 8080, SPI, Dual-SPI y Quad-SPI
- Adecuado para pantallas compactas de tipo reloj y pequeñas HMI

### Audio { #audio }

- 1 DAC de audio de 24 bits
- 1 ADC de audio Sigma-Delta de 24 bits
- 1 interfaz I2S
- 1 interfaz PDM
- Entrada y salida de audio analógico disponibles a través de la interfaz del módulo

Cada interfaz PDM puede conectar hasta dos micrófonos digitales; por tanto, el número de interfaces PDM no equivale al número de micrófonos. La conectividad real depende de la multiplexación de pines y del diseño de la placa portadora. En este módulo, PA22/PA23 no están disponibles desde el exterior si se monta el cristal opcional de 32,768 kHz; la guía de diseño de hardware documenta otra asignación de pines para PDM.

### Interfaces de almacenamiento { #storage-interfaces }

- OPI-PSRAM opcional en el encapsulado del chip, según el SKU del módulo
- 1 interfaz MPI (QSPI) para Flash SPI NOR o SPI NAND externa
- 1 interfaz SD/SDIO compatible con SD 3.0, SDIO 3.0 y eMMC

### Seguridad { #security }

- Aceleradores de hardware AES, HASH y CRC
- Generador de números aleatorios verdaderos (TRNG)
- PSA Certified Level 1

### Alimentación, encapsulado y E/S { #power-package-and-io }

- Encapsulado del módulo: 27,9 × 18,0 × 3,1 mm
- Temperatura de funcionamiento: de −40 °C a +85 °C
- VSYS: 3,2–4,7 V con conexión directa a una batería de ion-litio, o 3,7–4,7 V con alimentación regulada; se recomiendan 3,8 V.
- Tensión de E/S: 3,3 V
- VBATS: entrada de detección de batería de 0–4,7 V que también puede usarse para mediciones con el ADC. Conecte directamente la tensión que se va a medir; no use un divisor resistivo externo.
- VDD33_VOUT2: salida LDO de 3,3 V del módulo para periféricos externos. Está desactivada de forma predeterminada y debe habilitarse por software; la corriente máxima de salida es de 150 mA y la capacitancia total de la línea no debe superar 7,4 µF.
- Interfaz de módulo de 68 pines; los pines de señal ofrecen funciones multiplexadas como GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS y audio digital y analógico

## Variantes de módulo { #module-variants }

<div align="center"><em>Variantes de módulo SF32LB52-MOD-1</em></div>

<div align="center" markdown>

| Código de módulo | Chip | Flash | PSRAM | Temperatura | Dimensiones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C a +85 °C | 27,9 × 18,0 × 3,1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C a +85 °C | 27,9 × 18,0 × 3,1 mm |

</div>

La [guía de modelos de módulos de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) y la guía de aplicación para pantallas de tinta electrónica también incluyen A128R16, pero la hoja de datos DS5203 V0.3 enlazada aquí solo incluye N16R8. Antes de elegir A128R16, confirme con SiFli su disponibilidad actual y la configuración de memoria.

Las fuentes oficiales usan denominaciones distintas para la memoria Flash de A128R16: la [guía de modelos de módulos de OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) la identifica como SPI-NAND de 128 MB, mientras que la [guía de modelos de placas de SiFli](https://wiki.sifli.com/board/devkit_guide.html) indica QSPI-NAND de 128 MB para el SKU de DevKit correspondiente. Las fuentes no aclaran si la diferencia se refiere al componente instalado o a la denominación de la interfaz. Antes de usar la configuración de la placa como referencia del módulo, confirme el componente Flash y el modo de bus en el esquemático y la BOM de la revisión exacta de la placa.

## Productos relacionados { #related-products }

### Chip { #chip }

La página de [SF32LB52x](../chips/SF32LB52x.md) describe la arquitectura y los periféricos de la familia; consulte la tabla de variantes anterior para ver la correspondencia entre cada SKU, su chip y su memoria.

### Kits de desarrollo { #development-kits }

Los kits [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) y [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) permiten validar el firmware antes de diseñar una placa portadora propia para el módulo.

### Productos de referencia { #reference-products }

Los productos finales típicos incluyen relojes inteligentes de gama inicial e intermedia, pulseras de actividad, concentradores de sensores Bluetooth, cerraduras inteligentes y dispositivos con interfaces HMI gráficas compactas.
