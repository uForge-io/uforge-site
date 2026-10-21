---
icon: lucide/usb
description: "SF32のUSBハードウェアでCherryUSBを使い、CDC、HID、MSC、オーディオ、MTPを実装する方法と、記述子の確認項目、OS別の列挙試験を紹介します。"
tags:
    - 開発
    - USB
---

# USBとCherryUSB { #usb-and-cherryusb }

USBハードウェアがサポートされているSF32デバイスとボードでは、SiFli-SDKのドキュメントやサンプルでCherryUSBとの連携が紹介されています。対象のチップ、ボード、SDKリリースでサポートされるUSBの役割とクラスを確認し、USBを単なるハードウェア機能ではなくソフトウェアスタック全体として設計・検証してください。

USBの実装では、ファームウェア、記述子、ホストOS、電源動作、製造用ツールを含めて確認します。開発用PCで一度列挙に成功しただけでは、製品として十分とはいえません。

## 想定する用途 { #use-cases }

- USB CDCシリアル
- HIDデバイス
- MSCストレージ
- USBオーディオのマイク／スピーカー
- MTP
- SDKとボードが対応する範囲で、CDC、HID、MSC、UVC、UACの各クラスの周辺機器をUSBホストとして接続する

## 実装の進め方 { #practical-workflow }

1. ボードに必要なUSBコネクターと電源経路があることを確認します。
2. 用途に最も近いSDKのUSBサンプルを起点にします。
3. Windows、macOS、Linuxでデバイスの列挙を試験します。
4. サスペンド／復帰と、ケーブルを抜き差ししたときの動作を確認します。
5. VID/PID、記述子、ドライバーに関する前提を記録します。

## 試験項目 { #what-to-test }

- 電源投入前に接続してから起動する試験と、動作中に接続／切断する試験
- 接続中のリセット
- ホストのスリープ／復帰
- 転送中のケーブル切断
- Windows、macOS、Linuxでの列挙
- 複数クラスを有効にした場合の複合デバイス動作
- 充電専用のUSBケーブルではデータ通信できないことを、ユーザー向け資料で案内する

## 記述子の確認項目 { #descriptor-checklist }

- VID/PIDの割り当て元が明確である
- 製品名文字列が確定済み、またはバージョン管理されている
- シリアル番号の扱いが定義されている
- クラス／サブクラス／プロトコルの値が想定するホストドライバーと一致している
- ファームウェア更新後も複合インターフェースが安定している

## SDKサンプル { #sdk-examples }

[SiFli-SDKの公式CherryUSBサンプル一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html)では、USBデバイスとUSBホストのサンプルが分かれています。想定するUSBの役割とクラスに合うサンプルから始め、そこで確認されている記述子、電源、ホスト互換性の項目を製品実装にも引き継いでください。

<div align="center"><em>表: SF32LB58x向けSiFli-SDK CherryUSBサンプル</em></div>

<div align="center" markdown>

| USBの役割 | サンプル | 用途 |
| --- | --- | --- |
| デバイス | [USBマイク](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB Audio Class 1マイク |
| デバイス | [USBマイクとスピーカー](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | USB Audio Class 1の双方向オーディオ |
| デバイス | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB通信デバイス |
| デバイス | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB-UARTブリッジ |
| デバイス | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | USB複合デバイス |
| デバイス | [HIDマウス](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB HIDポインティングデバイス |
| デバイス | [NOR Flashを使うMSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | NOR Flashをストレージに使うマスストレージデバイス |
| デバイス | [RAMディスクを使うMSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | RAMをストレージに使うマスストレージデバイス |
| デバイス | [2つのRAMディスクを使うMSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | RAMを使う2つの論理ユニット |
| デバイス | [SD/eMMCを使うMSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | SDカードまたはeMMCを使うマスストレージデバイス |
| デバイス | [DFSとRAMディスクを使うMTP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Media Transfer Protocolデバイス |
| ホスト | [CDC ACMホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | CDC ACM周辺機器との通信 |
| ホスト | [HIDホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | HID周辺機器を接続して入力を読み取る |
| ホスト | [MSCホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | USBマスストレージ周辺機器を接続する |
| ホスト | [UVC + UACホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USBビデオ／オーディオクラス周辺機器 |

</div>
