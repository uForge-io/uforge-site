---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: MCU 電源を 1.8 V または 3.3 V にジャンパーで切り替えられるコンパクトな SF32LB52x 評価ボード。GPIO、ディスプレイ、オーディオ、USB、電源レールへ直接アクセスできます。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## 概要 { #overview }

SF32LB52-DevKit-Core-3p3 は、SF32LB52x チップを直接評価するためのコンパクトな開発ボードです。基板上のジャンパーで MCU 電源を 1.8 V または 3.3 V に切り替えられます。主要な MCU 信号は基板端のヘッダーに引き出されています。基板端の半円形めっきスルーホールには、ピンヘッダーをはんだ付けせずに挿入して使えます。GPIO、シリアルバス、ディスプレイ信号、オーディオ、ADC、PWM、電源レールに直接アクセスしたいエンジニアに適しています。

基板サイズは 30.88 × 68 mm で、コンパクトなベンチ試作に適し、SF32LB52x のハードウェアおよびファームウェアの立ち上げに役立つ実用的なインターフェースを備えています。

![SF32LB52-DevKit-Core-3p3 正面図](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 正面図</em></div>

![SF32LB52-DevKit-Core-3p3 背面図](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 背面図</em></div>

## ボードバリアント { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Core-3p3 ボードバリアント</em></div>

<div align="center" markdown>

| バリアント | MCU | パッケージ内メモリ | ボード上メモリ |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB SPI NOR Flash | なし |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB SPI NOR Flash | なし |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB OPI-PSRAM | 16 MB SPI NOR Flash |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB OPI-PSRAM | 16 MB SPI NOR Flash |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB SPI NOR Flash |

</div>

小型の Bluetooth 機器、制御用途、シンプルな HMI には NOR のみのバリアントが適しています。大きなグラフィックスアセット、フレームバッファ、ファイルシステム、アプリケーション用ストレージが必要な場合は、PSRAM + 外部 NOR のバリアントを選択してください。

**出典の記載差異（選定前に基板表示を確認）：** SiFli の[Core-3p3 詳細ガイド](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html)では SF32LB52JUD6 構成を現行の `R16N16 V1.0.0` と呼ぶ一方、[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)では同じ JUD6 / 16 MB PSRAM / 16 MB NOR 構成を `N16R16` と記載しています。詳細ガイドの版情報には EUB6 のパッケージ内蔵 PSRAM が 8 MB とありますが、同ガイドの特性一覧と構成表は 4 MB です。SiFli の[SF32LB52 概要](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md)も EUB6 を 4 MB としているため、本記事では 4 MB を採用しています。ボード型番を確定する際は、実物の表示と対応する回路図/BOMを確認してください。

## ボードの主な特長 { #board-highlights }

- NOR のみ、または PSRAM + NOR 構成の SF32LB52x MCU バリアント
- 48 MHz のメイン水晶振動子と 32.768 kHz の RTC 水晶振動子
- USB Type-C 給電と、CH340N 経由の USB-UART 書き込み/デバッグ
- 基板上の PCBA アンテナと I-PEX アンテナコネクター
- ジャンパーによる MCU 電源の 1.8 V / 3.3 V 切り替え
- USB 2.0 FS 信号を基板端のヘッダーに引き出し
- 基板から 37 本の GPIO を引き出し、MCU は UART 3 系統、I2C 4 系統、GPTIM 2 系統、SPI 2 系統、GPADC 6 チャネルを備えます
- すべての GPIO は UART、I2C、GPTIM のいずれかに設定可能。ピン多重化機能には SPI、PWM、I2S、PDM、ウェイク入力も含まれます
- 16 ピン、0.5 mm ピッチの FPC ディスプレイコネクター。表示インターフェースは SPI、DSPI、Quad-SPI に対応し、DDR モード QSPI もサポート
- I2C タッチパネル信号
- アナログマイク入力および差動オーディオ出力用ピン
- ユーザー LED 1 個
- 電源ボタンと機能ボタン
- 単一電源レールの電流測定用テストポイント。SiFli は単一 MCU、最小システム、基板全体の消費電力試験も記載

## このボードを使うべき場合 { #when-to-use-this-board }

SF32LB52x の信号に最も直接アクセスしやすいボードが必要な場合は、SF32LB52-DevKit-Core-3p3 を選んでください。

- カスタムのドーターボードやセンサーボードの立ち上げ
- SF32LB52x メモリバリアントの評価
- LCD、オーディオ、USB、GPIO 機能のプロトタイピング
- 個別の電源レールでの電流測定
- 小型製品向け PCB を設計する前のファームウェア検証

より小型で、基板端に半円形のめっきスルーホールを備えたモジュール形状のボードには [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md) を、オーディオアンプ、TF カードスロット、バッテリー充電器を備えたディスプレイボードには [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md) をご覧ください。

## 電源 { #power }

このボードは次の 3 通りで給電できます。

- 通常の開発とデバッグに推奨される USB Type-C 電源
- USB 未接続時に基板端ヘッダーの 5 V 端子と GND 端子から給電
- USB 未接続時に基板端ヘッダーの 3.3 V 端子と GND 端子から給電（外部ベンチ電源を使用できます）

MCU 電源は別の基板ジャンパーで 1.8 V または 3.3 V に設定します。この設定は、基板端ヘッダーの 1.8 V / 3.3 V 電源ピンとは別です。ジャンパーを変更したり外部回路に給電したりする前に、該当する基板リビジョンのピン配置図と回路図を確認してください。

特定の電源レールの電流を測定する場合は、基板上の測定ポイントで、そのレールに電流計を直列に接続してください。

USB Type-C を接続すると、所定のヘッダーピンから 3.3 V、1.8 V、5 V を出力できます。外部回路を接続する前に、各ピンの入出力方向を確認してください。

ボードには電源スイッチがあります。CH340N の RTS# 信号でボードの有効/無効を制御できるため、書き込みやデバッグ時にホストツールから MCU をリセットできます。

## 書き込みとデバッグ { #download-and-debug }

ファームウェアの書き込みとソフトウェアデバッグには USB Type-C の UART ポートを使用してください。

- **書き込みモード**: 書き込みツールで BOOT を有効にし、ボードの電源を入れるかリセットします。
- **デバッグ/ログモード**: BOOT を無効にし、ボードの電源を入れるかリセットします。
- **リセット**: 基板上のリセット/電源ボタン、またはツールから制御する RTS リセットを使用します。

## ユーザーコントロール { #user-controls }

<div align="center"><em>ユーザーコントロール信号</em></div>

<div align="center" markdown>

| 機能 | GPIO | 挙動 |
| :--- | :--- | :--- |
| LED | PA32 | アクティブハイ |
| KEY1 | PA34 | アクティブハイ、10 秒長押しリセットに対応 |
| KEY2 | PA33 | アクティブハイ |

</div>

## ディスプレイインターフェース { #display-interface }

LCD パネルは SPI、DSPI、Quad-SPI インターフェース（DDR モード QSPI を含む）に対応し、0.5 mm ピッチの縦型 16 ピン FPC コネクターに接続します。コネクターはフリップアップ式ラッチの下接点タイプで、LCD リセット、バックライト PWM、TE、チップセレクト、クロック、4 本のデータライン、I2C タッチ信号を備えています。

![FPC変換ケーブル](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>FPC変換ケーブル</em></div>

### 16 ピン LCD FPC 信号マップ { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>16 ピン LCD FPC 信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 機能 |
| :--- | :--- | :--- |
| 1 | GND | グラウンド |
| 2 | PA00 | LCD リセット |
| 3 | PA01 | バックライト PWM |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | ディスプレイ用 3.3 V 電源出力 |
| 12 | GND | グラウンド |
| 13 | PA09 | タッチ割り込み |
| 14 | PA11 | タッチ I2C SDA |
| 15 | PA20 | タッチ I2C SCL |
| 16 | PA10 | タッチリセット |

</div>

SiFli の中国語ボードガイドでは、1.85 インチ AMOLED モジュールを 16 ピン FPC ケーブルで直接接続できると記載されています。一方、英語ガイドでは FPC-22p ケーブルとされ、図のファイル名も `FPC-22P` です。ボード上のコネクター自体は 16 ピンです。資料間でこの不一致は解消されていないため、接続前にディスプレイモジュールのケーブルのピン数と配線を確認してください。

## ヘッダー信号の概要 { #header-signal-summary }

ボードの両側には、それぞれ 24 ピンのヘッダーがあります。一方は主に汎用 GPIO、SPI2、USB、GPADC、電源を、もう一方は LCD、タッチ、デバッグ UART、オーディオ、電源を引き出しています。

![SF32LB52-DevKit-Core-3p3 ピン配置](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 ピン配置</em></div>

### 汎用 I/O ヘッダー { #general-io-header }

<div align="center"><em>汎用 I/O ヘッダーのピン割り当て</em></div>

<div align="center" markdown>

| ピン範囲 | 信号 | 主な機能 |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART、I2C、GPTIM、SPI2、ウェイク入力 |
| 10-11 | PA36 / PA35 | USB DM / USB DP、UART、I2C、GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0、SPI1、I2S1、UART、I2C |
| 17 | 3.3V | USB 給電の有無に応じて 3.3 V 入力または出力 |
| 18-21 | PA27..PA24 | ウェイク入力、SPI1、I2S1 |
| 22 | PA34 | UART、I2C、GPTIM、GPADC6、WKUP10 |
| 23-24 | PA33 / PA32 | UART、I2C、GPTIM、GPADC5 / GPADC4 |

</div>

### LCD、オーディオ、デバッグヘッダー { #lcd-audio-and-debug-header }

<div align="center"><em>LCD、オーディオ、デバッグヘッダーのピン割り当て</em></div>

<div align="center" markdown>

| ピン範囲 | 信号 | 主な機能 |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD、タッチ、PDM、I2S、UART、I2C |
| 12-15 | MIC_ADC、MIC_BIAS、DACP、DACN | アナログマイクとオーディオ出力 |
| 17 | 1.8V | USB 給電の有無に応じて 1.8 V 入力または出力 |
| 18-20 | PA10、PA11、PA20 | PA10: CTP_RST、PA11: CTP_SDA、PA20: CTP_SCL。すべて UART、I2C、GPTIM に対応 |
| 21 | PA21 | UART、I2C、GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX、SWDIO/SWCLK、書き込み/デバッグ |
| 24 | 5V | USB 給電の有無に応じて 5 V 入力または出力 |

</div>

## 外部 Flash と SDIO ピン { #external-flash-and-sdio-pins }

一部のバリアントには 16 MB の外部 QSPI-NOR Flash が搭載されています。ストレージと SDIO で共有するピンは次のとおりです。

<div align="center"><em>外部 Flash / SDIO 用ピンの割り当て</em></div>

<div align="center" markdown>

| MCU GPIO | Flash / SDIO 共用機能 |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

SDIO や他の拡張機能に使用する前に、これらのピンが基板上の Flash によってすでに使用されていないか確認してください。

## オーディオ拡張 { #audio-expansion }

ボードには、アナログマイク用のバイアス電圧と入力信号、差動 DAC 出力が配線されています。マイクとスピーカー駆動用 Class-AB/D アンプは外付けです。想定する音声経路に合わせて選定してください。

## SDK ビルドターゲット { #sdk-build-targets }

SiFli-SDK では、`scons --board=<board_name>` に次の正確なボードターゲット名を指定します。

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

これらはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。[Supported Boards インデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)とSDKの[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では掲載されるターゲットが異なる場合があります。使用中のSDKリビジョンに対応した内容を確認してください。

## 関連ドキュメント { #related-documents }

[SF32LB52x チップ紹介]: ../chips/SF32LB52x.md
[SF32LB52x ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SiFli公式Wiki記事]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[設計データ一式]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[サンプルを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x チップ紹介]__
- :fontawesome-solid-file-lines: __[SF32LB52x ハードウェア設計ガイド]__
- :fontawesome-brands-github: __[SiFli公式Wiki記事]__
- :fontawesome-solid-download: __[設計データ一式]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__

</div>
