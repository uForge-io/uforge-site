---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB52x MCU의 항목별 PCB 레이아웃 검토 체크리스트로, 패키지, 라우팅, 전원, 그라운딩 점검을 다룹니다."
tags:
    - 하드웨어
    - 칩
    - 체크리스트
---

# SF32LB52x 하드웨어 설계 가이드 — PCB 레이아웃 체크리스트 { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "SF32LB52x 하드웨어 설계 가이드의 일부"
    이 페이지는 항목별 PCB 레이아웃 체크리스트인 6.15절을 다룹니다. [PCB 레이아웃 가이드라인](SF32LB52x_pcb_layout.md)으로 돌아가십시오.

## 6.15. PCB 레이아웃 체크리스트 { #615-pcb-layout-checklist }

원본 PCB 체크리스트에는 적용 대상 열이 없습니다. 선택한 부품과 회로에 해당 핀, 레일 또는 기능이 있는 경우에만 각 점검 항목을 적용하고, 없는 기능은 해당 없음으로 표시하십시오. 원본의 필수/선택 구분은 그대로 유지하되, 선택을 디바이스 사양이 요구하는 부품을 생략해도 된다는 허용으로 해석해서는 안 됩니다.

!!! note "원본의 크리스털 구리 처리"
    체크리스트 워크북의 클럭 항목 3은 어느 층에 구리 금지 구역이 필요한지 밝히지 않습니다. 배터리 변형(variant) 애플리케이션 노트 자체도 서로 모순됩니다. 클럭 절에서는 크리스털 아래의 L2 그라운드를 제거하라고 하지만, PCB 라우팅 절에서는 최상층과 인접 층에서 플레인 보이드나 구리 컷아웃을 금지하고 연속된 L2 그라운드를 그려 놓았으며, 별도의 PCB 레이아웃 가이드도 보이드 금지 지침을 되풀이합니다. 릴리스 전에 스택업별 처리 방식을 SiFli에 확인하십시오. 체크리스트 문구로 이를 추정하지 마십시오.

!!! note "트레이스 폭 점검"
    워크북은 VCC ≥12 mil, BUCK 트레이스 ≥10 mil, RF ≥10 mil을 규정합니다. 6절에는 더 엄격한 VCC 및 BUCK 지침과 RF >10 mil 권장 사항이 있습니다. 50 Ω RF 요건을 포함하여 해당하는 두 제약 집합을 모두 충족해야 하며, 체크리스트의 최솟값이 상세 레이아웃 지침을 대체하지 않습니다.

### 6.15.1. 패키지 { #6151-package }

<div align="center"><em>표 6.15.1-1: 패키지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PCB 풋프린트가 패키지 사양과 일치함 | 필수 |

</div>

### 6.15.2. 전원 라우팅 { #6152-power-supply-routing }

<div align="center"><em>표 6.15.2-1: 전원 라우팅 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | <span class="flag-red">VBUS 전원 트레이스 폭 ≥16 mil</span> | 필수 |
| 2 | <span class="flag-red">VBAT 전원 트레이스 폭 ≥16 mil</span> | 필수 |
| 3 | <span class="flag-red">VCC 전원 트레이스 폭 ≥12 mil</span> | 필수 |
| 4 | LDO2_OUT 전원 트레이스 폭 ≥10 mil | 필수 |
| 5 | LDO3_OUT 전원 트레이스 폭 ≥8 mil | 필수 |
| 6 | <span class="flag-red">PMU_BUCK_VSW 및 PMU_BUCK_VOUT 트레이스 폭 ≥10 mil</span> | 필수 |
| 7 | AVDD_BRF 전원 트레이스 폭 ≥8 mil | 필수 |
| 8 | <span class="flag-red">AVDD33_AUD 전원 트레이스 폭 ≥8 mil</span> | 필수 |

</div>

### 6.15.3. 전원 커패시터 및 인덕터 배치 { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>표 6.15.3-1: 전원 커패시터 및 인덕터 배치 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | VBUS 커패시터를 핀 가까이에 배치함 | 필수 |
| 2 | VBAT 커패시터를 핀 가까이에 배치함 | <span class="flag-red">선택</span> |
| 3 | VCC 커패시터를 핀 가까이에 배치함 | 필수 |
| 4 | LDO2_OUT 커패시터를 핀 가까이에 배치함 | <span class="flag-red">선택</span> |
| 5 | LDO3_OUT 커패시터를 핀 가까이에 배치함 | <span class="flag-red">선택</span> |
| 6 | VSYS 커패시터를 핀 가까이에 배치함 | 필수 |
| 7 | BUCK 인덕터를 칩 가까이에 배치함 | <span class="flag-red">선택</span> |
| 8 | BUCK 디커플링 커패시터를 칩 핀에 최대한 가깝게 배치함 | 필수 |
| 9 | VDD_HPSYS 커패시터를 핀 가까이에 배치함 | 필수 |
| 10 | VDD_LPSYS 커패시터를 핀 가까이에 배치함 | 필수 |
| 11 | VDD_RET 커패시터를 핀 가까이에 배치함 | 필수 |
| 12 | VDD_RTC 커패시터를 핀 가까이에 배치함 | 필수 |
| 13 | AVDD_BRF 커패시터를 핀 가까이에 배치함 | 필수 |
| 14 | AVDD<span class="flag-red">33</span>_AUD 커패시터를 핀 가까이에 배치함 | 필수 |

</div>

### 6.15.4. 클럭 { #6154-clock }

<div align="center"><em>표 6.15.4-1: 클럭 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 크리스털을 칩 가까이에 배치함 | 필수 |
| 2 | 크리스털 주위에 GND 실드를 적용함 | 필수 |
| 3 | 선택한 스택업에 대한 크리스털 영역의 구리 처리를 SiFli에 확인함. 위의 원본 불일치 참고 사항을 참조 | 필수 |
| 4 | 각 크리스털 트레이스에서 인접 GND 구리까지의 에지 간 간격이 트레이스 폭의 1.5배보다 큼 | 필수 |
| 5 | 병렬 32.768 kHz XI/XO 트레이스 사이의 간격이 ≥0.15 mm임 | 필수 |

</div>

### 6.15.5. 버튼 { #6155-buttons }

<div align="center"><em>표 6.15.5-1: 버튼 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 버튼의 ESD 보호 소자를 버튼 가까이에 배치함 | 필수 |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>표 6.15.6-1: RF 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | RF 트레이스가 싱글 엔드 50 Ω 특성 임피던스 요건을 충족함 | 필수 |
| 2 | RF 트레이스 폭 ≥10 mil | 필수 |
| 3 | RF 트레이스 양쪽에 각각 60 mil 이상의 그라운드가 있고, 메인 그라운드로 연결되는 스티칭 비아가 충분함 | 필수 |
| 4 | 예약된 Pi형 안테나 매칭 회로를 칩 쪽 가까이에 배치함 | 필수 |
| 5 | RF 신호 아래에 연속된 GND 플레인이 있음 | 필수 |
| 6 | RF 신호 아래를 가로지르는 고속 디지털 신호 트레이스가 없음 | 필수 |
| 7 | RF 신호 아래를 가로지르는 high-di/dt 전원 트레이스가 없음 | 필수 |

</div>

### 6.15.7. 오디오 { #6157-audio }

<div align="center"><em>표 6.15.7-1: 오디오 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | ADCP에 입체적인 그라운드 실드가 있음 | 필수 |
| 2 | DACP/DACN이 입체적인 그라운드 실드를 갖춘 차동 라우팅을 사용함 | 필수 |
| 3 | DACP/DACN 트레이스가 기생 커패시턴스를 10 pF 미만으로 유지할 만큼 짧음 | 필수 |
| 4 | AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD 전원 라우팅에 그라운드 가드를 적용하고, 대전류 및 강한 간섭 신호에서 멀리 둠 | 필수 |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>표 6.15.8-1: ADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 그라운드 가드 없이 GPADC 신호와 나란히 지나는 고속 신호가 없음 | 필수 |

</div>

### 6.15.9. 테스트 포인트 { #6159-test-points }

<div align="center"><em>표 6.15.9-1: 테스트 포인트 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 테스트 포인트 위치가 프로빙 또는 픽스처 납땜에 적합함 | 필수 |
| 2 | 프로그램 플래싱 테스트 포인트(VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34 등)가 테스트 픽스처의 크기 및 위치 요건을 충족함 | 필수 |

</div>

### 6.15.10. 그라운드 { #61510-ground }

<div align="center"><em>표 6.15.10-1: 그라운드 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 메인 칩에 인접한 층이 완전한 메인 그라운드 플레인이며, 그라운딩 비아가 충분함 | 필수 |
| 2 | 노출 패드(EPAD)가 비아를 통해 메인 그라운드에 연결됨 | 필수 |
| 3 | 칩 아래 영역에 메인 그라운드 플레인으로 연결되는 그라운딩 비아가 충분함 | 필수 |
| 4 | <span class="flag-red">보드 가장자리를 따라 그라운딩 비아 링이 있음</span> | 필수 |

</div>
