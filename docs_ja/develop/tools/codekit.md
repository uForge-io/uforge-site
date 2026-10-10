---
icon: lucide/app-window
description: "SiFli CodeKit の VS Code 拡張機能が SiFli-SDK 開発で果たす役割を説明します。プロジェクト設定、ビルド／書き込み／モニターの流れ、トラブルシューティングを扱います。"
tags:
    - 開発
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit は、SiFli-SDK 開発用の VS Code 拡張機能です。SDK のセットアップ、プロジェクト作成、設定、ビルド、Flash 書き込み、モニターの各作業を支援します。

初回の使用については[SiFli CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md)を参照してください。このページでは、CodeKit を開発ワークフローの中でどう使うかを説明します。

主な参照先:

- [SiFli CodeKit のスタートガイド](https://docs.sifli.com/projects/codekit/get-started/)

## CodeKit が適する場面 { #best-use-cases }

次のような場合に CodeKit を使います。

- VS Code を中心とした SDK ワークフロー。
- ガイドに沿ったプロジェクト設定。
- エディター上でのボード／プロジェクト設定。
- すべてのコマンドを覚えなくても行えるビルド／書き込み／モニター操作。
- SiFli-SDK を使い始めた開発者にとって、よりスムーズな導入。

CI スクリプトを作成する場合、ツールチェーンのパスを調査する場合、工場用／リリース手順を準備する場合は、SDK のコマンドライン経路を使ってください。CodeKit は開発者の生産性を高める層であり、SDK ビルドの理解に代わるものではありません。

## SiFli-SDK との関係 { #relationship-to-sifli-sdk }

CodeKit は SDK のワークフローを操作するためのもので、SDK 自体を置き換えるものではありません。基盤となる次の要素は変わりません。

- SDK ルート。
- ボード名。
- プロジェクトディレクトリ。
- ビルド出力。
- 書き込み／ダウンロード経路。
- シリアルモニター。

CodeKit の操作が失敗した場合は、可能であれば対応する SDK コマンドを実行して再現してください。拡張機能側の問題と SDK 側の問題を切り分けやすくなり、バグ報告も明確になります。

サポート対象の基準構成の選定には [SiFli-SDK](../platforms/sifli-sdk/overview.md)を、同等のコマンドライン作業の証跡を残すには[ビルド、書き込み、シリアル出力の確認](../platforms/sifli-sdk/build-flash-monitor.md)を使います。CodeKit プロジェクトを変更する前に、対応する[SDK サンプル](../examples/index.md)から始めてください。

## 運用モデル { #operational-model }

CodeKit のエディター操作は、基盤となる SDK から再現できる状態にしておくと最も有用です。拡張機能は操作画面、SiFli-SDK はツールチェーン、ボード定義、ビルド出力、ダウンロード成果物の正式な基準として扱います。

[SiFli CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md)では、拡張機能のインストールと `hello_world` の実行を説明しています。この基準構成が動作したら、CodeKit で編集・ビルド・書き込み・モニターの反復を短縮してください。操作を自動化、調査、または VS Code 外で再現する必要がある場合は、SDK のコマンドラインを使います。

## 記録する内容 { #what-to-record }

CodeKit を使う各プロジェクトについて、次の情報を記録します。

- CodeKit 拡張機能のバージョン。
- SiFli-SDK のパスと SDK ブランチ。
- CodeKit で選択したボード。
- 対応する SDK のボード名。
- ビルド出力ディレクトリ。
- Flash 書き込み／ダウンロードの動作。
- シリアルモニターのボーレート。

これらの情報があれば、必要に応じて GUI 操作をコマンドラインから再現できます。

## 障害の切り分け { #failure-boundaries }

<div align="center"><em>表: トラブルシューティングの方針</em></div>

<div align="center" markdown>

| 障害 | 次に行うこと |
|:-----|:-------------|
| SDK が見つからない | SDK ルートを選び直し、SDK のインストールが完了していることを確認する。 |
| ビルドに失敗する | 可能であれば、同じプロジェクトを `scons` でビルドして再現する。 |
| 初回起動の基準構成は動作するが Flash 書き込みに失敗する | プロジェクトのボード／出力を正常動作した基準構成と比較し、ポートの占有状態とダウンロードモードを確認する。 |
| モニターに文字化けが出る | ボーレートと選択したポートを確認する。 |
| UI のコマンドが見つからない | コマンドパレットを開き、`SiFli` を検索する。 |

</div>
