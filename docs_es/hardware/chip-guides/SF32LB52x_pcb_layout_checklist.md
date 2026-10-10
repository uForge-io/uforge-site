---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de comprobación punto por punto para revisar el diseño de PCB del MCU SF32LB52x. Incluye verificaciones de encapsulado, trazado, alimentación y masa."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware SF32LB52x — Lista de comprobación del diseño de PCB { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte de la guía de diseño de hardware SF32LB52x"
    Esta página cubre el apartado 6.15, la lista de comprobación punto por punto del diseño de PCB. Vuelva a las [Pautas de diseño de PCB](SF32LB52x_pcb_layout.md).

## 6.15. Lista de comprobación del diseño de PCB { #615-pcb-layout-checklist }

La lista de PCB original no incluye una columna «Aplicable a». Aplique cada comprobación solo si la variante y el circuito elegidos incluyen el pin, la línea de alimentación o la función indicados; marque las funciones ausentes como no aplicables. Conserve las categorías Obligatorio/Opcional del original, pero no interprete Opcional como permiso para omitir un componente exigido por las especificaciones del dispositivo.

!!! note "Tratamiento del cobre del cristal en la fuente"
    El punto 3 de reloj de la lista no aclara qué capas deben tener una zona de exclusión de cobre. La nota de aplicación de las variantes con batería se contradice: su sección de reloj pide retirar el plano GND de L2 bajo el cristal, pero la sección de trazado de PCB prohíbe los huecos en planos y los recortes de cobre en la capa superior y las adyacentes, y muestra GND continuo en L2; la guía independiente de diseño de PCB repite la prohibición de huecos. Confirme con SiFli el tratamiento específico del apilado antes de liberar el diseño; no lo deduzca solo de la lista.

!!! note "Comprobaciones del ancho de pista"
    La hoja de cálculo especifica VCC ≥12 mil, pistas BUCK ≥10 mil y RF ≥10 mil. El apartado 6 contiene indicaciones más estrictas para VCC y BUCK y recomienda RF >10 mil. Cumpla ambos conjuntos de requisitos aplicables, incluida la impedancia RF de 50 Ω; el mínimo de la lista no sustituye las indicaciones detalladas de trazado.

### 6.15.1. Encapsulado { #6151-package }

<div align="center"><em>Tabla 6.15.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La huella de PCB coincide con la especificación del encapsulado | Obligatorio |

</div>

### 6.15.2. Trazado de la alimentación { #6152-power-supply-routing }

<div align="center"><em>Tabla 6.15.2-1: Lista de comprobación del trazado de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | <span class="flag-red">Ancho de la pista de alimentación VBUS ≥16 mil</span> | Obligatorio |
| 2 | <span class="flag-red">Ancho de la pista de alimentación VBAT ≥16 mil</span> | Obligatorio |
| 3 | <span class="flag-red">Ancho de la pista de alimentación VCC ≥12 mil</span> | Obligatorio |
| 4 | Ancho de la pista de alimentación LDO2_OUT ≥10 mil | Obligatorio |
| 5 | Ancho de la pista de alimentación LDO3_OUT ≥8 mil | Obligatorio |
| 6 | <span class="flag-red">Ancho de las pistas PMU_BUCK_VSW y PMU_BUCK_VOUT ≥10 mil</span> | Obligatorio |
| 7 | Ancho de la pista de alimentación AVDD_BRF ≥8 mil | Obligatorio |
| 8 | <span class="flag-red">Ancho de la pista de alimentación AVDD33_AUD ≥8 mil</span> | Obligatorio |

</div>

### 6.15.3. Colocación de condensadores e inductores de alimentación { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabla 6.15.3-1: Lista de comprobación de la colocación de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el condensador de VBUS cerca del pin | Obligatorio |
| 2 | Coloque el condensador de VBAT cerca del pin | <span class="flag-red">Opcional</span> |
| 3 | Coloque el condensador de VCC cerca del pin | Obligatorio |
| 4 | Coloque el condensador de LDO2_OUT cerca del pin | <span class="flag-red">Opcional</span> |
| 5 | Coloque el condensador de LDO3_OUT cerca del pin | <span class="flag-red">Opcional</span> |
| 6 | Coloque el condensador de VSYS cerca del pin | Obligatorio |
| 7 | Coloque el inductor BUCK cerca del chip | <span class="flag-red">Opcional</span> |
| 8 | Coloque el condensador de desacoplo BUCK lo más cerca posible del pin del chip | Obligatorio |
| 9 | Coloque el condensador de VDD_HPSYS cerca del pin | Obligatorio |
| 10 | Coloque el condensador de VDD_LPSYS cerca del pin | Obligatorio |
| 11 | Coloque el condensador de VDD_RET cerca del pin | Obligatorio |
| 12 | Coloque el condensador de VDD_RTC cerca del pin | Obligatorio |
| 13 | Coloque el condensador de AVDD_BRF cerca del pin | Obligatorio |
| 14 | Coloque el condensador de AVDD<span class="flag-red">33</span>_AUD cerca del pin | Obligatorio |

</div>

### 6.15.4. Reloj { #6154-clock }

<div align="center"><em>Tabla 6.15.4-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el cristal cerca del chip | Obligatorio |
| 2 | Disponga un apantallamiento GND alrededor del cristal | Obligatorio |
| 3 | Confirme con SiFli el tratamiento del cobre del cristal para el apilado seleccionado; consulte la nota sobre discrepancias entre fuentes | Obligatorio |
| 4 | Mantenga una separación entre el borde de cada pista del cristal y el cobre GND adyacente superior a 1,5 veces el ancho de pista | Obligatorio |
| 5 | Mantenga una separación ≥0,15 mm entre las pistas XI/XO paralelas del cristal de 32,768 kHz | Obligatorio |

</div>

### 6.15.5. Botones { #6155-buttons }

<div align="center"><em>Tabla 6.15.5-1: Lista de comprobación de los botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Coloque el dispositivo de protección ESD del botón cerca de este | Obligatorio |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>Tabla 6.15.6-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La pista RF cumple el requisito de impedancia característica de 50 Ω en configuración no balanceada (single-ended) | Obligatorio |
| 2 | Ancho de la pista RF ≥10 mil | Obligatorio |
| 3 | Disponga al menos 60 mil de cobre de masa a cada lado de la pista RF y conéctelo a la masa principal mediante suficientes vías | Obligatorio |
| 4 | Coloque cerca del chip la red de adaptación en π prevista para la antena | Obligatorio |
| 5 | Mantenga un plano GND continuo debajo de la señal RF | Obligatorio |
| 6 | No pase pistas de señal digital de alta velocidad por debajo de la señal RF | Obligatorio |
| 7 | No pase pistas de alimentación con alta di/dt por debajo de la señal RF | Obligatorio |

</div>

### 6.15.7. Audio { #6157-audio }

<div align="center"><em>Tabla 6.15.7-1: Lista de comprobación de audio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | ADCP dispone de apantallamiento tridimensional de masa | Obligatorio |
| 2 | DACP/DACN se trazan como par diferencial con apantallamiento tridimensional de masa | Obligatorio |
| 3 | Mantenga las pistas DACP/DACN lo bastante cortas para que la capacitancia parásita sea inferior a 10 pF | Obligatorio |
| 4 | Proteja con masa el trazado de alimentación AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD y aléjelo de señales de alta corriente y fuerte interferencia | Obligatorio |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>Tabla 6.15.8-1: Lista de comprobación de ADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | No permita que una señal de alta velocidad discurra en paralelo con la señal GPADC sin protección de masa | Obligatorio |

</div>

### 6.15.9. Puntos de prueba { #6159-test-points }

<div align="center"><em>Tabla 6.15.9-1: Lista de comprobación de puntos de prueba</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | La ubicación de los puntos de prueba permite el contacto de una sonda o una conexión soldada al útil de pruebas | Obligatorio |
| 2 | Los puntos de prueba para programar y descargar el firmware (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34, etc.) cumplen los requisitos de tamaño y ubicación del útil de pruebas | Obligatorio |

</div>

### 6.15.10. Masa { #61510-ground }

<div align="center"><em>Tabla 6.15.10-1: Lista de comprobación de masa</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Categoría |
|:---|:---|:---|
| 1 | Las capas adyacentes al chip principal forman un plano de masa principal completo con suficientes vías de masa | Obligatorio |
| 2 | Conecte la almohadilla expuesta (EPAD) a la masa principal mediante vías | Obligatorio |
| 3 | Disponga suficientes vías de masa bajo el chip y conéctelas al plano de masa principal | Obligatorio |
| 4 | <span class="flag-red">Coloque una hilera de vías de masa alrededor del borde de la placa</span> | Obligatorio |

</div>
