---
icon: lucide/list-checks
description: "Lista de comprobación para revisar, punto por punto, el esquemático de la MCU SF32LB52x: encapsulado, alimentación, reloj, RF, almacenamiento, pantalla y fabricación."
hide:
    - navigation
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware SF32LB52x — Lista de comprobación del esquemático { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página cubre la sección 5.8, con los puntos de comprobación del esquemático. Vuelva a [Sistema mínimo, alimentación y reloj](SF32LB52x_schematic_design.md), la primera de las tres páginas de directrices de diseño del esquemático.

## 5.8. Lista de comprobación del esquemático { #58-schematic-checklist }

Cada tabla cubre un bloque funcional del esquemático. La columna «Aplicable a» indica la variante de alimentación o revisión de silicio a la que se aplica cada punto cuando no afecta a todas las variantes.

«Obligatorio» exige revisar el punto cuando sea aplicable, no incorporar todos los periféricos enumerados. Los puntos condicionales solo se aplican cuando el circuito o la función correspondiente está presente. Conserve las categorías Obligatorio/Opcional de la fuente y distinga las recomendaciones de los límites que deben cumplirse.

### 5.8.1. Encapsulado { #581-package }

<div align="center"><em>Tabla 5.8.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El encapsulado de la referencia seleccionada es correcto, incluidos los nombres y números de los pines | Todas las variantes | Obligatorio |

</div>

### 5.8.2. Alimentación { #582-power-supply }

<div align="center"><em>Tabla 5.8.2-1: Lista de comprobación de la alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La tensión de alimentación de VBUS es de <span class="flag-red">4,6 V–5,5 V</span> | Solo 520/3/5/7 | Obligatorio |
| 2 | Si la pantalla debe encenderse en cuanto se conecta el cargador, no se recomienda el cargador interno; se recomienda un CI de carga externo con gestión de la ruta de alimentación | Solo 520/3/5/7 | Obligatorio |
| 3 | El cargador interno solo se puede usar si es aceptable exigir que la batería se cargue hasta 3,6 V antes de que el software encienda la pantalla | Solo 520/3/5/7 | Obligatorio |
| 4 | Se recomienda un dispositivo OVP con salida LDO integrada (por ejemplo, LP5305AQVF): salida LDO de 4,7–5,4 V, corriente de salida ≥0,5 A y umbral de disparo de protección contra sobrecorriente ≥0,7 A | Solo 520/3/5/7 | Obligatorio |
| 5 | Si el dispositivo OVP tiene OVLO ajustable, se usan resistencias del divisor con tolerancia del 1 % y el error de V_OVLO_TH es inferior al 3 %; tanto el mínimo como el máximo de V_OVP deben quedar dentro de 5,15–5,55 V. La fuente identifica 5,15 V como la tensión máxima de entrada del cargador y 5,55 V como el límite superior de entrada del cargador 52x; consulte la nota de discrepancia tras la tabla | Solo 520/3/5/7 | Obligatorio |
| 6 | Si no se usa el cargador integrado en el chip, VBUS puede dejarse sin conectar y se puede omitir su condensador. Sin embargo, VBAT ya no podrá usarse como salida de alimentación; en ese caso, se conecta un condensador externo de 1 µF a VBAT | Solo 520/3/5/7 | Obligatorio |
| 7 | Para medir la tensión de la batería, el chip ya conecta internamente un canal GPADC a VBAT (o VBATS); no se debe conectar además VBAT a un pin GPADC | Todas las variantes | Obligatorio |
| 8 | <span class="flag-red">La tensión de alimentación de los pines VCC y VBAT es de 3,2 V–4,7 V</span> | Solo 520/3/5/7 | Obligatorio |
| 9 | Las conexiones BUCK_LX y BUCK_FB son correctas | Todas las variantes | Obligatorio |
| 10 | La salida VDD_VOUT1 tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todas las variantes | Obligatorio |
| 11 | La salida VDD_VOUT2 tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todas las variantes | Obligatorio |
| 12 | La salida VDD_RET tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todas las variantes | Obligatorio |
| 13 | La salida VDD_RTC tiene un punto de prueba o un condensador de filtro en una ubicación adecuada para medir la tensión | Todas las variantes | Obligatorio |
| 14 | AVDD_BRF se alimenta a través de VSYS | Solo 520/3/5/7 | Obligatorio |
| 15 | AVDD33_AUD se alimenta a través de LDO2 | Solo 520/3/5/7 | Obligatorio |
| 16 | VSYS es una alimentación de uso interno de la MCU; no se utiliza para alimentar otros periféricos | Solo 520/3/5/7 | Obligatorio |
| 17 | Se recomienda usar LDO2_OUT para la memoria, los sensores y otros periféricos similares; se puede añadir un interruptor de carga para controlar la alimentación | Solo 520/3/5/7 | Obligatorio |
| 18 | <span class="flag-red">La suma de las corrientes pico de todos los periféricos alimentados desde LDO2 no supera 150 mA</span> | Solo 520/3/5/7 | Obligatorio |
| 19 | Se recomienda usar LDO3_OUT para alimentar el motor de vibración | Solo 520/3/5/7 | Obligatorio |
| 20 | <span class="flag-red">La suma de las corrientes pico de todos los periféricos alimentados desde LDO3 no supera 150 mA</span> | Solo 520/3/5/7 | Obligatorio |
| 21 | La pantalla LCD requiere una alimentación LDO dedicada de bajo Iq | Todas las variantes | Obligatorio |
| 22 | Se recomienda alimentar el LED del sensor de frecuencia cardíaca desde VBAT | Todas las variantes | Obligatorio |
| 23 | La entrada de carga requiere un circuito OVP | Todas las variantes | Obligatorio |
| 24 | Si la batería tiene una tensión demasiado baja y el sistema debe alimentarse desde los 5 V de la entrada del cargador, se recomienda un CI de carga con gestión de la ruta de alimentación; <span class="flag-red">la tensión aplicada a VCC no debe superar 4,7 V</span> | Solo 520/3/5/7 | Obligatorio |
| 25 | <span class="flag-red">SF32LB52DUB6: PVDD = 1,8 V</span> | Solo 52D | Obligatorio |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6: PVDD = 3,3 V</span> | 52B/E/G/J | Obligatorio |
| 27 | <span class="flag-red">SF32LB52BU36 y SF32LB52BU56: VDD_SIP requiere una alimentación externa de 3,3 V</span> | Solo 52B | Obligatorio |
| 28 | <span class="flag-red">SF32LB52DUB6: VDD_SIP requiere una alimentación externa de 1,8 V</span> | Solo 52D | Obligatorio |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6: VDD_SIP no necesita alimentación externa; basta con un condensador externo</span> | 52E/G/J | Obligatorio |
| 30 | VBATS es la señal de detección de tensión de la batería; el rango de detección es de 0–4,5 V | 52B/D/E/G/J | Obligatorio |

</div>

!!! important "Los umbrales OVP no son los límites de funcionamiento de VBUS"
    La lista de comprobación de la fuente indica 5,15–5,55 V para seleccionar un OVLO ajustable en el punto 5, mientras que el punto 1 reproduce la comprobación de VBUS de 4,6–5,5 V del libro de comprobación. No interprete 5,55 V como una tensión continua admisible en VBUS. La [explicación del sistema de alimentación](SF32LB52x_schematic_design.md#52-power-system) detalla las diferencias entre fuentes y cita un rango de selección OVP distinto de la nota de aplicación. Antes de aceptar el diseño, confirme con SiFli los umbrales y los límites de funcionamiento del dispositivo elegido.

!!! note "Origen y alcance de los valores de VBUS"
    Electrical Specification-A3 indica un rango de alimentación VBUS de 4,5–5,5 V. La nota de aplicación de las variantes con batería indica 4,6–5,5 V en su tabla de alimentación y exige al menos 4,6 V en el pin VBUS con la corriente máxima de carga. Estos valores corresponden a contextos distintos; al comprobar la tensión mínima en el chip, tenga en cuenta la tolerancia de la alimentación y la caída de tensión.

### 5.8.3. Condensadores e inductores de alimentación { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabla 5.8.3-1: Lista de comprobación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Condensador de VBUS ≥10 µF | Solo 520/3/5/7 | Obligatorio |
| 2 | Condensador de VBAT ≥4,7 µF | Solo 520/3/5/7 | Obligatorio |
| 3 | En SF32LB523/5/7, el pin 24 es VCC; se conecta un condensador externo ≥10 µF | 523/5/7 | Obligatorio |
| 4 | En las variantes 523/5/7/B/D/E/G/J, <span class="flag-red">el pin 23 es VDD_SIP; se conecta un condensador externo ≥2,2 µF</span> | 523/5/7/B/D/E/G/J | Obligatorio |
| 5 | En SF32LB520, el pin 24 es una GPIO: PA21 | 520/SS6500 | Obligatorio |
| 6 | En SF32LB520, el pin 23 es VCC; se conecta un condensador externo ≥10 µF | 520/SS6500 | Obligatorio |
| 7 | Condensador de BUCK_FB = 4,7 µF | Todas las variantes | Obligatorio |
| 8 | Condensador de VDD_VOUT1 = 4,7 µF | Todas las variantes | Obligatorio |
| 9 | Condensador de VDD_VOUT2 = 4,7 µF | Todas las variantes | Obligatorio |
| 10 | Condensador de VDD_RET = 0,47 µF | Todas las variantes | Obligatorio |
| 11 | Condensador de VDD_RTC = 1 µF | Todas las variantes | Obligatorio |
| 12 | <span class="flag-red">La capacitancia total de VDD33_VOUT1 es ≤9,6 µF</span> | <span class="flag-red">Solo 520/3/5/7</span> | Obligatorio |
| 13 | <span class="flag-red">La capacitancia total de VDD33_VOUT2 es ≤9,6 µF</span> | <span class="flag-red">Solo 520/3/5/7</span> | Obligatorio |
| 14 | <span class="flag-red">La capacitancia total de VSYS es ≤9,6 µF</span> | <span class="flag-red">Solo 520/3/5/7</span> | Obligatorio |
| 15 | Condensador de MIC_BIAS = 1 µF | Todas las variantes | Obligatorio |
| 16 | <span class="flag-red">Condensador de AVDD_BRF = 4,7 µF</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 17 | <span class="flag-red">Condensador de AVDD33_AUD = 2,2 µF</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 18 | Condensador de AUD_VREF = 1 µF | Todas las variantes | Obligatorio |
| 19 | <span class="flag-red flag-yellow">Condensador de VSYS = 4,7 µF</span> | <span class="flag-red flag-yellow">Solo 520/3/5/7</span> | Obligatorio |
| 20 | Condensador de GPADC VREFP = 4,7 µF | Todas las variantes | Obligatorio |
| 21 | La referencia del inductor BUCK figura en la [lista de proveedores aprobados de SiFli][SiFli Approved Vendor List] (AVL) | Todas las variantes | Obligatorio |
| 22 | Si el inductor BUCK no figura en la AVL, cumple L = 4,7 µH, DCR ≤0,4 Ω e Isat ≥450 mA | Todas las variantes | Obligatorio |
| 23 | <span class="flag-red">Si hay GPS u otros periféricos sensibles a interferencias, se reserva una huella para un condensador en derivación a tierra en BUCK_LX; el valor se determina mediante pruebas reales</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 24 | <span class="flag-red">Se registra la corriente en reposo del DCDC seleccionado y se confirma que cumple los requisitos del proyecto</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 25 | <span class="flag-red">Se registra la corriente en reposo del LDO seleccionado y se confirma que cumple los requisitos del proyecto</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |

</div>

!!! note "Aplicabilidad del pin 24 en la fuente"
    El texto del punto 3 sobre condensadores menciona SF32LB520/3/5/7, pero la columna «Aplicable a» lo limita a 523/5/7. Los puntos 5 y 6 identifican, en cambio, el pin 24 de SF32LB520 como PA21 y el pin 23 como VCC. Esta tabla sigue la aplicabilidad más restringida del punto 3; confirme el pinout de la referencia exacta antes de aprobar la revisión.

### 5.8.4. Reloj { #584-clock }

<div align="center"><em>Tabla 5.8.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El cristal principal de 48 MHz figura en la AVL | Todas las variantes | Obligatorio |
| 2 | Si el cristal de 48 MHz no figura en la AVL, cumple 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), tolerancia de frecuencia ≤±10 ppm y ESR ≤30 Ω (22 Ω recomendado) | Todas las variantes | Obligatorio |
| 3 | El cristal RTC de 32,768 kHz figura en la AVL | Todas las variantes | Obligatorio |
| 4 | Si el cristal de 32,768 kHz no figura en la AVL, cumple CL ≤12,5 pF (7 pF recomendado), tolerancia de frecuencia ≤±20 ppm y ESR ≤80 kΩ (38 kΩ recomendado) | Todas las variantes | Obligatorio |
| 5 | En el 52x, PA24/25/26/27 pueden emitir la señal de reloj xtal32k | Todas las variantes | Obligatorio |

</div>

### 5.8.5. Configuración de arranque { #585-bootstrap-configuration }

<div align="center"><em>Tabla 5.8.5-1: Lista de comprobación de la configuración de arranque</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Si se utiliza una memoria externa <span class="flag-purple">SPI NOR, PA13 y PA17 no necesitan resistencias pull-up</span> | Todas las variantes | Obligatorio |
| 2 | Si se utiliza una memoria externa <span class="flag-red">SPI NAND</span>, PA13 no necesita pull-up y <span class="flag-red">PA17 requiere una resistencia pull-up de 7,5 kΩ</span> a VDD de la memoria | Todas las variantes | Obligatorio |
| 3 | Si se utiliza una memoria externa <span class="flag-blue">SD NAND</span>, PA17 no necesita pull-up y <span class="flag-blue">PA13 requiere una resistencia pull-up de 7,5 kΩ</span> a VDD de la memoria | Todas las variantes | Obligatorio |
| 4 | Si se utiliza una memoria externa <span class="flag-green">eMMC, PA13 y PA17 requieren resistencias pull-up de 7,5 kΩ</span> a VCCQ de la eMMC | <span class="flag-red">52D/E/G/J</span> | Obligatorio |

</div>

### 5.8.6. RF { #586-rf }

<div align="center"><em>Tabla 5.8.6-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se indica en la señal ANT el requisito de impedancia característica de 50 Ω en modo single-ended | Todas las variantes | Obligatorio |
| 2 | Se reserva una red de adaptación en π para ANT: un condensador paralelo NC (no montar) y un condensador en serie de 15 pF | Todas las variantes | Obligatorio |
| 3 | Si es necesario filtrar emisiones espurias, se reserva una red de adaptación en π con un inductor en serie de 2,7 nH y un condensador paralelo de 2 pF | Todas las variantes | Opcional |
| 4 | <span class="flag-red">Si se requiere control externo de PA/LNA, PA00 se conecta a RX_EN y PA01 a TX_EN</span> | Todas las variantes | Opcional |

</div>

### 5.8.7. Asignación de recursos de E/S { #587-io-resource-allocation }

<div align="center"><em>Tabla 5.8.7-1: Lista de comprobación de la asignación de recursos de E/S</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se proporciona una tabla de asignación de recursos GPIO que coincide con el esquemático | Todas las variantes | Obligatorio |
| 2 | La asignación de GPIO de la tabla de recursos coincide con el esquemático | Todas las variantes | Obligatorio |
| 3 | La asignación real de GPIO sigue las recomendaciones de SiFli (consulte el archivo de configuración de E/S del HDK) | Todas las variantes | Obligatorio |

</div>

### 5.8.8. Despertar por hardware { #588-hardware-wake-up }

<div align="center"><em>Tabla 5.8.8-1: Lista de comprobación del despertar por hardware</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Las fuentes de interrupción de despertar son correctas (fuentes disponibles: PA24–PA27 y PA34–PA44, 15 pines en total)</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |

</div>

### 5.8.9. Almacenamiento { #589-storage }

<div align="center"><em>Tabla 5.8.9-1: Lista de comprobación del almacenamiento</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Si MPI2 (SD1) se conecta a una memoria SPI NOR: <span class="flag-red">PA13 (MPI D1) y PA17 (MPI D3) no necesitan resistencias pull-up</span> | Todas las variantes | Obligatorio |
| 2 | Si MPI2 (SD1) se conecta a una memoria SPI NAND: <span class="flag-red">PA13 (MPI D1) no necesita pull-up; PA17 (MPI D3) requiere una resistencia pull-up de 7,5 kΩ</span> | Todas las variantes | Obligatorio |
| 3 | Si MPI2 (SD1) se conecta a una memoria SD NAND: <span class="flag-red">PA13 (SD D3) requiere una resistencia pull-up de 7,5 kΩ; PA17 (SD D1) no necesita pull-up; PA15 (SD CMD) requiere una resistencia pull-up de 7,5 kΩ</span> | Todas las variantes | Obligatorio |
| 4 | Si MPI2 (SD1) se conecta a una eMMC: <span class="flag-red">PA13 (SD D3) y PA17 (SD D1) requieren resistencias pull-up de 7,5 kΩ; PA15 (SD CMD) también requiere una resistencia pull-up de 7,5 kΩ</span> | <span class="flag-red">52D/E/G/J</span> | Obligatorio |
| 5 | El almacenamiento externo de SF32LB520 y SF32LB52B debe ser memoria SPI NOR | 520/B | Obligatorio |
| 6 | Si hay requisitos de consumo en apagado, <span class="flag-red">la alimentación de la memoria Flash externa se conmuta mediante PA11</span>, nivel alto para encender y nivel bajo para apagar | Solo 520/3/5/7 | Obligatorio |
| 7 | Si hay requisitos de consumo en apagado, <span class="flag-red">la alimentación de la memoria Flash externa se conmuta mediante PA21</span>, nivel alto para encender y nivel bajo para apagar | <span class="flag-red">52B/D/E/G/J</span> | Obligatorio |
| 8 | Si hay requisitos de consumo en apagado, <span class="flag-red">la alimentación VDD_SIP se conmuta mediante PA21</span>, nivel alto para encender y nivel bajo para apagar | <span class="flag-red">52B/D/E/G/J</span> | Obligatorio |
| 9 | <span class="flag-red">Cuando MPI controla una memoria NOR de 32 MB o más, su alimentación debe poder conmutarse mediante PA21 para apagarla</span> | <span class="flag-red">52B/D/E/G/J</span> | Obligatorio |
| 10 | Si SD1 se conecta a un dispositivo SD NAND, las señales están conectadas correctamente | Todas las variantes | Obligatorio |
| 11 | <span class="flag-red">Las líneas CLK y de datos de la memoria Flash tienen resistencias en serie de 33 Ω</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 12 | <span class="flag-red">Al usar dos memorias NOR externas, se comparten CLK/D0–D3. El CS de la primera memoria se conecta a PA12 y el de la segunda a PA26. Como este pin tiene un pull-up interno, es adecuado para una señal CS activa en bajo: durante el reinicio permanece en alto (memoria no seleccionada).</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 13 | <span class="flag-red">Al usar dos memorias NOR externas, la primera debe ser de 16 MB; la segunda puede ser de 8 MB o 16 MB</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 14 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |
| 15 | <span class="flag-red">La NOR Flash seleccionada figura como validada en la guía de selección de componentes clave; de lo contrario, es posible que la ROM no la reconozca y el sistema no arranque</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 16 | <span class="flag-red">La SPI/SD NAND Flash seleccionada figura como validada en la guía de selección de componentes clave; de lo contrario, es posible que la ROM no la reconozca y el sistema no arranque</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |

</div>

### 5.8.10. Pantalla { #5810-display }

<div align="center"><em>Tabla 5.8.10-1: Lista de comprobación de la pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Si se conecta una pantalla QSPI, las señales están conectadas correctamente | Todas las variantes | Obligatorio |
| 2 | Si se conecta una pantalla con interfaz 8080, las señales están conectadas correctamente | Todas las variantes | Obligatorio |
| 3 | Si se conecta una pantalla JDI, las señales están conectadas correctamente | Todas las variantes | Obligatorio |
| 4 | Las señales QSPI de la LCD están conectadas correctamente; <span class="flag-red">las líneas CLK y de datos tienen resistencias en serie de 100 Ω</span> | Todas las variantes | Obligatorio |
| 5 | La señal RSTB de la LCD está conectada correctamente (se recomienda PA0) | Todas las variantes | Obligatorio |
| 6 | La señal TE de LCDC está conectada correctamente (a la señal TE o Fmark del panel) | Todas las variantes | Obligatorio |
| 7 | Las señales TP siguen la asignación de pines recomendada (consulte el archivo de configuración de E/S de la EVB) | Todas las variantes | Obligatorio |
| 8 | Se confirma si se requiere compatibilidad con pantalla siempre encendida | Todas las variantes | Obligatorio |
| 9 | La pantalla se alimenta mediante un LDO de bajo Iq; <span class="flag-red">se recomienda usar PA30 para controlar la habilitación del LDO</span> | Todas las variantes | Obligatorio |
| 10 | Se confirma si la alimentación de TP y LCD debe ser independiente o puede compartir el mismo control | Todas las variantes | Obligatorio |
| 11 | Si la LCD integra un sensor de luz, también se suministra alimentación a dicho sensor | Todas las variantes | Obligatorio |
| 12 | Control de la retroiluminación TFT: si se enciende con nivel alto y se apaga con nivel bajo (activo en alto), se usa una GPIO con pull-down (PD); si se enciende con nivel bajo y se apaga con nivel alto (activo en bajo), se usa una GPIO con pull-up (PU) | Todas las variantes | Obligatorio |
| 13 | <span class="flag-red">LCD SPI: modo de 3 hilos: CS a PA03, CLK a PA04 y DATA a PA05; modo de 4 hilos: CS a PA03, CLK a PA04, DATA a PA05 y DC a PA06</span> | Todas las variantes | Obligatorio |
| 14 | Pantalla Sharp Memory/JDI en la interfaz JDI de la MCU: VCOM y VB se conectan a PA24 de la MCU; VA a PA25; R0/G0/B0 a R1/G1/B1 de la MCU; R1/G1/B1 a R2/G2/B2 de la MCU; GSP a VST; BSP a HST; GCK a VCK; BCK a HCK; GEN a ENB; e INTB a XRST | Todas las variantes | Obligatorio |
| 15 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>Tabla 5.8.11-1: Lista de comprobación de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La entrada GPADC está conectada al pin correspondiente <span class="flag-red">(PA28–PA34; 7 GPIO admiten la función GPADC)</span> | Todas las variantes | Opcional |
| 2 | La tensión de entrada de GPADC se mantiene entre 0 y 3,3 V | Todas las variantes | Opcional |
| 3 | Para toda entrada con divisor resistivo que mida GPADC, se usan resistencias divisoras con tolerancia del 1 %; <span class="flag-red">cada canal GPADC cuenta con un condensador de filtro de 100 nF colocado cerca del pin del chip</span> | Todas las variantes | Obligatorio |

</div>

### 5.8.12. Botones { #5812-buttons }

<div align="center"><em>Tabla 5.8.12-1: Lista de comprobación de los botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se confirma si es necesario despertar el sistema mediante los botones | Todas las variantes | Obligatorio |
| 2 | La conexión de los botones normales es correcta (resistencia pull-up, valor adecuado y dominio de tensión correcto) | Todas las variantes | Obligatorio |
| 3 | El botón de encendido usa PA34, es activo en alto y provoca un reinicio tras mantenerlo pulsado durante 10 segundos; <span class="flag-red">la resistencia pull-down de 10 kΩ debe estar en la placa principal</span> | Todas las variantes | Obligatorio |
| 4 | Todas las señales de los botones cuentan con protección ESD | Todas las variantes | Obligatorio |

</div>

### 5.8.13. Protección EOS y ESD { #5813-eos-and-esd-protection }

<div align="center"><em>Tabla 5.8.13-1: Lista de comprobación de la protección EOS y ESD</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La interfaz de carga incluye protección EOS, ESD y OVP | Todas las variantes | Obligatorio |
| 2 | La interfaz de la batería cuenta con un dispositivo de protección ESD | Todas las variantes | Obligatorio |
| 3 | La interfaz de antena cuenta con un dispositivo de protección ESD | Todas las variantes | Obligatorio |
| 4 | Las interfaces de alimentación de la LCD y TP cuentan con dispositivos de protección ESD | Todas las variantes | Obligatorio |
| 5 | Las líneas I2C, RST e INT de TP cuentan con dispositivos de protección ESD | Todas las variantes | Obligatorio |
| 6 | La interfaz de alimentación y las líneas de señal del sensor de frecuencia cardíaca cuentan con dispositivos de protección ESD | Todas las variantes | Obligatorio |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabla 5.8.14-1: Lista de comprobación de I2C</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | I2C cuenta con resistencias pull-up del valor adecuado; para funcionar a 400 kHz se recomiendan resistencias de 2,2 kΩ. Se usa el dominio de tensión del periférico y, al apagarlo, también se desconecta la alimentación de las pull-up | Todas las variantes | Obligatorio |
| 2 | Cuando sea necesario, la señal de interrupción de I2C permite el despertar por hardware | Todas las variantes | Obligatorio |
| 3 | Los periféricos I2C, como el acelerómetro, el sensor de frecuencia cardíaca y el magnetómetro, permiten leer todos los datos en una sola transferencia en ráfaga | Todas las variantes | Obligatorio |
| 4 | Si varios dispositivos comparten un bus I2C, sus direcciones son distintas | Todas las variantes | Obligatorio |

</div>

### 5.8.15. Audio analógico { #5815-analog-audio }

<div align="center"><em>Tabla 5.8.15-1: Lista de comprobación del audio analógico</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión del micrófono MEMS es correcta | Todas las variantes | Opcional |
| 2 | El micrófono MEMS se alimenta desde MIC_BIAS | Todas las variantes | Opcional |
| 3 | La conexión del micrófono analógico ECM single-ended es correcta | Todas las variantes | Opcional |
| 4 | El micrófono analógico ECM single-ended se alimenta desde MIC_BIAS | Todas las variantes | Opcional |
| 5 | Todas las entradas ADC de audio tienen un condensador de acoplamiento de al menos 2,2 µF | Todas las variantes | Opcional |
| 6 | Las salidas DAC de audio DACP y DACN tienen cada una una resistencia en serie de 1 kΩ cerca del chip, y un condensador de 1,5 nF conectado en paralelo entre DACP y DACN | Todas las variantes | Opcional |
| 7 | <span class="flag-red">Se recomienda el amplificador de potencia de audio AW8155B, configurado por software en modo Class A/B; cualquier otro amplificador requiere validación mediante pruebas</span> | Todas las variantes | Opcional |
| 8 | <span class="flag-red">Si no se usa la ruta ADC de audio analógico integrada en el chip, se recomienda conectar ADCP a tierra mediante una resistencia de 0 Ω</span> | Todas las variantes | Opcional |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>Tabla 5.8.16-1: Lista de comprobación de SPI</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión SPI es correcta: el SDO de la MCU se conecta al SDI del periférico y el SDI de la MCU al SDO del periférico | Todas las variantes | Opcional |
| 2 | Se cumplen los requisitos de temporización del periférico SPI | Todas las variantes | Opcional |
| 3 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Opcional |

</div>

### 5.8.17. USART e interfaz de depuración { #5817-usart-and-debug-interface }

<div align="center"><em>Tabla 5.8.17-1: Lista de comprobación de USART e interfaz de depuración</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | PA18/PA19 (multiplexados como DBG_UART) forman la interfaz de descarga de programas y depuración; se reservan puntos de prueba <span class="flag-red">con una resistencia en serie de 100 Ω</span> | Todas las variantes | Obligatorio |
| 2 | Al conectar un dispositivo, RXD de la MCU se conecta a TXD del periférico y TXD de la MCU a RXD del periférico | Todas las variantes | Obligatorio |
| 3 | Si PA35/PA36 se multiplexan como UART hacia un periférico, durante el reinicio de la MCU el periférico conectado debe estar apagado o el software debe forzar estos pines a nivel bajo | Todas las variantes | Obligatorio |
| 4 | El nivel lógico de E/S del periférico coincide con el del chip principal | Todas las variantes | Obligatorio |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>Tabla 5.8.18-1: Lista de comprobación de PWM</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se recomienda usar PA1 para controlar la retroiluminación de la LCD | Todas las variantes | Opcional |
| 2 | Se usa PA20 como pin PWM del motor de vibración | Todas las variantes | Obligatorio |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>Tabla 5.8.19-1: Lista de comprobación de USB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La conexión de la interfaz USB es correcta | Todas las variantes | Opcional |
| 2 | La interfaz USB cuenta con protección ESD | Todas las variantes | Opcional |
| 3 | Si USB permanece habilitado durante el funcionamiento normal (sin suspensión), el host puede detectar la conexión y desconexión. Si se necesita detectar estos eventos mientras la MCU duerme, se añade un divisor de VBUS que aplique al pin de despertar de la MCU un nivel compatible con la tensión de E/S; se recomienda compartir este pin con la detección de conexión del cargador | Todas las variantes | Opcional |

</div>

### 5.8.20. Consumo de energía { #5820-power-consumption }

<div align="center"><em>Tabla 5.8.20-1: Lista de comprobación del consumo de energía</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Los componentes LDO/DCDC tienen habilitación activa en alto; si la salida debe estar apagada por defecto, se añade una resistencia pull-down de 1 MΩ a 5,1 MΩ entre EN y tierra, dimensionada según los requisitos de consumo del producto | Todas las variantes | Obligatorio |
| 2 | La conmutación de alimentación con MOSFET usa una combinación PMOS+NMOS; el pin de control enciende con nivel alto y apaga con nivel bajo, con una resistencia pull-down de 1 MΩ entre el pin y tierra | Todas las variantes | Obligatorio |
| 3 | El interruptor de alimentación de la memoria Flash externa se controla mediante PA11 | Solo 520/3/5/7 | Obligatorio |
| 4 | <span class="flag-red">Los interruptores de alimentación de la Flash externa y de VDD_SIP se controlan ambos mediante PA21</span> | <span class="flag-red">52A/D</span>[^52a-note] | No especificado en la fuente[^52a-category-note] |
| 5 | Si VSYS se usa para alimentar los pull-up de GPIO, permanece siempre encendida; confirmar que esto cumple los requisitos de consumo | Solo 520/3/5/7 | Obligatorio |
| 6 | Si LDO2 o LDO3 alimenta los pull-up de GPIO, confirmar que apagar el LDO correspondiente sigue cumpliendo los requisitos de diseño | Solo 520/3/5/7 | Obligatorio |
| 7 | Para evitar corrientes de fuga, conmutar la alimentación de los pull-up de I2C junto con la alimentación de E/S del periférico | Todas las variantes | Obligatorio |
| 8 | Nota sobre PA09: se pone a nivel alto para habilitar al encender la pantalla y a nivel bajo durante la suspensión | Revisiones de silicio A2 y anteriores | Obligatorio |
| 9 | Se define y registra el requisito de corriente de reposo en modo Deep Sleep | Todas las variantes | Obligatorio |
| 10 | <span class="flag-red">Se registra la suma de las corrientes de reposo de todos los periféricos seleccionados en modo Deep Sleep y se confirma que cumple los requisitos del proyecto</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |
| 11 | Se define y registra el requisito de corriente de reposo en modo Standby | Todas las variantes | Obligatorio |
| 12 | <span class="flag-red">Se registra la suma de las corrientes de reposo de todos los periféricos seleccionados en modo Standby y se confirma que cumple los requisitos del proyecto</span> | <span class="flag-red">Todas las variantes</span> | Obligatorio |

[^52a-note]: La hoja de cálculo original indica «52A/52D». La [guía de diseño de hardware del SF32LB52x][SF32LB52x Hardware Design Guide - Dev] describe las variantes SF32LB52B/D/E/G/J; la etiqueta «52A» no identifica ninguna de ellas. Confirme la referencia exacta y su hoja de datos antes de aplicar esta fila; no sustituya automáticamente «52A» por otro modelo.
[^52a-category-note]: La fuente deja en blanco la categoría de esta fila. Se conserva como «No especificado en la fuente», sin asignarle la categoría Obligatorio u Opcional. Confirme su aplicabilidad y el criterio de aceptación para el dispositivo elegido.

!!! important "Discrepancia entre fuentes sobre el pin del interruptor de alimentación del almacenamiento"
    Esta tabla conserva la entrada PA11 del libro de comprobación para la conmutación de la Flash externa en SF32LB520/3/5/7. Según la prioridad de fuentes de este proyecto, prevalecen las guías de aplicación de OpenSiFli y la guía de diseño de esquemáticos, de mayor prioridad, que especifican PA21 para la conmutación de la alimentación del almacenamiento de arranque; use PA21 como criterio respaldado por las fuentes y no adopte PA11 basándose solo en el libro de menor prioridad. El libro no aclara si PA11 es una habilitación independiente a nivel de placa o un conflicto de asignación de pines. Confirme con SiFli la red y la variante exactas antes de la liberación.

</div>

### 5.8.21. Puntos de prueba para descarga y depuración { #5821-download-and-debug-test-points }

<div align="center"><em>Tabla 5.8.21-1: Lista de comprobación de puntos de prueba para descarga y depuración</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Se reservan puntos de prueba para descarga de programas y depuración en VBAT, GND, PA18 (DBG_UART_RXD), PA19 (DBG_UART_TXD), VSYS, PA34 y señales similares | Todas las variantes | Obligatorio |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
