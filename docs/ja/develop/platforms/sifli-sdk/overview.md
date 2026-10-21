---
icon: lucide/package
description: "SF32ファームウェア開発の標準となるSiFli-SDKを紹介します。sconsによるビルドとsdk.py menuconfigの基本的な使い方、ボード名、プロジェクト構成、量産準備に関する確認事項を説明します。"
tags:
    - 開発
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDKは、SF32ファームウェア向けのSiFli公式開発SDKです。RT-Threadベースの開発環境を提供し、対応するターゲットではNo-OSのサンプルも利用できます。また、SiFliが保守するボードサポートとミドルウェアを備え、Bluetooth、グラフィックス、オーディオ、電源管理、ストレージ、量産ワークフローなどを扱います。利用できる機能は、チップ、ボード、SDKのリリースによって異なります。

!!! info "SiFli-Solution"
    SiFli-Solutionは別のSiFliソフトウェアパッケージで、このページの対象外です。このページとリンク先の開発資料ではSiFli-SDKのみを扱います。SiFli-Solutionの対象範囲、対応デバイス、利用条件については、SiFli公式の [SiFli Solutionドキュメント](https://docs.sifli.com/projects/solution/index.html)を参照し、SiFliに直接お問い合わせください。

初回インストールと`hello_world`については[SiFli-SDKを始める](../../../getting-started/sifli/getting-started-sifli-sdk.md)を参照してください。このページでは、ツールチェーンが動作した後のSDKの使い方を説明します。

主な参照先:

- [SiFli-SDKインストールガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [SF32LB52x SDK対応ボード一覧](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## SiFli-SDKを使う場面 { #when-to-use-sifli-sdk }

次の要件がある場合はSiFli-SDKを選択してください。

- 対象チップとSDKリリース向けに、SiFliが保守するボードサポートとサンプルを備えた、文書化された開発経路が必要。
- 選択したチップとリリースでサポートされるBluetooth、ディスプレイ、オーディオ、電源、ストレージ、USB、OTAのサンプルやミドルウェアが必要。
- RT-Threadとの統合およびシェルツールを使いたい。
- `sf32lb52-lcd_n16r8`など、SDKのボード名でボード設定を行いたい。
- SiFli固有のミドルウェア、ツール、パーティション配置、量産フローを使いたい。

## 開発モデル { #development-model }

[SiFli-SDKを始める](../../../getting-started/sifli/getting-started-sifli-sdk.md)でツールチェーンを準備し、`hello_world`が動作することを基準として確認します。その後は、SDKのリビジョン、選択したボード、サンプル／プロジェクトディレクトリ、設定、対応するビルド／書き込み成果物をまとめ、再現可能なビルド記録として管理してください。ボード名にコアの指定がない場合、HCPUの出力先は通常`build_<board_name>_hcpu/`になります。たとえば`sf32lb52-lcd_n16r8`の出力先は`build_sf32lb52-lcd_n16r8_hcpu/`です。解決されたボード／コアターゲットの実際の出力先を使い、ディレクトリ名を手作業で組み立てないでください。

開発手順を再現できるよう、SDKブランチを固定し、ボード名を記録し、ボード固有の変更をベンダー提供ファイルと分けて管理してください。設定変更は、小さくレビューしやすい単位で行います。ビルド、書き込み、シリアル出力確認の詳しい手順は[ビルド、書き込み、シリアル出力の確認](build-flash-monitor.md)を参照してください。

## ボード名 { #board-names }

SiFli-SDKのボード名はSDK固有であり、Zephyrのボード名、ArduinoのFQBN、製品のマーケティング名と一致しない場合があります。必ずSDKの対応ボード一覧またはサンプル資料からボード名をコピーしてください。

SF32LB52 DevKit LCDボードでは、入門用サンプルでよく使われるSDKボード名は次のとおりです。

```text
sf32lb52-lcd_n16r8
```

## プロジェクト構成 { #project-structure }

多くのSDKサンプルは次の構成に従います。

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

例:

```text
example/get-started/hello_world/rtt/project
```

製品ファームウェアを作るときは、最も近い動作確認済みSDKサンプルから始め、サブシステムを1つずつ変更してください。ボード設定、ミドルウェア依存関係、パーティションの前提条件、ドライバー設定を維持しやすくなります。

## 設定 { #configuration }

サンプルプロジェクトの機能設定を対象ボード向けに変更するには、SDKの`menuconfig`コマンドを使います。

```bash
sdk.py menuconfig --board=<board_name>
```

設定を開く主な理由:

- ミドルウェアを有効／無効にする。
- Bluetoothの役割またはプロファイルを変更する。
- ディスプレイ、ファイルシステム、オーディオの対応を調整する。
- 電源管理を調整する。
- ログまたはシェルの設定を選択する。

## 量産準備に関する確認事項 { #production-readiness-questions }

製品ブランチでSiFli-SDKを採用する前に、次の質問に答えてください。

- 製品で固定するSDKリリースブランチはどれか。
- ボードサポートファイルのうち、製品管理とベンダー管理の範囲はどこか。
- 重要機能の動作を確認できるサンプルはどれか。
- 製造時とOTAで使用するパーティションテーブルはどれか。
- 工場書き込みに承認されたツールはどれか。
- リリースビルドで有効にするログはどれか。
- ラボ用に保持する復旧イメージはどれか。

## 次に読むページ { #practical-next-pages }

- [ビルド、書き込み、シリアル出力の確認](build-flash-monitor.md)
- [ボード設定](board-configuration.md)
- [コンポーネントと`sf-pkg`](components.md)
- [サンプル](../../examples/index.md) — サブシステムを変更する前に、用途に最も近い動作確認済みの基準構成を選びます。
- [CodeKit](../../tools/codekit.md) — 必要に応じてVS Codeのワークフローを使い、SDKのボード名とビルド記録はプロジェクト内で一貫して管理してください。
- [SDKアプリケーションノート](sdk-application-notes.md)
- [パーティションテーブル](../../firmware-topics/partition-tables.md)
- [デバッグと診断](debugging-diagnostics.md)
