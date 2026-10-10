---
icon: lucide/circuit-board
hide:
    - navigation
description: "Guía de diseño esquemático del MCU SF32LB58x: alimentación, generación de reloj, RF, interfaces de usuario, almacenamiento, conectividad y fabricación."
tags:
    - Hardware
    - Chip
---

# Guía de diseño de hardware SF32LB58x — Directrices de diseño esquemático {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "Parte de la guía de diseño de hardware SF32LB58x"
    Esta página corresponde a la sección 5, Directrices de diseño esquemático. Consulte la [descripción general de la guía de diseño de hardware SF32LB58x](SF32LB58x_hardware_design_guide.md) para elegir el dispositivo y conocer el flujo completo de diseño. También puede ir a la [lista de comprobación del esquemático](SF32LB58x_schematic_checklist.md) o avanzar a las [pautas de diseño de PCB](SF32LB58x_pcb_layout.md).

## 5. Directrices de diseño esquemático {#5-schematic-design-guidelines}

Este capítulo sigue el flujo de diseño esquemático del SF32LB58x: empieza por el sistema mínimo y continúa con la alimentación, la generación de reloj, RF, las interfaces de usuario, el almacenamiento y la conectividad, y la fabricación. Cada apartado explica primero el objetivo de diseño y después recoge los requisitos del circuito, los riesgos habituales y las comprobaciones previas a la publicación del diseño.

<div align="center"><em>Tabla 5-1: Mapa de las secciones del diseño esquemático</em></div>

<div align="center" markdown>

| Grupo | Decisiones principales | Evidencias para la revisión final |
|:---|:---|:---|
| Diseño del sistema mínimo | Variante y encapsulado exactos, alimentación y reset, relojes, arranque y almacenamiento, depuración y recuperación | Revisión inicial de puesta en marcha y plan de arranque/recuperación |
| Sistema de alimentación | PMIC del sistema, líneas del PMU del chip, inductores BUCK, condensadores LDO, reinicio y fuentes de activación de bajo consumo | Árbol de alimentación, configuración del PMIC, mediciones de las líneas y revisión de POR/BOR/reinicio |
| Generación de reloj | Cristales de 48 MHz y 32,768 kHz | Verificación de las especificaciones, plan de condensadores de ajuste e imágenes del diseño de los cristales |
| RF | Adaptación de RF y recorrido de la antena | Plan de impedancias, red de adaptación de RF, zona de exclusión de la antena e imágenes del diseño |
| Interfaces de usuario | Pantalla, táctil/retroiluminación, audio, botones, motor y control PBR | Esquemas de las interfaces, asignación de pines, secuencia de alimentación y revisión de las señales analógicas/de audio |
| Almacenamiento y conectividad | Modo de arranque, MPI4, SD1/SD2, eMMC/SD NAND/tarjeta SD y USB 2.0 HS | Configuración de arranque, plan de alimentación del almacenamiento y evidencias del enrutamiento diferencial/de alta velocidad |
| Fabricación | SWD, salidas UART de depuración, acceso para pruebas de producción y listas de comprobación del esquema/PCB | Plano de puntos de prueba, método de recuperación y plan de programación/calibración en producción |

</div>

### 5.1. Diseño del sistema mínimo {#51-minimum-system-design}

Trate el sistema mínimo como el primer punto de control de la revisión esquemática. Antes de añadir periféricos específicos del producto, confirme el dispositivo y encapsulado exactos, las líneas de alimentación y los relojes necesarios, el comportamiento del reset, la configuración de arranque y el almacenamiento, y una ruta práctica de depuración y recuperación. Estas decisiones determinan si la placa puede encenderse, arrancar y ponerse en marcha de forma fiable.

<div align="center"><em>Tabla 5.1-1: Comprobaciones del diseño del sistema mínimo</em></div>

<div align="center" markdown>

| Bloque | Comprobación de diseño para SF32LB58x | Guía detallada |
|:---|:---|:---|
| Dispositivo y encapsulado | Confirme la referencia y el encapsulado exactos; compruebe que la asignación de pines y la configuración de memoria integrada permiten las interfaces previstas. | [Variantes y encapsulados](SF32LB58x_hardware_design_guide.md#32-variants) |
| Alimentación | Incluya las líneas necesarias del PMU y externas, los componentes BUCK y el desacoplo local. | [Sistema de alimentación](#51-power-system) |
| Relojes | Incluya el cristal principal de 48 MHz y el cristal RTC de 32,768 kHz, respetando las condiciones especificadas de carga y disposición. | [Generación de reloj](#52-clock-generation) |
| Reset | Implemente el circuito RC externo de `RSTN` referido al dominio de alimentación `PVDD1`. | [Secuencia de encendido y reset](#5115-power-up-sequencing-and-reset) |
| Modo de arranque | Fije el pin `Mode` a un nivel estable mediante una resistencia de 10 kΩ; reserve un punto de prueba en las placas de producción y un jumper de recuperación en las placas de prueba. | [Configuración de arranque](#551-boot-configuration) |
| Almacenamiento de arranque | Elija una interfaz de almacenamiento compatible y verifique la asignación de pines, la tensión de E/S y la alimentación según el dispositivo elegido. | [Almacenamiento](#552-storage) |
| Acceso para la puesta en marcha | Reserve acceso en la placa a SWD y a las señales UART de depuración necesarias, además de las referencias de alimentación y tierra para la sonda. | [Interfaz de depuración y descarga](#561-debug-and-download-interface) |
| Funcionamiento de bajo consumo | Confirme las fuentes de activación y el control de alimentación externa que requieren los modos de suspensión previstos. | [Modos de funcionamiento y fuentes de activación](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. Sistema de alimentación {#51-power-system}

#### 5.2.1. Alimentación {#511-power-supply}
La serie SF32LB58x integra un PMU con dos salidas BUCK. Cada una requiere un inductor externo y un condensador conectado a la entrada de alimentación interna correspondiente. También incorpora tres salidas LDO que requieren condensadores externos. En diseños para relojes inteligentes, el SF32LB58x puede combinarse con el PMIC SF30147C de SiFli, que alimenta tanto al chip como a sus periféricos.

##### 5.2.1.1. Distribución de alimentación del PMIC de SiFli {#5111-sifli-pmic-power-distribution}

El SF30147C es un circuito integrado de gestión de alimentación altamente integrado y de alta eficiencia, destinado a productos vestibles de consumo ultrabajo. Integra cuatro LDO, cada uno con un amplio rango de tensión de entrada/salida y una corriente de carga de hasta 100 mA. Para alimentar distintos periféricos, incorpora siete interruptores de carga con baja corriente de fuga y baja resistencia de conducción: dos interruptores de alta tensión para periféricos alimentados directamente desde la batería (por ejemplo, un amplificador de potencia de audio) y cinco de baja tensión para periféricos de 1,8 V. El SF32LB58x controla el SF30147C mediante una señal TWI emulada con dos GPIO.

<div align="center"><em>Tabla 5.2-1: Distribución de alimentación del SF30147C</em></div>

<div align="center" markdown>

| Salida del SF30147C | Tensión mín. (V) | Tensión máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|
| VBUCK | 1,8 | 1,8 | 500 | Alimenta las líneas de 1,8 V del SF32LB58x, entre ellas PVDD1, PVDD2, VDDIOA, VDDIOA2, VDDIOB, AVDD_BRF y AVDD18_DSI |
| LVSW1 | 1,8 | 1,8 | 100 | Alimentación lógica del amplificador de potencia Clase K para I2S |
| LVSW2 | 1,8 | 1,8 | 100 | Alimentación de 1,8 V del acelerómetro |
| LVSW3 | 1,8 | 1,8 | 150 | Alimentación de 1,8 V del sensor de frecuencia cardiaca |
| LVSW4 | 1,8 | 1,8 | 150 | Alimentación de 1,8 V de la pantalla LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Alimentación del núcleo de eMMC |
| LDO1 | 2,8 | 3,3 | 100 | Alimenta las líneas de 3,3 V del SF32LB58x, entre ellas AVDD33_USB, AVDD33_ANA, AVDD33_AUD y AVDDIOA2, así como otras líneas de 3,3 V |
| LDO2 | 2,8 | 3,3 | 100 | Alimentación de eMMC o SD NAND |
| LDO3 | 2,8 | 3,3 | 100 | Alimentación de 3,3 V de la pantalla LCD |
| LDO4 | 2,8 | 3,3 | 100 | Alimentación de 3,3 V del sensor de frecuencia cardiaca |
| HVSW1 | 2,8 | 5 | 150 | Alimentación del amplificador de potencia analógico Clase K |
| HVSW2 | 2,8 | 5 | 150 | Alimentación del GPS |

</div>

Consulte la hoja de datos del SF30147C para obtener todos los detalles.

##### 5.2.1.2. Requisitos de alimentación del SF32LB58x {#5112-sf32lb58x-power-requirements}

Las especificaciones de alimentación del PMU integrado en la serie SF32LB58x se resumen a continuación.

<div align="center"><em>Tabla 5.2-2: Especificaciones de alimentación del PMU</em></div>

<div align="center" markdown>

| Línea del PMU | Tensión mín. (V) | Tensión típica (V) | Tensión máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1,71 | 1,8 | 3,6 | 100 | Entrada de alimentación PVDD1 |
| PVDD2 | 1,71 | 1,8 | 3,6 | 50 | Entrada de alimentación PVDD2 |
| BUCK1_LX / BUCK1_FB | - | 1,25 | - | 100 | La salida BUCK1_LX se conecta al inductor y a la entrada de alimentación interna 1; el otro extremo del inductor se conecta a un condensador externo |
| BUCK2_LX / BUCK2_FB | - | 0,9 | - | 50 | La salida BUCK2_LX se conecta al inductor y a la entrada de alimentación interna 2; el otro extremo del inductor se conecta a un condensador externo |
| LDO_VOUT1 | - | 1,1 | - | 100 | Salida LDO; requiere un condensador externo |
| VDD_RET | - | 0,9 | - | 1 | Salida del LDO RET; requiere un condensador externo |
| VDD_RTC | - | 1,1 | - | 1 | Salida del LDO RTC; requiere un condensador externo |
| MIC_BIAS | 1,4 | - | 2,8 | - | Salida de alimentación para el micrófono |

</div>

Las demás líneas que requieren alimentación externa se especifican a continuación.

<div align="center"><em>Tabla 5.2-3: Especificaciones de las demás líneas de alimentación</em></div>

<div align="center" markdown>

| Línea de alimentación | Tensión mín. (V) | Tensión típica (V) | Tensión máx. (V) | Corriente máx. (mA) | Descripción |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | Entrada de alimentación de RF |
| AVDD18_DSI | 1,71 | 1,8 | 2,5 | 20 | Entrada de alimentación de MIPI DSI; déjela sin conectar si no se utiliza |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentación analógica y del amplificador de potencia RF |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentación de audio analógico |
| AVDD33_USB | 3,15 | 3,3 | 3,45 | 50 | Entrada de alimentación de USB |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S para PA12-PA93 |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S para PA0-PA11 |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | Entrada de alimentación de E/S para PB |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación de SIPA |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación de SIPB |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | Entrada de alimentación de SIPC |
| GPADC_VREFP | - | - | - | - | Entrada de referencia del GPADC; solo requiere un condensador, no alimentación externa |
| AUD_VREF | - | - | - | - | Entrada de referencia de audio; solo requiere un condensador, no alimentación externa |

</div>

##### 5.2.1.3. Valores recomendados de los condensadores {#5113-recommended-capacitor-values}

<div align="center"><em>Tabla 5.2-4: Condensadores de desacoplo recomendados</em></div>

<div align="center" markdown>

| Línea | Condensador | Descripción |
|:---|:---|:---|
| PVDD1 | 0,1 µF + 10 µF | Coloque cerca del pin ambos condensadores: uno de 10 µF como mínimo y otro de 0,1 µF |
| PVDD2 | 0,1 µF + 10 µF | Coloque cerca del pin ambos condensadores: uno de 10 µF como mínimo y otro de 0,1 µF |
| BUCK1_LX / BUCK1_FB | 0,1 µF + 4,7 µF | Coloque cerca del pin ambos condensadores: uno de 4,7 µF como mínimo y otro de 0,1 µF |
| BUCK2_LX / BUCK2_FB | 0,1 µF + 4,7 µF | Coloque cerca del pin ambos condensadores: uno de 4,7 µF como mínimo y otro de 0,1 µF |
| LDO_VOUT1 | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| VDD_RET | 0,47 µF | Coloque al menos un condensador de 0,47 µF cerca del pin |
| VDD_RTC | 0,1 µF | Coloque al menos un condensador de 0,1 µF cerca del pin |
| AVDD_BRF | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| AVDD18_DSI | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| AVDD33_ANA | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| AVDD33_AUD | 4,7 µF | Coloque al menos un condensador de 4,7 µF cerca del pin |
| AVDD33_USB | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| MIC_BIAS | 1 µF | Coloque al menos un condensador de 1 µF cerca del pin |
| VDDIOA / VDDIOA2 / VDDIOB | 1 µF | Coloque al menos un condensador de 1 µF cerca de los pines |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 µF | Coloque al menos un condensador de 1 µF cerca de los pines |

</div>

##### 5.2.1.4. Selección del inductor BUCK {#5114-buck-inductor-selection}

!!! important "Parámetros clave del inductor de alimentación"
    L (inductancia) = 4,7 µH, DCR (resistencia en continua) ≤ 0,4 Ω, Isat (corriente de saturación) ≥ 500 mA

##### 5.2.1.5. Secuencia de encendido y reinicio {#5115-power-up-sequencing-and-reset}

La serie SF32LB58x integra POR (reinicio al encender) y BOR (reinicio por caída de tensión), y también admite la señal externa de reinicio por hardware RSTN.

Se recomienda conectar con pull-up la señal de reinicio RSTN al dominio de tensión de entrada PVDD1, con un condensador de 0,1 µF a tierra que forme un reinicio con retardo RC.

![Figura 5.2-1: Secuencia de encendido y apagado](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-1: Secuencia de encendido y apagado</em></div>

![Figura 5.2-2: Circuito de reinicio](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-2: Circuito de reinicio</em></div>

##### 5.2.1.6. Circuito de alimentación típico {#5116-typical-power-circuit}

La serie SF32LB58x puede utilizar el PMIC SF30147C de SiFli para alimentar sus distintas líneas; consulte la asignación en la tabla 5.2-1. El chip también integra dos salidas BUCK y tres salidas LDO.

![Figura 5.2-3: Esquema de alimentación con SF30147C](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-3: Esquema de alimentación con SF30147C</em></div>

![Figura 5.2-4: Circuito del convertidor DC-DC (BUCK) integrado](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-4: Circuito del convertidor DC-DC (BUCK) integrado</em></div>

![Figura 5.2-5: Circuito del LDO integrado](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.2-5: Circuito del LDO integrado</em></div>

##### 5.2.1.7. Lista de comprobación del diseño de alimentación {#5117-power-design-checklist}

- [ ] Confirme que el rango de alimentación PVDD1/PVDD2 del modelo elegido (1,71 V–3,6 V) se ajusta al esquema de alimentación real.
- [ ] Compruebe que el inductor BUCK cumple 4,7 µH, DCR ≤ 0,4 Ω e Isat ≥ 500 mA.
- [ ] Verifique que los condensadores de desacoplo de PVDD1/PVDD2, BUCK1/2_LX/FB, LDO_VOUT1, VDD_RET y VDD_RTC tienen los valores recomendados en esta sección.
- [ ] Si utiliza el SF30147C, confirme que la asignación de tensión y corriente de sus siete interruptores de carga satisface los requisitos de los periféricos.
- [ ] Compruebe que el retardo RC del circuito RSTN cumple los requisitos de temporización de reinicio del dispositivo.

#### 5.2.2. Modos de funcionamiento y fuentes de activación {#512-operating-modes-and-wake-sources}

Conviene revisar la estrategia de bajo consumo en conjunto con las funciones PBR, las interrupciones de activación, los interruptores de alimentación del almacenamiento, las fuentes de alimentación de los sensores y los interruptores de carga del PMIC externo.

La serie SF32LB58x ofrece seis interfaces PBR con las siguientes características:

1. Durante el encendido, PBR0 cambia de 0 a 1 y puede controlar determinados interruptores de carga externos (LSW); PBR1-PBR5 tienen como salida predeterminada el nivel 0.
2. PBR0-PBR5 pueden funcionar como salidas tanto en modo Standby como en modo Hibernate.
3. PBR0-PBR5 pueden emitir la señal LPTIM.
4. PBR0-PBR5 pueden emitir una señal de reloj de 32 kHz.
5. PBR0-PBR3 pueden configurarse como entradas para recibir señales de activación; mientras el MCU está despierto, no generan una interrupción.

Todas las GPIO de la serie SF32LB58x admiten la activación desde los modos Light Sleep y Deep Sleep. En los modos Standby y Hibernate hay 16 fuentes de interrupción capaces de activar el chip: seis en PA y diez en PB.

<div align="center"><em>Tabla 5.2-5: Conexiones de las fuentes de interrupción</em></div>

<div align="center" markdown>

| Fuente de interrupción | I/O | Descripción |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | Señal de interrupción 0 |
| WKUP_PIN1 | PB55 | Señal de interrupción 1 |
| WKUP_PIN2 | PB56 | Señal de interrupción 2 |
| WKUP_PIN3 | PB57 | Señal de interrupción 3 |
| WKUP_PIN4 | PB58 | Señal de interrupción 4 |
| WKUP_PIN5 | PB59 | Señal de interrupción 5 |
| WKUP_PIN6 | PA64 | Señal de interrupción 6 |
| WKUP_PIN7 | PA65 | Señal de interrupción 7 |
| WKUP_PIN8 | PA66 | Señal de interrupción 8 |
| WKUP_PIN9 | PA67 | Señal de interrupción 9 |
| WKUP_PIN10 | PA68 | Señal de interrupción 10 |
| WKUP_PIN11 | PA69 | Señal de interrupción 11 |
| WKUP_PIN12 | PBR0 | Señal de interrupción 12 |
| WKUP_PIN13 | PBR1 | Señal de interrupción 13 |
| WKUP_PIN14 | PBR2 | Señal de interrupción 14 |
| WKUP_PIN15 | PBR3 | Señal de interrupción 15 |

</div>

!!! note "Recuento de fuentes de activación pendiente de confirmación"
    El texto de la fuente indica que hay 16 fuentes de interrupción capaces de activar el chip: 6 en PA y 10 en PB. Sin embargo, la tabla enumera 6 pines PB, 6 pines PA y 4 pines PBR. La fuente no aclara si PBR se incluye en el recuento de PB. Confirme con SiFli cómo se agrupan antes de basar el diseño en los totales de PA/PB.

### 5.3. Generación de reloj {#52-clock-generation}
La serie SF32LB58x requiere dos fuentes de reloj externas: un cristal principal de 48 MHz y un cristal RTC de 32,768 kHz.

<div align="center"><em>Tabla 5.3-1: Requisitos de especificación de los cristales</em></div>

<div align="center" markdown>

| Cristal | Especificación | Descripción |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (recomendado: 8,8 pF), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (recomendado: 22 Ω) | El consumo del cristal depende de CL y ESR; cuanto menores sean estos valores, menor será el consumo. Reserve junto al cristal espacio para condensadores de ajuste en paralelo; no son necesarios si CL < 12 pF. |
| 32,768 kHz | CL ≤ 12,5 pF (recomendado: 7 pF), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (recomendado: 38 kΩ) | El consumo del cristal depende de CL y ESR; cuanto menores sean estos valores, menor será el consumo. Reserve junto al cristal espacio para condensadores de ajuste en paralelo; no son necesarios si CL < 12,5 pF. |

</div>

<div align="center"><em>Tabla 5.3-2: Modelos de cristal incluidos en la AVL de SiFli</em></div>

<div align="center" markdown>

| Modelo | Fabricante | Parámetros |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 a 8 ppm, CL = 8,8 pF, ESR ≤ 22 Ω máx., TOPR = -30 a 85 °C, encapsulado 2016 (métrico) |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 a 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ máx., TOPR = -40 a 85 °C, encapsulado 3215 (métrico) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 a 10 ppm, CL = 8,8 pF, ESR ≤ 40 Ω máx., TOPR = -20 a 75 °C, encapsulado 2016 (métrico) |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 a 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ máx., TOPR = -40 a 85 °C, encapsulado 3215 (métrico) |

</div>

!!! note
    La recomendación general para el cristal de 48 MHz fija ESR ≤ 30 Ω (22 Ω recomendado), mientras que el modelo SX20Y048000B31T-8.8 figura con ESR ≤ 40 Ω. La fuente incluye ambos valores, pero no explica la diferencia; confirme con SiFli que el modelo sea adecuado antes de usarlo. Su mayor ESR también puede aumentar el consumo estático. Al diseñar la PCB, retire el cobre de GND de la segunda capa situado justo debajo del cristal para reducir la capacitancia de carga parásita de la señal de reloj.

Consulte la [lista de proveedores aprobados por SiFli][SiFli Approved Vendor List (AVL)] para obtener información detallada sobre los componentes incluidos en ella.

### 5.4. RF {#53-rf}

El frontal de RF del SF32LB58x integra en el chip una tecnología de filtrado y adaptación de banda ancha, por lo que basta con una pista de RF en la PCB con impedancia controlada de 50 Ω. Se recomienda reservar en el diseño una red de adaptación π para filtrar emisiones espurias y adaptar la antena.

![Figura 5.4-1: Esquema del circuito de RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.4-1: Esquema del circuito de RF</em></div>

!!! note "Nota"
    Los valores de los componentes de la red de adaptación deben determinarse mediante pruebas con la antena real y el diseño definitivo de la PCB.

### 5.5. Interfaces de usuario {#54-user-interfaces}

#### 5.5.1. Pantalla {#541-display}
##### 5.5.1.1. Interfaz de pantalla MIPI DSI {#5411-mipi-dsi-display-interface}

La serie SF32LB58x admite una interfaz de pantalla MIPI DSI de dos carriles.

<div align="center"><em>Tabla 5.5-1: Conexiones de señales MIPI DSI</em></div>

<div align="center" markdown>

| Señal MIPI DSI | I/O | Descripción |
|:---|:---|:---|
| CLKP | DSI_CLKP | Señal de reloj MIPI positiva |
| CLKN | DSI_CLKN | Señal de reloj MIPI negativa |
| D0P | DSI_D0P | Carril de datos MIPI 0 positivo |
| D0N | DSI_D0N | Carril de datos MIPI 0 negativo |
| D1P | DSI_D1P | Carril de datos MIPI 1 positivo |
| D1N | DSI_D1N | Carril de datos MIPI 1 negativo |
| - | AVDD18_DSI | Entrada de alimentación MIPI |
| - | DSI_REXT | Resistencia externa de 10 kΩ a tierra |
| - | AVSS_DSI | Tierra |
| TE | PB2 | Señal de efecto de rasgado hacia el MCU para sincronizar el fotograma |
| RESET | PB5 | Señal de reinicio de la pantalla |

</div>

##### 5.5.1.2. Interfaz de pantalla SPI/QSPI {#5412-spiqspi-display-interface}

La serie SF32LB58x admite SPI de 3 y 4 hilos, así como Quad-SPI, para conectar un panel LCD. HCPU utiliza LCDC1 en PA y LCPU utiliza LCDC2 en PB.

<div align="center"><em>Tabla 5.5-2: Conexiones de señales SPI/QSPI</em></div>

<div align="center" markdown>

| Señal SPI | I/O (LCDC1) | I/O (LCDC2) | Descripción |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | Habilitación del chip |
| WRX_SCL | PA46 | PB10 | Señal de reloj |
| DCX | PA48 | PB03 | Señal de datos/comando en modo SPI de 4 hilos; dato 1 en modo Quad-SPI |
| SDI_RDX | PA50 | PB09 | Entrada de datos en modo SPI de 3 o 4 hilos; dato 0 en modo Quad-SPI |
| SDO | PA50 | PB09 | Salida de datos en modo SPI de 3 o 4 hilos; conéctela a SDI_RDX |
| D[0] | PA47 | PB04 | Dato 2 en modo Quad-SPI |
| D[1] | PA45 | PB06 | Dato 3 en modo Quad-SPI |
| REST | PA74 | PB05 | Señal de reinicio de la pantalla |
| TE | PA43 | PB02 | Señal de efecto de rasgado hacia el MCU para sincronizar el fotograma |

</div>

##### 5.5.1.3. Interfaz de pantalla MCU8080 {#5413-mcu8080-display-interface}

La serie SF32LB58x admite una interfaz MCU8080 para conectar un panel LCD.

<div align="center"><em>Tabla 5.5-3: Conexiones de señales MCU8080</em></div>

<div align="center" markdown>

| Señal MCU8080 | I/O | Descripción |
|:---|:---|:---|
| CSX | PA44 | Selección del chip |
| WRX | PA46 | Señal de escritura para enviar datos |
| DCX | PA48 | Selección entre datos y comandos de pantalla |
| RDX | PA50 | Señal de estrobo de lectura |
| D[0] | PA47 | Dato 0 |
| D[1] | PA45 | Dato 1 |
| D[2] | PA26 | Dato 2 |
| D[3] | PA27 | Dato 3 |
| D[4] | PA42 | Dato 4 |
| D[5] | PA51 | Dato 5 |
| D[6] | PA52 | Dato 6 |
| D[7] | PA58 | Dato 7 |
| REST | PA24 | Reinicio |
| TE | PA43 | Señal de efecto de rasgado hacia el MCU para sincronizar el fotograma |

</div>

!!! note "Descripción de la señal RDX"
    La fuente describe RDX como una «señal de estrobo de lectura para datos de escritura», una formulación internamente contradictoria. La tabla la presenta como señal de estrobo de lectura; confirme con SiFli la función prevista de RDX antes de publicar.

##### 5.5.1.4. Interfaz de pantalla DPI {#5414-dpi-display-interface}

La serie SF32LB58x admite una interfaz DPI para conectar un panel LCD.

<div align="center"><em>Tabla 5.5-4: Conexiones de señales DPI</em></div>

<div align="center" markdown>

| Señal DPI | I/O | Descripción |
|:---|:---|:---|
| CLK | PA12 | Señal de reloj |
| DE | PA13 | Señal de habilitación de datos |
| HSYNC | PA14 | Sincronización horizontal |
| VSYNC | PA15 | Sincronización vertical |
| SD | PA18 | Control de apagado de la pantalla |
| CM | PA19 | Selección entre los modos Normal Color y Reduced Color |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | Datos de píxel (rojo R0-R7) |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | Datos de píxel (verde G0-G7) |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | Datos de píxel (azul B0-B7) |

</div>

##### 5.5.1.5. Interfaz de pantalla JDI {#5415-jdi-display-interface}

La serie SF32LB58x admite interfaces JDI paralela y serie para conectar un panel LCD. Las señales pueden multiplexarse con LCDC1 (PA) o LCDC2 (PB); se recomienda utilizar LCDC2 (PB).

<div align="center"><em>Tabla 5.5-5: Conexiones de señales JDI paralelas</em></div>

<div align="center" markdown>

| Señal JDI | I/O (LCDC1) | I/O (LCDC2) | Descripción |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | Reloj de desplazamiento del controlador vertical |
| JDI_VST | PA22 | PB19 | Señal de inicio del controlador vertical |
| JDI_XRST | PA25 | PB16 | Reinicio de los controladores horizontal y vertical |
| JDI_HCK | PA43 | PB05 | Reloj de desplazamiento del controlador horizontal |
| JDI_HST | PA44 | PB10 | Señal de inicio del controlador horizontal |
| JDI_ENB | PA45 | PB12 | Habilitación de escritura de la memoria de píxeles |
| JDI_R1 | PA46 | PB09 | Datos de imagen rojos (píxeles impares) |
| JDI_R2 | PA47 | PB06 | Datos de imagen rojos (píxeles pares) |
| JDI_G1 | PA48 | PB08 | Datos de imagen verdes (píxeles impares) |
| JDI_G2 | PA50 | PB04 | Datos de imagen verdes (píxeles pares) |
| JDI_B1 | PA65 | PB02 | Datos de imagen azules (píxeles impares) |
| JDI_B2 | PA67 | PB03 | Datos de imagen azules (píxeles pares) |
| JDI_XFRP | PBR1 | PBR1 | Señal de excitación del cristal líquido (píxel «encendido») |
| JDI_VCOM/FRP | PBR2 | PBR2 | Señal de excitación del electrodo común / señal de excitación del cristal líquido (píxel «apagado») |

</div>

<div align="center"><em>Tabla 5.5-6: Conexiones de señales JDI serie</em></div>

<div align="center" markdown>

| Señal JDI | I/O (LCDC1) | I/O (LCDC2) | Descripción |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | Señal de selección del chip |
| JDI_SCLK | PA84 | PB02 | Reloj serie |
| JDI_SO | PA86 | PB06 | Salida de datos serie |
| JDI_DISP | PA90 | PB04 | Señal de encendido/apagado de la pantalla |
| JDI_EXTCOMIN | PA91 | PB05 | Entrada de inversión de polaridad COM |

</div>

#### 5.5.2. Táctil y retroiluminación {#542-touch-and-backlight}

La serie SF32LB58x admite una interfaz I2C para el controlador táctil, una entrada de interrupción para indicar el estado táctil y una señal PWM para controlar la habilitación y el brillo del controlador de retroiluminación.

<div align="center"><em>Tabla 5.5-7: Conexiones táctiles y de retroiluminación</em></div>

<div align="center" markdown>

| Señal táctil/retroiluminación | I/O | Descripción |
|:---|:---|:---|
| Interrupción | PA69 | Interrupción del estado táctil (puede despertar el sistema) |
| I2C1_SCL | PA17 | Reloj I2C del panel táctil |
| I2C1_SDA | PA16 | Datos I2C del panel táctil |
| BL_PWM | PB44 | Señal PWM de control de la retroiluminación |
| Reinicio | PA15 | Señal de reinicio del panel táctil |
| Habilitación de alimentación | PA12 | Señal para habilitar la alimentación del panel táctil |

</div>

#### 5.5.3. Audio {#543-audio}

La serie SF32LB58x ofrece varias interfaces de audio con las siguientes características:

1. La serie SF32LB58x ofrece tres interfaces I2S. I2S1 admite solo entrada, mientras que I2S2 e I2S3 admiten entrada y salida. Las tres funcionan únicamente en modo maestro; no se admite el modo esclavo.
2. Se recomienda I2S1 para conectar un micrófono I2S.
3. Se recomienda I2S2 para conectar un DAC de audio.
4. Se recomienda I2S3 para conectar un códec de audio.
5. Dispone de dos interfaces de entrada PDM para micrófonos digitales. Cada interfaz PDM admite hasta dos micrófonos digitales; no equipare el número de interfaces PDM con el de micrófonos.
6. Admite dos entradas de micrófono analógico; cada una requiere un condensador en serie de al menos 2,2 µF para bloquear la componente continua. La alimentación de los micrófonos analógicos procede de MIC_BIAS del SF32LB58x.
7. Admite un amplificador de potencia de audio analógico externo. Las pistas P/N de cada canal DAC deben enrutarse como un par diferencial, con un apantallamiento adecuado conectado a masa, y la capacitancia parásita debe mantenerse por debajo de 10 pF. La fuente da límites contradictorios para la longitud de las pistas; consulte la nota siguiente.
8. Admite la conexión de auriculares analógicos estéreo.

!!! note "Discrepancia en la longitud de las pistas DAC de la fuente"
    La nota de aplicación de hardware de SiFli especifica dos límites distintos para la longitud de las pistas DAC: el resumen de audio indica `<2 cm`, mientras que la sección detallada de diseño de PCB para DAC indica `<2 mm`. La fuente no explica la diferencia. Confirme con SiFli qué límite se aplica antes de finalizar la PCB; no dé por hecho que un valor sustituye al otro.

![Figura 5.5-1: Circuito de entrada de audio analógico diferencial](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-1: Circuito de entrada de audio analógico diferencial</em></div>

![Figura 5.5-2: Circuito de entrada de audio analógico no balanceado](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-2: Circuito de entrada de audio analógico no balanceado</em></div>

![Figura 5.5-3: Circuito de salida de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-3: Circuito de salida de audio analógico</em></div>

![Figura 5.5-4: Circuito de micrófono analógico](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-4: Circuito de micrófono analógico</em></div>

![Figura 5.5-5: Circuito para auriculares estéreo](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-5: Circuito para auriculares estéreo</em></div>

![Figura 5.5-6: Circuito del amplificador de potencia de audio analógico](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-6: Circuito del amplificador de potencia de audio analógico</em></div>

![Figura 5.5-7: Circuito del amplificador de potencia de audio I2S](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-7: Circuito del amplificador de potencia de audio I2S</em></div>

<div align="center"><em>Tabla 5.5-8: Conexiones de señales de audio</em></div>

<div align="center" markdown>

| Señal de audio | I/O | Descripción |
|:---|:---|:---|
| I2S1_LRCK | PA14 | Reloj de trama I2S1 |
| I2S1_SDI | PA18 | Entrada de datos I2S1 |
| I2S1_BCK | PA23 | Reloj de bits I2S1 |
| I2S2_LRCK | PA84 | Reloj de trama I2S2 |
| I2S2_SDI | PA86 | Entrada de datos I2S2 |
| I2S2_SDO | PA82 | Salida de datos I2S2 |
| I2S2_BCK | PA91 | Reloj de bits I2S2 |
| I2S3_LRCK | PB31 | Reloj de trama I2S3 |
| I2S3_SDI | PB27 | Entrada de datos I2S3 |
| I2S3_SDO | PB24 | Salida de datos I2S3 |
| I2S3_BCK | PB30 | Reloj de bits I2S3 |
| I2S3_MCLK | PB34 | Reloj maestro I2S3 |
| PDM1_CLK | PA23 | Reloj PDM1 |
| PDM1_DATA | PA18 | Datos PDM1 |
| PDM2_CLK | PA25 | Reloj PDM2 |
| PDM2_DATA | PA22 | Datos PDM2 |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | Entrada analógica 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | Entrada analógica 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | Salida analógica 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | Salida analógica 2P/2N |

</div>

!!! note "Nota sobre la multiplexación de pines"
    I2S1_SDI comparte PA18 con PDM1_DATA, e I2S1_BCK comparte PA23 con PDM1_CLK. I2S1_LRCK utiliza PA14 y PDM2_DATA, PA22. Antes de finalizar el diseño del esquema, confirme en la configuración del software qué funciones de audio se habilitarán.

La entrada de micrófono analógico del SF32LB58x admite los modos no balanceado y diferencial; en ambos casos se conecta en serie un condensador de 2,2 µF. AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N se conectan al lado del SF32LB58x. En la salida analógica, AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N son salidas del SF32LB58x que pueden alimentar la entrada de un amplificador de auriculares estéreo o de un amplificador de audio analógico externo. Tanto el amplificador de audio analógico como el amplificador de audio I2S se configuran mediante I2C3.

#### 5.5.4. Botones {#544-buttons}

##### 5.5.4.1. Botón de encendido y reinicio por pulsación prolongada {#5441-power-and-long-press-reset-button}

Para la serie SF32LB58x se recomienda utilizar PB54 como señal de la tecla de encendido. Un solo botón permite encender o apagar el dispositivo con una pulsación breve y reiniciarlo con una pulsación prolongada. La señal es activa en nivel alto; mantener el botón pulsado durante más de 10 segundos provoca el reinicio automático del chip.

![Figura 5.5-8: Circuito del botón de encendido y reinicio](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-8: Circuito del botón de encendido y reinicio</em></div>

##### 5.5.4.2. Botón de función o codificador rotatorio {#5442-function-button-or-rotary-encoder}

La serie SF32LB58x admite entradas para un botón de función y para las señales de un codificador rotatorio; ambas deben llevarse a nivel alto mediante pull-up. También admite un sensor de seguimiento óptico, para el que se recomienda la interfaz I2C4.

![Figura 5.5-9: Circuito del botón de función y el codificador rotatorio](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-9: Circuito del botón de función y el codificador rotatorio</em></div>

<div align="center"><em>Tabla 5.5-9: Señales del sensor de seguimiento óptico</em></div>

<div align="center" markdown>

| Señal I2C | I/O | Descripción |
|:---|:---|:---|
| INT | PA58 | Entrada de interrupción del sensor de seguimiento óptico |
| SDA | PA59 | Datos I2C del sensor de seguimiento óptico |
| SCL | PA60 | Reloj I2C del sensor de seguimiento óptico |

</div>

#### 5.5.5. Motor de vibración {#545-vibration-motor}

La serie SF32LB58x ofrece varias salidas PWM que pueden accionar un motor de vibración.

!!! important
    Si el software habilita la macro de escalado de frecuencia de HCPU `#define BSP_PM_FREQ_SCALING 1`, el reloj de HCPU baja al entrar en el hilo inactivo, y la frecuencia PWM de los pines PA correspondientes cambia en consecuencia. Por ello, se recomienda sacar la señal PWM por un pin PB.

![Figura 5.5-10: Circuito del motor de vibración](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.5-10: Circuito del motor de vibración</em></div>

### 5.6. Almacenamiento y conectividad {#55-storage-and-connectivity}

#### 5.6.1. Configuración de arranque {#551-boot-configuration}
La serie SF32LB58x dispone de un pin `Mode` para configurar el modo de arranque.

<div align="center"><em>Tabla 5.6-1: Configuración del pin Mode</em></div>

<div align="center" markdown>

| Nivel de `Mode` | Descripción |
|:---|:---|
| Alto | Tras encender, entra en el modo de descarga |
| Bajo | Tras encender, salta al área de la aplicación de usuario |

</div>

!!! note "Notas"
    1. El pin `Mode` pertenece al mismo dominio de tensión que VDDIOA.
    2. Mantenga estable el nivel de `Mode` conectándolo a la alimentación o a GND mediante una resistencia de 10 kΩ; no debe quedar flotante ni cambiar de nivel.
    3. En las placas de producción debe reservarse un punto de prueba para `Mode`, destinado a la descarga de firmware y a la calibración del cristal. No hace falta un puente.
    4. En las placas de prueba se recomienda reservar un puente para `Mode`, de modo que la placa pueda arrancar en modo de descarga si se bloquea el firmware.

#### 5.6.2. Almacenamiento {#552-storage}

La serie SF32LB58x admite las interfaces MPI3 o MPI4 para memorias NOR Flash y SPI NAND externas, y SD1 para memorias SD NAND y eMMC externas.

##### 5.6.2.1. Interfaz QSPI NAND Flash {#5521-qspi-nand-flash-interface}

La placa de referencia EVB del SF32LB58x utiliza MPI4 de forma predeterminada para conectar una memoria SPI NAND Flash externa.

![Figura 5.6-1: Circuito de referencia para SPI NAND Flash](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-1: Circuito de referencia para SPI NAND Flash</em></div>

<div align="center"><em>Tabla 5.6-2: Conexiones de señales MPI4</em></div>

<div align="center" markdown>

| Señal Flash | Señal de E/S (MPI4) | Descripción |
|:---|:---|:---|
| CS# | PA10 | Selección del chip, activa en nivel bajo |
| SO | PA04 | Entrada de datos (entrada/salida de datos 1) |
| WP# | PA01 | Salida de protección contra escritura (entrada/salida de datos 2) |
| SI | PA05 | Salida de datos (entrada/salida de datos 0) |
| SCLK | PA09 | Salida de reloj serie |
| Hold# | PA06 | Salida de datos (entrada/salida de datos 3) |

</div>

!!! note "Notas"
    1. Si en la línea de producción se debe programar el firmware en la memoria Flash externa, el software de la herramienta de descarga debe poner en nivel alto PA43, el pin de control de alimentación de la Flash, para activarla.
    2. Conecte Hold# de la memoria SPI NAND Flash a su alimentación mediante una resistencia pull-up de 10 kΩ.

##### 5.6.2.2. Interfaz SDIO para eMMC y microSD {#5522-sdio-emmc-micro-sd-interface}

La serie SF32LB58x admite dos interfaces SDIO. En la EVB, SD1 se conecta de forma predeterminada a eMMC o SD NAND, y SD2 a una tarjeta SD o a un chip Wi-Fi.

SD1 utiliza 12 GPIO (PA00-PA11) alimentadas desde el dominio VDDIOA2 y admite 1,8 V o 3,3 V, según el nivel de interfaz del periférico. Se recomienda usar 1,8 V con SPI NAND Flash y eMMC. Los chips SD NAND Flash solo admiten una interfaz de 3,3 V; en ese caso, VDDIOA2 debe ajustarse a 3,3 V.

![Figura 5.6-2: Circuito de referencia para eMMC](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-2: Circuito de referencia para eMMC</em></div>

![Figura 5.6-3: Circuito de referencia para SD NAND](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-3: Circuito de referencia para SD NAND</em></div>

![Figura 5.6-4: Circuito de referencia para tarjeta SD](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-4: Circuito de referencia para tarjeta SD</em></div>

<div align="center"><em>Tabla 5.6-3: Conexiones de señales SD1</em></div>

<div align="center" markdown>

| Señal SD1 | Señal de E/S | Descripción |
|:---|:---|:---|
| SD1_D7 | PA00 | Dato 7 |
| SD1_D2 | PA01 | Dato 6 |
| SD1_D5 | PA03 | Dato 5 |
| SD1_D1 | PA04 | Dato 1 |
| SD1_D0 | PA05 | Dato 0 |
| SD1_D3 | PA06 | Dato 3 |
| SD1_D4 | PA07 | Dato 4 |
| SD1_D6 | PA08 | Dato 6 |
| SD1_CLK | PA09 | Señal de reloj |
| SD1_CMD | PA10 | Señal de comando |

</div>

!!! note "Verificación de las etiquetas SD1"
    La fuente indica que SD1 utiliza 12 GPIO (PA00–PA11), pero su tabla de señales solo incluye 10 señales (SD1_D[7:0], CLK y CMD). Además, la tabla describe tanto SD1_D2 como SD1_D6 como «Data 6». La fuente no especifica las dos GPIO omitidas ni aclara la etiqueta duplicada. Antes de cerrar el esquema, verifique la asignación completa de pines SD1 en la hoja de datos del chip.

<div align="center"><em>Tabla 5.6-4: Conexiones de señales SD2</em></div>

<div align="center" markdown>

| Señal SD2 | Señal de E/S | Descripción |
|:---|:---|:---|
| SD2_CMD | PA70 | Señal de comando |
| SD2_D1 | PA75 | Dato 1 |
| SD2_D0 | PA76 | Dato 0 |
| SD2_CLK | PA77 | Señal de reloj |
| SD2_D2 | PA79 | Dato 2 |
| SD2_D3 | PA81 | Dato 3 |

</div>

#### 5.6.3. USB {#553-usb}

La interfaz USB de la serie SF32LB58x admite USB 2.0 HS en modo anfitrión y dispositivo. Proporcione protección TVS desde USB DP y DM a tierra; la capacitancia de unión del TVS debe ser inferior a 5 pF. Enrute las pistas DP/DM de la PCB como un par diferencial con una impedancia de 90 Ω.

![Figura 5.6-5: Circuito de la interfaz USB](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.6-5: Circuito de la interfaz USB</em></div>

### 5.7. Fabricación {#56-manufacturing}

#### 5.7.1. Interfaz de depuración y descarga {#561-debug-and-download-interface}
La serie SF32LB58x admite la interfaz de depuración SWD estándar de Arm®, que permite conectar herramientas EDA y depurar paso a paso. Al conectar una sonda SEGGER® J-Link®, configure su alimentación para que sea externa y proceda de la propia placa SF32LB58x.

![Figura 5.7-1: Circuito de la interfaz de depuración SWD](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figura 5.7-1: Circuito de la interfaz de depuración SWD</em></div>

El SF32LB58x ofrece una interfaz SWD y seis interfaces UART seleccionables para la salida de depuración.

<div align="center"><em>Tabla 5.7-1: Conexiones de los puertos de depuración</em></div>

<div align="center" markdown>

| Señal UART | I/O | Descripción |
|:---|:---|:---|
| TXD1 | PA31 | UART1 RXD, puerto de salida predeterminado de HCPU |
| RXD1 | PA32 | UART1 TXD, puerto de salida predeterminado de HCPU |
| TXD2 | PA28 | UART2 RXD |
| RXD2 | PA29 | UART2 TXD |
| TXD3 | PA21 | UART3 RXD |
| RXD3 | PA20 | UART3 TXD |
| TXD4 | PB37 | UART4 RXD, puerto de salida predeterminado de LCPU |
| RXD4 | PB36 | UART4 TXD, puerto de salida predeterminado de LCPU |
| TXD5 | PB18 | UART5 RXD |
| RXD5 | PB17 | UART5 TXD |
| TXD6 | PB14 | UART6 RXD |
| RXD6 | PB13 | UART6 TXD |
| SWCLK | PB07 | Señal de reloj de J-Link |
| SWDIO | PB11 | Señal de datos de J-Link |

</div>

!!! note "Nota"
    Las señales UARTx RXD no deben quedar flotantes; habilite una resistencia pull-up interna durante la inicialización del software.

#### 5.7.2. Programación en producción y acceso al hardware {#562-production-flashing-and-hardware-access}

Planifique el acceso para la programación, recuperación y calibración en producción antes de cerrar el diseño de la carcasa y los útiles de prueba. Como mínimo, deje accesibles la alimentación, GND, SWD, las salidas UART de depuración necesarias y los pines de arranque/configuración. Incluya también los puntos de reinicio de la placa o de control del PMIC que hagan falta para recuperar un firmware que no arranque.

#### 5.7.3. Listas de comprobación del esquema y la PCB {#563-schematic-and-pcb-drawing-checklists}

- [ ] El esquema de alimentación (alimentación directa desde el PMU integrado o combinación con SF30147C) se ajusta al presupuesto de energía del sistema.
- [ ] El pin Mode de configuración de arranque tiene una resistencia externa de 10 kΩ y un punto de prueba reservado en las placas de producción.
- [ ] Las especificaciones de los cristales de 48 MHz y 32,768 kHz cumplen las recomendaciones, y se ha retirado el cobre de GND de la segunda capa situado debajo del cristal.
- [ ] La selección de la interfaz de almacenamiento (MPI4/SD1/SD2) concuerda con la configuración de arranque y se ha verificado el pin PA43 de control de alimentación de la Flash externa.
- [ ] La interfaz de pantalla elegida (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) concuerda con la asignación de pines de LCDC1/LCDC2.
- [ ] Se han asignado los pines de depuración necesarios (SWD y hasta seis UART) y se ha habilitado el pull-up interno de UART RXD.
- [ ] Se ha verificado la multiplexación de I2S/PDM y audio analógico, y se cumple el presupuesto de las pistas diferenciales.
- [ ] USB DP y DM cuentan con protección TVS conectada a tierra, con una capacitancia de unión inferior a 5 pF.

[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
