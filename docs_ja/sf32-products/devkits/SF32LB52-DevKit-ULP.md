---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: システムレベルの低消費電力評価向けに、AMOLED、タッチ、センサー、オーディオ、バッテリー充電、電流測定サポートを備えたウェアラブル指向の SF32LB52x 開発ボード。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## 概要 { #overview }

SF32LB52-DevKit-ULP は、**立创黄山派**、**LCKFB-HSPI-SF32LB52-ULP**、**SF32LB52-ULP** とも呼ばれます。SF32LB52x ファミリーをベースにした小型の超低消費電力ウェアラブル開発ボードで、単純な MCU ブレークアウトではなく、スマートウォッチやフィットネスバンドのプロトタイプ開発向けに設計されています。

LCD、Nano、Core-3p3 の各ボードよりも製品に近い構成で、SF32LB52 モジュール、AMOLED ディスプレイ、タッチ、マイク、スピーカーアンプ、RGB LED、振動モーター駆動回路、モーションセンサー、磁気センサー、環境光センサー、バッテリー充電回路、電流測定用ジャンパーを備えています。「MCU が動作するか」だけでなく、「バッテリー駆動時にウェアラブルシステム全体がどう動作するか」を評価するのに適しています。

SiFli の [ULP 開発ボードガイド][SiFli公式Wiki記事]は現在もプレースホルダーです。詳細な基板構成の一次資料は、SiFli の中国語版[黄山派開発ボードガイド][SiFli黄山派ガイド]です。同ガイドが記載する V1.0.0 を本ページの基準としています。一方、基板リビジョンを明記していない[LCKFBハードウェアWiki][LCKFBハードウェアWiki]には異なる部品番号があります。リビジョンまたは資料更新状況の違いが考えられるため、部品を同等品として扱わず、実機の表示、回路図、BOMを確認してください。

**リリース状況に関する注記：** SiFli の V1.0.0 ガイドによると、同ガイドが記載する基板は当時、社内試用向けであり、修正後に外部公開する予定でした。この記述は当該資料のリビジョンに限られ、後続基板の状態や BOM を示すものではありません。実機の正確な基板リビジョンと BOM を確認してください。

SiFli SDK の[ボードページ][SiFli SDK ULPボードページ]では、ビルドターゲット名が `sf32lb52-lchspi-ulp` とされています。SDK のボードページと中国語版 Huangshan Pi ガイドの同梱品欄には `SF32LB52X-MOD-1-N16R8`、SiFli の[モジュール型番ガイド][SiFliモジュール型番ガイド]と同ガイドの GPIO 表見出しには `SF32LB52-MOD-1-N16R8` と記載されています。この `X` の有無が異なる理由は説明されていません。SDK ターゲット名は確認できますが、実装モジュールの型番は現物の表示と BOM で確認し、表記だけから別のハードウェアだと判断しないでください。

![SF32LB52-ULP のウェアラブル向けボード組み立て例](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — ウェアラブル向けボード組み立て例</em></div>

![Huangshan Pi SF32LB52ブロック図](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>黄山派 SF32LB52 — ブロック図</em></div>

## 名称 { #naming }

<div align="center"><em>ボードの別称</em></div>

<div align="center" markdown>

| 名称 | 使用される場所 |
| :--- | :--- |
| SF32LB52-DevKit-ULP | SiFli/OpenSiFli のボードファミリー名 |
| SF32LB52-ULP | ハードウェア/製品の略称 |
| LCKFB-HSPI-SF32LB52-ULP | LCKFB のプロジェクト/注文名 |
| 立创黄山派 / 立创・黄山派 SF32LB52 | 中国語の製品名・ドキュメント名 |

</div>

ハードウェア資料、使用例、購入ページ、コミュニティ情報を検索する際は、これらの名称を同じボードファミリーの別名として利用してください。回路図、ピン配置、BOM を確認する際は、必ずボードのリビジョンと対応するベンダー資料を確認してください。

## ボードの主な特長 { #board-highlights }

- SF32LB52x ベースの SF32LB52-MOD-1-N16R8 モジュール
- SF32LB525UC6 標準モジュール構成
- 8 MB OPI-PSRAM、144 MHz インターフェース
- 128 Mb QSPI-NOR Flash、72 MHz STR モード
- 48 MHz メイン水晶と 32.768 kHz RTC 水晶
- オンボード PCBA アンテナ
- 1.85 インチ AMOLED ディスプレイ、解像度 390 × 450
- タッチサポート付き Quad-SPI ディスプレイインターフェース
- オンボード MEMS マイク
- Class-D スピーカーアンプによるアナログオーディオ出力
- 3 W / 4 Ω または 2 W / 8 Ω のスピーカーに対応する外部スピーカーコネクター
- CH340N による、書き込み・デバッグ・給電用の USB Type-C UART インターフェース
- 30 ピン拡張コネクターを通じて公開される USB 2.0 FS 信号
- SPI を使用する MicroSD カードスロット
- 機能キー 1 個と電源/リセットキー 1 個
- SK6812MINI-HS RGB LED（SiFli V1.0.0 ガイドの記載。リビジョン不明の LCKFB ページでは WS2812B-2020）
- 外部モーター用はんだパッドを備えた振動モーター駆動回路
- LSM6DS3TR-C 6 軸 IMU
- MMC5603NJ 3 軸磁気センサー
- LTR-303ALS-01 環境光センサー
- ウェアラブル機器の消費電力評価用のバッテリー充電器と電源管理デバイス
- GPIO と電流測定に対応した、2 × 15 ピン、1.27 mm ピッチの拡張ヘッダー

## このボードが適する用途 { #when-to-use-this-board }

目標がウェアラブルシステムの検証である場合は、SF32LB52-DevKit-ULP / 立创黄山派 を選択してください。

- ウォッチ、バンド、センサーを多用するウェアラブルプロトタイプの構築
- SF32LB52x プラットフォーム上での AMOLED UI の挙動評価
- タッチ、モーションセンシング、磁気センシング、環境光センシング、オーディオ、振動、RGB LED の挙動を同時にテスト
- スリープ時とアクティブ時のバッテリー、システム、3.3 V の各電流パスを測定
- ボタン、センサー、タッチ、ファームウェアタイマーによって駆動されるウェイクアップフローの検証
- よりシンプルな DevKit ボードによる初期見積もりと、実際の製品に近い電力挙動を比較

ディスプレイ重視の汎用評価ボードには [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md) を使用してください。コンパクトなはんだ付けモジュールのプロトタイピングには [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md) を使用してください。初期のベンチでの立ち上げで、最も多くのピンに直接アクセスしたい場合は [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md) を使用してください。

## ハードウェア構成 { #hardware-configuration }

<div align="center"><em>ハードウェア構成の概要</em></div>

<div align="center" markdown>

| 領域 | 構成 |
| :--- | :--- |
| コアモジュール | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB OPI-PSRAM、144 MHz インターフェース |
| Flash | 128 Mb QSPI-NOR Flash、72 MHz STR モード |
| ディスプレイ | 1.85 インチ AMOLED（ZC-A1D85W-010）、390 × 450、輝度 800 cd/m²、Quad-SPI |
| ディスプレイドライバー | CO5300AF-01 |
| ディスプレイ電源 IC | BV6802W |
| タッチコントローラー | FT6146-M00 |
| マイク | オンボード MEMS マイク |
| スピーカー出力 | Class-D アンプ、外部 GH-1.25 mm スピーカーコネクター |
| ストレージ | SPI 経由の MicroSD カード |
| モーションセンサー | LSM6DS3TR-C 6 軸 IMU |
| 磁気センサー | MMC5603NJ 3 軸磁力計 |
| 環境光センサー | LTR-303ALS-01 |
| USB-UART | USB Type-C 経由の CH340N |
| バッテリー | GH1.25 mm コネクターを通じた外部 Li-ion バッテリー |
| 充電器 | SY6103、最大充電電圧 4.5 V、デフォルト定電流設定 450 mA、最大充電電流 500 mA |
| 保護/電源デバイス | SY5320 過電圧保護（OVP）、LP5240HVF 負荷スイッチ、ETA5055V330DS2F 低ドロップアウトレギュレーター（LDO） |

</div>

**部品番号は資料／リビジョンによって異なるため、設計前に確認してください：** SiFli の V1.0.0[黄山派開発ボードガイド][SiFli黄山派ガイド]では、充電 IC は SY6103、OVP は SY5320、RGB LED は SK6812MINI-HS です。リビジョン不明の[LCKFBハードウェアWiki][LCKFBハードウェアWiki]では OVP として LP5305AQVF、RGB LED として WS2812B-2020 が記載され、充電 IC も特性一覧では AW32001ECSR、充電の説明では AW23001ECSR と異なります。これらの差が基板改版によるものか、資料の更新漏れかは確認できていません。SiFli V1.0.0 の値は、資料に記載された同リビジョンの基準にのみ適用してください。部品固有の仕様を前提に設計する場合は、実機のマーキング、回路図、BOMを確認してください。

## 同梱品 { #package-contents }

資料では、黄山派のボードセットに次のものが含まれるとされています。

- コアボード
- スクリーンボード
- バッテリー
- スピーカー

評価環境を準備する前に、購入したキットの同梱品を確認してください。付属品は販売元や製造ロットによって異なる場合があります。

## 電源とバッテリー { #power-and-battery }

このボードは 2 つの主要な給電モードをサポートします。

- USB Type-C 電源
- スタンドアロンのバッテリー電源

バッテリー入力には、正順ピン配列の GH1.25 mm コネクターを介して単セル Li-ion バッテリーを接続します。資料記載の充電回路は最大 500 mA に対応し、定電流値は既定で 450 mA に設定されています。

バッテリーを使わず、ベンチ電源から VBAT に給電する場合、資料に記載された入力範囲は 3.7～4.7 V で、通常電圧での電源試験には 3.8 V が推奨されています。SF32LB52-MOD-1-N16R8 の電源オン閾値は 3.58 V、電源オフ閾値は 3.48 V です。

LCKFB のハードウェアガイドでは、バッテリー未接続時に長押しキーの機能が動作しない場合があると注意しています。該当する基板リビジョンと実際の給電条件で動作を確認してください。

## 電流測定用ジャンパー { #power-measurement-jumpers }

主要な電源経路には、電流測定用のジャンパーが設けられています。

<div align="center"><em>電流測定用ジャンパーの割り当て</em></div>

<div align="center" markdown>

| ピン | パス | 目的 |
| :--- | :--- | :--- |
| 5-6 | VBAT パス | バッテリーまたは充電器と後段システムの間に電流計を挿入 |
| 7-8 | VSYS パス | VSYS パスに電流計を挿入 |
| 11-12 | VCC_3V3 パス | 3.3 V メイン電源レールに電流計を挿入 |

</div>

通常動作時は、ピン 5-6、7-8、11-12 をジャンパーで短絡してください。電流計またはパワーアナライザーを接続するときだけ、測定対象のジャンパーを取り外します。

## ファームウェアの書き込みとデバッグ { #download-and-debug }

通常の開発では、USB Type-C の UART インターフェースを使ってファームウェアを書き込み、シリアルログを確認し、ボードに給電します。

初回の立ち上げに必要なハードウェア:

- SF32LB52-DevKit-ULP / 立创黄山派 ボード
- USB 2.0 データケーブル
- Windows、Linux、macOS を実行するホストコンピューター

任意のハードウェア:

- 外部スピーカー
- TF カード
- Li-ion バッテリー、450 mAh 以上
- UART デバッグとネイティブ USB テストを同時に行う場合の 2 本目の USB ケーブル

データ通信に対応した USB ケーブルを使用してください。充電専用ケーブルでも給電はできますが、シリアル通信はできません。

## SDK ビルドターゲット { #sdk-build-targets }

SiFli-SDK の正確なボードターゲット名は `sf32lb52-lchspi-ulp` です。`scons --board=<board_name>` コマンドでこの名前を使用してください。これはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。使用中のSDKリビジョンについて、[Supported Boards インデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)と[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)を確認してください。

## 主要な信号割り当て { #key-signal-assignments }

<div align="center"><em>主要な信号割り当て</em></div>

<div align="center" markdown>

| 信号 | 機能 |
| :--- | :--- |
| PA44 | VBUS_DET、充電器接続検出 |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | タッチ割り込み |
| PA40 / PA39 | センサー I2C1 SCL / SDA（GPIO割り当て表に基づく。ヘッダーピンの不一致は下記参照） |
| PA38 | VSYS から VSYS_1 への切替制御 |
| PA37 / PA33 | タッチ I2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | HOME キーと 10 秒長押しリセット |
| PA32 | RGB LED データ |
| PA31 | センサー割り込み 1 |
| PA30 | VSYS_1 から HR3V3 への切替制御 |
| PA27 | SD カード検出 |
| PA24、PA25、PA28、PA29 | SPI1 MicroSD インターフェース |
| PA20 | 振動モーター PWM |
| PA19 / PA18 | デバッグ UART TXD / RXD |
| PA11 / PA10 | 充電器 I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | マイクバイアスと入力 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | アナログオーディオ出力 |
| PA08..PA03、PA02、PA01、PA00 | QSPI ディスプレイ、TE、バックライト PWM、リセット |
| PA15..PA12、PA16、PA17 | MPI2 / SD1 信号、N16R8 モジュールでモジュール Flash によって内部使用 |

</div>

## 30 ピン拡張ヘッダー { #30-pin-expansion-header }

30 ピンヘッダーには、電源、USB、センサー、ディスプレイ関連、ストレージ、振動、デバッグ、キー、充電器制御の各信号が引き出されています。

<div align="center"><em>30 ピン拡張ヘッダー信号マップ</em></div>

<div align="center" markdown>

| ピン番号 | 信号 | 注記 |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | USB 接続時は USB からの 5 V、USB 未接続時は 5 V 入力として使用可能 |
| 3-4 | GND | グラウンド |
| 5-6 | VBAT_S / VBAT | 通常動作時は短絡、VBAT 電流測定時は開放 |
| 7-8 | VSYS_S / VSYS | 通常動作時は短絡、VSYS 電流測定時は開放 |
| 9-10 | GND | グラウンド |
| 11-12 | VCC_3V3_S / VCC_3V3 | 通常動作時は短絡、3.3 V 電流測定時は開放 |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | SiFli V1.0.0 ヘッダー表ではセンサー I2C1 SDA / SCL。14番ピンはGPIO割り当て表と不一致（下記参照） |
| 17 | PA32 | RGB LED データ、GPIO としても使用可能 |
| 18 | PA30 | センサー電源制御。GPIO として使用すると PA39/PA40 の挙動に影響する可能性あり |
| 19-23 | PA29、PA24、PA28、PA25、PA27 | SPI1/SD カード関連ピン。拡張利用はオンボード TF カードと競合 |
| 24 | PA20 | 振動 PWM。拡張利用はモーター駆動と競合 |
| 25 / 27 | PA19 / PA18 | デバッグ UART TXD / RXD |
| 26 / 28 | PA34 / PA43 | 電源/リセットキーと機能キー |
| 29 / 30 | PA11 / PA10 | 充電器 I2C0 SDA / SCL |

</div>

**ピン配置資料に不一致があります。配線前に確認してください：** SiFli V1.0.0 の GPIO 割り当て表ではセンサー I2C1_SDA は PA39、30ピンヘッダー表では14番ピンが PB39（I2C1_SDA）、16番ピンが PA40/I2C1_SCL と記載されています。LCKFB の資料にも PA39/PB39 の不一致がありますが、基板リビジョンは明記されていません。14番ピンの MCU パッドと基板上の配線は未確定です。周辺機器を接続する前に、対象基板の回路図/BOMと導通を確認し、PA39 と PB39 を互換とみなさないでください。

## ディスプレイとタッチインターフェース { #display-and-touch-interface }

このボードは AMOLED ディスプレイパスを使用し、22 ピンの QSPI FPC 信号セットを引き出しています。SiFli の V1.0.0 表では5～10番ピンが NC とされています。以下の表には22個すべての位置を記載し、未接続のピンも明示しています。

<div align="center"><em>22 ピン QSPI ディスプレイ・タッチ FPC 信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 機能 |
| :--- | :--- | :--- |
| 1 | VBAT | ディスプレイ側 VBAT 出力 |
| 2 | PA01 | TFT スタイル利用向けのバックライト PWM |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | 未接続 |
| 6 | NC | 未接続 |
| 7 | NC | 未接続 |
| 8 | NC | 未接続 |
| 9 | NC | 未接続 |
| 10 | NC | 未接続 |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | LCD リセット |
| 13 | PA04 | QSPI/SPI クロック |
| 14 | PB05（SiFli V1.0.0 FPC 表） | QSPI D0 / SPI SDI。別の GPIO 割り当て表では PA05 と記載 |
| 15 | PA03 | QSPI/SPI チップセレクト |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V 出力 |
| 18 | PA41 | タッチ割り込み |
| 19 | PA33 | タッチ I2C SDA |
| 20 | PA37 | タッチ I2C SCL |
| 21 | PA09 | タッチリセット |
| 22 | GND | グラウンド |

</div>

**ピン配置資料に不一致があります。ディスプレイ接続前に確認してください：** SiFli V1.0.0 の22ピン FPC 表では14番ピンが PB05（QSPI D0）、別の GPIO 割り当て表では同信号が PA05 と記載されています。LCKFB の FPC 表も PB05、GPIO 表は PA05 としていますが、モジュール側のパッド名と FPC の端子表記の関係は説明されていません。対象基板の回路図/BOMと導通を確認するまでは、実際の配線を未確認として扱い、PA05 と PB05 を互換とみなさないでください。

## 消費電力の測定方法 { #power-measurement-guidance }

超低消費電力を有効に評価するには、次の点に注意してください。

- 可能な限り VBAT、VSYS、VCC_3V3 を個別に測定してください。
- 測定対象ではない電源レールは、対応するジャンパーを短絡したままにしてください。
- スリープ電流を測定する前に、RGB LED エフェクト、デバッグログ、ディスプレイのリフレッシュ、センサーのポーリングなど、回避可能な負荷を無効にしてください。
- 測定ごとに、ボードのリビジョン、ファームウェアのコミット、バッテリーまたは電源の電圧、ジャンパーの状態、センサーの動作状態を記録してください。
- タッチ、センサー割り込み、Bluetooth 通信、ディスプレイ復帰、振動動作について、スリープ中の定常電流とイベント発生時の電流をそれぞれ測定してください。

## 関連ドキュメント { #related-documents }

[SF32LB52x チップ紹介]: ../chips/SF32LB52x.md
[SF32LB52x ハードウェア設計ガイド]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SiFli公式Wiki記事]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[SiFli黄山派ガイド]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[SiFli SDK ULPボードページ]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[SiFliモジュール型番ガイド]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[LCKFBプロジェクトページ]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[LCKFBハードウェアWiki]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[サンプルを購入]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x チップ紹介]__
- :fontawesome-solid-file-lines: __[SF32LB52x ハードウェア設計ガイド]__
- :fontawesome-brands-github: __[SiFli公式Wiki記事]__
- :fontawesome-solid-up-right-from-square: __[LCKFBプロジェクトページ]__
- :fontawesome-solid-book: __[LCKFBハードウェアWiki]__
- :fontawesome-solid-cart-shopping: __[サンプルを購入]__

</div>
