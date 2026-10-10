---
icon: lucide/radio-tower
title: "SiFli SDK での RF 試験"
description: "目的に合う Bluetooth RF 試験モード、制御経路、測定器を選択する方法を説明します。"
tags: [開発, SiFli-SDK, アプリケーションノート, RF]
---

# SiFli SDK での RF 試験 { #run-sifli-sdk-rf-tests }

SDK では Bluetooth RF 検証をシグナリング、非シグナリング、個別 RF 試験に分けています。試験用ファームウェアを読み込む前に、目的に合った方法を選んでください。

<div align="center" markdown>
<em>表: ファミリー別 RF 試験コンテンツの適用範囲</em>

| 内容 | ファミリーごとの適用範囲 |
|---|---|
| 試験モードの比較と測定手順 | SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x、SF32LB58x 向けの統合ワークフロー。 |
| Bluetooth Classic 試験の対応状況 | Bluetooth Classic に対応するターゲットでのみ実施できます。SF32LB55x は BLE のみをサポートし、Bluetooth Classic の試験には対応しません。このファミリーでは BLE の試験手順を使用してください。 |
| SF32LB57x のテストツール対応 | [RF Test Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) には SF32LB57x の UART ピンが記載されていますが、[SiFli_RfTool マニュアル](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) のプラットフォーム選択肢に 57x はありません。この情報はピン配置の根拠としてのみ扱い、対象 SDK リリースで利用できるテスト経路を確認してください。 |
| 接続構成の図と HCI コマンド一覧 | SiFli のガイドに掲載された SF32LB52x の例。他ファミリーでは、実装に対象ファミリーのコマンド／ピン資料を使う。 |
| `CONFIG_BT_RF_TEST` の設定 | ドキュメントに記載された 55x 以外の経路に適用。SF32LB55x の `bt_rftest` 経路ではこのシンボルを使わない。 |
| UART ピン、パケット値、コマンド構文 | 対象ファミリーと SDK リリースに依存する。プロジェクト設定と `bt_rftest help` を確認する。 |

</div>

!!! warning "公式ガイド間でSF32LB58xのUART1ピン割り当てが不一致です"
    [一般RFテストガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)ではUART1 TX/RXをPA31/PA32、[Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)ではPA32/PA31と記載しています。配線前に、対象ファームウェアのテスト経路と基板のpinmuxを確認してください。ガイドごとに割り当てが異なります。

## 試験モードの選択 { #select-the-test-mode }

<div align="center" markdown>
<em>表: Bluetooth RF 試験モードの選択</em>

| モード | 用途 | SDK の入口 | 制御経路 |
|---|---|---|---|
| BT シグナリング | BQB/QDID 認証とプロトコル準拠の性能評価 | `bt_cm dut`, `gap_enb_dut_mode_req()` | テスターの無線インターフェースと LMP 試験制御 |
| BT 非シグナリング | 開発時の RF 調整と量産スクリーニング | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | ローカルのベンダー HCI |
| BLE 非シグナリング (SIG DTM) | BLE RF スクリーニングと SIG DTM 項目 | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | ローカル HCI、または `bt_cm uart_dut` で転送する標準 HCI |
| 個別 RF 試験 | 基板レベルの RF 調整と FCC/CE 認証前評価 | `bt_cm uart_dut` + `SiFli_RfTool` | PC ツールが低レベル操作を 1 項目ずつ送信 |

</div>

シグナリングでは実際の Bluetooth リンクを確立し、認証試験に使います。非シグナリングでは RF を特定のチャネルと電力に固定し、送信または受信状態を維持します。開発や量産で一般的に使われる方法です。個別 RF 試験では PC ツールからキャリアまたは変調を細かく制御し、アナライザーまたはパワーメーターで測定します。BT 非シグナリングと個別 RF 試験は SiFli 独自のワークフローであり、BQB 試験ではありません。

以下の接続構成図は SF32LB52x の RF 試験ガイドに基づいています。PC、DUT、テスター、UART/HCI/RF の経路の違いを示しています。実際の既定 UART とピン配置には、対象ファミリーの表を使ってください。

![BT シグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — BT シグナリングでは、PC がテスターを設定し、DUT とテスターが RF リンクを確立します。</em></div>

![BT 非シグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — BT 非シグナリングでは、PC がシリアル／HCI コマンドで DUT の RF 状態を直接制御します。</em></div>

![BLE シグナリング試験の接続構成](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — BLE DTM では、UART/HCI 制御経路と RF 測定経路の両方をテスターに接続します。</em></div>

## ファームウェアを選び、プロジェクトを設定する { #choose-firmware-and-configure-the-project }

`rf_test.bin` は SiFli 内部で使う RF 試験ビルドであり、通常の SDK 成果物として配布されません。`User.bin` は SDK でビルドした任意のアプリケーションファームウェアです。RF 機能はプロトコルスタックに組み込まれ、`bt_cm dut`、`bt_cm uart_dut`、`bt_rftest` などの FinSH コマンドで起動します。

ユーザービルドでは、関連オプションを有効にします。

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

SF32LB55x の `bt_rftest` 経路では `CONFIG_BT_RF_TEST` を使いません。`CONFIG_BT_FINSH` はトレース用であり、試験コマンドには不要です。制御経路に SDK 独自の IPC UART を使う場合は、ボードに応じて `CONFIG_IPC_USE_OWN_DEVICE=y` と `CONFIG_IPC_OWN_DEVICE_NAME="uart2"` を設定します。SDK の `example/bt/spp/` と `example/bt/HCI_over_uart/` が開始点になります。

## BT シグナリング試験 { #bt-signaling-test }

1. DUT で `VBAT`、`GND`、UART1 TX/RX にアクセスできるようにします。UART1 の既定ピンはパッケージによって異なるため、プロジェクトのピン設定を確認してください。
2. BLE シグナリングでは、UART1 を PC に接続して `bt_cm uart_dut` を送信します。`04 0E 04 XX 03 0C 00` を確認してから、UART をテスターへ移します。
3. BT シグナリングでは、DUT をスリープさせずに動作状態に保ち、`bt_cm dut` を送信して `Write scan enable success` を確認し、RF 同軸ケーブルをテスターに接続します。
4. Bluetooth Signaling では、BLE は 1,000,000 baud の USB-to-RS232 EUT 制御を使います。BT は `None (EUT Control off)` を選び、無線経由で DUT を検出します。
5. `Bluetooth 1 Multi Eval.` で TX を実行し、`Bluetooth 1 RX Meas.` で RX を実行します。Classic BT では BER、BLE では PER を使い、テスターの TX レベルを下げて感度を測定します。

## BT/BLE 非シグナリングコマンド { #btble-non-signaling-commands }

RF 試験経路を有効にした後、FinSH シェルで次のコマンドを使います。

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

引数の正確な順序と使用可能なパケット値はリリースごとに異なります。対象 SDK の `bt_rftest help` が表示する構文を使ってください。RX パケット統計は意味のある測定値ですが、TX パケット数は受信パケット数の測定値ではありません。BLE DTM では `bt_rftest bletx`／`blerx`、または標準 HCI の `LE_Transmitter_Test`、`LE_Receiver_Test v2`、`LE_Test_End` を使います。BLE チャネルは 0～39、PHY は 1M/2M/Coded、Classic BT チャネルは 0～78 です。両方に対応するデュアルモードのターゲットでは、BT と BLE が RF ハードウェアを共有するため、分けて試験してください。

## SiFli_RfTool による個別 RF 試験 { #single-item-testing-with-sifli_rftool }

DUT の UART1 を 1,000,000 baud で PC に接続します。RF ポートは同軸ケーブルでテスター、スペクトラムアナライザー、またはパワーメーターに接続してください。

`bt_cm uart_dut` を送信し、応答 `04 0E 04 XX 03 0C 00` を確認します。`SiFli_RfTool.exe` でファミリー、BLE または BT の非シグナリングモード、COM ポートを選びます。

チャネル、PHY、パケット種別、電力を変更する前に TX/RX を停止してください。BLE RX では、テスターから 1,500 パケットを送信できます。`PER = (1500 - received) / 1500 × 100%` を計算し、RSSI を記録します。

Classic BT RX では CMW500 GPRF 波形を使い、RSSI、パケット／ビットのエラー数、BER/PER を記録します。ケーブル損失を補正し、伝導測定か放射測定かを記録してください。

## 結果の記録 { #record-the-result }

SiFli のガイドには、HCI コマンドと戻り値の一覧も掲載されています。コマンドを送信しても DUT が期待した状態にならない場合に参照してください。一覧中のすべての試験ベクトルを、移植可能な API と見なさないでください。対象 SDK とチップファミリーに合うコマンドを選びます。

<div align="center"><em>表: SF32LB52x のコマンド一覧にある RX 試験チャネルと中心周波数の例</em></div>

<div align="center" markdown>

| 試験モード | チャネル | 中心周波数 |
|:---------|:-----------|:-----------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

RX 試験が失敗した場合、再試行の前に `HCI_Reset`（`01,03,0C,00`）を送信するよう、元の一覧に記載されています。コマンドとチャネル値は SF32LB52x の資料例です。対象 SDK とファミリーでコマンドシーケンスを確認してください。

![SF32LB52x HCI RF 試験コマンド一覧](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — HCI コマンド、戻り値、RF 試験項目の一覧。</em></div>

各結果とともに、ファミリー、SDK リビジョン、ファームウェア識別情報、UART ピン、RF 経路、ケーブル損失、測定器の機種／設定、チャネル、PHY／パケット種別、電力設定、RX 数、RSSI、BER/PER、ボードリビジョンを記録してください。詳しくは公式の[SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html)、[SF32LB55x（UART の表には SF32LB57x も記載）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html) の各ガイドを参照してください。
