---
icon: lucide/image-down
title: "Compress Graphics Assets with EZIP"
description: "Convert PNG assets to EZIP, PIXEL, LVGL C, and hardware-decompressible GZIP formats with SiFli-SDK."
tags: [Develop, SiFli-SDK, Application Notes, EZIP]
---

# Compress Graphics Assets with EZIP { #compress-graphics-assets-with-ezip }

Use the utility shipped with your target SDK branch: `$SDK_ROOT/tools/png2ezip/ezip.exe`. It can produce EZIP/PIXEL binary data or LVGL C arrays. Start by checking the binary header and pixel format, then choose the matching conversion command. If EZIP hardware will decompress the image, follow the GZIP procedure and integration checklist near the end.

!!! note "Family scope"
    These are separate family-specific guides. For differences in supported input, output, or tool behavior, follow the guide for your target family and the utility shipped with its SDK branch. Do not infer support for one family from another family's guide.

## File formats { #1-file-formats }

The first four bytes of a generated binary file are a little-endian header. The bit fields are:

<div align="center" markdown>

<em>Table: EZIP/PIXEL binary header fields</em>

| Bits | Meaning |
|:-----|:--------|
| [31:21] | Image height |
| [20:10] | Image width |
| [9:5] | Reserved |
| [4:0] | Format |

</div>

Format values are:

<div align="center" markdown>

<em>Table: EZIP and PIXEL format values</em>

| Value | Meaning |
|:------|:--------|
| 1 | EZIP without alpha |
| 2 | EZIP with alpha |
| 4 | PIXEL without alpha |
| 5 | PIXEL with alpha |

</div>

PIXEL without alpha supports RGB565 and RGB888. PIXEL with alpha supports ARGB565 and ARGB888. The tool selects the alpha/non-alpha variant from the source PNG: an image without alpha produces a format without alpha.

<div align="center" markdown>

<em>Table: PIXEL and ARGB color-format bit fields</em>

| Format | Bit fields |
|:-------|:-----------|
| RGB565 | [15:11] Red, [10:5] Green, [4:0] Blue |
| RGB888 | [23:16] Red, [15:8] Green, [7:0] Blue |
| ARGB565 | [23:16] Alpha, [15:11] Red, [10:5] Green, [4:0] Blue |
| ARGB888 | [31:24] Alpha, [23:16] Red, [15:8] Green, [7:0] Blue |

</div>

The pixel-format fields above are stored in little-endian order.

## Convert PNG assets { #2-convert-png-assets }

Replace `png_filename.png` with the source file name. The generated file is written in the tool directory unless the surrounding build changes the working directory.

### PIXEL binary { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

The output is `png_filename.bin`. Use RGB565 for RGB565/ARGB565 output and RGB888 for RGB888/ARGB888 output; alpha is selected from the input PNG.

### EZIP binary { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

The output is `png_filename.bin`, with the header format value set to EZIP.

### PIXEL LVGL C array { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

The output is `png_filename.c`, placed in the `.ROM3_IMG.png_filename` section. A typical generated array has this form:

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

### EZIP LVGL C array { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

The output is also `png_filename.c` in `.ROM3_IMG.png_filename`. The generated EZIP array is aligned for hardware decompression:

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

## Generate a hardware-EZIP GZIP binary { #3-generate-a-hardware-ezip-gzip-binary }

To compress `file.bin` in the tool directory, use:

```bash
-gzip file.bin -length -noheader
```

The tool creates `file.bin.gz`. Its first four bytes contain the original data length. When the hardware EZIP example decompresses this stream, do not pass those four bytes as compressed input; use the stored length to allocate the output buffer, then pass the remaining GZIP data to the hardware decompressor.

Pass the complete GZIP payload after the four-byte length prefix to the hardware EZIP decompressor in one operation. If a large input would exceed the available input or output buffer, split the original file into blocks (the source guide suggests 10 KB blocks), compress each block independently, and pass each block's payload to the decompressor in order.

## Integration checklist { #integration-checklist }

For each asset, retain the source PNG, command line, color/alpha format, generated file, linker section, target display configuration, and a rendering check on the target board. If the asset is stored in external Flash, coordinate its section and filesystem placement with [Use External Flash](external-flash.md).

## Official sources { #official-sources }

- [SF32LB52x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [SF32LB55x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [SF32LB56x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [SF32LB58x EZIP tool usage](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
