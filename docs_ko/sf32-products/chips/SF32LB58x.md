---
icon: lucide/microchip
description: "SF32LB58x: 고급 그래픽, 디스플레이, 메모리, 주변 장치가 필요한 연결형 제품을 위한 플래그십 AIoT MCU 제품군."
tags:
    - 하드웨어
    - 칩
---

# SF32LB58x

## 개요

SF32LB58x 시리즈는 SF32LB5x 제품군의 플래그십입니다. 더 큰 애플리케이션 프로세서급 플랫폼으로 전환하지 않고도 고급 그래픽, 대용량 메모리, 듀얼 모드 Bluetooth, 풍부한 오디오·디스플레이 I/O, 높은 GPIO 밀도가 필요한 배터리 구동 AIoT 제품을 대상으로 합니다.

SF32LB58x는 이기종 3코어 Arm Cortex-M33 STAR-MC1[^1] 아키텍처를 사용합니다. HCPU와 ACPU는 최대 240 MHz로 동작하는 고성능 코어이고, LCPU는 최대 96 MHz로 동작하며 전력에 민감한 작업을 담당합니다. HCPU는 시스템 제어, 사용자 인터페이스, 일반 애플리케이션 처리를 맡고, ACPU는 오디오 DSP 워크로드를 처리할 수 있으며, LCPU는 Bluetooth LE, 센서 데이터 수집 및 기타 저전력 작업에 적합합니다. 이러한 분할을 통해 펌웨어는 적절한 워크로드에서 HCPU의 전원을 끌 수 있지만, 실제 절감 효과는 애플리케이션과 펌웨어에 따라 달라집니다.

SiFli는 3,744 KB의 온칩 SRAM과 SKU별 코패키지 NOR 플래시 및 OPI-/HPI-PSRAM 조합을 문서화하고 있습니다. 이 제품군은 MIPI DSI를 포함한 디스플레이 인터페이스, 벡터 그래픽 가속, USB 2.0 High-Speed, GPIO 수가 많은 BGA 패키지도 제공합니다. 고해상도 UI, 많은 그래픽 에셋, SDIO를 통한 외부 Wi-Fi가 필요하거나 엣지 AI 및 센서 퓨전 작업에 필요한 연산·메모리 리소스를 확보해야 하는 설계라면 SF32LB58x를 검토하십시오.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델은 기존 Cortex-M33용 펌웨어, 미들웨어, RTOS 포트, 개발 도구를 활용하는 데 도움이 됩니다. 다만 실제 디바이스에 맞춘 통합 작업은 여전히 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

## 애플리케이션

**SF32LB58x는** 더 큰 프레임버퍼, 더 풍부한 디스플레이, 더 많은 메모리, 더 고밀도의 고속 I/O가 필요한 프리미엄 연결형 제품에 **권장되며**, 대표적인 예는 다음과 같습니다.

- 프리미엄 스마트워치 및 스포츠 워치
- 고해상도 웨어러블 HMI
- 사이클링 컴퓨터 및 스마트 대시보드
- 휴대용 의료 및 산업용 단말기
- Bluetooth + 외부 Wi-Fi 액세서리
- 엣지 AI 및 센서 퓨전 시스템
- 디스플레이 중심의 연결형 컨트롤러

설계에 다음 기능 중 하나 이상이 필요하면 SF32LB58x를 선택하십시오.

- 1024 × 600 이상의 디스플레이 해상도
- MIPI DSI 커맨드 모드 또는 비디오 모드 디스플레이 지원
- 벡터 그래픽, 더 풍부한 애니메이션 또는 더 큰 UI 에셋
- SDIO를 통한 외부 Wi-Fi
- 대용량 프레임버퍼, 오디오, 그래픽 또는 AI 모델 메모리
- 많은 GPIO 수 또는 여러 개의 고속 외부 인터페이스

## 개발 리소스

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[제품 개요서][Product Brief]__
- :fontawesome-solid-file-pdf: __[데이터시트][Datasheet]__
- :fontawesome-solid-file-pdf: __[사용자 설명서][User Manual]__
- :fontawesome-solid-file-lines: __[원본 설계 가이드(wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[하드웨어 애플리케이션 노트(GitHub 소스)][Hardware Application Note (GitHub source)]__
- :fontawesome-solid-file-lines: __[하드웨어 설계 가이드(μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

---

## 기능 및 사양

### 연산 및 메모리

- Arm Cortex-M33 STAR-MC1 코어 3개: HCPU와 ACPU는 최대 240 MHz, LCPU는 최대 96 MHz
- 3,744 KB 온칩 SRAM
- SKU에 따라 패키지 전체 합계 1 MB~8 MB의 코패키지 NOR 플래시 옵션
- 코패키지 OPI-PSRAM 및 HPI-PSRAM 옵션. HPI-PSRAM은 SKU에 따라 최대 2 × 32 MB까지 사용 가능
- MPI3/MPI4를 통한 외부 NOR 또는 SPI NAND 플래시, SDIO를 통한 SD NAND, eMMC, SD 카드 또는 외부 Wi-Fi. 사용 가능한 조합은 인터페이스 선택과 핀 할당에 따라 달라짐

### 그래픽, 디스플레이, AI

- ePicasso 2.0 2D/2.5D 그래픽 가속기
- Vivante GCNanoUltraV 벡터 그래픽 엔진
- eZip 2.0 무손실 그래픽 압축 해제 가속기
- 이미지 자르기와 스케일링을 지원하는 하드웨어 JPEG/MJPEG 인코딩 및 디코딩
- TinyML 워크로드용 신경망 행렬 가속기
- 최대 1280 × 800의 디스플레이 해상도
- MIPI DSI 커맨드 모드 및 비디오 모드 디스플레이 지원
- SPI, DSPI, QSPI(SPI e-paper 포함), MCU8080, JDI, RGB/DPI(RGB888 또는 RGB565), MIPI DSI 디스플레이 인터페이스
- MIPI DSI와 SPI, DSPI 또는 QSPI를 함께 사용하여 서로 다른 콘텐츠를 표시하는 디스플레이 2개 지원
- 로컬 엣지 AI, 머신러닝, 센서 퓨전 워크로드에 적합

### 오디오 및 무선 연결

- 듀얼 모드 Bluetooth 5.3
- Bluetooth Classic 및 Bluetooth LE 지원
- SDIO를 통한 외부 Wi-Fi 연결
- 통합 오디오 ADC 2개
- 통합 오디오 DAC 2개
- PDM 인터페이스 2개. 각 인터페이스는 디지털 마이크를 최대 2개까지 연결할 수 있으며, 인터페이스 개수와 마이크 개수는 같지 않고 실제로 사용 가능한 연결은 핀 멀티플렉싱과 보드 라우팅에도 달려 있음
- I2S 인터페이스 3개: I2S1은 입력 전용이고, I2S2와 I2S3은 입력과 출력을 지원함. 모두 마스터 모드로 동작함
- 호스트 및 디바이스 모드의 USB 2.0 High-Speed

### 시스템 통합 { #system-integration }

- BUCK 출력 2개와 LDO 출력 3개를 갖춘 통합 PMU
- 웨어러블 전원 트리 설계를 위한 선택적 SF30147C PMIC 지원
- BGA256은 디스플레이, 스토리지, 오디오, 연결 기능을 결합하는 고밀도 MCU 설계에 적합
- 온칩 SRAM, 패키지 내장 PSRAM 옵션, 디스플레이 인터페이스가 그래픽 및 메모리 집약적 설계를 지원

### 주변 장치 및 I/O { #peripherals-and-ios }

**GPIO 개수 참고:** 현재 [SiFli 칩 모델 가이드](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)에는 표시된 SF32LB58x 변형(variant)에 대해 HCPU GPIO 94개와 LCPU GPIO 66개(총 160개)가 나열되어 있습니다. 이전 SiFli 데이터시트에서는 이를 HPSYS GPIO 94개와 LPSYS GPIO 60개, AON GPO 6개(GPIO 154개 + AON GPO 6개)로 구분합니다. 두 자료는 이 여섯 개의 상시 동작 출력을 서로 다르게 분류하므로, 범주별 합계만으로는 패키지 핀 개수가 다르다고 단정할 수 없고 160개 핀 전부가 자유롭게 할당할 수 있는 GPIO라는 뜻도 아닙니다. [SiFli 제품 인덱스](https://wiki.sifli.com/silicon/index.html)는 현재 V1.8.6 데이터시트로 연결됩니다. PCB 레이아웃 전에 해당 데이터시트에서 실제 주문할 부품의 GPIO 개수와 핀 기능 표를 확인하십시오. SiFli의 [GPIO FAQ](https://wiki.sifli.com/en/faq/mcu/gpio.html)는 PBR을 별도의 저전력 I/O 뱅크로 취급하므로, 출처에 명시적으로 포함되어 있지 않으면 HCPU/LCPU 개수에 더하지 마십시오.

- GPIO 160개(현재 칩 모델 가이드 기준 HCPU 94개 + LCPU 66개)
- CAN 인터페이스 2개
- SDIO 인터페이스 2개
- SWD 디버그 인터페이스
- 디버그 출력용으로 선택할 수 있는 UART 인터페이스 6개
- RTC, 워치독, GPIO 웨이크업, PBR 웨이크업, PWM, I2C, SPI, 범용 아날로그 인터페이스
- 고밀도 설계를 위한 BGA256 패키지

### 전원 공급 및 패키지

- 전원 공급 범위: 1.71 V~3.63 V
- BGA256 패키지, 6.5 × 8.5 × 0.94 mm, 피치 0.4 mm
- HDI PCB 필수. 양산 설계에는 6HDI-2 스택업을 권장

## 제품군 변형

현재 SiFli 칩 모델 가이드에는 SF32LB58x 주문 코드 6개가 나열되어 있으며, 모두 BGA256이고 코패키지 메모리 구성은 아래와 같습니다. 구성과 공급 가능 여부는 바뀔 수 있으므로 정확한 주문 코드를 현재 데이터시트 및 승인 업체 목록(AVL)과 대조하여 확인하십시오.

<div align="center"><em>SF32LB58x 주문 코드와 코패키지 메모리</em></div>

<div align="center" markdown>

| 부품 번호 | 패키지 | 코패키지 메모리 |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 MB 부트 NOR 플래시, MPI1 또는 MPI2에는 코패키지 메모리 없음 |
| SF32LB581VCN36 | BGA256 | 1 MB 부트 NOR 플래시 + MPI1의 8 MB OPI-PSRAM |
| SF32LB583VCC36 | BGA256 | 1 MB 부트 NOR 플래시 + MPI1과 MPI2의 2 × 8 MB OPI-PSRAM |
| SF32LB585V5E56 | BGA256 | 4 MB 부트 NOR 플래시 + MPI1의 4 MB NOR 플래시 + MPI2의 32 MB HPI-PSRAM |
| SF32LB586VDD36 | BGA256 | 1 MB 부트 NOR 플래시 + MPI1과 MPI2의 2 × 16 MB HPI-PSRAM |
| SF32LB587VEE56 | BGA256 | 4 MB 부트 NOR 플래시 + MPI1과 MPI2의 2 × 32 MB HPI-PSRAM |

</div>

변형을 선택할 때는 먼저 다음 항목을 확인하십시오.

- 필요한 프레임버퍼, 에셋, 오디오, 모델 메모리 크기
- 디스플레이 인터페이스와 목표 해상도
- 외부 스토리지 및 Wi-Fi 인터페이스 요구 사항
- BGA256, 피치 0.4 mm HDI 레이아웃에 대한 PCB 제조 역량

## 통합 경로

SF32LB58x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 디스플레이, 그래픽, 오디오, 스토리지, Bluetooth 구성을 검증하십시오.
2. **통합 수단 선택.** RF, BGA, 메모리 레이아웃의 위험을 줄이는 것이 중요하면 [SF32LB58-MOD](../modules/SF32LB58-MOD.md)를 평가하고, 초기 보드 수준 검증에는 [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md)를 사용하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 로컬 [하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md)와 그 [회로도](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) 및 [PCB 레이아웃](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md) 체크리스트를 사용하십시오. BGA256 HDI와 메모리 라우팅 가정은 초기에 검증하십시오.
4. **주요 정보 출처 확인.** 실제 주문할 부품과 패키지를 SiFli [데이터시트][Datasheet], [사용자 매뉴얼][User Manual], [원본 설계 가이드][Original Design Guide (wiki.sifli.com)], [하드웨어 애플리케이션 노트][Hardware Application Note (GitHub source)]와 대조하여 확인하십시오.

## 관련 제품

### 모듈

[SF32LB58-MOD](../modules/SF32LB58-MOD.md)는 SF32LB586VDD36 칩, RF 매칭 회로, 패키지 내장 HPI-PSRAM 및 스토리지 옵션을 바로 통합할 수 있는 모듈로 패키징한 제품입니다. 58 시리즈의 기능이 필요하면서 하드웨어 개발 초기에 RF, BGA, 메모리 레이아웃의 위험을 줄이려는 프로젝트에 사용하십시오.

### 개발 키트

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md)는 전원 트리, 디스플레이, 스토리지, 오디오, RF, USB, SDIO 설계 결정의 출발점입니다.

### 레퍼런스 제품

일반적인 SF32LB58x 최종 제품으로는 프리미엄 워치 플랫폼, 고해상도 웨어러블 HMI, 스마트 대시보드, 휴대용 연결형 단말기, Bluetooth, 디스플레이, 오디오, 스토리지, 로컬 AI 워크로드를 결합한 디바이스가 있습니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 기존 원본 문서 없이 정리하여 작성되었습니다. 기술적 내용을 사용하기 전에 SiFli 공식 문서와 대조하여 확인하십시오.
