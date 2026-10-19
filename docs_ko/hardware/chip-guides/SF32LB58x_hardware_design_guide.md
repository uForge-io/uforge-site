---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58x MCU의 하드웨어 설계 가이드: 전원 아키텍처, 클럭 및 RF 설계, 디스플레이, 스토리지, 오디오, PCB 레이아웃 가이드라인입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB58x 하드웨어 설계 가이드 { #sf32lb58x-hardware-design-guide }

## 1. 소개 { #1-introduction }

이 하드웨어 설계 가이드는 고성능 AIoT 마이크로컨트롤러 제품군인 SF32LB58x 기반 제품을 위한 권장 사항과 참고 자료를 제공합니다. 풍부한 사용자 인터페이스, 대용량 메모리, 듀얼 모드 Bluetooth, 오디오, 많은 GPIO 수, 저전력 Standby 요구 사항을 갖춘 배터리 전원 제품을 개발하는 하드웨어 엔지니어, PCB 설계자, 제품 개발자를 대상으로 합니다.

이 가이드는 PMIC 및 전원 분배, BGA256 팬아웃, HDI 스택업 계획, 클럭 회로, RF 설계, MIPI-DSI, USB2.0 High-Speed, SDIO/eMMC, 오디오 회로, PCB 레이아웃, 검증, 양산 준비에 이르는 하드웨어 개발 전 과정을 다룹니다. 이 지침을 따르면 고밀도 BGA/HDI 설계의 위험을 줄이고, 고속 인터페이스의 신호 무결성을 보호하며, 제품이 SF32LB58x의 전원, 패키지, 양산 요구 사항에 부합하도록 유지할 수 있습니다.

이 문서는 임베디드 하드웨어 설계, 회로도 작성, 고밀도 PCB 레이아웃에 대한 기본적인 이해를 전제로 합니다. SF32LB58x 데이터시트, 사용자 매뉴얼, 공식 하드웨어 애플리케이션 노트, 레퍼런스 디자인 패키지, SiFli 승인 업체 목록을 보완하는 문서이며, 전기적 사양, 핀 멀티플렉싱, 패키지 치수, 부품 인증, 양산 한계에 대해서는 이들 문서가 계속 기준이 됩니다.

## 2. 개발 리소스 { #2-development-resources }

[SF32LB58x Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32LB58x 회로도 및 PCB 체크리스트 엑셀 파일]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli 승인 업체 목록(AVL)]: ../cad-components/sifli-approved-vendor-list.md
[샘플 구매]: https://sifli.taobao.com/
[개발 키트 구매]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SF32LB58x 회로도 및 PCB 체크리스트 엑셀 파일]__
- :fontawesome-solid-file-excel: __[SiFli 승인 업체 목록(AVL)]__
- :fontawesome-solid-cart-shopping: __[샘플 구매]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매]__

</div>

## 3. 디바이스 개요 { #3-device-overview }

### 3.1. 아키텍처 { #31-architecture }

<div align="center"><em>표 3.1-1: 주요 하드웨어 기능 요약</em></div>

<div align="center" markdown>

| 기능 | 설명 |
|:---|:---|
| 코어 아키텍처 | 이기종 3코어 아키텍처: 최대 240 MHz의 애플리케이션용 Arm Cortex-M33 STAR-MC1 코어 2개와 최대 96 MHz의 저전력 Arm Cortex-M33 STAR-MC1 코어 1개 |
| Bluetooth | 통합 저전력 듀얼 모드 Bluetooth 5.3 트랜시버 |
| 그래픽 | ePicasso 2.0 2D/2.5D 그래픽 가속 및 Vivante GCNanoUltraV 벡터 그래픽 |
| 디스플레이 인터페이스 | MIPI-DSI, SPI/QSPI, MCU8080, DPI, 병렬/직렬 JDI |
| 스토리지 | 모델에 따라 코패키지된 NOR 플래시/PSRAM, MPI3 또는 MPI4를 통한 외부 NOR/SPI NAND 플래시, SD1 및 SD2 SDIO 인터페이스 |
| 오디오 | I2S 3개, PDM 2개, 차동 아날로그 오디오 입력/출력, 외부 아날로그 오디오 PA 및 I2S 오디오 PA 지원 |
| 웨이크 인터럽트 | 모든 GPIO가 Light/Deep Sleep에서 칩을 깨울 수 있으며, Standby/Hibernate는 웨이크업 인터럽트 소스 16개(PA 6개, PB 10개)를 지원 |
| PBR 인터페이스 | 6개 핀: PBR0은 파워업 시 0에서 1로 상승하며 선택된 외부 LSW를 제어할 수 있고, PBR1-PBR5는 기본적으로 low입니다. PBR0-PBR5는 LPTIM 또는 32 kHz를 출력할 수 있으며 Standby/Hibernate에서도 출력으로 계속 사용할 수 있습니다. PBR0-PBR3은 웨이크 입력으로 사용할 수 있지만 MCU가 동작 중일 때는 인터럽트를 발생시키지 않습니다. |

</div>

### 3.2. 변형(Variants) { #32-variants }

회로도를 동결하기 전에 최신 데이터시트와 AVL을 기준으로 SF32LB58x의 정확한 주문 코드와 코패키지 메모리 조합을 확인하십시오. 이 제품군은 BGA256 패키지, HDI 전용 플랫폼으로 간주하십시오. SiP 메모리는 모델마다 다릅니다. 이 제품군은 MPI3 또는 MPI4를 통한 외부 NOR 또는 SPI NAND 플래시를 지원합니다. SiFli EVB에서는 외부 SPI NAND에 MPI4가 기본 인터페이스이며, SD1은 eMMC 또는 SD NAND에, SD2는 SD 카드 또는 Wi-Fi 디바이스에 사용됩니다. 설계를 확정하기 전에 선택한 부품의 핀 할당과 대상 보드의 배선을 확인하십시오.

### 3.3. 패키지 { #33-packages }
<div align="center"><em>표 3.3-1: 패키지</em></div>

<div align="center" markdown>

| 패키지 이름 | 치수 | 핀 피치 |
|:---|:---|:---|
| BGA256 | 8.5 mm x 6.5 mm x 0.94 mm | 0.4 mm |

</div>

### 3.4. 주요 하드웨어 기능 { #34-major-hardware-features }

- 0.4 mm 피치의 BGA256 패키지, 조밀한 전원/GPIO 팬아웃.
- HDI PCB 공정이 필수이며, PTH와는 호환되지 않는 설계입니다.
- BUCK 출력 2개와 내부 LDO 출력 3개를 갖춘 통합 PMU.
- 워치급 시스템 전원 분배를 위한 선택 사항인 시스템 PMIC SF30147C.
- MIPI-DSI, USB2.0 HS, SDIO/eMMC, RF, 오디오, 조밀한 BGA 팬아웃은 스택업과 임피던스를 조기에 확인해야 합니다.

### 3.5. 대표 애플리케이션 { #35-typical-applications }

SF32LB58x는 고급 그래픽, 대용량 메모리, 멀티미디어, 엣지 AI 워크로드를 결합한 연결형 제품에 적합합니다. 예는 다음과 같습니다.

- 스마트워치, 스포츠 워치, 아웃도어 웨어러블
- 고급 사이클링 컴퓨터와 차량 장착형 대시보드
- 스마트 디스플레이와 연결형 대시보드
- AI 지원 웨어러블 디바이스
- 엣지 AI 및 센서 퓨전 시스템
- 고해상도 LVGL 기반 HMI 디바이스
- 휴대용 의료 및 산업용 단말
- 외부 SDIO Wi-Fi 디바이스를 사용하는 Bluetooth + Wi-Fi 액세서리

## 4. 설계 한눈에 보기 { #4-design-at-a-glance }

### 4.1. 하드웨어 아키텍처 { #41-hardware-architecture }
<div align="center"><em>표 4.1-1: 빠른 설계 요약</em></div>

<div align="center" markdown>

| 설계 항목 | 일반적인 구현 |
|:---|:---|
| 패키지 | BGA256, 8.5 mm x 6.5 mm x 0.94 mm, 0.4 mm 피치 |
| PCB | HDI 보드 전용 — PTH와 호환되지 않음, 6HDI-2 스택업 권장 |
| 전원 공급 | 통합 PMU(BUCK 2개 + LDO 3개), 시스템 전체 전원용으로 SiFli의 PMIC SF30147C와 함께 사용할 수 있음 |
| BUCK 인덕터 | 4.7 uH, DCR ≤ 0.4 Ω, Isat ≥ 500 mA |
| 클럭 | 48 MHz 메인 크리스털 + 32.768 kHz RTC 크리스털 |
| RF | 50 Ω 임피던스 제어 트레이스, π 매칭 회로 예약 |
| 디스플레이 | MIPI-DSI(2레인), 3/4선 SPI, Quad-SPI, MCU8080, DPI, 병렬/직렬 JDI, LCDC1(PA) / LCDC2(PB) 이중 핀 매핑 |
| 스토리지 | MPI3 또는 MPI4를 통한 외부 NOR 또는 SPI NAND 플래시. SiFli EVB는 외부 SPI NAND에 MPI4, eMMC 또는 SD NAND에 SD1, SD 카드 또는 Wi-Fi 디바이스에 SD2를 사용 |
| 오디오 | I2S 3개(마스터 전용), PDM 2개, 차동 아날로그 오디오 입력/출력 |
| 디버그 | SWD 1개 + 선택 가능한 UART 디버그 출력 6개 |
| USB | USB2.0 HS, Host/Device 모드 |

</div>

### 4.2. 하드웨어 설계 흐름 { #42-hardware-design-flow }

<div align="center"><em>표 4.2-1: 하드웨어 설계 흐름</em></div>

<div align="center" markdown>

| 단계 | 설계 결정 | 주요 절 |
|:---|:---|:---|
| 1 | 주문 코드, SiP 메모리 구성, BGA256 패키지 가정을 확인 | 디바이스 개요, 패키지 |
| 2 | 레이아웃을 시작하기 전에 HDI 스택업, 비아 구조, 임피던스 규칙, 조립 능력을 동결 | PCB 레이아웃 가이드라인 |
| 3 | 선택 사항인 SF30147C 시스템 PMIC가 필요한지 결정하고, 칩 PMU 레일, BUCK 인덕터, LDO 커패시터, 리셋, 파워 시퀀싱을 정의 | 전원 시스템 |
| 4 | 부트 스토리지, 디스플레이 인터페이스, USB 역할, SDIO/eMMC 사용, 오디오 토폴로지, 디버그 접근 수단을 선택 | 스토리지 및 연결, 사용자 인터페이스, 제조 |
| 5 | 클럭, RF, DSI, USB2.0 HS, SDIO/eMMC, 오디오, DC/DC, BGA 팬아웃, ESD 배선 스크린샷을 검토 | 클럭 생성, RF, PCB 레이아웃 가이드라인 |
| 6 | 시제품 릴리스 전에 회로도, 스택업, DRC, 임피던스, AVL, 제조, 집중 레이아웃 증빙을 보관 | 설계 검토 체크리스트 |

</div>

### 4.3. 이 가이드의 사용 방법 { #43-how-to-use-this-guide }

이 가이드는 보드 검토 순서에 따라 사용하십시오. 먼저 패키지와 SiP 메모리 구성을 확인하고, HDI 스택업과 PMIC 전략을 확정한 다음, 부트 스토리지와 디스플레이 배선을 검토하고, 이어서 클럭, RF, USB, 오디오, 디버그, 양산 테스트 접근 수단을 검증하십시오. 5절은 회로도 설계 기준, 6절은 PCB 구현 기준, 7절은 릴리스 체크리스트입니다.

### 4.4. 검토 증빙 패키지 { #44-review-evidence-pack }

시제품 릴리스 전에 회로도 PDF, PCB 스택업, 비아/공정 능력 확인서, 임피던스 보고서, DRC 보고서, AVL 교차 검증 결과, 그리고 PMIC, BUCK 인덕터, DSI, USB, SDIO/eMMC, RF, 크리스털, 오디오, BGA 팬아웃, 그라운드 리턴, ESD 유입 지점에 대한 집중 레이아웃 스크린샷을 보관하십시오.

### 4.5. 체크리스트 사용 방법 { #using-the-checklists }

이 가이드에는 두 수준의 체크리스트가 있습니다. 5.2.1.7절과 5.7.3절에 포함된 간단한 체크리스트는 위험도가 높은 항목을 빠르게 자체 점검하는 데 사용합니다. [회로도 체크리스트](SF32LB58x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)(6.18절)는 SiFli의 전체 항목별 *SF32LB58x Schematic & PCB Checklist*(V1.0, 2026-01-21)를 그대로 재현합니다.

각 점검 항목은 필수(릴리스 전에 반드시 통과) 또는 선택(해당 기능을 사용하는 경우 권장)입니다. 색상으로 표시된 텍스트와 <span class="flag-yellow">노란색 배경</span>으로 표시된 텍스트는 원본 워크북의 검토 강조 표시를 보존한 것입니다. 워크북은 각 강조 표시의 이유를 밝히지 않으므로, 이 표시는 추가 검토 플래그로 취급하고 같은 표의 강조되지 않은 항목을 대체하는 것으로 보지 마십시오.

원본 체크리스트 워크북은 non-AVL BUCK 인덕터에 Isat ≥ 450 mA를 규정하지만, 공식 하드웨어 애플리케이션 노트는 L = 4.7 µH, DCR ≤ 0.4 Ω에 Isat ≥ 500 mA를 규정합니다. 체크리스트는 워크북의 값을 유지합니다. SiFli가 이 불일치를 명확히 하기 전까지는, non-AVL 부품을 선택할 때 Isat 500 mA 이상으로 정격된 인덕터를 사용하십시오.

회로도 검토 단계에서, PCB 레이아웃을 시작하기 전에 [회로도 체크리스트](SF32LB58x_schematic_checklist.md)를 수행하십시오. 레이아웃 검토 단계에서, Gerber를 릴리스하기 전에 [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)를 수행하십시오. 실제로는 각 단계를 보통 두 번 수행합니다. 먼저 설계 엔지니어가 수행하고, 설계 동결 또는 제조 릴리스 전에 독립 검토자가 수행합니다.

최상의 결과를 얻으려면 체크리스트를 읽는 목록이 아니라 서명 확인(sign-off) 기록으로 취급하십시오.

1. 먼저 대상 부품 번호와 코패키지 메모리 구성을 정확히 확인합니다.
2. 표를 수동적으로 읽지 말고, 검토 중에 모든 항목을 통과 / 실패 / 해당 없음으로 표시합니다.
3. 디스플레이, 스토리지, 웨이크업, 저전력 항목은 하드웨어 설계 가이드의 해당 절과 교차 검증합니다.
4. 릴리스 전에 검토 노트에 미해결 가정을 기록합니다.

<div align="center"><em>표 4.5-1: 검토 기록 템플릿</em></div>

<div align="center" markdown>

| 필드 | 값 |
|:---|:---|
| 고객 이름 | |
| 고객 설계 이름 | |
| 검토 제출일 | |
| 1차 검토자 | |
| 1차 검토일 | |
| 후속 검토자 | |
| 후속 검토일 | |

</div>

<div align="center"><em>표 4.5-2: 체크리스트 문서 버전 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 최초 릴리스 |

</div>

## 설계 가이드 이어서 보기 { #continue-the-design-guide }

전체 가이드는 아래 페이지에 걸쳐 이어집니다. 각 페이지는 설계 과정의 한 단계를 다루며 여기에서 이동할 수 있습니다.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[회로 설계 가이드라인](SF32LB58x_schematic_design.md)__ — 전원 시스템, 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결, 제조
- :fontawesome-solid-list-check: __[회로도 체크리스트](SF32LB58x_schematic_checklist.md)__ — 항목별 회로도 검토 체크리스트(5.8절)
- :fontawesome-solid-microchip: __[PCB 레이아웃 가이드라인](SF32LB58x_pcb_layout.md)__ — 패키지 풋프린트, 스택업, 팬아웃, 클럭, RF, 오디오, USB, SDIO, DSI, 전원 배선 지침
- :fontawesome-solid-list-check: __[PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)__ — 항목별 PCB 레이아웃 검토 체크리스트(6.18절)
- :fontawesome-solid-book-open: __[설계 검토 체크리스트 및 참고 자료](SF32LB58x_review_and_reference.md)__ — 릴리스 체크리스트, 관련 문서, 부록, 개정 이력

</div>
