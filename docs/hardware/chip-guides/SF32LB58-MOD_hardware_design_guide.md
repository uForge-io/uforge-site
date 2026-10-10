---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware design guide for the SF32LB58-MOD Bluetooth MCU module: power, interfaces, and PCB integration guidance."
tags:
    - Hardware
    - Module
---

# SF32LB58-MOD Hardware Design Guide

## 1. Overview

**SF32LB58-MOD** is a general-purpose, low-power Bluetooth MCU module built around SiFli's SF32LB586VDD36 chip, which integrates a triple-core Arm Cortex-M33 STAR-MC1 processor running at up to 240 MHz. The module includes a 48 MHz crystal and an optional 32.768 kHz crystal. Depending on the SKU, it also includes HPI-PSRAM, QSPI-NOR/NAND Flash, or eMMC storage. The surface-mount module has 138 pins and measures 24 × 24 × 3.1 mm.

This guide covers module-level hardware integration: pin definitions, peripheral interfaces, electrical characteristics, power-supply requirements, reference schematics, a schematic design checklist, mechanical dimensions and PCB footprint, and product handling requirements. It is based on SiFli datasheet **DS5802-SF32LB58-MOD V0.1**.

For the underlying chip architecture (cores, graphics, memory subsystem, and peripherals in more depth), see [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) and the [SF32LB58x Hardware Design Guide](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Source and figure handling"
    This guide follows **DS5802-SF32LB58-MOD V0.1** for module-specific technical data. Some pinout, schematic, and mechanical drawings in the datasheet are raster images and are referenced rather than redrawn here. Figure and table numbers below follow this site's guide-local numbering; captions for non-reproduced diagrams cite the corresponding figure number in the official datasheet.

## 2. Quick Design Summary

### 2.1 Module Variants

<div align="center"><em>Table 2.1-1: Module Variants</em></div>

<div align="center" markdown>

| Module Code | Flash | PSRAM | Standard Flash | Temperature | Dimensions (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16MB QSPI-NOR | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-A128R32N1 | 128MB QSPI-NAND | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-E4R32N1 | 4GB eMMC | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |

</div>

### 2.2 Key Specifications

<div align="center"><em>Table 2.2-1: Key Specifications</em></div>

<div align="center" markdown>

| Item | Specification |
| :--- | :--- |
| Application cores (HCPU/ACPU) | 2x Arm Cortex-M33 STAR-MC1, up to 240MHz |
| Low-power core (LCPU) | Arm Cortex-M33 STAR-MC1, up to 96MHz |
| SRAM | 2176KB (HCPU) + 512KB (ACPU) + 1056KB retention SRAM (LCPU) |
| Wireless | Dual-mode Bluetooth 5.3, backward compatible with 4.2/4.1/4.0; supports BLE and Classic Bluetooth |
| Graphics | ePicasso 2.0 + Vivante GCNanoUltraV, up to 1024×1024, eZip 2.0, hardware JPEG codec |
| Audio | 2x 24-bit audio DAC, 2x 24-bit audio Sigma-Delta ADC |
| Storage | 5x MPI (in-package + external), 2x SD/SDIO/eMMC |
| Package | 138-pin, 24 × 24 × 3.1mm |
| Power supply | VDD_3V3 (2.97–3.6V), VDD_1V8 (1.7–1.95V), VDDIOA/VDDIOA2/VDDIOB (1.7–3.6V) |
| Antenna | External antenna through a stamp-hole RF feed or an IPEX-compatible connector, depending on part number |
| Operating temperature | -40 to 85°C |

</div>

## 3. Functional Block Diagram

The module integrates the SF32LB586VDD36 chip, a 48MHz crystal, an optional 32.768kHz crystal, and, depending on SKU, in-package HPI-PSRAM, QSPI-NOR/NAND Flash, or eMMC, alongside the RF matching network and antenna feed.

!!! info "Figure 3-1: Functional Block Diagram"
    See Figure 2-1 in the official datasheet for this diagram — not reproduced in this guide.

## 4. Pin Definition

### 4.1 Pinout Diagram

The module exposes 138 pins around its perimeter.

!!! info "Figure 4-1: Pinout Diagram, Top View"
    See Figure 3-1 in the official datasheet for this diagram — not reproduced in this guide.

### 4.2 Pin Definition Table

The module has 138 pins in total, described in the table below.

<div align="center"><em>Table 4.2-1: Pin Definition Table</em></div>

<div align="center" markdown>

| Name | No. | Type | Default MUX | Default I/O | Function |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1.8/3.3V | P | PB interface IO power input |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: download mode; 0: user mode |
| RSTN | 12 | I | RSTN | I | 1: user mode; 0: reset mode |
| VDD_1V8 | 13 | P | 1.8V | P | Main MCU and in-package memory power input |
| GND | 14 | P | Ground | P | Ground |
| VDDIOA | 15 | P | 1.8/3.3V | P | PA interface IO power input, excluding PA00–PA11 |
| VDD_3V3 | 16 | P | 3.3V | P | MCU analog power input |
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
| VDDIOA2 | 45 | P | 1.8/3.3V | P | PA00–PA11 IO power input |
| GND | 46 | P | Ground | P | Ground |
| DSI_D0N | 47 | O | DSI_D0N | O | MIPI DSI data lane 0, negative |
| DSI_D0P | 48 | O | DSI_D0P | P | MIPI DSI data lane 0, positive |
| DSI_CLKN | 49 | O | DSI_CLKN | P | MIPI DSI clock lane, negative |
| DSI_CLKP | 50 | O | DSI_CLKP | P | MIPI DSI clock lane, positive |
| DSI_D1N | 51 | O | DSI_D1N | P | MIPI DSI data lane 1, negative |
| DSI_D1P | 52 | O | DSI_D1P | P | MIPI DSI data lane 1, positive |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | USB differential signal, negative |
| USB2_DP | 56 | I/O | USB2_DP | I/O | USB differential signal, positive |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Ground | P | Ground |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Audio DAC1 differential output, negative |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Audio DAC1 differential output, positive |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Microphone bias voltage |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Audio ADC1 differential input, negative |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Audio ADC1 differential input, positive |
| GND | 71 | P | Ground | P | Ground |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Bluetooth RF signal input/output |
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
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Audio DAC2 differential output, negative |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Audio DAC2 differential output, positive |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Audio ADC2 differential input, negative |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Audio ADC2 differential input, positive |
| GND | 133–138 | P | Ground | P | Ground (6 pins) |

</div>

*Legend: P = power; I = input; O = output; T = can be configured as high-impedance; AO = audio output; AI = audio input.*

!!! note
    Pin 2 (USART_RXD) and pin 3 (USART_TXD) are the default log, program-debug, and program-download port.

### 4.3 Physical Pin Description

The datasheet's physical pin description figure groups pins by function family — SDIO, SPI, I2C, UART, GPTIM, LCD interface (DPI/8080/SPI/JDI/DSI), GPADC, MPI, analog audio, boot mode, power supply, BT antenna, CAN/USB, and SWD/debug UART — overlaid on the SF32LB586VDD36 die outline. Use it alongside the pin definition table above when laying out signal groups on the host PCB.

!!! info "Figure 4-2: Physical Pin Description"
    See Figure 3-2 in the official datasheet for this diagram — not reproduced in this guide.

## 5. Peripherals

### 5.1 Communication Interfaces

Any pin marked `PAxx_I2C_UART` or `PBxx_I2C_UART` in the table above can be configured as either I2C or UART. The chip supports up to 7 I2C interfaces and 6 UART interfaces in total.

**UART** — Full-duplex, up to 6Mbps baud rate, configurable data format, hardware flow control (CTS/RTS), DMA multi-packet TX/RX. UART1–3 are on HPSYS; UART4–6 are on LPSYS.

**I2C** — Supports Master and Slave roles, an 8-byte FIFO, DMA, standard (100kbps), fast (400kbps), fast-mode-plus (1Mbps), and high-speed (3.4Mbps) modes, 7-bit/10-bit Master addressing, clock stretching, and configurable digital deglitch filtering. I2C1–4 are on HPSYS; I2C5–7 are on LPSYS.

**SPI** — Supports SSP/SPI (full duplex, Master or Slave) and Microwire (half duplex, Master only) formats, 4–32-bit data width, configurable clock polarity/phase, configurable chip-select polarity, 32-bit × 16-entry FIFO, DMA support. SPI1/2 are on HPSYS (max 48MHz); SPI3/4 are on LPSYS (max 24MHz).

**USB2.0 HS** — One high-speed Host/Device port, USB2.0-compliant, configurable endpoints, suspend/resume, session request and host negotiation protocol support, high-speed and full-speed mode support.

**MPI (Memory Peripheral Interface)** — Supports SPI NOR Flash (1/2/4-line, DTR mode) and SPI NAND Flash (1/2/4-line), register-mode and memory-mapped-mode access with automatic hardware switching. The module's MPI4 interface can connect external SPI NOR/NAND Flash.

**SD/SDIO/eMMC** — Compliant with SD 3.0 and eMMC 4.5.1; acts as Host controller with chained DMA and a 1KB FIFO. Supports SDSC/SDHC/SDXC/SDHS cards, UHS-1 (SDR12/25/50/104/DDR50), single-line/4-line/8-line SDR modes, and 4-line/8-line DDR modes.

**I2S** — Master-only, full-duplex, left-justified/right-justified/standard formats, 8-bit and 16-bit mono/stereo, up to 24-bit PCM width.

**LCD Interface** — DBI serial SPI mode (3-line/4-line, dual/quad data line) and parallel 8080 mode (8/16/24-bit bus width). Supports RGB332/RGB444/RGB565/RGB666/RGB888 color formats depending on mode. A dedicated MIPI DSI lane set (clock + 2 data lanes) is also available on pins 47–52.

### 5.2 Analog Signal Processing

**12-bit GPADC** — SAR ADC, 4MS/s max sample rate, 0–3.3V single-ended / ±2.1V differential input range, 8 single-ended channels (or 4 differential pairs), single/continuous measurement modes, 4 configurable time-slots per measurement, software/hardware trigger, DMA support.

**Temperature Sensor** — 0.2°C resolution, -40°C to 125°C range, ±3°C accuracy, polling or interrupt read-out.

**Audio DAC** — 2 integrated 24-bit channels, 8kHz–48kHz sample rates, differential output.

**Audio PLL** — Fractional-N clock generation with 48MHz/2^18 resolution, supporting 48MHz, 32.768kHz, and 44.1kHz derived sample rates.

**Audio ADC** — 2 integrated 24-bit channels, 8kHz–48kHz sample rates, independent per-channel gain control.

## 6. Electrical Characteristics

### 6.1 Absolute Maximum Ratings

<div align="center"><em>Table 6.1-1: Absolute Maximum Ratings</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Max | Unit |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3V supply input | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8V supply input | -0.3 | 1.95 | V |
| VDDIO | I/O supply input | -0.3 | 3.6 | V |
| Tstore | Storage temperature | -40 | 125 | °C |

</div>

### 6.2 Recommended Operating Conditions

<div align="center"><em>Table 6.2-1: Recommended Operating Conditions</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3V supply input | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8V supply input | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O supply input | 1.7 | - | 3.6 | V |
| TA | Operating temperature | -40 | - | 85 | °C |

</div>

### 6.3 DC Electrical Characteristics

<div align="center"><em>Table 6.3-1: DC Electrical Characteristics (3.3V, 25°C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin capacitance | 2.5 | 3 | 3.5 | pF |
| VIH | Input high voltage | 0.7×VDD | - | VDD | V |
| VIL | Input low voltage | VSS | - | 0.3×VDD | V |
| VOH | Output high voltage (high-Z load) | 0.8×VDD | - | VDD | V |
| VOL | Output low voltage (high-Z load) | VSS | - | 0.2×VDD | V |
| IOH | Output high drive current | 24 | 30 | 38 | mA |
| IOL | Output low drive current | 24 | 30 | 38 | mA |
| RPU / RPD | Internal pull-up / pull-down | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Table 6.3-2: DC Electrical Characteristics (1.8V, 25°C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Output high drive current | 8 | 10 | 13 | mA |
| IOL | Output low drive current | 8 | 10 | 13 | mA |
| RPU / RPD | Internal pull-up / pull-down | 10 | 17 | 30 | kΩ |

</div>

Full tables (including input leakage, reset thresholds, and pin capacitance at both supply voltages) are provided in §5.3 of the official datasheet.

### 6.4 Power Consumption

<div align="center"><em>Table 6.4-1: BLE Current (0dBm TX Power)</em></div>

<div align="center" markdown>

| Symbol | Condition | @1.8V | @3.8V | Unit |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | TX power = 0dBm | 4.19 | 2.21 | mA |
| I∆RX | — | 4.03 | 2.12 | mA |

</div>

<div align="center"><em>Table 6.4-2: BLE/Classic BT Average Current (3.8V Supply)</em></div>

<div align="center" markdown>

| Mode | Interval | @0dBm | @10dBm | Unit |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 146.4 | 178.6 | µA |
| BT Sniff (attempt=1) | 1s | 7.3 | 8.9 | µA |
| BLE ADV | 50ms | 166.9 | 251.8 | µA |
| BLE ADV | 1s | 8.3 | 12.6 | µA |
| BLE Connection | 50ms | 128.8 | 148.4 | µA |
| BLE Connection | 1s | 6.4 | 7.4 | µA |
| Standby | — | 4.2 | — | µA |

</div>

<div align="center"><em>Table 6.4-3: Processor Power (HPSYS/LPSYS, 3.8V Supply)</em></div>

<div align="center" markdown>

| Symbol | Condition | Current (mA) | Increment (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240MHz | 10.34 | 31.3 |
| ICoreMark | LPSYS @48MHz | 0.89 | 27.6 |
| IWhileLoop | HPSYS @240MHz | 7.98 | 21.3 |
| IWhileLoop | LPSYS @48MHz | 0.67 | 18.7 |

</div>

### 6.5 Dual-Mode Bluetooth RF Performance

Supports Bluetooth 5.3, backward compatible with 4.2/4.1/4.0, including BLE and Classic Bluetooth. Operating channel center frequency: 2402–2480MHz.

**BLE transmitter (1Mbps)**: max power 19dBm, power control range -20 to 19dBm.

**BLE receiver**: typical sensitivity is -100dBm (1Mbps), -97dBm (2Mbps), -104.5dBm (LR S2/500kbps), and -107.5dBm (LR S8/125kbps), measured with 37-byte packets at 30.8% PER under dirty-off conditions.

**Classic BT (Basic Data Rate)**: max transmit power 19dBm; receiver sensitivity -96.3dBm (dirty off) / -94dBm (dirty on) @0.1% BER.

**Classic BT (Enhanced Data Rate)**: max transmit power 13dBm; π/4-DQPSK receiver sensitivity -95.5dBm; 8DPSK receiver sensitivity -88.5dBm.

Full min/typ/max tables for all BLE 1Mbps/2Mbps/LR TX/RX performance and Classic BT BR/EDR TX/RX performance are provided in §5.5 of the official datasheet.

## 7. Module Power Supply

The module has five power interfaces: **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2**, and **VDDIOB**.

- **VDD_3V3** supplies the chip's AVDD33_ANA, AVDD33_AUD, AVDD_USB rails and the module's in-package eMMC VDD (where populated). An LDO supply is recommended.
- **VDD_1V8** supplies the chip's PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI rails and the in-package memory.
- **VDDIOA** supplies the chip's VDDIOA rail, the in-package eMMC VIO (where populated), and external Flash.
- **VDDIOA2** supplies the chip's VDDIOA2 rail (covering PA00–PA11).
- **VDDIOB** supplies the chip's VDDIOB rail.

!!! info "Figure 7-1: Module Power-Supply Block Diagram"
    See Figure 7-1 in the official datasheet for this diagram — not reproduced in this guide.

## 8. Reference Schematic and Pin Assignment

The datasheet provides a complete reference schematic for a SF32LB58-MOD-based development board, covering power supply, reset, JTAG/SWD, UART, SDIO, LCD, MIPI DSI, and audio circuits.

!!! info "Figure 8-1: Development Board Reference Schematic"
    See Figures 7-2–7-8 in the official datasheet for this diagram — not reproduced in this guide.

The datasheet also provides a recommended pin-assignment table for that reference board, including Raspberry Pi-style header mappings for LCD_DPI_24, LCD_DSI, LCD_QSPI, and LCD_8080 display options.

!!! info "Figure 8-2: Recommended Pin Assignment for the Reference Board"
    See Figure 7-9 in the official datasheet for this diagram — not reproduced in this guide.

Use these as the starting point for a production schematic and adapt pin selection to your product's specific peripheral mix.

## 9. Schematic Design Checklist

<div align="center"><em>Table 9-1: Schematic Design Checklist</em></div>

<div align="center" markdown>

| # | Check Point |
| :-: | :--- |
| 1 | VDD_3V3 input voltage range must be 2.97V–3.6V; place a 4.7µF capacitor near the module pin. |
| 2 | VDD_1V8 input voltage range must be 1.7V–1.95V; place a 4.7µF capacitor near the module pin. |
| 3 | VDDIOA, VDDIOA2, and VDDIOB input voltage range must be 1.7V–3.6V; place capacitors near the module pins. |

</div>

!!! note
    This guide reproduces only the three checklist items above. Consult §7.3 of the [official datasheet PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) for the complete checklist before finalizing a production schematic.

## 10. Module Dimensions and PCB Footprint

### 10.1 Module Dimensions

The module measures 24 × 24 × 3.1mm.

!!! info "Figure 10-1: Module Dimensions"
    See Figure 8-1 in the official datasheet for this diagram — not reproduced in this guide.

### 10.2 Recommended PCB Footprint

!!! info "Figure 10-2: Recommended PCB Footprint"
    See Figure 8-2 in the official datasheet for this diagram — not reproduced in this guide.

### 10.3 External Antenna Connector

For SKUs supporting an external antenna, the module can use a stamp-hole RF feed or an IPEX-compatible connector, depending on part number.

!!! info "Figure 10-3: External Antenna Connector Dimensions"
    See Figure 8-3 in the official datasheet for this diagram — not reproduced in this guide.

### 10.4 Module Placement in PCB Design

Reserve the module antenna zone so that no components, copper, traces, chassis metal, or other conductive structures overlap the RF keepout area. Use the official module datasheet and the final product enclosure as the reference for antenna clearance and validation.

- Extend the antenna area past the host board edge where possible, with the feed point close to the board edge.
- If the antenna cannot extend past the board edge, provide a generous keepout zone (no copper pour, traces, or components) and cut away host-board material beneath the antenna where possible.
- For full end-product designs, evaluate the enclosure's effect on the antenna and perform RF validation, including a final communication-range test on the finished product.

## 11. Product Handling

### 11.1 Storage Conditions

- Store products sealed in a moisture barrier bag (MBB) at <40°C / 90%RH, non-condensing.
- After opening the vacuum bag, use the module within the floor-life window specified for its moisture sensitivity level (MSL); otherwise it must be baked before a second reflow pass.

### 11.2 Electrostatic Discharge (ESD)

Follow SiFli's standard module ESD handling precautions during assembly and test.

### 11.3 Reflow Profile

The module is recommended to go through reflow only once.

!!! info "Figure 11-1: Recommended Reflow Temperature Profile"
    See Figure 9-1 in the official datasheet for this diagram — not reproduced in this guide.

### 11.4 Ultrasonic Vibration

Avoid exposing SiFli modules to vibration from ultrasonic welding or ultrasonic cleaning equipment. Ultrasonic vibration can resonate with the module's internal crystal oscillators, causing crystal failure or malfunction, and may render the module inoperable or degrade its performance.

!!! note
    Confirm the final moisture sensitivity level, floor-life window, ESD limits, and reflow requirements for SF32LB58-MOD against §9 of the [official datasheet PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) before releasing manufacturing process specifications.

## 12. Related Documents

- [DS5802-SF32LB58-MOD Datasheet (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [SF32LB58x Chip Introduction](../../sf32-products/chips/SF32LB58x.md)
- [SF32LB58x Hardware Design Guide](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. Revision History

<div align="center"><em>Table 13-1: Revision History</em></div>

<div align="center" markdown>

| Date | Version | Notes |
| :--- | :-: | :--- |
| 2025 | 0.1 | Initial published version |

</div>

This guide is based on **DS5802-SF32LB58-MOD V0.1**, the initial published revision. Refer to the official PDF for the authoritative and most current revision.
