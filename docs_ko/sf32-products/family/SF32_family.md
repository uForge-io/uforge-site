---
icon: lucide/cpu
description: "SF32LB5xx 제품군 개요: 이기종 Cortex-M33 코어, Bluetooth, ePicasso 그래픽, 엣지 AI를 소개하고 비교표와 빠른 칩 선택 가이드를 제공합니다."
tags:
  - 하드웨어
  - 칩
---

# SF32 제품군

## 소개

**SF32** 제품군, 특히 **SF32LB5xx** 시리즈는 SiFli Technologies가 배터리로 구동되는 AIoT 및 웨어러블 애플리케이션을 위해 개발한 고집적 초저전력 32비트 마이크로컨트롤러 포트폴리오입니다.

**SF32** 디바이스는 기존 마이크로컨트롤러와 애플리케이션 프로세서 사이의 간극을 메우도록 설계되었으며, 저전력 센서 처리, 무선 연결, 그래픽 가속, 멀티미디어 처리, 대용량 통합 메모리를 소형 System-in-Package(SiP) 아키텍처로 결합합니다. 이 제품군은 스마트워치, 피트니스 트래커, 스마트 디스플레이, 휴대용 의료 기기, 엣지 처리 기능을 갖춘 커넥티드 액세서리와 같은 제품을 위해 설계되었습니다.

**LB**(Low-Power Bluetooth) 시리즈는 최초의 SF32 제품 라인입니다. 애플리케이션 중심의 추가 시리즈가 계획되어 있습니다.

## 하드웨어 워크플로 { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **제품 계획하기**

    제품 요구 사항과 디바이스 선택부터 보드 검증과 양산 준비까지 하나의 경로를 따라갑니다.

    [제품 계획하기 :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **SF32 제품 선택기**

    SF32 제품군을 비교하고, 칩이나 모듈을 선택하며, 초기 검증에 적합한 개발 보드를 식별합니다.

    [후보 목록 만들기 :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **양산 설계**

    선택한 부품에서 회로도, 레이아웃, BOM, CAD, 체크리스트, 브링업 증빙으로 이어집니다.

    [양산 작업 계획하기 :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## 주요 기능

1. **이기종 멀티 코어 아키텍처**

    SF32LB 마이크로컨트롤러는 Arm Cortex-M33 STAR-MC1 기반의 이기종 멀티 코어 아키텍처를 채택하여 고성능 애플리케이션 처리와 초저전력 백그라운드 동작의 균형을 맞춥니다. 디바이스에 따라 이 아키텍처는 하나 이상의 애플리케이션 프로세서와 함께 Bluetooth 연결, 센서 처리, 상시 동작(always-on) 시스템 기능을 담당하는 전용 저전력 프로세서를 포함할 수 있습니다.

    !!! info "STAR-MC1 프로세서"
        STAR-MC1은 Arm China의 구성 가능한 Armv8-M Mainline CPU IP이며, 호환되는 SF32 디바이스에서 Cortex-M33급 애플리케이션 프로세서로 사용됩니다. Cortex-M33 대상 펌웨어, 미들웨어, RTOS 포트, 툴은 디바이스별 일반적인 통합 작업을 거치면 계속 활용할 수 있습니다. CU, SP, SE 구성은 주로 캐시, TCM, XIPU, TrustZone 기능에서 차이가 나며, Arm Custom Instructions/CDE와 코프로세서 인터페이스는 선택 기능입니다. SiFli 문서는 문맥에 따라 ***Arm Cortex-M33 STAR-MC1*** 또는 ***Arm Cortex-M33***이라는 표기를 사용할 수 있습니다.

        구성, TCM, 캐시, CDE, 코프로세서, 대표 성능 측정에 관한 디바이스별 안내는 [STAR-MC1 아키텍처 심층 분석](../../learn/architecture/star-mc1.md)를 참조하십시오.


2. **초저전력 무선 연결**

    SF32LB 시리즈는 Bluetooth Low Energy(BLE) 또는 듀얼 모드 Bluetooth(BT/BLE) 연결을 칩에 직접 통합합니다.

    지원되는 Bluetooth 모드와 RF 성능은 디바이스마다 다릅니다. 정확한 부품 번호에 대해서는 데이터시트와 검증된 레퍼런스 디자인에서 지원 모드, 송신 출력 설정, 수신 감도, 소비 전류를 확인하십시오. 제품군 수준의 포지셔닝은 이러한 수치를 대신할 수 없습니다.

3. **하드웨어 가속 그래픽 및 디스플레이 엔진**

    모든 SF32LB 마이크로컨트롤러는 SiFli가 자체 개발한 2.5D 그래픽 엔진 ePicasso와 별도의 디스플레이 컨트롤러를 통합합니다.

    하드웨어 가속은 다음과 같은 일반적인 그래픽 작업에서 CPU 부하를 크게 줄여 줍니다.

    * 알파 블렌딩
    * 이미지 스케일링
    * 회전 및 변환
    * 레이어 합성
    * 사용자 인터페이스 렌더링

    SF32LB 제품군 전체에서 디스플레이 인터페이스와 디스플레이 유형은 다음과 같습니다. 지원 여부는 디바이스마다 다르므로, 모든 부품이 나열된 항목을 전부 지원한다고 가정하지 말고 정확한 SKU를 확인하십시오.

    * SPI / DSPI / QSPI
    * 8080 MCU 인터페이스
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (Memory-in-Pixel 디스플레이용)

    필요한 디스플레이 인터페이스를 갖춘 디바이스에서는 LVGL과 같은 그래픽 프레임워크가 하드웨어 가속 엔진을 활용하여 TFT, AMOLED, e-Paper(EPD), Memory-in-Pixel(MiP) 디스플레이에서 부드럽고 반응성이 좋은 인터페이스를 구현할 수 있습니다.

4. **엣지 AI 및 신경망 가속**

    일부 SF32 디바이스는 머신러닝, 멀티미디어 처리, 센서 퓨전 워크로드를 위한 전용 하드웨어 가속기를 통합합니다.

    제공되는 기능은 다음을 포함할 수 있습니다.

    * 신경망 가속
    * 오디오 처리
    * 음성 인식
    * 카메라 인터페이스(DVP 및 SPI)
    * 센서 퓨전 및 생체 인식 알고리즘

    이러한 기능은 소비 전력과 클라우드 의존도를 최소화하면서 디바이스에서 지연 시간이 짧은 AI 추론을 가능하게 합니다.

5. **고밀도 System-in-Package(SiP) 메모리**

    그래픽 집약적이고 AI 기능을 갖춘 애플리케이션을 지원하기 위해 SF32 디바이스는 외부 메모리에서 고성능으로 실행하도록 최적화된 명령어 및 데이터 캐시 아키텍처를 통합합니다.

    사용 가능한 인패키지 메모리는 다음을 포함할 수 있습니다.

    * 최대 256 Mb NOR 플래시
    * 최대 512 Mb PSRAM

    일부 부품 번호만 코패키지 NOR 플래시 또는 PSRAM을 포함합니다. SiP 구성은 별도로 실장하는 메모리 디바이스의 수와 그에 따른 라우팅을 줄여 줄 수 있지만, 메모리 유형, 용량, 인터페이스, 전원, 외부로 사용할 수 있는 핀은 정확한 SKU에 따라 달라집니다. 보드를 확정하기 전에 해당 SKU의 데이터시트와 패키지 핀 배치를 확인하십시오.

## SF32 마이크로컨트롤러 비교 { #sf32-microcontroller-comparison }

<div align="center"><em>SF32 마이크로컨트롤러 비교</em></div>

아래 값은 제품군 수준의 성능을 요약한 것이며 모든 SKU가 보장하는 성능이 아닙니다. 인터페이스 지원 여부와 리소스 개수는 정확한 부품 번호, 패키지 또는 구성에 따라 달라질 수 있으므로 선택한 부품의 데이터시트를 확인하십시오.

<div align="center" markdown>

| 기능 | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| 포지셔닝 | 엔트리급 | BLE 전용 주력 | 고급 | 향상된 컴퓨팅 | 플래그십 |
| 애플리케이션 CPU | Cortex-M33 @240MHz | Cortex-M33 @240MHz | Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz |
| 저전력 CPU | Cortex-M33 @24/48 MHz, 전용 Bluetooth 컨트롤러 | Cortex-M33 @48 MHz, 사용자 프로그래밍 가능 | Cortex-M33 @48/96 MHz, 사용자 프로그래밍 가능 | Cortex-M33 @24 MHz, 전용 Bluetooth 컨트롤러 | Cortex-M33 @48/96 MHz, 사용자 프로그래밍 가능 |
| 내부 SRAM | 576 KB | 1,312 KB | 960 KB | 592 KB | 3.7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| 그래픽 가속기 | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + 벡터 그래픽<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| 디스플레이 지원 | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| 오디오 ADC | 1x | n/a | 1x | 2x | 2x |
| 오디오 DAC | 1x | n/a | 1x | 1x | 2x |
| PDM 오디오 인터페이스 | 1x | 1–2x* | 2x | 2x | 2x |
| I²S 오디오 인터페이스 | 1x | 1–2x* | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | n/a | n/a | 1x | 2x | 2x |
| 인패키지 PSRAM | 최대 16 MB | 최대 16 MB + 2 MB | 최대 16 MB | 최대 32 MB | 최대 32 MB + 32 MB |
| 인패키지 NOR 플래시 | 최대 4 MB | 최대 8 MB | 최대 1 MB | 최대 32 MB | 최대 8 MB |
| GPIO 수 | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58; BGA112는 최대 6개의 추가 I/O* | 154 |
| 패키지 종류 | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| 패키지 풋프린트 (L × W) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6.5 × 6.1 mm | QFN68: 7 × 7 mm<br> QFN80: 8 × 8 mm<br>BGA: 5.4 × 4.4 mm | 8.5 × 6.5 mm |
| 전원 | 3.2–4.7 V (520/3/5/7)<br>2.97–3.63 V (52B/E/G/J)<br>1.8 V (52D) | 1.71–3.63 V | 1.71–3.63 V | 3.2–4.7 V<br>2.97–3.63 V | 1.71–3.63 V |

</div>

**SF32LB55x 변형(variant) 참고:** 오디오 인터페이스 개수는 주문 코드에 따라 달라집니다. SF32LB551/553/555 변형은 PDM과 I²S 인터페이스가 각각 1개이고, SF32LB557VD3A6은 각각 2개입니다. 최신 [SF32LB55x 데이터시트(V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)의 패키지 요약은 BGA169의 GPIO를 119개(HCPU 71개 + LCPU 48개)로 기재하지만, 같은 데이터시트의 상세 제품 시리즈 표는 SF32LB557에 대해 HCPU 71개 + LCPU 42개 = 113개로 기재합니다. 현재 [SiFli Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)도 SF32LB557VD3A6에 대해 71 + 42 = 113으로 기재합니다. SiFli는 데이터시트 내의 이 불일치를 설명하지 않으며, 이 비교는 부품별 GPIO 113개 수치를 사용합니다. 핀을 배정하기 전에 정확한 SKU를 해당 데이터시트와 핀 표에서 확인하십시오. 각 PDM 인터페이스에는 디지털 마이크를 최대 2개 연결할 수 있으며, 인터페이스 개수가 곧 마이크 개수는 아닙니다.

**SF32LB55x 인패키지 NOR 참고:** 제품군 최대 8 MB에는 별도로 문서화된 SS6600A8 구성이 포함됩니다. 이는 4 MB QSPI-NOR 디바이스 2개를 하나의 8 MB OSPI-NOR 디바이스로 구성한 것입니다. SF32LB55x에 나열된 SF32 접두사 주문 코드는 최대 4 MB의 인패키지 NOR 플래시를 갖추고 있습니다. 정확한 모델을 확인하십시오.

**SF32LB57x BGA112 참고:** 이 참고는 BGA112에만 적용됩니다. SF32LB57x에는 내부 MPI1, MPI2, MPI3가 있으며, 부품 번호에서 이들의 위치는 [SF32 명명 규칙](SF32_namingrule.md)에 설명되어 있습니다. 다음 코패키지 메모리 구성 중 어느 경우에든 MPI2 및 MPI3 핀은 외부에서 접근할 수 없어 GPIO는 58개로 고정됩니다. (1) 내부 MPI1과 MPI2에 각각 PSRAM 1개; (2) 내부 MPI2에 256 Mb PSRAM 1개; (3) 내부 MPI3에 NOR 플래시 1개. `SF32LB57GVD776`은 (3)에 해당합니다. 끝의 `776` 코드에서 두 번째 `7`은 MPI3에 내부 디바이스가 있음을 나타내므로 사용할 수 있는 GPIO는 58개뿐입니다. 다른 BGA112 구성에서는 패키지의 추가 I/O 6개를 MPI3 용도로 사용하거나 풀업 또는 풀다운으로 구성한 GP 정적 출력으로 사용할 수 있으며, 제한 없이 사용할 수 있는 GPIO는 아닙니다. 예를 들어 `SF32LB57ZVN7N6`의 `58 + 6` 표기는 사용 가능한 GPIO 58개와 MPI3 또는 정적 출력에 사용할 수 있는 핀 6개를 의미합니다. QFN68과 QFN80은 이 BGA112 제약의 대상이 아니며, 명시된 GPIO 수만 제공하고 추가 MPI3 또는 정적 출력 용도는 없습니다. 정확한 SKU는 SF32LB57x 제품 페이지와 해당 데이터시트를 참조하십시오.

**SF32LB58x GPIO 수 정정:** [DS5801 V1.8.3 데이터시트](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf)와 SiFli의 제품군 비교는 총 GPIO를 154개(HPSYS: 94개, LPSYS: 60개)로 명시합니다. 별도의 [Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)는 HCPU: 94개, LCPU: 66개로 기재하는데, 합계가 160개로 데이터시트 총계와 충돌합니다. 이 비교는 데이터시트를 따릅니다. 핀을 배정하기 전에 정확한 SKU의 패키지 핀 표에서 사용 가능한 핀을 확인하십시오.

## 적합한 SF32 선택 { #choosing-the-right-sf32 }

SF32LB5xx 제품군은 비용에 최적화된 Bluetooth 제품부터 고급 그래픽과 AI 기능을 갖춘 시스템까지 배터리로 구동되는 커넥티드 디바이스를 폭넓게 다룹니다. 제품군 구성원은 SDK 기반을 공유하지만, 프로세서 구성, 주변 장치, 메모리 맵, 패키지, 핀 배정은 다를 수 있습니다. 포팅하려면 시작 코드, 드라이버, 링커 또는 파티션 설정, 핀 멀티플렉싱, SDK 구성을 변경해야 할 수 있으므로, 대상 디바이스에서 결과를 검증하십시오.

디바이스를 선택할 때는 다음과 같은 주요 요구 사항을 고려하십시오.

* Bluetooth 연결(BLE 또는 듀얼 모드 BT/BLE)
* 디스플레이 인터페이스와 해상도
* 오디오 및 멀티미디어 기능
* 메모리 용량
* GPIO 요구 사항
* 그래픽 성능
* AI 및 센서 처리 워크로드
* 소비 전력 목표

<div align="center"><em>빠른 선택 가이드</em></div>

<div align="center" markdown>

| 선택 ... | 애플리케이션에 필요한 사항 ... | 대표 애플리케이션 |
| : ---      | : ---  | : --- |
| SF32LB52x  | • 듀얼 모드 Bluetooth(BT/BLE)<br> • 통합 오디오 ADC 및 DAC<br> • 통합 Li-ion 배터리 충전<br> • 최대 45개 GPIO<br> • 최대 512 × 512 디스플레이 해상도<br> • 소형이며 비용 효율적인 솔루션<br> | • 보급형 스마트워치 및 피트니스 밴드<br> • Bluetooth 모듈 및 무선 어댑터<br> • Bluetooth 오디오 액세서리<br> • 스마트 센서 및 웨어러블 디바이스<br> • 전자 가격표 및 스마트 배지<br> • 휴대용 라벨 프린터<br> • eBike 및 eScooter 디스플레이<br> • 기본 LVGL 기반 HMI 디바이스 |
| SF32LB55x  | • Bluetooth Low Energy(BLE)<br> • MIPI DSI 커맨드 모드 디스플레이<br>• 센서 처리 알고리즘을 위한 대용량 SRAM<br> • 45개를 초과하는 GPIO<br> • 확장된 저전력 처리 기능 | • 피트니스 밴드 및 활동 트래커<br> • 스포츠 및 사이클링 컴퓨터<br> • 센서가 풍부한 웨어러블 디바이스<br> • 건강 모니터링 디바이스<br> • 배터리 구동 BLE 주변 장치 |
| SF32LB56x  | • 듀얼 모드 Bluetooth(BT/BLE)<br> • RGB/DPI 디스플레이 인터페이스<br> • 통합 오디오 ADC 및 DAC<br> • 최대 1024 × 600 디스플레이 해상도<br> • SDIO를 통한 외부 Wi-Fi 연결<br> • 늘어난 GPIO 용량 | •     고급 사용자 인터페이스를 갖춘 스마트워치<br> • 커넥티드 HMI 시스템<br> • 의료 및 헬스케어 기기<br> • 산업용 핸드헬드 기기<br> • 휴대용 계측기<br> • 고급 eBike 및 eScooter 디스플레이|
| SF32LB57x | • 듀얼 모드 Bluetooth(BT/BLE), BLE Audio, LE Long Range<br> • RGB 디스플레이 인터페이스를 갖춘 ePicasso 3.0/eZip 3.0 그래픽<br> • DCMI 카메라 입력과 통합 고음질 오디오 ADC/DAC<br> • 최대 1024 × 600 디스플레이 해상도<br> • 결정적 I/O 또는 커스텀 주변 장치 타이밍을 위한 PTM 오프로드<br> • 최대 58개의 범용 GPIO; SiP 구성이 허용하는 경우 BGA112는 MPI3용 또는 풀업/풀다운으로 구성한 GP 정적 출력용 I/O도 최대 6개 추가 제공<br> • SD/SDIO/eMMC 스토리지 인터페이스 | • 소형 고급 스마트워치<br> • 디스플레이가 풍부한 HMI 및 e-paper 디바이스<br> • 카메라를 지원하는 Bluetooth 제품<br> • 휴대용 오디오 및 녹음 디바이스<br> • 스마트 홈 제어 패널 |
| SF32LB58x  | • 듀얼 모드 Bluetooth(BT/BLE)<br> • 벡터 그래픽을 포함한 고급 그래픽 렌더링<br> • MIPI DSI 커맨드 모드 또는 비디오 모드 디스플레이<br> • 최대 1280 × 800 디스플레이 해상도<br> • 대용량 메모리 구성<br> • 높은 GPIO 밀도와 개수<br> • SDIO를 통한 외부 Wi-Fi 연결<br> • 엣지 AI 및 머신러닝 워크로드 | • 프리미엄 스마트워치<br> • 스포츠 및 아웃도어 웨어러블 디바이스<br>• 고급 사이클링 컴퓨터<br> • 스마트 디스플레이 및 커넥티드 대시보드<br> • AI 지원 웨어러블 디바이스<br> • 엣지 AI 및 센서 퓨전 시스템|

</div>

## 제품군 전반의 소프트웨어 호환성 { #software-compatibility-across-the-family }

SF32 플랫폼은 공유되는 소프트웨어 및 SDK 기반을 제공합니다. 그러나 프로세서 구성, 주변 장치, 메모리 맵, 패키지, 핀 배정은 다를 수 있습니다. 포팅하려면 시작 코드, 드라이버, 링커 또는 파티션 설정, 핀 멀티플렉싱, SDK 구성을 조정한 다음 대상 하드웨어에서 검증해야 할 수 있습니다.

성능, 메모리, 디스플레이, 연결 요구 사항과 함께 소프트웨어 재사용과 마이그레이션 노력을 평가하십시오. 같은 제품군의 디바이스끼리 핀 호환이 된다거나 펌웨어가 수정 없이 실행된다고 가정하지 마십시오.

## 참고 링크 { #reference-links }

- [SiFli 공식 웹사이트](https://www.sifli.com/)
- [SiFli Wiki](https://wiki.sifli.com/)
- [SiFli 소프트웨어 문서](https://docs.sifli.com/)
- [GitHub의 OpenSiFli](https://github.com/OpenSiFli/)
- [SiFli 공식 Taobao 스토어](https://sifli.taobao.com/)
