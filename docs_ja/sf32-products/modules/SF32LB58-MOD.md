---
icon: lucide/card-sim
description: "SF32LB58-MOD: SF32LB586VDD36 ベースの低消費電力 Bluetooth MCU モジュール。標準構成は 16 + 16 MB HPI-PSRAM と 1 MB QSPI-NOR で、NOR、NAND、eMMC のストレージ構成を選べます。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB58-MOD { #sf32lb58-mod }

## 概要 { #overview }

SF32LB58-MOD は、SiFli の SF32LB586VDD36 をベースにした低消費電力 Bluetooth MCU モジュールです。標準構成では 16 + 16 MB の HPI-PSRAM をパッケージ内に搭載し、1 MB の QSPI-NOR を備えます。24 × 24 × 3.1 mm のモジュールに、3 コアプラットフォーム、RF 回路、水晶振動子、複数のメモリ構成を集約し、ディスプレイ、オーディオ、ストレージ、制御用の外部インターフェースを提供します。

このモジュールは BGA256 チップ、RF 回路、水晶振動子、高速メモリをモジュール上に集約し、製品側キャリア基板の関連配線を減らします。完成品では RF 性能を検証し、適用される規制要件を満たしてください。キャリア基板の設計を確定する前に、選択した SKU のアンテナ方式とメモリ構成を確認してください。

選択するモジュール SKU に応じて、HPI-PSRAM と QSPI-NOR、QSPI-NAND、または eMMC を組み合わせられます。外部インターフェースを活用すれば、MCU クラスのプラットフォームを維持しながら、ディスプレイ、オーディオ、ストレージ、接続機能を備えた製品を構成できます。

DS5802 V0.1 には、モジュール上のPCBアンテナと外部アンテナ接続方式が記載されています。外部アンテナはキャスタレーション端子から引き出す方法、または第1世代の外部アンテナコネクターを介して接続する方法があり、後者は Hirose U.FL、I-PEX MHFI、Amphenol AMC の各コネクターに対応します。SKUごとの方式は示されていないため、キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成をSiFliに確認してください。

!!! info
    チップファミリーのアーキテクチャや周辺機能については、[SF32LB58x](../chips/SF32LB58x.md) を参照してください。このページでは、モジュール固有の実装、メモリ構成、電源レール、製品選定のポイントを説明します。

## 用途 { #applications }

SiFli が SF32LB58-MOD の用途として挙げている分野は次のとおりです。

- ウェアラブル: ハイエンドスマートウォッチ、スマートバンド、ウェアラブル医療機器、フィットネス機器
- 産業: コストパフォーマンスに優れたディスプレイ、グラフィカル HMI、産業用センサー制御センター、設備監視、計測器
- 車載: 電気自動車向けの中央制御装置、車載キー、ウェアラブル端末型の車載リモコン
- ホームオートメーション: 小型・中型のスマート家電、スマートロック
- 汎用: 低消費電力センサーハブ、Bluetooth Mesh
- AIoT の例: 音声コマンド認識、スマートホーム、スマートキー、スマートコントロールパネル

次の要件に対応する必要がある場合は、SF32LB58-MOD を候補にしてください。

- BGA256 チップ、RF 回路、水晶振動子、高速メモリをモジュールに集約
- モジュール上の PCB アンテナ、またはキャスタレーション端子／Hirose U.FL、I-PEX MHFI、Amphenol AMC 各コネクターに対応する外部アンテナ接続（SKU ごとの構成確認が必要）
- QSPI-NOR、QSPI-NAND、eMMC から選べるストレージ構成
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

### 演算とメモリ { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1 アプリケーションコア × 2、最大 240 MHz
- ユーザープログラム可能な Arm Cortex-M33 STAR-MC1 低消費電力コア × 1、最大 96 MHz
- アプリケーションコアあたり最大 370 DMIPS / 984 EEMBC CoreMark
- 低消費電力コアで最大 148 DMIPS / 394 EEMBC CoreMark
- SRAM: 2176 KB (HCPU) + 512 KB (ACPU) + 1056 KB (LCPU、リテンション SRAM)
- すべてのコアに単精度 FPU と MPU を搭載

### 無線接続 { #wireless-connectivity }

- BLE Audio 対応のデュアルモード Bluetooth 5.3
- BLE Long Range、125 kbps 時の感度: -107.5 dBm まで
- 最大送信電力: 19 dBm (BR/BLE)、13 dBm (EDR2/EDR3)
- BR/EDR2/EDR3 のピーク受信電流: 3.3 V 時に 2.2 mA

### グラフィックス、ディスプレイ、マルチメディア { #graphics-display-and-multimedia }

- ePicasso 2.0 2D/2.5D グラフィックスエンジン
- Vivante GCNanoUltraV ベクターグラフィックスエンジン
- ハードウェア JPEG コーデック
- 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、MIPI DSI、JDI をサポートするデュアル LCD コントローラー
- TurboPixel: extDMA が最終フレームバッファを固定比率で非可逆圧縮し、ディスプレイコントローラーが伸長することで、ワークロードに必要な PSRAM 帯域幅とフレームバッファ用容量を削減
- 両方の LCD コントローラーが常時表示（Always-on Display）に対応

### オーディオ { #audio }

- 24 ビットオーディオ DAC × 2
- 24 ビット Sigma-Delta ADC × 2
- PDM インターフェース × 2（PDM1/PDM2）
- I2S インターフェース × 3（すべてマスターモード。I2S1 は入力専用、I2S2/I2S3 は入力と出力に対応）
- モジュールインターフェースからアナログオーディオを入出力可能

SiFli の [SF32LB58x ハードウェア設計ガイド](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html)には、PDM マイク入力が 2 系統（PDM1、PDM2）と記載されています。1 系統の PDM インターフェースでは左右チャンネルを使って 2 個のマイクを接続できます。SiFli の [PDM SDK サンプル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)では、1 系統の左右チャンネルを使った 2 マイク録音と、PDM1/PDM2 を使った 4 マイク録音の両方が示されています。ただし、対応プラットフォーム一覧に SF32LB58-MOD は含まれていません。本モジュールでは、対象 SDK が対応するマイク数・チャンネル構成を確認し、ピン多重化とキャリア基板の配線も検証してください。PDM インターフェース数だけを根拠に、4 マイク構成に対応すると判断しないでください。

### ストレージインターフェースとモジュールバリアント { #storage-interfaces-and-module-variants }

<div align="center"><em>SF32LB58-MOD モジュールバリアント</em></div>

<div align="center" markdown>

| モジュールコード | 選択可能なストレージ | PSRAM | 標準 Flash | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 24 × 24 × 3.1 mm |

</div>

SiFli の[モジュール型番ガイド](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)には上記の型番が掲載され、必要に応じてeMMCをモジュール内部に実装でき、その他の構成もカスタマイズ可能と記載されています。必要な記憶媒体と容量に基づいてSKUを選択し、現在の提供状況とメモリ構成をSiFliに確認してください。採用を確定する前に、対象のSDKとファームウェアが選択したデバイスおよび起動・ストレージ経路に対応していることも確認してください。

### 電源、パッケージ、I/O { #power-package-and-io }

- モジュールパッケージ: 24 × 24 × 3.1 mm
- 動作温度: −40 °C ～ +85 °C
- VDD_3V3: 2.97–3.6 V
- VDD_1V8: 1.7–1.95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1.7–3.6 V
- VDD_3V3 は AVDD33_ANA、AVDD33_AUD、AVDD_USB に給電し、eMMC を実装した場合はその VDD にも給電します。この電源レールには LDO の使用が推奨されています。
- VDD_1V8 は PVDD1、PVDD2、AVDD_BRF、AVDD18_DSI およびパッケージ内メモリに給電します。
- VDDIOA は PA00–PA11 以外の PA I/O、外付け Flash、および eMMC 搭載時の VIO に給電します。VDDIOA2 は PA00–PA11、VDDIOB は PB I/O に給電します。
- 138 ピンのモジュールインターフェースを備え、マルチプレクスされた信号ピンから GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 HS、オーディオなどの機能を利用できます

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB58x](../chips/SF32LB58x.md) をベースにしています。モジュールの背後にある、より広範なグラフィックス、メモリ、ディスプレイのアーキテクチャについては、チップのページを参照してください。

### 開発キット { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) は、独自のキャリア基板を設計する前にファームウェアを検証し、ディスプレイを初期化して、オーディオ／ストレージ経路を確認するための実用的な評価プラットフォームです。

### リファレンス製品 { #reference-products }

SiFli が挙げる用途には、ウェアラブル機器、産業用ディスプレイ/HMI・監視機器、車載制御製品、スマート家電、低消費電力センサーハブ、Bluetooth Mesh 製品が含まれます。
