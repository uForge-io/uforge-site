---
icon: lucide/terminal-square
description: "SF32 における MicroPython の現状を説明します。公式ポートはまだ確認されていません。対応経路とする前に必要な公開基準も示します。"
tags:
    - 開発
    - MicroPython
---

# MicroPython の状況 { #micropython-status }

確認した SiFli のドキュメントおよび OpenSiFli リポジトリでは、SF32 公式の MicroPython ポート、ファームウェアイメージ、ボード固有の書き込み手順は見つかっていません。

今回の確認対象は、[OpenSiFli の公開 GitHub リポジトリ](https://github.com/OpenSiFli/) と [SiFli の公式ドキュメント](https://docs.sifli.com/) です。

非公開またはコミュニティによる実験が存在しないことを意味するわけではありません。ただし、開発者が書き込み、再現できる公開ファームウェアイメージまたはソースツリーが見つかるまでは、MicroPython を検証済みの SF32 開発経路としてこのサイトに掲載すべきではありません。

## 現時点での推奨 { #current-recommendation }

現時点では、MicroPython をエンドユーザー向けの SF32 対応経路として案内しないでください。開発者が実際に書き込み、動作を再現できる公開成果物が出るまでは、ロードマップ／ステータスページとして扱います。

## 通常のチュートリアルに必要な情報 { #what-a-real-page-needs }

通常のチュートリアルに発展させるには、SiFli が次の情報を公開する必要があります。

- ボードとメモリー構成別のファームウェアイメージ。
- ソースリポジトリとビルド手順。
- ファームウェア書き込みコマンドと復旧コマンド。
- REPL 用 UART とボーレート。
- 想定される MicroPython の起動メッセージ。
- 対応する `machine` API。
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

ピン名が文書化されてから GPIO を試験してください。

## 最低限の受け入れ基準 { #minimum-acceptance-criteria }

次のすべてがそろったら、MicroPython の案内を「状況」から「開発を始める」に移せます。

- 公開リポジトリまたはリリースページ。
- 少なくとも 1 種類の SF32 開発キット向けのボード別バイナリ。
- 文書化されたファームウェア書き込みコマンド。
- 文書化された REPL ポートとボーレート。
- SiFli-SDK ファームウェアに戻す復旧手段。
- 対応する `machine` API の一覧。
- 実機で試験済みの GPIO サンプルが 1 つ以上。

## 重要な理由 { #why-this-matters }

「MicroPython イメージをダウンロードする」という曖昧な指示だけでは、開発者は作業できません。正確なイメージ、対応ボード、書き込みツール、REPL 設定、復旧手段が必要です。これらがなければ、MicroPython のページは支援ではなくサポート負荷を増やします。
