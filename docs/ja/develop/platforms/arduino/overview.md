---
icon: lucide/infinity
description: "SF32LB52 DevKit LCD向けArduinoCore-zephyrの適合性、ボード情報、ローダーとビルドモード、統合上の制約、問題の切り分け方法を説明します。"
tags:
    - 開発
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) は、SF32向けのZephyrベースArduinoコアです。**SiFli SF32LB52 DevKit LCD** でスケッチを実行するほか、周辺機器の実験、デモ、初期プロトタイプを作るのに適しています。

!!! warning "ベータ版コア"
    OpenSiFliはこのコアを **BETA** としています。機能、API、パッケージ内容、ローダーの動作、リリースは変更される場合があります。製品での採用を決める前に、プロジェクトのREADMEとReleasesで現行の動作を確認してください。

IDEの初期インストール、ボード／ポート選択、ブートローダーのインストール、Blinkの確認については、[Arduinoを始める](../../../getting-started/arduino/getting-started-arduino.md)を参照してください。このページでは、Arduinoが要件に合うかを判断し、初回起動後にArduinoベースのプロジェクトを維持する方法を説明します。

## Arduinoが適する場面 { #where-arduino-fits }

SF32固有機能をすべて使いこなすことより、素早い反復開発と使い慣れたスケッチ形式を重視するならArduinoを選びます。概念実証、簡単な周辺機器の検証、教育・デモ用途、既存Arduinoコードベースを持つチームに適しています。

製品で量産向けファームウェアの基準構成、Bluetoothスタックの調整、グラフィックス負荷の高いアプリケーション、低消費電力の最適化、ボードの立ち上げ、ベンダーミドルウェアが必要なら、[SiFli-SDK](../sifli-sdk/overview.md)に移行してください。devicetree、Kconfig、Zephyrネイティブのアプリケーション構成を直接制御する必要がある場合は、[Zephyr](../zephyr/overview.md)を使います。

<div align="center"><em>表: Arduinoプラットフォームの適合性</em></div>

<div align="center" markdown>

| Arduinoを選ぶ場面 | 別の開発経路を選ぶ場面 |
|:-------------------|:------------------------|
| 短いスケッチや周辺機器の迅速な実験。 | SF32の幅広い機能要件を検証済みの形で必要とする製品。 |
| Arduino IDEまたはArduino CLIで開発実績のあるチーム。 | 独自ボードの立ち上げ、Flash、電源、ミドルウェアの詳細制御。 |
| デモや、実現可能性を早い段階で検証するプロトタイプ。 | Zephyrネイティブの設定、ドライバー、RTOS構成。 |

</div>

## ボード情報 { #board-identity }

現在公開されているパッケージの対象はSF32LB52 DevKit LCDです。以下の値はスケッチのビルド、書き込み、ボードへの割り当てを決めるため、プロジェクト記録と問題報告に残してください。

<div align="center"><em>表: Arduinoボード情報</em></div>

<div align="center" markdown>

| 項目 | 値 |
|:-----|:------|
| Boards Managerの名称 | **SiFli Serial Boards** |
| Arduinoプラットフォーム | `sifli:sf32lb52` |
| ボード | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyrターゲット | `sf32lb52_devkit_lcd` |
| バリアント | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| 書き込みツール | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

名前が似ているSiFliまたはZephyrのボード識別子を、このFQBNの代わりに指定することはできません。ボード識別子によってビルドおよび書き込みのパラメーターが決まります。

## ビルドとローダーの仕組み { #build-and-loader-model }

ArduinoCore-zephyrは、スケッチ向けArduino APIとZephyrローダー、ボード固有設定を組み合わせています。2つのオプションメニューは単なるコンパイラーフラグではなく、起動やリンクの動作に影響します。

<div align="center"><em>表: ビルドとローダーの選択肢</em></div>

<div align="center" markdown>

| オプション | 動作 | 設計上の意味 |
|:-------|:---------|:------------------------|
| `Standard`ビルドモード | 読み込み後にスケッチを起動する。 | 通常のスケッチ実行に使う。 |
| `Debug`ビルドモード | Zephyrシェルが`sketch`コマンドを待つ。 | シェルを使ったデバッグ手順がある場合に限り有用。 |
| `Dynamic`リンクモード | 通常のローダー経由のフロー用にスケッチをパッケージ化する。 | 実行時とメモリーの予算にローダー分を含める必要がある。 |
| `Static`リンクモード | 静的リンクされたイメージを使う。 | ローダーの調査時、またはトレードオフを理解したうえで選ぶ。 |

</div>

まずは **Standard** と **Dynamic** を使ってください。Debugモードでは、アップロードしたスケッチはZephyrシェルで`sketch`を実行するまで始まりません。アップロードが成功したように見えるのにアプリケーションが動かない場合によくある原因です。

ローダーはボードごとに個別の成果物です。Burn Bootloaderは通常、初回使用、更新、復旧時に行う操作であり、毎回のスケッチ書き込みで必要になるものではありません。Arduinoパッケージのバージョンとローダーの更新履歴を併せて記録してください。前提が合わないと、後から原因を特定しにくくなります。

## 統合上の境界 { #integration-boundaries }

Arduinoコアは、基盤となるZephyrプラットフォームの置き換えではなく、統合レイヤーとして扱ってください。スケッチがZephyrのシンボルやサブシステムを必要としていても、ローダーから公開されていない、または有効化されていない場合があります。よくある症状は、Zephyrシンボルが未定義、サブシステムが見つからない、動的ロードやシェルによるメモリー不足です。

プロトタイプにライブラリーや機能を追加する前に、次の点を確認してください。

- 正確なパッケージバージョン、FQBN、ビルドモード、リンクモード
- 対象ボードのリビジョンと、シリアル書き込み／復旧の手順
- 必要な周辺機器またはライブラリーに対応する、試験済みのサンプル
- 想定するローダー設定での、測定可能なRAMとFlashの予算
- ArduinoローダーまたはSiFli-SDKファームウェアを使った復旧手段

Arduino APIがあることや、名前が似たZephyrドライバーが存在することだけで、ライブラリーに対応していると判断しないでください。対象ハードウェアでスケッチ、ローダー、ボード、パッケージの組み合わせ全体を検証します。

## 問題の切り分けとエスカレーション { #diagnose-and-escalate }

ボードを検出できない、書き込めない、Blinkが動かない場合は、まず初回起動ガイドに従います。その基準動作が確認できたら、以下を使って調査範囲を絞ります。

<div align="center"><em>表: Arduinoの問題と一次調査先</em></div>

<div align="center" markdown>

| 初回起動後に発生する症状 | 最初に確認すること |
|:-------------------------------------------|:--------------------|
| `sketch`を実行したときだけスケッチが起動する。 | Debugモードを意図して選択したか確認する。 |
| Zephyrの関数またはサブシステムが見つからない。 | コアのREADMEとローダーが公開する機能／設定を確認する。 |
| メモリーエラーまたは不安定動作。 | スケッチのメモリー予算を測定し、動的ロードとZephyrシェルの使用量を考慮する。復旧計画なしにStaticを選ばない。 |
| ライブラリーはコンパイルできるが、ハードウェアが動作しない。 | ボードのピンに関する前提を確認し、ボード固有の最小サンプルで試す。 |
| 書き込みまたは復旧に失敗する。 | 文書化されたArduinoの基準手順を再確認し、必要に応じてボードのSiFli-SDK復旧経路を使う。 |

</div>

問題を報告する際は、パッケージのバージョン、IDEまたはCLIのバージョン、OS、FQBN、ビルドモード、リンクモード、ボードリビジョン、書き込み時の全出力、シリアルログを含めてください。

## 関連ページ { #related-pages }

- [Arduinoを始める](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
