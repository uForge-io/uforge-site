---
icon: lucide/terminal
description: "SiFli-SDK 개발자의 일상 루프: 환경 활성화, scons 빌드, UART 플래싱 또는 sftool을 통한 플래시 기록, 시리얼 출력 모니터링."
tags:
    - Develop
    - SiFli-SDK
---

# 빌드, 플래시, 모니터 { #build-flash-monitor }

이 페이지는 SiFli-SDK의 일상 루프를 요약합니다. 환경을 활성화하고, `scons`로 빌드하고, 보드에 펌웨어를 기록하고, 로그를 확인합니다.

## SDK 활성화 { #activate-the-sdk }

사용 중인 SDK 버전에 맞는 [공식 설치 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)를 사용하여 SDK 환경을 설치합니다. 빌드하기 전에 새 터미널을 열 때마다 SDK 루트에서 export 스크립트를 실행하여 환경을 활성화합니다.

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

export 스크립트는 현재 SDK 체크아웃과 연결된 환경을 해당 터미널에 로드합니다. 설치 및 환경 관리 단계는 SDK 버전에 따라 다를 수 있으므로, 해당하는 공식 설정 가이드를 따르십시오.

## 빌드 { #build }

예제 프로젝트 디렉터리에서 다음을 실행합니다.

```bash
scons --board=<board_name> -j8
```

`-j`는 호스트 머신에 맞게 설정하십시오. 보드 이름에 코어가 지정되어 있지 않으면 SDK는 기본적으로 HCPU를 선택합니다. 예를 들어 `sf32lb52-lcd_n16r8`은 `build_sf32lb52-lcd_n16r8_hcpu/`를 생성합니다. 확정된 보드/코어 타깃에 대해 보고된 디렉터리를 사용하십시오. 보드 식별자에 이미 코어가 지정되어 있다면 `_hcpu`를 다시 붙이면 안 됩니다.

## 클린 리빌드 { #clean-rebuilds }

보드를 전환하거나, 주요 설정을 변경하거나, 의심스러운 빌드 산출물을 조사할 때는 클린 리빌드를 사용하십시오. 예제 프로젝트 디렉터리에서 문서화된 SCons 클린 옵션을 실행합니다.

```bash
scons -c
```

이 명령은 빌드 타깃과 생성된 임시/오브젝트 파일을 정리합니다. 이후 의도한 보드 설정으로 다시 빌드하십시오.

## 플래시 { #flash }

예를 들어 `sf32lb52-lcd_n16r8` HCPU 타깃의 경우 빌드가 생성한 UART 플래싱 스크립트를 사용합니다.

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli는 시리얼 인터페이스를 통해 SiFli SoC와 통신하는 오픈소스 명령줄 유틸리티인 [`sftool`](https://github.com/OpenSiFli/sftool)도 공개하고 있습니다. 문서화된 동작으로는 플래시 쓰기, 읽기, 삭제와 칩 리셋 제어가 있습니다. 지원되는 칩, 스토리지 유형, 명령 옵션은 이 도구의 README를 확인하십시오.

## 모니터 { #monitor }

보드와 예제에 맞게 구성된 시리얼 터미널을 사용합니다. 시리얼 로그에는 부트 출력, RT-Thread 시작 메시지, 애플리케이션 출력 또는 셸 프롬프트가 표시되어야 합니다.

다음을 기록해 두십시오.

- 보드 이름.
- 시리얼 포트.
- 보레이트.
- 빌드 명령.
- 플래시 명령.
- SDK 브랜치 또는 릴리스.

## 일상 개발 루프 { #daily-developer-loop }

<div align="center"><em>표: 일상 개발 루프</em></div>

<div align="center" markdown>

| 단계 | 목표 |
|:-----|:-----|
| 활성화 | SDK 환경을 현재 터미널에 로드합니다. |
| 설정 | 보드와 기능 옵션을 선택합니다. |
| 빌드 | 보드별 바이너리를 생성합니다. |
| 플래시 | 이미지를 하드웨어에 기록합니다. |
| 모니터 | 부트 및 애플리케이션 동작을 확인합니다. |
| 기록 | 재현이 가능하도록 명령/로그 세부 정보를 저장합니다. |

</div>

## 일치하는 예제에서 시작하기 { #start-from-a-matching-example }

프로젝트를 새로 만들거나 크게 수정하기 전에, 보드와 핵심 서브시스템에 맞는 가장 가까운 [SDK 예제](../../examples/index.md)를 선택하십시오. 먼저 수정하지 않은 그 기준 구성을 빌드하고, 플래시에 기록하고, 모니터링한 다음, 해당 보드 이름, SDK 릴리스, 명령, 기대 출력을 적용한 프로젝트와 함께 보관하십시오.

[CodeKit](../../tools/codekit.md)을 사용하는 경우 동일한 증빙 자료를 보존하고, 에디터 동작을 SDK 명령 흐름으로 재현할 수 있는지 확인하십시오.

## 문제 해결 { #troubleshooting }

<div align="center"><em>표: 문제 해결</em></div>

<div align="center" markdown>

| 증상 | 확인 사항 |
|:--------|:------|
| 빌드 도구를 찾을 수 없음 | 현재 터미널에서 `export.sh` / `export.ps1`을 다시 실행합니다. |
| 알 수 없는 보드 이름 | SDK 지원 보드 문서를 확인합니다. |
| 플래싱 스크립트가 포트를 열 수 없음 | 시리얼 터미널을 닫고 USB-UART 케이블/커넥터를 확인합니다. |
| 플래시 기록이 시작되지 않음 | 보드에 문서화된 플래싱 순서를 따릅니다. `sf32lb52-lcd_n16r8`의 경우 시리얼 포트를 선택한 후 보드를 재시작하고 2초 이내에 Enter를 눌러 플래싱을 시작합니다. 다른 보드는 해당 타깃 전용 순서를 사용하십시오. 보드 전원과 선택한 포트/UART 연결을 확인합니다. |
| 시리얼 출력을 읽을 수 없음 | 보레이트를 확인하고, 충전 전용 케이블이 아닌 데이터 UART를 사용합니다. |

</div>

## 인계 체크리스트 { #handoff-checklist }

프로젝트를 다른 개발자에게 넘기기 전에 다음을 포함하십시오.

- SDK 브랜치 또는 커밋.
- 보드 이름.
- 설정/설치 참고 사항.
- 빌드 명령.
- 플래시 명령.
- 모니터 설정.
- 기대하는 첫 로그 줄.
- 복구 명령.
