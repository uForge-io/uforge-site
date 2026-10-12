---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB52x MCU의 PCB 레이아웃 가이드라인: 풋프린트, 스택업, 팬아웃, 클럭/RF/오디오/USB/SDIO 라우팅, DC-DC 및 전원 라우팅, EMI/ESD, 기타 레이아웃 고려 사항을 다룹니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB52x 하드웨어 설계 가이드 — PCB 레이아웃 가이드라인 { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB52x 하드웨어 설계 가이드의 일부"
    이 페이지는 6절 PCB 레이아웃 가이드라인을 다룹니다. 세 페이지 중 첫 번째인 [회로 설계 가이드라인](SF32LB52x_schematic_design.md)으로 돌아가거나, [PCB 레이아웃 체크리스트](SF32LB52x_pcb_layout_checklist.md)로 이동하거나, [설계 검토 체크리스트 및 참고 자료](SF32LB52x_review_and_reference.md)로 바로 넘어가십시오.

## 6. PCB 레이아웃 가이드라인 { #6-pcb-layout-guidelines }

이 장은 5절의 레이아웃 검토 보조 자료로 사용하십시오. 최종 배치를 시작하기 전에 회로도에 변형(variant), 전원 트리, 클럭 부품, RF 예약 영역, 디스플레이/스토리지 핀, 테스트 접근이 이미 정의되어 있어야 합니다.

**설계 목표**

회로도를 제조 가능한 4층 PTH 보드로 옮기면서, 민감한 RF, 크리스털, 오디오, 전원, USB, SDIO 경로를 임피던스, 노이즈, 리턴 전류 문제로부터 보호합니다.

**PCB 검토 흐름**

1. 패키지 풋프린트와 페이스트/랜드 패턴을 확인합니다.
2. PCB 제조사와 스택업, 트레이스/간격, 드릴, 임피던스 규칙을 확인합니다.
3. 칩, 크리스털, RF 경로, DC/DC, 충전기, 디스플레이/스토리지 커넥터, 오디오 부품을 배치합니다.
4. 중요도가 낮은 GPIO 라우팅을 채우기 전에 팬아웃과 민감한 라우팅을 검토합니다.
5. RF, 크리스털, USB, SDIO, 오디오, DC/DC, 충전기, 전원 레일의 증빙 스크린샷을 확보합니다.

### 6.1. PCB 풋프린트 설계 { #61-pcb-footprint-design }

SF32LB52x QFN68L 패키지는 7 mm x 7 mm x 0.85 mm이며, 핀 68개와 0.35 mm 피치를 가집니다.

패키지 도면은 공칭 전체 높이를 0.85 mm(범위 0.8~0.9 mm), 공칭 스탠드오프를 0.02 mm(최대 0.05 mm)로 규정합니다. 조립 및 인클로저 클리어런스를 확인할 때는 반올림된 패키지 요약만 사용하지 말고 상세 도면을 사용하십시오.

![그림 6.1-1: QFN68L 패키지 치수](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-1: QFN68L 패키지 치수</em></div>

![그림 6.1-2: QFN68L 패키지 형상](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-2: QFN68L 패키지 형상</em></div>

![그림 6.1-3: QFN68L PCB 랜드 패턴 참고](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.1-3: QFN68L PCB 랜드 패턴 참고</em></div>

그림 6.1-3은 0.2 mm x 0.55 mm 주변 패드, 0.35 mm 피치, 0.3 mm x 0.65 mm 솔더 마스크 개구부, 0.2 mm x 0.55 mm 페이스트 마스크 개구부를 규정합니다. 이는 참고용 풋프린트 치수이므로, 풋프린트를 릴리스하기 전에 조립 공정 요건을 검토하십시오.

패키지 외형은 노출 패드의 공칭 크기를 5.49 mm x 5.49 mm로 제시합니다. 팬아웃 예시는 중앙 패드를 GND에 연결하므로, 이를 사용하지 않는 기구적 요소로 취급하지 마십시오.

### 6.2. PCB 스택업 { #62-pcb-stack-up }

레퍼런스 디자인은 단면 또는 양면 배치를 지원합니다. 부품을 한쪽 면에 배치하거나, 커패시터 등 수동 부품을 칩 아래 뒷면에 배치할 수 있습니다. 4층 관통 비아(PTH) 스택업을 권장합니다.

![그림 6.2-1: 참고 스택업 구조](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.2-1: 참고 스택업 구조</em></div>

그림 6.2-1은 도금과 솔더 마스크를 포함한 0.8 mm ±10% 참고 스택업입니다. 계산된 총 두께는 0.79553 mm입니다. 이 예시를 범용 스택업으로 취급하지 말고, 실제 완성 두께와 유전체 구성은 PCB 제조사와 확인하십시오.

<div align="center"><em>표 6.2-1: 참고 스택업 값</em></div>

<div align="center" markdown>

| 층 | 재료 | 두께(mil) | 두께(mm) | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| 상단 솔더 마스크 | 솔더 마스크 | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | 구리 + 도금 | 1.81 | 0.045974 | — | — |
| L1–L2 유전체 | 1080 (66%) x3 프리프레그 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | 구리 + 도금 | 1.4 | 0.03556 | — | — |
| L2–L3 유전체 | 코어 | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | 구리 + 도금 | 1.4 | 0.03556 | — | — |
| L3–L4 유전체 | 1080 (66%) x3 프리프레그 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | 구리 + 도금 | 1.81 | 0.045974 | — | — |
| 하단 솔더 마스크 | 솔더 마스크 | 1 | 0.0254 | 3.5 | 0.8 |

</div>

프리프레그 행은 구리 면적 70%를 가정합니다. Dk와 Df는 솔더 마스크 Df 0.8을 포함하여 참고 이미지의 값을 그대로 옮긴 것이며, 검증된 범용 재료 특성이 아닙니다. 임피던스와 손실 계산에는 제조사의 실제 재료 데이터를 확인하십시오.

### 6.3. 일반 PCB 설계 규칙 { #63-general-pcb-design-rules }

레퍼런스 디자인의 일반 PTH 보드 PCB 설계 규칙을 따르십시오.

![그림 6.3-1: 일반 PCB 설계 규칙](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.3-1: 일반 PCB 설계 규칙</em></div>

그림 6.3-1은 예시 규칙 집합에서 최소/권장 트레이스 폭 0.1 mm와 최대 2.54 mm를 사용합니다. 또한 0.1 mm 트레이스/비아/패드 클리어런스와 0.127 mm 구리 클리어런스 규칙(구리 영역 사이는 0.15 mm)을 구분하며, 0.25 mm 보드 가장자리 클리어런스를 규정합니다. 이는 참고용 CAD 규칙이므로, 제조 한계와 임피던스 제어 라우팅은 별도로 확인하십시오.

그림 6.3-1의 추가 참고 규칙은 드릴 간 간격과 몸체 간 간격을 0.1 mm로 규정합니다. 일부 동일 네트 항목은 0이지만, 해당 항목이 서로 다른 네트 사이의 클리어런스나 보드 가장자리 및 구리 규칙을 면제하는 것은 아닙니다.

### 6.4. PCB 트레이스 팬아웃 { #64-pcb-trace-fanout }

모든 QFN 패키지 신호를 최상층을 통해 팬아웃하십시오.

![그림 6.4-1: 최상층 팬아웃 참고](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.4-1: 최상층 팬아웃 참고</em></div>

### 6.5. 클럭 인터페이스 라우팅 { #65-clock-interface-routing }

두 설계 그룹 모두에 다음 클럭 라우팅 규칙을 적용하십시오.

- 크리스털은 실드 캔 안쪽, PCB 가장자리에서 1 mm보다 멀리, 발열 부품(PA, 충전기, PMU 회로)에서 가능한 한 멀리(이상적으로는 5 mm보다 멀리) 배치하여 크리스털 주파수 드리프트에 영향을 주지 않도록 합니다
- 크리스털 주위에 다른 금속이나 부품이 없는 0.25 mm보다 큰 클리어런스를 확보합니다
- 48 MHz 크리스털 트레이스는 최상층에 길이 3~10 mm, 폭 0.1 mm로 라우팅하고 전체를 그라운드로 실드하며, VBAT/VCC, DC/DC, 고속 신호 라인에서 멀리 둡니다. 크리스털 영역 아래의 최상층과 인접 층에는 다른 라우팅을 두지 않습니다
- 32.768 kHz 크리스털 트레이스는 최상층에 길이 ≤10 mm, 폭 0.1 mm로 라우팅하고, 병렬 32K_XI/32K_XO 트레이스 사이 간격은 ≥0.15 mm로 하며 전체를 그라운드로 실드합니다. 이 크리스털 회로 아래의 최상층과 인접 층에는 관련 없는 라우팅을 두지 않습니다.

![그림 6.5-1: 크리스털 배치](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-1: 크리스털 배치</em></div>

![그림 6.5-2: 48 MHz 크리스털 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-2: 48 MHz 크리스털 회로도</em></div>

![그림 6.5-3: 48 MHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-3: 48 MHz 크리스털 라우팅 모델</em></div>

![그림 6.5-4: 48 MHz 크리스털 라우팅 참고](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-4: 48 MHz 크리스털 라우팅 참고</em></div>

![그림 6.5-5: 32.768 kHz 크리스털 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-5: 32.768 kHz 크리스털 회로도</em></div>

![그림 6.5-6: 32.768 kHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-6: 32.768 kHz 크리스털 라우팅 모델</em></div>

![그림 6.5-7: 32.768 kHz 크리스털 라우팅 참고](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.5-7: 32.768 kHz 크리스털 라우팅 참고</em></div>

그림 6.5-3과 그림 6.5-6은 두 크리스털 모두에서 병렬 XI/XO 트레이스 사이에 최소 0.15 mm 간격이 있음을 보여 줍니다. 그림 6.5-2는 부하 커패시턴스 8.8 pF의 48 MHz 크리스털을 사용하며 외부 부하 커패시터를 NF(not fitted, 미실장)로 표기합니다. 그림 6.5-5는 PA22/PA23에 연결된 32.768 kHz, 7 pF 크리스털을 사용하며, 이 핀은 PDM_CLK/PDM_DATA와도 멀티플렉싱됩니다.

!!! important "크리스털 그라운드 처리"
    배터리 변형 애플리케이션 노트는 크리스털 영역의 구리에 대해 스스로 모순됩니다. 클럭 절에서는 크리스털 바로 아래의 L2 그라운드를 제거하라고 하지만, PCB 라우팅 절에서는 최상층과 인접 층에서 플레인 보이드나 구리 컷아웃을 금지하고 연속된 L2 그라운드를 그려 놓았습니다. 별도의 PCB 레이아웃 가이드도 보이드 금지 지침을 되풀이합니다. 범용 L2 규칙을 추정하거나 층 수로 이를 해결하려 하지 마십시오. 릴리스 전에 스택업별 처리 방식을 SiFli에 확인하십시오. 지정된 크리스털 금지 구역과 부품 클리어런스는 별도의 점검 항목으로 유지됩니다.

### 6.6. RF 인터페이스 라우팅 { #66-rf-interface-routing }

두 설계 그룹 모두에 다음 RF 라우팅 규칙을 적용하십시오.

- RF 매칭 회로는 안테나 쪽이 아니라 칩 쪽 가까이에 배치합니다
- AVDD_BRF 필터 커패시터는 칩 핀 가까이에 배치하고, 그라운드 핀 비아를 메인 그라운드에 직접 연결합니다
- RF 트레이스는 가능하면 최상층에 라우팅하고 성능을 저하시키는 비아를 피합니다. 원본은 10 mil보다 큰 폭을 권장하며, 실제 스택업에서 50 Ω이 달성되는지 확인하십시오. 그라운드 실드를 제공하고 예각 또는 직각 꺾임을 피합니다.
- RF 트레이스 임피던스를 50 Ω으로 제어하고, 양쪽을 따라 촘촘한 실드 그라운드 비아를 배치합니다

![그림 6.6-1: π 네트워크 및 전원 회로 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-1: π 네트워크 및 전원 회로 회로도</em></div>

![그림 6.6-2: π 네트워크 및 전원 회로 PCB 레이아웃](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-2: π 네트워크 및 전원 회로 PCB 레이아웃</em></div>

![그림 6.6-3: RF 신호 회로 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-3: RF 신호 회로 회로도</em></div>

![그림 6.6-4: RF 신호 PCB 라우팅](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.6-4: RF 신호 PCB 라우팅</em></div>

RF 예시는 직렬 15 pF/50 V 커패시터(C0333)를 사용하고, C0318/C0319는 NF로 두며, AVDD_BRF에 0.47 uF 필터링을 보여 줍니다. 이 값들은 실장 예시 값이며, 범용 안테나 매칭 처방이 아닙니다.

### 6.7. 오디오 인터페이스 라우팅 { #67-audio-interface-routing }

두 설계 그룹 모두에 다음 오디오 라우팅 규칙을 적용하십시오.

- AVDD33_AUD, MIC_BIAS, AUD_VREF 필터 커패시터는 각 핀 가까이에 배치합니다. 이들의 그라운드 단자를 메인 그라운드에 확실히 연결합니다.
- ADCP 아날로그 입력용 부품은 칩 핀 가까이에 배치하고, 트레이스를 짧게 하며, 전체를 그라운드로 실드하고, 다른 강한 간섭원에서 멀리 둡니다
- DACP/DACN 아날로그 출력용 부품은 칩 핀 가까이에 배치하고, 차동 쌍으로 라우팅하며, 트레이스를 짧게, 기생 커패시턴스를 10 pF 미만으로 하고, 전체를 그라운드로 실드합니다

![그림 6.7-1: 오디오 전원 필터링 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-1: 오디오 전원 필터링 회로도</em></div>

![그림 6.7-2: 오디오 전원 필터링 PCB 참고 라우팅](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-2: 오디오 전원 필터링 PCB 참고 라우팅</em></div>

![그림 6.7-3: 아날로그 오디오 입력 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-3: 아날로그 오디오 입력 회로도</em></div>

![그림 6.7-4: 아날로그 오디오 입력 PCB 설계](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-4: 아날로그 오디오 입력 PCB 설계</em></div>

![그림 6.7-5: 아날로그 오디오 출력 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-5: 아날로그 오디오 출력 회로도</em></div>

![그림 6.7-6: 아날로그 오디오 출력 PCB 설계](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.7-6: 아날로그 오디오 출력 PCB 설계</em></div>

그림 6.7-1은 MIC_BIAS용 1 uF/6.3 V, AVDD33_AUD용 2.2 uF/10 V, AUD_VREF용 1 uF/6.3 V의 참고 필터 커패시터를 보여 줍니다. 이 값들은 도시된 회로를 설명하는 것이므로, 실제 설계에 필요한 값은 별도로 확인하십시오. 차동 라우팅을 유지하는 것과 더불어 DACP/DACN을 강한 간섭원에서 멀리 두십시오.

원본 회로도 지침은 DAC 출력 트레이스 길이도 2 cm 미만으로 제한합니다.

### 6.8. USB 인터페이스 라우팅 { #68-usb-interface-routing }

USB DP(PA35) / DN(PA36)은 먼저 ESD 소자 핀을 거쳐 칩으로 라우팅하고, ESD 소자의 그라운드가 메인 그라운드에 확실히 연결되도록 하십시오. 이 쌍은 90 Ω 차동 임피던스 제어와 전체 그라운드 실드로 라우팅하십시오.

![그림 6.8-1: USB 신호 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-1: USB 신호 회로도</em></div>

![그림 6.8-2: USB 신호 PCB 설계](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-2: USB 신호 PCB 설계</em></div>

![그림 6.8-3: USB 신호 부품 배치 참고](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-3: USB 신호 부품 배치 참고</em></div>

![그림 6.8-4: USB 신호 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.8-4: USB 신호 라우팅 모델</em></div>

그림 6.8-3은 보호 소자 패드를 거치는 라우팅과 보호되지 않은 분기를 대비하여 보여 줍니다. 보호 연결을 거치지 않고 칩에 도달하는 분기를 만들지 마십시오.

### 6.9. SDIO 인터페이스 라우팅 { #69-sdio-interface-routing }

SDIO 신호는 그룹으로 함께 라우팅하며, 총 트레이스 길이는 ≤50 mm, 그룹 내 길이 매칭은 ≤6 mm로 합니다. 클럭 신호는 전체를 그라운드로 실드하고, DATA와 CMD 신호도 실드합니다.

![그림 6.9-1: SDIO 인터페이스 회로 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-1: SDIO 인터페이스 회로 회로도</em></div>

![그림 6.9-2: SDIO PCB 라우팅 모델](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-2: SDIO PCB 라우팅 모델</em></div>

그림 6.9-2는 CMD 트레이스와 인접한 그라운드 실드 사이에 최소 0.15 mm 간격이 있음도 보여 줍니다.

SDIO 회로도는 PA11을 MPI2_VDD_EN/SD_VDD_EN으로 표기합니다. 우선순위가 더 높은 OpenSiFli 애플리케이션 가이드와 회로도 가이드는 부트 스토리지 전원 스위칭에 PA21을 지정하므로, 원본이 뒷받침하는 설계 기준으로 PA21을 사용하십시오. 연결된 체크리스트 워크북의 배터리 변형 외부 플래시용 PA11 항목은 이것이 별도의 제어인지 여부를 확정하지 않습니다. 명확한 확인 없이 PA11로 대체하지 마십시오. 정확한 네트와 변형은 SiFli에 확인하십시오. [스토리지 및 제조](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control)를 참조하십시오.

### 6.10. DC/DC 회로 라우팅 { #610-dcdc-circuit-routing }

파워 인덕터와 필터 커패시터를 칩 핀 가까이에 배치하십시오. BUCK_LX 트레이스는 짧고 넓게 유지하고, BUCK_FB 피드백 트레이스는 0.25 mm보다 넓게 유지하십시오. 모든 DC/DC 출력 필터 커패시터의 그라운드 핀은 여러 개의 비아로 메인 그라운드 플레인에 연결하십시오. 파워 인덕터 영역에는 최상층 구리를 붓지 말고, 인접 층은 완전한 기준 그라운드로 유지하십시오.

![그림 6.10-1: DC/DC 주요 부품 회로도](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.10-1: DC/DC 주요 부품 회로도</em></div>

![그림 6.10-2: DC/DC 주요 부품 PCB 레이아웃](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.10-2: DC/DC 주요 부품 PCB 레이아웃</em></div>

그림 6.10-1은 4.7 uH 인덕터와 4.7 uF/10 V 출력 커패시터를 사용합니다. 여기에 표기된 PMU_BUCK_VSW와 PMU_BUCK_VOUT은 원본 핀 표에서 BUCK_LX와 BUCK_FB로 설명된 스위칭 노드 및 출력/피드백 노드에 해당합니다. 인덕터 영역에는 관련 없는 라우팅을 두지 마십시오.

### 6.11. 전원 라우팅 { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (배터리 전원)"

    VCC는 칩 내부 PMU 모듈의 입력 핀입니다. 커패시터를 핀 가까이에 배치하고 트레이스 폭은 0.4 mm 이상으로 합니다. VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD, AVDD_BRF의 필터 커패시터는 각 핀 가까이에 배치하고, 트레이스 폭은 필요한 입력 전류에 맞춥니다.

    ![그림 6.11-1: VCC 전원 라우팅(회로도)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>그림 6.11-1: VCC 전원 라우팅(회로도)</em></div>

    ![그림 6.11-2: VCC 전원 라우팅(PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>그림 6.11-2: VCC 전원 라우팅(PCB)</em></div>

    **충전 회로 라우팅**

    VBUS와 VBAT는 칩 내부 충전 모듈의 입력/출력 핀이므로, 이들의 필터 커패시터를 핀 가까이에 배치합니다. 충전 루프에는 비교적 큰 전류가 흐르므로 트레이스 폭을 16 mil(약 0.41 mm) 이상으로 하고, 민감한 신호를 나란히 라우팅하지 마십시오. 충전 경로가 민감한 회로 모듈과 라우팅을 공유하지 않도록 스타 라우팅을 사용하십시오. 애플리케이션 노트는 이 최솟값을 0.4 mm로 반올림합니다.

    ![그림 6.11-3: VBUS 및 VBAT 전원 라우팅(회로도)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>그림 6.11-3: VBUS 및 VBAT 전원 라우팅(회로도)</em></div>

    ![그림 6.11-4: VBUS 및 VBAT 전원 라우팅(PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>그림 6.11-4: VBUS 및 VBAT 전원 라우팅(PCB)</em></div>

    !!! note "참고 충전 회로도"
        그림 6.11-3은 VBUS에 10 uF/10 V, VBAT에 4.7 uF/10 V를 보여 줍니다. 여기에 인쇄된 VBUS 범위는 4.3~5.5 V이며, Electrical Specification-A3은 4.5~5.5 V를, 배터리 변형 애플리케이션 노트는 통합 충전기에 대해 4.6~5.5 V를 규정하고 최대 충전 전류에서 핀 ≥4.6 V 요건도 포함합니다. 이 회로도는 배치 참고용이며 검증된 다른 하한이 아닌 것으로 취급하십시오. 5.2절의 원본 불일치 참고 사항을 참조하십시오.

=== "52B/D/E/G/J (일반 전원)"

    PVDD는 칩 내부 PMU 모듈의 입력 핀입니다. 커패시터를 핀 가까이에 배치하고 트레이스 폭은 0.4 mm 이상으로 합니다. AVDD33, VDDIOA, VDD_SIP, AVDD33_AUD, AVDD_BRF의 필터 커패시터는 각 핀 가까이에 배치하고, 트레이스 폭은 필요한 입력 전류에 맞추되 전원 리플을 줄이고 시스템 안정성을 높이도록 가능한 한 짧고 넓게 유지합니다.

    ![그림 6.11-5: PVDD 전원 라우팅](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>그림 6.11-5: PVDD 전원 라우팅</em></div>

    !!! info "해당 없음"
        이 변형에는 충전 관리 회로가 없으므로 충전 회로 라우팅이 필요하지 않습니다.

### 6.12. 기타 인터페이스 라우팅 { #612-other-interface-routing }

GPADC 입력 트레이스는 그라운드로 실드하고, 배터리 잔량 및 온도 감지 회로를 포함하여 간섭을 줄 수 있는 다른 회로에서 멀리 두십시오.

### 6.13. EMI 및 ESD { #613-emi-esd }

두 설계 그룹 모두에 다음 EMI 및 ESD 규칙을 적용하십시오.

- 간섭을 일으키는 긴 클럭 및 전원 트레이스는 실드 캔 바깥의 최상층에 두지 말고 내층으로 라우팅합니다.
- ESD 보호 소자는 커넥터 핀 가까이에 배치하고, 신호가 다른 어떤 것보다 먼저 ESD 소자를 거쳐 라우팅되도록 합니다
- ESD 소자의 그라운드 핀이 비아를 통해 메인 그라운드에 연결되도록 하고, 그라운드 패드 트레이스는 임피던스를 낮추어 ESD 성능을 높이도록 짧고 넓게 합니다

### 6.14. 기타 고려 사항 { #614-other-considerations }

USB 충전 라인 테스트 포인트는 커넥터 쪽에서 TVS 보호 지점 앞에 배치하고, 배터리 쪽 TVS는 라인이 MCU와 기타 부하로 분기되기 전의 보드 입구에 배치하십시오. 라인은 칩에 도달하기 전에 TVS 연결 지점을 거치도록 라우팅하십시오. TVS 자체는 직렬이 아니라 그라운드에 대한 션트로 연결됩니다. 그라운드 연결은 짧게 유지하십시오.

![그림 6.14-1: 전원 TVS 배치 참고](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.14-1: 전원 TVS 배치 참고</em></div>

![그림 6.14-2: TVS 라우팅 참고](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.14-2: TVS 라우팅 참고</em></div>
