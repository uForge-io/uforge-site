---
icon: lucide/card-sim
description: "SF32LB56-MOD: SF32LB56xV 기반의 범용 저전력 Bluetooth 5.3 MCU 모듈 제품군으로, 4 MB + 8 MB 코패키지 OPI-PSRAM과 SKU에 따라 달라지는 플래시 변형을 제공합니다."
tags:
  - 하드웨어
  - 모듈
---

# SF32LB56-MOD

## 개요 { #overview }

SF32LB56-MOD는 SF32LB56xV 플랫폼을 기반으로 하는 SiFli의 범용 저전력 Bluetooth MCU 모듈 제품군입니다. 표준 구성은 4 MB + 8 MB 코패키지 OPI-PSRAM과 1 MB QSPI-NOR을 갖춘 SF32LB566VCB36을 사용합니다. 이 모듈은 듀얼 코어 MCU 처리, BLE Audio를 지원하는 Bluetooth 5.3, 그래픽 가속, 오디오 인터페이스, SKU에 따라 달라지는 플래시 변형(variant), 통합 RF 경로를 소형 폼 팩터에 결합합니다.

이 모듈은 RF 경로, 크리스털, 고속 메모리를 통합하며, 온모듈 PCB 안테나 또는 IPEX 호환 커넥터로 연결하는 외부 안테나를 지원합니다. 완성된 제품에서 RF 성능을 검증하고, 선택한 안테나 구성에 맞춰 캐리어 보드를 설계하십시오. 모듈의 인터페이스와 메모리 구성은 디스플레이, 오디오, 센싱, 로컬 처리 요구 사항이 있는 제품을 지원합니다.

이 제품군은 여러 메모리 구성으로 제공됩니다. 모든 변형의 크기는 18.0 × 32.9 × 3.1 mm이며 -40~85 °C 동작이 보장됩니다. DS5602 V0.3을 기반으로 하는 [SF32LB56-MOD 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md)에서 안테나와 레이아웃에 관한 추가 세부 정보를 확인할 수 있습니다. SiFli 모듈 모델 가이드는 메모리 구성을 나열하지만 안테나 옵션을 SKU와 대응시키지는 않습니다. 캐리어 보드 레이아웃을 확정하기 전에 선택한 모듈의 안테나 구성을 SiFli에 확인하십시오.

!!! info
    아래의 연산, 그래픽, 오디오 기능은 모듈에 통합된 SF32LB56xV 플랫폼을 설명한 것이며, 외부에서 실제로 사용할 수 있는지는 모듈 핀 배치와 핀 멀티플렉싱에 따라 달라집니다. 칩 제품군의 아키텍처와 전체 주변 장치 구성은 [SF32LB56x](../chips/SF32LB56x.md)를 참고하십시오. 이 페이지는 모듈 통합, SKU에 따른 메모리, 전원 레일, 제품 적합성에 초점을 맞춥니다.

## 애플리케이션 { #applications }

SiFli는 SF32LB56-MOD의 애플리케이션 분야로 다음을 제시합니다.

- 웨어러블: 고급 스마트워치, 스마트 밴드, 웨어러블 의료 기기, 피트니스 장비
- 산업: 비용 효율적인 디스플레이 솔루션, 그래픽 HMI, 산업용 센서 제어 센터, 설비 모니터링, 계측기
- 자동차: 전기차 중앙 제어 장치, 차량 키, 웨어러블 차량 리모컨
- 홈 오토메이션: 중소형 스마트 가전과 스마트 도어록
- 범용: 저전력 센서 허브와 Bluetooth Mesh
- AIoT 사례: 음성 명령 인식, 스마트 홈 디바이스, 스마트 키, 스마트 컨트롤 패널

설계에 다음 기능 중 하나 이상이 필요하다면 SF32LB56-MOD를 검토하십시오.

- RF 경로, 안테나 선택지, 크리스털, 고속 메모리의 모듈 수준 통합
- 나열된 모듈 SKU 전반에 걸친 메모리 구성 선택
- 디스플레이, 오디오, 센싱, 로컬 처리를 위한 인터페이스
- 공간 제약이 있는 제품을 위한 소형 모듈 크기

## 개발 리소스 { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB56x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[SF32LB56x Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## 기능 및 사양 { #features-and-specifications }

### 연산 및 메모리 { #compute-and-memory }

- HCPU: 최대 240 MHz, 최대 370 DMIPS / 984 EEMBC CoreMark의 Arm Cortex-M33 STAR-MC1
- LCPU: 최대 96 MHz, 최대 148 DMIPS / 394 EEMBC CoreMark의 Arm Cortex-M33 STAR-MC1
- HCPU 메모리 시스템: 32 KB 명령어 캐시, 16 KB 데이터 캐시, 128 KB 리텐션 SRAM을 포함한 800 KB SRAM
- LCPU 메모리 시스템: 16 KB 명령어 캐시, 8 KB 데이터 캐시, 160 KB 리텐션 SRAM
- 두 코어 모두 단정밀도 FPU 및 MPU 탑재
- 더 풍부한 로컬 워크로드를 위한 신경망 행렬 가속기와 신호 처리 가속기

### 무선 연결 { #wireless-connectivity }

- BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3
- 수신 감도: -100 dBm BLE 1 Mbps, -96.3 dBm BR, -95.5 dBm EDR2, -88.5 dBm EDR3
- 최대 송신 전력: BR/BLE 19 dBm, EDR2/EDR3 13 dBm
- BR 피크 수신 전류: 3.3 V에서 2.2 mA

### 그래픽 및 디스플레이 { #graphics-and-display }

- ePicasso 2.0 2D/2.5D 그래픽 엔진
- 하드웨어 회전, 스케일링, 미러링, 알파 블렌딩
- 최대 1024 × 1024의 그래픽 워크로드
- eZip 2.0 무손실 그래픽 압축 해제 및 eZip-A 애니메이션 지원
- 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, JDI를 지원하는 LCD
- TurboPixel: extDMA가 고정 비율 손실 압축으로 최종 프레임버퍼를 압축하고, 디스플레이 컨트롤러가 이를 압축 해제합니다. 이를 통해 주어진 워크로드에 필요한 PSRAM 대역폭과 프레임버퍼 용량이 줄어듭니다.

### 오디오 { #audio }

- 24비트 오디오 DAC 1개
- 24비트 Sigma-Delta 오디오 ADC 1개
- PDM 인터페이스 2개(PDM1/PDM2), 각각 좌/우 마이크 채널 지원
- I2S 인터페이스 1개
- 오디오 샘플 레이트 변환 및 EQ 가속

각 PDM 인터페이스에는 디지털 마이크를 최대 2개까지 연결할 수 있으므로, 두 인터페이스로 총 최대 4개의 마이크를 지원할 수 있습니다. PDM 인터페이스의 개수가 마이크의 개수는 아닙니다. 실제 연결 가능 여부는 핀 멀티플렉싱과 보드 라우팅에 따라 달라집니다.

### 메모리 및 모듈 변형 { #memory-and-module-variants }

<div align="center"><em>SF32LB56-MOD 메모리 구성</em></div>

<div align="center" markdown>

| 모듈 코드 | SKU별 플래시 | PSRAM | 표준 플래시 | 온도 | 크기 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18.0 × 32.9 × 3.1 mm |

</div>

[SiFli 모듈 모델 가이드](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)는 이 세 가지 구성을 나열하며 그 밖의 구성은 맞춤 제작할 수 있다고 명시합니다. 현재 SKU 공급 가능 여부와 메모리 구성은 SiFli에 확인하십시오.

SiFli는 4 MB + 8 MB OPI-PSRAM과 1 MB QSPI-NOR을 갖춘 SF32LB566VCB36을 표준 구성으로 제시하며, 이는 N16R12N1 메모리 구성과 일치합니다. 모델 가이드는 A128R12N1과 D128R12N1에 대해 칩 파트 넘버를 개별적으로 지정하지 않으므로, 두 SKU의 정확한 칩 파트 넘버는 SiFli에 확인하십시오.

### 전원 및 I/O { #power-and-io }

- VDD_3V3 권장 동작 범위: 2.97~3.6 V
- VDD_1V8 권장 동작 범위: 1.7~1.95 V
- VDDIO 권장 동작 범위: 1.7~3.6 V
- VDD_3V3, VDD_1V8, VDDIO는 함께 전원이 인가되어야 합니다.
- PA00~PA11 인터페이스 레벨은 3.3 V로 고정되며 VDDIO를 따르지 않습니다.
- 89핀 모듈 인터페이스
- 동작 온도: -40~85 °C

## 관련 제품 { #related-products }

### 칩 { #chip }

[SF32LB56x](../chips/SF32LB56x.md), 구체적으로는 SF32LB56xV 플랫폼 제품군을 기반으로 합니다. 모듈의 배경이 되는 더 넓은 범위의 아키텍처, 디스플레이, 오디오, 패키지 정보는 칩 페이지를 참고하십시오.

### 개발 키트 { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md)는 디스플레이, 오디오, 스토리지, 주변 장치 드라이버를 검증하기에 실용적인 플랫폼입니다. 해당 문서에는 N16R12N1과 A128R12N1 구성이 나열되어 있습니다. 이 보드의 메모리 설정을 설계 기준 구성으로 사용하기 전에 모듈 마킹과 보드 리비전을 확인하십시오.

### 레퍼런스 제품 { #reference-products }

SiFli가 문서화한 애플리케이션 분야에는 웨어러블, 산업용 디스플레이 및 HMI 장비, 차량 제어 제품, 스마트 홈 가전, 저전력 센서 허브, Bluetooth Mesh 제품이 포함됩니다.
