---
icon: lucide/rocket
title: "시작하기 개요"
description: "첫 SF32 소프트웨어 경로 선택하기: SiFli-SDK, CodeKit, Zephyr, Arduino, Rust, MicroPython의 현재 상태와 필요한 하드웨어."
tags:
    - 시작하기
    - SF32
---

# 시작하기 개요 { #getting-started }

SF32 디바이스는 여러 소프트웨어 경로를 지원합니다. 현재 SiFli가 공식 제공하는 첫 실행 경로는 SiFli-SDK와 CodeKit입니다. SF32LB52 DevKit LCD는 Zephyr v4.3.0부터 업스트림 Zephyr에서 지원 및 유지 관리되고 있습니다. OpenSiFli는 베타 단계의 ArduinoCore-zephyr 패키지를 제공하며, SF32LB52용 Rust 지원을 개발하고 있습니다. MicroPython은 아직 검증된 튜토리얼에 필요한 공식 펌웨어 이미지와 보드별 지침이 마련되지 않았습니다.

기준 개발 워크플로와 각 경로의 현재 지원 범위는 [개발 개요](../develop/index.md)를 참조하십시오. 아래 표는 시작할 경로를 고르는 용도로만 사용하십시오. 지원 보드와 제한 사항은 각 플랫폼 페이지에서 확인할 수 있습니다.

## 경로 선택 { #choose-your-path }

<div align="center"><em>표: 경로 선택</em></div>

<div align="center" markdown>

| 경로 | 현재 상태 | 시작 위치 |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | SF32 개발의 기준이 되는 SiFli 공식 경로입니다. RT-Thread, Bluetooth, 그래픽, 오디오, 저전력, 보드 브링업을 지원합니다. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | SDK 설정, 프로젝트 생성, 빌드, 플래싱, 시리얼 모니터를 지원하는 SiFli 공식 VS Code 워크플로입니다. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | `sf32lb52_devkit_lcd`는 Zephyr v4.3.0부터 업스트림에서 지원 및 유지 관리됩니다. | [Zephyr 업스트림](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | SF32LB52 DevKit LCD용 OpenSiFli 베타 ArduinoCore-zephyr 패키지를 사용할 수 있습니다. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | OpenSiFli `sifli-rs`는 개발 중인 Rust 평가 경로이며, 양산용으로는 준비되지 않았습니다. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | 공식 펌웨어 이미지, 플래시 명령, REPL 설정, 지원 API에 관한 세부 정보가 아직 필요합니다. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## 필요한 것 { #what-you-need }

선택한 소프트웨어 경로가 지원하는 보드로 시작하십시오. 정확한 플래싱 및 시리얼 연결 방식은 보드와 프레임워크에 따라 다를 수 있습니다.

- [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md) 같은 SF32 개발 보드.
- 데이터 전송이 가능한 케이블과 해당 보드 및 프레임워크에 지정된 프로그래밍/시리얼 인터페이스. SF32LB52-DevKit-LCD에서는 SiFli의 [연결 지침](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html)에 따라 시리얼 플래싱에 USB-to-UART 포트를 사용하십시오. 전용 USB 기능 포트와 혼동하지 마십시오.
- Windows, macOS 또는 Linux가 실행되는 컴퓨터.
- 부팅 로그와 예제 출력을 볼 수 있도록 보드의 콘솔에 맞게 설정한 시리얼 터미널.

!!! tip "데이터 케이블 사용"
    충전 전용 USB 케이블은 처음 실행할 때 실패하는 흔한 원인입니다. 보드에 전원은 들어오지만 시리얼 포트가 나타나지 않으면, 정상 동작이 확인된 데이터 케이블과 직접 연결된 USB 포트를 사용해 보십시오.

## 권장 첫 실행 { #recommended-first-run }

SF32 보드를 처음 사용한다면 [SiFli-SDK](sifli/getting-started-sifli-sdk.md)로 시작하십시오. SF32용 기준 소프트웨어 스택이며, 보드, 케이블, 시리얼 포트, 플래시 절차, 툴체인이 모두 동작하는지 확인하기에 가장 신뢰할 수 있는 기준 구성입니다.

`hello_world`가 정상적으로 실행된 후에는 사용 중인 하드웨어를 정확히 지원하는 다른 프레임워크로 전환하십시오. 그렇게 하면 이후 실험이 실패하더라도 정상 동작이 확인된 복구 경로를 확보할 수 있습니다.

## 성공의 기준 { #what-success-looks-like }

시작하기 가이드를 마칠 때까지 다음을 갖추는 것이 좋습니다.

- 첫 예제를 빌드하거나 불러온 상태.
- 보드의 플래시에 기록한 상태.
- 시리얼 콘솔을 연 상태.
- 부팅 로그, `hello_world`, 셸 프롬프트, REPL 배너 같은 예측 가능한 출력을 확인한 상태.
- 동작했던 보드 이름, 시리얼 포트, 플래시 명령을 기록한 상태.

이러한 정보는 프로젝트 노트에 함께 보관하십시오. 예제를 수정하기 시작한 뒤 정상 동작하는 설정으로 가장 빨리 돌아가는 방법입니다.

## 튜토리얼로 계속하기 { #continue-with-tutorials }

첫 실행 절차를 반복해 같은 결과를 낼 수 있게 되면 [튜토리얼 개요](tutorials/overview.md)로 이어가십시오. 튜토리얼은 온보딩의 다음 단계입니다. 주변 장치 하나를 먼저 익힌 뒤 여러 서브시스템을 결합하고, 마지막으로 제품에 필요한 검증 작업을 연습합니다.

## 개발로 넘어갈 시점 { #when-to-move-to-develop }

시작하기는 정상 동작이 확인된 첫 실행을 재현할 수 있게 되면 끝납니다. [개발 개요](../develop/index.md)는 플랫폼 성숙도, 도구, 플래시/디버그 워크플로, 펌웨어 아키텍처, 제품 통합을 다루는 지속적인 엔지니어링 참고 문서입니다. 특히 첫 실행 이후 일상적인 개발 워크플로에서 CodeKit이 하는 역할은 [CodeKit 도구 참고 문서](../develop/tools/codekit.md)에서 확인하십시오. 이 페이지는 첫 실행 경로에만 사용하십시오.

## 개발 경로를 선택하기 전에 { #before-choosing-a-development-path }

소프트웨어 경로를 채택하기 전에 해당 문서가 사용 중인 보드와 소프트웨어 버전을 정확히 다루는지 확인하십시오. 특히 다음을 확인하십시오.

- SiFli-SDK, CodeKit, Zephyr, Arduino, MicroPython에 대해 보드별로 공개된 지원 및 성숙도 매트릭스.
- 지원되는 각 소프트웨어 경로가 사용하는 정확한 보드 식별자.
- Windows, macOS, Linux용 플래싱 지침.
- 각 첫 예제에서 기대되는 시리얼 출력.
- 플래시 실패나 잘못된 펌웨어 이미지에 대한 복구 절차.
- 특히 Bluetooth, 디스플레이, 스토리지, USB, 저전력 동작에 관한 프레임워크의 알려진 제한 사항.
- 호환되는 SDK, CodeKit, 패키지, 펌웨어 이미지, 보드 지원 버전을 명시한 릴리스 노트.

하나의 보드에 대한 지원이 모든 SF32 보드에 적용된다고 가정하지 말고, 사용할 보드와 소프트웨어 버전을 정확히 확인하십시오.
