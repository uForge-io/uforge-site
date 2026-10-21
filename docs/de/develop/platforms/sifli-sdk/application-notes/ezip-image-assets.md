---
icon: lucide/image-down
title: "Grafikressourcen mit EZIP komprimieren"
description: "PNG-Assets mit SiFli-SDK in EZIP-, PIXEL-, LVGL-C- und hardware-dekomprimierbare GZIP-Formate konvertieren."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, EZIP]
---

# Grafikressourcen mit EZIP komprimieren { #compress-graphics-assets-with-ezip }

Verwenden Sie das Dienstprogramm aus dem SDK-Branch Ihres Ziels: `$SDK_ROOT/tools/png2ezip/ezip.exe`. Es erzeugt EZIP-/PIXEL-Binärdaten oder C-Arrays für LVGL. Prüfen Sie zuerst den Binärheader und das Pixelformat und wählen Sie dann den passenden Konvertierungsbefehl. Soll das Bild von der EZIP-Hardware dekomprimiert werden, folgen Sie dem GZIP-Ablauf und der Integrationscheckliste gegen Ende.

!!! note "Geltungsbereich nach Familie"
    Die Leitfäden für die einzelnen Familien sind voneinander unabhängig. Wenn sich die unterstützten Eingabe- oder Ausgabeformate oder das Verhalten des Tools unterscheiden, richten Sie sich nach dem Leitfaden für die Zielfamilie und verwenden Sie das mit Ihrem SDK-Branch ausgelieferte Dienstprogramm. Leiten Sie die Unterstützung oder das Verhalten einer Familie nicht aus dem Leitfaden einer anderen Familie ab.

## Dateiformate { #1-file-formats }

Die ersten vier Bytes einer erzeugten Binärdatei bilden einen Little-Endian-Header. Seine Bitfelder sind wie folgt aufgeteilt:

<div align="center" markdown>

<em>Tabelle: EZIP/PIXEL-Binär-Header-Felder</em>

| Bits | Bedeutung |
|:-----|:--------|
| [31:21] | Bildhöhe |
| [20:10] | Bildbreite |
| [9:5] | Reserviert |
| [4:0] | Format |

</div>

Die Formatwerte lauten:

<div align="center" markdown>

<em>Tabelle: EZIP- und PIXEL-Formatwerte</em>

| Wert | Bedeutung |
|:------|:--------|
| 1 | EZIP ohne Alpha |
| 2 | EZIP mit Alpha |
| 4 | PIXEL ohne Alpha |
| 5 | PIXEL mit Alpha |

</div>

PIXEL ohne Alpha unterstützt RGB565 und RGB888. PIXEL mit Alpha unterstützt ARGB565 und ARGB888. Das Tool wählt die Alpha-/Nicht-Alpha-Variante anhand des Quell-PNG aus: Ein Bild ohne Alpha erzeugt ein Format ohne Alpha.

<div align="center" markdown>

<em>Tabelle: PIXEL- und ARGB-Farbformat-Bitfelder</em>

| Format | Bitfelder |
|:-------|:-----------|
| RGB565 | [15:11] Rot, [10:5] Grün, [4:0] Blau |
| RGB888 | [23:16] Rot, [15:8] Grün, [7:0] Blau |
| ARGB565 | [23:16] Alpha, [15:11] Rot, [10:5] Grün, [4:0] Blau |
| ARGB888 | [31:24] Alpha, [23:16] Rot, [15:8] Grün, [7:0] Blau |

</div>

Die Bitfelder aller oben aufgeführten Pixelformate werden in Little-Endian-Reihenfolge gespeichert.

## PNG-Assets konvertieren { #2-convert-png-assets }

Ersetzen Sie `png_filename.png` durch den Namen der Quelldatei. Die erzeugte Datei wird im Tool-Verzeichnis abgelegt, sofern der umgebende Build das Arbeitsverzeichnis nicht ändert.

### PIXEL-Binärdatei { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

Die Ausgabe heißt `png_filename.bin`. Verwenden Sie RGB565 für RGB565-/ARGB565-Ausgaben und RGB888 für RGB888-/ARGB888-Ausgaben. Ob Alpha enthalten ist, richtet sich nach dem Eingabe-PNG.

### EZIP-Binärdatei { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

Die Ausgabe ist `png_filename.bin`, wobei der Formatwert im Header auf EZIP gesetzt ist.

### PIXEL-LVGL-C-Array { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

Die Ausgabe ist `png_filename.c`, abgelegt in der Sektion `.ROM3_IMG.png_filename`. Ein typisches erzeugtes Array hat diese Form:

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

### EZIP-LVGL-C-Array { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

Die Ausgabe ist ebenfalls `png_filename.c` in der Sektion `.ROM3_IMG.png_filename`. Das erzeugte EZIP-Array ist für die Hardware-Dekompression ausgerichtet:

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

## Eine GZIP-Datei für die EZIP-Hardwaredekomprimierung erzeugen { #3-generate-a-hardware-ezip-gzip-binary }

Verwenden Sie zum Komprimieren von `file.bin` im Tool-Verzeichnis:

```bash
-gzip file.bin -length -noheader
```

Das Tool erzeugt `file.bin.gz`. Dessen erste vier Bytes enthalten die Länge der Originaldaten. Wenn das Hardware-EZIP-Beispiel diesen Stream dekomprimiert, übergeben Sie diese vier Bytes nicht als komprimierte Eingabe. Reservieren Sie anhand der gespeicherten Länge Speicher für den Ausgabepuffer und übergeben Sie die verbleibenden GZIP-Daten an den Hardware-Dekompressor.

Übergeben Sie dem EZIP-Hardwaredekompressor in einem Aufruf den vollständigen GZIP-Datenstrom hinter dem vier Byte langen Längenpräfix. Würde eine große Eingabe den verfügbaren Eingabe- oder Ausgabepuffer überschreiten, teilen Sie die Originaldatei in Blöcke auf (der Quellleitfaden empfiehlt 10-KB-Blöcke), komprimieren Sie jeden Block einzeln und übergeben Sie die GZIP-Daten der Blöcke der Reihe nach an den Dekompressor.

## Integrations-Checkliste { #integration-checklist }

Bewahren Sie für jedes Asset das Original-PNG, die Befehlszeile, das Farb-/Alpha-Format, die erzeugte Datei, den Linker-Abschnitt, die Display-Konfiguration des Zielsystems und einen Darstellungstest auf dem Zielboard auf. Wird das Asset im externen Flash gespeichert, stimmen Sie Abschnitt und Dateisystemplatzierung mit [Externen Flash verwenden](external-flash.md) ab.

## Offizielle Quellen { #official-sources }

- [SF32LB52x: EZIP-Konvertierungstool verwenden](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [SF32LB55x: EZIP-Konvertierungstool verwenden](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [SF32LB56x: EZIP-Konvertierungstool verwenden](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [SF32LB58x: EZIP-Konvertierungstool verwenden](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
