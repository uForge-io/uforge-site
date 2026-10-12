---
icon: lucide/wrench
description: "SF32開発に使うツールを用途別に案内します。sftool、SDKのUART書き込みスクリプト、CodeKit、クラッシュ／トレース解析、アセット／量産ツールを紹介します。"
tags:
    - 開発
    - ツール
---

# ツール { #tools }

SF32の開発では、コンパイラーだけでなく、ファームウェアの書き込み、シリアルモニター、クラッシュ解析、トレース取得、画像変換、RF／オーディオ調整、量産時の書き込みに使うツールも必要です。

下表では、一般的な開発作業と関連ツールを対応付けています。各ツールのマニュアルを置き換えるものではありません。インストール方法、コマンド、ツール固有の手順はリンク先を参照してください。

## ツール一覧 { #tool-map }

<div align="center"><em>表: ツール一覧</em></div>

<div align="center" markdown>

| ツール | 用途 |
|:-------|:-----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | OpenSiFliのZephyr／Arduinoフローで使われる、SF32向けのクロスプラットフォーム書き込みツール。 |
| [SDKのUART書き込みスクリプト](../platforms/sifli-sdk/build-flash-monitor.md) | SiFli-SDKのビルドで生成される初回書き込み用スクリプト。 |
| [CodeKitの操作](codekit.md) | VS Codeでの設定、ビルド、書き込み、モニター操作。 |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | クラッシュ時のメモリーデータを取得し、後から解析する。 |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | トレース／ログの取得、およびUART経由でチップのDebug IPを利用したデバッグ。 |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | 量産ライン向けファームウェア書き込み、校正、PCBAテスト。 |
| [eZip／画像ツール](../../learn/graphics/ezip.md) | 圧縮グラフィックスのパイプライン向けアセット変換。 |
| [RF／オーディオ／工場用ツール](https://docs.sifli.com/projects/solution/6.tools/index.html) | 量産時の校正、試験、調整のワークフロー。 |

</div>

## 書き込みツール { #flashing-tools }

最初の立ち上げでは、直前のビルドによって生成されたSDKのUARTスクリプトを使ってください。次の用途がある場合は`sftool`を追加します。

- ワークフローをまたいで一貫したコマンドライン書き込みツールを使う。
- Zephyrの`west flash`と連携する。
- ArduinoCore-zephyrのアップロード動作を使う。
- CI、工場、回帰試験で自動化する。

チームで一方の経路に標準化するまでは、両方の手順をプロジェクトに記録してください。

## ログとトレースのツール { #logging-and-trace-tools }

通常の開発であればシリアルターミナルで足ります。重大な障害では、構造化ログとクラッシュデータを取得してください。

- リセットからの起動ログ全体を保存する。
- 書き込みイメージと一致するELF／map／シンボルファイルを保存する。
- RT-Thread shell、Zephyr shell、Arduinoデバッグモードのどれを使用したか記録する。
- assertダンプやトレースを利用できる場合はSiFliの診断ツールを使う。

## アセットと量産のツール { #asset-and-production-tools }

グラフィックス表示を多用する製品では、特にeZip圧縮やハードウェアアクセラレーション付きグラフィックスを使う場合、アセット変換の手順を文書化してください。量産を見据えた製品では、工場作業者が開発専用コマンドに依存しないよう、RF／オーディオ／工場用ツールの手順を開発者向けの書き込みツールとは分けて記載します。

## ツール選択チェックリスト { #tool-selection-checklist }

<div align="center"><em>表: ツール選択チェックリスト</em></div>

<div align="center" markdown>

| 必要な作業 | 推奨するツール |
|:-----------|:---------------|
| SDKでの初回ファームウェア書き込み | SDKのUART書き込みスクリプト。 |
| クロスプラットフォームのスクリプト書き込み | `sftool`。 |
| VS Codeでビルドとモニターを行う | CodeKit。 |
| 起動後のクラッシュ | シリアルログとassertダンプ解析ツール。 |
| 長時間のトレース取得 | トレース／UARTサーバーツール。 |
| ディスプレイアセットのパイプライン | eZip／画像ツール。 |
| 工場での書き込み | SiFliの量産／工場用ツールと管理された手順。 |

</div>

## 実務上のアドバイス { #practical-advice }

- 2つ目の書き込み経路を追加する前に、信頼できる経路を1つ習得する。
- ボードごとに正常動作が確認されたシリアルログを保存する。
- 初回の立ち上げにはSDKが生成するスクリプトを使う。
- Zephyr、Arduino、自動化をまたいで再現可能なコマンドライン書き込みが必要な場合は`sftool`を使う。
- 再現が難しい不具合が発生する前に、クラッシュ解析ツールを導入する。
