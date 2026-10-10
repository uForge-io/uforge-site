---
icon: lucide/layers
description: "SF32LB52 DevKit LCD に対する OpenSiFli の下流 Zephyr サポートを紹介します。ボード識別、設定範囲、ドライバー対応状況、統合リスクを説明します。"
tags:
    - 開発
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli は [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) と [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream) で Zephyr の downstream 対応を進めています。downstream ツリーには、`sf32lb52_devkit_lcd` ボード、SiFli HAL の統合、SF32LB52 の devicetree ファイル、ドライバー、テスト、サンプル用 overlay が含まれます。

Zephyr API、devicetree、Kconfig、移植性のある RTOS 構造、ArduinoCore-zephyr と連携する経路が必要な場合は Zephyr を使います。ベンダー固有機能を現時点で最も幅広く利用したい場合は、SiFli-SDK を選んでください。

ワークスペース設定、最初の `hello_world` ビルド、書き込み、コンソール確認については[Zephyr downstream の始め方](../../../getting-started/zephyr/getting-started-zephyr-upstream.md)を参照してください。このページでは、基準構成の動作確認後に使う downstream プラットフォームについて説明します。

主な参照先:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr プロジェクトのドキュメント](https://docs.zephyrproject.org/)
- [Zephyr ボードドキュメント: SF32LB52-DevKit-LCD](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## 検証済みの downstream ボード { #verified-downstream-board }

<div align="center"><em>表: 検証済みの downstream ボード</em></div>

<div align="center" markdown>

| 項目 | 値 |
|:-----|:---|
| ボード | `sf32lb52_devkit_lcd` |
| 正式名称 | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Flash 書き込み用 runner | `sftool` |
| ランナー引数 | `--chip=SF32LB52` |
| コンソール | `usart1` |
| コンソール速度 | `1000000` baud |
| 選択されるディスプレイノード | `co5300` |

</div>

downstream ボードの資料には、8 MB OPI-PSRAM、128 Mb QSPI-NOR、48 MHz と 32.768 kHz の水晶振動子、ディスプレイインターフェース、オーディオ、USB、microSD を備えた SF32LB52x-MOD-N16R8 モジュールが記載されています。

## 設定の境界 { #configuration-boundaries }

ボードターゲット、devicetree、Kconfig 設定、overlay、downstream HAL のリビジョンは、ひとまとまりの互換性境界を構成します。各プロジェクトで downstream リビジョンを固定し、アプリケーションの overlay と設定フラグメントをソース管理してください。

Arduino または SiFli-SDK のプロジェクトから、ボード名、ピン割り当て、ランナー設定を Zephyr に流用しないでください。同じ物理ボードを動かす場合でも、3 つの経路では設定モデルが異なります。

## ボードハードウェアの要点 { #board-hardware-notes }

下流ボードの資料には、次の構成が記載されています。

- SF32LB525UC6 をベースにした SF32LB52x-MOD-N16R8 モジュール。
- 8 MB OPI-PSRAM。
- 128 Mb QSPI-NOR。
- 48 MHz と 32.768 kHz の水晶振動子。
- SPI/DSPI/QSPI および MCU/8080 ディスプレイインターフェース。
- I2C タッチ対応。
- アナログマイク入力、オンボード Class-D PA を使うアナログオーディオ出力。
- USB-to-serial と USB 2.0 FS 用 USB Type-C ポート。
- SPI 接続の microSD。

## downstream ツリーにあるドライバー領域 { #driver-areas-present-in-the-downstream-tree }

下流ツリーには、次の領域を含む SF32LB 関連のドライバー、バインディング、またはボード固有サンプルの設定があります。

- GPIO、pinctrl、UART、I2C、SPI、ADC、PWM、RTC、ウォッチドッグ。
- Flash、メモリーコントローラー、OPI PSRAM、QSPI NOR。
- ディスプレイ/LCDC/MIPI DBI と LVGL サンプル設定。
- Bluetooth HCI mailbox と BAP broadcast sink の設定。
- オーディオコーデック、DMA、CRC、暗号、エントロピー、OTP/eFuse、レギュレーター、リセット、温度センサー。

ツリーに存在することは、すべての製品シナリオが量産準備済みであることを意味しません。対象ボードで、正確なサンプルとドライバーの組み合わせを検証してください。

## 統合の順序 { #integration-sequence }

初回起動時の基準構成を確認した後、ボード I/O、UART 動作、ディスプレイ、ストレージ、Bluetooth、オーディオ、電源管理を 1 つずつ検証します。各チェックポイントでは、サンプル、overlay、Kconfig フラグメント、downstream リビジョン、シリアルログをまとめて保管してください。ツリーにドライバーがあるだけでは、アプリケーション全体の組み合わせが量産可能である証拠にはなりません。

## 下流版のリスクチェックリスト { #downstream-risk-checklist }

- 上流 Zephyr ではなく OpenSiFli の下流版を使っているか。
- HAL のリビジョンを固定しているか。
- `west flash` は想定される `sftool` ランナーを使うか。
- コンソールのボーレートは `1000000` に設定されているか。
- サンプルに必要な overlay が含まれているか。
- ドライバーはテストで対応確認されているか、それともツリーに存在するだけか。
