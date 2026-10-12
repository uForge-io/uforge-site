---
icon: lucide/book-check
hide:
    - navigation
description: "Guia de projeto de hardware do módulo MCU Bluetooth SF32LB58-MOD: alimentação, interfaces e integração à PCB."
tags:
    - Hardware
    - Módulo
---

# Guia de projeto de hardware do SF32LB58-MOD { #sf32lb58-mod-hardware-design-guide }

## 1. Visão geral { #1-overview }

**SF32LB58-MOD** é um módulo Bluetooth de uso geral e baixo consumo com MCU, baseado no chip SF32LB586VDD36 da SiFli. O chip integra um processador Arm Cortex-M33 STAR-MC1 de três núcleos, com frequência de até 240 MHz. O módulo inclui um cristal de 48 MHz e oferece um cristal de 32,768 kHz como opção. Conforme o SKU, também integra memória HPI-PSRAM, Flash QSPI-NOR/NAND ou eMMC. O módulo de montagem em superfície tem 138 pinos e mede 24 × 24 × 3,1 mm.

Este guia aborda a integração de hardware no nível do módulo: definição de pinos, interfaces de periféricos, características elétricas, requisitos de alimentação, esquemáticos de referência, checklist do esquemático, dimensões mecânicas, footprint da PCB e requisitos de manuseio do produto. O conteúdo se baseia no datasheet da SiFli **DS5802-SF32LB58-MOD V0.1**.

Para obter mais detalhes sobre a arquitetura do chip subjacente (núcleos, gráficos, subsistema de memória e periféricos), consulte [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) e o [Guia de projeto de hardware do SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md).

!!! note "Fonte e tratamento das figuras"
    Os dados técnicos específicos do módulo seguem **DS5802-SF32LB58-MOD V0.1**. Alguns diagramas de pinos, esquemáticos e desenhos mecânicos do datasheet são imagens rasterizadas; este guia os referencia em vez de redesenhá-los. A numeração de figuras e tabelas segue a numeração local deste guia no site; as legendas dos diagramas não reproduzidos indicam o número correspondente no datasheet oficial.

## 2. Resumo do projeto { #2-quick-design-summary }

### 2.1 Variantes do módulo { #21-module-variants }

<div align="center"><em>Tabela 2.1-1: Variantes do módulo</em></div>

<div align="center" markdown>

| Código do módulo | Flash | PSRAM | Flash padrão | Temperatura | Dimensões (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 24 × 24 × 3,1 |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 a 85 °C | 24 × 24 × 3,1 |

</div>

### 2.2 Especificações principais { #22-key-specifications }

<div align="center"><em>Tabela 2.2-1: Especificações principais</em></div>

<div align="center" markdown>

| Item | Especificação |
| :--- | :--- |
| Núcleos de aplicação (HCPU/ACPU) | 2 × Arm Cortex-M33 STAR-MC1, até 240 MHz |
| Núcleo de baixo consumo (LCPU) | Arm Cortex-M33 STAR-MC1, até 96 MHz |
| SRAM | 2.176 KB (HCPU) + 512 KB (ACPU) + 1.056 KB de SRAM de retenção (LCPU) |
| Conectividade sem fio | Bluetooth 5.3 em modo dual, retrocompatível com 4.2/4.1/4.0; compatível com BLE e Bluetooth Classic |
| Gráficos | ePicasso 2.0 + Vivante GCNanoUltraV, resolução de até 1024 × 1024, eZip 2.0 e codec JPEG por hardware |
| Áudio | 2 × DAC de áudio de 24 bits e 2 × ADC Sigma-Delta de áudio de 24 bits |
| Armazenamento | 5 × MPI (no encapsulamento e externo), 2 × SD/SDIO/eMMC |
| Encapsulamento | 138 pinos, 24 × 24 × 3,1 mm |
| Alimentação | VDD_3V3 (2,97–3,6 V), VDD_1V8 (1,7–1,95 V), VDDIOA/VDDIOA2/VDDIOB (1,7–3,6 V) |
| Antena | Antena externa conectada por um ponto de alimentação de RF em furo metalizado castelado ou por um conector compatível com IPEX, conforme o código do módulo |
| Temperatura de operação | -40 a 85 °C |

</div>

## 3. Diagrama funcional de blocos { #3-functional-block-diagram }

O módulo integra o chip SF32LB586VDD36, um cristal de 48 MHz e outro de 32,768 kHz, opcional. Conforme o SKU, também inclui HPI-PSRAM, Flash QSPI-NOR/NAND ou eMMC no encapsulamento, além da rede de casamento de RF e do ponto de alimentação da antena.

!!! info "Figura 3-1: Diagrama funcional de blocos"
    Consulte a Figura 2-1 do datasheet oficial; o diagrama não é reproduzido neste guia.

## 4. Definição dos pinos { #4-pin-definition }

### 4.1 Diagrama de pinagem { #41-pinout-diagram }

O módulo expõe 138 pinos ao longo de seu perímetro.

!!! info "Figura 4-1: Diagrama de pinagem, vista superior"
    Consulte a Figura 3-1 do datasheet oficial; o diagrama não é reproduzido neste guia.

### 4.2 Tabela de definição dos pinos { #42-pin-definition-table }

A tabela a seguir descreve os 138 pinos do módulo.

<div align="center"><em>Tabela 4.2-1: Definição dos pinos</em></div>

<div align="center" markdown>

| Nome | Nº | Tipo | MUX padrão | I/O padrão | Função |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1,8/3,3 V | P | Alimentação de I/O da interface PB |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: modo de download; 0: modo de usuário |
| RSTN | 12 | I | RSTN | I | 1: modo de usuário; 0: modo de reset |
| VDD_1V8 | 13 | P | 1,8 V | P | Alimentação principal do MCU e da memória integrada ao encapsulamento |
| GND | 14 | P | Terra | P | Terra |
| VDDIOA | 15 | P | 1,8/3,3 V | P | Alimentação de I/O da interface PA, exceto PA00–PA11 |
| VDD_3V3 | 16 | P | 3,3 V | P | Alimentação analógica do MCU |
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
| VDDIOA2 | 45 | P | 1,8/3,3 V | P | Alimentação de I/O de PA00–PA11 |
| GND | 46 | P | Terra | P | Terra |
| DSI_D0N | 47 | O | DSI_D0N | O | Lane de dados MIPI DSI 0, negativa |
| DSI_D0P | 48 | O | DSI_D0P | P | Lane de dados MIPI DSI 0, positiva |
| DSI_CLKN | 49 | O | DSI_CLKN | P | Lane de clock MIPI DSI, negativa |
| DSI_CLKP | 50 | O | DSI_CLKP | P | Lane de clock MIPI DSI, positiva |
| DSI_D1N | 51 | O | DSI_D1N | P | Lane de dados MIPI DSI 1, negativa |
| DSI_D1P | 52 | O | DSI_D1P | P | Lane de dados MIPI DSI 1, positiva |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | Sinal diferencial USB, negativo |
| USB2_DP | 56 | I/O | USB2_DP | I/O | Sinal diferencial USB, positivo |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | Terra | P | Terra |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | Saída diferencial negativa do DAC de áudio 1 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | Saída diferencial positiva do DAC de áudio 1 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | Tensão de polarização do microfone |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | Entrada diferencial negativa do ADC de áudio 1 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | Entrada diferencial positiva do ADC de áudio 1 |
| GND | 71 | P | Terra | P | Terra |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Sinal RF Bluetooth, entrada/saída |
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
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | Saída diferencial negativa do DAC de áudio 2 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | Saída diferencial positiva do DAC de áudio 2 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | Entrada diferencial negativa do ADC de áudio 2 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | Entrada diferencial positiva do ADC de áudio 2 |
| GND | 133–138 | P | Terra | P | Terra (6 pinos) |

</div>

*Legenda: P = alimentação; I = entrada; O = saída; T = pode ser configurado em alta impedância; AO = saída de áudio; AI = entrada de áudio.*

!!! note
    Os pinos 2 (USART_RXD) e 3 (USART_TXD) formam a porta padrão de log, depuração e download de programa.

### 4.3 Descrição física dos pinos { #43-physical-pin-description }

Na figura de descrição física dos pinos do datasheet, eles são agrupados por família funcional — SDIO, SPI, I2C, UART, GPTIM, interface LCD (DPI/8080/SPI/JDI/DSI), GPADC, MPI, áudio analógico, modo de inicialização, alimentação, antena BT, CAN/USB e SWD/UART de depuração — no contorno do die SF32LB586VDD36. Consulte essa figura junto com a tabela de definição dos pinos ao posicionar os grupos de sinais na PCB hospedeira.

!!! info "Figura 4-2: Descrição física dos pinos"
    Consulte a Figura 3-2 do datasheet oficial; o diagrama não é reproduzido neste guia.

## 5. Periféricos { #5-peripherals }

### 5.1 Interfaces de comunicação { #51-communication-interfaces }

Qualquer pino identificado como `PAxx_I2C_UART` ou `PBxx_I2C_UART` na tabela acima pode ser configurado para I2C ou UART. O chip oferece até sete interfaces I2C e seis interfaces UART.

**UART** — Comunicação full-duplex, com taxa de transmissão de até 6 Mbps, formato de dados configurável, controle de fluxo por hardware (CTS/RTS) e transmissão e recepção de vários pacotes via DMA. UART1–3 ficam em HPSYS; UART4–6, em LPSYS.

**I2C** — Opera como mestre ou escravo, com FIFO de 8 bytes e suporte a DMA. Oferece os modos Standard (100 kbps), Fast (400 kbps), Fast-mode Plus (1 Mbps) e High-speed (3,4 Mbps), endereçamento de 7 ou 10 bits no modo mestre, clock stretching e filtro digital configurável para rejeitar glitches. I2C1–4 ficam em HPSYS; I2C5–7, em LPSYS.

**SPI** — Suporta os formatos SSP/SPI (full-duplex, mestre ou escravo) e Microwire (half-duplex, somente mestre), largura de dados de 4 a 32 bits, polaridade e fase de clock configuráveis, polaridade de chip-select configurável, FIFO com 16 entradas de 32 bits e DMA. SPI1/2 ficam em HPSYS (máx. 48 MHz); SPI3/4, em LPSYS (máx. 24 MHz).

**USB 2.0 HS** — Uma porta de alta velocidade compatível com USB 2.0, que pode operar como Host ou Device. Oferece endpoints configuráveis, suspensão e retomada, solicitação de sessão e suporte ao protocolo de negociação do Host, além dos modos high-speed e full-speed.

**MPI (Memory Peripheral Interface)** — Suporta Flash SPI NOR (1/2/4 linhas, modo DTR) e Flash SPI NAND (1/2/4 linhas), com acesso por registradores ou por mapeamento em memória (memory-mapped) e comutação automática por hardware. A interface MPI4 do módulo pode conectar Flash SPI NOR/NAND externa.

**SD/SDIO/eMMC** — Compatível com SD 3.0 e eMMC 4.5.1; funciona como controlador Host, com DMA encadeado e FIFO de 1 KB. Suporta cartões SDSC/SDHC/SDXC/SDHS, UHS-1 (SDR12/25/50/104/DDR50), modos SDR de 1/4/8 linhas e modos DDR de 4/8 linhas.

**I2S** — Opera somente como mestre, em full-duplex, e oferece os formatos left-justified, right-justified e standard, áudio mono/estéreo de 8 ou 16 bits e largura PCM de até 24 bits.

**Interface LCD** — Oferece o modo serial SPI DBI (3/4 linhas, barramento de dados dual/quad) e o modo paralelo 8080 (barramento de 8/16/24 bits). Conforme o modo, suporta os formatos de cor RGB332/RGB444/RGB565/RGB666/RGB888. Também disponibiliza nos pinos 47–52 um conjunto dedicado de lanes MIPI DSI (clock + 2 lanes de dados).

### 5.2 Processamento de sinais analógicos { #52-analog-signal-processing }

**GPADC de 12 bits** — ADC SAR, taxa máxima de amostragem de 4 MS/s, faixa de entrada de 0 a 3,3 V em modo single-ended ou ±2,1 V em modo diferencial, oito canais single-ended (ou quatro pares diferenciais), modos de medição única e contínua, quatro intervalos de tempo configuráveis por medição, disparo por software ou hardware e suporte a DMA.

**Sensor de temperatura** — resolução de 0,2 °C, faixa de -40 °C a 125 °C, precisão de ±3 °C e leitura por consulta periódica (polling) ou por interrupção.

**DAC de áudio** — dois canais integrados de 24 bits, taxas de amostragem de 8 a 48 kHz e saída diferencial.

**PLL de áudio** — Gera clock Fractional-N com resolução de 48 MHz/2^18 e atende a taxas de amostragem derivadas de 48 MHz, 32,768 kHz e 44,1 kHz.

**ADC de áudio** — dois canais integrados de 24 bits, taxas de amostragem de 8 a 48 kHz e controle de ganho independente por canal.

## 6. Características elétricas { #6-electrical-characteristics }

### 6.1 Valores máximos absolutos { #61-absolute-maximum-ratings }

<div align="center"><em>Tabela 6.1-1: Valores máximos absolutos</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrada da alimentação de 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrada da alimentação de 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrada da alimentação de I/O | -0,3 | 3,6 | V |
| Tstore | Temperatura de armazenamento | -40 | 125 | °C |

</div>

### 6.2 Condições de operação recomendadas { #62-recommended-operating-conditions }

<div align="center"><em>Tabela 6.2-1: Condições de operação recomendadas</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrada da alimentação de 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrada da alimentação de 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrada da alimentação de I/O | 1,7 | - | 3,6 | V |
| TA | Temperatura de operação | -40 | - | 85 | °C |

</div>

### 6.3 Características elétricas em corrente contínua { #63-dc-electrical-characteristics }

<div align="center"><em>Tabela 6.3-1: Características elétricas em corrente contínua (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacitância do pino | 2,5 | 3 | 3,5 | pF |
| VIH | Tensão de nível alto na entrada | 0,7×VDD | - | VDD | V |
| VIL | Tensão de nível baixo na entrada | VSS | - | 0,3×VDD | V |
| VOH | Tensão de nível alto na saída (carga de alta impedância) | 0,8×VDD | - | VDD | V |
| VOL | Tensão de nível baixo na saída (carga de alta impedância) | VSS | - | 0,2×VDD | V |
| IOH | Corrente de acionamento em nível alto na saída | 24 | 30 | 38 | mA |
| IOL | Corrente de acionamento em nível baixo na saída | 24 | 30 | 38 | mA |
| RPU / RPD | Pull-up / pull-down interno | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>Tabela 6.3-2: Características elétricas em corrente contínua (1,8 V, 25 °C)</em></div>

<div align="center" markdown>

| Símbolo | Parâmetro | Mín. | Típ. | Máx. | Unidade |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | Corrente de acionamento em nível alto na saída | 8 | 10 | 13 | mA |
| IOL | Corrente de acionamento em nível baixo na saída | 8 | 10 | 13 | mA |
| RPU / RPD | Pull-up / pull-down interno | 10 | 17 | 30 | kΩ |

</div>

As tabelas completas (incluindo corrente de fuga de entrada, limiares de reset e capacitância dos pinos nas duas tensões de alimentação) estão na seção §5.3 do datasheet oficial.

### 6.4 Consumo de energia { #64-power-consumption }

<div align="center"><em>Tabela 6.4-1: Corrente BLE (potência de transmissão de 0 dBm)</em></div>

<div align="center" markdown>

| Símbolo | Condição | @ 1,8 V | @ 3,8 V | Unidade |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | Potência TX = 0 dBm | 4,19 | 2,21 | mA |
| I∆RX | — | 4,03 | 2,12 | mA |

</div>

<div align="center"><em>Tabela 6.4-2: Corrente média BLE/Bluetooth Classic (alimentação de 3,8 V)</em></div>

<div align="center" markdown>

| Modo | Intervalo | @ 0 dBm | @ 10 dBm | Unidade |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 146,4 | 178,6 | µA |
| BT Sniff (attempt=1) | 1 s | 7,3 | 8,9 | µA |
| BLE ADV | 50 ms | 166,9 | 251,8 | µA |
| BLE ADV | 1 s | 8,3 | 12,6 | µA |
| BLE Connection | 50 ms | 128,8 | 148,4 | µA |
| BLE Connection | 1 s | 6,4 | 7,4 | µA |
| Standby | — | 4,2 | — | µA |

</div>

<div align="center"><em>Tabela 6.4-3: Consumo do processador (HPSYS/LPSYS, alimentação de 3,8 V)</em></div>

<div align="center" markdown>

| Símbolo | Condição | Corrente (mA) | Incremento (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @ 240 MHz | 10,34 | 31,3 |
| ICoreMark | LPSYS @ 48 MHz | 0,89 | 27,6 |
| IWhileLoop | HPSYS @ 240 MHz | 7,98 | 21,3 |
| IWhileLoop | LPSYS @ 48 MHz | 0,67 | 18,7 |

</div>

### 6.5 Desempenho de RF do Bluetooth de modo dual { #65-dual-mode-bluetooth-rf-performance }

Compatível com Bluetooth 5.3 e retrocompatível com 4.2/4.1/4.0, incluindo BLE e Bluetooth Classic. A frequência central dos canais de operação vai de 2402 a 2480 MHz.

**Transmissor BLE (1 Mbps)**: potência máxima de 19 dBm; faixa de controle de potência de -20 a 19 dBm.

**Receptor BLE**: sensibilidade típica de -100 dBm (1 Mbps), -97 dBm (2 Mbps), -104,5 dBm (LR S2/500 kbps) e -107,5 dBm (LR S8/125 kbps), medida com pacotes de 37 bytes, PER de 30,8% e condição dirty-off.

**Bluetooth Classic (Basic Data Rate)**: potência máxima de transmissão de 19 dBm; sensibilidade do receptor de -96,3 dBm (dirty off) / -94 dBm (dirty on), com BER de 0,1%.

**Bluetooth Classic (Enhanced Data Rate)**: potência máxima de transmissão de 13 dBm; sensibilidade do receptor de -95,5 dBm para π/4-DQPSK e de -88,5 dBm para 8DPSK.

As tabelas completas com valores mínimos/típicos/máximos do desempenho de transmissão e recepção BLE (1 Mbps/2 Mbps/LR) e Bluetooth Classic (BR/EDR) estão na seção §5.5 do datasheet oficial.

## 7. Alimentação do módulo { #7-module-power-supply }

O módulo tem cinco entradas de alimentação: **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2** e **VDDIOB**.

- **VDD_3V3** alimenta os trilhos AVDD33_ANA, AVDD33_AUD e AVDD_USB do chip e a entrada VDD do eMMC integrado ao módulo, quando presente. Recomenda-se usar um LDO.
- **VDD_1V8** alimenta os trilhos PVDD1, PVDD2, AVDD_BRF e AVDD18_DSI do chip, além da memória integrada ao encapsulamento.
- **VDDIOA** alimenta o trilho VDDIOA do chip, a entrada VIO do eMMC integrado ao módulo (quando presente) e a Flash externa.
- **VDDIOA2** alimenta o trilho VDDIOA2 do chip, que atende PA00–PA11.
- **VDDIOB** alimenta o trilho VDDIOB do chip.

!!! info "Figura 7-1: Diagrama de blocos da alimentação do módulo"
    Consulte a Figura 7-1 do datasheet oficial; o diagrama não é reproduzido neste guia.

## 8. Esquemático de referência e atribuição dos pinos { #8-reference-schematic-and-pin-assignment }

O datasheet apresenta um esquemático de referência completo para uma placa de desenvolvimento baseada no SF32LB58-MOD, com circuitos de alimentação, reset, JTAG/SWD, UART, SDIO, LCD, MIPI DSI e áudio.

!!! info "Figura 8-1: Esquemático de referência da placa de desenvolvimento"
    Consulte as Figuras 7-2–7-8 do datasheet oficial; o esquemático não é reproduzido neste guia.

O datasheet também apresenta uma atribuição recomendada de pinos para essa placa, com o mapeamento dos conectores no estilo Raspberry Pi para as opções de display LCD_DPI_24, LCD_DSI, LCD_QSPI e LCD_8080.

!!! info "Figura 8-2: Atribuição recomendada de pinos para a placa de referência"
    Consulte a Figura 7-9 do datasheet oficial; a tabela não é reproduzida neste guia.

Use esses materiais como ponto de partida para o esquemático de produção e adapte a seleção de pinos ao conjunto de periféricos do produto.

## 9. Checklist do esquemático { #9-schematic-design-checklist }

<div align="center"><em>Tabela 9-1: Checklist do esquemático</em></div>

<div align="center" markdown>

| Nº | Verificação |
| :-: | :--- |
| 1 | A tensão de entrada de VDD_3V3 deve ficar entre 2,97 V e 3,6 V; instale um capacitor de 4,7 µF próximo ao pino do módulo. |
| 2 | A tensão de entrada de VDD_1V8 deve ficar entre 1,7 V e 1,95 V; instale um capacitor de 4,7 µF próximo ao pino do módulo. |
| 3 | A tensão de entrada de VDDIOA, VDDIOA2 e VDDIOB deve ficar entre 1,7 V e 3,6 V; instale capacitores próximos aos pinos do módulo. |

</div>

!!! note
    Este guia reproduz somente os três itens acima. Antes de finalizar o esquemático de produção, consulte a lista completa da seção §7.3 no [datasheet oficial em PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 10. Dimensões do módulo e footprint da PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensões do módulo { #101-module-dimensions }

O módulo mede 24 × 24 × 3,1 mm.

!!! info "Figura 10-1: Dimensões do módulo"
    Consulte a Figura 8-1 do datasheet oficial; o desenho não é reproduzido neste guia.

### 10.2 Footprint recomendado para a PCB { #102-recommended-pcb-footprint }

!!! info "Figura 10-2: Footprint recomendado para a PCB"
    Consulte a Figura 8-2 do datasheet oficial; o desenho não é reproduzido neste guia.

### 10.3 Conector de antena externa { #103-external-antenna-connector }

Nos SKUs compatíveis com antena externa, o módulo pode usar um ponto de alimentação de RF em furo metalizado castelado ou um conector compatível com IPEX, conforme o código do módulo.

!!! info "Figura 10-3: Dimensões do conector de antena externa"
    Consulte a Figura 8-3 do datasheet oficial; o desenho não é reproduzido neste guia.

### 10.4 Posicionamento do módulo no projeto da PCB { #104-module-placement-in-pcb-design }

Reserve a zona da antena do módulo e impeça que componentes, cobre, trilhas, metal do chassi ou outras estruturas condutivas invadam a área de exclusão (keepout) de RF. Use o datasheet oficial do módulo e o invólucro final do produto como referências para o espaço livre ao redor da antena e sua validação.

- Sempre que possível, estenda a área da antena além da borda da placa hospedeira e mantenha o ponto de alimentação próximo à borda.
- Se não for possível estender a antena além da borda, reserve uma área de keepout ampla (sem plano de cobre, trilhas ou componentes) e, quando possível, remova o material da placa sob a antena.
- No projeto do produto final, avalie o efeito do invólucro sobre a antena e valide o desempenho de RF, incluindo um teste final de alcance de comunicação no produto montado.

## 11. Manuseio do produto { #11-product-handling }

### 11.1 Condições de armazenamento { #111-storage-conditions }

- Armazene os produtos selados em uma embalagem barreira contra umidade (MBB), abaixo de 40 °C e com umidade relativa de 90%, sem condensação.
- Após abrir a embalagem a vácuo, use o módulo dentro do período de exposição especificado para seu nível de sensibilidade à umidade (MSL); caso contrário, ele deve passar por secagem em estufa antes de uma segunda etapa de refusão.

### 11.2 Descarga eletrostática (ESD) { #112-electrostatic-discharge-esd }

Durante a montagem e os testes, siga as precauções padrão da SiFli para manuseio de módulos com relação a ESD.

### 11.3 Perfil de refusão { #113-reflow-profile }

Recomenda-se submeter o módulo ao processo de refusão uma única vez.

!!! info "Figura 11-1: Perfil recomendado de temperatura de refusão"
    Consulte a Figura 9-1 do datasheet oficial; o gráfico não é reproduzido neste guia.

### 11.4 Vibração ultrassônica { #114-ultrasonic-vibration }

Evite expor os módulos SiFli à vibração de equipamentos de soldagem ou limpeza ultrassônica. A vibração pode entrar em ressonância com os cristais osciladores internos e causar falhas ou funcionamento irregular, podendo inutilizar o módulo ou degradar seu desempenho.

!!! note
    Antes de liberar as especificações do processo de fabricação, confirme o nível final de sensibilidade à umidade, o período de exposição, os limites de ESD e os requisitos de refusão do SF32LB58-MOD na seção §9 do [datasheet oficial em PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf).

## 12. Documentos relacionados { #12-related-documents }

- [Datasheet DS5802-SF32LB58-MOD (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [Introdução ao chip SF32LB58x](../../sf32-products/chips/SF32LB58x.md)
- [Guia de projeto de hardware do SF32LB58x](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. Histórico de revisões { #13-revision-history }

<div align="center"><em>Tabela 13-1: Histórico de revisões</em></div>

<div align="center" markdown>

| Data | Versão | Observações |
| :--- | :-: | :--- |
| 2025 | 0.1 | Versão publicada inicialmente |

</div>

Este guia se baseia na versão inicial publicada **DS5802-SF32LB58-MOD V0.1**. Consulte o PDF oficial para obter a revisão vigente e definitiva.
