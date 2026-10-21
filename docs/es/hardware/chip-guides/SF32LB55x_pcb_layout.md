---
icon: lucide/layers
hide:
    - navigation
description: "Pautas de PCB para la MCU SF32LB55x: huella, apilado de capas, reglas generales, trazado de interfaces y lista de comprobación detallada del diseño de PCB."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB55x — Pautas de diseño de PCB { #sf32lb55x-hardware-design-guide-pcb-layout-guidelines }

## 6. Pautas de diseño de PCB { #6-pcb-layout-guidelines }

### 6.1. Huella y apilado de capas { #61-footprint-and-stack-up }

Compruebe el plano mecánico, los requisitos de la huella de montaje y las capacidades de ensamblaje del encapsulado QFN o BGA seleccionado. En el caso de BGA, confirme desde el inicio el trazado de salida de las bolas (fan-out), la estrategia de vías, las reglas de máscara de soldadura y los límites de fabricación.

#### 6.1.1. Referencias de apilado y fabricación { #611-stack-up-and-fabrication }

SiFli recomienda un proceso PTH convencional y una placa de cuatro capas para QFN68L y BGA145. Para BGA169, la referencia recomienda HDI de un paso con vías ciegas/enterradas. Los apilados ilustrados de cuatro y seis capas tienen un espesor final de 0,7 mm ±10%. Son construcciones de referencia, no límites universales; confirme el plano del encapsulado, el espesor final y la capacidad de proceso con el fabricante de PCB.

<div align="center"><em>Tabla 6.1-1: Apilado de referencia PTH de cuatro capas</em></div>

<div align="center" markdown>

| Capa / material | Área de cobre supuesta | Tipo de material | Dk | DF | Espesor teórico (mil) | Espesor teórico (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Máscara de soldadura superior | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Cobre + metalizado L1 | - | Cobre + metalizado | - | - | 0.048 | 0.001219 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| Cobre L2 | - | Cobre | - | - | 0.07 | 0.001778 |
| Núcleo | 70% | No indicado en el diagrama fuente | 4 | 0.017 | 16.1 | 0.408941 |
| Cobre L3 | - | Cobre | - | - | 0.07 | 0.001778 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| Cobre + metalizado L4 | - | Cobre + metalizado | - | - | 0.048 | 0.001219 |
| Máscara de soldadura inferior | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Total teórico | - | - | - | - | 26.736 | 0.679096 |

</div>

El diagrama fuente especifica un espesor final de placa de 0,7 mm ±10%, incluido el metalizado y la máscara de soldadura. Indica 0,048 mil (0,001219 mm) para el cobre más metalizado de L1/L4 y 0,07 mil (0,001778 mm) para el cobre de L2/L3. Estos valores difieren notablemente de la notación habitual del espesor de cobre en PCB. Se transcriben tal como aparecen, no son objetivos de fabricación; solicite confirmación por escrito a SiFli y al fabricante antes de utilizarlos.

<div align="center"><em>Tabla 6.1-2: Apilado de referencia HDI de seis capas</em></div>

<div align="center" markdown>

| Capa / material | Área de cobre supuesta | Tipo de material | Dk | DF | Espesor teórico (mil) | Espesor teórico (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Máscara de soldadura superior | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Cobre + metalizado L1 | - | Cobre + metalizado | - | - | 1.2 | 0.03048 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| Cobre L2 | - | Cobre | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| Cobre L3 | - | Cobre | - | - | 0.7 | 0.01778 |
| Núcleo | 70% | FR-4 CORE | 4.43 | 0.017 | 4 | 0.1016 |
| Cobre L4 | - | Cobre | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| Cobre L5 | - | Cobre | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| Cobre + metalizado L6 | - | Cobre + metalizado | - | - | 1.2 | 0.03048 |
| Máscara de soldadura inferior | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Total teórico | - | - | - | - | 24.8 | 0.629921 |

</div>

El diagrama fuente especifica un espesor final de 0,7 mm ±10% para la placa HDI de seis capas, incluido el metalizado y la máscara de soldadura. El apilado, los parámetros dieléctricos y el espesor teórico son referencias; pida al fabricante que los verifique según los materiales reales, el espesor del cobre y los requisitos de impedancia.

#### 6.1.2. Dimensiones de los patrones de pads { #612-land-pattern-dimensions }

- BGA145/BGA169: bolas de 0,25 mm de diámetro y paso de 0,5 mm; el patrón de referencia muestra una apertura de máscara de soldadura de 0,33 mm y una apertura de pasta de 0,25 mm.
- QFN68L: pads perimetrales de 0,2 × 0,55 mm con paso de 0,35 mm; la referencia indica una apertura de máscara de 0,3 × 0,65 mm y una apertura de pasta de 0,2 × 0,55 mm. El pad expuesto es cuadrado, con un lado nominal de 5,49 mm y un intervalo de 5,39–5,59 mm.

Antes de liberar la huella, compruebe el plano del encapsulado y las reglas de máscara de soldadura y esténcil del fabricante de montaje.

### 6.2. Reglas generales de PCB { #62-general-pcb-rules }

- Mantenga los lazos BUCK cortos y anchos, con la corriente de retorno cerca del lazo de conmutación.
- Mantenga las zonas RF, de cristal, GPADC y audio alejadas de las fuentes conmutadas, los relojes de pantalla, los motores y los cargadores.
- Trace las interfaces de memoria de alta velocidad y pantalla sobre una referencia de tierra continua.
- Coloque la protección ESD cerca de los conectores y trace las señales de modo que pasen primero por el dispositivo de protección.
- Incluya suficientes puntos de prueba para alimentación, arranque, depuración, RF y calibración de producción.

#### 6.2.1. Separaciones de fabricación de referencia { #621-fabrication-clearances }

Los siguientes valores se transcriben de los diagramas de reglas de referencia PTH y HDI de seis capas de SiFli. No sustituyen las reglas vigentes del fabricante para el apilado seleccionado.

<div align="center"><em>Tabla 6.2-1: Separaciones de referencia PTH y HDI de seis capas</em></div>

<div align="center" markdown>

| Regla / separación | PTH de cuatro capas (mm) | HDI de seis capas (mm) |
|:---|---:|---:|
| Ancho de pista: mínimo / recomendado | 0.10 / 0.10 | 0.075 / 0.075 |
| Ancho de pista: máximo | 2.54 | 2.54 |
| Pista-pista, pista-vía, vía-vía | 0.10 | 0.075 |
| Pad/SMD-pista o vía | 0.10 | 0.075 |
| Pad-pad o SMD-pad | 0.10 | 0.10 |
| Cobre-pista, vía, pad o SMD | 0.127 | 0.10 |
| Cobre-cobre | 0.15 | 0.15 |
| Borde de placa-pista, vía, pad, SMD o cobre | 0.25 | 0.20 |
| Taladro-pista o vía | 0.10 | 0.075 |
| Taladro-pad, SMD o cobre | 0.10 | 0.10 |
| Taladro-taladro; cuerpo de componente-cuerpo de componente | 0.10 | 0.10 |

</div>

En la matriz de separaciones para la misma red de cada diagrama fuente, solo algunas celdas indican 0 mm; las celdas en blanco no están especificadas. No deduzca que las combinaciones no indicadas también permiten 0 mm. Confirme todas las reglas con el fabricante antes de liberar el diseño.

#### 6.2.2. Diseño de alimentación y masa { #622-power-and-ground-layout }

- Coloque los inductores y condensadores de los convertidores DC-DC cerca de sus pines. Mantenga BUCK_VSW corto y ancho, reduzca el área del lazo, conecte las masas de los condensadores de salida al plano con varias vías y asegúrese de que la pista de realimentación BUCK_VOUT tenga más de 0,25 mm de ancho. No coloque cobre superficial ni pistas ajenas debajo de un inductor; use un plano de masa continuo en la capa adyacente.
- Coloque los condensadores de PVDD_PMU1 (pin 67) cerca del pin y use una pista de al menos 0,3 mm de ancho. Sitúe los condensadores LDO/IO junto a sus pines; dimensione las pistas según la corriente de carga y manténgalas cortas y anchas cuando el rizado o la estabilidad sean sensibles.
- Conecte directamente el pad expuesto del QFN a la masa principal mediante varias vías, especialmente en las zonas de RF y PMU. En BGA145 y BGA169, las bolas de masa RF son C12, C13, D12 y E13; conéctelas a la masa principal según el [mapa de bolas BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-Ballmap.svg), [mapa de bolas BGA169 del dispositivo 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg) y [mapa de bolas BGA169 del dispositivo 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg). D2 y B3 son bolas de masa de PMU en BGA169; en BGA145, D2 es PA79 y B3 es BUCK2_VOUT. No una bolas de masa distintas con cobre superficial.

**Aclaración sobre la figura original:** El texto original repite E13 en su lista de bolas de masa RF. La [figura de masa RF](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-RF-VSS-PCB.png) identifica AVSS_TRF en C13, AVSS_RRF en E13, AVSS_BB en C12 y AVSS_VCO en D12. Las coordenadas anteriores siguen las etiquetas de la figura; verifíquelas en el mapa de bolas del encapsulado elegido antes de enrutar.

#### 6.2.3. EMI, ESD y protección { #623-emi-esd-and-protection }

Cuando sea posible, lleve por capas internas los relojes y las pistas de alimentación ruidosas. Coloque los dispositivos ESD junto al conector para que cada señal pase por la protección antes de entrar en la placa, sin ramificaciones; use una conexión a masa corta y ancha con una vía directa al plano. En la carga USB, sitúe el punto de prueba en el lado del conector respecto al TVS. En la entrada de batería, coloque el TVS entre el conector y la carga de la placa para que la ruta hacia el chip pase primero por el TVS, y mantenga corta su conexión a masa.

### 6.3. Trazado de interfaces { #63-interface-routing }

Las pistas de reloj deben ser cortas, estar apantalladas y aisladas de las señales digitales rápidas. Trace la señal RF como una línea de 50 Ω con una red de adaptación compacta. Ajuste la longitud de las pistas de memoria y pantalla según su velocidad y agrúpelas por bus. Apantalle las señales de audio y GPADC y manténgalas alejadas de las corrientes de conmutación.

#### 6.3.1. Colocación y trazado de cristales { #631-crystal-placement-and-routing }

- Coloque cada cristal dentro de la zona apantallada, a más de 1 mm del borde de la placa y a más de 5 mm de fuentes de calor como PA, cargador y PMU. Deje al menos 0,25 mm de separación alrededor del cristal.
- Trace las pistas del cristal de 48 MHz en la capa superior, con una longitud de 3–10 mm y un ancho de 0,1 mm. Mantenga al menos 0,15 mm entre 48M_XI y 48M_XO, como muestra el [modelo de trazado original](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png), y apantállelas con masa en tres dimensiones. Aléjelas de VBAT, DC-DC y señales rápidas. El texto original pide una zona sin cobre en las capas superior y adyacente bajo la zona del cristal, y prohíbe que otras pistas la atraviesen.
- Trace las pistas del cristal de 32,768 kHz en la capa superior, con una longitud máxima de 10 mm y un ancho de 0,1 mm. Mantenga XI y XO separados al menos 0,15 mm y apantállelos con masa en tres dimensiones. El texto original pide una zona sin cobre en las capas superior y adyacente bajo la zona del cristal, y prohíbe que otras pistas la atraviesen.

#### 6.3.2. RF e interfaces de alta velocidad { #632-rf-and-high-speed-interfaces }

Coloque la red de adaptación RF cerca del chip, no de la antena. Sitúe el condensador AVDD_BRF junto a su pin y conecte su masa directamente a la masa principal. Trace RF en la capa superior, sin cambios de capa, y controle la impedancia a 50 Ω. El texto original recomienda un ancho superior a 10 mil, mientras que la lista de comprobación original marca ≥10 mil como obligatorio; mantenga esa distinción y determine el ancho final para lograr 50 Ω con la configuración de capas elegida. Use apantallamiento de masa tridimensional y vías de cosido a ambos lados; evite esquinas agudas y mantenga DC-DC, VBAT, relojes e I2C/SPI/SDIO/I2S/UART de alta velocidad alejados de la zona RF.

Trace MIPI_DSI como pares diferenciales de 100 Ω y ajuste la longitud de los pares de datos respecto al par de reloj. Ajuste también la longitud de OPI PSRAM y de los buses LCDC SPI/QSPI. Cuando sea práctico, proteja con masa las pistas de reloj e I2C y evite tramos largos en paralelo con señales no relacionadas.

#### 6.3.3. Trazado analógico { #633-analog-routing }

Apantalle las pistas GPADC con masa en tres dimensiones y aléjelas de las rutas ruidosas de medición de tensión de batería y temperatura. Compruebe la impedancia y las fugas del divisor frente al tiempo de estabilización requerido.

### 6.4. Lista de comprobación del diseño de PCB { #64-pcb-layout-checklist }

Cada tabla cubre un área de revisión del diseño de PCB. Si una tabla no incluye la columna «Aplicable a», la fila corresponde a todas las variantes incluidas en el libro de trabajo.

#### 6.4.1. Encapsulado { #641-package }

<div align="center"><em>Tabla 6.4-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La huella coincide con la especificación del encapsulado | Todas las variantes | Obligatorio |

</div>

#### 6.4.2. Alimentación { #642-power-supply }

<div align="center"><em>Tabla 6.4-2: Lista de comprobación de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La pista de alimentación VDD1 tiene al menos 8 mil de ancho | Todas las variantes | Obligatorio |
| 2 | La pista de alimentación VDD2 tiene al menos 8 mil de ancho | Solo 555 | Obligatorio |
| 3 | Las pistas BUCK1_VSW y BUCK1_VOUT tienen al menos 8 mil de ancho | Todas las variantes | Obligatorio |
| 4 | Las pistas BUCK2_VSW y BUCK2_VOUT tienen al menos 8 mil de ancho | Solo 555 | Obligatorio |
| 5 | La pista LDOVCC2_VOUT tiene al menos 8 mil de ancho | Solo 555 | Opcional |
| 6 | La pista de alimentación AVDD_DSI tiene al menos 8 mil de ancho | Solo 555 | Obligatorio |
| 7 | La pista de alimentación VDD_SIP tiene al menos 6 mil de ancho | Todas las variantes | Obligatorio |
| 8 | La pista de alimentación VDDIOA tiene al menos 10 mil de ancho | Todas las variantes | Obligatorio |
| 9 | La pista de alimentación VDDIOB tiene al menos 10 mil de ancho | Todas las variantes | Obligatorio |

</div>

#### 6.4.3. Colocación de condensadores e inductores de alimentación { #643-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabla 6.4-3: Lista de comprobación de colocación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El condensador VDD1 está cerca del pin | Todas las variantes | Obligatorio |
| 2 | El condensador VDD2 está cerca del pin | Solo 555 | Obligatorio |
| 3 | El inductor BUCK1 está cerca del chip | Todas las variantes | Obligatorio |
| 4 | El condensador BUCK1 está lo más cerca posible del pin del chip | Todas las variantes | Obligatorio |
| 5 | El inductor BUCK2 está cerca del chip | Solo 555 | Obligatorio |
| 6 | El condensador de 0,1 µF de AVDD_DSI está cerca del pin | Solo 555 | Obligatorio |
| 7 | El condensador LDO_VOUT1 está cerca del pin | Todas las variantes | Obligatorio |
| 8 | El condensador LDO_VOUT2 está cerca del pin | Todas las variantes | Obligatorio |
| 9 | El condensador VDD_RET está cerca del pin | Todas las variantes | Obligatorio |
| 10 | El condensador VDD_RTC está cerca del pin | Todas las variantes | Obligatorio |
| 11 | El condensador VDD_SIP está cerca del pin | Todas las variantes | Obligatorio |
| 12 | El condensador AVDD33 está cerca del pin | Todas las variantes | Obligatorio |
| 13 | El condensador AVDD_BRF está cerca del pin | Todas las variantes | Obligatorio |
| 14 | El condensador VDDIOA está cerca del pin | Todas las variantes | Obligatorio |
| 15 | El condensador VDDIOB está cerca del pin | Todas las variantes | Obligatorio |

</div>

#### 6.4.4. Reloj { #644-clock }

<div align="center"><em>Tabla 6.4-4: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El cristal está cerca del chip | Todas las variantes | Obligatorio |
| 2 | Hay apantallamiento GND alrededor del cristal | Todas las variantes | Obligatorio |
| 3 | La lista de comprobación pide una zona sin cobre bajo el cristal: la capa superior en una placa de 4 capas y también las capas 2 y 3 cuando sea necesario | Todas las variantes | Obligatorio |
| 4 | La separación entre las pistas del cristal y el cobre de guarda GND supera 3 veces el ancho de pista | Todas las variantes | Obligatorio |
| 5 | La señal del cristal de 32 kHz no va en paralelo con BUCK1 y hay tierra entre ambas | Todas las variantes | Obligatorio |

</div>

**Aclaración sobre la fuente:** El texto original pide una zona sin cobre en las capas superior y adyacente bajo la zona del cristal; la lista de comprobación menciona la capa superior en placas de 4 capas y las capas 2 y 3 cuando sea necesario. Sin embargo, los [modelos de trazado de 48 MHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) y [32,768 kHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-32K-M-PCB.png) muestran un plano GND en L2 bajo las pistas XI/XO. La fuente no aclara si la zona sin cobre solo corresponde a la huella del cristal o también al área de trazado, ni cómo se relacionan los requisitos por capa. Confirme con SiFli la zona sin cobre requerida antes de liberar el diseño; no la deduzca.

#### 6.4.5. Botones { #645-buttons }

<div align="center"><em>Tabla 6.4-5: Lista de comprobación de botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | El dispositivo de protección ESD del botón está cerca del propio botón | Todas las variantes | Obligatorio |

</div>

#### 6.4.6. RF { #646-rf }

<div align="center"><em>Tabla 6.4-6: Lista de comprobación RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La pista RF cumple el requisito de impedancia característica de 50 Ω en configuración no balanceada (single-ended) | Todas las variantes | Obligatorio |
| 2 | El ancho de la pista RF es ≥10 mil | Todas las variantes | Obligatorio |
| 3 | Disponga una franja de cobre GND de al menos 60 mil de ancho a cada lado de la pista RF y conéctela al plano GND principal mediante suficientes vías de cosido | Todas las variantes | Obligatorio |
| 4 | Reserve espacio para una red de adaptación de antena tipo pi cerca del chip | Todas las variantes | Obligatorio |
| 5 | Hay un plano GND continuo bajo la señal RF | Todas las variantes | Obligatorio |
| 6 | Ninguna pista de señal digital de alta velocidad cruza por debajo de la señal RF | Todas las variantes | Obligatorio |
| 7 | Ninguna pista de alimentación con di/dt alto cruza por debajo de la señal RF | Todas las variantes | Obligatorio |

</div>

#### 6.4.7. Señales de alta velocidad { #647-high-speed-signals }

<div align="center"><em>Tabla 6.4-7: Lista de comprobación de señales de alta velocidad</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Las señales diferenciales DSI cumplen el requisito de impedancia diferencial de 100 Ω | Solo 555 | Obligatorio |
| 2 | La diferencia de longitud entre los pares diferenciales de datos DSI y el par diferencial de reloj no supera 200 mil | Solo 555 | Obligatorio |
| 3 | Las señales DSI se trazan, en la medida de lo posible, en la misma capa | Solo 555 | Obligatorio |
| 4 | La diferencia de longitud de las pistas de señal OPI PSRAM se controla dentro de 200 mil | Solo 555 | Opcional |

</div>

#### 6.4.8. ADC { #648-adc }

<div align="center"><em>Tabla 6.4-8: Lista de comprobación del ADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Evite trazar señales de conmutación rápida en paralelo con la señal GPADC, salvo que esta cuente con una guarda adecuada | Todas las variantes | Obligatorio |
| 2 | Las resistencias del divisor de tensión de batería están cerca del pin de entrada del chip | Todas las variantes | Obligatorio |
| 3 | La señal de detección de tensión de la batería debe tomarse del conector de batería y contar con guarda de tierra | Todas las variantes | Obligatorio |
| 4 | Evite trazar señales de conmutación rápida en paralelo con la señal SDMADC, salvo que esta cuente con una guarda adecuada | Solo 555 | Opcional |

</div>

#### 6.4.9. Puntos de prueba { #649-test-points }

<div align="center"><em>Tabla 6.4-9: Lista de comprobación de puntos de prueba</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La ubicación de los puntos de prueba permite medirlos con una sonda o soldarlos a un útil de prueba | Todas las variantes | Obligatorio |
| 2 | Los pads de prueba para descarga de programa y calibración del cristal (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD, etc.) tienen un diámetro mínimo de 0,8 mm, están separados 2 mm y disponen de una zona libre de componentes de 2 mm a su alrededor | Todas las variantes | Obligatorio |

</div>

#### 6.4.10. Tierra { #6410-ground }

<div align="center"><em>Tabla 6.4-10: Lista de comprobación de tierra</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Las capas adyacentes al chip principal forman un plano de tierra principal completo, con suficientes vías de conexión a tierra | Todas las variantes | Obligatorio |
| 2 | El pad expuesto (EPAD) está conectado a la tierra principal mediante vías | Todas las variantes | Obligatorio |
| 3 | El área bajo el chip tiene suficientes vías conectadas al plano de tierra principal | Todas las variantes | Obligatorio |
| 4 | Hay un anillo de vías de tierra alrededor del borde de la placa | Todas las variantes | Obligatorio |

</div>
