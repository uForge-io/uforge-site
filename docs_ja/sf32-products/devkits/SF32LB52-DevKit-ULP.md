---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: システムレベルの低消費電力評価向けに、AMOLED、タッチ、センサー、オーディオ、バッテリー充電、電流測定サポートを備えたウェアラブル指向のSF32LB52x開発ボード。"
tags:
    - ハードウェア
    - 開発ボード
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## 概要 { #overview }

SF32LB52-DevKit-ULPは、**立创黄山派**、**LCKFB-HSPI-SF32LB52-ULP**、**SF32LB52-ULP** とも呼ばれます。SF32LB52xファミリーをベースにした小型の超低消費電力ウェアラブル開発ボードで、単純なMCUブレークアウトではなく、スマートウォッチやフィットネスバンドのプロトタイプ開発向けに設計されています。

LCD、Nano、Core-3p3の各ボードよりも製品に近い構成で、SF32LB52モジュール、AMOLEDディスプレイ、タッチ、マイク、スピーカーアンプ、RGB LED、振動モーター駆動回路、モーションセンサー、磁気センサー、環境光センサー、バッテリー充電回路、電流測定用ジャンパーを備えています。「MCUが動作するか」だけでなく、「バッテリー駆動時にウェアラブルシステム全体がどう動作するか」を評価するのに適しています。

SiFliの [ULP開発ボードガイド][SiFli公式Wiki記事]は現在もプレースホルダーです。詳細な基板構成の一次資料は、SiFliの中国語版[黄山派開発ボードガイド][SiFli黄山派ガイド]です。同ガイドが記載するV1.0.0を本ページの基準としています。一方、基板リビジョンを明記していない[LCKFBハードウェアWiki][LCKFBハードウェアWiki]には異なる部品番号があります。リビジョンまたは資料更新状況の違いが考えられるため、部品を同等品として扱わず、実機の表示、回路図、BOMを確認してください。

**リリース状況に関する注記：** SiFliのV1.0.0ガイドによると、同ガイドが記載する基板は当時、社内試用向けであり、修正後に外部公開する予定でした。この記述は当該資料のリビジョンに限られ、後続基板の状態やBOMを示すものではありません。実機の正確な基板リビジョンとBOMを確認してください。

SiFli SDKの[ボードページ][SiFli SDK ULPボードページ]では、ビルドターゲット名が`sf32lb52-lchspi-ulp`とされています。SDKのボードページと中国語版Huangshan Piガイドの同梱品欄には`SF32LB52X-MOD-1-N16R8`、SiFliの[モジュール型番ガイド][SiFliモジュール型番ガイド]と同ガイドのGPIO表見出しには`SF32LB52-MOD-1-N16R8`と記載されています。この`X`の有無が異なる理由は説明されていません。SDKターゲット名は確認できますが、実装モジュールの型番は現物の表示とBOMで確認し、表記だけから別のハードウェアだと判断しないでください。

![SF32LB52-ULPのウェアラブル向けボード組み立て例](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — ウェアラブル向けボード組み立て例</em></div>

![Huangshan Pi SF32LB52ブロック図](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>黄山派SF32LB52 — ブロック図</em></div>

## 名称 { #naming }

<div align="center"><em>ボードの別称</em></div>

<div align="center" markdown>

| 名称 | 使用される場所 |
| :--- | :--- |
| SF32LB52-DevKit-ULP | SiFli/OpenSiFliのボードファミリー名 |
| SF32LB52-ULP | ハードウェア/製品の略称 |
| LCKFB-HSPI-SF32LB52-ULP | LCKFBのプロジェクト/注文名 |
| 立创黄山派 / 立创・黄山派SF32LB52 | 中国語の製品名・ドキュメント名 |

</div>

ハードウェア資料、使用例、購入ページ、コミュニティ情報を検索する際は、これらの名称を同じボードファミリーの別名として利用してください。回路図、ピン配置、BOMを確認する際は、必ずボードのリビジョンと対応するベンダー資料を確認してください。

## ボードの主な特長 { #board-highlights }

- SF32LB52xベースのSF32LB52-MOD-1-N16R8モジュール
- SF32LB525UC6標準モジュール構成
- 8 MB OPI-PSRAM、144 MHzインターフェース
- 128 Mb QSPI-NOR Flash、72 MHz STRモード
- 48 MHzメイン水晶と32.768 kHz RTC水晶
- オンボードPCBAアンテナ
- 1.85インチAMOLEDディスプレイ、解像度390 × 450
- タッチサポート付きQuad-SPIディスプレイインターフェース
- オンボードMEMSマイク
- Class-Dスピーカーアンプによるアナログオーディオ出力
- 3 W / 4 Ωまたは2 W / 8 Ωのスピーカーに対応する外部スピーカーコネクター
- CH340Nによる、書き込み・デバッグ・給電用のUSB Type-C UARTインターフェース
- 30ピン拡張コネクターを通じて公開されるUSB 2.0 FS信号
- SPIを使用するMicroSDカードスロット
- 機能キー1個と電源/リセットキー1個
- SK6812MINI-HS RGB LED（SiFli V1.0.0ガイドの記載。リビジョン不明のLCKFBページではWS2812B-2020）
- 外部モーター用はんだパッドを備えた振動モーター駆動回路
- LSM6DS3TR-C 6軸IMU
- MMC5603NJ 3軸磁気センサー
- LTR-303ALS-01環境光センサー
- ウェアラブル機器の消費電力評価用のバッテリー充電器と電源管理デバイス
- GPIOと電流測定に対応した、2 × 15ピン、1.27 mmピッチの拡張ヘッダー

## このボードが適する用途 { #when-to-use-this-board }

目標がウェアラブルシステムの検証である場合は、SF32LB52-DevKit-ULP / 立创黄山派 を選択してください。

- ウォッチ、バンド、センサーを多用するウェアラブルプロトタイプの構築
- SF32LB52xプラットフォーム上でのAMOLED UIの挙動評価
- タッチ、モーションセンシング、磁気センシング、環境光センシング、オーディオ、振動、RGB LEDの挙動を同時にテスト
- スリープ時とアクティブ時のバッテリー、システム、3.3 Vの各電流パスを測定
- ボタン、センサー、タッチ、ファームウェアタイマーによって駆動されるウェイクアップフローの検証
- よりシンプルなDevKitボードによる初期見積もりと、実際の製品に近い電力挙動を比較

ディスプレイ重視の汎用評価ボードには [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md) を使用してください。コンパクトなはんだ付けモジュールのプロトタイピングには [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md) を使用してください。初期のベンチでの立ち上げで、最も多くのピンに直接アクセスしたい場合は [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md) を使用してください。

## ハードウェア構成 { #hardware-configuration }

<div align="center"><em>ハードウェア構成の概要</em></div>

<div align="center" markdown>

| 領域 | 構成 |
| :--- | :--- |
| コアモジュール | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB OPI-PSRAM、144 MHzインターフェース |
| Flash | 128 Mb QSPI-NOR Flash、72 MHz STRモード |
| ディスプレイ | 1.85インチAMOLED（ZC-A1D85W-010）、390 × 450、輝度800 cd/m²、Quad-SPI |
| ディスプレイドライバー | CO5300AF-01 |
| ディスプレイ電源IC | BV6802W |
| タッチコントローラー | FT6146-M00 |
| マイク | オンボードMEMSマイク |
| スピーカー出力 | Class-Dアンプ、外部GH-1.25 mmスピーカーコネクター |
| ストレージ | SPI経由のMicroSDカード |
| モーションセンサー | LSM6DS3TR-C 6軸IMU |
| 磁気センサー | MMC5603NJ 3軸磁力計 |
| 環境光センサー | LTR-303ALS-01 |
| USB-UART | USB Type-C経由のCH340N |
| バッテリー | GH1.25 mmコネクターを通じた外部Li-ionバッテリー |
| 充電器 | SY6103、最大充電電圧4.5 V、デフォルト定電流設定450 mA、最大充電電流500 mA |
| 保護/電源デバイス | SY5320過電圧保護（OVP）、LP5240HVF負荷スイッチ、ETA5055V330DS2F低ドロップアウトレギュレーター（LDO） |

</div>

**部品番号は資料／リビジョンによって異なるため、設計前に確認してください：** SiFliのV1.0.0[黄山派開発ボードガイド][SiFli黄山派ガイド]では、充電ICはSY6103、OVPはSY5320、RGB LEDはSK6812MINI-HSです。リビジョン不明の[LCKFBハードウェアWiki][LCKFBハードウェアWiki]ではOVPとしてLP5305AQVF、RGB LEDとしてWS2812B-2020が記載され、充電ICも特性一覧ではAW32001ECSR、充電の説明ではAW23001ECSRと異なります。これらの差が基板改版によるものか、資料の更新漏れかは確認できていません。SiFli V1.0.0の値は、資料に記載された同リビジョンの基準にのみ適用してください。部品固有の仕様を前提に設計する場合は、実機のマーキング、回路図、BOMを確認してください。

## 同梱品 { #package-contents }

資料では、黄山派のボードセットに次のものが含まれるとされています。

- コアボード
- スクリーンボード
- バッテリー
- スピーカー

評価環境を準備する前に、購入したキットの同梱品を確認してください。付属品は販売元や製造ロットによって異なる場合があります。

## 電源とバッテリー { #power-and-battery }

このボードは2つの主要な給電モードをサポートします。

- USB Type-C電源
- スタンドアロンのバッテリー電源

バッテリー入力には、正順ピン配列のGH1.25 mmコネクターを介して単セルLi-ionバッテリーを接続します。資料記載の充電回路は最大500 mAに対応し、定電流値は既定で450 mAに設定されています。

バッテリーを使わず、ベンチ電源からVBATに給電する場合、資料に記載された入力範囲は3.7～4.7 Vで、通常電圧での電源試験には3.8 Vが推奨されています。SF32LB52-MOD-1-N16R8の電源オン閾値は3.58 V、電源オフ閾値は3.48 Vです。

LCKFBのハードウェアガイドでは、バッテリー未接続時に長押しキーの機能が動作しない場合があると注意しています。該当する基板リビジョンと実際の給電条件で動作を確認してください。

## 電流測定用ジャンパー { #power-measurement-jumpers }

主要な電源経路には、電流測定用のジャンパーが設けられています。

<div align="center"><em>電流測定用ジャンパーの割り当て</em></div>

<div align="center" markdown>

| ピン | パス | 目的 |
| :--- | :--- | :--- |
| 5-6 | VBATパス | バッテリーまたは充電器と後段システムの間に電流計を挿入 |
| 7-8 | VSYSパス | VSYSパスに電流計を挿入 |
| 11-12 | VCC_3V3パス | 3.3 Vメイン電源レールに電流計を挿入 |

</div>

通常動作時は、ピン5-6、7-8、11-12をジャンパーで短絡してください。電流計またはパワーアナライザーを接続するときだけ、測定対象のジャンパーを取り外します。

## ファームウェアの書き込みとデバッグ { #download-and-debug }

通常の開発では、USB Type-CのUARTインターフェースを使ってファームウェアを書き込み、シリアルログを確認し、ボードに給電します。

初回の立ち上げに必要なハードウェア:

- SF32LB52-DevKit-ULP / 立创黄山派 ボード
- USB 2.0データケーブル
- Windows、Linux、macOSを実行するホストコンピューター

任意のハードウェア:

- 外部スピーカー
- TFカード
- Li-ionバッテリー、450 mAh以上
- UARTデバッグとネイティブUSBテストを同時に行う場合の2本目のUSBケーブル

データ通信に対応したUSBケーブルを使用してください。充電専用ケーブルでも給電はできますが、シリアル通信はできません。

## SDKビルドターゲット { #sdk-build-targets }

SiFli-SDKの正確なボードターゲット名は`sf32lb52-lchspi-ulp`です。`scons --board=<board_name>`コマンドでこの名前を使用してください。これはSDKのビルドターゲット識別子であり、基板やモジュールに印字された製品型番と一致するとは限りません。使用中のSDKリビジョンについて、[Supported Boardsインデックス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)と[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)を確認してください。

## 主要な信号割り当て { #key-signal-assignments }

<div align="center"><em>主要な信号割り当て</em></div>

<div align="center" markdown>

| 信号 | 機能 |
| :--- | :--- |
| PA44 | VBUS_DET、充電器接続検出 |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | タッチ割り込み |
| PA40 / PA39 | センサーI2C1 SCL / SDA（GPIO割り当て表に基づく。ヘッダーピンの不一致は下記参照） |
| PA38 | VSYSからVSYS_1への切替制御 |
| PA37 / PA33 | タッチI2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | HOMEキーと10秒長押しリセット |
| PA32 | RGB LEDデータ |
| PA31 | センサー割り込み1 |
| PA30 | VSYS_1からHR3V3への切替制御 |
| PA27 | SDカード検出 |
| PA24、PA25、PA28、PA29 | SPI1 MicroSDインターフェース |
| PA20 | 振動モーターPWM |
| PA19 / PA18 | デバッグUART TXD / RXD |
| PA11 / PA10 | 充電器I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | マイクバイアスと入力 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | アナログオーディオ出力 |
| PA08..PA03、PA02、PA01、PA00 | QSPIディスプレイ、TE、バックライトPWM、リセット |
| PA15..PA12、PA16、PA17 | MPI2 / SD1信号、N16R8モジュールでモジュールFlashによって内部使用 |

</div>

## 30ピン拡張ヘッダー { #30-pin-expansion-header }

30ピンヘッダーには、電源、USB、センサー、ディスプレイ関連、ストレージ、振動、デバッグ、キー、充電器制御の各信号が引き出されています。

<div align="center"><em>30ピン拡張ヘッダー信号マップ</em></div>

<div align="center" markdown>

| ピン番号 | 信号 | 注記 |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | USB接続時はUSBからの5 V、USB未接続時は5 V入力として使用可能 |
| 3-4 | GND | グラウンド |
| 5-6 | VBAT_S / VBAT | 通常動作時は短絡、VBAT電流測定時は開放 |
| 7-8 | VSYS_S / VSYS | 通常動作時は短絡、VSYS電流測定時は開放 |
| 9-10 | GND | グラウンド |
| 11-12 | VCC_3V3_S / VCC_3V3 | 通常動作時は短絡、3.3 V電流測定時は開放 |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | SiFli V1.0.0ヘッダー表ではセンサーI2C1 SDA / SCL。14番ピンはGPIO割り当て表と不一致（下記参照） |
| 17 | PA32 | RGB LEDデータ、GPIOとしても使用可能 |
| 18 | PA30 | センサー電源制御。GPIOとして使用するとPA39/PA40の挙動に影響する可能性あり |
| 19-23 | PA29、PA24、PA28、PA25、PA27 | SPI1/SDカード関連ピン。拡張利用はオンボードTFカードと競合 |
| 24 | PA20 | 振動PWM。拡張利用はモーター駆動と競合 |
| 25 / 27 | PA19 / PA18 | デバッグUART TXD / RXD |
| 26 / 28 | PA34 / PA43 | 電源/リセットキーと機能キー |
| 29 / 30 | PA11 / PA10 | 充電器I2C0 SDA / SCL |

</div>

**ピン配置資料に不一致があります。配線前に確認してください：** SiFli V1.0.0のGPIO割り当て表ではセンサーI2C1_SDAはPA39、30ピンヘッダー表では14番ピンがPB39（I2C1_SDA）、16番ピンがPA40/I2C1_SCLと記載されています。LCKFBの資料にもPA39/PB39の不一致がありますが、基板リビジョンは明記されていません。14番ピンのMCUパッドと基板上の配線は未確定です。周辺機器を接続する前に、対象基板の回路図/BOMと導通を確認し、PA39とPB39を互換とみなさないでください。

## ディスプレイとタッチインターフェース { #display-and-touch-interface }

このボードはAMOLEDディスプレイパスを使用し、22ピンのQSPI FPC信号セットを引き出しています。SiFliのV1.0.0表では5～10番ピンがNCとされています。以下の表には22個すべての位置を記載し、未接続のピンも明示しています。

<div align="center"><em>22ピンQSPIディスプレイ・タッチFPC信号マップ</em></div>

<div align="center" markdown>

| ピン | 信号 | 機能 |
| :--- | :--- | :--- |
| 1 | VBAT | ディスプレイ側VBAT出力 |
| 2 | PA01 | TFTスタイル利用向けのバックライトPWM |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | 未接続 |
| 6 | NC | 未接続 |
| 7 | NC | 未接続 |
| 8 | NC | 未接続 |
| 9 | NC | 未接続 |
| 10 | NC | 未接続 |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | LCDリセット |
| 13 | PA04 | QSPI/SPIクロック |
| 14 | PB05（SiFli V1.0.0 FPC表） | QSPI D0 / SPI SDI。別のGPIO割り当て表ではPA05と記載 |
| 15 | PA03 | QSPI/SPIチップセレクト |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V出力 |
| 18 | PA41 | タッチ割り込み |
| 19 | PA33 | タッチI2C SDA |
| 20 | PA37 | タッチI2C SCL |
| 21 | PA09 | タッチリセット |
| 22 | GND | グラウンド |

</div>

**ピン配置資料に不一致があります。ディスプレイ接続前に確認してください：** SiFli V1.0.0の22ピンFPC表では14番ピンがPB05（QSPI D0）、別のGPIO割り当て表では同信号がPA05と記載されています。LCKFBのFPC表もPB05、GPIO表はPA05としていますが、モジュール側のパッド名とFPCの端子表記の関係は説明されていません。対象基板の回路図/BOMと導通を確認するまでは、実際の配線を未確認として扱い、PA05とPB05を互換とみなさないでください。

## 消費電力の測定方法 { #power-measurement-guidance }

超低消費電力を有効に評価するには、次の点に注意してください。

- 可能な限りVBAT、VSYS、VCC_3V3を個別に測定してください。
- 測定対象ではない電源レールは、対応するジャンパーを短絡したままにしてください。
- スリープ電流を測定する前に、RGB LEDエフェクト、デバッグログ、ディスプレイのリフレッシュ、センサーのポーリングなど、回避可能な負荷を無効にしてください。
- 測定ごとに、ボードのリビジョン、ファームウェアのコミット、バッテリーまたは電源の電圧、ジャンパーの状態、センサーの動作状態を記録してください。
- タッチ、センサー割り込み、Bluetooth通信、ディスプレイ復帰、振動動作について、スリープ中の定常電流とイベント発生時の電流をそれぞれ測定してください。

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
