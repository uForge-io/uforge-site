---
icon: lucide/bluetooth
title: "Bluetoothシグナリング試験の実施"
description: "SF32の被試験デバイス（DUT）をBluetoothテスターに接続し、BLEまたはClassic Bluetoothのシグナリング測定を行います。"
tags: [開発, SiFli-SDK, アプリケーションノート, Bluetooth]
---

# Bluetoothシグナリング試験の実施 { #run-bluetooth-signaling-tests }

シグナリングモードでは、被試験デバイス（DUT）と通信テスターの間に実際のBluetoothリンクを確立します。プロトコルに準拠したTX/RX検証やBQB/QDID作業に使うSDKの手順であり、ベンダー独自の非シグナリング試験や、RF条件を一つずつ評価する試験とは異なります。

## 試験の準備 { #test-setup }

DUT、Bluetooth通信テスター（SiFliのガイドではCMW500を使用）、Windows PC、USB-UARTケーブル、RF同軸ケーブルを用意します。DUTでは`VBAT`、`GND`、UART1のTX/RXにアクセスできるようにします。UART1の既定ピンはパッケージによって異なります。

<div align="center" markdown>
<em>表: デバイス／パッケージ別UART1の既定ピン</em>

| デバイス／パッケージ | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

既定の割り当てと異なる場合は、プロジェクトで実際に使用しているピン設定を確認してください。BLEシグナリングでは、DUTとテスター間にシリアルのEUT制御接続が必要です。Classic Bluetoothシグナリングでは、テストモードに入った後、無線経由でDUTを制御できます。

重要な違いは制御経路です。BLEではUART/HCIの制御経路をテスターに接続しますが、Classic Bluetoothではテスターが無線経由でDUTを検出して接続します。以下の図はSiFliのガイドに掲載されたSF32LB52xの例です。他のファミリーでは、対象プロジェクトのピン表を使ってください。

!!! note "ファミリーごとの適用範囲"
    UARTのピン表は複数ファミリー／パッケージをまとめた比較です。続く接続構成とテスター画面の図はSiFliのガイドに掲載されたSF32LB52xの例です。信号経路の理解には使えますが、パッケージ共通のピン配置やメニュー構成を示すものではありません。

![BLEシグナリング試験の接続構成](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BLEシグナリングでは、PCからDUTをテストモードにし、その後UART/HCI制御経路をテスターに接続します。</em></div>

![Classic Bluetoothシグナリング試験の接続構成](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — Classic Bluetoothシグナリングでは、テスターがRF経由でDUTを検出して接続します。</em></div>

## DUTをテストモードにする { #put-the-dut-into-test-mode }

### BLE { #ble }

1. DUTを起動し、DFU／アプリケーションのファームウェアがスリープしないようにします。
2. UART1をPCに接続し、SiFli_TraceなどのシリアルツールからFinSHコマンド`bt_cm uart_dut`を送信します。
3. ターミナルを16進表示に切り替え、`04 0E 04 XX 03 0C 00`が返ることを確認します。
4. PCを切り離し、同じUART1をテスターのUSB-to-RS232 EUT制御ポートに接続します。

![BLEテストモードのシリアル応答](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — UARTの接続先を変更する前に`04 0E 04 XX 03 0C 00`を確認します。</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. DUTを起動し、画面とCPUがスリープしない状態に保ちます。
2. UART1をPCに接続し、`bt_cm dut`を送信します。
3. `Write scan enable success`の応答を確認してから、RF同軸ケーブルをテスターに接続します。別の試験モードに切り替える場合は、DUTを再起動してください。

## シグナリング接続の確立 { #establish-the-signaling-connection }

テスターの`Bluetooth Signaling`アプリケーションでシグナリングを有効にします。BLEでは`EUT Control`で`USB-to-RS232 adapter`、1,000,000 baud、`Low Energy burst type`を選びます。DUTのUART1をテスターに接続し、RF同軸ケーブルをテスターのRF入力に接続してから、`Connection Check`を実行します。`LE comm test passed`が表示されるまで待ちます。Classic Bluetoothでは`HW Interface`に`None (EUT Control off)`を設定し、`Inquire`でDUTのアドレスを検索して`Connect Test Mode`を選択します。

![BLEテスターのEUT Control設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BLEのEUT Control、ボーレート、Low Energy設定。</em></div>

![Classic Bluetoothテスターの設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — EUT Controlを`None (EUT Control off)`にしたClassic Bluetoothシグナリング。</em></div>

## TX測定の実施 { #run-tx-measurements }

`Bluetooth 1 Multi Eval.`を開いて測定を有効にします。必要なBLE 1M/2MまたはClassic Bluetooth BR/EDRのバースト種別、チャネル、パケット種別、ペイロード長を選択します。BLEとClassic Bluetoothのどちらでシグナリング接続した場合も、同じテスターのTX画面を使います。

## RX感度測定の実施 { #run-rx-sensitivity-measurements }

シグナリング画面に戻る前にTXを無効にし、`Bluetooth 1 RX Meas.`を開きます。Classic BluetoothではBER、BLEではPERを選び、チャネルとパケット種別を設定してRx Qualityを有効にします。テスターの`Tx Level (CMW)`を少しずつ下げ、BER/PERインジケーターが無効になる直前の値を測定感度として記録します。測定が伝導か放射かを明記し、ケーブル損失も含めてください。

## 結果の記録と再現 { #record-and-reproduce }

チップ／パッケージ、UARTピン割り当て、SDKリビジョン、ファームウェア識別情報、テスターの機種と設定、RF接続、チャネル、PHY、パケット設定、TXレベル、BER/PER、基板リビジョンを記録します。公式のファミリー別資料: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
