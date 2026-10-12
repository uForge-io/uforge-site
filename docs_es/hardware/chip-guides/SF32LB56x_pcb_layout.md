---
icon: lucide/layers
description: "Directrices de diseño de PCB para la MCU SF32LB56x: huella, apilado de capas, trazado crítico y lista de comprobación punto por punto."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# Guía de diseño de hardware SF32LB56x — Directrices de diseño de PCB { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Parte de la guía de diseño de hardware SF32LB56x"
    Esta página recoge el apartado 6, Directrices de diseño de PCB. Vuelva a [Diseño del esquemático](SF32LB56x_schematic_design.md) o continúe con la [Lista de comprobación de revisión del diseño y referencias](SF32LB56x_review_and_reference.md).

## 6. Directrices de diseño de PCB { #6-pcb-layout-guidelines }

### 6.1. Huella y apilado de capas { #61-footprint-and-stack-up }

La variante U utiliza un encapsulado QFN68L de 68 pines, de 7 × 7 × 0,75 mm y con un paso de 0,35 mm. QFN admite PTH; SiFli recomienda una estructura PTH de cuatro capas, con todos los pines enrutados hacia fuera desde la capa superior. La variante V utiliza un WBBGA de 175 bolas, de 6,5 × 6,1 × 0,94 mm, con paso de bola de 0,4 mm y diámetro de 0,25 mm. No admite PTH y requiere HDI. Enrute hacia fuera las dos filas exteriores de bolas por la capa superior y las demás por capas internas. Antes de liberar el diseño de PCB, confirme que el fabricante admite el apilado, la máscara antisoldante y la estrategia de salida de pistas desde el encapsulado.

### 6.2. Trazado crítico { #62-critical-routing }

#### 6.2.1. Trazado del reloj { #621-clock-routing }

Coloque los cristales dentro del blindaje, a más de 1 mm del borde de la placa y, preferiblemente, a 5 mm o más de componentes que generen calor, como PA, cargador y PMU. Mantenga al menos 0,25 mm libres de otros metales y componentes alrededor del circuito del cristal. Enrute el cristal de 48 MHz por la capa superior cuando sea posible; limite la longitud a 3–10 mm y use pistas de 0,075 mm con blindaje de masa tridimensional. Aléjelo de VBAT, DC-DC y señales de alta velocidad. Enrute el cristal de 32,768 kHz por la capa superior, con longitud máxima de 10 mm, ancho de 0,075 mm y separación mínima de 0,15 mm entre 32K_XI y 32K_XO. Mantenga despejadas la capa superior y la capa adyacente bajo ambos cristales; no permita que otras pistas crucen esa zona.

#### 6.2.2. Trazado RF { #622-rf-routing }

Enrute RF como una pista de impedancia controlada de 50 Ω en configuración no balanceada, de preferencia con un ancho superior a 10 mil y por la capa superior; evite vías y esquinas agudas. Coloque la red de adaptación junto al chip, no junto a la antena. Sitúe el condensador de filtro AVDD_BRF cerca del pin del chip y conecte su masa directamente al plano principal mediante una vía. Disponga un blindaje de masa continuo y vías de cosido a ambos lados de la pista RF. No coloque alimentación de alto di/dt, relojes de alta velocidad ni señales I2C, SPI, SDIO, I2S o UART dentro de la zona RF o debajo de ella. Conecte firmemente a masa principal AVSS_RF1/2/3 de la variante U y AVSS_RRF, AVSS_TRF, AVSS_TRF2 y AVSS_BB de la variante V.

#### 6.2.3. Alimentación y masa { #623-power-and-ground }

Coloque el inductor BUCK y los condensadores de filtro cerca de los pines del chip. Mantenga corta y ancha la pista BUCK_LX; la pista BUCK_FB debe tener un ancho mínimo de 0,25 mm. No vierta cobre en la capa superior bajo el inductor; mantenga un plano de masa íntegro en la capa adyacente y no pase otras pistas por la zona del inductor. Conecte las masas de los condensadores de salida BUCK al plano principal con varias vías. Sitúe el condensador PVDD junto a su pin y enrute PVDD con un trazado corto y ancho; conecte PVSS a masa principal mediante vías. Coloque los condensadores de desacoplo de LDO y E/S cerca de sus pines y dimensione las pistas de alimentación según la corriente de carga.

!!! warning "Límites contradictorios para el ancho de PVDD"
    La guía de aplicación de hardware SF32LB56xU/V especifica un ancho mínimo de 0,5 mm para PVDD, mientras que la lista de comprobación de PCB correspondiente especifica 8 mil. Los valores difieren; confirme con SiFli o con el responsable del diseño de PCB cuál es el requisito aplicable antes de congelar el diseño.

#### 6.2.4. Audio y señales analógicas { #624-audio-and-analog-signals }

Enrute AVDD33_ANA y AVDD33_AUD como alimentaciones en estrella independientes, con guardas de masa, y manténgalas alejadas de fuentes de ruido de alta corriente. Coloque los condensadores de filtro AVDD33_AUD, MIC_BIAS y AUD_VREF junto a sus pines correspondientes y conecte su masa directamente a la masa principal. Enrute ADCP/ADCN como un par diferencial corto, protegido con guardas de masa, y sitúe los componentes asociados cerca del chip. Enrute DACP/DACN como par diferencial, con capacitancia parásita inferior a 10 pF y longitud inferior a 2 cm, lejos de interferencias intensas. Proteja las pistas GPADC con guardas de masa y aléjelas de fuentes ruidosas como las señales de medición de batería y temperatura.

#### 6.2.5. USB y SDIO { #625-usb-and-sdio }

Enrute USB D+/D− (PA17/PA18) como par diferencial de 90 Ω protegido por masa. Coloque los dispositivos ESD cerca del conector y haga pasar las señales por ellos antes de llegar al chip; no derive la señal antes del dispositivo de protección. Conecte la masa del dispositivo a la masa principal mediante pistas cortas y anchas y vías. La variante U dispone de una interfaz SDIO; la variante V dispone de SDIO1 y SDIO2. Enrute juntas las señales SDIO, con una longitud total máxima de 50 mm y un desajuste de longitud dentro del grupo de hasta 6 mm. Apantalle el reloj con masa y proteja con masa las señales DATA y CMD.

#### 6.2.6. EMI, ESD y puntos de prueba { #626-emi-esd-and-test-points }

Evite tramos largos en capas superficiales, fuera del blindaje, para señales ruidosas de reloj y alimentación; use capas internas cuando sea posible. Coloque los dispositivos TVS/ESD cerca del conector correspondiente. Enrute cada señal primero por el dispositivo de protección y conecte su pad de masa a la masa principal con pistas cortas y anchas y vías. Sitúe el punto de prueba del cable de carga USB antes de su TVS y coloque el TVS del conector de batería antes de la plataforma de batería, de modo que las líneas externas pasen por el TVS antes de llegar al chip. Conecte adecuadamente la red de masa bajo el chip al plano de masa principal mediante vías ciegas/enterradas.

### 6.3. Lista de comprobación del diseño de PCB { #63-pcb-layout-checklist }

Cada tabla corresponde a un área de revisión del diseño de PCB. Si no aparece una columna «Aplicable a», la fila se aplica a todas las variantes contempladas en el documento de origen.

#### 6.3.1. Encapsulado { #631-package }

<div align="center"><em>Tabla 6.3-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La huella coincide con las especificaciones del encapsulado | Obligatorio |

</div>

#### 6.3.2. Alimentación { #632-power-supply }

<div align="center"><em>Tabla 6.3-2: Lista de comprobación de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Ancho de la pista de alimentación PVDD de al menos 8 mil | Obligatorio |
| 2 | Ancho de las pistas BUCK_LX y BUCK_FB de al menos 8 mil | Obligatorio |
| 3 | Ancho de la pista de alimentación VDDIO1 de al menos 5 mil | Obligatorio |
| 4 | Ancho de la pista de alimentación VDDIO2 de al menos 8 mil | Obligatorio |
| 5 | Ancho de la pista de alimentación VDDIO3 de al menos 5 mil | Obligatorio |
| 6 | Ancho de la pista de alimentación VDDIO4 de al menos 6 mil | Obligatorio |
| 7 | Ancho de la pista de alimentación VDDIOSC de al menos 6 mil | Obligatorio |
| 8 | Ancho de la pista de alimentación AVDD33_ANA de al menos 6 mil | Obligatorio |
| 9 | Ancho de la pista de alimentación AVDD33_AUD de al menos 5 mil | Obligatorio |

</div>

#### 6.3.3. Colocación de condensadores e inductores de alimentación { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabla 6.3-3: Lista de comprobación de la colocación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el condensador PVDD cerca del pin | Obligatorio |
| 2 | Coloque el inductor BUCK cerca del chip | Obligatorio |
| 3 | Coloque el condensador de desacoplo BUCK lo más cerca posible del pin del chip | Obligatorio |
| 4 | Coloque el condensador LDO1_VOUT cerca del pin | Obligatorio |
| 5 | Coloque el condensador LDO2_VOUT cerca del pin | Obligatorio |
| 6 | Coloque el condensador VDD_RET cerca del pin | Obligatorio |
| 7 | Coloque el condensador VDD_RTC cerca del pin | Obligatorio |
| 8 | Coloque el condensador VDDIO1 cerca del pin | Obligatorio |
| 9 | Coloque el condensador VDDIO2 cerca del pin | Obligatorio |
| 10 | Coloque el condensador VDDIO3 cerca del pin | Obligatorio |
| 11 | Coloque el condensador VDDIO4 cerca del pin | Obligatorio |
| 12 | Coloque el condensador AVDD33_ANA cerca del pin | Obligatorio |
| 13 | Coloque el condensador AVDD33_AUD cerca del pin | Obligatorio |

</div>

#### 6.3.4. Reloj { #634-clock }

<div align="center"><em>Tabla 6.3-4: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el cristal cerca del chip | Obligatorio |
| 2 | Disponga un apantallamiento GND alrededor del cristal | Obligatorio |
| 3 | Mantenga una zona sin cobre bajo el cristal (placa PTH de 4 capas: capa superior; placa HDI de 6 capas: capa superior y capa 2) | Obligatorio |
| 4 | Mantenga una separación entre el relleno de masa y las pistas del cristal superior a 1,5 veces el ancho de pista | Obligatorio |
| 5 | Separe las dos pistas paralelas del cristal de 32 kHz más de 2 veces la separación entre pistas | Obligatorio |

</div>

#### 6.3.5. Botones { #635-buttons }

<div align="center"><em>Tabla 6.3-5: Lista de comprobación de los botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el dispositivo de protección ESD del botón cerca de este | Obligatorio |

</div>

#### 6.3.6. RF { #636-rf }

<div align="center"><em>Tabla 6.3-6: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La pista RF cumple el requisito de impedancia característica de 50 Ω en configuración no balanceada | Obligatorio |
| 2 | Ancho de la pista RF ≥ 10 mil | Obligatorio |
| 3 | Disponga al menos 60 mil de cobre de masa a cada lado de la pista RF y conéctelo a la masa principal con suficientes vías de cosido | Obligatorio |
| 4 | Coloque cerca del chip la red π de adaptación de antena prevista | Obligatorio |
| 5 | Mantenga un plano GND continuo debajo de la señal RF | Obligatorio |
| 6 | No pase pistas de señal digital de alta velocidad por debajo de la señal RF | Obligatorio |
| 7 | No pase pistas de alimentación con alta di/dt por debajo de la señal RF | Obligatorio |
| 8 | Refuerce la conexión a masa de AVSS_RF1, AVSS_RF2 y AVSS_RF3 y conéctelos al plano de masa principal | Obligatorio |

</div>

#### 6.3.7. Audio { #637-audio }

<div align="center"><em>Tabla 6.3-7: Lista de comprobación de audio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Trace AU_ADCP/AU_ADCN como un par diferencial con protección de masa | Obligatorio |
| 2 | Trace AU_DACP/AU_DACN como un par diferencial con protección de masa | Obligatorio |
| 3 | Mantenga las pistas AU_DACP/AU_DACN lo bastante cortas para que la capacitancia parásita sea inferior a 10 pF | Obligatorio |
| 4 | Proteja con masa las pistas de alimentación AVDD33_ANA y AVDD33_AUD, aléjelas de señales ruidosas de alta corriente, use un trazado en estrella y mantenga cada pista con una longitud mínima de 5 mm | Obligatorio |
| 5 | Conecte AVSS al plano de masa principal mediante vías | Obligatorio |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>Tabla 6.3-8: Lista de comprobación de ADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Ninguna señal de alta velocidad discurre en paralelo con la señal GPADC sin protección de masa | Obligatorio |
| 2 | Coloque las resistencias divisoras de tensión de batería cerca del pin de entrada del chip | Obligatorio |

</div>

#### 6.3.9. Puntos de prueba { #639-test-points }

<div align="center"><em>Tabla 6.3-9: Lista de comprobación de puntos de prueba</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La ubicación de los puntos de prueba es adecuada para medir con una sonda o soldar un útil de pruebas | Obligatorio |
| 2 | Los puntos de prueba para grabación y calibración del cristal incluyen VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD y uno de los pines PB20/PB21/PB25; también VDDIO2 y VDDIO3 o VDDIO4 para U, o VDDIOA y VDDIOB para V, y cumplen los requisitos de tamaño y ubicación del útil | Obligatorio |

</div>

#### 6.3.10. Masa { #6310-ground }

<div align="center"><em>Tabla 6.3-10: Lista de comprobación de masa</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Las capas adyacentes al chip principal forman un plano de masa principal completo con suficientes vías de masa | Obligatorio |
| 2 | Conecte PVSS a la masa principal mediante vías | Obligatorio |
| 3 | Disponga suficientes vías de masa bajo el chip y conéctelas al plano de masa principal | Obligatorio |
| 4 | Disponga una hilera de vías de masa alrededor del borde de la placa | Obligatorio |

</div>
