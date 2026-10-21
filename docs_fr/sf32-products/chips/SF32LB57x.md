---
icon: lucide/microchip
description: "SF32LB57x : famille de MCU AIoT multicœur très basse consommation avec Bluetooth bimode, deux cœurs 240 MHz, graphismes ePicasso 3.0, eZip 3.0 et boîtiers QFN/BGA compacts."
tags:
    - Matériel
    - Puce
---

# SF32LB57x { #sf32lb57x }

## Présentation { #overview }

La série SF32LB57x est une famille de MCU AIoT améliorée, très intégrée et à très basse consommation, pour les objets portables, les appareils intelligents portatifs, la maison connectée et les produits à écran compact. Elle vise les conceptions qui ont besoin de davantage de capacités graphiques, d'audio Bluetooth, d'entrée caméra, de stockage externe et de fonctionnement permanent (always-on) qu'un microcontrôleur Bluetooth de base ne peut assurer confortablement, sans devoir accepter les compromis de consommation, de coût et d'intégration d'une plateforme de classe processeur applicatif.

Le SF32LB57x repose sur une architecture à trois cœurs Arm Cortex-M33 STAR-MC1[^1] : deux cœurs de performance fonctionnent jusqu'à 240 MHz, aux côtés d'un cœur basse consommation jusqu'à 24 MHz. Le [guide d'utilisation de l'ACPU](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) de SiFli désigne les trois cœurs par HCPU, ACPU et LCPU : l'ACPU gère le traitement audio et graphique, tandis que le LCPU prend en charge des tâches basse consommation comme le BLE et le traitement des données des capteurs. Le score combiné des deux cœurs de performance atteint 1968 CoreMark / 740 DMIPS. Cette répartition offre assez de marge au rendu de l'interface, au code applicatif et aux charges multimédias, tout en permettant de confier le Bluetooth, le concentrateur de capteurs et les autres tâches permanentes à un cœur moins énergivore.

La plateforme intègre 592 Ko de SRAM de rétention sur puce, l'accélération graphique 2D/2,5D ePicasso 3.0, la décompression matérielle eZip 3.0, un contrôleur LCD dédié, un contrôleur de caméra DCMI, le Bluetooth bimode, des ressources audio ADC/DAC haute fidélité, des interfaces de stockage pour la mémoire SiP et externe, l'accélération de la sécurité et une affectation flexible des GPIO via FreeIO. Un point différenciant majeur de la 57x est le PTM (Parallel Task Machine) : un petit processeur de tâches parallèles qui décharge les CPU principaux du séquencement de périphériques sensible aux cycles, des protocoles d'E/S personnalisés, de l'acquisition de capteurs, du minutage de type PWM et de la coordination pilotée par événements.

Pour la planification matérielle, les premières décisions importantes concernent l'alimentation et le boîtier. Le SF32LB57x existe en boîtiers QFN68, QFN80 et BGA112, avec des variantes sur batterie et d'autres prévues pour une alimentation externe régulée à 3,3 V. Ce choix influe sur l'arbre d'alimentation, le nombre de GPIO disponible, le routage des broches du boîtier, le routage de l'affichage et du stockage, l'accès au débogage et la stratégie de mise en service ; la référence commandable exacte doit donc être choisie avant toute réutilisation de schéma ou implantation de circuit imprimé.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

[^2]: **BGA112 uniquement.** Le SF32LB57x intègre MPI1, MPI2 et MPI3 ; pour les positions internes de la mémoire intégrée au boîtier, voir la [convention de numérotation des références SF32](../family/SF32_namingrule.md). Dans chacune de ces configurations de mémoire intégrée au boîtier, les broches de MPI2 et MPI3 ne sont pas accessibles de l'extérieur, ce qui ne laisse que 58 GPIO : (1) une PSRAM sur MPI2, seule ou avec une PSRAM sur MPI1 ; ou (2) une flash NOR sur MPI3. Le `SF32LB57GVD776` correspond au cas (2) : son second `7` identifie le composant interne sur MPI3, de sorte que seuls 58 GPIO sont disponibles. Dans toutes les autres configurations, les six E/S du BGA112 associées à MPI3 sont disponibles pour MPI3 ou comme sorties statiques GP configurées par résistance de rappel haut ou bas (pull-up/pull-down) ; ce ne sont pas des GPIO sans restriction. L'entrée `58 + 6` du `SF32LB57ZVN7N6` signifie donc 58 GPIO utilisables plus 6 broches pour MPI3 ou des sorties statiques, et non 64 GPIO librement affectables. Cette limitation ne s'applique pas aux boîtiers QFN68 et QFN80, qui n'exposent que leur nombre nominal de GPIO et n'ont aucune option MPI3 ou de sortie statique supplémentaire.

[^3]: Les dimensions du boîtier et l'épaisseur suivent les tableaux de commande et les plans de boîtier des fiches techniques du SF32LB57x de SiFli (DS5701 et DS5702, V0.2.1) : QFN68 (7 × 7 mm, plans de 0,9 mm ou 1,1 mm), QFN80 (8 × 8 mm, plans de 0,9 mm ou 1,1 mm) et BGA112 (5,4 × 4,4 mm, 0,98 mm). Parmi les références répertoriées, seule la SF32LB573UB776 utilise le QFN68 de 1,1 mm ; les tableaux de commande ne répertorient pas la SF32LB57ZVN7N6, dont l'épaisseur BGA112 est donc tirée du seul plan BGA112 disponible. Le guide de conception matérielle de SiFli indique en outre une option BGA112 de 1,03 mm que les fiches techniques ne mentionnent pas. Le schéma de numérotation propre au SF32LB57x associe U au QFN68, Y au QFN80 et V au BGA112 ; ne supposez pas que la correspondance de Y s'applique aux autres familles SF32. Vérifiez l'épaisseur et le plan du boîtier pour la référence exacte auprès de SiFli.
[^4]: Pour la série sur batterie, la fiche technique du SF32LB57x de SiFli (DS5701) indique 3,0–4,7 V pour VBAT et VCC, avec une tension de mise sous tension de 3,5 V ±10 %. Le guide de conception matérielle de SiFli indique une entrée plus étroite, de 3,45–4,7 V (QFN68 tableau 2-1-1, QFN80 tableau 2-1-3, BGA112 tableau 2-1-5) ; les deux documents diffèrent, donc confirmez la broche d'entrée applicable et les limites dans la fiche technique de la référence exacte.
[^5]: L'entrée de tension d'E/S résume les domaines d'E/S pris en charge ; elle ne signifie pas que chaque broche peut utiliser l'une ou l'autre tension. VDDIOA, lorsqu'elle est alimentée séparément, alimente les GPIO. VDDIOSB, lorsqu'elle existe, est le rail d'E/S de la mémoire SiP ; le guide de SiFli indique 1,8 V pour la PSRAM intégrée au boîtier et 3,3 V pour la flash NOR. Pour la série QFN68 en 3,3 V, le tableau 2-1-2 spécifie VDDIOA uniquement à 3,3 V. Vérifiez chaque broche/domaine à l'aide du guide du boîtier et de la fiche technique de la référence exacte.

## Applications { #applications }

**SF32LB57x convient particulièrement aux** produits connectés compacts qui ont besoin de capacités graphiques, d'audio Bluetooth, d'entrée caméra, de stockage externe ou de détection permanente sur une plateforme MCU à basse consommation, notamment :

- Montres connectées et bracelets d'activité
- Appareils intelligents d'interface homme-machine
- Appareils intelligents à papier électronique
- Petits et moyens appareils électroménagers connectés
- Produits d'enregistrement et d'audio portables
- Dispositifs médicaux portables et équipements de fitness
- Produits industriels d'affichage, de détection, de surveillance et d'instrumentation
- Appareils portables ou de poche dotés d'une caméra
- Petits terminaux et panneaux de commande centrés sur l'affichage
- Contrôleurs de console centrale automobile, clés de voiture sans fil et télécommandes de véhicule portables
- Serrures de porte intelligentes
- Produits Bluetooth de type talkie-walkie et interphone
- Cadres photo électroniques
- Réseaux Bluetooth Mesh et concentrateurs de capteurs basse consommation

Elle est particulièrement adaptée lorsque la conception exige une ou plusieurs de ces capacités :

- Deux cœurs de performance à 240 MHz plus un cœur économe en énergie à 24 MHz pour le travail d'interface/application et les tâches d'arrière-plan basse consommation
- Accélération graphique ePicasso 3.0 avec rotation, mise à l'échelle, projection, effet miroir et fusion alpha en temps réel
- Décompression eZip 3.0 pour les ressources eZip/eZip-A, JPEG et MJPEG sans imposer à chaque ressource un décodage gourmand en CPU
- Interfaces LCD 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI et EPD 8/16 bits
- Entrée caméra DCMI via DVP ou SPI/Dual-SPI/Quad-SPI
- Connectivité Bluetooth 6.3 bimode (BR/EDR et BLE), y compris BLE Audio et LE Long Range
- Ressources audio ADC/DAC haute fidélité 24 bits pour la lecture, l'enregistrement et la téléphonie Bluetooth
- PSRAM OPI / NOR QSPI SiP, plus options de stockage externe NOR/NAND QSPI, PSRAM QPI, SD, SDIO ou eMMC
- Délestage vers le PTM pour des tâches de périphériques personnalisées, un minutage d'E/S déterministe, une réponse rapide aux déclencheurs et une automatisation de capteurs ou d'interfaces à faible surcharge

Le chiffre Bluetooth 6.3 provient des fiches techniques du SF32LB57x (V0.2.1) ; les fiches produit v0.4 indiquent encore une révision antérieure. Confirmez les fonctions optionnelles dans la documentation SiFli à jour pour la référence commandable exacte.

## Ressources de développement { #development-resources }

[Fiche produit]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Fiche technique]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[Manuel utilisateur]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Guide de conception d'origine (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Guide de conception matérielle (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[Liste des fournisseurs agréés SiFli (AVL)]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit]__
- :fontawesome-solid-file-pdf: __[Fiche technique]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur]__
- :fontawesome-solid-file-lines: __[Guide de conception d'origine (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (μForge)]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs agréés SiFli (AVL)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Système hautes performances à deux cœurs Arm Cortex-M33 STAR-MC1 jusqu'à 240 MHz
- Système basse consommation à un cœur Arm Cortex-M33 STAR-MC1 économe en énergie jusqu'à 24 MHz
- Score des deux cœurs de performance : 1968 CoreMark / 740 DMIPS
- Cache du HCPU : cache d'instructions 2 voies de 32 Ko et cache de données 4 voies de 16 Ko
- Ressources de cache d'instructions/de données de l'ACPU pour le XIP et l'accélération applicative
- 512 Ko de SRAM de rétention HPSYS plus 80 Ko de SRAM de rétention LPSYS, soit 592 Ko de SRAM sur puce au total
- 128 Ko de D-TCM sans cycle d'attente, partagés avec l'espace d'adressage de la SRAM HPSYS
- FPU simple précision et prise en charge de la MPU
- GPDMA avec mode liste chaînée

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- Parallel Task Machine à 4 cœurs pour les tâches de périphériques personnalisées qui gagnent à une exécution cadencée par le matériel plutôt qu'à un service continu par le CPU
- Jeu d'instructions personnalisé compact pour les lectures/écritures de bus, les opérations sur les données, les branchements conditionnels, les lectures/écritures d'E/S, les attentes d'événements et les délais fixes
- Contrôle du minutage au cycle près lors de l'exécution depuis la TCM du PTM, adapté à un séquencement d'E/S déterministe
- Chaque cœur PTM peut gérer jusqu'à 16 canaux d'E/S, avec prise en charge FIFO/DMA pour les interfaces de communication personnalisées
- Les cœurs PTM peuvent accéder à la mémoire du bus AHB et aux registres des périphériques, générer des interruptions vers le CPU et se coordonner entre eux par des notifications d'événements internes
- Adapté en pratique aux protocoles d'interface personnalisés, au PWM personnalisé, aux opérations groupées sur la mémoire/les données, à l'ordonnancement multimodule et à l'acquisition automatique de capteurs

### Connectivité sans fil { #wireless-connectivity }

- Radio Bluetooth bimode
- Prise en charge de BLE Audio et de LE Long Range
- Sensibilité du récepteur : −100 dBm en BLE 1 Mbps, −107,5 dBm en BLE 125 kbps, −96 dBm en BR et −95 dBm en EDR2
- Puissance d'émission maximale : 13 dBm pour EDR2/EDR3 et 17 dBm pour BR/BLE
- Courant de crête du récepteur BR aussi bas que 2,0 mA sous 3,8 V

### Graphiques, affichage et caméra { #graphics-display-and-camera }

- Moteur graphique 2D/2,5D ePicasso 3.0
- Rotation, mise à l'échelle, projection, effet miroir, fusion alpha et composition multicouche accélérés en matériel
- Résolution graphique maximale de 2048 × 2048
- Formats RVB dont RGB888, RGB565, aRGB8888 et aRGB8565
- Formats supplémentaires dont L8/L4, G8/G4/G2, A8/A4/A2 et YUV
- Moteur de décompression eZip 3.0 pour les ressources d'image et d'animation eZip/eZip-A sans perte
- Décompression d'images JPEG et d'animations MJPEG
- Fonctionnement chaîné d'eZip et d'ePicasso sans tampon d'image intermédiaire
- Contrôleur LCD dédié prenant en charge les interfaces d'affichage 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI et EPD 8/16 bits
- Cas d'usage d'affichage permanent à basse consommation pris en charge par le sous-système d'affichage
- Contrôleur de caméra DCMI prenant en charge les interfaces de caméra DVP et SPI/Dual-SPI/Quad-SPI

### Audio et analogique { #audio-and-analog }

- 1× DAC audio haute fidélité 24 bits, RSB de 109 dB
- 2× ADC audio haute fidélité 24 bits, RSB de 97 dB
- Fréquences d'échantillonnage audio de 8 kHz à 96 kHz, dont les fréquences courantes de téléphonie et de musique
- LDO Micbias avec plage de sortie de 1,4 V à 2,8 V et courant de sortie jusqu'à 2 mA
- Prend en charge la lecture et l'enregistrement audio, la téléphonie Bluetooth et les conceptions de lecture MP3 avec casque connecté
- 1× ADC SAR 12 bits à usage général à 12 canaux
- 1× capteur de température sur puce

### Stockage et sécurité { #storage-and-security }

- Prise en charge de la PSRAM OPI SiP jusqu'à 156 MHz
- Prise en charge de la flash NOR SiP jusqu'à 104 MHz
- 3× interfaces MPI (QSPI) pour NOR, NAND et PSRAM QPI, avec fonctionnement XIP mappé en adresses
- 2× interfaces SD/SDIO prenant en charge SD 3.0, SDIO 3.0 et eMMC
- Prise en charge du déchiffrement à la volée de la flash
- Accélérateurs AES, HASH et CRC
- Générateur de nombres aléatoires vrais (TRNG)
- Architecture de sécurité eShield
- PSA Certified Level 1

### Périphériques et E/S { #peripherals-and-ios }

- Jusqu'à 58 GPIO, selon le boîtier et la référence commandable
- Affectation flexible des GPIO avec FreeIO
- 3× UART
- 4× I2C
- 2× SPI
- 2× I2S
- 2 interfaces PDM (jusqu'à deux microphones numériques par interface)
- 1× USB 2.0 Full-Speed
- 2× CAN
- Intégration d'événements PTM pour des flux de périphériques pilotés par événements et la coordination multicœur
- 2× GPTIM 16 bits
- 4× BTIM 32 bits
- 2× ATIM 32 bits
- 2× LPTIM 24 bits
- 1× PWM
- 1× RTC
- 2× WDT 24 bits et 1× WDT indépendant

### Gestion de l'alimentation { #power-management }

- Convertisseur Buck à haut rendement et LDO basse consommation intégrés
- Deux sorties d'alimentation externes 3,3 V, jusqu'à 150 mA chacune
- Courant en hibernation de 2,8 µA à 3,8 V (référence sur batterie) ou de 1 µA à 3,3 V (référence alimentée de l'extérieur)
- Chargeur linéaire de batterie Li-ion configurable intégré (courant de charge jusqu'à 400 mA) sur la base alimentée par batterie
- Plage de tension de fin de charge du chargeur de 4,2 V à 4,45 V
- Plage d'entrée batterie/système[^4] : 3,0 V à 4,7 V
- Plage VBUS : 4,5 V à 5,5 V
- Plage de température de fonctionnement : −40 °C à +85 °C

## Variantes de la famille { #family-variants }

Le SF32LB57x comprend des variantes alimentées par batterie et des variantes pour systèmes en 3,3 V régulé externe. Choisissez la référence exacte avant la saisie du schéma, car les plans de boîtier, les broches d'alimentation, le nombre de GPIO disponible, la mémoire intégrée et les contraintes de carte diffèrent au sein de la famille.

Les références ci-dessous proviennent des tableaux de commande des fiches techniques du SF32LB57x de SiFli (DS5701 et DS5702, V0.2.1, toutes deux des versions préliminaires), à l'exception de `SF32LB57ZVN7N6`, que ces tableaux ne répertorient pas. Confirmez chaque code de commande exact, la configuration de la mémoire intégrée au boîtier, les limites électriques et le plan du boîtier dans la documentation SiFli à jour propre à la référence avant l'intégration.

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
| Épaisseur[^3] | 0,9 mm | 0,9 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Pas | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| Mémoire intégrée au boîtier | 4 Mo OPI-PSRAM + 16 Mo QSPI-NOR | 4 Mo OPI-PSRAM + 16 Mo + 8 Mo QSPI-NOR (double puce) | 4 Mo OPI-PSRAM + 16 Mo × 2 QSPI-NOR (double puce) | 8 Mo OPI-PSRAM, pas de QSPI-NOR | 16 Mo OPI-PSRAM, pas de QSPI-NOR | Pas de PSRAM, 1 Mo QSPI-NOR seulement |
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
| Épaisseur[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 0,98 mm |
| Pas | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIO | 58 | 58 | 58 + 6 (MPI3 ou sorties statiques)[^2] | 58[^2] |
| Mémoire intégrée au boîtier | 8 Mo (2 × 4 Mo, double puce) OPI-PSRAM, pas de QSPI-NOR | 16 Mo OPI-PSRAM + 16 Mo QSPI-NOR | Pas de PSRAM + 16 Mo QSPI-NOR | 16 Mo OPI-PSRAM + 32 Mo (2 × 16 Mo, double puce) QSPI-NOR |
| Alimentation | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| Tension d'E/S[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Température | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C |

</div>

Pour le SF32LB57x, le choix du boîtier n'est pas qu'une question de coût de circuit imprimé. Il influe sur la disponibilité de l'interface d'affichage, le routage du stockage externe, le budget de GPIO, la conservation des broches de débogage/téléchargement et la difficulté d'éclatement ; il doit donc être arrêté en même temps que l'architecture d'alimentation. Utilisez la référence commandable, et pas seulement le nom du boîtier, comme base de la nomenclature et du schéma — le suffixe de mémoire modifie la configuration de stockage SiP et peut affecter les hypothèses sur le support de démarrage, la séquence d'alimentation et les besoins en stockage externe.

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB57x en conception validée :

1. **Valider le parcours de développement du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour valider les fonctions graphiques, audio, caméra, Bluetooth et stockage prévues.
2. **Planifier le matériel d'évaluation.** μForge ne répertorie actuellement aucun module ni carte de développement spécifique au SF32LB57. Utilisez le [sélecteur de produits SF32](../product-selector.md) pour repérer la plateforme d'évaluation la plus proche, mais vérifiez la couverture du boîtier, de l'alimentation, de la mémoire et des interfaces avant de transposer les résultats à une conception 57x.
3. **Concevoir et relire le matériel.** Utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) local — y compris son [autocontrôle de la conception client](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — et la séquence de revue [Conception pour la production](../../hardware/design-for-production.md) avant de valider le schéma ou l'implantation ; une liste de contrôle μForge propre à la famille n'est pas publiée pour l'instant.
4. **Vérifier la source faisant autorité.** Confirmez la référence commandable et le boîtier exacts à l'aide de la [fiche technique], du [manuel utilisateur] et du [guide de conception d'origine] de SiFli, et utilisez la [Liste des fournisseurs agréés SiFli (AVL)] pour maîtriser les choix critiques de la nomenclature.

<!-- uf-faq:start -->
## Questions fréquentes { #frequently-asked-questions }

**Quelles sont les principales caractéristiques du SF32LB57x ?**
Le SF32LB57x associe un CPU applicatif (2× Cortex-M33 @240 MHz) à un cœur basse consommation (Cortex-M33 @24 MHz, avec un contrôleur Bluetooth dédié), 592 KB de SRAM interne et Bluetooth bimode (BT classique + BLE). Graphismes : ePicasso 3.0 + eZip 3.0. Boîtier : QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. Valeurs au niveau de la famille ; vérifiez la fiche technique de la référence exacte.

**Quelles interfaces d'affichage le SF32LB57x prend-il en charge ?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. La disponibilité varie selon la référence et le boîtier.

**Quelle mémoire dans le boîtier le SF32LB57x propose-t-il ?**
Jusqu'à 48 MB de PSRAM et jusqu'à 32 MB de Flash NOR dans le boîtier, selon la référence.

**Quelle tension d'alimentation faut-il pour le SF32LB57x ?**
3.0–4.7 V or 2.97–3.63 V, selon la variante. Confirmez la plage exacte dans la fiche technique.

**Par où commencer une conception matérielle avec le SF32LB57x ?**
Commencez par le [guide de conception matérielle du SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) (schéma, alimentation, horloge/RF, routage PCB), puis utilisez les listes de contrôle de schéma et d'implantation avant de figer la carte.
<!-- uf-faq:end -->

## Produits associés { #related-products }

### Base de conception matérielle { #hardware-design-baseline }

Utilisez le [guide de conception matérielle (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), la note d'application matérielle officielle, la fiche technique et la liste des fournisseurs agréés comme base de conception. Confirmez l'architecture d'alimentation, l'éclatement du boîtier et le plan d'affichage, de stockage, d'audio, de caméra, de RF et de débogage/téléchargement avant de valider le schéma ou le circuit imprimé.

### Kits de développement { #development-kits }

Utilisez les schémas de référence officiels, les indications de système minimal et la liste de contrôle pour planifier l'alimentation, les horloges, la RF, l'affichage, le stockage, l'audio, la caméra et l'accès en production.

### Produits de référence { #reference-products }

Les produits finaux SF32LB57x typiques comprennent les montres et bracelets portables, les appareils IHM intelligents, les produits à papier électronique, les petits et moyens appareils intelligents, les appareils portables d'enregistrement/audio, les panneaux domotiques, les petits terminaux d'affichage et les produits Bluetooth dotés d'une caméra.
