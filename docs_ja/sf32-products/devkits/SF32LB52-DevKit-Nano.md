---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano: 製品に近いプロトタイプ、小型ディスプレイの立ち上げ、はんだ付け実装での評価に適したコンパクトなSF32LB52x開発ボード。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## 概要 { #overview }

SF32LB52-DevKit-Nanoは、コンパクトなプロトタイプ開発や組み込みシステムの評価に適した小型SF32LB52x開発ボードです。基板端に半円形のめっきスルーホールがあり、単体の開発ボードとしても、製品プロトタイプのキャリア基板にはんだ付けしても使用できます。

基板サイズは51 mm × 20.32 mmです。GPIO、UART、I2C、SPI、LCD、I2S、GPADC、PWM、USB、アナログオーディオなど、開発・評価に使うSF32LB52xの主要機能を利用できます。

![SF32LB52-DevKit-Nano前面図](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 正面図</em></div>

![SF32LB52-DevKit-Nano背面図](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 背面図</em></div>

## ボードバリアント { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Nanoボードバリアント</em></div>

<div align="center" markdown>

| バリアント | MCU | パッケージ内メモリー | 外部Flash |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB SPI NOR Flash | なし |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB QSPI-NOR Flash |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 128 MB QSPI-NAND Flash |

</div>

N4は、コンパクトな制御、Bluetooth、シンプルなUIアプリケーションに適しています。N16R16は16 MB OPI-PSRAMと16 MB QSPI-NOR、A128R16は16 MB OPI-PSRAMと128 MB QSPI-NANDを搭載します。どちらも、大きなディスプレイアセット、外部ファイルシステム、またはPSRAM上のフレームバッファや作業領域を必要とする用途に適しています。

**出典間の不一致（選定前に要確認）：** SiFliの[詳細なNano開発ボードガイド](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html)では、16 MB OPI-PSRAM + 16 MB NORの構成を`R16N16 V1.0.0`と記載しています。一方、[現行の開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)では同じメモリー構成を`N16R16`とし、16 MB OPI-PSRAM + 128 MB QSPI-NANDの`A128R16`も個別に掲載しています。詳細ガイドにはA128R16の具体的な説明はありません。A128R16については型番ガイドの記載を参照し、N16R16の他のボード仕様を流用しないでください。ファームウェアやメモリー構成を決める前に、基板のマーキングと現行の回路図/BOMを確認してください。

SiFliの資料ではNanoの寸法にもわずかな差があります。詳細ガイドは21 × 51 mm、型番ガイドは51 × 20.32 mmとしています。51 mmの辺は一致しますが、短辺には0.68 mmの差があります。本ページでは型番ガイドの、より精度の高い値を採用しています。筐体やキャリア基板を設計する前に、対象リビジョンの機構図面で寸法を確認してください。

## ボードの主な特長 { #board-highlights }

- 51 mm × 20.32 mmのコンパクトなボード
- 基板端の半円形めっきスルーホールにより、キャリア基板へのはんだ付けが可能
- USB Type-C電源、およびCH340NによるUSB-UART書き込み/デバッグ
- GPIO、UART、I2C、SPI、GPADC、PWM、I2S、PDM、ウェイクアップ対応ピンを引き出し
- 16ピンFPC経由のQSPI LCD接続（通常は22ピンから16ピンへの変換ケーブルを使用）
- I2Cタッチパネルサポート
- アナログマイク入力と差動オーディオ出力ピン
- エッジピンに引き出されたUSB 2.0 FS信号
- ユーザーLED 2個
- 電源ボタンと機能ボタン

## このボードが適している用途 { #when-to-use-this-board }

製品に近いサイズや実装形態でプロトタイプを評価する場合は、SF32LB52-DevKit-Nanoが適しています。

- コンパクトなBluetooth・ディスプレイプロトタイプの構築
- キャリアPCBへのボードのはんだ付け
- カスタムボード設計の前に、製品に近いピン割り当てをテスト
- NOR Flashのみの構成と、PSRAMを搭載したQSPI-NOR／QSPI-NAND構成を比較
- 小さなフットプリントでLCD、オーディオ、センサー、USB機能を立ち上げる

ベンチで配線しやすく、より多くの信号にアクセスできるボードが必要なら [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md) を、充電器、TFカード、マイク、スピーカーアンプを備えたディスプレイ向けボードが必要なら [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md) を参照してください。

## 電源 { #power }

このボードは3つの給電方式をサポートします。

- 開発に推奨されるUSB Type-C電源
- USB未接続時は、基板端の3.3 VピンとGNDピンから給電
- USB未接続時は、基板端の5 VピンとGNDピンから給電

USB Type-C接続時は、一部の3.3 V端子と5 V端子を出力として使用できます。外部回路を接続する前に、各端子の電源方向を確認してください。

このボードには、CH340NのRTS# 信号を通じて制御される電源スイッチが搭載されており、ツールからリセットを制御できます。

## 書き込みとデバッグ { #download-and-debug }

ファームウェアの書き込みとシリアルログにはUSB Type-CのUARTインターフェースを使用してください。

- **書き込みモード**: 書き込みツールでBOOTを有効にしてから、ボードに電源を入れるかリセットしてください。
- **デバッグ/ログモード**: BOOTを無効にしてから、ボードに電源を入れるかリセットしてください。
- **RTSリセット動作**: シリアルポートを開いた際にボードが予期せずリセットまたは電源オフになる場合は、ホスト側のシリアルポート設定でモデムまたはハードウェアフロー制御を無効にしてください。

![シリアルポートの詳細設定でモデムフロー制御を無効にする](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>シリアルポート設定でのモデムフロー制御の無効化</em></div>

## ユーザー操作部 { #user-controls }

<div align="center"><em>ユーザーコントロール信号</em></div>

<div align="center" markdown>

| 機能 | GPIO | 挙動 |
| :--- | :--- | :--- |
| LED1 | PA31 | アクティブロー |
| LED2 | PA32 | アクティブロー |
| KEY1 | PA34 | アクティブハイ、10秒長押しリセットに対応 |
| KEY2 | PA33 | アクティブハイ |

</div>

## 基板端の半円形めっきスルーホールの概要 { #castellated-pin-summary }

Nanoボードでは、基板縁の端子が2つのグループに分かれています。1つ目にはオーディオ、SPI1、デバッグUART、USB関連の電源端子、GPADC対応端子が含まれます。2つ目にはSPI2、USB FS、ウェイクアップ対応GPIO、電源端子が含まれます。

### 表側エッジ信号 { #front-side-edge-signals }

<div align="center"><em>表側エッジ信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 主な機能 |
| :--- | :--- | :--- |
| 1 | GND | グラウンド |
| 2 | DACP | アナログオーディオ出力 |
| 3 | DACN | アナログオーディオ出力 |
| 4 | MIC_ADC | アナログマイク入力 |
| 5 | MIC_BIAS | マイクバイアス |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | グラウンド |
| 8 | PA19 | UART0_TXD / SWCLK / デバッグ |
| 9 | PA18 | UART0_RXD / SWDIO / デバッグ |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | 3.3 V入力/出力 |
| 14 | GND | グラウンド |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | 5 V入力/出力 |

</div>

### 裏側エッジ信号 { #back-side-edge-signals }

<div align="center"><em>裏側エッジ信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 主な機能 |
| :--- | :--- | :--- |
| 1 | GND | グラウンド |
| 2 | 3.3V | 3.3 V入力/出力 |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | グラウンド |
| 10 | 3.3V | 3.3 V入力/出力 |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | 5 V入力/出力 |
| 16 | GND | グラウンド |

</div>

## LCDインターフェース { #lcd-interface }

このボードは、16ピンのFPC信号セットを通じてQSPI LCDパネルをサポートします。元のボードノートでは、22ピンから16ピンへの変換FPCケーブルを使ってHuangshan Piの1.85インチAMOLED画面に接続する方法が記載されています。

![22ピンから16ピンへのFPC変換ケーブル](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>22ピンから16ピンへのFPC変換ケーブル</em></div>

<div align="center"><em>16ピンLCD FPC信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 機能 |
| :--- | :--- | :--- |
| 1 | GND | グラウンド |
| 2 | PA00 | LCDリセット |
| 3 | PA01 | バックライトPWM |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | ディスプレイ用3.3 V電源出力 |
| 12 | GND | グラウンド |
| 13 | PA09 | タッチ割り込み |
| 14 | PA11 | タッチI2C SDA |
| 15 | PA20 | タッチI2C SCL |
| 16 | PA10 | タッチリセット |

</div>

## 外部FlashとSDIOピン { #external-flash-and-sdio-pins }

N16R16バリアントには外部の16 MB QSPI-NOR Flashが搭載されています。ストレージ用ピンの割り当ては次のとおりです。

<div align="center"><em>外部Flash / SDIO用ピンの割り当て</em></div>

<div align="center" markdown>

| MCU GPIO | Flash / SDIO共用機能 |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

これらのピンは、バリアントによっては搭載されたFlashによって占有されている場合があります。拡張ピンとして使用する前に、正確なボードの実装を確認してください。

## オーディオ拡張 { #audio-expansion }

Nanoボードは、アナログマイク入力、マイクバイアス、差動アナログオーディオ出力を引き出しています。対象製品の要件に応じて、外部マイク回路とオーディオパワーアンプを追加してください。

## SDKビルドターゲット { #sdk-build-targets }

SiFli-SDKでは、`scons --board=<board_name>`に次の正確なボードターゲット名を指定します。

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

これらはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。[Supported Boardsインデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)とSDKの[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では掲載されるターゲットが異なる場合があります。使用中のSDKリビジョンに対応した内容を確認してください。

## 関連ドキュメント { #related-documents }

[SF32LB52x チップ紹介]: ../chips/SF32LB52x.md
[SF32LB52x ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SiFli公式Wiki記事]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[設計データ一式]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[サンプルを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x チップ紹介]__
- :fontawesome-solid-file-lines: __[SF32LB52x ハードウェア設計ガイド]__
- :fontawesome-brands-github: __[SiFli公式Wiki記事]__
- :fontawesome-solid-download: __[設計データ一式]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__

</div>
