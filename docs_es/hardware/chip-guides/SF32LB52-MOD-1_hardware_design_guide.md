---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware para el módulo MCU Bluetooth SF32LB52-MOD-1: alimentación, interfaces e integración en PCB."
tags:
    - Hardware
    - Módulo
---

# Guía de diseño de hardware del SF32LB52-MOD-1 { #sf32lb52-mod-1-hardware-design-guide }

## 1. Descripción general { #1-overview }

**SF32LB52-MOD-1** es un módulo MCU Bluetooth certificado, de uso general y bajo consumo, basado en el chip SF32LB525UC6 de SiFli (Arm Cortex-M33 STAR-MC1 de doble núcleo, hasta 240 MHz). Integra un cristal de 48 MHz, un cristal opcional de 32,768 kHz y un chip OPI-PSRAM opcional de 64 Mb integrado en el mismo encapsulado, todo en un único encapsulado de montaje superficial de 68 pines y 27,9 × 18,0 × 3,1 mm.

Esta guía cubre la integración de hardware a nivel de módulo: definición de pines, interfaces periféricas, características eléctricas, requisitos de alimentación, esquemáticos de referencia, lista de comprobación del esquemático, dimensiones mecánicas y huella de PCB, y requisitos de manipulación del producto. Se basa en la hoja de datos de SiFli **DS5203-SF32LB52-MOD-1 V0.3**.

Para conocer en más detalle la arquitectura del chip (núcleos, gráficos, subsistema de memoria y periféricos), consulte [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) y la [guía de diseño de hardware del SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Fuentes y tratamiento de las figuras"
    Los datos técnicos específicos del módulo siguen **DS5203-SF32LB52-MOD-1 V0.3**. Algunos dibujos de asignación de pines, esquemáticos y detalles mecánicos de la hoja de datos son imágenes ráster; aquí se indican como referencia en vez de redibujarlos. La numeración de figuras y tablas sigue la numeración propia de esta guía; los pies de las figuras no reproducidas indican el número correspondiente en la hoja de datos oficial.

## 2. Resumen de diseño { #2-quick-design-summary }

### 2.1 Variante del módulo { #21-module-variant }

<div align="center"><em>Tabla 2.1-1: Variante del módulo</em></div>

<div align="center" markdown>

| Referencia del módulo | Flash | PSRAM | Temperatura | Dimensiones (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40 a 85 °C | 27,9 × 18,0 × 3,1 mm |

</div>

### 2.2 Especificaciones principales { #22-key-specifications }

<div align="center"><em>Tabla 2.2-1: Especificaciones principales</em></div>

<div align="center" markdown>

| Elemento | Especificación |
| :--- | :--- |
| Núcleo de aplicación (HCPU) | Arm Cortex-M33 STAR-MC1, hasta 240 MHz, SRAM de 512 KB |
| Núcleo de bajo consumo (LCPU) | Arm Cortex-M33 STAR-MC1, hasta 24 MHz, SRAM de 64 KB |
| Conectividad inalámbrica | Bluetooth 5.3 de modo dual con BLE Audio |
| Gráficos | Motor 2D/2.5D ePicasso 2.0, hasta 512 × 512; descompresión sin pérdidas eZip 2.0 |
| Audio | 1 DAC de audio de 24 bits y 1 ADC de audio Sigma-Delta de 24 bits |
| Almacenamiento | OPI-PSRAM opcional en el encapsulado (144 MHz); 1 MPI externo (QSPI); 1 SD/SDIO/eMMC |
| Encapsulado | 68 pines, 27,9 × 18,0 × 3,1 mm |
| Alimentación | VSYS: 3,2–4,7 V (Li-ion) o 3,7–4,7 V (DCDC/LDO; se recomiendan 3,8 V) |
| Antena | Antena integrada en la PCB o externa mediante conector IPEX (según la referencia) |
| Temperatura de funcionamiento | -40 a 85 °C |

</div>

## 3. Diagrama de bloques funcional { #3-functional-block-diagram }

El módulo integra el chip SF32LB525UC6, un cristal de 48 MHz y otro opcional de 32,768 kHz. Esta SKU también incorpora en el encapsulado un chip OPI-PSRAM de 64 Mb, además de la red de adaptación RF y la línea de alimentación de la antena.

!!! info "Figura 3-1: Diagrama de bloques funcional"
    El diagrama no se reproduce en esta guía. Consulte la figura 2-1 de la hoja de datos oficial.

## 4. Definición de pines { #4-pin-definition }

### 4.1 Diagrama de asignación de pines { #41-pinout-diagram }

El módulo expone 68 pines en su perímetro. El pin 1 está marcado en la esquina próxima a la zona de antena; los pines se numeran en sentido antihorario alrededor del encapsulado.

!!! info "Figura 4.1-1: Diagrama de asignación de pines, vista superior"
    El diagrama no se reproduce en esta guía. Consulte la figura 3-1 de la hoja de datos oficial.

### 4.2 Tabla de definición de pines { #42-pin-definition-table }

El módulo tiene 68 pines en total, que se describen en la tabla siguiente.

<div align="center"><em>Tabla 4.2-1: Tabla de definición de pines</em></div>

<div align="center" markdown>

| Nombre | N.º | Tipo | MUX predeterminado | E/S predeterminada | Función |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Tierra | P | Tierra (GND) |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *si el módulo lleva montado el cristal interno de 32K, PA23 no está disponible externamente* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *si el módulo lleva montado el cristal interno de 32K, PA22 no está disponible externamente* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | Salida de alimentación de 3,3 V |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | Tierra | P | Tierra (GND) |
| VSYS | 27 | P | VSYS | P | Entrada de alimentación principal. Rango de alimentación de la batería Li-ion: 3,2–4,7 V; si se alimenta mediante DCDC/LDO (sin Li-ion), el rango es 3,7–4,7 V y se recomiendan 3,8 V |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Salida diferencial positiva del DAC de audio |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Salida diferencial negativa del DAC de audio |
| GND | 35 | P | Tierra | P | Tierra (GND) |
| MIC_BIAS | 36 | P | MIC_BIAS | P | Tensión de polarización del micrófono |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | Entrada de audio analógico |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | Tierra | P | Tierra (GND, 13 pines) |
| VBATS | 61 | P | VBAT | P | Entrada de detección de tensión de batería |
| NC | 62 | — | NC | — | Sin conexión |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Leyenda: P = alimentación; I = entrada; O = salida; T = se puede configurar en alta impedancia; AO = salida de audio; AI = entrada de audio.*

!!! note
    Los pines 29 (DBG_UART_TXD) y 30 (DBG_UART_RXD) son el puerto predeterminado para registros, depuración y descarga de programas.

### 4.3 Descripción física de los pines { #43-physical-pin-description }

    La figura de descripción física de pines de la hoja de datos agrupa las señales por función —SDIO, SPI, I2C, UART, GPTIM, interfaz LCD, GPADC, MPI, audio analógico, oscilador externo de 32K, activación externa y UART de depuración/SWD— sobre el contorno del chip SF32LB525UC6. Consúltela junto con la tabla de definición de pines al distribuir los grupos de señales en la PCB portadora.

!!! info "Figura 4.3-1: Descripción física de los pines"
    El diagrama no se reproduce en esta guía. Consulte la figura 3-2 de la hoja de datos oficial.

## 5. Periféricos { #5-peripherals }

### 5.1 Interfaces de comunicación { #51-communication-interfaces }

Todos los pines marcados como `PAxx_I2C_UART` en la tabla anterior se pueden configurar como I2C o UART. La hoja de datos indica un máximo configurable de 4 interfaces I2C y 3 UART.

!!! important "Discrepancia en el número de periféricos indicado en la hoja de datos"
    Más adelante, la misma hoja de datos enumera I2C1–I2C7 y UART1–UART6, en conflicto con los máximos indicados. Confirme con SiFli cuántas interfaces están disponibles en la configuración concreta del módulo/SoC; no deduzca que todos los controladores enumerados pueden usarse simultáneamente.

**UART** — Comunicación full-duplex, velocidad de transmisión de hasta 6 Mbps, formato de datos configurable, control de flujo por hardware (CTS/RTS) y transmisión/recepción DMA de varios paquetes. UART1–3 están en HPSYS; UART4–6, en LPSYS.

**I2C** — Admite modos maestro y esclavo, FIFO de 8 bytes y DMA; modos estándar (100 kbps), rápido (400 kbps), fast-mode plus (1 Mbps) y alta velocidad (3,4 Mbps); direccionamiento de 7 o 10 bits en modo maestro y un filtro digital configurable para eliminar pulsos espurios. I2C1–4 están en HPSYS; I2C5–7, en LPSYS.

**SPI** — Admite los formatos SSP/SPI (full-duplex, maestro o esclavo) y Microwire (half-duplex, solo maestro). Ancho de datos de 4–32 bits; polaridad/fase del reloj (SPO/SPH) y polaridad de selección de chip configurables; FIFO de 32 bits × 16 entradas, DMA y reloj de hasta 48 MHz.

**USB2.0 FS** — Un puerto full-speed de host/dispositivo con puntos de conexión configurables, suspensión/reanudación, tamaño de FIFO dinámico, solicitud de sesión y protocolo de negociación con el host; incluye un PHY USB2.0 FS.

**MPI (Memory Peripheral Interface)** — Admite memorias SPI NOR Flash (1/2/4 líneas) y SPI NAND Flash (1/2/4 líneas), con acceso en modo de registros y modo memory-mapped y conmutación automática por hardware. La interfaz MPI2 del módulo permite conectar memorias SPI NOR/NAND externas. Si el módulo ya incorpora Flash, sus seis señales externas MPI2 (PA12, PA13, PA14, PA15, PA16 y PA17) no están disponibles externamente.

**SD/SDIO/eMMC** — Cumple SD 3.0, SDIO 3.0 y eMMC 4.5.1; admite tarjetas SDSC/SDHC/SDXC/SDHS, SDR12/25/50, modos SDR de una y cuatro líneas, FIFO de 2KB y transferencias DMA, hasta 48MHz (sin DDR). Nota: SDIO comparte las señales de E/S con MPI2; no se pueden usar simultáneamente.

**I2S** — Modos maestro/esclavo y full-duplex; formatos alineados a la izquierda, a la derecha y estándar; mono/estéreo de 8 y 16 bits, y ancho PCM de hasta 24 bits.

**Interfaz LCD** — Modo SPI serie DBI (3/4 líneas y líneas de datos duales/cuádruples) y modo paralelo 8080 (bus de 8/16/24 bits). Según el modo, admite los formatos de color RGB332/RGB444/RGB565/RGB666/RGB888.

### 5.2 Procesamiento de señales analógicas { #52-analog-signal-processing }

**GPADC de 12 bits** — ADC SAR, frecuencia máxima de muestreo de 4 MS/s, rango de entrada de 0–3,3 V de un solo extremo / ±2,1 V diferencial, 7 canales de un solo extremo + 1 canal de tensión de batería (o 3 pares diferenciales), modos de medición única/continua, 4 ranuras temporales configurables por medición, activación por software/hardware y DMA.

**Sensor de temperatura** — Resolución de 0,2 °C, rango de -40 °C a 125 °C y precisión de ±3 °C; lectura por sondeo o interrupción.

**DAC de audio** — Una ruta de salida DAC de 24 bits, frecuencias de muestreo de 8 kHz–48 kHz y salida diferencial.

**PLL de audio** — Generación de reloj Fractional-N con resolución de 48 MHz/2^18; admite las siguientes frecuencias de muestreo derivadas: 48 MHz, 32,768 kHz y 44,1 kHz.

**ADC de audio** — Una ruta de entrada ADC Sigma-Delta de 24 bits, con frecuencias de muestreo de 8 kHz–48 kHz.

## 6. Características eléctricas { #6-electrical-characteristics }

### 6.1 Valores máximos absolutos { #61-absolute-maximum-ratings }

Superar los valores de la tabla siguiente puede dañar permanentemente el módulo. Son valores límite de estrés; no implican que el módulo funcione fuera de las condiciones de operación recomendadas en §6.2. La exposición prolongada a condiciones máximas absolutas puede reducir la fiabilidad del módulo.

<div align="center"><em>Tabla 6.1-1: Valores máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | Tensión del pin de alimentación | -0,3 | 4,7 | V |
| Tstore | Temperatura de almacenamiento | -40 | 125 | °C |

</div>

### 6.2 Condiciones de funcionamiento recomendadas { #62-recommended-operating-conditions }

<div align="center"><em>Tabla 6.2-1: Condiciones de funcionamiento recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Alimentación de batería Li-ion | 3,2 | - | 4,7 | V |
| VSYS | Alimentación sin batería Li-ion mediante DCDC/LDO | 3,7 | 3,8 | 4,7 | V |
| TA | Temperatura de funcionamiento | -40 | - | 85 | °C |

</div>

### 6.3 Características eléctricas de CC (3,3 V, 25 °C) { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>Tabla 6.3-1: Características eléctricas de CC (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitancia del pin | 2,5 | 3 | 3,5 | pF |
| VIH | Tensión de entrada alta | 0,7×VDD | - | VDD | V |
| VIL | Tensión de entrada baja | VSS | - | 0,3×VDD | V |
| IIH | Corriente de entrada alta | - | 10 | 40 | nA |
| IIL | Corriente de entrada baja | - | 10 | 40 | nA |
| VOH | Tensión de salida alta (carga de alta impedancia) | 0,8×VDD | - | VDD | V |
| VOL | Tensión de salida baja (carga de alta impedancia) | VSS | - | 0,2×VDD | V |
| IOH | Corriente de accionamiento de salida alta | 24 | 30 | 38 | mA |
| IOL | Corriente de accionamiento de salida baja | 24 | 30 | 38 | mA |
| RPU | Pull-up interno (Vpad=0,8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Pull-down interno (Vpad=0,2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tensión de liberación del reinicio | 0,7×VDD | - | VDD | V |
| VIL_nRST | Tensión de activación del reinicio | VSS | - | 0,3×VDD | V |

</div>

VDD es la línea de alimentación de E/S; VOH/VOL se miden con una carga de alta impedancia.

### 6.4 Consumo de energía { #64-power-consumption }

<div align="center"><em>Tabla 6.4-1: Corriente media de Bluetooth y BLE (alimentación de 3,8 V)</em></div>

<div align="center" markdown>

| Modo | Intervalo | @0dBm | @4dBm | @10dBm | Unidad |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (intento=1) | 50 ms | 129,5 | 135,6 | 160,9 | µA |
| BT Sniff (intento=1) | 1 s | 6,0 | 6,3 | 7,6 | µA |
| BLE ADV | 50 ms | 171,6 | 217,6 | 298,3 | µA |
| BLE ADV | 1 s | 8,9 | 9,5 | 17,0 | µA |
| Conexión BLE | 50 ms | 95,0 | 105,0 | 118,7 | µA |
| Conexión BLE | 1 s | 4,1 | 4,6 | 9,1 | µA |
| Escaneo (Inquiry o Page) | — | 33,4 | — | — | µA |
| Ambos escaneos | — | 67,3 | — | — | µA |
| Suspensión | — | 20,0 | — | — | µA |

</div>

<div align="center"><em>Tabla 6.4-2: Consumo del procesador (alimentación de 3,8 V)</em></div>

<div align="center" markdown>

| Reloj | Corriente (µA) | Incremento (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 Rendimiento RF de Bluetooth de modo dual { #65-dual-mode-bluetooth-rf-performance }

Admite Bluetooth 5.3 y es retrocompatible con 4.2/4.1/4.0. La frecuencia central de los canales de funcionamiento es de 2402–2480 MHz.

**Transmisor BLE (1 Mbps)**: potencia máxima de 19 dBm, rango de control de potencia de -20 a 19 dBm, Δf1avg = 250 kHz típico y Δf2max = 210 kHz típico. Son valores de desviación de frecuencia (la hoja de datos etiqueta las entradas como modulación máxima/mínima), no un índice de modulación adimensional. La tolerancia inicial típica de frecuencia portadora es de ±20 kHz.

**Receptor BLE (1 Mbps)**: sensibilidad de -100 dBm (dirty off) / -99,3 dBm (dirty on) con PER del 30,8 %; C/I cocanal de 7 dB.

**Classic BT (Basic Data Rate)**: potencia máxima de transmisión de 18 dBm; sensibilidad del receptor de -96,3 dBm (dirty off) / -94 dBm (dirty on) con BER del 0,1 %.

**Classic BT (Enhanced Data Rate)**: potencia máxima de transmisión de 13 dBm; sensibilidad de recepción de -95,5 dBm para π/4-DQPSK y de -88,5 dBm para 8DPSK.

La sección §5.5 de la hoja de datos oficial incluye tablas completas con valores mínimos/típicos/máximos para el rendimiento TX/RX de BLE 1Mbps/2Mbps y Classic BT BR/EDR.

## 7. Alimentación del módulo { #7-module-power-supply }

El módulo tiene una única entrada principal de alimentación, **VSYS**, que puede conectarse directamente a una batería Li-ion/Li-Po (3,2–4,7 V) o alimentarse desde un regulador DCDC/LDO (3,7–4,7 V; se recomiendan 3,8 V).

**VBATS** es el pin de detección de tensión de batería, que el ADC interno mide en un rango de 0–4,7 V. No utilice un divisor resistivo externo en VBATS; conecte directamente al pin la señal que se desea medir.

**VDD33_VOUT2** es la salida del LDO interno de 3,3 V del módulo y puede suministrar hasta 150 mA a los periféricos externos; la capacitancia total de esta línea no debe superar 7,4 µF.

## 8. Esquemático de referencia y asignación de pines { #8-reference-schematic-and-pin-assignment }

La hoja de datos incluye un esquemático de referencia completo para una placa de desarrollo basada en SF32LB52-MOD-1, con los circuitos de alimentación, reinicio, JTAG/SWD, UART, SDIO, LCD y audio.

!!! info "Figura 8-1: Esquemático de referencia de la placa de desarrollo"
    El esquemático no se reproduce en esta guía. Consulte las figuras 7-2–7-6 de la hoja de datos oficial.

La hoja de datos también incluye una tabla con la asignación de pines recomendada para esa placa de referencia.

!!! info "Figura 8-2: Asignación de pines recomendada para la placa de referencia"
    La tabla no se reproduce en esta guía. Consulte la figura 7-7 de la hoja de datos oficial.

Utilice estos recursos como punto de partida para el esquemático de producción y adapte la selección de pines a los periféricos concretos del producto.

## 9. Lista de comprobación del esquemático { #9-schematic-design-checklist }

<div align="center"><em>Tabla 9-1: Lista de comprobación del esquemático</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación |
| :-: | :--- |
| 1 | VSYS puede conectarse directamente a una batería Li-ion; si se alimenta mediante DCDC/LDO, se recomiendan 3,8 V. VBATS es el pin de detección de tensión de batería (rango de 0–4,7 V): no utilice un divisor resistivo externo; conecte directamente VBATS a la señal que se desea medir. |
| 2 | Coloque un condensador de 4,7 µF y otro de 0,1 µF cerca del pin VSYS. |
| 3 | Coloque un condensador de 0,1 µF cerca del pin VBATS. |
| 4 | VDD33_VOUT2 es la salida del LDO de 3,3 V, con una corriente máxima de 150 mA; la carga externa no debe superar este valor. |
| 5 | La capacitancia total de VDD33_VOUT2 debe ser ≤ 7,4 µF. |
| 6 | El nivel de E/S del módulo es de 3,3 V; todos los periféricos conectados también deben usar niveles lógicos de 3,3 V. |
| 7 | Si el módulo lleva montado un cristal interno de 32K, PA22 y PA23 no están disponibles externamente. |
| 8 | Si el módulo ya incorpora Flash, las 6 señales MPI2 (PA12, PA13, PA14, PA15, PA16, PA17) no están disponibles externamente. |
| 9 | La interfaz SDIO comparte las señales de E/S con MPI2 y no se pueden usar simultáneamente. |
| 10 | Los pines marcados como `#GPADC_CHx` en la tabla admiten entrada analógica en el rango de 0–3,3 V. |
| 11 | Los pines marcados como `PAxx_TIM` en la tabla admiten salida PWM. |
| 12 | PA34 admite el reinicio mediante una pulsación larga de 10 segundos, activo en alto; añada una resistencia pull-down de 10 kΩ al diseño. |
| 13 | Reserve componentes de protección ESD para las interfaces de batería y del panel táctil (TP), así como para otras señales expuestas al exterior cuando sea necesario. |
| 14 | Se recomienda colocar una resistencia en serie de 100 Ω en cada pin PA18/PA19 cuando se multiplexan como DBG_UART para grabación y depuración. |

</div>

## 10. Dimensiones del módulo y huella de PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensiones del módulo { #101-module-dimensions }

El módulo mide 27,9 × 18,0 × 3,1 mm.

!!! info "Figura 10.1-1: Dimensiones del módulo: vistas superior, lateral e inferior"
    El diagrama no se reproduce en esta guía. Consulte la figura 8-1 de la hoja de datos oficial.

### 10.2 Huella de PCB recomendada { #102-recommended-pcb-footprint }

!!! info "Figura 10.2-1: Huella de PCB recomendada"
    El diagrama no se reproduce en esta guía. Consulte la figura 8-2 de la hoja de datos oficial.

### 10.3 Conector de antena externa { #103-external-antenna-connector }

Para las referencias que admiten antena externa, el módulo utiliza una huella de conector de primera generación compatible con:

- La serie U.FL de Hirose
- Los conectores MHFI de I-PEX
- Los conectores AMC de Amphenol

!!! info "Figura 10.3-1: Dimensiones del conector de antena externa"
    El diagrama no se reproduce en esta guía. Consulte la figura 8-3 de la hoja de datos oficial.

### 10.4 Colocación del módulo en el diseño de PCB { #104-module-placement-in-pcb-design }

Si el producto final integra el módulo en la placa, reserve espacio para que ningún componente ni zona metálica se solape con la zona de antena de la PCB del módulo, ya que esto reduciría la eficiencia de radiación. Planifique la posición del módulo en la placa anfitriona para minimizar el impacto en el rendimiento de la antena.

Práctica recomendada:

- Procure que la zona de antena del módulo sobresalga del borde de la placa anfitriona y sitúe el punto de alimentación cerca del borde.

!!! info "Figura 10.4-1: Colocación recomendada del módulo"
    El diagrama no se reproduce en esta guía. Consulte la figura 8-4 de la hoja de datos oficial.

- Si la antena no puede sobresalir del borde de la placa, deje una zona de exclusión de al menos 15 mm alrededor de la antena de la PCB, sin planos de cobre, pistas ni componentes; cuando sea posible, elimine también el material de la placa portadora situado bajo la antena.

!!! info "Figura 10.4-2: Zona de exclusión de la antena"
    El diagrama no se reproduce en esta guía. Consulte la figura 8-5 de la hoja de datos oficial.

- Mantenga el punto de alimentación de la antena cerca del borde de la placa incluso al usar una zona de exclusión.
- En el diseño del producto final, evalúe el efecto de la carcasa sobre la antena y valide el rendimiento RF, incluida una prueba final del alcance de comunicación del producto terminado.

## 11. Manipulación del producto { #11-product-handling }

### 11.1 Condiciones de almacenamiento { #111-storage-conditions }

- Almacene los productos en una bolsa barrera contra la humedad (MBB) sellada, a <40 °C / 90 % RH y sin condensación.
- Nivel de sensibilidad a la humedad del módulo (MSL): 3.
- Tras abrir la bolsa de vacío, utilice el módulo en un plazo de 168 horas a 25 ± 5 °C / 60 % RH; si se supera ese plazo, debe hornearse antes de volver a introducirlo en la línea de producción.

### 11.2 Descarga electrostática (ESD) { #112-electrostatic-discharge-esd }

- Modelo del cuerpo humano (HBM): ±2000 V
- Modelo de dispositivo cargado (CDM): ±500 V

### 11.3 Perfil de reflujo { #113-reflow-profile }

Se recomienda someter el módulo a un único ciclo de reflujo.

!!! info "Figura 11.3-1: Perfil de temperatura de reflujo recomendado"
    El diagrama no se reproduce en esta guía. Consulte la figura 9-1 de la hoja de datos oficial.

### 11.4 Vibración ultrasónica { #114-ultrasonic-vibration }

Evite exponer los módulos SiFli a las vibraciones de equipos de soldadura o limpieza por ultrasonidos. La vibración ultrasónica puede entrar en resonancia con los osciladores de cristal internos del módulo y causar fallos o un funcionamiento incorrecto del cristal; incluso puede dejar el módulo inoperativo o degradar su rendimiento.

## 12. Documentos relacionados { #12-related-documents }

- [Hoja de datos DS5203-SF32LB52-MOD-1 (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [Introducción al chip SF32LB52x](../../sf32-products/chips/SF32LB52x.md)
- [Guía de diseño de hardware del SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. Historial de revisiones { #13-revision-history }

<div align="center"><em>Tabla 13-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Fecha | Versión | Notas |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | Se actualizó la figura 2-1 |
| 2025-03 | 0.2 | Se revisaron las descripciones relacionadas con la alimentación y se actualizaron las figuras 3-1 y 6-3 |
| 2024-12 | 0.1 | Borrador |

</div>

Esta guía se basa en el contenido de la hoja de datos indicada; consulte el PDF oficial para obtener la revisión vigente y autorizada.
