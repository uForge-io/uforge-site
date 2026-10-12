---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB55x 하드웨어 설계 가이드의 설계 검토 체크리스트, 관련 문서와 참고 자료, 부록, 개정 이력입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB55x 하드웨어 설계 가이드 — 설계 검토 체크리스트 및 참고 자료 { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. 설계 검토 체크리스트 { #7-design-review-checklist }

- [ ] 정확한 패키지, 핀 배치, 랜드 패턴, PCB 공정을 확인했습니다.
- [ ] 모든 PMU 및 보조 전원 레일이 데이터시트의 전압/전류 한계와 일치합니다.
- [ ] 필수 디커플링 커패시터를 핀 가까이에 배치했습니다.
- [ ] POR/BOR/리셋 타이밍과 부트 모드를 검증했습니다.
- [ ] 48 MHz 및 32.768 kHz 크리스털이 CL, ppm, ESR, 배치, 라우팅 요구 사항을 충족합니다.
- [ ] RF 매칭, 안테나, 그라운드 금지 구역을 검토했습니다.
- [ ] 외부 메모리와 디스플레이 핀 그룹이 선택한 패키지와 일치합니다.
- [ ] 웨이크업, GPADC, 센서, 오디오, 터치, 백라이트, 모터 회로가 저전력 요구 사항을 충족합니다.
- [ ] 디버그, 플래싱, 양산 플래싱, RF 테스트, 크리스털 캘리브레이션 접근 수단을 확보해 두었습니다.

## 8. 관련 문서 및 참고 자료 { #8-related-documents-and-references }

전기적 한계, 패키지 데이터, 핀 멀티플렉싱, 소프트웨어 구성, 부품 인증, 제조 제약을 확인할 때는 최신 공식 문서를 사용하십시오.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

[회로도 체크리스트](SF32LB55x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 가이드라인](SF32LB55x_pcb_layout.md)의 6.4절은 동일한 *SF32LB55x Schematic & PCB Checklist*(V1.0, 2026-01-21)를 항목별로 재현하며, 각 항목이 점검 대상으로 삼는 회로도 및 PCB 레이아웃 가이드와 함께 제공합니다.

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. 부록 { #9-appendices }

### 9.1. 부록 A. 일반적인 SF32LB55x 제품 { #appendix-a-a-typical-sf32lb55x-product }

일반적인 SF32LB55x 제품은 MCU, 전원 트리, 크리스털, RF 매칭 및 안테나, 외부 메모리, 디스플레이 및 터치 컨트롤러, 센서, GPADC 입력, 진동 모터, 선택 사항인 Bluetooth 오디오, 디버그 접근 수단, 양산 테스트 접근 수단을 포함합니다. 배터리로 구동되는 설계는 저전력 누설 검토와 픽스처 접근 계획도 포함하는 것이 좋습니다.

### 9.2. 설계 Q&A { #91-design-qa }

1. **Mode = 1일 때 일부 GPIO 기본값이 사양과 다른 이유는 무엇입니까?** 다운로드 모드에서는 QSPI2 및 QSPI3의 외부 플래시와 연결된 GPIO 상태가 바뀝니다.
2. **표면 실장 모터가 프로그래밍 중에 예기치 않게 진동하는 이유는 무엇입니까?** 전원 enable 또는 PWM 신호가 예기치 않게 활성화될 수 있습니다. High 레벨로 모터가 시작되는 경우, 기본 풀업(PU) GPIO가 모터 전원을 켤 수 있습니다. SiFli는 PWM에 기본 풀다운(PD)인 GPIO17 또는 GPIO39를 사용하기를 권장합니다.
3. **배터리를 납땜할 때 칩이 멈추는 이유는 무엇이며, 어떻게 방지할 수 있습니까?** 납땜 인두의 접지가 불량하면 서지가 발생할 수 있습니다. 배터리 인터페이스에 서지 및 ESD 보호를 추가하고 인두를 올바르게 접지하십시오.
4. **웨이크 버튼이 Hibernate에서 MCU를 깨우지 못하는 이유는 무엇입니까?** Hibernate에서 MCU를 깨울 수 있는 것은 여섯 개의 LCPU 웨이크업 입력인 GPIO43~GPIO48뿐이며, HCPU 쪽 GPIO0~GPIO3는 깨울 수 없습니다.
5. **저전력 디버깅 중에 G-sensor 또는 심박 센서가 전력을 과도하게 소모하거나 오동작하는 이유는 무엇입니까?** 해당 펌웨어가 LCPU에서 실행되므로, I2C, SPI, 제어, 인터럽트 신호가 모두 LCPU 인터페이스를 사용해야 합니다. 이 중 하나라도 HCPU 인터페이스에 할당하면 전력이 늘어나거나 오동작할 수 있습니다.
6. **모든 신호가 LCPU 인터페이스를 사용하는데도 센서 전력이 높게 유지되는 이유는 무엇입니까?** 센서 레일만 끄는 것으로는 충분하지 않으며, I2C 또는 인터럽트 신호의 풀업 전원이 켜져 있으면 전력이 계속 소모됩니다. 해당 인터페이스 풀업 전원도 함께 비활성화하십시오.
7. **GPIO26과 GPIO27을 모두 출력 제어에 사용하면 슬립 전류가 증가할 수 있는 이유는 무엇입니까?** 슬립 중에 두 핀의 레벨을 동일하게 만들거나, 최소 하나를 풀업과 풀다운이 없는 high impedance로 설정하십시오.
8. **SS6600에서 Hibernate 전류가 높은 경우 어떻게 조사해야 합니까?** 열 개의 웨이크업 입력 전체, 즉 HCPU GPIO0~GPIO3와 LCPU GPIO43~GPIO48을 정해진 high 또는 low 레벨로 안정적으로 유지하십시오. 열 개 모두를 풀업하는 경우, 풀업에는 상시 켜져 있는 3.3 V 전원을 사용하십시오.
9. **전원 부품의 정지 전류(quiescent current)가 과도한 저전력 소비를 설명할 수 있습니까?** 그렇습니다. 정지 전류(Iq)가 높은 BUCK 컨버터, LDO, 로드 스위치는 소비 전력을 늘립니다. SiFli는 Iq가 1 µA 미만인 부품을 권장합니다.
10. **ESD 테스트 중 디스플레이 이상 현상을 어떻게 방지할 수 있습니까?** 터치 패널의 VDD, SCL, SDA, RESET, INT 신호와 LCD 전원 및 RESET 신호에 ESD 소자를 추가하십시오.
11. **always-on 디스플레이의 비정상 동작을 어떻게 방지할 수 있습니까?** 이 기능은 주로 TFT 패널보다 전력이 낮은 AMOLED 패널과 함께 사용됩니다. LCD_EN, LCD_RST 및 관련 제어에는 PB GPIO를 권장합니다. PA GPIO로 active-high enable을 구동한다면 기본 풀업(PU)이어야 합니다. 기본 풀다운(PD)인 PA GPIO를 사용하면 웨이크업 후 디스플레이가 10 ms 넘게 비정상적으로 꺼진 채로 남을 수 있습니다.
12. **슬립 중에도 모듈에 전원이 공급되어야 할 때, 웨이크업 후 외부 Bluetooth 오디오 전원 제어 오류를 어떻게 방지할 수 있습니까?** LCPU GPIO로 해당 전원 스위치를 제어하십시오. active-low 스위치에는 기본 풀다운(PD)인 LCPU GPIO를 선택하십시오.
13. **배터리 과방전 이후 충전을 안정적으로 수행하려면 어떻게 해야 합니까?** 배터리 전압이 너무 낮을 때는, 충전기가 연결된 후 충전기 입력이 시스템에 전원을 공급할 수 있도록 전원 경로 관리를 두는 것이 좋습니다. 전원 경로 관리가 없다면 선택한 충전기 IC가 최소 40 mA의 트리클 충전 전류를 제공해야 합니다.
14. **충전기를 연결해도 충전이 시작되지 않을 수 있는 이유는 무엇입니까?** 충전기 삽입 감지 신호는 웨이크업이 가능한 LCPU GPIO인 GPIO43~GPIO48 중 하나에 연결해야 합니다. 다른 GPIO를 사용하면 충전 시퀀스가 올바르게 시작되지 않을 수 있습니다.
15. **MODE가 high일 때 다운로드 모드에서 과전류를 어떻게 방지할 수 있습니까?** active-high enable을 가진 오디오 PA 같은 대전류 주변 장치는 제어에 기본 풀다운(PD) GPIO를 사용하고, 기본 풀업(PU) GPIO는 절대 사용하지 마십시오. 그렇지 않으면 다운로드 모드에서 해당 주변 장치가 켜져 프로그래밍을 방해할 수 있습니다.
16. **MODE가 high일 때 프로그래밍이 실패할 수 있는 이유는 무엇이며, GPIO46의 센서 인터럽트에 대한 우회 방법은 무엇입니까?** 다운로드 모드에서 GPIO46의 기본 기능은 UART3_RX이며, 프로그래밍을 방해할 수 있습니다. 센서 인터럽트를 GPIO43, GPIO44, GPIO47 또는 GPIO48로 옮기십시오. LCPU 웨이크업 입력이 더 필요하면, 보드 외부 버튼을 0 Ω 저항을 통해 GPIO45 또는 GPIO46에 연결하십시오.
17. **G-sensor 및 심박 알고리즘이 사용 가능한 메모리 리소스를 초과하면 어떻게 해야 합니까?** LCPU에 할당된 메모리가 충분한지 확인하십시오. 충분하지 않으면 QSPI4에 외부 NOR 플래시를 추가하십시오.

## 10. 개정 이력 { #10-revision-history }

<div align="center"><em>표 10-1: 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:---|:---|:---|
| 0.1 | 2026-07 | SiFli 공식 위키의 하드웨어 애플리케이션 노트로부터 생성한 SF32LB55x 하드웨어 설계 가이드 초판. |

</div>

### 10.1. 체크리스트 개정 이력 { #101-checklist-revision-history }

[회로도 체크리스트](SF32LB55x_schematic_checklist.md)와 [PCB 레이아웃 가이드라인](SF32LB55x_pcb_layout.md)의 6.4절에 있는 항목별 체크리스트는, SiFli 자체의 *SF32LB55x Schematic & PCB Checklist* 워크북에 따라 이 가이드와 별도로 버전을 관리합니다.

<div align="center"><em>표 10.1-1: 체크리스트 개정 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 초판 릴리스 |

</div>
