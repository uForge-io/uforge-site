---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: MIPI DSI、RGB、QSPI パネルの立ち上げに使える SF32LB58x 開発ボード。オーディオ、SDIO、CAN、各種拡張インターフェースを備えます。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## 概要 { #overview }

SF32LB58-DevKit-LCD は、SF32LB58-MOD モジュールファミリーを採用した開発ボードです。DSI、DPI/RGB、QSPI ディスプレイを使う製品の開発時に、高解像度 UI、オーディオ、ストレージ、USB、周辺機器を実機に近い構成で検証できます。

このボードには、SF32LB58x モジュール、複数のディスプレイコネクター、アナログマイク入力、ステレオスピーカー出力、microSD カードスロット、USB Type-C ポート 2 個、高性能コアと低消費電力コア用の拡張ヘッダーを備えています。CAN や SDIO Wi-Fi の拡張にも対応します。

カスタム基板の設計に進む前に、ディスプレイ、ストレージ、オーディオ、USB、外部周辺機器を組み合わせて動作を検証できます。

![SF32LB58-DevKit-LCD前面図](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 正面図</em></div>

![SF32LB58-DevKit-LCD背面図](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 背面図</em></div>

![SF32LB58-DevKit-LCDブロック図](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — ブロック図</em></div>

## ボードとモジュールのバージョンに関する注記 { #board-and-module-version-notes }

<div align="center"><em>モジュールバージョンの概要</em></div>

<div align="center" markdown>

| モジュールバージョン | ベース | 注記 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB586VDD36 を使用した SF32LB58-MOD-N16R32N1 と SF32LB58-MOD-A128R32N1 | 現行バージョン。eMMC 電源制御を変更し、VCC は PA74、VCCQ は PA80 で制御。抵抗 R0115 を追加 |
| V1.0.0 | SF32LB586VDD36 を使用した SF32LB58-MOD-N16R32N1 | モジュールバージョン欄に記載された初期バージョン |

</div>

<div align="center"><em>ボードバージョンの概要</em></div>

<div align="center" markdown>

| ボードバージョン | ベース | 注記 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 と SF32LB58-MOD-A128R32N1-V1.0.1 | 現行バージョン。PB24 に USB 接続検出を追加。PTC を 2 A / 6 V 品に変更し、2 系統オーディオの最大出力に対応。タイミングが合わないため RGB LED のレベルシフト段を削除。出力リップルを抑えるため DC-DC コンバーターを変更。USB DP のプルアップ抵抗を削除し、USB デバイスモードの割り込み問題を修正 |
| V1.0.0 | SF32LB587VEE56 を搭載した SF32LB58-MOD-N16R32N1-V1.0.0 | 初期公開ボードバージョン |

</div>

SiFli の資料では V1.0.0 のシリコン型番に食い違いがあります。モジュールバージョン欄では SF32LB586VDD36、ボードバージョン欄では N16R32N1-V1.0.0 モジュールを搭載したボードに SF32LB587VEE56 を採用と記載されています。ファームウェアの対象やストレージ構成を決める前に、実機のチップとモジュールに記載された型番、および対応する設計資料を確認してください。

## ボードの主な特長 { #board-highlights }

- ボードバージョンに応じた SF32LB58-MOD-N16R32N1 または SF32LB58-MOD-A128R32N1 モジュール
- V1.0.1 は SF32LB586VDD36 を搭載し、16 MB HPI-PSRAM を 2 個、1 MB のパッケージ内 QSPI-NOR を備えます。V1.0.0 の MCU 型番は SiFli の資料間で一致していません（上記のバージョン注記を参照）
- モジュールバリアントに応じた追加の 16 MB QSPI-NOR または 128 MB QSPI-NAND
- 48 MHz のメイン水晶と 32.768 kHz の RTC 水晶
- IPEX アンテナコネクターとモジュール RF マッチングネットワーク
- 専用 FPC コネクターを通じた MIPI DSI / RGB888 ディスプレイサポート
- 40 ピンヘッダーに引き出された 2 系統の QSPI / DSPI / SPI ディスプレイ経路
- I2C タッチパネルサポート
- オンボードのアナログマイク入力とステレオ Class-D オーディオ出力
- USB Type-C ポート 2 個（1 個は USB-UART による書き込み／デバッグ用、もう 1 個は USB 2.0 HS 用）
- SDIO 経由の MicroSD カードスロット
- 40 ピンヘッダー 2 個による高性能コア・低消費電力コアの GPIO 拡張
- CAN と SDIO Wi-Fi の拡張機能

## このボードが適する用途 { #when-to-use-this-board }

最小構成のブレイクアウトボードではなく、ハイエンドのディスプレイと周辺機器を実機に近い構成で検証できるプラットフォームが必要な場合は、SF32LB58-DevKit-LCD を選択してください。

- MIPI DSI、RGB888、または QSPI のディスプレイパネルの立ち上げ
- タッチ、オーディオ、ストレージ、USB を同時に検証
- SF32LB58x での高解像度 UI の動作確認
- CAN または SDIO Wi-Fi 拡張の評価
- NOR ベースと NAND ベースのモジュール構成の比較
- 専用 PCB の設計前に、フラッグシップクラスのボードでファームウェアを検証

モジュールレベルの統合計画については、[SF32LB58-MOD](../modules/SF32LB58-MOD.md) も確認してください。チップファミリーのアーキテクチャとディスプレイ/メモリ機能については、[SF32LB58x](../chips/SF32LB58x.md) を参照してください。

## ハードウェア構成 { #hardware-configuration }

<div align="center"><em>ハードウェア構成の概要</em></div>

<div align="center" markdown>

| 領域 | 構成 |
| :--- | :--- |
| コアモジュール | SF32LB58-MOD-N16R32N1 または SF32LB58-MOD-A128R32N1 |
| 基板リビジョン別 MCU | V1.0.1：SF32LB586VDD36。V1.0.0：SiFli 資料に不一致あり（上記のバージョン注記を参照） |
| パッケージ内メモリ（V1.0.1） | 16 MB + 16 MB HPI-PSRAM、加えて 1 MB QSPI-NOR |
| 追加ストレージ | モジュールバリアントに応じて 16 MB QSPI-NOR または 128 MB QSPI-NAND |
| ディスプレイ | MIPI DSI、DPI/RGB888、QSPI パネルサポート |
| オーディオ | オンボードのアナログマイクパスとステレオスピーカー出力 |
| USB | USB-UART Type-C と USB 2.0 HS Type-C |
| USB-UART チャネル | SiFli の開発ボード型番ガイドでは、CH343K が 2 チャネルの USB-UART デバッグに対応すると記載されています。詳細なボードガイドでは、各チャネルと Type-C コネクターの対応関係は示されていません |
| ストレージ | SDIO 経由の MicroSD カードスロット |
| アンテナ | IPEX コネクターを備えたモジュール RF パス |
| 拡張 | 高性能コア・低消費電力コア用の 40 ピンヘッダー 2 個 |
| 操作部とテストポイント | ユーザーボタン 2 個（HOME/長押しリセット、機能）、独立した RESET ボタン、MODE 起動ジャンパー、UART/USB/CAN テストポイント |
| 電源変換 | オンボード DC-DC コンバーター。SiFli の V1.0.1 変更履歴には、出力リップル低減のためコンバーターを交換したとありますが、型番は記載されていません。正確なリビジョンを回路図/BOM で確認してください。 |
| 基板寸法 / 動作温度 | 65 × 50 mm / −40 ～ 85 °C |

</div>

## はじめに { #getting-started }

### 必要なハードウェア { #required-hardware }

- SF32LB58-DevKit-LCD ボード
- MIPI DSI、RGB888、または QSPI を使用する、適切な LCD モジュール
- USB 2.0 データケーブル、Type-A to Type-C またはそれに相当するもの
- Windows、Linux、macOS を実行するホストコンピューター

### 任意のハードウェア { #optional-hardware }

- スピーカー 2 個
- TF / MicroSD カード
- J-Link または互換の SWD デバッガー
- CAN トランシーバーボード
- SDIO Wi-Fi モジュール

### 基本セットアップ { #basic-setup }

1. 対象のディスプレイパネルを正しい LCD コネクターに接続します。
2. USB-UART Type-C ポートをホストコンピューターに接続します。
3. SiFli の書き込みツールを開き、正しい COM ポートを選択します。
4. 書き込みモードと通常動作モードを切り替えるには、Mode ジャンパーを装着または取り外します。
5. ボードに電源を入れ、対象のファームウェアを書き込むか実行します。
6. ディスプレイの立ち上げ後、製品に必要なタッチ、オーディオ、ストレージ、拡張ペリフェラルを検証します。

データ通信に対応した USB ケーブルを使用してください。給電専用の Type-C ケーブルでは、UART や USB のデータ通信はできません。

## 電源 { #power }

SF32LB58-DevKit-LCD は USB Type-C から給電されます。

- ボード上の USB Type-C コネクターは、どちらからも給電できます
- ファームウェアの書き込みと UART ログの取得には、USB-UART Type-C ポートを使用してください
- ネイティブ USB 機能を検証する場合は、USB 2.0 HS Type-C ポートの使用を別途計画してください

## 書き込みとデバッグ { #download-and-debug }

USB-UART Type-C ポートは、ファームウェアの書き込みとシリアルログの取得に使用します。

- **書き込みモード**: Mode ジャンパーを装着してから、ボードに電源を入れるかリセットしてください
- **ソフトウェアデバッグ/ログモード**: Mode ジャンパーを取り外してから、ボードに電源を入れるかリセットしてください

このボードは J-Link / SWD によるデバッグにも対応しています。

![SF32LB58-DevKit-LCDのJ-Link配線例](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — J-Link 配線例</em></div>

![J-Linkアダプターの参考図](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>J-Link アダプターの参考図</em></div>

![SWDアダプターの参考図](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>SWD アダプターの参考図</em></div>

## SDK ビルドターゲット { #sdk-build-targets }

SiFli-SDK のビルド設定には、次の正確なボードターゲット名があります。ビルド時は、該当する名前を `scons --board=<board_name>` に指定してください。

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

これらはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。[Supported Boards インデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)とSDKの[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では掲載されるターゲットが異なる場合があります。使用中のSDKリビジョンに対応した内容を確認してください。特に、両者は58シリーズのすべてのターゲットを同じようには記載していません。また、現在の[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)には `sf32lb58-lcd_n16r64n4` に対応する物理SKUが記載されていません。

## 主要なモジュール・拡張信号 { #key-module-and-expansion-signals }

このボードは、モジュールレベルの信号と 40 ピン拡張ヘッダー 2 個を備えています。全ピンの割り当てはモジュールのデータシートと回路図で確認してください。以下の表に、設計時に特に重要な信号グループをまとめます。

<div align="center"><em>主要な機能信号グループ</em></div>

<div align="center" markdown>

| 信号グループ | 代表的なピン/信号 | 主な用途 |
| :--- | :--- | :--- |
| 書き込みとデバッグ | PB36、PB37、SWDIO、SWCLK、Boot_Mode、RSTN | UART 書き込み、ソフトウェアデバッグ、SWD 立ち上げ |
| MicroSD | PA75、PA76、PA77、PA70、PA81、PA79、PB58 | SDIO カードインターフェースとカード検出 |
| RGB LCDC1 | PA12–PA15、PA22–PA27、PA43–PA48、PA50、PA53–PA58、PA61–PA63、PA65、PA67 | RGB888 ディスプレイパス |
| MIPI DSI LCDC1 | DSI_D0–DSI_D3、DSI_CLK の差動ペア | MIPI DSI ディスプレイパス。資料に記載された動作は最大 2 データレーン |
| QSPI LCDC1 | PA82、PA84、PA86、PA88、PA90、PA91、PA51、PA52 | 高性能コア側の QSPI ディスプレイ経路 |
| QSPI LCDC2 | PB02–PB04、PB06、PB08–PB10、PB23、PB27、PB30、PB31、PB34 | 低消費電力コア側の QSPI ディスプレイ経路 |
| タッチ | PA16、PA17、PA59、PA60、PA92、PA93 | リセット、割り込み、I2C タッチパネル信号 |
| オーディオ | AU_DAC1/2、AU_ADC1/2、MIC_BIAS、PB23 | アナログオーディオ入出力とパワーアンプのイネーブル |
| CAN / 汎用拡張 | PA02、PA11、ヘッダー GPIO グループ | CAN とペリフェラル拡張 |

</div>

## ディスプレイインターフェース { #display-interfaces }

このボードは 3 つの主要なディスプレイパスをサポートします。

- **MIPI DSI**: 30 ピン、0.5 mm ピッチの FPC コネクター経由
- **RGB888**: 一般的な ALIENTEK RGB ピン配列に対応した、40 ピン、0.5 mm ピッチの FPC コネクター経由
- **QSPI / DSPI / SPI**: 2 つの 40 ピン拡張ヘッダー経由

SiFli の資料に記載されている対応ディスプレイの上限は次のとおりです。

- 最大 2 レーン、最大解像度 1280 × 800 の MIPI DSI パネル
- 最大解像度 1280 × 800 の RGB888 パネル
- 最大解像度 512 × 512 の QSPI パネル

!!! warning "MIPI DSI のデータレーン数"
    ボードの 30 ピンコネクターのピン定義には D0～D3 が記載されていますが、ボードガイドと SDK 資料で確認できる動作は最大 2 データレーンです。ピン名だけから 4 レーン対応と判断しないでください。接続前に、対象パネルとボードリビジョンの配線を確認してください。

![MIPIディスプレイの配線例](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — MIPI ディスプレイ配線例</em></div>

![LCDC1 QSPIディスプレイの配線例](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC1 QSPI ディスプレイ配線</em></div>

![LCDC2 QSPIディスプレイの配線例](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC2 QSPI ディスプレイ配線</em></div>

## オーディオ { #audio }

このボードは以下をサポートします。

- オンボードマイク入力パス 1 系統
- オーディオ ADC 入力経路 2 系統（うち 1 系統はオンボードマイク入力と共用し、抵抗ジャンパーでオンボードマイク入力または 40 ピンヘッダー入力を選択）
- スピーカー出力 2 系統
- RGB 信号と多重化されている PDM 信号パス 1 系統（RGB ディスプレイ使用中は利用不可）

SiFli の[詳細なボードガイド](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html)ではステレオアナログ出力を最大 2.8 W/4 Ω とし、[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)では 2 系統のスピーカー出力に 3 W/4 Ω と記載しています。いずれの資料も、この値が各チャンネルあたりか 2 チャンネル合計かを明記していません。スピーカー選定前に、実際のボードリビジョン、回路図、アンプの電源・負荷条件を確認し、いずれの値もチャンネルあたりの保証出力として扱わないでください。

![オーディオ配線例](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — オーディオ配線例</em></div>

## CAN と SDIO Wi-Fi 拡張 { #can-and-sdio-wi-fi-expansion }

搭載する SF32LB58 モジュールには CAN コントローラーがあり、ボード上には外付けトランシーバーに接続するための信号が引き出されています。

![CAN配線例](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — CAN 配線例</em></div>

![CANトランシーバー基板の参考例](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>CAN トランシーバー基板の参考例</em></div>

このボードは、ヘッダーインターフェースを通じた SDIO Wi-Fi 拡張もサポートしています。

![SDIO Wi-Fiモジュールの参考例](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>SDIO Wi-Fi モジュールの参考例</em></div>

![SDIO Wi-Fi配線例](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — SDIO Wi-Fi 配線例</em></div>

![SDIO Wi-Fi回路図の参考例](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>SDIO Wi-Fi の参考回路図</em></div>

## 関連ドキュメント { #related-documents }

[SF32LB58x チップ紹介]: ../chips/SF32LB58x.md
[SF32LB58x ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[SF32LB58-MOD 設計データ一式]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[SF32LB58-DevKit-LCD 設計データ一式]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[SF32LB58-DevKit-LCD LCEDAプロジェクト]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[サンプルを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB58x チップ紹介]__
- :fontawesome-solid-file-pdf: __[SF32LB58x ユーザーマニュアル]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[SF32LB58-MOD 設計データ一式]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD 設計データ一式]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD LCEDAプロジェクト]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__

</div>
