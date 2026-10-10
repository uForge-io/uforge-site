---
icon: lucide/bluetooth-connected
title: "Bluetooth SDKの例"
description: "BLEサービス、Classic Bluetoothプロファイル、スマートフォン統合、OTA、データ転送、LE Audioブロードキャストに適したSiFli-SDK Bluetoothの例を選ぶ。"
tags:
  - Bluetooth
  - サンプル
---

# Bluetooth SDKの例 { #bluetooth-sdk-examples }

SiFli-SDKのBluetooth例は、プロファイル、ロール、無線通信のワークフローに焦点を絞った出発点であり、そのまま使える製品ファームウェアではありません。製品で最も厳しい技術要件に対応するプロジェクトから始め、変更していないサンプルを対象ボードで動作させ、その後、一度に1つずつ製品要件を追加してください。

このページでは、SF32LB58xの文書に掲載された[クラシックBluetooth (Classic Bluetooth)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html)、[BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html)、[LE Audioブロードキャスト](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html)の例を、開発タスク別に整理しています。URLの`sf32lb58x`は文書の掲載先を示すもので、すべてのSF32LB58xボードや他のSF32ファミリーでの対応を保証しません。また、`latest`は随時更新されます。使用するSDKリリースまたはコミットに対応する各プロジェクトの「Supported Platforms」を確認し、そこに記載されたボード名とビルド手順だけを使用してください。対象ボードまたはSDKリビジョンとの対応が明記されていない場合は「未確認」と扱い、URL、別のサンプル、似た名前のボードから推測しないでください。「All platforms」と記載されている場合も、製品開発に進む前に実際のSDKリビジョンとボード構成でビルドを確認します。`menuconfig`設定、テスト機材、制限事項についても、各プロジェクトの公式ページを確認してください。

## 製品に合ったBluetooth方式を選ぶ { #start-with-the-right-bluetooth-path }

<div align="center"><em>表：Bluetooth SDK例の選定</em></div>

<div align="center" markdown>

| 製品要件 | ここから始める | 製品に組み込む前に検証すること |
|:-------------|:-----------|:-------------------------------------|
| カスタムBLEサービスまたはコンパニオンアプリのリンク | [BLEペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | アドバタイズ、接続、サービスのインターフェースと動作、再接続、スマートフォン側の検証 |
| スマートフォンにはPeripheral、センサーにはCentralとして同時接続する | [BLEセントラルおよびペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | GAPの複数ロールの同時動作と、GATTクライアント/サーバーの役割分担 |
| 信頼性の高いBLEデータ転送 | [BLEスループット](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html)または[BLEファイル転送](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | 必要なペイロードのフロー、接続設定、復旧挙動 |
| Bluetoothファームウェア更新 | [OTA付きペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html)または[Pingpong OTA付きセントラルおよびペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | 更新時の役割分担、更新中断からの復旧、パーティション、ロールバック計画 |
| Classic Bluetoothのシリアル通信またはスマートフォン経由のネットワーク接続 | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html)または[PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | SPPのシリアルプロファイルまたはスマートフォン経由のネットワーク接続が製品要件に合うか、相手機器との互換性、再接続動作 |
| BT/BLEのホストとコントローラー間のUART HCI転送 | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | ホスト/コントローラーの境界、UART転送、対象コントローラーとボード構成 |
| Classic Bluetoothオーディオまたは通話 | [音楽受信 (Music Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html)、[音楽送信 (Music Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html)、または[HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | オーディオ経路、クロック構成、バッファリング、スマートフォンとの相互運用性、消費電力の予算 |
| LE Audioブロードキャスト | [BAPブロードキャストソース](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html)または[BAPブロードキャストシンク](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | ブロードキャストロール、オーディオパイプライン、テスト用の受信機または送信機、タイミングマージン |

</div>

## 例を動かして検証の基準にする { #bring-up-an-example-as-evidence }

プロジェクトを変更する前に、正確なSDKバージョン、ボード名、構成、相手機器またはアプリ、無線設定、期待されるログを記録してください。その後、次の手順を進めてください。

1. 使用するSDKリリースに対応するプロジェクトページに記載された正確なボード名と手順で、変更していないサンプルをビルド・書き込みします。SDKリリースと文書の対応、または対象ボードのサポートを確認できない場合は、移植前に「未確認」とします。
2. デバイス検出、接続、転送、ストリーミング、受信など、その特徴的な無線上の挙動を必要に応じて実証します。
3. リセット、切断、再接続、電源の再投入後にテストを繰り返します。
4. 一度に1つずつ、製品固有のサービス、ユーザーフロー、オーディオルート、電力ポリシーを追加します。
5. ディスプレイ、センサー、ストレージ、オーディオ、低消費電力状態への遷移などを含む複合負荷を製品にかけ、必要に応じて再テストします。

動作する例が示すのは、その例が扱うワークフローに限られます。製品のセキュリティポリシー、無線の到達範囲、レイテンシ、消費電力、相互運用性がリリース可能な状態であることを示すものではありません。

## BLEの例 { #ble-examples }

コンパニオンアプリのリンク、相互運用可能なGATTサービス、ビーコン、データ転送、BLEベースのOTAにはBLEの例を使用してください。まず必要な役割に合ったサンプルを選び、製品がその標準化されたサービスを必要とする場合にのみプロファイルの例を追加してください。

<div align="center"><em>表：開発タスク別のBLE SDK例</em></div>

<div align="center" markdown>

| 開発タスク | 公式の例 | 検証する内容 |
|:-----------------|:------------------|:--------------------------------|
| 基礎となるロールとサービスアクセス | [ペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html)、[セントラルおよびペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html)、[マルチ接続](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | アドバタイズ、スキャン、接続管理の主体、正しいセントラル/ペリフェラルの分担 |
| スマートフォン統合 | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html)、[ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html)、[デュアルコアANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Appleのメディアまたは通知統合、必要なスマートフォン側のペアリングフロー |
| 標準GATTプロファイル | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html)、[CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html)、[CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html)、[DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html)、[HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html)、[CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | サービスの役割、GATTキャラクタリスティックの仕様、標準プロファイルと相手側デバイスとの相互運用性 |
| 入力とインターコム | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html)、[BLEインターコム (BLE Talkback)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | 製品のUIや音声挙動を追加する前のインタラクションモデル |
| ペアリングと再接続の挙動 | [BLEペアリング (BLE Pair)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | ボンディング、アイデンティティ処理、製品の再ペアリングパス |
| アドバタイズと発見 | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html)、[周期的アドバタイズ](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html)、[周期的アドバタイズ同期](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | GATT接続を前提とせず、必要なブロードキャストまたは同期の挙動 |
| データ転送とOTA | [ファイル転送](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html)、[スループット](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html)、[OTA付きペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html)、[Pingpong OTA付きセントラルおよびペリフェラル](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | ペイロード、リンクパラメータ、更新ロール、転送中断からの復旧、エンドツーエンドの検証 |

</div>

スループットの結果を製品のデータレートとして扱わないでください。選択したPHY、接続設定、ピアの挙動、RF環境、ホストの活動、ペイロードのパターンに依存します。同様に、ANCSやAMSの例はスマートフォン統合の基準構成であり、すべてのiOSリリースやユーザー許可状態を保証するものではありません。

## Classic Bluetoothの例 { #classic-bluetooth-examples }

Classic Bluetoothのプロジェクトは、BR/EDRプロファイル、オーディオ、シリアル形式の通信、またはスマートフォン経由のIPネットワークを必要とする製品に適しています。開発ボード上での動作確認は出発点にすぎません。製品で使用する実際の相手機器とワークロードで相互運用性を検証してください。

<div align="center"><em>表：開発タスク別のClassic Bluetooth SDK例</em></div>

<div align="center" markdown>

| 開発タスク | 公式の例 | 検証する内容 |
|:-----------------|:------------------|:--------------------------------|
| ホスト/コントローラー間の転送またはClassic Bluetoothのシリアルプロファイル | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html)、[SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | HCIのホスト/コントローラー境界とUART転送、またはSPPのシリアルプロファイル動作 |
| オーディオストリーミングとメディア制御 | [A2DPマルチ接続](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html)、[A2DP共有](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html)、[AVRCPカバーアート](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html)、[音楽受信 (Music Sink)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html)、[リレー付き音楽受信 (Music Sink with Relay)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html)、[音楽送信 (Music Source)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | 想定するソース/シンクの構成、オーディオ経路、メディア制御の経路、リソース予算 |
| 通話と音声リンク | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html)、[HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html)、[HFPリレー](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | 通話のトポロジー、オーディオレイテンシ、マイク/スピーカーパス、スマートフォンの挙動 |
| スマートフォン経由のネットワーク接続とOTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html)、[PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | スマートフォンのテザリング、IPトラフィック、再接続、OTA配信経路 |

</div>

PANのネットワーキングモデルとスマートフォン側のセットアップについては、[Bluetooth PAN](pan.md)を参照してください。オーディオルーティング、バッファの所有権、システム負荷の検証については、[オーディオ概要](../audio/overview.md)と[Audio Serverとバッファリング](../audio/audio-server-buffering.md)を参照してください。

## LE Audioブロードキャストの例 { #le-audio-broadcast-examples }

`sf32lb58x`という文書パスだけでは、対象ボードの対応は確認できません。実際に使用するSDKリビジョンとボードについて、各プロジェクトの**Supported Platforms**を確認してください。Classic BluetoothとBAPの橋渡しサンプルでは、READMEのタイトルは送信側ですが、記載されたパスと概要は受信側を説明しています。[今回確認したSDKの実装](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c)はClassic A2DPを処理し、BAPブロードキャスト送信側を起動します。この確認結果はリンク先の固定コミットに限られ、`latest`で公開されるすべてのSDKリリースに当てはまるとは限りません。ビルド前に、実際に使うSDKリリースまたはコミットのREADME、ソース、ボード構成を確認してください。コピーされた受信側の説明から役割やボード対応を推測しないでください。

`zbt`プロジェクトでは、LE Audioの[Basic Audio Profile（BAP）](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/)に基づくブロードキャスト送信側と受信側の例を提供しています。送信側（Source）と受信側（Sink）を組み合わせてシステムとしてテストしてください。ブロードキャスト構成、オーディオソース、受信機、クロック構成、RF条件はすべて観測される結果に影響します。

<div align="center"><em>表：LE Audioブロードキャスト SDK例</em></div>

<div align="center" markdown>

| 想定する使い方 | 公式の例 | 最初に検証すること |
|:------------------|:-----------------|:------------------------|
| ブロードキャストオーディオストリームを受信する | [BAPブロードキャストシンク](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | 受信機の動作、出力オーディオ経路、テスト用ブロードキャスト構成 |
| ブロードキャストオーディオストリームを送信する | [BAPブロードキャストソース](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | 送信側のオーディオパイプライン、ブロードキャスト構成、動作確認済みの受信機 |
| Classic BluetoothとLE Audioブロードキャストを橋渡しする | [Classic Bluetoothを伴うBAPブロードキャストソース](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | 2つの音声処理系、データを受け渡す位置、同時動作時のタイミングとリソースの余裕 |

</div>

## 例を超えた製品検証 { #product-validation-beyond-the-example }

<div align="center"><em>表：Bluetooth例の製品適応チェック</em></div>

<div align="center" markdown>

| 境界 | ソースの例から維持すること | 製品向けに再検証すること |
|:---------|:---------------------------------|:----------------------------|
| 無線の挙動 | サポートされているボードと、その例が意図するロールまたはプロファイル | アンテナ、筐体、到達範囲、RF共存、相手機器、規制適合性の試験計画 |
| 接続ポリシー | 基準となるアドバタイズ、スキャン、または接続フロー | 製品のレイテンシ、消費電力の目標、再接続戦略、状態遷移 |
| セキュリティ | 例のペアリングまたはボンディング設定 | 認証要件、鍵の保存、プライバシー、工場出荷時リセット、ユーザー向けの復旧 |
| データとオーディオ | 実証されたパケットまたはストリームのフロー | データ形式とやり取りの仕様、エラー復旧、レイテンシ、バッファリング、コーデック構成、メモリのマージン |
| 検証記録 | ビルド設定、ログ、期待される挙動 | 再現可能なスマートフォン/アクセサリの組み合わせ、消費電力の測定波形、切断からの復旧、回帰テスト |

</div>

## 関連リソース { #related-resources }

- 製品レベルのロール、プロファイル、セキュリティ、接続パラメータ、共存に関する選択については[Bluetooth概要](overview.md)。
- ホスト/コントローラの境界と電力挙動については[Bluetoothプロセッサアーキテクチャ](processor.md)。
- スマートフォンテザリングによるIPネットワーキングとPANベースのOTAについては[Bluetooth PAN](pan.md)。
- Bluetoothオーディオ開発を補完する、ローカルキャプチャ、コーデック、再生の例については[オーディオSDKサンプル](../audio/audio-sdk-examples.md)。
- 分野横断のSDK例カタログについては[サンプル](../../develop/examples/index.md)。
