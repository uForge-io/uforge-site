---
icon: lucide/package
description: "SF32 개발의 레퍼런스 경로인 SiFli-SDK를 다룹니다. 핵심 scons 빌드와 sdk.py menuconfig 워크플로, 보드 이름, 프로젝트 구조, 양산 준비 점검 질문을 설명합니다."
tags:
    - Develop
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK는 SF32 펌웨어 개발을 위한 SiFli 공식 SDK입니다. RT-Thread 기반 개발 환경을 제공하며, 지원되는 타깃에서는 No-OS 예제도 제공합니다. 또한 Bluetooth, 그래픽, 오디오, 전력 관리, 스토리지, 양산 워크플로 등의 영역에 대해 SiFli가 관리하는 보드 지원과 미들웨어를 포함합니다. 제공 여부는 칩, 보드, SDK 릴리스에 따라 다릅니다.

!!! info "SiFli-Solution"
    SiFli-Solution은 별도의 SiFli 소프트웨어 패키지이며 이 페이지의 범위에 포함되지 않습니다. 이 페이지와 연결된 Develop 자료는 SiFli-SDK만 다룹니다. SiFli-Solution의 범위, 지원 디바이스, 이용 요건은 공식 [SiFli Solution Documentation](https://docs.sifli.com/projects/solution/index.html)을 참조하고 SiFli에 직접 문의하십시오.

처음 설치하고 `hello_world`를 실행하려면 [SiFli-SDK 시작하기](../../../getting-started/sifli/getting-started-sifli-sdk.md) 페이지를 참조하십시오. 이 페이지는 툴체인이 이미 동작하는 상태에서 SDK를 어떻게 이해하고 활용할지 설명합니다.

주요 참고 자료:

- [SiFli-SDK install guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [SF32LB52x SDK supported-board list](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## SiFli-SDK를 사용해야 하는 경우 { #when-to-use-sifli-sdk }

다음이 필요하다면 SiFli-SDK를 선택하십시오.

- 대상 칩과 SDK 릴리스에 대해 SiFli가 관리하는 보드 지원과 예제를 갖춘, 문서화된 개발 경로.
- 선택한 타깃과 릴리스에서 지원되는 범위의 Bluetooth, 디스플레이, 오디오, 전력, 스토리지, USB, OTA용 예제와 미들웨어.
- RT-Thread 통합과 셸 툴링.
- `sf32lb52-lcd_n16r8`과 같은 SDK 보드 이름을 통한 보드 수준 구성.
- SiFli 고유의 미들웨어, 도구, 파티션 레이아웃, 양산 플로우 사용.

## 개발 모델 { #development-model }

[SiFli-SDK 시작하기](../../../getting-started/sifli/getting-started-sifli-sdk.md) 페이지에서 툴체인과 `hello_world` 기준 구성을 마련합니다. 그 이후에는 SDK 리비전, 선택한 보드, 예제/프로젝트 디렉터리, 구성, 해당 빌드/플래싱 산출물을 재현 가능한 빌드 기록으로 함께 보관하십시오. 보드 이름에 코어 접미사가 없는 경우 HCPU 출력은 일반적으로 `build_<board_name>_hcpu/`를 따릅니다. 예를 들어 `sf32lb52-lcd_n16r8`은 `build_sf32lb52-lcd_n16r8_hcpu/`를 생성합니다. 디렉터리 이름을 직접 조합하지 말고, 확정된 보드/코어 타깃에 대해 실제로 생성된 디렉터리를 사용하십시오.

반복 가능한 개발을 위해 SDK 브랜치를 고정하고, 보드 이름을 기록하고, 로컬 보드 변경 사항을 벤더 파일과 분리하여 관리하고, 구성 변경은 검토하기 쉬운 작은 단계로 진행하십시오. 빌드, 플래싱, 모니터링의 상세 워크플로는 [빌드, 플래시, 모니터](build-flash-monitor.md)에 있습니다.

## 보드 이름 { #board-names }

SiFli-SDK 보드 이름은 SDK 고유의 이름이며 Zephyr 보드 이름, Arduino FQBN, 마케팅용 보드 이름과 일치하지 않을 수 있습니다. 보드 이름은 항상 SDK 지원 보드 목록이나 예제 문서에서 그대로 복사하십시오.

SF32LB52 DevKit LCD 보드의 경우, 퀵 스타트 예제에서 흔히 사용하는 SDK 보드 이름은 다음과 같습니다.

```text
sf32lb52-lcd_n16r8
```

## 프로젝트 구조 { #project-structure }

대부분의 SDK 예제는 다음 패턴을 따릅니다.

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

예를 들면 다음과 같습니다.

```text
example/get-started/hello_world/rtt/project
```

제품 펌웨어를 빌드할 때는 가장 가까운 동작 확인된 SDK 예제에서 시작하여 한 번에 하나의 서브시스템만 변경하십시오. 그러면 보드 구성, 미들웨어 의존성, 파티션 가정, 드라이버 설정이 그대로 유지됩니다.

## 구성 { #configuration }

예제 프로젝트에서 선택한 보드의 기능 구성을 변경하려면 SDK의 `menuconfig` 명령을 사용하십시오.

```bash
sdk.py menuconfig --board=<board_name>
```

구성 화면에 들어가는 일반적인 이유는 다음과 같습니다.

- 미들웨어 활성화 또는 비활성화.
- Bluetooth 역할 또는 프로파일 변경.
- 디스플레이, 파일 시스템, 오디오 지원 조정.
- 전력 관리 튜닝.
- 로깅 또는 셸 설정 선택.

## 양산 준비 점검 질문 { #production-readiness-questions }

제품 브랜치에 SiFli-SDK를 확정하기 전에 다음 질문에 답하십시오.

- 제품용으로 고정하는 SDK 릴리스 브랜치는 무엇입니까?
- 보드 지원 파일 중 제품 측이 소유하는 것과 벤더가 소유하는 것은 각각 무엇입니까?
- 핵심 기능을 입증하는 예제는 무엇입니까?
- 양산과 OTA에 사용하는 파티션 테이블은 무엇입니까?
- 공장 플래싱에 승인된 도구는 무엇입니까?
- 릴리스 빌드에서 활성화하는 로그는 무엇입니까?
- 실험실용으로 보관하는 복구 이미지는 무엇입니까?

## 다음에 볼 실용 페이지 { #practical-next-pages }

- [빌드, 플래시, 모니터](build-flash-monitor.md)
- [보드 설정](board-configuration.md)
- [컴포넌트와 `sf-pkg`](components.md)
- [예제](../../examples/index.md) — 서브시스템을 적용하기 전에 동작이 확인된 가장 가까운 기준 구성을 선택하십시오.
- [CodeKit](../../tools/codekit.md) — 필요할 때 VS Code 워크플로를 사용하되, SDK 보드 이름과 빌드 기록은 프로젝트의 나머지 부분과 일관되게 유지하십시오.
- [SDK 애플리케이션 노트](sdk-application-notes.md)
- [파티션 테이블](../../firmware-topics/partition-tables.md)
- [디버깅 및 진단](debugging-diagnostics.md)
