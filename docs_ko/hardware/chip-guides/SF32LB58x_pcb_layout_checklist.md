---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB58x MCU의 항목별 PCB 레이아웃 검토 체크리스트로, 패키지, 전원, 클럭, RF, 오디오, 고속 신호, 스택업 점검을 다룹니다."
tags:
    - 하드웨어
    - 칩
    - 체크리스트
---

# SF32LB58x 하드웨어 설계 가이드 — PCB 레이아웃 체크리스트 { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "SF32LB58x 하드웨어 설계 가이드의 일부"
    이 페이지는 항목별 PCB 레이아웃 체크리스트인 6.18절을 다룹니다. [PCB 레이아웃 가이드라인](SF32LB58x_pcb_layout.md)으로 돌아가십시오.

## 6.18. PCB 레이아웃 체크리스트 { #618-pcb-layout-checklist }

아래 각 표는 PCB 레이아웃 검토 영역 하나를 다룹니다. 적용 대상 열이 없는 표의 점검 항목은 이 체크리스트가 다루는 모든 SF32LB58x PCB 설계에 적용됩니다.

### 6.18.1. 패키지 { #6181-package }

<div align="center"><em>표 6.18.1-1: 패키지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PCB 풋프린트가 패키지 사양과 일치함 | 필수 |

</div>

### 6.18.2. 전원 { #6182-power-supply }

<div align="center"><em>표 6.18.2-1: 전원 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | VDD1 전원 트레이스가 8 mil 이상임 | 필수 |
| 2 | VDD2 전원 트레이스가 8 mil 이상임 | 필수 |
| 3 | BUCK1_VSW 및 BUCK1_VOUT 트레이스 폭이 8 mil 이상임 | 필수 |
| 4 | BUCK2_VSW 및 BUCK2_VOUT 트레이스 폭이 8 mil 이상임 | 필수 |
| 5 | VDDIOA 전원 트레이스가 10 mil 이상임 | 필수 |
| 6 | VDDIOA2 전원 트레이스가 10 mil 이상임 | 필수 |
| 7 | VDDIOB 전원 트레이스가 10 mil 이상임 | 필수 |
| 8 | VDDIOSA 전원 트레이스가 6 mil 이상임 | 필수 |
| 9 | VDDIOSB 전원 트레이스가 6 mil 이상임 | 필수 |
| 10 | VDDIOSC 전원 트레이스가 6 mil 이상임 | 필수 |
| 11 | AVDD33_USB 전원 트레이스가 6 mil 이상임 | 필수 |
| 12 | AVDD33_ANA 전원 트레이스가 6 mil 이상임 | 필수 |
| 13 | AVDD_BRF 전원 트레이스 폭이 8 mil 이상임 | 필수 |
| 14 | AVDD33_AUD 전원 트레이스가 6 mil 이상임 | 필수 |
| 15 | AVDD33_DSI 전원 트레이스가 8 mil 이상임 | 필수 |

</div>

### 6.18.3. 전원 커패시터 및 인덕터 배치 { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>표 6.18.3-1: 전원 커패시터 및 인덕터 배치 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | VDD1 커패시터를 핀 가까이에 배치함 | 필수 |
| 2 | VDD2 커패시터를 핀 가까이에 배치함 | 필수 |
| 3 | BUCK1 인덕터를 칩 가까이에 배치함 | 필수 |
| 4 | BUCK1 커패시터를 칩 핀에 가능한 한 가깝게 배치함 | 필수 |
| 5 | BUCK2 인덕터를 칩 가까이에 배치함 | 필수 |
| 6 | BUCK2 커패시터를 칩 핀에 가능한 한 가깝게 배치함 | 필수 |
| 7 | HPSYS_LDO_VOUT 커패시터를 핀 가까이에 배치함 | 필수 |
| 8 | LPMU_VDD07_RET 커패시터를 핀 가까이에 배치함 | 필수 |
| 9 | LPMU_VDD11_RTC 커패시터를 핀 가까이에 배치함 | 필수 |
| 10 | VDDIOA 커패시터를 핀 가까이에 배치함 | 필수 |
| 11 | VDDIOA2 커패시터를 핀 가까이에 배치함 | 필수 |
| 12 | VDDIOB 커패시터를 핀 가까이에 배치함 | 필수 |
| 13 | VDDIOSA 커패시터를 핀 가까이에 배치함 | 필수 |
| 14 | VDDIOSB 커패시터를 핀 가까이에 배치함 | 필수 |
| 15 | VDDIOSC 커패시터를 핀 가까이에 배치함 | 필수 |
| 16 | AVDD33_USB 커패시터를 핀 가까이에 배치함 | 필수 |
| 17 | AVDD33_ANA 커패시터를 핀 가까이에 배치함 | 필수 |
| 18 | AVDD_BRF 커패시터를 핀 가까이에 배치함 | 필수 |
| 19 | AVDD33_AUD 커패시터를 핀 가까이에 배치함 | 필수 |
| 20 | AVDD33_DSI 커패시터를 핀 가까이에 배치함 | 필수 |

</div>

### 6.18.4. 클럭 { #6184-clock }

<div align="center"><em>표 6.18.4-1: 클럭 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 크리스털을 칩 가까이에 배치함 | 필수 |
| 2 | 크리스털 주변에 GND 실드를 적용함 | 필수 |
| 3 | 크리스털 아래에 구리를 두지 않음. 4층 PCB에서는 최소 1층(최상층), 2층, 3층에 금지 구역을 적용함 | 필수 |
| 4 | 크리스털 트레이스와 GND 가드 구리 사이의 클리어런스를 트레이스 폭의 3배보다 크게 유지함 | 필수 |

</div>

!!! warning "크리스털 금지 구역 층은 SiFli에 확인하십시오"
    체크리스트 워크북은 4층 PCB의 1, 2, 3층에 구리 금지 구역을 두도록 규정합니다. [PCB 레이아웃 가이드](SF32LB58x_pcb_layout.md#65-clock-interface-routing)는 각 크리스털 영역 아래의 표면층과 인접 층을 규정합니다. 3층을 포함하는지에 대해 두 원본이 서로 다릅니다. SiFli의 확인 없이 3층의 최종 요구 사항을 추정하지 마십시오.

### 6.18.5. 버튼 { #6185-buttons }

<div align="center"><em>표 6.18.5-1: 버튼 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 버튼 ESD 보호 소자를 버튼 가까이에 배치함 | 필수 |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>표 6.18.6-1: RF 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | RF 트레이스가 싱글 엔디드 50 Ω 특성 임피던스 요구 사항을 충족함 | 필수 |
| 2 | RF 트레이스 폭이 10 mil 이상임 | 필수 |
| 3 | 칩 가까이에 π형 안테나 매칭 회로용 풋프린트를 확보함 | 필수 |
| 4 | RF 신호 아래에 연속된 GND 플레인을 둠 | 필수 |
| 5 | RF 신호 아래를 가로지르는 고속 디지털 신호 트레이스가 없음 | 필수 |
| 6 | RF 신호 아래를 가로지르는 di/dt가 큰 전원 트레이스가 없음 | 필수 |

</div>

### 6.18.7. 오디오 { #6187-audio }

<div align="center"><em>표 6.18.7-1: 오디오 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | AU_ADC1P와 AU_ADC1N의 평행 트레이스에 그라운드 가드를 적용함 | 필수 |
| 2 | AU_ADC2P와 AU_ADC2N의 평행 트레이스에 그라운드 가드를 적용함 | 필수 |
| 3 | AU_DAC1P와 AU_DAC1N의 평행 트레이스에 그라운드 가드를 적용함 | 필수 |
| 4 | AU_DAC2P와 AU_DAC2N의 평행 트레이스에 그라운드 가드를 적용함 | 필수 |
| 5 | AU_DAC1P, AU_DAC1N, AU_DAC2P, AU_DAC2N 트레이스의 커패시턴스가 &lt; 10 pF이고 길이가 &lt; 2 cm임 | 필수 |

</div>

!!! warning "원본의 DAC 트레이스 길이 한계 불일치"
    이 워크북은 DAC 트레이스 길이를 2 cm(20 mm) 미만으로 규정하지만, [PCB 레이아웃 가이드](SF32LB58x_pcb_layout.md#67-audio-interface-routing)는 2 mm 미만으로 규정합니다. 두 원본 한계는 10배 차이가 납니다. SiFli의 확인 없이 한쪽 한계를 선택하지 마십시오.

### 6.18.8. 고속 신호 { #6188-high-speed-signals }

<div align="center"><em>표 6.18.8-1: 고속 신호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | DSI 차동 신호가 차동 임피던스 100 Ω 요구 사항을 충족함 | 필수 |
| 2 | DSI 데이터 차동 쌍의 길이를 클럭 차동 쌍과 200 mil 이내로 맞춤 | 필수 |
| 3 | DSI 신호를 가능한 한 같은 층에서 라우팅함 | 필수 |

</div>

!!! warning "원본의 DSI 쌍 간 한계 불일치"
    이 워크북은 DSI 데이터 차동 쌍을 클럭 차동 쌍과 200 mil(5.08 mm) 이내로 맞추도록 요구합니다. 반면 [PCB 레이아웃 가이드](SF32LB58x_pcb_layout.md#610-dsi-interface-routing)는 쌍 간 스큐를 ≤2 mm, 쌍 내 스큐를 ≤0.5 mm로 제한합니다. 쌍 간 한계가 충돌하므로 레이아웃을 확정하기 전에 적용할 한계를 SiFli에 확인하십시오.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>표 6.18.9-1: ADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | GPADC 신호와 나란히 고속 스위칭 신호를 라우팅하지 않음. 피할 수 없으면 충분한 그라운드 가드를 적용함 | 필수 |
| 2 | 배터리 전압 분배 저항을 칩 입력 핀 가까이에 배치함 | 필수 |
| 3 | SDMADC 신호와 나란히 고속 스위칭 신호를 라우팅하지 않음. 피할 수 없으면 충분한 그라운드 가드를 적용함 | 선택 |

</div>

### 6.18.10. 테스트 포인트 { #61810-test-points }

<div align="center"><em>표 6.18.10-1: 테스트 포인트 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 테스트 포인트 위치가 프로빙 또는 픽스처 납땜에 적합함 | 필수 |
| 2 | 프로그램 플래싱 및 크리스털 캘리브레이션용 테스트 포인트(VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD 등)가 픽스처의 크기 및 위치 요구 사항을 충족함 | 필수 |

</div>

### 6.18.11. PCB 스택업 { #61811-pcb-stack-up }

<div align="center"><em>표 6.18.11-1: PCB 스택업 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 메인 칩에 인접한 층은 연속된 메인 그라운드 플레인이어야 함 | 필수 |

</div>
