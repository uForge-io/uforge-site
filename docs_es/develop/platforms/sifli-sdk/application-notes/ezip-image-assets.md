---
icon: lucide/image-down
title: "Comprimir recursos gráficos con EZIP"
description: "Convierta recursos PNG a formatos EZIP y PIXEL, arrays en C para LVGL y flujos GZIP descomprimibles por hardware con SiFli-SDK."
tags: [Desarrollo, SiFli-SDK, Notas de aplicación, EZIP]
---

# Comprimir recursos gráficos con EZIP { #compress-graphics-assets-with-ezip }

Use la utilidad incluida en la rama del SDK de destino: `$SDK_ROOT/tools/png2ezip/ezip.exe`. Puede generar datos binarios EZIP/PIXEL o arrays en C para LVGL. Antes de convertir, compruebe la cabecera binaria y el formato de píxel, y elija el comando correspondiente. Si el hardware EZIP va a descomprimir la imagen, siga el procedimiento GZIP y la lista de comprobación de integración de las últimas secciones.

!!! note "Ámbito por familia"
    Las guías de cada familia son independientes. Para conocer las diferencias en los formatos de entrada o salida admitidos o en el comportamiento de la herramienta, consulte la guía de la familia de destino y use la utilidad incluida en su rama del SDK. No infiera la compatibilidad ni el comportamiento de una familia a partir de la guía de otra.

## Formatos de archivo { #1-file-formats }

Los cuatro primeros bytes del archivo binario generado forman una cabecera con codificación little-endian. Sus campos de bits son:

<div align="center" markdown>
<em>Tabla: campos de la cabecera binaria EZIP/PIXEL</em>

| Bits | Significado |
|:-----|:--------|
| [31:21] | Altura de la imagen |
| [20:10] | Anchura de la imagen |
| [9:5] | Reservado |
| [4:0] | Formato |

</div>

Los valores de formato son:

<div align="center" markdown>
<em>Tabla: valores de formato EZIP y PIXEL</em>

| Valor | Significado |
|:------|:--------|
| 1 | EZIP sin canal alfa |
| 2 | EZIP con canal alfa |
| 4 | PIXEL sin canal alfa |
| 5 | PIXEL con canal alfa |

</div>

PIXEL sin alfa admite RGB565 y RGB888. PIXEL con alfa admite ARGB565 y ARGB888. La herramienta elige la variante con o sin alfa según la imagen PNG de origen: si esta no tiene canal alfa, genera un formato sin alfa.

<div align="center" markdown>
<em>Tabla: campos de bits de los formatos de color PIXEL y ARGB</em>

| Formato | Campos de bits |
|:-------|:-----------|
| RGB565 | [15:11] rojo, [10:5] verde, [4:0] azul |
| RGB888 | [23:16] rojo, [15:8] verde, [7:0] azul |
| ARGB565 | [23:16] alfa, [15:11] rojo, [10:5] verde, [4:0] azul |
| ARGB888 | [31:24] alfa, [23:16] rojo, [15:8] verde, [7:0] azul |

</div>

Los campos de bits de todos los formatos de píxel anteriores se almacenan en orden de bytes little-endian.

## Convertir recursos PNG { #2-convert-png-assets }

Sustituya `png_filename.png` por el nombre del archivo de origen. El archivo generado se guarda en el directorio de la herramienta, salvo que el proceso de compilación cambie el directorio de trabajo.

### Binario PIXEL { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

La salida es `png_filename.bin`. Use RGB565 para obtener RGB565/ARGB565 y RGB888 para RGB888/ARGB888; la presencia de alfa depende del PNG de entrada.

### Binario EZIP { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

La salida es `png_filename.bin`, con el valor de formato de la cabecera establecido en EZIP.

### Array en C para LVGL, formato PIXEL { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

La salida es `png_filename.c`, ubicado en la sección `.ROM3_IMG.png_filename`. Un array generado suele tener esta forma:

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

### Array en C para LVGL, formato EZIP { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

La salida también es `png_filename.c` en `.ROM3_IMG.png_filename`. El array EZIP generado tiene la alineación necesaria para la descompresión por hardware:

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

## Generar un binario GZIP para EZIP por hardware { #3-generate-a-hardware-ezip-gzip-binary }

Para comprimir `file.bin` desde el directorio de la herramienta, use:

```bash
-gzip file.bin -length -noheader
```

La herramienta crea `file.bin.gz`. Sus cuatro primeros bytes contienen la longitud de los datos originales. Al descomprimir este flujo con el ejemplo EZIP por hardware, no pase esos cuatro bytes como entrada comprimida: use la longitud almacenada para reservar el búfer de salida y entregue el resto de los datos GZIP al descompresor de hardware.

Pase al descompresor EZIP por hardware, en una sola operación, el flujo GZIP completo que sigue al prefijo de longitud de cuatro bytes. Si un archivo grande supera el tamaño disponible en los búferes de entrada o salida, divida el archivo original en bloques (la guía de SiFli sugiere bloques de 10 KB), comprima cada bloque por separado y pase los datos GZIP de cada bloque al descompresor en orden.

## Lista de comprobación de integración { #integration-checklist }

Para cada recurso, conserve el PNG de origen, la línea de comandos, el formato de color/alfa, el archivo generado, la sección del enlazador, la configuración de pantalla de destino y la comprobación de renderizado en la placa. Si el recurso se guarda en Flash externa, coordine la sección y su ubicación en el sistema de archivos con [Uso de memoria Flash externa](external-flash.md).

## Fuentes oficiales { #official-sources }

- [Uso de la herramienta EZIP en SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [Uso de la herramienta EZIP en SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [Uso de la herramienta EZIP en SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [Uso de la herramienta EZIP en SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
