---
icon: lucide/microchip
description: "SF32LB57x：デュアルモードBluetooth、240 MHzコア2個、ePicasso 3.0、eZip 3.0、小型QFN/BGAを備えた超低消費電力マルチコアAIoT MCUファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB57x { #sf32lb57x }

## 概要 { #overview }

SF32LB57xシリーズは、ウェアラブル機器、携帯型スマートデバイス、スマートホーム機器、小型ディスプレイ製品向けの、強化された超低消費電力・高集積AIoT MCUファミリーです。一般的なBluetooth MCUでは不足しがちなグラフィックス、Bluetoothオーディオ、カメラ入力、外部ストレージ、常時動作の要件に対応しつつ、アプリケーションプロセッサー級プラットフォームの電力・コスト・統合面でのトレードオフを避けたい製品に適しています。

SF32LB57xは、Arm Cortex-M33 STAR-MC1[^1] を3コア搭載する構成です。2つの性能コアは最大240 MHz、低消費電力コアは最大24 MHzで動作します。SiFliの[ACPU使用ガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) では、3コアをHCPU、ACPU、LCPUと呼び分けています。ACPUは音声とグラフィックスを処理し、LCPUはBLEやセンサーデータ処理などの低消費電力タスクを担います。2つの性能コアの合計性能は1968 CoreMark / 740 DMIPSです。この分担により、UI描画、アプリケーション処理、マルチメディア処理に余裕を持たせながら、Bluetooth、センサーハブなどの常時動作タスクを低消費電力コアで実行できます。

このプラットフォームには、592 KBのオンチップ保持SRAM、ePicasso 3.0 2D/2.5Dグラフィックスアクセラレーター、eZip 3.0ハードウェア解凍エンジン、専用LCDコントローラー、DCMIカメラコントローラー、デュアルモードBluetooth無線、高忠実度オーディオADC/DAC、SiPおよび外部メモリー用インターフェース、セキュリティアクセラレーター、FreeIOによる柔軟なGPIO割り当て機能を統合しています。57xの特長のひとつがPTM（Parallel Task Machine）です。小規模な並列タスクプロセッサーが、タイミングに厳密さを要する周辺機器の制御、独自IOプロトコル、センサー収集、PWM相当のタイミング制御、イベント連携をメインCPUから引き受けます。

ハードウェア設計では、まず電源方式とパッケージを決めます。SF32LB57xにはQFN68、QFN80、BGA112があり、製品系列によってバッテリー駆動向けと外部3.3 V電源向けに分かれています。この選択は電源構成、使用可能なGPIO数、パッケージのファンアウト、ディスプレイやストレージの配線、デバッグ方法、立ち上げの進め方に影響します。回路図を流用したりPCBレイアウトを始めたりする前に、正確な注文型番を確定してください。

[^1]: STAR-MC1はArm China製の構成可能なArmv8-M Mainline組み込みCPU IPです。対応するSF32デバイスにおいて、SiFliはこれをArm Cortex-M33 STAR-MC1アプリケーションプロセッサーとして文書化しています。Cortex-M33クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存のCortex-M33ファームウェア、ミドルウェア、RTOSポート、ツールを引き継ぐことができます。CU、SP、SEの各構成は主にキャッシュ、TCM、XIPU、TrustZone対応の点で異なり、Arm Custom Instructions/CDEおよびコプロセッサーインターフェースはオプション機能であり、対象のSF32部品ごとに確認が必要です。SiFliのドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

[^2]: **BGA112のみに適用。** SF32LB57xはMPI1、MPI2、MPI3を内蔵しています。各MPIに対応するパッケージ内蔵メモリーの位置は[SF32型番規則](../family/SF32_namingrule.md)を参照してください。次のいずれかのパッケージ内蔵メモリー構成では、MPI2とMPI3のピンをパッケージ外部から利用できず、使用できるGPIOは58本に限られます。(1) MPI2にPSRAMを1個内蔵する構成（単独の場合と、MPI1にもPSRAMを1個内蔵する場合を含む）、または (2) MPI3にNOR Flashを内蔵する構成です。`SF32LB57GVD776` は (2) に該当します。型番の2つ目の `7` は内部部品がMPI3を使用することを示すため、GPIOは58本のみです。それ以外の構成では、MPI3に対応するBGA112の6本のI/OをMPI3用に使うか、プルアップまたはプルダウンを設定したGP静的出力として使用できますが、自由に割り当てられるGPIOではありません。したがって、`SF32LB57ZVN7N6` の `58 + 6` は、使用可能なGPIO 58本とMPI3または静的出力に使える6本のI/Oを表し、64本すべてを自由に割り当てられるGPIOという意味ではありません。この制限はQFN68とQFN80には適用されず、これらのパッケージには公称GPIO数のみがあり、追加のMPI3／静的出力ピンはありません。

[^3]: パッケージ寸法と厚さは、SiFliのSF32LB57xデータシート（DS5701およびDS5702、V0.2.1）の注文情報表とパッケージ図面に基づいています：QFN68（7 × 7 mm、図面は0.9 mmまたは1.1 mm）、QFN80（8 × 8 mm、図面は0.9 mmまたは1.1 mm）、BGA112（5.4 × 4.4 mm、0.98 mm）。記載されている型番のうち、1.1 mmのQFN68を採用するのはSF32LB573UB776のみです。注文情報表には SF32LB57ZVN7N6 の記載がないため、そのBGA112の厚さは、唯一のBGA112図面から採用しています。SiFliのハードウェア設計ガイドには、データシートにない1.03 mmのBGA112という選択肢も追記されています。SF32LB57x専用の型番図では、UがQFN68、YがQFN80、VがBGA112に対応します。このYの対応関係を他のSF32ファミリーにも適用できると推定しないでください。正確な型番の厚さとパッケージ図面はSiFliに確認してください。
[^4]: SiFliのSF32LB57xデータシート（DS5701）では、バッテリー駆動シリーズのVBATとVCCを3.0～4.7 V、パワーオン電圧を3.5 V ±10 %としています。SiFliのハードウェア設計ガイドでは、これより狭い3.45～4.7 Vの入力範囲を示しています（QFN68表 2-1-1、QFN80表 2-1-3、BGA112表 2-1-5）。2つの文書で記載が異なるため、適用される入力ピンと制限は、個別型番のデータシートで確認してください。
[^5]: 表のI/O電圧は、チップでサポートされるI/O電源ドメインの概要であり、すべてのピンが両方の電圧を選べるという意味ではありません。VDDIOA（独立給電の場合）はGPIO用、VDDIOSB（搭載される場合）はSiPメモリー用のI/O電源です。SiFliのガイドでは、パッケージ内蔵PSRAMに1.8 V、NOR Flashに3.3 Vを指定しています。QFN68の3.3 V電源シリーズでは、表2-1-2にVDDIOAは3.3 Vのみと記載されています。各ピン／電源ドメインは、パッケージガイドと型番ごとのデータシートで確認してください。

## 用途 { #applications }

**SF32LB57xは、低消費電力MCUでグラフィックス、Bluetoothオーディオ、カメラ入力、外部ストレージ、常時センシングを実現する小型の接続機器に適しています。** たとえば、次のような製品が挙げられます。

- スマートウォッチ、フィットネスバンドなどのウェアラブル機器
- スマートHMI機器
- 電子ペーパーを搭載したスマート機器
- 小型・中型のスマート家電
- 携帯型録音・オーディオ製品
- ウェアラブル医療機器とフィットネス機器
- 産業用ディスプレイ、センサー、監視・計測機器
- カメラ搭載ウェアラブル機器、携帯端末
- ディスプレイを中心とした小型端末、操作パネル
- 車載センターコンソール制御機器、ワイヤレスカーキー、ウェアラブル車載リモコン
- スマートドアロック
- Bluetoothトランシーバー、インターコム
- 電子フォトフレーム
- Bluetoothメッシュと低消費電力センサーハブネットワーク

特に、次のような機能が必要な設計に適しています。

- UI/アプリケーション処理と低消費電力のバックグラウンドタスク向けの、デュアル240 MHz性能コアと24 MHz効率コア
- リアルタイムの回転、スケーリング、投影、ミラーリング、アルファブレンディングに対応したePicasso 3.0グラフィックスアクセラレーション
- eZip/eZip-A、JPEG、MJPEGのアセットを、CPU負荷の高いデコード処理にすべて通すことなく解凍できるeZip 3.0
- 8080、SPI/Dual-SPI/Quad-SPI、DPI/RGB、JDI、8/16ビットEPDにまたがるLCDインターフェース
- DVPまたはSPI/Dual-SPI/Quad-SPI経由のDCMIカメラ入力
- BLE AudioとLE Long Rangeを含むデュアルモードBluetooth 6.3（BR/EDRおよびBLE）接続
- 再生、録音、Bluetooth通話向けの高忠実度24ビットオーディオADC/DACリソース
- SiP OPI-PSRAM / QSPI-NORに加え、外部QSPI-NOR/NAND、QPI-PSRAM、SD、SDIO、eMMCストレージオプション
- 独自の周辺機器タスク、決定論的なIOタイミング、高速なイベント応答、CPU負荷を抑えたセンサー収集やインターフェース制御を実現するPTMオフロード

Bluetooth 6.3という記載はSF32LB57xデータシート（V0.2.1）に基づいています。v0.4の製品概要では、これより前のバージョンが記載されたままです。オプション機能は、対象の正確な注文型番に対応する最新SiFliドキュメントで確認してください。

## 開発リソース { #development-resources }

[製品概要]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[データシート]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[ハードウェア設計ガイド (μForge.io)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli承認ベンダーリスト]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[製品概要]__
- :fontawesome-solid-file-pdf: __[データシート]__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (μForge.io)]__
- :fontawesome-solid-file-excel: __[SiFli承認ベンダーリスト]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算とメモリー { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1コアを2個搭載した高性能システム（最大240 MHz）
- 最大24 MHzのArm Cortex-M33 STAR-MC1効率コアを搭載した低消費電力システム
- 高性能コア2個の合計性能: 1968 CoreMark / 740 DMIPS
- HCPUキャッシュ: 32 KB 2ウェイ命令キャッシュと16 KB 4ウェイデータキャッシュ
- XIPとアプリケーション処理の高速化に使うACPU命令／データキャッシュ
- HPSYSの保持SRAM 512 KBとLPSYSの保持SRAM 80 KB、オンチップSRAM合計592 KB
- HPSYS SRAMのアドレス空間を共有する、128 KBのゼロウェイトD-TCM
- 単精度FPUとMPUをサポート
- リンクリストモード対応GPDMA

### PTM（Parallel Task Machine） { #ptm-peripheral-task-machine }

- CPUが常時処理する代わりに、ハードウェアのタイミングに沿って実行するのに適した独自周辺機器タスク向けの4コア並列プロセッサー
- バス／IOの読み書き、データ操作、条件分岐、イベント待ち、固定遅延を実行するコンパクトな独自命令セット
- PTM TCMからの実行時はサイクル単位でタイミングを制御でき、決定論的なIOシーケンスを実現
- 各PTMコアは最大16のIOチャネルを扱い、独自通信インターフェース向けにFIFO/DMAを利用可能
- AHBバス上のメモリーと周辺機器レジスターにアクセスし、CPU割り込みを発行できるほか、内部イベント通知で他のコアと連携
- 独自インターフェースプロトコルやPWM、メモリー／データの一括処理、複数モジュールのスケジューリング、センサーの自動収集に適する

### 無線接続 { #wireless-connectivity }

- デュアルモードBluetooth無線
- BLE AudioおよびLE Long Rangeサポート
- 受信感度: BLE 1 Mbpsで−100 dBm、BLE 125 kbpsで−107.5 dBm、BRで−96 dBm、EDR2で−95 dBm
- 最大送信電力: EDR2/EDR3で13 dBm、BR/BLEで17 dBm
- BR受信時のピーク電流: 3.8 Vで最小2.0 mA

### グラフィックス、ディスプレイ、カメラ { #graphics-display-and-camera }

- ePicasso 3.0 2D/2.5Dグラフィックスエンジン
- 回転、拡大縮小、投影、ミラーリング、アルファブレンディング、複数レイヤー合成をハードウェアで高速化
- 最大グラフィックス解像度: 2048 × 2048
- RGB888、RGB565、aRGB8888、aRGB8565を含むRGBフォーマット
- L8/L4、G8/G4/G2、A8/A4/A2、YUVを含む追加フォーマット
- eZip/eZip-Aの画像・アニメーションをロスレス解凍するeZip 3.0エンジン
- JPEG画像とMJPEGアニメーションの解凍
- 中間フレームバッファーを介さず、eZipとePicassoを連携可能
- 8080、SPI/Dual-SPI/Quad-SPI、DPI/RGB、JDI、8/16ビットEPDに対応する専用LCDコントローラー
- 低消費電力での常時表示をディスプレイサブシステムでサポート
- DVP、SPI/Dual-SPI/Quad-SPIの各カメラインターフェースに対応するDCMIコントローラー

### オーディオとアナログ { #audio-and-analog }

- 109 dB SNRの高忠実度24ビットオーディオDAC × 1
- 97 dB SNRの高忠実度24ビットオーディオADC × 2
- オーディオサンプルレート: 8 kHz～96 kHz（一般的な通話・音楽レートを含む）
- 出力1.4～2.8 V、最大2 mAのMicbias LDO
- オーディオ再生・録音、Bluetooth通話、ヘッドセット接続時のMP3再生をサポート
- 12チャネル、12ビットの汎用SAR ADC × 1
- オンチップ温度センサー × 1

### ストレージとセキュリティ { #storage-and-security }

- 最大156 MHzのSiP OPI-PSRAMサポート
- 最大104 MHzのSiP NOR Flashサポート
- NOR、NAND、QPI-PSRAM用MPI（QSPI）インターフェース × 3（メモリーマップドXIPに対応）
- SD 3.0、SDIO 3.0、eMMCに対応するSD/SDIOインターフェース × 2
- Flashのオンザフライ復号に対応
- AES、HASH、CRCアクセラレーター
- 真性乱数発生器(TRNG)
- eShieldセキュリティアーキテクチャ
- PSA Certified Level 1

### ペリフェラルとI/O { #peripherals-and-ios }

- 最大GPIO数: 58（パッケージと注文型番による）
- FreeIOによる柔軟なGPIO割り当て
- UART × 3
- I2C × 4
- SPI × 2
- I2S × 2
- PDMインターフェース × 2（各インターフェースにデジタルマイクを最大2台接続可能）
- USB 2.0 Full-Speed × 1
- CAN × 2
- イベント駆動の周辺機器制御やマルチコア連携に使えるPTMイベント連携
- 16ビットGPTIM × 2
- 32ビットBTIM × 4
- 32ビットATIM × 2
- 24ビットLPTIM × 2
- PWM × 1
- RTC × 1
- 24ビットWDT × 2、独立WDT × 1

### 電源管理 { #power-management }

- 高効率Buckコンバーターと低消費電力LDOを内蔵
- 3.3 Vの外部電源出力を2系統搭載（各最大150 mA）
- Hibernate電流: 3.8 Vで2.8 µA（バッテリー駆動の基準構成）、または3.3 Vで1 µA（外部給電の基準構成）
- バッテリー駆動品に構成可能なリニアLi-ion充電器（充電電流は最大400 mA）を内蔵
- 充電完了電圧の範囲: 4.2～4.45 V
- バッテリー／システム入力範囲[^4]: 3.0～4.7 V
- VBUS範囲: 4.5～5.5 V
- 動作温度範囲: −40～+85 °C

## 製品バリエーション { #family-variants }

SF32LB57xには、バッテリー駆動向けのバリアントと外部3.3 V電源向けのバリアントがあります。パッケージ図、電源ピン、GPIO数、内蔵メモリー、基板設計上の制約は型番ごとに異なるため、回路図を作成する前に注文型番を確定してください。

以下の型番は、SiFliのSF32LB57xデータシート（DS5701およびDS5702、V0.2.1、いずれも暫定版）の注文情報表に基づいています。ただし`SF32LB57ZVN7N6`は、これらの表に記載がありません。設計採用前に、SiFliの最新の型番別資料で正確な注文型番、パッケージ内蔵メモリー構成、電気的制限、パッケージ図面を確認してください。

型番を選ぶ際は、まず次の区分を確認してください。

- **`SF32LB57xU`**: QFN68、リチウムイオンバッテリー駆動向け（数字区分。例: `3`/`5`/`7`）
- **`SF32LB57XU`**: QFN68、外部3.3 V電源向け標準品（英字区分。例: `Z`/`C`/`E`/`F`/`G`/`H`/`J`）
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112、外部3.3 V電源向け。

バッテリー駆動シリーズのデータシート（DS5701）には、バッテリー駆動のQFN80（8 × 8 mm、58 GPIO）と、バッテリー駆動のBGA112（最大58 GPIOに加えて6本のGPOまたはMPIインターフェースI/O）も掲載されています。ただし、その注文情報表にはバッテリー駆動のQFN80とBGA112の型番がないため、いずれかを前提に設計する前に、注文可能な型番をSiFliに確認してください。

<div align="center"><em>SF32LB57xのQFN68パッケージ品（57xU / 57XU）</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| パッケージ | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| 平面寸法[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| 厚さ[^3] | 0.9 mm | 0.9 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| ピッチ | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| パッケージ内蔵メモリー | 4 MB OPI-PSRAM + 16 MB QSPI-NOR | 4 MB OPI-PSRAM + 16 MB + 8 MB QSPI-NOR（デュアルダイ） | 4 MB OPI-PSRAM + 16 MB × 2 QSPI-NOR（デュアルダイ） | 8 MB OPI-PSRAM、QSPI-NORなし | 16 MB OPI-PSRAM、QSPI-NORなし | PSRAMなし、1 MB QSPI-NORのみ |
| 電源電圧[^4] | 3.0～4.7 V | 3.0～4.7 V | 3.0～4.7 V | 3.0～4.7 V | 3.0～4.7 V | **3.3 V** |
| I/O電圧[^5] | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V / 1.8 V |
| 動作温度 | −40～85 °C | −40～85 °C | −40～85 °C | −40～85 °C | −40～85 °C | −40～85 °C |

</div>

<div align="center"><em>SF32LB57xのQFN80 / BGA112パッケージ品（57XY / 57XV）</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| パッケージ | QFN80 | QFN80 | BGA112 | BGA112 |
| 平面寸法[^3] | 8 × 8 mm | 8 × 8 mm | 5.4 × 4.4 mm | 5.4 × 4.4 mm |
| 厚さ[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 0.98 mm |
| ピッチ | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6（MPI3または静的出力）[^2] | 58[^2] |
| パッケージ内蔵メモリー | 8 MB（2 × 4 MB、デュアルダイ）OPI-PSRAM、QSPI-NORなし | 16 MB OPI-PSRAM + 16 MB QSPI-NOR | PSRAMなし + 16 MB QSPI-NOR | 16 MB OPI-PSRAM + 32 MB（2 × 16 MB、デュアルダイ）QSPI-NOR |
| 電源電圧 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O電圧[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 動作温度 | −40～85 °C | −40～85 °C | −40～85 °C | −40～85 °C |

</div>

SF32LB57xのパッケージ選定は、PCBコストだけで決められません。利用できるディスプレイインターフェース、外部ストレージの配線、GPIO数、デバッグ／書き込みピンの確保、ファンアウトの難易度にも影響するため、電源設計と合わせて決定してください。BOMと回路図ではパッケージ名だけでなく、注文型番を基準にします。メモリーサフィックスによってSiPのメモリー構成が変わり、ブートメディア、電源投入シーケンス、外部ストレージの要件にも影響する場合があります。

## 設計・導入の進め方 { #integration-path }

SF32LB57xの候補を絞り込んだら、次の順に設計を検証してください。

1. **ファームウェアを検証する。** [SiFli SDK入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDKの開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、製品で必要なグラフィックス、オーディオ、カメラ、Bluetooth、ストレージ機能を確認します。
2. **評価用ハードウェアを選ぶ。** μForgeには現在、SF32LB57専用のモジュールや開発ボードはありません。[SF32製品セレクター](../product-selector.md)で最も近い評価プラットフォームを探してください。評価結果を57xの設計に適用する前に、パッケージ、電源、メモリー、インターフェースが一致するか確認します。
3. **ハードウェアを設計・レビューする。** 回路図やレイアウトのリリース前に、[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)と[顧客設計セルフチェック](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check)、[量産設計レビュー](../../hardware/design-for-production.md)を確認してください。SF32LB57x専用の μForgeチェックリストは現在公開されていません。
4. **SiFliの一次資料で確認する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]で注文型番とパッケージを確認します。重要なBOM部品の選定には[SiFli承認ベンダーリスト][SiFli承認ベンダーリスト]も利用してください。

<!-- uf-faq:start -->
## よくある質問 { #frequently-asked-questions }

**SF32LB57x の主な仕様は？**
SF32LB57x は、アプリケーションCPU（2× Cortex-M33 @240 MHz）と低消費電力コア（Cortex-M33 @24 MHz、専用Bluetoothコントローラー）、内蔵SRAM 592 KB、デュアルモードBluetooth（クラシック + BLE）を備えます。グラフィックス：ePicasso 3.0 + eZip 3.0。パッケージ：QFN68 / QFN80 / BGA112（7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)）。USB 2.0 FS。ファミリー全体の値であり、個別の型番はデータシートで確認してください。

**SF32LB57x が対応するディスプレイインターフェースは？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB。対応状況は型番とパッケージによって異なります。

**SF32LB57x のパッケージ内メモリ容量は？**
型番により、パッケージ内PSRAMは最大 48 MB、パッケージ内NOR Flashは最大 32 MB です。

**SF32LB57x の電源電圧は？**
バリアントにより 3.0–4.7 V or 2.97–3.63 V。正確な範囲はデータシートで確認してください。

**SF32LB57x でハードウェア設計を始めるには？**
まず [SF32LB57x ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) で回路図、電源、クロック/RF、PCBレイアウトの指針を確認し、基板リリース前に回路図とレイアウトのチェックリストを使用してください。
<!-- uf-faq:end -->

## 関連製品 { #related-products }

### ハードウェア設計の基準 { #hardware-design-baseline }

設計の基準資料として、[ハードウェア設計ガイド（μForge.io）](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)、公式ハードウェアアプリケーションノート、データシート、承認ベンダーリストを参照してください。回路図やPCBをリリースする前に、電源構成、パッケージのファンアウト、ディスプレイ、ストレージ、オーディオ、カメラ、RF、デバッグ／書き込み方法を確認します。

### 開発キット { #development-kits }

電源、クロック、RF、ディスプレイ、ストレージ、オーディオ、カメラ、量産時のアクセス方法を計画する際は、公式のリファレンス回路図、最小システムの設計情報、チェックリストを活用してください。

### リファレンス製品 { #reference-products }

SF32LB57xを使った代表的な最終製品には、スマートウォッチやバンド、スマートHMI、電子ペーパー機器、小型・中型スマート家電、携帯型録音・オーディオ機器、スマートホームパネル、小型ディスプレイ端末、カメラ搭載Bluetooth製品などがあります。
