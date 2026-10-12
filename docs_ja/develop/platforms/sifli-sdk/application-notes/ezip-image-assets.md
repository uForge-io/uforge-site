---
icon: lucide/image-down
title: "EZIPを使った画像アセットの圧縮"
description: "SiFli-SDKでPNGアセットをEZIP、PIXEL、LVGL C配列、ハードウェアで展開できるGZIP形式に変換します。"
tags: [開発, SiFli-SDK, アプリケーションノート, EZIP]
---

# EZIPを使った画像アセットの圧縮 { #compress-graphics-assets-with-ezip }

対象SDKブランチに同梱された`$SDK_ROOT/tools/png2ezip/ezip.exe`を使用します。PNGからEZIP/PIXELのバイナリーデータ、またはLVGL用のC配列を生成できます。まずバイナリーヘッダーとピクセル形式を確認し、対応する変換コマンドを選んでください。EZIPハードウェアで画像を展開する場合は、後半のGZIP手順と組み込みチェックリストに従います。

!!! note "対象ファミリー"
    各ファミリー向けのガイドは、それぞれ独立しています。入力・出力の対応状況やツールの動作に違いがある場合は、対象ファミリーのガイドと、そのSDKブランチに同梱されたツールを確認してください。別ファミリーのガイドを根拠に、対象ファミリーの対応状況や動作を推測しないでください。

## ファイル形式 { #1-file-formats }

生成されるバイナリーファイルの先頭4バイトは、リトルエンディアンのヘッダーです。ビットフィールドは次のとおりです。

<div align="center" markdown>
<em>表: EZIP/PIXELバイナリーヘッダーのフィールド</em>

| ビット | 意味 |
|:-----|:--------|
| [31:21] | 画像の高さ |
| [20:10] | 画像の幅 |
| [9:5] | 予約済み |
| [4:0] | 形式 |

</div>

形式値は次のとおりです。

<div align="center" markdown>
<em>表: EZIPおよびPIXELの形式値</em>

| 値 | 意味 |
|:------|:--------|
| 1 | アルファチャンネルなしのEZIP |
| 2 | アルファチャンネルありのEZIP |
| 4 | アルファチャンネルなしのPIXEL |
| 5 | アルファチャンネルありのPIXEL |

</div>

アルファチャンネルなしのPIXELはRGB565とRGB888に対応します。アルファチャンネルありのPIXELはARGB565とARGB888に対応します。ツールは入力PNGにアルファチャンネルがあるかどうかで、アルファあり／なしの形式を選択します。アルファチャンネルがない画像からは、アルファなしの形式が生成されます。

<div align="center" markdown>
<em>表: PIXELおよびARGBの色形式ビットフィールド</em>

| 形式 | ビットフィールド |
|:-------|:-----------|
| RGB565 | [15:11] 赤、[10:5] 緑、[4:0] 青 |
| RGB888 | [23:16] 赤、[15:8] 緑、[7:0] 青 |
| ARGB565 | [23:16] アルファ、[15:11] 赤、[10:5] 緑、[4:0] 青 |
| ARGB888 | [31:24] アルファ、[23:16] 赤、[15:8] 緑、[7:0] 青 |

</div>

上記の各ピクセル形式のビットフィールドは、すべてリトルエンディアンで格納されます。

## PNGアセットの変換 { #2-convert-png-assets }

`png_filename.png`を入力ファイル名に置き換えてください。ビルド処理側で作業ディレクトリを変更しない限り、生成ファイルはツールのディレクトリに出力されます。

### PIXELバイナリー { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

出力は`png_filename.bin`です。RGB565/ARGB565を出力する場合はRGB565、RGB888/ARGB888の場合はRGB888を指定します。アルファの有無は入力PNGによって決まります。

### EZIPバイナリー { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

出力は`png_filename.bin`で、ヘッダーの形式値はEZIPに設定されます。

### PIXELのLVGL C配列 { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

出力は`png_filename.c`で、`.ROM3_IMG.png_filename`セクションに配置されます。生成される配列の例を示します。

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

### EZIPのLVGL C配列 { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

こちらも出力は`.ROM3_IMG.png_filename`に配置される`png_filename.c`です。生成されるEZIP配列は、ハードウェア展開向けにアラインメントされています。

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

## ハードウェアEZIP展開用GZIPバイナリーの生成 { #3-generate-a-hardware-ezip-gzip-binary }

ツールのディレクトリにある`file.bin`を圧縮するには、次のコマンドを使います。

```bash
-gzip file.bin -length -noheader
```

ツールは`file.bin.gz`を生成します。先頭4バイトには、圧縮前のデータ長が格納されます。ハードウェアEZIPのサンプルでこのストリームを展開する際は、その4バイトを圧縮入力として渡さないでください。格納された長さを使って出力バッファーを確保し、残りのGZIPデータをハードウェアデコンプレッサーに渡します。

4バイトの長さフィールドに続くGZIPペイロード全体を、1回の操作でハードウェアEZIPデコンプレッサーに渡してください。入力または出力バッファーに収まらない大きな入力は、元ファイルをブロック（SiFliのガイドでは10 KB単位が提案されています）に分割して各ブロックを個別に圧縮し、各ブロックのペイロードを順番にデコンプレッサーへ渡します。

## 組み込み時の確認項目 { #integration-checklist }

各アセットについて、元のPNG、実行したコマンド、色／アルファ形式、生成ファイル、リンカーセクション、対象ディスプレイの設定、実機での描画確認を記録してください。アセットを外部Flashに格納する場合は、セクションとファイルシステム上の配置を[外付けFlashメモリーの使い方](external-flash.md)の内容と整合させてください。

## 公式資料 { #official-sources }

- [SF32LB52x EZIPツールの使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [SF32LB55x EZIPツールの使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [SF32LB56x EZIPツールの使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [SF32LB58x EZIPツールの使用方法](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
