---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB52x MCU の PCB レイアウト指針。フットプリント、積層、ファンアウト、クロック／RF／オーディオ／USB／SDIO 配線、DC-DC と電源配線、EMI/ESD などを解説します。"
tags:
    - ハードウェア
    - チップ
---

# SF32LB52x ハードウェア設計ガイド — PCB レイアウト指針 { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB52x ハードウェア設計ガイドの一部"
    このページでは第 6 節「PCB レイアウト指針」を扱います。[回路図設計指針](SF32LB52x_schematic_design.md)（全 3 ページの 1 ページ目）に戻るか、[PCB レイアウトチェックリスト](SF32LB52x_pcb_layout_checklist.md)に進むか、[設計レビュー用チェックリストと参考資料](SF32LB52x_review_and_reference.md)に移動してください。

## 6. PCB レイアウト指針 { #6-pcb-layout-guidelines }

第 5 節の回路図設計とあわせて、本章を PCB レイアウトのレビューに活用してください。最終配置を始める前に、回路図上でバリアント、電源ツリー、クロック部品、RF 回路用の領域、ディスプレイ／ストレージのピン、テストポイントへのアクセスを定義しておきます。

**設計目標**

回路図に基づいて製造可能な 4 層 PTH 基板を設計し、RF、水晶振動子、オーディオ、電源、USB、SDIO の配線で、インピーダンス、ノイズ、リターン電流の問題を防ぎます。

**PCB レビューフロー**

1. パッケージのフットプリントとペースト／ランドパターンを確認する。
2. PCB ベンダーと基板積層、配線幅／間隔、ドリル、インピーダンスのルールを確認する。
3. チップ、水晶振動子、RF 経路、DC/DC、充電器、ディスプレイ／ストレージコネクター、オーディオ部品を配置する。
4. 優先度の低い GPIO 配線を仕上げる前に、ファンアウトとノイズの影響を受けやすい信号配線をレビューする。
5. RF、水晶振動子、USB、SDIO、オーディオ、DC/DC、充電回路、電源レールのレビュー記録用スクリーンショットを保存する。

### 6.1. PCB フットプリント設計 { #61-pcb-footprint-design }

SF32LB52x の QFN68L パッケージは 7 mm x 7 mm x 0.85 mm、68 ピン、ピッチ 0.35 mm です。

パッケージ図の全高は標準値 0.85 mm、範囲 0.8–0.9 mm です。スタンドオフは標準値 0.02 mm、最大値 0.05 mm です。実装や筐体のクリアランスは、寸法概要だけでなく詳細図で確認してください。

![図 6.1-1: QFN68L パッケージ寸法](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-1: QFN68L パッケージ寸法</em></div>

![図 6.1-2: QFN68L パッケージ形状](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-2: QFN68L パッケージ形状</em></div>

![図 6.1-3: QFN68L の PCB ランドパターン例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.1-3: QFN68L の PCB ランドパターン例</em></div>

図6.1-3の周辺ランドは 0.2 mm x 0.55 mm、ピッチは 0.35 mm です。ソルダーレジスト開口は 0.3 mm x 0.65 mm、メタルマスク開口は 0.2 mm x 0.55 mm です。これらは参考寸法であり、フットプリントの確定前に実装工程の要件を確認してください。

パッケージ図の露出パッドは標準寸法 5.49 mm x 5.49 mm です。ファンアウト例では中央パッドを GND に接続しており、未接続でよい機械構造として扱わないでください。

### 6.2. PCB 積層 { #62-pcb-stack-up }

リファレンスデザインでは片面実装と両面実装のどちらにも対応します。部品を片面に配置するほか、コンデンサーなどの受動部品をチップの下にあたる裏面へ配置することもできます。4 層のスルーホールビア (PTH) 構成を推奨します。

![図 6.2-1: リファレンス積層構成](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.2-1: リファレンス積層構成</em></div>

図6.2-1は、めっきとソルダーレジストを含む板厚 0.8 mm ±10% の参考スタックアップで、計算上の総厚は 0.79553 mm です。実際の仕上がり厚さと誘電体構成は PCB メーカーに確認し、この例をすべての設計に共通する構成とみなさないでください。

<div align="center"><em>表 6.2-1：参考スタックアップの値</em></div>

<div align="center" markdown>

| 層位置 | 材料 | 厚さ（mil） | 厚さ（mm） | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| 上面ソルダーレジスト | ソルダーレジスト | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | 銅 + めっき | 1.81 | 0.045974 | — | — |
| L1–L2 誘電体 | 1080（66%）x3 プリプレグ | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | 銅 + めっき | 1.4 | 0.03556 | — | — |
| L2–L3 誘電体 | コア | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | 銅 + めっき | 1.4 | 0.03556 | — | — |
| L3–L4 誘電体 | 1080（66%）x3 プリプレグ | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | 銅 + めっき | 1.81 | 0.045974 | — | — |
| 下面ソルダーレジスト | ソルダーレジスト | 1 | 0.0254 | 3.5 | 0.8 |

</div>

プリプレグの行は銅箔面積 70% を前提としています。Dk と Df はソルダーレジストの Df 0.8 を含めて参考図の記載を再現したもので、検証済みの一般的な材料特性ではありません。インピーダンスや損失の計算には、メーカーの実際の材料データを確認してください。

### 6.3. PCB の一般設計ルール { #63-general-pcb-design-rules }

リファレンスデザインに示された PTH 基板の一般的な PCB 設計ルールに従ってください。

![図 6.3-1: PCB の一般設計ルール](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.3-1: PCB の一般設計ルール</em></div>

図6.3-1の配線幅ルールは最小値・推奨値が 0.1 mm、最大値が 2.54 mm です。配線・ビア・パッドのクリアランス 0.1 mm と、銅箔のクリアランス 0.127 mm（銅箔領域間は 0.15 mm）を区別し、基板端のクリアランスは 0.25 mm としています。これらは参考 CAD ルールです。製造上の制約とインピーダンス制御配線の要件は別途確認してください。

図6.3-1の追加ルールでは、ドリル間と部品本体間の間隔をそれぞれ 0.1 mm としています。一部の同一ネットの値はゼロですが、異なるネット間のクリアランスや基板端・銅箔のルールを免除するものではありません。

### 6.4. PCB 配線のファンアウト { #64-pcb-trace-fanout }

QFN パッケージのすべての信号をトップ層にファンアウトしてください。

![図 6.4-1: トップ層ファンアウト例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.4-1: トップ層ファンアウト例</em></div>

### 6.5. クロックインターフェースの配線 { #65-clock-interface-routing }

以下のクロック配線ルールは、両方の設計グループに適用されます。

- 水晶振動子はシールドケース内に配置し、PCB 端から 1 mm 超離してください。また、周波数ドリフトへの影響を避けるため、発熱部品（PA、充電器、PMU 回路）から可能な限り離し、理想的には 5 mm 超の間隔を確保してください。
- 水晶振動子のキープアウト領域は 0.25 mm を超える幅で確保し、金属や他の部品を置かないでください。
- 48 MHz 水晶振動子の配線はトップ層に設け、長さ 3～10 mm、幅 0.1 mm とし、周囲を GND でシールドしてください。VBAT/VCC、DC/DC、高速信号線から離し、水晶振動子の下のトップ層と隣接層には他の配線を通さないでください。
- 32.768 kHz 水晶振動子の配線はトップ層に設け、長さ ≤10 mm、幅 0.1 mm とし、並走する 32K_XI/32K_XO 間に ≥0.15 mm の間隔を取り、GND でシールドしてください。この水晶回路の直下では、トップ層と隣接層に他の配線を通さないでください。

![図 6.5-1: 水晶振動子の配置](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-1: 水晶振動子の配置</em></div>

![図 6.5-2: 48 MHz 水晶振動子回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-2: 48 MHz 水晶振動子回路図</em></div>

![図 6.5-3: 48 MHz 水晶振動子の配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-3: 48 MHz 水晶振動子の配線モデル</em></div>

![図 6.5-4: 48 MHz 水晶振動子の配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-4: 48 MHz 水晶振動子の配線例</em></div>

![図 6.5-5: 32.768 kHz 水晶振動子回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-5: 32.768 kHz 水晶振動子回路図</em></div>

![図 6.5-6: 32.768 kHz 水晶振動子の配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-6: 32.768 kHz 水晶振動子の配線モデル</em></div>

![図 6.5-7: 32.768 kHz 水晶振動子の配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.5-7: 32.768 kHz 水晶振動子の配線例</em></div>

図6.5-3と図6.5-6は、両方の水晶振動子について並走する XI/XO 間に ≥0.15 mm の間隔を示しています。図6.5-2は負荷容量 8.8 pF の 48 MHz 水晶振動子を使用し、外付け負荷コンデンサーは NF（未実装）です。図6.5-5は 32.768 kHz、7 pF の水晶振動子を PA22/PA23 に接続しており、これらのピンは PDM_CLK/PDM_DATA とも多重化されています。

!!! important "水晶振動子のグランド処理"
    電池駆動バリアント向けアプリケーションノート内で、水晶振動子周辺の銅箔に関する記述が一致していません。クロック回路の節は水晶振動子直下の L2 GND を除去するよう指示していますが、PCB 配線の節はトップ層と隣接層でのプレーン欠落や銅箔の切り欠きを禁止し、配線モデルでも L2 GND が連続しています。別の PCB レイアウトガイドも銅箔を切り欠かないよう指示しています。L2 の一律ルールを推測したり、層数だけで決めたりせず、リリース前に選択したスタックアップでの処理を SiFli に確認してください。水晶振動子のキープアウトと部品クリアランスは別途確認します。

### 6.6. RF インターフェースの配線 { #66-rf-interface-routing }

以下の RF 配線ルールは、両方の設計グループに適用されます。

- RF 整合回路はアンテナ側ではなく、チップ側の近くに配置してください。
- AVDD_BRF のフィルターコンデンサーはチップのピン近くに配置し、その GND ピンのビアをメイン GND に直接接続してください。
- RF 配線は可能な限りトップ層に通し、性能を損なうビアを避けてください。元資料は 10 mil を超える配線幅を推奨していますが、実際の積層で 50 Ω になることを確認してください。GND でシールドし、鋭角や直角の曲がりを避けます。
- RF 配線のインピーダンスを 50 Ω に制御し、配線の両側に GND シールドビアを密に配置してください。

![図 6.6-1: π 型整合回路と電源回路の回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-1: π 型整合回路と電源回路の回路図</em></div>

![図 6.6-2: π 型整合回路と電源回路の PCB レイアウト](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-2: π 型整合回路と電源回路の PCB レイアウト</em></div>

![図 6.6-3: RF 信号回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-3: RF 信号回路図</em></div>

![図 6.6-4: RF 信号の PCB 配線](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.6-4: RF 信号の PCB 配線</em></div>

RF の例は 15 pF/50 V の直列コンデンサー C0333 を実装し、C0318/C0319 は NF、AVDD_BRF のフィルターは 0.47 uF です。これらは実装例の値であり、すべてのアンテナに共通する整合回路ではありません。

### 6.7. オーディオインターフェースの配線 { #67-audio-interface-routing }

以下のオーディオ配線ルールは、両方の設計グループに適用されます。

- AVDD33_AUD、MIC_BIAS、AUD_VREF のフィルターコンデンサーは、それぞれ対応するピンの近くに配置し、GND 端子をメイン GND に確実に接続してください。
- ADCP アナログ入力の部品はチップのピン近くに配置し、配線を短くして周囲を GND でシールドし、強い干渉源から離してください。
- DACP/DACN アナログ出力の部品はチップのピン近くに配置してください。差動ペアとして短く配線し、寄生容量を 10 pF 未満に抑え、周囲を GND でシールドしてください。

![図 6.7-1: オーディオ電源フィルタリング回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-1: オーディオ電源フィルタリング回路図</em></div>

![図 6.7-2: オーディオ電源フィルタリングの PCB 配線例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-2: オーディオ電源フィルタリングの PCB 配線例</em></div>

![図 6.7-3: アナログオーディオ入力回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-3: アナログオーディオ入力回路図</em></div>

![図 6.7-4: アナログオーディオ入力の PCB 設計](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-4: アナログオーディオ入力の PCB 設計</em></div>

![図 6.7-5: アナログオーディオ出力回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-5: アナログオーディオ出力回路図</em></div>

![図 6.7-6: アナログオーディオ出力の PCB 設計](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.7-6: アナログオーディオ出力の PCB 設計</em></div>

図6.7-1の参考フィルターコンデンサーは、MIC_BIAS が 1 uF/6.3 V、AVDD33_AUD が 2.2 uF/10 V、AUD_VREF が 1 uF/6.3 V です。これらは図示された回路の値であり、実際の設計で必要な値は別途確認してください。DACP/DACN は差動配線に加え、強いノイズ源からも離してください。

元資料の回路図設計指針は、DAC 出力配線長を 2 cm 未満にも制限しています。

### 6.8. USB インターフェースの配線 { #68-usb-interface-routing }

USB DP (PA35) / DN (PA36) は、まず ESD 保護デバイスのピンを通してからチップへ配線してください。ESD 保護デバイスの GND はメイン GND に確実に接続します。差動インピーダンスを 90 Ω に制御し、ペア全体を GND でシールドしてください。

![図 6.8-1: USB 信号回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-1: USB 信号回路図</em></div>

![図 6.8-2: USB 信号の PCB 設計](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-2: USB 信号の PCB 設計</em></div>

![図 6.8-3: USB 信号部品の配置例](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-3: USB 信号部品の配置例</em></div>

![図 6.8-4: USB 信号の配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.8-4: USB 信号の配線モデル</em></div>

図6.8-3は保護デバイスのパッドを通る配線と保護を迂回する分岐を対比しています。保護接続を通らずにチップへ達する分岐を設けないでください。

### 6.9. SDIO インターフェースの配線 { #69-sdio-interface-routing }

SDIO 信号はグループとしてまとめて配線し、全長を ≤50 mm、グループ内の長さ差を ≤6 mm にしてください。クロック信号は周囲を GND でシールドし、DATA 信号と CMD 信号もシールドしてください。

![図 6.9-1: SDIO インターフェース回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-1: SDIO インターフェース回路図</em></div>

![図 6.9-2: SDIO の PCB 配線モデル](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.9-2: SDIO の PCB 配線モデル</em></div>

図6.9-2は CMD 配線と隣接する GND シールドの間に ≥0.15 mm の間隔も示しています。

SDIO 回路図では PA11 が MPI2_VDD_EN/SD_VDD_EN と表記されています。優先度の高い OpenSiFli のアプリケーションノートと回路設計ガイドは、ブートストレージの電源スイッチに PA21 を指定しているため、資料に基づく設計基準には PA21 を使用します。チェックリストのワークブックにある電池駆動版の外付け Flash 向け PA11 は、別の制御機能かどうかが明記されていません。確認せずに PA11 へ置き換えず、対象ネットとバリアントを SiFli に確認してください。詳しくは[ストレージと製造](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control)を参照してください。

### 6.10. DC/DC 回路の配線 { #610-dcdc-circuit-routing }

パワーインダクターとフィルターコンデンサーはチップのピン近くに配置してください。BUCK_LX 配線は短く太くし、BUCK_FB のフィードバック配線幅は 0.25 mm を超える必要があります。DC/DC 出力フィルターコンデンサーの GND ピンは、複数のビアでメイン GND プレーンに接続してください。インダクター周辺のトップ層には銅箔を敷かず、隣接層は連続したリファレンス GND としてください。

![図 6.10-1: DC/DC 主要部品の回路図](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-1: DC/DC 主要部品の回路図</em></div>

![図 6.10-2: DC/DC 主要部品の PCB レイアウト](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.10-2: DC/DC 主要部品の PCB レイアウト</em></div>

図6.10-1は 4.7 uH のインダクターと 4.7 uF/10 V の出力コンデンサーを使用しています。PMU_BUCK_VSW と PMU_BUCK_VOUT はスイッチングノードと出力／フィードバックノードで、元資料のピン表にある BUCK_LX と BUCK_FB に対応します。インダクター領域に他の配線を通さないでください。

### 6.11. 電源配線 { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (バッテリー駆動)"

    VCC はチップ内蔵 PMU モジュールの入力ピンです。コンデンサーをピン近くに配置し、配線幅を 0.4 mm 以上にしてください。VDD_VOUT1、VDD_VOUT2、VDD_RET、VDD_RTC、VDD18_VOUT、VDD33_VOUT1、VDD33_VOUT2、AVDD33_AUD、AVDD_BRF の各フィルターコンデンサーも対応するピンの近くに配置し、必要な入力電流に応じて配線幅を決めてください。

    ![図 6.11-1: VCC 電源配線 (回路図)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>図 6.11-1: VCC 電源配線 (回路図)</em></div>

    ![図 6.11-2: VCC 電源配線 (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>図 6.11-2: VCC 電源配線 (PCB)</em></div>

    **充電回路の配線**

    VBUS と VBAT はチップ内蔵充電モジュールの入出力ピンです。各フィルターコンデンサーをピン近くに配置してください。充電ループには比較的大きな電流が流れるため、配線幅を 16 mil（約 0.41 mm）以上とし、ノイズに敏感な信号と並走させないでください。充電経路がノイズに敏感な回路ブロックと配線を共有しないよう、スター配線にしてください。アプリケーションノートでは、この最小幅を約 0.4 mm と丸めて記載しています。

    ![図 6.11-3: VBUS・VBAT 電源配線 (回路図)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>図 6.11-3: VBUS・VBAT 電源配線 (回路図)</em></div>

    ![図 6.11-4: VBUS・VBAT 電源配線 (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>図 6.11-4: VBUS・VBAT 電源配線 (PCB)</em></div>

    !!! note "充電回路の参考図"
        図6.11-3では VBUS に 10 uF/10 V、VBAT に 4.7 uF/10 V を使用しています。図中の VBUS 範囲は 4.3–5.5 V、《Electrical Specification-A3》では 4.5–5.5 V、電池駆動バリアントのアプリケーションノートでは内蔵充電器の範囲を 4.6–5.5 V としています。同ノートは、最大充電電流時に VBUS ピンを 4.6 V 以上に保つよう求めています。図は配置例であり、4.3 V を検証済みの最低動作電圧として示すものではありません。第5.2節の資料間の相違に関する注記も確認してください。

=== "52B/D/E/G/J (外部レギュレーター給電)"

    PVDD はチップ内蔵 PMU モジュールの入力ピンです。コンデンサーをピン近くに配置し、配線幅を 0.4 mm 以上にしてください。AVDD33、VDDIOA、VDD_SIP、AVDD33_AUD、AVDD_BRF の各フィルターコンデンサーも対応するピンの近くに配置します。電源リップルを抑えてシステムの安定性を高めるため、必要な入力電流に合わせて配線幅を設定し、可能な限り短く太く配線してください。

    ![図 6.11-5: PVDD 電源配線](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>図 6.11-5: PVDD 電源配線</em></div>

    !!! info "該当なし"
        このバリアントには充電管理回路がないため、充電回路の配線は不要です。

### 6.12. その他のインターフェース配線 { #612-other-interface-routing }

GPADC 入力配線には全体にわたって GND シールドを設け、バッテリー残量検出回路や温度検出回路など、干渉を生じる可能性のある他の回路から離してください。

### 6.13. EMI と ESD { #613-emi-esd }

以下の EMI および ESD 対策は、両方の設計グループに適用されます。

- シールドケース外で干渉源となる長いクロック・電源配線はトップ層に設けず、内層に通してください。
- ESD 保護デバイスをコネクターピンの近くに配置し、信号が他の部品に達する前に保護デバイスを通るように配線してください。
- ESD 保護デバイスの GND ピンはビアを介してメイン GND に接続してください。GND パッドの配線を短く太くしてインピーダンスを下げ、ESD 性能を高めます。

### 6.14. その他の注意事項 { #614-other-considerations }

USB 充電ラインのテストポイントはコネクター側、TVS の保護接続点より手前に配置してください。バッテリー側の TVS は基板入口に置き、MCU や他の負荷への分岐より前に接続します。配線は TVS の接続点を経由してからチップへ引き込みます。TVS 自体は GND への並列保護素子であり、配線に直列接続するものではありません。GND 接続を短くしてください。

![図 6.14-1: 電源 TVS の配置例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-1: 電源 TVS の配置例</em></div>

![図 6.14-2: TVS 配線例](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>図 6.14-2: TVS 配線例</em></div>
