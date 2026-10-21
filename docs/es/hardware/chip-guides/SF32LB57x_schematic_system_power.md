---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de esquemático del sistema mínimo y la alimentación de SF32LB57x: familia de alimentación, straps de arranque, árbol de alimentación, carga/OVP, BUCK y modos."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware de SF32LB57x — Sistema mínimo y alimentación { #sf32lb57x-hardware-design-guide-minimum-system-power }

!!! note "Parte de la guía de diseño de hardware de SF32LB57x"
    Las pautas de diseño del esquemático se distribuyen en tres páginas: esta página (secciones 5.1-5.2: diseño del sistema mínimo y sistema de alimentación), [Reloj, RF e interfaces de usuario](SF32LB57x_schematic_clock_rf_interfaces.md) (secciones 5.3-5.5) y [Almacenamiento y fabricación](SF32LB57x_schematic_storage_mfg.md) (secciones 5.6-5.7). Consulte primero la [introducción a la guía de diseño de hardware de SF32LB57x](SF32LB57x_hardware_design_guide.md) para elegir el dispositivo y conocer el flujo de diseño completo.

## 5. Pautas de diseño del esquemático { #5-schematic-design-guidelines }

Este capítulo sigue el orden habitual de puesta en marcha de una placa. Complete primero el diseño del sistema mínimo; de lo contrario, la primera placa podría no encender, arrancar desde el almacenamiento, descargar firmware o entrar en modo de depuración. Una vez cerrada esa base, revise el sistema de alimentación, la generación de reloj, la ruta de RF, la pantalla, el audio, la cámara, los sensores y otras funciones específicas del producto.

<div align="center"><em>Tabla 5-1: Mapa de secciones del esquemático</em></div>

<div align="center" markdown>

| Grupo | Decisiones principales | Evidencias para liberar el diseño |
|:---|:---|:---|
| Diseño del sistema mínimo | Compatibilidad de encapsulado y familia de alimentación, straps de arranque, medio de arranque y acceso de depuración/descarga | Esquemático del sistema mínimo correspondiente, tabla de arranque y puntos de prueba de depuración |
| Sistema de alimentación | Familia de alimentación, árbol de alimentación, carga/OVP, BUCK, raíles de bajo consumo, modos de funcionamiento y comportamiento de activación | Plan de raíles, revisión de OVP/carga, mediciones de raíles y plan de corriente de bajo consumo |
| Generación de reloj | Cristal principal de 48 MHz, cristal RTC de 32,768 kHz y supuestos de calibración | Comprobación de especificaciones del cristal, plan de colocación y plan de calibración |
| RF | Adaptación de RF y ruta de antena | Plan de impedancia RF y capturas de la adaptación RF y del diseño de PCB |
| Interfaces de usuario | Pantalla, táctil/retroiluminación, audio, cámara, botones y motor | Esquemáticos de interfaces, secuencia de alimentación, asignación de pines y plan de validación |
| Almacenamiento y conectividad | Almacenamiento, arranque, GPIO, UART/I2C/SPI/SDIO/USB/CAN/GPADC | Tabla de arranque, plan de alimentación del almacenamiento, asignación de buses y evidencias del trazado de alta velocidad |
| Fabricación | Grabación de producción, calibración, acceso para útiles y comprobaciones de fiabilidad | Plano de puntos de prueba y plan de útiles y grabación |

</div>

### 5.1. Diseño del sistema mínimo { #51-minimum-system-design }

#### 5.1.1. Secuencia de diseño del sistema mínimo { #511-minimum-system-design-sequence }

Los fallos durante la puesta en marcha suelen deberse al sistema mínimo, la familia de alimentación, el modo de arranque, las resistencias pull-up del almacenamiento, la selección del cristal, los componentes BUCK o la falta de acceso de descarga. Defina estos elementos antes de asignar pines a los periféricos del producto:

1. Adapte el esquemático del sistema mínimo al encapsulado y a la familia de alimentación.
2. Configure el comportamiento de arranque y depuración de `PA00` / `PA01` y reserve el acceso de recuperación.
3. Seleccione el medio de arranque y añada las resistencias pull-up necesarias en `PA13` / `PA15` / `PA17`.
4. Defina el árbol de alimentación, la ruta del cargador/OVP, el inductor y los condensadores BUCK, y los estados predeterminados de los raíles; después complete la revisión detallada de la sección 5.2.
5. Seleccione los cristales de 48 MHz y 32,768 kHz y confirme el plan de calibración de la sección 5.3.
6. Reserve puntos de prueba para DBG-UART, SWD, modo de arranque, alimentación, tierra y conexión a útiles.

#### 5.1.2. Esquemáticos del sistema mínimo { #512-minimum-system-schematics }

SF32LB57x dispone de varias versiones del esquemático del sistema mínimo. Utilice la que corresponda tanto al encapsulado como a la familia de alimentación; no mezcle las versiones alimentadas por batería con las de alimentación de 3,3 V.

![Figura 5.1-1: Sistema mínimo QFN68L alimentado por batería](../../sf32-products/chips/assets/57x/SF32LB57-UH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Sistema mínimo QFN68L alimentado por batería</em></div>

![Figura 5.1-2: Sistema mínimo QFN68L con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-UL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Sistema mínimo QFN68L con alimentación de 3,3 V</em></div>

![Figura 5.1-3: Sistema mínimo QFN80L alimentado por batería](../../sf32-products/chips/assets/57x/SF32LB57-YH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Sistema mínimo QFN80L alimentado por batería</em></div>

![Figura 5.1-4: Sistema mínimo QFN80L con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-YL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Sistema mínimo QFN80L con alimentación de 3,3 V</em></div>

<!-- BGA-ONLY -->
![Figura 5.1-5: Sistema mínimo BGA112 alimentado por batería](../../sf32-products/chips/assets/57x/SF32LB57-VH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Sistema mínimo BGA112 alimentado por batería</em></div>

![Figura 5.1-6: Sistema mínimo BGA112 con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57-VL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-6: Sistema mínimo BGA112 con alimentación de 3,3 V</em></div>
<!-- /BGA-ONLY -->

#### 5.1.3. Almacenamiento de arranque y configuración de straps { #513-boot-storage-and-strap-configuration }

Seleccione el medio de arranque antes de cerrar el esquemático. La memoria integrada en el encapsulado puede ocupar ya un canal MPI, y cada medio externo tiene distintos requisitos de pull-up y control de alimentación.

<div align="center"><em>Tabla 5.1-1: Selección del medio de arranque externo</em></div>

<div align="center" markdown>

| `Bootstrap[1]` (`PA13`) | `Bootstrap[0]` (`PA17`) | Medio de arranque externo |
|:------------------------|:------------------------|:--------------------|
| L | L | Flash SPI NOR |
| L | H | Flash SPI NAND |
| H | L | Flash SD NAND |
| H | H | eMMC |

</div>

<div align="center"><em>Tabla 5.1-2: Requisitos de pull-up del medio de arranque externo</em></div>

<div align="center" markdown>

| Medio de arranque | Requisito de pull-up |
|:-----------|:--------------------|
| Flash SPI NOR | No se requieren resistencias pull-up externas en `PA13` / `PA17`. |
| Flash SPI NAND | `PA17` requiere una resistencia pull-up de 7,5 kohm; `PA13` no requiere pull-up. |
| Flash SD NAND | `PA13` y `PA15` requieren resistencias pull-up de 7,5 kohm; `PA17` no requiere pull-up. |
| eMMC | `PA13`, `PA15` y `PA17` requieren resistencias pull-up de 7,5 kohm. |

</div>

![Figura 5.1-7: Circuito recomendado para los pines Bootstrap](../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-7: Circuito recomendado para los pines Bootstrap</em></div>

Diseñe la alimentación del medio de arranque según el tipo de medio y la familia de alimentación. En las variantes alimentadas por batería, la Flash NOR externa se alimenta desde `VDD33_VOUT1`; la Flash SPI NAND externa requiere un interruptor de carga después de `VDD33_VOUT1`; y la Flash SD NAND externa y eMMC usan un LDO externo. En las variantes de 3,3 V, todos los medios de arranque externos deben usar un LDO externo. SiFli recomienda `PA21` como habilitación del interruptor del medio externo: el nivel alto enciende el raíl y el nivel bajo lo apaga. Si una variante alimentada por batería no expone `PA21`, la guía fuente permite usar en su lugar una GPIO con pull-up predeterminado. Asegúrese de que el raíl del medio esté disponible durante el arranque. Si el almacenamiento integrado en el encapsulado ya ocupa MPI3, el uso de MPI3 externo se limita a SD NAND o eMMC; no conecte Flash SPI NOR/SPI NAND externas a ese canal.

#### 5.1.4. Acceso de depuración y descarga { #514-debug-and-download-access }

Reserve el acceso de depuración y recuperación antes de asignar los IO del producto. Muchos fallos de la primera placa son difíciles de recuperar si no se puede acceder al DBG-UART predeterminado, a los straps de arranque o a la ruta SWD.

<div align="center"><em>Tabla 5.1-3: Puntos de prueba recomendados para depuración y descarga</em></div>

<div align="center" markdown>

| Punto de prueba | Recomendación | Uso |
|:-----------|:---------------|:--------|
| Entrada de alimentación | `VBAT` o 3,3 V y, cuando sea necesario, `VSYS` / `VDD33_VOUT1` | Alimentación de útiles, medición de corriente y validación de bajo consumo |
| GND | Varios puntos de prueba de tierra | Retorno para descarga, depuración, calibración y medición de corriente |
| DBG-UART | `PA18` / `PA19`, correspondientes a `DBG_UART_RXD` / `DBG_UART_TXD` | Descarga predeterminada, registros y grabación de producción |
| SWD | `PA43` / `PA44` o los pines SWDIO/SWCLK definidos por el número de pieza | Depuración y análisis de fallos |
| Modo de arranque | `PA00` o el pin de selección de modo de arranque definido por el número de pieza | Entrar en modo de descarga o recuperación |
| Conmutación SWD | `PA01` o el pin de configuración correspondiente | Se utiliza cuando es necesario cambiar la ubicación de los pines SWD |
| Tecla de encendido / activación | `PA34` o el pin de tecla correspondiente | Prueba de encendido desde útiles, reinicio o activación |

</div>

<div align="center"><em>Tabla 5.1-4: Conexiones predeterminadas del puerto de depuración</em></div>

<div align="center" markdown>

| Señal de depuración | Pin | Nombre de red |
|:-------------|:----|:---------|
| `DBG_UART_RXD` | `PA18` | `USART1_RXD` |
| `DBG_UART_TXD` | `PA19` | `USART1_TXD` |
| `SWD_CLK` | `PA43` | `SWCLK` |
| `SWD_DIO` | `PA44` | `SWDIO` |

</div>

!!! warning
    Los puntos de prueba de producción deben incluir tanto `DBG_UART_RXD` como `DBG_UART_TXD`. No reserve por error RXD dos veces.

`PA18`/`PA19` son los pines DBG-UART predeterminados y `PA43`/`PA44` son los pines SWD predeterminados; SWD también puede reasignarse a `PA18`/`PA19`. El dispositivo admite cuatro interfaces de descarga: DBG-UART, SWD, UART estándar y USB. El arranque normal solo admite DBG-UART y SWD; el modo BOOT puede habilitar las cuatro. El modo BOOT y la conmutación de los pines SWD dependen de `PA00`, el registro BOOT, `PA01` y el interruptor BOOT del host. Para diseñar la grabación de producción y la recuperación, consulte la tabla completa de modos de la fuente; no deduzca la interfaz de descarga a partir de un único estado de pin.

### 5.2. Sistema de alimentación { #52-power-system }

#### 5.2.1. Planificación del árbol de alimentación { #521-power-tree-planning }

Dibuje el árbol de alimentación antes de introducir el esquemático e indique para cada raíl la fuente, el estado predeterminado, la carga máxima, el estado durante el reposo y la GPIO de control.

<div align="center"><em>Tabla 5.2-1: Referencia rápida para planificar los raíles de alimentación</em></div>

<div align="center" markdown>

| Categoría del raíl | Aspectos de planificación |
|:--------------|:---------------|
| Raíles siempre activos | Limítelos al RTC, la activación, la detección necesaria y los circuitos de retención de Bluetooth. Calcule la corriente estática elemento por elemento. |
| Raíles conmutables para periféricos | Priorice interruptores de carga o LDO conmutables para la pantalla, la retroiluminación, los sensores, el motor, el almacenamiento externo y la cámara. |
| Raíles analógicos/RF/audio | Fíltrelos por separado, mantenga cortos los bucles y aíslelos de las zonas digitales de alta corriente y alta velocidad. |
| Raíl del medio de arranque | El estado predeterminado debe permitir el arranque y el estado de reposo debe impedir la alimentación inversa y las corrientes de fuga. |
| Raíles de pull-up | Diseñe los raíles de pull-up de I2C, teclas, interrupciones de sensores y otros junto con la política de alimentación de cada periférico. |

</div>

#### 5.2.2. Variantes alimentadas por batería { #522-battery-powered-variants }

Las variantes alimentadas por batería suelen utilizar `VBUS`, `VBAT`, `VCC`, `VSYS`, `BUCK_LX`, `BUCK_FB`, las salidas de los LDO internos y los pines de alimentación de audio y RF.

Requisitos principales:

- Mantenga `VBUS` dentro del rango de entrada permitido y añada protección OVP.
- Conecte `VBAT` a la batería y utilícelo para medir su tensión.
- Trate `VCC` como la entrada principal del sistema. Asegure una anchura de pista suficiente y coloque los condensadores de desacoplo cerca del chip.
- Utilice `VSYS` únicamente para las cargas internas especificadas, `AVDD_BRF` y los circuitos pull-up de GPIO; no alimente periféricos externos desde este raíl.
- Utilice `VDD33_VOUT1`, `VDD33_VOUT2` y las demás salidas de reguladores internos únicamente para las cargas autorizadas expresamente. Hay una discrepancia en la fuente de SiFli: el texto y el diagrama de bajo consumo muestran sensores externos alimentados desde `VDD33_VOUT1`, mientras que la lista de comprobación de alimentación de la misma guía limita esta salida a Flash NOR/NAND integrada en el encapsulado o externa y a `AVDD33_AUD`, y prohíbe otros periféricos. Hasta que SiFli aclare la discrepancia, no conecte sensores a `VDD33_VOUT1`.
- Conecte `AVDD_BRF` y `AVDD33_AUD` a las fuentes recomendadas e incorpore filtrado local.

#### 5.2.3. Variantes con alimentación de 3,3 V { #523-33-v-supply-variants }

Las variantes de 3,3 V suelen utilizar un raíl externo de 3,3 V para `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD`, `VDDIOA` y dominios relacionados.

Requisitos principales:

- Utilice una distribución en estrella para los dominios importantes de 3,3 V.
- Filtre por separado las alimentaciones analógicas, RF y de audio, aislándolas de las rutas digitales de alta corriente o alta velocidad.
- Si se utiliza `VBATS` para detectar la batería, verifique el rango de entrada y el filtrado.
- En las variantes de 3,3 V, alimente todos los medios de arranque externos desde un LDO externo; `PA21` es la señal de habilitación recomendada.
- Conecte las referencias internas y las salidas de los LDO internos únicamente a los condensadores externos requeridos. No las alimente desde una fuente de tensión externa.

#### 5.2.4. Referencia rápida de condensadores y usos de alimentación { #524-power-capacitor-and-usage-quick-reference }

Utilice esta tabla para la revisión preliminar del esquemático. Los valores definitivos deben comprobarse en la hoja de datos y el diseño de referencia.

<div align="center"><em>Tabla 5.2-2: Referencia rápida de condensadores y usos de alimentación</em></div>

<div align="center" markdown>

| Raíl / pin | Condensador externo típico | Uso principal | Notas de diseño |
|:-----------|:---------------------------|:---------|:-------------|
| `VBUS` | >= 10 uF | Entrada USB / cargador | Solo para variantes con batería; añada protección OVP/ESD/EOS. |
| `VBAT` | >= 4,7 uF | Conexión de batería y medición de su tensión | Mantenga la ruta de batería corta y ancha; evite trazarla en paralelo con señales sensibles. |
| `VCC` / `PVDD` | >= 10 uF | Entrada principal de la PMU / sistema | Coloque el desacoplo cerca del chip y dimensione la pista para la corriente. |
| `VSYS` | Aproximadamente 2,2 uF | Alimentación interna o analógica/RF especificada | No lo use para alimentar periféricos generales; controle la carga y la capacitancia totales. |
| `VDD33_VOUT1` | 2,2 uF / 6,3 V | Solo Flash integrada en el encapsulado, Flash NOR/NAND externa y `AVDD33_AUD` | No lo use para sensores de ritmo cardíaco ni otros periféricos comunes; la corriente de carga durante el arranque suave debe respetar el límite de la fuente. |
| `VDD33_VOUT2` | Aproximadamente 2,2 uF | Pantalla, motor o cargas conmutables especificadas | El estado predeterminado y la corriente de irrupción deben coincidir con la configuración del firmware. |
| `VDD18_VOUT` | Según el esquemático del sistema mínimo seleccionado | Alimentación interna de 1,8 V relacionada con PSRAM interna o integrada en el encapsulado | No lo use para periféricos externos de 1,8 V. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 uF / 6,3 V cada uno | Salidas de LDO internos | Solo para alimentación interna; no alimente periféricos externos. |
| `VDD_RET` / `VDD_RTC` | `VDD_RET`: 0,47 uF / 6,3 V; `VDD_RTC`: 1 uF / 6,3 V | Alimentaciones internas de retención y RTC | Coloque los condensadores cerca de los pines. |
| `AVDD_BRF` | Aproximadamente 4,7 uF | Alimentación analógica RF | Coloque el condensador cerca del chip y proporcione una conexión a tierra corta con varias vías. |
| `AVDD33_AUD` | Aproximadamente 2,2 uF | Alimentación analógica de audio | Manténgala alejada de DC/DC, RF, USB, SDIO y relojes de pantalla. |
| `MIC_BIAS` | 1 uF / 6,3 V | Polarización del micrófono | Utilícelo únicamente para la polarización del micrófono. |
| `AUD_VREF` / `GPADC_VREF` | 1 uF para `AUD_VREF`; 4,7 uF para `GPADC_VREF` | Referencia interna | Solo un condensador; nunca aplique tensión externa. |

</div>

#### 5.2.5. Inductor BUCK y realimentación { #525-buck-inductor-and-feedback }

Parámetros recomendados para el inductor BUCK:

<div align="center"><em>Tabla 5.2-3: Parámetros recomendados para el inductor BUCK</em></div>

<div align="center" markdown>

| Parámetro | Valor recomendado |
|:----------|:------------------|
| Inductancia | 4,7 uH ±20% |
| DCR | <= 0,4 ohm |
| Corriente de saturación | >= 450 mA |

</div>

Requisitos de la PCB:

- Coloque el inductor, el condensador de salida y el condensador de realimentación cerca del chip.
- Mantenga corta y ancha la ruta de `BUCK_LX`. Evite planos de cobre y pistas sensibles en esta zona.
- La pista de `BUCK_FB` debe tener una anchura adecuada; se recomienda 0,25 mm o más.
- Mantenga una referencia de tierra sólida cerca del inductor y evite acoplar ruido a las pistas de los cristales, RF, audio y GPADC.
- Si el producto incorpora bloques sensibles como GPS, medición del ritmo cardíaco, ECG o micrófonos analógicos, reserve huellas opcionales para ajustar la EMI cerca de `BUCK_LX`. Determine los valores definitivos durante la validación EMC del sistema.

#### 5.2.6. Carga y OVP { #526-charging-and-ovp }

Los productos con batería pueden utilizar un cargador externo o el bloque de carga integrado.

<div align="center"><em>Tabla 5.2-4: Comparación de opciones de carga</em></div>

<div align="center" markdown>

| Opción | Ruta de alimentación | Notas de diseño |
|:-------|:------------|:-------------|
| Cargador externo sin PPM | La batería alimenta directamente los pines `VBAT` y `VCC` del chip. | El canal GPADC del chip en `VBAT` mide la tensión de la batería con una precisión de muestreo de ±30 mV. |
| Cargador externo con PPM | `VSYS` del cargador alimenta `VCC` del chip; `VBAT` del cargador se conecta tanto a la batería como a `VBAT` del chip. | El canal GPADC del chip en `VBAT` mide la tensión de la batería con una precisión de muestreo de ±30 mV. |
| Cargador integrado | Utiliza el bloque de gestión de carga integrado en el chip. | Si una batería baja ha apagado el sistema, primero debe alcanzar la tensión de arranque para que el sistema pueda iniciar y mostrar la pantalla de carga. La lista de comprobación de origen especifica como caso de uso que el software encienda la pantalla cuando la batería alcance aproximadamente 3,6 V. |

</div>

Recomendaciones de OVP:

- `VBUS` nunca debe superar el rango de entrada permitido.
- Para una OVP con OVLO ajustable, SiFli cita como referencia el AW32905FCR. El texto de aplicación especifica 5,2–5,5 V, mientras que la lista de comprobación indica 5,15–5,55 V. Hasta que SiFli aclare la diferencia, diseñe para el intervalo común de 5,2–5,5 V. Incluya las tolerancias del dispositivo y del divisor en `V_IN_OVLO = ((R1 + R2) / R2) × V_OVLO_TH`; mantenga el error de `V_OVLO_TH` dentro del 3 % y use resistencias R1/R2 con tolerancia del 1 %.
- Para una OVP con salida regulada, SiFli cita los modelos SGM4064YDE8G y LP5305AQVF. El texto de aplicación especifica 4,5–5,4 V, mientras que la lista de comprobación indica 4,7–5,4 V. Hasta que se aclare, use el intervalo más estrecho de 4,7–5,4 V, con una capacidad de carga de al menos 0,5 A y un umbral de sobrecorriente de al menos 0,7 A.
- Antes de llegar al chip, haga pasar la entrada del cargador por la protección TVS/OVP.

!!! warning "Discrepancia en el rango de entrada"
    La tabla de pines de alimentación y la lista de comprobación especifican un rango de entrada `VBUS` de 4,6–5,5 V, mientras que el texto de selección de OVP indica 4,5–5,5 V. Hasta que SiFli aclare la diferencia, diseñe con 4,6 V como tensión mínima de entrada de funcionamiento.

#### 5.2.7. Estrategia de alimentación de bajo consumo { #527-low-power-supply-strategy }

El comportamiento de bajo consumo debe contemplarse desde el diseño del esquemático.

Recomendaciones:

- Utilice interruptores de carga o LDO conmutables para la pantalla, la retroiluminación, los sensores, el motor y el almacenamiento externo.
- Elija componentes de gestión de alimentación con EN activo en nivel alto. Si la salida debe permanecer apagada por defecto, conecte EN a tierra mediante una resistencia pull-down de 1 MΩ a 5,1 MΩ; seleccione el valor según el objetivo de bajo consumo del producto.
- Para el interruptor de alimentación con MOSFET, use la topología recomendada en la fuente, PMOS más NMOS: nivel alto en el control enciende la alimentación y nivel bajo la apaga. Instale una resistencia pull-down fija de 1 MΩ entre el control y tierra.
- Alimente las resistencias pull-up de I2C desde el mismo raíl que el periférico correspondiente para evitar fugas durante el reposo.
- Elija componentes con baja corriente en reposo (Iq) y baja corriente de apagado para los circuitos siempre activos.
- Si utiliza `VSYS` o un LDO siempre activo como raíl pull-up de GPIO, incluya esa corriente de fuga en el presupuesto de corriente durante el reposo.

#### 5.2.8. Figuras de referencia de alimentación y carga { #528-power-and-charging-reference-figures }

Los esquemáticos y ejemplos de diseño de referencia de SF32LB57x muestran el árbol de alimentación, la temporización POR, la ruta de carga, la selección de OVP y la estrategia de interruptores de carga de bajo consumo. En las variantes alimentadas por batería, elija entre un LDO integrado, un interruptor de carga aguas abajo del LDO o un LDO externo según el medio de arranque. En las variantes de 3,3 V, utilice un LDO externo para todos los medios de arranque externos. Siga los circuitos de referencia para la protección EOS/ESD y OVP de VBUS y para conectar el termistor NTC de la batería. Revise por separado los ejemplos alimentados por batería y los de 3,3 V para no mezclar ambas familias de alimentación.

La rampa de alimentación también debe cumplir el intervalo de tiempo de subida de VDD indicado en las figuras de referencia: `1 < tVR < 500000 μs/V`. En las variantes de 3,3 V, respete la relación ilustrada entre las rampas de PVDD y VDDIO; VDDIO puede encenderse al mismo tiempo que PVDD.

Figuras de referencia para alimentación por batería:

![Figura 5.2-1: Secuencia de encendido de la variante alimentada por batería](../../sf32-products/chips/assets/57x/SF32LB57x-POR-VBAT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-1: Secuencia de encendido de la variante alimentada por batería</em></div>

![Figura 5.2-2: Estructura de alimentación del sistema con batería](../../sf32-products/chips/assets/57x/SF32LB57x-H-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-2: Estructura de alimentación del sistema con batería</em></div>

Figuras de referencia para alimentación de 3,3 V:

![Figura 5.2-3: Secuencia de encendido de la variante con alimentación de 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-POR-3V3.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-3: Secuencia de encendido de la variante con alimentación de 3,3 V</em></div>

![Figura 5.2-4: Estructura de alimentación del sistema con 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-L-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-4: Estructura de alimentación del sistema con 3,3 V</em></div>

Figuras de referencia para carga y OVP:

![Figura 5.2-5: Cargador externo sin PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-NPPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-5: Cargador externo sin PPM</em></div>

![Figura 5.2-6: Cargador externo con PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-PPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-6: Cargador externo con PPM</em></div>

![Figura 5.2-7: Circuito de referencia del cargador integrado](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-INNER.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-7: Circuito de referencia del cargador integrado</em></div>

![Figura 5.2-8: Aplicación OVP con OVLO ajustable](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-OVLO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-8: Aplicación OVP con OVLO ajustable</em></div>

![Figura 5.2-9: Aplicación OVP con salida regulada](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-REGU.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-9: Aplicación OVP con salida regulada</em></div>

#### 5.2.9. Restricciones eléctricas del encapsulado y de la familia de alimentación { #529-package-and-power-family-electrical-constraints }

Los requisitos de alimentación de SF32LB57x varían según el encapsulado y la familia de alimentación. A continuación se resumen las diferencias que deben comprobarse; aun así, los esquemáticos finales deben revisarse frente al esquemático del sistema mínimo y la hoja de datos del encapsulado seleccionado.

<div align="center"><em>Tabla 5.2-5: Diferencias principales entre familias de alimentación</em></div>

<div align="center" markdown>

| Elemento de diseño | Variantes alimentadas por batería | Variantes con alimentación de 3,3 V |
|:------------|:-------------------------|:----------------------|
| Entrada de alimentación principal | La tabla de pines y la lista de comprobación especifican `VBUS` de 4,6 a 5,5 V. El rango de `VBAT` es de 3,45 a 4,7 V; la lista de comprobación especifica baterías con tensión nominal de 4,2 a 4,45 V. El rango de funcionamiento de `VCC` es de 3,45 a 4,7 V, con un umbral de arranque por hardware de 3,45 V y uno de apagado de 2,7 V. El umbral de batería baja predeterminado por software es 3,48 V; para una fuente de banco de tensión constante, use de 3,6 a 4,7 V; se recomienda 3,8 V. | `PVDD` / `PVDD_PMU`: de 2,97 a 3,63 V; `VBATS` se utiliza únicamente para detectar la tensión de la batería. |
| Alimentaciones analógicas y RF | `AVDD_BRF` se alimenta desde `VSYS`; `AVDD33_AUD`, desde `VDD33_VOUT1`. | `AVDD33` / `AVDD33_ANA`, `AVDD_BRF`, `AVDD33_AUD` y `VDDIOA` reciben alimentación externa de 3,3 V y deben conectarse en estrella. |
| Salidas de LDO internos | `VDD_VOUT1`, `VDD_VOUT2`, `VDD_RET`, `VDD_RTC` y `VDD18_VOUT` son alimentaciones internas; no deben alimentar periféricos externos comunes. | Igual; `VDD18_VOUT` solo se usa para la alimentación interna relacionada con la PSRAM integrada en el encapsulado, no para periféricos externos de 1,8 V. |
| `VDD33_VOUT1` | 3,3 V y 150 mA tras el arranque; está habilitado por defecto. La corriente de carga durante el arranque suave no debe superar 30 mA, o el LDO podría no arrancar. La lista de comprobación de alimentación solo permite Flash NOR/NAND integrada en el encapsulado o externa y `AVDD33_AUD`, y prohíbe otros periféricos. | No aplicable. |
| `VDD33_VOUT2` | 3,3 V y 150 mA; está deshabilitado por defecto y se habilita mediante software. La corriente de carga durante el arranque suave no debe superar 30 mA. La lista de comprobación de origen indica que el software puede desactivar este límite de corriente de arranque; si se desactiva, compruebe que la corriente de irrupción del periférico sea compatible con las condiciones de alimentación recomendadas. | No aplicable. |
| `VDDIOSB` / `VDDIOSA` | QFN80L<!-- BGA-ONLY --> expone `VDDIOSB`, cuya tensión depende del dispositivo MPI integrado: 1,8 V para PSRAM o 3,3 V para Flash NOR. BGA112<!-- /BGA-ONLY --> también expone `VDDIOSA`, fijado a 1,8 V desde `VDD18_VOUT`; la tensión de `VDDIOSB` depende del dispositivo integrado (1,8 V para PSRAM o 3,3 V para Flash NOR). Confirme el número de pieza exacto. | Igual; confirme el número de pieza exacto que se va a pedir. |

</div>

!!! warning "Discrepancia en la documentación sobre las cargas de VDD33_VOUT1"
    El diagrama del árbol de alimentación de la guía de SiFli asocia algunos sensores con `VDD33_VOUT1`, pero la lista de comprobación de alimentación de la misma guía reserva explícitamente esta salida para Flash NOR/NAND y `AVDD33_AUD`, y prohíbe conectar otros periféricos. Hasta que SiFli aclare la discrepancia, siga la lista de comprobación, que es más restrictiva, y no alimente sensores ni otros periféricos desde este raíl.

!!! warning "Discrepancia en la tensión mínima de PVDD"
    La lista de comprobación del esquemático indica un rango de `PVDD` de 2,93–3,63 V, mientras que la tabla de referencia de alimentación anterior indica 2,97–3,63 V. La documentación fuente no resuelve esta diferencia. Hasta que SiFli la aclare, utilice 2,97 V como límite inferior provisional más restrictivo para la revisión del diseño y confirme las especificaciones eléctricas del número de pieza exacto.

!!! warning "Discrepancia sobre el rango de entrada de VBATS"
    Las tablas de pines de los encapsulados para las variantes con alimentación de 3,3 V indican un rango de `VBATS` de 0 a 4,7 V, mientras que la lista de comprobación limita la medición de la batería a 0–4,5 V. Hasta que SiFli aclare la diferencia, no aplique más de 4,5 V a `VBATS` en estas variantes.

<div align="center"><em>Tabla 5.2-6: Condensadores principales y límites de carga</em></div>

<div align="center" markdown>

| Raíl / pin | Requisito de la fuente |
|:-----------|:------------------------|
| `VBUS` | Las variantes alimentadas por batería requieren al menos 10 uF / 10 V cuando se utiliza el cargador integrado. |
| `VBAT` | Al menos 4,7 uF / 10 V; un canal GPADC interno mide la tensión de la batería. |
| `VCC` / `PVDD` | `VCC` requiere al menos 10 uF / 10 V; `PVDD`, al menos 10 uF / 6,3 V. |
| `BUCK_FB` | 4,7 uF, colocado entre el inductor y el pin del chip. |
| `VSYS` | 2,2 uF / 6,3 V; la capacitancia total de este dominio no debe superar 9,6 uF y el raíl solo debe alimentar las cargas internas/analógicas/RF especificadas. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 2,2 uF / 6,3 V cada uno; la capacitancia total de cada dominio no debe superar 9,6 uF. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 uF / 6,3 V cada uno. |
| `VDD_RET` / `VDD_RTC` | Para `VDD_RET`, 0,47 uF / 6,3 V; para `VDD_RTC`, 1 uF / 6,3 V. |
| `AVDD_BRF` / `AVDD33_AUD` | Para `AVDD_BRF`, 4,7 uF / 6,3 V; para `AVDD33_AUD`, 2,2 uF / 6,3 V. |
| `VDDIOA` / `VBATS` / `AVDD33_ANA` | Solo en variantes con alimentación de 3,3 V: `VDDIOA` usa 4,7 uF / 6,3 V, `VBATS` 0,1 uF / 10 V y `AVDD33_ANA` 1 uF / 6,3 V. |
| `AUD_VREF` / `GPADC_VREF` | Solo un condensador; no aplique tensión externa. Los valores típicos son 1 uF para `AUD_VREF` y 4,7 uF para `GPADC_VREF`. |
| `MIC_BIAS` | 1 uF / 6,3 V; se utiliza únicamente para polarizar el micrófono. |

</div>

<div align="center"><em>Tabla 5.2-7: Comprobaciones obligatorias de carga y OVP</em></div>

<div align="center" markdown>

| Elemento | Requisito |
|:-----|:------------|
| Uso del cargador integrado | Utilícelo solo si el producto puede esperar a que la batería alcance aproximadamente 3,6 V antes de que el firmware encienda la pantalla. |
| Encendido inmediato de la pantalla | Si el producto debe encender la pantalla justo después de conectar el cargador, utilice un cargador externo con gestión de ruta de alimentación PPM. |
| Especificación de la batería | La carga por `VBAT` admite baterías con tensión nominal de 4,2 V a 4,45 V; la precarga es de unos 40 mA y la corriente máxima de carga es 1C, hasta 400 mA. |
| OVP con OVLO ajustable | El texto de diseño especifica 5,2–5,5 V y la lista de comprobación, 5,15–5,55 V; el intervalo común es 5,2–5,5 V. Utilice resistencias divisoras del 1 % y mantenga el error del umbral OVLO por debajo del 3 %. Hasta que SiFli aclare la diferencia, diseñe para el intervalo común. |
| OVP con salida regulada | Se recomienda OVP con salida LDO; la salida debe ser de 4,7 V a 5,4 V, la capacidad de carga de al menos 0,5 A y el umbral OCP de al menos 0,7 A. |
| Cargador integrado no utilizado | `VBUS` puede dejarse sin conectar y se puede omitir su condensador; en este caso, `VBAT` no suministra potencia de salida. |

</div>


#### 5.2.10. Modos de funcionamiento y fuentes de activación { #5210-operating-modes-and-wake-sources }

Los modos de funcionamiento y las fuentes de activación forman parte de la revisión del sistema de alimentación, ya que determinan qué raíles, pull-ups, cargas externas y GPIO con capacidad de activación permanecen activos en cada estado de bajo consumo.

#### 5.2.11. Modos de alimentación { #5211-power-modes }

La familia SF32LB57x ofrece diez fuentes de interrupción capaces de activar el dispositivo desde Standby e Hibernate; su correspondencia se muestra en la tabla siguiente.

<div align="center"><em>Tabla 5.2-8: Comparación de modos de alimentación</em></div>

<div align="center" markdown>

| Modo | CPU | Periféricos | SRAM | IO | LPTIM | Fuentes de activación habituales | Tiempo de activación habitual |
|:-----|:----|:------------|:-----|:---|:------|:---------------------|:------------------|
| Active | En ejecución | En ejecución | Accesible | Cambia | En ejecución | - | - |
| Sleep | Detenida | En ejecución | Accesible | Cambia | En ejecución | Cualquier interrupción | <0,5 us |
| DeepSleep | Detenida | Detenidos | Retenida, inaccesible | Nivel mantenido | En ejecución | RTC, IO de activación, GPIO, LPTIM, Bluetooth | ~250 us |
| Standby | Reinicio | Reinicio | Retenida, inaccesible | Nivel mantenido | En ejecución | RTC, IO de activación, LPTIM, Bluetooth | ~1 ms |
| Hibernate | Reinicio | Reinicio | No retenida | High-Z | Reinicio | RTC, IO de activación | >2 ms |

</div>

#### 5.2.12. Diseño de activación { #5212-wake-design }

- Conecte a GPIO con capacidad de activación las teclas, las interrupciones táctiles y las interrupciones de sensores que deban despertar el sistema.
- Planifique las señales externas de activación por hardware preferentemente en el rango `PA33` a `PA42` e indique su función en el esquemático.
- Revise el estado de retención de IO, High-Z, pull-up, pull-down y alimentación de periféricos durante Standby y Hibernate.
- Para activar el sistema al conectar USB, se necesita un divisor de VBUS conectado a una GPIO de activación con la tensión IO adecuada.
- Revise conjuntamente la activación por Bluetooth, RTC y señales externas con la política de bajo consumo del firmware.

#### 5.2.13. Validación de bajo consumo { #5213-low-power-validation }

Durante EVT, mida al menos los siguientes estados:

<div align="center"><em>Tabla 5.2-9: Estados y objetivos de validación de bajo consumo</em></div>

<div align="center" markdown>

| Estado | Objetivo de medición |
|:------|:-----------------|
| Apagado / modo de envío | Mida la corriente de fuga del sistema durante el almacenamiento prolongado y compruebe que no haya alimentación inversa desde los periféricos. |
| Hibernate | Compruebe la corriente mínima del sistema cuando no se retiene la SRAM. |
| Standby | Compruebe la retención de IO, las fuentes RTC/activación y la política de activación de Bluetooth. |
| DeepSleep | Compruebe la corriente base en escenarios habituales de espera con conexión. |
| Reposo con pantalla encendida | Compruebe la corriente conjunta de la pantalla, la retroiluminación, el táctil, los sensores y Bluetooth. |
| Carga | Compruebe VBUS, VBAT, el comportamiento térmico, OVP y la ruta de alimentación del sistema. |

</div>

<div align="center"><em>Tabla 5.2-10: Pines externos de activación en Standby/Hibernate</em></div>

<div align="center" markdown>

| Fuente de activación | Pin |
|:------------|:----|
| `WKUP_PIN0` | `PA33` |
| `WKUP_PIN1` | `PA34` |
| `WKUP_PIN2` | `PA35` |
| `WKUP_PIN3` | `PA36` |
| `WKUP_PIN4` | `PA37` |
| `WKUP_PIN5` | `PA38` |
| `WKUP_PIN6` | `PA39` |
| `WKUP_PIN7` | `PA40` |
| `WKUP_PIN8` | `PA41` |
| `WKUP_PIN9` | `PA42` |

</div>

En cada medición, registre la versión del firmware, la tensión de alimentación, el ajuste del simulador de batería, el estado de conexión de los periféricos y de Bluetooth, y la temperatura ambiente.

#### 5.2.14. Referencia completa de los pines de alimentación { #5214-full-power-supply-pin-reference }

Utilice estas tablas para revisar el esquemático pin por pin. Cada una indica las tensiones mínima, típica y máxima, así como la corriente máxima de cada pin de alimentación para una combinación concreta de encapsulado y familia de alimentación. Seleccione la tabla correspondiente al número de pieza exacto que se va a pedir; no mezcle filas de distintos encapsulados o familias de alimentación.

<div align="center"><em>Tabla 5.2-11: Referencia de pines de alimentación de la variante QFN68L con batería</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrada de alimentación VBUS; suministra energía al módulo de carga integrado. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Conexión de batería; un canal GPADC interno también mide la tensión de batería en este pin. |
| `VSYS` | - | 3,0 | - | 150 | Salida de alimentación interna de 3,0 V; añada un condensador externo a tierra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna: no alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna: no alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna: no alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna: no alimente periféricos externos. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada de alimentación del sistema; conéctela a la batería. El umbral de arranque por hardware es 3,45 V y el umbral de apagado por hardware es 2,7 V. El umbral predeterminado de batería baja por software es 3,48 V. Para una fuente de banco de tensión constante, utilice de 3,6 V a 4,7 V; se recomienda 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna. Añada un condensador a tierra y no alimente periféricos externos. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Salida 1 del LDO de 3,3 V; añada un condensador a tierra. Admite 150 mA tras el arranque y está habilitada por defecto. La carga durante el arranque suave no debe superar 30 mA, o el LDO podría no arrancar. Alimenta Flash integrada/externa y `AVDD33_AUD`. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Salida 2 del LDO de 3,3 V; está deshabilitada por defecto y requiere configuración de software. Admite 150 mA tras el arranque; la carga durante el arranque suave no debe superar 30 mA. Alimenta el motor o el panel LCD. |
| `GPADC_VREF` | - | - | - | - | Entrada de referencia GPADC; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

<div align="center"><em>Tabla 5.2-12: Referencia de pines de alimentación de la variante QFN68L de 3,3 V</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación GPIO; esta tabla de referencia muestra la configuración de 3,3 V. Confirme la tensión de E/S para el número de pieza exacto. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medición de tensión de batería; un canal GPADC interno mide aquí dicha tensión. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentación PMU; conéctela a una fuente externa de 3,3 V. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentación analógica; conéctela a una fuente externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna, no alimente periféricos externos. |
| `GPADC_VREF` | - | - | - | - | Entrada de referencia GPADC; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a una fuente externa de 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a una fuente externa de 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

!!! warning "Configuración de VDDIOA para SF32LB57ZUN3N6"
    `SF32LB57ZUN3N6` admite 1,8 V o 3,3 V en `VDDIOA`. El intervalo de 2,97 V a 3,63 V de la tabla genérica QFN68L con alimentación de 3,3 V no se aplica al funcionamiento a 1,8 V; consulte los límites eléctricos de la pieza exacta antes de seleccionar la alimentación de 1,8 V.

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` y `VDDIOA` se conectan al mismo raíl externo de 3,3 V. Utilice una distribución en estrella: lleve la pista de cada pin por separado desde la fuente, sin compartir un tramo común aguas arriba.

<div align="center"><em>Tabla 5.2-13: Referencia de pines de alimentación de la variante QFN80L con batería</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación GPIO; conéctela a una fuente externa de 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medición de tensión de batería; un canal GPADC interno mide aquí dicha tensión. |
| `VSYS` | - | 3,0 | - | 150 | Salida interna de alimentación de 3,0 V; añada un condensador externo a tierra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentación analógica; conéctela a una fuente externa de 3,3 V. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada de alimentación del sistema; conéctela a la batería. El umbral de arranque por hardware es 3,45 V y el umbral de apagado por hardware es 2,7 V. El umbral predeterminado de batería baja por software es 3,48 V. Para una fuente de banco de tensión constante, utilice de 3,6 V a 4,7 V; se recomienda 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna, no alimente periféricos externos. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentación IO SB del SIP; la tensión depende del número de pieza exacto. Si se integra PSRAM en MPI2 o MPI3, conecte este pin a `VDD18_VOUT` de 1,8 V; si se integra Flash NOR, suminístrele 3,3 V externos. |
| `GPADC_VREF` | - | - | - | - | Entrada de referencia GPADC; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

!!! warning "Inconsistencia de la tabla de alimentación QFN80L en la fuente"
    El diagrama de pines QFN80L para la variante alimentada por batería, incluido en la página de descripción general, etiqueta un pin como `VDD33_VOUT1`, mientras que la tabla de alimentación QFN80L de SiFli incluye `VDDIOSB` y no explica la correspondencia entre ambas etiquetas. Además, esa tabla no incluye `VDD33_VOUT1` ni `VDD33_VOUT2`, aunque el diagrama general de alimentación muestra ambos raíles y la misma tabla indica que `AVDD33_AUD` se alimenta desde `VDD33_VOUT1`. La fuente no aclara si estas salidas son accesibles externamente en este encapsulado. Antes de asignar cualquiera de esos raíles o pines, compruebe el pinout del número de pieza concreto y el esquemático de referencia oficial.

<div align="center"><em>Tabla 5.2-14: Referencia de pines de alimentación de la variante QFN80L de 3,3 V</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación GPIO; conéctela a una fuente externa de 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medición de tensión de batería; un canal GPADC interno mide aquí dicha tensión. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; solo para alimentación interna, no alimente periféricos externos. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentación analógica; conéctela a una fuente externa de 3,3 V. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentación PMU; conéctela a una fuente externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna, no alimente periféricos externos. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentación IO SB del SIP; la tensión depende del número de pieza exacto. Si MPI2/MPI3 integra PSRAM, conéctela a `VDD18_VOUT` de 1,8 V; si integra Flash NOR, suministre 3,3 V externos a este pin. |
| `GPADC_VREF` | - | - | - | - | Entrada de referencia GPADC; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a una fuente externa de 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador a tierra y no aplique tensión externa. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a una fuente externa de 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` y `VDDIOA` se conectan al mismo raíl externo de 3,3 V. Utilice una distribución en estrella: lleve la pista de cada pin por separado desde la fuente, sin compartir un tramo común aguas arriba.

<!-- BGA-ONLY -->
<div align="center"><em>Tabla 5.2-15: Referencia de pines de alimentación de la variante BGA112 con batería</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrada de alimentación VBUS; suministra energía al módulo de carga integrado. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Conexión de batería; un canal GPADC interno también mide la tensión de batería en este pin. |
| `VSYS` | - | 3,0 | - | 150 | Salida de alimentación interna de 3,0 V; añada un condensador externo a tierra. Alimenta `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrada de alimentación del sistema; conéctela a la batería. El umbral predeterminado de batería baja por software es 3,48 V. Para una fuente de banco de tensión constante, utilice de 3,6 V a 4,7 V; se recomienda 3,8 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna. Añada un condensador a tierra. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Salida 1 del LDO de 3,3 V; habilitada por defecto. Limite la carga durante el arranque suave a 30 mA; tras el arranque admite hasta 150 mA. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Salida 2 del LDO de 3,3 V; deshabilitada por defecto y habilitada mediante software. Limite la carga durante el arranque suave a 30 mA; tras el arranque admite hasta 150 mA. |
| `PVSS_PMU` | - | - | - | - | Tierra de alimentación de la PMU. |
| `AVSS_PMU` | - | - | - | - | Tierra analógica de la PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrada de alimentación GPIO; use 1,8 V o 3,3 V según el número de pieza exacto. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrada de alimentación IO de la memoria integrada en el encapsulado; conéctela a `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentación de E/S de la memoria integrada en el encapsulado; la tensión depende del número de pieza exacto. Para PSRAM integrada, conéctela a `VDD18_VOUT` (1,8 V); para Flash NOR integrada, conéctela a `VDD33_VOUT1` (3,3 V). |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentación analógica; conéctela a 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Tierra analógica. |
| `GPADC_VREFP` | - | - | - | - | Entrada de referencia positiva GPADC; conecte solo un condensador, no la excite externamente. |
| `GPADC_VREFN` | - | - | - | - | Referencia negativa GPADC; conéctela a tierra. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a `VSYS`. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Tierras de RF. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador, no la excite externamente. |
| `AUD_VREF_GND` | - | - | - | - | Tierra de audio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a `VDD33_VOUT1`. |
| `AVSS33_AUD` | - | - | - | - | Tierra de audio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

<div align="center"><em>Tabla 5.2-16: Referencia de pines de alimentación de la variante BGA112 de 3,3 V</em></div>

<div align="center" markdown>

| Pin de alimentación | Mín. (V) | Típ. (V) | Máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| `VBATS` | 0 | - | 4,7 | 1 | Entrada de medición de tensión de batería; un canal GPADC interno mide aquí dicha tensión. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nodo de conmutación del inductor BUCK; conecte aquí un extremo del inductor. |
| `BUCK_FB` | - | 1,25 | - | 50 | Realimentación BUCK; conecte aquí el otro extremo del inductor y un condensador a tierra. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_RET` | - | 0,9 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `VDD_RTC` | - | 1,1 | - | 1 | Salida del LDO interno; añada un condensador externo. Solo para alimentación interna. |
| `PVDD_PMU` | 2,97 | 3,3 | 3,63 | 400 | Entrada de alimentación PMU; conéctela a una fuente externa de 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Salida LDO de 1,8 V; solo para alimentación interna. Añada un condensador a tierra. |
| `PVSS_PMU` | - | - | - | - | Tierra de alimentación de la PMU. |
| `AVSS_PMU` | - | - | - | - | Tierra analógica de la PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrada de alimentación GPIO; use 1,8 V o 3,3 V según el número de pieza exacto. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrada de alimentación IO de la memoria integrada en el encapsulado; conéctela a `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrada de alimentación de E/S de la memoria integrada en el encapsulado; la tensión depende del número de pieza exacto. Para PSRAM integrada, conéctela a `VDD18_VOUT` (1,8 V); para Flash NOR integrada, suminístrele 3,3 V externos. |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrada de alimentación analógica; conéctela a 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Tierra analógica. |
| `GPADC_VREFP` | - | - | - | - | Entrada de referencia positiva GPADC; conecte solo un condensador, no la excite externamente. |
| `GPADC_VREFN` | - | - | - | - | Referencia negativa GPADC; conéctela a tierra. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrada de alimentación RF; conéctela a una fuente externa de 3,3 V. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Tierras de RF. |
| `AUD_VREF` | - | - | - | - | Entrada de referencia de audio; conecte solo un condensador, no la excite externamente. |
| `AUD_VREF_GND` | - | - | - | - | Tierra de audio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrada de alimentación de audio; conéctela a una fuente externa de 3,3 V. |
| `AVSS33_AUD` | - | - | - | - | Tierra de audio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Salida de polarización del micrófono; conéctela a su alimentación. |

</div>

!!! warning "Rango de tensión de VDDIOA en BGA112"
    La tabla original de SiFli indica para `VDDIOA` un mínimo de 2,97 V, un valor típico de 1,8 V / 3,3 V y un máximo de 3,63 V. La opción de 1,8 V no concuerda con el mínimo indicado. Confirme la especificación eléctrica del número de pieza exacto y no aplique los límites de 2,97–3,63 V a una configuración de 1,8 V sin confirmación.

<!-- /BGA-ONLY -->

Continúe con [Reloj, RF e interfaces de usuario](SF32LB57x_schematic_clock_rf_interfaces.md).
