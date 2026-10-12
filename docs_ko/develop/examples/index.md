---
icon: lucide/list-tree
description: "SF32 펌웨어를 처음부터 만드는 대신, 보드, 프레임워크, 가장 까다로운 주변 장치를 기준으로 SiFli-SDK 또는 Zephyr 예제를 선택하고 적용하는 방법입니다."
tags:
    - Develop
    - Examples
---

# 예제 { #examples }

예제에서 시작하십시오. 모든 서브시스템을 처음부터 만드는 대신, 동작이 확인된 보드별 예제를 가져와 적용하면 SF32 펌웨어를 대개 더 빠르게 완성할 수 있습니다.

가장 좋은 예제가 항상 가장 작은 예제는 아닙니다. 제품에서 가장 까다로운 부분(Bluetooth 프로파일, 디스플레이 패널, 오디오 경로, 파일 시스템, OTA, USB, 전원 모드, AI 가속기)이 이미 들어 있는 예제를 선택하십시오.

## 예제 영역 { #example-areas }

<div align="center"><em>표: 예제 영역</em></div>

<div align="center" markdown>

| 영역 | 시작점 |
|:-----|:-----------|
| 첫 실행 | `example/get-started/hello_world/rtt/project` |
| Blink / GPIO | `example/get-started/blink/rtt` 또는 GPIO HAL/디바이스 예제. |
| Bluetooth | BLE, BT Classic, LE Audio, 처리량, 비콘, OTA, 프로파일 예제. [Bluetooth SDK 예제](../../learn/bluetooth/bluetooth-sdk-examples.md) 작업 맵에서 시작하십시오. |
| 그래픽 | LVGL 데모, 디자인 도구 연동, 위젯, 압축 에셋, 애니메이션/미디어, 디스플레이별 예제. [LVGL SDK 예제](../../learn/graphics/lvgl-sdk-examples.md) 작업 맵에서 시작하십시오. |
| 오디오 | 재생, 녹음, PDM 캡처, 코덱, Opus, MP3, 믹싱, 지원되는 경우 USB 오디오. [오디오 SDK 예제](../../learn/audio/audio-sdk-examples.md) 작업 맵에서 시작하십시오. |
| 전원 | PM 상태, GPIO, 프로세서, Bluetooth, 디스플레이, UI, 웨어러블 시나리오 예제. [저전력 SDK 예제](../../learn/low-power/low-power-sdk-examples.md) 작업 맵에서 시작하십시오. |
| 스토리지 | 파일 시스템, 플래시, SD, 파티션 예제. |
| USB | CherryUSB 디바이스 및 호스트 예제. |
| AI | NNACC HAL 및 RT-device 예제. |

</div>

## 대표적인 SDK 시작점 { #representative-sdk-starting-points }

관련 영역을 선택한 뒤 이 표를 사용하십시오. 경로는 대표적인 예시이며 SDK 릴리스마다 달라질 수 있으므로, 빌드하기 전에 선택한 SDK, 타깃 보드, 구성을 확인하십시오.

<div align="center"><em>대표적인 SF32 SDK 예제 시작점</em></div>

<div align="center" markdown>

| 개발 목표 | 대표 SDK 시작점 | 먼저 검증할 사항 | 이어서 볼 문서 |
|:---|:---|:---|:---|
| GPIO 출력 또는 입력 | `example/hal/gpio`, `example/rt_device/gpio` | 실제 보드에서 올바른 핀 먹스, 극성, 인터럽트 동작. | [초급 튜토리얼](../../getting-started/tutorials/beginner.md) |
| 콘솔 및 시스템 점검 | `example/system/finsh` | 시리얼 콘솔, 로그, 기본 런타임 점검. | [초급 튜토리얼](../../getting-started/tutorials/beginner.md) |
| ADC, PWM 또는 RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | 보드별 핀, 클럭, 주변 장치 구성. | [초급 튜토리얼](../../getting-started/tutorials/beginner.md) |
| I2C 센서 | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | 전기적 연결, 버스 주소 지정, 반복 전송의 안정성. | [중급 튜토리얼](../../getting-started/tutorials/intermediate.md) |
| LVGL과 로컬 디스플레이 | `example/multimedia/lvgl/lvgl_v8_examples` | 복잡한 화면에 앞서 패널 초기화, 픽셀 포맷, 안정적인 flush 경로. | [그래픽 개요](../../learn/graphics/overview.md), [디스플레이 컨트롤러](../../learn/graphics/display-controller.md) |
| BLE 페리퍼럴 서비스 | `example/ble/peripheral`, `example/ble/hrpc` | 광고, 연결, GATT 특성 하나, 재연결 동작. | [Bluetooth 개요](../../learn/bluetooth/overview.md) |
| 로컬 오디오 재생 | `example/multimedia/audio/local_music`, `mp3_sd_player` | 코덱/보드 경로, 버퍼 안정성, 재생 후 정리. | [오디오 개요](../../learn/audio/overview.md) |
| 플래시 기반 스토리지 | `example/storage/littlefs/nor`, `example/storage/flashdb` | 마운트, 읽기/쓰기 동작, 리셋 또는 저장 공간 가득 참 상태에서의 복구. | [중급 튜토리얼](../../getting-started/tutorials/intermediate.md) |
| 저전력 동작 | `example/pm/classical`, `example/pm/raise_wrist` | 명명된 상태에서 측정한 전류와 올바른 웨이크업 소스 동작. | [저전력 설계 개요](../../learn/low-power/overview.md) |
| BLE OTA | `example/ble/peripheral_with_ota` | 타깃 하드웨어에서의 업데이트 중단 복구와 롤백. | [고급 튜토리얼](../../getting-started/tutorials/advanced.md) |
| 런타임 진단 | `example/system/cpu_usage_profiler`, `example/system/coredump` | 최적화에 앞서 재현 가능한 CPU 트레이스 또는 크래시 캡처. | [고급 튜토리얼](../../getting-started/tutorials/advanced.md) |

</div>

## 예제 선택 방법 { #how-to-choose-an-example }

다음 순서를 따르십시오.

1. 보드를 맞추십시오.
2. 프레임워크를 맞추십시오.
3. 가장 까다로운 주변 장치를 맞추십시오.
4. 미들웨어를 맞추십시오.
5. 전원 또는 메모리 제약을 맞추십시오.

예를 들어 Bluetooth 오디오 제품은 `hello_world`가 이해하기 더 쉽더라도, `hello_world`보다 오디오/Bluetooth 예제에 가까운 것에서 시작하는 것이 좋습니다.

## 적용 워크플로 { #adaptation-workflow }

1. 수정하지 않은 예제를 빌드하고 플래시에 기록하십시오.
2. 성공한 빌드 명령, 보드 이름, 플래시 명령, 시리얼 포트, 로그를 저장하십시오.
3. 제품 변경을 한 가지만 적용하십시오.
4. 다시 빌드하고 다시 테스트하십시오.
5. 다른 서브시스템을 추가하기 전에 변경 사항을 커밋하거나 기록하십시오.

이 워크플로는 처음 한 시간은 더 느리지만, 첫 번째 어려운 장애를 겪은 뒤에는 훨씬 빠릅니다.

## 보관할 증거 { #evidence-to-keep }

제품의 기반이 되는 예제마다 다음을 기록하십시오.

- SDK 브랜치 또는 패키지 버전.
- 보드 이름 또는 FQBN.
- 필요한 구성 옵션.
- 필요한 핀과 주변 장치.
- 예상 시리얼 출력.
- 알려진 제한 사항.
- 확인 가능한 경우 메모리 사용량.
- 복구 명령.

## 예제 선택 규칙 { #example-selection-rule }

제품에서 가장 제약이 큰 부분과 일치하는 예제를 선택하십시오.

- Bluetooth 제품은 가장 가까운 프로파일에서 시작하십시오.
- 디스플레이 제품은 디스플레이 및 LVGL 경로에서 시작하십시오.
- 배터리 제품은 전원 예제에서 시작하십시오.
- OTA 제품은 업데이트 흐름과 파티션 레이아웃에서 시작하십시오.

그런 다음 나머지 서브시스템을 하나씩 추가하십시오.

## 권장 학습 경로 { #suggested-learning-path }

SDK를 처음 사용한다면 [초급 튜토리얼](../../getting-started/tutorials/beginner.md)로 시작하고, 주변 장치 하나가 안정되면 [중급 튜토리얼](../../getting-started/tutorials/intermediate.md)로 넘어가십시오. 전력 측정 작업, OTA, 커스텀 디스플레이 브링업, 장애 분석, 다중 연결 Bluetooth, 커스텀 드라이버는 [고급 튜토리얼](../../getting-started/tutorials/advanced.md)을 사용하십시오. 주제별 개요 문서에서는 이러한 예제의 배경이 되는 아키텍처와 트레이드오프를 설명합니다.
