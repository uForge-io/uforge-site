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
| UARTピン、パケット値、コマンドの動作 | 対象ファミリーとSDKリリースに依存する。プロジェクト設定と対象SDKの実装を確認する。 |

</div>

!!! warning "公式ガイド間でSF32LB58xのUART1ピン割り当てが不一致です"
    [一般RFテストガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)ではUART1 TX/RXをPA31/PA32、[Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)ではPA32/PA31と記載しています。配線前に、対象ファームウェアのテスト経路と基板のpinmuxを確認してください。ガイドごとに割り当てが異なります。

## 試験モードの選択 { #select-the-test-mode }

<div align="center" markdown>
<em>表: Bluetooth RF試験モードの選択</em>

| モード | 用途 | SDKの入口 | 制御経路 |
|---|---|---|---|
| BTシグナリング（BR/EDR） | BQB/QDID認証とプロトコル準拠の性能評価 | `bt_cm dut`, `gap_enb_dut_mode_req()` | テスターの無線インターフェースとLMP試験制御 |
| BT非シグナリング | 開発時のRF調整と量産スクリーニング | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | ローカルのベンダーHCI |
| BLE非シグナリング (SIG DTM) | BLE RFスクリーニングとSIG DTM認証試験 | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | ローカルHCI、または`bt_cm uart_dut`で転送する標準HCI |
| 個別RF試験 | 基板レベルのRF調整とFCC/CE認証前評価 | `bt_cm uart_dut` + `SiFli_RfTool` | PCツールが低レベル操作を1項目ずつ送信 |

</div>

BR/EDRでは、シグナリングによって実際のBluetoothリンクを確立し、BQB RF認証を行います。BLEのBQB RF試験ではSIG DTMを使用し、本ページではBLE非シグナリングとして示しています。BT非シグナリングと個別RF試験はSiFli独自のワークフローであり、BQB試験ではありません。非シグナリングでは、RFを固定チャネル・設定電力で送信または受信させます。これは開発や量産で一般的に使われる方法です。個別RF試験では、PCツールでキャリアまたは変調を細かく設定し、アナライザーまたはパワーメーターで測定します。

以下の接続構成図はSF32LB52xのRF試験ガイドに基づいています。PC、DUT、テスター、UART/HCI/RFの経路の違いを示しています。既定のUARTとピン配置は、対象ファミリーのRF試験ガイドで確認してください。

![BTシグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BTシグナリングでは、PCがテスターを設定し、DUTとテスターがRFリンクを確立します。</em></div>

![BT非シグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BT非シグナリングでは、PCがシリアル／HCIコマンドでDUTのRF状態を直接制御します。</em></div>

![BLE DTM試験の接続構成](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
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

## BR/EDRシグナリングとBLE DTMの設定 { #bt-signaling-test }

1. DUTで`VBAT`、`GND`、UART1 TX/RXにアクセスできるようにします。UART1の既定ピンはパッケージによって異なるため、プロジェクトのピン設定を確認してください。
2. BLE DTMでは、UART1をPCに接続して`bt_cm uart_dut`を送信します。`04 0E 04 XX 03 0C 00`を確認してから、UARTをテスターへ移します。
3. BTシグナリングでは、DUTをスリープさせずに動作状態に保ち、`bt_cm dut`を送信して`Write scan enable success`を確認し、RF同軸ケーブルをテスターに接続します。
4. Bluetooth Signalingでは、BLEは1,000,000 baudのUSB-to-RS232 EUT制御を使います。BTは`None (EUT Control off)`を選び、無線経由でDUTを検出します。
5. `Bluetooth 1 Multi Eval.`でTXを実行し、`Bluetooth 1 RX Meas.`でRXを実行します。Classic BTではBER、BLEではPERを使い、テスターのTXレベルを下げて感度を測定します。

## BT/BLE非シグナリングコマンド { #btble-non-signaling-commands }

RF試験経路を有効にした後、FinSHシェルで次のコマンドを使います。

```text
bt_rftest enter
bt_rftest bttx
bt_rftest btrx
bt_rftest btstop
bt_rftest exit
```

文書で示すSDKでは、`bt_rftest bttx`と`bt_rftest btrx`の試験パラメーターは固定されており、引数を取りません。変更する場合は、対象リリースの`middleware/bluetooth/service/common/bf0_bt_common.c`にある`bt_rftest()`を確認し、必要に応じて引数付きのサブコマンドを定義してください。実装や使用可能な値はリリースによって異なる場合があります。

RXのパケット統計は受信状況の把握に役立ちますが、TXの送信数はDUTの受信数を示しません。BLE DTMでは`bt_rftest bletx`／`blerx`、または標準HCIの`LE_Transmitter_Test`、`LE_Receiver_Test v2`、`LE_Test_End`を使います。BLEチャネルは0～39、PHYは1M/2M/Coded、Classic BTチャネルは0～78です。両方に対応するデュアルモードのターゲットでは、BTとBLEがRFハードウェアを共有するため、分けて試験してください。

## SiFli_RfToolによる個別RF試験 { #single-item-testing-with-sifli_rftool }

この節では非シグナリングTX/RXのみを扱います。単一搬送波（CW）試験については、別の[Bluetoothシングルトーン試験手順](bluetooth-single-tone-tests.md)を参照してください。

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

以下の表は、SF32LB52xの資料例に含まれる全行を構造化して転記したものです。移植可能なAPIではありません。実装には対象ファミリーのSDKドキュメントを使用してください。コマンド識別子、バイト列、試験値、上下限、操作上の注記は原資料どおりに保持しています。

<div align="center" markdown>
<em>表: SF32LB52xの資料例 — セットアップと開始コマンド</em>

| 試験項目の説明 | 試験項目名 | 送信コマンド | 戻り値 | 試験値 | 下限 | 上限 | 備考 |
|---|---|---|---|---|---|---|---|
| 非シグナリングモードに入る | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| 損失テーブルを設定 | `BT_SetMultiLossTable` | `/` | `/` | `/` | `/` | `/` |  |
| HCIテストモードに入る | `HEX_Cmd_Enter_HCI_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| 3秒待機 | `Delay_Millisecond` | `/` | `/` | `/` | `/` | `/` |  |
| 周波数偏差校正テスト | `BT_BR_TX_Cal_Test_L` | 1. `01,71,FC,06,00,53,01,01,05,0A`<br>2. `08,FF,EE,06`<br>3. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `09,FF,EE,00,06,01,00`<br>3. `04,0E,06,06,72,FC,00,E7,02` | `1` | `0` | `1` |  |
| HCI_Resetコマンドを送信 | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| プログラマブル電源をオフ | `Simple_For_Updata_8IuOFF2` | `/` | `/` | `1` | `0` | `1` |  |
| シリアル通信を無効化 | `Serial_Port_Switch_Reset2` | `/` | `/` | `1` | `0` | `1` |  |
| 2秒待機 | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| プログラマブル電源をオン | `Simple_For_Updata_8IuON2` | `/` | `/` | `1` | `0` | `1` |  |
| シリアル通信を有効化 | `Serial_Port_Switch_COM` | `/` | `/` | `1` | `0` | `1` |  |
| メインボードの起動を3秒待つ | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| メインボードの起動を確認 | `AT_Cmd_Check_OS_Ready` | `AT_START` | `START=OK` | `1` | `0` | `1` |  |
| 非シグナリングモードに入る | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| 停止コマンドを送信 | `HEX_Cmd_Enter_BT_Mode` | `01,72,FC,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` | モードに正常に入ったか確認します。 |
| HCI_Resetコマンドを送信 | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>表: SF32LB52xの資料例 — RX試験マトリクス</em>

| 試験項目の説明 | 試験項目名 | 送信コマンド | 戻り値 | 試験値 | 下限 | 上限 | 備考 |
|---|---|---|---|---|---|---|---|
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX試験 | `BT_BR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX試験 | `BT_BR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX試験 | `BT_BR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX試験 | `BT_BR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX試験 | `BT_BR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX試験 | `BT_BR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX試験 | `BT_EDR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX試験 | `BT_EDR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX試験 | `BT_EDR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX試験 | `BT_EDR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX試験 | `BT_EDR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX試験 | `BT_EDR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX試験 | `BT_BLE_RX_BER_2402` | 1. `01,1F,20,00`<br>2. `01,33,20,03,00,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX試験 | `BT_BLE_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX試験 | `BT_BLE_RX_BER_2440` | 1. `01,1F,20,00`<br>2. `01,33,20,03,13,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX試験 | `BT_BLE_RX_RSSI_2440` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX試験 | `BT_BLE_RX_BER_2480` | 1. `01,1F,20,00`<br>2. `01,33,20,03,27,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX試験 | `BT_BLE_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX試験 | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | RX試験に失敗した場合は、再試行前にresetコマンドを送信します。 |

</div>

<div align="center" markdown>
<em>表: SF32LB52xの資料例 — TX試験マトリクス</em>

| 試験項目の説明 | 試験項目名 | 送信コマンド | 戻り値 | 試験値 | 下限 | 上限 | 備考 |
|---|---|---|---|---|---|---|---|
| `BT_BR CH0` TX試験 | `BT_BR_TX_DF1_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH0` TX試験 | `BT_BR_TX_DF2_2402` | 1. `01,71,FC,06,00,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX試験 | `BT_BR_TX_DF1_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX試験 | `BT_BR_TX_DF2_2441` | 1. `01,71,FC,06,27,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX試験 | `BT_BR_TX_DF1_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX試験 | `BT_BR_TX_DF2_2480` | 1. `01,71,FC,06,4E,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| BRからEDRへ切り替え | `HEX_Cmd_Switch_To_EDR` | `08,FF,EE,02,0A` | `09,FF,EE,00,02,01,00` | `1` | `0` | `1` |  |
| `BT_EDR CH0` TX試験 | `BT_EDR_TX_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` TX試験 | `BT_EDR_TX_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` TX試験 | `BT_EDR_TX_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX試験 | `BT_BLE_TX_DF1_2402` | 1. `01,1F,20,00`<br>2. `01,34,20,04,00,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX試験 | `BT_BLE_TX_DF2_2402` | 1. `01,34,20,04,00,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX試験 | `BT_BLE_TX_DF1_2440` | 1. `01,1F,20,00`<br>2. `01,34,20,04,13,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX試験 | `BT_BLE_TX_DF2_2440` | 1. `01,34,20,04,13,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX試験 | `BT_BLE_TX_DF1_2480` | 1. `01,1F,20,00`<br>2. `01,34,20,04,27,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX試験 | `BT_BLE_TX_DF2_2480` | 1. `01,34,20,04,27,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>表: SF32LB52xの資料例 — 終了とリセットのコマンド</em>

| 試験項目の説明 | 試験項目名 | 送信コマンド | 戻り値 | 試験値 | 下限 | 上限 | 備考 |
|---|---|---|---|---|---|---|---|
| 非シグナリングモードを終了 | `AT_Cmd_Exit_BT_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| RFTフラグを書き込む | `AT_Cmd_Write_RFT_Flag_Test` | `AT_SET_RFT_FLAG P` | `SET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| RFTフラグを読み取る | `AT_Cmd_Read_RFT_Flag_Test` | `AT_GET_RFT_FLAG` | `GET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| 待機 | `Delay_Millisecond2s` | `/` | `/` | `1` | `0` | `1` |  |
| 通信ボックスをリセット | `Serial_Port_Switch_Reset` | `/` | `/` | `1` | `0` | `1` |  |
| プログラマブル電源をリセット | `Power_Supply_Off` | `/` | `/` | `1` | `0` | `1` |  |
| ツールをリセット | `Release_Test_Parameters` | `/` | `/` | `1` | `0` | `1` |  |

</div>

![SF32LB52x HCI RF試験コマンド一覧](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>図: 上記のSF32LB52x専用マトリクスの中国語原資料画像 — 参照用であり、移植可能なAPIではありません。</em></div>

各試験では、ファミリー、SDKリビジョン、ファームウェア識別情報、ボードリビジョン、UARTピン、RF経路、ケーブル損失を記録してください。測定器の機種／設定、チャネル、PHY／パケット種別、電力設定、RX数、RSSI、BER/PERも記録します。詳しくは公式の[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html)、[SF32LB55x（UARTの表にはSF32LB57xも記載）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html) の各ガイドを参照してください。
