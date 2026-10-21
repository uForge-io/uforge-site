---
icon: lucide/app-window
description: "VS Code에서 SiFli CodeKit을 처음 실행하는 안내입니다. 확장 설치, SF32 보드 선택, hello_world 빌드와 플래싱, 시리얼 콘솔 열기를 다룹니다."
tags:
    - 시작하기
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit은 SiFli-SDK 개발을 위한 VS Code 확장입니다. SDK 도구 설치, 보드 선택, 예제 빌드, 펌웨어 플래싱, 시리얼 콘솔 열기까지 단계별로 안내합니다.

IDE 워크플로를 선호한다면 이 경로를 사용하십시오. 버튼 뒤에서 실행되는 명령을 이해하려면 [수동 SiFli-SDK 가이드](getting-started-sifli-sdk.md)를 사용하십시오.

이 문서는 첫 실행 가이드입니다. `hello_world`가 동작한 후에는 CodeKit의 일상적인 역할, 재현성 기준, 장애 범위를 다루는 [CodeKit 도구 안내](../../develop/tools/codekit.md)를 참고하십시오.

## 준비 사항 { #what-youll-need }

**하드웨어**

- SiFli-SDK가 지원하는 SF32 개발 보드.
- 보드의 USB-to-UART 포트에 연결된 USB Type-C 데이터 케이블.
- Windows, macOS 또는 Linux를 실행하는 컴퓨터.

**소프트웨어**

- [Visual Studio Code](https://code.visualstudio.com/)
- SiFli CodeKit 확장.
- CodeKit이 SiFli-SDK를 클론하거나 가져오라고 요청하는 경우 Git.

**공식 문서**

- [SiFli CodeKit 설치 가이드](https://docs.sifli.com/projects/codekit/get-started/install.html)

## CodeKit 설치 { #install-codekit }

1. VS Code를 여십시오.
2. **Extensions**를 여십시오.
3. **SiFli-SDK-CodeKit**을 검색하십시오.
4. 확장을 설치하십시오.
5. 메시지가 표시되면 VS Code를 다시 로드하십시오.

SDK 관리를 열려면 VS Code 사이드바에서 SiFli 아이콘을 클릭하고 **SDK Manager**를 선택하십시오. **View > Command Palette**(기본 단축키 `F1`)를 열어 **Manage SiFli SDK installation**을 실행할 수도 있습니다. 정확한 레이블은 확장 버전에 따라 다를 수 있으므로 위에 링크된 공식 설치 가이드를 참조하십시오.

!!! tip
    필요한 동작을 찾을 수 없으면 Command Palette를 열고 `SiFli`를 검색하십시오.

## SiFli-SDK 설치 또는 선택 { #install-or-select-sifli-sdk }

CodeKit의 설정 흐름으로 SiFli-SDK를 설치하거나, 이미 클론한 SDK 사본을 지정하십시오. 대부분의 경우 **Release/Tag**를 선택하십시오. 버전이 고정되고 테스트를 거친 기준 구성입니다. 더 새로운 수정이나 기능이 필요하고 안정성이 다소 낮아질 수 있음을 감수할 수 있다면 **Branch**를 선택하십시오. 공식 가이드에 따르면 `release/vX.Y` 브랜치를 사용하면 안정성이 더 낮은 `main` 브랜치로 전환하지 않고도 해당 릴리스 라인의 최신 수정과 기능을 받을 수 있습니다. 다만 브랜치 내용은 시간이 지나면서 바뀔 수 있습니다.

중국 본토에서 작업하는 경우, 공식 가이드는 SDK 소스로 Gitee를, 툴체인 다운로드에는 SiFli 국내 미러를 사용하도록 권장합니다.

CodeKit이 SDK 위치를 요청하면 공백이 없는 짧은 경로를 지정하십시오. 예를 들면 다음과 같습니다.

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit은 SDK 자체의 설치 프로그램과 환경 스크립트를 사용합니다. 이를 통해 컴파일러, Python 환경, 빌드 도구, 플래시 도구를 수동 설정과 동일하게 준비할 수 있습니다.

## 예제 열기 { #open-an-example }

SDK의 `hello_world` 예제에서 시작하십시오.

```text
example/get-started/hello_world/rtt/project
```

해당 프로젝트 폴더를 VS Code에서 여십시오. CodeKit이 프로젝트 가져오기 마법사를 제공하면 `hello_world` 프로젝트를 선택한 뒤 SDK 루트를 자동으로 감지하도록 하십시오.

## 보드 선택 { #select-the-board }

하드웨어에 맞는 보드 구성을 선택하십시오. SF32LB52-DevKit-LCD급 보드의 일반적인 보드 이름은 다음과 같습니다.

```text
sf32lb52-lcd_n16r8
```

다른 보드를 사용하는 경우 CodeKit의 목록 또는 SDK의 지원 보드 문서에서 일치하는 보드 이름을 선택하십시오. 보드 이름은 메모리 레이아웃, 핀, 플래시 설정, 기본 주변 장치를 결정합니다.

## 빌드 { #build }

CodeKit의 **Build** 동작을 실행하십시오. 빌드가 성공하면 다음과 같은 보드별 출력 폴더가 생성됩니다.

```text
build_sf32lb52-lcd_n16r8_hcpu
```

빌드가 즉시 실패하면 CodeKit에 SiFli-SDK 설치 위치가 지정되어 있는지, SDK 환경 설치가 완료되었는지 확인하십시오.

## 플래싱 { #flash }

USB-to-UART 포트를 통해 보드를 연결한 다음 CodeKit의 **Flash** 또는 **Download** 동작을 실행하십시오.

시리얼 포트를 묻는 메시지가 표시되면 운영 체제에 맞는 항목을 선택하십시오.

- Windows에서는 해당하는 `COM` 포트를 선택하십시오.
- macOS에서는 `/dev/tty.*`가 아니라 `/dev/cu.*` 디바이스를 선택하십시오.
- Linux에서는 해당하는 `/dev/ttyUSB*` 또는 `/dev/ttyACM*` 디바이스를 선택하십시오.

플래싱 도구가 UART 다운로드 모드로 진입하지 않으면 전송을 시작하기 직전에 보드를 리셋하십시오. 문제가 계속되면 보드별 플래싱 안내를 따르십시오.

## 시리얼 콘솔 열기 { #open-the-serial-console }

CodeKit의 시리얼 모니터, VS Code의 시리얼 도구 또는 다른 터미널 프로그램을 사용하십시오. 리셋 후 콘솔에 읽을 수 있는 부팅 출력과 `hello_world` 예제 출력이 표시되어야 합니다.

읽을 수 있는 부팅 로그가 보이면 보드와 시리얼 설정이 올바릅니다. 출력이 깨지면 다른 시리얼 도구를 닫고 예제에서 사용하는 보레이트를 확인하십시오.

## 성공 확인 { #success-check }

다음 조건이 충족되면 다음 단계로 넘어갈 준비가 된 것입니다.

- CodeKit이 SDK 위치를 인식합니다.
- 선택한 보드가 하드웨어와 일치합니다.
- 빌드와 플래싱 동작이 완료됩니다.
- 리셋 후 시리얼 콘솔에 `hello_world` 출력이 표시됩니다.

## 문제 해결 { #troubleshooting }

<div align="center"><em>표: 문제 해결</em></div>

<div align="center" markdown>

| 증상 | 확인 사항 |
|:--------|:------|
| 시리얼 포트가 나타나지 않음 | 데이터 케이블, 다른 USB 포트 또는 보드의 USB-to-UART 커넥터를 사용해 보십시오. |
| CodeKit이 SDK를 찾지 못함 | CodeKit 설정 흐름을 다시 실행하고 SiFli-SDK 루트 폴더를 선택하십시오. |
| 빌드에서 도구를 찾지 못함 | CodeKit이 툴체인을 다시 설치하도록 하거나 SDK 설치 프로그램을 수동으로 한 번 실행하십시오. |
| 플래싱이 시작되지 않음 | 도구가 UART 다운로드 모드로 진입하지 않으면 전송 직전에 보드를 리셋하십시오. 문제가 계속되면 보드별 플래싱 안내를 따르십시오. |
| 시리얼 출력을 읽을 수 없음 | 보레이트를 확인하고 시리얼 모니터가 하나만 열려 있는지 확인하십시오. |

</div>

## 다음 단계 { #where-to-go-next }

- 이에 대응하는 터미널 명령을 이해하려면 [SiFli-SDK](getting-started-sifli-sdk.md)를 사용하십시오.
- `hello_world`가 동작한 후에는 [주변 장치 시작하기](../tutorials/beginner.md)로 이어가십시오.
- 실제 제품 기능을 시작할 때는 [Bluetooth 개요](../../learn/bluetooth/overview.md), [그래픽 개요](../../learn/graphics/overview.md), [오디오 개요](../../learn/audio/overview.md), [저전력 설계 개요](../../learn/low-power/overview.md)를 검토하십시오.

## 설정을 재현 가능하게 유지 { #what-sifli-should-add }

CodeKit과 SDK 버전, 선택한 릴리스 태그 또는 브랜치, 정확한 보드 타깃을 기록하십시오. 메뉴나 명령 레이블이 이 페이지와 다르면 설치된 버전의 기준 문서로 최신 [공식 설치 가이드](https://docs.sifli.com/projects/codekit/get-started/install.html)와 SDK의 [지원 보드 목록](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)을 참조하십시오.
