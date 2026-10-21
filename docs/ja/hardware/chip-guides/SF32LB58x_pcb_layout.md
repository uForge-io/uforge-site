---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB58x MCUのPCBレイアウト指針。パッケージフットプリント、基板積層、ファンアウト、クロック、RF、オーディオ、USB、SDIO、DSI、電源の配線を扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58xハードウェア設計ガイド — PCBレイアウト指針 { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB58xハードウェア設計ガイドの一部"
    このページでは、第 6 章「PCBレイアウト指針」を扱います。[回路図設計指針](SF32LB58x_schematic_design.md)に戻るか、[PCBレイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)に進むか、[設計レビュー用チェックリストと参考資料](SF32LB58x_review_and_reference.md)まで先に進んでください。

## 6. PCBレイアウト指針 { #6-pcb-layout-guidelines }

### 6.1. パッケージフットプリントの設計 { #61-package-footprint-design }

SF32LB58xシリーズのパッケージはBGA256で、外形は8.5 mm × 6.5 mm × 0.94 mm、ボールピッチは0.4 mm、ボール径は公称0.25 mmです。パッケージ認定の全データについては、公式データシートを参照してください。

!!! warning "資料間でパッケージ高さが一致しません"
    SiFliのガイド本文ではパッケージ高さを0.94 mmとしています。一方、BGA256パッケージ図では寸法Aが公称0.91 mm、範囲0.84～1.04 mmと記載されています。これらの値は一致しません。高さが機械的クリアランスや筐体との適合に影響する場合は、どちらかを独断で採用せず、SiFliに確認したうえで確定したパッケージ仕様を使用してください。

![図 6.1-1: BGA256パッケージ寸法](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-1: BGA256パッケージ寸法</em></div>

![図 6.1-2: パッケージフットプリント形状](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-2: パッケージフットプリント形状</em></div>

![図 6.1-3: PCBランドパターンの参考図](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-3: PCBランドパターンの参考図</em></div>

![図 6.1-4: パッケージボールマップ](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-4: パッケージボールマップ</em></div>

![図 6.1-5: パッケージ基板のボール情報](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-5: パッケージ基板のボール情報</em></div>

### 6.2. PCBの積層構成 { #62-pcb-stack-up }

SF32LB58xシリーズは、片面実装または両面実装に対応します。PCBはHDI基板である必要があり、PTHは使用できません。6HDI-2の積層構成を推奨します。図に示す参考構成の完成基板厚は0.8 mm ±10%（公称約32 mil）です。

![図 6.2-1: 積層構成の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.2-1: 積層構成の参考図</em></div>

### 6.3. 一般的なPCB設計ルール { #63-general-pcb-design-rules }

寸法（mm）を含む一般的なPCB設計ルールの図については、公式データシートを参照してください。図に示す参考ルールは、配線幅が最小・推奨ともに0.075 mm、最大2 mm、配線・ビア・パッド・SMD・文字・銅箔間の最小クリアランスが0.075 mm、基板端までのクリアランスが0.25 mm、ドリル間および部品本体間の間隔が0.1 mmです。最終的なルールは基板メーカーの製造能力に合わせて確認してください。

![図 6.3-1: 一般的なPCB設計ルール](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-1: 一般的なPCB設計ルール</em></div>

#### 6.3.1. ブラインドビアの設計 { #631-blind-via-design }

寸法（mm）を含むブラインドビア（1～2層および1～3層）の設計図については、公式データシートを参照してください。図に示すめっき済みブラインドビアの径は0.23 mm、ドリル径は0.10 mmです。

![図 6.3-2: 1～2層ブラインドビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-2: 1～2層ブラインドビアの設計</em></div>

![図 6.3-3: 1～3層ブラインドビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-3: 1～3層ブラインドビアの設計</em></div>

#### 6.3.2. ベリードビアの設計 { #632-buried-via-design }

寸法（mm）を含むベリードビア（2～5層）の設計図については、公式データシートを参照してください。図に示すめっき済みベリードビアの径は0.40 mm、ドリル径は0.20 mmです。

![図 6.3-4: 2～5層ベリードビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-4: 2～5層ベリードビアの設計</em></div>

### 6.4. 配線ファンアウト { #64-trace-fanout }

BGAボールの最初の2列は最上層で引き出し、残りのボールはビアを介して内層に引き出します。

![図 6.4-1: 最上層のファンアウト参考図](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.4-1: 最上層のファンアウト参考図</em></div>

![図 6.4-2: 内層のファンアウト参考図](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.4-2: 内層のファンアウト参考図</em></div>

### 6.5. クロックインターフェースの配線 { #65-clock-interface-routing }

水晶振動子はシールド缶の内側に配置し、PCBの端から1 mmより離し、周波数オフセットへの影響を避けるため、PA、充電回路、PMU回路など発熱部品からできるだけ離します。理想的には5 mm以上離してください。水晶振動子のキープアウト領域は、他の金属または部品から0.25 mmを超える距離を確保します。

48 MHz水晶振動子は最上層に配線し、配線長を3～10 mm、配線幅を0.075 mmとして、3Dシールドを設けます。VBAT、DC/DC、高速信号線から離して配線します。48 MHz水晶振動子領域の最上層と隣接層には、他の配線を通さないでください。

32.768 kHz水晶振動子は最上層に配線し、配線長を ≤10 mm、配線幅を0.075 mmとします。32K_XIと32K_XOの平行配線間隔を ≥0.15 mmに保ち、3Dシールドを設けます。水晶振動子領域の最上層とその下の隣接層には、他の配線を通さないでください。

!!! warning "水晶振動子のキープアウト層をSiFliに確認してください"
    レイアウトガイドは各水晶振動子領域の最上層とその下の隣接層をキープアウトとしています。チェックリストのワークブックは、4層基板では第 1、第 2、第 3 層を銅箔キープアウトとしています。第 3 層を含めるかどうかで資料間に差があります。第 3 層の最終要件を推測せず、SiFliに確認してください。

![図 6.5-1: 水晶振動子の配置](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-1: 水晶振動子の配置</em></div>

![図 6.5-2: 48 MHz水晶振動子の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-2: 48 MHz水晶振動子の回路図</em></div>

![図 6.5-3: 48 MHz水晶振動子配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-3: 48 MHz水晶振動子配線モデル</em></div>

![図 6.5-4: 48 MHz水晶振動子配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-4: 48 MHz水晶振動子配線の参考図</em></div>

![図 6.5-5: 32.768 kHz水晶振動子の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-5: 32.768 kHz水晶振動子の回路図</em></div>

![図 6.5-6: 32.768 kHz水晶振動子配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-6: 32.768 kHz水晶振動子配線モデル</em></div>

![図 6.5-7: 32.768 kHz水晶振動子配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-7: 32.768 kHz水晶振動子配線の参考図</em></div>

### 6.6. RFインターフェースの配線 { #66-rf-interface-routing }

RFマッチング回路はアンテナ側ではなく、できるだけチップの近くに配置します。AVDD_BRFのRF電源デカップリングコンデンサーもチップピンの近くに配置し、そのGNDピンのビアをメインGNDプレーンに直接接続します。

RF性能を損なうビアを避けるため、可能な限りRF配線を最上層に引きます。配線幅はできれば10 milを超えるようにし、3Dシールドを設け、鋭角や直角を避けます。RF配線の両側にシールド用GNDビアを追加し、インピーダンスを50 Ωに制御します。DC-DC、VBAT、高速デジタル信号（水晶振動子、高周波クロック、I2C/SPI/SDIO/I2S/UARTの各インターフェース信号など）をRF配線領域から除外します。AVSS_RRF、AVSS_TRF、AVSS_TRF2、AVSS_VCO、AVSS_BBはRF回路のGNDピンです。十分に接地し、パッド上にブラインドビアを配置してメインGNDに接続します。

![図 6.6-1: π型ネットワークと電源回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-1: π型ネットワークと電源回路の回路図</em></div>

![図 6.6-2: π型ネットワークと電源回路のPCBレイアウト](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-2: π型ネットワークと電源回路のPCBレイアウト</em></div>

![図 6.6-3: RF信号回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-3: RF信号回路の回路図</em></div>

![図 6.6-4: RF信号のPCB配線](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-4: RF信号のPCB配線</em></div>

![図 6.6-5: RF回路GND信号の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-5: RF回路GND信号の回路図</em></div>

![図 6.6-6: RF回路GND信号のPCB配線](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-6: RF回路GND信号のPCB配線</em></div>

### 6.7. オーディオインターフェースの配線 { #67-audio-interface-routing }

AVDD33_AUDオーディオ電源のデカップリングコンデンサーをピンの近くに配置し、そのGNDピンをメインGNDに十分に接続します。MIC_BIASのデカップリングコンデンサーもピンの近くに配置し、同様に十分に接地します。AUD_VREFのデカップリングコンデンサーもピンの近くに配置します。

AU_ADC1P/AU_ADC1NとAU_ADC2P/AU_ADC2Nは2組のアナログ入力ペアです。関連部品をピンの近くに配置し、各P/Nペアをできるだけ短い差動配線にします。差動ペアに3Dシールドを施し、強い干渉源となる他の信号をこれらの配線から遠ざけます。

AU_DAC1P/AU_DAC1NとAU_DAC2P/AU_DAC2Nは2組のアナログ出力ペアです。関連部品をピンの近くに配置し、各P/Nペアをできるだけ短く、<2 mmの差動配線にします。配線の寄生容量を <10 pFとし、差動配線幅を0.075 mmにします。差動ペアに3Dシールドを施し、強い干渉源となる他の信号をこれらの配線から遠ざけます。

!!! warning "DAC配線長の上限が資料間で一致しません"
    レイアウトガイドはDAC配線長を2 mm未満としていますが、PCBレイアウトチェックリストのワークブックは2 cm未満（20 mm）としています。上限は10倍異なります。SiFliの確認なしに一方の値を選択または置き換えないでください。

![図 6.7-1: オーディオ電源の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-1: オーディオ電源の回路図</em></div>

![図 6.7-2: オーディオ電源フィルターのPCB設計](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-2: オーディオ電源フィルターのPCB設計</em></div>

![図 6.7-3: アナログオーディオ入力の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-3: アナログオーディオ入力の回路図</em></div>

![図 6.7-4: アナログオーディオ入力のPCB設計](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-4: アナログオーディオ入力のPCB設計</em></div>

![図 6.7-5: アナログオーディオ出力の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-5: アナログオーディオ出力の回路図</em></div>

![図 6.7-6: アナログオーディオ出力のPCB設計](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-6: アナログオーディオ出力のPCB設計</em></div>

### 6.8. USBインターフェースの配線 { #68-usb-interface-routing }

AVDD33_USBのデカップリングコンデンサーとUSB2_REXTのキャリブレーション抵抗を、それぞれのピンの近くに配置します。USB配線はチップに到達する前にESD保護部品のピンを通過させる必要があります。ESD部品のGNDピンはメインGNDに十分に接続します。USB DP／DNは差動インピーダンス90 Ωに制御した差動ペアとして配線し、3Dシールドを設けます。

![図 6.8-1: USB信号回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-1: USB信号回路の回路図</em></div>

![図 6.8-2: USB信号のPCB設計](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-2: USB信号のPCB設計</em></div>

![図 6.8-3: USB信号部品配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-3: USB信号部品配置の参考図</em></div>

![図 6.8-4: USB信号配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-4: USB信号配線モデル</em></div>

### 6.9. SDIOインターフェースの配線 { #69-sdio-interface-routing }

SF32LB58xはSDIO1とSDIO2の2つのSDIOインターフェースを備えています。各SDIOインターフェースの全信号を分割せずにまとめて配線します。配線全長は ≤50 mm、グループ内の長さ差は ≤6 mmに制御します。SDIOクロック信号に3Dシールドを施し、DATA信号とCMD信号もシールドします。

![図 6.9-1: SDIO1インターフェース回路](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-1: SDIO1インターフェース回路</em></div>

![図 6.9-2: SDIO1のPCB配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-2: SDIO1のPCB配線モデル</em></div>

### 6.10. DSIインターフェースの配線 { #610-dsi-interface-routing }

AVDD18_DSIのデカップリングコンデンサーとDSI_REXTのキャリブレーション抵抗を、それぞれ対応するピンの近くに配置します。DSI信号は差動インピーダンスを100 Ωに制御した差動ペアとして配線し、クロックとデータの長さを整合させます。各ペア内の長さ差は ≤0.5 mm、ペア間の長さ差は ≤2 mmとします。各差動ペアに3Dシールドを設けます。

!!! warning "DSI差動ペア間の上限が資料間で一致しません"
    レイアウトガイドはペア間のスキューを ≤2 mm（ペア内は ≤0.5 mm）としています。一方、チェックリストのワークブックはDSIデータ差動ペアとクロック差動ペアの長さ差を200 mil（5.08 mm）以内としています。ペア間の上限が一致しません。ペア内の上限と区別し、レイアウト確定前に適用するペア間の上限をSiFliに確認してください。

![図 6.10-1: DSI信号回路](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-1: DSI信号回路</em></div>

![図 6.10-2: DSI信号のPCB配線](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-2: DSI信号のPCB配線</em></div>

### 6.11. DC-DC回路の配線 { #611-dc-dc-circuit-routing }

DC-DC電源インダクターとデカップリングコンデンサーをチップピンの近くに配置します。DC-DC回路のループインダクタンスを最小限に抑えるため、BUCK_LXの配線はできるだけ短く、幅広にします。DC-DC出力デカップリングコンデンサーのGNDピンにGNDビアを追加し、メインGNDプレーンに接続します。BUCK_FBの帰還配線は細くしすぎないでください。幅は0.25 mmより大きくします。電源インダクターの下には最上層の銅箔を設けず、隣接層を連続したリファレンスGNDとし、インダクター領域に他の配線を通さないでください。

![図 6.11-1: DC-DC主要部品回路](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.11-1: DC-DC主要部品回路</em></div>

![図 6.11-2: DC-DCのPCBレイアウト](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.11-2: DC-DCのPCBレイアウト</em></div>

### 6.12. 電源配線 { #612-power-supply-routing }

PVDD1とPVDD2は内蔵PMUモジュールの電源入力です。デカップリングコンデンサーを各ピンの近くに配置し、配線幅をできるだけ広くします。配線幅は ≥0.5 mmとしてください。PVSS1とPVSS2はPMUモジュールのGNDピンです。ビアを介してメインGNDに接続します。これらをフローティングにするとPMU全体の性能に影響するため、避けてください。

![図 6.12-1: DC-DC回路図](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.12-1: DC-DC回路図</em></div>

![図 6.12-2: DC-DCのPCB配線](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.12-2: DC-DCのPCB配線</em></div>

### 6.13. LDOおよびI/O電源入力の配線 { #613-ldo-and-io-power-input-routing }

すべてのLDO出力とI/O電源入力について、デカップリングコンデンサーを各ピンの近くに配置します。配線幅は入力電流要件を満たすようにし、電源レールのリップルを抑えてシステムの安定性を向上させるため、配線はできるだけ短く幅広にします。

![図 6.13-1: LDOおよびI/O電源入力配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.13-1: LDOおよびI/O電源入力配線の参考図</em></div>

### 6.14. その他のインターフェース配線 { #614-other-interface-routing }

GPADCピンの信号配線には完全な3Dシールドが必要です。バッテリー残量検出回路や温度検出回路など、他の干渉源から離してください。

![図 6.14-1: GPADC回路](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-1: GPADC回路</em></div>

32 kHz出力などのクロック入力／出力ピンの信号配線にも、同様に完全な3Dシールドが必要です。他の干渉源から離してください。

![図 6.14-2: 32 kHzクロック出力回路](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-2: 32 kHzクロック出力回路</em></div>

### 6.15. チップのGND配線 { #615-chip-ground-routing }

SF32LB58xチップ中央部の下にあるGNDネットを配線で完全に接続し、ブラインドビア／ベリードビアを介してメインGNDプレーンにつながる十分なGNDプレーンを確保する必要があります。

![図 6.15-1: チップ下の最上層GND信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-1: チップ下の最上層GND信号</em></div>

![図 6.15-2: チップ下の第 2 層GND信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-2: チップ下の第 2 層GND信号</em></div>

![図 6.15-3: チップ下の第 3 層GND信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-3: チップ下の第 3 層GND信号</em></div>

![図 6.15-4: チップ下の第 4 層GND信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-4: チップ下の第 4 層GND信号</em></div>

### 6.16. EMIとESD { #616-emi-esd }

シールド缶の外側では、最上層に長い配線を引かないでください。クロック、電源などノイズ源となる信号は内層に配線し、最上層には配線しないでください。ESD保護素子はコネクターピンの近くに配置し、信号分岐が生じないよう、信号が他の部品に進む前にESD保護素子を通過させます。ESD保護素子のGNDピンをビアでメインGNDに接続し、GNDパッドの配線を短く幅広にしてインピーダンスを抑え、ESD性能を高めます。

### 6.17. その他の注意事項 { #617-other-considerations }

USB充電ラインのテストポイントはTVSダイオードの前に配置します。バッテリーホルダーのTVSダイオードはプラットフォームとの接続部より前に配置し、信号がチップに達する前に必ずTVSを通るように配線します。TVSのGNDピン配線はできるだけ短くします。

!!! note "TVSの配置基準となる「プラットフォーム」は定義されていません"
    中国語原文は、バッテリーコネクターのTVSを「プラットフォームの前」に配置するよう求めていますが、「プラットフォーム」がどのノードまたは接続点を指すかは示されていません。意味を推測せず、配置基準をSiFliに確認してください。原文では別途、信号をチップに到達する前にTVSに通し、TVSのGND配線を短くするよう求めています。

![図 6.17-1: 電源TVS配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-1: 電源TVS配置の参考図</em></div>

![図 6.17-2: TVS配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-2: TVS配線の参考図</em></div>

BGAパッドのはんだ接合信頼性を保ち、ソルダーマスクがパッドにかからないようにするには、BGAパッド内のビアをボールの中心に配置し、中心からずらさないでください。製造歩留まりを高めるには、BGAボール接続の参考図を参照してください。

![図 6.17-3: BGAビア配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-3: BGAビア配置の参考図</em></div>

![図 6.17-4: BGAボール接続の参考図 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-4: BGAボール接続の参考図 1</em></div>

![図 6.17-5: BGAボール接続の参考図 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-5: BGAボール接続の参考図 2</em></div>
