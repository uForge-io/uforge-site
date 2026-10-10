---
icon: lucide/list-tree
description: "SF32 ファームウェアをゼロから組み上げるのではなく、ボード、フレームワーク、難易度の高い周辺機器に合う SiFli-SDK または Zephyr のサンプルを選び、製品向けに応用する方法を説明します。"
tags:
    - 開発
    - サンプル
---

# サンプル { #examples }

まずはサンプルから始めましょう。SF32 のファームウェアは、すべてのサブシステムをゼロから構築するより、動作実績のあるボード別サンプルを製品に合わせて変更するほうが、通常は早く仕上がります。

最小のサンプルが最適とは限りません。製品で最も実装が難しい部分、たとえば Bluetooth プロファイル、ディスプレイパネル、オーディオ経路、ファイルシステム、OTA、USB、電源モード、AI アクセラレーターをすでに含むサンプルを選んでください。

## サンプルの分野 { #example-areas }

<div align="center"><em>表: サンプル分野と開始点</em></div>

<div align="center" markdown>

| 分野 | 開始点 |
|:-----|:-----------|
| 最初の実行 | `example/get-started/hello_world/rtt/project` |
| LED 点滅／GPIO | `example/get-started/blink/rtt` または GPIO HAL／デバイスのサンプル。 |
| Bluetooth | BLE、Classic BT、LE Audio、スループット、ビーコン、OTA、プロファイルの各サンプル。[Bluetooth SDKの例](../../learn/bluetooth/bluetooth-sdk-examples.md)の用途別一覧を参照してください。 |
| グラフィックス | LVGL デモ、デザインツール連携、ウィジェット、圧縮アセット、アニメーション／メディア、ディスプレイ別サンプル。[LVGL SDKの例](../../learn/graphics/lvgl-sdk-examples.md)の用途別一覧を参照してください。 |
| オーディオ | 再生、録音、PDM キャプチャー、コーデック、Opus、MP3、ミキシング、対応する場合は USB オーディオ。[オーディオSDKサンプル](../../learn/audio/audio-sdk-examples.md)の用途別一覧を参照してください。 |
| 低消費電力 | 電源管理（PM）の状態、GPIO、プロセッサー、Bluetooth、ディスプレイ、UI、ウェアラブルの各シナリオ。[低消費電力SDKサンプル](../../learn/low-power/low-power-sdk-examples.md)の用途別一覧を参照してください。 |
| ストレージ | ファイルシステム、Flash、SD、パーティションの各サンプル。 |
| USB | CherryUSB のデバイス／ホストサンプル。 |
| AI | NNACC HAL と RT-Device のサンプル。 |

</div>

## SDK サンプルの代表的な開始点 { #representative-sdk-starting-points }

分野を選んだ後、次の表を使ってください。以下は代表的なパスです。SDK リリースによって変わる場合があるため、ビルド前に使用する SDK、対象ボード、設定を確認してください。

<div align="center"><em>表: SF32 SDK サンプルの代表的な開始点</em></div>

<div align="center" markdown>

| 開発目標 | SDK サンプルの代表例 | 最初に確認すること | 次に読む資料 |
|:---|:---|:---|:---|
| GPIO 出力／入力 | `example/hal/gpio`, `example/rt_device/gpio` | 実際のボードでピン多重化、極性、割り込み動作が正しいこと。 | [ペリフェラル入門](../../getting-started/tutorials/beginner.md) |
| コンソールとシステム調査 | `example/system/finsh` | シリアルコンソール、ログ、基本的な実行時情報の確認。 | [ペリフェラル入門](../../getting-started/tutorials/beginner.md) |
| ADC、PWM、RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | ボード固有のピン、クロック、周辺機器の設定。 | [ペリフェラル入門](../../getting-started/tutorials/beginner.md) |
| I2C センサー | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | 電気的な接続、バスアドレス、繰り返し転送の信頼性。 | [複数サブシステムの連携](../../getting-started/tutorials/intermediate.md) |
| LVGL とローカルディスプレイ | `example/multimedia/lvgl/lvgl_v8_examples` | 複雑な画面を作る前に、パネル初期化、ピクセル形式、安定した画面更新（flush）経路を確認。 | [グラフィックス概要](../../learn/graphics/overview.md)、[ディスプレイコントローラ](../../learn/graphics/display-controller.md) |
| BLE ペリフェラルのサービス | `example/ble/peripheral`, `example/ble/hrpc` | アドバタイジング、接続、1 つの GATT 特性、再接続動作。 | [Bluetooth概要](../../learn/bluetooth/overview.md) |
| ローカル音声再生 | `example/multimedia/audio/local_music`, `mp3_sd_player` | コーデックとボードの音声経路、バッファーの安定性、再生後の後処理。 | [オーディオ概要](../../learn/audio/overview.md) |
| Flash ベースのストレージ | `example/storage/littlefs/nor`, `example/storage/flashdb` | マウント、読み書き、リセット時または容量不足時の復旧。 | [複数サブシステムの連携](../../getting-started/tutorials/intermediate.md) |
| 低消費電力動作 | `example/pm/classical`, `example/pm/raise_wrist` | 状態ごとの実測電流と、ウェイクアップ要因の正しい動作。 | [低消費電力設計の概要](../../learn/low-power/overview.md) |
| BLE OTA | `example/ble/peripheral_with_ota` | 対象ハードウェアでの更新中断からの復旧とロールバック。 | [製品検証](../../getting-started/tutorials/advanced.md) |
| 実行時診断 | `example/system/cpu_usage_profiler`, `example/system/coredump` | 最適化の前に、再現可能な CPU トレースまたはクラッシュダンプを取得。 | [製品検証](../../getting-started/tutorials/advanced.md) |

</div>

## サンプルの選び方 { #how-to-choose-an-example }

次の順に選びます。

1. ボードを合わせる。
2. フレームワークを合わせる。
3. 最も実装が難しい周辺機器を合わせる。
4. ミドルウェアを合わせる。
5. 電源またはメモリーの制約を合わせる。

たとえば Bluetooth オーディオ製品なら、理解しやすい `hello_world` よりも、オーディオ／Bluetooth のサンプルに近いものから始めます。

## 製品向けに応用する手順 { #adaptation-workflow }

1. 変更していないサンプルをビルドして書き込みます。
2. 成功したビルドコマンド、ボード名、書き込みコマンド、シリアルポート、ログを保存します。
3. 製品向けの変更を 1 つ加えます。
4. 再ビルドして再試験します。
5. 別のサブシステムを追加する前に、変更をコミットするか記録します。

この手順は最初の1時間は遅く感じられますが、最初の深刻な障害が起きた後は大幅に速くなります。

## 残しておく証跡 { #evidence-to-keep }

製品のベースとして採用したサンプルごとに、次の情報を記録してください。

- SDK のブランチまたはパッケージのバージョン
- ボード名または FQBN
- 必要な設定オプション
- 必要なピンと周辺機器
- 想定されるシリアル出力
- 既知の制約
- 入手できる場合はメモリー使用量
- 復旧コマンド

## サンプル選択の原則 { #example-selection-rule }

製品の中で最も制約が厳しい部分に合うサンプルを選びます。

- Bluetooth 製品では、最も近いプロファイルのサンプルを使います。
- ディスプレイ製品では、ディスプレイと LVGL の経路を起点にします。
- バッテリー駆動製品では、低消費電力のサンプルを起点にします。
- OTA 製品では、更新フローとパーティション構成を起点にします。

その後、ほかのサブシステムを 1 つずつ追加します。

## 学習の進め方 { #suggested-learning-path }

SDK を初めて使う場合は、[ペリフェラル入門](../../getting-started/tutorials/beginner.md)から始め、1 つの周辺機器が安定して動作したら[複数サブシステムの連携](../../getting-started/tutorials/intermediate.md)に進みます。[製品検証](../../getting-started/tutorials/advanced.md)では、消費電力の実測・評価、OTA、カスタムディスプレイの立ち上げ、障害解析、Bluetooth の複数接続、独自ドライバーを扱います。各トピックの概要では、サンプルの背景にある構成やトレードオフを説明しています。
