---
icon: lucide/book-check
description: "SF32LB56-MOD Bluetooth MCU 모듈의 하드웨어 설계 가이드: 전원, 인터페이스, PCB 통합 지침입니다."
tags:
  - 하드웨어
  - 모듈
hide:
    - navigation
---

# SF32LB56-MOD 하드웨어 설계 가이드

## 1. 소개

**SF32LB56-MOD**는 SF32LB56xV 시리즈를 기반으로 한 SiFli의 범용 저전력 Bluetooth MCU 모듈 제품군입니다.

이 가이드는 **DS5602-SF32LB56-MOD Technical Specification V0.3**을 원본으로 삼아, 회로 설계, PCB 레이아웃, 검증, 양산 릴리스에 필요한 모듈 고유의 정보를 정리합니다. 메모리 변형(variant), 89핀 인터페이스, 세 가지 전원 레일, 디스플레이/오디오/스토리지 인터페이스, 안테나 배치 규칙, 취급 요구 사항, 회로도 체크리스트를 다룹니다.

!!! note "출처와 권장 사항"
    아래의 기술 수치는 통합 지침 또는 설계 권장 사항으로 명시한 경우를 제외하고 모두 **DS5602-SF32LB56-MOD Technical Specification V0.3**을 따릅니다.

## 2. 디바이스 개요

### 2.1 아키텍처

SF32LB56-MOD는 SF32LB56xV 시리즈의 듀얼 코어 MCU 플랫폼을 사용합니다. HCPU는 애플리케이션 및 그래픽 워크로드를 처리하고, LCPU는 저전력 상시 동작 작업을 실행합니다. HCPU는 최대 240 MHz로 동작하는 Arm Cortex-M33 STAR-MC1 코어이고, LCPU는 최대 96 MHz로 동작하는 동일한 유형의 코어입니다. 둘 다 FPU와 MPU를 지원합니다.

이 모듈은 Bluetooth 5.3 연결을 지원하며, 디스플레이 가속, 오디오 I/O, 외부 메모리 인터페이스, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC, 디버그/플래싱 접근 수단을 제공합니다.

### 2.2 변형

<div align="center"><em>표 2.2-1: SF32LB56-MOD 시리즈 변형</em></div>

<div align="center" markdown>

| 모듈 코드 | 메인 플래시 | PSRAM | 백업 플래시 | 동작 온도 | 크기 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16MB QSPI-NOR | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-A128R12N1 | 128MB QSPI-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-D128R12N1 | 128MB SD-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |

</div>

### 2.3 주요 하드웨어 기능

<div align="center"><em>표 2.3-1: 주요 하드웨어 기능</em></div>

<div align="center" markdown>

| 영역 | 기능 |
| :--- | :--- |
| CPU | HCPU 최대 240MHz, LCPU 최대 96MHz, 둘 다 Arm Cortex-M33 STAR-MC1 |
| 무선 | BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3 |
| 그래픽 | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| 오디오 | 24비트 DAC, 24비트 Sigma-Delta ADC, PDM 인터페이스 2개(PDM1/PDM2)이며 각각 좌/우 채널에 마이크 두 개를 지원(최대 마이크 4개), I2S 1개 |
| AI/DSP | 최대 1.92 GOPS의 매트릭스 가속기, FFT, FIR, CORDIC |
| 스토리지 | 모듈 플래시/PSRAM 옵션, MPI3, SD/SDIO/eMMC 지원 |
| 보안 | AES, HASH, CRC, TRNG, Secure Boot, 1024비트 eFuse, PSA Certified Level 1 |
| 안테나 | PCB 온보드 안테나 또는 IPEX 호환 커넥터를 통한 외부 안테나 |

</div>

### 2.4 대표 애플리케이션

대표 애플리케이션으로는 고급 스마트워치, 스마트 밴드, 웨어러블 의료 장비, 피트니스 장비, e-bike 제어 패널, 자동차 키, 차량용 웨어러블 리모컨, 스마트 가전, 스마트 도어락, 그래픽 HMI 디바이스, 산업용 센서 허브, 산업용 모니터링 단말, 저전력 센서 허브, Bluetooth Mesh 디바이스가 있습니다.

## 3. 설계 개요

### 3.1 한 페이지 엔지니어링 요약

<div align="center"><em>표 3.1-1: 엔지니어링 요약</em></div>

<div align="center" markdown>

| 주제 | 설계 지침 |
| :--- | :--- |
| 전원 레일 | VDD_3V3, VDD_1V8, VDDIO를 공급합니다. 세 레일은 동시에 켜져야 합니다. |
| 로컬 디커플링 | VDD_3V3, VDD_1V8, VDDIO에 4.7uF 커패시터를 모듈 핀 가까이에 배치하십시오. |
| I/O 레벨 | VDDIO는 1.7~3.6V를 지원하지만 PA00~PA11은 3.3V로 고정됩니다. 연결되는 모든 주변 장치를 확인하십시오. |
| 디버그/플래싱 | UART4_TXD/UART4_RXD는 기본 출력/플래싱/디버그 UART 핀이며, SWDIO/SWCLK는 SWD 플래싱을 지원합니다. |
| 부트 모드 | BOOT_MODE가 high이면 다운로드 모드, low이면 사용자 모드가 선택됩니다. |
| 내부 플래시 충돌 | PA06~PA11은 기본적으로 모듈 내부 플래시에 연결되어 있어 외부에서 사용할 수 없습니다. |
| SDIO/MPI3 충돌 | SDIO와 MPI3는 I/O 리소스를 공유하므로 동시에 사용할 수 없습니다. |
| 웨이크 소스 | PA50, PA51, PB32, PB35는 MCU 슬립 중에도 인터럽트를 받을 수 있습니다. |
| PWRKEY | PB32는 active-high 10s 길게 누름 리셋을 지원하며 10k 풀다운이 필요합니다. |
| 안테나 | PCB 안테나 영역에는 구리, 트레이스, 부품, 금속을 두지 마십시오. 안테나가 보드 가장자리 밖으로 나올 수 없다면 15mm 이상의 클리어런스를 확보하십시오. |
| 제조 | MSL 3. 개봉 후 25±5°C/60%RH에서 168시간 이내에 사용하거나, 재사용 전에 베이킹하십시오. |

</div>

### 3.2 권장 외부 부품

<div align="center"><em>표 3.2-1: 권장 외부 부품</em></div>

<div align="center" markdown>

| 회로 | 부품 | 배치 / 비고 |
| :--- | :--- | :--- |
| VDD_3V3 | 4.7uF 커패시터 | 모듈 전원 핀 가까이에 배치하십시오. |
| VDD_1V8 | 4.7uF 커패시터 | 모듈 전원 핀 가까이에 배치하십시오. |
| VDDIO | 4.7uF 커패시터 | 모듈 전원 핀 가까이에 배치하십시오. |
| PB32/PWRKEY | 10k 풀다운 | active-high 길게 누름 리셋 동작에 필수입니다. |
| LCD RGB 신호 | 33~100 ohm 직렬 저항 | RGB 신호 라인에 직렬로 추가하십시오. |
| PA16/PA17 디버그 UART | 100 ohm 직렬 저항 | 멀티플렉싱된 프로그램 플래싱/디버그 UART 인터페이스에 필수입니다. |
| 터치 패널 / 사용자 커넥터 | ESD 보호 | TP 등 외부에 노출된 인터페이스에 ESD 소자를 예약해 두십시오. |

</div>

### 3.3 전원 트리

VDD_3V3는 MCU의 PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2와 모듈 내부 플래시에 전원을 공급합니다. SiFli는 이 레일에 LDO를 사용할 것을 권장합니다. VDD_1V8은 MCU 코패키지 메모리에 전원을 공급합니다. VDDIO는 MCU의 VDDIOA/VDDIOB I/O 포트에 전원을 공급합니다.

!!! info "그림 3.3-1: SF32LB56-MOD 전원 공급 다이어그램"
    DS5602 V0.3의 그림 7-1을 참조하십시오.

### 3.4 시스템 블록 다이어그램

모듈 블록 다이어그램은 SF32LB56xV MCU, 메모리 리소스, RF 경로, 안테나 옵션, 전원 입력, 외부 인터페이스 그룹을 보여 줍니다.

!!! info "그림 3.4-1: SF32LB56-MOD 기능 블록 다이어그램"
    DS5602 V0.3의 그림 2-1을 참조하십시오.

## 4. 하드웨어 설계 흐름

### 4.1 설계 순서

1. 펌웨어 크기, 그래픽 에셋, 외부 스토리지 요구 사항, 비용 목표를 기준으로 메모리 변형을 선택합니다.
2. 기구 동결 전에 PCB 안테나와 외부 안테나 중 어느 변형을 쓸지 선택합니다.
3. VDD_3V3, VDD_1V8, VDDIO의 전원 아키텍처를 정의하고 동시 파워업을 확인합니다.
4. 디스플레이, 스토리지, USB, 오디오, 센서, 웨이크, 디버그, 양산 테스트용 핀을 할당합니다.
5. 공유 리소스 충돌, 특히 SDIO와 MPI3의 충돌 및 내부적으로 사용되는 PA06~PA11 플래시 핀을 해결합니다.
6. 디커플링, ESD, PWRKEY 풀다운, LCD 직렬 저항, 디버그 UART 직렬 저항을 추가합니다.
7. 필요한 안테나 클리어런스와 금지 구역을 확보하여 모듈을 배치합니다.
8. 릴리스 전에 7절의 체크리스트를 기준으로 회로도와 PCB를 검토합니다.

### 4.2 검토 순서

단계적 검토 순서를 사용하십시오. 회로도 검토, 핀 먹스 검토, 파워업 검토, RF/안테나 검토, 레이아웃 검토, 초도품 브링업 검토, RF 검증, 환경/신뢰성 검토, 양산 테스트 검토 순입니다.

### 4.3 마일스톤

<div align="center"><em>표 4.3-1: 권장 하드웨어 마일스톤</em></div>

<div align="center" markdown>

| 마일스톤 | 필요한 증빙 |
| :--- | :--- |
| 회로도 동결 | 변형을 선택하고, 핀 충돌을 해소하고, 전원 레일을 점검하고, 체크리스트를 완료함. |
| 레이아웃 동결 | 안테나 금지 구역을 점검하고, 전원 디커플링을 배치하고, 고속 인터페이스를 검토함. |
| EVT 브링업 | 레일, 부트 모드, UART/SWD, 플래시, 디스플레이, USB, 오디오, RF 스모크 테스트를 통과함. |
| DVT | RF 통신 거리, 전류, 열, 슬립/웨이크, ESD 전략, 케이스 영향을 검증함. |
| 양산 릴리스 | 프로그래밍, 테스트 패드, 검사 규칙, MSL/리플로 취급, 리비전 기록을 완료함. |

</div>

## 5. 회로 설계

### 5.1 전원 시스템

#### 5.1.1 전원 공급

<div align="center"><em>표 5.1-1: 전원 레일</em></div>

<div align="center" markdown>

| 레일 | 권장 동작 범위 | 용도 |
| :--- | :--- | :--- |
| VDD_3V3 | 2.97~3.6V | MCU PVDD, 아날로그 3.3V 도메인, RF 아날로그 도메인, VDDIOA2, 내부 플래시. |
| VDD_1V8 | 1.7~1.95V | MCU 코패키지 메모리 전원. |
| VDDIO | 1.7~3.6V | MCU VDDIOA/VDDIOB I/O 전원. |

</div>

VDD_3V3, VDD_1V8, VDDIO는 동시에 켜져야 합니다. 각 모듈 전원 핀 가까이에 4.7uF 커패시터를 배치하십시오. VDDIO는 1.7V에서 3.6V까지 동작할 수 있지만, 데이터시트에는 PA00~PA11이 3.3V로 고정되어 있으며 VDDIO를 따르지 않는다고 별도로 명시되어 있습니다.

#### 5.1.2 동작 모드

BOOT_MODE는 부트 동작을 선택합니다. high는 다운로드 모드, low는 사용자 모드입니다. 리셋 중과 양산 프로그래밍 중에 BOOT_MODE 네트워크의 상태가 항상 정해져 있도록 하십시오. PB32/PWRKEY는 active-high 10s 길게 누름 리셋을 지원하며 10k 풀다운이 필요합니다.

### 5.2 타이밍과 RF

#### 5.2.1 클럭

이 모듈 플랫폼은 48MHz 크리스털 오실레이터를 사용하며, 1MHz/48MHz 저전력 RC 오실레이터, 초저전력 10kHz RC 오실레이터, 선택 사항인 32.768kHz 크리스털 오실레이터를 지원합니다. 클럭 관련 레이아웃과 그라운딩은 모듈 레퍼런스 디자인과 일관되게 유지하고, 내부 크리스털에 기계적 스트레스를 줄 수 있는 초음파 공정은 피하십시오.

#### 5.2.2 RF

<div align="center"><em>표 5.2-1: Bluetooth RF 요약</em></div>

<div align="center" markdown>

| 항목 | 값 |
| :--- | :--- |
| Bluetooth 주파수 범위 | 2402~2480MHz |
| BLE 최대 송신 전력 | 19dBm |
| BLE RF 전력 제어 범위 | -20~19dBm |
| BLE 1Mbps 감도 | -100dBm dirty off, -99.3dBm dirty on |
| BLE 2Mbps 감도 | -97dBm dirty off, -96.5dBm dirty on |
| BR 최대 송신 전력 | 19dBm |
| EDR 최대 송신 전력 | 13dBm |
| BR 감도 | -96.3dBm dirty off, -94dBm dirty on |
| EDR2 감도 | -95.5dBm dirty off, -95dBm dirty on |
| EDR3 감도 | -88.5dBm dirty off, -87dBm dirty on |

</div>

이 모듈은 온보드 PCB 안테나 또는 IPEX 호환 커넥터로 연결하는 외부 안테나를 지원합니다. 통신 거리와 RF 성능은 개방된 벤치에서만이 아니라 최종 케이스에서 검증하십시오.

### 5.3 사용자 인터페이스

#### 5.3.1 디스플레이

LCD 컨트롤러는 DBI 시리얼 SPI 모드, Dual-SPI, Quad-SPI, 8080 병렬 모드, DPI/RGB, JDI를 지원합니다. 데이터시트의 권장 핀 할당 그림은 LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper, Raspberry Pi 방식 그룹을 모듈 핀에 매핑합니다.

LCD RGB 신호 라인에는 33~100 ohm 직렬 저항을 추가하십시오. RGB, SPI 디스플레이, 터치 패널 라우팅은 짧고 일관되게 유지하고, 외부에 노출된 터치 또는 커넥터 인터페이스에는 ESD 보호를 예약해 두십시오.

!!! info "그림 5.3-1: 권장 개발 보드 핀 할당"
    DS5602 V0.3의 그림 7-6을 참조하십시오.

#### 5.3.2 오디오

이 모듈은 아날로그 오디오 DAC 출력, MIC_BIAS, MIC_ADC_IN, I2S, PDM을 지원하는 핀을 제공합니다. 오디오 DAC는 8kHz~48kHz 샘플링 레이트와 109dB의 SNR 및 다이내믹 레인지를 지원하는 24비트 출력 경로입니다. 오디오 ADC는 8kHz~48kHz 샘플링 레이트와 99dB의 SNR 및 다이내믹 레인지를 지원하는 24비트 Sigma-Delta 입력 경로입니다.

아날로그 오디오는 노이즈가 큰 스위칭 노드, LCD 클럭, 안테나 급전 구조에서 멀리 떨어뜨려 라우팅하십시오. MIC_BIAS와 MIC_ADC_IN 필터링은 연결된 마이크 회로 가까이에 유지하십시오.

#### 5.3.3 버튼

PB32는 PWRKEY 입력이며 active-high 10s 길게 누름 리셋을 지원합니다. 필요한 10k 풀다운을 추가하고, 운송 중, deep sleep 중, 전원 시퀀싱 중에 버튼 회로가 플로팅 상태가 되지 않도록 하십시오.

#### 5.3.4 모터 및 PWM 부하

데이터시트의 권장 핀 할당 그림에서 GPTIM으로 표시된 핀은 PWM 출력을 지원합니다. 모터, 백라이트, 버저 등의 부하에는 외부 드라이버를 사용하고, 유도성 부하나 대전류 부하를 모듈 GPIO로 직접 구동하지 마십시오.

### 5.4 스토리지와 연결

#### 5.4.1 스토리지

이 모듈 제품군은 SKU에 따라 달라지는 메인 플래시, 4+8MB OPI-PSRAM, 1MB 백업 QSPI-NOR 플래시를 제공합니다. MPI3로 외부 SPI NOR 또는 SPI NAND를 연결할 수 있지만, PA06~PA11은 기본적으로 모듈 내부 플래시에 연결되어 있어 외부에서 사용할 수 없습니다. SDIO와 MPI3는 I/O 리소스를 공유하므로 동시에 사용할 수 없습니다.

#### 5.4.2 센서

GPADC는 12비트 변환, 최대 4MS/s 샘플링 레이트, 0~3.3V 싱글엔드 입력 범위, -2.1V~+2.1V 차동 입력 범위, 소프트웨어/하드웨어 트리거, DMA를 지원합니다. GPADC_CHx로 표시된 핀은 아날로그 입력을 지원합니다. 아날로그 경로는 짧게 유지하고 필터링하며, LCD 및 RF 스위칭 노이즈에서 멀리 떨어뜨리십시오.

#### 5.4.3 UART/I2C

UART는 최대 6Mbps의 전이중 동작을 지원합니다. I2C는 표준 100kbps, 고속 400kbps, 고속 플러스 1Mbps, 하이 스피드 3.4Mbps 모드를 지원합니다. 많은 GPIO가 `PAxx_I2C_UART` 또는 `PBxx_I2C_UART`로 멀티플렉싱되어 있으므로, 회로도를 동결하기 전에 최종 먹스 계획을 확인하십시오.

6번 핀의 UART4_TXD와 7번 핀의 UART4_RXD는 기본 출력용 시리얼 포트이며 프로그램 플래싱/디버그를 지원합니다. PA16과 PA17은 DBG_UART로 멀티플렉싱할 수 있으며, 프로그램 플래싱/디버그에 사용할 때는 100 ohm 직렬 저항이 필요합니다.

#### 5.4.4 USB, SPI, SDIO, I2S

USB2.0 FS는 통합 PHY와 함께 Host/Device 모드를 지원합니다. SPI는 SSP/SPI 및 Microwire 형식을 지원하며, HPSYS SPI는 최대 48MHz, LPSYS SPI는 최대 24MHz에 이릅니다. SDMMC1은 SDR 및 DDR 모드로 SD 3.0, SDIO 3.0, eMMC 4.5.1을 지원하고, SDMMC2는 최대 48MHz의 SDR 모드로 SD/SDIO/eMMC 기능을 지원합니다. I2S는 마스터/슬레이브, 전이중, 좌/우/표준 형식, 최대 24비트 PCM 폭을 지원합니다.

### 5.5 제조

#### 5.5.1 디버그

79번 핀의 SWDIO와 80번 핀의 SWCLK는 SWD 디버그/플래싱 핀입니다. 초기 프로토타입과 양산 픽스처에서 SWD에 접근할 수 있도록 유지하십시오. 제품에 승인된 다른 프로그래밍 경로가 없다면 기본 UART4 플래싱/디버그 경로도 함께 노출하십시오.

#### 5.5.2 양산

전원, 그라운드, 부트 모드, 리셋/PWRKEY, SWD, UART 플래싱, 그리고 보드 수준 캘리브레이션 또는 RF 테스트 인터페이스에 대한 양산용 접근 수단을 확보해 두십시오. 최종 테스트 소프트웨어는 부트, 플래시, 디스플레이, 터치, 오디오, USB, 센서, RF 통신, 슬립/웨이크 동작, 소비 전류를 모두 다루는 것이 좋습니다.

## 6. PCB 레이아웃

### 6.1 기구와 풋프린트

이 모듈의 크기는 18.0 × 32.9 × 3.1 mm입니다. 데이터시트의 권장 PCB 풋프린트를 사용하고, 랜드 패턴, 솔더 마스크 확장, 스텐실 개구부, 금지 구역, 조립 코트야드는 PCB 조립업체와 확인하십시오.

!!! info "그림 6.1-1: SF32LB56-MOD 모듈 치수"
    DS5602 V0.3의 그림 8-1을 참조하십시오.

!!! info "그림 6.1-2: 권장 PCB 풋프린트"
    DS5602 V0.3의 그림 8-2를 참조하십시오. 치수 단위는 밀리미터입니다.

### 6.2 안테나 배치

제품에서 PCB 온보드 안테나를 사용한다면, 부품과 금속이 없는 안테나 영역을 확보하십시오. 가능하면 안테나 영역이 캐리어 보드 가장자리 밖으로 나오도록 모듈을 배치하고, 급전점은 보드 가장자리 가까이에 두십시오.

안테나가 보드 가장자리 밖으로 나올 수 없다면 15mm 이상의 클리어런스 영역을 확보하십시오. 그 클리어런스에는 구리, 트레이스, 부품을 두지 말고, PCB 안테나 아래의 캐리어 보드 재료는 가능한 한 많이 잘라 내십시오.

!!! info "그림 6.2-1: 권장 모듈 배치"
    DS5602 V0.3의 그림 8-4를 참조하십시오.

!!! info "그림 6.2-2: PCB 안테나 클리어런스 영역"
    DS5602 V0.3의 그림 8-5를 참조하십시오.

### 6.3 외부 안테나 커넥터

외부 안테나 설계의 경우, 데이터시트는 Hirose U.FL 시리즈, I-PEX MHF I, Amphenol AMC 커넥터와 호환되는 1세대 외부 안테나 커넥터를 설명합니다.

!!! info "그림 6.3-1: 외부 안테나 커넥터 치수"
    DS5602 V0.3의 그림 8-3을 참조하십시오.

### 6.4 레이아웃 체크리스트

<div align="center"><em>표 6.4-1: PCB 레이아웃 체크리스트</em></div>

<div align="center" markdown>

| 영역 | 점검 사항 |
| :--- | :--- |
| 전원 | 4.7uF 커패시터가 VDD_3V3, VDD_1V8, VDDIO 핀 가까이에 있음. |
| 그라운드 | 모듈 그라운드 핀이 저임피던스 그라운드 시스템에 연결되고, 고속 및 RF 경로 근처에 스티칭이 있음. |
| 안테나 | 안테나 금지 구역에 구리, 트레이스, 부품, 나사, 실드, 배터리 금속, 케이스 금속이 침범하지 않음. |
| 디스플레이 | LCD RGB/SPI 라인이 짧고, 임피던스를 고려했으며, 필요한 직렬 저항이 있음. |
| USB | USB DP/DM이 매칭된 차동 쌍으로 라우팅되고 커넥터 가까이에 ESD가 있음. |
| 아날로그 오디오 | MIC_BIAS, MIC_ADC_IN, DAC 출력이 스위칭 레귤레이터, LCD 클럭, RF 급전 영역을 피함. |
| 디버그 | SWD와 UART 플래싱/디버그 접근 수단을 프로토타입과 양산 픽스처에서 사용할 수 있음. |

</div>

## 7. 하드웨어 검증

### 7.1 전기적 특성

<div align="center"><em>표 7.1-1: 절대 최대 정격</em></div>

<div align="center" markdown>

| 기호 | 설명 | 최소 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3V 전원 입력 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8V 전원 입력 | -0.3 | 1.95 | V |
| VDDIO | I/O 전원 입력 | -0.3 | 3.6 | V |
| Tstore | 보관 온도 | -40 | 125 | °C |

</div>

<div align="center"><em>표 7.1-2: 권장 동작 조건</em></div>

<div align="center" markdown>

| 기호 | 설명 | 최소 | 전형 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3V 전원 입력 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8V 전원 입력 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O 전원 입력 | 1.7 | - | 3.6 | V |
| TA | 동작 온도 | -40 | - | 85 | °C |

</div>

<div align="center"><em>표 7.1-3: 3.3V, 25°C에서의 DC 전기적 특성</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 전형 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 핀 커패시턴스 | 2.5 | 3 | 3.5 | pF |
| VIH | 입력 high 전압 | 0.7×VDD | - | VDD | V |
| VIL | 입력 low 전압 | VSS | - | 0.3×VDD | V |
| IIH | 입력 high 전류 | - | 10 | 40 | nA |
| IIL | 입력 low 전류 | - | 10 | 40 | nA |
| VOH | 출력 high 전압, high-Z 부하 | 0.8×VDD | - | VDD | V |
| VOL | 출력 low 전압, high-Z 부하 | VSS | - | 0.2×VDD | V |
| IOH | 출력 high 구동 전류 | 24 | 30 | 38 | mA |
| IOL | 출력 low 구동 전류 | 24 | 30 | 38 | mA |
| RPU | 내부 풀업 | 7 | 10 | 20 | kΩ |
| RPD | 내부 풀다운 | 7 | 10 | 20 | kΩ |
| VIH_nRST | 리셋 해제 전압 | 0.7×VDD | - | VDD | V |
| VIL_nRST | 리셋 인가 전압 | VSS | - | 0.3×VDD | V |

</div>

VDD는 I/O 전원입니다. VOH와 VOL은 고임피던스 부하로 측정합니다.

### 7.2 소비 전력

<div align="center"><em>표 7.2-1: 3.3V, TX 전력 0dBm에서의 Bluetooth 및 BLE 전류</em></div>

<div align="center" markdown>

| 모드 | 조건 | 전형 전류 |
| :--- | :--- | :-: |
| BT Sniff | 50ms 간격 | 196.0uA |
| BT Sniff | 1s 간격 | 13.8uA |
| BLE ADV | 50ms 간격 | 228.7uA |
| BLE ADV | 1s 간격 | 15.7uA |
| BLE Connection | 50ms 간격 | 172.8uA |
| BLE Connection | 1s 간격 | 11.5uA |
| Scan | Inquiry Scan 또는 Page Scan | 36.8uA |
| Both Scan | Inquiry Scan 및 Page Scan | 64.0uA |
| Standby | - | 4.6uA |

</div>

<div align="center"><em>표 7.2-2: 프로세서 전류</em></div>

<div align="center" markdown>

| 워크로드 | 도메인 | 주파수 | 전류 | 효율 |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240MHz | 9.38mA | 30.92uA/MHz |
| CoreMark | HPSYS | 192MHz | 7.90mA | 30.92uA/MHz |
| CoreMark | HPSYS | 48MHz | 0.92mA | 30.92uA/MHz |
| CoreMark | LPSYS | 24MHz | 0.55mA | 15.13uA/MHz |
| WhileLoop | HPSYS | 240MHz | 7.54mA | 25.75uA/MHz |
| WhileLoop | HPSYS | 192MHz | 6.30mA | 25.75uA/MHz |
| WhileLoop | HPSYS | 48MHz | 0.70mA | 25.75uA/MHz |
| WhileLoop | LPSYS | 24MHz | 0.44mA | 10.63uA/MHz |

</div>

### 7.3 회로도 체크리스트

<div align="center"><em>표 7.3-1: 회로 설계 체크리스트</em></div>

<div align="center" markdown>

| 번호 | 점검 항목 |
| :-: | :--- |
| 1 | VDD_3V3 입력 범위는 2.97~3.6V입니다. 모듈 핀 가까이에 4.7uF 커패시터를 배치하십시오. |
| 2 | VDD_1V8 입력 범위는 1.7~1.95V입니다. 모듈 핀 가까이에 4.7uF 커패시터를 배치하십시오. |
| 3 | VDDIO 입력 범위는 1.7~3.6V입니다. 모듈 핀 가까이에 4.7uF 커패시터를 배치하십시오. |
| 4 | 모듈 I/O 인터페이스 레벨은 명시된 경우 3.3V이며, 연결되는 주변 장치의 레벨과 호환되어야 합니다. |
| 5 | 모듈 내부 플래시가 실장된 경우 PA06, PA07, PA08, PA09, PA10, PA11은 외부에서 사용할 수 없습니다. |
| 6 | SDIO와 MPI3는 I/O 리소스를 공유하므로 동시에 사용할 수 없습니다. |
| 7 | PA50, PA51, PB32, PB35는 MCU가 슬립 중일 때도 인터럽트를 받을 수 있습니다. |
| 8 | PB32는 active-high 10s 길게 누름 리셋을 지원합니다. 10k 풀다운을 추가하십시오. |
| 9 | GPADC_CHx로 표시된 핀은 0~3.3V 아날로그 입력을 지원합니다. |
| 10 | GPTIM으로 표시된 핀은 PWM 출력을 지원합니다. |
| 11 | TP 등의 인터페이스에는 ESD 보호 소자가 필요합니다. |
| 12 | LCD RGB 신호에는 33~100 ohm 직렬 저항이 필요합니다. |
| 13 | DBG_UART로 멀티플렉싱된 PA16과 PA17은 프로그램 플래싱/디버그 핀이며 100 ohm 직렬 저항이 필요합니다. |

</div>

### 7.4 보관, 취급, 조립

<div align="center"><em>표 7.4-1: 보관, 취급, 조립 요구 사항</em></div>

<div align="center" markdown>

| 항목 | 요구 사항 |
| :--- | :--- |
| 밀봉된 MBB 내 보관 | 40°C 미만, 90%RH 미만의 비응결 환경. |
| 습기 민감도 | MSL 3. |
| 진공 백 개봉 후 | 25±5°C / 60%RH에서 168시간 이내에 사용하거나, 재사용 전에 베이킹. |
| ESD HBM | ±2000V. |
| ESD CDM | ±500V. |
| 리플로 | SiFli는 모듈의 리플로를 1회만 거치기를 권장합니다. |
| 초음파 공정 | 초음파 용접이나 초음파 세척은 피하십시오. 진동으로 내부 크리스털이 손상되거나 성능이 저하될 수 있습니다. |

</div>

!!! info "그림 7.4-1: 리플로 온도 프로파일"
    DS5602 V0.3의 그림 9-1을 참조하십시오.

## 8. 관련 문서

<div align="center"><em>표 8-1: 관련 문서 및 제품</em></div>

<div align="center" markdown>

| 유형 | 항목 |
| :--- | :--- |
| 모듈 데이터시트 | [DS5602-SF32LB56-MOD 技术规格书 V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| 칩 사양 | SF32LB56x 칩 기술 사양 |
| 개발 보드 가이드 | SF32LB56-DevKit-LCD 사용자 가이드 |
| 칩 제품군 | SF32LB56xV 시리즈 |
| 모듈 | SF32LB56-MOD |
| 개발 보드 | SF32LB56-DevKit-LCD |

</div>

## 9. 부록 { #appendices }

### 9.1. 부록 A. 핀 계획 참고 자료 { #appendix-a-pin-planning-reference }

DS5602 V0.3은 89핀 전체 정의 표와 상면도 핀 배치를 제공합니다. 아래 표는 회로도 리스크, 부트/디버그 접근, 공유 리소스 계획에 가장 자주 영향을 주는 핀과 신호 그룹을 강조합니다.

<div align="center"><em>표 9.1-1: 핵심 핀 및 신호 그룹</em></div>

<div align="center" markdown>

| 핀 / 그룹 | 기능 / 제약 |
| :--- | :--- |
| 6번 핀 PB17 | UART4_TXD, 기본 출력/플래싱/디버그 UART TX. |
| 7번 핀 PB16 | UART4_RXD, 기본 출력/플래싱/디버그 UART RX. |
| 25번 핀 BOOT_MODE | High: 다운로드 모드, low: 사용자 모드. |
| 26번 핀 VDD_3V3 | 3.3V 레일, 동작 범위 2.97~3.6V. |
| 27번 핀 VDD_1V8 | 1.8V 레일, 동작 범위 1.7~1.95V. |
| 29번 핀 VDDIO | I/O 레일, 동작 범위 1.7~3.6V. |
| 43/44번 핀 | AU_DACP / AU_DACN 차동 DAC 출력. |
| 46번 핀 MIC_BIAS | 마이크 바이어스 출력. |
| 47번 핀 MIC_ADC_IN | 아날로그 마이크 ADC 입력. |
| 67~72번 핀 PA06~PA11 | 기본적으로 내부 플래시에 연결되며 외부에서 사용할 수 없음. |
| 79번 핀 PB13 | SWDIO 디버그/플래싱. |
| 80번 핀 PB15 | SWCLK 디버그/플래싱. |
| PA50, PA51, PB32, PB35 | 슬립 중 인터럽트가 가능한 웨이크 핀. |
| PA00~PA11 | VDDIO와 무관하게 인터페이스 레벨이 3.3V로 고정됨. |

</div>

## 10. 개정 이력 { #appendix-b-revision-history }

### 10.1. 가이드 개정 이력 { #guide-revision-history }

<div align="center"><em>표 10.1-1: 가이드 개정 이력</em></div>

<div align="center" markdown>

| 버전 | 날짜 | 비고 |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | DS5602-SF32LB56-MOD V0.3을 기반으로 한 SF32LB56-MOD 모듈 하드웨어 설계 가이드 초판. |

</div>

### 10.2. 원본 데이터시트 개정 이력 { #source-datasheet-revision-history }

<div align="center"><em>표 10.2-1: 원본 데이터시트 개정 이력</em></div>

<div align="center" markdown>

| 날짜 | 버전 | 릴리스 노트 |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | 4장의 오디오 ADC 및 DAC 설명을 갱신함. |
| 2025-02 | 0.2 | 모듈 핀 및 관련 정보를 갱신함. |
| 2025-01 | 0.1 | 초안 버전. |

</div>
