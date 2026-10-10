---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle pour le microcontrôleur SF32LB52x : présentation du dispositif, démarche de conception et liens vers les pages consacrées au schéma, à l’implantation et au routage du PCB, aux revues et aux listes de contrôle."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x { #sf32lb52x-hardware-design-guide }

## 1. Introduction { #1-introduction }

Ce guide de conception matérielle fournit des recommandations de conception et de la documentation de référence sourcée pour les produits basés sur la famille SF32LB52x de microcontrôleurs AIoT ultra-basse consommation. Il s'adresse aux ingénieurs matériel, aux concepteurs de PCB et aux développeurs de produits qui conçoivent des dispositifs portés sur soi et alimentés par batterie ainsi que d'autres systèmes embarqués compacts.

Le guide couvre l'ensemble du processus de développement matériel, notamment la conception de l'alimentation, les circuits d'horloge, l’implantation et le routage RF, les interfaces d'affichage et de stockage, les circuits audio, les recommandations d’implantation et de routage du PCB et les considérations de fabrication. Le respect de ces recommandations permet de réduire les risques de développement, d'améliorer la fiabilité du système et de raccourcir le cycle de développement du produit.

Ce document suppose une compréhension de base de la conception matérielle embarquée et de la saisie de schémas. Il complète la fiche technique, le manuel de référence et la documentation SDK du SF32LB52x, qui restent la référence pour les spécifications électriques détaillées, le fonctionnement des périphériques et le développement logiciel.

Le guide réunit deux notes d'application matérielle originales de SiFli dans une même démarche de conception : l'une pour les SF32LB520/3/5/7 alimentés par batterie, l'autre pour les 52B/D/E/G/J à alimentation externe régulée. Lorsque les formulations des sources ne concordent pas, il privilégie les références exactes des composants disponibles à la commande, une description explicite des domaines d'alimentation et la clarté nécessaire à la revue avant mise en production.

## 2. Ressources de développement { #2-development-resources }
[SF32LB52x Product Brief]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x Datasheet]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[Manuel de référence SF32LB52x]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[Fichiers KiCad]: https://github.com/OpenSiFli/kicad-libraries
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/
[Liste des fournisseurs approuvés par SiFli]: ../cad-components/sifli-approved-vendor-list.md
[Liste des fournisseurs approuvés par SiFli (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit SF32LB52x][SF32LB52x Product Brief]__
- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB52x][SF32LB52x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manuel de référence SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x (520/3/5/7)][SF32LB52x Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x (52B/D/E/G/J)][SF32LB52x Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés par SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__
- :fontawesome-brands-github: __[Fichiers KiCad]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. Présentation du dispositif { #3-device-overview }

La famille SF32LB52x combine des processeurs STAR-MC1 double cœur, une connectivité Bluetooth, une accélération graphique, de l'audio intégré, des interfaces d'affichage, des contrôleurs de stockage et une gestion de l'alimentation dans un boîtier QFN68 compact. La famille est optimisée pour les produits où le coût de la nomenclature (BOM), l'autonomie de la batterie et la surface du PCB sont tous déterminants.

### 3.1. Caractéristiques { #31-features }

La famille intègre :

- Processeurs Arm China STAR-MC1 à double cœur, compatibles avec Arm Cortex-M33 et dotés de FPU et MPU
- Une radio Bluetooth 5.3 double mode
- Un accélérateur graphique 2D/2.5D ePicasso 2.0
- Un contrôleur d'affichage prenant en charge les interfaces SPI, QSPI, 8080, JDI et EPD 8 bits
- Un périphérique USB 2.0 Full-Speed
- Une interface de stockage SDIO/eMMC sur les variantes prises en charge
- Des interfaces audio analogiques et numériques
- Un PMU, un convertisseur DC/DC et des régulateurs LDO intégrés
- Un boîtier QFN68 avec jusqu'à 44/45 GPIO

### 3.2. Variantes { #32-variants }

La famille SF32LB52x se divise en deux groupes de conception pratiques selon l'architecture d'alimentation : les dispositifs alimentés par batterie et les dispositifs à régulation externe, comme indiqué ci-dessous.

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    Ce groupe intègre un **module de gestion de charge et un PMU** sur puce. Il peut être alimenté directement par une batterie lithium-ion à une seule cellule, tout en permettant aussi des solutions de charge externes.

    <div align="center"><em>Tableau 3.2-1 : Comparaison des modèles (variante alimentée par batterie)</em></div>

    <div align="center" markdown>

    | Modèle | Mémoire intégrée au boîtier | Alimentation | Remarque de conception |
    |:---|:---|:---|:---|
    | SF32LB520U36 | Flash QSPI-NOR 1 MB | Batterie Li-ion, 3,2–4,7 V, rechargeable | Démarre par défaut depuis la Flash intégrée au boîtier ; `VDD18_VOUT` nécessite une alimentation externe 3,3 V |
    | SF32LB523UB6 | OPI-PSRAM 4 MB | Batterie Li-ion, 3,2–4,7 V, rechargeable | Doit démarrer depuis un stockage externe |
    | SF32LB525UC6 | OPI-PSRAM 8 MB | Batterie Li-ion, 3,2–4,7 V, rechargeable | Doit démarrer depuis un stockage externe |
    | SF32LB527UD6 | OPI-PSRAM 16 MB | Batterie Li-ion, 3,2–4,7 V, rechargeable | Doit démarrer depuis un stockage externe |

    </div>

=== "52B/D/E/G/J (alimentation régulée externe)"

    Ce groupe intègre le **PMU** sur puce mais ne comprend pas de circuit de charge. Il est alimenté par une alimentation externe régulée.

    <div align="center"><em>Tableau 3.2-2 : Comparaison des modèles (variante à alimentation régulée externe)</em></div>

    <div align="center" markdown>

    | Modèle | Mémoire intégrée au boîtier | Alimentation | Remarque de conception |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | Flash QSPI-NOR 1 MB | 2,97–3,63 V, non rechargeable | `VDD_SIP` nécessite une alimentation externe 1,8 V ou 3,3 V |
    | SF32LB52BU56 | Flash QSPI-NOR 4 MB | 2,97–3,63 V, non rechargeable | `VDD_SIP` nécessite une alimentation externe 3,3 V |
    | SF32LB52DUB6 | OPI-PSRAM 4 MB | 1,71–1,98 V, non rechargeable | `VDD_SIP` nécessite une alimentation externe 1,8 V |
    | SF32LB52EUB6 | OPI-PSRAM 4 MB | 2,97–3,63 V, non rechargeable | `VDD_SIP` peut être alimenté par le LDO interne |
    | SF32LB52GUC6 | OPI-PSRAM 8 MB | 2,97–3,63 V, non rechargeable | `VDD_SIP` peut être alimenté par le LDO interne |
    | SF32LB52JUD6 | OPI-PSRAM 16 MB | 2,97–3,63 V, non rechargeable | `VDD_SIP` peut être alimenté par le LDO interne |

    </div>

### 3.3. Boîtiers { #33-packages }

Les deux groupes de conception utilisent le même boîtier QFN68.

<div align="center"><em>Tableau 3.3-1 : Informations sur le boîtier</em></div>

<div align="center" markdown>

| Nom du boîtier | Dimensions | Pas des broches |
|:---|:---|:---|
| QFN68L | 7 mm x 7 mm x 0,85 mm | 0,35 mm |

</div>

Les deux groupes de conception diffèrent légèrement en ressources périphériques. Le groupe alimenté par batterie dispose de 44 GPIO, tandis que le groupe à alimentation régulée externe en dispose de 45 ; la différence provient des broches réservées à la charge sur les dispositifs alimentés par batterie.

- 44/45 GPIO
- 3x UART
- 4x I2C
- 2x GPTIM
- 2x SPI
- 1x interface audio I2S
- 1x interface de stockage SDIO
- 1x interface audio PDM
- 1x sortie audio analogique différentielle
- 1x entrée audio analogique asymétrique (single-ended)
- Interface d'affichage SPI à une, deux ou quatre lignes de données, interface d'affichage série JDI
- Prend en charge les afficheurs avec et sans GRAM
- Prend en charge le téléchargement UART et le débogage logiciel

Les schémas de disposition des broches sont présentés ci-dessous, et leurs différences seront revues dans la section de conception du schéma.

![Figure 3.3-1 : Disposition des broches QFN68L pour SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-1 : Disposition des broches QFN68L pour SF32LB520/3/5/7</em></div>

![Figure 3.3-2 : Disposition des broches QFN68L pour SF32LB52B/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-2 : Disposition des broches QFN68L pour SF32LB52B/E/G/J</em></div>

### 3.4. Applications { #34-applications }

Les applications typiques sont les systèmes embarqués portables où une longue autonomie de batterie et un format compact sont essentiels. Exemples :

- Montres connectées et bracelets de fitness d'entrée de gamme
- Modules Bluetooth et adaptateurs sans fil
- Accessoires audio Bluetooth
- Capteurs intelligents et dispositifs portés sur soi
- Étiquettes électroniques de rayon et badges intelligents
- Liseuses électroniques
- Imprimantes d'étiquettes portables
- Afficheurs pour vélos et trottinettes électriques
- Dispositifs d'interface homme-machine (IHM) connectés
- Équipements industriels et médicaux portables
- Autres dispositifs AIoT alimentés par batterie

## 4. Aperçu de la conception { #4-design-at-a-glance }

### 4.1. Architecture matérielle { #41-hardware-architecture }

Le tableau suivant résume l'architecture matérielle recommandée pour une application SF32LB52x typique. Utilisez-le comme référence rapide avant de lire les recommandations de conception détaillées dans les sections suivantes.

<div align="center"><em>Tableau 4.1-1 : Résumé de l'aperçu de la conception</em></div>

<div align="center" markdown>

| Bloc matériel | Implémentation typique |
|:---|:---|
| Boîtier | QFN68L, 7 mm x 7 mm x 0,85 mm, pas de 0,35 mm |
| PCB | PCB 4 couches PTH recommandé |
| Alimentation | Batterie Li-ion/Li-Po à une cellule ou alimentation externe régulée, selon la variante du dispositif |
| Charge de la batterie | Chargeur intégré sur les variantes prises en charge ou circuit intégré de charge externe, avec ou sans gestion du chemin d’alimentation (PPM) |
| Inductance du convertisseur buck | 4,7 uH +/-20 %, DCR <= 0,4 Ω, Isat >= 450 mA |
| Quartz | Quartz principal 48 MHz et quartz RTC 32,768 kHz |
| RF | Piste à impédance contrôlée 50 Ω avec réseau d'adaptation en π réservé |
| Affichage | SPI 3 fils, SPI 4 fils, Dual-SPI, Quad-SPI (jusqu'à 512 x 512), JDI, et EPD 8 bits |
| Tactile | Contrôleur tactile capacitif I2C avec prise en charge du réveil par interruption |
| Stockage | Flash/PSRAM SiP, SPI NOR externe, SPI NAND, SD NAND, ou eMMC selon la variante |
| Audio | Entrée microphone analogique, sortie DAC différentielle, PA externe |
| Capteurs | Capteurs I2C/SPI tels qu'accéléromètre, gyroscope, capteur géomagnétique, capteur de fréquence cardiaque, capteur SpO2, et capteur ECG |
| Retour haptique | Moteur de vibration contrôlé par PWM |
| Débogage | DBG_UART sur PA18/PA19, multiplexé avec SWD |

</div>


### 4.2. Flux de conception matérielle { #42-hardware-design-flow }

Suivez l'ordre dans lequel les décisions matérielles sont généralement arrêtées. Le déroulement ci-dessous met en évidence les choix d'architecture à effectuer avant de passer aux détails du schéma et du PCB.

<div align="center"><em>Tableau 4.2-1 : Flux de conception matérielle</em></div>

<div align="center" markdown>

| Étape | Décision de conception | Sections principales |
|:---|:---|:---|
| 1 | Sélectionner le dispositif commercial exact et la variante d'alimentation | Présentation du dispositif, Sélection de la variante |
| 2 | Confirmer le boîtier, le nombre de GPIO et les broches à fonction fixe | Boîtiers, Recommandations de conception du schéma |
| 3 | Verrouiller le système minimal : arbre d'alimentation, stockage de démarrage, broches de bootstrap, accès de débogage, horloges, et stratégie de réveil | Conception du système minimal, Stockage, Débogage, Génération d'horloge |
| 4 | Sélectionner la topologie RF, l'affichage, l'audio, les capteurs et les interfaces produit restantes | Génération d'horloge, RF, Interfaces utilisateur, Stockage et connectivité |
| 5 | Revoir l'empilement PCB, le fanout, l'impédance et le routage sensible | Recommandations d’implantation et de routage du PCB |
| 6 | Comparer avec les schémas de référence, les implantations PCB, les dessins mécaniques et les schémas d’alimentation des sources | Annexes A-E |
| 7 | Réserver l'accès pour la mise en service, le débogage, le calibrage et les tests de production | Débogage, Production, Liste de contrôle de revue de conception |

</div>

**Arbre de décision de conception**

- Besoin d'un fonctionnement sur batterie à une cellule rechargeable par USB ? Commencez avec `SF32LB520/3/5/7`.
- Besoin d'une alimentation externe régulée ou d'un démarrage eMMC ? Commencez avec `52B/D/E/G/J`.
- Besoin d'un EPD parallèle 8 bits ? Utilisez la configuration à alimentation externe régulée, sauf si SiFli confirme la configuration alimentée par batterie pour la conception exacte concernée.
- Besoin du courant de veille le plus bas ? Déterminez la commutation d'alimentation du stockage, les interrupteurs d'alimentation des capteurs et l'isolation de l'alimentation de l'afficheur avant le placement sur PCB.

### 4.3. Comment utiliser ce guide { #43-how-to-use-this-guide }

Choisissez la référence exacte du composant avant de commencer le schéma. La famille SF32LB52x comprend deux groupes : `SF32LB520/3/5/7` avec alimentation par batterie et `52B/D/E/G/J` avec alimentation externe régulée. Utilisez la section 3.2 pour choisir le groupe, les sections 5.1 et 5.2 pour vérifier le système minimal et l'alimentation, puis les sections 5.6.1 et 5.7.1 pour vérifier le stockage de démarrage et l'accès au débogage. Les sections 5 et 6 couvrent le schéma et le PCB. Comparez le projet aux figures de référence dans les annexes A–E et utilisez la section 7 comme liste de contrôle avant mise en production.

Lorsqu'une conception réutilise un ancien schéma SF32LB52x, vérifiez d'abord les broches d'alimentation, l'alimentation de la mémoire SiP, le rail de stockage de démarrage, les broches DBG_UART/SWD, la charge du quartz, l'empreinte d'adaptation RF, et les points de test de production. Ce sont les sources les plus courantes de problèmes de mise en service qui passent inaperçus.

### 4.4. Dossier de validation de la conception { #44-review-evidence-pack }

Avant la mise en production du matériel, rassemblez le PDF du schéma, l'empilement PCB, le rapport d’impédance, les résultats de la vérification des composants par rapport à l’AVL, le rapport DRC et des captures d’écran de l’implantation et du routage des circuits RF, des quartz, de l’USB, du SDIO/eMMC, de l’audio, de l’alimentation et du stockage de démarrage. Archivez ces documents avec la révision de la carte : ils permettront de relier tout problème ultérieur de firmware, de RF ou de production à la version matérielle validée.


## 5. Utilisation des listes de contrôle { #using-the-checklists }

Ce guide propose deux niveaux de listes de contrôle. Les listes courtes des sections 5.1.1.5, 5.5.3 et 7 regroupent les points les plus critiques pour une vérification technique rapide. La [Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) (section 5.8) et la [Liste de contrôle de l’implantation et du routage du PCB](SF32LB52x_pcb_layout_checklist.md) (section 6.15) reproduisent intégralement, point par point, le document SiFli [*SF32LB52 Schematic & PCB Checklist*][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] (V1.0, 2026-01-21). Publié avec le guide matériel sur le [wiki de SiFli][SiFli Chip Hardware Design Guide Index (Wiki)], il couvre les SF32LB520/3/5/7 alimentés par batterie et les SF32LB52B/D/E/G/J à alimentation externe.

Chaque point indique les variantes SF32LB52x concernées et sa catégorie : obligatoire (à valider avant mise en production) ou optionnel (recommandé lorsque la fonction est utilisée). « Toutes les variantes » désigne SF32LB520/3/5/7 et SF32LB52B/D/E/G/J, sauf restriction explicite. Le texte coloré et le texte sur <span class="flag-red flag-yellow">fond jaune</span> conservent les mises en évidence du tableur source. Celui-ci n'en explique pas les raisons : ces marques constituent des points d'attention supplémentaires et ne remplacent pas les autres vérifications du tableau. Les listes reprennent volontairement la présentation du tableur. Si une formulation est incomplète, incohérente ou trop concise, consultez aussi le guide matériel, la fiche technique, le manuel de référence et les indications de SiFli sur les références des modèles.

Exécutez la [Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) pendant la revue du schéma, avant de commencer l’implantation et le routage du PCB. Exécutez la [Liste de contrôle de l’implantation et du routage du PCB](SF32LB52x_pcb_layout_checklist.md) pendant la revue de l’implantation et du routage, avant la livraison des fichiers Gerber. En pratique, chaque passage est généralement effectué deux fois : d'abord par l'ingénieur de conception, puis par un réviseur indépendant avant le gel de la conception ou la mise en fabrication.

Utilisez la liste comme un procès-verbal de validation, et non comme une liste à parcourir sans vérifier les points :

1. Confirmez d'abord la variante exacte du microcontrôleur, notamment si le projet peut utiliser des composants 520/3/5/7 ou 52B/D/E/G/J.
2. Attribuez à chaque point le statut conforme / non conforme / non applicable pendant la revue au lieu de lire le tableau passivement.
3. Lorsqu'un point de contrôle fait référence au support de démarrage, au type d'afficheur, ou au comportement d'un interrupteur d'alimentation, vérifiez-le par rapport au schéma réel et au chapitre du sous-système correspondant dans le guide de conception.
4. Pour toute formulation source ambiguë, consignez la référence exacte et l'hypothèse de conception dans les notes de revue avant la mise en production.

<div align="center"><em>Tableau 5-1 : modèle d'enregistrement de revue</em></div>

<div align="center" markdown>

| Champ | Valeur |
|:---|:---|
| Nom du client | |
| Nom de la conception client | |
| Date de soumission pour revue | |
| Réviseur initial | |
| Date de revue initiale | |
| Réviseur de suivi | |
| Date de revue de suivi | |

</div>

<div align="center"><em>Tableau 5-2 : historique des versions du document de liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Première publication du document de liste de contrôle Schéma & PCB |

</div>

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

## 6. Suite du guide de conception { #continue-the-design-guide }

Le guide complet se poursuit à travers les pages ci-dessous. Chacune couvre une étape du processus de conception et est accessible depuis ici.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Recommandations de conception du schéma](SF32LB52x_schematic_design.md)__ — système minimal, système d'alimentation, génération d'horloge, RF, interfaces utilisateur, stockage et connectivité, et accès nécessaires à la fabrication, répartis sur trois pages
- :fontawesome-solid-list-check: __[Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md)__ — liste de contrôle de revue de schéma point par point (section 5.8)
- :fontawesome-solid-microchip: __[Recommandations d’implantation et de routage du PCB](SF32LB52x_pcb_layout.md)__ — empreinte, empilement, fanout, et recommandations de routage pour l'horloge, la RF, l'audio, l'USB, le SDIO et l'alimentation
- :fontawesome-solid-list-check: __[Liste de contrôle de l’implantation et du routage du PCB](SF32LB52x_pcb_layout_checklist.md)__ — liste de contrôle détaillée pour la revue de l’implantation et du routage du PCB (section 6.15)
- :fontawesome-solid-book-open: __[Liste de contrôle de revue de conception et références](SF32LB52x_review_and_reference.md)__ — liste de contrôle avant mise en production, documents connexes, annexes de schéma/PCB/mécanique/alimentation de référence, et historique des révisions

</div>
