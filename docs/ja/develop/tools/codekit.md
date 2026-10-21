---
icon: lucide/app-window
description: "SiFli CodeKitのVS Code拡張機能がSiFli-SDK開発で果たす役割を説明します。プロジェクト設定、ビルド／書き込み／モニターの流れ、トラブルシューティングを扱います。"
tags:
    - 開発
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKitは、SiFli-SDK開発用のVS Code拡張機能です。SDKのセットアップ、プロジェクト作成、設定、ビルド、Flash書き込み、モニターの各作業を支援します。

初回の使用については[SiFli CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md)を参照してください。このページでは、CodeKitを開発ワークフローの中でどう使うかを説明します。

主な参照先:

- [SiFli CodeKitのスタートガイド](https://docs.sifli.com/projects/codekit/get-started/)

## CodeKitが適する場面 { #best-use-cases }

次のような場合にCodeKitを使います。

- VS Codeを中心としたSDKワークフロー。
- ガイドに沿ったプロジェクト設定。
- エディター上でのボード／プロジェクト設定。
- すべてのコマンドを覚えなくても行えるビルド／書き込み／モニター操作。
- SiFli-SDKを使い始めた開発者にとって、よりスムーズな導入。

CIスクリプトを作成する場合、ツールチェーンのパスを調査する場合、工場用／リリース手順を準備する場合は、SDKのコマンドライン経路を使ってください。CodeKitは開発者の生産性を高める層であり、SDKビルドの理解に代わるものではありません。

## SiFli-SDKとの関係 { #relationship-to-sifli-sdk }

CodeKitはSDKのワークフローを操作するためのもので、SDK自体を置き換えるものではありません。基盤となる次の要素は変わりません。

- SDKルート。
- ボード名。
- プロジェクトディレクトリ。
- ビルド出力。
- 書き込み／ダウンロード経路。
- シリアルモニター。

CodeKitの操作が失敗した場合は、可能であれば対応するSDKコマンドを実行して再現してください。拡張機能側の問題とSDK側の問題を切り分けやすくなり、バグ報告も明確になります。

サポート対象の基準構成の選定には [SiFli-SDK](../platforms/sifli-sdk/overview.md)を、同等のコマンドライン作業の証跡を残すには[ビルド、書き込み、シリアル出力の確認](../platforms/sifli-sdk/build-flash-monitor.md)を使います。CodeKitプロジェクトを変更する前に、対応する[SDKサンプル](../examples/index.md)から始めてください。

## 運用モデル { #operational-model }

CodeKitのエディター操作は、基盤となるSDKから再現できる状態にしておくと最も有用です。拡張機能は操作画面、SiFli-SDKはツールチェーン、ボード定義、ビルド出力、ダウンロード成果物の正式な基準として扱います。

[SiFli CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md)では、拡張機能のインストールと`hello_world`の実行を説明しています。この基準構成が動作したら、CodeKitで編集・ビルド・書き込み・モニターの反復を短縮してください。操作を自動化、調査、またはVS Code外で再現する必要がある場合は、SDKのコマンドラインを使います。

## 記録する内容 { #what-to-record }

CodeKitを使う各プロジェクトについて、次の情報を記録します。

- CodeKit拡張機能のバージョン。
- SiFli-SDKのパスとSDKブランチ。
- CodeKitで選択したボード。
- 対応するSDKのボード名。
- ビルド出力ディレクトリ。
- Flash書き込み／ダウンロードの動作。
- シリアルモニターのボーレート。

これらの情報があれば、必要に応じてGUI操作をコマンドラインから再現できます。

## 障害の切り分け { #failure-boundaries }

<div align="center"><em>表: トラブルシューティングの方針</em></div>

<div align="center" markdown>

| 障害 | 次に行うこと |
|:-----|:-------------|
| SDKが見つからない | SDKルートを選び直し、SDKのインストールが完了していることを確認する。 |
| ビルドに失敗する | 可能であれば、同じプロジェクトを`scons`でビルドして再現する。 |
| 初回起動の基準構成は動作するがFlash書き込みに失敗する | プロジェクトのボード／出力を正常動作した基準構成と比較し、ポートの占有状態とダウンロードモードを確認する。 |
| モニターに文字化けが出る | ボーレートと選択したポートを確認する。 |
| UIのコマンドが見つからない | コマンドパレットを開き、`SiFli`を検索する。 |

</div>
