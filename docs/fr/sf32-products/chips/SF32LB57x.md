---
icon: lucide/microchip
description: "SF32LB57x : famille de MCU AIoT multicœur très basse consommation avec Bluetooth bimode, deux cœurs 240 MHz, graphismes ePicasso 3.0, eZip 3.0 et boîtiers QFN/BGA compacts."
tags:
    - Matériel
    - Puce
---

# SF32LB57x { #sf32lb57x }

## Présentation { #overview }

La série SF32LB57x est une famille de MCU AIoT à très basse consommation destinée aux objets portables, aux appareils intelligents portatifs, à la maison connectée et aux produits à écran compact. Elle répond aux besoins en capacités graphiques, audio Bluetooth, entrée caméra, stockage externe et fonctionnement permanent (always-on) qui dépassent ceux d'un microcontrôleur Bluetooth de base, sans les compromis de consommation, de coût et d'intégration d'une plateforme de classe processeur applicatif. SiFli la propose pour 2026 comme successeur des SF32LB52x et SF32LB56x, avec un positionnement tarifaire compétitif. Elle offre davantage de puissance CPU, de meilleures performances graphiques, plus de GPIO avec des boîtiers QFN économiques et faciles à mettre en œuvre, ainsi que des configurations de mémoire intégrée au boîtier plus flexibles. Côté graphismes, elle prend en charge jusqu'à 1024 × 600 en RGB888 (24 bits).

Le SF32LB57x repose sur une architecture à trois cœurs Arm Cortex-M33 STAR-MC1[^1] : deux cœurs de performance (HCPU et ACPU) cadencés jusqu'à 240 MHz, pour un total de 1968 CoreMark / 740 DMIPS, auxquels s'ajoute le cœur basse consommation LCPU à 24 MHz. Selon le [guide d'utilisation de l'ACPU](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) de SiFli, l'ACPU gère le traitement audio et graphique, tandis que le LCPU exécute le BLE et traite les données des capteurs à moindre consommation. La plateforme intègre 592 Ko de SRAM de rétention, les moteurs graphiques ePicasso 3.0 et de décompression eZip 3.0, des contrôleurs LCD et caméra DCMI, le Bluetooth bimode, l'audio ADC/DAC, des interfaces de mémoire SiP et externe, l'accélération de sécurité et l'affectation flexible des broches FreeIO. Son principal atout est le PTM (Parallel Task Machine), un petit processeur de tâches parallèles qui décharge les CPU principaux du séquencement cadencé des périphériques, des protocoles d'E/S personnalisés, de l'acquisition de données de capteurs, du minutage de type PWM et de la gestion des événements.

Arrêtez votre choix sur la référence commandable exacte avant de réutiliser un schéma ou de commencer l'implantation du circuit imprimé. Le SF32LB57x est disponible en boîtiers QFN68, QFN80 et BGA112, avec des variantes alimentées par batterie ou par une source externe régulée à 3,3 V, selon la famille de références. Ce choix détermine l'arbre d'alimentation, le nombre de GPIO disponibles, le routage des broches du boîtier, celui de l'affichage et du stockage, l'accès au débogage et la stratégie de mise en service.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

[^2]: **BGA112 uniquement.** Le SF32LB57x intègre MPI1, MPI2 et MPI3 ; pour les positions internes de la mémoire intégrée au boîtier, voir la [convention de numérotation des références SF32](../family/SF32_namingrule.md). Dans chacune de ces configurations de mémoire intégrée au boîtier, les broches de MPI2 et MPI3 ne sont pas accessibles de l'extérieur, ce qui ne laisse que 58 GPIO : (1) une PSRAM sur MPI2, seule ou avec une PSRAM sur MPI1 ; ou (2) une flash NOR sur MPI3. Le `SF32LB57GVD776` correspond au cas (2) : son second `7` identifie le composant interne sur MPI3, de sorte que seuls 58 GPIO sont disponibles. Dans toutes les autres configurations, les six E/S du BGA112 associées à MPI3 sont disponibles pour MPI3 ou comme sorties statiques GP configurées par résistance de rappel haut ou bas (pull-up/pull-down) ; ce ne sont pas des GPIO sans restriction. L'entrée `58 + 6` du `SF32LB57ZVN7N6` signifie donc 58 GPIO utilisables plus 6 broches pour MPI3 ou des sorties statiques, et non 64 GPIO librement affectables. Cette limitation ne s'applique pas aux boîtiers QFN68 et QFN80, qui n'exposent que leur nombre nominal de GPIO et n'ont aucune option MPI3 ou de sortie statique supplémentaire.

[^3]: Les dimensions et épaisseurs des boîtiers correspondent aux tableaux de commande et aux plans des fiches techniques SF32LB57x de SiFli (DS5701 et DS5702) : QFN68 (7 × 7 mm, épaisseur de 0,9 mm ou 1,1 mm), QFN80 (8 × 8 mm, épaisseur de 0,9 mm ou 1,1 mm) et BGA112 (5,4 × 4,4 mm, épaisseur de 0,98 mm). Les références dotées de trois puces mémoire (une puce PSRAM et deux puces QSPI-NOR) utilisent l'option de boîtier la plus épaisse : 1,1 mm pour le QFN68 et 1,03 mm pour le BGA112, selon le guide d'application matérielle de SiFli. Les tableaux de commande des fiches techniques ne répertorient pas la SF32LB57ZVN7N6 ; son épaisseur BGA112 est donc tirée du seul plan BGA112 fourni par les fiches techniques (0,98 mm). Le schéma de numérotation propre au SF32LB57x associe U au QFN68, Y au QFN80 et V au BGA112 ; ne supposez pas que la correspondance de Y s'applique aux autres familles SF32. Vérifiez auprès de SiFli l'épaisseur et le plan du boîtier pour la référence exacte.
[^4]: Pour la série sur batterie, la fiche technique du SF32LB57x de SiFli (DS5701) indique 3,0–4,7 V pour VBAT et VCC, avec une tension de mise sous tension de 3,5 V ±10 %. Le guide de conception matérielle de SiFli indique une entrée plus étroite, de 3,45–4,7 V (QFN68 tableau 2-1-1, QFN80 tableau 2-1-3, BGA112 tableau 2-1-5) ; les deux documents diffèrent, donc confirmez la broche d'entrée applicable et les limites dans la fiche technique de la référence exacte.
[^5]: L'entrée de tension d'E/S résume les domaines d'E/S pris en charge ; elle ne signifie pas que chaque broche peut utiliser l'une ou l'autre tension. VDDIOA, lorsqu'elle est alimentée séparément, alimente les GPIO. VDDIOSB, lorsqu'elle existe, est le rail d'E/S de la mémoire SiP ; le guide de SiFli indique 1,8 V pour la PSRAM intégrée au boîtier et 3,3 V pour la flash NOR. Pour la série QFN68 en 3,3 V, le tableau 2-1-2 spécifie VDDIOA uniquement à 3,3 V. Vérifiez chaque broche/domaine à l'aide du guide du boîtier et de la fiche technique de la référence exacte.
[^6]: Double puce : les deux puces mémoire sont distinctes, reliées à des interfaces MPI séparées et accessibles indépendamment l'une de l'autre.

## Applications { #applications }

**SF32LB57x convient particulièrement aux** produits connectés compacts qui associent affichage graphique, audio Bluetooth, entrée caméra, stockage externe ou détection permanente sur une plateforme MCU basse consommation, notamment :

- Montres connectées, bracelets d'activité et dispositifs médicaux portables
- Appareils intelligents d'interface homme-machine, terminaux et panneaux de commande centrés sur l'affichage
- Appareils à papier électronique et cadres photo numériques
- Petits et moyens appareils électroménagers connectés et serrures intelligentes
- Enregistreurs audio portables et appareils Bluetooth de type talkie-walkie ou interphone
- Appareils portables ou de poche dotés d'une caméra
- Produits industriels d'affichage, de détection, de surveillance et d'instrumentation
- Contrôleurs de console centrale automobile, clés de voiture sans fil et télécommandes de véhicule
- Réseaux Bluetooth Mesh et concentrateurs de capteurs basse consommation

Consultez la section [Caractéristiques et spécifications](#features-and-specs) pour les capacités graphiques, caméra, audio, de stockage et PTM qui répondent à ces besoins. La version Bluetooth 6.3 est indiquée dans les fiches techniques SF32LB57x ; les fiches produit mentionnent encore une version antérieure. Confirmez les fonctions optionnelles dans la documentation SiFli la plus récente correspondant à la référence commandable exacte.

## Ressources de développement { #development-resources }

[Guide de conception matérielle (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[Liste des fournisseurs agréés SiFli (AVL)]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __Fiche produit ([batterie](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3,3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __Fiche technique ([batterie / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3,3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-solid-file-lines: __[Guide de conception d'origine (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[Guide du kit de développement (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (μForge)]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs agréés SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Deux cœurs de performance Arm Cortex-M33 STAR-MC1 jusqu'à 240 MHz, avec FPU et MPU (1968 CoreMark / 740 DMIPS au total)
- Cœur basse consommation Arm Cortex-M33 STAR-MC1 à 24 MHz
- Cache d'instructions de 32 Ko + cache de données de 16 Ko (HCPU)
- 592 Ko de SRAM de rétention (512 Ko HPSYS + 80 Ko LPSYS), dont 128 Ko de D-TCM sans cycle d'attente
- Mémoire intégrée au boîtier selon la variante, jusqu'à 48 Mo de PSRAM et 32 Mo de flash NOR

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- Parallel Task Machine à 4 cœurs pour les tâches de périphériques personnalisées, avec une exécution cadencée par le matériel plutôt qu'un service continu par le CPU
- Minutage au cycle près pour un séquencement d'E/S déterministe
- Jusqu'à 16 canaux d'E/S par cœur, avec prise en charge FIFO/DMA
- Accès à la mémoire AHB et aux registres des périphériques, aux interruptions CPU et aux événements inter-cœurs

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth 6.3 bimode (Bluetooth Classic et BLE), avec BLE Audio et LE Long Range
- Puissance d'émission maximale :
    - 17 dBm pour BLE/BR
    - 13 dBm pour EDR2 et EDR3
- Sensibilité : −100 dBm @ BLE 1 Mbps

### Graphiques, affichage et caméra { #graphics-display-and-camera }

Pour connaître la résolution maximale et les interfaces d'affichage prises en charge par chaque famille et variante, consultez la [Matrice des interfaces par famille et variante](../../learn/graphics/display-controller.md#per-device-interface-matrix).

- Accélérateur graphique 2D/2,5D ePicasso 3.0, jusqu'à 2048 × 2048
- Décodeur matériel eZip 3.0 pour eZip/eZip-A sans perte, ainsi que JPEG et MJPEG
- Contrôleur LCD dédié prenant en charge 8080, SPI/DSPI/QSPI, DPI/RGB, JDI et EPD 8/16 bits
- Contrôleur de caméra DCMI prenant en charge DVP et SPI/DSPI/QSPI

### Audio et analogique { #audio-and-analog }

- 1 DAC audio 24 bits, RSB de 109 dB
- 2 ADC audio 24 bits, RSB de 97 dB
- 1 ADC 12 bits à usage général (12 canaux)
- Capteur de température

### Stockage et sécurité { #storage-and-security }

- 3 MPI (QSPI) pour NOR, NAND et PSRAM QPI, avec XIP
- 2 SD3.0/SDIO3.0/eMMC
- Accélérateurs matériels AES/HASH/CRC
- TRNG
- Déchiffrement à la volée de la flash et architecture de sécurité eShield
- PSA Certified Level 1

### Périphériques et E/S { #peripherals-and-ios }

- 3 UART
- 4 I2C
- 2 SPI
- 2 I2S
- 2 interfaces PDM (jusqu'à deux microphones numériques chacune)
- 1 USB 2.0 FS
- 2 CAN
- RTC, chiens de garde (watchdog) et temporisateurs à usage général (GPTIM, BTIM, ATIM, LPTIM) avec PWM
- Jusqu'à 58 GPIO selon le boîtier et la référence, avec affectation flexible FreeIO

### Gestion de l'alimentation { #power-management }

- Convertisseur Buck intégré et LDO basse consommation ; deux sorties externes 3,3 V, jusqu'à 150 mA chacune
- Courant en hibernation : 2,8 µA à 3,8 V (référence sur batterie) ou 1 µA à 3,3 V (référence alimentée de l'extérieur)
- Chargeur Li-ion jusqu'à 400 mA (4,2 V à 4,45 V) sur la référence sur batterie
- Plage d'entrée batterie/système[^4] : 3,0 V à 4,7 V
- Plage VBUS : 4,5 V à 5,5 V
- Plage de température de fonctionnement : −40 °C à +85 °C

## Variantes de la famille { #family-variants }

Le SF32LB57x comprend des variantes alimentées par batterie et des variantes pour systèmes en 3,3 V régulé externe. Choisissez la référence exacte avant la saisie du schéma, car les plans de boîtier, les broches d'alimentation, le nombre de GPIO disponible, la mémoire intégrée et les contraintes de carte diffèrent au sein de la famille.

Les références ci-dessous proviennent des tableaux de commande des fiches techniques du SF32LB57x de SiFli (DS5701 et DS5702, toutes deux des versions préliminaires), à l'exception de `SF32LB57ZVN7N6`, que ces tableaux ne répertorient pas. Confirmez chaque code de commande exact, la configuration de la mémoire intégrée au boîtier, les limites électriques et le plan du boîtier dans la documentation SiFli à jour propre à la référence avant l'intégration.

La répartition pratique pour le choix du composant est la suivante :

- **`SF32LB57xU`** : QFN68, groupe sur batterie lithium-ion (niveau à chiffre, p. ex. `3`/`5`/`7`)
- **`SF32LB57XU`** : QFN68, groupe standard à alimentation externe 3,3 V (niveau à lettre, p. ex. `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`** : QFN80 / BGA112, groupe à alimentation externe 3,3 V.

La fiche technique de la série sur batterie (DS5701) répertorie aussi un QFN80 alimenté par batterie (8 × 8 mm, 58 GPIO) et un BGA112 alimenté par batterie (jusqu'à 58 GPIO plus 6 E/S GPO ou d'interface MPI). Son tableau de commande ne contient toutefois aucune référence de QFN80 ni de BGA112 alimenté par batterie ; confirmez donc la référence commandable auprès de SiFli avant de concevoir autour de l'un ou l'autre.

<div align="center"><em>Variantes QFN68 du SF32LB57x (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Boîtier | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Dimensions en vue de dessus[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Épaisseur[^3] | 0,9 mm | 1,1 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Pas | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| PSRAM intégrée au boîtier | 4 Mo OPI-PSRAM | 4 Mo OPI-PSRAM | 4 Mo OPI-PSRAM | 8 Mo OPI-PSRAM | 16 Mo OPI-PSRAM | Aucune |
| Flash NOR intégrée au boîtier | 16 Mo QSPI-NOR | 16 Mo + 8 Mo QSPI-NOR (double puce)[^6] | 16 Mo × 2 QSPI-NOR (double puce)[^6] | Aucune | Aucune | 1 Mo QSPI-NOR |
| Alimentation[^4] | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | **3,3 V** |
| Tension d'E/S[^5] | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V |
| Température | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C |

</div>

<div align="center"><em>Variantes QFN80 / BGA112 du SF32LB57x (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Boîtier | QFN80 | QFN80 | BGA112 | BGA112 |
| Dimensions en vue de dessus[^3] | 8 × 8 mm | 8 × 8 mm | 5,4 × 4,4 mm | 5,4 × 4,4 mm |
| Épaisseur[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 1,03 mm |
| Pas | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIO | 58 | 58 | 58 + 6 (MPI3 ou sorties statiques)[^2] | 58[^2] |
| PSRAM intégrée au boîtier | 8 Mo (2 × 4 Mo, double puce) OPI-PSRAM[^6] | 16 Mo OPI-PSRAM | Aucune | 16 Mo OPI-PSRAM |
| Flash NOR intégrée au boîtier | Aucune | 16 Mo QSPI-NOR | 16 Mo QSPI-NOR | 32 Mo (2 × 16 Mo, double puce) QSPI-NOR[^6] |
| Alimentation | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tension d'E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Température | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C |

</div>

Pour le SF32LB57x, le choix du boîtier n'est pas qu'une question de coût de circuit imprimé. Il influe sur la disponibilité de l'interface d'affichage, le routage du stockage externe, le budget de GPIO, la conservation des broches de débogage/téléchargement et la difficulté d'éclatement ; il doit donc être arrêté en même temps que l'architecture d'alimentation. Utilisez la référence commandable, et pas seulement le nom du boîtier, comme base de la nomenclature et du schéma — le suffixe de mémoire modifie la configuration de stockage SiP et peut affecter les hypothèses sur le support de démarrage, la séquence d'alimentation et les besoins en stockage externe.

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB57x en conception validée :

1. **Valider le parcours de développement du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour valider les fonctions graphiques, audio, caméra, Bluetooth et stockage prévues.
2. **Planifier le matériel d'évaluation.** Utilisez la carte [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) pour évaluer l'affichage, la caméra, l'audio et la connectivité. Avant de la prendre comme référence pour un produit 57x, vérifiez la configuration mémoire du module, la révision de la carte et la configuration des broches partagées.
3. **Concevoir et relire le matériel.** Utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) local — y compris son [autocontrôle de la conception client](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — et la séquence de revue [Conception pour la production](../../hardware/design-for-production.md) avant de valider le schéma ou l'implantation ; une liste de contrôle μForge propre à la famille n'est pas publiée pour l'instant.
4. **Vérifier la source faisant autorité.** Confirmez la référence commandable et le boîtier exacts à l'aide de la [fiche technique], du [manuel utilisateur] et du [guide de conception d'origine] de SiFli, et utilisez la [Liste des fournisseurs agréés SiFli (AVL)] pour maîtriser les choix critiques de la nomenclature.

<!-- uf-faq:start -->
## Questions fréquentes { #frequently-asked-questions }

**Quelles sont les principales caractéristiques du SF32LB57x ?**
Le SF32LB57x associe un CPU applicatif (2× Cortex-M33 @240 MHz) à un cœur basse consommation (Cortex-M33 @24 MHz, contrôleur Bluetooth dédié). Il intègre 592 KB de SRAM interne et prend en charge le Bluetooth bimode (BT classique + BLE). Graphismes : ePicasso 3.0 + eZip 3.0. Boîtier : QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5,4 × 4,4 mm (BGA112)). USB 2.0 FS.

**Quelles interfaces d'affichage le SF32LB57x prend-il en charge ?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. ([Matrice des interfaces par famille et variante](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**Quelle est la résolution d'affichage maximale du SF32LB57x ?**
La résolution maximale est de 1024 × 600 en couleur RGB888, via l'interface DPI/RGB. ([Matrice des interfaces par famille et variante](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**Quelle capacité de mémoire intégrée au boîtier offre le SF32LB57x ?**
Jusqu'à 48 MB de PSRAM et jusqu'à 32 MB de Flash NOR dans le boîtier.

**Quelle tension d'alimentation faut-il pour le SF32LB57x ?**
3,0–4,7 V ou 2,97–3,63 V.

**Par où commencer une conception matérielle avec le SF32LB57x ?**
Commencez par le [guide de conception matérielle du SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) (schéma, alimentation, horloge/RF, routage PCB), puis utilisez les listes de contrôle de schéma et d'implantation avant de figer la carte.
<!-- uf-faq:end -->

## Produits associés { #related-products }

### Base de conception matérielle { #hardware-design-baseline }

Utilisez le [guide de conception matérielle (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), la note d'application matérielle officielle, la fiche technique et la liste des fournisseurs agréés comme base de conception. Confirmez l'architecture d'alimentation, l'éclatement du boîtier et le plan d'affichage, de stockage, d'audio, de caméra, de RF et de débogage/téléchargement avant de valider le schéma ou le circuit imprimé.

### Kits de développement { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) est la carte d'évaluation pour écrans RGB, caméras DVP, deux microphones PDM, sortie haut-parleur, Wi-Fi SDIO et USB. Elle repose sur la carte cœur SF32LB57, qui tient lieu de module 57 tant que celui-ci n'est pas entièrement certifié RF et disponible commercialement.

Utilisez les schémas de référence officiels, les indications de système minimal et la liste de contrôle pour planifier l'alimentation, les horloges, la RF, l'affichage, le stockage, l'audio, la caméra et l'accès en production.

### Produits de référence { #reference-products }

Les produits finaux SF32LB57x typiques comprennent les montres et bracelets portables, les appareils IHM intelligents, les produits à papier électronique, les petits et moyens appareils intelligents, les appareils portables d'enregistrement/audio, les panneaux domotiques, les petits terminaux d'affichage et les produits Bluetooth dotés d'une caméra.
