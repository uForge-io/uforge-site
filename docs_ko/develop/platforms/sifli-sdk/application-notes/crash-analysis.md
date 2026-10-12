---
icon: lucide/file-search-2
title: "로그 캡처와 크래시 분석"
description: "일치하는 로그와 메모리를 캡처하고, 크래시 컨텍스트를 복원하며, SiFli-SDK 도구로 assertion 또는 hard fault를 분석합니다."
tags:
    - 개발
    - SiFli-SDK
    - 애플리케이션 노트
    - 디버깅
---

# 로그 캡처와 크래시 분석 { #capture-logs-and-analyze-crashes }

SDK의 `debug_logging` 가이드와 `crash_analysis` 가이드는 서로 보완 관계입니다. 로그는 두 코어가 무엇을 하고 있었는지 설명하고, 캡처한 메모리 이미지는 디버거가 실패한 컨텍스트를 복구할 수 있게 해 줍니다. 모든 캡처에는 정확한 ELF, 맵/심볼 파일, SDK 리비전, 칩 모델, 구성, 보드 리비전을 함께 보관하십시오.

## 디버그 연결 선택 { #choose-a-debug-connection }

<div align="center" markdown>

<em>표: SF32 제품군별 디버그 및 로그 연결</em>

| 제품군 | 디버그 및 로그 동작 |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | 소스 가이드는 UART 캡처, `SifliUsartServer`/`AssertDumpUart`, J-Link/Trace32 복구를 문서화합니다. 선택한 슬립 상태에서 계속 사용할 수 있는 전송 방식을 사용하십시오. |
| SF32LB55x | `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat`과 `jlink_lcpu_a0.bat` 스크립트로 SWD를 HCPU와 LCPU 사이에서 전환할 수 있습니다. LCPU의 ROM 콘솔은 1,000,000 baud의 UART3이며, HCPU는 UART1/2 또는 SWD를 사용할 수 있습니다. SWD는 PB IO를 사용하므로, 연결하는 동안 LPSYS를 활성 상태 또는 light sleep 상태로 유지하십시오. |

</div>

LPSYS가 Standby에서 웨이크하면 SWD가 HCPU로 돌아갑니다. J-Link 리셋만으로는 선택된 코어가 전환되지 않습니다. 비동기 로깅이 활성화되어 있으면 assert 덤프가 잘릴 수 있으므로, 실패 경로에서는 동기 방식 또는 보존형 캡처를 사용하십시오.

## 라이브 또는 사후 분석 패키지 캡처 { #capture-a-live-or-post-mortem-package }

현재 SDK 릴리스에서는 `sdk.py`로 UART 또는 J-Link를 통해 캡처합니다.

!!! note "예제 범위"
    아래 명령은 SF32LB52/LB525 예제입니다. 명령 구조는 유지하되, 칩/모델, 코어, 전송 방식, ELF는 대상 제품군과 SDK 릴리스에서 지원하는 값으로 바꾸십시오.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

대상이 PSRAM을 사용하면 `--include-psram --psram-size 8MB`를 추가하십시오. J-Link 프로브는 `--transport jlink --jlink-ip 127.0.0.1:19025`를 사용할 수 있으며, 영향을 받은 코어는 `--core hcpu` 또는 `--core lcpu`로 선택합니다. 출력 디렉터리에는 캡처한 바이너리, 코어 ELF/AXF, `log.txt`, `manifest.json`, `sdk_manifest.json`이 있어야 합니다.

이전 SDK에서는 소스 가이드의 제품군별 방법을 사용하십시오.

- UART: 콘솔을 사용할 수 있는 동안 `SifliUsartServer` 또는 `AssertDumpUart`로 assertion 패키지를 내보낼 수 있습니다.
- J-Link/SWD: J-Link를 `PATH`에 추가한 다음 대상 제품군의 스크립트를 실행합니다. 예를 들어 SF32LB55x는 `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`을 사용합니다. 해당 스크립트는 RAM, EPIC 레지스터, PSRAM을 저장합니다.
- 힙 누수 증거가 필요하면 `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace`가 활성화되어 있는지 확인합니다.

스크립트 기반 캡처에서는 `.jlink` 파일을 대상 제품군/PSRAM 구성과 연결 방식 모두에 맞추십시오. `SifliUsartServer` 경로에는 IP 모드 스크립트를, J-Link 직접 연결에는 USB 모드 스크립트를 사용하십시오. 맞지 않으면 캡처가 실패할 수 있습니다.

![SF32LB52x memory-trace option in menuconfig](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 힙 증거가 필요하면 실패를 재현하기 전에 메모리 트레이스를 활성화합니다.</em></div>

UART 캡처에서는 보통 시리얼 유틸리티, 서버 주소, 대상 코어를 맞춰야 합니다. 가이드의 다음 스크린샷은 연결을 점검하는 데 유용합니다.

![SiFli_Trace and SifliUsartServer tool location](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 도구 디렉터리.</em></div>

![SifliUsartServer SF32LB52x connection settings](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 시리얼 포트, baud rate, 서버 주소, 디버그 코어가 캡처 대상과 일치해야 합니다.</em></div>

![Crash-dump analyzer RAM-save script](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 이 디렉터리에는 `save_ram_55x.bat`, `save_ram_58x.bat`, `save_ram_uart_52x.bat`처럼 제품군 및 전송 방식별 스크립트가 있습니다. 대상과 연결 방식에 맞는 것을 선택하십시오.</em></div>

## 컨텍스트 복원과 분석 { #restore-and-analyze-the-context }

캡처한 패키지를 디버거에서 읽을 수 있는 코어로 변환하고, 일치하는 ELF로 분석합니다.

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

이전 Trace32 워크플로는 HCPU assertion(HA) 버튼과 `run_next_step`으로 HCPU assertion 패키지를 로드합니다. LCPU 덤프에는 LCPU 복구 구성을 사용하십시오. 예외 스택이 표시되지 않으면 레지스터를 해석하기 전에 코어 선택, ELF, 메모리 범위를 확인하십시오.

![Trace32 capture-script selection example](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — J-Link/Trace32 캡처 스크립트 선택.</em></div>

![Trace32 HCPU assertion window](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 복구 후 콜 스택, 스레드 목록, 힙, 오류 원인을 함께 확인합니다.</em></div>

## 부팅 중 또는 경쟁 상태 의심 시 조기 정지 { #stop-early-during-boot-or-a-suspected-race }

초기화를 디버깅하려면 해당 `Reset_Handler`의 첫 번째 명령 주석을 해제하여 `B .`가 되게 하십시오.

아래의 시작 파일 경로는 SF32LB55x 소스 경로입니다. 다른 제품군에는 해당하는 시작 파일을 사용하십시오.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

J-Link를 연결하고 PC를 2바이트 증가시키면 계속 실행됩니다. C에서는 `_asm("B .");`가 동일한 의도적 정지를 만듭니다. 이를 `while (1);`으로 대체하지 마십시오. 컴파일러가 루프 뒤의 코드를 최적화로 제거할 수 있습니다.

## 증거 읽기 { #read-the-evidence }

assertion 덤프에는 보통 assertion 함수와 줄 번호, 스레드 테이블, 메일박스와 메시지 큐 상태, 뮤텍스, 세마포어, 힙 사용량, CPU 레지스터가 포함됩니다. 실패한 PC를 정확한 ELF와 대조한 다음, 스택 여유, 차단된 대기와 관련된 리소스의 소유권, 큐 항목, 실패 직전의 마지막 로그 항목을 확인하십시오. 심볼화하기 전에 원본 덤프를 보존하십시오.

대화형 검사에는 Ozone이 HCPU/LCPU ELF와 `$SDK_ROOT/tools/svd_external`의 일치하는 Cortex-M33(FPU 포함) SVD를 로드할 수 있습니다. 코어가 SWD로 연결할 수 없는 상태이면 UART 또는 `SifliUsartServer`를 사용하십시오. ULOG는 UART를 사용할 수 있으며, RTT 지원을 활성화한 후 RT-Thread 로그 디바이스로 `segger`를 선택하면 Segger RTT를 사용할 수 있습니다.

## 버스 및 메모리 장애 계측 { #instrument-bus-and-memory-failures }

SDK 버스 모니터는 버스 폴트로 이어지는 접근을 캡처할 수 있습니다. `dbg_busmon_reg_callback`으로 콜백을 등록한 다음, 가이드의 예제에서 `dbg_busmon_read`와 `dbg_busmon_write`를 사용하여 관련 주소 범위를 검사하십시오. 이를 힙 트레이싱 및 크래시 패키지와 함께 사용하십시오. 심볼이나 메모리 컨텍스트가 없는 레지스터 덤프만으로는 충분한 경우가 드뭅니다.

![Trace32 heap call-stack example](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>그림: SF32LB52x 가이드 예시 — 힙 콜 스택과 메모리 창.</em></div>

공식 제품군 출처: [SF32LB52x 크래시 분석](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html), 그리고 해당 [디버깅 및 로깅 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
