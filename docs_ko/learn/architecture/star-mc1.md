---
icon: lucide/cpu
description: "Arm China의 STAR-MC1 Armv8-M Mainline CPU 코어를 소개하고, Cortex-M33과의 소프트웨어 모델 관계 및 SF32 펌웨어에 미치는 영향을 설명합니다."
tags:
    - 아키텍처
---
# STAR-MC1 { #star-mc1 }

## 소개 { #introduction }

**STAR-MC1**은 Cortex-M33에서도 사용하는 아키텍처 프로파일인 **Armv8-M Mainline**을 기반으로 한 Arm China의 CPU IP입니다. 따라서 익숙한 Armv8-M 소프트웨어 모델을 사용할 수 있지만, Cortex-M33용 펌웨어를 그대로 재사용할 수 있다는 보장은 아닙니다. 선택적 아키텍처 확장, 코어 구성, SoC 주변 장치, 시작 코드와 링커 설정, SDK 지원이 서로 다를 수 있습니다. Cortex-M33을 대상으로 한 소프트웨어는 포팅의 출발점으로 취급하고, 대상 디바이스와 SDK에서 검증하십시오.

STAR-MC1을 사용하는 SF32 디바이스에서 SiFli 문서는 문맥과 설명 수준에 따라 애플리케이션 CPU를 **Arm Cortex-M33**, **Cortex-M33 STAR-MC1** 또는 간단히 **STAR-MC1**로 표기할 수 있습니다. 이러한 표기만으로는 선택적 코어 기능이나 정확한 SoC 구성을 확인할 수 없으므로, 부품을 선택하기 전에 해당 디바이스의 문서를 확인하십시오.

Arm Cortex-M 제품군을 알고 있으면서 소프트웨어, 성능 또는 부품 선택 관점에서 STAR-MC1의 위치를 정확히 파악해야 할 때 이 페이지를 참고하십시오. 무엇이 그대로 익숙한지, SoC 구현에 따라 무엇이 달라질 수 있는지, 그리고 STAR-MC1을 고정된 Cortex-M7 대체품으로 취급하면 안 되는 이유를 설명합니다.

여기서 호환성은 공통된 Armv8-M 아키텍처 소프트웨어 모델을 뜻하며, 그대로 교체할 수 있는 펌웨어 이미지를 뜻하지 않습니다. 펌웨어를 재사용하기 전에 선택한 코어 기능, 컴파일러 옵션, 시작 코드, 링커 레이아웃, 인터럽트 할당, 주변 장치 드라이버, 보안 구성을 대상 SoC와 SDK에 맞춰 확인하십시오.

## 개발자 관점의 위치 { #positioning-for-developers }

가장 유용한 개념 모델은 "Cortex-M33과 Cortex-M7 사이의 고정된 프로세서"가 **아닙니다**. STAR-MC1은 구성 가능하고 Cortex-M33과 호환되는 **Armv8-M Mainline** CPU IP입니다. 최종 SoC가 구현하는 경우, 익숙한 MCU 소프트웨어 모델에 캐시, TCM(tightly coupled memory), DSP 명령, 코프로세서 인터페이스, TrustZone 같은 선택적 메모리 시스템 및 가속 기능을 결합할 수 있다는 점이 가치입니다.

<div align="center"><em>표: Cortex-M 라인업에서 STAR-MC1의 위치</em></div>

<div align="center" markdown>

| 이미 알고 있는 코어 | STAR-MC1에서도 익숙한 점 | 실질적인 차이 | 가정하면 안 되는 것 |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | 베어메탈 및 RTOS 개발, 인터럽트, DMA, 주변 장치 드라이버 작업. | STAR-MC1은 더 새로운 Armv8-M 소프트웨어 모델을 사용하며, 더 강력한 메모리 및 가속 옵션을 제공할 수 있습니다. | Cortex-M4 바이너리, Armv7E-M 가정, 동일한 디버그/보안 기능이 그대로 적용된다고 가정하면 안 됩니다. |
| Cortex-M33 | Armv8-M 프로그래밍, 예외, 툴체인 모델. | SoC가 플래시/PSRAM 비중이 큰 UI, 오디오, 연결 워크로드를 위한 메모리 시스템 여유를 더할 수 있습니다. | STAR-MC1 기반의 모든 부품에서 캐시, TCM, DSP, FPU, CDE, TrustZone이 활성화되어 있다고 가정하면 안 됩니다. |
| Cortex-M7 | 메모리 배치, 캐시 동작, DMA 일관성(coherency), 실시간 지연 시간을 관리해야 한다는 점. | STAR-MC1은 MCU급 Armv8-M 기반을 유지하며, 유연하고 전력을 의식한 IoT 설계를 대상으로 합니다. | Cortex-M7을 그대로 대체할 수 있다거나 처리량, 메모리 시스템, 소프트웨어 생태계가 같다고 가정하면 안 됩니다. |

</div>

SF32 프로젝트에서는 STAR-MC1이라는 표기만으로 선택하지 말고, 문서화된 메모리, 주변 장치, SDK 지원을 기준으로 디바이스를 선택하십시오. 공개된 STAR-MC1 자료는 Armv8-M을 설명하며 캐시, TCM, DSP, 코프로세서 인터페이스, TrustZone을 가능한 기능으로 제시합니다. 특정 제품에서 기능이 구현되고 활성화되어 있는지는 SoC 문서에서 확인해야 합니다.

## STAR-MC1이 중요한 이유 { #why-star-mc1-matters }

기존 Cortex-M33 MCU는 보안이 필요한 저전력 임베디드 제어에 훌륭하지만, 최신 연결형 제품은 제어 로직 이상을 요구하는 경우가 많습니다. 웨어러블, 스마트 디스플레이, Bluetooth 오디오 제품, 엣지 AI 디바이스에는 반응성이 좋은 사용자 인터페이스, 더 큰 외부 메모리, 신호 처리, 그래픽이나 오디오 데이터의 빈번한 이동도 필요할 수 있습니다.

STAR-MC1은 SoC가 구현하고 소프트웨어가 효과적으로 활용하는 경우, 선택적 캐시, TCM, 커스텀 명령을 통해 이러한 워크로드를 지원할 수 있습니다. 이러한 기능은 MCU 개발 모델을 유지하면서 메모리 스톨을 줄이거나 특정 연산을 가속할 수 있습니다. 성능과 에너지 이점은 코어 이름만으로 자동으로 얻어지지 않으므로, 완성된 디바이스에서 대표 워크로드로 확인하십시오.

## Cortex-M 제품군 비교 { #cortex-m-family-comparison }

다음 표는 일반적인 Cortex-M 프로세서 가운데 STAR-MC1의 위치를 요약합니다. 정확한 기능은 최종 SoC 구현에 따라 달라지지만, 제품에 맞는 아키텍처를 고를 때 이 위치 구분이 도움이 됩니다.

간결하게 나타내기 위해 표에서는 해당 Cortex-M 프로세서를 `CM3`, `CM4`, `CM33`, `CM55`, `CM7`로 표기합니다.

<div align="center"><em>표: Cortex-M 제품군 비교</em></div>

<div align="center" markdown>

| 기능 | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Arm 아키텍처 | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| 파이프라인 | 3단계, 인오더 | 3단계, 인오더 | 3단계, 인오더 | 인오더. 단계 수는 공개 TRM에 명시되어 있지 않음 | 4단계, 인오더. Helium 사용 시 5단계 | 6단계, 슈퍼스칼라 |
| 주 시스템 버스 인터페이스 | 3 × AMBA AHB-Lite (Harvard) | 3 × AMBA AHB-Lite (Harvard) | 2 × AMBA 5 AHB5 인터페이스: C-AHB + S-AHB | 2 × AMBA 5 AHB5 인터페이스: C-AHB + S-AHB | 64비트 AMBA 5 AXI5. 32비트 AHB 주변 장치. TCM용 64비트 AHB 슬레이브 인터페이스 | 64비트 AMBA 4 AXI. 32비트 AHB 주변 장치. TCM용 32비트 AHB 슬레이브 인터페이스 |
| TrustZone 지원 | 아니요 | 아니요 | 선택 사항. SoC에 따라 다름 | 선택 사항. SoC에 따라 다름 | 선택 사항. SoC에 따라 다름 | 아니요 |
| DSP 명령 | 전용 DSP 확장 없음 | 기본 DSP 확장 | 선택적 DSP 확장 | 선택적 DSP 확장 | 기본 DSP 확장. 선택적 Helium (MVE) | 기본 DSP 확장 |
| Arm Helium (MVE) | 지원하지 않음 | 지원하지 않음 | 지원하지 않음 | 지원하지 않음 | 선택 사항. 정수 또는 부동소수점 MVE, 구성에 따라 다름 | 지원하지 않음 |
| 부동소수점 유닛 | IP 자체 기능 없음 | 선택적 단정밀도 | 선택적 단정밀도 | 선택적 단정밀도 | 선택적 스칼라 FP16/FP32/FP64. 선택적 벡터 FP16/FP32 | 선택적 단정밀도/배정밀도 |
| I-cache / D-cache | 프로세서 IP에 포함되지 않음. SoC 수준 캐시를 추가할 수 있음 | 프로세서 IP에 포함되지 않음. SoC 수준 캐시를 추가할 수 있음 | 프로세서 IP에 포함되지 않음. SoC 수준 캐시를 추가할 수 있음 | 프로세서 IP에서 선택 사항. 유무와 구성은 구현에 따라 다름 | 프로세서 IP에서 선택 사항. 유무와 구성은 구현에 따라 다름 | 프로세서 IP에서 선택 사항. 유무와 구성은 구현에 따라 다름 |
| Arm Custom Instructions / CDE | IP 자체 기능 없음 | IP 자체 기능 없음 | Arm이 CDE 인코딩을 정의하며 커스텀 연산과 데이터패스는 SoC가 정의함. 선택적 정수 CDE, 부동소수점 CDE는 FPU/구성에 따라 다름 | STAR-MC1 TRM은 GPR CDE 및 FPCDE 모듈을 설명함. 구현된 연산과 제품에서의 제공 여부는 SoC 구성에 따라 다름 | Arm이 CDE 인코딩을 정의하며 커스텀 연산과 데이터패스는 SoC가 정의함. r1부터 선택 사항이며 r0에서는 사용할 수 없음 | IP 자체 기능 없음 |
| 소프트웨어 호환성 | 기준 | CM3 호환 | Armv8-M 소프트웨어 모델. Armv8-M 툴 필요 | CM33 호환 | CM33 호환. Helium은 Armv8.1-M 툴체인 지원 필요 | CM4 호환 (같은 Armv7E-M 계열) |
| CoreMark/MHz 참고값* | 3.34 | 3.42 | 4.02 | 4.02† | 4.20 | 5.01 |
| 상대적 전력 요구량 (정성적)‡ | 매우 낮음 | 낮음 | 낮음 | 낮음 | 중간 | 높음 |
| 연산 특성 (정성적) | 저전력 스칼라 제어 | 실시간 스칼라 DSP | 보안 및 구성이 가능한 스칼라 MCU | CM33 호환 스칼라 CPU. SoC가 구현한 캐시, TCM, 커스텀 명령으로 시스템 수준 성능을 향상할 수 있음 | Helium 활성화 시 벡터 DSP/ML | 높은 스칼라 처리량과 메모리 대역폭 |
| 권장 대표 애플리케이션 | 저복잡도 제어와 단순 센서 노드 | 모터 제어, 오디오 DSP, 센서 처리 | 보안이 필요한 연결형 엔드포인트와 IoT 제어 | UI 중심 웨어러블, Bluetooth 오디오, 플래시/PSRAM 기반 IoT 제품 | ML 센서 퓨전, 음성/오디오, 비전, DSP | 반응성이 좋은 HMI, 고처리량 제어, 네트워킹 |

</div>

\* 이 참고값은 Arm의 [Cortex-M comparison table, Version 2020](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431)에서 가져온 것입니다. 현재 기준의 범용 점수나 완성된 SoC의 직접적인 순위가 아닙니다. 컴파일러, 메모리 시스템, 캐시 설정, 벤치마크 구성이 결과에 영향을 줍니다.

† STAR-MC1은 CM33과 호환되므로 여기서는 CM33의 참고값을 사용합니다. 이는 비교 기준값이며 Arm이 발표했거나 측정한 STAR-MC1 결과가 아닙니다.

‡ 이는 아키텍처상의 위치를 나타내는 지침이며 실리콘에서 측정한 데이터가 아닙니다. 실제 전력은 공정 기술, 전압, 주파수, 메모리 아키텍처, 활성화된 기능, 주변 장치, 펌웨어 듀티 사이클, 최종 SoC 구현에 따라 달라집니다.

파이프라인 및 버스 행은 각 IP의 주 실행 파이프라인과 시스템 메모리 인터페이스를 요약한 것입니다. CM33과 STAR-MC1은 C-AHB/S-AHB 버스 구성을 공유합니다. 캐시와 그 밖의 선택적 메모리 기능은 이 버스 인터페이스와 별개이며, 제공 여부는 SoC 구성과 구현에 따라 달라집니다. 이는 완성된 모든 SoC에서 활성화된 인터페이스를 설명하는 것이 아닙니다. 디버그, 트레이스, 코프로세서 및 기타 선택적 포트는 나열하지 않았습니다.

프로세서 IP 참고 자료: Arm [CM3 datasheet](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14), [CM4 documentation](https://support.arm.com/compute-ip/cortex-m4), [CM33 Technical Reference Manual](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954), [CM55 datasheet](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5), [CM7 datasheet](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf), [STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf)

## 아키텍처 개선 사항 { #architectural-enhancements }

STAR-MC1은 Cortex-M33을 대체하는 것이 아니라 그 위에 구축되었습니다. 가장 중요한 추가 사항은 코어가 메모리를 기다리는 시간을 줄이고 유용한 작업을 실행하는 시간을 늘려 주는 구현 수준의 개선입니다.

### 명령 캐시와 데이터 캐시 { #instruction-and-data-caches }

명령 캐시(**I-cache**)와 데이터 캐시(**D-cache**)의 제공 여부와 구성은 SoC 구현에 따라 달라집니다. 이러한 캐시가 구현되고 활성화되어 있으면, 외부 플래시에서 코드를 실행하거나, PSRAM에 접근하거나, 더 큰 사용자 인터페이스 및 미들웨어 스택을 실행하는 시스템에서 특히 가치가 있습니다.

주요 이점은 다음과 같습니다.

- SRAM이 아닌 메모리에서의 명령 페치가 더 빨라집니다.
- 평균 데이터 접근 지연 시간이 줄어듭니다.
- 그래픽, 오디오, 프로토콜 스택, UI 프레임워크의 성능이 좋아집니다.
- 같은 코드나 데이터를 재사용할 때 메모리 버스 부담이 줄어듭니다.

하드웨어가 일관성을 유지해 주지 않는 캐시 가능(cacheable) 버퍼의 경우, DMA, 디스플레이 컨트롤러, 오디오 인터페이스 또는 다른 버스 마스터와 메모리를 공유하는 드라이버는 SDK 또는 RTOS의 캐시 관리 규칙을 따라야 합니다. 주변 장치가 읽기 전에 CPU가 쓴 데이터를 clean하십시오. 수신 버퍼는 DMA가 쓰기 전에 준비하고, 전송이 완료된 뒤 CPU가 읽기 전에 오래된 캐시 라인을 invalidate하십시오. DMA가 버퍼를 소유하는 동안 CPU가 해당 버퍼에 접근해서는 안 됩니다. 캐시 라인 전체를 할당하고 관련 없는 데이터와 공유하지 않도록 하며, 플랫폼의 완료 확인과 메모리 배리어를 따르십시오. 캐시 불가(non-cacheable) 또는 하드웨어 일관성이 보장되는 버퍼도 해당 플랫폼의 동기화 규칙이 여전히 필요합니다. 버퍼 소유권과 dirty 라인 위험은 [PSRAM과 다른 임베디드 메모리 유형 비교](psram-and-memory-types.md#caches-and-external-memory-execution)를 참고하십시오.

### Armv8-M 커스텀 데이터패스 확장 { #armv8-m-custom-datapath-extension }

IP 수준에서 Arm은 CDE 명령 인코딩을 정의하고, SoC 설계자는 커스텀 연산과 데이터패스를 정의합니다. CM33은 선택적 정수 CDE를 지원하며, 부동소수점 CDE는 FPU와 구성에 따라 다릅니다. STAR-MC1 TRM은 GPR CDE 및 FPCDE 모듈을 설명하지만, 이러한 IP 수준의 설명만으로는 특정 SF32 디바이스나 SDK에서 CDE를 사용할 수 있다고 확정할 수 없습니다. SiFli SDK [v2.5.1 릴리스 노트](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1)에는 SF32LB57x에서 CDE가 실수로 활성화되던 문제의 수정이 기록되어 있으므로, 의존하기 전에 정확한 대상과 SDK에서 지원 여부를 확인하십시오. CM55는 r0가 아니라 r1부터 선택적 CDE를 제공합니다. CP0~CP7은 코프로세서 또는 CDE에 할당되는 인코딩 공간이며, 커스텀 명령 8개나 추가 가속기 8개를 의미하지 않습니다. 코어 리비전, 구현된 모듈, 컴파일러/SDK 지원을 확인하십시오. [CM33 datasheet](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf), [CM55 CDE revision notes](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips), STAR-MC1 TRM의 B7/B8장을 참고하십시오.

이는 다음과 같은 워크로드에 유용할 수 있습니다.

- 디지털 신호 처리
- 암호화
- 컴퓨터 비전 기본 연산
- 머신러닝 커널
- 센서 퓨전 연산

CDE가 모든 애플리케이션을 자동으로 가속하지는 않습니다. 소프트웨어가 해당 커스텀 명령을 생성하는 컴파일러 지원, 라이브러리 또는 벤더가 제공하는 SDK 구성 요소를 사용해야 합니다. 그러나 SoC와 소프트웨어 스택이 지원하는 경우, 워크로드를 별도의 애플리케이션 프로세서로 옮기지 않고도 애플리케이션 특화 가속을 위한 깔끔한 경로를 제공합니다.

### 메모리 시스템 최적화 { #memory-system-optimization }

최신 MCU 워크로드의 상당수는 CPU 주파수뿐 아니라 메모리 지연 시간과 대역폭에도 제약을 받습니다. 따라서 애플리케이션이 내부 SRAM, 패키지 내 플래시, PSRAM, 디스플레이 버퍼, 주변 장치 DMA를 함께 사용할 수 있는 SF32급 디바이스에서는 STAR-MC1의 메모리 시스템 설계와 SoC가 구현하고 활성화한 캐시 기능이 중요합니다.

가장 큰 효과는 보통 다음과 같은 경우에 나타납니다.

- 코드가 밀결합(tightly coupled) SRAM이 아니라 플래시 또는 외부 메모리에서 실행됩니다.
- UI 프레임워크가 이미지, 폰트, 레이아웃 데이터에 반복적으로 접근합니다.
- 오디오, Bluetooth, 그래픽, 애플리케이션 태스크가 동시에 실행됩니다.
- 워킹 셋이 캐시에 잘 들어맞습니다.

이미 빠른 SRAM에서 실행되는 순수 CPU 중심 루프는 개선 폭이 작을 수 있습니다.

## 성능 특성 { #performance-characteristics }

STAR-MC1이 **CoreMark/MHz**나 **DMIPS/MHz** 같은 작은 합성 CPU 벤치마크 지표를 자동으로 개선한다고 설명해서는 안 됩니다. 이러한 벤치마크는 주로 간결한 정수 워크로드를 측정하며, 빠른 로컬 메모리에서 실행될 만큼 작은 경우가 많습니다. 그런 상황에서는 명령 캐시와 데이터 캐시가 표준 Cortex-M33급 구현에 비해 눈에 띄는 개선을 거의 또는 전혀 제공하지 못할 수 있습니다.

STAR-MC1은 구성 가능한 메모리 서브시스템과 워크로드 특화 가속을 선택적으로 갖춘 Cortex-M33 호환 코어입니다. 이러한 기능은 애플리케이션이 메모리 접근, 외부 플래시 또는 PSRAM 지연 시간, 그래픽 리소스, 프로토콜 스택, 더 큰 코드 및 데이터 집합에 대한 반복 접근에 제약을 받을 때 도움이 될 수 있습니다. 이점은 구현된 기능과 애플리케이션이 이를 활용하는 방식에 따라 달라집니다.

<div align="center"><em>표: 성능 특성</em></div>

<div align="center" markdown>

| 워크로드 유형 | STAR-MC1에서 기대되는 이점 | 이유 |
|:--------------|:--------------------------|:----|
| 작은 CoreMark/DMIPS 방식 루프 | 대체로 제한적 | 워킹 셋이 작아 이미 빠른 메모리에 들어갈 수 있습니다. |
| 플래시 또는 PSRAM에서 실행되는 코드 | 대체로 개선됨 | 구현되고 활성화되어 있으면 I-cache가 명령 페치 스톨을 줄일 수 있습니다. |
| 데이터 비중이 큰 UI, 그래픽, 미들웨어 | 대체로 개선됨 | 구현되고 활성화되어 있으면 D-cache가 반복적인 데이터 접근 지연 시간을 줄일 수 있습니다. |
| DMA 비중이 큰 주변 장치 워크로드 | 소프트웨어 설계에 따라 다름 | 캐시 가능하고 일관성이 보장되지 않는 버퍼에는 캐시 관리가 필요하며, 어떤 경우에도 소유권과 동기화는 필요합니다. |
| CDE를 활성화한 커널 | 개선 가능성 있음 | 커스텀 명령으로 특정 연산을 가속할 수 있습니다. |

</div>

## SF32 개발자에게 주는 의미 { #what-this-means-for-sf32-developers }

SF32 펌웨어 개발에서는 STAR-MC1을 Cortex-M33과 호환되는 애플리케이션 프로세서로 취급하십시오. 구현된 메모리 및 가속 기능을 애플리케이션의 코드, 데이터, 타이밍 요구 사항에 비추어 평가하십시오.

실무에서는 다음과 같이 합니다.

- Cortex-M33 펌웨어는 그대로 교체할 수 있는 이미지가 아니라 소스 수준의 포팅 기준으로 취급하고, 재사용하기 전에 대상 구성과 SDK 지원을 확인하십시오.
- RTOS, 인터럽트, 권한, TrustZone, 디버그 개념은 Cortex-M 개발자에게 그대로 익숙합니다.
- 성능에 민감한 애플리케이션은 핵심 코드와 데이터를 신중하게 배치하고 SDK의 캐시 및 메모리 API를 사용해야 합니다.
- 캐시 가능한 DMA 버퍼는 하드웨어가 일관성을 보장하지 않는 경우 명시적인 캐시 관리가 필요하며, 모든 DMA 버퍼에는 안전한 소유권과 동기화가 필요합니다.
- 그래픽, 오디오, AI, 연결 워크로드는 소프트웨어 스택이 SoC의 하드웨어 가속기와 메모리 계층을 효과적으로 활용할 때 가장 큰 이점을 얻습니다.

이 코어가 모든 Cortex-M7 사용 사례를 대체하도록 만들어진 것은 아닙니다. 애플리케이션이 더 높은 전력으로 최대 단일 코어 처리량을 요구한다면 Cortex-M7급 디바이스가 여전히 적합할 수 있습니다. 그러나 배터리로 동작하는 연결형 제품에서는 STAR-MC1이 호환성, 성능, 에너지 효율의 균형을 유용하게 제공합니다.

## 적합한 애플리케이션 { #good-application-fits }

STAR-MC1 기반 디바이스는 MCU 수준의 전력 및 집적도 제약을 유지하면서 메모리 시스템 또는 애플리케이션 특화 가속이 필요한 제품의 후보입니다. 간결한 CoreMark/DMIPS 점수보다 메모리 지연 시간이 더 중요한 경우에 특히 평가해 볼 만합니다. 기존의 모든 Cortex-M33에 대한 우위를 가정하지 말고, 구현된 기능과 측정된 워크로드 성능을 기준으로 실제 SoC를 선택하십시오.

대표적인 예는 다음과 같습니다.

- 스마트워치와 피트니스 트래커
- Bluetooth 오디오 디바이스
- 웨어러블 의료 및 건강 모니터링 제품
- 스마트 디스플레이와 소형 HMI 시스템
- 엣지 AI 센서 디바이스
- LVGL 또는 기타 임베디드 UI 프레임워크를 사용하는 제품
- 대용량 플래시 또는 PSRAM에서 코드를 실행하는 디바이스

## 핵심 요약 { #key-takeaways }

- STAR-MC1은 Cortex-M33과 호환되므로, 익숙한 Armv8-M 임베디드 소프트웨어 모델을 유지합니다.
- SoC가 명령 캐시와 데이터 캐시를 활성화하면, 특히 코드와 데이터가 빠른 내부 SRAM 밖에 있을 때 실제 성능이 향상될 수 있습니다.
- CDE는 SoC와 소프트웨어 스택이 지원하는 경우 커스텀 명령 가속을 위한 경로를 제공합니다.
- STAR-MC1은 CM33 호환 소프트웨어 모델에 구성 가능한 메모리 및 가속 기능을 결합합니다. 코어 표기만으로 비교하지 말고 완성된 SoC와 측정된 워크로드를 비교하십시오.
- STAR-MC1을 사용하는 SF32 디바이스에서는 이 코어와 함께 구현된 SoC 기능이 MCU 방식의 개발 모델 안에서 더 풍부한 그래픽, 오디오, AIoT, 웨어러블 애플리케이션을 지원할 수 있습니다.

---

함께 보기: STAR-MC1이 SF32LB5x 칩 라인업 전반에서 어떤 위치인지는 [SF32 제품군](../../sf32-products/family/SF32_family.md)을 참고하십시오.

주요 참고 자료: [Arm China STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf)
