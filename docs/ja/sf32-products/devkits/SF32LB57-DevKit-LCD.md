---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD：RGB表示、DVPカメラ、PDMマイク2個、スピーカー、SDIO Wi-Fi、USBを評価するモジュール搭載開発ボード。"
tags:
    - ハードウェア
    - 開発ボード
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## 概要 { #overview }

SF32LB57-DevKit-LCDは、**SF32LB57-MOD-WD**を中心とするマルチメディア評価ボードです。この型番はSiFliのモジュール製品として企画されているようです。**WD**は**Wi-Fi Dual-band（デュアルバンドWi-Fi）**の略と思われますが、この解釈は公式には確認されていません。ボードはSF32LB57x MCU、SDIO Wi-Fi、起動用Flash、周辺機器接続を備えています。スマートHMI、カメラ端末、インターホン、ネットワーク接続ディスプレイの開発に使い、キャリアボードの設計前にグラフィックス、画像取り込み、オーディオ、通信を検証できます。

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — 表面" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>表面</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — 裏面" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>裏面</figcaption></figure>
</div>

## 搭載リソース { #board-resources }

原資料には、240 MHzのSTAR-MC1性能コア2個（合計1968 CoreMark）と、592 KBの保持SRAM（HPSYS 512 KB + LPSYS 80 KB）が記載されています。マルチコア構成の詳細は[SF32LB57x](../chips/SF32LB57x.md)を参照してください。モジュールにはQSPI-NOR起動用Flash、型番に応じたOPI-PSRAM、MCU用48 MHz水晶振動子、Wi-Fi用40 MHz水晶振動子があります。メモリー構成を選ぶ前に、モジュールの表示を確認してください。

原資料によると、このボードは3.3 V電源のSF32LB57x品種を使用し、モジュールをキャリアボードに実装するためのキャスタレーションパッドを備えています。OPI-PSRAMは正確なモジュール型番によって搭載される場合があり、すべての構成に含まれるわけではありません。

<div align="center"><em>搭載リソース</em></div>

<div align="center" markdown>

| 部品／コネクター | 構成 |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM（任意）; SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0.5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0.5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2.54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFliはWi-FiデバイスをAIC8800D40LS-Nとし、一部でWi-Fi/Bluetoothコンボと説明しています。SF32 MCU自身のBluetooth機能とは区別してください。実装された無線デバイス、RFスイッチ配線、SDKドライバーを確認し、別のBluetooth経路も使えるとは仮定しないでください。ボードにはIPEX-1アンテナコネクターとWi-Fi電源、ウェイクアップ、アンテナ切り替えの制御信号があります。

![ブロック図](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>ブロック図</em></div>

原図は機能の概要であり、配線図としては使えません。TFデータ線D0–D3とIOエキスパンダー配下のWS2812Bを示す一方、本文ではTFを1ビットSDIO、WS2812Bを基板リビジョンに応じてMCUのPA_11/PA_08から直接制御するとしています。対応する回路図とSDKのピン設定で確認してください。

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — 表面の部品" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>表面の部品</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — 裏面の部品" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>裏面の部品</figcaption></figure>
</div>

## 初回の立ち上げ { #getting-started }

表示評価には、ボード、互換性のある40ピン／0.5 mm DPI-RGBパネル、データ通信対応USBケーブル、Windows・Linux・macOSのいずれかを実行するPCを用意します。IPEX-1アンテナ、DVPカメラ、MicroSD／TFカード、8 Ωスピーカー、J-LinkまたはDAP-Linkは任意です。UARTログとネイティブUSBを同時に試す場合は、データケーブルが2本必要です。

1. 電源を切り、FPCの1番ピン、接点の向き、パネル電圧を確認してからFPC1に接続します。無線試験の前にアンテナを取り付けてください。
2. ネイティブUSBではなくUSB-to-UART Type-Cポートを接続し、SifliTraceまたはImpellerで対応するCOMポートを選択します。
3. 書き込み時はBOOT MODEジャンパーJ1を装着してから電源投入またはリセットします。通常起動とシリアルログにはJ1を外してリセットします。
4. まずシリアルhello-worldを確認し、次に単色のテスト画面と、対応パネルではタッチを検証します。カメラ、オーディオ、ストレージ、無線を個別に追加し、最後に同時動作を試します。

出荷時ファームウェアの入ったボードでは電源投入時に既定UIが出る場合がありますが、ファームウェアとパネルによります。黒画面だけでは書き込み失敗とは判断できません。ツールチェーン、環境設定、書き込み手順は[SiFli-SDK入門](../../getting-started/sifli/getting-started-sifli-sdk.md)を参照してください。

## SDKの設定 { #sdk-build-targets }

SiFliのボードガイドでは、SiFli SDKをインストールし、`SF32LB57-DevKit-LCD`ボードサポートパッケージを選択するよう案内しています。現在リンクしている上流の`build_config_gcc.yaml`にはSF32LB57のビルドターゲットが記載されていません。コンパイル前に使用するSDKチェックアウトでボードサポートパッケージと正確なビルド識別子を確認し、別ボードのターゲットを流用しないでください。UART hello-worldが成功して確認できるのは基本的なシリアル起動までであり、表示、カメラ、Wi-Fiドライバーの検証にはなりません。

## 電源とデバッグ { #power-and-debug }

どちらのType-Cポートからも5 Vを供給できます。U4（ETA3425D2G）は主電源`VDD_3V3`、U7（ETA3425D2G）は`WF_3V3`を生成し、後者は`IOEX_WF_PWREN`で独立して有効化します。USB-to-UARTブリッジはCH343Pです。もう一方のコネクターは`PA35`/`PA36`のUSB 2.0 FSです。SWDには`PA_43`（SWCLK）、`PA_44`（SWDIO）、3.3 Vターゲット基準、共通GNDを接続します。デバッガーの5 V出力を3.3 Vピンに接続しないでください。

ボードのSWD図ではJ3の17番ピンが3.3 V、18番がSWCLK、19番がSWDIO、20番がGNDです。これはボード側ヘッダーの番号であり、デバッガーアダプターの番号ではありません。両端の信号名を照合して接続してください。

![SWD接続](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>SWD接続</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — J-Linkアダプター" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>J-Linkアダプター</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — SWDアダプター" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>SWDアダプター</figcaption></figure>
</div>

## 表示とカメラ { #display-and-camera }

FPC1はALIENTEK RGBピン配列の40ピン／0.5 mm `FPC-05FB-40PH20`です。既定はRGB888で、パネルとファームウェアが対応すればRGB565/RGB666で一部データピンを解放できます。FreeIOを使えば同じコネクターからQSPI、MCU8080、EPD、JDIの変換接続も試せますが、適切なアダプター、電源、ファームウェアが必要です。ネイティブDSI接続ではありません。

原資料では24ビット全幅のRGB888にQFN80またはBGA112搭載モジュールが必要とされ、ePicasso 3.0は2D/2.5Dグラフィックスアクセラレーターと説明されています。FPC1の1番ピンはバックライトまたは表示ドライバーの昇圧回路用5 Vであり、3.3 V GPIOではありません。J3の3番・5番ピンはPA_23/PA_22のカメラ／タッチ設定用I2Cバスを共有します。

!!! warning
    原資料はePicasso 3.0の処理上限2048 × 2048と全画面60 fpsを記載する一方、後半では解像度とリフレッシュレートはパネル次第としています。2048 × 2048の表示を60 fpsで更新できる保証と解釈せず、LCDCタイミング、パネル接続、フレームバッファー、メモリー帯域、実際の負荷を確認してください。FPC1の37～40番ピンは、4接点に対して5種類の制御信号が候補に挙がっており、原資料でも割り当てが確定していません。接続前に`57x LCD-DevKit ioconfig-08192026.xlsx`と対応する回路図を確認してください。

![RGBパネル接続](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>RGBパネル接続</em></div>

FPC4は24ピン／0.5 mm DCMI DVPコネクターです。原資料はGC032A、OV2640、OV5640、OV3660を挙げ、既定構成はOV2640/OV5640としています。他のモジュールでは回路図注記に従って電源変更が必要な場合があります。カメラ電源は`DVDD_1V5`、`DVDD_2V8`、`AVDD_2V8`で、コネクター形状だけでなくセンサーの要求に合わせてください。DVPデータ線はジャンパーで選択し、Wi-Fi SDIOまたはTFカードSDIOと一部のピンを共有します。既定設定では競合する機能を同時使用できません。

カメラの3電源には独立したLDOを使用します。表面の注釈付き画像はカメラコネクターを22Pとしていますが、本文とFPC4表は24ピンです。文書上の参照には24ピン表を使い、接続前に実物のコネクターと回路図を確認してください。FPC4の6番ピンのリセット割り当て（IOEX_DVP_PDN/RESET）も原資料では曖昧です。リセットとパワーダウンを個別制御できると仮定せず、配線を確認してください。

![カメラ接続](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>カメラ接続</em></div>

## 共有ピンとリビジョンの確認 { #shared-pins-and-revisions }

- `PA35`/`PA36`はFPC1とネイティブUSB FSで共有されます。競合するパネル接続とUSBデバイス機能を同時に使わないでください。
- `PA_43`/`PA_44`のSWDは表示／カメラ機能とピンを共有します。デバッグ復旧経路を確保してください。
- WS2812BはV1.0で`PA_11`、V1.1で`PA_08`を使用します。原資料は`PA_11`を`BL_PWM`にも割り当てているため、LEDやバックライトを駆動する前に競合を解決してください。
- J3がRaspberry Piの40ピン電源／GND位置に対応しても、同じソフトウェア環境や全HATの互換性を保証しません。拡張ボード接続前に電圧、ピン設定、共有信号を確認してください。

## オーディオ・ボタン・IO拡張 { #audio-controls-and-io-expansion }

原資料の再生経路は24ビットDACからU8（NS4150B）のモノラルClass-Dアンプを通りJ7（`MX1.25-2P`）へ出力し、既定スピーカーは8 Ωです。PDMマイク2個はMSM261DGT007またはピン互換LMD4020T261-AC23を使用します。`PA_56`がPDMクロック、`PA_55`がデータで、`IOEX_PDM_PWREN`がマイク電源、`IOEX_AU_PA_EN`がアンプを有効化します。製品採用前に実際のオーディオ形式、ゲイン、スピーカー負荷上限を確認してください。

S1–S3は`PA_34`/`GPADC_CH6`を共有し、原資料では各ボタンの公称電圧を2.97 V、2.58 V、2.19 Vとしています。S4はアクティブLowの`KEY_RSTN`です。U11（AW9523BTOR）は、`PA_22`（SCL）と`PA_23`（SDA）のI2C経由で16個のIOを提供します。表には原資料にある初期状態を記載していますが、実機のリセット動作とファームウェアの初期化も確認してください。P0_2/P0_3は原表に記載されていません。

<div align="center"><em>IOエキスパンダーの初期状態</em></div>

<div align="center" markdown>

| ポート | 信号／ラベル | 既定状態 | 方向 | 機能 |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3.3 V | 出力 | 2.4 GHzアンテナ切り替え |
| P1_1 | IOEX_LED_R | 3.3 V | 出力 | 赤色LED |
| P1_2 | IOEX_LED_G | 3.3 V | 出力 | 緑色LED |
| P1_3 | IOEX_LED_B | 3.3 V | 出力 | 青色LED |
| P1_4 | IOEX_WF_PWRKEY | 0 V | 出力 | Wi-Fiモジュール電源キー |
| P1_5 | IOEX_WF_PWREN | 0 V | 出力 | Wi-Fi用3.3 V降圧電源の有効化 |
| P1_6 | IOEX_CTP_RST | 0 V | 出力 | タッチコントローラーのリセット |
| P1_7 | IOEX_LCD_RESET | 0 V | 出力 | LCDリセット |
| P0_0 | IOEX_USB_DET | Hi-Z | 入力 | USB接続検出 |
| P0_1 | IOEX_TF_DET | Hi-Z | 入力 | TFカード挿入検出 |
| P0_4 | IOEX_PDM_PWREN | 0 V | 出力 | PDMマイク電源の有効化 |
| P0_5 | IOEX_AU_PA_EN | 0 V | 出力 | オーディオアンプの有効化 |
| P0_6 | IOEX_DVP_PDN | 0 V | 出力 | カメラのパワーダウン |
| P0_7 | IOEX_HST_WAK_WF | 0 V | 出力 | ホストからWi-Fiへのウェイクアップ |

</div>

## コネクターリファレンス { #connector-reference }

!!! warning
    以下は原資料のボード接続を転記した表で、回路図の代わりにはなりません。モジュール一覧は`58~?`の行が未完で、`PA_00`/`PA_01`をUSB_DP/USB_DMとする表記も、明示されたネイティブUSBの`PA35`/`PA36`と矛盾します。出典では一部の行にモジュールパッドとGPIOの範囲、複数の代替機能がまとめて記載されていますが、各パッドの機能は示されていません。このページではグループ表記を維持し、個々の割り当ては推定しません。モジュールパッド番号とMCU GPIOを区別し、未確認の行をPCB設計に使わないでください。

<div align="center"><em>モジュールパッド一覧：原資料の未確認項目を保持</em></div>

<div align="center" markdown>

| ピン | 信号／ラベル | 機能 |
|:---|:---|:---|
| 1 | GND | GND |
| 2 | VDD_3V3 · 3.3 V | 3.3 V電源入力 |
| 3 | VDD_1V8 · 1.8 V LDO | 内部LDOの1.8 V出力 |
| 4 | RSTN | リセットボタンに接続 |
| 5~22 | PA_41 ~ PA_24 | GPIO / LCDC / SPI / SD / デバッグ兼用 |
| 23~36 | PA_23 ~ PA_10 | GPIO / I2C / SD / USB / オーディオ / デバッグ兼用 |
| 37 | DAC1P | 差動DAC出力P |
| 38 | DAC1N | 差動DAC出力N |
| 39 | MICBIAS_PA56 / PDM_CLK | マイクバイアス／PDMクロック |
| 40 | ADC1P_PA55 / PDM_DAT | オーディオADC入力P／PDMデータ |
| 41 | GND | GND |
| 42 | PA_00 / USB_DP | GPIO / USB_DP（原資料に矛盾あり。警告参照） |
| 43 | PA_01 / USB_DM | GPIO / USB_DM（原資料に矛盾あり。警告参照） |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / タッチ / USB検出 |
| 54 | GND | GND |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | DPI-RGB上位データ／PDM／Wi-Fiウェイクアップ。引き出しはモジュールパッケージによる |

</div>

<div align="center"><em>J3：40ピン拡張ヘッダー</em></div>

<div align="center" markdown>

| ピン | 信号／ラベル | 接続／機能 |
|:---|:---|:---|
| 1 | 3V3 | 3.3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3.3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1：RGB表示コネクター</em></div>

<div align="center" markdown>

| ピン | 信号／ラベル |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | 制御信号：割り当て要確認: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4：DVPカメラコネクター</em></div>

<div align="center" markdown>

| ピン | 信号／ラベル |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2.8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2.8 V |
| 23 | NC |
| 24 | GND |

</div>

## 資料と次の設計段階 { #related-documents }

カスタムボードには[SF32LB57xハードウェア設計ガイド](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)と[量産設計](../../hardware/design-for-production.md)を参照してください。個別機能の開発には[グラフィックス](../../learn/graphics/overview.md)、[オーディオ](../../learn/audio/overview.md)、[Bluetooth](../../learn/bluetooth/overview.md)を利用できます。

- [SiFli SF32LB57x製品資料](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [SiFliユーザーマニュアルのダウンロード](https://downloads.sifli.com/user%20manual/)
- [SF32LB57xハードウェア設計ガイド原文](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

ボード原資料ではSF32LB57xユーザーマニュアルは公開予定となっています。現在の公開状況はダウンロード一覧を確認してください。

- [中国語の公式ボードガイド](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Markdown原文](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [SDKビルド設定](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [表示ツール](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Impeller書き込みツール](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [SiFliストア](https://sifli.taobao.com/)

SiFli原資料では、サンプルや少量購入の窓口として公式ストア、量産の問い合わせ先としてsales@sifli.comを案内しています。オープンソース向けサンプルの申請とQQグループ674699679にも言及していますが、利用条件と現在の供給状況はSiFliに確認してください。案件については[μForge.ioへのお問い合わせ](../../about/contact.md)もご利用ください。
