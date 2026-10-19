---
icon: lucide/wrench
description: "SF32 개발 도구를 사용 사례별로 정리합니다. sftool, SDK UART 다운로드 스크립트, CodeKit 기능, 크래시/트레이스 도구, 에셋 및 양산 도구를 다룹니다."
tags:
    - 개발
    - 도구
---

# 도구 { #tools }

SF32 개발에는 컴파일러 외에도 여러 도구가 필요합니다. 실무 펌웨어 개발에서는 펌웨어 기록, 시리얼 모니터링, 크래시 분석, 트레이스 캡처, 이미지 변환, RF/오디오 튜닝, 양산 프로그래밍에 필요한 도구도 사용합니다.

아래 표에서 일반적인 개발 작업에 사용할 도구를 확인할 수 있습니다. 표는 각 도구의 매뉴얼을 보완할 뿐 대체하지는 않습니다. 설치 방법, 정확한 명령, 도구별 절차는 링크된 문서를 참조하십시오.

## 도구 맵 { #tool-map }

<div align="center"><em>표: 도구 맵</em></div>

<div align="center" markdown>

| 도구 | 용도 |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | OpenSiFli의 Zephyr 및 Arduino 작업 흐름에서 사용하는 플랫폼 공통 SF32 펌웨어 기록 도구. |
| [SDK UART 다운로드 스크립트](../platforms/sifli-sdk/build-flash-monitor.md) | SiFli-SDK 빌드가 생성하는 초기 펌웨어 기록 스크립트. |
| [CodeKit 기능](codekit.md) | VS Code에서 수행하는 설정, 빌드, 펌웨어 기록, 모니터링 작업. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | 이후 분석에 사용할 크래시 시점의 메모리 데이터 캡처. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | 칩의 Debug IP를 통한 트레이스/로그 캡처와 UART 기반 디버깅. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | 양산 라인의 펌웨어 프로그래밍, 캘리브레이션, PCBA 테스트. |
| [eZip / 이미지 툴링](../../learn/graphics/ezip.md) | 압축 그래픽 파이프라인을 위한 에셋 변환. |
| [RF/오디오/생산 도구](https://docs.sifli.com/projects/solution/6.tools/index.html) | 양산 캘리브레이션, 테스트, 튜닝 절차. |

</div>

## 플래싱 도구 { #flashing-tools }

초기 브링업에는 방금 빌드한 결과물에서 생성된 SDK UART 스크립트를 사용하십시오. 다음 작업에는 `sftool`을 활용할 수 있습니다.

- 여러 작업 흐름에서 공통으로 사용할 명령줄 펌웨어 기록 도구.
- Zephyr `west flash` 통합.
- ArduinoCore-zephyr 업로드 동작.
- CI, 양산 공정, 회귀 테스트 자동화.

팀에서 한 가지 방식으로 표준화할 때까지 프로젝트에 두 경로를 모두 문서화하십시오.

## 로깅 및 트레이스 도구 { #logging-and-trace-tools }

일반적인 개발에는 시리얼 터미널이면 충분합니다. 심각한 오류가 발생하면 구조화된 로그와 크래시 데이터를 캡처하십시오.

- 리셋 시점부터의 전체 부트 로그를 저장합니다.
- 플래시에 기록한 이미지와 정확히 일치하는 ELF/map/심볼 파일을 저장합니다.
- RT-Thread 셸, Zephyr 셸, Arduino 디버그 모드 중 어느 것이 활성화되어 있었는지 기록합니다.
- 가능하면 SiFli 진단 도구로 어서트 덤프와 트레이스 캡처를 수행합니다.

## 에셋 및 양산 도구 { #asset-and-production-tools }

디스플레이가 핵심인 제품은 특히 eZip 압축이나 하드웨어 가속 그래픽을 사용할 때 에셋 변환 절차를 문서화하는 것이 좋습니다. 양산 제품에서는 공장 작업자가 개발자 전용 명령에 의존하지 않도록 RF/오디오/생산 유틸리티를 개발용 펌웨어 기록 도구와 구분해 문서화하는 것이 좋습니다.

## 도구 선택 체크리스트 { #tool-selection-checklist }

<div align="center"><em>표: 도구 선택 체크리스트</em></div>

<div align="center" markdown>

| 필요 사항 | 툴링 방향 |
|:-----|:------------------|
| 최초 펌웨어 기록 | SDK UART 다운로드 스크립트. |
| 여러 플랫폼에서 스크립트로 펌웨어 기록 | `sftool`. |
| VS Code 빌드 및 모니터링 | CodeKit. |
| 부팅 후 크래시 | 시리얼 로그와 어서트 덤프 도구. |
| 장시간 트레이스 캡처 | 트레이스/UART 서버 도구. |
| 디스플레이 에셋 처리 흐름 | eZip/이미지 도구. |
| 양산 프로그래밍 | SiFli 생산 도구와 변경 통제된 절차. |

</div>

## 실용적인 조언 { #practical-advice }

- 두 번째 펌웨어 기록 경로를 추가하기 전에 신뢰할 수 있는 절차 하나를 먼저 익히십시오.
- 모든 보드에 대해 정상 동작하는 시리얼 로그를 저장해 두십시오.
- 초기 브링업에는 SDK가 생성한 스크립트를 사용하십시오.
- Zephyr, Arduino, 자동화 작업 전반에서 반복 가능한 명령줄 펌웨어 기록이 필요하면 `sftool`을 사용하십시오.
- 재현하기 어려운 문제가 처음 발생하기 전에 크래시 분석 도구를 준비하십시오.
