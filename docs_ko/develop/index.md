---
icon: lucide/code-2
title: "개발 개요"
description: "SiFli-SDK로 SF32 제품을 개발하기 위한 작업 중심 안내서: 일상 워크플로, 애플리케이션 노트, 예제, 도구, 펌웨어 주제, 커뮤니티 경로."
tags:
    - 개발
    - 소프트웨어
---

# 개발 개요 { #develop }

개발 섹션은 동작하는 SF32 보드를 유지보수 가능한 제품 펌웨어로 발전시킵니다. 첫 `hello_world` 실행에 성공한 뒤에 이 섹션을 사용하여 보드 구성을 선택하고, 반복 가능하게 빌드하고 플래시하고, 가장 가까운 예제를 적용하고, 제품 기능을 통합하고, 오류를 진단하고, 업데이트와 복구를 계획하십시오.

첫 보드 실행에는 [시작하기](../getting-started/index.md)를, 디바이스와 개발 보드를 선택하려면 [SF32 제품](../sf32-products/index.md)을, 회로도와 양산 하드웨어에는 [하드웨어](../hardware/index.md)를, 아키텍처 배경 지식에는 [학습](../learn/index.md)을 사용하십시오. 엔지니어링 워크플로와 작업별 구현 지침이 필요할 때 이 섹션을 사용하십시오.

!!! info "SiFli-Solution"
    SiFli-Solution은 별도의 SiFli 소프트웨어 패키지이며 μForge.io는 현재 이를 문서화하지 않습니다. 여기서의 안내는 SiFli-SDK와 아래에 나열한 커뮤니티 경로로 한정됩니다. 제품에 더 완전한 디스플레이 디바이스 솔루션이 필요하다면 공식 [SiFli Solution 문서](https://docs.sifli.com/projects/solution/index.html)를 참조하고 SiFli와 직접 협의하십시오. 이 경로를 사용하는 복잡한 제품은 SiFli의 깊고 직접적인 관여가 필요할 수 있습니다.

## SiFli-SDK 기준 구성 확립 { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md)는 RT-Thread 기반의 SiFli 공식 소프트웨어 패키지이자 SF32 펌웨어의 레퍼런스 개발 경로입니다. 다른 생태계를 평가해야 할 뚜렷한 이유가 없다면 여기서 시작하십시오. 보드 지원, Bluetooth, 그래픽, 오디오, 스토리지, 전원 관리, 양산 작업에 걸쳐 문서화된 기준 구성 중 가장 폭넓습니다.

제품 기능을 만들기 전에, 재현 가능한 기준 구성 하나를 확립하고 기록하십시오.

1. [보드 설정](platforms/sifli-sdk/board-configuration.md)에서 정확한 SDK 보드 구성을 선택합니다.
2. [빌드, 플래시, 모니터](platforms/sifli-sdk/build-flash-monitor.md) 루프를 성공적으로 실행합니다.
3. SDK 릴리스 또는 커밋, 보드 이름, 빌드 명령, 플래시 명령, 시리얼 설정, 부팅 로그를 저장합니다.
4. 가장 가까운 [예제](examples/index.md)에서 시작합니다. 특히 제품에서 가장 어려운 서브시스템을 이미 다루는 예제가 좋습니다.

이렇게 만들어진 기록은 이후의 애플리케이션 변경, 보드 포팅, 테스트 실패, 현장 복구의 기준점이 됩니다.

## 작업별 안내 찾기 { #find-guidance-by-task }

<div align="center"><em>표: SF32 개발 작업</em></div>

<div align="center" markdown>

| 작업 | 시작 위치 | 이어서 사용할 문서 |
|:----------------|:-----------|:---------|
| 펌웨어 빌드 및 플래시, 시리얼 출력 확인 | [빌드, 플래시, 모니터](platforms/sifli-sdk/build-flash-monitor.md) | 스크립트 기반 플래싱, 트레이스, 크래시 유틸리티는 [도구](tools/index.md). |
| 펌웨어를 개발 보드, 모듈 또는 맞춤형 하드웨어에 맞추기 | [보드 설정](platforms/sifli-sdk/board-configuration.md) | 관련 하드웨어 가이드와 가장 가까운 보드별 예제. |
| 프로젝트 간에 드라이버나 미들웨어 계층 재사용 | [컴포넌트와 `sf_pkg`](platforms/sifli-sdk/components.md) | 최소 예제와 문서화된 구성 경계. |
| 구체적인 주변 장치 또는 서브시스템 구현 | [SDK 애플리케이션 노트](platforms/sifli-sdk/sdk-application-notes.md) | 정확한 API, 구성 심볼, 명령은 연결된 공식 SDK 사용 가이드. |
| 이미 동작하는 코드에서 제품 작업 시작 | [예제](examples/index.md) | 일치하는 보드 구성을 사용하고, 변경할 때마다 테스트합니다. |
| 오류 진단 또는 제품 근거 수집 | [디버깅 및 진단](platforms/sifli-sdk/debugging-diagnostics.md) | [로깅 및 크래시 분석](firmware-topics/logging-crash-analysis.md). |
| 부트 레이아웃, 스토리지, 업데이트, USB 또는 전원 동작 변경 | [펌웨어 주제](firmware-topics/index.md) | 코드를 변경하기 전에 관련 파티션, 업데이트, USB, 전원 또는 로깅 주제. |

</div>

## SiFli-SDK 애플리케이션 노트 { #sifli-sdk-application-notes }

애플리케이션 노트 모음은 SDK 카탈로그 순서가 아니라 통합 작업별로 구성되어 있습니다. 당면한 서브시스템부터 시작하십시오. 구성이나 명령을 적용하기 전에 명시된 칩 제품군 범위, 보드 구성, SDK 릴리스, 하드웨어 전제 조건을 확인하십시오.

<div align="center"><em>표: SiFli-SDK 애플리케이션 노트 경로</em></div>

<div align="center" markdown>

| 엔지니어링 영역 | 애플리케이션 노트 시작점 |
|:-----------------|:--------------------------------|
| 아날로그와 센서 | [GPADC로 샘플링하기](platforms/sifli-sdk/application-notes/adc-sampling.md) · [센서 통합 및 읽기](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| 스토리지와 그래픽 에셋 | [외부 플래시 사용](platforms/sifli-sdk/application-notes/external-flash.md) · [EZIP으로 그래픽 에셋 압축하기](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| 신뢰성, 전원, 디버깅 | [워치독 설정](platforms/sifli-sdk/application-notes/watchdog.md) · [저전력 구성 및 측정](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [로그 캡처와 크래시 분석](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| RF 및 Bluetooth 검증 | [SiFli SDK RF 테스트 실행](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Bluetooth 시그널링 테스트 실행하기](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Bluetooth 단일 항목 RF 테스트 실행하기](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## 개발 섹션 둘러보기 { #navigate-the-develop-section }

<div align="center"><em>표: 개발 섹션 맵</em></div>

<div align="center" markdown>

| 영역 | 목적 |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | 지원되는 레퍼런스 워크플로(구성, 빌드, 플래싱, 재사용 가능한 컴포넌트, 진단)를 확립합니다. |
| [SDK 애플리케이션 노트](platforms/sifli-sdk/sdk-application-notes.md) | ADC, 센서, 외부 플래시, 저전력, 진단, RF, Bluetooth 테스트 같은 특정 작업에 SDK를 적용합니다. |
| [예제](examples/index.md) | 정확한 보드와 제품에서 가장 어려운 서브시스템에 맞는 동작 구현을 선택하고 적용합니다. |
| [도구](tools/index.md) | 워크플로에 맞는 플래싱, 모니터, 트레이스, 크래시, 에셋, 양산 도구를 선택합니다. |
| [펌웨어 주제](firmware-topics/index.md) | 파티션, OTA/DFU, USB, 전원 관리, 진단 근거에 관한 여러 영역에 걸친 제품 결정을 내립니다. |
| [실험적 / 커뮤니티](platforms/zephyr/overview.md) | 각 페이지에 명시된 범위와 성숙도 한계를 고려하여 Zephyr, Arduino, MicroPython 또는 Rust를 평가합니다. |

</div>

## 커뮤니티 경로는 신중하게 평가하기 { #evaluate-community-paths-deliberately }

[실험적 / 커뮤니티](platforms/zephyr/overview.md) 그룹은 레퍼런스 SDK 경로를 벗어나 작업해야 할 이유가 있는 팀을 위한 것입니다. 동등한 양산 지원을 의미하지는 않습니다.

<div align="center"><em>표: 커뮤니티 경로 적합성</em></div>

<div align="center" markdown>

| 경로 | 고려할 때 | 간주할 대상 |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Zephyr API, devicetree, Kconfig 또는 다운스트림 보드 작업이 필요한 경우. | 다운스트림의 보드별 평가 경로. |
| [Arduino](platforms/arduino/overview.md) | 지원되는 보드에서 스케치나 빠른 주변 장치 프로토타입이 필요한 경우. | 베타 단계의 보드 한정 경로. |
| [MicroPython](platforms/micropython/status.md) | 향후의 스크립팅 지원을 평가하는 경우. | 재현 가능한 공개 포트가 생길 때까지는 상태 페이지. |
| [Rust](platforms/rust/overview.md) | HAL/PAC 작업을 평가하고 업스트림에 수정 사항을 기여할 수 있는 경우. | 커뮤니티가 개발 중인 경로. |

</div>

제품을 이러한 경로 중 하나에 확정하기 전에, 필요한 모든 주변 장치, 플래시 레이아웃, 디버그 방법, 복구 절차를 정확한 보드에서 검증하십시오. 테스트한 리비전, 구성, 명령, 결과는 제품 소스와 함께 보관하십시오.

## 제품화 준비가 된 개발 근거 { #product-ready-development-evidence }

펌웨어 경로를 제품화 준비가 된 것으로 간주하기 전에, 다음 질문에 답할 수 있는지 확인하십시오.

- 어떤 칩, 보드 또는 맞춤형 하드웨어 리비전, 구성을 테스트했습니까?
- 어떤 SDK, 패키지, 브랜치 또는 커밋으로 펌웨어를 만들었습니까?
- 어떤 빌드, 플래시, 모니터링, 전체 복구 명령이 동작합니까?
- 필요한 각 주변 장치와 제품 서브시스템을 어떤 예제나 테스트가 입증합니까?
- 어떤 파티션 레이아웃, 업데이트 동작, 전력 목표, 크래시 디코딩 경로를 검증했습니까?

답이 없는 항목이 있다면 그 작업은 유용한 프로토타입일 수는 있지만, 아직 반복 가능한 제품 기준 구성은 아닙니다.
