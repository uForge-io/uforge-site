---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle pour le MCU SF32LB58x : architecture d'alimentation, conception d'horloge et RF, affichage, stockage, audio, et directives de disposition PCB."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle du SF32LB58x { #sf32lb58x-hardware-design-guide }

## 1. Introduction { #1-introduction }

Ce guide fournit des recommandations et des documents de référence pour concevoir des produits autour de la famille SF32LB58x de microcontrôleurs AIoT performants. Il s'adresse aux ingénieurs en matériel, aux concepteurs de circuits imprimés et aux développeurs de produits alimentés par batterie qui ont besoin d'interfaces utilisateur évoluées, d'une grande capacité mémoire, du Bluetooth bimode, de fonctions audio, de nombreux GPIO et d'une basse consommation en veille.

Le guide couvre toutes les étapes du développement matériel : PMIC et distribution d'alimentation, fanout du BGA256, planification de l'empilement HDI, circuits d'horloge, conception RF, MIPI-DSI, USB 2.0 High-Speed, SDIO/eMMC, circuits audio, routage PCB, validation et préparation à la fabrication. Ces recommandations contribuent à réduire les risques liés aux conceptions BGA/HDI denses, à préserver l'intégrité des signaux sur les interfaces haute vitesse et à respecter les exigences du SF32LB58x en matière d'alimentation, de boîtier et de production.

Ce document suppose une connaissance de base de la conception matérielle embarquée, de la saisie de schémas et du routage de circuits imprimés haute densité. Il complète la fiche technique et le manuel utilisateur du SF32LB58x, la note d'application matérielle officielle, le dossier de conception de référence et la liste des fournisseurs agréés par SiFli. Ces documents restent les sources de référence pour les spécifications électriques, le multiplexage des broches, les dimensions du boîtier, la qualification des composants et les limites de production.

## 2. Ressources de développement { #2-development-resources }

[Présentation du SF32LB58x]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Fiche technique du SF32LB58x]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[Manuel utilisateur du SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Note d'application matérielle du SF32LB58x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Classeur de la liste de contrôle schématique et PCB du SF32LB58x]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[Liste de fournisseurs approuvés SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Présentation du SF32LB58x][Présentation du SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Fiche technique du SF32LB58x][Fiche technique du SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur du SF32LB58x][Manuel utilisateur du SF32LB58x]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle du SF32LB58x][Note d'application matérielle du SF32LB58x]__
- :fontawesome-solid-file-excel: __[Classeur de la liste de contrôle schématique et PCB du SF32LB58x]__
- :fontawesome-solid-file-excel: __[Liste de fournisseurs approuvés SiFli (AVL)][Liste de fournisseurs approuvés SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons][Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement][Acheter des kits de développement]__

</div>

## 3. Présentation du dispositif { #3-device-overview }

### 3.1. Architecture { #31-architecture }

<div align="center"><em>Tableau 3.1-1 : Résumé des principales fonctionnalités matérielles</em></div>

<div align="center" markdown>

| Fonctionnalité | Description |
|:---|:---|
| Architecture des cœurs | Architecture hétérogène triple cœur : 2x cœurs d'application Arm Cortex-M33 STAR-MC1 jusqu'à 240 MHz et 1x cœur basse consommation Arm Cortex-M33 STAR-MC1 jusqu'à 96 MHz |
| Bluetooth | Émetteur-récepteur Bluetooth 5.3 bimode basse consommation intégré |
| Graphisme | Accélération graphique 2D/2.5D ePicasso 2.0 et graphisme vectoriel Vivante GCNanoUltraV |
| Interfaces d'affichage | MIPI-DSI, SPI/QSPI, MCU8080, DPI, JDI parallèle/série |
| Stockage | Mémoire NOR Flash/PSRAM intégrée au boîtier selon le modèle ; Flash NOR ou SPI NAND externe via MPI3 ou MPI4 ; interfaces SDIO SD1 et SD2 |
| Audio | 3 interfaces I2S, 2 interfaces PDM, entrée/sortie audio analogique différentielle ; prise en charge d'amplificateurs audio analogiques externes et d'amplificateurs audio I2S |
| Interruptions de réveil | Toutes les GPIO peuvent réveiller la puce depuis Light/Deep Sleep. Standby/Hibernate prend en charge 16 sources d'interruption de réveil : 6 sur PA et 10 sur PB |
| Interface PBR | Six broches PBR. PBR0 passe de l'état bas à l'état haut à la mise sous tension et peut commander certains LSW externes ; PBR1-PBR5 sont à l'état bas par défaut. PBR0-PBR5 peuvent émettre LPTIM ou une horloge de 32 kHz et restent utilisables comme sorties en mode Standby/Hibernate. PBR0-PBR3 peuvent être configurées comme entrées de réveil, mais ne génèrent pas d'interruption lorsque le MCU est actif. |

</div>

### 3.2. Variantes { #32-variants }

Avant de figer le schéma, vérifiez la référence exacte du SF32LB58x et sa configuration de mémoire SiP dans la dernière fiche technique et l'AVL. La famille est une plateforme BGA256 qui nécessite un circuit imprimé HDI ; la mémoire SiP varie selon le modèle. Elle permet de connecter une Flash NOR ou SPI NAND externe via MPI3 ou MPI4. Sur l'EVB SiFli, MPI4 est utilisé pour la SPI NAND externe ; SD1 est utilisé pour l'eMMC ou la SD NAND, et SD2 pour une carte SD ou un périphérique Wi-Fi. Avant de finaliser la conception, vérifiez également le brochage de la variante choisie et le routage de la carte cible.

### 3.3. Boîtiers { #33-packages }
<div align="center"><em>Tableau 3.3-1 : Boîtier</em></div>

<div align="center" markdown>

| Nom du boîtier | Dimensions | Pas des broches |
|:---|:---|:---|
| BGA256 | 8,5 mm x 6,5 mm x 0,94 mm | 0,4 mm |

</div>

### 3.4. Principales fonctionnalités matérielles { #34-major-hardware-features }

- Boîtier BGA256 au pas de 0,4 mm, avec un fanout dense pour l'alimentation et les GPIO.
- Procédé HDI obligatoire ; les cartes à trous traversants (PTH) ne sont pas prises en charge.
- PMU intégrée avec 2 sorties BUCK et 3 sorties LDO internes.
- PMIC système SF30147C en option pour gérer l'alimentation de systèmes de type montre connectée.
- Le MIPI-DSI, l'USB2.0 HS, le SDIO/eMMC, la RF, l'audio et le fanout BGA dense nécessitent une confirmation précoce de l'empilement et de l'impédance.

### 3.5. Applications typiques { #35-typical-applications }

Le SF32LB58x convient aux produits connectés qui combinent graphismes avancés, grande capacité mémoire, multimédia et traitements d'IA en périphérie, notamment :

- Montres connectées, montres de sport et montres d'extérieur
- Compteurs de vélo avancés et tableaux de bord embarqués
- Écrans intelligents et tableaux de bord connectés
- Dispositifs portables dotés de fonctions d'IA
- Systèmes d'IA en périphérie et de fusion de capteurs
- Dispositifs IHM haute résolution basés sur LVGL
- Terminaux médicaux et industriels portables
- Accessoires Bluetooth + Wi-Fi utilisant un dispositif Wi-Fi SDIO externe

## 4. Vue d'ensemble de la conception { #4-design-at-a-glance }

### 4.1. Architecture matérielle { #41-hardware-architecture }
<div align="center"><em>Tableau 4.1-1 : Résumé de conception rapide</em></div>

<div align="center" markdown>

| Élément de conception | Implémentation typique |
|:---|:---|
| Boîtier | BGA256, 8,5 mm × 6,5 mm × 0,94 mm, pas de 0,4 mm |
| PCB | Carte HDI uniquement ; PTH non pris en charge. Empilement 6HDI-2 recommandé |
| Alimentation | PMU intégrée (2x BUCK + 3x LDO) ; peut être associée en option au PMIC SF30147C de SiFli pour l'alimentation de l'ensemble du système |
| Inductance Buck | 4,7 µH, DCR ≤ 0,4 Ω, Isat ≥ 500 mA |
| Horloge | Quartz principal 48 MHz + quartz RTC 32,768 kHz |
| RF | Piste à impédance contrôlée de 50 Ω, avec un emplacement prévu pour un réseau d'adaptation en π |
| Affichage | MIPI-DSI (2 voies), SPI à 3/4 fils, Quad-SPI, MCU8080, DPI et JDI parallèle/série ; brochage des deux LCDC : LCDC1 (PA) / LCDC2 (PB) |
| Stockage | Flash NOR ou SPI NAND externe via MPI3 ou MPI4. L'EVB SiFli utilise MPI4 pour la SPI NAND, SD1 pour l'eMMC ou la SD NAND et SD2 pour une carte SD ou un périphérique Wi-Fi |
| Audio | 3x I2S (maître uniquement), 2x PDM, entrée/sortie audio analogique différentielle |
| Débogage | 1x SWD + 6x sorties de débogage UART sélectionnables |
| USB | USB2.0 HS, modes Hôte/Périphérique |

</div>

### 4.2. Flux de conception matérielle { #42-hardware-design-flow }

<div align="center"><em>Tableau 4.2-1 : Flux de conception matérielle</em></div>

<div align="center" markdown>

| Étape | Décision de conception | Sections principales |
|:---|:---|:---|
| 1 | Confirmer la référence de commande, la configuration mémoire SiP et les hypothèses concernant le boîtier BGA256 | Présentation du dispositif, Boîtiers |
| 2 | Figer l'empilement HDI, la structure des vias, les règles d'impédance et les capacités d'assemblage avant de commencer le routage | Conception et routage du PCB |
| 3 | Décider si le PMIC système SF30147C en option est nécessaire, puis définir les rails d'alimentation de la PMU de la puce, les inductances BUCK, les condensateurs LDO, la réinitialisation et la séquence d'alimentation | Système d'alimentation |
| 4 | Choisir le stockage de démarrage, l'interface d'affichage, le mode USB, l'utilisation du SDIO/eMMC, la topologie audio et l'accès au débogage | Stockage et connectivité, Interfaces utilisateur, Fabrication |
| 5 | Examiner les captures d'écran du routage de l'horloge, de la RF, du DSI, de l'USB 2.0 HS, du SDIO/eMMC, de l'audio, du DC/DC, du fanout BGA et de l'ESD | Génération d'horloge, RF, Conception et routage du PCB |
| 6 | Archiver le schéma, l'empilement, les rapports DRC et d'impédance, la vérification AVL, les documents de fabrication et les preuves de conception pertinentes avant de lancer la fabrication du prototype | Liste de contrôle pour la revue de conception |

</div>

### 4.3. Comment utiliser ce guide { #43-how-to-use-this-guide }

Suivez l'ordre d'une revue de carte : confirmez d'abord le boîtier et la configuration mémoire SiP, puis figez l'empilement HDI et la stratégie PMIC. Vérifiez ensuite le stockage de démarrage et le routage de l'affichage, puis les horloges, la RF, l'USB, l'audio, le débogage et l'accès aux tests de production. La section 5 définit la base schématique, la section 6 la mise en œuvre sur PCB et la section 7 la liste de contrôle de sortie.

### 4.4. Dossier de preuves de revue { #44-review-evidence-pack }

Avant de lancer la fabrication du prototype, archivez le PDF du schéma, l'empilement PCB, les informations sur les capacités de fabrication des vias et du procédé, les rapports d'impédance et DRC ainsi que la vérification de l'AVL. Conservez également des captures d'écran ciblées du routage du PMIC, des inductances BUCK, du DSI, de l'USB, du SDIO/eMMC, de la RF, des quartz, de l'audio, du fanout BGA, des retours de masse et des points d'entrée ESD.

### 4.5. Utilisation des listes de contrôle { #using-the-checklists }

Ce guide propose deux niveaux de listes de contrôle. Les listes abrégées des sections 5.2.1.7 et 5.7.3 regroupent les points présentant les risques les plus élevés pour une vérification technique rapide. La [Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md) (section 5.8) et la [Liste de contrôle de disposition PCB](SF32LB58x_pcb_layout_checklist.md) (section 6.18) reprennent, point par point, la *SF32LB58x Schematic & PCB Checklist* complète de SiFli (V1.0, 2026-01-21).

Chaque point est soit obligatoire (à valider avant la sortie), soit optionnel (recommandé si la fonction concernée est utilisée). Le texte en couleur et le texte sur <span class="flag-yellow">fond jaune</span> reprennent les mises en évidence du classeur source. Celui-ci n'en précise pas la raison pour chaque cas : considérez-les comme des repères de revue supplémentaires, et non comme un remplacement des autres points du tableau.

Le classeur de la liste de contrôle source spécifie Isat ≥ 450 mA pour une inductance BUCK hors AVL, tandis que la note d'application matérielle officielle spécifie Isat ≥ 500 mA pour L = 4,7 µH et DCR ≤ 0,4 Ω. La liste de contrôle conserve la valeur du classeur. Dans l'attente d'une clarification de SiFli, choisissez une inductance hors AVL avec un Isat d'au moins 500 mA.

Utilisez la [Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md) lors de la revue du schéma, avant de commencer le routage PCB. Utilisez la [Liste de contrôle de disposition PCB](SF32LB58x_pcb_layout_checklist.md) lors de la revue du routage, avant la livraison des fichiers Gerber. En pratique, chaque vérification est généralement menée deux fois : d'abord par l'ingénieur de conception, puis par une personne indépendante avant le gel de la conception ou le lancement en fabrication.

Pour tirer le meilleur parti des listes de contrôle, utilisez-les comme des documents de validation et non comme de simples listes à lire :

1. Confirmez d'abord la référence exacte du composant et la configuration mémoire SiP.
2. Pendant la revue, indiquez pour chaque point s'il est validé, non validé ou non applicable, au lieu de vous limiter à lire le tableau.
3. Recoupez les points concernant l'affichage, le stockage, le réveil et la basse consommation avec les sections correspondantes du guide de conception matérielle.
4. Consignez toute hypothèse en suspens dans les notes de revue avant la sortie.

<div align="center"><em>Tableau 4.5-1 : Modèle d'enregistrement de revue</em></div>

<div align="center" markdown>

| Champ | Valeur |
|:---|:---|
| Nom du client | |
| Nom du projet client | |
| Date de soumission pour revue | |
| Premier réviseur | |
| Date de première revue | |
| Réviseur de suivi | |
| Date de la revue de suivi | |

</div>

<div align="center"><em>Tableau 4.5-2 : Historique des versions du document de liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Première publication de la liste de contrôle du schéma et du PCB |

</div>

## Poursuivre le guide de conception { #continue-the-design-guide }

Le guide complet se poursuit sur les pages ci-dessous. Chacune couvre une étape du processus de conception et est accessible depuis ici.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Directives de conception schématique](SF32LB58x_schematic_design.md)__ — système d'alimentation, génération d'horloge, RF, interfaces utilisateur, stockage et connectivité, et fabrication
- :fontawesome-solid-list-check: __[Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md)__ — liste de contrôle de revue schématique point par point (Section 5.8)
- :fontawesome-solid-microchip: __[Conception et routage du PCB](SF32LB58x_pcb_layout.md)__ — empreinte du boîtier, empilement, fanout et routage de l'horloge, de la RF, de l'audio, de l'USB, du SDIO, du DSI et de l'alimentation
- :fontawesome-solid-list-check: __[Liste de contrôle de disposition PCB](SF32LB58x_pcb_layout_checklist.md)__ — liste de contrôle de revue de disposition PCB point par point (Section 6.18)
- :fontawesome-solid-book-open: __[Liste de contrôle pour la revue de conception et références](SF32LB58x_review_and_reference.md)__ — liste de contrôle de sortie, documents associés, annexes, et historique des révisions

</div>
