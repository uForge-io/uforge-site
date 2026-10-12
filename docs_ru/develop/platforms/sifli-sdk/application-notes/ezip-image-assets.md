---
icon: lucide/image-down
title: "Сжатие графических ресурсов с помощью EZIP"
description: "Преобразование PNG-ресурсов в форматы EZIP/PIXEL, C-массивы LVGL и потоки GZIP для аппаратной распаковки с помощью SiFli-SDK."
tags: [Разработка, SiFli-SDK, Практические руководства, EZIP]
---

# Сжатие графических ресурсов с помощью EZIP { #compress-graphics-assets-with-ezip }

Используйте утилиту из ветки SDK для целевого устройства: `$SDK_ROOT/tools/png2ezip/ezip.exe`. Она создаёт двоичные данные EZIP/PIXEL или C-массивы для LVGL. Перед преобразованием проверьте двоичный заголовок и формат пикселей, затем выберите соответствующую команду. Если изображение будет распаковывать аппаратный блок EZIP, следуйте приведённой ниже процедуре GZIP и заключительному списку проверок интеграции.

!!! note "Область применения по семействам"
    Это отдельные руководства для каждого семейства. Поддерживаемые форматы входных и выходных данных, а также поведение утилиты сверяйте с руководством для целевого семейства и используйте утилиту из соответствующей ветки SDK. Не делайте вывод о поддержке одного семейства по руководству для другого.

## Форматы файлов { #1-file-formats }

Первые четыре байта сформированного двоичного файла содержат заголовок в порядке байтов little-endian. Поля заголовка занимают следующие разряды:

<div align="center" markdown>

<em>Таблица: поля заголовка двоичных файлов EZIP/PIXEL</em>

| Биты | Назначение |
|:-----|:--------|
| [31:21] | Высота изображения |
| [20:10] | Ширина изображения |
| [9:5] | Зарезервировано |
| [4:0] | Формат |

</div>

Значения поля формата:

<div align="center" markdown>

<em>Таблица: значения форматов EZIP и PIXEL</em>

| Значение | Назначение |
|:------|:--------|
| 1 | EZIP без альфа-канала |
| 2 | EZIP с альфа-каналом |
| 4 | PIXEL без альфа-канала |
| 5 | PIXEL с альфа-каналом |

</div>

Форматы PIXEL без альфа-канала поддерживают RGB565 и RGB888, а форматы с альфа-каналом — ARGB565 и ARGB888. Утилита выбирает вариант с альфа-каналом или без него по исходному PNG: если в изображении нет альфа-канала, формируется формат без него.

<div align="center" markdown>

<em>Таблица: разряды цветовых форматов PIXEL и ARGB</em>

| Формат | Разряды |
|:-------|:-----------|
| RGB565 | [15:11] — красный, [10:5] — зелёный, [4:0] — синий |
| RGB888 | [23:16] — красный, [15:8] — зелёный, [7:0] — синий |
| ARGB565 | [23:16] — альфа-канал, [15:11] — красный, [10:5] — зелёный, [4:0] — синий |
| ARGB888 | [31:24] — альфа-канал, [23:16] — красный, [15:8] — зелёный, [7:0] — синий |

</div>

Битовые поля указанных выше форматов пикселей хранятся в порядке little-endian.

## Преобразование PNG-ресурсов { #2-convert-png-assets }

Замените `png_filename.png` именем исходного файла. Если процесс сборки не меняет рабочий каталог, результат будет сохранён в каталоге утилиты.

### Двоичный файл PIXEL { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

Результат — `png_filename.bin`. Укажите RGB565 для форматов RGB565/ARGB565 и RGB888 для RGB888/ARGB888. Наличие альфа-канала определяется исходным PNG.

### Двоичный файл EZIP { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

Результат — `png_filename.bin`; значение формата в заголовке соответствует EZIP.

### C-массив LVGL в формате PIXEL { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

Результат — файл `png_filename.c` в секции `.ROM3_IMG.png_filename`. Обычно сформированный массив имеет следующий вид:

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

### C-массив LVGL в формате EZIP { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

Результат — файл `png_filename.c` в секции `.ROM3_IMG.png_filename`. Сформированный массив EZIP выровнен для аппаратной распаковки:

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

## Создание GZIP-файла для аппаратной распаковки EZIP { #3-generate-a-hardware-ezip-gzip-binary }

Чтобы сжать `file.bin`, находящийся в каталоге утилиты, выполните:

```bash
-gzip file.bin -length -noheader
```

Утилита создаст `file.bin.gz`. В первых четырёх байтах записана длина исходных данных. При распаковке этого потока аппаратным EZIP не передавайте эти четыре байта как часть сжатого потока: используйте указанную длину для выделения выходного буфера, а аппаратному декомпрессору передайте оставшиеся данные GZIP.

Передавайте аппаратному декомпрессору EZIP весь поток GZIP после четырёхбайтового префикса длины за один вызов. Если большой файл не помещается в доступный входной или выходной буфер, разделите исходный файл на блоки (в руководстве SiFli предлагаются блоки по 10 KB), сожмите каждый блок отдельно и передавайте их содержимое декомпрессору по порядку.

## Проверка интеграции { #integration-checklist }

Для каждого ресурса сохраните исходный PNG, команду преобразования, формат цвета и альфа-канала, сформированный файл, секцию линковщика, конфигурацию целевого дисплея и результат проверки отображения на плате. Если ресурс хранится во внешней флеш-памяти, согласуйте секцию и размещение в файловой системе с руководством [Работа с внешней флеш-памятью](external-flash.md).

## Официальные источники { #official-sources }

- [Использование утилиты EZIP для SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [Использование утилиты EZIP для SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [Использование утилиты EZIP для SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [Использование утилиты EZIP для SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
