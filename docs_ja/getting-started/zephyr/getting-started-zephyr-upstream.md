---
icon: lucide/layers
description: "Zephyr upstream の SF32LB52 DevKit LCD ボードターゲットをビルド、書き込みし、ドキュメントに記載されたコンソール設定とサポート機能を確認します。"
tags:
    - はじめに
    - Zephyr
---

# Zephyr upstream { #zephyr-upstream }

Zephyr v4.3.0 以降、upstream Zephyr では `sf32lb52_devkit_lcd` ボードが継続的にメンテナンスされています。[v4.3.0 リリースノート](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html)と [SF32LB52 DevKit LCD ボードドキュメント](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)を参照してください。このガイドでは v4.3.0 のワークスペースを作成し、最初のサンプルをビルドしてボードに書き込みます。SF32 のより広範な公式機能が必要な場合は、[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)を使用してください。

!!! note "ボードの対応機能を確認"
    upstream のボード定義があることだけでは、すべての周辺機能や動作モードが有効で、製品向けに検証済みであるとは限りません。ボードドキュメントの対応機能表を確認し、使用するボードのリビジョンで必要な動作を検証してください。

## 必要なもの { #what-youll-need }

**ハードウェア**

- SF32LB52 DevKit LCD。SF32LB52x-MOD-N16R8 モジュールをベースとし、SF32LB525UC6、8 MB OPI-PSRAM、128 Mb QSPI-NOR を搭載。
- ボードの USB-to-UART 経路に接続する USB Type-C データケーブル。

**ソフトウェア**

- Zephyr v4.3.0 がサポートするホスト OS。[Getting Started ガイド](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)に従ってセットアップしてください。
- 同ガイドの手順に従い、ARM Cortex-M ターゲット用の Zephyr ホスト依存パッケージと Zephyr SDK をインストール。
- Git、Python 3、`pip`。

## ツールを準備する { #prepare-the-tooling }

まず Zephyr の [v4.3.0 Getting Started ガイド](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)に従い、ホスト依存パッケージと Zephyr SDK をセットアップします。次に Python 環境を作成し、対応する Zephyr タグからワークスペースを初期化します。

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

以下のビルドと書き込みでは、この Python 環境を有効にしたままにしてください。

## ボードを確認する { #confirm-the-board }

ワークスペースにターゲットが含まれていることを確認します。

```bash
west boards
```

ボード名は次のとおりです。

```text
sf32lb52_devkit_lcd
```

## Hello World をビルドする { #build-hello-world }

Zephyr 標準の Hello World サンプルをビルドします。

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

ビルドに成功すれば、ワークスペースでボードターゲットとツールチェーンを利用できます。すべてのボード周辺機能が検証されたことを示すものではありません。

## ボードに書き込む { #flash-the-board }

upstream のボードでは `sftool` がデフォルトの書き込み runner に指定されています。[OpenSiFli sftool](https://github.com/OpenSiFli/sftool)をインストールして `PATH` に通し、ボードドキュメントの手順でシリアルダウンロードモードにします。その後、次を実行します。

```bash
west flash
```

書き込みに失敗する場合は、シリアルポートの選択、ダウンロードモード、および[ボードドキュメント](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)の runner 説明を確認してください。

## シリアルコンソールを開く { #open-the-serial-console }

upstream のボード設定では、Zephyr コンソールは `usart1`、`1000000` baud に接続されています。シリアルターミナルで該当 UART を開き、次の出力を確認します。

```text
Hello World! sf32lb52_devkit_lcd
```

## 次のサンプルを選ぶ { #choose-a-next-sample }

upstream ボードドキュメントの対応機能表と[Zephyr サンプル一覧](https://docs.zephyrproject.org/4.3.0/samples/index.html)を参照し、次に評価する API や周辺機能を選びます。その機能がボードでサポートされ、必要な設定が有効になっていることを確認してください。サンプルが動作しただけで製品レベルの準備が整ったと判断しないでください。

## トラブルシューティング { #troubleshooting }

<div align="center"><em>表: トラブルシューティング</em></div>

<div align="center" markdown>

| 症状 | 確認項目 |
|:-----|:---------|
| `west boards` に SF32 ターゲットが表示されない | upstream Zephyr v4.3.0 以降からワークスペースを初期化したこと、および `west update` が完了したことを確認します。 |
| コンパイル開始前にビルドが失敗する | Python 環境が有効であること、ARM Cortex-M 用 Zephyr SDK がインストール済みであること、v4.3.0 の依存パッケージを導入したことを確認します。 |
| ビルドできるが書き込みできない | `sftool` がインストールされ `PATH` にあること、シリアルポートが正しいこと、ボードがシリアルダウンロードモードであることを確認します。 |
| シリアル出力がない | `usart1`、`1000000` baud、USB-to-UART 接続、および別のターミナルがポートを開いていないかを確認します。 |
| 周辺機能のサンプルが失敗する | ボードの対応機能表とサンプル設定を確認します。ベースのボードターゲットですべての周辺機能が有効とは限りません。 |

</div>

## 製品に組み込む前の確認 { #before-product-integration }

- upstream ボードの対応機能表と、使用するサンプルの設定を確認します。
- 対象ボードと製品設定で、必要なインターフェース、性能、メモリ使用量、消費電力を検証します。Hello World のビルド成功はツールチェーンのスモークテストにすぎません。
- この Zephyr ターゲットで未掲載または未検証の機能が設計に必要な場合は、upstream の対応範囲を[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)と比較してください。
