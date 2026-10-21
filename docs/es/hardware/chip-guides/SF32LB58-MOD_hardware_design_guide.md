---
icon: lucide/book-check
hide:
    - navigation
description: "Guía de diseño de hardware del módulo MCU Bluetooth SF32LB58-MOD: alimentación, interfaces e integración en PCB."
tags:
    - Hardware
    - Módulo
---

# Guía de diseño de hardware de SF32LB58-MOD { #sf32lb58-mod-hardware-design-guide }

## 1. Descripción general { #1-overview }

**SF32LB58-MOD** es un módulo MCU Bluetooth de bajo consumo y uso general, basado en el chip SF32LB586VDD36 de SiFli. El chip integra un procesador Arm Cortex-M33 STAR-MC1 de tres núcleos, con una frecuencia de hasta 240 MHz. El módulo incluye un cristal de 48 MHz y ofrece uno de 32,768 kHz como opción. Según el SKU, también integra memoria HPI-PSRAM, Flash QSPI-NOR/NAND o eMMC. Es un módulo de montaje superficial con 138 pines y unas dimensiones de 24 × 24 × 3,1 mm.

Esta guía aborda la integración de hardware a nivel de módulo: definiciones de pines, interfaces periféricas, características eléctricas, requisitos de alimentación, esquemáticos de referencia, lista de comprobación del esquemático, dimensiones mecánicas y huella de PCB, y requisitos de manipulación del producto. Se basa en la hoja de datos de SiFli **DS5802-SF32LB58-MOD V0.1**.

Para conocer en más detalle la arquitectura del chip (núcleos, gráficos, subsistema de memoria y periféricos), consulte [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) y la [Guía de diseño de hardware de SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Fuentes y tratamiento de las figuras"
    Los datos técnicos específicos del módulo siguen **DS5802-SF32LB58-MOD V0.1**. Algunos diagramas de pines, esquemáticos y dibujos mecánicos de la hoja de datos son imágenes rasterizadas; aquí se enlazan como referencia en lugar de volver a dibujarlos. La numeración de figuras y tablas sigue la numeración local de esta guía; los pies de los diagramas no reproducidos indican la figura correspondiente de la hoja de datos oficial.

## 2. Resumen de diseño { #2-quick-design-summary }

### 2.1 Variantes del módulo { #21-module-variants }

<div align="center"><em>Tabla 2.1-1: Variantes del módulo</em></div>

<div align="center" markdown>

| Código del módulo | Flash | PSRAM | Flash estándar | Temperatura | Dimensiones (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 a 85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 a 85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 a 85 °C | 24 × 24 × 3,1 mm |

</div>

### 2.2 Especificaciones principales { #22-key-specifications }

<div align="center"><em>Tabla 2.2-1: Especificaciones principales</em></div>

<div align="center" markdown>

| Elemento | Especificación |
| :--- | :--- |
| Núcleos de aplicación (HCPU/ACPU) | 2 × Arm Cortex-M33 STAR-MC1, hasta 240 MHz |
| Núcleo de bajo consumo (LCPU) | Arm Cortex-M33 STAR-MC1, hasta 96 MHz |
| SRAM | 2176 KB (HCPU) + 512 KB (ACPU) + 1056 KB de SRAM de retención (LCPU) |
| Conectividad inalámbrica | Bluetooth 5.3 de modo dual, compatible con 4.2/4.1/4.0; admite BLE y Bluetooth clásico |
| Gráficos | ePicasso 2.0 + Vivante GCNanoUltraV, hasta 1024×1024, eZip 2.0 y códec JPEG por hardware |
| Audio | 2 DAC de audio de 24 bits y 2 ADC Sigma-Delta de audio de 24 bits |
| Almacenamiento | 5 MPI (integrados en el encapsulado y externos), 2 SD/SDIO/eMMC |
| Encapsulado | 138 pines, 24 × 24 × 3,1 mm |
| Alimentación | VDD_3V3 (2,97–3,6 V), VDD_1V8 (1,7–1,95 V), VDDIOA/VDDIOA2/VDDIOB (1,7–3,6 V) |
| Antena | Antena externa mediante una conexión RF con semiorificios metalizados o un conector compatible con IPEX, según el número de pieza |
| Temperatura de funcionamiento | -40 a 85 °C |

</div>

## 3. Diagrama funcional de bloques { #3-functional-block-diagram }

El módulo integra el chip SF32LB586VDD36, un cristal de 48 MHz, otro opcional de 32,768 kHz y, según el SKU, HPI-PSRAM, Flash QSPI-NOR/NAND o eMMC integradas en el encapsulado, además de la red de adaptación RF y la conexión de antena.

!!! info "Figura 3-1: Diagrama funcional de bloques"
    Este diagrama no se reproduce en esta guía. Consulte la figura 2-1 de la hoja de datos oficial.

## 4. Definición de pines { #4-pin-definition }

### 4.1 Diagrama de pines { #41-pinout-diagram }

El módulo dispone de 138 pines distribuidos por su perímetro.

!!! info "Figura 4-1: Diagrama de pines, vista superior"
    Este diagrama no se reproduce en esta guía. Consulte la figura 3-1 de la hoja de datos oficial.

### 4.2 Tabla de definición de pines { #42-pin-definition-table }

El módulo tiene 138 pines en total, descritos en la siguiente tabla.

<div align="center"><em>Tabla 4.2-1: Definición de pines</em></div>

<div align="center" markdown>

| Nombre | N.º | Tipo | MUX predeterminado | E/S predeterminada | Función |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1,8/3,3 V | P | Entrada de alimentación de E/S de la interfaz PB |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: modo de descarga; 0: modo de usuario |
| RSTN | 12 | I | RSTN | I | 1: modo de usuario; 0: modo de reinicio |
| VDD_1V8 | 13 | P | 1,8 V | P | Entrada de alimentación principal de la MCU y de la memoria integrada en el encapsulado |
| GND | 14 | P | Tierra | P | Tierra |
| VDDIOA | 15 | P | 1,8/3,3 V | P | Entrada de alimentación de E/S de la interfaz PA, excepto PA00–PA11 |
| VDD_3V3 | 16 | P | 3,3 V | P | Entrada de alimentación analógica de la MCU |
| PA13 | 17 | I/O/T | GPIO_A13 | O | GPIO_A13, GPTIM1_CH2, ATIM1_BKIN, LCDC1_DPI_DE |
| PA15 | 18 | I/O/T | GPIO_A15 | O | GPIO_A15, GPTIM1_CH3, ATIM1_BKIN2, LCDC1_DPI_VSYNC |
| PA14 | 19 | I/O/T | GPIO_A14 | O | GPIO_A14, I2S1_LRCK, LCDC1_DPI_HSYNC |
| PA12 | 20 | I/O/T | GPIO_A12 | O | GPIO_A12, GPTIM1_CH1, ATIM1_CH4, LCDC1_DPI_CLK |
| PA67 | 21 | I/O/T | GPIO_A67 | O | GPIO_A67, #WKUP_PIN9, GPTIM2_CH3, ATIM1_CH1N, LCDC1_DPI_B7, LCDC1_JDI_B2 |
| PA65 | 22 | I/O/T | GPIO_A65 | O | GPIO_A65, #WKUP_PIN7, GPTIM2_CH2, ATIM1_CH1, LCDC1_DPI_B6, LCDC1_JDI_B1 |
| PA63 | 23 | I/O/T | GPIO_A63 | O | GPIO_A63, I2C2_SDA, USART1_CTS, #GPCOMP_N, LCDC1_DPI_B5 |
| PA62 | 24 | I/O/T | GPIO_A62 | O | GPIO_A62, I2C2_SCL, USART1_RTS, #GPCOMP_P, LCDC1_DPI_B4 |
| PA61 | 25 | I/O/T | GPIO_A61 | I | GPIO_A61, SPI1_CS, USART2_TXD, LCDC1_DPI_B3 |
| PA58 | 26 | I/O/T | GPIO_A58 | I | GPIO_A58, LPTIM1_ETR, GPTIM2_CH1, ATIM2_ETR, LCDC1_8080_DIO7, LCDC1_DPI_B2 |
| PA57 | 27 | I/O/T | GPIO_A57 | I | GPIO_A57, SPI1_DI, USART2_RXD, LCDC1_DPI_B1 |
| PA56 | 28 | I/O/T | GPIO_A56 | I | GPIO_A56, SPI1_CLK, USART2_CTS, LCDC1_DPI_B0 |
| PA55 | 29 | I/O/T | GPIO_A55 | O | GPIO_A55, GPTIM1_CH4, ATIM2_BKIN2, LCDC1_DPI_G7 |
| PA54 | 30 | I/O/T | GPIO_A54 | O | GPIO_A54, SPI1_DO, SPI1_DIO, USART2_RTS, LCDC1_DPI_G6 |
| PA53 | 31 | I/O/T | GPIO_A53 | I/O | GPIO_A53, LCDC1_DPI_G5 |
| PA50 | 32 | I/O/T | GPIO_A50 | O | GPIO_A50, MPI3_DIO0, LCDC1_8080_RD, LCDC1_SPI_DIO0, LCDC1_DPI_G4, LCDC1_JDI_G2 |
| PA48 | 33 | I/O/T | GPIO_A48 | O | GPIO_A48, MPI3_DIO1, LCDC1_8080_DC, LCDC1_SPI_DIO1, LCDC1_DPI_G3, LCDC1_JDI_G1 |
| PA47 | 34 | I/O/T | GPIO_A47 | O | GPIO_A47, MPI3_DIO2, LCDC1_8080_DIO0, LCDC1_SPI_DIO2, LCDC1_DPI_G2, LCDC1_JDI_R2 |
| PA46 | 35 | I/O/T | GPIO_A46 | O | GPIO_A46, MPI3_CLK, LCDC1_8080_WR, LCDC1_SPI_CLK, LCDC1_DPI_G1, LCDC1_JDI_R1 |
| PA45 | 36 | I/O/T | GPIO_A45 | O | GPIO_A45, MPI3_DIO3, LCDC1_8080_DIO1, LCDC1_SPI_DIO3, LCDC1_DPI_G0, LCDC1_JDI_ENB |
| PA44 | 37 | I/O/T | GPIO_A44 | O | GPIO_A44, MPI3_CS, LCDC1_8080_CS, LCDC1_SPI_CS, LCDC1_DPI_R7, LCDC1_JDI_HST |
| PA43 | 38 | I/O/T | GPIO_A43 | I/O | GPIO_A43, LCDC1_8080_TE, LCDC1_SPI_TE, LCDC1_DPI_R6, LCDC1_JDI_HCK |
| PA27 | 39 | I/O/T | GPIO_A27 | I/O | GPIO_A27, SCI_DIO, GPTIM2_CH3, ATIM2_CH2N, LCDC1_8080_DIO3, LCDC1_DPI_R5, LCDC1_JDI_XRST |
| PA26 | 40 | I/O/T | GPIO_A26 | O | GPIO_A26, SCI_CLK, GPTIM2_CH2, ATIM2_CH2, LCDC1_8080_DIO2, LCDC1_DPI_R4 |
| PA25 | 41 | I/O/T | GPIO_A25 | O | GPIO_A25, PDM2_CLK, SD1_CLKIN, GPTIM2_CH1, ATIM2_CH1N, LCDC1_DPI_R3, LCDC1_JDI_XRST |
| PA24 | 42 | I/O/T | GPIO_A24 | O | GPIO_A24, LCDC1_8080_RSTB, LCDC1_SPI_RSTB, LCDC1_DPI_R2 |
| PA23 | 43 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_CLK, I2S1_BCK, USART2_CTS, I2C2_SDA, LCDC1_DPI_R1 |
| PA22 | 44 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM2_DATA, GPTIM1_ETR, ATIM2_CH1, LCDC1_DPI_R0, LCDC1_JDI_VST |
| VDDIOA2 | 45 | P | 1,8/3,3 V | P | Entrada de alimentación de E/S de PA00–PA11 |
| GND | 46 | P | Tierra | P | Tierra |
| DSI_D0N | 47 | O | DSI_D0N | O | Carril de datos MIPI DSI 0, negativo |
| DSI_D0P | 48 | O | DSI_D0P | P | Carril de datos MIPI DSI 0, positivo |
| DSI_CLKN | 49 | O | DSI_CLKN | P | Carril de reloj MIPI DSI, negativo |
| DSI_CLKP | 50 | O | DSI_CLKP | P | Carril de reloj MIPI DSI, positivo |
| DSI_D1N | 51 | O | DSI_D1N | P | Carril de datos MIPI DSI 1, negativo |
| DSI_D1P | 52 | O | DSI_D1P | P | Carril de datos MIPI DSI 1, positivo |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | Señal diferencial USB, negativa |
| USB2_DP | 56 | I/O | USB2_DP | I/O | Señal diferencial USB, positiva |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Tierra | P | Tierra |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Salida diferencial negativa del DAC de audio 1 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Salida diferencial positiva del DAC de audio 1 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Tensión de polarización del micrófono |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Entrada diferencial negativa del ADC de audio 1 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Entrada diferencial positiva del ADC de audio 1 |
| GND | 71 | P | Tierra | P | Tierra |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Entrada/salida de señal RF Bluetooth |
| PB51 | 73 | I/O/T | GPIO_B51 | I/O | GPIO_B51, PMIC_SDA, USART4_CTS, USART5_CTS, LPCOMP1_OUT |
| PB52 | 74 | I/O/T | GPIO_B52 | I/O | GPIO_B52, PMIC_SCLK, USART4_RTS, USART5_RTS, LPCOMP2_OUT |
| PB56 | 75 | I/O/T | GPIO_B56 | I/O | GPIO_B56, USART4_CTS, SPI3_CLK, #WKUP_PIN2 |
| PB57 | 76 | I/O/T | GPIO_B57 | I/O | GPIO_B57, USART4_RTS, SPI3_DO, SPI3_DIO, #WKUP_PIN3 |
| PB58 | 77 | I/O/T | GPIO_B58 | I/O | GPIO_B58, USART6_RXD, SPI3_DI, #WKUP_PIN4 |
| PB59 | 78 | I/O/T | GPIO_B59 | I/O | GPIO_B59, USART6_TXD, SPI3_CS, #WKUP_PIN5 |
| PA93 | 79 | I/O/T | GPIO_A93 | I/O | GPIO_A93, I2C3_SDA, USART3_TXD, USART3_RTS |
| PA92 | 80 | I/O/T | GPIO_A92 | I/O | GPIO_A92, I2C3_SCL, USART3_RXD, USART3_CTS |
| PA91 | 81 | I/O/T | GPIO_A91 | I/O | GPIO_A91, I2S2_BCK, GPTIM1_ETR, ATIM2_CH2N, LCDC1_SPI_DIO0, LCDC1_8080_RD, LCDC1_JDI_EXTCOMIN |
| PA90 | 82 | I/O/T | GPIO_A90 | I/O | GPIO_A90, I2S2_MCLK, GPTIM1_CH4, ATIM2_CH2, LCDC1_SPI_CLK, LCDC1_8080_WR, LCDC1_JDI_DISP |
| PA88 | 83 | I/O/T | GPIO_A88 | I/O | GPIO_A88, LCDC1_SPI_CS, LCDC1_8080_CS |
| PA86 | 84 | I/O/T | GPIO_A86 | I/O | GPIO_A86, I2S2_SDI, GPTIM1_CH3, ATIM2_CH1N, LCDC1_SPI_DIO3, LCDC1_8080_DIO1, LCDC1_JDI_SO |
| PA84 | 85 | I/O/T | GPIO_A84 | I/O | GPIO_A84, I2S2_LRCK, GPTIM1_CH2, ATIM2_CH1, LCDC1_SPI_DIO2, LCDC1_8080_DIO0, LCDC1_JDI_SCLK |
| PA82 | 86 | I/O/T | GPIO_A82 | I/O | GPIO_A82, I2S2_SDO, GPTIM1_CH1, ATIM1_CH3N, LCDC1_SPI_DIO1, LCDC1_8080_DC, LCDC1_JDI_SCS |
| PA60 | 87 | I/O/T | GPIO_A60 | I/O | GPIO_A60, I2C4_SCL, USART1_RXD, USART3_CTS |
| PA59 | 88 | I/O/T | GPIO_A59 | I/O | GPIO_A59, I2C4_SDA, USART1_TXD, USART3_RTS |
| PA52 | 89 | I/O/T | SWDIO | I/O | SWDIO, GPIO_A52, GPTIM1_CH3, ATIM2_BKIN, LCDC1_8080_DIO6 |
| PA51 | 90 | I/O/T | SWCLK | O | SWCLK, GPIO_A51, GPTIM1_CH2, ATIM2_CH4, LCDC1_8080_DIO5 |
| PA42 | 91 | I/O/T | GPIO_A42 | I/O | GPIO_A42, GPTIM2_CH4, ATIM2_CH3, LCDC1_8080_DIO4 |
| PA20 | 92 | I/O/T | GPIO_A20 | I/O | GPIO_A20, USART3_RXD, SPI1_DI, USART2_CTS |
| PA21 | 93 | I/O/T | GPIO_A21 | I/O | GPIO_A21, USART3_TXD, SPI1_DO, USART2_RTS |
| PA29 | 94 | I/O/T | GPIO_A29 | I/O | GPIO_A29, USART2_RXD, SPI1_CS, I2C2_SDA |
| PA28 | 95 | I/O/T | GPIO_A28 | I/O | GPIO_A28, USART2_TXD, SPI1_CLK, I2C2_SCL |
| PA18 | 96 | I/O/T | GPIO_A18 | I/O | GPIO_A18, PDM1_DATA, I2S1_SDI, USART2_RTS, I2C2_SCL, LCDC1_DPI_SD |
| PA02 | 97 | I/O/T | GPIO_A02 | I/O | GPIO_A02, SD1_CLKIN, CAN2_RXD, ATIM1_CH1N, USART3_RXD |
| PA11 | 98 | I/O/T | GPIO_A11 | I/O | GPIO_A11, SCI_RST, CAN2_TXD, I2C1_SDA, ATIM1_CH3N, USART3_TXD |
| PA08 | 99 | I/O/T | GPIO_A08 | I/O | GPIO_A08, SD1_DIO6, SCI_DIO, USART2_RXD, ATIM1_CH3 |
| PA07 | 100 | I/O/T | GPIO_A07 | I/O | GPIO_A07, SD1_DIO4, SCI_CLK, USART2_TXD, ATIM1_CH2N |
| PA10 | 101 | I/O/T | GPIO_A10 | I/O | GPIO_A10, SD1_CMD, MPI4_CS |
| PA09 | 102 | I/O/T | GPIO_A09 | I/O | GPIO_A09, SD1_CLK, MPI4_CLK |
| PA06 | 103 | I/O/T | GPIO_A06 | I/O | GPIO_A06, SD1_DIO3, MPI4_DIO3 |
| PA04 | 104 | I/O/T | GPIO_A04 | I/O | GPIO_A04, SD1_DIO1, MPI4_DIO1 |
| PA05 | 105 | I/O/T | GPIO_A05 | I/O | GPIO_A05, SD1_DIO0, MPI4_DIO0 |
| PA01 | 106 | I/O/T | GPIO_A01 | I/O | GPIO_A01, SD1_DIO2, MPI4_DIO2 |
| PB10 | 107 | I/O/T | GPIO_B10 | I/O | GPIO_B10, LCDC2_JDI_HST, LCDC2_SPI_CLK, USART6_RXD, GPTIM5_CH3 |
| PB09 | 108 | I/O/T | GPIO_B09 | I/O | GPIO_B09, LCDC2_JDI_R1, LCDC2_SPI_DIO0, USART6_TXD, GPTIM5_CH2, WLAN_ACTIVE |
| PB08 | 109 | I/O/T | GPIO_B08 | I/O | GPIO_B08, LCDC2_JDI_G1, LCDC2_SPI_CS, GPTIM5_CH1, BT_ACTIVE |
| PB06 | 110 | I/O/T | GPIO_B06 | I/O | GPIO_B06, LCDC2_JDI_R2, LCDC2_SPI_DIO3, LCDC2_JDI_SO, GPTIM4_CH3, USART6_CTS |
| PB04 | 111 | I/O/T | GPIO_B04 | I/O | GPIO_B04, LCDC2_JDI_G2, LCDC2_SPI_DIO2, LCDC2_JDI_DISP, GPTIM4_CH1, USART4_CTS |
| PB03 | 112 | I/O/T | GPIO_B03 | I/O | GPIO_B03, LCDC2_JDI_B2, LCDC2_SPI_DIO1, LCDC2_JDI_SCS, GPTIM3_CH4, USART4_RTS |
| PB02 | 113 | I/O/T | GPIO_B02 | I/O | GPIO_B02, LCDC2_JDI_B1, LCDC2_SPI_TE, LCDC2_JDI_SCLK, GPTIM3_CH3 |
| PB01 | 114 | I/O/T | GPIO_B01 | I/O | GPIO_B01, I2C7_SCL, USART6_TXD, GPTIM3_CH2, LPTIM3_OUT |
| PB00 | 115 | I/O/T | GPIO_B00 | I/O | GPIO_B00, I2C7_SDA, USART6_RXD, GPTIM3_CH1, LPTIM3_IN |
| PB23 | 116 | I/O/T | GPIO_B23 | I/O | GPIO_B23, USART5_CTS, SPI3_DO, SPI3_DIO, GPTIM4_CH2 |
| PB26 | 117 | I/O/T | GPIO_B26 | I/O | GPIO_B26, USART5_RTS, SPI3_CS, GPTIM5_CH1 |
| PB28 | 118 | I/O/T | GPIO_B28 | I/O | GPIO_B28, I2C6_SCL, USART6_RXD |
| PB29 | 119 | I/O/T | GPIO_B29 | I/O | GPIO_B29, I2C6_SDA, USART6_TXD |
| PB24 | 120 | I/O/T | GPIO_B24 | I/O | GPIO_B24, I2S3_SDO, GPTIM4_CH3 |
| PB27 | 121 | I/O/T | GPIO_B27 | I/O | GPIO_B27, SPI4_CLK, I2S3_SDI, GPTIM5_CH2 |
| PB31 | 122 | I/O/T | GPIO_B31 | I/O | GPIO_B31, SPI4_DI, I2S3_LRCK, AUD_CLK_EXT, GPTIM5_CH4 |
| PB30 | 123 | I/O/T | GPIO_B30 | I/O | GPIO_B30, SPI4_DO, I2S3_BCK, SPI4_DIO, GPTIM5_CH3 |
| PB34 | 124 | I/O/T | GPIO_B34 | I/O | GPIO_B34, SPI4_CS, I2S3_MCLK |
| PB39 | 125 | I/O/T | GPIO_B39 | I/O | GPIO_B39, USART6_RTS, GPTIM3_CH4 |
| PB38 | 126 | I/O/T | GPIO_B38 | I/O | GPIO_B38, USART6_CTS, GPTIM3_CH3 |
| PB47 | 127 | I/O/T | GPIO_B47 | I/O | GPIO_B47, I2C5_SDA, USART6_RXD, GPTIM5_CH2 |
| PB48 | 128 | I/O/T | GPIO_B48 | I/O | GPIO_B48, I2C5_SCL, USART6_TXD, GPTIM5_CH3 |
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Salida diferencial negativa del DAC de audio 2 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Salida diferencial positiva del DAC de audio 2 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Entrada diferencial negativa del ADC de audio 2 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Entrada diferencial positiva del ADC de audio 2 |
| GND | 133–138 | P | Tierra | P | Tierra (6 pines) |

</div>

*Leyenda: P = alimentación; I = entrada; O = salida; T = configurable como alta impedancia; AO = salida de audio; AI = entrada de audio.*

!!! note
    Los pines 2 (USART_RXD) y 3 (USART_TXD) forman el puerto predeterminado para registros, depuración y descarga de programas.

### 4.3 Distribución física de los pines { #43-physical-pin-description }

La figura de distribución física de la hoja de datos agrupa los pines por familia funcional —SDIO, SPI, I2C, UART, GPTIM, interfaz LCD (DPI/8080/SPI/JDI/DSI), GPADC, MPI, audio analógico, modo de arranque, alimentación, antena BT, CAN/USB y SWD/UART de depuración— sobre el contorno del chip SF32LB586VDD36. Consúltela junto con la tabla de pines anterior al distribuir los grupos de señales en la PCB anfitriona.

!!! info "Figura 4-2: Distribución física de los pines"
    Esta guía no reproduce el diagrama. Consulte la figura 3-2 de la hoja de datos oficial.

## 5. Periféricos { #5-peripherals }

### 5.1 Interfaces de comunicación { #51-communication-interfaces }

Cualquier pin marcado como `PAxx_I2C_UART` o `PBxx_I2C_UART` en la tabla anterior puede configurarse como I2C o UART. El chip admite hasta 7 interfaces I2C y 6 interfaces UART en total.

**UART** — Dúplex completo, velocidad de transmisión de hasta 6 Mbps, formato de datos configurable, control de flujo por hardware (CTS/RTS) y transmisión/recepción DMA de varios paquetes. UART1–3 pertenecen a HPSYS; UART4–6, a LPSYS.

**I2C** — Admite los modos maestro y esclavo, FIFO de 8 bytes y DMA; los modos estándar (100 kbps), rápido (400 kbps), modo rápido plus (1 Mbps) y alta velocidad (3,4 Mbps); direccionamiento maestro de 7 o 10 bits; estiramiento del reloj (clock stretching), y un filtro digital antirrebote configurable. I2C1–4 pertenecen a HPSYS; I2C5–7, a LPSYS.

**SPI** — Admite formatos SSP/SPI (dúplex completo, maestro o esclavo) y Microwire (semidúplex, solo maestro), anchura de datos de 4–32 bits, polaridad/fase de reloj configurable y polaridad de selección de chip configurable. Incluye FIFO de 32 bits × 16 entradas y DMA. SPI1/2 están en HPSYS (máx. 48 MHz); SPI3/4, en LPSYS (máx. 24 MHz).

**USB2.0 HS** — Un puerto de alta velocidad Host/Device, conforme con USB 2.0, con puntos finales configurables, suspensión/reanudación y compatibilidad con solicitudes de sesión y el protocolo de negociación del host. Admite los modos de alta velocidad y de velocidad completa.

**MPI (Memory Peripheral Interface)** — Admite Flash SPI NOR (1/2/4 líneas, modo DTR) y Flash SPI NAND (1/2/4 líneas), con acceso en modo de registros y en modo de memoria mapeada, y cambio automático por hardware entre ambos. La interfaz MPI4 del módulo permite conectar Flash SPI NOR/NAND externa.

**SD/SDIO/eMMC** — Compatible con SD 3.0 y eMMC 4.5.1; funciona como controlador Host con DMA encadenada y una FIFO de 1 KB. Admite tarjetas SDSC/SDHC/SDXC/SDHS, UHS-1 (SDR12/25/50/104/DDR50), modos SDR de una, cuatro u ocho líneas, y modos DDR de cuatro u ocho líneas.

**I2S** — Solo maestro, dúplex completo, formatos justificado a la izquierda/derecha y estándar, mono/estéreo de 8 y 16 bits, y anchura PCM de hasta 24 bits.

**Interfaz LCD** — Modo SPI serie DBI (3/4 líneas, líneas de datos duales/cuádruples) y modo paralelo 8080 (anchura de bus de 8/16/24 bits). Según el modo, admite los formatos de color RGB332/RGB444/RGB565/RGB666/RGB888. También hay un conjunto específico de líneas MIPI DSI (reloj + 2 líneas de datos) en los pines 47–52.

### 5.2 Procesamiento de señales analógicas { #52-analog-signal-processing }

**GPADC de 12 bits** — ADC SAR, frecuencia máxima de muestreo de 4 MS/s, rango de entrada de 0–3,3 V en modo asimétrico / ±2,1 V en modo diferencial, 8 canales asimétricos (o 4 pares diferenciales), modos de medición única/continua, 4 intervalos configurables por medición, disparo por software/hardware y DMA.

**Sensor de temperatura** — Resolución de 0,2 °C, rango de -40 °C a 125 °C, precisión de ±3 °C y lectura por sondeo o interrupción.

**DAC de audio** — 2 canales integrados de 24 bits, frecuencias de muestreo de 8 kHz–48 kHz y salida diferencial.

**PLL de audio** — Generación de reloj Fractional-N con resolución de 48 MHz/2^18; admite frecuencias de muestreo derivadas de 48 MHz, 32,768 kHz y 44,1 kHz.

**ADC de audio** — 2 canales integrados de 24 bits, frecuencias de muestreo de 8 kHz–48 kHz y control de ganancia independiente por canal.

## 6. Características eléctricas { #6-electrical-characteristics }

### 6.1 Valores máximos absolutos { #61-absolute-maximum-ratings }

<div align="center"><em>Tabla 6.1-1: Valores máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentación de 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentación de 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrada de alimentación de E/S | -0,3 | 3,6 | V |
| Tstore | Temperatura de almacenamiento | -40 | 125 | °C |

</div>

### 6.2 Condiciones de funcionamiento recomendadas { #62-recommended-operating-conditions }

<div align="center"><em>Tabla 6.2-1: Condiciones de funcionamiento recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrada de alimentación de 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrada de alimentación de 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrada de alimentación de E/S | 1,7 | - | 3,6 | V |
| TA | Temperatura de funcionamiento | -40 | - | 85 | °C |

</div>

### 6.3 Características eléctricas de CC { #63-dc-electrical-characteristics }

<div align="center"><em>Tabla 6.3-1: Características eléctricas de CC (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitancia del pin | 2,5 | 3 | 3,5 | pF |
| VIH | Tensión de entrada alta | 0,7×VDD | - | VDD | V |
| VIL | Tensión de entrada baja | VSS | - | 0,3×VDD | V |
| VOH | Tensión de salida alta (carga High-Z) | 0,8×VDD | - | VDD | V |
| VOL | Tensión de salida baja (carga High-Z) | VSS | - | 0,2×VDD | V |
| IOH | Corriente de salida alta | 24 | 30 | 38 | mA |
| IOL | Corriente de salida baja | 24 | 30 | 38 | mA |
| RPU / RPD | Pull-up / pull-down interno | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Tabla 6.3-2: Características eléctricas de CC (1,8 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parámetro | Mín. | Típ. | Máx. | Unidad |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Corriente de salida alta | 8 | 10 | 13 | mA |
| IOL | Corriente de salida baja | 8 | 10 | 13 | mA |
| RPU / RPD | Pull-up / pull-down interno | 10 | 17 | 30 | kΩ |

</div>

Las tablas completas (incluidas las fugas de entrada, los umbrales de reinicio y la capacitancia de los pines con ambas tensiones de alimentación) figuran en la sección §5.3 de la hoja de datos oficial.

### 6.4 Consumo de energía { #64-power-consumption }

<div align="center"><em>Tabla 6.4-1: Corriente BLE (potencia TX de 0 dBm)</em></div>

<div align="center" markdown>

| Símbolo | Condición | @1,8 V | @3,8 V | Unidad |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | Potencia TX = 0 dBm | 4,19 | 2,21 | mA |
| I∆RX | — | 4,03 | 2,12 | mA |

</div>

<div align="center"><em>Tabla 6.4-2: Corriente media BLE/BT clásico (alimentación de 3,8 V)</em></div>

<div align="center" markdown>

| Modo | Intervalo | @0 dBm | @10 dBm | Unidad |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 146,4 | 178,6 | µA |
| BT Sniff (attempt=1) | 1 s | 7,3 | 8,9 | µA |
| BLE ADV | 50 ms | 166,9 | 251,8 | µA |
| BLE ADV | 1 s | 8,3 | 12,6 | µA |
| Conexión BLE | 50 ms | 128,8 | 148,4 | µA |
| Conexión BLE | 1 s | 6,4 | 7,4 | µA |
| Standby | — | 4,2 | — | µA |

</div>

<div align="center"><em>Tabla 6.4-3: Consumo del procesador (HPSYS/LPSYS, alimentación de 3,8 V)</em></div>

<div align="center" markdown>

| Símbolo | Condición | Corriente (mA) | Incremento (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240 MHz | 10,34 | 31,3 |
| ICoreMark | LPSYS @48 MHz | 0,89 | 27,6 |
| IWhileLoop | HPSYS @240 MHz | 7,98 | 21,3 |
| IWhileLoop | LPSYS @48 MHz | 0,67 | 18,7 |

</div>

### 6.5 Rendimiento RF de Bluetooth de modo dual { #65-dual-mode-bluetooth-rf-performance }

Admite Bluetooth 5.3 y es compatible con las versiones 4.2/4.1/4.0. Admite BLE y Bluetooth clásico. Frecuencia central de los canales de funcionamiento: 2402–2480 MHz.

**Transmisor BLE (1 Mbps)**: potencia máxima de 19 dBm y rango de control de potencia de -20 a 19 dBm.

**Receptor BLE**: sensibilidad típica de -100 dBm (1 Mbps), -97 dBm (2 Mbps), -104,5 dBm (LR S2/500 kbps) y -107,5 dBm (LR S8/125 kbps), medida con paquetes de 37 bytes, PER del 30,8 % y condición dirty-off.

**BT clásico (Basic Data Rate)**: potencia máxima de transmisión de 19 dBm; sensibilidad de recepción de -96,3 dBm (dirty off) / -94 dBm (dirty on), con BER del 0,1 %.

**BT clásico (Enhanced Data Rate)**: potencia máxima de transmisión de 13 dBm; sensibilidad de recepción de -95,5 dBm con π/4-DQPSK y de -88,5 dBm con 8DPSK.

Las tablas completas de valores mínimos/típicos/máximos para el rendimiento TX/RX de BLE 1 Mbps/2 Mbps/LR y BT clásico BR/EDR se encuentran en la sección §5.5 de la hoja de datos oficial.

## 7. Alimentación del módulo { #7-module-power-supply }

El módulo tiene cinco interfaces de alimentación: **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2** y **VDDIOB**.

- **VDD_3V3** alimenta los raíles AVDD33_ANA, AVDD33_AUD y AVDD_USB del chip, así como VDD de la eMMC integrada en el módulo, si está presente. Se recomienda una fuente LDO.
- **VDD_1V8** alimenta los raíles PVDD1, PVDD2, AVDD_BRF y AVDD18_DSI del chip, además de la memoria integrada en el encapsulado.
- **VDDIOA** alimenta el raíl VDDIOA del chip, VIO de la eMMC integrada en el encapsulado, si lo hay, y la Flash externa.
- **VDDIOA2** alimenta el raíl VDDIOA2 del chip (correspondiente a PA00–PA11).
- **VDDIOB** alimenta el raíl VDDIOB del chip.

!!! info "Figura 7-1: Diagrama de bloques de alimentación del módulo"
    Este diagrama no se reproduce en esta guía. Consulte la figura 7-1 de la hoja de datos oficial.

## 8. Esquemático de referencia y asignación de pines { #8-reference-schematic-and-pin-assignment }

La hoja de datos incluye un esquemático de referencia completo para una placa de desarrollo basada en SF32LB58-MOD, que abarca alimentación, reinicio, JTAG/SWD, UART, SDIO, LCD, MIPI DSI y circuitos de audio.

!!! info "Figura 8-1: Esquemático de referencia de la placa de desarrollo"
    Este esquemático no se reproduce en esta guía. Consulte las figuras 7-2–7-8 de la hoja de datos oficial.

La hoja de datos también ofrece una tabla recomendada de asignación de pines para esa placa de referencia, con las correspondencias de los conectores tipo Raspberry Pi para las opciones de pantalla LCD_DPI_24, LCD_DSI, LCD_QSPI y LCD_8080.

!!! info "Figura 8-2: Asignación de pines recomendada para la placa de referencia"
    Este diagrama no se reproduce en esta guía. Consulte la figura 7-9 de la hoja de datos oficial.

Utilice estos recursos como punto de partida del esquemático de producción y adapte la selección de pines a los periféricos concretos del producto.

## 9. Lista de comprobación del diseño del esquemático { #9-schematic-design-checklist }

<div align="center"><em>Tabla 9-1: Lista de comprobación del diseño del esquemático</em></div>

<div align="center" markdown>

| N.º | Punto de comprobación |
| :-: | :--- |
| 1 | El rango de entrada de VDD_3V3 debe ser de 2,97 V–3,6 V; coloque un condensador de 4,7 µF cerca del pin del módulo. |
| 2 | El rango de entrada de VDD_1V8 debe ser de 1,7 V–1,95 V; coloque un condensador de 4,7 µF cerca del pin del módulo. |
| 3 | El rango de entrada de VDDIOA, VDDIOA2 y VDDIOB debe ser de 1,7 V–3,6 V; coloque condensadores cerca de los pines del módulo. |

</div>

!!! note
    Esta guía solo reproduce los tres puntos anteriores. Antes de cerrar el esquemático de producción, consulte la lista completa del §7.3 en el [PDF oficial de la hoja de datos](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 10. Dimensiones del módulo y huella de PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensiones del módulo { #101-module-dimensions }

El módulo mide 24 × 24 × 3,1 mm.

!!! info "Figura 10-1: Dimensiones del módulo"
    Esta figura no se reproduce en la guía. Consulte la figura 8-1 de la hoja de datos oficial.

### 10.2 Huella de PCB recomendada { #102-recommended-pcb-footprint }

!!! info "Figura 10-2: Huella de PCB recomendada"
    Esta figura no se reproduce en la guía. Consulte la figura 8-2 de la hoja de datos oficial.

### 10.3 Conector de antena externa { #103-external-antenna-connector }

En los SKU que admiten una antena externa, el módulo puede utilizar una conexión RF con semiorificios metalizados o un conector compatible con IPEX, según el número de pieza.

!!! info "Figura 10-3: Dimensiones del conector de antena externa"
    Esta figura no se reproduce en la guía. Consulte la figura 8-3 de la hoja de datos oficial.

### 10.4 Colocación del módulo en el diseño de PCB { #104-module-placement-in-pcb-design }

Reserve la zona de antena del módulo para que ningún componente, cobre, pista, metal del chasis u otra estructura conductora invada el área de exclusión RF. Utilice la hoja de datos oficial del módulo y la carcasa final del producto como referencia para definir la separación de la antena y validarla.

- Siempre que sea posible, extienda la zona de antena más allá del borde de la placa anfitriona y sitúe el punto de alimentación cerca de dicho borde.
- Si la antena no puede sobresalir del borde de la placa, deje una zona de exclusión amplia (sin planos de cobre, pistas ni componentes) y, cuando sea posible, recorte el material de la placa bajo la antena.
- En el diseño del producto final, evalúe el efecto de la carcasa sobre la antena y realice la validación RF, incluida una prueba final del alcance de comunicación con el producto terminado.

## 11. Manipulación del producto { #11-product-handling }

### 11.1 Condiciones de almacenamiento { #111-storage-conditions }

- Guarde los productos sellados en una bolsa barrera contra la humedad (MBB), a <40 °C / 90 % HR, sin condensación.
- Tras abrir la bolsa de vacío, utilice el módulo dentro del tiempo de exposición especificado por su nivel de sensibilidad a la humedad (MSL); de lo contrario, deberá secarlo en horno antes de una segunda pasada de reflujo.

### 11.2 Descarga electrostática (ESD) { #112-electrostatic-discharge-esd }

Durante el montaje y las pruebas, siga las precauciones estándar de SiFli para manipular módulos sensibles a ESD.

### 11.3 Perfil de reflujo { #113-reflow-profile }

Se recomienda someter el módulo a un único ciclo de reflujo.

!!! info "Figura 11-1: Perfil de temperatura de reflujo recomendado"
    Esta figura no se reproduce en la guía. Consulte la figura 9-1 de la hoja de datos oficial.

### 11.4 Vibración ultrasónica { #114-ultrasonic-vibration }

Evite exponer los módulos SiFli a las vibraciones de equipos de soldadura o limpieza por ultrasonidos. Estas vibraciones pueden entrar en resonancia con los osciladores de cristal internos del módulo, provocar fallos o averías en los cristales y dejarlo inoperativo o degradar su rendimiento.

!!! note
    Antes de liberar las especificaciones del proceso de fabricación, confirme el nivel definitivo de sensibilidad a la humedad, el tiempo de exposición, los límites de ESD y los requisitos de reflujo de SF32LB58-MOD en la sección §9 del [PDF oficial de la hoja de datos](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 12. Documentos relacionados { #12-related-documents }

- [Hoja de datos DS5802-SF32LB58-MOD (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [Introducción al chip SF32LB58x](../../sf32-products/chips/SF32LB58x.md)
- [Guía de diseño de hardware de SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. Historial de revisiones { #13-revision-history }

<div align="center"><em>Tabla 13-1: Historial de revisiones</em></div>

<div align="center" markdown>

| Fecha | Versión | Notas |
| :--- | :-: | :--- |
| 2025 | 0.1 | Versión inicial publicada |

</div>

Esta guía se basa en **DS5802-SF32LB58-MOD V0.1**, la primera revisión publicada. Consulte el PDF oficial para conocer la revisión válida y más reciente.
