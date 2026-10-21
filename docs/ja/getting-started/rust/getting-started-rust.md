---
icon: lucide/code
description: "SF32LB52上でOpenSiFliのsifli-rsを初めて評価する手順: Rustターゲットのインストール、未改変のBlinkyサンプルのビルド、sftoolの設定、SDK復旧パスの確保。"
tags:
    - はじめに
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs)は、SiFli MCU向けのRust HAL、PAC、フラッシュテーブル関連の機能を開発しています。メンテナーはこれを開発中であり、本番利用には対応していないと位置づけています。そのため、このガイドは**評価用の基準構成**を確立するものであり、本番向けファームウェアの開発手順を示すものではありません。

始める前に、同じボードで[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)の入門手順を完了してください。これにより、Rustの実験で書き込みやデバッグができない場合に戻れる、動作確認済みのシリアル接続と復旧手順を確保できます。

## 必要なもの { #what-you-need }

- SF32LB52 DevKit LCDと、USB-to-UARTに接続するUSB Type-Cデータケーブル。
- Rust、組み込み開発、コマンドラインに関する基本的な知識。
- `git`と、[rustup](https://rustup.rs/)でインストールした最新のRustツールチェーン。
- 最新の[sifli-rs入門ガイド (Get Started guide)](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md)と[書き込み・デバッグガイド (Flash and Debug Guide)](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md)。

!!! warning "試験評価用の手順"
    このガイドを、チップ、ペリフェラル、ボード構成、アプリケーションスタックが本番運用可能であることの根拠として使用しないでください。移植作業に着手する前に、対象のターゲットとペリフェラルについて、リポジトリーのサポート状況情報を確認してください。

## Rustターゲットの準備 { #prepare-the-rust-target }

このリポジトリーのガイドはArm Cortex-M Rustターゲットを使用しています。ガイドに記載されているターゲットをインストールしてください。

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

リポジトリーをクローンし、SF32LB52のサンプルディレクトリから作業してください。

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

このサンプルディレクトリには、Cargoターゲット設定、メモリーレイアウト、ビルドスクリプト、サンプルバイナリが含まれています。これらのファイルをそのまま製品にコピーしないでください。対象ハードウェア向けにレビューする必要のあるボードおよびフラッシュに関する前提が組み込まれています。

## 書き込みランナーの設定 { #configure-the-flash-runner }

このリポジトリーでは、通常の書き込みランナーとして`sftool`が文書化されています。`examples/sf32lb52x/.cargo/config.toml`で、最新の書き込み・デバッグガイド (Flash and Debug Guide) に従い、ボードのUSB-to-UARTポートにランナーを設定します。文書化されているパターンは次のとおりです。

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

最初の書き込みには、フラッシュテーブル、ブートローダー、アプリケーションイメージが必要になる場合があります。正確なイメージとアドレスは、文書化されたボード/フラッシュの構成に依存します。ArduinoやZephyr、SiFli-SDKからアドレスやバイナリを流用するのではなく、リポジトリーのガイドに従ってください。

## 基準構成のビルドと実行 { #build-and-run-the-baseline }

ランナーを設定したら、未改変のBlinkyサンプルをビルドして書き込みます。

```bash
cargo run --bin blinky
```

コンパイルの成功は最初の確認にすぎません。ボードが期待どおりの挙動を示すことを確認し、`cargo`と`sftool`の出力全体を保存してください。次に、Blinkの遅延時間など、小さく元に戻せる変更を一つ加えてから、別のペリフェラルに取り組んでください。

## 基準構成が失敗した場合 { #if-the-baseline-fails }

まず、ボードのSiFli-SDKの基準構成がまだ動作することを確認してください。次に、Rustターゲット、コミット、選択したサンプル、Cargo設定、`sftool`のコマンド/出力、ボードリビジョン、シリアルまたはデバッグログを収集してください。アップストリームのガイドでは、アイドル/WFI周辺のデバッグ挙動が不安定になり得ること、フラッシュテーブルのサイズがアプリケーションイメージに対応できる必要があることが記載されています。

アーキテクチャ、サポート範囲、製品適合性の判断については、[Develop内のRust](../../develop/platforms/rust/overview.md)を参照してください。

## サンプルを再利用する前に { #what-sifli-should-add }

サンプルを変更する前に、リポジトリーに使用するボードとペリフェラルのサポートが明記されていることを確認し、対応するRustターゲット、ブートローダー、フラッシュテーブルのレイアウト、デバッグ手順を確認してください。動作確認済みのSiFli-SDK構成を、復旧手段として確保してください。
