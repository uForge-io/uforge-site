---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3 : carte d'évaluation SF32LB52x compacte avec alimentation du MCU sélectionnable par cavalier (1,8 V ou 3,3 V) et accès direct aux GPIO, à l'affichage, à l'audio, à l'USB et aux rails d'alimentation."
tags:
    - Matériel
    - Carte de développement
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## Vue d'ensemble { #overview }

La SF32LB52-DevKit-Core-3p3 est une carte de développement compacte destinée à l'évaluation directe des puces SF32LB52x. Un cavalier de la carte sélectionne une alimentation de 1,8 V ou de 3,3 V pour le MCU. Les principaux signaux du MCU sont exposés par des embases de bord, et les trous métallisés crénelés acceptent des barrettes à broches sans brasage. La carte convient aux ingénieurs qui ont besoin d'un accès direct aux GPIO, aux bus série, aux signaux d'affichage, à l'audio, à l'ADC, au PWM et aux rails d'alimentation.

Avec 30,88 mm × 68 mm, la carte est compacte pour des prototypes sur banc tout en offrant des interfaces pratiques pour la mise en service matérielle et logicielle du SF32LB52x.

![SF32LB52-DevKit-Core-3p3, vue de face](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — vue de face</em></div>

![SF32LB52-DevKit-Core-3p3, vue de dos](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — vue de dos</em></div>

## Variantes de la carte { #board-variants }

<div align="center"><em>Variantes de la carte SF32LB52-DevKit-Core-3p3</em></div>

<div align="center" markdown>

| Variante | MCU | Mémoire dans le boîtier | Mémoire sur la carte |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 Mo de Flash SPI NOR | Aucune |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 Mo de Flash SPI NOR | Aucune |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 Mo de PSRAM OPI | 16 Mo de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 Mo de PSRAM OPI | 16 Mo de Flash SPI NOR |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 Mo de PSRAM OPI | 16 Mo de Flash SPI NOR |

</div>

Utilisez les variantes NOR seule pour les travaux compacts de Bluetooth, de commande et d'IHM simple. Utilisez les variantes PSRAM + NOR externe lorsque l'application a besoin de ressources graphiques plus volumineuses, de tampons d'image, de systèmes de fichiers ou d'un stockage applicatif.

**Divergence entre sources — vérifier le marquage de la carte avant le choix :** le [guide détaillé de la carte Core-3p3](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html) de SiFli appelle la configuration SF32LB52JUD6 `R16N16 V1.0.0` (actuelle), tandis que son [guide des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) répertorie la même configuration JUD6 / 16 Mo de PSRAM / 16 Mo de NOR sous le nom `N16R16`. La ligne d'informations de révision du guide détaillé indique 8 Mo de PSRAM co-intégrée pour l'EUB6, mais sa liste de fonctionnalités et son tableau des variantes indiquent 4 Mo. La [présentation du SF32LB52](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md) de SiFli précise elle aussi 4 Mo pour l'EUB6 ; cet article retient donc 4 Mo. Confirmez le marquage de la carte ainsi que le schéma et la nomenclature correspondants lorsque le suffixe exact de la carte importe.

## Points forts de la carte { #board-highlights }

- Variantes de MCU SF32LB52x en configuration NOR seule ou PSRAM + NOR
- Quartz principal de 48 MHz et quartz RTC de 32,768 kHz
- Alimentation USB Type-C et téléchargement/débogage USB-UART via CH340N
- Antenne PCBA embarquée et connecteur d'antenne I-PEX
- Alimentation du MCU sélectionnable par cavalier : 1,8 V ou 3,3 V
- Signaux USB 2.0 FS acheminés vers l'embase de bord
- 37 GPIO exposés ; le MCU fournit 3 UART, 4 interfaces I2C, 2 GPTIM, 2 interfaces SPI et 6 canaux GPADC
- Tous les GPIO peuvent être configurés en UART, I2C ou GPTIM ; le multiplexage des broches inclut aussi SPI, PWM, I2S, PDM et entrées de réveil
- Connecteur FPC d'affichage 16 broches au pas de 0,5 mm ; les interfaces d'affichage comprennent SPI, DSPI et Quad-SPI, avec prise en charge du QSPI en mode DDR
- Signaux de panneau tactile I2C
- Microphone analogique et broches de sortie audio différentielle
- Une LED utilisateur
- Touche d'alimentation et touche de fonction
- Points de test pour la mesure du courant d'un seul rail ; SiFli documente aussi des tests de consommation du MCU seul, du système minimal et de la carte entière

## Quand utiliser cette carte { #when-to-use-this-board }

Choisissez la SF32LB52-DevKit-Core-3p3 lorsque vous avez besoin de l'accès le plus direct aux signaux du SF32LB52x.

- Mettre en service des cartes filles ou des cartes de capteurs personnalisées
- Évaluer les variantes mémoire du SF32LB52x
- Réaliser des prototypes de fonctions LCD, audio, USB et GPIO
- Mesurer le courant de rails d'alimentation individuels
- Valider le firmware avant de concevoir un circuit imprimé de produit compact

Pour une carte plus petite de type module à bords crénelés, utilisez la [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Pour une carte d'affichage prête à l'emploi avec amplificateur audio, emplacement pour carte TF et chargeur de batterie, utilisez la [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentation { #power }

La carte prend en charge trois entrées d'alimentation :

- Alimentation USB Type-C, recommandée pour le développement et le débogage courants
- Entrée 5 V via les broches 5 V et GND de l'embase de bord lorsque l'USB est déconnecté
- Entrée 3,3 V via les broches 3,3 V et GND de l'embase de bord lorsque l'USB est déconnecté ; une alimentation de laboratoire externe peut être utilisée

Un cavalier distinct de la carte sélectionne l'alimentation du MCU entre 1,8 V et 3,3 V. Ce réglage est distinct des broches d'alimentation 1,8 V et 3,3 V externes de l'embase ; consultez le brochage et le schéma de la révision de carte correspondante avant de modifier le cavalier ou d'alimenter des circuits externes.

Pour mesurer le courant d'un seul rail, placez un ampèremètre en série avec le rail à mesurer, aux points de mesure de la carte.

Lorsque l'USB Type-C est connecté, la carte peut aussi fournir des sorties 3,3 V, 1,8 V et 5 V sur certaines broches de l'embase. Confirmez le sens requis avant de raccorder des circuits externes.

La carte comprend un interrupteur d'alimentation. Le signal RTS# du CH340N peut commander l'activation de la carte, ce qui permet à l'outil de l'hôte de réinitialiser le MCU pendant les opérations de téléchargement ou de débogage.

## Téléchargement et débogage { #download-and-debug }

Utilisez le port UART USB Type-C pour le téléchargement du firmware et le débogage logiciel.

- **Mode de téléchargement** : activez BOOT dans l'outil de téléchargement, puis mettez la carte sous tension ou réinitialisez-la.
- **Mode débogage/journal** : désactivez BOOT, puis mettez la carte sous tension ou réinitialisez-la.
- **Réinitialisation** : utilisez la fonction de réinitialisation/touche d'alimentation de la carte ou le chemin de réinitialisation RTS piloté par l'outil.

## Commandes utilisateur { #user-controls }

<div align="center"><em>Signaux des commandes utilisateur</em></div>

<div align="center" markdown>

| Fonction | GPIO | Comportement |
| :--- | :--- | :--- |
| LED | PA32 | Actif à l'état haut |
| KEY1 | PA34 | Actif à l'état haut, prend en charge la réinitialisation par appui long de 10 s |
| KEY2 | PA33 | Actif à l'état haut |

</div>

## Interface d'affichage { #display-interface }

La carte prend en charge les interfaces LCD SPI, DSPI et Quad-SPI, y compris le QSPI en mode DDR, via un connecteur FPC vertical à 16 broches au pas de 0,5 mm, avec un verrou à relever et des contacts en partie inférieure. Il transporte la réinitialisation du LCD, le PWM du rétroéclairage, le signal TE, la sélection de puce, l'horloge, quatre lignes de données et les signaux tactiles I2C.

![Câble adaptateur FPC](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>Câble adaptateur FPC</em></div>

### Table des signaux du FPC LCD à 16 broches { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>Table des signaux du FPC LCD à 16 broches</em></div>

<div align="center" markdown>

| Broche | Signal | Fonction |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | PA00 | Réinitialisation du LCD |
| 3 | PA01 | PWM du rétroéclairage |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | Sortie d'alimentation de l'écran |
| 12 | GND | Masse |
| 13 | PA09 | Interruption du tactile |
| 14 | PA11 | SDA I2C du tactile |
| 15 | PA20 | SCL I2C du tactile |
| 16 | PA10 | Réinitialisation du tactile |

</div>

Le guide chinois de la carte publié par SiFli indique que le module AMOLED 1,85 pouce se connecte directement par un câble FPC à 16 broches. Son guide anglais précise en revanche un câble FPC-22p, et le nom du fichier de l'illustration est `FPC-22P`. Le connecteur de la carte elle-même est à 16 broches. Les sources ne résolvent pas cette divergence ; vérifiez le nombre de broches du câble et son brochage par rapport au module d'affichage avant de le connecter.

## Récapitulatif des signaux des embases { #header-signal-summary }

La carte expose deux embases de bord à 24 broches. Le premier côté est consacré aux GPIO généraux, au SPI2, à l'USB, au GPADC et à l'alimentation. Le second côté est consacré au LCD, au tactile, à l'UART de débogage, à l'audio et à l'alimentation.

![Brochage de la SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>Brochage de la SF32LB52-DevKit-Core-3p3</em></div>

### Embase d'E/S générales { #general-io-header }

<div align="center"><em>Affectation des broches de l'embase d'E/S générales</em></div>

<div align="center" markdown>

| Plage de broches | Signaux | Fonctions principales |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, entrées de réveil |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3.3V | Entrée ou sortie 3,3 V selon l'alimentation USB |
| 18-21 | PA27..PA24 | Entrées de réveil, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

### Embase LCD, audio et débogage { #lcd-audio-and-debug-header }

<div align="center"><em>Affectation des broches de l'embase LCD, audio et débogage</em></div>

<div align="center" markdown>

| Plage de broches | Signaux | Fonctions principales |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, tactile, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | Microphone analogique et sortie audio |
| 17 | 1.8V | Entrée ou sortie 1,8 V selon l'alimentation USB |
| 18-20 | PA10, PA11, PA20 | PA10 : CTP_RST ; PA11 : CTP_SDA ; PA20 : CTP_SCL ; tous prennent en charge UART, I2C et GPTIM |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, téléchargement/débogage |
| 24 | 5V | Entrée ou sortie 5 V selon l'alimentation USB |

</div>

## Broches du Flash externe et du SDIO { #external-flash-and-sdio-pins }

Certaines variantes comprennent un Flash QSPI-NOR externe de 16 Mo. Le groupe de broches partagé stockage/SDIO est le suivant :

<div align="center"><em>Groupe de broches du Flash externe et du SDIO</em></div>

<div align="center" markdown>

| GPIO du MCU | Fonction partagée Flash / SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Vérifiez si ces broches sont déjà occupées par le Flash monté avant de les utiliser pour le SDIO ou d'autres fonctions d'extension.

## Extension audio { #audio-expansion }

La carte achemine la polarisation et l'entrée du microphone analogique ainsi que la sortie différentielle du DAC. Le microphone et un amplificateur de classe AB/D pour piloter un haut-parleur sont externes ; choisissez-les en fonction du chemin audio visé.

## Cibles de compilation du SDK { #sdk-build-targets }

La configuration de compilation du SiFli SDK utilise les noms de cibles de carte exacts suivants avec `scons --board=<board_name>` :

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

Ce sont des identifiants de cibles de compilation du SDK, pas nécessairement les noms de produit imprimés sur une carte ou un module. L'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et le fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK peuvent énumérer des ensembles différents ; confirmez la cible avec la révision du SDK utilisée.

## Documents associés { #related-documents }

[Présentation de la puce SF32LB52x]: ../chips/SF32LB52x.md
[Guide de conception matérielle SF32LB52x]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Article original du wiki SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Paquet de conception]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Acheter des échantillons]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Présentation de la puce SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x]__
- :fontawesome-brands-github: __[Article original du wiki SiFli]__
- :fontawesome-solid-download: __[Paquet de conception]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__

</div>
