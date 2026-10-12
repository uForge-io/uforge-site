---
icon: lucide/notebook-tabs
title: "SDK 애플리케이션 노트"
description: "SF32 개발을 위한 SiFli-SDK 사용 가이드를 작업 중심으로 정리하고 소스를 연결한 읽기 경로입니다."
tags:
    - Develop
    - SiFli-SDK
    - Application Notes
---

# SDK 애플리케이션 노트 { #sdk-application-notes }

이 페이지는 SiFli-SDK 사용 가이드를 엔지니어링 작업별로 정리하여, 관련 워크플로와 제품에 보관해야 할 검증 기록을 빠르게 찾을 수 있도록 합니다.

이 문서들은 각 주제를 이해하고 통합하기 위한 실무 지침이며 SDK 매뉴얼을 대체하지 않습니다. 구성, API, 예제, 테스트 절차를 사용하기 전에 공식 [SiFli SDK Usage Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html)에서 대상 칩 계열과 SDK 릴리스를 선택하십시오.

## 작업별 읽기 { #read-by-task }

<div align="center"><em>표: SDK 애플리케이션 노트 읽기 경로</em></div>

<div align="center" markdown>

| 작업 | 다음과 같은 경우 여기서 시작 | 공식 사용 가이드 주제 |
|:-----|:----------------------------|:--------------------------|
| [GPADC로 샘플링하기](application-notes/adc-sampling.md) | 범용 ADC 측정 경로를 구축해야 할 때. | ADC Usage Guide (GPADC) |
| [센서 통합 및 읽기](application-notes/sensor-integration.md) | 외부 센서를 연결하고 검증해야 할 때. | Sensor Adding Guide |
| [외부 플래시 사용](application-notes/external-flash.md) | 데이터, 에셋, 파일 시스템을 플래시에 저장해야 할 때. | Flash Usage Guide |
| [워치독 설정](application-notes/watchdog.md) | 워치독 복구 경로를 검증해야 할 때. | Watchdog Usage Guide |
| [EZIP으로 그래픽 에셋 압축하기](application-notes/ezip-image-assets.md) | EZIP 이미지 리소스를 변환하고 통합해야 할 때. | EZIP Image Conversion Tool Usage |
| [저전력 구성 및 측정](application-notes/low-power-measurement.md) | 전력 상태를 구성하고 측정값을 비교해야 할 때. | Low Power Development Guide |
| [로그 캡처와 크래시 분석](application-notes/crash-analysis.md) | 서로 대응하는 로그, 크래시 컨텍스트, 심볼을 보존해야 할 때. | Crash Analysis Guide; Debugging and Logging |
| [SiFli SDK RF 테스트 실행](application-notes/rf-performance-tests.md) | 시그널링, 논시그널링, 개별 항목 RF 검증 중에서 선택해야 할 때. | SiFli SDK RF Test Guide |
| [Bluetooth 시그널링 테스트 실행하기](application-notes/bluetooth-signalling-tests.md) | 프로토콜 기반 Bluetooth 검증을 수행해야 할 때. | Bluetooth Signaling Test Guide |
| [Bluetooth 단일 항목 RF 테스트 실행하기](application-notes/bluetooth-single-tone-tests.md) | 선택한 항목에 대한 Bluetooth 개별 RF 테스트 절차를 따라야 할 때. | Bluetooth Individual RF Test Guide |

</div>

## 이 문서들의 활용 방법 { #how-to-use-these-articles }

1. 당면한 엔지니어링 작업과 제목이 일치하는 페이지부터 시작합니다.
2. 예제나 명령을 적용하기 전에 명시된 프로젝트, 보드, 릴리스, 구성, 하드웨어 선행 조건을 갖춥니다.
3. 정확한 경로, 구성 심볼, 명령, API, 도구 리비전은 연결된 SDK 소스를 사용합니다.
4. 검증한 보드, SDK 릴리스, 구성 파일, 테스트 장비, 관찰 결과를 프로젝트 증빙에 기록합니다.

플랫폼에 걸친 아키텍처 의사결정은 [펌웨어 주제](../../firmware-topics/index.md)를 사용하십시오. SDK와 커뮤니티 경로 전반의 지원되는 예제 기준 구성은 [예제](../../examples/index.md)를 사용하십시오.
