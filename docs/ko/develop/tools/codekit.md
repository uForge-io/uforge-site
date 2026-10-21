---
icon: lucide/app-window
description: "SiFli CodeKit의 VS Code 확장이 SiFli-SDK 개발 과정에서 어떤 역할을 하는지 설명합니다. 프로젝트 설정, 빌드/펌웨어 기록/모니터링 흐름, 문제 해결을 다룹니다."
tags:
    - 개발
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit은 SiFli-SDK 개발을 위한 VS Code 확장입니다. SDK 설정, 프로젝트 생성, 구성, 빌드, 펌웨어 기록, 로그 모니터링 흐름을 안내합니다.

처음 실행할 때는 [CodeKit 시작하기](../../getting-started/sifli/getting-started-sifli-codekit.md)를 참조하십시오. 이 페이지에서는 개발 과정에서 CodeKit을 어떻게 활용하는지 설명합니다.

주요 참고 자료:

- [SiFli CodeKit getting started](https://docs.sifli.com/projects/codekit/get-started/)

## 적합한 사용 사례 { #best-use-cases }

다음이 필요하다면 CodeKit을 사용하십시오.

- VS Code 중심의 SDK 워크플로.
- 안내에 따른 프로젝트 설정.
- 에디터에서 수행하는 보드 및 프로젝트 구성.
- 모든 명령을 외우지 않아도 실행할 수 있는 빌드/펌웨어 기록/모니터링 기능.
- SiFli-SDK를 처음 접하는 개발자를 위한 더 원활한 경로.

CI 스크립트를 작성하거나 툴체인 경로 문제를 디버깅하거나 양산/릴리스 절차를 준비할 때는 명령줄 기반 SDK 작업 흐름을 사용하십시오. CodeKit은 개발 생산성을 높이는 보조 계층이며 SDK 빌드에 대한 이해를 대신하지 않습니다.

## SiFli-SDK와의 관계 { #relationship-to-sifli-sdk }

CodeKit은 SDK 워크플로를 감싸는 도구이며 SDK를 대체하지 않습니다. 근본적인 개념은 여전히 중요합니다.

- SDK 루트.
- 보드 이름.
- 프로젝트 디렉터리.
- 빌드 출력.
- 펌웨어 기록/다운로드 경로.
- 시리얼 모니터.

CodeKit에서 수행한 작업이 실패하면 가능할 경우 이에 해당하는 SDK 명령을 직접 실행해 같은 문제를 재현하십시오. 이렇게 하면 버그 리포트가 명확해지고 확장 프로그램 문제와 SDK 문제를 구분하기 쉬워집니다.

지원되는 기준 구성은 [SiFli-SDK](../platforms/sifli-sdk/overview.md)에서 확인하고, 명령줄에서도 같은 작업을 재현하는 방법은 [빌드, 플래싱, 모니터링](../platforms/sifli-sdk/build-flash-monitor.md)에서 확인하십시오. CodeKit 프로젝트를 변경하기 전에는 요구 사항과 맞는 [SDK 예제](../examples/index.md)부터 살펴보십시오.

## 운영 방식 { #operational-model }

CodeKit은 에디터에서 수행한 작업을 기반 SDK에서도 재현할 수 있을 때 가장 유용합니다. 확장 프로그램은 조작 인터페이스로, SiFli-SDK는 툴체인, 보드 정의, 빌드 출력, 다운로드 산출물의 기준으로 사용하십시오.

[SiFli CodeKit 시작하기](../../getting-started/sifli/getting-started-sifli-codekit.md) 페이지에서는 확장 프로그램 설치와 `hello_world` 실행을 다룹니다. 기준 구성이 동작하면 CodeKit으로 편집-빌드-펌웨어 기록-모니터링 흐름을 단축하십시오. 작업을 자동화하거나 점검하거나 VS Code 밖에서 재현해야 할 때는 SDK 명령줄을 사용하십시오.

## 기록할 항목 { #what-to-record }

모든 CodeKit 프로젝트에 대해 다음을 기록하십시오.

- CodeKit 확장 프로그램 버전.
- SiFli-SDK 경로와 SDK 브랜치.
- CodeKit에서 선택한 보드.
- 이에 해당하는 SDK 보드 이름.
- 빌드 출력 디렉터리.
- 펌웨어 기록/다운로드 동작.
- 시리얼 모니터 보레이트.

이렇게 하면 필요할 때 GUI 동작을 명령줄에서 재현할 수 있습니다.

## 문제 발생 시 대응 { #failure-boundaries }

<div align="center"><em>표: 문제 해결 전략</em></div>

<div align="center" markdown>

| 실패 | 권장 조치 |
|:--------|:---------------|
| SDK를 찾을 수 없음 | SDK 루트를 다시 선택하고 SDK 설치가 완료되었는지 확인합니다. |
| 빌드 실패 | 가능하면 동일한 프로젝트를 `scons`로 재현합니다. |
| 첫 실행 기준 구성은 동작하지만 플래시 실패 | 프로젝트의 보드와 출력 디렉터리를 기준 구성과 비교한 뒤 포트 점유 여부와 다운로드 모드를 확인합니다. |
| 모니터에 깨진 문자가 표시됨 | 보레이트와 선택한 포트를 확인합니다. |
| UI 명령이 없음 | 명령 팔레트에서 `SiFli`를 검색합니다. |

</div>
