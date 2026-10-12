---
icon: lucide/code
description: "SF32LB52에서 OpenSiFli sifli-rs를 처음 평가하는 안내입니다. Rust 타깃 설치, 수정하지 않은 Blinky 예제 빌드, sftool 구성, SDK 복구 경로 유지를 다룹니다."
tags:
    - 시작하기
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs)는 SiFli MCU를 위한 Rust HAL, PAC, 플래시 테이블 작업을 제공합니다. 메인테이너는 이 프로젝트를 진행 중인 작업으로 표시하며 양산에 사용할 준비가 되지 않았다고 밝힙니다. 따라서 이 가이드는 양산 펌웨어 워크플로가 아니라 **평가 기준 구성**을 확립합니다.

시작하기 전에 같은 보드에서 [SiFli-SDK 시작하기](../sifli/getting-started-sifli-sdk.md)를 완료하십시오. 그러면 Rust 실험에서 플래시 기록이나 디버깅이 되지 않을 때 사용할 수 있는, 정상 동작이 확인된 시리얼 및 복구 경로를 확보할 수 있습니다.

## 필요한 것 { #what-you-need }

- SF32LB52 DevKit LCD와 USB-to-UART에 연결된 USB Type-C 데이터 케이블.
- Rust, 임베디드 개발, 명령줄에 대한 기본 지식.
- `git`과 [rustup](https://rustup.rs/)으로 설치한 최신 Rust 툴체인.
- 최신 [sifli-rs Get Started 가이드](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md)와 [Flash and Debug 가이드](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md).

!!! warning "탐색용 경로"
    이 가이드를 칩, 주변 장치, 보드 구성, 애플리케이션 스택이 양산에 사용할 수 있는 수준이라는 근거로 사용하지 마십시오. 포팅에 투자하기 전에 저장소의 지원 상태 정보에서 해당 타깃과 주변 장치를 확인하십시오.

## Rust 타깃 준비 { #prepare-the-rust-target }

저장소 가이드는 Arm Cortex-M Rust 타깃을 사용합니다. 문서화된 타깃을 설치합니다.

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

최신 저장소를 클론한 다음 SF32LB52 예제 디렉터리에서 작업합니다.

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

예제 디렉터리에는 Cargo 타깃 구성, 메모리 레이아웃, 빌드 스크립트, 예제 바이너리가 들어 있습니다. 이 파일들을 그대로 제품에 복사하지 마십시오. 보드와 플래시에 대한 가정이 반영되어 있으므로 대상 하드웨어에 맞게 검토해야 합니다.

## 플래시 러너 구성 { #configure-the-flash-runner }

저장소는 `sftool`을 일반적인 플래시 러너로 문서화하고 있습니다. `examples/sf32lb52x/.cargo/config.toml`에서 최신 Flash and Debug 가이드에 따라 러너를 보드의 USB-to-UART 포트로 설정합니다. 문서화된 형식은 다음과 같습니다.

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

처음 플래시에 기록할 때는 플래시 테이블, 부트로더, 애플리케이션 이미지가 필요할 수 있습니다. 정확한 이미지와 주소는 문서화된 보드 및 플래시 구성에 따라 달라집니다. Arduino, Zephyr, SiFli-SDK의 주소나 바이너리를 대신 사용하지 말고 저장소 가이드를 따르십시오.

## 기준 구성 빌드 및 실행 { #build-and-run-the-baseline }

러너를 구성했으면 수정하지 않은 Blinky 예제를 빌드하고 플래시에 기록합니다.

```bash
cargo run --bin blinky
```

컴파일 성공은 첫 번째 확인일 뿐입니다. 보드가 기대한 동작을 보이는지 확인하고 `cargo`와 `sftool`의 전체 출력을 보관하십시오. 그런 다음 다른 주변 장치를 시도하기 전에 Blink 지연 시간 같은 작고 되돌릴 수 있는 변경을 하나 적용하십시오.

## 기준 구성이 실패하는 경우 { #if-the-baseline-fails }

먼저 보드의 SiFli-SDK 기준 구성이 여전히 동작하는지 확인하십시오. 그런 다음 Rust 타깃, 커밋, 선택한 예제, Cargo 구성, `sftool` 명령과 출력, 보드 리비전, 시리얼 또는 디버그 로그를 수집하십시오. 업스트림 가이드에는 idle/WFI 동작과 관련해 디버그 동작이 불안정할 수 있다는 점과, 플래시 테이블 크기가 애플리케이션 이미지를 수용할 수 있어야 한다는 점이 명시되어 있습니다.

아키텍처, 지원 범위, 제품 적합성 판단은 [Develop의 Rust](../../develop/platforms/rust/overview.md)를 참조하십시오.

## 예제를 재사용하기 전에 { #what-sifli-should-add }

예제를 적용하기 전에 저장소가 사용하려는 정확한 보드와 주변 장치의 지원을 문서화하고 있는지 확인하고, 해당하는 Rust 타깃, 부트로더, 플래시 테이블 레이아웃, 디버그 경로를 검토하십시오. 정상 동작이 확인된 SiFli-SDK 기준 구성을 복구 수단으로 유지하십시오.
