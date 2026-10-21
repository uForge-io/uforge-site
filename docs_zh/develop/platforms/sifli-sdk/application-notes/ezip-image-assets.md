---
icon: lucide/image-down
title: "使用 EZIP 压缩图形资源"
description: "使用 SiFli-SDK 将 PNG 转换为 EZIP、PIXEL、LVGL C 和可由硬件解压的 GZIP 格式。"
tags: [开发, SiFli-SDK, 应用笔记, EZIP]
---

# 使用 EZIP 压缩图形资源 { #compress-graphics-assets-with-ezip }

请使用目标 SDK 分支随附的工具：`$SDK_ROOT/tools/png2ezip/ezip.exe`。它可以生成 EZIP/PIXEL 二进制数据，也可以生成供 LVGL 使用的 C 数组。开始转换前，先确认二进制文件头和像素格式，再选择对应的转换命令。如果要由 EZIP 硬件解压图像，请按文末的 GZIP 处理步骤和集成检查项操作。

!!! note "系列适用范围"
    这些是各系列独立的指南。若支持的输入、输出或工具行为存在差异，请以目标系列的指南和该 SDK 分支随附的工具为准，不要根据其他系列的指南推断某系列的支持情况。

## 文件格式 { #1-file-formats }

生成的二进制文件前 4 个字节是小端序（little-endian）文件头，位域如下：

<div align="center" markdown>

<em>表：EZIP/PIXEL 二进制文件头位域</em>

| 位域 | 含义 |
|:-----|:-----|
| [31:21] | 图片高度 |
| [20:10] | 图片宽度 |
| [9:5] | 保留 |
| [4:0] | 格式 |

</div>

格式取值如下：

<div align="center" markdown>

<em>表：EZIP 和 PIXEL 格式取值</em>

| 取值 | 含义 |
|:-----|:-----|
| 1 | 不含 Alpha 通道的 EZIP |
| 2 | 含 Alpha 通道的 EZIP |
| 4 | 不含 Alpha 通道的 PIXEL |
| 5 | 含 Alpha 通道的 PIXEL |

</div>

不含 Alpha 通道的 PIXEL 支持 RGB565 和 RGB888；含 Alpha 通道的 PIXEL 支持 ARGB565 和 ARGB888。工具会根据源 PNG 是否包含 Alpha 通道自动选择格式：输入图像不含 Alpha 通道时，生成格式也不含 Alpha 通道。

<div align="center" markdown>

<em>表：PIXEL 和 ARGB 颜色格式位域</em>

| 格式 | 位域 |
|:-----|:-----|
| RGB565 | [15:11] 红色，[10:5] 绿色，[4:0] 蓝色 |
| RGB888 | [23:16] 红色，[15:8] 绿色，[7:0] 蓝色 |
| ARGB565 | [23:16] Alpha 通道，[15:11] 红色，[10:5] 绿色，[4:0] 蓝色 |
| ARGB888 | [31:24] Alpha 通道，[23:16] 红色，[15:8] 绿色，[7:0] 蓝色 |

</div>

上表所列颜色格式的位域均按小端序存储。

## 转换 PNG 资源 { #2-convert-png-assets }

将 `png_filename.png` 替换为源文件名。除非外围构建流程改变了工作目录，否则生成文件会写入工具目录。

### PIXEL 二进制文件 { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

输出文件为 `png_filename.bin`。指定 RGB565 可生成 RGB565 / ARGB565，指定 RGB888 可生成 RGB888 / ARGB888；是否包含 Alpha 由输入 PNG 决定。

### EZIP 二进制文件 { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

输出文件为 `png_filename.bin`，文件头中的格式值为 EZIP。

### PIXEL 格式的 LVGL C 数组 { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

输出文件为 `png_filename.c`，位于 `.ROM3_IMG.png_filename` 段。典型生成数组如下：

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

### EZIP 格式的 LVGL C 数组 { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

输出同样为 `png_filename.c`，位于 `.ROM3_IMG.png_filename` 段。生成的 EZIP 数组按硬件解压要求对齐：

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

## 生成供硬件 EZIP 解压的 GZIP 二进制文件 { #3-generate-a-hardware-ezip-gzip-binary }

要压缩工具目录中的 `file.bin`，使用：

```bash
-gzip file.bin -length -noheader
```

工具会生成 `file.bin.gz`。文件前 4 个字节保存原始数据长度。使用硬件 EZIP 示例解压时，不要将这 4 个字节作为压缩输入传入；应根据该长度分配输出缓冲区，再将后续 GZIP 数据传给硬件解压器。

应将 4 字节长度前缀之后的完整 GZIP 数据一次性传给硬件 EZIP 解压器。如果大文件超出可用的输入或输出缓冲区，应先将原始文件分块（原指南建议按 10 KB 分块），每块单独压缩，再按顺序把各块的数据传给解压器。

## 集成检查清单 { #integration-checklist }

对每个资源，请保留源 PNG、命令行、颜色/Alpha 格式、生成文件、链接器段、目标显示配置以及开发板上的渲染检查结果。如果资源存放在外部 Flash 中，请与[使用外部 Flash](external-flash.md)一并规划段布局和文件系统位置。

## 官方来源 { #official-sources }

- [SF32LB52x EZIP 图片转换工具使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [SF32LB55x EZIP 图片转换工具使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [SF32LB56x EZIP 图片转换工具使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [SF32LB58x EZIP 图片转换工具使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
