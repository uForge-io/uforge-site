---
icon: lucide/book-check
description: "Guide de conception matérielle pour le microcontrôleur SF32LB56x : alimentation, génération d'horloge, conception RF, affichage, audio, implantation et routage du PCB."
tags:
    - Matériel
    - Puce
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56x { #sf32lb56x-hardware-design-guide }

## 1. Introduction { #1-introduction }

Ce guide de conception matérielle fournit des recommandations et des documents de référence pour les produits basés sur la famille de microcontrôleurs AIoT SF32LB56x, optimisés pour le traitement graphique. Il s'adresse aux ingénieurs matériels, aux concepteurs de PCB et aux développeurs de produits qui conçoivent des montres intelligentes, des systèmes HMI connectés, des dispositifs médicaux et de santé, des terminaux portatifs industriels, des instruments portables et des afficheurs évolués pour vélos à assistance électrique et trottinettes électriques.

Le guide couvre l'ensemble du processus de développement matériel pour les conceptions SF32LB56xU et SF32LB56xV, y compris le choix du boîtier, l'alimentation du PMIC et du processeur, la réinitialisation, le mode de démarrage, les modes de fonctionnement, les cristaux, la RF, l'affichage, le stockage, l'audio, les capteurs, la planification des broches UART/I2C/GPTIM, l'implantation et le routage du PCB, la validation et la préparation à la production. Le respect de ces directives contribue à réduire les risques liés au schéma et à l'implantation du PCB, à préserver le comportement basse consommation et à maintenir visibles les différences entre les variantes U et V tout au long de la conception.

Ce document suppose une compréhension de base de la conception matérielle embarquée, de la saisie de schémas et de la conception du PCB (implantation et routage). Il complète les notes d'application matérielle, fiches techniques, manuels utilisateur, conceptions de référence et liste des fournisseurs approuvés de SiFli pour le SF32LB56xU et le SF32LB56xV. Ces documents restent les sources faisant autorité pour les spécifications électriques, le multiplexage des broches, les dimensions du boîtier, la qualification des composants et les limites de production.

## 2. Ressources de développement { #2-development-resources }

[Note d'application matérielle SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Note d'application matérielle SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Code source de la note d'application SF32LB56xU]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Code source de la note d'application SF32LB56xV]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Présentation de la famille SF32]: ../../sf32-products/family/SF32_family.md
[Liste des fournisseurs approuvés SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB56xV]__
- :fontawesome-brands-github: __[Code source de la note d'application SF32LB56xU]__
- :fontawesome-brands-github: __[Code source de la note d'application SF32LB56xV]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

## 3. Présentation du composant { #3-device-overview }

### 3.1. Architecture { #31-architecture }

Le SF32LB56x cible des produits d'affichage et HMI plus riches que les nœuds de capteurs qui utilisent uniquement le BLE. Les notes d'application matérielle officielles U et V partagent les mêmes thèmes techniques : distribution d'alimentation basée sur PMIC, cristaux 48 MHz et 32,768 kHz, conception RF, choix d'interface d'affichage, choix d'interface de stockage, audio, broches PBR, capteurs, planification UART/I2C/GPTIM, débogage/programmation, et étalonnage du cristal en production.

### 3.2. Variantes et boîtiers { #32-variants-and-packages }

<div align="center"><em>Tableau 3.2-1 : Variantes de boîtier du SF32LB56x</em></div>

<div align="center" markdown>

| Variante | Boîtier | Dimensions | Pas des broches | Diamètre des billes |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7x7x0,75 mm | 0,35 mm | - |
| SF32LB56xV | WBBGA175 | 6,5x6,1x0,94 mm | 0,4 mm | 0,25 mm |

</div>

La variante U utilise un boîtier QFN68L. La variante V utilise un boîtier WBBGA175 et nécessite une planification plus rigoureuse du fanout, des vias et du procédé HDI.

![Figure 3.2-1 : Répartition des broches du SF32LB56xU QFN68L](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-1 : Répartition des broches du SF32LB56xU QFN68L</em></div>

![Figure 3.2-2 : Répartition des broches du SF32LB56xV WBBGA175](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.2-2 : Répartition des broches du SF32LB56xV WBBGA175</em></div>

### 3.3. Principales fonctionnalités matérielles { #33-major-hardware-features }

- Distribution d'alimentation centrée sur le PMIC utilisant des exemples SF30147C.
- Exigences de cristal 48 MHz et 32,768 kHz et modèles de cristaux recommandés.
- Conception RF Bluetooth et exigences d'adaptation d'antenne.
- Affichage SPI/QSPI et JDI sur la variante U ; affichage SPI/QSPI, MCU8080, DPI et JDI sur la variante V.
- Options de mémoire externe et de stockage de démarrage, y compris les interfaces de type SDIO/eMMC/SD NAND.
- Boutons, moteur de vibration, interface audio, broches PBR, capteurs, UART/I2C, GPTIM, débogage/programmation et étalonnage.

### 3.4. Applications typiques { #34-typical-applications }

![Figure 3.4-1 : Schéma-bloc type d'une montre connectée basée sur le SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.4-1 : Schéma-bloc type d'une montre connectée basée sur le SF32LB56xU</em></div>

![Figure 3.4-2 : Schéma-bloc type d'une montre connectée basée sur le SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.4-2 : Schéma-bloc type d'une montre connectée basée sur le SF32LB56xV</em></div>

Le SF32LB56x convient aux montres intelligentes, aux panneaux HMI connectés, aux produits de santé, aux terminaux portatifs industriels, aux instruments portables et aux systèmes d'affichage évolués nécessitant le Bluetooth, l'audio, des capteurs, de la mémoire externe et une interface utilisateur plus complète.

## 4. Vue d'ensemble de la conception { #4-design-at-a-glance }

### 4.1. Résumé technique { #41-engineering-summary }

<div align="center"><em>Tableau 4.1-1 : Résumé de conception du SF32LB56x</em></div>

<div align="center" markdown>

| Sujet | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| Boîtier | QFN68L, 7x7x0,75 mm, pas de 0,35 mm | WBBGA175, 6,5x6,1x0,94 mm, pas de 0,4 mm |
| Affichage | SPI/QSPI et JDI sont les interfaces principales documentées | SPI/QSPI, MCU8080, DPI et JDI sont documentées |
| Procédé PCB | Routage compact et fanout du QFN | Planification BGA/HDI, vérification des vias borgnes/enterrés et maîtrise plus stricte du fanout |
| Alimentation | Rails processeur plus distribution PMIC SF30147C | Rails processeur plus distribution PMIC SF30147C, avec des affectations de charge spécifiques à V |
| Stockage | Conception de mémoire externe via les broches de stockage documentées du SF32LB56xU | Conception de mémoire externe via les broches de stockage documentées du SF32LB56xV |

</div>

### 4.2. Flux de conception matérielle { #42-hardware-design-flow }

1. Sélectionnez la variante U ou V, le boîtier, l'interface d'affichage, l'option de stockage et le procédé PCB cible.
2. Définissez la distribution d'alimentation du PMIC, les rails du processeur, la réinitialisation, la recharge et le contrôle basse consommation.
3. Sélectionnez les cristaux, l'adaptation RF, l'affichage, le stockage, l'audio, les capteurs, les boutons, le moteur et les circuits PBR.
4. Verrouillez les affectations de broches et vérifiez les conflits entre les fonctions d'affichage, de stockage, d'audio, de débogage, de réveil et de production.
5. Passez en revue le fanout du PCB, l'empilage, l'impédance, la RF, les horloges, l'USB/SDIO, l'audio, le DC-DC et l'ESD.
6. Exécutez la liste de contrôle de conception avant le gel du schéma, la publication des données d'implantation du PCB, l'EVT et la mise à disposition de l'outillage de test en production.

### 4.3. Dossier documentaire pour la revue { #43-review-evidence-pack }

Avant l'EVT, archivez les versions des notes d'application matérielle SF32LB56xU et SF32LB56xV, celles de la fiche technique et du manuel utilisateur, le PDF du schéma, l'empilage PCB, les capacités du procédé PCB, les rapports DRC/ERC, la configuration du PMIC, l'architecture d'alimentation, la configuration de démarrage et de stockage, les captures d'écran du routage de l'affichage et de l'implantation RF et des cristaux, les captures d'écran audio/analogique ainsi que le plan de programmation et d'étalonnage en production.

### 4.4. Utilisation des listes de contrôle { #using-the-checklists }

Ce guide comprend deux niveaux de couverture des listes de contrôle. La liste courte de la section 7 réunit, pour une auto-vérification technique rapide, les éléments présentant le risque le plus élevé. La [liste de contrôle du schéma](SF32LB56x_schematic_checklist.md) (section 5.8) et la section 6.3 des [directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md) reproduisent, point par point, la liste complète de SiFli *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), publiée avec les documents de conception matérielle sur le [wiki de SiFli][Index Wiki SiFli des guides de conception matérielle des puces]. Elle couvre les familles SF32LB56xU et SF32LB56xV ainsi que la variante SS6700A.

Chaque point de contrôle précise les groupes de puces auxquels il s'applique et s'il est obligatoire (à valider avant la libération du design) ou optionnel (recommandé si la fonction est utilisée). Le texte en couleur et le <span class="flag-yellow">fond jaune</span> conservent les mises en évidence du classeur source. Comme celui-ci n'explique pas chaque surlignage, considérez-les comme des repères de revue supplémentaires, et non comme des substituts aux autres points du tableau.

Exécutez la [liste de contrôle du schéma](SF32LB56x_schematic_checklist.md) pendant la revue du schéma, avant de commencer l'implantation du PCB. Exécutez la liste de contrôle d'implantation et de routage du PCB (section 6.3) pendant la revue de l'implantation, avant la publication des fichiers Gerber. En pratique, chaque passage est généralement effectué deux fois : d'abord par l'ingénieur de conception, puis par un réviseur indépendant avant le gel de la conception ou la publication pour fabrication.

Pour de meilleurs résultats, traitez la liste de contrôle comme un enregistrement de validation plutôt que comme une simple lecture :

1. Confirmez d'abord la référence exacte de la pièce cible et le boîtier.
2. Marquez chaque élément comme réussi / échoué / non applicable pendant la revue au lieu de lire le tableau passivement.
3. Vérifiez les lignes relatives à l'affichage, au stockage, au réveil et à la basse consommation par rapport aux sections correspondantes du guide de conception matérielle.
4. Consignez les hypothèses propres au boîtier — notamment 56xU par rapport à 56xV, QFN par rapport à WBBGA, affichage DSI par rapport à SPI et utilisation de SD2/MPI3 pour le stockage — dans les notes de revue.

<div align="center"><em>Tableau 4.4-1 : Modèle d'enregistrement de revue</em></div>

<div align="center" markdown>

| Champ | Valeur |
|:---|:---|
| Nom du client | |
| Nom de la conception du client | |
| Date de soumission pour revue | |
| Réviseur initial | |
| Date de revue initiale | |
| Réviseur de suivi | |
| Date de revue de suivi | |

</div>

<div align="center"><em>Tableau 4.4-2 : Historique des versions du document de liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Publication initiale du document de liste de contrôle du schéma et du PCB |

</div>

[Index Wiki SiFli des guides de conception matérielle des puces]: https://wiki.sifli.com/hardware/index.html

## Poursuivre le guide de conception { #continue-the-design-guide }

Le guide complet se poursuit sur les pages ci-dessous. Chacune couvre une étape du processus de conception et est accessible depuis ici.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Directives de conception du schéma](SF32LB56x_schematic_design.md)__ — système d'alimentation, modes de fonctionnement et sources de réveil, génération d'horloge, RF, interfaces d'affichage/tactile/rétroéclairage, stockage/capteurs/audio/connectivité, et fabrication
- :fontawesome-solid-list-check: __[Liste de contrôle du schéma](SF32LB56x_schematic_checklist.md)__ — liste de contrôle de revue du schéma point par point (section 5.8)
- :fontawesome-solid-microchip: __[Directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md)__ — empreinte, empilage, routage critique et liste de contrôle d'implantation et de routage du PCB, point par point
- :fontawesome-solid-book-open: __[Liste de contrôle de la revue de conception et des références](SF32LB56x_review_and_reference.md)__ — liste de contrôle de publication, documents connexes, annexes et historique des révisions

</div>
