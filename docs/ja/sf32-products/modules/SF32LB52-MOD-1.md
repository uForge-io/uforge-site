---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: SF32LB52x向けの低消費電力Bluetooth 5.3 MCUモジュールファミリー。RF回路と 48 MHz水晶振動子を搭載し、アンテナ方式はSKUによって異なります。"
tags:
  - ハードウェア
  - モジュール
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## 概要 { #overview }

SF32LB52-MOD-1は、SF32LB52xプラットフォーム向けの低消費電力Bluetooth MCUモジュールファミリーです。標準SKUのN16R8にはSF32LB525UC6が搭載されています。27.9 × 18.0 × 3.1 mmのモジュールに、デュアルコアArm Cortex-M33 STAR-MC1プラットフォーム、RF回路、48 MHz水晶振動子、アンテナ接続をまとめています。アンテナ方式は型番によって異なり、モジュール上のPCBアンテナまたはIPEXコネクター経由の外部アンテナを使用します。

DS5203 V0.3にはモジュール上のPCBアンテナが記載されており、別モデルではIPEXコネクター経由の外部アンテナにも対応すると説明されています。ただし、公開されているメモリーSKU一覧とアンテナ方式の対応関係は示されていません。キャリア基板のレイアウトを確定する前に、選択したモジュールのアンテナ構成をSiFliに確認してください。完成品ではRF性能を検証し、必要な製品認証を取得してください。モジュールのインターフェースを通じて、コンパクトな接続機器に必要なBluetooth、グラフィックス、オーディオ機能を利用できます。

注文コードによっては、チップのパッケージ内にOPI-PSRAMを搭載した構成も選べます。GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 FS、アナログオーディオなど、チップファミリーの主要なインターフェースをモジュールから利用できます。

!!! info
    チップファミリーのアーキテクチャや周辺機能については、[SF32LB52x](../chips/SF32LB52x.md) を参照してください。このページでは、モジュールの実装、電源、パッケージ、型番の選び方を説明します。

## 用途 { #applications }

**SF32LB52-MOD-1は、RF回路や基板設計のリスクを抑えながら、Bluetooth、グラフィックス、オーディオ機能を必要とする製品に推奨されます。** たとえば、次の用途が挙げられます。

- スマートウォッチ、フィットネスバンド、医療用ウェアラブル機器
- Bluetoothセンサーハブと接続アクセサリー
- スマートロック、スマートホームデバイス、コンパクトな家電
- 小型グラフィカルHMI製品
- 車載キーフォブやウェアラブル型リモコン
- コストを抑えたネットワーク対応ディスプレイ機器

次の要件がある製品では、SF32LB52-MOD-1が選択肢になります。

- モジュールに統合されたRF回路と、PCBアンテナまたはIPEX外部アンテナの選択肢
- モジュールインターフェースを通じて利用できる、チッププラットフォームのBluetooth、グラフィックス、オーディオ機能
- SF32LB52xのソフトウェアと周辺機能を再利用できること
- ウェアラブル機器やHMI製品にも適したコンパクトなモジュール形状

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

### 演算とメモリー { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1アプリケーションコア (HCPU): 最大240 MHz、最大370 DMIPS / 984 EEMBC CoreMark
- 命令キャッシュ32 KB、データキャッシュ16 KB
- リテンションSRAM: 512 KB
- 専用の超低消費電力Arm Cortex-M33 STAR-MC1コア (LCPU): 最大24 MHz、リテンションSRAM 64 KB
- 両コアに単精度FPUとMPUを搭載
- モジュールSKUに応じて選べる、チップのパッケージ内OPI-PSRAM

### 無線接続 { #wireless-connectivity }

- BLE Audio対応のデュアルモードBluetooth 5.3
- 感度: -100 dBm (BLE/1 Mbps)、-96.3 dBm (BR)、-95.5 dBm (EDR2)
- 最大送信電力: 19 dBm (BR/BLE)、13 dBm (EDR2/EDR3)
- BR受信時のピーク電流: 3.8 V時に2.4 mA

### グラフィックスとディスプレイ { #graphics-and-display }

- ePicasso 2.0 2D/2.5Dグラフィックスエンジン
- eZip 2.0ロスレス画像解凍アクセラレーター
- 8080、SPI、Dual-SPI、Quad-SPIインターフェースをサポートするLCDコントローラー
- 小型の腕時計型ディスプレイ製品やHMI機器に適しています

### オーディオ { #audio }

- 24ビットオーディオDAC × 1
- 24ビットSigma-DeltaオーディオADC × 1
- I2Sインターフェース × 1
- PDMインターフェース × 1
- モジュールインターフェースから利用できるアナログオーディオ入力/出力

1つのPDMインターフェースには最大2個のデジタルマイクを接続できます。PDMのインターフェース数と接続できるマイク数は同じではありません。実際の接続はピンの多重化とキャリア基板の配線に依存します。このモジュールでは、オプションの32.768 kHz水晶振動子を実装するとPA22/PA23をモジュール外部から使用できません。ハードウェア設計ガイドには、別のPDMピン配置も記載されています。

### ストレージインターフェース { #storage-interfaces }

- モジュールSKUに応じて選べる、チップのパッケージ内OPI-PSRAM
- 外付けSPI NORまたはSPI NAND用MPI (QSPI) × 1
- SD 3.0、SDIO 3.0、eMMC対応SD/SDIO × 1

### セキュリティ { #security }

- AES、HASH、CRCハードウェアアクセラレーター
- 真性乱数発生器(TRNG)
- PSA Certified Level 1認証

### 電源、パッケージ、I/O { #power-package-and-io }

- モジュールパッケージ: 27.9 × 18.0 × 3.1 mm
- 動作温度: −40 °C～+85 °C
- VSYS：リチウムイオン電池を直接接続する場合は3.2～4.7 V、安定化電源を使う場合は3.7～4.7 V。推奨電圧は3.8 V。
- I/O電圧: 3.3 V
- VBATS：電池電圧検出およびADC測定用入力（0～4.7 V）。測定対象の電圧を直接入力し、外付けの抵抗分圧回路は使用しないでください。
- VDD33_VOUT2：外部ペリフェラルに給電できる、モジュール内蔵3.3 V LDO出力。初期状態は無効で、ソフトウェアによる有効化が必要です。最大出力電流は150 mA、電源レールの総容量は7.4 µF以下です。
- 68ピンのモジュールインターフェース。信号ピンはGPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 FS、デジタル/アナログオーディオなどの機能に多重化できます

## モジュールバリアント { #module-variants }

<div align="center"><em>SF32LB52-MOD-1モジュールバリアント</em></div>

<div align="center" markdown>

| モジュールコード | チップ | Flash | PSRAM | 動作温度 | 寸法 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C～+85 °C | 27.9 × 18.0 × 3.1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C～+85 °C | 27.9 × 18.0 × 3.1 mm |

</div>

SiFliの[モジュール型番ガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)と電子ペーパー向けアプリケーションガイドにはA128R16も記載されていますが、このページにリンクしたDS5203 V0.3仕様書にはN16R8しか掲載されていません。A128R16を選定する前に、現行の供給状況とメモリー構成をSiFliに確認してください。

A128R16のFlash表記は公式資料間で異なります。[OpenSiFliのモジュール型番ガイド](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)では128 MB SPI-NANDとされる一方、SiFliの[開発ボード型番ガイド](https://wiki.sifli.com/board/devkit_guide.html)では対応するDevKit SKUが128 MB QSPI-NANDとされています。資料には、実装部品の違いなのかインターフェース表記の違いなのか説明がありません。開発ボードの構成をモジュールの設計基準として使う前に、対象ボードのリビジョンに対応する回路図/BOMでFlash部品とバスモードを確認してください。

## 関連製品 { #related-products }

### チップ { #chip }

[SF32LB52x](../chips/SF32LB52x.md) のアーキテクチャと周辺機能についてはチップのページを参照してください。各モジュールSKUのチップとメモリー構成は、上のバリアント表を確認してください。

### 開発キット { #development-kits }

[SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md)、[SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md)、[SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md)、[SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) は、独自のキャリア基板を設計する前にファームウェアを検証するための実用的な評価プラットフォームです。

### リファレンス製品 { #reference-products }

代表的な最終製品には、エントリーからミッドティアのスマートウォッチ、フィットネスバンド、Bluetoothセンサーハブ、スマートロック、コンパクトなグラフィカルHMIデバイスなどがあります。
