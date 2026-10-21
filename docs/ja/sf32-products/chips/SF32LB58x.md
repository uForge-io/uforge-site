---
icon: lucide/microchip
description: "SF32LB58x: グラフィックス、ディスプレイ、メモリー、周辺機能の要件が高いコネクテッド製品向けの、フラッグシップクラスのAIoT MCUファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58x { #sf32lb58x }

## 概要 { #overview }

SF32LB58xシリーズは、SF32LB5xファミリーの最上位クラスに位置します。高度なグラフィックス、大容量メモリー、デュアルモードBluetooth、豊富なオーディオ／ディスプレイI/O、多数のGPIOが求められるバッテリー駆動AIoT製品に適しており、より大型のアプリケーションプロセッサー搭載プラットフォームへ移行する必要はありません。

SF32LB58xは、3基のArm Cortex-M33 STAR-MC1[^1] コアを備えた異種マルチコア構成です。HCPUとACPUは最大240 MHzで動作する高性能コア、LCPUは最大96 MHzで動作し、消費電力を抑えたい処理を担います。HCPUはシステム制御、ユーザーインターフェース、一般的なアプリケーション処理を担当し、ACPUは音声DSP処理に利用できます。LCPUはBluetooth LE、センサーのデータ取得など、低消費電力が求められる処理に適しています。タスクを適切に分担すれば、ファームウェアからHCPUを停止できる場合があります。実際の省電力効果は、アプリケーションの負荷とファームウェアの実装に左右されます。

SiFliの資料によると、SF32LB58xは3,744 KBのオンチップSRAMを搭載し、SKUに応じてNOR Flash、OPI-PSRAM、HPI-PSRAMの異なる組み合わせをパッケージに内蔵します。また、MIPI DSIを含むディスプレイ機能、ベクターグラフィックスアクセラレーション、USB 2.0 High-Speedに対応し、I/O数の多いBGAパッケージを採用しています。高解像度UI、大きなグラフィックスアセット、SDIO接続の外部Wi-Fi、またはエッジAIやセンサーフュージョンに必要な処理・メモリー資源を求める設計では、SF32LB58xを評価候補にできます。

[^1]: STAR-MC1はArm China製の構成可能なArmv8-M Mainline組み込みCPU IPです。対応するSF32デバイスにおいて、SiFliはこれをArm Cortex-M33 STAR-MC1アプリケーションプロセッサーとして文書化しています。Cortex-M33クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存のCortex-M33ファームウェア、ミドルウェア、RTOSポート、ツールを引き継ぐことができます。CU、SP、SEの各構成は主にキャッシュ、TCM、XIPU、TrustZone対応の点で異なり、Arm Custom Instructions/CDEおよびコプロセッサーインターフェースはオプション機能であり、対象のSF32部品ごとに確認が必要です。SiFliのドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB58xは、より大きなフレームバッファ、豊かな表示機能、大容量メモリー、高密度の高速I/Oを必要とする高機能なコネクテッド製品に推奨されます。** たとえば、次のような製品が挙げられます。

- プレミアムスマートウォッチとスポーツウォッチ
- 高解像度ウェアラブルHMI
- サイクリングコンピューターとスマートダッシュボード
- 携帯型医療・産業用端末
- Bluetooth + 外部Wi-Fiアクセサリー
- エッジAI・センサーフュージョンシステム
- ディスプレイ中心の接続コントローラー

次のいずれかが設計要件となる場合は、SF32LB58xを候補として検討してください。

- 1024 × 600以上のディスプレイ解像度
- MIPI DSIコマンドモードまたはビデオモードディスプレイのサポート
- ベクターグラフィックス、よりリッチなアニメーション、より大きなUIアセット
- SDIO経由の外部Wi-Fi
- 大容量のフレームバッファ、オーディオ、グラフィックス、またはAIモデル用メモリー
- 高いGPIO数、または複数の高速外部インターフェース

## 開発リソース { #development-resources }

[製品概要]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[データシート]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[ハードウェアアプリケーションノート (GitHubソース)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[ハードウェア設計ガイド (μForge.io)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[製品概要]__
- :fontawesome-solid-file-pdf: __[データシート]__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]__
- :fontawesome-brands-github: __[ハードウェアアプリケーションノート (GitHubソース)]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (μForge.io)]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算・メモリー { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1コア × 3：HCPUとACPUは最大240 MHz、LCPUは最大96 MHz
- 3,744 KBのオンチップSRAM
- パッケージ内蔵NOR FlashはSKUに応じて合計1～8 MB
- パッケージ内蔵OPI-PSRAMおよびHPI-PSRAMのオプション。HPI-PSRAMはSKUに応じて最大2 × 32 MB
- 外部NORまたはSPI NAND FlashはMPI3/MPI4で接続し、SD NAND、eMMC、SDカード、外部Wi-FiはSDIOで接続します。利用できる組み合わせは、インターフェースの選択とピン割り当てによって異なります。

### グラフィックス・ディスプレイ・AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5Dグラフィックスアクセラレーター
- Vivante GCNanoUltraVベクターグラフィックスエンジン
- eZip 2.0ロスレスグラフィックス展開アクセラレーター
- JPEG/MJPEGのハードウェアエンコード／デコード、画像のクロップ／スケーリング
- TinyMLワークロード向けニューラルネットワーク行列アクセラレーター
- 最大1280 × 800のディスプレイ解像度
- MIPI DSIコマンドモードおよびビデオモードディスプレイのサポート
- SPI、DSPI、QSPI（SPI接続の電子ペーパーを含む）、MCU8080、JDI、RGB/DPI（RGB888またはRGB565）、MIPI DSIディスプレイインターフェース
- MIPI DSIとSPI、DSPI、またはQSPIを組み合わせ、異なる内容を表示する2画面構成に対応
- ローカルなエッジAI、機械学習、センサーフュージョンワークロードに適合

### オーディオ・無線通信 { #audio-and-wireless-connectivity }

- デュアルモードBluetooth 5.3
- Bluetooth ClassicおよびBluetooth LEのサポート
- SDIO経由の外部Wi-Fi接続
- 統合オーディオADC × 2
- 統合オーディオDAC × 2
- PDMインターフェース × 2（各インターフェースにデジタルマイクを最大2台接続可能。インターフェース数とマイク数は同じではなく、実際の接続数はピン多重化と基板配線にも左右されます）
- I2Sインターフェースは3系統。I2S1は入力専用、I2S2とI2S3は入出力に対応し、すべてマスターモードで動作
- USB 2.0 High-Speedのホスト／デバイスモード

### システム統合 { #system-integration }

- オンチップPMUはBUCK出力2系統とLDO出力3系統を備えています
- ウェアラブル製品の電源ツリーには、オプションのSF30147C PMICを利用できます
- BGA256は、ディスプレイ、ストレージ、オーディオ、接続機能を1つのMCUに集約する高密度設計に適しています
- オンチップSRAM、パッケージ内蔵PSRAM、ディスプレイ機能により、グラフィックスやメモリーを多く必要とする設計に対応できます

### ペリフェラル・I/O { #peripherals-and-ios }

**GPIO数に関する注記：**現行の [SiFliチップ型番ガイド](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) では、掲載されているSF32LB58xの各品番についてHCPU GPIO 94本、LCPU GPIO 66本、合計160本としています。一方、以前のデータシートではHPSYS GPIO 94本、LPSYS GPIO 60本に加えてAON GPO 6本（GPIO 154本 + AON GPO 6本）と記載されています。6本の常時オン出力の分類が資料によって異なるため、この数え方の違いだけではパッケージ端子の総数が異なるとは判断できません。また、160本すべてを自由に割り当てられるGPIOとみなすこともできません。基板設計の前に、[SiFli製品インデックス](https://wiki.sifli.com/silicon/index.html)から現行のV1.8.6データシートを確認し、対象品番のピン機能表でGPIO数と各端子の機能を照合してください。SiFliの [GPIO FAQ](https://wiki.sifli.com/en/faq/mcu/gpio.html)ではPBRを独立した低消費電力I/Oバンクとして扱っています。資料に明記されていない限り、PBRをHCPU/LCPUのGPIO数に加えないでください。

- GPIOは160本（HCPU 94本 + LCPU 66本、現行チップ型番ガイドによる）
- CANインターフェース × 2
- SDIOインターフェース × 2
- SWDデバッグインターフェース
- デバッグ出力に選択できるUARTインターフェース × 6
- RTC、ウォッチドッグ、GPIOウェイク、PBRウェイク、PWM、I2C、SPI、汎用アナログインターフェース
- 高密度設計向けのBGA256パッケージ

### 電源・パッケージ { #power-supply-and-package }

- 電源電圧範囲：1.71～3.63 V
- BGA256パッケージ、6.5 × 8.5 × 0.94 mm、0.4 mmピッチ
- HDI PCBが必須。量産設計には6HDI-2積層構成が推奨されます

## 製品バリエーション { #family-variants }

SiFliの現行チップ型番ガイドには、BGA256のSF32LB58xが6品番掲載されており、パッケージ内蔵メモリーの構成を以下に示します。FlashとPSRAMの組み合わせや供給状況は変わる場合があるため、正確な注文型番は最新のデータシートと承認ベンダーリスト（AVL）で確認してください。

<div align="center"><em>SF32LB58xの品番とパッケージ内蔵メモリー</em></div>

<div align="center" markdown>

| 品番 | パッケージ | パッケージ内蔵メモリー |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 起動用NOR Flash 1 MB。MPI1、MPI2にはメモリーを内蔵しません |
| SF32LB581VCN36 | BGA256 | 起動用NOR Flash 1 MB + MPI1のOPI-PSRAM 8 MB |
| SF32LB583VCC36 | BGA256 | 起動用NOR Flash 1 MB + MPI1、MPI2に各OPI-PSRAM 8 MB |
| SF32LB585V5E56 | BGA256 | 起動用NOR Flash 4 MB + MPI1のNOR Flash 4 MB + MPI2のHPI-PSRAM 32 MB |
| SF32LB586VDD36 | BGA256 | 起動用NOR Flash 1 MB + MPI1、MPI2に各HPI-PSRAM 16 MB |
| SF32LB587VEE56 | BGA256 | 起動用NOR Flash 4 MB + MPI1、MPI2に各HPI-PSRAM 32 MB |

</div>

製品バリエーションを選ぶ際は、まず次の点を確認してください。

- 必要なフレームバッファ、アセット、オーディオ、モデルメモリーのサイズ
- ディスプレイインターフェースと対象解像度
- 外部ストレージとWi-Fiインターフェースの要件
- BGA256、0.4 mmピッチのHDIレイアウトに対するPCB製造能力

## 設計・導入の進め方 { #integration-path }

SF32LB58xの候補リストを検証済みの設計へと進めるには、以下の順序で進めてください。

1. **ファームウェアの実現性を検証する。** まず [SiFli SDK入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md) を読み、[SiFli SDKの開発フロー](../../develop/platforms/sifli-sdk/overview.md) と [サンプル](../../develop/examples/index.md) を使って、ディスプレイ、グラフィックス、オーディオ、ストレージ、Bluetoothの構成を検証してください。
2. **実装形態を選ぶ。** RF、BGA、メモリーレイアウトのリスクを減らすことが重要な場合は [SF32LB58-MOD](../modules/SF32LB58-MOD.md) を検討し、初期のボードレベル検証には [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) を使用してください。
3. **ハードウェアを設計・レビューする。** 回路図やレイアウトをリリースする前に、本サイトの [ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md)を参照し、[回路図](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md)と [PCBレイアウト](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md)のチェックリストも活用してください。BGA256のHDIとメモリー配線の前提を早期に検証してください。
4. **SiFliの一次資料で確認する。** SiFliの [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]、[ハードウェアアプリケーションノートのソース][ハードウェアアプリケーションノート (GitHubソース)] に照らして、正確な注文型番とパッケージを確認してください。

<!-- uf-faq:start -->
## よくある質問 { #frequently-asked-questions }

**SF32LB58x の主な仕様は？**
SF32LB58x は、アプリケーションCPU（2× Cortex-M33 @240 MHz）と低消費電力コア（Cortex-M33 @48/96 MHz、ユーザープログラム可能なコア）、内蔵SRAM 3.7 MB、デュアルモードBluetooth（クラシック + BLE）を備えます。グラフィックス：ePicasso 2.0 + Vivante GCNanoUltraV (vector)。パッケージ：BGA256（8.5 × 6.5 mm）。USB 2.0 HS。ファミリー全体の値であり、個別の型番はデータシートで確認してください。

**SF32LB58x が対応するディスプレイインターフェースは？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI。対応状況は型番とパッケージによって異なります。

**SF32LB58x のパッケージ内メモリ容量は？**
型番により、パッケージ内PSRAMは最大 32 MB + 32 MB、パッケージ内NOR Flashは最大 8 MB です。

**SF32LB58x の電源電圧は？**
バリアントにより 1.71–3.63 V。正確な範囲はデータシートで確認してください。

**SF32LB58x でハードウェア設計を始めるには？**
まず [SF32LB58x ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) で回路図、電源、クロック/RF、PCBレイアウトの指針を確認し、基板リリース前に回路図とレイアウトのチェックリストを使用してください。
<!-- uf-faq:end -->

## 関連製品 { #related-products }

### モジュール { #module }

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) は、SF32LB586VDD36チップ、そのRFマッチングネットワーク、パッケージ内HPI-PSRAMとストレージオプションを、すぐに組み込めるモジュールにまとめています。58シリーズの機能を必要としながらも、ハードウェア開発の早い段階でRF、BGA、メモリーレイアウトのリスクを軽減したいプロジェクトに適しています。

### 開発キット { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) は、電源ツリー、ディスプレイ、ストレージ、オーディオ、RF、USB、SDIOの設計判断の出発点です。

### リファレンス製品 { #reference-products }

代表的なSF32LB58xの最終製品には、プレミアムウォッチプラットフォーム、高解像度ウェアラブルHMI、スマートダッシュボード、携帯型接続端末、そしてBluetooth、ディスプレイ、オーディオ、ストレージ、ローカルAIワークロードを組み合わせたデバイスなどがあります。
