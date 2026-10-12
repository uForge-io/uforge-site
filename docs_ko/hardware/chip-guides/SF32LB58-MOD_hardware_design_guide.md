---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58-MOD Bluetooth MCU 모듈의 하드웨어 설계 가이드: 전원, 인터페이스, PCB 통합 지침입니다."
tags:
    - 하드웨어
    - 모듈
---

# SF32LB58-MOD 하드웨어 설계 가이드

## 1. 개요

**SF32LB58-MOD**는 SiFli의 SF32LB586VDD36 칩을 기반으로 한 범용 저전력 Bluetooth MCU 모듈입니다. 이 칩은 최대 240 MHz로 동작하는 트리플 코어 Arm Cortex-M33 STAR-MC1 프로세서를 통합합니다. 모듈에는 48 MHz 크리스털과 선택 사항인 32.768 kHz 크리스털이 포함됩니다. SKU에 따라 HPI-PSRAM, QSPI-NOR/NAND 플래시, eMMC 스토리지도 포함됩니다. 표면 실장형 모듈이며 핀은 138개, 크기는 24 × 24 × 3.1 mm입니다.

이 가이드는 모듈 수준의 하드웨어 통합을 다룹니다. 핀 정의, 주변 장치 인터페이스, 전기적 특성, 전원 공급 요구 사항, 레퍼런스 회로도, 회로 설계 체크리스트, 기구 치수와 PCB 풋프린트, 제품 취급 요구 사항이 포함됩니다. SiFli 데이터시트 **DS5802-SF32LB58-MOD V0.1**을 기반으로 합니다.

기반이 되는 칩 아키텍처(코어, 그래픽, 메모리 서브시스템, 주변 장치에 대한 더 자세한 내용)는 [SF32LB58x](../../sf32-products/chips/SF32LB58x.md)와 [SF32LB58x 하드웨어 설계 가이드](../chip-guides/SF32LB58x_hardware_design_guide.md)를 참조하십시오.

!!! note "출처와 그림 처리"
    이 가이드는 모듈 고유의 기술 데이터에 대해 **DS5802-SF32LB58-MOD V0.1**을 따릅니다. 데이터시트의 핀 배치, 회로도, 기구 도면 중 일부는 래스터 이미지이므로 여기에서 다시 그리지 않고 참조만 합니다. 아래의 그림 및 표 번호는 이 사이트의 가이드 자체 번호 체계를 따르며, 재현하지 않은 다이어그램의 캡션에는 공식 데이터시트의 해당 그림 번호를 표기합니다.

## 2. 빠른 설계 요약

### 2.1 모듈 변형

<div align="center"><em>표 2.1-1: 모듈 변형(variant)</em></div>

<div align="center" markdown>

| 모듈 코드 | 플래시 | PSRAM | 표준 플래시 | 온도 | 크기(mm) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16MB QSPI-NOR | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-A128R32N1 | 128MB QSPI-NAND | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-E4R32N1 | 4GB eMMC | 16+16MB HPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 24 × 24 × 3.1 |

</div>

### 2.2 주요 사양

<div align="center"><em>표 2.2-1: 주요 사양</em></div>

<div align="center" markdown>

| 항목 | 사양 |
| :--- | :--- |
| 애플리케이션 코어(HCPU/ACPU) | Arm Cortex-M33 STAR-MC1 2개, 최대 240MHz |
| 저전력 코어(LCPU) | Arm Cortex-M33 STAR-MC1, 최대 96MHz |
| SRAM | 2176KB(HCPU) + 512KB(ACPU) + 1056KB 리텐션 SRAM(LCPU) |
| 무선 | 듀얼 모드 Bluetooth 5.3, 4.2/4.1/4.0과 하위 호환, BLE 및 Classic Bluetooth 지원 |
| 그래픽 | ePicasso 2.0 + Vivante GCNanoUltraV, 최대 1024×1024, eZip 2.0, 하드웨어 JPEG 코덱 |
| 오디오 | 24비트 오디오 DAC 2개, 24비트 오디오 Sigma-Delta ADC 2개 |
| 스토리지 | MPI 5개(패키지 내장 + 외부), SD/SDIO/eMMC 2개 |
| 패키지 | 138핀, 24 × 24 × 3.1mm |
| 전원 공급 | VDD_3V3(2.97~3.6V), VDD_1V8(1.7~1.95V), VDDIOA/VDDIOA2/VDDIOB(1.7~3.6V) |
| 안테나 | 부품 번호에 따라 스탬프 홀 RF 급전 또는 IPEX 호환 커넥터를 통한 외부 안테나 |
| 동작 온도 | -40~85°C |

</div>

## 3. 기능 블록 다이어그램

이 모듈은 SF32LB586VDD36 칩, 48MHz 크리스털, 선택 사항인 32.768kHz 크리스털을 통합하며, SKU에 따라 패키지 내장 HPI-PSRAM, QSPI-NOR/NAND 플래시, eMMC와 함께 RF 매칭 회로 및 안테나 급전부를 포함합니다.

!!! info "그림 3-1: 기능 블록 다이어그램"
    이 다이어그램은 공식 데이터시트의 그림 2-1을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

## 4. 핀 정의

### 4.1 핀 배치도

이 모듈은 외곽을 따라 138개의 핀을 노출합니다.

!!! info "그림 4-1: 핀 배치도, 상면도"
    이 다이어그램은 공식 데이터시트의 그림 3-1을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

### 4.2 핀 정의 표

이 모듈은 총 138개의 핀을 가지며, 아래 표에 설명되어 있습니다.

<div align="center"><em>표 4.2-1: 핀 정의 표</em></div>

<div align="center" markdown>

| 이름 | 번호 | 유형 | 기본 MUX | 기본 I/O | 기능 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1.8/3.3V | P | PB 인터페이스 IO 전원 입력 |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2, #GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1: 다운로드 모드, 0: 사용자 모드 |
| RSTN | 12 | I | RSTN | I | 1: 사용자 모드, 0: 리셋 모드 |
| VDD_1V8 | 13 | P | 1.8V | P | 메인 MCU 및 패키지 내장 메모리 전원 입력 |
| GND | 14 | P | 그라운드 | P | 그라운드 |
| VDDIOA | 15 | P | 1.8/3.3V | P | PA 인터페이스 IO 전원 입력(PA00~PA11 제외) |
| VDD_3V3 | 16 | P | 3.3V | P | MCU 아날로그 전원 입력 |
| PA13 | 17 | I/O/T | GPIO_A13 | O | GPIO_A13, GPTIM1_CH2, ATIM1_BKIN, LCDC1_DPI_DE |
| PA15 | 18 | I/O/T | GPIO_A15 | O | GPIO_A15, GPTIM1_CH3, ATIM1_BKIN2, LCDC1_DPI_VSYNC |
| PA14 | 19 | I/O/T | GPIO_A14 | O | GPIO_A14, I2S1_LRCK, LCDC1_DPI_HSYNC |
| PA12 | 20 | I/O/T | GPIO_A12 | O | GPIO_A12, GPTIM1_CH1, ATIM1_CH4, LCDC1_DPI_CLK |
| PA67 | 21 | I/O/T | GPIO_A67 | O | GPIO_A67, #WKUP_PIN9, GPTIM2_CH3, ATIM1_CH1N, LCDC1_DPI_B7, LCDC1_JDI_B2 |
| PA65 | 22 | I/O/T | GPIO_A65 | O | GPIO_A65, #WKUP_PIN7, GPTIM2_CH2, ATIM1_CH1, LCDC1_DPI_B6, LCDC1_JDI_B1 |
| PA63 | 23 | I/O/T | GPIO_A63 | O | GPIO_A63, I2C2_SDA, USART1_CTS, #GPCOMP_N, LCDC1_DPI_B5 |
| PA62 | 24 | I/O/T | GPIO_A62 | O | GPIO_A62, I2C2_SCL, USART1_RTS, #GPCOMP_P, LCDC1_DPI_B4 |
| PA61 | 25 | I/O/T | GPIO_A61 | I | GPIO_A61, SPI1_CS, USART2_TXD, LCDC1_DPI_B3 |
| PA58 | 26 | I/O/T | GPIO_A58 | I | GPIO_A58, LPTIM1_ETR, GPTIM2_CH1, ATIM2_ETR, LCDC1_8080_DIO7, LCDC1_DPI_B2 |
| PA57 | 27 | I/O/T | GPIO_A57 | I | GPIO_A57, SPI1_DI, USART2_RXD, LCDC1_DPI_B1 |
| PA56 | 28 | I/O/T | GPIO_A56 | I | GPIO_A56, SPI1_CLK, USART2_CTS, LCDC1_DPI_B0 |
| PA55 | 29 | I/O/T | GPIO_A55 | O | GPIO_A55, GPTIM1_CH4, ATIM2_BKIN2, LCDC1_DPI_G7 |
| PA54 | 30 | I/O/T | GPIO_A54 | O | GPIO_A54, SPI1_DO, SPI1_DIO, USART2_RTS, LCDC1_DPI_G6 |
| PA53 | 31 | I/O/T | GPIO_A53 | I/O | GPIO_A53, LCDC1_DPI_G5 |
| PA50 | 32 | I/O/T | GPIO_A50 | O | GPIO_A50, MPI3_DIO0, LCDC1_8080_RD, LCDC1_SPI_DIO0, LCDC1_DPI_G4, LCDC1_JDI_G2 |
| PA48 | 33 | I/O/T | GPIO_A48 | O | GPIO_A48, MPI3_DIO1, LCDC1_8080_DC, LCDC1_SPI_DIO1, LCDC1_DPI_G3, LCDC1_JDI_G1 |
| PA47 | 34 | I/O/T | GPIO_A47 | O | GPIO_A47, MPI3_DIO2, LCDC1_8080_DIO0, LCDC1_SPI_DIO2, LCDC1_DPI_G2, LCDC1_JDI_R2 |
| PA46 | 35 | I/O/T | GPIO_A46 | O | GPIO_A46, MPI3_CLK, LCDC1_8080_WR, LCDC1_SPI_CLK, LCDC1_DPI_G1, LCDC1_JDI_R1 |
| PA45 | 36 | I/O/T | GPIO_A45 | O | GPIO_A45, MPI3_DIO3, LCDC1_8080_DIO1, LCDC1_SPI_DIO3, LCDC1_DPI_G0, LCDC1_JDI_ENB |
| PA44 | 37 | I/O/T | GPIO_A44 | O | GPIO_A44, MPI3_CS, LCDC1_8080_CS, LCDC1_SPI_CS, LCDC1_DPI_R7, LCDC1_JDI_HST |
| PA43 | 38 | I/O/T | GPIO_A43 | I/O | GPIO_A43, LCDC1_8080_TE, LCDC1_SPI_TE, LCDC1_DPI_R6, LCDC1_JDI_HCK |
| PA27 | 39 | I/O/T | GPIO_A27 | I/O | GPIO_A27, SCI_DIO, GPTIM2_CH3, ATIM2_CH2N, LCDC1_8080_DIO3, LCDC1_DPI_R5, LCDC1_JDI_XRST |
| PA26 | 40 | I/O/T | GPIO_A26 | O | GPIO_A26, SCI_CLK, GPTIM2_CH2, ATIM2_CH2, LCDC1_8080_DIO2, LCDC1_DPI_R4 |
| PA25 | 41 | I/O/T | GPIO_A25 | O | GPIO_A25, PDM2_CLK, SD1_CLKIN, GPTIM2_CH1, ATIM2_CH1N, LCDC1_DPI_R3, LCDC1_JDI_XRST |
| PA24 | 42 | I/O/T | GPIO_A24 | O | GPIO_A24, LCDC1_8080_RSTB, LCDC1_SPI_RSTB, LCDC1_DPI_R2 |
| PA23 | 43 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_CLK, I2S1_BCK, USART2_CTS, I2C2_SDA, LCDC1_DPI_R1 |
| PA22 | 44 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM2_DATA, GPTIM1_ETR, ATIM2_CH1, LCDC1_DPI_R0, LCDC1_JDI_VST |
| VDDIOA2 | 45 | P | 1.8/3.3V | P | PA00~PA11 IO 전원 입력 |
| GND | 46 | P | 그라운드 | P | 그라운드 |
| DSI_D0N | 47 | O | DSI_D0N | O | MIPI DSI 데이터 레인 0, 네거티브 |
| DSI_D0P | 48 | O | DSI_D0P | P | MIPI DSI 데이터 레인 0, 포지티브 |
| DSI_CLKN | 49 | O | DSI_CLKN | P | MIPI DSI 클럭 레인, 네거티브 |
| DSI_CLKP | 50 | O | DSI_CLKP | P | MIPI DSI 클럭 레인, 포지티브 |
| DSI_D1N | 51 | O | DSI_D1N | P | MIPI DSI 데이터 레인 1, 네거티브 |
| DSI_D1P | 52 | O | DSI_D1P | P | MIPI DSI 데이터 레인 1, 포지티브 |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | USB 차동 신호, 네거티브 |
| USB2_DP | 56 | I/O | USB2_DP | I/O | USB 차동 신호, 포지티브 |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | 그라운드 | P | 그라운드 |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | 오디오 DAC1 차동 출력, 네거티브 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | 오디오 DAC1 차동 출력, 포지티브 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | 마이크 바이어스 전압 |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | 오디오 ADC1 차동 입력, 네거티브 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | 오디오 ADC1 차동 입력, 포지티브 |
| GND | 71 | P | 그라운드 | P | 그라운드 |
| BT_ANT | 72 | I/O | BT_ANT | I/O | Bluetooth RF 신호 입력/출력 |
| PB51 | 73 | I/O/T | GPIO_B51 | I/O | GPIO_B51, PMIC_SDA, USART4_CTS, USART5_CTS, LPCOMP1_OUT |
| PB52 | 74 | I/O/T | GPIO_B52 | I/O | GPIO_B52, PMIC_SCLK, USART4_RTS, USART5_RTS, LPCOMP2_OUT |
| PB56 | 75 | I/O/T | GPIO_B56 | I/O | GPIO_B56, USART4_CTS, SPI3_CLK, #WKUP_PIN2 |
| PB57 | 76 | I/O/T | GPIO_B57 | I/O | GPIO_B57, USART4_RTS, SPI3_DO, SPI3_DIO, #WKUP_PIN3 |
| PB58 | 77 | I/O/T | GPIO_B58 | I/O | GPIO_B58, USART6_RXD, SPI3_DI, #WKUP_PIN4 |
| PB59 | 78 | I/O/T | GPIO_B59 | I/O | GPIO_B59, USART6_TXD, SPI3_CS, #WKUP_PIN5 |
| PA93 | 79 | I/O/T | GPIO_A93 | I/O | GPIO_A93, I2C3_SDA, USART3_TXD, USART3_RTS |
| PA92 | 80 | I/O/T | GPIO_A92 | I/O | GPIO_A92, I2C3_SCL, USART3_RXD, USART3_CTS |
| PA91 | 81 | I/O/T | GPIO_A91 | I/O | GPIO_A91, I2S2_BCK, GPTIM1_ETR, ATIM2_CH2N, LCDC1_SPI_DIO0, LCDC1_8080_RD, LCDC1_JDI_EXTCOMIN |
| PA90 | 82 | I/O/T | GPIO_A90 | I/O | GPIO_A90, I2S2_MCLK, GPTIM1_CH4, ATIM2_CH2, LCDC1_SPI_CLK, LCDC1_8080_WR, LCDC1_JDI_DISP |
| PA88 | 83 | I/O/T | GPIO_A88 | I/O | GPIO_A88, LCDC1_SPI_CS, LCDC1_8080_CS |
| PA86 | 84 | I/O/T | GPIO_A86 | I/O | GPIO_A86, I2S2_SDI, GPTIM1_CH3, ATIM2_CH1N, LCDC1_SPI_DIO3, LCDC1_8080_DIO1, LCDC1_JDI_SO |
| PA84 | 85 | I/O/T | GPIO_A84 | I/O | GPIO_A84, I2S2_LRCK, GPTIM1_CH2, ATIM2_CH1, LCDC1_SPI_DIO2, LCDC1_8080_DIO0, LCDC1_JDI_SCLK |
| PA82 | 86 | I/O/T | GPIO_A82 | I/O | GPIO_A82, I2S2_SDO, GPTIM1_CH1, ATIM1_CH3N, LCDC1_SPI_DIO1, LCDC1_8080_DC, LCDC1_JDI_SCS |
| PA60 | 87 | I/O/T | GPIO_A60 | I/O | GPIO_A60, I2C4_SCL, USART1_RXD, USART3_CTS |
| PA59 | 88 | I/O/T | GPIO_A59 | I/O | GPIO_A59, I2C4_SDA, USART1_TXD, USART3_RTS |
| PA52 | 89 | I/O/T | SWDIO | I/O | SWDIO, GPIO_A52, GPTIM1_CH3, ATIM2_BKIN, LCDC1_8080_DIO6 |
| PA51 | 90 | I/O/T | SWCLK | O | SWCLK, GPIO_A51, GPTIM1_CH2, ATIM2_CH4, LCDC1_8080_DIO5 |
| PA42 | 91 | I/O/T | GPIO_A42 | I/O | GPIO_A42, GPTIM2_CH4, ATIM2_CH3, LCDC1_8080_DIO4 |
| PA20 | 92 | I/O/T | GPIO_A20 | I/O | GPIO_A20, USART3_RXD, SPI1_DI, USART2_CTS |
| PA21 | 93 | I/O/T | GPIO_A21 | I/O | GPIO_A21, USART3_TXD, SPI1_DO, USART2_RTS |
| PA29 | 94 | I/O/T | GPIO_A29 | I/O | GPIO_A29, USART2_RXD, SPI1_CS, I2C2_SDA |
| PA28 | 95 | I/O/T | GPIO_A28 | I/O | GPIO_A28, USART2_TXD, SPI1_CLK, I2C2_SCL |
| PA18 | 96 | I/O/T | GPIO_A18 | I/O | GPIO_A18, PDM1_DATA, I2S1_SDI, USART2_RTS, I2C2_SCL, LCDC1_DPI_SD |
| PA02 | 97 | I/O/T | GPIO_A02 | I/O | GPIO_A02, SD1_CLKIN, CAN2_RXD, ATIM1_CH1N, USART3_RXD |
| PA11 | 98 | I/O/T | GPIO_A11 | I/O | GPIO_A11, SCI_RST, CAN2_TXD, I2C1_SDA, ATIM1_CH3N, USART3_TXD |
| PA08 | 99 | I/O/T | GPIO_A08 | I/O | GPIO_A08, SD1_DIO6, SCI_DIO, USART2_RXD, ATIM1_CH3 |
| PA07 | 100 | I/O/T | GPIO_A07 | I/O | GPIO_A07, SD1_DIO4, SCI_CLK, USART2_TXD, ATIM1_CH2N |
| PA10 | 101 | I/O/T | GPIO_A10 | I/O | GPIO_A10, SD1_CMD, MPI4_CS |
| PA09 | 102 | I/O/T | GPIO_A09 | I/O | GPIO_A09, SD1_CLK, MPI4_CLK |
| PA06 | 103 | I/O/T | GPIO_A06 | I/O | GPIO_A06, SD1_DIO3, MPI4_DIO3 |
| PA04 | 104 | I/O/T | GPIO_A04 | I/O | GPIO_A04, SD1_DIO1, MPI4_DIO1 |
| PA05 | 105 | I/O/T | GPIO_A05 | I/O | GPIO_A05, SD1_DIO0, MPI4_DIO0 |
| PA01 | 106 | I/O/T | GPIO_A01 | I/O | GPIO_A01, SD1_DIO2, MPI4_DIO2 |
| PB10 | 107 | I/O/T | GPIO_B10 | I/O | GPIO_B10, LCDC2_JDI_HST, LCDC2_SPI_CLK, USART6_RXD, GPTIM5_CH3 |
| PB09 | 108 | I/O/T | GPIO_B09 | I/O | GPIO_B09, LCDC2_JDI_R1, LCDC2_SPI_DIO0, USART6_TXD, GPTIM5_CH2, WLAN_ACTIVE |
| PB08 | 109 | I/O/T | GPIO_B08 | I/O | GPIO_B08, LCDC2_JDI_G1, LCDC2_SPI_CS, GPTIM5_CH1, BT_ACTIVE |
| PB06 | 110 | I/O/T | GPIO_B06 | I/O | GPIO_B06, LCDC2_JDI_R2, LCDC2_SPI_DIO3, LCDC2_JDI_SO, GPTIM4_CH3, USART6_CTS |
| PB04 | 111 | I/O/T | GPIO_B04 | I/O | GPIO_B04, LCDC2_JDI_G2, LCDC2_SPI_DIO2, LCDC2_JDI_DISP, GPTIM4_CH1, USART4_CTS |
| PB03 | 112 | I/O/T | GPIO_B03 | I/O | GPIO_B03, LCDC2_JDI_B2, LCDC2_SPI_DIO1, LCDC2_JDI_SCS, GPTIM3_CH4, USART4_RTS |
| PB02 | 113 | I/O/T | GPIO_B02 | I/O | GPIO_B02, LCDC2_JDI_B1, LCDC2_SPI_TE, LCDC2_JDI_SCLK, GPTIM3_CH3 |
| PB01 | 114 | I/O/T | GPIO_B01 | I/O | GPIO_B01, I2C7_SCL, USART6_TXD, GPTIM3_CH2, LPTIM3_OUT |
| PB00 | 115 | I/O/T | GPIO_B00 | I/O | GPIO_B00, I2C7_SDA, USART6_RXD, GPTIM3_CH1, LPTIM3_IN |
| PB23 | 116 | I/O/T | GPIO_B23 | I/O | GPIO_B23, USART5_CTS, SPI3_DO, SPI3_DIO, GPTIM4_CH2 |
| PB26 | 117 | I/O/T | GPIO_B26 | I/O | GPIO_B26, USART5_RTS, SPI3_CS, GPTIM5_CH1 |
| PB28 | 118 | I/O/T | GPIO_B28 | I/O | GPIO_B28, I2C6_SCL, USART6_RXD |
| PB29 | 119 | I/O/T | GPIO_B29 | I/O | GPIO_B29, I2C6_SDA, USART6_TXD |
| PB24 | 120 | I/O/T | GPIO_B24 | I/O | GPIO_B24, I2S3_SDO, GPTIM4_CH3 |
| PB27 | 121 | I/O/T | GPIO_B27 | I/O | GPIO_B27, SPI4_CLK, I2S3_SDI, GPTIM5_CH2 |
| PB31 | 122 | I/O/T | GPIO_B31 | I/O | GPIO_B31, SPI4_DI, I2S3_LRCK, AUD_CLK_EXT, GPTIM5_CH4 |
| PB30 | 123 | I/O/T | GPIO_B30 | I/O | GPIO_B30, SPI4_DO, I2S3_BCK, SPI4_DIO, GPTIM5_CH3 |
| PB34 | 124 | I/O/T | GPIO_B34 | I/O | GPIO_B34, SPI4_CS, I2S3_MCLK |
| PB39 | 125 | I/O/T | GPIO_B39 | I/O | GPIO_B39, USART6_RTS, GPTIM3_CH4 |
| PB38 | 126 | I/O/T | GPIO_B38 | I/O | GPIO_B38, USART6_CTS, GPTIM3_CH3 |
| PB47 | 127 | I/O/T | GPIO_B47 | I/O | GPIO_B47, I2C5_SDA, USART6_RXD, GPTIM5_CH2 |
| PB48 | 128 | I/O/T | GPIO_B48 | I/O | GPIO_B48, I2C5_SCL, USART6_TXD, GPTIM5_CH3 |
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | 오디오 DAC2 차동 출력, 네거티브 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | 오디오 DAC2 차동 출력, 포지티브 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | 오디오 ADC2 차동 입력, 네거티브 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | 오디오 ADC2 차동 입력, 포지티브 |
| GND | 133~138 | P | 그라운드 | P | 그라운드(6핀) |

</div>

*범례: P = 전원, I = 입력, O = 출력, T = 하이 임피던스로 구성 가능, AO = 오디오 출력, AI = 오디오 입력.*

!!! note
    2번 핀(USART_RXD)과 3번 핀(USART_TXD)은 기본 로그, 프로그램 디버그, 프로그램 플래싱 포트입니다.

### 4.3 물리 핀 설명

데이터시트의 물리 핀 설명 그림은 핀을 기능군별로 묶어 — SDIO, SPI, I2C, UART, GPTIM, LCD 인터페이스(DPI/8080/SPI/JDI/DSI), GPADC, MPI, 아날로그 오디오, 부트 모드, 전원 공급, BT 안테나, CAN/USB, SWD/디버그 UART — SF32LB586VDD36 다이 외곽선 위에 겹쳐 보여 줍니다. 호스트 PCB에서 신호 그룹을 배치할 때 위의 핀 정의 표와 함께 사용하십시오.

!!! info "그림 4-2: 물리 핀 설명"
    이 다이어그램은 공식 데이터시트의 그림 3-2를 참조하십시오. 이 가이드에는 재현하지 않았습니다.

## 5. 주변 장치

### 5.1 통신 인터페이스

위 표에서 `PAxx_I2C_UART` 또는 `PBxx_I2C_UART`로 표시된 핀은 I2C 또는 UART 중 하나로 구성할 수 있습니다. 칩은 총 최대 7개의 I2C 인터페이스와 6개의 UART 인터페이스를 지원합니다.

**UART** — 전이중, 최대 6Mbps 보레이트, 구성 가능한 데이터 형식, 하드웨어 흐름 제어(CTS/RTS), DMA 멀티 패킷 TX/RX를 지원합니다. UART1~3은 HPSYS에, UART4~6은 LPSYS에 있습니다.

**I2C** — 마스터 및 슬레이브 역할, 8바이트 FIFO, DMA, 표준(100kbps), 패스트(400kbps), 패스트 모드 플러스(1Mbps), 하이 스피드(3.4Mbps) 모드, 7비트/10비트 마스터 주소 지정, 클럭 스트레칭, 구성 가능한 디지털 디글리치 필터링을 지원합니다. I2C1~4는 HPSYS에, I2C5~7은 LPSYS에 있습니다.

**SPI** — SSP/SPI(전이중, 마스터 또는 슬레이브) 및 Microwire(반이중, 마스터 전용) 형식, 4~32비트 데이터 폭, 구성 가능한 클럭 극성/위상, 구성 가능한 칩 셀렉트 극성, 32비트 × 16엔트리 FIFO, DMA를 지원합니다. SPI1/2는 HPSYS에 있으며(최대 48MHz), SPI3/4는 LPSYS에 있습니다(최대 24MHz).

**USB2.0 HS** — 고속 Host/Device 포트 1개, USB2.0 준수, 구성 가능한 엔드포인트, 서스펜드/재개, 세션 요청 및 호스트 협상 프로토콜 지원, 고속 및 풀 스피드 모드를 지원합니다.

**MPI (Memory Peripheral Interface)** — SPI NOR 플래시(1/2/4선, DTR 모드)와 SPI NAND 플래시(1/2/4선)를 지원하며, 레지스터 모드와 메모리 맵 모드 접근 사이를 하드웨어가 자동으로 전환합니다. 이 모듈의 MPI4 인터페이스에 외부 SPI NOR/NAND 플래시를 연결할 수 있습니다.

**SD/SDIO/eMMC** — SD 3.0 및 eMMC 4.5.1을 준수하며, 체인 DMA와 1KB FIFO를 갖춘 호스트 컨트롤러로 동작합니다. SDSC/SDHC/SDXC/SDHS 카드, UHS-1(SDR12/25/50/104/DDR50), 1선/4선/8선 SDR 모드, 4선/8선 DDR 모드를 지원합니다.

**I2S** — 마스터 전용, 전이중, 레프트 저스티파이드/라이트 저스티파이드/표준 형식, 8비트 및 16비트 모노/스테레오, 최대 24비트 PCM 폭을 지원합니다.

**LCD 인터페이스** — DBI 직렬 SPI 모드(3선/4선, 듀얼/쿼드 데이터 라인)와 병렬 8080 모드(8/16/24비트 버스 폭)를 지원합니다. 모드에 따라 RGB332/RGB444/RGB565/RGB666/RGB888 색상 형식을 지원합니다. 전용 MIPI DSI 레인 세트(클럭 + 데이터 2레인)도 47~52번 핀에서 제공됩니다.

### 5.2 아날로그 신호 처리

**12비트 GPADC** — SAR ADC, 최대 샘플링 속도 4MS/s, 0~3.3V 싱글 엔디드 / ±2.1V 차동 입력 범위, 싱글 엔디드 채널 8개(또는 차동 쌍 4개), 단일/연속 측정 모드, 측정당 구성 가능한 타임 슬롯 4개, 소프트웨어/하드웨어 트리거, DMA를 지원합니다.

**온도 센서** — 분해능 0.2°C, 범위 -40°C~125°C, 정확도 ±3°C, 폴링 또는 인터럽트 방식 읽기를 지원합니다.

**오디오 DAC** — 통합 24비트 채널 2개, 샘플링 속도 8kHz~48kHz, 차동 출력.

**오디오 PLL** — 48MHz/2^18 분해능의 Fractional-N 클럭 생성, 48MHz, 32.768kHz, 44.1kHz 파생 샘플링 속도를 지원합니다.

**오디오 ADC** — 통합 24비트 채널 2개, 샘플링 속도 8kHz~48kHz, 채널별 독립 게인 제어.

## 6. 전기적 특성

### 6.1 절대 최대 정격

<div align="center"><em>표 6.1-1: 절대 최대 정격</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3V 전원 입력 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8V 전원 입력 | -0.3 | 1.95 | V |
| VDDIO | I/O 전원 입력 | -0.3 | 3.6 | V |
| Tstore | 보관 온도 | -40 | 125 | °C |

</div>

### 6.2 권장 동작 조건

<div align="center"><em>표 6.2-1: 권장 동작 조건</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 전형 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3V 전원 입력 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8V 전원 입력 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O 전원 입력 | 1.7 | - | 3.6 | V |
| TA | 동작 온도 | -40 | - | 85 | °C |

</div>

### 6.3 DC 전기적 특성

<div align="center"><em>표 6.3-1: DC 전기적 특성(3.3V, 25°C)</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 전형 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 핀 커패시턴스 | 2.5 | 3 | 3.5 | pF |
| VIH | 입력 high 전압 | 0.7×VDD | - | VDD | V |
| VIL | 입력 low 전압 | VSS | - | 0.3×VDD | V |
| VOH | 출력 high 전압(high-Z 부하) | 0.8×VDD | - | VDD | V |
| VOL | 출력 low 전압(high-Z 부하) | VSS | - | 0.2×VDD | V |
| IOH | 출력 high 구동 전류 | 24 | 30 | 38 | mA |
| IOL | 출력 low 구동 전류 | 24 | 30 | 38 | mA |
| RPU / RPD | 내부 풀업 / 풀다운 | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>표 6.3-2: DC 전기적 특성(1.8V, 25°C)</em></div>

<div align="center" markdown>

| 기호 | 파라미터 | 최소 | 전형 | 최대 | 단위 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | 출력 high 구동 전류 | 8 | 10 | 13 | mA |
| IOL | 출력 low 구동 전류 | 8 | 10 | 13 | mA |
| RPU / RPD | 내부 풀업 / 풀다운 | 10 | 17 | 30 | kΩ |

</div>

입력 누설, 리셋 임계값, 두 공급 전압에서의 핀 커패시턴스를 포함한 전체 표는 공식 데이터시트의 §5.3에 있습니다.

### 6.4 소비 전력

<div align="center"><em>표 6.4-1: BLE 전류(0dBm TX 전력)</em></div>

<div align="center" markdown>

| 기호 | 조건 | @1.8V | @3.8V | 단위 |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | TX 전력 = 0dBm | 4.19 | 2.21 | mA |
| I∆RX | — | 4.03 | 2.12 | mA |

</div>

<div align="center"><em>표 6.4-2: BLE/Classic BT 평균 전류(3.8V 전원)</em></div>

<div align="center" markdown>

| 모드 | 간격 | @0dBm | @10dBm | 단위 |
| :--- | :-: | :-: | :-: | :-: |
| BT Sniff(attempt=1) | 50ms | 146.4 | 178.6 | µA |
| BT Sniff(attempt=1) | 1s | 7.3 | 8.9 | µA |
| BLE ADV | 50ms | 166.9 | 251.8 | µA |
| BLE ADV | 1s | 8.3 | 12.6 | µA |
| BLE 연결 | 50ms | 128.8 | 148.4 | µA |
| BLE 연결 | 1s | 6.4 | 7.4 | µA |
| Standby | — | 4.2 | — | µA |

</div>

<div align="center"><em>표 6.4-3: 프로세서 전력(HPSYS/LPSYS, 3.8V 전원)</em></div>

<div align="center" markdown>

| 기호 | 조건 | 전류(mA) | 증가분(µA/MHz) |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS @240MHz | 10.34 | 31.3 |
| ICoreMark | LPSYS @48MHz | 0.89 | 27.6 |
| IWhileLoop | HPSYS @240MHz | 7.98 | 21.3 |
| IWhileLoop | LPSYS @48MHz | 0.67 | 18.7 |

</div>

### 6.5 듀얼 모드 Bluetooth RF 성능

Bluetooth 5.3을 지원하며 4.2/4.1/4.0과 하위 호환되고 BLE와 Classic Bluetooth를 포함합니다. 동작 채널 중심 주파수는 2402~2480MHz입니다.

**BLE 송신기(1Mbps)**: 최대 전력 19dBm, 전력 제어 범위 -20~19dBm.

**BLE 수신기**: 전형 감도는 -100dBm(1Mbps), -97dBm(2Mbps), -104.5dBm(LR S2/500kbps), -107.5dBm(LR S8/125kbps)이며, 37바이트 패킷으로 dirty-off 조건에서 PER 30.8%로 측정했습니다.

**Classic BT(Basic Data Rate)**: 최대 송신 전력 19dBm, 수신 감도 -96.3dBm(dirty off) / -94dBm(dirty on) @0.1% BER.

**Classic BT(Enhanced Data Rate)**: 최대 송신 전력 13dBm, π/4-DQPSK 수신 감도 -95.5dBm, 8DPSK 수신 감도 -88.5dBm.

BLE 1Mbps/2Mbps/LR TX/RX 성능과 Classic BT BR/EDR TX/RX 성능의 전체 최소/전형/최대 표는 공식 데이터시트의 §5.5에 있습니다.

## 7. 모듈 전원 공급

이 모듈에는 **VDD_3V3**, **VDD_1V8**, **VDDIOA**, **VDDIOA2**, **VDDIOB**의 다섯 가지 전원 인터페이스가 있습니다.

- **VDD_3V3**는 칩의 AVDD33_ANA, AVDD33_AUD, AVDD_USB 레일과 모듈 패키지 내장 eMMC VDD(실장된 경우)에 전원을 공급합니다. LDO 전원을 권장합니다.
- **VDD_1V8**은 칩의 PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI 레일과 패키지 내장 메모리에 전원을 공급합니다.
- **VDDIOA**는 칩의 VDDIOA 레일, 패키지 내장 eMMC VIO(실장된 경우), 외부 플래시에 전원을 공급합니다.
- **VDDIOA2**는 칩의 VDDIOA2 레일(PA00~PA11 포함)에 전원을 공급합니다.
- **VDDIOB**는 칩의 VDDIOB 레일에 전원을 공급합니다.

!!! info "그림 7-1: 모듈 전원 공급 블록 다이어그램"
    이 다이어그램은 공식 데이터시트의 그림 7-1을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

## 8. 레퍼런스 회로도 및 핀 할당

데이터시트는 SF32LB58-MOD 기반 개발 보드의 전체 레퍼런스 회로도를 제공하며, 전원 공급, 리셋, JTAG/SWD, UART, SDIO, LCD, MIPI DSI, 오디오 회로를 포함합니다.

!!! info "그림 8-1: 개발 보드 레퍼런스 회로도"
    이 다이어그램은 공식 데이터시트의 그림 7-2~7-8을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

데이터시트는 해당 레퍼런스 보드의 권장 핀 할당 표도 제공하며, LCD_DPI_24, LCD_DSI, LCD_QSPI, LCD_8080 디스플레이 구성에 대한 Raspberry Pi 스타일 헤더 매핑을 포함합니다.

!!! info "그림 8-2: 레퍼런스 보드의 권장 핀 할당"
    이 다이어그램은 공식 데이터시트의 그림 7-9를 참조하십시오. 이 가이드에는 재현하지 않았습니다.

이를 양산 회로도의 출발점으로 사용하고, 제품의 주변 장치 구성에 맞게 핀 선택을 조정하십시오.

## 9. 회로 설계 체크리스트

<div align="center"><em>표 9-1: 회로 설계 체크리스트</em></div>

<div align="center" markdown>

| # | 점검 항목 |
| :-: | :--- |
| 1 | VDD_3V3 입력 전압 범위는 2.97V~3.6V여야 하며, 4.7µF 커패시터를 모듈 핀 가까이에 배치하십시오. |
| 2 | VDD_1V8 입력 전압 범위는 1.7V~1.95V여야 하며, 4.7µF 커패시터를 모듈 핀 가까이에 배치하십시오. |
| 3 | VDDIOA, VDDIOA2, VDDIOB 입력 전압 범위는 1.7V~3.6V여야 하며, 모듈 핀 가까이에 커패시터를 배치하십시오. |

</div>

!!! note
    이 가이드는 위의 세 가지 체크리스트 항목만 재현합니다. 양산 회로도를 확정하기 전에 전체 체크리스트는 [공식 데이터시트 PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)의 §7.3을 참조하십시오.

## 10. 모듈 치수 및 PCB 풋프린트

### 10.1 모듈 치수

이 모듈의 크기는 24 × 24 × 3.1mm입니다.

!!! info "그림 10-1: 모듈 치수"
    이 다이어그램은 공식 데이터시트의 그림 8-1을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

### 10.2 권장 PCB 풋프린트

!!! info "그림 10-2: 권장 PCB 풋프린트"
    이 다이어그램은 공식 데이터시트의 그림 8-2를 참조하십시오. 이 가이드에는 재현하지 않았습니다.

### 10.3 외부 안테나 커넥터

외부 안테나를 지원하는 SKU의 경우, 부품 번호에 따라 스탬프 홀 RF 급전 또는 IPEX 호환 커넥터를 사용할 수 있습니다.

!!! info "그림 10-3: 외부 안테나 커넥터 치수"
    이 다이어그램은 공식 데이터시트의 그림 8-3을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

### 10.4 PCB 설계 시 모듈 배치

모듈 안테나 영역에는 부품, 구리, 트레이스, 섀시 금속, 기타 도전성 구조물이 RF 금지 구역과 겹치지 않도록 하십시오. 안테나 클리어런스와 검증의 기준으로는 공식 모듈 데이터시트와 최종 제품 케이스를 사용하십시오.

- 가능하면 안테나 영역을 호스트 보드 가장자리 밖으로 연장하고, 급전점을 보드 가장자리에 가깝게 두십시오.
- 안테나를 보드 가장자리 밖으로 연장할 수 없다면, 넉넉한 금지 구역(구리 폴리곤, 트레이스, 부품 없음)을 확보하고 가능하면 안테나 아래의 호스트 보드 소재를 잘라 내십시오.
- 완제품 설계에서는 케이스가 안테나에 미치는 영향을 평가하고, 완성된 제품에서 최종 통신 거리 테스트를 포함한 RF 검증을 수행하십시오.

## 11. 제품 취급

### 11.1 보관 조건

- 제품은 수분 차단 백(MBB)에 밀봉하여 <40°C / 90%RH, 비응축 조건에서 보관하십시오.
- 진공 포장을 개봉한 후에는 모듈의 수분 민감도 등급(MSL)에 지정된 플로어 라이프 이내에 사용하십시오. 그렇지 않으면 2차 리플로 전에 베이킹해야 합니다.

### 11.2 정전기 방전(ESD)

조립 및 테스트 중에는 SiFli의 표준 모듈 ESD 취급 주의 사항을 따르십시오.

### 11.3 리플로 프로파일

모듈은 리플로를 한 번만 거치기를 권장합니다.

!!! info "그림 11-1: 권장 리플로 온도 프로파일"
    이 다이어그램은 공식 데이터시트의 그림 9-1을 참조하십시오. 이 가이드에는 재현하지 않았습니다.

### 11.4 초음파 진동

SiFli 모듈이 초음파 용접 또는 초음파 세척 장비의 진동에 노출되지 않도록 하십시오. 초음파 진동은 모듈 내부 크리스털 오실레이터와 공진하여 크리스털 고장이나 오동작을 일으킬 수 있으며, 모듈을 동작 불능으로 만들거나 성능을 저하시킬 수 있습니다.

!!! note
    양산 공정 사양을 릴리스하기 전에 SF32LB58-MOD의 최종 수분 민감도 등급, 플로어 라이프, ESD 한계, 리플로 요구 사항을 [공식 데이터시트 PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)의 §9에서 확인하십시오.

## 12. 관련 문서

- [DS5802-SF32LB58-MOD 데이터시트(V0.1)](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [SF32LB58x 칩 소개](../../sf32-products/chips/SF32LB58x.md)
- [SF32LB58x 하드웨어 설계 가이드](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. 개정 이력

<div align="center"><em>표 13-1: 개정 이력</em></div>

<div align="center" markdown>

| 날짜 | 버전 | 비고 |
| :--- | :-: | :--- |
| 2025 | 0.1 | 최초 공개 버전 |

</div>

이 가이드는 최초 공개 개정판인 **DS5802-SF32LB58-MOD V0.1**을 기반으로 합니다. 공식 PDF를 참조하여 가장 정확하고 최신인 개정판을 확인하십시오.
