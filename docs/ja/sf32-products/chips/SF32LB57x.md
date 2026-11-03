---
icon: lucide/microchip
description: "SF32LB57x：デュアルモードBluetooth、240 MHzコア2個、ePicasso 3.0、eZip 3.0、小型QFN/BGAを備えた超低消費電力マルチコアAIoT MCUファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB57x { #sf32lb57x }

## 概要 { #overview }

SF32LB57xシリーズは、ウェアラブル機器、携帯型スマートデバイス、スマートホーム機器、小型ディスプレイ製品向けの、強化された超低消費電力AIoT MCUファミリーです。一般的なBluetooth MCUでは対応しきれないグラフィックス、Bluetoothオーディオ、カメラ入力、外部ストレージ、常時動作の要件を満たしつつ、アプリケーションプロセッサー級プラットフォームの電力・コスト・統合面でのトレードオフを避けたい製品に適しています。SiFliの2026年向け製品であるSF32LB57xは、SF32LB52xおよびSF32LB56xのアップグレードに位置づけられ、コスト競争力の維持も目指しています。CPU性能とグラフィックス性能を高め、低コストで扱いやすいQFNパッケージでもGPIO数を増やし、パッケージ内蔵メモリーの組み合わせもより柔軟にしています。グラフィックス面では、RGB888（24ビット）カラーで最大1024 × 600の解像度に対応します。

SF32LB57xは、Arm Cortex-M33 STAR-MC1[^1] を3コア搭載する構成です。2つの性能コア（HCPUとACPU）は最大240 MHzで動作し、合計性能は1968 CoreMark / 740 DMIPSです。これに24 MHzの低消費電力コア（LCPU）が加わります。SiFliの[ACPU使用ガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) によると、ACPUはオーディオとグラフィックスを処理し、LCPUはBLEやセンサーデータ処理を低消費電力の経路で実行します。このプラットフォームには、592 KBのオンチップ保持SRAM、ePicasso 3.0グラフィックス、eZip 3.0解凍エンジン、LCDコントローラーとDCMIカメラコントローラー、デュアルモードBluetooth、オーディオADC/DAC、SiPおよび外部メモリー用インターフェース、セキュリティアクセラレーター、FreeIOによるピン割り当て機能を統合しています。57xの特長のひとつがPTM（Parallel Task Machine）です。小規模な並列タスクプロセッサーが、タイミングに厳密さを要する周辺機器の制御、独自IOプロトコル、センサー収集、PWM相当のタイミング制御、イベント処理をメインCPUから引き受けます。

回路図を流用したりPCBレイアウトを始めたりする前に、正確な注文型番を確定してください。SF32LB57xにはQFN68、QFN80、BGA112があり、製品系列によってバッテリー駆動向けと外部3.3 V電源向けに分かれています。この選択は電源構成、使用可能なGPIO数、パッケージのファンアウト、ディスプレイやストレージの配線、デバッグ方法、立ち上げの進め方に影響します。

[^1]: STAR-MC1はArm China製の構成可能なArmv8-M Mainline組み込みCPU IPです。対応するSF32デバイスにおいて、SiFliはこれをArm Cortex-M33 STAR-MC1アプリケーションプロセッサーとして文書化しています。Cortex-M33クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存のCortex-M33ファームウェア、ミドルウェア、RTOSポート、ツールを引き継ぐことができます。CU、SP、SEの各構成は主にキャッシュ、TCM、XIPU、TrustZone対応の点で異なり、Arm Custom Instructions/CDEおよびコプロセッサーインターフェースはオプション機能であり、対象のSF32部品ごとに確認が必要です。SiFliのドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

[^2]: **BGA112のみに適用。** SF32LB57xはMPI1、MPI2、MPI3を内蔵しています。各MPIに対応するパッケージ内蔵メモリーの位置は[SF32型番規則](../family/SF32_namingrule.md)を参照してください。次のいずれかのパッケージ内蔵メモリー構成では、MPI2とMPI3のピンをパッケージ外部から利用できず、使用できるGPIOは58本に限られます。(1) MPI2にPSRAMを1個内蔵する構成（単独の場合と、MPI1にもPSRAMを1個内蔵する場合を含む）、または (2) MPI3にNOR Flashを内蔵する構成です。`SF32LB57GVD776` は (2) に該当します。型番の2つ目の `7` は内部部品がMPI3を使用することを示すため、GPIOは58本のみです。それ以外の構成では、MPI3に対応するBGA112の6本のI/OをMPI3用に使うか、プルアップまたはプルダウンを設定したGP静的出力として使用できますが、自由に割り当てられるGPIOではありません。したがって、`SF32LB57ZVN7N6` の `58 + 6` は、使用可能なGPIO 58本とMPI3または静的出力に使える6本のI/Oを表し、64本すべてを自由に割り当てられるGPIOという意味ではありません。この制限はQFN68とQFN80には適用されず、これらのパッケージには公称GPIO数のみがあり、追加のMPI3／静的出力ピンはありません。

[^3]: パッケージ寸法と厚さは、SiFliのSF32LB57xデータシート（DS5701およびDS5702）の注文情報表とパッケージ図面に基づいています：QFN68（7 × 7 mm、図面は0.9 mmまたは1.1 mm）、QFN80（8 × 8 mm、図面は0.9 mmまたは1.1 mm）、BGA112（5.4 × 4.4 mm、0.98 mm）。メモリーダイを3つ搭載する型番（PSRAM 1つとデュアルダイQSPI-NOR）は厚いほうのパッケージを採用します。QFN68は1.1 mm、BGA112は1.03 mmで、SiFliのハードウェアアプリケーションガイドに記載されています。注文情報表には SF32LB57ZVN7N6 の記載がないため、そのBGA112の厚さは、データシートにある唯一のBGA112図面（0.98 mm）から採用しています。SF32LB57x専用の型番図では、UがQFN68、YがQFN80、VがBGA112に対応します。このYの対応関係を他のSF32ファミリーにも適用できると推定しないでください。正確な型番の厚さとパッケージ図面はSiFliに確認してください。
[^4]: SiFliのSF32LB57xデータシート（DS5701）では、バッテリー駆動シリーズのVBATとVCCを3.0～4.7 V、パワーオン電圧を3.5 V ±10 %としています。SiFliのハードウェア設計ガイドでは、これより狭い3.45～4.7 Vの入力範囲を示しています（QFN68表 2-1-1、QFN80表 2-1-3、BGA112表 2-1-5）。2つの文書で記載が異なるため、適用される入力ピンと制限は、個別型番のデータシートで確認してください。
[^5]: 表のI/O電圧は、チップでサポートされるI/O電源ドメインの概要であり、すべてのピンが両方の電圧を選べるという意味ではありません。VDDIOA（独立給電の場合）はGPIO用、VDDIOSB（搭載される場合）はSiPメモリー用のI/O電源です。SiFliのガイドでは、パッケージ内蔵PSRAMに1.8 V、NOR Flashに3.3 Vを指定しています。QFN68の3.3 V電源シリーズでは、表2-1-2にVDDIOAは3.3 Vのみと記載されています。各ピン／電源ドメインは、パッケージガイドと型番ごとのデータシートで確認してください。
[^6]: デュアルダイ：2つのダイは独立したメモリーデバイスで、それぞれ別のMPIインターフェースに接続され、独立してアクセスできます。

## 用途 { #applications }

**SF32LB57xは、低消費電力MCUでUIグラフィックス、Bluetoothオーディオ、カメラ入力、外部ストレージ、常時センシングを組み合わせる小型の接続機器に適しています。** たとえば、次のような製品が挙げられます。

- スマートウォッチ、フィットネスバンド、ウェアラブル医療機器
- スマートHMI機器、ディスプレイを中心とした端末、操作パネル
- 電子ペーパーを搭載したスマート機器、電子フォトフレーム
- 小型・中型のスマート家電、スマートドアロック
- 携帯型録音・オーディオ製品、Bluetoothトランシーバー、インターコム
- カメラ搭載ウェアラブル機器、携帯端末
- 産業用ディスプレイ、センサー、監視・計測機器
- 車載センターコンソール制御機器、ワイヤレスカーキー、車載リモコン
- Bluetoothメッシュと低消費電力センサーハブネットワーク

これらの用途を支えるグラフィックス、カメラ、オーディオ、ストレージ、PTMの機能については、[機能と仕様](#features-and-specs)を参照してください。Bluetooth 6.3という記載はSF32LB57xデータシートに基づいています。製品概要では、これより前のバージョンが記載されたままです。オプション機能は、対象の正確な注文型番に対応する最新SiFliドキュメントで確認してください。

## 開発リソース { #development-resources }

[ハードウェア設計ガイド (μForge.io)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli承認ベンダーリスト]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __製品概要（[バッテリー駆動](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf)、[3.3 V電源](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf)）__
- :fontawesome-solid-file-pdf: __データシート（[バッテリー駆動 / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf)、[3.3 V電源 / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf)）__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル（ZH）](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-solid-file-lines: __[SiFli公式ハードウェア設計ガイド (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[開発キット使用ガイド (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (μForge.io)]__
- :fontawesome-solid-file-excel: __[SiFli承認ベンダーリスト]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算とメモリー { #compute-and-memory }

- 最大240 MHzのArm Cortex-M33 STAR-MC1高性能コア × 2（FPU、MPU搭載、合計1968 CoreMark / 740 DMIPS）
- 24 MHzで動作するArm Cortex-M33 STAR-MC1低消費電力コア
- 32 KB命令キャッシュ + 16 KBデータキャッシュ（HCPU）
- 保持SRAM 592 KB（HPSYS 512 KB + LPSYS 80 KB）、うち128 KBはゼロウェイトD-TCM
- バリアントに応じて、最大48 MB PSRAMと32 MB NOR Flashをパッケージ内蔵

### PTM（Parallel Task Machine） { #ptm-peripheral-task-machine }

- 独自周辺機器タスク向けの4コアPTM。CPUが常時処理する代わりに、ハードウェアのタイミングで実行
- サイクル単位のタイミング制御により、決定論的なIOシーケンスを実現
- 各コアで最大16のIOチャネルを扱え、FIFO/DMAをサポート
- AHBメモリーと周辺機器レジスターにアクセスでき、CPU割り込みの発行やコア間イベントによる連携も可能

### 無線接続 { #wireless-connectivity }

- Bluetooth 6.3デュアルモード（Classic Bluetooth / BLE）、BLE AudioとLE Long Rangeに対応
- 最大送信電力:
    - BLE/BRで17 dBm
    - EDR2およびEDR3で13 dBm
- 受信感度: BLE 1 Mbps時に−100 dBm

### グラフィックス、ディスプレイ、カメラ { #graphics-display-and-camera }

最大解像度とパネルインターフェースは[デバイスごとのインターフェースマトリクス](../../learn/graphics/display-controller.md#per-device-interface-matrix)を参照してください。

- ePicasso 3.0 2D/2.5Dグラフィックスアクセラレーター（最大2048 × 2048）
- ロスレスのeZip/eZip-AとJPEG、MJPEGに対応するeZip 3.0ハードウェアデコーダー
- 8080、SPI/DSPI/QSPI、DPI/RGB、JDI、8/16ビットEPDに対応する専用LCDコントローラー
- DVPとSPI/DSPI/QSPIに対応するDCMIカメラコントローラー

### オーディオとアナログ { #audio-and-analog }

- 24ビットオーディオDAC × 1（SNR 109 dB）
- 24ビットオーディオADC × 2（SNR 97 dB）
- 12ビット汎用ADC × 1（12チャネル）
- 温度センサー

### ストレージとセキュリティ { #storage-and-security }

- NOR、NAND、QPI-PSRAM用MPI（QSPI） × 3（XIP対応）
- SD3.0/SDIO3.0/eMMC × 2
- AES/HASH/CRCハードウェアアクセラレーター
- TRNG
- Flashのオンザフライ復号とeShieldセキュリティアーキテクチャ
- PSA Certified Level 1

### ペリフェラルとI/O { #peripherals-and-ios }

- UART × 3
- I2C × 4
- SPI × 2
- I2S × 2
- PDMインターフェース × 2（各インターフェースにデジタルマイクを最大2台接続可能）
- USB 2.0 FS × 1
- CAN × 2
- RTC、ウォッチドッグ、PWM対応の汎用タイマー（GPTIM、BTIM、ATIM、LPTIM）
- パッケージと型番に応じて最大58 GPIO、FreeIOで柔軟に割り当て可能

### 電源管理 { #power-management }

- Buckコンバーターと低消費電力LDOを内蔵。3.3 Vの外部電源出力を2系統搭載（各最大150 mA）
- Hibernate電流: 3.8 Vで2.8 µA（バッテリー駆動の基準構成）、または3.3 Vで1 µA（外部給電の基準構成）
- バッテリー駆動の基準構成ではLi-ion充電器（最大400 mA、4.2～4.45 V）を内蔵
- バッテリー／システム入力範囲[^4]: 3.0～4.7 V
- VBUS範囲: 4.5～5.5 V
- 動作温度範囲: −40～+85 °C

## 製品バリエーション { #family-variants }

SF32LB57xには、バッテリー駆動向けのバリアントと外部3.3 V電源向けのバリアントがあります。パッケージ図、電源ピン、GPIO数、内蔵メモリー、基板設計上の制約は型番ごとに異なるため、回路図を作成する前に注文型番を確定してください。

以下の型番は、SiFliのSF32LB57xデータシート（DS5701およびDS5702、いずれも暫定版）の注文情報表に基づいています。ただし`SF32LB57ZVN7N6`は、これらの表に記載がありません。設計採用前に、SiFliの最新の型番別資料で正確な注文型番、パッケージ内蔵メモリー構成、電気的制限、パッケージ図面を確認してください。

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
| 厚さ[^3] | 0.9 mm | 1.1 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| ピッチ | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| パッケージ内蔵PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | なし |
| パッケージ内蔵NOR Flash | 16 MB QSPI-NOR | 16 MB + 8 MB QSPI-NOR（デュアルダイ）[^6] | 16 MB × 2 QSPI-NOR（デュアルダイ）[^6] | なし | なし | 1 MB QSPI-NOR |
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
| 厚さ[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 1.03 mm |
| ピッチ | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6（MPI3または静的出力）[^2] | 58[^2] |
| パッケージ内蔵PSRAM | 8 MB（2 × 4 MB、デュアルダイ）OPI-PSRAM[^6] | 16 MB OPI-PSRAM | なし | 16 MB OPI-PSRAM |
| パッケージ内蔵NOR Flash | なし | 16 MB QSPI-NOR | 16 MB QSPI-NOR | 32 MB（2 × 16 MB、デュアルダイ）QSPI-NOR[^6] |
| 電源電圧 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O電圧[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 動作温度 | −40～85 °C | −40～85 °C | −40～85 °C | −40～85 °C |

</div>

SF32LB57xのパッケージ選定は、PCBコストだけで決められません。利用できるディスプレイインターフェース、外部ストレージの配線、GPIO数、デバッグ／書き込みピンの確保、ファンアウトの難易度にも影響するため、電源設計と合わせて決定してください。BOMと回路図ではパッケージ名だけでなく、注文型番を基準にします。メモリーサフィックスによってSiPのメモリー構成が変わり、ブートメディア、電源投入シーケンス、外部ストレージの要件にも影響する場合があります。

## 設計・導入の進め方 { #integration-path }

SF32LB57xの候補を絞り込んだら、次の順に設計を検証してください。

1. **ファームウェアを検証する。** [SiFli SDK入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDKの開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、製品で必要なグラフィックス、オーディオ、カメラ、Bluetooth、ストレージ機能を確認します。
2. **評価用ハードウェアを選ぶ。** [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)でディスプレイ、カメラ、オーディオ、通信機能を評価します。57x製品の設計基準として使用する前に、モジュールのメモリー構成、基板リビジョン、共用ピンの設定を確認してください。
3. **ハードウェアを設計・レビューする。** 回路図やレイアウトのリリース前に、[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)と[顧客設計セルフチェック](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check)、[量産設計レビュー](../../hardware/design-for-production.md)を確認してください。SF32LB57x専用の μForgeチェックリストは現在公開されていません。
4. **SiFliの一次資料で確認する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]で注文型番とパッケージを確認します。重要なBOM部品の選定には[SiFli承認ベンダーリスト][SiFli承認ベンダーリスト]も利用してください。

<!-- uf-faq:start -->
## よくある質問 { #frequently-asked-questions }

**SF32LB57xの主な仕様は？**
SF32LB57xはアプリケーションCPU（2× Cortex-M33 @240 MHz）と低消費電力コア（Cortex-M33 @24 MHz、専用Bluetoothコントローラー）を備えています。内蔵SRAMは592 KBで、Bluetoothはデュアルモード（Classic Bluetooth + BLE）です。グラフィックスはePicasso 3.0 + eZip 3.0、パッケージはQFN68 / QFN80 / BGA112（7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)）、USBは2.0 FSです。

**SF32LB57xが対応するディスプレイインターフェースは？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGBに対応しています。詳細は[デバイスごとのインターフェースマトリクス](../../learn/graphics/display-controller.md#per-device-interface-matrix)を参照してください。

**SF32LB57xがサポートする最大ディスプレイ解像度は？**
RGB888カラーで最大1024 × 600です（DPI/RGBインターフェース経由）。詳細は[デバイスごとのインターフェースマトリクス](../../learn/graphics/display-controller.md#per-device-interface-matrix)を参照してください。

**SF32LB57xのパッケージ内メモリー容量は？**
パッケージ内PSRAMは最大 48 MB、パッケージ内NOR Flashは最大 32 MB です。

**SF32LB57xの電源電圧は？**
3.0～4.7 V または 2.97～3.63 Vです。

**SF32LB57xでハードウェア設計を始めるには？**
まず[SF32LB57xハードウェア設計ガイド](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)で回路図、電源、クロック/RF、PCBレイアウトの指針を確認し、基板リリース前に回路図とレイアウトのチェックリストを使用してください。
<!-- uf-faq:end -->

## 関連製品 { #related-products }

### ハードウェア設計の基準 { #hardware-design-baseline }

設計の基準資料として、[ハードウェア設計ガイド（μForge.io）](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)、公式ハードウェアアプリケーションノート、データシート、承認ベンダーリストを参照してください。回路図やPCBをリリースする前に、電源構成、パッケージのファンアウト、ディスプレイ、ストレージ、オーディオ、カメラ、RF、デバッグ／書き込み方法を確認します。

### 開発キット { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)は、RGBディスプレイ、DVPカメラ、デュアルPDMマイク、スピーカー出力、SDIO Wi-Fi、USBを評価できる評価ボードです。SF32LB57コアボードを中核としています。このコアボードは、RF認証が完了して市販されるまでの間、57モジュールの位置づけです。

電源、クロック、RF、ディスプレイ、ストレージ、オーディオ、カメラ、量産時のアクセス方法を計画する際は、公式のリファレンス回路図、最小システムの設計情報、チェックリストを活用してください。

### リファレンス製品 { #reference-products }

SF32LB57xを使った代表的な最終製品には、スマートウォッチやバンド、スマートHMI、電子ペーパー機器、小型・中型スマート家電、携帯型録音・オーディオ機器、スマートホームパネル、小型ディスプレイ端末、カメラ搭載Bluetooth製品などがあります。
