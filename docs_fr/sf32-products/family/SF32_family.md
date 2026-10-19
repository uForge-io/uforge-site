---
icon: lucide/cpu
description: "Présentation de la famille SF32LB5xx : cœurs Cortex-M33 hétérogènes, Bluetooth, graphismes ePicasso et IA embarquée, avec tableau comparatif et guide rapide de choix de puce."
tags:
  - Matériel
  - Puce
---

# Famille SF32 { #sf32-family }

## Introduction { #introduction }

La famille **SF32**, en particulier la série **SF32LB5xx**, est une gamme de microcontrôleurs 32 bits très intégrés et à très basse consommation, développés par SiFli Technologies pour les applications AIoT et les objets portables alimentés par batterie.

Conçus pour combler l'écart entre les microcontrôleurs traditionnels et les processeurs applicatifs, les composants **SF32** réunissent traitement de capteurs basse consommation, connectivité sans fil, accélération graphique, traitement multimédia et mémoire intégrée de grande capacité dans une architecture System-in-Package (SiP) compacte. La famille est conçue pour des produits tels que les montres connectées, les trackers d'activité, les écrans intelligents, les dispositifs médicaux portables et les accessoires connectés dotés de capacités de traitement en périphérie.

La série **LB** (Low-Power Bluetooth) est la première gamme de produits SF32. D'autres séries orientées applications sont prévues.

## Parcours matériel { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Planifier un produit**

    Suivez un parcours unique, des exigences produit et du choix du composant jusqu'à la validation de la carte et à la préparation de la production.

    [Planifier un produit :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **Sélecteur de produits SF32**

    Comparez les familles SF32, choisissez une puce ou un module et identifiez la carte de développement adaptée à la validation précoce.

    [Établir une présélection :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Conception pour la production**

    Passez du composant retenu au schéma, à l'implantation, à la nomenclature, à la CAO, à la liste de contrôle et aux preuves de mise en service.

    [Préparer la conception pour la production :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## Principales caractéristiques { #key-features }

1. **Architecture multicœur hétérogène**

    Les microcontrôleurs SF32LB emploient une architecture multicœur hétérogène fondée sur Arm Cortex-M33 STAR-MC1, qui équilibre un traitement applicatif hautes performances et un fonctionnement d'arrière-plan à très basse consommation. Selon le composant, l'architecture peut comprendre un ou plusieurs processeurs applicatifs, aux côtés de processeurs basse consommation dédiés chargés de la connectivité Bluetooth, du traitement des capteurs et des fonctions système permanentes (always-on).

    !!! info "Processeur STAR-MC1"
        STAR-MC1 est un bloc IP de processeur Armv8-M Mainline configurable d'Arm China, utilisé comme processeur applicatif de classe Cortex-M33 dans les composants SF32 compatibles. Le firmware, les middlewares, les portages de RTOS et les outils conçus pour Cortex-M33 restent pertinents, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

        Pour des indications propres à chaque composant sur la configuration, la TCM, les caches, le CDE, les coprocesseurs et la mesure de performances représentatives, voir [Analyse approfondie de l'architecture STAR-MC1](../../learn/architecture/star-mc1.md).


2. **Connectivité sans fil à très basse consommation**

    La série SF32LB intègre directement sur la puce la connectivité Bluetooth Low Energy (BLE) ou Bluetooth bimode (BT/BLE).

    Les modes Bluetooth pris en charge et les performances RF varient selon le composant. Pour la référence exacte, consultez la fiche technique et la conception de référence validée afin de connaître les modes pris en charge, les réglages de puissance d'émission, la sensibilité du récepteur et la consommation ; le positionnement au niveau de la famille ne remplace pas ces valeurs.

3. **Moteur graphique et d'affichage avec accélération matérielle**

    Tous les microcontrôleurs SF32LB intègrent ePicasso, un moteur graphique 2,5D développé en interne par SiFli, ainsi qu'un contrôleur d'affichage distinct.

    L'accélération matérielle réduit sensiblement la charge du CPU pour les tâches graphiques courantes, telles que :

    * La fusion alpha
    * La mise à l'échelle d'image
    * La rotation et la transformation
    * La composition de couches
    * Le rendu de l'interface utilisateur

    Dans la famille SF32LB, les interfaces et types d'affichage sont les suivants. La disponibilité varie selon le composant ; vérifiez la référence exacte au lieu de supposer que chaque composant prend en charge tous les éléments listés.

    * SPI / DSPI / QSPI
    * Interface MCU 8080
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (pour les écrans Memory-in-Pixel)

    Sur les composants dotés des interfaces d'affichage requises, des frameworks graphiques tels que LVGL peuvent exploiter le moteur d'accélération matérielle pour offrir des interfaces fluides et réactives sur écrans TFT, AMOLED, papier électronique (EPD) et Memory-in-Pixel (MiP).

4. **IA embarquée et accélération neuronale**

    Certains composants SF32 intègrent des accélérateurs matériels dédiés à l'apprentissage automatique, au traitement multimédia et aux charges de fusion de capteurs.

    Les capacités peuvent inclure :

    * L'accélération de réseaux de neurones
    * Le traitement audio
    * La reconnaissance vocale
    * Des interfaces caméra (DVP et SPI)
    * Des algorithmes de fusion de capteurs et de biométrie

    Ces fonctions permettent une inférence d'IA à faible latence directement sur l'appareil, tout en minimisant la consommation et la dépendance au cloud.

5. **Mémoire System-in-Package (SiP) haute densité**

    Pour prendre en charge les applications gourmandes en graphismes et dotées d'IA, les composants SF32 intègrent des architectures de cache d'instructions et de données optimisées pour une exécution hautes performances depuis la mémoire externe.

    Les mémoires intégrées au boîtier disponibles peuvent comprendre :

    * Jusqu'à 256 Mb de flash NOR
    * Jusqu'à 512 Mb de PSRAM

    Seules certaines références incluent une flash NOR ou une PSRAM intégrée au boîtier. Une configuration SiP peut réduire le nombre de composants mémoire montés séparément et le routage associé ; toutefois, le type de mémoire, la capacité, l'interface, l'alimentation et les broches accessibles de l'extérieur dépendent de la référence exacte. Consultez sa fiche technique et le brochage du boîtier avant de finaliser la carte.

## Comparaison des microcontrôleurs SF32 { #sf32-microcontroller-comparison }

<div align="center"><em>Comparaison des microcontrôleurs SF32</em></div>

Les valeurs ci-dessous résument les capacités au niveau de la famille, et non des capacités garanties pour chaque référence. La disponibilité des interfaces et les nombres de ressources peuvent varier selon la référence exacte, le boîtier ou la configuration ; vérifiez la fiche technique du composant retenu.

<div align="center" markdown>

| Caractéristique | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Positionnement | Entrée de gamme | Gamme généraliste, BLE uniquement | Avancé | Calcul amélioré | Haut de gamme |
| CPU applicatif | Cortex-M33 @240 MHz | Cortex-M33 @240 MHz | Cortex-M33 @240 MHz | 2× Cortex-M33 @240 MHz | 2× Cortex-M33 @240 MHz |
| CPU basse consommation | Cortex-M33 @24/48 MHz, contrôleur Bluetooth dédié | Cortex-M33 @48 MHz, programmable par l'utilisateur | Cortex-M33 @48/96 MHz, programmable par l'utilisateur | Cortex-M33 @24 MHz, contrôleur Bluetooth dédié | Cortex-M33 @48/96 MHz, programmable par l'utilisateur |
| SRAM interne | 576 KB | 1 312 KB | 960 KB | 592 KB | 3,7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Accélérateur graphique | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + graphismes vectoriels<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Prise en charge de l'affichage | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| ADC audio | 1x | n/d | 1x | 2x | 2x |
| DAC audio | 1x | n/d | 1x | 1x | 2x |
| Interfaces audio PDM | 1x | 1–2x* | 2x | 2x | 2x |
| Interfaces audio I²S | 1x | 1–2x* | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | n/d | n/d | 1x | 2x | 2x |
| PSRAM intégrée au boîtier | Jusqu'à 16 MB | Jusqu'à 16 MB + 2 MB | Jusqu'à 16 MB | Jusqu'à 32 MB | Jusqu'à 32 MB + 32 MB |
| Flash NOR intégrée au boîtier | Jusqu'à 4 MB | Jusqu'à 8 MB | Jusqu'à 1 MB | Jusqu'à 32 MB | Jusqu'à 8 MB |
| Nombre de GPIO | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58 ; jusqu'à 6 E/S BGA112 supplémentaires* | 154 |
| Options de boîtier | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Empreinte du boîtier (L × l) | 7 × 7 mm | 7 × 7 mm | QFN : 7 × 7 mm<br>BGA : 6,5 × 6,1 mm | QFN68 : 7 × 7 mm<br>QFN80 : 8 × 8 mm<br>BGA : 5,4 × 4,4 mm | 8,5 × 6,5 mm |
| Alimentation | 3,2–4,7 V (520/3/5/7)<br>2,97–3,63 V (52B/E/G/J)<br>1,8 V (52D) | 1,71–3,63 V | 1,71–3,63 V | 3,2–4,7 V<br>2,97–3,63 V | 1,71–3,63 V |

</div>

**Note sur les variantes du SF32LB55x :** le nombre d'interfaces audio dépend du code de commande : les variantes SF32LB551/553/555 ont une interface PDM et une interface I²S ; le SF32LB557VD3A6 en a deux de chaque. Le résumé des boîtiers de la dernière [fiche technique du SF32LB55x (V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) indique 119 GPIO pour le BGA169 (71 HCPU + 48 LCPU), mais le tableau détaillé des séries de produits de la même fiche technique donne 71 HCPU + 42 LCPU = 113 pour le SF32LB557. Le [guide des modèles de puces SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) actuel indique lui aussi 71 + 42 = 113 pour le SF32LB557VD3A6. SiFli n'explique pas cet écart au sein de la fiche technique ; cette comparaison retient la valeur de 113 GPIO propre à la référence. Confirmez la référence exacte à l'aide de sa fiche technique et de son tableau de broches avant d'affecter les broches. Chaque interface PDM peut connecter jusqu'à deux microphones numériques ; le nombre d'interfaces n'est pas le nombre de microphones.

**Note sur la flash NOR intégrée du SF32LB55x :** le maximum de 8 MB de la famille inclut la configuration SS6600A8 documentée séparément : deux composants NOR QSPI de 4 MB configurés comme un seul NOR OSPI de 8 MB. Les codes de commande à préfixe SF32 listés pour le SF32LB55x disposent d'un maximum de 4 MB de flash NOR intégrée au boîtier ; vérifiez le modèle exact.

**Note sur le BGA112 du SF32LB57x :** cette note ne s'applique qu'au BGA112. Le SF32LB57x possède des interfaces internes MPI1, MPI2 et MPI3 ; leurs positions dans une référence sont expliquées dans la [convention de nommage SF32](SF32_namingrule.md). Dans chacune de ces configurations de mémoire intégrée au boîtier, les broches de MPI2 et MPI3 ne sont pas accessibles de l'extérieur, ce qui laisse un nombre fixe de 58 GPIO : (1) une PSRAM sur chacune des interfaces internes MPI1 et MPI2 ; (2) une PSRAM de 256 Mb sur l'interface interne MPI2 ; ou (3) une flash NOR sur l'interface interne MPI3. Le `SF32LB57GVD776` correspond au cas (3) : le second `7` de son code final `776` indique un composant interne sur MPI3, de sorte que seuls 58 GPIO sont disponibles. Dans les autres configurations BGA112, les six E/S supplémentaires du boîtier peuvent servir à MPI3 ou de sorties statiques GP configurées par résistance de rappel haut ou bas (pull-up/pull-down) ; ce ne sont pas des GPIO sans restriction. Par exemple, la notation `58 + 6` du `SF32LB57ZVN7N6` signifie 58 GPIO utilisables plus six broches disponibles pour MPI3 ou des sorties statiques. Les boîtiers QFN68 et QFN80 échappent à cette contrainte du BGA112 ; ils n'offrent que leur nombre de GPIO indiqué, sans option MPI3 ou de sortie statique supplémentaire. Pour la référence exacte, voir la page produit du SF32LB57x et sa fiche technique.

**Précision sur le nombre de GPIO du SF32LB58x :** la [fiche technique DS5801 V1.8.3](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf) et la comparaison de famille de SiFli indiquent 154 GPIO au total (HPSYS : 94 ; LPSYS : 60). Le [guide des modèles de puces](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) distinct indique HCPU : 94 et LCPU : 66, soit 160, ce qui contredit le total de la fiche technique. Cette comparaison suit la fiche technique ; vérifiez les broches utilisables dans le tableau des broches du boîtier de la référence exacte avant de les affecter.

## Choisir le bon SF32 { #choosing-the-right-sf32 }

La famille SF32LB5xx couvre les appareils connectés alimentés par batterie, des produits Bluetooth à coût optimisé jusqu'aux systèmes dotés de graphismes avancés et de fonctions d'IA. Les membres de la famille partagent une base de SDK, mais la configuration des processeurs, les périphériques, les cartes mémoire, les boîtiers et les affectations de broches peuvent différer. Un portage peut nécessiter des modifications du code de démarrage, des pilotes, des réglages de l'éditeur de liens ou des partitions, du multiplexage des broches et de la configuration du SDK ; validez le résultat sur le composant cible.

Pour choisir un composant, tenez compte des exigences clés suivantes :

* Connectivité Bluetooth (BLE ou BT/BLE bimode)
* Interface d'affichage et résolution
* Capacités audio et multimédias
* Capacité mémoire
* Besoin en GPIO
* Performances graphiques
* Charges d'IA et de traitement de capteurs
* Objectifs de consommation

<div align="center"><em>Guide rapide de sélection</em></div>

<div align="center" markdown>

| Choisissez ... | Si votre application exige ... | Applications typiques |
| : ---      | : ---  | : --- |
| SF32LB52x  | • Bluetooth bimode (BT/BLE)<br> • ADC et DAC audio intégrés<br> • Charge de batterie Li-ion intégrée<br> • Jusqu'à 45 GPIO<br> • Résolutions d'affichage jusqu'à 512 × 512<br> • Une solution compacte et économique<br> | • Montres connectées et bracelets d'activité d'entrée de gamme<br> • Modules Bluetooth et adaptateurs sans fil<br> • Accessoires audio Bluetooth<br> • Capteurs intelligents et objets portables<br> • Étiquettes électroniques de rayon et badges intelligents<br> • Imprimantes d'étiquettes portables<br> • Afficheurs pour vélos et trottinettes électriques<br> • Appareils IHM de base reposant sur LVGL |
| SF32LB55x  | • Bluetooth Low Energy (BLE)<br> • Écrans MIPI DSI en mode commande<br>• Grande capacité de SRAM pour les algorithmes de traitement de capteurs<br> • Plus de 45 GPIO<br> • Capacités étendues de traitement basse consommation | • Bracelets d'activité et trackers d'activité<br> • Compteurs de sport et de cyclisme<br> • Objets portables riches en capteurs<br> • Appareils de suivi de la santé<br> • Périphériques BLE alimentés par batterie |
| SF32LB56x  | • Bluetooth bimode (BT/BLE)<br> • Interfaces d'affichage RGB/DPI<br> • ADC et DAC audio intégrés<br> • Résolutions d'affichage jusqu'à 1024 × 600<br> • Connectivité Wi-Fi externe via SDIO<br> • Capacité de GPIO accrue | • Montres connectées à interfaces utilisateur avancées<br> • Systèmes IHM connectés<br> • Dispositifs médicaux et de santé<br> • Appareils portables industriels<br> • Instruments portatifs<br> • Afficheurs avancés pour vélos et trottinettes électriques|
| SF32LB57x | • Bluetooth bimode (BT/BLE), BLE Audio et LE Long Range<br> • Graphismes ePicasso 3.0/eZip 3.0 avec interfaces d'affichage RGB<br> • Entrée caméra DCMI et ADC/DAC audio haute fidélité intégrés<br> • Résolutions d'affichage jusqu'à 1024 × 600<br> • Délestage vers le PTM pour des E/S déterministes ou un minutage de périphériques personnalisé<br> • Jusqu'à 58 GPIO à usage général ; lorsque la configuration SiP le permet, le BGA112 offre aussi jusqu'à 6 E/S pour MPI3 ou des sorties statiques GP configurées en pull-up/pull-down<br> • Interfaces de stockage SD/SDIO/eMMC | • Montres connectées avancées compactes<br> • Appareils IHM riches en affichage et à papier électronique<br> • Produits Bluetooth dotés d'une caméra<br> • Appareils portables d'audio et d'enregistrement<br> • Panneaux de commande domotiques |
| SF32LB58x  | • Bluetooth bimode (BT/BLE)<br> • Rendu graphique avancé, y compris graphismes vectoriels<br> • Écrans MIPI DSI en mode commande ou en mode vidéo<br> • Résolutions d'affichage jusqu'à 1280 × 800<br> • Grandes configurations mémoire<br> • Forte densité et nombre élevé de GPIO<br> • Connectivité Wi-Fi externe via SDIO<br> • Charges d'IA embarquée et d'apprentissage automatique | • Montres connectées haut de gamme<br> • Objets portables de sport et de plein air<br>• Compteurs de vélo avancés<br> • Écrans intelligents et tableaux de bord connectés<br> • Objets portables dotés d'IA<br> • Systèmes d'IA embarquée et de fusion de capteurs|

</div>

## Compatibilité logicielle au sein de la famille { #software-compatibility-across-the-family }

La plateforme SF32 fournit une base logicielle et de SDK commune. Toutefois, la configuration des processeurs, les périphériques, les cartes mémoire, les boîtiers et les affectations de broches peuvent différer. Un portage peut nécessiter d'adapter le code de démarrage, les pilotes, les réglages de l'éditeur de liens ou des partitions, le multiplexage des broches et la configuration du SDK, puis une validation sur le matériel cible.

Évaluez la réutilisation logicielle et l'effort de migration en même temps que les exigences de performances, de mémoire, d'affichage et de connectivité. Ne supposez pas que des composants d'une même famille sont compatibles broche à broche ni que le firmware fonctionnera sans modification.

## Liens de référence { #reference-links }

- [Site officiel de SiFli](https://www.sifli.com/)
- [Wiki SiFli](https://wiki.sifli.com/)
- [Documentation logicielle SiFli](https://docs.sifli.com/)
- [OpenSiFli sur GitHub](https://github.com/OpenSiFli/)
- [Boutique Taobao officielle de SiFli](https://sifli.taobao.com/)
