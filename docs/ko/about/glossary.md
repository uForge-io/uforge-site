---
icon: lucide/book-a
description: "μForge.io SF32 문서 전반에서 사용하는 임베디드, 무선, 그래픽, SiFli 고유 용어와 약어를 정리한 빠른 참조용 용어집입니다."
tags:
    - 소개
---
# 용어집 { #glossary }

μForge.io 사이트 전반에서 사용하는 약어와 용어를 빠르게 찾아볼 수 있는 참조 페이지입니다. 일반적인 임베디드/무선 용어와 SF32 플랫폼의 SiFli 고유 명칭을 모두 다룹니다. 각 항목은 해당 용어를 자세히 설명하는 페이지로 연결되며, 이 페이지는 찾아보기 위한 보조 수단이지 그 맥락을 대체하지 않습니다.

## 아키텍처와 처리 { #architecture-and-processing }

* **MCU** — **Microcontroller Unit(마이크로컨트롤러 유닛).** CPU 코어, 메모리, 프로그래밍 가능한 입출력 주변 장치를 하나로 통합한 집적 회로로, 범용 운영 체제 대신 전용 펌웨어를 낮은 오버헤드로 실행하도록 최적화되어 있습니다.
* **SoC** — **System on Chip(시스템 온 칩).** 컴퓨터 시스템에 필요한 모든 전자 회로와 구성 요소를 하나의 기판에 통합한 집적 회로입니다. 이 사이트에서는 SF32 제품을 MCU로 분류합니다. 완전한 애플리케이션 프로세서 OS 환경이 아니라 마이크로컨트롤러급 펌웨어를 대상으로 하기 때문입니다.
* **Arm Cortex-M33** — SF32의 애플리케이션 코어와 Bluetooth 코어가 기반으로 하는 32비트 Armv8-M mainline 프로세서 아키텍처입니다. Armv8-M mainline은 이전의 Cortex-M3/M4 코어와 달리 선택 사항인 TrustZone 보안 확장(신뢰 코드/데이터와 비신뢰 코드/데이터를 하드웨어 수준에서 격리)을 지원합니다. 다만 TrustZone은 실리콘 구현마다 정하는 구성 선택 사항이며 모든 Cortex-M33에 보장되는 기능이 아닙니다. 현재의 SF32LB52x부터 SF32LB58x까지의 제품에는 TrustZone이 구성되어 있지 않습니다. 자세한 내용은 아래의 STAR-MC1과 [SF32LB52x 칩 페이지](../sf32-products/chips/SF32LB52x.md)를 참조하십시오.
* **STAR-MC1** — Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP로, 호환되는 SF32 디바이스에서 Cortex-M33급 애플리케이션 프로세서로 사용됩니다. CU, SP, SE 구성은 캐시, TCM, XIPU, TrustZone 기능이 서로 다르며, SF32 제품이 제공하는 기능 집합은 디바이스마다 다릅니다. SiFli 문서에서는 문맥에 따라 "Arm Cortex-M33 STAR-MC1" 또는 "Arm Cortex-M33"이라고 표기할 수 있습니다. [STAR-MC1 아키텍처 페이지](../learn/architecture/star-mc1.md)를 참조하십시오.
* **CDE** — **Custom Datapath Extension(커스텀 데이터패스 확장).** 선택된 연산을 가속하기 위한 Arm Custom Instruction 메커니즘입니다. Arm China의 STAR-MC1 자료는 CDE의 예로 CRC32를 듭니다. 실제 SF32에서의 사용 가능 여부와 소프트웨어 지원은 디바이스별로 확인해야 합니다.
* **DSP** — **Digital Signal Processor / digital signal processing(디지털 신호 프로세서 / 디지털 신호 처리).** Cortex-M33 코어에 내장된 확장 기능으로, 오디오나 센서 퓨전처럼 연산량이 많은 워크로드에 사용됩니다.
* **MPU** — **Memory Protection Unit(메모리 보호 유닛).** 코드가 접근할 수 있는 메모리 영역을 제한하는 하드웨어로, 결함 격리와 보안에 사용됩니다.
* **HAL** — **Hardware Abstraction Layer(하드웨어 추상화 계층).** 정확한 칩 변형(variant)과 무관하게 일관된 API로 주변 장치를 제공하는 SDK 계층입니다.
* **AI / ML 가속기** — 소형 신경망 모델 추론처럼 인공지능이나 머신러닝 워크로드를 가속하는 하드웨어입니다. 지원 여부는 디바이스마다 다르므로, 제품 선택기에서 후보를 고른 뒤 해당 부품의 데이터시트에서 확인하십시오.

## 무선 연결 { #wireless-connectivity }

* **BLE** — **Bluetooth Low Energy.** 대부분의 SF32 웨어러블 및 IoT 제품이 기반으로 하는 저전력 Bluetooth 무선 모드입니다.
* **Wi-Fi** — 무선 근거리 통신망 기술입니다. SF32 제품에서 외부 Wi-Fi 지원을 문서화한 경우 연결은 SDIO 인터페이스를 통해 이루어집니다. 설계를 동결하기 전에 정확한 부품, 보드 수준 라우팅, 전원, 소프트웨어 지원을 확인하십시오.
* **Dual-mode Bluetooth** — 하나의 무선부에서 BLE와 Classic Bluetooth(BR/EDR)를 모두 지원하는 방식으로, 오디오 스트리밍(Classic 또는 LE Audio)과 저전력 제어 채널을 함께 써야 하는 제품에 사용됩니다. SF32LB52x/56x/57x/58x에서 지원되며, SF32LB55x는 BLE 전용입니다.
* **GAP** — **Generic Access Profile(제네릭 액세스 프로파일).** 디바이스 역할, 광고, 연결 설정을 관장하는 Bluetooth 계층으로, 모든 BLE 애플리케이션이 그 위에 놓이는 기반입니다.
* **GATT** — **Generic Attribute Profile(제네릭 어트리뷰트 프로파일).** 서비스와 특성(BLE 디바이스가 노출하는 실제 데이터)의 구조와 교환 방식을 정의하는 Bluetooth 계층입니다.
* **Sibles** — 표준 GAP 계층 위에 놓이는 SiFli-SDK의 GATT 서비스 프레임워크입니다. 대부분의 SF32 Bluetooth 제품은 GATT 데이터베이스를 처음부터 만들지 않고 기존 Sibles 기반 예제에서 시작합니다. [Bluetooth 개요](../learn/bluetooth/overview.md)를 참조하십시오.
* **LE Audio** — LC3 코덱과 Auracast 브로드캐스트 오디오 모드를 포함하는, Classic Bluetooth 오디오 프로파일과 구별되는 새로운 Bluetooth Low Energy 오디오 표준입니다. SF32LB52x/56x/57x/58x에서 지원되며 SF32LB55x에서는 지원되지 않습니다. [Bluetooth Audio와 LE Audio](../learn/bluetooth/processor.md)를 참조하십시오.
* **OTA** — **Over-The-Air(무선 방식)** 펌웨어 업데이트. 유선 연결 대신 무선 링크(주로 BLE)로 디바이스 펌웨어를 업데이트하는 것입니다.
* **DFU** — **Device Firmware Update(디바이스 펌웨어 업데이트).** Bluetooth를 통한 OTA 업데이트가 일반적으로 구현하는 메커니즘/프로토콜 범주입니다.

## 그래픽과 디스플레이 { #graphics-and-display }

* **ePicasso** — SF32 제품군용으로 SiFli가 자체 개발한 2D/2.5D 그래픽 가속 엔진으로, 이미지 복사, 블렌딩, 스케일링, 회전, 레이어 합성 같은 픽셀 연산을 처리해 애플리케이션 CPU의 부담을 덜어 줍니다. [ePicasso 아키텍처 페이지](../learn/graphics/epicasso-gpu.md)를 참조하십시오.
* **eZip** — SiFli의 무손실 그래픽 및 범용 압축 형식으로, 지원되는 SF32 디바이스에서 하드웨어 디코딩을 제공합니다. 그래픽의 경우 SiFli는 압축률이 PNG보다 약간 높다고 설명하며, 범용 데이터의 경우 압축률은 원본에 따라 달라집니다. 압축된 에셋은 디코딩 전에 버스를 통해 전송되므로 eZip은 PSRAM과 NOR 플래시의 외부 메모리 대역폭을 줄일 수 있습니다.
* **TurboPixel** — 지원되는 SF32 제품에서 쓰는 고정 압축률 손실 방식의 최종 프레임버퍼 형식입니다. extDMA가 렌더링된 비트맵을 TurboPixel로 압축하고 디스플레이 컨트롤러가 이를 해제하여 PSRAM 대역폭과 PSRAM 용량을 줄입니다. [TurboPixel 프레임버퍼 압축 페이지](../learn/graphics/turbopixel.md)를 참조하십시오.
* **LVGL** — **Light and Versatile Graphics Library.** 대부분의 SF32 제품이 애플리케이션 수준 UI에 사용하는 오픈소스 임베디드 UI 프레임워크로, ePicasso로 가속되는 렌더링 위에서 동작합니다.
* **HMI** — **Human-Machine Interface(휴먼-머신 인터페이스).** 설계 범주로서의 디바이스 내 사용자 인터페이스(화면, 터치, 버튼)를 가리키는 약칭입니다.
* **RGB / DPI 디스플레이 인터페이스** — 픽셀 색상 성분을 호환되는 패널이나 디스플레이 컨트롤러에 직접 전달하는 병렬 디스플레이 인터페이스입니다. 정식 명칭은 **DPI(Display Pixel Interface)**이며, "RGB 인터페이스"는 보드 설계에서 흔히 쓰는 약칭입니다. 일반적으로 픽셀 클럭, 수평 및 수직 동기 신호, 여러 개의 병렬 색상 데이터 라인을 사용합니다. 직렬 디스플레이 인터페이스에 비해 DPI는 더 많은 GPIO를 사용하고 병렬 트레이스 라우팅에 더 세심한 주의가 필요하므로, 대상 패키지의 핀 예산과 패널 타이밍 요구 사항을 확인하십시오.
* **MIPI 디스플레이 인터페이스** — MIPI Alliance 표준으로 규정된 디스플레이 인터페이스로, 호환되는 더 높은 대역폭의 패널에 사용됩니다.
* **EPD** — **Electronic Paper Display(전자 종이 디스플레이).** 저전력 반사형 화면에 흔히 사용되는 디스플레이 기술입니다.
* **JDI 디스플레이 인터페이스** — 선택한 SF32 디바이스에 문서화되어 있는 경우, 호환되는 JDI / Sharp Memory-in-Pixel 디스플레이를 지원합니다.

## 오디오 { #audio }

* **ADC / DAC** — **Analog-to-Digital / Digital-to-Analog Converter(아날로그-디지털 / 디지털-아날로그 컨버터).** 오디오 기능이 통합된 SF32 제품의 오디오 프런트엔드 및 출력 경로입니다. 전용 오디오 ADC/DAC는 SF32LB52x/56x/57x/58x에서 사용할 수 있으며, SF32LB55x에는 전용 오디오 ADC/DAC가 없습니다.
* **PDM** — **Pulse-Density Modulation(펄스 밀도 변조).** 오디오 기능이 있는 SF32 제품에서 I2S와 함께 지원되는 일반적인 디지털 마이크 인터페이스 형식입니다. PDM 인터페이스 하나가 마이크 하나를 뜻하지는 않습니다. 인터페이스 하나에는 보통 디지털 마이크를 최대 2개 연결할 수 있으며, 두 마이크는 클럭을 공유하고 서로 반대되는 클럭 에지를 사용하여 왼쪽과 오른쪽 채널을 구분합니다. 마이크 수가 아니라 PDM 인터페이스 수를 기준으로 사양을 정하고 비교하십시오.
* **I2S** — **Inter-IC Sound.** 코덱, DAC, 기타 오디오 주변 장치를 연결하기 위한 표준 디지털 오디오 인터페이스입니다.

## 전원과 신뢰성 { #power-and-reliability }

* **PMU** — **Power Management Unit(전원 관리 유닛).** SF32 칩 내부에서 전압 레귤레이션(BUCK/LDO 출력)을 담당하는 통합 블록입니다. 일부 설계에서는 추가 전원 레일을 위해 외부 SiFli PMIC(예: SF30147C)를 함께 사용합니다.
* **PMIC** — **Power Management IC(전원 관리 IC).** MCU 내부 PMU가 공급하는 것 이상의 레귤레이션된 전원 레일을 추가로 제공하는 전용 외부 칩입니다.
* **LDO** — **Low-Dropout regulator(저드롭아웃 레귤레이터).** 선형 전압 레귤레이터의 한 종류로, SF32 제품 내부 PMU의 출력 단 중 하나입니다.
* **BUCK** — 스위칭(비선형) 전압 레귤레이터 토폴로지로, 전류가 클 때 LDO보다 효율이 높으며 SF32 PMU에도 통합되어 있습니다.
* **TRNG** — **True Random Number Generator(진난수 생성기).** 물리적인 열 잡음을 이용하는 하드웨어 엔트로피 소스로, 암호 키 생성과 보안 기능에 사용됩니다.
* **PSA** — **Platform Security Architecture.** Arm의 보안 프레임워크 및 인증 체계입니다. 일부 SF32 칩 페이지에는 **PSA Certified Level 1**이 기재되어 있습니다. 제품군 전체에 일률적으로 적용된다고 가정하지 말고, 해당 제품의 공식 문서에서 인증 상태와 레벨을 확인하십시오.

## 스토리지와 메모리 { #storage-and-memory }

* **SRAM** — **Static RAM(정적 RAM).** 애플리케이션 코드와 데이터를 실행하는 데 사용하는 빠른 온칩 작업 메모리입니다.
* **PSRAM** — **Pseudo-Static RAM(의사 정적 RAM).** 온칩 SRAM의 한계를 넘어 그래픽 버퍼와 더 큰 애플리케이션을 지원하는 데 쓰이는 대용량 외부 메모리로, SF32 모듈에서는 System-in-Package 형태인 경우가 많습니다.
* **NOR / NAND 플래시** — 펌웨어와 에셋 저장에 사용하는 두 가지 비휘발성 플래시 메모리입니다. NOR은 빠른 랜덤 읽기를 지원하며 직접 코드 실행(XiP, Execute-in-Place)에 흔히 사용됩니다. NAND/SD-NAND는 랜덤 액세스 속도를 희생하는 대신 훨씬 높은 집적도를 제공하여 이미지, 글꼴, 로그의 대용량 저장에 적합합니다.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (or Serial Peripheral) Interface.** 플래시 또는 PSRAM 인터페이스의 핀 수/대역폭 등급(Quad = 데이터 라인 4개, Octal = 8개)으로, 달성 가능한 메모리 대역폭에 영향을 줍니다.
* **eMMC** — **Embedded MultiMediaCard.** 저장 용량이 큰 SF32 설계에 사용되는 관리형 NAND 플래시 스토리지 인터페이스입니다.

## 주변 장치와 인터페이스 { #peripherals-and-interfaces }

* **GPIO** — **General-Purpose Input/Output(범용 입출력).** 간단한 신호 전달, 버튼, LED, 비트 뱅잉 인터페이스에 사용하는 설정 가능한 디지털 핀입니다.
* **I/O** — **Input/Output(입출력).** 디바이스가 시스템의 나머지 부분과 데이터나 제어 신호를 주고받는 핀과 주변 장치 신호를 가리키는 일반 용어입니다.
* **UART** — **Universal Asynchronous Receiver/Transmitter.** 콘솔/디버그 출력과 간단한 점대점 통신에 사용하는 표준 직렬 인터페이스입니다.
* **SPI** — **Serial Peripheral Interface.** 디스플레이, 플래시, 센서 및 기타 고속 주변 장치에 사용하는 동기식 직렬 버스입니다.
* **I2C** — **Inter-Integrated Circuit.** 센서와 저속 주변 장치 설정에 흔히 사용하는 동기식 멀티드롭 직렬 버스입니다.
* **SDIO** — **Secure Digital Input Output.** 문서화된 SF32 설계에서 외부 Wi-Fi 디바이스를 연결하는 데 사용하는 호스트 인터페이스입니다.
* **DCMI** — **Digital Camera Module Interface.** 호환되는 이미지 센서를 연결하기 위한 병렬 카메라 인터페이스입니다.
* **FreeIO** — 지원되는 신호를 디바이스의 문서화된 제약 안에서 적절한 GPIO에 매핑할 수 있게 하는 SiFli의 유연한 GPIO 할당 기능입니다.
* **PTM** — **Peripheral Task Machine.** 지원되는 디바이스에서 주변 장치 작업을 결정적으로 처리하는 SiFli 하드웨어 기능입니다.
* **RTC** — **Real-Time Clock(실시간 클럭).** 메인 애플리케이션 클럭 도메인과 무관하게 계속 동작하거나 시스템을 깨울 수 있는 시간 측정용 주변 장치입니다.

## 하드웨어와 제조 { #hardware-and-manufacturing }

* **QFN** — **Quad Flat No-lead package(쿼드 플랫 노리드 패키지).** SF32 제품이 제공되는 칩 패키지 유형으로, 핀 수와 본체 크기로 표기합니다(예: QFN68).
* **BGA** — **Ball Grid Array package(볼 그리드 어레이 패키지).** 디바이스 아래에 솔더 볼이 배열된 패키지로, 작은 풋프린트와 더 많은 핀 수를 구현할 수 있지만 BGA 팬아웃을 위한 PCB 배선과 이에 맞는 조립 공정이 필요합니다.
* **BOM** — **Bill of Materials(자재 명세서).** 인쇄 회로 기판 어셈블리(PCBA)를 제조하는 데 필요한 부품, 수동 소자, 기구 하드웨어를 항목별로 정리한 공식 목록입니다. SiFli가 권장하는 부품과 모듈을 선호하는 주된 이유는 BOM 복잡도를 줄일 수 있기 때문입니다.
* **EDA** — **Electronic Design Automation(전자 설계 자동화).** 회로도 작성, SPICE 시뮬레이션, PCB 레이아웃 소프트웨어 범주입니다. SF32 전용 풋프린트/심볼은 [EDA 도구 라이브러리 페이지](../hardware/cad-components/eda-tool-libraries.md)를 참조하십시오.
* **AVL** — **Approved Vendor List(승인 업체 목록).** SF32 하드웨어 설계의 전기적 허용 오차에 맞춰 검증한, SiFli의 인증된 세컨드 소스 부품 목록입니다(크리스털, 레귤레이터, 플래시 등). [승인 업체 목록 페이지](../hardware/cad-components/sifli-approved-vendor-list.md)를 참조하십시오.
* **EVB** — **Evaluation Board(평가 보드).** 맞춤형 하드웨어가 나오기 전에 설계를 브링업하고 검증하는 데 사용하는, SiFli가 제공하는 SF32 레퍼런스/개발 보드입니다.
* **FAE** — **Field Application Engineer(현장 애플리케이션 엔지니어).** 공개 문서가 다루는 범위를 넘는 하드웨어 설계 문의에 대한 SiFli의 기술 지원 담당자입니다.

## 소프트웨어와 도구 { #software-and-tools }

* **SiFli-SDK** — SF32 제품용 SiFli의 주요 펌웨어 개발 키트로, 대부분의 양산 펌웨어가 기반으로 하는 레퍼런스/벤더 SDK입니다.
* **SiFli CodeKit** — SiFli-SDK 개발을 위한 VS Code 확장으로, 원시 명령줄 툴체인 없이도 프로젝트 생성, 구성, 빌드, 플래시, 모니터 워크플로를 안내합니다.
* **RTOS** — **Real-Time Operating System(실시간 운영 체제).** SiFli-SDK 자체의 RTOS 통합을 통해서든 Zephyr를 통해서든 SF32 펌웨어가 일반적으로 실행되는 OS 부류(결정적 스케줄링, 낮은 오버헤드)입니다.
* **sftool** — SF32 보드용 SiFli 명령줄 플래싱/복구 유틸리티로, 부팅에 실패한 보드를 복구하는 기능도 제공합니다.
