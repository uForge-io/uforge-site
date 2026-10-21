---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD: placa SF32LB52x centrada en pantalla para arrancar rápido displays SPI, QSPI y MCU/8080 con táctil, audio, almacenamiento y batería."
tags:
    - Hardware
    - Placa de desarrollo
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## Visión general { #overview }

El SF32LB52-DevKit-LCD es una placa de desarrollo para aplicaciones con pantalla de la familia SF32LB52x. Está basada en un módulo SF32LB52x y permite desarrollar con rapidez productos que utilizan interfaces SPI, DSPI, QSPI o MCU/8080.

La placa integra en una sola plataforma de evaluación el módulo MCU, conectores de pantalla, interfaz táctil, entrada de micrófono analógico, salida de audio analógico, USB Type-C, depuración USB-UART, ranura para tarjeta TF y conexión para batería. Es una base práctica para desarrollar interfaces hombre-máquina (HMI) de relojes inteligentes, paneles de instrumentos compactos, periféricos de pantalla y otras aplicaciones SF32LB52x que necesitan una pantalla desde las primeras etapas.

![Vista frontal de SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Vista frontal</em></div>

![Vista posterior de SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Vista posterior</em></div>

![Diagrama de bloques de SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Diagrama de bloques</em></div>

## Aspectos destacados de la placa { #board-highlights }

- Plataforma de módulo SF32LB52x, compatible con SF32LB52-MOD-1, SF32LB52-MOD-A y SF32LB52-MOD-B
- Soporte de LCD QSPI/SPI/DSPI a través de un conector FPC de 22 pines
- Soporte de LCD MCU/8080 de 8 bits a través del FPC y el encabezado de expansión de 40 pines
- Soporte de panel táctil I2C
- USB-C para grabación y depuración por USB-UART, y para alimentar la placa
- Interfaz USB-C separada para USB 2.0 FS
- Micrófono MEMS en placa y amplificador de potencia de audio Clase D
- Ranura para tarjeta MicroSD usando SPI
- Conector de batería y cargador lineal ETA9640P
- Encabezado de expansión de 40 pines para señales de pantalla, GPIO, almacenamiento, audio y alimentación

## Cuándo usar esta placa { #when-to-use-this-board }

Elija SF32LB52-DevKit-LCD cuando el proyecto necesite una plataforma completa para desarrollar productos con pantalla, no solo una placa que exponga las señales básicas.

- Poner en marcha paneles LCD QSPI, SPI, DSPI o MCU/8080
- Validar la integración de panel táctil
- Probar aplicaciones de UI LVGL o personalizadas en SF32LB52x
- Evaluar la entrada de micrófono y la salida de altavoz
- Prototipar almacenamiento en tarjeta TF
- Comparar opciones de módulo antes de definir el diseño de una PCB propia

Para una placa más pequeña con semiorificios metalizados en los bordes, use [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Para disponer de más pines expuestos y acceder directamente a las señales, use [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuración de hardware { #hardware-configuration }

<div align="center"><em>Resumen de configuración de hardware</em></div>

<div align="center" markdown>

| Área | Configuración |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6; 16 MB QSPI-NOR + 8 MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6; 128 MB QSPI-NAND + 16 MB OPI-PSRAM |
| Relojes | Cristal principal de 48 MHz y cristal RTC de 32,768 kHz en el módulo |
| RF | Antena en placa o conector IPEX seleccionado por resistencia de 0 ohmios |
| Pantalla | QSPI/SPI/DSPI y MCU/8080 de 8 bits |
| Táctil | Interfaz táctil I2C |
| Audio | Entrada de micrófono MEMS y amplificador de altavoz Clase D |
| Almacenamiento | Ranura para tarjeta MicroSD sobre SPI |
| USB | USB-UART Type-C y USB 2.0 FS Type-C |
| Batería | Conector de batería Li-ion/Li-poly de una sola celda |
| Cargador | Cargador lineal ETA9640P, corriente de carga predeterminada de 450 mA |

</div>

Los códigos y las configuraciones de memoria anteriores siguen la [guía de modelos de placas de desarrollo de SiFli](https://wiki.sifli.com/en/board/devkit_guide.html). Antes de diseñar, confirme la revisión en la serigrafía y en el paquete de diseño.

Las fuentes oficiales usan denominaciones distintas para la memoria Flash de A128R16: la [guía de modelos de módulos de OpenSiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) identifica el módulo como SPI-NAND de 128 MB, mientras que la guía de modelos de placas indica QSPI-NAND de 128 MB para la SKU DevKit correspondiente. Las fuentes no aclaran si la diferencia se refiere al componente instalado o a la denominación de la interfaz. Antes de basarse en esta configuración, confirme el componente Flash y el modo de bus en el esquemático y la BOM de la revisión exacta de la placa.

## Notas de versión { #version-notes }

<div align="center"><em>Historial de versiones de la placa</em></div>

<div align="center" markdown>

| Versión | Base del módulo | Notas |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | Detección de tarjeta SD actualizada a PA26. La guía actual de SiFli incluye las dos configuraciones MOD-1 indicadas arriba. |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | Circuito de carga actualizado, conmutación de alimentación, ganancia del PA de audio, comportamiento de reinicio, circuito de LED RGB, compatibilidad de pines de módulo, filtrado de la alimentación de RF, soporte de doble Flash, detección de tarjeta SD, Wi-Fi SDIO opcional, zona de exclusión de antena y protección VBUS |
| V1.0.0 | Módulo SF32LB52 anterior | Versión pública inicial de la placa |

</div>

Verifique la serigrafía y el paquete de diseño de la revisión exacta de la placa antes de usar el mapa de pines para diseñar la placa portadora o el útil de producción.

![Vista anotada frontal de SF32LB52-DevKit-LCD](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Vista anotada frontal</em></div>

![Vista anotada posterior de SF32LB52-DevKit-LCD](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Vista anotada posterior</em></div>

## Primeros pasos { #getting-started }

### Hardware requerido { #required-hardware }

- Placa SF32LB52-DevKit-LCD
- Módulo LCD compatible con la interfaz seleccionada
- Cable de datos USB 2.0, Type-A a Type-C o equivalente
- Equipo con Windows, Linux o macOS

### Hardware opcional { #optional-hardware }

- Altavoz
- Tarjeta TF
- Batería Li-ion/Li-poly de una sola celda, normalmente de 450 mAh a 500 mAh
- Segundo cable USB cuando se necesitan depuración UART y pruebas USB nativas al mismo tiempo

### Configuración básica { #basic-setup }

1. Conecte el módulo LCD al conector LCD correcto.
2. Conecte el puerto USB-UART Type-C al equipo.
3. Abra SifliTrace o la herramienta de descarga de firmware de SiFli.
4. Seleccione el puerto serial detectado.
5. Encienda la placa y descargue o ejecute el firmware de destino.
6. Una vez encendida la pantalla, verifique las funciones táctiles, gráficas, de almacenamiento y de audio que requiera la aplicación.

Use un cable USB compatible con la transferencia de datos. Un cable solo de carga puede alimentar la placa, pero no habilita la conexión serie ni la transferencia de datos por USB.

## Alimentación { #power }

SF32LB52-DevKit-LCD se puede alimentar de dos formas principales:

- Alimentación USB Type-C desde cualquiera de los conectores USB
- Alimentación por batería a través del conector de batería en placa

Para grabar el firmware y depurar con normalidad, use el puerto USB-UART Type-C. La alimentación por batería resulta útil para probar la pantalla, el audio y el comportamiento de bajo consumo sin conectar un cable USB.

La placa integra un cargador lineal ETA9640P. Admite una corriente de carga máxima de 1 A y viene configurada de forma predeterminada para una corriente constante de 450 mA. Use una batería Li-ion o Li-poly de una celda y compruebe la polaridad del conector en la serigrafía antes de conectarla.

## Descarga y depuración { #download-and-debug }

El puerto USB-UART es la interfaz principal para grabar el firmware y consultar los registros.

- **Modo de descarga**: habilite la opción BOOT en la herramienta de descarga, luego encienda o reinicie la placa.
- **Modo de depuración/registro**: deshabilite la opción BOOT y encienda o reinicie la placa para iniciar el funcionamiento normal con registro por el puerto serie.

Algunas placas SF32LB52x usan la señal RTS del adaptador USB-UART para reiniciar la MCU. Si la placa se reinicia inesperadamente al abrir por primera vez el puerto serie, deshabilite el control de flujo de módem o el control de flujo por hardware en la configuración avanzada del puerto serie del equipo.

![Deshabilitar el control de flujo de módem en la configuración avanzada del puerto serie](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Deshabilitación del control de flujo de módem en la configuración del puerto serie</em></div>

## Interfaz de LCD y táctil { #lcd-and-touch-interface }

La placa admite paneles LCD QSPI mediante un conector FPC vertical de 22 pines y paso de 0,5 mm, con pestaña abatible. Si el panel tiene un orden de pines distinto, utilice una placa adaptadora antes de conectarlo.

Entre las funciones compatibles de pantalla y táctiles se incluyen:

- Señalización LCD SPI, DSPI y QSPI
- Señalización LCD QSPI en modo DDR
- Señalización LCD MCU/8080 de 8 bits
- Reinicio de LCD, selección de chip, reloj, datos, TE y PWM de retroiluminación
- SDA/SCL táctil I2C, interrupción y reinicio

La nota original de la placa de SiFli lista `TFT-H043A28WQISTKN22_V0-3` como un modelo de pantalla compatible.

### Mapa de señales FPC QSPI de 22 pines { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>Mapa de señales FPC QSPI de 22 pines</em></div>

<div align="center" markdown>

| Pin | Señal | Función |
| :--- | :--- | :--- |
| 1 | LEDK | Cátodo de retroiluminación LCD |
| 2 | LEDA | Ánodo de retroiluminación LCD |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | Reinicio de LCD |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Salida de 3,3 V |
| 18 | PA31 | Interrupción táctil |
| 19 | PA33 | Táctil I2C SDA |
| 20 | PA30 | Táctil I2C SCL |
| 21 | PA09 | Reinicio táctil |
| 22 | GND | Tierra |

</div>

**Discrepancia en el número de pines; verifique antes de conectar una pantalla:** SiFli identifica el conector y la tabla de señales como de 22 pines, pero el dibujo asociado numera los contactos del 1 al 24 y marca GND en los pines 22–24. La fuente no explica la diferencia. Antes de elegir o conectar un cable flexible, compruebe el conector físico y el esquemático de la revisión exacta; no dé por hecho que un cable de 22 pines encaja en un conector de 24 posiciones.

## Asignaciones clave de pines del módulo { #key-module-pin-assignments }

![Definición del encabezado de 40 pines de SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>Definición del encabezado de 40 pines</em></div>

<div align="center"><em>Asignaciones clave de pines del módulo</em></div>

<div align="center" markdown>

| Pin del módulo | Señal | Función en la placa |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | Detección de inserción de cargador |
| PA43..PA37 | DB7..DB2 | Datos LCD MCU/8080 |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | Datos de LCD |
| PA06 | DC / QSPI D1 | Datos/comando de LCD |
| PA05 | RD / QSPI D0 | Datos de LCD |
| PA04 | WR / QSPI CLK | Reloj de LCD |
| PA03 | CS / QSPI CS | Selección de chip de LCD |
| PA02 | TE / QSPI TE | Señal de sincronización TE (Tearing Effect) del LCD |
| PA01 | BL_PWM | Control de retroiluminación |
| PA00 | RSTB | Reinicio de LCD |
| PA33 / PA30 | I2C SDA / SCL | Panel táctil |
| PA31 / PA09 | Táctil INT / RST | Panel táctil |
| PA24, PA25, PA28, PA29 | SPI1 | Interfaz de tarjeta TF |
| PA26 | Detección de tarjeta / LED | Función compartida |
| PA20 / PA27 | UART RX/TX | UART de usuario |
| PA18 / PA19 | UART de depuración RX/TX | Descarga y depuración de software |
| PA10 | AU_PA_EN | Habilitación del amplificador de audio |
| MIC_ADC_IN / MIC_BIAS | Micrófono analógico | Entrada de micrófono |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Audio analógico | Entrada del amplificador de altavoz |

</div>

## Notas de compatibilidad de módulo { #module-compatibility-notes }

- SF32LB52-MOD-1 usa el pin 17 como salida de 3,3 V, deshabilitada de forma predeterminada y que debe activarse por software.
- SF32LB52-MOD-A/B usan el pin 17 como entrada de alimentación de 3,3 V.
- SF32LB52-MOD-1 usa el pin 27 como entrada VBAT de 3,2 V a 4,7 V.
- SF32LB52-MOD-A/B usan el pin 27 como entrada de alimentación de 3,3 V.
- En SF32LB52-MOD-1, los umbrales de encendido y apagado de VBAT son 3,58 V y 3,48 V, respectivamente. Para probar la alimentación sin batería, se recomienda aplicar 3,8 V a VBAT.
- PA21 en el pin 62 del módulo solo está disponible en SF32LB52-MOD-A/B. No está conectado en SF32LB52-MOD-1.
- Los pines 62 a 68 del módulo pueden estar conectados internamente a la Flash NOR por defecto. Para usar SDIO externamente, seleccione una variante de módulo sin Flash interna en esos pines.

## Audio { #audio }

La placa incluye un micrófono MEMS y un amplificador de potencia de audio.

- Use la ruta del micrófono en placa para la validación de entrada de audio analógico.
- Use el conector de altavoz para las pruebas de salida de audio.
- Según la nota original de la placa, la salida para el altavoz externo admite hasta 3 W con una carga de 4 Ω.

## Almacenamiento { #storage }

La ranura MicroSD se conecta mediante SPI. Permite validar sistemas de archivos, recursos de imagen, registros y captura de datos antes de pasar a una placa propia.

## Objetivos de compilación del SDK { #sdk-build-targets }

Al compilar con SiFli-SDK, utilice `scons --board=<board_name>` con uno de estos nombres exactos de destino:

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

Son identificadores de destinos de compilación del SDK, no necesariamente los nombres de producto impresos en la placa o el módulo. El índice [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) y el [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) de la rama principal pueden enumerar conjuntos distintos; confirme el destino para la revisión del SDK que utilice.

## Documentos relacionados { #related-documents }

[SF32LB52x Introducción al chip]: ../chips/SF32LB52x.md
[SF32LB52x Guía de diseño de hardware]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[Artículo original de la Wiki de SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[Paquete de diseño]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[Comprar muestras]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Introducción al chip]__
- :fontawesome-solid-file-lines: __[SF32LB52x Guía de diseño de hardware]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[Artículo original de la Wiki de SiFli]__
- :fontawesome-solid-download: __[Paquete de diseño]__
- :fontawesome-solid-cart-shopping: __[Comprar muestras]__

</div>
