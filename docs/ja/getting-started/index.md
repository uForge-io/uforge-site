---
icon: lucide/rocket
title: "SF32開発の始め方"
description: "SF32で開発を始める方法：SiFli-SDK、CodeKit、Zephyr、Arduino、Rust、MicroPythonの現状と、各環境で必要なハードウェア。"
tags:
    - はじめに
    - SF32
---

# SF32開発の始め方 { #getting-started }

SF32デバイスでは、複数のソフトウェア開発環境を利用できます。現時点で、初回の環境構築と動作確認にはSiFli-SDKとCodeKitが公式ルートとして案内されています。Zephyr v4.3.0以降、SF32LB52 DevKit LCDはupstream Zephyrで継続的にメンテナンスされています。OpenSiFliはArduinoCore-zephyrのベータ版パッケージを公開しており、SF32LB52向けのRustサポートを開発中です。MicroPythonについては、公式ファームウェアイメージとボード別の手順が整うまでは、検証済みチュートリアルとして案内できません。

開発の標準ワークフローと各開発環境の対応範囲については、[開発の概要](../develop/index.md)を参照してください。以下の表は開始点を選ぶためのものです。対応ボードと制限事項の正式な情報は、各プラットフォームのページで確認してください。

## 開発環境を選ぶ { #choose-your-path }

<div align="center"><em>表: 開発環境の選び方</em></div>

<div align="center" markdown>

| 開発環境 | 現在の状況 | ここから開始 |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | SF32のリファレンス開発向けSiFli公式環境。RT-Thread、Bluetooth、グラフィックス、オーディオ、低消費電力機能、ボードの立ち上げを扱います。 | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | SDKのセットアップ、プロジェクト作成、ビルド、書き込み、シリアルモニターを行うSiFli公式のVS Code開発フロー。 | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | Zephyr v4.3.0以降、`sf32lb52_devkit_lcd`はupstreamでメンテナンスされています。 | [Zephyr upstream](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFliはSF32LB52 DevKit LCD向けにArduinoCore-zephyrのベータ版パッケージを公開しています。 | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | OpenSiFliの`sifli-rs`でRustを評価できますが、開発中のため量産用途には対応していません。 | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | 公式のファームウェアイメージ、書き込みコマンド、REPL設定、対応API詳細が必要です。 | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## 必要なもの { #what-you-need }

まず、選択したソフトウェア環境がサポートする開発ボードを用意してください。書き込み方法やシリアル接続は、ボードやフレームワークによって異なる場合があります。

- SF32開発ボード（例：[SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md)）。
- データ通信対応ケーブルと、ボードおよびフレームワークで指定された書き込み・シリアル接続。SF32LB52-DevKit-LCDでは、SiFliの[接続手順](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html)に従い、シリアル経由の書き込みにはUSB-to-UARTポートを使用します。専用USB機能ポートと混同しないでください。
- Windows、macOS、またはLinuxを実行するコンピューター。
- ブートログとサンプル出力を確認できるよう、ボードのコンソールに合わせて設定したシリアルターミナル。

!!! tip "データ通信対応ケーブルを使う"
    充電専用のUSBケーブルは、初回起動時のトラブルでよくある原因です。ボードに電源は入るのにシリアルポートが表示されない場合は、動作確認済みのデータ通信対応ケーブルを使い、USBハブを介さずパソコンに直接接続してください。

## 最初の動作確認におすすめの手順 { #recommended-first-run }

初めてSF32ボードを使う場合は、[SiFli-SDK](sifli/getting-started-sifli-sdk.md)から始めてください。SF32のリファレンスソフトウェアスタックであり、ボード、ケーブル、シリアルポート、書き込み手順、ツールチェーンが一通り動作することを確認するための、最も信頼できる基準になります。

`hello_world`が正常に動作したら、対象ハードウェアに対応する別のフレームワークを試してください。後の実験で問題が起きても、動作確認済みの構成に戻せます。

## 成功の状態 { #what-success-looks-like }

入門ガイドを終える時点で、以下を完了していることを確認してください。

- 最初のサンプルをビルドまたは読み込んだ。
- サンプルをボードに書き込んだ。
- シリアルコンソールを開いた。
- ブートログ、`hello_world`、シェルプロンプト、REPLバナーなど、想定どおりの出力を確認した。
- 動作したボード名、シリアルポート、書き込みコマンドを記録した。

これらの情報をプロジェクトのメモに残しておいてください。サンプルを変更し始めた後も、動作する構成へすぐに戻るための手がかりになります。

## チュートリアルへ進む { #continue-with-tutorials }

初回動作確認の成功基準を繰り返し達成できるようになったら、[チュートリアルの概要](tutorials/overview.md)に進んでください。ここからは、まず1つのペリフェラルを扱い、次にサブシステムを組み合わせ、最後に製品開発に必要な検証作業を練習します。

## 開発ガイドへ進むタイミング { #when-to-move-to-develop }

動作確認済みの初回手順を再現できたら、入門ガイドの役割は完了です。[開発の概要](../develop/index.md)では、プラットフォームの成熟度、ツール、書き込み・デバッグ手順、ファームウェアアーキテクチャ、製品への統合など、継続的な開発に必要な情報を確認できます。初回手順の完了後は、日常の開発でCodeKitをどう使うかを[CodeKitツールリファレンス](../develop/tools/codekit.md)で確認してください。このページは初回動作確認の案内として使います。

## 開発パスを選ぶ前に確認すること { #before-choosing-a-development-path }

ソフトウェアパスを選ぶ前に、対象のボードとソフトウェアバージョンに関する情報がドキュメントにそろっているか確認してください。特に、次の情報が必要です。

- SiFli-SDK、CodeKit、Zephyr、Arduino、MicroPythonのサポート状況と成熟度をボードごとに示す公開一覧。
- 各ソフトウェアパスで使う正確なボード識別子。
- Windows、macOS、Linux向けの書き込み/ダウンロード手順。
- 各最初のサンプルで期待されるシリアル出力。
- 書き込み失敗や無効なファームウェアイメージからの復旧手順。
- 各フレームワークの既知の制限事項。特にBluetooth、ディスプレイ、ストレージ、USB、低消費電力時の動作に関する制限。
- SDK、CodeKit、パッケージ、ファームウェアイメージ、ボードサポートの互換バージョンが分かるリリースノート。

あるボードで使えるソフトウェアパスが、すべてのSF32ボードで使えるとは限りません。使用するボードとソフトウェアのバージョンを個別に確認してください。
