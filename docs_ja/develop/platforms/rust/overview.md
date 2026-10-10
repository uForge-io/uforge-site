---
icon: lucide/code
description: "OpenSiFli の sifli-rs (sifli-hal、sifli-pac) を通じた SF32 向けコミュニティ Rust サポートを評価します。成熟度、適した／不向きな用途、リスク確認項目を説明します。"
tags:
    - 開発
    - Rust
---

# Rust { #rust }

OpenSiFli では [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) で Rust の取り組みを進めており、HAL、PAC、Flash テーブル用クレート、サンプル、Flash 書き込み／デバッグに関するメモなどが含まれています。

メンテナーは、このプロジェクトは開発途上であり、製品利用の準備はできていないと説明しています。ハードウェアに近い領域で作業し、上流へ修正を貢献できるチームでない限り、SF32 上の Rust は探索的な経路として扱ってください。

最初のツールチェーン設定、変更していない Blinky のビルド、書き込みランナーの設定については[Rust を始める](../../../getting-started/rust/getting-started-rust.md)を参照してください。このページでは、対応範囲を評価し、基準構成を超えて Rust を採用するか判断します。

## OpenSiFli が挙げるクレート { #crates-mentioned-by-opensifli }

<div align="center"><em>表: OpenSiFli が挙げるクレート</em></div>

<div align="center" markdown>

| クレート | 目的 |
|:---------|:-----|
| `sifli-hal` | ハードウェア抽象化レイヤー。 |
| `sifli-pac` | ペリフェラルアクセスクレート。 |
| `sifli-flash-table` | Flash テーブルのサポート。 |

</div>

## Rust が適する場面 { #when-rust-makes-sense }

次のような目標がある場合、Rust は有力な選択肢です。

- 組み込み Rust を試す。
- 低レベルファームウェアコードで強い型付けを活用する。
- 将来、`embedded-hal` スタイルのドライバーを開発する。
- SF32 の Rust エコシステムに貢献する。

現時点で製品用ファームウェアを開発する場合は、SiFli-SDK を使用してください。

## 評価ゲート { #evaluation-gates }

製品への移植を始める前に、対象ボードで初期導入用の基準構成が動作することを確認します。その後、必要な周辺機器、Flash 配置、デバッグ経路、ランタイム機能ごとに、独立した検証結果を作ります。各結果とともに、上流コミット、Rust ターゲット、Cargo 設定、ボードリビジョン、復旧手順を記録してください。

リポジトリでは `sifli-hal`、`sifli-pac`、Flash テーブル用ツール、Embassy スタイルの非同期サンプルを組み合わせているため、アプリケーションの成否はクレート単体がコンパイルできるかだけでなく、それらの相互動作にも左右されます。未対応箇所を評価する場合は、最小の再現例を維持してください。

## リスクチェックリスト { #risk-checklist }

- 使用するクレートは対象チップに対応しているか。
- HAL は必要な周辺機器をカバーしているか。
- Flash 配置は対象ボードと互換性があるか。
- 使用するデバッグプローブ／ツール向けの手順が文書化されているか。
- SiFli-SDK または `sftool` で同じボードを復旧できるか。
- チームは修正の貢献に対応できるか。

## 適した用途／不向きな用途 { #good-fit-poor-fit }

<div align="center"><em>表: Rust が適する用途と不向きな用途</em></div>

<div align="center" markdown>

| 適した用途 | 不向きな用途 |
|:-----------|:-------------|
| 実験やドライバーの調査。 | ベンダーサポートが必要な量産スケジュール。 |
| すでに組み込み Rust を使用しているチーム。 | 現時点で完全な Bluetooth／ディスプレイ／オーディオスタックが必要な製品。 |
| HAL/PAC の成熟に貢献する。 | Arduino や SDK サンプルを使う方が早い一回限りの試作。 |

</div>
