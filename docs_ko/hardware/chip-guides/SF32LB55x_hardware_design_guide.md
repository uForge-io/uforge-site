---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB55x MCU의 하드웨어 설계 가이드로, 전원 공급, 클럭 회로, RF 매칭, 스토리지 및 디스플레이 인터페이스, PCB 레이아웃 지침을 다룹니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB55x 하드웨어 설계 가이드 { #sf32lb55x-hardware-design-guide }

## 1. 소개 { #1-introduction }

이 하드웨어 설계 가이드는 범용 AIoT 마이크로컨트롤러 제품군인 SF32LB55x를 기반으로 하는 제품을 위한 권장 사항과 참고 자료를 제공합니다. BLE 웨어러블, 센서가 풍부한 배터리 구동 제품, 건강 모니터링 디바이스, 소형 커넥티드 시스템을 개발하는 하드웨어 엔지니어, PCB 설계자, 제품 개발자를 대상으로 합니다.

이 가이드는 패키지 선택, 전원 공급 설계, 클럭 회로, RF 레이아웃, 외부 메모리, 디스플레이 인터페이스, 웨이크 소스, 센서, 오디오, 디버그 접근, PCB 레이아웃, 검증, 양산 준비까지 하드웨어 개발의 전체 과정을 다룹니다. 이 지침을 따르면 회로도와 레이아웃 리스크를 줄이고, 저전력 동작을 유지하며, 설계를 SF32LB55x의 패키지, 전원, 메모리, RF, 인터페이스 요구 사항에 맞게 유지하는 데 도움이 됩니다.

이 문서는 임베디드 하드웨어 설계와 회로도 작성에 대한 기본 지식을 전제로 합니다. SF32LB55x 데이터시트, 사용자 매뉴얼, 공식 하드웨어 애플리케이션 노트, 레퍼런스 디자인, SiFli 승인 업체 목록을 보완합니다. 전기적 사양, 핀 멀티플렉싱, 패키지 치수, 부품 인증, 양산 한계에 대해서는 이러한 공식 자료가 계속 기준이 됩니다.

SF32LB55x는 레거시 접미사 규칙을 사용합니다. 인터페이스 가용성, 패키지에 따른 기능, 정확한 메모리 토폴로지는 접미사로 추정하지 말고 정확한 주문 가능 부품 번호와 패키지 참고 자료를 사용하십시오.

## 2. 개발 리소스 { #2-development-resources }

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SF32LB55x Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SF32LB55x Datasheet]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[SF32LB55x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[SF32LB55x SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[SF32LB55x API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[SF32 Family Overview]: ../../sf32-products/family/SF32_family.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x Hardware Application Note]__
- :fontawesome-brands-github: __[SF32LB55x Hardware Application Source]__
- :fontawesome-solid-file-pdf: __[SF32LB55x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB55x User Manual]__
- :fontawesome-solid-book: __[SF32LB55x SDK Documentation]__
- :fontawesome-solid-book-open: __[SF32LB55x API Reference]__
- :fontawesome-solid-microchip: __[SF32 Family Overview]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

## 3. 디바이스 개요 { #3-device-overview }

### 3.1. 아키텍처 { #31-architecture }

SF32LB55x는 사용자에게 빠르게 응답하면서도 standby와 슬립 전력을 낮게 유지해야 하는 저전력 AIoT 제품을 대상으로 합니다. 저전력 Bluetooth 5.2 트랜시버, 전원 관리, 메모리 및 디스플레이 인터페이스를 통합합니다. 하드웨어 통합에는 패키지 선택, PMU 레일 설계, 부트 모드 제어, 두 개의 크리스털 회로, RF 매칭, 외부 메모리, MIPI/SPI/MCU8080/JDI 디스플레이 선택, GPADC 및 센서 연결, 외부 Bluetooth 오디오, 디버그/플래싱 접근, 양산 캘리브레이션이 필요합니다.

스토리지 연결에는 여러 개의 QSPI 인터페이스, 독립 OPI-PSRAM 인터페이스, SD/eMMC 지원이 포함됩니다. 공동 패키징된 NOR 플래시와 PSRAM 구성은 정확한 부품 번호에 따라 다릅니다. 메모리와 디스플레이 인터페이스도 패키지에 따라 달라집니다. BGA145는 외부 OPI-PSRAM 채널 하나를, BGA169는 두 개를 지원합니다. 2레인 MIPI DSI 인터페이스는 BGA145와 BGA169에서 지원되며 QFN68L에서는 지원되지 않습니다. 외부 디바이스를 할당하기 전에 정확한 부품의 핀 맵과 공동 패키징 메모리 구성을 확인하십시오.

### 3.2. 변형 및 패키지 { #32-variants-and-packages }

<div align="center"><em>표 3.2-1: 패키지 옵션</em></div>

<div align="center" markdown>

| 패키지 이름 | 크기 | 핀 피치 | 볼 직경 |
| :--- | :--- | :--- | :--- |
| QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| BGA145 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |
| BGA169 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |

</div>

SF32LB55x는 QFN68L, BGA145, BGA169 패키지를 지원합니다. 메모리 인터페이스, 팬아웃, PCB 공정 요구 사항, 사용 가능한 GPIO가 패키지마다 다르므로 패키지를 일찍 선택하십시오.

![그림 3.2-1: QFN68L 핀 배치](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-1: QFN68L 핀 배치</em></div>

![그림 3.2-2: BGA145 핀 배치](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-2: BGA145 핀 배치</em></div>

!!! warning "레거시 BGA169 핀 맵"
    SiFli는 SF32LB557V8N6을 EOL(end-of-life)로 분류합니다. 이 부품의 볼 맵은 신규 설계에 대한 권장이 아니라 기존 설계 검토를 위해 아래에 유지합니다. SF32LB557VD3A6은 다른 BGA169 볼 맵을 사용하며, D11, E9, K12, L11, L13, M13이 NC입니다. 정확한 부품의 맵을 확인하십시오. 패키지 치수가 같다고 핀 호환이 되는 것은 아닙니다.

![그림 3.2-3: BGA169 SF32LB557V8N6 핀 배치](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-3: BGA169 SF32LB557V8N6 핀 배치</em></div>

![그림 3.2-4: BGA169 SF32LB557VD3A6 핀 배치](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-4: BGA169 SF32LB557VD3A6 핀 배치</em></div>

### 3.3. 주요 하드웨어 기능 { #33-major-hardware-features }

- QFN68L, BGA145, BGA169 패키지 옵션.
- 48 MHz와 32.768 kHz 듀얼 크리스털 설계 요구 사항.
- 저전력 Bluetooth 5.2 트랜시버, RF 매칭, 안테나 레이아웃 요구 사항.
- OPI PSRAM, QSPI NOR/NAND 플래시 및 PSRAM, SDIO eMMC 또는 Micro SD 인터페이스. 공동 패키징 메모리는 정확한 부품 번호에 따라 다릅니다.
- MIPI DSI, SPI/QSPI, MCU8080, JDI 디스플레이 옵션.
- 웨이크 버튼, 진동 모터, 웨이크 인터럽트, GPADC, 센서, 외부 Bluetooth 오디오 설계 지침.
- DBG-UART, SWD, 양산 플래싱, 크리스털 캘리브레이션 지원.

### 3.4. 대표 애플리케이션 { #34-typical-applications }

대표적인 대상 애플리케이션에는 웨어러블 밴드, 스마트 모바일 디바이스, 스마트 홈 제품, 기타 저전력 AIoT 설계가 있습니다.

## 4. 설계 한눈에 보기 { #4-design-at-a-glance }

### 4.1. 엔지니어링 요약 { #41-engineering-summary }

<div align="center"><em>표 4.1-1: SF32LB55x 설계 요약</em></div>

<div align="center" markdown>

| 주제 | 설계 중점 |
|:---|:---|
| 패키지 | 핀 계획과 PCB 스택업 전에 QFN68L 또는 BGA 패키지를 선택합니다. |
| 전원 | PMU 레일, 기타 전원 핀, 필요한 커패시터, POR/BOR/리셋, BUCK 모드를 검토합니다. |
| 클럭 | CL, ppm, ESR 요구 사항을 충족하는 48 MHz 및 32.768 kHz 크리스털을 사용합니다. |
| RF | 매칭 회로를 칩 가까이에 두고 깨끗한 50 ohm 안테나 경로를 유지합니다. |
| 메모리 | 휘발성 OPI/QSPI PSRAM은 QSPI 플래시 또는 SDIO eMMC/Micro SD의 부트 및 영구 스토리지와 분리하여 계획하며, 패키지와 부트 모드 지원을 확인합니다. |
| 디스플레이 | 핀 그룹과 레이아웃이 다르므로 MIPI DSI, SPI/QSPI, MCU8080, JDI를 일찍 선택합니다. |
| 양산 | DBG-UART, SWD, 부트 모드, 전원, RF/크리스털 캘리브레이션 접근을 확보해 둡니다. |

</div>

### 4.2. 하드웨어 설계 흐름 { #42-hardware-design-flow }

1. 패키지, 메모리 전략, 디스플레이 인터페이스, 저전력 목표를 확인합니다.
2. 전원 트리, PMU 레일, BUCK/LDO 동작, 리셋 회로를 정의합니다.
3. 크리스털, RF 매칭 토폴로지, 안테나 레이아웃 제약을 선택합니다.
4. 메모리, 디스플레이, 웨이크, 센서, 오디오, 디버그, 양산 테스트 핀을 할당합니다.
5. PCB 스택업, 팬아웃, 임피던스, ESD, RF, 고속 인터페이스 제약을 확정합니다.
6. 회로도 동결, 레이아웃 릴리스, EVT 전에 7절 체크리스트를 검토합니다.

### 4.3. 검토 증빙 패키지 { #43-review-evidence-pack }

EVT 전에 데이터시트/사용자 매뉴얼 버전, 패키지 도면, 회로도 PDF, PCB 스택업, 임피던스 보고서, DRC/ERC 보고서, 전원 트리, 부트 모드 표, RF 레이아웃 스크린샷, 크리스털 레이아웃 스크린샷, 메모리/디스플레이 라우팅 스크린샷, 양산 테스트 포인트 계획을 보관하십시오.

### 4.4. 체크리스트 사용 방법 { #using-the-checklists }

이 가이드는 두 단계의 체크리스트를 제공합니다. 7절의 짧은 체크리스트는 위험도가 가장 높은 항목을 담고 있어 빠른 엔지니어링 자체 점검에 사용합니다. [회로도 체크리스트](SF32LB55x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 가이드라인](SF32LB55x_pcb_layout.md)의 6.4절은 하드웨어 설계 자료와 함께 [SiFli의 위키][SiFli Chip Hardware Design Guide Index (Wiki)]에 게시된, 551/555/557 디바이스와 SS6600A8 변형(variant)을 아우르는 SiFli의 *SF32LB55x Schematic & PCB Checklist*(V1.0, 2026-01-21) 전체를 항목별로 재현합니다.

각 점검 항목에는 적용되는 변형 그룹과 필수(릴리스 전에 반드시 통과해야 함)인지 선택(해당 기능을 사용하는 경우 권장)인지가 표시됩니다. 색이 있는 텍스트와 <span class="flag-yellow">노란색 배경</span>이 있는 텍스트는 원본 워크북의 검토 강조를 그대로 유지한 것입니다. 워크북은 각 강조의 이유를 밝히지 않으므로, 이 표시는 같은 표의 강조되지 않은 항목을 대체하는 것이 아니라 추가 검토 플래그로 취급하십시오.

회로도 검토 중 PCB 레이아웃을 시작하기 전에 [회로도 체크리스트](SF32LB55x_schematic_checklist.md)를 수행하십시오. PCB 레이아웃 체크리스트(6.4절)는 Gerber 릴리스 전의 레이아웃 검토 중에 수행하십시오. 실무에서는 각 단계를 보통 두 번 수행합니다. 먼저 설계 엔지니어가, 이후 설계 동결 또는 양산 릴리스 전에 독립된 검토자가 수행합니다.

최상의 결과를 얻으려면 체크리스트를 읽는 목록이 아니라 승인 기록으로 취급하십시오.

1. 먼저 정확한 대상 부품 번호와 패키지를 확인합니다.
2. 검토 중에 표를 수동적으로 읽지 말고 모든 항목을 통과/실패/해당 없음으로 표시합니다.
3. 디스플레이, 스토리지, 웨이크업, 저전력 행을 해당하는 하드웨어 설계 가이드 절과 교차 확인합니다.
4. 패키지별 가정, 특히 BGA 대 QFN, DSI 대 SPI 디스플레이, QSPI2/QSPI3 스토리지 사용을 검토 노트에 기록합니다.

<div align="center"><em>표 4.4-1: 검토 기록 템플릿</em></div>

<div align="center" markdown>

| 필드 | 값 |
|:---|:---|
| 고객 이름 | |
| 고객 설계 이름 | |
| 검토 제출 날짜 | |
| 1차 검토자 | |
| 1차 검토 날짜 | |
| 후속 검토자 | |
| 후속 검토 날짜 | |

</div>

<div align="center"><em>표 4.4-2: 체크리스트 문서 버전 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 최초 릴리스 |

</div>

[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 설계 가이드 계속 보기 { #continue-the-design-guide }

전체 가이드는 아래 페이지에 걸쳐 이어집니다. 각 페이지는 설계 과정의 한 단계를 다루며 여기에서 이동할 수 있습니다.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[회로도 설계 가이드라인](SF32LB55x_schematic_design.md)__ — 전원 시스템, 부트 모드, 클럭 생성, RF, 스토리지 인터페이스, 디스플레이 및 터치 인터페이스, 웨이크/GPADC/양산 인터페이스
- :fontawesome-solid-list-check: __[회로도 체크리스트](SF32LB55x_schematic_checklist.md)__ — 항목별 회로도 검토 체크리스트(5.8절)
- :fontawesome-solid-microchip: __[PCB 레이아웃 가이드라인](SF32LB55x_pcb_layout.md)__ — 풋프린트, 스택업, 일반 PCB 규칙, 인터페이스 라우팅, 항목별 PCB 레이아웃 체크리스트
- :fontawesome-solid-book-open: __[설계 검토 체크리스트 및 참고 자료](SF32LB55x_review_and_reference.md)__ — 릴리스 체크리스트, 관련 문서, 부록, 개정 이력

</div>
