---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58-MOD Bluetooth MCUモジュールのハードウェア設計ガイド。電源、インターフェース、PCBへの実装方法を説明します。"
tags:
    - ハードウェア
    - モジュール
---

# SF32LB58-MOD ハードウェア設計ガイド { #sf32lb58-mod-hardware-design-guide }

## 1. 概要 { #1-overview }

**SF32LB58-MOD**は、SiFliのSF32LB586VDD36チップを搭載した汎用・低消費電力Bluetooth MCUモジュールです。このチップには、最大240 MHzで動作する3コアのArm Cortex-M33 STAR-MC1プロセッサが搭載されています。モジュールには48 MHz水晶振動子が実装され、32.768 kHz水晶振動子はオプションです。SKUに応じてHPI-PSRAM、QSPI-NOR/NAND Flash、またはeMMCストレージも搭載します。表面実装型の138ピンモジュールで、寸法は24 × 24 × 3.1 mmです。

このガイドでは、モジュールレベルのハードウェア統合について、ピン定義、周辺インターフェース、電気的特性、電源要件、リファレンス回路図、回路設計チェックリスト、外形寸法とPCBフットプリント、製品取り扱い要件を説明します。SiFliのデータシート **DS5802-SF32LB58-MOD V0.1**に基づいています。

チップのアーキテクチャ（CPUコア、グラフィックス、メモリーサブシステム、周辺機能）の詳細は、[SF32LB58x](../../sf32-products/chips/SF32LB58x.md)および[SF32LB58xハードウェア設計ガイド](../chip-guides/SF32LB58x_hardware_design_guide.md)を参照してください。

!!! note "情報源と図の扱い"
    モジュール固有の技術情報は **DS5802-SF32LB58-MOD V0.1**に準拠しています。データシートに掲載されたピン配置図、回路図、機構図の一部はラスター画像のため、本ガイドでは再作図せず参照先を示しています。以下の図表番号は本サイト内のガイドで一貫する番号です。転載していない図については、公式データシート内の対応する図番号をキャプションに記載しています。

## 2. 設計要点 { #2-quick-design-summary }

### 2.1 モジュールのバリエーション { #21-module-variants }

<div align="center"><em>表 2.1-1: モジュールのバリエーション</em></div>

<div align="center" markdown>

| モジュール型番 | Flash | PSRAM | 標準搭載Flash | 動作温度 | 外形寸法 (mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16MB QSPI-NOR | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-A128R32N1 | 128MB QSPI-NAND | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-E4R32N1 | 4GB eMMC | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |

</div>

### 2.2 主な仕様 { #22-key-specifications }

<div align="center"><em>表 2.2-1: 主な仕様</em></div>

<div align="center" markdown>

| 項目 | 仕様 |
| :--- | :--- |
| アプリケーションコア (HCPU/ACPU) | Arm Cortex-M33 STAR-MC1 × 2、最大240MHz |
| 低消費電力コア (LCPU) | Arm Cortex-M33 STAR-MC1、最大96MHz |
| SRAM | 2176KB (HCPU) + 512KB (ACPU) + 1056KB retention SRAM (LCPU) |
| 無線 | デュアルモードBluetooth 5.3（4.2/4.1/4.0との下位互換性あり、BLEおよびClassic Bluetooth対応） |
| グラフィックス | ePicasso 2.0 + Vivante GCNanoUltraV、最大1024×1024、eZip 2.0、ハードウェアJPEGコーデック |
| オーディオ | 24-bitオーディオDAC × 2、24-bitオーディオSigma-Delta ADC × 2 |
| ストレージ | MPI × 5（パッケージ内蔵および外付け）、SD/SDIO/eMMC × 2 |
| パッケージ | 138ピン、24 × 24 × 3.1 mm |
| 電源 | VDD_3V3 (2.97–3.6V)、VDD_1V8 (1.7–1.95V)、VDDIOA/VDDIOA2/VDDIOB (1.7–3.6V) |
| アンテナ | 型番に応じて、スタンプホールRF給電部またはIPEX互換コネクターを介して外部アンテナを接続 |
| 動作温度 | -40～85°C |

</div>

## 3. 機能ブロック図 { #3-functional-block-diagram }

本モジュールにはSF32LB586VDD36チップ、48MHz水晶振動子、オプションの32.768kHz水晶振動子、およびSKUに応じたパッケージ内蔵HPI-PSRAM、QSPI-NOR/NAND FlashまたはeMMCが搭載され、RF整合回路とアンテナ給電部も備えています。

!!! info "図 3-1: 機能ブロック図"
    本ガイドには転載していません。公式データシートの図2-1を参照してください。

## 4. ピン定義 { #4-pin-definition }

### 4.1 ピン配置図 { #41-pinout-diagram }

モジュールの周囲には合計138本のピンが配置されています。

!!! info "図 4-1: ピン配置図（上面図）"
    本ガイドには転載していません。公式データシートの図3-1を参照してください。

### 4.2 ピン定義表 { #42-pin-definition-table }

モジュールは合計138ピンで構成されています。各ピンの説明を以下に示します。

<div align="center"><em>表 4.2-1: ピン定義</em></div>

<div align="center" markdown>

| 信号名 | 番号 | 種別 | 既定のMUX | 既定のI/O | 機能 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1.8/3.3V | P | PBインターフェースのIO電源入力 |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: ダウンロードモード、0: ユーザーモード |
| RSTN | 12 | I | RSTN | I | 1: ユーザーモード、0: リセットモード |
| VDD_1V8 | 13 | P | 1.8V | P | MCUおよびパッケージ内蔵メモリーの主電源入力 |
| GND | 14 | P | GND | P | グランド |
| VDDIOA | 15 | P | 1.8/3.3V | P | PAインターフェースのIO電源入力（PA00～PA11を除く） |
| VDD_3V3 | 16 | P | 3.3V | P | MCUアナログ電源入力 |
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
| VDDIOA2 | 45 | P | 1.8/3.3V | P | PA00～PA11のIO電源入力 |
| GND | 46 | P | GND | P | グランド |
| DSI_D0N | 47 | O | DSI_D0N | O | MIPI DSIデータレーン0、負極 |
| DSI_D0P | 48 | O | DSI_D0P | P | MIPI DSIデータレーン0、正極 |
| DSI_CLKN | 49 | O | DSI_CLKN | P | MIPI DSIクロックレーン、負極 |
| DSI_CLKP | 50 | O | DSI_CLKP | P | MIPI DSIクロックレーン、正極 |
| DSI_D1N | 51 | O | DSI_D1N | P | MIPI DSIデータレーン1、負極 |
| DSI_D1P | 52 | O | DSI_D1P | P | MIPI DSIデータレーン1、正極 |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | USB差動信号、負極 |
| USB2_DP | 56 | I/O | USB2_DP | I/O | USB差動信号、正極 |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | GND | P | グランド |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | オーディオDAC1差動出力、負極 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | オーディオDAC1差動出力、正極 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | マイクバイアス電圧 |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | オーディオADC1差動入力、負極 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | オーディオADC1差動入力、正極 |
| GND | 71 | P | GND | P | グランド |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Bluetooth RF信号の入出力 |
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
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | オーディオDAC2差動出力、負極 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | オーディオDAC2差動出力、正極 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | オーディオADC2差動入力、負極 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | オーディオADC2差動入力、正極 |
| GND | 133–138 | P | GND | P | グランド（6ピン） |

</div>

*凡例: P = 電源、I = 入力、O = 出力、T = ハイインピーダンスに設定可能、AO = オーディオ出力、AI = オーディオ入力。*

!!! note
    ピン2 (USART_RXD) とピン3 (USART_TXD) は、ログ出力、プログラムのデバッグおよびダウンロードに使用する標準ポートです。

### 4.3 物理ピン配置 { #43-physical-pin-description }

データシートの物理ピン配置図では、SF32LB586VDD36のダイ外形に機能別のピン群（SDIO、SPI、I2C、UART、GPTIM、LCDインターフェース（DPI/8080/SPI/JDI/DSI）、GPADC、MPI、アナログオーディオ、ブートモード、電源、BTアンテナ、CAN/USB、SWD／デバッグUART）を重ねて示しています。ホストPCB上で信号群を配置する際は、上記のピン定義表と併せて参照してください。

!!! info "図 4-2: 物理ピン配置"
    本ガイドには転載していません。公式データシートの図3-2を参照してください。

## 5. 周辺機能 { #5-peripherals }

### 5.1 通信インターフェース { #51-communication-interfaces }

上表で`PAxx_I2C_UART`または`PBxx_I2C_UART`と記されたピンは、I2CまたはUARTとして設定できます。チップ全体で最大7系統のI2Cと6系統のUARTをサポートします。

**UART** — 全二重、最大6Mbpsのボーレート、データ形式の設定、ハードウェアフロー制御（CTS/RTS）、DMAによる複数パケットの送受信に対応します。UART1～3はHPSYS、UART4～6はLPSYSにあります。

**I2C** — マスター／スレーブ、8バイトFIFO、DMAに対応します。標準（100kbps）、Fast（400kbps）、Fast-mode Plus（1Mbps）、High-speed（3.4Mbps）の各モード、マスター時の7-bit／10-bitアドレス指定、クロックストレッチ、設定可能なデジタルグリッチ除去フィルターをサポートします。I2C1～4はHPSYS、I2C5～7はLPSYSにあります。

**SPI** — SSP/SPI形式（全二重、マスター／スレーブ）およびMicrowire形式（半二重、マスターのみ）に対応します。データ幅は4～32 bitで、クロック極性／位相とチップセレクト極性を設定できます。32-bit × 16エントリーFIFOとDMAに対応します。SPI1/2はHPSYS（最大48MHz）、SPI3/4はLPSYS（最大24MHz）にあります。

**USB2.0 HS** — USB 2.0準拠の高速ホスト／デバイスポートを1系統備えます。エンドポイント設定、サスペンド／レジューム、セッション要求、ホストネゴシエーションプロトコルに対応し、High-speedおよびFull-speedで動作します。

**MPI (Memory Peripheral Interface)** — SPI NOR Flash（1/2/4線、DTRモード）およびSPI NAND Flash（1/2/4線）に対応し、レジスタモードとメモリーマップモードをハードウェアで自動的に切り替えてアクセスします。本モジュールのMPI4インターフェースには外付けSPI NOR/NAND Flashを接続できます。

**SD/SDIO/eMMC** — SD 3.0およびeMMC 4.5.1に準拠し、チェーンDMAと1KB FIFOを備えたホストコントローラーとして動作します。SDSC/SDHC/SDXC/SDHSカード、UHS-1（SDR12/25/50/104/DDR50）、1線／4線／8線SDRモード、4線／8線DDRモードに対応します。

**I2S** — マスター専用、全二重。左詰め／右詰め／標準フォーマット、8-bit／16-bitのモノラル／ステレオ、最大24-bitのPCM幅に対応します。

**LCDインターフェース** — DBIシリアルSPIモード（3線／4線、デュアル／クアッドデータ線）およびパラレル8080モード（8/16/24-bitバス幅）に対応します。モードに応じてRGB332/RGB444/RGB565/RGB666/RGB888の色形式を使用できます。専用MIPI DSIレーン（クロック＋データ2レーン）もピン47～52で使用できます。

### 5.2 アナログ信号処理 { #52-analog-signal-processing }

**12-bit GPADC** — SAR ADC、最大サンプリングレート4MS/s、シングルエンド入力範囲0～3.3V／差動入力範囲±2.1V。シングルエンド8チャネル（または差動4ペア）、単発／連続測定、測定ごとに設定可能な4つのタイムスロット、ソフトウェア／ハードウェアトリガー、DMAに対応します。

**温度センサー** — 分解能0.2°C、測定範囲-40°C～125°C、精度±3°C。ポーリングまたは割り込みによる読み出しに対応します。

**オーディオDAC** — 24-bitの内蔵チャネルを2系統備え、サンプリングレート8kHz～48kHz、差動出力に対応します。

**オーディオPLL** — 48MHz/2^18の分解能を持つFractional-N方式のクロック生成に対応し、48MHz、32.768kHz、44.1kHzを基準とするサンプリングレートを生成できます。

**オーディオADC** — 24-bitの内蔵チャネルを2系統備え、サンプリングレート8kHz～48kHz、チャネルごとに独立したゲイン制御に対応します。

## 6. 電気的特性 { #6-electrical-characteristics }

### 6.1 絶対最大定格 { #61-absolute-maximum-ratings }

<div align="center"><em>表 6.1-1: 絶対最大定格</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3V電源入力 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8V電源入力 | -0.3 | 1.95 | V |
| VDDIO | I/O電源入力 | -0.3 | 3.6 | V |
| Tstore | 保存温度 | -40 | 125 | °C |

</div>

### 6.2 推奨動作条件 { #62-recommended-operating-conditions }

<div align="center"><em>表 6.2-1: 推奨動作条件</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3V電源入力 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8V電源入力 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O電源入力 | 1.7 | - | 3.6 | V |
| TA | 動作温度 | -40 | - | 85 | °C |

</div>

### 6.3 DC電気的特性 { #63-dc-electrical-characteristics }

<div align="center"><em>表 6.3-1: DC電気的特性 (3.3V、25°C)</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | ピン容量 | 2.5 | 3 | 3.5 | pF |
| VIH | 入力High電圧 | 0.7×VDD | - | VDD | V |
| VIL | 入力Low電圧 | VSS | - | 0.3×VDD | V |
| VOH | 出力High電圧（High-Z負荷） | 0.8×VDD | - | VDD | V |
| VOL | 出力Low電圧（High-Z負荷） | VSS | - | 0.2×VDD | V |
| IOH | 出力High駆動電流 | 24 | 30 | 38 | mA |
| IOL | 出力Low駆動電流 | 24 | 30 | 38 | mA |
| RPU / RPD | 内部プルアップ／プルダウン | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>表 6.3-2: DC電気的特性 (1.8V、25°C)</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | 出力High駆動電流 | 8 | 10 | 13 | mA |
| IOL | 出力Low駆動電流 | 8 | 10 | 13 | mA |
| RPU / RPD | 内部プルアップ／プルダウン | 10 | 17 | 30 | kΩ |

</div>

入力リーク、リセットしきい値、両電源電圧におけるピン容量を含む全データは、公式データシートの§5.3に記載されています。

### 6.4 消費電力 { #64-power-consumption }

<div align="center"><em>表 6.4-1: BLE電流 (TX出力0dBm)</em></div>

<div align="center" markdown>

| 記号 | 条件 | @1.8V | @3.8V | 単位 |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | TX power = 0dBm | 4.19 | 2.21 | mA |
| I∆RX | — | 4.03 | 2.12 | mA |

</div>

<div align="center"><em>表 6.4-2: BLE／Classic BTの平均電流 (電源3.8V)</em></div>

<div align="center" markdown>

| モード | 間隔 | @0dBm | @10dBm | 単位 |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 146.4 | 178.6 | µA |
| BT Sniff (attempt=1) | 1s | 7.3 | 8.9 | µA |
| BLE ADV | 50ms | 166.9 | 251.8 | µA |
| BLE ADV | 1s | 8.3 | 12.6 | µA |
| BLE接続 | 50ms | 128.8 | 148.4 | µA |
| BLE接続 | 1s | 6.4 | 7.4 | µA |
| Standby | — | 4.2 | — | µA |

</div>

<div align="center"><em>表 6.4-3: プロセッサー消費電流 (HPSYS/LPSYS、電源3.8V)</em></div>

<div align="center" markdown>

| 記号 | 条件 | 電流 (mA) | 増分 (µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240MHz | 10.34 | 31.3 |
| ICoreMark | LPSYS @48MHz | 0.89 | 27.6 |
| IWhileLoop | HPSYS @240MHz | 7.98 | 21.3 |
| IWhileLoop | LPSYS @48MHz | 0.67 | 18.7 |

</div>

### 6.5 デュアルモードBluetooth RF性能 { #65-dual-mode-bluetooth-rf-performance }

Bluetooth 5.3に対応し、4.2/4.1/4.0との下位互換性があります。BLEおよびClassic Bluetoothに対応します。動作チャネルの中心周波数は2402～2480MHzです。

**BLE送信機 (1Mbps)**: 最大出力19dBm、出力制御範囲-20～19dBm。

**BLE受信機**: 代表感度は、1Mbpsで-100dBm、2Mbpsで-97dBm、LR S2/500kbpsで-104.5dBm、LR S8/125kbpsで-107.5dBmです。37バイトのパケットを使用し、dirty-off、PER 30.8%の条件で測定された値です。

**Classic BT (Basic Data Rate)**: 最大送信出力19dBm、受信感度-96.3dBm (dirty off) / -94dBm (dirty on)、BER 0.1%。

**Classic BT (Enhanced Data Rate)**: 最大送信出力13dBm、π/4-DQPSKの受信感度-95.5dBm、8DPSKの受信感度-88.5dBm。

BLEの1Mbps/2Mbps/LR送受信性能およびClassic BT BR/EDR送受信性能の最小／標準／最大値は、公式データシートの§5.5に記載されています。

## 7. モジュールの電源 { #7-module-power-supply }

本モジュールには、**VDD_3V3**、**VDD_1V8**、**VDDIOA**、**VDDIOA2**、**VDDIOB**の5つの電源インターフェースがあります。

- **VDD_3V3**はチップのAVDD33_ANA、AVDD33_AUD、AVDD_USBレール、および搭載されている場合はモジュール内蔵eMMCのVDDに給電します。LDO電源の使用を推奨します。
- **VDD_1V8**はチップのPVDD1、PVDD2、AVDD_BRF、AVDD18_DSIレールとパッケージ内蔵メモリーに給電します。
- **VDDIOA**はチップのVDDIOAレール、搭載されている場合はパッケージ内蔵eMMCのVIO、および外付けFlashに給電します。
- **VDDIOA2**はチップのVDDIOA2レール（PA00～PA11）に給電します。
- **VDDIOB**はチップのVDDIOBレールに給電します。

!!! info "図 7-1: モジュール電源ブロック図"
    本ガイドには転載していません。公式データシートの図7-1を参照してください。

## 8. リファレンス回路図とピン割り当て { #8-reference-schematic-and-pin-assignment }

データシートには、SF32LB58-MOD搭載開発ボードの完全なリファレンス回路図が掲載されています。電源、リセット、JTAG/SWD、UART、SDIO、LCD、MIPI DSI、オーディオ回路を網羅しています。

!!! info "図 8-1: 開発ボードのリファレンス回路図"
    本ガイドには転載していません。公式データシートの図7-2～7-8を参照してください。

データシートには、このリファレンスボード向けの推奨ピン割り当て表もあります。LCD_DPI_24、LCD_DSI、LCD_QSPI、LCD_8080の各ディスプレイ方式について、Raspberry Pi形式ヘッダーへの割り当ても掲載されています。

!!! info "図 8-2: リファレンスボードの推奨ピン割り当て"
    本ガイドには転載していません。公式データシートの図7-9を参照してください。

これらを量産回路図の出発点とし、製品で使用する周辺機能に合わせてピンを選定してください。

## 9. 回路設計チェックリスト { #9-schematic-design-checklist }

<div align="center"><em>表 9-1: 回路設計チェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 |
| :-: | :--- |
| 1 | VDD_3V3の入力電圧は2.97V～3.6Vの範囲にする必要があります。モジュールピンの近くに4.7µFのコンデンサーを配置してください。 |
| 2 | VDD_1V8の入力電圧は1.7V～1.95Vの範囲にする必要があります。モジュールピンの近くに4.7µFのコンデンサーを配置してください。 |
| 3 | VDDIOA、VDDIOA2、VDDIOBの入力電圧は1.7V～3.6Vの範囲にする必要があります。各モジュールピンの近くにコンデンサーを配置してください。 |

</div>

!!! note
    このガイドには上記3項目のみを記載しています。量産回路図を確定する前に、[公式データシートPDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)の§7.3で完全なチェックリストを確認してください。

## 10. モジュール寸法とPCBフットプリント { #10-module-dimensions-and-pcb-footprint }

### 10.1 モジュール寸法 { #101-module-dimensions }

モジュールの外形寸法は24 × 24 × 3.1 mmです。

!!! info "図 10-1: モジュール寸法"
    本ガイドには転載していません。公式データシートの図8-1を参照してください。

### 10.2 推奨PCBフットプリント { #102-recommended-pcb-footprint }

!!! info "図 10-2: 推奨PCBフットプリント"
    本ガイドには転載していません。公式データシートの図8-2を参照してください。

### 10.3 外部アンテナコネクター { #103-external-antenna-connector }

外部アンテナに対応するSKUでは、型番に応じてスタンプホールRF給電部またはIPEX互換コネクターを使用できます。

!!! info "図 10-3: 外部アンテナコネクターの寸法"
    本ガイドには転載していません。公式データシートの図8-3を参照してください。

### 10.4 PCB設計でのモジュール配置 { #104-module-placement-in-pcb-design }

モジュールのアンテナ領域を確保し、部品、銅箔、配線、筐体金属などの導電性構造物がRFキープアウト領域に重ならないようにしてください。アンテナ周辺のクリアランスと検証には、公式モジュールデータシートおよび最終製品の筐体を基準として使用します。

- 可能であればアンテナ領域をホスト基板の端から張り出させ、給電点を基板端の近くに配置します。
- アンテナを基板端から張り出せない場合は、十分なキープアウト領域（銅箔ベタ、配線、部品なし）を設け、可能な範囲でアンテナ直下のホスト基板を切り欠きます。
- 最終製品の設計では、筐体がアンテナに与える影響を評価し、完成品での通信距離試験を含むRF検証を実施してください。

## 11. 製品の取り扱い { #11-product-handling }

### 11.1 保管条件 { #111-storage-conditions }

- 製品は防湿袋（MBB）に密封し、40°C未満／90%RH、結露なしの条件で保管します。
- 真空袋を開封した後は、吸湿感度レベル（MSL）に定められたフロアライフ期間内にモジュールを使用してください。期間を超えた場合、2回目のリフロー前にベーキングが必要です。

### 11.2 静電気放電 (ESD) { #112-electrostatic-discharge-esd }

組み立ておよび試験時には、SiFli標準のモジュール向けESD取り扱い上の注意に従ってください。

### 11.3 リフロープロファイル { #113-reflow-profile }

本モジュールのリフロー実装は1回のみを推奨します。

!!! info "図 11-1: 推奨リフロー温度プロファイル"
    本ガイドには転載していません。公式データシートの図9-1を参照してください。

### 11.4 超音波振動 { #114-ultrasonic-vibration }

SiFliモジュールを超音波溶着機や超音波洗浄装置の振動にさらさないでください。超音波振動がモジュール内の水晶発振子と共振し、水晶の破損や誤動作を引き起こして、モジュールが動作不能になったり性能が低下したりするおそれがあります。

!!! note
    製造工程仕様を確定する前に、[公式データシートPDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)の§9を参照し、SF32LB58-MODの最終的な吸湿感度レベル、フロアライフ期間、ESD上限、リフロー要件を確認してください。

## 12. 関連資料 { #12-related-documents }

- [DS5802-SF32LB58-MODデータシート (V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [SF32LB58xチップの紹介](../../sf32-products/chips/SF32LB58x.md)
- [SF32LB58xハードウェア設計ガイド](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. 改訂履歴 { #13-revision-history }

<div align="center"><em>表 13-1: 改訂履歴</em></div>

<div align="center" markdown>

| 日付 | バージョン | 備考 |
| :--- | :-: | :--- |
| 2025 | 0.1 | 初版 |

</div>

本ガイドは初版の**DS5802-SF32LB58-MOD V0.1**に基づいています。正式かつ最新の改訂内容については、公式PDFを参照してください。
