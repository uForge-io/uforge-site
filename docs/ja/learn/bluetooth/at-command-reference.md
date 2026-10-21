---
icon: lucide/list
description: "SF32LB57デュアルモードBluetoothモジュール（SIFLI_AT）のATコマンドリファレンス。フレーム形式、ペアリング、接続、データ転送、GATT、URC、PDUコマンド。"
tags:
  - Bluetooth
---

# ATコマンドセット { #at-command-reference }

<div align="center"><em>表: 文書情報</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| バージョン | V1.2.1 |
| 日付 | 2026-07-28 |
| 対象モジュール | SF32LB57デュアルモードBluetoothモジュール（SIFLI_AT） |

</div>

このリファレンスでは、SF32LB57デュアルモードBluetoothモジュール（SIFLI_AT）バージョンV1.2.1の外部ATコマンドインターフェースについて説明します。コマンドと応答文字列は等幅で表記されます。`\r`はキャリッジリターン（0x0D）を、`\n`はラインフィード（0x0A）を表します。ATコマンドはASCIIテキストとして送信され、PDUフレーム内のバイナリフィールドはリトルエンディアンのバイト順を使用します。

これは、Bluetooth ATコマンドモジュールページから参照される完全なATインターフェース仕様です。

<div align="center"><em>表: 改訂履歴</em></div>

<div align="center" markdown>

| バージョン | 変更内容 | 日付 |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: `AT+CFGRESET`を追加。起動時のClassic Bluetooth名の同期、`CLEARLINKKEY`、接続ハンドル、PDUに関する文書を更新。BQBビルド設定を有効化。 | 2026-07-28 |

</div>

## 概要 { #overview }

SF32LB57のデュアルモードBluetoothモジュールは、BLEとClassic Bluetooth（BR/EDR）の両方を扱うUARTベースのATコマンドインターフェースをホストに提供します。ホストはATコマンドでデバイスの設定や接続を管理し、データを送受信できるほか、モジュールからの非同期ステータス通知も受信できます。

### デフォルト設定 { #default-settings }

<div align="center"><em>表: デフォルト設定</em></div>

<div align="center" markdown>

| 項目 | デフォルト値 |
|:-----|:----------------|
| デバイス名 | `SIFLI_AT` |
| シリアルボーレート | 460800 bps |
| コマンド/パススルーモード | パススルーモード |
| Bluetooth動作モード | デュアルモード（BLE+BT） |
| イベント通知 | 通常通知 |
| デバイス名へのMACアドレスサフィックス付加 | オフ |
| Class of Device（COD） | `000000` |
| BLE MTU上限 | 247 |
| マルチ接続の全体設定 | 有効（1） |
| パススルーアイドル切断時間 | 0（オフ） |
| 電源投入時のGATT自動ロード | オン |
| BLEランダムアドレス | オフ（パブリックアドレスを使用） |
| Bluetoothアドレス | チップUIDから自動生成 |

</div>

## コマンド形式 { #command-format }

### 構文定義 { #syntax-definition }

ATコマンドはASCIIテキストで送信し、キャリッジリターン`\r`（0x0D）で終端します。コマンドのプレフィックスは`AT+`（AT形式）または`AT>`（PDU形式）です。SF32LB57のATポートはUSART1で、ハードウェアフロー制御なしの8N1形式を使用します。デフォルトのボーレートは460800 bps、1フレームの上限は512バイトです。

### AT形式コマンド { #at-format-commands }

<div align="center"><em>表: AT形式コマンドの形式</em></div>

<div align="center" markdown>

| 形式 | コマンド | 説明 |
|:-----|:--------|:-------------|
| クエリ | `AT+<CMD>?\r` | パラメーターまたはステータスを読み取る |
| 設定 | `AT+<CMD>=<param>[,<param>...]\r` | パラメーターを書き込む |
| 実行 | `AT+<CMD>\r` | 動作をトリガーする |

</div>

<div align="center"><em>表: AT形式の応答</em></div>

<div align="center" markdown>

| 結果 | 応答文字列 |
|:-------|:------------------|
| 成功 | `\r\nOK\r\n` |
| 失敗 | `\r\nERROR\r\n`または`\r\nFALSE\r\n` |
| クエリの戻り値 | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### PDU形式コマンドのフレーム構成 { #pdu-format-command-framing }

PDUコマンドは、モジュールがコマンドモードにある間にバイナリペイロードを転送します。特に断りのない限り、フレーム内の数値フィールドはリトルエンディアンであり、`data`は生のバイナリデータです。

**コマンド（ホスト → モジュール）**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>表: PDUコマンドフレーム構造</em></div>

<div align="center" markdown>

| 要素 | 説明 |
|:--------|:-------------|
| `AT>` | コマンドプレフィックス、3バイトASCII |
| Opcode | 2バイトリトルエンディアンの操作コード。`0x0101`、`0x0102` |
| Total Length | Bodyの総バイト数、2バイトリトルエンディアン |
| Body | ペイロード。構造はOpcodeに依存する |
| `\r` | 1バイトのコマンド終端文字 |

</div>

**レポート（モジュール → ホスト）**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## コマンドと応答 { #commands-and-responses }

以下のコマンドは機能別に分類されています。分類はBluetooth ATコマンドモジュールページの一覧と同じです。

### システムとデバイス { #system-and-device }

#### ファームウェアバージョンの取得 { #get-firmware-version }

<div align="center"><em>表: ファームウェアバージョンの取得</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GFWVER?\r` |
| 応答 | 成功: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`。設定コマンドではすべて`\r\nERROR\r\n`を返します。 |
| パラメーター | なし |
| 備考 | クエリのみ。戻り値は常に`SIFLI_AT_`で始まり、その後にバージョン番号とビルド日付が続く。 |

</div>

#### デバイス名の照会 { #query-device-name }

<div align="center"><em>表: デバイス名の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+NAME?\r` |
| 応答 | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| パラメーター | なし |
| 備考 | 現在設定されているデバイス名を返します（MACサフィックスは含みません。サフィックスが反映されるのはアドバタイズ名のみです）。 |

</div>

#### デバイス名の設定 { #set-device-name }

<div align="center"><em>表: デバイス名の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+NAME=<device name>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | デバイス名: 長さ1～29バイトの文字列。空、または29バイトを超える場合は`ERROR`を返す。デフォルトは`SIFLI_AT`。 |
| 備考 | デバイス名の設定を更新し、ローカル名とBLEスキャン応答の名前に反映します。最終的にアドバタイズされる名前は`MACNAME`で制御します。 |

</div>

#### デバイス名へのMACサフィックス付加設定の照会 { #query-mac-name-suffix-switch }

<div align="center"><em>表: デバイス名へのMACサフィックス付加設定の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+MACNAME?\r` |
| 応答 | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| パラメーター | なし |
| 備考 | サフィックス付加設定の状態を返します。0 = オフ、1 = オン。 |

</div>

#### デバイス名へのMACサフィックス付加設定の変更 { #set-mac-name-suffix-switch }

<div align="center"><em>表: デバイス名へのMACサフィックス付加設定の変更</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+MACNAME=<value>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | 値: 0 = デバイス名をそのまま表示する。1 = デバイス名の末尾に`-XXXX`を付加する（XXXXはローカルBD_ADDRの下位2バイトを表す大文字の16進数）。範囲は0～1、デフォルトは0です。 |
| 備考 | 設定を更新します。オンにしたとき、デバイス名とサフィックスの合計が表示名の上限である29バイトを超える場合は、5バイトのサフィックスを残してデバイス名を切り詰めます。 |

</div>

#### IEEE 1284デバイスIDの照会 { #query-ieee-1284-device-id }

<div align="center"><em>表: IEEE 1284デバイスIDの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+1284ID?\r` |
| 応答 | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| パラメーター | なし |
| 備考 | 現在設定されているIEEE 1284デバイスID文字列を返す。設定されていない場合は空。 |

</div>

#### IEEE 1284デバイスIDの設定 { #set-ieee-1284-device-id }

<div align="center"><em>表: IEEE 1284デバイスIDの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+1284ID=<ID string>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | ID文字列: IEEE 1284デバイスID文字列。長さはストレージバッファーの容量未満でなければならず、超過すると`ERROR`を返す。デフォルトは空文字列。 |
| 備考 | 設定内容を更新します。 |

</div>

#### デバイスのリセット { #reset-device }

<div align="center"><em>表: デバイスのリセット</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+RESET\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式（`AT+RESET?\r`）: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | コマンドを受信すると、モジュールは現在のAT設定を保存して`OK`を返し、その後アドバタイズを停止し、接続を切断してソフトリセットします。このコマンド自体は設定を変更しません。 |

</div>

#### 工場出荷時リセット { #factory-reset }

<div align="center"><em>表: 工場出荷時リセット</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+FACTORYRESET\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式（`AT+FACTORYRESET?\r`）: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | AT設定を初期化し、カスタムGATTサービス設定、BLEボンディング情報、Classic Bluetooth（BR/EDR）のペアリング情報、BLEの静的ランダムアドレスを消去してから`OK`を返し、リセットします。リセット後、ホストは`IM_READY`を待つ必要があります。 |

</div>

#### 設定リセット { #configuration-reset }

<div align="center"><em>表: 設定リセット</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+CFGRESET\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式（`AT+CFGRESET?\r`）: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | AT設定と保存済みのカスタムGATTサービス設定を初期化してから`OK`を返し、リセットします。ペアリング情報と現在のBLEアドレスは保持されます。 |

</div>

#### OTAアップグレードモードへの移行 { #enter-ota-upgrade-mode }

<div align="center"><em>表: OTAアップグレードモードへの移行</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+OTA\r` |
| 応答 | 成功: `\r\nOK\r\n`（その後DFUモードに入りリセットする — それ以上の応答はない）。クエリ形式（`AT+OTA?\r`）: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | 現在のAT設定を保存して`OK`を返した後、DFUフラグを書き込み、UART DFUアップグレードモードで再起動します。 |

</div>

#### 周波数オフセット校正値の照会 { #query-frequency-offset-calibration }

<div align="center"><em>表: 周波数オフセット校正値の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+TRIM?\r` |
| 応答 | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| パラメーター | `freq_off`: 現在記録されている周波数オフセット校正値。単位はHzです。 |
| 備考 | AT設定に記録されている値を返します。実際に有効な値は`FACTORY_CFG_ID_CRYSTAL`パーティションに保存されています。 |

</div>

#### 周波数オフセット校正値の設定 { #set-frequency-offset-calibration }

<div align="center"><em>表: 周波数オフセット校正値の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+TRIM=<freq_off>\r` |
| 応答 | 成功: `\r\nOK\r\n`。値が範囲外の場合、または校正インターフェースでエラーが発生した場合: `\r\nERROR\r\n` |
| パラメーター | `freq_off`: 周波数オフセット校正値。単位はHz、範囲は-120000～120000、デフォルトは0です。0を指定すると校正をリセットし、ハードウェア／工場出荷時の値に戻します。0以外の場合は指定値を直接設定します。 |
| 備考 | 値を設定するとHXTコンデンサーバンクレジスターが更新され、その結果が`FACTORY_CFG_ID_CRYSTAL`パーティションに書き込まれます。校正が成功すると、AT設定に記録された値が更新され、保存対象としてマークされます。 |

</div>

#### DUTテストモードへの移行 { #enter-dut-test-mode }

<div align="center"><em>表: DUTテストモードへの移行</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+DUT\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式（`AT+DUT?\r`）: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | BR/EDR Classic BluetoothのDUT有効化ビットを設定して`OK`を返した後、試験機器が無線経由で送信する`LMP_test_control`を待ち受け、シグナリング試験を開始します。AT UART（USART1）は引き続き利用できます。DUTモードへの移行は不可逆で、リセットによってのみ終了できます。 |

</div>

### アドレスとアイデンティティ { #address-and-identity }

#### Bluetoothアドレスの照会 { #query-bluetooth-address }

<div align="center"><em>表: Bluetoothアドレスの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+LBDADDR?\r` |
| 応答 | 成功: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `addr`: 現在のパブリックBluetoothアドレスを返す。16進数12文字（大文字、区切りなし）、最上位バイトが先頭、例: `001583112233`。 |
| 備考 | ファームウェアから読み取ったパブリックアドレスを返す。読み取りに失敗した場合は`ERROR`を返す。 |

</div>

#### Bluetoothアドレスの設定 { #set-bluetooth-address }

<div align="center"><em>表: Bluetoothアドレスの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+LBDADDR=<addr>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `addr`: 設定するBluetoothアドレス。区切りなしの16進数12文字で指定し、最上位バイトを先頭にします。例: `001583112233`。長さはちょうど16進数12文字でなければなりません。 |
| 備考 | アドレスは設定に書き込まれ保存される。リセット後に有効になる。工場出荷時のデフォルトはすべてゼロであり、これはアドレスがチップUIDから自動生成されることを意味する。 |

</div>

#### BLEアドレスの照会 { #query-ble-address }

<div align="center"><em>表: BLEアドレスの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BLEADDR?\r` |
| 応答 | 成功: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `addr`: BLEが現在使用しているアドレスを返す。16進数12文字（大文字、区切りなし）、最上位バイトが先頭。 |
| 備考 | `AT+RANDOMADDR=1`によってBLE固有の静的ランダムアドレスが生成されている場合はその静的ランダムアドレスを返し、そうでなければBluetoothアドレスと同じパブリックアドレスを返す。読み取りに失敗した場合は`ERROR`を返す。 |

</div>

#### BLEアドレスの設定 { #set-ble-address }

<div align="center"><em>表: BLEアドレスの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BLEADDR=<addr>\r` |
| 応答 | `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | このコマンドはBLEアドレスの直接設定を受け付けない — 呼び出すと常に`ERROR`を返す。BLE静的ランダムアドレスは`AT+RANDOMADDR=1`を通じて生成される。 |

</div>

#### BLEランダムアドレスの使用状態を照会する { #query-ble-random-address-switch }

<div align="center"><em>表: BLEランダムアドレスの使用状態</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+RANDOMADDR?\r` |
| 応答 | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| パラメーター | `n`: 現在の設定値。0 = BLEはパブリックアドレスを使用、1 = BLEは静的ランダムアドレスを使用。 |
| 備考 | なし |

</div>

#### BLEランダムアドレスの使用を設定する { #set-ble-random-address-switch }

<div align="center"><em>表: BLEランダムアドレスの使用設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+RANDOMADDR=<n>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `n`: 0または1。1 = パブリックアドレスから導出されたBLE静的ランダムアドレスを有効化する（パブリックアドレスの最上位バイトの上位2ビットを1に設定する — 例: パブリックアドレス`001583112233`はBLEアドレス`C01583112233`を導出する）。0 = BLEはパブリックアドレスに戻る。それ以外の値や余分な文字は`ERROR`を返す。デフォルト0。 |
| 備考 | 設定を更新します。1に設定してパブリックアドレスの読み取りに失敗した場合、設定値は0に戻り、`ERROR`を返します。アドレスの変更はNVDSに書き込まれ、リセット後に有効になります。`AT+RANDOMADDR=1`を再実行すると、変更されていないパブリックアドレスから同じランダムアドレスが再生成されます。 |

</div>

#### Class of Deviceの照会 { #query-class-of-device }

<div align="center"><em>表: Class of Deviceの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+CLASS?\r` |
| 応答 | 成功: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n`（`<cod>`は16進数6桁の大文字） |
| パラメーター | `cod`: 現在のClass of Device。常に16進数6桁として出力される（下位24ビット、`%06X`形式、ゼロ埋め） |
| 備考 | 現在のClass of Deviceの値を返す。 |

</div>

#### Class of Deviceの設定 { #set-class-of-device }

<div align="center"><em>表: Class of Deviceの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+CLASS=<cod>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `cod`: Class of Device。16進数文字列（`%X`で解析）。範囲0～FFFFFF（24ビット）。デフォルト`000000`。 |
| 備考 | Class of Deviceを設定し、設定内容を更新します。解析では下位24ビットのみが保持されます。 |

</div>

### 動作モードと可視性 { #operating-mode-and-visibility }

#### 発見可能状態の照会 { #query-discoverable-state }

<div align="center"><em>表: 発見可能状態の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+DISCOVERABLE?\r` |
| 応答 | 成功: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| パラメーター | `state`: 現在の発見可能状態。0 = 発見不可、1 = 発見可能、2 = 部分的に発見可能（混在状態）。意味は動作モードに依存する。BLEモード（`BTMODE=1`）ではBLEアドバタイズ設定を反映し、1 = オン、0 = オフ。BTモード（`BTMODE=2`）ではインクワイアリスキャンとページスキャンを反映し、両方がオンなら1、両方がオフなら0、それ以外は2。デュアルモード（`BTMODE=0`）では、BLEアドバタイズ、インクワイアリスキャン、ページスキャンがすべてオンなら1、すべてオフなら0、それ以外は2。 |
| 備考 | 現在の発見可能状態を照会するのみ — デバイスの状態は変更しない。 |

</div>

#### 発見可能状態の設定 { #set-discoverable-state }

<div align="center"><em>表: 発見可能状態の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+DISCOVERABLE=<mode>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `mode`: 0 = 発見可能性をオフにする、1 = 発見可能性をオンにする。 |
| 備考 | 現在の動作モードに従って動作する。BLEモード（`BTMODE=1`）ではBLEアドバタイズをオン/オフする。BTモード（`BTMODE=2`）ではインクワイアリスキャンとページスキャンをオン/オフする。デュアルモード（`BTMODE=0`）ではBLEアドバタイズ、インクワイアリスキャン、ページスキャンをまとめて制御する。 |

</div>

#### GATTアドバタイズ状態の照会 { #query-gatt-advertising-state }

<div align="center"><em>表: GATTアドバタイズ状態の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTDISCOVER?\r` |
| 応答 | 成功: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `state`: 実際のエアインターフェース上のBLEアドバタイズ状態。0 = アドバタイズしていない、1 = アドバタイズ中。 |
| 備考 | 実際のオンエアBLEアドバタイズ状態を返す。動作モードがBT専用（`BTMODE=2`）の場合は利用不可 — `ERROR`を返す。 |

</div>

#### GATTアドバタイズの設定 { #set-gatt-advertising }

<div align="center"><em>表: GATTアドバタイズの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTDISCOVER=<value>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `value`: 0 = BLEアドバタイズを停止、1 = BLEアドバタイズを開始。 |
| 備考 | BLEアドバタイズの開始と停止を直接制御する。動作モードがBT専用（`BTMODE=2`）の場合は利用不可。 |

</div>

#### SPP発見可能状態の照会 { #query-spp-discoverable-state }

<div align="center"><em>表: SPP発見可能状態の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+SPPDISCOVER?\r` |
| 応答 | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| パラメーター | `<state>`: 発見可能性を制御する現在のインクワイアリスキャン状態。0 = オフ、1 = オン。 |
| 備考 | `AT+BTMODE`が1（BLE専用）の場合は`ERROR`を返す。 |

</div>

#### SPP発見可能状態の設定 { #set-spp-discoverable-state }

<div align="center"><em>表: SPP発見可能状態の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+SPPDISCOVER=<state>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `<state>`: 発見可能性を制御するインクワイアリスキャンの設定値。0 = 無効、1 = 有効。 |
| 備考 | `AT+BTMODE`が1（BLE専用）の場合は`ERROR`を返す。インクワイアリスキャンビットのみを変更し、ページスキャンビットは変更しない。 |

</div>

#### SPP接続可能状態の照会 { #query-spp-connectable-state }

<div align="center"><em>表: SPP接続可能状態の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+SPPCONNECT?\r` |
| 応答 | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| パラメーター | `<state>`: 接続可能性を制御する現在のページスキャン状態。0 = オフ、1 = オン。 |
| 備考 | `AT+BTMODE`が1（BLE専用）の場合は`ERROR`を返す。 |

</div>

#### SPP接続可能状態の設定 { #set-spp-connectable-state }

<div align="center"><em>表: SPP接続可能状態の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+SPPCONNECT=<state>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `<state>`: 接続可能性を制御するページスキャンの設定値。0 = 無効、1 = 有効。 |
| 備考 | `AT+BTMODE`が1（BLE専用）の場合は`ERROR`を返す。ページスキャンビットのみを変更し、インクワイアリスキャンビットは変更しない。 |

</div>

#### Bluetooth動作モードの照会 { #query-bluetooth-operating-mode }

<div align="center"><em>表: Bluetooth動作モードの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BTMODE?\r` |
| 応答 | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| パラメーター | `mode`: 現在のBluetooth動作モード。0 = デュアルモード（BLE+BT）、1 = BLE専用、2 = BT専用。 |
| 備考 | なし |

</div>

#### Bluetooth動作モードの設定 { #set-bluetooth-operating-mode }

<div align="center"><em>表: Bluetooth動作モードの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BTMODE=<mode>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `mode`: Bluetooth動作モード。0 = デュアルモード（BLE+BT）、1 = BLE専用、2 = BT専用。範囲0～2。デフォルト0（デュアルモード）。 |
| 備考 | 動作モードを変更します。変更はリセット後に有効になります。 |

</div>

#### コマンドモードの照会 { #query-command-mode }

<div align="center"><em>表: コマンドモードの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+COMMAND?\r` |
| 応答 | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| パラメーター | `mode`: 現在の動作モード。0 = パススルーモード、1 = コマンドモード。 |
| 備考 | なし |

</div>

#### コマンドモードの設定 { #set-command-mode }

<div align="center"><em>表: コマンドモードの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+COMMAND=<mode>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `mode`: 動作モード。0 = パススルーモード、1 = コマンドモード。モジュールは電源投入後、パススルーモードで起動する。 |
| 備考 | 設定は即時に反映されますが、保存されません。リセット後はパススルーモードに戻ります。パススルーモードでは、シリアルポートで受信したデータが接続先にそのまま転送されます。コマンドモードでは、シリアルデータがATコマンドとして解析されます。 |

</div>

### ペアリングとセキュリティ { #pairing-and-security }

#### ペアリング情報のクリア { #clear-pairing-information }

<div align="center"><em>表: ペアリング情報のクリア</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+CLEARLINKKEY\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式`AT+CLEARLINKKEY?\r`: `\r\nERROR\r\n` |
| パラメーター | パラメーターなし。 |
| 備考 | BLEのボンディング情報とClassic Bluetoothのリンクキーをクリアする。成功後、デバイスはリセットされる。デバイス名、ボーレート、CODなどのAT設定は保持される。ホストはリセット後に`IM_READY`を待つべきである。クエリ形式はサポートされていない。 |

</div>

### シリアルポートとイベント { #serial-port-and-events }

#### シリアルボーレートの照会 { #query-serial-baud-rate }

<div align="center"><em>表: シリアルボーレートの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BAUD?\r` |
| 応答 | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| パラメーター | `baud_rate`: 現在設定されているボーレート。単位bps。 |
| 備考 | ボーレートを設定するとデバイスはリセットされ、新しいボーレートはリセット後に有効になる。 |

</div>

#### シリアルボーレートの設定 { #set-serial-baud-rate }

<div align="center"><em>表: シリアルボーレートの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BAUD=<baud_rate>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `baud_rate`: シリアルボーレート。単位bps。サポートされる値: 38400、57600、115200、230400、460800、921600、1000000。デフォルト460800。 |
| 備考 | 設定内容を更新します。 |

</div>

#### イベント通知の設定を照会する { #query-event-reporting-switch }

<div align="center"><em>表: イベント通知設定の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+EVT?\r` |
| 応答 | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| パラメーター | `evt_silent`: イベント通知の設定値。0 = 通常通知、1 = すべての通知を抑制。 |
| 備考 | なし |

</div>

#### イベント通知を設定する { #set-event-reporting-switch }

<div align="center"><em>表: イベント通知の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+EVT=<evt_silent>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `evt_silent`: イベント通知の設定値。0 = `IM_CONN`/`IM_DISCONN`/`IM_READY`などを通常どおり通知する。1 = すべてのイベント通知を抑制する。デフォルトは0（通常通知）。 |
| 備考 | 設定を更新します。1に設定すると、接続確立、切断、利用可能状態の各通知はシリアルポートに出力されません。 |

</div>

#### パススルーアイドル切断時間の照会 { #query-pass-through-idle-disconnect-time }

<div align="center"><em>表: パススルーアイドル切断時間の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+IDLE?\r` |
| 応答 | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| パラメーター | `idle_ms`: 現在のアイドル切断タイムアウト。単位ミリ秒。 |
| 備考 | なし |

</div>

#### パススルーアイドル切断時間の設定 { #set-pass-through-idle-disconnect-time }

<div align="center"><em>表: パススルーアイドル切断時間の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+IDLE=<idle_ms>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `idle_ms`: パススルーアイドル切断タイムアウト。単位ミリ秒、範囲0～65535。65535を超えると`ERROR`を返す。0はアイドル切断機能を無効化する。デフォルト0（オフ）。 |
| 備考 | 設定内容を更新します。この機能はパススルーモードでのみ有効です。シリアルポートで最後にデータを受信してから`idle_ms`ミリ秒を超えると、接続中のすべてのリンクが切断されます。`idle_ms`が0の場合、この機能は無効です。 |

</div>

### 接続管理 { #connection-management }

#### マルチ接続の全体設定を照会する { #query-multi-connection-switch }

<div align="center"><em>表: マルチ接続の全体設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+MULTICONN?\r` |
| 応答 | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| パラメーター | `<n>`: マルチ接続の全体設定値。0 = 無効（システム全体で単一接続）。1 = 有効（各トランスポートの上限まで同時接続可能）。 |
| 備考 | なし |

</div>

#### マルチ接続を設定する { #set-multi-connection-switch }

<div align="center"><em>表: マルチ接続の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+MULTICONN=<n>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `<n>`: 0 = マルチ接続を無効化、1 = マルチ接続を有効化。値は0または1。デフォルト1。 |
| 備考 | 設定内容を更新します。マルチ接続が無効の場合、同時接続の機能は制限されます。有効の場合は`AT+BLEMULTICONN`と`AT+BTMULTICONN`の設定に従って動作します。 |

</div>

#### BLE最大同時接続数の照会 { #query-maximum-ble-concurrent-connections }

<div align="center"><em>表: BLE最大同時接続数の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BLEMULTICONN?\r` |
| 応答 | 成功: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`。マルチ接続がオフの場合: `\r\nERROR\r\n` |
| パラメーター | `<n>`: 現在設定されているBLE最大同時接続数。10進数。 |
| 備考 | マルチ接続が有効（`AT+MULTICONN=1`）の場合にのみ照会できます。無効の場合は`ERROR`を返します。 |

</div>

#### BLE最大同時接続数の設定 { #set-maximum-ble-concurrent-connections }

<div align="center"><em>表: BLE最大同時接続数の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BLEMULTICONN=<n>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `<n>`: BLE最大同時接続数。10進数、範囲1～6。デフォルト3。 |
| 備考 | マルチ接続が有効（`AT+MULTICONN=1`）の場合にのみ設定できます。設定内容を更新します。接続数が上限に達するとアドバタイズを停止し、新たな接続を受け付けなくなります。接続数が上限を下回ると自動的に再開します。 |

</div>

#### Classic Bluetooth最大同時接続数の照会 { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>表: Classic Bluetooth最大同時接続数の照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BTMULTICONN?\r` |
| 応答 | 成功: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`。マルチ接続がオフの場合: `\r\nERROR\r\n` |
| パラメーター | `<n>`: 現在設定されているClassic Bluetooth（BR/EDR）最大同時接続数。10進数。 |
| 備考 | マルチ接続が有効（`AT+MULTICONN=1`）の場合にのみ照会できます。無効の場合は`ERROR`を返します。 |

</div>

#### Classic Bluetooth最大同時接続数の設定 { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>表: Classic Bluetooth最大同時接続数の設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+BTMULTICONN=<n>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `<n>`: Classic Bluetooth最大同時接続数。10進数、範囲1～7。デフォルト7。 |
| 備考 | マルチ接続が有効（`AT+MULTICONN=1`）の場合にのみ設定できます。設定内容を更新します。接続数が上限に達するとモジュールはページスキャンを停止し、接続数が上限を下回ると自動的に再開します。 |

</div>

#### 切断 { #disconnect }

<div align="center"><em>表: 切断</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | 1つを切断: `AT+DISCONN=<conn_hdl>\r`。すべて切断: `AT+DISCONN\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗または見つからない場合: `\r\nERROR\r\n` |
| パラメーター | `<conn_hdl>`: 接続ハンドル。16進数。BLEの接続ハンドルは1始まりの外部ハンドルである（`AT+CONNLIST`が返す値と一致する）。BT接続はそのACLハンドルを使用する。`<conn_hdl>` = 0は無効な入力として扱われ`ERROR`を返す。 |
| 備考 | パラメーターなし（または空のパラメーター）の場合、すべてのアクティブなリンク（BLEとBR/EDR）が切断され`OK`が返される。パラメーターありの場合、ハンドルは以下の順に照合される。まずBLEの外部ハンドルと照合（内部ハンドル = `<conn_hdl>` - 1）。見つからない場合は生のBT ACLハンドルと照合。一致する接続が見つからない場合は`ERROR`を返す。クエリ形式`AT+DISCONN?`は`ERROR`を返す。 |

</div>

#### 接続リストの照会 { #query-connection-list }

<div align="center"><em>表: 接続リストの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+CONNLIST?\r`または`AT+CONNLIST\r` |
| 応答 | アクティブな各接続について1行出力される: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`。すべての行の後に`\r\nOK\r\n`が続く。アクティブな接続がない場合は`\r\nOK\r\n`のみ。空でないパラメーター: `\r\nERROR\r\n` |
| パラメーター | 出力フィールド: `<conn_hdl>` — 接続ハンドル、16進数4桁、BLEは1始まりの外部ハンドルを使用する。`<type>` — 接続の種類、BLEまたはBT。`<addr>` — ピアのBluetoothアドレス、16進数12桁（最上位バイトが先頭）。`<extra>` — BLE接続の場合は現在のMTU、BT接続の場合はサービスチャネル、10進数。 |
| 備考 | 設定形式に空でないパラメーターを指定すると`ERROR`を返します。モジュールはすべての接続スロットを確認し、アクティブな各接続を出力します。 |

</div>

### データ転送 { #data-transfer }

#### BLE MTUの照会 { #query-ble-mtu }

<div align="center"><em>表: BLE MTUの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GMTU?\r` |
| 応答 | 成功: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| パラメーター | `mtu`: 現在設定されているBLE MTU上限。10進数。 |
| 備考 | なし |

</div>

#### BLE MTUの設定 { #set-ble-mtu }

<div align="center"><em>表: BLE MTUの設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GMTU=<mtu>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nFALSE\r\n` |
| パラメーター | `mtu`: BLE MTU上限。10進数、範囲23～1024。範囲外は`FALSE`を返す。デフォルト247。 |
| 備考 | この値はMTUネゴシエーション時に使用される上限を設定する。 |

</div>

#### SPPデータの送信 { #send-spp-data }

<div align="center"><em>表: SPPデータの送信</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+SPPSEND=<conn_hdl>,<data>\r`または`AT+SPPSEND=,<data>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `conn_hdl`: 対象のBT接続ハンドル。16進数。省略または0に設定可能で、その場合は現在最初にアクティブなBT接続が使用される。`data`: 送信するデータ。16進数文字列で、2文字が1バイトを表す。空にはできず、文字数は偶数でなければならない。ASCII ATフレームで運べる実際のデータ長も、単一ATフレームの上限によって制限される。 |
| 備考 | `conn_hdl`と`data`はカンマで区切られる。`conn_hdl`が省略されている場合でもカンマは必要。クエリ形式はサポートされていない。 |

</div>

### カスタムGATT { #custom-gatt }

#### カスタムGATTサービスリストの照会 { #query-custom-gatt-service-list }

<div align="center"><em>表: カスタムGATTサービスリストの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSRV?\r` |
| 応答 | 設定された各サービスについて1行返す: `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`。その後`\r\nOK\r\n`が続く。サービスが設定されていない場合は`\r\nOK\r\n`のみ返される |
| パラメーター | `idx`: サービススロット番号、0～5。`char_count`: そのサービスに設定されているキャラクタリスティックの数。`state`: `REG`はプロトコルスタックに登録済みであることを、`CFG`はRAM内でのみ設定されておりまだ登録されていないことを意味する |
| 備考 | 現在使用中のサービススロットのみを一覧表示する |

</div>

#### カスタムGATTサービスの作成 { #create-custom-gatt-service }

<div align="center"><em>表: カスタムGATTサービスの作成</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSRV=<idx>,<uuid>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `idx`: サービススロット番号、0～5。`uuid`: サービスUUID。最上位バイトを先頭とした16進数文字列として入力する — 16ビットUUIDなら4文字、128ビットUUIDなら32文字。 |
| 備考 | `idx`はカンマの直前の単一桁でなければならない。UUIDの長さは正確に4文字または32文字でなければならない — それ以外の長さは`ERROR`を返す。スロットがすでにプロトコルスタックに登録されている場合は再設定できず、作成は`ERROR`を返す。サービスを作成すると、そのスロットの以前の設定はクリアされる |

</div>

#### カスタムGATTサービスの削除 { #delete-custom-gatt-service }

<div align="center"><em>表: カスタムGATTサービスの削除</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSRV=<idx>,DEL\r` |
| 応答 | `\r\nOK\r\n` |
| パラメーター | `idx`: サービススロット番号、0～5 |
| 備考 | RAM内のそのスロットの設定をクリアする。プロトコルスタックにすでに登録されているサービスは実行時に取り消すことはできない — このコマンドはRAM設定のみをクリアする |

</div>

#### カスタムGATTキャラクタリスティックリストの照会 { #query-custom-gatt-characteristic-list }

<div align="center"><em>表: カスタムGATTキャラクタリスティックリストの照会</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTCHAR?<svc>\r` |
| 応答 | そのサービスの各キャラクタリスティックについて1行返す: `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`。その後`\r\nOK\r\n`が続く。サービスが存在しない場合: `\r\nERROR\r\n` |
| パラメーター | `svc`: サービススロット番号、0～5。`chr`: キャラクタリスティックインデックス。`prop`: キャラクタリスティックのプロパティビット。16進数。`max_len`: キャラクタリスティック値の最大長 |
| 備考 | なし |

</div>

#### カスタムGATTキャラクタリスティックの追加 { #add-custom-gatt-characteristic }

<div align="center"><em>表: カスタムGATTキャラクタリスティックの追加</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `svc`: サービススロット番号、0～5。`chr`: キャラクタリスティックインデックス、0～7。`uuid`: キャラクタリスティックUUID。最上位バイトを先頭に、16ビットなら4文字、128ビットなら32文字。`prop`: R（読み取り）、W（応答付き書き込み）、w（応答なし書き込み）、N（通知）、I（インディケーション）の文字で設定されるプロパティ文字列。`len`: キャラクタリスティック値の最大長、1～512 |
| 備考 | 5つのパラメーターすべてが必須であり、いずれかを省略すると`ERROR`を返す。UUIDの長さは正確に4文字または32文字でなければならない。`prop`には認識可能なプロパティ文字が少なくとも1つ含まれていなければならない。1つも認識されない場合は`ERROR`を返す — `prop`内の認識されない文字は単に無視される。`len`が0または512を超える場合は`ERROR`を返す。親サービスはすでに作成されており、まだプロトコルスタックに登録されていない必要がある |

</div>

#### カスタムGATTサービスの開始（登録） { #start-register-custom-gatt-services }

<div align="center"><em>表: カスタムGATTサービスの開始（登録）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSTART\r` |
| 応答 | `\r\n+GATTSTART:<count>\r\n`の後に`\r\nOK\r\n`が続く。クエリ形式`AT+GATTSTART?\r`: `\r\nERROR\r\n` |
| パラメーター | `count`: この呼び出しでプロトコルスタックに正常に登録されたサービスの数 |
| 備考 | 使用中であり、まだ登録されておらず、かつ少なくとも1つのキャラクタリスティックを持つすべてのサービスをプロトコルスタックに登録する。一度登録されると、サービスは実行時に取り消したり再設定したりできなくなる。クエリ形式はサポートされていない |

</div>

#### GATTキャラクタリスティックデータの送信（通知/インディケーション） { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>表: GATTキャラクタリスティックデータの送信（通知/インディケーション）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`。接続ハンドルを省略: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n`。クエリ形式`AT+GATTSEND?\r`: `\r\nERROR\r\n` |
| パラメーター | `svc`: サービススロット番号。`chr`: キャラクタリスティックインデックス。`conn_hdl`: BLE接続ハンドル、16進数、1始まり。省略可能。`hex`: 送信するデータ。文字数が偶数の16進数文字列。ASCII ATフレームで運べる実際のデータ長も、単一ATフレームの上限によって制限される。 |
| 備考 | `conn_hdl`が省略された場合、現在最初のBLE接続が使用される。対象サービスはすでに登録済みであり、キャラクタリスティックインデックスは有効でなければならない。キャラクタリスティックのプロパティにインディケーション（I）が含まれる場合はインディケーションが使用され、それ以外は通知が使用される。 |

</div>

#### カスタムGATT設定をFlashに保存 { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>表: カスタムGATT設定をFlashに保存</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTSTORE\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n`。クエリ形式`AT+GATTSTORE?\r`: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | すべてのサービスとキャラクタリスティックの現在の設定をFlashに永続化する。設定データのみが保存され、登録状態などの実行時情報は保存されない。KVDBが準備できていない場合、または書き込みに失敗した場合は`ERROR`を返す。クエリ形式はサポートされていない |

</div>

#### Flash内のカスタムGATT設定のクリア { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>表: Flash内のカスタムGATT設定のクリア</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTCLEAR\r` |
| 応答 | 成功: `\r\nOK\r\n`。クエリ形式`AT+GATTCLEAR?\r`: `\r\nERROR\r\n` |
| パラメーター | なし |
| 備考 | Flashに保存されたGATT設定を削除する。RAM内の現在の設定には影響しない。クエリ形式はサポートされていない。 |

</div>

#### GATT設定の起動時自動ロード設定を照会する { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>表: GATT設定の起動時自動ロード設定</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTAUTOSTART?\r` |
| 応答 | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| パラメーター | `v`: 現在の設定値。0 = 無効、1 = 有効。デフォルトは1。 |
| 備考 | なし |

</div>

#### GATT設定の起動時自動ロードを設定する { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>表: GATT設定の起動時自動ロード</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+GATTAUTOSTART=<v>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `v`: 0 = 無効、1 = 有効。デフォルトは1。 |
| 備考 | 設定内容を更新します。有効にすると、デバイスは電源投入時に保存済みのGATTサービス設定を自動的にロードします。 |

</div>

## 非同期イベント（URC） { #unsolicited-events-urc }

以下はモジュールからホストへ送られる非同期のステータス通知です。受信のためにホストからコマンドを送る必要はありません。通知の有無はイベント通知設定（`AT+EVT`）で制御され、サイレントモード中は通知されません。

### IM_READYレディ通知 { #im_ready-ready-indication }

<div align="center"><em>表: IM_READYレディ通知</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | なし（ファームウェアが自動的に通知する。ユーザーから送信されるものではない） |
| 応答 | 通知文字列: `\r\nIM_READY\r\n` |
| パラメーター | なし |
| 備考 | モジュールの初期化が完了して使用可能になると1回通知されます。また、すべての接続が切断され、接続数が0に戻ったときにも再度通知されます。通知の有無は`AT+EVT`で制御され、`AT+EVT=1`を設定するとこれらの通知が抑制されます。 |

</div>

### IM_CONN接続通知 { #im_conn-connection-indication }

<div align="center"><em>表: IM_CONN接続通知</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | なし（接続が確立されたときにファームウェアが自動的に通知する） |
| 応答 | コマンドモード: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`。パススルーモード: `\r\nIM_CONN\r\n` |
| パラメーター | `hdl`: 接続ハンドル、16進数4桁（大文字、固定4桁、ゼロ埋め）。BLE接続は1始まりのハンドル（内部ハンドルに1を加えたもの）を表示し、他の種類は生の値を表示する。`addr`: ピアのアドレス、16進数12桁、最上位バイトが先頭。`mtu`: 現在の接続のMTU、10進数。 |
| 備考 | コマンドモードでは、接続が確立されるたびにハンドル、ピアアドレス、MTUを含む通知が1回出力されます。パススルーモードでは最初の接続（接続数が1）のときだけ、パラメーターなしで通知されます。通知の有無は`AT+EVT`で制御され、`AT+EVT=1`を設定するとこれらの通知が抑制されます。 |

</div>

### IM_DISCONN切断通知 { #im_disconn-disconnect-indication }

<div align="center"><em>表: IM_DISCONN切断通知</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | なし（接続が切断されたときにファームウェアが自動的に通知する） |
| 応答 | コマンドモード: `\r\nIM_DISCONN:<hdl>\r\n` |
| パラメーター | `hdl`: 切断された接続のハンドル、16進数4桁（大文字、固定4桁、ゼロ埋め）。BLE接続は1始まりのハンドル（生のハンドルに1を加えたもの）を表示し、その他は生の値を表示する。 |
| 備考 | ハンドルのみを含む通知で、コマンドモードでのみ出力されます。パススルーモードでは出力されません。どちらのモードでも、すべての接続が切断されて接続数が0に戻ると、追加で`\r\nIM_READY\r\n`が通知されます。通知の有無は`AT+EVT`で制御され、`AT+EVT=1`を設定するとこれらの通知が抑制されます。 |

</div>

## PDU形式コマンド { #pdu-format-commands }

### PDUデータレポート（オペコード0x0101） { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>表: PDUデータレポート（モジュール → ホスト、オペコード0x0101）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | なし（コマンドモードでファームウェアが自動的に通知する） |
| 応答 | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| パラメーター | `opcode`は`0x0101`に固定。`body` = `conn_hdl`（2バイトリトルエンディアン）+ `data`。BLE接続ハンドルは1始まりの外部値を使用し、SPP接続は生のACLハンドルを使用する。 |
| 備考 | コマンドモードでは、カスタムBLEキャラクタリスティックへのデータ書き込み、またはClassic Bluetooth SPP経由でのデータ受信があった場合、モジュールは上記の形式でホストに報告する。パススルーモードでは、データは直接出力される。 |

</div>

### PDUモードでのデータ送信（通知キャラクタリスティックの自動選択、オペコード0x0101） { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>表: PDUモードでのデータ送信（通知キャラクタリスティックの自動選択、オペコード0x0101）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | バイナリフレーム（テキストのAT行ではない）: `AT>` + opcode(2バイトリトルエンディアン) + len(2バイトリトルエンディアン) + body + `\r`。ここでopcode = `0x0101`（バイト列01 01）。lenはbodyのバイト数。body = `conn_hdl`(2バイトリトルエンディアン) + `data`。`data`は送信するペイロード。 |
| 応答 | テキストの応答文字列なし。ファームウェアは接続の種類に応じて`data`をピアに転送し、`OK`/`ERROR`を返信しない。 |
| パラメーター | `opcode`: `0x0101`に固定。`len`: bodyの長さ、範囲2～508（2未満または`AT_RX_BUF_SIZE`-4を超えるフレームは破棄される。`AT_RX_BUF_SIZE` = 512）。`conn_hdl`: 対象の接続ハンドル。BLE接続は1始まり（外部表示値）、SPP接続は生のACLハンドル。`data`: ペイロードバイト、長さ = len-2、0でもよい。 |
| 備考 | `conn_hdl`は、まずBLEの1始まりハンドルと照合されます（`conn_hdl`-1がBLEスロットに対応）。見つからない場合は、SPPスロットの生の値と照合されます。接続が見つからなければ、フレームは破棄されます。BLE接続では、ファームウェアがカスタムGATTサービスを順に確認し、NotifyまたはIndicateプロパティを持つ最初のキャラクタリスティックを自動選択して送信します。該当するキャラクタリスティックがなければ、データは送信されません。SPP（BR/EDR）接続では、`data`がSPPチャネル経由で送信されます。フレームの直後に`\r`が必要です。続かない場合、現在のフレームは破棄されます。フレーム間にPDUタイムアウト時間内に新しいバイトを受信しなかった場合、PDU受信状態がリセットされます。 |

</div>

### PDUモードでのデータ送信（サービスとキャラクタリスティックの指定、オペコード0x0102） { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>表: PDUモードでのデータ送信（サービスとキャラクタリスティックの指定、オペコード0x0102）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | バイナリフレーム（テキストのAT行ではない）: `AT>` + opcode(2バイトリトルエンディアン) + len(2バイトリトルエンディアン) + body + `\r`。ここでopcode = `0x0102`（バイト列02 01）。lenはbodyのバイト数。body = `conn_hdl`(2バイトリトルエンディアン) + `svc_idx`(1バイト) + `char_idx`(1バイト) + `data`。 |
| 応答 | テキストの応答文字列なし。ファームウェアは指定されたサービス/キャラクタリスティック経由で`data`をピアに送信し、`OK`/`ERROR`を返信しない。 |
| パラメーター | `opcode`: `0x0102`に固定。`len`: bodyの長さ、範囲4～508（受信レイヤーの一般的な下限は2だが、このオペコードはbodyが少なくとも4バイト、すなわち`svc_idx`+`char_idx`を含む必要がある）— そうでない場合は破棄される。`conn_hdl`: 対象のBLE接続ハンドル、1始まり（外部表示値）。`svc_idx`: カスタムGATTサービスのインデックス。`char_idx`: そのサービス内のキャラクタリスティックインデックス。`data`: ペイロードバイト、長さ = len-4、0でもよい。 |
| 備考 | BLE接続のみ対応します。解決された接続がSPPの場合、フレームは破棄されます。`svc_idx`は登録済みのカスタムサービスに対応し、`char_idx`はそのサービスのキャラクタリスティック数未満でなければなりません。条件を満たさない場合、フレームは破棄されます。指定されたキャラクタリスティックにはNotifyまたはIndicateプロパティが必要です。`conn_hdl`の解決規則は`0x0101`と同じです（1始まりのBLEハンドルを先に照合し、次に生の値を照合）。フレームの直後に`\r`が必要です。 |

</div>

### PDUモードでの切断 { #pdu-mode-disconnect }

<div align="center"><em>表: PDUモードでの切断</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | `AT+DISCONN\r`（パラメーターなし）または`AT+DISCONN=<conn_hdl>\r` |
| 応答 | 成功: `\r\nOK\r\n`。失敗: `\r\nERROR\r\n` |
| パラメーター | `conn_hdl`: 切断する接続ハンドル、16進数。BLE接続は1始まり（外部表示値）で、値は0であってはならない（0は無効な入力として扱われ`ERROR`を返す）。SPP接続は生のACLハンドルを使用する。 |
| 備考 | パラメーターなしの場合、現在のすべての接続が切断され`OK`が返される。パラメーターありの場合、解決順序は次の通り: まずBLEの1始まりハンドルと照合（`conn_hdl`-1がBLEスロットに一致する）。見つからない場合はSPPスロットの生の値と照合。接続が見つからない場合は`ERROR`を返す。BLE接続の場合、理由コード`0x13`で切断が開始される。SPP接続の場合、ピアアドレスによって切断が開始される。クエリ形式`AT+DISCONN?`は`ERROR`を返す。 |

</div>

### PDU接続ステータス通知（IM_CONN / IM_DISCONN） { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>表: PDU接続ステータス通知（IM_CONN / IM_DISCONN）</em></div>

<div align="center" markdown>

| 項目 | 内容 |
|:-----|:--------|
| コマンド | モジュールが自動的に通知するため、ホストからのコマンドは不要です。接続確立時に`IM_CONN`、切断時に`IM_DISCONN`が通知されます。 |
| 応答 | コマンドモード、接続確立時: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`。ここで`<hdl>`は16進数4桁のハンドル、`<mac>`は16進数12桁のアドレス（最上位バイトが先頭）、`<mtu>`は10進数のMTU。コマンドモード、接続切断時: `\r\nIM_DISCONN:<hdl>\r\n`（`<hdl>`は16進数4桁）。パススルーモードでは、最初の接続が確立されたときにのみ`\r\nIM_CONN\r\n`（パラメーターなし）を報告し、切断時に`IM_DISCONN`は報告しない。両方のモードとも、すべての接続が切断されると`\r\nIM_READY\r\n`を報告する。 |
| パラメーター | `<hdl>`: 接続ハンドル。BLE接続は1始まり（内部の0始まりに1を加えたもの）で表示され、SPP接続は生のハンドルを表示する。`<mac>`: ピアのBluetoothアドレス。`<mtu>`: ネゴシエートされたMTU。 |
| 備考 | 通知の有無は`AT+EVT`で制御されます。0（デフォルト）では通常どおり通知され、1では`IM_READY`/`IM_CONN`/`IM_DISCONN`がすべて抑制されます。通知の形式と内容は、前述のとおり現在の動作モード（コマンドモード／パススルーモード）によって異なります。 |

</div>

## 付録 { #appendix }

### 一般的なClass of Deviceの値 { #common-class-of-device-values }

<div align="center"><em>表: 一般的なClass of Deviceの値</em></div>

<div align="center" markdown>

| デバイスの種類 | 16進数値 |
|:-------------|:-----------|
| コンピューター | `0x000100` |
| 電話 | `0x000200` |
| LAN/ネットワークアクセスポイント | `0x000300` |
| オーディオ/ビデオ | `0x000400` |
| ペリフェラル（キーボード/マウスなど） | `0x000500` |
| イメージング（プリンター/スキャナーなど） | `0x000600` |

</div>
