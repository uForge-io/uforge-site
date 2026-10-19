---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58x MCUのハードウェア設計ガイドです。電源アーキテクチャ、クロックとRF、ディスプレイ、ストレージ、オーディオ、PCBレイアウトを扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58xハードウェア設計ガイド { #sf32lb58x-hardware-design-guide }

## 1. はじめに { #1-introduction }

本ガイドでは、高性能AIoTマイクロコントローラーSF32LB58xファミリーを使った製品設計に向けて、推奨事項と参考情報を提供します。豊富なユーザーインターフェース、大容量メモリー、デュアルモードBluetooth、オーディオ、多数のGPIO、低消費電力スタンバイを必要とするバッテリー駆動製品を開発する、ハードウェアエンジニア、PCB設計者、製品開発者を対象としています。

PMICと電源分配、BGA256のファンアウト、HDI基板の積層計画、クロック回路、RF設計、MIPI-DSI、USB2.0 High-Speed、SDIO/eMMC、オーディオ回路、PCBレイアウト、検証、製造準備まで、ハードウェア開発プロセス全体を扱います。本ガイドに従うことで、高密度BGA/HDI設計のリスクを低減し、高速インターフェースのシグナルインテグリティを守り、SF32LB58xの電源、パッケージ、量産要件に沿った設計にできます。

本書は、組み込みハードウェア設計、回路図作成、高密度PCBレイアウトの基礎知識を前提としています。SF32LB58xのデータシート、ユーザーマニュアル、公式ハードウェアアプリケーションノート、リファレンスデザイン一式、SiFli承認ベンダーリストを補完する資料です。電気仕様、ピン多重化、パッケージ寸法、部品認定、量産上の制限については、これらの資料が正式な根拠となります。

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
| コアアーキテクチャ | 異種混在のトリプルコア構成: 最大240 MHzのアプリケーション用Arm Cortex-M33 STAR-MC1コア2基と、最大96 MHzの低消費電力Arm Cortex-M33 STAR-MC1コア1基 |
| Bluetooth | 低消費電力デュアルモードBluetooth 5.3トランシーバーを内蔵 |
| グラフィックス | ePicasso 2.0の2D/2.5Dグラフィックスアクセラレーションと、Vivante GCNanoUltraVのベクターグラフィックス |
| ディスプレイインターフェース | MIPI-DSI、SPI/QSPI、MCU8080、DPI、パラレル／シリアルJDI |
| ストレージ | 型番に応じたNOR Flash/PSRAMのSiP実装。外付けNOR/SPI NAND FlashはMPI3またはMPI4に接続でき、SD1とSD2のSDIOインターフェースも備えます |
| オーディオ | I2S 3系統、PDM 2系統、差動アナログ音声入出力、外付けアナログオーディオPAとI2SオーディオPAに対応 |
| ウェイクアップ割り込み | すべてのGPIOはLight/Deep Sleepからのウェイクに対応。Standby/Hibernateでは16個のウェイクアップ割り込み要因（PA 6個、PB 10個）に対応 |
| PBRインターフェース | PBRピンは6本。PBR0は電源投入時にLowからHighへ遷移し、一部の外部LSW制御に使用できます。PBR1-PBR5は既定でLowです。PBR0-PBR5はLPTIMまたは32 kHzクロックを出力でき、Standby/Hibernate中も出力として使用できます。PBR0-PBR3はウェイク入力に設定できますが、MCU動作中は割り込みを発生しません。 |

</div>

### 3.2. バリアント { #32-variants }

回路図を確定する前に、SF32LB58xの正確な発注型番とSiPメモリー構成を最新版のデータシートおよびAVLで確認してください。本ファミリーはBGA256のHDI専用プラットフォームで、SiPメモリー構成は型番によって異なります。外付けNOR FlashまたはSPI NAND FlashはMPI3またはMPI4に接続できます。SiFli EVBでは外付けSPI NANDにMPI4を使用し、SD1はeMMCまたはSD NAND、SD2はSDカードまたはWi-Fiデバイスに使用します。設計確定前に、対象品番のピン割り当てと基板上の配線を確認してください。

### 3.3. パッケージ { #33-packages }

<div align="center"><em>表 3.3-1: パッケージ</em></div>

<div align="center" markdown>

| パッケージ名 | 外形寸法 | ピンピッチ |
|:---|:---|:---|
| BGA256 | 8.5 mm x 6.5 mm x 0.94 mm | 0.4 mm |

</div>

### 3.4. 主なハードウェア機能 { #34-major-hardware-features }

- ピッチ0.4 mmのBGA256パッケージ。電源とGPIOの高密度ファンアウトが必要です。
- HDI PCBプロセスが必須で、PTH基板には対応しません。
- PMUを内蔵し、BUCK出力2系統と内部LDO出力3系統を備えます。
- オプションのシステムPMIC SF30147Cを、ウォッチクラスのシステムの電源分配に使用できます。
- MIPI-DSI、USB2.0 HS、SDIO/eMMC、RF、オーディオ、高密度BGAファンアウトでは、基板積層とインピーダンスを早期に確認する必要があります。

### 3.5. 主な用途 { #35-typical-applications }

SF32LB58xは、高度なグラフィックス、大容量メモリー、マルチメディア、エッジAI処理を組み合わせるコネクテッド製品に適しています。たとえば、次の用途が挙げられます。

- スマートウォッチ、スポーツウォッチ、アウトドア向けウェアラブル
- 高機能サイクルコンピューター、車載ダッシュボード
- スマートディスプレイ、コネクテッドダッシュボード
- AI搭載ウェアラブル機器
- エッジAI、センサーフュージョンシステム
- 高解像度LVGLベースのHMI機器
- 携帯型の医療／産業用端末
- 外付けSDIO Wi-Fiデバイスを使うBluetooth + Wi-Fiアクセサリー

## 4. 設計の概要 { #4-design-at-a-glance }

### 4.1. ハードウェアアーキテクチャ { #41-hardware-architecture }

<div align="center"><em>表 4.1-1: 設計クイックサマリー</em></div>

<div align="center" markdown>

| 設計項目 | 代表的な実装 |
|:---|:---|
| パッケージ | BGA256、8.5 mm x 6.5 mm x 0.94 mm、ピッチ0.4 mm |
| PCB | HDI基板のみ。PTH非対応。6HDI-2の積層を推奨 |
| 電源 | PMU内蔵（BUCK 2系統 + LDO 3系統）。システム全体の電源にはSiFliのPMIC SF30147Cを併用可能 |
| BUCKインダクター | 4.7 µH、DCR ≤ 0.4 Ω、Isat ≥ 500 mA |
| クロック | メイン水晶振動子48 MHz + RTC用水晶振動子32.768 kHz |
| RF | 50 Ωのインピーダンス制御配線、π型整合回路の実装スペースを確保 |
| ディスプレイ | MIPI-DSI（2レーン）、3/4線SPI、Quad-SPI、MCU8080、DPI、パラレル／シリアルJDI。2系統のLCDCピン割り当て：LCDC1（PA）/LCDC2（PB） |
| ストレージ | 外付けNOR/SPI NAND FlashはMPI3またはMPI4に接続できます。SiFli EVBではSPI NANDにMPI4、eMMC/SD NANDにSD1、SDカード/Wi-FiデバイスにSD2を使用します |
| オーディオ | I2S 3系統（マスターのみ）、PDM 2系統、差動アナログ音声入出力 |
| デバッグ | SWD 1系統 + 選択可能なUARTデバッグ出力6系統 |
| USB | USB2.0 HS、Host/Deviceモード |

</div>

### 4.2. ハードウェア設計フロー { #42-hardware-design-flow }

<div align="center"><em>表 4.2-1: ハードウェア設計フロー</em></div>

<div align="center" markdown>

| 手順 | 設計上の判断 | 主な参照セクション |
|:---|:---|:---|
| 1 | 発注型番、SiPメモリー構成、BGA256パッケージの前提を確認する | デバイス概要、パッケージ |
| 2 | レイアウト開始前にHDI積層、ビア構造、インピーダンス規則、実装能力を確定する | PCBレイアウト指針 |
| 3 | オプションのシステムPMIC SF30147Cを使用するか決定し、チップのPMU電源レール、BUCKインダクター、LDOコンデンサー、リセット、電源シーケンスを定義する | 電源システム |
| 4 | ブートストレージ、ディスプレイインターフェース、USBの役割、SDIO/eMMCの使用方法、オーディオ構成、デバッグアクセスを選定する | ストレージと接続、ユーザーインターフェース、製造 |
| 5 | クロック、RF、DSI、USB2.0 HS、SDIO/eMMC、オーディオ、DC/DC、BGAファンアウト、ESDの配線スクリーンショットを確認する | クロック生成、RF、PCBレイアウト指針 |
| 6 | 試作リリース前に回路図、積層、DRC、インピーダンス、AVL、製造資料、対象を絞ったレイアウト証跡を保管する | 設計レビューのチェックリスト |

</div>

### 4.3. 本ガイドの使い方 { #43-how-to-use-this-guide }

基板レビューの順序に沿って本ガイドを利用してください。まずパッケージとSiPメモリー構成を確認し、HDI積層とPMIC方式を確定します。次にブートストレージとディスプレイ配線を確認し、その後、クロック、RF、USB、オーディオ、デバッグ、量産テストへのアクセスを検証します。第5節は回路図設計の基準、第6節はPCB実装の基準、第7節はリリースチェックリストです。

### 4.4. レビュー証跡一式 { #44-review-evidence-pack }

試作リリース前に、回路図PDF、PCB積層、ビア／製造プロセスの対応能力を示す資料、インピーダンスレポート、DRCレポート、AVL照合結果を保存します。また、PMIC、BUCKインダクター、DSI、USB、SDIO/eMMC、RF、水晶振動子、オーディオ、BGAファンアウト、GNDリターン、ESDの入口について、要点を絞ったレイアウトのスクリーンショットを保管してください。

### 4.5. チェックリストの使い方 { #using-the-checklists }

本ガイドには、確認の粒度が異なる2種類のチェックリストがあります。第5.2.1.7節と第5.7.3節の簡易チェックリストは、短時間のセルフチェック向けにリスクの高い項目をまとめたものです。[回路図チェックリスト](SF32LB58x_schematic_checklist.md)（第5.8節）と[PCBレイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)（第6.18節）には、SiFliの完全版「SF32LB58x Schematic & PCB Checklist」（V1.0、2026-01-21）が項目ごとに掲載されています。

各チェック項目は必須（リリース前に合格が必要）または任意（該当機能を使用する場合に推奨）のいずれかです。色付き文字と<span class="flag-yellow">黄色の背景</span>が付いた文字は、元のチェックリストのレビュー上の強調を維持しています。元資料では各強調の理由が示されていないため、これらは追加のレビュー目印として扱い、同じ表にある強調表示のない項目の代わりにはしないでください。

元のチェックリストのワークブックでは、AVLに掲載されていない部品のIsatを450 mA以上としています。一方、公式ハードウェアアプリケーションノートでは、L = 4.7 µH、DCR ≤ 0.4 Ωの条件でIsat ≥ 500 mAとしています。チェックリストにはワークブックの値を残しています。SiFliから明確な回答が得られるまでは、AVLに掲載されていない部品を選ぶ際、より厳しいIsat ≥ 500 mAを設計条件としてください。

回路図レビューではPCBレイアウトを始める前に[回路図チェックリスト](SF32LB58x_schematic_checklist.md)を使い、PCBレイアウトレビューではガーバーデータをリリースする前に[PCBレイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)を使います。通常、それぞれのレビューは二回実施します。最初に設計エンジニアが確認し、その後、設計凍結または製造リリースの前に独立したレビュー担当者が確認します。

チェックリストは、単なる閲覧用ではなく、承認記録として使うと効果的です。

1. まず対象の正確な発注型番とSiPメモリー構成を確認します。
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
| 1 | V1.0 | 2026-01-21 | 回路図／PCBチェックリスト文書の初版 |

</div>

## ハードウェア設計ガイドの続き { #continue-the-design-guide }

完全版ガイドは、設計プロセスの各段階を扱う以下のページで構成されています。このページから各ページに移動できます。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[回路図設計ガイドライン](SF32LB58x_schematic_design.md)__ — 電源システム、クロック生成、RF、ユーザーインターフェース、ストレージと接続、製造
- :fontawesome-solid-list-check: __[回路図チェックリスト](SF32LB58x_schematic_checklist.md)__ — 回路図の項目別レビュー用チェックリスト（第5.8節）
- :fontawesome-solid-microchip: __[PCBレイアウト指針](SF32LB58x_pcb_layout.md)__ — パッケージのフットプリント、基板積層、ファンアウト、クロック／RF／オーディオ／USB／SDIO／DSI／電源の配線指針
- :fontawesome-solid-list-check: __[PCBレイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)__ — PCBレイアウトの項目別レビュー用チェックリスト（第6.18節）
- :fontawesome-solid-book-open: __[設計レビュー用チェックリストと参考資料](SF32LB58x_review_and_reference.md)__ — リリースチェックリスト、関連資料、付録、改訂履歴

</div>
