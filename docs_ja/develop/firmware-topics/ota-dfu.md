---
icon: lucide/upload-cloud
description: "SiFli-SDK の DFU v2 ミドルウェアを使った USB-CDC、BLE、Bluetooth PAN 経由のファームウェア更新と、公式アプリ／ローダーのサンプル構成を説明します。"
tags:
    - 開発
    - OTA
    - DFU
---

# OTA と DFU { #ota-and-dfu }

DFU v2 は、DFU／OTA 更新フロー向けの SiFli-SDK ファームウェア更新ミドルウェアです。USB-CDC、BLE、Bluetooth PAN の 3 つの転送経路に対応し、それぞれにユーザーアプリケーションと対応するローダーのサブプロジェクトがあります。

まず、製品の更新経路に合う転送方式を選びます。対応するアプリケーションのサンプルから始めれば、ローダーは自動的にビルドへ組み込まれます。

## DFU v2 の構成 { #dfu-v2-structure }

<div align="center"><em>図: DFU v2 のサンプル構成</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

各経路のアプリケーションとローダーは、組み合わせて使うよう設計されています。アプリケーションをビルドすると、SDK は `building.py` の `AddDFU_*` ロジックを使って対応するローダーをサブプロジェクトとして追加するため、ローダーを個別にビルドする必要はありません。BLE サンプルでは、アプリケーションの実行中に HCPU 以外のファームウェアイメージを更新できます。HCPU のファームウェアイメージを更新する場合は、ローダーに切り替えて実行します。

## 互換性と設定 { #compatibility-and-configuration }

DFU v2 は既定で無効です。ミドルウェアの設定で `USING_DFU_V2` を明示的に有効にしてください。対象は HCPU（`BF0_HCPU`）のみで、旧 DFU オプション `BSP_USING_DFU` または `USING_DFU_PAN` とは併用できません。DFU v2 を有効にすると、再開可能な転送のため FlashDB（`PKG_USING_FLASHDB`）が選択されます。

USB CDC と BLE はプッシュ型の転送方式で、相互排他的です。`DFU_V2_USE_CDC_TRANSPORT` または `DFU_V2_USE_BLE_TRANSPORT` のどちらか一方を選択します。Bluetooth PAN はプル型の転送方式です。`DFU_V2_USE_PAN_TRANSPORT` とデバイス主導モード（`DFU_V2_USE_DEVICE_MODE`）を有効にし、WebClient を有効にしてください。製品の更新方式を決める前に、対象 SDK リリースで利用できる設定を確認してください。

## 更新経路の選択 { #choose-an-update-channel }

<div align="center"><em>表: DFU v2 の転送方式の選択</em></div>

<div align="center" markdown>

| 経路 | ドキュメントに記載された更新方法 | 主な用途 |
| --- | --- | --- |
| USB-CDC | PC から USB 仮想シリアルポート経由でデバイスを更新する。 | 製造、ラボ、有線サービスでの更新。 |
| BLE | BLE ペリフェラルアプリケーションが更新を受信する。 | モバイルアプリから接続中の製品を更新する。 |
| Bluetooth PAN | デバイスが Bluetooth PAN ネットワークを使い、HTTP サーバーから更新をダウンロードする。 | 更新イメージを自ら取得するネットワーク接続製品。 |

</div>

## 製品更新のレビュー { #product-update-review }

- [ ] 選択した転送方式が、製品で利用できる接続経路に合っている。
- [ ] アプリケーションと対応するローダーを、一連の更新フローとしてビルド／試験している。
- [ ] 対象ボードがサンプルの README でサポートされていることを確認している。
- [ ] 更新中断時の動作、復旧方法、工場でのサービス手順を定義している。
- [ ] 製品リリースに向け、ファームウェアイメージの真正性と完全性、バージョン方針、パーティション容量を確認している。
- [ ] アプリケーションが正常動作しない場合でも、更新失敗時のログを収集できる。

## DFU v2 サンプルのビルド { #build-a-dfu-v2-example }

サンプルの `project/` ディレクトリで、次のコマンドを実行します。

```bash
scons --board=<board-name> -j8
```

各サンプルの README に対応ボードが記載されています。DFU v2 ミドルウェアの設定は SiFli-SDK の `middleware/dfu_v2` にあります。

## DFU v2 SDK サンプル { #dfu-v2-sdk-examples }

<div align="center"><em>表: SF32LB58x 向け SiFli-SDK 公式 DFU v2 サンプル</em></div>

<div align="center" markdown>

| 経路 | ユーザーアプリケーション | ローダーのサブプロジェクト |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

完全なソース一覧と最新の SDK ナビゲーションは、[SiFli-SDK の DFU v2 サンプル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html)を参照してください。
