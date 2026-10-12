---
icon: lucide/folder-kanban
title: "프로젝트 개요"
description: "선택한 하드웨어, 소프트웨어 기준 구성, 검증 증거, 양산 인계를 하나로 묶은 μForge의 엔드 투 엔드 프로젝트입니다."
tags:
    - Projects
---

# 프로젝트 개요 { #projects-overview }

프로젝트는 복제하고 변형하며 SF32 제품 방향을 탐색하는 데 쓸 수 있는, 애플리케이션에 기반한 레퍼런스입니다. 모든 기능을 따로따로 시연하려 하지 않고, 사람들이 실제로 만들어 쓸 법한 결과물 안에서 SF32 기능의 핵심 조합을 보여 줍니다.

## 프로젝트의 용도 { #what-projects-are-for }

각 프로젝트는 다음과 같아야 합니다.

- **애플리케이션에 기반합니다.** 추상적인 기능 시연이 아니라, 알아볼 수 있는 제품 동작이나 사용 사례에서 출발합니다.
- **따라가기에 충분히 완결되어 있습니다.** 선택한 하드웨어, 소프트웨어 기준 구성, 의존성, 통합 마일스톤, 검증 증거, 적용 경로를 연결하므로 개발 흐름의 상당 부분을 직접 경험할 수 있습니다.
- **복제를 전제로 합니다.** 먼저 재현할 수 있는 실용적인 기준 구성을 제공하고, 이를 자신의 하드웨어, 상호작용 모델, 제품 요구 사항에 맞게 수정할 수 있게 합니다.
- **만드는 재미가 있습니다.** 프로젝트는 실험하고 싶게 만들고 SF32의 기능이 무엇을 가능하게 하는지 눈에 보이게 해야 합니다. 여기서는 유용함과 즐거움이 함께 갑니다.

관련 [시작하기](../getting-started/index.md) 기준 구성을 마친 뒤에 프로젝트를 사용하십시오. [레퍼런스 디자인](../hardware/reference-designs/reference-designs.md)은 재사용 가능한 기준 구성과 검증 과정을 설명합니다. 현재 Connected Wearable 항목은 릴리스된 보드 패키지가 아니라 워크플로입니다. 프로젝트는 적용할 수 있는 구체적인 기준 구성이 있으면 이를 링크해야 하며, 없으면 기획 단계의 과정이 검증된 설계인 것처럼 암시하지 말고 자체 기준 구성을 정의하고 검증해야 합니다.

## SiFli-SDK 프로젝트 { #sifli-sdk-projects }

!!! info "서드파티 프로젝트 소유권"
    [LilyGO T-Display-SF32](lilygo-t-display-sf32.md)는 SiFli가 아니라 Xinyuan-LilyGO/LilyGO가 유지 관리합니다. 보드별 하드웨어 및 펌웨어 지원은 LilyGO의 저장소를, 기반이 되는 SF32 디바이스와 SiFli-SDK는 SiFli의 자료를 참조하십시오.

<div align="center"><em>표: 프로젝트 디렉터리</em></div>

<div align="center" markdown>

| 프로젝트 | 결과물 | 하드웨어 및 소프트웨어 기준 구성 | 적합한 용도 |
|:--------|:--------|:-------------------------------|:---------|
| [SF32 Xiaozhi 음성 어시스턴트](sf32-xiaozhi.md) | 오픈소스 Xiaozhi SF32 구현을 기반으로 한 음성 및 디스플레이 연동 어시스턴트. | 지원되는 SF32LB52 보드, Xiaozhi SF32 소스, Bluetooth PAN, Xiaozhi 클라우드 서비스. | AI 음성 상호작용 제품 흐름을 평가하고 하드웨어 또는 애플리케이션 동작을 적용하는 경우. |
| [SF32 BLE Talkback 인터컴](sf32-ble-talkback.md) | 역할 선택, Opus 음성, 슬레이브 재연결, 상태 표시, 저전력 동작을 갖춘 다중 디바이스 BLE 푸시투토크 인터콤. | SF32LB52-DevKit-ULP 보드 2개 이상, 고정된 Talkback 소스, 고정된 SiFli-SDK 2.4 호환 리비전, `talk_back/1.2@sifli`. | 커스텀 하드웨어에 앞서 휴대용 그룹 인터콤 동작, 음향, RF 복구, 전력을 검증하는 경우. |
| [SF32 E-Paper EPUB 리더](sf32-epd-reader.md) | 라이브러리/목차 흐름, 키 및 터치 입력, 동적 폰트, 전체/부분 새로고침, 스토리지, 저전력 상태를 갖춘 로컬 EPUB 리더. | SF32-OED-EPD V1.1, YZC085 V1.05 전자 종이, 고정된 EPD Reader 및 SDK 커밋, TF 스토리지, 검증된 콘텐츠/폰트. | 전자 종이 독서 단말기, EPUB/렌더링 한계, 패널 파형, 스토리지 복구, 전력 동작을 평가하는 경우. |
| [SuperKey 다기능 매크로 키보드](superkey.md) | 키, 엔코더, 센싱, 텔레메트리, 컴패니언 애플리케이션을 갖춘 3-디스플레이 USB HID/CDC 데스크톱 컨트롤러. | 오픈 sf32-keyboard 하드웨어, `sf32lb52-superkey` 펌웨어 타깃, SuperKeyHub. | 데스크톱 HMI, 매크로 키보드, 상태 패널 또는 호스트 연동 제어 장치를 평가하는 경우. |
| [Radiation Monitor 휴대용 신호 세기 감지기](radiation-monitor.md) | 스무딩과 이력 재생을 갖춘 휴대용 79포인트 2.4 GHz 신호 세기 뷰어. | SF32LB52 RF 테스트 경로, LVGL 디스플레이, KEY2 제어, 제어된 RF 비교 환경. | 상대적인 간섭 추세를 살펴보고 교정된 RF 계측기 경로가 필요한지 판단하는 경우. |
| [Pocket Pi SF32 휴대용 게임기](pocket-pi.md) | 게임 브라우저, 입력, 오디오, 세이브 스테이트, 내장/TF 카드 스토리지를 갖춘 로컬 NES 에뮬레이션 휴대용 게임기. | SF32LB52-DevKit-ULP 타깃, PocketPi/Nofrendo 소스, AW9523 컨트롤, 합법적으로 사용할 수 있는 NES 콘텐츠. | 커스텀 하드웨어에 앞서 게임 중심의 그래픽, 입력, 오디오, 스토리지, 전력 워크로드를 테스트하는 경우. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | 터치, 모션, 스토리지, 오디오, LoRa, 전원 관리 경로를 갖춘, 디스플레이 중심의 서드파티 SF32 개발 플랫폼. | LilyGO T-Display-SF32 하드웨어, 평가를 위해 선택하고 기록한 보드 저장소 및 LilyGO SDK 포크 리비전, `t-display-sf32_hcpu` 타깃. | 공식 SiFli 프로젝트로 오해하지 않으면서 LilyGO가 유지 관리하는 웨어러블, 휴대 기기, 센서 단말, HMI 기준 구성을 평가하는 경우. |

</div>

## Zephyr 프로젝트 { #zephyr-projects }

이 그룹에는 Zephyr 위에 직접 구축했거나, OpenSiFli의 ArduinoCore-zephyr처럼 문서화된 Zephyr 파생 계층 위에 구축한 프로젝트가 포함됩니다.

<div align="center"><em>표: Zephyr 프로젝트 디렉터리</em></div>

<div align="center" markdown>

| 프로젝트 | 결과물 | 하드웨어 및 소프트웨어 기준 구성 | 적합한 용도 |
|:--------|:--------|:-------------------------------|:---------|
| [SF32LB52용 Arduboy2 포트](arduboy2-sifli.md) | SF32LB52에서 Arduboy2 스타일 게임이나 인터랙티브 데모를 평가하기 위한 재현 가능한 경로. | OpenSiFli Arduboy2-SiFli 소스, ArduinoCore-Zephyr 변형 `sf32lb52_devkit_lcd_sf32lb525uc6`, 문서화된 외부 디스플레이/입력/오디오 경로. | 로컬 게임 상호작용, 그래픽, 입력, 오디오와 이식 가능한 Arduino 지향 애플리케이션 계층의 한계를 테스트하는 경우. |
| [SF32 기반 ZMK 키보드 펌웨어](zmk-sf32.md) | 매트릭스 스캔, 레이어, USB HID, BLE 스플릿/호스트 링크, 설정, ZMK Studio를 갖춘 재현 가능한 SF32LB52 스플릿 키보드 기준 구성. | OpenSiFli/zmk, SF32LB52-DevKit-LCD ZMK 보드 변형, 고정된 매니페스트 의존성을 가진 `urchin_sf32lb52_left/right` 쉴드. | 다운스트림 SF32 포트의 완성도를 측정하면서 ZMK 기반 무선 키보드, 매크로 패드 또는 커스텀 HID 제품을 평가하는 경우. |

</div>

## 모든 프로젝트에 포함되는 내용 { #what-every-project-includes }

각 μForge 프로젝트는 목표 결과물, 대상 독자, 지원되는 하드웨어 및 소프트웨어 버전, 사전 요구 사항, 소스 저장소, 마일스톤 단위의 빌드 단계, 검증 기준, 측정 결과, 제품 적용 인계를 문서화해야 합니다. 프로젝트는 엔지니어링 작업의 출발점이며, 최종 하드웨어, 서비스 연동, 보안, 개인정보 보호 또는 규제 요구 사항에 대한 양산 검증을 대체하지 않습니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 기존 원본 문서 없이 정리하여 작성되었습니다. 기술적인 내용은 SiFli 공식 문서와 대조해 확인한 후에 사용하십시오.
