---
icon: lucide/layers
description: "SF32LB52 DevKit LCD를 위한 OpenSiFli의 다운스트림 Zephyr 지원을 다룹니다. 보드 식별 정보, 구성 경계, 드라이버 범위, 통합 위험을 설명합니다."
tags:
    - 개발
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli는 [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)과 [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)에서 Zephyr 작업을 활발히 진행하고 있습니다. 다운스트림 트리에는 `sf32lb52_devkit_lcd` 보드, SiFli HAL 통합, SF32LB52 devicetree 파일, 드라이버, 테스트, 샘플 오버레이가 포함되어 있습니다.

Zephyr API, devicetree, Kconfig, 이식성 있는 RTOS 구조가 필요하거나 ArduinoCore-zephyr로 이어지는 경로가 필요하면 Zephyr를 사용하십시오. 현재 가장 완전한 벤더 기능 범위가 필요하면 SiFli-SDK를 사용하십시오.

워크스페이스 설정, 첫 `hello_world` 빌드, 플래싱, 콘솔 확인은 [Zephyr 다운스트림 시작하기](../../../getting-started/zephyr/getting-started-zephyr-upstream.md)를 참조하십시오. 이 페이지는 해당 기준 구성이 동작하는 상태에서 다운스트림 플랫폼을 다룹니다.

주요 참고 자료:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr project documentation](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD in the Zephyr board documentation](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## 검증된 다운스트림 보드 { #verified-downstream-board }

<div align="center"><em>표: 검증된 다운스트림 보드</em></div>

<div align="center" markdown>

| 항목 | 값 |
|:-----|:------|
| 보드 | `sf32lb52_devkit_lcd` |
| 전체 이름 | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| 플래시 러너 | `sftool` |
| 러너 인자 | `--chip=SF32LB52` |
| 콘솔 | `usart1` |
| 콘솔 속도 | 보레이트 `1000000` |
| 선택된 디스플레이 노드 | `co5300` |

</div>

다운스트림 보드 문서에는 8 MB OPI-PSRAM, 128 Mb QSPI-NOR, 48 MHz 및 32.768 kHz 크리스털, 디스플레이 인터페이스, 오디오, USB, microSD 하드웨어가 탑재된 SF32LB52x-MOD-N16R8 모듈이 나옵니다.

## 구성 경계 { #configuration-boundaries }

보드 타깃, devicetree, Kconfig 구성, 오버레이, 다운스트림 HAL 리비전은 하나의 호환성 경계를 이룹니다. 각 프로젝트에서 다운스트림 리비전을 고정하고, 애플리케이션 오버레이와 구성 조각은 애플리케이션과 함께 소스 관리하십시오.

Arduino나 SiFli-SDK 프로젝트의 보드 이름, 핀 매핑, 러너 설정을 Zephyr로 복사하지 마십시오. 세 경로는 같은 물리 보드에서 실행되더라도 서로 다른 구성 모델을 사용합니다.

## 보드 하드웨어 참고 사항 { #board-hardware-notes }

다운스트림 보드 문서에는 다음이 나열되어 있습니다.

- SF32LB525UC6 기반의 SF32LB52x-MOD-N16R8 모듈.
- 8 MB OPI-PSRAM.
- 128 Mb QSPI-NOR.
- 48 MHz 및 32.768 kHz 크리스털.
- SPI/DSPI/QSPI 및 MCU/8080 디스플레이 인터페이스.
- I2C 터치 지원.
- 아날로그 마이크 입력과 온보드 Class-D PA를 갖춘 아날로그 오디오 출력.
- USB-시리얼 및 USB 2.0 FS용 USB Type-C 포트.
- SPI 방식 microSD.

## 다운스트림 트리에 있는 드라이버 영역 { #driver-areas-present-in-the-downstream-tree }

다운스트림 트리에는 다음 영역을 위한 SF32LB 관련 드라이버, 바인딩 또는 보드별 샘플 구성이 포함되어 있습니다.

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC, 워치독.
- 플래시, 메모리 컨트롤러, OPI PSRAM, QSPI NOR.
- 디스플레이/LCDC/MIPI DBI 및 LVGL 샘플 구성.
- Bluetooth HCI 메일박스 및 BAP 브로드캐스트 싱크 구성.
- 오디오 코덱, DMA, CRC, 암호화, 엔트로피, OTP/eFuse, 레귤레이터, 리셋, 온도 센서.

트리에 존재한다고 해서 모든 제품 시나리오가 양산 수준으로 준비되었다는 뜻은 아닙니다. 대상 보드에서 해당 샘플과 드라이버의 정확한 조합을 검증하십시오.

## 통합 순서 { #integration-sequence }

첫 실행 기준 구성을 마친 후에는 보드 I/O, UART 동작, 디스플레이, 스토리지, Bluetooth, 오디오, 전력 관리 순으로 한 번에 하나의 서브시스템씩 검증하십시오. 각 체크포인트마다 샘플, 오버레이, Kconfig 조각, 다운스트림 리비전, 시리얼 로그를 함께 보관하십시오. 드라이버가 트리에 존재한다는 사실만으로는 전체 애플리케이션 조합이 양산에 준비되었다는 증거가 되지 않습니다.

## 다운스트림 위험 체크리스트 { #downstream-risk-checklist }

- 업스트림 Zephyr가 아닌 OpenSiFli 다운스트림을 사용하고 있습니까?
- HAL 리비전이 고정되어 있습니까?
- `west flash`가 예상한 `sftool` 러너를 사용합니까?
- 콘솔이 보레이트 `1000000`으로 구성되어 있습니까?
- 샘플에 필요한 오버레이가 포함되어 있습니까?
- 해당 드라이버는 테스트로 지원이 확인되었습니까, 아니면 트리에 존재하기만 합니까?
