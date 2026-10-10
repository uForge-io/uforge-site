---
icon: lucide/audio-lines
title: "Bluetooth の項目別 RF 試験の実施"
description: "SiFli_RfTool で BLE または Classic Bluetooth の RF 試験を項目ごとに実施し、基板調整や FCC/CE 認証前の評価に活用します。"
tags: [開発, SiFli-SDK, アプリケーションノート, Bluetooth]
---

# Bluetooth の項目別 RF 試験の実施 { #run-bluetooth-single-item-rf-tests }

項目別 RF 試験は、基板調整、FCC/CE 適合性の事前評価、またはキャリアや変調設定を 1 つずつ調べるための、SDK の低レベル RF 試験機能です。製品機能ではなく、BQB シグナリング試験の代替にもなりません。

## DUT とツールの準備 { #prepare-the-dut-and-tool }

DUT、PC、データ通信用 USB ケーブル（充電専用ではないもの）、RF 同軸ケーブル、通信テスターまたはスペクトラムアナライザーを用意します。DUT では `VBAT`、`GND`、変調信号試験用の UART1 TX/RX にアクセスできるようにします。SF32LB55x の CW 単一キャリア試験では UART3 TX/RX も必要です。既定のピン割り当ては次のとおりです。

<div align="center" markdown>
<em>表: 変調信号試験と単一キャリア試験の既定 UART 割り当て</em>

| デバイス／パッケージ | 変調信号試験用 UART1 TX/RX | CW 単一キャリア試験用 UART |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

SF32LB55x の UART1 ピンは品種によって異なります。変調信号試験では UART1 を 1,000,000 baud で PC に接続してください。SF32LB55x の単一キャリア試験では UART3 (PB45/PB46) に切り替え、ほかの掲載ファミリーでは UART1 を使います。既定値と異なる場合は、対象プロジェクトのピン設定に従ってください。RF ポートは同軸ケーブルで測定器に接続し、ケーブル損失を考慮したうえで伝導測定と放射測定を区別します。

!!! note "ファミリーごとの適用範囲"
    UART ピン表は複数ファミリー／パッケージをまとめた比較です。続く接続構成と `SiFli_RfTool` の画面は SF32LB52x ガイドの例です。ツールでは実際のチップファミリーを選び、対象プロジェクトの UART 割り当てを確認してください。

!!! warning "公式ガイド間でSF32LB58xのUART割り当てが不一致"
    [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html)ではUART1 TX/RXをPA32/PA31としていますが、[一般RFテストガイド](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html)ではRFデバッグUARTをPA31/PA32としています。配線前に、対象ファームウェアのテスト経路と基板のpinmuxを確認してください。ガイド間で割り当てが異なるため、一方の記載を他方にも適用できると決めつけないでください。

![Bluetooth の項目別 RF 試験の接続構成](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — PC は UART/HCI 経由で DUT を制御し、RF ポートは同軸ケーブル経由でテスターまたはスペクトラムアナライザーに接続します。</em></div>

## RF 試験モードに入る { #enter-rf-test-mode }

1. DUT を起動し、スリープさせないでください。
2. SiFli_Trace から FinSH コマンド `bt_cm uart_dut` を送信します。
3. 16 進数の応答 `04 0E 04 XX 03 0C 00` を確認します。
4. ターミナルを切断します。SiFli_RfTool は同じ UART を HCI 制御に使います。

## BLE または Classic BT 信号の送信 { #transmit-a-ble-or-classic-bt-signal }

1. `SiFli_RfTool.exe` を開き、チップファミリー、BLE non-signaling または BT non-signaling、UART1 の COM ポートを選択して、1,000,000 baud で接続します。
2. BLE では Frequency、Data Length、payload、PHY を設定し、Start TX を選択します。チャネルまたは PHY を変更する前に TX を停止してください。
3. Classic BT では Frequency、Data Length、Packet Type を設定し、Start TX を選択します。パケットパラメーターを変更する前に TX を停止してください。
4. テスター側でチャネル、パケット種別、ペイロード、PHY を一致させます。通信テスターがない場合は、スペクトラムアナライザーで波形を確認できます。

SDK のソースには LB52x HDK の TX レベル参考値がありますが、これらはボード固有です。デバッグ時の参考にとどめ、実際の製品基板で測定してください。

![SiFli_RfTool のメイン操作画面](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — ツールのチップファミリー、モード、UART、ボーレート、TX/RX 操作。試験ベクトルを実行する前に選択内容を確認します。</em></div>

![SiFli_RfTool の BLE TX 設定](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — TX 開始前にチップ、モード、チャネル、ペイロード、PHY、データ長、電力を設定します。</em></div>

## 受信と感度の計算 { #receive-and-calculate-sensitivity }

RX に切り替える前に TX を停止します。チャネルを設定して Start RX を押し、チャネルを変更するときは RX を停止してください。BLE RX では、テスターを Direct Test Mode に設定し、PHY とチャネルを選択して 1,500 パケットを送信し、次の式で計算します。

```text
PER = (1500 - received_packets) / 1500 × 100%
```

RSSI も記録します。Classic BT RX では、CMW500 GPRF Generator の DH1/2-DH1/3-DH1 などの波形を使用し、受信パケット数、エラーパケット数、ビット数、BER、RSSI を記録します。BLE と Classic BT の RF 経路はハードウェアを共有するため、並行して実行しないでください。

![SiFli_RfTool の BLE RX 設定](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — RX の前に TX を停止し、チャネル、変調、PHY、受信結果を記録します。</em></div>

## 単一キャリアと測定器の設定 { #single-carrier-and-instrument-setup }

CW 単一キャリア試験に切り替える前に、現在の動作を停止します。SF32LB55x では DUT と PC の接続を UART1 から UART3 (PB45/PB46) に切り替え、SiFli_RfTool で UART3 の COM ポートを選び、1,000,000 baud に設定します。ほかの掲載ファミリーでは UART1 を使います。搬送周波数と TX 電力を設定して送信を開始し、スペクトラムアナライザーまたはパワーメーターで出力を確認します。

変調信号の BLE/BT TX をテスターで測定する場合は、受信モードを StandAlone (Non Signaling) にし、チャネル、パケット種別、ペイロード、PHY を SiFli_RfTool の設定に合わせます。DUT の RX を測定する場合は、テスターを信号源として設定します。BLE では DTM パラメーター、Classic BT では GPRF 波形を使います。

ツールまたはシリアル接続が応答しなくなった場合は、SiFli_RfTool を終了し、DUT の電源をいったん切ってから入れ直します。起動を待って再接続してください。試験記録には、ツールのバージョン、ファームウェア識別情報、チップ／パッケージ、UART ピン、基板リビジョン、チャネル、PHY／パケット種別、電力、ケーブル損失、測定器の設定、生データを残してください。

![テスターの非シグナリング受信設定](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>図: SF32LB52x ガイドの例 — StandAlone (Non Signaling) を選び、DUT のチャネルとパケットパラメーターを一致させます。</em></div>

公式のファミリー別資料: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)、[SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html)。
