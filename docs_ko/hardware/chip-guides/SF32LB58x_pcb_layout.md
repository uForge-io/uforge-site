---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB58x MCU의 PCB 레이아웃 가이드라인: 패키지 풋프린트, 스택업, 팬아웃, 클럭, RF, 오디오, USB, SDIO, DSI, 전원 라우팅 지침입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB58x 하드웨어 설계 가이드 — PCB 레이아웃 가이드라인 { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB58x 하드웨어 설계 가이드의 일부"
    이 페이지는 6절, PCB 레이아웃 가이드라인을 다룹니다. [회로도 설계 가이드라인](SF32LB58x_schematic_design.md)으로 돌아가거나, [PCB 레이아웃 체크리스트](SF32LB58x_pcb_layout_checklist.md)로 계속 진행하거나, [설계 검토 체크리스트 및 참고 자료](SF32LB58x_review_and_reference.md)로 바로 이동하십시오.

## 6. PCB 레이아웃 가이드라인 { #6-pcb-layout-guidelines }

### 6.1. 패키지 풋프린트 설계 { #61-package-footprint-design }

SF32LB58x 시리즈는 크기 8.5 mm x 6.5 mm x 0.94 mm, 볼 피치 0.4 mm, 공칭 볼 직경 0.25 mm인 BGA256 패키지를 사용합니다. 전체 패키지 인증 데이터는 공식 데이터시트를 참조하십시오.

!!! warning "원본의 패키지 높이 값 불일치"
    SiFli 가이드 본문은 패키지 높이를 0.94 mm로 제시하지만, BGA256 도면은 치수 A를 공칭 0.91 mm, 범위 0.84–1.04 mm로 표기합니다. 이 원본 값들은 서로 충돌합니다. 패키지 높이가 기구 클리어런스나 인클로저 적합성에 영향을 주는 경우, SiFli의 확인 없이 한쪽 값을 선택하지 말고 확인된 패키지 사양을 사용하십시오.

![그림 6.1-1: BGA256 패키지 치수](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-1: BGA256 패키지 치수</em></div>

![그림 6.1-2: 패키지 풋프린트 형상](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-2: 패키지 풋프린트 형상</em></div>

![그림 6.1-3: PCB 랜드 패턴 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-3: PCB 랜드 패턴 레퍼런스</em></div>

![그림 6.1-4: 패키지 볼 맵](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-4: 패키지 볼 맵</em></div>

![그림 6.1-5: 패키지 기판 볼 정보](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-5: 패키지 기판 볼 정보</em></div>

### 6.2. PCB 스택업 { #62-pcb-stack-up }

SF32LB58x 시리즈는 단면 또는 양면 실장을 지원합니다. PCB는 반드시 HDI 구조를 사용해야 하며 PTH 보드는 지원되지 않습니다. 6HDI-2 스택업을 권장합니다. 레퍼런스 스택업 그림은 완성 보드 두께를 0.8 mm ±10%(공칭 약 32 mil)로 규정합니다.

![그림 6.2-1: 레퍼런스 스택업 구조](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.2-1: 레퍼런스 스택업 구조</em></div>

### 6.3. 일반 PCB 설계 규칙 { #63-general-pcb-design-rules }

공식 데이터시트의 일반 PCB 설계 규칙 그림(치수 단위 mm)을 참조하십시오. 레퍼런스 규칙은 최소 및 권장 트레이스 폭 0.075 mm와 최대 폭 2 mm, 트레이스·비아·패드·SMD·텍스트·구리 사이의 최소 클리어런스 0.075 mm, 보드 가장자리 클리어런스 0.25 mm, 드릴 간 및 바디 간 간격 0.1 mm를 규정합니다. 최종 규칙은 PCB 제조업체와 확인하십시오.

![그림 6.3-1: 일반 PCB 설계 규칙](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.3-1: 일반 PCB 설계 규칙</em></div>

#### 6.3.1. 블라인드 비아 설계 { #631-blind-via-design }

공식 데이터시트의 블라인드 비아 설계 그림(1-2층 및 1-3층, 치수 단위 mm)을 참조하십시오. 레퍼런스 도금 블라인드 비아는 직경 0.23 mm, 드릴 0.10 mm를 사용합니다.

![그림 6.3-2: 1-2층 블라인드 비아 설계](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.3-2: 1-2층 블라인드 비아 설계</em></div>

![그림 6.3-3: 1-3층 블라인드 비아 설계](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.3-3: 1-3층 블라인드 비아 설계</em></div>

#### 6.3.2. 베리드 비아 설계 { #632-buried-via-design }

공식 데이터시트의 베리드 비아 설계 그림(2-5층, 치수 단위 mm)을 참조하십시오. 레퍼런스 도금 베리드 비아는 직경 0.40 mm, 드릴 0.20 mm를 사용합니다.

![그림 6.3-4: 2-5층 베리드 비아 설계](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.3-4: 2-5층 베리드 비아 설계</em></div>

### 6.4. 트레이스 팬아웃 { #64-trace-fanout }

BGA 볼의 처음 두 열은 최상층에서 팬아웃하고, 나머지 볼은 비아를 통해 내층으로 팬아웃합니다.

![그림 6.4-1: 최상층 팬아웃 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.4-1: 최상층 팬아웃 레퍼런스</em></div>

![그림 6.4-2: 내층 팬아웃 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.4-2: 내층 팬아웃 레퍼런스</em></div>

### 6.5. 클럭 인터페이스 라우팅 { #65-clock-interface-routing }

크리스털은 실드 캔 안쪽에, PCB 보드 가장자리에서 1 mm 넘게 떨어뜨려 배치하고, 크리스털 주파수 편차에 영향을 주지 않도록 열을 내는 부품(PA, 충전, PMU 회로 등)에서 가능한 한 멀리, 가급적 5 mm 넘게 떨어뜨리십시오. 크리스털 금지 구역은 다른 금속이나 부품과 0.25 mm 넘게 떨어뜨리십시오.

48 MHz 크리스털은 최상층에서 길이 3-10 mm, 트레이스 폭 0.075 mm로 라우팅하고, 3차원 실드를 완전하게 적용하며, VBAT, DC/DC, 고속 신호선에서 멀리 떨어뜨리십시오. 48 MHz 크리스털 영역 아래의 최상층과 인접 층에는 다른 라우팅이 없도록 비워 두십시오.

32.768 kHz 크리스털은 최상층에서 길이 ≤10 mm, 트레이스 폭 0.075 mm, 32K_XI/32K_XO 평행 트레이스 간격 ≥0.15 mm로 라우팅하고, 3차원 실드를 완전하게 적용하십시오. 크리스털 영역 아래의 최상층과 인접 층에는 다른 라우팅이 없도록 비워 두십시오.

!!! warning "크리스털 금지 구역 층은 SiFli에 확인하십시오"
    레이아웃 가이드는 각 크리스털 영역 아래의 표면층과 인접 층에 금지 구역을 두도록 규정합니다. 체크리스트 워크북은 4층 PCB의 1, 2, 3층에 구리 금지 구역을 두도록 규정합니다. 3층을 포함하는지에 대해 두 원본이 서로 다릅니다. 3층의 최종 요구 사항을 추정하지 말고 SiFli에 확인하십시오.

![그림 6.5-1: 크리스털 배치](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-1: 크리스털 배치</em></div>

![그림 6.5-2: 48 MHz 크리스털 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-2: 48 MHz 크리스털 회로도</em></div>

![그림 6.5-3: 48 MHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-3: 48 MHz 크리스털 라우팅 모델</em></div>

![그림 6.5-4: 48 MHz 크리스털 라우팅 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-4: 48 MHz 크리스털 라우팅 레퍼런스</em></div>

![그림 6.5-5: 32.768 kHz 크리스털 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-5: 32.768 kHz 크리스털 회로도</em></div>

![그림 6.5-6: 32.768 kHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-6: 32.768 kHz 크리스털 라우팅 모델</em></div>

![그림 6.5-7: 32.768 kHz 크리스털 라우팅 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-7: 32.768 kHz 크리스털 라우팅 레퍼런스</em></div>

### 6.6. RF 인터페이스 라우팅 { #66-rf-interface-routing }

RF 매칭 회로는 안테나 쪽이 아니라 칩 가까이에 가능한 한 가깝게 배치하십시오. AVDD_BRF RF 전원 디커플링 커패시터는 칩 핀 가까이에 가능한 한 가깝게 배치하고, 그라운드 핀 비아가 메인 그라운드 플레인에 직접 닿도록 하십시오.

RF 성능을 저하시키는 비아를 피하기 위해 RF 트레이스는 가능하면 최상층에서 라우팅하고, 트레이스 폭은 10 mil보다 넓게 하는 것이 좋으며, 3차원 실드를 완전하게 적용하고, 날카로운 모서리나 직각을 피하십시오. RF 트레이스 양쪽을 따라 실드용 그라운드 비아를 추가하고, RF 트레이스는 50 Ω 임피던스로 제어하십시오. DC-DC, VBAT, 고속 디지털 신호(크리스털, 고주파 클럭, I2C/SPI/SDIO/I2S/UART 인터페이스 신호 등)는 RF 라우팅 영역에서 배제하십시오. AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO, AVSS_BB는 RF 회로의 그라운드 핀이므로 그라운드에 확실하게 연결해야 합니다. 이 핀들의 패드에 블라인드 비아를 직접 두어 메인 그라운드에 연결하십시오.

![그림 6.6-1: π 네트워크 및 전원 회로 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-1: π 네트워크 및 전원 회로 회로도</em></div>

![그림 6.6-2: π 네트워크 및 전원 회로 PCB 레이아웃](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-2: π 네트워크 및 전원 회로 PCB 레이아웃</em></div>

![그림 6.6-3: RF 신호 회로 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-3: RF 신호 회로 회로도</em></div>

![그림 6.6-4: RF 신호 PCB 라우팅](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-4: RF 신호 PCB 라우팅</em></div>

![그림 6.6-5: RF 회로 그라운드 신호 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-5: RF 회로 그라운드 신호 회로도</em></div>

![그림 6.6-6: RF 회로 그라운드 신호 PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-6: RF 회로 그라운드 신호 PCB</em></div>

### 6.7. 오디오 인터페이스 라우팅 { #67-audio-interface-routing }

AVDD33_AUD 오디오 전원 디커플링 커패시터는 해당 핀 가까이에 배치하고, 그라운드 핀을 메인 그라운드에 확실하게 연결하십시오. MIC_BIAS 마이크 전원 디커플링 커패시터도 해당 핀 가까이에 배치하고, 마찬가지로 그라운드에 확실하게 연결하십시오. AUD_VREF 디커플링 커패시터는 해당 핀 가까이에 배치하십시오.

AU_ADC1P/AU_ADC1N과 AU_ADC2P/AU_ADC2N은 두 아날로그 입력 쌍입니다. 관련 부품을 핀 가까이에 가능한 한 가깝게 배치하고, 각 P/N 쌍은 가능한 한 짧은 트레이스 길이의 차동 라인으로 라우팅하며, 차동 쌍에 3차원 실드를 적용하고, 강한 간섭 신호를 이 트레이스에서 멀리 떨어뜨리십시오.

AU_DAC1P/AU_DAC1N과 AU_DAC2P/AU_DAC2N은 두 아날로그 출력 쌍입니다. 관련 부품을 핀 가까이에 가능한 한 가깝게 배치하고, 각 P/N 쌍은 가능한 한 짧게 2 mm 미만의 차동 라인으로 라우팅하되, 트레이스 기생 커패시턴스는 10 pF 미만, 차동 트레이스 폭은 0.075 mm로 하십시오. 차동 쌍에 3차원 실드를 적용하고, 강한 간섭 신호를 이 트레이스에서 멀리 떨어뜨리십시오.

!!! warning "원본의 DAC 트레이스 길이 한계 불일치"
    레이아웃 가이드는 DAC 트레이스 길이를 2 mm 미만으로 규정하지만, PCB 체크리스트 워크북은 2 cm(20 mm) 미만으로 규정합니다. 두 한계는 10배 차이가 납니다. SiFli의 확인 없이 한쪽 한계를 선택하거나 대체하지 마십시오.

![그림 6.7-1: 오디오 전원 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-1: 오디오 전원 회로도</em></div>

![그림 6.7-2: 오디오 전원 필터링 PCB 설계](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-2: 오디오 전원 필터링 PCB 설계</em></div>

![그림 6.7-3: 아날로그 오디오 입력 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-3: 아날로그 오디오 입력 회로도</em></div>

![그림 6.7-4: 아날로그 오디오 입력 PCB 설계](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-4: 아날로그 오디오 입력 PCB 설계</em></div>

![그림 6.7-5: 아날로그 오디오 출력 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-5: 아날로그 오디오 출력 회로도</em></div>

![그림 6.7-6: 아날로그 오디오 출력 PCB 설계](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-6: 아날로그 오디오 출력 PCB 설계</em></div>

### 6.8. USB 인터페이스 라우팅 { #68-usb-interface-routing }

AVDD33_USB 디커플링 커패시터는 해당 핀 가까이에 배치하고, USB2_REXT 캘리브레이션 저항도 해당 핀 가까이에 배치하십시오. USB 트레이스는 칩에 도달하기 전에 ESD 보호 소자의 핀을 거쳐야 하며, ESD 소자의 그라운드 핀은 메인 그라운드에 확실하게 연결해야 합니다. USB DP/DN은 차동 임피던스 90 Ω으로 제어되는 차동 쌍으로 라우팅하고 3차원 실드를 적용하십시오.

![그림 6.8-1: USB 신호 회로도](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-1: USB 신호 회로도</em></div>

![그림 6.8-2: USB 신호 PCB 설계](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-2: USB 신호 PCB 설계</em></div>

![그림 6.8-3: USB 신호 부품 배치 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-3: USB 신호 부품 배치 레퍼런스</em></div>

![그림 6.8-4: USB 신호 라우팅 모델](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-4: USB 신호 라우팅 모델</em></div>

### 6.9. SDIO 인터페이스 라우팅 { #69-sdio-interface-routing }

SF32LB58x는 SDIO1과 SDIO2, 두 개의 SDIO 인터페이스를 제공합니다. 각 SDIO 인터페이스의 모든 신호는 나누지 말고 함께 라우팅하되, 총 트레이스 길이는 ≤50 mm, 그룹 내 길이 제어는 ≤6 mm로 하십시오. SDIO 클럭 신호에는 3차원 실드를 적용하고, DATA와 CMD 신호도 실드하십시오.

![그림 6.9-1: SDIO1 인터페이스 회로](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-1: SDIO1 인터페이스 회로</em></div>

![그림 6.9-2: SDIO1 PCB 라우팅 모델](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-2: SDIO1 PCB 라우팅 모델</em></div>

### 6.10. DSI 인터페이스 라우팅 { #610-dsi-interface-routing }

AVDD18_DSI 디커플링 커패시터는 해당 핀 가까이에 배치하고, DSI_REXT 캘리브레이션 저항도 해당 핀 가까이에 배치하십시오. DSI 신호는 차동 임피던스 100 Ω으로 제어되는 차동 쌍으로 라우팅하고, 클럭과 데이터의 길이를 맞추십시오. 쌍 내 스큐는 ≤0.5 mm, 쌍 간 스큐는 ≤2 mm로 합니다. 각 차동 쌍에 3차원 실드를 적용하십시오.

!!! warning "원본의 DSI 쌍 간 한계 불일치"
    레이아웃 가이드는 쌍 간 스큐를 ≤2 mm(쌍 내 스큐는 ≤0.5 mm)로 제한합니다. 반면 PCB 체크리스트 워크북은 DSI 데이터 차동 쌍을 클럭 차동 쌍과 200 mil(5.08 mm) 이내로 맞추도록 요구합니다. 쌍 간 한계가 충돌합니다. 쌍 내 한계는 별개로 유지하고, 레이아웃을 확정하기 전에 적용할 쌍 간 한계를 SiFli에 확인하십시오.

![그림 6.10-1: DSI 신호 회로](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.10-1: DSI 신호 회로</em></div>

![그림 6.10-2: DSI 신호 PCB 라우팅](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.10-2: DSI 신호 PCB 라우팅</em></div>

### 6.11. DC-DC 회로 라우팅 { #611-dc-dc-circuit-routing }

DC-DC 파워 인덕터와 디커플링 커패시터는 칩 핀 가까이에 배치하십시오. DC-DC 회로의 루프 인덕턴스를 최소화하도록 BUCK_LX 트레이스는 가능한 한 짧고 넓게 유지하십시오. 모든 DC-DC 출력 디커플링 커패시터의 그라운드 핀에는 메인 그라운드 플레인으로 연결되는 그라운드 비아를 추가하십시오. BUCK_FB 피드백 트레이스는 너무 가늘면 안 되며 0.25 mm보다 넓게 유지하십시오. 파워 인덕터 아래의 최상층에는 구리 채움(pour)을 금지하고, 인접 층은 완전한 레퍼런스 그라운드로 유지하며, 인덕터 영역으로 다른 트레이스를 지나가게 하지 마십시오.

![그림 6.11-1: DC-DC 핵심 부품 회로](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.11-1: DC-DC 핵심 부품 회로</em></div>

![그림 6.11-2: DC-DC 핵심 부품 PCB 레이아웃](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.11-2: DC-DC 핵심 부품 PCB 레이아웃</em></div>

### 6.12. 전원 라우팅 { #612-power-supply-routing }

PVDD1과 PVDD2는 내장 PMU 모듈의 전원 입력입니다. 디커플링 커패시터를 핀 가까이에 배치하고 트레이스를 가능한 한 넓게, 0.5 mm 미만으로 내려가지 않게 유지하십시오. PVSS1과 PVSS2는 PMU 모듈의 그라운드 핀이므로 비아를 통해 메인 그라운드에 연결해야 합니다. 플로팅 상태로 두면 PMU 전체 성능에 영향을 주므로 피하십시오.

![그림 6.12-1: DC-DC 회로 다이어그램](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.12-1: DC-DC 회로 다이어그램</em></div>

![그림 6.12-2: DC-DC PCB 라우팅](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.12-2: DC-DC PCB 라우팅</em></div>

### 6.13. LDO 및 IO 전원 입력 라우팅 { #613-ldo-and-io-power-input-routing }

모든 LDO 출력과 IO 전원 입력의 디커플링 커패시터는 각 핀 가까이에 배치하고, 트레이스 폭은 입력 전류 요구 사항을 충족해야 합니다. 전원 레일 리플을 줄이고 시스템 안정성을 높이도록 트레이스를 가능한 한 짧고 넓게 유지하십시오.

![그림 6.13-1: LDO 및 IO 입력 전원 라우팅 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.13-1: LDO 및 IO 입력 전원 라우팅 레퍼런스</em></div>

### 6.14. 기타 인터페이스 라우팅 { #614-other-interface-routing }

GPADC 핀 신호 네트는 3차원 실드를 완전하게 적용해야 하며, 배터리 레벨 감지 및 온도 감지 회로 같은 다른 간섭원에서 멀리 떨어뜨려야 합니다.

![그림 6.14-1: GPADC 회로](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.14-1: GPADC 회로</em></div>

32 kHz 출력 같은 클럭 입출력 핀 신호 네트도 마찬가지로 3차원 실드를 완전하게 적용해야 하며, 다른 간섭원에서 멀리 떨어뜨려야 합니다.

![그림 6.14-2: 32 kHz 클럭 출력 회로](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.14-2: 32 kHz 클럭 출력 회로</em></div>

### 6.15. 칩 그라운드 라우팅 { #615-chip-ground-routing }

SF32LB58x 칩 중앙 영역 아래의 그라운드 네트워크는 트레이스로 완전히 연결해야 하며, 블라인드/베리드 비아를 통해 메인 그라운드 플레인에 연결되는 충분한 그라운드 플레인을 확보해야 합니다.

![그림 6.15-1: 칩 아래 최상층 그라운드 신호](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.15-1: 칩 아래 최상층 그라운드 신호</em></div>

![그림 6.15-2: 칩 아래 2층 그라운드 신호](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.15-2: 칩 아래 2층 그라운드 신호</em></div>

![그림 6.15-3: 칩 아래 3층 그라운드 신호](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.15-3: 칩 아래 3층 그라운드 신호</em></div>

![그림 6.15-4: 칩 아래 4층 그라운드 신호](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.15-4: 칩 아래 4층 그라운드 신호</em></div>

### 6.16. EMI 및 ESD { #616-emi-esd }

실드 캔 밖의 최상층에서 긴 트레이스는 피하십시오. 클럭, 전원 등 노이즈를 발생시키는 신호는 최상층이 아니라 내층에서 라우팅해야 합니다. ESD 보호 소자는 커넥터 핀 가까이에 배치하고, 신호 분기가 생기지 않도록 다른 어떤 부품보다 먼저 ESD 소자를 거치도록 라우팅하십시오. ESD 소자의 그라운드 핀은 비아를 통해 메인 그라운드에 연결하고, 임피던스를 낮춰 ESD 성능을 높이도록 그라운드 패드 트레이스를 짧고 넓게 하십시오.

### 6.17. 기타 고려 사항 { #617-other-considerations }

USB 충전선 테스트 포인트는 TVS 다이오드보다 앞단에 두고, 배터리 홀더 TVS 다이오드는 플랫폼 연결보다 앞단에 배치하십시오. 신호가 칩에 도달하기 전에 항상 TVS를 거치도록 라우팅하십시오. TVS 그라운드 핀 트레이스는 가능한 한 짧게 유지하십시오.

!!! note "원본은 TVS 배치 기준을 정의하지 않습니다"
    중국어 원본은 배터리 커넥터 TVS를 "플랫폼"(平台) 앞에 배치하라고 하지만, "플랫폼"이 어느 노드나 연결 지점을 가리키는지는 밝히지 않습니다. 추정하지 말고 의도한 배치 기준을 SiFli에 확인하십시오. 원본은 별도로 경로가 칩에 도달하기 전에 TVS를 거쳐야 한다고 요구하며, TVS 그라운드 트레이스를 짧게 하도록 규정합니다.

![그림 6.17-1: 전원 TVS 배치 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.17-1: 전원 TVS 배치 레퍼런스</em></div>

![그림 6.17-2: TVS 라우팅 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.17-2: TVS 라우팅 레퍼런스</em></div>

패드에 솔더 마스크가 묻지 않게 하고 솔더 조인트 신뢰성을 유지하려면, BGA 패드의 비아는 볼의 중심에 놓아야 하며 중심에서 벗어난 배치는 피하십시오. 제조 수율을 높이려면 BGA 볼 연결 레퍼런스 그림을 참조하십시오.

![그림 6.17-3: BGA 비아 배치 레퍼런스](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.17-3: BGA 비아 배치 레퍼런스</em></div>

![그림 6.17-4: BGA 볼 연결 레퍼런스 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.17-4: BGA 볼 연결 레퍼런스 1</em></div>

![그림 6.17-5: BGA 볼 연결 레퍼런스 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.17-5: BGA 볼 연결 레퍼런스 2</em></div>
