---
icon: lucide/radio-tower
title: "SiFli SDKでのRF試験"
description: "目的に合うBluetooth RF試験モード、制御経路、測定器を選択する方法を説明します。"
tags: [開発, SiFli-SDK, アプリケーションノート, RF]
---

# SiFli SDKでのRF試験 { #run-sifli-sdk-rf-tests }

SDKではBluetooth RF検証をシグナリング、非シグナリング、個別RF試験に分けています。試験用ファームウェアを読み込む前に、目的に合った方法を選んでください。

<div align="center" markdown>
<em>表: ファミリー別RF試験コンテンツの適用範囲</em>

| 内容 | ファミリーごとの適用範囲 |
|---|---|
| 試験モードの比較と測定手順 | SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x、SF32LB58x向けの統合ワークフロー。 |
| Bluetooth Classic試験の対応状況 | Bluetooth Classicに対応するターゲットでのみ実施できます。SF32LB55xはBLEのみをサポートし、Bluetooth Classicの試験には対応しません。このファミリーではBLEの試験手順を使用してください。 |
| SF32LB57xのテストツール対応 | [RF Test Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) にはSF32LB57xのUARTピンが記載されていますが、[SiFli_RfToolマニュアル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) のプラットフォーム選択肢に57xはありません。この情報はピン配置の根拠としてのみ扱い、対象SDKリリースで利用できるテスト経路を確認してください。 |
| 接続構成の図とHCIコマンド一覧 | SiFliのガイドに掲載されたSF32LB52xの例。他ファミリーでは、実装に対象ファミリーのコマンド／ピン資料を使う。 |
| `CONFIG_BT_RF_TEST`の設定 | ドキュメントに記載された55x以外の経路に適用。SF32LB55xの`bt_rftest`経路ではこのシンボルを使わない。 |
| UARTピン、パケット値、コマンド構文 | 対象ファミリーとSDKリリースに依存する。プロジェクト設定と`bt_rftest help`を確認する。 |

</div>

!!! warning "公式ガイド間でSF32LB58xのUART1ピン割り当てが不一致です"
    [一般RFテストガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)ではUART1 TX/RXをPA31/PA32、[Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)ではPA32/PA31と記載しています。配線前に、対象ファームウェアのテスト経路と基板のpinmuxを確認してください。ガイドごとに割り当てが異なります。

## 試験モードの選択 { #select-the-test-mode }

<div align="center" markdown>
<em>表: Bluetooth RF試験モードの選択</em>

| モード | 用途 | SDKの入口 | 制御経路 |
|---|---|---|---|
| BTシグナリング | BQB/QDID認証とプロトコル準拠の性能評価 | `bt_cm dut`, `gap_enb_dut_mode_req()` | テスターの無線インターフェースとLMP試験制御 |
| BT非シグナリング | 開発時のRF調整と量産スクリーニング | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | ローカルのベンダーHCI |
| BLE非シグナリング (SIG DTM) | BLE RFスクリーニングとSIG DTM項目 | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | ローカルHCI、または`bt_cm uart_dut`で転送する標準HCI |
| 個別RF試験 | 基板レベルのRF調整とFCC/CE認証前評価 | `bt_cm uart_dut` + `SiFli_RfTool` | PCツールが低レベル操作を1項目ずつ送信 |

</div>

シグナリングでは実際のBluetoothリンクを確立し、認証試験に使います。非シグナリングではRFを特定のチャネルと電力に固定し、送信または受信状態を維持します。開発や量産で一般的に使われる方法です。個別RF試験ではPCツールからキャリアまたは変調を細かく制御し、アナライザーまたはパワーメーターで測定します。BT非シグナリングと個別RF試験はSiFli独自のワークフローであり、BQB試験ではありません。

以下の接続構成図はSF32LB52xのRF試験ガイドに基づいています。PC、DUT、テスター、UART/HCI/RFの経路の違いを示しています。実際の既定UARTとピン配置には、対象ファミリーの表を使ってください。

![BTシグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BTシグナリングでは、PCがテスターを設定し、DUTとテスターがRFリンクを確立します。</em></div>

![BT非シグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BT非シグナリングでは、PCがシリアル／HCIコマンドでDUTのRF状態を直接制御します。</em></div>

![BLEシグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BLE DTMでは、UART/HCI制御経路とRF測定経路の両方をテスターに接続します。</em></div>

## ファームウェアを選び、プロジェクトを設定する { #choose-firmware-and-configure-the-project }

`rf_test.bin`はSiFli内部で使うRF試験ビルドであり、通常のSDK成果物として配布されません。`User.bin`はSDKでビルドした任意のアプリケーションファームウェアです。RF機能はプロトコルスタックに組み込まれ、`bt_cm dut`、`bt_cm uart_dut`、`bt_rftest`などのFinSHコマンドで起動します。

ユーザービルドでは、関連オプションを有効にします。

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

SF32LB55xの`bt_rftest`経路では`CONFIG_BT_RF_TEST`を使いません。`CONFIG_BT_FINSH`はトレース用であり、試験コマンドには不要です。制御経路にSDK独自のIPC UARTを使う場合は、ボードに応じて`CONFIG_IPC_USE_OWN_DEVICE=y`と`CONFIG_IPC_OWN_DEVICE_NAME="uart2"`を設定します。SDKの`example/bt/spp/`と`example/bt/HCI_over_uart/`が開始点になります。

## BTシグナリング試験 { #bt-signaling-test }

1. DUTで`VBAT`、`GND`、UART1 TX/RXにアクセスできるようにします。UART1の既定ピンはパッケージによって異なるため、プロジェクトのピン設定を確認してください。
2. BLEシグナリングでは、UART1をPCに接続して`bt_cm uart_dut`を送信します。`04 0E 04 XX 03 0C 00`を確認してから、UARTをテスターへ移します。
3. BTシグナリングでは、DUTをスリープさせずに動作状態に保ち、`bt_cm dut`を送信して`Write scan enable success`を確認し、RF同軸ケーブルをテスターに接続します。
4. Bluetooth Signalingでは、BLEは1,000,000 baudのUSB-to-RS232 EUT制御を使います。BTは`None (EUT Control off)`を選び、無線経由でDUTを検出します。
5. `Bluetooth 1 Multi Eval.`でTXを実行し、`Bluetooth 1 RX Meas.`でRXを実行します。Classic BTではBER、BLEではPERを使い、テスターのTXレベルを下げて感度を測定します。

## BT/BLE非シグナリングコマンド { #btble-non-signaling-commands }

RF試験経路を有効にした後、FinSHシェルで次のコマンドを使います。

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

引数の正確な順序と使用可能なパケット値はリリースごとに異なります。対象SDKの`bt_rftest help`が表示する構文を使ってください。RXパケット統計は意味のある測定値ですが、TXパケット数は受信パケット数の測定値ではありません。BLE DTMでは`bt_rftest bletx`／`blerx`、または標準HCIの`LE_Transmitter_Test`、`LE_Receiver_Test v2`、`LE_Test_End`を使います。BLEチャネルは0～39、PHYは1M/2M/Coded、Classic BTチャネルは0～78です。両方に対応するデュアルモードのターゲットでは、BTとBLEがRFハードウェアを共有するため、分けて試験してください。

## SiFli_RfToolによる個別RF試験 { #single-item-testing-with-sifli_rftool }

DUTのUART1を1,000,000 baudでPCに接続します。RFポートは同軸ケーブルでテスター、スペクトラムアナライザー、またはパワーメーターに接続してください。

`bt_cm uart_dut`を送信し、応答`04 0E 04 XX 03 0C 00`を確認します。`SiFli_RfTool.exe`でファミリー、BLEまたはBTの非シグナリングモード、COMポートを選びます。

チャネル、PHY、パケット種別、電力を変更する前にTX/RXを停止してください。BLE RXでは、テスターから1,500パケットを送信できます。`PER = (1500 - received) / 1500 × 100%`を計算し、RSSIを記録します。

Classic BT RXではCMW500 GPRF波形を使い、RSSI、パケット／ビットのエラー数、BER/PERを記録します。ケーブル損失を補正し、伝導測定か放射測定かを記録してください。

## 結果の記録 { #record-the-result }

SiFliのガイドには、HCIコマンドと戻り値の一覧も掲載されています。コマンドを送信してもDUTが期待した状態にならない場合に参照してください。一覧中のすべての試験ベクトルを、移植可能なAPIと見なさないでください。対象SDKとチップファミリーに合うコマンドを選びます。

<div align="center"><em>表: SF32LB52xのコマンド一覧にあるRX試験チャネルと中心周波数の例</em></div>

<div align="center" markdown>

| 試験モード | チャネル | 中心周波数 |
|:---------|:-----------|:-----------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

RX試験が失敗した場合、再試行の前に`HCI_Reset`（`01,03,0C,00`）を送信するよう、元の一覧に記載されています。コマンドとチャネル値はSF32LB52xの資料例です。対象SDKとファミリーでコマンドシーケンスを確認してください。

![SF32LB52x HCI RF試験コマンド一覧](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — HCIコマンド、戻り値、RF試験項目の一覧。</em></div>

各結果とともに、ファミリー、SDKリビジョン、ファームウェア識別情報、UARTピン、RF経路、ケーブル損失、測定器の機種／設定、チャネル、PHY／パケット種別、電力設定、RX数、RSSI、BER/PER、ボードリビジョンを記録してください。詳しくは公式の[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html)、[SF32LB55x（UARTの表にはSF32LB57xも記載）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html) の各ガイドを参照してください。
