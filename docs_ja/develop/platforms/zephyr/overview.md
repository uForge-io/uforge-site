---
icon: lucide/layers
description: "SF32LB52 DevKit LCDに対するOpenSiFliの下流Zephyrサポートを紹介します。ボード識別、設定範囲、ドライバー対応状況、統合リスクを説明します。"
tags:
    - 開発
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFliは [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) と [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream) でZephyrのdownstream対応を進めています。downstreamツリーには、`sf32lb52_devkit_lcd`ボード、SiFli HALの統合、SF32LB52のdevicetreeファイル、ドライバー、テスト、サンプル用overlayが含まれます。

Zephyr API、devicetree、Kconfig、移植性のあるRTOS構造、ArduinoCore-zephyrと連携する経路が必要な場合はZephyrを使います。ベンダー固有機能を現時点で最も幅広く利用したい場合は、SiFli-SDKを選んでください。

ワークスペース設定、最初の`hello_world`ビルド、書き込み、コンソール確認については[Zephyr downstreamの始め方](../../../getting-started/zephyr/getting-started-zephyr-upstream.md)を参照してください。このページでは、基準構成の動作確認後に使うdownstreamプラットフォームについて説明します。

主な参照先:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyrプロジェクトのドキュメント](https://docs.zephyrproject.org/)
- [Zephyrボードドキュメント: SF32LB52-DevKit-LCD](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## 検証済みのdownstreamボード { #verified-downstream-board }

<div align="center"><em>表: 検証済みのdownstreamボード</em></div>

<div align="center" markdown>

| 項目 | 値 |
|:-----|:---|
| ボード | `sf32lb52_devkit_lcd` |
| 正式名称 | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Flash書き込み用runner | `sftool` |
| ランナー引数 | `--chip=SF32LB52` |
| コンソール | `usart1` |
| コンソール速度 | `1000000` baud |
| 選択されるディスプレイノード | `co5300` |

</div>

downstreamボードの資料には、8 MB OPI-PSRAM、128 Mb QSPI-NOR、48 MHzと32.768 kHzの水晶振動子、ディスプレイインターフェース、オーディオ、USB、microSDを備えたSF32LB52x-MOD-N16R8モジュールが記載されています。

## 設定の境界 { #configuration-boundaries }

ボードターゲット、devicetree、Kconfig設定、overlay、downstream HALのリビジョンは、ひとまとまりの互換性境界を構成します。各プロジェクトでdownstreamリビジョンを固定し、アプリケーションのoverlayと設定フラグメントをソース管理してください。

ArduinoまたはSiFli-SDKのプロジェクトから、ボード名、ピン割り当て、ランナー設定をZephyrに流用しないでください。同じ物理ボードを動かす場合でも、3つの経路では設定モデルが異なります。

## ボードハードウェアの要点 { #board-hardware-notes }

下流ボードの資料には、次の構成が記載されています。

- SF32LB525UC6をベースにしたSF32LB52x-MOD-N16R8モジュール。
- 8 MB OPI-PSRAM。
- 128 Mb QSPI-NOR。
- 48 MHzと32.768 kHzの水晶振動子。
- SPI/DSPI/QSPIおよびMCU/8080ディスプレイインターフェース。
- I2Cタッチ対応。
- アナログマイク入力、オンボードClass-D PAを使うアナログオーディオ出力。
- USB-to-serialとUSB 2.0 FS用USB Type-Cポート。
- SPI接続のmicroSD。

## downstreamツリーにあるドライバー領域 { #driver-areas-present-in-the-downstream-tree }

下流ツリーには、次の領域を含むSF32LB関連のドライバー、バインディング、またはボード固有サンプルの設定があります。

- GPIO、pinctrl、UART、I2C、SPI、ADC、PWM、RTC、ウォッチドッグ。
- Flash、メモリーコントローラー、OPI PSRAM、QSPI NOR。
- ディスプレイ/LCDC/MIPI DBIとLVGLサンプル設定。
- Bluetooth HCI mailboxとBAP broadcast sinkの設定。
- オーディオコーデック、DMA、CRC、暗号、エントロピー、OTP/eFuse、レギュレーター、リセット、温度センサー。

ツリーに存在することは、すべての製品シナリオが量産準備済みであることを意味しません。対象ボードで、正確なサンプルとドライバーの組み合わせを検証してください。

## 統合の順序 { #integration-sequence }

初回起動時の基準構成を確認した後、ボードI/O、UART動作、ディスプレイ、ストレージ、Bluetooth、オーディオ、電源管理を1つずつ検証します。各チェックポイントでは、サンプル、overlay、Kconfigフラグメント、downstreamリビジョン、シリアルログをまとめて保管してください。ツリーにドライバーがあるだけでは、アプリケーション全体の組み合わせが量産可能である証跡にはなりません。

## 下流版のリスクチェックリスト { #downstream-risk-checklist }

- 上流ZephyrではなくOpenSiFliの下流版を使っているか。
- HALのリビジョンを固定しているか。
- `west flash`は想定される`sftool`ランナーを使うか。
- コンソールのボーレートは`1000000`に設定されているか。
- サンプルに必要なoverlayが含まれているか。
- ドライバーはテストで対応確認されているか、それともツリーに存在するだけか。
