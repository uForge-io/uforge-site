---
icon: lucide/cpu
title: ハードウェア
description: SF32 のリファレンス設計を再利用するか、選定したデバイスを使って設計し、量産に向けて仕上げます。
---

# ハードウェア { #hardware }

SF32 デバイスを選定し、開発ボードの基準構成を検証したら、このセクションで基板やモジュール用キャリア基板の設計を進め、量産に備えてください。適合するリファレンス設計があれば再利用し、選定したデバイスの設計ガイドに沿って実装します。その後、量産準備の審査に必要な検証結果と設計資料をそろえます。

## 作業内容から選ぶ { #choose-a-starting-point }

<div align="center"><em>ハードウェア設計の進め方</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 作業内容 | 参照先 | 得られるもの |
|:----------|:-------|:-------------|
| 検証済みのハードウェア／ソフトウェアの基準構成を再利用する | [リファレンス設計](reference-designs/reference-designs.md) | 再現可能な設計の出発点、検証項目、再利用できる範囲。 |
| チップを直接実装する基板、またはモジュール用キャリア基板を設計する | [対応する設計ガイドを探す](#find-a-guide) | チップまたはモジュールに対応した設計ガイドと、利用可能なチェックリスト。 |
| M2 の提案に沿ってモジュールインターフェースを検討する | [M2 モジュール](m2-modules/interface-standards-overview.md) | M2 の命名規則と、選定したモジュールに照らして確認すべきピンレベルの草案。 |
| CAD／BOM の設計資料を準備する | [CAD と部品](cad-components/components-and-cad-libraries.md) | 公式 EDA ライブラリ、AVL 資料、選定部品に必要な確認項目。 |
| 設計一式をリリースする | [量産に向けた設計](design-for-production.md) | 量産準備の審査、保管すべき証跡、製造への引き継ぎ。 |

</div>

## 設計ガイドを探す { #find-a-guide }

設計に使うチップまたはモジュールを選び、対応する設計資料を参照してください。パッケージ、電源の基準構成、メモリーのグレード、組み込み方法がまだ決まっていない場合は、先に製品紹介を確認します。

### チップの設計ガイドとチェックリスト { #chip-guides-and-checklists }

<div align="center"><em>表: チップの設計ガイドとチェックリスト</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 選定したチップファミリー | ハードウェア設計ガイド | チェックリスト | 参照する場面 |
|:-------------------------|:----------------------|:---------------|:-------------|
| SF32LB52x | [ガイド](chip-guides/SF32LB52x_hardware_design_guide.md) | [チェックリスト](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | SF32LB52x を直接実装する基板を設計するとき。 |
| SF32LB55x | [ガイド](chip-guides/SF32LB55x_hardware_design_guide.md) | [チェックリスト](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | SF32LB55x を直接実装する基板を設計するとき。 |
| SF32LB56x | [ガイド](chip-guides/SF32LB56x_hardware_design_guide.md) | [チェックリスト](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | SF32LB56x を直接実装する基板を設計するとき。 |
| SF32LB57x | ガイド | 回路図 / PCB レイアウト | SF32LB57x を直接実装する基板を設計するとき。 |
| SF32LB58x | [ガイド](chip-guides/SF32LB58x_hardware_design_guide.md) | [チェックリスト](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | SF32LB58x を直接実装する基板を設計するとき。 |

</div>

### モジュールの設計ガイド { #module-guides }

<div align="center"><em>表: モジュールの組み込みガイド</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 選定したモジュール | モジュール設計ガイド | 用途 |
|:-------------------|:--------------------|:-----|
| SF32LB52-MOD-1 | [モジュールガイド](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | キャリア基板の電源、ピン配置、アンテナ周辺のクリアランス、製造時の取り扱い。 |
| SF32LB56-MOD | [モジュールガイド](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | キャリア基板への組み込み、電源、RF 回路の配置、インターフェース、検証。 |
| SF32LB58-MOD | [モジュールガイド](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | キャリア基板の電源、ピン配置、アンテナ周辺のクリアランス、製造時の取り扱い。 |

</div>

## ハードウェア設計の進め方 { #follow-the-hardware-path }

1. **適合するリファレンス設計があれば再利用する。** 設計を変更する前に、指定された基板とソフトウェアの構成を再現します。適合する設計がなければ、選定したデバイスの設計ガイドから始めます。
2. **実装してレビューする。** 回路図の作成前に対応する設計ガイドを確認し、回路図と基板レイアウトのレビュー時にはチェックリストを使います。ハードウェアを確定する前に、最も近い[開発ボード](../sf32-products/index.md)で対象のソフトウェアと周辺機能の動作を検証してください。開発ボードでの試験は、最終基板での電源、ピン機能、RF の検証を代替するものではありません。
3. **キャリア基板で M2 の提案を採用する場合は、M2 モジュール資料を参照する。** モジュールのインターフェースを確定する前に、[M2 命名規則](m2-modules/M2%20Interface%20Naming%20Rules.md)を適用し、[インターフェース定義](m2-modules/M2-interface-definition.md)を選定したモジュールに照らして確認します。ピンレベルの定義はまだ草案です。
4. **CAD 資料と部品選定を確認する。** [CAD と部品](cad-components/components-and-cad-libraries.md)を参照し、対象品番のシンボル、フットプリント、パッケージ図、AVL、重要部品に関する前提を照合します。
5. **量産リリースの審査を終える。** 設計の根拠資料、承認済みの逸脱事項、残存リスク、製造試験の前提条件をそろえて、[量産に向けた設計](design-for-production.md)へ進みます。

## 次の開発ステップ { #stay-connected-to-the-platform-path }

デバイス、モジュール、開発ボードの選定がまだ固まっていない場合は、[SF32 製品](../sf32-products/index.md)に戻ってください。ツールチェーン、書き込み、シリアルログの動作確認済み環境を用意するには、[SF32開発の始め方](../getting-started/index.md)を参照します。ハードウェアと合わせて検証が必要なソフトウェア実装については、[開発の概要](../develop/index.md)を確認してください。
