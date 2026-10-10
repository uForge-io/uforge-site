---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für das SF32LB58-MOD Bluetooth-MCU-Modul: Stromversorgung, Schnittstellen und PCB-Integrationshinweise."
tags:
    - Hardware
    - Modul
---

# SF32LB58-MOD Hardware-Design-Leitfaden { #sf32lb58-mod-hardware-design-guide }

## 1. Übersicht { #1-overview }

**SF32LB58-MOD** ist ein universell einsetzbares Low-Power-Bluetooth-MCU-Modul auf Basis des SiFli-Chips SF32LB586VDD36. Der Chip enthält einen dreikernigen Arm-Cortex-M33-STAR-MC1-Prozessor mit bis zu 240 MHz. Das Modul ist mit einem 48-MHz-Quarz ausgestattet; ein 32,768-kHz-Quarz ist optional. Je nach Bestellcode ist außerdem HPI-PSRAM, QSPI-NOR/NAND-Flash oder eMMC-Speicher integriert. Das SMD-Modul hat 138 Pins und misst 24 × 24 × 3,1 mm.

Dieser Leitfaden behandelt die Hardware-Integration auf Modulebene: Pindefinitionen, Peripherieschnittstellen, elektrische Eigenschaften, Anforderungen an die Stromversorgung, Referenzschaltpläne, eine Schaltplan-Design-Checkliste, mechanische Abmessungen und PCB-Footprint sowie Anforderungen an die Produkthandhabung. Er basiert auf dem SiFli-Datenblatt **DS5802-SF32LB58-MOD V0.1**.

Für die zugrunde liegende Chip-Architektur (Kerne, Grafik, Speicherarchitektur und Peripherie im Detail) siehe [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) und den [SF32LB58x Hardware-Design-Leitfaden](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Umgang mit Quelle und Abbildungen"
    Dieser Leitfaden folgt **DS5802-SF32LB58-MOD V0.1** für modulspezifische technische Daten. Einige Pinbelegungs-, Schaltplan- und mechanische Zeichnungen im Datenblatt sind Rasterbilder und werden hier referenziert statt neu gezeichnet. Abbildungs- und Tabellennummern unten folgen der auf dieser Website üblichen leitfadeninternen Nummerierung; Bildunterschriften für nicht reproduzierte Diagramme verweisen auf die entsprechende Abbildungsnummer im offiziellen Datenblatt.

## 2. Kurzübersicht des Designs { #2-quick-design-summary }

### 2.1 Modulvarianten { #21-module-variants }

<div align="center"><em>Tabelle 2.1-1: Modulvarianten</em></div>

<div align="center" markdown>

| Modulcode | Flash | PSRAM | Standard-Flash | Temperatur | Abmessungen (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16MB QSPI-NOR | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3,1 |
| SF32LB58-MOD-A128R32N1 | 128MB QSPI-NAND | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3,1 |
| SF32LB58-MOD-E4R32N1 | 4GB eMMC | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3,1 |

</div>

### 2.2 Wichtige Spezifikationen { #22-key-specifications }

<div align="center"><em>Tabelle 2.2-1: Wichtige Spezifikationen</em></div>

<div align="center" markdown>

| Punkt | Spezifikation |
| :--- | :--- |
| Anwendungskerne (HCPU/ACPU) | 2x Arm Cortex-M33 STAR-MC1, bis zu 240MHz |
| Low-Power-Kern (LCPU) | Arm Cortex-M33 STAR-MC1, bis zu 96MHz |
| SRAM | 2176KB (HCPU) + 512KB (ACPU) + 1056KB Retention-SRAM (LCPU) |
| Wireless | Dual-Mode Bluetooth 5.3, abwärtskompatibel mit 4.2/4.1/4.0; unterstützt BLE und Classic Bluetooth |
| Grafik | ePicasso 2.0 + Vivante GCNanoUltraV, bis zu 1024×1024, eZip 2.0, Hardware-JPEG-Codec |
| Audio | 2x 24-Bit-Audio-DAC, 2x 24-Bit-Audio-Sigma-Delta-ADC |
| Speicher | 5x MPI (im Gehäuse integriert + extern), 2x SD/SDIO/eMMC |
| Gehäuse | 138-polig, 24 × 24 × 3,1 mm |
| Stromversorgung | VDD_3V3 (2,97–3,6V), VDD_1V8 (1,7–1,95V), VDDIOA/VDDIOA2/VDDIOB (1,7–3,6V) |
| Antenne | Externe Antenne über eine Stempelloch-HF-Zuführung oder einen IPEX-kompatiblen Steckverbinder, je nach Teilenummer |
| Betriebstemperatur | -40 bis 85°C |

</div>

## 3. Funktionsblockschaltbild { #3-functional-block-diagram }

Das Modul integriert den Chip SF32LB586VDD36, einen 48MHz-Quarz, einen optionalen 32,768kHz-Quarz sowie – je nach SKU – im Gehäuse integrierten HPI-PSRAM, QSPI-NOR/NAND-Flash oder eMMC, zusammen mit dem HF-Anpassnetzwerk und der Antennenzuführung.

!!! info "Abbildung 3-1: Funktionsblockschaltbild"
    Siehe Abbildung 2-1 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

## 4. Pindefinition { #4-pin-definition }

### 4.1 Pinbelegungsdiagramm { #41-pinout-diagram }

Das Modul führt 138 Pins entlang seines Umfangs heraus.

!!! info "Abbildung 4-1: Pinbelegungsdiagramm, Draufsicht"
    Siehe Abbildung 3-1 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

### 4.2 Pindefinitionstabelle { #42-pin-definition-table }

Das Modul verfügt über insgesamt 138 Pins, die in der folgenden Tabelle beschrieben sind.

<div align="center"><em>Tabelle 4.2-1: Pindefinitionstabelle</em></div>

<div align="center" markdown>

| Name | Nr. | Typ | Standard-MUX | Standard-I/O | Funktion |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1,8/3,3V | P | PB-Schnittstellen-IO-Stromversorgungseingang |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: Download-Modus; 0: Anwendermodus |
| RSTN | 12 | I | RSTN | I | 1: Anwendermodus; 0: Reset-Modus |
| VDD_1V8 | 13 | P | 1,8V | P | Stromversorgungseingang für Haupt-MCU und im Gehäuse integrierten Speicher |
| GND | 14 | P | Masse | P | Masse |
| VDDIOA | 15 | P | 1,8/3,3V | P | PA-Schnittstellen-IO-Stromversorgungseingang, ausgenommen PA00–PA11 |
| VDD_3V3 | 16 | P | 3,3V | P | MCU-Analog-Stromversorgungseingang |
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
| VDDIOA2 | 45 | P | 1,8/3,3V | P | PA00–PA11 IO-Stromversorgungseingang |
| GND | 46 | P | Masse | P | Masse |
| DSI_D0N | 47 | O | DSI_D0N | O | MIPI-DSI-Datenleitung 0, negativ |
| DSI_D0P | 48 | O | DSI_D0P | P | MIPI-DSI-Datenleitung 0, positiv |
| DSI_CLKN | 49 | O | DSI_CLKN | P | MIPI-DSI-Taktleitung, negativ |
| DSI_CLKP | 50 | O | DSI_CLKP | P | MIPI-DSI-Taktleitung, positiv |
| DSI_D1N | 51 | O | DSI_D1N | P | MIPI-DSI-Datenleitung 1, negativ |
| DSI_D1P | 52 | O | DSI_D1P | P | MIPI-DSI-Datenleitung 1, positiv |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | USB-Differenzsignal, negativ |
| USB2_DP | 56 | I/O | USB2_DP | I/O | USB-Differenzsignal, positiv |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Masse | P | Masse |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Audio-DAC1-Differenzausgang, negativ |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Audio-DAC1-Differenzausgang, positiv |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Mikrofon-Vorspannungsversorgung |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Audio-ADC1-Differenzeingang, negativ |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Audio-ADC1-Differenzeingang, positiv |
| GND | 71 | P | Masse | P | Masse |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Bluetooth-HF-Signal Ein-/Ausgang |
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
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Audio-DAC2-Differenzausgang, negativ |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Audio-DAC2-Differenzausgang, positiv |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Audio-ADC2-Differenzeingang, negativ |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Audio-ADC2-Differenzeingang, positiv |
| GND | 133–138 | P | Masse | P | Masse (6 Pins) |

</div>

*Legende: P = Stromversorgung; I = Eingang; O = Ausgang; T = kann als hochohmig konfiguriert werden; AO = Audioausgang; AI = Audioeingang.*

!!! note
    Pin 2 (USART_RXD) und Pin 3 (USART_TXD) sind der Standard-Log-, Programm-Debug- und Programm-Download-Port.

### 4.3 Physische Pinbeschreibung { #43-physical-pin-description }

Die physische Pinbeschreibung im Datenblatt gruppiert Pins nach Funktionsfamilie — SDIO, SPI, I2C, UART, GPTIM, LCD-Schnittstelle (DPI/8080/SPI/JDI/DSI), GPADC, MPI, analoge Audioschaltung, Boot-Modus, Stromversorgung, BT-Antenne, CAN/USB und SWD/Debug-UART — überlagert über den Chip-Umriss des SF32LB586VDD36. Verwenden Sie sie zusammen mit der obigen Pindefinitionstabelle beim Layout der Signalgruppen auf der Host-Platine.

!!! info "Abbildung 4-2: Physische Pinbeschreibung"
    Siehe Abbildung 3-2 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

## 5. Peripherie { #5-peripherals }

### 5.1 Kommunikationsschnittstellen { #51-communication-interfaces }

Jeder in der obigen Tabelle mit `PAxx_I2C_UART` oder `PBxx_I2C_UART` markierte Pin kann entweder als I2C oder UART konfiguriert werden. Der Chip unterstützt insgesamt bis zu 7 I2C-Schnittstellen und 6 UART-Schnittstellen.

**UART** — Vollduplex, bis zu 6Mbps Baudrate, konfigurierbares Datenformat, Hardware-Flusssteuerung (CTS/RTS), DMA-Mehrfachpaket-TX/RX. UART1–3 befinden sich auf HPSYS; UART4–6 befinden sich auf LPSYS.

**I2C** — Unterstützt Master- und Slave-Betrieb, einen 8-Byte-FIFO, DMA, Standard- (100kbps), Fast- (400kbps), Fast-Mode-Plus- (1Mbps) und High-Speed-Modus (3,4Mbps), 7-Bit-/10-Bit-Adressierung als Master, Clock-Stretching sowie einen konfigurierbaren digitalen Entprellfilter. I2C1–4 befinden sich auf HPSYS; I2C5–7 befinden sich auf LPSYS.

**SPI** — Unterstützt SSP/SPI-Format (Vollduplex, Master oder Slave) und Microwire-Format (Halbduplex, nur Master), 4–32-Bit-Datenbreite, konfigurierbare Taktpolarität/-phase, konfigurierbare Chip-Select-Polarität, 32-Bit × 16-Einträge-FIFO, DMA-Unterstützung. SPI1/2 befinden sich auf HPSYS (max. 48MHz); SPI3/4 befinden sich auf LPSYS (max. 24MHz).

**USB2.0 HS** — Ein High-Speed-Host-/Device-Port, USB2.0-konform, konfigurierbare Endpunkte, Suspend/Resume, Unterstützung für Session-Request und Host-Negotiation-Protokoll, Unterstützung für High-Speed- und Full-Speed-Modus.

**MPI (Memory Peripheral Interface)** — Unterstützt SPI-NOR-Flash (1/2/4-Leitungen, DTR-Modus) und SPI-NAND-Flash (1/2/4-Leitungen), Register-Modus- und Memory-Mapped-Modus-Zugriff mit automatischer Hardware-Umschaltung. Die MPI4-Schnittstelle des Moduls kann externen SPI-NOR-/NAND-Flash anschließen.

**SD/SDIO/eMMC** — Konform mit SD 3.0 und eMMC 4.5.1; fungiert als Host-Controller mit verketteter DMA und einem 1KB-FIFO. Unterstützt SDSC-/SDHC-/SDXC-/SDHS-Karten, UHS-1 (SDR12/25/50/104/DDR50), Einzelleitungs-/4-Leitungs-/8-Leitungs-SDR-Modi sowie 4-Leitungs-/8-Leitungs-DDR-Modi.

**I2S** — Nur Master, Vollduplex, linksbündige/rechtsbündige/Standardformate, 8-Bit und 16-Bit Mono/Stereo, bis zu 24-Bit-PCM-Breite.

**LCD-Schnittstelle** — DBI-serieller SPI-Modus (3-Leitungen/4-Leitungen, duale/quad Datenleitung) und paralleler 8080-Modus (8/16/24-Bit-Busbreite). Unterstützt die Farbformate RGB332/RGB444/RGB565/RGB666/RGB888 je nach Modus. Ein dedizierter MIPI-DSI-Leitungssatz (Takt + 2 Datenleitungen) ist ebenfalls an den Pins 47–52 verfügbar.

### 5.2 Analoge Signalverarbeitung { #52-analog-signal-processing }

**12-Bit-GPADC** — SAR-ADC, maximale Abtastrate 4MS/s, Eingangsbereich 0–3,3V single-ended / ±2,1V differentiell, 8 single-ended Kanäle (oder 4 differentielle Paare), Einzel-/Dauermessmodi, 4 konfigurierbare Zeitschlitze pro Messung, Software-/Hardware-Trigger, DMA-Unterstützung.

**Temperatursensor** — 0,2°C Auflösung, Bereich -40°C bis 125°C, ±3°C Genauigkeit, Polling- oder Interrupt-Auslesung.

**Audio-DAC** — 2 integrierte 24-Bit-Kanäle, 8kHz–48kHz Abtastraten, Differenzausgang.

**Audio-PLL** — Fraktional-N-Takterzeugung mit 48MHz/2^18-Auflösung, unterstützt 48MHz, 32,768kHz und 44,1kHz abgeleitete Abtastraten.

**Audio-ADC** — 2 integrierte 24-Bit-Kanäle, 8kHz–48kHz Abtastraten, unabhängige Verstärkungsregelung pro Kanal.

## 6. Elektrische Eigenschaften { #6-electrical-characteristics }

### 6.1 Absolute Grenzwerte { #61-absolute-maximum-ratings }

<div align="center"><em>Tabelle 6.1-1: Absolute Grenzwerte</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3,3V-Versorgungseingang | -0,3 | 3,6 | V |
| VDD_1V8 | 1,8V-Versorgungseingang | -0,3 | 1,95 | V |
| VDDIO | I/O-Versorgungseingang | -0,3 | 3,6 | V |
| Tstore | Lagertemperatur | -40 | 125 | °C |

</div>

### 6.2 Empfohlene Betriebsbedingungen { #62-recommended-operating-conditions }

<div align="center"><em>Tabelle 6.2-1: Empfohlene Betriebsbedingungen</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3,3V-Versorgungseingang | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | 1,8V-Versorgungseingang | 1,7 | 1,8 | 1,95 | V |
| VDDIO | I/O-Versorgungseingang | 1,7 | - | 3,6 | V |
| TA | Betriebstemperatur | -40 | - | 85 | °C |

</div>

### 6.3 Gleichstrom-Kennwerte { #63-dc-electrical-characteristics }

<div align="center"><em>Tabelle 6.3-1: Gleichstrom-Kennwerte (3,3V, 25°C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin-Kapazität | 2,5 | 3 | 3,5 | pF |
| VIH | Eingang High-Spannung | 0,7×VDD | - | VDD | V |
| VIL | Eingang Low-Spannung | VSS | - | 0,3×VDD | V |
| VOH | Ausgang High-Spannung (hochohmige Last) | 0,8×VDD | - | VDD | V |
| VOL | Ausgang Low-Spannung (hochohmige Last) | VSS | - | 0,2×VDD | V |
| IOH | Ausgang High-Treiberstrom | 24 | 30 | 38 | mA |
| IOL | Ausgang Low-Treiberstrom | 24 | 30 | 38 | mA |
| RPU / RPD | Interner Pull-up/Pull-down | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Tabelle 6.3-2: Gleichstrom-Kennwerte (1,8V, 25°C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Ausgang High-Treiberstrom | 8 | 10 | 13 | mA |
| IOL | Ausgang Low-Treiberstrom | 8 | 10 | 13 | mA |
| RPU / RPD | Interner Pull-up/Pull-down | 10 | 17 | 30 | kΩ |

</div>

Vollständige Tabellen (einschließlich Eingangsleckstrom, Reset-Schwellenwerten und Pin-Kapazität bei beiden Versorgungsspannungen) sind in §5.3 des offiziellen Datenblatts enthalten.

### 6.4 Stromaufnahme { #64-power-consumption }

<div align="center"><em>Tabelle 6.4-1: BLE-Strom (0dBm Sendeleistung)</em></div>

<div align="center" markdown>

| Symbol | Bedingung | @1,8V | @3,8V | Einheit |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | TX-Leistung = 0dBm | 4,19 | 2,21 | mA |
| I∆RX | — | 4,03 | 2,12 | mA |

</div>

<div align="center"><em>Tabelle 6.4-2: BLE/Classic-BT-Durchschnittsstrom (3,8V-Versorgung)</em></div>

<div align="center" markdown>

| Modus | Intervall | @0dBm | @10dBm | Einheit |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 146,4 | 178,6 | µA |
| BT Sniff (attempt=1) | 1s | 7,3 | 8,9 | µA |
| BLE ADV | 50ms | 166,9 | 251,8 | µA |
| BLE ADV | 1s | 8,3 | 12,6 | µA |
| BLE Connection | 50ms | 128,8 | 148,4 | µA |
| BLE Connection | 1s | 6,4 | 7,4 | µA |
| Standby | — | 4,2 | — | µA |

</div>

<div align="center"><em>Tabelle 6.4-3: Prozessorleistung (HPSYS/LPSYS, 3,8V-Versorgung)</em></div>

<div align="center" markdown>

| Symbol | Bedingung | Strom (mA) | Zuwachs (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240MHz | 10,34 | 31,3 |
| ICoreMark | LPSYS @48MHz | 0,89 | 27,6 |
| IWhileLoop | HPSYS @240MHz | 7,98 | 21,3 |
| IWhileLoop | LPSYS @48MHz | 0,67 | 18,7 |

</div>

### 6.5 Dual-Mode-Bluetooth-HF-Leistung { #65-dual-mode-bluetooth-rf-performance }

Unterstützt Bluetooth 5.3 und ist abwärtskompatibel mit 4.2/4.1/4.0. Unterstützt werden BLE und Classic Bluetooth. Betriebskanal-Mittenfrequenz: 2402–2480MHz.

**BLE-Sender (1Mbps)**: max. Leistung 19dBm, Leistungsregelbereich -20 bis 19dBm.

**BLE-Empfänger**: Typische Empfindlichkeit: -100dBm (1Mbps), -97dBm (2Mbps), -104,5dBm (LR S2/500kbps) und -107,5dBm (LR S8/125kbps), gemessen mit 37-Byte-Paketen bei 30,8% PER unter Dirty-Off-Bedingungen.

**Classic BT (Basic Data Rate)**: max. Sendeleistung 19dBm; Empfängerempfindlichkeit -96,3dBm (Dirty Off) / -94dBm (Dirty On) @0,1% BER.

**Classic BT (Enhanced Data Rate)**: max. Sendeleistung 13dBm; π/4-DQPSK-Empfängerempfindlichkeit -95,5dBm; 8DPSK-Empfängerempfindlichkeit -88,5dBm.

Vollständige Min/Typ/Max-Tabellen für alle BLE 1Mbps/2Mbps/LR-TX/RX-Leistungswerte und Classic-BT-BR/EDR-TX/RX-Leistungswerte sind in §5.5 des offiziellen Datenblatts enthalten.

## 7. Modul-Stromversorgung { #7-module-power-supply }

Das Modul verfügt über fünf Stromversorgungsschnittstellen: **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2** und **VDDIOB**.

- **VDD_3V3** versorgt die Schienen AVDD33_ANA, AVDD33_AUD, AVDD_USB des Chips sowie die VDD-Versorgung des im Gehäuse integrierten eMMC des Moduls (sofern bestückt). Eine LDO-Versorgung wird empfohlen.
- **VDD_1V8** versorgt die Schienen PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI des Chips sowie den im Gehäuse integrierten Speicher.
- **VDDIOA** versorgt die VDDIOA-Schiene des Chips, die VIO-Versorgung des im Gehäuse integrierten eMMC (sofern bestückt) sowie externen Flash.
- **VDDIOA2** versorgt die VDDIOA2-Schiene des Chips (deckt PA00–PA11 ab).
- **VDDIOB** versorgt die VDDIOB-Schiene des Chips.

!!! info "Abbildung 7-1: Blockschaltbild der Modul-Stromversorgung"
    Siehe Abbildung 7-1 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

## 8. Referenzschaltplan und Pinbelegung { #8-reference-schematic-and-pin-assignment }

Das Datenblatt enthält einen vollständigen Referenzschaltplan für ein Entwicklungsboard auf Basis von SF32LB58-MOD, der Stromversorgung, Reset, JTAG/SWD, UART, SDIO, LCD, MIPI DSI und Audioschaltungen abdeckt.

!!! info "Abbildung 8-1: Referenzschaltplan des Entwicklungsboards"
    Siehe Abbildungen 7-2–7-8 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

Das Datenblatt enthält außerdem eine empfohlene Pinbelegungstabelle für dieses Referenzboard, einschließlich Raspberry-Pi-artiger Header-Zuordnungen für die Display-Optionen LCD_DPI_24, LCD_DSI, LCD_QSPI und LCD_8080.

!!! info "Abbildung 8-2: Empfohlene Pinbelegung für das Referenzboard"
    Siehe Abbildung 7-9 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

Verwenden Sie diese als Ausgangspunkt für einen Produktionsschaltplan und passen Sie die Pinauswahl an den spezifischen Peripherie-Mix Ihres Produkts an.

## 9. Schaltplan-Design-Checkliste { #9-schematic-design-checklist }

<div align="center"><em>Tabelle 9-1: Schaltplan-Design-Checkliste</em></div>

<div align="center" markdown>

| # | Prüfpunkt |
| :-: | :--- |
| 1 | Der VDD_3V3-Eingangsspannungsbereich muss 2,97V–3,6V betragen; einen 4,7µF-Kondensator nahe am Modulpin platzieren. |
| 2 | Der VDD_1V8-Eingangsspannungsbereich muss 1,7V–1,95V betragen; einen 4,7µF-Kondensator nahe am Modulpin platzieren. |
| 3 | Der Eingangsspannungsbereich von VDDIOA, VDDIOA2 und VDDIOB muss 1,7V–3,6V betragen; Kondensatoren nahe an den Modulpins platzieren. |

</div>

!!! note
    Dieser Leitfaden enthält nur die drei oben aufgeführten Prüfpunkte. Lesen Sie vor der Freigabe des Produktionsschaltplans die vollständige Checkliste in §7.3 des [offiziellen Datenblatt-PDFs](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 10. Modulabmessungen und PCB-Footprint { #10-module-dimensions-and-pcb-footprint }

### 10.1 Modulabmessungen { #101-module-dimensions }

Das Modul misst 24 × 24 × 3,1 mm.

!!! info "Abbildung 10-1: Modulabmessungen"
    Siehe Abbildung 8-1 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

### 10.2 Empfohlener PCB-Footprint { #102-recommended-pcb-footprint }

!!! info "Abbildung 10-2: Empfohlener PCB-Footprint"
    Siehe Abbildung 8-2 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

### 10.3 Externer Antennenanschluss { #103-external-antenna-connector }

Für SKUs, die eine externe Antenne unterstützen, kann das Modul je nach Teilenummer eine Stempelloch-HF-Zuführung oder einen IPEX-kompatiblen Steckverbinder verwenden.

!!! info "Abbildung 10-3: Abmessungen des externen Antennenanschlusses"
    Siehe Abbildung 8-3 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

### 10.4 Modulplatzierung im PCB-Design { #104-module-placement-in-pcb-design }

Reservieren Sie die Antennenzone des Moduls so, dass keine Bauteile, Kupferflächen, Leiterbahnen, Gehäusemetall oder andere leitfähige Strukturen die HF-Sperrzone überlappen. Verwenden Sie das offizielle Modul-Datenblatt und das endgültige Produktgehäuse als Referenz für Antennenfreiraum und -validierung.

- Erweitern Sie den Antennenbereich nach Möglichkeit über den Rand der Host-Platine hinaus, mit dem Speisepunkt nahe am Platinenrand.
- Falls sich die Antenne nicht über den Platinenrand hinaus erstrecken kann, sehen Sie eine großzügige Sperrzone vor (keine Kupferfläche, Leiterbahnen oder Bauteile) und entfernen Sie nach Möglichkeit Host-Platinenmaterial unterhalb der Antenne.
- Bewerten Sie für vollständige Enddesigns die Auswirkung des Gehäuses auf die Antenne und führen Sie eine HF-Validierung durch, einschließlich eines abschließenden Kommunikationsreichweitentests am fertigen Produkt.

## 11. Produkthandhabung { #11-product-handling }

### 11.1 Lagerbedingungen { #111-storage-conditions }

- Produkte versiegelt in einer Feuchtigkeitsschutzverpackung (MBB) bei <40°C / 90% RH, nicht kondensierend lagern.
- Nach dem Öffnen des Vakuumbeutels das Modul innerhalb des für seine Feuchtigkeitsempfindlichkeitsstufe (MSL) angegebenen Standzeitfensters verwenden; andernfalls muss es vor einem zweiten Reflow-Durchlauf getrocknet (gebacken) werden.

### 11.2 Elektrostatische Entladung (ESD) { #112-electrostatic-discharge-esd }

Befolgen Sie während Montage und Test SiFlis Standard-Vorsichtsmaßnahmen zur ESD-Handhabung von Modulen.

### 11.3 Reflow-Profil { #113-reflow-profile }

Für das Modul wird empfohlen, den Reflow-Prozess nur einmal zu durchlaufen.

!!! info "Abbildung 11-1: Empfohlenes Reflow-Temperaturprofil"
    Siehe Abbildung 9-1 im offiziellen Datenblatt für dieses Diagramm — in diesem Leitfaden nicht reproduziert.

### 11.4 Ultraschallvibration { #114-ultrasonic-vibration }

Vermeiden Sie es, SiFli-Module Vibrationen durch Ultraschallschweiß- oder Ultraschallreinigungsgeräte auszusetzen. Ultraschallvibration kann mit den internen Quarzoszillatoren des Moduls in Resonanz treten, was zu Quarzausfall oder Fehlfunktion führen und das Modul funktionsunfähig machen oder seine Leistung beeinträchtigen kann.

!!! note
    Bestätigen Sie vor der Freigabe der Fertigungsprozessspezifikationen die endgültige Feuchtigkeitsempfindlichkeitsstufe, das Standzeitfenster, die ESD-Grenzwerte und die Reflow-Anforderungen für SF32LB58-MOD anhand von §9 des [offiziellen Datenblatt-PDFs](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 12. Zugehörige Dokumente { #12-related-documents }

- [DS5802-SF32LB58-MOD Datenblatt (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [SF32LB58x Chip-Einführung](../../sf32-products/chips/SF32LB58x.md)
- [SF32LB58x Hardware-Design-Leitfaden](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. Revisionshistorie { #13-revision-history }

<div align="center"><em>Tabelle 13-1: Revisionshistorie</em></div>

<div align="center" markdown>

| Datum | Version | Anmerkungen |
| :--- | :-: | :--- |
| 2025 | 0.1 | Erste veröffentlichte Version |

</div>

Dieser Leitfaden basiert auf **DS5802-SF32LB58-MOD V0.1**, der ersten veröffentlichten Revision. Die maßgebliche und aktuellste Revision entnehmen Sie bitte dem offiziellen PDF.
