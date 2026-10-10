---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: placa compacta de evaluación SF32LB52x con alimentación del MCU seleccionable por jumper entre 1,8 V y 3,3 V, y acceso directo a GPIO, pantalla, audio, USB y líneas de alimentación."
tags:
    - Hardware
    - Placa de desarrollo
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## Visión general { #overview }

La SF32LB52-DevKit-Core-3p3 es una placa compacta para evaluar directamente los chips SF32LB52x. Un jumper de la placa permite seleccionar una alimentación de 1,8 V o 3,3 V para el MCU. Sus señales principales se exponen en los conectores del borde; los semiorificios metalizados permiten insertar pines de cabecera sin soldarlos. Está pensada para ingenieros que necesitan acceder directamente a GPIO, buses serie, señales de pantalla, audio, ADC, PWM y líneas de alimentación.

Con unas dimensiones de 30,88 × 68 mm, es compacta para prototipos de banco y ofrece las interfaces necesarias para poner a punto el hardware y el firmware del SF32LB52x.

![Vista frontal de SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — Vista frontal</em></div>

![Vista posterior de SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — Vista posterior</em></div>

## Variantes de placa { #board-variants }

<div align="center"><em>Variantes de placa SF32LB52-DevKit-Core-3p3</em></div>

<div align="center" markdown>

| Variante | MCU | Memoria en el encapsulado | Memoria en placa |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB de Flash SPI NOR | Ninguna |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB de Flash SPI NOR | Ninguna |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB de OPI-PSRAM | 16 MB de Flash SPI NOR |

</div>

Las variantes con solo NOR son adecuadas para productos compactos con Bluetooth, aplicaciones de control e HMI sencillas. Elija una variante con PSRAM y NOR externa si la aplicación requiere recursos gráficos de mayor tamaño, búferes de imagen, sistemas de archivos o más espacio para la aplicación.

**Discrepancia en la documentación; compruebe la etiqueta antes de seleccionar:** La [guía detallada de la Core-3p3](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html) denomina la configuración SF32LB52JUD6 `R16N16 V1.0.0` (actual), mientras que la [guía de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) identifica la misma configuración JUD6 / 16 MB de PSRAM / 16 MB de NOR como `N16R16`. La línea de revisión de la guía detallada indica 8 MB de PSRAM integrada para EUB6, pero su lista de características y su tabla de variantes indican 4 MB. La [descripción de SF32LB52](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md) de SiFli también especifica 4 MB para EUB6; por eso, este artículo usa 4 MB. Si necesita confirmar el sufijo exacto de la placa, compruebe su serigrafía y el esquema/BOM correspondiente.

## Aspectos destacados de la placa { #board-highlights }

- Variantes de MCU SF32LB52x con configuraciones solo-NOR o PSRAM + NOR
- Cristal principal de 48 MHz y cristal RTC de 32,768 kHz
- Alimentación por USB Type-C y programación/depuración USB-UART mediante el CH340N
- Antena PCBA integrada y conector de antena I-PEX
- Alimentación del MCU seleccionable por jumper entre 1,8 V y 3,3 V
- Señales USB 2.0 FS disponibles en el conector lateral
- La placa expone 37 GPIO; el MCU dispone de 3 UART, 4 interfaces I2C, 2 GPTIM, 2 interfaces SPI y 6 canales GPADC
- Todos los GPIO pueden configurarse como UART, I2C o GPTIM; la multiplexación también incluye SPI, PWM, I2S, PDM y entradas de activación
- Conector FPC de 16 pines con paso de 0,5 mm; las interfaces de pantalla admiten SPI, DSPI y Quad-SPI, incluido QSPI en modo DDR
- Señales I2C para el panel táctil
- Pines para micrófono analógico y salida de audio diferencial
- Un LED de usuario
- Tecla de encendido y tecla de función
- Puntos de prueba para medir la corriente de cada línea por separado; SiFli también documenta pruebas de consumo del MCU, del sistema mínimo y de toda la placa

## Cuándo usar esta placa { #when-to-use-this-board }

Elija SF32LB52-DevKit-Core-3p3 cuando necesite acceso directo a las señales del SF32LB52x.

- Poner a punto placas hijas o placas de sensores personalizadas
- Evaluar variantes de memoria de SF32LB52x
- Prototipar funciones de LCD, audio, USB y GPIO
- Medir la corriente en rieles de alimentación individuales
- Validar el firmware antes de diseñar una PCB compacta para el producto

Para una placa más pequeña, similar a un módulo y con semiorificios metalizados en los bordes, consulte [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para una placa con pantalla, amplificador de audio, ranura para tarjeta TF y cargador de batería, consulte [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentación { #power }

La placa admite tres entradas de alimentación:

- Alimentación por USB Type-C, recomendada para las tareas habituales de desarrollo y depuración
- Entrada de 5 V por los terminales de 5 V y GND del conector de borde cuando el USB está desconectado
- Entrada de 3,3 V por los terminales de 3,3 V y GND del conector de borde cuando el USB está desconectado; puede utilizarse una fuente de laboratorio externa

Un jumper independiente selecciona la alimentación del MCU entre 1,8 V y 3,3 V. Esta selección no corresponde a los pines de alimentación externos de 1,8 V y 3,3 V del conector de borde. Antes de cambiar el jumper o alimentar circuitos externos, consulte el pinout y el esquema de la revisión concreta de la placa.

Para medir la corriente de un único riel, conecte un amperímetro en serie con el riel que se vaya a medir, usando los puntos de medición de la placa.

Al conectar USB Type-C, algunos pines del conector también pueden suministrar 3,3 V, 1,8 V y 5 V. Compruebe la dirección de cada pin antes de conectar circuitos externos.

La placa incorpora un interruptor de alimentación. La señal RTS# del CH340N puede controlar la habilitación de la placa y permitir que la herramienta host reinicie el MCU durante la programación o la depuración.

## Programación y depuración { #download-and-debug }

Use el puerto UART USB Type-C para programar el firmware y depurar el software.

- **Modo de programación**: habilite BOOT en la herramienta de programación y después encienda o reinicie la placa.
- **Modo de depuración/registro**: deshabilite BOOT y después encienda o reinicie la placa.
- **Reinicio**: use el botón de reinicio/encendido integrado o la señal RTS controlada por la herramienta.

## Controles de usuario { #user-controls }

<div align="center"><em>Señales de control de usuario</em></div>

<div align="center" markdown>

| Función | GPIO | Comportamiento |
| :--- | :--- | :--- |
| LED | PA32 | Activo en alto |
| KEY1 | PA34 | Activo en alto; pulsación larga de 10 s para reiniciar |
| KEY2 | PA33 | Activo en alto |

</div>

## Interfaz de pantalla { #display-interface }

La placa admite pantallas LCD por SPI, DSPI y Quad-SPI, incluido QSPI en modo DDR, mediante un conector FPC vertical de 16 pines y paso de 0,5 mm, con cierre abatible hacia arriba y contactos inferiores. El conector lleva las señales de reinicio LCD, PWM de retroiluminación, TE, selección de chip, reloj, cuatro líneas de datos y señales I2C del panel táctil.

![Cable adaptador FPC](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>Cable adaptador FPC</em></div>

### Mapa de señales FPC LCD de 16 pines { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>Mapa de señales FPC LCD de 16 pines</em></div>

<div align="center" markdown>

| Pin | Señal | Función |
| :--- | :--- | :--- |
| 1 | GND | Tierra |
| 2 | PA00 | Reinicio de LCD |
| 3 | PA01 | PWM de retroiluminación |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3,3 V | Salida de alimentación de 3,3 V para la pantalla |
| 12 | GND | Tierra |
| 13 | PA09 | Interrupción táctil |
| 14 | PA11 | Táctil I2C SDA |
| 15 | PA20 | Táctil I2C SCL |
| 16 | PA10 | Reinicio táctil |

</div>

La guía china de la placa de SiFli indica que el módulo AMOLED de 1,85 pulgadas se conecta directamente con un cable FPC de 16 pines. Sin embargo, la guía en inglés especifica un cable FPC-22p y el archivo de la ilustración se llama `FPC-22P`. El conector de la placa es de 16 pines. Las fuentes no resuelven esta discrepancia; antes de conectarlo, compruebe el número de pines y la asignación de señales del cable y del módulo de pantalla.

## Resumen de señales del encabezado { #header-signal-summary }

La placa ofrece dos conectores laterales de 24 pines. El primero agrupa principalmente GPIO, SPI2, USB, GPADC y alimentación; el segundo, LCD, panel táctil, UART de depuración, audio y alimentación.

![Pinout de SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>Pinout de SF32LB52-DevKit-Core-3p3</em></div>

### Conector de E/S general { #general-io-header }

<div align="center"><em>Asignaciones de pines del encabezado de E/S general</em></div>

<div align="center" markdown>

| Rango de pines | Señales | Funciones principales |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, entradas de activación |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3,3 V | Entrada o salida de 3,3 V según la alimentación USB |
| 18-21 | PA27..PA24 | Entradas de activación, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

### Conector de LCD, audio y depuración { #lcd-audio-and-debug-header }

<div align="center"><em>Asignaciones de pines del encabezado de LCD, audio y depuración</em></div>

<div align="center" markdown>

| Rango de pines | Señales | Funciones principales |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, táctil, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | Micrófono analógico y salida de audio |
| 17 | 1,8 V | Entrada o salida de 1,8 V según la alimentación USB |
| 18-20 | PA10, PA11, PA20 | PA10: CTP_RST; PA11: CTP_SDA; PA20: CTP_SCL; los tres admiten UART, I2C y GPTIM |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, descarga/depuración |
| 24 | 5 V | Entrada o salida de 5 V según la alimentación USB |

</div>

## Pines de Flash externa y SDIO { #external-flash-and-sdio-pins }

Algunas variantes incorporan 16 MB de Flash QSPI-NOR externa. El siguiente grupo de pines se comparte con SDIO:

<div align="center"><em>Grupo de pines de Flash externa y SDIO</em></div>

<div align="center" markdown>

| GPIO del MCU | Función compartida por Flash/SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Antes de usar estos pines para SDIO u otras funciones de expansión, compruebe si ya están ocupados por la Flash montada.

## Expansión de audio { #audio-expansion }

La placa ofrece la polarización y la entrada del micrófono analógico, además de una salida DAC diferencial. El micrófono y un amplificador Class-AB/D para accionar un altavoz son externos; selecciónelos para la ruta de audio prevista.

## Objetivos de compilación del SDK { #sdk-build-targets }

Al compilar con SiFli-SDK, utilice `scons --board=<board_name>` con uno de estos nombres exactos de destino:

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

Son identificadores de destinos de compilación del SDK, no necesariamente los nombres de producto impresos en la placa o el módulo. El índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) de la rama principal pueden enumerar conjuntos distintos; confirme el destino para la revisión del SDK que utilice.

## Documentos relacionados { #related-documents }

[SF32LB52x Introducción al chip]: ../chips/SF32LB52x.md
[SF32LB52x Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Artículo original de la Wiki de SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Paquete de diseño]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Comprar muestras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Introducción al chip]__
- :fontawesome-solid-file-lines: __[SF32LB52x Guía de diseño de hardware]__
- :fontawesome-brands-github: __[Artículo original de la Wiki de SiFli]__
- :fontawesome-solid-download: __[Paquete de diseño]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__

</div>
