---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB52-MOD-1 Bluetooth MCUモジュールの電源、インターフェース、PCB実装に関するハードウェア設計ガイド。"
tags:
    - ハードウェア
    - モジュール
---

# SF32LB52-MOD-1ハードウェア設計ガイド { #sf32lb52-mod-1-hardware-design-guide }

## 1. 概要 { #1-overview }

**SF32LB52-MOD-1**は、SiFliのSF32LB525UC6チップ（Arm Cortex-M33 STAR-MC1デュアルコア、最大240MHz）を搭載した認証済みの汎用低消費電力Bluetooth MCUモジュールです。48MHz水晶振動子、オプションの32.768kHz水晶振動子、およびオプションのパッケージ内蔵64Mb OPI-PSRAMダイを統合し、68ピン、27.9 × 18.0 × 3.1mmの表面実装パッケージに収めています。

このガイドでは、モジュールのピン定義、周辺インターフェース、電気的特性、電源要件、リファレンス回路図、回路図設計チェックリスト、外形寸法とPCBフットプリント、および製品の取り扱い要件を説明します。SiFliのデータシート **DS5203-SF32LB52-MOD-1 V0.3**に基づいています。

チップのアーキテクチャ（コア、グラフィックス、メモリーサブシステム、周辺機能）の詳細については、[SF32LB52x](../../sf32-products/chips/SF32LB52x.md)および[SF32LB52xハードウェア設計ガイド](../chip-guides/SF32LB52x_hardware_design_guide.md)を参照してください。

!!! note "出典と図の扱い"
    モジュール固有の技術データは **DS5203-SF32LB52-MOD-1 V0.3**に準拠しています。データシート内のピン配置図、回路図、機構図にはラスター画像が含まれるため、本ガイドでは再描画せず参照先を示しています。以下の図表番号は本サイト内のガイド独自の番号です。転載していない図については、公式データシートの該当図番号をキャプションに記載しています。

## 2. 設計概要 { #2-quick-design-summary }

### 2.1 モジュールのバリアント { #21-module-variant }

<div align="center"><em>表 2.1-1: モジュールのバリアント</em></div>

<div align="center" markdown>

| モジュール型番 | Flash | PSRAM | 動作温度 | 寸法（mm） |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16MB QSPI-NOR | 8MB OPI-PSRAM | -40~85°C | 27.9 × 18.0 × 3.1 |

</div>

### 2.2 主な仕様 { #22-key-specifications }

<div align="center"><em>表 2.2-1: 主な仕様</em></div>

<div align="center" markdown>

| 項目 | 仕様 |
| :--- | :--- |
| アプリケーションコア（HCPU） | Arm Cortex-M33 STAR-MC1、最大240MHz、SRAM 512KB |
| 低消費電力コア（LCPU） | Arm Cortex-M33 STAR-MC1、最大24MHz、SRAM 64KB |
| 無線 | BLE Audio対応デュアルモードBluetooth 5.3 |
| グラフィックス | 最大512×512対応のePicasso 2.0 2D/2.5Dエンジン、eZip 2.0ロスレス展開 |
| オーディオ | 24ビットオーディオDAC ×1、24ビットSigma-DeltaオーディオADC ×1 |
| ストレージ | オプションのパッケージ内蔵OPI-PSRAM（144MHz）、外部MPI（QSPI）×1、SD/SDIO/eMMC ×1 |
| パッケージ | 68ピン、27.9 × 18.0 × 3.1mm |
| 電源 | VSYS：3.2～4.7V（Li-ion）または3.7～4.7V（DCDC/LDO、3.8V推奨） |
| アンテナ | PCB内蔵アンテナ、またはIPEXコネクタ経由の外部アンテナ（品番による） |
| 動作温度 | -40～85°C |

</div>

## 3. 機能ブロック図 { #3-functional-block-diagram }

本モジュールは、SF32LB525UC6チップ、48MHz水晶振動子、オプションの32.768kHz水晶振動子を搭載し、このSKUでは64Mb OPI-PSRAMダイもパッケージ内蔵しています。さらに、RF整合回路とアンテナ給電線を備えています。

!!! info "図 3-1: 機能ブロック図"
    本ガイドには転載していません。公式データシートの図2-1を参照してください。

## 4. ピン定義 { #4-pin-definition }

### 4.1 ピン配置図 { #41-pinout-diagram }

モジュールの外周には68本のピンがあります。ピン1はアンテナ領域に近い角に示され、パッケージの周囲を反時計回りに番号が付けられています。

!!! info "図 4.1-1: ピン配置図（上面図）"
    本ガイドには転載していません。公式データシートの図3-1を参照してください。

### 4.2 ピン定義表 { #42-pin-definition-table }

モジュールの全68ピンを以下の表に示します。

<div align="center"><em>表 4.2-1: ピン定義表</em></div>

<div align="center" markdown>

| 名称 | 番号 | 種別 | デフォルトMUX | デフォルトI/O | 機能 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | 接地 | P | 接地 |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *モジュール内に32K水晶振動子が実装されている場合、PA23は外部から使用できません* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *モジュール内に32K水晶振動子が実装されている場合、PA22は外部から使用できません* |
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
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | 3.3 V電源出力 |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | 接地 | P | 接地 |
| VSYS | 27 | P | VSYS | P | 主電源入力。Li-ionバッテリーの電圧範囲は3.2～4.7 V。DCDC/LDO（Li-ion以外）から給電する場合は3.7～4.7 V、3.8 Vを推奨 |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | オーディオDAC差動出力、正極 |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | オーディオDAC差動出力、負極 |
| GND | 35 | P | 接地 | P | 接地 |
| MIC_BIAS | 36 | P | MIC_BIAS | P | マイクバイアス電圧 |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | アナログオーディオ入力 |
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
| GND | 48～60 | P | 接地 | P | 接地（13ピン） |
| VBATS | 61 | P | VBAT | P | バッテリー電圧検出入力 |
| NC | 62 | — | NC | — | 未接続 |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*凡例：P = 電源、I = 入力、O = 出力、T = ハイインピーダンス設定可能、AO = オーディオ出力、AI = オーディオ入力。*

!!! note
    29番ピン（DBG_UART_TXD）と30番ピン（DBG_UART_RXD）は、ログ出力、プログラムデバッグ、プログラム書き込み用のデフォルトポートです。

### 4.3 物理ピン配置 { #43-physical-pin-description }

データシートの物理ピン配置図では、SF32LB525UC6のダイ外形上に、SDIO、SPI、I2C、UART、GPTIM、LCDインターフェース、GPADC、MPI、アナログオーディオ、外部32K発振器、外部ウェイクアップ、SWD／デバッグUARTの機能グループごとにピンが示されています。ホストPCBで信号グループを配置する際は、上記のピン定義表と併せて参照してください。

!!! info "図 4.3-1: 物理ピン配置"
    本ガイドには転載していません。公式データシートの図3-2を参照してください。

## 5. 周辺機能 { #5-peripherals }

### 5.1 通信インターフェース { #51-communication-interfaces }

上の表で`PAxx_I2C_UART`と記載されたピンは、I2CまたはUARTとして設定できます。データシートでは、設定可能な上限をI2C 4系統、UART 3系統としています。

!!! important "データシート内の周辺インターフェース数の不一致"
    同じデータシートの後半ではI2C1～I2C7、UART1～UART6が列挙されており、前述の上限値と一致しません。特定のモジュール／SoC構成で実際に使用できる数をSiFliに確認してください。コントローラー番号の列挙を、すべて同時に使用できる根拠とみなさないでください。

**UART** — 全二重、最大6 Mbps、データ形式設定可能、ハードウェアフロー制御（CTS/RTS）、DMAによる複数パケットの送受信に対応します。UART1～3はHPSYS、UART4～6はLPSYSにあります。

**I2C** — マスター／スレーブ対応、8バイトFIFO、DMA対応。標準（100 kbps）、Fast（400 kbps）、Fast-mode Plus（1 Mbps）、High-speed（3.4 Mbps）に対応し、マスター時は7ビット／10ビットアドレスを使用できます。デジタルグリッチ除去フィルターは設定可能です。I2C1～4はHPSYS、I2C5～7はLPSYSにあります。

**SPI** — SSP/SPI形式（全二重、マスター／スレーブ）およびMicrowire形式（半二重、マスターのみ）に対応します。データ幅は4～32ビット、クロック極性／位相（SPO/SPH）とチップセレクト極性は設定可能です。32ビット幅×16エントリーのFIFO、DMAに対応し、クロックは最大48 MHzです。

**USB2.0 FS** — フルスピードのホスト／デバイスポートを1つ備えます。エンドポイント設定、サスペンド／レジューム、FIFOサイズの動的設定、セッション要求、ホストネゴシエーションプロトコルに対応し、USB2.0 FS PHYを内蔵しています。

**MPI（Memory Peripheral Interface）** — SPI NOR Flash（1／2／4線）およびSPI NAND Flash（1／2／4線）に対応し、レジスターモードとメモリーマップモードをハードウェアで自動切り替えします。モジュールのMPI2インターフェースには外付けSPI NOR/NAND Flashを接続できます。モジュール内にFlashが実装済みの場合、MPI2の外部信号6本（PA12、PA13、PA14、PA15、PA16、PA17）は外部から使用できません。

**SD/SDIO/eMMC** — SD 3.0、SDIO 3.0、eMMC 4.5.1に準拠し、SDSC/SDHC/SDXC/SDHSカード、SDR12/25/50、1線および4線のSDRモードに対応します。2 KB FIFO、DMAデータ転送に対応し、最大48 MHzで動作します（DDR非対応）。SDIOインターフェースはMPI2とI/Oを共有するため、同時には使用できません。

**I2S** — マスター／スレーブ、全二重、左詰め／右詰め／標準フォーマット、8ビット／16ビットのモノラル／ステレオ、最大24ビットのPCM幅に対応します。

**LCDインターフェース** — DBIシリアルSPIモード（3線／4線、デュアル／クアッドデータライン）およびパラレル8080モード（8／16／24ビットバス幅）に対応します。モードに応じてRGB332/RGB444/RGB565/RGB666/RGB888の色形式を使用できます。

### 5.2 アナログ信号処理 { #52-analog-signal-processing }

**12ビットGPADC** — SAR ADC、最大サンプリングレート4 MS/s。入力範囲はシングルエンド0～3.3 V／差動±2.1 Vです。シングルエンド7チャネル＋バッテリー電圧1チャネル（または差動3ペア）を備え、単発／連続測定、測定ごとに設定可能な4つのタイムスロット、ソフトウェア／ハードウェアトリガー、DMAに対応します。

**温度センサー** — 分解能0.2°C、測定範囲-40°C～125°C、精度±3°C。ポーリングまたは割り込みによる読み出しが可能です。

**オーディオDAC** — 24ビットDAC出力経路を1系統備え、8～48 kHzのサンプリングレートと差動出力に対応します。

**オーディオPLL** — 48 MHz/2^18の分解能を持つFractional-Nクロック生成に対応し、48 MHz、32.768 kHz、44.1 kHzの派生サンプリングレートをサポートします。

**オーディオADC** — 24ビットSigma-Delta ADC入力経路を1系統備え、8～48 kHzのサンプリングレートに対応します。

## 6. 電気的特性 { #6-electrical-characteristics }

### 6.1 絶対最大定格 { #61-absolute-maximum-ratings }

以下の表の値を超えると、モジュールに恒久的な損傷が生じるおそれがあります。これらはストレス定格であり、§6.2の推奨動作条件を超えて正常に動作することを示すものではありません。絶対最大定格の条件に長時間さらされると、モジュールの信頼性が低下する可能性があります。

<div align="center"><em>表 6.1-1: 絶対最大定格</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | 電源ピン電圧 | -0.3 | 4.7 | V |
| Tstore | 保存温度 | -40 | 125 | °C |

</div>

### 6.2 推奨動作条件 { #62-recommended-operating-conditions }

<div align="center"><em>表 6.2-1: 推奨動作条件</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Li-ionバッテリー電源 | 3.2 | - | 4.7 | V |
| VSYS | DCDC/LDO経由のLi-ion以外の電源 | 3.7 | 3.8 | 4.7 | V |
| TA | 動作温度 | -40 | - | 85 | °C |

</div>

### 6.3 DC電気的特性（3.3 V、25°C） { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>表 6.3-1: DC電気的特性（3.3 V、25°C）</em></div>

<div align="center" markdown>

| 記号 | 項目 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | ピン容量 | 2.5 | 3 | 3.5 | pF |
| VIH | 入力High電圧 | 0.7×VDD | - | VDD | V |
| VIL | 入力Low電圧 | VSS | - | 0.3×VDD | V |
| IIH | 入力High電流 | - | 10 | 40 | nA |
| IIL | 入力Low電流 | - | 10 | 40 | nA |
| VOH | 出力High電圧（高インピーダンス負荷） | 0.8×VDD | - | VDD | V |
| VOL | 出力Low電圧（高インピーダンス負荷） | VSS | - | 0.2×VDD | V |
| IOH | 出力High駆動電流 | 24 | 30 | 38 | mA |
| IOL | 出力Low駆動電流 | 24 | 30 | 38 | mA |
| RPU | 内部プルアップ（Vpad=0.8×VDD） | 7 | 10 | 20 | kΩ |
| RPD | 内部プルダウン（Vpad=0.2×VDD） | 7 | 10 | 20 | kΩ |
| VIH_nRST | リセット解除電圧 | 0.7×VDD | - | VDD | V |
| VIL_nRST | リセットアサート電圧 | VSS | - | 0.3×VDD | V |

</div>

VDDはI/O電源レールです。VOH/VOLは高インピーダンス負荷条件で測定しています。

### 6.4 消費電力 { #64-power-consumption }

<div align="center"><em>表 6.4-1: BluetoothおよびBLEの平均電流（電源電圧3.8 V）</em></div>

<div align="center" markdown>

| モード | 間隔 | @0dBm | @4dBm | @10dBm | 単位 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 129.5 | 135.6 | 160.9 | µA |
| BT Sniff (attempt=1) | 1s | 6.0 | 6.3 | 7.6 | µA |
| BLE ADV | 50ms | 171.6 | 217.6 | 298.3 | µA |
| BLE ADV | 1s | 8.9 | 9.5 | 17.0 | µA |
| BLE Connection | 50ms | 95.0 | 105.0 | 118.7 | µA |
| BLE Connection | 1s | 4.1 | 4.6 | 9.1 | µA |
| Scan（InquiryまたはPage） | — | 33.4 | — | — | µA |
| 両方のScan | — | 67.3 | — | — | µA |
| スリープ | — | 20.0 | — | — | µA |

</div>

<div align="center"><em>表 6.4-2: プロセッサーの消費電力（電源電圧3.8 V）</em></div>

<div align="center" markdown>

| クロック | 電流（µA） | 増分（µA/MHz） |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 デュアルモードBluetoothのRF性能 { #65-dual-mode-bluetooth-rf-performance }

Bluetooth 5.3に対応し、4.2/4.1/4.0との下位互換性があります。動作チャネルの中心周波数は2402～2480 MHzです。

**BLE送信機（1 Mbps）**：最大出力19 dBm、出力制御範囲-20～19 dBm、Δf1avg = 250 kHz（標準値）、Δf2max = 210 kHz（標準値）です。これらは周波数偏移の値であり（データシートでは「最大／最小変調」と記載）、無次元の変調指数ではありません。初期搬送波周波数許容差は標準値で±20 kHzです。

**BLE受信機（1 Mbps）**：感度は-100 dBm（Dirty off）／-99.3 dBm（Dirty on）、PER 30.8%時の同一チャネルC/Iは7 dBです。

**Classic BT（Basic Data Rate）**：最大送信出力18 dBm、受信感度は-96.3 dBm（Dirty off）／-94 dBm（Dirty on）、BER 0.1%時です。

**Classic BT（Enhanced Data Rate）**：最大送信出力13 dBm、π/4-DQPSKの受信感度は-95.5 dBm、8DPSKの受信感度は-88.5 dBmです。

BLE 1 Mbps／2 Mbpsの送受信性能およびClassic BT BR/EDRの送受信性能について、最小値／標準値／最大値を含む詳細な表は公式データシートの§5.5に記載されています。

## 7. モジュールの電源 { #7-module-power-supply }

モジュールの主電源入力は**VSYS**のみです。Li-ion/Li-Poバッテリー（3.2～4.7 V）から直接給電するか、DCDC/LDOレギュレーター（3.7～4.7 V、3.8 V推奨）から給電できます。

**VBATS**はバッテリー電圧検出ピンで、内部ADCにより0～4.7 Vの範囲で測定されます。VBATSに外付けの抵抗分圧回路を使用せず、測定対象の信号をピンに直接接続してください。

**VDD33_VOUT2**はモジュール内蔵3.3 V LDOの出力で、外部周辺デバイスに最大150 mAを供給できます。この電源レールの総容量は7.4 µFを超えてはなりません。

## 8. リファレンス回路図とピン割り当て { #8-reference-schematic-and-pin-assignment }

データシートには、SF32LB52-MOD-1を使用した開発ボードの完全なリファレンス回路図が掲載されています。電源、リセット、JTAG/SWD、UART、SDIO、LCD、オーディオ回路を含みます。

!!! info "図 8-1: 開発ボードのリファレンス回路図"
    本ガイドには転載していません。公式データシートの図7-2～7-6を参照してください。

このリファレンスボードの推奨ピン割り当て表も、データシートに掲載されています。

!!! info "図 8-2: リファレンスボードの推奨ピン割り当て"
    本ガイドには転載していません。公式データシートの図7-7を参照してください。

これらを量産回路図の出発点として使用し、製品で使用する周辺デバイスの構成に合わせてピンを選定してください。

## 9. 回路図設計チェックリスト { #9-schematic-design-checklist }

<div align="center"><em>表 9-1: 回路図設計チェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 |
| :-: | :--- |
| 1 | VSYSはLi-ionバッテリーに直接接続できます。DCDC/LDO経由で給電する場合は3.8 Vを推奨します。VBATSはバッテリー電圧検出ピン（範囲0～4.7 V）です。外付け抵抗分圧回路は使用せず、測定する信号をVBATSに直接接続してください。 |
| 2 | VSYSピンの近くに4.7 µFコンデンサを1個、0.1 µFコンデンサを1個配置する。 |
| 3 | VBATSピンの近くに0.1 µFコンデンサを1個配置する。 |
| 4 | VDD33_VOUT2は3.3 V LDO出力で、最大電流は150 mAです。外部負荷がこの値を超えないようにしてください。 |
| 5 | VDD33_VOUT2の総容量は7.4 µF以下とする。 |
| 6 | モジュールのI/Oインターフェース電圧は3.3 Vです。接続するすべての周辺デバイスも3.3 Vロジックレベルを使用してください。 |
| 7 | モジュール内に32K水晶振動子が実装されている場合、PA22およびPA23は外部から使用できません。 |
| 8 | モジュール内にFlashが実装済みの場合、MPI2信号6本（PA12、PA13、PA14、PA15、PA16、PA17）は外部から使用できません。 |
| 9 | SDIOインターフェースとMPI2はI/Oを共有するため、同時には使用できません。 |
| 10 | ピン表で`#GPADC_CHx`と記載されたピンは、0～3.3 Vのアナログ入力に対応します。 |
| 11 | ピン表で`PAxx_TIM`と記載されたピンはPWM出力に対応します。 |
| 12 | PA34はアクティブHighで、10秒長押しによるリセットに対応します。設計に10 kΩのプルダウン抵抗を追加してください。 |
| 13 | バッテリーおよびタッチパネル（TP）インターフェースなど、外部に露出する信号用にESD保護部品を確保する。 |
| 14 | プログラム書き込み／デバッグ用にDBG_UARTへ多重化されるPA18/PA19には、それぞれ100 Ωの直列抵抗を設けることを推奨する。 |

</div>

## 10. モジュール寸法とPCBフットプリント { #10-module-dimensions-and-pcb-footprint }

### 10.1 モジュール寸法 { #101-module-dimensions }

モジュールの寸法は27.9 × 18.0 × 3.1mmです。

!!! info "図 10.1-1: モジュール寸法（上面図、側面図、下面図）"
    本ガイドには転載していません。公式データシートの図8-1を参照してください。

### 10.2 推奨PCBフットプリント { #102-recommended-pcb-footprint }

!!! info "図 10.2-1: 推奨PCBフットプリント"
    本ガイドには転載していません。公式データシートの図8-2を参照してください。

### 10.3 外部アンテナコネクタ { #103-external-antenna-connector }

外部アンテナに対応するSKUでは、以下のコネクタと互換性のある第1世代のコネクタフットプリントを使用します。

- Hirose U.FLシリーズ
- I-PEX MHFIコネクタ
- Amphenol AMCコネクタ

!!! info "図 10.3-1: 外部アンテナコネクタ寸法"
    本ガイドには転載していません。公式データシートの図8-3を参照してください。

### 10.4 PCB設計におけるモジュール配置 { #104-module-placement-in-pcb-design }

最終製品でモジュールを基板上に実装する場合、放射効率の低下を防ぐため、他の部品や金属領域がモジュールのPCBアンテナ領域と重ならないようにスペースを確保してください。アンテナ性能への影響を抑えられるよう、ホスト基板上のモジュール位置を計画してください。

推奨事項：

- モジュールのアンテナ領域をホスト基板の端から張り出させ、給電点を基板端の近くに配置します。

!!! info "図 10.4-1: 推奨モジュール配置"
    本ガイドには転載していません。公式データシートの図8-4を参照してください。

- アンテナ領域を基板端から張り出せない場合、PCBアンテナの周囲に15mm以上のキープアウト領域を設け、銅箔、配線、部品を配置しないでください。可能であれば、アンテナ直下のホスト基板材料も取り除いてください。

!!! info "図 10.4-2: アンテナのキープアウト領域"
    本ガイドには転載していません。公式データシートの図8-5を参照してください。

- キープアウト領域を設ける場合も、アンテナ給電点を基板端の近くに配置してください。
- 最終製品全体を設計する際は、筐体がアンテナに与える影響を評価し、完成品での最終通信距離試験を含むRF検証を実施してください。

## 11. 製品の取り扱い { #11-product-handling }

### 11.1 保管条件 { #111-storage-conditions }

- 製品は防湿袋（MBB）に密封し、結露しない条件で40°C未満／相対湿度90%以下で保管してください。
- モジュールの湿度感度レベル（MSL）：3。
- 真空包装を開封した後は、25±5°C／相対湿度60%の環境で168時間以内にモジュールを使用してください。それを超えた場合は、製造ラインへ再投入する前に規定のベーキングを行ってください。

### 11.2 静電気放電（ESD） { #112-electrostatic-discharge-esd }

- 人体モデル（HBM）：±2000 V
- 帯電デバイスモデル（CDM）：±500 V

### 11.3 リフロープロファイル { #113-reflow-profile }

モジュールのリフローは1回のみとすることを推奨します。

!!! info "図 11.3-1: 推奨リフロー温度プロファイル"
    本ガイドには転載していません。公式データシートの図9-1を参照してください。

### 11.4 超音波振動 { #114-ultrasonic-vibration }

SiFliモジュールを超音波溶着機や超音波洗浄機の振動にさらさないでください。超音波振動がモジュール内蔵の水晶発振器と共振し、水晶の破損や誤動作を引き起こす可能性があります。その結果、モジュールが動作しなくなったり、性能が低下したりするおそれがあります。

## 12. 関連資料 { #12-related-documents }

- [DS5203-SF32LB52-MOD-1データシート（V0.3）](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [SF32LB52xチップ紹介](../../sf32-products/chips/SF32LB52x.md)
- [SF32LB52xハードウェア設計ガイド](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. 改訂履歴 { #13-revision-history }

<div align="center"><em>表 13-1: 改訂履歴</em></div>

<div align="center" markdown>

| 日付 | バージョン | 変更内容 |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | 図2-1を更新 |
| 2025-03 | 0.2 | 電源関連の説明を改訂し、図3-1および6-3を更新 |
| 2024-12 | 0.1 | 草案 |

</div>

このガイドは上記データシートの内容に基づいています。正式かつ最新の情報については、公式PDFを参照してください。
