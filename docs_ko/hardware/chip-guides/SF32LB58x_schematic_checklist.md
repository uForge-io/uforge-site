---
icon: lucide/list-checks
description: "SF32LB58x MCU의 전원, 클럭, RF, 스토리지, 디스플레이, 제조 점검을 다루는 항목별 회로도 검토 체크리스트입니다."
tags:
    - 하드웨어
    - 칩
    - 체크리스트
hide:
    - navigation
---

# SF32LB58x 하드웨어 설계 가이드 — 회로도 체크리스트 { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB58x 하드웨어 설계 가이드의 일부"
    이 페이지는 항목별 회로도 체크리스트인 5.8절을 다룹니다. [회로 설계 가이드라인](SF32LB58x_schematic_design.md)으로 돌아갑니다.

## 5.8. 회로도 체크리스트 { #58-schematic-checklist }

아래 각 표는 회로도의 기능 블록 하나를 다룹니다. 각 항목에 명시된 조건으로 적용 여부를 판단합니다. 필수 항목은 명시된 조건이 충족될 때마다 검토하고, 선택 항목은 해당 기능이나 설계 선택을 사용하는 경우에 검토합니다.

### 5.8.1. 패키지 { #581-package }

<div align="center"><em>표 5.8.1-1: 패키지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 선택한 파트 넘버의 패키지가 핀 이름과 핀 번호를 포함하여 올바릅니다 | 필수 |

</div>

### 5.8.2. 전원 공급 { #582-power-supply }

<div align="center"><em>표 5.8.2-1: 전원 공급 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PVDD1 공급 전압은 1.8 V-3.3 V입니다 | 필수 |
| 2 | PVDD2 공급 전압은 1.8 V-3.3 V입니다 | 필수 |
| 3 | BUCK1_LX와 BUCK1_FB 연결이 올바릅니다 | 필수 |
| 4 | BUCK2_LX와 BUCK2_FB 연결이 올바릅니다 | 필수 |
| 5 | LDO_VOUT1 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 필수 |
| 6 | VDD_RET 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 필수 |
| 7 | VDD_RTC 출력에 테스트 포인트 또는 전압 측정에 편리한 필터 커패시터가 있습니다 | 필수 |
| 8 | VDDIOA 공급 전압은 1.8 V-3.3 V이며, 첫 보드 리비전에 0 Ω 직렬 저항을 예비로 둡니다 | 필수 |
| 9 | VDDIOA2 공급 전압은 1.8 V-3.3 V이며, 첫 보드 리비전에 0 Ω 직렬 저항을 예비로 둡니다 | 필수 |
| 10 | VDDIOB 공급 전압은 1.8 V-3.3 V이며, 첫 보드 리비전에 0 Ω 직렬 저항을 예비로 둡니다 | 필수 |
| 11 | VDDIOSA 공급 전압은 1.8 V이며, 전원을 차단할 수 있도록 로드 스위치가 있습니다 | 필수 |
| 12 | VDDIOSB 공급 전압은 1.8 V이며, 전원을 차단할 수 있도록 로드 스위치가 있습니다 | 필수 |
| 13 | VDDIOSC 공급 전압은 1.8 V이며, 항상 전원이 공급되어야 합니다 | 필수 |
| 14 | AVDD33_USB 공급 전압은 3.3 V입니다 | 필수 |
| 15 | AVDD33_ANA 공급 전압은 3.3 V입니다 | 필수 |
| 16 | AVDD_BRF 공급 전압은 1.8 V-3.3 V이며, VDD1 공급과 일치해야 합니다 | 필수 |
| 17 | AVDD33_AUD 공급 전압은 3.3 V입니다 | 필수 |
| 18 | AVDD18_DSI 공급 전압은 1.8 V입니다 | 필수 |
| 19 | SF30147C로 전원을 공급하는 경우 TWI 제어 인터페이스는 MCU의 PB 핀을 사용해야 하며, 해당 핀은 PD 핀이어야 합니다 | 필수 |
| 20 | 충전 회로에는 배터리 전압이 너무 낮을 때 충전기 5 V 입력으로 시스템에 전원을 공급할 수 있도록 경로 관리가 필요합니다 | 필수 |
| 21 | SF30147C로 전원을 공급하는 경우 칩 전용 TWI 제어 인터페이스를 사용합니다 | 필수 |
| 22 | SF30147C로 전원을 공급하는 경우, EN으로 제어하는 레일은 EN 전원 도메인으로 PVDD 또는 AVDD를 사용해야 하며, MCU GPIO로 EN을 제어하면 안 됩니다. 또는 EN을 그라운드에 연결하고 레지스터로 해당 레일 출력을 제어할 수 있습니다 | 필수 |
| 23 | SF30147C로 전원을 공급하는 경우, <span class="flag-red">BUCK과 LDO1</span>은 각각의 활성화 신호인 EN_BUCK과 EN_LDO1로만 제어할 수 있으며, 내부 레지스터 제어는 제공되지 않습니다 | 필수 |
| 24 | 58x의 PVDD와 VDDIOB 공급은 일치해야 합니다. PVDD가 VDDIOB보다 낮으면(예: VDDIOB = 3.3 V, PVDD = 1.8 V) Standby와 Hibernate에서 VDDIOB에 약 15 uA의 누설이 발생합니다 | 필수 |
| 25 | 58x에서 핀 B4는 VDD_EXT1이고 핀 B5는 VDD_EXT2이며, 설계에서 연결하지 않아도 됩니다 | 필수 |

</div>

!!! note "출처 설명"
    워크북의 전원 공급 체크리스트 19번 항목은 TWI 제어 인터페이스가 MCU의 PB 핀을 사용해야 하며 해당 핀이 "PD" 핀이어야 한다고 설명하고, 21번 항목은 별도로 칩 전용 TWI 제어 인터페이스를 요구합니다. 워크북은 "PD"를 정의하지 않으며 두 요구 사항의 관계도 설명하지 않습니다. OpenSiFli 하드웨어 애플리케이션 노트에 따르면 SF32LB58x는 SF30147C를 제어할 때 GPIO 두 개로 TWI를 에뮬레이션합니다. 회로도 승인 전에 의도된 인터페이스와 핀 선택을 SiFli에 확인하십시오.

### 5.8.3. 전원 커패시터와 인덕터 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>표 5.8.3-1: 전원 커패시터와 인덕터 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PVDD1 벌크 커패시터는 10 uF 이상입니다 | 필수 |
| 2 | PVDD2 커패시터는 10 uF 이상입니다 | 필수 |
| 3 | BUCK1_FB 커패시터 = 4.7 uF | 필수 |
| 4 | BUCK2_FB 커패시터 = 4.7 uF | 필수 |
| 5 | LDO_VOUT1 커패시터 = 4.7 uF | 필수 |
| 6 | VDD_RET 커패시터 = 0.47 uF | 필수 |
| 7 | VDD_RTC 커패시터 = 1 uF | 필수 |
| 8 | VDDIOA 커패시터 &gt;= 1 uF | 필수 |
| 9 | VDDIOA2 커패시터 &gt;= 1 uF | 필수 |
| 10 | VDDIOB 커패시터 &gt;= 1 uF | 필수 |
| 11 | VDDIOSA 커패시터 &gt;= 1 uF | 필수 |
| 12 | VDDIOSB 커패시터 &gt;= 1 uF | 필수 |
| 13 | VDDIOSC 커패시터 &gt;= 1 uF | 필수 |
| 14 | AVDD33_USB 커패시터 &gt;= 1 uF | 필수 |
| 15 | AVDD33_ANA 커패시터 &gt;= 4.7 uF | 필수 |
| 16 | AVDD_BRF 커패시터 &gt;= 4.7 uF | 필수 |
| 17 | AVDD33_AUD 커패시터 &gt;= 4.7 uF | 필수 |
| 18 | AUD_VREF 커패시터 = 1 uF | 필수 |
| 19 | AVDD18_DSI 커패시터 &gt;= 4.7 uF | 필수 |
| 20 | MIC_BIAS 커패시터 = 1 uF | 필수 |
| 21 | GPADC VREFP 커패시터 = 4.7 uF | 필수 |
| 22 | <span class="flag-red">PVDD1, PVDD2, AVDD_BRF, RSTN 풀업 전원은 동일해야 합니다</span> | 필수 |
| 23 | BUCK1과 BUCK2 인덕터는 SiFli 권장 파트 넘버입니다 | 필수 |
| 24 | BUCK 인덕터가 SiFli 권장 제품이 아닌 경우 L = 4.7 uH, DCR &lt;= 0.4 ohm, Isat &gt;= 450 mA를 만족합니다 | 필수 |
| 25 | <span class="flag-red">PVDD1과 PVDD2를 VBAT에서 1.8 V로 공급하는 경우, 1.8 V 생성에 DCDC 컨버터를 사용해야 하며 LDO를 사용하면 안 됩니다</span> | 필수 |
| 26 | <span class="flag-red">선택한 DCDC의 정지 전류(quiescent current)가 기록되어 있고 프로젝트 요구 사항을 충족합니다</span> | 필수 |
| 27 | <span class="flag-red">선택한 LDO의 정지 전류(quiescent current)가 기록되어 있고 프로젝트 요구 사항을 충족합니다</span> | 필수 |

</div>

!!! note "BUCK 인덕터 포화 전류 불일치"
    워크북의 전원 커패시터와 인덕터 체크리스트 24번 항목은 AVL에 없는 인덕터에 대해 Isat ≥ 450 mA를 지정합니다. OpenSiFli 하드웨어 애플리케이션 노트는 L = 4.7 µH, DCR ≤ 0.4 Ω인 BUCK 인덕터에 대해 Isat ≥ 500 mA를 지정합니다. 이 표는 워크북의 450 mA 값을 그대로 유지하며, [회로 설계의 BUCK 인덕터 선택 안내](SF32LB58x_schematic_design.md#5114-buck-inductor-selection)는 500 mA를 사용합니다. SiFli가 이 불일치를 명확히 하기 전까지는 Isat가 500 mA 이상인 인덕터를 사용하십시오.

### 5.8.4. 클럭 { #584-clock }

<div align="center"><em>표 5.8.4-1: 클럭 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 메인 48 MHz 크리스털은 AVL에 등재된 파트 넘버입니다 | 필수 |
| 2 | 48 MHz 크리스털이 AVL에 등재되어 있지 않은 경우 7 pF ≤ CL ≤ 12 pF(8.8 pF 권장), 주파수 허용 오차 ≤±10 ppm, ESR ≤30 Ω(22 Ω 권장)를 만족합니다 | 필수 |
| 3 | RTC 32.768 kHz 크리스털은 AVL에 등재된 파트 넘버입니다 | 필수 |
| 4 | 32.768 kHz 크리스털이 AVL에 등재되어 있지 않은 경우 CL ≤12.5 pF(7 pF 권장), 주파수 허용 오차 ≤±20 ppm, ESR ≤80 kΩ(38 kΩ 권장)를 만족합니다 | 필수 |

</div>

### 5.8.5. 리셋 { #585-reset }

<div align="center"><em>표 5.8.5-1: 리셋 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | RSTN은 PVDD1과 동일한 전원으로 풀업되어 있습니다 | 필수 |
| 2 | RSTN에 그라운드로 연결되는 0.1 uF 커패시터를 예비로 둡니다 | 필수 |
| 3 | RSTN에 ESD 보호가 있습니다 | 필수 |

</div>

### 5.8.6. 그라운드 신호 { #586-ground-signals }

<div align="center"><em>표 5.8.6-1: 그라운드 신호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 모든 AVSS_*** 신호가 GND에 연결되어 있습니다 | 필수 |
| 2 | 모든 VSS 신호가 GND에 연결되어 있습니다 | 필수 |

</div>

### 5.8.7. 부트 모드 { #587-boot-mode }

<div align="center"><em>표 5.8.7-1: 부트 모드 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | MODE에는 내부 풀다운이 있으므로 VDDIOA로의 10 kΩ 풀업을 예비로 두고, 프로그램 플래싱 중에는 MODE를 high로 구동합니다 | 필수 |
| 2 | <span class="flag-red">MODE 신호에는 테스트 포인트를 예비로 두어야 하며, 양산 프로그래밍 지그로 인출해야 합니다</span> | 필수 |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>표 5.8.8-1: RF 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | ANT 신호에 싱글 엔디드 50 Ω 특성 임피던스 요구 사항이 표기되어 있습니다 | 필수 |
| 2 | ANT 신호에 Pi형 매칭 회로를 예비로 둡니다: 병렬 NC(미실장) 커패시터와 직렬 15 pF 커패시터 | 필수 |
| 3 | 스퓨리어스 방출 필터링을 고려해야 하는 경우, 직렬 2.7 nH 인덕터와 병렬 2 pF 커패시터로 Pi형 매칭 회로를 예비로 둡니다 | 선택 |
| 4 | 외부 RF PA가 MCU의 RXEN 및 TXEN 제어를 필요로 하는 경우, PA RXEN에는 PB39만, PA TXEN에는 PB40만 사용합니다 | 선택 |
| 5 | <span class="flag-red">Wi-Fi 칩이 안테나 공존 중재를 지원하는 경우: <br> (1) 3-wire 모드를 권장합니다. Wi-Fi 칩이 Bluetooth/Wi-Fi 안테나 RF 스위치를 제어하고 중재를 수행합니다. Bluetooth의 BT_ACTIVE와 BT_PRIORITY를 사용하여 Bluetooth에 안테나 사용권을 부여할지 결정하며, WLAN_ACTIVE로 Wi-Fi 동작 중 Bluetooth 송수신을 비활성화할 수 있습니다.<br> (2)BT_ACTIVE는 PB08 또는 PB45를, WLAN_ACTIVE는 PB09 또는 PB41을 사용해야 하며, BT_PRIORITY는 임의의 PB GPIO를 사용할 수 있습니다.<br></span> | 선택 |
| 6 | Wi-Fi 칩이 안테나 공존 중재를 지원하지 않는 경우:<br>(1) 1-wire 모드를 권장합니다. Bluetooth가 Bluetooth/Wi-Fi 안테나 RF 스위치를 제어하고, BT_ACTIVE로 중재를 수행하며 Wi-Fi 칩에 알립니다.<br> (2) Wi-Fi가 동작 상태 신호를 출력할 수 있으면 이 방식을 2-wire 모드로 업그레이드할 수 있습니다. Wi-Fi 출력을 WLAN_ACTIVE에 연결하면 Wi-Fi가 활성 상태인 동안 Bluetooth가 우선순위가 낮은 Bluetooth 송수신을 마스킹할 수 있으며, Wi-Fi가 유휴 상태일 때는 Bluetooth에 영향을 주지 않습니다.<br> (3)BT_ACTIVE는 PB08 또는 PB45를, WLAN_ACTIVE는 PB09 또는 PB41을 사용해야 합니다 | 선택 |

</div>

### 5.8.9. I/O 리소스 할당 { #589-io-resource-allocation }

<div align="center"><em>표 5.8.9-1: I/O 리소스 할당 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 회로도와 일치하는 GPIO 리소스 할당 표가 제공되어 있습니다 | 필수 |
| 2 | 리소스 표의 GPIO 할당이 회로도와 일치합니다 | 필수 |
| 3 | 실제 GPIO 할당이 SiFli 권장 사항을 따릅니다. EVB I/O 설정 파일을 참조하십시오 | 필수 |

</div>

### 5.8.10. 하드웨어 웨이크업 { #5810-hardware-wake-up }

<div align="center"><em>표 5.8.10-1: 하드웨어 웨이크업 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | <span class="flag-red">HCPU 웨이크업 인터럽트 소스가 올바릅니다: PA64, PA65, PA66, PA67, PA68, PA69, 총 6개 핀</span> | 필수 |
| 2 | <span class="flag-red">LCPU 웨이크업 인터럽트 소스가 올바릅니다: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2, PBR3, 총 10개 핀. MCU가 웨이크업된 후에는 PBR0-PBR3이 인터럽트 신호를 수신할 수 없습니다</span> | 필수 |
| 3 | <span class="flag-red">G-sensor, 심박 센서 등 LCPU 측 주변 장치의 인터럽트 및 제어 신호는 PB GPIO에 연결해야 합니다</span> | 필수 |

</div>

### 5.8.11. 스토리지 { #5811-storage }

<div align="center"><em>표 5.8.11-1: 스토리지 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | MPI3이 의도한 대로 NOR 플래시 또는 SPI NAND 플래시에 연결되어 있습니다 | 필수 |
| 2 | VDDIOSC에는 항상 전원이 공급됩니다 | 필수 |
| 3 | VDDIOSA와 VDDIOSB 공급은 PBR0으로 활성화됩니다 | 필수 |
| 4 | 외부 NOR 플래시 또는 SPI NAND 플래시에는 MPI3 또는 MPI4를 사용할 수 있습니다 | 필수 |
| 5 | SPI NAND 플래시의 HOLD# 핀은 10 kΩ 저항을 통해 SPI NAND 플래시 전원으로 풀업되어 있습니다 | 필수 |
| 6 | 양산 시 MPI3 또는 MPI4의 외부 플래시를 프로그래밍해야 하는 경우, 플래싱 도구가 PA43을 high로 구동하여 MPI3 전원을 활성화합니다 | 필수 |
| 7 | 양산 시 SDIO1의 eMMC 또는 SD NAND를 프로그래밍해야 하는 경우, 플래싱 도구가 해당 전원을 활성화합니다 | 필수 |
| 8 | <span class="flag-red">PBR0/PA43이 제어하는 전압 스위치는 active-high에서 켜지고 active-low에서 꺼집니다. Hibernate에서 PBR0은 VDDIOSA/VDDIOSB 전원 스위칭을 제어하고, VDDIOSC는 항상 전원이 공급되며, PA43은 외부 플래시 전원 스위칭을 제어합니다</span> | 필수 |
| 9 | SD1 인터페이스를 eMMC 또는 SD NAND에 연결하는 경우 신호 연결이 올바릅니다 | 필수 |
| 10 | eMMC 또는 SD NAND의 I/O 인터페이스 레벨이 VDDIOA2와 일치합니다 | 필수 |
| 11 | MPI3 또는 MPI4 신호 연결이 올바릅니다 | 필수 |
| 12 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 필수 |
| 13 | <span class="flag-red">NOR 플래시가 핵심 부품 선정 가이드에서 인증되어 있습니다</span> | 필수 |
| 14 | <span class="flag-red">SPI/SD NAND 플래시가 핵심 부품 선정 가이드에서 인증되어 있습니다</span> | 필수 |
| 15 | <span class="flag-red">eMMC가 핵심 부품 선정 가이드에서 인증되어 있습니다</span> | 필수 |

</div>

<div align="center"><em>표 5.8.11-2: SiFli EVB SPI NAND MPI4 참조 연결</em></div>

<div align="center" markdown>

| SPI NAND 신호 | SF32LB58x 핀 | 참조 설명 |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | 칩 선택, active low |
| SO | PA04 (SD1_D1) | 칩으로의 데이터 입력(IO1) |
| WP# | PA01 (SD1_D2) | 쓰기 보호 신호(IO2) |
| SI | PA05 (SD1_D0) | 칩에서의 데이터 출력(IO0) |
| SCLK | PA09 (SD1_CLK) | 직렬 클럭 |
| HOLD# | PA06 (SD1_D3) | IO3. 10 kΩ 저항을 통해 VDD18_MPI4로 풀업 |

</div>

EVB 참조 회로도에서 SPI NAND 플래시의 VCC는 VDD18_MPI4에 연결되며, 이 레일에는 0.1 µF와 1 µF(6.3 V) 커패시터도 있습니다. 이 핀 할당과 부품 값은 EVB 참조용일 뿐입니다. 사용하기 전에 선택한 칩 패키지, 플래시 데이터시트, 대상 보드의 핀 먹스 설정과 대조하여 확인하십시오.

SD1의 경우 VDDIOA2 I/O 전원은 1.8 V 또는 3.3 V를 지원하며 주변 장치의 I/O 레벨과 일치해야 합니다. SiFli는 SPI NAND 플래시와 eMMC에 1.8 V 인터페이스를 권장합니다. SD NAND 디바이스는 3.3 V만 지원하므로 SD NAND를 사용할 때는 VDDIOA2를 3.3 V로 설정하십시오.

### 5.8.12. 디스플레이 { #5812-display }

<div align="center"><em>표 5.8.12-1: 디스플레이 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | SF32LB58x가 의도한 대로 DSI + LCDC2를 통해 디스플레이를 연결합니다 | 필수 |
| 2 | DSI 신호 연결이 올바릅니다 | 필수 |
| 3 | <span class="flag-red">QSPI LCD만 사용하는 경우, 프레임 레이트 및 RAM 문제를 피하기 위해 HCPU LCDC1 QSPI 인터페이스를 권장합니다</span> | 필수 |
| 4 | DSI_REXT는 10 kΩ 저항을 통해 GND에 연결되어 있습니다 | 필수 |
| 5 | LCDC RSTB 연결이 올바릅니다 | 필수 |
| 6 | LCDC TE 연결이 올바릅니다(패널의 TE 또는 Fmark 신호에 연결) | 필수 |
| 7 | TP 신호는 권장 핀 할당을 따릅니다(EVB I/O 설정 파일 참조) | 필수 |
| 8 | LCD 인터페이스는 MIPI-DSI, 3선/4선 SPI, 듀얼/쿼드 데이터 SPI, DBI 8080, DPI, 병렬/직렬 JDI 인터페이스를 지원합니다 | 필수 |
| 9 | <span class="flag-red">SPI LCD, 3선 모드: CS는 PA44 또는 PB08에, CLK는 PA46 또는 PB10에, DATA는 PA50 또는 PB09에 연결; <br>4선 모드: CS는 PA44 또는 PB08에, CLK는 PA46 또는 PB10에, DATA는 PA50 또는 PB09에, DC는 PA48 또는 PB03에 연결</span> | 필수 |
| 10 | LCD가 AOD를 지원해야 하는지 확인합니다. 지원해야 하는 경우 QSPI 패널은 HCPU에 연결해야 하며, JDI 패널은 LCPU에 연결할 수 있습니다 | 필수 |
| 11 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 필수 |
| 12 | DSI LCD의 경우 DSI 데이터 및 클럭 신호를 연결합니다. DSI 비디오 모드 패널은 RGB 패널처럼 동작하며 TE 신호가 없습니다. DSI 커맨드 모드 패널에는 TE 신호가 있으며, DSI17801에는 TE가 필요합니다. TE와 RST를 모두 사용하기를 권장하며, 최종 사용 방식은 선택한 LCD에 따라 달라집니다 | 필수 |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>표 5.8.13-1: GPADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | GPADC 입력이 해당 핀에 연결되어 있습니다 | 선택 |
| 2 | GPADC 입력 범위가 올바릅니다. 최대 입력 전압은 AVDD33_ANA를 초과하면 안 됩니다 | 선택 |
| 3 | 배터리 전압 분압기 권장 사항: 공급 측에 470 kΩ 1% 저항, 그라운드 측에 1 MΩ 1% 저항, 100 nF 필터 커패시터 | 필수 |
| 4 | <span class="flag-red">GPADC로 측정하는 모든 저항 분압 신호에는 허용 오차 1%의 분압 저항을 사용해야 하며, 각 GPADC 채널에는 칩 핀 가까이에 100 nF 필터 커패시터를 배치해야 합니다</span> | 필수 |
| 5 | <span class="flag-red">ADC로 여러 버튼을 검출하여 핀을 절약할 수 있습니다. 예를 들어 PB32를 ADC 버튼으로 사용하는 경우 배터리를 풀업 전원으로 사용하지 않습니다</span> | 필수 |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>표 5.8.14-1: SDMADC 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | SDMADC 입력이 해당 핀에 연결되어 있습니다 | 선택 |
| 2 | SDMADC 입력 범위가 올바릅니다. 최대 입력 전압은 AVDD33_ANA를 초과하지 않는 것이 좋습니다 | 선택 |
| 3 | SDMADC_VREF와 SDMADC_VSS_VREF 연결이 올바릅니다 | 필수 |

</div>

### 5.8.15. 버튼 { #5815-buttons }

<div align="center"><em>표 5.8.15-1: 버튼 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 버튼에 웨이크업 기능이 필요한지 고객에게 확인합니다 | 필수 |
| 2 | 일반 버튼 연결이 올바릅니다(풀업 존재, 올바른 저항 값, 올바른 풀업 전압 도메인) | 필수 |
| 3 | <span class="flag-red">전원 버튼은 PB54를 사용해야 하며, active-high, 10초 길게 누르면 리셋, 10 kΩ 풀다운 저항이 메인 보드에 있어야 합니다</span> | 필수 |
| 4 | 모든 버튼 신호에 ESD 보호가 있습니다 | 필수 |

</div>

### 5.8.16. EOS 및 ESD 보호 { #5816-eos-and-esd-protection }

<div align="center"><em>표 5.8.16-1: EOS 및 ESD 보호 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 충전 인터페이스에 EOS, ESD, OVP 설계가 있습니다 | 필수 |
| 2 | 충전기 삽입 검출 신호에 ESD 소자가 있습니다 | 필수 |
| 3 | 배터리 인터페이스에 ESD 소자가 있습니다 | 필수 |
| 4 | 안테나 인터페이스에 ESD 소자가 있습니다 | 필수 |
| 5 | LCD 및 TP 전원 인터페이스에 ESD 소자가 있습니다 | 필수 |
| 6 | TP I2C, RST, INT 라인에 ESD 소자가 있습니다 | 필수 |
| 7 | 심박 센서 전원 인터페이스와 신호 라인에 ESD 소자가 있습니다 | 필수 |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>표 5.8.17-1: I2C 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | I2C 할당은 HCPU/LCPU 분할과 디바이스를 저전력 모드에서 동작시켜야 하는지 여부를 고려합니다 | 필수 |
| 2 | I2C에 올바른 저항 값의 풀업이 있습니다. 400 kHz 동작이 필요한 경우 2.2 kΩ 풀업을 권장합니다. 주변 장치 측 전압 도메인을 사용하고, 전원을 끌 때 주변 장치와 함께 풀업 전원도 차단합니다 | 필수 |
| 3 | I2C 인터럽트 신호는 필요한 경우 하드웨어 웨이크업을 지원합니다 | 필수 |
| 4 | 여러 디바이스가 하나의 I2C 버스를 공유하는 경우 주소가 서로 구분됩니다 | 필수 |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>표 5.8.18-1: I2S 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1은 입력 전용이며 마스터 모드로만 동작합니다. 마이크는 의도한 대로 I2S1에 연결되어 있습니다</span> | 선택 |
| 2 | <span class="flag-red">I2S2는 마스터 모드에서만 입력과 출력을 지원하며, 외부 코덱 DAC/ADC 디바이스에 연결할 수 있습니다</span> | 선택 |
| 3 | <span class="flag-red">I2S3은 마스터 모드에서만 입력과 출력을 지원합니다. HCPU가 슬립 상태일 때 LCPU가 I2S3을 통해 오디오를 수신하고 처리하는 저전력 사용 사례에 적합합니다</span> | 선택 |
| 4 | I2S 신호 연결이 올바릅니다 | 선택 |
| 5 | <span class="flag-red">I2S1 인터페이스의 디지털 MIC 연결이 올바릅니다</span> | 선택 |
| 6 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 선택 |

</div>

### 5.8.19. PDM 및 아날로그 오디오 { #5819-pdm-and-analog-audio }

<div align="center"><em>표 5.8.19-1: PDM 및 아날로그 오디오 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PDM 듀얼 마이크 연결이 올바릅니다 | 선택 |
| 2 | PDM MIC는 디지털 전원으로 구동됩니다 | 선택 |
| 3 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 선택 |
| 4 | 아날로그 듀얼 마이크 연결이 올바릅니다 | 선택 |
| 5 | 아날로그 MIC는 MIC_BIAS 출력으로 구동됩니다 | 선택 |
| 6 | 두 오디오 ADC 입력에는 각각 2.2 uF 이상의 DC 차단 커패시터가 있어야 합니다 | 선택 |
| 7 | DAC 출력 경로 P와 N에는 각각 1 kΩ 직렬 저항이 있으며, 둘 사이에 1.5 nF 커패시터가 있습니다 | 선택 |
| 8 | 오디오 앰프로는 AW8155를 권장하며, 권장 부품을 사용할 때는 소프트웨어에서 Mode 4 / Class AB 모드로 설정합니다 | 선택 |
| 9 | <span class="flag-red">오디오 PA 출력을 MCU ADC로 피드백하는 경우 분압기와 RC 필터 또는 추가 디지털 필터링을 사용합니다. 분압된 전압은 ADC 입력 범위 안에 있어야 하며, RC 필터 차단 주파수는 20 kHz로 해야 합니다</span> | 선택 |
| 10 | <span class="flag-red">칩에 내장된 아날로그 오디오 ADC 경로를 사용하지 않는 경우, ADC1P/ADC1N과 ADC2P/ADC2N에 각각 그라운드로 연결되는 0 Ω 직렬 저항을 두기를 권장합니다</span> | 선택 |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>표 5.8.20-1: SPI 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | SPI 연결이 올바릅니다. MCU와 주변 장치 사이에서 SDO와 SDI가 올바르게 교차되어 있습니다 | 선택 |
| 2 | SPI 주변 장치의 타이밍 요구 사항이 확인되었고 지원됩니다 | 선택 |
| 3 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 선택 |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>표 5.8.21-1: USART 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | USART4는 플래싱 및 로그 인터페이스로 설계되어 있습니다 | 필수 |
| 2 | <span class="flag-red">USART4에는 테스트 포인트가 있으며, TXD와 RXD에는 직렬 100 Ω 저항을 두기를 권장합니다</span> | 필수 |
| 3 | <span class="flag-red">USART1에는 테스트 포인트가 있습니다</span> | 필수 |
| 4 | HCPU에서 동작해야 하는 디바이스는 USART2 또는 USART3에 연결합니다 | 선택 |
| 5 | LCPU에서 동작해야 하는 디바이스는 USART5 또는 USART6에 연결합니다 | 선택 |
| 6 | 주변 장치에 연결할 때 RXD와 TXD가 올바르게 교차되어 있습니다 | 필수 |
| 7 | 주변 장치의 I/O 로직 레벨이 메인 칩과 일치합니다 | 필수 |
| 8 | 사용하지 않는 USART 테스트 포인트는 예비용으로 남겨 둡니다 | 선택 |
| 9 | <span class="flag-red">주변 장치에 연결하는 UART는 HCPU 소프트웨어가 LCPU UART 인터페이스를 사용하는 일을 피하기 위해 HCPU 인터페이스를 사용하기를 권장합니다</span> | 필수 |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>표 5.8.22-1: PWM 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 백라이트 PWM 핀 할당이 올바릅니다. HCPU 주파수 저하가 백라이트에 영향을 주지 않도록 모터 PWM과 다른 GPTIMx를 사용하고, 가능하면 PB 인터페이스에 둡니다 | 필수 |
| 2 | 모터 PWM 핀 할당이 올바릅니다. HCPU 주파수 저하가 진동에 영향을 주지 않도록 백라이트 PWM과 다른 GPTIMx를 사용하고, 가능하면 PB 인터페이스에 둡니다 | 필수 |
| 3 | 모터 PWM 제어에는 기본적으로 비활성화된 GPIO를 선택하여, SMT 모터를 사용할 때 펌웨어 프로그래밍 중에 발생하는 비정상 동작을 피합니다 | 필수 |
| 4 | PWM 출력이 필요한 신호는 PB 인터페이스를 사용해야 하며, 콜드 부트 시 비정상 동작도 확인합니다 | 필수 |

</div>

### 5.8.23. 디버그 { #5823-debug }

<div align="center"><em>표 5.8.23-1: 디버그 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | SWD 신호 연결이 올바릅니다 | 필수 |
| 2 | J-Link 커넥터 또는 테스트 포인트에 I/O 전원 기준이 올바르게 예비로 확보되어 있습니다 | 필수 |
| 3 | <span class="flag-yellow">프로그램 플래싱 중에는 PVDD, VDDIO, VDDSC 등의 레일에 전원이 공급되어야 하며, AVDD18_DSI(CAU2 전원)에도 전원이 공급되어야 합니다</span> | 필수 |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>표 5.8.24-1: USB 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | USB 인터페이스 연결이 올바릅니다 | 선택 |
| 2 | USB 인터페이스에 ESD 보호가 있습니다 | 선택 |
| 3 | 슬립이 아닌 정상 동작 중에는 USB가 활성화되어 있는 한 PC/디바이스 측에서 삽입과 제거를 감지할 수 있습니다. <br>MCU가 슬립 상태에서 삽입과 제거를 감지해야 하는 경우 VBUS 저항 분압 회로를 추가하고, 분압기가 IO 전압에 맞는 high 레벨을 출력하게 하여 MCU 웨이크업 핀에 입력합니다. 충전기 삽입 검출 웨이크업 핀을 공유하기를 권장합니다 | 선택 |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>표 5.8.25-1: PBR 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | PBR0은 전원을 켜는 동안 0에서 1로 바뀌며 일부 외부 로드 스위치 제어에 사용할 수 있습니다. PBR1-PBR5는 기본적으로 low를 출력합니다 | 필수 |
| 2 | PBR0-PBR5는 Standby와 Hibernate 모두에서 출력으로 사용할 수 있습니다 | 선택 |
| 3 | PBR0-PBR5는 LPTIM 신호를 출력할 수 있습니다 | 선택 |
| 4 | <span class="flag-red">SF32LB567에서는 LPTIM3을 권장합니다. LPTIM3_OUT과 LPTIM3_OUT_BAR는 PBR 핀에서 듀티비가 서로 다르고 극성이 반대인 21-25 kHz 신호를 출력합니다</span> | 선택 |
| 5 | <span class="flag-red">듀티비가 서로 다르고 극성이 반대인 21-25 kHz 신호는 HCPU ATIM에서도 출력할 수 있습니다. 적합한 ATIMx_CHx 및 ATIMx_CHxN 신호를 Pin_Config와 함께 선택하고 HCPU 주파수 저하의 영향을 고려하십시오</span> | 선택 |
| 6 | PBR0-PBR5는 32 kHz 클럭 신호를 출력할 수 있습니다 | 선택 |
| 7 | <span class="flag-red">PBR0-PBR3은 웨이크업 입력으로 설정할 수 있지만, MCU 웨이크업 후에는 PBR0-PBRx가 인터럽트 신호를 수신할 수 없고 0/1 레벨만 검출할 수 있으므로 주의해서 사용하십시오</span> | 선택 |

</div>

!!! note "출처 적용 범위 및 검증"
    [출처 체크리스트 워크북](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)의 PBR 체크리스트 4번 항목은 SF32LB567을 지정합니다. 워크북은 PBR 체크리스트 4번과 5번 항목을 SF32LB58x에 대한 권장 사항으로 규정하지 않습니다. 채택하기 전에 적용 가능 여부를 SiFli에 확인하십시오.

    워크북의 스토리지 체크리스트 6번 항목은 "MPI3 전원"을 활성화하기 위해 PA43을 high로 구동한다고 설명합니다. 그러나 [공식 SF32LB58x 하드웨어 애플리케이션 노트](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md)는 PA43을 외부 플래시 전원 제어 핀으로 설명하며, 외부 플래시에 전원을 공급하려면 high로 구동하라고 안내합니다. 체크리스트 행은 워크북의 표현을 그대로 유지합니다. 양산 프로그래밍을 확정하기 전에 의도된 전원 레일과 인터페이스 범위를 SiFli에 확인하십시오.

### 5.8.26. 소비 전력 { #5826-power-consumption }

<div align="center"><em>표 5.8.26-1: 소비 전력 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | 전원 스위칭에 사용하는 모든 MOSFET, LDO, DCDC 활성화 핀에는, 활성화 핀이 active-high인 경우 그라운드로 연결되는 1 MΩ 풀다운을 예비로 둡니다 | 필수 |
| 2 | Hibernate 모드의 기본 전류 요구 사항이 기록되어 있습니다 | 필수 |
| 3 | <span class="flag-red">Hibernate 모드에서 선택한 주변 장치 기본 전류의 합이 기록되어 있고 프로젝트 요구 사항을 충족합니다</span> | 필수 |
| 4 | Standby 모드의 기본 전류 요구 사항이 기록되어 있습니다 | 필수 |
| 5 | <span class="flag-red">Standby 모드에서 선택한 주변 장치 기본 전류의 합이 기록되어 있고 프로젝트 요구 사항을 충족합니다</span> | 필수 |

</div>

### 5.8.27. 플래싱 및 크리스털 캘리브레이션 { #5827-download-and-crystal-calibration }

<div align="center"><em>표 5.8.27-1: 플래싱 및 크리스털 캘리브레이션 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 | 구분 |
|:---|:---|:---|
| 1 | SWD 플래싱 테스트 포인트로 VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA, VDDIOB 테스트 포인트를 예비로 둡니다 | 필수 |
| 2 | 펌웨어 프로그래밍에 오프라인 플래싱 보드가 필요한 경우 VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN, VDDIOA 테스트 포인트를 예비로 둡니다 | 선택 |
| 3 | 크리스털 캘리브레이션이 필요한 경우 크리스털 캘리브레이션 테스트 포인트를 예비로 둡니다. PB45를 권장합니다 | 선택 |

</div>
