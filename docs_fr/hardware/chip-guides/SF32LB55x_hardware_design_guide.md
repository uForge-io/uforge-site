---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle du MCU SF32LB55x : alimentation, circuits d'horloge, adaptation RF, interfaces de stockage et d'affichage, et conseils de routage PCB."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB55x { #sf32lb55x-hardware-design-guide }

## 1. Introduction { #1-introduction }

Ce guide fournit des recommandations et des documents de référence pour les produits basés sur la famille de microcontrôleurs AIoT généralistes SF32LB55x. Il s'adresse aux ingénieurs matériels, aux concepteurs de PCB et aux développeurs de produits qui conçoivent des objets portables BLE, des appareils alimentés par batterie intégrant de nombreux capteurs, des appareils de surveillance de la santé et des systèmes connectés compacts.

Le guide couvre tout le processus de développement matériel : choix du boîtier, conception de l'alimentation, circuits d'horloge, routage RF, mémoire externe, interfaces d'affichage, sources de réveil, capteurs, audio, accès au débogage, routage PCB, validation et préparation à la fabrication. La mise en œuvre de ces recommandations contribue à réduire les risques liés au schéma et au routage, à préserver le fonctionnement basse consommation et à prendre en compte les exigences du SF32LB55x concernant le boîtier, l'alimentation, la mémoire, la RF et les interfaces.

Ce document suppose une compréhension de base de la conception matérielle embarquée et de la saisie de schémas. Il complète la fiche technique du SF32LB55x, le manuel utilisateur, la note d'application matérielle officielle, les conceptions de référence et la liste des fournisseurs approuvés de SiFli, qui restent la référence pour les spécifications électriques, le multiplexage des broches, les dimensions du boîtier, la qualification des composants et les limites de production.

SF32LB55x conserve une convention historique de suffixes. Pour connaître les interfaces disponibles, les capacités qui dépendent du boîtier et la configuration mémoire exacte, consultez la référence de commande complète et la documentation du boîtier ; ne vous fiez pas uniquement au suffixe.

## 2. Ressources de développement { #2-development-resources }

[Note d'application matérielle SF32LB55x]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Source de la note d'application matérielle SF32LB55x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[Fiche technique SF32LB55x]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[Manuel utilisateur SF32LB55x]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[Documentation du SDK SF32LB55x]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[Référence API SF32LB55x]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Présentation de la famille SF32]: ../../sf32-products/family/SF32_family.md
[Liste des fournisseurs approuvés SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB55x]__
- :fontawesome-brands-github: __[Source de la note d'application matérielle SF32LB55x]__
- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB55x]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur SF32LB55x]__
- :fontawesome-solid-book: __[Documentation du SDK SF32LB55x]__
- :fontawesome-solid-book-open: __[Référence API SF32LB55x]__
- :fontawesome-solid-microchip: __[Présentation de la famille SF32]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

## 3. Présentation du composant { #3-device-overview }

### 3.1. Architecture { #31-architecture }

SF32LB55x vise les produits AIoT basse consommation qui doivent rester réactifs aux actions de l'utilisateur tout en limitant leur consommation en veille et en sommeil. Il intègre un émetteur-récepteur Bluetooth 5.2 basse consommation, la gestion de l'alimentation et des interfaces mémoire et d'affichage. L'intégration matérielle doit couvrir le choix du boîtier, les rails du PMU, le mode de démarrage, les deux circuits à quartz, l'adaptation RF, la mémoire externe, le choix d'un affichage MIPI/SPI/MCU8080/JDI, les connexions GPADC et capteurs, l'audio Bluetooth externe, l'accès au débogage et au flashage, ainsi que l'étalonnage en production.

La connectivité de stockage comprend plusieurs interfaces QSPI, une interface OPI-PSRAM indépendante et la prise en charge SD/eMMC. La configuration de NOR Flash et de PSRAM intégrées au boîtier dépend de la référence exacte. Les interfaces mémoire et d'affichage dépendent également du boîtier. BGA145 prend en charge un canal OPI-PSRAM externe, contre deux pour BGA169. L'interface MIPI DSI à deux voies de données est disponible sur BGA145 et BGA169, pas sur QFN68L. Vérifiez le plan des broches et la configuration mémoire intégrée au boîtier de la référence exacte avant d'affecter les composants externes.

### 3.2. Variantes et boîtiers { #32-variants-and-packages }

<div align="center"><em>Tableau 3.2-1 : Options de boîtier</em></div>

<div align="center" markdown>

| Nom du boîtier | Taille | Pas des broches | Diamètre des billes |
| :--- | :--- | :--- | :--- |
| QFN68L | 7x7x0,75 mm | 0,35 mm | - |
| BGA145 | 7x7x0,94 mm | 0,5 mm | 0,25 mm |
| BGA169 | 7x7x0,94 mm | 0,5 mm | 0,25 mm |

</div>

Le SF32LB55x est proposé en boîtiers QFN68L, BGA145 et BGA169. Choisissez le boîtier tôt dans la conception, car les interfaces mémoire, le fan-out des broches, les exigences de fabrication du PCB et le nombre de GPIO disponibles varient selon le boîtier.

![Figure 3.2-1 : Répartition des broches du QFN68L](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-1 : Répartition des broches du QFN68L</em></div>

![Figure 3.2-2 : Répartition des broches du BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-2 : Répartition des broches du BGA145</em></div>

!!! warning "Anciens plans de billes BGA169"
    SiFli indique que SF32LB557V8N6 est en fin de vie (EOL). Son plan reste présenté pour vérifier les conceptions existantes, et non pour recommander ce composant dans un nouveau produit. SF32LB557VD3A6 utilise un autre plan BGA169 : D11, E9, K12, L11, L13 et M13 sont NC. Vérifiez le plan de la référence exacte ; des dimensions identiques ne garantissent pas la compatibilité des broches.

![Figure 3.2-3 : Répartition des broches du BGA169 SF32LB557V8N6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-3 : Répartition des broches du BGA169 SF32LB557V8N6</em></div>

![Figure 3.2-4 : Répartition des broches du BGA169 SF32LB557VD3A6](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-4 : Répartition des broches du BGA169 SF32LB557VD3A6</em></div>

### 3.3. Principales fonctionnalités matérielles { #33-major-hardware-features }

- Options de boîtier QFN68L, BGA145 et BGA169.
- Exigences de conception associées aux quartz de 48 MHz et de 32,768 kHz.
- Émetteur-récepteur Bluetooth 5.2 basse consommation, exigences d'adaptation RF et d'implantation de l'antenne.
- Interfaces OPI PSRAM, mémoire flash QSPI NOR/NAND et PSRAM, SDIO eMMC ou Micro SD ; la mémoire intégrée dépend de la référence exacte.
- Options d'affichage MIPI DSI, SPI/QSPI, MCU8080 et JDI.
- Conseils de conception pour le bouton de réveil, le moteur de vibration, l'interruption de réveil, le GPADC, les capteurs et l'audio Bluetooth externe.
- Prise en charge du DBG-UART, du SWD, du flashage en production et de l'étalonnage des quartz.

### 3.4. Applications typiques { #34-typical-applications }

Les applications visées comprennent notamment les bracelets connectés, les appareils mobiles intelligents, les produits pour la maison connectée et d'autres conceptions AIoT basse consommation.

## 4. Vue d'ensemble de la conception { #4-design-at-a-glance }

### 4.1. Résumé technique { #41-engineering-summary }

<div align="center"><em>Tableau 4.1-1 : Résumé de conception du SF32LB55x</em></div>

<div align="center" markdown>

| Sujet | Point de conception |
|:---|:---|
| Boîtier | Choisissez le QFN68L ou un boîtier BGA avant de définir l'affectation des broches et l'empilage des couches du PCB. |
| Alimentation | Vérifiez les rails du PMU, les autres broches d'alimentation, les condensateurs requis, le POR/BOR/reset et le mode BUCK. |
| Horloge | Utilisez des quartz 48 MHz et 32,768 kHz respectant les exigences de CL, de ppm et d'ESR. |
| RF | Placez le réseau d'adaptation près de la puce et préservez un chemin d'antenne de 50 Ω propre. |
| Mémoire | Planifiez séparément la PSRAM volatile OPI/QSPI et le stockage de démarrage et persistant sur QSPI Flash ou SDIO eMMC/Micro SD ; vérifiez la prise en charge par le boîtier et le mode de démarrage. |
| Affichage | Choisissez MIPI DSI, SPI/QSPI, MCU8080 ou JDI tôt, car les groupes de broches et la disposition diffèrent. |
| Production | Réservez l'accès au DBG-UART, au SWD, au mode de démarrage, à l'alimentation et à l'étalonnage RF/quartz. |

</div>

### 4.2. Flux de conception matérielle { #42-hardware-design-flow }

1. Confirmez le boîtier, la stratégie mémoire, l'interface d'affichage et l'objectif de basse consommation.
2. Définissez l'architecture d'alimentation, les rails du PMU, le comportement BUCK/LDO et le circuit de réinitialisation.
3. Sélectionnez les quartz, la topologie d'adaptation RF et les contraintes de disposition d'antenne.
4. Affectez les broches de mémoire, d'affichage, de réveil, de capteurs, d'audio, de débogage et de test de production.
5. Définissez l'empilage PCB, le fan-out des broches, l'impédance, l'ESD, la RF et les contraintes des interfaces haut débit.
6. Passez en revue la liste de contrôle de la section 7 avant le gel du schéma, la validation du routage et l'EVT.

### 4.3. Éléments à archiver pour la revue { #43-review-evidence-pack }

Avant l'EVT, archivez les versions utilisées de la fiche technique et du manuel utilisateur, le plan du boîtier, le PDF du schéma, l'empilage PCB, les rapports d'impédance et de DRC/ERC, l'architecture d'alimentation et le tableau des modes de démarrage. Ajoutez les captures des implantations RF et quartz, celles du routage mémoire/affichage, ainsi que le plan des points de test de production.

### 4.4. Utilisation des listes de contrôle { #using-the-checklists }

Ce guide propose deux niveaux de vérification. La liste courte de la section 7 regroupe les points les plus risqués pour un contrôle technique rapide. La [liste de contrôle du schéma](SF32LB55x_schematic_checklist.md) (section 5.8) et la section 6.4 des [directives d'implantation et de routage PCB](SF32LB55x_pcb_layout.md) reproduisent, point par point, le document officiel de SiFli *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), publié avec les documents de conception matérielle sur le [wiki de SiFli][Index des guides de conception matérielle des puces SiFli (Wiki)]. Ce document couvre les composants 551/555/557 et la variante SS6600A8.

Chaque point de contrôle indique le ou les groupes de variantes concernés et s'il est obligatoire (à valider avant l'approbation de la conception) ou optionnel (recommandé si la fonctionnalité est utilisée). Les textes colorés et ceux sur <span class="flag-yellow">fond jaune</span> reprennent les mises en évidence du fichier Excel source. Celui-ci n'en explique pas la raison pour chaque cas : considérez ces marques comme des signaux de vigilance supplémentaires, et non comme une raison d'ignorer les autres points du tableau.

Utilisez la [liste de contrôle du schéma](SF32LB55x_schematic_checklist.md) lors de la revue du schéma, avant de commencer le routage PCB. Utilisez la liste de contrôle PCB (section 6.4) lors de la revue du routage, avant d'émettre les fichiers Gerber. En pratique, chaque liste fait généralement l'objet de deux passes : d'abord par l'ingénieur de conception, puis par un réviseur indépendant avant le gel de la conception ou son lancement en fabrication.

Pour tirer pleinement parti des listes, utilisez-les comme dossier de validation, et non comme de simples documents à parcourir :

1. Confirmez d'abord la référence exacte du composant cible et le boîtier choisi.
2. Pendant la revue, indiquez pour chaque point s'il est validé, non validé ou non applicable ; ne vous contentez pas de parcourir le tableau.
3. Vérifiez les lignes relatives à l'affichage, au stockage, au réveil et à la basse consommation par rapport aux sections correspondantes du guide de conception matérielle.
4. Consignez les hypothèses spécifiques au boîtier — en particulier BGA vs. QFN, affichage DSI vs. SPI, et utilisation du stockage QSPI2/QSPI3 — dans les notes de revue.

<div align="center"><em>Tableau 4.4-1 : Modèle de fiche de revue</em></div>

<div align="center" markdown>

| Champ | Valeur |
|:---|:---|
| Nom du client | |
| Nom de la conception du client | |
| Date de soumission à la revue | |
| Réviseur initial | |
| Date de revue initiale | |
| Réviseur de suivi | |
| Date de revue de suivi | |

</div>

<div align="center"><em>Tableau 4.4-2 : Historique des versions du document de liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Première publication de la liste de contrôle du schéma et du PCB |

</div>

[Index des guides de conception matérielle des puces SiFli (Wiki)]: https://wiki.sifli.com/hardware/index.html

## Poursuivre le guide de conception { #continue-the-design-guide }

Le guide complet se poursuit sur les pages ci-dessous. Chacune couvre une étape du processus de conception et est accessible depuis ici.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Directives de conception du schéma](SF32LB55x_schematic_design.md)__ — système d'alimentation, mode de démarrage, génération d'horloge, RF, interfaces de stockage, interfaces d'affichage et tactiles, et interfaces de réveil/GPADC/fabrication
- :fontawesome-solid-list-check: __[Liste de contrôle du schéma](SF32LB55x_schematic_checklist.md)__ — liste de contrôle de revue du schéma point par point (section 5.8)
- :fontawesome-solid-microchip: __[Implantation et routage du PCB](SF32LB55x_pcb_layout.md)__ — empreinte, empilage, règles PCB générales, routage des interfaces et liste de contrôle d'implantation et de routage PCB point par point
- :fontawesome-solid-book-open: __[Liste de contrôle de revue de conception et références](SF32LB55x_review_and_reference.md)__ — liste de contrôle de publication, documents connexes, annexes et historique des révisions

</div>
