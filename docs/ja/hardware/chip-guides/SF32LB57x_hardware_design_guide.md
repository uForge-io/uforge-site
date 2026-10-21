---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB57x MCUのハードウェア設計ガイド。最小システム、電源、クロック、RF、ディスプレイ、カメラ、ストレージ、PCBレイアウトの指針を解説します。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB57xハードウェア設計ガイド { #sf32lb57x-hardware-design-guide }

## 1. はじめに { #1-introduction }

本書は、高集積AIoTマイクロコントローラーSF32LB57xファミリーを使用する製品向けのハードウェア設計ガイドです。ウェアラブル機器、携帯型スマートデバイス、スマートホーム機器、低消費電力のコネクテッド製品を開発するハードウェアエンジニア、PCB設計者、製品開発者を対象としています。

電源アーキテクチャ、クロック回路、RF設計、ディスプレイおよびカメラインターフェース、ストレージとブート設定、オーディオ回路、PCBレイアウト、検証、製造準備まで、ハードウェア開発プロセス全体を扱います。本書の指針に従うことで、回路図やレイアウトのリスクを抑え、低消費電力動作を維持し、SF32LB57xのパッケージ、電源、インターフェース要件に沿った設計を進めやすくなります。

本書は、組み込みハードウェア設計と回路図作成の基礎知識を前提としています。電気仕様、ピン多重化、パッケージ寸法、部品の適合性確認、量産上の制限については、SF32LB57xのデータシート、ユーザーマニュアル、公式ハードウェアアプリケーションノート、リファレンスデザインファイル、SiFli承認ベンダーリストを必ず確認してください。これらの公式資料が最終的な根拠となります。

## 2. 開発リソース { #2-development-resources }

[SF32LB57x 製品概要]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x データシート]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x ハードウェアアプリケーションノート]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SF32 承認ベンダーリスト (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[サンプル購入]: https://sifli.taobao.com/
[開発キット購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x 製品概要]__
- :fontawesome-solid-file-pdf: __[SF32LB57x データシート]__
- :fontawesome-solid-file-pdf: __[SF32LB57x ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SF32LB57x ハードウェアアプリケーションノート]__
- :fontawesome-solid-file-excel: __[SF32 承認ベンダーリスト (AVL)]__
- :fontawesome-solid-cart-shopping: __[サンプル購入]__
- :fontawesome-solid-cart-shopping: __[開発キット購入]__

</div>

## 3. デバイス概要 { #3-device-overview }

### 3.1. 特長 { #31-features }

SF32LB57xの代表的なリソースは次のとおりです。

- GPIOは最大58本です<!-- BGA-ONLY -->。一部のBGA112型番では、MPI3に使用するか、プルアップ／プルダウン設定でGP静的出力にできるI/Oが6本追加されます。詳細は「パッケージ」を参照してください<!-- /BGA-ONLY -->。
- UART x 3、I2C x 4、SPI x 2、CAN x 2。
- GPTIM x 2（各4チャネル）、LPTIM x 2、ATIM x 2（各3差動チャネルまたは4シングルエンドチャネル）、PWM x 1（5チャネル）、PTM x 1（16チャネル）。
- RTCクロック出力x 4。スリープ状態では低周波クロックを最大16 kHzで4系統出力。
- SDIO x 2、MPIストレージインターフェースx 3。
- I2Sオーディオインターフェースx 2、PDMオーディオインターフェースx 2、差動アナログオーディオ出力x 1、差動アナログオーディオ入力x 2。
- USB 2.0 FS x 1。
- GPADC x 1（12チャネル）。
- LCDCディスプレイコントローラーx 1（24ビットDPI、8/16ビット8080、QSPI、8/16ビットEPD、シリアル／パラレルJDI）。
- DCMIカメラインターフェースx 1（最大16ビットDVP、2データラインSPI、4データラインQSPI）。
- ハードウェアウェイクアップ要因x 10。
- デバッグはDBG-UARTとSWDに対応。ダウンロードはDBG-UART、SWD、UART、USBに対応。

!!! note "ディスプレイインターフェースの範囲"
    SiFliのハードウェアアプリケーションノートでは、SF32LB57xのLCDCインターフェースとしてSPI/QSPI、24ビットDPI、16ビット8080、16ビットEPD、シリアル／パラレルJDIが示されています。MIPI-DSIは一部ディスプレイドライバーICの対応インターフェース一覧に記載されていますが、チップから直接接続するLCDCインターフェース一覧には含まれていません。これを根拠に、チップがネイティブのMIPI-DSIホストインターフェースを備えると判断しないでください。設計を選定する前に、具体的なディスプレイコントローラーとの接続方式をSiFliに確認してください。

### 3.2. バリアント { #32-variants }

SF32LB57xには、電源構成の異なる2つのファミリーがあります。

<div align="center"><em>表 3.2-1: 型番と電源バリアントの概要</em></div>

<div align="center" markdown>

| ファミリー | 代表的な型番 | 設計上の意味 |
|:-------|:---------------------|:---------------|
| バッテリー駆動バリアント | 570 / 573 / 575 / 576 / 577 / 578 / 579 | リチウムイオンバッテリー製品向け。通常、VBAT、VCC、VBUS、および内蔵または外付けの充電回路を設計します。 |
| 3.3 V電源バリアント | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | 外部で安定化した3.3 V電源を使うシステム向け。PVDD、AVDD、VDDIOなどの電源レールは外部から供給します。 |

</div>

!!! warning
    2つの電源ファミリーでは、電源接続、起動時の動作、一部のパッケージ定義が異なります。別の設計を流用する前に、実際に発注する型番を確認してください。

### 3.3. パッケージ { #33-packages }

一般的なパッケージはQFN68L、QFN80L<!-- BGA-ONLY -->、BGA112<!-- /BGA-ONLY -->です。SF32LB57xのパッケージ資料には各パッケージの厚さ違いが2種類記載されており、バッテリー駆動ファミリーと3.3 V電源ファミリーではピン配置図も異なります。必ず実際に発注する型番に対応するピン配置、POD、ランドパターン、ステンシル図面を選択してください。

<div align="center"><em>表 3.3-1: パッケージの選択肢と設計上の要点</em></div>

<div align="center" markdown>

| パッケージ | 代表的なサイズ | ピッチ | 設計上の要点 |
|:--------|:-------------|:------|:-------------|
| QFN68L | 7 mm x 7 mm | 0.35 mm | 小型設計に適しています。露出パッドの接地、ステンシル開口、トップ層でのファンアウト可否を確認してください。 |
| QFN80L | 8 mm x 8 mm | 0.35 mm | IOリソースが多いパッケージです。電源ドメインの違いとディスプレイ／ストレージのピン群を確認してください。 |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.4 mm | 実装面積は小さい一方、ファンアウトが難しくなります。早い段階でPCB製造プロセスの対応可否を確認してください。 |
<!-- /BGA-ONLY -->

</div>

QFN68LとQFN80Lでは、注文可能な型番に指定されたGPIO数のみを使用できます。MPI3用または静的出力用の追加I/Oはありません。

<!-- BGA-ONLY -->
!!! note "BGA112のGPIO利用条件"
    BGA112のみに適用されます。SF32LB57xはMPI1、MPI2、MPI3を内蔵しています。各MPIに対応するパッケージ内蔵メモリーの位置は[SF32命名規則](../../sf32-products/family/SF32_namingrule.md)を参照してください。次の3つのパッケージ内蔵メモリー構成では、MPI2とMPI3のピンをパッケージ外部から利用できず、使用可能なGPIOは58本のみです。(1) MPI1とMPI2にPSRAMを1個ずつ搭載する構成、(2) MPI2に256 MbのPSRAMを1個搭載する構成、または (3) MPI3にNOR Flashを搭載する構成です。`SF32LB57GVD776`は (3) に該当し、型番の2つ目の`7`はパッケージ内蔵部品がMPI3を使用することを示すため、使用可能なGPIOは58本のみです。これら3つ以外の構成では、MPI3に対応する6本のBGA112 I/OをMPI3用に使うか、プルアップまたはプルダウンを設定したGP静的出力として使用できますが、自由に割り当てられるGPIOではありません。したがって、`SF32LB57ZVN7N6`の`58 + 6`は58本のGPIOと、MPI3または静的出力に使える6本のI/Oを意味し、64本すべてが自由に割り当てられるGPIOという意味ではありません。
<!-- /BGA-ONLY -->

<div align="center"><em>表 3.3-2: パッケージ寸法</em></div>

<div align="center" markdown>

| パッケージ | 本体サイズ | チップ厚さ | ピッチ |
|:--------|:----------|:---------------|:------|
| QFN68L | 7 mm x 7 mm | 0.9 mm | 0.35 mm |
| QFN68L | 7 mm x 7 mm | 1.1 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 0.9 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 1.1 mm | 0.35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.98 mm | 0.4 mm |
| BGA112 | 5.4 mm x 4.4 mm | 1.03 mm | 0.4 mm |
<!-- /BGA-ONLY -->

</div>

推奨される確認項目:

- ピン番号がデータシートのピン配置と一致していること。
- 電源、GND、RF、水晶振動子、USB、ディスプレイ、ブート、デバッグの各ピンを正しく配置していること。
- QFNの露出パッド接地とサーマルビアが実装ルールに適合していること。
<!-- BGA-ONLY -->
- BGAのファンアウト、ブラインド／埋め込みビア、ソルダーマスク、ステンシル開口、実装能力についてPCBベンダーと確認していること。
<!-- /BGA-ONLY -->

![図 3.3-1: SF32LB57x型番の命名規則](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-1: SF32LB57x型番の命名規則</em></div>

![図 3.3-2: QFN68Lバッテリー駆動バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-2: QFN68Lバッテリー駆動バリアントのピン配置</em></div>

![図 3.3-3: QFN68L 3.3 V電源バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-3: QFN68L 3.3 V電源バリアントのピン配置</em></div>

![図 3.3-4: QFN80Lバッテリー駆動バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-4: QFN80Lバッテリー駆動バリアントのピン配置</em></div>

![図 3.3-5: QFN80L 3.3 V電源バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-5: QFN80L 3.3 V電源バリアントのピン配置</em></div>

<!-- BGA-ONLY -->
![図 3.3-6: BGA112バッテリー駆動バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-6: BGA112バッテリー駆動バリアントのピン配置</em></div>

![図 3.3-7: BGA112 3.3 V電源バリアントのピン配置](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.3-7: BGA112 3.3 V電源バリアントのピン配置</em></div>
<!-- /BGA-ONLY -->

### 3.4. 主なハードウェア機能 { #34-major-hardware-features }

- バッテリー駆動と、外部安定化3.3 V電源の2つの実用的な電源ファミリー。
- QFN68L、QFN80L<!-- BGA-ONLY -->、BGA112<!-- /BGA-ONLY -->パッケージ。それぞれに、パッケージ固有のピン配置、ランドパターン、ステンシル、PCB製造要件があります。
- デバイスとピン配置に応じてSPI/QSPI、8080、RGB/DPI、EPD、JDIディスプレイに対応します。MIPI-DSIの範囲については3.1節の注記を参照してください。
- パッケージ内蔵メモリーと外部MPI/SDIOストレージによるストレージ／ブート構成。
- RF、水晶振動子、オーディオ、カメラ、ディスプレイ、USB、SDIO、電源の各レイアウトは、早い段階から回路図とPCBを合わせて確認する必要があります。

### 3.5. 代表的な用途 { #35-typical-applications }

SF32LB57xは、Bluetooth接続に加え、AI、カメラ、高度なディスプレイ機能を小型実装で必要とする製品に適しています。

- スマートウォッチ、スポーツウォッチなどのウェアラブル機器
- 携帯型スマート端末、スマートホームコントローラー
- AI機能を備えたセンサーおよびエッジ推論デバイス
- カメラを搭載するBluetooth製品
- 選択したデバイスとディスプレイコントローラーの接続方式に応じて、SPI/QSPI、RGB/DPI、8080、EPD、JDIインターフェースを使う高度なディスプレイ機器
- 豊富なGPIOとストレージの選択肢を備えた小型QFN<!-- BGA-ONLY -->またはBGA<!-- /BGA-ONLY -->パッケージが必要な製品

## 4. 設計の概要 { #4-design-at-a-glance }

### 4.1. ハードウェア構成 { #41-hardware-architecture }

<div align="center"><em>表 4.1-1: 設計の概要</em></div>

<div align="center" markdown>

| 設計項目 | 代表的な実装 |
|:---|:---|
| 電源ファミリー | バッテリー駆動バリアント、または外部安定化3.3 Vバリアント。電源回路図を混在させないでください。 |
| パッケージ | QFN68L、QFN80L<!-- BGA-ONLY -->、BGA112<!-- /BGA-ONLY -->。正確な発注型番に応じてピン配置、POD、ランドパターン、ステンシルを選びます。 |
| PCB製造プロセス | QFNのパッド、露出パッドのビア、ステンシル要件をPCB／実装業者に確認します<!-- BGA-ONLY -->。BGAではファンアウトと製造プロセスの対応可否も早期に確認してください<!-- /BGA-ONLY -->。 |
| クロック | 48 MHzメイン水晶振動子と32.768 kHz RTC水晶振動子 |
| RF | 50 Ωアンテナ経路、チップ近傍の π型整合回路、RF電源のローカルフィルタリング |
| ディスプレイ | デバイス能力とピン配置に応じてSPI/QSPI、8080、RGB/DPI、EPD、JDI。MIPI-DSIの範囲は3.1節の注記を参照 |
| ストレージ | パッケージ内蔵メモリーと外部MPI/SDIOの選択肢。レイアウト前にブートメディアを確定する必要があります |
| オーディオ | アナログ入出力、PDM/I2S、マイクバイアス、オーディオ基準電圧、外付けPAの選択肢 |
| カメラ | DCMIカメラインターフェース。ノイズに敏感な高速インターフェースとして配線と電源を設計 |
| デバッグと量産 | DBG-UART、SWD、ブート設定、PA00/PA01/PA34、電源レール、量産テストポイント |

</div>

### 4.2. ハードウェア設計フロー { #42-hardware-design-flow }

<div align="center"><em>表 4.2-1: ハードウェア設計フロー</em></div>

<div align="center" markdown>

| 手順 | 設計上の決定事項 | 主な参照セクション |
|:---|:---|:---|
| 1 | 発注する型番、電源ファミリー、パッケージ、ピン配置を確認する | デバイス概要 |
| 2 | ブートストレージ、ディスプレイインターフェース、カメラの使用、デバッグアクセス、低消費電力目標を確定する | 設計の概要、回路図設計 |
| 3 | 電源ツリー、充電／OVP方針、BUCK/LDO部品、電源投入時の動作を定義する | 電源システム |
| 4 | クロック源、RFトポロジー、ストレージ、ディスプレイ、オーディオ、カメラ、汎用インターフェースを選定する | クロック生成、RF、ユーザーインターフェース、ストレージと接続性 |
| 5 | パッケージフットプリント、基板積層、ファンアウト、RF、水晶振動子、USB、SDIO、ディスプレイ、オーディオ、電源のレイアウトを確認する | PCBレイアウト指針 |
| 6 | EVT前に顧客設計セルフチェックを完了し、回路図、レイアウト、AVL、DRC/ERC、インピーダンス、電源、RF、量産関連の証跡を保存する | 顧客設計セルフチェック |

</div>

### 4.3. 本書の使い方 { #43-how-to-use-this-guide }

本書は、基板レビューの順序に沿って参照してください。まず実際に発注するSF32LB57xの型番と電源ファミリーを確認し、パッケージとPCB製造プロセスを確定します。データシートと、5.1節の該当する最小システム回路図をあわせて確認してください。次に電源ツリー、ブートメディア、必要なデバッグ／ダウンロードアクセスを定義し、製品要件に応じてピンマルチプレクス表からIO機能を割り当てます。最小システムの方針を確定した後、クロック、RF、ディスプレイ、ストレージ、オーディオ、カメラ、汎用インターフェース、PCBレイアウト、量産アクセスの順に確認してください。第 5 節は回路図設計の基準、第 6 節はPCB実装の基準、第 7 節は回路図またはレイアウトをリリースする前の顧客セルフチェックです。

### 4.4. レビュー証跡一式 { #44-review-evidence-pack }

EVT前に、データシート／ユーザーマニュアル／リファレンスデザインの各バージョン、回路図PDF、PCB積層情報、インピーダンスレポート、DRC/ERCレポート、電源ツリー、低消費電力予算、充電経路、ブート経路、量産テストポイント一覧を保存してください。あわせてRF、水晶振動子、USB、SDIO、ディスプレイ、カメラ、オーディオ、GPADC、パッケージのファンアウトに関する要点のスクリーンショットも保管してください。

## 設計ガイドの続き { #continue-the-design-guide }

ガイドの全体は、以下の各ページに続きます。それぞれ設計プロセスの段階ごとにまとめています。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[最小システムと電源](SF32LB57x_schematic_system_power.md)__ — パッケージ／電源ファミリーの整合、ブートストラップ、ブートメディア、デバッグ／ダウンロードアクセス、電源ツリー、充電／OVP、BUCK、低消費電力レール、動作モード
- :fontawesome-solid-wave-square: __[クロック、RF、ユーザーインターフェース](SF32LB57x_schematic_clock_rf_interfaces.md)__ — 48 MHzと32.768 kHzの水晶振動子、RF整合とアンテナ経路、ディスプレイ、タッチ／バックライト、オーディオ、カメラ、ボタン、モーター
- :fontawesome-solid-database: __[ストレージと製造](SF32LB57x_schematic_storage_mfg.md)__ — ストレージ、ブート、GPIO、IO MUXとマトリックスのピンマルチプレクス表、UART/I2C/SPI/SDIO/USB/CAN/GPADC、量産書き込み、キャリブレーション、治具アクセス
- :fontawesome-solid-list-check: __[回路図チェックリスト](SF32LB57x_schematic_checklist.md)__ — 項目別の回路図レビュー用チェックリスト（第 5.8 節）
- :fontawesome-solid-microchip: __[PCBレイアウト指針](SF32LB57x_pcb_layout.md)__ — 積層、重要なPCB制約、電源／水晶／RF／アナログ／オーディオ／高速信号の配線、EMI/ESD/EOS、参考図
- :fontawesome-solid-list-check: __[PCBレイアウトチェックリスト](SF32LB57x_pcb_layout_checklist.md)__ — 項目別のPCBレイアウトレビュー用チェックリスト（第 6.10 節）
- :fontawesome-solid-book-open: __[設計レビューのチェックリストと参考資料](SF32LB57x_review_and_reference.md)__ — 顧客設計セルフチェック、関連資料、付録、改訂履歴

</div>
