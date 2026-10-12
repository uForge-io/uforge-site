---
icon: lucide/card-sim
description: "SF32LB58-MOD: SF32LB586VDD36 기반 저전력 Bluetooth MCU 모듈로, 표준 16 + 16 MB HPI-PSRAM, 1 MB QSPI-NOR과 NOR, NAND 또는 eMMC 스토리지 변형을 제공합니다."
tags:
  - 하드웨어
  - 모듈
---

# SF32LB58-MOD

## 개요 { #overview }

SF32LB58-MOD는 SiFli의 SF32LB586VDD36을 기반으로 하는 저전력 Bluetooth MCU 모듈입니다. 표준 구성에는 16 + 16 MB HPI-PSRAM과 1 MB QSPI-NOR이 포함됩니다. 24 × 24 × 3.1 mm 크기의 이 모듈은 트리플 코어 플랫폼, RF 경로, 크리스털, 메모리 옵션을 디스플레이, 오디오, 스토리지, 제어용 외부 인터페이스와 결합합니다.

이 모듈은 BGA256 디바이스, RF 경로, 크리스털, 고속 메모리를 모듈 안에 통합하여, 제품 캐리어 보드에서 필요한 관련 라우팅을 줄여 줍니다. 완성된 제품에는 여전히 RF 검증과 해당 규제 승인이 필요합니다. 캐리어 보드 설계를 확정하기 전에 선택한 SKU의 안테나 옵션과 메모리 구성을 확인하십시오.

선택한 모듈 SKU에 따라, 이 플랫폼은 HPI-PSRAM을 QSPI-NOR, QSPI-NAND 또는 eMMC 스토리지와 조합할 수 있습니다. 모듈의 인터페이스는 MCU급 플랫폼을 유지하면서 디스플레이, 오디오, 스토리지, 연결 기능이 필요한 제품을 지원합니다.

DS5802 V0.1에는 온모듈 PCB 안테나와 외부 안테나 구성이 기재되어 있습니다. 외부 안테나는 캐슬레이션 패드 또는 1세대 외부 안테나 커넥터로 연결할 수 있으며, 이 커넥터는 Hirose U.FL, I-PEX MHFI, Amphenol AMC 커넥터와 호환됩니다. 데이터시트는 이러한 옵션을 개별 SKU와 대응시키지 않으므로, 캐리어 보드 레이아웃을 확정하기 전에 선택한 모듈의 안테나 구현을 SiFli에 확인하십시오.

!!! info
    기반 칩 제품군, 아키텍처, 주변 장치 구성은 [SF32LB58x](../chips/SF32LB58x.md)를 참고하십시오. 이 페이지는 모듈별 통합, 메모리 변형(variant), 전원 레일, 제품 적합성 결정에 초점을 맞춥니다.

## 애플리케이션 { #applications }

SiFli는 SF32LB58-MOD의 애플리케이션 분야로 다음을 제시합니다.

- 웨어러블: 고급 스마트워치, 스마트 밴드, 웨어러블 의료 기기, 피트니스 장비
- 산업: 비용 효율적인 디스플레이 솔루션, 그래픽 HMI, 산업용 센서 제어 센터, 설비 모니터링, 계측기
- 자동차: 전기차 중앙 제어 장치, 차량 키, 차량용 웨어러블 리모컨
- 홈 오토메이션: 중소형 스마트 가전과 스마트 도어록
- 범용: 저전력 센서 허브와 Bluetooth Mesh
- AIoT 사례: 음성 명령 인식, 스마트 홈 디바이스, 스마트 키, 스마트 컨트롤 패널

설계에 다음 기능 중 하나 이상이 필요하다면 SF32LB58-MOD를 검토하십시오.

- BGA256 디바이스, RF 경로, 크리스털, 고속 메모리의 모듈 수준 통합
- 온모듈 PCB 안테나, 또는 캐슬레이션 패드나 Hirose U.FL, I-PEX MHFI, Amphenol AMC 커넥터와 호환되는 커넥터로 연결하는 외부 안테나. SKU 구성을 확인하십시오.
- QSPI-NOR, QSPI-NAND, eMMC 구성에 걸친 메모리 선택
- 디스플레이, 오디오, 스토리지, 제어를 위한 외부 인터페이스

## 개발 리소스 { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Chip Introduction]: ../chips/SF32LB58x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## 기능 및 사양 { #features-and-specifications }

### 연산 및 메모리 { #compute-and-memory }

- 최대 240 MHz의 Arm Cortex-M33 STAR-MC1 애플리케이션 코어 2개
- 최대 96 MHz의 사용자 프로그래밍 가능 Arm Cortex-M33 STAR-MC1 저전력 코어 1개
- 애플리케이션 코어당 최대 370 DMIPS / 984 EEMBC CoreMark
- 저전력 코어에서 최대 148 DMIPS / 394 EEMBC CoreMark
- 2176 KB SRAM(HCPU) + 512 KB SRAM(ACPU) + 1056 KB 리텐션 SRAM(LCPU)
- 모든 코어에 단정밀도 FPU 및 MPU 탑재

### 무선 연결 { #wireless-connectivity }

- BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3
- 125 kbps BLE Long Range에서 -107.5 dBm 수준의 수신 감도
- 최대 송신 전력: 19 dBm(BR/BLE), 13 dBm(EDR2/EDR3)
- BR/EDR2/EDR3 피크 수신 전류: 2.2 mA @ 3.3 V

### 그래픽, 디스플레이 및 멀티미디어 { #graphics-display-and-multimedia }

- ePicasso 2.0 2D/2.5D 그래픽 엔진
- Vivante GCNanoUltraV 벡터 그래픽 엔진
- 하드웨어 JPEG 코덱
- 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI, JDI를 지원하는 듀얼 LCD 컨트롤러
- TurboPixel: extDMA가 고정 비율 손실 압축으로 최종 프레임버퍼를 압축하고, 디스플레이 컨트롤러가 이를 압축 해제합니다. 이를 통해 주어진 워크로드에 필요한 PSRAM 대역폭과 프레임버퍼 용량이 줄어듭니다.
- 두 LCD 컨트롤러 모두 상시 표시(always-on-display) 지원

### 오디오 { #audio }

- 24비트 오디오 DAC 2개
- 24비트 Sigma-Delta ADC 2개
- PDM 인터페이스 2개(PDM1/PDM2)
- 모두 마스터 모드인 I2S 인터페이스 3개. I2S1은 입력 전용이며, I2S2와 I2S3은 입력과 출력을 지원합니다.
- 모듈 인터페이스로 노출되는 아날로그 오디오 입출력 지원

[SF32LB58x 하드웨어 설계 가이드](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html)에는 PDM 마이크 입력이 2개(PDM1, PDM2) 나열되어 있습니다. PDM 인터페이스 하나는 마이크 채널 2개를 전달할 수 있습니다. SiFli의 [PDM SDK 예제](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)는 인터페이스 하나의 좌/우 채널로 마이크 2개를 캡처하는 방식, 또는 PDM1과 PDM2에 걸쳐 마이크 4개를 캡처하는 방식을 보여 줍니다. 그러나 이 예제는 SF32LB58-MOD를 지원 플랫폼으로 나열하지 않습니다. 이 모듈에서는 대상 SDK에서 의도한 마이크/채널 구성을 확인하고 핀 멀티플렉싱과 캐리어 보드 라우팅을 점검하십시오. 인터페이스가 2개라는 사실만으로 마이크 4개 지원을 추론해서는 안 됩니다.

### 스토리지 인터페이스 및 모듈 변형 { #storage-interfaces-and-module-variants }

<div align="center"><em>SF32LB58-MOD 모듈 변형</em></div>

<div align="center" markdown>

| 모듈 코드 | 선택 가능한 스토리지 | PSRAM | 표준 플래시 | 온도 | 크기 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 24 × 24 × 3.1 mm |

</div>

[SiFli 모듈 모델 가이드](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)는 이 변형들을 나열하며, eMMC가 내부 디바이스로 포함될 수 있다고 설명하고, 그 밖의 구성은 맞춤 제작할 수 있다고 명시합니다. 필요한 스토리지 매체와 용량에 따라 SKU를 선택한 다음, 공급 가능 여부와 메모리 구성을 SiFli에 확인하십시오. 또한 선택한 디바이스와 부팅/스토리지 경로를 대상 SDK와 펌웨어가 지원하는지 확인하십시오.

### 전원, 패키지 및 I/O { #power-package-and-io }

- 모듈 패키지: 24 × 24 × 3.1 mm
- 동작 온도: -40~85 °C
- VDD_3V3: 2.97~3.6 V
- VDD_1V8: 1.7~1.95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1.7~3.6 V
- VDD_3V3은 AVDD33_ANA, AVDD33_AUD, AVDD_USB에 전원을 공급하며, eMMC를 실장한 경우 eMMC VDD 입력에도 전원을 공급합니다. SiFli는 이 레일에 LDO를 사용할 것을 권장합니다.
- VDD_1V8은 PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI와 코패키지 메모리에 전원을 공급합니다.
- VDDIOA는 PA00~PA11을 제외한 PA I/O, 외부 플래시, eMMC를 실장한 경우 eMMC VIO에 전원을 공급합니다. VDDIOA2는 PA00~PA11에, VDDIOB는 PB I/O에 전원을 공급합니다.
- 138핀 모듈 인터페이스. 멀티플렉싱된 핀은 GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS, 오디오를 포함한 기능을 노출합니다.

## 관련 제품 { #related-products }

### 칩 { #chip }

[SF32LB58x](../chips/SF32LB58x.md)를 기반으로 합니다. 모듈의 배경이 되는 더 넓은 범위의 그래픽, 메모리, 디스플레이 아키텍처는 칩 페이지를 참고하십시오.

### 개발 키트 { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) 보드는 모듈을 사용하는 커스텀 캐리어 설계로 넘어가기 전에 펌웨어 검증, 디스플레이 브링업, 오디오/스토리지 경로 점검을 시작하기에 실용적인 출발점입니다.

### 레퍼런스 제품 { #reference-products }

SiFli가 문서화한 애플리케이션 분야에는 웨어러블, 산업용 디스플레이 및 HMI 장비, 차량 제어 제품, 스마트 홈 가전, 저전력 센서 허브, Bluetooth Mesh 제품이 포함됩니다.
