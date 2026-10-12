---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB55x MCU의 회로 설계 가이드라인: 전원 시스템, 부트 모드, 클럭 생성, RF, 스토리지 인터페이스, 디스플레이 및 터치 인터페이스, 웨이크/GPADC/제조 인터페이스."
tags:
    - 하드웨어
    - 칩
---

# SF32LB55x 하드웨어 설계 가이드 — 회로 설계 가이드라인 { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. 회로 설계 가이드라인 { #5-schematic-design-guidelines }

<div align="center"><em>표 5-1: 회로도 섹션 구성</em></div>

<div align="center" markdown>

| 그룹 | 주제 |
|:---|:---|
| 전원 시스템 | PMU 레일, 기타 레일, 커패시터, POR/BOR/리셋, BUCK 인덕터. |
| 부트 모드 | Mode 핀 전압 도메인, 풀 저항, 플래싱/복구 및 양산 접근. |
| 클럭 생성 | 48 MHz 크리스털, 32.768 kHz 크리스털, 매칭 커패시터 검토. |
| RF | RF 매칭, 50 ohm 안테나 경로, AVDD_BRF 필터링, RF 금지 구역. |
| 스토리지 인터페이스 | OPI PSRAM, QSPI NOR/NAND/PSRAM, SDIO eMMC/Micro SD. |
| 디스플레이 및 터치 | MIPI DSI, SPI/QSPI, MCU8080, JDI, 터치 인터럽트, 리셋, 백라이트, 패널 전원. |
| 웨이크, GPADC, 제조 | 웨이크 소스와 버튼, 모터 PWM, GPADC 분압기, 센서, Bluetooth 오디오, DBG-UART, SWD, 양산 플래싱 및 크리스털 캘리브레이션. |

</div>

### 5.1. 전원 시스템 { #51-power-system }

QFN68L 패키지의 SF32LB551에는 VDD2, BUCK2_VSW, BUCK2_VOUT, LDOVCC2_VOUT, AVDD_DSI 핀이 없습니다. 전원 표와 커패시터 표는 선택한 패키지에 있는 핀에만 적용하십시오. BGA 패키지는 BUCK 출력을 두 개 제공하며, BUCK2는 BUCK 또는 LDO 동작을 지원하고 BUCK 모드를 권장합니다. QFN68L은 BUCK 출력을 하나 제공합니다.

<div align="center"><em>표 5.1-1: PMU 전원 핀</em></div>

<div align="center" markdown>

| PMU 전원 핀 | 최소 전압 (V) | 전형 전압 (V) | 최대 전압 (V) | 최대 전류 (mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VDD1 | 1.71 | 1.8 | 3.6 | 50 | VDD1 전원 입력 |
| VDD2 | 1.71 | 1.8 | 3.6 | 50 | VDD2 전원 입력 |
| BUCK1_VSW BUCK1_VOUT | - | 1.25 | - | 50 | BUCK1 VSW 출력으로 인덕터에 연결하며, 내부 전원 입력 1은 인덕터의 다른 쪽 끝과 외부 커패시터에 연결 |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0.9 | - | 50 | BUCK2 VSW 출력으로 인덕터에 연결하며, 내부 전원 입력 2는 인덕터의 다른 쪽 끝과 외부 커패시터에 연결 |
| LDO_VOUT1 | - | 1.1 | - | 50 | LDO 출력 1, 외부 커패시터 연결 |
| LDO_VOUT2 | - | 0.9 | - | 20 | LDO 출력 2, 외부 커패시터 연결 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 출력, 외부 커패시터 연결 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 출력, 외부 커패시터 연결 |

</div>

<div align="center"><em>표 5.1-2: 기타 전원 핀</em></div>

<div align="center" markdown>

| 기타 전원 핀 | 최소 전압 (V) | 전형 전압 (V) | 최대 전압 (V) | 최대 전류 (mA) | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AVDD_BRF | 1.71 | 1.8 | 3.63 | 30 | RF 전원 입력 |
| AVDD_DSI | 1.71 | 1.8 | 2.75 | 20 | MIPI DSI 전원 입력, 전원을 반드시 공급해야 함 |
| VDD_SIP | 1.71 | 1.8 | 1.98 | 30 | 함께 패키징된 메모리 칩의 전원 입력 |
| AVDD33 | 3.15 | 3.3 | 3.63 | 50 | 전원 입력 |
| VDDIOA | 1.71 | 1.8 | 3.63 | - | PA I/O 전원 입력 |
| VDDIOB | 1.71 | 1.8 | 3.63 | - | PB I/O 전원 입력 |

</div>

<div align="center"><em>표 5.1-3: 필수 전원 커패시터</em></div>

<div align="center" markdown>

| 전원 핀 | 커패시터 | 상세 설명 |
| :--- | :--- | :--- |
| VDD1 VDD2 | 0.1 µF + 10 µF | VDD1과 VDD2를 서로 연결합니다. 10 µF와 0.1 µF 커패시터를 각각 하나 이상, 해당 핀 가까이에 배치합니다 |
| BUCK1_VSW BUCK1_VOUT | 0.1 µF + 4.7 µF | 4.7 µF와 0.1 µF 커패시터를 각각 하나 이상, 해당 핀 가까이에 배치합니다 |
| BUCK2_VSW BUCK2_VOUT | 0.1 µF + 4.7 µF | 4.7 µF와 0.1 µF 커패시터를 각각 하나 이상, 해당 핀 가까이에 배치합니다 |
| LDOVCC2_VOUT | 0.1 µF + 4.7 µF | BUCK2를 BUCK 모드로 구성한 경우 이 핀은 플로팅 상태로 둡니다. BUCK2를 LDO 모드로 구성한 경우 BUCK2_VSW는 플로팅 상태로 두고, LDOVCC2_VOUT과 BUCK2_VOUT을 서로 연결한 다음 4.7 µF와 0.1 µF 커패시터를 각각 하나 이상, 해당 핀 가까이에 배치합니다 |
| LDO_VOUT1 | 4.7 µF | 4.7 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| LDO_VOUT2 | 4.7 µF | 4.7 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| VDD_RET | 0.47 µF | 0.47 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| VDD_RTC | 1 µF | 1 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| VDD_SIP | 1 µF | 1 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| SDMADC_VREF | 4.7 µF | 4.7 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| AVDD_DSI | 0.1 µF + 10 µF | 10 µF와 0.1 µF 커패시터를 각각 하나 이상, 해당 핀 가까이에 배치합니다 |
| AVDD33 | 4.7 µF | 4.7 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| AVDD_BRF | 1 µF | 1 µF 커패시터를 최소 한 개 핀 가까이에 배치합니다 |
| VDDIOA VDDIOB | 2 × 0.1 µF + 2 × 1 µF | 각 핀 가까이에 1 µF와 0.1 µF 커패시터를 각각 하나씩 배치합니다 |

</div>

필수 커패시터를 해당 핀 가까이에 배치하고, BUCK 전류 루프를 작게 유지하며, 레이아웃 전에 BUCK/LDO 동작 모드를 확인하십시오. 리셋 회로와 POR/BOR 타이밍은 실제 하드웨어에서 확인하는 것이 좋습니다.

원본 문서들의 내용이 서로 다릅니다. [SiFli의 중국어 하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)의 표 3-3과 [V1.0 회로도 체크리스트](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)의 9번 항목은 VDD_RTC를 1 µF로 지정하지만, [가이드 레퍼런스 회로도의 C0313](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png)은 0.1 µF로 표기되어 있습니다. 각 값이 언제 적용되는지는 설명되어 있지 않습니다. 설계를 릴리스하기 전에 해당 디바이스에 필요한 값을 SiFli에 확인하십시오. 이 불일치를 추정으로 해결해서는 안 됩니다.

VDD1과 VDD2에는 동시에 전원을 공급합니다. SF32LB551에는 VDD2가 없습니다. RSTN은 VDD1 입력 전압 도메인으로 풀업하고 0.1 µF를 그라운드에 연결합니다. 레퍼런스 도면은 풀업 레일을 1.8 V/3.3 V로 표기하고 10 kΩ 저항을 사용합니다. 선택한 설계의 VDD1 도메인에 해당하는 레벨을 사용하십시오. 그림 5.1-1은 1.50 V POR 레벨, 2.5 V에서 1.5 V까지 설정 가능한 BOR, 0.7 V RSTN 표시를 보여 줍니다. 그림 5.1-3의 측정 트레이스는 해당 예제에서 전원이 상승한 시점부터 리셋이 해제되기까지 약 700 µs가 걸림을 보여 주며, 이는 모든 설계에 보장되는 리셋 지연 시간이 아닙니다.

![그림 5.1-1: 전원 켜기 및 끄기 타이밍](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-1: 전원 켜기 및 끄기 타이밍</em></div>

![그림 5.1-2: 리셋 회로](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-2: 리셋 회로</em></div>

![그림 5.1-3: 전원 인가 및 리셋 측정 트레이스](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-3: 전원 인가 및 리셋 측정 트레이스</em></div>

![그림 5.1-4: BGA DC-DC 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-4: BGA DC-DC 레퍼런스 회로</em></div>

![그림 5.1-5: QFN DC-DC 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.1-5: QFN DC-DC 레퍼런스 회로</em></div>

SiFli의 하드웨어 애플리케이션 노트에 지정된 대로, DCR이 0.4 ohm 이하이고 포화 전류 Isat가 450 mA 이상인 4.7 µH BUCK 인덕터를 선택하십시오.

### 5.2. 부트 모드 { #52-boot-mode }

<div align="center"><em>표 5.2-1: 부트 모드 구성</em></div>

<div align="center" markdown>

| 모드 구성 | 상세 설명 |
| :--- | :--- |
| High | 칩에 전원이 들어와 기동한 후 다운로드 모드로 진입합니다 |
| Low | 칩에 전원이 들어와 기동한 후 사용자 프로그램 영역으로 점프하여 시작합니다 |

</div>

High 모드는 전원을 켠 뒤 다운로드 모드로 진입하고, Low 모드는 사용자 프로그램을 부팅합니다. 양산 픽스처가 필요한 부트 상태를 강제할 수 있어야 하며, 제품 인클로저나 테스트 접근 제약 때문에 부트 관련 핀에 접근하지 못하는 일이 없도록 하십시오.

Mode 핀은 VDDIOA 전압 도메인을 공유합니다. 외부 10 kΩ 저항으로 필요한 전원 또는 그라운드 레벨에 고정하고, 플로팅 상태로 두거나 의도하지 않은 토글이 발생하지 않도록 하십시오. 양산 보드는 펌웨어 플래싱과 크리스털 캘리브레이션을 위해 Mode 테스트 포인트를 노출해야 하며, 점퍼는 필요하지 않습니다. 테스트 보드에는 애플리케이션이 멈췄을 때 다운로드 모드로 부팅하여 복구할 수 있도록 점퍼를 확보해 두십시오.

### 5.3. 클럭 생성 { #53-clock-generation }

<div align="center"><em>표 5.3-1: 크리스털 요구 사항</em></div>

<div align="center" markdown>

| 크리스털 | 크리스털 사양 요구 사항 | 상세 설명 |
| :--- | :--- | :--- |
| 48MHz | 7pF≦CL≦12pF (권장값 8.8pF) △F/F0≦±10ppm ESR≦30 ohms (권장값 22ohms) | 크리스털 오실레이터의 소비 전력은 CL 및 ESR과 관련이 있습니다. CL과 ESR이 작을수록 소비 전력이 낮아집니다. 최적의 전력 성능을 위해서는 요구 범위 안에서 CL과 ESR이 비교적 작은 부품을 사용하는 것이 좋습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 둡니다. CL<12pF이면 커패시터를 실장할 필요가 없습니다 |
| 32.768KHz | CL≦12.5pF (권장값 7pF) △F/F0≦±20ppm ESR≦80k ohms (권장값 38Kohms) | 크리스털의 소비 전력은 CL 및 ESR과 관련이 있습니다. CL과 ESR이 작을수록 소비 전력이 낮아집니다. 최적의 소비 전력 성능을 위해서는 요구 범위 안에서 CL과 ESR이 비교적 작은 부품을 사용하는 것이 좋습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 둡니다. CL<12.5pF이면 커패시터를 납땜할 필요가 없습니다 |

</div>

두 크리스털을 모두 칩 가까이에 배치하고, 트레이스를 짧고 대칭적으로 유지하며, 매칭 커패시터 풋프린트를 확보해 두고, 크리스털 넷을 RF, BUCK, 디스플레이, 모터 노이즈로부터 보호하십시오.

### 5.4. RF { #54-rf }

SF32LB55x의 RF 프런트엔드는 온칩 광대역 매칭 필터 기술을 사용합니다. RF PCB 트레이스는 특성 임피던스 50 ohm을 유지하고, 스퓨리어스 필터링과 안테나 매칭을 위한 π형 매칭 회로를 확보해 두며, 최종 부품 값은 실제 안테나와 PCB 레이아웃으로 테스트하여 결정하십시오. 선택한 안테나가 이미 매칭되어 있다면, 확보해 둔 회로 외에 추가 RF 부품은 보통 필요하지 않습니다.

RF 라우팅은 연속된 기준 그라운드 위에 유지하고, 매칭 회로는 칩 쪽 가까이에 배치하며, AVDD_BRF 필터링은 핀 가까이에 두고, DC-DC, VBAT, 크리스털, 고속 클럭, SPI, SDIO, I2S, UART 트레이스는 RF 영역에서 멀리 떨어뜨리십시오.

RF 레퍼런스 회로는 ANT와 직렬로 C0323(15 pF/50 V)을 배치하고, 두 션트 위치 C0318과 C0319는 미실장(NF) 상태로 둡니다. 이는 예시 값이며, 모든 안테나에 통용되는 매칭 값이 아닙니다.

![그림 5.4-1: RF 매칭 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.4-1: RF 매칭 레퍼런스 회로</em></div>

### 5.5. 스토리지 인터페이스 { #55-storage-interfaces }

SF32LB55x는 OPI PSRAM, QSPI NOR/NAND 플래시 및 PSRAM, SDIO eMMC 또는 Micro SD 옵션을 지원합니다. 패키지 선택에 따라 사용할 수 있는 핀과 인터페이스가 달라지므로, 핀을 확정하고 PCB 스택업을 검토하기 전에 스토리지 선택을 마치는 것이 좋습니다.

BGA145에는 외부 OPI-PSRAM 채널이 하나 있고, BGA169에는 두 개 있습니다. 표 5.5-1~5.5-3은 BGA145 구성과 두 개의 BGA169 메모리 디바이스를 설명하며, 하나의 패키지에 채널이 세 개 있다는 뜻이 아닙니다. QSPI 표는 QSPI2, QSPI3, QSPI4에 해당합니다. SDIO 표는 4비트/8비트 모드의 SDIO1과 4비트 모드의 SDIO2를 다룹니다.

외부 QSPI PSRAM에는 QSPI2를 우선 사용하십시오. HCPU GPIO로 외부 OPI/QSPI PSRAM 전원을 제어하는 경우, High로 활성화하고 Low로 비활성화하는 PU 유형의 HCPU 핀을 사용하십시오. 내부 플래시용 VDD_SIP를 스위칭하는 경우에는 같은 High 켜짐/Low 꺼짐 극성으로 PA58을 사용하십시오. QSPI4 NOR 플래시를 추가할지 결정하기 전에, LCPU 가속도계 및 심박 알고리즘에 필요한 플래시 공간을 SiFli의 FAE에게 평가해 달라고 요청하십시오.

원본 표들은 방향 표기가 일관되지 않습니다. [BGA145 레퍼런스 회로도](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png)와 [BGA169 디바이스 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png) 및 [디바이스 2 레퍼런스 회로도](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png)에서 MCU 핀 PA37/PA20과 PA07/PA08은 각각 외부 PSRAM의 CS# 및 CLK 핀을 구동합니다. 따라서 아래 표는 CS#와 CLK를 MCU 쪽에서 본 방향, 즉 MCU 출력과 PSRAM 입력으로 설명합니다. 회로도로는 DQS/DM의 방향이 고정되어 있는지 확인할 수 없으므로, 선택한 PSRAM 데이터시트에서 그 기능과 방향을 확인하십시오.

도시된 각 PSRAM은 1.8 V 전원, 0.1 µF 커패시터 세 개, 1 µF/6.3 V 커패시터 한 개를 사용합니다. 연결되지 않은 것으로 표시된 RESET# 및 NC/CLK# 연결은 도시된 메모리 부품에 해당하는 내용이므로, 일반화하지 말고 선택한 부품의 데이터시트를 확인하십시오.

![그림 5.5-1: BGA145 OPI PSRAM 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-1: BGA145 OPI PSRAM 레퍼런스 회로</em></div>

<div align="center"><em>표 5.5-1: OPI PSRAM: BGA145</em></div>

<div align="center" markdown>

| PSRAM 신호 | MCU 핀 | 상세 설명 |
| :--- | :--- | :--- |
| CS# | PA37 | MCU 출력, PSRAM 입력 |
| CLK | PA20 | MCU 출력, PSRAM 입력 |
| DQS | PA35 | DQS/DM, 선택한 PSRAM 데이터시트에서 기능과 방향 확인 |
| DQ0 | PA28 | 데이터 입출력 0 |
| DQ1 | PA29 | 데이터 입출력 1 |
| DQ2 | PA30 | 데이터 입출력 2 |
| DQ3 | PA31 | 데이터 입출력 3 |
| DQ4 | PA34 | 데이터 입출력 4 |
| DQ5 | PA36 | 데이터 입출력 5 |
| DQ6 | PA38 | 데이터 입출력 6 |
| DQ7 | PA42 | 데이터 입출력 7 |

</div>

![그림 5.5-2: BGA169 OPI PSRAM 디바이스 1 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-2: BGA169 OPI PSRAM 디바이스 1 레퍼런스 회로</em></div>

<div align="center"><em>표 5.5-2: OPI PSRAM: BGA169, 메모리 디바이스 1</em></div>

<div align="center" markdown>

| PSRAM 신호 | MCU 핀 | 상세 설명 |
| :--- | :--- | :--- |
| CS# | PA07 | MCU 출력, PSRAM 입력 |
| CLK | PA08 | MCU 출력, PSRAM 입력 |
| DQS | PA15 | DQS/DM, 선택한 PSRAM 데이터시트에서 기능과 방향 확인 |
| DQ0 | PA02 | 데이터 입출력 0 |
| DQ1 | PA04 | 데이터 입출력 1 |
| DQ2 | PA05 | 데이터 입출력 2 |
| DQ3 | PA06 | 데이터 입출력 3 |
| DQ4 | PA09 | 데이터 입출력 4 |
| DQ5 | PA11 | 데이터 입출력 5 |
| DQ6 | PA12 | 데이터 입출력 6 |
| DQ7 | PA13 | 데이터 입출력 7 |

</div>

![그림 5.5-3: BGA169 OPI PSRAM 디바이스 2 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-3: BGA169 OPI PSRAM 디바이스 2 레퍼런스 회로</em></div>

<div align="center"><em>표 5.5-3: OPI PSRAM: BGA169, 메모리 디바이스 2</em></div>

<div align="center" markdown>

| PSRAM 신호 | MCU 핀 | 상세 설명 |
| :--- | :--- | :--- |
| CS# | PA07 | MCU 출력, PSRAM 입력 |
| CLK | PA08 | MCU 출력, PSRAM 입력 |
| DQS | PA26 | DQS/DM, 선택한 PSRAM 데이터시트에서 기능과 방향 확인 |
| DQ0 | PA18 | 데이터 입출력 0 |
| DQ1 | PA22 | 데이터 입출력 1 |
| DQ2 | PA24 | 데이터 입출력 2 |
| DQ3 | PA32 | 데이터 입출력 3 |
| DQ4 | PA33 | 데이터 입출력 4 |
| DQ5 | PA59 | 데이터 입출력 5 |
| DQ6 | PA62 | 데이터 입출력 6 |
| DQ7 | PA64 | 데이터 입출력 7 |

</div>

<div align="center"><em>표 5.5-4: QSPI2: NOR/NAND 플래시 또는 PSRAM</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CS# | GPIO9 | PA61 | 칩 셀렉트, active low |
| SO | GPIO7 | PA65 | 데이터 입력 (데이터 입출력 1) |
| WP# | GPIO6 | PA66 | 쓰기 보호 출력 (데이터 입출력 2) |
| SI | GPIO8 | PA63 | 데이터 출력 (데이터 입출력 0) |
| SCLK | GPIO10 | PA60 | 시리얼 클럭 출력 |
| Hold# | GPIO5 | PA68 | 데이터 출력 (데이터 입출력 3) |

</div>

<div align="center"><em>표 5.5-5: QSPI3: NOR/NAND 플래시 또는 PSRAM</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CS# | GPIO16 | PA45 | 칩 셀렉트, active low |
| SO | GPIO14 | PA49 | 데이터 입력 (데이터 입출력 1) |
| WP# | GPIO13 | PA51 | 쓰기 보호 출력 (데이터 입출력 2) |
| SI | GPIO15 | PA47 | 데이터 출력 (데이터 입출력 0) |
| SCLK | GPIO17 | PA44 | 시리얼 클럭 출력 |
| Hold# | GPIO12 | PA55 | 데이터 출력 (데이터 입출력 3) |

</div>

<div align="center"><em>표 5.5-6: QSPI4: NOR/NAND 플래시 또는 PSRAM</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CS# | - | PB33 | 칩 셀렉트, active low |
| SO | - | PB36 | 데이터 입력 (데이터 입출력 1) |
| WP# | - | PB37 | 쓰기 보호 출력 (데이터 입출력 2) |
| SI | - | PB35 | 데이터 출력 (데이터 입출력 0) |
| SCLK | - | PB32 | 시리얼 클럭 출력 |
| Hold# | - | PB07 | 데이터 출력 (데이터 입출력 3) |

</div>

<div align="center"><em>표 5.5-7: SDIO1: 4비트 eMMC/Micro SD</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | 클럭 입력 |
| CMD | GPIO9 | PA36 | 명령 입력 |
| DATA0 | GPIO8 | PA28 | 데이터 0 |
| DATA1 | GPIO7 | PA29 | 데이터 1 |
| DATA2 | GPIO6 | PA30 | 데이터 2 |
| DATA3 | GPIO5 | PA31 | 데이터 3 |

</div>

<div align="center"><em>표 5.5-8: SDIO1: 8비트 eMMC</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | 클럭 입력 |
| CMD | GPIO9 | PA36 | 명령 입력 |
| DATA0 | GPIO8 | PA28 | 데이터 0 |
| DATA1 | GPIO7 | PA29 | 데이터 1 |
| DATA2 | GPIO6 | PA30 | 데이터 2 |
| DATA3 | GPIO5 | PA31 | 데이터 3 |
| DATA4 | GPIO15 | PA47 | 데이터 4 |
| DATA5 | GPIO14 | PA49 | 데이터 5 |
| DATA6 | GPIO13 | PA51 | 데이터 6 |
| DATA7 | GPIO12 | PA55 | 데이터 7 |

</div>

<div align="center"><em>표 5.5-9: SDIO2: 4비트 eMMC/Micro SD</em></div>

<div align="center" markdown>

| 인터페이스 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO17 | PA44 | 클럭 입력 |
| CMD | GPIO16 | PA45 | 명령 입력 |
| DATA0 | GPIO15 | PA47 | 데이터 0 |
| DATA1 | GPIO14 | PA49 | 데이터 1 |
| DATA2 | GPIO13 | PA51 | 데이터 2 |
| DATA3 | GPIO12 | PA55 | 데이터 3 |

</div>


### 5.6. 디스플레이 및 터치 인터페이스 { #56-display-and-touch-interfaces }

디스플레이는 MIPI DSI, SPI/QSPI, MCU8080, JDI 중에서 선택할 수 있습니다. 인터페이스 폭, 클로킹, 전원 제어, 터치 인터럽트, 백라이트 방식을 함께 검토할 수 있도록, 핀을 할당하고 PCB를 라우팅하기 전에 패널을 선택하십시오.

병렬 JDI와 직렬 JDI 모두 PA 쪽 LCDC1 또는 PB 쪽 LCDC2의 멀티플렉싱된 신호 그룹을 통해 지원됩니다. 아래 표에는 PA/LCDC1 할당만 나열하며, SiFli는 PB/LCDC2 인터페이스를 권장합니다. 원본 가이드에는 핀별 LCDC2 표가 없으므로, LCDC1 표에서 유추하지 말고 칩 핀 먹스 문서에서 실제 할당을 확인하십시오.

<div align="center"><em>표 5.6-1: MIPI DSI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| MIPI DSI 신호 | BGA145/169 핀 | 설명 |
| :--- | :--- | :--- |
| CLKP | DSI_CLKP | MIPI 클럭 신호 + |
| CLKN | DSI_CLKN | MIPI 클럭 신호 - |
| D0P | DSI_D0P | MIPI 데이터 레인 0+ |
| D0N | DSI_D0N | MIPI 데이터 레인 0- |
| D1P | DSI_D1P | MIPI 데이터 레인 1+ |
| D1N | DSI_D1N | MIPI 데이터 레인 1- |
| - | AVDD18_DSI | MIPI 전원 입력 |
| - | DSI_REXT | 외부 10K 저항을 그라운드에 연결 |
| - | AVSS_DSI | 그라운드 |
| TE | PA77 | MCU 프레임 신호에 대한 티어링 이펙트 |
| RESET | PB17 | 디스플레이 패널 리셋 신호 |

</div>

디스플레이 핀 선택 참고 사항:

- TE에는 PA 그룹의 다른 GPIO를 사용할 수 있습니다.
- 패널이 DSI를 통한 TE를 지원하면 별도의 TE 핀이 필요하지 않습니다.
- RESET에는 PB 그룹의 다른 GPIO를 사용할 수 있습니다.

<div align="center"><em>표 5.6-2: SPI/QSPI 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| SPI 신호 | QFN68 GPIO | BGA145/169 핀 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | PB33 | 인에이블 신호 |
| WRX_SCL | GPIO23 | PB32 | 클럭 신호 |
| DCX | GPIO20 | PB36 | 4선 SPI 모드에서는 데이터/명령 신호, Quad-SPI 모드에서는 데이터 1 |
| SDI_RDX | GPIO21 | PB35 | 3/4선 SPI 모드에서는 데이터 입력 신호, Quad-SPI 모드에서는 데이터 0 |
| SDO | GPIO21 | PB35 | 3/4선 SPI 모드에서는 데이터 출력 신호이며 SDI_RDX와 단락 |
| D[0] | GPIO19 | PB37 | Quad-SPI 모드에서는 데이터 2 |
| D[1] | GPIO18 | PB07 | Quad-SPI 모드에서는 데이터 3 |
| RESET | GPIO2 | PB17 | 디스플레이 패널 리셋 신호 |
| TE | GPIO3 | PB77 | MCU 프레임 신호에 대한 티어링 이펙트 |

</div>

디스플레이 핀 선택 참고 사항:

- TE에는 PA77 또는 해당 신호를 에뮬레이션하도록 구성한 PA 그룹의 다른 GPIO를 사용할 수 있습니다.
- RESET에는 아무 GPIO나 사용할 수 있습니다. 상시 표시(AOD) 디스플레이에는 SiFli가 PB 그룹의 GPIO를 권장합니다.

<div align="center"><em>표 5.6-3: MCU8080 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| MCU8080 신호 | QFN68 GPIO | BGA145/169 핀 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | - | 칩 셀렉트 |
| WRX | GPIO23 | - | 디스플레이로 데이터를 보내기 위한 쓰기 스트로브 |
| DCX | GPIO20 | - | 디스플레이 데이터/명령 선택 |
| RDX | GPIO21 | - | 디스플레이 읽기 트랜잭션을 위한 읽기 스트로브 |
| D[0] | GPIO19 | - | 데이터 0 |
| D[1] | GPIO18 | - | 데이터 1 |
| D[2] | GPIO17 | - | 데이터 2 |
| D[3] | GPIO16 | - | 데이터 3 |
| D[4] | GPIO15 | - | 데이터 4 |
| D[5] | GPIO14 | - | 데이터 5 |
| D[6] | GPIO13 | - | 데이터 6 |
| D[7] | GPIO12 | - | 데이터 7 |
| RESET | GPIO2 | - | 리셋 |
| TE | GPIO3 | - | MCU 프레임 신호에 대한 티어링 이펙트 |

</div>

디스플레이 핀 선택 참고 사항:

- TE에는 PA77 또는 해당 신호를 에뮬레이션하도록 구성한 PA 그룹의 다른 GPIO를 사용할 수 있습니다.
- RESET에는 아무 GPIO나 사용할 수 있습니다. 상시 표시(AOD) 디스플레이에는 SiFli가 PB 그룹의 GPIO를 권장합니다.

[SiFli 하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md)는 RDX를 읽기 스트로브로 표기하지만 설명의 끝을 “to write data.”로 맺고 있습니다. 이 문구는 RDX 표기 및 짝을 이루는 WRX 쓰기 스트로브 신호와 충돌하므로, 여기서는 원본의 표현 오류로 간주합니다. 리드백 지원 여부와 타이밍은 선택한 디스플레이 컨트롤러에 따라 달라지므로, 해당 컨트롤러의 데이터시트에서 확인하십시오.

<div align="center"><em>표 5.6-4: JDI 병렬 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| JDI 신호 | MCU 핀 (LCDC1) | 상세 설명 |
| :--- | :--- | :--- |
| JDI_VCK | PA20 | 수직 드라이버용 시프트 클럭 |
| JDI_VST | PA31 | 수직 드라이버용 시작 신호 |
| JDI_XRST | PA34 | 수평 및 수직 드라이버용 리셋 신호 |
| JDI_HCK | PA36 | 수평 드라이버용 시프트 클럭 |
| JDI_HST | PA38 | 수평 드라이버용 시작 신호 |
| JDI_ENB | PA42 | 픽셀 메모리용 쓰기 인에이블 신호 |
| JDI_R1 | PA49 | 적색 이미지 데이터 (홀수 픽셀) |
| JDI_R2 | PA51 | 적색 이미지 데이터 (짝수 픽셀) |
| JDI_G1 | PA55 | 녹색 이미지 데이터 (홀수 픽셀) |
| JDI_G2 | PA77 | 녹색 이미지 데이터 (짝수 픽셀) |
| JDI_B1 | PA78 | 청색 이미지 데이터 (홀수 픽셀) |
| JDI_B2 | PA79 | 청색 이미지 데이터 (짝수 픽셀) |
| JDI_XFRP | PA45 | 액정 구동 신호 (“On” 픽셀) |
| JDI_VCOM/FRP | PA47 | 공통 전극 구동 신호/ 액정 구동 신호 (“Off” 픽셀) |

</div>

<div align="center"><em>표 5.6-5: JDI 직렬 디스플레이 인터페이스</em></div>

<div align="center" markdown>

| JDI 신호 | MCU 핀 (LCDC1) | 상세 설명 |
| :--- | :--- | :--- |
| JDI_SCS | PA31 | 칩 셀렉트 신호 |
| JDI_SCLK | PA20 | 시리얼 클럭 신호 |
| JDI_SO | PA34 | 시리얼 데이터 출력 신호 |
| JDI_DISP | PA36 | 디스플레이 ON/OFF 전환 신호 |
| JDI_EXTCOMIN | PA38 | COM 반전 극성 입력 |

</div>

<div align="center"><em>표 5.6-6: 터치 및 백라이트 인터페이스</em></div>

<div align="center" markdown>

| 터치스크린 및 백라이트 신호 | QFN68 GPIO | BGA145 핀 | BGA169 핀 | 상세 설명 |
| :--- | :--- | :--- | :--- | :--- |
| Interrupt | GPIO1 | PA79 | PA79 | 터치 상태 인터럽트 신호 (웨이크업 가능) |
| I2C1_SCL | GPIO25 | PA10 | PA10 | 터치스크린 I2C 클럭 신호 |
| I2C1_SDA | GPIO24 | PA14 | PA14 | 터치스크린 I2C 데이터 신호 |
| BL_PWM | GPIO0 | - | - | 백라이트 PWM 제어 신호 |
| Reset | GPIO16 | PA00 | PA00 | 터치 리셋 신호 |
| Power Enable | GPIO26 | PA06 | PA03 | 터치스크린 전원 인에이블 신호 |

</div>

BL_PWM에는 GPTIM1_CHx 기능이 있는 GPIO를 사용하고, 콜드 스타트 중에 백라이트가 의도치 않게 켜지는 것을 막기 위해 적절한 풀업 또는 풀다운 상태를 구성하십시오.

### 5.7. 웨이크, GPADC, 제조 인터페이스 { #57-wake-gpadc-and-manufacturing-interfaces }

웨이크, 아날로그, 디버그, 양산 접근 수단은 인클로저와 픽스처를 염두에 두고 계획해야 합니다. 웨이크 핀에는 정해진 유휴 레벨과 ESD 보호가 필요하고, GPADC 분압기는 안정화 시간과 누설 사이의 균형을 맞춰야 하며, 디버그/플래싱 접근 수단은 EVT와 양산 단계에서도 접근할 수 있어야 합니다.

SF32LB55x는 HCPU 웨이크 소스 네 개(WKUP_A0–WKUP_A3)와 LCPU 웨이크 소스 여섯 개(WKUP_B0–WKUP_B5)를 제공합니다. 각 소스는 연결된 CPU를 깨우며, Hibernate에서 시스템을 깨울 수 있는 것은 LCPU 소스 여섯 개뿐입니다. 이 열 개의 입력은 어느 것도 플로팅 상태로 두면 안 되며, 기능에 맞게 외부 풀업 또는 풀다운 저항을 추가하여 슬립 중 누설을 방지하십시오.

레퍼런스 회로에서 KEY1은 PB48에 연결되며 VDD_1V8로의 10 kΩ 풀업, ESD 보호, 커패시터가 있습니다. KEY2 네트워크에는 10 kΩ 풀업, ESD 보호, PA08, PA77, PA78에 대한 점퍼 선택식 연결이 있으며, C0004는 NF로 표시되어 있습니다. 이는 회로 예시이며 웨이크 가능한 핀의 목록이 아닙니다. PA08은 표 5.7-1에 나열되어 있지 않습니다. 실제 웨이크 가능 입력은 해당 표에서 선택하고, 모든 입력을 정해진 유휴 레벨로 유지하십시오.

![그림 5.7-1: 웨이크 버튼 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.7-1: 웨이크 버튼 레퍼런스 회로</em></div>

모터 PWM에는 GPTIM1_CHx가 있는 GPIO를 사용하십시오. 콜드 스타트 시 모터가 의도치 않게 작동하지 않도록 적절한 PU/PD 핀 동작을 선택하십시오. 레퍼런스 회로는 GPIO17(PA44), 로우사이드 트랜지스터, 1 MΩ 게이트 풀다운을 사용하며, 모터 전원은 3 V, MCU 전원은 별도의 3.3 V입니다.

![그림 5.7-2: 모터 드라이버 레퍼런스 회로](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.7-2: 모터 드라이버 레퍼런스 회로</em></div>

<div align="center"><em>표 5.7-1: 웨이크업 인터럽트 소스</em></div>

<div align="center" markdown>

| 인터럽트 소스 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| WKUP_A0 | GPIO3 | PA77 | HCPU 인터럽트 신호 0 |
| WKUP_A1 | GPIO2 | PA78 | HCPU 인터럽트 신호 1 |
| WKUP_A2 | GPIO1 | PA79 | HCPU 인터럽트 신호 2 |
| WKUP_A3 | GPIO0 | PA80 | HCPU 인터럽트 신호 3 |
| WKUP_B0 | GPIO43 | PB43 | LCPU 인터럽트 신호 0 |
| WKUP_B1 | GPIO44 | PB44 | LCPU 인터럽트 신호 1 |
| WKUP_B2 | GPIO45 | PB45 | LCPU 인터럽트 신호 2 |
| WKUP_B3 | GPIO46 | PB46 | LCPU 인터럽트 신호 3 |
| WKUP_B4 | GPIO47 | PB47 | LCPU 인터럽트 신호 4 |
| WKUP_B5 | GPIO48 | PB48 | LCPU 인터럽트 신호 5 |

</div>

SiFli의 하드웨어 애플리케이션 가이드는 입력 범위가 0–0.9 V인 5채널 10비트 GPADC를 설명합니다. 보수적인 보드 설계를 위해서는 VIN이 0.9 V 미만일 때만 직접 연결하고, 그보다 높은 전압은 VADC가 0.9 V 미만이 되도록 분압하십시오. 배터리 감지에는 원본 문서가 R1:R2를 5:1 근처로 하고 MΩ 범위의 저항을 사용할 것을 제안하며, 분압기 전류를 낮추는 대신 안정화 시간이 길어집니다. 도시된 분압기는 VADC와 그라운드 사이에 0.1 µF를 추가합니다. `VADC = VIN × R2 / (R1 + R2)`를 사용하고 최대 배터리 전압과 저항 허용 오차를 확인하십시오. 표 5.7-2의 전류 값은 VIN = 4.2 V 기준이며 모든 배터리 조건에 해당하지는 않습니다.

원본 불일치: 우선순위가 더 높은 [OpenSiFli 하드웨어 애플리케이션 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)는 입력 범위가 0–0.9 V인 5채널 10비트 GPADC를 설명합니다. [V1.0 회로도 체크리스트](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)의 2번 항목은 최대 1.0 V로 정하지만 채널 수는 지정하지 않습니다. 반면 [SF32LB55x 데이터시트 V1.7.2의 3.2.1절](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)은 단일 종단 입력 8개 또는 차동 쌍 4개를 지정하며, 단일 종단 범위는 0–1.1 V, 차동 범위는 −0.7~0.7 V이고, 핀 표에는 GPADC_CH0–CH7이 나열되어 있습니다. 현재 [SDK ADC 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)도 채널을 8개(0–7)로 매핑하고 샘플링 최대 전압을 1.1 V로 기재합니다. SiFli는 이처럼 상충하는 채널 수와 전압 한계를 설명하지 않았습니다. 따라서 이 가이드는 서면 확인이 있을 때까지 우선순위가 더 높은 하드웨어 애플리케이션의 5채널 및 0–0.9 V 설계 기준을 유지합니다. VADC를 0.9 V 미만으로 유지하십시오. 1.0 V나 1.1 V를 승인된 설계 한계로 취급해서는 안 되며, 선택한 디바이스와 패키지에서 사용할 수 있는 채널을 확인하십시오.

![그림 5.7-3: GPADC 입력 및 분압기 레퍼런스](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.7-3: GPADC 입력 및 분압기 레퍼런스</em></div>

<div align="center"><em>표 5.7-2: GPADC 분압기 예시</em></div>

<div align="center" markdown>

| 저항 조합 | R1 (kΩ) ±1% | R2 (kΩ) ±1% | 전압 안정화 시간 (ms) | Iq (µA) (VIN = 4.2 V) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1000 | 220 | 138 | 3.44 |
| 2 | 2000 | 430 | 250 | 1.73 |
| 3 | 3000 | 680 | 302 | 1.14 |
| 4 | 4300 | 910 | - | 0.81 |
| 5 | 5100 | 1100 | 420 | 0.68 |

</div>

심박 센서와 가속도계의 I2C/SPI, 제어, 웨이크 인터럽트 인터페이스는 LCPU를 통해 라우팅하십시오. 센서 전원을 필요에 따라 전환할 수 있도록 Iq가 낮은 DC-DC 컨버터, LDO 또는 로드 스위치를 선택하십시오.

외부 Bluetooth 오디오는 HCPU UART1을 통해 통신합니다. 전압 레벨을 맞추거나 레벨 트랜슬레이터를 추가하십시오. 모듈 전원을 차단할 때는 누설을 방지하기 위해 트랜슬레이터 전원도 동시에 차단하십시오. SF32LB55x가 Standby에 진입한 동안 오디오 모듈에 전원이 계속 공급되고 전원 인에이블이 active-low이면, 기본값이 PD인 LCPU GPIO를 사용하십시오.

<div align="center"><em>표 5.7-3: 디버그 및 플래싱 인터페이스</em></div>

<div align="center" markdown>

| UART 신호 | QFN68 | BGA145/169 | 상세 설명 |
| :--- | :--- | :--- | :--- |
| TXD1 | GPIO13 | PA19 | UART1 RXD 신호 |
| RXD1 | GPIO14 | PA17 | UART1 TXD 신호 |
| TXD2 | - | PA07 | UART2 RXD 신호 |
| RXD2 | - | PA05 | UART2 TXD 신호 |
| TXD3 | GPIO46 | PB46 | UART3 RXD 신호, 시스템 기본 로그 포트 |
| RXD3 | GPIO45 | PB45 | UART3 TXD 신호, 시스템 기본 로그 포트 |
| TXD4 | - | PB14 | UART4 RXD 신호 |
| RXD4 | - | PB12 | UART4 TXD 신호 |
| TXD5 | - | PB11 | UART5 RXD 신호 |
| RXD5 | - | PB06 | UART5 TXD 신호 |
| SWCLK | GPIO41 | PB31 | SWD 클럭 신호 |
| SWDIO | GPIO42 | PB34 | SWD 데이터 신호 |

</div>

UART RXD를 플로팅 상태로 두지 말고, 펌웨어 초기화 중에 내부 풀업을 활성화하십시오. UART3이 기본 로그 포트입니다. SiFli는 양산 플래싱과 크리스털 캘리브레이션을 위한 오프라인 프로그래머를 제공합니다. 최소한 VBAT, GND, VDDIOA, VDDIOB, RSTN, Mode, SWDIO, SWCLK, RXD1, TXD1, RXD3, TXD3 테스트 포인트를 확보해 두십시오. 양산 픽스처에 필요한 부분 집합은 VBAT, GND, boot_mode, VDDIOB, RXD3, TXD3입니다. VBAT와 boot_mode는 원본의 픽스처 레이블이므로, 배선하기 전에 실제 보드의 전원 및 Mode 연결에 대응시키십시오.

원본 도면은 VDD_1V8을 커넥터 1번 핀(VTref)에, SWDIO를 7번 핀에, SWCLK를 9번 핀에 각각 22 Ω 직렬 저항을 통해 연결합니다. 표준 [J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector)도 1번 핀을 [VTref](https://kb.segger.com/VTref), 즉 프로브 전원 출력이 아닌 타깃 전압 기준 입력으로 사용합니다. 표준 케이블을 연결하기 전에 헤더 방향과 1.8 V 호환성을 확인하십시오.

![그림 5.7-4: 원본 SWD 커넥터: 어댑터 배선 확인](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.7-4: 원본 SWD 커넥터: 어댑터 배선 확인</em></div>
