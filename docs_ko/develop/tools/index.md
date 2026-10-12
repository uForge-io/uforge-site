---
icon: lucide/wrench
description: "SF32 개발용 도구 맵입니다. sftool, SDK UART 플래싱 스크립트, CodeKit 동작, 크래시/트레이스 도구, 에셋 및 양산 툴링을 사용 사례별로 정리합니다."
tags:
    - Develop
    - Tools
---

# 도구 { #tools }

SF32 개발에는 컴파일러 외에도 많은 것이 필요합니다. 실용적인 펌웨어 워크플로에는 플래싱, 시리얼 모니터링, 크래시 분석, 트레이스 캡처, 이미지 변환, RF/오디오 튜닝, 양산 프로그래밍을 위한 도구도 사용됩니다.

아래 표는 일반적인 개발 작업을 관련 도구에 대응시킵니다. 이 표는 각 도구의 매뉴얼을 대체하지 않고 보완합니다. 설치 방법, 정확한 명령, 도구별 절차는 연결된 문서를 참조하십시오.

## 도구 맵 { #tool-map }

<div align="center"><em>표: 도구 맵</em></div>

<div align="center" markdown>

| 도구 | 용도 |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | OpenSiFli Zephyr 및 Arduino 플로에서 사용하는 크로스 플랫폼 SF32 플래싱 도구. |
| [SDK UART 플래싱 스크립트](../platforms/sifli-sdk/build-flash-monitor.md) | SiFli-SDK 빌드에서 생성되는 첫 실행용 플래싱 스크립트. |
| [CodeKit 동작](codekit.md) | VS Code 설정, 빌드, 플래시, 모니터 동작. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | 이후 분석을 위한 크래시 시점의 메모리 데이터 캡처. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | 칩의 Debug IP를 통한 트레이스/로그 캡처와 UART 기반 디버깅. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | 양산 라인의 펌웨어 프로그래밍, 캘리브레이션, PCBA 테스트. |
| [eZip / 이미지 툴링](../../learn/graphics/ezip.md) | 압축 그래픽 파이프라인을 위한 에셋 변환. |
| [RF/오디오/공장 도구](https://docs.sifli.com/projects/solution/6.tools/index.html) | 양산 캘리브레이션, 테스트, 튜닝 워크플로. |

</div>

## 플래싱 도구 { #flashing-tools }

첫 브링업에는 SDK가 생성한 UART 스크립트를 사용하십시오. 방금 수행한 빌드에서 만들어진 스크립트이기 때문입니다. 다음이 필요하면 `sftool`을 추가하십시오.

- 워크플로 전반에 걸쳐 일관된 명령줄 플래싱 도구.
- Zephyr `west flash` 통합.
- ArduinoCore-zephyr 업로드 동작.
- CI, 공장, 회귀 테스트에서의 자동화.

팀이 하나로 표준화할 때까지는 프로젝트에 두 경로를 모두 문서화해 두십시오.

## 로깅 및 트레이스 도구 { #logging-and-trace-tools }

일반적인 개발에는 시리얼 터미널이면 충분합니다. 심각한 장애에는 구조화된 로그와 크래시 데이터를 캡처하십시오.

- 리셋 시점부터의 전체 부트 로그를 저장합니다.
- 플래시에 기록한 이미지와 정확히 일치하는 ELF/map/심볼 파일을 저장합니다.
- RT-Thread 셸, Zephyr 셸, Arduino 디버그 모드 중 어느 것이 활성화되어 있었는지 기록합니다.
- 가능하면 SiFli 진단 도구로 어서트 덤프와 트레이스 캡처를 수행합니다.

## 에셋 및 양산 도구 { #asset-and-production-tools }

디스플레이 비중이 큰 제품은, 특히 eZip 압축이나 하드웨어 가속 그래픽이 관련되는 경우 에셋 변환 경로를 문서화하는 것이 좋습니다. 양산 제품은 공장 작업자가 개발자 전용 명령에 의존하지 않도록 RF/오디오/공장 유틸리티를 개발자용 플래싱 도구와 별도로 문서화하는 것이 좋습니다.

## 도구 선택 체크리스트 { #tool-selection-checklist }

<div align="center"><em>표: 도구 선택 체크리스트</em></div>

<div align="center" markdown>

| 필요 사항 | 툴링 방향 |
|:-----|:------------------|
| 첫 SDK 플래시 | SDK UART 플래싱 스크립트. |
| 크로스 플랫폼 스크립트 플래시 | `sftool`. |
| VS Code 빌드 및 모니터 | CodeKit. |
| 부팅 후 크래시 | 시리얼 로그와 어서트 덤프 툴링. |
| 장시간 트레이스 캡처 | 트레이스/UART 서버 툴링. |
| 디스플레이 에셋 파이프라인 | eZip/이미지 툴링. |
| 공장 프로그래밍 | SiFli 양산/공장 유틸리티와 고정된 절차. |

</div>

## 실용적인 조언 { #practical-advice }

- 두 번째 플래시 경로를 추가하기 전에 신뢰할 수 있는 플래시 경로 하나를 익히십시오.
- 모든 보드에 대해 정상 동작하는 시리얼 로그를 저장해 두십시오.
- 첫 브링업에는 SDK가 생성한 스크립트를 사용하십시오.
- Zephyr, Arduino, 자동화 전반에서 반복 가능한 명령줄 플래싱이 필요하면 `sftool`을 사용하십시오.
- 재현하기 어려운 첫 버그가 발생하기 전에 크래시 분석 툴링을 추가하십시오.
