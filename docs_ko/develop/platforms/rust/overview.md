---
icon: lucide/code
description: "OpenSiFli의 sifli-rs(sifli-hal, sifli-pac)를 통한 SF32 커뮤니티 Rust 지원 평가: 현재 성숙도, 적합한 시나리오와 적합하지 않은 시나리오, 위험 체크리스트."
tags:
    - 개발
    - Rust
---

# Rust { #rust }

OpenSiFli의 Rust 프로젝트 [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs)에는 HAL, PAC, 플래시 테이블 크레이트, 예제, 플래싱 및 디버깅 관련 안내가 포함되어 있습니다.

프로젝트 유지관리자는 아직 개발 중이며 양산에 사용할 준비가 되지 않았다고 설명합니다. 하드웨어 저수준까지 다룰 수 있고 수정 사항을 업스트림에 기여할 준비도 된 팀이 아니라면, SF32에서 Rust는 탐색용 경로로만 취급하십시오.

초기 툴체인 설정, 수정하지 않은 Blinky 빌드, 플래싱 도구 구성은 [Rust 시작하기](../../../getting-started/rust/getting-started-rust.md)를 참조하십시오. 이 페이지에서는 현재 지원 수준을 평가하고, 기준 구성을 넘어 Rust 적용을 진행할지 판단합니다.

## OpenSiFli에서 언급한 크레이트 { #crates-mentioned-by-opensifli }

<div align="center"><em>표: OpenSiFli에서 언급한 크레이트</em></div>

<div align="center" markdown>

| 크레이트 | 용도 |
|:------|:--------|
| `sifli-hal` | 하드웨어 추상화 계층. |
| `sifli-pac` | 주변 장치 액세스 크레이트. |
| `sifli-flash-table` | 플래시 테이블 지원. |

</div>

## Rust가 적합한 경우 { #when-rust-makes-sense }

다음을 원한다면 Rust가 적합할 수 있습니다.

- 임베디드 Rust를 실험하려는 경우.
- 저수준 펌웨어 코드에서 강한 타입 안정성을 활용하려는 경우.
- `embedded-hal` 스타일의 드라이버를 개발할 기반을 마련하려는 경우.
- SF32 Rust 생태계에 기여하려는 경우.

현재 양산 펌웨어에는 SiFli-SDK를 사용하십시오.

## 평가 게이트 { #evaluation-gates }

제품 포팅을 시작하기 전에 타깃 보드에서 첫 실행 기준 구성이 동작하는지 확인하십시오. 그런 다음 필요한 각 주변 장치, 플래시 레이아웃, 디버그 경로, 런타임 기능을 각각 독립적으로 검증하십시오. 모든 결과에 대해 업스트림 커밋, Rust 타깃, Cargo 구성, 보드 리비전, 복구 절차를 기록하십시오.

이 저장소는 `sifli-hal`, `sifli-pac`, 플래시 테이블 도구, Embassy 스타일의 비동기 예제를 사용합니다. 따라서 애플리케이션의 성공 여부는 크레이트가 컴파일되는지만이 아니라 이 구성 요소들이 함께 동작하는 방식에 달려 있습니다. 지원이 부족한 부분을 조사할 때는 재현 사례를 가능한 한 작게 유지하십시오.

## 위험 체크리스트 { #risk-checklist }

- 크레이트가 정확한 칩을 지원합니까?
- HAL이 필요한 주변 장치를 다룹니까?
- 플래시 레이아웃이 보드와 호환됩니까?
- 사용하는 프로브/도구에 대한 디버깅 흐름이 문서화되어 있습니까?
- 같은 보드를 SiFli-SDK 또는 `sftool`로 복구할 수 있습니까?
- 팀이 수정 사항을 기여하는 데 부담이 없습니까?

## 적합한 경우 / 적합하지 않은 경우 { #good-fit-poor-fit }

<div align="center"><em>표: 적합한 경우 / 적합하지 않은 경우</em></div>

<div align="center" markdown>

| 적합한 경우 | 적합하지 않은 경우 |
|:---------|:---------|
| 실험과 드라이버 탐색. | 벤더 지원이 필요한 양산 일정. |
| 이미 임베디드 Rust를 사용하는 팀. | 현재 시점에 완전한 Bluetooth/디스플레이/오디오 스택이 필요한 제품. |
| HAL/PAC 성숙도에 기여. | Arduino나 SDK 예제가 더 빠른 일회성 프로토타입. |

</div>
