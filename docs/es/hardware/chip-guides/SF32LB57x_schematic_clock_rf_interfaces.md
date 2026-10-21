---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de esquemático de reloj, RF e interfaces de usuario de la MCU SF32LB57x: cristales de 48 MHz/32,768 kHz, adaptación RF, pantalla, táctil, audio, cámara y motor."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB57x — Reloj, RF e interfaces de usuario { #sf32lb57x-hardware-design-guide-clock-rf-user-interfaces }

!!! note "Parte de la guía de diseño de hardware SF32LB57x"
    Esta página cubre las secciones 5.3-5.5 de las directrices de diseño esquemático: generación de reloj, RF e interfaces de usuario. Vuelva a [Sistema mínimo y alimentación](SF32LB57x_schematic_system_power.md) o continúe con [Almacenamiento y fabricación](SF32LB57x_schematic_storage_mfg.md).

### 5.3. Generación de reloj { #53-clock-generation }

La generación de reloj abarca el cristal principal de 48 MHz, el cristal RTC de 32,768 kHz y las condiciones de calibración que afectan a la RF, Bluetooth, la precisión del RTC y el funcionamiento de bajo consumo. Tenga presentes los requisitos de selección y disposición de los cristales durante la revisión del esquemático y la colocación en la PCB.

#### 5.3.1. Cristal principal de 48 MHz { #531-48-mhz-main-crystal }

Parámetros recomendados:

<div align="center"><em>Tabla 5.3-1: Parámetros recomendados para el cristal principal de 48 MHz</em></div>

<div align="center" markdown>

| Parámetro | Recomendación |
|:----------|:---------------|
| Capacitancia de carga CL | De 7 pF a 12 pF; se recomienda aproximadamente 8,8 pF |
| Tolerancia de frecuencia | ≤ ±10 ppm |
| ESR | ≤ 30 Ω; se recomiendan aproximadamente 22 Ω |

</div>

La guía fuente indica que reducir la capacitancia `CL` y el ESR disminuye el consumo del cristal. Reserve una huella para un condensador de ajuste en paralelo junto al cristal de 48 MHz; según la guía, no es necesario montarlo cuando `CL` es inferior a 12 pF.

Requisitos de colocación y trazado:

- Coloque el cristal cerca de los pines del chip, preferiblemente dentro de la zona del blindaje metálico.
- Aléjelo del PA, el cargador, la PMU, los convertidores DC/DC, la batería y las pistas digitales de alta velocidad.
- Siempre que sea posible, rútelo en la capa superior con una anchura de 0,1 mm y una longitud de 3 mm a 10 mm. Mantenga al menos 0,15 mm entre las pistas `48M_XI` y `48M_XO`, según la figura de trazado de la guía fuente.
- Respete la zona de exclusión del cristal en la capa superior definida por el diseño de referencia y no enrute señales bajo el cristal. La guía fuente contiene instrucciones contradictorias sobre el cobre de tierra en la capa adyacente; consulte la nota siguiente.
- Use blindaje tridimensional conectado a tierra, pero no acerque demasiado la tierra a las pistas de oscilación.

El rango especificado de capacitancia de carga del cristal de 48 MHz es de 7 pF a 12 pF, con unos 8,8 pF recomendados. Valide el cristal seleccionado con el circuito oscilador en el hardware del producto y confirme el error de frecuencia. Incluya la calibración del cristal en la puesta en marcha de producción; no dé por hecho que el ajuste predeterminado del software sirve para todos los cristales.

#### 5.3.2. Cristal RTC de 32,768 kHz { #532-32768-khz-rtc-crystal }

Parámetros recomendados:

<div align="center"><em>Tabla 5.3-2: Parámetros recomendados para el cristal RTC de 32,768 kHz</em></div>

<div align="center" markdown>

| Parámetro | Recomendación |
|:----------|:---------------|
| Capacitancia de carga CL | 7 pF u 11,5 pF (el valor predeterminado del chip es 11,5 pF; para 7 pF hay que cambiar un registro); se recomiendan 7 pF para reducir el consumo al mínimo |
| Tolerancia de frecuencia | ≤ ±20 ppm |
| ESR | ≤ 80 kΩ; se recomiendan aproximadamente 38 kΩ |

</div>

La guía fuente indica que reducir `CL` y el ESR disminuye el consumo del cristal. El cristal RTC de 32,768 kHz puede usar una capacitancia de carga de 7 pF u 11,5 pF; según la guía, ninguna de estas opciones requiere un condensador de ajuste externo. Para otros valores de capacitancia de carga, mida el circuito y determine la capacitancia de ajuste necesaria.

Requisitos de colocación y trazado:

- Coloque el cristal cerca del chip y mantenga las pistas cortas.
- Use una anchura de pista de 0,1 mm y una longitud máxima de 10 mm. Mantenga al menos 0,15 mm entre `32K_XI` y `32K_XO`, según la figura de trazado de la guía fuente, y añada blindaje tridimensional de tierra.
- Respete la zona de exclusión del cristal en la capa superior definida por el diseño de referencia y no enrute señales bajo el cristal. La guía fuente contiene instrucciones contradictorias sobre el cobre de tierra en la capa adyacente; consulte la nota siguiente.
- Aleje el cristal de la alimentación, RF, USB, SDIO, el reloj de pantalla y el ruido de carga.

<div align="center"><em>Tabla 5.3-3: Cristales recomendados</em></div>

<div align="center" markdown>

| Cristal | Número de pieza | Fabricante | Parámetros principales |
|:--------|:------------|:-------|:---------------|
| 48 MHz | E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 a +8 ppm, CL = 8,8 pF, ESR ≤ 22 Ω, TOPR de -30 a 85 °C, encapsulado 2016. |
| 32,768 kHz | ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR ≤ 70 kΩ, TOPR de -40 a 85 °C, encapsulado 3215. |
| 48 MHz | SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 a +10 ppm, CL = 8,8 pF, ESR ≤ 40 Ω, TOPR de -20 a 75 °C, encapsulado 2016; un ESR mayor aumenta ligeramente el consumo estático. |
| 32,768 kHz | SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR ≤ 70 kΩ, TOPR de -40 a 85 °C, encapsulado 3215. |
| 32,768 kHz | SF32WK32768D71T005 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR ≤ 70 kΩ, TOPR de -40 a 85 °C, encapsulado 3215. |
| 48 MHz | CN4048M000885C822000 | JWT | F0 = 48,000000 MHz, ΔF/F0 = -8 a +8 ppm, CL = 8,8 pF, ESR ≤ 22 Ω, TOPR de -30 a 85 °C, encapsulado 2016. |
| 32,768 kHz | DH2032K76807T2719002 | JWT | F0 = 32,768 kHz, ΔF/F0 = -20 a +20 ppm, CL = 7 pF, ESR ≤ 70 kΩ, TOPR de -40 a 85 °C, encapsulado 3215. |

</div>

La `CL` del cristal de 32,768 kHz debe coincidir con la configuración del registro: para 7 pF, ajuste `PMUC->LXT_CR->CAP_SEL = 0`; para 11,5 pF, ajuste `PMUC->LXT_CR->CAP_SEL = 1`. Confirme este ajuste en el firmware antes de EVT, ya que la mayoría de los cristales recomendados son de 7 pF, mientras que algunos valores predeterminados del firmware pueden corresponder a otra capacitancia de carga.

!!! warning "La guía fuente contiene instrucciones contradictorias sobre el cobre bajo los cristales"
    La guía fuente no es coherente respecto al cobre bajo los cristales: una nota de reloj pide retirar al menos el cobre de tierra de la segunda capa; el apartado de trazado indica una zona de exclusión en la capa adyacente; las vistas en corte de los cristales muestran cobre de tierra en L2 bajo las pistas; y la sección de apilado exige un plano de tierra continuo en L2. No deduzca una única regla a partir de estas indicaciones. Antes de liberar la PCB, confirme el diseño con la última referencia SF32LB57x aprobada.

#### 5.3.3. Salidas de reloj de bajo consumo { #533-low-power-clock-outputs }

En los modos Sleep, DeepSleep, Standby y Hibernate, los pines `PA24` a `PA27` pueden emitir el reloj RC10K o una señal de 32,768 kHz.

En los modos Sleep, DeepSleep y Standby, los pines `PA24` a `PA27` también pueden emitir una señal PWM de hasta 16 kHz generada por LPTIM2.

### 5.4. RF { #54-rf }

#### 5.4.1. Esquemático de RF { #541-rf-schematic }

Requisitos principales del esquemático de RF:

- Reserve huellas para una red de adaptación π en la ruta de la antena, destinadas al filtrado de espurios y al ajuste de la antena.
- El esquemático de referencia muestra posiciones NC en derivación y un condensador en serie de 15 pF / 50 V. El texto fuente también indica que no hace falta añadir componentes de adaptación si la antena ya está adaptada en impedancia. Confirme qué posiciones deben montarse a partir del diseño de la antena y de las mediciones de RF; no trate la configuración ilustrada como universal.
- Coloque la red de adaptación cerca del pin RF del chip, no junto a la antena.
- Coloque el condensador de filtro de `AVDD_BRF` cerca del chip y conecte su tierra directamente a la tierra principal mediante vías cercanas.
- Diseñe la antena, la red de adaptación, la protección ESD de RF y el conector como una única ruta de señal.

![Figura 5.4-1: Esquemático de referencia de RF](../../sf32-products/chips/assets/57x/SF32LB57x-rf-diagram.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Esquemático de referencia de RF</em></div>

#### 5.4.2. Diseño de PCB para RF { #542-rf-pcb }

Requisitos de la PCB:

- Trace la señal RF como una línea no balanceada de 50 Ω.
- Priorice el enrutamiento en la capa superior, con el mínimo de vías y cambios de capa.
- Evite los ángulos agudos y las esquinas de 90 grados.
- Añada cobre de tierra y una valla de vías a ambos lados.
- Mantenga una referencia de tierra continua bajo la pista RF.
- Aleje la RF de los convertidores DC/DC, los cristales, USB, SDIO, los relojes de pantalla, las rutas de alta corriente del cargador y otras zonas ruidosas.

#### 5.4.3. Puesta en marcha y calibración de RF { #543-rf-bring-up-and-calibration }

Verifique el rendimiento de RF mediante mediciones; una conectividad esquemática correcta es solo el punto de partida.

Comprobaciones recomendadas durante la puesta en marcha de RF:

- Compruebe el error de frecuencia y la estabilidad de arranque del cristal de 48 MHz.
- Mediante pruebas conducidas, compruebe la potencia de transmisión, el error de frecuencia, la sensibilidad del receptor y la calidad de modulación.
- Ajuste la red de adaptación π con la carcasa, la batería, el blindaje y la posición de antena definitivos.
- Verifique el rendimiento de RF con la pantalla encendida, durante la carga, mientras funcionan USB/SDIO y la actualización de pantalla, con el motor activo y durante el funcionamiento del audio.
- Asegúrese de que el útil de producción permita calibrar el cristal, realizar pruebas RF básicas y descargar el firmware.

!!! note
    Complete la adaptación de la antena en un hardware cuya estructura se aproxime a la del producto final. Los resultados obtenidos en una placa sin ensamblar normalmente no representan el rendimiento RF del producto terminado.

### 5.5. Interfaces de usuario { #55-user-interfaces }

#### 5.5.1. Pantalla, táctil y retroiluminación { #551-display-touch-and-backlight }

Revise la pantalla, la interfaz táctil y la retroiluminación como un único grupo, ya que durante la puesta en marcha de la placa suelen interactuar la temporización del panel, la secuencia de alimentación, el enrutamiento del FPC, el despertar por tacto, la protección ESD y el ruido de la retroiluminación.

#### 5.5.2. Selección de la interfaz de pantalla { #552-display-interface-selection }

El LCDC del SF32LB57x admite varios tipos de interfaz de pantalla, según el dispositivo concreto.

<div align="center"><em>Tabla 5.5-1: Guía para seleccionar la interfaz de pantalla</em></div>

<div align="center" markdown>

| Interfaz | Aplicación | Consideraciones de hardware |
|:----------|:---------|:---------------|
| SPI / QSPI | Pantallas TFT/AMOLED pequeñas y pantallas para dispositivos vestibles | Requiere pocos pines, pero ofrece un ancho de banda limitado; es adecuada para actualizaciones parciales. |
| 8080 MCU | Paneles de pantalla en paralelo | Ofrece más ancho de banda que las interfaces serie, pero utiliza más pines. |
| RGB / DPI | Paneles de resolución media y alta | Flujo continuo de píxeles, con requisitos estrictos de ancho de banda y temporización. |
| MIPI DSI | AMOLED de alta densidad | Ofrece gran ancho de banda con pocos pines, pero la inicialización y la integridad de señal son más complejas. |
| EPD | Papel electrónico | Tiene una frecuencia de actualización baja y requiere planificar VCOM, PMIC y las formas de onda. |
| JDI | Pantallas de bajo consumo con Memory-in-Pixel | Adecuadas para productos con pantalla siempre activa y legible bajo la luz solar. |

</div>

Consideraciones y ejemplos comunes de pantalla:

- El controlador de pantalla admite SPI de 3 y 4 líneas, Dual SPI, Quad SPI, RGB de 16 bits, MCU 8080 de 16 bits, EPD de 16 bits y JDI serie/paralelo.
- Las profundidades de color admitidas incluyen RGB888, RGB666, RGB565 y RGB111; la resolución máxima puede llegar a 1024 x 1024. Confirme los modos exactos admitidos por el dispositivo seleccionado.
- En proyectos de alta resolución, evalúe cuanto antes el ancho de banda de la interfaz, la RAM de pantalla, el ancho de banda de PSRAM y la estrategia de actualización.
- Si el proyecto no requiere una asignación de pines personalizada, tome como punto de partida un grupo de IO de una configuración del SDK o de un diseño de referencia adaptado a la interfaz del panel. El enrutamiento matricial ofrece flexibilidad, pero usar un grupo de IO compatible con el software reduce los riesgos asociados al desarrollo del controlador y a la puesta en marcha.
- La inicialización del panel, la secuencia de alimentación y el modo de interfaz deben seguir la hoja de datos del fabricante del panel.

<div align="center"><em>Tabla 5.5-2: Puntos de partida para las IO de pantalla</em></div>

<div align="center" markdown>

| Interfaz de pantalla | Punto de partida recomendado |
|:------------------|:---------------------------|
| SPI / QSPI | Priorice los pines dedicados `LCDC1_SPI_*` de la tabla de multiplexación de pines. Si usa señales SPI del LCDC asignadas mediante la matriz, limite el reloj de pantalla a 50 MHz y compruebe la intensidad de excitación. |
| RGB / DPI | Para señales superiores a 30 MHz, use `PA22` a `PA50` para las señales del LCDC asignadas mediante la matriz; `PA52` a `PA54` solo pueden utilizarse para `B1` a `B6`. En diseños más lentos puede utilizarse la asignación matricial tras revisar la temporización. |
| 8080 MCU | En diseños rápidos, aplique la misma regla de selección de pines de alta velocidad que para RGB/DPI; compruebe con el panel el ancho del bus, la temporización y la intensidad de excitación. |
| EPD | Si el bus EPD funciona por encima de 30 MHz, aplique la misma regla de selección de pines de alta velocidad que para RGB/DPI; revise también VCOM y los pines de control del PMIC. |
| JDI | Siga la tabla de asignación de señales JDI del LCDC y, si está disponible, priorice una configuración de panel adaptada al SDK. |
| MIPI DSI | Use la asignación fija de señales DSI del componente seleccionado y del diseño de referencia; verifique con el equipo de software el enrutamiento de carriles y la inicialización del panel. |

</div>

<div align="center"><em>Tabla 5.5-3: Ejemplos de controladores LCD</em></div>

<div align="center" markdown>

| Controlador | Fabricante | Resolución | Tipo | Interfaces habituales |
|:-------|:-------|:-----------|:-----|:-------------------|
| RM69090 | Raydium | 368 x 448 | AMOLED | SPI, Quad SPI, MIPI-DSI |
| RM69330 | Raydium | 454 x 454 | AMOLED | SPI, Quad SPI, 8080 MCU de 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368 x 448 | AMOLED | Quad SPI, MIPI-DSI |
| SH8601A | Shenghe | 454 x 454 | AMOLED | SPI, Quad SPI, 8080 MCU de 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356 x 400 | TFT | Quad SPI |
| GC9C01 | Galaxycore | 360 x 360 | TFT | Quad SPI |
| GC9B71 | Galaxycore | 320 x 380 | TFT | Quad SPI |
| ST77903 | Sitronix | 400 x 400 | TFT | Quad SPI |
| ICNA3311 | Chipone | 454 x 454 | AMOLED | Quad SPI |
| FT2308 | FocalTech | 410 x 494 | AMOLED | Quad SPI |

</div>

Las tablas siguientes muestran la asignación exacta de señales a pines para cada tipo de interfaz de pantalla. Consulte la tabla correspondiente a la interfaz del panel seleccionado.

<div align="center"><em>Tabla 5.5-4: Conexiones de señales de pantalla SPI/QSPI</em></div>

<div align="center" markdown>

| Señal del panel SPI | Señal del 57x | Descripción |
|:------------------|:-----------|:-------------|
| `CSx` | `LCDC1_SPI_CS` | Señal de selección del chip. |
| `WRx_SCL` | `LCDC1_SPI_CLK` | Señal de reloj. |
| `DCx` | `LCDC1_SPI_DIO1` | Señal de selección de datos/comando en modo SPI de 4 hilos; `DATA1` en modo Quad-SPI. |
| `SDI_RDx` | `LCDC1_SPI_DIO0` | Señal de entrada de datos en modo SPI de 3/4 hilos; `DATA0` en modo Quad-SPI. |
| `SDO` | `LCDC1_SPI_DIO0` | Señal de salida de datos en modo SPI de 3/4 hilos; conecte este pin a `SDI_RDx` con una pista corta. |
| `D[0]` | `LCDC1_SPI_DIO2` | `DATA2` en modo Quad-SPI. |
| `D[1]` | `LCDC1_SPI_DIO3` | `DATA3` en modo Quad-SPI. |
| `RESET` | `LCDC1_SPI_RSTB` | Señal de reinicio. |
| `TE` | `LCDC1_SPI_TE` | Señal de efecto de rasgado enviada a la MCU. |

</div>

!!! note
    Priorice los pines dedicados `LCDC1_SPI_*` de Function 1. Si utiliza señales SPI asignadas mediante la matriz (Function index 121-150), limite el reloj a 50 MHz y configure la intensidad de excitación GPIO como `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabla 5.5-5: Conexiones de señales de pantalla RGB</em></div>

<div align="center" markdown>

| Señal del panel RGB888 | Señal del panel RGB565 | Señal del 57x | Descripción |
|:---------------------|:----------------------|:-----------|:-------------|
| CLK | CLK | `LCDC_DPI_CLK` | Señal de reloj. |
| DE | DE | `LCDC_DPI_DE` | Señal de habilitación de datos en modo DE. |
| HSYNC | HSYNC | `LCDC_DPI_HSYNC` | Señal de sincronización horizontal. |
| VSYNC | VSYNC | `LCDC_DPI_VSYNC` | Señal de sincronización vertical. |
| R0 | - | `LCDC_DPI_R0` | Dato rojo 0. |
| R1 | - | `LCDC_DPI_R1` | Dato rojo 1. |
| R2 | - | `LCDC_DPI_R2` | Dato rojo 2. |
| R3 | R0 | `LCDC_DPI_R3` | Dato rojo 3. |
| R4 | R1 | `LCDC_DPI_R4` | Dato rojo 4. |
| R5 | R2 | `LCDC_DPI_R5` | Dato rojo 5. |
| R6 | R3 | `LCDC_DPI_R6` | Dato rojo 6. |
| R7 | R4 | `LCDC_DPI_R7` | Dato rojo 7. |
| G0 | - | `LCDC_DPI_G0` | Dato verde 0. |
| G1 | - | `LCDC_DPI_G1` | Dato verde 1. |
| G2 | G0 | `LCDC_DPI_G2` | Dato verde 2. |
| G3 | G1 | `LCDC_DPI_G3` | Dato verde 3. |
| G4 | G2 | `LCDC_DPI_G4` | Dato verde 4. |
| G5 | G3 | `LCDC_DPI_G5` | Dato verde 5. |
| G6 | G4 | `LCDC_DPI_G6` | Dato verde 6. |
| G7 | G5 | `LCDC_DPI_G7` | Dato verde 7. |
| B0 | - | `LCDC_DPI_B0` | Dato azul 0. |
| B1 | - | `LCDC_DPI_B1` | Dato azul 1. |
| B2 | - | `LCDC_DPI_B2` | Dato azul 2. |
| B3 | B0 | `LCDC_DPI_B3` | Dato azul 3. |
| B4 | B1 | `LCDC_DPI_B4` | Dato azul 4. |
| B5 | B2 | `LCDC_DPI_B5` | Dato azul 5. |
| B6 | B3 | `LCDC_DPI_B6` | Dato azul 6. |
| B7 | B4 | `LCDC_DPI_B7` | Dato azul 7. |

</div>

<div align="center"><em>Tabla 5.5-6: Configuración de modo RGB (asignación de bits LCDC_IFx por modo)</em></div>

<div align="center" markdown>

| Señal LCDC | Modo 0 (RGB565 Conf1) | Modo 1 (RGB565 Conf2) | Modo 2 (RGB565 Conf3) | Modo 3 (RGB666 Conf1) | Modo 4 (RGB666 Conf2) | Modo 5 (RGB888) | Modo 6 (RGB666 sobre bus de 8 bits) | Modo 7 (RGB888 sobre bus de 8 bits) |
|:------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------|:-----------------------------|:-----------------------------|
| `LCDC_IF0` | B0 | B0 | - | B0 | B0 | B0 | R0/G0/B0 | R0/G0/B0 |
| `LCDC_IF1` | B1 | B1 | B0 | B1 | B1 | B1 | R1/G1/B1 | R1/G1/B1 |
| `LCDC_IF2` | B2 | B2 | B1 | B2 | B2 | B2 | R2/G2/B2 | R2/G2/B2 |
| `LCDC_IF3` | B3 | B3 | B2 | B3 | B3 | B3 | R3/G3/B3 | R3/G3/B3 |
| `LCDC_IF4` | B4 | B4 | B3 | B4 | B4 | B4 | R4/G4/B4 | R4/G4/B4 |
| `LCDC_IF5` | G0 | - | B4 | B5 | B5 | B5 | R5/G5/B5 | R5/G5/B5 |
| `LCDC_IF6` | G1 | - | - | G0 | - | B6 | - | R6/G6/B6 |
| `LCDC_IF7` | G2 | - | - | G1 | - | B7 | - | R7/G7/B7 |
| `LCDC_IF8` | G3 | G0 | G0 | G2 | G0 | G0 | - | - |
| `LCDC_IF9` | G4 | G1 | G1 | G3 | G1 | G1 | - | - |
| `LCDC_IF10` | G5 | G2 | G2 | G4 | G2 | G2 | - | - |
| `LCDC_IF11` | R0 | G3 | G3 | G5 | G3 | G3 | - | - |
| `LCDC_IF12` | R1 | G4 | G4 | R0 | G4 | G4 | - | - |
| `LCDC_IF13` | R2 | G5 | G5 | R1 | G5 | G5 | - | - |
| `LCDC_IF14` | R3 | - | - | R2 | - | G6 | - | - |
| `LCDC_IF15` | R4 | - | - | R3 | - | G7 | - | - |
| `LCDC_IF16` | - | R0 | - | R4 | R0 | R0 | - | - |
| `LCDC_IF17` | - | R1 | R0 | R5 | R1 | R1 | - | - |
| `LCDC_IF18` | - | R2 | R1 | - | R2 | R2 | - | - |
| `LCDC_IF19` | - | R3 | R2 | - | R3 | R3 | - | - |
| `LCDC_IF20` | - | R4 | R3 | - | R4 | R4 | - | - |
| `LCDC_IF21` | - | - | R4 | - | R5 | R5 | - | - |
| `LCDC_IF22` | - | - | - | - | - | R6 | - | - |
| `LCDC_IF23` | - | - | - | - | - | R7 | - | - |

</div>

`LCDC_IF24` a `LCDC_IF29` no se utilizan en ninguno de los modos RGB.

<div align="center"><em>Tabla 5.5-7: Conexiones de señales de pantalla MCU8080</em></div>

<div align="center" markdown>

| Señal del panel MCU8080 de 16 bits | Señal del panel MCU8080 de 8 bits | Señal del 57x | Descripción |
|:------------------------------|:------------------------------|:------------|:-------------|
| `CSX` | `CSX` | `LCDC_8080_CS` | Selección del chip. |
| `WR` | `WR` | `LCDC_8080_WR` | Señal de escritura para enviar datos. |
| `DC` | `DC` | `LCDC_8080_DC` | Selección entre datos y comandos de pantalla. |
| `RD` | `RD` | `LCDC_8080_RD` | Señal de lectura. |
| `D[0]` | `D[0]` | `LCDC_8080_DIO0` | Dato 0. |
| `D[1]` | `D[1]` | `LCDC_8080_DIO1` | Dato 1. |
| `D[2]` | `D[2]` | `LCDC_8080_DIO2` | Dato 2. |
| `D[3]` | `D[3]` | `LCDC_8080_DIO3` | Dato 3. |
| `D[4]` | `D[4]` | `LCDC_8080_DIO4` | Dato 4. |
| `D[5]` | `D[5]` | `LCDC_8080_DIO5` | Dato 5. |
| `D[6]` | `D[6]` | `LCDC_8080_DIO6` | Dato 6. |
| `D[7]` | `D[7]` | `LCDC_8080_DIO7` | Dato 7. |
| `D[8]` | - | `LCDC_8080_DIO8` | Dato 8 (solo en modo de 16 bits). |
| `D[9]` | - | `LCDC_8080_DIO9` | Dato 9 (solo en modo de 16 bits). |
| `D[10]` | - | `LCDC_8080_DIO10` | Dato 10 (solo en modo de 16 bits). |
| `D[11]` | - | `LCDC_8080_DIO11` | Dato 11 (solo en modo de 16 bits). |
| `D[12]` | - | `LCDC_8080_DIO12` | Dato 12 (solo en modo de 16 bits). |
| `D[13]` | - | `LCDC_8080_DIO13` | Dato 13 (solo en modo de 16 bits). |
| `D[14]` | - | `LCDC_8080_DIO14` | Dato 14 (solo en modo de 16 bits). |
| `D[15]` | - | `LCDC_8080_DIO15` | Dato 15 (solo en modo de 16 bits). |
| `RESET` | `RESET` | `LCDC_8080_RSTB` | Reinicio. |
| `TE` | `TE` | `LCDC_8080_TE` | Señal de efecto de rasgado enviada a la MCU. |

</div>

<div align="center"><em>Tabla 5.5-8: Conexiones de señales de pantalla EPD</em></div>

<div align="center" markdown>

| Señal del panel EPD de 16 bits | Señal del panel EPD de 8 bits | Señal del 57x | Descripción |
|:--------------------------|:--------------------------|:------------|:-------------|
| `CLK` | `CLK` | `LCDC_TCON_SDCLK` | Reloj del controlador de fuente. |
| `CKV`/`CPV` | `CKV`/`CPV` | `LCDC_TCON_GDCLK` | Reloj del controlador de puerta. |
| `SPH` | `SPH` | `LCDC_TCON_SDSTL` | Pulso de inicio del controlador de fuente. |
| `SPV`/`STV` | `SPV`/`STV` | `LCDC_TCON_GDSP` | Pulso de inicio del controlador de puerta. |
| `LE` | `LE` | `LCDC_TCON_SDLE` | Habilitación del latch del controlador de fuente. |
| `OE` | `OE` | `LCDC_TCON_SDOE` | Habilitación de salida del controlador de fuente. |
| `D0` | `D0` | `LCDC_TCON_SDAT0` | Bit 0 de datos del controlador de fuente. |
| `D1` | `D1` | `LCDC_TCON_SDAT1` | Bit 1 de datos del controlador de fuente. |
| `D2` | `D2` | `LCDC_TCON_SDAT2` | Bit 2 de datos del controlador de fuente. |
| `D3` | `D3` | `LCDC_TCON_SDAT3` | Bit 3 de datos del controlador de fuente. |
| `D4` | `D4` | `LCDC_TCON_SDAT4` | Bit 4 de datos del controlador de fuente. |
| `D5` | `D5` | `LCDC_TCON_SDAT5` | Bit 5 de datos del controlador de fuente. |
| `D6` | `D6` | `LCDC_TCON_SDAT6` | Bit 6 de datos del controlador de fuente. |
| `D7` | `D7` | `LCDC_TCON_SDAT7` | Bit 7 de datos del controlador de fuente. |
| `D8` | `D8` | `LCDC_TCON_SDAT8` | Bit 8 de datos del controlador de fuente. |
| `D9` | - | `LCDC_TCON_SDAT9` | Bit 9 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D10` | - | `LCDC_TCON_SDAT10` | Bit 10 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D11` | - | `LCDC_TCON_SDAT11` | Bit 11 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D12` | - | `LCDC_TCON_SDAT12` | Bit 12 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D13` | - | `LCDC_TCON_SDAT13` | Bit 13 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D14` | - | `LCDC_TCON_SDAT14` | Bit 14 de datos del controlador de fuente (solo en modo de 16 bits). |
| `D15` | - | `LCDC_TCON_SDAT15` | Bit 15 de datos del controlador de fuente (solo en modo de 16 bits). |
| `GMODE` | `GMODE` | Cualquier GPIO | Selección del modo de salida del controlador de puerta. |
| `VPOS` | `VPOS` | - | Señal del PMIC de EPD; alimentación positiva del controlador de fuente. |
| `VNEG` | `VNEG` | - | Señal del PMIC de EPD; alimentación negativa del controlador de fuente. |
| `VGH` | `VGH` | - | Señal del PMIC de EPD; alimentación positiva del controlador de puerta. |
| `VGL` | `VGL` | - | Señal del PMIC de EPD; alimentación negativa del controlador de puerta. |
| `VCOM` | `VCOM` | - | Señal del PMIC de EPD; conexión al electrodo común. |
| `WAKEUP` | `WAKEUP` | Cualquier GPIO | Señal de activación del PMIC de EPD. |
| `PWRUP` | `PWRUP` | Cualquier GPIO | Encendido del PMIC de EPD. |
| `I2C_SDA` | `I2C_SDA` | Cualquier GPIO | Datos I2C del PMIC de EPD. |
| `I2C_SCL` | `I2C_SCL` | Cualquier GPIO | Reloj I2C del PMIC de EPD. |
| `PWRCOM` | `PWRCOM` | Cualquier GPIO | `VCOM_CTRL` del PMIC de EPD; habilitación de VCOM. |
| `GOOD` | `GOOD` | Cualquier GPIO | Salida de alimentación correcta (power-good) del PMIC de EPD. |

</div>

<div align="center"><em>Tabla 5.5-9: Conexiones de señales de pantalla JDI paralela</em></div>

<div align="center" markdown>

| Señal del panel JDI paralelo | Señal del 57x | Descripción |
|:----------------------------|:------------|:-------------|
| `VST`/`GSP` | `LCDC_JDI_VST` | Señal de inicio del controlador vertical. |
| `ENB`/`GEN` | `LCDC_JDI_ENB` | Señal de habilitación de escritura de la memoria de píxeles. |
| `FRP`/`VA` | `#LPTIM2_OUTB` | Señal de excitación del cristal líquido (píxel «apagado»). |
| `HST`/`BSP` | `LCDC_JDI_HST` | Señal de inicio del controlador horizontal. |
| `R1` | `LCDC_JDI_R1` | Datos de imagen rojos (píxeles impares). |
| `G1` | `LCDC_JDI_G1` | Datos de imagen verdes (píxeles impares). |
| `B1` | `LCDC_JDI_B1` | Datos de imagen azules (píxeles impares). |
| `VCOM` | `#LPTIM2_OUT` | Señal de excitación del electrodo común. |
| `B2` | `LCDC_JDI_B2` | Datos de imagen azules (píxeles pares). |
| `G2` | `LCDC_JDI_G2` | Datos de imagen verdes (píxeles pares). |
| `R2` | `LCDC_JDI_R2` | Datos de imagen rojos (píxeles pares). |
| `HCK`/`BCK` | `LCDC_JDI_HCK` | Reloj de desplazamiento del controlador horizontal. |
| `XFRP`/`VB` | `#LPTIM2_OUT` | Señal de excitación del cristal líquido (píxel «encendido»). |
| `XRST`/`INTB` | `LCDC_JDI_XRST` | Señal de reinicio de los controladores horizontal y vertical. |
| `VCK`/`GCK` | `LCDC_JDI_VCK` | Reloj de desplazamiento del controlador vertical. |

</div>

<div align="center"><em>Tabla 5.5-10: Conexiones de señales de pantalla JDI serie</em></div>

<div align="center" markdown>

| Señal del panel JDI serie | Señal del 57x | Descripción |
|:--------------------------|:------------|:-------------|
| `SCLK` | `LCDC_JDI_SCLK` | Señal de reloj serie. |
| `SI` | `LCDC_JDI_SO` | Señal de entrada de datos serie. |
| `SCS` | `LCDC_JDI_SCS` | Señal de selección del chip. |
| `EXTCOMIN` | `LCDC_JDI_EXTCOMIN` | Entrada de polaridad de inversión COM. |
| `DISP` | `LCDC_JDI_DISP` | Señal de encendido/apagado de la pantalla. |

</div>

!!! note
    Selección de GPIO para RGB, MCU8080 y EPD: por debajo de 30 MHz, cualquier pin puede configurarse para la señal LCDC correspondiente. Por encima de 30 MHz, las señales LCDC asignadas mediante la matriz deben usar `PA22` a `PA50`; `PA52` a `PA54` solo pueden transportar `B1` a `B6`. En todos los casos, configure la intensidad de excitación GPIO como `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabla 5.5-11: Conexiones de señales táctiles y de retroiluminación</em></div>

<div align="center" markdown>

| Señal del panel CTP | Señal del 57x | Descripción |
|:--------------------|:------------|:-------------|
| Interrupción | Cualquier GPIO | Señal de interrupción del estado táctil (con capacidad de activación). |
| `I2C1_SCL` | Cualquier GPIO | Señal de reloj I2C de la pantalla táctil. |
| `I2C1_SDA` | Cualquier GPIO | Señal de datos I2C de la pantalla táctil. |
| `BL_PWM` | Cualquier GPIO | Señal PWM de control de la retroiluminación. |
| Reinicio | Cualquier GPIO | Señal de reinicio. |

</div>

#### 5.5.3. Directrices para pantalla y táctil { #553-display-and-touch-guidelines }

- Controle por separado la alimentación de la pantalla y de la retroiluminación; déjelas apagadas al encender, salvo que el producto requiera lo contrario.
- Para relojes de pantalla de alta velocidad, reserve una resistencia en serie y, opcionalmente, una huella para un condensador en derivación NC con el fin de ajustar las emisiones EMI.
- Mantenga el FPC, el conector de pantalla y las pistas táctiles alejados de la zona de la antena RF.
- Si se requiere despertar por tacto, conecte INT táctil a una GPIO compatible con activación.
- Haga coincidir los dominios de tensión de IO de la pantalla, el circuito integrado táctil y la MCU.
- Añada protección ESD a las interfaces de pantalla y táctil expuestas al exterior.
- Priorice los grupos de pines dedicados para las señales de pantalla SPI/QSPI. Para RGB, 8080, EPD y otras interfaces paralelas de alta velocidad, seleccione grupos adecuados para salidas rápidas y mantenga la coherencia de temporización en el diseño.
- Si SPI/QSPI usa enrutamiento matricial, limite el reloj a 50 MHz o menos y configure la intensidad de excitación GPIO como `DS1 = 0, DS0 = 1`.
- Para señales RGB, MCU8080 y EPD por encima de 30 MHz, priorice el enrutamiento matricial en `PA22` a `PA50`; `PA52` a `PA54` solo pueden transportar `B1` a `B6`.

#### 5.5.4. Secuencia de puesta en marcha de la pantalla { #554-display-bring-up-sequence }

Ponga en marcha la pantalla por etapas para no introducir demasiadas variables a la vez:

1. Compruebe la alimentación de la pantalla, el reinicio, la retroiluminación/habilitación y la lectura del ID del panel.
2. Muestre colores sólidos a la velocidad de interfaz estable más baja; confirme el orden RGB, la profundidad de color y la dirección de barrido.
3. Compruebe las ventanas de actualización parcial, la señal TE, la sincronización de cuadros o el comportamiento de los modos de comandos/vídeo.
4. Aumente gradualmente la velocidad de la interfaz y, después, añada LVGL, ePicasso, DMA y la atenuación de la retroiluminación.
5. Por último, valide el reposo, la activación, el apagado/encendido de pantalla, la conexión/desconexión del cargador y el funcionamiento con Bluetooth conectado.

Ante ruido visual, tearing, colores incorrectos o fallos intermitentes de actualización, compruebe primero la inicialización del panel, la temporización de la interfaz, el formato de píxel, la ventana de actualización, la coherencia de caché y la integridad de señal del FPC.

#### 5.5.5. Audio { #555-audio }

Revise el audio como un subsistema sensible al ruido: compruebe conjuntamente la polarización del micrófono, las referencias de audio, las entradas analógicas, las salidas DAC, los relojes de audio digital, el control del PA externo y la acústica de la carcasa.

SF32LB57x dispone de dos entradas ADC analógicas, cada una compatible con entrada no balanceada o diferencial; una salida DAC analógica diferencial que requiere un PA externo para accionar un altavoz o unos auriculares; y dos interfaces de micrófono PDM que admiten hasta cuatro micrófonos digitales en total.

#### 5.5.6. Entrada de audio analógica { #556-analog-audio-input }

Directrices:

- Coloque los condensadores de desacoplo de MIC_BIAS, AUD_VREF y AVDD33_AUD cerca del chip.
- Añada un condensador de bloqueo de CC a la entrada de micrófono analógica; se recomiendan 2,2 µF o más.
- Coloque los componentes de entrada analógica cerca de los pines del chip.
- Mantenga cortas y apantalladas las pistas de ADCP y otras señales analógicas, y aléjelas de las fuentes de ruido.
- Si se usa una GPIO multiplexada como entrada analógica, configure el pin en alta impedancia según corresponda.

<div align="center"><em>Tabla 5.5-12: Conexiones de señales de audio</em></div>

<div align="center" markdown>

| Señal de audio | Señal/pin del 57x | Notas |
|:-------------|:-----------------|:------|
| `MIC_BIAS` | `PA56` | Alimentación de polarización del micrófono. |
| `ADC1P` | `PA55` | Entrada de micrófono no balanceada o entrada diferencial positiva. |
| `ADC1N` | `PA09` | Entrada diferencial negativa. |
| `ADC2P` | `PA10` | Entrada de micrófono no balanceada o entrada diferencial positiva. |
| `ADC2N` | `PA11` | Entrada diferencial negativa. |
| `PDM1_CLK` / `PDM1_DATA` | Cualquier GPIO mediante enrutamiento matricial | Reloj y datos de la interfaz PDM 1. |
| `PDM2_CLK` / `PDM2_DATA` | Cualquier GPIO mediante enrutamiento matricial | Reloj y datos de la interfaz PDM 2. |
| `DAC1P` | `DACP` | Lado positivo de la salida de audio analógica diferencial. |
| `DAC1N` | `DACN` | Lado negativo de la salida de audio analógica diferencial. |

</div>

![Figura 5.5-1: Circuito de referencia para entrada analógica de micrófono no balanceada](../../sf32-products/chips/assets/57x/SF32LB57x-Analog-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de referencia para entrada analógica de micrófono no balanceada</em></div>

El circuito de referencia muestra cada micrófono polarizado mediante una resistencia de 1 kΩ, con desacoplo de polarización de 4,7 µF, un condensador de entrada en serie de 2,2 µF y un condensador de 10 nF desde la entrada ADC a tierra. Son valores del circuito de referencia ilustrado; verifíquelos con el micrófono y el diseño de entrada analógica seleccionados.

![Figura 5.5-2: Circuito de referencia para entrada de micrófono digital PDM](../../sf32-products/chips/assets/57x/SF32LB57x-PDM-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito de referencia para entrada de micrófono digital PDM</em></div>

El dibujo de referencia conecta dos micrófonos a cada interfaz PDM y comparte sus líneas de reloj y datos. Los pines `SELECT` se conectan a niveles distintos para separar los canales izquierdo y derecho; cada micrófono tiene un condensador local de desacoplo de alimentación de 100 nF. El dibujo llama a las redes de datos `PDM1_DAT` y `PDM2_DAT`, mientras que la tabla de señales usa `PDM1_DATA` y `PDM2_DATA`; verifique los nombres exactos de pines/matriz del dispositivo elegido.

#### 5.5.7. Salida de audio analógica { #557-analog-audio-output }

Directrices:

- Enrute DACP/DACN como un par diferencial.
- Mantenga el par corto, iguale la longitud de las pistas y aléjelo de RF, DC/DC, USB, SDIO y los relojes de pantalla.
- Coloque las redes RC de adaptación de salida cerca del chip.
- Mantenga la capacitancia parásita dentro de los límites requeridos para audio.
- Mantenga limpias y cortas las rutas de alimentación y referencia de audio.

Siga el circuito recomendado de la Figura 5.5-3. El filtro diferencial paso bajo dentro del recuadro discontinuo debe colocarse cerca de los pines del chip para suprimir las interferencias de alta frecuencia y mejorar la relación señal/ruido de la salida de audio.

![Figura 5.5-3: Circuito de referencia de salida PA para audio analógico](../../sf32-products/chips/assets/57x/SF32LB57x-DAC-PA.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito de referencia de salida PA para audio analógico</em></div>

La etapa NS4150B ilustrada usa una alimentación de +5 V, condensadores de acoplamiento DAC de 100 nF, resistencias de entrada de 43,2 kΩ y PA51 para habilitar el amplificador, con una resistencia de pull-down de 5,1 MΩ. El dibujo indica 3 mA de corriente estática del amplificador, 0,1 µA en apagado y 0,6 µA por el pull-down. Son valores del circuito de ejemplo, no especificaciones universales de los PA; verifíquelos con el amplificador seleccionado y los requisitos del sistema.

#### 5.5.8. Audio digital { #558-digital-audio }

Para I2S y PDM:

- Haga coincidir la tensión de IO del periférico.
- Compruebe la longitud de las pistas de reloj, la diafonía y la continuidad de la referencia de tierra.
- Revise la secuencia de alimentación de los micrófonos, el códec, el PA y la MCU.
- Asegúrese de que los periféricos de audio digital entren en un estado seguro durante el reposo.

#### 5.5.9. Validación de audio { #559-audio-validation }

Los problemas de audio suelen involucrar simultáneamente el hardware, la carcasa, la ganancia de software y el ruido de alimentación. Valide:

- El ruido en reposo, durante la grabación y la reproducción, y durante la carga.
- La diafonía mientras se actualiza la pantalla, transmite Bluetooth, vibra el motor, USB está conectado y SDIO está activo.
- La tensión de polarización del micrófono, la polaridad y capacidad del condensador de bloqueo de CC y el rango de modo común de entrada.
- El nivel de salida diferencial DACP/DACN, la adaptación de carga y el rango de entrada del PA externo.
- La frecuencia de reloj PDM/I2S, la asignación de canales y la configuración de la frecuencia de muestreo.

#### 5.5.10. Cámara { #5510-camera }

La interfaz de cámara admite DVP de hasta 16 bits, SPI con 2 líneas de datos y QSPI con 4 líneas de datos.

Directrices:

- Confirme el ancho de la interfaz, el reloj, las señales de sincronización, las líneas de datos y la configuración del multiplexor de pines.
- Permita que la MCU controle la alimentación, el reinicio, PWDN y el reloj de la cámara.
- Mantenga agrupadas las pistas de datos y de reloj de la cámara, con longitudes coherentes, y aléjelas de las señales RF y analógicas.
- Proporcione una referencia de tierra continua para las rutas de cámara de alta velocidad.
- Añada protección ESD al conector de cámara o al FPC cuando sea necesario.

Secuencia recomendada para poner en marcha la cámara:

- Primero confirme la alimentación, el reinicio, PWDN, MCLK y la ruta de control I2C/SPI de la cámara.
- Lea el ID del sensor y compruebe la tabla de inicialización y el formato de salida.
- Use un modo de baja resolución y baja frecuencia de cuadros para validar PCLK, VSYNC, HSYNC/HREF y la asignación de las líneas de datos.
- Aumente la resolución y la frecuencia de cuadros solo cuando la ruta básica sea estable; después, pruebe junto con la actualización de pantalla, las escrituras en almacenamiento y la conexión Bluetooth.

<div align="center"><em>Tabla 5.5-13: Conexiones de cámara para sensores de ejemplo</em></div>

<div align="center" markdown>

| GC032A SPI4 | GC032A DVP8 | GC2145 DVP8 | OV2640 DVP10 | Señal del 57x | Descripción |
|:------------|:------------|:------------|:--------------|:-----------|:------------|
| `SBDA` | `SBDA` | `SIO-D` | `SIO-D` | Cualquier GPIO | Señal de datos I2C. |
| `SBCL` | `SBCL` | `SIO-C` | `SIO-C` | Cualquier GPIO | Señal de reloj I2C. |
| `RESET` | `RESET` | `RESET` | `RESET` | Cualquier GPIO | Salida de reinicio. |
| NC | `VSYNC` | `VSYNC` | `VSYNC` | `DCMI_VSYNC` | Entrada de sincronización vertical. |
| `PWDN` | `PWDN` | `PWDN` | `PWDN` | Cualquier GPIO | Salida de apagado (activa en nivel alto). |
| NC | `HSYNC` | `HREF` | `HREF` | `DCMI_HSYNC` | Entrada de sincronización horizontal. |
| NC | `D7` | `D7` | `Y9` | `DCMI_DI7` | Entrada del bit [7] del puerto de vídeo YUV/RGB. |
| `MCLK` | `MCLK` | `MCLK` | `MCLK` | Cualquier GPIO (GPTIM) | Salida de reloj del sistema. |
| NC | `D6` | `D6` | `Y8` | `DCMI_DI6` | Entrada del bit [6] del puerto de vídeo YUV/RGB. |
| NC | `D5` | `D5` | `Y7` | `DCMI_DI5` | Entrada del bit [5] del puerto de vídeo YUV/RGB. |
| `SCK` | `PCLK`/`SCK` | `PCLK` | `PCLK` | `DCMI_CLK` | Entrada de reloj de píxel. |
| NC | `D4` | `D4` | `Y6` | `DCMI_DI4` | Entrada del bit [4] del puerto de vídeo YUV/RGB. |
| `SD0` | `D0` | `D0` | `Y2` | `DCMI_DI0` | Entrada del bit [0] del puerto de vídeo YUV/RGB. |
| `SD3` | `D3` | `D3` | `Y5` | `DCMI_DI3` | Entrada del bit [3] del puerto de vídeo YUV/RGB. |
| `SD1` | `D1` | `D1` | `Y3` | `DCMI_DI1` | Entrada del bit [1] del puerto de vídeo YUV/RGB. |
| `SD2` | `D2` | `D2` | `Y4` | `DCMI_DI2` | Entrada del bit [2] del puerto de vídeo YUV/RGB. |
| NC | NC | NC | `Y1` | NC | No conectado para este sensor. |
| NC | NC | NC | `Y0` | NC | No conectado para este sensor. |

</div>

Para cámaras DVP de 10 bits, use un cableado de 8 bits si escasean las GPIO; conecte todos los bits de datos únicamente cuando el diseño disponga de suficientes GPIO.

#### 5.5.11. Botones y motor { #5511-buttons-and-motor }

- El botón de encendido/reinicio debe utilizar `PA34`, activo en nivel alto; el pin está normalmente a nivel bajo y pasa a nivel alto al pulsar el botón. `PA34` admite un reinicio por hardware al mantener el botón pulsado durante 10 segundos. La resistencia de pull-down de 10 kΩ debe colocarse en la placa principal.
- En diseños de botones GPADC con divisor resistivo, distinga los botones por la tensión del divisor y coloque cerca del pin un condensador de filtro de 0,1 µF a tierra para mejorar la precisión del muestreo.
- La escalera de referencia muestra resistencias de botón de 1,1 kΩ, 2,8 kΩ y 5,1 kΩ, además de un pull-down de 10 kΩ y un condensador de filtro de 100 nF. Son valores del circuito de referencia; compruebe los umbrales ADC con la alimentación y las tolerancias de resistencia elegidas.
- Añada protección ESD para los botones externos.

![Figura 5.5-4: Circuito de referencia para el botón de encendido y el botón GPADC](../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png){ width="80%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito de referencia para el botón de encendido y el botón GPADC</em></div>

Use el circuito de referencia del motor de vibración SF32LB57x para implementar la respuesta háptica. En productos de bajo consumo, se recomienda que la alimentación del motor pueda conmutarse y que el pin PWM/de control no entre en conflicto con los requisitos de arranque, pantalla, almacenamiento o depuración.
