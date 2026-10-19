---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: AMOLED, 터치, 센서, 오디오, 배터리 충전, 전류 측정을 지원하여 시스템 수준 저전력 평가에 적합한 웨어러블 지향 SF32LB52x 개발 보드입니다."
tags:
    - 하드웨어
    - 개발 보드
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## 개요 { #overview }

SF32LB52-DevKit-ULP는 **立创黄山派**, **LCKFB-HSPI-SF32LB52-ULP**, **SF32LB52-ULP**라는 이름으로도 알려져 있습니다. SF32LB52x 제품군을 기반으로 한 소형 초저전력 웨어러블 개발 보드로, 단순한 MCU 브레이크아웃 보드보다 스마트워치와 피트니스 밴드 시제품 제작에 적합한 구성을 갖췄습니다.

LCD, Nano, Core-3p3 보드보다 실제 제품 구성에 가깝습니다. SF32LB52 모듈, AMOLED 디스플레이, 터치, 마이크, 스피커 앰프, RGB LED, 진동 모터 구동부, 모션 센서, 자기 센서, 주변광 센서, 배터리 충전 회로, 전력 측정 점퍼를 한 보드에 통합했습니다. 따라서 "MCU가 동작하는가?"를 확인하는 데 그치지 않고, 배터리로 구동하는 웨어러블 시스템 전체의 동작을 평가할 때 특히 유용합니다.

SiFli의 [ULP 보드 가이드][Original SiFli Wiki Article]는 아직 자리 표시자입니다. 상세 구성은 V1.0.0 보드를 다루는 SiFli의 중국어 [Huangshan Pi 개발 보드 가이드][Original SiFli Huangshan Pi Guide]를 참조하십시오. 아래 부품 값은 해당 리비전의 기준입니다. 별도의 [LCKFB 하드웨어 위키][LCKFB hardware wiki]는 보드 리비전을 명시하지 않고 여러 부품 번호를 나열합니다. 이를 서로 호환되는 부품으로 간주하지 말고, 리비전 또는 출처 간 불일치 가능성을 고려해 설계 전에 실제 보드 마킹, 회로도, BOM을 확인하십시오.

**릴리스 상태 주의:** SiFli의 V1.0.0 가이드는 문서화된 보드가 당시 내부 시험용이었으며 외부 릴리스 전에 개정될 것이라고 밝힙니다. 이 설명은 해당 소스 리비전에만 해당하며, 이후 보드의 상태나 BOM을 보증하지 않습니다. 정확한 보드 리비전과 BOM을 확인하십시오.

[SiFli SDK 보드 페이지][SiFli SDK ULP Board Page]는 이 보드의 타깃을 `sf32lb52-lchspi-ulp`로 표기합니다. SDK 보드 페이지와 중국어 Huangshan Pi 가이드의 패키지 구성품 섹션은 `SF32LB52X-MOD-1-N16R8`을 사용하는 반면, SiFli [모듈 모델 가이드][SiFli Module Model Guide]와 GPIO 표 캡션은 `SF32LB52-MOD-1-N16R8`을 사용합니다. 이러한 `X`의 차이에 대한 설명은 소스에 없습니다. SDK 타깃은 명확하므로, 두 SKU 표기가 서로 다른 하드웨어를 가리킨다고 추정하지 말고 실제로 장착된 모듈의 마킹과 BOM을 확인하십시오.

![SF32LB52-ULP 웨어러블 보드 조립 참고도](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — 웨어러블 보드 조립 참고도</em></div>

![Huangshan Pi SF32LB52 블록 다이어그램](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>Huangshan Pi SF32LB52 — 블록 다이어그램</em></div>

## 명칭 { #naming }

<div align="center"><em>보드 명칭 별칭</em></div>

<div align="center" markdown>

| 이름 | 사용처 |
| :--- | :--- |
| SF32LB52-DevKit-ULP | SiFli/OpenSiFli 보드 제품군 명칭 |
| SF32LB52-ULP | 하드웨어/제품 약칭 |
| LCKFB-HSPI-SF32LB52-ULP | LCKFB 프로젝트/주문 명칭 |
| 立创黄山派 / 立创・黄山派 SF32LB52 | 중국어 제품 및 문서 명칭 |

</div>

하드웨어 문서, 예제, 구매 페이지, 커뮤니티 자료를 검색할 때 이 이름들을 같은 보드 제품군의 별칭으로 참고하십시오. 회로도, 핀 배치, BOM을 검토할 때는 정확한 보드 리비전과 해당 벤더의 문서를 확인하십시오.

## 보드 주요 특징 { #board-highlights }

- SF32LB52x 기반 SF32LB52-MOD-1-N16R8 모듈
- SF32LB525UC6 표준 모듈 구성
- 8 MB OPI-PSRAM, 144 MHz 인터페이스
- 128 Mb QSPI-NOR 플래시, 72 MHz STR 모드
- 48 MHz 메인 크리스털과 32.768 kHz RTC 크리스털
- 온보드 PCBA 안테나
- 1.85인치 AMOLED 디스플레이, 390 x 450 해상도
- 터치를 지원하는 Quad-SPI 디스플레이 인터페이스
- 온보드 MEMS 마이크
- Class-D 스피커 앰프를 갖춘 아날로그 오디오 출력
- 3 W / 4 Ω 또는 2 W / 8 Ω 스피커용 외부 스피커 커넥터
- 플래싱, 디버그, 전원 공급을 위한 CH340N 기반 USB Type-C UART 인터페이스
- 30핀 확장 커넥터로 노출되는 USB2.0 FS 신호
- SPI를 사용하는 MicroSD 카드 슬롯
- 기능 키 1개와 전원/리셋 키 1개
- SK6812MINI-HS RGB LED (SiFli Huangshan Pi V1.0.0 가이드 기준이며, 버전이 표기되지 않은 LCKFB 페이지에는 WS2812B-2020으로 기재되어 있음)
- 외부 모터 실장용 패드를 갖춘 진동 모터 구동 회로
- LSM6DS3TR-C 6축 IMU
- MMC5603NJ 3축 자기 센서
- LTR-303ALS-01 주변광 센서
- 웨어러블 전원 테스트를 위한 배터리 충전기 및 전원 관리 디바이스
- GPIO와 전류 측정을 지원하는 2 × 15핀, 1.27 mm 피치 확장 헤더

## 이 보드를 사용하는 경우 { #when-to-use-this-board }

웨어러블 시스템 검증이 목표라면 SF32LB52-DevKit-ULP / 立创黄山派를 선택하십시오.

- 시계, 밴드, 센서가 풍부한 웨어러블 프로토타입 제작
- SF32LB52x 플랫폼에서 AMOLED UI 동작 평가
- 터치, 모션 센싱, 자기 센싱, 주변광 센싱, 오디오, 진동, RGB LED 동작을 함께 테스트
- 슬립 및 활성 사용 중 배터리, 시스템, 3.3 V 전류 경로 측정
- 버튼, 센서, 터치, 펌웨어 타이머로 구동되는 웨이크업 흐름 검증
- 더 단순한 DevKit 보드의 초기 추정치와 실제 제품에 가까운 전력 동작 비교

디스플레이 중심의 범용 평가 보드가 필요하면 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)를 사용하십시오. 납땜 실장 방식의 소형 모듈 시제품 제작에는 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)를 사용하십시오. 벤치에서 초기 구동과 검증을 진행하면서 핀에 최대한 직접 접근하려면 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)를 사용하십시오.

## 하드웨어 구성 { #hardware-configuration }

<div align="center"><em>하드웨어 구성 요약</em></div>

<div align="center" markdown>

| 영역 | 구성 |
| :--- | :--- |
| 코어 모듈 | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB OPI-PSRAM, 144 MHz 인터페이스 |
| 플래시 | 128 Mb QSPI-NOR 플래시, 72 MHz STR 모드 |
| 디스플레이 | 1.85인치 AMOLED (ZC-A1D85W-010), 390 x 450, 800 cd/m², Quad-SPI |
| 디스플레이 드라이버 | CO5300AF-01 |
| 디스플레이 전원 IC | BV6802W |
| 터치 컨트롤러 | FT6146-M00 |
| 마이크 | 온보드 MEMS 마이크 |
| 스피커 출력 | Class-D 앰프, 외부 GH-1.25mm 스피커 커넥터 |
| 스토리지 | SPI 기반 MicroSD 카드 |
| 모션 센서 | LSM6DS3TR-C 6축 IMU |
| 자기 센서 | MMC5603NJ 3축 자력계 |
| 주변광 센서 | LTR-303ALS-01 |
| USB-UART | USB Type-C 기반 CH340N |
| 배터리 | GH1.25mm 커넥터를 통한 외부 Li-ion 배터리 |
| 충전기 | SY6103, 최대 충전 전압 4.5 V; 기본 450 mA 정전류 설정; 최대 전류 500 mA |
| 보호/전원 디바이스 | SY5320 OVP, LP5240HVF 로드 스위치, ETA5055V330DS2F LDO |

</div>

**리비전에 따라 다른 부품 목록 — 설계 전에 확인하십시오:** SiFli의 V1.0.0 [Huangshan Pi 가이드][Original SiFli Huangshan Pi Guide]는 SY6103 충전기, SY5320 OVP, SK6812MINI-HS RGB LED를 기재합니다. 반면 버전이 표기되지 않은 [LCKFB 하드웨어 위키][LCKFB hardware wiki]는 기능 목록에 AW32001ECSR, 충전 섹션에 AW23001ECSR, 그리고 LP5305AQVF OVP와 WS2812B-2020 RGB LED를 기재합니다. 이러한 차이가 하드웨어 리비전 때문인지 오래된 문서 때문인지는 소스에서 확인할 수 없습니다. SiFli V1.0.0 값은 해당 문서화 기준에만 사용하고, 부품별 동작에 의존하기 전에 실제 보드 마킹, 회로도, BOM을 확인하십시오.

## 패키지 구성품 { #package-contents }

Huangshan Pi 보드 세트에는 다음이 포함되는 것으로 문서화되어 있습니다.

- 코어 보드
- 스크린 보드
- 배터리
- 스피커

액세서리 번들은 판매처나 생산 배치에 따라 다를 수 있으므로, 실습 환경을 계획하기 전에 구매한 키트의 구성품을 확인하십시오.

## 전원 및 배터리 { #power-and-battery }

이 보드는 두 가지 기본 전원 모드를 지원합니다.

- USB Type-C 전원
- 배터리 단독 전원

배터리 입력은 정방향 핀 순서의 GH1.25mm 커넥터를 사용하는 단일 셀 Li-ion 배터리용입니다. 문서화된 충전 구성은 최대 충전 전류 500 mA, 기본 정전류 설정 450 mA를 지원합니다.

배터리 없이 벤치 전원으로 VBAT를 공급하여 보드를 사용할 때 문서화된 VBAT 입력 범위는 3.7 V~4.7 V이며, 정상 전압 공급 테스트에는 3.8 V를 권장합니다. SF32LB52-MOD-1-N16R8의 전원 임계값은 전원 켜짐 3.58 V, 전원 꺼짐 3.48 V로 문서화되어 있습니다.

LCKFB 하드웨어 가이드는 배터리가 연결되지 않은 경우 길게 누르기 키 기능이 동작하지 않을 수 있다고 경고합니다. 정확한 보드 리비전과 의도한 전원 구성에서 이 동작을 확인하십시오.

## 전력 측정 점퍼 { #power-measurement-jumpers }

이 보드는 주요 전원 경로에 대한 전류 측정용 점퍼를 제공합니다.

<div align="center"><em>전력 측정 점퍼 배정</em></div>

<div align="center" markdown>

| 핀 | 경로 | 용도 |
| :--- | :--- | :--- |
| 5-6 | VBAT 경로 | 배터리/충전기와 하위 시스템 사이에 전류계 삽입 |
| 7-8 | VSYS 경로 | VSYS 경로에 전류계 삽입 |
| 11-12 | VCC_3V3 경로 | 3.3 V 메인 레일에 전류계 삽입 |

</div>

정상 동작 시에는 핀 5-6, 7-8, 11-12를 점퍼로 단락해야 합니다. 전류계 또는 전력 분석기를 삽입할 때만 해당 점퍼를 제거하십시오.

## 플래싱 및 디버그 { #download-and-debug }

일반적인 개발 중 펌웨어 플래싱, 시리얼 로그, 보드 전원 공급에는 USB Type-C UART 인터페이스를 사용하십시오.

초기 구동과 검증에 필요한 하드웨어:

- SF32LB52-DevKit-ULP / 立创黄山派 보드
- USB 2.0 데이터 케이블
- Windows, Linux 또는 macOS를 실행하는 호스트 컴퓨터

선택 하드웨어:

- 외부 스피커
- TF 카드
- 450 mAh 이상의 Li-ion 배터리
- UART 디버그와 네이티브 USB 테스트를 동시에 해야 할 때 사용할 두 번째 USB 케이블

데이터 전송이 가능한 USB 케이블을 사용하십시오. 충전 전용 케이블은 보드에 전원을 공급할 수는 있지만 시리얼 데이터 인터페이스를 노출하지 않습니다.

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli의 SDK는 `scons --board=<board_name>`과 함께 정확한 보드 타깃 이름 `sf32lb52-lchspi-ulp`를 사용합니다. 이것은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. 사용 중인 SDK 리비전에 대해 [지원 보드 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)로 타깃을 확인하십시오.

## 주요 신호 배정 { #key-signal-assignments }

<div align="center"><em>주요 신호 배정</em></div>

<div align="center" markdown>

| 신호 | 기능 |
| :--- | :--- |
| PA44 | VBUS_DET, 충전기 삽입 감지 |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | 터치 인터럽트 |
| PA40 / PA39 | GPIO 배정 표에 따른 센서 I2C1 SCL / SDA; 아래의 헤더 핀 불일치 참조 |
| PA38 | VSYS에서 VSYS_1로의 스위치 제어 |
| PA37 / PA33 | 터치 I2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | HOME 키와 10초 길게 누르기 리셋 |
| PA32 | RGB LED 데이터 |
| PA31 | 센서 인터럽트 1 |
| PA30 | VSYS_1에서 HR3V3로의 스위치 제어 |
| PA27 | SD 카드 감지 |
| PA24, PA25, PA28, PA29 | SPI1 MicroSD 인터페이스 |
| PA20 | 진동 모터 PWM |
| PA19 / PA18 | 디버그 UART TXD / RXD |
| PA11 / PA10 | 충전기 I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | 마이크 바이어스 및 입력 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | 아날로그 오디오 출력 |
| PA08..PA03, PA02, PA01, PA00 | QSPI 디스플레이, TE, 백라이트 PWM, 리셋 |
| PA15..PA12, PA16, PA17 | MPI2 / SD1 신호, N16R8 모듈에서는 모듈 플래시가 내부적으로 사용 |

</div>

## 30핀 확장 헤더 { #30-pin-expansion-header }

30핀 헤더는 전원, USB, 센서, 디스플레이 인접, 스토리지, 진동, 디버그, 키, 충전기 제어 신호를 노출합니다.

<div align="center"><em>30핀 확장 헤더 신호 맵</em></div>

<div align="center" markdown>

| 핀 그룹 | 신호 | 비고 |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | USB 연결 시 USB의 5 V; USB가 연결되지 않은 경우 5 V 입력으로 사용 가능 |
| 3-4 | GND | 그라운드 |
| 5-6 | VBAT_S / VBAT | 정상 동작 시 단락; VBAT 전류 측정 시 개방 |
| 7-8 | VSYS_S / VSYS | 정상 동작 시 단락; VSYS 전류 측정 시 개방 |
| 9-10 | GND | 그라운드 |
| 11-12 | VCC_3V3_S / VCC_3V3 | 정상 동작 시 단락; 3.3 V 전류 측정 시 개방 |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | SiFli의 V1.0.0 헤더 표는 이를 센서 I2C1 SDA / SCL로 표기하며, 14번 핀은 GPIO 배정 표와 충돌함(아래 참조) |
| 17 | PA32 | RGB LED 데이터, GPIO로도 사용 가능 |
| 18 | PA30 | 센서 전원 제어; GPIO로 사용하면 PA39/PA40 동작에 영향을 줄 수 있음 |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | SPI1/SD 카드 관련 핀; 확장용으로 사용하면 온보드 TF 카드와 충돌 |
| 24 | PA20 | 진동 PWM; 확장용으로 사용하면 모터 구동과 충돌 |
| 25 / 27 | PA19 / PA18 | 디버그 UART TXD / RXD |
| 26 / 28 | PA34 / PA43 | 전원/리셋 키와 기능 키 |
| 29 / 30 | PA11 / PA10 | 충전기 I2C0 SDA / SCL |

</div>

**소스 핀 배치 불일치 — 배선 전에 확인하십시오:** SiFli의 V1.0.0 GPIO 배정 표는 센서 I2C1_SDA를 PA39에 매핑하지만, 30핀 헤더 표는 헤더 14번 핀을 PB39로 식별하고 I2C1_SDA로 표기합니다. 16번 핀은 PA40/I2C1_SCL로 기재되어 있습니다. LCKFB 표도 PA39/PB39의 차이를 그대로 반복하며, 보드 리비전을 밝히지도, 항목 간 불일치를 해소하지도 않습니다. 헤더 14번 핀의 MCU 패드/경로는 확정되지 않은 것으로 취급하십시오. 주변 장치를 연결하기 전에 해당 보드의 회로도/BOM을 확인하고 도통을 검증하십시오. PA39와 PB39가 서로 교환 가능하다고 가정하면 안 됩니다.

## 디스플레이 및 터치 인터페이스 { #display-and-touch-interface }

이 보드는 AMOLED 디스플레이 경로를 사용하며 22핀 QSPI FPC 신호 세트를 노출합니다. SiFli의 V1.0.0 표는 5~10번 핀을 NC로 표기합니다. 아래 표는 22개 위치를 모두 포함하며 해당 핀을 명시적으로 나타냅니다.

<div align="center"><em>22핀 QSPI 디스플레이 및 터치 FPC 신호 맵</em></div>

<div align="center" markdown>

| 핀 | 신호 | 기능 |
| :--- | :--- | :--- |
| 1 | VBAT | 디스플레이 측 VBAT 출력 |
| 2 | PA01 | TFT 방식 용도의 백라이트 PWM |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | 연결되지 않음 |
| 6 | NC | 연결되지 않음 |
| 7 | NC | 연결되지 않음 |
| 8 | NC | 연결되지 않음 |
| 9 | NC | 연결되지 않음 |
| 10 | NC | 연결되지 않음 |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | LCD 리셋 |
| 13 | PA04 | QSPI/SPI 클럭 |
| 14 | PB05 (SiFli V1.0.0 FPC 표) | QSPI D0 / SPI SDI; 별도의 GPIO 배정 표에는 PA05로 기재 |
| 15 | PA03 | QSPI/SPI 칩 셀렉트 |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V 출력 |
| 18 | PA41 | 터치 인터럽트 |
| 19 | PA33 | 터치 I2C SDA |
| 20 | PA37 | 터치 I2C SCL |
| 21 | PA09 | 터치 리셋 |
| 22 | GND | 그라운드 |

</div>

**소스 핀 배치 불일치 — 디스플레이를 연결하기 전에 확인하십시오:** SiFli의 V1.0.0 22핀 FPC 표는 QSPI D0에 대해 커넥터 14번 핀에 PB05를 배정하지만, 별도의 GPIO 배정 표는 해당 신호에 PA05를 기재합니다. LCKFB FPC 표도 PB05를 기재하지만 GPIO 표는 PA05를 사용합니다. 두 소스 모두 모듈 패드와 커넥터 표기가 서로 어떤 관계인지 설명하지 않습니다. 해당 보드 리비전의 회로도/BOM을 확인하거나 도통을 검증하기 전까지는 전기적 경로를 확정되지 않은 것으로 취급하십시오. PA05와 PB05가 서로 교환 가능하다고 가정하면 안 됩니다.

## 전력 측정 가이드 { #power-measurement-guidance }

유용한 초저전력 측정을 위한 지침입니다.

- 가능하면 VBAT, VSYS, VCC_3V3를 각각 따로 측정하십시오.
- 측정 대상이 아닌 레일의 점퍼는 올바르게 단락된 상태로 유지하십시오.
- 슬립 전류를 측정하기 전에 RGB LED 효과, 디버그 로깅, 디스플레이 리프레시, 센서 폴링과 같이 피할 수 있는 부하를 비활성화하십시오.
- 모든 측정에 보드 리비전, 펌웨어 커밋, 배터리 또는 전원 전압, 점퍼 구성, 센서 상태를 기록하십시오.
- 안정 상태의 슬립 전류와 터치, 센서 인터럽트, Bluetooth 활동, 디스플레이 웨이크, 진동 이벤트에 대한 이벤트 전류를 모두 측정하십시오.

## 관련 문서 { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[Original SiFli Huangshan Pi Guide]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[SiFli SDK ULP Board Page]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[SiFli Module Model Guide]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[LCKFB Project Page]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[LCKFB Hardware Wiki]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 칩 소개][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[SF32LB52x 하드웨어 설계 가이드][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[SiFli 위키 원문][Original SiFli Wiki Article]__
- :fontawesome-solid-up-right-from-square: __[LCKFB 프로젝트 페이지][LCKFB Project Page]__
- :fontawesome-solid-book: __[LCKFB 하드웨어 위키][LCKFB Hardware Wiki]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__

</div>
