---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD: 터치, 오디오, 스토리지, 배터리를 지원하며 SPI, QSPI, MCU/8080 디스플레이 제품을 빠르게 브링업할 수 있는 디스플레이 중심 SF32LB52x 개발 보드입니다."
tags:
    - 하드웨어
    - 개발 보드
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## 개요 { #overview }

SF32LB52-DevKit-LCD는 SF32LB52x 제품군을 위한 디스플레이 중심 개발 보드입니다. SF32LB52x 모듈을 기반으로 하며, SPI, DSPI, QSPI 또는 MCU/8080 디스플레이 인터페이스를 사용하는 제품을 빠르게 개발하기 위한 보드입니다.

이 보드는 MCU 모듈, 디스플레이 커넥터, 터치 인터페이스, 아날로그 마이크 입력, 아날로그 오디오 출력, USB-C, USB-UART 디버그, TF 카드 스토리지, 배터리 지원을 하나의 평가 플랫폼에 결합합니다. 스마트워치형 HMI, 소형 대시보드, 디스플레이 주변 장치 등 개발 초기부터 화면이 필요한 SF32LB52x 애플리케이션의 실용적인 출발점입니다.

![SF32LB52-DevKit-LCD front view](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 전면</em></div>

![SF32LB52-DevKit-LCD back view](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 후면</em></div>

![SF32LB52-DevKit-LCD block diagram](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 블록 다이어그램</em></div>

## 보드 주요 특징 { #board-highlights }

- SF32LB52-MOD-1, SF32LB52-MOD-A, SF32LB52-MOD-B와 호환되는 SF32LB52x 모듈 플랫폼
- 22핀 FPC 커넥터를 통한 QSPI/SPI/DSPI LCD 지원
- FPC와 40핀 확장 헤더를 통한 8비트 MCU/8080 LCD 지원
- I2C 터치 패널 지원
- USB-UART 플래싱/디버그 및 보드 전원용 USB-C
- USB2.0 FS 사용 사례를 위한 별도의 USB-C 인터페이스
- 온보드 MEMS 마이크와 Class-D 오디오 파워 앰프
- SPI를 사용하는 MicroSD 카드 슬롯
- 배터리 커넥터와 ETA9640P 리니어 충전기
- 디스플레이, GPIO, 스토리지, 오디오, 전원 신호용 40핀 확장 헤더

## 이 보드를 사용하는 경우 { #when-to-use-this-board }

프로젝트에 최소한의 브레이크아웃 보드가 아니라 완성된 디스플레이 플랫폼이 필요하다면 SF32LB52-DevKit-LCD를 선택하십시오.

- QSPI, SPI, DSPI 또는 MCU/8080 LCD 패널 브링업
- 터치 패널 통합 검증
- SF32LB52x에서 LVGL 또는 사용자 정의 UI 애플리케이션 테스트
- 마이크 입력과 스피커 출력 평가
- TF 카드 스토리지 프로토타이핑
- 사용자 정의 PCB를 확정하기 전에 모듈 후보 비교

가장자리가 캐슬레이션 형태인 더 작은 보드가 필요하면 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)를 사용하십시오. 핀 브레이크아웃을 최대로 확보하고 신호에 직접 접근해야 하면 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)를 사용하십시오.

## 하드웨어 구성 { #hardware-configuration }

<div align="center"><em>하드웨어 구성 요약</em></div>

<div align="center" markdown>

| 영역 | 구성 |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6, 16MB QSPI-NOR + 8MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6, 128MB QSPI-NAND + 16MB OPI-PSRAM |
| 클럭 | 모듈에 48MHz 메인 크리스털과 32.768kHz RTC 크리스털 탑재 |
| RF | 온보드 안테나 또는 0-ohm 저항으로 선택하는 IPEX 커넥터 |
| 디스플레이 | QSPI/SPI/DSPI 및 8비트 MCU/8080 |
| 터치 | I2C 터치 인터페이스 |
| 오디오 | MEMS 마이크 입력 및 Class-D 스피커 앰프 |
| 스토리지 | SPI 기반 MicroSD 카드 슬롯 |
| USB | USB-UART Type-C 및 USB2.0 FS Type-C |
| 배터리 | 단일 셀 Li-ion/Li-poly 배터리 커넥터 |
| 충전기 | ETA9640P 리니어 충전기, 기본 충전 전류 450mA |

</div>

위의 보드 코드와 메모리 구성은 SiFli의 [개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)를 따릅니다. 보드를 설계 기준 구성으로 사용하기 전에 보드 마킹 및 이에 대응하는 설계 패키지와 리비전을 대조하여 확인하십시오.

A128R16의 플래시 라벨은 공식 출처마다 다릅니다. [OpenSiFli 모듈 모델 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)는 이 모듈을 128 MB SPI-NAND로 식별하지만, 보드 모델 가이드는 대응하는 DevKit SKU를 128 MB QSPI-NAND로 나열합니다. 이것이 실제 실장된 부품의 차이인지 인터페이스 표기의 차이인지는 출처에 설명되어 있지 않습니다. 이 구성에 의존하기 전에 해당 보드 리비전의 회로도/BOM에서 플래시 부품과 버스 모드를 확인하십시오.

## 버전 노트 { #version-notes }

<div align="center"><em>보드 버전 이력</em></div>

<div align="center" markdown>

| 버전 | 모듈 기준 | 비고 |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | SD 카드 감지를 PA26으로 변경했습니다. 현재 SiFli 모델 목록에는 위에 표시된 두 가지 MOD-1 구성이 포함됩니다. |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | 충전기 회로, 전원 전환, 오디오 PA 게인, 리셋 동작, RGB LED 회로, 모듈 핀 호환성, RF 전원 필터링, 듀얼 플래시 지원, SD 카드 감지, 선택 사양 SDIO Wi-Fi, 안테나 금지 구역, VBUS 보호를 변경했습니다. |
| V1.0.0 | 이전 SF32LB52 모듈 | 최초 공개 보드 버전 |

</div>

생산용 캐리어 보드나 픽스처를 설계하기 위해 핀 맵을 사용하기 전에 실크스크린과 설계 패키지에서 정확한 보드 리비전을 확인하십시오.

![SF32LB52-DevKit-LCD front annotated view](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 전면 주석 뷰</em></div>

![SF32LB52-DevKit-LCD back annotated view](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 후면 주석 뷰</em></div>

## 시작하기 { #getting-started }

### 필수 하드웨어 { #required-hardware }

- SF32LB52-DevKit-LCD 보드
- 선택한 인터페이스와 호환되는 LCD 모듈
- USB 2.0 데이터 케이블(Type-A to Type-C 또는 동등한 케이블)
- Windows, Linux 또는 macOS를 실행하는 호스트 컴퓨터

### 선택 하드웨어 { #optional-hardware }

- 스피커
- TF 카드
- 단일 셀 Li-ion/Li-poly 배터리(일반적으로 450mAh~500mAh)
- UART 디버그와 네이티브 USB 테스트를 동시에 해야 할 때 필요한 두 번째 USB 케이블

### 기본 설정 { #basic-setup }

1. LCD 모듈을 올바른 LCD 커넥터에 연결합니다.
2. USB-UART Type-C 포트를 호스트 컴퓨터에 연결합니다.
3. SifliTrace 또는 SiFli 펌웨어 플래싱 툴을 엽니다.
4. 감지된 시리얼 포트를 선택합니다.
5. 보드에 전원을 공급하고 대상 펌웨어를 기록하거나 실행합니다.
6. 디스플레이가 켜지면 애플리케이션에서 요구하는 대로 터치, 그래픽, 스토리지, 오디오 기능을 확인합니다.

데이터 전송이 가능한 실제 USB 케이블을 사용하십시오. 충전 전용 케이블은 보드에 전원을 공급할 수는 있지만 시리얼 또는 USB 데이터 인터페이스를 노출하지 않습니다.

## 전원 { #power }

SF32LB52-DevKit-LCD에는 두 가지 주요 방식으로 전원을 공급할 수 있습니다.

- 두 USB 커넥터 중 하나를 통한 USB Type-C 전원
- 온보드 배터리 커넥터를 통한 배터리 전원

펌웨어 플래싱과 일반 디버깅에는 USB-UART Type-C 포트를 사용하십시오. 배터리 전원은 케이블 없이 디스플레이, 오디오, 저전력 동작을 테스트할 때 유용합니다.

이 보드에는 ETA9640P 리니어 충전기가 통합되어 있습니다. 지원되는 최대 충전 전류는 1A이며 기본 정전류 설정은 450mA입니다. 단일 셀 Li-ion 또는 Li-poly 배터리를 사용하고, 배터리를 연결하기 전에 보드 실크스크린에서 커넥터 극성을 확인하십시오.

## 플래싱 및 디버그 { #download-and-debug }

USB-UART 포트는 기본 펌웨어 플래싱 및 로그 인터페이스입니다.

- **다운로드 모드**: 플래싱 툴에서 BOOT 옵션을 활성화한 다음 보드에 전원을 공급하거나 리셋하십시오.
- **디버그/로그 모드**: BOOT 옵션을 비활성화한 다음 보드에 전원을 공급하거나 리셋하여 일반 시리얼 로그 동작으로 진입하십시오.

일부 SF32LB52x 보드는 리셋에 USB-UART의 RTS 신호를 사용합니다. 시리얼 포트를 처음 열 때 보드가 예기치 않게 리셋되면 호스트의 시리얼 포트 설정에서 모뎀 또는 하드웨어 흐름 제어를 비활성화하십시오.

![Disable modem flow control in serial-port advanced settings](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>시리얼 포트 설정에서 모뎀 흐름 제어 비활성화</em></div>

## LCD 및 터치 인터페이스 { #lcd-and-touch-interface }

이 보드는 0.5mm 피치의 22핀 FPC 커넥터를 통해 QSPI LCD 패널을 지원합니다. 이 커넥터는 수직형 플립 락 방식입니다. 패널의 핀 순서가 다르면 연결하기 전에 어댑터 보드를 사용하십시오.

지원되는 LCD 및 터치 기능은 다음과 같습니다.

- SPI, DSPI, QSPI LCD 시그널링
- DDR 모드 QSPI LCD 시그널링
- 8비트 MCU/8080 LCD 시그널링
- LCD 리셋, 칩 셀렉트, 클럭, 데이터, TE, 백라이트 PWM
- I2C 터치 패널 SDA/SCL, 인터럽트, 리셋

원본 SiFli 보드 노트에는 지원되는 디스플레이 모델로 `TFT-H043A28WQISTKN22_V0-3`이 나열되어 있습니다.

### 22핀 QSPI FPC 신호 맵 { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>22핀 QSPI FPC 신호 맵</em></div>

<div align="center" markdown>

| 핀 | 신호 | 기능 |
| :--- | :--- | :--- |
| 1 | LEDK | LCD 백라이트 캐소드 |
| 2 | LEDA | LCD 백라이트 애노드 |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | LCD 리셋 |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3V 출력 |
| 18 | PA31 | 터치 인터럽트 |
| 19 | PA33 | 터치 I2C SDA |
| 20 | PA30 | 터치 I2C SCL |
| 21 | PA09 | 터치 리셋 |
| 22 | GND | 그라운드 |

</div>

**출처 간 핀 수 불일치 — 디스플레이를 연결하기 전에 확인하십시오:** SiFli는 커넥터와 신호 표를 22핀으로 표기하지만, 함께 제공되는 연결 도면에는 접점이 1번부터 24번까지 번호가 매겨져 있고 22~24번 핀이 GND로 표시되어 있습니다. 출처는 이 불일치를 해소하지 않습니다. 플렉스 케이블을 선택하거나 배선하기 전에 해당 보드 리비전의 실제 커넥터와 회로도를 확인하십시오. 22핀 케이블이 24위치 커넥터에 맞는다고 가정해서는 안 됩니다.

## 주요 모듈 핀 할당 { #key-module-pin-assignments }

![SF32LB52-DevKit-LCD 40-pin header definition](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>40핀 헤더 정의</em></div>

<div align="center"><em>주요 모듈 핀 할당</em></div>

<div align="center" markdown>

| 모듈 핀 | 신호 | 보드 기능 |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | 충전기 연결 감지 |
| PA43..PA37 | DB7..DB2 | MCU/8080 LCD 데이터 |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | LCD 데이터 |
| PA06 | DC / QSPI D1 | LCD 데이터/명령 |
| PA05 | RD / QSPI D0 | LCD 데이터 |
| PA04 | WR / QSPI CLK | LCD 클럭 |
| PA03 | CS / QSPI CS | LCD 칩 셀렉트 |
| PA02 | TE / QSPI TE | LCD 티어링 이펙트 신호 |
| PA01 | BL_PWM | 백라이트 제어 |
| PA00 | RSTB | LCD 리셋 |
| PA33 / PA30 | I2C SDA / SCL | 터치 패널 |
| PA31 / PA09 | Touch INT / RST | 터치 패널 |
| PA24, PA25, PA28, PA29 | SPI1 | TF 카드 인터페이스 |
| PA26 | Card detect / LED | 공유 기능 |
| PA20 / PA27 | UART RX/TX | 사용자 UART |
| PA18 / PA19 | Debug UART RX/TX | 플래싱 및 소프트웨어 디버그 |
| PA10 | AU_PA_EN | 오디오 앰프 인에이블 |
| MIC_ADC_IN / MIC_BIAS | 아날로그 마이크 | 마이크 입력 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | 아날로그 오디오 | 스피커 앰프 입력 |

</div>

## 모듈 호환성 노트 { #module-compatibility-notes }

- SF32LB52-MOD-1은 17번 핀을 3.3V 출력으로 사용하며, 이 출력은 기본적으로 비활성화되어 있어 소프트웨어에서 활성화해야 합니다.
- SF32LB52-MOD-A/B는 17번 핀을 3.3V 전원 입력으로 사용합니다.
- SF32LB52-MOD-1은 27번 핀을 3.2V~4.7V VBAT 입력으로 사용합니다.
- SF32LB52-MOD-A/B는 27번 핀을 3.3V 전원 입력으로 사용합니다.
- SF32LB52-MOD-1에서 VBAT 전원 켜짐 임계값은 3.58V이고 전원 꺼짐 임계값은 3.48V입니다. 배터리가 아닌 전원으로 테스트할 때는 VBAT에 3.8V를 권장합니다.
- 모듈 62번 핀의 PA21은 SF32LB52-MOD-A/B에서만 사용할 수 있습니다. SF32LB52-MOD-1에서는 연결되어 있지 않습니다.
- 모듈 62번~68번 핀은 기본적으로 내부에서 NOR 플래시에 연결되어 있을 수 있습니다. SDIO를 외부에서 사용하려면 해당 핀에 내부 플래시가 없는 모듈 변형을 선택하십시오.

## 오디오 { #audio }

이 보드에는 MEMS 마이크와 오디오 파워 앰프가 있습니다.

- 아날로그 오디오 입력을 검증하려면 온보드 마이크 경로를 사용하십시오.
- 오디오 출력을 테스트하려면 스피커 커넥터를 사용하십시오.
- 원본 보드 노트에 따르면 외부 스피커 경로는 4ohm 부하에서 최대 3W를 지원합니다.

## 스토리지 { #storage }

MicroSD 소켓은 SPI로 연결됩니다. 사용자 정의 보드로 넘어가기 전에 파일 시스템, 이미지 에셋, 로그, 데이터 기록을 검증하는 데 적합합니다.

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli SDK는 `scons --board=<board_name>`과 함께 다음의 정확한 보드 타깃 이름을 사용합니다.

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

이 이름은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. [지원 보드 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)이 나열하는 타깃 집합은 서로 다를 수 있으므로, 사용 중인 SDK 리비전에 맞게 타깃을 확인하십시오.

## 관련 문서 { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[SF32LB52x Hardware Design Guide]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Design Package]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__

</div>
