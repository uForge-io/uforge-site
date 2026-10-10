---
icon: lucide/microchip
description: "SF32LB56x: 高機能なディスプレイ、内蔵オーディオ、外部メモリ、常時動作時の処理能力を必要とする製品向けの、先進的なデュアルモード Bluetooth 対応・超低消費電力 MCU ファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB56x { #sf32lb56x }

## 概要 { #overview }

SF32LB56x シリーズは、デュアルモード Bluetooth、より高度なグラフィックス、内蔵オーディオ、外部メモリを必要とし、下位クラスの SF32LB デバイスより柔軟なディスプレイ・ストレージ構成を求める製品向けの、先進的な超低消費電力 AIoT マイクロコントローラーファミリーです。

本ファミリーは big.LITTLE デュアルコア構成を採用し、最大 240 MHz の高性能 Arm Cortex-M33 STAR-MC1[^1] アプリケーションプロセッサーと、最大 96 MHz の超低消費電力 Arm Cortex-M33 STAR-MC1 プロセッサーを搭載しています。メインコアが UI、ディスプレイ、ストレージ、製品ロジックを処理し、低消費電力コアがセンサーの常時監視、待機時の制御、Bluetooth 制御をより少ない電力で担います。

SiFli の公式製品ブリーフとデータシートでは、SF32LB56x を、表示機能やオーディオ機能を重視する接続機器向けの高集積 MCU と位置付けています。BLE Audio 対応デュアルモード Bluetooth 5.3、ePicasso 2.0 グラフィックス、内蔵オーディオ ADC/DAC、TinyML 向けアクセラレーター、パッケージ内蔵 Flash に加え、外部メモリやディスプレイ用のインターフェースも充実しています。無線、表示、オーディオの要件が SF32LB55x の範囲を超えていても、MCU クラスの電力効率と高い機能統合度を保ちたい設計に適しています。

SiFli のチップ型番ガイドも確認してください。SF32LB56x で利用できるディスプレイインターフェースはパッケージによって異なるため、正確な型番とパッケージは PCB 設計の後半ではなく、アーキテクチャを決める段階で選定します。

[^1]: STAR-MC1 は Arm China 製の構成可能な Armv8-M Mainline 組み込み CPU IP です。対応する SF32 デバイスにおいて、SiFli はこれを Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサーとして文書化しています。Cortex-M33 クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存の Cortex-M33 ファームウェア、ミドルウェア、RTOS ポート、ツールを引き継ぐことができます。CU、SP、SE の各構成は主にキャッシュ、TCM、XIPU、TrustZone 対応の点で異なり、Arm Custom Instructions/CDE およびコプロセッサーインターフェースはオプション機能であり、対象の SF32 部品ごとに確認が必要です。SiFli のドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB56x は、ディスプレイ、オーディオ、ストレージ、またはローカル処理能力を強化したいデュアルモード Bluetooth 製品に適しています。** たとえば、次の用途が挙げられます。

- スマートウォッチとスマートバンド
- グラフィカルな UI を備えるウェアラブル機器
- 医療・ヘルスケア機器
- 接続機能を持つ HMI 製品
- 産業用携帯端末
- スマートロックとスマート家電
- 低消費電力センサーハブ
- 高機能な電動自転車・電動キックボード用ディスプレイ

次の機能が 1 つ以上必要な場合は、SF32LB56x を選定候補に加えてください。

- BLE Audio に対応したデュアルモード Bluetooth 5.3
- 統合された HiFi オーディオ ADC と DAC
- より複雑な表示処理と高負荷なグラフィックス処理
- DPI（RGB）ディスプレイインターフェース
- SDIO 経由の外部 Wi-Fi、SD/SDIO または eMMC 経由の外部ストレージ
- WBBGA175 パッケージで利用できる、より多くの GPIO
- TinyML、オーディオ、UI を並行処理するための余裕

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

### 演算とメモリ { #compute-and-memory }

- 高性能な Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサー（HCPU）、最大 240 MHz
- 超低消費電力の Arm Cortex-M33 STAR-MC1 プロセッサー（LCPU）、最大 96 MHz
- HCPU で最大 370 DMIPS / 984 EEMBC CoreMark
- LCPU で最大 148 DMIPS / 394 EEMBC CoreMark
- HCPU メモリシステム：32 KB I キャッシュ + 16 KB D キャッシュ、128 KB のリテンション SRAM を含む 800 KB の SRAM
- LCPU メモリシステム：16 KB I キャッシュ + 8 KB D キャッシュ、160 KB のリテンション SRAM
- パッケージ内 QSPI-NOR オプション：512 KB または 1 MB
- QSPI-NOR、SPI-NAND、QPI/OPI-PSRAM、SD/SDIO、eMMC 用の外部メモリインターフェース

### グラフィックス、ディスプレイ、AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5D グラフィックスアクセラレーション
- 4 レイヤーのアルファブレンディングと 1 つの背景レイヤー
- ハードウェアによる回転、スケーリング、ミラーリング、一般的なフォーマット変換
- 最大 1024 × 1024 のグラフィックス処理に対応
- eZip-A アニメーションをネイティブでサポートする、eZip 2.0 によるロスレスグラフィックス展開
- 対応品種の LCD コントローラーは 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、JDI に対応。利用可否は正確なパッケージと注文型番によって異なります
- TurboPixel: extDMA による固定比率の非可逆最終フレームバッファ圧縮とディスプレイコントローラー側での展開により、PSRAM の帯域幅と容量を削減
- TinyML ワークロード向けニューラルネットワーク行列アクセラレーター、最大 1.92 GOPS、10 TOPS/W 超

### オーディオと無線接続 { #audio-and-wireless-connectivity }

- BLE Audio 対応のデュアルモード Bluetooth 5.3
- 感度：BLE 1 Mbps で −100 dBm、BR で −96.3 dBm、EDR2 で −95.5 dBm、EDR3 で −88.5 dBm
- 最大送信電力：BR/BLE で 19 dBm、EDR2/EDR3 で 13 dBm
- BR 受信ピーク電流：3.3 V で 2.2 mA
- 24 ビット HiFi オーディオ DAC 機能ブロック × 1、SNR 108 dB
- 24 ビット HiFi オーディオ ADC 機能ブロック × 1、SNR 99 dB
- PDM インターフェース × 2、I2S インターフェース × 1

### セキュリティ { #security }

- AES、HASH、CRC ハードウェアアクセラレーター
- 真性乱数発生器(TRNG)
- PSA Certified Level 1

### ペリフェラルと I/O { #peripherals-and-ios }

- UART × 6
- I2C × 7
- SPI × 4
- ISO7816 × 1
- USB 2.0 FS × 1
- MPI × 4
- SD/SDIO/eMMC × 2（4 ビット × 1、8 ビット × 1）
- 12 ビット汎用 SAR ADC × 1、8 チャンネル
- 温度センサー
- 低消費電力電圧コンパレーター × 2
- ペリフェラルタスクコントローラー(PTC)
- パッケージに応じて最大 120 GPIO

### 電源とパッケージ { #power-supply-and-package }

- 電源電圧範囲：1.71 V ～ 3.63 V
- 動作温度：−40 °C ～ +85 °C
- 高効率バックレギュレーターと低消費電力 LDO を統合
- RTC ウェイクアップ有効時のスリープ電流：600 nA
- ピンウェイクアップ有効時のスリープ電流：300 nA
- パッケージオプション: QFN68L、WBBGA175

## 製品バリエーション { #family-variants }

SF32LB56x には、コンパクトな QFN68L 品から I/O 数の多い WBBGA175 品まであり、パッケージ内蔵メモリの構成も異なります。ディスプレイインターフェースの対応、GPIO の余裕、ストレージ容量、PCB の製造要件、モジュールへの移行の選択肢はファミリー内で大きく異なるため、早い段階で正確な注文型番を選定してください。

表に示す品種の資料上の電源電圧範囲は 1.71～3.63 V、動作温度範囲は −40～+85 °C です。GPIO 電源ドメインは 1.71～3.45 V に対応しますが、パッケージ内蔵メモリの I/O 電源には別の制限があります。I/O 電圧を決める前に、対応する U または V 品種のハードウェアガイドを確認してください。

**`SF32LB566VCB36` の資料間差異：**[SiFli チップ型番ガイド](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)では、パッケージ内蔵 QSPI-NOR は 1 MB とされています。一方、旧版の[DS5601 V1.9.2 データシート](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf)では、発注情報に 4 Mb（0.5 MB）と記載されています。SiFli の現在の[製品資料一覧](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst)は DS5601 V1.9.3 を案内していますが、このレビューでは同版の発注情報を確認できていません。そのため、旧版の差異が解消されたとも、現在も続いているとも判断できません。本表はチップ型番ガイドに基づいています。BOM 確定前に V1.9.3 の該当項目を確認するか、正確な型番と出荷時のメモリー構成を SiFli に確認してください。

<div align="center"><em>SF32LB56x の主な製品バリエーション</em></div>

<div align="center" markdown>

| 型番例 | パッケージ | HCPU / LCPU GPIO 数 | パッケージ内蔵メモリ | ディスプレイインターフェース | 主な用途 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB QSPI-NOR Flash | QSPI | メモリ容量を抑え、PCB の配線を簡素化したい 56 シリーズの入門向けウェアラブル、電子ペーパー機器、コンパクトな HMI |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | 基本構成の 560 より大きなフレームバッファを必要とするコンパクトなグラフィックス機器 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | QFN のコストメリットを保ちながら、より高解像度のコンパクトな UI を実現したい設計 |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | BGA パッケージに移行せず、大容量のローカルデータを必要とするメモリ重視の小型製品 |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | OPI-PSRAM 8 MB + 4 MB、QSPI-NOR Flash 1 MB | DPI / QSPI / 8080 / JDI | 多様なディスプレイ、高い I/O 数、および SF32LB56-MOD と同じシリコンを必要とする高機能なウェアラブルや HMI |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB OPI-PSRAM + 1 MB QSPI-NOR Flash | DPI / QSPI / 8080 / JDI | モジュール標準品とは異なるチップを選び、単一の大容量 PSRAM 領域と柔軟なディスプレイ配線を必要とする高 I/O 設計 |

</div>

## 設計・導入の進め方 { #integration-path }

SF32LB56x の候補リストを検証済みの設計へと進めるには、以下の順序で進めてください。

1. **ファームウェアで主要機能を検証する。** [SiFli SDK の導入ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDK の開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、製品で使うディスプレイ、オーディオ、Bluetooth、ストレージの経路を確認してください。
2. **実装方法を選ぶ。** RF や高速メモリの設計負担を減らすなら [SF32LB56-MOD](../modules/SF32LB56-MOD.md)、基板レベルの評価を行うなら [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) を検討してください。
3. **ハードウェアを設計・レビューする。** 回路図や PCB レイアウトを確定する前に、[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md)と[回路図チェックリスト](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md)、PCB レイアウトチェックリストを確認してください。選定した型番に対応する U/V パッケージとディスプレイインターフェースを選びます。
4. **SiFli の一次資料で最終確認する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、該当する [U の設計ガイド][ハードウェア設計ガイド (U、wiki.sifli.com)] または [V の設計ガイド][ハードウェア設計ガイド (V、wiki.sifli.com)]、および対応する [U のハードウェアアプリケーション資料][SiFli公式ハードウェアアプリケーション資料 (U)] または [V の資料][SiFli公式ハードウェアアプリケーション資料 (V)] で、注文型番とパッケージを確認してください。

## 関連製品 { #related-products }

### モジュール { #module }

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) は、SF32LB566VCB36、メモリ、RF 回路、アンテナの選択肢をまとめた組み込み用モジュールです。SF32LB56x の機能を活用しつつ、RF 配線、アンテナ整合、水晶の配置、高速メモリの実装に伴うリスクを抑えたい場合に適しています。

### 開発キット { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) は、チップ単体またはモジュールを使った設計を確定する前に、ファームウェアの立ち上げ、ディスプレイ、オーディオ、ストレージ、RF、および消費電力を評価するための実用的な開発環境です。

### リファレンス製品 { #reference-products }

代表的な SF32LB56x の最終製品には、高度なスマートウォッチ、接続機能を持つ HMI パネル、ヘルスケア機器、産業用ハンドヘルド端末、携帯型計測器、より高機能な電動自転車・電動キックボード用ディスプレイなどがあります。

!!! note "自動生成コンテンツ"
    このページは専用の原資料がない状態で作成しています。記載された技術情報を利用する前に、SiFli の公式ドキュメントで確認してください。
