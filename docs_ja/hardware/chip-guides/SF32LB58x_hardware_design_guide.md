---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58x MCU のハードウェア設計ガイドです。電源アーキテクチャ、クロックと RF、ディスプレイ、ストレージ、オーディオ、PCB レイアウトを扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58x ハードウェア設計ガイド { #sf32lb58x-hardware-design-guide }

## 1. はじめに { #1-introduction }

本ガイドでは、高性能 AIoT マイクロコントローラ SF32LB58x ファミリーを使った製品設計に向けて、推奨事項と参考情報を提供します。豊富なユーザーインターフェース、大容量メモリー、デュアルモード Bluetooth、オーディオ、多数の GPIO、低消費電力スタンバイを必要とするバッテリー駆動製品を開発する、ハードウェアエンジニア、PCB 設計者、製品開発者を対象としています。

PMIC と電源分配、BGA256 のファンアウト、HDI 基板の積層計画、クロック回路、RF 設計、MIPI-DSI、USB2.0 High-Speed、SDIO/eMMC、オーディオ回路、PCB レイアウト、検証、製造準備まで、ハードウェア開発プロセス全体を扱います。本ガイドに従うことで、高密度 BGA/HDI 設計のリスクを低減し、高速インターフェースの信号品質を守り、SF32LB58x の電源、パッケージ、量産要件に沿った設計にできます。

本書は、組み込みハードウェア設計、回路図作成、高密度 PCB レイアウトの基礎知識を前提としています。SF32LB58x のデータシート、ユーザーマニュアル、公式ハードウェアアプリケーションノート、リファレンスデザイン一式、SiFli 承認ベンダーリストを補完する資料です。電気仕様、ピン多重化、パッケージ寸法、部品認定、量産上の制限については、これらの資料が正式な根拠となります。

## 2. 開発リソース { #2-development-resources }

[SF32LB58x 製品概要]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x データシート]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x ハードウェアアプリケーションノート]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32LB58x 回路図・PCBチェックリストのワークブック]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli 承認ベンダーリスト (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[サンプルの購入]: https://sifli.taobao.com/
[開発キットの購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x 製品概要]__
- :fontawesome-solid-file-pdf: __[SF32LB58x データシート]__
- :fontawesome-solid-file-pdf: __[SF32LB58x ユーザーマニュアル]__
- :fontawesome-solid-file-lines: __[SF32LB58x ハードウェアアプリケーションノート]__
- :fontawesome-solid-file-excel: __[SF32LB58x 回路図・PCBチェックリストのワークブック]__
- :fontawesome-solid-file-excel: __[SiFli 承認ベンダーリスト (AVL)]__
- :fontawesome-solid-cart-shopping: __[サンプルの購入]__
- :fontawesome-solid-cart-shopping: __[開発キットの購入]__

</div>

## 3. デバイス概要 { #3-device-overview }

### 3.1. アーキテクチャ { #31-architecture }

<div align="center"><em>表 3.1-1: 主なハードウェア機能の概要</em></div>

<div align="center" markdown>

| 機能 | 説明 |
|:---|:---|
| コアアーキテクチャ | 異種混在のトリプルコア構成: 最大 240 MHz のアプリケーション用 Arm Cortex-M33 STAR-MC1 コア 2 基と、最大 96 MHz の低消費電力 Arm Cortex-M33 STAR-MC1 コア 1 基 |
| Bluetooth | 低消費電力デュアルモード Bluetooth 5.3 トランシーバーを内蔵 |
| グラフィックス | ePicasso 2.0 の 2D/2.5D グラフィックスアクセラレーションと、Vivante GCNanoUltraV のベクターグラフィックス |
| ディスプレイインターフェース | MIPI-DSI、SPI/QSPI、MCU8080、DPI、パラレル／シリアル JDI |
| ストレージ | 型番に応じた NOR Flash/PSRAM の SiP 実装。外付け NOR/SPI NAND Flash は MPI3 または MPI4 に接続でき、SD1 と SD2 の SDIO インターフェースも備えます |
| オーディオ | I2S 3 系統、PDM 2 系統、差動アナログ音声入出力、外付けアナログオーディオ PA と I2S オーディオ PA に対応 |
| ウェイクアップ割り込み | すべての GPIO は Light/Deep Sleep からのウェイクに対応。Standby/Hibernate では 16 個のウェイクアップ割り込みソース（PA 6 個、PB 10 個）に対応 |
| PBR インターフェース | PBR ピンは 6 本。PBR0 は電源投入時に Low から High へ遷移し、一部の外部 LSW 制御に使用できます。PBR1-PBR5 は既定で Low です。PBR0-PBR5 は LPTIM または 32 kHz クロックを出力でき、Standby/Hibernate 中も出力として使用できます。PBR0-PBR3 はウェイク入力に設定できますが、MCU 動作中は割り込みを発生しません。 |

</div>

### 3.2. バリアント { #32-variants }

回路図を確定する前に、SF32LB58x の正確な発注型番と SiP メモリー構成を最新版のデータシートおよび AVL で確認してください。本ファミリーは BGA256 の HDI 専用プラットフォームで、SiP メモリー構成は型番によって異なります。外付け NOR Flash または SPI NAND Flash は MPI3 または MPI4 に接続できます。SiFli EVB では外付け SPI NAND に MPI4 を使用し、SD1 は eMMC または SD NAND、SD2 は SD カードまたは Wi-Fi デバイスに使用します。設計確定前に、対象品番のピン割り当てと基板上の配線を確認してください。

### 3.3. パッケージ { #33-packages }

<div align="center"><em>表 3.3-1: パッケージ</em></div>

<div align="center" markdown>

| パッケージ名 | 外形寸法 | ピンピッチ |
|:---|:---|:---|
| BGA256 | 8.5 mm x 6.5 mm x 0.94 mm | 0.4 mm |

</div>

### 3.4. 主なハードウェア機能 { #34-major-hardware-features }

- ピッチ 0.4 mm の BGA256 パッケージ。電源と GPIO の高密度ファンアウトが必要です。
- HDI PCB プロセスが必須で、PTH 基板には対応しません。
- PMU を内蔵し、BUCK 出力 2 系統と内部 LDO 出力 3 系統を備えます。
- オプションのシステム PMIC SF30147C を、スマートウォッチ級システムの電源分配に使用できます。
- MIPI-DSI、USB2.0 HS、SDIO/eMMC、RF、オーディオ、高密度 BGA ファンアウトでは、基板積層とインピーダンスを早期に確認する必要があります。

### 3.5. 主な用途 { #35-typical-applications }

SF32LB58x は、高度なグラフィックス、大容量メモリー、マルチメディア、エッジ AI 処理を組み合わせるコネクテッド製品に適しています。たとえば、次の用途が挙げられます。

- スマートウォッチ、スポーツウォッチ、アウトドア向けウェアラブル
- 高機能サイクルコンピューター、車載ダッシュボード
- スマートディスプレイ、コネクテッドダッシュボード
- AI 搭載ウェアラブル機器
- エッジ AI、センサーフュージョンシステム
- 高解像度 LVGL ベースの HMI 機器
- 携帯型の医療／産業用端末
- 外付け SDIO Wi-Fi デバイスを使う Bluetooth + Wi-Fi アクセサリー

## 4. 設計の概要 { #4-design-at-a-glance }

### 4.1. ハードウェアアーキテクチャ { #41-hardware-architecture }

<div align="center"><em>表 4.1-1: 設計クイックサマリー</em></div>

<div align="center" markdown>

| 設計項目 | 代表的な実装 |
|:---|:---|
| パッケージ | BGA256、8.5 mm x 6.5 mm x 0.94 mm、ピッチ 0.4 mm |
| PCB | HDI 基板のみ。PTH 非対応。6HDI-2 の積層を推奨 |
| 電源 | PMU 内蔵（BUCK 2 系統 + LDO 3 系統）。システム全体の電源には SiFli の PMIC SF30147C を併用可能 |
| BUCK インダクタ | 4.7 µH、DCR ≤ 0.4 Ω、Isat ≥ 500 mA |
| クロック | メイン水晶振動子 48 MHz + RTC 用水晶振動子 32.768 kHz |
| RF | 50 Ω のインピーダンス制御配線、π 型整合回路の実装スペースを確保 |
| ディスプレイ | MIPI-DSI（2 レーン）、3/4 線 SPI、Quad-SPI、MCU8080、DPI、パラレル／シリアル JDI。2 系統の LCDC ピン割り当て：LCDC1（PA）/LCDC2（PB） |
| ストレージ | 外付け NOR/SPI NAND Flash は MPI3 または MPI4 に接続できます。SiFli EVB では SPI NAND に MPI4、eMMC/SD NAND に SD1、SD カード/Wi-Fi デバイスに SD2 を使用します |
| オーディオ | I2S 3 系統（マスターのみ）、PDM 2 系統、差動アナログ音声入出力 |
| デバッグ | SWD 1 系統 + 選択可能な UART デバッグ出力 6 系統 |
| USB | USB2.0 HS、Host/Device モード |

</div>

### 4.2. ハードウェア設計フロー { #42-hardware-design-flow }

<div align="center"><em>表 4.2-1: ハードウェア設計フロー</em></div>

<div align="center" markdown>

| 手順 | 設計上の判断 | 主な参照セクション |
|:---|:---|:---|
| 1 | 発注型番、SiP メモリー構成、BGA256 パッケージの前提を確認する | デバイス概要、パッケージ |
| 2 | レイアウト開始前に HDI 積層、ビア構造、インピーダンス規則、実装能力を確定する | PCB レイアウト指針 |
| 3 | オプションのシステム PMIC SF30147C を使用するか決定し、チップの PMU 電源レール、BUCK インダクタ、LDO コンデンサ、リセット、電源シーケンスを定義する | 電源システム |
| 4 | ブートストレージ、ディスプレイインターフェース、USB の役割、SDIO/eMMC の使用方法、オーディオ構成、デバッグアクセスを選定する | ストレージと接続、ユーザーインターフェース、製造 |
| 5 | クロック、RF、DSI、USB2.0 HS、SDIO/eMMC、オーディオ、DC/DC、BGA ファンアウト、ESD の配線スクリーンショットを確認する | クロック生成、RF、PCB レイアウト指針 |
| 6 | 試作リリース前に回路図、積層、DRC、インピーダンス、AVL、製造資料、対象を絞ったレイアウト証跡を保管する | 設計レビューのチェックリスト |

</div>

### 4.3. 本ガイドの使い方 { #43-how-to-use-this-guide }

基板レビューの順序に沿って本ガイドを利用してください。まずパッケージと SiP メモリー構成を確認し、HDI 積層と PMIC 方式を確定します。次にブートストレージとディスプレイ配線を確認し、その後、クロック、RF、USB、オーディオ、デバッグ、量産テストへのアクセスを検証します。第 5 節は回路図設計の基準、第 6 節は PCB 実装の基準、第 7 節はリリースチェックリストです。

### 4.4. レビュー証跡一式 { #44-review-evidence-pack }

試作リリース前に、回路図 PDF、PCB 積層、ビア／製造プロセスの対応能力を示す資料、インピーダンスレポート、DRC レポート、AVL 照合結果を保存します。また、PMIC、BUCK インダクタ、DSI、USB、SDIO/eMMC、RF、水晶振動子、オーディオ、BGA ファンアウト、GND リターン、ESD の入口について、要点を絞ったレイアウトのスクリーンショットを保管してください。

### 4.5. チェックリストの使い方 { #using-the-checklists }

本ガイドには、確認の粒度が異なる 2 種類のチェックリストがあります。第 5.2.1.7 節と第 5.7.3 節の簡易チェックリストは、短時間のセルフチェック向けにリスクの高い項目をまとめたものです。[回路図チェックリスト](SF32LB58x_schematic_checklist.md)（第 5.8 節）と[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)（第 6.18 節）には、SiFli の完全版「SF32LB58x Schematic & PCB Checklist」（V1.0、2026-01-21）が項目ごとに掲載されています。

各チェック項目は必須（リリース前に合格が必要）または任意（該当機能を使用する場合に推奨）のいずれかです。色付き文字と<span class="flag-yellow">黄色の背景</span>が付いた文字は、元のチェックリストのレビュー上の強調を維持しています。元資料では各強調の理由が示されていないため、これらは追加のレビュー目印として扱い、同じ表にある強調表示のない項目の代わりにはしないでください。

元のチェックリストのワークブックでは、AVL に掲載されていない部品の Isat を 450 mA 以上としています。一方、公式ハードウェアアプリケーションノートでは、L = 4.7 µH、DCR ≤ 0.4 Ω の条件で Isat ≥ 500 mA としています。チェックリストにはワークブックの値を残しています。SiFli から明確な回答が得られるまでは、AVL に掲載されていない部品を選ぶ際、より厳しい Isat ≥ 500 mA を設計条件としてください。

回路図レビューでは PCB レイアウトを始める前に[回路図チェックリスト](SF32LB58x_schematic_checklist.md)を使い、PCB レイアウトレビューではガーバーデータをリリースする前に[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)を使います。通常、それぞれのレビューは二回実施します。最初に設計エンジニアが確認し、その後、設計凍結または製造リリースの前に独立したレビュー担当者が確認します。

チェックリストは、単なる閲覧用ではなく、承認記録として使うと効果的です。

1. まず対象の正確な発注型番と SiP メモリー構成を確認します。
2. 表を読むだけでなく、レビュー中に各項目を合格／不合格／該当なしで記録します。
3. ディスプレイ、ストレージ、ウェイクアップ、低消費電力に関する項目を、対応するハードウェア設計ガイドの各節と照合します。
4. 未解決の前提があれば、リリース前にレビュー記録へ残します。

<div align="center"><em>表 4.5-1: レビュー記録テンプレート</em></div>

<div align="center" markdown>

| 項目 | 値 |
|:---|:---|
| 顧客名 | |
| 顧客設計名 | |
| レビュー依頼日 | |
| 初回レビュー担当者 | |
| 初回レビュー日 | |
| フォローアップレビュー担当者 | |
| フォローアップレビュー日 | |

</div>

<div align="center"><em>表 4.5-2: チェックリスト文書の改訂履歴</em></div>

<div align="center" markdown>

| No. | バージョン | 日付 | リリースノート |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 回路図／PCB チェックリスト文書の初版 |

</div>

## ハードウェア設計ガイドの続き { #continue-the-design-guide }

完全版ガイドは、設計プロセスの各段階を扱う以下のページで構成されています。このページから各ページに移動できます。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[回路設計ガイドライン](SF32LB58x_schematic_design.md)__ — 電源システム、クロック生成、RF、ユーザーインターフェース、ストレージと接続、製造
- :fontawesome-solid-list-check: __[回路図チェックリスト](SF32LB58x_schematic_checklist.md)__ — 回路図の項目別レビュー用チェックリスト（第 5.8 節）
- :fontawesome-solid-microchip: __[PCB レイアウト指針](SF32LB58x_pcb_layout.md)__ — パッケージのフットプリント、基板積層、ファンアウト、クロック／RF／オーディオ／USB／SDIO／DSI／電源の配線指針
- :fontawesome-solid-list-check: __[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)__ — PCB レイアウトの項目別レビュー用チェックリスト（第 6.18 節）
- :fontawesome-solid-book-open: __[設計レビュー用チェックリストと参考資料](SF32LB58x_review_and_reference.md)__ — リリースチェックリスト、関連資料、付録、改訂履歴

</div>
