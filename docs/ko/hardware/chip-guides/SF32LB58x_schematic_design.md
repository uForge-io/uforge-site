---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB58x MCU 회로 설계 가이드라인: 전원 시스템, 클럭 생성, RF, 사용자 인터페이스, 스토리지와 연결, 양산."
tags:
    - 하드웨어
    - 칩
---

# SF32LB58x 하드웨어 설계 가이드 — 회로 설계 가이드라인 { #sf32lb58x-hardware-design-guide-schematic-design-guidelines }

!!! note "SF32LB58x 하드웨어 설계 가이드의 일부"
    이 페이지는 5절 회로 설계 가이드라인을 다룹니다. 디바이스 선택과 전체 설계 흐름은 [SF32LB58x 하드웨어 설계 가이드 개요](SF32LB58x_hardware_design_guide.md)에서 시작하고, [회로도 체크리스트](SF32LB58x_schematic_checklist.md)로 이어가거나 [PCB 레이아웃 가이드라인](SF32LB58x_pcb_layout.md)으로 바로 이동하십시오.

## 5. 회로 설계 가이드라인 { #5-schematic-design-guidelines }

이 장은 최소 시스템부터 전원, 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결, 양산까지 이어지는 회로 설계 흐름을 따릅니다. 각 절에서 설계 의도를 설명한 뒤 SF32LB58x 플랫폼의 회로 요구 사항, 주요 위험 요소, 릴리스 점검 항목을 정리합니다.

<div align="center"><em>표 5-1: 회로 설계 절 구성</em></div>

<div align="center" markdown>

| 그룹 | 주요 결정 사항 | 릴리스 근거 |
|:---|:---|:---|
| 최소 시스템 설계 | 정확한 변형(variant)과 패키지, 전원/리셋, 클럭, 부트/스토리지, 디버그/복구 접근 | 첫 브링업(초기 구동 및 검증) 검토와 부트/복구 계획 |
| 전원 시스템 | 시스템 PMIC, 칩 PMU 레일, BUCK 인덕터, LDO 커패시터, 리셋, 저전력 웨이크업 소스 | 전원 트리, PMIC 설정, 레일 측정, POR/BOR/리셋 검토 |
| 클럭 생성 | 48 MHz 및 32.768 kHz 크리스털 | 크리스털 사양 점검, 매칭 커패시터 계획, 크리스털 레이아웃 스크린샷 |
| RF | RF 매칭과 안테나 경로 | 임피던스 계획, RF 매칭 회로, 안테나 금지 구역, 레이아웃 스크린샷 |
| 사용자 인터페이스 | 디스플레이, 터치/백라이트, 오디오, 버튼, 모터, PBR 제어 | 인터페이스 회로도, 핀 할당, 전원 시퀀싱, 아날로그/오디오 검토 |
| 스토리지와 연결 | 부트 모드, MPI4, SD1/SD2, eMMC/SD NAND/SD 카드, USB2.0 HS | 부트 설정, 스토리지 전원 계획, 차동/고속 라우팅 근거 |
| 양산 | SWD, UART 디버그 출력, 양산 테스트 접근, 회로도/PCB 체크리스트 | 테스트 포인트 도면, 복구 경로, 양산 플래싱/캘리브레이션 계획 |

</div>

### 5.1. 최소 시스템 설계 { #51-minimum-system-design }

최소 시스템을 첫 회로도 검토 게이트로 삼으십시오. 제품별 주변 장치를 추가하기 전에 정확한 디바이스와 패키지, 필요한 전원 레일과 클럭, 리셋 동작, 부트 설정과 스토리지, 실용적인 디버그 및 복구 경로를 확인하십시오. 이러한 결정에 따라 보드의 전원 인가와 부팅, 안정적인 브링업 가능 여부가 달라집니다.

<div align="center"><em>표 5.1-1: 최소 시스템 설계 점검</em></div>

<div align="center" markdown>

| 블록 | SF32LB58x 설계 점검 | 상세 지침 |
|:---|:---|:---|
| 디바이스와 패키지 | 정확한 부품과 패키지를 확인하고, 핀 배치와 내장 메모리 구성이 계획한 인터페이스를 지원하는지 점검하십시오. | [디바이스 변형과 패키지](SF32LB58x_hardware_design_guide.md#32-variants) |
| 전원 | 필요한 PMU 및 외부 레일, BUCK 부품, 로컬 디커플링을 제공하십시오. | [전원 시스템](#51-power-system) |
| 클럭 | 지정된 부하와 배치 가정을 반영하여 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털을 포함하십시오. | [클럭 생성](#52-clock-generation) |
| 리셋 | `PVDD1` 도메인을 기준으로 하는 외부 `RSTN` RC 리셋을 구현하십시오. | [전원 인가 시퀀싱과 리셋](#5115-power-up-sequencing-and-reset) |
| 부트 모드 | `Mode` 핀을 10 kΩ 저항으로 안정적인 레벨에 스트랩하고, 양산 테스트 접근과 테스트 보드의 복구 점퍼를 확보하십시오. | [부트 설정](#551-boot-configuration) |
| 부트 스토리지 | 지원되는 스토리지 인터페이스를 선택하고, 선택한 디바이스에 대해 핀 할당, I/O 전압, 전원 구성을 확인하십시오. | [스토리지](#552-storage) |
| 브링업 접근 | SWD와 필요한 UART 디버그 신호, 그리고 프로브에 필요한 전원 및 그라운드 레퍼런스용 보드 접근을 확보하십시오. | [디버그 및 플래싱 인터페이스](#561-debug-and-download-interface) |
| 저전력 동작 | 대상 슬립 모드에 필요한 웨이크업 소스와 외부 전원 제어 동작을 확인하십시오. | [동작 모드와 웨이크업 소스](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. 전원 시스템 { #51-power-system }

#### 5.2.1. 전원 공급 { #511-power-supply }

SF32LB58x 시리즈에는 BUCK 출력 2개를 지원하는 PMU가 내장되어 있습니다. 각 BUCK에는 외부 인덕터와 커패시터가 필요하며, 인덕터는 내부 전원 입력으로 연결됩니다. 내부 LDO 출력은 3개이며 외부 커패시터가 필요합니다. 워치급 설계에서는 SF32LB58x를 SiFli의 PMIC인 SF30147C와 함께 사용할 수 있습니다. 이 PMIC는 SF32LB58x와 관련 주변 장치에 전원을 공급합니다.

##### 5.2.1.1. SiFli PMIC 전원 분배 { #5111-sifli-pmic-power-distribution }

SF30147C는 초저전력 웨어러블 제품용 고집적·고효율 전원 관리 칩입니다. LDO 4개를 내장하며, 각 LDO는 넓은 입출력 전압 범위와 최대 100 mA의 부하 전류를 지원합니다. 또한 다양한 주변 장치에 전원을 공급하기 위해 누설 전류와 Ron이 낮은 로드 스위치 7개를 내장합니다. 이 중 2개는 배터리 전압으로 직접 구동되는 주변 장치(예: 오디오 PA)용 고전압 스위치이고, 나머지 5개는 1.8 V 전원 주변 장치용 저전압 스위치입니다. SF32LB58x는 GPIO 2개로 TWI 신호를 소프트웨어로 구현해 SF30147C를 제어합니다.

<div align="center"><em>표 5.2-1: SF30147C 전원 분배</em></div>

<div align="center" markdown>

| SF30147C 전원 핀 | 최소 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
|:---|:---|:---|:---|:---|
| VBUCK | 1.8 | 1.8 | 500 | SF32LB58x의 PVDD1, PVDD2, VDDIOA, VDDIOA2, VDDIOB, AVDD_BRF, AVDD18_DSI 등 1.8 V 레일에 전원 공급 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PA 로직 전원 |
| LVSW2 | 1.8 | 1.8 | 100 | G-sensor 1.8 V 전원 |
| LVSW3 | 1.8 | 1.8 | 150 | 심박 센서 1.8 V 전원 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8 V 전원 |
| LVSW5 | 1.8 | 1.8 | 150 | eMMC 코어 전원 |
| LDO1 | 2.8 | 3.3 | 100 | SF32LB58x의 AVDD33_USB, AVDD33_ANA, AVDD33_AUD, AVDDIOA2 등 3.3 V 레일에 전원 공급 |
| LDO2 | 2.8 | 3.3 | 100 | eMMC 또는 SD NAND 전원 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3 V 전원 |
| LDO4 | 2.8 | 3.3 | 100 | 심박 센서 3.3 V 전원 |
| HVSW1 | 2.8 | 5 | 150 | 아날로그 Class-K PA 전원 |
| HVSW2 | 2.8 | 5 | 150 | GPS 전원 |

</div>

자세한 내용은 SF30147C 칩 데이터시트를 참조하십시오.

##### 5.2.1.2. SF32LB58x 전원 요구 사항 { #5112-sf32lb58x-power-requirements }

다음은 SF32LB58x 시리즈의 PMU 전원 사양입니다.

<div align="center"><em>표 5.2-2: PMU 전원 사양</em></div>

<div align="center" markdown>

| PMU 전원 핀 | 최소 전압(V) | 전형 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1.71 | 1.8 | 3.6 | 100 | PVDD1 전원 입력 |
| PVDD2 | 1.71 | 1.8 | 3.6 | 50 | PVDD2 전원 입력 |
| BUCK1_LX / BUCK1_FB | - | 1.25 | - | 100 | BUCK1_LX 출력은 인덕터와 내부 전원 입력 1에 연결되며, 인덕터의 다른 쪽 끝은 외부 커패시터에 연결됩니다 |
| BUCK2_LX / BUCK2_FB | - | 0.9 | - | 50 | BUCK2_LX 출력은 인덕터와 내부 전원 입력 2에 연결되며, 인덕터의 다른 쪽 끝은 외부 커패시터에 연결됩니다 |
| LDO_VOUT1 | - | 1.1 | - | 100 | LDO 출력, 외부 커패시터 필요 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 출력, 외부 커패시터 필요 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 출력, 외부 커패시터 필요 |
| MIC_BIAS | 1.4 | - | 2.8 | - | 마이크 전원 출력 |

</div>

외부 전원이 필요한 나머지 전원 핀의 사양은 다음과 같습니다.

<div align="center"><em>표 5.2-3: 기타 전원 사양</em></div>

<div align="center" markdown>

| 기타 전원 핀 | 최소 전압(V) | 전형 전압(V) | 최대 전압(V) | 최대 전류(mA) | 상세 설명 |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | RF 전원 입력 |
| AVDD18_DSI | 1.71 | 1.8 | 2.5 | 20 | MIPI DSI 전원 입력. 사용하지 않으면 연결하지 않음 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 아날로그 전원 + RF PA 전원 입력 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 아날로그 오디오 전원 입력 |
| AVDD33_USB | 3.15 | 3.3 | 3.45 | 50 | USB 전원 입력 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA93 I/O 전원 입력 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11 I/O 전원 입력 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PB I/O 전원 입력 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA 전원 입력 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB 전원 입력 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC 전원 입력 |
| GPADC_VREFP | - | - | - | - | GPADC 레퍼런스 전압 입력. 커패시터만 연결하며 외부 전원은 없음 |
| AUD_VREF | - | - | - | - | 오디오 레퍼런스 전압 입력. 커패시터만 연결하며 외부 전원은 없음 |

</div>

##### 5.2.1.3. 권장 커패시터 값 { #5113-recommended-capacitor-values }

<div align="center"><em>표 5.2-4: 권장 디커플링 커패시터</em></div>

<div align="center" markdown>

| 전원 핀 | 커패시터 | 상세 설명 |
|:---|:---|:---|
| PVDD1 | 0.1 uF + 10 uF | 핀 가까이에 10 uF와 0.1 uF를 최소 하나씩(총 2개) 배치하십시오 |
| PVDD2 | 0.1 uF + 10 uF | 핀 가까이에 10 uF와 0.1 uF를 최소 하나씩(총 2개) 배치하십시오 |
| BUCK1_LX / BUCK1_FB | 0.1 uF + 4.7 uF | 핀 가까이에 4.7 uF와 0.1 uF를 최소 하나씩(총 2개) 배치하십시오 |
| BUCK2_LX / BUCK2_FB | 0.1 uF + 4.7 uF | 핀 가까이에 4.7 uF와 0.1 uF를 최소 하나씩(총 2개) 배치하십시오 |
| LDO_VOUT1 | 4.7 uF | 핀 가까이에 4.7 uF 커패시터를 최소 하나 배치하십시오 |
| VDD_RET | 0.47 uF | 핀 가까이에 0.47 uF 커패시터를 최소 하나 배치하십시오 |
| VDD_RTC | 0.1 uF | 핀 가까이에 0.1 uF 커패시터를 최소 하나 배치하십시오 |
| AVDD_BRF | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |
| AVDD18_DSI | 4.7 uF | 핀 가까이에 4.7 uF 커패시터를 최소 하나 배치하십시오 |
| AVDD33_ANA | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |
| AVDD33_AUD | 4.7 uF | 핀 가까이에 4.7 uF 커패시터를 최소 하나 배치하십시오 |
| AVDD33_USB | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |
| MIC_BIAS | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |
| VDDIOA / VDDIOA2 / VDDIOB | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 uF | 핀 가까이에 1 uF 커패시터를 최소 하나 배치하십시오 |

</div>

##### 5.2.1.4. BUCK 인덕터 선택 { #5114-buck-inductor-selection }

!!! important "전원 인덕터 핵심 파라미터"
    L(인덕턴스) = 4.7 uH, DCR(DC 저항) ≤ 0.4 Ω, Isat(포화 전류) ≥ 500 mA

##### 5.2.1.5. 전원 인가 시퀀싱과 리셋 { #5115-power-up-sequencing-and-reset }

SF32LB58x 시리즈에는 POR(Power-On Reset)과 BOR(Brownout Reset)이 내장되어 있으며, 외부 하드웨어 리셋 신호 RSTN도 지원합니다.

RSTN 리셋 신호는 PVDD1 입력 전압 도메인으로 풀업하고, 그라운드로 0.1 uF 커패시터를 연결하여 RC 지연 리셋을 구성하는 것이 좋습니다.

![그림 5.2-1: 전원 켜기/끄기 시퀀스](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.2-1: 전원 인가/차단 시퀀스</em></div>

![그림 5.2-2: 리셋 회로](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.2-2: 리셋 회로</em></div>

##### 5.2.1.6. 일반적인 전원 회로 { #5116-typical-power-circuit }

SF32LB58x 시리즈는 SiFli의 PMIC SF30147C로 전원 레일에 전원을 공급할 수 있습니다. 할당은 표 5.2-1을 참조하십시오. 칩 패키지에도 BUCK 출력 2개와 LDO 출력 3개가 내장되어 있습니다.

![그림 5.2-3: SF30147C 전원 공급 구성도](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.2-3: SF30147C 전원 공급 다이어그램</em></div>

![그림 5.2-4: 내장 DC-DC(BUCK) 회로](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.2-4: 내장 DC-DC(BUCK) 회로</em></div>

![그림 5.2-5: 내장 LDO 회로](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.2-5: 내장 LDO 회로</em></div>

##### 5.2.1.7. 전원 설계 체크리스트 { #5117-power-design-checklist }

- [ ] 선택한 모델의 PVDD1/PVDD2 전원 범위(1.71 V–3.6 V)가 실제 전원 구성과 일치하는지 확인
- [ ] BUCK 인덕터가 4.7 uH, DCR ≤ 0.4 Ω, Isat ≥ 500 mA를 충족
- [ ] PVDD1/PVDD2, BUCK1/2_LX/FB, LDO_VOUT1, VDD_RET, VDD_RTC의 디커플링 커패시터가 이 절에 나열된 권장 값을 사용
- [ ] SF30147C를 사용하는 경우, 로드 스위치 7개의 전압/전류 할당이 주변 장치 요구 사항과 일치
- [ ] RSTN 리셋 회로의 RC 지연이 디바이스의 리셋 타이밍 요구 사항을 충족

#### 5.2.2. 동작 모드와 웨이크업 소스 { #512-operating-modes-and-wake-sources }

저전력 전략은 PBR 기능, 웨이크업 가능한 인터럽트, 스토리지 전원 스위치, 센서 전원, 외부 PMIC 로드 스위치와 함께 검토하는 것이 좋습니다.

SF32LB58x 시리즈는 PBR 인터페이스 6개를 제공하며, 주요 특성은 다음과 같습니다.

1. PBR0은 전원을 켜는 동안 0에서 1로 전환되므로 일부 외부 LSW를 구동하는 데 유용합니다. PBR1-PBR5는 기본적으로 0을 출력합니다.
2. PBR0-PBR5는 모두 Standby와 Hibernate 모드에서 출력으로 동작할 수 있습니다.
3. PBR0-PBR5는 LPTIM 신호를 출력할 수 있습니다.
4. PBR0-PBR5는 32 kHz 클럭 신호를 출력할 수 있습니다.
5. PBR0-PBR3은 웨이크업 신호 입력용 입력으로 구성할 수 있으며, MCU가 깨어 있는 동안에는 MCU가 인터럽트를 받지 않습니다.

SF32LB58x 시리즈의 모든 GPIO는 Light Sleep/Deep Sleep 모드에서 웨이크업을 지원합니다. Standby와 Hibernate 모드에서는 웨이크업 가능한 인터럽트 소스 16개를 지원하며, PA에 6개, PB에 10개가 있습니다.

<div align="center"><em>표 5.2-5: 인터럽트 소스 연결</em></div>

<div align="center" markdown>

| 인터럽트 소스 | I/O | 상세 설명 |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | 인터럽트 신호 0 |
| WKUP_PIN1 | PB55 | 인터럽트 신호 1 |
| WKUP_PIN2 | PB56 | 인터럽트 신호 2 |
| WKUP_PIN3 | PB57 | 인터럽트 신호 3 |
| WKUP_PIN4 | PB58 | 인터럽트 신호 4 |
| WKUP_PIN5 | PB59 | 인터럽트 신호 5 |
| WKUP_PIN6 | PA64 | 인터럽트 신호 6 |
| WKUP_PIN7 | PA65 | 인터럽트 신호 7 |
| WKUP_PIN8 | PA66 | 인터럽트 신호 8 |
| WKUP_PIN9 | PA67 | 인터럽트 신호 9 |
| WKUP_PIN10 | PA68 | 인터럽트 신호 10 |
| WKUP_PIN11 | PA69 | 인터럽트 신호 11 |
| WKUP_PIN12 | PBR0 | 인터럽트 신호 12 |
| WKUP_PIN13 | PBR1 | 인터럽트 신호 13 |
| WKUP_PIN14 | PBR2 | 인터럽트 신호 14 |
| WKUP_PIN15 | PBR3 | 인터럽트 신호 15 |

</div>

!!! note "원문의 웨이크업 소스 개수 확인 필요"
    원문은 웨이크업 가능한 인터럽트 소스가 16개이며 PA에 6개, PB에 10개라고 설명합니다. 그러나 원문의 표에는 PB 핀 6개, PA 핀 6개, PBR 핀 4개가 나열되어 있습니다. PBR이 PB 개수에 포함되는지는 원문에 설명되어 있지 않습니다. PA/PB 합계에 의존하기 전에 의도한 그룹 구분을 SiFli에 확인하십시오.

### 5.3. 클럭 생성 { #52-clock-generation }

SF32LB58x 시리즈에는 외부 클럭 소스 2개가 필요합니다. 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털입니다.

<div align="center"><em>표 5.3-1: 크리스털 사양 요구 사항</em></div>

<div align="center" markdown>

| 크리스털 | 사양 | 상세 설명 |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (권장 8.8 pF), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (권장 22 Ω) | 크리스털 소비 전력은 CL 및 ESR과 상관이 있으며, 값이 작을수록 전력이 낮습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 두십시오. CL < 12 pF이면 필요하지 않습니다 |
| 32.768 kHz | CL ≤ 12.5 pF (권장 7 pF), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (권장 38 kΩ) | 크리스털 소비 전력은 CL 및 ESR과 상관이 있으며, 값이 작을수록 전력이 낮습니다. 크리스털 옆에 병렬 매칭 커패시터를 확보해 두십시오. CL < 12.5 pF이면 필요하지 않습니다 |

</div>

<div align="center"><em>표 5.3-2: SiFli AVL에 등재된 크리스털 모델</em></div>

<div align="center" markdown>

| 모델 | 벤더 | 파라미터 |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz, ΔF/F0 = -6~8 ppm, CL = 8.8 pF, ESR ≤ 22 Ω Max, TOPR = -30~85 °C, Package 2016 (metric) |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz, ΔF/F0 = -20~20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40~85 °C, Package 3215 (metric) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz, ΔF/F0 = -10~10 ppm, CL = 8.8 pF, ESR ≤ 40 Ω Max, TOPR = -20~75 °C, Package 2016 (metric) |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz, ΔF/F0 = -20~20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40~85 °C, Package 3215 (metric) |

</div>

!!! note
    48 MHz 크리스털의 일반 권장 사항은 ESR ≤ 30 Ω(권장 22 Ω)이지만, 나열된 SX20Y048000B31T-8.8은 ESR ≤ 40 Ω으로 규정되어 있습니다. 원문에는 두 값이 모두 나열되어 있으나 차이에 대한 설명은 없습니다. 이 모델을 사용하기 전에 적합 여부를 SiFli에 확인하십시오. ESR이 높으면 정적 소비 전력도 증가할 수 있습니다. PCB를 라우팅할 때는 클럭 신호의 기생 부하 커패시턴스를 줄이기 위해 크리스털 바로 아래의 2층 그라운드 동박을 제거하십시오.

나열된 부품에 대한 자세한 내용은 [SF32 승인 업체 목록]을 참조하십시오.

### 5.4. RF { #53-rf }

SF32LB58x의 RF 프런트엔드는 온칩으로 통합된 광대역 매칭 필터 기술을 사용하므로, 50 Ω 임피던스 제어 RF PCB 트레이스만 있으면 됩니다. 스퓨리어스 필터링과 안테나 매칭을 위한 π 매칭 회로를 설계에 확보해 두는 것이 좋습니다.

![그림 5.4-1: RF 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.4-1: RF 회로 다이어그램</em></div>

!!! note "참고"
    매칭 회로의 부품 값은 실제 안테나와 PCB 레이아웃에 대한 테스트로 결정해야 합니다.

### 5.5. 사용자 인터페이스 { #54-user-interfaces }

#### 5.5.1. 디스플레이 { #541-display }

##### 5.5.1.1. MIPI DSI 디스플레이 인터페이스 { #5411-mipi-dsi-display-interface }

SF32LB58x 시리즈는 2레인 MIPI DSI 디스플레이 인터페이스를 지원합니다.

<div align="center"><em>표 5.5-1: MIPI-DSI 신호 연결</em></div>

<div align="center" markdown>

| MIPI DSI 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| CLKP | DSI_CLKP | MIPI 클럭 신호 + |
| CLKN | DSI_CLKN | MIPI 클럭 신호 - |
| D0P | DSI_D0P | MIPI 데이터 레인 0 + |
| D0N | DSI_D0N | MIPI 데이터 레인 0 - |
| D1P | DSI_D1P | MIPI 데이터 레인 1 + |
| D1N | DSI_D1N | MIPI 데이터 레인 1 - |
| - | AVDD18_DSI | MIPI 전원 입력 |
| - | DSI_REXT | 그라운드로 연결하는 외부 10 kΩ 저항 |
| - | AVSS_DSI | 그라운드 |
| TE | PB2 | MCU로 보내는 프레임 신호 티어링 이펙트 |
| RESET | PB5 | 디스플레이 리셋 신호 |

</div>

##### 5.5.1.2. SPI/QSPI 디스플레이 인터페이스 { #5412-spiqspi-display-interface }

SF32LB58x 시리즈는 LCD 패널 연결을 위한 3/4선 SPI와 Quad-SPI 인터페이스를 지원합니다. HCPU는 PA의 LCDC1을, LCPU는 PB의 LCDC2를 사용합니다.

<div align="center"><em>표 5.5-2: SPI/QSPI 신호 연결</em></div>

<div align="center" markdown>

| SPI 신호 | I/O (LCDC1) | I/O (LCDC2) | 상세 설명 |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | 칩 인에이블 |
| WRX_SCL | PA46 | PB10 | 클럭 신호 |
| DCX | PA48 | PB03 | 4선 SPI 모드에서는 데이터/명령 신호, Quad-SPI 모드에서는 데이터 1 |
| SDI_RDX | PA50 | PB09 | 3/4선 SPI 모드에서는 데이터 입력, Quad-SPI 모드에서는 데이터 0 |
| SDO | PA50 | PB09 | 3/4선 SPI 모드에서는 데이터 출력, SDI_RDX와 함께 연결 |
| D[0] | PA47 | PB04 | Quad-SPI 모드에서는 데이터 2 |
| D[1] | PA45 | PB06 | Quad-SPI 모드에서는 데이터 3 |
| REST | PA74 | PB05 | 디스플레이 리셋 신호 |
| TE | PA43 | PB02 | MCU로 보내는 프레임 신호 티어링 이펙트 |

</div>

##### 5.5.1.3. MCU8080 디스플레이 인터페이스 { #5413-mcu8080-display-interface }

SF32LB58x 시리즈는 LCD 패널 연결을 위한 MCU8080 인터페이스를 지원합니다.

<div align="center"><em>표 5.5-3: MCU8080 신호 연결</em></div>

<div align="center" markdown>

| MCU8080 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| CSX | PA44 | 칩 셀렉트 |
| WRX | PA46 | 데이터 쓰기용 쓰기 스트로브 신호 |
| DCX | PA48 | 디스플레이 데이터/명령 선택 |
| RDX | PA50 | 읽기 스트로브 신호 |
| D[0] | PA47 | 데이터 0 |
| D[1] | PA45 | 데이터 1 |
| D[2] | PA26 | 데이터 2 |
| D[3] | PA27 | 데이터 3 |
| D[4] | PA42 | 데이터 4 |
| D[5] | PA51 | 데이터 5 |
| D[6] | PA52 | 데이터 6 |
| D[7] | PA58 | 데이터 7 |
| REST | PA24 | 리셋 |
| TE | PA43 | MCU로 보내는 프레임 신호 티어링 이펙트 |

</div>

!!! note "RDX 신호 설명"
    원문은 RDX를 "read strobe signal for write data"(데이터 쓰기용 읽기 스트로브 신호)라고 설명하는데, 이는 내용상 모순됩니다. 이 표에서는 "읽기 스트로브 신호"를 사용합니다. 릴리스 전에 RDX의 의도된 기능을 SiFli에 확인하십시오.

##### 5.5.1.4. DPI 디스플레이 인터페이스 { #5414-dpi-display-interface }

SF32LB58x 시리즈는 LCD 패널 연결을 위한 DPI 인터페이스를 지원합니다.

<div align="center"><em>표 5.5-4: DPI 신호 연결</em></div>

<div align="center" markdown>

| DPI 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| CLK | PA12 | 클럭 신호 |
| DE | PA13 | 데이터 인에이블 신호 |
| HSYNC | PA14 | 수평 동기 신호 |
| VSYNC | PA15 | 수직 동기 신호 |
| SD | PA18 | 디스플레이 셧다운 제어 |
| CM | PA19 | Normal Color 모드와 Reduced Color 모드 간 전환 |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | 픽셀 데이터(적색 R0-R7) |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | 픽셀 데이터(녹색 G0-G7) |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | 픽셀 데이터(청색 B0-B7) |

</div>

##### 5.5.1.5. JDI 디스플레이 인터페이스 { #5415-jdi-display-interface }

SF32LB58x 시리즈는 LCD 패널 연결을 위한 병렬 및 직렬 JDI 인터페이스를 모두 지원하며, LCDC1(PA) 또는 LCDC2(PB) 신호에 멀티플렉싱됩니다. LCDC2(PB)를 권장합니다.

<div align="center"><em>표 5.5-5: 병렬 JDI 신호 연결</em></div>

<div align="center" markdown>

| JDI 신호 | I/O (LCDC1) | I/O (LCDC2) | 상세 설명 |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | 수직 드라이버용 시프트 클럭 |
| JDI_VST | PA22 | PB19 | 수직 드라이버용 시작 신호 |
| JDI_XRST | PA25 | PB16 | 수평 및 수직 드라이버용 리셋 신호 |
| JDI_HCK | PA43 | PB05 | 수평 드라이버용 시프트 클럭 |
| JDI_HST | PA44 | PB10 | 수평 드라이버용 시작 신호 |
| JDI_ENB | PA45 | PB12 | 픽셀 메모리 쓰기 인에이블 신호 |
| JDI_R1 | PA46 | PB09 | 적색 이미지 데이터(홀수 픽셀) |
| JDI_R2 | PA47 | PB06 | 적색 이미지 데이터(짝수 픽셀) |
| JDI_G1 | PA48 | PB08 | 녹색 이미지 데이터(홀수 픽셀) |
| JDI_G2 | PA50 | PB04 | 녹색 이미지 데이터(짝수 픽셀) |
| JDI_B1 | PA65 | PB02 | 청색 이미지 데이터(홀수 픽셀) |
| JDI_B2 | PA67 | PB03 | 청색 이미지 데이터(짝수 픽셀) |
| JDI_XFRP | PBR1 | PBR1 | 액정 구동 신호("on" 픽셀) |
| JDI_VCOM/FRP | PBR2 | PBR2 | 공통 전극 구동 신호/액정 구동 신호("off" 픽셀) |

</div>

<div align="center"><em>표 5.5-6: 직렬 JDI 신호 연결</em></div>

<div align="center" markdown>

| JDI 신호 | I/O (LCDC1) | I/O (LCDC2) | 상세 설명 |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | 칩 셀렉트 신호 |
| JDI_SCLK | PA84 | PB02 | 직렬 클럭 신호 |
| JDI_SO | PA86 | PB06 | 직렬 데이터 출력 신호 |
| JDI_DISP | PA90 | PB04 | 디스플레이 ON/OFF 전환 신호 |
| JDI_EXTCOMIN | PA91 | PB05 | COM 반전 극성 입력 |

</div>

#### 5.5.2. 터치와 백라이트 { #542-touch-and-backlight }

SF32LB58x 시리즈는 터치 상태 인터럽트 입력을 갖춘 I2C 방식의 터치 컨트롤러 인터페이스를 지원하며, 백라이트 드라이버의 인에이블과 밝기를 제어하는 PWM 신호 1개를 지원합니다.

<div align="center"><em>표 5.5-7: 터치와 백라이트 연결</em></div>

<div align="center" markdown>

| 터치/백라이트 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| Interrupt | PA69 | 터치 상태 인터럽트(웨이크업 가능) |
| I2C1_SCL | PA17 | 터치 패널 I2C 클럭 |
| I2C1_SDA | PA16 | 터치 패널 I2C 데이터 |
| BL_PWM | PB44 | 백라이트 PWM 제어 신호 |
| Reset | PA15 | 터치 리셋 신호 |
| Power Enable | PA12 | 터치 패널 전원 인에이블 신호 |

</div>

#### 5.5.3. 오디오 { #543-audio }

SF32LB58x 시리즈는 다양한 오디오 관련 인터페이스를 제공하며, 특성은 다음과 같습니다.

1. SF32LB58x 시리즈는 I2S 인터페이스 3개를 제공합니다. I2S1은 입력만 지원하고, I2S2와 I2S3은 입력과 출력을 모두 지원합니다. 3개 모두 마스터 모드로만 동작하며 슬레이브 모드는 지원하지 않습니다.
2. I2S 마이크 입력에는 I2S1을 사용하는 것이 좋습니다.
3. 오디오 DAC에는 I2S2를 사용하는 것이 좋습니다.
4. 오디오 코덱에는 I2S3을 사용하는 것이 좋습니다.
5. 이 칩은 디지털 마이크용 PDM 입력 인터페이스 2개를 제공하며, 각 인터페이스에 최대 2개의 디지털 마이크를 연결할 수 있습니다. PDM 인터페이스 수와 마이크 수를 같게 보아서는 안 됩니다.
6. 아날로그 마이크 입력 2개를 지원합니다. 각 입력에는 2.2 uF 이상의 직렬 DC 차단 커패시터가 필요합니다. SF32LB58x의 MIC_BIAS 핀이 아날로그 마이크에 전원을 공급합니다.
7. 외부 아날로그 오디오 전력 증폭기를 연결할 수 있습니다. 각 DAC 채널의 P/N 트레이스는 차동 쌍으로 라우팅하고, 그라운드에 연결한 적절한 실드를 두며, 기생 커패시턴스를 10 pF 미만으로 유지하십시오. 원문은 서로 상충하는 트레이스 길이 한계를 제시하므로 아래 참고를 확인하십시오.
8. 스테레오 아날로그 헤드폰을 연결할 수 있습니다.

!!! note "원문의 DAC 트레이스 길이 불일치"
    SiFli의 하드웨어 애플리케이션 노트는 서로 다른 두 가지 DAC 트레이스 길이 한계를 제시합니다. 오디오 개요에서는 `<2 cm`라고 하고, 상세 DAC PCB 라우팅 절에서는 `<2 mm`라고 합니다. 원문에는 이 차이에 대한 설명이 없습니다. PCB를 확정하기 전에 적용할 한계를 SiFli에 확인하십시오. 한 값이 다른 값을 대체한다고 가정하면 안 됩니다.

![그림 5.5-1: 차동 아날로그 오디오 입력 회로](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-1: 차동 아날로그 오디오 입력 회로</em></div>

![그림 5.5-2: 단일 종단 아날로그 오디오 입력 회로](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-2: 싱글 엔디드 아날로그 오디오 입력 회로</em></div>

![그림 5.5-3: 아날로그 오디오 출력 회로](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-3: 아날로그 오디오 출력 회로</em></div>

![그림 5.5-4: 아날로그 마이크 회로](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-4: 아날로그 MIC 회로</em></div>

![그림 5.5-5: 스테레오 헤드폰 회로](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-5: 스테레오 헤드폰 회로</em></div>

![그림 5.5-6: 아날로그 오디오 파워 앰프 회로](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-6: 아날로그 오디오 PA 회로</em></div>

![그림 5.5-7: I2S 오디오 파워 앰프 회로](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-7: I2S 오디오 PA 회로</em></div>

<div align="center"><em>표 5.5-8: 오디오 신호 연결</em></div>

<div align="center" markdown>

| 오디오 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| I2S1_LRCK | PA14 | I2S1 프레임 클럭 |
| I2S1_SDI | PA18 | I2S1 데이터 입력 |
| I2S1_BCK | PA23 | I2S1 비트 클럭 |
| I2S2_LRCK | PA84 | I2S2 프레임 클럭 |
| I2S2_SDI | PA86 | I2S2 데이터 입력 |
| I2S2_SDO | PA82 | I2S2 데이터 출력 |
| I2S2_BCK | PA91 | I2S2 비트 클럭 |
| I2S3_LRCK | PB31 | I2S3 프레임 클럭 |
| I2S3_SDI | PB27 | I2S3 데이터 입력 |
| I2S3_SDO | PB24 | I2S3 데이터 출력 |
| I2S3_BCK | PB30 | I2S3 비트 클럭 |
| I2S3_MCLK | PB34 | I2S3 마스터 클럭 |
| PDM1_CLK | PA23 | PDM1 클럭 |
| PDM1_DATA | PA18 | PDM1 데이터 |
| PDM2_CLK | PA25 | PDM2 클럭 |
| PDM2_DATA | PA22 | PDM2 데이터 |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | 아날로그 입력 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | 아날로그 입력 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | 아날로그 출력 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | 아날로그 출력 2P/2N |

</div>

!!! note "핀 멀티플렉싱 참고"
    I2S1_SDI는 PA18을 PDM1_DATA와 공유하고, I2S1_BCK는 PA23을 PDM1_CLK와 공유합니다. I2S1_LRCK는 PA14를 사용하고, PDM2_DATA는 PA22를 사용합니다. 회로도를 확정하기 전에 소프트웨어 인터페이스 설정에서 활성화되는 오디오 기능을 확인하십시오.

SF32LB58x의 아날로그 MIC 입력은 싱글 엔디드와 차동 모드를 모두 지원하며, 어느 쪽이든 직렬 2.2 uF 커패시터를 둡니다. AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N은 SF32LB58x 쪽에 연결됩니다. 아날로그 출력 쪽에서 AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N은 SF32LB58x의 출력이며, 스테레오 헤드폰 PA 입력이나 외부 아날로그 오디오 PA 입력을 구동할 수 있습니다. 아날로그 오디오 PA와 I2S 오디오 PA는 모두 I2C3을 통해 설정됩니다.

#### 5.5.4. 버튼 { #544-buttons }

##### 5.5.4.1. 전원 및 길게 누름 리셋 버튼 { #5441-power-and-long-press-reset-button }

PB54는 SF32LB58x 시리즈에 권장하는 전원 키 신호이며, 짧게 눌러 전원을 켜고 끄는 기능과 길게 눌러 리셋하는 기능을 버튼 하나에 결합합니다. 이 설계는 active-high이며, 버튼을 10초 넘게 누르고 있으면 칩이 자동으로 리셋됩니다.

![그림 5.5-8: 전원/리셋 버튼 회로](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-8: 전원/리셋 버튼 회로</em></div>

##### 5.5.4.2. 기능 버튼 또는 로터리 엔코더 { #5442-function-button-or-rotary-encoder }

SF32LB58x 시리즈는 기능 버튼 입력과 로터리 엔코더 신호 입력을 지원하며, 두 입력 모두 풀업이 필요합니다. 광학 트래킹 센서도 지원하며, 이 센서에는 I2C4를 사용하는 것이 좋습니다.

![그림 5.5-9: 기능 버튼/로터리 엔코더 회로](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-9: 기능 버튼/로터리 엔코더 회로</em></div>

<div align="center"><em>표 5.5-9: 광 트래킹 센서 신호</em></div>

<div align="center" markdown>

| I2C 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| INT | PA58 | 광 트래킹 센서 인터럽트 입력 |
| SDA | PA59 | 광 트래킹 센서 I2C 데이터 |
| SCL | PA60 | 광 트래킹 센서 I2C 클럭 |

</div>

#### 5.5.5. 진동 모터 { #545-vibration-motor }

SF32LB58x 시리즈는 여러 PWM 출력을 지원하며, 이 출력으로 진동 모터를 구동할 수 있습니다.

!!! important
    소프트웨어에서 HCPU 주파수 스케일링 매크로 `#define BSP_PM_FREQ_SCALING 1`을 활성화하면, HCPU가 idle 스레드에 들어갈 때 HCPU 클럭이 낮아지고 해당 PA 핀의 PWM 주파수도 그에 따라 바뀝니다. 따라서 PWM 신호는 PB 핀으로 출력하는 것이 좋습니다.

![그림 5.5-10: 진동 모터 회로](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.5-10: 진동 모터 회로</em></div>

### 5.6. 스토리지와 연결 { #55-storage-and-connectivity }

#### 5.6.1. 부트 설정 { #551-boot-configuration }

SF32LB58x 시리즈는 부트 모드를 설정하는 `Mode` 핀을 제공합니다.

<div align="center"><em>표 5.6-1: Mode 설정</em></div>

<div align="center" markdown>

| `Mode` 설정 | 상세 설명 |
|:---|:---|
| High | 전원 인가 후 다운로드 모드로 진입 |
| Low | 전원 인가 후 사용자 애플리케이션 영역으로 점프 |

</div>

!!! note "참고"
    1. `Mode` 핀의 전압 도메인은 VDDIOA와 같습니다.
    2. 레벨을 안정적으로 유지하려면 `Mode` 핀을 10 kΩ 저항으로 전원 또는 GND에 연결하십시오. 플로팅되거나 토글되면 안 됩니다.
    3. 양산 보드에는 펌웨어 플래싱과 크리스털 캘리브레이션을 위해 `Mode` 핀의 테스트 포인트를 반드시 확보해야 하며, 점퍼는 필요하지 않습니다.
    4. 테스트 보드에는 펌웨어가 크래시한 후에도 보드를 다운로드 모드로 시작할 수 있도록 `Mode` 핀용 점퍼를 확보하는 것이 좋습니다.

#### 5.6.2. 스토리지 { #552-storage }

SF32LB58x 시리즈는 외부 NOR 플래시와 SPI NAND 플래시용 MPI3 또는 MPI4 인터페이스, 그리고 외부 SD NAND와 eMMC용 SD1 인터페이스를 지원합니다.

##### 5.6.2.1. QSPI NAND 플래시 인터페이스 { #5521-qspi-nand-flash-interface }

SF32LB58x EVB 레퍼런스 보드는 기본적으로 MPI4를 사용하여 외부 SPI NAND 플래시 디바이스를 연결합니다.

![그림 5.6-1: SPI NAND 플래시 기준 회로](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.6-1: SPI NAND 플래시 레퍼런스 회로</em></div>

<div align="center"><em>표 5.6-2: MPI4 신호 연결</em></div>

<div align="center" markdown>

| 플래시 신호 | I/O 신호(MPI4) | 상세 설명 |
|:---|:---|:---|
| CS# | PA10 | 칩 셀렉트, active low |
| SO | PA04 | 데이터 입력(Data Input Output 1) |
| WP# | PA01 | 쓰기 보호 출력(Data Input Output 2) |
| SI | PA05 | 데이터 출력(Data Input Output 0) |
| SCLK | PA09 | 직렬 클럭 출력 |
| Hold# | PA06 | 데이터 출력(Data Input Output 3) |

</div>

!!! note "참고"
    1. 양산 라인에서 외부 플래시에 펌웨어를 기록해야 하는 경우, 플래싱 도구 소프트웨어가 외부 플래시의 전원 제어 핀 PA43을 high로 구동하여 전원을 켜야 합니다.
    2. SPI NAND 플래시의 Hold# 핀은 10 kΩ 저항으로 SPI NAND 플래시 전원에 풀업해야 합니다.

##### 5.6.2.2. SDIO eMMC/Micro SD 인터페이스 { #5522-sdio-emmc-micro-sd-interface }

SF32LB58x 시리즈는 SDIO 인터페이스 2개를 지원합니다. EVB에서 SD1은 기본적으로 eMMC 또는 SD NAND에 연결되고, SD2는 SD 카드 또는 Wi-Fi 칩에 연결됩니다.

SD1은 VDDIOA2 도메인에서 전원을 공급받는 GPIO 12개(PA00-PA11)를 사용하며, 1.8 V 또는 3.3 V를 지원하고 주변 장치의 인터페이스 레벨에 맞게 선택합니다. SPI NAND 플래시와 eMMC는 1.8 V를 권장합니다. SD NAND 플래시 디바이스는 3.3 V 인터페이스 레벨만 지원하므로, 이 경우에는 VDDIOA2를 3.3 V로 설정해야 합니다.

![그림 5.6-2: eMMC 기준 회로](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.6-2: eMMC 레퍼런스 회로</em></div>

![그림 5.6-3: SD NAND 기준 회로](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.6-3: SD NAND 레퍼런스 회로</em></div>

![그림 5.6-4: SD 카드 기준 회로](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.6-4: SD 카드 레퍼런스 회로</em></div>

<div align="center"><em>표 5.6-3: SD1 신호 연결</em></div>

<div align="center" markdown>

| SD1 신호 | I/O 신호 | 상세 설명 |
|:---|:---|:---|
| SD1_D7 | PA00 | 데이터 7 |
| SD1_D2 | PA01 | 데이터 6 |
| SD1_D5 | PA03 | 데이터 5 |
| SD1_D1 | PA04 | 데이터 1 |
| SD1_D0 | PA05 | 데이터 0 |
| SD1_D3 | PA06 | 데이터 3 |
| SD1_D4 | PA07 | 데이터 4 |
| SD1_D6 | PA08 | 데이터 6 |
| SD1_CLK | PA09 | 클럭 신호 |
| SD1_CMD | PA10 | 명령 신호 |

</div>

!!! note "SD1 레이블 확인"
    원문은 SD1이 GPIO 12개(PA00–PA11)를 사용한다고 설명하지만, 신호 표에는 신호 10개(SD1_D[7:0], CLK, CMD)만 나열되어 있습니다. 또한 이 표는 SD1_D2와 SD1_D6을 모두 "Data 6"으로 설명합니다. 나열되지 않은 GPIO 2개에 대한 설명도, 중복된 레이블에 대한 정리도 없습니다. 회로도를 확정하기 전에 칩 데이터시트와 대조하여 전체 SD1 핀 매핑을 검증하십시오.

<div align="center"><em>표 5.6-4: SD2 신호 연결</em></div>

<div align="center" markdown>

| SD2 신호 | I/O 신호 | 상세 설명 |
|:---|:---|:---|
| SD2_CMD | PA70 | 명령 신호 |
| SD2_D1 | PA75 | 데이터 1 |
| SD2_D0 | PA76 | 데이터 0 |
| SD2_CLK | PA77 | 클럭 신호 |
| SD2_D2 | PA79 | 데이터 2 |
| SD2_D3 | PA81 | 데이터 3 |

</div>

#### 5.6.3. USB { #553-usb }

SF32LB58x 시리즈의 USB는 Host와 Device 모드 모두에서 USB2.0 HS를 지원합니다. USB DP와 DM 모두에서 그라운드로 TVS 보호를 제공하되, TVS 접합 커패시턴스는 5 pF 미만으로 하십시오. DP/DM PCB 트레이스는 임피던스 90 Ω의 차동 쌍으로 라우팅하십시오.

![그림 5.6-5: USB 인터페이스 회로](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.6-5: USB 인터페이스 회로</em></div>

### 5.7. 양산 { #56-manufacturing }

#### 5.7.1. 디버그 및 플래싱 인터페이스 { #561-debug-and-download-interface }

SF32LB58x 시리즈는 EDA 도구에 연결하여 싱글 스텝 디버깅을 할 수 있도록 Arm® 표준 SWD 디버그 인터페이스를 지원합니다. SEGGER® J-Link® 프로브를 연결할 때는 프로브의 전원을 외부 공급으로 재설정하여 SF32LB58x 보드에서 전원을 공급받아야 합니다.

![그림 5.7-1: SWD 디버그 인터페이스 회로](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 5.7-1: SWD 디버그 인터페이스 회로</em></div>

SF32LB58x는 SWD 인터페이스 1개와 디버그 출력용으로 선택 가능한 UART 인터페이스 6개를 제공합니다.

<div align="center"><em>표 5.7-1: 디버그 포트 연결</em></div>

<div align="center" markdown>

| UART 신호 | I/O | 상세 설명 |
|:---|:---|:---|
| TXD1 | PA31 | UART1 RXD, HCPU 기본 출력 포트 |
| RXD1 | PA32 | UART1 TXD, HCPU 기본 출력 포트 |
| TXD2 | PA28 | UART2 RXD |
| RXD2 | PA29 | UART2 TXD |
| TXD3 | PA21 | UART3 RXD |
| RXD3 | PA20 | UART3 TXD |
| TXD4 | PB37 | UART4 RXD, LCPU 기본 출력 포트 |
| RXD4 | PB36 | UART4 TXD, LCPU 기본 출력 포트 |
| TXD5 | PB18 | UART5 RXD |
| RXD5 | PB17 | UART5 TXD |
| TXD6 | PB14 | UART6 RXD |
| RXD6 | PB13 | UART6 TXD |
| SWCLK | PB07 | J-Link 클럭 신호 |
| SWDIO | PB11 | J-Link 데이터 신호 |

</div>

!!! note "참고"
    UARTx RXD 신호는 플로팅되면 안 됩니다. 소프트웨어 초기화 중에 내부 풀업을 활성화하십시오.

#### 5.7.2. 양산 플래싱과 하드웨어 접근 { #562-production-flashing-and-hardware-access }

양산 플래싱, 복구, 캘리브레이션 접근은 인클로저와 지그를 확정하기 전에 계획하는 것이 좋습니다. 최소한 전원, 그라운드, SWD, 필요한 UART 디버그 출력, 부트/설정 핀, 그리고 부팅되지 않는 이미지를 복구하는 데 필요한 보드 수준의 리셋 또는 PMIC 제어 포인트에 대한 접근을 유지하십시오.

#### 5.7.3. 회로도 및 PCB 도면 체크리스트 { #563-schematic-and-pcb-drawing-checklists }

- [ ] 전원 구성(내장 PMU 직접 공급 또는 SF30147C와 함께 사용)이 시스템 전력 예산과 일치
- [ ] Mode 부트 설정 핀에 외부 10 kΩ 저항이 있고, 양산 보드에 테스트 포인트가 확보되어 있음
- [ ] 48 MHz/32.768 kHz 크리스털 사양이 권장 사항과 일치하고, 크리스털 아래의 2층 GND가 제거되어 있음
- [ ] 스토리지 인터페이스 선택(MPI4/SD1/SD2)이 부트 설정과 일치하고, PA43 외부 플래시 전원 제어 핀을 확인함
- [ ] 디스플레이 인터페이스 선택(MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI)이 LCDC1/LCDC2 핀 할당과 일치
- [ ] 디버그 포트(SWD + 6x UART) 핀을 필요에 따라 할당했으며, UART RXD 내부 풀업을 활성화함
- [ ] 오디오 인터페이스 I2S/PDM과 아날로그 오디오 멀티플렉싱을 검증했으며, 차동 트레이스 예산을 충족
- [ ] USB DP와 DM 모두 그라운드로 TVS 보호가 있으며, TVS 접합 커패시턴스가 5 pF 미만

[SF32 승인 업체 목록]: ../cad-components/sifli-approved-vendor-list.md
