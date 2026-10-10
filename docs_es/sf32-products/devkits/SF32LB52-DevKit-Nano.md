---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano: placa compacta SF32LB52x para prototipos próximos al producto final, pantallas pequeñas y montaje soldado."
tags:
    - Hardware
    - Placa de desarrollo
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## Visión general { #overview }

El SF32LB52-DevKit-Nano es una placa de desarrollo compacta para prototipos y evaluación de sistemas embebidos. Sus bordes tienen semiorificios metalizados (castellated holes), por lo que puede usarse como placa de desarrollo independiente o soldarse a una placa portadora durante las primeras fases del prototipo.

La placa mide 51 mm × 20,32 mm y expone los recursos principales del SF32LB52x para desarrollar con GPIO, UART, I2C, SPI, LCD, I2S, GPADC, PWM, USB y audio analógico.

![Vista frontal de SF32LB52-DevKit-Nano](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — Vista frontal</em></div>

![Vista posterior de SF32LB52-DevKit-Nano](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — Vista posterior</em></div>

## Variantes de placa { #board-variants }

<div align="center"><em>Variantes de placa SF32LB52-DevKit-Nano</em></div>

<div align="center" markdown>

| Variante | MCU | Memoria en el encapsulado | Flash externa |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB de Flash SPI NOR | Ninguna |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB de OPI-PSRAM | 16 MB de Flash QSPI-NOR |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB de OPI-PSRAM | 128 MB de Flash QSPI-NAND |

</div>

La variante N4 es adecuada para productos compactos de control y Bluetooth, así como para aplicaciones con interfaces de usuario sencillas. N16R16 combina 16 MB de OPI-PSRAM con 16 MB de QSPI-NOR, mientras que A128R16 combina 16 MB de OPI-PSRAM con 128 MB de QSPI-NAND. Ambas variantes sirven para aplicaciones que necesitan recursos gráficos de mayor tamaño, sistemas de archivos externos o una zona de trabajo o búfer de imagen en PSRAM.

**Discrepancia entre fuentes; verifique antes de seleccionar:** La [guía detallada de la placa Nano](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html) denomina `R16N16 V1.0.0` a su configuración con 16 MB de OPI-PSRAM y 16 MB de NOR. La [guía vigente de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) identifica esa misma configuración como `N16R16` y especifica por separado `A128R16` con 16 MB de OPI-PSRAM y 128 MB de QSPI-NAND. La guía detallada no describe A128R16; para ese SKU, use la información de la guía de modelos y no extrapole otros detalles de N16R16. Antes de elegir firmware o memoria, compruebe la serigrafía y el esquema/BOM actualizados.

Las fuentes de SiFli también difieren ligeramente en las dimensiones de la placa Nano: la guía detallada indica 21 × 51 mm, mientras que la guía de modelos especifica 51 × 20,32 mm. La dimensión de 51 mm coincide, pero la medida del lado corto difiere en 0,68 mm. Esta página adopta el valor más preciso de la guía de modelos; antes de diseñar una carcasa o una placa portadora, compruebe el plano mecánico de la revisión concreta.

## Aspectos destacados de la placa { #board-highlights }

- Placa compacta de 51 mm × 20,32 mm
- Semiorificios metalizados en los bordes para soldar la placa a una placa portadora
- Alimentación USB Type-C y descarga/depuración USB-a-UART a través de CH340N
- Pines GPIO, UART, I2C, SPI, GPADC, PWM, I2S, PDM y pines capaces de reactivar el sistema
- Compatibilidad con LCD QSPI mediante FPC de 16 pines; normalmente se necesita un cable adaptador de 22 a 16 pines
- Soporte de panel táctil I2C
- Pines de entrada de micrófono analógico y salida de audio diferencial
- Señales USB 2.0 FS expuestas en los pines de borde
- Dos LED de usuario
- Tecla de encendido y tecla de función

## Cuándo usar esta placa { #when-to-use-this-board }

Elija SF32LB52-DevKit-Nano cuando quiera evaluar un prototipo con dimensiones y montaje próximos a los del producto final.

- Construir prototipos compactos de Bluetooth y pantalla
- Soldar la placa en un PCB portador
- Validar una asignación de pines representativa del producto antes de diseñar una placa propia
- Comparar la variante con solo Flash NOR y las variantes con PSRAM y Flash QSPI-NOR o QSPI-NAND
- Poner en marcha funciones de LCD, audio, sensor y USB en una huella pequeña

Para facilitar el cableado en el banco y acceder a más señales, consulte [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md). Si necesita una placa para pantallas que incluya cargador, tarjeta TF, micrófono y amplificador de altavoz, consulte [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentación { #power }

La placa admite tres enfoques de alimentación:

- Alimentación USB Type-C, recomendada para el desarrollo
- Entrada de 3,3 V por los terminales de 3,3 V y GND del borde cuando el USB no está conectado
- Entrada de 5 V por los terminales de 5 V y GND del borde cuando el USB no está conectado

Con USB Type-C conectado, algunos terminales de 3,3 V y 5 V pueden utilizarse como salidas. Compruebe la dirección del suministro antes de conectar circuitos externos.

La placa incluye un interruptor de alimentación controlado a través de la señal RTS# de CH340N, lo que permite un comportamiento de reinicio controlado por herramienta.

## Descarga y depuración { #download-and-debug }

Use la interfaz UART USB Type-C para la descarga de firmware y los registros seriales.

- **Modo de descarga**: habilite BOOT en la herramienta de descarga, luego encienda o reinicie la placa.
- **Modo de depuración/registro**: deshabilite BOOT, luego encienda o reinicie la placa.
- **Comportamiento de reinicio RTS**: si al abrir el puerto serie la placa se reinicia o se apaga de forma inesperada, deshabilite el control de flujo de módem o de hardware en la configuración avanzada del puerto serie del equipo host.

![Deshabilitar el control de flujo de módem en la configuración avanzada del puerto serial](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Deshabilitación del control de flujo de módem en la configuración del puerto serial</em></div>

## Controles de usuario { #user-controls }

<div align="center"><em>Señales de control de usuario</em></div>

<div align="center" markdown>

| Función | GPIO | Comportamiento |
| :--- | :--- | :--- |
| LED1 | PA31 | Activo en bajo |
| LED2 | PA32 | Activo en bajo |
| KEY1 | PA34 | Activo en alto; admite reinicio al mantenerlo pulsado durante 10 s |
| KEY2 | PA33 | Activo en alto |

</div>

## Resumen de pines de borde con semiorificios metalizados { #castellated-pin-summary }

La placa Nano expone dos grupos de terminales en los bordes. El primero incluye señales de audio, SPI1, UART de depuración, alimentación asociada al USB y pines compatibles con GPADC. El segundo incluye SPI2, USB FS, GPIO aptos para despertar el sistema y alimentación.

### Señales de borde del lado frontal { #front-side-edge-signals }

<div align="center"><em>Mapa de señales de borde del lado frontal</em></div>

<div align="center" markdown>

| Pin | Señal | Función principal |
| :--- | :--- | :--- |
| 1 | GND | Tierra |
| 2 | DACP | Salida de audio analógico |
| 3 | DACN | Salida de audio analógico |
| 4 | MIC_ADC | Entrada de micrófono analógico |
| 5 | MIC_BIAS | Polarización de micrófono |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | Tierra |
| 8 | PA19 | UART0_TXD / SWCLK / depuración |
| 9 | PA18 | UART0_RXD / SWDIO / depuración |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | Entrada/salida de 3,3 V |
| 14 | GND | Tierra |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | Entrada/salida de 5 V |

</div>

### Señales de borde del lado posterior { #back-side-edge-signals }

<div align="center"><em>Mapa de señales de borde del lado posterior</em></div>

<div align="center" markdown>

| Pin | Señal | Función principal |
| :--- | :--- | :--- |
| 1 | GND | Tierra |
| 2 | 3.3V | Entrada/salida de 3,3 V |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | Tierra |
| 10 | 3.3V | Entrada/salida de 3,3 V |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | Entrada/salida de 5 V |
| 16 | GND | Tierra |

</div>

## Interfaz de LCD { #lcd-interface }

La placa admite paneles LCD QSPI mediante una interfaz FPC de 16 pines. La documentación original indica que puede conectarse a la pantalla AMOLED Huangshan Pi de 1,85 pulgadas mediante un cable FPC adaptador de 22 a 16 pines.

![Cable adaptador FPC de 22 pines a 16 pines](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>Cable adaptador FPC de 22 pines a 16 pines</em></div>

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
| 11 | 3.3V | Salida de alimentación de 3,3 V para la pantalla |
| 12 | GND | Tierra |
| 13 | PA09 | Interrupción táctil |
| 14 | PA11 | Táctil I2C SDA |
| 15 | PA20 | Táctil I2C SCL |
| 16 | PA10 | Reinicio táctil |

</div>

## Pines de Flash externa y SDIO { #external-flash-and-sdio-pins }

La variante N16R16 incorpora 16 MB de Flash QSPI-NOR externa. El grupo de pines de almacenamiento es el siguiente:

<div align="center"><em>Grupo de pines de Flash externa y SDIO</em></div>

<div align="center" markdown>

| GPIO del MCU | Función compartida de Flash / SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Estos pines pueden estar ocupados por la Flash montada según la variante. Verifique el ensamblaje exacto de la placa antes de usarlos como pines de expansión.

## Expansión de audio { #audio-expansion }

La placa Nano expone entrada de micrófono analógico, polarización de micrófono y salida de audio analógico diferencial. Añada un circuito de micrófono externo y un amplificador de potencia de audio según lo requiera el producto objetivo.

## Objetivos de compilación del SDK { #sdk-build-targets }

Al compilar con SiFli-SDK, use `scons --board=<board_name>` con uno de estos nombres exactos de destino:

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

Son identificadores de destinos de compilación del SDK, no necesariamente los nombres de producto impresos en la placa o el módulo. El índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) de la rama principal pueden enumerar conjuntos distintos; confirme el destino para la revisión del SDK que utiliza.

## Documentos relacionados { #related-documents }

[SF32LB52x Introducción al chip]: ../chips/SF32LB52x.md
[SF32LB52x Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Artículo original de la Wiki de SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[Paquete de diseño]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[Comprar muestras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Introducción al chip]__
- :fontawesome-solid-file-lines: __[SF32LB52x Guía de diseño de hardware]__
- :fontawesome-brands-github: __[Artículo original de la Wiki de SiFli]__
- :fontawesome-solid-download: __[Paquete de diseño]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__

</div>
