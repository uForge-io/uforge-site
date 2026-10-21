---
icon: lucide/microchip
description: "SF32LB57x: 듀얼 모드 Bluetooth, 240 MHz 코어 2개, ePicasso 3.0 그래픽, eZip 3.0, 소형 QFN/BGA 패키지를 갖춘 초저전력 멀티코어 AIoT MCU 제품군."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x { #sf32lb57x }

## 개요 { #overview }

SF32LB57x 시리즈는 웨어러블, 휴대용 스마트 디바이스, 스마트 홈, 소형 디스플레이 제품을 위한 향상된 초저전력 고집적 AIoT MCU 제품군입니다. 기본 Bluetooth MCU가 무리 없이 지원할 수 있는 수준보다 풍부한 그래픽, Bluetooth 오디오, 카메라 입력, 외부 스토리지, 상시 동작이 필요하면서도 애플리케이션 프로세서급 플랫폼의 전력, 비용, 통합상의 트레이드오프는 감수하고 싶지 않은 설계를 대상으로 합니다.

SF32LB57x는 3코어 Arm Cortex-M33 STAR-MC1[^1] 아키텍처를 사용합니다. 고성능 코어 2개는 최대 240 MHz로 동작하고, 저전력 코어는 최대 24 MHz로 동작합니다. SiFli의 [ACPU 사용 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html)는 세 코어를 HCPU, ACPU, LCPU로 구분합니다. ACPU는 오디오와 그래픽 처리를 담당하고, LCPU는 BLE와 센서 데이터 처리 같은 저전력 작업을 지원합니다. 두 고성능 코어의 합산 성능은 1968 CoreMark / 740 DMIPS입니다. 이러한 분할 덕분에 UI 렌더링, 애플리케이션 코드, 멀티미디어 워크로드에 충분한 여유를 확보하면서 Bluetooth, 센서 허브, 기타 상시 동작 작업은 더 낮은 전력 경로에 둘 수 있습니다.

이 플랫폼은 592 KB의 온칩 리텐션 SRAM, ePicasso 3.0 2D/2.5D 그래픽 가속, eZip 3.0 하드웨어 압축 해제, 전용 LCD 컨트롤러, DCMI 카메라 컨트롤러, 듀얼 모드 Bluetooth 무선, 고음질 오디오 ADC/DAC 리소스, SiP 및 외부 메모리용 스토리지 인터페이스, 보안 가속, FreeIO를 통한 유연한 GPIO 할당을 통합합니다. 57x의 핵심 차별점은 PTM(Parallel Task Machine)입니다. PTM은 사이클 단위 타이밍에 민감한 주변 장치 시퀀싱, 커스텀 IO 프로토콜, 센서 수집, PWM과 유사한 타이밍, 이벤트 기반 조정을 메인 CPU에서 분리해 처리하는 소형 병렬 태스크 프로세서입니다.

하드웨어 계획에서 가장 중요한 초기 결정은 전원·패키지 기준 구성입니다. SF32LB57x는 QFN68, QFN80, BGA112 패키지로 제공되며, 부품군에 따라 배터리 전원 기준 구성과 외부 레귤레이션 3.3 V 기준 구성으로 나뉩니다. 이 선택은 전원 트리 설계, 사용 가능한 GPIO 수, 패키지 팬아웃, 디스플레이 및 스토리지 라우팅, 디버그 접근, 브링업 전략에 영향을 줍니다. 따라서 회로도나 PCB 레이아웃을 재사용하기 전에 정확한 주문 부품을 선택하는 것이 좋습니다.

[^1]: STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline 임베디드 CPU IP입니다. 호환되는 SF32 디바이스에서 SiFli는 이를 Arm Cortex-M33 STAR-MC1 애플리케이션 프로세서로 문서화합니다. Cortex-M33급 소프트웨어 모델은 기존 Cortex-M33용 펌웨어, 미들웨어, RTOS 포트, 개발 도구를 활용하는 데 도움이 됩니다. 다만 실제 디바이스에 맞춘 통합 작업은 여전히 필요합니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능이므로 해당 SF32 부품에서 지원되는지 반드시 확인해야 합니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

[^2]: **BGA112 전용.** SF32LB57x는 MPI1, MPI2, MPI3를 통합합니다. 내부 코패키지 메모리 위치는 [SF32 부품 번호 체계](../family/SF32_namingrule.md)를 참조하십시오. 다음 두 가지 코패키지 메모리 구성 중 어느 쪽이든 MPI2와 MPI3 핀은 외부에서 접근할 수 없게 되어 GPIO는 58개만 남습니다. (1) MPI2의 PSRAM 1개(단독 또는 MPI1의 PSRAM 1개와 함께), 또는 (2) MPI3의 NOR 플래시. `SF32LB57GVD776`은 (2)의 경우로, 두 번째 `7`이 MPI3의 내부 부품을 나타내므로 GPIO는 58개만 사용할 수 있습니다. 그 밖의 모든 구성에서는 MPI3와 연결된 BGA112 I/O 6개를 MPI3용으로, 또는 풀업이나 풀다운으로 구성하는 GP 정적 출력용으로 사용할 수 있으며, 제약 없는 GPIO는 아닙니다. 따라서 `SF32LB57ZVN7N6`의 `58 + 6` 표기는 사용 가능한 GPIO 58개에 MPI3 또는 정적 출력용 핀 6개를 더한 것을 의미하며, 자유롭게 할당할 수 있는 GPIO 64개가 아닙니다. 이 제한은 QFN68 또는 QFN80 패키지에는 적용되지 않으며, 이 패키지들은 공칭 GPIO 수만 노출하고 추가적인 MPI3 또는 정적 출력 옵션이 없습니다.

[^3]: 패키지 치수와 두께는 SiFli SF32LB57x 데이터시트(DS5701 및 DS5702, V0.2.1)의 주문 표와 패키지 도면을 따랐습니다. QFN68(7 × 7 mm, 도면 0.9 mm 또는 1.1 mm), QFN80(8 × 8 mm, 도면 0.9 mm 또는 1.1 mm), BGA112(5.4 × 4.4 mm, 0.98 mm)입니다. 나열된 부품 중 1.1 mm QFN68을 사용하는 것은 SF32LB573UB776뿐이며, 주문 표에 SF32LB57ZVN7N6는 없으므로 이 부품의 BGA112 두께는 유일한 BGA112 도면에서 가져왔습니다. SiFli 하드웨어 설계 가이드에는 데이터시트에 나오지 않는 1.03 mm BGA112 옵션도 추가로 제시되어 있습니다. SF32LB57x 전용 부품 번호 체계 다이어그램은 U를 QFN68, Y를 QFN80, V를 BGA112에 대응시키며, Y 대응을 다른 SF32 제품군에 적용할 수 있다고 가정해서는 안 됩니다. 실제 부품 번호의 두께와 패키지 도면은 SiFli에 확인하십시오.
[^4]: 배터리 전원 시리즈에 대해 SiFli의 SF32LB57x 데이터시트(DS5701)는 VBAT와 VCC를 3.0–4.7 V로, 파워온 전압을 3.5 V ±10 %로 규정합니다. SiFli의 하드웨어 설계 가이드는 이보다 좁은 3.45–4.7 V 입력을 제시합니다(QFN68 Table 2-1-1, QFN80 Table 2-1-3, BGA112 Table 2-1-5). 두 문서가 서로 다르므로 해당하는 입력 핀과 한계는 실제 부품의 데이터시트에서 확인하십시오.
[^5]: I/O 전압 항목은 지원되는 I/O 도메인을 요약한 것이며, 모든 핀이 두 전압 중 어느 쪽이든 사용할 수 있다는 뜻은 아닙니다. VDDIOA는 별도로 공급되는 경우 GPIO에 전원을 공급합니다. VDDIOSB는 있는 경우 SiP 메모리 I/O 레일이며, SiFli의 가이드는 코패키지 PSRAM에 1.8 V, NOR 플래시에 3.3 V를 규정합니다. QFN68 3.3 V 시리즈의 Table 2-1-2는 VDDIOA를 3.3 V로만 규정합니다. 각 핀과 도메인은 패키지 가이드와 실제 부품의 데이터시트에서 확인하십시오.

## 애플리케이션 { #applications }

**SF32LB57x는** 저전력 MCU 플랫폼에서 그래픽, Bluetooth 오디오, 카메라 입력, 외부 스토리지, 상시 센싱이 필요한 소형 연결형 제품에 **적합합니다.** 예는 다음과 같습니다.

- 웨어러블 스마트워치 및 피트니스 밴드
- 스마트 HMI 디바이스
- E-paper 스마트 디바이스
- 중소형 스마트 홈 가전
- 휴대용 녹음 및 오디오 제품
- 웨어러블 의료 기기 및 피트니스 장비
- 산업용 디스플레이, 센싱, 모니터링, 계측 제품
- 카메라를 지원하는 웨어러블 또는 핸드헬드 디바이스
- 디스플레이 중심의 소형 단말기 및 제어 패널
- 자동차 센터 콘솔 컨트롤러, 무선 자동차 키, 웨어러블 자동차 리모컨
- 스마트 도어락
- Bluetooth 무전기 및 인터컴 제품
- 전자 액자
- Bluetooth 메시 및 저전력 센서 허브 네트워크

설계에 다음 기능 중 하나 이상이 필요하면 특히 적합합니다.

- UI/애플리케이션 작업과 저전력 백그라운드 작업을 위한 240 MHz 고성능 코어 2개와 24 MHz 고효율 코어 1개
- 실시간 회전, 스케일링, 투영, 미러링, 알파 블렌딩을 지원하는 ePicasso 3.0 그래픽 가속
- eZip/eZip-A, JPEG, MJPEG 에셋을 모두 CPU 부하가 큰 디코드 경로에 통과시키지 않고 처리하는 eZip 3.0 압축 해제
- 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, 8/16비트 EPD에 걸친 LCD 인터페이스
- DVP 또는 SPI/Dual-SPI/Quad-SPI를 통한 DCMI 카메라 입력
- BLE Audio와 LE Long Range를 포함한 듀얼 모드 Bluetooth 6.3(BR/EDR 및 BLE) 연결
- 재생, 녹음, Bluetooth 통화를 위한 고음질 24비트 오디오 ADC/DAC 리소스
- SiP OPI-PSRAM / QSPI-NOR와 외부 QSPI-NOR/NAND, QPI-PSRAM, SD, SDIO 또는 eMMC 스토리지 옵션
- 커스텀 주변 장치 작업, 결정적 IO 타이밍, 빠른 트리거 응답, 낮은 오버헤드의 센서 또는 인터페이스 자동화를 위한 PTM 오프로드

Bluetooth 6.3은 SF32LB57x 데이터시트(V0.2.1)를 따른 것이며, v0.4 제품 개요서에는 아직 이전 리비전이 표시되어 있습니다. 선택 기능은 실제 주문할 부품에 대한 최신 SiFli 문서에서 확인하십시오.

## 개발 리소스 { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[제품 개요서][Product Brief]__
- :fontawesome-solid-file-pdf: __[데이터시트][Datasheet]__
- :fontawesome-solid-file-pdf: __[사용자 설명서][User Manual]__
- :fontawesome-solid-file-lines: __[원본 설계 가이드(wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[하드웨어 설계 가이드(μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli 승인 업체 목록][SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[샘플 구매][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[개발 키트 구매][Buy Dev Kits]__

</div>

---

## 기능 및 사양 { #features-and-specs }

### 연산 및 메모리 { #compute-and-memory }

- 최대 240 MHz의 Arm Cortex-M33 STAR-MC1 코어 2개로 구성된 고성능 시스템
- 최대 24 MHz의 Arm Cortex-M33 STAR-MC1 고효율 코어 1개로 구성된 저전력 시스템
- 고성능 코어 2개 합산 1968 CoreMark / 740 DMIPS
- HCPU 캐시: 32 KB 2-way 명령어 캐시와 16 KB 4-way 데이터 캐시
- XIP 및 애플리케이션 가속을 위한 ACPU 명령어/데이터 캐시 리소스
- 512 KB HPSYS 리텐션 SRAM + 80 KB LPSYS 리텐션 SRAM, 온칩 SRAM 총 592 KB
- HPSYS SRAM 주소 공간과 공유되는 128 KB 제로 웨이트 사이클 D-TCM
- 단정밀도 FPU 및 MPU 지원
- 링크드 리스트 모드를 지원하는 GPDMA

### PTM 병렬 태스크 머신 { #ptm-peripheral-task-machine }

- CPU가 계속 서비스하는 대신 하드웨어 타이밍으로 실행하는 편이 유리한 커스텀 주변 장치 작업을 위한 4코어 Parallel Task Machine
- 버스 읽기/쓰기, 데이터 연산, 조건 분기, IO 읽기/쓰기, 이벤트 대기, 고정 지연을 위한 간결한 커스텀 명령어 세트
- PTM TCM에서 실행할 때 사이클 단위 타이밍 제어가 가능하여 결정적 IO 시퀀싱에 적합
- 각 PTM 코어는 최대 16개의 IO 채널을 처리할 수 있으며, 커스텀 통신 인터페이스를 위한 FIFO/DMA 지원
- PTM 코어는 AHB 버스 메모리와 주변 장치 레지스터에 접근하고, CPU로 인터럽트를 생성하며, 내부 이벤트 알림을 통해 서로 조정할 수 있음
- 커스텀 인터페이스 프로토콜, 커스텀 PWM, 일괄 메모리/데이터 연산, 멀티 모듈 스케줄링, 자동 센서 수집에 실용적으로 적합

### 무선 연결 { #wireless-connectivity }

- 듀얼 모드 Bluetooth 무선
- BLE Audio 및 LE Long Range 지원
- 수신 감도: BLE 1 Mbps에서 -100 dBm, BLE 125 kbps에서 -107.5 dBm, BR에서 -96 dBm, EDR2에서 -95 dBm
- 최대 송신 전력: EDR2/EDR3는 13 dBm, BR/BLE는 17 dBm
- BR 수신 피크 전류는 3.8 V에서 최저 2.0 mA

### 그래픽, 디스플레이, 카메라 { #graphics-display-and-camera }

- ePicasso 3.0 2D/2.5D 그래픽 엔진
- 하드웨어 가속 회전, 스케일링, 투영, 미러링, 알파 블렌딩, 멀티 레이어 합성
- 최대 그래픽 해상도 2048 × 2048
- RGB888, RGB565, aRGB8888, aRGB8565를 포함한 RGB 포맷
- L8/L4, G8/G4/G2, A8/A4/A2, YUV를 포함한 추가 포맷
- 무손실 eZip/eZip-A 이미지 및 애니메이션 에셋용 eZip 3.0 압축 해제 엔진
- JPEG 이미지 및 MJPEG 애니메이션 압축 해제
- 중간 프레임 버퍼 없이 연동되는 eZip과 ePicasso
- 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, 8/16비트 EPD 디스플레이 인터페이스를 지원하는 전용 LCD 컨트롤러
- 디스플레이 서브시스템이 지원하는 저전력 상시 표시(always-on display) 사용 사례
- DVP 및 SPI/Dual-SPI/Quad-SPI 카메라 인터페이스를 지원하는 DCMI 카메라 컨트롤러

### 오디오 및 아날로그 { #audio-and-analog }

- SNR 109 dB의 고음질 24비트 오디오 DAC 1개
- SNR 97 dB의 고음질 24비트 오디오 ADC 2개
- 일반적인 통화 및 음악 샘플링 레이트를 포함하여 8 kHz~96 kHz의 오디오 샘플링 레이트 지원
- 출력 범위 1.4 V~2.8 V, 최대 출력 전류 2 mA의 Micbias LDO
- 오디오 재생, 녹음, Bluetooth 통화, 헤드셋 연결 MP3 재생 설계 지원
- 12채널 12비트 범용 SAR ADC 1개
- 온칩 온도 센서 1개

### 스토리지 및 보안 { #storage-and-security }

- 최대 156 MHz의 SiP OPI-PSRAM 지원
- 최대 104 MHz의 SiP NOR 플래시 지원
- 주소 매핑 XIP 동작을 지원하며 NOR, NAND, QPI-PSRAM용인 MPI(QSPI) 인터페이스 3개
- SD 3.0, SDIO 3.0, eMMC를 지원하는 SD/SDIO 인터페이스 2개
- 온더플라이 플래시 복호화 지원
- AES, HASH, CRC 가속기
- 진성 난수 생성기(TRNG)
- eShield 보안 아키텍처
- PSA Certified Level 1

### 주변 장치 및 I/O { #peripherals-and-ios }

- 패키지와 주문 부품에 따라 최대 58개의 GPIO
- FreeIO를 통한 유연한 GPIO 할당
- UART 3개
- I2C 4개
- SPI 2개
- I2S 2개
- PDM 인터페이스 2개(인터페이스당 디지털 마이크 최대 2개)
- USB 2.0 Full-Speed 1개
- CAN 2개
- 이벤트 기반 주변 장치 워크플로와 멀티코어 조정을 위한 PTM 이벤트 통합
- 16비트 GPTIM 2개
- 32비트 BTIM 4개
- 32비트 ATIM 2개
- 24비트 LPTIM 2개
- PWM 1개
- RTC 1개
- 24비트 WDT 2개와 독립 WDT 1개

### 전원 관리 { #power-management }

- 통합 고효율 Buck 컨버터와 저전력 LDO
- 각각 최대 150 mA의 외부 3.3 V 전원 출력 2개
- Hibernate 전류: 3.8 V에서 2.8 µA(배터리 전원 기준 구성) 또는 3.3 V에서 1 µA(외부 전원 공급 기준 구성)
- 배터리 전원 기준 구성에 통합된 구성 가능한 리니어 Li-ion 배터리 충전기(충전 전류 최대 400 mA)
- 충전기 만충 전압 범위 4.2 V~4.45 V
- 배터리/시스템 입력 범위[^4]: 3.0 V~4.7 V
- VBUS 범위: 4.5 V~5.5 V
- 동작 온도 범위: −40~+85 °C

## 제품군 변형 { #family-variants }

SF32LB57x에는 배터리 전원 변형(variant)과 외부 레귤레이션 3.3 V 시스템용 변형이 있습니다. 패키지 도면, 전원 핀, 사용 가능한 GPIO 수, 내장 메모리, 보드 제약이 제품군 내에서 서로 다르므로 회로도를 작성하기 전에 정확한 부품 번호를 선택하십시오.

아래의 부품 번호는 SiFli SF32LB57x 데이터시트(DS5701 및 DS5702, V0.2.1, 둘 다 예비 초안)의 주문 표에서 가져온 것이며, 해당 표에 없는 `SF32LB57ZVN7N6`만 예외입니다. 설계에 적용하기 전에 정확한 주문 코드, 코패키지 메모리 구성, 전기적 한계, 패키지 도면을 SiFli의 최신 부품별 문서와 대조하여 확인하십시오.

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
| 두께[^3] | 0.9 mm | 0.9 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| 피치 | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| 코패키지 메모리 | 4 MB OPI-PSRAM + 16 MB QSPI-NOR | 4 MB OPI-PSRAM + 16 MB+8 MB QSPI-NOR(듀얼 다이) | 4 MB OPI-PSRAM + 16 MB×2 QSPI-NOR(듀얼 다이) | 8 MB OPI-PSRAM, QSPI-NOR 없음 | 16 MB OPI-PSRAM, QSPI-NOR 없음 | PSRAM 없음, 1 MB QSPI-NOR만 있음 |
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
| 두께[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 0.98 mm |
| 피치 | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6(MPI3 또는 정적 출력)[^2] | 58[^2] |
| 코패키지 메모리 | 8 MB(2×4 MB 듀얼 다이) OPI-PSRAM, QSPI-NOR 없음 | 16 MB OPI-PSRAM + 16 MB QSPI-NOR | PSRAM 없음 + 16 MB QSPI-NOR | 16 MB OPI-PSRAM + 32 MB(2×16 MB 듀얼 다이) QSPI-NOR |
| 전원 공급 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O 전압[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 온도 | −40~85 °C | −40~85 °C | −40~85 °C | −40~85 °C |

</div>

SF32LB57x에서 패키지 선택은 단순한 PCB 비용 문제가 아닙니다. 디스플레이 인터페이스 사용 가능 여부, 외부 스토리지 라우팅, GPIO 예산, 디버그/플래싱 핀 유지, 팬아웃 난이도에 영향을 주므로 패키지 선택은 전원 아키텍처와 함께 확정하는 것이 좋습니다. BOM과 회로도의 기준으로는 패키지 이름만이 아니라 주문 부품 번호를 사용하십시오. 메모리 접미사에 따라 SiP 스토리지 구성이 바뀌며, 이는 부트 미디어에 대한 가정, 전원 시퀀싱, 외부 스토리지 요구 사항에 영향을 줄 수 있습니다.

## 통합 경로 { #integration-path }

SF32LB57x 후보 목록을 검증된 설계로 만들려면 다음 순서를 따르십시오.

1. **펌웨어 경로 검증.** [SiFli SDK 시작 가이드](../../getting-started/sifli/getting-started-sifli-sdk.md)로 시작한 다음, [SiFli SDK 워크플로](../../develop/platforms/sifli-sdk/overview.md)와 [예제](../../develop/examples/index.md)를 사용해 의도한 그래픽, 오디오, 카메라, Bluetooth, 스토리지 기능을 검증하십시오.
2. **평가 하드웨어 계획.** μForge.io는 현재 SF32LB57 전용 모듈이나 개발 보드를 카탈로그에 올려 두지 않았습니다. [SF32 제품 선택기](../product-selector.md)로 가장 가까운 평가 플랫폼을 확인하되, 그 결과를 57x 설계에 적용하기 전에 패키지, 전원, 메모리, 인터페이스 커버리지를 검증하십시오.
3. **하드웨어 설계 및 검토.** 회로도 또는 레이아웃을 릴리스하기 전에 로컬 [SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)와 그 [고객 설계 자체 점검](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check), 그리고 [양산 설계](../../hardware/design-for-production.md) 검토 절차를 사용하십시오. 제품군 전용 μForge.io 체크리스트는 현재 게시되어 있지 않습니다.
4. **주요 정보 출처 확인.** 실제 주문할 부품과 패키지를 SiFli [데이터시트][Datasheet], [사용자 매뉴얼][User Manual], [원본 설계 가이드][Original Design Guide (wiki.sifli.com)]와 대조하여 확인하고, 핵심 BOM 선택을 관리할 때는 [SiFli 승인 업체 목록][SiFli Approved Vendor List]을 사용하십시오.

<!-- uf-faq:start -->
## 자주 묻는 질문 { #frequently-asked-questions }

**SF32LB57x의 주요 사양은 무엇인가요?**
SF32LB57x는 애플리케이션 CPU(2× Cortex-M33 @240 MHz)와 저전력 코어(Cortex-M33 @24 MHz, 전용 Bluetooth 컨트롤러), 내장 SRAM 592 KB, 듀얼 모드 Bluetooth(클래식 + BLE)를 갖췄습니다. 그래픽: ePicasso 3.0 + eZip 3.0. 패키지: QFN68 / QFN80 / BGA112(7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. 제품군 수준의 값이므로 정확한 부품 번호의 데이터시트를 확인하세요.

**SF32LB57x는 어떤 디스플레이 인터페이스를 지원하나요?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. 지원 여부는 부품 번호와 패키지에 따라 다릅니다.

**SF32LB57x는 패키지 내 메모리를 얼마나 제공하나요?**
부품 번호에 따라 패키지 내 PSRAM 최대 48 MB, 패키지 내 NOR Flash 최대 32 MB를 제공합니다.

**SF32LB57x에는 어떤 공급 전압이 필요한가요?**
변형에 따라 3.0–4.7 V or 2.97–3.63 V. 정확한 범위는 데이터시트에서 확인하세요.

**SF32LB57x로 하드웨어 설계를 시작하려면 어떻게 하나요?**
먼저 [SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)에서 회로도, 전원, 클럭/RF, PCB 레이아웃 지침을 확인하고, 보드 릴리스 전에 회로도와 레이아웃 체크리스트를 사용하세요.
<!-- uf-faq:end -->

## 관련 제품 { #related-products }

### 하드웨어 설계 기준 구성 { #hardware-design-baseline }

[SF32LB57x 하드웨어 설계 가이드](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), 공식 하드웨어 애플리케이션 노트, 데이터시트, 승인 업체 목록을 설계 기준으로 사용하십시오. 회로도 또는 PCB를 릴리스하기 전에 전원 아키텍처, 패키지 팬아웃, 디스플레이, 스토리지, 오디오, 카메라, RF, 디버그/플래싱 계획을 확인하십시오.

### 개발 키트 { #development-kits }

공식 레퍼런스 회로도, 최소 시스템 가이드, 체크리스트 자료를 사용해 전원, 클럭, RF, 디스플레이, 스토리지, 오디오, 카메라, 양산 접근 방법을 계획하십시오.

### 레퍼런스 제품 { #reference-products }

일반적인 SF32LB57x 최종 제품으로는 웨어러블 워치와 밴드, 스마트 HMI 디바이스, e-paper 제품, 중소형 스마트 가전, 휴대용 녹음/오디오 디바이스, 스마트 홈 패널, 소형 디스플레이 단말기, 카메라를 지원하는 Bluetooth 제품이 있습니다.
