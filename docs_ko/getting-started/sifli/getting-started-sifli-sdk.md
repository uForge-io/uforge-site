---
icon: lucide/terminal
description: "포장을 뜯은 SF32 보드에서 SiFli-SDK로 UART를 통해 hello_world를 실행하기까지의 안내입니다. 툴체인 설치, scons 빌드, UART를 통한 플래싱을 다룹니다."
tags:
    - 시작하기
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

이 가이드는 포장을 뜯은 SF32 개발 보드에서 SF32 디바이스용 공식 RT-Thread 기반 SDK인 **SiFli-SDK**를 사용하여 UART로 `hello_world` 예제를 실행하기까지의 과정을 안내합니다.

Arduino, Zephyr 또는 MicroPython을 사용할 계획이더라도 이 가이드를 한 번은 실행해 볼 만합니다. 다른 프레임워크를 추가하기 전에 보드, 케이블, 시리얼 포트, 플래싱 흐름, 기본 툴체인이 동작하는지 확인할 수 있습니다.

## 준비 사항 { #what-youll-need }

**하드웨어**

- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) 같은 SF32 개발 보드, 또는 [SF32 제품군](../../sf32-products/family/SF32_family.md)에서 확인한 다른 보드.
- 보드의 USB-to-UART 포트에 연결된 USB Type-C **데이터** 케이블. 충전 전용 케이블이나 보조 USB 기능 포트는 사용할 수 없습니다.
- Windows, macOS 또는 Linux를 실행하는 컴퓨터.

**소프트웨어**

- [git](https://git-scm.com/)
- [`uv`](https://docs.astral.sh/uv/getting-started/installation/)로 부트스트랩하는 C/C++ 툴체인(SiFli-SDK의 설치 프로그램이 컴파일러, 디버거, Python 환경을 가져옵니다)
- [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK) 저장소 자체

**공식 레퍼런스**

- [SiFli-SDK 설치 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDK 지원 보드](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli SiFli-SDK 저장소](https://github.com/OpenSiFli/SiFli-SDK)
- [OpenSiFli SiFli-SDK 릴리스](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "IDE를 선호하십니까?"
    SiFli는 SDK 설정, 빌드, 플래싱 흐름을 안내형 동작으로 묶은 VS Code용 **SiFli-SDK-CodeKit** 확장도 배포합니다. 해당 워크플로를 선호한다면 [SiFli CodeKit](getting-started-sifli-codekit.md)을 참조하십시오.

## 툴체인 설치 { #install-the-toolchain }

재현 가능한 기준 구성을 위해 `main`이 아니라 배포된 릴리스 태그를 사용하십시오. 이 검토 시점에는 `v2.5.1`이 배포된 최신 태그입니다. 시작하기 전에 더 새로운 태그가 있는지 [공식 릴리스 목록](https://github.com/OpenSiFli/SiFli-SDK/releases)을 확인하십시오. `release/v2.5` 브랜치는 해당 릴리스 라인의 업데이트를 받지만 시간이 지나면서 바뀔 수 있습니다.

=== "macOS / Linux"

    SiFli-SDK 스크립트의 기반인 패키지/환경 관리자 `uv`를 설치합니다.

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    SDK를 클론합니다.

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    설치 프로그램을 실행한 다음 SDK 환경을 셸에 로드합니다.

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    `uv`를 설치합니다(PowerShell).

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    SDK를 클론합니다.

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    설치 프로그램을 실행한 다음 SDK 환경을 로드합니다.

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK에는 서브모듈이 포함되어 있습니다"
    GitHub의 "Download ZIP" 옵션에는 필요한 서브모듈이 포함되지 않습니다. `git clone --recursive`를 사용하십시오. 서브모듈 없이 이미 클론했다면 SDK 루트에서 `git submodule update --init --recursive`를 실행하십시오.

!!! note "중국 본토에서 작업하십니까?"
    설치하기 전에 셸에서 `SIFLI_SDK_MIRROR_CHINA`를 `1`로 설정하십시오. macOS/Linux에서는 `export SIFLI_SDK_MIRROR_CHINA=1`을, PowerShell에서는 `$env:SIFLI_SDK_MIRROR_CHINA = "1"`을 사용합니다. GitHub 대신 [Gitee 미러](https://gitee.com/SiFli/sifli-sdk)에서 클론할 수도 있습니다. 자세한 내용은 [설치 가이드](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)를 참조하십시오.

`install.sh` / `install.ps1`은 일치하는 컴파일러, 디버거, Python 의존성을 다운로드합니다. SDK 버전이 바뀌면 다시 실행하십시오. `export.sh` / `export.ps1`은 현재 터미널에서 해당 환경을 활성화합니다. 빌드하려고 새 터미널을 열 때마다 실행하십시오. Windows에서는 PowerShell에서 `.ps1` 스크립트를 실행하십시오.

## 보드 타깃 선택 { #choose-the-board-target }

`scons --board`에 전달하는 값은 `customer/boards` 아래의 보드 디렉터리 이름입니다. 사용 중인 키트에 장착된 메모리와 디스플레이 구성에 맞는 타깃을 선택하십시오. 아래 이름은 대소문자를 구분합니다.

<div align="center" markdown>

*SiFli-SDK 개발 키트 빌드 타깃*

| 개발 키트 | 정확한 `scons --board` 타깃 |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

듀얼 코어 보드에서 코어 접미사를 생략하면 HCPU 구성이 빌드됩니다. 필요하면 `_hcpu`를 명시적으로 사용하거나, `_lcpu`를 추가하여 LCPU 구성을 빌드할 수 있습니다. 예: `scons --board=eh-lb551_lcpu`. 사용하는 보드 구성이 이 표에 없으면 SiFli의 [지원 보드 목록](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)을 최신 기준 정보로 사용하십시오.

## "Hello World" 예제 빌드 { #build-the-hello-world-example }

환경을 로드한 상태에서 사용 중인 보드용 RT-Thread `hello_world` 예제를 빌드합니다.

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

`sf32lb52-lcd_n16r8`을 사용 중인 보드 이름으로 바꾸십시오. 사용 가능한 이름은 [지원 보드 목록](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)을 참조하십시오. `-j8`은 8개의 병렬 작업으로 빌드하며, 사용 중인 컴퓨터에 맞게 조정하십시오. 이 명령은 코어 접미사를 생략했으므로 HCPU를 빌드하고 바이너리를 `build_sf32lb52-lcd_n16r8_hcpu/`에 기록합니다. `_lcpu` 타깃을 지정하면 출력 디렉터리는 `_lcpu` 접미사를 사용합니다.

!!! tip "사용자 지정 설정이 필요하십니까?"
    프로젝트 디렉터리에서 `sdk.py menuconfig --board=<board_name>`을 실행하면 대화형 구성 메뉴가 열립니다. ++esc++를 두 번 누른 다음 메시지가 표시되면 구성을 저장하도록 선택합니다.

## 보드 플래싱 { #flash-the-board }

보드를 USB로 연결한 상태에서 빌드로 생성된 플래싱 스크립트를 실행합니다.

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    메시지가 표시되면 운영 체제에 나타나는 시리얼 디바이스 경로를 입력합니다. macOS에서는 `/dev/tty.*`가 아니라 `/dev/cu.*` 디바이스(예: `/dev/cu.usbserial-12345678`)를 사용하고, Linux에서는 `/dev/ttyUSB0` 같은 해당 디바이스 경로를 사용합니다.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    `please input serial port number` 메시지가 표시되면 COM 포트의 번호만 입력하고(예: `COM19`는 `19`) Enter를 누릅니다.

!!! tip
    플래싱 도구가 UART 다운로드 모드로 진입하지 않으면 전송을 시작하기 직전에 보드를 리셋하십시오. 문제가 계속되면 보드별 플래싱 안내를 따르십시오.

## 실행 확인 { #see-it-run }

플래싱이 완료되면 보드를 리셋하거나 자동으로 리셋되도록 합니다. 보드의 기본 보레이트로 시리얼 터미널을 엽니다. UART로 부팅 출력과 `hello_world` 예제 출력이 표시되어야 합니다.

## 성공 확인 { #success-check }

다음 조건이 충족되면 다음 단계로 넘어갈 준비가 된 것입니다.

- 프로젝트가 오류 없이 빌드됩니다.
- UART 플래싱 스크립트가 완료됩니다.
- 시리얼 콘솔에 읽을 수 있는 부팅 출력이 표시됩니다.
- 리셋 후 `hello_world` 예제가 출력됩니다.

## 다음 단계 { #where-to-go-next }

- **칩 선택:** [SF32 제품군 개요](../../sf32-products/family/SF32_family.md)에서 LB52, LB55, LB56, LB58 시리즈를 비교하십시오.
- **더 많은 예제 살펴보기:** `hello_world` 외에도 SDK에는 BLE, 클래식 Bluetooth, LVGL 그래픽, 오디오, 저전력 모드 예제가 포함되어 있습니다.
- **다른 프레임워크 선호:** [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) 또는 [MicroPython](../micropython/getting-started-micropython.md)으로 이어가십시오.
- **막혔을 때:** 일반적인 툴체인, J-Link, 디버깅 문제는 [SiFli FAQ](https://wiki.sifli.com/en/faq/index.html)를 확인하십시오.

## 동작하는 기준 구성 기록 { #what-sifli-should-add }

반복 가능한 설정을 위해 SDK 태그 또는 브랜치, 정확한 `scons --board` 타깃, 호스트 운영 체제, 시리얼 포트, 사용 중인 보드에서 동작한 플래싱 절차를 기록하십시오. SDK를 업데이트하거나 보드를 바꿀 때는 공식 [지원 보드 목록](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)과 [릴리스 목록](https://github.com/OpenSiFli/SiFli-SDK/releases)을 다시 확인하십시오.
