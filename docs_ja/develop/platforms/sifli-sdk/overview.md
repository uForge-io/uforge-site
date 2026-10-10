---
icon: lucide/package
description: "SF32 ファームウェア開発の標準となる SiFli-SDK を紹介します。scons によるビルドと sdk.py menuconfig の基本的な使い方、ボード名、プロジェクト構成、量産準備に関する確認事項を説明します。"
tags:
    - 開発
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK は、SF32 ファームウェア向けの SiFli 公式開発 SDK です。RT-Thread ベースの開発環境を提供し、対応するターゲットでは No-OS のサンプルも利用できます。また、SiFli が保守するボードサポートとミドルウェアを備え、Bluetooth、グラフィックス、オーディオ、電源管理、ストレージ、量産ワークフローなどを扱います。利用できる機能は、チップ、ボード、SDK のリリースによって異なります。

!!! info "SiFli-Solution"
    SiFli-Solution は別の SiFli ソフトウェアパッケージで、このページの対象外です。このページとリンク先の開発資料では SiFli-SDK のみを扱います。SiFli-Solution の対象範囲、対応デバイス、利用条件については、SiFli 公式の [SiFli Solution ドキュメント](https://docs.sifli.com/projects/solution/index.html)を参照し、SiFli に直接お問い合わせください。

初回インストールと `hello_world` については[SiFli-SDK を始める](../../../getting-started/sifli/getting-started-sifli-sdk.md)を参照してください。このページでは、ツールチェーンが動作した後の SDK の使い方を説明します。

主な参照先:

- [SiFli-SDK インストールガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [SF32LB52x SDK 対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## SiFli-SDK を使う場面 { #when-to-use-sifli-sdk }

次の要件がある場合は SiFli-SDK を選択してください。

- 対象チップと SDK リリース向けに、SiFli が保守するボードサポートとサンプルを備えた、文書化された開発経路が必要。
- 選択したチップとリリースでサポートされる Bluetooth、ディスプレイ、オーディオ、電源、ストレージ、USB、OTA のサンプルやミドルウェアが必要。
- RT-Thread との統合およびシェルツールを使いたい。
- `sf32lb52-lcd_n16r8` など、SDK のボード名でボード設定を行いたい。
- SiFli 固有のミドルウェア、ツール、パーティション配置、量産フローを使いたい。

## 開発モデル { #development-model }

[SiFli-SDK を始める](../../../getting-started/sifli/getting-started-sifli-sdk.md)でツールチェーンを準備し、`hello_world` が動作することを基準として確認します。その後は、SDK のリビジョン、選択したボード、サンプル／プロジェクトディレクトリ、設定、対応するビルド／書き込み成果物をまとめ、再現可能なビルド記録として管理してください。ボード名にコアの指定がない場合、HCPU の出力先は通常 `build_<board_name>_hcpu/` になります。たとえば `sf32lb52-lcd_n16r8` の出力先は `build_sf32lb52-lcd_n16r8_hcpu/` です。解決されたボード／コアターゲットの実際の出力先を使い、ディレクトリ名を手作業で組み立てないでください。

開発手順を再現できるよう、SDK ブランチを固定し、ボード名を記録し、ボード固有の変更をベンダー提供ファイルと分けて管理してください。設定変更は、小さくレビューしやすい単位で行います。ビルド、書き込み、シリアル出力確認の詳しい手順は[ビルド、書き込み、シリアル出力の確認](build-flash-monitor.md)を参照してください。

## ボード名 { #board-names }

SiFli-SDK のボード名は SDK 固有であり、Zephyr のボード名、Arduino の FQBN、製品のマーケティング名と一致しない場合があります。必ず SDK の対応ボード一覧またはサンプル資料からボード名をコピーしてください。

SF32LB52 DevKit LCD ボードでは、入門用サンプルでよく使われる SDK ボード名は次のとおりです。

```text
sf32lb52-lcd_n16r8
```

## プロジェクト構成 { #project-structure }

多くの SDK サンプルは次の構成に従います。

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

例:

```text
example/get-started/hello_world/rtt/project
```

製品ファームウェアを作るときは、最も近い動作確認済み SDK サンプルから始め、サブシステムを 1 つずつ変更してください。ボード設定、ミドルウェア依存関係、パーティションの前提条件、ドライバー設定を維持しやすくなります。

## 設定 { #configuration }

サンプルプロジェクトの機能設定を対象ボード向けに変更するには、SDK の `menuconfig` コマンドを使います。

```bash
sdk.py menuconfig --board=<board_name>
```

設定を開く主な理由:

- ミドルウェアを有効／無効にする。
- Bluetooth の役割またはプロファイルを変更する。
- ディスプレイ、ファイルシステム、オーディオの対応を調整する。
- 電源管理を調整する。
- ログまたはシェルの設定を選択する。

## 量産準備に関する確認事項 { #production-readiness-questions }

製品ブランチで SiFli-SDK を採用する前に、次の質問に答えてください。

- 製品で固定する SDK リリースブランチはどれか。
- ボードサポートファイルのうち、製品管理とベンダー管理の範囲はどこか。
- 重要機能の動作を確認できるサンプルはどれか。
- 製造時と OTA で使用するパーティションテーブルはどれか。
- 工場書き込みに承認されたツールはどれか。
- リリースビルドで有効にするログはどれか。
- ラボ用に保持する復旧イメージはどれか。

## 次に読むページ { #practical-next-pages }

- [ビルド、書き込み、シリアル出力の確認](build-flash-monitor.md)
- [ボード設定](board-configuration.md)
- [コンポーネントと `sf-pkg`](components.md)
- [サンプル](../../examples/index.md) — サブシステムを変更する前に、用途に最も近い動作確認済みの基準構成を選びます。
- [CodeKit](../../tools/codekit.md) — 必要に応じて VS Code のワークフローを使い、SDK のボード名とビルド記録はプロジェクト内で一貫して管理してください。
- [SDK アプリケーションノート](sdk-application-notes.md)
- [パーティションテーブル](../../firmware-topics/partition-tables.md)
- [デバッグと診断](debugging-diagnostics.md)
