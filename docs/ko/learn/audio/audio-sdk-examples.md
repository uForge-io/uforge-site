---
icon: lucide/audio-lines
title: "오디오 SDK 예제"
description: "PDM 마이크 캡처, 녹음, 재생, 코덱, 스토리지, 믹싱에 맞는 SiFli-SDK 오디오 예제를 선택합니다."
tags:
  - 오디오
  - 예제
---

# 오디오 SDK 예제 { #audio-sdk-examples }

SiFli-SDK 오디오 예제는 전체 신호 경로를 위한 실용적인 출발점이며, 그대로 제품에 넣을 수 있는 펌웨어가 아닙니다. 마이크 캡처, 스피커 경로, 스토리지, 코덱, 다중 동시 스트림 중 설계에서 가장 어려운 부분을 이미 검증해 주는 예제를 선택하십시오. 그런 다음 수정하지 않은 예제를 대상 보드에서 먼저 동작시킨 뒤, 한 번에 하나의 서브시스템씩 변경하십시오.

이 페이지는 선별한 SiFli-SDK 오디오 예제를 엔지니어링 작업별로 묶어 소개합니다. 공식 [오디오 인덱스](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html)가 출발점입니다. 아래의 보드 타깃은 검토 시점에 링크된 SiFli 페이지가 명시적으로 나열한 것이며, 제품군 이름이 모든 보드나 SDK 릴리스에 대한 지원을 뜻하지는 않습니다. 빌드하기 전에 정확한 페이지와 대상 보드 파일을 확인하십시오.

## 적합한 예제로 시작하기 { #start-with-the-right-example }

<div align="center"><em>표: 엔지니어링 작업별 SiFli-SDK 오디오 예제</em></div>

<div align="center" markdown>

| 엔지니어링 목표 | 시작할 예제 | 검증되는 내용 | 공식 문서에 명시된 타깃과 제약 |
|:-----------------|:-----------|:---------------|:----------------------------|
| 디지털 마이크 2개 또는 4개에서 캡처 | [PDM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | PDM 캡처. 지원되는 처리 모드에서의 WAV 녹음 및 재생 | 현재 페이지에는 `sf32lb56-lcd_a128r12n1`만 나열되어 있습니다. PDM 배선과 핀 먹스를 확인하십시오. 핀 구성 캡션에는 보드 이름이 `f32lb56-lcd_a128r12n1`로 잘못 표기되어(맨 앞의 `s` 누락) 있으며, 빌드 명령에는 올바른 이름이 사용됩니다. |
| 아날로그 마이크 2개에서 캡처 | [Local Music Example for stereo speaker (dual ADC/DAC)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | 별도의 PCM 파일로 동시 캡처. 스피커 모니터링용으로 마이크 하나 선택 | SiFli 모듈 보드가 아닌 커스텀 SF32LB58x 보드. 아날로그 마이크 2개와 아날로그 스피커 2개가 필요합니다. |
| 기본적인 마이크-스피커 동작 검증 | [Record Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | 5초간 마이크 입력을 PCM 메모리 버퍼에 캡처한 뒤 자동 재생 | `eh-lb525`, `sf32lb52-lcd` 시리즈, `sf32lb56-lcd` 시리즈 또는 `sf32lb58-lcd` 시리즈. 스피커가 필요합니다. |
| 루트 파일 시스템의 프리셋 파일 재생 | [Local Music Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | 마운트된 FAT 루트 파티션에서 프리셋 `16k.wav` 재생. 용량에 맞으면 프리셋 MP3도 사용 가능 | `eh-lb525`, `sf32lb52-lcd` 시리즈, `sf32lb56-lcd` 시리즈 또는 `sf32lb58-lcd` 시리즈. FAT 루트 파티션과 스피커가 필요합니다. |
| SD 카드에서 음악 재생 | [MP3 Local Music Player](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | SD 카드의 `music` 디렉터리에서 MP3 또는 WAV 재생, 셸로 볼륨 제어 | `sf32lb52-lchspi-ulp`만 나열되어 있습니다. SPI1, FAT/MSD, 스피커가 필요하며, 길게 누르기 버튼 감지에는 외부 배터리가 필요합니다. |
| 무손실 오디오 녹음, 압축, 디코딩, 재생 | [FLAC Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | PCM 녹음과 FLAC 인코딩, 디코딩, 재생 | `sf32lb52-lcd`, `sf32lb56-lcd` 또는 `sf32lb58-lcd` 시리즈. FAT, `libFLAC`, 오디오 컴포넌트가 필요합니다. |
| 음성 오디오 녹음, 압축, 디코딩, 재생 | [Opus Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | 16 kHz 마이크 캡처, Opus 인코딩/디코딩, 스피커 재생 | `eh-lb525`만 나열되어 있습니다. FAT와 오디오 컴포넌트가 필요합니다. 아래의 예제별 스택 지침을 따르십시오. |
| 여러 로컬 트랙 믹싱 | [Three-Channel Audio Mixer Player (official page in Chinese)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | 로컬 파일 3개의 독립 디코딩, 필요한 경우 리샘플링, 믹스된 출력 | 현재 페이지에는 `sf32lb52-lcd_n16r8`과 `sf32lb56-lcd_n16r12n1`이 나열되어 있습니다. 예제의 파일 시스템 이미지와 샘플 파일을 사용하십시오. |

</div>

## 공통 출발점 { #shared-starting-point }

대부분의 예제는 같은 기준을 전제로 합니다. 보드 오디오 하드웨어가 존재하고 올바르게 라우팅되어 있어야 하며, 보드 구성이 필요한 오디오 블록을 활성화해야 하고, 선택한 예제가 빌드하려는 보드를 지원해야 합니다. 파일을 읽거나 쓰는 예제는 마운트된 파일 시스템도 필요합니다. 업스트림 페이지와 대상 보드 파일을 확인하지 않고 다른 예제의 보드 이름, 핀 할당, `menuconfig` 설정을 복사하지 마십시오.

!!! warning "기존 파일 시스템 데이터 보호"
    v2.5.1 Opus 샘플은 루트 파일 시스템 마운트에 실패하면 `dfs_mkfs()`를 호출합니다([소스](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). 명시적인 데이터 보존 정책 없이 이 자동 포맷 복구 방식을 제품에 복사하지 마십시오. 마운트 실패가 사용자 데이터를 지워도 된다는 허가는 아닙니다.

모든 예제에서 첫 번째 검증은 의도적으로 범위를 좁게 유지하십시오.

1. 지원되는 보드용으로 수정하지 않은 프로젝트를 빌드하고 플래시에 기록합니다.
2. 정상 동작이 확인된 오디오 하드웨어와 파일로 예상되는 캡처 또는 재생 동작을 확인합니다.
3. SDK 리비전, 보드 이름, 구성, 핀 할당, 시리얼 로그를 기록합니다.
4. 제품에 특화된 요소를 하나 변경한 뒤 같은 테스트를 반복합니다.

[오디오 개요](overview.md)는 이 샘플들의 배경이 되는 인터페이스와 시스템 선택을 설명합니다. 버퍼 소유권, 세션 해제, 디스플레이 또는 Bluetooth 워크로드와의 공존은 [Audio Server 및 버퍼링](audio-server-buffering.md)에서 이어서 확인하십시오.

## 디지털 마이크 캡처: PDM { #digital-microphone-capture-pdm }

제품에 아날로그 마이크 입력이 아닌 디지털 마이크 캡처가 필요하다면 PDM 예제를 사용하십시오. 공식 예제는 PDM 마이크 2개 또는 4개를 지원하지만, 녹음 파일과 재생 동작은 선택한 처리 모드에 따라 달라집니다. 문서화된 토폴로지는 마이크 2개에 `PDM1`의 왼쪽과 오른쪽 채널을 사용하고, `PDM2`를 추가해 4개로 확장합니다. PDM 인터페이스 하나가 최대 2개의 디지털 마이크를 지원할 수 있으므로 인터페이스 수가 곧 마이크 수는 아닙니다. 지원되는 구성은 대상 SoC의 인터페이스와 채널 매핑을 확인하여 판단하십시오.

현재 업스트림 페이지는 지원 보드로 `sf32lb56-lcd_a128r12n1`을 나열합니다. `pdm open pdm12 4 raw` 모드는 녹음 파일을 만들지 않고 데이터를 로그로 출력합니다. Anyka 처리 모드는 4개 마이크 모드를 포함해 모노 출력을 생성합니다. 입력이 4개라고 해서 4채널 출력 파일이 만들어지는 것은 아닙니다. 마이크 어레이의 기준으로 사용하기 전에 알고리즘 의존성과 출력 형식을 확인하십시오.

적용하기 전에 다음 네 가지 경계를 모두 확인하십시오.

- 선택한 칩과 보드가 필요한 PDM 신호를 제공합니다.
- 마이크 클럭, 데이터 라인, 전원, 그라운드가 마이크 데이터시트와 일치합니다.
- 드라이버가 시작되기 전에 보드 핀 먹스 구성이 PDM 기능을 할당합니다.
- 제품에 예제가 활성화하는 녹음/재생 서비스가 필요합니다. PDM 데이터를 캡처하는 것만으로는 이 서비스가 필요하지 않습니다.

업스트림 PDM 페이지는 현재 자체적으로 지원하는 보드 구성과 예제 핀 매핑을 문서화하고 있습니다. 이를 검증된 기준으로 취급하되, 그대로 이식된다고 가정하지 말고 대상 보드의 실제 배선으로 교체하십시오. [PDM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)을 참고하십시오.

## 아날로그 캡처와 기본 녹음/재생 { #analog-capture-and-basic-recordplayback }

**Record Example**은 마이크 입력을 캡처한 뒤 로컬에서 재생하는 경로를 가장 빠르게 검증할 수 있는 예제입니다. 5초 동안 PCM 메모리 버퍼에 녹음한 다음, 해당 버퍼를 스피커로 자동 재생합니다. 공식 페이지는 `eh-lb525`, `sf32lb52-lcd` 시리즈, `sf32lb56-lcd` 시리즈, `sf32lb58-lcd` 시리즈를 나열합니다. 파일 시스템, 압축, Bluetooth 전송, 다중 마이크를 추가하기 전에 이 예제로 시작하십시오.

**Local Music Example for stereo speaker**(dual ADC/DAC 예제)는 커스텀 SF32LB58x 보드를 위한 특수한 기준 예제입니다. 공식 페이지에 따르면 SiFli 모듈 보드에서는 동작하지 않으며 아날로그 마이크 2개와 아날로그 스피커 2개가 필요합니다. `mic2file` 명령은 두 마이크를 별도의 PCM 파일로 녹음하고, `mic2speaker 0` 또는 `mic2speaker 1`은 실시간 스피커 모니터링용 마이크를 선택합니다. 이 커스텀 아날로그 토폴로지가 제품과 일치할 때만 사용하고, 그렇지 않다면 더 단순한 Record Example로 시작하십시오.

어느 경로든 소프트웨어 기능을 조사하기 전에 무음 상태의 노이즈 플로어, 게인, 클리핑, 시작/정지 동작을 확인하십시오. 안정적인 PCM 캡처/재생 경로는 코덱, 파일, Bluetooth 작업의 기반입니다.

## 로컬 재생과 스토리지 { #local-playback-and-storage }

**Local Music Example**은 파일 기반 재생의 가장 작은 기준 예제입니다. 공식 페이지는 `eh-lb525`, `sf32lb52-lcd` 시리즈, `sf32lb56-lcd` 시리즈, `sf32lb58-lcd` 시리즈를 나열합니다. FAT 루트 파티션을 마운트하고 프리셋 `16k.wav` 파일을 재생합니다. 구성된 파일 시스템 용량에 들어맞는다면, 예제의 `disk/` 디렉터리에 둔 프리셋 MP3도 재생할 수 있습니다. 알림음, 내장 안내음, 로컬 스피커 경로의 초기 검증에 사용하십시오.

**MP3 Local Music Player**는 이동식 스토리지를 추가합니다. SD 카드의 `music` 디렉터리에서 MP3 또는 WAV 파일을 재생하고 셸 볼륨 제어를 제공합니다. 두 로컬 재생 예제 모두 파일 시스템이 필요하며, 이 예제는 추가로 SPI1과 SPI MSD 드라이버를 사용합니다. 문서화된 `sf32lb52-lchspi-ulp` 보드에서는 배터리를 연결하지 않으면 버튼 길게 누르기가 감지되지 않습니다. SD 카드 미디어가 제품의 일부라면 이 예제를 선택하십시오.

두 예제는 재생을 검증할 뿐 범용 미디어 플레이어 아키텍처를 보여 주지는 않습니다. 둘 중 하나를 사용자 대상 플레이어로 발전시키기 전에 파일 인덱싱, 손상된 미디어 처리, 재생 중단, 전원 상태 복구, UI 동작을 별도로 계획하십시오.

## FLAC 및 Opus 코덱 파이프라인 { #flac-and-opus-codec-pipelines }

**FLAC Example**은 무손실 전체 흐름을 다룹니다. 마이크에서 PCM을 녹음하고, FLAC으로 인코딩하고, 디코딩한 뒤 재생합니다. 공식 페이지는 `sf32lb52-lcd`, `sf32lb56-lcd`, `sf32lb58-lcd` 시리즈를 나열하며 FAT 파일 시스템, 오디오 컴포넌트, `libFLAC`가 필요합니다. 파일 기반 캡처 파이프라인을 테스트하거나 비압축 PCM과 저장 비용을 비교할 때 적합합니다.

**Opus Example**은 음성에 맞게 설계된 압축 오디오 경로를 다룹니다. 현재 업스트림 페이지에는 `eh-lb525`만 나열되어 있습니다. 16 kHz로 캡처하고 약 16 kbps로 10 ms 프레임을 처리한 뒤, 생성된 스트림을 디코딩하여 재생합니다. 문서는 선택한 인코더 모드에 따라 달라지는 스택 크기 요구 사항도 명시합니다. 이 예제를 기준으로 사용할 때는 해당 제약을 유지하십시오. 애플리케이션 작업을 추가한 뒤에도 기본 태스크 스택이 충분하다고 가정하지 마십시오.

공식 SiFli-SDK README는 예제별 스택 설정을 제시합니다. `opus_test()`가 `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))`를 호출할 때는 `OPUS_STACK_SIZE`를 20k로 사용하고, 이 강제 모드가 없을 때는 200k를 권장합니다. 이는 모든 Opus에 적용되는 요구 사항이 아닙니다. 적용하기 전에 빌드하는 SDK 리비전과 인코더 경로를 확인하고, 제품 워크로드에서 스택 최대 사용량(high-water)을 측정하여 태스크 스택 크기를 정하십시오.

두 샘플 모두 종단 간 Bluetooth 통화나 스트리밍 제품을 보여 주지는 않습니다. 먼저 로컬 인코딩과 디코딩을 검증한 다음, 측정된 지연 시간과 메모리 여유를 바탕으로 전송, 버퍼링, 세션 정책을 통합하십시오.

## 3채널 믹싱 { #three-channel-mixing }

**Three-Channel Audio Mixer Player**는 현재 `sf32lb52-lcd_n16r8`과 `sf32lb56-lcd_n16r12n1`에서 테스트된 것으로 나열되어 있습니다. 로컬 오디오 파일 3개를 읽고, 각 스트림을 디코딩하며, 필요한 경우 48 kHz가 아닌 입력을 리샘플링하고, 모노 PCM 스트림을 합쳐 결과를 재생합니다. 문서화된 샘플 세트는 MP3 파일 2개와 WAV 파일 1개로 구성됩니다. 임의의 파일이 포함되어 있다고 가정하지 말고 예제의 파일 시스템 이미지와 파일 이름을 사용하십시오.

검토한 믹서는 세 모노 샘플을 풀 게인으로 합산하지 않고, 합산한 뒤 3으로 나눕니다. 문서화된 실행 시간은 약 50초입니다. 이 게인 정책과 유한한 시연 시간을 제품의 믹싱 요구 사항과 구분하여 다루십시오.

이 예제는 어떤 소리가 겹칠 수 있는지 제품이 결정해야 하는 안내음, 효과음, 음악의 동시 재생을 위한 적절한 기준입니다. 그러나 완성된 오디오 정책은 아닙니다. 스트림 우선순위, 볼륨 제어, 클리핑 동작, 메모리 예산, 입력 파일이나 디코더가 데드라인을 놓칠 때의 처리를 정의하십시오. 이러한 런타임 경계를 명시하려면 [Audio Server와 버퍼링](audio-server-buffering.md)을 사용하십시오.

## 증거를 잃지 않고 예제 적용하기 { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>표: 오디오 예제의 제품 적용 점검 항목</em></div>

<div align="center" markdown>

| 경계 | 예제에서 유지할 것 | 제품에서 다시 검증할 것 |
|:---------|:----------------------|:----------------------------|
| 하드웨어 | 정상 동작이 확인된 보드 라우팅과 지원되는 주변 장치 경로 | 마이크 또는 스피커 부품, 게인, 전원 레일, 핀 먹스, 레이아웃, 양산 테스트 접근성 |
| 구성 | 최소한으로 활성화된 SDK 컴포넌트 | 제품에 실제로 필요한 메모리, 파일 시스템, 코덱, Audio Manager, 기능 플래그 |
| 오디오 데이터 | 샘플 형식과 정상 동작이 확인된 파일 | 샘플 레이트, 채널 수, 버퍼 크기, 지연 시간 목표, 오류 처리 |
| 런타임 동작 | 기본적인 캡처 또는 재생 시퀀스 | UI, Bluetooth, 스토리지, 저전력 전환, 복구, 해제의 동시 동작 |
| 증거 | 업스트림의 예상 동작 | 시리얼 로그, 캡처/재생 산출물, 측정된 전류, 반복 가능한 회귀 테스트 |

</div>

## 관련 자료 { #related-resources }

- 인터페이스, 세션 형태, 전력 고려 사항, 검증은 [오디오 개요](overview.md)를 참고하십시오.
- 스트림 소유권, DMA 버퍼, 제품 부하 테스트는 [Audio Server 및 버퍼링](audio-server-buffering.md)을 참고하십시오.
- 도메인을 아우르는 SDK 예제 카탈로그는 [예제](../../develop/examples/index.md)를 참고하십시오.
- 현재 공식 목록과 개별 설정 방법은 [SiFli-SDK 오디오 예제 색인](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html)을 참고하십시오.
