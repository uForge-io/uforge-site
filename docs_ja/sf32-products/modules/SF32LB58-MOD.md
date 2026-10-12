---
icon: lucide/card-sim
description: "SF32LB58-MOD: SF32LB586VDD36ベースの低消費電力Bluetooth MCUモジュール。標準構成は 16 + 16 MB HPI-PSRAMと 1 MB QSPI-NORで、NOR、NAND、eMMCのストレージ構成を選べます。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB58-MOD { #sf32lb58-mod }

## 概要 { #overview }

SF32LB58-MODは、SiFliのSF32LB586VDD36をベースにした低消費電力Bluetooth MCUモジュールです。標準構成では16 + 16 MBのHPI-PSRAMをパッケージ内に搭載し、1 MBのQSPI-NORを備えます。24 × 24 × 3.1 mmのモジュールに、3コアプラットフォーム、RF回路、水晶振動子、複数のメモリー構成を集約し、ディスプレイ、オーディオ、ストレージ、制御用の外部インターフェースを提供します。

このモジュールはBGA256チップ、RF回路、水晶振動子、高速メモリーをモジュール上に集約し、製品側キャリア基板の関連配線を減らします。完成品ではRF性能を検証し、適用される規制要件を満たしてください。キャリア基板の設計を確定する前に、選択したSKUのアンテナ方式とメモリー構成を確認してください。

選択するモジュールSKUに応じて、HPI-PSRAMとQSPI-NOR、QSPI-NAND、またはeMMCを組み合わせられます。外部インターフェースを活用すれば、MCUクラスのプラットフォームを維持しながら、ディスプレイ、オーディオ、ストレージ、接続機能を備えた製品を構成できます。

DS5802 V0.1には、モジュール上のPCBアンテナと外部アンテナ接続方式が記載されています。外部アンテナはキャスタレーション端子から引き出す方法、または第1世代の外部アンテナコネクターを介して接続する方法があり、後者はHirose U.FL、I-PEX MHFI、Amphenol AMCの各コネクターに対応します。SKUごとの方式は示されていないため、キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成をSiFliに確認してください。

!!! info
    チップファミリーのアーキテクチャや周辺機能については、[SF32LB58x](../chips/SF32LB58x.md) を参照してください。このページでは、モジュール固有の実装、メモリー構成、電源レール、製品選定のポイントを説明します。

## 用途 { #applications }

SiFliがSF32LB58-MODの用途として挙げている分野は次のとおりです。

- ウェアラブル: ハイエンドスマートウォッチ、スマートバンド、ウェアラブル医療機器、フィットネス機器
- 産業: コストパフォーマンスに優れたディスプレイ、グラフィカルHMI、産業用センサー制御センター、設備監視、計測器
- 車載: 電気自動車向けの中央制御装置、車載キー、ウェアラブル端末型の車載リモコン
- ホームオートメーション: 小型・中型のスマート家電、スマートロック
- 汎用: 低消費電力センサーハブ、Bluetooth Mesh
- AIoTの例: 音声コマンド認識、スマートホーム、スマートキー、スマートコントロールパネル

次の要件に対応する必要がある場合は、SF32LB58-MODを候補にしてください。

- BGA256チップ、RF回路、水晶振動子、高速メモリーをモジュールに集約
- モジュール上のPCBアンテナ、またはキャスタレーション端子／Hirose U.FL、I-PEX MHFI、Amphenol AMC各コネクターに対応する外部アンテナ接続（SKUごとの構成確認が必要）
- QSPI-NOR、QSPI-NAND、eMMCから選べるストレージ構成
- ディスプレイ、オーディオ、ストレージ、制御用の外部インターフェース

## 開発リソース { #development-resources }

[モジュールのデータシート]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[チップ紹介]: ../chips/SF32LB58x.md
[ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[モジュールのデータシート]__
- :fontawesome-solid-microchip: __[チップ紹介]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specifications }

### 演算とメモリー { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1アプリケーションコア × 2、最大240 MHz
- ユーザープログラム可能なArm Cortex-M33 STAR-MC1低消費電力コア × 1、最大96 MHz
- アプリケーションコアあたり最大370 DMIPS / 984 EEMBC CoreMark
- 低消費電力コアで最大148 DMIPS / 394 EEMBC CoreMark
- SRAM: 2176 KB (HCPU) + 512 KB (ACPU) + 1056 KB (LCPU、リテンションSRAM)
- すべてのコアに単精度FPUとMPUを搭載

### 無線接続 { #wireless-connectivity }

- BLE Audio対応のデュアルモードBluetooth 5.3
- BLE Long Range、125 kbps時の感度: -107.5 dBmまで
- 最大送信電力: 19 dBm (BR/BLE)、13 dBm (EDR2/EDR3)
- BR/EDR2/EDR3のピーク受信電流: 3.3 V時に2.2 mA

### グラフィックス、ディスプレイ、マルチメディア { #graphics-display-and-multimedia }

- ePicasso 2.0 2D/2.5Dグラフィックスエンジン
- Vivante GCNanoUltraVベクターグラフィックスエンジン
- ハードウェアJPEGコーデック
- 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、MIPI DSI、JDIをサポートするデュアルLCDコントローラー
- TurboPixel: extDMAが最終フレームバッファを固定比率で非可逆圧縮し、ディスプレイコントローラーが伸長することで、ワークロードに必要なPSRAM帯域幅とフレームバッファ用容量を削減
- 両方のLCDコントローラーが常時表示（Always-on Display）に対応

### オーディオ { #audio }

- 24ビットオーディオDAC × 2
- 24ビットSigma-Delta ADC × 2
- PDMインターフェース × 2（PDM1/PDM2）
- I2Sインターフェース × 3（すべてマスターモード。I2S1は入力専用、I2S2/I2S3は入力と出力に対応）
- モジュールインターフェースからアナログオーディオを入出力可能

SiFliの [SF32LB58xハードウェア設計ガイド](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html)には、PDMマイク入力が2系統（PDM1、PDM2）と記載されています。1系統のPDMインターフェースでは左右チャンネルを使って2個のマイクを接続できます。SiFliの [PDM SDKサンプル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)では、1系統の左右チャンネルを使った2マイク録音と、PDM1/PDM2を使った4マイク録音の両方が示されています。ただし、対応プラットフォーム一覧にSF32LB58-MODは含まれていません。本モジュールでは、対象SDKが対応するマイク数・チャンネル構成を確認し、ピン多重化とキャリア基板の配線も検証してください。PDMインターフェース数だけを根拠に、4マイク構成に対応すると判断しないでください。

### ストレージインターフェースとモジュールバリアント { #storage-interfaces-and-module-variants }

<div align="center"><em>SF32LB58-MODモジュールバリアント</em></div>

<div align="center" markdown>

| モジュールコード | 選択可能なストレージ | PSRAM | 標準Flash | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 24 × 24 × 3.1 mm |

</div>

SiFliの[モジュール型番ガイド](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)には上記の型番が掲載され、必要に応じてeMMCをモジュール内部に実装でき、その他の構成もカスタマイズ可能と記載されています。必要な記憶媒体と容量に基づいてSKUを選択し、現在の提供状況とメモリー構成をSiFliに確認してください。採用を確定する前に、対象のSDKとファームウェアが選択したデバイスおよび起動・ストレージ経路に対応していることも確認してください。

### 電源、パッケージ、I/O { #power-package-and-io }

- モジュールパッケージ: 24 × 24 × 3.1 mm
- 動作温度: −40 °C～+85 °C
- VDD_3V3: 2.97～3.6 V
- VDD_1V8: 1.7～1.95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1.7～3.6 V
- VDD_3V3はAVDD33_ANA、AVDD33_AUD、AVDD_USBに給電し、eMMCを実装した場合はそのVDDにも給電します。この電源レールにはLDOの使用が推奨されています。
- VDD_1V8はPVDD1、PVDD2、AVDD_BRF、AVDD18_DSIおよびパッケージ内メモリーに給電します。
- VDDIOAはPA00～PA11以外のPA I/O、外付けFlash、およびeMMC搭載時のVIOに給電します。VDDIOA2はPA00～PA11、VDDIOBはPB I/Oに給電します。
- 138ピンのモジュールインターフェースを備え、マルチプレクスされた信号ピンからGPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 HS、オーディオなどの機能を利用できます

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB58x](../chips/SF32LB58x.md) をベースにしています。モジュールの基盤となる、より広範なグラフィックス、メモリー、ディスプレイのアーキテクチャについては、チップのページを参照してください。

### 開発キット { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) は、独自のキャリア基板を設計する前にファームウェアを検証し、ディスプレイを初期化して、オーディオ／ストレージ経路を確認するための実用的な評価プラットフォームです。

### リファレンス製品 { #reference-products }

SiFliが挙げる用途には、ウェアラブル機器、産業用ディスプレイ/HMI・監視機器、車載制御製品、スマート家電、低消費電力センサーハブ、Bluetooth Mesh製品が含まれます。
