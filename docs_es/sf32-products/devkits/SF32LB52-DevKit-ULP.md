---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: placa de desarrollo SF32LB52x para dispositivos vestibles, con AMOLED, pantalla táctil, sensores, audio, carga de batería y medición de corriente para evaluar el consumo del sistema."
tags:
    - Hardware
    - Placa de desarrollo
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## Visión general { #overview }

El SF32LB52-DevKit-ULP también se conoce como **立创黄山派**, **LCKFB-HSPI-SF32LB52-ULP** y **SF32LB52-ULP**. Es una placa compacta de desarrollo de muy bajo consumo basada en la familia SF32LB52x, concebida para crear prototipos de relojes inteligentes y pulseras de actividad, no solo para ofrecer acceso básico al MCU.

Frente a las placas LCD, Nano y Core-3p3, esta ofrece una configuración más cercana a un producto final: reúne un módulo SF32LB52, una pantalla AMOLED táctil, micrófono, amplificador de altavoz, LED RGB, controlador de motor vibratorio, sensores de movimiento, de campo magnético y de luz ambiental, circuito de carga y puentes para medir corriente. Resulta especialmente útil para evaluar no solo si funciona el MCU, sino también cómo se comporta el sistema vestible completo cuando funciona con batería.

La [guía de la placa ULP][Artículo original de la Wiki de SiFli] sigue siendo una página provisional. La fuente primaria para la configuración detallada es la guía oficial china de la placa [Huangshan Pi][Guía SiFli de Huangshan Pi], que documenta la versión V1.0.0 y cuyos datos se usan aquí como referencia para esa revisión. La [wiki de hardware de LCKFB][Wiki de hardware LCKFB] no identifica la revisión y contiene varios números de componente distintos. No se ha establecido si reflejan otra revisión o documentación desactualizada; no los considere intercambiables y contraste la unidad con sus marcas, esquema y BOM.

**Nota sobre el estado de publicación:** La guía SiFli V1.0.0 indica que la placa documentada se destinaba entonces a pruebas internas y que se modificaría antes de publicarse externamente. Esta afirmación se refiere a esa revisión de la fuente; no permite determinar el estado ni la BOM de placas posteriores. Compruebe la revisión exacta de la placa y su BOM.

La [página de placas del SDK de SiFli][Página de la placa ULP en el SDK de SiFli] identifica este objetivo de compilación como `sf32lb52-lchspi-ulp`. Esa página y la sección de contenido del kit de la guía china de Huangshan Pi escriben `SF32LB52X-MOD-1-N16R8`, mientras que la [guía de modelos de módulos de SiFli][Guía de modelos de módulos SiFli] y el encabezado de la tabla GPIO utilizan `SF32LB52-MOD-1-N16R8`. Las fuentes no explican la diferencia de la `X`. El objetivo del SDK sí está confirmado; compruebe la referencia impresa en el módulo instalado y la BOM, sin deducir que las dos grafías designan hardware distinto.

![Configuración de referencia del SF32LB52-ULP para un dispositivo vestible](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — Configuración de referencia para un dispositivo vestible</em></div>

![Diagrama de bloques de Huangshan Pi SF32LB52](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>Huangshan Pi SF32LB52 — Diagrama de bloques</em></div>

## Nomenclatura { #naming }

<div align="center"><em>Alias de nomenclatura de la placa</em></div>

<div align="center" markdown>

| Nombre | Dónde se usa |
| :--- | :--- |
| SF32LB52-DevKit-ULP | Nomenclatura de la familia de placas SiFli/OpenSiFli |
| SF32LB52-ULP | Nombre corto de hardware/producto |
| LCKFB-HSPI-SF32LB52-ULP | Nomenclatura de proyecto/pedido de LCKFB |
| 立创黄山派 / 立创・黄山派 SF32LB52 | Nombre del producto y de la documentación en chino |

</div>

Use estos nombres como alias de la misma familia al buscar documentación de hardware, ejemplos, páginas de compra o información de la comunidad. Para consultar esquemas, asignaciones de pines o la BOM, confirme siempre la revisión exacta de la placa y la documentación correspondiente del proveedor.

## Aspectos destacados de la placa { #board-highlights }

- Módulo SF32LB52-MOD-1-N16R8 basado en SF32LB52x
- Configuración de módulo estándar SF32LB525UC6
- 8 MB de OPI-PSRAM, interfaz de 144 MHz
- Flash QSPI-NOR de 128 Mb, modo STR a 72 MHz
- Cristal principal de 48 MHz y cristal RTC de 32,768 kHz
- Antena PCBA integrada en la placa
- Pantalla AMOLED de 1,85 pulgadas y resolución de 390 × 450
- Interfaz de pantalla Quad-SPI con soporte táctil
- Micrófono MEMS en placa
- Salida de audio analógico con amplificador de altavoz Clase D
- Conector para altavoces externos de 3 W / 4 Ω o 2 W / 8 Ω
- Interfaz UART USB Type-C a través de CH340N para programación del firmware, depuración y alimentación
- Señales USB 2.0 FS expuestas a través del conector de expansión de 30 pines
- Ranura para tarjeta MicroSD usando SPI
- Una tecla de función y una tecla de encendido/reinicio
- LED RGB SK6812MINI-HS (guía SiFli V1.0.0; la página de LCKFB, sin versión indicada, cita WS2812B-2020)
- Circuito controlador del motor vibratorio con pads de soldadura para conectar un motor externo
- IMU de 6 ejes LSM6DS3TR-C
- Sensor magnético de 3 ejes MMC5603NJ
- Sensor de luz ambiental LTR-303ALS-01
- Cargador de batería y componentes de gestión de alimentación para evaluar el consumo energético de dispositivos vestibles
- Conector de expansión de 2 × 15 pines, paso de 1,27 mm, con GPIO y puntos de medición de corriente

## Cuándo usar esta placa { #when-to-use-this-board }

Elija SF32LB52-DevKit-ULP / 立创黄山派 cuando el objetivo sea validar el sistema completo de un dispositivo vestible.

- Crear prototipos de relojes, pulseras de actividad y otros dispositivos vestibles con numerosos sensores
- Evaluar el comportamiento de la interfaz AMOLED en la plataforma SF32LB52x
- Probar de forma conjunta la pantalla táctil, los sensores de movimiento, magnéticos y de luz ambiental, el audio, la vibración y el LED RGB
- Medir las rutas de corriente de batería, sistema y 3,3 V durante el reposo y el uso activo
- Validar flujos de activación impulsados por botones, sensores, táctil o temporizadores de firmware
- Comparar el consumo real de un sistema próximo al producto final con las estimaciones iniciales obtenidas con placas DevKit más sencillas

Para una placa de evaluación general centrada en pantalla, use [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md). Para crear prototipos compactos con un módulo soldado, use [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para acceder directamente al mayor número de pines durante las primeras pruebas en el banco, use [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuración de hardware { #hardware-configuration }

<div align="center"><em>Resumen de configuración de hardware</em></div>

<div align="center" markdown>

| Área | Configuración |
| :--- | :--- |
| Módulo núcleo | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB de OPI-PSRAM, interfaz de 144 MHz |
| Flash | Flash QSPI-NOR de 128 Mb, modo STR a 72 MHz |
| Pantalla | AMOLED de 1,85 pulgadas (ZC-A1D85W-010), 390 × 450, brillo de 800 cd/m², Quad-SPI |
| Controlador de pantalla | CO5300AF-01 |
| CI de alimentación de la pantalla | BV6802W |
| Controlador táctil | FT6146-M00 |
| Micrófono | Micrófono MEMS en placa |
| Salida de altavoz | Amplificador Clase D, conector externo GH de 1,25 mm para el altavoz |
| Almacenamiento | Tarjeta MicroSD sobre SPI |
| Sensor de movimiento | IMU de 6 ejes LSM6DS3TR-C |
| Sensor magnético | Magnetómetro de 3 ejes MMC5603NJ |
| Sensor de luz ambiental | LTR-303ALS-01 |
| USB-UART | CH340N sobre USB Type-C |
| Batería | Batería Li-ion externa mediante un conector GH de 1,25 mm |
| Cargador | SY6103, tensión máxima de carga de 4,5 V; corriente constante predeterminada de 450 mA; corriente máxima de 500 mA |
| Dispositivos de protección/alimentación | OVP SY5320, interruptor de carga LP5240HVF y regulador LDO ETA5055V330DS2F |

</div>

**Los componentes varían entre fuentes o revisiones: verifique antes de diseñar.** La guía SiFli V1.0.0 de [Huangshan Pi][Guía SiFli de Huangshan Pi] especifica el cargador SY6103, el OVP SY5320 y el LED RGB SK6812MINI-HS. La [wiki de hardware de LCKFB][Wiki de hardware LCKFB], que no identifica la revisión, indica LP5305AQVF y WS2812B-2020; además, cita AW32001ECSR en la lista de características y AW23001ECSR en la sección de carga. Las fuentes no permiten determinar si las diferencias se deben a una revisión distinta o a documentación sin actualizar. Aquí se toman los datos de SiFli como referencia para V1.0.0. Antes de depender de las características de un componente, compruebe las marcas de la unidad, el esquema y la BOM.

## Contenido del paquete { #package-contents }

La documentación indica que el kit Huangshan Pi incluye:

- Placa principal
- Placa de pantalla
- Batería
- Altavoz

Antes de preparar el entorno de evaluación, compruebe el contenido del kit adquirido. Los accesorios pueden variar según el vendedor o el lote de fabricación.

## Alimentación y batería { #power-and-battery }

La placa admite dos modos de alimentación principales:

- Alimentación USB Type-C
- Alimentación por batería independiente

La entrada de batería está diseñada para una batería Li-ion de una celda conectada mediante un conector GH de 1,25 mm; respete la orientación de pines indicada en la documentación. El circuito de carga documentado admite hasta 500 mA y viene configurado de fábrica con una corriente constante de 450 mA.

Si usa la placa sin batería y alimenta VBAT desde una fuente de laboratorio, el rango de entrada documentado es de 3,7 a 4,7 V; para las pruebas con tensión de alimentación normal se recomiendan 3,8 V. Los umbrales documentados del SF32LB52-MOD-1-N16R8 son 3,58 V para el encendido y 3,48 V para el apagado.

La guía de hardware de LCKFB advierte que la función de pulsación prolongada puede no funcionar cuando la batería está desconectada. Compruebe este comportamiento con la revisión concreta de la placa y la configuración de alimentación prevista.

## Puentes para medir corriente { #power-measurement-jumpers }

La placa incorpora puentes de medición de corriente en las principales rutas de alimentación.

<div align="center"><em>Asignación de los puentes de medición de corriente</em></div>

<div align="center" markdown>

| Pines | Ruta | Propósito |
| :--- | :--- | :--- |
| 5-6 | Ruta VBAT | Insertar un amperímetro entre la batería o el cargador y el resto del sistema |
| 7-8 | Ruta VSYS | Conectar un amperímetro en la ruta VSYS |
| 11-12 | Ruta VCC_3V3 | Conectar un amperímetro en el riel principal de 3,3 V |

</div>

Para el funcionamiento normal, mantenga puenteados los pares de pines 5-6, 7-8 y 11-12. Retire solo el puente de la ruta que vaya a medir para insertar un amperímetro o un analizador de potencia.

## Carga de firmware y depuración { #download-and-debug }

Durante el desarrollo, use la interfaz UART por USB Type-C para programar el firmware, consultar los registros serie y alimentar la placa.

Material necesario para la primera puesta en marcha:

- Placa SF32LB52-DevKit-ULP / 立创黄山派
- Cable de datos USB 2.0
- Computadora host con Windows, Linux o macOS

Material opcional:

- Altavoz externo
- Tarjeta TF
- Batería Li-ion de 450 mAh o más
- Segundo cable USB cuando se necesitan depuración UART y pruebas USB nativas al mismo tiempo

Use un cable USB compatible con transferencia de datos. Un cable de solo carga puede alimentar la placa, pero no permite la comunicación serie.

## Objetivos de compilación del SDK { #sdk-build-targets }

El nombre exacto del destino de placa en SiFli-SDK es `sf32lb52-lchspi-ulp`; use este nombre en el comando `scons --board=<board_name>`. Es un identificador de destino de compilación del SDK, no necesariamente el nombre de producto impreso en la placa o el módulo. Confirme el destino en el índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y en el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) para la revisión del SDK que utilice.

## Asignaciones clave de señales { #key-signal-assignments }

<div align="center"><em>Asignaciones clave de señales</em></div>

<div align="center" markdown>

| Señal | Función |
| :--- | :--- |
| PA44 | VBUS_DET, detección de inserción de cargador |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | Interrupción táctil |
| PA40 / PA39 | Sensor I2C1 SCL / SDA, según la tabla de asignación GPIO; véase la discrepancia con el pin del conector indicada abajo |
| PA38 | Control de conmutación de VSYS a VSYS_1 |
| PA37 / PA33 | Táctil I2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | Botón HOME y reinicio al mantenerlo pulsado durante 10 s |
| PA32 | Datos de LED RGB |
| PA31 | Interrupción de sensor 1 |
| PA30 | Control de conmutación de VSYS_1 a HR3V3 |
| PA27 | Detección de tarjeta SD |
| PA24, PA25, PA28, PA29 | Interfaz SPI1 MicroSD |
| PA20 | PWM del motor de vibración |
| PA19 / PA18 | UART de depuración TXD / RXD |
| PA11 / PA10 | Cargador I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | Polarización y entrada de micrófono |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Salida de audio analógico |
| PA08..PA03, PA02, PA01, PA00 | Pantalla QSPI, TE, PWM de retroiluminación y reinicio |
| PA15..PA12, PA16, PA17 | Señales MPI2 / SD1, usadas internamente por la Flash del módulo en el módulo N16R8 |

</div>

## Encabezado de expansión de 30 pines { #30-pin-expansion-header }

El conector de expansión de 30 pines expone señales de alimentación, USB, sensores, pantalla, almacenamiento, vibración, depuración, botones y control del cargador.

<div align="center"><em>Mapa de señales del encabezado de expansión de 30 pines</em></div>

<div align="center" markdown>

| Grupo de pines | Señales | Notas |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | 5 V desde USB cuando está conectado; puede ser entrada de 5 V cuando USB no está conectado |
| 3-4 | GND | Tierra |
| 5-6 | VBAT_S / VBAT | Puenteado para el funcionamiento normal; abierto para medir la corriente de VBAT |
| 7-8 | VSYS_S / VSYS | Puenteado para el funcionamiento normal; abierto para medir la corriente de VSYS |
| 9-10 | GND | Tierra |
| 11-12 | VCC_3V3_S / VCC_3V3 | Puenteado para el funcionamiento normal; abierto para medir la corriente de 3,3 V |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | La tabla SiFli V1.0.0 del conector indica Sensor I2C1 SDA / SCL; el pin 14 no coincide con la tabla GPIO (véase abajo) |
| 17 | PA32 | Datos de LED RGB, también utilizable como GPIO |
| 18 | PA30 | Control de alimentación del sensor; el uso como GPIO puede afectar el comportamiento de PA39/PA40 |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | Pines de SPI1/tarjeta SD; usarlos para expansión entra en conflicto con la tarjeta TF integrada |
| 24 | PA20 | PWM de vibración; usarlo para expansión entra en conflicto con el accionamiento del motor |
| 25 / 27 | PA19 / PA18 | UART de depuración TXD / RXD |
| 26 / 28 | PA34 / PA43 | Tecla de encendido/reinicio y tecla de función |
| 29 / 30 | PA11 / PA10 | Cargador I2C0 SDA / SCL |

</div>

**Discrepancia en la asignación de pines: verificar antes de conectar.** En la tabla GPIO de SiFli V1.0.0, Sensor I2C1_SDA corresponde a PA39; en la tabla del conector de 30 pines, el pin 14 figura como PB39/I2C1_SDA y el pin 16 como PA40/I2C1_SCL. La documentación de LCKFB también presenta la diferencia PA39/PB39, sin identificar la revisión ni explicar la ruta. No está confirmado qué pad del MCU llega al pin 14. Antes de conectar un periférico, consulte el esquema/BOM de la unidad y compruebe la continuidad; no dé por hecho que PA39 y PB39 son intercambiables.

## Interfaz de pantalla y táctil { #display-and-touch-interface }

La placa utiliza una pantalla AMOLED y expone las señales de un FPC QSPI de 22 pines. La tabla de SiFli V1.0.0 marca los pines 5-10 como NC; la siguiente tabla incluye las 22 posiciones y señala explícitamente esos pines sin conexión.

<div align="center"><em>Mapa de señales FPC de pantalla y táctil QSPI de 22 pines</em></div>

<div align="center" markdown>

| Pin | Señal | Función |
| :--- | :--- | :--- |
| 1 | VBAT | Salida VBAT del lado de la pantalla |
| 2 | PA01 | PWM de retroiluminación para uso tipo TFT |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | Sin conexión |
| 6 | NC | Sin conexión |
| 7 | NC | Sin conexión |
| 8 | NC | Sin conexión |
| 9 | NC | Sin conexión |
| 10 | NC | Sin conexión |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | Reinicio de LCD |
| 13 | PA04 | Reloj QSPI/SPI |
| 14 | PB05 (tabla FPC de SiFli V1.0.0) | QSPI D0 / SPI SDI; la tabla GPIO independiente indica PA05 |
| 15 | PA03 | Selección de chip QSPI/SPI |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Salida de 3,3 V |
| 18 | PA41 | Interrupción táctil |
| 19 | PA33 | Táctil I2C SDA |
| 20 | PA37 | Táctil I2C SCL |
| 21 | PA09 | Reinicio táctil |
| 22 | GND | Tierra |

</div>

**Discrepancia en el pinout; verifique antes de conectar la pantalla:** La tabla FPC de 22 pines de SiFli V1.0.0 asigna PB05 al pin 14 para QSPI D0, mientras que su tabla GPIO independiente indica PA05. La tabla FPC de LCKFB también asigna PB05, mientras que su tabla GPIO indica PA05; ninguna fuente explica cómo se relacionan la etiqueta del pad del módulo y la del conector. La ruta eléctrica sigue sin confirmarse: revise el esquema/BOM de la revisión concreta y compruebe la continuidad; no dé por intercambiables PA05 y PB05.

## Cómo medir el consumo { #power-measurement-guidance }

Para obtener mediciones representativas de consumo ultrabajo:

- Mida VBAT, VSYS y VCC_3V3 por separado cuando sea posible.
- Mantenga instalado el puente correspondiente en cada riel que no esté midiendo.
- Antes de medir la corriente en reposo, desactive las cargas prescindibles, como los efectos de la LED RGB, los registros de depuración, la actualización de pantalla y la consulta periódica de sensores.
- En cada medición, anote la revisión de la placa, el identificador del commit del firmware, la tensión de la batería o de la fuente, el estado de los puentes y el estado de los sensores.
- Mida tanto la corriente estable durante el reposo como la corriente durante eventos de interacción táctil, interrupciones de sensores, actividad Bluetooth, activación de la pantalla y vibración.

## Documentos relacionados { #related-documents }

[SF32LB52x Introducción al chip]: ../chips/SF32LB52x.md
[SF32LB52x Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Artículo original de la Wiki de SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[Guía SiFli de Huangshan Pi]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[Página de la placa ULP en el SDK de SiFli]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[Guía de modelos de módulos SiFli]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Página del proyecto LCKFB]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[Wiki de hardware LCKFB]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[Comprar muestras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Introducción al chip]__
- :fontawesome-solid-file-lines: __[SF32LB52x Guía de diseño de hardware]__
- :fontawesome-brands-github: __[Artículo original de la Wiki de SiFli]__
- :fontawesome-solid-up-right-from-square: __[Página del proyecto LCKFB]__
- :fontawesome-solid-book: __[Wiki de hardware LCKFB]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__

</div>
