---
icon: lucide/code-2
title: "開発の概要"
description: "SiFli-SDKを使ってSF32製品を開発するための実務ガイドです。日々の開発フロー、アプリケーションノート、サンプル、ツール、ファームウェアのトピック、コミュニティの選択肢を案内します。"
tags:
    - 開発
    - ソフトウェア
---

# 開発の概要 { #develop }

このセクションでは、動作確認済みのSF32ボードから、保守しやすい製品ファームウェアを作るための情報をまとめています。最初の`hello_world`が動作した後、ボード設定の選択、再現可能なビルドと書き込み、適切なサンプルの活用、製品機能の統合、障害診断、更新と復旧の計画に進む際に利用してください。

初回のボード起動には[SF32開発の始め方](../getting-started/index.md)、デバイスや開発ボードの選定には[SF32製品](../sf32-products/index.md)、回路図や量産向けハードウェアには[ハードウェア](../hardware/index.md)、アーキテクチャの背景には[学習の概要](../learn/index.md)を参照してください。このセクションでは、開発ワークフローと具体的な実装タスクに関する情報を扱います。

!!! info "SiFli-Solution"
    SiFli-SolutionはSiFliが提供する別のソフトウェアパッケージで、μForge.ioでは現時点で解説していません。ここで扱うのはSiFli-SDKと、以下に示すコミュニティ開発環境です。より包括的なディスプレイ機器向けソリューションが必要な場合は、SiFli公式の[SiFli Solutionドキュメント](https://docs.sifli.com/projects/solution/index.html)を参照し、SiFliに直接相談してください。この開発環境を使う複雑な製品では、SiFliが開発に直接深く関与する必要がある場合もあります。

## SiFli-SDKの基準構成を確立する { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) は、RT-ThreadをベースにしたSiFli公式ソフトウェアパッケージであり、SF32ファームウェア開発の基準となる開発環境です。別の開発環境を評価する明確な理由がなければ、まずSiFli-SDKを使ってください。ボードサポート、Bluetooth、グラフィックス、オーディオ、ストレージ、電源管理、量産開発について、最も幅広い基準構成のドキュメントが整備されています。

製品機能の開発に入る前に、再現可能な基準構成を確立して記録します。

1. [ボード設定](platforms/sifli-sdk/board-configuration.md)で、使用するSDKボード設定を正確に選びます。
2. [ビルド、書き込み、モニター](platforms/sifli-sdk/build-flash-monitor.md)の手順を一通り実行し、正常に動作することを確認します。
3. SDKのリリースまたはコミット、ボード名、ビルド／書き込みコマンド、シリアル設定、起動ログを保存します。
4. [サンプル](examples/index.md)から最も近いものを選びます。特に、製品で最も難しいサブシステムをすでに動かしているサンプルを優先してください。

こうして記録した基準構成は、その後のアプリケーション変更、ボード移植、テスト失敗、フィールドでの復旧を評価するための基準になります。

## タスクから必要な情報を探す { #find-guidance-by-task }

<div align="center"><em>表: SF32開発タスク</em></div>

<div align="center" markdown>

| タスク | まず参照するページ | 次に参照する情報 |
|:----------------|:-----------|:---------|
| ファームウェアをビルド／書き込みし、シリアル出力を確認する | [ビルド、書き込み、モニター](platforms/sifli-sdk/build-flash-monitor.md) | スクリプトによる書き込み、トレース、クラッシュ解析ツールは[ツール](tools/index.md)を参照します。 |
| ファームウェアを開発ボード、モジュール、またはカスタム基板に合わせる | [ボード設定](platforms/sifli-sdk/board-configuration.md) | 対象ハードウェアの設計ガイドと、最も近いボード用サンプルを参照します。 |
| 複数プロジェクトでドライバーやミドルウェアを再利用する | [コンポーネントと`sf_pkg`](platforms/sifli-sdk/components.md) | 最小構成のサンプルと、設定可能な範囲が明記された資料を確認します。 |
| 具体的な周辺機能やサブシステムを実装する | [SDKアプリケーションノート](platforms/sifli-sdk/sdk-application-notes.md) | 正確なAPI、設定シンボル、コマンドは、リンク先の公式SDKガイドで確認します。 |
| 動作するコードを起点に製品開発を始める | [サンプル](examples/index.md) | 対象のボード設定を確認し、変更のたびにテストします。 |
| 障害を診断する、または製品の検証データを収集する | [デバッグと診断](platforms/sifli-sdk/debugging-diagnostics.md) | [ログとクラッシュ解析](firmware-topics/logging-crash-analysis.md)も参照します。 |
| 起動時の配置、ストレージ、更新、USB、電源の動作を変更する | [ファームウェアのトピック](firmware-topics/index.md) | コードを変更する前に、関連するパーティション、更新、USB、電源、ログの各トピックを確認します。 |

</div>

## SiFli-SDKアプリケーションノート { #sifli-sdk-application-notes }

アプリケーションノートはSDKのカタログ順ではなく、実装タスクごとにまとめています。まず対象のサブシステムに関するページを確認してください。設定やコマンドを流用する前に、対象チップファミリー、ボード設定、SDKリリース、ハードウェア要件を必ず確認します。

<div align="center"><em>表: SiFli-SDKアプリケーションノート</em></div>

<div align="center" markdown>

| 開発分野 | 参照するアプリケーションノート |
|:-----------------|:--------------------------------|
| アナログ入力とセンサー | [GPADCでサンプリングする](platforms/sifli-sdk/application-notes/adc-sampling.md) · [センサーの統合と読み出し](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| ストレージとグラフィックス素材 | [外付けFlashメモリーの使い方](platforms/sifli-sdk/application-notes/external-flash.md) · [EZIPを使った画像アセットの圧縮](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| 信頼性、消費電力、デバッグ | [ウォッチドッグの設定](platforms/sifli-sdk/application-notes/watchdog.md) · [低消費電力の設定と測定](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [ログの取得とクラッシュ解析](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| RFとBluetoothの検証 | [SiFli SDKでのRF試験](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Bluetoothシグナリング試験の実施](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Bluetoothの項目別RF試験の実施](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## 開発セクションの構成 { #navigate-the-develop-section }

<div align="center"><em>表: 開発セクションの構成</em></div>

<div align="center" markdown>

| 項目 | 目的 |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | 設定、ビルド、書き込み、再利用可能なコンポーネント、診断など、サポート対象の標準的な開発フローを確立します。 |
| [SDKアプリケーションノート](platforms/sifli-sdk/sdk-application-notes.md) | ADC、センサー、外部Flash、低消費電力、診断、RF、Bluetooth試験など、特定のタスクにSDKを適用します。 |
| [サンプル](examples/index.md) | 対象ボードと、製品で最も難しいサブシステムに合う実装を選び、活用します。 |
| [ツール](tools/index.md) | 開発フローに必要な書き込み、モニター、トレース、クラッシュ解析、素材管理、量産向けツールを選びます。 |
| [ファームウェアのトピック](firmware-topics/index.md) | パーティション、OTA/DFU、USB、電源管理、診断データなど、製品全体に関わる判断を支援します。 |
| [実験的／コミュニティ開発環境](platforms/zephyr/overview.md) | 各ページに記載された適用範囲と成熟度を確認し、Zephyr、Arduino、MicroPython、Rustを評価します。 |

</div>

## コミュニティ開発環境を慎重に評価する { #evaluate-community-paths-deliberately }

[実験的／コミュニティ開発環境](platforms/zephyr/overview.md)は、基準となるSDK以外の環境を使う理由があるチーム向けです。SiFli-SDKと同等の製品サポートがあることを意味するものではありません。

<div align="center"><em>表: コミュニティ開発環境の適合性</em></div>

<div align="center" markdown>

| 開発環境 | 検討する条件 | 位置付け |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Zephyr API、devicetree、Kconfig、または下流でのボード対応が必要な場合。 | 下流側でボードごとに評価する開発環境です。 |
| [Arduino](platforms/arduino/overview.md) | 対応ボードでスケッチを使う場合や、周辺機能を手早く試作する場合。 | ベータ版の、対象ボードに限定された開発環境です。 |
| [MicroPython](platforms/micropython/status.md) | 今後のスクリプト対応を評価する場合。 | 再現可能な公開ポートが用意されるまでは、状況を示すページです。 |
| [Rust](platforms/rust/overview.md) | HAL/PACの開発を評価し、上流への修正提案に協力できる場合。 | コミュニティ主導で開発中の環境です。 |

</div>

これらの開発環境を製品に採用する前に、対象ボードで必要な周辺機能、Flashの構成、デバッグ方法、復旧手順をすべて検証してください。使用したリビジョン、設定、コマンド、結果は製品のソースコードとともに保管します。

## 製品開発に必要な検証記録 { #product-ready-development-evidence }

ファームウェアを製品向けとして扱う前に、次の質問に答えられることを確認してください。

- どのチップ、ボードまたはカスタム基板のリビジョン、設定で検証しましたか？
- どのSDK、パッケージ、ブランチ、コミットからファームウェアをビルドしましたか？
- ビルド、書き込み、モニター、完全復旧に必要なコマンドは検証済みですか？
- 必要な周辺機能や製品サブシステムは、どのサンプルまたは試験で確認しましたか？
- パーティション構成、更新動作、消費電力目標、クラッシュ情報のデコード手順を検証しましたか？

確認できない項目が残っている場合、その開発成果は有用なプロトタイプではあっても、再現可能な製品の基準構成にはまだ達していません。
