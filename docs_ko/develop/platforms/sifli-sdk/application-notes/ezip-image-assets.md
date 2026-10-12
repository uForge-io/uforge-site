---
icon: lucide/image-down
title: "EZIP으로 그래픽 에셋 압축하기"
description: "SiFli-SDK를 사용하여 PNG 에셋을 EZIP, PIXEL, LVGL C, 하드웨어 압축 해제가 가능한 GZIP 형식으로 변환합니다."
tags: [Develop, SiFli-SDK, 애플리케이션 노트, EZIP]
---

# EZIP으로 그래픽 에셋 압축하기 { #compress-graphics-assets-with-ezip }

대상 SDK 브랜치와 함께 제공되는 유틸리티 `$SDK_ROOT/tools/png2ezip/ezip.exe`를 사용합니다. 이 유틸리티는 EZIP/PIXEL 바이너리 데이터 또는 LVGL C 배열을 생성할 수 있습니다. 먼저 바이너리 헤더와 픽셀 형식을 확인한 다음, 그에 맞는 변환 명령을 선택합니다. EZIP 하드웨어로 이미지의 압축을 해제하려면 끝부분의 GZIP 절차와 통합 체크리스트를 따르십시오.

!!! note "제품군 범위"
    이 가이드들은 제품군별로 나뉘어 있습니다. 지원되는 입력, 출력 또는 도구 동작이 다를 때는 대상 제품군의 가이드와 해당 SDK 브랜치에 포함된 유틸리티를 따르십시오. 한 제품군의 가이드를 근거로 다른 제품군의 지원 여부를 추정하지 마십시오.

## 파일 형식 { #1-file-formats }

생성된 바이너리 파일의 처음 네 바이트는 리틀 엔디언 헤더입니다. 비트 필드는 다음과 같습니다.

<div align="center" markdown>

<em>표: EZIP/PIXEL 바이너리 헤더 필드</em>

| 비트 | 의미 |
|:-----|:--------|
| [31:21] | 이미지 높이 |
| [20:10] | 이미지 너비 |
| [9:5] | 예약 |
| [4:0] | 형식 |

</div>

형식 값은 다음과 같습니다.

<div align="center" markdown>

<em>표: EZIP 및 PIXEL 형식 값</em>

| 값 | 의미 |
|:------|:--------|
| 1 | 알파 없는 EZIP |
| 2 | 알파 있는 EZIP |
| 4 | 알파 없는 PIXEL |
| 5 | 알파 있는 PIXEL |

</div>

알파 없는 PIXEL은 RGB565와 RGB888을 지원합니다. 알파 있는 PIXEL은 ARGB565와 ARGB888을 지원합니다. 도구는 원본 PNG를 보고 알파 유무에 해당하는 변형을 선택합니다. 알파가 없는 이미지는 알파 없는 형식을 생성합니다.

<div align="center" markdown>

<em>표: PIXEL 및 ARGB 색상 형식의 비트 필드</em>

| 형식 | 비트 필드 |
|:-------|:-----------|
| RGB565 | [15:11] Red, [10:5] Green, [4:0] Blue |
| RGB888 | [23:16] Red, [15:8] Green, [7:0] Blue |
| ARGB565 | [23:16] Alpha, [15:11] Red, [10:5] Green, [4:0] Blue |
| ARGB888 | [31:24] Alpha, [23:16] Red, [15:8] Green, [7:0] Blue |

</div>

위의 픽셀 형식 필드는 리틀 엔디언 순서로 저장됩니다.

## PNG 에셋 변환 { #2-convert-png-assets }

`png_filename.png`를 원본 파일 이름으로 바꾸십시오. 빌드 과정에서 작업 디렉터리를 바꾸지 않는 한, 생성된 파일은 도구 디렉터리에 기록됩니다.

### PIXEL 바이너리 { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

출력은 `png_filename.bin`입니다. RGB565/ARGB565 출력에는 RGB565를, RGB888/ARGB888 출력에는 RGB888을 사용합니다. 알파는 입력 PNG에 따라 선택됩니다.

### EZIP 바이너리 { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

출력은 `png_filename.bin`이며, 헤더의 형식 값이 EZIP으로 설정됩니다.

### PIXEL LVGL C 배열 { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

출력은 `png_filename.c`이며, `.ROM3_IMG.png_filename` 섹션에 배치됩니다. 일반적으로 생성되는 배열은 다음과 같은 형태입니다.

```c
#ifndef LV_ATTRIBUTE_MEM_ALIGN
#define LV_ATTRIBUTE_MEM_ALIGN
#endif

#ifndef LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A
#define LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A
#endif
#define LV_COLOR_DEPTH_RGB565A 3
#define LV_COLOR_16_SWAP_RGB565A 0
SECTION(".ROM3_IMG.png_filename")

const LV_ATTRIBUTE_MEM_ALIGN LV_ATTRIBUTE_IMG_eZIP_RGBARGB565A uint8_t png_filename_map[] = {
    ...
};
```

### EZIP LVGL C 배열 { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

출력은 마찬가지로 `.ROM3_IMG.png_filename` 섹션에 배치되는 `png_filename.c`입니다. 생성된 EZIP 배열은 하드웨어 압축 해제에 맞게 정렬됩니다.

```c
#ifndef LV_ATTRIBUTE_MEM_ALIGN
#define LV_ATTRIBUTE_MEM_ALIGN
#endif

SECTION(".ROM3_IMG.png_filename")

ALIGN(4)
const LV_ATTRIBUTE_MEM_ALIGN uint8_t png_filename_map[] = {
    ...
};
```

## 하드웨어 EZIP용 GZIP 바이너리 생성 { #3-generate-a-hardware-ezip-gzip-binary }

도구 디렉터리의 `file.bin`을 압축하려면 다음을 사용합니다.

```bash
-gzip file.bin -length -noheader
```

도구가 `file.bin.gz`를 생성하며, 이 파일의 처음 네 바이트에는 원본 데이터 길이가 들어 있습니다. 하드웨어 EZIP 예제로 이 스트림의 압축을 해제할 때는 이 네 바이트를 압축 입력으로 전달하지 마십시오. 저장된 길이로 출력 버퍼를 할당한 다음, 나머지 GZIP 데이터를 하드웨어 압축 해제기에 전달합니다.

네 바이트 길이 접두사 뒤의 GZIP 페이로드 전체를 한 번의 작업으로 하드웨어 EZIP 압축 해제기에 전달합니다. 큰 입력이 사용 가능한 입력 또는 출력 버퍼를 초과할 경우, 원본 파일을 블록으로 나누고(원본 가이드는 10 KB 블록을 제안합니다) 각 블록을 독립적으로 압축한 다음, 각 블록의 페이로드를 순서대로 압축 해제기에 전달합니다.

## 통합 체크리스트 { #integration-checklist }

에셋마다 원본 PNG, 명령줄, 색상/알파 형식, 생성된 파일, 링커 섹션, 대상 디스플레이 구성, 대상 보드에서의 렌더링 확인 결과를 보관합니다. 에셋을 외부 플래시에 저장하는 경우, 섹션과 파일 시스템 배치를 [외부 플래시 사용](external-flash.md)과 맞추십시오.

## 공식 출처 { #official-sources }

- [SF32LB52x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [SF32LB55x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [SF32LB56x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [SF32LB58x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
