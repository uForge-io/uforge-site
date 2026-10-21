---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: MIPI DSI、RGB、QSPIパネルの立ち上げに使えるSF32LB58x開発ボード。オーディオ、SDIO、CAN、各種拡張インターフェースを備えます。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## 概要 { #overview }

SF32LB58-DevKit-LCDは、SF32LB58-MODモジュールファミリーを採用した開発ボードです。DSI、DPI/RGB、QSPIディスプレイを使う製品の開発時に、高解像度UI、オーディオ、ストレージ、USB、周辺機器を実機に近い構成で検証できます。

このボードには、SF32LB58xモジュール、複数のディスプレイコネクター、アナログマイク入力、ステレオスピーカー出力、microSDカードスロット、USB Type-Cポート2個、高性能コアと低消費電力コア用の拡張ヘッダーを備えています。CANやSDIO Wi-Fiの拡張にも対応します。

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
| V1.0.1 | SF32LB586VDD36を使用したSF32LB58-MOD-N16R32N1とSF32LB58-MOD-A128R32N1 | 現行バージョン。eMMC電源制御を変更し、VCCはPA74、VCCQはPA80で制御。抵抗R0115を追加 |
| V1.0.0 | SF32LB586VDD36を使用したSF32LB58-MOD-N16R32N1 | モジュールバージョン欄に記載された初期バージョン |

</div>

<div align="center"><em>ボードバージョンの概要</em></div>

<div align="center" markdown>

| ボードバージョン | ベース | 注記 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1とSF32LB58-MOD-A128R32N1-V1.0.1 | 現行バージョン。PB24にUSB接続検出を追加。PTCを2 A / 6 V品に変更し、2系統オーディオの最大出力に対応。タイミングが合わないためRGB LEDのレベルシフト段を削除。出力リップルを抑えるためDC-DCコンバーターを変更。USB DPのプルアップ抵抗を削除し、USBデバイスモードの割り込み問題を修正 |
| V1.0.0 | SF32LB587VEE56を搭載したSF32LB58-MOD-N16R32N1-V1.0.0 | 初期公開ボードバージョン |

</div>

SiFliの資料ではV1.0.0のシリコン型番に食い違いがあります。モジュールバージョン欄ではSF32LB586VDD36、ボードバージョン欄ではN16R32N1-V1.0.0モジュールを搭載したボードにSF32LB587VEE56を採用と記載されています。ファームウェアの対象やストレージ構成を決める前に、実機のチップとモジュールに記載された型番、および対応する設計資料を確認してください。

## ボードの主な特長 { #board-highlights }

- ボードバージョンに応じたSF32LB58-MOD-N16R32N1またはSF32LB58-MOD-A128R32N1モジュール
- V1.0.1はSF32LB586VDD36を搭載し、16 MB HPI-PSRAMを2個、1 MBのパッケージ内QSPI-NORを備えます。V1.0.0のMCU型番はSiFliの資料間で一致していません（上記のバージョン注記を参照）
- モジュールバリアントに応じた追加の16 MB QSPI-NORまたは128 MB QSPI-NAND
- 48 MHzのメイン水晶と32.768 kHzのRTC水晶
- IPEXアンテナコネクターとモジュールRFマッチングネットワーク
- 専用FPCコネクターを通じたMIPI DSI / RGB888ディスプレイサポート
- 40ピンヘッダーに引き出された2系統のQSPI / DSPI / SPIディスプレイ経路
- I2Cタッチパネルサポート
- オンボードのアナログマイク入力とステレオClass-Dオーディオ出力
- USB Type-Cポート2個（1個はUSB-UARTによる書き込み／デバッグ用、もう1個はUSB 2.0 HS用）
- SDIO経由のMicroSDカードスロット
- 40ピンヘッダー2個による高性能コア・低消費電力コアのGPIO拡張
- CANとSDIO Wi-Fiの拡張機能

## このボードが適する用途 { #when-to-use-this-board }

最小構成のブレイクアウトボードではなく、ハイエンドのディスプレイと周辺機器を実機に近い構成で検証できるプラットフォームが必要な場合は、SF32LB58-DevKit-LCDを選択してください。

- MIPI DSI、RGB888、またはQSPIのディスプレイパネルの立ち上げ
- タッチ、オーディオ、ストレージ、USBを同時に検証
- SF32LB58xでの高解像度UIの動作確認
- CANまたはSDIO Wi-Fi拡張の評価
- NORベースとNANDベースのモジュール構成の比較
- 専用PCBの設計前に、フラッグシップクラスのボードでファームウェアを検証

モジュールレベルの統合計画については、[SF32LB58-MOD](../modules/SF32LB58-MOD.md) も確認してください。チップファミリーのアーキテクチャとディスプレイ/メモリー機能については、[SF32LB58x](../chips/SF32LB58x.md) を参照してください。

## ハードウェア構成 { #hardware-configuration }

<div align="center"><em>ハードウェア構成の概要</em></div>

<div align="center" markdown>

| 領域 | 構成 |
| :--- | :--- |
| コアモジュール | SF32LB58-MOD-N16R32N1またはSF32LB58-MOD-A128R32N1 |
| 基板リビジョン別MCU | V1.0.1：SF32LB586VDD36。V1.0.0：SiFli資料に不一致あり（上記のバージョン注記を参照） |
| パッケージ内メモリー（V1.0.1） | 16 MB + 16 MB HPI-PSRAM、加えて1 MB QSPI-NOR |
| 追加ストレージ | モジュールバリアントに応じて16 MB QSPI-NORまたは128 MB QSPI-NAND |
| ディスプレイ | MIPI DSI、DPI/RGB888、QSPIパネルサポート |
| オーディオ | オンボードのアナログマイクパスとステレオスピーカー出力 |
| USB | USB-UART Type-CとUSB 2.0 HS Type-C |
| USB-UARTチャネル | SiFliの開発ボード型番ガイドでは、CH343Kが2チャネルのUSB-UARTデバッグに対応すると記載されています。詳細なボードガイドでは、各チャネルとType-Cコネクターの対応関係は示されていません |
| ストレージ | SDIO経由のMicroSDカードスロット |
| アンテナ | IPEXコネクターを備えたモジュールRFパス |
| 拡張 | 高性能コア・低消費電力コア用の40ピンヘッダー2個 |
| 操作部とテストポイント | ユーザーボタン2個（HOME/長押しリセット、機能）、独立したRESETボタン、MODE起動ジャンパー、UART/USB/CANテストポイント |
| 電源変換 | オンボードDC-DCコンバーター。SiFliのV1.0.1変更履歴には、出力リップル低減のためコンバーターを交換したとありますが、型番は記載されていません。正確なリビジョンを回路図/BOMで確認してください。 |
| 基板寸法 / 動作温度 | 65 × 50 mm / −40～85 °C |

</div>

## はじめに { #getting-started }

### 必要なハードウェア { #required-hardware }

- SF32LB58-DevKit-LCDボード
- MIPI DSI、RGB888、またはQSPIを使用する、適切なLCDモジュール
- USB 2.0データケーブル、Type-A to Type-Cまたはそれに相当するもの
- Windows、Linux、macOSを実行するホストコンピューター

### 任意のハードウェア { #optional-hardware }

- スピーカー2個
- TF / MicroSDカード
- J-Linkまたは互換のSWDデバッガー
- CANトランシーバーボード
- SDIO Wi-Fiモジュール

### 基本セットアップ { #basic-setup }

1. 対象のディスプレイパネルを正しいLCDコネクターに接続します。
2. USB-UART Type-Cポートをホストコンピューターに接続します。
3. SiFliの書き込みツールを開き、正しいCOMポートを選択します。
4. 書き込みモードと通常動作モードを切り替えるには、Modeジャンパーを装着または取り外します。
5. ボードに電源を入れ、対象のファームウェアを書き込むか実行します。
6. ディスプレイの立ち上げ後、製品に必要なタッチ、オーディオ、ストレージ、拡張ペリフェラルを検証します。

データ通信に対応したUSBケーブルを使用してください。給電専用のType-Cケーブルでは、UARTやUSBのデータ通信はできません。

## 電源 { #power }

SF32LB58-DevKit-LCDはUSB Type-Cから給電されます。

- ボード上のUSB Type-Cコネクターは、どちらからも給電できます
- ファームウェアの書き込みとUARTログの取得には、USB-UART Type-Cポートを使用してください
- ネイティブUSB機能を検証する場合は、USB 2.0 HS Type-Cポートの使用を別途計画してください

## 書き込みとデバッグ { #download-and-debug }

USB-UART Type-Cポートは、ファームウェアの書き込みとシリアルログの取得に使用します。

- **書き込みモード**: Modeジャンパーを装着してから、ボードに電源を入れるかリセットしてください
- **ソフトウェアデバッグ/ログモード**: Modeジャンパーを取り外してから、ボードに電源を入れるかリセットしてください

このボードはJ-Link / SWDによるデバッグにも対応しています。

![SF32LB58-DevKit-LCDのJ-Link配線例](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — J-Link配線例</em></div>

![J-Linkアダプターの参考図](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>J-Linkアダプターの参考図</em></div>

![SWDアダプターの参考図](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>SWDアダプターの参考図</em></div>

## SDKビルドターゲット { #sdk-build-targets }

SiFli-SDKのビルド設定には、次の正確なボードターゲット名があります。ビルド時は、該当する名前を`scons --board=<board_name>`に指定してください。

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

これらはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。[Supported Boardsインデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)とSDKの[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)では掲載されるターゲットが異なる場合があります。使用中のSDKリビジョンに対応した内容を確認してください。特に、両者は58シリーズのすべてのターゲットを同じようには記載していません。また、現在の[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)には`sf32lb58-lcd_n16r64n4`に対応する物理SKUが記載されていません。

## 主要なモジュール・拡張信号 { #key-module-and-expansion-signals }

このボードは、モジュールレベルの信号と40ピン拡張ヘッダー2個を備えています。全ピンの割り当てはモジュールのデータシートと回路図で確認してください。以下の表に、設計時に特に重要な信号グループをまとめます。

<div align="center"><em>主要な機能信号グループ</em></div>

<div align="center" markdown>

| 信号グループ | 代表的なピン/信号 | 主な用途 |
| :--- | :--- | :--- |
| 書き込みとデバッグ | PB36、PB37、SWDIO、SWCLK、Boot_Mode、RSTN | UART書き込み、ソフトウェアデバッグ、SWD立ち上げ |
| MicroSD | PA75、PA76、PA77、PA70、PA81、PA79、PB58 | SDIOカードインターフェースとカード検出 |
| RGB LCDC1 | PA12–PA15、PA22–PA27、PA43–PA48、PA50、PA53–PA58、PA61–PA63、PA65、PA67 | RGB888ディスプレイパス |
| MIPI DSI LCDC1 | DSI_D0–DSI_D3、DSI_CLKの差動ペア | MIPI DSIディスプレイパス。資料に記載された動作は最大2データレーン |
| QSPI LCDC1 | PA82、PA84、PA86、PA88、PA90、PA91、PA51、PA52 | 高性能コア側のQSPIディスプレイ経路 |
| QSPI LCDC2 | PB02–PB04、PB06、PB08–PB10、PB23、PB27、PB30、PB31、PB34 | 低消費電力コア側のQSPIディスプレイ経路 |
| タッチ | PA16、PA17、PA59、PA60、PA92、PA93 | リセット、割り込み、I2Cタッチパネル信号 |
| オーディオ | AU_DAC1/2、AU_ADC1/2、MIC_BIAS、PB23 | アナログオーディオ入出力とパワーアンプのイネーブル |
| CAN / 汎用拡張 | PA02、PA11、ヘッダーGPIOグループ | CANとペリフェラル拡張 |

</div>

## ディスプレイインターフェース { #display-interfaces }

このボードは3つの主要なディスプレイパスをサポートします。

- **MIPI DSI**: 30ピン、0.5 mmピッチのFPCコネクター経由
- **RGB888**: 一般的なALIENTEK RGBピン配列に対応した、40ピン、0.5 mmピッチのFPCコネクター経由
- **QSPI / DSPI / SPI**: 2つの40ピン拡張ヘッダー経由

SiFliの資料に記載されている対応ディスプレイの上限は次のとおりです。

- 最大2レーン、最大解像度1280 × 800のMIPI DSIパネル
- 最大解像度1280 × 800のRGB888パネル
- 最大解像度512 × 512のQSPIパネル

!!! warning "MIPI DSIのデータレーン数"
    ボードの30ピンコネクターのピン定義にはD0～D3が記載されていますが、ボードガイドとSDK資料で確認できる動作は最大2データレーンです。ピン名だけから4レーン対応と判断しないでください。接続前に、対象パネルとボードリビジョンの配線を確認してください。

![MIPIディスプレイの配線例](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — MIPIディスプレイ配線例</em></div>

![LCDC1 QSPIディスプレイの配線例](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC1 QSPIディスプレイ配線</em></div>

![LCDC2 QSPIディスプレイの配線例](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC2 QSPIディスプレイ配線</em></div>

## オーディオ { #audio }

このボードは以下をサポートします。

- オンボードマイク入力パス1系統
- オーディオADC入力経路2系統（うち1系統はオンボードマイク入力と共用し、抵抗ジャンパーでオンボードマイク入力または40ピンヘッダー入力を選択）
- スピーカー出力2系統
- RGB信号と多重化されているPDM信号パス1系統（RGBディスプレイ使用中は利用不可）

SiFliの[詳細なボードガイド](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html)ではステレオアナログ出力を最大2.8 W/4 Ωとし、[開発ボード型番ガイド](https://wiki.sifli.com/en/board/devkit_guide.html)では2系統のスピーカー出力に3 W/4 Ωと記載しています。いずれの資料も、この値が各チャンネルあたりか2チャンネル合計かを明記していません。スピーカー選定前に、実際のボードリビジョン、回路図、アンプの電源・負荷条件を確認し、いずれの値もチャンネルあたりの保証出力として扱わないでください。

![オーディオ配線例](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — オーディオ配線例</em></div>

## CANとSDIO Wi-Fi拡張 { #can-and-sdio-wi-fi-expansion }

搭載するSF32LB58モジュールにはCANコントローラーがあり、ボード上には外付けトランシーバーに接続するための信号が引き出されています。

![CAN配線例](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — CAN配線例</em></div>

![CANトランシーバー基板の参考例](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>CANトランシーバー基板の参考例</em></div>

このボードは、ヘッダーインターフェースを通じたSDIO Wi-Fi拡張もサポートしています。

![SDIO Wi-Fiモジュールの参考例](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>SDIO Wi-Fiモジュールの参考例</em></div>

![SDIO Wi-Fi配線例](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — SDIO Wi-Fi配線例</em></div>

![SDIO Wi-Fi回路図の参考例](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>SDIO Wi-Fiの参考回路図</em></div>

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
