---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB57x MCU의 PCB 레이아웃 가이드라인: 스택업, 핵심 PCB 제약, 전원/크리스털/RF/아날로그/오디오/고속 라우팅, EMI/ESD/EOS, 참고 그림입니다."
tags:
    - 하드웨어
    - 칩
---

# SF32LB57x 하드웨어 설계 가이드 — PCB 레이아웃 가이드라인

!!! note "SF32LB57x 하드웨어 설계 가이드의 일부"
    이 페이지는 6절, PCB 레이아웃 가이드라인을 다룹니다. [스토리지 및 양산](SF32LB57x_schematic_storage_mfg.md)으로 돌아가거나 [설계 검토 체크리스트 및 참고 자료](SF32LB57x_review_and_reference.md)로 이동하십시오.

## 6. PCB 레이아웃 가이드라인

### 6.1. 스택업

SF32LB57x는 QFN68L(7 x 7 mm, 68핀, 0.35 mm 피치)과 QFN80L(8 x 8 mm, 80핀, 0.35 mm 피치) 패키지로 제공됩니다. QFN 설계에는 일반적으로 4층 PTH PCB를 사용할 수 있으며, 부품은 PCB의 한쪽 면 또는 양쪽 면에 배치할 수 있습니다(예: 커패시터를 뒷면에 배치).<!-- BGA-ONLY --> BGA112 패키지는 5.4 x 4.4 mm 크기에 0.4 mm 피치 볼 112개가 배열됩니다. BGA 설계에는 일반적으로 4층 이상이 필요하며, 팬아웃 난이도에 따라 1차 HDI 블라인드/베리드 비아를 사용할 수 있습니다. 부품은 이 경우에도 PCB의 한쪽 면 또는 양쪽 면에 배치할 수 있습니다.<!-- /BGA-ONLY -->

좋은 스택업은 다음을 제공합니다.

- 핵심 부품과 짧은 라우팅을 위한 최상층 접근성.
- 빈틈없는 내부 그라운드 플레인.
- 낮은 임피던스의 전원 분배.
- 고속, RF, 크리스털, 오디오, 아날로그 트레이스를 위한 연속적인 레퍼런스 그라운드.

레퍼런스 스택업 도면은 다음 재료와 총 두께 범위를 지정합니다. 최종 스택업과 완성 두께 공차는 PCB 제조사와 확인하십시오.

<div align="center"><em>표 6.1-1: QFN 레퍼런스 스택업 재료 및 두께</em></div>

<div align="center" markdown>

| 레퍼런스 스택업 | 코어 | 프리프레그 | 총 두께 범위 |
|:-----|:-----|:-----|:-----|
| QFN, 1.6 mm | 1.1 mm H/HOZ 구리 코어 | 7628 RC49%, 재료 표기 8.6 mil; 두께 열 8.28 mil (0.2104 mm) | 1.43~1.74 mm |
| QFN, 0.8 mm | 0.25 mm H/HOZ 코어, 구리 없음 | 7628 RC49%, 재료 표기 8.6 mil; 두께 열 8.28 mil (0.2104 mm) | 0.67~0.87 mm |

</div>

!!! warning "소스 충돌: QFN 프리프레그 표기와 두께"
    표 6.1-1은 원본 PCB 가이드의 QFN 스택업 그림 3-1-2-1과 3-1-2-2를 옮긴 것입니다. 그림의 프리프레그 재료 표기에는 `7628 RC49%, 8.6 mil`이 적혀 있지만, 두께 열에는 `8.28 mil (0.2104 mm)`로 나와 있습니다. 소스는 두 값의 차이나 제조 관리 기준으로 삼아야 할 값을 설명하지 않습니다. SiFli의 확인 없이 릴리스용 스택업에서 한 값을 선택하거나 다른 값 대신 적용해서는 안 됩니다.

<!-- BGA-ONLY -->
<div align="center"><em>표 6.1-2: BGA 레퍼런스 스택업 재료 및 두께</em></div>

<div align="center" markdown>

| 레퍼런스 스택업 | 코어 | 프리프레그 | 총 두께 범위 |
|:-----|:-----|:-----|:-----|
| BGA, 1.6 mm | 1.3 mm H/HOZ 구리 코어 | 1080 RC67%, 재료 표기 3.3 mil; 두께 열 3.01 mil (0.0764 mm) | 1.37~1.67 mm |
| BGA, 0.8 mm | 0.55 mm H/H 코어, 구리 없음 | 1080 RC67%, 재료 표기 3.3 mil; 두께 열 3.01 mil (0.0764 mm) | 0.70~0.90 mm |

</div>

!!! warning "소스 충돌: BGA 프리프레그 표기와 두께"
    표 6.1-2는 원본 PCB 가이드의 BGA 스택업 그림 3-1-2-3과 3-1-2-4를 옮긴 것입니다. 그림의 프리프레그 재료 표기에는 `1080 RC67%, 3.3 mil`이 적혀 있지만, 두께 열에는 `3.01 mil (0.0764 mm)`로 나와 있습니다. 소스는 두 값의 차이나 제조 관리 기준으로 삼아야 할 값을 설명하지 않습니다. SiFli의 확인 없이 릴리스용 스택업에서 한 값을 선택하거나 다른 값 대신 적용해서는 안 됩니다.
<!-- /BGA-ONLY -->

네 가지 레퍼런스 스택업은 모두 L1/L4에 1 oz 구리(1.38 mil, 0.0350 mm)를 사용하고, L2/L3는 각 층의 양면에 0.60 mil(0.0152 mm) 구리를 사용합니다.

4층 QFN 설계에는 다음 층 배치를 권장합니다. 1층(최상층)은 전체 그라운드 구리 영역과 부품 배치 및 신호 라우팅에 사용합니다. 2층은 레퍼런스 그라운드의 무결성을 유지하도록 연속된 그라운드 플레인으로 구성하고 신호를 라우팅하지 않습니다. 3층은 전원 플레인으로 사용하며, 전원 도메인별로 분할하거나 신호를 함께 라우팅할 수 있습니다. 4층(최하층)은 전체 그라운드 구리 영역과 신호 라우팅에 사용합니다.

### 6.2. 핵심 PCB 제약 빠른 참조

<div align="center"><em>표 6.2-1: 핵심 PCB 제약 빠른 참조</em></div>

<div align="center" markdown>

| 항목 | 제약 / 소스 근거 | 비고 |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | 트레이스 폭 >= 0.4 mm (약 16 mil) | 충전기 및 배터리 경로는 큰 전류가 흐르므로 짧고 넓게 유지하고 민감한 트레이스에서 멀리 떨어뜨립니다. |
| `VCC` / `PVDD` | 소스 값 충돌: PCB 가이드 3.2.1절은 >= 0.4 mm라고 하고, 자체 점검표 표 4-2-1-1의 44번 항목(배터리 전원 변형, variant)은 `VCC` >= 12 mil이라고 하며, 47번 항목(3.3 V 전원 변형)은 제목이 `PVDD`이지만 `VCC`를 >= 12 mil로 점검합니다. | 의도한 레일, 적용 범위, 폭을 SiFli와 확인하십시오. 이 참고 자료만으로 값을 선택해서는 안 됩니다. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 트레이스 폭 >= 10 mil | 배터리 전원 변형 전용입니다. 소프트 스타트 전류 제한, 돌입 전류, 허용 부하 범위를 점검하십시오. |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`: >= 10 mil; `BUCK_FB`: > 0.25 mm | `BUCK_LX`는 짧고 넓게 유지하십시오. 배치와 구리 클리어런스 가이드는 6.3절을 참조하십시오. |
| `AVDD_BRF` / `AVDD33_AUD` | 트레이스 폭 >= 8 mil | 아날로그/RF/오디오 전원은 짧고 깨끗하게 유지하고 별도로 필터링하는 것이 좋습니다. |
| USB DP/DN | 90 Ω 차동 | ESD를 먼저 거치도록 라우팅하고, 스터브를 피하며, 레퍼런스 그라운드를 연속적으로 유지하십시오. |
| RF 안테나 트레이스 | 50 Ω 싱글 엔디드 | 최상층, 최소한의 비아, 연속적인 레퍼런스 그라운드, 그라운드 비아 실드를 권장합니다. |
| RF 트레이스 양옆 그라운드 구리 폭 | 한쪽 면당 >= 60 mil | 양쪽 그라운드 구리를 여러 개의 비아로 메인 그라운드에 연결하십시오. |
| 48 MHz 크리스털 트레이스 | 약 3~10 mm | 최상층, 그라운드 실드, 크리스털 아래 구리 금지 구역을 권장합니다. |
| 32.768 kHz 크리스털 트레이스 | <= 10 mm | 트레이스 간 간격을 유지하고, 실드를 추가하며, 노이즈원을 피하십시오. |
| 크리스털 배치 | 칩 클럭 핀에서 >= 1.5 mm; 보드 가장자리에서 > 1 mm; PA, 충전, PMU 발열원에서 >= 5 mm | 48 MHz와 32.768 kHz 크리스털 모두에 적용됩니다. |
| MPI 버스 | 총 길이 <= 20 mm, 그룹 스큐 <= 3 mm | 클럭, 데이터, 커맨드 신호를 연속적인 레퍼런스 그라운드 위에서 그룹으로 라우팅하십시오. |
| SDIO 버스 | 총 길이 <= 50 mm, 그룹 스큐 <= 6 mm | CLK, CMD, DATA를 연속적인 레퍼런스 그라운드 위에서 그룹으로 라우팅하십시오. |
| `VDDIOA` | 트레이스 폭 >= 10 mil | 3.3 V 전원 변형 전용입니다. |

</div>

PTH 및 HDI 설계 규칙 그림에는 제조 공정 값의 예도 나와 있습니다. 최소 및 권장 트레이스 폭은 PTH에서 0.10 mm, HDI에서 0.075 mm이며, 최대 폭은 두 공정 모두 2.54 mm입니다. 비아 예시에서 PTH는 드릴 0.25 mm, 패드 0.45 mm이고, HDI 마이크로비아는 드릴 0.10 mm, 패드 0.23 mm입니다(관통 비아 예시는 드릴 0.25 mm, 패드 0.45 mm). 이 값은 참고용이므로 릴리스 전에 제조사의 공정 능력과 실제 설계 규칙을 확인하십시오.

### 6.3. 전원 레이아웃

- 대전류 전원 경로는 짧고 넓게 유지하십시오.
- 충전 경로는 민감한 아날로그, RF, 크리스털 트레이스에서 멀리 떨어뜨리십시오.
- VCC, PVDD, VBUS, VBAT 필터 커패시터는 칩 핀 가까이에 배치하십시오. PCB 가이드 3.2.1절은 `VCC` / `PVDD`에 대해 0.4 mm 이상을 지정하지만, 자체 점검표 표 4-2-1-1의 47번 항목은 이와 충돌하는 12 mil 값을 제시합니다(제목은 `PVDD`, 점검 세부 내용은 `VCC`). SiFli가 적용 요구 사항을 확인하기 전에는 어느 레일의 트레이스 폭도 확정하지 마십시오. VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD, AVDD_BRF 등 다른 출력의 필터 커패시터도 각 핀 가까이에 배치하십시오. 해당 트레이스는 입력 전류에 맞는 폭으로 설계하고, 짧고 넓게 유지하여 전원 리플을 줄이고 안정성을 높이십시오.
- PVDD, AVDD_BRF, AVDD33, AVDD33_AUD가 전원을 공유하는 경우, 전원 소스에서 각각 별도의 스타 분기로 라우팅하십시오. 상류 구간을 공유해서는 안 됩니다.
- VBUS와 VBAT는 경로를 공유하지 않는 독립적인 스타 분기로 라우팅하십시오. 민감한 신호 트레이스가 이 충전 경로와 나란히 지나가지 않게 하십시오.
- BUCK 인덕터와 필터 커패시터는 칩 핀 가까이에 배치하십시오. BUCK_LX는 짧고 넓게 유지하고, BUCK_FB 트레이스 폭은 0.25 mm보다 넓게 하십시오. DC/DC 출력 커패시터의 그라운드 단자는 여러 개의 그라운드 비아로 메인 그라운드 플레인에 연결하십시오. 인덕터 아래의 최상층에는 구리를 두지 말고, 인접 층에 빈틈없는 레퍼런스 플레인을 유지하며, 인덕터 영역으로 다른 신호를 지나가게 하지 마십시오.
- 커패시터 그라운드는 가까운 비아로 메인 그라운드에 연결하십시오.
- 3.3 V 전원 변형에서는 핵심 아날로그/RF/IO 레일에 스타 라우팅을 사용하십시오.

!!! warning "소스에서 해결되지 않은 전원 레일 충돌"
    - **트레이스 폭과 레일 표기:** 원본 PCB 가이드 3.2.1절은 `VCC`와 `PVDD` 모두 0.4 mm(약 15.7 mil) 이상으로 지정합니다. 배터리 전원 변형에 적용되는 자체 점검표 표 4-2-1-1의 44번 항목은 `VCC`를 12 mil 이상으로 지정하고, 3.3 V 전원 변형에 적용되는 47번 항목은 제목이 `PVDD`이지만 점검 세부 내용은 `VCC`를 12 mil 이상으로 지정합니다. 소스는 이 폭들 간의 차이를 해소하지 않으며, 47번 항목의 제목과 점검 세부 내용 중 어느 쪽이 의도한 레일을 가리키는지도 설명하지 않습니다. 수정된 값을 추정하거나 한 항목을 두 전원 변형에 모두 적용하지 마십시오. 확정하기 전에 SiFli에서 해당 레일, 적용 범위, 폭을 확인받으십시오.
    - **출력 이름:** 원본 PCB 가이드 3.2.1절에는 `VDD_VOUT1` / `VDD_VOUT2`로 나와 있고, 자체 점검표 표 4-2-1-1의 45/46번 항목과 이 페이지 6.2절의 빠른 참조 표에는 `VDD33_VOUT1` / `VDD33_VOUT2`로 나와 있습니다. 소스는 이 이름들이 별칭인지 서로 다른 네트인지 밝히지 않습니다. 46번 항목은 제목에 `VDD33_VOUT1`이 반복되어 있지만 점검 세부 내용에는 `VDD33_VOUT2`가 적혀 있습니다.
    SiFli의 확인 없이는 설계를 확정할 때 트레이스 폭을 선택하거나, 47번 항목을 특정 레일에 할당하거나, 출력 이름의 변형을 동일한 것으로 취급해서는 안 됩니다.

### 6.4. 크리스털 레이아웃

- RF 회로와 메인 칩 아래에는 빈틈없고 연속적인 레퍼런스 그라운드를 유지하고, 그라운드 플레인을 분할하거나 슬롯을 내지 마십시오. 크리스털 가이드도 크리스털 영역의 연속적인 레퍼런스 그라운드와 크리스털 아래의 구리 제거를 요구합니다. 아래 경고를 참조하고, SiFli가 스택업별 경계를 확인하기 전에는 이 구리 영역을 확정하지 마십시오.
- 크리스털은 칩 클럭 핀에서 1.5 mm 이상, 보드 가장자리에서 1 mm 넘게, PA, 충전, PMU 발열원에서 5 mm 이상 떨어뜨려 배치하여 온도에 의한 주파수 드리프트를 억제하십시오. 소스는 패키지 주위의 최상층 구리 클리어런스를 0.25 mm 이상으로 지정하고 인접 층의 금지 구역은 레퍼런스 디자인을 참조하라고 하지만, 이들이 패키지 아래 구리 금지 구역과 어떤 관계인지는 정의하지 않습니다. 레이아웃을 릴리스하기 전에 SiFli와 적용 경계를 확인하십시오. 크리스털 바로 아래로 고주파 디지털 신호를 라우팅하지 말고, 가능하면 영역 전체에 라우팅이 없도록 하십시오. 전원 인덕터 같은 자성 부품은 크리스털에서 멀리 떨어뜨리십시오.
- XI/XO는 최상층에서만, 층 변경 없이 라우팅하십시오. 트레이스는 짧고 대칭으로 유지하고, 양쪽을 따라 촘촘한 간격의 그라운드 비아로 3차원 그라운드 실드를 두십시오. 크리스털의 로드 커패시터는 트레이스의 크리스털 쪽 끝 가까이에 양쪽으로 배치하고, 각 커패시터의 그라운드 패드는 크리스털 그라운드 패드 가까이에 연결하십시오. 전원 비아는 크리스털 트레이스에서 멀리 떨어뜨리십시오.
- 48 MHz 크리스털은 길이 3~10 mm, 폭 0.1 mm의 최상층 트레이스를 사용하고, 나란한 48M_XI와 48M_XO 트레이스 사이의 간격은 0.15 mm 이상으로 하며 3차원 그라운드 실드를 적용하십시오. VBAT, DC/DC, 고속 신호에서 멀리 떨어뜨리고, 크리스털 영역은 최상층과 인접 층 모두 비워 두십시오.
- 32.768 kHz 크리스털은 길이 10 mm 이하, 폭 0.1 mm의 최상층 트레이스를 사용하십시오. 라우팅 모델은 나란한 32K_XI와 32K_XO 트레이스 사이의 간격을 0.15 mm 이상으로 지정하는 반면, 자체 점검표는 트레이스 폭의 2배 초과(폭 0.1 mm에서 >0.2 mm)를 요구합니다. SiFli가 어느 요구 사항이 적용되는지 확인하기 전에는 이 간격을 확정하지 마십시오. 3차원 그라운드 실드를 적용하고, 크리스털 영역은 최상층과 인접 층 모두 비워 두십시오.

!!! warning "소스의 크리스털 레이아웃 가이드에서 해결되지 않은 충돌"
    - **그라운드 실드와 구리 금지 구역:** PCB 가이드 3.3절은 크리스털 영역의 연속적인 레퍼런스 그라운드와 크리스털 주위의 최상층 구리 금지 구역을 요구합니다. 그림 3-3-1(여기서는 그림 6.9-30)은 패키지 주위 0.25 mm 이상을 제시합니다. 자체 점검표 표 4-3-1의 6번 항목은 크리스털과 오실레이터 트레이스 주위의 완전한 GND 실드를 요구하고, 7번 항목은 4층 PTH 보드에서는 TOP 층, 6층 HDI 보드에서는 TOP 층과 2층 모두에서 크리스털 아래에 구리를 두지 않도록 지정합니다. 소스는 실드 영역과 크리스털 금지 구역의 경계를 정의하지 않으며, 연속 그라운드 지침이 스택업별 구리 금지 층 안에서 어떻게 적용되는지도 설명하지 않습니다. 이는 해결되지 않은 적용 범위 충돌이므로 층별 구리 또는 그라운드 패턴을 추정하지 마십시오.
    - **32.768 kHz 트레이스 간격:** PCB 가이드 3.3절과 라우팅 모델 그림 3-3-4(여기서는 그림 6.9-33)는 나란한 `32K_XI` / `32K_XO` 트레이스 사이의 간격을 0.15 mm 이상으로 지정합니다. 자체 점검표 표 4-3-1의 9번 항목은 기본 트레이스 폭의 2배를 초과하는 간격을 요구하며, 이 가이드의 0.1 mm 트레이스에서는 0.2 mm를 초과하는 값입니다. 이들은 서로 충돌하는 최소 간격 요구 사항입니다.
    - **클리어런스 적용 범위:** 그림 3-3-1(여기서는 그림 6.9-30)은 패키지 주위 TOP 층 구리 클리어런스를 0.25 mm 이상으로 지정합니다. 자체 점검표 표 4-3-1의 7번 항목은 나열된 두 스택업에서 크리스털 아래에 구리가 없어야 하는 층을 별도로 정의하지만, 소스는 0.25 mm 둘레 클리어런스가 이 패키지 아래 영역이나 인접 층의 라우팅 배제 영역과 어떤 관계인지 설명하지 않습니다.
    이러한 충돌과 적용 범위의 공백은 SiFli의 소스 가이드에서 해결되지 않은 상태입니다. 레이아웃을 릴리스하기 전에 실제 패키지와 스택업에 대해 확인을 받으십시오. 간격 요구 사항 중 하나를 선택하거나 이 참고 자료에서 층별 그라운드/금지 구역 경계를 도출해서는 안 됩니다.

### 6.5. RF 레이아웃

- RF 매칭 회로는 칩 가까이에, 안테나에서는 멀리 배치하십시오. AVDD_BRF 필터 커패시터는 해당 칩 핀 옆에 배치하고, 그 그라운드는 비아로 메인 그라운드 플레인에 직접 연결하십시오.
- RF 트레이스는 짧게 유지하고 비아는 가능한 한 적게 사용하십시오.
- RF는 층 변경 없이 최상층에서 라우팅하는 것이 좋습니다. 해당되는 경우 10 mil보다 넓은 트레이스 폭을 권장합니다. 3차원 그라운드 실드를 적용하고, 예각 및 직각 굽힘을 피하며, PCB 스택업에 맞춰 임피던스를 50 Ω으로 제어하고, 양쪽을 따라 촘촘한 간격의 그라운드 비아를 두어 연속적인 비아 펜스를 형성하십시오.
- 안테나 영역은 안테나 벤더의 요구 사항과 제품의 산업 디자인 제약에 맞게 비워 두십시오.
- 매칭 부품의 패드 폭과 트레이스 폭이 맞지 않으면 임피던스 불연속이 생길 수 있습니다. 부품 패드 크기에 맞춰 패드 아래 그라운드 플레인을 잘라내면 임피던스 연속성을 유지하는 데 도움이 됩니다.
- IPEX 안테나 커넥터를 사용하는 경우, 그 아래의 모든 PCB 층에서 구리를 제거하십시오. PCB 안테나는 실제 보드에서 시뮬레이션하고 튜닝하며, CLC 매칭 회로를 예비로 두고 가능한 한 안테나 가까이에 배치하십시오.
- RF는 LCD FPC, USB, SDIO, DC/DC, 크리스털, 충전기 경로에서 멀리 떨어뜨리십시오.

### 6.6. 아날로그 및 오디오

- AVDD33_AUD, MIC_BIAS, AUD_VREF의 필터 커패시터는 각 칩 핀 옆에 배치하고, 각 커패시터의 그라운드를 PCB 메인 그라운드에 확실하게 연결하십시오.
- 아날로그 전원 디커플링 커패시터는 칩 가까이에 배치하십시오.
- 차동 오디오 트레이스의 길이를 맞추고 RC 회로는 칩 가까이에 배치하십시오.
- ADCP 입력 부품은 칩 핀 가까이에 배치하십시오. 트레이스는 짧게 유지하고 그라운드로 실드하며 강한 간섭원에서 멀리 떨어뜨리십시오.
- DACP/DACN 출력 부품은 칩 핀 가까이에 배치하십시오. 각 P/N 쌍은 차동 쌍으로 라우팅하고 짧게 유지하며 기생 커패시턴스를 10 pF 미만으로 제한하십시오. 3차원 그라운드 실드를 적용하고 트레이스를 강한 간섭원에서 멀리 떨어뜨리십시오.
- GPADC 트레이스에는 3차원 그라운드 실드를 적용하고, 배터리 및 온도 감지 같은 간섭 가능성이 있는 회로에서 멀리 떨어뜨리십시오.
- 오디오 영역으로 대전류 리턴 경로가 지나가지 않게 하십시오.

### 6.7. 고속 인터페이스

- USB DP/DN은 90 Ω 차동 쌍으로 라우팅하되, ESD 보호 소자를 먼저 거치도록 하십시오.
- MPI 스토리지 신호는 촘촘한 그룹으로 라우팅하고, 총 길이는 20 mm 이하, 그룹 내 길이 차이는 3 mm 이하로 유지하십시오. 클럭, 데이터, 커맨드 신호에는 연속적인 레퍼런스 그라운드와 함께 3차원 그라운드 실드를 적용하십시오.
- SDIO는 길이 50 mm 이하의 조밀한 그룹으로 라우팅하고, 그룹 내 스큐는 6 mm 이하로 하십시오. 클럭, 커맨드, 데이터 신호에 3차원 그라운드 실드를 적용하십시오.
- RGB/DPI, 8080, EPD 및 기타 병렬 디스플레이 버스는 연속적인 레퍼런스 그라운드 위에 유지하십시오.
- USB PA35(USB_DP)와 PA36(USB_DN)은 칩에 도달하기 전에 ESD 보호 소자를 거치도록 라우팅하십시오. 3차원 그라운드 실드를 적용한 90 Ω 차동 라우팅을 사용하고, ESD 소자의 그라운드를 메인 그라운드에 확실하게 연결하십시오.
- EMI 튜닝이 필요할 수 있는 고속 클럭에는 직렬 저항을 예비로 두십시오.

### 6.8. EMI, ESD, EOS

- 모든 외부 인터페이스의 ESD 보호를 검토하십시오.
- 실드 캔 밖에서 클럭, 전원 및 기타 노이즈원을 표면층에서 길게 라우팅하는 것을 피하고, 대신 내층에서 라우팅하십시오.
- 각 ESD 보호 소자는 해당 커넥터 핀 옆에 배치하십시오. 신호는 하위 회로에 도달하기 전에 ESD 소자를 거쳐야 하며, 보호 소자 앞에서 분기해서는 안 됩니다. 소자의 그라운드 핀은 짧고 넓은 연결로 비아를 통해 메인 그라운드에 직접 연결하십시오.
- USB, 충전기, 배터리 커넥터, 키, 터치, 디스플레이, 심박 센서, 안테나는 우선순위가 높은 보호 지점입니다.
- USB 충전 라인 테스트 포인트는 TVS 소자보다 앞단에 배치하십시오. 배터리 커넥터 TVS는 칩 회로보다 앞단에 배치하여 신호가 칩에 도달하기 전에 TVS를 거치도록 하십시오.
- 충전기 입력 보호는 OVP, EOS, ESD를 함께 고려하는 것이 좋습니다.

### 6.9. PCB 참고 그림

다음 그림은 SF32LB57x의 패키지, 풋프린트, 스택업, 팬아웃, 라우팅 및 보호 설계를 보여 주는 주요 참고 자료입니다.

QFN80L 랜드 패턴 참고 자료에는 중앙 노출 패드가 5.90 mm로 표기되어 있지만, 패키지 도면의 공칭 치수는 5.50 mm(5.40~5.60 mm)입니다. 전자는 PCB 랜드, 후자는 패키지 패드 치수이므로 서로 바꿔 적용해서는 안 됩니다. 라이브러리를 작성하기 전에 정확한 패키지 리비전과 SiFli 권장 풋프린트를 확인하십시오. QFN68L/QFN80L 스텐실 참고 자료는 두께 0.125 mm의 스텐실과 노출 패드의 페이스트 도포율 60%를 지정합니다. 스텐실 공급업체에 이 도포율에 맞는 개구부 치수인지 확인하도록 요청하십시오.

<!-- BGA-ONLY -->
BGA112 스텐실 참고 자료는 0.075 mm 스텐실을 사용하며, 0.18 mm 정사각형 개구부 112개와 R0.05 mm 모서리 반경을 적용합니다.
<!-- /BGA-ONLY -->

![그림 6.9-1: QFN68L 7 x 7 x 0.9 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-1: QFN68L 7 x 7 x 0.9 mm 패키지 치수</em></div>

![그림 6.9-2: QFN68L 7 x 7 x 1.1 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-2: QFN68L 7 x 7 x 1.1 mm 패키지 치수</em></div>

![그림 6.9-3: QFN68L PCB 랜드 패턴](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-3: QFN68L PCB 랜드 패턴</em></div>

![그림 6.9-4: QFN68L 스텐실 개구부](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-4: QFN68L 스텐실 개구부</em></div>

![그림 6.9-5: QFN80L 8 x 8 x 0.9 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-5: QFN80L 8 x 8 x 0.9 mm 패키지 치수</em></div>

![그림 6.9-6: QFN80L 8 x 8 x 1.1 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-6: QFN80L 8 x 8 x 1.1 mm 패키지 치수</em></div>

![그림 6.9-7: QFN80L PCB 랜드 패턴](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-7: QFN80L PCB 랜드 패턴</em></div>

![그림 6.9-8: QFN80L 스텐실 개구부](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-8: QFN80L 스텐실 개구부</em></div>

<!-- BGA-ONLY -->
![그림 6.9-9: BGA112 5.4 x 4.4 x 0.98 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-9: BGA112 5.4 x 4.4 x 0.98 mm 패키지 치수</em></div>

![그림 6.9-10: BGA112 5.4 x 4.4 x 1.03 mm 패키지 치수](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-10: BGA112 5.4 x 4.4 x 1.03 mm 패키지 치수</em></div>

![그림 6.9-11: BGA112 PCB 랜드 패턴](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-11: BGA112 PCB 랜드 패턴</em></div>

![그림 6.9-12: BGA112 스텐실 개구부](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-12: BGA112 스텐실 개구부</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-13: QFN 1.6 mm PCB 스택업 참고](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-13: QFN 1.6 mm PCB 스택업 참고</em></div>

![그림 6.9-14: QFN 0.8 mm PCB 스택업 참고](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-14: QFN 0.8 mm PCB 스택업 참고</em></div>

<!-- BGA-ONLY -->
![그림 6.9-15: BGA 1.6 mm PCB 스택업 참고](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-15: BGA 1.6 mm PCB 스택업 참고</em></div>

![그림 6.9-16: BGA 0.8 mm PCB 스택업 참고](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-16: BGA 0.8 mm PCB 스택업 참고</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-17: PTH PCB 설계 규칙](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-17: PTH PCB 설계 규칙</em></div>

![그림 6.9-18: PTH 비아 설계 규칙](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-18: PTH 비아 설계 규칙</em></div>

![그림 6.9-19: HDI PCB 설계 규칙](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-19: HDI PCB 설계 규칙</em></div>

![그림 6.9-20: HDI 비아 설계 규칙](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-20: HDI 비아 설계 규칙</em></div>

![그림 6.9-21: QFN68 최상층 팬아웃 참고](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-21: QFN68 최상층 팬아웃 참고</em></div>

![그림 6.9-22: QFN80 최상층 팬아웃 참고](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-22: QFN80 최상층 팬아웃 참고</em></div>

<!-- BGA-ONLY -->
![그림 6.9-23: BGA112 팬아웃 참고](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-23: BGA112 팬아웃 참고</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-24: QFN VCC 전원 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-24: QFN VCC 전원 라우팅</em></div>

<!-- BGA-ONLY -->
![그림 6.9-25: BGA VCC 전원 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-25: BGA VCC 전원 라우팅</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-26: QFN VBUS 및 VBAT 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-26: QFN VBUS 및 VBAT 라우팅</em></div>

<!-- BGA-ONLY -->
![그림 6.9-27: BGA VBUS 및 VBAT 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-27: BGA VBUS 및 VBAT 라우팅</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-28: QFN DCDC 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-28: QFN DCDC 라우팅</em></div>

<!-- BGA-ONLY -->
![그림 6.9-29: BGA DCDC 라우팅](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-29: BGA DCDC 라우팅</em></div>
<!-- /BGA-ONLY -->

![그림 6.9-30: 크리스털 배치 금지 구역](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-30: 크리스털 배치 금지 구역</em></div>

![그림 6.9-31: 48 MHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-31: 48 MHz 크리스털 라우팅 모델</em></div>

![그림 6.9-32: 48 MHz 크리스털 라우팅 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-32: 48 MHz 크리스털 라우팅 참고</em></div>

![그림 6.9-33: 32.768 kHz 크리스털 라우팅 모델](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-33: 32.768 kHz 크리스털 라우팅 모델</em></div>

![그림 6.9-34: 32.768 kHz 크리스털 라우팅 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-34: 32.768 kHz 크리스털 라우팅 참고</em></div>

![그림 6.9-35: RF 매칭 회로 레이아웃](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-35: RF 매칭 회로 레이아웃</em></div>

![그림 6.9-36: RF 신호 라우팅 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-36: RF 신호 라우팅 참고</em></div>

![그림 6.9-37: 오디오 전원 필터링 레이아웃](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-37: 오디오 전원 필터링 레이아웃</em></div>

![그림 6.9-38: 아날로그 오디오 입력 레이아웃](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-38: 아날로그 오디오 입력 레이아웃</em></div>

![그림 6.9-39: 아날로그 오디오 출력 레이아웃](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-39: 아날로그 오디오 출력 레이아웃</em></div>

![그림 6.9-40: SDIO 라우팅 모델](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-40: SDIO 라우팅 모델</em></div>

![그림 6.9-41: SDIO PCB 라우팅 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-41: SDIO PCB 라우팅 참고</em></div>

![그림 6.9-42: USB 부품 배치 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-42: USB 부품 배치 참고</em></div>

![그림 6.9-43: USB 라우팅 모델](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-43: USB 라우팅 모델</em></div>

![그림 6.9-44: USB PCB 라우팅 참고](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-44: USB PCB 라우팅 참고</em></div>

![그림 6.9-45: 전원 TVS 배치 참고](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-45: 전원 TVS 배치 참고</em></div>

![그림 6.9-46: EOS/TVS 그라운딩 참고](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>그림 6.9-46: EOS/TVS 그라운딩 참고</em></div>
