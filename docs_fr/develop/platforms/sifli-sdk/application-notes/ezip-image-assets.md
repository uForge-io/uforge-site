---
icon: lucide/image-down
title: "Compresser les ressources graphiques avec EZIP"
description: "Convertir des ressources PNG en données binaires EZIP ou PIXEL, en tableaux C pour LVGL et en fichiers GZIP décompressibles par le matériel avec SiFli-SDK."
tags: [Développement, SiFli-SDK, Notes d'application, EZIP]
---

# Compresser les ressources graphiques avec EZIP { #compress-graphics-assets-with-ezip }

Utilisez l'utilitaire fourni avec la branche du SDK cible : `$SDK_ROOT/tools/png2ezip/ezip.exe`. Il génère des données binaires EZIP/PIXEL ou des tableaux C pour LVGL. Avant la conversion, vérifiez l'en-tête binaire et le format de pixel, puis choisissez la commande correspondante. Si l'image doit être décompressée par le matériel EZIP, suivez la procédure GZIP et la liste de contrôle d'intégration à la fin.

!!! note "Portée par famille"
    Il s'agit de guides distincts, propres à chaque famille. Pour connaître les différences de formats d'entrée et de sortie pris en charge ou de comportement de l'outil, suivez le guide correspondant à votre cible et utilisez l'outil fourni avec sa branche du SDK. Ne déduisez pas la prise en charge d'une famille à partir du guide d'une autre famille.

## Formats de fichier { #1-file-formats }

Les quatre premiers octets d'un fichier binaire généré forment un en-tête en little-endian. Les champs de bits sont :

<div align="center" markdown>

<em>Tableau : Champs de bits de l'en-tête binaire EZIP/PIXEL</em>

| Bits | Signification |
|:-----|:--------|
| [31:21] | Hauteur de l'image |
| [20:10] | Largeur de l'image |
| [9:5] | Réservé |
| [4:0] | Format |

</div>

Les valeurs de format sont :

<div align="center" markdown>

<em>Tableau : Valeurs de format EZIP et PIXEL</em>

| Valeur | Signification |
|:------|:--------|
| 1 | EZIP sans canal alpha |
| 2 | EZIP avec canal alpha |
| 4 | PIXEL sans canal alpha |
| 5 | PIXEL avec canal alpha |

</div>

PIXEL sans canal alpha prend en charge RGB565 et RGB888. PIXEL avec canal alpha prend en charge ARGB565 et ARGB888. L'outil sélectionne la variante avec ou sans canal alpha à partir du PNG source : une image sans canal alpha produit un format sans canal alpha.

<div align="center" markdown>

<em>Tableau : Champs de bits des formats de couleur PIXEL et ARGB</em>

| Format | Champs de bits |
|:-------|:-----------|
| RGB565 | [15:11] Rouge, [10:5] Vert, [4:0] Bleu |
| RGB888 | [23:16] Rouge, [15:8] Vert, [7:0] Bleu |
| ARGB565 | [23:16] Alpha, [15:11] Rouge, [10:5] Vert, [4:0] Bleu |
| ARGB888 | [31:24] Alpha, [23:16] Rouge, [15:8] Vert, [7:0] Bleu |

</div>

Les champs de bits associés aux formats de pixel ci-dessus sont stockés selon l'ordre little-endian.

## Convertir des ressources PNG { #2-convert-png-assets }

Remplacez `png_filename.png` par le nom du fichier source. Le fichier généré est écrit dans le répertoire de l'outil, sauf si la chaîne de compilation environnante modifie le répertoire de travail.

### Binaire PIXEL { #pixel-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 1
ezip -convert png_filename.png -rgb888 -binfile 1
```

La sortie est `png_filename.bin`. Utilisez RGB565 pour une sortie RGB565/ARGB565 et RGB888 pour une sortie RGB888/ARGB888 ; l'alpha est déterminé à partir du PNG d'entrée.

### Binaire EZIP { #ezip-binary }

```bash
ezip -convert png_filename.png -rgb565 -binfile 2
ezip -convert png_filename.png -rgb888 -binfile 2
```

La sortie est `png_filename.bin`, avec la valeur de format de l'en-tête réglée sur EZIP.

### Tableau C pour LVGL au format PIXEL { #pixel-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 1 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 1 -section ROM3_IMG
```

Le fichier généré est `png_filename.c` ; son tableau est placé dans la section `.ROM3_IMG.png_filename`. Un tableau généré typique a la forme suivante :

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

### Tableau C pour LVGL au format EZIP { #ezip-lvgl-c-array }

```bash
ezip -convert png_filename.png -rgb565 -cfile 2 -section ROM3_IMG
ezip -convert png_filename.png -rgb888 -cfile 2 -section ROM3_IMG
```

La sortie est également `png_filename.c` dans `.ROM3_IMG.png_filename`. Le tableau EZIP généré est aligné pour la décompression matérielle :

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

## Générer un binaire GZIP destiné à la décompression par le matériel EZIP { #3-generate-a-hardware-ezip-gzip-binary }

Pour compresser `file.bin` dans le répertoire de l'outil, utilisez :

```bash
-gzip file.bin -length -noheader
```

L'outil crée `file.bin.gz`. Ses quatre premiers octets contiennent la longueur des données d'origine. Lorsque l'exemple EZIP matériel décompresse ce flux, ne transmettez pas ces quatre octets comme entrée compressée ; utilisez la longueur stockée pour allouer le tampon de sortie, puis transmettez le reste des données GZIP au décompresseur matériel.

Transmettez en une seule fois au décompresseur EZIP matériel le flux GZIP complet qui suit le préfixe de longueur de quatre octets. Si une entrée volumineuse risque de dépasser le tampon d'entrée ou de sortie disponible, découpez le fichier d'origine en blocs (le guide SiFli suggère des blocs de 10 KB), compressez chaque bloc indépendamment, puis transmettez les données GZIP de chaque bloc au décompresseur dans l'ordre.

## Liste de contrôle d'intégration { #integration-checklist }

Pour chaque ressource, conservez le PNG source, la ligne de commande, le format couleur/alpha, le fichier généré, la section de l'éditeur de liens, la configuration d'affichage cible et une vérification de rendu sur la carte cible. Si la ressource est stockée en Flash externe, coordonnez sa section et son emplacement dans le système de fichiers avec [Utiliser une mémoire Flash externe](external-flash.md).

## Sources officielles { #official-sources }

- [Utilisation de l'outil EZIP sur SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/ezip_tool_usage.html)
- [Utilisation de l'outil EZIP sur SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/ezip_tool_usage.html)
- [Utilisation de l'outil EZIP sur SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/ezip_tool_usage.html)
- [Utilisation de l'outil EZIP sur SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/ezip_tool_usage.html)
