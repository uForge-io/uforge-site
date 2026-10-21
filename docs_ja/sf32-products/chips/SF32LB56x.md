---
icon: lucide/microchip
description: "SF32LB56x: 高機能なディスプレイ、内蔵オーディオ、外部メモリー、常時動作時の処理能力を必要とする製品向けの、先進的なデュアルモードBluetooth対応・超低消費電力MCUファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB56x { #sf32lb56x }

## 概要 { #overview }

SF32LB56xシリーズは、デュアルモードBluetooth、より高度なグラフィックス、内蔵オーディオ、外部メモリーを必要とし、下位クラスのSF32LBデバイスより柔軟なディスプレイ・ストレージ構成を求める製品向けの、先進的な超低消費電力AIoTマイクロコントローラーファミリーです。

本ファミリーはbig.LITTLEデュアルコア構成を採用し、最大240 MHzの高性能Arm Cortex-M33 STAR-MC1[^1] アプリケーションプロセッサーと、最大96 MHzの超低消費電力Arm Cortex-M33 STAR-MC1プロセッサーを搭載しています。メインコアがUI、ディスプレイ、ストレージ、製品ロジックを処理し、低消費電力コアがセンサーの常時監視、待機時の制御、Bluetooth制御をより少ない電力で担います。

SiFliの公式製品ブリーフとデータシートでは、SF32LB56xを、表示機能やオーディオ機能を重視する接続機器向けの高集積MCUと位置付けています。BLE Audio対応デュアルモードBluetooth 5.3、ePicasso 2.0グラフィックス、内蔵オーディオADC/DAC、TinyML向けアクセラレーター、パッケージ内蔵Flashに加え、外部メモリーやディスプレイ用のインターフェースも充実しています。無線、表示、オーディオの要件がSF32LB55xの範囲を超えていても、MCUクラスの電力効率と高い機能統合度を保ちたい設計に適しています。

SiFliのチップ型番ガイドも確認してください。SF32LB56xで利用できるディスプレイインターフェースはパッケージによって異なるため、正確な型番とパッケージはPCB設計の後半ではなく、アーキテクチャを決める段階で選定します。

[^1]: STAR-MC1はArm China製の構成可能なArmv8-M Mainline組み込みCPU IPです。対応するSF32デバイスにおいて、SiFliはこれをArm Cortex-M33 STAR-MC1アプリケーションプロセッサーとして文書化しています。Cortex-M33クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存のCortex-M33ファームウェア、ミドルウェア、RTOSポート、ツールを引き継ぐことができます。CU、SP、SEの各構成は主にキャッシュ、TCM、XIPU、TrustZone対応の点で異なり、Arm Custom Instructions/CDEおよびコプロセッサーインターフェースはオプション機能であり、対象のSF32部品ごとに確認が必要です。SiFliのドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB56xは、ディスプレイ、オーディオ、ストレージ、またはローカル処理能力を強化したいデュアルモードBluetooth製品に推奨されます。** たとえば、次の用途が挙げられます。

- スマートウォッチとスマートバンド
- グラフィカルなUIを備えるウェアラブル機器
- 医療・ヘルスケア機器
- 接続機能を持つHMI製品
- 産業用携帯端末
- スマートロックとスマート家電
- 低消費電力センサーハブ
- 高機能な電動自転車・電動キックボード用ディスプレイ

次の機能が1つ以上必要な場合は、SF32LB56xを選定候補に加えてください。

- BLE Audioに対応したデュアルモードBluetooth 5.3
- 統合されたHiFiオーディオADCとDAC
- より複雑な表示処理と高負荷なグラフィックス処理
- DPI（RGB）ディスプレイインターフェース
- SDIO経由の外部Wi-Fi、SD/SDIOまたはeMMC経由の外部ストレージ
- WBBGA175パッケージで利用できる、より多くのGPIO
- TinyML、オーディオ、UIを並行処理するための余裕

## 開発リソース { #development-resources }

[製品概要]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[データシート]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[ハードウェア設計ガイド (U、wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[ハードウェア設計ガイド (V、wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SiFli公式ハードウェアアプリケーション資料 (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[SiFli公式ハードウェアアプリケーション資料 (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[ハードウェア設計ガイド (μForge.io)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[ハードウェア設計チェックリスト（原文）]: https://wiki.sifli.com/hardware/index.html
[SDKドキュメント]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[APIリファレンス]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[製品概要]__
- :fontawesome-solid-file-pdf: __[データシート]__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (U、wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (V、wiki.sifli.com)]__
- :fontawesome-brands-github: __[SiFli公式ハードウェアアプリケーション資料 (U)]__
- :fontawesome-brands-github: __[SiFli公式ハードウェアアプリケーション資料 (V)]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (μForge.io)]__
- :fontawesome-solid-book: __[SDKドキュメント]__
- :fontawesome-solid-book-open: __[APIリファレンス]__
- :fontawesome-solid-list-check: __[ハードウェア設計チェックリスト（原文）]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算とメモリー { #compute-and-memory }

- 高性能なArm Cortex-M33 STAR-MC1アプリケーションプロセッサー（HCPU）、最大240 MHz
- 超低消費電力のArm Cortex-M33 STAR-MC1プロセッサー（LCPU）、最大96 MHz
- HCPUで最大370 DMIPS / 984 EEMBC CoreMark
- LCPUで最大148 DMIPS / 394 EEMBC CoreMark
- HCPUメモリーシステム：32 KB Iキャッシュ + 16 KB Dキャッシュ、128 KBのリテンションSRAMを含む800 KBのSRAM
- LCPUメモリーシステム：16 KB Iキャッシュ + 8 KB Dキャッシュ、160 KBのリテンションSRAM
- パッケージ内QSPI-NORオプション：512 KBまたは1 MB
- QSPI-NOR、SPI-NAND、QPI/OPI-PSRAM、SD/SDIO、eMMC用の外部メモリーインターフェース

### グラフィックス、ディスプレイ、AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5Dグラフィックスアクセラレーション
- 4レイヤーのアルファブレンディングと1つの背景レイヤー
- ハードウェアによる回転、スケーリング、ミラーリング、一般的なフォーマット変換
- 最大1024 × 1024のグラフィックス処理に対応
- eZip-Aアニメーションをネイティブでサポートする、eZip 2.0によるロスレスグラフィックス展開
- 対応品種のLCDコントローラーは8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、JDIに対応。利用可否は正確なパッケージと注文型番によって異なります
- TurboPixel: extDMAによる固定比率の非可逆最終フレームバッファ圧縮とディスプレイコントローラー側での展開により、PSRAMの帯域幅と容量を削減
- TinyMLワークロード向けニューラルネットワーク行列アクセラレーター、最大1.92 GOPS、10 TOPS/W超

### オーディオと無線接続 { #audio-and-wireless-connectivity }

- BLE Audio対応のデュアルモードBluetooth 5.3
- 感度：BLE 1 Mbpsで−100 dBm、BRで−96.3 dBm、EDR2で−95.5 dBm、EDR3で−88.5 dBm
- 最大送信電力：BR/BLEで19 dBm、EDR2/EDR3で13 dBm
- BR受信ピーク電流：3.3 Vで2.2 mA
- 24ビットHiFiオーディオDAC × 1、SNR 108 dB
- 24ビットHiFiオーディオADC × 1、SNR 99 dB
- PDMインターフェース × 2、I2Sインターフェース × 1

### セキュリティ { #security }

- AES、HASH、CRCハードウェアアクセラレーター
- 真性乱数発生器(TRNG)
- PSA Certified Level 1

### ペリフェラルとI/O { #peripherals-and-ios }

- UART × 6
- I2C × 7
- SPI × 4
- ISO7816 × 1
- USB 2.0 FS × 1
- MPI × 4
- SD/SDIO/eMMC × 2（4ビット × 1、8ビット × 1）
- 12ビット汎用SAR ADC × 1、8チャンネル
- 温度センサー
- 低消費電力電圧コンパレーター × 2
- ペリフェラルタスクコントローラー(PTC)
- パッケージに応じて最大120 GPIO

### 電源とパッケージ { #power-supply-and-package }

- 電源電圧範囲：1.71 V～3.63 V
- 動作温度：−40 °C～+85 °C
- 高効率バックレギュレーターと低消費電力LDOを統合
- RTCウェイクアップ有効時のスリープ電流：600 nA
- ピンウェイクアップ有効時のスリープ電流：300 nA
- パッケージオプション: QFN68L、WBBGA175

## 製品バリエーション { #family-variants }

SF32LB56xには、コンパクトなQFN68L品からI/O数の多いWBBGA175品まであり、パッケージ内蔵メモリーの構成も異なります。ディスプレイインターフェースの対応、GPIOの余裕、ストレージ容量、PCBの製造要件、モジュールへの移行の選択肢はファミリー内で大きく異なるため、早い段階で正確な注文型番を選定してください。

表に示す品種の資料上の電源電圧範囲は1.71～3.63 V、動作温度範囲は−40～+85 °Cです。GPIO電源ドメインは1.71～3.45 Vに対応しますが、パッケージ内蔵メモリーのI/O電源には別の制限があります。I/O電圧を決める前に、対応するUまたはV品種のハードウェアガイドを確認してください。

**`SF32LB566VCB36`の資料間差異：**[SiFliチップ型番ガイド](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)では、パッケージ内蔵QSPI-NORは1 MBとされています。一方、旧版の[DS5601 V1.9.2データシート](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf)では、発注情報に4 Mb（0.5 MB）と記載されています。SiFliの現在の[製品資料一覧](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst)はDS5601 V1.9.3を案内していますが、このレビューでは同版の発注情報を確認できていません。そのため、旧版の差異が解消されたとも、現在も続いているとも判断できません。本表はチップ型番ガイドに基づいています。BOM確定前にV1.9.3の該当項目を確認するか、正確な型番と出荷時のメモリー構成をSiFliに確認してください。

<div align="center"><em>SF32LB56xの主な製品バリエーション</em></div>

<div align="center" markdown>

| 型番例 | パッケージ | HCPU / LCPU GPIO数 | パッケージ内蔵メモリー | ディスプレイインターフェース | 主な用途 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB QSPI-NOR Flash | QSPI | メモリー容量を抑え、PCBの配線を簡素化したい56シリーズの入門向けウェアラブル、電子ペーパー機器、コンパクトなHMI |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | 基本構成の560より大きなフレームバッファを必要とするコンパクトなグラフィックス機器 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | QFNのコストメリットを保ちながら、より高解像度のコンパクトなUIを実現したい設計 |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | BGAパッケージに移行せず、大容量のローカルデータを必要とするメモリー重視の小型製品 |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | OPI-PSRAM 8 MB + 4 MB、QSPI-NOR Flash 1 MB | DPI / QSPI / 8080 / JDI | 多様なディスプレイ、高いI/O数、およびSF32LB56-MODと同じシリコンを必要とする高機能なウェアラブルやHMI |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB OPI-PSRAM + 1 MB QSPI-NOR Flash | DPI / QSPI / 8080 / JDI | モジュール標準品とは異なるチップを選び、単一の大容量PSRAM領域と柔軟なディスプレイ配線を必要とする高I/O設計 |

</div>

## 設計・導入の進め方 { #integration-path }

SF32LB56xの候補リストを検証済みの設計へと進めるには、以下の順序で進めてください。

1. **ファームウェアで主要機能を検証する。** [SiFli SDKの導入ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDKの開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、製品で使うディスプレイ、オーディオ、Bluetooth、ストレージの経路を確認してください。
2. **実装方法を選ぶ。** RFや高速メモリーの設計負担を減らすなら [SF32LB56-MOD](../modules/SF32LB56-MOD.md)、基板レベルの評価を行うなら [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) を検討してください。
3. **ハードウェアを設計・レビューする。** 回路図やPCBレイアウトを確定する前に、[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md)と[回路図チェックリスト](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md)、PCBレイアウトチェックリストを確認してください。選定した型番に対応するU/Vパッケージとディスプレイインターフェースを選びます。
4. **SiFliの一次資料で最終確認する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、該当する [Uの設計ガイド][ハードウェア設計ガイド (U、wiki.sifli.com)] または [Vの設計ガイド][ハードウェア設計ガイド (V、wiki.sifli.com)]、および対応する [Uのハードウェアアプリケーション資料][SiFli公式ハードウェアアプリケーション資料 (U)] または [Vの資料][SiFli公式ハードウェアアプリケーション資料 (V)] で、注文型番とパッケージを確認してください。

<!-- uf-faq:start -->
## よくある質問 { #frequently-asked-questions }

**SF32LB56x の主な仕様は？**
SF32LB56x は、アプリケーションCPU（Cortex-M33 @240 MHz）と低消費電力コア（Cortex-M33 @48/96 MHz、ユーザープログラム可能なコア）、内蔵SRAM 960 KB、デュアルモードBluetooth（クラシック + BLE）を備えます。グラフィックス：ePicasso 2.0。パッケージ：QFN68 / BGA175（7 × 7 mm (QFN), 6.5 × 6.1 mm (BGA)）。USB 2.0 FS。ファミリー全体の値であり、個別の型番はデータシートで確認してください。

**SF32LB56x が対応するディスプレイインターフェースは？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB。対応状況は型番とパッケージによって異なります。

**SF32LB56x のパッケージ内メモリ容量は？**
型番により、パッケージ内PSRAMは最大 16 MB、パッケージ内NOR Flashは最大 1 MB です。

**SF32LB56x の電源電圧は？**
バリアントにより 1.71–3.63 V。正確な範囲はデータシートで確認してください。

**SF32LB56x でハードウェア設計を始めるには？**
まず [SF32LB56x ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) で回路図、電源、クロック/RF、PCBレイアウトの指針を確認し、基板リリース前に回路図とレイアウトのチェックリストを使用してください。
<!-- uf-faq:end -->

## 関連製品 { #related-products }

### モジュール { #module }

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) は、SF32LB566VCB36、メモリー、RF回路、アンテナの選択肢をまとめた組み込み用モジュールです。SF32LB56xの機能を活用しつつ、RF配線、アンテナ整合、水晶の配置、高速メモリーの実装に伴うリスクを抑えたい場合に適しています。

### 開発キット { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) は、チップ単体またはモジュールを使った設計を確定する前に、ファームウェアの立ち上げ、ディスプレイ、オーディオ、ストレージ、RF、および消費電力を評価するための実用的な開発環境です。

### リファレンス製品 { #reference-products }

代表的なSF32LB56xの最終製品には、高度なスマートウォッチ、接続機能を持つHMIパネル、ヘルスケア機器、産業用ハンドヘルド端末、携帯型計測器、より高機能な電動自転車・電動キックボード用ディスプレイなどがあります。
