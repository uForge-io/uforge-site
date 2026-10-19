---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano: 최종 제품에 가까운 시제품 제작과 소형 디스플레이 초기 구동·검증, 납땜 실장 평가에 적합한 소형 캐슬레이션 SF32LB52x 개발 보드입니다."
tags:
    - 하드웨어
    - 개발 보드
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## 개요 { #overview }

SF32LB52-DevKit-Nano는 소형 시제품과 임베디드 평가를 위한 SF32LB52x 개발 보드입니다. 보드 가장자리에 캐슬레이션 패드가 있어 독립형 개발 보드로 사용할 수 있으며, 초기 제품 시제품에서는 캐리어 PCB에 납땜해 모듈처럼 실장할 수도 있습니다.

보드 크기는 51 mm × 20.32 mm이며, GPIO, UART, I2C, SPI, LCD, I2S, GPADC, PWM, USB, 아날로그 오디오 개발에 필요한 SF32LB52x의 주요 리소스를 제공합니다.

![SF32LB52-DevKit-Nano 전면](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 전면</em></div>

![SF32LB52-DevKit-Nano 후면](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 후면</em></div>

## 보드 변형 { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Nano 보드 변형</em></div>

<div align="center" markdown>

| 변형 | MCU | 패키지 내장 메모리 | 외장 플래시 |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB SPI NOR 플래시 | 없음 |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB QSPI-NOR 플래시 |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 128 MB QSPI-NAND 플래시 |

</div>

N4 변형은 소형 제어, Bluetooth, 간단한 UI 애플리케이션에 적합합니다. N16R16은 16 MB OPI-PSRAM과 16 MB QSPI-NOR를 결합하고, A128R16은 16 MB OPI-PSRAM과 128 MB QSPI-NAND를 결합합니다. 두 변형 모두 더 큰 디스플레이 에셋, 외부 파일 시스템, 또는 PSRAM의 프레임버퍼나 작업 메모리가 필요한 애플리케이션에 적합합니다.

**출처 간 불일치 — 선택하기 전에 확인하십시오:** SiFli의 [상세 Nano 보드 가이드](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html)는 16 MB OPI-PSRAM + 16 MB NOR 구성을 `R16N16 V1.0.0`으로 부르지만, [현재 개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)는 동일한 메모리 구성을 `N16R16`으로 나열하며, 이와 별도로 `A128R16`을 16 MB OPI-PSRAM + 128 MB QSPI-NAND로 나열합니다. 상세 가이드는 A128R16을 구체적으로 설명하지 않습니다. 이 SKU에 대해서는 N16R16 보드 설명의 내용을 그대로 옮겨 적용하지 말고 모델 가이드의 목록을 따르십시오. 펌웨어나 스토리지 레이아웃을 선택하기 전에 보드 마킹과 현재 회로도/BOM을 확인하십시오.

SiFli 출처에 따라 Nano 보드 치수도 약간 다릅니다. 상세 가이드는 21 × 51 mm, 모델 가이드는 51 × 20.32 mm로 표기합니다. 51 mm 변은 일치하지만 짧은 변은 0.68 mm 차이가 납니다. 이 문서에서는 더 정밀한 모델 가이드의 값을 사용합니다. 인클로저나 캐리어 보드를 설계하기 전에 해당 보드 리비전의 기구 도면을 확인하십시오.

## 보드 주요 특징 { #board-highlights }

- 51 mm × 20.32 mm 소형 보드
- 캐리어 PCB에 납땜해 시제품에 실장할 수 있는 캐슬레이션 패드 구조
- USB Type-C 전원 및 CH340N을 통한 USB-UART 플래싱/디버그
- GPIO, UART, I2C, SPI, GPADC, PWM, I2S, PDM, 웨이크 가능 핀 노출
- 16핀 FPC 경로를 통한 QSPI LCD 지원. 일반적으로 22핀-16핀 어댑터 케이블을 사용합니다.
- I2C 터치 패널 지원
- 아날로그 마이크 입력 및 차동 오디오 출력 핀
- USB 2.0 FS 신호를 보드 가장자리 핀으로 연결
- 사용자 LED 2개
- 전원 키와 기능 키

## 이 보드를 사용하는 경우 { #when-to-use-this-board }

최종 제품과 유사한 폼 팩터로 시제품을 구성해야 한다면 SF32LB52-DevKit-Nano를 선택하십시오.

- 소형 Bluetooth 및 디스플레이 프로토타입 제작
- 캐리어 PCB에 보드를 납땜해 실장
- 사용자 정의 보드 설계 전에 제품과 유사한 핀 할당을 검증
- NOR만 탑재한 구성과 PSRAM을 탑재한 QSPI-NOR 또는 QSPI-NAND 구성 비교
- 작은 보드에서 LCD, 오디오, 센서, USB 기능 초기 구동 및 검증

벤치에서 배선하기 쉽고 신호를 더 폭넓게 브레이크아웃한 보드가 필요하면 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)를 사용하십시오. 충전기, TF 카드, 마이크, 스피커 앰프를 갖춘 디스플레이 중심 보드가 필요하면 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)를 사용하십시오.

## 전원 { #power }

이 보드는 세 가지 전원 공급 방식을 지원합니다.

- USB Type-C 전원. 개발에 권장합니다.
- USB가 연결되지 않은 경우, 3.3 V 및 GND 캐슬레이션 핀을 통한 3.3 V 입력
- USB가 연결되지 않은 경우, 5 V 및 GND 캐슬레이션 핀을 통한 5 V 입력

USB Type-C가 연결되면 지정된 3.3 V 및 5 V 핀을 출력으로 사용할 수 있습니다. 외부 회로를 연결하기 전에 각 핀의 전원 방향을 확인하십시오.

보드의 전원 스위치는 CH340N의 RTS# 신호로 제어할 수 있어 툴에서 리셋 동작을 제어할 수 있습니다.

## 플래싱 및 디버그 { #download-and-debug }

펌웨어 플래싱과 시리얼 로그에는 USB Type-C UART 인터페이스를 사용하십시오.

- **다운로드 모드**: 플래싱 툴에서 BOOT를 활성화한 다음 보드에 전원을 공급하거나 리셋하십시오.
- **디버그/로그 모드**: BOOT를 비활성화한 다음 보드에 전원을 공급하거나 리셋하십시오.
- **RTS 리셋 동작**: 시리얼 포트를 열 때 보드가 예기치 않게 리셋되거나 전원이 꺼지면 호스트의 시리얼 포트 설정에서 모뎀 또는 하드웨어 흐름 제어를 비활성화하십시오.

![시리얼 포트 고급 설정에서 모뎀 흐름 제어 비활성화](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>시리얼 포트 설정에서 모뎀 흐름 제어 비활성화</em></div>

## 사용자 조작부 { #user-controls }

<div align="center"><em>사용자 조작 신호</em></div>

<div align="center" markdown>

| 기능 | GPIO | 동작 |
| :--- | :--- | :--- |
| LED1 | PA31 | 액티브 로우 |
| LED2 | PA32 | 액티브 로우 |
| KEY1 | PA34 | 액티브 하이, 10초간 길게 누르면 리셋 지원 |
| KEY2 | PA33 | 액티브 하이 |

</div>

## 캐슬레이션 핀 요약 { #castellated-pin-summary }

Nano 보드는 가장자리의 두 핀 그룹을 노출합니다. 첫 번째 그룹에는 오디오, SPI1, 디버그 UART, USB 관련 전원, GPADC 입력으로 사용할 수 있는 핀이 있습니다. 두 번째 그룹에는 SPI2, USB FS, 웨이크업 입력으로 설정할 수 있는 GPIO, 전원 핀이 있습니다.

### 전면 에지 신호 { #front-side-edge-signals }

<div align="center"><em>전면 에지 신호 맵</em></div>

<div align="center" markdown>

| 핀 | 신호 | 주요 기능 |
| :--- | :--- | :--- |
| 1 | GND | 그라운드 |
| 2 | DACP | 아날로그 오디오 출력 |
| 3 | DACN | 아날로그 오디오 출력 |
| 4 | MIC_ADC | 아날로그 마이크 입력 |
| 5 | MIC_BIAS | 마이크 바이어스 |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | 그라운드 |
| 8 | PA19 | UART0_TXD / SWCLK / 디버그 |
| 9 | PA18 | UART0_RXD / SWDIO / 디버그 |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | 3.3 V 입력/출력 |
| 14 | GND | 그라운드 |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | 5 V 입력/출력 |

</div>

### 후면 에지 신호 { #back-side-edge-signals }

<div align="center"><em>후면 에지 신호 맵</em></div>

<div align="center" markdown>

| 핀 | 신호 | 주요 기능 |
| :--- | :--- | :--- |
| 1 | GND | 그라운드 |
| 2 | 3.3V | 3.3 V 입력/출력 |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | 그라운드 |
| 10 | 3.3V | 3.3 V 입력/출력 |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | 5 V 입력/출력 |
| 16 | GND | 그라운드 |

</div>

## LCD 인터페이스 { #lcd-interface }

이 보드는 16핀 FPC 신호 세트로 QSPI LCD 패널을 지원합니다. 원본 보드 노트에는 22핀-16핀 FPC 케이블을 사용해 Huangshan Pi 1.85인치 AMOLED 화면에 연결하는 방법이 설명되어 있습니다.

![22핀-16핀 FPC 어댑터 케이블](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>22핀-16핀 FPC 어댑터 케이블</em></div>

<div align="center"><em>16핀 LCD FPC 신호 맵</em></div>

<div align="center" markdown>

| 핀 | 신호 | 기능 |
| :--- | :--- | :--- |
| 1 | GND | 그라운드 |
| 2 | PA00 | LCD 리셋 |
| 3 | PA01 | 백라이트 PWM |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | 디스플레이 전원 출력 |
| 12 | GND | 그라운드 |
| 13 | PA09 | 터치 인터럽트 |
| 14 | PA11 | 터치 I2C SDA |
| 15 | PA20 | 터치 I2C SCL |
| 16 | PA10 | 터치 리셋 |

</div>

## 외장 플래시 및 SDIO 핀 { #external-flash-and-sdio-pins }

N16R16 변형에는 외장 16 MB QSPI-NOR 플래시가 포함되어 있습니다. 스토리지 핀 그룹은 다음과 같습니다.

<div align="center"><em>외장 플래시 및 SDIO 핀 그룹</em></div>

<div align="center" markdown>

| MCU GPIO | 공유 플래시 / SDIO 기능 |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

변형에 따라 이 핀을 실장된 플래시가 사용하고 있을 수 있습니다. 이 핀을 확장 핀으로 사용하기 전에 정확한 보드 조립 구성을 확인하십시오.

## 오디오 확장 { #audio-expansion }

Nano 보드는 아날로그 마이크 입력, 마이크 바이어스, 차동 아날로그 오디오 출력을 노출합니다. 대상 제품에 필요한 외부 마이크 회로와 오디오 파워 앰프를 추가하십시오.

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli SDK는 `scons --board=<board_name>`과 함께 다음의 정확한 보드 타깃 이름을 사용합니다.

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

이 이름은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. [지원 보드 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)이 나열하는 타깃 집합은 서로 다를 수 있으므로, 사용 중인 SDK 리비전에 맞게 타깃을 확인하십시오.

## 관련 문서 { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 칩 소개][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[SF32LB52x 하드웨어 설계 가이드][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[SiFli 위키 원문][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[설계 패키지][Design Package]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__

</div>
