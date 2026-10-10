---
icon: lucide/card-sim
description: "SF32LB56-MOD: SF32LB56xV ベースの汎用・低消費電力 Bluetooth 5.3 MCU モジュールファミリー。標準構成は合封の 4 MB + 8 MB OPI-PSRAM で、Flash 構成は SKU ごとに異なります。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB56-MOD { #sf32lb56-mod }

## 概要 { #overview }

SF32LB56-MOD は、SF32LB56xV プラットフォームをベースにした SiFli の汎用・低消費電力 Bluetooth MCU モジュールファミリーです。標準構成は SF32LB566VCB36 を採用し、合封の 4 MB + 8 MB OPI-PSRAM と 1 MB QSPI-NOR を搭載します。コンパクトなモジュールに、デュアルコア MCU、BLE Audio 対応 Bluetooth 5.3、グラフィックスアクセラレーション、オーディオインターフェース、SKU ごとに異なる Flash 構成、統合 RF 経路を備えています。

モジュールには RF 経路、水晶振動子、高速メモリが集約され、アンテナはモジュール上の PCB アンテナまたは IPEX 互換コネクターを介した外部アンテナから選べます。最終製品では RF 性能を検証し、キャリア基板のレイアウトを選択したアンテナ構成に合わせてください。モジュールのインターフェースとメモリ構成は、ディスプレイ、オーディオ、センサー、ローカル処理の要件に対応します。

このファミリーには複数のメモリ構成があり、いずれも外形寸法は 18.0 × 32.9 × 3.1 mm、動作温度範囲は -40 °C ～ +85 °C です。DS5602 V0.3 を出典とする[SF32LB56-MOD のハードウェア設計ガイド](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md)で、アンテナとレイアウトの詳細を確認できます。SiFli のモジュール型番ガイドにはメモリ構成が掲載されていますが、各 SKU に対応するアンテナ方式は示されていません。キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成を SiFli に確認してください。

!!! info
    以下の演算、グラフィックス、オーディオ機能は、モジュールに搭載された SF32LB56xV プラットフォームのものです。外部から利用できる機能は、89 ピンのモジュールインターフェースとピン多重化に依存します。チップファミリーのアーキテクチャと全ペリフェラルについては [SF32LB56x](../chips/SF32LB56x.md) を参照してください。このページでは、モジュールの統合、SKU ごとのメモリ構成、電源ライン、製品要件への適合性を扱います。

## 用途 { #applications }

SiFli が SF32LB56-MOD の用途として挙げている分野は次のとおりです。

- ウェアラブル: ハイエンドスマートウォッチ、スマートバンド、ウェアラブル医療機器、フィットネス機器
- 産業: コストパフォーマンスに優れたディスプレイ、グラフィカル HMI、産業用センサーの制御センター、設備監視、計測器
- 車載: 電気自動車向けの中央制御機器、自動車用キー、ウェアラブル型の車載リモコン
- ホームオートメーション: 小型・中型のスマート家電、スマートロック
- 汎用: 低消費電力センサーハブ、Bluetooth Mesh
- AIoT の例: 音声コマンド認識、スマートホーム、スマートキー、スマートコントロールパネル

次の要件がある製品では、SF32LB56-MOD が選択肢になります。

- RF 経路、アンテナオプション、水晶振動子、高速メモリをモジュールに集約
- SKU ごとに異なるメモリ構成
- ディスプレイ、オーディオ、センサー、ローカル処理用のインターフェース
- 省スペース製品に適したコンパクトなモジュール寸法

## 開発リソース { #development-resources }

[モジュールのデータシート]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[チップ紹介]: ../chips/SF32LB56x.md
[ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[モジュールのデータシート]__
- :fontawesome-solid-microchip: __[チップ紹介]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド]__
- :fontawesome-solid-file-lines: __[SF32LB56x ハードウェア設計ガイド]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specifications }

### 演算とメモリ { #compute-and-memory }

- HCPU: Arm Cortex-M33 STAR-MC1、最大 240 MHz、最大 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1、最大 96 MHz、最大 148 DMIPS / 394 EEMBC CoreMark
- HCPU メモリシステム: 命令キャッシュ 32 KB、データキャッシュ 16 KB、SRAM 800 KB（うち 128 KB はリテンション SRAM）
- LCPU メモリシステム: 命令キャッシュ 16 KB、データキャッシュ 8 KB、リテンション SRAM 160 KB
- 両コアに単精度 FPU と MPU を搭載
- より負荷の高いローカル処理向けのニューラルネットワーク行列アクセラレーターと信号処理アクセラレーター

### 無線接続 { #wireless-connectivity }

- BLE Audio 対応のデュアルモード Bluetooth 5.3
- 感度: BLE 1Mbps で -100dBm、BR で -96.3dBm、EDR2 で -95.5dBm、EDR3 で -88.5dBm
- 最大送信電力: BR/BLE で 19dBm、EDR2/EDR3 で 13dBm
- BR 受信ピーク電流: 3.3V で 2.2mA

### グラフィックスとディスプレイ { #graphics-and-display }

- ePicasso 2.0 2D/2.5D グラフィックスエンジン
- ハードウェアによる回転、スケーリング、ミラーリング、アルファブレンディング
- 最大 1024 × 1024 のグラフィックス処理に対応
- eZip 2.0 によるロスレスグラフィックス解凍と eZip-A アニメーションに対応
- 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、JDI に対応する LCD サポート
- TurboPixel: extDMA が最終フレームバッファを固定比率で非可逆圧縮し、ディスプレイコントローラーが伸長することで、ワークロードに必要な PSRAM 帯域幅とフレームバッファ用容量を削減

### オーディオ { #audio }

- 24 ビットオーディオ DAC × 1
- 24 ビット Sigma-Delta オーディオ ADC × 1
- PDM インターフェース × 2（PDM1/PDM2、各インターフェースが左右チャンネルに対応）
- I2S インターフェース × 1
- オーディオサンプルレート変換と EQ アクセラレーション

各 PDM インターフェースには最大 2 個のデジタルマイクを接続できるため、2 つのインターフェースで合計最大 4 個に対応します。PDM のインターフェース数とマイク数は同じではありません。実際の接続はピンの多重化と基板配線に依存します。

### メモリとモジュールバリアント { #memory-and-module-variants }

<div align="center"><em>SF32LB56-MOD メモリ構成</em></div>

<div align="center" markdown>

| モジュールコード | SKU 別 Flash | PSRAM | 標準 Flash | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C ～ +85 °C | 18.0 × 32.9 × 3.1 mm |

</div>

SiFli の[モジュール型番ガイド](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)には上記3構成が掲載され、その他の構成も必要に応じてカスタマイズできると記載されています。選定前に、現在入手可能なSKUとメモリ構成をSiFliに確認してください。

SiFli は、SF32LB566VCB36 に 4 MB + 8 MB の合封 OPI-PSRAM と 1 MB QSPI-NOR を組み合わせた構成を標準構成として示しており、このメモリ構成は N16R12N1 と一致します。モデルガイドには A128R12N1 と D128R12N1 それぞれに搭載されるチップの型番は記載されていません。これらの SKU を選ぶ場合は、正確なチップの型番を SiFli に確認してください。

### 電源と I/O { #power-and-io }

- VDD_3V3 の推奨動作範囲: 2.97–3.6 V
- VDD_1V8 の推奨動作範囲: 1.7–1.95 V
- VDDIO の推奨動作範囲: 1.7–3.6 V
- VDD_3V3、VDD_1V8、VDDIO は同時に電源投入する必要があります
- PA00–PA11 のインターフェースレベルは 3.3 V に固定されており、VDDIO には追従しません
- 89 ピンのモジュールインターフェース
- 動作温度: −40 °C ～ +85 °C

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB56x](../chips/SF32LB56x.md)、具体的には SF32LB56xV プラットフォームファミリーをベースにしています。モジュールの基盤となるチップのアーキテクチャ、ディスプレイ、オーディオ、パッケージの詳細は、チップのページを参照してください。

### 開発キット { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) は、ディスプレイ、オーディオ、ストレージ、周辺ドライバーの検証に使えます。開発ボードの資料には N16R12N1 と A128R12N1 の構成が記載されています。メモリ構成を設計の基準にする前に、実機のモジュール刻印と基板リビジョンを確認してください。

### リファレンス製品 { #reference-products }

SiFli が挙げる用途には、ウェアラブル機器、産業用ディスプレイ/HMI・監視機器、車載制御製品、スマート家電、低消費電力センサーハブ、Bluetooth Mesh 製品が含まれます。
