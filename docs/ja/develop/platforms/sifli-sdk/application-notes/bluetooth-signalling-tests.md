---
icon: lucide/bluetooth
title: "Bluetoothシグナリング試験の実施"
description: "SF32の被試験デバイス（DUT）をBluetoothテスターに接続し、BLEまたはClassic Bluetoothのシグナリング測定を行います。"
tags: [開発, SiFli-SDK, アプリケーションノート, Bluetooth]
---

# Bluetoothシグナリング試験の実施 { #run-bluetooth-signaling-tests }

シグナリングモードでは、DUTと通信テスターの間に実際のBluetoothリンクを確立し、プロトコルに準拠したTX/RX試験を行います。SiFliのガイドは手動操作に加え、ソフトウェアでテスターを制御する自動試験（例: R&S® CMWrunでCMWテスターを制御）も扱います。ベンダー独自の非シグナリング試験や個別項目のRF試験とは異なります。

!!! note "適合性試験の範囲"
    適合性試験では種類に応じた手順を使います。SiFliのRF試験ガイドでは、BTシグナリングはQDID／プロトコル適合性試験向けとされ、BR/EDR BQB RF試験ではBTシグナリング、BLE BQB RF試験ではSIG DTM（BLE非シグナリング）を使うと説明されています。本ページのBLEシグナリング手順をBLE BQB RF試験として扱わないでください。

## 試験の準備 { #test-setup }

DUT、Bluetooth通信テスター（SiFliのガイドではCMW500を使用）、Windows PC、USB-UARTケーブル、RF同軸ケーブルを用意します。DUTでは`VBAT`、`GND`、UART1のTX/RXにアクセスできるようにします。UART1の既定ピンはパッケージによって異なります。

<div align="center" markdown>
<em>表: SiFli Bluetoothシグナリングガイドに記載されたデバイス／パッケージ別UART1既定ピン</em>

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

!!! warning "SF32LB58xのUART1方向に関する資料間の不一致"
    SiFliのBluetoothシグナリングガイドと[SF32LB58xハードウェア設計ガイドのデバッグポート表](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md)では、チップのUART1 TX/RXをPA32/PA31に対応付けています。一方、[SF32LB58-DevKit-LCDのピン表](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md)はPA31をUART1_TXD、PA32をUART1_RXDと記載し、[SiFliのRF試験ガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html)もTX=PA31/RX=PA32としています。公式資料間で不一致があります。配線前に対象ボードの回路図とプロジェクトの実際のピン設定を確認し、この集約表だけを根拠に接続しないでください。

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
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — UARTの接続先を変更する前に`04 0E 04 XX 03 0C 00`を確認します。画面例の応答は`04 0E 04 06 03 0C 00`です。</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. DUTを起動し、画面とCPUがスリープしない状態に保ちます。
2. UART1をPCに接続し、`bt_cm dut`を送信します。
3. `Write scan enable success`の応答を確認してから、RF同軸ケーブルをテスターに接続します。別の試験モードに切り替える場合は、DUTを再起動してください。

## シグナリング接続の確立 { #establish-the-signaling-connection }

テスターの`Bluetooth Signaling`アプリケーションでシグナリングを有効にします。BLEでは`EUT Control`の`HW Interface`を`USB to RS232 adapter`、`EUT Comm Protocol`を`HCI`、`Baud Rate`を`1000000`に設定し、General Setupの`Burst Type: Low Energy`を選びます。図の測定例では`PHY=LE1M`です。シリアルケーブル未接続時は`Virtual COM Port`が`None`（無効）と表示されます。DUTのUART1とRF同軸ケーブルをそれぞれテスターとRF入力に接続し、Bluetooth Signalingを一度オフにして再度オンにすると、テスターがシリアルポートを検出します。`Connection Check`を実行し、約3秒後に`LE comm test passed`が表示されることを確認します。Classic Bluetoothでは`HW Interface`を`None (EUT Control off)`に設定し、`Inquire`でDUTのアドレスを検索して`Connect Test Mode`を選択します。

![BLEテスターのEUT Control設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — BLEのEUT Control、ボーレート、Low Energy設定。</em></div>

![Classic Bluetoothテスターの設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>図: SiFliのガイドに掲載されたSF32LB52xの例 — EUT Controlを`None (EUT Control off)`にしたClassic Bluetoothシグナリング。</em></div>

!!! note "テスター画面に表示された設定例"
    BLEの画面例では、`Stop Bits=1`、`Parity=None`、シリアルの`Protocol=None`、`Autoreset EUT`オン、`Use BR/EDR Settings`オフも表示されています。測定例の項目は`Operating Mode=RF Test`、`Burst Type=Low Energy`、`PHY=LE1M`、`Channel=19`、`Frequency=2440.0 MHz`、`Tx Level (CMW)=-40.00 dBm`、`Exp. Nom. Power=30.00 dBm`、`Auto Ranging`と`Dirty Tx`オフ、`Packet Type=RE_PHY_TestRef`、`Payload Length=37 byte(s)`、`Pattern Type=PRBS9`です。Classic BTの画面例は`Operating Mode=RF Test`、`Burst Type=Basic Rate`、画面上の`Test Mode=Loopback Test`、`Channel`のRx/Tx値10/39、`Frequency`のRx/Tx値2412.0/2441.0 MHz、`Tx Level (CMW)=-40.00 dBm`、`Exp. Nom. Power=30.00 dBm`、`Packet Type=DH5`、`Payload Length=339 byte(s)`、`Pattern Type=10101010`を示しています。Hopping、Auto Ranging、Dirty Tx、Whiteningはいずれもオフです。これらは画面例の測定設定であり、すべての試験に共通する値ではありません。また、画面の`Loopback Test`は、上記の`Inquire`後に`Connect Test Mode`を選ぶ接続手順を変更するものではありません。

## TX測定の実施 { #run-tx-measurements }

`Bluetooth 1 Multi Eval.`を開きます。測定画面は既定でオフなので、`ON/OFF`を押して有効にします。設定を変更するには、右側の`Input Signal`を選び、画面下部の`Burst Type`を指定します。BLEでは1M/2M、Classic BTではBR/EDRを選べます。チャネル、パケット種別、ペイロード長はBluetooth Signaling画面または`Input Signal`で設定します。BLE／BTのどちらでシグナリング接続した場合も、同じTX画面を使います。

## RX感度測定の実施 { #run-rx-sensitivity-measurements }

TXを無効にしてから、右側の`Bluetooth Signaling`で接続画面に戻り、`Bluetooth 1 RX Meas.`を開きます。Classic BTではBER、BLEではPERを選び、チャネル、パケット種別、ペイロード長を設定してRx Qualityを有効にします。テスターの`Tx Level (CMW)`を0.01または0.1刻みで下げます。BER/PER表示が赤に変わったとき、その直前のレベルが当該チャネルの受信感度です。測定が伝導か放射かを明記し、ケーブル損失も含めてください。

## 結果の記録と再現 { #record-and-reproduce }

チップ／パッケージ、UARTピン割り当て、SDKリビジョン、ファームウェア識別情報、テスターの機種と設定、RF接続、チャネル、PHY、パケット設定、TXレベル、BER/PER、基板リビジョンを記録します。公式のファミリー別資料: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
