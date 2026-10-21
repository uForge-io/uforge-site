---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB57x MCU 하드웨어 설계 가이드: 최소 시스템 설계, 전원, 클럭, RF, 디스플레이, 카메라, 스토리지, PCB 레이아웃 지침."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x 하드웨어 설계 가이드 { #sf32lb57x-hardware-design-guide }

## 1. 소개 { #1-introduction }

이 하드웨어 설계 가이드는 고집적 AIoT 마이크로컨트롤러 제품군인 SF32LB57x 기반 제품을 위한 권장 사항과 참고 자료를 제공합니다. 웨어러블, 휴대용 스마트 디바이스, 스마트 홈, 저전력 연결형 제품을 개발하는 하드웨어 엔지니어, PCB 설계자, 제품 개발자를 대상으로 합니다.

이 가이드는 전원 공급 아키텍처, 클럭 회로, RF 설계, 디스플레이 및 카메라 인터페이스, 스토리지 및 부트 구성, 오디오 회로, PCB 레이아웃, 검증, 양산 준비를 포함한 전체 하드웨어 개발 과정을 다룹니다. 이 지침을 따르면 회로도와 레이아웃의 위험을 줄이고, 저전력 동작을 유지하며, 설계를 SF32LB57x의 패키지, 전원, 인터페이스 요구 사항에 맞게 유지하는 데 도움이 됩니다.

이 문서는 임베디드 하드웨어 설계와 회로도 작성에 대한 기본 지식을 전제로 합니다. SF32LB57x 데이터시트, 사용자 매뉴얼, 공식 하드웨어 애플리케이션 노트, 레퍼런스 디자인 파일, SiFli 승인 업체 목록(AVL)을 보완하는 문서입니다. 기준이 되는 전기적 사양, 핀 멀티플렉싱, 패키지 치수, 부품 인증, 양산 한계는 해당 공식 자료를 사용하십시오.

## 2. 개발 리소스 { #2-development-resources }

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SF32 승인 업체 목록]: ../cad-components/sifli-approved-vendor-list.md
[샘플 구매]: https://sifli.taobao.com/
[개발 키트 구매]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SF32 승인 업체 목록]__
- :fontawesome-solid-cart-shopping: __[샘플 구매]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매]__

</div>

## 3. 디바이스 개요 { #3-device-overview }

### 3.1. 기능 { #31-features }

SF32LB57x에서 사용할 수 있는 대표 리소스는 다음과 같습니다.

- 최대 58개의 GPIO<!-- BGA-ONLY -->. 일부 BGA112 변형(variant)은 MPI3에 사용하거나 풀업/풀다운을 통해 GP 정적 출력으로 구성할 수 있는 I/O를 6개 더 제공합니다. 패키지 항목을 참조하십시오<!-- /BGA-ONLY -->.
- UART 3개, I2C 4개, SPI 2개, CAN 2개.
- GPTIM 2개(각 4채널), LPTIM 2개, ATIM 2개(각 차동 3채널 또는 싱글 엔디드 4채널), PWM 1개(5채널), PTM 1개(16채널).
- RTC 클럭 출력 4개, 슬립 상태에서 동작하는 저주파 클럭 출력 4개(최대 16 kHz).
- SDIO 2개와 MPI 스토리지 인터페이스 3개.
- I2S 2개와 PDM 오디오 인터페이스 2개, 차동 아날로그 오디오 출력 1개와 차동 아날로그 오디오 입력 2개.
- USB 2.0 FS 1개.
- GPADC 1개(12채널).
- LCDC 디스플레이 컨트롤러 1개(24비트 DPI, 8/16비트 8080, QSPI, 8/16비트 EPD, 직렬/병렬 JDI).
- DCMI 카메라 인터페이스 1개(최대 16비트 DVP, 2데이터선 SPI, 4데이터선 QSPI).
- 하드웨어 웨이크업 소스 10개.
- DBG-UART 및 SWD 디버그, DBG-UART, SWD, UART, USB 플래싱.

!!! note "디스플레이 인터페이스 범위"
    하드웨어 애플리케이션 노트는 SF32LB57x LCDC 인터페이스 요약에 SPI/QSPI, 24비트 DPI, 16비트 8080, 16비트 EPD, 직렬/병렬 JDI를 나열합니다. MIPI-DSI는 일부 디스플레이 드라이버 IC의 호환 목록에 나타날 뿐, 해당 LCDC 직접 인터페이스 요약에는 없습니다. 패널 드라이버 목록을 칩이 네이티브 MIPI-DSI 호스트 인터페이스를 갖추고 있다는 확인으로 간주해서는 안 됩니다. 설계를 선택하기 전에 정확한 디스플레이 컨트롤러 경로를 SiFli에 확인하십시오.

### 3.2. 변형 { #32-variants }

SF32LB57x에는 두 가지 전원 공급 제품군이 있습니다.

<div align="center"><em>표 3.2-1: 파트 넘버와 전원 변형 개요</em></div>

<div align="center" markdown>

| 제품군 | 대표 파트 넘버 | 설계상 의미 |
|:-------|:---------------------|:---------------|
| 배터리 전원 변형 | 570 / 573 / 575 / 576 / 577 / 578 / 579 | 리튬 이온 배터리 제품용입니다. 설계에는 일반적으로 VBAT, VCC, VBUS와 내부 또는 외부 충전이 포함됩니다. |
| 3.3 V 전원 변형 | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | 외부에서 레귤레이션되는 3.3 V 시스템용입니다. PVDD, AVDD, VDDIO 및 관련 레일은 외부에서 공급합니다. |

</div>

!!! warning
    두 전원 제품군은 전원 연결, 전원 인가 동작, 일부 패키지 정의가 다릅니다. 다른 설계를 재사용하기 전에 정확한 주문 가능 파트 넘버를 확인하십시오.

### 3.3. 패키지 { #33-packages }

일반적인 패키지 옵션은 QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY -->입니다. SF32LB57x 패키지 데이터에는 패키지마다 두께 변형이 두 가지씩 있으며, 배터리 전원 제품군과 3.3 V 전원 제품군은 서로 다른 핀 배치도를 사용합니다. 항상 정확한 주문 가능 파트 넘버에 맞는 핀 배치, POD, 랜드 패턴, 스텐실 도면을 선택하십시오.

<div align="center"><em>표 3.3-1: 패키지 옵션과 설계 초점</em></div>

<div align="center" markdown>

| 패키지 | 일반 크기 | 피치 | 설계 초점 |
|:--------|:-------------|:------|:-------------|
| QFN68L | 7 mm x 7 mm | 0.35 mm | 소형 설계에 적합합니다. 노출 패드의 그라운드 연결, 스텐실 개구부, 최상층 팬아웃 가능 여부를 검토하십시오. |
| QFN80L | 8 mm x 8 mm | 0.35 mm | I/O 리소스가 더 많습니다. 전원 도메인 차이와 디스플레이/스토리지 핀 그룹을 검토하십시오. |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.4 mm | 실장 면적은 작지만 팬아웃은 더 어렵습니다. PCB 공정 능력을 초기에 확인하십시오. |
<!-- /BGA-ONLY -->

</div>

QFN68L과 QFN80L은 주문 가능 파트에 지정된 GPIO 수만 제공하며, 추가 MPI3 또는 정적 출력 I/O는 없습니다.

<!-- BGA-ONLY -->
!!! note "BGA112 GPIO 가용성"
    BGA112에만 해당합니다. SF32LB57x에는 MPI1, MPI2, MPI3가 통합되어 있습니다. 내부 코패키지 메모리의 위치는 [SF32 부품 번호 명명 규칙](../../sf32-products/family/SF32_namingrule.md)을 참조하십시오. 다음 세 가지 코패키지 메모리 구성에서는 모두 MPI2 및 MPI3 핀을 패키지 외부에서 사용할 수 없으므로, 고정 GPIO 58개만 사용할 수 있습니다. (1) MPI1과 MPI2에 PSRAM을 각각 1개씩 합패키징한 구성, (2) MPI2에 256 Mb PSRAM 1개를 합패키징한 구성, (3) MPI3에 NOR Flash를 합패키징한 구성입니다. `SF32LB57GVD776`은 (3)에 해당합니다. 두 번째 `7`은 내부 부품이 MPI3를 사용한다는 뜻이므로, GPIO는 58개만 사용할 수 있습니다. 이 세 가지 구성에 해당하지 않으면 MPI3와 연결된 BGA112 I/O 6개를 MPI3에 사용하거나, 풀업 또는 풀다운으로 설정해 GP 정적 출력으로 사용할 수 있습니다. 이 핀들은 일반 GPIO처럼 자유롭게 설정할 수 없습니다. 따라서 `SF32LB57ZVN7N6`의 `58 + 6`은 GPIO 58개와 MPI3 또는 정적 출력으로 사용할 수 있는 I/O 6개를 뜻하며, 자유롭게 설정할 수 있는 GPIO가 64개라는 뜻은 아닙니다.
<!-- /BGA-ONLY -->

<div align="center"><em>표 3.3-2: 패키지 치수</em></div>

<div align="center" markdown>

| 패키지 | 본체 크기 | 칩 두께 | 피치 |
|:--------|:----------|:---------------|:------|
| QFN68L | 7 mm x 7 mm | 0.9 mm | 0.35 mm |
| QFN68L | 7 mm x 7 mm | 1.1 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 0.9 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 1.1 mm | 0.35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.98 mm | 0.4 mm |
| BGA112 | 5.4 mm x 4.4 mm | 1.03 mm | 0.4 mm |
<!-- /BGA-ONLY -->

</div>

권장 검토 항목은 다음과 같습니다.

- 핀 번호가 데이터시트 핀 배치와 일치합니다.
- 전원, 그라운드, RF, 크리스털, USB, 디스플레이, 부트, 디버그 핀이 잘못 배치되지 않았습니다.
- QFN 노출 패드 그라운딩과 열 비아가 조립 규칙을 따릅니다.
<!-- BGA-ONLY -->
- BGA 팬아웃, 블라인드/매립 비아, 솔더 마스크, 스텐실 개구부, 조립 능력을 PCB 벤더와 확인했습니다.
<!-- /BGA-ONLY -->

![그림 3.3-1: SF32LB57x 파트 넘버 규칙](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-1: SF32LB57x 파트 넘버 규칙</em></div>

![그림 3.3-2: QFN68L 배터리 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-2: QFN68L 배터리 전원 변형 핀 배치</em></div>

![그림 3.3-3: QFN68L 3.3 V 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-3: QFN68L 3.3 V 전원 변형 핀 배치</em></div>

![그림 3.3-4: QFN80L 배터리 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-4: QFN80L 배터리 전원 변형 핀 배치</em></div>

![그림 3.3-5: QFN80L 3.3 V 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-5: QFN80L 3.3 V 전원 변형 핀 배치</em></div>

<!-- BGA-ONLY -->
![그림 3.3-6: BGA112 배터리 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-6: BGA112 배터리 전원 변형 핀 배치</em></div>

![그림 3.3-7: BGA112 3.3 V 전원 변형 핀 배치](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-7: BGA112 3.3 V 전원 변형 핀 배치</em></div>
<!-- /BGA-ONLY -->

### 3.4. 주요 하드웨어 기능 { #34-major-hardware-features }

- 실용적인 두 가지 전원 제품군: 배터리 전원 변형과 외부에서 레귤레이션되는 3.3 V 변형.
- QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY --> 패키지. 각 패키지마다 고유한 핀 배치, 랜드 패턴, 스텐실, PCB 공정 요구 사항이 있습니다.
- 정확한 디바이스와 핀 배치에 따라 SPI/QSPI, 8080, RGB/DPI, EPD, JDI 디스플레이를 지원합니다. 3.1절의 MIPI-DSI 범위 안내를 참조하십시오.
- 패키지 내장 메모리와 외부 MPI/SDIO 스토리지를 통한 스토리지 및 부트 옵션.
- RF, 크리스털, 오디오, 카메라, 디스플레이, USB, SDIO, 전원 레이아웃은 회로도와 PCB를 초기에 함께 검토해야 합니다.

### 3.5. 대표 애플리케이션 { #35-typical-applications }

SF32LB57x는 소형 폼팩터에서 Bluetooth 연결과 함께 AI, 카메라, 고급 디스플레이 기능이 필요한 제품에 적합합니다.

- 스마트워치, 스포츠 워치 및 기타 웨어러블 디바이스
- 휴대용 스마트 단말기 및 스마트 홈 컨트롤
- AI 지원 센서 및 엣지 추론 디바이스
- 카메라를 갖춘 Bluetooth 제품
- 선택한 디바이스와 디스플레이 컨트롤러 토폴로지에서 지원하는 SPI/QSPI, RGB/DPI, 8080, EPD, JDI 인터페이스를 사용하는 고급 디스플레이 디바이스
- 풍부한 GPIO 및 스토리지 옵션과 함께 소형 QFN<!-- BGA-ONLY --> 또는 BGA<!-- /BGA-ONLY --> 패키지가 필요한 제품

## 4. 설계 한눈에 보기 { #4-design-at-a-glance }

### 4.1. 하드웨어 아키텍처 { #41-hardware-architecture }

<div align="center"><em>표 4.1-1: 설계 한눈에 보기</em></div>

<div align="center" markdown>

| 설계 항목 | 일반적인 구현 |
|:---|:---|
| 전원 제품군 | 배터리 전원 변형 또는 외부에서 레귤레이션되는 3.3 V 변형. 전원 회로도를 혼용하지 마십시오 |
| 패키지 | QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY -->. 정확한 주문 가능 파트 넘버로 핀 배치, POD, 랜드 패턴, 스텐실을 선택하십시오 |
| PCB 공정 | QFN 패드, 노출 패드 비아, 스텐실 요구 사항을 PCB/조립 벤더와 확인하십시오<!-- BGA-ONLY -->. BGA는 팬아웃과 공정 능력도 조기에 확인해야 합니다<!-- /BGA-ONLY --> |
| 클럭 | 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털 |
| RF | 50 Ω 안테나 경로, 칩 근처의 π 매칭 회로, 로컬 RF 전원 필터링 |
| 디스플레이 | 디바이스 기능과 핀 배치에 따라 SPI/QSPI, 8080, RGB/DPI, EPD, JDI. 3.1절의 MIPI-DSI 범위 안내를 참조하십시오 |
| 스토리지 | 패키지 내장 메모리와 외부 MPI/SDIO 스토리지 옵션. 레이아웃 전에 부트 미디어를 확정해야 합니다 |
| 오디오 | 아날로그 오디오 입출력, PDM/I2S, 마이크 바이어스, 오디오 레퍼런스, 외부 PA 옵션 |
| 카메라 | DCMI 카메라 인터페이스. 노이즈에 민감한 고속 인터페이스로 취급해 라우팅하고 전원을 공급하십시오 |
| 디버그 및 양산 | DBG-UART, SWD, 부트 구성, PA00/PA01/PA34, 전원 레일, 양산 테스트 포인트 |

</div>

### 4.2. 하드웨어 설계 흐름 { #42-hardware-design-flow }

<div align="center"><em>표 4.2-1: 하드웨어 설계 흐름</em></div>

<div align="center" markdown>

| 단계 | 설계 결정 | 주요 절 |
|:---|:---|:---|
| 1 | 정확한 주문 가능 파트 넘버, 전원 제품군, 패키지, 핀 배치 확인 | 디바이스 개요 |
| 2 | 부트 스토리지, 디스플레이 인터페이스, 카메라 사용 여부, 디버그 접근, 저전력 목표 확정 | 설계 한눈에 보기, 회로 설계 |
| 3 | 전원 트리, 충전/OVP 전략, BUCK/LDO 부품, 전원 인가 동작 정의 | 전원 시스템 |
| 4 | 클럭 소스, RF 토폴로지, 스토리지, 디스플레이, 오디오, 카메라, 범용 인터페이스 선택 | 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결 |
| 5 | 패키지 풋프린트, 스택업, 팬아웃, RF, 크리스털, USB, SDIO, 디스플레이, 오디오, 전원 레이아웃 검토 | PCB 레이아웃 가이드라인 |
| 6 | 고객 자체 점검을 완료하고, EVT 전에 회로도, 레이아웃, AVL, DRC/ERC, 임피던스, 전원, RF, 양산 관련 증빙 자료를 보관 | 고객 설계 자체 점검 |

</div>

### 4.3. 이 가이드 사용 방법 { #43-how-to-use-this-guide }

이 가이드는 보드 검토 순서대로 사용하십시오. 먼저 정확한 SF32LB57x 주문 가능 파트 넘버와 전원 제품군을 확인하고, 패키지와 PCB 공정을 확정한 다음, 5.1절의 해당 최소 시스템 회로도와 함께 데이터시트를 검토하십시오. 이어서 전원 트리, 부트 미디어, 필요한 디버그/플래싱 접근을 정의하고, 제품 요구 사항에 따라 핀 먹스 표에서 IO 기능을 할당하십시오. 최소 시스템 경로를 확정한 뒤에는 클럭, RF, 디스플레이, 스토리지, 오디오, 카메라, 범용 인터페이스, PCB 레이아웃, 양산 접근을 검토하십시오. 5절은 회로도 기준 구성, 6절은 PCB 구현 기준 구성, 7절은 회로도 또는 레이아웃 릴리스 전의 고객 자체 점검입니다.

### 4.4. 검토 증빙 자료 모음 { #44-review-evidence-pack }

EVT 전에 데이터시트, 사용자 매뉴얼, 레퍼런스 디자인의 버전, 회로도 PDF, PCB 스택업, 임피던스 보고서, DRC/ERC 보고서, 전원 트리, 저전력 예산, 충전 경로, 부트 경로, 양산 테스트 포인트 목록과 함께, RF, 크리스털, USB, SDIO, 디스플레이, 카메라, 오디오, GPADC, 패키지 팬아웃의 주요 부분 스크린샷을 보관하십시오.

## 설계 가이드 이어보기 { #continue-the-design-guide }

전체 가이드는 아래 페이지로 이어집니다. 각 페이지는 설계 과정의 한 단계를 다루며, 여기에서 바로 이동할 수 있습니다.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[최소 시스템 및 전원](SF32LB57x_schematic_system_power.md)__ — 패키지/전원 제품군 일치, 부트 스트랩, 부트 미디어, 디버그/플래싱 접근, 전원 트리, 충전/OVP, BUCK, 저전력 레일, 동작 모드
- :fontawesome-solid-wave-square: __[클럭, RF 및 사용자 인터페이스](SF32LB57x_schematic_clock_rf_interfaces.md)__ — 48 MHz 및 32.768 kHz 크리스털, RF 매칭과 안테나 경로, 디스플레이, 터치/백라이트, 오디오, 카메라, 버튼, 모터
- :fontawesome-solid-database: __[스토리지 및 양산](SF32LB57x_schematic_storage_mfg.md)__ — 스토리지, 부트, GPIO, IO MUX 및 매트릭스 핀먹스 표, UART/I2C/SPI/SDIO/USB/CAN/GPADC, 양산 프로그래밍, 캘리브레이션, 픽스처 접근
- :fontawesome-solid-list-check: __[회로도 체크리스트](SF32LB57x_schematic_checklist.md)__ — 항목별 회로도 검토 체크리스트(5.8절)
- :fontawesome-solid-microchip: __[PCB 레이아웃 가이드라인](SF32LB57x_pcb_layout.md)__ — 스택업, 핵심 PCB 제약 사항, 전원/크리스털/RF/아날로그/오디오/고속 라우팅, EMI/ESD/EOS, 참고 그림
- :fontawesome-solid-list-check: __[PCB 레이아웃 체크리스트](SF32LB57x_pcb_layout_checklist.md)__ — 항목별 PCB 레이아웃 검토 체크리스트(6.10절)
- :fontawesome-solid-book-open: __[설계 검토 체크리스트 및 참고 자료](SF32LB57x_review_and_reference.md)__ — 고객 설계 자체 점검, 관련 문서, 부록, 개정 이력

</div>
