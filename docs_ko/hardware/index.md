---
icon: lucide/cpu
title: 하드웨어
description: SF32 레퍼런스 기준 구성을 재사용하거나 선택한 디바이스를 구현한 다음, 양산을 위해 설계를 준비합니다.
---

# 하드웨어 { #hardware }

SF32 디바이스를 선택하고 개발 보드 기준 구성을 검증한 후에는 이 섹션을 사용하여 보드 또는 모듈 캐리어를 설계하고 양산을 준비하십시오. 맞는 레퍼런스 디자인이 있으면 그것으로 시작하고, 디바이스별 구현 가이드를 따르며, 양산 준비 검토에 필요한 근거와 설계 패키지를 정리하십시오.

## 시작점 선택 { #choose-a-starting-point }

<div align="center"><em>하드웨어 경로</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 작업 | 시작 위치 | 결과 |
|:----------|:-----------|:--------|
| 검증된 하드웨어 및 소프트웨어 기준 구성 재사용 | [레퍼런스 디자인](reference-designs/reference-designs.md) | 재현 가능한 출발점, 검증 중점 사항, 재사용 범위. |
| 칩 다운 보드 또는 모듈 캐리어 설계 | [해당 가이드 찾기](#find-a-guide) | 해당 칩 또는 모듈의 구현 지침과 사용 가능한 체크리스트. |
| M2 제안을 사용한 모듈 인터페이스 계획 | [모듈 인터페이스 표준](m2-modules/interface-standards-overview.md) | 선택한 모듈에 대해 확인해야 하는 M2 명명 규칙과 핀 수준의 초안 제안. |
| CAD 및 BOM 자산 준비 | [부품 및 CAD 라이브러리](cad-components/components-and-cad-libraries.md) | 공식 EDA 라이브러리, AVL 자료, 선택한 부품에 필요한 검증 항목. |
| 설계 패키지 릴리스 | [양산 설계](design-for-production.md) | 양산 준비 검토, 보관할 근거, 제조 인계. |

</div>

## 가이드 찾기 { #find-a-guide }

설계의 중심이 되는 칩 또는 모듈을 선택한 다음 해당 구현 자료를 여십시오. 패키지, 전원 기준, 메모리 등급, 통합 방식을 아직 확인해야 한다면 먼저 제품 소개를 사용하십시오.

### 칩 가이드와 체크리스트 { #chip-guides-and-checklists }

<div align="center"><em>표: 칩 가이드와 체크리스트</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 선택한 칩 제품군 | 하드웨어 설계 가이드 | 체크리스트 | 시작할 때 |
|:---------------------|:----------------------|:----------|:----------------|
| SF32LB52x | [가이드](chip-guides/SF32LB52x_hardware_design_guide.md) | [체크리스트](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | SF32LB52x 칩 다운 보드를 설계하는 경우. |
| SF32LB55x | [가이드](chip-guides/SF32LB55x_hardware_design_guide.md) | [체크리스트](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | SF32LB55x 칩 다운 보드를 설계하는 경우. |
| SF32LB56x | [가이드](chip-guides/SF32LB56x_hardware_design_guide.md) | [체크리스트](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | SF32LB56x 칩 다운 보드를 설계하는 경우. |
| SF32LB57x | 가이드 | 회로도 / PCB 레이아웃 | SF32LB57x 칩 다운 보드를 설계하는 경우. |
| SF32LB58x | [가이드](chip-guides/SF32LB58x_hardware_design_guide.md) | [체크리스트](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | SF32LB58x 칩 다운 보드를 설계하는 경우. |

</div>

### 모듈 가이드 { #module-guides }

<div align="center"><em>표: 모듈 통합 가이드</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 선택한 모듈 | 모듈 가이드 | 용도 |
|:----------------|:-------------|:-----------|
| SF32LB52-MOD-1 | [모듈 가이드](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | 캐리어 보드 전원, 핀 계획, 안테나 클리어런스, 제조 취급. |
| SF32LB56-MOD | [모듈 가이드](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | 캐리어 보드 통합, 전원, RF 배치, 인터페이스, 검증. |
| SF32LB58-MOD | [모듈 가이드](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | 캐리어 보드 전원, 핀 계획, 안테나 클리어런스, 제조 취급. |

</div>

## 하드웨어 경로 따라가기 { #follow-the-hardware-path }

1. **맞는 경우 레퍼런스 기준 구성 재사용.** 적용하기 전에 명시된 보드 및 소프트웨어 기준 구성을 먼저 재현하십시오. 그렇지 않으면 선택한 디바이스 가이드로 바로 시작하십시오.
2. **구현 및 검토.** 회로도 작성에 들어가기 전에 해당 가이드를 사용하고, 회로도 및 레이아웃 검토 중에 그 체크리스트를 적용하십시오. 하드웨어를 동결하기 전에 가장 가까운 [개발 보드](../sf32-products/index.md)에서 의도한 소프트웨어와 주변 장치 경로를 검증하십시오. 개발 보드 테스트가 최종 보드에서의 전원, 핀 기능, RF 검증을 대신하지는 않습니다.
3. **캐리어가 M2 제안을 따르도록 의도된 경우 M2 자료 사용.** [M2 명명 규칙](m2-modules/M2%20Interface%20Naming%20Rules.md)을 적용하고, 인터페이스를 확정하기 전에 [인터페이스 정의](m2-modules/M2-interface-definition.md)를 정확한 모듈과 대조하여 확인하십시오. 핀 수준의 정의는 아직 초안입니다.
4. **CAD와 부품 선택 검증.** [CAD 및 부품](cad-components/components-and-cad-libraries.md)을 사용하여 정확한 부품의 심볼, 풋프린트, 패키지 도면, AVL, 핵심 부품 가정을 교차 확인하십시오.
5. **릴리스 게이트 종료.** 설계 근거, 승인된 편차, 남은 리스크, 제조 테스트 가정을 갖추고 [양산 설계](design-for-production.md)로 넘어가십시오.

## 개발 계속하기 { #stay-connected-to-the-platform-path }

부품, 모듈 또는 보드 방향이 아직 불확실하다면 [SF32 제품](../sf32-products/index.md)으로 돌아가십시오. 반복 가능한 툴체인, 플래시, 시리얼 로그 기준 구성이 필요하면 [시작하기](../getting-started/index.md)를 사용하십시오. 하드웨어와 함께 검증해야 하는 소프트웨어 구현 지침은 [개발](../develop/index.md)에서 이어서 확인하십시오.
