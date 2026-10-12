---
icon: lucide/chart-no-axes-column
title: "GPADCでサンプリングする"
description: "SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x、SF32LB58xで汎用ADC（GPADC）を使用する方法を説明します。電気的制限、パッド割り当て、デバイスアクセス、キャリブレーションを扱います。"
tags: [開発, SiFli-SDK, アプリケーションノート, ADC]
---

# GPADCでサンプリングする { #sample-with-gpadc }

この記事では、SF32LB52x、SF32LB55x、SF32LB56x、SF32LB57x、SF32LB58xのADCガイドをまとめています。ソフトウェアの基本手順は共通ですが、入力制限、パッド割り当て、キャリブレーション電圧はファミリーごとに異なります。ハードウェアやファームウェアを設定する前に、対象ファミリーの表を確認してください。

GPADCは、センサーやバッテリー電圧などを測定するためのSiFliの汎用ADCです。SF32LB52x、SF32LB56x、SF32LB57x、SF32LB58xのオーディオADC、およびSF32LB55xとSF32LB58xのシグマデルタADCとは別のADCです。この記事の対象はGPADCのみです。これらのADCを使用する場合は、対象ファミリーのオーディオまたはシグマデルタのドキュメントを参照してください。

## ADCの対象範囲とチャンネル構成 { #adc-scope-and-channel-model }

SF32LB52x、SF32LB55x、SF32LB56x、SF32LB58xのSDKアプリケーションノートでは、センサー出力やバッテリー電圧の測定などのアナログ入力に、`GPADC_CH0`から`GPADC_CH7`までの8チャンネルを使用します。SF32LB57xのSDK ADCチャンネル表では、12チャンネルが定義されています。`PA28`～`PA38`が`GPADC_CH0`～`GPADC_CH10`に対応し、バッテリー検出用は`GPADC_CH11`（SDKのチャンネル表では`BAT`）です。SF32LB57xのハードウェア設計ガイドでは、電源バリエーションに応じて対応するパッケージ信号を`VBAT`または`VBATS`と表記しています。適切な電圧値を得るには、使用チャンネル、入力回路、対象デバイス向けのソフトウェアキャリブレーションを考慮してください。

SF32LB52xの`GPADC_CH7`（`BAT`）は専用のバッテリー検出チャンネルです。SDKの例では、このチャンネルがチップ内部の分圧器を介してVBATに接続されており、測定結果からバッテリー電圧を算出する際にSDKの`vbat_factor`を適用します。一方、SF32LB56xの`GPADC_CH7`は外部PAD `PB32`、SF32LB58xでは`PB39`に割り当てられています。SF32LB57xのバッテリーチャンネルは`GPADC_CH11`です。電源バリエーションに応じた`VBAT`または`VBATS`信号と、そのバッテリー領域の入力制限を使用してください。基板で特定チャンネルがバッテリー分圧回路に接続されているからといって、チップ専用のバッテリーチャンネルとは限りません。

## ADCの特性と入力回路 { #adc-characteristics-and-input-network }

<div align="center"><em>表: SF32ファミリー別の通常GPADC入力特性</em></div>

<div align="center" markdown>

| ファミリー | GPADCチャンネル数 | 分解能 | 代表精度 | 通常GPADC入力の最大電圧 |
|:-------|:-------------------|:-------|:-----------|:---------------------------|
| SF32LB55x | 8 | 10 bit | 3～4 mV | 1.1 V（X1）、3.3 V（X3） |
| SF32LB52x | 8 | 12 bit | 1～2 mV | 3.3 V |
| SF32LB56x／58x | 8 | 12 bit | 1～2 mV | 3.3 V |
| SF32LB57x | 12 | 12 bit | 1～2 mV | 3.3 V |

</div>

上表に示す最大入力電圧は通常のGPADC入力に適用されます。専用バッテリー検出チャンネルには固有の接続方法と制限があります。SF32LB55xの例では、1 MΩ／220 kΩの分圧器とRC整定時間157 msを使用します。SF32LB56xガイドの集約表では、SF32LB52x、SF32LB56x、SF32LB58xに対して470 kΩ／1000 kΩと200 msの整定時間が示されています。この推奨値はSF32LB57xには適用されません。57xでは、抵抗値や整定時間を他のファミリーから流用せず、対象品番の資料でバッテリー検出経路と制限を確認してください。これらの推奨値は外部分圧回路向けです。特にSF32LB52xの専用`GPADC_CH7`バッテリー経路にはチップ内部の分圧器があるため、対象ボードの設計で必要とされない限り、外部分圧器を追加しないでください。分圧抵抗の許容差は測定精度に影響するため、設計上必要な場合は、外部分圧回路を量産ラインで個別にキャリブレーションしてください。

<div align="center"><em>表: SF32ファミリー別のバッテリー電圧検出経路</em></div>

<div align="center" markdown>

| ファミリー | バッテリー検出経路 | 設計上の注意 |
|:-------|:-------------------|:-------------|
| SF32LB55x | 選択したGPADC入力に外部分圧器を接続します。参考回路では`PB10`／`GPADC_CH1`を使用します。 | 分圧出力を選択したX1／X3入力上限以下に保ちます。 |
| SF32LB52x | 専用の`GPADC_CH7`／`BAT`を使用します。SDKの例では、VBATがチップ内部の分圧器を介してこのチャンネルに接続されています。 | 専用チャンネルの測定値をバッテリー電圧に換算する際は、SDKの`vbat_factor`を使用します。 |
| SF32LB56x／58x | 基板で選択されたGPADC PADに外部分圧器を接続します。SDKの参考マップでは、`GPADC_CH7`はそれぞれ`PB32`／`PB39`に対応します。 | 対象ボードの回路図で実際のバッテリー分圧経路を確認してください。これらは通常のGPADC PADであり、チップ専用のバッテリーチャンネルではありません。 |
| SF32LB57x | 専用の`GPADC_CH11`を使用します。SDKのチャンネル表では`BAT`、ハードウェアガイドでは電源バリエーションに応じて`VBAT`または`VBATS`と表記されます。 | 部品ごとのバッテリーチャンネル測定上限を確認してください。3.3 V電源バリエーションの`VBATS`はガイド指定のGPADC測定範囲0～4.5 Vに従い、4.7 Vのピン定格を流用しないでください。 |

</div>

SF32LB55xの外付けバッテリー測定経路について、OpenSiFliのADC FAQでは許容差1%の抵抗を使った1 MΩ／220 kΩの分圧回路を示しています。抵抗値を大きくすると分圧回路に常時流れる漏れ電流を抑えられます。許容差を1%に抑えることで分圧比の誤差も小さくなり、測定精度の向上に役立ちます。分圧出力はADCの測定点であり、バッテリー電圧そのものではありません。この回路を応用する場合は、対象回路図と電気的制限を確認してください。

![SF32LB56x SDKガイドのVBAT抵抗分圧回路](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>図: SF32LB56x SDKガイドに示されたVBAT抵抗分圧回路とADC測定点。</em></div>

![SF32LB55xの1 MΩ／220 kΩ分圧電圧の参考値](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>図: OpenSiFliのADC FAQに記載されたSF32LB55x分圧出力の参考値。</em></div>

<div align="center"><em>表: SF32LB55xの1 MΩ／220 kΩ分圧回路における出力電圧の参考値</em></div>

<div align="center" markdown>

| バッテリー入力電圧 | `PB10_BAT_DET_ADC`出力電圧 |
|:-------------------|:----------------------------------|
| 3.0 V | 0.540983607 V |
| 3.3 V | 0.595081967 V |
| 3.6 V | 0.649180328 V |
| 4.0 V | 0.721311475 V |
| 4.2 V | 0.757377049 V |
| 5.0 V | 0.901639344 V |

</div>

SF32LB55xの参考回路では、VBATからR125（1 MΩ）を介して`PB10_BAT_DET_ADC`に接続します。このノードからGNDへ、R126（220 kΩ）とC118（0.1 µF）が並列に接続されています。これらは参考値として扱い、対象回路図と電気的制限を確認してください。

![SF32LB55xの外付けバッテリー電圧分圧回路](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>図: SF32LB55xの外付けバッテリー電圧サンプリング経路。</em></div>

## アナログ電源と基準電圧 { #analog-supply-and-reference }

アナログ電源と基準電圧ピンの構成はファミリーによって異なります。すべてのGPADCが同じVREFピン構成とは限らないため、対象デバイスの回路図に従ってください。

<div align="center"><em>表: SF32ファミリー別のGPADC電源および基準電圧接続</em></div>

<div align="center" markdown>

| ファミリー | 電源および基準電圧の接続 |
|:-------|:--------------------------|
| SF32LB52x／56x | `AVDD33_ANA`に安定した3.3 Vを供給します。参考回路では`GPADC_VREF`をGNDにデカップリングします。このピンは電源入力ではありません。 |
| SF32LB55x | 参考回路には`AVDD33_ANA`と`AVSS33_ANA`が示されています。接続とデカップリングは対象の回路図に従ってください。 |
| SF32LB57x | `AVDD33_ANA`に3.3 Vを供給します。`GPADC_VREF`は基準電圧ピンです。指定のコンデンサーのみをGNDに接続し、外部電源から駆動しないでください。 |
| SF32LB58x | 参考回路には`AVDD33_ANA`／`AVSS33_ANA`、指定のコンデンサーを接続する`GPADC_VREFP`、GNDに接続する`GPADC_VREFN`が示されています。どちらのVREFピンも電源入力として扱わないでください。 |

</div>

58xの`GPADC_VREFP`／`GPADC_VREFN`は、他のファミリーで使われる単一の`GPADC_VREF`とは異なります。SDK回路図ではファミリーごとにフィルター部品も異なります。対象部品の参考回路と指定部品値を確認してください。GPADCの基準電圧ピンに電源を直接印加しないでください。`AVDD33_ANA`はアナログ電源であり、`AVSS33_ANA`がある場合はアナログGNDです。

![SF32LB56x SDKガイドのGPADCアナログ電源および基準電圧配線](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>図: SF32LB56x SDKガイドに示されたファミリー別GPADCアナログ電源と基準電圧の配線。</em></div>

## ADCパッドを設定する { #configure-the-adc-pad }

サンプリング前に、選択した入力パッドをアナログ機能に設定します。ガイドに示されている汎用APIの例は次のとおりです。

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

これらの呼び出しはアナログピンAPIの例であり、対象ファミリーのパッドを指定するものではありません。次のチャンネルマップから実際の入力を選択してください。

<div align="center"><em>表: SF32ファミリー別GPADCパッドとチャンネルの対応</em></div>

<div align="center" markdown>

| ファミリー | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

SiFliの資料間でSF32LB52xのパッド割り当てが一致していません。[SF32LB52x専用ADCアプリケーションノート](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html) では、A0リビジョンの外部パッド`PB08`、`PB10`、`PB12`、`PB13`、`PB16`、`PB17`、`PB18`、`PB19`を、それぞれ`GPADC_CH0`～`GPADC_CH7`に割り当てています。一方、[SF32LB56xガイドの集約ADC表](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html) では、`PA28`～`PA34`が`GPADC_CH0`～`GPADC_CH6`、`BAT`が`GPADC_CH7`とされています。上表のSF32LB52x行は集約表に基づくもので、すべての52xに共通するピン割り当てではありません。52xの配線やGPADCを設定する前に、対象チップとリビジョンに対応するSDKのピンマルチプレクス設定および基板回路図を確認し、2つのマップを混在させないでください。

SF32LB57xにはさらに4つのADCチャンネルがあります。`PA36`は`GPADC_CH8`、`PA37`は`GPADC_CH9`、`PA38`は`GPADC_CH10`、バッテリー検出信号は`GPADC_CH11`（SDK表では`BAT`、ハードウェアガイドでは電源バリエーションに応じて`VBAT`または`VBATS`）です。このチャンネルはバッテリー電圧ドメインに属し、通常のGPADCピンとは測定範囲が異なります。3.3 V電源バリエーションでは、4.7 Vのピン定格ではなく、ガイド指定の`VBATS` 0～4.5 V GPADC測定範囲に従ってください。したがって、57xの12チャンネルマップとバッテリー入力は、上記の8チャンネルマップと置き換えて使うことはできません。

SF32LB55xに限り、次の例のようにPINをGPADCチャンネルへ直接割り当てる方法もあります。`HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`。この割り当てを他のファミリーに適用しないでください。

![SF32LB55xのアナログバッテリー入力ピンモード設定](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>図: SF32LB55xのバッテリーADC経路におけるアナログ入力モードのピン設定。</em></div>

## ADCチャンネルを読み取る { #read-an-adc-channel }

SiFli-SDKはADCをバッテリー電圧デバイスとして登録します。ガイドで使われている既定のデバイス名は`bat1`です。RT-Threadデバイスインターフェースでは、デバイスを検索し、読み取り専用で開き、対象チャンネルを有効にして、生の値を読み出します。

```c
uint32_t channel = 1;
uint32_t value;
rt_device_t dev = rt_device_find("bat1");

if (dev) {
    rt_device_open(dev, RT_DEVICE_FLAG_RDONLY);
    rt_device_control(dev, RT_ADC_CMD_ENABLE, (void *)channel);
    rt_device_read(dev, channel, &value, 1);
}
```

HALレベルでは`HAL_ADC_GetValue(&hadc, slot)`で変換結果を読み出します。初期化済みのADCハンドルと、変換に設定したslot番号を渡し、そのslotが想定したチャンネルおよびPADに対応していることを確認してください。

## ADCのキャリブレーションと電圧変換 { #adc-calibration-and-voltage-conversion }

ガイドでは、変換を次の線形関係で表しています。

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset`は入力が0 VのときのADC生値、`Ratio`は生値1カウントあたりの電圧増分です。工場キャリブレーションで製造ばらつきを補正できますが、ガイドでは組み立て後の入力経路を対象とする2点キャリブレーション方法も説明しています。

1. 精度が高く安定した2種類の電圧を印加し、それぞれに対応するADC値を読み取ります。
2. 0 Vや最大入力電圧ではなく、対象ファミリーで指定された2点のキャリブレーション電圧を使います。
3. `sifli_adc_calibration`で換算係数とオフセットを計算し、保存します。
4. 以降の生値は保存したキャリブレーション値で変換します。分圧前の入力電圧を求める場合は、分圧比も反映します。

ソースの実装では、`ADC_RATIO_ACCURATE`は1000、初期値の`adc_vol_offset`と`adc_vol_ratio`はそれぞれ200と3930に設定されています。この旧版ヘルパーコードは線形換算の例であり、対象SDKの校正フローに代わるものではありません。対象SDKがHALまたはデバイスドライバーの校正APIを提供している場合は、そのAPIを使用してください。

### SF32LB55xのキャリブレーション範囲 { #sf32lb55x-calibration-ranges }

OpenSiFliのADC FAQでは、SF32LB55xのキャリブレーション手順がさらに詳しく説明されています。`sifli_adc_init`の実行時に、Flashの工場設定領域から`FACTORY_CFG_ID_ADC`で特定される値を読み込みます。`sifli_adc_calibration`はその値から線形変換の`offset`と`ratio`を求めます。以降のサンプルは、選択した範囲に対応する`sifli_adc_get_mv`の計算を使います。

キャリブレーション範囲は2種類です。

![SF32LB55xのキャリブレーションモード選択と工場値の流れ](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>図: SF32LB55xのキャリブレーション初期化、範囲選択、オフセットと換算係数の計算。</em></div>

- **X1範囲：** 0.3 Vと0.8 V。保存されたキャリブレーション値のbit 15がセットされていると、低電圧レンジ用の処理が選択されます。0 V付近と1 Vを超える領域では精度が低下します。この処理では`GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`を無効にするため、内部分圧器はオフとなり、ADC測定点は1.1 Vを超えてはいけません。
- **X3範囲：** 1.0 Vと2.5 V。従来のキャリブレーション方法です。`GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`を有効にし、内部で3倍減衰する分圧器を使います。入力は3.3 Vを超えてはいけません。

![SF32LB55xのX1／X3内部分圧器制御](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>図: 選択したキャリブレーション範囲に応じたSF32LB55x内部分圧器の有効／無効制御。</em></div>

表だけを見てキャリブレーション範囲を決めないでください。工場設定と対象SDKの実装を確認してください。X1とX3の動作は、ここで引用するSF32LB55xの資料に固有であり、他のファミリーに適用するルールではありません。

<div align="center"><em>表: 統合ADCアプリケーションノートに記載された2点キャリブレーション入力</em></div>

<div align="center" markdown>

| ファミリー | キャリブレーション入力 |
|:-------|:-------------------|
| SF32LB55x | 0.3 Vと0.8 V |
| SF32LB52x／56x／58x | 1.0 Vと2.5 V |
| SF32LB57x | 1.0 Vと2.5 V |

</div>

SF32LB52xについては、資料のバージョン間で記述に差があります。統合ADCアプリケーションノートでは2点キャリブレーション入力として1.0 Vと2.5 Vを挙げていますが、現行のHAL APIリファレンスではSF32LB52Xの既定の校正レンジをX1とし、0.3 Vと0.8 Vを校正点に定義しています。この2組の電圧を、互換性のある既定値として扱わないでください。校正点や入力上限を決める前に、対象SDKバージョン、工場校正データ、実行時の校正レンジを確認してください。

```c
static uint32_t adc_vol_offset = 200;
static uint32_t adc_vol_ratio = 3930;
#define ADC_RATIO_ACCURATE 1000

int sifli_adc_get_mv(uint32_t value)
{
    return (value - adc_vol_offset) * adc_vol_ratio / ADC_RATIO_ACCURATE;
}

int sifli_adc_calibration(uint32_t value1, uint32_t value2,
                          uint32_t vol1, uint32_t vol2,
                          uint32_t *offset, uint32_t *ratio)
{
    uint32_t gap1, gap2;

    if (offset == NULL || ratio == NULL) return 0;

    gap1 = (value1 > value2) ? (value1 - value2) : (value2 - value1);
    gap2 = (vol1 > vol2) ? (vol1 - vol2) : (vol2 - vol1);

    if (gap1 == 0) return 0;

    *ratio = gap2 * ADC_RATIO_ACCURATE / gap1;
    adc_vol_ratio = *ratio;
    *offset = value1 - (vol1 * ADC_RATIO_ACCURATE / adc_vol_ratio);
    adc_vol_offset = *offset;

    return adc_vol_offset;
}
```

### 起動後と復帰後のキャリブレーションを検証する { #validate-calibration-after-startup-and-wake }

SF32LB55xのバッテリー電圧をデバッグする際、OpenSiFliのFAQでは起動または復帰直後の約300 msはRCの充放電により測定値が不正確になる可能性があり、観測波形は約350 ms後に整定すると説明しています。適切なサンプリング待ち時間を設けるか、最初の不安定なサンプルを破棄してください。マルチメーターやオシロスコープで分圧ノードを測定する場合は、測定器の入力インピーダンスを考慮してください。FAQでは、これにより約30 mVの電圧降下が生じる可能性が報告されています。

![SF32LB55xのバッテリーサンプリング起動時の整定波形](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>図: 約350 msの整定動作を示すSF32LB55xの起動波形。</em></div>

### スタンバイ移行前と復帰後にSF32LB55xのADCピン設定を確認する { #check-sf32lb55x-pin-configuration-after-standby }

SF32LB55xのバッテリー検出入力`PB10`は、スタンバイ移行前と復帰後の両方でピン設定を確認してください。初期化前の`PB10`は、デフォルトで内部プルアップが有効です。`pinmux.c`で`PIN_NOPULL`および`PIN_ANALOG_INPUT`に設定してください。設定しないとプルアップが有効なままとなり、読み取り値がときどき高くなることがあります。

![スタンバイ中のSF32LB55xバッテリーサンプリングノード波形](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>図: スタンバイ中のSF32LB55xバッテリーサンプリングノードの波形例。</em></div>

![復帰後のSF32LB55xバッテリーサンプリングノード波形](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>図: スタンバイから復帰した後のSF32LB55xバッテリーサンプリングノードの波形例。</em></div>

## 立ち上げ時の確認 { #bring-up-check }

複数チャンネルや周期サンプリングを追加する前に、安定した入力を用い、その電圧を別途測定したうえで、まず1チャンネルを検証してください。

1. 対象ファミリーのパッド割り当てとアナログ設定を確認する。
2. 分圧出力が対象ファミリーのADC上限内に収まることを確認する。
3. 生値とキャリブレーション後の値を印加電圧と比較する。
4. 分圧条件とキャリブレーション条件を基板試験記録に残す。

SF32LB56xのログUARTを外部PCに接続する場合、シリアルアダプターの基準電圧をチップのI/O電圧に合わせてください。OpenSiFliのADC FAQによると、I/O電圧が3.3 Vのときにアダプターの基準電圧が5 VだとADC読み取り値が大幅に低くなることがあります。たとえば、4 Vのバッテリーが3.3 Vと表示される場合があります。

## 公式ソース { #official-source }

- [SF32LB52x ADC使用・設定ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [SF32LB55x ADC使用・設定ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [SF32LB56x ADC使用・設定ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [SF32LB57x ADC使用・設定ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [SF32LB58x ADC使用・設定ガイド](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [SF32LB52x ADC HAL APIリファレンス](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html)：既定の校正レンジ。
- SF32LB57xハードウェア設計ガイド — ストレージと製造：GPADCチャンネルおよびPAD割り当て。
- SF32LB57xハードウェア設計ガイド — 最小システムと電源：アナログ電源／基準電圧接続および電源バリエーション別の電池検出制限。
- [OpenSiFliのADC FAQ](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md)：SF32LB55xの工場キャリブレーション範囲、起動／スタンバイ／復帰後の検証、およびSF32LB56xのログUART電圧に関する注意事項。
