---
icon: lucide/lightbulb
title: "Learn 개요"
description: "필요한 SF32 아키텍처 및 서브시스템 안내를 찾아보십시오: 그래픽, Bluetooth, AI, 오디오, 저전력, 그리고 기반 프로세서 아키텍처를 다룹니다."
tags:
    - Learn
---

# 학습 개요 { #learn-overview }

**Learn**은 서브시스템과 아키텍처에 관한 결정을 펌웨어나 하드웨어에서 되돌리기 어려워지기 전에 내리는 데 활용하십시오. 이 페이지들은 SF32 구성 요소가 서로 어떻게 맞물리는지 설명하며, 범용 CPU가 어떤 경우에 그래픽 엔진, 무선 컨트롤러, AI 가속기 또는 기타 전용 하드웨어에 작업을 넘겨야 하는지도 다룹니다. 또한 그래픽, 무선, 오디오, AI, 메모리, 전력이 하나의 제품 안에서 공존해야 할 때 무엇을 검증해야 하는지도 짚어 줍니다.

처음 보드를 성공적으로 실행하려면 [시작하기 개요](../getting-started/index.md), 단계별 실습은 [튜토리얼 개요](../getting-started/tutorials/overview.md), 소프트웨어 워크플로와 예제는 [개발 개요](../develop/index.md), 부품 선택과 양산 설계는 [SF32 제품군](../sf32-products/family/SF32_family.md)을 이용하십시오.

## 설계 질문에서 시작하기 { #start-with-your-design-question }

<div align="center"><em>표: 알맞은 학습 경로 찾기</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 필요한 내용 | 시작 위치 | 이어서 볼 내용 |
|:----------------|:-----------|:-------------|
| 프로세서, 메모리, 하드웨어 오프로드 모델 이해 | [아키텍처 개요](architecture/overview.md) | 선택한 디바이스와 관련이 있는 경우 [STAR-MC1](architecture/star-mc1.md), [PSRAM과 다른 임베디드 메모리 유형 비교](architecture/psram-and-memory-types.md), [PTM Parallel Task Machine](architecture/ptm-parallel-task-machine.md). |
| 디스플레이 UI 구축 또는 에셋/프레임버퍼 전략 선택 | [그래픽 개요](graphics/overview.md) | 관련 디스플레이, 렌더링, 압축 결정을 위한 [디스플레이 컨트롤러](graphics/display-controller.md), [ePicasso 2D / 2.5D 그래픽 엔진](graphics/epicasso-gpu.md), [eZip 무손실 압축과 하드웨어 디코딩](graphics/ezip.md), [TurboPixel 프레임버퍼 압축](graphics/turbopixel.md). |
| 휴대폰, 액세서리 또는 오디오 디바이스 연결 | [Bluetooth 개요](bluetooth/overview.md) | 컨트롤러와 애플리케이션의 경계는 [Bluetooth 프로세서](bluetooth/processor.md), 제품에 휴대폰 기반 IP 전송이 필요하면 [Bluetooth PAN](bluetooth/pan.md). |
| 온디바이스 추론 추가 | [AI 개요](ai/overview.md) | [AI 가속기](ai/accelerator.md), 이어서 모델과 파이프라인에 필요한 메모리, 지연 시간, 전력 점검. |
| 소리 캡처, 재생 또는 처리 | [오디오 개요](audio/overview.md) | [Audio Server와 버퍼링](audio/audio-server-buffering.md), 그리고 제품이 오디오를 스트리밍하거나 통화를 무선으로 전달하는 경우 Bluetooth 안내. |
| 배터리 수명 목표 달성 | [저전력 설계 개요](low-power/overview.md) | [전력 측정과 검증](low-power/measurement-and-validation.md), 이어서 각 서브시스템의 전력 동작을 다룬 Bluetooth, 그래픽, 오디오, AI 페이지. |

</div>

## 페이지를 함께 활용하기 { #use-the-pages-together }

실제 제품은 대부분 여러 그룹에 걸쳐 있습니다. 디스플레이, BLE, 마이크, 배터리 예산을 갖춘 웨어러블은 이 요소들을 서로 분리된 기능으로 다루지 않는 것이 좋습니다. 디스플레이 갱신은 메모리 트래픽과 활성 시간에 영향을 주고, Bluetooth 스케줄링은 웨이크업 빈도에 영향을 주며, 오디오와 AI는 버퍼와 지연 시간에 영향을 주고, 모든 결정은 전력 예산을 바꿉니다.

페이지를 다음과 같은 설계 루프로 활용하십시오.

1. 주된 제품 요구 사항과 선택한 디바이스에서 시작합니다. 필요한 디스플레이, Bluetooth, AI, 오디오, 메모리, 저전력 기능이 해당 디바이스에 실제로 문서화되어 있는지 확인합니다.
2. 애플리케이션을 통합하기 전에 프로세서의 역할과 메모리 할당을 정의합니다. 워킹 셋, 프레임버퍼, 모델, 오디오 버퍼가 어디에 위치할지 계획하고, 지연 시간이 중요한 태스크에 필요한 코드와 데이터는 적합한 저지연 메모리에 배치하며, 전용 하드웨어는 그 기능과 통합 제약이 제품에 맞는 경우에만 사용합니다.
3. 주된 서브시스템의 개요 페이지에서 상세 구현 페이지로 이어서 살펴봅니다. Bluetooth, 메모리, 저전력으로 연결되는 교차 링크는 선택적인 배경 지식이 아니라 설계 의존성으로 취급합니다.
4. 의도한 하드웨어에서 전체 조합을 검증합니다. [개발 개요](../develop/index.md)의 워크플로와 관련 Learn 페이지에서 제시하는 측정 항목을 활용하여 기능 동작, 지연 시간, 대역폭, RF 동작, 전력을 함께 테스트합니다.

!!! note "자동 생성 콘텐츠"
    이 페이지는 해당 내용 전용의 기존 원본 문서 없이 정리하여 작성되었습니다. 의존하기 전에 기술적 주장을 SiFli 공식 문서와 대조하여 확인하십시오.
