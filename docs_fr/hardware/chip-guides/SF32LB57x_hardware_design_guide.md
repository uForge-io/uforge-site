---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle du MCU SF32LB57x : système minimal, alimentation, horloge, RF, affichage, caméra, stockage et directives de routage PCB."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x { #sf32lb57x-hardware-design-guide }

## 1. Introduction { #1-introduction }

Ce guide propose des recommandations de conception matérielle et des ressources de référence pour les produits reposant sur la famille de microcontrôleurs AIoT hautement intégrés SF32LB57x. Il s'adresse aux ingénieurs en électronique, aux concepteurs de PCB et aux équipes de développement produit qui conçoivent des appareils portables, des terminaux intelligents, des équipements domotiques et d'autres produits connectés basse consommation.

Ce guide couvre l'ensemble du processus de développement matériel, y compris l'architecture d'alimentation, les circuits d'horloge, la conception RF, les interfaces d'affichage et de caméra, la configuration du stockage et du démarrage, les circuits audio, l'implantation et le routage du PCB, la validation et la préparation à la fabrication. Le respect de ces directives aide à réduire les risques liés au schéma et au PCB, à préserver le fonctionnement basse consommation et à respecter les exigences de boîtier, d'alimentation et d'interface du SF32LB57x.

Ce document suppose des connaissances de base en conception matérielle embarquée et en saisie de schémas. Il complète la fiche technique du SF32LB57x, le manuel utilisateur, la note d'application matérielle officielle, les fichiers de conception de référence et la liste des fournisseurs approuvés par SiFli (AVL). Consultez ces sources officielles pour les spécifications électriques, le multiplexage des broches, les dimensions du boîtier, la qualification des composants et les limites de production.

## 2. Ressources de développement { #2-development-resources }

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit SF32LB57x][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB57x][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur SF32LB57x][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB57x][SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés par SiFli (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

## 3. Présentation du composant { #3-device-overview }

### 3.1. Caractéristiques { #31-features }

Les ressources typiques du SF32LB57x comprennent :

- Jusqu'à 58 GPIO<!-- BGA-ONLY --> ; certaines variantes BGA112 disposent de six E/S supplémentaires, utilisables pour MPI3 ou configurables en sorties statiques GP par pull-up/pull-down ; voir la section « Boîtiers »<!-- /BGA-ONLY -->.
- 3x UART, 4x I2C, 2x SPI, 2x CAN.
- 2x GPTIM (4 canaux chacun), 2x LPTIM, 2x ATIM (3 canaux différentiels ou 4 canaux asymétriques (single-ended) chacun), 1x PWM (5 canaux), 1x PTM (16 canaux).
- 4x sorties d'horloge RTC ; 4x sorties d'horloge basse fréquence en états de veille (16 kHz max).
- 2x interfaces de stockage SDIO et 3x MPI.
- 2x interfaces audio I2S et 2x PDM ; 1x sortie audio analogique différentielle et 2x entrées audio analogiques différentielles.
- 1x USB 2.0 FS.
- 1x GPADC (12 canaux).
- 1x contrôleur d'affichage LCDC (DPI 24 bits, 8080 8/16 bits, QSPI, EPD 8/16 bits et JDI série/parallèle).
- 1x interface caméra DCMI (DVP jusqu'à 16 bits, SPI à 2 lignes de données et QSPI à 4 lignes de données).
- 10x sources de réveil matérielles.
- Débogage DBG-UART et SWD ; téléchargement via DBG-UART, SWD, UART et USB.

!!! note "Portée des interfaces d'affichage"
    La note d'application matérielle répertorie SPI/QSPI, DPI 24 bits, 8080 16 bits, EPD 16 bits et JDI série/parallèle dans le résumé des interfaces LCDC du SF32LB57x. MIPI-DSI apparaît dans la liste de compatibilité de certains circuits intégrés pilotes d'affichage, mais pas dans ce résumé direct des interfaces LCDC. La mention d'un pilote de panneau ne confirme donc pas la présence d'une interface hôte MIPI-DSI native dans la puce. Avant de choisir une conception, faites confirmer par SiFli le chemin de connexion du contrôleur d'affichage concerné.

### 3.2. Variantes { #32-variants }

Le SF32LB57x comprend deux familles d'alimentation :

<div align="center"><em>Tableau 3.2-1 : Aperçu des numéros de pièce et des variantes d'alimentation</em></div>

<div align="center" markdown>

| Famille | Numéros de pièce typiques | Signification de conception |
|:-------|:---------------------|:---------------|
| Variantes alimentées par batterie | 570 / 573 / 575 / 576 / 577 / 578 / 579 | Pour les produits à batterie Li-ion. La conception prévoit généralement VBAT, VCC, VBUS et un circuit de charge intégré ou externe. |
| Variantes alimentées en 3,3 V | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | Pour les systèmes régulés en externe en 3,3 V. PVDD, AVDD, VDDIO et les rails associés sont alimentés en externe. |

</div>

!!! warning
    Les deux familles d'alimentation ont des connexions d'alimentation, des comportements de mise sous tension et certaines définitions de boîtier différentes. Confirmez le numéro de pièce commandable exact avant de réutiliser une autre conception.

### 3.3. Boîtiers { #33-packages }

Les options de boîtier courantes incluent QFN68L, QFN80L<!-- BGA-ONLY --> et BGA112<!-- /BGA-ONLY -->. Les données de boîtier du SF32LB57x répertorient deux variantes d'épaisseur pour chaque boîtier, et les familles alimentées par batterie et alimentées en 3,3 V utilisent des schémas de brochage différents. Sélectionnez toujours le brochage, le POD, l'empreinte (land pattern) et le plan de pochoir correspondant au numéro de pièce commandable exact.

<div align="center"><em>Tableau 3.3-1 : Options de boîtier et priorités de conception</em></div>

<div align="center" markdown>

| Boîtier | Taille typique | Pas | Priorités de conception |
|:--------|:-------------|:------|:-------------|
| QFN68L | 7 mm x 7 mm | 0,35 mm | Convient aux conceptions compactes ; vérifiez la mise à la masse du pad exposé, les ouvertures du pochoir et la possibilité de router les signaux sur la couche de cuivre supérieure. |
| QFN80L | 8 mm x 8 mm | 0,35 mm | Offre davantage de ressources d'E/S ; vérifiez les différences entre domaines d'alimentation ainsi que les groupes de broches dédiés à l'affichage et au stockage. |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,4 mm | Faible encombrement, mais fanout plus difficile ; confirmez tôt la capacité du procédé PCB. |
<!-- /BGA-ONLY -->

</div>

Les QFN68L et QFN80L offrent uniquement le nombre de GPIO indiqué pour le numéro de pièce commandable ; ils ne disposent pas d'E/S supplémentaires pour MPI3 ou comme sorties statiques.

<!-- BGA-ONLY -->
!!! note "Disponibilité des GPIO en BGA112"
    S'applique uniquement au BGA112. Le SF32LB57x intègre MPI1, MPI2 et MPI3. La [convention de nomenclature des composants SF32](../../sf32-products/family/SF32_namingrule.md) indique la position mémoire interne associée à chaque interface. Dans l'une des trois configurations de mémoire intégrée suivantes, les broches MPI2 et MPI3 sont inaccessibles depuis l'extérieur du boîtier ; seules 58 lignes GPIO restent alors disponibles : (1) une PSRAM sur chacun des bus MPI1 et MPI2 ; (2) une PSRAM de 256 Mb sur MPI2 ; ou (3) une NOR Flash sur MPI3. `SF32LB57GVD776` correspond au cas (3) ; le deuxième `7` du code indique l'utilisation interne de MPI3. Dans toutes les autres configurations, les six E/S BGA112 associées à MPI3 sont disponibles pour MPI3 ou peuvent être configurées, par pull-up ou pull-down, en sorties statiques GP ; ce ne sont pas des GPIO librement affectables. Ainsi, `58 + 6` pour `SF32LB57ZVN7N6` signifie 58 GPIO plus six E/S pour MPI3 ou des sorties statiques, et non 64 GPIO librement affectables.
<!-- /BGA-ONLY -->

<div align="center"><em>Tableau 3.3-2 : Dimensions du boîtier</em></div>

<div align="center" markdown>

| Boîtier | Taille du corps | Épaisseur de la puce | Pas |
|:--------|:----------|:---------------|:------|
| QFN68L | 7 mm x 7 mm | 0,9 mm | 0,35 mm |
| QFN68L | 7 mm x 7 mm | 1,1 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 0,9 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 1,1 mm | 0,35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,98 mm | 0,4 mm |
| BGA112 | 5,4 mm x 4,4 mm | 1,03 mm | 0,4 mm |
<!-- /BGA-ONLY -->

</div>

Points de vérification recommandés :

- La numérotation des broches correspond au brochage de la fiche technique.
- Les broches d'alimentation, de masse, RF, de quartz, USB, d'affichage, de démarrage et de débogage ne sont pas mal placées.
- La mise à la masse du pad exposé QFN et les vias thermiques respectent les règles d'assemblage.
<!-- BGA-ONLY -->
- Le routage (fanout) BGA, les vias aveugles/enterrés, le masque de soudure, les ouvertures de pochoir et la capacité d'assemblage ont été confirmés avec le fournisseur PCB.
<!-- /BGA-ONLY -->

![Figure 3.3-1 : Règle de numérotation des pièces SF32LB57x](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-1 : Règle de numérotation des pièces SF32LB57x</em></div>

![Figure 3.3-2 : Brochage de la variante alimentée par batterie QFN68L](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-2 : Brochage de la variante alimentée par batterie QFN68L</em></div>

![Figure 3.3-3 : Brochage de la variante alimentée en 3,3 V QFN68L](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-3 : Brochage de la variante alimentée en 3,3 V QFN68L</em></div>

![Figure 3.3-4 : Brochage de la variante alimentée par batterie QFN80L](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-4 : Brochage de la variante alimentée par batterie QFN80L</em></div>

![Figure 3.3-5 : Brochage de la variante alimentée en 3,3 V QFN80L](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-5 : Brochage de la variante alimentée en 3,3 V QFN80L</em></div>

<!-- BGA-ONLY -->
![Figure 3.3-6 : Brochage de la variante alimentée par batterie BGA112](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-6 : Brochage de la variante alimentée par batterie BGA112</em></div>

![Figure 3.3-7 : Brochage de la variante alimentée en 3,3 V BGA112](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 3.3-7 : Brochage de la variante alimentée en 3,3 V BGA112</em></div>
<!-- /BGA-ONLY -->

### 3.4. Principales caractéristiques matérielles { #34-major-hardware-features }

- Deux familles d'alimentation courantes : variantes alimentées par batterie et variantes régulées en externe en 3,3 V.
- Boîtiers QFN68L, QFN80L<!-- BGA-ONLY --> et BGA112<!-- /BGA-ONLY -->, chacun avec des exigences spécifiques de brochage, d'empreinte, de pochoir et de procédé PCB.
- Prise en charge de l'affichage via SPI/QSPI, 8080, RGB/DPI, EPD et JDI selon le composant exact et le brochage ; voir la note de la section 3.1 pour la portée de MIPI-DSI.
- Options de stockage et de démarrage via la mémoire intégrée au boîtier et le stockage externe MPI/SDIO.
- Les implantations RF, quartz, audio, caméra, affichage, USB, SDIO et alimentation nécessitent une co-revue précoce du schéma et du PCB.

### 3.5. Applications typiques { #35-typical-applications }

Le SF32LB57x convient aux produits qui ont besoin de capacités d'IA, de caméra ou d'affichage avancé, ainsi que d'une connectivité Bluetooth dans un format compact :

- Montres connectées, montres de sport et autres appareils portables
- Terminaux intelligents portables et commandes domotiques
- Capteurs à intelligence artificielle et appareils d'inférence en périphérie
- Produits Bluetooth équipés de caméra
- Appareils d'affichage avancés utilisant des interfaces SPI/QSPI, RGB/DPI, 8080, EPD ou JDI, selon le composant et la topologie du contrôleur d'affichage choisis
- Produits nécessitant un boîtier compact QFN<!-- BGA-ONLY --> ou BGA<!-- /BGA-ONLY -->, avec de nombreuses options de GPIO et de stockage

## 4. Aperçu de la conception { #4-design-at-a-glance }

### 4.1. Architecture matérielle { #41-hardware-architecture }

<div align="center"><em>Tableau 4.1-1 : Aperçu de la conception</em></div>

<div align="center" markdown>

| Élément de conception | Implémentation typique |
|:---|:---|
| Familles d'alimentation | Variantes alimentées par batterie ou variantes régulées en externe en 3,3 V ; ne mélangez pas les schémas d'alimentation |
| Boîtiers | QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY --> ; sélectionnez le brochage, le POD, l'empreinte et le pochoir correspondant au numéro de pièce commandable exact |
| Procédé PCB | Confirmez avec le fabricant/assembleur de PCB les exigences relatives aux pastilles QFN, aux vias de la pastille exposée et au pochoir<!-- BGA-ONLY --> ; pour le BGA, confirmez aussi tôt la faisabilité du fanout et du procédé de fabrication<!-- /BGA-ONLY --> |
| Horloges | Quartz principal 48 MHz et quartz RTC 32,768 kHz |
| RF | Chemin d'antenne 50 Ω, réseau d'adaptation en π près de la puce, filtrage local de l'alimentation RF |
| Affichage | SPI/QSPI, 8080, RGB/DPI, EPD ou JDI selon la capacité du composant et le brochage ; voir la note de la section 3.1 pour la portée de MIPI-DSI |
| Stockage | Options de mémoire intégrée au boîtier et de stockage externe MPI/SDIO ; le support de démarrage doit être défini avant le routage |
| Audio | Entrée/sortie audio analogique, PDM/I2S, polarisation du microphone, référence audio et options de PA externe |
| Caméra | Interface caméra DCMI ; à router et alimenter comme une interface haute vitesse sensible au bruit |
| Débogage et production | DBG-UART, SWD, configuration de démarrage, PA00/PA01/PA34, rails d'alimentation et points de test de production |

</div>

### 4.2. Flux de conception matérielle { #42-hardware-design-flow }

<div align="center"><em>Tableau 4.2-1 : Flux de conception matérielle</em></div>

<div align="center" markdown>

| Étape | Décision de conception | Sections principales |
|:---|:---|:---|
| 1 | Confirmez le numéro de pièce commandable exact, la famille d'alimentation, le boîtier et le brochage | Présentation du composant |
| 2 | Fixez le support de démarrage, l'interface d'affichage, l'utilisation de la caméra, l'accès de débogage et les cibles basse consommation | Aperçu de la conception, Conception du schéma |
| 3 | Définissez l'arbre d'alimentation, la stratégie de charge/OVP, les composants BUCK/LDO et le comportement à la mise sous tension | Système d'alimentation |
| 4 | Sélectionnez les sources d'horloge, la topologie RF, le stockage, l'affichage, l'audio, la caméra et les interfaces générales | Génération d'horloge, RF, Interfaces utilisateur, Stockage et connectivité |
| 5 | Vérifiez l'empreinte du boîtier, l'empilement, le fanout et le routage RF, quartz, USB, SDIO, affichage, audio et alimentation | Directives de routage PCB |
| 6 | Complétez l'auto-vérification client et archivez les preuves de schéma, disposition, AVL, DRC/ERC, impédance, alimentation, RF et production avant l'EVT | Auto-vérification de conception client |

</div>

### 4.3. Comment utiliser ce guide { #43-how-to-use-this-guide }

Utilisez ce guide en suivant l'ordre de revue d'une carte. Confirmez d'abord le numéro de pièce exact du SF32LB57x et sa famille d'alimentation, choisissez le boîtier et le procédé PCB, puis consultez la fiche technique et le schéma de système minimal correspondant à la section 5.1. Définissez ensuite l'arbre d'alimentation, le support de démarrage et les accès nécessaires au débogage et au téléchargement ; attribuez les fonctions d'E/S à partir du tableau de multiplexage des broches selon les exigences du produit. Une fois le système minimal défini, examinez les horloges, le RF, l'affichage, le stockage, l'audio, la caméra, les interfaces générales, l'implantation et le routage PCB, ainsi que l'accès à la production. La section 5 sert de référence pour le schéma, la section 6 pour la réalisation du PCB, et la section 7 pour l'auto-vérification du client avant la validation ou la diffusion du schéma ou du routage.

### 4.4. Dossier de preuves de revue { #44-review-evidence-pack }

Avant l'EVT, archivez les versions de la fiche technique, du manuel utilisateur et des fichiers de conception de référence, ainsi que le PDF du schéma, l'empilement PCB, le rapport d'impédance, les rapports DRC/ERC, l'arbre d'alimentation, le budget basse consommation, les chemins de charge et de démarrage et la liste des points de test de production. Ajoutez des captures d'écran ciblées montrant le RF, les quartz, l'USB, le SDIO, l'affichage, la caméra, l'audio, le GPADC et le fanout du boîtier.

## Poursuivre le guide de conception { #continue-the-design-guide }

Le guide complet se poursuit sur les pages ci-dessous. Chacune couvre une étape du processus de conception et est accessible depuis ici.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Système minimal et alimentation](SF32LB57x_schematic_system_power.md)__ — correspondance boîtier/famille d'alimentation, straps de démarrage, support de démarrage, accès de débogage/téléchargement, arbre d'alimentation, charge/OVP, BUCK, rails basse consommation et modes de fonctionnement
- :fontawesome-solid-wave-square: __[Horloge, RF et interfaces utilisateur](SF32LB57x_schematic_clock_rf_interfaces.md)__ — quartz 48 MHz et 32,768 kHz, adaptation RF et chemin d'antenne, affichage, tactile/rétroéclairage, audio, caméra, boutons et moteur
- :fontawesome-solid-database: __[Stockage et fabrication](SF32LB57x_schematic_storage_mfg.md)__ — stockage, démarrage, GPIO, tables de multiplexage IO MUX et matrice de broches, UART/I2C/SPI/SDIO/USB/CAN/GPADC, programmation de production, étalonnage et accès aux montages de test
- :fontawesome-solid-list-check: __[Liste de contrôle du schéma](SF32LB57x_schematic_checklist.md)__ — liste de contrôle détaillée de revue du schéma (Section 5.8)
- :fontawesome-solid-microchip: __[Recommandations de placement et de routage PCB](SF32LB57x_pcb_layout.md)__ — empilement, contraintes PCB critiques, routage alimentation/quartz/RF/analogique/audio/haute vitesse, EMI/ESD/EOS et figures de référence
- :fontawesome-solid-list-check: __[Liste de contrôle de la conception du PCB](SF32LB57x_pcb_layout_checklist.md)__ — liste de contrôle détaillée de revue de disposition PCB (Section 6.10)
- :fontawesome-solid-book-open: __[Liste de contrôle de revue de conception et références](SF32LB57x_review_and_reference.md)__ — auto-vérification de conception client, documents associés, annexes et historique des révisions

</div>
