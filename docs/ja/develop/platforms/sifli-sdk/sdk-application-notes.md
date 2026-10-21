---
icon: lucide/notebook-tabs
title: SDKアプリケーションノート
description: "SF32開発に役立つSiFli-SDK利用ガイドを作業別に紹介し、各公式資料へのリンクを示します。"
tags:
    - 開発
    - SiFli-SDK
    - アプリケーションノート
---

# SDKアプリケーションノート { #sdk-application-notes }

このページでは、SiFli-SDKの使用ガイドを開発タスクごとに整理しています。必要な手順をすぐに見つけ、開発記録として残しておくべき検証結果も確認できます。

各記事では、実務での使い方と統合時の要点を案内しますが、SDKマニュアルの代わりにはなりません。設定、API、サンプル、試験手順を適用する前に、公式の [SiFli-SDK使用ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html)で対象チップシリーズとSDKリリースを選択してください。

## 作業から探す { #read-by-task }

<div align="center"><em>表: SDKアプリケーションノートの読み進め方</em></div>

<div align="center" markdown>

| 作業 | 次の目的がある場合に参照 | 公式利用ガイドのトピック |
|:-----|:-------------------------|:-------------------------|
| [GPADCでサンプリングする](application-notes/adc-sampling.md) | 汎用ADCによる測定経路を確立する。 | ADC使用ガイド（GPADC） |
| [センサーの統合と読み出し](application-notes/sensor-integration.md) | 外部センサーを接続し、動作を検証する。 | センサー追加ガイド |
| [外付けFlashメモリーの使い方](application-notes/external-flash.md) | データ、アセット、ファイルシステムをFlashに保存する。 | Flash使用ガイド |
| [ウォッチドッグの設定](application-notes/watchdog.md) | ウォッチドッグによる復旧経路を検証する。 | Watchdog使用ガイド |
| [EZIPを使った画像アセットの圧縮](application-notes/ezip-image-assets.md) | EZIP画像リソースを変換して組み込む。 | EZIP画像変換ツール使用ガイド |
| [低消費電力の設定と測定](application-notes/low-power-measurement.md) | 低消費電力状態を設定し、測定値を比較する。 | 低消費電力開発ガイド |
| [ログの取得とクラッシュ解析](application-notes/crash-analysis.md) | 対応するログ、クラッシュ時の情報、シンボルを保全する。 | クラッシュ解析ガイド、デバッグとログ記録 |
| [SiFli SDKでのRF試験](application-notes/rf-performance-tests.md) | シグナリング、非シグナリング、個別項目ごとのRF検証から選ぶ。 | SiFli SDK RF試験ガイド |
| [Bluetoothシグナリング試験の実施](application-notes/bluetooth-signalling-tests.md) | プロトコルに基づくBluetooth検証を行う。 | Bluetoothシグナリング試験ガイド |
| [Bluetoothの項目別RF試験の実施](application-notes/bluetooth-single-tone-tests.md) | 公式手順に沿ってBluetoothのRF試験項目を個別に実施する。 | Bluetooth個別RF試験ガイド |

</div>

## これらの記事の使い方 { #how-to-use-these-articles }

1. 直ちに取り組む作業のタイトルに合うページから始めます。
2. サンプルやコマンドを変更する前に、記載されているプロジェクト、ボード、リリース、設定、ハードウェアの前提条件をそろえます。
3. 正確なパス、設定シンボル、コマンド、API、ツールのリビジョンは、リンク先のSDKソースで確認します。
4. 検証したボード、SDKリリース、設定ファイル、試験機器、観測結果をプロジェクトの検証記録として残します。

複数プラットフォームにまたがるアーキテクチャ上の判断については[ファームウェアのトピック](../../firmware-topics/index.md)を参照してください。SDKとコミュニティ各経路で利用できるサンプルの基準構成については[サンプル](../../examples/index.md)を参照します。
