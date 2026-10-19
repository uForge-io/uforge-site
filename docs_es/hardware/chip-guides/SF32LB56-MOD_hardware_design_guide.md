---
icon: lucide/book-check
description: "Guía de diseño de hardware del módulo MCU Bluetooth SF32LB56-MOD: alimentación, interfaces e integración en PCB."
tags:
  - Hardware
  - Módulo
hide:
    - navigation
---

# Guía de diseño de hardware de SF32LB56-MOD { #sf32lb56-mod-hardware-design-guide }

## 1. Introducción { #1-introduction }

**SF32LB56-MOD** es una familia de módulos MCU Bluetooth de bajo consumo y propósito general de SiFli, basada en la serie SF32LB56xV.

Esta guía toma como referencia la **especificación técnica DS5602-SF32LB56-MOD V0.3** y reúne la información específica del módulo necesaria para diseñar el esquemático, planificar la PCB, validar el hardware y preparar la producción. Incluye las variantes de memoria, la interfaz de 89 pines, los tres raíles de alimentación, las interfaces de pantalla, audio y almacenamiento, la ubicación de la antena, los requisitos de manipulación y la lista de comprobación del esquemático.

!!! note "Fuente y recomendaciones"
    Salvo que se indiquen expresamente como pautas de integración o recomendaciones de diseño, los valores técnicos siguientes se basan en la **especificación técnica DS5602-SF32LB56-MOD V0.3**.

## 2. Descripción del dispositivo { #2-device-overview }

### 2.1 Arquitectura { #21-architecture }

SF32LB56-MOD utiliza una plataforma MCU de doble núcleo de la serie SF32LB56xV. La HCPU procesa las aplicaciones y los gráficos; la LCPU ejecuta las tareas permanentes de bajo consumo. La HCPU es un núcleo Arm Cortex-M33 STAR-MC1 de hasta 240 MHz, y la LCPU es del mismo tipo, de hasta 96 MHz. Ambos admiten FPU y MPU.

El módulo admite Bluetooth 5.3 y ofrece aceleración de pantalla, entrada y salida de audio, interfaces de memoria externa, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC y acceso para depuración y descarga.

### 2.2 Variantes { #22-variants }

<div align="center"><em>Tabla 2.2-1: Variantes de la serie SF32LB56-MOD</em></div>

<div align="center" markdown>

| Código del módulo | Flash principal | PSRAM | Flash de respaldo | Temperatura de funcionamiento | Dimensiones |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

### 2.3 Principales características de hardware { #23-major-hardware-features }

<div align="center"><em>Tabla 2.3-1: Principales características de hardware</em></div>

<div align="center" markdown>

| Área | Capacidad |
| :--- | :--- |
| CPU | HCPU hasta 240 MHz y LCPU hasta 96 MHz; ambos son Arm Cortex-M33 STAR-MC1 |
| Conectividad inalámbrica | Bluetooth 5.3 de modo dual con BLE Audio |
| Gráficos | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Audio | DAC de 24 bits, ADC Sigma-Delta de 24 bits, 2 interfaces PDM (PDM1/PDM2), cada una para 2 micrófonos mediante los canales izquierdo y derecho (hasta 4 en total), y 1 I2S |
| IA/DSP | Acelerador matricial de hasta 1,92 GOPS, FFT, FIR y CORDIC |
| Almacenamiento | Opciones de Flash/PSRAM del módulo, MPI3 y compatibilidad con SD/SDIO/eMMC |
| Seguridad | AES, HASH, CRC, TRNG, Secure Boot, eFuse de 1024 bits y PSA Certified Level 1 |
| Antena | Antena integrada en la PCB o antena externa mediante un conector compatible con IPEX |

</div>

### 2.4 Aplicaciones habituales { #24-typical-applications }

Entre las aplicaciones habituales se incluyen relojes inteligentes de gama alta, pulseras inteligentes, equipos médicos vestibles, equipos de actividad física, paneles de control para bicicletas eléctricas, llaves de automóvil, mandos a distancia vestibles para vehículos, electrodomésticos inteligentes, cerraduras inteligentes, dispositivos HMI gráficos, concentradores de sensores industriales, terminales de supervisión industrial, concentradores de sensores de bajo consumo y dispositivos Bluetooth Mesh.

## 3. Resumen de diseño { #3-design-at-a-glance }

### 3.1 Resumen de ingeniería { #31-one-page-engineering-summary }

<div align="center"><em>Tabla 3.1-1: Resumen de ingeniería</em></div>

<div align="center" markdown>

| Tema | Pauta de diseño |
| :--- | :--- |
| Raíles de alimentación | Suministre VDD_3V3, VDD_1V8 y VDDIO. Los tres raíles deben encenderse simultáneamente. |
| Desacoplamiento local | Coloque condensadores de 4,7 µF cerca de los pines del módulo para VDD_3V3, VDD_1V8 y VDDIO. |
| Nivel de E/S | VDDIO admite 1,7–3,6 V, pero PA00–PA11 están fijados a 3,3 V. Compruebe todos los periféricos conectados. |
| Depuración/descarga | UART4_TXD/UART4_RXD son los pines UART predeterminados para la salida de consola, la descarga y la depuración; SWDIO/SWCLK permiten la descarga SWD. |
| Modo de arranque | BOOT_MODE en alto selecciona el modo de descarga; en bajo, el modo de usuario. |
| Conflicto con la Flash interna | PA06–PA11 están conectados por defecto a la Flash interna del módulo y no están disponibles externamente. |
| Conflicto SDIO/MPI3 | SDIO y MPI3 comparten recursos de E/S y no pueden utilizarse simultáneamente. |
| Fuentes de activación | PA50, PA51, PB32 y PB35 pueden recibir interrupciones mientras la MCU está en suspensión. |
| PWRKEY | PB32 admite un reinicio al mantener el nivel alto durante 10 s y requiere una resistencia pulldown de 10 kΩ. |
| Antena | Mantenga el área de la antena PCB libre de cobre, pistas, componentes y metal. Si la antena no sobresale del borde de la placa, deje una separación mínima de 15 mm. |
| Fabricación | MSL 3; utilícelo dentro de las 168 horas posteriores a la apertura a 25 ± 5 °C / 60 % HR u hornéelo antes de reutilizarlo. |

</div>

### 3.2 Componentes externos recomendados { #32-recommended-external-components }

<div align="center"><em>Tabla 3.2-1: Componentes externos recomendados</em></div>

<div align="center" markdown>

| Circuito | Componente | Ubicación / notas |
| :--- | :--- | :--- |
| VDD_3V3 | Condensador de 4,7 µF | Colóquelo cerca del pin de alimentación del módulo. |
| VDD_1V8 | Condensador de 4,7 µF | Colóquelo cerca del pin de alimentación del módulo. |
| VDDIO | Condensador de 4,7 µF | Colóquelo cerca del pin de alimentación del módulo. |
| PB32/PWRKEY | Pulldown de 10 kΩ | Necesario para el reinicio por pulsación larga con nivel alto. |
| Señales RGB de LCD | Resistencias en serie de 33–100 Ω | Insértelas en serie en las líneas de señal RGB. |
| UART de depuración PA16/PA17 | Resistencias en serie de 100 Ω | Necesarias en la interfaz UART multiplexada de descarga y depuración del programa. |
| Panel táctil / conectores de usuario | Protección ESD | Reserve dispositivos ESD para las interfaces expuestas, como TP. |

</div>

### 3.3 Árbol de alimentación { #33-power-tree }

VDD_3V3 alimenta PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF y VDDIOA2 de la MCU, además de la Flash interna del módulo. SiFli recomienda utilizar un LDO para este raíl. VDD_1V8 alimenta la memoria incluida en el mismo encapsulado que la MCU. VDDIO alimenta los puertos de E/S VDDIOA/VDDIOB de la MCU.

!!! info "Figura 3.3-1: Diagrama de alimentación de SF32LB56-MOD"
    Consulte la figura 7-1 de DS5602 V0.3.

### 3.4 Diagrama de bloques del sistema { #34-system-block-diagram }

El diagrama de bloques del módulo muestra la MCU SF32LB56xV, los recursos de memoria, la ruta RF, las opciones de antena, las entradas de alimentación y los grupos de interfaces externas.

!!! info "Figura 3.4-1: Diagrama funcional de bloques de SF32LB56-MOD"
    Consulte la figura 2-1 de DS5602 V0.3.

## 4. Flujo de diseño de hardware { #4-hardware-design-flow }

### 4.1 Secuencia de diseño { #41-design-sequence }

1. Seleccione la variante de memoria según el tamaño del firmware, los recursos gráficos, las necesidades de almacenamiento externo y el coste objetivo.
2. Elija la variante con antena integrada en la PCB o con antena externa antes de cerrar el diseño mecánico.
3. Defina la arquitectura de alimentación para VDD_3V3, VDD_1V8 y VDDIO, y confirme que los tres raíles se encienden simultáneamente.
4. Asigne los pines de pantalla, almacenamiento, USB, audio, sensores, activación, depuración y pruebas de producción.
5. Resuelva los conflictos de recursos compartidos, en especial entre SDIO y MPI3, y los pines PA06–PA11 utilizados por la Flash interna.
6. Añada desacoplamiento, protección ESD, el pulldown de PWRKEY y las resistencias en serie para la LCD y el UART de depuración.
7. Coloque el módulo respetando la separación de antena y el área de exclusión requeridas.
8. Antes de la liberación, revise el esquemático y la PCB con la lista de comprobación de la sección 7.

### 4.2 Secuencia de revisión { #42-review-sequence }

Realice las revisiones por etapas: esquemático, multiplexación de pines, encendido, RF/antena, diseño de la PCB, puesta en marcha de la primera unidad, validación RF, evaluación ambiental y de fiabilidad, y pruebas de producción.

### 4.3 Hitos { #43-milestones }

<div align="center"><em>Tabla 4.3-1: Hitos recomendados de hardware</em></div>

<div align="center" markdown>

| Hito | Evidencias requeridas |
| :--- | :--- |
| Cierre del esquemático | Variante seleccionada, conflictos de pines resueltos, raíles de alimentación verificados y lista de comprobación completada. |
| Cierre del diseño | Área de exclusión de antena comprobada, desacoplamiento de alimentación colocado e interfaces de alta velocidad revisadas. |
| Puesta en marcha EVT | Superadas las pruebas iniciales de raíles, modo de arranque, UART/SWD, Flash, pantalla, USB, audio y RF. |
| DVT | Validados el alcance RF, la corriente, el comportamiento térmico, la suspensión/reactivación, la estrategia ESD y el efecto de la carcasa. |
| Liberación de producción | Completados la grabación, los pads de prueba, las reglas de inspección, la manipulación MSL/reflujo y los registros de revisión. |

</div>

## 5. Diseño del esquemático { #5-schematic-design }

### 5.1 Sistema de alimentación { #51-power-system }

#### 5.1.1 Alimentación { #511-power-supply }

<div align="center"><em>Tabla 5.1-1: Raíles de alimentación</em></div>

<div align="center" markdown>

| Raíl | Rango de funcionamiento recomendado | Función |
| :--- | :--- | :--- |
| VDD_3V3 | 2,97–3,6 V | PVDD de la MCU, dominios analógicos de 3,3 V, dominio analógico RF, VDDIOA2 y Flash interna. |
| VDD_1V8 | 1,7–1,95 V | Alimentación de la memoria incluida en el mismo encapsulado que la MCU. |
| VDDIO | 1,7–3,6 V | Alimentación de E/S VDDIOA/VDDIOB de la MCU. |

</div>

VDD_3V3, VDD_1V8 y VDDIO deben encenderse simultáneamente. Coloque un condensador de 4,7 µF cerca de cada pin de alimentación del módulo. Aunque VDDIO funciona entre 1,7 V y 3,6 V, la hoja de datos especifica por separado que PA00–PA11 están fijados a 3,3 V y no siguen a VDDIO.

#### 5.1.2 Modos de funcionamiento { #512-operating-modes }

BOOT_MODE selecciona el comportamiento de arranque: nivel alto para el modo de descarga y nivel bajo para el modo de usuario. Mantenga definido el estado de la señal BOOT_MODE durante el reinicio y la grabación de producción. PB32/PWRKEY admite el reinicio al mantener el nivel alto durante 10 s y requiere una resistencia pulldown de 10 kΩ.

### 5.2 Reloj y RF { #52-timing-and-rf }

#### 5.2.1 Reloj { #521-clock }

La plataforma del módulo utiliza un oscilador de cristal de 48 MHz y admite osciladores RC de bajo consumo de 1 MHz/48 MHz, un oscilador RC de consumo ultrabajo de 10 kHz y un oscilador de cristal opcional de 32,768 kHz. Mantenga el diseño y la conexión a tierra de las señales de reloj de acuerdo con el diseño de referencia del módulo y evite procesos ultrasónicos que puedan someter el cristal interno a esfuerzos mecánicos.

#### 5.2.2 RF { #522-rf }

<div align="center"><em>Tabla 5.2-1: Resumen de características RF de Bluetooth</em></div>

<div align="center" markdown>

| Parámetro | Valor |
| :--- | :--- |
| Rango de frecuencias Bluetooth | 2402–2480 MHz |
| Potencia máxima de transmisión BLE | 19 dBm |
| Rango de control de potencia RF BLE | -20 a 19 dBm |
| Sensibilidad BLE 1 Mbps | -100 dBm con dirty off, -99,3 dBm con dirty on |
| Sensibilidad BLE 2 Mbps | -97 dBm con dirty off, -96,5 dBm con dirty on |
| Potencia máxima de transmisión BR | 19 dBm |
| Potencia máxima de transmisión EDR | 13 dBm |
| Sensibilidad BR | -96,3 dBm con dirty off, -94 dBm con dirty on |
| Sensibilidad EDR2 | -95,5 dBm con dirty off, -95 dBm con dirty on |
| Sensibilidad EDR3 | -88,5 dBm con dirty off, -87 dBm con dirty on |

</div>

El módulo admite una antena integrada en la PCB o una antena externa mediante un conector compatible con IPEX. Valide el alcance de comunicación y el rendimiento RF con la carcasa final, no solo en un banco de pruebas abierto.

### 5.3 Interfaces de usuario { #53-user-interfaces }

#### 5.3.1 Pantalla { #531-display }

El controlador LCD admite los modos SPI serie DBI, Dual-SPI, Quad-SPI, paralelo 8080, DPI/RGB y JDI. La figura de asignación recomendada de la hoja de datos relaciona con los pines del módulo las señales LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper y los grupos de pines de tipo Raspberry Pi.

Añada resistencias en serie de 33–100 Ω en las líneas RGB de la LCD. Mantenga cortas y uniformes las pistas RGB, de la pantalla SPI y del panel táctil, y reserve protección ESD para las interfaces expuestas del panel táctil y los conectores.

!!! info "Figura 5.3-1: Asignación recomendada de pines para la placa de desarrollo"
    Consulte la figura 7-6 de DS5602 V0.3.

#### 5.3.2 Audio { #532-audio }

El módulo ofrece salidas DAC de audio analógico, MIC_BIAS, MIC_ADC_IN, I2S y pines compatibles con PDM. El DAC de audio es una ruta de salida de 24 bits compatible con frecuencias de muestreo de 8 kHz a 48 kHz, con una SNR y un rango dinámico de 109 dB. El ADC de audio es una ruta de entrada Sigma-Delta de 24 bits compatible con frecuencias de muestreo de 8 kHz a 48 kHz, con una SNR y un rango dinámico de 99 dB.

Aleje las pistas de audio analógico de los nodos de conmutación ruidosos, los relojes LCD y las estructuras de alimentación de la antena. Coloque los filtros de MIC_BIAS y MIC_ADC_IN cerca del circuito del micrófono conectado.

#### 5.3.3 Botones { #533-buttons }

PB32 es la entrada PWRKEY y admite el reinicio al mantener el nivel alto durante 10 s. Añada la resistencia pulldown de 10 kΩ requerida y evite que el circuito del botón quede flotante durante el transporte, la suspensión profunda o la secuencia de alimentación.

#### 5.3.4 Motores y cargas PWM { #534-motor-and-pwm-loads }

Los pines identificados como GPTIM en la figura de asignación recomendada de la hoja de datos admiten salida PWM. Utilice controladores externos para motores, retroiluminación, zumbadores u otras cargas; no conecte cargas inductivas o de corriente elevada directamente a las GPIO del módulo.

### 5.4 Almacenamiento y conectividad { #54-storage-and-connectivity }

#### 5.4.1 Almacenamiento { #541-storage }

La familia de módulos ofrece Flash principal según el SKU, 4+8 MB de OPI-PSRAM y 1 MB de Flash QSPI-NOR de respaldo. MPI3 puede conectarse a una SPI NOR o SPI NAND externa, pero PA06–PA11 están conectados por defecto a la Flash interna del módulo y no están disponibles externamente. SDIO y MPI3 comparten recursos de E/S, por lo que no pueden utilizarse simultáneamente.

#### 5.4.2 Sensores { #542-sensors }

GPADC admite conversiones de 12 bits, una frecuencia de muestreo de hasta 4 MS/s, un rango de entrada asimétrico (single-ended) de 0–3,3 V y un rango diferencial de -2,1 V a +2,1 V; también admite disparo por software o hardware y DMA. Los pines marcados GPADC_CHx admiten entrada analógica. Mantenga cortas las pistas, filtre las señales y aléjelas del ruido de conmutación de la LCD y de RF.

#### 5.4.3 UART/I2C { #543-uarti2c }

UART admite funcionamiento full-duplex hasta 6 Mbps. I2C admite los modos estándar (100 kbps), rápido (400 kbps), rápido plus (1 Mbps) y alta velocidad (3,4 Mbps). Muchas GPIO están multiplexados como `PAxx_I2C_UART` o `PBxx_I2C_UART`; confirme el plan de multiplexación definitivo antes de cerrar el esquemático.

UART4_TXD en el pin 6 y UART4_RXD en el pin 7 forman el puerto serie predeterminado para la salida de consola, la descarga y la depuración del programa. PA16 y PA17 pueden multiplexarse como DBG_UART; si se utilizan para descargar o depurar el programa, requieren resistencias en serie de 100 Ω.

#### 5.4.4 USB, SPI, SDIO e I2S { #544-usb-spi-sdio-and-i2s }

USB 2.0 FS admite los modos host y dispositivo mediante un PHY integrado. SPI admite los formatos SSP/SPI y Microwire; la SPI de HPSYS alcanza 48 MHz y la de LPSYS, 24 MHz. SDMMC1 admite SD 3.0, SDIO 3.0 y eMMC 4.5.1 en modos SDR y DDR; SDMMC2 admite las funciones SD/SDIO/eMMC en modo SDR hasta 48 MHz. I2S admite los modos maestro y esclavo, funcionamiento full-duplex, los formatos left/right/standard y un ancho PCM de hasta 24 bits.

### 5.5 Fabricación { #55-manufacturing }

#### 5.5.1 Depuración { #551-debug }

SWDIO en el pin 79 y SWCLK en el pin 80 son pines SWD de depuración y descarga. Mantenga accesible SWD en los primeros prototipos y en los útiles de producción. Exponga también la ruta UART4 predeterminada para descarga y depuración, salvo que el producto disponga de otro método de grabación aprobado.

#### 5.5.2 Producción { #552-production }

Reserve puntos de acceso de producción para alimentación, masa, modo de arranque, reinicio/PWRKEY, SWD, descarga UART y las interfaces de calibración o prueba RF de la placa. Se recomienda que el software de prueba final cubra el arranque, la Flash, la pantalla, el panel táctil, el audio, USB, los sensores, la comunicación RF, la suspensión/reactivación y el consumo de corriente.

## 6. Diseño de la PCB { #6-pcb-layout }

### 6.1 Mecánica y huella { #61-mechanical-and-footprint }

El módulo mide 18,0 × 32,9 × 3,1 mm. Utilice la huella de PCB recomendada en la hoja de datos y confirme con el ensamblador de la PCB el patrón de pads, la expansión de la máscara de soldadura, las aperturas de pasta, las zonas de exclusión y la zona de ocupación del componente (courtyard).

!!! info "Figura 6.1-1: Dimensiones del módulo SF32LB56-MOD"
    Consulte la figura 8-1 de DS5602 V0.3.

!!! info "Figura 6.1-2: Huella de PCB recomendada"
    Consulte la figura 8-2 de DS5602 V0.3. Las dimensiones están en milímetros.

### 6.2 Ubicación de la antena { #62-antenna-placement }

Si el producto utiliza la antena integrada en la PCB, mantenga el área de la antena libre de componentes y metal. Siempre que sea posible, coloque el módulo de modo que dicha área sobresalga del borde de la placa portadora y que el punto de alimentación quede cerca del borde.

Si la antena no puede sobresalir del borde de la placa, deje una separación mínima de 15 mm. No coloque cobre, pistas ni componentes en esta zona y, en la medida de lo posible, recorte el material de la placa portadora situado bajo la antena PCB.

!!! info "Figura 6.2-1: Ubicación recomendada del módulo"
    Consulte la figura 8-4 de DS5602 V0.3.

!!! info "Figura 6.2-2: Zona de separación de la antena PCB"
    Consulte la figura 8-5 de DS5602 V0.3.

### 6.3 Conector de antena externa { #63-external-antenna-connector }

Para diseños con antena externa, la hoja de datos describe un conector de primera generación compatible con la serie Hirose U.FL, I-PEX MHF I y Amphenol AMC.

!!! info "Figura 6.3-1: Dimensiones del conector de antena externa"
    Consulte la figura 8-3 de DS5602 V0.3.

### 6.4 Lista de comprobación del diseño { #64-layout-checklist }

<div align="center"><em>Tabla 6.4-1: Lista de comprobación del diseño de la PCB</em></div>

<div align="center" markdown>

| Área | Comprobación |
| :--- | :--- |
| Alimentación | Los condensadores de 4,7 µF están cerca de los pines VDD_3V3, VDD_1V8 y VDDIO. |
| Masa | Los pines de masa del módulo están conectados a un sistema de masa de baja impedancia, con vías de unión cerca de las rutas de alta velocidad y RF. |
| Antena | La zona de exclusión de la antena no está invadida por cobre, pistas, componentes, tornillos, blindajes, metal de la batería ni de la carcasa. |
| Pantalla | Las líneas RGB/SPI de la LCD son cortas, tienen en cuenta la impedancia e incluyen las resistencias en serie requeridas. |
| USB | USB DP/DM está enrutado como par diferencial adaptado y cuenta con protección ESD cerca del conector. |
| Audio analógico | MIC_BIAS, MIC_ADC_IN y las salidas DAC quedan alejados de los reguladores conmutados, los relojes LCD y las zonas de alimentación de RF. |
| Depuración | El acceso SWD y UART de descarga/depuración está disponible en prototipos y útiles de producción. |

</div>

## 7. Validación de hardware { #7-hardware-validation }

### 7.1 Características eléctricas { #71-electrical-characteristics }

<div align="center"><em>Tabla 7.1-1: Valores máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Descripción | Mín. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentación de 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentación de 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrada de alimentación de E/S | -0,3 | 3,6 | V |
| Tstore | Temperatura de almacenamiento | -40 | 125 | °C |

</div>

<div align="center"><em>Tabla 7.1-2: Condiciones de funcionamiento recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Descripción | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentación de 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentación de 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrada de alimentación de E/S | 1,7 | - | 3,6 | V |
| TA | Temperatura de funcionamiento | -40 | - | 85 | °C |

</div>

<div align="center"><em>Tabla 7.1-3: Características eléctricas de CC a 3,3 V y 25 °C</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitancia del pin | 2,5 | 3 | 3,5 | pF |
| VIH | Tensión de entrada alta | 0,7×VDD | - | VDD | V |
| VIL | Tensión de entrada baja | VSS | - | 0,3×VDD | V |
| IIH | Corriente de entrada alta | - | 10 | 40 | nA |
| IIL | Corriente de entrada baja | - | 10 | 40 | nA |
| VOH | Tensión de salida alta con carga de alta impedancia | 0,8×VDD | - | VDD | V |
| VOL | Tensión de salida baja con carga de alta impedancia | VSS | - | 0,2×VDD | V |
| IOH | Corriente de excitación de salida alta | 24 | 30 | 38 | mA |
| IOL | Corriente de excitación de salida baja | 24 | 30 | 38 | mA |
| RPU | Pull-up interno | 7 | 10 | 20 | kΩ |
| RPD | Pull-down interno | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tensión de liberación del reinicio | 0,7×VDD | - | VDD | V |
| VIL_nRST | Tensión de activación del reinicio | VSS | - | 0,3×VDD | V |

</div>

VDD es la alimentación de E/S. VOH y VOL se miden con una carga de alta impedancia.

### 7.2 Consumo de corriente { #72-power-consumption }

<div align="center"><em>Tabla 7.2-1: Corriente de Bluetooth y BLE a 3,3 V y potencia TX de 0 dBm</em></div>

<div align="center" markdown>

| Modo | Condición | Corriente típica |
| :--- | :--- | :-: |
| BT Sniff | Intervalo de 50 ms | 196,0 µA |
| BT Sniff | Intervalo de 1 s | 13,8 µA |
| BLE ADV | Intervalo de 50 ms | 228,7 µA |
| BLE ADV | Intervalo de 1 s | 15,7 µA |
| Conexión BLE | Intervalo de 50 ms | 172,8 µA |
| Conexión BLE | Intervalo de 1 s | 11,5 µA |
| Scan | Inquiry Scan o Page Scan | 36,8 µA |
| Both Scan | Inquiry Scan y Page Scan | 64,0 µA |
| Standby | - | 4,6 µA |

</div>

<div align="center"><em>Tabla 7.2-2: Corriente del procesador</em></div>

<div align="center" markdown>

| Carga de trabajo | Dominio | Frecuencia | Corriente | Corriente por MHz |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9,38 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7,90 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 48 MHz | 0,92 mA | 30,92 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0,55 mA | 15,13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7,54 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6,30 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0,70 mA | 25,75 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0,44 mA | 10,63 µA/MHz |

</div>

### 7.3 Lista de comprobación del esquemático { #73-schematic-checklist }

<div align="center"><em>Tabla 7.3-1: Lista de comprobación del diseño del esquemático</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación |
| :-: | :--- |
| 1 | El rango de entrada de VDD_3V3 es 2,97–3,6 V; coloque un condensador de 4,7 µF cerca del pin del módulo. |
| 2 | El rango de entrada de VDD_1V8 es 1,7–1,95 V; coloque un condensador de 4,7 µF cerca del pin del módulo. |
| 3 | El rango de entrada de VDDIO es 1,7–3,6 V; coloque un condensador de 4,7 µF cerca del pin del módulo. |
| 4 | El nivel de la interfaz de E/S del módulo es de 3,3 V donde así se especifica; los niveles de los periféricos conectados deben ser compatibles. |
| 5 | Si el módulo incorpora Flash interna, PA06, PA07, PA08, PA09, PA10 y PA11 no pueden utilizarse externamente. |
| 6 | SDIO y MPI3 comparten recursos de E/S y no pueden utilizarse simultáneamente. |
| 7 | PA50, PA51, PB32 y PB35 pueden recibir interrupciones mientras la MCU está en suspensión. |
| 8 | PB32 admite el reinicio al mantener el nivel alto durante 10 s; añada un pulldown de 10 kΩ. |
| 9 | Los pines marcados GPADC_CHx admiten entrada analógica de 0–3,3 V. |
| 10 | Los pines marcados GPTIM admiten salida PWM. |
| 11 | Interfaces como TP requieren dispositivos de protección ESD. |
| 12 | Las señales RGB de LCD requieren resistencias en serie de 33–100 Ω. |
| 13 | PA16 y PA17 multiplexados como DBG_UART son pines de descarga/depuración del programa y requieren resistencias en serie de 100 Ω. |

</div>

### 7.4 Almacenamiento, manipulación y montaje { #74-storage-handling-and-assembly }

<div align="center"><em>Tabla 7.4-1: Requisitos de almacenamiento, manipulación y montaje</em></div>

<div align="center" markdown>

| Elemento | Requisito |
| :--- | :--- |
| Almacenamiento en MBB sellada | Ambiente sin condensación, con temperatura inferior a 40 °C y humedad relativa inferior al 90 %. |
| Sensibilidad a la humedad | MSL 3. |
| Tras abrir la bolsa de vacío | Utilícelo dentro de las 168 horas a 25 ± 5 °C / 60 % HR u hornéelo antes de reutilizarlo. |
| ESD HBM | ±2000 V. |
| ESD CDM | ±500 V. |
| Reflujo | SiFli recomienda una sola pasada de reflujo para el módulo. |
| Proceso ultrasónico | Evite la soldadura o limpieza por ultrasonidos; la vibración puede dañar o degradar los cristales internos. |

</div>

!!! info "Figura 7.4-1: Perfil de temperatura de reflujo"
    Consulte la figura 9-1 de DS5602 V0.3.

## 8. Documentos relacionados { #8-related-documents }

<div align="center"><em>Tabla 8-1: Documentos y productos relacionados</em></div>

<div align="center" markdown>

| Tipo | Elemento |
| :--- | :--- |
| Hoja de datos del módulo | [DS5602-SF32LB56-MOD 技术规格书 V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| Especificación del chip | Especificación técnica del chip SF32LB56x |
| Guía de la placa de desarrollo | Guía de usuario de SF32LB56-DevKit-LCD |
| Familia de chips | Serie SF32LB56xV |
| Módulo | SF32LB56-MOD |
| Placa de desarrollo | SF32LB56-DevKit-LCD |

</div>

## 9. Apéndices { #appendices }

### 9.1. Apéndice A. Referencia para la planificación de pines { #appendix-a-pin-planning-reference }

DS5602 V0.3 incluye la tabla completa de definición de los 89 pines y la distribución de pines vista desde arriba. La tabla siguiente destaca los pines y grupos de señales que suelen afectar al riesgo del esquemático, al acceso de arranque/depuración o a la planificación de recursos compartidos.

<div align="center"><em>Tabla 9.1-1: Pines y grupos de señales críticos</em></div>

<div align="center" markdown>

| Pin / grupo | Función / restricción |
| :--- | :--- |
| Pin 6 PB17 | UART4_TXD, TX predeterminado del UART para salida de consola, descarga y depuración. |
| Pin 7 PB16 | UART4_RXD, RX predeterminado del UART para salida de consola, descarga y depuración. |
| Pin 25 BOOT_MODE | Alto: modo de descarga; bajo: modo de usuario. |
| Pin 26 VDD_3V3 | Raíl de 3,3 V, rango de funcionamiento de 2,97–3,6 V. |
| Pin 27 VDD_1V8 | Raíl de 1,8 V, rango de funcionamiento de 1,7–1,95 V. |
| Pin 29 VDDIO | Raíl de E/S, rango de funcionamiento de 1,7–3,6 V. |
| Pines 43/44 | Salidas DAC diferenciales AU_DACP / AU_DACN. |
| Pin 46 MIC_BIAS | Salida de polarización del micrófono. |
| Pin 47 MIC_ADC_IN | Entrada ADC para micrófono analógico. |
| Pines 67–72 PA06–PA11 | Conectados por defecto a la Flash interna; no disponibles externamente. |
| Pin 79 PB13 | SWDIO para depuración/descarga. |
| Pin 80 PB15 | SWCLK para depuración/descarga. |
| PA50, PA51, PB32, PB35 | Pines de activación por interrupción durante la suspensión. |
| PA00–PA11 | Nivel de interfaz fijado a 3,3 V, independiente de VDDIO. |

</div>

## 10. Historial de revisiones { #appendix-b-revision-history }

### 10.1. Historial de revisiones de la guía { #guide-revision-history }

<div align="center"><em>Tabla 10.1-1: Historial de revisiones de la guía</em></div>

<div align="center" markdown>

| Versión | Fecha | Notas |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | Versión inicial de la guía de diseño de hardware del módulo SF32LB56-MOD, basada en DS5602-SF32LB56-MOD V0.3. |

</div>

### 10.2. Historial de revisiones de la hoja de datos fuente { #source-datasheet-revision-history }

<div align="center"><em>Tabla 10.2-1: Historial de revisiones de la hoja de datos fuente</em></div>

<div align="center" markdown>

| Fecha | Versión | Notas de versión |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | Se actualizaron las descripciones del ADC y el DAC de audio del capítulo 4. |
| 2025-02 | 0.2 | Se actualizaron los pines del módulo y la información relacionada. |
| 2025-01 | 0.1 | Versión preliminar. |

</div>
