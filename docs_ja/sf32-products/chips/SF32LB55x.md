---
icon: lucide/microchip
description: "SF32LB55x: エントリークラスの Bluetooth MCU より高い描画性能、大容量の SRAM、幅広いパッケージ選択肢を必要とするウェアラブルおよび HMI 製品向けの、メインストリームの超低消費電力 MCU ファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB55x { #sf32lb55x }

## 概要 { #overview }

SF32LB55x シリーズは、エントリークラスの Bluetooth MCU より高い表示性能、大きなメモリ容量、幅広いパッケージ選択肢を求める BLE 接続製品向けの、メインストリームの超低消費電力 AIoT マイコンファミリーです。

本ファミリーは、2 基の Arm Cortex-M33 STAR-MC1[^1] プロセッサーによる big.LITTLE デュアルコア構成を採用しています。一方は最大 240 MHz で動作する高性能アプリケーションコア、もう一方は最大 48 MHz の超低消費電力コアです。これにより、負荷の高い UI 処理をアプリケーションコアで実行し、センサー処理、待機時制御、常時動作が必要な BLE タスクを低消費電力コアに任せられます。

SiFli の公式製品ブリーフとデータシートによると、本ファミリーは BLE 5.2、ePicasso 2.5D グラフィックスエンジン、2 基の LCD コントローラー、TinyML 向けニューラルネットワーク行列アクセラレーターを備えます。オンチップ SRAM は合計 1,312 KB（HCPU 1,088 KB + LCPU 224 KB）で、NOR、NAND、eMMC、PSRAM などの外部メモリにも対応します。SF32LB52x よりメモリや表示機能に余裕が必要でありながら、上位の 56/58 クラスまでは必要としないウェアラブル、センサーを多用する製品、小型 HMI に適した選択肢です。

SiFli のチップ型番ガイドによると、SF32LB55x は後発の 52/56/58 ファミリーより前に定義されたため、型番のサフィックスは新しい命名規則に完全には沿っていません。サフィックスだけから機能を推測せず、完全な注文型番とパッケージ別の機能表を選定の基準にしてください。

[^1]: STAR-MC1 は Arm China 製の構成可能な Armv8-M Mainline 組み込み CPU IP です。対応する SF32 デバイスにおいて、SiFli はこれを Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサーとして文書化しています。通常のデバイス固有の統合作業は必要ですが、Cortex-M33 クラスのソフトウェアモデルにより、既存の Cortex-M33 ファームウェア、ミドルウェア、RTOS ポート、ツールを引き続き活用しやすくなります。CU、SP、SE の各構成は主にキャッシュ、TCM、XIPU、TrustZone 対応の点で異なり、Arm Custom Instructions/CDE およびコプロセッサーインターフェースはオプション機能であり、対象の SF32 部品ごとに確認が必要です。SiFli のドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB55x は、エントリークラスのウェアラブル MCU より高機能な UI、大容量の作業メモリ、または柔軟なパッケージ選択肢を必要とする BLE 中心の製品に適しています。** たとえば、次の用途が挙げられます。

- スマートウォッチとフィットネスバンド
- 健康状態をモニタリングするウェアラブル機器
- スマートロックとスマートホームコントローラー
- センサーを多用する接続アクセサリー
- コンパクトなグラフィカル HMI 製品
- スマートスタイラスやペン入力対応機器
- 携帯端末やハンドヘルドコントローラー

次の機能が 1 つ以上必要な場合は、SF32LB55x を候補にしてください。

- 受信電流が非常に小さい BLE 5.2 接続
- MIPI DSI コマンドモード対応ディスプレイ
- LVGL、グラフィックス素材、センサー処理、TinyML に使える大容量 SRAM
- ユーザープログラム可能な低消費電力プロセッサー
- SF32LB52x より多い GPIO、または I/O 密度の高いパッケージの選択肢
- NOR、NAND、eMMC、QSPI-PSRAM、OPI-PSRAM などの外部メモリ選択肢

## 開発リソース { #development-resources }

[製品概要]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[データシート]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[ハードウェアアプリケーションノート (GitHubソース)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SiFliチップ型番ガイド]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[ハードウェア設計ガイド (μForge.io)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[ハードウェア設計チェックリスト（原文）]: https://wiki.sifli.com/hardware/index.html
[SDKドキュメント]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[APIリファレンス]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[製品概要]__
- :fontawesome-solid-file-pdf: __[データシート]__
- :fontawesome-solid-file-pdf: __[ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]__
- :fontawesome-brands-github: __[ハードウェアアプリケーションノート (GitHubソース)]__
- :fontawesome-solid-list: __[SiFliチップ型番ガイド]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド (μForge.io)]__
- :fontawesome-solid-book: __[SDKドキュメント]__
- :fontawesome-solid-book-open: __[APIリファレンス]__
- :fontawesome-solid-list-check: __[ハードウェア設計チェックリスト（原文）]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specs }

### 演算とメモリ { #compute-and-memory }

- 高性能な Arm Cortex-M33 STAR-MC1 アプリケーションプロセッサー、最大 240 MHz
- 超低消費電力の Arm Cortex-M33 STAR-MC1 プロセッサー、最大 48 MHz
- アプリケーションプロセッサーで最大 360 DMIPS / 965 EEMBC CoreMark
- 低消費電力プロセッサーで最大 72 DMIPS / 193 EEMBC CoreMark
- 1,088 KB のアプリケーション SRAM（64 KB のリテンション SRAM を含む）
- 224 KB の低消費電力 SRAM（全領域がリテンション SRAM）
- NOR、NAND、eMMC、QSPI-PSRAM、OPI-PSRAM 用の外部メモリインターフェース

### グラフィックス、ディスプレイ、AI { #graphics-display-and-ai }

- ハードウェアによる回転、スケーリング、ミラーリング、アルファブレンディングに対応した ePicasso 2.5D グラフィックスエンジン
- eZip による可逆グラフィックス展開に対応し、ePicasso と連携して使用できます
- ePicasso の変換レイヤーは最大 640 × 640、汎用レイヤーとディスプレイ出力は最大 1024 × 1024 に対応し、表示出力は最大 60 fps
- LCD コントローラーは 8080、SPI、Dual-SPI、Quad-SPI、DPI、MIPI DSI、JDI 反射型ディスプレイに対応（インターフェースの有無は品種によるため、選定した型番で確認してください）
- TurboPixel のフレームバッファ圧縮では、LCD コントローラーが圧縮フレームを読み込み、表示時に展開します。フレームバッファの使用量と読み出し帯域を抑えられます
- LCD コントローラーを 2 基搭載。常時表示用インターフェースとデュアルディスプレイ機能は、型番とパッケージによって異なります
- TinyML 向けニューラルネットワーク行列アクセラレーター（最大 1.92 GOPS、5.73 TOPS/W）

### 無線接続 { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- BLE 125 kbps、500 kbps、1 Mbps、2 Mbps モード
- 1 Mbps モードで受信感度 -100 dBm
- 最大送信電力: 10 dBm
- 受信ピーク電流: 3.3 V 時に 2.0 mA

### セキュリティ { #security }

- AES および CRC ハードウェアアクセラレーター
- 真性乱数発生器(TRNG)
- PSA Certified Level 1

### ペリフェラルと I/O { #peripherals-and-ios }

- ファミリー全体で UART は最大 5 系統、I2C は最大 6 系統、SPI は最大 4 系統。搭載数は型番によって異なります（下表を参照）
- I2S と PDM の搭載数も型番によって異なります（下表を参照）。各 PDM インターフェースには最大 2 個のデジタルマイクを接続できます。インターフェース数とマイク数は同じではないため、選定した型番のピン配置も確認してください。

<div align="center"><em>公開資料に記載されたモデル別ペリフェラル数と ADC 数（SS6600A8 は未記載）</em></div>

<div align="center" markdown>

| 型番 | UART | I2C | SPI | I2S | PDM | 16 ビット Sigma-Delta ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | 未記載 | 未記載 | 未記載 | 未記載 | 未記載 | 未記載 |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | なし |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 チャンネル |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 チャンネル |

</div>

**SS6600A8 の資料注記:** 現行の[SiFliチップ型番ガイド][SiFliチップ型番ガイド]には本品のパッケージ、パッケージ内蔵メモリ、GPIO、ディスプレイインターフェースが記載されていますが、UART、I2C、SPI、I2S、PDM、Sigma-Delta ADC の型番別の数は記載されていません。[DS5501 V1.7.2 データシート][データシート]の表 0-1 にも SS6600A8 の個別行はありません。そのため表では数量を「未記載」としています。QFN68L というパッケージが SF32LB551U4O5 と同じでも、同品番の数量を流用しないでください。ピンを割り当てる前に、具体的な構成を SiFli に確認してください。

- USB 2.0 FS Host/Device × 1
- 10 ビット GPADC（SAR ADC）× 1。データシートでは、最大 8 チャンネルのシングルエンド入力または 4 組の差動入力に対応し、シングルエンド入力範囲は 0～1.1 V とされています
- **ADC資料の不一致:** [DS5501 V1.7.2 データシート][データシート]では最大 8 チャンネルのシングルエンド入力または 4 組の差動入力、シングルエンド入力範囲 0～1.1 V とされています。一方、[SF32LB55x ハードウェアアプリケーションノート][ハードウェアアプリケーションノート (GitHubソース)]には 5 チャンネル、入力範囲 0～0.9 V と記載されています。アナログフロントエンドの設計前に、対象品番と SDK バージョンに応じたチャンネル割り当てと入力上限を確認してください。
- 上表の BGA145 および BGA169 品種は 16 ビット Sigma-Delta ADC（5 チャンネル）を 1 基搭載。QFN68L 品種には搭載されていません
- 温度センサー
- 低消費電力電圧コンパレーター × 2
- ペリフェラルタスクコントローラー(PTC)
- GPIO 数はパッケージによって異なります。下のパッケージ表と資料間の差異に関する注記を参照してください

### 電源とパッケージ { #power-supply-and-package }

- 電源電圧範囲は品種によって異なります。SS6600A8 は 2.97 V ～ 3.63 V、551U4O5 と本ページで取り上げた BGA 品種は 1.71 V ～ 3.63 V です
- 動作温度は品種によって異なります。資料に記載された QFN 品種は −20 °C ～ +70 °C、本ページで取り上げた BGA 品種は −40 °C ～ +85 °C です
- 2 個の高効率バックレギュレーターと低消費電力 LDO を統合した電源管理
- RTC ウェイクアップ有効時のスリープ電流: 600 nA
- ピンウェイクアップ有効時のスリープ電流: 280 nA
- パッケージオプション: QFN68L、BGA145、BGA169

## 製品バリエーション { #family-variants }

SF32LB55x には QFN と BGA のパッケージがあります。GPIO 数、内蔵メモリ、利用できるディスプレイインターフェース、PCB の製造要件はパッケージによって大きく異なるため、早い段階でパッケージを選定してください。

パッケージの選定は、単なる基板レイアウト上の判断ではありません。SiFli の[チップ型番ガイド][SiFliチップ型番ガイド]によると、55x ファミリーで利用できるディスプレイインターフェースはパッケージによって異なり、全てに対応する品種もあれば、一部のみ対応する品種もあります。したがって、ディスプレイ、メモリ、ピン配分を確定する前にパッケージを決めてください。同一パッケージの品種はピン互換ですが、置き換える場合はメモリ構成とディスプレイ要件を個別に確認してください。

<div align="center"><em>SF32LB55x パッケージレベル I/O オプション</em></div>

<div align="center" markdown>

| パッケージ | HCPU / LCPU の GPIO 数 | GPIO 合計 | 主な用途 |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | PCB 製造コストを抑えたい小型ウェアラブルや BLE センサー製品 |
| BGA145 | 55 / 40 | 95 | ディスプレイ、メモリ、センサーを多く搭載し、配線余裕も必要な設計 |
| BGA169 | 71 / 42 | 113 | GPIO 数が最も多く、内蔵メモリとディスプレイの選択肢も広い SF32LB55x 設計 |

</div>

次の一覧は SiFli チップ型番ガイドに掲載されている現行の代表モデルで、パッケージとメモリ構成の違いを確認できます。このファミリーは現行の命名規則より前に定義されているため、型番末尾だけで判断せず、注文型番全体で確認してください。

<div align="center"><em>SF32LB55x の代表的な品種</em></div>

<div align="center" markdown>

| 注文型番 | パッケージ | パッケージ内蔵メモリ | 型番ガイドに記載されたディスプレイインターフェース | 選定時のポイント |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | 4 MB QSPI NOR を 2 個搭載し、1 個の 8 MB OSPI NOR として構成。パッケージ内 PSRAM なし | QSPI、8080 | GPIO 49 本、2.97 V ～ 3.63 V、−20 °C ～ +70 °C。パッケージ内 PSRAM を必要としない小型構成 |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI-NOR ブート Flash + 4 MB OPI-PSRAM | QSPI、8080 | 49 GPIO、1.71 V ～ 3.63 V、−20 °C ～ +70 °C。内蔵 PSRAM を備えたコンパクトな選択肢 |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI-NOR ブート Flash + 4 MB OPI-PSRAM | MIPI DSI コマンドモード、QSPI、8080 | 95 GPIO、−40 °C ～ +85 °C。4 MB の PSRAM を必要とする表示製品向けのバランスの取れた BGA145 品種 |
| SF32LB555V436 | BGA145 | 4 MB QSPI-NOR ブート Flash + 8 MB OPI-PSRAM | MIPI DSI コマンドモード、QSPI、8080 | 95 GPIO、−40 °C ～ +85 °C。SF32LB555V4O6 の 2 倍の内蔵 PSRAM が必要な場合の BGA145 品種 |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI-NOR ブート Flash + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSI コマンドモード、QSPI、8080、JDI/Sharp MIP | 113 GPIO、−40 °C ～ +85 °C。MIPI DSI と SPI/DSPI のデュアルディスプレイ構成に対応し、各画面に異なる内容を表示可能 |

</div>

SF32LB557VD3A6 について、SiFli の現行チップ型番ガイドと DS5501 V1.7.2 データシートの表 0-1 は、HCPU 71 GPIO + LCPU 42 GPIO、合計 113 GPIO としています。一方、同データシートの特性概要とパッケージ概要、および PB0001 V1.3 製品概要は、BGA169 を 119 GPIO（HCPU 71 + LCPU 48）と記載しています。つまり、公式資料の記載は一致しておらず、DS5501 データシート内にも差異があります。本ページでは、型番別の記載と現行チップ型番ガイドに従い、113 GPIO としています。ピンを割り当てる前、または設計を確定する前に、選定パッケージのボールマップで使用可能な GPIO を確認し、実際の注文型番について SiFli に確認してください。電源・温度定格、完全な型番、パッケージ内蔵メモリの構成も [DS5501 V1.7.2 データシート][データシート]、[PB0001 V1.3 製品概要][製品概要]、[SiFli チップ型番ガイド][SiFliチップ型番ガイド]で確認してください。BGA145 と BGA169 はいずれも、外形 7 × 7 × 0.94 mm、端子ピッチ 0.5 mm です。

## 設計・導入の進め方 { #integration-path }

候補となる SF32LB55x 品種を検証済みの設計につなげるには、次の順で進めます。

1. **SDK とファームウェアを検証する。** [SiFli SDK 入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDK の開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、必要なディスプレイ、Bluetooth、低消費電力機能の動作を確認します。
2. **評価環境を選ぶ。** 現在、μForge では SF32LB55 専用のモジュールや開発ボードを掲載していません。[SF32 製品セレクター](../product-selector.md)から最も近い評価用プラットフォームを選び、結果を 55x の設計に反映する前に、パッケージとインターフェースの対応範囲を確認します。
3. **ハードウェアを設計・レビューする。** 回路図や基板レイアウトを確定する前に、μForge の[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md)と、[回路図](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md)および PCB レイアウトのチェックリストを確認します。
4. **SiFli の一次資料で照合する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]、[ハードウェアアプリケーションノート][ハードウェアアプリケーションノート (GitHubソース)]を参照し、注文型番とパッケージを確認します。

## 関連製品 { #related-products }

### 開発キット { #development-kits }

パッケージの選定、電源系統の定義、ディスプレイインターフェースの選択、メモリの計画、RF レイアウト、量産テスト計画の出発点として、公式のハードウェアアプリケーションノート、リファレンス回路図、チェックリストを使用してください。

### リファレンス製品 { #reference-products }

SF32LB55x を使った製品の例として、スマートウォッチ、フィットネスバンド、健康状態をモニタリングするウェアラブル機器、スマートロック、接続アクセサリー、スマートホームコントローラー、小型のグラフィカル HMI などが挙げられます。

!!! note "自動生成コンテンツ"
    このページは専用の原資料がない状態で作成しています。記載された技術情報を利用する前に、SiFli の公式ドキュメントで確認してください。
