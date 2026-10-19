---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: MIPI DSI, RGB, QSPI 디스플레이 브링업(초기 구동 및 검증)을 위한 SF32LB58x 개발 보드로, 오디오, SDIO, CAN, 확장 인터페이스를 갖추고 있습니다."
tags:
    - 하드웨어
    - 개발 보드
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## 개요 { #overview }

SF32LB58-DevKit-LCD는 SF32LB58-MOD 모듈 제품군을 기반으로 한 개발 보드입니다. DSI, DPI/RGB 또는 QSPI 디스플레이를 사용하는 제품을 지원하며, 고해상도 UI, 오디오, 스토리지, USB, 주변 장치 통합을 검증하기 위한 실용적인 플랫폼을 제공합니다.

이 보드는 SF32LB58x 모듈을 중심으로 여러 디스플레이 커넥터, 아날로그 마이크 입력, 스테레오 스피커 출력, MicroSD, USB Type-C 포트 2개, 대형 코어 및 저전력 코어용 확장 헤더, CAN과 SDIO Wi-Fi 확장 인터페이스를 갖췄습니다.

커스텀 설계를 확정하기 전에 이 보드로 디스플레이, 스토리지, 오디오, USB, 외부 주변 장치를 함께 검증하십시오.

![SF32LB58-DevKit-LCD 전면](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 전면</em></div>

![SF32LB58-DevKit-LCD 후면](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 후면</em></div>

![SF32LB58-DevKit-LCD 블록 다이어그램](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 블록 다이어그램</em></div>

## 보드 및 모듈 버전 참고 { #board-and-module-version-notes }

<div align="center"><em>모듈 버전 요약</em></div>

<div align="center" markdown>

| 모듈 버전 | 기준 | 비고 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB586VDD36을 사용하는 SF32LB58-MOD-N16R32N1 및 SF32LB58-MOD-A128R32N1 | 현재 버전; eMMC 전원 제어를 갱신하여 PA74가 VCC를, PA80이 VCCQ를 제어; 저항 R0115 추가 |
| V1.0.0 | SF32LB586VDD36을 사용하는 SF32LB58-MOD-N16R32N1 | SiFli의 모듈 버전 섹션에 기재된 초기 모듈 버전 |

</div>

<div align="center"><em>보드 버전 요약</em></div>

<div align="center" markdown>

| 보드 버전 | 기준 | 비고 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 및 SF32LB58-MOD-A128R32N1-V1.0.1 | 현재 버전; PB24에 USB 플러그 감지 추가; 최대 듀얼 오디오 출력을 지원하도록 PTC를 2 A / 6 V로 변경; 타이밍이 적합하지 않아 RGB LED 레벨 시프트 단 제거; 출력 리플을 줄이기 위해 DC/DC 컨버터 교체; USB 디바이스 인터럽트 문제를 해결하기 위해 USB DP 풀업 저항 제거 |
| V1.0.0 | SF32LB587VEE56을 사용하는 SF32LB58-MOD-N16R32N1-V1.0.0 | 최초 공개 보드 버전 |

</div>

V1.0.0에 대한 SiFli 소스는 일관되지 않습니다. 모듈 버전 섹션은 SF32LB586VDD36을 기재하는 반면, 보드 버전 섹션은 N16R32N1-V1.0.0 모듈을 탑재한 보드에 SF32LB587VEE56을 기재합니다. 펌웨어 타깃을 선택하거나 스토리지 구성에 의존하기 전에 실제 하드웨어의 실리콘 및 모듈 마킹을 확인하고 대응하는 설계 파일을 확인하십시오.

## 보드 주요 특징 { #board-highlights }

- 보드 버전에 따라 SF32LB58-MOD-N16R32N1 또는 SF32LB58-MOD-A128R32N1 모듈
- V1.0.1은 듀얼 16 MB HPI-PSRAM과 1 MB 인패키지 QSPI-NOR를 갖춘 SF32LB586VDD36 사용; V1.0.0의 MCU 식별자는 SiFli 소스에서 서로 충돌함(위의 버전 참고 참조)
- 모듈 변형에 따라 추가 16 MB QSPI-NOR 또는 128 MB QSPI-NAND
- 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털
- IPEX 안테나 커넥터와 모듈 RF 매칭 회로
- 전용 FPC 커넥터를 통한 MIPI DSI / RGB888 디스플레이 지원
- 40핀 헤더로 노출되는 듀얼 QSPI / DSPI / SPI 디스플레이 경로
- I2C 터치 패널 지원
- 온보드 아날로그 마이크 입력과 스테레오 Class-D 오디오 출력
- USB Type-C 포트 2개: USB-UART 플래싱/디버그용 1개, USB 2.0 HS용 1개
- SDIO 기반 MicroSD 카드 슬롯
- 40핀 헤더 2개를 통한 대형 코어 및 저전력 코어 GPIO 확장
- CAN 및 SDIO Wi-Fi 확장 기능

## 이 보드를 사용하는 경우 { #when-to-use-this-board }

프로젝트에 최소한의 브레이크아웃 보드가 아니라 실제 제품에 가까운 고급 디스플레이 및 주변 장치 검증 환경이 필요하다면 SF32LB58-DevKit-LCD를 선택하십시오.

- MIPI DSI, RGB888 또는 QSPI 디스플레이 패널 브링업
- 터치, 오디오, 스토리지, USB를 함께 검증
- SF32LB58x 플랫폼에서 고해상도 UI 동작 테스트
- CAN 또는 SDIO Wi-Fi 확장 평가
- NOR 기반과 NAND 기반 모듈 구성 비교
- 커스텀 PCB 작업 전에 플래그십급 보드에서 펌웨어 검증

모듈 수준의 통합 계획을 위해서는 [SF32LB58-MOD](../modules/SF32LB58-MOD.md)도 검토하십시오. 칩 제품군 아키텍처와 디스플레이/메모리 성능은 [SF32LB58x](../chips/SF32LB58x.md)를 참조하십시오.

## 하드웨어 구성 { #hardware-configuration }

<div align="center"><em>하드웨어 구성 요약</em></div>

<div align="center" markdown>

| 영역 | 구성 |
| :--- | :--- |
| 코어 모듈 | SF32LB58-MOD-N16R32N1 또는 SF32LB58-MOD-A128R32N1 |
| 보드 리비전별 MCU | V1.0.1: SF32LB586VDD36; V1.0.0: SiFli 소스 불일치(위의 버전 참고 참조) |
| 인패키지 메모리 (V1.0.1) | 16 MB + 16 MB HPI-PSRAM과 1 MB QSPI-NOR |
| 추가 스토리지 | 모듈 변형에 따라 16 MB QSPI-NOR 또는 128 MB QSPI-NAND |
| 디스플레이 | MIPI DSI, DPI/RGB888, QSPI 패널 지원 |
| 오디오 | 온보드 아날로그 마이크 경로와 스테레오 스피커 출력 |
| USB | USB-UART Type-C와 USB 2.0 HS Type-C |
| USB-UART 채널 | SiFli 보드 모델 가이드는 CH343K USB-UART 디버그 채널 2개를 나열하며, 상세 보드 가이드는 각 채널을 특정 Type-C 커넥터에 매핑하지 않음 |
| 스토리지 | SDIO 기반 MicroSD 카드 슬롯 |
| 안테나 | IPEX 커넥터를 갖춘 모듈 RF 경로 |
| 확장 | 대형 코어 및 저전력 코어 확장용 40핀 헤더 2개 |
| 컨트롤 및 테스트 포인트 | 사용자 버튼 2개(HOME/길게 누르기 리셋 및 기능), 별도의 리셋 버튼, MODE 부트 점퍼, UART/USB/CAN 테스트 포인트 |
| 전원 변환 | 온보드 DC-DC 컨버터; SiFli V1.0.1 변경 기록은 출력 리플을 줄이기 위한 컨버터 교체를 기록하지만 부품 번호는 밝히지 않음. 회로도/BOM에서 정확한 리비전을 확인하십시오. |
| 보드 크기 / 동작 온도 | 65 × 50 mm / −40~85 °C |

</div>

## 시작하기 { #getting-started }

### 필수 하드웨어 { #required-hardware }

- SF32LB58-DevKit-LCD 보드
- 용도에 맞는 MIPI DSI, RGB888 또는 QSPI를 사용하는 LCD 모듈
- USB 2.0 데이터 케이블, Type-A to Type-C 또는 동등품
- Windows, Linux 또는 macOS를 실행하는 호스트 컴퓨터

### 선택 하드웨어 { #optional-hardware }

- 스피커 2개
- TF / MicroSD 카드
- J-Link 또는 호환되는 SWD 디버거
- CAN 트랜시버 보드
- SDIO Wi-Fi 모듈

### 기본 설정 { #basic-setup }

1. 대상 디스플레이 패널을 올바른 LCD 커넥터에 연결하십시오.
2. USB-UART Type-C 포트를 호스트 컴퓨터에 연결하십시오.
3. SiFli의 플래싱 도구를 열고 올바른 COM 포트를 선택하십시오.
4. 다운로드 모드와 일반 실행 모드 중 원하는 모드에 따라 Mode 점퍼를 장착하거나 제거하십시오.
5. 보드에 전원을 켜고 대상 펌웨어를 기록하거나 실행하십시오.
6. 디스플레이 초기 구동을 확인한 뒤 터치, 오디오, 스토리지와 제품에 필요한 확장 주변 장치를 검증하십시오.

데이터 전송이 가능한 USB 케이블을 사용하십시오. 일부 Type-C 케이블은 전원만 공급하며 UART 또는 USB 데이터 경로를 노출하지 않습니다.

## 전원 { #power }

SF32LB58-DevKit-LCD는 USB Type-C로 전원을 공급받습니다.

- 온보드 USB Type-C 커넥터 두 개 모두 보드에 전원을 공급할 수 있습니다
- 펌웨어 플래싱과 UART 로깅에는 USB-UART Type-C 포트를 사용하십시오
- 네이티브 USB 기능 검증에는 USB 2.0 HS Type-C 포트를 별도로 사용하십시오

## 플래싱 및 디버그 { #download-and-debug }

펌웨어 플래싱과 시리얼 로그의 기본 인터페이스는 USB-UART Type-C 포트입니다.

- **다운로드 모드**: Mode 점퍼를 장착한 다음 보드에 전원을 켜거나 리셋하십시오
- **소프트웨어 디버그/로그 모드**: Mode 점퍼를 제거한 다음 보드에 전원을 켜거나 리셋하십시오

이 보드는 J-Link / SWD 디버그도 지원합니다.

![SF32LB58-DevKit-LCD J-Link 연결 참고도](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — J-Link 배선 참고도</em></div>

![J-Link 어댑터 참고도](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>J-Link 어댑터 참고도</em></div>

![SWD 어댑터 참고도](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>SWD 어댑터 참고도</em></div>

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli SDK 빌드 구성은 `scons --board=<board_name>`과 함께 다음의 정확한 보드 타깃 이름을 사용합니다.

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

이것들은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. [Supported Boards index](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)은 서로 다른 집합을 나열할 수 있으므로, 사용 중인 SDK 리비전에 대해 타깃을 확인하십시오. 특히 이 인덱스와 빌드 구성은 모든 58 시리즈 타깃을 같은 방식으로 설명하지 않으며, 현재 [개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)에는 `sf32lb58-lcd_n16r64n4`에 대응하는 물리 SKU가 나열되어 있지 않습니다.

## 주요 모듈 및 확장 신호 { #key-module-and-expansion-signals }

이 보드는 모듈 수준 신호와 40핀 확장 헤더 2개를 노출합니다. 전체 핀 맵은 모듈 데이터시트와 회로도 패키지를 참조하십시오. 아래 요약은 설계와 가장 관련이 큰 그룹을 다룹니다.

<div align="center"><em>주요 기능 신호 그룹</em></div>

<div align="center" markdown>

| 신호 그룹 | 대표 핀 / 신호 | 주요 용도 |
| :--- | :--- | :--- |
| 플래싱 및 디버그 | PB36, PB37, SWDIO, SWCLK, Boot_Mode, RSTN | UART 플래싱, 소프트웨어 디버그, SWD 브링업 |
| MicroSD | PA75, PA76, PA77, PA70, PA81, PA79, PB58 | SDIO 카드 인터페이스 및 카드 감지 |
| RGB LCDC1 | PA12–PA15, PA22–PA27, PA43–PA48, PA50, PA53–PA58, PA61–PA63, PA65, PA67 | RGB888 디스플레이 경로 |
| MIPI DSI LCDC1 | DSI_D0–DSI_D3 및 DSI_CLK 차동 쌍 | MIPI DSI 디스플레이 경로; 문서화된 동작은 최대 2개의 데이터 레인을 지원 |
| QSPI LCDC1 | PA82, PA84, PA86, PA88, PA90, PA91, PA51, PA52 | 대형 코어 측의 QSPI 디스플레이 경로 |
| QSPI LCDC2 | PB02–PB04, PB06, PB08–PB10, PB23, PB27, PB30, PB31, PB34 | 저전력 코어 측의 QSPI 디스플레이 경로 |
| 터치 | PA16, PA17, PA59, PA60, PA92, PA93 | 리셋, 인터럽트, I2C 터치 패널 신호 |
| 오디오 | AU_DAC1/2, AU_ADC1/2, MIC_BIAS, PB23 | 아날로그 오디오 입출력 및 PA 인에이블 |
| CAN / 범용 확장 | PA02, PA11 및 헤더 GPIO 그룹 | CAN 및 주변 장치 확장 |

</div>

## 디스플레이 인터페이스 { #display-interfaces }

이 보드는 세 가지 주요 디스플레이 경로를 지원합니다.

- 30핀, 0.5 mm 피치 FPC 커넥터를 통한 **MIPI DSI**
- 일반적인 ALIENTEK RGB 핀 배치와 호환되는 40핀, 0.5 mm 피치 FPC 커넥터를 통한 **RGB888**
- 40핀 확장 헤더 2개를 통한 **QSPI / DSPI / SPI**

SiFli 소스의 지원 디스플레이 지침은 다음과 같습니다.

- 최대 2레인 전송 및 최대 1280 × 800 해상도의 MIPI DSI 패널
- 최대 1280 × 800 해상도의 RGB888 패널
- 최대 512 × 512 해상도의 QSPI 패널

!!! warning "MIPI DSI 레인 수"
    이 보드의 30핀 커넥터 핀 배치는 D0–D3을 표기하지만, 보드 가이드와 SDK는 최대 2개의 데이터 레인으로 동작하는 것으로 문서화합니다. 커넥터 표기만으로 4레인 지원을 추정하지 마십시오. 사용 전에 해당 패널과 보드 리비전의 레인 배선을 확인하십시오.

![MIPI 디스플레이 연결 참고도](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — MIPI 디스플레이 배선 참고도</em></div>

![LCDC1 QSPI 디스플레이 연결 참고도](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC1 QSPI 디스플레이 배선</em></div>

![LCDC2 QSPI 디스플레이 연결 참고도](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC2 QSPI 디스플레이 배선</em></div>

## 오디오 { #audio }

이 보드가 지원하는 항목은 다음과 같습니다.

- 온보드 마이크 입력 경로 1개
- 오디오 ADC 입력 경로 2개; 저항 점퍼로 공유 경로 하나를 온보드 마이크에 연결할지 40핀 헤더 입력에 연결할지 선택
- 스피커 출력 2개
- RGB 신호와 멀티플렉싱되어 RGB 디스플레이 경로가 활성인 동안에는 사용할 수 없는 PDM 신호 경로 1개

SiFli의 [상세 보드 가이드](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html)는 스테레오 아날로그 출력의 정격을 최대 2.8 W/4 Ω으로 제시하는 반면, [개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)는 두 스피커 출력에 대해 3 W/4 Ω을 나열합니다. 이 정격이 채널당인지 합산인지는 어느 소스도 밝히지 않습니다. 스피커를 선택하기 전에 정확한 보드 리비전, 회로도, 앰프 전원/부하 조건을 확인하십시오. 어느 수치도 채널당 보장 출력으로 취급하지 마십시오.

![오디오 연결 참고도](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 오디오 배선 참고도</em></div>

## CAN 및 SDIO Wi-Fi 확장 { #can-and-sdio-wi-fi-expansion }

SF32LB58 모듈에는 CAN 컨트롤러가 포함되어 있으며, 이 보드는 외부 트랜시버와 함께 사용할 수 있도록 해당 인터페이스를 노출합니다.

![CAN 연결 참고도](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — CAN 배선 참고도</em></div>

![CAN 트랜시버 보드 참고 이미지](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>참고용 CAN 트랜시버 보드</em></div>

이 보드는 헤더 인터페이스를 통한 SDIO Wi-Fi 확장도 지원합니다.

![SDIO Wi-Fi 모듈 참고 이미지](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>참고용 SDIO Wi-Fi 모듈</em></div>

![SDIO Wi-Fi 연결 참고도](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — SDIO Wi-Fi 배선 참고도</em></div>

![SDIO Wi-Fi 회로도 참고 이미지](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>참고용 SDIO Wi-Fi 회로도</em></div>

## 관련 문서 { #related-documents }

[SF32LB58x Chip Introduction]: ../chips/SF32LB58x.md
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[SF32LB58-MOD Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[SF32LB58-DevKit-LCD Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[SF32LB58-DevKit-LCD LCEDA Project]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB58x 칩 소개][SF32LB58x Chip Introduction]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 사용자 설명서][SF32LB58x User Manual]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[SF32LB58-MOD 설계 패키지][SF32LB58-MOD Design Package]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD 설계 패키지][SF32LB58-DevKit-LCD Design Package]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD LCEDA 프로젝트][SF32LB58-DevKit-LCD LCEDA Project]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__

</div>
