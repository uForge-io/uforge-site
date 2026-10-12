---
icon: lucide/app-window
description: "SiFli CodeKit의 VS Code 확장이 SiFli-SDK 개발에서 어떤 위치에 있는지 설명합니다. 프로젝트 설정, 빌드/플래시/모니터 워크플로, 문제 해결을 다룹니다."
tags:
    - Develop
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit은 SiFli-SDK 개발을 위한 VS Code 확장입니다. SDK 설정, 프로젝트 생성, 구성, 빌드, 플래시, 모니터 워크플로를 안내합니다.

처음 실행할 때는 [CodeKit 시작하기](../../getting-started/sifli/getting-started-sifli-codekit.md)을 참조하십시오. 이 페이지는 개발 워크플로에서 CodeKit이 차지하는 위치를 설명합니다.

주요 참고 자료:

- [SiFli CodeKit getting started](https://docs.sifli.com/projects/codekit/get-started/)

## 적합한 사용 사례 { #best-use-cases }

다음이 필요하다면 CodeKit을 사용하십시오.

- VS Code 중심의 SDK 워크플로.
- 안내형 프로젝트 설정.
- 에디터에서 수행하는 보드 및 프로젝트 구성.
- 모든 명령을 외우지 않고 사용하는 빌드/플래시/모니터 동작.
- SiFli-SDK를 처음 접하는 개발자를 위한 더 원활한 경로.

CI 스크립트를 작성하거나, 툴체인 경로 문제를 디버깅하거나, 공장/릴리스 절차를 준비할 때는 명령줄 SDK 플로를 사용하십시오. CodeKit은 개발자 생산성을 높이는 계층이며, SDK 빌드에 대한 이해를 대체하지 않습니다.

## SiFli-SDK와의 관계 { #relationship-to-sifli-sdk }

CodeKit은 SDK 워크플로를 감싸는 도구이며 SDK를 대체하지 않습니다. 근본적인 개념은 여전히 중요합니다.

- SDK 루트.
- 보드 이름.
- 프로젝트 디렉터리.
- 빌드 출력.
- 플래싱 경로.
- 시리얼 모니터.

CodeKit 동작이 실패하면 가능한 한 그 바탕이 되는 SDK 명령을 재현하십시오. 그러면 버그 리포트가 더 명확해지고 확장 프로그램 문제와 SDK 문제를 구분하는 데 도움이 됩니다.

지원되는 기준 구성을 고르려면 [SiFli-SDK](../platforms/sifli-sdk/overview.md)를, 그에 해당하는 명령줄 증거를 보관하려면 [빌드, 플래시, 모니터](../platforms/sifli-sdk/build-flash-monitor.md)를 사용하십시오. CodeKit 프로젝트를 변경하기 전에 일치하는 [SDK 예제](../examples/index.md)에서 시작하십시오.

## 운영 방식 { #operational-model }

CodeKit은 에디터 동작을 바탕이 되는 SDK에서 재현할 수 있을 때 가장 유용합니다. 확장 프로그램은 SDK를 조작하는 도구로 취급하고, 툴체인, 보드 정의, 빌드 출력, 플래싱 산출물의 기준은 SiFli-SDK로 두십시오.

[SiFli CodeKit 시작하기](../../getting-started/sifli/getting-started-sifli-codekit.md) 페이지는 확장 프로그램 설치와 `hello_world` 실행을 다룹니다. 해당 기준 구성이 동작하면 CodeKit으로 편집–빌드–플래시–모니터 루프를 단축하고, 동작을 자동화하거나 점검하거나 VS Code 밖에서 재현해야 할 때는 SDK 명령줄을 사용하십시오.

## 기록할 항목 { #what-to-record }

모든 CodeKit 프로젝트에 대해 다음을 기록하십시오.

- CodeKit 확장 프로그램 버전.
- SiFli-SDK 경로와 SDK 브랜치.
- CodeKit에서 선택한 보드.
- 이에 해당하는 SDK 보드 이름.
- 빌드 출력 디렉터리.
- 플래싱 동작.
- 시리얼 모니터 baud rate.

이렇게 하면 필요할 때 GUI 동작을 명령줄에서 재현할 수 있습니다.

## 실패 경계 { #failure-boundaries }

<div align="center"><em>표: 문제 해결 전략</em></div>

<div align="center" markdown>

| 실패 | 권장 조치 |
|:--------|:---------------|
| SDK를 찾을 수 없음 | SDK 루트를 다시 선택하고 SDK 설치가 완료되었는지 확인합니다. |
| 빌드 실패 | 가능하면 동일한 프로젝트를 `scons`로 재현합니다. |
| 첫 실행 기준 구성이 동작한 후 플래시 실패 | 프로젝트 보드/출력을 동작하던 기준 구성과 비교한 다음 포트 점유 여부와 다운로드 모드를 확인합니다. |
| 모니터에 깨진 문자가 표시됨 | baud rate와 선택한 포트를 확인합니다. |
| UI 명령이 없음 | 명령 팔레트에서 `SiFli`를 검색합니다. |

</div>
