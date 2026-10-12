---
icon: lucide/braces
description: "MicroPython은 아직 검증된 SF32 시작하기 경로가 아닙니다. 재현 가능한 첫 실행에는 SiFli-SDK를 사용하고, 준비 상태는 MicroPython 현황 페이지에서 확인하십시오."
tags:
    - 시작하기
    - MicroPython
---

# MicroPython { #micropython }

MicroPython은 아직 SF32용으로 검증된 시작하기 경로가 아닙니다. 확인한 SiFli 및 OpenSiFli 소스에는 공식 보드별 펌웨어 이미지, 플래시 기록 절차, REPL 구성이 현재 문서화되어 있지 않습니다.

[SiFli-SDK](../sifli/getting-started-sifli-sdk.md)를 사용하여 재현 가능한 보드, 케이블, 시리얼 포트, 플래시 기준 구성을 먼저 확립하십시오. 일반적인 MicroPython 설치 안내를 따르거나 다른 MCU 또는 보드용 이미지를 사용하지 마십시오.

이 페이지가 튜토리얼이 되기 위해 필요한 정확한 공개 산출물과 승인 기준은 [MicroPython 현황](../../develop/platforms/micropython/status.md) 페이지에서 추적합니다.

!!! warning "검증된 MicroPython 튜토리얼 없음"
    사용할 수 있는 SF32 MicroPython 가이드에는 정확한 보드 및 메모리별 이미지, 플래시 기록 및 복구 명령, REPL 포트와 보레이트, 파일 시스템 동작, 실제 지원 수준을 그대로 반영한 주변 장치 지원 매트릭스가 필요합니다. 이러한 산출물이 마련될 때까지 이 페이지에는 의도적으로 설치 단계를 두지 않았습니다.

## 검증된 튜토리얼에 필요한 것 { #what-sifli-should-publish }

향후 SF32 MicroPython 튜토리얼을 따르기 전에, 해당 튜토리얼이 호환되는 보드별 이미지, 테스트된 플래시 기록 및 복구 명령, REPL 포트와 보레이트, 파일 시스템 동작, 유지 관리되는 주변 장치 지원 매트릭스를 명시하는지 확인하십시오. 이러한 내용이 [현황 페이지](../../develop/platforms/micropython/status.md)에 제공될 때까지는 첫 브링업에 위의 SiFli-SDK 경로를 사용하십시오.
