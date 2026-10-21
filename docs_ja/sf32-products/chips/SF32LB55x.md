---
icon: lucide/microchip
description: "SF32LB55x: エントリークラスのBluetooth MCUより高い描画性能、大容量のSRAM、幅広いパッケージ選択肢を必要とするウェアラブルおよびHMI製品向けの、メインストリームの超低消費電力MCUファミリー。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB55x { #sf32lb55x }

## 概要 { #overview }

SF32LB55xシリーズは、エントリークラスのBluetooth MCUより高い表示性能、大きなメモリー容量、幅広いパッケージ選択肢を求めるBLE接続製品向けの、メインストリームの超低消費電力AIoT MCUファミリーです。

本ファミリーは、2基のArm Cortex-M33 STAR-MC1[^1] プロセッサーによるbig.LITTLEデュアルコア構成を採用しています。一方は最大240 MHzで動作する高性能アプリケーションコア、もう一方は最大48 MHzの超低消費電力コアです。これにより、負荷の高いUI処理をアプリケーションコアで実行し、センサー処理、待機時制御、常時動作が必要なBLEタスクを低消費電力コアに任せられます。

SiFliの公式製品ブリーフとデータシートによると、本ファミリーはBLE 5.2、ePicasso 2.5Dグラフィックスエンジン、2基のLCDコントローラー、TinyML向けニューラルネットワーク行列アクセラレーターを備えます。オンチップSRAMは合計1,312 KB（HCPU 1,088 KB + LCPU 224 KB）で、NOR、NAND、eMMC、PSRAMなどの外部メモリーにも対応します。SF32LB52xよりメモリーや表示機能に余裕が必要でありながら、上位の56/58クラスまでは必要としないウェアラブル、センサーを多用する製品、小型HMIに適した選択肢です。

SiFliのチップ型番ガイドによると、SF32LB55xは後発の52/56/58ファミリーより前に定義されたため、型番のサフィックスは新しい命名規則に完全には沿っていません。サフィックスだけから機能を推測せず、完全な注文型番とパッケージ別の機能表を選定の基準にしてください。

[^1]: STAR-MC1はArm China製の構成可能なArmv8-M Mainline組み込みCPU IPです。対応するSF32デバイスにおいて、SiFliはこれをArm Cortex-M33 STAR-MC1アプリケーションプロセッサーとして文書化しています。通常のデバイス固有の統合作業は必要ですが、Cortex-M33クラスのソフトウェアモデルにより、既存のCortex-M33ファームウェア、ミドルウェア、RTOSポート、ツールを引き続き活用しやすくなります。CU、SP、SEの各構成は主にキャッシュ、TCM、XIPU、TrustZone対応の点で異なり、Arm Custom Instructions/CDEおよびコプロセッサーインターフェースはオプション機能であり、対象のSF32部品ごとに確認が必要です。SiFliのドキュメントでは、文脈に応じて ***Arm Cortex-M33 STAR-MC1*** または ***Arm Cortex-M33*** のいずれかの表記が使われることがあります。

## 用途 { #applications }

**SF32LB55xは、エントリークラスのウェアラブルMCUより高機能なUI、大容量の作業メモリー、または柔軟なパッケージ選択肢を必要とするBLE中心の製品に推奨されます。** たとえば、次の用途が挙げられます。

- スマートウォッチとフィットネスバンド
- 健康状態をモニタリングするウェアラブル機器
- スマートロックとスマートホームコントローラー
- センサーを多用する接続アクセサリー
- コンパクトなグラフィカルHMI製品
- スマートスタイラスやペン入力対応機器
- 携帯端末やハンドヘルドコントローラー

次の機能が1つ以上必要な場合は、SF32LB55xを候補にしてください。

- 受信電流が非常に小さいBLE 5.2接続
- MIPI DSIコマンドモード対応ディスプレイ
- LVGL、グラフィックス素材、センサー処理、TinyMLに使える大容量SRAM
- ユーザープログラム可能な低消費電力プロセッサー
- SF32LB52xより多いGPIO、またはI/O密度の高いパッケージの選択肢
- NOR、NAND、eMMC、QSPI-PSRAM、OPI-PSRAMなどの外部メモリー選択肢

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

### 演算とメモリー { #compute-and-memory }

- 高性能なArm Cortex-M33 STAR-MC1アプリケーションプロセッサー、最大240 MHz
- 超低消費電力のArm Cortex-M33 STAR-MC1プロセッサー、最大48 MHz
- アプリケーションプロセッサーで最大360 DMIPS / 965 EEMBC CoreMark
- 低消費電力プロセッサーで最大72 DMIPS / 193 EEMBC CoreMark
- 1,088 KBのアプリケーションSRAM（64 KBのリテンションSRAMを含む）
- 224 KBの低消費電力SRAM（全領域がリテンションSRAM）
- NOR、NAND、eMMC、QSPI-PSRAM、OPI-PSRAM用の外部メモリーインターフェース

### グラフィックス、ディスプレイ、AI { #graphics-display-and-ai }

- ハードウェアによる回転、スケーリング、ミラーリング、アルファブレンディングに対応したePicasso 2.5Dグラフィックスエンジン
- eZipによる可逆グラフィックス展開に対応し、ePicassoと連携して使用できます
- ePicassoの変換レイヤーは最大640 × 640、汎用レイヤーとディスプレイ出力は最大1024 × 1024に対応し、表示出力は最大60 fps
- LCDコントローラーは8080、SPI、Dual-SPI、Quad-SPI、DPI、MIPI DSI、JDI反射型ディスプレイに対応（インターフェースの有無は品種によるため、選定した型番で確認してください）
- TurboPixelのフレームバッファー圧縮では、LCDコントローラーが圧縮フレームを読み込み、表示時に展開します。フレームバッファーの使用量と読み出し帯域を抑えられます
- LCDコントローラーを2基搭載。常時表示用インターフェースとデュアルディスプレイ機能は、型番とパッケージによって異なります
- TinyML向けニューラルネットワーク行列アクセラレーター（最大1.92 GOPS、5.73 TOPS/W）

### 無線接続 { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- BLE 125 kbps、500 kbps、1 Mbps、2 Mbpsモード
- 1 Mbpsモードで受信感度-100 dBm
- 最大送信電力: 10 dBm
- 受信ピーク電流: 3.3 V時に2.0 mA

### セキュリティ { #security }

- AESおよびCRCハードウェアアクセラレーター
- 真性乱数発生器（TRNG）
- PSA Certified Level 1

### ペリフェラルとI/O { #peripherals-and-ios }

- ファミリー全体でUARTは最大5系統、I2Cは最大6系統、SPIは最大4系統。搭載数は型番によって異なります（下表を参照）
- I2SとPDMの搭載数も型番によって異なります（下表を参照）。各PDMインターフェースには最大2個のデジタルマイクを接続できます。インターフェース数とマイク数は同じではないため、選定した型番のピン配置も確認してください。

<div align="center"><em>公開資料に記載されたモデル別ペリフェラル数とADC数（SS6600A8は未記載）</em></div>

<div align="center" markdown>

| 型番 | UART | I2C | SPI | I2S | PDM | 16ビットSigma-Delta ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | 未記載 | 未記載 | 未記載 | 未記載 | 未記載 | 未記載 |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | なし |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5チャンネル |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5チャンネル |

</div>

**SS6600A8の資料注記:** 現行の[SiFliチップ型番ガイド][SiFliチップ型番ガイド]には本品のパッケージ、パッケージ内蔵メモリー、GPIO、ディスプレイインターフェースが記載されていますが、UART、I2C、SPI、I2S、PDM、Sigma-Delta ADCの型番別の数は記載されていません。[DS5501 V1.7.2データシート][データシート]の表 0-1 にもSS6600A8の個別行はありません。そのため表では数量を「未記載」としています。QFN68LというパッケージがSF32LB551U4O5と同じでも、SF32LB551U4O5の数量から推測しないでください。ピンを割り当てる前に、具体的な構成をSiFliに確認してください。

- USB 2.0 FS Host/Device × 1
- 10ビットGPADC（SAR ADC）× 1。データシートでは、最大8チャンネルのシングルエンド入力または4組の差動入力に対応し、シングルエンド入力範囲は0～1.1 Vとされています
- **ADC資料の不一致:** [DS5501 V1.7.2データシート][データシート]では最大8チャンネルのシングルエンド入力または4組の差動入力、シングルエンド入力範囲0～1.1 Vとされています。一方、[SF32LB55xハードウェアアプリケーションノート][ハードウェアアプリケーションノート (GitHubソース)]には5チャンネル、入力範囲0～0.9 Vと記載されています。アナログフロントエンドの設計前に、対象品番とSDKバージョンに応じたチャンネル割り当てと入力上限を確認してください。
- 16ビットSigma-Delta ADC（5チャンネル）。上に示したBGA145およびBGA169品種に搭載され、QFN68L品種には搭載されていません
- 温度センサー
- 低消費電力電圧コンパレーター × 2
- ペリフェラルタスクコントローラー（PTC）
- GPIO数はパッケージによって異なります。下のパッケージ表と資料間の差異に関する注記を参照してください

### 電源とパッケージ { #power-supply-and-package }

- 電源電圧範囲は品種によって異なります。SS6600A8は2.97 V～3.63 V、551U4O5と本ページで取り上げたBGA品種は1.71 V～3.63 Vです
- 動作温度は品種によって異なります。資料に記載されたQFN品種は−20 °C～+70 °C、本ページで取り上げたBGA品種は−40 °C～+85 °Cです
- 2個の高効率バックレギュレーターと低消費電力LDOを統合した電源管理
- RTCウェイクアップ有効時のスリープ電流: 600 nA
- ピンウェイクアップ有効時のスリープ電流: 280 nA
- パッケージオプション: QFN68L、BGA145、BGA169

## 製品バリエーション { #family-variants }

SF32LB55xにはQFNとBGAのパッケージがあります。GPIO数、内蔵メモリー、利用できるディスプレイインターフェース、PCBの製造要件はパッケージによって大きく異なるため、早い段階でパッケージを選定してください。

パッケージの選定は、単なる基板レイアウト上の判断ではありません。SiFliの[チップ型番ガイド][SiFliチップ型番ガイド]によると、55xファミリーで利用できるディスプレイインターフェースはパッケージによって異なり、パッケージによってディスプレイインターフェースの全部に対応する場合と、一部にのみ対応する場合があります。したがって、ディスプレイ、メモリー、ピン配分を確定する前にパッケージを決めてください。同一パッケージの品種はピン互換ですが、置き換える場合はメモリー構成とディスプレイ要件を個別に確認してください。

<div align="center"><em>SF32LB55xパッケージレベルI/Oオプション</em></div>

<div align="center" markdown>

| パッケージ | HCPU / LCPUのGPIO数 | GPIO合計 | 主な用途 |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | PCB製造コストを抑えたい小型ウェアラブルやBLEセンサー製品 |
| BGA145 | 55 / 40 | 95 | ディスプレイ、メモリー、センサーを多く搭載し、配線余裕も必要な設計 |
| BGA169 | 71 / 42 | 113 | GPIO数が最も多く、内蔵メモリーとディスプレイの選択肢も広いSF32LB55x設計 |

</div>

次の一覧はSiFliチップ型番ガイドに掲載されている現行の代表モデルで、パッケージとメモリー構成の違いを確認できます。このファミリーは現行の命名規則より前に定義されているため、型番末尾だけで判断せず、注文型番全体で確認してください。

<div align="center"><em>SF32LB55xの代表的な品種</em></div>

<div align="center" markdown>

| 注文型番 | パッケージ | パッケージ内蔵メモリー | 型番ガイドに記載されたディスプレイインターフェース | 選定時のポイント |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | 4 MB QSPI NORを2個搭載し、1個の8 MB OSPI NORとして構成。パッケージ内PSRAMなし | QSPI、8080 | GPIO 49本、2.97 V～3.63 V、−20 °C～+70 °C。パッケージ内PSRAMを必要としない小型構成 |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI-NORブートFlash + 4 MB OPI-PSRAM | QSPI、8080 | 49 GPIO、1.71 V～3.63 V、−20 °C～+70 °C。内蔵PSRAMを備えたコンパクトな選択肢 |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI-NORブートFlash + 4 MB OPI-PSRAM | MIPI DSIコマンドモード、QSPI、8080 | 95 GPIO、−40 °C～+85 °C。4 MBのPSRAMを必要とする表示製品向けのバランスの取れたBGA145品種 |
| SF32LB555V436 | BGA145 | 4 MB QSPI-NORブートFlash + 8 MB OPI-PSRAM | MIPI DSIコマンドモード、QSPI、8080 | 95 GPIO、−40 °C～+85 °C。SF32LB555V4O6の2倍の内蔵PSRAMが必要な場合のBGA145品種 |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI-NORブートFlash + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSIコマンドモード、QSPI、8080、JDI/Sharp MIP | 113 GPIO、−40 °C～+85 °C。MIPI DSIとSPI/DSPIのデュアルディスプレイ構成に対応し、各画面に異なる内容を表示可能 |

</div>

SF32LB557VD3A6について、SiFliの現行チップ型番ガイドとDS5501 V1.7.2データシートの表 0-1 は、HCPU 71 GPIO + LCPU 42 GPIO、合計113 GPIOとしています。一方、同データシートの特性概要とパッケージ概要、およびPB0001 V1.3製品概要は、BGA169を119 GPIO（HCPU 71 + LCPU 48）と記載しています。つまり、公式資料の記載は一致しておらず、DS5501データシート内にも差異があります。本ページでは、型番別の記載と現行チップ型番ガイドに従い、113 GPIOとしています。ピンを割り当てる前、または設計を確定する前に、選定パッケージのボールマップで使用可能なGPIOを確認し、実際の注文型番についてSiFliに確認してください。電源・温度定格、完全な型番、パッケージ内蔵メモリーの構成も [DS5501 V1.7.2データシート][データシート]、[PB0001 V1.3製品概要][製品概要]、[SiFliチップ型番ガイド][SiFliチップ型番ガイド]で確認してください。BGA145とBGA169はいずれも、外形7 × 7 × 0.94 mm、端子ピッチ0.5 mmです。

## 設計・導入の進め方 { #integration-path }

候補となるSF32LB55x品種を検証済みの設計につなげるには、次の順で進めます。

1. **SDKとファームウェアを検証する。** [SiFli SDK入門ガイド](../../getting-started/sifli/getting-started-sifli-sdk.md)から始め、[SiFli SDKの開発フロー](../../develop/platforms/sifli-sdk/overview.md)と[サンプル](../../develop/examples/index.md)を使って、必要なディスプレイ、Bluetooth、低消費電力機能の動作を確認します。
2. **評価環境を選ぶ。** 現在、μForgeではSF32LB55専用のモジュールや開発ボードを掲載していません。[SF32製品セレクター](../product-selector.md)から最も近い評価用プラットフォームを選び、結果を55xの設計に反映する前に、パッケージとインターフェースの対応範囲を確認します。
3. **ハードウェアを設計・レビューする。** 回路図や基板レイアウトを確定する前に、μForgeの[ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md)と、[回路図](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md)およびPCBレイアウトのチェックリストを確認します。
4. **SiFliの一次資料で照合する。** [データシート][データシート]、[ユーザーマニュアル][ユーザーマニュアル]、[公式ハードウェア設計ガイド][SiFli公式ハードウェア設計ガイド (wiki.sifli.com)]、[ハードウェアアプリケーションノート][ハードウェアアプリケーションノート (GitHubソース)]を参照し、注文型番とパッケージを確認します。

<!-- uf-faq:start -->
## よくある質問 { #frequently-asked-questions }

**SF32LB55x の主な仕様は？**
SF32LB55x は、アプリケーションCPU（Cortex-M33 @240 MHz）と低消費電力コア（Cortex-M33 @48 MHz、ユーザープログラム可能なコア）、内蔵SRAM 1,312 KB、Bluetooth Low Energy（BLE）のみを備えます。グラフィックス：ePicasso 1.0。パッケージ：QFN68 / BGA145 / BGA169（7 × 7 mm (QFN68)）。USB 2.0 FS。ファミリー全体の値であり、個別の型番はデータシートで確認してください。

**SF32LB55x が対応するディスプレイインターフェースは？**
SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI。対応状況は型番とパッケージによって異なります。

**SF32LB55x のパッケージ内メモリ容量は？**
型番により、パッケージ内PSRAMは最大 16 MB + 2 MB、パッケージ内NOR Flashは最大 8 MB です。

**SF32LB55x の電源電圧は？**
バリアントにより 1.71–3.63 V。正確な範囲はデータシートで確認してください。

**SF32LB55x でハードウェア設計を始めるには？**
まず [SF32LB55x ハードウェア設計ガイド](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md) で回路図、電源、クロック/RF、PCBレイアウトの指針を確認し、基板リリース前に回路図とレイアウトのチェックリストを使用してください。
<!-- uf-faq:end -->

## 関連製品 { #related-products }

### 開発キット { #development-kits }

パッケージの選定、電源系統の定義、ディスプレイインターフェースの選択、メモリーの計画、RFレイアウト、量産テスト計画の出発点として、公式のハードウェアアプリケーションノート、リファレンス回路図、チェックリストを使用してください。

### リファレンス製品 { #reference-products }

SF32LB55xを使った製品の例として、スマートウォッチ、フィットネスバンド、健康状態をモニタリングするウェアラブル機器、スマートロック、接続アクセサリー、スマートホームコントローラー、小型のグラフィカルHMIなどが挙げられます。
