---
icon: lucide/minimize-2
description: "TurboPixel의 고정 비율 손실 프레임버퍼 압축이 지원되는 SF32 디바이스에서 버퍼 저장 공간과 디스플레이 읽기 트래픽을 줄이는 방법을 설명합니다."
tags:
  - 그래픽
---

# TurboPixel 프레임버퍼 압축 { #turbopixel-framebuffer-compression }

## 개요 { #overview }

**TurboPixel**은 지원되는 SF32 디바이스에서 최종 렌더링된 비트맵에 사용하는 고정 비율 손실 압축 포맷입니다. 디스플레이 경로의 일부로서, **extDMA**가 비트맵을 압축하고 디스플레이 컨트롤러가 픽셀을 패널로 전송하면서 TurboPixel을 압축 해제합니다.

TurboPixel은 에셋 저장 포맷이 아니며 [eZip 무손실 압축과 하드웨어 디코딩](ezip.md)을 대체하지 않습니다. eZip은 저장소에서 읽기 전의 소스 에셋을 무손실로 압축하고, TurboPixel은 최종 렌더링된 비트맵을 압축하여 프레임버퍼 트래픽에 필요한 PSRAM 용량과 PSRAM 대역폭을 줄입니다.

전체 그래픽 흐름과 eZip, ePicasso, 디스플레이 컨트롤러에 대한 TurboPixel의 위치는 [그래픽 개요](overview.md#sf32-graphics-flow)를 참고하십시오. 이 페이지는 TurboPixel의 압축 동작, 통합 시 상충 관계, 사용 가능 여부에 초점을 맞춥니다.

SF32LB55x, SF32LB56x 또는 SF32LB58x 설계에서 프레임버퍼 용량이나 디스플레이 읽기 트래픽이 병목일 때 이 페이지를 읽으십시오. 제품 및 펌웨어 엔지니어가 예측 가능한 PSRAM 절감 효과와 손실 압축에 따른 화질 저하를 저울질하는 데 도움이 되며, eZip 에셋 압축을 대체하지는 않습니다.

## 설계상 고정 비율 및 손실 압축 { #fixed-ratio-and-lossy-by-design }

TurboPixel에는 두 가지 핵심 특성이 있습니다.

- **선택한 구성에서의 고정 비율.** 입력 픽셀 포맷과 압축 설정이 공칭 배율을 결정하며, 이미지의 세부 정도에 따라 달라지지 않습니다. 필요한 할당 크기는 행 정렬과 청킹에도 좌우됩니다. 다른 구성에서 가져온 비율을 쓰지 말고 선택한 칩과 SDK의 크기 산정 규칙을 사용하십시오.
- **손실 압축.** TurboPixel로 압축 해제한 비트맵이 원본의 모든 픽셀 값을 그대로 재현한다는 보장은 없습니다. 이 포맷은 약간의 이미지 충실도를 내어주고 PSRAM 사용량과 PSRAM 트래픽을 예측 가능하게 줄입니다.

손실 압축은 제약이 큰 임베디드 디스플레이 시스템에서 합리적인 절충인 경우가 많지만, 제품 차원의 결정 사항입니다. 일반적인 테스트 이미지로 화질을 판단하지 말고, 대상 패널 해상도, 색 깊이, 시청 거리, 리프레시 동작에서 실제 화면을 평가하십시오.

## 프레임버퍼 측정 템플릿 { #framebuffer-compression-comparison-placeholder }

이 절에는 대표적인 디스플레이 해상도 하나와 SDK 구성 하나에 대해 측정한 TurboPixel 결과를 기록하십시오. eZip 파일 크기 비교와 달리 이 비교는 **프레임버퍼 할당과 PSRAM 트래픽**에 대한 것입니다. TurboPixel은 소스 에셋 파일이 아니라 렌더링 이후에 동작하기 때문입니다.

불투명 화면과 알파 블렌딩된 화면을 모두 포함하십시오. 알파 블렌딩은 보통 TurboPixel 이전에, 렌더러가 전경 픽셀과 배경 픽셀을 최종 프레임버퍼로 합성할 때 일어납니다. 반투명 아이콘, 텍스트, 그림자 또는 레이어가 있는 화면도 불투명한 RGB565 최종 프레임버퍼를 만들 수 있습니다. 소스 에셋에 알파가 있다는 사실을 압축 프레임버퍼에 알파 채널이 있다는 뜻으로 취급하지 말고 이 차이를 기록하십시오.

<div align="center"><em>대표적인 TurboPixel 프레임버퍼 측정 템플릿</em></div>

<div align="center" markdown>

| 시나리오 | 소스 / 레이어 알파 | 최종 프레임버퍼 포맷 및 알파 상태 | 비압축 할당 / 트래픽 | TurboPixel 할당 / 트래픽 | 비압축 대비 | 테스트 설정 / 시각적 결과 |
|:---|:---|:---|---:|---:|---:|:---|
| 불투명 UI | 없음 | TBD, 불투명 | TBD | TBD | TBD | 해상도: TBD; 리프레시 정책: TBD; TurboPixel 비율/구성: TBD |
| 알파 블렌딩 UI, 출력 전에 합성 | 소스 레이어의 픽셀별 및/또는 전역 알파 | TBD, 합성 후에는 일반적으로 불투명 | TBD | TBD | TBD | 블렌딩된 콘텐츠 기록: TBD; 가장자리, 그림자, 그라데이션, 텍스트 아티팩트 확인 |
| 알파를 유지하는 출력 경로(지원되는 경우) | 최종 버퍼까지 알파 유지 | TBD | TBD | TBD | TBD | 테스트 전에 정확한 칩, SDK, 포맷, 디스플레이 경로를 확인 |

</div>

유효한 TurboPixel 경로마다 **비압축 대비**를 `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`로 계산하십시오. 예상 할당 크기는 해당 고정 비율을 따르지만, 정확한 비율, 지원 포맷, 정렬, 리프레시 정책, 측정된 PSRAM 트래픽은 선택한 칩의 문서, SDK, 대상 하드웨어 테스트에서 확인해야 합니다. 시각적 허용 여부는 따로 기록하십시오. 할당 비율이 고정되어 있다고 해서 불투명, 텍스트 위주, 그라데이션, 알파 블렌딩 콘텐츠에서 아티팩트가 동일하다는 보장은 없습니다.

## TurboPixel을 사용하는 이유 { #why-use-turbopixel }

### 프레임버퍼 저장 공간 줄이기 { #reduce-psram-capacity }

전체 프레임버퍼는 고해상도이거나 드로 버퍼가 여러 개일 때 PSRAM을 상당히 차지할 수 있습니다. TurboPixel은 압축된 최종 비트맵의 할당 크기를 줄여 주므로 UI 에셋, 오디오, 애플리케이션 데이터 또는 다른 서피스에 더 많은 메모리를 남길 수 있습니다.

해당 비트맵만이 아니라 최대 동시 사용 메모리를 기준으로 예산을 잡으십시오. 비압축 렌더 버퍼, 압축된 디스플레이 버퍼, 압축 작업 공간, 더블 버퍼링 복사본이 동시에 존재할 수 있습니다. 이들의 크기와 수명에 따라 전체 설계가 실제로 PSRAM을 덜 필요로 하는지가 결정됩니다.

### 디스플레이 읽기 트래픽 줄이기 { #reduce-psram-bandwidth }

디스플레이 컨트롤러는 압축 해제 전에 압축된 프레임버퍼에서 더 적은 바이트를 읽으므로, 디스플레이 읽기 트래픽과 CPU, ePicasso, DMA, 오디오, 무선 동작과의 경합이 줄어듭니다.

다만 이것이 총 메모리 트래픽 절감량은 아닙니다. 렌더링은 여전히 픽셀을 쓰고, 압축은 입력을 읽고 출력을 씁니다. 이러한 전송과 디스플레이 읽기와의 중첩을 측정하십시오. 자주 다시 그려지는 화면에서는 압축 오버헤드가 읽기 절감분을 상쇄할 수 있고, 반복해서 표시되는 프레임에서는 균형이 달라질 수 있습니다. 대역폭뿐 아니라 시스템 에너지도 측정하십시오.

### 예산을 예측 가능하게 만들기 { #make-budgeting-predictable }

픽셀 포맷과 압축 설정이 고정되어 있으면 콘텐츠가 바뀌어도 공칭 비율은 바뀌지 않습니다. SDK의 압축 행 크기 및 정렬 규칙을 사용해 버퍼를 할당한 다음, 모든 렌더, 압축, 디스플레이 읽기/쓰기를 대역폭 예산에 포함하십시오. 패널 전송 바이트는 따로 관리하십시오. TurboPixel은 패널 출력 전에 압축 해제되므로 해당 전송량을 자동으로 줄여 주지 않습니다.

## 화질과 통합 시 상충 관계 { #quality-and-integration-trade-offs }

TurboPixel은 전체 디스플레이 설계의 일부로 검증해야 합니다.

- 텍스트, 가는 선, 그라데이션, 아이콘, 사진, 애니메이션, 고대비 UI 요소에서 눈에 띄는 아티팩트가 있는지 테스트하십시오.
- 선택한 디바이스와 SDK가 지원하는 색 포맷, 버퍼 정렬, extDMA 경로, 디스플레이 컨트롤러 구성을 확인하십시오.
- 디스플레이, Bluetooth, 오디오, AI 워크로드를 함께 실행한 상태에서 프레임 시간, PSRAM 대역폭, UI 지연 시간, 전력을 측정하십시오.
- 브링업 중에는 화질 문제와 드라이버 문제를 분리할 수 있도록 비압축 경로를 사용할 수 있게 유지하십시오.
- 특정 UI에서 아티팩트가 보이지 않더라도 TurboPixel을 무손실로 소개하지 마십시오.

## SDK 통합 점검 { #sdk-integration-checks }

참조된 extDMA 가이드는 공칭 압축 레벨 10개를 나열하지만, 참조된 SDK 크기 산정 구현은 레벨 1, 2, 3을 지원합니다. 문서화된 모든 레벨을 빌드에서 사용할 수 있다고 가정하지 마십시오. 선택한 설정을 검증하고 그에 맞는 행 크기 계산을 사용하십시오. 지원되지 않는 값은 헬퍼에서 다른 설정으로 폴백될 수 있습니다.

extDMA 가이드는 RGB565, RGB888, ARGB8888 입력을 나열합니다. 입력 지원만으로는 알파를 유지하는 압축 디스플레이 경로가 보장되지 않습니다. 전용 레이어 0 압축 해제 레지스터가 없는 LCDC 브랜치는 압축 레이어에 RGB565/RGB888을 받아들입니다. 선택한 칩이 사용하는 브랜치를 확인하십시오. 참조된 LCDC 드라이버에서는 `HAL_LCDC_LayerSetCmpr` 함수를 통해 레이어 0에서 압축이 활성화됩니다.

현재 OpenSiFli LCDC 헤더는 `HAL_EXTDMA_MODULE_ENABLED`가 활성화된 경우에만 압축 레이어 지원 매크로를 정의하며, 제품군 가드는 SF32LB52x와 SF32LB57x를 제외합니다. 이 헤더는 압축 레이어의 최대 폭을 SF32LB55x/SF32LB56x에서는 512 픽셀, SF32LB58x에서는 1024 픽셀로 정의합니다. 이는 압축 레이어의 통합 한계이며 모든 패널에 적용되는 해상도 한계가 아닙니다. 소스 주석에는 LCPU 경로가 활성화되지 않았다는 내용도 있습니다.

SF32LB55x에는 통합 시 주의 사항이 있습니다. 현재 OpenSiFli LCDC 헤더는 `HAL_EXTDMA_MODULE_ENABLED`가 활성화되면 압축 레이어 매크로를 정의하지만, 주석에는 LCPU 경로가 활성화되지 않았다고 적혀 있습니다. 공개된 SDK LCDC 기능 표는 55x에서 압축 레이어 압축 해제를 지원하지 않는 것으로 표시하는 반면, SF32LB55x 데이터시트는 TurboPixel과 LCD 컨트롤러 압축 해제를 설명합니다. 컴파일 시점 매크로만으로는 전체 디스플레이 경로가 검증되었다는 증거가 되지 않습니다. 55x 지원은 조건부로 취급하고 정확한 SDK 리비전, 코어, 빌드 구성, 대상 하드웨어를 확인하십시오. 매크로만으로 런타임 지원을 추정하지 마십시오.

렌더러, extDMA, 디스플레이 컨트롤러의 버퍼 소유권을 분리하여 관리하십시오. 압축 전에는 렌더링을, 디스플레이 사용 전에는 압축을, 해당 버퍼를 재사용하기 전에는 디스플레이 사용 완료를 기다리십시오. 캐시 가능한 공유 메모리에서는 하드웨어가 읽기 전에 CPU가 쓴 입력을 clean하고, 더티 데이터가 하드웨어 출력을 덮어쓰지 않도록 대상 캐시 라인을 준비하며, 완료 후 CPU가 읽기 전에 invalidate하십시오. 캐시 라인 경계와 인접 데이터를 고려하십시오. 압축 완료는 패널 전송 완료와 같지 않습니다.

extDMA의 소스 주소, 대상 주소, 전송 길이는 4바이트로 정렬되어야 합니다. 선택한 SDK의 행 스트라이드, 청킹, 버퍼 크기 산정 규칙을 따르십시오. 원시 프레임 바이트를 공칭 비율로 나누는 것만으로는 충분하지 않습니다.

## SF32 제품군별 사용 가능 여부 { #availability-in-the-sf32-family }

TurboPixel은 다음 SF32 제품군에 대해 문서화되어 있습니다.

<div align="center"><em>문서화된 TurboPixel 사용 가능 여부</em></div>

<div align="center" markdown>

| SF32 제품군 | TurboPixel 상태 | 통합 배경 |
|:---|:---|:---|
| **SF32LB52x** | 사용 불가 | 비압축 프레임버퍼 또는 지원되는 다른 메모리/대역폭 전략을 사용하십시오. |
| **SF32LB55x** | 현재 소스에서는 조건부. 종단 간 지원은 확립되지 않음 | 현재 LCDC 헤더는 extDMA가 활성화되면 압축 레이어 기능을 노출하지만 LCPU 경로가 활성화되지 않았다고 명시하고 있으며, 공개된 기능 표는 55x를 지원 안 함으로 표시합니다. 정확한 코어, SDK 구성, 대상 하드웨어를 확인하십시오. |
| **SF32LB56x** | 문서화됨 | extDMA 고정 비율 손실 최종 프레임버퍼 압축과 디스플레이 컨트롤러 압축 해제. |
| **SF32LB57x** | 사용 불가 | 비압축 프레임버퍼 또는 지원되는 다른 메모리/대역폭 전략을 사용하십시오. |
| **SF32LB58x** | 문서화됨 | extDMA 고정 비율 손실 최종 프레임버퍼 압축과 디스플레이 컨트롤러 압축 해제. |
| **기타 SF32 제품군** | 디바이스별로 확인 | eZip, ePicasso 또는 PSRAM 유무로 TurboPixel 지원을 추정하지 마십시오. 정확한 칩 데이터시트, 레퍼런스 매뉴얼, SDK 릴리스, 디스플레이 드라이버를 확인하십시오. |

</div>

이 표는 제품군 수준에서 문서화된 사용 가능 여부를 기록한 것이며, 모든 패키지, 패널 인터페이스, 픽셀 포맷, SDK 버전, 보드 구성에 대한 보증이 아닙니다. 메모리나 대역폭에 대해 확약하기 전에 정확한 대상을 확인하십시오.

## 핵심 요약 { #key-takeaways }

- TurboPixel은 **고정 비율 손실** 최종 프레임버퍼 압축 포맷입니다.
- extDMA가 렌더링된 비트맵에서 TurboPixel을 생성하고, 디스플레이 컨트롤러가 패널 경로에서 이를 압축 해제합니다.
- 주된 목적은 **프레임버퍼 저장 공간**과 **디스플레이 읽기 트래픽**을 줄이는 것입니다. 전체 버퍼 및 전송 파이프라인에서 절감 효과를 확인하십시오.
- TurboPixel은 SF32LB55x, SF32LB56x, SF32LB58x에 대해 문서화되어 있습니다. 55x의 경우 현재 헤더는 extDMA가 활성화되면 압축 레이어 매크로를 노출하지만 LCPU 경로가 활성화되지 않았다고 명시하며, 공개된 기능 표는 55x를 지원 안 함으로 표시합니다. 조건부로 취급하고 전체 디스플레이 경로를 검증하십시오. 현재 소스는 SF32LB52x와 SF32LB57x를 제외하며, 그 밖의 대상은 개별적으로 확인하십시오.
- TurboPixel은 eZip을 보완합니다. eZip은 무손실 에셋 압축이고, TurboPixel은 최종 비트맵을 위한 손실 압축입니다.

## 주요 참고 자료 { #primary-references }

- [extDMA 가이드](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [압축 크기 산정 구현](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [extDMA API](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [LCDC 지원 가드](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [현재 OpenSiFli LCDC 압축 레이어 가드](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [생성된 SDK LCDC 기능 표](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [LCDC 레이어 구현](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- 제품 브리프: [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
