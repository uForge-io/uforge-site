---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB55x MCUのハードウェア設計ガイドです。電源、クロック回路、RF整合、ストレージとディスプレイの各インターフェース、PCBレイアウトの指針を説明します。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB55xハードウェア設計ガイド { #sf32lb55x-hardware-design-guide }

## 1. はじめに { #1-introduction }

本ガイドでは、汎用AIoTマイクロコントローラーのSF32LB55xファミリーを使った製品に向けて、推奨事項と参考情報を紹介します。BLEウェアラブル、複数のセンサーを搭載したバッテリー駆動製品、健康モニタリング機器、小型の接続システムを開発するハードウェアエンジニア、PCB設計者、製品開発者を対象としています。

パッケージ選定から電源設計、クロック回路、RFレイアウト、外部メモリー、ディスプレイインターフェース、ウェイクアップ要因、センサー、オーディオ、デバッグアクセス、PCBレイアウト、検証、製造準備まで、ハードウェア開発プロセス全体を扱います。これらの推奨事項を設計に反映することで、回路図とレイアウトのリスクを低減し、低消費電力動作を保ちながら、SF32LB55xのパッケージ、電源、メモリー、RF、インターフェースの要件に沿った設計を進められます。

本書は、組み込みハードウェア設計と回路図作成の基礎知識を前提とし、SF32LB55xのデータシート、ユーザーマニュアル、公式ハードウェアアプリケーションノート、リファレンスデザイン、SiFli承認ベンダーリストを補完します。電気仕様、ピン機能の多重化、パッケージ寸法、部品の適合性評価、量産上の制限については、これらの公式資料を確認してください。

SF32LB55xには従来の型番サフィックス規則が使われています。インターフェースの利用可否、パッケージ依存の機能、正確なメモリー構成は、サフィックスだけから推定せず、発注型番と対応するパッケージ資料で確認してください。

## 2. 開発リソース { #2-development-resources }

[SF32LB55x ハードウェアアプリケーションノート]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SF32LB55x ハードウェアアプリケーションのソース]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SF32LB55x データシート]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[SF32LB55x ユーザーマニュアル]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[SF32LB55x SDK ドキュメント]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[SF32LB55x API リファレンス]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[SF32 ファミリー概要]: ../../sf32-products/family/SF32_family.md
[SiFli 承認ベンダーリスト (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[サンプルの購入]: https://sifli.taobao.com/
[開発キットの購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x ハードウェアアプリケーションノート]__
- :fontawesome-brands-github: __[SF32LB55x ハードウェアアプリケーションのソース]__
- :fontawesome-solid-file-pdf: __[SF32LB55x データシート]__
- :fontawesome-solid-file-pdf: __[SF32LB55x ユーザーマニュアル]__
- :fontawesome-solid-book: __[SF32LB55x SDK ドキュメント]__
- :fontawesome-solid-book-open: __[SF32LB55x API リファレンス]__
- :fontawesome-solid-microchip: __[SF32 ファミリー概要]__
- :fontawesome-solid-file-excel: __[SiFli 承認ベンダーリスト (AVL)]__
- :fontawesome-solid-cart-shopping: __[サンプルの購入]__
- :fontawesome-solid-cart-shopping: __[開発キットの購入]__

</div>

## 3. デバイス概要 { #3-device-overview }

### 3.1. アーキテクチャ { #31-architecture }

SF32LB55xは、ユーザー操作への応答性と、長時間の待機・スリープ時の低消費電力を両立したいAIoT製品向けです。低消費電力Bluetooth 5.2トランシーバー、電源管理、メモリー／ディスプレイインターフェースを統合しています。ハードウェア設計では、パッケージ選定、PMU電源レール、ブートモード、2種類の水晶振動子回路、RF整合、外部メモリー、MIPI/SPI/MCU8080/JDIディスプレイの選択、GPADCとセンサーの接続、外部Bluetoothオーディオ、デバッグ／書き込みアクセス、量産時の校正を検討します。

ストレージ接続には複数のQSPIインターフェース、独立したOPI-PSRAMインターフェース、SD/eMMCのサポートが含まれます。パッケージ内蔵NOR FlashとPSRAMの構成は正確な型番によって異なります。また、メモリーとディスプレイのインターフェースはパッケージによって異なります。外付けOPI-PSRAMはBGA145で1チャネル、BGA169で2チャネルに対応します。2データレーンのMIPI DSIはBGA145とBGA169で利用でき、QFN68Lでは利用できません。外付けデバイスのピンを割り当てる前に、正確な型番のピン配置と同一パッケージ内のメモリー構成を確認してください。

### 3.2. バリアントとパッケージ { #32-variants-and-packages }

<div align="center"><em>表 3.2-1: パッケージの選択肢</em></div>

<div align="center" markdown>

| パッケージ名 | サイズ | ピンピッチ | ボール径 |
| :--- | :--- | :--- | :--- |
| QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| BGA145 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |
| BGA169 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |

</div>

SF32LB55xはQFN68L、BGA145、BGA169の各パッケージに対応しています。メモリーインターフェース、ファンアウト、PCB製造プロセスの要件、利用可能なGPIO数はパッケージによって異なるため、早い段階で選定してください。

![図 3.2-1: QFN68Lのピン配置](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-1: QFN68Lのピン配置</em></div>

![図 3.2-2: BGA145のピン配置](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-2: BGA145のピン配置</em></div>

!!! warning "従来のBGA169ピン配置"
    SiFliはSF32LB557V8N6を生産終了（EOL）としています。下図は既存設計の確認用に残しており、新規設計への採用を推奨するものではありません。SF32LB557VD3A6のBGA169ピン配置は異なり、D11、E9、K12、L11、L13、M13はNCです。発注型番に対応する配置を確認してください。パッケージ寸法が同じでもピン互換とは限りません。

![図 3.2-3: BGA169 SF32LB557V8N6のピン配置](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-3: BGA169 SF32LB557V8N6のピン配置</em></div>

![図 3.2-4: BGA169 SF32LB557VD3A6のピン配置](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>図 3.2-4: BGA169 SF32LB557VD3A6のピン配置</em></div>

### 3.3. 主なハードウェア機能 { #33-major-hardware-features }

- QFN68L、BGA145、BGA169のパッケージオプション。
- 48 MHzと32.768 kHzの水晶振動子を使う設計要件。
- 低消費電力Bluetooth 5.2トランシーバー、RF整合、アンテナレイアウト要件。
- OPI PSRAM、QSPI NOR/NAND FlashおよびPSRAM、SDIO eMMCまたはMicro SDのインターフェース。パッケージ内蔵メモリーの構成は正確な型番によって異なります。
- MIPI DSI、SPI/QSPI、MCU8080、JDIのディスプレイを選択可能。
- ウェイクアップボタン、振動モーター、ウェイクアップ割り込み、GPADC、センサー、外部Bluetoothオーディオの設計指針。
- DBG-UART、SWD、量産時の書き込み、水晶振動子の校正に対応。

### 3.4. 主な用途 { #34-typical-applications }

主な用途には、リストバンド型ウェアラブル、スマートモバイル機器、スマートホーム製品など、低消費電力のAIoT製品が含まれます。

## 4. 設計の概要 { #4-design-at-a-glance }

### 4.1. エンジニアリング要約 { #41-engineering-summary }

<div align="center"><em>表 4.1-1: SF32LB55xの設計要約</em></div>

<div align="center" markdown>

| 項目 | 設計の要点 |
|:---|:---|
| パッケージ | ピン割り当てとPCB積層を決める前に、QFN68LまたはBGAパッケージを選定する。 |
| 電源 | PMU電源レール、その他の電源端子、必要なコンデンサ、POR/BOR/リセット、BUCKモードを確認する。 |
| クロック | CL、ppm、ESRの要件を満たす48 MHzおよび32.768 kHzの水晶振動子を使用する。 |
| RF | 整合回路をチップの近くに配置し、ノイズの少ない50 Ωのアンテナ経路を確保する。 |
| メモリー | 揮発性のOPI/QSPI PSRAMと、起動・永続保存に使うQSPI FlashやSDIO eMMC/Micro SDを分けて計画し、パッケージとブートモードの対応を確認する。 |
| ディスプレイ | ピン群とレイアウトが異なるため、早い段階でMIPI DSI、SPI/QSPI、MCU8080、JDIのいずれかを選定する。 |
| 量産 | DBG-UART、SWD、ブートモード、電源、RF／水晶校正用のアクセス手段を確保する。 |

</div>

### 4.2. ハードウェア設計フロー { #42-hardware-design-flow }

1. パッケージ、メモリー構成、ディスプレイインターフェース、低消費電力の目標を確認してください。
2. 電源系統、PMU電源レール、BUCK/LDOの動作、リセット回路を定義してください。
3. 水晶振動子、RF整合方式、アンテナレイアウトの制約を選定してください。
4. メモリー、ディスプレイ、ウェイクアップ、センサー、オーディオ、デバッグ、量産試験用のピンを割り当ててください。
5. PCB積層、ファンアウト、インピーダンス、ESD、RF、高速インターフェースの制約を確定してください。
6. 回路図の確定、レイアウトのリリース、EVTの前に、第 7 節のチェックリストを確認してください。

### 4.3. レビュー証跡一式 { #43-review-evidence-pack }

EVTの前に、データシート／ユーザーマニュアルの版、パッケージ図面、回路図PDF、PCB積層、インピーダンスレポート、DRC/ERCレポート、電源ツリー、ブートモード表、RFと水晶のレイアウト画像、メモリー／ディスプレイ配線の画像、量産用テストポイント計画を保存します。

### 4.4. チェックリストの使い方 { #using-the-checklists }

本ガイドには、二段階のチェックリストがあります。第 7 節の簡易チェックリストでは、短時間のセルフチェック向けにリスクの高い項目をまとめています。[回路図チェックリスト](SF32LB55x_schematic_checklist.md)（第 5.8 節）と[PCBレイアウト指針](SF32LB55x_pcb_layout.md)の第 6.4 節には、SiFliの完全版「SF32LB55x Schematic & PCB Checklist」（V1.0、2026-01-21）が項目ごとに掲載されています。このチェックリストは、ハードウェア設計資料とともに[SiFli Wikiのチップ向けハードウェア設計ガイド一覧][SiFli チップ向けハードウェア設計ガイド一覧 (Wiki)]で公開されており、551/555/557デバイスとSS6600A8バリアントを対象としています。

各チェック項目には、対象となるバリアントグループと、区分（必須または任意）が記載されています。必須項目はリリース前に合格する必要があり、任意項目は該当機能を使用する場合に推奨されます。色付き文字と<span class="flag-yellow">黄色の背景</span>は、元のチェックリストのレビュー上の強調を維持しています。元資料では各強調の理由が示されていないため、これらは追加のレビュー目印として扱い、同じ表にある強調表示のない項目の代わりにはしないでください。

回路図レビューではPCBレイアウトを始める前に[回路図チェックリスト](SF32LB55x_schematic_checklist.md)を使い、PCBレイアウトレビューではガーバーデータをリリースする前に、第 6.4 節のPCBレイアウトチェックリストを使います。通常、それぞれのレビューは二回実施します。最初に設計エンジニアが確認し、その後、設計凍結または製造リリースの前に独立したレビュー担当者が確認します。

チェックリストは、単なる閲覧用ではなく、承認記録として使うと効果的です。

1. まず対象の正確な型番とパッケージを確認します。
2. 表を読むだけでなく、レビュー中に各項目を合格／不合格／該当なしで記録します。
3. ディスプレイ、ストレージ、ウェイクアップ、低消費電力に関する項目を、対応するハードウェア設計ガイドの各節と照合します。
4. パッケージ固有の前提、特にBGAとQFN、DSIとSPIディスプレイ、QSPI2/QSPI3のストレージ使用状況をレビュー記録に残します。

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

- :fontawesome-solid-bolt: __[回路図設計ガイドライン](SF32LB55x_schematic_design.md)__ — 電源、ブートモード、クロック生成、RF、ストレージインターフェース、ディスプレイ／タッチインターフェース、ウェイクアップ／GPADC／製造用インターフェース
- :fontawesome-solid-list-check: __[回路図チェックリスト](SF32LB55x_schematic_checklist.md)__ — 回路図の項目別レビュー用チェックリスト（第 5.8 節）
- :fontawesome-solid-microchip: __[PCBレイアウト指針](SF32LB55x_pcb_layout.md)__ — フットプリント、基板積層、PCBの一般規則、インターフェース配線、項目別PCBレイアウトチェックリスト
- :fontawesome-solid-book-open: __[設計レビュー用チェックリストと参考資料](SF32LB55x_review_and_reference.md)__ — リリースチェックリスト、関連資料、付録、改訂履歴

</div>
