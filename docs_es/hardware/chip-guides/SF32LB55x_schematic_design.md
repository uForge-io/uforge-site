---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de diseño esquemático para la MCU SF32LB55x: sistema de alimentación, modo de arranque, generación de reloj, RF, interfaces de almacenamiento, interfaces de pantalla y táctil, y conexiones de activación, GPADC y fabricación."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB55x — Diseño esquemático { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. Directrices de diseño esquemático { #5-schematic-design-guidelines }

<div align="center"><em>Tabla 5-1: Mapa de secciones del esquemático</em></div>

<div align="center" markdown>

| Grupo | Temas |
|:------|:------|
| Sistema de alimentación | Raíles de alimentación de PMU, otros raíles, condensadores, POR/BOR/reinicio e inductor BUCK. |
| Modo de arranque | Dominio de tensión del pin Mode, resistencia de polarización, descarga, recuperación y acceso de producción. |
| Generación de reloj | Cristales de 48 MHz y 32,768 kHz, y revisión de los condensadores de adaptación. |
| RF | Adaptación de RF, ruta de antena de 50 ohmios, filtrado de AVDD_BRF y zona de exclusión de RF. |
| Interfaces de almacenamiento | PSRAM OPI, NOR/NAND/PSRAM QSPI y eMMC/Micro SD SDIO. |
| Pantalla y táctil | MIPI DSI, SPI/QSPI, MCU8080, JDI, interrupción táctil, reinicio, retroiluminación y alimentación del panel. |
| Activación, GPADC y fabricación | Fuentes y botones de activación, PWM del motor, divisores GPADC, sensores, audio Bluetooth, DBG-UART, SWD, grabación en producción y calibración del cristal. |

</div>

### 5.1. Sistema de alimentación { #51-power-system }

El SF32LB551 en QFN68L no tiene los pines VDD2, BUCK2_VSW, BUCK2_VOUT, LDOVCC2_VOUT ni AVDD_DSI. Aplique las tablas de alimentación y condensadores solo a los pines presentes en el encapsulado elegido. Los encapsulados BGA ofrecen dos salidas BUCK; BUCK2 admite funcionamiento BUCK o LDO, con modo BUCK recomendado. QFN68L ofrece una sola salida BUCK.

<div align="center"><em>Tabla 5.1-1: Pines de alimentación de la PMU</em></div>

<div align="center" markdown>

| Pines de alimentación de la PMU | Tensión mínima (V) | Tensión típica (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
|:--------------------------------|------------------:|------------------:|-------------------:|---------------------:|:------------|
| VDD1 | 1,71 | 1,8 | 3,6 | 50 | Entrada de alimentación VDD1 |
| VDD2 | 1,71 | 1,8 | 3,6 | 50 | Entrada de alimentación VDD2 |
| BUCK1_VSW BUCK1_VOUT | - | 1,25 | - | 50 | La salida VSW de BUCK1 se conecta al inductor. La entrada de alimentación interna 1 se conecta al otro extremo del inductor y a un condensador externo |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0,9 | - | 50 | La salida VSW de BUCK2 se conecta al inductor. La entrada de alimentación interna 2 se conecta al otro extremo del inductor y a un condensador externo |
| LDO_VOUT1 | - | 1,1 | - | 50 | Salida LDO 1; conectar un condensador externo |
| LDO_VOUT2 | - | 0,9 | - | 20 | Salida LDO 2; conectar un condensador externo |
| VDD_RET | - | 0,9 | - | 1 | Salida LDO RET; conectar un condensador externo |
| VDD_RTC | - | 1,1 | - | 1 | Salida LDO RTC; conectar un condensador externo |

</div>

<div align="center"><em>Tabla 5.1-2: Otros pines de alimentación</em></div>

<div align="center" markdown>

| Otros pines de alimentación | Tensión mínima (V) | Tensión típica (V) | Tensión máxima (V) | Corriente máxima (mA) | Descripción detallada |
|:----------------------------|------------------:|------------------:|-------------------:|---------------------:|:------------|
| AVDD_BRF | 1,71 | 1,8 | 3,63 | 30 | Entrada de alimentación de RF |
| AVDD_DSI | 1,71 | 1,8 | 2,75 | 20 | Entrada de alimentación MIPI DSI; debe recibir alimentación |
| VDD_SIP | 1,71 | 1,8 | 1,98 | 30 | Entrada de alimentación del chip de memoria integrado en el SiP |
| AVDD33 | 3,15 | 3,3 | 3,63 | 50 | Entrada de alimentación |
| VDDIOA | 1,71 | 1,8 | 3,63 | - | Entrada de alimentación de E/S PA |
| VDDIOB | 1,71 | 1,8 | 3,63 | - | Entrada de alimentación de E/S PB |

</div>

<div align="center"><em>Tabla 5.1-3: Condensadores de alimentación necesarios</em></div>

<div align="center" markdown>

| Pines de alimentación | Condensador | Descripción detallada |
|:----------------------|:------------|:----------------------|
| VDD1 VDD2 | 0,1 µF + 10 µF | Conecte VDD1 y VDD2 entre sí. Coloque al menos dos condensadores, uno de 10 µF y otro de 0,1 µF, cerca de los pines |
| BUCK1_VSW BUCK1_VOUT | 0,1 µF + 4,7 µF | Coloque al menos dos condensadores, uno de 4,7 µF y otro de 0,1 µF, cerca de los pines |
| BUCK2_VSW BUCK2_VOUT | 0,1 µF + 4,7 µF | Coloque al menos dos condensadores, uno de 4,7 µF y otro de 0,1 µF, cerca de los pines |
| LDOVCC2_VOUT | 0,1 µF + 4,7 µF | Si BUCK2 está configurado en modo BUCK, deje este pin sin conectar. Si BUCK2 está configurado en modo LDO, deje BUCK2_VSW sin conectar, conecte entre sí LDOVCC2_VOUT y BUCK2_VOUT, y coloque al menos dos condensadores, uno de 4,7 µF y otro de 0,1 µF, cerca de los pines |
| LDO_VOUT1 | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| LDO_VOUT2 | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| VDD_RET | 0,47 µF | Coloque al menos un condensador de 0,47 µF cerca del pin |
| VDD_RTC | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| VDD_SIP | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| SDMADC_VREF | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| AVDD_DSI | 0,1 µF + 10 µF | Coloque al menos dos condensadores, uno de 10 µF y otro de 0,1 µF, cerca de los pines |
| AVDD33 | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| AVDD_BRF | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| VDDIOA VDDIOB | 2 × 0,1 µF + 2 × 1 µF | Coloque al menos un condensador de 1 µF y otro de 0,1 µF cerca de cada pin |

</div>

Coloque los condensadores necesarios cerca de los pines correspondientes, mantenga compactos los lazos de corriente BUCK y compruebe el modo de funcionamiento BUCK/LDO antes del diseño de PCB. Se recomienda verificar el circuito de reinicio y la temporización POR/BOR en el hardware real.

Las fuentes discrepan: la tabla 3-3 de la [guía de aplicación de hardware de SiFli en chino](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) y el punto 9 de la [lista de comprobación de esquemático V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) especifican 1 µF para VDD_RTC, mientras que [C0313 en el esquemático de referencia de la guía](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) está marcado como 0,1 µF. Las fuentes no explican cuándo se aplica cada valor. Confirme con SiFli el valor requerido para el dispositivo concreto antes de liberar el diseño; no resuelva la discrepancia por suposición.

Alimente VDD1 y VDD2 simultáneamente; el SF32LB551 no tiene VDD2. Conecte RSTN al dominio de tensión de entrada de VDD1 mediante una resistencia de pull-up y añada un condensador de 0,1 µF a tierra. El esquemático de referencia etiqueta la alimentación del pull-up como 1,8 V/3,3 V y usa una resistencia de 10 kΩ; elija el nivel que corresponda al dominio VDD1 del diseño. La Figura 5.1-1 muestra un nivel POR de 1,50 V, BOR configurable de 2,5 V a 1,5 V y una marca RSTN de 0,7 V. La medida de la Figura 5.1-3 muestra unos 700 µs desde la subida de alimentación hasta la liberación del reinicio en ese ejemplo; no es un retardo garantizado para todos los diseños.

![Figura 5.1-1: Temporización de encendido y apagado](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-1: Temporización de encendido y apagado</em></div>

![Figura 5.1-2: Circuito de reinicio](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-2: Circuito de reinicio</em></div>

![Figura 5.1-3: Medida del encendido y la liberación del reinicio](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-3: Medida del encendido y la liberación del reinicio</em></div>

![Figura 5.1-4: Circuito de referencia DC-DC para BGA](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-4: Circuito de referencia DC-DC para BGA</em></div>

![Figura 5.1-5: Circuito de referencia DC-DC para QFN](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.1-5: Circuito de referencia DC-DC para QFN</em></div>

Según la nota de aplicación de hardware de SiFli, seleccione un inductor BUCK de 4,7 µH con resistencia de continua DCR ≤ 0,4 Ω y corriente de saturación Isat ≥ 450 mA.

### 5.2. Modo de arranque { #52-boot-mode }

<div align="center"><em>Tabla 5.2-1: Configuración del modo de arranque</em></div>

<div align="center" markdown>

| Configuración del modo | Descripción detallada |
|:-----------------------|:----------------------|
| Nivel alto | Tras encenderse e iniciarse el chip, entra en modo de descarga |
| Nivel bajo | Tras encenderse e iniciarse el chip, salta a la zona del programa de usuario para ejecutarlo |

</div>

Con el nivel alto, el chip entra en modo de descarga al encenderse; con el nivel bajo, arranca el programa del usuario. Asegúrese de que el utillaje de prueba de producción pueda forzar el estado de arranque requerido y de que la carcasa o las limitaciones de acceso para pruebas no bloqueen los pines de arranque.

El pin Mode comparte el dominio de tensión de VDDIOA. Use una resistencia externa de 10 kΩ hacia la alimentación correspondiente o GND para mantener un nivel estable; no lo deje flotante ni permita conmutaciones involuntarias. Las placas de producción deben incluir un punto de prueba Mode para la descarga de firmware y la calibración del cristal; no necesitan un puente. En las placas de prueba, reserve un puente para poder recuperar una aplicación bloqueada arrancando en modo de descarga.

### 5.3. Generación de reloj { #53-clock-generation }

<div align="center"><em>Tabla 5.3-1: Requisitos de los cristales</em></div>

<div align="center" markdown>

| Cristal | Requisitos del cristal | Descripción detallada |
|:--------|:-----------------------------|:----------------------|
| 48 MHz | 7 pF ≦ CL ≦ 12 pF (valor recomendado: 8,8 pF), △F/F0 ≦ ±10 ppm, ESR ≦ 30 Ω (valor recomendado: 22 Ω) | El consumo del oscilador de cristal depende de CL y ESR: cuanto menores sean, menor será el consumo. Para optimizarlo, se recomienda usar componentes con valores de CL y ESR relativamente bajos dentro del rango especificado. Reserve junto al cristal huellas para condensadores de adaptación en paralelo. Si CL < 12 pF, no hace falta montar condensadores |
| 32,768 kHz | CL ≦ 12,5 pF (valor recomendado: 7 pF), △F/F0 ≦ ±20 ppm, ESR ≦ 80 kΩ (valor recomendado: 38 kΩ) | El consumo del cristal depende de CL y ESR: cuanto menores sean, menor será el consumo. Para optimizarlo, se recomienda usar componentes con valores de CL y ESR relativamente bajos dentro del rango especificado. Reserve junto al cristal huellas para condensadores de adaptación en paralelo. Si CL < 12,5 pF, no hace falta soldar condensadores |

</div>

Coloque ambos cristales cerca del chip, mantenga las pistas cortas y simétricas, reserve huellas para los condensadores de adaptación y proteja las redes de cristal del ruido de RF, BUCK, pantalla y motor.

### 5.4. RF { #54-rf }

El front-end de RF del SF32LB55x integra una red de adaptación y filtrado de banda ancha. Mantenga la impedancia característica de las pistas RF de la PCB en 50 Ω y reserve una red de adaptación en π para suprimir señales espurias y adaptar la antena. Determine los valores finales de los componentes mediante pruebas con la antena y el diseño de PCB reales. Si la antena seleccionada ya está adaptada, normalmente no es necesario montar componentes adicionales en la red prevista.

Asegure un plano de referencia de masa continuo bajo las pistas RF, coloque la red de adaptación cerca del chip, sitúe el filtrado de AVDD_BRF junto al pin y aleje del área de RF las pistas de DC-DC, VBAT, cristal, reloj de alta velocidad, SPI, SDIO, I2S y UART.

El circuito RF de referencia coloca C0323 (15 pF/50 V) en serie con ANT y deja sin montar (NF) las posiciones a tierra C0318 y C0319. Son valores de ejemplo, no valores de adaptación universales.

![Figura 5.4-1: Circuito de referencia de adaptación RF](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Circuito de referencia de adaptación RF</em></div>

### 5.5. Interfaces de almacenamiento { #55-storage-interfaces }

SF32LB55x admite PSRAM OPI, flash NOR/NAND QSPI y PSRAM, así como eMMC o Micro SD por SDIO. La selección de encapsulado afecta a la disponibilidad de pines e interfaces; por tanto, complete la selección de almacenamiento antes de fijar los pines y revisar el apilado de la PCB.

BGA145 ofrece un canal de OPI PSRAM externa; BGA169 ofrece dos. Las tablas 5.5-1 a 5.5-3 describen la configuración BGA145 y las dos memorias BGA169, no tres canales en un mismo encapsulado. Las tablas QSPI corresponden a QSPI2, QSPI3 y QSPI4. Las tablas SDIO cubren SDIO1 en modos de 4/8 bits y SDIO2 en modo de 4 bits.

Se recomienda QSPI2 para PSRAM QSPI externa. Si una GPIO de la HCPU controla la alimentación de una PSRAM OPI/QSPI externa, use un pin HCPU de tipo PU, con nivel alto para encender y bajo para apagar. Si conmuta VDD_SIP para el flash interno, use PA58 con la misma polaridad. Consulte al FAE de SiFli sobre el espacio de flash para los algoritmos de acelerómetro y frecuencia cardíaca de la LCPU antes de decidir si añade flash NOR en QSPI4.

Las tablas OPI originales usan descripciones de dirección incoherentes. En el [esquemático de referencia BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png), el [esquemático de referencia BGA169 del dispositivo 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png) y el [del dispositivo 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png), los pines PA37/PA20 y PA07/PA08 de la MCU, respectivamente, controlan CS# y CLK de la PSRAM externa. Por ello, las tablas siguientes describen CS# y CLK desde el lado de la MCU: salida de la MCU y entrada de la PSRAM. Los esquemáticos no indican una dirección fija para DQS/DM; consulte la función y la dirección en la hoja de datos de la PSRAM seleccionada.

Cada PSRAM ilustrada usa 1,8 V, tres condensadores de 0,1 µF y uno de 1 µF/6,3 V. Las conexiones RESET# y NC/CLK# sin conectar son propias del dispositivo mostrado; consulte la hoja de datos de la memoria elegida.

![Figura 5.5-1: Circuito OPI PSRAM BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito OPI PSRAM BGA145</em></div>

<div align="center"><em>Tabla 5.5-1: OPI PSRAM en BGA145</em></div>

<div align="center" markdown>

| Señal PSRAM | Pin de la MCU | Descripción detallada |
|:------------|:----|:------------|
| CS# | PA37 | Salida de la MCU; entrada de la PSRAM |
| CLK | PA20 | Salida de la MCU; entrada de la PSRAM |
| DQS | PA35 | DQS/DM; consulte la función y la dirección en la hoja de datos de la PSRAM seleccionada |
| DQ0 | PA28 | Entrada/salida de datos 0 |
| DQ1 | PA29 | Entrada/salida de datos 1 |
| DQ2 | PA30 | Entrada/salida de datos 2 |
| DQ3 | PA31 | Entrada/salida de datos 3 |
| DQ4 | PA34 | Entrada/salida de datos 4 |
| DQ5 | PA36 | Entrada/salida de datos 5 |
| DQ6 | PA38 | Entrada/salida de datos 6 |
| DQ7 | PA42 | Entrada/salida de datos 7 |

</div>

![Figura 5.5-2: Circuito OPI PSRAM BGA169, memoria 1](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito OPI PSRAM BGA169, memoria 1</em></div>

<div align="center"><em>Tabla 5.5-2: OPI PSRAM en BGA169, memoria 1</em></div>

<div align="center" markdown>

| Señal PSRAM | Pin de la MCU | Descripción detallada |
|:------------|:----|:------------|
| CS# | PA07 | Salida de la MCU; entrada de la PSRAM |
| CLK | PA08 | Salida de la MCU; entrada de la PSRAM |
| DQS | PA15 | DQS/DM; consulte la función y la dirección en la hoja de datos de la PSRAM seleccionada |
| DQ0 | PA02 | Entrada/salida de datos 0 |
| DQ1 | PA04 | Entrada/salida de datos 1 |
| DQ2 | PA05 | Entrada/salida de datos 2 |
| DQ3 | PA06 | Entrada/salida de datos 3 |
| DQ4 | PA09 | Entrada/salida de datos 4 |
| DQ5 | PA11 | Entrada/salida de datos 5 |
| DQ6 | PA12 | Entrada/salida de datos 6 |
| DQ7 | PA13 | Entrada/salida de datos 7 |

</div>

![Figura 5.5-3: Circuito OPI PSRAM BGA169, memoria 2](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito OPI PSRAM BGA169, memoria 2</em></div>

<div align="center"><em>Tabla 5.5-3: OPI PSRAM en BGA169, memoria 2</em></div>

<div align="center" markdown>

| Señal PSRAM | Pin de la MCU | Descripción detallada |
|:------------|:----|:------------|
| CS# | PA07 | Salida de la MCU; entrada de la PSRAM |
| CLK | PA08 | Salida de la MCU; entrada de la PSRAM |
| DQS | PA26 | DQS/DM; consulte la función y la dirección en la hoja de datos de la PSRAM seleccionada |
| DQ0 | PA18 | Entrada/salida de datos 0 |
| DQ1 | PA22 | Entrada/salida de datos 1 |
| DQ2 | PA24 | Entrada/salida de datos 2 |
| DQ3 | PA32 | Entrada/salida de datos 3 |
| DQ4 | PA33 | Entrada/salida de datos 4 |
| DQ5 | PA59 | Entrada/salida de datos 5 |
| DQ6 | PA62 | Entrada/salida de datos 6 |
| DQ7 | PA64 | Entrada/salida de datos 7 |

</div>

<div align="center"><em>Tabla 5.5-4: QSPI2: flash NOR/NAND o PSRAM</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CS# | GPIO9 | PA61 | Selección de chip, activa en nivel bajo |
| SO | GPIO7 | PA65 | Entrada de datos (entrada/salida de datos 1) |
| WP# | GPIO6 | PA66 | Salida de protección contra escritura (entrada/salida de datos 2) |
| SI | GPIO8 | PA63 | Salida de datos (entrada/salida de datos 0) |
| SCLK | GPIO10 | PA60 | Salida de reloj serie |
| Hold# | GPIO5 | PA68 | Salida de datos (entrada/salida de datos 3) |

</div>

<div align="center"><em>Tabla 5.5-5: QSPI3: flash NOR/NAND o PSRAM</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CS# | GPIO16 | PA45 | Selección de chip, activa en nivel bajo |
| SO | GPIO14 | PA49 | Entrada de datos (entrada/salida de datos 1) |
| WP# | GPIO13 | PA51 | Salida de protección contra escritura (entrada/salida de datos 2) |
| SI | GPIO15 | PA47 | Salida de datos (entrada/salida de datos 0) |
| SCLK | GPIO17 | PA44 | Salida de reloj serie |
| Hold# | GPIO12 | PA55 | Salida de datos (entrada/salida de datos 3) |

</div>

<div align="center"><em>Tabla 5.5-6: QSPI4: flash NOR/NAND o PSRAM</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CS# | - | PB33 | Selección de chip, activa en nivel bajo |
| SO | - | PB36 | Entrada de datos (entrada/salida de datos 1) |
| WP# | - | PB37 | Salida de protección contra escritura (entrada/salida de datos 2) |
| SI | - | PB35 | Salida de datos (entrada/salida de datos 0) |
| SCLK | - | PB32 | Salida de reloj serie |
| Hold# | - | PB07 | Salida de datos (entrada/salida de datos 3) |

</div>

<div align="center"><em>Tabla 5.5-7: SDIO1: eMMC/Micro SD de 4 bits</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CLK | GPIO10 | PA34 | Entrada de reloj |
| CMD | GPIO9 | PA36 | Entrada de comando |
| DATA0 | GPIO8 | PA28 | Datos 0 |
| DATA1 | GPIO7 | PA29 | Datos 1 |
| DATA2 | GPIO6 | PA30 | Datos 2 |
| DATA3 | GPIO5 | PA31 | Datos 3 |

</div>

<div align="center"><em>Tabla 5.5-8: SDIO1: eMMC de 8 bits</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CLK | GPIO10 | PA34 | Entrada de reloj |
| CMD | GPIO9 | PA36 | Entrada de comando |
| DATA0 | GPIO8 | PA28 | Datos 0 |
| DATA1 | GPIO7 | PA29 | Datos 1 |
| DATA2 | GPIO6 | PA30 | Datos 2 |
| DATA3 | GPIO5 | PA31 | Datos 3 |
| DATA4 | GPIO15 | PA47 | Datos 4 |
| DATA5 | GPIO14 | PA49 | Datos 5 |
| DATA6 | GPIO13 | PA51 | Datos 6 |
| DATA7 | GPIO12 | PA55 | Datos 7 |

</div>

<div align="center"><em>Tabla 5.5-9: SDIO2: eMMC/Micro SD de 4 bits</em></div>

<div align="center" markdown>

| Señal de interfaz | QFN68 | BGA145/169 | Descripción detallada |
|:------------|:------|:-----------|:------------|
| CLK | GPIO17 | PA44 | Entrada de reloj |
| CMD | GPIO16 | PA45 | Entrada de comando |
| DATA0 | GPIO15 | PA47 | Datos 0 |
| DATA1 | GPIO14 | PA49 | Datos 1 |
| DATA2 | GPIO13 | PA51 | Datos 2 |
| DATA3 | GPIO12 | PA55 | Datos 3 |

</div>


### 5.6. Interfaces de pantalla y táctil { #56-display-and-touch-interfaces }

Las opciones de pantalla incluyen MIPI DSI, SPI/QSPI, MCU8080 y JDI. Elija el panel antes de asignar pines y diseñar las pistas de la PCB para revisar conjuntamente el ancho de interfaz, el reloj, el control de alimentación, la interrupción táctil y la estrategia de retroiluminación.

JDI admite interfaces paralelas y serie mediante los grupos de señales multiplexados del lado PA (LCDC1) o del lado PB (LCDC2). Las tablas siguientes muestran únicamente las asignaciones PA/LCDC1. SiFli recomienda usar PB/LCDC2. La guía fuente no incluye una tabla de asignación pin a pin para LCDC2; confirme la asignación real en la tabla de funciones multiplexadas del chip y no la deduzca de las tablas LCDC1.

<div align="center"><em>Tabla 5.6-1: Interfaz de pantalla MIPI DSI</em></div>

<div align="center" markdown>

| Señal MIPI DSI | Pin BGA145/169 | Descripción |
|:---------------|:---------------|:------------|
| CLKP | DSI_CLKP | Señal de reloj MIPI + |
| CLKN | DSI_CLKN | Señal de reloj MIPI - |
| D0P | DSI_D0P | Carril de datos MIPI 0+ |
| D0N | DSI_D0N | Carril de datos MIPI 0- |
| D1P | DSI_D1P | Carril de datos MIPI 1+ |
| D1N | DSI_D1N | Carril de datos MIPI 1- |
| - | AVDD18_DSI | Entrada de alimentación MIPI |
| - | DSI_REXT | Conecte una resistencia externa de 10 kΩ a tierra |
| - | AVSS_DSI | Tierra |
| TE | PA77 | Señal de tearing effect para la sincronización con el frame de la MCU |
| RESET | PB17 | Señal de reinicio del panel |

</div>

Notas de asignación de pines de pantalla:

- TE también puede conectarse a otra GPIO del grupo PA.
- Si el panel admite la señal TE mediante DSI, no se necesita un pin TE independiente.
- RESET también puede conectarse a otra GPIO del grupo PB.

<div align="center"><em>Tabla 5.6-2: Interfaz de pantalla SPI/QSPI</em></div>

<div align="center" markdown>

| Señal SPI | GPIO QFN68 | Pin BGA145/169 | Descripción detallada |
|:----------|:------|:-----------|:----------------------|
| CSX | GPIO22 | PB33 | Señal de habilitación |
| WRX_SCL | GPIO23 | PB32 | Señal de reloj |
| DCX | GPIO20 | PB36 | Señal de datos/comando en modo SPI de 4 hilos; datos 1 en modo Quad-SPI |
| SDI_RDX | GPIO21 | PB35 | Entrada de datos en modo SPI de 3/4 hilos; datos 0 en modo Quad-SPI |
| SDO | GPIO21 | PB35 | Salida de datos en modo SPI de 3/4 hilos; unir con SDI_RDX |
| D[0] | GPIO19 | PB37 | Datos 2 en modo Quad-SPI |
| D[1] | GPIO18 | PB07 | Datos 3 en modo Quad-SPI |
| RESET | GPIO2 | PB17 | Señal de reinicio del panel |
| TE | GPIO3 | PB77 | Señal de tearing effect para la sincronización con el frame de la MCU |

</div>

Notas de asignación de pines de pantalla:

- TE puede usar PA77 u otra GPIO del grupo PA configurada para emular la señal.
- RESET puede usar cualquier GPIO. Para una pantalla siempre encendida (AOD), SiFli recomienda una GPIO del grupo PB.

<div align="center"><em>Tabla 5.6-3: Interfaz de pantalla MCU8080</em></div>

<div align="center" markdown>

| Señal MCU8080 | GPIO QFN68 | Pin BGA145/169 | Descripción detallada |
|:--------------|:------|:-----------|:------------|
| CSX | GPIO22 | - | Selección de chip |
| WRX | GPIO23 | - | Señal de escritura para transferir datos |
| DCX | GPIO20 | - | Selección de datos/comando de pantalla |
| RDX | GPIO21 | - | Señal de lectura para transacciones de lectura del controlador de pantalla |
| D[0] | GPIO19 | - | Datos 0 |
| D[1] | GPIO18 | - | Datos 1 |
| D[2] | GPIO17 | - | Datos 2 |
| D[3] | GPIO16 | - | Datos 3 |
| D[4] | GPIO15 | - | Datos 4 |
| D[5] | GPIO14 | - | Datos 5 |
| D[6] | GPIO13 | - | Datos 6 |
| D[7] | GPIO12 | - | Datos 7 |
| RESET | GPIO2 | - | Reinicio |
| TE | GPIO3 | - | Señal de tearing effect para la sincronización con el frame de la MCU |

</div>

Notas de asignación de pines de pantalla:

- TE puede usar PA77 u otra GPIO del grupo PA configurada para emular la señal.
- RESET puede usar cualquier GPIO. Para una pantalla siempre encendida (AOD), SiFli recomienda una GPIO del grupo PB.

La [guía de aplicación de hardware de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) identifica RDX como señal de lectura, pero termina su descripción con «para escribir datos». Esa frase contradice tanto el nombre RDX como la señal WRX de escritura asociada; aquí se considera un error de redacción de la fuente. La posibilidad de lectura y sus tiempos dependen del controlador de pantalla elegido; compruébelos en su hoja de datos.

<div align="center"><em>Tabla 5.6-4: Interfaz de pantalla paralela JDI</em></div>

<div align="center" markdown>

| Señal JDI | Pin de la MCU (LCDC1) | Descripción detallada |
|:----------|:------------|:----------------------|
| JDI_VCK | PA20 | Reloj de desplazamiento del controlador vertical |
| JDI_VST | PA31 | Señal de inicio del controlador vertical |
| JDI_XRST | PA34 | Señal de reinicio de los controladores horizontal y vertical |
| JDI_HCK | PA36 | Reloj de desplazamiento del controlador horizontal |
| JDI_HST | PA38 | Señal de inicio del controlador horizontal |
| JDI_ENB | PA42 | Habilitación de escritura de la memoria de píxeles |
| JDI_R1 | PA49 | Datos de imagen roja (píxeles impares) |
| JDI_R2 | PA51 | Datos de imagen roja (píxeles pares) |
| JDI_G1 | PA55 | Datos de imagen verde (píxeles impares) |
| JDI_G2 | PA77 | Datos de imagen verde (píxeles pares) |
| JDI_B1 | PA78 | Datos de imagen azul (píxeles impares) |
| JDI_B2 | PA79 | Datos de imagen azul (píxeles pares) |
| JDI_XFRP | PA45 | Señal de accionamiento de cristal líquido (píxel «encendido») |
| JDI_VCOM/FRP | PA47 | Señal del electrodo común/señal de accionamiento de cristal líquido (píxel «apagado») |

</div>

<div align="center"><em>Tabla 5.6-5: Interfaz de pantalla serie JDI</em></div>

<div align="center" markdown>

| Señal JDI | Pin de la MCU (LCDC1) | Descripción detallada |
|:----------|:------------|:----------------------|
| JDI_SCS | PA31 | Señal de selección de chip |
| JDI_SCLK | PA20 | Señal de reloj serie |
| JDI_SO | PA34 | Señal de salida de datos serie |
| JDI_DISP | PA36 | Señal de encendido/apagado de pantalla |
| JDI_EXTCOMIN | PA38 | Entrada de polaridad de inversión COM |

</div>

<div align="center"><em>Tabla 5.6-6: Interfaces táctil y de retroiluminación</em></div>

<div align="center" markdown>

| Señales de pantalla táctil y retroiluminación | GPIO QFN68 | Pin BGA145 | Pin BGA169 | Descripción detallada |
|:------------------------------|:------|:-------|:-------|:----------------------|
| Interrupción | GPIO1 | PA79 | PA79 | Señal de interrupción del estado táctil (permite activar el dispositivo) |
| I2C1_SCL | GPIO25 | PA10 | PA10 | Reloj I2C de la pantalla táctil |
| I2C1_SDA | GPIO24 | PA14 | PA14 | Datos I2C de la pantalla táctil |
| BL_PWM | GPIO0 | - | - | Señal de control PWM de retroiluminación |
| Reinicio | GPIO16 | PA00 | PA00 | Señal de reinicio táctil |
| Habilitación de alimentación | GPIO26 | PA06 | PA03 | Señal de habilitación de alimentación de la pantalla táctil |

</div>

Para BL_PWM, use una GPIO con función GPTIM1_CHx y configure un estado adecuado de pull-up o pull-down para evitar que la retroiluminación se encienda inesperadamente durante el arranque en frío.

### 5.7. Interfaces de activación, GPADC y fabricación { #57-wake-gpadc-and-manufacturing-interfaces }

Planifique las conexiones de activación, analógicas, de depuración y de producción teniendo en cuenta la carcasa y el utillaje. Los pines de activación necesitan niveles de reposo definidos y protección ESD; los divisores GPADC deben equilibrar el tiempo de establecimiento y las fugas; y el acceso de depuración/descarga debe seguir disponible durante EVT y producción.

SF32LB55x dispone de cuatro fuentes de activación HCPU (WKUP_A0–WKUP_A3) y seis LCPU (WKUP_B0–WKUP_B5). Cada una activa su CPU; solo las seis LCPU permiten despertar de Hibernate. Ninguna de las diez entradas puede quedar flotante: añada resistencias externas pull-up o pull-down según la función para evitar fugas durante el reposo.

En el circuito de referencia, KEY1 se conecta a PB48 con un pull-up de 10 kΩ a VDD_1V8, protección ESD y un condensador. La red KEY2 muestra pull-ups de 10 kΩ, protección ESD y conexiones seleccionables mediante puentes a PA08, PA77 y PA78; C0004 aparece marcado como NF (no montado). Son ejemplos de circuito, no una lista de pines capaces de despertar el sistema: PA08 no figura en la tabla 5.7-1. Elija de esa tabla la entrada compatible que vaya a usar y mantenga cada entrada en un nivel de reposo definido.

![Figura 5.7-1: Circuito de referencia del botón de activación](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-1: Circuito de referencia del botón de activación</em></div>

Use una GPIO con GPTIM1_CHx para la PWM del motor. Seleccione el comportamiento PU/PD adecuado para evitar una activación involuntaria al arrancar en frío. El circuito de referencia usa GPIO17 (PA44), un transistor de lado bajo y una resistencia de 1 MΩ a tierra en la puerta, con alimentación de 3 V para el motor y otra de 3,3 V para la MCU.

![Figura 5.7-2: Circuito de referencia del controlador del motor](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-2: Circuito de referencia del controlador del motor</em></div>

<div align="center"><em>Tabla 5.7-1: Fuentes de interrupción de activación</em></div>

<div align="center" markdown>

| Fuente de interrupción | QFN68 | BGA145/169 | Descripción detallada |
|:-----------------------|:------|:-----------|:----------------------|
| WKUP_A0 | GPIO3 | PA77 | Señal de interrupción HCPU 0 |
| WKUP_A1 | GPIO2 | PA78 | Señal de interrupción HCPU 1 |
| WKUP_A2 | GPIO1 | PA79 | Señal de interrupción HCPU 2 |
| WKUP_A3 | GPIO0 | PA80 | Señal de interrupción HCPU 3 |
| WKUP_B0 | GPIO43 | PB43 | Señal de interrupción LCPU 0 |
| WKUP_B1 | GPIO44 | PB44 | Señal de interrupción LCPU 1 |
| WKUP_B2 | GPIO45 | PB45 | Señal de interrupción LCPU 2 |
| WKUP_B3 | GPIO46 | PB46 | Señal de interrupción LCPU 3 |
| WKUP_B4 | GPIO47 | PB47 | Señal de interrupción LCPU 4 |
| WKUP_B5 | GPIO48 | PB48 | Señal de interrupción LCPU 5 |

</div>

La guía de aplicación de hardware de SiFli describe un GPADC de cinco canales y 10 bits, con un rango de entrada de 0–0,9 V. Para un diseño conservador, conecte VIN directamente solo si es inferior a 0,9 V; para tensiones superiores, use un divisor que mantenga VADC por debajo de 0,9 V. Para medir la batería, la fuente recomienda una relación R1:R2 cercana a 5:1 y resistencias del orden de MΩ: reducir la corriente aumenta el tiempo de establecimiento. El circuito añade un condensador de 0,1 µF entre VADC y tierra. Use `VADC = VIN × R2 / (R1 + R2)` y compruebe la tensión máxima de batería y las tolerancias; las corrientes de la tabla 5.7-2 corresponden a VIN = 4,2 V, no a todas las condiciones.

Discrepancia entre fuentes: la [guía de aplicación de hardware OpenSiFli, de mayor prioridad](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) describe un GPADC de 10 bits y cinco canales, con un rango de entrada de 0–0,9 V. El punto 2 de la [lista de comprobación de esquemático V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) fija un máximo de 1,0 V, pero no especifica el número de canales. La [hoja de datos SF32LB55x V1.7.2, sección 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) especifica ocho entradas asimétricas o cuatro pares diferenciales, con rangos de 0–1,1 V y −0,7 a 0,7 V, respectivamente; su tabla de pines enumera GPADC_CH0–CH7. La [guía ADC actual del SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) también asigna ocho canales (0–7) e indica 1,1 V como tensión máxima de muestreo. SiFli no ha explicado las diferencias en el número de canales ni en los límites de tensión. Hasta que se aclare por escrito, esta guía mantiene como base de diseño el criterio de la fuente de mayor prioridad: cinco canales y un rango de entrada de 0–0,9 V. Mantenga VADC por debajo de 0,9 V; no trate 1,0 V ni 1,1 V como límites aprobados y confirme la disponibilidad de canales para el dispositivo y el encapsulado seleccionados.

![Figura 5.7-3: Entrada GPADC y divisor de referencia](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-3: Entrada GPADC y divisor de referencia</em></div>

<div align="center"><em>Tabla 5.7-2: Ejemplos de divisores GPADC</em></div>

<div align="center" markdown>

| Combinación de resistencias | R1 (kΩ) ±1% | R2 (kΩ) ±1% | Tiempo de estabilización de tensión (ms) | Iq (µA) (VIN = 4,2 V) |
|:----------------------------|--------------:|--------------:|------------------------------------------:|--------------------:|
| 1 | 1000 | 220 | 138 | 3,44 |
| 2 | 2000 | 430 | 250 | 1,73 |
| 3 | 3000 | 680 | 302 | 1,14 |
| 4 | 4300 | 910 | - | 0,81 |
| 5 | 5100 | 1100 | 420 | 0,68 |

</div>

Conecte a la LCPU las interfaces I2C/SPI, de control y de interrupción de activación de los sensores de frecuencia cardíaca y aceleración. Use DC-DC, LDO o interruptores de carga de bajo Iq para conmutar sus alimentaciones según sea necesario.

El audio Bluetooth externo se comunica por UART1 de la HCPU. Iguale los niveles de tensión o añada un convertidor de nivel; al cortar la alimentación del módulo, corte simultáneamente la del convertidor para evitar fugas. Si el módulo permanece alimentado durante Standby y su habilitación es activa en bajo, use una GPIO de la LCPU con comportamiento PD predeterminado.

<div align="center"><em>Tabla 5.7-3: Interfaz de depuración y grabación</em></div>

<div align="center" markdown>

| Señal UART | QFN68 | BGA145/169 | Descripción detallada |
|:-----------|:------|:-----------|:----------------------|
| TXD1 | GPIO13 | PA19 | Señal UART1 RXD |
| RXD1 | GPIO14 | PA17 | Señal UART1 TXD |
| TXD2 | - | PA07 | Señal UART2 RXD |
| RXD2 | - | PA05 | Señal UART2 TXD |
| TXD3 | GPIO46 | PB46 | Señal UART3 RXD, puerto de registro predeterminado del sistema |
| RXD3 | GPIO45 | PB45 | Señal UART3 TXD, puerto de registro predeterminado del sistema |
| TXD4 | - | PB14 | Señal UART4 RXD |
| RXD4 | - | PB12 | Señal UART4 TXD |
| TXD5 | - | PB11 | Señal UART5 RXD |
| RXD5 | - | PB06 | Señal UART5 TXD |
| SWCLK | GPIO41 | PB31 | Señal de reloj SWD |
| SWDIO | GPIO42 | PB34 | Señal de datos SWD |

</div>

No deje UART RXD flotante; habilite el pull-up interno durante la inicialización del firmware. UART3 es el puerto de registro predeterminado. SiFli ofrece un grabador autónomo para grabación en producción y calibración del cristal. Reserve al menos VBAT, GND, VDDIOA, VDDIOB, RSTN, Mode, SWDIO, SWCLK, RXD1, TXD1, RXD3 y TXD3 como puntos de prueba. El subconjunto de producción es VBAT, GND, boot_mode, VDDIOB, RXD3 y TXD3. VBAT y boot_mode son etiquetas de la fuente para el banco de pruebas: identifique la alimentación real y la conexión Mode antes de cablear.

El dibujo original conecta VDD_1V8 al pin 1 (VTref). SWDIO y SWCLK se conectan a los pines 7 y 9, respectivamente, cada uno mediante una resistencia en serie de 22 Ω. El [J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector) estándar también usa el pin 1 para [VTref](https://kb.segger.com/VTref), la entrada de referencia de tensión del objetivo, no una salida de alimentación de la sonda. Compruebe la orientación del conector y la compatibilidad con 1,8 V antes de conectar un cable estándar.

![Figura 5.7-4: Conector SWD original: verificar el adaptador](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-4: Conector SWD original: verificar el adaptador</em></div>
