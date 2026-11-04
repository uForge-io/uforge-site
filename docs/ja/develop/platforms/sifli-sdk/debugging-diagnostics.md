---
icon: lucide/bug
description: "sftool、AssertDump、SiFli_Trace、RT-Threadシェルを使ったSF32ファームウェアのデバッグ手順と、再現の進め方、クラッシュレポートのチェックリストを説明します。"
tags:
    - 開発
    - デバッグ
---

# デバッグと診断 { #debugging-and-diagnostics }

SF32のデバッグはシリアルログから始めます。チップ、SDKリリース、プロジェクト設定によっては、クラッシュダンプ、トレース取得、RT-Threadシェルも利用できます。対象向けに文書化された手順だけを使用してください。

## 最初に行う確認 { #first-line-debugging }

シリアルコンソールから次の情報を取得します。

- 起動ログ。
- アプリケーションの出力。
- RT-Threadシェルの出力（プロジェクトで有効な場合）。
- 異常メッセージ。
- assert／クラッシュ出力（取得できる場合は、報告されたファイル名と行番号、最初の障害地点のPC、スタック情報も保存します）。
- ダウンロードとリセットの動作。

ログには、ボードリビジョン、SDKブランチ、ビルドコマンド、書き込みコマンド、シリアル設定を添えて保管してください。

## デバッグの順序 { #debugging-order }

1. 同じファームウェアで現象を再現します。
2. リセット後に再現するか確認します。
3. ファームウェア全体を書き込み直した後に再現するか確認します。
4. 最も近いSDKサンプルで再現するか確認します。
5. 製品固有の変更を1つずつ戻して追加します。

この順序により、ハードウェア、ボードサポート、ミドルウェア、アプリケーションの問題を切り分けやすくなります。

## 知っておきたいツール { #tools-to-know }

<div align="center"><em>表: 知っておきたいツール</em></div>

<div align="center" markdown>

| ツール | 用途 |
|:-------|:-----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | 対応するチップ／ストレージ向けに、Flashの読み書き・消去やリセットを行うシリアルCLIです。利用できるオプションはチップとストレージの種類によって異なります。 |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | 対象でサポートされる手順に従ってボードのログを取得・確認します。 |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | 内蔵Debug IPをUART経由でデバッグするための補助ツールです。[v2.5.1ガイド](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html)ではSF32LB52XとSF32LB56Xを記載し、新しい英語ガイドでは`SF322LB57`にも言及しています。すべての対象が対応するとは限らないため、チップとSDKの組み合わせを確認してください。 |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html)と[クラッシュ解析ツール](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | 対象チップとSDKリリースで提供される場合のみ使用し、その版の取得・解析手順に従います。 |
| RT-Threadシェル | プロジェクト設定で有効な場合に限り、実行時の確認やコマンド実行に使用できます。 |

</div>

## 最初に確認する項目 { #what-to-inspect-first }

<div align="center"><em>表: 最初に確認する項目</em></div>

<div align="center" markdown>

| 症状 | 最初に確認する項目 |
|:-----|:-------------------|
| HardFaultまたはアサーション | スタックサイズ、nullポインター、DMAバッファー、キャッシュのメンテナンス。 |
| 周辺機器が応答しない | ピン多重化、クロック、電源レール、ボード名、ドライバーの有効化。 |
| Bluetoothが不安定 | RFクロック、アンテナ経路、Bluetoothスタックの設定、接続パラメーター。 |
| ディスプレイに表示乱れがある | パネルのタイミング、バッファー形式、キャッシュ／DMA同期。 |
| ランダムにリセットする | ウォッチドッグ、電源レール、電圧低下（ブラウンアウト）、スタックオーバーフロー。 |
| HCPU/LCPUのログが出ない | UART割り当て、`ulog`、pinmux、LCPUの起動を確認します。 |

</div>

SiFli WikiのLB551例では、HCPUがUART1、LCPUがPB45/PB46上のUART3を使います。HCPUがUART3も使用していないことを確認し、`pinmux.c`でQSPI3とUART1のピン多重化の競合を調べ、LCPUの起動も確認してください。例によっては`lcpu on`または`lcpu_power_on()`が必要です。

## クラッシュレポートのチェックリスト { #crash-report-checklist }

クラッシュを報告する際は、次の情報を含めてください。

- ボードとリビジョン。
- チップのバリアント。
- SDKブランチまたはコミット。
- 対象のサンプルまたはプロジェクト。
- ビルドコマンドとボード名。
- Flash書き込みコマンド。
- リセット直後からのシリアル起動ログ。
- クラッシュダンプまたはアサーション出力。
- 変更していないSDKサンプルでも問題を再現するかどうか。

## 公式資料 { #official-sources }

- [SiFli-SDK: デバッグとログ](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK: クラッシュ解析ガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki: ログデバッグ（中国語）](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki: メモリダンプによるクラッシュ現場の復元（中国語）](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
