---
icon: lucide/puzzle
description: "SF32LB52 DevKit LCD上でOpenSiFliのベータ版ArduinoCore-zephyrを初めて実行する手順: ボードパッケージのインストール、シリアルテストのアップロード、Blinkの実行。"
tags:
    - はじめに
    - Arduino
---

# Arduino { #arduino }

OpenSiFliには、Zephyrをベースにした、SF32向けのベータ版Arduinoコアがあります: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr)。これは`sifli:sf32lb52` Arduinoパッケージを公開しており、Boards Managerには**SiFli Serial Boards**として表示され、現在は**SiFli SF32LB52 DevKit LCD**ボードを対象としています。

スケッチの試作、周辺機能の簡単な確認、デモ、初期プロトタイプには、このArduinoコアが適しています。本番向けファームウェア、Bluetoothスタックの調整、グラフィックス負荷の高いアプリケーション、低消費電力化、カスタムボードの初期動作確認には、[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)を使用してください。

!!! warning "ベータ版のコア"
    OpenSiFliはこのArduinoコアを**BETA**とし、テスト用途に限って使用するよう案内しています。機能、API、ローダーの動作、パッケージ内容、リリースの仕組みは変更される可能性があります。本番用途向けとして扱わないでください。

## 必要なもの { #what-youll-need }

**ハードウェア**

- SiFli SF32LB52 DevKit LCD。
- ボードのUSB-to-UARTインターフェースに接続するUSB Type-Cデータケーブル。
- Windows、macOS、またはLinuxを実行するコンピューター。

**ソフトウェア**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software)または[Arduino CLI](https://docs.arduino.cc/arduino-cli/)。
- OpenSiFliの`sifli:sf32lb52` Arduinoパッケージ。
- シリアルモニター。

## ボードパッケージのインストール { #install-the-board-package }

**Arduino IDE > Settings**を開き、次のURLを**Additional Boards Manager URLs**に追加します。

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

中国本土のユーザーは、ミラーされたパッケージインデックスを使用してください。

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

次に**Boards Manager**を開き、**SiFli Serial Boards**を検索して、`sifli:sf32lb52`プラットフォームをインストールします。

Arduino CLIからもインストールできます。

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

中国向けミラーを使う場合:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## ボードの選択 { #select-the-board }

Arduino IDEで次を選択します。

```text
SiFli SF32LB52 DevKit LCD
```

ボードのFQBNは次のとおりです。

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

OpenSiFliのボード定義では、このArduinoボード名をZephyrターゲット`sf32lb52_devkit_lcd`とバリアント`sf32lb52_devkit_lcd_sf32lb525uc6`に対応付けています。

## ビルドオプションの選択 { #choose-build-options }

このコアには2つの重要なメニューがあります。

<div align="center"><em>ビルドオプション</em></div>

<div align="center" markdown>

| メニュー | オプション | 意味 |
|:-----|:-------|:--------|
| **Mode** | `Standard` | ロード後にスケッチが自動的に開始する。 |
| **Mode** | `Debug` | Zephyrシェルが`sketch`コマンドを待機する。 |
| **Link mode** | `Dynamic` | スケッチがZephyrローダー向けにパッケージ化される。 |
| **Link mode** | `Static` | スケッチが書き込み可能なバイナリにリンクされる。 |

</div>

Zephyrローダーを使う場合は**Dynamic**を選びます。スケッチを書き込み可能なファームウェアイメージにリンクする場合は**Static**を選びます。

## ボードをシリアルダウンロードモードにする { #put-the-board-in-serial-download-mode }

OpenSiFliのドキュメントによると、初回使用時にはボードをシリアルダウンロードモードにする必要があります。SF32LB52 DevKit LCD用のブート/リセットシーケンスを使用してから、Arduino IDEまたはCLIからアップロードしてください。

アップロードツールは`sftool`です。

## シリアルスモークテストのアップロード { #upload-a-serial-smoke-test }

まずはシリアル出力を確認しましょう。このテストでは、LEDの極性に依存せず、アップロード、リセット、実行環境の起動、コンソール出力の経路を確認できます。

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Arduino IDEからアップロードするか、Arduino CLIを使用します。

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

`/dev/cu.usbserial-XXXX`をボードのシリアルポートに置き換えてください。Windowsでは対応する`COM`ポートを使用します。Linuxでは対応する`/dev/ttyUSB*`または`/dev/ttyACM*`ポートを使用します。

Serial Monitorを`115200`ボーで開いてください。**Standard**ビルドモードでは、スケッチが1秒ごとに1行を出力するはずです。**Debug**ビルドモードでは、Zephyrシェルを開いて次を実行します。

```text
sketch
```

## Blinkのアップロード { #upload-blink }

インストールしたSF32LB52 DevKit LCDのバリアントで`LED_BUILTIN`が定義されているか確認してください。Arduinoのピン番号が共通とは限りません。マクロがあり、ボード上のLEDがそのバリアントに割り当てられている場合は、シリアルスモークテストの成功後にBlinkを試してください。そうでない場合は、GPIOを選ぶ前にボード資料でLEDの接続先と極性を確認してください。

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## トラブルシューティング { #troubleshooting }

<div align="center"><em>表: トラブルシューティング</em></div>

<div align="center" markdown>

| 症状 | 確認事項 |
|:--------|:------|
| パッケージが表示されない | パッケージインデックスURLを確認し、Arduino IDE 2.xを使用してください。 |
| アップロードが失敗する | ボードをシリアルダウンロードモードにし、シリアルモニターがポートを占有していないことを確認してください。 |
| スケッチが開始しない | **Mode**を確認してください。`Debug`の場合は、Zephyrシェルから`sketch`を実行してください。 |
| 未定義のZephyrシンボル | コアのREADMEによると、不足しているZephyr関数を`loader/llext_exports.c`でエクスポートし、ローダーを再ビルドする必要がある場合があります。 |
| Zephyrサブシステムが見つからない | ボードの`.conf`で必要な`CONFIG_`オプションを有効にし、ローダーを再ビルドしてアップロードしてください。 |
| メモリー不足 | Zephyrシェルと動的なスケッチのロードはRAMを消費します。スタック使用量を減らすか、必要に応じてビルドモードを切り替えてください。 |

</div>

## 現在の対応範囲 { #what-sifli-team-should-finish }

現在公開されているパッケージの対象はSF32LB52 DevKit LCDで、テスト用のベータ版です。別のボードを試す場合やAPIを利用する場合は、使用するパッケージの正確なバージョンについて、[upstreamリポジトリ](https://github.com/OpenSiFli/ArduinoCore-zephyr)とリリースノートを確認してください。ZephyrまたはSiFli-SDKでのサポートは、このArduinoパッケージでのサポートを意味するものではありません。
