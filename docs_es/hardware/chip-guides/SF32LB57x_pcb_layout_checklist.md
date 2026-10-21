---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de comprobación punto por punto para revisar el diseño de PCB de la MCU SF32LB57x: encapsulado, alimentación, reloj, RF, pantalla, audio y GPADC."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware SF32LB57x — Lista de comprobación del diseño de PCB { #sf32lb57x-hardware-design-guide-pcb-layout-checklist }

!!! note "Parte de la guía de diseño de hardware SF32LB57x"
    Esta página reúne los puntos de comprobación de PCB del apartado 6.10 a partir de las tablas oficiales de autocomprobación del diseño de SiFli. Vuelva a las [directrices de diseño de PCB](SF32LB57x_pcb_layout.md).

## 6.10. Lista de comprobación del diseño de PCB { #610-pcb-layout-checklist }

La mayoría de las reglas de diseño siguientes se aplican a todas las variantes SF32LB57x. La columna «Aplicable a» limita los puntos de comprobación a las variantes con batería o alimentación de 3,3 V cuando la conexión solo existe en esa familia de alimentación.

### 6.10.1. Encapsulado { #6101-package }

<div align="center"><em>Tabla 6.10.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | La huella de PCB cumple las especificaciones del encapsulado indicadas en la hoja de datos | Todas las variantes | Obligatorio |

</div>

### 6.10.2. Trazado de la alimentación { #6102-power-supply-routing }

<div align="center"><em>Tabla 6.10.2-1: Lista de comprobación del trazado de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Ancho de la pista de alimentación `VBUS` ≥ 16 mil | Variantes con batería | Obligatorio |
| 2 | Ancho de la pista de alimentación `VBAT` ≥ 16 mil | Variantes con batería | Obligatorio |
| 3 | Ancho de la pista de alimentación `VCC` ≥ 12 mil | Variantes con batería | Obligatorio |
| 4 | Ancho de la pista de alimentación `VDD33_VOUT1` ≥ 10 mil | Variantes con batería | Obligatorio |
| 5 | Ancho de la pista de alimentación `VDD33_VOUT2` ≥ 10 mil (el título del elemento 46 en la fuente repite `VDD33_VOUT1`) | Variantes con batería | Obligatorio |
| 6 | Ancho de la pista de alimentación `PVDD` ≥ 12 mil (el detalle del elemento 47 en la fuente indica `VCC`) | Variantes con alimentación de 3,3 V | Obligatorio |
| 7 | Ancho de la pista de alimentación `VDDIOA` ≥ 10 mil | Variantes con alimentación de 3,3 V | Obligatorio |
| 8 | Ancho de las pistas `BUCK_LX`/`BUCK_FB` ≥ 10 mil y trazado lo más corto posible | Todas las variantes | Obligatorio |
| 9 | Ancho de la pista de alimentación `AVDD_BRF` ≥ 8 mil | Todas las variantes | Obligatorio |
| 10 | Ancho de la pista de alimentación `AVDD33_AUD` ≥ 8 mil | Todas las variantes | Obligatorio |

</div>

!!! warning "Conflictos de alimentación sin resolver en la fuente"
    - **Etiquetas de la lista:** El elemento 44 de la tabla original de autocomprobación 4-2-1-1 (variantes con alimentación por batería) exige `VCC` ≥ 12 mil. Los elementos 45 y 46 exigen al menos 10 mil para `VDD33_VOUT1` y `VDD33_VOUT2`, respectivamente, pero el título del elemento 46 repite `VDD33_VOUT1` mientras que el detalle indica `VDD33_VOUT2`. El elemento 47 (variantes de 3,3 V) titula `PVDD`, pero su detalle exige `VCC` ≥ 12 mil. Esta página transcribe los valores y detalles indicados sin resolver las discrepancias de la fuente.
    - **Ancho de pista:** El apartado 3.2.1 de la guía PCB original exige al menos 0,4 mm (unos 15,7 mil) para `VCC` y `PVDD`; los elementos 44 (variantes con alimentación por batería) y 47 (variantes de 3,3 V) de la tabla 4-2-1-1 exigen `VCC` ≥ 12 mil. La fuente no explica cómo conciliar estos requisitos según la variante ni si para el elemento 47 debe prevalecer el título `PVDD` o el detalle `VCC`. No infiera un valor corregido ni elija una referencia como requisito definitivo sin confirmarlo con SiFli.
    - **Nombres de salida:** El apartado 3.2.1 de la guía PCB original usa `VDD_VOUT1` / `VDD_VOUT2`, mientras que los elementos 45/46 de la tabla de autocomprobación 4-2-1-1 usan `VDD33_VOUT1` / `VDD33_VOUT2`. La fuente no aclara si los nombres son alias o redes distintas.
    Antes de cerrar el diseño, obtenga la confirmación de SiFli sobre las etiquetas previstas, los raíles de destino, las variantes de alimentación a las que se aplica cada requisito y los anchos de pista. Sin esa confirmación, no asigne las etiquetas contradictorias a redes concretas, no trate los nombres como equivalentes ni elija entre 12 mil y 0,4 mm.

### 6.10.3. Diseño de reloj { #6103-clock-layout }

<div align="center"><em>Tabla 6.10.3-1: Lista de comprobación del diseño de reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Coloque los cristales cerca de sus pines correspondientes del chip para mantener cortas las pistas | Todas las variantes | Obligatorio |
| 2 | Proteja completamente con GND el cristal y las pistas del oscilador | Todas las variantes | Obligatorio |
| 3 | Mantenga una zona sin cobre bajo el cristal: en una placa PTH de 4 capas, solo en la capa superior; en una placa HDI de 6 capas, tanto en la capa superior como en la capa 2 | Todas las variantes | Obligatorio |
| 4 | Mantenga entre las pistas de señal del oscilador y el cobre GND circundante una separación superior a 1,5 veces el ancho de pista | Todas las variantes | Obligatorio |
| 5 | Mantenga entre las pistas paralelas del cristal de 32,768 kHz una separación superior a 2 veces el ancho de pista de referencia | Todas las variantes | Obligatorio |

</div>

!!! warning "Conflictos sin resolver en las instrucciones de diseño del cristal"
    - **Blindaje de tierra y zona sin cobre:** El apartado 3.3 de la guía PCB exige una referencia de tierra continua en la zona del cristal y una zona sin cobre en TOP alrededor del cristal. La figura 3-3-1 (reproducida aquí como figura 6.9-30) indica al menos 0,25 mm alrededor del encapsulado. En cambio, los elementos 6 y 7 de la tabla original de autocomprobación 4-3-1 exigen, respectivamente, blindaje GND completo alrededor del cristal y las pistas del oscilador y ausencia de cobre bajo el cristal en TOP para una placa PTH de 4 capas, y en TOP y la capa 2 para una HDI de 6 capas. La fuente no delimita el área de blindaje frente a la zona sin cobre ni explica cómo aplicar la instrucción de tierra continua en esas capas excluidas según la configuración de apilado. Es un conflicto de alcance sin resolver; no deduzca el patrón de cobre o tierra de cada capa.
    - **Separación de las pistas de 32,768 kHz:** El apartado 3.3 de la guía PCB y el modelo de trazado de la figura 3-3-4 (reproducida aquí como figura 6.9-33) especifican al menos 0,15 mm entre las pistas paralelas `32K_XI` / `32K_XO`. El elemento 9 de la tabla original de autocomprobación 4-3-1 exige una separación superior al doble del ancho base de pista, es decir, más de 0,2 mm para la pista de 0,1 mm indicada en la guía. Son requisitos mínimos de separación en conflicto.
    - **Alcance de la separación alrededor del encapsulado:** La figura 3-3-1 (reproducida aquí como figura 6.9-30) especifica al menos 0,25 mm de separación del cobre de TOP alrededor del encapsulado. El elemento 7 de la tabla original 4-3-1 define por separado las capas sin cobre bajo el cristal para las dos configuraciones de apilado, pero la fuente no explica cómo se relacionan esa separación perimetral y las zonas bajo el encapsulado o las restricciones de trazado en capas adyacentes.
    Estos conflictos y vacíos de alcance siguen sin resolverse en la documentación fuente de SiFli. Antes de liberar el diseño, solicite confirmación para el encapsulado y el apilado reales; no elija entre los requisitos de separación ni deduzca los límites de tierra o de zona sin cobre por capa.

### 6.10.4. Diseño de RF { #6104-rf-layout }

<div align="center"><em>Tabla 6.10.4-1: Lista de comprobación del diseño de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Controle la impedancia de todas las pistas RF de la PCB con un objetivo de 50 Ω en configuración no balanceada | Todas las variantes | Obligatorio |
| 2 | Disponga una franja de cobre GND de al menos 60 mil a ambos lados de la pista RF y conéctela al plano de masa principal mediante varias vías | Todas las variantes | Obligatorio |
| 3 | Reserve cerca del pin RF del chip una red de adaptación en π | Todas las variantes | Obligatorio |
| 4 | Mantenga una capa de apantallamiento GND continua, sin interrupciones, justo debajo de la pista de señal RF | Todas las variantes | Obligatorio |
| 5 | No pase pistas de señal digital de alta velocidad justo debajo de la pista RF | Todas las variantes | Obligatorio |
| 6 | No pase justo debajo de la pista RF pistas de señal relacionadas con la alimentación y con grandes variaciones de corriente | Todas las variantes | Obligatorio |

</div>

### 6.10.5. Trazado de la pantalla { #6105-display-routing }

<div align="center"><em>Tabla 6.10.5-1: Lista de comprobación del trazado de pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Coloque una resistencia en serie ≤ 50 Ω en la pista del reloj de pantalla y reserve, sin montar, la huella para un condensador en derivación; así podrá configurarse una red RC para suprimir las EMI | Todas las variantes | Obligatorio |
| 2 | Priorice las capas internas para las pistas de alta velocidad de la pantalla y mantenga el conector y el cable FPC de la pantalla lejos de la zona de la antena RF | Todas las variantes | Obligatorio |

</div>

### 6.10.6. Trazado de audio { #6106-audio-routing }

<div align="center"><em>Tabla 6.10.6-1: Lista de comprobación del trazado de audio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Aplique apantallamiento GND alrededor de la zona de trazado de `ADCP` para reducir las interferencias electromagnéticas externas | Todas las variantes | Obligatorio |
| 2 | Trace `DACP`/`DACN` como un par diferencial con ajuste estricto de longitud y aplique apantallamiento GND alrededor de la zona de trazado | Todas las variantes | Obligatorio |
| 3 | Controle la longitud total de las pistas `DACP`/`DACN` para que la capacitancia parásita sea inferior a 10 pF | Todas las variantes | Obligatorio |
| 4 | Aplique apantallamiento GND a las pistas de alimentación analógica `AVDD_BRF`/`AVDD33_AUD` y aléjelas de las pistas de alta corriente y de las señales que generen interferencias intensas | Todas las variantes | Obligatorio |

</div>

### 6.10.7. Trazado de GPADC { #6107-gpadc-routing }

<div align="center"><em>Tabla 6.10.7-1: Lista de comprobación del trazado de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Categoría |
|:---|:---|:---|:---|
| 1 | Aleje las pistas analógicas del GPADC de las pistas de señal de alta velocidad paralelas y aplique apantallamiento GND alrededor de la zona para evitar que el ruido digital reduzca la precisión del muestreo | Todas las variantes | Obligatorio |

</div>
