---
icon: lucide/boxes
description: "SiFli-SDK 예제 코드를 재사용 가능한 컴포넌트와 `sf-pkg` 패키지로 만드는 방법: 품질 기준, 문서화할 내용, 피해야 할 일반적인 패키징 함정."
tags:
    - Develop
    - SiFli-SDK
---

# 컴포넌트와 `sf-pkg` { #components-and-sf_pkg }

SiFli 프로젝트는 재사용 가능한 미들웨어, 드라이버, 컴포넌트에 의존하는 경우가 많습니다. 프로젝트가 복사한 예제의 수준을 넘어 성장하면, SiFli의 패키지/컴포넌트 에코시스템을 사용하여 재사용 가능한 펌웨어 구성 요소를 게시하고 유지 관리하십시오.

## 컴포넌트를 바라보는 방법 { #how-to-think-about-components }

여러 제품이나 예제에서 공유해야 하는 코드에는 컴포넌트를 사용하십시오.

- 주변 장치 드라이버.
- 디스플레이 패널 지원.
- Bluetooth 서비스.
- GUI 위젯.
- 센서 어댑터.
- 스토리지 헬퍼.
- 제품 미들웨어.

일회성 애플리케이션 로직은 안정적인 인터페이스를 갖추고 사용자가 여러 명이 될 때까지 애플리케이션 프로젝트에 두십시오.

## 실무 워크플로 { #practical-workflow }

1. 동작하는 SDK 예제에서 시작합니다.
2. 재사용 가능해야 하는 부분을 식별합니다.
3. 범위가 명확한 작은 API로 노출합니다.
4. SDK의 일반적인 빌드/설정 메커니즘으로 설정을 추가합니다.
5. 의존성, 메모리 사용량, 필요한 주변 장치를 문서화합니다.
6. 그런 다음에야 재사용 가능한 컴포넌트로 패키징합니다.

## `sf-pkg`로 컴포넌트 배포하기 { #use-sf-pkg-to-distribute-components }

컴포넌트는 재사용 가능한 엔지니어링 단위입니다. SiFli의 컴포넌트 레지스트리는 Conan을 기반으로 하며, 현재 SDK 명령줄 서브커맨드는 `sf-pkg`입니다.

패키지를 사용하려면 SDK 프로젝트의 `project` 디렉터리에서 `sdk.py sf-pkg init`을 실행하여 `conanfile.py`를 생성합니다. 패키지 레지스트리의 사용자 이름을 사용하여 `requires` 필드에 `package/version@<username>` 형식으로 패키지 참조를 추가합니다. 그런 다음 같은 디렉터리에서 `sdk.py sf-pkg install`을 실행합니다. 설치된 패키지는 `project/sf-pkgs`에 배치되며, 해당 Kconfig 파일은 `menuconfig`의 `SiFli External Components` 아래에 포함됩니다.

컴포넌트를 게시하려면 해당 디렉터리에서 `sdk.py sf-pkg new --name <package_name>`을 실행하고 생성된 `conanfile.py`를 검토합니다. 생성 시 `--support-sdk-version <sdk_version_range>`를 전달하여 범위를 설정할 수 있습니다. 이 옵션의 사용 여부와 관계없이, 레시피의 `support_sdk_version`에 의도한 호환 SDK 범위가 선언되어 있는지 확인하고 필요하면 조정하십시오. 시맨틱 패키지 버전을 선택하고 패키지 메타데이터와 의존성을 완성합니다. 레지스트리에 인증한 후 패키지를 빌드하고 업로드합니다.

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

정확한 워크플로는 SDK 릴리스에 따라 다를 수 있습니다. 설정, 인증, 버전별 세부 사항은 SiFli의 [패키지 통합 가이드(중국어)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html), [패키지 생성 및 게시 가이드(영어)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html), [중국어판](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html)을 참조하십시오.

## 컴포넌트 품질 기준 { #component-quality-bar }

컴포넌트는 다음 조건을 갖추었을 때 공유할 준비가 된 것입니다.

- 설정과 의존성이 문서화되어 있고, 클린 체크아웃에서 빌드됩니다.
- 최소한의 예제가 하나 있습니다.
- 필요한 설정이 문서화되어 있습니다.
- 보드에 대한 암묵적 가정을 피합니다.
- 오류를 명확하게 보고합니다.
- 소유권과 해제 규칙을 포함하여 전역 리소스의 사용을 문서화합니다.
- 스레드, 콜백, 메모리 소유권 규칙을 명시합니다.

## 기록할 내용 { #what-to-record }

재사용 가능한 모든 컴포넌트는 다음을 문서화하는 것이 좋습니다.

- 지원되는 칩과 보드.
- 필요한 SDK 버전.
- 필요한 주변 장치와 핀.
- 필요한 RTOS/미들웨어 설정.
- 스레딩 및 콜백 동작.
- RAM, 플래시, 스택 요구량.
- 예제 프로젝트 경로.

## 피해야 할 함정 { #avoid-these-traps }

<div align="center"><em>표: 피해야 할 함정</em></div>

<div align="center" markdown>

| 함정 | 더 나은 접근 방식 |
|:-----|:----------------|
| 예제 전체를 모든 제품에 복사하는 것. | 안정적이고 재사용 가능한 계층만 추출합니다. |
| 컴포넌트 코드에 핀 이름을 숨기는 것. | 보드 리소스를 설정을 통해 전달합니다. |
| 디스플레이/오디오 경로가 하나뿐이라고 가정하는 것. | 지원되는 하드웨어 경로를 문서화합니다. |
| 메모리 사용량을 무시하는 것. | 스택, 힙, DMA, 버퍼 요구량을 기록합니다. |
| 예제 없이 배포하는 것. | 최소한의 통합 예제를 하나 포함합니다. |

</div>
