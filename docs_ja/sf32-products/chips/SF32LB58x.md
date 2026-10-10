---
icon: lucide/microchip
description: "SF32LB58x: グラフィックス、ディスプレイ、メモリ、周辺機能の要件が高いコネクテッド製品向けの、フラッグシップクラスの AIoT MCU ファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58x { #sf32lb58x }

## 概要 { #overview }

SF32LB58x シリーズは、SF32LB5x ファミリーの最上位クラスに位置します。高度なグラフィックス、大容量メモリ、デュアルモード Bluetooth、豊富なオーディオ／ディスプレイ I/O、多数の GPIO が求められるバッテリー駆動 AIoT 製品に適しており、より大型のアプリケーションプロセッサー搭載プラットフォームへ移行する必要はありません。

SF32LB58x は、3 基の Arm Cortex-M33 STAR-MC1[^1] コアを備えた異種マルチコア構成です。HCPU と ACPU は最大 240 MHz で動作する高性能コア、LCPU は最大 96 MHz で動作し、消費電力を抑えたい処理を担います。HCPU はシステム制御、ユーザーインターフェース、一般的なアプリケーション処理を担当し、ACPU は音声 DSP 処理に利用できます。LCPU は Bluetooth LE、センサーのデータ取得など、低消費電力が求められる処理に適しています。タスクを適切に分担すれば、ファームウェアから HCPU を停止できる場合があります。実際の省電力効果は、アプリケーションの負荷とファームウェアの実装に左右されます。

SiFli の資料によると、SF32LB58x は 3,744 KB のオンチップ SRAM を搭載し、SKU に応じて NOR Flash、OPI-PSRAM、HPI-PSRAM の異なる組み合わせをパッケージに内蔵します。また、MIPI DSI を含むディスプレイ機能、ベクターグラフィックスアクセラレーション、USB 2.0 High-Speed に対応し、I/O 数の多い BGA パッケージを採用しています。高解像度 UI、大きなグラフィックスアセット、SDIO 接続の外部 Wi-Fi、またはエッジ AI やセンサーフュージョンに必要な処理・メモリ資源を求める設計では、SF32LB58x を評価候補にできます。

[^1]: STAR-MC1 は Arm China 製の構成可能な Armv8-M Mainline 組み込み CPU IP です。対応する SF32 デバイスにおいて、SiFli はこれを Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサーとして文書化しています。Cortex-M33 クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存の Cortex-M33 ファームウェア、ミドルウェア、RTOS ポート、ツールを引き継ぐことができます。CU、SP、SE の各構成は主にキャッシュ、TCM、XIPU、TrustZone 対応の点で異なり、Arm Custom Instructions/CDE およびコプロセッサーインターフェースはオプション機能であり、対象の SF32 部品ごとに確認が必要です。SiFli のドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB58x は、より大きなフレームバッファ、豊かな表示機能、大容量メモリ、高密度の高速 I/O を必要とする高機能なコネクテッド製品に適しています。** たとえば、次のような製品が挙げられます。

- プレミアムスマートウォッチとスポーツウォッチ
- 高解像度ウェアラブル HMI
- サイクリングコンピューターとスマートダッシュボード
- 携帯型医療・産業用端末
- Bluetooth + 外部 Wi-Fi アクセサリー
- エッジ AI・センサーフュージョンシステム
- ディスプレイ中心の接続コントローラー

次のいずれかが設計要件となる場合は、SF32LB58x を候補として検討してください。

- 1024 × 600 以上のディスプレイ解像度
- MIPI DSI コマンドモードまたはビデオモードディスプレイのサポート
- ベクターグラフィックス、よりリッチなアニメーション、より大きな UI アセット
- SDIO 経由の外部 Wi-Fi
- 大容量のフレームバッファ、オーディオ、グラフィックス、または AI モデル用メモリ
- 高い GPIO 数、または複数の高速外部インターフェース

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

### 演算・メモリ { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1 コア × 3：HCPU と ACPU は最大 240 MHz、LCPU は最大 96 MHz
- 3,744 KB のオンチップ SRAM
- パッケージ内蔵 NOR Flash は SKU に応じて合計 1～8 MB
- パッケージ内蔵 OPI-PSRAM および HPI-PSRAM のオプション。HPI-PSRAM は SKU に応じて最大 2 × 32 MB
- 外部 NOR または SPI NAND Flash は MPI3/MPI4 で接続し、SD NAND、eMMC、SD カード、外部 Wi-Fi は SDIO で接続します。利用できる組み合わせは、インターフェースの選択とピン割り当てによって異なります。

### グラフィックス・ディスプレイ・AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5D グラフィックスアクセラレーター
- Vivante GCNanoUltraV ベクターグラフィックスエンジン
- eZip 2.0 ロスレスグラフィックス展開アクセラレーター
- JPEG/MJPEG のハードウェアエンコード／デコード、画像のクロップ／スケーリング
- TinyML ワークロード向けニューラルネットワーク行列アクセラレーター
- 最大 1280 × 800 のディスプレイ解像度
- MIPI DSI コマンドモードおよびビデオモードディスプレイのサポート
- SPI、DSPI、QSPI（SPI 接続の電子ペーパーを含む）、MCU8080、JDI、RGB/DPI（RGB888 または RGB565）、MIPI DSI ディスプレイインターフェース
- MIPI DSI と SPI、DSPI、または QSPI を組み合わせ、異なる内容を表示する 2 画面構成に対応
- ローカルなエッジ AI、機械学習、センサーフュージョンワークロードに適合

### オーディオ・無線通信 { #audio-and-wireless-connectivity }

- デュアルモード Bluetooth 5.3
- Bluetooth Classic および Bluetooth LE のサポート
- SDIO 経由の外部 Wi-Fi 接続
- 統合オーディオ ADC × 2
- 統合オーディオ DAC × 2
- PDM インターフェース × 2（各インターフェースにデジタルマイクを最大 2 台接続可能。インターフェース数とマイク数は同じではなく、実際の接続数はピン多重化と基板配線にも左右されます）
- I2S インターフェースは 3 系統。I2S1 は入力専用、I2S2 と I2S3 は入出力に対応し、すべてマスターモードで動作
- USB 2.0 High-Speed のホスト／デバイスモード

### システム統合 { #system-integration }

- オンチップ PMU は BUCK 出力 2 系統と LDO 出力 3 系統を備えています
- ウェアラブル製品の電源ツリーには、オプションの SF30147C PMIC を利用できます
- BGA256 は、ディスプレイ、ストレージ、オーディオ、接続機能を 1 つの MCU に集約する高密度設計に適しています
- オンチップ SRAM、パッケージ内蔵 PSRAM、ディスプレイ機能により、グラフィックスやメモリを多く必要とする設計に対応できます

### ペリフェラル・I/O { #peripherals-and-ios }

**GPIO 数に関する注記：**現行の [SiFli チップ型番ガイド](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) では、掲載されている SF32LB58x の各品番について HCPU GPIO 94 本、LCPU GPIO 66 本、合計 160 本としています。一方、以前のデータシートでは HPSYS GPIO 94 本、LPSYS GPIO 60 本に加えて AON GPO 6 本（GPIO 154 本 + AON GPO 6 本）と記載されています。6 本の常時オン出力の分類が資料によって異なるため、この数え方の違いだけではパッケージ端子の総数が異なるとは判断できません。また、160 本すべてを自由に割り当てられる GPIO とみなすこともできません。基板設計の前に、[SiFli 製品インデックス](https://wiki.sifli.com/silicon/index.html)から現行の V1.8.6 データシートを確認し、対象品番のピン機能表で GPIO 数と各端子の機能を照合してください。SiFli の [GPIO FAQ](https://wiki.sifli.com/en/faq/mcu/gpio.html)では PBR を独立した低消費電力 I/O バンクとして扱っています。資料に明記されていない限り、PBR を HCPU/LCPU の GPIO 数に加えないでください。

- GPIO は 160 本（HCPU 94 本 + LCPU 66 本、現行チップ型番ガイドによる）
- CAN インターフェース × 2
- SDIO インターフェース × 2
- SWD デバッグインターフェース
- デバッグ出力に選択できる UART インターフェース × 6
- RTC、ウォッチドッグ、GPIO ウェイク、PBR ウェイク、PWM、I2C、SPI、汎用アナログインターフェース
- 高密度設計向けの BGA256 パッケージ

### 電源・パッケージ { #power-supply-and-package }

- 電源電圧範囲：1.71～3.63 V
- BGA256 パッケージ、6.5 × 8.5 × 0.94 mm、0.4 mm ピッチ
- HDI PCB が必須。量産設計には 6HDI-2 積層構成が推奨されます

## 製品バリエーション { #family-variants }

SiFli の現行チップ型番ガイドには、BGA256 の SF32LB58x が 6 品番掲載されており、パッケージ内蔵メモリの構成を以下に示します。Flash と PSRAM の組み合わせや供給状況は変わる場合があるため、正確な注文型番は最新のデータシートと承認ベンダーリスト（AVL）で確認してください。

<div align="center"><em>SF32LB58x の品番とパッケージ内蔵メモリ</em></div>

<div align="center" markdown>

| 品番 | パッケージ | パッケージ内蔵メモリ |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 起動用 NOR Flash 1 MB。MPI1、MPI2 にはメモリを内蔵しません |
| SF32LB581VCN36 | BGA256 | 起動用 NOR Flash 1 MB + MPI1 の OPI-PSRAM 8 MB |
| SF32LB583VCC36 | BGA256 | 起動用 NOR Flash 1 MB + MPI1、MPI2 に各 OPI-PSRAM 8 MB |
| SF32LB585V5E56 | BGA256 | 起動用 NOR Flash 4 MB + MPI1 の NOR Flash 4 MB + MPI2 の HPI-PSRAM 32 MB |
| SF32LB586VDD36 | BGA256 | 起動用 NOR Flash 1 MB + MPI1、MPI2 に各 HPI-PSRAM 16 MB |
| SF32LB587VEE56 | BGA256 | 起動用 NOR Flash 4 MB + MPI1、MPI2 に各 HPI-PSRAM 32 MB |

</div>

製品バリエーションを選ぶ際は、まず次の点を確認してください。

- 必要なフレームバッファ、アセット、オーディオ、モデルメモリのサイズ
- ディスプレイインターフェースと対象解像度
- 外部ストレージと Wi-Fi インターフェースの要件
- BGA256、0.4 mm ピッチの HDI レイアウトに対する PCB 製造能力

## 設計・導入の進め方 { #integration-path }

SF32LB58x の候補リストを検証済みの設計へと進めるには、以下の順序で進めてください。

1. **ファームウェアの実現性を検証する。** まず [SiFli SDK 入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md) を読み、[SiFli SDK の開発フロー](../../develop/platforms/sifli-sdk/overview.md) と [サンプル](../../develop/examples/index.md) を使って、ディスプレイ、グラフィックス、オーディオ、ストレージ、Bluetooth の構成を検証してください。
2. **実装形態を選ぶ。** RF、BGA、メモリレイアウトのリスクを減らすことが重要な場合は [SF32LB58-MOD](../modules/SF32LB58-MOD.md) を検討し、初期のボードレベル検証には [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) を使用してください。
3. **ハードウェアを設計・レビューする。** 回路図やレイアウトをリリースする前に、本サイトの [ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md)を参照し、[回路図](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md)と [PCB レイアウト](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md)のチェックリストも活用してください。BGA256 の HDI とメモリ配線の前提を早期に検証してください。
4. **SiFli の一次資料で確認する。** SiFli の [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]、[ハードウェアアプリケーションノートのソース][ハードウェアアプリケーションノート (GitHubソース)] に照らして、正確な注文型番とパッケージを確認してください。

## 関連製品 { #related-products }

### モジュール { #module }

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) は、SF32LB586VDD36 チップ、その RF マッチングネットワーク、パッケージ内 HPI-PSRAM とストレージオプションを、すぐに組み込めるモジュールにまとめています。58 シリーズの機能を必要としながらも、ハードウェア開発の早い段階で RF、BGA、メモリレイアウトのリスクを軽減したいプロジェクトに適しています。

### 開発キット { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) は、電源ツリー、ディスプレイ、ストレージ、オーディオ、RF、USB、SDIO の設計判断の出発点です。

### リファレンス製品 { #reference-products }

代表的な SF32LB58x の最終製品には、プレミアムウォッチプラットフォーム、高解像度ウェアラブル HMI、スマートダッシュボード、携帯型接続端末、そして Bluetooth、ディスプレイ、オーディオ、ストレージ、ローカル AI ワークロードを組み合わせたデバイスなどがあります。

!!! note "自動生成コンテンツ"
    このページは専用の原資料がない状態で作成しています。記載された技術情報を利用する前に、SiFli の公式ドキュメントで確認してください。
