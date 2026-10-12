---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano : carte de développement SF32LB52x compacte à demi-trous métallisés pour des prototypes proches du produit, la mise en service de petits affichages et l'évaluation par brasage."
tags:
    - Matériel
    - Carte de développement
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## Vue d'ensemble { #overview }

La SF32LB52-DevKit-Nano est une petite carte de développement SF32LB52x destinée aux prototypes compacts et à l'évaluation embarquée. Elle utilise des demi-trous métallisés sur le pourtour de la carte, ce qui la rend adaptée aussi bien comme carte de développement autonome que comme module à braser dans les premiers prototypes de produit.

La carte mesure 51 mm × 20,32 mm et expose les principales ressources du SF32LB52x nécessaires au développement avec GPIO, UART, I2C, SPI, LCD, I2S, GPADC, PWM, USB et audio analogique.

![SF32LB52-DevKit-Nano, vue de face](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — vue de face</em></div>

![SF32LB52-DevKit-Nano, vue de dos](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — vue de dos</em></div>

## Variantes de la carte { #board-variants }

<div align="center"><em>Variantes de la carte SF32LB52-DevKit-Nano</em></div>

<div align="center" markdown>

| Variante | MCU | Mémoire dans le boîtier | Flash externe |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB de Flash SPI NOR | Aucun |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB de PSRAM OPI | 16 MB de Flash QSPI-NOR |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB de PSRAM OPI | 128 MB de Flash QSPI-NAND |

</div>

La variante N4 convient aux applications compactes de commande, de Bluetooth et d'interface simple. La N16R16 associe 16 MB de PSRAM OPI à 16 MB de QSPI-NOR, tandis que la variante A128R16 associe 16 MB de PSRAM OPI à 128 MB de QSPI-NAND. Toutes deux conviennent aux applications qui ont besoin de ressources d'affichage plus volumineuses, de systèmes de fichiers externes ou d'un tampon d'image ou d'une mémoire de travail en PSRAM.

**Divergence entre sources — à vérifier avant le choix :** le [guide détaillé de la carte Nano](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html) de SiFli appelle sa configuration 16 MB de PSRAM OPI + 16 MB de NOR `R16N16 V1.0.0` ; le [guide actuel des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) répertorie la même configuration mémoire sous le nom `N16R16` et indique séparément `A128R16` avec 16 MB de PSRAM OPI + 128 MB de QSPI-NAND. Le guide détaillé ne décrit pas spécifiquement la A128R16. Pour cette référence, fiez-vous à l'entrée du guide des modèles plutôt que de transposer des éléments de la description de la carte N16R16. Avant de choisir un firmware ou une organisation du stockage, vérifiez le marquage de la carte ainsi que le schéma et la nomenclature actuels.

Les sources SiFli diffèrent aussi légèrement sur les dimensions de la carte Nano : le guide détaillé indique 21 × 51 mm, tandis que le guide des modèles indique 51 × 20,32 mm. Le côté de 51 mm concorde, mais la dimension la plus courte diffère de 0,68 mm. Cette page retient la valeur plus précise du guide des modèles ; vérifiez le plan mécanique de la révision exacte de la carte avant de concevoir un boîtier ou une carte porteuse.

## Points forts de la carte { #board-highlights }

- Carte compacte de 51 mm × 20,32 mm
- Demi-trous métallisés pour des prototypes à braser
- Alimentation USB Type-C et téléchargement/débogage USB-UART via CH340N
- Les fonctions GPIO, UART, I2C, SPI, GPADC, PWM, I2S et PDM, ainsi que les broches capables de réveiller le système, sont exposées
- Prise en charge d'un LCD QSPI via un chemin FPC 16 broches, généralement avec un câble adaptateur 22 broches vers 16 broches
- Prise en charge d'un panneau tactile I2C
- Entrée microphone analogique et broches de sortie audio différentielle
- USB 2.0 FS acheminé vers les broches de bord
- Deux LED utilisateur
- Touche d'alimentation et touche de fonction

## Quand utiliser cette carte { #when-to-use-this-board }

Choisissez la SF32LB52-DevKit-Nano lorsque le prototype doit rester proche du format du produit final.

- Réaliser des prototypes compacts de Bluetooth et d'affichage
- Braser la carte sur un circuit imprimé porteur
- Tester des affectations de broches proches du produit avant de concevoir une carte personnalisée
- Comparer les configurations NOR seule, QSPI-NOR et QSPI-NAND avec PSRAM
- Mettre en service les fonctions LCD, audio, capteurs et USB dans un faible encombrement

Pour un câblage plus facile sur banc et un accès plus large aux signaux, utilisez la [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md). Pour une carte davantage orientée vers l'affichage, avec chargeur, carte TF, microphone et amplificateur de haut-parleur, utilisez la [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Alimentation { #power }

La carte prend en charge trois modes d'alimentation :

- Alimentation USB Type-C, recommandée pour le développement
- Entrée 3,3 V via les demi-trous métallisés 3.3V et GND lorsque l'USB n'est pas connecté
- Entrée 5 V via les demi-trous métallisés 5V et GND lorsque l'USB n'est pas connecté

Lorsque l'USB Type-C est connecté, certaines broches 3,3 V et 5 V peuvent servir de sorties. Vérifiez le sens du courant avant de raccorder des circuits externes.

La carte comprend un interrupteur d'alimentation commandé par le signal RTS# du CH340N, ce qui permet un comportement de réinitialisation piloté par l'outil.

## Téléchargement et débogage { #download-and-debug }

Utilisez l'interface UART via USB Type-C pour le téléchargement du firmware et les journaux série.

- **Mode de téléchargement** : activez BOOT dans l'outil de téléchargement, puis mettez la carte sous tension ou réinitialisez-la.
- **Mode débogage/journal** : désactivez BOOT, puis mettez la carte sous tension ou réinitialisez-la.
- **Comportement de la réinitialisation RTS** : si l'ouverture du port série réinitialise ou éteint la carte de manière inattendue, désactivez le contrôle de flux modem ou matériel dans les paramètres du port série de l'hôte.

![Désactiver le contrôle de flux modem dans les paramètres avancés du port série](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Désactivation du contrôle de flux modem dans les paramètres du port série</em></div>

## Commandes utilisateur { #user-controls }

<div align="center"><em>Signaux des commandes utilisateur</em></div>

<div align="center" markdown>

| Fonction | GPIO | Comportement |
| :--- | :--- | :--- |
| LED1 | PA31 | Actif à l'état bas |
| LED2 | PA32 | Actif à l'état bas |
| KEY1 | PA34 | Actif à l'état haut, prend en charge la réinitialisation par appui long de 10 s |
| KEY2 | PA33 | Actif à l'état haut |

</div>

## Récapitulatif des demi-trous métallisés { #castellated-pin-summary }

La carte Nano expose deux groupes de demi-trous métallisés sur son pourtour. Le premier groupe comprend l'audio, le SPI1, l'UART de débogage, l'alimentation proche de l'USB et des broches compatibles GPADC. Le second groupe comprend le SPI2, l'USB FS, des GPIO capables de réveiller le système et l'alimentation.

### Signaux du bord côté face { #front-side-edge-signals }

<div align="center"><em>Table des signaux du bord côté face</em></div>

<div align="center" markdown>

| Broche | Signal | Fonction principale |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | DACP | Sortie audio analogique |
| 3 | DACN | Sortie audio analogique |
| 4 | MIC_ADC | Entrée microphone analogique |
| 5 | MIC_BIAS | Polarisation du microphone |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | Masse |
| 8 | PA19 | UART0_TXD / SWCLK / débogage |
| 9 | PA18 | UART0_RXD / SWDIO / débogage |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | Entrée/sortie 3,3 V |
| 14 | GND | Masse |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | Entrée/sortie 5 V |

</div>

### Signaux du bord côté dos { #back-side-edge-signals }

<div align="center"><em>Table des signaux du bord côté dos</em></div>

<div align="center" markdown>

| Broche | Signal | Fonction principale |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | 3.3V | Entrée/sortie 3,3 V |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | Masse |
| 10 | 3.3V | Entrée/sortie 3,3 V |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | Entrée/sortie 5 V |
| 16 | GND | Masse |

</div>

## Interface LCD { #lcd-interface }

La carte prend en charge les dalles LCD QSPI via un jeu de signaux FPC à 16 broches. La note d'origine de la carte décrit la connexion à l'écran AMOLED 1,85 pouce de la Huangshan Pi au moyen d'un câble FPC 22 broches vers 16 broches.

![Câble adaptateur FPC 22 broches vers 16 broches](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>Câble adaptateur FPC 22 broches vers 16 broches</em></div>

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

## Broches du Flash externe et du SDIO { #external-flash-and-sdio-pins }

La variante N16R16 comprend un Flash QSPI-NOR externe de 16 MB. Le groupe de broches de stockage est le suivant :

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

Selon la variante, ces broches peuvent être occupées par le Flash monté. Vérifiez la configuration exacte de la carte avant de les utiliser comme broches d'extension.

## Extension audio { #audio-expansion }

La carte Nano expose l'entrée microphone analogique, la polarisation du microphone et la sortie audio analogique différentielle. Ajoutez un circuit de microphone externe et un amplificateur de puissance audio selon les besoins du produit visé.

## Cibles de compilation du SDK { #sdk-build-targets }

Le SiFli SDK utilise les noms de cibles de carte exacts suivants avec `scons --board=<board_name>` :

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

Ce sont des identifiants de cibles de compilation du SDK, pas nécessairement les noms de produit imprimés sur une carte ou un module. L'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et le fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK peuvent énumérer des ensembles différents ; confirmez la cible avec la révision du SDK utilisée.

## Documents associés { #related-documents }

[Présentation de la puce SF32LB52x]: ../chips/SF32LB52x.md
[Guide de conception matérielle SF32LB52x]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Article original du wiki SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[Paquet de conception]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[Acheter des échantillons]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Présentation de la puce SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x]__
- :fontawesome-brands-github: __[Article original du wiki SiFli]__
- :fontawesome-solid-download: __[Paquet de conception]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__

</div>
