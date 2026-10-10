---
icon: lucide/usb
description: "SF32 の USB ハードウェアで CherryUSB を使い、CDC、HID、MSC、オーディオ、MTP を実装する方法と、記述子の確認項目、OS 別の列挙試験を紹介します。"
tags:
    - 開発
    - USB
---

# USB と CherryUSB { #usb-and-cherryusb }

USB ハードウェアがサポートされている SF32 デバイスとボードでは、SiFli-SDK のドキュメントやサンプルで CherryUSB との連携が紹介されています。対象のチップ、ボード、SDK リリースでサポートされる USB の役割とクラスを確認し、USB を単なるハードウェア機能ではなくソフトウェアスタック全体として設計・検証してください。

USB の実装では、ファームウェア、記述子、ホスト OS、電源動作、製造用ツールを含めて確認します。開発用 PC で一度列挙に成功しただけでは、製品として十分とはいえません。

## 想定する用途 { #use-cases }

- USB CDC シリアル
- HID デバイス
- MSC ストレージ
- USB オーディオのマイク／スピーカー
- MTP
- SDK とボードが対応する範囲で、CDC、HID、MSC、UVC、UAC の各クラスの周辺機器を USB ホストとして接続する

## 実装の進め方 { #practical-workflow }

1. ボードに必要な USB コネクターと電源経路があることを確認します。
2. 用途に最も近い SDK の USB サンプルを起点にします。
3. Windows、macOS、Linux でデバイスの列挙を試験します。
4. サスペンド／復帰と、ケーブルを抜き差ししたときの動作を確認します。
5. VID/PID、記述子、ドライバーに関する前提を記録します。

## 試験項目 { #what-to-test }

- 電源投入前に接続してから起動する試験と、動作中に接続／切断する試験
- 接続中のリセット
- ホストのスリープ／復帰
- 転送中のケーブル切断
- Windows、macOS、Linux での列挙
- 複数クラスを有効にした場合の複合デバイス動作
- 充電専用の USB ケーブルではデータ通信できないことを、ユーザー向け資料で案内する

## 記述子の確認項目 { #descriptor-checklist }

- VID/PID の割り当て元が明確である
- 製品名文字列が確定済み、またはバージョン管理されている
- シリアル番号の扱いが定義されている
- クラス／サブクラス／プロトコルの値が想定するホストドライバーと一致している
- ファームウェア更新後も複合インターフェースが安定している

## SDK サンプル { #sdk-examples }

[SiFli-SDK の公式 CherryUSB サンプル一覧](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html)では、USB デバイスと USB ホストのサンプルが分かれています。想定する USB の役割とクラスに合うサンプルから始め、そこで確認されている記述子、電源、ホスト互換性の項目を製品実装にも引き継いでください。

<div align="center"><em>表: SF32LB58x 向け SiFli-SDK CherryUSB サンプル</em></div>

<div align="center" markdown>

| USB の役割 | サンプル | 用途 |
| --- | --- | --- |
| デバイス | [USB マイク](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB Audio Class 1 マイク |
| デバイス | [USB マイクとスピーカー](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | USB Audio Class 1 の双方向オーディオ |
| デバイス | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB 通信デバイス |
| デバイス | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB-UART ブリッジ |
| デバイス | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | USB 複合デバイス |
| デバイス | [HID マウス](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB HID ポインティングデバイス |
| デバイス | [NOR Flash を使う MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | NOR Flash をストレージに使うマスストレージデバイス |
| デバイス | [RAM ディスクを使う MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | RAM をストレージに使うマスストレージデバイス |
| デバイス | [2 つの RAM ディスクを使う MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | RAM を使う 2 つの論理ユニット |
| デバイス | [SD/eMMC を使う MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | SD カードまたは eMMC を使うマスストレージデバイス |
| デバイス | [DFS と RAM ディスクを使う MTP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Media Transfer Protocol デバイス |
| ホスト | [CDC ACM ホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | CDC ACM 周辺機器との通信 |
| ホスト | [HID ホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | HID 周辺機器を接続して入力を読み取る |
| ホスト | [MSC ホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | USB マスストレージ周辺機器を接続する |
| ホスト | [UVC + UAC ホスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USB ビデオ／オーディオクラス周辺機器 |

</div>
