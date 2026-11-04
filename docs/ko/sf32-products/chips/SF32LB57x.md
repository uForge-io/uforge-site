---
icon: lucide/microchip
description: "SF32LB57x: 듀얼 모드 Bluetooth, 240 MHz 코어 2개, ePicasso 3.0 그래픽, eZip 3.0, 소형 QFN/BGA 패키지를 갖춘 초저전력 멀티코어 AIoT MCU 제품군."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x { #sf32lb57x }

## 개요 { #overview }

SF32LB57x는 웨어러블, 휴대용 스마트 디바이스, 스마트 홈, 소형 디스플레이 제품을 위한 기능 강화형 초저전력 AIoT MCU 제품군입니다. 기본 Bluetooth MCU만으로는 부족해 더 풍부한 그래픽, Bluetooth 오디오, 카메라 입력, 외부 스토리지, 상시 동작이 필요하지만, 애플리케이션 프로세서급 플랫폼의 전력·비용·통합 부담까지는 원하지 않는 설계에 적합합니다. SiFli의 2026년 제품인 SF32LB57x는 SF32LB52x와 SF32LB56x의 업그레이드 제품으로, 가격 경쟁력을 유지하는 것도 목표로 합니다. 더 높은 CPU 성능과 향상된 그래픽 성능을 제공하며, 저비용 실장에 적합한 소형 QFN 패키지에서도 GPIO 수를 늘리고 패키지 내장 메모리 구성을 더 유연하게 선택할 수 있습니다. SiFli의 [하드웨어 설계 가이드](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)는 디스플레이 해상도 상한을 1024 × 1024로 제시합니다. [LCD FAQ](https://docs.sifli.com/projects/solution/7.FAQ/lcd/index.html)는 1024 × 600과 720 × 720을 일반적으로 사용되거나 검증된 RGB/DPI 설계로 들며, 이것이 실리콘의 절대적인 물리 한계를 뜻하지는 않는다고 설명합니다. μForge의 현재 [인터페이스 매트릭스](../../learn/graphics/display-controller.md#per-device-interface-matrix)에는 DPI/RGB에서 RGB888 최대 1024 × 600으로 기재되어 있습니다. 이 수치는 참고값이지 모든 패널 모드를 보장하지 않습니다. 정확한 부품과 패키지, 인터페이스, 패널 타이밍, 주사율, 핀 멀티플렉싱, 프레임버퍼/PSRAM 대역폭을 확인하십시오.

3코어 Arm Cortex-M33 STAR-MC1[^1] 아키텍처를 사용합니다. 고성능 코어 2개(HCPU와 ACPU)는 최대 240 MHz로 동작하며 합산 성능은 1968 CoreMark / 740 DMIPS이고, 여기에 24 MHz 저전력 LCPU가 더해집니다. SiFli의 [ACPU 사용 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html)는 SF32LB57x를 3코어 시스템으로 명시하고, ACPU에는 오디오·그래픽 작업을, LCPU에는 BLE와 센서 데이터 처리 등 소비 전력에 민감한 작업을 배정합니다. 제품의 워크로드에 맞게 대상 SDK 구성과 작업 분담을 확인하십시오. 이 플랫폼은 592 KB의 리텐션 SRAM, ePicasso 3.0 그래픽, eZip 3.0 압축 해제, LCD 및 DCMI 카메라 컨트롤러, 듀얼 모드 Bluetooth, 오디오 ADC/DAC, SiP 및 외부 메모리 인터페이스, 보안 가속, FreeIO 핀 할당을 갖추고 있습니다. 핵심 차별점은 PTM(Parallel Task Machine)입니다. PTM은 사이클 단위 타이밍에 민감한 주변 장치 시퀀싱, 커스텀 IO 프로토콜, 센서 데이터 수집, PWM과 유사한 타이밍, 이벤트 처리를 메인 CPU에서 분리해 처리하는 소형 병렬 태스크 프로세서입니다.

회로도를 재사용하거나 PCB 레이아웃을 시작하기 전에 정확한 주문 부품을 선택하십시오. SF32LB57x는 QFN68, QFN80, BGA112 패키지로 제공되며, 부품군에 따라 배터리 전원 기준 구성과 외부 레귤레이션 3.3 V 기준 구성으로 나뉩니다. 이 선택은 전원 트리, GPIO 수, 패키지 팬아웃, 디스플레이 및 스토리지 라우팅, 디버그 접근, 브링업 전략을 결정합니다.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델은 기존 Cortex-M33용 펌웨어, 미들웨어, RTOS 포트, 개발 도구를 활용하는 데 도움이 됩니다. 다만 실제 디바이스에 맞춘 통합 작업은 여전히 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

[^2]: **BGA112 전용.** SF32LB57x는 MPI1, MPI2, MPI3를 통합합니다. 내부 코패키지 메모리 위치는 [SF32 부품 번호 체계](../family/SF32_namingrule.md)를 참조하십시오. 다음 두 가지 코패키지 메모리 구성 중 어느 쪽이든 MPI2와 MPI3 핀은 외부에서 접근할 수 없게 되어 GPIO는 58개만 남습니다. (1) MPI2의 PSRAM 1개(단독 또는 MPI1의 PSRAM 1개와 함께), 또는 (2) MPI3의 NOR 플래시. `SF32LB57GVD776`은 (2)의 경우로, 두 번째 `7`이 MPI3의 내부 부품을 나타내므로 GPIO는 58개만 사용할 수 있습니다. 그 밖의 모든 구성에서는 MPI3와 연결된 BGA112 I/O 6개를 MPI3용으로, 또는 풀업이나 풀다운으로 구성하는 GP 정적 출력용으로 사용할 수 있으며, 제약 없는 GPIO는 아닙니다. 따라서 `SF32LB57ZVN7N6`의 `58 + 6` 표기는 사용 가능한 GPIO 58개에 MPI3 또는 정적 출력용 핀 6개를 더한 것을 의미하며, 자유롭게 할당할 수 있는 GPIO 64개가 아닙니다. 이 제한은 QFN68 또는 QFN80 패키지에는 적용되지 않으며, 이 패키지들은 공칭 GPIO 수만 노출하고 추가적인 MPI3 또는 정적 출력 옵션이 없습니다.

[^3]: 패키지 치수와 두께는 SiFli SF32LB57x 데이터시트(DS5701 및 DS5702)의 주문 표와 패키지 도면을 따랐습니다. QFN68(7 × 7 mm, 도면 0.9 mm 또는 1.1 mm), QFN80(8 × 8 mm, 도면 0.9 mm 또는 1.1 mm), BGA112(5.4 × 4.4 mm, 0.98 mm)입니다. 메모리 다이가 3개인 부품(PSRAM 1개와 듀얼 다이 QSPI-NOR)은 더 두꺼운 패키지 옵션을 사용합니다. SiFli 하드웨어 애플리케이션 가이드에 따라 QFN68은 1.1 mm, BGA112는 1.03 mm입니다. 주문 표에 SF32LB57ZVN7N6는 없으므로 이 부품의 BGA112 두께는 데이터시트의 유일한 BGA112 도면(0.98 mm)에서 가져왔습니다. SF32LB57x 전용 부품 번호 체계 다이어그램은 U를 QFN68, Y를 QFN80, V를 BGA112에 대응시키며, Y 대응을 다른 SF32 제품군에 적용할 수 있다고 가정해서는 안 됩니다. 실제 부품 번호의 두께와 패키지 도면은 SiFli에 확인하십시오.
[^4]: 배터리 전원 시리즈에 대해 SiFli의 SF32LB57x 데이터시트(DS5701)는 VBAT와 VCC를 3.0–4.7 V로, 파워온 전압을 3.5 V ±10 %로 규정합니다. SiFli의 하드웨어 설계 가이드는 이보다 좁은 3.45–4.7 V 입력을 제시합니다(QFN68 Table 2-1-1, QFN80 Table 2-1-3, BGA112 Table 2-1-5). 두 문서가 서로 다르므로 해당하는 입력 핀과 한계는 실제 부품의 데이터시트에서 확인하십시오.
[^5]: I/O 전압 항목은 지원되는 I/O 도메인을 요약한 것이며, 모든 핀이 두 전압 중 어느 쪽이든 사용할 수 있다는 뜻은 아닙니다. VDDIOA는 별도로 공급되는 경우 GPIO에 전원을 공급합니다. VDDIOSB는 있는 경우 SiP 메모리 I/O 레일이며, SiFli의 가이드는 코패키지 PSRAM에 1.8 V, NOR 플래시에 3.3 V를 규정합니다. QFN68 3.3 V 시리즈의 Table 2-1-2는 VDDIOA를 3.3 V로만 규정합니다. 각 핀과 도메인은 패키지 가이드와 실제 부품의 데이터시트에서 확인하십시오.
[^6]: 듀얼 다이: 두 다이는 서로 독립된 메모리 장치이며 별도의 MPI 인터페이스에 연결되어 각각 독립적으로 접근할 수 있습니다.

## 애플리케이션 { #applications }

**SF32LB57x는** 저전력 MCU 플랫폼에서 UI 그래픽, Bluetooth 오디오, 카메라 입력, 외부 스토리지, 상시 센싱을 결합해야 하는 소형 연결형 제품에 **적합합니다.** 예는 다음과 같습니다.

- 스마트워치, 피트니스 밴드, 웨어러블 의료 기기
- 스마트 HMI 디바이스, 디스플레이 중심 단말기, 제어 패널
- E-paper 스마트 디바이스 및 전자 액자
- 중소형 스마트 홈 가전 및 스마트 도어락
- 휴대용 녹음, 오디오, Bluetooth 무전기 또는 인터컴 제품
- 카메라를 지원하는 웨어러블 또는 핸드헬드 디바이스
- 산업용 디스플레이, 센싱, 모니터링, 계측 제품
- 자동차 센터 콘솔 컨트롤러, 무선 자동차 키, 자동차 리모컨
- Bluetooth 메시 및 저전력 센서 허브 네트워크

이러한 용도의 기반이 되는 그래픽, 카메라, 오디오, 스토리지, PTM 기능은 [기능 및 사양](#features-and-specs)을 참조하십시오. Bluetooth 6.3은 SF32LB57x 데이터시트를 따른 것이며, 제품 개요서에는 아직 이전 리비전이 표시되어 있습니다. 선택 기능은 실제 주문할 부품에 대한 최신 SiFli 문서에서 확인하십시오.

## 개발 리소스 { #development-resources }

[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[SiFli SDK 소스 코드 저장소]: https://github.com/OpenSiFli/SiFli-SDK
[배터리 전원 데이터시트]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[3.3 V 전원 데이터시트]: https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[사용자 설명서]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf
[원본 하드웨어 설계 가이드]: https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __제품 개요서 ([배터리](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3.3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __데이터시트 ([배터리 / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3.3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[사용자 설명서 (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-brands-github: __[SiFli SDK 소스 코드 저장소]__
- :fontawesome-solid-file-lines: __[원본 설계 가이드(wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[개발 키트 가이드(wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[하드웨어 설계 가이드(μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli 승인 업체 목록][SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

---

## 기능 및 사양 { #features-and-specs }

### 연산 및 메모리 { #compute-and-memory }

- 최대 240 MHz의 Arm Cortex-M33 STAR-MC1 고성능 코어 2개, FPU 및 MPU 포함(합산 1968 CoreMark / 740 DMIPS)
- 24 MHz의 Arm Cortex-M33 STAR-MC1 저전력 코어
- 32 KB 명령어 캐시 + 16 KB 데이터 캐시(HCPU)
- 592 KB 리텐션 SRAM(512 KB HPSYS + 80 KB LPSYS), 128 KB 제로 웨이트 사이클 D-TCM 포함
- 변형에 따라 달라지는 코패키지 메모리, 최대 48 MB PSRAM 및 32 MB NOR 플래시

### AI 가속 { #ai-acceleration }

SiFli의 [SF32LB57x 하드웨어 가이드](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)는 AI 신경망 가속기가 통합되어 있다고 명시합니다. 하지만 [SiFli SDK v2.5.1 NNACC 가이드](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md)는 55x, 56x, 58x를 언급하지만 57x는 나열하지 않습니다. 가속 기능을 설계 전제로 삼기 전에 정확한 57x 부품의 드라이버, 연산자, 툴체인 지원 여부를 SiFli에 확인하십시오.

### PTM 병렬 태스크 머신 { #ptm-peripheral-task-machine }

- CPU가 계속 서비스하는 대신 하드웨어 타이밍으로 실행하는 커스텀 주변 장치 작업용 4코어 Parallel Task Machine
- 결정적 IO 시퀀싱을 위한 사이클 단위 타이밍
- 코어당 최대 16개의 IO 채널, FIFO/DMA 지원
- AHB 메모리 및 주변 장치 레지스터 접근, CPU 인터럽트, 코어 간 이벤트

### 무선 연결 { #wireless-connectivity }

- 듀얼 모드 Bluetooth 6.3(Classic Bluetooth 및 BLE), BLE Audio 및 LE Long Range 지원
- 최대 송신 전력:
    - BLE/BR: 17 dBm
    - EDR2 및 EDR3: 13 dBm
- 수신 감도: −100 dBm @ BLE 1 Mbps

### 그래픽, 디스플레이, 카메라 { #graphics-display-and-camera }

현재 μForge 인터페이스 매트릭스는 DPI/RGB를 통한 RGB888 1024 × 600을 기재하며, 출처별 주의사항과 모드 검증 조건은 [개요](#overview)에 설명되어 있습니다. 정확한 부품/패키지의 인터페이스와 노출 핀은 [디바이스별 인터페이스 매트릭스](../../learn/graphics/display-controller.md#per-device-interface-matrix)에서 확인하십시오.

- ePicasso 3.0 2D/2.5D 그래픽 가속기, 최대 2048 × 2048
- 무손실 eZip/eZip-A와 JPEG, MJPEG용 eZip 3.0 하드웨어 디코더
- 8080, SPI/DSPI/QSPI, DPI/RGB, JDI, 8/16비트 EPD를 지원하는 전용 LCD 컨트롤러
- DVP 및 SPI/DSPI/QSPI를 지원하는 DCMI 카메라 컨트롤러

### 오디오 및 아날로그 { #audio-and-analog }

- SNR 109 dB의 24비트 오디오 DAC 1개
- SNR 97 dB의 24비트 오디오 ADC 2개
- 12비트 범용 ADC 1개(12채널)
- 온도 센서

### 스토리지 및 보안 { #storage-and-security }

- NOR, NAND, QPI-PSRAM용 MPI(QSPI) 3개, XIP 지원
- SD3.0/SDIO3.0/eMMC 2개
- AES/HASH/CRC 하드웨어 가속기
- TRNG
- 온더플라이 플래시 복호화 및 eShield 보안 아키텍처
- PSA Certified Level 1

### 주변 장치 및 I/O { #peripherals-and-ios }

- UART 3개
- I2C 4개
- SPI 2개
- I2S 2개
- PDM 인터페이스 2개(인터페이스당 디지털 마이크 최대 2개)
- USB2.0 FS 1개
- CAN 2개
- PWM을 지원하는 RTC, 워치독, 범용 타이머(GPTIM, BTIM, ATIM, LPTIM)
- 패키지와 부품에 따라 최대 58개의 GPIO, FreeIO를 통한 유연한 할당

### 전원 관리 { #power-management }

- 통합 Buck 컨버터와 저전력 LDO, 각각 최대 150 mA의 외부 3.3 V 출력 2개
- Hibernate 전류: 3.8 V에서 2.8 µA(배터리 전원 기준 구성) 또는 3.3 V에서 1 µA(외부 전원 공급 기준 구성)
- 배터리 전원 기준 구성에서 최대 400 mA Li-ion 충전기(4.2 V~4.45 V)
- 배터리/시스템 입력 범위[^4]: 3.0 V~4.7 V
- VBUS 범위: 4.5 V~5.5 V
- 동작 온도 범위: −40°C~+85°C

## 제품군 변형 { #family-variants }

SF32LB57x에는 배터리 전원 변형(variant)과 외부 레귤레이션 3.3 V 시스템용 변형이 있습니다. 패키지 도면, 전원 핀, 사용 가능한 GPIO 수, 내장 메모리, 보드 제약이 제품군 내에서 서로 다르므로 회로도를 작성하기 전에 정확한 부품 번호를 선택하십시오.

아래의 부품 번호는 SiFli SF32LB57x 데이터시트(DS5701 및 DS5702, 둘 다 예비 초안)의 주문 표에서 가져온 것이며, 해당 표에 없는 `SF32LB57ZVN7N6`만 예외입니다. 설계에 적용하기 전에 정확한 주문 코드, 코패키지 메모리 구성, 전기적 한계, 패키지 도면을 SiFli의 최신 부품별 문서와 대조하여 확인하십시오.

실제 부품 선택은 다음과 같이 나뉩니다.

- **`SF32LB57xU`**: QFN68, 리튬 이온 배터리 전원 그룹(숫자 등급, 예: `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, 표준 외부 3.3 V 전원 그룹(문자 등급, 예: `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, 외부 3.3 V 전원 그룹.

배터리 전원 시리즈 데이터시트(DS5701)에는 배터리 전원 QFN80(8 × 8 mm, GPIO 58개)과 배터리 전원 BGA112(GPIO 최대 58개와 GPO 또는 MPI 인터페이스 I/O 6개)도 나와 있습니다. 그러나 해당 주문 표에는 배터리 전원 QFN80 또는 BGA112 부품 번호가 없으므로, 어느 쪽이든 이를 기준으로 설계하기 전에 주문 가능한 SKU를 SiFli에 확인하십시오.

<div align="center"><em>SF32LB57x QFN68 변형(57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| 패키지 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| 평면 치수[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| 두께[^3] | 0.9 mm | 1.1 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| 피치 | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| 코패키지 PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 없음 |
| 코패키지 NOR 플래시 | 16 MB QSPI-NOR | 16 MB+8 MB QSPI-NOR(듀얼 다이)[^6] | 16 MB×2 QSPI-NOR(듀얼 다이)[^6] | 없음 | 없음 | 1 MB QSPI-NOR |
| 전원 공급[^4] | 3.0~4.7 V | 3.0~4.7 V | 3.0~4.7 V | 3.0~4.7 V | 3.0~4.7 V | **3.3 V** |
| I/O 전압[^5] | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V / 1.8 V |
| 온도 | −40~85 °C | −40~85 °C | −40~85 °C | −40~85 °C | −40~85 °C | −40~85 °C |

</div>

<div align="center"><em>SF32LB57x QFN80 / BGA112 변형(57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| 패키지 | QFN80 | QFN80 | BGA112 | BGA112 |
| 평면 치수[^3] | 8 × 8 mm | 8 × 8 mm | 5.4 × 4.4 mm | 5.4 × 4.4 mm |
| 두께[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 1.03 mm |
| 피치 | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6(MPI3 또는 정적 출력)[^2] | 58[^2] |
| 코패키지 PSRAM | 8 MB(2×4 MB 듀얼 다이) OPI-PSRAM[^6] | 16 MB OPI-PSRAM | 없음 | 16 MB OPI-PSRAM |
| 코패키지 NOR 플래시 | 없음 | 16 MB QSPI-NOR | 16 MB QSPI-NOR | 32 MB(2×16 MB 듀얼 다이) QSPI-NOR[^6] |
| 전원 공급 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O 전압[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 온도 | −40~85 °C | −40~85 °C | −40~85 °C | −40~85 °C |

</div>

SF32LB57x에서 패키지 선택은 단순한 PCB 비용 문제가 아닙니다. 디스플레이 인터페이스 사용 가능 여부, 외부 스토리지 라우팅, GPIO 예산, 디버그/플래싱 핀 유지, 팬아웃 난이도에 영향을 주므로 패키지 선택은 전원 아키텍처와 함께 확정하는 것이 좋습니다. BOM과 회로도의 기준으로는 패키지 이름만이 아니라 주문 부품 번호를 사용하십시오. 메모리 접미사에 따라 SiP 스토리지 구성이 바뀌며, 이는 부트 미디어에 대한 가정, 전원 시퀀싱, 외부 스토리지 요구 사항에 영향을 줄 수 있습니다.

## 통합 경로 { #integration-path }

SF32LB57x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 의도한 그래픽, 오디오, 카메라, Bluetooth, 스토리지 기능을 검증하십시오.
2. **평가 하드웨어 계획.** [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)로 디스플레이, 카메라, 오디오 및 통신 기능을 평가하십시오. 57x 제품의 설계 기준으로 사용하기 전에 모듈 메모리 구성, 보드 리비전 및 공유 핀 설정을 확인하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 로컬 [SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)와 그 [고객 설계 자체 점검](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), 그리고 [양산 설계](../../hardware/design-for-production.md) 검토 절차를 사용하십시오. [회로도 체크리스트](../../hardware/chip-guides/SF32LB57x_schematic_checklist.md)와 [PCB 레이아웃 체크리스트](../../hardware/chip-guides/SF32LB57x_pcb_layout_checklist.md)도 함께 적용하십시오.
4. **주요 정보 출처 확인.** 실제 주문할 부품과 패키지를 [배터리 전원 데이터시트] 또는 [3.3 V 전원 데이터시트], [사용자 설명서], SiFli [원본 하드웨어 설계 가이드]와 대조하여 확인하십시오. 핵심 BOM 선택에는 [SiFli 승인 업체 목록]을 사용하십시오.

<!-- uf-faq:start -->
## 자주 묻는 질문 { #frequently-asked-questions }

**SF32LB57x의 주요 사양은 무엇입니까?**
SF32LB57x는 애플리케이션 CPU(2× Cortex-M33 @240 MHz)와 저전력 코어(Cortex-M33 @24 MHz, 전용 Bluetooth 컨트롤러)를 갖추고 있으며, 내장 SRAM은 592 KB입니다. Bluetooth 모드는 듀얼 모드(Classic Bluetooth + BLE)입니다. 그래픽: ePicasso 3.0 + eZip 3.0. 패키지는 QFN68 / QFN80 / BGA112이며, 크기는 7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)입니다. USB는 2.0 FS를 지원합니다.

하드웨어 설계 가이드에는 신경망 가속기가 통합된 것으로 기재되어 있지만, SDK v2.5.1 NNACC 가이드는 57x의 드라이버 또는 연산자 지원을 확인해 주지 않습니다. 정확한 대상의 소프트웨어 지원 경로를 확인하십시오. [AI 가속](#ai-acceleration)을 참조하십시오.

**SF32LB57x는 어떤 디스플레이 인터페이스를 지원합니까?**
지원하는 인터페이스는 SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB입니다. ([디바이스별 인터페이스 매트릭스](../../learn/graphics/display-controller.md#per-device-interface-matrix)) 전체 제품군의 인터페이스 목록이며 모든 부품 번호나 패키지에 대한 보장이 아닙니다. 연결된 인터페이스 매트릭스를 확인하십시오.

**SF32LB57x가 지원하는 최대 디스플레이 해상도는 얼마입니까?**
하드웨어 설계 가이드의 한계는 1024 × 1024이며, SiFli LCD FAQ는 일반적이거나 검증된 RGB/DPI 설계로 1024 × 600과 720 × 720을 제시합니다. 현재 인터페이스 매트릭스에는 1024 × 600 RGB888이 기재되어 있습니다. 서로 대체할 수 있는 보장값이 아닙니다. 정확한 부품과 패키지, 인터페이스, 패널 타이밍, 주사율, 핀 멀티플렉싱, 프레임버퍼/PSRAM 대역폭을 확인하십시오. [디스플레이 적용 조건](#overview)을 참조하십시오. ([디바이스별 인터페이스 매트릭스](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**SF32LB57x는 패키지 내 메모리를 얼마나 제공합니까?**
패키지 내 PSRAM은 최대 48 MB, NOR 플래시는 최대 32 MB를 제공합니다.

**SF32LB57x에는 어떤 공급 전압이 필요합니까?**
배터리 구동 부품: DS5701은 3.0–4.7 V를, 하드웨어 설계 가이드는 QFN68/QFN80/BGA112에 대해 3.45–4.7 V를 제시합니다. DS5701의 전원 인가 전압은 3.5 V ±10%입니다. 외부 레귤레이터 사용 부품: 2.97–3.63 V입니다. 정확한 부품과 입력 핀에 대해 출처 간 차이를 확인하십시오. [전원 적용 조건](#power-management)을 참조하십시오.

**SF32LB57x로 하드웨어 설계를 시작하려면 어떻게 해야 합니까?**
먼저 [SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)에서 회로도, 전원, 클럭/RF, PCB 레이아웃 지침을 확인하고, 보드 릴리스 전에 회로도와 레이아웃 체크리스트를 사용하십시오.
<!-- uf-faq:end -->

## 관련 제품 { #related-products }

### 하드웨어 설계 기준 구성 { #hardware-design-baseline }

[SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), 공식 하드웨어 애플리케이션 노트, 데이터시트, 승인 업체 목록을 설계 기준으로 사용하십시오. 회로도 또는 PCB를 릴리스하기 전에 전원 아키텍처, 패키지 팬아웃, 디스플레이, 스토리지, 오디오, 카메라, RF, 디버그/플래싱 계획을 확인하십시오.

### 개발 키트 { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)는 RGB 디스플레이, DVP 카메라, 듀얼 PDM 마이크, 스피커 출력, SDIO Wi-Fi, USB를 평가할 수 있는 평가 보드입니다. SF32LB57-MOD-WD 모듈을 사용합니다. SiFli 보드 가이드는 이 모듈을 3.3 V SF32LB57X 모듈로 설명하며, Wi-Fi/Bluetooth 콤보와 부팅용 QSPI 플래시가 탑재되고 OPI-PSRAM 포함 여부는 모듈 SKU에 따라 달라진다고 안내합니다. 양산 기준으로 사용하기 전에 정확한 모듈 구성과 RF 인증 상태를 SiFli에 확인하십시오.

공식 레퍼런스 회로도, 최소 시스템 가이드, 체크리스트 자료를 사용해 전원, 클럭, RF, 디스플레이, 스토리지, 오디오, 카메라, 양산 접근 방법을 계획하십시오.

### 레퍼런스 제품 { #reference-products }

일반적인 SF32LB57x 최종 제품으로는 웨어러블 워치와 밴드, 스마트 HMI 디바이스, e-paper 제품, 중소형 스마트 가전, 휴대용 녹음/오디오 디바이스, 스마트 홈 패널, 소형 디스플레이 단말기, 카메라를 지원하는 Bluetooth 제품이 있습니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 기존 원본 문서 없이 편집/작성되었습니다. 기술 정보를 신뢰하기 전에 SiFli 공식 문서에서 확인하십시오.
