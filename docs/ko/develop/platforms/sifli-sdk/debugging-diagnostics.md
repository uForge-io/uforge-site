---
icon: lucide/bug
description: "sftool, AssertDump, SiFli_Trace, RT-Thread 셸로 SF32 펌웨어를 디버깅하는 방법과, 반복 가능한 재현 순서 및 크래시 리포트 체크리스트."
tags:
    - 개발
    - 디버깅
---

# 디버깅 및 진단 { #debugging-and-diagnostics }

SF32 디버깅은 시리얼 로그부터 시작하십시오. 칩, SDK 릴리스, 프로젝트 설정에 따라 크래시 덤프 도구, 트레이스 캡처, RT-Thread 셸도 사용할 수 있습니다. 대상에 대해 문서화된 절차만 따르십시오.

## 1차 디버깅 { #first-line-debugging }

시리얼 콘솔을 사용하여 다음을 수집합니다.

- 부트 로그.
- 애플리케이션 출력.
- 프로젝트에서 활성화한 경우 RT-Thread 셸 출력.
- 폴트 메시지.
- 사용 가능한 경우, 보고된 파일과 줄 번호, 최초 폴트 PC, 스택 데이터를 포함한 어서트/크래시 출력.
- 다운로드 및 리셋 동작.

로그는 보드 리비전, SDK 브랜치, 빌드 명령, 플래시 명령, 시리얼 설정과 함께 보관하십시오.

## 디버깅 순서 { #debugging-order }

1. 같은 펌웨어로 재현합니다.
2. 리셋 후에 재현합니다.
3. 전체 재플래싱 후에 재현합니다.
4. 요구 사항과 가장 비슷한 SDK 예제에서 재현합니다.
5. 제품 변경 사항을 한 번에 하나씩 다시 추가합니다.

이렇게 하면 하드웨어, 보드 지원, 미들웨어, 애플리케이션 문제를 구분하는 데 도움이 됩니다.

## 알아 두어야 할 도구 { #tools-to-know }

<div align="center"><em>표: 알아 두어야 할 도구</em></div>

<div align="center" markdown>

| 도구 | 용도 |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | 지원 칩의 플래시 읽기/기록/지우기와 리셋을 위한 시리얼 명령줄 도구입니다. 옵션은 칩과 스토리지에 따라 다릅니다. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | 대상 보드에서 지원하는 절차에 따라 로그 출력을 캡처하고 확인합니다. |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | 내장 Debug IP를 통한 UART 디버깅용 보조 도구입니다. [v2.5.1 가이드](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html)는 SF32LB52X와 SF32LB56X를 나열하며, 최신 영어 가이드는 `SF322LB57`도 언급합니다. 모든 타깃을 지원한다고 가정하지 말고 정확한 칩과 SDK 조합을 확인하십시오. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html) 및 [크래시 분석 도구](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | 해당 칩과 SDK 릴리스에서 제공되는 경우에만 사용합니다. 해당 릴리스에 문서화된 캡처 및 분석 절차를 따르십시오. |
| RT-Thread 셸 | 프로젝트 설정에서 셸을 활성화한 경우에만 런타임 검사와 명령을 사용할 수 있습니다. |

</div>

## 먼저 확인할 항목 { #what-to-inspect-first }

<div align="center"><em>표: 먼저 확인할 항목</em></div>

<div align="center" markdown>

| 증상 | 우선 확인 사항 |
|:--------|:-------------|
| 하드 폴트 또는 어서트 | 스택 크기, 널 포인터, DMA 버퍼, 캐시 관리. |
| 주변 장치가 응답하지 않음 | 핀 먹스, 클럭, 전원 레일, 보드 이름, 드라이버 활성화. |
| Bluetooth 불안정 | RF 클럭, 안테나 경로, Bluetooth 스택 설정, 연결 파라미터. |
| 디스플레이 화면 이상 | 패널 타이밍, 버퍼 포맷, 캐시/DMA 동기화. |
| 무작위 리셋 | 워치독, 전원 레일, 브라운아웃, 스택 오버플로. |
| HCPU/LCPU 로그 없음 | UART 할당, `ulog`, pinmux, LCPU 시작 여부를 확인하십시오. |

</div>

인용한 LB551 예제에서는 HCPU가 UART1을, LCPU가 PB45/PB46의 UART3을 사용합니다. HCPU에 UART3이 중복 할당되지 않았는지 확인하고, `pinmux.c`에서 QSPI3/UART1 핀 먹스 충돌을 점검하며, LCPU가 시작되었는지 확인하십시오. 일부 예제에서는 `lcpu on` 또는 `lcpu_power_on()`이 필요합니다.

## 크래시 리포트 체크리스트 { #crash-report-checklist }

크래시를 보고할 때는 다음을 포함하십시오.

- 보드와 리비전.
- 칩 변형(variant).
- SDK 브랜치 또는 커밋.
- 정확한 예제 또는 프로젝트.
- 빌드 명령과 보드 이름.
- 펌웨어 기록 명령.
- 리셋 시점부터의 시리얼 부트 로그.
- 크래시 덤프 또는 어서트 출력.
- 변경하지 않은 SDK 예제에서도 문제가 재현되는지 여부.

## 공식 출처 { #official-sources }

- [SiFli-SDK: 디버깅 및 로그](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK: 크래시 분석 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki: 로그 디버깅(중국어)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki: 메모리 덤프로 크래시 현장 복구(중국어)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
