---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD : carte SF32LB52x orientée affichage pour la mise en service rapide d'écrans SPI, QSPI et MCU/8080, avec tactile, audio, stockage et batterie."
tags:
    - Matériel
    - Carte de développement
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## Vue d'ensemble { #overview }

La SF32LB52-DevKit-LCD est une carte de développement orientée affichage pour la famille SF32LB52x. Elle est construite autour d'un module SF32LB52x et destinée au développement rapide de produits utilisant des interfaces d'affichage SPI, DSPI, QSPI ou MCU/8080.

La carte réunit sur une même plateforme d'évaluation le module MCU, les connecteurs d'affichage, l'interface tactile, l'entrée microphone analogique, la sortie audio analogique, l'USB-C, le débogage USB-UART, le stockage sur carte TF et la prise en charge d'une batterie. Elle constitue un point de départ pratique pour des IHM de type montre connectée, des tableaux de bord compacts, des périphériques d'affichage et d'autres applications SF32LB52x qui ont besoin d'un écran dès le début du développement.

![SF32LB52-DevKit-LCD, vue de face](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vue de face</em></div>

![SF32LB52-DevKit-LCD, vue de dos](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vue de dos</em></div>

![Schéma fonctionnel de la SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — schéma fonctionnel</em></div>

## Points forts de la carte { #board-highlights }

- Plateforme à module SF32LB52x, compatible avec les SF32LB52-MOD-1, SF32LB52-MOD-A et SF32LB52-MOD-B
- Prise en charge de LCD QSPI/SPI/DSPI via un connecteur FPC à 22 broches
- Prise en charge de LCD MCU/8080 8 bits via le FPC et l'embase d'extension à 40 broches
- Prise en charge d'un panneau tactile I2C
- USB-C pour le téléchargement/débogage USB-UART et l'alimentation de la carte
- Interface USB-C distincte pour les cas d'usage USB 2.0 FS
- Microphone MEMS et amplificateur de puissance audio de classe D embarqués
- Emplacement pour carte MicroSD utilisant le SPI
- Connecteur de batterie et chargeur linéaire ETA9640P
- Embase d'extension à 40 broches pour les signaux d'affichage, de GPIO, de stockage, d'audio et d'alimentation

## Quand utiliser cette carte { #when-to-use-this-board }

Choisissez la SF32LB52-DevKit-LCD lorsque le projet a besoin d'une plateforme d'affichage prête à l'emploi plutôt que d'une carte de prototypage minimale.

- Mettre en service des dalles LCD QSPI, SPI, DSPI ou MCU/8080
- Valider l'intégration d'un panneau tactile
- Tester LVGL ou des applications d'interface personnalisées sur le SF32LB52x
- Évaluer l'entrée microphone et la sortie haut-parleur
- Réaliser un prototype de stockage sur carte TF
- Comparer les options de module avant de s'engager sur un circuit imprimé personnalisé

Pour une carte plus petite à demi-trous métallisés, utilisez la [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Pour un accès maximal aux broches et aux signaux, utilisez la [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuration matérielle { #hardware-configuration }

<div align="center"><em>Récapitulatif de la configuration matérielle</em></div>

<div align="center" markdown>

| Domaine | Configuration |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6 ; 16 Mo de QSPI-NOR + 8 Mo de PSRAM OPI |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6 ; 128 Mo de QSPI-NAND + 16 Mo de PSRAM OPI |
| Horloges | Quartz principal de 48 MHz et quartz RTC de 32,768 kHz sur le module |
| RF | Antenne embarquée ou connecteur IPEX sélectionné par une résistance de 0 Ω |
| Affichage | QSPI/SPI/DSPI et MCU/8080 8 bits |
| Tactile | Interface tactile I2C |
| Audio | Entrée microphone MEMS et amplificateur de haut-parleur de classe D |
| Stockage | Emplacement pour carte MicroSD via SPI |
| USB | Type-C USB-UART et Type-C USB 2.0 FS |
| Batterie | Connecteur pour batterie Li-ion/Li-polymère à un élément |
| Chargeur | Chargeur linéaire ETA9640P, courant de charge par défaut de 450 mA |

</div>

Les codes de cartes et les configurations mémoire ci-dessus suivent le [guide des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) de SiFli. Avant d'utiliser une carte comme base de conception, vérifiez sa révision par rapport au marquage de la carte et au paquet de conception correspondant.

Les désignations de mémoire Flash de la variante A128R16 diffèrent selon les sources officielles : le [guide OpenSiFli des modèles de modules](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) désigne le module comme équipé de 128 Mo de SPI-NAND, tandis que le guide des modèles de cartes indique 128 Mo de QSPI-NAND pour la référence DevKit correspondante. Les sources n'expliquent pas si cette différence concerne le composant monté ou seulement la désignation de l'interface. Avant de vous appuyer sur cette configuration, confirmez le composant de mémoire Flash et le mode de bus dans le schéma et la nomenclature de la révision exacte de la carte.

## Notes de version { #version-notes }

<div align="center"><em>Historique des versions de la carte</em></div>

<div align="center" markdown>

| Version | Base de module | Notes |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | Détection de carte SD déplacée sur PA26. Les listes de modèles actuelles de SiFli incluent les deux configurations MOD-1 indiquées ci-dessus. |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | Mise à jour du circuit de charge, de la commutation d'alimentation, du gain de l'amplificateur audio, du comportement de réinitialisation, du circuit de LED RVB, de la compatibilité des broches du module, du filtrage de l'alimentation RF, de la prise en charge du double Flash, de la détection de carte SD, du Wi-Fi SDIO optionnel, de la zone d'exclusion de l'antenne et de la protection VBUS |
| V1.0.0 | Module SF32LB52 antérieur | Première version publique de la carte |

</div>

Vérifiez la sérigraphie et le paquet de conception de la révision exacte de la carte avant d'utiliser le brochage pour concevoir une carte porteuse ou un gabarit de production.

![SF32LB52-DevKit-LCD, vue de face annotée](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vue de face annotée</em></div>

![SF32LB52-DevKit-LCD, vue de dos annotée](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — vue de dos annotée</em></div>

## Prise en main { #getting-started }

### Matériel requis { #required-hardware }

- Carte SF32LB52-DevKit-LCD
- Module LCD compatible avec l'interface choisie
- Câble de données USB 2.0, Type-A vers Type-C ou équivalent
- Ordinateur hôte sous Windows, Linux ou macOS

### Matériel optionnel { #optional-hardware }

- Haut-parleur
- Carte TF
- Batterie Li-ion/Li-polymère à un élément, généralement de 450 mAh à 500 mAh
- Second câble USB lorsque le débogage UART et le test USB natif sont nécessaires en même temps

### Installation de base { #basic-setup }

1. Connectez le module LCD au bon connecteur LCD.
2. Reliez le port Type-C USB-UART à l'ordinateur hôte.
3. Ouvrez SifliTrace ou l'outil de téléchargement de firmware SiFli.
4. Sélectionnez le port série détecté.
5. Alimentez la carte et téléchargez ou exécutez le firmware cible.
6. Une fois l'écran allumé, vérifiez le tactile, les graphiques, le stockage et l'audio selon les besoins de l'application.

Utilisez un véritable câble USB compatible données. Les câbles de charge seule peuvent alimenter la carte mais n'exposent ni le port série ni l'interface de données USB.

## Alimentation { #power }

La SF32LB52-DevKit-LCD peut être alimentée de deux manières principales :

- Alimentation USB Type-C par l'un ou l'autre des connecteurs USB
- Alimentation par batterie via le connecteur de batterie de la carte

Pour le téléchargement du firmware et le débogage courant, utilisez le port Type-C USB-UART. L'alimentation par batterie est utile pour tester l'affichage, l'audio et le comportement basse consommation sans alimentation filaire.

La carte intègre un chargeur linéaire ETA9640P. Le courant de charge maximal pris en charge est de 1 A, et le réglage par défaut du courant constant est de 450 mA. Utilisez une batterie Li-ion ou Li-polymère à un élément et vérifiez la polarité du connecteur sur la sérigraphie de la carte avant de brancher la batterie.

## Téléchargement et débogage { #download-and-debug }

Le port USB-UART est l'interface principale de téléchargement du firmware et de journalisation.

- **Mode de téléchargement** : activez l'option BOOT dans l'outil de téléchargement, puis mettez la carte sous tension ou réinitialisez-la.
- **Mode débogage/journal** : désactivez l'option BOOT, puis mettez la carte sous tension ou réinitialisez-la pour passer en fonctionnement normal avec journal série.

Certaines cartes SF32LB52x utilisent le signal RTS de l'USB-UART pour la réinitialisation. Si la carte se réinitialise de façon inattendue à la première ouverture du port série, désactivez le contrôle de flux modem ou matériel dans les paramètres du port série de l'hôte.

![Désactiver le contrôle de flux modem dans les paramètres avancés du port série](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Désactivation du contrôle de flux modem dans les paramètres du port série</em></div>

## Interface LCD et tactile { #lcd-and-touch-interface }

La carte prend en charge les dalles LCD QSPI via un connecteur FPC à 22 broches au pas de 0,5 mm. Le connecteur est de type vertical à verrou rabattable. Si une dalle utilise un ordre de broches différent, employez une carte adaptatrice avant de la connecter.

Les capacités LCD et tactiles prises en charge comprennent :

- Signalisation LCD SPI, DSPI et QSPI
- Signalisation LCD QSPI en mode DDR
- Signalisation LCD MCU/8080 8 bits
- Réinitialisation du LCD, sélection de puce, horloge, données, TE et PWM du rétroéclairage
- SDA/SCL, interruption et réinitialisation du panneau tactile I2C

La note d'origine de la carte publiée par SiFli indique `TFT-H043A28WQISTKN22_V0-3` comme modèle d'écran pris en charge.

### Table des signaux du FPC QSPI à 22 broches { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>Table des signaux du FPC QSPI à 22 broches</em></div>

<div align="center" markdown>

| Broche | Signal | Fonction |
| :--- | :--- | :--- |
| 1 | LEDK | Cathode du rétroéclairage LCD |
| 2 | LEDA | Anode du rétroéclairage LCD |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | Réinitialisation du LCD |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Sortie 3,3 V |
| 18 | PA31 | Interruption du tactile |
| 19 | PA33 | SDA I2C du tactile |
| 20 | PA30 | SCL I2C du tactile |
| 21 | PA09 | Réinitialisation du tactile |
| 22 | GND | Masse |

</div>

**Divergence sur le nombre de broches dans la source — à vérifier avant de connecter un écran :** SiFli décrit le connecteur et la table des signaux comme étant à 22 broches, mais le schéma de connexion qui les accompagne numérote les contacts de 1 à 24 et indique les broches 22 à 24 comme GND. La source ne résout pas cette divergence. Vérifiez le connecteur physique et le schéma de la révision exacte de la carte avant de choisir ou de câbler une nappe flexible ; ne supposez pas qu'un câble à 22 broches s'adapte à un connecteur à 24 positions.

## Principales affectations des broches du module { #key-module-pin-assignments }

![Définition de l'embase 40 broches de la SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>Définition de l'embase 40 broches</em></div>

<div align="center"><em>Affectations clés des broches du module</em></div>

<div align="center" markdown>

| Broche du module | Signal | Fonction sur la carte |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | Détection de branchement du chargeur |
| PA43..PA37 | DB7..DB2 | Données LCD MCU/8080 |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | Données LCD |
| PA06 | DC / QSPI D1 | Données/commande LCD |
| PA05 | RD / QSPI D0 | Données LCD |
| PA04 | WR / QSPI CLK | Horloge LCD |
| PA03 | CS / QSPI CS | Sélection de puce du LCD |
| PA02 | TE / QSPI TE | Signal d'effet de déchirement (tearing) du LCD |
| PA01 | BL_PWM | Commande du rétroéclairage |
| PA00 | RSTB | Réinitialisation du LCD |
| PA33 / PA30 | I2C SDA / SCL | Panneau tactile |
| PA31 / PA09 | Touch INT / RST | Panneau tactile |
| PA24, PA25, PA28, PA29 | SPI1 | Interface de la carte TF |
| PA26 | Détection de carte / LED | Fonction partagée |
| PA20 / PA27 | UART RX/TX | UART utilisateur |
| PA18 / PA19 | UART de débogage RX/TX | Téléchargement et débogage logiciel |
| PA10 | AU_PA_EN | Activation de l'amplificateur audio |
| MIC_ADC_IN / MIC_BIAS | Microphone analogique | Entrée microphone |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Audio analogique | Entrée de l'amplificateur de haut-parleur |

</div>

## Notes de compatibilité des modules { #module-compatibility-notes }

- Sur le SF32LB52-MOD-1, la broche 17 est une sortie 3,3 V désactivée par défaut et qui doit être activée par logiciel.
- Sur les SF32LB52-MOD-A/B, la broche 17 est une entrée d'alimentation 3,3 V.
- Sur le SF32LB52-MOD-1, la broche 27 est une entrée VBAT de 3,2 V à 4,7 V.
- Sur les SF32LB52-MOD-A/B, la broche 27 est une entrée d'alimentation 3,3 V.
- Sur le SF32LB52-MOD-1, le seuil de mise sous tension de VBAT est de 3,58 V et le seuil de mise hors tension de 3,48 V. Pour tester sans batterie, 3,8 V sur VBAT est recommandé.
- PA21 sur la broche 62 du module n'est disponible que sur les SF32LB52-MOD-A/B. Il n'est pas connecté sur le SF32LB52-MOD-1.
- Les broches 62 à 68 du module peuvent être reliées en interne au Flash NOR par défaut. Pour utiliser le SDIO en externe, choisissez une variante de module sans Flash interne sur ces broches.

## Audio { #audio }

La carte comprend un microphone MEMS et un amplificateur de puissance audio.

- Utilisez le chemin du microphone embarqué pour valider l'entrée audio analogique.
- Utilisez le connecteur de haut-parleur pour tester la sortie audio.
- Le chemin du haut-parleur externe prend en charge jusqu'à 3 W sur 4 Ω selon la note d'origine de la carte.

## Stockage { #storage }

Le logement MicroSD est relié via SPI. Il convient pour valider des systèmes de fichiers, des ressources d'image, des journaux et l'enregistrement de données avant de passer à une carte personnalisée.

## Cibles de compilation du SDK { #sdk-build-targets }

Le SiFli SDK utilise les noms de cibles de carte exacts suivants avec `scons --board=<board_name>` :

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

Ce sont des identifiants de cibles de compilation du SDK, pas nécessairement les noms de produit imprimés sur une carte ou un module. L'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et le fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK peuvent énumérer des ensembles différents ; confirmez la cible avec la révision du SDK utilisée.

## Documents associés { #related-documents }

[Présentation de la puce SF32LB52x]: ../chips/SF32LB52x.md
[Guide de conception matérielle SF32LB52x]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[Article original du wiki SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[Dossier de conception]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[Acheter des échantillons]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Présentation de la puce SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[Article original du wiki SiFli]__
- :fontawesome-solid-download: __[Dossier de conception]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__

</div>
