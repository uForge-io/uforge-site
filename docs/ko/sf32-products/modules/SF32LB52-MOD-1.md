---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: SF32LB52x 기반 저전력 Bluetooth 5.3 MCU 모듈 제품군으로, RF 회로, 48 MHz 크리스털, SKU에 따라 달라지는 안테나 옵션을 통합했습니다."
tags:
  - 하드웨어
  - 모듈
---

# SF32LB52-MOD-1

## 개요 { #overview }

SF32LB52-MOD-1은 SF32LB52x 플랫폼을 기반으로 하는 저전력 Bluetooth MCU 모듈 제품군입니다. 표준 N16R8 SKU는 SF32LB525UC6을 사용합니다. 27.9 × 18.0 × 3.1 mm 크기의 이 모듈은 듀얼 코어 Arm Cortex-M33 STAR-MC1 플랫폼, RF 회로, 48 MHz 크리스털, 안테나 연결부를 하나로 결합합니다. 부품 번호에 따라 온보드 PCB 안테나 또는 외부 안테나용 IPEX 커넥터를 사용합니다.

DS5203 V0.3에는 모듈 탑재 PCB 안테나가 기재되어 있고, IPEX로 연결하는 외부 안테나는 다른 모델에서 사용할 수 있다고 설명되어 있습니다. 다만 안테나 옵션을 공개된 메모리 SKU 목록과 대응시키지는 않습니다. 캐리어 보드 레이아웃을 확정하기 전에 정확한 안테나 구성을 SiFli에 확인하십시오. 완제품에는 RF 검증과 해당하는 제품 단위 인증도 필요합니다. 모듈 인터페이스를 통해 소형 커넥티드 제품에 필요한 Bluetooth, 그래픽, 오디오 기능을 사용할 수 있습니다.

선택한 SKU에 따라 칩 패키지에 OPI-PSRAM이 포함될 수 있습니다. 모듈 인터페이스는 GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS, 아날로그 오디오를 포함하여 기반 칩 제품군의 주요 기능을 노출합니다.

!!! info
    기반 칩 제품군의 아키텍처와 주변 장치 구성은 [SF32LB52x](../chips/SF32LB52x.md)를 참고하십시오. 이 페이지에서는 모듈 통합, 전원, 패키지, 모듈 변형 선택을 다룹니다.

## 애플리케이션 { #applications }

**SF32LB52-MOD-1은 RF 및 레이아웃 위험을 줄이면서 Bluetooth, 그래픽, 오디오 기능을 구현해야 하는 다음 제품에 권장됩니다.**

- 스마트워치, 피트니스 밴드, 웨어러블 의료 제품
- Bluetooth 센서 허브와 연결형 액세서리
- 스마트 도어록, 스마트 홈 디바이스, 소형 가전
- 소형 그래픽 HMI 제품
- 차량 키 및 웨어러블 리모컨 제품
- 비용에 민감한 연결형 디스플레이 디바이스

제품에 다음 기능 중 하나 이상이 필요하면 SF32LB52-MOD-1을 검토하십시오.

- PCB 안테나와 외부 안테나 옵션을 갖춘 모듈 수준의 RF 통합
- 칩 플랫폼의 Bluetooth, 그래픽, 오디오 기능을 위한 노출된 인터페이스
- SF32LB52x 소프트웨어와 주변 장치 기능의 재사용
- 공간 제약이 있는 웨어러블 또는 HMI 제품을 위한 소형 모듈 통합

## 개발 리소스 { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB52x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Original Design Guide (wiki.sifli.com, EPD variant)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[모듈 데이터시트][Module Datasheet]__
- :fontawesome-solid-microchip: __[칩 소개][Chip Introduction]__
- :fontawesome-solid-file-lines: __[하드웨어 설계 가이드][Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[원본 설계 가이드(wiki.sifli.com, EPD 변형)][Original Design Guide (wiki.sifli.com, EPD variant)]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

---

## 기능 및 사양 { #features-and-specifications }

### 연산 및 메모리 { #compute-and-memory }

- 최대 240 MHz, 최대 370 DMIPS / 984 EEMBC CoreMark의 Arm Cortex-M33 STAR-MC1 애플리케이션 코어(HCPU)
- 32 KB 명령어 캐시와 16 KB 데이터 캐시
- 512 KB 리텐션 SRAM
- 최대 24 MHz의 전용 초저전력 Arm Cortex-M33 STAR-MC1 코어(LCPU)와 64 KB 리텐션 SRAM
- 두 코어 모두 단정밀도 FPU 및 MPU 탑재
- 모듈 SKU에 따라 패키지 내장 OPI-PSRAM 선택 가능

### 무선 연결 { #wireless-connectivity }

- BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3
- 수신 감도: -100 dBm(BLE/1 Mbps), -96.3 dBm(BR), -95.5 dBm(EDR2)
- 최대 송신 전력: 19 dBm(BR/BLE), 13 dBm(EDR2/EDR3)
- BR 피크 수신 전류: 2.4 mA @ 3.8 V

### 그래픽 및 디스플레이 { #graphics-and-display }

- ePicasso 2.0 2D/2.5D 그래픽 엔진
- eZip 2.0 무손실 그래픽 압축 해제 가속기
- 8080, SPI, Dual-SPI, Quad-SPI 인터페이스를 지원하는 LCD 컨트롤러
- 소형 워치형 또는 소형 HMI 디스플레이 제품에 실용적으로 적합

### 오디오 { #audio }

- 24비트 오디오 DAC 1개
- 24비트 Sigma-Delta 오디오 ADC 1개
- I2S 인터페이스 1개
- PDM 인터페이스 1개
- 모듈 인터페이스로 노출되는 아날로그 오디오 입출력 지원

PDM 인터페이스 하나에는 디지털 마이크를 최대 2개까지 연결할 수 있습니다. PDM 인터페이스의 개수가 마이크의 개수는 아닙니다. 실제 연결 가능 여부는 핀 멀티플렉싱과 보드 라우팅에 따라 달라집니다. 이 모듈에서는 선택 사양인 32.768 kHz 크리스털을 실장하면 PA22/PA23을 외부에서 사용할 수 없으며, 하드웨어 가이드에 대체 PDM 핀 매핑이 문서화되어 있습니다.

### 스토리지 인터페이스 { #storage-interfaces }

- 모듈 SKU에 따라 선택 가능한 패키지 내장 OPI-PSRAM
- 외부 SPI NOR 또는 SPI NAND용 MPI(QSPI) 1개
- SD3.0, SDIO3.0, eMMC를 지원하는 SD/SDIO 1개

### 보안 { #security }

- AES, HASH, CRC 하드웨어 가속기
- 진성 난수 생성기(TRNG)
- PSA Certified Level 1

### 전원, 패키지 및 I/O { #power-package-and-io }

- 모듈 패키지: 27.9 × 18.0 × 3.1 mm
- 동작 온도: -40~85 °C
- VSYS: 리튬 이온 배터리 직접 입력 시 3.2~4.7 V, 레귤레이션된 전원 사용 시 3.7~4.7 V. 3.8 V를 권장합니다.
- IO 전압: 3.3 V
- VBATS: 0~4.7 V 배터리 센스 입력이며 ADC 측정에도 사용할 수 있습니다. 측정할 전압을 직접 연결하고, 외부 저항 분압기를 사용하지 마십시오.
- VDD33_VOUT2: 외부 주변 장치용 온모듈 3.3 V LDO 출력입니다. 기본값은 꺼짐이며 소프트웨어에서 활성화해야 합니다. 최대 출력 전류는 150 mA이고, 이 레일의 총 커패시턴스는 7.4 µF를 초과해서는 안 됩니다.
- 68핀 모듈 인터페이스. 신호 핀은 GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS, 디지털 및 아날로그 오디오를 포함한 멀티플렉싱된 기능을 노출합니다.

## 모듈 변형 { #module-variants }

<div align="center"><em>SF32LB52-MOD-1 모듈 변형</em></div>

<div align="center" markdown>

| 모듈 코드 | 칩 | 플래시 | PSRAM | 온도 | 크기 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40~85 °C | 27.9 × 18.0 × 3.1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | -40~85 °C | 27.9 × 18.0 × 3.1 mm |

</div>

[SiFli 모듈 모델 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)와 EPD 애플리케이션 가이드에도 A128R16이 나열되어 있지만, 링크된 DS5203 V0.3 데이터시트에는 N16R8만 나열되어 있습니다. A128R16을 선택하기 전에 현재 공급 가능 여부와 메모리 구성을 SiFli에 확인하십시오.

A128R16의 플래시 표기는 공식 출처마다 다릅니다. [OpenSiFli 모듈 모델 가이드](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)는 128 MB SPI-NAND로 명시하는 반면, SiFli의 [보드 모델 가이드](https://wiki.sifli.com/board/devkit_guide.html)는 해당 DevKit SKU를 128 MB QSPI-NAND로 나열합니다. 이 차이가 실제 실장된 부품을 반영하는지 인터페이스 표기상의 차이인지는 출처에 설명되어 있지 않습니다. 보드 구성을 모듈 기준 구성으로 사용하기 전에, 해당 보드 리비전의 회로도/BOM에서 플래시 부품과 버스 모드를 확인하십시오.

## 관련 제품 { #related-products }

### 칩 { #chip }

[SF32LB52x](../chips/SF32LB52x.md) 페이지는 제품군 수준의 아키텍처와 주변 장치를 다룹니다. 나열된 각 모듈 SKU의 칩과 메모리 대응 관계는 위의 변형 표를 참고하십시오.

### 개발 키트 { #development-kits }

[SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md), [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md)는 커스텀 모듈 캐리어 설계로 넘어가기 전에 펌웨어를 검증하기에 실용적인 출발점입니다.

### 레퍼런스 제품 { #reference-products }

대표적인 최종 제품으로는 보급형~중급 스마트워치, 피트니스 밴드, Bluetooth 센서 허브, 스마트 도어록, 소형 그래픽 HMI 디바이스가 있습니다.
