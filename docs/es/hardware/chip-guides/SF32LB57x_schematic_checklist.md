---
icon: lucide/list-checks
hide:
    - navigation
description: "Lista de comprobación punto por punto del esquemático de SF32LB57x: encapsulado, alimentación, reloj, almacenamiento, RF, pantalla, audio, cámara, botones y fabricación."
tags:
    - Hardware
    - Chip
    - Lista de comprobación
---

# Guía de diseño de hardware de SF32LB57x — Lista de comprobación del esquemático { #sf32lb57x-hardware-design-guide-schematic-checklist }

!!! note "Parte de la guía de diseño de hardware de SF32LB57x"
    Esta página reúne los puntos de comprobación del esquemático de la sección 5.8 a partir de las tablas oficiales de autocomprobación del diseño de SiFli. Vuelva a [Sistema mínimo y alimentación](SF32LB57x_schematic_system_power.md), la primera de las tres páginas de directrices de diseño del esquemático.

## 5.8. Lista de comprobación del esquemático { #58-schematic-checklist }

Cada tabla corresponde a un bloque funcional del esquemático. La columna «Aplicable a» indica si un punto se limita a las variantes alimentadas por batería o a las variantes con alimentación de 3,3 V; los puntos marcados «Todas las variantes» se aplican a toda la familia.

### 5.8.1. Encapsulado { #581-package }

<div align="center"><em>Tabla 5.8.1-1: Lista de comprobación del encapsulado</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | La biblioteca de símbolos del esquemático es correcta | Todas las variantes | |

</div>

### 5.8.2. Alimentación { #582-power-supply }

<div align="center"><em>Tabla 5.8.2-1: Lista de comprobación de la alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | La tensión de entrada de `VBUS` se controla estrictamente entre 4,6 V y 5,5 V | Variantes con batería | |
| 2 | La carga de `VBAT` admite baterías con tensión nominal de 4,2 V–4,45 V; la corriente de precarga es de 40 mA y la corriente máxima de carga es 1C (400 mA) | Variantes con batería | |
| 3 | El rango de funcionamiento nominal de `VCC` es 3,45 V–4,7 V; el umbral de encendido por hardware es 3,45 V y el umbral de apagado por hardware es 2,7 V | Variantes con batería | |
| 4 | `VSYS` es una fuente interna dedicada: solo puede alimentar `AVDD_BRF` y el circuito pull-up de GPIO. No alimente ningún otro periférico externo desde ella | Variantes con batería | |
| 5 | La carga de `VDD33_VOUT1` se limita a la Flash integrada en el encapsulado, la Flash NOR/NAND externa y `AVDD33_AUD`. No alimente otros periféricos. La corriente de carga durante el arranque suave no debe superar 30 mA; tras habilitarse por completo, admite 150 mA. | Variantes con batería | |
| 6 | El límite de corriente durante el arranque suave de `VDD33_VOUT2` es 30 mA; una vez estabilizada la tensión en 3,3 V, admite una carga de 150 mA. El límite de arranque suave se puede deshabilitar por software: compruebe que la corriente de irrupción del periférico conectado sea compatible con la capacidad de carga recomendada para este raíl | Variantes con batería | |
| 7 | `AVDD_BRF` se alimenta desde el dominio `VSYS` | Variantes con batería | |
| 8 | `AVDD33_AUD` se alimenta desde el dominio `VDD33_VOUT1` | Variantes con batería | |
| 9 | El rango nominal de alimentación de `PVDD` es 2,93 V–3,63 V y la tensión de funcionamiento predeterminada típica es 3,3 V | Variantes con alimentación de 3,3 V | |
| 10 | El rango de detección de tensión de batería de `VBATS` es 0 V–4,5 V; no lo exceda | Variantes con alimentación de 3,3 V | |
| 11 | `AVDD_BRF` se alimenta desde una fuente externa de 3,3 V | Variantes con alimentación de 3,3 V | |
| 12 | `AVDD33_AUD` se alimenta desde una fuente externa de 3,3 V | Variantes con alimentación de 3,3 V | |
| 13 | `AVDD33_ANA` se alimenta desde una fuente externa de 3,3 V | Variantes con alimentación de 3,3 V | |
| 14 | El rango de tensión de entrada de `VDDIOA` depende del número de parte exacto que se vaya a pedir; consulte la descripción del número de parte en la hoja de datos | Variantes con alimentación de 3,3 V | |
| 15 | Detección de tensión de batería: el chip ya conecta internamente un canal GPADC a `VBAT`/`VBATS`; no lo conecte además a otro canal GPADC | Todas las variantes | |
| 16 | El cableado de `BUCK_LX`/`BUCK_FB` cumple estrictamente la especificación de diseño de hardware del chip | Todas las variantes | |
| 17 | `VDD18_VOUT` alimenta exclusivamente la PSRAM integrada en el encapsulado del chip; no la use para periféricos externos de 1,8 V | Todas las variantes | |
| 18 | `GPADC_VREF` solo admite un condensador externo; nunca aplique una tensión externa | Todas las variantes | |
| 19 | `AUD_VREF` solo admite un condensador externo; nunca aplique una tensión externa | Todas las variantes | |

</div>

!!! warning "Diferencias en la fuente original"
    La tabla de autocomprobación original indica un límite inferior de 2,93 V para `PVDD` y uno superior de 4,5 V para `VBATS`, pero las tablas de alimentación por encapsulado indican 2,97 V y 4,7 V, respectivamente. Esta página conserva los valores de autocomprobación. Confirme ambas diferencias con SiFli para el número de parte exacto; no use los rangos más amplios para aprobar el diseño.

    El esquemático de referencia también indica `VCC` de 3,2 V a 4,7 V y `VDD33_VOUT1` para Flash y sensores, en desacuerdo con el límite inferior de 3,45 V y la restricción de otros periféricos de la tabla. Conserve estas restricciones; no amplíe el rango ni las cargas permitidas basándose en las etiquetas del esquemático.

    En otra parte, el cuerpo de la guía da un rango de entrada de `VBUS` de 4,5 V–5,5 V y un rango de salida de 4,5 V–5,4 V para los dispositivos OVP con LDO integrado. La tabla de autocomprobación indica 4,6 V–5,5 V y 4,7 V–5,4 V, respectivamente. Esta página conserva los valores de la tabla; confirme los límites aplicables para el dispositivo concreto y con SiFli antes de aprobar el diseño.

    El punto 25 de la tabla original se titula como una comprobación del condensador de `VDD33_VOUT2`, pero el detalle menciona por error `VDD33_VOUT1` (que también se comprueba en el punto 24). Esta página sigue el título del punto 25; confirme con SiFli cuál es el raíl previsto.

### 5.8.3. Condensadores e inductores de alimentación { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabla 5.8.3-1: Lista de condensadores e inductores de alimentación</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Condensador de `VBUS` ≥ 10 µF/10 V, colocado cerca del pin | Variantes con batería | |
| 2 | Condensador de `VBAT` ≥ 4,7 µF/10 V, colocado cerca del pin | Variantes con batería | |
| 3 | Condensador de `VCC` ≥ 10 µF/10 V, colocado cerca del pin | Variantes con batería | |
| 4 | Condensador de `VSYS` = 2,2 µF/6,3 V; capacitancia total de este dominio ≤ 9,6 µF; colocado cerca del pin | Variantes con batería | |
| 5 | Condensador de `VDD33_VOUT1` = 2,2 µF/6,3 V; capacitancia total de este dominio ≤ 9,6 µF; colocado cerca del pin | Variantes con batería | |
| 6 | Condensador de `VDD33_VOUT2` = 2,2 µF/6,3 V; capacitancia total de este dominio ≤ 9,6 µF; colocado cerca del pin | Variantes con batería | |
| 7 | Condensador de `PVDD` ≥ 10 µF/6,3 V, colocado cerca del pin | Variantes con alimentación de 3,3 V | |
| 8 | Condensador de desacoplamiento de `VBATS` = 0,1 µF/10 V, colocado cerca del pin | Variantes con alimentación de 3,3 V | |
| 9 | Condensador de `VDDIOA` = 4,7 µF/6,3 V, colocado cerca del pin | Variantes con alimentación de 3,3 V | |
| 10 | Condensador de `AVDD33_ANA` = 1 µF/6,3 V, colocado cerca del pin | Variantes con alimentación de 3,3 V | |
| 11 | Condensador de `BUCK_FB` = 4,7 µF, colocado entre el inductor y el pin del chip | Todas las variantes | |
| 12 | Condensador de `VDD_VOUT1` = 4,7 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 13 | Condensador de `VDD_VOUT2` = 4,7 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 14 | Condensador de `VDD_RET` = 0,47 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 15 | Condensador de `VDD_RTC` = 1 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 16 | Condensador de `MIC_BIAS` = 1 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 17 | Condensador de `AVDD_BRF` = 4,7 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 18 | Condensador de `AVDD33_AUD` = 2,2 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 19 | Condensador de `AUD_VREF` = 1 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 20 | Condensador de `GPADC_VREF` = 4,7 µF/6,3 V, colocado cerca del pin | Todas las variantes | |
| 21 | Se recomienda elegir un inductor BUCK incluido en la [lista de proveedores aprobados de SiFli](../cad-components/sifli-approved-vendor-list.md); si se usa otro componente, debe cumplir L = 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 450 mA | Todas las variantes | |
| 22 | En productos con GPS u otros periféricos sensibles a interferencias, reserve en `BUCK_LX` una huella para un condensador en derivación a tierra de menos de 100 pF; el valor final se determina mediante pruebas EMC del producto completo | Todas las variantes | |

</div>

### 5.8.4. Carga y OVP { #584-charging-and-ovp }

<div align="center"><em>Tabla 5.8.4-1: Lista de comprobación de carga y OVP</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | La interfaz de entrada de carga incluye un circuito de protección contra sobretensión OVP | Variantes con batería | |
| 2 | Si la pantalla debe encenderse en cuanto se conecta el cargador, no se usa el cargador interno; en su lugar se usa un circuito integrado de carga externo con gestión de la ruta de alimentación (power-path management) | Variantes con batería | |
| 3 | El cargador interno solo se utiliza si se acepta que la pantalla se encienda por software después de que la batería se haya cargado hasta 3,6 V | Variantes con batería | |
| 4 | Se recomienda un dispositivo OVP con salida LDO integrada (por ejemplo, `LP5305AQVF`): salida LDO de 4,7 V–5,4 V, capacidad de carga ≥ 0,5 A y umbral de disparo de protección contra sobrecorriente ≥ 0,7 A | Variantes con batería | |
| 5 | Si se usa un dispositivo OVP con OVLO ajustable, las resistencias divisoras tienen una tolerancia del 1 %, el error del umbral OVLO es inferior al 3 % y el rango de ajuste se fija entre 5,15 V y 5,55 V | Variantes con batería | |
| 6 | Si no se usa el cargador interno, `VBUS` puede dejarse sin conexión y se puede omitir su condensador externo; en ese caso, `VBAT` no puede suministrar alimentación de salida a circuitos externos | Variantes con batería | |

</div>

### 5.8.5. Consumo de energía { #585-power-consumption }

<div align="center"><em>Tabla 5.8.5-1: Lista de comprobación del consumo de energía</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Los circuitos integrados de alimentación LDO/DC-DC usan un pin EN activo en alto; si la salida debe estar apagada por defecto, EN se conecta a tierra mediante una resistencia de 1 MΩ–5,1 MΩ dimensionada según el requisito de bajo consumo del producto completo | Todas las variantes | |
| 2 | Los interruptores de alimentación con MOSFET usan una topología PMOS+NMOS; el pin de control es activo en alto (encendido) y activo en bajo (apagado), y se conecta a tierra mediante una resistencia pull-down fija de 1 MΩ | Todas las variantes | |
| 3 | El interruptor de alimentación del medio de arranque externo se controla exclusivamente mediante `PA21` | Todas las variantes | |
| 4 | Si `VSYS` se usa como línea pull-up de GPIO, se evalúa por completo su corriente estática permanente y se confirma que cumple el objetivo de bajo consumo del producto | Variantes con batería | |
| 5 | Si LDO2 o LDO3 se usa como línea pull-up de GPIO, se evalúa su estado al apagarse para confirmar que no haya fugas ni niveles de E/S anómalos | Variantes con batería | |
| 6 | La alimentación de las resistencias pull-up de I2C se conecta y desconecta junto con la alimentación del dominio de E/S del periférico correspondiente para evitar fugas durante el sueño | Todas las variantes | |
| 7 | Se confirma que la corriente estática máxima del producto completo en modo de suspensión profunda (Deep Sleep) cumple la especificación del proyecto | Todas las variantes | |
| 8 | Se registra la corriente estática total de todos los periféricos en modo Deep Sleep y se confirma que cumple el objetivo de consumo del proyecto | Todas las variantes | |
| 9 | Se confirma que la corriente estática máxima del producto completo en modo de espera (Standby) cumple la especificación del proyecto | Todas las variantes | |
| 10 | Se registra la corriente estática total de todos los periféricos en modo Standby y se confirma que cumple el objetivo de consumo del proyecto | Todas las variantes | |

</div>

### 5.8.6. Reloj { #586-clock }

<div align="center"><em>Tabla 5.8.6-1: Lista de comprobación del reloj</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cristal principal de 48 MHz tiene un número de parte incluido en la [lista de proveedores aprobados de SiFli](../cad-components/sifli-approved-vendor-list.md) (AVL) | Todas las variantes | |
| 2 | Si el cristal de 48 MHz no figura en la AVL, cumple 7 pF ≤ CL ≤ 12 pF (8,8 pF recomendado), tolerancia de frecuencia ≤ ±10 ppm y ESR ≤ 30 Ω (22 Ω recomendado) | Todas las variantes | |
| 3 | El cristal RTC de 32,768 kHz tiene un número de parte incluido en la AVL | Todas las variantes | |
| 4 | Si el cristal de 32,768 kHz no figura en la AVL, cumple CL = 7 pF u 11,5 pF (7 pF recomendado), tolerancia de frecuencia ≤ ±20 ppm y ESR ≤ 80 kΩ (38 kΩ recomendado) | Todas las variantes | |

</div>

### 5.8.7. Almacenamiento y arranque { #587-storage-and-boot }

<div align="center"><em>Tabla 5.8.7-1: Lista de comprobación del almacenamiento y arranque</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | SPI NOR Flash externa en MPI3: `PA13` (MPI D1) y `PA17` (MPI D3) no necesitan resistencias pull-up | Todas las variantes | |
| 2 | SPI NAND Flash externa en MPI3: `PA13` (MPI D1) no necesita pull-up; `PA17` (MPI D3) requiere un pull-up de 7,5 kΩ | Todas las variantes | |
| 3 | SD NAND Flash externa en MPI3: `PA13` (SD D3) y `PA15` (SD CMD) requieren pull-ups de 7,5 kΩ; `PA17` (SD D1) no necesita pull-up | Todas las variantes | |
| 4 | eMMC externa en MPI3: `PA13` (SD D3), `PA17` (SD D1) y `PA15` (SD CMD) requieren pull-ups de 7,5 kΩ | Todas las variantes | |
| 5 | Si el almacenamiento integrado en el encapsulado ya ocupa MPI3, el uso de MPI3 externo se limita a SD NAND/eMMC; no conecte SPI NOR/SPI NAND externas | Todas las variantes | |
| 6 | Control de alimentación del almacenamiento externo en MPI3: SPI NOR Flash puede permanecer siempre alimentada; SPI NAND/SD NAND/eMMC requieren el control de un interruptor de alimentación. Para arrancar desde un medio externo, su alimentación está activada por defecto | Todas las variantes | |
| 7 | El número de parte seleccionado para el almacenamiento externo figura en la AVL del proyecto | Todas las variantes | |
| 8 | El rango de tensión de funcionamiento del componente de almacenamiento coincide con el nivel de alimentación de E/S del chip principal | Todas las variantes | |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabla 5.8.8-1: Lista de comprobación de RF</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | La pista de señal ANT indica explícitamente una impedancia característica de 50 Ω en configuración no balanceada | Todas las variantes | |
| 2 | La cadena de señal reserva una red de adaptación π, con condensadores NC en las posiciones en derivación y un condensador de 15 pF en serie (los valores finales se ajustan durante las pruebas de hardware) | Todas las variantes | |

</div>

### 5.8.9. Pantalla { #589-display }

<div align="center"><em>Tabla 5.8.9-1: Lista de comprobación de la pantalla</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Para las pantallas con interfaz QSPI, se prefieren los pines dedicados de la función 1 del grupo `PA00`–`PA08` | Todas las variantes | |
| 2 | Una pantalla RGB puede usar cualquier GPIO a velocidades de señal normales; por encima de 30 MHz, se limita a `PA22`–`PA50` y `PA52`–`PA54` (solo `B1`–`B6`) | Todas las variantes | |
| 3 | La pantalla con interfaz 8080 de la MCU sigue la misma regla de asignación de pines que RGB; para alta velocidad se limita a `PA22`–`PA50` y `PA52`–`PA54` | Todas las variantes | |
| 4 | La pantalla de tinta electrónica EPD sigue la misma regla de asignación de pines que RGB; para alta velocidad se limita a `PA22`–`PA50` y `PA52`–`PA54` | Todas las variantes | |
| 5 | La pantalla y la retroiluminación consumen una potencia considerable, por lo que se incluye un circuito de conmutación de alimentación. Salvo en diseños con pantalla siempre encendida, las alimentaciones de la pantalla y de la retroiluminación están apagadas por defecto al encender el sistema | Todas las variantes | |
| 6 | Los rangos de tensión de funcionamiento de la pantalla y del dispositivo táctil coinciden con el nivel de alimentación del dominio de E/S del chip principal | Todas las variantes | |

</div>

### 5.8.10. Audio { #5810-audio }

<div align="center"><em>Tabla 5.8.10-1: Lista de comprobación de audio</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cableado de señales, polarización y otros pines del micrófono MEMS cumple la especificación de diseño de hardware | Todas las variantes | |
| 2 | El micrófono MEMS usa `MIC_BIAS` del chip como alimentación de polarización | Todas las variantes | |
| 3 | El cableado de señales, polarización y otros pines del micrófono ECM analógico no balanceado cumple la especificación de diseño de hardware | Todas las variantes | |
| 4 | El micrófono ECM analógico no balanceado usa `MIC_BIAS` del chip como alimentación de polarización | Todas las variantes | |
| 5 | Cada canal de entrada ADC de audio lleva un condensador de acoplamiento en serie de al menos 2,2 µF | Todas las variantes | |
| 6 | Cada señal `DACP`/`DACN` lleva una resistencia serie de 1 kΩ cerca del chip, con un condensador de 1,5 nF en paralelo entre ambas señales | Todas las variantes | |
| 7 | El pin `PA55`, compartido con `ADC1P`, se configura como entrada de alta impedancia cuando se habilita `ADC1P`, para evitar conflictos de función o problemas de señal | Todas las variantes | |
| 8 | El pin `PA10`, compartido con `ADC2P`, se configura como entrada de alta impedancia cuando se habilita `ADC2P`, para evitar conflictos de función o problemas de señal | Todas las variantes | |
| 9 | El pin `PA56`, compartido con `MICBIAS`, se configura como entrada de alta impedancia cuando se habilita `MICBIAS`, para evitar fugas o fallos del circuito por conflictos de función | Todas las variantes | |

</div>

### 5.8.11. Cámara { #5811-camera }

<div align="center"><em>Tabla 5.8.11-1: Lista de comprobación de la cámara</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cableado de las señales, la alimentación y los demás pines de la cámara cumple la especificación de diseño de hardware | Todas las variantes | |
| 2 | La alimentación del núcleo de cada modelo de cámara cumple los requisitos de su hoja de datos | Todas las variantes | |

</div>

### 5.8.12. Botones { #5812-buttons }

<div align="center"><em>Tabla 5.8.12-1: Lista de comprobación de los botones</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Se confirma según el plan del producto si un botón necesita activación por hardware y se completan la configuración del circuito y del software correspondientes | Todas las variantes | |
| 2 | El circuito pull-up de los botones normales usa un valor de resistencia adecuado y un dominio de tensión pull-up que coincide con el de alimentación de E/S | Todas las variantes | |
| 3 | El botón de encendido/restablecimiento usa `PA34` y se activa con nivel alto. Admite un restablecimiento por hardware con una pulsación larga de 10 segundos. La resistencia pull-down de 10 kΩ se coloca en la placa principal | Todas las variantes | |
| 4 | Cada señal de entrada de botón tiene un dispositivo de protección ESD correspondiente cerca del botón | Todas las variantes | |

</div>

### 5.8.13. UART { #5813-uart }

<div align="center"><em>Tabla 5.8.13-1: Lista de comprobación de UART</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cableado UART sigue la regla de cruce: RXD de la MCU a TXD del periférico y TXD de la MCU a RXD del periférico | Todas las variantes | |
| 2 | Durante el reinicio de la MCU, el periférico externo conectado a `PA35`/`PA36` (multiplexados con UART) se apaga o el software fuerza `PA35`/`PA36` a nivel bajo para evitar que niveles anómalos provoquen un funcionamiento no deseado del periférico | Todas las variantes | |
| 3 | El rango de tensión de funcionamiento de E/S del dispositivo UART conectado coincide con el dominio de E/S correspondiente del chip principal | Todas las variantes | |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabla 5.8.14-1: Lista de comprobación de I2C</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | SDA y SCL tienen resistencias pull-up (se recomiendan 2,2 kΩ a 400 kHz); la tensión pull-up se suministra desde el lado del periférico para que se apague junto con este | Todas las variantes | |
| 2 | Se confirma si el pin de interrupción asociado a I2C necesita activación por hardware y se configura en consecuencia | Todas las variantes | |
| 3 | Los sensores I2C, como acelerómetros, sensores de frecuencia cardíaca y magnetómetros, permiten leer todos los registros en una única operación continua de lectura en ráfaga (burst read) | Todas las variantes | |
| 4 | Cada dispositivo que comparte un bus I2C tiene una dirección de esclavo única, sin conflictos | Todas las variantes | |

</div>

### 5.8.15. SPI { #5815-spi }

<div align="center"><em>Tabla 5.8.15-1: Lista de comprobación de SPI</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cableado SPI sigue la regla de cruce: SDO del host a SDI del periférico y SDI del host a SDO del periférico; CLK y CS se conectan directamente | Todas las variantes | |
| 2 | La frecuencia, la fase y la polaridad del reloj configuradas en el host coinciden con las especificaciones del periférico | Todas las variantes | |
| 3 | El rango de tensión de funcionamiento de E/S del periférico coincide con el dominio de E/S correspondiente del chip principal | Todas las variantes | |

</div>

### 5.8.16. GPADC { #5816-gpadc }

<div align="center"><em>Tabla 5.8.16-1: Lista de comprobación de GPADC</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Las señales de entrada GPADC solo se asignan a los 11 pines compatibles con GPADC, `PA28`–`PA38` | Todas las variantes | |
| 2 | La tensión analógica de cada canal GPADC se mantiene dentro del rango nominal de 0 V–3,3 V | Todas las variantes | |
| 3 | Los canales de muestreo con divisor usan resistencias del 1 %; cada entrada GPADC tiene un condensador de filtro de 100 nF cerca del pin del chip | Todas las variantes | |

</div>

### 5.8.17. USB { #5817-usb }

<div align="center"><em>Tabla 5.8.17-1: Lista de comprobación de USB</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | El cableado de las señales diferenciales USB y de los pines de alimentación y tierra cumple la especificación de diseño de hardware USB, sin cruces ni cortocircuitos | Todas las variantes | |
| 2 | Las líneas de datos USB, `VBUS` y otros pines clave tienen dispositivos de protección ESD que cumplen la especificación ESD del producto completo | Todas las variantes | |
| 3 | Mientras la MCU está despierto, USB permanece habilitado para detectar normalmente las conexiones y desconexiones mediante el protocolo USB | Todas las variantes | |
| 4 | Si es necesario detectar la conexión USB mientras la MCU está en reposo, un divisor de `VBUS` aplica un nivel compatible con E/S a un pin con capacidad de activación por hardware; si es posible, se comparte con la detección de conexión del cargador | Todas las variantes | |
| 5 | El pin `PA35`, compartido con `USB_DP`, se configura como entrada de alta impedancia cuando se habilita `USB_DP` | Todas las variantes | |
| 6 | El pin `PA36`, compartido con `USB_DM`, se configura como entrada de alta impedancia cuando se habilita `USB_DM` | Todas las variantes | |

</div>

### 5.8.18. Activación externa por hardware { #5818-external-hardware-wake }

<div align="center"><em>Tabla 5.8.18-1: Lista de comprobación de activación externa por hardware</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Las interrupciones externas de activación por hardware usan únicamente los 10 GPIO del rango `PA33`–`PA42` | Todas las variantes | |

</div>

### 5.8.19. Depuración y descarga { #5819-debug-and-download }

<div align="center"><em>Tabla 5.8.19-1: Lista de comprobación de depuración y descarga</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | `PA18` (RXD) y `PA19` (TXD) son la interfaz predeterminada de descarga/depuración DBG-UART; se confirma que TXD y RXD se usan correctamente | Todas las variantes | |
| 2 | `PA43`/`PA44`, los pines predeterminados de depuración/descarga SWD, tienen reservados puntos de prueba soldables para grabación y depuración | Todas las variantes | |
| 3 | `PA00`, el pin de selección del modo de arranque, tiene reservados una resistencia pull-up y un punto de prueba correspondiente | Todas las variantes | |
| 4 | `PA01`, el selector de ubicación de los pines SWD, tiene reservados una resistencia pull-up y un punto de prueba según lo requiera el diseño del producto | Todas las variantes | |

</div>

### 5.8.20. EOS y ESD { #5820-eos-and-esd }

<div align="center"><em>Tabla 5.8.20-1: Lista de comprobación de EOS y ESD</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | La interfaz de carga dispone del conjunto completo de dispositivos de protección contra sobretensiones EOS, ESD y OVP | Todas las variantes | |
| 2 | Los pines de alimentación y señal de la interfaz de batería tienen dispositivos de protección ESD | Todas las variantes | |
| 3 | El pin de señal de la antena RF tiene un dispositivo de protección ESD dedicado | Todas las variantes | |
| 4 | Los pines de alimentación de la pantalla LCD y del panel táctil tienen dispositivos de protección ESD | Todas las variantes | |
| 5 | Todas las líneas del bus I2C y las señales `RST` e `INT` del panel táctil tienen dispositivos de protección ESD | Todas las variantes | |
| 6 | El pin de alimentación y todos los pines de transmisión de señales del módulo de frecuencia cardíaca tienen dispositivos de protección ESD | Todas las variantes | |

</div>

### 5.8.21. Línea de producción { #5821-production-line }

<div align="center"><em>Tabla 5.8.21-1: Lista de comprobación de la línea de producción</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación | Aplicable a | Confirmación (Sí/No) |
|:---|:---|:---|:---|
| 1 | Se reservan puntos de prueba de descarga de programa y depuración para `VBAT` o 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (no aplicable a variantes con alimentación de 3,3 V) y `PA34` | Variantes con batería | |
| 2 | La disposición de cada punto de prueba reservado permite probarlo con una sonda manual y soldarlo a mano, sin obstrucciones ni pistas demasiado congestionadas | Todas las variantes | |
| 3 | Los puntos de prueba destinados al útil de producción (`VBAT` o 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` cuando corresponda, `PA00`, `PA01`, `PA34`) tienen pads con tamaño, separación y orientación compatibles con las sondas del útil | Todas las variantes | |

</div>
