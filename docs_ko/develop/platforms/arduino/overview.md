---
icon: lucide/infinity
description: "SF32LB52 DevKit LCD용 ArduinoCore-zephyr: 플랫폼 적합성, 보드 식별 정보, 로더 및 빌드 모드 선택, 통합 한계, 에스컬레이션 경로를 설명합니다."
tags:
    - 개발
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr)는 SF32용 Zephyr 기반 Arduino 코어입니다. **SiFli SF32LB52 DevKit LCD**에서 스케치, 주변 장치 실험, 데모, 초기 프로토타입을 작업하기에 유용한 경로입니다.

!!! warning "베타 코어"
    OpenSiFli는 이 코어를 **BETA**로 표기합니다. 기능, API, 패키지 구성, 로더 동작, 릴리스가 변경될 수 있습니다. 제품을 이 경로로 확정하기 전에 프로젝트 README와 Releases에서 현재 동작을 확인하십시오.

초기 IDE 설치, 보드/포트 선택, 부트로더 설치, Blink 확인은 [Arduino 시작하기](../../../getting-started/arduino/getting-started-arduino.md)를 참조하십시오. 이 페이지는 Arduino가 적합한지 판단하고, 첫 실행 이후 Arduino 기반 프로젝트를 유지보수하기 위한 문서입니다.

## Arduino가 적합한 경우 { #where-arduino-fits }

SF32 고유 기능을 폭넓게 사용하는 것보다 빠른 반복 개발과 익숙한 스케치 모델이 더 중요하다면 Arduino를 선택하십시오. 개념 검증, 간단한 주변 장치 확인, 교육 및 데모 프로젝트, 기존 Arduino 코드베이스를 활용하는 팀에 적합합니다.

제품이 양산용 펌웨어 기준 구성, Bluetooth 스택 튜닝, 그래픽 중심 애플리케이션, 저전력 최적화, 보드 브링업(초기 구동 및 검증), 또는 벤더 미들웨어에 의존한다면 [SiFli-SDK](../sifli-sdk/overview.md)로 전환하십시오. 디바이스트리, Kconfig, Zephyr 고유의 애플리케이션 구조를 직접 제어해야 한다면 [Zephyr](../zephyr/overview.md)를 사용하십시오.

<div align="center"><em>표: Arduino 플랫폼 적합성</em></div>

<div align="center" markdown>

| Arduino를 선택할 경우 | 다른 경로를 선택할 경우 |
|:-------------------|:------------------------|
| 짧은 스케치와 빠른 주변 장치 실험. | 폭넓고 검증된 SF32 기능 요구 사항이 있는 제품. |
| Arduino IDE 또는 Arduino CLI로 이미 효율적으로 작업하는 팀. | 커스텀 보드 브링업, 또는 플래시, 전원, 미들웨어에 대한 깊은 제어. |
| 데모와 초기 타당성 프로토타입. | Zephyr 고유의 구성, 드라이버, RTOS 구조. |

</div>

## 보드 식별 정보 { #board-identity }

현재 공개 패키지는 SF32LB52 DevKit LCD를 대상으로 합니다. 이 값들은 스케치의 빌드와 업로드 방식, 보드 설정을 결정하므로 프로젝트 기록과 이슈 리포트에 함께 남기십시오.

<div align="center"><em>표: Arduino 보드 식별 정보</em></div>

<div align="center" markdown>

| 항목 | 값 |
|:-----|:------|
| Boards Manager 제목 | **SiFli Serial Boards** |
| Arduino 플랫폼 | `sifli:sf32lb52` |
| 보드 | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyr 타깃 | `sf32lb52_devkit_lcd` |
| 변형 | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| 업로드 도구 | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

이름이 비슷한 SiFli 또는 Zephyr 보드 식별자는 이 FQBN과 서로 바꿔 쓸 수 없습니다. 보드 선택이 빌드 및 업로드 파라미터를 결정합니다.

## 빌드 및 로더 모델 { #build-and-loader-model }

ArduinoCore-zephyr는 스케치용 Arduino API를 Zephyr 로더 및 보드별 구성과 결합합니다. 두 옵션 메뉴는 단순한 컴파일러 플래그가 아니라 시작 및 링크 동작에 영향을 줍니다.

<div align="center"><em>표: 빌드 및 로더 선택</em></div>

<div align="center" markdown>

| 옵션 | 동작 | 엔지니어링상의 의미 |
|:-------|:---------|:------------------------|
| `Standard` 빌드 모드 | 스케치를 로드한 후 시작합니다. | 일반적인 스케치 동작에 사용합니다. |
| `Debug` 빌드 모드 | Zephyr 셸이 `sketch`를 기다리는 상태로 둡니다. | 셸이 디버그 워크플로의 일부일 때만 유용합니다. |
| `Dynamic` 링크 모드 | 일반적인 로더 기반 흐름에 맞게 스케치를 패키징합니다. | 로더가 런타임 및 메모리 예산에 포함됩니다. |
| `Static` 링크 모드 | 정적으로 링크된 이미지를 사용합니다. | 로더 관련 조사에 사용하거나, 트레이드오프를 명확히 이해한 경우에 사용합니다. |

</div>

**Standard**와 **Dynamic**으로 시작하십시오. Debug 모드에서는 Zephyr 셸에서 `sketch`를 실행하기 전까지 업로드한 스케치가 시작되지 않습니다. 업로드가 성공한 것처럼 보이는데 애플리케이션이 전혀 동작하지 않는 경우의 흔한 원인입니다.

로더는 보드별 별도 산출물입니다. Burn Bootloader는 보통 최초 설치, 업데이트 또는 복구 시 수행하며, 매번 스케치를 업로드할 때 실행하는 절차는 아닙니다. Arduino 패키지 버전과 로더 업데이트 이력을 함께 기록하십시오. 두 버전에 대한 정보가 맞지 않으면 나중에 원인을 파악하기 어렵습니다.

## 통합 경계 { #integration-boundaries }

Arduino 코어를 기반이 되는 Zephyr 플랫폼의 대체물이 아니라 통합 계층으로 취급하십시오. 스케치가 로더에서 노출하거나 활성화하지 않은 Zephyr 심볼이나 서브시스템을 필요로 할 수 있습니다. 대표적인 증상은 정의되지 않은 Zephyr 심볼, 누락된 서브시스템, 동적 로딩과 셸로 인한 메모리 부족입니다.

제품 프로토타입에 라이브러리나 기능을 추가하기 전에 다음을 모두 확인하십시오.

- 정확한 패키지 버전, FQBN, 빌드 모드, 링크 모드.
- 타깃 보드 리비전과 시리얼 플래싱/복구 절차.
- 필요한 주변 장치 또는 라이브러리에 대해 테스트를 마친 예제.
- 의도한 로더 구성에서 측정 가능한 RAM 및 플래시 예산.
- Arduino 로더 또는 SiFli-SDK 펌웨어를 이용한 복구 경로.

Arduino API나 이름이 비슷한 Zephyr 드라이버가 있다는 사실만으로 라이브러리가 지원된다고 추정하지 마십시오. 스케치, 로더, 보드, 패키지의 전체 조합을 타깃 하드웨어에서 검증하십시오.

## 진단과 에스컬레이션 { #diagnose-and-escalate }

보드가 감지되지 않거나, 플래시에 기록되지 않거나, Blink가 동작하지 않으면 첫 실행 가이드부터 시작하십시오. 그 기준 구성이 동작한 뒤에는 다음 경계를 사용하여 디버깅 시간을 단축하십시오.

<div align="center"><em>표: Arduino 문제 담당 영역</em></div>

<div align="center" markdown>

| 첫 실행 기준 구성이 동작한 후의 증상 | 먼저 조사할 사항 |
|:-------------------------------------------|:--------------------|
| `sketch`를 실행한 후에만 스케치가 시작됨 | Debug 모드를 의도적으로 선택했는지 확인합니다. |
| Zephyr 함수 또는 서브시스템 누락 | Core README와 로더의 export/구성을 확인합니다. |
| 메모리 오류 또는 불안정 | 스케치 예산을 측정합니다. 동적 로딩과 Zephyr 셸을 고려하고, Static은 복구 계획이 있을 때만 평가합니다. |
| 라이브러리는 컴파일되지만 하드웨어가 동작하지 않음 | 보드 핀 가정을 확인하고, 최소한의 보드별 예제로 테스트합니다. |
| 업로드 또는 복구 실패 | 문서화된 Arduino 기준 구성을 다시 설정한 다음, 필요하면 보드의 SiFli-SDK 복구 경로를 사용합니다. |

</div>

유용한 이슈 리포트를 위해 패키지 버전, IDE 또는 CLI 버전, 운영 체제, FQBN, 빌드 모드, 링크 모드, 보드 리비전, 전체 업로드 출력, 시리얼 로그를 포함하십시오.

## 관련 페이지 { #related-pages }

- [Arduino 시작하기](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52-DevKit-LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
