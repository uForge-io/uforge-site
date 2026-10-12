---
icon: lucide/microchip
description: "SF32LB52x: 웨어러블과 소형 AIoT 제품을 위한 비용 최적화 듀얼 코어 Arm Cortex-M33 AIoT MCU 제품군으로, 배터리 전원 SF32LB520/3/5/7과 외부 전원 52B/D/E/G/J 변형으로 구성됩니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB52x

## 개요

SF32LB52x는 SiFli의 비용 최적화 MCU 제품군입니다. 디스플레이, 오디오, 스토리지, 무선 기능이 통합되어야 하는 보급형 스마트 웨어러블, 소형 그래픽 HMI, Bluetooth 주변 장치 등 공간 제약이 있는 AIoT 제품을 대상으로 합니다.

플랫폼 수준에서 이 제품군은 240 MHz Arm Cortex-M33 STAR-MC1[^1] 애플리케이션 코어와 전용 24 MHz 저전력 Bluetooth 컨트롤러 코어를 결합합니다. 이를 통해 반응성이 좋은 UI와 애플리케이션 스택을 실행하면서도 Bluetooth 연결과 상시 동작(always-on) 워크로드를 분리할 수 있습니다.

제품 기획 관점에서, SiFli 칩 모델 가이드의 주요 변형(variant)은 전원 방식에 따라 두 그룹으로 나뉩니다.

- **SF32LB520/3/5/7**: 충전 경로가 통합된 리튬 이온 배터리 전원 변형
- **52B/D/E/G/J**: 외부 전원 변형. 52B/E/G/J는 표준 3.3V 시스템을, **52D**는 특수한 1.8V 초저전력 레일을 대상으로 합니다.

이 그룹들은 보드 수준에서 서로 호환되지 않습니다. 배터리 전원 제품군과 외부 전원 제품군은 서로 핀 호환이 되지 않으며, 1.8 V 52D 변형은 패키지 레이아웃이 비슷해 보이더라도 3.3 V 52B/E/G/J 그룹과 전기적으로 다릅니다.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델 덕분에 기존 Cortex-M33 펌웨어, 미들웨어, RTOS 포트, 툴을 이어서 사용하기 쉬우며, 디바이스별 일반적인 통합 작업은 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

## 애플리케이션

**SF32LB52x는 다음과 같이** 비용, 통합도, 배터리 수명이 핵심 설계 요소인 Bluetooth 중심 제품에 **권장됩니다.**

- 보급형 스마트워치 및 피트니스 밴드
- Bluetooth 모듈 및 무선 어댑터
- Bluetooth 오디오 액세서리
- 스마트 센서 및 웨어러블 디바이스
- 전자 가격표(Electronic Shelf Label)와 스마트 배지
- 휴대용 라벨 프린터
- eBike 및 eScooter 디스플레이
- LVGL 기반의 기본 HMI 디바이스

## 개발 리소스 { #development-resources }

[Product Brief (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Datasheet (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Product Brief (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Datasheet (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## 기능 및 사양

### 연산 및 메모리

- 최대 240MHz의 Arm Cortex-M33 STAR-MC1 애플리케이션 코어, DSP 및 MPU 포함
- 24MHz의 전용 Arm Cortex-M33 STAR-MC1 Bluetooth 컨트롤러 코어
- 32 KB 명령어 캐시 + 16 KB 데이터 캐시
- 512 KB 애플리케이션 SRAM과 64 KB Bluetooth 컨트롤러 SRAM
- 변형에 따라 1MB QSPI-NOR부터 16MB OPI-PSRAM까지 선택 가능한 코패키지 메모리 구성

### 그래픽 및 오디오

- ePicasso 2.0 2D/2.5D 그래픽 가속기
- 무손실 그래픽 압축용 eZip 2.0 하드웨어 디코더
- SPI/DSPI/QSPI(e-paper SPI 포함)와 8080-8bit를 지원하는 전용 LCD 컨트롤러
- SNR 99 dB의 24비트 오디오 ADC 1개
- SNR 109 dB의 24비트 오디오 DAC 1개

### 무선 연결

- 듀얼 모드 Bluetooth 5.3(Classic Bluetooth 및 BLE)
- 최대 송신 전력:
    - BLE/BR: 19 dBm
    - BT/EDR2 및 BT/EDR3: 13 dBm
- 수신 감도: -100 dBm @ BLE/1Mbps
- 64 KB SRAM을 갖춘 24 MHz 전용 Arm Cortex-M33 STAR-MC1 Bluetooth 컨트롤러 코어
- 슬립 전류: 제품 브리프 기준 2 µA. 시스템 수준의 Standby 전류는 동작 모드와 보드 수준의 누설에 따라 달라집니다.

### 보안

- AES/HASH/CRC 하드웨어 가속기
- TRNG
- PSA Certified Level 1

### 주변 장치 및 I/O

- UART 3개
- I2C 4개
- SPI 2개
- USB2.0 FS 1개
- I2S 1개
- PDM 인터페이스 1개(디지털 마이크 최대 2개)
- SD3.0/SDIO3.0/eMMC 1개
- 12비트 범용 ADC 1개
- 온도 센서
- RTC 및 워치독 타이머
- 변형 제품군에 따라 44개 또는 45개의 GPIO

### 전원 공급

- **배터리 전원 그룹: SF32LB520/3/5/7** — 단일 셀 Li-ion/Li-Po 배터리로 직접 전원을 공급받으며, 충전 중심의 통합 전원 아키텍처를 사용하는 설계를 대상으로 합니다.

- **외부 전원 3.3V 그룹: 52B/E/G/J** — 레귤레이션된 외부 전원 시스템을 대상으로 하며, 서로 핀 호환이 됩니다.

- **외부 전원 1.8V 그룹: SF32LB52D** — 특수한 초저전력 1.8V 설계를 대상으로 하며, 3.3V 부품과 전기적으로 호환되지 않습니다.

배터리 전원 그룹과 외부 전원 그룹은 서로 독립된 실리콘 구성이며, 이 전원 제품군 간에는 **핀 호환이 되지 않습니다**.

## 제품군 변형

SiFli 칩 모델 가이드에 나열된 주요 변형을 기준으로, 실제 부품 선택은 다음과 같이 나뉩니다.

- **SF32LB520/3/5/7**: 리튬 이온 배터리 전원 그룹으로, 그룹 내에서 핀 호환
- **52B/E/G/J**: 표준 3.3V 외부 전원 그룹으로, 그룹 내에서 핀 호환
- **SF32LB52D**: 초저전력 시나리오를 위한 특수 1.8V 외부 전원 변형

메모리 등급 간에 마이그레이션하는 경우, 내용상 가장 가까운 대응 관계는 다음과 같습니다.

- 520 ↔ 52B
- 523 ↔ 52E, 1.8V 대응 제품은 52D
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>SF32LB52x 주요 변형</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| 패키지 | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| 크기 | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm |
| 피치 | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm |
| GPIO | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| 코패키지 메모리 | 1MB QSPI-NOR | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM | 1MB QSPI-NOR | 4MB QSPI-NOR | 4MB OPI-PSRAM | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM |
| 전원 공급 범위 | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 2.97–3.63 V | 2.97–3.63 V | 1.71–1.98 V | 2.97–3.63 V | 2.97–3.63 V | 2.97–3.63 V |
| I/O 전압 | 3.3V | 3.3V | 3.3V | 3.3V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V |
| 온도 | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

이 표는 SiFli [칩 모델 가이드](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)의 주요 변형을 따른 것이며, 전체 주문 카탈로그는 아닙니다. 링크된 외부 전원 데이터시트에는 **SF32LB52HUD6**(1.8 V, QFN68L, 128 Mb PSRAM)도 나열되어 있고, 하드웨어 가이드에는 `52AUx6` 및 `52D/F/HUx6`이라는 추가 접미사 패턴이 사용됩니다. 확보 가능한 자료만으로는 일관된 단일 변형 표를 얻을 수 없습니다. 설계를 릴리스하기 전에 이러한 SKU의 주문 가능 여부, 공급 전압 한계, 메모리 인터페이스, I/O 세부 사항을 최신 데이터시트에서 확인해야 합니다.

## 통합 경로 { #integration-path }

SF32LB52x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 필요한 주변 장치와 Bluetooth 동작을 검증하십시오.
2. **통합 방식 선택.** 통합이 끝난 RF 모듈이 제품에 적합하면 [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md)을 평가하고, 그렇지 않으면 초기 펌웨어 및 주변 장치 검증용으로 가장 가까운 [SF32LB52 개발 보드](../devkits/SF32LB52-DevKit-LCD.md)를 선택하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 로컬 [하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md)와 그 [회로도](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) 및 [PCB 레이아웃](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md) 체크리스트를 사용하십시오. 전원 제품군의 기준 구성이 520/3/5/7, 52B/E/G/J, 52D 중 무엇인지 올바르게 확인하십시오.
4. **주요 정보 출처 확인.** 해당 [데이터시트](#development-resources)와 SiFli [hardware design guide for 520/3/5/7] 또는 [hardware design guide for 52B/D/E/G/J]를 실제 주문할 부품 및 패키지와 대조하여 확인하십시오.

## 관련 제품

### 모듈

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md)은 표준 구성에서 8 MB 코패키지 OPI-PSRAM을 탑재한 SF32LB525UC6와 RF 매칭 회로를 결합한 제품입니다. 크기는 27.9 × 18.0 × 3.1 mm이며, 칩 수준의 RF 레이아웃과 검증을 직접 수행하지 않고 SF32LB52급 기능을 사용하려는 프로젝트에 적합합니다.

### 개발 키트

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md)는 SF32LB52 모듈 생태계에서 디스플레이 중심 브링업을 위한 주력 보드이며, QSPI 및 MCU/8080 LCD 연결을 제공합니다.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md)은 52B/52J급 부품에서 펌웨어, GPIO, 저전력 브링업을 빠르게 수행하기 위한 소형 외부 전원 코어 보드입니다.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md)는 52 시리즈에서 가장 작은 개발 보드로, 목표 제품의 크기 제약이 클 때 유용합니다.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md)는 배터리 중심 평가와 소형 제품 실험을 위한 저전력 지향 보드 경로입니다.

### 레퍼런스 제품

일반적인 SF32LB52 설계로는 보급형 스마트워치, 피트니스 밴드, Bluetooth 액세서리, 소형 그래픽 컨트롤, 전자 가격표, 스마트 배지, 휴대용 라벨 프린터, 비용에 민감한 eBike 또는 eScooter 디스플레이가 있습니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 기존 원본 문서 없이 정리하여 작성되었습니다. 기술적 내용을 사용하기 전에 SiFli 공식 문서와 대조하여 확인하십시오.
