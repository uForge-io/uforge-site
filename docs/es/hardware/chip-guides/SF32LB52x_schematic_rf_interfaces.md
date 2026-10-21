---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de diseño esquemático de RF e interfaces de usuario para la MCU SF32LB52x: adaptación de antena, pantalla, audio, botones y motor vibrador."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB52x — RF e interfaces de usuario { #sf32lb52x-hardware-design-guide-rf-user-interfaces }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página cubre las secciones 5.4-5.5 de las directrices de diseño esquemático: RF e interfaces de usuario. Vuelva a [Sistema mínimo, alimentación y reloj](SF32LB52x_schematic_design.md), continúe con [Almacenamiento y fabricación](SF32LB52x_schematic_storage_mfg.md) o consulte la [Lista de comprobación del esquemático](SF32LB52x_schematic_checklist.md) para revisar cada punto.

### 5.4. RF { #54-rf }

#### 5.4.1. Esquemático de RF y recorrido de antena { #541-rf-schematic-and-antenna-path }

**Resumen rápido**

- Diseñe el recorrido de la antena como una pista de impedancia controlada de 50 Ω.
- Reserve espacio para una red de adaptación π aunque la antena seleccionada ya esté adaptada.
- Mantenga corto y apantallado el recorrido de RF, y sepárelo de las fuentes de ruido del cristal, DC/DC, pantalla y cargador.

**Objetivo de diseño**

Maximice la sensibilidad Bluetooth y el rendimiento radiado manteniendo el control de impedancia, reduciendo las discontinuidades y reservando suficiente flexibilidad de adaptación para el ajuste final de la antena.

La impedancia característica de la pista de RF es de 50 Ω. Si la antena ya está adaptada, no se necesitan componentes de RF adicionales; aun así, se recomienda reservar una red de adaptación tipo π para filtrar emisiones espurias o ajustar la antena.

![Figura 5.4-1: Esquemático del circuito de RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Esquemático del circuito de RF</em></div>

La figura 5.4-1 muestra un condensador en serie de 15 pF y 50 V (C0323); las posiciones en derivación C0318 y C0319 están marcadas como NF (sin montar). Son valores de referencia, no una adaptación válida para cualquier antena. Coloque la red cerca del pin de RF del chip y determine su montaje final a partir de mediciones del producto ensamblado.

#### 5.4.2. Revisión y ajuste de RF { #542-rf-review-and-tuning }

**Errores frecuentes en RF**

- Colocar la red de adaptación junto a la antena en vez de cerca del pin de RF del chip.
- Hacer pasar la señal de RF por vías innecesarias o curvas pronunciadas.
- Compartir retornos de masa ruidosos con los circuitos DC/DC, de pantalla, USB o del cargador.
- No reservar espacio para la red de adaptación y quedarse sin una forma práctica de ajustar la antena.

**Lista de comprobación de RF**

- [ ] Se ha acordado con el fabricante de PCB el objetivo de impedancia de la pista de RF.
- [ ] Se ha reservado una red de adaptación π y se ha colocado cerca del chip.
- [ ] Se han revisado la barrera de vías de masa y la zona de exclusión de RF.
- [ ] Prevea el acceso necesario para ajustar la antena y realizar las pruebas de certificación antes de cerrar el diseño de la carcasa.

### 5.5. Interfaces de usuario { #55-user-interfaces }

#### 5.5.1. Pantalla { #551-display }

**Resumen rápido**

- Las interfaces admitidas incluyen SPI, Dual-SPI, Quad-SPI y JDI serie; EPD está disponible en las variantes compatibles con alimentación externa regulada.
- La resolución máxima documentada de pantalla es de 512 x 512.
- Revise en conjunto el reinicio, TE, PWM de retroiluminación, I2C táctil, interrupción táctil y secuencia de alimentación de la pantalla.

**Objetivo de diseño**

Seleccione una interfaz de pantalla que cumpla los objetivos de ancho de banda y consumo, y que mantenga el comportamiento de activación, reinicio, retroiluminación y respuesta táctil tanto en funcionamiento normal como en estados de bajo consumo.

El chip admite interfaces SPI de 3 y 4 líneas, SPI con dos y cuatro líneas de datos, y JDI serie. Ofrece profundidades de color de 16,7 millones (RGB888), 262 mil (RGB666), 65 mil (RGB565) y 8 colores (RGB111), con una resolución máxima de 512x512.

Modelos de controladores LCD compatibles:

<div align="center"><em>Tabla 5.5-1: Lista de controladores LCD compatibles</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Resolución | Tipo | Interfaz |
|:---|:---|:---|:---|:---|
| RM69090 | Raydium | 368x448 | AMOLED | SPI de 3/4 líneas, SPI con dos/cuatro líneas de datos, MIPI-DSI |
| RM69330 | Raydium | 454x454 | AMOLED | SPI de 3/4 líneas, SPI con dos/cuatro líneas de datos, bus MCU 8080 de 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368x448 | AMOLED | SPI con cuatro líneas de datos, MIPI-DSI |
| SH8601A | Shine World Technology | 454x454 | AMOLED | SPI de 3/4 líneas, SPI con dos/cuatro líneas de datos, bus MCU 8080 de 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356x400 | TFT | SPI con cuatro líneas de datos |
| GC9C01 | Galaxycore | 360x360 | TFT | SPI con cuatro líneas de datos |
| GC9B71 | Galaxycore | 320x380 | TFT | SPI con cuatro líneas de datos |
| ST77903 | Sitronix | 400x400 | TFT | SPI con cuatro líneas de datos |
| ICNA3311 | Chipone | 454x454 | AMOLED | SPI con cuatro líneas de datos |
| FT2308 | FocalTech | 410x494 | AMOLED | SPI con cuatro líneas de datos |

</div>

!!! note "Las interfaces del controlador de pantalla no son las capacidades de la MCU"
    La tabla 5.5-1 enumera las interfaces que ofrecen los controladores LCD, no interfaces que estén todas disponibles en SF32LB52x. Que un controlador admita MIPI-DSI o un bus MCU 8080 de 8 bits no demuestra que la MCU admita esa interfaz. Elija una interfaz compatible tanto con el modelo exacto de la MCU como con el controlador.

##### 5.5.1.1. Interfaz de pantalla SPI/QSPI { #5511-spiqspi-display-interface }

<div align="center"><em>Tabla 5.5-2: Conexiones de señales SPI/QSPI</em></div>

<div align="center" markdown>

| Señal SPI | Pin | Descripción |
|:---|:---|:---|
| CSx | PA03 | Selección de chip |
| WRx_SCL | PA04 | Reloj |
| DCx | PA06 | Datos/comando en SPI de 4 líneas; dato 1 en Quad-SPI |
| SDI_RDx | PA05 | Entrada de datos en SPI de 3/4 líneas; dato 0 en Quad-SPI |
| SDO | PA05 | Salida de datos en SPI de 3/4 líneas; conectar en corto con SDI_RDx |
| D[0] | PA07 | Dato 2 en Quad-SPI |
| D[1] | PA08 | Dato 3 en Quad-SPI |
| RESET | PA00 | Reinicio de pantalla |
| TE | PA02 | Señal de efecto de desgarro (tearing effect) hacia la MCU |

</div>

##### 5.5.1.2. Interfaz de pantalla JDI { #5512-jdi-display-interface }

!!! important "Terminología JDI en la fuente"
    Las notas de aplicación originales describen JDI serie en sus resúmenes de capacidades, pero identifican la siguiente tabla de pines como JDI paralelo. Aquí se conservan las asignaciones de la fuente. Antes de cerrar el esquemático, confirme el modo JDI previsto, los requisitos del panel y la compatibilidad del modelo exacto de la MCU. No considere intercambiables las interfaces serie y paralela.

<div align="center"><em>Tabla 5.5-3: Conexiones de señales JDI paralelas</em></div>

<div align="center" markdown>

| Señal JDI | I/O | Descripción |
|:---|:---|:---|
| JDI_VCK | PA39 | Reloj de desplazamiento del controlador vertical |
| JDI_VST | PA08 | Señal de inicio del controlador vertical |
| JDI_XRST | PA40 | Reinicio de los controladores horizontal y vertical |
| JDI_HCK | PA41 | Reloj de desplazamiento del controlador horizontal |
| JDI_HST | PA06 | Señal de inicio del controlador horizontal |
| JDI_ENB | PA07 | Habilitación de escritura de la memoria de píxeles |
| JDI_R1 | PA05 | Datos de imagen rojos (píxeles impares) |
| JDI_R2 | PA42 | Datos de imagen rojos (píxeles pares) |
| JDI_G1 | PA04 | Datos de imagen verdes (píxeles impares) |
| JDI_G2 | PA43 | Datos de imagen verdes (píxeles pares) |
| JDI_B1 | PA03 | Datos de imagen azules (píxeles impares) |
| JDI_B2 | PA02 | Datos de imagen azules (píxeles pares) |

</div>

##### 5.5.1.3. Interfaz de pantalla EPD { #5513-epd-display-interface }

=== "52B/D/E/G/J (alimentación externa regulada)"

    El chip admite una interfaz de pantalla EPD paralela de 8 bits:

    <div align="center"><em>Tabla 5.5-4: Conexiones de señales EPD</em></div>

    <div align="center" markdown>

    | Señal EPD | I/O | Descripción |
    |:---|:---|:---|
    | CLK | PA04 | Reloj del controlador de fuente |
    | CKV/CPV | GPIO | Reloj del controlador de compuerta |
    | SPH | PA06 | Pulso de inicio del controlador de fuente |
    | SPV/STV | GPIO | Pulso de inicio del controlador de compuerta |
    | LE | GPIO | Habilitación del latch del controlador de fuente |
    | OE | GPIO | Habilitación de salida del controlador de fuente |
    | D0–D7 | PA07/PA08/PA37/PA39/PA40/PA41/PA42/PA43 | Señal de datos del controlador de fuente, bits 0–7 |
    | GMODE | GPIO | Selección del modo de salida del controlador de compuerta |
    | VPOS/VNEG | TPS | Alimentación positiva/negativa del controlador de fuente |
    | VGH/VGL | TPS | Alimentación positiva/negativa del controlador de compuerta |
    | VCOM | TPS | Conexión común |
    | TPS_WAKEUP/TPS_PWRUP | GPIO | Control de activación/encendido del PMIC TPS |
    | TPS_SDA/TPS_SCL | I2C | Interfaz I2C del PMIC TPS |
    | TPS_PWRCOM | GPIO | VCOM_CTRL del PMIC TPS, habilitación de VCOM |
    | TPS_GOOD | GPIO | Señal Power Good del PMIC TPS |

    </div>

    !!! note
        Las señales marcadas como "PA**" deben usar la asignación fija de E/S indicada. Las señales marcadas como GPIO pueden asignarse a cualquier E/S. Las marcadas como TPS son salidas del PMIC de pantalla (TPS) hacia el panel. Las marcadas como I2C requieren una E/S con capacidad I2C.

=== "SF32LB520/3/5/7 (alimentación por batería)"

    !!! info "No aplicable"
        La nota oficial de aplicación de hardware de SiFli para SF32LB520/3/5/7 no incluye un diseño de referencia de interfaz paralela EPD. Si el producto necesita una pantalla EPD, consulte la documentación de 52B/D/E/G/J y confirme directamente con el equipo FAE de SiFli si es viable en la variante alimentada por batería.

##### 5.5.1.4. Interfaz táctil y de retroiluminación { #5514-touch-and-backlight-interface }

SF32LB52x admite una interfaz I2C para el controlador táctil con una entrada de interrupción de estado táctil, además de una señal PWM para habilitar y controlar el brillo de la retroiluminación.

<div align="center"><em>Tabla 5.5-5: Conexiones táctiles y de retroiluminación</em></div>

<div align="center" markdown>

| Señal táctil/retroiluminación | Pin | Descripción |
|:---|:---|:---|
| Interrupt | PA43 | Interrupción de estado táctil (compatible con activación) |
| I2C1_SCL | PA42 | Reloj I2C táctil |
| I2C1_SDA | PA41 | Datos I2C táctiles |
| BL_PWM | PA01 | Control PWM de retroiluminación |
| Reset | PA44 | Reinicio del controlador táctil |

</div>

**Errores frecuentes en el diseño de pantalla**

- Olvidar los pines de reinicio, TE, PWM de retroiluminación o interrupción táctil al asignar los pines.
- Dar por hecho que la variante alimentada por batería admite EPD sin confirmar el dispositivo y el diseño de referencia concretos.
- Alimentar la pantalla desde un LDO interno en vez de una línea externa con capacidad adecuada.
- Tender las señales de reloj y datos de pantalla junto al cristal, RF, audio o nodos analógicos de alta impedancia.

**Lista de comprobación de pantalla**

- [ ] La interfaz, profundidad de color, resolución y ancho de banda son adecuados para el panel seleccionado.
- [ ] Se han asignado y documentado el reinicio, TE, PWM de retroiluminación, I2C táctil e interrupción táctil.
- [ ] La línea y la secuencia de alimentación de pantalla son compatibles con el modo de espera y la activación.
- [ ] El plan de puesta en marcha contempla el reinicio, la identificación y lectura de datos del panel cuando estén disponibles, la retroiluminación, la interrupción táctil y la primera imagen.

#### 5.5.2. Interfaz de audio { #552-audio-interface }

**Resumen rápido**

- La entrada analógica de micrófono es no diferencial (single-ended) y requiere un condensador de acoplamiento para bloquear la CC.
- La salida del DAC es diferencial y debe trazarse como un par diferencial corto y apantallado.
- El filtrado de alimentación de audio y la ubicación de MIC_BIAS influyen considerablemente en el nivel de ruido.

**Objetivo de diseño**

Mantenga cortos, filtrados y apantallados los recorridos del micrófono, el DAC, la polarización y la alimentación de audio. Aíslelos de las señales digitales y de las fuentes de ruido de conmutación para preservar la calidad analógica.

La interfaz de audio ofrece:

1. Una entrada ADC no diferencial para un micrófono analógico, con un condensador de acoplamiento en serie de al menos 2,2 µF; el micrófono se alimenta desde la salida MIC_BIAS del chip.
2. Una salida DAC diferencial para un amplificador de audio externo (PA): trácela como un par diferencial con un apantallamiento de masa adecuado, mantenga la capacitancia de pista por debajo de 10 pF y la longitud por debajo de 2 cm.

<div align="center"><em>Tabla 5.5-6: Conexiones de señales de audio</em></div>

<div align="center" markdown>

| Señal de audio | Pin | Descripción |
|:---|:---|:---|
| BIAS | MIC_BIAS | Alimentación del micrófono |
| AU_ADC1P | ADCP | Entrada no diferencial de micrófono analógico |
| AU_DAC1P | DACP | Salida analógica diferencial positiva |
| AU_DAC1N | DACN | Salida analógica diferencial negativa |

</div>

![Figura 5.5-1: Circuito de entrada no diferencial para micrófono MEMS analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de entrada no diferencial para micrófono MEMS analógico</em></div>

![Figura 5.5-2: Circuito de entrada no diferencial para micrófono ECM analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito de entrada no diferencial para micrófono ECM analógico</em></div>

Los circuitos de micrófono de referencia filtran MIC_BIAS con una resistencia en serie de 1 kΩ y un condensador a masa de 1 µF y 6,3 V. El circuito ECM añade una resistencia de polarización del micrófono de 4,7 kΩ. Ambos muestran un condensador de entrada a masa de 0,01 µF: es un filtro en derivación, no el condensador de acoplamiento en serie requerido en el recorrido de señal. Mantenga esta distinción al adaptar los circuitos.

![Figura 5.5-3: Circuito de amplificador de audio analógico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito de amplificador de audio analógico</em></div>

**Errores frecuentes en el diseño de audio**

- Tender las pistas del micrófono o DAC cerca de los relojes de pantalla, DC/DC, RF, USB o SDIO.
- Colocar lejos de los pines del chip los condensadores de filtro de MIC_BIAS o AVDD33_AUD.
- Tratar DACP/DACN como señales no diferenciales independientes en vez de como un par diferencial.
- Permitir una capacitancia parásita alta o pistas largas en la salida analógica.

**Lista de comprobación de audio**

- [ ] Se ha comparado la ubicación de los componentes de MIC_BIAS, ADCP, DACP y DACN con los ejemplos de diseño.
- [ ] DACP/DACN se trazan como un par diferencial corto y apantallado.
- [ ] Los condensadores de filtro de audio están cerca de sus pines y conectados a una masa limpia.
- [ ] El plan de puesta en marcha verifica la polarización del micrófono, el ruido de fondo del ADC, la salida DAC, la habilitación del PA y el ruido audible.

!!! important "Complete los recorridos del micrófono y del DAC"
    La fuente conecta MEMS_MIC_ADC_IN y ECM_MIC_ADC_IN a ADCP. Incluya en serie el condensador de acoplamiento de al menos 2,2 µF indicado arriba; el condensador de 0,01 µF conectado a masa en los circuitos de micrófono no lo sustituye. Coloque el filtro paso bajo diferencial del recuadro discontinuo de la figura 5.5-3 cerca de la MCU. Mantenga la capacitancia de las pistas de salida del DAC por debajo de 10 pF y su longitud por debajo de 2 cm.

#### 5.5.3. Botones { #553-buttons }

**Resumen rápido**

- `PA34` admite el botón de encendido, las funciones de encendido/apagado y el reinicio por pulsación larga.
- Los botones del codificador rotatorio deben seguir el circuito de referencia y revisarse junto con los requisitos de activación, antirrebote y ESD.

**Objetivo de diseño**

Garantice la entrada del usuario y el reinicio sin activaciones falsas, estados de reinicio bloqueados ni fugas elevadas en espera a través de las redes de polarización.

##### 5.5.3.1. Botón de encendido { #5531-power-button }

PA34 admite el reinicio por pulsación larga y puede implementarse con un botón combinado de encendido/apagado y reinicio. El reinicio por pulsación larga es activo en nivel alto, por lo que el estado predeterminado debe ser nivel bajo (pull-down) y la señal debe pasar a nivel alto al pulsar el botón.

![Figura 5.5-4: Circuito del botón de encendido/reinicio por pulsación larga](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito del botón de encendido/reinicio por pulsación larga</em></div>

El circuito de referencia utiliza R0703 (5,1 kΩ) entre VSYS_3V3 y el botón, R0702 (100 kΩ) para mantener PA34 en nivel bajo y C0720 (0,1 µF) conectado a masa. También incluye protección ESD. Estos valores corresponden al diseño ilustrado; al adaptarlo, compruebe los umbrales de entrada, el antirrebote, las fugas y los tiempos de reinicio.

##### 5.5.3.2. Botón de codificador rotatorio mecánico { #5532-mechanical-rotary-encoder-button }

Use el diseño de referencia como base para el circuito del botón del codificador rotatorio.

![Figura 5.5-5: Circuito del botón de codificador rotatorio mecánico](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-5: Circuito del botón de codificador rotatorio mecánico</em></div>

Las señales A y B del codificador se conectan a PA35 y PA36 mediante resistencias de 0 Ω. Cada señal tiene una resistencia de pull-up de 200 kΩ a VDD33_LDO2_VOUT y protección ESD; C0703 y C0706 están marcados como NF (sin montar). Las etiquetas también indican funciones USB/UART multiplexadas, por lo que debe comprobar los conflictos de pines antes de adoptar esta asignación.

**Errores frecuentes en el diseño de botones**

- Dejar `PA34` flotante o con un nivel predeterminado incorrecto.
- Pasar por alto que los circuitos de botones pueden requerir activación, protección ESD, antirrebote y acceso para pruebas de producción.
- Compartir las redes de botones con funciones ruidosas o con mucha carga sin comprobar la fiabilidad de la activación.

**Lista de comprobación de botones**

- [ ] El nivel predeterminado del botón de encendido/reinicio por pulsación larga es correcto.
- [ ] Se ha verificado la activación desde los estados de bajo consumo previstos.
- [ ] Se han revisado los requisitos de protección ESD y antirrebote mecánico.
- [ ] El plan de puesta en marcha incluye pruebas de pulsación corta, pulsación larga, activación y reinicio.

#### 5.5.4. Motor vibrador { #554-vibration-motor }

**Resumen rápido**

- Use una salida PWM para accionar el motor vibrador mediante una etapa de control externa.
- Cuando importe la corriente en espera, alimente el motor desde una línea conmutable.

**Objetivo de diseño**

Proporcione una respuesta háptica repetible y evite que la corriente de arranque del motor, el ruido de conmutación y las fugas en espera afecten a las líneas sensibles y a los circuitos de activación.

SF32LB52x dispone de una salida PWM para accionar un motor vibrador mediante una etapa de control externa.

![Figura 5.5-6: Circuito de control del motor vibrador (referencia de SF32LB520/3/5/7; la variante con alimentación externa regulada ofrece una función equivalente)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-6: Circuito de control del motor vibrador (referencia de SF32LB520/3/5/7; la variante con alimentación externa regulada ofrece una función equivalente)</em></div>

![Figura 5.5-7: Circuito de control del motor vibrador (referencia de 52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-7: Circuito de control del motor vibrador (referencia de 52B/D/E/G/J)</em></div>

Ambos circuitos de motor usan PA20 para controlar un MOSFET de lado bajo, con una resistencia de pull-down de 1 MΩ en la puerta. La figura 5.5-6 alimenta el motor desde la salida VDD33_VOUT2 de 3,3 V del chip. La figura 5.5-7 utiliza dos LDO externos independientes de 3,3 V para el motor y PVDD, alimentados desde VSYS/VBAT. La función de control es equivalente, pero las conexiones de alimentación no son intercambiables.

**Lista de comprobación del motor**

- [ ] Se han revisado el controlador del motor, la protección flyback/ESD y la corriente nominal de la fuente.
- [ ] La línea de alimentación del motor permanece apagada por defecto en espera y en modo de envío.
- [ ] La asignación del pin PWM no entra en conflicto con los pines de pantalla, almacenamiento o depuración.
- [ ] El plan de puesta en marcha evalúa el barrido del ciclo de trabajo PWM, la corriente de arranque, el ruido audible y las fugas en espera.
