---
icon: lucide/battery-charging
title: "저전력 SDK 예제"
description: "슬립, 웨이크업 소스, GPIO, CPU, Bluetooth, 디스플레이, UI, 웨어러블 전력 시나리오에 알맞은 SiFli-SDK 전원 관리 예제를 선택합니다."
tags:
  - 저전력
  - 예제
---

# 저전력 SDK 예제 { #low-power-sdk-examples }

SiFli-SDK 전원 관리 예제는 범용 전류 사양이 아니라 측정 및 통합의 기준 구성입니다. 각 예제는 특정 칩 제품군, 보드, 전원 공급 경로, 활성화된 주변 장치, 펌웨어 구성, 워크로드를 결합한 것입니다. 예제는 지정된 상태나 시나리오를 대상 하드웨어에서 재현 가능하게 만드는 데 활용하고, 이어서 동일한 조건에서 제품 자체의 전류와 전압을 측정하십시오.

이 페이지는 [SiFli-SDK PM 예제 색인](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html)의 프로젝트를 각 예제가 답하는 엔지니어링 질문별로 정리합니다. 문서화된 보드, 전원 연결, 점퍼, SDK 설정, 명령, 예상 동작에 대해서는 각 예제의 공식 페이지가 계속 기준이 됩니다.

## 알맞은 전원 예제로 시작하기 { #start-with-the-right-power-example }

<div align="center"><em>표: 엔지니어링 과제별 SiFli-SDK PM 예제</em></div>

<div align="center" markdown>

| 엔지니어링 목표 | 시작 예제 | 확립에 도움이 되는 내용 | 제품에서 다시 확인할 사항 |
|:-----------------|:-----------|:------------------------|:-------------------------|
| 기본 PM 상태 진입과 웨이크업 동작 확인 | [PM 예제](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | SDK의 기본 전원 관리 구성과 슬립/웨이크업 흐름 | 실제 웨이크업 소스, 클럭 의존성, 유지되는 상태, 모든 드라이버의 PM 요청 |
| 저전력 상태에서 GPIO 동작 특성 파악 | [GPIO 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | 주기적인 타이머 웨이크업, GPIO 액세스, 웨이크업·슬립·I/O 동작의 차이 | 외부 풀, 전원이 꺼진 주변 장치, 핀 먹스, 전압 레일, 의도하지 않은 누설 경로 |
| 연산 작업과 셧다운 동작 분리 | [프로세서 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | CPU 벤치마크/루프 워크로드, 셧다운, RTC 웨이크업, 핀 웨이크업 | 코어 주파수, 워크로드, 웨이크업 핀 극성, 보드별 웨이크업 매핑, 공급 전압 |
| Bluetooth 시나리오 측정 | [BLE 브로드캐스트 및 연결 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) 또는 [BLE/BT 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | 측정 시나리오로서의 광고, 연결, Bluetooth 동작 | RF 조건, TX 전력, 간격, 상대 기기 동작, 안테나, 애플리케이션 콜백 |
| 화면 꺼짐 정책과 상시 표시 AMOLED 정책 비교 | [AMOLED 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | 디스플레이 리프레시, 화면 꺼짐 슬립, 상시 화면 표시와의 비교 | 실제 패널, 밝기, 리프레시 정책, 디스플레이 전원 레일, 사용자 듀티 사이클 |
| JDI 디스플레이 경로 측정 | [JDI 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | 문서화된 JDI 구성에서의 디스플레이별 저전력 동작 | 패널 변형, 업데이트 영역, 컨트롤러 구성, 레일, 리프레시 주파수 |
| 저전력 그래픽 UI 통합 | [GUI_PM 저전력 예제 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | UI 동작, 디스플레이 상태, PM 정책 사이의 상호작용 | 제품의 화면 수명 주기, 애니메이션, 터치/컨트롤러 웨이크업 소스, 변경 영역 정책 |
| 화면 리프레시 워크로드 특성 파악 | [소비 전력 테스트 예제 — 화면 리프레시 시나리오](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | 제품 워크로드에서 디스플레이 리프레시가 차지하는 부분 | 해상도, 픽셀 포맷, 변경된 영역, 인터페이스 속도, 버퍼 전략, 콘텐츠 주기 |
| 센서로 트리거되는 웨어러블 상호작용 구현 | [손목을 들어 화면 켜기](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | 센서 구동 웨이크업, 디스플레이 켜짐 동작, 슬립 복귀 | 센서 선택, 제스처 알고리즘, 샘플링 간격, 화면 타임아웃, 배터리 모델, 측정된 일일 사용량 |

</div>

### 보드 범위 확인 { #verify-the-board-scope }

아래 보드 목록은 각 예제 가이드에 명시적으로 문서화된 보드 이름과 현재 SiFli-SDK GCC 구성에서 선택되는 빌드 타깃 식별자를 구분합니다. 빌드 매트릭스에 항목이 있다는 것은 프로젝트가 빌드 타깃으로 구성되어 있다는 뜻일 뿐, 공개된 전력 결과가 그 보드에서 측정되었다는 뜻이 아닙니다. 가이드의 표기와 빌드 식별자가 다른 경우, 보드 매핑을 확인하지 않은 채 서로 바꿔 쓸 수 있다고 가정하지 마십시오. 아래 구성 링크는 현재 `main` 브랜치를 따릅니다. 다른 SDK 리비전에서는 `scons --board` 타깃을 선택할 때 해당 체크아웃의 `build_config_gcc.yaml`을 사용하십시오. 측정은 가이드에 명시된 하드웨어 구성에서만 재현하고, 제품군 범위의 문서 URL로부터 전체 칩 제품군에 대한 지원을 추정하지 마십시오.

- **PM 예제**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical). 가이드는 `sf32lb56-devkit-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4`를 명시합니다. 현재 GCC 프로젝트 항목은 `sf32lb56-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4`, `sf32lb52-core_n16r16`을 사용합니다. 첫 번째 식별자는 가이드의 `sf32lb56-devkit-lcd_n16r12n1`과 다릅니다. 이름이 다른 식별자를 서로 바꿔 쓸 수 있다고 가정하지 말고 보드 매핑을 확인하십시오.
- **GPIO 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio). 가이드와 현재 GCC 빌드 구성 모두 `sf32lb52-core_n16r16`을 명시합니다.
- **프로세서 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark). 가이드는 `eh-lb551`, `eh-lb555`, `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563`, `eh-lb523`을 나열합니다. 현재 GCC 빌드 구성은 이 프로젝트를 `default_boards`에 할당하며, 정확한 현재 빌드 타깃 식별자는 [구성 파일](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)에 나열되어 있습니다. 가이드의 목록과 `default_boards`는 이름이 일대일로 일치하지 않으므로, 추측하지 말고 사용하는 SDK 리비전에서 보드 매핑을 확인하십시오. 또한 빌드 타깃에 포함되어 있다고 해서 가이드의 전력 측정이 그 집합의 모든 보드를 다룬다는 뜻은 아닙니다.
- **BLE 브로드캐스트 및 연결 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble). 가이드는 `eh-lb551`과 `eh-lb555`를 명시하며, 현재 GCC 빌드 타깃은 `eh-lb551_hcpu`와 `eh-lb555_hcpu`입니다.
- **BLE/BT 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt). 가이드는 `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563`, `eh-lb523`을 나열합니다. 현재 GCC 구성은 `bt_boards` 집합을 사용하며, 정확한 빌드 타깃 식별자는 [구성 파일](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)에 나열되어 있고 일부는 `_hcpu` 접미사를 사용합니다. 이 프로젝트의 별도 항목에는 `sf32lb56-wlan-core_a128r12n1`과 `sf32lb56-wlan-core_n16r12n1`도 포함됩니다. 가이드의 보드 이름과 빌드 타깃 식별자는 보드 매핑을 확인하기 전에는 서로 바꿔 쓸 수 없습니다.
- **AMOLED 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED). 가이드와 현재 GCC 빌드 구성 모두 `sf32lb52-core_n16r16`을 명시합니다.
- **JDI 소비 전력 테스트**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi). 가이드와 현재 GCC 빌드 구성 모두 `sf32lb52-core_n16r16`을 명시합니다.
- **GUI_PM 저전력 예제 가이드**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm). 가이드와 현재 GCC 빌드 구성 모두 `sf32lb52-lchspi-ulp`를 명시합니다.
- **소비 전력 테스트 예제 — 화면 리프레시 시나리오**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh). 가이드는 빌드 예시로 `sf32lb52-core_n16r16`을 제시합니다. 이 프로젝트는 현재 GCC 빌드 매트릭스에 나열되어 있지 않지만, 그렇다고 해서 공개된 가이드나 소스 예제가 사라지는 것은 아닙니다.
- **손목을 들어 화면 켜기**: [SDK 소스](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist). 가이드와 현재 GCC 빌드 구성 모두 `sf32lb52-lchspi-ulp`를 명시합니다.

## 올바른 전기적 경계에서 측정하기 { #measure-at-the-right-electrical-boundary }

두 측정이 동일한 전기적 경계를 사용하기 전에는 제품의 트레이스를 SDK 샘플과 비교하지 마십시오. 예를 들어 GPIO 예제와 손목 들어올리기 웨이크업 예제는 저전력 측정을 위한 보드별 전원 연결과 점퍼 변경을 문서화합니다. USB로 전원을 공급받는 보드, 연결된 디버거, UART 변환기, 충전 회로, 디스플레이 모듈은 결과를 크게 바꿀 수 있습니다.

실행할 때마다 다음을 기록하십시오.

1. 전원을 인가하는 위치와 전원이 공급되는 모든 레일.
2. 공급 전압, 그리고 전류 계측기의 샘플링 모드와 범위.
3. 연결된 상태로 남아 있는 외부 디바이스, 풀 저항, 케이블, 디버그 인터페이스.
4. 펌웨어 리비전, 보드 이름, `menuconfig` 구성, PM 디버그 설정.
5. 트레이스의 각 구간이 나타내는 정확한 상태 전이 또는 워크로드.

전류뿐 아니라 전력과 에너지도 기록에 포함할 수 있도록 전류와 함께 전압을 측정하십시오. 부품, 시나리오, 일일 프로파일 검증 흐름은 [전력 측정과 검증](measurement-and-validation.md)에 자세히 설명되어 있습니다.

## 기본 PM, GPIO, 프로세서 테스트 { #baseline-pm-gpio-and-processor-tests }

제품 워크로드를 추가하기 전에 [PM 예제](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html)를 사용하여 기대하는 슬립 모드와 의도한 웨이크업 소스가 동작하는지 확인하십시오. 요청한 PM 상태를 기록하고 시스템이 실제로 진입하는 상태를 확인하십시오. 시스템이 요청한 깊은 상태에 한 번도 진입하지 않는다면, 매개변수를 미세 조정하기 전에 PM 상태 요청의 구성과 소유권을 조사하십시오.

비활성으로 보이는 인터페이스가 유휴 전류를 높이는 경우에는 **GPIO 소비 전력 테스트**가 알맞은 출발점입니다. 이 테스트에 문서화된 시나리오는 주기적으로 깨어나 GPIO를 읽으므로, 슬립 전류와 웨이크업 및 I/O 동작을 분리하는 데 유용합니다. 제품 검토는 여기서 더 나아가야 합니다. 내부 및 외부 풀, 고임피던스(High-Z) 상태, 전원 도메인 교차, 전원이 꺼진 주변 장치에 연결된 핀, 리셋 기본값, ESD/역전원 경로를 확인하십시오. 논리적으로 유효한 신호도 전류를 누설할 수 있습니다.

**프로세서 소비 전력 테스트**는 근본적으로 다른 여러 조건, 즉 CPU 작업, 단순 루프 워크로드, 셧다운, 타이머 웨이크업, 핀 웨이크업을 구분합니다. 활성 연산의 비용과 웨이크업 메커니즘을 파악하는 데는 유용하지만, 애플리케이션 에너지를 예측해 주지는 않습니다. 트레이스를 전력 예산에 사용하기 전에 벤치마크나 루프를 대표적인 펌웨어 워크로드로 교체하십시오.

## Bluetooth 및 디스플레이 시나리오 { #bluetooth-and-display-scenarios }

애플리케이션에서 연결 매개변수를 최적화하기 전에 전용 [BLE 브로드캐스트 및 연결](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html)과 [BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) 프로젝트를 사용하여 재현 가능한 무선 시나리오를 확립하십시오. 최종 제품은 여전히 자체 광고 또는 연결 설정, 상대 기기, RF 환경, 안테나, 콜백 동작으로 측정해야 합니다. 모든 무선 이벤트마다 메인 CPU를 깨우는 애플리케이션은 그 밖에는 좋은 링크 수준 결과를 무효로 만들 수 있습니다.

디스플레이 중심 프로젝트는 서로 다른 결정 사항을 분리합니다.

- **AMOLED 소비 전력 테스트**는 화면 꺼짐 슬립과 상시 화면 표시 정책을 비교합니다. 소스 예제의 모드 전환과 배터리 수명 수치는 문서화된 보드, 패널, 밝기, 리프레시 타이밍, 사용 모델에 적용되는 것이며 모든 AMOLED 제품에 적용되지 않습니다.
- [JDI 소비 전력 테스트](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html)는 JDI 디스플레이 경로에 대응하는 플랫폼별 기준을 제공합니다.
- [GUI_PM 저전력 예제 가이드](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html)는 UI 수명 주기 결정을 PM 동작과 연결합니다.
- [화면 리프레시 시나리오](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html)는 디스플레이 업데이트 부하 자체에 초점을 맞춥니다.

이 샘플들은 함께 하나의 제품 질문, 즉 어떤 이벤트가 실제로 픽셀 변경을 요구하며 패널의 얼마만큼을 업데이트해야 하는가를 풀어내는 데 활용해야 합니다. 그 답을 버퍼 및 부분 리프레시 정책으로 구체화하려면 [그래픽 개요](../graphics/overview.md)와 [디스플레이 컨트롤러](../graphics/display-controller.md)를 활용하십시오.

## 하나의 완전한 시나리오로서의 Raise-to-Wake { #raise-to-wake-as-a-complete-scenario }

**손목을 들어 화면 켜기** 프로젝트는 센서 샘플링, 제스처 인식, 디스플레이 웨이크업, 유한한 상호작용 구간, 슬립 재진입을 결합하므로 특히 유용합니다. 개별 상태가 아니라 하나의 제품 시나리오를 보여 줍니다.

업스트림 예제의 배터리 수명 추정치는 문서화된 배터리 용량, 웨이크업 횟수, 디스플레이 켜짐 시간, 센서, 샘플링 간격, 보드, 측정된 전류에 한정됩니다. 이를 적용할 때는 구조를 유지하십시오. 화면 켜짐 상태를 측정하고, 화면 꺼짐 상태를 측정하고, 하루 이벤트 횟수를 명시하고, 합산한 일일 에너지를 계산합니다. 그런 다음 그 수치를 그대로 가져다 쓰지 말고 모델을 제품 고유의 값으로 갱신하십시오.

모델링과 측정을 반복하는 구체적인 예는 [스마트워치 전력 프로파일링](smartwatch-power-profiling.md)을 참고하십시오.

## PM 예제를 제품 근거로 발전시키기 { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>표: PM 예제의 제품 적용 점검</em></div>

<div align="center" markdown>

| 단계 | 보관할 근거 | 중요한 이유 |
|:-----|:-----------------|:---------------|
| 원래의 기준 구성 확립 | 보드, 전원 연결, 점퍼, SDK 리비전, 구성, 예상 동작 | 소스 동작과 이후의 제품 변경을 구분합니다 |
| 시나리오 하나 식별 | 지정된 PM 상태, 활성 구성 요소, 웨이크업 소스, 지속 시간, 종료 조건 | 엔지니어링적 의미가 없는 평균 전류 수치를 방지합니다 |
| 전류와 전압 측정 | 트레이스 마커와 전류, 전압, 전력, 에너지 | 레일과 펌웨어 리비전 간에 결과를 비교할 수 있습니다 |
| 제품 하드웨어 추가 | 갱신된 외부 부품, 핀 상태, 레일, 센서 | 개발 보드에는 없는 누설과 주변 장치 전력을 드러냅니다 |
| 전력 모델 조정 | 시나리오 빈도, 지속 시간, 측정된 에너지 | 일일 사용량 계산이 관찰된 제품 동작과 수렴하게 합니다 |

</div>

## 관련 자료 { #related-resources }

- PM 소유권, 전원 모드, 시스템 수준 설계, 프로파일링 개념은 [저전력 설계 개요](overview.md)를 참고하십시오.
- 부품, 시나리오, 제품 프로파일 검증은 [전력 측정과 검증](measurement-and-validation.md)을 참고하십시오.
- 일일 사용량 모델의 구체적인 예는 [스마트워치 전력 프로파일링](smartwatch-power-profiling.md)을 참고하십시오.
- 도메인 전반의 SDK 예제 카탈로그는 [예제](../../develop/examples/index.md)를 참고하십시오.
- 현재 공식 프로젝트와 설정 세부 사항은 [SiFli-SDK PM 예제 색인](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html)을 참고하십시오.
