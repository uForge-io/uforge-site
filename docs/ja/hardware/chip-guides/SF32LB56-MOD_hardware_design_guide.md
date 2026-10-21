---
icon: lucide/book-check
description: "SF32LB56-MOD Bluetooth MCUモジュールのハードウェア設計ガイド。電源、インターフェース、PCB実装の要点を説明します。"
tags:
  - ハードウェア
  - モジュール
hide:
    - navigation
---

# SF32LB56-MODハードウェア設計ガイド { #sf32lb56-mod-hardware-design-guide }

## 1. はじめに { #1-introduction }

**SF32LB56-MOD**は、SF32LB56xVシリーズをベースとする、SiFliの汎用低消費電力Bluetooth MCUモジュールファミリーです。

本ガイドは、**DS5602-SF32LB56-MOD技術仕様書V0.3**を参照し、回路図設計、PCBレイアウト、検証、量産準備に必要なモジュール固有の情報をまとめています。メモリー構成、89ピンのインターフェース、3系統の電源、ディスプレイ／オーディオ／ストレージの各インターフェース、アンテナ配置、取り扱い要件、回路図チェックリストを扱います。

!!! note "出典と設計上の推奨事項"
    特に統合設計上の指針または設計推奨事項と明記した箇所を除き、以下の技術値は**DS5602-SF32LB56-MOD技術仕様書V0.3**に基づいています。

## 2. デバイス概要 { #2-device-overview }

### 2.1 アーキテクチャ { #21-architecture }

SF32LB56-MODは、SF32LB56xVシリーズのデュアルコアMCUプラットフォームを採用しています。HCPUはアプリケーションとグラフィックス処理を担い、LCPUは低消費電力の常時動作タスクを担います。HCPUは最大240 MHzで動作するArm Cortex-M33 STAR-MC1コア、LCPUは最大96 MHzで動作する同型のコアです。両コアともFPUとMPUをサポートします。

モジュールはBluetooth 5.3による無線通信に対応し、ディスプレイアクセラレーション、オーディオ入出力、外部メモリーインターフェース、USB 2.0 FS、SD/SDIO/eMMC、I2S、UART、I2C、SPI、PWM、GPADC、およびデバッグ／ダウンロード用インターフェースを備えています。

### 2.2 バリエーション { #22-variants }

<div align="center"><em>表 2.2-1: SF32LB56-MODシリーズのバリエーション</em></div>

<div align="center" markdown>

| モジュール型番 | メインFlash | PSRAM | バックアップFlash | 動作温度 | 外形寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16MB QSPI-NOR | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-A128R12N1 | 128MB QSPI-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-D128R12N1 | 128MB SD-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |

</div>

### 2.3 主なハードウェア機能 { #23-major-hardware-features }

<div align="center"><em>表 2.3-1: 主なハードウェア機能</em></div>

<div align="center" markdown>

| 項目 | 機能 |
| :--- | :--- |
| CPU | HCPUは最大240 MHz、LCPUは最大96 MHz。いずれもArm Cortex-M33 STAR-MC1 |
| 無線通信 | BLE Audio対応のデュアルモードBluetooth 5.3 |
| グラフィックス | ePicasso 2.0、eZip 2.0、TurboPixel、LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| オーディオ | 24-bit DAC、24-bit Sigma-Delta ADC、PDMインターフェース×2（PDM1/PDM2、各インターフェースに左右チャンネルでマイクを2個接続でき、合計最大4個）、I2S×1 |
| AI/DSP | 最大1.92 GOPSの行列アクセラレーター、FFT、FIR、CORDIC |
| ストレージ | モジュールのFlash/PSRAM構成、MPI3、SD/SDIO/eMMCに対応 |
| セキュリティ | AES、HASH、CRC、TRNG、Secure Boot、1024-bit eFuse、PSA Certified Level 1 |
| アンテナ | PCBオンボードアンテナ、またはIPEX互換コネクター経由の外部アンテナ |

</div>

### 2.4 主な用途 { #24-typical-applications }

主な用途として、ハイエンドスマートウォッチ、スマートバンド、ウェアラブル医療機器、フィットネス機器、電動自転車の操作パネル、スマートキー、車両向けウェアラブルリモコン、スマート家電、スマートロック、グラフィカルHMI機器、産業用センサーハブ、産業用監視端末、低消費電力センサーハブ、Bluetooth Mesh機器などが挙げられます。

## 3. 設計の要点 { #3-design-at-a-glance }

### 3.1 設計要点一覧 { #31-one-page-engineering-summary }

<div align="center"><em>表 3.1-1: 設計要点一覧</em></div>

<div align="center" markdown>

| 項目 | 設計上の指針 |
| :--- | :--- |
| 電源レール | VDD_3V3、VDD_1V8、VDDIOを供給します。3系統は同時に立ち上げる必要があります。 |
| デカップリング | VDD_3V3、VDD_1V8、VDDIOの各モジュールピン近くに4.7 µFコンデンサーを配置します。 |
| I/O電圧 | VDDIOは1.7～3.6 Vに対応しますが、PA00～PA11は3.3 V固定です。接続する周辺機器すべての電圧レベルを確認してください。 |
| デバッグ／ダウンロード | UART4_TXD/UART4_RXDはデフォルトのログ出力／ダウンロード／デバッグ用UARTピンです。SWDIO/SWCLKはSWDダウンロードに使用できます。 |
| 起動モード | BOOT_MODEがHighの場合はダウンロードモード、Lowの場合はユーザーモードを選択します。 |
| 内蔵Flashとの競合 | PA06～PA11は標準でモジュール内蔵Flashに接続されているため、外部からは使用できません。 |
| SDIO/MPI3の競合 | SDIOとMPI3はI/Oリソースを共有しており、同時には使用できません。 |
| ウェイクアップ要因 | PA50、PA51、PB32、PB35はMCUのスリープ中に割り込みを受け付けます。 |
| PWRKEY | PB32はアクティブHighの10秒長押しリセットに対応し、10 kΩのプルダウンが必要です。 |
| アンテナ | PCBアンテナ領域には銅箔、配線、部品、金属を配置しないでください。アンテナを基板端から張り出せない場合は、15mm以上のクリアランスを確保します。 |
| 製造 | MSL 3です。開封後は25±5°C/60%RHで168時間以内に使用し、それを超えた場合は再使用前にベーキングしてください。 |

</div>

### 3.2 推奨外付け部品 { #32-recommended-external-components }

<div align="center"><em>表 3.2-1: 推奨外付け部品</em></div>

<div align="center" markdown>

| 回路 | 部品 | 配置／備考 |
| :--- | :--- | :--- |
| VDD_3V3 | 4.7 µFコンデンサー | モジュールの電源ピン近くに配置します。 |
| VDD_1V8 | 4.7 µFコンデンサー | モジュールの電源ピン近くに配置します。 |
| VDDIO | 4.7 µFコンデンサー | モジュールの電源ピン近くに配置します。 |
| PB32/PWRKEY | 10 kΩプルダウン | アクティブHighの長押しリセットに必要です。 |
| LCD RGB信号 | 33～100 Ωの直列抵抗 | RGB信号ラインに直列に挿入します。 |
| PA16/PA17デバッグUART | 100 Ωの直列抵抗 | 多重化されたプログラムダウンロード／デバッグUARTインターフェースに必要です。 |
| タッチパネル／ユーザー用コネクター | ESD保護 | TPなど外部に露出するインターフェースにESD保護素子を配置します。 |

</div>

### 3.3 電源ツリー { #33-power-tree }

VDD_3V3は、MCUのPVDD、AVDD33_ANA、AVDD33_AUD、AVDD_BRF、VDDIOA2、およびモジュール内蔵Flashに給電します。SiFliはこの電源レールにLDOを使用することを推奨しています。VDD_1V8はMCUと同一パッケージ内のメモリーに給電し、VDDIOはMCUのVDDIOA/VDDIOB I/Oポートに給電します。

!!! info "図 3.3-1: SF32LB56-MOD電源系統図"
    DS5602 V0.3の図7-1を参照してください。

### 3.4 システムブロック図 { #34-system-block-diagram }

モジュールのブロック図には、SF32LB56xV MCU、メモリーリソース、RF経路、アンテナの選択肢、電源入力、外部インターフェース群が示されています。

!!! info "図 3.4-1: SF32LB56-MOD機能ブロック図"
    DS5602 V0.3の図2-1を参照してください。

## 4. ハードウェア設計フロー { #4-hardware-design-flow }

### 4.1 設計手順 { #41-design-sequence }

1. ファームウェア容量、グラフィックスアセット、外部ストレージの要否、コスト目標に基づいてメモリー構成を選定します。
2. 機構設計を確定する前に、PCBアンテナまたは外部アンテナのバリエーションを選びます。
3. VDD_3V3、VDD_1V8、VDDIOの電源構成を定義し、同時に立ち上がることを確認します。
4. ディスプレイ、ストレージ、USB、オーディオ、センサー、ウェイクアップ、デバッグ、量産テスト用のピンを割り当てます。
5. 特にSDIOとMPI3の競合、および内部接続されるPA06～PA11のFlashピンなど、共有リソースの競合を解消します。
6. デカップリング、ESD保護、PWRKEYプルダウン、LCD直列抵抗、デバッグUART直列抵抗を追加します。
7. 必要なアンテナクリアランスとキープアウトを確保してモジュールを配置します。
8. リリース前に、セクション7のチェックリストに照らして回路図とPCBをレビューします。

### 4.2 レビュー手順 { #42-review-sequence }

レビューは段階的に実施します。回路図、ピンマルチプレクス、電源投入、RF／アンテナ、レイアウト、初回試作機の立ち上げ、RF検証、環境／信頼性、量産テストの順に確認してください。

### 4.3 マイルストーン { #43-milestones }

<div align="center"><em>表 4.3-1: 推奨ハードウェアマイルストーン</em></div>

<div align="center" markdown>

| マイルストーン | 必要な確認事項 |
| :--- | :--- |
| 回路図確定 | バリエーション選定、ピン競合の解消、電源レールの確認、チェックリストの完了。 |
| レイアウト確定 | アンテナのキープアウト確認、電源デカップリングの配置、高速インターフェースのレビュー。 |
| EVT立ち上げ | 電源レール、起動モード、UART/SWD、Flash、ディスプレイ、USB、オーディオ、RFの初期動作テストに合格。 |
| DVT | RF通信距離、電流、熱、スリープ／ウェイクアップ、ESD対策、筐体の影響を検証。 |
| 量産リリース | 書き込み、テストパッド、検査規則、MSL／リフロー取り扱い、改訂記録を確定。 |

</div>

## 5. 回路図設計 { #5-schematic-design }

### 5.1 電源システム { #51-power-system }

#### 5.1.1 電源 { #511-power-supply }

<div align="center"><em>表 5.1-1: 電源レール</em></div>

<div align="center" markdown>

| 電源レール | 推奨動作範囲 | 用途 |
| :--- | :--- | :--- |
| VDD_3V3 | 2.97～3.6 V | MCUのPVDD、3.3 Vアナログ電源ドメイン、RFアナログドメイン、VDDIOA2、内蔵Flash。 |
| VDD_1V8 | 1.7～1.95 V | MCUと同一パッケージに封止されたメモリーの電源。 |
| VDDIO | 1.7～3.6 V | MCUのVDDIOA/VDDIOB I/O電源。 |

</div>

VDD_3V3、VDD_1V8、VDDIOは同時に立ち上げてください。各モジュール電源ピンの近くに4.7 µFコンデンサーを配置します。VDDIOの動作範囲は1.7～3.6 Vですが、データシートにはPA00～PA11が3.3 V固定であり、VDDIOには追従しないと明記されています。

#### 5.1.2 動作モード { #512-operating-modes }

BOOT_MODEで起動動作を選択します。Highでダウンロードモード、Lowでユーザーモードになります。リセット中および量産書き込み時にBOOT_MODEの状態が確定するようにしてください。PB32/PWRKEYはアクティブHighの10秒長押しリセットに対応し、10 kΩのプルダウンが必要です。

### 5.2 クロックとRF { #52-timing-and-rf }

#### 5.2.1 クロック { #521-clock }

モジュールのプラットフォームは48 MHz水晶発振子を使用し、1 MHz/48 MHzの低消費電力RC発振器、10 kHzの超低消費電力RC発振器、およびオプションの32.768 kHz水晶発振子に対応しています。クロック関連の配線とグラウンディングはモジュールのリファレンスデザインに合わせてください。また、内蔵水晶に機械的な負荷を与える超音波工程は避けてください。

#### 5.2.2 RF { #522-rf }

<div align="center"><em>表 5.2-1: Bluetooth RF特性の概要</em></div>

<div align="center" markdown>

| 項目 | 値 |
| :--- | :--- |
| Bluetooth周波数範囲 | 2402～2480 MHz |
| BLE最大送信出力 | 19 dBm |
| BLE RF出力制御範囲 | -20～19 dBm |
| BLE 1Mbps感度 | dirty offで-100 dBm、dirty onで-99.3 dBm |
| BLE 2Mbps感度 | dirty offで-97 dBm、dirty onで-96.5 dBm |
| BR最大送信出力 | 19 dBm |
| EDR最大送信出力 | 13 dBm |
| BR感度 | dirty offで-96.3 dBm、dirty onで-94 dBm |
| EDR2感度 | dirty offで-95.5 dBm、dirty onで-95 dBm |
| EDR3感度 | dirty offで-88.5 dBm、dirty onで-87 dBm |

</div>

本モジュールはPCBオンボードアンテナ、またはIPEX互換コネクター経由の外部アンテナに対応しています。通信距離とRF性能は、オープンベンチ上だけでなく、最終筐体に組み込んだ状態でも検証してください。

### 5.3 ユーザーインターフェース { #53-user-interfaces }

#### 5.3.1 ディスプレイ { #531-display }

LCDコントローラーはDBIシリアルSPI、Dual-SPI、Quad-SPI、8080パラレル、DPI/RGB、JDIに対応しています。データシートの推奨ピン割り当て図には、LCD_DPI_24、LCD_DPI_8、LCD_QSPI、LCD_8080、電子ペーパー、およびRaspberry Pi形式の各ピン群とモジュールピンとの対応が示されています。

LCD RGB信号ラインには33～100 Ωの直列抵抗を追加してください。RGB、SPIディスプレイ、タッチパネルの配線は短く、配線条件を揃えます。タッチパネルやコネクターなど外部に露出するインターフェースにはESD保護を設けてください。

!!! info "図 5.3-1: 開発ボードの推奨ピン割り当て"
    DS5602 V0.3の図7-6を参照してください。

#### 5.3.2 オーディオ { #532-audio }

本モジュールには、アナログオーディオDAC出力、MIC_BIAS、MIC_ADC_IN、I2S、およびPDM対応ピンがあります。オーディオDACは24-bit出力で、サンプリングレート8 kHz～48 kHzに対応し、SNRおよびダイナミックレンジは109 dBです。オーディオADCは24-bit Sigma-Delta入力で、サンプリングレート8 kHz～48 kHzに対応し、SNRおよびダイナミックレンジは99 dBです。

アナログオーディオ配線は、ノイズの多いスイッチングノード、LCDクロック、アンテナ給電部から離してください。MIC_BIASとMIC_ADC_INのフィルターは、接続するマイク回路の近くに配置します。

#### 5.3.3 ボタン { #533-buttons }

PB32はPWRKEY入力で、アクティブHighの10秒長押しリセットに対応しています。必須の10 kΩプルダウンを追加し、輸送中、ディープスリープ中、電源シーケンス中にボタン回路がフローティング状態にならないようにしてください。

#### 5.3.4 モーターおよびPWM負荷 { #534-motor-and-pwm-loads }

データシートの推奨ピン割り当て図でGPTIMと記されたピンはPWM出力に対応しています。モーター、バックライト、ブザーなどの負荷には外付けドライバーを使用し、誘導性負荷や大電流負荷をモジュールのGPIOから直接駆動しないでください。

### 5.4 ストレージと接続インターフェース { #54-storage-and-connectivity }

#### 5.4.1 ストレージ { #541-storage }

本モジュールファミリーでは、SKUに応じたメインFlash、4+8MB OPI-PSRAM、1MBのバックアップQSPI-NOR Flashを利用できます。MPI3には外付けSPI NORまたはSPI NANDを接続できますが、PA06～PA11は標準でモジュール内蔵Flashに接続されているため、外部からは使用できません。SDIOとMPI3はI/Oリソースを共有しており、同時には使用できません。

#### 5.4.2 センサー { #542-sensors }

GPADCは12-bit変換、最大4MS/sのサンプリングレート、0～3.3 Vのシングルエンド入力範囲、-2.1 V～+2.1 Vの差動入力範囲に対応し、ソフトウェア／ハードウェアトリガーおよびDMAを利用できます。GPADC_CHxと記されたピンはアナログ入力に対応します。アナログ配線は短くしてフィルターを設け、LCDやRFのスイッチングノイズから離してください。

#### 5.4.3 UART/I2C { #543-uarti2c }

UARTは最大6Mbpsの全二重通信に対応しています。I2CはStandard 100kbps、Fast 400kbps、Fast-mode Plus 1Mbps、High-speed 3.4Mbpsに対応しています。多くのGPIOは`PAxx_I2C_UART`または`PBxx_I2C_UART`として多重化されています。回路図を確定する前に、最終的なピンマルチプレクスを確認してください。

6番ピンのUART4_TXDと7番ピンのUART4_RXDは、デフォルトのログ出力用シリアルポートであり、プログラムのダウンロード／デバッグにも使用できます。PA16とPA17はDBG_UARTに多重化でき、プログラムのダウンロード／デバッグに使用する場合は100 Ωの直列抵抗が必要です。

#### 5.4.4 USB、SPI、SDIO、I2S { #544-usb-spi-sdio-and-i2s }

USB2.0 FSはPHYを内蔵し、Host/Deviceモードに対応しています。SPIはSSP/SPIおよびMicrowire形式に対応し、HPSYSのSPIは最大48 MHz、LPSYSのSPIは最大24 MHzで動作します。SDMMC1はSD 3.0、SDIO 3.0、eMMC 4.5.1に対応し、SDRおよびDDRモードを利用できます。SDMMC2はSD/SDIO/eMMC機能に対応し、SDRモードで最大48 MHzです。I2Sはマスター／スレーブ、全二重、Left/Right/Standard形式、および最大24-bit PCM幅に対応しています。

### 5.5 製造 { #55-manufacturing }

#### 5.5.1 デバッグ { #551-debug }

79番ピンのSWDIOと80番ピンのSWCLKは、SWDデバッグ／ダウンロード用ピンです。初期試作機と量産治具でSWDにアクセスできるようにしてください。別の承認済み書き込み手段がない場合は、デフォルトのUART4ダウンロード／デバッグ経路も外部に引き出してください。

#### 5.5.2 量産 { #552-production }

量産工程で電源、グラウンド、起動モード、リセット／PWRKEY、SWD、UARTダウンロード、および基板レベルの校正やRF試験用インターフェースにアクセスできるようにしてください。最終テスト用ソフトウェアでは、起動、Flash、ディスプレイ、タッチ、オーディオ、USB、センサー、RF通信、スリープ／ウェイクアップ動作、消費電流を確認します。

## 6. PCBレイアウト { #6-pcb-layout }

### 6.1 外形とフットプリント { #61-mechanical-and-footprint }

モジュールの外形寸法は18.0 × 32.9 × 3.1mmです。データシートの推奨PCBフットプリントを使用し、ランドパターン、ソルダーマスクの拡張、メタルマスク開口、キープアウト、部品配置境界（courtyard）をPCB実装業者と確認してください。

!!! info "図 6.1-1: SF32LB56-MODの外形寸法"
    DS5602 V0.3の図8-1を参照してください。

!!! info "図 6.1-2: 推奨PCBフットプリント"
    DS5602 V0.3の図8-2を参照してください。寸法の単位はmmです。

### 6.2 アンテナ配置 { #62-antenna-placement }

製品でPCBオンボードアンテナを使用する場合は、アンテナ領域に部品や金属を配置しないでください。可能であればアンテナ領域がキャリア基板の端から張り出すようにモジュールを配置し、給電点を基板端近くに置きます。

アンテナを基板端から張り出せない場合は、15mm以上のクリアランスを確保してください。この領域には銅箔、配線、部品を配置せず、可能な限りPCBアンテナ直下のキャリア基板を切り欠いてください。

!!! info "図 6.2-1: 推奨モジュール配置"
    DS5602 V0.3の図8-4を参照してください。

!!! info "図 6.2-2: PCBアンテナのクリアランス領域"
    DS5602 V0.3の図8-5を参照してください。

### 6.3 外部アンテナコネクター { #63-external-antenna-connector }

外部アンテナを使用する設計では、データシートに記載された第1世代の外部アンテナコネクターを使用します。このコネクターはHirose U.FLシリーズ、I-PEX MHF I、Amphenol AMCの各コネクターと互換性があります。

!!! info "図 6.3-1: 外部アンテナコネクターの寸法"
    DS5602 V0.3の図8-3を参照してください。

### 6.4 レイアウトチェックリスト { #64-layout-checklist }

<div align="center"><em>表 6.4-1: PCBレイアウトチェックリスト</em></div>

<div align="center" markdown>

| 項目 | 確認内容 |
| :--- | :--- |
| 電源 | VDD_3V3、VDD_1V8、VDDIOの各ピン近くに4.7 µFコンデンサーを配置している。 |
| グラウンド | モジュールのグラウンドピンを低インピーダンスのグラウンド系に接続し、高速信号およびRF配線の近くにビアを配置している。 |
| アンテナ | アンテナのキープアウトに銅箔、配線、部品、ねじ、シールド、バッテリー金属、筐体金属が侵入していない。 |
| ディスプレイ | LCD RGB/SPIラインを短く配線し、インピーダンスに配慮したうえで、必要な直列抵抗を実装している。 |
| USB | USB DP/DMを等長の差動ペアとして配線し、コネクター近くにESD保護を配置している。 |
| アナログオーディオ | MIC_BIAS、MIC_ADC_IN、DAC出力をスイッチングレギュレーター、LCDクロック、RF給電領域から離している。 |
| デバッグ | 試作機および量産治具からSWDとUARTダウンロード／デバッグにアクセスできる。 |

</div>

## 7. ハードウェア検証 { #7-hardware-validation }

### 7.1 電気的特性 { #71-electrical-characteristics }

<div align="center"><em>表 7.1-1: 絶対最大定格</em></div>

<div align="center" markdown>

| 記号 | 説明 | 最小 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V電源入力 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8 V電源入力 | -0.3 | 1.95 | V |
| VDDIO | I/O電源入力 | -0.3 | 3.6 | V |
| Tstore | 保存温度 | -40 | 125 | °C |

</div>

<div align="center"><em>表 7.1-2: 推奨動作条件</em></div>

<div align="center" markdown>

| 記号 | 説明 | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V電源入力 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8 V電源入力 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O電源入力 | 1.7 | - | 3.6 | V |
| TA | 動作温度 | -40 | - | 85 | °C |

</div>

<div align="center"><em>表 7.1-3: DC電気的特性（3.3 V、25°C）</em></div>

<div align="center" markdown>

| 記号 | パラメーター | 最小 | 標準 | 最大 | 単位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | ピン容量 | 2.5 | 3 | 3.5 | pF |
| VIH | 入力High電圧 | 0.7×VDD | - | VDD | V |
| VIL | 入力Low電圧 | VSS | - | 0.3×VDD | V |
| IIH | 入力High電流 | - | 10 | 40 | nA |
| IIL | 入力Low電流 | - | 10 | 40 | nA |
| VOH | 出力High電圧（High-Z負荷） | 0.8×VDD | - | VDD | V |
| VOL | 出力Low電圧（High-Z負荷） | VSS | - | 0.2×VDD | V |
| IOH | 出力High駆動電流 | 24 | 30 | 38 | mA |
| IOL | 出力Low駆動電流 | 24 | 30 | 38 | mA |
| RPU | 内蔵プルアップ | 7 | 10 | 20 | kΩ |
| RPD | 内蔵プルダウン | 7 | 10 | 20 | kΩ |
| VIH_nRST | リセット解除電圧 | 0.7×VDD | - | VDD | V |
| VIL_nRST | リセットアサート電圧 | VSS | - | 0.3×VDD | V |

</div>

VDDはI/O電源です。VOHとVOLは高インピーダンス負荷で測定されています。

### 7.2 消費電流 { #72-power-consumption }

<div align="center"><em>表 7.2-1: BluetoothおよびBLEの消費電流（3.3 V、TX出力0 dBm）</em></div>

<div align="center" markdown>

| モード | 条件 | 標準電流 |
| :--- | :--- | :-: |
| BT Sniff | 間隔50 ms | 196.0 µA |
| BT Sniff | 間隔1 s | 13.8 µA |
| BLE ADV | 間隔50 ms | 228.7 µA |
| BLE ADV | 間隔1 s | 15.7 µA |
| BLE接続 | 間隔50 ms | 172.8 µA |
| BLE接続 | 間隔1 s | 11.5 µA |
| スキャン | Inquiry ScanまたはPage Scan | 36.8 µA |
| 両方のスキャン | Inquiry ScanとPage Scan | 64.0 µA |
| Standby | - | 4.6 µA |

</div>

<div align="center"><em>表 7.2-2: プロセッサー消費電流</em></div>

<div align="center" markdown>

| ワークロード | ドメイン | 周波数 | 電流 | MHzあたりの電流 |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9.38 mA | 30.92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7.90 mA | 30.92 µA/MHz |
| CoreMark | HPSYS | 48 MHz | 0.92 mA | 30.92 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0.55 mA | 15.13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7.54 mA | 25.75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6.30 mA | 25.75 µA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0.70 mA | 25.75 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0.44 mA | 10.63 µA/MHz |

</div>

### 7.3 回路図チェックリスト { #73-schematic-checklist }

<div align="center"><em>表 7.3-1: 回路図設計チェックリスト</em></div>

<div align="center" markdown>

| 番号 | 確認項目 |
| :-: | :--- |
| 1 | VDD_3V3の入力範囲は2.97～3.6 Vです。モジュールピンの近くに4.7 µFコンデンサーを配置してください。 |
| 2 | VDD_1V8の入力範囲は1.7～1.95 Vです。モジュールピンの近くに4.7 µFコンデンサーを配置してください。 |
| 3 | VDDIOの入力範囲は1.7～3.6 Vです。モジュールピンの近くに4.7 µFコンデンサーを配置してください。 |
| 4 | 指定されたモジュールI/Oインターフェースの電圧レベルは3.3 Vです。接続する周辺機器との電圧レベルが適合することを確認してください。 |
| 5 | モジュールに内蔵Flashが搭載されている場合、PA06、PA07、PA08、PA09、PA10、PA11は外部から使用できません。 |
| 6 | SDIOとMPI3はI/Oリソースを共有しているため、同時には使用できません。 |
| 7 | PA50、PA51、PB32、PB35はMCUのスリープ中に割り込みを受け付けます。 |
| 8 | PB32はアクティブHighの10秒長押しリセットに対応します。10 kΩのプルダウンを追加してください。 |
| 9 | GPADC_CHxと記されたピンは0～3.3 Vのアナログ入力に対応します。 |
| 10 | GPTIMと記されたピンはPWM出力に対応します。 |
| 11 | TPなどのインターフェースにはESD保護素子が必要です。 |
| 12 | LCD RGB信号には33～100 Ωの直列抵抗が必要です。 |
| 13 | DBG_UARTに多重化されたPA16とPA17はプログラムのダウンロード／デバッグ用ピンであり、100 Ωの直列抵抗が必要です。 |

</div>

### 7.4 保管・取り扱い・実装 { #74-storage-handling-and-assembly }

<div align="center"><em>表 7.4-1: 保管・取り扱い・実装要件</em></div>

<div align="center" markdown>

| 項目 | 要件 |
| :--- | :--- |
| 密封MBBでの保管 | 結露しない環境で40°C未満／90%RH未満。 |
| 吸湿感度 | MSL 3。 |
| 真空袋の開封後 | 25±5°C / 60%RHで168時間以内に使用するか、再使用前にベーキングしてください。 |
| ESD HBM | ±2000 V。 |
| ESD CDM | ±500 V。 |
| リフロー | SiFliはモジュールのリフローを1回のみ推奨しています。 |
| 超音波工程 | 超音波溶着や超音波洗浄は避けてください。振動により内蔵水晶が損傷または劣化するおそれがあります。 |

</div>

!!! info "図 7.4-1: リフロー温度プロファイル"
    DS5602 V0.3の図9-1を参照してください。

## 8. 関連資料 { #8-related-documents }

<div align="center"><em>表 8-1: 関連資料と製品</em></div>

<div align="center" markdown>

| 種別 | 項目 |
| :--- | :--- |
| モジュールデータシート | [DS5602-SF32LB56-MOD技術仕様書V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| チップ仕様書 | SF32LB56xチップ技術仕様書 |
| 開発ボードガイド | SF32LB56-DevKit-LCDユーザーガイド |
| チップファミリー | SF32LB56xVシリーズ |
| モジュール | SF32LB56-MOD |
| 開発ボード | SF32LB56-DevKit-LCD |

</div>

## 9. 付録 { #appendices }

### 9.1. 付録A. ピン割り当ての参考情報 { #appendix-a-pin-planning-reference }

DS5602 V0.3には、89ピンすべての定義表と上面視ピン配置図が掲載されています。以下の表では、回路図上のリスク、起動／デバッグへのアクセス、共有リソースの割り当てに特に影響するピンと信号群を抜粋しています。

<div align="center"><em>表 9.1-1: 重要なピンと信号群</em></div>

<div align="center" markdown>

| ピン／信号群 | 機能／制約 |
| :--- | :--- |
| 6番ピンPB17 | UART4_TXD。デフォルトのログ出力／ダウンロード／デバッグ用UARTのTX。 |
| 7番ピンPB16 | UART4_RXD。デフォルトのログ出力／ダウンロード／デバッグ用UARTのRX。 |
| 25番ピンBOOT_MODE | High: ダウンロードモード、Low: ユーザーモード。 |
| 26番ピンVDD_3V3 | 3.3 V電源レール、動作範囲2.97～3.6 V。 |
| 27番ピンVDD_1V8 | 1.8 V電源レール、動作範囲1.7～1.95 V。 |
| 29番ピンVDDIO | I/O電源レール、動作範囲1.7～3.6 V。 |
| 43/44番ピン | AU_DACP/AU_DACN差動DAC出力。 |
| 46番ピンMIC_BIAS | マイクバイアス出力。 |
| 47番ピンMIC_ADC_IN | アナログマイクADC入力。 |
| 67～72番ピンPA06～PA11 | 標準で内蔵Flashに接続されており、外部からは使用不可。 |
| 79番ピンPB13 | SWDIOデバッグ／ダウンロード。 |
| 80番ピンPB15 | SWCLKデバッグ／ダウンロード。 |
| PA50、PA51、PB32、PB35 | スリープ中の割り込みによるウェイクアップに対応するピン。 |
| PA00～PA11 | インターフェース電圧はVDDIOにかかわらず3.3 V固定。 |

</div>

## 10. 改訂履歴 { #appendix-b-revision-history }

### 10.1. ガイドの改訂履歴 { #guide-revision-history }

<div align="center"><em>表 10.1-1: 本ガイドの改訂履歴</em></div>

<div align="center" markdown>

| バージョン | 日付 | 備考 |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | DS5602-SF32LB56-MOD V0.3に基づくSF32LB56-MODモジュールハードウェア設計ガイドの初版。 |

</div>

### 10.2. 出典データシートの改訂履歴 { #source-datasheet-revision-history }

<div align="center"><em>表 10.2-1: 出典データシートの改訂履歴</em></div>

<div align="center" markdown>

| 日付 | バージョン | 改訂内容 |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | 第4章のオーディオADCおよびDACの説明を更新。 |
| 2025-02 | 0.2 | モジュールのピンおよび関連情報を更新。 |
| 2025-01 | 0.1 | ドラフト版。 |

</div>
