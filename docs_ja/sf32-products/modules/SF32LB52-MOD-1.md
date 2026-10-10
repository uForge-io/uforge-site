---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: SF32LB52x 向けの低消費電力 Bluetooth 5.3 MCU モジュールファミリー。RF 回路と 48 MHz 水晶振動子を搭載し、アンテナ方式は SKU によって異なります。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## 概要 { #overview }

SF32LB52-MOD-1 は、SF32LB52x プラットフォーム向けの低消費電力 Bluetooth MCU モジュールファミリーです。標準 SKU の N16R8 には SF32LB525UC6 が搭載されています。27.9 × 18.0 × 3.1 mm のモジュールに、デュアルコア Arm Cortex-M33 STAR-MC1 プラットフォーム、RF 回路、48 MHz 水晶振動子、アンテナ接続をまとめています。アンテナ方式は型番によって異なり、モジュール上の PCB アンテナまたは IPEX コネクター経由の外部アンテナを使用します。

DS5203 V0.3 にはモジュール上の PCB アンテナが記載されており、別モデルでは IPEX コネクター経由の外部アンテナにも対応すると説明されています。ただし、公開されているメモリ SKU 一覧とアンテナ方式の対応関係は示されていません。キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成を SiFli に確認してください。完成品では RF 性能を検証し、必要な製品認証を取得してください。モジュールのインターフェースを通じて、コンパクトな接続機器に必要な Bluetooth、グラフィックス、オーディオ機能を利用できます。

注文コードによっては、チップのパッケージ内に OPI-PSRAM を搭載した構成も選べます。GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 FS、アナログオーディオなど、チップファミリーの主要なインターフェースをモジュールから利用できます。

!!! info
    チップファミリーのアーキテクチャや周辺機能については、[SF32LB52x](../chips/SF32LB52x.md) を参照してください。このページでは、モジュールの実装、電源、パッケージ、型番の選び方を説明します。

## 用途 { #applications }

**SF32LB52-MOD-1 は、RF 回路や基板設計のリスクを抑えながら、Bluetooth、グラフィックス、オーディオ機能を必要とする製品に適しています。** たとえば、次の用途が挙げられます。

- スマートウォッチ、フィットネスバンド、医療用ウェアラブル機器
- Bluetooth センサーハブと接続アクセサリー
- スマートロック、スマートホームデバイス、コンパクトな家電
- 小型グラフィカル HMI 製品
- 車載キーフォブやウェアラブル型リモコン
- コストを抑えたネットワーク対応ディスプレイ機器

次の要件がある製品では、SF32LB52-MOD-1 が選択肢になります。

- モジュールに統合された RF 回路と、PCB アンテナまたは IPEX 外部アンテナの選択肢
- モジュールインターフェースを通じて利用できる、チッププラットフォームの Bluetooth、グラフィックス、オーディオ機能
- SF32LB52x のソフトウェアと周辺機能を再利用できること
- ウェアラブル機器や HMI 製品にも適したコンパクトなモジュール形状

## 開発リソース { #development-resources }

[モジュールのデータシート]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[チップ紹介]: ../chips/SF32LB52x.md
[ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[SiFli公式ハードウェア設計ガイド (wiki.sifli.com、EPD版)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[サンプルを購入]: https://sifli.taobao.com/
[開発キットを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[モジュールのデータシート]__
- :fontawesome-solid-microchip: __[チップ紹介]__
- :fontawesome-solid-file-lines: __[ハードウェア設計ガイド]__
- :fontawesome-solid-file-lines: __[SiFli公式ハードウェア設計ガイド (wiki.sifli.com、EPD版)]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__
- :fontawesome-solid-cart-shopping: __[開発キットを購入]__

</div>

---

## 機能と仕様 { #features-and-specifications }

### 演算とメモリ { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1 アプリケーションコア (HCPU): 最大 240 MHz、最大 370 DMIPS / 984 EEMBC CoreMark
- 命令キャッシュ 32 KB、データキャッシュ 16 KB
- リテンション SRAM: 512 KB
- 専用の超低消費電力 Arm Cortex-M33 STAR-MC1 コア (LCPU): 最大 24 MHz、リテンション SRAM 64 KB
- 両コアに単精度 FPU と MPU を搭載
- モジュール SKU に応じて選べる、チップのパッケージ内 OPI-PSRAM

### 無線接続 { #wireless-connectivity }

- BLE Audio 対応のデュアルモード Bluetooth 5.3
- 感度: -100 dBm (BLE/1 Mbps)、-96.3 dBm (BR)、-95.5 dBm (EDR2)
- 最大送信電力: 19 dBm (BR/BLE)、13 dBm (EDR2/EDR3)
- BR 受信時のピーク電流: 3.8 V 時に 2.4 mA

### グラフィックスとディスプレイ { #graphics-and-display }

- ePicasso 2.0 2D/2.5D グラフィックスエンジン
- eZip 2.0 ロスレス画像解凍アクセラレーター
- 8080、SPI、Dual-SPI、Quad-SPI インターフェースをサポートする LCD コントローラー
- 小型の腕時計型ディスプレイ製品や HMI 機器に適しています

### オーディオ { #audio }

- 24 ビットオーディオ DAC × 1
- 24 ビット Sigma-Delta オーディオ ADC × 1
- I2S インターフェース × 1
- PDM インターフェース × 1
- モジュールインターフェースから利用できるアナログオーディオ入力/出力

1 つの PDM インターフェースには最大 2 個のデジタルマイクを接続できます。PDM のインターフェース数と接続できるマイク数は同じではありません。実際の接続はピンの多重化とキャリア基板の配線に依存します。このモジュールでは、オプションの 32.768 kHz 水晶振動子を実装すると PA22/PA23 をモジュール外部から使用できません。ハードウェア設計ガイドには、別の PDM ピン配置も記載されています。

### ストレージインターフェース { #storage-interfaces }

- モジュール SKU に応じて選べる、チップのパッケージ内 OPI-PSRAM
- 外付け SPI NOR または SPI NAND 用 MPI (QSPI) × 1
- SD 3.0、SDIO 3.0、eMMC 対応 SD/SDIO × 1

### セキュリティ { #security }

- AES、HASH、CRC ハードウェアアクセラレーター
- 真性乱数発生器(TRNG)
- PSA Certified Level 1 認証

### 電源、パッケージ、I/O { #power-package-and-io }

- モジュールパッケージ: 27.9 × 18.0 × 3.1 mm
- 動作温度: −40 °C ～ +85 °C
- VSYS：リチウムイオン電池を直接接続する場合は 3.2–4.7 V、安定化電源を使う場合は 3.7–4.7 V。推奨電圧は 3.8 V。
- I/O 電圧: 3.3 V
- VBATS：電池電圧検出および ADC 測定用入力（0–4.7 V）。測定対象の電圧を直接入力し、外付けの抵抗分圧回路は使用しないでください。
- VDD33_VOUT2：外部ペリフェラルに給電できる、モジュール内蔵 3.3 V LDO 出力。初期状態は無効で、ソフトウェアによる有効化が必要です。最大出力電流は 150 mA、電源レールの総容量は 7.4 µF 以下です。
- 68 ピンのモジュールインターフェース。信号ピンは GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 FS、デジタル/アナログオーディオなどの機能に多重化できます

## モジュールバリアント { #module-variants }

<div align="center"><em>SF32LB52-MOD-1 モジュールバリアント</em></div>

<div align="center" markdown>

| モジュールコード | チップ | Flash | PSRAM | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C ～ +85 °C | 27.9 × 18.0 × 3.1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C ～ +85 °C | 27.9 × 18.0 × 3.1 mm |

</div>

SiFli の[モジュール型番ガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)と電子ペーパー向けアプリケーションガイドには A128R16 も記載されていますが、このページにリンクした DS5203 V0.3 仕様書には N16R8 しか掲載されていません。A128R16 を選定する前に、現行の供給状況とメモリ構成を SiFli に確認してください。

A128R16 の Flash 表記は公式資料間で異なります。[OpenSiFli のモジュール型番ガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)では 128 MB SPI-NAND とされる一方、SiFli の[開発ボード型番ガイド](https://wiki.sifli.com/board/devkit_guide.html)では対応する DevKit SKU が 128 MB QSPI-NAND とされています。資料には、実装部品の違いなのかインターフェース表記の違いなのか説明がありません。開発ボードの構成をモジュールの設計基準として使う前に、対象ボードのリビジョンに対応する回路図/BOMで Flash 部品とバスモードを確認してください。

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB52x](../chips/SF32LB52x.md) のアーキテクチャと周辺機能についてはチップのページを参照してください。各モジュール SKU のチップとメモリ構成は、上のバリアント表を確認してください。

### 開発キット { #development-kits }

[SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md)、[SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md)、[SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md)、[SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) は、独自のキャリア基板を設計する前にファームウェアを検証するための実用的な評価プラットフォームです。

### リファレンス製品 { #reference-products }

代表的な最終製品には、エントリーからミッドティアのスマートウォッチ、フィットネスバンド、Bluetooth センサーハブ、スマートロック、コンパクトなグラフィカル HMI デバイスなどがあります。
