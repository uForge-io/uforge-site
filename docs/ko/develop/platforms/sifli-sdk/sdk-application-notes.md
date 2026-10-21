---
icon: lucide/notebook-tabs
title: "SDK 애플리케이션 노트"
description: "SF32 개발을 위한 SiFli-SDK 사용 가이드를 작업별로 정리하고 관련 원문으로 이어 주는 안내입니다."
tags:
    - 개발
    - SiFli-SDK
    - 애플리케이션 노트
---

# SDK 애플리케이션 노트 { #sdk-application-notes }

이 페이지는 SiFli-SDK 사용 가이드를 엔지니어링 작업별로 정리해, 필요한 절차와 제품 개발 기록으로 남겨야 할 검증 항목을 빠르게 찾도록 돕습니다.

이 문서들은 각 주제를 이해하고 통합하기 위한 실무 안내이며 SDK 매뉴얼을 대체하지 않습니다. 구성, API, 예제 또는 테스트 절차를 적용하기 전에 공식 [SiFli SDK Usage Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html)에서 대상 칩 제품군과 SDK 릴리스를 선택하십시오.

## 작업별 읽기 { #read-by-task }

<div align="center"><em>표: SDK 애플리케이션 노트 읽기 경로</em></div>

<div align="center" markdown>

| 작업 | 다음과 같은 경우 여기서 시작 | 공식 사용 가이드 주제 |
|:-----|:----------------------------|:--------------------------|
| [GPADC로 샘플링하기](application-notes/adc-sampling.md) | 범용 ADC 측정 경로를 구성할 때. | ADC Usage Guide (GPADC) |
| [센서 통합 및 읽기](application-notes/sensor-integration.md) | 외부 센서를 연결하고 검증할 때. | Sensor Adding Guide |
| [외부 플래시 사용](application-notes/external-flash.md) | 데이터, 에셋, 파일 시스템을 플래시에 저장할 때. | Flash Usage Guide |
| [워치독 설정](application-notes/watchdog.md) | 워치독 복구 경로를 검증할 때. | Watchdog Usage Guide |
| [EZIP으로 그래픽 에셋 압축하기](application-notes/ezip-image-assets.md) | EZIP 이미지 리소스를 변환하고 통합할 때. | EZIP Image Conversion Tool Usage |
| [저전력 구성 및 측정](application-notes/low-power-measurement.md) | 전원 상태를 구성하고 측정값을 비교할 때. | Low Power Development Guide |
| [로그 캡처와 크래시 분석](application-notes/crash-analysis.md) | 서로 일치하는 로그, 크래시 발생 정보, 심볼을 보존할 때. | Crash Analysis Guide; Debugging and Logging |
| [SiFli-SDK RF 테스트 실행](application-notes/rf-performance-tests.md) | 시그널링, 논시그널링, 개별 RF 검증 중 적절한 방식을 선택할 때. | SiFli SDK RF Test Guide |
| [Bluetooth 시그널링 테스트 실행하기](application-notes/bluetooth-signalling-tests.md) | 프로토콜 기반 Bluetooth 검증을 수행할 때. | Bluetooth Signaling Test Guide |
| [Bluetooth 단일 항목 RF 테스트 실행하기](application-notes/bluetooth-single-tone-tests.md) | 선택한 항목의 Bluetooth 개별 RF 테스트 절차를 따를 때. | Bluetooth Individual RF Test Guide |

</div>

## 이 문서들의 활용 방법 { #how-to-use-these-articles }

1. 지금 수행할 엔지니어링 작업에 해당하는 제목의 페이지부터 시작합니다.
2. 예제나 명령을 적용하기 전에 문서에 명시된 프로젝트, 보드, 릴리스, 구성, 하드웨어 사전 조건을 확인하고 준비합니다.
3. 정확한 경로, 구성 심볼, 명령, API, 도구 리비전은 링크된 SDK 문서에서 확인합니다.
4. 검증한 보드, SDK 릴리스, 구성 파일, 테스트 장비, 관찰 결과를 프로젝트의 검증 기록에 남깁니다.

여러 플랫폼에 공통되는 아키텍처 결정은 [펌웨어 주제](../../firmware-topics/index.md)를 참조하십시오. SDK와 커뮤니티 경로에서 사용할 수 있는 예제 기준 구성은 [예제](../../examples/index.md)에서 확인하십시오.
