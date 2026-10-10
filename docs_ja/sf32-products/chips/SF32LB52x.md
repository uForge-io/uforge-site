---
icon: lucide/microchip
description: "SF32LB52x: ウェアラブルや小型 AIoT 製品向けの、コストを最適化したデュアルコア Arm Cortex-M33 AIoT MCU ファミリー。バッテリー駆動の SF32LB520/3/5/7 と外部電源駆動の 52B/D/E/G/J をラインアップしています。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB52x { #sf32lb52x }

## 概要 { #overview }

SF32LB52x は、エントリークラスのスマートウェアラブル機器や小型のグラフィカル HMI、Bluetooth 周辺機器など、限られた実装スペースでディスプレイ、オーディオ、ストレージ、無線機能を必要とする AIoT 製品向けに、SiFli がコストを抑えて提供する MCU ファミリーです。

本ファミリーは、240 MHz の Arm Cortex-M33 STAR-MC1[^1] アプリケーションコアと、低消費電力の専用 Bluetooth コントローラーコア（24 MHz）を搭載しています。Bluetooth 接続の処理と常時動作が必要なタスクを分担することで、UI やアプリケーションを応答性よく動作させられます。

選定時には、SiFli のチップ型番ガイドに掲載されている主要品種を、電源方式の異なる次の 2 系統に分けて考えます。

- **SF32LB520/3/5/7**: 充電経路を内蔵したリチウムイオンバッテリー駆動品。
- **52B/D/E/G/J**: 外部電源駆動品。52B/E/G/J は一般的な 3.3 V システム向け、**52D** は特殊な 1.8 V 超低消費電力電源向けです。

この 2 系統の品種は、同じ基板でそのまま置き換えることはできません。バッテリー駆動品と外部電源駆動品はピン互換ではありません。また、1.8 V の 52D は、パッケージ上の端子配置が似ていても 3.3 V の 52B/E/G/J とは電気的仕様が異なります。

[^1]: STAR-MC1 は Arm China 製の構成可能な Armv8-M Mainline 組み込み CPU IP です。対応する SF32 デバイスにおいて、SiFli はこれを Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサーとして文書化しています。Cortex-M33 クラスのソフトウェアモデルにより、通常のデバイス固有の統合作業を前提として、既存の Cortex-M33 ファームウェア、ミドルウェア、RTOS ポート、ツールを引き継ぐことができます。CU、SP、SE の各構成は主にキャッシュ、TCM、XIPU、TrustZone 対応の点で異なり、Arm Custom Instructions/CDE およびコプロセッサーインターフェースはオプション機能であり、対象の SF32 部品ごとに確認が必要です。SiFli のドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB52x は、コスト、機能統合度、バッテリー駆動時間を重視する Bluetooth 中心の製品に適しています。** たとえば、次の用途が挙げられます。

- エントリークラスのスマートウォッチやフィットネスバンド
- Bluetooth モジュールやワイヤレスアダプター
- Bluetooth オーディオアクセサリー
- スマートセンサーやウェアラブル機器
- 電子棚札やスマートバッジ
- 携帯型ラベルプリンター
- 電動自転車・電動キックボード用ディスプレイ
- LVGL ベースの基本的な HMI デバイス

## 開発リソース { #development-resources }

[製品概要 (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[データシート (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[製品概要 (SF32LB52X外部電源ファミリー)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[データシート (SF32LB52X外部電源ファミリー)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[ハードウェア設計ガイド (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[ハードウェア設計ガイド (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[製品概要 (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[データシート (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[製品概要 (SF32LB52X外部電源ファミリー)]__
- :fontawesome-solid-file-pdf: __[データシート (SF32LB52X外部電源ファミリー)]__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算とメモリ { #compute-and-memory }

- 最大 240 MHz の Arm Cortex-M33 STAR-MC1 アプリケーションコア（DSP、MPU 搭載）
- 24 MHz で動作する専用 Arm Cortex-M33 STAR-MC1 Bluetooth コントローラーコア
- 32 KB 命令キャッシュ + 16 KB データキャッシュ
- アプリケーション用 SRAM 512 KB、Bluetooth コントローラー用 SRAM 64 KB
- バリアントに応じて、1 MB QSPI-NOR から 16 MB OPI-PSRAM までのパッケージ内蔵メモリを選択可能

### グラフィックスとオーディオ { #graphics-and-audio }

- ePicasso 2.0 2D/2.5D グラフィックスアクセラレーター
- ロスレスグラフィックス圧縮向けの eZip 2.0 ハードウェアデコーダー
- SPI/DSPI/QSPI（電子ペーパー用 SPI を含む）と 8080 8-bit に対応する専用 LCD コントローラー
- 24-bit オーディオ ADC × 1（SNR 99 dB）
- 24-bit オーディオ DAC × 1（SNR 109 dB）

### 無線接続 { #wireless-connectivity }

- Bluetooth 5.3 デュアルモード（Classic Bluetooth / BLE）
- 最大送信電力:
    - BLE/BR で 19 dBm
    - BT/EDR2 および BT/EDR3 で 13 dBm
- 受信感度: BLE 1 Mbps 時に -100 dBm
- 64 KB SRAM を搭載し、24 MHz で動作する専用 Arm Cortex-M33 STAR-MC1 Bluetooth コントローラーコア
- 製品概要に記載されたスリープ電流は 2 µA。システム全体の待機電流は動作モードや基板上の漏れ電流によって異なります。

### セキュリティ { #security }

- AES/HASH/CRC ハードウェアアクセラレーター
- TRNG
- PSA Certified Level 1

### ペリフェラルと I/O { #peripherals-and-ios }

- UART × 3
- I2C × 4
- SPI × 2
- USB 2.0 FS × 1
- I2S × 1
- PDM インターフェース × 1（デジタルマイクを最大 2 台接続可能）
- SD 3.0/SDIO 3.0/eMMC × 1
- 12 ビット汎用 ADC × 1
- 温度センサー
- RTC およびウォッチドッグタイマー
- バリアントファミリーに応じて 44 または 45 GPIO

### 電源 { #power-supply }

- **バッテリー駆動グループ: SF32LB520/3/5/7** — 単セル Li-ion/Li-Po バッテリーから直接給電し、充電機能を内蔵した電源構成を使う設計向けです。

- **外部電源駆動 3.3 V グループ: 52B/E/G/J** — 安定化された外部電源を使うシステム向けで、グループ内ではピン互換です。

- **外部電源駆動 1.8 V グループ: SF32LB52D** — 特殊な 1.8 V 超低消費電力設計向けで、3.3 V 品とは電気的に互換性がありません。

バッテリー駆動品と外部電源駆動品はシリコン構成が異なり、電源系統をまたいだ **ピン互換性はありません**。

## 製品バリエーション { #family-variants }

SiFli のチップ型番ガイドに掲載されている主要品種は、次のように分類できます。

- **SF32LB520/3/5/7**: リチウムイオンバッテリー駆動グループ、グループ内でピン互換
- **52B/E/G/J**: 標準 3.3 V 外部電源供給グループ、グループ内でピン互換
- **SF32LB52D**: 超低消費電力シナリオ向けの特殊な 1.8 V 外部電源供給バリアント

メモリ構成の異なる品種間で移行する場合、最も近い対応関係は次のとおりです。

- 520 ↔ 52B
- 523 ↔ 52E（52D は 1.8 V 版に相当）
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>SF32LB52x の主要品種</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| パッケージ | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| サイズ | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm |
| ピッチ | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| パッケージ内蔵メモリ | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| 電源電圧範囲 | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 2.97–3.63 V | 2.97–3.63 V | 1.71–1.98 V | 2.97–3.63 V | 2.97–3.63 V | 2.97–3.63 V |
| I/O 電圧 | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 動作温度 | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C | -40 ～ 85°C |

</div>

この表は、SiFli の[チップ型番ガイド](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)に掲載された主要品種をまとめたもので、完全な注文品目一覧ではありません。リンク先の外部電源版データシートには、**SF32LB52HUD6**（1.8 V、QFN68L、128 Mb PSRAM）も記載されています。また、ハードウェア設計ガイドでは `52AUx6` および `52D/F/HUx6` という追加の末尾表記も使われています。これらの資料には、統一された品種一覧がありません。設計を確定する前に、該当 SKU の注文可否、電源範囲、内蔵メモリのインターフェース、I/O 仕様を最新のデータシートで確認してください。

## 設計・導入の進め方 { #integration-path }

候補となる SF32LB52x 品種を検証済みの設計につなげるには、次の順で進めます。

1. **SDK とファームウェアを検証する。** [SiFli SDK 入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDK の開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、必要なペリフェラルと Bluetooth の動作を確認します。
2. **実装方法を選ぶ。** RF 回路を実装済みのモジュールを使える場合は [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) を検討します。そうでない場合は、ファームウェアとペリフェラルの初期評価用に、製品構成に最も近い [SF32LB52 開発ボード](../devkits/SF32LB52-DevKit-LCD.md)を選びます。
3. **ハードウェアを設計・レビューする。** 回路図や基板レイアウトを確定する前に、[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md)と、[回路図](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md)および[PCB レイアウト](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md)のチェックリストを確認します。520/3/5/7、52B/E/G/J、52D のどの電源系統を採用するかも明確にします。
4. **一次資料で仕様を確認する。** 該当する[データシート](#development-resources)と、SiFli の [520/3/5/7 向けハードウェア設計ガイド][ハードウェア設計ガイド (520/3/5/7)] または [52B/D/E/G/J 向けハードウェア設計ガイド][ハードウェア設計ガイド (52B/D/E/G/J)]を参照し、正確な注文型番とパッケージに照らして確認します。

## 関連製品 { #related-products }

### モジュール { #module }

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) の標準構成では、8 MB の OPI-PSRAM をチップと同一パッケージに収めた SF32LB525UC6 と、RF マッチング回路を組み合わせています。モジュール寸法は 27.9 × 18.0 × 3.1 mm です。チップレベルの RF 回路設計と検証の負担を抑えながら、SF32LB52 クラスの機能を利用したいプロジェクトに適しています。

### 開発キット { #development-kits }

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) は、QSPI および MCU/8080 LCD インターフェースに対応した、SF32LB52 モジュール群向けのディスプレイ中心の主要な立ち上げ用ボードです。
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) は外部電源駆動のコンパクトなコアボードで、52B/52J クラスの品種を使ったファームウェア、GPIO、低消費電力機能の初期評価に適しています。
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) は 52 シリーズで最も小型の開発ボードです。製品の実装スペースが限られる場合に役立ちます。
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) は、低消費電力を重視したボードで、バッテリー駆動を重視した評価や小型製品の試作に適しています。

### リファレンス製品 { #reference-products }

SF32LB52 の代表的な用途には、エントリークラスのスマートウォッチやフィットネスバンド、Bluetooth アクセサリー、小型グラフィカル操作パネル、電子棚札、スマートバッジ、携帯型ラベルプリンター、コストを重視する電動自転車・電動キックボード用ディスプレイなどがあります。

!!! note "自動生成コンテンツ"
    このページは専用の原資料がない状態で作成しています。記載された技術情報を利用する前に、SiFli の公式ドキュメントで確認してください。
