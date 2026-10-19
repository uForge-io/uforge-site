---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle pour le module MCU Bluetooth SF32LB58-MOD : alimentation, interfaces et intégration PCB."
tags:
    - Matériel
    - Module
---

# Guide de conception matérielle du SF32LB58-MOD { #sf32lb58-mod-hardware-design-guide }

## 1. Aperçu { #1-overview }

**SF32LB58-MOD** est un module MCU Bluetooth basse consommation à usage général, construit autour de la puce SF32LB586VDD36 de SiFli. Celle-ci intègre un processeur Arm Cortex-M33 STAR-MC1 à trois cœurs, pouvant fonctionner jusqu'à 240 MHz. Le module comprend un quartz 48 MHz ; le quartz 32,768 kHz est proposé en option. Selon la référence, il intègre également de la mémoire HPI-PSRAM, de la Flash QSPI-NOR/NAND ou de l'eMMC. Ce module à montage en surface comporte 138 broches et mesure 24 × 24 × 3,1 mm.

Ce guide couvre l'intégration matérielle au niveau module : définition des broches, interfaces périphériques, caractéristiques électriques, exigences d'alimentation, schémas de référence, liste de contrôle du schéma, dimensions mécaniques, empreinte du PCB et exigences de manipulation du produit. Il s'appuie sur la fiche technique SiFli **DS5802-SF32LB58-MOD V0.1**.

Pour l'architecture sous-jacente de la puce (cœurs, graphisme, sous-système mémoire et périphériques, en détail), voir [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) et le [Guide de conception matérielle SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Source et gestion des figures"
    Ce guide suit **DS5802-SF32LB58-MOD V0.1** pour les données techniques spécifiques au module. Certains schémas de brochage, schémas électriques et dessins mécaniques de la fiche technique sont des images matricielles et sont référencés plutôt que redessinés ici. Les numéros de figure et de tableau ci-dessous suivent la numérotation locale de ce guide sur le site ; les légendes des schémas non reproduits citent le numéro de figure correspondant dans la fiche technique officielle.

## 2. Résumé de conception rapide { #2-quick-design-summary }

### 2.1 Variantes du module { #21-module-variants }

<div align="center"><em>Tableau 2.1-1 : Variantes du module</em></div>

<div align="center" markdown>

| Code du module | Flash | PSRAM | Flash standard | Température | Dimensions (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 Mo QSPI-NOR | 16+16 Mo HPI-PSRAM | 1 Mo QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-A128R32N1 | 128 Mo QSPI-NAND | 16+16 Mo HPI-PSRAM | 1 Mo QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-E4R32N1 | 4 Go eMMC | 16+16 Mo HPI-PSRAM | 1 Mo QSPI-NOR | -40~85 °C | 24 × 24 × 3,1 |

</div>

### 2.2 Spécifications clés { #22-key-specifications }

<div align="center"><em>Tableau 2.2-1 : Spécifications clés</em></div>

<div align="center" markdown>

| Élément | Spécification |
| :--- | :--- |
| Cœurs d'application (HCPU/ACPU) | 2x Arm Cortex-M33 STAR-MC1, jusqu'à 240 MHz |
| Cœur basse consommation (LCPU) | Arm Cortex-M33 STAR-MC1, jusqu'à 96 MHz |
| SRAM | 2176 Ko (HCPU) + 512 Ko (ACPU) + 1056 Ko SRAM de rétention (LCPU) |
| Sans fil | Bluetooth 5.3 bimode, rétrocompatible avec 4.2/4.1/4.0 ; prend en charge BLE et Bluetooth Classic |
| Graphisme | ePicasso 2.0 + Vivante GCNanoUltraV, jusqu'à 1024×1024, eZip 2.0, codec JPEG matériel |
| Audio | 2x DAC audio 24 bits, 2x ADC audio Sigma-Delta 24 bits |
| Stockage | 5x MPI (en boîtier + externe), 2x SD/SDIO/eMMC |
| Boîtier | 138 broches, 24 × 24 × 3,1 mm |
| Alimentation | VDD_3V3 (2,97–3,6 V), VDD_1V8 (1,7–1,95 V), VDDIOA/VDDIOA2/VDDIOB (1,7–3,6 V) |
| Antenne | Antenne externe via un accès RF à demi-trous métallisés (stamp-hole) ou un connecteur compatible IPEX, selon la référence |
| Température de fonctionnement | -40 à 85 °C |

</div>

## 3. Schéma fonctionnel { #3-functional-block-diagram }

Le module intègre la puce SF32LB586VDD36, un quartz 48 MHz, un quartz optionnel 32,768 kHz, et, selon la référence produit, de la mémoire HPI-PSRAM, Flash QSPI-NOR/NAND ou eMMC en boîtier, ainsi que le réseau d'adaptation RF et le point d'alimentation RF de l'antenne.

!!! info "Figure 3-1 : Schéma fonctionnel"
    Voir la Figure 2-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

## 4. Définition des broches { #4-pin-definition }

### 4.1 Schéma de brochage { #41-pinout-diagram }

Le module expose 138 broches sur son pourtour.

!!! info "Figure 4-1 : Schéma de brochage, vue de dessus"
    Voir la Figure 3-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 4.2 Tableau de définition des broches { #42-pin-definition-table }

Le module compte 138 broches au total, décrites dans le tableau ci-dessous.

<div align="center"><em>Tableau 4.2-1 : Tableau de définition des broches</em></div>

<div align="center" markdown>

| Nom | N° | Type | MUX par défaut | E/S par défaut | Fonction |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1,8/3,3 V | P | Entrée d'alimentation E/S de l'interface PB |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1 : mode de téléchargement ; 0 : mode utilisateur |
| RSTN | 12 | I | RSTN | I | 1 : mode utilisateur ; 0 : mode de réinitialisation |
| VDD_1V8 | 13 | P | 1,8 V | P | Entrée d'alimentation du MCU principal et de la mémoire en boîtier |
| GND | 14 | P | Masse | P | Masse |
| VDDIOA | 15 | P | 1,8/3,3 V | P | Entrée d'alimentation E/S de l'interface PA, hors PA00–PA11 |
| VDD_3V3 | 16 | P | 3,3 V | P | Entrée d'alimentation analogique du MCU |
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
| VDDIOA2 | 45 | P | 1,8/3,3 V | P | Entrée d'alimentation E/S PA00–PA11 |
| GND | 46 | P | Masse | P | Masse |
| DSI_D0N | 47 | O | DSI_D0N | O | Voie de données MIPI DSI 0, négative |
| DSI_D0P | 48 | O | DSI_D0P | P | Voie de données MIPI DSI 0, positive |
| DSI_CLKN | 49 | O | DSI_CLKN | P | Voie d'horloge MIPI DSI, négative |
| DSI_CLKP | 50 | O | DSI_CLKP | P | Voie d'horloge MIPI DSI, positive |
| DSI_D1N | 51 | O | DSI_D1N | P | Voie de données MIPI DSI 1, négative |
| DSI_D1P | 52 | O | DSI_D1P | P | Voie de données MIPI DSI 1, positive |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | Signal différentiel USB, négatif |
| USB2_DP | 56 | I/O | USB2_DP | I/O | Signal différentiel USB, positif |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Masse | P | Masse |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Sortie différentielle DAC audio 1, négative |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Sortie différentielle DAC audio 1, positive |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Tension de polarisation du microphone |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Entrée différentielle ADC audio 1, négative |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Entrée différentielle ADC audio 1, positive |
| GND | 71 | P | Masse | P | Masse |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Entrée/sortie du signal RF Bluetooth |
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
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Sortie différentielle DAC audio 2, négative |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Sortie différentielle DAC audio 2, positive |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Entrée différentielle ADC audio 2, négative |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Entrée différentielle ADC audio 2, positive |
| GND | 133–138 | P | Masse | P | Masse (6 broches) |

</div>

*Légende : P = alimentation ; I = entrée ; O = sortie ; T = configurable en haute impédance ; AO = sortie audio ; AI = entrée audio.*

!!! note
    La broche 2 (USART_RXD) et la broche 3 (USART_TXD) constituent le port par défaut pour le journal, le débogage du programme et le téléchargement du programme.

### 4.3 Description physique des broches { #43-physical-pin-description }

La figure de description physique des broches de la fiche technique regroupe les broches par famille fonctionnelle — SDIO, SPI, I2C, UART, GPTIM, interface LCD (DPI/8080/SPI/JDI/DSI), GPADC, MPI, audio analogique, mode de démarrage, alimentation, antenne BT, CAN/USB, et SWD/UART de débogage — superposée au contour de la puce SF32LB586VDD36. Utilisez-la avec le tableau de définition des broches ci-dessus lors du placement des groupes de signaux sur le PCB hôte.

!!! info "Figure 4-2 : Description physique des broches"
    Voir la Figure 3-2 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

## 5. Périphériques { #5-peripherals }

### 5.1 Interfaces de communication { #51-communication-interfaces }

Toute broche marquée `PAxx_I2C_UART` ou `PBxx_I2C_UART` dans le tableau ci-dessus peut être configurée en I2C ou en UART. La puce prend en charge jusqu'à 7 interfaces I2C et 6 interfaces UART au total.

**UART** — Duplex intégral, débit jusqu'à 6 Mbps, format de données configurable, contrôle de flux matériel (CTS/RTS), TX/RX multi-paquets par DMA. UART1–3 sont sur le HPSYS ; UART4–6 sont sur le LPSYS.

**I2C** — Fonctionne en maître et en esclave, avec une FIFO de 8 octets et la prise en charge du DMA ; modes standard (100 kbps), rapide (400 kbps), Fast-mode Plus (1 Mbps) et haute vitesse (3,4 Mbps) ; adressage 7 bits/10 bits en mode maître ; étirement d'horloge (clock stretching) et filtrage numérique configurable des impulsions parasites (glitchs). I2C1–4 sont sur le HPSYS ; I2C5–7 sont sur le LPSYS.

**SPI** — Prend en charge les formats SSP/SPI (duplex intégral, maître ou esclave) et Microwire (semi-duplex, maître uniquement), largeur de données de 4 à 32 bits, polarité/phase d'horloge configurables, polarité de sélection de puce configurable, FIFO de 32 bits × 16 entrées, prise en charge DMA. SPI1/2 sont sur le HPSYS (48 MHz max) ; SPI3/4 sont sur le LPSYS (24 MHz max).

**USB2.0 HS** — Un port Hôte/Périphérique haute vitesse, conforme USB2.0, points de terminaison configurables, prise en charge de la mise en veille/reprise, du protocole de demande de session et de négociation hôte, prise en charge des modes haute vitesse et pleine vitesse.

**MPI (Memory Peripheral Interface)** — Prend en charge la Flash SPI NOR (1/2/4 lignes, mode DTR) et la Flash SPI NAND (1/2/4 lignes), accès en mode registre et en mode mappé mémoire avec commutation matérielle automatique. L'interface MPI4 du module peut connecter une Flash SPI NOR/NAND externe.

**SD/SDIO/eMMC** — Conforme aux normes SD 3.0 et eMMC 4.5.1 ; fonctionne en contrôleur hôte avec DMA chaîné et FIFO de 1 Ko. Prend en charge les cartes SDSC/SDHC/SDXC/SDHS, l'UHS-1 (SDR12/25/50/104/DDR50), les modes SDR simple ligne/4 lignes/8 lignes, et les modes DDR 4 lignes/8 lignes.

**I2S** — Maître uniquement, duplex intégral, formats justifié à gauche/justifié à droite/standard, mono/stéréo 8 bits et 16 bits, largeur PCM jusqu'à 24 bits.

**Interface LCD** — Mode SPI série DBI (3 lignes/4 lignes, ligne de données double/quadruple) et mode parallèle 8080 (largeur de bus 8/16/24 bits). Prend en charge les formats de couleur RGB332/RGB444/RGB565/RGB666/RGB888 selon le mode. Un jeu de voies MIPI DSI dédié (horloge + 2 voies de données) est également disponible sur les broches 47–52.

### 5.2 Traitement des signaux analogiques { #52-analog-signal-processing }

**GPADC 12 bits** — ADC à approximations successives, taux d'échantillonnage max 4 MS/s, plage d'entrée 0–3,3 V en mode asymétrique / ±2,1 V en mode différentiel, 8 voies asymétriques (ou 4 paires différentielles), modes de mesure unique/continue, 4 créneaux temporels configurables par mesure, déclenchement logiciel/matériel, prise en charge DMA.

**Capteur de température** — Résolution de 0,2 °C, plage -40 °C à 125 °C, précision ±3 °C, lecture par scrutation ou interruption.

**DAC audio** — 2 voies intégrées 24 bits, taux d'échantillonnage 8 kHz–48 kHz, sortie différentielle.

**PLL audio** — Génération d'horloge fractionnaire-N avec une résolution de 48 MHz/2^18, prenant en charge les taux d'échantillonnage dérivés 48 MHz, 32,768 kHz et 44,1 kHz.

**ADC audio** — 2 voies intégrées 24 bits, taux d'échantillonnage 8 kHz–48 kHz, contrôle de gain indépendant par voie.

## 6. Caractéristiques électriques { #6-electrical-characteristics }

### 6.1 Valeurs limites absolues { #61-absolute-maximum-ratings }

<div align="center"><em>Tableau 6.1-1 : Valeurs limites absolues</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Max | Unité |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrée d'alimentation 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrée d'alimentation 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrée d'alimentation E/S | -0,3 | 3,6 | V |
| Tstore | Température de stockage | -40 | 125 | °C |

</div>

### 6.2 Conditions de fonctionnement recommandées { #62-recommended-operating-conditions }

<div align="center"><em>Tableau 6.2-1 : Conditions de fonctionnement recommandées</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrée d'alimentation 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrée d'alimentation 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrée d'alimentation E/S | 1,7 | - | 3,6 | V |
| TA | Température de fonctionnement | -40 | - | 85 | °C |

</div>

### 6.3 Caractéristiques électriques CC { #63-dc-electrical-characteristics }

<div align="center"><em>Tableau 6.3-1 : Caractéristiques électriques CC (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacité de broche | 2,5 | 3 | 3,5 | pF |
| VIH | Tension d'entrée haute | 0,7×VDD | - | VDD | V |
| VIL | Tension d'entrée basse | VSS | - | 0,3×VDD | V |
| VOH | Tension de sortie haute (charge haute impédance) | 0,8×VDD | - | VDD | V |
| VOL | Tension de sortie basse (charge haute impédance) | VSS | - | 0,2×VDD | V |
| IOH | Courant de sortie haute | 24 | 30 | 38 | mA |
| IOL | Courant de sortie basse | 24 | 30 | 38 | mA |
| RPU / RPD | Résistance interne de tirage haut / bas | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Tableau 6.3-2 : Caractéristiques électriques CC (1,8 V, 25 °C)</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Courant de sortie haute | 8 | 10 | 13 | mA |
| IOL | Courant de sortie basse | 8 | 10 | 13 | mA |
| RPU / RPD | Résistance interne de tirage haut / bas | 10 | 17 | 30 | kΩ |

</div>

Les tableaux complets (incluant le courant de fuite d'entrée, les seuils de réinitialisation et la capacité de broche aux deux tensions d'alimentation) figurent au §5.3 de la fiche technique officielle.

### 6.4 Consommation électrique { #64-power-consumption }

<div align="center"><em>Tableau 6.4-1 : Courant BLE (puissance TX 0 dBm)</em></div>

<div align="center" markdown>

| Symbole | Condition | @1,8 V | @3,8 V | Unité |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | Puissance TX = 0 dBm | 4,19 | 2,21 | mA |
| I∆RX | — | 4,03 | 2,12 | mA |

</div>

<div align="center"><em>Tableau 6.4-2 : Courant moyen BLE/BT Classic (alimentation 3,8 V)</em></div>

<div align="center" markdown>

| Mode | Intervalle | @0 dBm | @10 dBm | Unité |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 146,4 | 178,6 | µA |
| BT Sniff (attempt=1) | 1 s | 7,3 | 8,9 | µA |
| BLE ADV | 50 ms | 166,9 | 251,8 | µA |
| BLE ADV | 1 s | 8,3 | 12,6 | µA |
| BLE Connection | 50 ms | 128,8 | 148,4 | µA |
| BLE Connection | 1 s | 6,4 | 7,4 | µA |
| Standby | — | 4,2 | — | µA |

</div>

<div align="center"><em>Tableau 6.4-3 : Puissance des processeurs (HPSYS/LPSYS, alimentation 3,8 V)</em></div>

<div align="center" markdown>

| Symbole | Condition | Courant (mA) | Incrément (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240 MHz | 10,34 | 31,3 |
| ICoreMark | LPSYS @48 MHz | 0,89 | 27,6 |
| IWhileLoop | HPSYS @240 MHz | 7,98 | 21,3 |
| IWhileLoop | LPSYS @48 MHz | 0,67 | 18,7 |

</div>

### 6.5 Performances RF Bluetooth bimode { #65-dual-mode-bluetooth-rf-performance }

Prend en charge Bluetooth 5.3, rétrocompatible avec les versions 4.2/4.1/4.0, ainsi que BLE et Bluetooth Classic. Fréquence centrale des canaux de fonctionnement : 2402–2480 MHz.

**Émetteur BLE (1 Mbps)** : puissance max 19 dBm, plage de contrôle de puissance -20 à 19 dBm.

**Récepteur BLE** : sensibilité typique de -100 dBm (1 Mbps), -97 dBm (2 Mbps), -104,5 dBm (LR S2/500 kbps) et -107,5 dBm (LR S8/125 kbps), mesurée avec des paquets de 37 octets, un PER de 30,8 % et en condition « dirty-off ».

**BT Classic (Basic Data Rate)** : puissance d'émission max 19 dBm ; sensibilité du récepteur -96,3 dBm (dirty off) / -94 dBm (dirty on) @0,1 % BER.

**BT Classic (Enhanced Data Rate)** : puissance d'émission max 13 dBm ; sensibilité du récepteur π/4-DQPSK -95,5 dBm ; sensibilité du récepteur 8DPSK -88,5 dBm.

Les tableaux complets min/typ/max pour toutes les performances TX/RX BLE 1 Mbps/2 Mbps/LR et TX/RX BT Classic BR/EDR figurent au §5.5 de la fiche technique officielle.

## 7. Alimentation du module { #7-module-power-supply }

Le module dispose de cinq interfaces d'alimentation : **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2** et **VDDIOB**.

- **VDD_3V3** alimente les rails AVDD33_ANA, AVDD33_AUD, AVDD_USB de la puce ainsi que l'alimentation VDD de l'eMMC en boîtier du module (le cas échéant). Une alimentation par LDO est recommandée.
- **VDD_1V8** alimente les rails PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI de la puce ainsi que la mémoire en boîtier.
- **VDDIOA** alimente le rail VDDIOA de la puce, l'alimentation VIO de l'eMMC en boîtier (le cas échéant), et la Flash externe.
- **VDDIOA2** alimente le rail VDDIOA2 de la puce (couvrant PA00–PA11).
- **VDDIOB** alimente le rail VDDIOB de la puce.

!!! info "Figure 7-1 : Schéma fonctionnel de l'alimentation du module"
    Voir la Figure 7-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

## 8. Schéma de référence et affectation des broches { #8-reference-schematic-and-pin-assignment }

La fiche technique fournit un schéma de référence complet pour une carte de développement basée sur le SF32LB58-MOD, couvrant l'alimentation, la réinitialisation, le JTAG/SWD, l'UART, le SDIO, le LCD, le MIPI DSI et les circuits audio.

!!! info "Figure 8-1 : Schéma de référence de la carte de développement"
    Voir les Figures 7-2–7-8 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

La fiche technique fournit également un tableau d'affectation de broches recommandé pour cette carte de référence, incluant les correspondances de connecteurs de type Raspberry Pi pour les options d'affichage LCD_DPI_24, LCD_DSI, LCD_QSPI et LCD_8080.

!!! info "Figure 8-2 : Affectation de broches recommandée pour la carte de référence"
    Voir la Figure 7-9 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

Utilisez ces éléments comme point de départ pour un schéma de production et adaptez la sélection des broches aux périphériques spécifiques de votre produit.

## 9. Liste de contrôle de conception du schéma { #9-schematic-design-checklist }

<div align="center"><em>Tableau 9-1 : Liste de contrôle de conception du schéma</em></div>

<div align="center" markdown>

| # | Point de contrôle |
| :-: | :--- |
| 1 | La plage de tension d'entrée VDD_3V3 doit être de 2,97 V–3,6 V ; placez un condensateur de 4,7 µF près de la broche du module. |
| 2 | La plage de tension d'entrée VDD_1V8 doit être de 1,7 V–1,95 V ; placez un condensateur de 4,7 µF près de la broche du module. |
| 3 | La plage de tension d'entrée VDDIOA, VDDIOA2 et VDDIOB doit être de 1,7 V–3,6 V ; placez des condensateurs près des broches du module. |

</div>

!!! note
    Ce guide ne reprend que les trois points ci-dessus. Consultez la liste complète du §7.3 de la [fiche technique officielle (PDF)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) avant de finaliser un schéma de production.

## 10. Dimensions du module et empreinte du PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensions du module { #101-module-dimensions }

Le module mesure 24 × 24 × 3,1 mm.

!!! info "Figure 10-1 : Dimensions du module"
    Voir la Figure 8-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.2 Empreinte du PCB recommandée { #102-recommended-pcb-footprint }

!!! info "Figure 10-2 : Empreinte du PCB recommandée"
    Voir la Figure 8-2 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.3 Connecteur d'antenne externe { #103-external-antenna-connector }

Pour les références prenant en charge une antenne externe, le module peut utiliser un accès RF à demi-trous métallisés (stamp-hole) ou un connecteur compatible IPEX, selon la référence produit.

!!! info "Figure 10-3 : Dimensions du connecteur d'antenne externe"
    Voir la Figure 8-3 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.4 Placement du module dans la conception du PCB { #104-module-placement-in-pcb-design }

Réservez la zone d'antenne du module de sorte qu'aucun composant, cuivre, piste, châssis métallique ou autre structure conductrice ne chevauche la zone d'exclusion RF. Utilisez la fiche technique officielle du module et l'enveloppe mécanique finale du produit comme référence pour le dégagement de l'antenne et sa validation.

- Étendez la zone d'antenne au-delà du bord de la carte hôte lorsque cela est possible, avec le point d'alimentation proche du bord de la carte.
- Si l'antenne ne peut pas dépasser le bord de la carte, prévoyez une zone d'exclusion généreuse (sans plan de cuivre, piste ni composant) et retirez, si possible, le matériau de la carte hôte sous l'antenne.
- Pour les conceptions de produit final complètes, évaluez l'effet de l'enveloppe mécanique sur l'antenne et effectuez une validation RF, incluant un test final de portée de communication sur le produit fini.

## 11. Manipulation du produit { #11-product-handling }

### 11.1 Conditions de stockage { #111-storage-conditions }

- Stockez les produits scellés dans un sachet barrière anti-humidité (MBB) à < 40 °C / 90 % HR, sans condensation.
- Après ouverture du sachet sous vide, utilisez le module dans la fenêtre de durée de vie hors sachet spécifiée pour son niveau de sensibilité à l'humidité (MSL) ; sinon, il doit être passé à l'étuve avant un second passage au four de refusion.

### 11.2 Décharge électrostatique (ESD) { #112-electrostatic-discharge-esd }

Suivez les précautions standard de manipulation ESD de SiFli pour les modules lors de l'assemblage et des tests.

### 11.3 Profil de refusion { #113-reflow-profile }

Il est recommandé de ne faire passer le module qu'une seule fois au four de refusion.

!!! info "Figure 11-1 : Profil de température de refusion recommandé"
    Voir la Figure 9-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 11.4 Vibrations ultrasoniques { #114-ultrasonic-vibration }

Évitez d'exposer les modules SiFli aux vibrations d'un équipement de soudure ou de nettoyage par ultrasons. Les vibrations ultrasoniques peuvent entrer en résonance avec les oscillateurs à quartz internes du module, provoquant une défaillance ou un dysfonctionnement du quartz, et peuvent rendre le module inopérant ou dégrader ses performances.

!!! note
    Vérifiez le niveau de sensibilité à l'humidité final, la fenêtre de durée de vie hors sachet, les limites ESD et les exigences de refusion pour le SF32LB58-MOD dans le §9 de la [fiche technique officielle (PDF)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) avant de publier les spécifications du processus de fabrication.

## 12. Documents associés { #12-related-documents }

- [Fiche technique DS5802-SF32LB58-MOD (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [Présentation de la puce SF32LB58x](../../sf32-products/chips/SF32LB58x.md)
- [Guide de conception matérielle SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. Historique des révisions { #13-revision-history }

<div align="center"><em>Tableau 13-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Date | Version | Notes |
| :--- | :-: | :--- |
| 2025 | 0.1 | Version initiale publiée |

</div>

Ce guide s'appuie sur **DS5802-SF32LB58-MOD V0.1**, la révision initiale publiée. Reportez-vous au PDF officiel pour la révision faisant autorité et la plus récente.
