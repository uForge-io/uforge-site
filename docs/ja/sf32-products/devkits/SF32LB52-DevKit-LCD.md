---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD: タッチ、オーディオ、ストレージ、バッテリー対応を備えたSPI、QSPI、MCU/8080ディスプレイ製品を素早く立ち上げるための、ディスプレイ重視のSF32LB52x開発ボード。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## 概要 { #overview }

SF32LB52-DevKit-LCDは、SF32LB52xファミリー向けの、ディスプレイ重視の開発ボードです。SF32LB52xモジュールを搭載し、SPI、DSPI、QSPI、またはMCU/8080ディスプレイインターフェースを使用する製品をすばやく開発・評価できます。

この評価ボードには、MCUモジュール、ディスプレイコネクター、タッチインターフェース、アナログマイク入力、アナログオーディオ出力、USB Type-C、USB-UARTデバッグ、TFカードスロット、バッテリー接続機能がまとまっています。スマートウォッチ風HMI、コンパクトなダッシュボード、ディスプレイ周辺機器など、開発初期から画面を使うSF32LB52x製品の評価に適しています。

![SF32LB52-DevKit-LCD前面図](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 正面図</em></div>

![SF32LB52-DevKit-LCD背面図](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 背面図</em></div>

![SF32LB52-DevKit-LCDブロック図](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — ブロック図</em></div>

## ボードの主な特長 { #board-highlights }

- SF32LB52-MOD-1、SF32LB52-MOD-A、SF32LB52-MOD-Bと互換性のあるSF32LB52xモジュールプラットフォーム
- 22ピンFPCコネクターを通じたQSPI/SPI/DSPI LCDサポート
- FPCと40ピン拡張ヘッダーを通じた8ビットMCU/8080 LCDサポート
- I2Cタッチパネルサポート
- USB-UART書き込み/デバッグとボード電源用のUSB-C
- USB 2.0 FS用の独立したUSB-Cインターフェース
- オンボードMEMSマイクとClass-Dオーディオパワーアンプ
- SPIを使用するMicroSDカードスロット
- バッテリーコネクターとETA9640Pリニア充電器
- ディスプレイ、GPIO、ストレージ、オーディオ、電源信号用の40ピン拡張ヘッダー

## このボードが適している用途 { #when-to-use-this-board }

最小限のブレイクアウトボードではなく、すぐに使えるディスプレイ評価プラットフォームが必要な場合は、SF32LB52-DevKit-LCDを選択してください。

- QSPI、SPI、DSPI、またはMCU/8080のLCDパネルの立ち上げ
- タッチパネル統合の検証
- SF32LB52x上でのLVGLまたはカスタムUIアプリケーションのテスト
- マイク入力とスピーカー出力の評価
- TFカードストレージのプロトタイピング
- 独自PCBの設計を確定する前のモジュール構成の比較

より小型で、基板端に半円形のめっきスルーホールを備えたボードには [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md) を使用してください。ピンの引き出し数が最も多く、信号に直接アクセスしたい場合は、[SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md) を使用してください。

## ハードウェア構成 { #hardware-configuration }

<div align="center"><em>ハードウェア構成の概要</em></div>

<div align="center" markdown>

| 領域 | 構成 |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6；16 MB QSPI-NOR + 8 MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6；128 MB QSPI-NAND + 16 MB OPI-PSRAM |
| クロック | モジュール上の48 MHzメイン水晶と32.768 kHz RTC水晶 |
| RF | 0Ω抵抗で選択するオンボードアンテナまたはIPEXコネクター |
| ディスプレイ | QSPI/SPI/DSPIおよび8ビットMCU/8080 |
| タッチ | I2Cタッチインターフェース |
| オーディオ | MEMSマイク入力とClass-Dスピーカーアンプ |
| ストレージ | SPI経由のMicroSDカードスロット |
| USB | USB-UART Type-CとUSB 2.0 FS Type-C |
| バッテリー | 単セルLi-ion/Li-polyバッテリーコネクター |
| 充電器 | ETA9640Pリニア充電器、デフォルト充電電流450 mA |

</div>

上記の型番とメモリー構成は、SiFliの[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)に基づいています。ボードを設計の基準として使う前に、基板の表示と対応する設計データ一式でリビジョンを確認してください。

A128R16のFlash表記は公式資料間で異なります。[OpenSiFliのモジュール型番ガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)ではモジュールが128 MB SPI-NANDとされる一方、開発ボード型番ガイドでは対応するDevKit SKUが128 MB QSPI-NANDとされています。資料には、実装部品の違いなのかインターフェース表記の違いなのか説明がありません。この構成を前提にする前に、対象ボードのリビジョンに対応する回路図/BOMでFlash部品とバスモードを確認してください。

## バージョンに関する注記 { #version-notes }

<div align="center"><em>ボードバージョン履歴</em></div>

<div align="center" markdown>

| バージョン | モジュールのベース | 注記 |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | SDカード検出をPA26に変更。現在のSiFli型番ガイドには、上表の2つのMOD-1構成が掲載されています。 |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | 充電回路、電源切替、オーディオPAゲイン、リセット動作、RGB LED回路、モジュールピン互換性、RF電源フィルタリング、デュアルFlashサポート、SDカード検出、オプションのSDIO Wi-Fi、アンテナキープアウト、VBUS保護を更新 |
| V1.0.0 | 旧世代のSF32LB52モジュール | 初期公開ボードバージョン |

</div>

量産キャリアボードや治具設計にピンマップを使用する前に、シルク印刷と設計データ一式で正確なボードリビジョンを確認してください。

![SF32LB52-DevKit-LCD前面の注釈付き図](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 注釈付き正面図</em></div>

![SF32LB52-DevKit-LCD背面の注釈付き図](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 注釈付き背面図</em></div>

## はじめに { #getting-started }

### 必要なハードウェア { #required-hardware }

- SF32LB52-DevKit-LCDボード
- 選択したインターフェースに対応するLCDモジュール
- USB 2.0データケーブル、Type-A to Type-Cまたはそれに相当するもの
- Windows、Linux、macOSを実行するホストコンピューター

### 任意のハードウェア { #optional-hardware }

- スピーカー
- TFカード
- 単セルLi-ion/Li-polyバッテリー、通常450～500 mAh
- UARTデバッグとネイティブUSBテストを同時に行う場合の2本目のUSBケーブル

### 基本セットアップ { #basic-setup }

1. LCDモジュールを正しいLCDコネクターに接続します。
2. USB-UART Type-Cポートをホストコンピューターに接続します。
3. SifliTraceまたはSiFliファームウェア書き込みツールを開きます。
4. 検出されたシリアルポートを選択します。
5. ボードに電源を入れ、対象のファームウェアを書き込むか実行します。
6. ディスプレイが点灯したら、アプリケーションが必要とするタッチ、グラフィックス、ストレージ、オーディオの各機能を確認します。

実際にデータ通信に対応したUSBケーブルを使用してください。充電専用ケーブルでもボードには給電できますが、シリアル通信もUSBデータ通信もできません。

## 電源 { #power }

SF32LB52-DevKit-LCDは主に2つの方法で給電できます。

- いずれかのUSBコネクターからのUSB Type-C電源
- オンボードのバッテリーコネクターを通じたバッテリー電源

ファームウェアの書き込みと通常のデバッグには、USB-UART Type-Cポートを使用してください。バッテリー電源は、ケーブルを接続していない状態でのディスプレイ、オーディオ、低消費電力動作をテストする際に便利です。

このボードにはETA9640Pリニア充電器が搭載されています。最大充電電流は1 A、デフォルトの定電流設定は450 mAです。単セルのLi-ionまたはLi-polyバッテリーを使用し、接続前にボードのシルク印刷でコネクターの極性を確認してください。

## 書き込みとデバッグ { #download-and-debug }

USB-UARTポートは、ファームウェアの書き込みとログのための主要なインターフェースです。

- **書き込みモード**: 書き込みツールでBOOTオプションを有効にしてから、ボードに電源を入れるかリセットしてください。
- **デバッグ/ログモード**: BOOTオプションを無効にしてから、ボードに電源を入れるかリセットして通常のシリアルログ動作に入ってください。

一部のSF32LB52xボードは、リセットにUSB-UARTのRTS信号を使用します。シリアルポートを最初に開いた際にボードが予期せずリセットされる場合は、ホスト側のシリアルポート設定でモデムまたはハードウェアフロー制御を無効にしてください。

![シリアルポートの詳細設定でモデムフロー制御を無効にする](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>シリアルポート設定でのモデムフロー制御の無効化</em></div>

## LCDとタッチインターフェース { #lcd-and-touch-interface }

このボードは、22ピン、0.5 mmピッチのFPCコネクターを通じてQSPI LCDパネルに接続できます。コネクターは垂直実装のフリップロック式です。パネルとピン配列が異なる場合は、接続前にアダプターボードを使用してください。

対応するLCDとタッチの機能は次のとおりです。

- SPI、DSPI、QSPIのLCD信号
- DDRモードのQSPI LCD信号
- 8ビットMCU/8080のLCD信号
- LCDリセット、チップセレクト、クロック、データ、TE、バックライトPWM
- I2CタッチパネルのSDA/SCL、割り込み、リセット

SiFliの元のボードノートでは、`TFT-H043A28WQISTKN22_V0-3`がサポートされているディスプレイモデルとして記載されています。

### 22ピンQSPI FPC信号マップ { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>22ピンQSPI FPC信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 機能 |
| :--- | :--- | :--- |
| 1 | LEDK | LCDバックライトカソード |
| 2 | LEDA | LCDバックライトアノード |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | LCDリセット |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V出力 |
| 18 | PA31 | タッチ割り込み |
| 19 | PA33 | タッチI2C SDA |
| 20 | PA30 | タッチI2C SCL |
| 21 | PA09 | タッチリセット |
| 22 | GND | グラウンド |

</div>

**FPCのピン数に関する資料の不一致（ディスプレイ接続前に確認）：** SiFliはコネクターと信号表を22ピンと記載していますが、付属の接続図では1～24番まで番号があり、22～24番がGNDになっています。資料ではこの不一致が説明されていません。FPCを選定または接続する前に、対象基板リビジョンの実物コネクターと回路図を確認し、22ピンケーブルが24接点コネクターに適合すると決めつけないでください。

## 主要なモジュールピン割り当て { #key-module-pin-assignments }

![SF32LB52-DevKit-LCDの40ピンヘッダー定義](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>40ピンヘッダー定義</em></div>

<div align="center"><em>主要なモジュールピン割り当て</em></div>

<div align="center" markdown>

| モジュールピン | 信号 | ボード機能 |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | 充電器接続検出 |
| PA43..PA37 | DB7..DB2 | MCU/8080 LCDデータ |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | LCDデータ |
| PA06 | DC / QSPI D1 | LCDデータ/コマンド |
| PA05 | RD / QSPI D0 | LCDデータ |
| PA04 | WR / QSPI CLK | LCDクロック |
| PA03 | CS / QSPI CS | LCDチップセレクト |
| PA02 | TE / QSPI TE | LCDティアリングエフェクト信号 |
| PA01 | BL_PWM | バックライト制御 |
| PA00 | RSTB | LCDリセット |
| PA33 / PA30 | I2C SDA / SCL | タッチパネル |
| PA31 / PA09 | Touch INT / RST | タッチパネル |
| PA24、PA25、PA28、PA29 | SPI1 | TFカードインターフェース |
| PA26 | カード検出 / LED | 共有機能 |
| PA20 / PA27 | UART RX/TX | ユーザーUART |
| PA18 / PA19 | デバッグUART RX/TX | 書き込みとソフトウェアデバッグ |
| PA10 | AU_PA_EN | オーディオアンプ有効化 |
| MIC_ADC_IN / MIC_BIAS | アナログマイク | マイク入力 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | アナログオーディオ | スピーカーアンプ入力 |

</div>

## モジュール互換性に関する注記 { #module-compatibility-notes }

- SF32LB52-MOD-1では、ピン17はデフォルトで無効になっている3.3 V出力で、使用するにはソフトウェアから有効にする必要があります。
- SF32LB52-MOD-A/Bでは、ピン17は3.3 V電源入力です。
- SF32LB52-MOD-1では、ピン27は3.2～4.7 VのVBAT入力です。
- SF32LB52-MOD-A/Bでは、ピン27は3.3 V電源入力です。
- SF32LB52-MOD-1のVBAT電源オン閾値は3.58 V、電源オフ閾値は3.48 Vです。バッテリーを使わずに電源を試験する場合は、VBATに3.8 Vを印加することを推奨します。
- モジュールピン62のPA21はSF32LB52-MOD-A/Bでのみ利用可能です。SF32LB52-MOD-1では接続されていません。
- モジュールピン62～68は、デフォルトで内部のNOR Flashに接続されている場合があります。SDIOを外部で使用するには、これらのピンに内部Flashを持たないモジュールバリアントを選択してください。

## オーディオ { #audio }

このボードにはMEMSマイクとオーディオパワーアンプが搭載されています。

- アナログオーディオ入力の検証には、オンボードマイクのパスを使用してください。
- オーディオ出力のテストにはスピーカーコネクターを使用してください。
- SiFliのボードノートによると、外部スピーカー出力は4 Ω負荷で最大3 Wに対応します。

## ストレージ { #storage }

MicroSDソケットはSPI経由で接続されています。カスタムボードに移行する前に、ファイルシステム、画像アセット、ログ、データ記録を検証するのに適しています。

## SDKビルドターゲット { #sdk-build-targets }

SiFli-SDKでは、`scons --board=<board_name>`に次の正確なボードターゲット名を指定します。

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

これらはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。[Supported Boardsインデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)とSDKの[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では掲載されるターゲットが異なる場合があります。使用中のSDKリビジョンに対応した内容を確認してください。

## 関連ドキュメント { #related-documents }

[SF32LB52x チップ紹介]: ../chips/SF32LB52x.md
[SF32LB52x ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[SiFli公式Wiki記事]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[設計データ一式]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[サンプルを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x チップ紹介]__
- :fontawesome-solid-file-lines: __[SF32LB52x ハードウェア設計ガイド]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[SiFli公式Wiki記事]__
- :fontawesome-solid-download: __[設計データ一式]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__

</div>
