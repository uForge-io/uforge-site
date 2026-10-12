---
icon: lucide/layout-dashboard
title: "LVGL SDK 예제"
description: "UI 브링업, 위젯, 디자인 툴, 압축 에셋, 애니메이션, 미디어, 웨어러블 인터페이스에 맞는 SiFli-SDK LVGL 예제를 선택하는 방법을 안내합니다."
tags:
  - 그래픽
  - LVGL
  - 예제
---

# LVGL SDK 예제 { #lvgl-sdk-examples }

SiFli-SDK LVGL 예제는 디스플레이와 UI 경로를 테스트하기 위한 출발점이며, 서로 바꿔 쓸 수 있는 제품 템플릿이 아닙니다. 먼저 해당 버전의 데모로 기본적인 패널 및 입력 동작을 확립하십시오. 그런 다음 제품의 주요 통합 위험을 검증하는 예제를 선택하여 문서화된 보드 구성에서 수정 없이 실행하고, 한 번에 한 계층씩 교체하십시오. 예제를 동작하는 기준 구성으로 취급하기 전에 각 README의 검증 상태와 제약 사항을 확인하십시오.

이 가이드는 [SiFli-SDK LVGL 인덱스](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html)의 예제를 엔지니어링 목표별로 정리합니다. 현재 지원되는 보드, SDK 구성, 소스 경로, 에셋, 빌드 명령, 버전별 제약 사항은 공식 원본 페이지를 참고하십시오.

이 인덱스는 카탈로그이며 보드 호환성 매트릭스가 아닙니다. 지원 여부는 예제마다 다르며, 문서 URL에 제품군 이름이 있다고 해서 그 제품군의 지원이 입증되지는 않습니다. 각 예제 자체의 **Supported Boards** 절을 사용하십시오. 일반적인 빌드 명령이나 저장소의 빌드 매트릭스에 나열된 보드는 그것만으로 런타임 검증의 증거가 되지 않습니다. 이러한 출처가 서로 다를 경우 그 구분을 명확히 유지하고 정확한 SDK 리비전과 보드를 확인하십시오.

## 적절한 LVGL 기준 구성으로 시작하기 { #start-with-the-right-lvgl-baseline }

<div align="center"><em>표: 엔지니어링 작업별 SiFli-SDK LVGL 예제</em></div>

<div align="center" markdown>

| 엔지니어링 목표 | 시작점 | 확립할 수 있는 것 | 다음 단계로 넘어갈 시점 |
|:-----------------|:-----------|:----------------------------|:-------------|
| 표준 LVGL 애플리케이션 브링업 | **[LVGL v8 Demos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[LVGL v8 Official Examples](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[LVGL v9 Demo](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)**, 또는 **[LVGL v9 Official Examples](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | 선택한 LVGL 버전, 보드 디스플레이 드라이버, 렌더링 루프, 기본 위젯 | 실제 패널에서 디스플레이 플러시 경로와 입력 디바이스가 안정적일 때 |
| UI 디자인 워크플로 평가 | **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)**, 또는 **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** 예제 | 생성된 UI 코드가 SDK 프로젝트에 어떻게 들어맞는지 | 생성된 코드가 오류 없이 빌드되고 LVGL 버전이 프로젝트와 일치할 때 |
| 특정 UI 동작 프로토타이핑 | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)**, 또는 **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | 특정 상호작용, 위젯, 배치 또는 애니메이션 패턴 | 제품에 개별 시각 요소가 아니라 구성된 화면이 필요할 때 |
| 에셋, 애니메이션 또는 미디어 검증 | **[Dynamic eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Local Video File Playback](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)**, 또는 **[streaming_media](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | 더 풍부한 콘텐츠를 위한 스토리지, 디코딩, 렌더링, 리프레시 경로 | 에셋 크기, 메모리 배치, 업데이트 속도, 소비 전력을 대상 하드웨어에서 측정했고 제품의 한계 안에 들어올 때 |
| 알아볼 수 있는 end-to-end UI 구축 | **[Electronic Compass](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Games index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([Minesweeper README](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)), 또는 **[Watch Interface v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | 화면 흐름, 상호작용, 다기능 디스플레이 워크로드 | 제품별 데이터, 수명 주기 동작, 성능 한계로 데모 콘텐츠를 교체할 준비가 되었을 때 |

</div>

지원 대상 목록은 예제마다 다릅니다. v8 Demos README는 `eh-lb563`과 SF32LB52x, SF32LB56x, SF32LB58x LCD 시리즈를 나열합니다. v8 Official Examples README는 `sf32lb52-lchspi-ulp`와 이 세 LCD 시리즈를 나열합니다. v9 Demo README는 세 LCD 시리즈를 나열하며, 일반 빌드 지침에는 `eh-lb563`도 나오지만 이는 명시적인 **Supported Development Boards** 목록에 포함되어 있지 않습니다. v9 Official Examples README는 `sf32lb52-lchspi-ulp`와 세 LCD 시리즈를 나열합니다. 각 README의 명시적 목록을 문서화된 범위로 취급하고, 일반 빌드 예시만 보고 대상을 추가하지 마십시오.

## 먼저 통합 경계 확인하기 { #confirm-the-integration-boundary-first }

LVGL 예제를 적용하기 전에, 샘플이 이미 입증하는 계층과 제품 작업으로 남아 있는 계층을 구분하십시오.

<div align="center"><em>표: LVGL 예제 통합 경계</em></div>

<div align="center" markdown>

| 경계 | 예제가 확립할 수 있는 것 | 제품에서 여전히 확립해야 하는 것 |
|:---------|:--------------------------|:--------------------------------|
| 보드와 패널 | 알려진 SDK 보드 구성과 디스플레이 경로 | 정확한 패널, 터치 컨트롤러, 전원 시퀀스, 핀 먹스, 리셋 타이밍, 양산 테스트 경로 |
| LVGL | 버전별 초기화와 예제 UI 동작 | 제품의 화면 아키텍처, 이벤트 소유권, 메모리 제한, 업데이트 정책 |
| 에셋 | 지원되는 샘플 에셋 경로 | 에셋 포맷, 저장 크기, 로딩 시간, 캐시 정책, 라이선스, 실패 처리 |
| 렌더링 | 동작하는 드로우 및 플러시 루프 | 더티 영역 전략, 버퍼 수, 색상 포맷, DMA/캐시 처리, 부하 상태에서의 UI 반응성 |
| 애플리케이션 | 눈에 보이는 시연 동작 | 센서, Bluetooth, 스토리지, 시간 관리, 저전력 전환, 복구, 사용자 데이터 |

</div>

먼저 물리적 디스플레이, 패널 인터페이스, 기본 플러시 경로를 검증하십시오. LVGL 데모를 최종 그래픽 아키텍처가 준비되었다는 증거로 취급하기 전에 [그래픽 개요](overview.md)와 [디스플레이 컨트롤러](display-controller.md)를 참고하십시오.

## LVGL 버전을 신중하게 선택하기 { #choose-the-lvgl-version-deliberately }

공식 인덱스에는 LVGL v8과 LVGL v9 예제가 모두 포함되어 있습니다. 생성된 UI 프로젝트, 그 예제 기준 구성, SDK 구성을 같은 LVGL 메이저 버전으로 유지하십시오. 명시적인 포팅 검토 없이 한 메이저 버전의 생성된 화면이나 커스텀 위젯을 다른 버전에 옮겨 넣지 마십시오.

첫 보드 브링업에는 SDK 보드 구성이 이미 선택한 LVGL 버전과 일치하는 데모 또는 공식 예제 항목을 사용하십시오. 애플리케이션별 작업을 시작하기 전에 패널, 버퍼, 입력, 스케줄링 경로를 가장 깔끔하게 입증해 줍니다.

!!! warning "LVGL v8 SJPG 예제를 사용하기 전에 카드를 백업하십시오"
    v8 Official Examples 프로젝트에서 선택 사항인 TF 카드 SJPG 경로는 마운트에 실패하면 카드의 루트 영역에 대해 `dfs_mkfs()`를 호출하며, 이때 데이터가 지워질 수 있습니다. 해당 경로를 활성화하고 실행하기 전에 카드를 백업하고, 사용 중인 SDK 리비전의 코드를 확인하십시오. 이 경고를 모든 LVGL v8 또는 v9 예제로 일반화하지 말고, 각 프로젝트 자체의 마운트 및 포맷 동작을 확인하십시오.

## 생성된 UI: gui_guider, SquareLine, EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

팀에 화면 계층 구조, 스타일, 에셋을 만들어 줄 비주얼 에디터가 필요할 때 UI 디자인 툴 예제를 사용하십시오. 인덱스에는 **gui_guider**, **SquareLine**, **EEZ Studio** 예제가 포함되어 있습니다.

어떤 생성기를 쓰든, 출력을 제품에 가져오기 전에 코드 버전, 화면 해상도, 색 깊이, 에셋 경로, 콜백 소유권을 확인하십시오.

gui_guider와 EEZ Studio 소스 예제는 모두 LVGL v8을 지정합니다. SquareLine은 생성된 코드가 사용하는 기본 테마도 필요로 합니다. 생성된 하위 디렉터리를 빌드에 포함하고 문서화된 선택적 eZip 변환 단계를 따르십시오. 파일을 복사하는 것만으로는 충분하지 않습니다.

생성된 코드는 UI 구성을 가속하지만, 디스플레이 드라이버, 버퍼 계획, 입력 드라이버, 전력 정책, 통합 테스트를 대체하지는 않습니다. 다시 내보내기(re-export)를 해도 제품 변경 사항이 조용히 덮어쓰이지 않도록, 생성된 파일을 직접 작성한 애플리케이션 로직과 분리하십시오.

## 위젯과 상호작용 패턴 { #widget-and-interaction-patterns }

특정 UI 동작을 조사하려면 개별 기능에 초점을 맞춘 LVGL v8 샘플을 사용하십시오. 범위는 샘플마다 다르며, Multlist는 최소한의 위젯 테스트가 아니라 완전한 애플리케이션 프레임워크 데모입니다.

- **Basechart**는 데이터 계열을 플롯하고, **Baselabel**은 데이터 소스를 주기적으로 갱신되는 텍스트에 바인딩합니다.
- **Follow**는 중력으로 움직이는 아이콘 메뉴를, **Select**는 선택 상태를 보여 주며, **Sector**는 값을 이미지의 보이는 각도 섹터에 매핑합니다.
- **Imgarray**는 이미지 글리프로 숫자 표시부를 구성하고, **Imgbar**는 전경 이미지를 잘라 진행률을 표시합니다.
- **Mulroller**는 콜백 기반으로 커스터마이즈할 수 있는 휠 선택기이고, **Multroller**는 더 단순한 텍스트 항목 선택 롤러입니다.
- **Multlist**는 목록, 페이징, 전환, 리소스 캐싱, 페이지 수명 주기를 다루며, **Multslider**는 슬라이더의 노브에 값이나 짧은 레이블을 배치합니다.
- **Multanim**은 전환 효과를 보여 주며 일부는 GPU/VGLite 지원을 전제로 하고, **Timeline**은 공유 시간 축에서 애니메이션을 조율합니다.

이러한 개별 예제 전반에서 보드 지원이 균일하지는 않습니다. 예를 들어 Multanim과 Multlist의 명시적인 **Supported Boards** 목록은 `sf32lb52-lcd_n16r8`과 `sf32lb52-lchspi-ulp`를 나열하는 반면, 뒤쪽의 일반 빌드 지침은 더 넓은 52x/56x/58x 대상을 언급하며 `eh-lb563`을 빌드 예시로 사용합니다. 이러한 설명이 같은 지원 범위를 입증하는 것은 아닙니다. 해당 README와 현재 프로젝트 구성을 확인하고, 인덱스나 URL만 보고 다른 위젯의 호환성을 추론하지 마십시오.

제품에서 특정 컨트롤이 위험 요소일 때 이 중 하나를 사용하십시오. 처음 포팅은 작게 유지하십시오. 원본 컨트롤을 실행하고, 제품 데이터로 대체한 다음, 더 큰 화면에 추가하기 전에 재그리기 비용과 메모리 사용량을 측정하십시오. 시각적으로 단순한 컨트롤 여러 개를 조합해도 프레임버퍼, 리소스 읽기 대역폭, 입력 이벤트 스케줄링에 부담을 줄 수 있습니다.

## 에셋, 애니메이션, 미디어 워크로드 { #asset-animation-and-media-workloads }

Dynamic eZip 예제는 LVGL v8과 LVGL v9 모두에 제공됩니다. 널리 도입하기 전에 동적 압축 에셋 로딩을 검증하려면 애플리케이션과 일치하는 버전을 사용하십시오. [eZip 무손실 압축과 하드웨어 디코딩](ezip.md) 문서는 그래픽 파이프라인에서 에셋 압축의 역할을 설명합니다.

애니메이션 GIF/APNG 에셋에 대해 SiFli는 **Multimedia > AGIF** 아래에 [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html)과 [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html) 예제도 제공합니다. 각 README는 `eh-lb525`를 명시하며, 현재 [GCC 빌드 매트릭스](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)도 두 프로젝트 경로를 `devkit_lcd_boards` 아래에 등록합니다. 매트릭스 등록은 빌드 대상을 나타낼 뿐이며, 해당 그룹의 모든 보드에 대한 런타임 검증을 의미하지 않습니다. 어느 예제든 제품 기준 구성으로 사용하기 전에 정확한 대상과 SDK 리비전을 확인하십시오.

Dynamic-eZip 샘플은 파일 경로 접근과 SRAM 또는 PSRAM으로의 사전 로딩을 비교합니다. 사전 로딩은 추가 메모리를 사용하며 반복적인 파일 읽기를 줄일 수 있습니다. 에셋을 LVGL v8/v9에 맞추십시오. 문서화된 v9 경로는 v8과 달리 `A:/` 같은 드라이브 접두사를 요구합니다. 실제 스토리지 백엔드와 드라이브 문자 구성을 확인하십시오. v9 README는 `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi`, `sf32lb58-lcd_n16r32n1_qspi`를 명시적으로 나열합니다. 이 목록을 v8에 옮겨 적용하거나 다른 보드의 지원을 추론하지 마십시오. SF32LB57에만 해당하는 사항으로, eZip 문서는 `-winsize 2048` 변환 옵션을 요구합니다.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [로컬 비디오 재생](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html), [스트리밍 미디어](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)는 서로 다른 콘텐츠 경로를 다루며, 복잡도의 고정된 순위를 나타내지 않습니다. Lottie README는 이 예제를 **unverified**로 표시하고 `eh-lb563`과 SF32LB52x/SF32LB56x 시리즈를 나열하며, 현재 GCC 빌드 매트릭스에서는 해당 프로젝트 항목이 주석 처리되어 있습니다. 이 보드 목록은 검증된 대상 집합이 아니라 검증되지 않은 문서로 취급하십시오. 로컬 비디오 README는 `eh-lb523`과 `sf32lb52-lcd_n16r8`을 명시적으로 나열하지만 더 넓은 일반 빌드 지침도 포함하며, 현재 GCC 빌드 매트릭스에서는 해당 프로젝트 항목이 주석 처리되어 있습니다. 다른 대상에 대해 어느 설명이든 의존하기 전에 정확한 SDK 체크아웃을 확인하십시오. 이 샘플은 `disk/video_example.mp4`의 H.264 비디오를 재생하며, TF 카드가 정상적으로 마운트되면 카드 루트의 `video_example.mp4`를 먼저 읽습니다. 스트리밍 README는 `sf32lb52-lchspi-ulp`만 나열하며, 휴대폰의 Bluetooth PAN 테더링을 통해 네트워크에 접속하고 FFmpeg을 사용합니다. BLE 비디오 스트리밍 예제가 아닙니다.

각각을 시스템 워크로드로 평가하십시오. Bluetooth, 센서, 의도한 디스플레이 인터페이스가 활성 상태일 때 리소스 또는 스트림 저장, 디코딩 시간, 프레임 업데이트 속도, PSRAM/SRAM 사용량, 디스플레이 대역폭, 소비 전류를 측정하십시오. 실제 비용은 리소스 복잡도, 해상도, 디코더 구성, 버퍼링에 따라 결정됩니다.

부드러운 짧은 데모를 그 경로가 장시간 애니메이션을 유지할 수 있다는 증거로 취급하지 마십시오. 제품을 검증할 때는 현실적인 콘텐츠 길이와 실제 패널 리프레시 정책을 사용하십시오.

## 폰트와 런타임 언어 전환 { #fonts-and-runtime-language-switching }

[FreeType 예제](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html)는 파일 시스템에서 TrueType 폰트를 로드하고 런타임에 폰트와 크기를 전환합니다. README에 따르면 `sf32lb52-lchspi-ulp`에서 검증되었으며, 다른 보드에는 `FS_REGION` 파티션과 충분한 시스템 힙이 필요하므로 예제로 검증된 것으로 취급하지 마십시오. 이 예제는 로딩 실패 시 내장 폰트로의 폴백, 힙 검사, 전환 시 이전 폰트 해제를 보여 줍니다. 실제 사용할 언어와 폰트 크기에서 글리프 범위와 힙 사용량을 확인하십시오. 큰 CJK 폰트는 전체 폰트가 들어간다고 가정하지 말고 서브셋으로 만드십시오. 문서화된 경로는 CFF 기반 OpenType 폰트가 아니라 TrueType 아웃라인을 요구합니다. 위젯이나 스타일이 아직 참조하는 폰트는 해제할 수 없으며, 폰트 변경은 LVGL 스레드에서 실행해야 합니다. 패키징된 폰트가 바뀌면 파일 시스템 이미지 `fs_root.bin`을 다시 빌드하여 플래시에 기록하십시오. 애플리케이션만 업데이트해서는 해당 파일이 갱신되지 않습니다.

[LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html)과 [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html)용 다국어 예제는 내장 언어, 외부 언어 팩 설치, 런타임 전환, 설치 디렉터리 재스캔, `share_prefs`를 통한 선택 언어 저장을 다룹니다. v8 README는 `sf32lb52-lchspi-ulp`를 나열하므로, 그 보드를 가정으로 옮겨 오지 말고 v9 README 자체의 대상 목록을 확인하십시오. JSON 또는 XLSX 입력은 내장 언어용 컴파일된 리소스나 외부 언어용 바이너리 팩을 생성합니다. 언어 간 번역 키를 일관되게 유지하고 폰트가 필요한 문자를 포함하는지 확인하십시오. 전환, 재시작 후 유지, 리소스 누락, 파일 시스템 업데이트 절차를 테스트하십시오. 기능 이름이 같다고 해서 동일하다고 가정하지 말고 각 버전에 문서화된 경로와 구성을 따르십시오.

## 컴퍼스, 게임, 워치 인터페이스 { #compass-games-and-watch-interfaces }

전자 컴퍼스와 워치 인터페이스 예제는 디스플레이 동작과 애플리케이션 수준의 고려 사항을 결합합니다. 화면 구성, 입력과 애니메이션 타이밍, 더 풍부한 디스플레이 워크로드의 영향을 살펴보는 데 사용하십시오. Games 인덱스는 Minesweeper 예제로 연결됩니다. 그 README는 `eh-lb563`과 SF32LB52x/SF32LB56x 시리즈를 나열하며 58x는 나열하지 않습니다. 58x에서 사용하기 전에 현재 SDK 체크아웃에서 지원 여부를 확인하십시오.

문서화된 컴퍼스 기준 구성은 `sf32lb52-lchspi-ulp`에서 I2C로 연결된 MMC56x3 3축 자력계를 사용합니다. 실제 제품에 대해 드라이버, 배선, 캘리브레이션을 확인하십시오. 표시된 방위만으로는 방향 정확도가 입증되지 않습니다.

게임과 워치 인터페이스 예제는 화면 흐름의 출발점으로 유용하지만, 제품은 여전히 데이터 소유권, 저전력 동작, 디스플레이 웨이크업 정책, 알림, 장애 복구를 정의해야 합니다.

v8 워치 README는 SF32LB52x, SF32LB56x, SF32LB58x LCD 시리즈와 `sf32lb52-lchspi-ulp`를 나열하고, v9 README는 세 LCD 시리즈를 나열합니다. 둘 다 `520-hdk`를 제외하며, 3D 회전 데모는 SF32LB55x에서 사용할 수 없다고 명시합니다. 폰트를 추가할 때는 리소스 파티션 크기를 확인하십시오. v8 예제는 할당된 폰트 영역이 넘칠 수 있습니다.

## 증거를 잃지 않고 예제 적용하기 { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>표: LVGL 예제의 제품 적용 점검</em></div>

<div align="center" markdown>

| 단계 | 보관할 증거 | 중요한 이유 |
|:-----|:-----------------|:---------------|
| 원본 빌드 | SDK 리비전, 보드 이름, 구성, 빌드 로그 | 검증된 기준 구성을 보존합니다. |
| 하드웨어에서 실행 | 사진/영상, 시리얼 로그, 패널 및 터치 동작 | 실제 디스플레이와 입력 경로를 확인합니다. |
| 제품 요소를 하나 추가 | 변경 기록, 측정한 프레임 레이트와 리프레시 동작 | 회귀의 원인을 특정할 수 있게 합니다. |
| 제품 부하 적용 | Bluetooth, 센서, 스토리지, 저전력 전환이 있을 때의 UI 반응성 | 독립 실행형 데모에는 없는 통합 한계를 찾아냅니다. |
| 최종 한계 기록 | 버퍼 사용량, 메모리 배치, 프레임 레이트, 전력, 알려진 장애 동작 | 예제를 유지 관리 가능한 엔지니어링 증거로 바꿔 줍니다. |

</div>

## 관련 자료 { #related-resources }

- 디스플레이 선택, 프레임버퍼 계획, LVGL 통합, 시스템 트레이드오프는 [그래픽 개요](overview.md)를 참고하십시오.
- 컨트롤러, 버퍼, 플러시 경로는 [디스플레이 컨트롤러](display-controller.md)를 참고하십시오.
- SF32 그래픽 가속 및 압축 기능은 [ePicasso 2D / 2.5D 그래픽 엔진](epicasso-gpu.md), [eZip 무손실 압축과 하드웨어 디코딩](ezip.md), [TurboPixel 프레임버퍼 압축](turbopixel.md)을 참고하십시오.
- 여러 분야에 걸친 SDK 예제 카탈로그는 [예제](../../develop/examples/index.md)를 참고하십시오.
- 현재 공식 목록과 설정 세부 사항은 [SiFli-SDK LVGL 예제 인덱스](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html)를 참고하십시오.
