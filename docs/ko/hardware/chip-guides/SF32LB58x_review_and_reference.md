---
icon: lucide/clipboard-check
description: "SF32LB58x 하드웨어 설계 가이드의 설계 검토 체크리스트, 관련 문서와 참고 자료, 부록, 개정 이력입니다."
tags:
    - 하드웨어
    - 칩
hide:
    - navigation
---

# SF32LB58x 하드웨어 설계 가이드 — 설계 검토 체크리스트 및 참고 자료 { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB58x 하드웨어 설계 가이드의 일부"
    이 페이지는 7~10절인 설계 검토 체크리스트, 관련 문서 및 참고 자료, 부록, 개정 이력을 다룹니다. [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)로 돌아가십시오.

## 7. 설계 검토 체크리스트 { #7-design-review-checklist }

- [ ] 선택한 모델에 함께 패키징된 플래시/PSRAM 조합이 제품 요구 사항을 충족하는지 확인합니다
- [ ] PMU 전원(PVDD1/PVDD2/BUCK/LDO)과 그 밖의 모든 전원 핀 전압이 데이터시트 한계 안에 있는지 확인합니다
- [ ] 선택한 BUCK 인덕터가 공칭 인덕턴스 4.7 µH, DCR ≤0.4 Ω, Isat ≥500 mA를 충족하는지 확인합니다
- [ ] 48 MHz 및 32.768 kHz 크리스털이 권장 사양을 충족하고, 라우팅과 금지 구역이 설계 요구 사항을 만족하는지 확인합니다
- [ ] 50 Ω 임피던스 제어 RF 트레이스를 확인하고, 매칭 회로를 칩 가까이에 배치합니다
- [ ] 선택한 외부 스토리지 인터페이스가 의도한 부트 설계와 호환되는지 확인합니다. 이와 별도로 Mode 핀이 의도한 대로 다운로드 모드에서는 High로, 사용자 애플리케이션 시작에서는 Low로 스트랩되어 있는지 확인합니다
- [ ] 디스플레이 인터페이스(MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) 라우팅이 각 인터페이스의 임피던스 및 길이 매칭 규칙을 충족하는지 확인합니다. DSI의 경우 차동 임피던스 100 Ω, 쌍 내 길이 불일치 ≤0.5 mm, 쌍 간 길이 불일치 ≤2 mm인지 확인합니다
- [ ] USB 라우팅이 차동 임피던스 90 Ω 요구 사항을 충족하는지 확인합니다. SDIO 신호는 함께 라우팅하고, 총 라우팅 길이를 ≤50 mm로 유지하며, 그룹 내 길이 불일치를 ≤6 mm로 제한합니다
- [ ] SWD 접근 수단과, 사용 가능한 6개의 UART 중에서 선택한 디버그 출력 인터페이스를 신호 핀 및 양산 테스트 포인트와 함께 확보합니다
- [ ] BGA 패드 비아가 중심에 놓여 있고 칩 아래의 그라운드 플레인이 연속되어 있는지 확인합니다
- [ ] 주요 부품 번호를 최신 [SF32 승인 업체 목록][SiFli Approved Vendor List (AVL)]과 대조해 확인합니다
- [ ] 검토 증빙 자료에 스택업 및 공정 능력 데이터, 임피던스 및 DRC 결과, AVL, 핵심 부분 레이아웃 스크린샷을 포함합니다
- [ ] 프로토타입을 릴리스하기 전에 미해결 회로도, 레이아웃, 제조 이슈를 모두 해결하거나, 해결될 때까지 명시적으로 추적합니다

## 8. 관련 문서 및 참고 자료 { #8-related-documents-and-references }

전기적 한계, 패키지 정보, 핀 멀티플렉싱, 소프트웨어 구성, 부품 인증을 확인할 때는 최신 공식 문서를 사용하십시오.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SF32 승인 업체 목록]__
- :fontawesome-brands-wikipedia-w: __[SiFli 칩 하드웨어 설계 가이드 목차(Wiki)]__

</div>

[회로도 체크리스트](SF32LB58x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)(6.18절)는 *SF32LB58x Schematic & PCB Checklist* 워크북(V1.0, 2026-01-21)의 해당 회로도 및 PCB 점검 항목을 반영하고, 각 항목의 판단 기준이 되는 설계 지침도 함께 제공합니다.

[SF32LB58x Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32 승인 업체 목록]: ../cad-components/sifli-approved-vendor-list.md
[SiFli 칩 하드웨어 설계 가이드 목차(Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. 부록 { #9-appendices }

부록에는 제품 적용 사례와 레퍼런스 디자인 관련 정보가 담겨 있습니다. 5절과 6절의 주요 회로도 및 PCB 설계 규칙을 적용한 뒤 설계 검토에 참고하십시오.

<div align="center"><em>표 9-1: 부록 색인</em></div>

<div align="center" markdown>

| 필요 사항 | 시작 위치 |
|:---|:---|
| 기능이 다양한 웨어러블 디바이스 또는 스마트 단말의 적용 사례 | 부록 A: 일반적인 스마트 웨어러블 또는 스마트 단말 |
| 회로도 스크린샷과 회로 수준 예시 | 5절 및 SF32LB58x 하드웨어 애플리케이션 노트 |
| BGA, HDI, RF, DSI, USB, SDIO, 오디오, 전원의 PCB 레이아웃 스크린샷 | 6절 및 SF32LB58x 하드웨어 애플리케이션 노트 |

</div>

### 9.1. 부록 A. 일반적인 스마트 웨어러블 또는 스마트 단말 { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

웨어러블 디바이스 또는 스마트 단말용 일반적인 SF32LB58x 설계는 MCU, PMIC, 고해상도 디스플레이, 터치 컨트롤러, 부트 스토리지, 외부 메모리 또는 eMMC, 센서, 진동 모터, 오디오 입출력, Bluetooth 안테나, 크리스털, USB, 디버그 접근 수단, 양산 테스트 접근 수단을 포함합니다. BGA256 패키지와 고속 디스플레이/스토리지 인터페이스 때문에, HDI 공정 선택은 단순한 PCB 레이아웃 세부 사항이 아니라 시스템 아키텍처의 일부입니다.

## 10. 개정 이력 { #10-revision-history }

<div align="center"><em>표 10-1: 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
|:---|:---|:---|
| 1.0 | 2026-07 | 회로도, PCB, 검증, 양산 검토 지침을 포함하여 SF32LB58x 하드웨어 설계 가이드를 업데이트함 |
| 0.0.1 | 1/2025 | `SF32LB58x-HW-Application` 정식 초안 릴리스 |

</div>

### 10.1. 체크리스트 개정 이력 { #101-checklist-revision-history }

[회로도 체크리스트](SF32LB58x_schematic_checklist.md)와 [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)의 항목별 체크리스트는 SiFli의 *SF32LB58x Schematic & PCB Checklist* 워크북을 따라 가이드와 별도로 버전을 관리합니다.

<div align="center"><em>표 10.1-1: 체크리스트 개정 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 초판 릴리스 |

</div>
