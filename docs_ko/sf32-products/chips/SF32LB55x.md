---
icon: lucide/microchip
description: "SF32LB55x: 보급형 Bluetooth MCU보다 풍부한 그래픽, 더 큰 SRAM, 더 다양한 패키지가 필요한 웨어러블 및 HMI 제품을 위한 메인스트림 초저전력 MCU 제품군."
tags:
    - 하드웨어
    - 칩
---

# SF32LB55x

## 개요

SF32LB55x 시리즈는 BLE 연결 제품을 위한 메인스트림 초저전력 AIoT 마이크로컨트롤러 제품군으로, 보급형 Bluetooth MCU보다 강력한 디스플레이 기능, 더 큰 메모리 여유, 더 다양한 패키지가 필요한 제품을 대상으로 합니다.

big.LITTLE 듀얼 코어 아키텍처에서 두 개의 Arm Cortex-M33 STAR-MC1[^1] 프로세서를 조합합니다. 하나는 최대 240 MHz로 동작하는 고성능 애플리케이션 코어이고, 다른 하나는 최대 48 MHz로 동작하는 초저전력 코어입니다. 이를 통해 부하가 큰 UI 작업은 애플리케이션 코어에 맡기고, 센서 처리, Standby 제어, 계속 동작해야 하는 BLE 작업은 저전력 코어에 배정할 수 있습니다.

SiFli의 공식 제품 브리프와 데이터시트에는 BLE 5.2, ePicasso 2.5D 그래픽 엔진, 듀얼 LCD 컨트롤러, TinyML 지향 신경망 행렬 가속기, 1,312 KB의 온칩 SRAM(HCPU 1,088 KB + LCPU 224 KB)이 나열되어 있으며, 외부 NOR, NAND, eMMC, PSRAM도 지원합니다. 따라서 SF32LB55x는 SF32LB52x보다 많은 리소스가 필요하지만 상위 56/58 제품군 디바이스까지는 필요하지 않은 웨어러블, 센서 중심 제품, 소형 HMI 설계에 실용적인 선택입니다.

SiFli의 칩 모델 가이드에 따르면 SF32LB55x는 이후의 52/56/58 제품군보다 먼저 정의되었기 때문에, 접미사가 새로운 번호 체계를 완전히 따르지 않습니다. 디바이스를 선택할 때는 전체 주문 부품 번호와 패키지별 기능 표를 사용하고, 접미사만으로 모든 기능을 추정하지 마십시오.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델은 기존 Cortex-M33용 펌웨어, 미들웨어, RTOS 포트, 개발 도구를 활용하는 데 도움이 됩니다. 다만 실제 디바이스에 맞춘 통합 작업은 여전히 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

## 애플리케이션

**SF32LB55x는** 보급형 웨어러블 MCU보다 강력한 UI, 더 큰 작업 메모리, 더 유연한 패키지가 필요한 BLE 중심 제품에 **권장되며**, 대표적인 예는 다음과 같습니다.

- 스마트워치 및 피트니스 밴드
- 건강 모니터링 웨어러블
- 스마트 도어락 및 스마트 홈 컨트롤러
- 센서 중심의 연결형 액세서리
- 소형 그래픽 HMI 제품
- 스마트 스타일러스 및 펜 컴퓨팅 액세서리
- 휴대용 단말기 및 핸드헬드 컨트롤러

설계에 다음 기능 중 하나 이상이 필요하면 SF32LB55x를 선택하십시오.

- 수신 전류가 매우 낮은 BLE 5.2 연결
- MIPI DSI 커맨드 모드 디스플레이 지원
- LVGL, 그래픽 에셋, 센싱, TinyML 워크로드를 위한 더 큰 SRAM
- 사용자가 프로그래밍할 수 있는 저전력 프로세서
- SF32LB52x보다 많은 GPIO 또는 더 고밀도인 패키지 옵션
- 외부 NOR, NAND, eMMC, QSPI-PSRAM, OPI-PSRAM을 유연하게 선택

## 개발 리소스

[Product Brief]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SiFli Chip Model Guide]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[제품 개요서][Product Brief]__
- :fontawesome-solid-file-pdf: __[데이터시트][Datasheet]__
- :fontawesome-solid-file-pdf: __[사용자 설명서][User Manual]__
- :fontawesome-solid-file-lines: __[원본 설계 가이드(wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[하드웨어 애플리케이션 노트(GitHub 소스)][Hardware Application Note (GitHub source)]__
- :fontawesome-solid-list: __[SiFli 칩 모델 가이드][SiFli Chip Model Guide]__
- :fontawesome-solid-file-lines: __[하드웨어 설계 가이드(μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[SDK 문서][SDK Documentation]__
- :fontawesome-solid-book-open: __[API 레퍼런스][API Reference]__
- :fontawesome-solid-list-check: __[하드웨어 설계 체크리스트 원본][Hardware Design Checklist Source]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

---

## 기능 및 사양

### 연산 및 메모리

- 최대 240 MHz의 고성능 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서
- 최대 48 MHz의 초저전력 Arm Cortex-M33 STAR-MC1 프로세서
- 애플리케이션 프로세서에서 최대 360 DMIPS / 965 EEMBC CoreMark
- 저전력 프로세서에서 최대 72 DMIPS / 193 EEMBC CoreMark
- 64 KB 리텐션 SRAM을 포함한 1,088 KB 애플리케이션 SRAM
- 전부 리텐션 SRAM인 224 KB 저전력 SRAM
- NOR, NAND, eMMC, QSPI-PSRAM, OPI-PSRAM용 외부 메모리 인터페이스

### 그래픽, 디스플레이, AI

- 하드웨어 회전, 스케일링, 미러링, 알파 블렌딩을 지원하는 ePicasso 2.5D 그래픽 엔진
- eZip은 그래픽을 무손실로 압축 해제하며 ePicasso와 연결하여 사용할 수 있습니다.
- ePicasso 변환 레이어는 최대 640 × 640 해상도를 지원하며, 일반 레이어와 디스플레이 출력은 최대 1024 × 1024를 지원하고, 디스플레이 출력은 최대 60 fps에 도달합니다.
- LCD 컨트롤러는 지원되는 변형에서 8080, SPI, Dual-SPI, Quad-SPI, DPI, MIPI DSI, JDI 반사형 디스플레이 인터페이스를 지원하며, 선택한 모델에서 사용 가능한지 확인해야 합니다.
- TurboPixel 프레임버퍼 압축으로 LCD 컨트롤러가 압축된 프레임 데이터를 읽고 표시용으로 압축 해제하므로, 프레임버퍼 저장 공간과 읽기 대역폭 요구량이 줄어듭니다.
- 듀얼 LCD 컨트롤러. 상시 표시(always-on display) 인터페이스와 듀얼 디스플레이 기능은 선택한 모델과 패키지에 따라 달라집니다.
- TinyML 워크로드용 신경망 행렬 가속기, 최대 1.92 GOPS 및 5.73 TOPS/W

### 무선 연결

- Bluetooth Low Energy 5.2
- BLE 125 kbps, 500 kbps, 1 Mbps, 2 Mbps 모드
- 1 Mbps 모드에서 -100 dBm 수준의 감도
- 최대 송신 전력: 10 dBm
- 수신 피크 전류: 3.3 V에서 2.0 mA

### 보안

- AES 및 CRC 하드웨어 가속기
- 진성 난수 생성기(TRNG)
- PSA Certified Level 1

### 주변 장치 및 I/O

- 제품군 전체에서 최대 UART 5개, I2C 6개, SPI 4개 인터페이스. 개수는 아래 표와 같이 모델에 따라 다릅니다.
- I2S 및 PDM 인터페이스 개수는 모델에 따라 다름(표 참조). PDM 인터페이스 하나에 디지털 마이크를 최대 2개 연결할 수 있으므로 인터페이스 개수와 마이크 개수는 같지 않으며, 선택한 모델의 핀 사용 가능 여부도 확인하십시오.

<div align="center"><em>모델별로 공개된 주변 장치 및 ADC 개수(SS6600A8은 지정되지 않음)</em></div>

<div align="center" markdown>

| 모델 | UART | I2C | SPI | I2S | PDM | 16비트 Sigma-Delta ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | 지정되지 않음 | 지정되지 않음 | 지정되지 않음 | 지정되지 않음 | 지정되지 않음 | 지정되지 않음 |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | 없음 |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5채널 |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5채널 |

</div>

**SS6600A8 출처 참고:** 현재 [SiFli 칩 모델 가이드][SiFli Chip Model Guide]에는 이 부품의 패키지, 코패키지 메모리, GPIO, 디스플레이 인터페이스가 나열되어 있지만, 모델별 UART, I2C, SPI, I2S, PDM, Sigma-Delta ADC 개수는 지정되어 있지 않습니다. [DS5501 V1.7.2 데이터시트][Datasheet]의 Table 0-1에도 SS6600A8의 별도 행이 없습니다. 따라서 이 부품의 개수는 "지정되지 않음"으로 표시했으며, 둘 다 QFN68L을 사용한다는 이유만으로 SF32LB551U4O5의 값을 적용해서는 안 됩니다. 핀을 할당하기 전에 SiFli에 구성을 확인하십시오.

- USB 2.0 FS 호스트/디바이스 인터페이스 1개
- 10비트 GPADC(SAR ADC) 1개: 데이터시트에는 싱글 엔디드 입력 최대 8개 또는 차동 쌍 4개, 싱글 엔디드 입력 범위 0~1.1 V로 명시되어 있습니다.
- **ADC 출처 불일치:** [DS5501 V1.7.2 데이터시트][Datasheet]에는 싱글 엔디드 입력 최대 8개 또는 차동 쌍 4개와 싱글 엔디드 범위 0~1.1 V가 명시되어 있습니다. [SF32LB55x 하드웨어 애플리케이션 노트][Hardware Application Note (GitHub source)]에는 5채널과 0~0.9 V 입력 범위로 기재되어 있습니다. 아날로그 프런트엔드를 설계하기 전에 해당 부품과 SDK 리비전의 채널 매핑 및 한계를 확인하십시오.
- 위 표의 BGA145 및 BGA169 모델에는 5채널 16비트 Sigma-Delta ADC가 있으며, QFN68L 모델에는 없습니다.
- 온도 센서
- 저전력 전압 비교기 2개
- Peripheral Task Controller(PTC)
- GPIO 개수는 패키지에 따라 다르므로, 아래의 패키지 표와 출처 불일치 참고 사항을 참조하십시오.

### 전원 공급 및 패키지

- 전원 공급 범위는 변형별로 다릅니다. SS6600A8은 2.97~3.63 V, 551U4O5와 선택된 BGA 변형은 1.71~3.63 V입니다.
- 동작 온도는 변형별로 다릅니다. 문서화된 QFN 변형은 -20~+70 °C, 선택된 BGA 변형은 -40~+85 °C입니다.
- 고효율 buck 레귤레이터 2개와 저전력 LDO를 갖춘 통합 전원 관리
- RTC 웨이크업 시 슬립 전류: 600 nA
- 핀 웨이크업 시 슬립 전류: 280 nA
- 패키지 옵션: QFN68L, BGA145, BGA169

## 제품군 변형

SF32LB55x 디바이스는 QFN 및 BGA 패키지로 제공됩니다. GPIO 개수, 내장 메모리, 디스플레이 인터페이스 선택, PCB 공정이 모두 패키지에 따라 크게 달라지므로 패키지를 일찍 선택하십시오.

여기서 패키지 선택은 단순한 레이아웃 문제가 아닙니다. SiFli의 [칩 모델 가이드][SiFli Chip Model Guide]에는 55x 제품군이 패키지에 따라 디스플레이 인터페이스 집합 전체 또는 일부만 지원한다고 명시되어 있으므로, 디스플레이, 메모리, 핀 예산 계획을 확정하기 전에 패키지 선택을 먼저 확정하는 것이 좋습니다. 같은 패키지의 부품은 핀 호환이 되지만, 호환되는 대체품을 선택하기 전에 정확한 메모리 구성과 디스플레이 요구 사항을 확인하십시오.

<div align="center"><em>SF32LB55x 패키지별 I/O 옵션</em></div>

<div align="center" markdown>

| 패키지 | HCPU / LCPU GPIO | 전체 GPIO | 적합한 설계 유형 |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | PCB 공정 비용이 낮은 소형 웨어러블 또는 BLE 센서 제품 |
| BGA145 | 55 / 40 | 95 | 라우팅 여유가 더 큰 디스플레이, 메모리, 센서 중심 설계 |
| BGA169 | 71 / 42 | 113 | 내장 메모리와 디스플레이 옵션이 가장 다양한, I/O가 가장 많은 SF32LB55x 설계 |

</div>

SiFli 칩 모델 가이드에 나열된 다음의 현재 모델은 패키지와 메모리 간의 트레이드오프를 분명하게 보여 줍니다. 이 구형 제품군의 부품 번호 접미사는 SiFli의 새로운 명명 규칙을 일관되게 따르지 않으므로, 접미사를 규칙으로 해석하지 말고 전체 주문 부품 번호를 사용하십시오.

<div align="center"><em>대표적인 SF32LB55x 변형</em></div>

<div align="center" markdown>

| 부품 번호 | 패키지 | 내장 메모리 | 모델 가이드에 나열된 디스플레이 인터페이스 | 선택 참고 사항 |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | 4 MB QSPI NOR 두 개를 8 MB OSPI NOR 하나로 구성, 코패키지 PSRAM 없음 | QSPI, 8080 | GPIO 49개, 2.97~3.63 V, -20~+70 °C, 코패키지 PSRAM이 없는 소형 옵션 |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI NOR 부트 플래시 + 4 MB OPI-PSRAM | QSPI, 8080 | GPIO 49개, 1.71~3.63 V, -20~+70 °C, PSRAM이 내장된 소형 옵션 |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI NOR 부트 플래시 + 4 MB OPI-PSRAM | MIPI DSI 커맨드 모드, QSPI, 8080 | GPIO 95개, -40~+85 °C, 4 MB PSRAM이 필요한 디스플레이 제품에 적합한 균형 잡힌 BGA145 선택 |
| SF32LB555V436 | BGA145 | 4 MB QSPI NOR 부트 플래시 + 8 MB OPI-PSRAM | MIPI DSI 커맨드 모드, QSPI, 8080 | GPIO 95개, -40~+85 °C, SF32LB555V4O6의 두 배인 내장 PSRAM이 필요할 때의 BGA145 옵션 |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI NOR 부트 플래시 + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSI 커맨드 모드, QSPI, 8080, JDI/Sharp MIP | GPIO 113개, -40~+85 °C, MIPI DSI와 SPI/DSPI 듀얼 디스플레이에서 서로 독립된 콘텐츠를 지원 |

</div>

SF32LB557VD3A6에 대해 현재 SiFli 칩 모델 가이드와 DS5501 V1.7.2 데이터시트의 Table 0-1에는 HCPU 71개 + LCPU 42개 = GPIO 113개로 나열되어 있습니다. 반면 데이터시트의 기능 및 패키지 요약과 PB0001 V1.3 제품 브리프에는 BGA169의 GPIO가 119개(HCPU 71개 + LCPU 48개)로 기재되어 있습니다. 따라서 공식 자료끼리, 심지어 데이터시트 안에서도 값이 상충합니다. 이 페이지는 모델별 행과 현재 모델 가이드의 값(113)을 따릅니다. 핀을 할당하거나 설계를 확정하기 전에 선택한 패키지의 볼 맵에서 GPIO 사용 가능 여부를 확인하고, SiFli에 주문 가능한 부품을 확인하십시오. 또한 해당 변형의 공급 전압 및 온도 등급, 전체 부품 번호, 내장 메모리 구성을 [DS5501 V1.7.2 데이터시트][Datasheet], [PB0001 V1.3 제품 브리프][Product Brief], [SiFli 칩 모델 가이드][SiFli Chip Model Guide]와 대조하여 확인하십시오. BGA145와 BGA169 패키지의 크기는 7 × 7 × 0.94 mm이며 피치는 0.5 mm입니다.

## 통합 경로

SF32LB55x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 필요한 디스플레이, Bluetooth, 저전력 동작을 검증하십시오.
2. **평가 하드웨어 계획.** μForge는 현재 SF32LB55 전용 모듈이나 개발 보드를 카탈로그에 올려 두지 않았습니다. [SF32 제품 선택기](../product-selector.md)로 가장 가까운 평가 플랫폼을 선택한 다음, 그 결과를 55x 설계에 적용하기 전에 패키지와 인터페이스 커버리지를 확인하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 μForge [SF32LB55x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md)와 그 [회로도](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) 및 PCB 레이아웃 체크리스트를 사용하십시오.
4. **주요 정보 출처 확인.** 실제 주문할 부품과 패키지를 SiFli [데이터시트][Datasheet], [사용자 매뉴얼][User Manual], [원본 설계 가이드][Original Design Guide (wiki.sifli.com)], [하드웨어 애플리케이션 노트 소스][Hardware Application Note (GitHub source)]와 대조하여 확인하십시오.

<!-- uf-faq:start -->
## 자주 묻는 질문 { #frequently-asked-questions }

**SF32LB55x의 주요 사양은 무엇인가요?**
SF32LB55x는 애플리케이션 CPU(Cortex-M33 @240 MHz)와 저전력 코어(Cortex-M33 @48 MHz, 사용자 프로그래밍 가능 코어), 내장 SRAM 1,312 KB, Bluetooth Low Energy(BLE) 전용를 갖췄습니다. 그래픽: ePicasso 1.0. 패키지: QFN68 / BGA145 / BGA169(7 × 7 mm (QFN68)). USB 2.0 FS. 제품군 수준의 값이므로 정확한 부품 번호의 데이터시트를 확인하세요.

**SF32LB55x는 어떤 디스플레이 인터페이스를 지원하나요?**
SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI. 지원 여부는 부품 번호와 패키지에 따라 다릅니다.

**SF32LB55x는 패키지 내 메모리를 얼마나 제공하나요?**
부품 번호에 따라 패키지 내 PSRAM 최대 16 MB + 2 MB, 패키지 내 NOR Flash 최대 8 MB를 제공합니다.

**SF32LB55x에는 어떤 공급 전압이 필요한가요?**
변형에 따라 1.71–3.63 V. 정확한 범위는 데이터시트에서 확인하세요.

**SF32LB55x로 하드웨어 설계를 시작하려면 어떻게 하나요?**
먼저 [SF32LB55x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md)에서 회로도, 전원, 클럭/RF, PCB 레이아웃 지침을 확인하고, 보드 릴리스 전에 회로도와 레이아웃 체크리스트를 사용하세요.
<!-- uf-faq:end -->

## 관련 제품

### 개발 키트

패키지 선택, 전원 트리 정의, 디스플레이 인터페이스 선택, 메모리 계획, RF 레이아웃, 양산 테스트 계획의 출발점으로 공식 하드웨어 애플리케이션 노트, 레퍼런스 회로도, 체크리스트를 사용하십시오.

### 레퍼런스 제품

일반적인 SF32LB55x 최종 제품으로는 스마트워치, 피트니스 밴드, 건강 모니터링 웨어러블, 스마트 도어락, 연결형 액세서리, 스마트 홈 컨트롤러, 소형 그래픽 HMI가 있습니다.
