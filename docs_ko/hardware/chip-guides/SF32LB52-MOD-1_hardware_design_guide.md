---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB52-MOD-1 Bluetooth MCU 모듈의 하드웨어 설계 가이드로, 전원, 인터페이스, PCB 통합 가이드를 다룹니다."
tags:
    - 하드웨어
    - 모듈
---

# SF32LB52-MOD-1 하드웨어 설계 가이드

## 1. 개요

**SF32LB52-MOD-1**은 SiFli의 SF32LB525UC6 칩(Arm Cortex-M33 STAR-MC1 듀얼 코어, 최대 240MHz)을 기반으로 한 인증 완료 범용 저전력 Bluetooth MCU 모듈입니다. 48MHz 크리스털, 선택 사양인 32.768kHz 크리스털, 선택 사양인 패키지 내장 64Mb OPI-PSRAM 다이를 27.9 × 18.0 × 3.1mm 크기의 68핀 표면 실장 패키지 하나에 통합했습니다.

이 가이드는 핀 정의, 주변 장치 인터페이스, 전기적 특성, 전원 요구 사항, 레퍼런스 회로도, 회로도 설계 체크리스트, 기구 치수와 PCB 풋프린트, 제품 취급 요구 사항 등 모듈 수준의 하드웨어 통합을 다룹니다. SiFli 데이터시트 **DS5203-SF32LB52-MOD-1 V0.3**을 기반으로 합니다.

기반 칩 아키텍처(코어, 그래픽, 메모리 서브시스템, 주변 장치에 대한 더 자세한 내용)는 [SF32LB52x](../../sf32-products/chips/SF32LB52x.md)와 [SF32LB52x 하드웨어 설계 가이드](../chip-guides/SF32LB52x_hardware_design_guide.md)를 참조하십시오.

!!! note "출처 및 그림 처리"
    이 가이드는 모듈 고유의 기술 데이터에 대해 **DS5203-SF32LB52-MOD-1 V0.3**을 따릅니다. 데이터시트의 일부 핀 배치도, 회로도, 기구 도면은 래스터 이미지이므로 여기에서 다시 그리지 않고 참조만 합니다. 아래의 그림과 표 번호는 이 사이트의 가이드별 번호 체계를 따르며, 수록하지 않은 다이어그램의 캡션에는 공식 데이터시트의 해당 그림 번호를 표기합니다.

## 2. 설계 요약

### 2.1 모듈 변형

<div align="center"><em>표 2.1-1: 모듈 변형(variant)</em></div>

<div align="center" markdown>

| 모듈 코드 | 플래시 | PSRAM | 온도 | 치수 (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16MB QSPI-NOR | 8MB OPI-PSRAM | -40~85°C | 27.9 × 18.0 × 3.1 |

</div>

### 2.2 주요 사양

<div align="center"><em>표 2.2-1: 주요 사양</em></div>

<div align="center" markdown>

| 항목 | 사양 |
| :--- | :--- |
| 애플리케이션 코어(HCPU) | Arm Cortex-M33 STAR-MC1, 최대 240MHz, 512KB SRAM |
| 저전력 코어(LCPU) | Arm Cortex-M33 STAR-MC1, 최대 24MHz, 64KB SRAM |
| 무선 | 듀얼 모드 Bluetooth 5.3, BLE Audio 지원 |
| 그래픽 | ePicasso 2.0 2D/2.5D 엔진, 최대 512×512, eZip 2.0 무손실 압축 해제 |
| 오디오 | 24비트 오디오 DAC 1개, 24비트 오디오 Sigma-Delta ADC 1개 |
| 스토리지 | 선택 사양인 패키지 내장 OPI-PSRAM(144MHz), 외부 MPI(QSPI) 1개, SD/SDIO/eMMC 1개 |
| 패키지 | 68핀, 27.9 × 18.0 × 3.1mm |
| 전원 | VSYS 3.2–4.7V(리튬 이온) 또는 3.7–4.7V(DCDC/LDO, 3.8V 권장) |
| 안테나 | PCB 온보드 안테나 또는 IPEX 커넥터를 통한 외부 안테나(부품 번호에 따라 다름) |
| 동작 온도 | -40~85°C |

</div>

## 3. 기능 블록 다이어그램

이 모듈은 SF32LB525UC6 칩, 48MHz 크리스털, 선택 사양인 32.768kHz 크리스털, (이 SKU의 경우) 패키지 내장 64Mb OPI-PSRAM 다이를 RF 매칭 회로 및 안테나 급전부와 함께 통합합니다.

!!! info "그림 3-1: 기능 블록 다이어그램"
    이 다이어그램은 공식 데이터시트의 그림 2-1을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

## 4. 핀 정의

### 4.1 핀 배치도

모듈은 가장자리를 따라 68개의 핀을 노출합니다. 핀 1은 안테나 영역에 가까운 모서리에 표시되며, 핀 번호는 패키지를 따라 시계 반대 방향으로 매겨집니다.

!!! info "그림 4.1-1: 핀 배치도, 상면도"
    이 다이어그램은 공식 데이터시트의 그림 3-1을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

### 4.2 핀 정의 표

모듈에는 총 68개의 핀이 있으며, 아래 표에 설명되어 있습니다.

<div align="center"><em>표 4.2-1: 핀 정의 표</em></div>

<div align="center" markdown>

| 이름 | 번호 | 유형 | 기본 MUX | 기본 I/O | 기능 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | 그라운드 | P | 그라운드 |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *모듈 내부 32K 크리스털이 실장된 경우 PA23 핀은 외부에서 사용할 수 없습니다* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *모듈 내부 32K 크리스털이 실장된 경우 PA22 핀은 외부에서 사용할 수 없습니다* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | 3.3V 전원 출력 |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | 그라운드 | P | 그라운드 |
| VSYS | 27 | P | VSYS | P | 주 전원 입력. 리튬 이온 배터리 전원 범위는 3.2–4.7V이며, DCDC/LDO(리튬 이온 외)로 공급하는 경우 범위는 3.7–4.7V이고 3.8V를 권장합니다 |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | 오디오 DAC 차동 출력, 양극 |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | 오디오 DAC 차동 출력, 음극 |
| GND | 35 | P | 그라운드 | P | 그라운드 |
| MIC_BIAS | 36 | P | MIC_BIAS | P | 마이크 바이어스 전압 |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | 아날로그 오디오 입력 |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | 그라운드 | P | 그라운드 (13개 핀) |
| VBATS | 61 | P | VBAT | P | 배터리 전압 감지 입력 |
| NC | 62 | — | NC | — | 연결 안 함 |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*범례: P = 전원, I = 입력, O = 출력, T = 고임피던스로 설정 가능, AO = 오디오 출력, AI = 오디오 입력.*

!!! note
    핀 29(DBG_UART_TXD)와 핀 30(DBG_UART_RXD)은 기본 로그, 프로그램 디버그, 프로그램 플래싱 포트입니다.

### 4.3 물리 핀 설명

데이터시트의 물리 핀 설명 그림은 SF32LB525UC6 다이 윤곽 위에 SDIO, SPI, I2C, UART, GPTIM, LCD 인터페이스, GPADC, MPI, 아날로그 오디오, 외부 32K 오실레이터, 외부 웨이크업, SWD/디버그 UART의 기능군별로 핀을 묶어 보여 줍니다. 호스트 PCB에서 신호 그룹을 배치할 때 위의 핀 정의 표와 함께 사용하십시오.

!!! info "그림 4.3-1: 물리 핀 설명"
    이 다이어그램은 공식 데이터시트의 그림 3-2를 참조하십시오. 이 가이드에는 수록하지 않았습니다.

## 5. 주변 장치

### 5.1 통신 인터페이스

위 표에서 `PAxx_I2C_UART`로 표시된 핀은 I2C 또는 UART 중 하나로 설정할 수 있습니다. 데이터시트는 설정 가능한 최대 개수를 I2C 인터페이스 4개, UART 인터페이스 3개로 명시합니다.

!!! important "데이터시트의 주변 장치 개수 불일치"
    같은 데이터시트가 뒷부분에서는 I2C1–I2C7과 UART1–UART6을 열거합니다. 이 목록은 명시된 최대 개수인 I2C 4개, UART 3개와 충돌합니다. 정확한 모듈/SoC 구성에서 사용할 수 있는 주변 장치 개수는 SiFli에 확인하십시오. 열거된 컨트롤러 번호를 모두 동시에 사용할 수 있다는 근거로 받아들이지 마십시오.

**UART** — 전이중, 최대 6Mbps 보레이트, 설정 가능한 데이터 형식, 하드웨어 흐름 제어(CTS/RTS), DMA 다중 패킷 TX/RX를 지원합니다. UART1–3은 HPSYS에, UART4–6은 LPSYS에 있습니다.

**I2C** — Master와 Slave를 모두 지원하며, 8바이트 FIFO, DMA 지원, 표준(100kbps), 고속(400kbps), 고속 플러스(1Mbps), 초고속(3.4Mbps) 모드, Master로서의 7비트/10비트 주소 지정, 설정 가능한 디지털 디글리치 필터를 갖췄습니다. I2C1–4는 HPSYS에, I2C5–7은 LPSYS에 있습니다.

**SPI** — SSP/SPI(전이중, Master 또는 Slave) 및 Microwire(반이중, Master 전용) 형식을 지원합니다. 4–32비트 데이터 폭, 설정 가능한 클럭 극성/위상(SPO/SPH), 설정 가능한 칩 셀렉트 극성, 32비트 × 16엔트리 FIFO, DMA 지원, 최대 48MHz 클럭을 갖췄습니다.

**USB2.0 FS** — 설정 가능한 엔드포인트, 서스펜드/재개, 동적 FIFO 크기 조정, 세션 요청 및 호스트 협상 프로토콜 지원, 통합 USB2.0 FS PHY를 갖춘 풀 스피드 Host/Device 포트 1개입니다.

**MPI (Memory Peripheral Interface)** — SPI NOR 플래시(1/2/4선)와 SPI NAND 플래시(1/2/4선)를 지원하며, 레지스터 모드와 메모리 매핑 모드 접근이 하드웨어에 의해 자동으로 전환됩니다. 모듈의 MPI2 인터페이스에는 외부 SPI NOR/NAND 플래시를 연결할 수 있습니다. 모듈 내부에 플래시가 이미 실장된 경우 MPI2의 외부 신호 6개(PA12, PA13, PA14, PA15, PA16, PA17)는 외부에서 사용할 수 없습니다.

**SD/SDIO/eMMC** — SD 3.0, SDIO 3.0, eMMC 4.5.1을 준수하며 SDSC/SDHC/SDXC/SDHS 카드, SDR12/25/50, 1선 및 4선 SDR 모드, 2KB FIFO, DMA 데이터 이동, 최대 48MHz(DDR 없음)를 지원합니다. 참고: SDIO 인터페이스는 MPI2와 IO를 공유하므로 두 인터페이스를 동시에 사용할 수 없습니다.

**I2S** — Master/Slave, 전이중, 좌측 정렬/우측 정렬/표준 형식, 8비트 및 16비트 모노/스테레오, 최대 24비트 PCM 폭을 지원합니다.

**LCD 인터페이스** — DBI 직렬 SPI 모드(3선/4선, 듀얼/쿼드 데이터선)와 병렬 8080 모드(8/16/24비트 버스 폭)를 지원합니다. 모드에 따라 RGB332/RGB444/RGB565/RGB666/RGB888 색상 형식을 지원합니다.

### 5.2 아날로그 신호 처리

**12비트 GPADC** — SAR ADC, 최대 샘플링 속도 4MS/s, 입력 범위 0–3.3V 싱글 엔디드 / ±2.1V 차동, 싱글 엔디드 채널 7개 + 배터리 전압 채널 1개(또는 차동 쌍 3개), 단일/연속 측정 모드, 측정당 설정 가능한 타임 슬롯 4개, 소프트웨어/하드웨어 트리거, DMA 지원을 갖췄습니다.

**온도 센서** — 해상도 0.2°C, 범위 -40°C~125°C, 정확도 ±3°C, 폴링 또는 인터럽트 방식 읽기를 지원합니다.

**오디오 DAC** — 24비트 DAC 출력 경로 1개, 8kHz–48kHz 샘플링 속도, 차동 출력을 지원합니다.

**오디오 PLL** — 48MHz/2^18 해상도의 Fractional-N 클럭 생성을 제공하며, 48MHz, 32.768kHz, 44.1kHz 기반 샘플링 속도를 지원합니다.

**오디오 ADC** — 24비트 Sigma-Delta ADC 입력 경로 1개, 8kHz–48kHz 샘플링 속도를 지원합니다.

## 6. 전기적 특성

### 6.1 절대 최대 정격

아래 표의 값을 초과하면 모듈이 영구적으로 손상될 수 있습니다. 이 값은 스트레스 정격일 뿐이며, §6.2의 권장 동작 조건을 벗어난 기능 동작을 보장하지 않습니다. 절대 최대 조건에 장시간 노출되면 모듈 신뢰성이 저하될 수 있습니다.

<div align="center"><em>표 6.1-1: 절대 최대 정격</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | 전원 핀 전압 | -0.3 | 4.7 | V |
| Tstore | 보관 온도 | -40 | 125 | °C |

</div>

### 6.2 권장 동작 조건

<div align="center"><em>표 6.2-1: 권장 동작 조건</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 표준 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | 리튬 이온 배터리 전원 | 3.2 | - | 4.7 | V |
| VSYS | DCDC/LDO를 통한 리튬 이온 외 전원 | 3.7 | 3.8 | 4.7 | V |
| TA | 동작 온도 | -40 | - | 85 | °C |

</div>

### 6.3 DC 전기적 특성 (3.3V, 25°C)

<div align="center"><em>표 6.3-1: DC 전기적 특성 (3.3V, 25°C)</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 표준 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 핀 커패시턴스 | 2.5 | 3 | 3.5 | pF |
| VIH | 입력 High 전압 | 0.7×VDD | - | VDD | V |
| VIL | 입력 Low 전압 | VSS | - | 0.3×VDD | V |
| IIH | 입력 High 전류 | - | 10 | 40 | nA |
| IIL | 입력 Low 전류 | - | 10 | 40 | nA |
| VOH | 출력 High 전압 (고임피던스 부하) | 0.8×VDD | - | VDD | V |
| VOL | 출력 Low 전압 (고임피던스 부하) | VSS | - | 0.2×VDD | V |
| IOH | 출력 High 구동 전류 | 24 | 30 | 38 | mA |
| IOL | 출력 Low 구동 전류 | 24 | 30 | 38 | mA |
| RPU | 내부 풀업 (Vpad=0.8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | 내부 풀다운 (Vpad=0.2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | 리셋 해제 전압 | 0.7×VDD | - | VDD | V |
| VIL_nRST | 리셋 인가 전압 | VSS | - | 0.3×VDD | V |

</div>

VDD는 I/O 전원 레일이며, VOH/VOL은 고임피던스 부하 조건에서 측정한 값입니다.

### 6.4 소비 전력

<div align="center"><em>표 6.4-1: Bluetooth 및 BLE 평균 전류 (3.8V 전원)</em></div>

<div align="center" markdown>

| 모드 | 간격 | @0dBm | @4dBm | @10dBm | 단위 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 129.5 | 135.6 | 160.9 | µA |
| BT Sniff (attempt=1) | 1s | 6.0 | 6.3 | 7.6 | µA |
| BLE ADV | 50ms | 171.6 | 217.6 | 298.3 | µA |
| BLE ADV | 1s | 8.9 | 9.5 | 17.0 | µA |
| BLE Connection | 50ms | 95.0 | 105.0 | 118.7 | µA |
| BLE Connection | 1s | 4.1 | 4.6 | 9.1 | µA |
| Scan (Inquiry or Page) | — | 33.4 | — | — | µA |
| Both Scan | — | 67.3 | — | — | µA |
| Sleep | — | 20.0 | — | — | µA |

</div>

<div align="center"><em>표 6.4-2: 프로세서 소비 전력 (3.8V 전원)</em></div>

<div align="center" markdown>

| 클럭 | 전류 (µA) | 증가분 (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 듀얼 모드 Bluetooth RF 성능

Bluetooth 5.3을 지원하며 4.2/4.1/4.0과 하위 호환됩니다. 동작 채널 중심 주파수는 2402–2480 MHz입니다.

**BLE 송신기(1Mbps)**: 최대 출력 19dBm, 출력 제어 범위 -20~19dBm, Δf1avg = 250kHz(표준), Δf2max = 210kHz(표준)입니다. 이 값은 주파수 편차 값이며(데이터시트는 항목을 최대/최소 변조로 표기합니다) 무차원 변조 지수가 아닙니다. 초기 반송파 주파수 허용 오차는 ±20kHz(표준)입니다.

**BLE 수신기(1Mbps)**: 감도는 30.8% PER에서 -100dBm(dirty off) / -99.3dBm(dirty on)이며, 동일 채널 C/I는 7dB입니다.

**Classic BT (Basic Data Rate)**: 최대 송신 출력 18dBm, 수신기 감도는 0.1% BER에서 -96.3dBm(dirty off) / -94dBm(dirty on)입니다.

**Classic BT (Enhanced Data Rate)**: 최대 송신 출력 13dBm, π/4-DQPSK 수신기 감도 -95.5dBm, 8DPSK 수신기 감도 -88.5dBm입니다.

모든 BLE 1Mbps/2Mbps TX/RX 성능과 Classic BT BR/EDR TX/RX 성능에 대한 전체 최소/표준/최대 표는 공식 데이터시트의 §5.5에 있습니다.

## 7. 모듈 전원

모듈의 주 전원 입력은 **VSYS** 하나이며, 리튬 이온/리튬 폴리머 배터리(3.2–4.7V)에서 직접 공급하거나 DCDC/LDO 레귤레이터(3.7–4.7V, 3.8V 권장)로 공급할 수 있습니다.

**VBATS**는 배터리 전압 감지 핀으로, 내부 ADC가 0–4.7V 범위에서 샘플링합니다. VBATS에는 외부 저항 분압기를 사용하지 마십시오. 측정할 신호를 핀에 직접 연결하십시오.

**VDD33_VOUT2**는 모듈 내부 3.3V LDO의 출력으로 외부 주변 장치에 최대 150mA를 공급할 수 있으며, 이 레일의 총 커패시턴스는 7.4µF를 초과하면 안 됩니다.

## 8. 레퍼런스 회로도 및 핀 할당

데이터시트는 SF32LB52-MOD-1 기반 개발 보드의 전체 레퍼런스 회로도를 제공하며, 여기에는 전원, 리셋, JTAG/SWD, UART, SDIO, LCD, 오디오 회로가 포함됩니다.

!!! info "그림 8-1: 개발 보드 레퍼런스 회로도"
    이 다이어그램은 공식 데이터시트의 그림 7-2~7-6을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

데이터시트는 해당 레퍼런스 보드의 권장 핀 할당 표도 제공합니다.

!!! info "그림 8-2: 레퍼런스 보드의 권장 핀 할당"
    이 다이어그램은 공식 데이터시트의 그림 7-7을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

이를 양산 회로도의 시작점으로 사용하고, 제품의 주변 장치 구성에 맞게 핀 선택을 조정하십시오.

## 9. 회로도 설계 체크리스트

<div align="center"><em>표 9-1: 회로도 설계 체크리스트</em></div>

<div align="center" markdown>

| # | 점검 항목 |
| :-: | :--- |
| 1 | VSYS는 리튬 이온 배터리에 직접 연결할 수 있으며, DCDC/LDO를 통해 공급하는 경우 3.8V를 권장합니다. VBATS는 배터리 전압 감지 핀(0–4.7V 범위)입니다. 외부 저항 분압기를 사용하지 말고, 측정할 신호를 VBATS에 직접 연결하십시오. |
| 2 | VSYS 핀 근처에 4.7µF 커패시터 하나와 0.1µF 커패시터 하나를 배치하십시오. |
| 3 | VBATS 핀 근처에 0.1µF 커패시터 하나를 배치하십시오. |
| 4 | VDD33_VOUT2는 3.3V LDO 출력이며 최대 전류는 150mA입니다. 외부 부하가 이를 초과하지 않게 하십시오. |
| 5 | VDD33_VOUT2의 총 커패시턴스는 ≤ 7.4µF여야 합니다. |
| 6 | 모듈의 IO 인터페이스 레벨은 3.3V이므로, 연결하는 모든 주변 장치도 3.3V 로직 레벨을 사용해야 합니다. |
| 7 | 모듈 내부에 32K 크리스털이 실장된 경우 PA22와 PA23은 외부에서 사용할 수 없습니다. |
| 8 | 모듈 내부에 플래시가 이미 실장된 경우 MPI2 신호 6개(PA12, PA13, PA14, PA15, PA16, PA17)는 외부에서 사용할 수 없습니다. |
| 9 | SDIO 인터페이스와 MPI2는 IO를 공유하므로 동시에 사용할 수 없습니다. |
| 10 | 핀 표에서 `#GPADC_CHx`로 표시된 핀은 0–3.3V 범위의 아날로그 입력을 지원합니다. |
| 11 | 핀 표에서 `PAxx_TIM`으로 표시된 핀은 PWM 출력을 지원합니다. |
| 12 | PA34는 10초 길게 누르기 리셋(액티브 High)을 지원합니다. 설계에 10kΩ 풀다운 저항을 추가하십시오. |
| 13 | 배터리와 터치 패널(TP) 인터페이스, 그리고 필요한 경우 외부에 노출되는 다른 인터페이스에 ESD 보호 부품을 위한 공간을 확보하십시오. |
| 14 | 프로그래밍/디버그용 DBG_UART로 다중화된 PA18/PA19에는 각각 100Ω 직렬 저항을 두는 것이 좋습니다. |

</div>

## 10. 모듈 치수 및 PCB 풋프린트

### 10.1 모듈 치수

모듈 크기는 27.9 × 18.0 × 3.1mm입니다.

!!! info "그림 10.1-1: 모듈 치수 — 상면, 측면, 하면도"
    이 다이어그램은 공식 데이터시트의 그림 8-1을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

### 10.2 권장 PCB 풋프린트

!!! info "그림 10.2-1: 권장 PCB 풋프린트"
    이 다이어그램은 공식 데이터시트의 그림 8-2를 참조하십시오. 이 가이드에는 수록하지 않았습니다.

### 10.3 외부 안테나 커넥터

외부 안테나를 지원하는 SKU의 모듈은 다음과 호환되는 1세대 커넥터 풋프린트를 사용합니다.

- Hirose U.FL 시리즈
- I-PEX MHFI 커넥터
- Amphenol AMC 커넥터

!!! info "그림 10.3-1: 외부 안테나 커넥터 치수"
    이 다이어그램은 공식 데이터시트의 그림 8-3을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

### 10.4 PCB 설계에서의 모듈 배치

최종 제품이 온보드 모듈 설계를 사용하는 경우, 방사 효율 저하를 막기 위해 모듈의 PCB 안테나 영역에 다른 부품이나 금속 영역이 겹치지 않도록 공간을 확보하십시오. 안테나 성능에 미치는 영향이 최소화되도록 호스트 보드에서 모듈의 위치를 계획하십시오.

권장 방법은 다음과 같습니다.

- 모듈의 안테나 영역을 호스트 보드 가장자리 밖으로 내밀고, 급전점을 보드 가장자리에 가깝게 두십시오.

!!! info "그림 10.4-1: 권장 모듈 배치"
    이 다이어그램은 공식 데이터시트의 그림 8-4를 참조하십시오. 이 가이드에는 수록하지 않았습니다.

- 안테나를 보드 가장자리 밖으로 내밀 수 없는 경우, PCB 안테나 주위에 최소 15mm의 금지 구역을 두어 구리 포어, 트레이스, 부품이 없게 하고, 가능하면 안테나 아래의 호스트 보드 소재를 잘라내십시오.

!!! info "그림 10.4-2: 안테나 금지 구역"
    이 다이어그램은 공식 데이터시트의 그림 8-5를 참조하십시오. 이 가이드에는 수록하지 않았습니다.

- 금지 구역 레이아웃에서도 안테나 급전점을 보드 가장자리에 가깝게 두십시오.
- 완성된 최종 제품 설계에서는 인클로저가 안테나에 미치는 영향을 평가하고, 완제품에서의 최종 통신 거리 테스트를 포함한 RF 검증을 수행하십시오.

## 11. 제품 취급

### 11.1 보관 조건

- 제품은 <40°C / 90%RH, 비응축 조건에서 방습 포장 봉투(MBB)에 밀봉하여 보관하십시오.
- 모듈 습기 민감도 등급(MSL): 3.
- 진공 포장을 개봉한 뒤에는 25±5°C / 60%RH에서 168시간 이내에 모듈을 사용해야 하며, 그렇지 않으면 생산 라인에 되돌리기 전에 베이킹해야 합니다.

### 11.2 정전기 방전(ESD)

- 인체 모델(HBM): ±2000V
- 소자 대전 모델(CDM): ±500V

### 11.3 리플로 프로파일

모듈은 리플로를 한 번만 거치는 것을 권장합니다.

!!! info "그림 11.3-1: 권장 리플로 온도 프로파일"
    이 다이어그램은 공식 데이터시트의 그림 9-1을 참조하십시오. 이 가이드에는 수록하지 않았습니다.

### 11.4 초음파 진동

SiFli 모듈이 초음파 용접 또는 초음파 세척 장비의 진동에 노출되지 않도록 하십시오. 초음파 진동은 모듈 내부 크리스털 오실레이터와 공진하여 크리스털 고장이나 오동작을 일으킬 수 있으며, 모듈이 동작하지 않거나 성능이 저하될 수 있습니다.

## 12. 관련 문서

- [DS5203-SF32LB52-MOD-1 데이터시트 (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [SF32LB52x 칩 소개](../../sf32-products/chips/SF32LB52x.md)
- [SF32LB52x 하드웨어 설계 가이드](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. 개정 이력

<div align="center"><em>표 13-1: 개정 이력</em></div>

<div align="center" markdown>

| 날짜 | 버전 | 비고 |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | 그림 2-1 업데이트 |
| 2025-03 | 0.2 | 전원 관련 설명 수정, 그림 3-1 및 6-3 업데이트 |
| 2024-12 | 0.1 | 초안 버전 |

</div>

이 가이드는 위의 데이터시트 내용을 기반으로 합니다. 공식적이고 가장 최신인 리비전은 공식 PDF를 참조하십시오.
