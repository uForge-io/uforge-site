---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de comprobación punto por punto del diseño de PCB de la MCU SF32LB58x: encapsulado, alimentación, reloj, RF, audio, señales de alta velocidad y apilado de capas."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware SF32LB58x — Lista de comprobación del diseño de PCB { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte de la guía de diseño de hardware SF32LB58x"
    Esta página recoge el apartado 6.18, la lista de comprobación punto por punto del diseño de PCB. Vuelva a las [Pautas de diseño de PCB](SF32LB58x_pcb_layout.md).

## 6.18. Lista de comprobación del diseño de PCB { #618-pcb-layout-checklist }

Cada tabla cubre un área de revisión del diseño de PCB. Si no aparece una columna «Aplicable a», las comprobaciones se aplican a todos los diseños de PCB SF32LB58x incluidos en esta lista.

### 6.18.1. Encapsulado { #6181-package }

<div align="center"><em>Tabla 6.18.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La huella de la PCB coincide con las especificaciones del encapsulado | Obligatorio |

</div>

### 6.18.2. Alimentación { #6182-power-supply }

<div align="center"><em>Tabla 6.18.2-1: Lista de comprobación de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Ancho de la pista de alimentación VDD1 de al menos 8 mil | Obligatorio |
| 2 | Ancho de la pista de alimentación VDD2 de al menos 8 mil | Obligatorio |
| 3 | Ancho de las pistas BUCK1_VSW y BUCK1_VOUT de al menos 8 mil | Obligatorio |
| 4 | Ancho de las pistas BUCK2_VSW y BUCK2_VOUT de al menos 8 mil | Obligatorio |
| 5 | Ancho de la pista de alimentación VDDIOA de al menos 10 mil | Obligatorio |
| 6 | Ancho de la pista de alimentación VDDIOA2 de al menos 10 mil | Obligatorio |
| 7 | Ancho de la pista de alimentación VDDIOB de al menos 10 mil | Obligatorio |
| 8 | Ancho de la pista de alimentación VDDIOSA de al menos 6 mil | Obligatorio |
| 9 | Ancho de la pista de alimentación VDDIOSB de al menos 6 mil | Obligatorio |
| 10 | Ancho de la pista de alimentación VDDIOSC de al menos 6 mil | Obligatorio |
| 11 | Ancho de la pista de alimentación AVDD33_USB de al menos 6 mil | Obligatorio |
| 12 | Ancho de la pista de alimentación AVDD33_ANA de al menos 6 mil | Obligatorio |
| 13 | Ancho de la pista de alimentación AVDD_BRF de al menos 8 mil | Obligatorio |
| 14 | Ancho de la pista de alimentación AVDD33_AUD de al menos 6 mil | Obligatorio |
| 15 | Ancho de la pista de alimentación AVDD33_DSI de al menos 8 mil | Obligatorio |

</div>

### 6.18.3. Colocación de condensadores e inductores de alimentación { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabla 6.18.3-1: Lista de comprobación de la colocación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el condensador de VDD1 cerca del pin | Obligatorio |
| 2 | Coloque el condensador de VDD2 cerca del pin | Obligatorio |
| 3 | Coloque el inductor BUCK1 cerca del chip | Obligatorio |
| 4 | Coloque el condensador BUCK1 lo más cerca posible del pin del chip | Obligatorio |
| 5 | Coloque el inductor BUCK2 cerca del chip | Obligatorio |
| 6 | Coloque el condensador BUCK2 lo más cerca posible del pin del chip | Obligatorio |
| 7 | Coloque el condensador HPSYS_LDO_VOUT cerca del pin | Obligatorio |
| 8 | Coloque el condensador LPMU_VDD07_RET cerca del pin | Obligatorio |
| 9 | Coloque el condensador LPMU_VDD11_RTC cerca del pin | Obligatorio |
| 10 | Coloque el condensador VDDIOA cerca del pin | Obligatorio |
| 11 | Coloque el condensador VDDIOA2 cerca del pin | Obligatorio |
| 12 | Coloque el condensador VDDIOB cerca del pin | Obligatorio |
| 13 | Coloque el condensador VDDIOSA cerca del pin | Obligatorio |
| 14 | Coloque el condensador VDDIOSB cerca del pin | Obligatorio |
| 15 | Coloque el condensador VDDIOSC cerca del pin | Obligatorio |
| 16 | Coloque el condensador AVDD33_USB cerca del pin | Obligatorio |
| 17 | Coloque el condensador AVDD33_ANA cerca del pin | Obligatorio |
| 18 | Coloque el condensador AVDD_BRF cerca del pin | Obligatorio |
| 19 | Coloque el condensador AVDD33_AUD cerca del pin | Obligatorio |
| 20 | Coloque el condensador AVDD33_DSI cerca del pin | Obligatorio |

</div>

### 6.18.4. Reloj { #6184-clock }

<div align="center"><em>Tabla 6.18.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el cristal cerca del chip | Obligatorio |
| 2 | Disponga un apantallamiento GND alrededor del cristal | Obligatorio |
| 3 | Mantenga sin cobre la zona bajo el cristal. En una PCB de 4 capas, aplique la zona de exclusión como mínimo en las capas 1 (superior), 2 y 3 | Obligatorio |
| 4 | Mantenga una separación entre las pistas del cristal y el cobre de guarda GND superior a 3 veces el ancho de pista | Obligatorio |

</div>

!!! warning "Confirme con SiFli las capas de exclusión de cobre del cristal"
    El libro de comprobación de origen pide dejar sin cobre las capas 1, 2 y 3 en una PCB de cuatro capas. La [guía de diseño de PCB](SF32LB58x_pcb_layout.md#65-clock-interface-routing) especifica la capa superior y la capa adyacente bajo cada zona de cristal. Las fuentes difieren sobre si debe incluirse la capa 3; no deduzca el requisito definitivo sin confirmarlo con SiFli.

### 6.18.5. Botones { #6185-buttons }

<div align="center"><em>Tabla 6.18.5-1: Lista de comprobación de los botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el dispositivo de protección ESD del botón cerca de este | Obligatorio |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>Tabla 6.18.6-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La pista RF cumple el requisito de impedancia característica de 50 Ω en modo single-ended | Obligatorio |
| 2 | Ancho de la pista RF ≥10 mil | Obligatorio |
| 3 | Reserve cerca del chip una huella para una red de adaptación de antena de tipo π | Obligatorio |
| 4 | Mantenga un plano GND continuo debajo de la señal RF | Obligatorio |
| 5 | No pase pistas de señal digital de alta velocidad por debajo de la señal RF | Obligatorio |
| 6 | No pase pistas de alimentación con alta di/dt por debajo de la señal RF | Obligatorio |

</div>

### 6.18.7. Audio { #6187-audio }

<div align="center"><em>Tabla 6.18.7-1: Lista de comprobación de audio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Las pistas paralelas AU_ADC1P y AU_ADC1N tienen protección de masa | Obligatorio |
| 2 | Las pistas paralelas AU_ADC2P y AU_ADC2N tienen protección de masa | Obligatorio |
| 3 | Las pistas paralelas AU_DAC1P y AU_DAC1N tienen protección de masa | Obligatorio |
| 4 | Las pistas paralelas AU_DAC2P y AU_DAC2N tienen protección de masa | Obligatorio |
| 5 | La capacitancia de las pistas AU_DAC1P, AU_DAC1N, AU_DAC2P y AU_DAC2N es &lt; 10 pF, y su longitud es &lt; 2 cm | Obligatorio |

</div>

!!! warning "Las fuentes discrepan sobre la longitud máxima de las pistas DAC"
    Este libro de trabajo especifica una longitud de pista DAC inferior a 2 cm (20 mm), mientras que la [guía de diseño de PCB](SF32LB58x_pcb_layout.md#67-audio-interface-routing) indica menos de 2 mm. Los límites difieren por un factor de diez. No elija un límite sin confirmarlo con SiFli.

### 6.18.8. Señales de alta velocidad { #6188-high-speed-signals }

<div align="center"><em>Tabla 6.18.8-1: Lista de comprobación de señales de alta velocidad</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Las señales diferenciales DSI cumplen el requisito de impedancia diferencial de 100 Ω | Obligatorio |
| 2 | La longitud de los pares diferenciales de datos DSI está ajustada a la del par diferencial de reloj con una tolerancia de 200 mil | Obligatorio |
| 3 | Trace las señales DSI, en la medida de lo posible, en una misma capa | Obligatorio |

</div>

!!! warning "Las fuentes discrepan sobre el límite entre pares diferenciales DSI"
    Este libro de trabajo exige que los pares diferenciales de datos DSI coincidan con el par diferencial de reloj dentro de 200 mil (5,08 mm). La [guía de diseño de PCB](SF32LB58x_pcb_layout.md#610-dsi-interface-routing) limita el desfase entre pares a ≤2 mm y el desfase dentro de cada par a ≤0,5 mm. Confirme con SiFli el límite aplicable entre pares antes de cerrar el diseño.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>Tabla 6.18.9-1: Lista de comprobación de ADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Evite enrutar señales de conmutación rápida en paralelo con la señal GPADC; si no puede evitarlo, aplique una guarda de masa adecuada | Obligatorio |
| 2 | Coloque las resistencias divisoras de tensión de batería cerca del pin de entrada del chip | Obligatorio |
| 3 | Evite enrutar señales de conmutación rápida en paralelo con la señal SDMADC; si no puede evitarlo, aplique una guarda de masa adecuada | Opcional |

</div>

### 6.18.10. Puntos de prueba { #61810-test-points }

<div align="center"><em>Tabla 6.18.10-1: Lista de comprobación de puntos de prueba</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La ubicación de los puntos de prueba permite medir con una sonda o soldar un útil de prueba | Obligatorio |
| 2 | Los puntos de prueba para la grabación/descarga y la calibración del cristal (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD, etc.) cumplen los requisitos de tamaño y ubicación del útil | Obligatorio |

</div>

### 6.18.11. Apilado de capas de PCB { #61811-pcb-stack-up }

<div align="center"><em>Tabla 6.18.11-1: Lista de comprobación del apilado de capas de PCB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La capa adyacente al chip principal debe ser un plano de masa principal continuo | Obligatorio |

</div>
