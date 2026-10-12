---
icon: lucide/chart-no-axes-column
title: "GPADC로 샘플링하기"
description: "SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x, SF32LB58x에서 범용 ADC(GPADC)를 사용하는 방법: 전기적 한계, 패드 매핑, 디바이스 접근, 캘리브레이션."
tags:
    - 개발
    - SiFli-SDK
    - 애플리케이션 노트
    - ADC
---

# GPADC로 샘플링하기 { #sample-with-gpadc }

이 노트는 SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x, SF32LB58x의 ADC 가이드를 하나로 통합한 것입니다. 소프트웨어 워크플로는 공통이지만 입력 한계, 패드 할당, 캘리브레이션 지점은 제품군마다 다릅니다. 하드웨어나 펌웨어를 구성하기 전에 표에서 대상 제품군을 선택하십시오.

GPADC는 센서와 배터리 전압 등을 측정하는 SiFli의 범용 ADC입니다. SF32LB52x, SF32LB56x, SF32LB57x, SF32LB58x에서 제공하는 오디오 ADC와는 별개이며, SF32LB55x와 SF32LB58x에서 제공하는 시그마-델타 ADC와도 별개입니다. 이 노트는 GPADC만 다룹니다. 해당 변환기는 대상 제품군의 오디오 또는 시그마-델타 문서를 참고하십시오.

## ADC 범위와 채널 모델 { #adc-scope-and-channel-model }

SF32LB52x, SF32LB55x, SF32LB56x, SF32LB58x의 SDK 애플리케이션 노트 모델은 센서 출력과 배터리 전압 측정 같은 아날로그 소스를 위해 `GPADC_CH0`부터 `GPADC_CH7`까지 8개의 ADC 채널을 사용합니다. SF32LB57x의 SDK ADC 채널 맵에는 12개 채널이 나열되어 있습니다. `PA28`~`PA38`은 `GPADC_CH0`~`GPADC_CH10`에 매핑되고, 배터리 채널은 `GPADC_CH11`(SDK 맵에서는 `BAT`)입니다. SF32LB57x 하드웨어 설계 가이드에서는 해당 패키지 신호를 전원 변형(variant)에 따라 `VBAT` 또는 `VBATS`로 표기합니다. 사용 가능한 전압 결과는 선택한 채널, 입력 네트워크, 대상의 소프트웨어 캘리브레이션에 따라 달라집니다.

SF32LB52x는 `GPADC_CH7`(`BAT`)에 전용 배터리 감지 경로를 갖추고 있습니다. SDK 예제에 따르면 이 채널은 분배기를 거쳐 내부적으로 VBAT에 연결되어 있으며, 결과를 변환할 때 배터리 전압 계수를 적용합니다. 반면 `GPADC_CH7`은 SF32LB56x에서는 외부 패드 `PB32`에, SF32LB58x에서는 `PB39`에 매핑됩니다. SF32LB57x의 배터리 채널은 `GPADC_CH11`입니다. 해당 부품의 `VBAT` 또는 `VBATS` 신호와 배터리 도메인 한계를 사용하십시오. 보드에서 배터리와 관련된 연결이 있다고 해서 전용 온칩 배터리 채널이라고 추정해서는 안 됩니다.

## ADC 특성과 입력 네트워크 { #adc-characteristics-and-input-network }

<div align="center"><em>표: SF32 제품군별 일반 GPADC 특성</em></div>

<div align="center" markdown>

| 제품군 | GPADC 채널 | 해상도 | 전형 정확도 | 일반 GPADC 최대 입력 |
|:-------|:---------------|:-----------|:-----------------|:---------------------------|
| SF32LB55x | 8 | 10 bit | 3–4 mV | 1.1 V (X1); 3.3 V (X3) |
| SF32LB52x | 8 | 12 bit | 1–2 mV | 3.3 V |
| SF32LB56x / 58x | 8 | 12 bit | 1–2 mV | 3.3 V |
| SF32LB57x | 12 | 12 bit | 1–2 mV | 3.3 V |

</div>

위에 나열한 최대 입력 전압은 일반 GPADC 입력에 적용됩니다. 전용 배터리 감지 채널은 라우팅과 한계가 별도로 정해져 있습니다. SF32LB55x 예제는 1 MΩ / 220 kΩ 분배기와 157 ms RC 안정화 시간을 사용합니다. 통합된 SF32LB56x 가이드는 SF32LB52x, SF32LB56x, SF32LB58x에 470 kΩ / 1000 kΩ과 200 ms 안정화 시간을 제시하며, SF32LB57x에는 이 권장 사항을 적용하지 않습니다. 57x는 이 저항값이나 안정화 시간을 외삽하지 말고, 해당 부품에 대해 문서화된 배터리 감지 경로와 한계를 따르십시오. 이 권장 사항은 외부 분배기 네트워크에 적용됩니다. 특히 SF32LB52x의 전용 `GPADC_CH7` 배터리 경로에는 대상 보드 설계에서 요구하지 않는 한 외부 분배기를 추가하지 마십시오. 해당 경로는 이미 내부 분배기를 사용합니다. 분배기 허용 오차는 최종 측정 정확도에 영향을 주므로, 설계에서 필요하다면 외부 분배기는 생산 라인에서 별도로 캘리브레이션하십시오.

<div align="center"><em>표: SF32 제품군별 배터리 전압 감지 경로</em></div>

<div align="center" markdown>

| 제품군 | 배터리 감지 경로 | 설계 참고 사항 |
|:-------|:--------------------|:------------|
| SF32LB55x | 선택한 GPADC 입력에 연결되는 외부 분배기이며, 레퍼런스 회로는 `PB10` / `GPADC_CH1`을 사용합니다. | 분배기 출력이 선택한 X1/X3 입력 한계 이내에 있도록 하십시오. |
| SF32LB52x | 전용 `GPADC_CH7` / `BAT`이며, SDK 예제는 VBAT에서 이어지는 내부 분배기를 설명합니다. | 전용 채널 결과를 배터리 전압으로 변환할 때 SDK의 `vbat_factor`를 사용하십시오. |
| SF32LB56x / 58x | 외부 분배기가 보드에서 선택한 GPADC 패드에 연결되며, SDK 레퍼런스는 `GPADC_CH7`을 각각 `PB32` / `PB39`에 매핑합니다. | 실제 배터리 분배기 연결은 대상 보드 회로도에서 확인하십시오. 이 패드는 일반 GPADC 패드이며 전용 온칩 배터리 채널이 아닙니다. |
| SF32LB57x | 전용 `GPADC_CH11`이며, SDK 맵에서는 `BAT`, 하드웨어 가이드에서는 전원 변형에 따라 `VBAT` 또는 `VBATS`라고 부릅니다. | 해당 부품의 배터리 채널 측정 한계를 사용하십시오. 3.3 V 전원 변형의 경우 가이드는 `VBATS`의 GPADC 측정 범위를 0–4.5 V로 지정하므로, 4.7 V 핀 정격으로 대체하지 마십시오. |

</div>

SF32LB55x의 외부 배터리 경로에 대해 OpenSiFli ADC FAQ는 1% 저항을 사용하는 1 MΩ / 220 kΩ 분배기를 보여 줍니다. 저항값이 크면 분배기의 연속 누설 전류가 줄어들고, 1% 허용 오차는 분배비 오차를 제한하여 측정 정확도를 뒷받침합니다. 분배기 출력은 ADC 테스트 포인트이며 배터리 전압 자체가 아닙니다. 이 레퍼런스를 적용할 때는 대상 회로도와 전기적 한계를 사용하십시오.

![SF32LB56x SDK guide VBAT resistor-divider reference](../../../../assets/develop/adc/adc-resistor-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB56x SDK 가이드의 VBAT 저항 분배기와 ADC 테스트 포인트 레퍼런스.</em></div>

![SF32LB55x 1 MΩ / 220 kΩ divider voltage reference](../../../../assets/develop/adc/adc003.png){ loading="lazy" }
<div align="center"><em>그림: OpenSiFli ADC FAQ의 SF32LB55x 분배기 출력 레퍼런스 값.</em></div>

<div align="center"><em>표: SF32LB55x 1 MΩ / 220 kΩ 분배기의 레퍼런스 출력 전압</em></div>

<div align="center" markdown>

| 배터리 입력 | `PB10_BAT_DET_ADC` 출력 |
|:--------------|:-------------------------------|
| 3.0 V | 0.540983607 V |
| 3.3 V | 0.595081967 V |
| 3.6 V | 0.649180328 V |
| 4.0 V | 0.721311475 V |
| 4.2 V | 0.757377049 V |
| 5.0 V | 0.901639344 V |

</div>

SF32LB55x 레퍼런스 회로도에서 VBAT는 R125(1 MΩ)를 거쳐 `PB10_BAT_DET_ADC`에 연결됩니다. R126(220 kΩ)과 C118(0.1 µF)은 이 노드와 그라운드 사이에 병렬로 연결됩니다. 이 값들은 레퍼런스로 취급하고, 대상 회로도와 전기적 한계에 비추어 확인하십시오.

![SF32LB55x external battery-voltage divider schematic](../../../../assets/develop/adc/adc004.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB55x 외부 배터리 전압 샘플링 경로.</em></div>

## 아날로그 전원과 레퍼런스 { #analog-supply-and-reference }

아날로그 전원과 레퍼런스 핀 구성은 제품군마다 다릅니다. 모든 GPADC가 동일한 VREF 핀 배치를 갖는다고 가정하지 말고 대상 회로도를 사용하십시오.

<div align="center"><em>표: SF32 제품군별 GPADC 전원 및 레퍼런스 연결</em></div>

<div align="center" markdown>

| 제품군 | 전원 및 레퍼런스 연결 |
|:-------|:----------------------------------|
| SF32LB52x / 56x | 안정적인 3.3 V 레일에서 `AVDD33_ANA`를 공급합니다. 레퍼런스 회로도에서 `GPADC_VREF`는 그라운드로 디커플링되어 있으며, 전원 입력이 아닙니다. |
| SF32LB55x | 레퍼런스 회로도에는 `AVDD33_ANA`와 `AVSS33_ANA`가 표시되어 있습니다. 연결과 디커플링은 대상 회로도를 따르십시오. |
| SF32LB57x | 3.3 V에서 `AVDD33_ANA`를 공급합니다. `GPADC_VREF`는 레퍼런스 핀입니다. 지정된 커패시터를 그라운드에만 추가하고 외부에서 구동하지 마십시오. |
| SF32LB58x | 레퍼런스 회로도에는 `AVDD33_ANA` / `AVSS33_ANA`, 지정된 커패시터가 있는 `GPADC_VREFP`, 그라운드에 연결된 `GPADC_VREFN`이 표시되어 있습니다. 어느 레퍼런스 핀도 전원 입력으로 취급하지 마십시오. |

</div>

58x의 `GPADC_VREFP` / `GPADC_VREFN` 쌍은 다른 제품군에서 사용하는 단일 `GPADC_VREF` 명칭과 서로 바꿔 쓸 수 없습니다. SDK 회로도에는 제품군별 필터링 부품도 표시되어 있으므로, 대상 부품의 정확한 레퍼런스 회로와 부품 값을 사용하십시오. GPADC 레퍼런스 핀에 전원을 직접 인가해서는 안 됩니다. `AVDD33_ANA`는 아날로그 전원이며, `AVSS33_ANA`는 제공되는 경우 아날로그 그라운드입니다.

![SF32LB56x SDK guide GPADC analog-supply and reference wiring](../../../../assets/develop/adc/adc-ana-ref-sf32lb56x.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB56x SDK 가이드에 나온 제품군별 GPADC 아날로그 전원 및 레퍼런스 배선.</em></div>

## ADC 패드 구성 { #configure-the-adc-pad }

샘플링하기 전에 선택한 입력 패드를 아날로그 기능으로 설정하십시오. 가이드의 일반적인 API 예제는 다음과 같습니다.

```c
HAL_PIN_Set_Analog(PAD_PB08, 0);
HAL_PIN_Set_Analog(PAD_PB13, 0);
```

이 호출은 아날로그 핀 API를 보여 줄 뿐, 대상 제품군의 패드 선택을 의미하지 않습니다. 물리적 입력은 다음 채널 맵에서 선택하십시오.

<div align="center"><em>표: SF32 제품군별 GPADC 패드-채널 매핑</em></div>

<div align="center" markdown>

| 제품군 | `GPADC_CH0` | `GPADC_CH1` | `GPADC_CH2` | `GPADC_CH3` | `GPADC_CH4` | `GPADC_CH5` | `GPADC_CH6` | `GPADC_CH7` |
|:-------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|:------------|
| SF32LB55x | `PB08` | `PB10` | `PB12` | `PB13` | `PB16` | `PB17` | `PB18` | `PB19` |
| SF32LB52x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `BAT` |
| SF32LB56x | `PB22` | `PB23` | `PB24` | `PB25` | `PB26` | `PB27` | `PB28` | `PB32` |
| SF32LB58x | `PB32` | `PB33` | `PB34` | `PB35` | `PB36` | `PB37` | `PB38` | `PB39` |
| SF32LB57x | `PA28` | `PA29` | `PA30` | `PA31` | `PA32` | `PA33` | `PA34` | `PA35` |

</div>

SiFli의 자료는 SF32LB52x 패드 매핑에 대해 서로 다릅니다. [SF32LB52x 전용 ADC 애플리케이션 노트](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)는 리비전 A0의 외부 패드 맵을 `GPADC_CH0`~`GPADC_CH7`에 대해 `PB08`, `PB10`, `PB12`, `PB13`, `PB16`, `PB17`, `PB18`, `PB19`로 나열합니다. 반면 [SF32LB56x 가이드의 통합 ADC 표](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)는 `GPADC_CH0`~`GPADC_CH6`에 `PA28`~`PA34`를, `GPADC_CH7`에 `BAT`를 나열합니다. 위의 SF32LB52x 행은 통합 표를 반영한 것이며, 모든 52x에 공통으로 적용되는 핀 할당이 아닙니다. 52x 디바이스에서 GPADC를 라우팅하거나 구성하기 전에, 정확한 칩과 리비전을 해당 SDK 핀먹스 및 보드 회로도와 대조하여 확인하십시오. 이 두 맵을 섞어 쓰지 마십시오.

SF32LB57x에는 ADC 채널이 4개 더 있습니다. `PA36`은 `GPADC_CH8`, `PA37`은 `GPADC_CH9`, `PA38`은 `GPADC_CH10`이고, 배터리 감지 신호는 `GPADC_CH11`입니다(SDK 맵에서는 `BAT`, 하드웨어 가이드에서는 전원 변형에 따라 `VBAT` 또는 `VBATS`). 이 채널은 배터리 전압 도메인에 속하며 일반 GPADC 핀과 측정 범위가 다릅니다. 3.3 V 전원 변형의 경우 4.7 V 핀 정격이 아니라 가이드의 0–4.5 V `VBATS` GPADC 범위를 따르십시오. 따라서 12채널 맵과 배터리 입력은 위의 8채널 맵과 서로 바꿔 쓸 수 없습니다.

SF32LB55x 전용 경로에서는 PIN을 GPADC 채널에 직접 할당할 수도 있습니다. 예를 들어 `HAL_PIN_Set(PAD_PB08, GPADC_CH0, PIN_NOPULL, 0)`입니다. 이 특정 할당을 다른 제품군에 복사하지 마십시오.

![SF32LB55x analog battery-input pin-mode configuration](../../../../assets/develop/adc/adc008.png){ loading="lazy" }
<div align="center"><em>그림: 배터리 ADC 경로의 아날로그 입력 모드를 보여 주는 SF32LB55x 핀 구성.</em></div>

## ADC 채널 읽기 { #read-an-adc-channel }

SiFli-SDK는 ADC를 배터리 전압 디바이스로 등록하며, 가이드는 기본 디바이스 이름으로 `bat1`을 사용합니다. RT-Thread 디바이스 인터페이스에서는 디바이스를 찾아 읽기 전용으로 열고, 사용할 채널을 활성화한 다음 원시 값을 읽습니다.

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

HAL 수준에서는 `HAL_ADC_GetValue(&hadc, slot)`로 변환 결과를 읽습니다. 초기화된 ADC 핸들과 변환에 구성한 슬롯 번호를 전달하고, 해당 슬롯이 의도한 채널 및 PAD에 매핑되는지 확인하십시오.

## ADC 캘리브레이션과 전압 변환 { #adc-calibration-and-voltage-conversion }

가이드는 변환을 선형 관계로 모델링합니다.

<div align="center"><em>V<sub>real</sub> = (Value<sub>adc</sub> − Offset) × Ratio</em></div>

`Offset`은 0 V에서의 원시 값이고, `Ratio`는 원시 카운트당 전압 증가분입니다. 공장 캘리브레이션은 제조 편차를 보정하지만, 가이드는 조립된 입력 경로에 대한 2점 캘리브레이션 방법도 설명합니다.

1. 정확하고 안정적인 전압 두 개를 인가하고 해당 ADC 값을 읽습니다.
2. 0 V나 최대 입력 전압이 아니라 대상 제품군의 두 캘리브레이션 전압을 사용합니다.
3. `sifli_adc_calibration`을 사용하여 ratio와 offset을 계산하고 유지합니다.
4. 이후의 원시 값은 유지한 캘리브레이션 값으로 변환하고, 소스 측 전압을 보고할 때는 분배비를 포함합니다.

소스 구현은 `ADC_RATIO_ACCURATE`를 1000으로 설정하며, `adc_vol_offset`과 `adc_vol_ratio`의 초기값은 각각 200과 3930입니다. 이 레거시 헬퍼는 선형 계산을 보여 주는 용도이며, 대상 SDK 릴리스에서 제공하는 캘리브레이션 흐름을 대체하지 않습니다. 가능한 경우 대상 HAL 또는 디바이스 드라이버의 캘리브레이션 API를 사용하십시오.

### SF32LB55x 캘리브레이션 범위 { #sf32lb55x-calibration-ranges }

OpenSiFli ADC FAQ는 SF32LB55x 캘리브레이션 흐름을 더 자세히 문서화하고 있습니다. `sifli_adc_init` 중에 `FACTORY_CFG_ID_ADC`로 식별되는 공장 영역 플래시 구성이 저장된 캘리브레이션 판독값을 제공합니다. `sifli_adc_calibration`은 이 판독값에서 선형 `offset`과 `ratio`를 도출하며, 이후의 샘플은 선택한 범위의 `sifli_adc_get_mv` 계산을 사용합니다.

두 가지 캘리브레이션 범위가 문서화되어 있습니다.

![SF32LB55x calibration-mode selection and factory-value flow](../../../../assets/develop/adc/adc001.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB55x 캘리브레이션 초기화, 범위 선택, offset/ratio 계산.</em></div>

- **X1 범위:** 0.3 V와 0.8 V. 저장된 캘리브레이션 값의 비트 15가 설정되어 있어 구현이 소범위 경로를 선택합니다. 0 V 근처와 1 V 이상에서는 정확도가 떨어집니다. 이 경로는 `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`를 비활성화하므로 내부 분배기가 꺼지며, ADC 테스트 포인트는 1.1 V를 초과해서는 안 됩니다.
- **X3 범위:** 1.0 V와 2.5 V. 이전 캘리브레이션 방식입니다. `GPADC_ADC_CFG_REG1_ANAU_GPADC_ATTN3X`를 활성화하여 3배 감쇠의 내부 분배기를 켜며, 입력은 3.3 V를 초과해서는 안 됩니다.

![SF32LB55x X1/X3 internal-divider control](../../../../assets/develop/adc/adc002.png){ loading="lazy" }
<div align="center"><em>그림: 선택한 캘리브레이션 범위에 대한 SF32LB55x 내부 분배기 활성화/비활성화 제어.</em></div>

캘리브레이션 범위는 표만 보고 선택하지 마십시오. 공장 구성과 대상 SDK 구현을 사용해야 합니다. X1과 X3의 동작은 여기에 인용한 SF32LB55x 자료에만 해당하며, 다른 제품군에 적용하는 규칙이 아닙니다.

<div align="center"><em>표: 통합 ADC 애플리케이션 노트에 나열된 2점 캘리브레이션 입력</em></div>

<div align="center" markdown>

| 제품군 | 캘리브레이션 입력 |
|:-------|:-------------------|
| SF32LB55x | 0.3 V와 0.8 V |
| SF32LB52x / 56x / 58x | 1.0 V와 2.5 V |
| SF32LB57x | 1.0 V와 2.5 V |

</div>

SF32LB52x에는 소스 버전 간 차이가 있습니다. 통합 ADC 애플리케이션 노트는 2점 캘리브레이션에 1.0 V와 2.5 V를 나열하지만, 현재 HAL API 레퍼런스는 SF32LB52X의 기본 캘리브레이션 범위를 0.3 V와 0.8 V 지점의 X1으로 명시합니다. 이 두 쌍을 서로 바꿔 쓸 수 있는 기본값으로 취급하지 마십시오. 캘리브레이션 입력이나 허용 입력 전압을 선택하기 전에 대상 부품의 정확한 SDK 릴리스, 공장 데이터, 런타임 캘리브레이션 범위를 확인하십시오.

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

### 시작 및 웨이크 후 캘리브레이션 검증 { #validate-calibration-after-startup-and-wake }

SF32LB55x 배터리 전압을 디버깅할 때, OpenSiFli ADC FAQ는 시작 또는 웨이크 후 처음 약 300 ms 동안의 판독값이 RC 충방전 때문에 부정확할 수 있다고 경고합니다. 관측된 파형은 약 350 ms 후에 안정됩니다. 적절한 샘플링 지연을 추가하거나 초기의 불안정한 샘플을 버리십시오. 분배기 노드를 멀티미터나 오실로스코프로 측정할 때는 측정 기기의 입력 임피던스를 고려하십시오. FAQ에 따르면 이로 인해 약 30 mV의 강하가 생길 수 있습니다.

![SF32LB55x battery-sampling startup settling waveform](../../../../assets/develop/adc/adc005.png){ loading="lazy" }
<div align="center"><em>그림: 약 350 ms의 안정화 동작을 보여 주는 SF32LB55x 시작 파형.</em></div>

### Standby 및 웨이크 후 SF32LB55x ADC 핀 확인 { #check-sf32lb55x-pin-configuration-after-standby }

`PB10`의 SF32LB55x 배터리 감지 입력은 Standby에 진입하기 전과 웨이크 후 모두 핀 구성을 확인하십시오. 초기화 전에 `PB10`에는 기본적으로 내부 풀업이 있습니다. `pinmux.c`에서 이를 `PIN_NOPULL`과 `PIN_ANALOG_INPUT`으로 구성하십시오. 그렇지 않으면 풀업이 활성화된 채로 남아 가끔 높은 판독값이 나올 수 있습니다.

![SF32LB55x battery-sampling node waveform in standby](../../../../assets/develop/adc/adc006.png){ loading="lazy" }
<div align="center"><em>그림: 디바이스가 Standby 상태일 때의 SF32LB55x 배터리 샘플링 노드 파형 예시.</em></div>

![SF32LB55x battery-sampling node waveform after wake](../../../../assets/develop/adc/adc007.png){ loading="lazy" }
<div align="center"><em>그림: 디바이스가 Standby에서 웨이크한 후의 SF32LB55x 배터리 샘플링 노드 파형 예시.</em></div>

## 브링업 점검 { #bring-up-check }

다채널 또는 주기적 획득을 추가하기 전에, 독립적으로 측정한 안정적인 입력으로 채널 하나를 검증하십시오.

1. 대상 제품군의 패드 매핑과 아날로그 구성을 확인합니다.
2. 분배기 출력이 대상 제품군의 ADC 한계 이내인지 확인합니다.
3. 원시 결과와 캘리브레이션된 결과를 인가한 전압과 비교합니다.
4. 분배기와 캘리브레이션 조건을 보드 테스트 기록과 함께 보관합니다.

SF32LB56x 로그 UART를 외부 PC에 연결할 때는 시리얼 어댑터의 기준 레벨이 칩의 I/O 전압과 일치하는지 확인하십시오. OpenSiFli ADC FAQ는 3.3 V I/O 연결에 5 V 어댑터 기준을 사용하면 ADC 판독값이 예상보다 훨씬 낮게 나올 수 있다고 경고합니다. 예를 들어 4 V 배터리가 3.3 V로 보고될 수 있습니다.

## 공식 출처 { #official-source }

- [SF32LB52x ADC Usage and Configuration Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/adc.html)
- [SF32LB55x ADC Usage and Configuration Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)
- [SF32LB56x ADC Usage and Configuration Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/adc.html)
- [SF32LB57x ADC Usage and Configuration Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb57x/app_note/adc.html)
- [SF32LB58x ADC Usage and Configuration Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/adc.html)
- [SF32LB52x ADC HAL API Reference](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/adc.html) — 기본 캘리브레이션 범위 정의.
- SF32LB57x 하드웨어 설계 가이드 — 스토리지 및 양산 — GPADC 채널 및 패드 할당.
- SF32LB57x 하드웨어 설계 가이드 — 최소 시스템 및 전원 — 아날로그 전원/레퍼런스 연결 및 변형별 배터리 감지 한계.
- [OpenSiFli ADC FAQ](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/faq/mcu/adc.md) — SF32LB55x 공장 캘리브레이션 범위, 시작/Standby/웨이크 검증, SF32LB56x 로그 UART 레벨 안내.
