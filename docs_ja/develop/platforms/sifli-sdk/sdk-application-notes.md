---
icon: lucide/notebook-tabs
title: SDK アプリケーションノート
description: "SF32 開発に役立つ SiFli-SDK 利用ガイドを作業別に紹介し、各公式資料へのリンクを示します。"
tags:
    - 開発
    - SiFli-SDK
    - アプリケーションノート
---

# SDK アプリケーションノート { #sdk-application-notes }

このページでは、SiFli-SDK の使用ガイドを開発タスクごとに整理しています。必要な手順をすぐに見つけ、開発記録として残しておくべき検証結果も確認できます。

各記事では、実務での使い方と統合時の要点を案内しますが、SDK マニュアルの代わりにはなりません。設定、API、サンプル、試験手順を適用する前に、公式の [SiFli-SDK 使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html)で対象チップシリーズと SDK リリースを選択してください。

## 作業から探す { #read-by-task }

<div align="center"><em>表: SDK アプリケーションノートの読み進め方</em></div>

<div align="center" markdown>

| 作業 | 次の目的がある場合に参照 | 公式利用ガイドのトピック |
|:-----|:-------------------------|:-------------------------|
| [GPADC でサンプリングする](application-notes/adc-sampling.md) | 汎用 ADC による測定経路を確立する。 | ADC 使用ガイド（GPADC） |
| [センサーの統合と読み出し](application-notes/sensor-integration.md) | 外部センサーを接続し、動作を検証する。 | センサー追加ガイド |
| [外付け Flash メモリーの使い方](application-notes/external-flash.md) | データ、アセット、ファイルシステムを Flash に保存する。 | Flash 使用ガイド |
| [ウォッチドッグの設定](application-notes/watchdog.md) | ウォッチドッグによる復旧経路を検証する。 | Watchdog 使用ガイド |
| [EZIP を使った画像アセットの圧縮](application-notes/ezip-image-assets.md) | EZIP 画像リソースを変換して組み込む。 | EZIP 画像変換ツール使用ガイド |
| [低消費電力の設定と測定](application-notes/low-power-measurement.md) | 低消費電力状態を設定し、測定値を比較する。 | 低消費電力開発ガイド |
| [ログの取得とクラッシュ解析](application-notes/crash-analysis.md) | 対応するログ、クラッシュ時の情報、シンボルを保全する。 | クラッシュ解析ガイド、デバッグとログ記録 |
| [SiFli SDK での RF 試験](application-notes/rf-performance-tests.md) | シグナリング、非シグナリング、個別項目ごとの RF 検証から選ぶ。 | SiFli SDK RF 試験ガイド |
| [Bluetooth シグナリング試験の実施](application-notes/bluetooth-signalling-tests.md) | プロトコルに基づく Bluetooth 検証を行う。 | Bluetooth シグナリング試験ガイド |
| [Bluetooth の項目別 RF 試験の実施](application-notes/bluetooth-single-tone-tests.md) | 公式手順に沿って Bluetooth の RF 試験項目を個別に実施する。 | Bluetooth 個別 RF 試験ガイド |

</div>

## これらの記事の使い方 { #how-to-use-these-articles }

1. 直ちに取り組む作業のタイトルに合うページから始めます。
2. サンプルやコマンドを変更する前に、記載されているプロジェクト、ボード、リリース、設定、ハードウェアの前提条件をそろえます。
3. 正確なパス、設定シンボル、コマンド、API、ツールのリビジョンは、リンク先の SDK ソースで確認します。
4. 検証したボード、SDK リリース、設定ファイル、試験機器、観測結果をプロジェクトの検証記録として残します。

複数プラットフォームにまたがるアーキテクチャ上の判断については[ファームウェアのトピック](../../firmware-topics/index.md)を参照してください。SDK とコミュニティ各経路で利用できるサンプルのベースラインについては[サンプル](../../examples/index.md)を参照します。
