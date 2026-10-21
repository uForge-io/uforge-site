---
icon: lucide/book-check
description: "SF32LB56x MCUのハードウェア設計ガイドです。電源システム、クロック生成、RF、ディスプレイ、オーディオ、PCBレイアウトについて説明します。"
tags:
    - ハードウェア
    - チップ
hide:
    - navigation
---

# SF32LB56xハードウェア設計ガイド { #sf32lb56x-hardware-design-guide }

## 1. はじめに { #1-introduction }

本ガイドでは、グラフィックス処理に適したAIoTマイクロコントローラーSF32LB56xファミリーを使った製品向けに、推奨事項と参考情報を提供します。スマートウォッチ、コネクテッドHMIシステム、医療・ヘルスケア機器、産業用ハンディ機器、携帯計測器、高機能な電動自転車／電動キックボード用ディスプレイを開発するハードウェアエンジニア、PCB設計者、製品開発者を対象としています。

SF32LB56xUとSF32LB56xVの両方について、パッケージ選定、PMICとプロセッサーの電源、リセット、ブートモード、動作モード、水晶振動子、RF、ディスプレイ、ストレージ、オーディオ、センサー、UART/I2C/GPTIMのピン計画、PCBレイアウト、検証、製造準備まで、ハードウェア開発プロセス全体を扱います。本ガイドに従うことで、回路図とレイアウトのリスクを低減し、低消費電力動作を維持し、U/Vバリアントの違いを設計全体で明確にできます。

本書は、組み込みハードウェア設計、回路図作成、PCBレイアウトの基礎知識を前提としています。SF32LB56xUおよびSF32LB56xVのハードウェアアプリケーションノート、データシート、ユーザーマニュアル、リファレンスデザイン、SiFli承認ベンダーリストを補完する資料です。電気仕様、ピン多重化、パッケージ寸法、部品の適合性確認、量産上の制限については、これらの資料を正式な根拠としてください。

## 2. 開発リソース { #2-development-resources }

[SF32LB56xU ハードウェアアプリケーションノート]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV ハードウェアアプリケーションノート]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SF32LB56xU ハードウェアアプリケーションのソース]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[SF32LB56xV ハードウェアアプリケーションのソース]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[SF32 ファミリー概要]: ../../sf32-products/family/SF32_family.md
[SiFli 承認ベンダーリスト (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[サンプルの購入]: https://sifli.taobao.com/
[開発キットの購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB56xU ハードウェアアプリケーションノート]__
- :fontawesome-solid-file-lines: __[SF32LB56xV ハードウェアアプリケーションノート]__
- :fontawesome-brands-github: __[SF32LB56xU ハードウェアアプリケーションのソース]__
- :fontawesome-brands-github: __[SF32LB56xV ハードウェアアプリケーションのソース]__
- :fontawesome-solid-file-excel: __[SiFli 承認ベンダーリスト (AVL)]__
- :fontawesome-solid-cart-shopping: __[サンプルの購入]__
- :fontawesome-solid-cart-shopping: __[開発キットの購入]__

</div>

## 3. デバイス概要 { #3-device-overview }

### 3.1. アーキテクチャ { #31-architecture }

SF32LB56xは、BLEセンサー専用ノードよりも高度なディスプレイやHMIを必要とする製品を対象としています。U/V両方の公式ハードウェアアプリケーションノートでは、PMICによる電源分配、48 MHzと32.768 kHzの水晶振動子、RF設計、ディスプレイとストレージのインターフェース選択、オーディオ、PBRピン、センサー、UART/I2C/GPTIMの計画、デバッグ／書き込み、量産時の水晶校正という共通の設計テーマを扱っています。

### 3.2. バリアントとパッケージ { #32-variants-and-packages }

<div align="center"><em>表 3.2-1: SF32LB56xのパッケージバリアント</em></div>

<div align="center" markdown>

| バリアント | パッケージ | 外形寸法 | ピンピッチ | ボール径 |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| SF32LB56xV | WBBGA175 | 6.5x6.1x0.94 mm | 0.4 mm | 0.25 mm |

</div>

UバリアントはQFN68Lパッケージ、VバリアントはWBBGA175パッケージを採用しています。Vバリアントでは、ファンアウト、ビア、HDIプロセスの計画に特に注意が必要です。

![図 3.2-1: SF32LB56xU QFN68Lのピン配置](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-1: SF32LB56xU QFN68Lのピン配置</em></div>

![図 3.2-2: SF32LB56xV WBBGA175のピン配置](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-2: SF32LB56xV WBBGA175のピン配置</em></div>

### 3.3. 主なハードウェア機能 { #33-major-hardware-features }

- SF30147Cを使った事例を含む、PMICを中心とする電源分配。
- 48 MHzおよび32.768 kHzの水晶振動子の要件と推奨モデル。
- BluetoothのRF設計とアンテナ整合の要件。
- UではSPI/QSPIおよびJDIディスプレイ、VではSPI/QSPI、MCU8080、DPI、JDIディスプレイ。
- SDIO/eMMC/SD NAND形式のインターフェースを含む、外部メモリーとブートストレージの選択肢。
- ボタン、振動モーター、オーディオインターフェース、PBRピン、センサー、UART/I2C、GPTIM、デバッグ／書き込み、校正。

### 3.4. 主な用途 { #34-typical-applications }

![図 3.4-1: SF32LB56xUスマートウォッチのアプリケーションブロック図](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>図 3.4-1: SF32LB56xUスマートウォッチのアプリケーションブロック図</em></div>

![図 3.4-2: SF32LB56xVスマートウォッチのアプリケーションブロック図](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>図 3.4-2: SF32LB56xVスマートウォッチのアプリケーションブロック図</em></div>

SF32LB56xは、Bluetooth、オーディオ、センサー、外部メモリー、高機能なUIを必要とするスマートウォッチ、コネクテッドHMIパネル、ヘルスケア製品、産業用ハンディ機器、携帯計測器、高機能ディスプレイ製品に適しています。

## 4. 設計の概要 { #4-design-at-a-glance }

### 4.1. エンジニアリング要約 { #41-engineering-summary }

<div align="center"><em>表 4.1-1: SF32LB56xの設計要約</em></div>

<div align="center" markdown>

| 項目 | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| パッケージ | QFN68L、7x7x0.75 mm、ピッチ0.35 mm | WBBGA175、6.5x6.1x0.94 mm、ピッチ0.4 mm |
| ディスプレイ | 主な記載インターフェース：SPI/QSPI、JDI | 記載インターフェース：SPI/QSPI、MCU8080、DPI、JDI |
| PCBプロセス | 小型QFNの配線とファンアウト | BGA/HDIの計画、ブラインド／埋め込みビアの確認、より厳密なファンアウト管理 |
| 電源 | プロセッサー電源レールとSF30147C PMICによる電源分配 | プロセッサー電源レールとSF30147C PMICによる電源分配。V固有の負荷割り当ても考慮 |
| ストレージ | 公式資料に記載されたSF32LB56xUのストレージピンを使った外部メモリー設計 | 公式資料に記載されたSF32LB56xVのストレージピンを使った外部メモリー設計 |

</div>

### 4.2. ハードウェア設計フロー { #42-hardware-design-flow }

1. U/Vバリアント、パッケージ、ディスプレイインターフェース、ストレージ、対象PCBプロセスを選定します。
2. PMICによる電源分配、プロセッサー電源レール、リセット、充電、低消費電力制御を定義します。
3. 水晶振動子、RF整合、ディスプレイ、ストレージ、オーディオ、センサー、ボタン、モーター、PBRの回路を選定します。
4. ピン割り当てを確定し、ディスプレイ、ストレージ、オーディオ、デバッグ、ウェイクアップ、量産機能間の競合を確認します。
5. PCBファンアウト、積層、インピーダンス、RF、クロック、USB/SDIO、オーディオ、DC-DC、ESDをレビューします。
6. 回路図の確定、レイアウトのリリース、EVT、量産治具のリリース前に設計チェックリストを実施します。

### 4.3. 設計レビュー資料一式 { #43-review-evidence-pack }

EVTの前に、U/Vの参照資料の版、データシート／ユーザーマニュアルの版、回路図PDF、PCB積層、PCB製造プロセスの対応能力、DRC/ERCレポート、PMIC設定、電源ツリー、ブート／ストレージ設定、ディスプレイ配線画像、RF／水晶レイアウト画像、オーディオ／アナログ回路画像、量産時の書き込み／校正計画を保存します。

### 4.4. チェックリストの使い方 { #using-the-checklists }

本ガイドでは、チェックリストを簡易版と詳細版の二段階で用意しています。第 7 節の簡易チェックリストでは、短時間のセルフチェック向けにリスクの高い項目をまとめています。[回路図チェックリスト](SF32LB56x_schematic_checklist.md)（第 5.8 節）と[PCBレイアウトガイドライン](SF32LB56x_pcb_layout.md)の第 6.3 節には、SiFliの完全版「SF32LB56x Schematic & PCB Checklist」（V1.0、2026-01-21）が項目ごとに掲載されています。このチェックリストは、ハードウェア設計資料とともに[SiFli Wikiのチップ向けハードウェア設計ガイド一覧][SiFli チップ向けハードウェア設計ガイド一覧 (Wiki)]で公開されており、SF32LB56xUファミリー、SF32LB56xVファミリー、SS6700Aバリアントを対象としています。

各チェック項目には、対象となるチップグループと、区分（必須または任意）が記載されています。必須項目はリリース前に合格する必要があり、任意項目は該当機能を使用する場合に推奨されます。色付き文字と<span class="flag-yellow">黄色の背景</span>は、元のチェックリストのレビュー上の強調を維持しています。元資料では各強調の理由が示されていないため、これらは追加のレビュー目印として扱い、同じ表にある強調表示のない項目の代わりにはしないでください。

回路図レビューではPCBレイアウトを始める前に[回路図チェックリスト](SF32LB56x_schematic_checklist.md)を使い、PCBレイアウトレビューではガーバーデータをリリースする前に、第 6.3 節のPCBレイアウトチェックリストを使います。通常、それぞれのレビューは二回実施します。最初に設計エンジニアが確認し、その後、設計凍結または製造リリースの前に独立したレビュー担当者が確認します。

チェックリストは、単なる閲覧用ではなく、承認記録として使うと効果的です。

1. まず対象の正確な型番とパッケージを確認します。
2. 表を読むだけでなく、レビュー中に各項目を合格／不合格／該当なしで記録します。
3. ディスプレイ、ストレージ、ウェイクアップ、低消費電力に関する項目を、対応するハードウェア設計ガイドの各節と照合します。
4. パッケージ固有の前提、特に56xUと56xV、QFNとWBBGA、DSIとSPIディスプレイ、SD2/MPI3のストレージ使用状況をレビュー記録に残します。

<div align="center"><em>表 4.4-1: レビュー記録テンプレート</em></div>

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

<div align="center"><em>表 4.4-2: チェックリスト文書の改訂履歴</em></div>

<div align="center" markdown>

| No. | バージョン | 日付 | リリースノート |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 回路図／PCBチェックリスト文書の初版 |

</div>

[SiFli チップ向けハードウェア設計ガイド一覧 (Wiki)]: https://wiki.sifli.com/hardware/index.html

## ハードウェア設計ガイドの続き { #continue-the-design-guide }

完全版ガイドは、設計プロセスの各段階を扱う以下のページで構成されています。このページから各ページに移動できます。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[回路図設計ガイドライン](SF32LB56x_schematic_design.md)__ — 電源システム、動作モードとウェイクアップ要因、クロック生成、RF、ディスプレイ／タッチ／バックライトインターフェース、ストレージ／センサー／オーディオ／接続、製造
- :fontawesome-solid-list-check: __[回路図チェックリスト](SF32LB56x_schematic_checklist.md)__ — 回路図の項目別レビュー用チェックリスト（第 5.8 節）
- :fontawesome-solid-microchip: __[PCBレイアウトガイドライン](SF32LB56x_pcb_layout.md)__ — フットプリント、基板積層、重要信号の配線、項目別PCBレイアウトチェックリスト
- :fontawesome-solid-book-open: __[設計レビューのチェックリストと参考資料](SF32LB56x_review_and_reference.md)__ — リリースチェックリスト、関連資料、付録、改訂履歴

</div>
