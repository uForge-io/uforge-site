---
icon: lucide/timer-reset
title: "워치독 설정"
description: "SiFli-SDK로 SF32 HCPU 및 LCPU 워치독 경로를 활성화하고 카운터 갱신 동작을 검증합니다."
tags: [개발, SiFli-SDK, 애플리케이션 노트, 워치독]
---

# 워치독 설정 { #configure-the-watchdog }

SiFli-SDK 문서는 워치독을 두 계층으로 설명합니다. 하나는 HAL이 제공하는 하드웨어 워치독이고, 다른 하나는 애플리케이션에서 사용하는 RT-Thread 워치독 드라이버입니다. 인스턴스 이름, 리셋 범위, 클럭 옵션은 제품군마다 다릅니다. 아래 비교를 참고하되, 특정 동작에 의존하기 전에 대상 SDK 설정을 확인하십시오.

<div align="center" markdown>

<em>표: 제품군별로 문서화된 워치독 동작</em>

| 제품군 | HAL 워치독 동작 | HAL 가이드에 명시된 클럭 동작 |
|---|---|
| SF32LB52x | HAL 가이드는 자체 서브시스템에 인터럽트를 발생시키거나 자체 서브시스템을 리셋할 수 있는 전용 HCPU 및 LCPU 워치독과, 전체 칩을 리셋하는 시스템 수준 IWDT를 설명합니다. | 카운터 설명에는 32K 클럭이 사용됩니다. 가이드에는 52x 전용 클럭 선택 옵션이 별도로 명시되어 있지 않습니다. |
| SF32LB55x | HCPU WDT1과 LCPU WDT2는 인터럽트를 발생시킬 수 있으며, 하드웨어 리셋은 해당 서브시스템으로 제한됩니다. 시스템 IWDT는 인터럽트를 발생시킬 수 없지만 전체 칩을 리셋할 수 있습니다. | RC10K 또는 32K LXT 중에서 선택 가능. |
| SF32LB56x / SF32LB58x | HAL 가이드에 따르면 WDT1/WDT2에는 전체 칩을 리셋하는 기능이 추가되었습니다. | RC10K. 클럭이 더 이상 32K 저전력 클럭에서 공급되지 않습니다. |

</div>

!!! warning "RT-Thread 사용 가이드의 적용 범위"
    [Watchdog Usage Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)는 `sf32lb52x` 경로에 게시되어 있지만 본문에는 SF32LB55X가 명시되어 있습니다. 아래의 기본 타임아웃 30초, IDLE 스레드의 워치독 갱신 방식, 슬립 동작, 애플리케이션 리셋 순서는 문서화된 55x 구성에 대한 안내로 취급하십시오. 제품군 전체에 적용된다고 간주하면 안 됩니다. 세부 사항은 대상 제품군의 소스와 생성된 설정에서 확인하십시오.

## 워치독 활성화 및 설정 { #enable-and-configure-the-watchdog }

프로젝트 디렉터리에서 `sdk.py menuconfig`를 실행한 다음 RT-Thread 디바이스 드라이버 설정에서 워치독 옵션을 활성화하십시오. 메뉴 이름은 SDK 릴리스에 따라 다를 수 있으므로 대상 제품군의 소스 문서를 참고하고, 빌드 전에 생성된 `rtconfig.h`를 확인하십시오.

링크된 Watchdog Usage Guide에는 두 가지 별도 설정이 나와 있습니다.

- `RTOS → On-chip Peripheral Drivers → Enable Watchdog Timer`는 칩의 하드웨어 워치독 타이머를 활성화합니다.
- `RTOS → RT-Thread Components → Device Drivers → Using Watch Dog device drivers`는 RT-Thread 드라이버를 활성화합니다.

링크된 가이드에 설명된 55x 구성의 기본 타임아웃은 30초입니다. 드라이버 메뉴의 `(30) Watch Dog timeout (NEW)`에서 다른 값을 선택할 수 있습니다. 대상 제품군의 기본값은 `menuconfig`에서 확인하고, 생성된 설정을 펌웨어 이미지와 함께 보관하십시오.

아래 그림은 링크된 가이드의 메뉴 위치와 타임아웃 필드를 보여 줍니다. 가이드 URL의 제품군 경로와 본문에 명시된 칩 제품군이 다르므로 스크린샷은 참고용으로만 보십시오. 실제 메뉴 경로와 기본값은 대상 프로젝트의 `menuconfig` 출력에서 확인하십시오.

![Watchdog driver option in menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog2.png){ loading="lazy" }
<div align="center"><em>그림: 링크된 Watchdog Usage Guide에 나온 워치독 드라이버 메뉴.</em></div>

![Watchdog timer option in menuconfig](../../../../assets/develop/app-notes/watchdog/watchdog.png){ loading="lazy" }
<div align="center"><em>그림: 링크된 Watchdog Usage Guide에 나온 워치독 타이머 설정.</em></div>

## 워치독 갱신 방식 { #feeding-policy }

시스템은 RT-Thread `IDLE` 스레드에서 워치독 카운터를 갱신합니다. 애플리케이션 스레드가 설정된 타임아웃보다 오래 연속 실행되지 않는다면 별도의 애플리케이션 코드는 필요하지 않습니다.

우선순위가 높은 스레드를 타임아웃보다 오래 연속 실행해야 한다면 해당 스레드에서 다음 함수로 워치독 카운터를 갱신하십시오.

```c
rt_hw_watchdog_pet();
```

스케줄러 정지나 데드락을 감추는 무조건적인 워치독 갱신 루프를 추가하면 안 됩니다. 갱신 지점은 감시 대상 작업이 정상적으로 진행되고 있음을 나타내야 합니다.

## 슬립 및 리셋 동작 { #sleep-and-reset-behavior }

- `Standby` 또는 `Hibernate`에 진입하면 워치독이 비활성화되며, 웨이크업 후에 다시 활성화됩니다.
- 다른 슬립 모드에서는 워치독이 계속 동작하므로 타임아웃이 만료되기 전에 시스템이 깨어나 워치독 카운터를 갱신해야 합니다.
- HCPU는 시스템 워치독을 사용합니다. 타임아웃이 발생하면 전체 칩이 재시작됩니다.
- LCPU는 LCPU 서브시스템 워치독을 사용합니다. 타임아웃이 발생하면 먼저 인터럽트가 생성되고, 인터럽트 핸들러가 전체 칩의 소프트웨어 재시작을 트리거합니다.

## 검증 순서 { #validation-sequence }

1. 칩 제품군, SDK 리비전, 타임아웃, 워치독 갱신 담당 주체, 슬립 모드를 기록합니다.
2. 정상 워크로드가 의도한 워치독 갱신 지점에 도달하는지 확인합니다.
3. 워치독 갱신 경로를 의도적으로 중단하고 기대한 리셋 범위와 부팅 동작을 확인합니다.
4. 지원되는 모든 슬립 모드에서, 특히 `Standby`와 `Hibernate`에서 반복합니다.
5. 리셋 결과와 부팅 시 진단 정보를 제품 복구 시험 기록과 함께 보관합니다.

## 공식 출처 { #official-sources }

- [Watchdog Usage Guide(영어, SF32LB52x 경로에 게시되었으나 본문은 SF32LB55X를 설명)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/watchdog.html)
- [Watchdog Usage Guide(중국어, 동일한 SF32LB52x 경로에 게시되었으나 본문은 SF32LB55X를 설명)](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/watchdog.html)
- [SF32LB52x HAL WDT 가이드(영어)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/wdt.html)
- [SF32LB55x HAL WDT 가이드(중국어. 56x/58x 비교 참고 사항 포함)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/wdt.html)

`sf32lb55x/app_note/watchdog.html`, `sf32lb56x/app_note/watchdog.html`, `sf32lb58x/app_note/watchdog.html`의 제품군별 애플리케이션 노트 페이지는 아직 확인되지 않았습니다. 검색과 직접 접속만으로는 결론을 내릴 수 없었으며, 해당 경로가 404를 반환한다고 입증된 것은 아닙니다.
