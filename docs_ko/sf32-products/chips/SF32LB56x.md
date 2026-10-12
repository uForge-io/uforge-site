---
icon: lucide/microchip
description: "SF32LB56x: 더 풍부한 디스플레이, 통합 오디오, 외부 메모리, 더 강력한 상시 동작 처리가 필요한 제품을 위한 고급 초저전력 듀얼 모드 Bluetooth MCU 제품군."
tags:
    - 하드웨어
    - 칩
---

# SF32LB56x

## 개요

SF32LB56x 시리즈는 듀얼 모드 Bluetooth, 더 풍부한 그래픽, 통합 오디오, 외부 메모리, 하위 등급 SF32LB 디바이스보다 높은 디스플레이/스토리지 유연성이 필요한 제품을 위한 고급 초저전력 AIoT 마이크로컨트롤러 제품군입니다.

big.LITTLE 듀얼 코어 아키텍처를 사용하며, 최대 240 MHz로 동작하는 고성능 Arm Cortex-M33 STAR-MC1[^1] 애플리케이션 프로세서와 최대 96 MHz로 동작하는 초저전력 Arm Cortex-M33 STAR-MC1 프로세서로 구성됩니다. 이 구조에서는 메인 코어가 UI, 디스플레이, 스토리지, 제품 로직 워크로드를 처리하고, 저전력 코어가 상시 센싱, Standby 동작, Bluetooth 제어를 더 낮은 에너지 예산으로 처리합니다.

SiFli의 공식 제품 브리프와 데이터시트는 SF32LB56x를 디스플레이와 오디오 비중이 큰 연결형 디바이스를 위한 고집적 선택지로 설명합니다. 이 제품군에는 BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3, ePicasso 2.0 그래픽, 통합 오디오 ADC/DAC 경로, TinyML 지향 가속기, 패키지 내장 플래시 옵션, 더 폭넓은 외부 메모리 및 디스플레이 인터페이스 지원이 추가되었습니다. 실제로는 무선, 디스플레이, 오디오 복잡도가 SF32LB55x의 범위를 넘어섰지만 MCU급 전력과 집적도는 유지하려는 설계에 적합합니다.

SiFli의 칩 모델 가이드도 여기서 중요합니다. SF32LB56x 제품군은 패키지마다 지원하는 디스플레이 인터페이스 조합이 다르므로, 정확한 부품 번호와 패키지 선택은 PCB 후반 단계의 세부 사항이 아니라 최우선 아키텍처 선택으로 다루어야 합니다.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델 덕분에 기존 Cortex-M33 펌웨어, 미들웨어, RTOS 포트, 툴을 이어서 사용하기 쉬우며, 디바이스별 일반적인 통합 작업은 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

## 애플리케이션

**SF32LB56x는 다음과 같이** 더 나은 디스플레이, 오디오, 스토리지, 로컬 처리 능력이 필요한 듀얼 모드 Bluetooth 제품에 **권장됩니다.**

- 스마트워치 및 스마트 밴드
- 그래픽 웨어러블 제품
- 의료 및 헬스케어 디바이스
- 연결형 HMI 제품
- 산업용 핸드헬드 단말기
- 스마트 도어락 및 스마트 가전
- 저전력 센서 허브
- 고급 eBike 및 eScooter 디스플레이

설계에 다음 기능 중 하나 이상이 필요하면 SF32LB56x를 선택하십시오.

- BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3
- 통합 HiFi 오디오 ADC 및 DAC
- 더 부하가 큰 디스플레이 및 그래픽 워크로드
- DPI/RGB 디스플레이 인터페이스 지원
- SDIO를 통한 외부 Wi-Fi, SD/SDIO 또는 eMMC를 통한 외부 스토리지
- WBBGA175 옵션을 통한 더 많은 GPIO
- TinyML, 오디오, UI를 동시에 처리할 수 있는 더 큰 여유

## 개발 리소스

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[Hardware Design Guide (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware Design Guide (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Hardware Application Source (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Hardware Application Source (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Source (U)]__
- :fontawesome-brands-github: __[Hardware Application Source (V)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[SDK Documentation]__
- :fontawesome-solid-book-open: __[API Reference]__
- :fontawesome-solid-list-check: __[Hardware Design Checklist Source]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## 기능 및 사양

### 연산 및 메모리

- 최대 240 MHz의 고성능 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서(HCPU)
- 최대 96 MHz의 초저전력 Arm Cortex-M33 STAR-MC1 프로세서(LCPU)
- HCPU에서 최대 370 DMIPS / 984 EEMBC CoreMark
- LCPU에서 최대 148 DMIPS / 394 EEMBC CoreMark
- HCPU 메모리 시스템: 32 KB I-cache + 16 KB D-cache, 128 KB 리텐션 SRAM을 포함한 800 KB SRAM
- LCPU 메모리 시스템: 16 KB I-cache + 8 KB D-cache, 160 KB 리텐션 SRAM
- 512 KB 또는 1 MB 패키지 내장 QSPI-NOR 옵션
- QSPI-NOR, SPI-NAND, QPI/OPI-PSRAM, SD/SDIO, eMMC용 외부 메모리 인터페이스

### 그래픽, 디스플레이, AI

- ePicasso 2.0 2D/2.5D 그래픽 가속
- 4레이어 알파 블렌딩과 배경 레이어 1개
- 하드웨어 회전, 스케일링, 미러링, 일반 포맷 변환
- 최대 1024 × 1024의 그래픽 엔진 워크로드
- 네이티브 eZip-A 애니메이션을 지원하는 eZip 2.0 무손실 그래픽 압축 해제
- 지원되는 변형(variant) 전반에서 LCD 컨트롤러는 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, JDI 인터페이스를 지원하며, 사용 가능 여부는 정확한 패키지와 주문 코드에 따라 달라짐
- TurboPixel: extDMA 고정 비율 손실 최종 프레임버퍼 압축과 디스플레이 컨트롤러 압축 해제로 PSRAM 대역폭과 용량을 줄임
- TinyML 워크로드용 신경망 행렬 가속기, 최대 1.92 GOPS 및 10 TOPS/W 이상

### 오디오 및 무선 연결

- BLE Audio를 지원하는 듀얼 모드 Bluetooth 5.3
- 감도: BLE 1 Mbps에서 -100 dBm, BR에서 -96.3 dBm, EDR2에서 -95.5 dBm, EDR3에서 -88.5 dBm
- 최대 송신 전력: BR/BLE는 19 dBm, EDR2/EDR3는 13 dBm
- BR 수신 피크 전류: 3.3 V에서 2.2 mA
- SNR 108 dB의 HiFi 24비트 오디오 DAC 1개
- SNR 99 dB의 HiFi 24비트 오디오 ADC 1개
- PDM 인터페이스 2개와 I2S 인터페이스 1개

### 보안

- AES, HASH, CRC 하드웨어 가속기
- 진성 난수 생성기(TRNG)
- PSA Certified Level 1

### 주변 장치 및 I/O

- UART 인터페이스 6개
- I2C 인터페이스 7개
- SPI 인터페이스 4개
- ISO7816 인터페이스 1개
- USB 2.0 FS 인터페이스 1개
- MPI 인터페이스 4개
- SD/SDIO/eMMC 인터페이스 2개(4비트 1개, 8비트 1개)
- 8채널 12비트 범용 SAR ADC 1개
- 온도 센서
- 저전력 전압 비교기 2개
- Peripheral Task Controller(PTC)
- 패키지에 따라 최대 120개의 GPIO

### 전원 공급 및 패키지

- 전원 공급 범위: 1.71 V~3.63 V
- 동작 온도: -40 °C~+85 °C
- 통합 고효율 buck 및 저전력 LDO
- RTC 웨이크업 시 슬립 전류: 600 nA
- 핀 웨이크업 시 슬립 전류: 300 nA
- 패키지 옵션: QFN68L, WBBGA175

## 제품군 변형

SF32LB56x는 소형 QFN68L 부품부터 I/O가 더 많은 WBBGA175 부품까지 걸쳐 있으며, 내장 메모리 옵션도 서로 다릅니다. 디스플레이 인터페이스 지원, GPIO 여유, 스토리지 용량, PCB 공정, 모듈 마이그레이션 옵션이 제품군 내에서 크게 다르므로 정확한 주문 코드를 일찍 선택하십시오.

나열된 변형의 문서화된 공급 범위는 1.71 V~3.63 V이고 동작 온도 범위는 -40 °C~+85 °C입니다. GPIO 전원 도메인은 1.71 V~3.45 V를 지원하며, 패키지 내부 메모리 I/O 레일에는 별도의 한계가 있습니다. 인터페이스 레벨을 설정하기 전에 해당하는 U 또는 V 변형의 하드웨어 가이드를 확인하십시오.

**`SF32LB566VCB36` 문서 불일치:** [SiFli 칩 모델 가이드](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)에는 코패키지 QSPI-NOR이 1 MB로 나열되어 있지만, 이전 [DS5601 V1.9.2 데이터시트](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf)의 주문 정보에는 4 Mb(0.5 MB)로 나열되어 있습니다. SiFli의 현재 [제품 인덱스](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst)는 DS5601 V1.9.3으로 연결되지만, 그 주문 정보는 이번 검토에서 확인할 수 없었으므로 이전의 불일치가 그대로 남아 있다고도, 수정되었다고도 가정하지 마십시오. 이 표는 칩 모델 가이드를 따릅니다. BOM을 확정하기 전에 V1.9.3의 항목을 확인하거나, SiFli에 정확한 주문 코드와 실제 출하되는 메모리 구성을 확인하십시오.

<div align="center"><em>대표적인 SF32LB56x 제품군 변형</em></div>

<div align="center" markdown>

| 예시 부품 | 패키지 | HCPU / LCPU GPIO | 내장 메모리 | 디스플레이 인터페이스 | 적합한 설계 유형 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB QSPI-NOR 플래시 | QSPI | 메모리 사용량이 가장 적고 PCB 브레이크아웃이 가장 단순해야 하는 입문용 56 시리즈 웨어러블, e-paper, 소형 HMI 설계 |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB OPI-PSRAM + 512 KB QSPI-NOR 플래시 | QSPI | 기본 560 등급보다 큰 프레임버퍼 여유가 필요한 소형 그래픽 설계 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB OPI-PSRAM + 512 KB QSPI-NOR 플래시 | QSPI | 더 저렴한 QFN 경로를 유지하면서 더 높은 해상도의 소형 UI가 필요한 설계 |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB OPI-PSRAM + 512 KB QSPI-NOR 플래시 | QSPI | BGA로 넘어가지 않고도 더 큰 로컬 에셋이 필요한 메모리 중심 소형 제품 |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | 8 MB + 4 MB OPI-PSRAM + 1 MB QSPI-NOR 플래시 | DPI / QSPI / 8080 / JDI | 더 풍부한 디스플레이 옵션, 더 많은 I/O, SF32LB56-MOD에 사용된 것과 동일한 실리콘이 필요한 풀 기능 웨어러블 및 HMI 설계 |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB OPI-PSRAM + 1 MB QSPI-NOR 플래시 | DPI / QSPI / 8080 / JDI | 모듈의 표준 칩 선택을 사용하지 않고, 더 큰 단일 풀 PSRAM과 고급 디스플레이 라우팅을 우선하는 고I/O 설계 |

</div>

## 통합 경로

SF32LB56x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 목표 디스플레이, 오디오, Bluetooth, 스토리지 경로를 동작시켜 보십시오.
2. **통합 수단 선택.** RF 및 고속 메모리 통합 작업을 줄이려면 [SF32LB56-MOD](../modules/SF32LB56-MOD.md)를 평가하고, 보드 수준 검증에는 [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md)를 사용하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 로컬 [SF32LB56x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md)와 그 [회로도](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md) 및 PCB 레이아웃 체크리스트를 사용하십시오. U/V 패키지와 디스플레이 인터페이스 선택은 선택한 부품에 맞추십시오.
4. **주요 정보 출처 확인.** 실제 주문할 부품과 패키지를 SiFli [데이터시트][Datasheet], [사용자 매뉴얼][User Manual], 해당하는 [U 하드웨어 설계 가이드][Hardware Design Guide (U, wiki.sifli.com)] 또는 [V 하드웨어 설계 가이드][Hardware Design Guide (V, wiki.sifli.com)], 그리고 대응하는 [U 하드웨어 애플리케이션 소스][Hardware Application Source (U)] 또는 [V 하드웨어 애플리케이션 소스][Hardware Application Source (V)]와 대조하여 확인하십시오.

## 관련 제품

### 모듈

[SF32LB56-MOD](../modules/SF32LB56-MOD.md)는 SF32LB566VCB36 칩, 메모리, RF 설계, 안테나 옵션을 바로 통합할 수 있는 모듈로 패키징한 제품입니다. SF32LB56x의 기능을 사용하면서 RF 레이아웃, 안테나 매칭, 크리스털 배치, 고속 메모리 통합의 위험을 줄이려는 프로젝트에 적합합니다.

### 개발 키트

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md)는 칩 다운 또는 모듈 기반 설계를 확정하기 전에 펌웨어 브링업, 디스플레이 검증, 오디오 및 스토리지 테스트, RF 점검, 전력 프로파일링을 수행하기 위한 실용적인 출발점입니다.

### 레퍼런스 제품

일반적인 SF32LB56x 최종 제품으로는 고급 스마트워치, 연결형 HMI 패널, 헬스케어 디바이스, 산업용 핸드헬드, 휴대용 계측기, 더 풍부한 eBike 또는 eScooter 디스플레이가 있습니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 기존 원본 문서 없이 정리하여 작성되었습니다. 기술적 내용을 사용하기 전에 SiFli 공식 문서와 대조하여 확인하십시오.
