---
icon: lucide/network
description: "SF32のBluetooth PAN：BNEPによる転送、NAP/GN/PANUの役割、スマートフォンのテザリングを使う際の判断基準、SiFli-SDKの設定とOTAの検証。"
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## 概要 { #overview }

**Bluetooth PAN**（Personal Area Networking）では、SF32機器がクラシックBluetoothリンク経由でIPネットワークに接続できます。インターネットへのアクセスには、通常スマートフォンのテザリング機能を使います。これにより、専用のWi-Fi無線を追加せずに済む場合があります。PANは[Bluetooth概要](overview.md#classic-bluetooth-profiles)で紹介しているクラシックBluetoothプロファイルの1つであり、[OTAとDFU](../../develop/firmware-topics/ota-dfu.md)で扱うOTA転送方式の1つでもあります。

天気情報の取得、時刻同期、クラウドAPI呼び出し、音声アシスタントの通信、ファームウェアのダウンロードなど、断続的または中程度のIP通信にはPANを検討できます。専用Wi-Fiサブシステムの利点が、そのコスト、基板面積、統合工数、消費電力に見合わない場合は、PANを使うことで追加を避けられます。採用するハードウェアと最終製品に適用されるRF適合要件は別途確認してください。

## Bluetooth PANの仕組み { #how-bluetooth-pan-works }

PANはBluetooth SIGが定義するクラシックBluetooth（BR/EDR）プロファイルです。**BNEP**（Bluetooth Network Encapsulation Protocol）を使い、Bluetooth ACLリンク上でイーサネット形式のパケットを転送します。BNEPはRFCOMMではなくL2CAP上で動作します。PANに必要なのはBR/EDRと互換性のあるPAN実装であり、BLEへの対応は必須ではありません。クラシックBluetooth専用のハードウェアでもPANを実装できます。

PANはBLE上では動作しません。ただし、別のプロファイルである[Internet Protocol Support Profile（IPSP）](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/)は、BLE経由でのIPv6通信を規定しています。規格上の対応だけでは、SiFli-SDKやスマートフォンのテザリングサービスがIPSPを実装しているとは判断できません。以下のBLEの比較は、IPSPではなく、アプリがGATTデータを中継する方式を対象とします。

このプロファイルは3つのロールを定義します。

<div align="center"><em>表: Bluetooth PANのロール</em></div>

<div align="center" markdown>

| ロール | 機能 |
|:-----|:---------|
| **NAP**（Network Access Point） | 接続されたBluetooth機器を外部ネットワークにつなぎ、Bluetoothピコネットと外部ネットワークの間でパケットを転送する。通常は、テザリング/パーソナルホットスポットを有効にしたスマートフォンがこの役割を担う。 |
| **PANU**（PAN User） | クライアントの役割。NAP（またはGN）機器に接続し、そのネットワーク接続を利用する。SF32機器はこの役割を使用する。 |
| **GN**（Group Ad-hoc Network） | 外部ネットワークへの接続は提供せず、接続されたPANU機器の間でパケットを転送する。インターネット接続ではなく、機器間のアドホックなネットワークに使用される。 |

</div>

PANUはInquiryで近くの機器を検出し、SDPでPANサービスとロールを確認できます。Class of DeviceのNetworking表示は検出時の手掛かりであり、利用可能なNAPサービスがあることを保証しません。ACL接続とL2CAP上のBNEP接続を確立すると、NAPは実装に応じたブリッジまたはルーティングで外部ネットワークにデータを転送します。[PAN規格](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/)では、NAPはスマートフォンだけでなくLANゲートウェイにもなれます。どちらの機器も接続を終了できます。本記事のスマートフォンを使う構成では、テザリングの状態変更により再接続が必要になることがあります。

## Wi-Fiの代わりにPANを使う理由 { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>表: PAN・Wi-Fi・BLEによるネットワーク接続の比較</em></div>

<div align="center" markdown>

| アプローチ | 適している場合 | トレードオフ |
|:---------|:---------------|:---------|
| Bluetooth PAN | 製品がすでにデュアルモードBluetoothを使用し、断続的または中程度のスループットのIP通信を必要としていて、連携先のスマートフォンが通常近くにある。 | スループットと通信範囲はBR/EDRとNAPの上流回線に依存する。スマートフォンのテザリングを使う設計はその端末に依存するが、別の構成ではスマートフォン以外のNAPゲートウェイも使える。 |
| 専用Wi-Fi無線 | 製品で高いスループットを継続的に確保する必要がある、またはスマートフォンに依存しない接続が必要である。 | 無線、アンテナ、組み込み作業、電力予算が追加で必要。採用する無線ICやモジュールと最終製品に適用されるRF適合要件を確認する。 |
| BLE GATT → 連携アプリ → インターネット | 少量のデータ交換が中心で、アプリからクラウドに中継できる。 | この独自の中継方式は、機器に直接IP接続を提供するものではない。BLE IPSPは別の選択肢であり、機器のスタックとゲートウェイの対応を確認する必要がある。PANとは異なる。 |

</div>

オーディオ、GATTサービス、クラシックBluetoothプロファイルのためにデュアルモードBluetoothをすでに採用している製品では、近くにあるテザリング対応スマートフォンへの依存を許容できれば、PANは第2の無線サブシステムを追加せずにインターネット接続を実現できる、追加コストの低い方法です。

## iOSのデータ転送：BLEリレー、クラシックBluetooth、PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

ここでは、iPhoneとの接続方式を3つに分けて考える必要があります。「クラシックBluetoothにはMFiが必要」と一律に説明するのは正確ではありません。iOSは標準Bluetoothプロファイルをサポートしており、パーソナルホットスポットもBluetoothを利用できます。制限の対象となるのは、iOSアプリがAppleのExternal Accessory/iAP経由で、クラシックBluetoothアクセサリとの**独自データチャネル**を必要とする場合です。Appleの資料によると、External AccessoryはMFiアクセサリとBluetoothで通信します。一方、[技術Q&A](https://developer.apple.com/library/archive/qa/qa1657/_index.html)では、BLEアクセサリはCore Bluetoothを使用するため、MFi認証は不要と説明されています。

<div align="center"><em>表: iOSアクセサリからインターネットへの設計上の選択肢</em></div>

<div align="center" markdown>

| 方式 | 機器からスマートフォンへの通信経路 | iOS製品での考慮点 | インターネット通信速度と設計上のトレードオフ |
|:-------|:---------------------|:------------------------|:--------------------------------------------|
| BLE → アプリ → インターネット | 独自GATTプロトコルを使い、iOSアプリが機器のデータを受信してクラウドへ転送する。 | BLEはExternal AccessoryのMFi経路を使わずにCore Bluetoothを利用できる。アプリ側でペアリング、データフレームの構成、再試行、バックグラウンド動作、クラウドへの中継を管理する必要がある。 | BLEのペイロード容量と通信スケジュールは、接続パラメータやiOS/アプリの動作によって制限される。少量の断続的なデータには適しているが、汎用IPリンクではなく、継続的な通信やデータ量の多い用途では実用上のボトルネックになる可能性がある。 |
| 独自のクラシックBluetooth → アプリ | クラシックBluetoothアクセサリからiOSアプリへの独自データチャネル。 | [External Accessoryフレームワーク](https://developer.apple.com/documentation/externalaccessory)はMFiアクセサリ向けであり、AppleによるとMFi認証済みハードウェアに限られる。標準サポート対象のプロファイルは別扱いとなる。 | この経路ではMFiアクセサリと対応するアクセサリプロトコルが必要で、アプリ連携と製品としての適合性評価も必要となる。この経路だけで機器に直接IP接続を提供できるわけではない。 |
| Bluetooth PAN → スマートフォンのホットスポット → インターネット | 標準PANU-NAP接続。SF32はスマートフォンのBluetoothパーソナルホットスポット/テザリングサービスを使う。 | 独自のアプリ・アクセサリ間通信ではなく、スマートフォンのテザリングサービスを使う方式である。製品でサポートするには、スマートフォン、通信事業者、テザリングの動作を引き続き検証する必要がある。 | SF32はアプリによる中継なしで独自のIPクライアントを実行できる。ただし、BLEより高速または省エネルギーとは限らない。対象のスマートフォンで同じペイロードとサーバーを使い、実効スループット、更新時間、消費エネルギーを比較すること。結果はBluetoothリンク、端末のポリシー、上流回線、接続先に依存する。 |

</div>

継続的なストリーミングやHTTP/WebSocketによる直接通信が必要な音声アシスタント、OTAクライアントなどの製品では、対象iPhoneとSDK構成で検証できた場合、PANをBLE中継アプリに代わるネットワーク経路として利用できます。SiFliのv2.5.1サンプルは、iOSでPANだけを接続する際の既知の問題を回避するためA2DPも有効にしています。A2DPはPAN仕様の要件ではありません。PANは、製品設定、ユーザー認証、通知、ローカル制御に必要なアプリを**置き換えるものではありません**。アプリの中継によってアプリケーションのデータ経路が制約されなくなるだけです。[SF32 Xiaozhi音声アシスタント](../../projects/sf32-xiaozhi.md)は、この構成を実際に動作させている例です。

## SF32でのデバイスサポート { #device-support-on-sf32 }

SF32では、クラシックBluetoothに対応するファミリーを選び、PANスタック、SDKのバージョン、対象ボードの設定を確認してください。下表でPANに対応するファミリーはデュアルモードBluetoothを採用していますが、これはSF32の製品仕様であり、PANの規格上の要件ではありません。

<div align="center"><em>表: SF32ファミリーのPANサポート</em></div>

<div align="center" markdown>

| ファミリー | Bluetooth機能 | PANサポート |
|:-------|:----------------------|:-------------|
| SF32LB52x | デュアルモードBluetooth | あり |
| SF32LB55x | BLEのみ | なし — PANにはクラシックBluetoothが必要 |
| SF32LB56x | デュアルモードBluetooth | あり |
| SF32LB57x | デュアルモードBluetooth | PANスタックと対象ボードの検証が必要。参照するv2.5.1のPANサンプルには記載なし |
| SF32LB58x | デュアルモードBluetooth | あり |

</div>

BLE専用機器とデュアルモード機器の選定については、[Bluetooth概要](overview.md#choose-ble-classic-or-dual-mode)を参照してください。

## SiFli-SDKのPANサンプル { #sifli-sdks-pan-example }

SiFli-SDKには`example/bt/pan`にPANUの実装サンプルが含まれており、`eh-lb52x`、`eh-lb56x`、`eh-lb58x`および`sf32lb52/56/58-lcd`の各ボードシリーズに対応しています。このサンプルはスマートフォンのPAN（NAP）サービスに接続し、Finshシェルコマンドで実際のネットワーク通信を試せます。たとえば、確立済みのPANリンク経由で現在の天気を取得する`weather`コマンドがあります。READMEのスクリーンショットには、天気サービスの応答フィールドとして`id`、`name`、`country`、`path`、`timezone`、`timezone_offset`、`txt`、`code`、`temperature`、`last_update`が示されています。サンプル値は重慶（CN）、Asia/Shanghai（+08:00）、`多云`（「曇り」、コード`4`）、温度`10`、更新時刻`2025-01-13T15:54:09+08:00`です。これらはアプリケーション層の天気データであり、PAN/BNEPのフレーミングではありません。値は変わる可能性があります。

起動時にサンプルはBluetoothのInquiryとPage Scanを有効にします。これにより、スマートフォンからデバイスを検出し、デフォルトのBluetooth名`sifli_pan`でペアリングできます。

HTTPSを使う場合は、[v2.5.1のPAN README](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)に従って証明書を設定してください。既定のCA証明書は`external/mbedtls_228/certs/default`にあります。追加で必要なCA証明書は`external/mbedtls_228/certs`に配置します。DERではなくPEM形式が必要です。拡張子だけで判断せず、内容に`-----BEGIN CERTIFICATE-----`があることを確認してください。`proj.conf`で`PKG_USING_MBEDTLS_USER_CERTS`を有効にすると、ビルド時にこのディレクトリのファイルが`ports/src/tls_certificate.c`にまとめられます。接続先サーバーに必要な信頼アンカーを確認してください。PAN接続の成功はTLS証明書検証の成功を意味しません。サーバーの身元を検証し、証明書の有効期間の確認に機器の時刻を使う場合は、その時刻も確認します。

READMEにはディレクトリ名が`mbedtls_288`と記載されていますが、掲載された画面と[v2.5.1の証明書生成コード](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript)は`mbedtls_228`を使用しています。上記のパスは実装に合わせています。スクリプトは、先頭行が`-----BEGIN CERTIFICATE`で始まる証明書だけを受け付けます。この形式で保存し、ファイルが読み飛ばされていないかビルド時の警告を確認してください。

<div align="center"><em>表: PANサンプルのFinshコマンド</em></div>

<div align="center" markdown>

| コマンド | 効果 |
|:--------|:-------|
| `pan_cmd conn_pan` | スマートフォンのネットワーク共有が有効化された後にPANに接続する。 |
| `pan_cmd ota_pan` | `main.c`で指定されたファームウェアイメージをPANリンク経由でダウンロード・インストールする。 |
| `pan_cmd set_retry_flag 1` / `0` | 自動PAN再接続を有効化または無効化する。 |
| `pan_cmd set_retry_time N` | 自動接続の再試行回数の上限を設定する。 |
| `pan_cmd autoconnect` | スマートフォンが接続を切断し共有を再度有効にした後、手動で再接続を試みる。 |

</div>

サンプルを実行する前に、対象バージョンのREADMEと使用するプラットフォームに合わせて次の設定を確認してください。

- `CONFIG_BLUETOOTH`、`CONFIG_BT_PROFILE_CUSTOMIZE`、`CONFIG_CFG_PAN`、`CONFIG_BSP_BT_CONNECTION_MANAGER`を有効にします。サンプルは、iOSでPAN単独の接続ができないという文書記載の問題を回避するため、A2DPも有効にしています。A2DPはPAN規格の要件ではありません。
- `CONFIG_BT_FINSH`はオプションのBluetooth制御コマンドを有効にします。試験で使用するコマンドに必要なシェル機能を残してください。
- Bluetoothを実行するプロセッサーに合わせて`CONFIG_BSP_BLE_NVDS_SYNC`を設定します。READMEではHCPUの場合は有効、LCPUの場合は無効です。プロセッサー割り当てが異なる構成をそのままコピーしないでください。
- 前回接続した機器への再接続には、`CONFIG_BT_AUTO_CONNECT_LAST_DEVICE`と`CONFIG_PKG_USING_FLASHDB`を確認します。再起動後の設定保持を検証し、上表の再試行設定で回数を制限してください。無制限の再試行は避けます。

## スマートフォンOSの対応状況と製品検証 { #mobile-phone-os-support-and-qualification }

スマートフォンはPANの**NAP**として製品のネットワーク経路を構成する要素であり、単なる初期設定用のツールではありません。OS、機種、通信事業者のプラン、テザリングの制限を、製品のサポート条件として管理してください。Bluetoothのペアリングに成功しただけでは不十分です。スマートフォンがBluetoothテザリング/PANサービスを提供し、PANU接続後に通信を中継することを確認する必要があります。

<div align="center"><em>表: スマートフォンOSごとのBluetooth PAN対応状況</em></div>

<div align="center" markdown>

| モバイルOS | プラットフォームの公開情報 | SF32での立ち上げ手順 | 製品での検証範囲 |
|:----------|:----------------------------|:-----------------------|:-------------------------------|
| **モバイル通信が利用可能なiOS / iPadOS** | [Appleのパーソナルホットスポットに関する説明](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27)では、Bluetoothが接続方法の1つとして挙げられ、携帯電話回線のインターネット接続を共有できると説明されています。 | [SiFli XiaozhiのiOS接続手順](https://docs.sifli.com/projects/xiaozhi/get-started/)に従います。モバイル通信サービスが有効なスマートフォンを使い、ペアリング前にパーソナルホットスポットを有効にしてBluetoothもオンにし、SF32機器とペアリングして接続します。`sifli-pan`が表示されない場合は、SiFliのガイドにあるようにスマートフォンを再起動すると改善することがあります。 | パーソナルホットスポットの利用可否、データ制限、接続可能台数は通信事業者とiPhoneの機種に依存します。サポート対象のiOS/iPadOS各バージョン、機種、通信プランで試験してください。Wi-Fiホットスポットが動作することだけを根拠に、Bluetooth PANも使えると判断しないでください。 |
| **Android** | [Androidヘルプ](https://support.google.com/android/answer/9059108)によると、多くのAndroid端末はBluetoothでモバイルデータ通信を共有できると説明されています。まずペアリングし、接続先機器のBluetoothネットワーク接続を設定してから、**Bluetoothテザリング**を有効にします。 | `pan_cmd conn_pan`の前にBluetoothテザリングを有効にします。設定名やメニューの場所はメーカー、Androidのバージョン、企業の管理ポリシーによって異なるため、検証した端末ごとに設定手順を記録してください。 | Googleの説明は*多くの端末*を対象としており、全機種への対応を保証するものではありません。通信事業者による制限や追加料金、メーカーによる設定項目の非表示・変更もあり得ます。Androidのバージョンだけで判断せず、製品でサポートする機種・OS・通信事業者の組み合わせを試験してください。 |
| **HarmonyOSおよびその他のAndroid派生モバイルシステム** | このガイドでは、これらのシステム全般に対するPANの対応を断定していません。Bluetoothとテザリングの実装はAndroidをベースにしている場合でも、機種、市場、リリース、通信事業者の設定、端末管理ポリシーによって異なることがあります。 | Bluetoothテザリングの設定を探し、スマートフォンとSF32デバイスをペアリングしたうえで、PANの例を使って実際のIP通信を確認します。 | Androidと同じ検証項目を通過するまでは、機種、OSビルド、地域、通信事業者の組み合わせごとに**要検証**として扱ってください。ブランドやBluetoothのペアリングだけを根拠に対応を謳わないでください。 |

</div>

### スマートフォン側の設定 { #phone-side-setup }

<div align="center"><em>図: iOSのパーソナルホットスポットとAndroidのBluetoothテザリング設定項目の表示例</em></div>

![iOSパーソナルホットスポットとAndroid Bluetoothテザリング設定の例示](assets/mobile-hotspot-switches-illustrative.png)

これは設定項目の例であり、実際のOS画面を撮影したものではありません。表示名やメニューの場所は、iOS/iPadOSのバージョン、Androidのメーカー、端末管理ポリシーによって異なります。iOS/iPadOSでは**ほかの人の接続を許可**、Androidでは**Bluetoothテザリング**を探してください。SiFli v2.5.1の[iOS画面](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md)では**Maximize Compatibility**も有効になっています。これは設定例でありPANの必須条件ではありません。対象端末で必要性を確認してください。

各スマートフォンについて、次の手順で確認してください。

1. スマートフォンの上流回線を確認します。Appleのパーソナルホットスポットはモバイルデータ通信を共有するため、通信事業者がテザリングを許可していることを確認してください。一部のAndroid端末はWi-Fi接続も共有できますが、対象の機種とOSビルドで検証が必要です。
2. SF32デバイスからPANを要求する**前に**、スマートフォンのBluetoothテザリングまたはパーソナルホットスポット機能を有効にします。
3. OSが要求する場合はスマートフォンを検出可能な状態に保ちながら、スマートフォンとデバイスをペアリングします。
4. `pan_cmd conn_pan`を実行し、サンプルの`weather`コマンドなどで実際のIP通信を確認します。Bluetooth接続の成功だけでは動作確認として不十分です。
5. テザリングを無効にし、スマートフォンをスリープ状態から復帰させ、さらに通信範囲外へ移動します。製品で想定する再接続動作を確認してください。

Bluetooth接続がすでに確立された後にのみ共有が有効化された場合は、`pan_cmd conn_pan`で明示的にPANを再接続してください。

### 製品でサポートするスマートフォンの組み合わせを定義する { #define-a-shipping-phone-support-matrix }

一般向け製品では、単に「iOS対応」「Android対応」とせず、サポートする**スマートフォン機種＋OSバージョン＋通信事業者/地域**の組み合わせを明記してください。候補ごとに、機種、OSビルド、通信事業者、モバイル通信サービスとSIM/eSIMの状態、テザリング設定名、初回接続時間、画面ロック時や無線切断後の再接続動作、継続通信の結果、サービス復旧に必要なユーザー操作を記録します。アプリ、PANファームウェア、スマートフォンOS、通信事業者の設定が変わるたびに、組み合わせを再検証してください。

## PANベースのOTA配信 { #pan-based-ota-delivery }

PANサンプルでは、デフォルトでOTAが有効です。`pan_cmd ota_pan`を実行すると、ネットワーク通信に使っているBluetooth PANリンク経由でファームウェアイメージをダウンロードしてインストールします。これはSiFli-SDKのファームウェア更新サービスに記載されたDFU_PAN OTA経路を利用します。すでにPANでデータ通信を行い、OTA用に別の転送方式を追加したくない製品に適しています。PANとBLEなどの更新方式の違いは[OTAとDFU](../../develop/firmware-topics/ota-dfu.md)を参照してください。転送方式にかかわらず、ロールバックと障害復旧の動作を計画してください。

READMEは、選択したターゲットに適切なOTA用`ptab.json`がない場合のビルド失敗も説明しています。掲載画面ではDFUサブプロジェクトとミドルウェアのファームウェア更新機能を無効にし、OTAなしのサンプルを試しています。この切り分けではOTAが使えなくなるため、更新機能が必要な製品の出荷構成にはできません。OTAを有効にする前に、適切なパーティション構成と更新設定を用意して検証してください。

PANは転送経路を提供するだけで、ファームウェアの真正性や障害復旧を保証しません。出荷前にサーバー認証、イメージの真正性と完全性、対象機種・バージョンとの互換性、中断後の復旧を検証してください。通信切断と電源断の両方を試し、ブートローダーが実際に行う復旧やロールバックを確認します。ダウンロードコマンドだけでこれらが実現されるとは考えないでください。

## PANを使用したSF32製品の例 { #a-real-sf32-product-using-pan }

[SF32 Xiaozhi音声アシスタント](../../projects/sf32-xiaozhi.md)は、SF32でPANを使う製品の実例です。ペアリング済みスマートフォン経由でインターネットに接続し、そのリンクを通じてクラウドサービスへ音声をストリーミングします。PANによるネットワーク接続、WebSocket/HTTP通信、スマートフォンのテザリングへの依存を、製品全体でどのように組み合わせるかを確認できます。

## トラブルシューティング { #troubleshooting }

READMEはBluetoothアドレスの割り当ても確認項目に挙げています。`nvds get_mac`でアドレスを確認してください。OUIは自社に割り当てられたもの、または製品での使用が認められたものを使い、機器ごとに一意のアドレスを割り当てます。サンプルから他社のOUIをコピーしないでください。`nvds update addr 6 xxxxxxYYYYYY`では、`YYYYYY`はOUIのバイト順を逆にした値、`xxxxxx`は残りの3バイトです。表示形式のMACアドレスをそのまま貼り付けず、コマンドのバイト順に従ってください。

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS`は手動で変更したアドレスを上書きする場合があります。使用が認められたテスト用アドレスが再起動後に保持されない場合、READMEはこの設定を無効にして再ビルド・書き込み後、再度アドレスを設定するよう案内しています。これは試験時の切り分け手順であり、量産時のアドレス管理方針ではありません。出荷前に、自動割り当てまたは工場書き込みの方針どおりに再起動後も動作するか確認してください。

<div align="center"><em>表: Bluetooth PANのトラブルシューティング</em></div>

<div align="center" markdown>

| 症状 | 確認事項と対処 |
|:--------|:--------------|
| PANは接続するが、ネットワークコマンド（例: `weather`）が失敗する | BNEP接続、IPアドレスの取得、経路、DNS、接続先の稼働状態、必要に応じてTLSエラーを確認する。READMEは`nvds get_mac`によるBluetooth MACのOUI確認も推奨している。`nvds update addr 6 ...`による変更は、認められたアドレス割り当て方針に従って行う。OUIの不備だけが原因とは限らない。 |
| スマートフォンがデバイスを認識しない、または接続できない | 接続する*前に*スマートフォンのテザリング/ネットワーク共有が有効になっていること、そしてデバイスが検出可能（InquiryとPage Scanが有効）であることを確認する。 |
| スマートフォンはペアリングするが、`weather`や他のIP操作が失敗する | ペアリングだけではPAN NAPサービスの提供を確認できない。Bluetoothテザリング/パーソナルホットスポットと上流回線を確認する。モバイル回線では通信事業者の許可、AndroidのWi-Fi共有では対象機種・OSの対応を確認し、検証対象の組み合わせをサポート一覧と照合する。 |
| スマートフォン側のネットワーク状態変化後にPANが切断される | 起こり得る挙動であり、対応する端末ごとに検証する。`pan_cmd conn_pan`で再接続するか、`pan_cmd set_retry_flag 1`を有効にし、上記の再試行回数設定で自動再接続の回数を制限する。 |
| PAN経由のOTAが途中で失敗する | 他のOTA転送方式と同様に扱う。PAN自体が原因だと想定するのではなく、[OTAとDFU](../../develop/firmware-topics/ota-dfu.md)に従ってイメージのURL、パーティションレイアウト、ロールバックの挙動を検証する。 |

</div>

## 立ち上げチェックリスト { #bring-up-checklist }

- [ ] ハードウェアのクラシックBluetooth対応と、使用するSDK・ボードでのPANスタックおよび設定を確認する。参照サンプルはSF32LB52x/56x/58xを対象としており、SF32LB57xは個別の検証が必要。SF32LB55xはBLEのみ。
- [ ] スマートフォンのテザリングに依存する構成が製品の通信要件に合うか、専用Wi-Fiが必要かを判断する。
- [ ] 対象ボードで`example/bt/pan`を立ち上げ、スマートフォン側のテザリング設定（iOS/iPadOSのパーソナルホットスポットまたはAndroidのBluetoothテザリング）を確認する。
- [ ] 実際のPAN接続と、少なくとも1つのネットワーク操作（例: サンプルの`weather`コマンド）をエンドツーエンドで検証する。
- [ ] 意図するすべてのスマートフォン機種、OSビルド、地域/キャリアプラン、テザリング設定パスを検証する。「iOS/Android対応」という一般的な主張のまま出荷しないこと。
- [ ] ネットワーク機能に依存する前に、デバイスのBluetooth MAC OUIが有効であることを確認する。
- [ ] OTAにPANを使用する場合は、出荷前にロールバックの挙動を含む`pan_cmd ota_pan`の全パスをテストする。
- [ ] スマートフォンが通信範囲内にいる頻度を想定し、それに合わせて再接続・自動接続の動作（`set_retry_flag`、`set_retry_time`）を設計する。

## 要点のまとめ { #key-takeaways }

- Bluetooth PANは、L2CAP上のBNEPを使ってBR/EDR上でIP/Ethernet形式のデータを転送します。BLE対応は必須ではありません。BLE経由のIPv6通信にはPANではなく別のIPSPプロファイルを使い、スタックとゲートウェイの対応を確認する必要があります。
- SF32デバイスはクライアントの**PANU**ロールを使用し、通常はテザリング/パーソナルホットスポット機能を通じて**NAP**として動作するスマートフォンに接続します。
- iOSでは、BLEアクセサリはMFiなしでCore Bluetoothを使用できます。一方、External Accessory/iAPを通じた独自のアプリ・アクセサリ間クラシックBluetoothデータチャネルにはMFi認証が必要です。PANは代わりにスマートフォンのテザリングサービスを使用し、SF32デバイスがBLEアプリの中継ではなく独自のIPクライアントを使用できるようにします。
- 参照するPANサンプルはSF32LB52x/56x/58xを対象としています。SF32LB57xのハードウェアはデュアルモード対応ですが、PANスタックとボードの個別検証が必要です。SF32LB55xはBLEのみで、PANは使えません。
- SiFli-SDKの`example/bt/pan`は、接続、再接続、PANベースのOTA配信のためのFinshコマンドを含む、動作するリファレンス実装です。
- スマートフォンが通常近くにあり、断続的または中程度のIP通信を行う製品には、テザリングを使うPANが適しています。継続的な高速通信やスマートフォンに依存しない動作が必要なら、専用Wi-Fiや別の独立したネットワーク経路を検討してください。スマートフォン以外のNAPゲートウェイも選択肢です。
