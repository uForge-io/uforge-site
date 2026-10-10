---
icon: lucide/bluetooth
title: "Bluetooth シグナリング試験の実施"
description: "SF32 の被試験デバイス（DUT）を Bluetooth テスターに接続し、BLE または Classic Bluetooth のシグナリング測定を行います。"
tags: [開発, SiFli-SDK, アプリケーションノート, Bluetooth]
---

# Bluetooth シグナリング試験の実施 { #run-bluetooth-signaling-tests }

シグナリングモードでは、被試験デバイス（DUT）と通信テスターの間に実際の Bluetooth リンクを確立します。プロトコルに準拠した TX/RX 検証や BQB/QDID 作業に使う SDK の手順であり、ベンダー独自の非シグナリング試験や、RF 条件を一つずつ評価する試験とは異なります。

## 試験の準備 { #test-setup }

DUT、Bluetooth 通信テスター（SiFli のガイドでは CMW500 を使用）、Windows PC、USB-UART ケーブル、RF 同軸ケーブルを用意します。DUT では `VBAT`、`GND`、UART1 の TX/RX にアクセスできるようにします。UART1 の既定ピンはパッケージによって異なります。

<div align="center" markdown>
<em>表: デバイス／パッケージ別 UART1 の既定ピン</em>

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

既定の割り当てと異なる場合は、プロジェクトで実際に使用しているピン設定を確認してください。BLE シグナリングでは、DUT とテスター間にシリアルの EUT 制御接続が必要です。Classic Bluetooth シグナリングでは、テストモードに入った後、無線経由で DUT を制御できます。

重要な違いは制御経路です。BLE では UART/HCI の制御経路をテスターに接続しますが、Classic Bluetooth ではテスターが無線経由で DUT を検出して接続します。以下の図は SiFli のガイドに掲載された SF32LB52x の例です。他のファミリーでは、対象プロジェクトのピン表を使ってください。

!!! note "ファミリーごとの適用範囲"
    UART のピン表は複数ファミリー／パッケージをまとめた比較です。続く接続構成とテスター画面の図は SiFli のガイドに掲載された SF32LB52x の例です。信号経路の理解には使えますが、パッケージ共通のピン配置やメニュー構成を示すものではありません。

![BLE シグナリング試験の接続構成](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — BLE シグナリングでは、PC から DUT をテストモードにし、その後 UART/HCI 制御経路をテスターに接続します。</em></div>

![Classic Bluetooth シグナリング試験の接続構成](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — Classic Bluetooth シグナリングでは、テスターが RF 経由で DUT を検出して接続します。</em></div>

## DUT をテストモードにする { #put-the-dut-into-test-mode }

### BLE { #ble }

1. DUT を起動し、DFU／アプリケーションのファームウェアがスリープしないようにします。
2. UART1 を PC に接続し、SiFli_Trace などのシリアルツールから FinSH コマンド `bt_cm uart_dut` を送信します。
3. ターミナルを 16 進表示に切り替え、`04 0E 04 XX 03 0C 00` が返ることを確認します。
4. PC を切り離し、同じ UART1 をテスターの USB-to-RS232 EUT 制御ポートに接続します。

![BLE テストモードのシリアル応答](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — UART の接続先を変更する前に `04 0E 04 XX 03 0C 00` を確認します。</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. DUT を起動し、画面と CPU がスリープしない状態に保ちます。
2. UART1 を PC に接続し、`bt_cm dut` を送信します。
3. `Write scan enable success` の応答を確認してから、RF 同軸ケーブルをテスターに接続します。別の試験モードに切り替える場合は、DUT を再起動してください。

## シグナリング接続の確立 { #establish-the-signaling-connection }

テスターの `Bluetooth Signaling` アプリケーションでシグナリングを有効にします。BLE では `EUT Control` で `USB-to-RS232 adapter`、1,000,000 baud、`Low Energy burst type` を選びます。DUT の UART1 をテスターに接続し、RF 同軸ケーブルをテスターの RF 入力に接続してから、`Connection Check` を実行します。`LE comm test passed` が表示されるまで待ちます。Classic Bluetooth では `HW Interface` に `None (EUT Control off)` を設定し、`Inquire` で DUT のアドレスを検索して `Connect Test Mode` を選択します。

![BLE テスターの EUT Control 設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — BLE の EUT Control、ボーレート、Low Energy 設定。</em></div>

![Classic Bluetooth テスターの設定](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>図: SiFli のガイドに掲載された SF32LB52x の例 — EUT Control を `None (EUT Control off)` にした Classic Bluetooth シグナリング。</em></div>

## TX 測定の実施 { #run-tx-measurements }

`Bluetooth 1 Multi Eval.` を開いて測定を有効にします。必要な BLE 1M/2M または Classic Bluetooth BR/EDR のバースト種別、チャネル、パケット種別、ペイロード長を選択します。BLE と Classic Bluetooth のどちらでシグナリング接続した場合も、同じテスターの TX 画面を使います。

## RX 感度測定の実施 { #run-rx-sensitivity-measurements }

シグナリング画面に戻る前に TX を無効にし、`Bluetooth 1 RX Meas.` を開きます。Classic Bluetooth では BER、BLE では PER を選び、チャネルとパケット種別を設定して Rx Quality を有効にします。テスターの `Tx Level (CMW)` を少しずつ下げ、BER/PER インジケーターが無効になる直前の値を測定感度として記録します。測定が伝導か放射かを明記し、ケーブル損失も含めてください。

## 結果の記録と再現 { #record-and-reproduce }

チップ／パッケージ、UART ピン割り当て、SDK リビジョン、ファームウェア識別情報、テスターの機種と設定、RF 接続、チャネル、PHY、パケット設定、TX レベル、BER/PER、基板リビジョンを記録します。公式のファミリー別資料: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
