---
icon: lucide/circuit-board
description: "SF32LB56x MCU 회로 설계 가이드라인: 전원 시스템, 동작 모드와 웨이크업 소스, 클럭 생성, RF, 디스플레이/터치/백라이트 인터페이스, 스토리지/센서/오디오/연결, 양산."
tags:
    - 하드웨어
    - 칩
hide:
    - navigation
---

# SF32LB56x 하드웨어 설계 가이드 — 회로 설계 가이드라인 { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "SF32LB56x 하드웨어 설계 가이드의 일부"
    이 페이지는 5절 회로 설계 가이드라인을 다룹니다. 디바이스 선택과 전체 설계 흐름은 [SF32LB56x 하드웨어 설계 가이드 개요](SF32LB56x_hardware_design_guide.md)에서 시작하고, [회로도 체크리스트](SF32LB56x_schematic_checklist.md)로 이어가거나 [PCB 레이아웃 가이드라인](SF32LB56x_pcb_layout.md)으로 바로 이동하십시오.

## 5. 회로 설계 가이드라인 { #5-schematic-design-guidelines }

### 5.1. 전원 시스템 { #51-power-system }

프로세서 레일, 필수 로컬 커패시터, PMIC 출력 할당, 리셋 타이밍, 충전기 배선을 함께 검토하십시오. U 변형(variant)과 V 변형은 전원 설계 방식이 같지만, 전원 핀 이름과 부하 할당이 다릅니다.

<div align="center"><em>표 5.1-1: SF32LB56xU 프로세서 전원 레일</em></div>

<div align="center" markdown>

| PMU 전원 핀 | 최소 전압(V) | 전형 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.7 | 1.8 | 3.6 | 100 | PVDD 전원 입력 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX 출력으로 인덕터에 연결합니다. 내부 전원 입력으로 인덕터의 다른 쪽 끝과 외부 커패시터에 연결합니다 |
| LDO1_VOUT | - | 1.1 | - | 50 | LDO1 출력, 외부 커패시터 포함 |
| LDO2_VOUT | - | 0.9 | - | 20 | LDO2 출력, 외부 커패시터 포함 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 출력, 외부 커패시터 포함 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 출력, 외부 커패시터 포함 |
| MIC_BIAS | 1.4 | - | 2.8 | - | MIC 전원 출력 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 아날로그 전원 + RFPA 전원 입력 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 아날로그 오디오 전원 |
| VDDIO1 | 1.71 | 1.8 | 1.98 | - | 빅 코어의 내부 패키지 스토리지 디바이스용 전원 입력 |
| VDDIO2 | 1.71 | 1.8 | 3.45 | - | PA GPIO(PA5~11 제외)용 전원 입력 |
| VDDIO3 | 1.71 | 1.8 | 3.45 | - | PA5~11용 전원 입력 |
| VDDIO4 | 1.71 | 1.8 | 3.45 | - | PB GPIO와 스몰 코어의 내부 패키지 플래시용 전원 입력 |
| GPADC_VREF | - | - | - | - | GPADC 레퍼런스 전압 입력. 외부 커패시터만 연결하며 외부 전원은 필요하지 않습니다 |
| AUD_VREF | - | - | - | - | 오디오 레퍼런스 전압 입력. 외부 커패시터만 연결하며 외부 전원은 필요하지 않습니다 |

</div>

<div align="center"><em>표 5.1-2: SF32LB56xV 프로세서 전원 레일</em></div>

<div align="center" markdown>

| PMU 전원 핀 | 최소 전압(V) | 전형 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.71 | 1.8 | 3.6 | 100 | PVDD 전원 입력 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX 출력으로 인덕터에 연결합니다. 내부 전원 입력으로 인덕터의 다른 쪽 끝과 외부 커패시터에 연결합니다 |
| LDO1_VOUT | - | 1.1 | - | 50 | LDO1 출력, 외부 커패시터에 연결 |
| LDO2_VOUT | - | 0.9 | - | 20 | LDO2 출력, 외부 커패시터에 연결 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 출력, 외부 커패시터에 연결 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 출력, 외부 커패시터에 연결 |
| MIC_BIAS | 1.4 | - | 2.8 | - | MIC 전원 출력 |
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | RF 전원 입력 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 아날로그 전원 + RFPA 전원 입력 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 아날로그 오디오 전원 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA78 I/O 전원 입력 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11 I/O 전원 입력 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PB I/O 전원 입력 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA 전원 입력 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB 전원 입력 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC 전원 입력 |
| GPADC_VREF | - | - | - | - | GPADC 레퍼런스 전압 입력. 외부 커패시터만 연결하며 외부 전원은 필요하지 않습니다 |
| AUD_VREF | - | - | - | - | 오디오 레퍼런스 전압 입력. 외부 커패시터만 연결하며 외부 전원은 필요하지 않습니다 |

</div>

<div align="center"><em>표 5.1-3: SF32LB56xU 필수 전원 커패시터</em></div>

<div align="center" markdown>

| 전원 핀 | 커패시터 | 상세 설명 |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | 10uF와 0.1uF 커패시터를 최소 2개 핀 가까이에 배치하십시오. |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | 4.7uF와 0.1uF 커패시터를 최소 2개 핀 가까이에 배치하십시오. |
| LDO1_VOUT | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| LDO2_VOUT | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDD_RET | 0.47uF | 0.47uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDD_RTC | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AVDD33_ANA | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| GPADC_VREF | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AVDD33_AUD | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AUD_VREF | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| MIC_BIAS | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIO1 | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIO2 | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIO3 | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIO4 | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |

</div>

<div align="center"><em>표 5.1-4: SF32LB56xV 필수 전원 커패시터</em></div>

<div align="center" markdown>

| 전원 핀 | 커패시터 | 상세 설명 |
| :--- | :--- | :--- |
| PVDD | 0.1uF + 10uF | 10uF와 0.1uF 커패시터를 최소 2개 핀 가까이에 배치하십시오. |
| BUCK_LX BUCK_FB | 0.1uF + 4.7uF | 4.7uF와 0.1uF 커패시터를 최소 2개 핀 가까이에 배치하십시오. |
| LDO1_VOUT | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| LDO2_VOUT | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDD_RET | 0.47uF | 0.47uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDD_RTC | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AVDD_BRF | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AVDD33_ANA | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| GPADC_VREFP | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AVDD33_AUD | 4.7uF | 4.7uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| AUD_VREF | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| MIC_BIAS | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOA | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOA2 | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOB | 1uF | 1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOSA | 0.1uF | 0.1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOSB | 0.1uF | 0.1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |
| VDDIOSC | 0.1uF | 0.1uF 커패시터를 최소 1개 핀 가까이에 배치하십시오. |

</div>

<div align="center"><em>표 5.1-5: SF30147C PMIC 출력 정격(U 변형 예시)</em></div>

<div align="center" markdown>

| SF30147C 전원 핀 | 최소 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | 1.8V 출력. 이 행으로 U 변형의 칩 레일 매핑을 유추하지 마십시오. |
| LVSW1 | 1.8 | 1.8 | 100 | 1.8V 전원 출력 |
| LVSW2 | 1.8 | 1.8 | 100 | G-SENSOR 1.8V 전원 입력 |
| LVSW3 | 1.8 | 1.8 | 150 | 심박 센서 1.8V 전원 입력 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8V 전원 입력 |
| LVSW5 | 1.8 | 1.8 | 150 | 1.8V 전원 출력 |
| LDO1 | 2.8 | 3.3 | 100 | 2.8–3.3V 출력. 이 행으로 U 변형의 칩 레일 매핑을 유추하지 마십시오. |
| LDO2 | 2.8 | 3.3 | 100 | 모터 전원 입력 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3V 전원 입력 |
| LDO4 | 2.8 | 3.3 | 100 | 심박 센서 3.3V 전원 입력 |
| HVSW1 | 2.8 | 5 | 150 | 아날로그 Class-K PA 전원 입력 |
| HVSW2 | 2.8 | 5 | 150 | GPS 전원 입력 |

</div>

!!! warning "U 변형 PMIC 레일 매핑 확인"
    SiFli의 원본 U 변형 전원 할당 표에는 VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C, AVDD_BRF가 나열되어 있으며, 이는 같은 가이드의 U 전용 프로세서 전원 표와 충돌합니다. 위 표는 PMIC 출력 전압 및 전류 한계를 유지한 것이므로, U 변형의 칩 핀 연결을 유추하는 데 사용하지 마십시오. 레이아웃을 릴리스하기 전에 해당 회로도 리비전과 SF30147C 데이터시트로 실제 매핑을 확인하십시오.

<div align="center"><em>표 5.1-6: V 변형의 SF30147C PMIC 전원 분배 예시</em></div>

<div align="center" markdown>

| SF30147C 전원 핀 | 최소 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | SF32LB56xV PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC, AVDD_BRF 등의 1.8V 전원 입력 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PA 로직 전원 입력 |
| LVSW2 | 1.8 | 1.8 | 100 | G-SENSOR 1.8V 전원 입력 |
| LVSW3 | 1.8 | 1.8 | 150 | 심박 센서 1.8V 전원 입력 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8V 전원 입력 |
| LVSW5 | 1.8 | 1.8 | 150 | EMMC CORE 전원 입력 |
| LDO1 | 2.8 | 3.3 | 100 | SF32LB56xV AVDD33_ANA, AVDD33_AUD, VDDIOA2 등의 3.3V 전원 입력 |
| LDO2 | 2.8 | 3.3 | 100 | EMMC 또는 SD NAND 전원 입력 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3V 전원 입력 |
| LDO4 | 2.8 | 3.3 | 100 | 심박 센서 3.3V 전원 입력 |
| HVSW1 | 2.8 | 5 | 150 | 아날로그 Class-K PA 전원 입력 |
| HVSW2 | 2.8 | 5 | 150 | GPS 전원 입력 |

</div>

![그림 5.1-1: SF32LB56xU POR/BOR 타이밍](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-1: SF32LB56xU POR/BOR 타이밍</em></div>

![그림 5.1-2: SF32LB56xV POR/BOR 타이밍](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-2: SF32LB56xV POR/BOR 타이밍</em></div>

![그림 5.1-3: SF32LB56xU BUCK 레퍼런스 회로](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-3: SF32LB56xU BUCK 레퍼런스 회로</em></div>

![그림 5.1-4: SF32LB56xV BUCK 레퍼런스 회로](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-4: SF32LB56xV BUCK 레퍼런스 회로</em></div>

![그림 5.1-5: SF32LB56xU LDO 레퍼런스 회로](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-5: SF32LB56xU LDO 레퍼런스 회로</em></div>

![그림 5.1-6: SF32LB56xV LDO 레퍼런스 회로](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-6: SF32LB56xV LDO 레퍼런스 회로</em></div>

![그림 5.1-7: SF32LB56xU 충전 레퍼런스 회로](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-7: SF32LB56xU 충전 레퍼런스 회로</em></div>

![그림 5.1-8: SF32LB56xV 충전 레퍼런스 회로](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-8: SF32LB56xV 충전 레퍼런스 회로</em></div>

전원 경로 관리가 없으면 시스템은 배터리와 함께 VBAT에 직접 연결됩니다. 비용은 낮지만 하위 회로를 배터리에서 완전히 분리할 수 없어 누설이 늘고 저전력 Shipping Mode 목표를 달성할 수 없습니다. 배터리가 과방전된 상태에서는 충전기 트리클 전류가 시스템 부하와 누설 부하의 합(원본 다이어그램의 i1+i2)을 초과해야 합니다. 시스템이 동작하는 동안에도 정전류 충전 전류가 i1+i2를 초과해야 하며, 그렇지 않으면 시스템 부하가 충전 전류의 일부를 가져가 배터리가 완전히 충전되지 않을 수 있습니다. 전원 경로 충전기는 VSYS의 시스템 전원과 VBAT의 배터리 충전을 분리하고, Shipping Mode를 지원하며, 배터리가 과방전된 상태에서도 VSYS로 시스템에 전원을 공급할 수 있습니다.

U 변형에서는 주변 장치 I/O 전압과 시스템 전원 목표에 따라 세 가지 전원 토폴로지 중에서 선택합니다. 세 가지 모두 AVDD33_ANA와 AVDD33_AUD는 3.3V로 공급합니다. 전력이 가장 낮은 토폴로지는 PVDD와 VDDIO1~VDDIO4를 1.8V로 공급하고 1.8V I/O를 갖춘 주변 장치를 사용합니다. 중간 토폴로지는 PVDD와 VDDIO1을 1.8V로 유지하면서 VDDIO2~VDDIO4와 주변 장치 I/O는 3.3V로 공급합니다. 전력이 가장 높은 토폴로지는 코패키지 PSRAM에 전원을 공급하는 VDDIO1만 1.8V로 유지하고, PVDD, VDDIO2~VDDIO4, 주변 장치 I/O는 3.3V를 사용합니다. 외부 모듈의 동적 전원 관리에는 로드 스위치를 사용하고, 사용하지 않을 때는 기본적으로 꺼 두십시오. 계속 켜져 있어야 하는 모듈에는 정지 전류가 낮은 부품을 선택하십시오. 로드 스위치 제어 GPIO의 하드웨어 기본 레벨은 스위치 enable 극성과 일치해야 시동 시 스위치가 꺼진 상태로 유지됩니다. SiFli는 enable 입력에 1MΩ 풀업 또는 풀다운을 권장합니다.

U 변형 PMU는 PVDD가 1.5V로 상승하면 전원 인가 리셋을 완료합니다. PVDD가 하강하여 설정된 BOR 임계값에 도달하면 브라운아웃 리셋이 발생하며, 이 임계값은 1.5V~2.5V 범위에서 설정할 수 있습니다.

### 5.2. 동작 모드와 웨이크업 소스 { #52-operating-modes-and-wake-sources }

동작 모드, 웨이크업 소스, 풀업 레일, 누설 전류에 대한 결정은 하나의 주제로 함께 검토하는 것이 좋습니다. 버튼, 터치, 센서 인터럽트, 충전기 이벤트 및 기타 저전력 웨이크업 신호에는 웨이크업이 가능한 핀을 사용하십시오.

<div align="center"><em>표 5.2-1: SF32LB56xU 동작 모드</em></div>

<div align="center" markdown>

| 동작 모드 | CPU | 주변 장치 | SRAM | IO | LPTIM | 웨이크업 소스 | 웨이크업 시간 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | 동작 | 동작 | 접근 가능 | 토글 가능 | 동작 |  |  |
| WFI/WFE | 정지 | 동작 | 접근 가능 | 토글 가능 | 동작 | 모든 인터럽트 | < 0.5us |
| DEEPWFI | 정지 | 동작 | 접근 가능 | 토글 가능 | 동작 | 모든 인터럽트 | < 5us |
| Light sleep | 정지 | 정지 | 접근 불가, 전체 유지 | 레벨 유지 | 동작 | RTC, GPIO, LPTIM, 크로스 시스템, Bluetooth, 비교기 | < 100us |
| Deep sleep | 정지 | 정지 | 접근 불가, 전체 유지 | 레벨 유지 | 동작 |  | < 300us |
| Standby | 리셋 | 리셋 | 접근 불가, LP 전체 유지, HP는 160KB만 유지 | 레벨 유지 | 동작 | RTC, 버튼, LPTIM, 크로스 시스템, Bluetooth | 1.5ms+복구 시간 |
| Hibernate rtc | 리셋 | 리셋 | 데이터 유지 안 됨 | High-Z | 리셋 | RTC, 버튼 | > 2ms |
| Hibernate pin | 리셋 | 리셋 | 데이터 유지 안 됨 | High-Z | 리셋 | 버튼 | > 2ms |

</div>

<div align="center"><em>표 5.2-2: SF32LB56xV 동작 모드</em></div>

<div align="center" markdown>

| 동작 모드 | CPU | 주변 장치 | SRAM | IO | LPTIM | 웨이크업 소스 | 웨이크업 시간 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | 동작 | 동작 | 접근 가능 | 토글 가능 | 동작 |  |  |
| WFI/WFE | 정지 | 동작 | 접근 가능 | 토글 가능 | 동작 | 모든 인터럽트 | < 0.5us |
| DEEPWFI | 정지 | 동작 | 접근 가능 | 토글 가능 | 동작 | 모든 인터럽트 | < 5us |
| Light sleep | 정지 | 정지 | 접근 불가, 전체 유지 | 레벨 유지 | 동작 | RTC/GPIO/ LPTIM/LPCOMP/ 크로스 시스템 인터럽트/Bluetooth | < 100us |
| Deep sleep | 정지 | 정지 | 접근 불가, 전체 유지 | 레벨 유지 | 동작 | RTC/GPIO/ LPTIM/LPCOMP/ 크로스 시스템 인터럽트/Bluetooth | < 300us |
| Standby | 리셋 | 리셋 | 접근 불가, LP 전체 유지, HP는 160KB만 유지 | 레벨 유지 | 동작 | RTC/버튼/LPTIM/ 크로스 시스템 인터럽트/Bluetooth | 1.5ms +복구 시간 |
| Hibernate rtc | 리셋 | 리셋 | 데이터 유지 안 됨 | High-Z | 리셋 | RTC/버튼 | > 2ms |
| Hibernate pin | 리셋 | 리셋 | 데이터 유지 안 됨 | High-Z | 리셋 | 버튼 | > 2ms |

</div>

<div align="center"><em>표 5.2-3: SF32LB56xU 웨이크업 인터럽트 소스</em></div>

<div align="center" markdown>

| 인터럽트 소스 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 인터럽트 신호 0 |
| WKUP_PIN1 | PB33 | 인터럽트 신호 1 |
| WKUP_PIN2 | PB34 | 인터럽트 신호 2 |
| WKUP_PIN5 | PA50 | 인터럽트 신호 5 |
| WKUP_PIN6 | PA51 | 인터럽트 신호 6 |
| WKUP_PIN10 | PBR0 | 인터럽트 신호 10 |
| WKUP_PIN11 | PBR1 | 인터럽트 신호 11 |
| WKUP_PIN12 | PBR2 | 인터럽트 신호 12 |

</div>

<div align="center"><em>표 5.2-4: SF32LB56xV 웨이크업 인터럽트 소스</em></div>

<div align="center" markdown>

| 인터럽트 소스 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 인터럽트 신호 0 |
| WKUP_PIN1 | PB33 | 인터럽트 신호 1 |
| WKUP_PIN2 | PB34 | 인터럽트 신호 2 |
| WKUP_PIN3 | PB35 | 인터럽트 신호 3 |
| WKUP_PIN4 | PB36 | 인터럽트 신호 4 |
| WKUP_PIN5 | PA50 | 인터럽트 신호 5 |
| WKUP_PIN6 | PA51 | 인터럽트 신호 6 |
| WKUP_PIN7 | PA52 | 인터럽트 신호 7 |
| WKUP_PIN8 | PA53 | 인터럽트 신호 8 |
| WKUP_PIN9 | PA54 | 인터럽트 신호 9 |
| WKUP_PIN10 | PBR0 | 인터럽트 신호 10 |
| WKUP_PIN11 | PBR1 | 인터럽트 신호 11 |
| WKUP_PIN12 | PBR2 | 인터럽트 신호 12 |
| WKUP_PIN13 | PBR3 | 인터럽트 신호 13 |

</div>

BOOT_MODE는 시작 동작을 선택합니다. High이면 다운로드 모드로 진입하고, low이면 ROM이 사용자 프로그램이 있는지 확인하여 있으면 시작하고 없으면 다운로드 모드로 진입합니다. U 변형의 Mode 핀은 내부 풀다운이 있어 사용하지 않을 때 플로팅 상태로 둘 수 있으며, VDDIO2 도메인을 공유합니다. V 변형의 Mode 핀은 VDDIOA를 공유하므로 10kΩ 풀업 또는 풀다운으로 안정적으로 고정하는 것이 좋으며, 플로팅 상태로 두거나 간섭으로 인해 토글되게 해서는 안 됩니다. 양산 보드에는 Mode 테스트 포인트를 확보하고, 개발 보드에는 복구를 위해 점퍼를 두면 유용합니다.

저전력 셧다운 설계에서는 메모리 I/O 전원을 고려해야 합니다. U 변형의 Standby에서는 GPIO 레벨이 유지되며 VDDIO1은 계속 전원이 공급될 수 있으므로, MPI1/MPI2의 스토리지를 저전력 모드로 전환하십시오. Hibernate에서는 GPIO 레벨이 유지되지 않으므로, 코패키지 메모리 I/O를 통한 누설을 막기 위해 VDDIO1을 끄십시오. V 변형에서는 Standby에서 코패키지 메모리 I/O에 전원을 계속 공급하고, Hibernate 전에 PBR0 제어로 VDDIOSA와 VDDIOSB를 끄고 NOR 플래시를 Deep Power-Down 상태로 전환하십시오. VDDIOSC는 계속 전원이 공급되어야 합니다.

### 5.3. 클럭 생성 { #53-clock-generation }

<div align="center"><em>표 5.3-1: 크리스털 요구 사항</em></div>

<div align="center" markdown>

| 크리스털 | 크리스털 사양 요구 사항 | 상세 설명 |
| :--- | :--- | :--- |
| 48MHz | 7pF≦CL≦12pF (권장값 8.8pF) △F/F0≦±10ppm ESR≦30 ohms (권장값 22ohms) | 크리스털 오실레이터 소비 전력은 CL과 ESR에 관련됩니다. CL과 ESR이 작을수록 소비 전력이 낮아집니다. 최적의 전력 성능을 위해서는 요구 범위 안에서 CL과 ESR 값이 비교적 작은 부품을 사용하는 것이 좋습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 두십시오. CL<12pF이면 커패시터를 실장할 필요가 없습니다 |
| 32.768KHz | CL≦12.5pF (권장값 7pF) △F/F0≦±20ppm ESR≦80k ohms (권장값 38Kohms) | 크리스털 소비 전력은 CL과 ESR에 관련됩니다. CL과 ESR이 작을수록 소비 전력이 낮아집니다. 최적의 소비 전력 성능을 위해서는 요구 범위 안에서 CL과 ESR 값이 비교적 작은 부품을 사용하는 것이 좋습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 두십시오. CL<12.5pF이면 커패시터를 납땜할 필요가 없습니다 |

</div>

<div align="center"><em>표 5.3-2: 권장 크리스털 모델</em></div>

<div align="center" markdown>

| 모델 | 제조사 | 파라미터 |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48.000000MHz, △F/F0 = -6 ~ 8 ppm, CL = 8.8 pF, ESR = 22 ohms Max TOPR = -30 ~ 85℃, Package = (2016 metric) |
| ETST00327000LE | Hosonic | F0 = 32.768KHz, △F/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR = 70K ohms Max TOPR = -40 ~ 85℃, Package = (3215 metric) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000MHz, △F/F0 = -10 ~ 10 ppm, CL = 8.8 pF, ESR = 40 ohms Max TOPR = -20 ~ 75℃, Package = (2016 metric) |
| SF32K32768D71T01 | TKD | F0 = 32.768KHz, △F/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR = 70K ohms Max TOPR = -40 ~ 85℃, Package = (3215 metric) |

</div>

48 MHz 및 32.768 kHz 크리스털은 칩 가까이에 배치하고, 매칭 커패시터를 확보하며, 크리스털 트레이스를 BUCK, RF, 디스플레이, 모터, 충전기 노이즈로부터 보호하십시오.

### 5.4. RF { #54-rf }

SF32LB56xU와 SF32LB56xV 설계 모두 RF 경로를 50옴 임피던스 제어 트레이스로 라우팅하십시오. 선택한 안테나가 이미 매칭되어 있으면 일반적으로 추가 RF 부품은 필요하지 않지만, 스퓨리어스 필터링과 최종 안테나 튜닝을 위해 π형 매칭 회로는 확보해 두는 것이 좋습니다.

RF 매칭 회로는 안테나 쪽이 아니라 칩 쪽 가까이에 배치하십시오. AVDD_BRF 필터링은 칩 핀 가까이에 두고, 커패시터 그라운드를 메인 그라운드에 직접 연결하며, 가능하면 RF를 표면 레이어로 라우팅하고, 비아와 급한 모서리를 피하며, RF 트레이스 양쪽을 따라 촘촘한 그라운드 차폐 비아를 추가하고, DC-DC, VBAT, 크리스털, 고속 클럭, I2C, SPI, SDIO, I2S, UART 신호를 RF 영역에서 멀리 두십시오.

### 5.5. 디스플레이, 터치, 백라이트 인터페이스 { #55-display-touch-and-backlight-interfaces }

디스플레이 인터페이스 선택은 패키지 수준의 결정입니다. U 변형은 SPI/QSPI와 JDI 디스플레이 옵션을 문서화하고, V 변형은 MCU8080과 DPI 옵션도 문서화합니다. 터치 인터럽트, 리셋, 백라이트 제어는 웨이크업과 양산 접근을 고려하여 할당하는 것이 좋습니다.

<div align="center"><em>표 5.5-1: 디스플레이 드라이버 예시</em></div>

<div align="center" markdown>

| 모델 | 제조사 | 해상도 | 유형 | 인터페이스 |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | 3-line SPI, 4-line SPI, dual-data SPI, quad-data SPI, MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | 3-line SPI, 4-line SPI, dual-data SPI, quad-data SPI, 8-bit 8080-series MCU, MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | Quad-data SPI, MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | 3-line SPI, 4-line SPI, dual-data SPI, quad-data SPI, 8-bit 8080-series MCU, MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | Quad-data SPI |
| GC9C01 | Galaxycore | 360*360 | TFT | Quad-data SPI |
| ST77903 | Sitronix | 400*400 | TFT | Quad-data SPI |

</div>

<div align="center"><em>표 5.5-2: SF32LB56xU SPI/QSPI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| SPI 신호 | SF32LB56xU 핀 | SS6700A 핀 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | Enable 신호 |
| WRX_SCL | PA37 | PA37 | 클럭 신호 |
| DCX | PA39 | PA39 | 4-wire SPI 모드에서는 데이터/명령 신호, Quad-SPI 모드에서는 Data 1 |
| SDI_RDX | PA38 | PA38 | 3/4-wire SPI 모드에서는 데이터 입력 신호, Quad-SPI 모드에서는 Data 0 |
| SDO | PA38 | PA38 | 3/4-wire SPI 모드에서는 데이터 출력 신호. SDI_RDX와 단락하십시오 |
| D0 | PA40 | PA40 | Quad-SPI 모드에서는 Data 2 |
| D1 | PA41 | PA41 | Quad-SPI 모드에서는 Data 3 |
| REST | PA05 | PB04 | 디스플레이 패널 리셋 신호 |
| TE | PA33 | PA33 | MCU에 프레임을 알리는 티어링 이펙트 신호 |

</div>

<div align="center"><em>표 5.5-3: SF32LB56xU JDI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| JDI 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | 칩 셀렉트 신호 |
| JDI_SCLK | PA41 | 직렬 클럭 신호 |
| JDI_SO | PA40 | 직렬 데이터 출력 신호 |
| JDI_DISP | PA36 | 디스플레이 ON/OFF 전환 신호 |
| JDI_EXTCOMIN | PA38 | COM 반전 극성 입력 |

</div>

<div align="center"><em>표 5.5-4: SF32LB56xU 터치 및 백라이트 인터페이스</em></div>

<div align="center" markdown>

| 터치스크린 및 백라이트 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| Interrupt | PA50 | 터치 상태 인터럽트 신호(웨이크업 가능) |
| I2C1_SCL | PA48 | 터치스크린 I2C 클럭 신호 |
| I2C1_SDA | PA49 | 터치스크린 I2C 데이터 신호 |
| BL_PWM | PA31 | 백라이트 PWM 제어 신호 |
| Reset | PB18 | 터치 리셋 신호 |

</div>

<div align="center"><em>표 5.5-5: SF32LB56xV SPI/QSPI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| SPI 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| CSX | PA36 | Enable 신호 |
| WRX_SCL | PA37 | 클럭 신호 |
| DCX | PA39 | 4-wire SPI 모드에서는 데이터/명령 신호, Quad-SPI 모드에서는 Data 1 |
| SDI_RDX | PA38 | 3/4-wire SPI 모드에서는 데이터 입력 신호, Quad-SPI 모드에서는 Data 0 |
| SDO | PA38 | 3/4-wire SPI 모드에서는 데이터 출력 신호. SDI_RDX와 함께 단락 |
| D[0] | PA40 | Quad-SPI 모드에서는 Data 2 |
| D[1] | PA41 | Quad-SPI 모드에서는 Data 3 |
| REST | PA43 | 디스플레이 리셋 신호 |
| TE | PA33 | MCU에 프레임을 알리는 티어링 이펙트 신호 |

</div>

<div align="center"><em>표 5.5-6: SF32LB56xV MCU8080 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| MCU8080 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| CSX | PA36 | 칩 셀렉트 |
| WRX | PA37 | 데이터를 쓰기 위한 쓰기 스트로브 신호 |
| DCX | PA39 | 디스플레이 데이터/명령 선택 |
| RDX | PA38 | 데이터를 쓰기 위한 읽기 스트로브 신호 |
| D[0] | PA40 | Data 0 |
| D[1] | PA41 | Data 1 |
| D[2] | PA28 | Data 2 |
| D[3] | PA29 | Data 3 |
| D[4] | PA30 | Data 4 |
| D[5] | PA31 | Data 5 |
| D[6] | PA32 | Data 6 |
| D[7] | PA34 | Data 7 |
| REST | PA43 | 리셋 |
| TE | PA33 | MCU에 프레임을 알리는 티어링 이펙트 신호 |

</div>

<div align="center"><em>표 5.5-7: SF32LB56xV DPI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| DPI 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| CLK | PA45 | 클럭 신호 |
| DE | PA47 | 데이터 enable 신호 |
| HSYNC | PA44 | 수평 동기 신호 |
| VSYNC | PA42 | 수직 동기 신호 |
| SD | PA50 | 디스플레이 셧다운 제어 |
| CM | PA51 | Normal Color와 Reduced Color Mode 전환 |
| R0 | PA14 | 픽셀 신호 |
| R1 | PA13 | 픽셀 신호 |
| R2 | PA16 | 픽셀 신호 |
| R3 | PA24 | 픽셀 신호 |
| R4 | PA19 | 픽셀 신호 |
| R5 | PA21 | 픽셀 신호 |
| R6 | PA23 | 픽셀 신호 |
| R7 | PA25 | 픽셀 신호 |
| G0 | PA28 | 픽셀 신호 |
| G1 | PA30 | 픽셀 신호 |
| G2 | PA32 | 픽셀 신호 |
| G3 | PA33 | 픽셀 신호 |
| G4 | PA34 | 픽셀 신호 |
| G5 | PA29 | 픽셀 신호 |
| G6 | PA31 | 픽셀 신호 |
| G7 | PA35 | 픽셀 신호 |
| B0 | PA36 | 픽셀 신호 |
| B1 | PA37 | 픽셀 신호 |
| B2 | PA38 | 픽셀 신호 |
| B3 | PA43 | 픽셀 신호 |
| B4 | PA41 | 픽셀 신호 |
| B5 | PA39 | 픽셀 신호 |
| B6 | PA40 | 픽셀 신호 |
| B7 | PA46 | 픽셀 신호 |

</div>

<div align="center"><em>표 5.5-8: SF32LB56xV JDI 병렬 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| JDI 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | 수직 드라이버용 시프트 클럭 |
| JDI_VST | PA40 | 수직 드라이버용 시작 신호 |
| JDI_XRST | PA39 | 수평 및 수직 드라이버용 리셋 신호 |
| JDI_HCK | PA36 | 수평 드라이버용 시프트 클럭 |
| JDI_HST | PA38 | 수평 드라이버용 시작 신호 |
| JDI_ENB | PA43 | 픽셀 메모리 쓰기 enable 신호 |
| JDI_R1 | PA29 | 적색 이미지 데이터(홀수 픽셀) |
| JDI_R2 | PA31 | 적색 이미지 데이터(짝수 픽셀) |
| JDI_G1 | PA34 | 녹색 이미지 데이터(홀수 픽셀) |
| JDI_G2 | PA32 | 녹색 이미지 데이터(짝수 픽셀) |
| JDI_B1 | PA30 | 청색 이미지 데이터(홀수 픽셀) |
| JDI_B2 | PA28 | 청색 이미지 데이터(짝수 픽셀) |
| JDI_XFRP | PBR1 | 액정 구동 신호("On" 픽셀) |
| JDI_VCOM/FRP | PBR2 | 공통 전극 구동 신호/액정 구동 신호("Off" 픽셀) |

</div>

<div align="center"><em>표 5.5-9: SF32LB56xV JDI 직렬 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| JDI 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | 칩 셀렉트 신호 |
| JDI_SCLK | PA41 | 직렬 클럭 신호 |
| JDI_SO | PA40 | 직렬 데이터 출력 신호 |
| JDI_DISP | PA36 | 디스플레이 ON/OFF 전환 신호 |
| JDI_EXTCOMIN | PA38 | COM 반전 극성 입력 |

</div>

<div align="center"><em>표 5.5-10: SF32LB56xV 터치 및 백라이트 인터페이스</em></div>

<div align="center" markdown>

| 터치스크린 및 백라이트 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| Interrupt | PA50 | 터치 상태 인터럽트 신호(웨이크업 가능) |
| I2C1_SCL | PA48 | 터치스크린 I2C 클럭 신호 |
| I2C1_SDA | PA49 | 터치스크린 I2C 데이터 신호 |
| BL_PWM | PA35 | 백라이트 PWM 제어 신호 |
| Reset | PA44 | 터치 리셋 신호 |

</div>

### 5.6. 스토리지, 센서, 오디오, 연결 { #56-storage-sensors-audio-and-connectivity }

스토리지 버스와 디스플레이 버스는 둘 다 가치가 높은 GPIO 그룹을 사용하고 PCB 스택업 결정에도 영향을 줄 수 있으므로 서로 독립적으로 할당하지 않는 것이 좋습니다. 회로도를 확정하기 전에 부트 스토리지 유형, 풀업, 전압 도메인, 전원 스위치 동작, 픽스처 접근을 확인하십시오.

<div align="center"><em>표 5.6-1: SF32LB56xU QSPI 플래시 인터페이스</em></div>

<div align="center" markdown>

| 플래시 신호 | I/O 신호 | 상세 설명 |
| :--- | :--- | :--- |
| CS# | PA06 | 칩 셀렉트, active low. |
| SO | PA07 | 데이터 입력(Data Input Output 1) |
| WP# | PA08 | 쓰기 보호 출력(Data Input Output 2) |
| SI | PA09 | 데이터 출력(Data Input Output 0) |
| SCLK | PA10 | 직렬 클럭 출력 |
| Hold# | PA11 | 데이터 출력(Data Input Output 3) |

</div>

<div align="center"><em>표 5.6-2: SF32LB56xU SDIO 플래시 인터페이스</em></div>

<div align="center" markdown>

| 플래시 신호 | I/O 신호 | 상세 설명 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | 명령 신호 |
| SD2_D1 | PA11 | Data 1 |
| SD2_D0 | PA10 | Data 0 |
| SD2_CLK | PA08 | 클럭 신호 |
| SD2_D2 | PA06 | Data 2 |
| SD2_D3 | PA07 | Data 3 |

</div>

<div align="center"><em>표 5.6-3: SF32LB56xV QSPI 플래시 인터페이스</em></div>

<div align="center" markdown>

| 플래시 신호 | I/O 신호 | 상세 설명 |
| :--- | :--- | :--- |
| CS# | PA06 | 칩 셀렉트, active low. |
| SO | PA07 | 데이터 입력(Data Input Output 1) |
| WP# | PA08 | 쓰기 보호 출력(Data Input Output 2) |
| SI | PA09 | 데이터 출력(Data Input Output 0) |
| SCLK | PA10 | 직렬 클럭 출력 |
| Hold# | PA11 | 데이터 출력(Data Input Output 3) |

</div>

<div align="center"><em>표 5.6-4: SF32LB56xV SDIO 플래시 인터페이스</em></div>

<div align="center" markdown>

| 플래시 신호 | I/O 신호 | 상세 설명 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | 명령 신호 |
| SD2_D1 | PA11 | Data 1 |
| SD2_D0 | PA10 | Data 0 |
| SD2_CLK | PA08 | 클럭 신호 |
| SD2_D2 | PA06 | Data 2 |
| SD2_D3 | PA07 | Data 3 |

</div>

<div align="center"><em>표 5.6-5: SF32LB56xV eMMC 인터페이스</em></div>

<div align="center" markdown>

| eMMC 신호 | I/O 신호 | 상세 설명 |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | 명령 신호 |
| SD1_CLK | PA26 | 클럭 신호 |
| SD1_D0 | PA22 | Data 0 |
| SD1_D1 | PA15 | Data 1 |
| SD1_D2 | PA12 | Data 6 |
| SD1_D3 | PA20 | Data 3 |
| SD1_D4 | PA21 | Data 4 |
| SD1_D5 | PA19 | Data 5 |
| SD1_D6 | PA13 | Data 6 |
| SD1_D7 | PA14 | Data 7 |

</div>

!!! warning "SF32LB56xV SD1 데이터선 매핑 확인"
    SiFli 원본은 PA12를 SD1_D2로 표기하면서 설명은 `Data 6`으로 적고 있으며, SD1_D6도 `Data 6`으로 표기하고 `Data 2` 행은 없습니다. 라우팅하기 전에 릴리스된 핀먹스 문서로 의도된 핀 매핑을 확인하십시오. 이 표는 SiFli가 게시한 항목을 그대로 유지합니다.

<div align="center"><em>표 5.6-6: 센서 I2C 인터페이스</em></div>

<div align="center" markdown>

| I2C 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| SDA | PA18 | 광 추적 센서 I2C 데이터 신호 |
| SCL | PA17 | 광 추적 센서 I2C 클럭 신호 |

</div>

스토리지 I/O 전원은 연결된 메모리의 로직 레벨에 맞추십시오. U 변형의 스토리지 I/O는 VDDIO3를 사용하고, V 변형의 스토리지 I/O는 VDDIOA2를 사용합니다. SPI NAND 플래시의 Hold# 핀은 10kΩ 저항을 통해 전원으로 풀업하십시오. SD1/eMMC는 V 변형에서 사용할 수 있으며, V 변형의 SD1/eMMC 핀 표를 U 변형에 적용해서는 안 됩니다. U 변형은 SD2 스토리지 인터페이스를 사용합니다.

<div align="center"><em>표 5.6-7: SF32LB56xU 오디오 인터페이스</em></div>

<div align="center" markdown>

| 오디오 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 차동 P 또는 싱글 엔디드 아날로그 MIC 입력 |
| AU_ADC1N | ADCN | 차동 아날로그 MIC 입력 N 또는 GND |
| AU_DAC1P | DACP | 차동 아날로그 출력 P |
| AU_DAC1N | DACN | 차동 아날로그 출력 N |

</div>

<div align="center"><em>표 5.6-8: SF32LB56xV 오디오 인터페이스</em></div>

<div align="center" markdown>

| 오디오 신호 | I/O | 상세 설명 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 차동 P 또는 싱글 엔디드 아날로그 MIC 입력 |
| AU_ADC1N | ADCN | 차동 아날로그 MIC 입력 N 또는 GND |
| AU_DAC1P | DACP | 차동 아날로그 출력 P |
| AU_DAC1N | DACN | 차동 아날로그 출력 N |
| I2S1_LRCK | PA71 | I2S2 프레임 클럭 |
| I2S1_SDI | PA69 | I2S2 데이터 입력 |
| I2S1_SDO | PA64 | I2S2 데이터 출력 |
| I2S1_BCK | PA73 | I2S2 비트 클럭 |

</div>

!!! warning "V 변형 I2S 인스턴스 확인"
    SiFli 핀 표와 회로도 넷 레이블은 이 핀들을 I2S1_LRCK/SDI/SDO/BCK로 식별하지만, 표의 설명은 I2S2 신호라고 부릅니다. 주변 장치 인스턴스는 확정되지 않은 것으로 취급하고, 이 핀을 할당하기 전에 릴리스된 핀먹스 문서로 확인하십시오.

외부 차동 아날로그 마이크에는 ADC 입력에 2.2µF 이상의 DC 차단 커패시터를 배치하고 MIC_BIAS로 마이크에 전원을 공급하십시오. U 변형의 MEMS 마이크 레퍼런스는 1kΩ을 통해 MIC_BIAS를 공급하고 4.7µF 바이패스 커패시터를 사용하며, 마이크 출력 레퍼런스에는 0.01µF 커플링 커패시터도 나타납니다. U 변형의 아날로그 PA 레퍼런스는 33nF 입력 커플링 커패시터를 사용하며, 차동 로우패스 필터를 칩 가까이에 둡니다. 아날로그 DAC 출력은 가드된 차동 쌍으로 라우팅하고, 기생 커패시턴스는 10pF 미만, 트레이스 길이는 2cm 미만으로 유지하십시오. V 변형은 I2S도 제공하며, 해당 레퍼런스 I2S 앰프는 I2C3으로 구성합니다. 오디오 전원/레퍼런스 커패시터는 핀 가까이에 배치하고, 아날로그 오디오는 스위처와 고속 디지털 신호로부터 멀리 라우팅하십시오.

두 변형 모두 진동 모터용 PWM을 제공합니다. 모터의 시동 전류가 시스템을 불안정하게 만들지 않는다면 모터에 VBAT에서 직접 전원을 공급할 수 있습니다. `BSP_PM_FREQ_SCALING`이 `1`로 정의되면 HCPU 주파수 스케일링이 PA 핀의 PWM 주파수를 바꾸므로, 이 경우에는 PB 핀을 사용하십시오. PB32는 active-high 전원/리셋 입력이며, 10초 이상 길게 누르면 리셋이 트리거됩니다. U 변형 레퍼런스는 VDDIOB에서 1kΩ을 거쳐 키를 연결하고 그라운드로 10kΩ 풀다운과 0.1µF 커패시터를 추가합니다. V 변형 레퍼런스는 VDD_1V8에서 1kΩ 직렬 저항과 10kΩ 풀다운을 사용합니다. 그 밖의 버튼과 로터리 엔코더에는 풀업이 필요하며, 회전 후 off 상태로 돌아오지 않는 기계식 엔코더는 누설을 막기 위해 standby에서 풀업 레일을 스위칭할 수 있어야 합니다.

U는 PBR0~PBR2를, V는 PBR0~PBR3을 제공합니다. PBR0은 시동 중에 low에서 high로 전환되며 외부 로드 스위치를 제어할 수 있고, 나머지 PBR 핀은 기본적으로 low입니다. PBR 핀은 Standby와 Hibernate에서 출력할 수 있고 LPTIM을 전달할 수 있으며, PBR0을 제외한 모든 핀이 32kHz 클럭을 출력할 수 있습니다. PBR 핀은 웨이크업 입력으로도 구성할 수 있지만, 웨이크업 후에는 MCU가 해당 입력의 인터럽트를 받을 수 없습니다. 센서 I2C, SPI, 제어, 인터럽트 웨이크업 신호에는 LCPU PB 핀을 우선 사용하십시오. 센서 전원은 필요에 따라 SF30147C의 LVSW 또는 LDO 출력으로 스위칭할 수 있습니다.

U/V의 모든 PA 핀은 UART, I2C, GPTIM으로 먹싱할 수 있습니다. U에서는 PB32/PB33/PB34와 PBR0/PBR1/PBR2가 예외이고, V에서는 PB32~PB36과 PBR0~PBR3이 예외입니다. 이러한 제약은 웨이크업, 버튼, PBR 할당과 함께 검토하십시오.

### 5.7. 양산 { #57-manufacturing }

디버그/플래싱 접근, 양산 다운로드 모드, 크리스털 캘리브레이션 접근, 전력 측정 포인트, RF 테스트 접근, PMIC 제어 가시성을 확보해 두십시오. 픽스처가 보드에 전원을 공급하고, 부트/다운로드 모드를 강제하고, 칩과 통신하고, 캘리브레이션 데이터를 수집할 수 있는지 확인하십시오.

U 변형에서는 최소한 VBAT, GND, VDDIO2, Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD, 그리고 PB20/PB21/PB25 중 하나를 테스트 포인트로 확보하십시오. V에서는 VDDIO2 대신 VDDIOB를 사용하며 나머지 신호는 같습니다. J-Link를 연결할 때는 디버거 전원을 외부 입력으로 설정하여 타깃 보드가 디버거에 전원을 공급하게 하십시오. 양산 플래싱 및 크리스털 캘리브레이션 픽스처는 이 포인트들에 접근할 수 있어야 합니다.

<div align="center"><em>표 5.7-1: SF32LB56xU 디버그 및 플래싱 인터페이스</em></div>

<div align="center" markdown>

| 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| SWCLK | PB15 | JLINK 클럭 신호, 디버그 인터페이스 |
| SWDIO | PB13 | JLINK 데이터 신호, 디버그 인터페이스 |
| UART4_RXD | PB16 | UART 수신 신호, 플래싱 및 로그 출력 인터페이스 |
| UART4_TXD | PB17 | UART 송신 신호, 플래싱 및 로그 출력 인터페이스 |

</div>

<div align="center"><em>표 5.7-2: SF32LB56xV 디버그 및 플래싱 인터페이스</em></div>

<div align="center" markdown>

| 신호 | 핀 | 상세 설명 |
| :--- | :--- | :--- |
| SWCLK | PB15 | JLINK 클럭 신호, 디버그 인터페이스 |
| SWDIO | PB13 | JLINK 데이터 신호, 디버그 인터페이스 |
| UART4_RXD | PB16 | UART 수신 신호, 플래싱 및 로그 출력 인터페이스 |
| UART4_TXD | PB17 | UART 송신 신호, 플래싱 및 로그 출력 인터페이스 |

</div>
