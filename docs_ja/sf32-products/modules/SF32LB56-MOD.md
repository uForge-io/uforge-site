---
icon: lucide/card-sim
description: "SF32LB56-MOD: SF32LB56xVベースの汎用・低消費電力Bluetooth 5.3 MCUモジュールファミリー。標準構成はパッケージ内蔵の 4 MB + 8 MB OPI-PSRAMで、Flash構成はSKUごとに異なります。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB56-MOD { #sf32lb56-mod }

## 概要 { #overview }

SF32LB56-MODは、SF32LB56xVプラットフォームをベースにしたSiFliの汎用・低消費電力Bluetooth MCUモジュールファミリーです。標準構成はSF32LB566VCB36を採用し、パッケージ内蔵の4 MB + 8 MB OPI-PSRAMと1 MB QSPI-NORを搭載します。コンパクトなモジュールに、デュアルコアMCU、BLE Audio対応Bluetooth 5.3、グラフィックスアクセラレーション、オーディオインターフェース、SKUごとに異なるFlash構成、統合RF経路を備えています。

モジュールにはRF経路、水晶振動子、高速メモリーが集約され、アンテナはモジュール上のPCBアンテナまたはIPEX互換コネクターを介した外部アンテナから選べます。最終製品ではRF性能を検証し、キャリア基板のレイアウトを選択したアンテナ構成に合わせてください。モジュールのインターフェースとメモリー構成は、ディスプレイ、オーディオ、センサー、ローカル処理の要件に対応します。

このファミリーには複数のメモリー構成があり、いずれも外形寸法は18.0 × 32.9 × 3.1 mm、動作温度範囲は-40 °C～+85 °Cです。DS5602 V0.3を出典とする[SF32LB56-MODのハードウェア設計ガイド](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md)で、アンテナとレイアウトの詳細を確認できます。SiFliのモジュール型番ガイドにはメモリー構成が掲載されていますが、各SKUに対応するアンテナ方式は示されていません。キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成をSiFliに確認してください。

!!! info
    以下の演算、グラフィックス、オーディオ機能は、モジュールに搭載されたSF32LB56xVプラットフォームのものです。外部から利用できる機能は、89ピンのモジュールインターフェースとピン多重化に依存します。チップファミリーのアーキテクチャと全ペリフェラルについては [SF32LB56x](../chips/SF32LB56x.md) を参照してください。このページでは、モジュールの統合、SKUごとのメモリー構成、電源ライン、製品要件への適合性を扱います。

## 用途 { #applications }

SiFliがSF32LB56-MODの用途として挙げている分野は次のとおりです。

- ウェアラブル: ハイエンドスマートウォッチ、スマートバンド、ウェアラブル医療機器、フィットネス機器
- 産業: コストパフォーマンスに優れたディスプレイ、グラフィカルHMI、産業用センサーの制御センター、設備監視、計測器
- 車載: 電気自動車向けの中央制御機器、自動車用キー、ウェアラブル型の車載リモコン
- ホームオートメーション: 小型・中型のスマート家電、スマートロック
- 汎用: 低消費電力センサーハブ、Bluetooth Mesh
- AIoTの例: 音声コマンド認識、スマートホーム、スマートキー、スマートコントロールパネル

次の要件がある製品では、SF32LB56-MODが選択肢になります。

- RF経路、アンテナオプション、水晶振動子、高速メモリーをモジュールに集約
- SKUごとに異なるメモリー構成
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

### 演算とメモリー { #compute-and-memory }

- HCPU: Arm Cortex-M33 STAR-MC1、最大240 MHz、最大370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1、最大96 MHz、最大148 DMIPS / 394 EEMBC CoreMark
- HCPUメモリーシステム: 命令キャッシュ32 KB、データキャッシュ16 KB、SRAM 800 KB（うち128 KBはリテンションSRAM）
- LCPUメモリーシステム: 命令キャッシュ16 KB、データキャッシュ8 KB、リテンションSRAM 160 KB
- 両コアに単精度FPUとMPUを搭載
- より負荷の高いローカル処理向けのニューラルネットワーク行列アクセラレーターと信号処理アクセラレーター

### 無線接続 { #wireless-connectivity }

- BLE Audio対応のデュアルモードBluetooth 5.3
- 感度: BLE 1Mbpsで-100dBm、BRで-96.3dBm、EDR2で-95.5dBm、EDR3で-88.5dBm
- 最大送信電力: BR/BLEで19dBm、EDR2/EDR3で13dBm
- BR受信ピーク電流: 3.3Vで2.2mA

### グラフィックスとディスプレイ { #graphics-and-display }

- ePicasso 2.0 2D/2.5Dグラフィックスエンジン
- ハードウェアによる回転、スケーリング、ミラーリング、アルファブレンディング
- 最大1024 × 1024のグラフィックス処理に対応
- eZip 2.0によるロスレスグラフィックス解凍とeZip-Aアニメーションに対応
- 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、JDIに対応するLCDサポート
- TurboPixel: extDMAが最終フレームバッファを固定比率で非可逆圧縮し、ディスプレイコントローラーが伸長することで、ワークロードに必要なPSRAM帯域幅とフレームバッファ用容量を削減

### オーディオ { #audio }

- 24ビットオーディオDAC × 1
- 24ビットSigma-DeltaオーディオADC × 1
- PDMインターフェース × 2（PDM1/PDM2、各インターフェースが左右チャンネルに対応）
- I2Sインターフェース × 1
- オーディオサンプルレート変換とEQアクセラレーション

各PDMインターフェースには最大2個のデジタルマイクを接続できるため、2つのインターフェースで合計最大4個に対応します。PDMのインターフェース数とマイク数は同じではありません。実際の接続はピンの多重化と基板配線に依存します。

### メモリーとモジュールバリアント { #memory-and-module-variants }

<div align="center"><em>SF32LB56-MODメモリー構成</em></div>

<div align="center" markdown>

| モジュールコード | SKU別Flash | PSRAM | 標準Flash | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C～+85 °C | 18.0 × 32.9 × 3.1 mm |

</div>

SiFliの[モジュール型番ガイド](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)には上記3構成が掲載され、その他の構成も必要に応じてカスタマイズできると記載されています。選定前に、現在入手可能なSKUとメモリー構成をSiFliに確認してください。

SiFliは、SF32LB566VCB36に4 MB + 8 MBのOPI-PSRAMと1 MB QSPI-NORを組み合わせた構成を標準構成として示しており、このメモリー構成はN16R12N1と一致します。モデルガイドにはA128R12N1とD128R12N1それぞれに搭載されるチップの型番は記載されていません。これらのSKUを選ぶ場合は、正確なチップの型番をSiFliに確認してください。

### 電源とI/O { #power-and-io }

- VDD_3V3の推奨動作範囲: 2.97～3.6 V
- VDD_1V8の推奨動作範囲: 1.7～1.95 V
- VDDIOの推奨動作範囲: 1.7～3.6 V
- VDD_3V3、VDD_1V8、VDDIOは同時に電源投入する必要があります
- PA00～PA11のインターフェースレベルは3.3 Vに固定されており、VDDIOには追従しません
- 89ピンのモジュールインターフェース
- 動作温度: −40 °C～+85 °C

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB56x](../chips/SF32LB56x.md)、具体的にはSF32LB56xVプラットフォームファミリーをベースにしています。モジュールの基盤となるチップのアーキテクチャ、ディスプレイ、オーディオ、パッケージの詳細は、チップのページを参照してください。

### 開発キット { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) は、ディスプレイ、オーディオ、ストレージ、周辺ドライバーの検証に使えます。開発ボードの資料にはN16R12N1とA128R12N1の構成が記載されています。メモリー構成を設計の基準にする前に、実機のモジュール刻印と基板リビジョンを確認してください。

### リファレンス製品 { #reference-products }

SiFliが挙げる用途には、ウェアラブル機器、産業用ディスプレイ/HMI・監視機器、車載制御製品、スマート家電、低消費電力センサーハブ、Bluetooth Mesh製品が含まれます。
