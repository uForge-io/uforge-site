---
icon: lucide/book-check
description: "SF32LB56x MCU의 하드웨어 설계 가이드: 전원 시스템, 클럭 생성, RF 설계, 디스플레이, 오디오, PCB 레이아웃 지침입니다."
tags:
    - 하드웨어
    - 칩
hide:
    - navigation
---

# SF32LB56x 하드웨어 설계 가이드 { #sf32lb56x-hardware-design-guide }

## 1. 소개 { #1-introduction }

이 하드웨어 설계 가이드는 그래픽에 최적화된 AIoT 마이크로컨트롤러 제품군인 SF32LB56x 기반 제품을 위한 권장 사항과 참고 자료를 제공합니다. 스마트워치, 커넥티드 HMI 시스템, 의료 및 헬스케어 디바이스, 산업용 핸드헬드, 휴대용 계측기, 고급 e-bike 또는 e-scooter 디스플레이를 개발하는 하드웨어 엔지니어, PCB 설계자, 제품 개발자를 대상으로 합니다.

이 가이드는 SF32LB56xU와 SF32LB56xV 설계 모두에 대해 패키지 선택, PMIC 및 프로세서 전원, 리셋, 부트 모드, 동작 모드, 크리스털, RF, 디스플레이, 스토리지, 오디오, 센서, UART/I2C/GPTIM 핀 계획, PCB 레이아웃, 검증, 양산 준비를 포함한 하드웨어 개발 전 과정을 다룹니다. 이 지침을 따르면 회로도와 레이아웃의 리스크를 줄이고, 저전력 동작을 보호하며, 설계 전반에서 U/V 변형(variant) 간의 차이를 계속 확인할 수 있습니다.

이 문서는 임베디드 하드웨어 설계, 회로도 작성, PCB 레이아웃에 대한 기본적인 이해를 전제로 합니다. SF32LB56xU 및 SF32LB56xV 하드웨어 애플리케이션 노트, 데이터시트, 사용자 매뉴얼, 레퍼런스 디자인, SiFli 승인 업체 목록을 보완하는 문서이며, 전기적 사양, 핀 멀티플렉싱, 패키지 치수, 부품 인증, 양산 한계에 대해서는 이들 문서가 계속 기준이 됩니다.

## 2. 개발 리소스 { #2-development-resources }

[SF32LB56xU Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SF32LB56xU Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[SF32LB56xV Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[SF32 Family Overview]: ../../sf32-products/family/SF32_family.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB56xU 하드웨어 애플리케이션 노트][SF32LB56xU Hardware Application Note]__
- :fontawesome-solid-file-lines: __[SF32LB56xV 하드웨어 애플리케이션 노트][SF32LB56xV Hardware Application Note]__
- :fontawesome-brands-github: __[SF32LB56xU 하드웨어 애플리케이션 소스][SF32LB56xU Hardware Application Source]__
- :fontawesome-brands-github: __[SF32LB56xV 하드웨어 애플리케이션 소스][SF32LB56xV Hardware Application Source]__
- :fontawesome-solid-file-excel: __[SiFli 승인 업체 목록 (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

## 3. 디바이스 개요 { #3-device-overview }

### 3.1. 아키텍처 { #31-architecture }

SF32LB56x는 BLE만 사용하는 센서 노드보다 디스플레이와 HMI 요구 수준이 높은 제품을 대상으로 합니다. 공식 U 및 V 하드웨어 애플리케이션 노트에서 다루는 주요 설계 주제는 PMIC 기반 전원 분배, 48 MHz 및 32.768 kHz 크리스털, RF 설계, 디스플레이 및 스토리지 인터페이스 선택, 오디오, PBR 핀, 센서, UART/I2C/GPTIM 핀 계획, 디버그와 플래싱, 양산 단계의 크리스털 캘리브레이션입니다.

### 3.2. 변형과 패키지 { #32-variants-and-packages }

<div align="center"><em>표 3.2-1: SF32LB56x 패키지 변형</em></div>

<div align="center" markdown>

| 변형 | 패키지 | 크기 | 핀 피치 | 볼 직경 |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| SF32LB56xV | WBBGA175 | 6.5x6.1x0.94 mm | 0.4 mm | 0.25 mm |

</div>

U 변형은 QFN68L 패키지를 사용합니다. V 변형은 WBBGA175 패키지를 사용하며, 팬아웃, 비아, HDI 공정을 더 신중하게 계획해야 합니다.

![그림 3.2-1: SF32LB56xU QFN68L 핀 배치](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-1: SF32LB56xU QFN68L 핀 배치</em></div>

![그림 3.2-2: SF32LB56xV WBBGA175 핀 배치](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.2-2: SF32LB56xV WBBGA175 핀 배치</em></div>

### 3.3. 주요 하드웨어 기능 { #33-major-hardware-features }

- SF30147C 예제를 사용한 PMIC 중심의 전원 분배.
- 48 MHz 및 32.768 kHz 크리스털 요구 사항과 권장 크리스털 모델.
- Bluetooth RF 설계와 안테나 매칭 요구 사항.
- U는 SPI/QSPI 및 JDI 디스플레이, V는 SPI/QSPI, MCU8080, DPI, JDI 디스플레이.
- SDIO/eMMC/SD NAND 방식 인터페이스를 포함한 외부 메모리 및 부트 스토리지 옵션.
- 버튼, 진동 모터, 오디오 인터페이스, PBR 핀, 센서, UART/I2C, GPTIM, 디버그/플래싱, 캘리브레이션.

### 3.4. 대표 애플리케이션 { #34-typical-applications }

![그림 3.4-1: SF32LB56xU 스마트워치 애플리케이션 블록 다이어그램](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.4-1: SF32LB56xU 스마트워치 애플리케이션 블록 다이어그램</em></div>

![그림 3.4-2: SF32LB56xV 스마트워치 애플리케이션 블록 다이어그램](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.4-2: SF32LB56xV 스마트워치 애플리케이션 블록 다이어그램</em></div>

SF32LB56x는 Bluetooth, 오디오, 센서, 외부 메모리, 풍부한 UI 기능이 필요한 스마트워치, 커넥티드 HMI 패널, 헬스케어 제품, 산업용 핸드헬드, 휴대용 계측기, 고급 디스플레이 제품에 적합합니다.

## 4. 설계 개요 { #4-design-at-a-glance }

### 4.1. 엔지니어링 요약 { #41-engineering-summary }

<div align="center"><em>표 4.1-1: SF32LB56x 설계 요약</em></div>

<div align="center" markdown>

| 주제 | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| 패키지 | QFN68L, 7x7x0.75 mm, 0.35 mm 피치 | WBBGA175, 6.5x6.1x0.94 mm, 0.4 mm 피치 |
| 디스플레이 | 문서에서 주로 안내하는 인터페이스는 SPI/QSPI와 JDI | 문서에서 안내하는 인터페이스는 SPI/QSPI, MCU8080, DPI, JDI |
| PCB 공정 | 소형 QFN 라우팅과 팬아웃 | BGA/HDI 계획, 블라인드/베리드 비아 검토, 더 엄격한 팬아웃 관리 |
| 전원 | 프로세서 레일과 SF30147C PMIC 분배 | 프로세서 레일과 SF30147C PMIC 분배, V 고유의 부하 할당 포함 |
| 스토리지 | SF32LB56xU의 문서화된 스토리지 핀을 사용하는 외부 메모리 설계 | SF32LB56xV의 문서화된 스토리지 핀을 사용하는 외부 메모리 설계 |

</div>

### 4.2. 하드웨어 설계 흐름 { #42-hardware-design-flow }

1. U 또는 V 변형, 패키지, 디스플레이 인터페이스, 스토리지 옵션, 목표 PCB 공정을 선택합니다.
2. PMIC 전원 분배, 프로세서 레일, 리셋, 충전, 저전력 제어를 정의합니다.
3. 크리스털, RF 매칭, 디스플레이, 스토리지, 오디오, 센서, 버튼, 모터, PBR 회로를 선택합니다.
4. 핀 할당을 확정하고 디스플레이, 스토리지, 오디오, 디버그, 웨이크, 양산 기능 간의 충돌을 확인합니다.
5. PCB 팬아웃, 스택업, 임피던스, RF, 클럭, USB/SDIO, 오디오, DC-DC, ESD를 검토합니다.
6. 회로도 동결, 레이아웃 릴리스, EVT, 양산 픽스처 릴리스 전에 설계 체크리스트를 실행합니다.

### 4.3. 검토 증빙 자료 { #43-review-evidence-pack }

EVT 전에 U/V 원본 문서 버전, 데이터시트/사용자 매뉴얼 버전, 회로도 PDF, PCB 스택업, PCB 공정 능력, DRC/ERC 보고서, PMIC 구성, 전원 트리, 부트/스토리지 구성, 디스플레이 라우팅 스크린샷, RF/크리스털 레이아웃 스크린샷, 오디오/아날로그 스크린샷, 양산 플래싱/캘리브레이션 계획을 보관하십시오.

### 4.4. 체크리스트 사용 방법 { #using-the-checklists }

이 가이드는 두 단계의 체크리스트를 포함합니다. 7절의 짧은 체크리스트는 리스크가 가장 큰 항목을 담아 빠르게 엔지니어링 자체 점검을 할 수 있게 합니다. [회로도 체크리스트](SF32LB56x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 가이드라인](SF32LB56x_pcb_layout.md)의 6.3절은 SiFli의 완전한 항목별 *SF32LB56x Schematic & PCB Checklist*(V1.0, 2026-01-21)를 재현합니다. 이 체크리스트는 [SiFli 위키][SiFli Chip Hardware Design Guide Index (Wiki)]에 하드웨어 설계 자료와 함께 게시되어 있으며, SF32LB56xU 제품군, SF32LB56xV 제품군, SS6700A 변형을 대상으로 합니다.

각 점검 항목에는 적용되는 칩 그룹과, 해당 항목이 필수(릴리스 전에 반드시 통과해야 함)인지 선택(해당 기능을 사용하는 경우 권장)인지가 표시되어 있습니다. 색상이 있는 텍스트와 <span class="flag-yellow">노란색 배경</span>이 있는 텍스트는 원본 워크북의 검토 강조를 그대로 보존한 것입니다. 워크북은 강조마다 이유를 밝히지 않으므로, 이 표시는 같은 표에서 강조되지 않은 어떤 항목도 대체하지 않는 추가 검토 플래그로 취급하십시오.

[회로도 체크리스트](SF32LB56x_schematic_checklist.md)는 PCB 레이아웃을 시작하기 전, 회로도 검토 중에 실행하십시오. PCB 레이아웃 체크리스트(6.3절)는 Gerber를 릴리스하기 전, 레이아웃 검토 중에 실행하십시오. 실무에서는 각 단계를 보통 두 번 수행합니다. 먼저 설계 엔지니어가 수행하고, 설계 동결 또는 제조 릴리스 전에 독립된 검토자가 다시 수행합니다.

체크리스트를 효과적으로 활용하려면 단순히 읽고 넘기는 목록이 아니라 설계 승인 기록으로 사용하십시오.

1. 먼저 대상 부품 번호와 패키지를 정확히 확인합니다.
2. 각 항목을 확인하면서 통과/실패/해당 없음으로 표시합니다.
3. 디스플레이, 스토리지, 웨이크업, 저전력 항목은 해당하는 하드웨어 설계 가이드 절과 교차 확인합니다.
4. 패키지별 가정, 특히 56xU와 56xV, QFN과 WBBGA, DSI와 SPI 디스플레이, SD2/MPI3 스토리지 사용 여부를 검토 노트에 기록합니다.

<div align="center"><em>표 4.4-1: 검토 기록 템플릿</em></div>

<div align="center" markdown>

| 필드 | 값 |
|:---|:---|
| 고객명 | |
| 고객 설계명 | |
| 검토 제출일 | |
| 1차 검토자 | |
| 1차 검토일 | |
| 후속 검토자 | |
| 후속 검토일 | |

</div>

<div align="center"><em>표 4.4-2: 체크리스트 문서 버전 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 초판 릴리스 |

</div>

[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 설계 가이드 이어서 보기 { #continue-the-design-guide }

전체 가이드는 아래 페이지로 이어집니다. 각 페이지는 설계 과정의 한 단계를 다루며, 여기에서 바로 이동할 수 있습니다.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[회로 설계 가이드라인](SF32LB56x_schematic_design.md)__ — 전원 시스템, 동작 모드와 웨이크 소스, 클럭 생성, RF, 디스플레이/터치/백라이트 인터페이스, 스토리지/센서/오디오/연결, 제조
- :fontawesome-solid-list-check: __[회로도 체크리스트](SF32LB56x_schematic_checklist.md)__ — 항목별 회로도 검토 체크리스트(5.8절)
- :fontawesome-solid-microchip: __[PCB 레이아웃 가이드라인](SF32LB56x_pcb_layout.md)__ — 풋프린트, 스택업, 핵심 라우팅, 항목별 PCB 레이아웃 체크리스트
- :fontawesome-solid-book-open: __[설계 검토 체크리스트 및 참고 자료](SF32LB56x_review_and_reference.md)__ — 릴리스 체크리스트, 관련 문서, 부록, 개정 이력

</div>
