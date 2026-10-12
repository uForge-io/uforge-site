---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: MCU 전원을 점퍼로 1.8 V 또는 3.3 V 중에서 선택할 수 있으며 GPIO, 디스플레이, 오디오, USB, 전원 레일에 직접 접근할 수 있는 소형 SF32LB52x 평가 보드입니다."
tags:
    - 하드웨어
    - 개발 보드
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## 개요 { #overview }

SF32LB52-DevKit-Core-3p3는 SF32LB52x 칩을 직접 평가하기 위한 소형 개발 보드입니다. 보드의 점퍼로 MCU 전원을 1.8 V 또는 3.3 V 중에서 선택합니다. 주요 MCU 신호는 에지 헤더로 노출되며, 캐슬레이션 스루홀에는 납땜 없이 핀 헤더를 끼울 수 있습니다. GPIO, 직렬 버스, 디스플레이 신호, 오디오, ADC, PWM, 전원 레일에 직접 접근해야 하는 엔지니어에게 적합한 보드입니다.

크기는 30.88 mm × 68 mm로, 벤치 프로토타입에 쓰기에 작으면서도 SF32LB52x 하드웨어 및 펌웨어 브링업에 실용적인 인터페이스를 제공합니다.

![SF32LB52-DevKit-Core-3p3 front view](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 전면</em></div>

![SF32LB52-DevKit-Core-3p3 back view](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 후면</em></div>

## 보드 변형 { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Core-3p3 보드 변형</em></div>

<div align="center" markdown>

| 변형 | MCU | 패키지 내장 메모리 | 보드 탑재 메모리 |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB SPI NOR 플래시 | 없음 |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB SPI NOR 플래시 | 없음 |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB OPI-PSRAM | 16 MB SPI NOR 플래시 |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB OPI-PSRAM | 16 MB SPI NOR 플래시 |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB SPI NOR 플래시 |

</div>

소형 Bluetooth, 제어, 간단한 HMI 작업에는 NOR 전용 변형(variant)을 사용하십시오. 애플리케이션에 더 큰 그래픽 에셋, 프레임버퍼, 파일 시스템 또는 애플리케이션 저장 공간이 필요하면 PSRAM + 외장 NOR 변형을 사용하십시오.

**출처 간 불일치 — 선택하기 전에 보드 라벨을 확인하십시오:** SiFli의 [상세 Core-3p3 보드 가이드](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html)는 SF32LB52JUD6 구성을 `R16N16 V1.0.0`(현재 버전)으로 부르지만, [개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)는 동일한 JUD6 / 16 MB PSRAM / 16 MB NOR 구성을 `N16R16`으로 나열합니다. 상세 가이드의 리비전 정보 행에는 EUB6의 코패키지 PSRAM이 8 MB라고 되어 있으나, 같은 가이드의 기능 목록과 변형 표에는 4 MB라고 되어 있습니다. SiFli의 [SF32LB52 개요](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md)도 EUB6를 4 MB로 명시하므로 이 문서에서는 4 MB를 사용합니다. 정확한 보드 접미사가 중요한 경우에는 보드 마킹과 이에 대응하는 회로도/BOM을 확인하십시오.

## 보드 주요 특징 { #board-highlights }

- NOR 전용 또는 PSRAM + NOR 구성의 SF32LB52x MCU 변형
- 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털
- USB Type-C 전원 및 CH340N을 통한 USB-UART 플래싱/디버그
- 온보드 PCBA 안테나와 I-PEX 안테나 커넥터
- 점퍼로 선택하는 1.8 V 또는 3.3 V MCU 전원
- 에지 헤더로 연결된 USB 2.0 FS 신호
- GPIO 37개 노출. MCU는 UART 3개, I2C 4개, GPTIM 2개, SPI 2개, GPADC 채널 6개를 제공합니다.
- 모든 GPIO를 UART, I2C 또는 GPTIM으로 구성할 수 있으며, 핀 멀티플렉싱에는 SPI, PWM, I2S, PDM, 웨이크업 입력도 포함됩니다.
- 16핀, 0.5 mm 피치 FPC 디스플레이 커넥터. 디스플레이 인터페이스로 SPI, DSPI, Quad-SPI를 지원하며 DDR 모드 QSPI도 지원합니다.
- I2C 터치 패널 신호
- 아날로그 마이크 및 차동 오디오 출력 핀
- 사용자 LED 1개
- 전원 키와 기능 키
- 단일 레일 전류 측정용 테스트 포인트. SiFli는 단일 MCU, 최소 시스템, 전체 보드 전력 테스트도 문서화합니다.

## 이 보드를 사용하는 경우 { #when-to-use-this-board }

SF32LB52x 신호에 가장 직접적으로 접근해야 한다면 SF32LB52-DevKit-Core-3p3를 선택하십시오.

- 사용자 정의 도터보드 또는 센서 보드 브링업
- SF32LB52x 메모리 변형 평가
- LCD, 오디오, USB, GPIO 기능 프로토타이핑
- 개별 전원 레일의 전류 측정
- 소형 제품 PCB를 설계하기 전에 펌웨어 검증

더 작은 캐슬레이션 모듈 형태의 보드가 필요하면 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)를 사용하십시오. 오디오 앰프, TF 카드 슬롯, 배터리 충전기를 갖춘 완성형 디스플레이 보드가 필요하면 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)를 사용하십시오.

## 전원 { #power }

이 보드는 세 가지 전원 입력을 지원합니다.

- USB Type-C 전원. 일반적인 개발과 디버깅에 권장합니다.
- USB가 연결되지 않은 경우, 에지 헤더의 5 V 및 GND 핀을 통한 5 V 입력
- USB가 연결되지 않은 경우, 에지 헤더의 3.3 V 및 GND 핀을 통한 3.3 V 입력. 외부 벤치 전원 공급 장치를 사용할 수 있습니다.

별도의 보드 점퍼로 MCU 전원을 1.8 V와 3.3 V 중에서 선택합니다. 이 설정은 외부용 1.8 V 및 3.3 V 헤더 전원 핀과는 별개입니다. 점퍼를 변경하거나 외부 회로에 전원을 공급하기 전에 해당 보드 리비전의 핀 배치도와 회로도를 확인하십시오.

단일 레일 전류를 측정하려면 보드의 측정 지점에서 측정 대상 레일에 직렬로 전류계를 연결하십시오.

USB Type-C가 연결되면 이 보드는 선택된 헤더 핀을 통해 3.3 V, 1.8 V, 5 V 출력도 제공할 수 있습니다. 외부 회로를 연결하기 전에 필요한 방향을 확인하십시오.

보드에는 전원 스위치가 있습니다. CH340N의 RTS# 신호로 보드 인에이블을 제어할 수 있으므로, 플래싱 또는 디버그 작업 중에 호스트 툴이 MCU를 리셋할 수 있습니다.

## 플래싱 및 디버그 { #download-and-debug }

펌웨어 플래싱과 소프트웨어 디버그에는 USB Type-C UART 포트를 사용하십시오.

- **다운로드 모드**: 플래싱 툴에서 BOOT를 활성화한 다음 보드에 전원을 공급하거나 리셋하십시오.
- **디버그/로그 모드**: BOOT를 비활성화한 다음 보드에 전원을 공급하거나 리셋하십시오.
- **리셋**: 보드의 리셋/전원 키 기능 또는 툴이 제어하는 RTS 리셋 경로를 사용하십시오.

## 사용자 컨트롤 { #user-controls }

<div align="center"><em>사용자 컨트롤 신호</em></div>

<div align="center" markdown>

| 기능 | GPIO | 동작 |
| :--- | :--- | :--- |
| LED | PA32 | 액티브 하이 |
| KEY1 | PA34 | 액티브 하이, 10초 길게 누르면 리셋 지원 |
| KEY2 | PA33 | 액티브 하이 |

</div>

## 디스플레이 인터페이스 { #display-interface }

이 보드는 0.5 mm 피치, 플립업 래치, 하단 접점을 갖춘 수직형 16핀 FPC 커넥터를 통해 DDR 모드 QSPI를 포함한 SPI, DSPI, Quad-SPI LCD 인터페이스를 지원합니다. 이 커넥터에는 LCD 리셋, 백라이트 PWM, TE, 칩 셀렉트, 클럭, 데이터 라인 4개, I2C 터치 신호가 연결됩니다.

![FPC adapter cable](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>FPC 어댑터 케이블</em></div>

### 16핀 LCD FPC 신호 맵 { #16-pin-lcd-fpc-signal-map }

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

SiFli의 중국어 보드 가이드에는 1.85인치 AMOLED 모듈이 16핀 FPC 케이블로 직접 연결된다고 되어 있습니다. 반면 영어 가이드는 FPC-22p 케이블을 명시하며, 그림 파일 이름도 `FPC-22P`입니다. 보드 커넥터 자체는 16핀입니다. 출처 자료만으로는 이 불일치를 해소할 수 없으므로, 디스플레이 모듈을 연결하기 전에 케이블 핀 수와 핀 매핑을 디스플레이 모듈 자료와 대조하여 확인하십시오.

## 헤더 신호 요약 { #header-signal-summary }

이 보드는 24핀 에지 헤더 2개를 노출합니다. 첫 번째 쪽은 범용 GPIO, SPI2, USB, GPADC, 전원에 중점을 두고, 두 번째 쪽은 LCD, 터치, 디버그 UART, 오디오, 전원에 중점을 둡니다.

![SF32LB52-DevKit-Core-3p3 pinout](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 핀 배치도</em></div>

### 범용 I/O 헤더 { #general-io-header }

<div align="center"><em>범용 I/O 헤더 핀 할당</em></div>

<div align="center" markdown>

| 핀 범위 | 신호 | 주요 기능 |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, 웨이크업 입력 |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3.3V | USB 전원 상태에 따라 3.3V 입력 또는 출력 |
| 18-21 | PA27..PA24 | 웨이크업 입력, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

### LCD, 오디오, 디버그 헤더 { #lcd-audio-and-debug-header }

<div align="center"><em>LCD, 오디오, 디버그 헤더 핀 할당</em></div>

<div align="center" markdown>

| 핀 범위 | 신호 | 주요 기능 |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, 터치, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | 아날로그 마이크 및 오디오 출력 |
| 17 | 1.8V | USB 전원 상태에 따라 1.8V 입력 또는 출력 |
| 18-20 | PA10, PA11, PA20 | PA10: CTP_RST, PA11: CTP_SDA, PA20: CTP_SCL. 모두 UART, I2C, GPTIM 지원 |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, 플래싱/디버그 |
| 24 | 5V | USB 전원 상태에 따라 5V 입력 또는 출력 |

</div>

## 외장 플래시 및 SDIO 핀 { #external-flash-and-sdio-pins }

일부 변형에는 외장 16 MB QSPI-NOR 플래시가 포함되어 있습니다. 공유되는 스토리지/SDIO 핀 그룹은 다음과 같습니다.

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

이 핀을 SDIO나 다른 확장 기능에 사용하기 전에, 실장된 플래시가 이미 이 핀을 사용하고 있는지 확인하십시오.

## 오디오 확장 { #audio-expansion }

이 보드는 아날로그 마이크 바이어스/입력과 차동 DAC 출력을 연결합니다. 마이크와 스피커를 구동하는 Class-AB/D 앰프는 외장이므로, 의도한 오디오 경로에 맞게 선택하십시오.

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli SDK 빌드 구성은 `scons --board=<board_name>`과 함께 다음의 정확한 보드 타깃 이름을 사용합니다.

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

이 이름은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. [지원 보드 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)이 나열하는 타깃 집합은 서로 다를 수 있으므로, 사용 중인 SDK 리비전에 맞게 타깃을 확인하십시오.

## 관련 문서 { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Design Package]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__

</div>
