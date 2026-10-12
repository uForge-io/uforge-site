---
icon: lucide/puzzle
description: "SF32LB52 DevKit LCD에서 OpenSiFli의 베타 ArduinoCore-zephyr를 처음 실행하는 단계별 안내입니다. 보드 패키지 설치, 시리얼 테스트 업로드, Blink를 다룹니다."
tags:
    - 시작하기
    - Arduino
---

# Arduino { #arduino }

OpenSiFli에는 Zephyr 기반의 SF32용 베타 Arduino 코어가 있습니다: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). 이 코어는 `sifli:sf32lb52` Arduino 패키지를 배포하며, Boards Manager에는 **SiFli Serial Boards**로 표시되고, 현재 **SiFli SF32LB52 DevKit LCD** 보드를 대상으로 합니다.

스케치, 빠른 주변 장치 확인, 데모, 초기 프로토타입에 적합한 경로입니다. 양산 펌웨어, Bluetooth 스택 튜닝, 그래픽 중심 애플리케이션, 저전력 최적화, 커스텀 보드 브링업에는 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md)를 사용하십시오.

!!! warning "베타 코어"
    OpenSiFli는 이 Arduino 코어를 **BETA**로 표시하며 테스트 용도로만 사용하라고 안내합니다. 기능, API, 로더 동작, 패키지 구성, 릴리스 방식은 변경될 수 있습니다. 양산에 사용할 수 있는 수준으로 간주하지 마십시오.

## 준비 사항 { #what-youll-need }

**하드웨어**

- SiFli SF32LB52 DevKit LCD.
- 보드의 USB-to-UART 경로에 연결된 USB Type-C 데이터 케이블.
- Windows, macOS 또는 Linux를 실행하는 컴퓨터.

**소프트웨어**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) 또는 [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- OpenSiFli `sifli:sf32lb52` Arduino 패키지.
- 시리얼 모니터.

## 보드 패키지 설치 { #install-the-board-package }

**Arduino IDE > Settings**를 열고 **Additional Boards Manager URLs**에 다음 URL을 추가합니다.

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

중국 본토 사용자는 미러 패키지 인덱스를 사용하십시오.

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

그런 다음 **Boards Manager**를 열고 **SiFli Serial Boards**를 검색하여 `sifli:sf32lb52` 플랫폼을 설치합니다.

Arduino CLI를 사용하는 경우는 다음과 같습니다.

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

중국 미러를 사용하는 경우는 다음과 같습니다.

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## 보드 선택 { #select-the-board }

Arduino IDE에서 다음을 선택합니다.

```text
SiFli SF32LB52 DevKit LCD
```

보드 FQBN은 다음과 같습니다.

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

OpenSiFli 보드 정의는 이 Arduino 보드를 Zephyr 타깃 `sf32lb52_devkit_lcd` 및 변형 `sf32lb52_devkit_lcd_sf32lb525uc6`에 매핑합니다.

## 빌드 설정 선택 { #choose-build-options }

이 코어는 두 가지 중요한 메뉴를 제공합니다.

<div align="center"><em>빌드 설정</em></div>

<div align="center" markdown>

| 메뉴 | 설정값 | 의미 |
|:-----|:-------|:--------|
| **Mode** | `Standard` | 로드 후 스케치가 자동으로 시작됩니다. |
| **Mode** | `Debug` | Zephyr 셸이 `sketch` 명령을 기다립니다. |
| **Link mode** | `Dynamic` | 스케치가 Zephyr 로더용으로 패키징됩니다. |
| **Link mode** | `Static` | 스케치가 플래시에 기록할 수 있는 바이너리에 링크됩니다. |

</div>

Zephyr 로더 워크플로에는 **Dynamic**을 선택하십시오. 스케치를 플래시에 기록할 수 있는 펌웨어 이미지에 링크해야 하면 **Static**을 선택하십시오.

## 보드를 시리얼 다운로드 모드로 전환 { #put-the-board-in-serial-download-mode }

OpenSiFli 문서에 따르면 처음 사용할 때는 보드가 시리얼 다운로드 모드에 있어야 합니다. SF32LB52 DevKit LCD의 부트/리셋 시퀀스를 사용한 다음 Arduino IDE 또는 CLI에서 업로드하십시오.

업로드 도구는 `sftool`입니다.

## 시리얼 스모크 테스트 업로드 { #upload-a-serial-smoke-test }

시리얼 출력부터 시작합니다. LED 극성에 의존하지 않고 업로드, 리셋, 런타임 시작, 콘솔 라우팅을 확인할 수 있습니다.

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Arduino IDE에서 업로드하거나 Arduino CLI를 사용합니다.

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

`/dev/cu.usbserial-XXXX`를 사용 중인 보드의 시리얼 포트로 바꾸십시오. Windows에서는 해당하는 `COM` 포트를, Linux에서는 해당하는 `/dev/ttyUSB*` 또는 `/dev/ttyACM*` 포트를 사용하십시오.

Serial Monitor를 `115200` 보레이트로 엽니다. **Standard** 빌드 모드에서는 스케치가 초당 한 줄씩 출력해야 합니다. **Debug** 빌드 모드에서는 Zephyr 셸을 열고 다음을 실행합니다.

```text
sketch
```

## Blink 업로드 { #upload-blink }

설치된 SF32LB52 DevKit LCD 변형이 `LED_BUILTIN`을 정의하는지 확인하십시오. Arduino 핀 번호가 모든 보드에서 같다고 가정해서는 안 됩니다. 매크로를 사용할 수 있고 변형이 보드의 온보드 LED를 매핑하고 있다면, 시리얼 스모크 테스트가 성공한 후 Blink를 시도하십시오. 그렇지 않으면 GPIO를 선택하기 전에 보드 문서에서 LED 연결과 극성을 확인하십시오.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## 문제 해결 { #troubleshooting }

<div align="center"><em>표: 문제 해결</em></div>

<div align="center" markdown>

| 증상 | 확인 사항 |
|:--------|:------|
| 패키지가 표시되지 않음 | 패키지 인덱스 URL을 확인하고 Arduino IDE 2.x를 사용하십시오. |
| 업로드 실패 | 보드를 시리얼 다운로드 모드로 전환하고 시리얼 모니터가 포트를 점유하고 있지 않은지 확인하십시오. |
| 스케치가 시작되지 않음 | **Mode**를 확인하십시오. `Debug`에서는 Zephyr 셸에서 `sketch`를 실행하십시오. |
| 정의되지 않은 Zephyr 심볼 | 코어 README에 따르면 누락된 Zephyr 함수를 `loader/llext_exports.c`에서 export하고 로더를 다시 빌드해야 할 수 있습니다. |
| Zephyr 서브시스템 누락 | 보드 `.conf`에서 필요한 `CONFIG_` 옵션을 활성화하고 로더를 다시 빌드한 다음 업로드하십시오. |
| 메모리 부족 | Zephyr 셸과 동적 스케치 로딩은 RAM을 사용합니다. 스택 사용량을 줄이거나 적절한 경우 빌드 모드를 전환하십시오. |

</div>

## 현재 지원 범위 { #what-sifli-team-should-finish }

현재 게시된 패키지는 SF32LB52 DevKit LCD를 대상으로 하며 테스트용 베타 상태입니다. 다른 보드를 사용하거나 특정 API에 의존하기 전에 [업스트림 저장소](https://github.com/OpenSiFli/ArduinoCore-zephyr)와 해당 패키지 버전의 릴리스 노트를 확인하십시오. Zephyr 또는 SiFli-SDK에서 지원된다고 해서 이 Arduino 패키지의 지원이 보장되는 것은 아닙니다.
