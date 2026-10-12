---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB55x MCU의 전원, 클럭, RF, 스토리지, 디스플레이, 제조 점검을 다루는 항목별 회로도 검토 체크리스트입니다."
tags:
    - 하드웨어
    - 칩
    - 체크리스트
---

# SF32LB55x 하드웨어 설계 가이드 — 회로도 체크리스트 { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. 회로도 체크리스트 { #58-schematic-checklist }

아래 각 표는 회로도의 기능 블록 하나를 다룹니다. 적용 대상 열이 있는 표에서는 해당 열에 나열된 변형(variant)에만 각 행을 적용합니다.

빨간색 글자와 노란색 배경은 원본 워크북의 검토 강조 표시를 그대로 유지한 것입니다. 워크북은 각 강조 표시의 의미를 설명하지 않으므로 추가 검토 플래그로 취급하십시오. 강조 표시가 항목의 필수/선택 구분을 바꾸지는 않습니다.

### 5.8.1. 패키지 { #581-package }

<div align="center"><em>표 5.8.1-1: 패키지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 선택한 부품 번호의 패키지가 핀 이름과 핀 번호를 포함하여 올바릅니다 | 모든 변형 | 필수 |

</div>

### 5.8.2. 전원 { #582-power-supply }

<div align="center"><em>표 5.8.2-1: 전원 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | VDD1 공급 전압이 1.8~3.3 V입니다 | 551/555/557 전용 | 필수 |
| 2 | <span class="flag-red">VDD1 공급 전압이 3.3 V입니다</span> | <span class="flag-red">SS6600A8 전용</span> | <span class="flag-red">필수</span> |
| 3 | VDD2 공급 전압이 1.8~3.3 V입니다 | 555/557 전용 | 필수 |
| 4 | BUCK1_VSW와 BUCK1_VOUT 연결이 올바릅니다 | 모든 변형 | 필수 |
| 5 | BUCK2_VSW와 BUCK2_VOUT 연결이 올바릅니다 | 555/557 전용 | 필수 |
| 6 | LDOVCC2_VOUT 연결이 올바릅니다 | 555/557 전용 | 필수 |
| 7 | AVDD_DSI 공급 전압이 1.8 V입니다 | 555/557 전용 | 필수 |
| 8 | LDO_VOUT1 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 9 | LDO_VOUT2 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 10 | VDD_RET 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 11 | VDD_RTC 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 모든 변형 | 필수 |
| 12 | VDD_SIP 공급 전압이 1.8 V이며, 전원을 차단할 수 있도록 로드 스위치가 마련되어 있습니다 | 551/555/557 전용 | 필수 |
| 13 | <span class="flag-red">VDD_SIP 공급 전압이 3.3 V이며, 전원을 차단할 수 있도록 로드 스위치가 마련되어 있습니다</span> | <span class="flag-red">SS6600A8 전용</span> | <span class="flag-red">필수</span> |
| 14 | AVDD33 공급 전압이 3.3 V입니다 | 모든 변형 | 필수 |
| 15 | AVDD_BRF 공급 전압이 1.8~3.3 V이며 VDD1 전원과 일치해야 합니다 | 551/555/557 전용 | 필수 |
| 16 | <span class="flag-red">AVDD_BRF 공급 전압이 3.3 V입니다</span> | <span class="flag-red">SS6600A8 전용</span> | <span class="flag-red">필수</span> |
| 17 | VDDIOA 공급 전압이 1.8~3.3 V입니다. 첫 번째 보드 리비전에서는 0 Ω 직렬 저항을 확보해 둡니다 | 551/555/557 전용 | 필수 |
| 18 | VDDIOB 공급 전압이 1.8~3.3 V입니다. 첫 번째 보드 리비전에서는 0 Ω 직렬 저항을 확보해 둡니다 | 551/555/557 전용 | 필수 |
| 19 | <span class="flag-red">VDDIOA 공급 전압이 3.3 V입니다. 첫 번째 보드 리비전에서는 0 Ω 직렬 저항을 확보해 둡니다</span> | <span class="flag-red">SS6600A8 전용</span> | <span class="flag-red">필수</span> |
| 20 | <span class="flag-red">VDDIOA 공급 전압이 3.3 V입니다. 첫 번째 보드 리비전에서는 0 Ω 직렬 저항을 확보해 둡니다</span> | <span class="flag-red">SS6600A8 전용</span> | <span class="flag-red">필수</span> |
| 21 | SF30147C가 전원을 공급할 때 TWI 제어 인터페이스는 MCU의 PB 핀을 사용해야 하며, 해당 핀은 PD 핀이어야 합니다 | 551/555/557 전용 | 필수 |
| 22 | SF30147C가 전원을 공급할 때 EN으로 제어되는 레일은 EN 전원 도메인으로 PVDD 또는 AVDD를 사용해야 하며, MCU GPIO로 EN을 제어하면 안 됩니다. 또는 EN을 그라운드에 연결하고 레지스터를 통해 해당 레일 출력을 제어합니다 | 551/555/557 전용 | 필수 |
| 23 | SF30147C가 전원을 공급할 때 BUCK과 LDO1은 각각의 활성화 신호인 EN_BUCK과 EN_LDO1으로만 제어할 수 있으며, 내부 레지스터 제어는 제공되지 않습니다 | 551/555/557 전용 | 필수 |
| 24 | 충전 회로에는 배터리 전압이 너무 낮을 때 충전기 5 V 입력으로 시스템에 전원을 공급할 수 있도록 경로 관리가 필요합니다 | 모든 변형 | 필수 |

</div>

원본 모호성: 원래 V1.0 워크북의 19번 항목과 20번 항목은 동일하며, 둘 다 SS6600A8의 VDDIOA에 3.3 V를 지정합니다. [하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md)는 VDDIOA를 PA I/O 전원, VDDIOB를 PB I/O 전원으로 설명하지만, 20번 항목이 VDDIOB를 가리키려는 의도였는지는 확인해 주지 않습니다. 위 체크리스트는 워크북을 그대로 유지합니다. 20번 항목을 설계 승인 기준으로 사용하기 전에 SiFli에 의도한 레일을 확인하십시오.

### 5.8.3. 전원 커패시터 및 인덕터 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>표 5.8.3-1: 전원 커패시터 및 인덕터 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | VDD1 벌크 커패시터가 10 uF 이상입니다 | 모든 변형 | 필수 |
| 2 | VDD2 커패시터가 10 uF 이상입니다 | 555/557 전용 | 필수 |
| 3 | BUCK1_VOUT 커패시터가 4.7 uF입니다 | 모든 변형 | 필수 |
| 4 | BUCK2_VOUT 커패시터가 4.7 uF입니다 | 555/557 전용 | 필수 |
| 5 | <span class="flag-red">AVDD_DSI 커패시터가 10 uF 이상입니다</span> | 555/557 전용 | 필수 |
| 6 | LDO_VOUT1 커패시터가 4.7 uF입니다 | 모든 변형 | 필수 |
| 7 | LDO_VOUT2 커패시터가 4.7 uF입니다 | 모든 변형 | 필수 |
| 8 | VDD_RET 커패시터 = 0.47 uF | 모든 변형 | 필수 |
| 9 | VDD_RTC 커패시터 = 1 uF | 모든 변형 | 필수 |
| 10 | VDD_SIP 커패시터가 1 uF 이상입니다 | 모든 변형 | 필수 |
| 11 | AVDD33 커패시터가 1 uF 이상입니다 | 모든 변형 | 필수 |
| 12 | AVDD_BRF 커패시터가 1 uF 이상입니다 | 모든 변형 | 필수 |
| 13 | VDDIOA 커패시터가 1 uF 이상입니다 | 모든 변형 | 필수 |
| 14 | VDDIOB 커패시터가 1 uF 이상입니다 | 모든 변형 | 필수 |
| 15 | VDD1, VDD2(555 전용), AVDD_BRF, RESET 풀업 전원은 동일해야 합니다 | 모든 변형 | 필수 |
| 16 | BUCK1 인덕터가 SiFli 권장 부품 번호입니다 | 551/555/557 전용 | 필수 |
| 17 | BUCK2 인덕터가 SiFli 권장 부품 번호입니다 | 555/557 전용 | 필수 |
| 18 | BUCK 인덕터가 SiFli 권장 부품이 아닌 경우 L = 4.7 uH, DCR &lt;= 0.4 ohm, Isat &gt;= 450 mA를 충족합니다 | 모든 변형 | 필수 |
| 19 | GPS 또는 간섭에 민감한 다른 주변 장치가 있는 경우 BUCK_LX와 그라운드 사이에 연결하는 션트 커패시터 풋프린트를 확보해 둡니다. 값은 실제 테스트 결과에 따라 달라집니다 | 모든 변형 | 필수 |
| 20 | <span class="flag-red">VBAT를 1.8 V로 변환하여 VDD1과 VDD2(555 전용)에 공급할 때는 DCDC 컨버터를 사용하고 LDO를 사용하지 않습니다</span> | 551/555/557 전용 | 필수 |
| 21 | <span class="flag-red">선택한 DCDC의 정지 전류가 기록되어 있으며 프로젝트 요구 사항을 충족합니다</span> | 모든 변형 | 필수 |
| 22 | <span class="flag-red">선택한 LDO의 정지 전류가 기록되어 있으며 프로젝트 요구 사항을 충족합니다</span> | 모든 변형 | 필수 |

</div>

원본 불일치: [SiFli 중국어 하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)의 표 3-3과 [V1.0 회로도 체크리스트](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)의 9번 항목은 VDD_RTC에 1 µF을 지정하지만, [레퍼런스 회로도의 C0313](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png)은 0.1 µF으로 표기되어 있습니다. 두 값이 각각 언제 적용되는지는 자료에 설명되어 있지 않습니다. 설계를 릴리스하기 전에 해당 디바이스에 필요한 값을 SiFli에 확인하십시오. 가정으로 불일치를 해소해서는 안 됩니다.

### 5.8.4. 클럭 { #584-clock }

<div align="center"><em>표 5.8.4-1: 클럭 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 메인 48 MHz 크리스털이 AVL에 등재된 부품 번호입니다 | 모든 변형 | 필수 |
| 2 | 48 MHz 크리스털이 AVL에 등재되어 있지 않은 경우 7 pF ≤ CL ≤ 12 pF(8.8 pF 권장), 주파수 허용 오차 ≤±10 ppm, ESR ≤30 Ω(22 Ω 권장)을 충족합니다 | 모든 변형 | 필수 |
| 3 | RTC 32.768 kHz 크리스털이 AVL에 등재된 부품 번호입니다 | 모든 변형 | 필수 |
| 4 | 32.768 kHz 크리스털이 AVL에 등재되어 있지 않은 경우 CL ≤12.5 pF(7 pF 권장), 주파수 허용 오차 ≤±20 ppm, ESR ≤80 kΩ(38 kΩ 권장)을 충족합니다 | 모든 변형 | 필수 |
| 5 | <span class="flag-yellow">32.768 kHz 크리스털을 생략하는 경우 XI 패드를 그라운드에 연결해야 합니다</span> | <span class="flag-yellow">모든 변형</span> | <span class="flag-yellow">필수</span> |

</div>

### 5.8.5. 리셋 { #585-reset }

<div align="center"><em>표 5.8.5-1: 리셋 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | RSTN이 VDD1과 동일한 전원으로 풀업되어 있습니다 | 모든 변형 | 필수 |
| 2 | RSTN에 그라운드로 연결되는 0.1 uF 커패시터를 확보해 둡니다 | 모든 변형 | 필수 |
| 3 | RSTN에 ESD 보호가 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.6. 그라운드 신호 { #586-ground-signals }

<div align="center"><em>표 5.8.6-1: 그라운드 신호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 모든 AVSS 신호가 GND에 연결되어 있습니다 | 555/557 전용 | 필수 |
| 2 | 모든 VSS 신호가 GND에 연결되어 있습니다 | 555/557 전용 | 필수 |
| 3 | EPAD 신호가 GND에 연결되어 있습니다 | <span class="flag-red">551/SS6600A8 전용</span> | 필수 |

</div>

### 5.8.7. 부트 모드 { #587-boot-mode }

<div align="center"><em>표 5.8.7-1: 부트 모드 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE는 기본적으로 그라운드로 10 kΩ 풀다운되며, 프로그래밍/플래싱 중에는 VDDIOA로 풀업됩니다</span> | 모든 변형 | 필수 |
| 2 | <span class="flag-red">MODE 신호에 테스트 포인트를 확보해 둡니다</span> | 모든 변형 | 필수 |
| 3 | PCB 공간이 허용하면 점퍼 캡으로 풀업 또는 풀다운을 선택할 수 있도록 3핀 헤더를 확보해 둡니다 | 모든 변형 | 필수 |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>표 5.8.8-1: RF 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | ANT 신호에 싱글 엔디드 50 Ω 특성 임피던스 요구 사항이 표기되어 있습니다 | 모든 변형 | 필수 |
| 2 | ANT 신호에 Pi형 매칭 회로를 확보해 둡니다. 병렬 NC(미실장) 커패시터와 15 pF 직렬 커패시터로 구성합니다 | 모든 변형 | 필수 |
| 3 | 스퓨리어스 방사 필터링이 필요한 경우, 3.0 nH 직렬 인덕터와 1.5 pF 션트 커패시터로 구성한 Pi 네트워크를 확보해 둡니다 | 모든 변형 |    |
| 4 | <span class="flag-red">외부 PA 또는 LNA를 제어해야 하는 경우 PB05를 RX_EN에, PB25를 TX_EN에 연결합니다</span> | 모든 변형 | 선택 |

</div>

원본 워크북은 RF 3번 항목의 구분을 비워 두었으므로 여기에서도 비워 둡니다. SiFli의 확인 없이 "필수"나 "선택"으로 추정하지 마십시오.

### 5.8.9. I/O 리소스 할당 { #589-io-resource-allocation }

<div align="center"><em>표 5.8.9-1: I/O 리소스 할당 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 회로도와 일치하는 GPIO 리소스 할당 표가 제공됩니다 | 모든 변형 | 필수 |
| 2 | 리소스 표의 GPIO 할당이 회로도와 일치합니다 | 모든 변형 | 필수 |
| 3 | 실제 GPIO 할당이 SiFli 권장 사항을 따릅니다. EVB I/O 구성 파일을 참조하십시오 | 모든 변형 | 필수 |

</div>

### 5.8.10. 하드웨어 웨이크업 { #5810-hardware-wake-up }

<div align="center"><em>표 5.8.10-1: 하드웨어 웨이크업 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">HCPU 웨이크업 인터럽트 소스가 올바릅니다. PA77, PA78, PA79, PA80이며, 전원 키 웨이크업에는 사용하지 않습니다</span> | 모든 변형 | 필수 |
| 2 | <span class="flag-red">LCPU 웨이크업 인터럽트 소스가 올바릅니다. PB43, PB44, PB45, PB46, PB47, PB48의 총 6개 핀이며, 전원 키 웨이크업에 사용할 수 있습니다</span> | 모든 변형 | 필수 |
| 3 | <span class="flag-red">G-sensor, 심박 센서 등 LCPU 쪽 주변 장치의 인터럽트 및 제어 신호는 PB GPIO에 연결해야 합니다</span> | 모든 변형 | 필수 |
| 4 | <span class="flag-red">UART3에 대응하는 LCPU 인터럽트 소스를 올바르게 사용합니다. 버튼 웨이크업 용도로만 사용하기를 권장합니다</span> | 모든 변형 | 필수 |

</div>

### 5.8.11. 스토리지 { #5811-storage }

<div align="center"><em>표 5.8.11-1: 스토리지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | QSPI2는 PSRAM &gt; NOR 플래시 &gt; NAND 플래시의 우선순위로 설계합니다 | 모든 변형 | 필수 |
| 2 | 코드를 내부 SiP NOR 플래시에서 실행하는 경우 VDD_SIP 전원 스위치 제어는 PA58입니다 | 모든 변형 | 필수 |
| 3 | 코드를 QSPI2의 외부 NOR 플래시에서 실행하는 경우 QSPI2 전원 스위치 제어는 PA58입니다 | 모든 변형 | 필수 |
| 4 | QSPI2의 외부 플래시를 양산 중에 프로그래밍해야 하는 경우 해당 전원 스위치는 PA58로 제어해야 합니다 | 모든 변형 | 필수 |
| 5 | <span class="flag-red">PA58로 제어하는 전압 스위치는 High에서 켜지고 Low에서 꺼지는 방식입니다</span> | 모든 변형 | 필수 |
| 6 | <span class="flag-red">플래시 CLK 및 데이터 라인에는 33 Ω 직렬 저항을 권장합니다</span> | 모든 변형 | 필수 |
| 7 | QSPI3이 의도한 대로 NAND 플래시 또는 eMMC에 연결되어 있습니다 | 555/557 전용 | 선택 |
| 8 | QSPI3 전원 스위치 제어는 PA41입니다. <span class="flag-red">QSPI3 전원은 기본적으로 꺼져 있으며, High에서 켜지는 스위치에는 기본 내부 풀다운을 사용하는 것이 좋습니다</span> | 555/557 전용 | 선택 |
| 9 | <span class="flag-red">QSPI3 전원 스위치 제어가 PA41이 아닌 경우 소프트웨어 쪽과 대체 IO를 확인합니다</span> | 555/557 전용 | 선택 |
| 10 | QSPI3의 외부 플래시를 양산 중에 프로그래밍해야 하는 경우 해당 전원 스위치는 PA58로 제어해야 합니다 | 555/557 전용 | 필수 |
| 11 | OPI PSRAM 전원 스위치 제어는 PA70입니다. <span class="flag-red">PSRAM 전원은 기본적으로 켜져 있으며, High에서 켜지는 스위치에는 기본 내부 풀업을 사용하는 것이 좋습니다</span> | 555/557 전용 | 선택 |
| 12 | <span class="flag-red">OPI PSRAM은 지원되는 모델이며 핵심 부품 선정 가이드에 인증 부품으로 등재되어 있습니다</span> | 555/557 전용 | 선택 |
| 13 | OPI PSRAM 신호 연결이 올바릅니다 | 555/557 전용 | 선택 |
| 14 | QSPI2 신호 연결이 올바릅니다 | 모든 변형 | 선택 |
| 15 | QSPI3 신호 연결이 올바릅니다 | 모든 변형 | 선택 |
| 16 | <span class="flag-yellow">SF32LB555 또는 <span class="flag-red">SF32LB557을 사용하는 경우 심박 감지 알고리즘에 필요한 메모리를 확인합니다. LCPU 메모리가 부족하면 QSPI4에 외부 1 MB 플래시를 추가합니다</span></span> | 555/557 전용 | 필수 |
| 17 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |
| 18 | <span class="flag-red">NOR 플래시가 핵심 부품 선정 가이드에 인증 부품으로 등재되어 있습니다</span> | 모든 변형 | 필수 |
| 19 | <span class="flag-red">NAND 플래시가 핵심 부품 선정 가이드에 인증 부품으로 등재되어 있습니다</span> | 모든 변형 | 필수 |

</div>

### 5.8.12. 디스플레이 { #5812-display }

<div align="center"><em>표 5.8.12-1: 디스플레이 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | SF32LB555xxxx가 의도한 대로 DSI + LCDC2를 통해 디스플레이를 연결합니다 | 555/557 전용 | 필수 |
| 2 | <span class="flag-red">SF32LB551xxxx가 의도한 대로 LCDC1을 통해 디스플레이를 연결합니다</span> | <span class="flag-red">551/SS6600A8 전용</span> | 필수 |
| 3 | LCDC1 QSPI 신호 연결이 올바릅니다. <span class="flag-red">CLK 및 데이터 라인에는 100 Ω 직렬 저항을 권장합니다</span> | 모든 변형 | 필수 |
| 4 | LCDC1 MCU8080 신호 연결이 올바릅니다 | 모든 변형 | 필수 |
| 5 | DSI 신호 연결이 올바릅니다 | 555/557 전용 | 필수 |
| 6 | LCDC2 QSPI 신호 연결이 올바릅니다 | 555/557 전용 | 필수 |
| 7 | DSI_REXT가 10 kΩ 저항을 통해 GND에 연결되어 있습니다 | 555/557 전용 | 필수 |
| 8 | LCDC RSTB 연결이 올바릅니다 | 모든 변형 | 필수 |
| 9 | LCDC TE 연결이 올바릅니다(패널의 TE 또는 Fmark 신호에 연결) | 모든 변형 | 필수 |
| 10 | <span class="flag-red">SPI LCD, 3선 모드: CS는 GPIO22 또는 PA31 또는 PB33에, CLK는 GPIO23 또는 PA20 또는 PB32에, DATA는 GPIO21 또는 PA34 또는 PB35에 연결합니다. <br>4선 모드: CS는 GPIO22 또는 PA31 또는 PB33에, CLK는 GPIO23 또는 PA20 또는 PB32에, DATA는 GPIO21 또는 PA34 또는 PB35에, DC는 GPIO20 또는 PA36 또는 PB36에 연결합니다</span> | 모든 변형 | 필수 |
| 11 | TP 신호가 권장 핀 할당을 따릅니다(EVB I/O 구성 파일 참조) | 모든 변형 | 필수 |
| 12 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |
| 13 | 설계가 화면 꺼짐(상시 켜짐) 디스플레이를 지원하는 경우 LCD QSPI 인터페이스를 MCU의 PA 핀에 연결합니다. LCD_EN, LCD_RST 등의 제어 신호에는 PB GPIO를 권장합니다 | <span class="flag-red">551/SS6600A8 전용</span> | 필수 |
| 14 | 설계가 화면 꺼짐(상시 켜짐) 디스플레이를 지원하는 경우 LCD QSPI 인터페이스를 MCU의 PA 핀에 연결하거나 LCD MIPI 인터페이스를 MCU에 연결합니다. LCD_EN, LCD_RST 등의 제어 신호에는 PB GPIO를 권장합니다 | 555/557 전용 | 필수 |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>표 5.8.13-1: GPADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | GPADC 입력이 해당 핀에 연결되어 있습니다 | 모든 변형 | 선택 |
| 2 | GPADC 입력 범위가 올바릅니다. 최대 입력 전압은 1.0 V를 초과하면 안 됩니다 | 모든 변형 | 선택 |
| 3 | 배터리 전압 분압기 권장 사항: 전원 쪽에 1 MΩ 1% 저항, 그라운드 쪽에 220 kΩ 1% 저항, 그리고 100 nF 필터 커패시터 | 모든 변형 | 필수 |
| 4 | GPADC로 측정하는 모든 저항 분압 신호에는 허용 오차 1%의 분압 저항을 사용합니다. <span class="flag-red">각 GPADC 채널에는 칩 핀에 가깝게 배치한 100 nF 필터 커패시터가 있어야 합니다</span> | 모든 변형 | 필수 |

</div>

원본 불일치: 우선순위가 더 높은 [OpenSiFli 하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)는 입력 범위 0~0.9 V의 5채널 10비트 GPADC를 설명합니다. 링크된 [V1.0 원본 체크리스트 워크북](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)의 2번 항목은 최대 1.0 V를 지정하지만 채널 수는 지정하지 않습니다. 반면 [SF32LB55x 데이터시트 V1.7.2의 3.2.1절](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)은 싱글 엔디드 입력 8개 또는 차동 쌍 4개를 지정하며, 싱글 엔디드 범위는 0~1.1 V, 차동 범위는 −0.7~0.7 V이고 핀 표에는 GPADC_CH0~CH7이 나열되어 있습니다. 현재 [SDK ADC 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)도 8개 채널(0~7)을 매핑하며 최대 샘플링 전압으로 1.1 V를 나열합니다. SiFli는 이처럼 상충하는 채널 수와 전압 한계를 설명한 적이 없습니다. 체크리스트 표는 2번 항목에서 워크북의 1.0 V 값을 유지하지만, SiFli가 서면으로 명확히 밝히기 전까지는 우선순위가 더 높은 하드웨어 애플리케이션의 0~0.9 V 범위에 맞춰 설계하고 VADC를 0.9 V 이하로 유지하십시오. 워크북의 1.0 V나 데이터시트/SDK의 1.1 V를 승인된 설계 한계로 취급하지 말고, 선택한 디바이스와 패키지에서 사용할 수 있는 채널을 확인하십시오.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>표 5.8.14-1: SDMADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | SDMADC 입력이 해당 핀에 연결되어 있습니다 | 555/557 전용 | 선택 |
| 2 | SDMADC 입력 범위가 올바릅니다. 최대 입력 전압은 1.2 V를 초과하지 않는 것이 좋습니다 | 555/557 전용 | 선택 |
| 3 | SDMADC_VREF와 SDMADC_VSS_VREF 연결이 올바릅니다 | 555/557 전용 | 필수 |

</div>

### 5.8.15. 버튼 { #5815-buttons }

<div align="center"><em>표 5.8.15-1: 버튼 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 버튼에 웨이크업 기능이 필요한지 고객과 확인합니다 | 모든 변형 | 필수 |
| 2 | 버튼 연결이 올바릅니다. 풀업이 있고, 저항값이 올바르며, 풀업 전압 도메인이 올바릅니다 | 모든 변형 | 필수 |
| 3 | <span class="flag-red">전원 버튼은 PB43, PB44, PB45, PB46, PB47, PB48 중 하나를 사용해야 합니다</span> | 모든 변형 | 필수 |
| 4 | 모든 버튼 신호에 ESD 보호가 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.16. EOS 및 ESD 보호 { #5816-eos-and-esd-protection }

<div align="center"><em>표 5.8.16-1: EOS 및 ESD 보호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 충전 인터페이스에 EOS, ESD, OVP 설계가 적용되어 있습니다 | 모든 변형 | 필수 |
| 2 | 충전기 삽입 감지 신호에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 3 | 배터리 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 4 | 안테나 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 5 | LCD 및 TP 전원 인터페이스에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 6 | TP의 I2C, RST, INT 라인에 ESD 소자가 있습니다 | 모든 변형 | 필수 |
| 7 | 심박 센서 전원 인터페이스와 신호 라인에 ESD 소자가 있습니다 | 모든 변형 | 필수 |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>표 5.8.17-1: I2C 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | I2C 할당에서 HCPU/LCPU 분할과 디바이스를 저전력 모드로 동작시켜야 하는지 여부를 고려했습니다 | 모든 변형 | 필수 |
| 2 | I2C에 저항값이 올바른 풀업이 있습니다. 400 kHz 동작이 필요한 경우 2.2 kΩ 풀업을 권장합니다. 주변 장치 쪽 전압 도메인을 사용하고, 주변 장치의 전원이 꺼질 때 풀업 전원도 함께 차단합니다 | 모든 변형 | 필수 |
| 3 | I2C 인터럽트 신호가 필요한 경우 하드웨어 웨이크업을 지원합니다 | 모든 변형 | 필수 |
| 4 | 여러 디바이스가 하나의 I2C 버스를 공유하는 경우 주소가 서로 구분됩니다 | 모든 변형 | 필수 |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>표 5.8.18-1: I2S 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | I2S1은 입력 전용입니다. 마이크가 의도한 대로 I2S1에 연결되어 있습니다 | 모든 변형 | 선택 |
| 2 | I2S2는 입력과 출력을 지원합니다. 오디오 디코더 또는 코덱이 의도한 대로 I2S2에 연결되어 있습니다 | 모든 변형 | 선택 |
| 3 | I2S 신호 연결이 올바릅니다 | 모든 변형 | 선택 |
| 4 | 듀얼 마이크 I2S 연결이 올바릅니다 | 모든 변형 | 선택 |
| 5 | 마이크 부품 사양이 확인되었으며 칩에서 지원됩니다 | 모든 변형 | 선택 |
| 6 | MCLK가 필요한 경우 연결이 올바른지 확인했습니다 | 모든 변형 | 선택 |
| 7 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 선택 |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>표 5.8.19-1: PDM 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | PDM 연결이 올바릅니다 | 555/557 전용 | 선택 |
| 2 | PDM 듀얼 마이크 연결이 올바릅니다 | 555/557 전용 | 선택 |
| 3 | 마이크 부품 사양이 확인되었으며 칩에서 지원됩니다 | 555/557 전용 | 선택 |
| 4 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 555/557 전용 | 선택 |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>표 5.8.20-1: SPI 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | SPI 연결이 올바릅니다. <span class="flag-red">MCU SDO는 주변 장치 SDI에, MCU SDI는 주변 장치 SDO에 연결합니다</span> | 모든 변형 | 선택 |
| 2 | SPI 주변 장치의 타이밍 요구 사항이 확인되었으며 지원됩니다 | 모든 변형 | 선택 |
| 3 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 선택 |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>표 5.8.21-1: USART 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | USART3은 플래싱 및 로그 인터페이스로 설계됩니다 | 모든 변형 | 필수 |
| 2 | <span class="flag-red">USART3에 테스트 포인트가 있으며, 필요한 경우 풀업 저항이 있습니다. 100 Ω 직렬 저항을 권장하며 실제 설계에 맞게 조정할 수 있습니다</span> | 모든 변형 | 필수 |
| 3 | HCPU에서 실행해야 하는 디바이스는 USART1 또는 USART2에 연결합니다 | 모든 변형 | 선택 |
| 4 | LCPU에서 실행해야 하는 디바이스는 USART4 또는 USART5에 연결합니다 | 모든 변형 | 선택 |
| 5 | <span class="flag-red">주변 장치에 연결할 때 MCU RXD는 주변 장치 TXD에, MCU TXD는 주변 장치 RXD에 연결합니다</span> | 모든 변형 | 필수 |
| 6 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 모든 변형 | 필수 |
| 7 | 사용하지 않는 USART 테스트 포인트를 예비용으로 확보해 둡니다 | 모든 변형 | 선택 |
| 8 | <span class="flag-red">UART1을 디바이스에 연결하는 경우 테스트 포인트를 확보해 둡니다</span> | 모든 변형 | 필수 |
| 9 | <span class="flag-red">UART를 UART-USB 변환 칩에 연결하는 경우 RX와 TX를 분리할 수 있어야 합니다</span> | 모든 변형 | 필수 |
| 10 | <span class="flag-red">주변 장치에 연결하는 UART는 HCPU 소프트웨어가 LCPU UART 인터페이스를 사용하는 일이 없도록 HCPU 인터페이스를 사용하기를 권장합니다</span> | 모든 변형 | 필수 |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>표 5.8.22-1: PWM 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 백라이트 PWM 핀 할당이 올바릅니다. HCPU 주파수 감소가 백라이트에 영향을 주지 않도록 모터와 다른 GPTIMx를 사용하며, PB 인터페이스에 두는 것이 좋습니다 | 모든 변형 | 선택 |
| 2 | 모터 PWM 핀 할당이 올바릅니다. HCPU 주파수 감소가 진동에 영향을 주지 않도록 백라이트와 다른 GPTIMx를 사용하며, PB 인터페이스에 두는 것이 좋습니다 | 모든 변형 | 선택 |
| 3 | SMT 모터를 사용할 때 프로그래밍 중 비정상 동작을 방지하기 위해 모터 PWM 제어 핀은 PB 인터페이스, 가능하면 PB24 또는 PB25를 사용하기를 권장합니다 | 모든 변형 | 선택 |
| 4 | PWM 출력이 필요한 신호는 PB 인터페이스를 사용해야 합니다. 콜드 부트 시 비정상 동작도 함께 점검합니다 | 모든 변형 | 선택 |

</div>

### 5.8.23. 디버그 { #5823-debug }

<div align="center"><em>표 5.8.23-1: 디버그 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | SWD 신호 연결이 올바릅니다 | 모든 변형 | 선택 |
| 2 | J-Link 커넥터 또는 테스트 포인트에 I/O 전원 레퍼런스가 올바르게 확보되어 있습니다 | 모든 변형 | 선택 |
| 3 | <span class="flag-yellow">SF32LB555x XXXX 양산 프로그래밍 시에는 PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33, AVDD_BRF 외에 AVDD_DSI에도 전원을 공급해야 합니다</span> | 555/557 전용 | 필수 |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>표 5.8.24-1: USB 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | USB 인터페이스 연결이 올바릅니다 | 모든 변형 | 선택 |
| 2 | USB 인터페이스에 ESD 보호가 있습니다 | 모든 변형 | 선택 |
| 3 | 슬립이 아닌 정상 동작 중에는 USB가 활성화되어 있는 한 PC/디바이스 쪽에서 삽입과 분리를 감지할 수 있습니다. <br>MCU가 슬립 상태에서 삽입과 분리를 감지해야 하는 경우 VBUS 저항 분압 회로를 추가하고, 분압 출력이 IO 전압에 맞는 High 레벨을 내도록 하여 MCU 웨이크업 핀에 입력합니다. 충전기 삽입 감지 웨이크 핀과 공유하기를 권장합니다 | 모든 변형 | 선택 |

</div>

### 5.8.25. 소비 전력 { #5825-power-consumption }

<div align="center"><em>표 5.8.25-1: 소비 전력 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | QFN GPIO27과 BGA PA01은 입력으로 사용하지 않기를 권장합니다. 내부 20 kΩ 풀다운 때문에 풀업 저항이 크면 High 레벨 전압이 낮아지고 풀업 저항이 작으면 누설이 과도해질 수 있기 때문입니다 | 모든 변형 | 필수 |
| 2 | QFN GPIO27 또는 BGA PA01을 출력으로 사용하는 경우, I/O가 구동되지 않을 때 제어 대상 회로가 기본적으로 비활성 상태가 되는지 확인합니다. 1.8 V High 레벨을 구동하면 약 90 uA의 누설이 발생하므로 대전류 동작 시나리오에 사용하는 것이 좋습니다 | 모든 변형 | 필수 |
| 3 | PA01과 PA03을 GPIO로 사용하는 경우 슬립 중에 두 IO의 레벨을 일치시키거나, 최소 하나의 핀을 풀업과 풀다운이 없는 high-impedance 상태로 둡니다 | 모든 변형 | 필수 |
| 4 | PA77, PA78, PA79, PA80과 PB43~PB48은 웨이크업이 가능한 10개 핀입니다. Hibernate 전원 차단 상태에서는 high impedance이며 내부 PU/PD가 비활성화됩니다. 고정 레벨을 달리 보장할 수 없는 경우 외부 풀업 또는 풀다운을 추가합니다 | 모든 변형 | 필수 |
| 5 | PB 웨이크업 핀을 파형 출력에 사용하는 경우 Hibernate를 사용하지 않더라도 외부 풀업 또는 풀다운을 확보해 둡니다 | 모든 변형 | 필수 |
| 6 | 모든 MOSFET, LDO, DCDC 활성화 핀은 기본 풀업 또는 풀다운 저항으로 Hibernate에서도 필요한 켜짐/꺼짐 상태가 유지되도록 합니다 | 모든 변형 | 필수 |
| 7 | High로 구동하여 부하를 제어하는 GPIO 신호는 기능에 영향을 주지 않는 경우 누설을 줄이기 위해 1 MΩ 풀다운을 사용합니다 | 모든 변형 | 필수 |
| 8 | PA GPIO 출력이 슬립 중에 High를 유지해야 하는 경우 PU 핀을 선택합니다 | 모든 변형 | 필수 |
| 9 | PA GPIO 출력이 슬립 중에 Low를 유지해야 하는 경우 PD 핀을 선택합니다 | 모든 변형 | 필수 |
| 10 | Hibernate 모드 기준 전류 요구 사항이 기록되어 있습니다 | 모든 변형 | 필수 |
| 11 | <span class="flag-red">Hibernate 모드에서 선택한 주변 장치의 기준 전류 합계가 기록되어 있으며 프로젝트 요구 사항을 충족합니다</span> | 모든 변형 | 필수 |
| 12 | Standby 모드 기준 전류 요구 사항이 기록되어 있습니다 | 모든 변형 | 필수 |
| 13 | <span class="flag-red">Standby 모드에서 선택한 주변 장치의 기준 전류 합계가 기록되어 있으며 프로젝트 요구 사항을 충족합니다</span> | 모든 변형 | 필수 |
| 14 | 출력으로 사용하는 PB43~PB48 웨이크 핀은 Standby에서 내부 풀이 비활성화되므로 외부 풀업 또는 풀다운을 확보해 둡니다 | 모든 변형 | 필수 |

</div>

### 5.8.26. 오프라인 플래싱 및 크리스털 캘리브레이션 { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>표 5.8.26-1: 오프라인 플래싱 및 크리스털 캘리브레이션 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 적용 대상 | 구분 |
|:---|:---|:---|:---|
| 1 | 오프라인 플래싱 보드로 펌웨어를 기록해야 하는 경우 VBAT, GND, UART3_TXD, UART3_RXD, MODE, RESET 테스트 포인트를 확보해 둡니다 | 모든 변형 | 선택 |
| 2 | 크리스털 캘리브레이션이 필요한 경우 PB08을 확보해 둡니다. PB08을 주변 장치에 연결하는 경우 출력으로 사용하는 것이 좋으며 외부 커패시턴스를 연결하지 않습니다 | 모든 변형 | 선택 |

</div>
