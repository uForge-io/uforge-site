---
icon: lucide/list-checks
description: "패키지, 전원, 클럭, RF, 스토리지, 디스플레이, 제조 점검을 포함하는 SF32LB52x MCU의 항목별 회로도 검토 체크리스트입니다."
hide:
    - navigation
tags:
    - 하드웨어
    - 칩
    - 체크리스트
---

# SF32LB52x 하드웨어 설계 가이드 — 회로도 체크리스트 { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB52x 하드웨어 설계 가이드의 일부"
    이 페이지는 항목별 회로도 체크리스트인 5.8절을 다룹니다. 회로도 설계 가이드라인 세 페이지 중 첫 번째인 [최소 시스템, 전원 및 클럭](SF32LB52x_schematic_design.md)으로 돌아가십시오.

## 5.8. 회로도 체크리스트 { #58-schematic-checklist }

아래 각 표는 회로도의 기능 블록 하나를 다룹니다. 적용 대상 열은 일반적인 "모든 변형" 범위가 성립하지 않는 경우에 점검 항목을 특정 SF32LB52x 전원 변형(variant)이나 실리콘 리비전으로 한정합니다.

"필수"는 해당하는 점검 항목을 반드시 검토해야 한다는 뜻이며, 나열된 모든 주변 장치를 실장해야 한다는 뜻은 아닙니다. 조건부 점검 항목은 해당 회로 또는 기능이 있을 때만 검토하십시오. 원본의 필수/선택 구분을 유지하고, 권장 사항과 필수 한계를 구분하십시오.

### 5.8.1. 패키지 { #581-package }

<div align="center"><em>표 5.8.1-1: 패키지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 선택한 부품 번호의 패키지가 핀 이름과 핀 번호를 포함해 올바릅니다 | 모든 변형 | 필수 |

</div>

### 5.8.2. 전원 { #582-power-supply }

<div align="center"><em>표 5.8.2-1: 전원 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | VBUS 공급 전압이 <span class="flag-red">4.6~5.5 V</span>입니다 | 520/3/5/7 전용 | 필수 |
| 2 | 충전기를 연결하는 즉시 화면이 켜져야 하는 경우 내부 충전기는 권장하지 않으며, 전원 경로 관리 기능이 있는 외부 충전기 IC를 우선 사용합니다 | 520/3/5/7 전용 | 필수 |
| 3 | 소프트웨어가 화면을 켜기 전에 3.6 V까지 충전해야 한다는 조건이 허용되는 경우에만 내부 충전기를 사용할 수 있습니다 | 520/3/5/7 전용 | 필수 |
| 4 | LDO 출력을 내장한 OVP 소자(예: LP5305AQVF)를 권장합니다. LDO 출력은 4.7~5.4 V, 부하 용량은 ≥0.5 A, 과전류 보호 동작 값은 ≥0.7 A입니다 | 520/3/5/7 전용 | 필수 |
| 5 | OVP 소자에 조정 가능한 OVLO가 있으면 허용 오차 1%의 분압 저항을 사용하고 V_OVLO_TH 오차를 3% 미만으로 유지하십시오. V_OVP의 최솟값과 최댓값은 모두 5.15~5.55 V 범위 안에 있어야 합니다. 원본은 5.15 V를 충전기의 최대 입력 전압으로, 5.55 V를 52x 충전기의 입력 상한으로 표기합니다. 아래의 불일치 참고를 확인하십시오 | 520/3/5/7 전용 | 필수 |
| 6 | 온칩 충전기를 사용하지 않으면 VBUS를 연결하지 않고 해당 커패시터를 생략할 수 있습니다. 다만 이 경우 VBAT의 출력 능력이 사라지므로 VBAT에 1 uF 외부 커패시터를 사용합니다 | 520/3/5/7 전용 | 필수 |
| 7 | 배터리 전압 감지: 칩이 이미 내부 GPADC 채널을 VBAT(또는 VBATS)에 연결해 두었으므로 VBAT를 GPADC 핀에 추가로 연결하지 않습니다 | 모든 변형 | 필수 |
| 8 | <span class="flag-red">VCC 및 VBAT 핀 공급 전압이 3.2~4.7 V입니다</span> | 520/3/5/7 전용 | 필수 |
| 9 | BUCK_LX와 BUCK_FB 연결이 올바릅니다 | 모든 변형 | 필수 |
| 10 | VDD_VOUT1 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 11 | VDD_VOUT2 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 12 | VDD_RET 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 13 | VDD_RTC 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 14 | AVDD_BRF는 VSYS를 통해 전원을 공급받습니다 | 520/3/5/7 전용 | 필수 |
| 15 | AVDD33_AUD는 LDO2를 통해 전원을 공급받습니다 | 520/3/5/7 전용 | 필수 |
| 16 | VSYS는 MCU 내부용 전원이므로 다른 주변 장치에 전원을 공급하는 데 사용하지 않습니다 | 520/3/5/7 전용 | 필수 |
| 17 | 메모리, 센서 등의 주변 장치에는 LDO2_OUT 사용을 권장하며, 전원 제어를 위해 로드 스위치를 추가할 수 있습니다 | 520/3/5/7 전용 | 필수 |
| 18 | <span class="flag-red">LDO2로 전원을 공급받는 모든 주변 장치의 피크 전류 합계가 150 mA 이하입니다</span> | 520/3/5/7 전용 | 필수 |
| 19 | 진동 모터의 전원은 LDO3_OUT으로 공급하기를 권장합니다 | 520/3/5/7 전용 | 필수 |
| 20 | <span class="flag-red">LDO3로 전원을 공급받는 모든 주변 장치의 피크 전류 합계가 150 mA 이하입니다</span> | 520/3/5/7 전용 | 필수 |
| 21 | LCD에는 Iq가 낮은 전용 LDO 전원이 필요합니다 | 모든 변형 | 필수 |
| 22 | 심박 센서 LED의 전원은 VBAT로 공급하기를 권장합니다 | 모든 변형 | 필수 |
| 23 | 충전 입력에는 OVP 회로가 필요합니다 | 모든 변형 | 필수 |
| 24 | 배터리 전압이 너무 낮은 상태에서 충전기 입력으로 5 V가 공급되어 전원 경로 관리가 필요한 경우, 전원 경로 관리 기능이 있는 충전기 IC를 권장합니다. <span class="flag-red">VCC로 들어가는 전압은 4.7 V를 넘으면 안 됩니다</span> | 520/3/5/7 전용 | 필수 |
| 25 | <span class="flag-red">SF32LB52DUB6: PVDD = 1.8 V</span> | 52D 전용 | 필수 |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6: PVDD = 3.3 V</span> | 52B/E/G/J | 필수 |
| 27 | <span class="flag-red">SF32LB52BU36 및 SF32LB52BU56: VDD_SIP에 외부 3.3 V 전원이 필요합니다</span> | 52B 전용 | 필수 |
| 28 | <span class="flag-red">SF32LB52DUB6: VDD_SIP에 외부 1.8 V 전원이 필요합니다</span> | 52D 전용 | 필수 |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6: VDD_SIP에는 외부 전원이 필요 없으며 외부 커패시터만 있으면 됩니다</span> | 52E/G/J | 필수 |
| 30 | VBATS는 배터리 전압 감지 신호이며, 배터리 전압 감지 범위는 0~4.5 V입니다 | 52B/D/E/G/J | 필수 |

</div>

!!! important "OVP 임계값은 VBUS 동작 한계가 아닙니다"
    원본 체크리스트는 5번 행에서 조정 가능한 OVLO 선택 기준으로 5.15~5.55 V를 제시하는 반면, 1번 행은 워크북의 VBUS 점검 값인 4.6~5.5 V를 그대로 옮긴 것입니다. 5.55 V를 VBUS에서 허용되는 연속 전압으로 해석하지 마십시오. [전원 시스템 설명](SF32LB52x_schematic_design.md#52-power-system)에서 원본 간 차이를 설명하며, 애플리케이션 노트가 제시하는 OVP 선택 범위는 이와 다릅니다. 설계를 승인하기 전에 선택한 디바이스의 임계값과 동작 한계를 SiFli에 확인하십시오.

!!! note "VBUS 값의 출처와 범위"
    Electrical Specification-A3은 VBUS 공급 범위를 4.5~5.5 V로 제시합니다. 배터리 전원 변형의 애플리케이션 노트는 공급 표에서 4.6~5.5 V를 제시하고, 최대 충전 전류에서 VBUS 핀에 최소 4.6 V가 필요하다고 규정합니다. 이 값들은 적용 맥락이 서로 다르므로, 칩에서의 최소 전압을 점검할 때 공급 전압 허용 오차와 전압 강하를 고려하십시오.

### 5.8.3. 전원 커패시터 및 인덕터 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>표 5.8.3-1: 전원 커패시터 및 인덕터 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | VBUS 커패시터 ≥10 uF | 520/3/5/7 전용 | 필수 |
| 2 | VBAT 커패시터 ≥4.7 uF | 520/3/5/7 전용 | 필수 |
| 3 | SF32LB523/5/7에서 24번 핀은 VCC이며 외부 커패시터는 ≥10 uF입니다 | 523/5/7 | 필수 |
| 4 | 523/5/7/B/D/E/G/J 변형에서 <span class="flag-red">23번 핀은 VDD_SIP이며 외부 커패시터는 ≥2.2 uF입니다</span> | 523/5/7/B/D/E/G/J | 필수 |
| 5 | SF32LB520에서 24번 핀은 GPIO인 PA21입니다 | 520/SS6500 | 필수 |
| 6 | SF32LB520에서 23번 핀은 VCC이며 외부 커패시터는 ≥10 uF입니다 | 520/SS6500 | 필수 |
| 7 | BUCK_FB 커패시터 = 4.7 uF | 모든 변형 | 필수 |
| 8 | VDD_VOUT1 커패시터 = 4.7 uF | 모든 변형 | 필수 |
| 9 | VDD_VOUT2 커패시터 = 4.7 uF | 모든 변형 | 필수 |
| 10 | VDD_RET 커패시터 = 0.47 uF | 모든 변형 | 필수 |
| 11 | VDD_RTC 커패시터 = 1 uF | 모든 변형 | 필수 |
| 12 | <span class="flag-red">VDD33_VOUT1 총 커패시턴스 ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 전용</span> | 필수 |
| 13 | <span class="flag-red">VDD33_VOUT2 총 커패시턴스 ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 전용</span> | 필수 |
| 14 | <span class="flag-red">VSYS 총 커패시턴스 ≤9.6 uF</span> | <span class="flag-red">520/3/5/7 전용</span> | 필수 |
| 15 | MIC_BIAS 커패시터 = 1 uF | 모든 변형 | 필수 |
| 16 | <span class="flag-red">AVDD_BRF 커패시터 = 4.7 uF</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 17 | <span class="flag-red">AVDD33_AUD 커패시터 = 2.2 uF</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 18 | AUD_VREF 커패시터 = 1 uF | 모든 변형 | 필수 |
| 19 | <span class="flag-red flag-yellow">VSYS 커패시터 = 4.7 uF</span> | <span class="flag-red flag-yellow">520/3/5/7 전용</span> | 필수 |
| 20 | GPADC VREFP 커패시터 = 4.7 uF | 모든 변형 | 필수 |
| 21 | BUCK 인덕터가 [SiFli 승인 업체 목록(AVL)][SiFli Approved Vendor List]에 등재된 부품 번호입니다 | 모든 변형 | 필수 |
| 22 | BUCK 인덕터가 AVL에 등재되지 않은 경우 L = 4.7 uH, DCR ≤0.4 Ω, Isat ≥450 mA를 충족합니다 | 모든 변형 | 필수 |
| 23 | <span class="flag-red">GPS 또는 간섭에 민감한 다른 주변 장치가 있으면 BUCK_LX에 그라운드로 연결되는 커패시터의 풋프린트를 확보해 둡니다. 값은 실제 테스트 결과에 따라 달라집니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 24 | <span class="flag-red">선택한 DCDC의 정지 전류를 기록했으며 프로젝트 요구 사항을 충족합니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 25 | <span class="flag-red">선택한 LDO의 정지 전류를 기록했으며 프로젝트 요구 사항을 충족합니다</span> | <span class="flag-red">모든 변형</span> | 필수 |

</div>

!!! note "원본 체크리스트의 24번 핀 범위"
    커패시터 3번 행은 점검 항목 텍스트에 SF32LB520/3/5/7을 명시하지만, 적용 대상 열은 523/5/7만 지정합니다. 반면 5번과 6번 행은 SF32LB520의 24번 핀을 PA21로, 23번 핀을 VCC로 식별합니다. 이 표는 3번 행에 명시된 더 좁은 적용 범위를 따릅니다. 검토를 승인하기 전에 해당 부품의 핀 배치를 확인하십시오.

### 5.8.4. 클럭 { #584-clock }

<div align="center"><em>표 5.8.4-1: 클럭 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 메인 48 MHz 크리스털이 AVL에 등재된 부품 번호입니다 | 모든 변형 | 필수 |
| 2 | 48 MHz 크리스털이 AVL에 등재되지 않은 경우 7 pF ≤ CL ≤ 12 pF(8.8 pF 권장), 주파수 허용 오차 ≤±10 ppm, ESR ≤30 Ω(22 Ω 권장)을 충족합니다 | 모든 변형 | 필수 |
| 3 | RTC 32.768 kHz 크리스털이 AVL에 등재된 부품 번호입니다 | 모든 변형 | 필수 |
| 4 | 32.768 kHz 크리스털이 AVL에 등재되지 않은 경우 CL ≤12.5 pF(7 pF 권장), 주파수 허용 오차 ≤±20 ppm, ESR ≤80 kΩ(38 kΩ 권장)을 충족합니다 | 모든 변형 | 필수 |
| 5 | 52x에서 PA24/25/26/27은 모두 xtal32k 클럭을 출력할 수 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.5. 부트스트랩 구성 { #585-bootstrap-configuration }

<div align="center"><em>표 5.8.5-1: 부트스트랩 구성 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 외부 <span class="flag-purple">SPI NOR 플래시를 사용하는 경우 PA13과 PA17에는 풀업이 필요 없습니다</span> | 모든 변형 | 필수 |
| 2 | 외부 <span class="flag-red">SPI NAND 플래시</span>를 사용하는 경우 PA13에는 풀업이 필요 없으며, <span class="flag-red">PA17에는 7.5 kΩ 풀업이 필요하고</span> 풀업 전원은 플래시의 VDD입니다 | 모든 변형 | 필수 |
| 3 | 외부 <span class="flag-blue">SD NAND 플래시</span>를 사용하는 경우 PA17에는 풀업이 필요 없으며, <span class="flag-blue">PA13에는 7.5 kΩ 풀업이 필요하고</span> 풀업 전원은 플래시의 VDD입니다 | 모든 변형 | 필수 |
| 4 | <span class="flag-green">eMMC를 사용하는 경우 PA13과 PA17 모두에 7.5 kΩ 풀업이 필요하며</span> 풀업 전원은 eMMC의 VCCQ입니다 | <span class="flag-red">52D/E/G/J</span> | 필수 |

</div>

### 5.8.6. RF { #586-rf }

<div align="center"><em>표 5.8.6-1: RF 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | ANT 신호에 싱글 엔디드 50 Ω 특성 임피던스 요구 사항을 표기했습니다 | 모든 변형 | 필수 |
| 2 | ANT 신호에 파이형 매칭 회로를 확보해 둡니다: 병렬 NC(미실장) 커패시터와 직렬 15 pF 커패시터 | 모든 변형 | 필수 |
| 3 | 스퓨리어스 방사 필터링을 고려해야 하는 경우 직렬 2.7 nH 인덕터와 병렬 2 pF 커패시터로 파이형 매칭 회로를 확보해 둡니다 | 모든 변형 | 선택 |
| 4 | <span class="flag-red">외부 PA/LNA 제어가 필요한 경우 PA00은 RX_EN에, PA01은 TX_EN에 연결합니다</span> | 모든 변형 | 선택 |

</div>

### 5.8.7. I/O 리소스 할당 { #587-io-resource-allocation }

<div align="center"><em>표 5.8.7-1: I/O 리소스 할당 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 회로도와 일치하는 GPIO 리소스 할당표를 제공했습니다 | 모든 변형 | 필수 |
| 2 | 리소스 표의 GPIO 할당이 회로도와 일치합니다 | 모든 변형 | 필수 |
| 3 | 실제 GPIO 할당이 SiFli의 권장 사항을 따릅니다(HDK I/O config 파일 참조) | 모든 변형 | 필수 |

</div>

### 5.8.8. 하드웨어 웨이크업 { #588-hardware-wake-up }

<div align="center"><em>표 5.8.8-1: 하드웨어 웨이크업 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">웨이크업 인터럽트 소스가 올바릅니다(사용 가능한 웨이크업 인터럽트 소스: PA24~PA27 및 PA34~PA44, 총 15개 핀)</span> | <span class="flag-red">모든 변형</span> | 필수 |

</div>

### 5.8.9. 스토리지 { #589-storage }

<div align="center"><em>표 5.8.9-1: 스토리지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | MPI2(SD1)를 SPI NOR 플래시에 연결하는 경우: <span class="flag-red">PA13(MPI D1)과 PA17(MPI D3) 모두 풀업이 필요 없습니다</span> | 모든 변형 | 필수 |
| 2 | MPI2(SD1)를 SPI NAND 플래시에 연결하는 경우: <span class="flag-red">PA13(MPI D1)에는 풀업이 필요 없으며, PA17(MPI D3)에는 반드시 7.5 kΩ 풀업이 있어야 합니다</span> | 모든 변형 | 필수 |
| 3 | MPI2(SD1)를 SD NAND 플래시에 연결하는 경우: <span class="flag-red">PA13(SD D3)에는 반드시 7.5 kΩ 풀업이 있어야 하고, PA17(SD D1)에는 풀업이 필요 없으며, PA15(SD CMD)에는 반드시 7.5 kΩ 풀업이 있어야 합니다</span> | 모든 변형 | 필수 |
| 4 | MPI2(SD1)를 eMMC에 연결하는 경우: <span class="flag-red">PA13(SD D3)과 PA17(SD D1) 모두 반드시 7.5 kΩ 풀업이 있어야 하며, PA15(SD CMD)에도 반드시 7.5 kΩ 풀업이 있어야 합니다</span> | <span class="flag-red">52D/E/G/J</span> | 필수 |
| 5 | SF32LB520과 SF32LB52B의 외부 스토리지는 반드시 SPI NOR 플래시여야 합니다 | 520/B | 필수 |
| 6 | 셧다운 소비 전력이 중요한 경우 <span class="flag-red">외부 플래시 전원을 반드시 PA11로 스위칭해야 하며</span>, high는 활성화, low는 비활성화입니다 | 520/3/5/7 전용 | 필수 |
| 7 | 셧다운 소비 전력이 중요한 경우 <span class="flag-red">외부 플래시 전원을 반드시 PA21로 스위칭해야 하며</span>, high는 활성화, low는 비활성화입니다 | <span class="flag-red">52B/D/E/G/J</span> | 필수 |
| 8 | 셧다운 소비 전력이 중요한 경우 <span class="flag-red">VDD_SIP 전원을 반드시 PA21로 스위칭해야 하며</span>, high는 활성화, low는 비활성화입니다 | <span class="flag-red">52B/D/E/G/J</span> | 필수 |
| 9 | <span class="flag-red">MPI가 32 MB 이상의 NOR 플래시를 구동하는 경우, 플래시 전원을 끌 수 있도록 PA21로 플래시 전원을 스위칭할 수 있어야 합니다</span> | <span class="flag-red">52B/D/E/G/J</span> | 필수 |
| 10 | SD1을 SD NAND 디바이스에 연결하는 경우 신호 연결이 올바릅니다 | 모든 변형 | 필수 |
| 11 | <span class="flag-red">플래시 CLK와 데이터 라인에 33 Ω 직렬 저항이 있습니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 12 | <span class="flag-red">외부 NOR 플래시 두 개를 사용하는 경우 CLK/D0~D3은 공유하며, 플래시 1의 CS는 PA12를, 플래시 2의 CS는 내부 풀업 핀인 PA26을 사용합니다. 이 핀은 리셋 시 기본값이 high(비선택)이므로 active-low CS 신호에 적합합니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 13 | <span class="flag-red">외부 NOR 플래시 두 개를 사용하는 경우 첫 번째는 16 MB여야 하며, 두 번째는 8 MB 또는 16 MB일 수 있습니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 14 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |
| 15 | <span class="flag-red">선택한 NOR 플래시 부품이 핵심 부품 선정 가이드에 인증된 부품으로 등재되어 있습니다. 그렇지 않으면 ROM이 인식하지 못해 시스템이 부팅되지 않을 수 있습니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 16 | <span class="flag-red">선택한 SPI/SD NAND 플래시 부품이 핵심 부품 선정 가이드에 인증된 부품으로 등재되어 있습니다. 그렇지 않으면 ROM이 인식하지 못해 시스템이 부팅되지 않을 수 있습니다</span> | <span class="flag-red">모든 변형</span> | 필수 |

</div>

### 5.8.10. 디스플레이 { #5810-display }

<div align="center"><em>표 5.8.10-1: 디스플레이 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | QSPI 디스플레이에 연결하는 경우 신호 연결이 올바릅니다 | 모든 변형 | 필수 |
| 2 | 8080 인터페이스 디스플레이에 연결하는 경우 신호 연결이 올바릅니다 | 모든 변형 | 필수 |
| 3 | JDI 디스플레이에 연결하는 경우 신호 연결이 올바릅니다 | 모든 변형 | 필수 |
| 4 | LCD QSPI 신호 연결이 올바르며, <span class="flag-red">CLK와 데이터 라인에 100 Ω 직렬 저항이 있습니다</span> | 모든 변형 | 필수 |
| 5 | LCD RSTB 연결이 올바릅니다(PA0 권장) | 모든 변형 | 필수 |
| 6 | LCDC TE 연결이 올바릅니다(패널의 TE 또는 Fmark 신호에 연결) | 모든 변형 | 필수 |
| 7 | TP 신호가 권장 핀 할당을 따릅니다(EVB I/O config 파일 참조) | 모든 변형 | 필수 |
| 8 | Always-on 디스플레이 지원 요구 사항을 확인했습니다 | 모든 변형 | 필수 |
| 9 | Iq가 낮은 LDO가 디스플레이에 전원을 공급하며, <span class="flag-red">LDO 활성화 제어에는 PA30 사용을 권장합니다</span> | 모든 변형 | 필수 |
| 10 | TP와 LCD 전원의 독립성 요구 사항(공유 제어 또는 개별 제어)을 확인했습니다 | 모든 변형 | 필수 |
| 11 | LCD에 조도 센서가 통합된 경우 조도 센서의 전원도 함께 공급합니다 | 모든 변형 | 필수 |
| 12 | TFT LCD 백라이트 제어: 백라이트가 high 신호에서 켜지고 low 신호에서 꺼지는 경우(active-high) 풀다운(PD) GPIO를 사용하고, low 신호에서 켜지고 high 신호에서 꺼지는 경우(active-low) 풀업(PU) GPIO를 사용합니다 | 모든 변형 | 필수 |
| 13 | <span class="flag-red">SPI LCD: 3선 모드 — CS는 PA03, CLK는 PA04, DATA는 PA05에 연결합니다. 4선 모드 — CS는 PA03, CLK는 PA04, DATA는 PA05, DC는 PA06에 연결합니다</span> | 모든 변형 | 필수 |
| 14 | MCU의 JDI 인터페이스에 연결하는 Sharp Memory/JDI 디스플레이: VCOM과 VB는 MCU PA24에, VA는 MCU PA25에, R0/G0/B0는 MCU R1/G1/B1에, R1/G1/B1은 MCU R2/G2/B2에, GSP는 MCU VST에, BSP는 MCU HST에, GCK는 MCU VCK에, BCK는 MCU HCK에, GEN은 MCU ENB에, INTB는 MCU XRST에 연결합니다 | 모든 변형 | 필수 |
| 15 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>표 5.8.11-1: GPADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | GPADC 입력이 해당 핀에 연결되어 있습니다 <span class="flag-red">(PA28~PA34, 7개 GPIO가 GPADC 멀티플렉싱을 지원합니다)</span> | 모든 변형 | 선택 |
| 2 | GPADC로 들어가는 전압이 0~3.3 V 범위 안에 있습니다 | 모든 변형 | 선택 |
| 3 | GPADC로 측정하는 저항 분압 입력에는 허용 오차 1%의 분압 저항을 사용합니다. <span class="flag-red">각 GPADC 채널에는 칩 핀 가까이에 100 nF 필터 커패시터를 배치합니다</span> | 모든 변형 | 필수 |

</div>

### 5.8.12. 버튼 { #5812-buttons }

<div align="center"><em>표 5.8.12-1: 버튼 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 버튼 웨이크업 요구 사항(필요 여부)을 확인했습니다 | 모든 변형 | 필수 |
| 2 | 일반 버튼 연결이 올바릅니다(풀업 존재, 올바른 저항 값, 올바른 풀업 전압 도메인) | 모든 변형 | 필수 |
| 3 | 전원 버튼은 PA34를 사용하며 active-high이고 10초 길게 누르면 리셋됩니다. <span class="flag-red">10 kΩ 풀다운 저항은 반드시 메인 보드에 있어야 합니다</span> | 모든 변형 | 필수 |
| 4 | 모든 버튼 신호에 ESD 보호가 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.13. EOS 및 ESD 보호 { #5813-eos-and-esd-protection }

<div align="center"><em>표 5.8.13-1: EOS 및 ESD 보호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 충전 인터페이스에 EOS, ESD, OVP 설계가 있습니다 | 모든 변형 | 필수 |
| 2 | 배터리 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 3 | 안테나 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 4 | LCD 및 TP 전원 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 5 | TP의 I2C, RST, INT 라인에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 6 | 심박 센서 전원 인터페이스와 신호 라인에 ESD 소자가 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>표 5.8.14-1: I2C 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | I2C에 올바른 저항 값의 풀업이 있습니다. 400 kHz 동작이 필요하면 2.2 kΩ 풀업을 권장합니다. 주변 장치 쪽 전압 도메인을 사용하고, 전원을 끌 때 풀업 전원도 주변 장치와 함께 차단합니다 | 모든 변형 | 필수 |
| 2 | I2C 인터럽트 신호가 필요한 경우 하드웨어 웨이크업을 지원합니다 | 모든 변형 | 필수 |
| 3 | G-sensor, 심박 센서, 지자기 센서 같은 I2C 주변 장치는 모든 데이터를 한 번의 버스트로 읽는 것을 지원합니다 | 모든 변형 | 필수 |
| 4 | 하나의 I2C 버스를 여러 디바이스가 공유하는 경우 주소가 서로 구분됩니다 | 모든 변형 | 필수 |

</div>

### 5.8.15. 아날로그 오디오 { #5815-analog-audio }

<div align="center"><em>표 5.8.15-1: 아날로그 오디오 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | MEMS 마이크 연결이 올바릅니다 | 모든 변형 | 선택 |
| 2 | MEMS 마이크 전원을 MIC_BIAS에서 공급합니다 | 모든 변형 | 선택 |
| 3 | 아날로그 ECM 싱글 엔디드 마이크 연결이 올바릅니다 | 모든 변형 | 선택 |
| 4 | 아날로그 ECM 싱글 엔디드 마이크 전원을 MIC_BIAS에서 공급합니다 | 모든 변형 | 선택 |
| 5 | 모든 오디오 ADC 입력에 2.2 uF 이상의 DC 차단 커패시터가 있습니다 | 모든 변형 | 선택 |
| 6 | 오디오 DAC 출력 DACP와 DACN 각각에 칩 가까이 1 kΩ 직렬 저항이 있으며, DACP와 DACN 사이에 1.5 nF 커패시터가 병렬로 연결되어 있습니다 | 모든 변형 | 선택 |
| 7 | <span class="flag-red">오디오 전력 증폭기로 AW8155B를 권장하며, 소프트웨어에서 Class A/B 모드로 구성합니다. 다른 증폭기 부품은 테스트 검증이 필요합니다</span> | 모든 변형 | 선택 |
| 8 | <span class="flag-red">칩에 내장된 아날로그 오디오 ADC 경로를 사용하지 않는 경우 ADCP를 0 Ω 저항을 통해 그라운드에 연결하기를 권장합니다</span> | 모든 변형 | 선택 |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>표 5.8.16-1: SPI 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | SPI 연결이 올바릅니다: MCU 쪽 SDO는 주변 장치의 SDI에, MCU 쪽 SDI는 주변 장치의 SDO에 연결합니다 | 모든 변형 | 선택 |
| 2 | SPI 주변 장치의 타이밍 요구 사항을 충족합니다 | 모든 변형 | 선택 |
| 3 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 선택 |

</div>

### 5.8.17. USART 및 디버그 인터페이스 { #5817-usart-and-debug-interface }

<div align="center"><em>표 5.8.17-1: USART 및 디버그 인터페이스 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | PA18/PA19(DBG_UART로 멀티플렉싱)는 프로그램 플래싱 및 디버그 인터페이스를 이루며, 테스트 포인트를 확보해 두고 <span class="flag-red">100 Ω 직렬 저항을 둡니다</span> | 모든 변형 | 필수 |
| 2 | 디바이스에 연결할 때 MCU RXD는 주변 장치의 TXD에, MCU TXD는 주변 장치의 RXD에 연결합니다 | 모든 변형 | 필수 |
| 3 | PA35/PA36을 주변 장치에 대한 UART로 멀티플렉싱하는 경우, MCU 리셋 시점에 연결된 주변 장치의 전원이 꺼져 있거나 소프트웨어가 이 핀을 low로 구동하도록 합니다 | 모든 변형 | 필수 |
| 4 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>표 5.8.18-1: PWM 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | LCD 백라이트 제어에는 PA1을 사용합니다(권장) | 모든 변형 | 선택 |
| 2 | 진동 모터 PWM 핀은 PA20을 사용합니다 | 모든 변형 | 필수 |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>표 5.8.19-1: USB 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | USB 인터페이스 연결이 올바릅니다 | 전체 변형 | 선택 |
| 2 | USB 인터페이스에 ESD 보호가 있습니다 | 전체 변형 | 선택 |
| 3 | 일반(비슬립) 동작 중 USB를 활성화해 두면 호스트가 삽입/제거를 감지할 수 있습니다. MCU가 슬립 중일 때 감지가 필요하면, IO 전압에 맞는 레벨을 MCU의 웨이크업 핀으로 출력하는 VBUS 분압 회로를 추가하며, 이 핀을 충전기 삽입 감지와 공유하기를 권장합니다 | 전체 변형 | 선택 |

</div>

### 5.8.20. 소비 전력 { #5820-power-consumption }

<div align="center"><em>표 5.8.20-1: 소비 전력 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | LDO/DCDC 부품은 active-high 활성화를 사용합니다. 출력이 기본적으로 꺼져 있는 경우 EN에서 그라운드로 1 M~5.1 MΩ 풀다운을 추가하며, 값은 프로젝트의 소비 전력 요구 사항에 맞춥니다 | 모든 변형 | 필수 |
| 2 | MOSFET 기반 전원 스위칭은 PMOS+NMOS 조합을 사용하며, 제어 핀은 high가 활성화, low가 비활성화이고 제어 핀에서 그라운드로 1 MΩ 풀다운을 둡니다 | 모든 변형 | 필수 |
| 3 | 외부 플래시 전원 스위치는 PA11로 제어합니다 | 520/3/5/7 전용 | 필수 |
| 4 | <span class="flag-red">외부 플래시 전원 스위치와 VDD_SIP 전원 스위치는 모두 PA21로 제어합니다</span> | <span class="flag-red">52A/D</span>[^52a-note] | 원본에 명시되지 않음[^52a-category-note] |
| 5 | VSYS를 GPIO 풀업 전원으로 사용하는 경우 항상 켜져 있으며, 이것이 소비 전력 요구 사항을 충족하는지 확인했습니다 | 520/3/5/7 전용 | 필수 |
| 6 | LDO2 또는 LDO3를 GPIO 풀업 전원으로 사용하는 경우, LDO2/LDO3 전원이 꺼지는 시나리오에서도 설계 요구 사항을 충족하는지 확인했습니다 | 520/3/5/7 전용 | 필수 |
| 7 | I2C 풀업 전원은 누설을 피하기 위해 주변 장치의 IO 전원과 함께 스위칭됩니다 | 모든 변형 | 필수 |
| 8 | PA09 사용 참고: 화면이 켜질 때 high로 구동해 활성화하고, 슬립 시 low로 구동합니다 | 실리콘 리비전 A2 이하 | 필수 |
| 9 | Deep Sleep 모드의 기준 전류 요구 사항을 정의하고 기록했습니다 | 모든 변형 | 필수 |
| 10 | <span class="flag-red">선택한 모든 주변 장치의 Deep Sleep 모드 기준 전류 합계를 기록했으며 프로젝트 요구 사항을 충족합니다</span> | <span class="flag-red">모든 변형</span> | 필수 |
| 11 | Standby 모드의 기준 전류 요구 사항을 정의하고 기록했습니다 | 모든 변형 | 필수 |
| 12 | <span class="flag-red">선택한 모든 주변 장치의 Standby 모드 기준 전류 합계를 기록했으며 프로젝트 요구 사항을 충족합니다</span> | <span class="flag-red">모든 변형</span> | 필수 |

[^52a-note]: 원본 스프레드시트에는 "52A/52D"로 기재되어 있습니다. [SF32LB52x 하드웨어 설계 가이드][SF32LB52x Hardware Design Guide - Dev]에서 설명하는 변형은 SF32LB52B/D/E/G/J이며, 스프레드시트의 "52A" 표기는 이 변형 중 어느 것도 가리키지 않습니다. 이 행을 적용하기 전에 정확한 디바이스와 데이터시트를 확인하십시오. "52A"를 다른 모델로 자동 치환하지 마십시오.

!!! important "스토리지 전원 스위치 핀 불일치"
    이 표는 SF32LB520/3/5/7의 외부 플래시 스위칭에 대해 체크리스트 워크북의 PA11 항목을 그대로 보존합니다. 이 프로젝트의 출처 우선순위에서는 우선순위가 더 높은 OpenSiFli 애플리케이션 가이드와 회로도 설계 가이드가 우선하며, 이들은 부트 스토리지 전원 스위칭에 PA21을 지정합니다. 출처로 뒷받침되는 설계 기준으로 PA21을 사용하고, 우선순위가 낮은 워크북만을 근거로 PA11을 채택하지 마십시오. 워크북은 PA11이 별도의 보드 수준 활성화 신호인지 핀 할당 충돌인지 명확히 밝히지 않습니다. 릴리스 전에 정확한 넷과 변형을 SiFli에 확인하십시오.
[^52a-category-note]: 원본 스프레드시트는 이 행의 구분을 비워 두었습니다. 이를 "원본에 명시되지 않음"으로 옮겼으며, 필수 또는 선택으로 추정해 분류한 것이 아닙니다. 선택한 디바이스에 대한 적용 여부와 릴리스 기준을 확인하십시오.

</div>

### 5.8.21. 플래싱 및 디버그 테스트 포인트 { #5821-download-and-debug-test-points }

<div align="center"><em>표 5.8.21-1: 플래싱 및 디버그 테스트 포인트 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 프로그램 플래싱/디버그 테스트 포인트로 VBAT, GND, PA18(DBG_UART_RXD), PA19(DBG_UART_TXD), VSYS, PA34 및 유사한 테스트 포인트를 확보해 둡니다 | 모든 변형 | 필수 |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
