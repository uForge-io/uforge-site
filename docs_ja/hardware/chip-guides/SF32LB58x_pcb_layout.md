---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB58x MCU の PCB レイアウト指針。パッケージフットプリント、基板積層、ファンアウト、クロック、RF、オーディオ、USB、SDIO、DSI、電源の配線を扱います。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB58x ハードウェア設計ガイド — PCB レイアウト指針 { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB58x ハードウェア設計ガイドの一部"
    このページでは、第 6 章「PCB レイアウト指針」を扱います。[回路図設計指針](SF32LB58x_schematic_design.md)に戻るか、[PCB レイアウトチェックリスト](SF32LB58x_pcb_layout_checklist.md)に進むか、[設計レビュー用チェックリストと参考資料](SF32LB58x_review_and_reference.md)まで先に進んでください。

## 6. PCB レイアウト指針 { #6-pcb-layout-guidelines }

### 6.1. パッケージフットプリントの設計 { #61-package-footprint-design }

SF32LB58x シリーズのパッケージは BGA256 で、外形は 8.5 mm × 6.5 mm × 0.94 mm、ボールピッチは 0.4 mm、ボール径は公称 0.25 mm です。パッケージ認定の全データについては、公式データシートを参照してください。

!!! warning "資料間でパッケージ高さが一致しません"
    SiFli のガイド本文ではパッケージ高さを 0.94 mm としています。一方、BGA256 パッケージ図では寸法 A が公称 0.91 mm、範囲 0.84–1.04 mm と記載されています。これらの値は一致しません。高さが機械的クリアランスや筐体との適合に影響する場合は、どちらかを独断で採用せず、SiFli に確認したうえで確定したパッケージ仕様を使用してください。

![図 6.1-1：BGA256 パッケージ寸法](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-1：BGA256 パッケージ寸法</em></div>

![図 6.1-2：パッケージフットプリント形状](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-2：パッケージフットプリント形状</em></div>

![図 6.1-3：PCB ランドパターンの参考図](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-3：PCB ランドパターンの参考図</em></div>

![図 6.1-4：パッケージボールマップ](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-4：パッケージボールマップ</em></div>

![図 6.1-5：パッケージ基板のボール情報](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-5：パッケージ基板のボール情報</em></div>

### 6.2. PCB の積層構成 { #62-pcb-stack-up }

SF32LB58x シリーズは、片面実装または両面実装に対応します。PCB は HDI 基板である必要があり、PTH は使用できません。6HDI-2 の積層構成を推奨します。図に示す参考構成の完成基板厚は 0.8 mm ±10%（公称約 32 mil）です。

![図 6.2-1：積層構成の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.2-1：積層構成の参考図</em></div>

### 6.3. 一般的な PCB 設計ルール { #63-general-pcb-design-rules }

寸法（mm）を含む一般的な PCB 設計ルールの図については、公式データシートを参照してください。図に示す参考ルールは、配線幅が最小・推奨ともに 0.075 mm、最大 2 mm、配線・ビア・パッド・SMD・文字・銅箔間の最小クリアランスが 0.075 mm、基板端までのクリアランスが 0.25 mm、ドリル間および部品本体間の間隔が 0.1 mm です。最終的なルールは基板メーカーの製造能力に合わせて確認してください。

![図 6.3-1：一般的な PCB 設計ルール](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-1：一般的な PCB 設計ルール</em></div>

#### 6.3.1. ブラインドビアの設計 { #631-blind-via-design }

寸法（mm）を含むブラインドビア（1–2 層および 1–3 層）の設計図については、公式データシートを参照してください。図に示すめっき済みブラインドビアの径は 0.23 mm、ドリル径は 0.10 mm です。

![図 6.3-2：1–2 層ブラインドビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-2：1–2 層ブラインドビアの設計</em></div>

![図 6.3-3：1–3 層ブラインドビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-3：1–3 層ブラインドビアの設計</em></div>

#### 6.3.2. ベリードビアの設計 { #632-buried-via-design }

寸法（mm）を含むベリードビア（2–5 層）の設計図については、公式データシートを参照してください。図に示すめっき済みベリードビアの径は 0.40 mm、ドリル径は 0.20 mm です。

![図 6.3-4：2–5 層ベリードビアの設計](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-4：2–5 層ベリードビアの設計</em></div>

### 6.4. 配線ファンアウト { #64-trace-fanout }

BGA ボールの最初の 2 列は最上層で引き出し、残りのボールはビアを介して内層に引き出します。

![図 6.4-1：最上層のファンアウト参考図](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.4-1：最上層のファンアウト参考図</em></div>

![図 6.4-2：内層のファンアウト参考図](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.4-2：内層のファンアウト参考図</em></div>

### 6.5. クロックインターフェースの配線 { #65-clock-interface-routing }

水晶振動子はシールド缶の内側に配置し、PCB の端から 1 mm より離し、周波数オフセットへの影響を避けるため、PA、充電回路、PMU 回路など発熱部品からできるだけ離します。理想的には 5 mm 以上離してください。水晶振動子のキープアウト領域は、他の金属または部品から 0.25 mm を超える距離を確保します。

48 MHz 水晶振動子は最上層に配線し、配線長を 3～10 mm、配線幅を 0.075 mm として、3D シールドを設けます。VBAT、DC/DC、高速信号線から離して配線します。48 MHz 水晶振動子領域の最上層と隣接層には、他の配線を通さないでください。

32.768 kHz 水晶振動子は最上層に配線し、配線長を ≤10 mm、配線幅を 0.075 mm とします。32K_XI と 32K_XO の平行配線間隔を ≥0.15 mm に保ち、3D シールドを設けます。水晶振動子領域の最上層とその下の隣接層には、他の配線を通さないでください。

!!! warning "水晶振動子のキープアウト層を SiFli に確認してください"
    レイアウトガイドは各水晶振動子領域の最上層とその下の隣接層をキープアウトとしています。チェックリストのワークブックは、4 層基板では第 1、第 2、第 3 層を銅箔キープアウトとしています。第 3 層を含めるかどうかで資料間に差があります。第 3 層の最終要件を推測せず、SiFli に確認してください。

![図 6.5-1：水晶振動子の配置](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-1：水晶振動子の配置</em></div>

![図 6.5-2：48 MHz 水晶振動子の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-2：48 MHz 水晶振動子の回路図</em></div>

![図 6.5-3：48 MHz 水晶振動子配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-3：48 MHz 水晶振動子配線モデル</em></div>

![図 6.5-4：48 MHz 水晶振動子配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-4：48 MHz 水晶振動子配線の参考図</em></div>

![図 6.5-5：32.768 kHz 水晶振動子の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-5：32.768 kHz 水晶振動子の回路図</em></div>

![図 6.5-6：32.768 kHz 水晶振動子配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-6：32.768 kHz 水晶振動子配線モデル</em></div>

![図 6.5-7：32.768 kHz 水晶振動子配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-7：32.768 kHz 水晶振動子配線の参考図</em></div>

### 6.6. RF インターフェースの配線 { #66-rf-interface-routing }

RF マッチング回路はアンテナ側ではなく、できるだけチップの近くに配置します。AVDD_BRF の RF 電源デカップリングコンデンサーもチップピンの近くに配置し、その GND ピンのビアをメイン GND プレーンに直接接続します。

RF 性能を損なうビアを避けるため、可能な限り RF 配線を最上層に引きます。配線幅はできれば 10 mil を超えるようにし、3D シールドを設け、鋭角や直角を避けます。RF 配線の両側にシールド用 GND ビアを追加し、インピーダンスを 50 Ω に制御します。DC-DC、VBAT、高速デジタル信号（水晶振動子、高周波クロック、I2C/SPI/SDIO/I2S/UART の各インターフェース信号など）を RF 配線領域から除外します。AVSS_RRF、AVSS_TRF、AVSS_TRF2、AVSS_VCO、AVSS_BB は RF 回路の GND ピンです。十分に接地し、パッド上にブラインドビアを配置してメイン GND に接続します。

![図 6.6-1：π 型ネットワークと電源回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-1：π 型ネットワークと電源回路の回路図</em></div>

![図 6.6-2：π 型ネットワークと電源回路の PCB レイアウト](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-2：π 型ネットワークと電源回路の PCB レイアウト</em></div>

![図 6.6-3：RF 信号回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-3：RF 信号回路の回路図</em></div>

![図 6.6-4：RF 信号の PCB 配線](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-4：RF 信号の PCB 配線</em></div>

![図 6.6-5：RF 回路 GND 信号の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-5：RF 回路 GND 信号の回路図</em></div>

![図 6.6-6：RF 回路 GND 信号の PCB 配線](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-6：RF 回路 GND 信号の PCB 配線</em></div>

### 6.7. オーディオインターフェースの配線 { #67-audio-interface-routing }

AVDD33_AUD オーディオ電源のデカップリングコンデンサーをピンの近くに配置し、その GND ピンをメイン GND に十分に接続します。MIC_BIAS のデカップリングコンデンサーもピンの近くに配置し、同様に十分に接地します。AUD_VREF のデカップリングコンデンサーもピンの近くに配置します。

AU_ADC1P/AU_ADC1N と AU_ADC2P/AU_ADC2N は 2 組のアナログ入力ペアです。関連部品をピンの近くに配置し、各 P/N ペアをできるだけ短い差動配線にします。差動ペアに 3D シールドを施し、強い干渉源となる他の信号をこれらの配線から遠ざけます。

AU_DAC1P/AU_DAC1N と AU_DAC2P/AU_DAC2N は 2 組のアナログ出力ペアです。関連部品をピンの近くに配置し、各 P/N ペアをできるだけ短く、<2 mm の差動配線にします。配線の寄生容量を <10 pF とし、差動配線幅を 0.075 mm にします。差動ペアに 3D シールドを施し、強い干渉源となる他の信号をこれらの配線から遠ざけます。

!!! warning "DAC 配線長の上限が資料間で一致しません"
    レイアウトガイドは DAC 配線長を 2 mm 未満としていますが、PCB レイアウトチェックリストのワークブックは 2 cm 未満（20 mm）としています。上限は 10 倍異なります。SiFli の確認なしに一方の値を選択または置き換えないでください。

![図 6.7-1：オーディオ電源の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-1：オーディオ電源の回路図</em></div>

![図 6.7-2：オーディオ電源フィルターの PCB 設計](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-2：オーディオ電源フィルターの PCB 設計</em></div>

![図 6.7-3：アナログオーディオ入力の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-3：アナログオーディオ入力の回路図</em></div>

![図 6.7-4：アナログオーディオ入力の PCB 設計](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-4：アナログオーディオ入力の PCB 設計</em></div>

![図 6.7-5：アナログオーディオ出力の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-5：アナログオーディオ出力の回路図</em></div>

![図 6.7-6：アナログオーディオ出力の PCB 設計](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-6：アナログオーディオ出力の PCB 設計</em></div>

### 6.8. USB インターフェースの配線 { #68-usb-interface-routing }

AVDD33_USB のデカップリングコンデンサーと USB2_REXT のキャリブレーション抵抗を、それぞれのピンの近くに配置します。USB 配線はチップに到達する前に ESD 保護部品のピンを通過させ、その GND ピンをメイン GND に十分に接続します。USB DP／DN は差動インピーダンス 90 Ω に制御した差動ペアとして配線し、3D シールドを設けます。

![図 6.8-1：USB 信号回路の回路図](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-1：USB 信号回路の回路図</em></div>

![図 6.8-2：USB 信号の PCB 設計](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-2：USB 信号の PCB 設計</em></div>

![図 6.8-3：USB 信号部品配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-3：USB 信号部品配置の参考図</em></div>

![図 6.8-4：USB 信号配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-4：USB 信号配線モデル</em></div>

### 6.9. SDIO インターフェースの配線 { #69-sdio-interface-routing }

SF32LB58x は SDIO1 と SDIO2 の 2 つの SDIO インターフェースを備えています。各 SDIO インターフェースの全信号を分割せずにまとめて配線します。配線全長は ≤50 mm、グループ内の長さ差は ≤6 mm に制御します。SDIO クロック信号に 3D シールドを施し、DATA 信号と CMD 信号もシールドします。

![図 6.9-1：SDIO1 インターフェース回路](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-1：SDIO1 インターフェース回路</em></div>

![図 6.9-2：SDIO1 の PCB 配線モデル](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-2：SDIO1 の PCB 配線モデル</em></div>

### 6.10. DSI インターフェースの配線 { #610-dsi-interface-routing }

AVDD18_DSI のデカップリングコンデンサーと DSI_REXT のキャリブレーション抵抗を、それぞれ対応するピンの近くに配置します。DSI 信号は差動インピーダンスを 100 Ω に制御した差動ペアとして配線し、クロックとデータの長さを整合させます。各ペア内の長さ差は ≤0.5 mm、ペア間の長さ差は ≤2 mm とします。各差動ペアに 3D シールドを設けます。

!!! warning "DSI 差動ペア間の上限が資料間で一致しません"
    レイアウトガイドはペア間のスキューを ≤2 mm（ペア内は ≤0.5 mm）としています。一方、チェックリストのワークブックは DSI データ差動ペアとクロック差動ペアの長さ差を 200 mil（5.08 mm）以内としています。ペア間の上限が一致しません。ペア内の上限と区別し、レイアウト確定前に適用するペア間の上限を SiFli に確認してください。

![図 6.10-1：DSI 信号回路](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-1：DSI 信号回路</em></div>

![図 6.10-2：DSI 信号の PCB 配線](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-2：DSI 信号の PCB 配線</em></div>

### 6.11. DC-DC 回路の配線 { #611-dc-dc-circuit-routing }

DC-DC 電源インダクターとデカップリングコンデンサーをチップピンの近くに配置します。DC-DC 回路のループインダクタンスを最小限に抑えるため、BUCK_LX の配線はできるだけ短く、幅広にします。DC-DC 出力デカップリングコンデンサーの GND ピンに GND ビアを追加し、メイン GND プレーンに接続します。BUCK_FB の帰還配線は細くしすぎないでください。幅は 0.25 mm より大きくします。電源インダクターの下には最上層の銅箔を設けず、隣接層を連続したリファレンス GND とし、インダクター領域に他の配線を通さないでください。

![図 6.11-1：DC-DC 主要部品回路](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.11-1：DC-DC 主要部品回路</em></div>

![図 6.11-2：DC-DC の PCB レイアウト](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.11-2：DC-DC の PCB レイアウト</em></div>

### 6.12. 電源配線 { #612-power-supply-routing }

PVDD1 と PVDD2 は内蔵 PMU モジュールの電源入力です。デカップリングコンデンサーを各ピンの近くに配置し、配線幅をできるだけ広くします。配線幅は ≥0.5 mm としてください。PVSS1 と PVSS2 は PMU モジュールの GND ピンです。ビアを介してメイン GND に接続します。これらをフローティングにすると PMU 全体の性能に影響するため、避けてください。

![図 6.12-1：DC-DC 回路図](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.12-1：DC-DC 回路図</em></div>

![図 6.12-2：DC-DC の PCB 配線](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.12-2：DC-DC の PCB 配線</em></div>

### 6.13. LDO および I/O 電源入力の配線 { #613-ldo-and-io-power-input-routing }

すべての LDO 出力と I/O 電源入力について、デカップリングコンデンサーを各ピンの近くに配置します。配線幅は入力電流要件を満たすようにし、電源レールのリップルを抑えてシステムの安定性を向上させるため、配線はできるだけ短く幅広にします。

![図 6.13-1：LDO および I/O 電源入力配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.13-1：LDO および I/O 電源入力配線の参考図</em></div>

### 6.14. その他のインターフェース配線 { #614-other-interface-routing }

GPADC ピンの信号配線には完全な 3D シールドが必要です。バッテリー残量検出回路や温度検出回路など、他の干渉源から離してください。

![図 6.14-1：GPADC 回路](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-1：GPADC 回路</em></div>

32 kHz 出力などのクロック入力／出力ピンの信号配線にも、同様に完全な 3D シールドが必要です。他の干渉源から離してください。

![図 6.14-2：32 kHz クロック出力回路](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-2：32 kHz クロック出力回路</em></div>

### 6.15. チップの GND 配線 { #615-chip-ground-routing }

SF32LB58x チップ中央部の下にある GND ネットを配線で完全に接続し、ブラインドビア／ベリードビアを介してメイン GND プレーンにつながる十分な GND プレーンを確保します。

![図 6.15-1：チップ下の最上層 GND 信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-1：チップ下の最上層 GND 信号</em></div>

![図 6.15-2：チップ下の第 2 層 GND 信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-2：チップ下の第 2 層 GND 信号</em></div>

![図 6.15-3：チップ下の第 3 層 GND 信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-3：チップ下の第 3 層 GND 信号</em></div>

![図 6.15-4：チップ下の第 4 層 GND 信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.15-4：チップ下の第 4 層 GND 信号</em></div>

### 6.16. EMI と ESD { #616-emi-esd }

シールド缶の外側では、最上層に長い配線を引かないでください。クロック、電源などノイズ源となる信号は内層に配線し、最上層には配線しないでください。ESD 保護素子はコネクターピンの近くに配置し、信号分岐が生じないよう、信号が他の部品に進む前に ESD 保護素子を通過させます。ESD 保護素子の GND ピンをビアでメイン GND に接続し、GND パッドの配線を短く幅広にしてインピーダンスを抑え、ESD 性能を高めます。

### 6.17. その他の注意事項 { #617-other-considerations }

USB 充電ラインのテストポイントは TVS ダイオードの前に配置します。バッテリーホルダーの TVS ダイオードはプラットフォームとの接続部より前に配置し、信号がチップに達する前に必ず TVS を通るように配線します。TVS の GND ピン配線はできるだけ短くします。

!!! note "TVS の配置基準となる「プラットフォーム」は定義されていません"
    中国語原文は、バッテリーコネクターの TVS を「プラットフォームの前」に配置するよう求めていますが、「プラットフォーム」がどのノードまたは接続点を指すかは示されていません。意味を推測せず、配置基準を SiFli に確認してください。原文では別途、信号をチップに到達する前に TVS に通し、TVS の GND 配線を短くするよう求めています。

![図 6.17-1：電源 TVS 配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-1：電源 TVS 配置の参考図</em></div>

![図 6.17-2：TVS 配線の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-2：TVS 配線の参考図</em></div>

BGA パッドのはんだ接合信頼性を保ち、ソルダーマスクがパッドにかからないようにするには、BGA パッド内のビアをボールの中心に配置し、中心からずらさないでください。製造歩留まりを高めるには、BGA ボール接続の参考図を参照してください。

![図 6.17-3：BGA ビア配置の参考図](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-3：BGA ビア配置の参考図</em></div>

![図 6.17-4：BGA ボール接続の参考図 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-4：BGA ボール接続の参考図 1</em></div>

![図 6.17-5：BGA ボール接続の参考図 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.17-5：BGA ボール接続の参考図 2</em></div>
