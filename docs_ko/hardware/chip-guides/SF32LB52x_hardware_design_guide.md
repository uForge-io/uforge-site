---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB52x MCU 하드웨어 설계 가이드: 디바이스 개요, 설계 흐름, 회로도, PCB 레이아웃, 검토, 체크리스트 페이지로 연결되는 링크를 제공합니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB52x 하드웨어 설계 가이드

## 1. 소개

이 하드웨어 설계 가이드는 SF32LB52x 초저전력 AIoT 마이크로컨트롤러 제품군 기반 제품을 위한 설계 권장 사항과 출처에 근거한 참고 자료를 제공합니다. 배터리 전원 웨어러블 디바이스와 소형 임베디드 시스템을 개발하는 하드웨어 엔지니어, PCB 설계자, 제품 개발자를 대상으로 합니다.

이 가이드는 전원 설계, 클럭 회로, RF 레이아웃, 디스플레이 및 스토리지 인터페이스, 오디오 회로, PCB 레이아웃 권장 사항, 제조 시 고려 사항을 포함한 전체 하드웨어 개발 과정을 다룹니다. 이 가이드라인을 따르면 개발 위험을 줄이고, 시스템 신뢰성을 높이며, 제품 개발 주기를 단축하는 데 도움이 됩니다.

이 문서는 임베디드 하드웨어 설계와 회로도 작성에 대한 기본 지식이 있다고 가정합니다. 상세한 전기적 사양, 주변 장치 동작, 소프트웨어 개발에 대해서는 SF32LB52x 데이터시트, 레퍼런스 매뉴얼, SDK 문서가 계속 기준이 되며, 이 가이드는 이들을 보완합니다.

이 가이드는 SiFli의 원본 하드웨어 애플리케이션 노트 두 건, 즉 배터리 전원 SF32LB520/3/5/7 경로용과 외부 레귤레이션 52B/D/E/G/J 경로용을 하나의 엔지니어링 워크플로로 통합한 것입니다. 원본 표현이 일관되지 않은 경우, 이 가이드는 정확한 주문 가능 부품 번호, 명시적인 전원 도메인 동작, 릴리스 검토의 명확성을 우선합니다.

## 2. 개발 리소스
[SF32LB52x Product Brief]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x Datasheet]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[SF32LB52x Reference Manual]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[KiCad Files]: https://github.com/OpenSiFli/kicad-libraries
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB52x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB52x Reference Manual]__
- :fontawesome-solid-file-lines: __[SF32LB52x Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__
- :fontawesome-brands-github: __[KiCad Files]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. 디바이스 개요

SF32LB52x 제품군은 듀얼 코어 STAR-MC1 프로세서, Bluetooth 연결, 그래픽 가속, 통합 오디오, 디스플레이 인터페이스, 스토리지 컨트롤러, 전원 관리를 소형 QFN68 패키지 하나에 결합합니다. 이 제품군은 BOM 비용, 배터리 수명, PCB 면적이 모두 중요한 제품에 맞게 최적화되어 있습니다.

### 3.1. 특징

이 제품군이 통합하는 기능은 다음과 같습니다.

- Arm Cortex-M33과 호환되며 FPU와 MPU를 갖춘 듀얼 코어 Arm China STAR-MC1 프로세서
- 듀얼 모드 Bluetooth 5.3 라디오
- ePicasso 2.0 2D/2.5D 그래픽 가속기
- SPI, QSPI, 8080, JDI, 8비트 EPD 인터페이스를 지원하는 디스플레이 컨트롤러
- USB 2.0 Full-Speed 디바이스
- 지원되는 변형(variant)의 SDIO/eMMC 스토리지 인터페이스
- 아날로그 및 디지털 오디오 인터페이스
- 통합 PMU, DC/DC 컨버터, LDO 레귤레이터
- 최대 44/45개 GPIO를 갖춘 QFN68 패키지

### 3.2. 변형

SF32LB52x 제품군은 전원 아키텍처에 따라 실질적으로 두 가지 설계 그룹, 즉 배터리 전원 디바이스와 외부 레귤레이션 디바이스로 나뉘며, 각 그룹은 아래에 정리했습니다.

=== "SF32LB520/3/5/7 (배터리 전원)"

    이 그룹은 온칩 **충전 관리 모듈과 PMU**를 통합합니다. 단일 셀 리튬 배터리에 직접 연결할 수 있으며, 외부 충전 솔루션도 계속 지원합니다.

    <div align="center"><em>표 3.2-1: 모델 대조표(배터리 전원 변형)</em></div>

    <div align="center" markdown>

    | 모델 | 코패키지 메모리 | 전원 | 설계 참고 |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR 플래시 | Li-ion 배터리, 3.2~4.7 V, 충전 가능 | 기본적으로 코패키지 플래시에서 부팅하며, `VDD18_VOUT`에는 외부 3.3 V 전원이 필요합니다 |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | Li-ion 배터리, 3.2~4.7 V, 충전 가능 | 외부 스토리지에서 부팅해야 합니다 |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | Li-ion 배터리, 3.2~4.7 V, 충전 가능 | 외부 스토리지에서 부팅해야 합니다 |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | Li-ion 배터리, 3.2~4.7 V, 충전 가능 | 외부 스토리지에서 부팅해야 합니다 |

    </div>

=== "52B/D/E/G/J (일반 전원)"

    이 그룹은 온칩 **PMU**를 통합하지만 충전 회로는 포함하지 않습니다. 레귤레이션된 외부 전원으로 구동됩니다.

    <div align="center"><em>표 3.2-2: 모델 대조표(일반 전원 변형)</em></div>

    <div align="center" markdown>

    | 모델 | 코패키지 메모리 | 전원 | 설계 참고 |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | 1 MB QSPI-NOR 플래시 | 2.97~3.63 V, 충전 불가 | `VDD_SIP`에는 외부 1.8 V 또는 3.3 V 전원이 필요합니다 |
    | SF32LB52BU56 | 4 MB QSPI-NOR 플래시 | 2.97~3.63 V, 충전 불가 | `VDD_SIP`에는 외부 3.3 V 전원이 필요합니다 |
    | SF32LB52DUB6 | 4 MB OPI-PSRAM | 1.71~1.98 V, 충전 불가 | `VDD_SIP`에는 외부 1.8 V 전원이 필요합니다 |
    | SF32LB52EUB6 | 4 MB OPI-PSRAM | 2.97~3.63 V, 충전 불가 | `VDD_SIP`는 내부 LDO로 공급할 수 있습니다 |
    | SF32LB52GUC6 | 8 MB OPI-PSRAM | 2.97~3.63 V, 충전 불가 | `VDD_SIP`는 내부 LDO로 공급할 수 있습니다 |
    | SF32LB52JUD6 | 16 MB OPI-PSRAM | 2.97~3.63 V, 충전 불가 | `VDD_SIP`는 내부 LDO로 공급할 수 있습니다 |

    </div>

### 3.3. 패키지

두 설계 그룹 모두 동일한 QFN68 패키지를 사용합니다.

<div align="center"><em>표 3.3-1: 패키지 정보</em></div>

<div align="center" markdown>

| 패키지 이름 | 치수 | 핀 피치 |
|:---|:---|:---|
| QFN68L | 7 mm x 7 mm x 0.85 mm | 0.35 mm |

</div>

두 설계 그룹은 주변 장치 리소스에서 약간 차이가 있습니다. 배터리 전원 그룹은 GPIO가 44개이고 일반 전원 그룹은 45개이며, 이 차이는 배터리 전원 디바이스에서 충전용으로 예약된 핀 때문에 생깁니다.

- 44/45개 GPIO
- UART 3개
- I2C 4개
- GPTIM 2개
- SPI 2개
- I2S 오디오 인터페이스 1개
- SDIO 스토리지 인터페이스 1개
- PDM 오디오 인터페이스 1개
- 차동 아날로그 오디오 출력 1개
- 싱글 엔드 아날로그 오디오 입력 1개
- 단일/듀얼/쿼드 데이터 라인 SPI 디스플레이 인터페이스, 직렬 JDI 디스플레이 인터페이스
- GRAM이 있는 디스플레이와 없는 디스플레이를 모두 지원
- UART 플래싱과 소프트웨어 디버그 지원

핀 배치 다이어그램은 아래와 같으며, 두 배치의 차이는 회로도 설계 절에서 다시 다룹니다.

![그림 3.3-1: SF32LB520/3/5/7의 QFN68L 핀 배치](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-1: SF32LB520/3/5/7의 QFN68L 핀 배치</em></div>

![그림 3.3-2: SF32LB52B/E/G/J의 QFN68L 핀 배치](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 3.3-2: SF32LB52B/E/G/J의 QFN68L 핀 배치</em></div>

### 3.4. 애플리케이션

대표적인 애플리케이션은 긴 배터리 수명과 소형 폼 팩터가 필수인 휴대용 임베디드 시스템입니다. 예는 다음과 같습니다.

- 보급형 스마트워치 및 피트니스 밴드
- Bluetooth 모듈 및 무선 어댑터
- Bluetooth 오디오 액세서리
- 스마트 센서 및 웨어러블 디바이스
- 전자 가격표(Electronic Shelf Label)와 스마트 배지
- 전자책 리더
- 휴대용 라벨 프린터
- eBike 및 eScooter 디스플레이
- 연결형 휴먼 머신 인터페이스(HMI) 디바이스
- 휴대용 산업 및 의료 장비
- 기타 배터리 전원 AIoT 디바이스

## 4. 설계 한눈에 보기

### 4.1. 하드웨어 아키텍처

다음 표는 일반적인 SF32LB52x 애플리케이션에 권장되는 하드웨어 아키텍처를 요약합니다. 이후 절의 상세 설계 지침을 읽기 전에 빠른 참고 자료로 사용하십시오.

<div align="center"><em>표 4.1-1: 설계 한눈에 보기 요약</em></div>

<div align="center" markdown>

| 하드웨어 블록 | 일반적인 구현 |
|:---|:---|
| 패키지 | QFN68L, 7 mm x 7 mm x 0.85 mm, 0.35 mm 피치 |
| PCB | 4층 PTH PCB 권장 |
| 전원 | 디바이스 변형에 따라 단일 셀 Li-ion/Li-Po 배터리 또는 레귤레이션된 외부 전원 |
| 배터리 충전 | 지원되는 변형은 통합 충전기, 또는 전원 경로 관리(PPM)가 있거나 없는 외부 충전기 IC |
| Buck 인덕터 | 4.7 uH +/-20%, DCR <= 0.4 Ω, Isat >= 450 mA |
| 크리스털 | 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털 |
| RF | 예약된 π 매칭 회로를 갖춘 50 Ω 임피던스 제어 트레이스 |
| 디스플레이 | 3선 SPI, 4선 SPI, Dual-SPI, Quad-SPI(최대 512 x 512), JDI, 8비트 EPD |
| 터치 | 인터럽트 웨이크업을 지원하는 I2C 정전식 터치 컨트롤러 |
| 스토리지 | 변형에 따라 SiP 플래시/PSRAM, 외부 SPI NOR, SPI NAND, SD NAND, 또는 eMMC |
| 오디오 | 아날로그 마이크 입력, 차동 DAC 출력, 외부 PA |
| 센서 | 가속도 센서, 자이로스코프, 지자기 센서, 심박 센서, SpO2 센서, ECG 센서 등 I2C/SPI 센서 |
| 햅틱 | PWM으로 제어하는 진동 모터 |
| 디버그 | SWD와 멀티플렉싱된 PA18/PA19의 DBG_UART |

</div>


### 4.2. 하드웨어 설계 흐름

하드웨어 결정이 보통 확정되는 순서에 따라 이 가이드를 읽으십시오. 아래 흐름은 설계가 회로도와 PCB 세부 사항으로 넘어가기 전에 초기 아키텍처 선택이 눈에 잘 띄도록 유지합니다.

<div align="center"><em>표 4.2-1: 하드웨어 설계 흐름</em></div>

<div align="center" markdown>

| 단계 | 설계 결정 | 주요 절 |
|:---|:---|:---|
| 1 | 정확한 주문 가능 디바이스와 전원 변형 선택 | 디바이스 개요, 변형 선택 |
| 2 | 패키지, GPIO 수, 고정 기능 핀 확인 | 패키지, 회로도 설계 가이드라인 |
| 3 | 최소 시스템 확정: 전원 트리, 부트 스토리지, 부트스트랩 핀, 디버그 접근, 클럭, 웨이크업 전략 | 최소 시스템 설계, 스토리지, 디버그, 클럭 생성 |
| 4 | RF 토폴로지, 디스플레이, 오디오, 센서, 나머지 제품 인터페이스 선택 | 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결 |
| 5 | PCB 스택업, 팬아웃, 임피던스, 민감한 라우팅 검토 | PCB 레이아웃 가이드라인 |
| 6 | 원본 레퍼런스 회로도, PCB 레이아웃, 기구 도면, 전원 도면과 비교 | 부록 A~E |
| 7 | 브링업, 디버그, 캘리브레이션, 양산 테스트 접근 확보 | 디버그, 양산, 설계 검토 체크리스트 |

</div>

**설계 결정 트리**

- USB로 충전 가능한 단일 셀 배터리 동작이 필요합니까? `SF32LB520/3/5/7`로 시작하십시오.
- 외부 레귤레이션 전원 또는 eMMC 부팅이 필요합니까? `52B/D/E/G/J`로 시작하십시오.
- 8비트 병렬 EPD가 필요합니까? 해당 설계에 대해 SiFli가 배터리 전원 경로를 확인하지 않는 한 일반 전원 설계 경로를 사용하십시오.
- 가장 낮은 Standby 전류가 필요합니까? PCB 배치 전에 스토리지 전원 스위칭, 센서 로드 스위치, 디스플레이 전원 격리를 결정하십시오.

### 4.3. 이 가이드 사용 방법

회로도 작업을 시작하기 전에 정확한 주문 가능 부품 번호부터 확인하십시오. SF32LB52x 제품군은 배터리 전원 `SF32LB520/3/5/7` 그룹과 외부 레귤레이션 `52B/D/E/G/J` 그룹이라는 실질적인 두 설계 그룹으로 나뉘기 때문입니다. 3.2절로 그룹을 선택하고, 5.1절과 5.2절로 최소 시스템 및 전원 시스템 검토를 마치며, 5.6.1절과 5.7.1절로 부트 스토리지와 디버그 접근을 확인하고, 5절과 6절로 회로도 및 PCB 지침을 검토하며, 부록 A~E로 원본 레퍼런스 그림을 비교하고, 7절을 릴리스 체크리스트로 사용하십시오.

설계에서 이전 SF32LB52x 회로도를 재사용하는 경우 전원 핀, SIP 메모리 전원, 부트 스토리지 레일, DBG_UART/SWD 핀, 크리스털 로딩, RF 매칭 풋프린트, 양산 테스트 포인트를 먼저 검토하십시오. 이 항목들은 눈에 띄지 않는 브링업 위험의 가장 흔한 원인입니다.

### 4.4. 검토 증빙 자료 모음

하드웨어 릴리스 전에 회로도 PDF, PCB 스택업, 임피던스 리포트, 부품 AVL 교차 확인, DRC 리포트, RF, 크리스털, USB, SDIO/eMMC, 오디오, 전원, 부트 스토리지 레이아웃의 스크린샷을 수집하십시오. 이후 펌웨어, RF, 양산 문제를 검토된 하드웨어 기준 구성까지 추적할 수 있도록 증빙 자료를 보드 리비전과 함께 보관하십시오.


## 5. 체크리스트 사용 { #using-the-checklists }

이 가이드는 두 수준의 체크리스트를 제공합니다. 5.1.1.5절, 5.5.3절, 7절 전반에 포함된 짧은 체크리스트는 위험도가 가장 높은 항목을 제시하여 빠른 엔지니어링 자체 점검에 쓰입니다. [회로도 체크리스트](SF32LB52x_schematic_checklist.md)(5.8절)와 [PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)(6.15절)는 SiFli의 완전한 항목별 [*SF32LB52 Schematic & PCB Checklist*][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] (V1.0, 2026-01-21)를 그대로 재현합니다. 이 문서는 하드웨어 설계 가이드와 함께 [SiFli 위키][SiFli Chip Hardware Design Guide Index (Wiki)]에 게시되어 있으며, SF32LB520/3/5/7 배터리 전원 변형과 SF32LB52B/D/E/G/J 외부 전원 변형을 모두 다룹니다.

두 체크리스트의 각 점검 항목에는 해당 항목이 적용되는 SF32LB52x 변형과, 필수(릴리스 전에 반드시 통과해야 함)인지 선택(해당 기능을 사용하는 경우 권장)인지가 표시되어 있습니다. 별도로 범위를 좁히지 않는 한 "모든 변형"은 SF32LB520/3/5/7과 SF32LB52B/D/E/G/J를 포함합니다. 색상이 있는 텍스트와 <span class="flag-red flag-yellow">노란색 배경</span>이 있는 텍스트는 원본 스프레드시트의 검토 강조를 그대로 유지한 것입니다. 원본은 각 강조의 이유를 밝히지 않으므로, 이 표시를 같은 표에서 강조되지 않은 항목을 대체하는 것이 아니라 추가 검토 플래그로 취급하십시오. 체크리스트 형식은 의도적으로 스프레드시트 레이아웃을 유지하지만, 원본 체크리스트의 문구가 불완전하거나 일관되지 않거나 너무 간략하여 그것만으로 이해하기 어려운 경우에는 설계 가이드, 데이터시트, 레퍼런스 매뉴얼, SiFli의 모델 번호 안내와 함께 읽으십시오.

회로도 검토 중 PCB 레이아웃을 시작하기 전에 [회로도 체크리스트](SF32LB52x_schematic_checklist.md)를 실행하십시오. 레이아웃 검토 중 Gerber를 릴리스하기 전에 [PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)를 실행하십시오. 실제로는 각 패스를 보통 두 번 수행합니다. 먼저 설계 엔지니어가 수행하고, 설계 동결 또는 제조 릴리스 전에 독립 검토자가 다시 수행합니다.

최상의 결과를 얻으려면 체크리스트를 읽기용 목록이 아니라 승인 기록으로 취급하십시오.

1. 먼저 대상 실리콘 변형을 정확히 확인하십시오. 특히 설계가 520/3/5/7 또는 52B/D/E/G/J 디바이스 중 어느 쪽으로도 구성될 수 있는 경우에 그렇습니다.
2. 검토 중에 표를 수동적으로 읽지 말고, 모든 항목을 통과 / 실패 / 해당 없음으로 표시하십시오.
3. 점검 항목이 부트 미디어, 디스플레이 유형, 전원 스위치 동작을 언급하는 경우 실제 회로도 및 설계 가이드의 해당 서브시스템 장과 대조하여 확인하십시오.
4. 원본 문구가 모호한 항목은 릴리스 전에 정확한 부품 번호와 설계 가정을 검토 노트에 기록하십시오.

<div align="center"><em>표 5-1: 검토 기록 템플릿</em></div>

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

<div align="center"><em>표 5-2: 체크리스트 문서 버전 이력</em></div>

<div align="center" markdown>

| 번호 | 버전 | 날짜 | 릴리스 노트 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Schematic & PCB Checklist 문서 최초 릴리스 |

</div>

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

## 6. 하드웨어 설계 가이드 이어서 보기 { #continue-the-design-guide }

전체 가이드는 아래 페이지들로 이어집니다. 각 페이지는 설계 과정의 한 단계를 다루며 여기에서 이동할 수 있습니다.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[회로 설계 가이드라인](SF32LB52x_schematic_design.md)__ — 최소 시스템, 전원 시스템, 클럭 생성, RF, 사용자 인터페이스, 스토리지 및 연결, 제조 접근을 세 페이지에 걸쳐 설명합니다
- :fontawesome-solid-list-check: __[회로도 체크리스트](SF32LB52x_schematic_checklist.md)__ — 항목별 회로도 검토 체크리스트(5.8절)
- :fontawesome-solid-microchip: __[PCB 레이아웃 가이드라인](SF32LB52x_pcb_layout.md)__ — 클럭, RF, 오디오, USB, SDIO, 전원에 대한 풋프린트, 스택업, 팬아웃, 라우팅 지침
- :fontawesome-solid-list-check: __[PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)__ — 항목별 PCB 레이아웃 검토 체크리스트(6.15절)
- :fontawesome-solid-book-open: __[설계 검토 체크리스트 및 참고 자료](SF32LB52x_review_and_reference.md)__ — 릴리스 체크리스트, 관련 문서, 레퍼런스 회로도/PCB/기구/전원 부록, 개정 이력

</div>
