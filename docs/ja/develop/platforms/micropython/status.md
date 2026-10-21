---
icon: lucide/terminal-square
description: "SF32におけるMicroPythonの現状を説明します。公式ポートはまだ確認されていません。対応経路とする前に必要な公開基準も示します。"
tags:
    - 開発
    - MicroPython
---

# MicroPythonの状況 { #micropython-status }

確認したSiFliのドキュメントおよびOpenSiFliリポジトリーでは、SF32公式のMicroPythonポート、ファームウェアイメージ、ボード固有の書き込み手順は見つかっていません。

今回の確認対象は、[OpenSiFliの公開GitHubリポジトリー](https://github.com/OpenSiFli/)と[SiFliの公式ドキュメント](https://docs.sifli.com/)です。

非公開またはコミュニティによる実験が存在しないことを意味するわけではありません。ただし、開発者が書き込み、再現できる公開ファームウェアイメージまたはソースツリーが見つかるまでは、MicroPythonを検証済みのSF32開発経路としてこのサイトに掲載すべきではありません。

## 現時点での推奨 { #current-recommendation }

現時点では、MicroPythonをエンドユーザー向けのSF32対応経路として案内しないでください。開発者が実際に書き込み、動作を再現できる公開成果物が出るまでは、ロードマップ／ステータスページとして扱います。

## 通常のチュートリアルに必要な情報 { #what-a-real-page-needs }

通常のチュートリアルに発展させるには、SiFliが次の情報を公開する必要があります。

- ボードとメモリー構成別のファームウェアイメージ。
- ソースリポジトリーとビルド手順。
- ファームウェア書き込みコマンドと復旧コマンド。
- REPL用UARTとボーレート。
- 想定されるMicroPythonの起動メッセージ。
- 対応する`machine` API。
- ファイルシステムの動作とセーフモード／復旧動作。
- ディスプレイ、Bluetooth、ストレージ、USB、低消費電力に関する既知の制限。

## 最初に行うスモークテスト案 { #suggested-first-smoke-test }

ファームウェアが利用可能になったら、最初のテストはシリアル出力だけにします。

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

ピン名が文書化されてからGPIOを試験してください。

## 最低限の受け入れ基準 { #minimum-acceptance-criteria }

次のすべてがそろったら、MicroPythonの案内を「状況」から「開発を始める」に移せます。

- 公開リポジトリーまたはリリースページ。
- 少なくとも1種類のSF32開発キット向けのボード別バイナリ。
- 文書化されたファームウェア書き込みコマンド。
- 文書化されたREPLポートとボーレート。
- SiFli-SDKファームウェアに戻す復旧手段。
- 対応する`machine` APIの一覧。
- 実機で試験済みのGPIOサンプルが1つ以上。

## 重要な理由 { #why-this-matters }

「MicroPythonイメージをダウンロードする」という曖昧な指示だけでは、開発者はそのままでは作業を進められません。正確なイメージ、対応ボード、書き込みツール、REPL設定、復旧手段が必要です。これらがなければ、MicroPythonのページは役に立つどころか、サポート負荷を増やすだけです。
