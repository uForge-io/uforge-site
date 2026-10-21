---
icon: lucide/terminal-square
description: "SF32의 MicroPython 현황: 아직 공식 포트가 확인되지 않았으며, 지원 경로가 되기 위해 갖추어야 할 승인 기준을 설명합니다."
tags:
    - 개발
    - MicroPython
---

# MicroPython 현황 { #micropython-status }

확인한 SiFli 문서와 OpenSiFli 저장소에서는 공식 SF32 MicroPython 포트, 펌웨어 이미지, 보드별 플래싱 절차를 찾지 못했습니다.

확인한 공개 출처는 [GitHub의 OpenSiFli](https://github.com/OpenSiFli/)와 [SiFli 문서 포털](https://docs.sifli.com/)입니다.

그렇다고 비공개 또는 커뮤니티 실험이 없다는 것이 증명되는 것은 아닙니다. 다만 연결할 수 있는 공개 펌웨어 이미지나 소스 트리가 생기기 전까지, 이 사이트가 MicroPython을 검증된 SF32 개발 경로로 제시하지 않는 것이 좋다는 의미입니다.

## 현재 권장 사항 { #current-recommendation }

아직은 MicroPython을 최종 사용자를 위한 지원되는 SF32 경로로 나열하지 마십시오. 개발자가 플래시에 기록하고 재현할 수 있는 공개 아티팩트가 생기기 전까지는 로드맵/현황 페이지로 유지하십시오.

## 실제 페이지에 필요한 것 { #what-a-real-page-needs }

이 문서가 일반 튜토리얼이 되려면 SiFli가 다음을 공개해야 합니다.

- 보드 및 메모리 구성별 펌웨어 이미지.
- 소스 저장소와 빌드 방법.
- 플래시 명령과 복구 명령.
- REPL UART와 보레이트.
- 예상되는 MicroPython 배너.
- 지원되는 `machine` API.
- 파일 시스템 동작과 세이프 모드/복구 동작.
- 디스플레이, Bluetooth, 스토리지, USB, 저전력에 대한 알려진 제한 사항.

## 권장 첫 스모크 테스트 { #suggested-first-smoke-test }

펌웨어가 준비되면 첫 테스트는 시리얼만 사용하는 것이 좋습니다.

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

그런 다음 핀 이름이 문서화된 후에 GPIO를 테스트하십시오.

## 최소 수용 기준 { #minimum-acceptance-criteria }

다음이 모두 갖추어지면 MicroPython을 "현황"에서 "시작하기"로 옮길 수 있습니다.

- 공개 저장소 또는 릴리스 페이지.
- 최소 하나의 SF32 개발 키트용 보드별 바이너리.
- 문서화된 플래시 명령.
- 문서화된 REPL 포트와 보레이트.
- SiFli-SDK 펌웨어로 되돌아가는 복구 경로.
- 지원되는 `machine` API 목록.
- 실제 하드웨어에서 테스트한 GPIO 예제 하나 이상.

## 이것이 중요한 이유 { #why-this-matters }

"MicroPython 이미지를 다운로드하라"는 모호한 안내는 실행에 옮길 수 없습니다. 사용자에게는 정확한 이미지, 보드 일치 정보, 플래시 도구, REPL 설정, 복구 경로가 필요합니다. 이것이 없으면 MicroPython 페이지는 도움이 되기는커녕 지원 부담만 만듭니다.
