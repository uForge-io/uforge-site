---
icon: lucide/circuit-board
description: "SF32LB56-DevKit-LCD 개발 보드: SF32LB56xV 모듈 기반의 디스플레이, 오디오, 스토리지, 주변 장치 개발 플랫폼입니다."
tags:
    - 하드웨어
    - 개발 보드
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD는 SF32LB56-MOD-N16R12N1 또는 SF32LB56-MOD-A128R12N1 모듈 중 하나를 탑재할 수 있는 디스플레이 지향 개발 보드이며, 두 모듈 모두 SF32LB56xV 시리즈 디바이스를 사용합니다. 커스텀 SF32LB56x 보드를 설계하기 전에 디스플레이 인터페이스, 오디오, 이동식 스토리지, 주변 장치 드라이버를 평가하는 데 사용하십시오.

## 가장 적합한 용도 { #what-it-is-best-for }

- MIPI-DPI(RGB), SPI, DSPI, QSPI 또는 8비트 MCU/8080 인터페이스를 사용하는 디스플레이 애플리케이션.
- I2C를 통한 터치스크린 통합.
- 아날로그 마이크 입력과 온보드 Class-D 파워 앰프를 통한 아날로그 출력을 사용하는 오디오 실험.
- SDIO/TF 카드 스토리지와 범용 주변 장치 드라이버 개발.
- 캐리어 보드를 확정하기 전에 SF32LB56 모듈 기반 제품 아키텍처 평가.

## 보드 리소스 { #board-resources }

<div align="center"><em>표: SF32LB56-DevKit-LCD 리소스</em></div>

<div align="center" markdown>

| 리소스 | 보드 구현 | 실용적 용도 |
|:---------|:---------------------|:--------------|
| N16R12N1 구성 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR, 4 MB + 8 MB OPI-PSRAM, 1 MB QSPI-NOR; 모듈 기반 평가 및 캐리어 보드 계획. |
| A128R12N1 구성 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND, 4 MB + 8 MB OPI-PSRAM, 1 MB QSPI-NOR; 모듈 기반 평가 및 캐리어 보드 계획. |
| 보드 크기 및 온도 | 65 mm × 38 mm; 모델 가이드 기준 -40 °C~85 °C | 기구 및 환경 계획. |
| 디스플레이 | ALIENTEK 핀 순서를 사용하는 40핀, 0.5 mm FPC 커넥터를 통한 24비트 MIPI-DPI RGB; 40핀 2 × 20 헤더의 SPI/DSPI/QSPI 및 8비트 MCU/8080 신호 | 패널 브링업 및 디스플레이 드라이버 개발. |
| 터치 | I2C 터치스크린 지원 | 인터랙티브 디스플레이 프로토타입. |
| 오디오 | 아날로그 MEMS 마이크 입력 1개와 온보드 Class-D PA 채널 1개; 모델 가이드 기준 스피커 출력 최대 3 W / 4 Ω | 녹음 및 로컬 재생 실험; 스피커 부하와 보드 리비전을 확인하십시오. |
| 스토리지 | SDIO를 통한 MicroSD 슬롯 | 미디어, 로깅, 파일 시스템, 에셋 테스트. |
| USB 및 전원 | USB Type-C 커넥터 2개: USB-UART 1개(모델 가이드 기준 CH343K)와 USB 2.0 FS 1개; 어느 쪽으로든 보드에 전원 공급 가능 | 시리얼 로그, 플래싱/디버그, USB 평가, 벤치 전원. |
| 전원 변환 | 온보드 3.3 V 및 1.8 V 전원 변환 IC | 부하를 추가하기 전에 회로도에서 레일 요건을 확인하십시오. |
| 디버그 및 부트 | 4핀, 2.54 mm 싱글 로우 SWD 헤더; Mode 부트 점퍼; 전원, 기능, 리셋 버튼 | 펌웨어 플래싱, SWD 디버그, 부트 모드 선택. |
| 표시등 | RGB LED, GPIO 제어 LED, 전원 LED | 펌웨어 및 전원 상태 확인. |
| RF | 기본적으로 온보드 안테나; 0 Ω 옵션을 통한 IPEX 선택 | 모듈 구성에 맞춘 안테나 및 인클로저 평가. |

</div>

**소스 참고 — 보드 리비전을 확인하십시오:** SiFli의 상세 보드 가이드는 문서화된 보드가 `SF32LB56-MOD-A128R12N1` 모듈을 탑재하고 4 MB + 8 MB 코패키지 OPI-PSRAM과 1 Gb QSPI-NAND를 갖춘다고 밝히며, 이러한 메모리 세부 사항이 공식 릴리스 전에 변경될 수 있다고 경고합니다. 현재 모델 가이드는 N16R12N1과 A128R12N1을 모두 나열하며, 두 구성 모두 4 + 8 MB OPI-PSRAM과 1 MB 표준 QSPI-NOR를 갖춥니다. A128R12N1의 경우 모델 가이드의 128 MB QSPI-NAND는 상세 가이드의 1 Gb와 용량이 같습니다. 따라서 A128R12N1에서는 이러한 용량이 일치하지만, 상세 가이드는 1 MB 표준 NOR를 언급하지 않으며 모든 보드나 리비전에 어떤 SKU가 장착되는지도 확정하지 않습니다. 모델 가이드는 CH343K의 USB-UART 디버그 채널 2개를 명시하는 반면, 상세 가이드는 Type-C의 역할을 USB-UART와 USB 2.0 FS로 설명할 뿐 채널과 커넥터 간의 배선은 문서화하지 않습니다. 특정 UART 채널에 의존하기 전에 대응하는 회로도/BOM을 확인하십시오. 특정 유닛을 제품 기준으로 사용하기 전에 모듈 마킹과 대응하는 회로도/BOM을 확인하십시오.

**USB-UART 브리지 불일치 — 장착된 부품을 확인하십시오:** 상세 보드 가이드의 블록 다이어그램은 브리지를 CH342K로 표기하는 반면 모델 가이드는 CH343K로 표기합니다. 해당 보드 리비전의 회로도/BOM에서 실제 부품을 확인하십시오.

**사진/본문 SKU 불일치 — 장착된 모듈을 확인하십시오:** 상세 가이드의 본문은 문서화된 보드가 `SF32LB56-MOD-A128R12N1`을 탑재한다고 밝히지만, 주석이 달린 보드 전면 사진은 모듈을 `SF32LB56-MOD-N16R12N1`로 표기합니다. 사진이 다른 변형 또는 리비전을 보여 주는 것인지는 SiFli가 설명하지 않습니다. 해당 유닛의 모듈 마킹과 보드 BOM을 확인하십시오. 본문이나 사진만으로 SKU를 판단하지 마십시오.

## 프로그래밍 및 디버그 { #programming-and-debug }

다운로드 모드에서는 보드에 전원을 켜거나 리셋하기 전에 Mode 점퍼를 장착하고, 일반 애플리케이션 시작 및 시리얼 로그 동작에서는 제거하십시오. 데이터 전송이 가능한 케이블로 호스트를 USB-UART Type-C 포트에 연결하십시오. 별도의 USB 2.0 FS Type-C 포트는 네이티브 USB 테스트에 사용할 수 있습니다. 이 보드는 호환되는 디버거를 위한 4핀, 2.54 mm 싱글 로우 SWD 헤더도 제공합니다. 두 Type-C 커넥터 모두 보드에 전원을 공급할 수 있으며, 의도한 전원 구성은 보드 가이드와 회로도를 따르십시오.

## SDK 빌드 타깃 { #sdk-build-targets }

SiFli SDK는 `scons --board=<board_name>`과 함께 다음의 정확한 보드 타깃 이름을 사용합니다.

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

이것들은 SDK 빌드 타깃 식별자이며, 보드나 모듈에 인쇄된 제품명과 반드시 같지는 않습니다. [지원 보드 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)와 SDK의 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)은 서로 다른 집합을 나열할 수 있으므로, 사용 중인 SDK 리비전에 대해 타깃을 확인하십시오.

## 첫 검증 경로 { #first-validation-path }

1. 호환되는 24비트 MIPI-DPI 디스플레이를 40핀 FPC 커넥터에 연결하고, 데이터 전송이 가능한 USB 케이블로 USB-UART 포트를 사용하십시오.
2. [시작하기 개요](../../getting-started/index.md)를 따라 검증된 빌드, 플래싱, 시리얼 로그 기준을 확립하십시오.
3. UI 프레임워크를 디버깅하기 전에 단색 패턴 표시부터 브링업하십시오. [그래픽 개요](../../learn/graphics/overview.md)를 참조하십시오.
4. 터치, 스토리지, 오디오 또는 무선을 한 번에 하나의 서브시스템씩 추가한 다음 공존 및 전력 동작을 테스트하십시오.
5. 커스텀 설계 전에 [SF32LB56-MOD](../modules/SF32LB56-MOD.md)와 [양산 설계](../../hardware/design-for-production.md)를 검토하십시오.

## 참고 자료 { #reference }

SiFli는 선택 가능한 보드/모듈 코드를 담은 [개발 보드 모델 가이드](https://wiki.sifli.com/en/board/devkit_guide.html)와, GPIO 배정, 헤더/인터페이스 정의, 전원 참고 사항, 플래시/디버그 절차를 담은 상세한 [SF32LB56-DevKit-LCD Development Board User Guide](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html)를 제공합니다.
