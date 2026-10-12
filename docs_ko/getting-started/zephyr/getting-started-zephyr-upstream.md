---
icon: lucide/layers
description: "Zephyr 업스트림의 SF32LB52 DevKit LCD 보드 타깃을 빌드하고 플래시에 기록한 다음, 문서화된 콘솔과 지원 기능을 확인합니다."
tags:
    - 시작하기
    - Zephyr
---

# Zephyr 업스트림 { #zephyr-upstream }

`sf32lb52_devkit_lcd` 보드는 Zephyr v4.3.0부터 업스트림 Zephyr에서 지원되고 유지 관리되고 있습니다. [v4.3.0 릴리스 노트](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html)와 [SF32LB52 DevKit LCD 보드 문서](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)를 참조하십시오. 이 가이드는 v4.3.0 워크스페이스를 만들고, 첫 샘플을 빌드한 다음, 보드에 플래싱합니다. 더 폭넓은 SF32 공식 기능 세트가 필요하면 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md)를 사용하십시오.

!!! note "보드 기능 목록 확인"
    업스트림 보드 정의만으로는 모든 주변 장치나 동작 모드가 활성화되었거나 제품용으로 검증되었다고 확인할 수 없습니다. 보드 문서의 지원 기능 표를 확인하고, 사용하는 보드 리비전에서 필요한 동작을 검증하십시오.

## 필요한 것 { #what-youll-need }

**하드웨어**

- SF32LB52 DevKit LCD. SF32LB525UC6, 8 MB OPI-PSRAM, 128 Mb QSPI-NOR을 탑재한 SF32LB52x-MOD-N16R8 모듈을 기반으로 합니다.
- 보드의 USB-to-UART 경로에 연결한 USB Type-C 데이터 케이블.

**소프트웨어**

- Zephyr v4.3.0과 해당 [시작하기 안내](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)에서 지원하는 호스트 OS.
- Zephyr 호스트 의존성과 Zephyr SDK. 해당 가이드의 설명대로 ARM Cortex-M 타깃용으로 설치합니다.
- Git, Python 3, `pip`.

## 툴링 준비 { #prepare-the-tooling }

먼저 Zephyr의 [v4.3.0 시작하기 가이드](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)에 따라 호스트 의존성과 Zephyr SDK 설정을 완료하십시오. 그런 다음 Python 환경을 만들고 일치하는 Zephyr 태그로 워크스페이스를 초기화합니다.

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

아래의 빌드 및 플래시 단계에서도 이 환경을 활성 상태로 유지하십시오.

## 보드 확인 { #confirm-the-board }

워크스페이스에 타깃이 포함되어 있는지 확인합니다.

```bash
west boards
```

예상되는 보드 이름은 다음과 같습니다.

```text
sf32lb52_devkit_lcd
```

## Hello World 빌드 { #build-hello-world }

Zephyr의 표준 Hello World 샘플을 빌드합니다.

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

빌드에 성공하면 워크스페이스에서 보드 타깃과 툴체인을 사용할 수 있음을 확인한 것입니다. 모든 보드 주변 장치를 검증하는 것은 아닙니다.

## 보드에 플래시 기록 { #flash-the-board }

업스트림 보드는 기본 플래시 러너로 `sftool`을 선언합니다. [OpenSiFli sftool](https://github.com/OpenSiFli/sftool)을 설치하고 `PATH`에 있는지 확인한 다음, 보드 문서에 기재된 절차에 따라 보드를 시리얼 다운로드 모드로 전환하십시오. 그런 다음 실행합니다.

```bash
west flash
```

플래시 기록에 실패하면 시리얼 포트 선택, 다운로드 모드, 그리고 [보드 문서](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)의 러너 안내를 확인하십시오.

## 시리얼 콘솔 열기 { #open-the-serial-console }

업스트림 보드 구성은 Zephyr 콘솔을 `1000000` 보레이트의 `usart1`로 라우팅합니다. 시리얼 터미널로 해당 UART를 열고 다음 출력을 확인하십시오.

```text
Hello World! sf32lb52_devkit_lcd
```

## 다음 샘플 선택 { #choose-a-next-sample }

업스트림 보드 문서의 지원 기능 표와 [Zephyr 샘플 브라우저](https://docs.zephyrproject.org/4.3.0/samples/index.html)를 함께 사용하여 다음에 평가할 API 또는 주변 장치를 선택하십시오. 샘플을 제품 준비 상태의 증거로 간주하기 전에, 해당 기능이 이 보드에 나열되어 있는지와 필요한 구성이 활성화되어 있는지 확인하십시오.

## 문제 해결 { #troubleshooting }

<div align="center"><em>표: 문제 해결</em></div>

<div align="center" markdown>

| 증상 | 확인 사항 |
|:--------|:------|
| `west boards`에 SF32 타깃이 표시되지 않음 | 워크스페이스가 업스트림 Zephyr v4.3.0 이상에서 초기화되었는지, `west update`가 완료되었는지 확인하십시오. |
| 컴파일 전에 빌드가 실패함 | Python 환경이 활성 상태인지, ARM Cortex-M용 Zephyr SDK가 설치되어 있는지, v4.3.0 requirements가 설치되었는지 확인하십시오. |
| 보드는 빌드되지만 플래시에 기록되지 않음 | `sftool`이 설치되어 `PATH`에 있는지, 선택한 시리얼 포트가 올바른지, 보드가 시리얼 다운로드 모드인지 확인하십시오. |
| 시리얼 출력이 없음 | `usart1`, `1000000` 보레이트, USB-to-UART 연결, 그리고 다른 터미널이 해당 포트를 열고 있는지 확인하십시오. |
| 주변 장치 샘플이 실패함 | 보드의 지원 기능 표와 샘플 구성을 확인하십시오. 기본 보드 타깃에서 모든 주변 장치가 활성화되어 있다고 가정하지 마십시오. |

</div>

## 제품 통합 전 확인 사항 { #before-product-integration }

- 업스트림 보드의 지원 기능 표와, 사용하려는 샘플의 정확한 구성을 확인하십시오.
- 타깃 보드와 제품 구성에서 필요한 인터페이스, 성능, 메모리 사용량, 전력 동작을 검증하십시오. Hello World 빌드 성공은 툴체인 스모크 테스트일 뿐입니다.
- 설계가 이 Zephyr 타깃에 나열되지 않았거나 검증되지 않은 기능에 의존한다면, 업스트림 기능 범위를 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md)와 비교하십시오.
