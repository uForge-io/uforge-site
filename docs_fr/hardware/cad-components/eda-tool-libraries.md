---
icon: lucide/library
description: "Les bibliothèques officielles de symboles de schéma et d'empreintes PCB de SiFli pour les puces et modules SF32 — JLCEDA/LCEDA Pro, PADS, OrCAD et KiCad — avec liens de téléchargement et liste de contrôle."
tags:
    - Matériel
    - EDA
    - Bibliothèque
---

# Bibliothèques d'outils EDA SF32 { #sf32-eda-tool-libraries }

## Objectif { #purpose }

SiFli publie des bibliothèques de symboles de schéma et d'empreintes PCB pour la famille de puces et modules SF32. Utilisez ces fichiers comme point de départ pour la saisie des schémas et la conception du PCB, plutôt que de redessiner à la main les symboles, le brochage et la géométrie des pastilles à partir de la fiche technique.

Ces bibliothèques réduisent les risques d'erreur lors de la mise en service, mais elles ne remplacent pas la fiche technique, le plan de boîtier ni le guide de conception matérielle de la puce ou du module concerné. Avant de valider la conception, comparez toujours le composant de bibliothèque sélectionné à la référence exacte, au boîtier, au brochage, à la géométrie des pastilles et aux recommandations de conception du PCB propres au composant.

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[Bibliothèque JLCEDA / LCEDA Pro - télécharger le projet `.epro2`](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[Bibliothèque PADS - télécharger le `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[Bibliothèque OrCAD - télécharger le `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[Bibliothèque KiCad - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "Source"
    Les liens directs proviennent de la [liste de téléchargements du wiki SiFli](https://wiki.sifli.com/hardware/index.html). Si un lien change, consultez cette page pour trouver le fichier de remplacement.

## Aperçu des formats de bibliothèque { #library-format-at-a-glance }

<div align="center"><em>Résumé des formats de bibliothèque</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Outil EDA | Fichier | Format | Contenu | Distribution |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | Archive de projet LCEDA Pro | Symboles de schéma et empreintes PCB | Téléchargement direct |
| PADS | `PADS-SIFLI-IC.ZIP` | Archive de bibliothèque Mentor/Siemens PADS | Symboles de schéma et empreintes PCB | Téléchargement direct |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Bibliothèque Cadence OrCAD Capture | Symboles de schéma | Téléchargement direct |
| KiCad | Archive ZIP d'une version ou métadonnées du package (`metadata.json`) | Bibliothèque de symboles, empreintes et modèles 3D KiCad | Symboles de schéma, empreintes PCB et modèles 3D | [Dépôt GitHub](https://github.com/OpenSiFli/kicad-libraries), versions publiées avec numéro de version |

</div>

JLCEDA / LCEDA Pro et PADS sont distribués sous forme d'archives ; OrCAD est un fichier de bibliothèque `.OLB` indépendant. L'index du wiki ne fournit pas de tableau de couverture par composant. Importez le fichier dans l'outil EDA prévu et vérifiez que le composant choisi y figure.

Le dépôt KiCad indiqué fournit les sources publiques, des versions publiées et un tableau des composants pris en charge. Cela facilite la vérification de la couverture, sans garantir que toutes les variantes SF32 soient incluses.

## Détail de la bibliothèque KiCad { #kicad-library-detail }

Le dépôt [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) fournit la bibliothèque officielle SiFli de symboles, d'empreintes et de modèles 3D pour KiCad sous licence CC-BY-SA-4.0. La [version `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0) a été vérifiée pour cette revue le 2026-10-05. Vérifiez si des versions plus récentes sont disponibles avant de commencer une conception.

<div align="center"><em>Couverture de la bibliothèque KiCad</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Référence | Boîtier | Symbole | Empreinte | Modèle 3D |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| Module SF32LB52-MOD-1 | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

Le tableau reprend le README du dépôt vérifié le 2026-10-05 ; il ne résulte pas d'un contrôle broche par broche de chaque version téléchargeable. Les groupes de puces désignés par des caractères génériques ne prouvent pas la prise en charge de chaque référence de commande. Vérifiez le symbole, l'empreinte et le boîtier choisis dans le fichier que vous installez.

!!! note "Comment lire les références indiquées dans le README KiCad"
    Le README de la bibliothèque KiCad OpenSiFli répertorie les lignes de puces sous les formes `SF32LB52XUx` et `SF32LB52xUx`. Dans la nomenclature SiFli, le `X` majuscule sert de caractère générique pour les variantes alphabétiques alimentées par une source externe, et le `x` minuscule pour les variantes numériques alimentées par batterie. Cette page détaille ces lignes sous les groupes SF32LB52B/D/E/G/J et SF32LB520/3/5/7 utilisés ailleurs dans la documentation μForge.

Le README du dépôt [OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) indique que l'installation depuis le catalogue du Package and Content Manager n'est pas encore prise en charge. Pour l'installation manuelle, il décrit le téléchargement d'une archive ZIP de version puis le choix de **Install from file...** dans le gestionnaire. La page de la version `1.0.0` indique également qu'il est possible d'extraire son ZIP dans le répertoire des bibliothèques KiCad ou de l'installer via le gestionnaire avec `metadata.json`. Suivez les instructions fournies avec la version utilisée ; le README nomme les bibliothèques installées de symboles et d'empreintes `PCM_SiFli`.

## Liste de contrôle de revue { #review-checklist }

- [ ] Vérifiez la référence de bibliothèque et le suffixe de boîtier par rapport à la BOM avant de valider le schéma.
- [ ] Vérifiez les noms et numéros de broches du symbole par rapport à la fiche technique de la puce et au guide de conception matérielle spécifique au composant.
- [ ] Vérifiez la taille des pastilles de l'empreinte, le pas, l'encombrement de placement (courtyard), le traitement de la pastille exposée et le dégagement d'assemblage par rapport au plan de boîtier officiel.
- [ ] Considérez les modèles 3D uniquement comme des aides au placement et à l'ajustement mécanique ; ne les utilisez pas comme cotes de fabrication ou d'assemblage.
- [ ] Pour JLCEDA / LCEDA Pro, PADS et OrCAD, confirmez la couverture par composant après import ; l'index de téléchargement du wiki ne détaille pas la prise en charge de chaque composant.
- [ ] Vérifiez les mises à jour des bibliothèques avant de commencer une conception. Conservez avec le projet la version de l'archive ou du paquet vérifiée. SiFli peut mettre à jour les fichiers lorsque de nouveaux composants et modules sont qualifiés. Les mises à jour peuvent ajouter ou modifier des composants ; revérifiez donc toute version de remplacement avant de l'adopter.

## Pages associées { #related-pages }

- [Famille SF32](../../sf32-products/family/SF32_family.md)
- [Convention de nommage SF32](../../sf32-products/family/SF32_namingrule.md)
- [Liste de fournisseurs approuvés SF32](sifli-approved-vendor-list.md)
