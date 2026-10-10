---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: placa de desarrollo SF32LB58x para poner en marcha pantallas MIPI DSI, RGB y QSPI, con audio, SDIO, CAN e interfaces de expansión."
tags:
    - Hardware
    - Placa de desarrollo
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## Visión general { #overview }

SF32LB58-DevKit-LCD es una placa de desarrollo basada en la familia de módulos SF32LB58-MOD. Proporciona una plataforma práctica para poner en marcha pantallas DSI, DPI/RGB o QSPI y validar conjuntamente interfaces gráficas de alta resolución, audio, almacenamiento, USB y periféricos.

La placa integra el módulo SF32LB58x, varios conectores de pantalla, una entrada de micrófono analógico, salida estéreo para altavoces, una ranura MicroSD, dos puertos USB Type-C y conectores de expansión para los núcleos principal y de bajo consumo. También permite probar CAN y Wi-Fi mediante SDIO.

Antes de diseñar una placa propia, puede utilizarse para validar conjuntamente la pantalla, el almacenamiento, el audio, el USB y los periféricos externos.

![Vista frontal de SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Vista frontal</em></div>

![Vista posterior de SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Vista posterior</em></div>

![Diagrama de bloques de SF32LB58-DevKit-LCD](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Diagrama de bloques</em></div>

## Notas de versión de placa y módulo { #board-and-module-version-notes }

<div align="center"><em>Resumen de versión del módulo</em></div>

<div align="center" markdown>

| Versión del módulo | Base | Notas |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1 y SF32LB58-MOD-A128R32N1 con SF32LB586VDD36 | Versión actual; ajusta el control de alimentación de eMMC: PA74 controla VCC y PA80 controla VCCQ; añade la resistencia R0115 |
| V1.0.0 | SF32LB58-MOD-N16R32N1 con SF32LB586VDD36 | Versión inicial del módulo, según la sección de versiones de módulo de la fuente de SiFli |

</div>

<div align="center"><em>Resumen de versión de la placa</em></div>

<div align="center" markdown>

| Versión de la placa | Base | Notas |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 y SF32LB58-MOD-A128R32N1-V1.0.1 | Versión actual; añade detección de conexión USB en PB24; cambia el PTC a 2 A / 6 V para admitir la salida máxima de ambos canales de audio; elimina la adaptación de nivel del LED RGB porque su temporización no era adecuada; sustituye el convertidor CC-CC para reducir el rizado de salida; elimina la resistencia pull-up de USB DP para corregir las interrupciones en modo USB periférico |
| V1.0.0 | SF32LB58-MOD-N16R32N1-V1.0.0 con SF32LB587VEE56 | Versión pública inicial de la placa |

</div>

La fuente de SiFli presenta una discrepancia para V1.0.0: la sección de versiones del módulo identifica SF32LB586VDD36, mientras que la sección de versiones de la placa indica SF32LB587VEE56 para una placa con el módulo N16R32N1-V1.0.0. Comprueba las marcas del chip y del módulo en el hardware y consulta los archivos de diseño correspondientes antes de elegir el firmware o confiar en una configuración de almacenamiento.

## Aspectos destacados de la placa { #board-highlights }

- Módulo SF32LB58-MOD-N16R32N1 o SF32LB58-MOD-A128R32N1, según la versión de la placa
- La V1.0.1 usa SF32LB586VDD36, con dos memorias HPI-PSRAM de 16 MB y 1 MB de QSPI-NOR en el encapsulado; la fuente de SiFli presenta una discrepancia sobre el MCU de la V1.0.0 (véase la nota de versión anterior)
- 16 MB de QSPI-NOR o 128 MB de QSPI-NAND adicionales, según la variante del módulo
- Cristal principal de 48 MHz y cristal RTC de 32,768 kHz
- Conector de antena IPEX y red de adaptación de RF del módulo
- Soporte de pantalla MIPI DSI / RGB888 a través de conectores FPC dedicados
- Dos rutas de pantalla QSPI / DSPI / SPI disponibles en conectores de 40 pines
- Soporte de panel táctil I2C
- Entrada de micrófono analógico en placa y salida de audio Clase D estéreo
- Dos puertos USB Type-C: uno para descarga y depuración mediante USB-UART y otro para USB 2.0 HS
- Ranura para tarjeta MicroSD sobre SDIO
- Expansión GPIO del núcleo principal y del núcleo de bajo consumo mediante dos conectores de 40 pines
- Capacidad de expansión CAN y Wi-Fi SDIO

## Cuándo usar esta placa { #when-to-use-this-board }

Elige SF32LB58-DevKit-LCD si necesitas una plataforma práctica y cercana a una configuración de producto real para validar pantallas de altas prestaciones y periféricos, en lugar de una placa de expansión básica.

- Poner en marcha paneles de pantalla MIPI DSI, RGB888 o QSPI
- Validar táctil, audio, almacenamiento y USB juntos
- Probar el comportamiento de UI de alta resolución en la plataforma SF32LB58x
- Evaluar la expansión CAN o Wi-Fi SDIO
- Comparar configuraciones de módulo respaldadas por NOR y NAND
- Validar el firmware en una placa de altas prestaciones antes de diseñar la PCB propia

Para planificar la integración a nivel de módulo, revisa también [SF32LB58-MOD](../modules/SF32LB58-MOD.md). Para conocer la arquitectura de la familia de chips y sus capacidades de pantalla y memoria, consulta [SF32LB58x](../chips/SF32LB58x.md).

## Configuración de hardware { #hardware-configuration }

<div align="center"><em>Resumen de configuración de hardware</em></div>

<div align="center" markdown>

| Área | Configuración |
| :--- | :--- |
| Módulo núcleo | SF32LB58-MOD-N16R32N1 o SF32LB58-MOD-A128R32N1 |
| MCU según revisión de la placa | V1.0.1: SF32LB586VDD36; V1.0.0: discrepancia en la fuente de SiFli (véase la nota de versión anterior) |
| Memoria en el encapsulado (V1.0.1) | 16 MB + 16 MB de HPI-PSRAM y 1 MB de QSPI-NOR |
| Almacenamiento adicional | 16 MB de QSPI-NOR o 128 MB de QSPI-NAND, según la variante del módulo |
| Pantalla | Soporte de panel MIPI DSI, DPI/RGB888 y QSPI |
| Audio | Ruta de micrófono analógico en placa más salida de altavoz estéreo |
| USB | USB-UART Type-C y USB 2.0 HS Type-C |
| Canales USB-UART | La guía de modelos de placas de SiFli indica que el CH343K admite dos canales de depuración USB-UART; la guía detallada de la placa no especifica qué canal corresponde a cada conector Type-C |
| Almacenamiento | Ranura para tarjeta MicroSD sobre SDIO |
| Antena | Ruta de RF del módulo con conector IPEX |
| Expansión | Dos conectores de 40 pines para el núcleo principal y el de bajo consumo |
| Controles y puntos de prueba | Dos botones de usuario (HOME/reinicio por pulsación larga y función), botón RESET independiente, puente MODE y puntos de prueba UART/USB/CAN |
| Conversión de potencia | Convertidores DC-DC en la placa. El historial SiFli de V1.0.1 registra el reemplazo de un convertidor para reducir el rizado de salida, pero no identifica el componente; confirma la revisión exacta en el esquema/BOM. |
| Dimensiones de la placa / temperatura de funcionamiento | 65 × 50 mm / −40 a 85 °C |

</div>

## Primeros pasos { #getting-started }

### Hardware requerido { #required-hardware }

- Placa SF32LB58-DevKit-LCD
- Módulo LCD usando MIPI DSI, RGB888 o QSPI, según corresponda
- Cable de datos USB 2.0, Type-A a Type-C o equivalente
- Computadora host con Windows, Linux o macOS

### Hardware opcional { #optional-hardware }

- Dos altavoces
- Tarjeta TF / MicroSD
- Depurador J-Link o compatible con SWD
- Placa transceptora CAN
- Módulo Wi-Fi SDIO

### Configuración básica { #basic-setup }

1. Conecta el panel de pantalla al conector LCD correspondiente.
2. Conecta el puerto USB-UART Type-C al ordenador host.
3. Abre la herramienta de descarga de SiFli y selecciona el puerto COM correcto.
4. Coloca o retira el puente Mode según quieras usar el modo de descarga o el modo de funcionamiento normal.
5. Enciende la placa y descarga o ejecuta el firmware objetivo.
6. Después de poner en marcha la pantalla, valida el tacto, el audio, el almacenamiento y los periféricos de expansión que necesite el producto.

Usa un cable USB compatible con la transferencia de datos. Algunos cables Type-C solo suministran alimentación y no permiten la comunicación UART ni USB.

## Alimentación { #power }

SF32LB58-DevKit-LCD se alimenta desde USB Type-C.

- Ambos conectores USB Type-C de la placa pueden alimentarla
- Para descargar firmware y consultar los registros UART, usa el puerto USB-UART Type-C
- Planifica el uso del puerto USB 2.0 HS Type-C por separado al validar funciones USB nativas

## Descarga y depuración { #download-and-debug }

El puerto USB-UART Type-C es la interfaz principal para descargar firmware y consultar los registros serie.

- **Modo de descarga**: instala el puente Mode y, a continuación, enciende o reinicia la placa
- **Modo de depuración y registro de software**: retira el puente Mode y, a continuación, enciende o reinicia la placa

La placa también admite depuración J-Link / SWD.

![Referencia de cableado J-Link de SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Referencia de cableado J-Link</em></div>

![Referencia de adaptador J-Link](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>Referencia de adaptador J-Link</em></div>

![Referencia de adaptador SWD](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>Referencia de adaptador SWD</em></div>

## Objetivos de compilación del SDK { #sdk-build-targets }

La configuración de compilación de SiFli-SDK usa estos nombres exactos de destino de placa; utiliza el nombre correspondiente con `scons --board=<board_name>`:

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

Son identificadores de destinos de compilación del SDK, no necesariamente los nombres de producto impresos en la placa o el módulo. El índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) de la rama principal no enumeran exactamente los mismos destinos de la serie 58; confirma los datos para la revisión del SDK que utilizas. Además, la actual [guía de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) no incluye un SKU físico correspondiente a `sf32lb58-lcd_n16r64n4`.

## Señales clave de módulo y expansión { #key-module-and-expansion-signals }

La placa expone tanto señales a nivel de módulo como dos conectores de expansión de 40 pines. Consulta la hoja de datos del módulo y los esquemas para ver la asignación completa de pines. La tabla siguiente resume los grupos de señales más relevantes para el diseño.

<div align="center"><em>Grupos de señales funcionales clave</em></div>

<div align="center" markdown>

| Grupo de señales | Pines/señales típicos | Uso principal |
| :--- | :--- | :--- |
| Descarga y depuración | PB36, PB37, SWDIO, SWCLK, Boot_Mode, RSTN | Descarga UART, depuración de software, puesta en marcha SWD |
| MicroSD | PA75, PA76, PA77, PA70, PA81, PA79, PB58 | Interfaz de tarjeta SDIO y detección de tarjeta |
| RGB LCDC1 | PA12–PA15, PA22–PA27, PA43–PA48, PA50, PA53–PA58, PA61–PA63, PA65, PA67 | Ruta de pantalla RGB888 |
| MIPI DSI LCDC1 | Pares diferenciales DSI_D0–DSI_D3 y DSI_CLK | Ruta de pantalla MIPI DSI; funcionamiento documentado con un máximo de dos líneas de datos |
| QSPI LCDC1 | PA82, PA84, PA86, PA88, PA90, PA91, PA51, PA52 | Interfaz de pantalla QSPI del lado del núcleo principal |
| QSPI LCDC2 | PB02–PB04, PB06, PB08–PB10, PB23, PB27, PB30, PB31, PB34 | Interfaz de pantalla QSPI del lado del núcleo de bajo consumo |
| Táctil | PA16, PA17, PA59, PA60, PA92, PA93 | Señales de reinicio, interrupción y táctil I2C |
| Audio | AU_DAC1/2, AU_ADC1/2, MIC_BIAS, PB23 | Entrada/salida de audio analógico y habilitación del amplificador de potencia |
| CAN / expansión general | PA02, PA11 y grupos GPIO de los conectores de expansión | Expansión CAN y de periféricos |

</div>

## Interfaces de pantalla { #display-interfaces }

La placa admite tres rutas de pantalla principales:

- **MIPI DSI** a través de un conector FPC de 30 pines con paso de 0,5 mm
- **RGB888** a través de un conector FPC de 40 pines y paso de 0,5 mm, compatible con la asignación de pines RGB habitual de ALIENTEK
- **QSPI / DSPI / SPI** a través de los dos conectores de expansión de 40 pines

La documentación de SiFli indica que se admiten las siguientes configuraciones de pantalla:

- Paneles MIPI DSI con hasta 2 líneas de datos y resolución de hasta 1280 × 800
- Paneles RGB888 con resolución de hasta 1280 × 800
- Paneles QSPI con resolución de hasta 512 × 512

!!! warning "Número de líneas MIPI DSI"
    La asignación del conector de 30 pines de la placa enumera D0–D3, pero la guía de la placa y el SDK documentan un máximo de dos líneas de datos. No deduzcas compatibilidad con cuatro líneas solo por las etiquetas del conector. Comprueba el cableado para el panel y la revisión exactos antes de usarlo.

![Referencia de cableado de pantalla MIPI](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Referencia de cableado de pantalla MIPI</em></div>

![Referencia de cableado de pantalla QSPI LCDC1](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Cableado de pantalla QSPI LCDC1</em></div>

![Referencia de cableado de pantalla QSPI LCDC2](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Cableado de pantalla QSPI LCDC2</em></div>

## Audio { #audio }

La placa admite:

- Una ruta de entrada de micrófono en placa
- Dos rutas de entrada ADC de audio; una comparte el camino con el micrófono integrado, y la selección entre este y la entrada del conector de 40 pines se realiza mediante puentes con resistencias
- Dos salidas de altavoz
- Una ruta de señal PDM multiplexada con las señales RGB; por tanto, no está disponible mientras se utiliza la interfaz de pantalla RGB

La [guía detallada de la placa](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html) de SiFli indica una salida de audio analógico estéreo de hasta 2,8 W/4 Ω, mientras que su [guía de modelos de placas](https://wiki.sifli.com/en/board/devkit_guide.html) especifica 3 W/4 Ω para las dos salidas de altavoz. Ninguna de las fuentes aclara si la potencia se aplica a cada canal o al conjunto. Antes de elegir altavoces, comprueba la revisión exacta de la placa, el esquema y las condiciones de alimentación y carga del amplificador; no consideres ninguna de las cifras una potencia garantizada por canal.

![Referencia de cableado de audio](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Referencia de cableado de audio</em></div>

## Expansión CAN y Wi-Fi SDIO { #can-and-sdio-wi-fi-expansion }

El módulo SF32LB58 subyacente incluye un controlador CAN, y la placa expone la interfaz para su uso con un transceptor externo.

![Referencia de cableado CAN](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Referencia de cableado CAN</em></div>

![Placa transceptora CAN de referencia](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>Placa transceptora CAN de referencia</em></div>

La placa también admite un módulo Wi-Fi SDIO a través del conector de expansión.

![Módulo Wi-Fi SDIO de referencia](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>Módulo Wi-Fi SDIO de referencia</em></div>

![Referencia de cableado Wi-Fi SDIO](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Referencia de cableado Wi-Fi SDIO</em></div>

![Esquema Wi-Fi SDIO de referencia](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>Esquema Wi-Fi SDIO de referencia</em></div>

## Documentos relacionados { #related-documents }

[SF32LB58x Introducción al chip]: ../chips/SF32LB58x.md
[SF32LB58x Manual de usuario]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[SF32LB58-MOD Paquete de diseño]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[SF32LB58-DevKit-LCD Paquete de diseño]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[SF32LB58-DevKit-LCD Proyecto LCEDA]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[Comprar muestras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB58x Introducción al chip]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Manual de usuario]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[SF32LB58-MOD Paquete de diseño]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD Paquete de diseño]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD Proyecto LCEDA]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__

</div>
