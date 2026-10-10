---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD : carte de développement SF32LB58x pour la mise en route d'écrans MIPI DSI, RGB et QSPI, avec audio, SDIO, CAN et interfaces d'extension."
tags:
    - Matériel
    - Carte de développement
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## Présentation { #overview }

Le SF32LB58-DevKit-LCD est une carte de développement construite autour de la famille de modules SF32LB58-MOD. Elle prend en charge les produits à écran DSI, DPI/RGB ou QSPI et constitue une plateforme pratique pour valider une interface haute résolution, l'audio, le stockage, l'USB et l'intégration de périphériques.

La carte réunit le module SF32LB58x, plusieurs connecteurs d'écran, une entrée microphone analogique, une sortie haut-parleurs stéréo, une MicroSD, deux ports USB Type-C, des connecteurs d'extension pour le cœur principal et le cœur basse consommation, ainsi que des interfaces d'accessoires telles que CAN et l'extension Wi-Fi SDIO.

Utilisez la carte pour valider ensemble l'écran, le stockage, l'audio, l'USB et les périphériques externes avant de vous engager dans une conception sur mesure.

![Vue de face du SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — vue de face</em></div>

![Vue de dos du SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — vue de dos</em></div>

![Schéma fonctionnel du SF32LB58-DevKit-LCD](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — schéma fonctionnel</em></div>

## Notes sur les versions de la carte et du module { #board-and-module-version-notes }

<div align="center"><em>Résumé des versions du module</em></div>

<div align="center" markdown>

| Version du module | Base | Remarques |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1 et SF32LB58-MOD-A128R32N1 avec SF32LB586VDD36 | Version actuelle ; modifie la commande d'alimentation de l'eMMC : PA74 commande VCC et PA80 commande VCCQ ; ajoute la résistance R0115 |
| V1.0.0 | SF32LB58-MOD-N16R32N1 avec SF32LB586VDD36 | Version initiale du module, telle que listée dans la section sur la version du module chez SiFli |

</div>

<div align="center"><em>Résumé des versions de la carte</em></div>

<div align="center" markdown>

| Version de la carte | Base | Remarques |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 et SF32LB58-MOD-A128R32N1-V1.0.1 | Version actuelle ; ajoute la détection de branchement USB sur PB24 ; passe le PTC à 2 A / 6 V pour prendre en charge la sortie audio double maximale ; supprime l'étage de conversion de niveau de la LED RVB car son timing est inadapté ; remplace le convertisseur DC/DC pour réduire l'ondulation de sortie ; supprime la résistance de rappel (pull-up) de USB DP pour corriger le problème d'interruption en mode périphérique USB |
| V1.0.0 | SF32LB58-MOD-N16R32N1-V1.0.0 avec SF32LB587VEE56 | Première version publique de la carte |

</div>

La source SiFli est incohérente pour la V1.0.0 : sa section sur la version du module indique SF32LB586VDD36, tandis que sa section sur la version de la carte indique SF32LB587VEE56 pour une carte portant le module N16R32N1-V1.0.0. Confirmez le marquage du silicium et du module sur le matériel réel, et consultez les fichiers de conception correspondants avant de choisir une cible de firmware ou de vous appuyer sur une configuration de stockage.

## Points forts de la carte { #board-highlights }

- Module SF32LB58-MOD-N16R32N1 ou SF32LB58-MOD-A128R32N1, selon la version de la carte
- La V1.0.1 utilise le SF32LB586VDD36 avec deux HPI-PSRAM de 16 Mo et 1 Mo de NOR QSPI dans le boîtier ; l'identifiant du MCU de la V1.0.0 est contradictoire dans la source SiFli (voir la note de version ci-dessus)
- 16 Mo de NOR QSPI ou 128 Mo de NAND QSPI supplémentaires, selon la variante de module
- Quartz principal de 48 MHz et quartz RTC de 32,768 kHz
- Connecteur d'antenne IPEX et réseau d'adaptation RF du module
- Prise en charge d'écrans MIPI DSI / RGB888 via des connecteurs FPC dédiés
- Deux chemins d'écran QSPI / DSPI / SPI exposés sur des connecteurs à 40 broches
- Prise en charge de dalles tactiles I2C
- Entrée microphone analogique sur la carte et sortie audio stéréo de classe D
- Deux ports USB Type-C : un pour le téléchargement/débogage USB-UART, un pour l'USB 2.0 HS
- Emplacement de carte MicroSD via SDIO
- Extension GPIO du cœur principal et du cœur basse consommation via deux connecteurs à 40 broches
- Capacité d'extension CAN et Wi-Fi SDIO

## Quand utiliser cette carte { #when-to-use-this-board }

Choisissez le SF32LB58-DevKit-LCD lorsque le projet nécessite une plateforme haut de gamme réaliste de validation de l'écran et des périphériques plutôt qu'une carte d'éclatement minimale.

- Mettre en route des écrans MIPI DSI, RGB888 ou QSPI
- Valider ensemble le tactile, l'audio, le stockage et l'USB
- Tester le comportement d'une interface haute résolution sur la plateforme SF32LB58x
- Évaluer l'extension CAN ou Wi-Fi SDIO
- Comparer les configurations de module à base de NOR et de NAND
- Valider le firmware sur une carte de classe phare avant de travailler sur un circuit imprimé sur mesure

Pour la planification de l'intégration au niveau du module, consultez aussi [SF32LB58-MOD](../modules/SF32LB58-MOD.md). Pour l'architecture de la famille de puces et ses capacités en matière d'affichage et de mémoire, voir [SF32LB58x](../chips/SF32LB58x.md).

## Configuration matérielle { #hardware-configuration }

<div align="center"><em>Résumé de la configuration matérielle</em></div>

<div align="center" markdown>

| Domaine | Configuration |
| :--- | :--- |
| Module principal | SF32LB58-MOD-N16R32N1 ou SF32LB58-MOD-A128R32N1 |
| MCU selon la révision de la carte | V1.0.1 : SF32LB586VDD36 ; V1.0.0 : écart dans la source SiFli (voir la note de version ci-dessus) |
| Mémoire dans le boîtier (V1.0.1) | HPI-PSRAM 16 Mo + 16 Mo, plus 1 Mo de NOR QSPI |
| Stockage supplémentaire | 16 Mo de NOR QSPI ou 128 Mo de NAND QSPI, selon la variante de module |
| Écran | Prise en charge des écrans MIPI DSI, DPI/RGB888 et QSPI |
| Audio | Chemin microphone analogique sur la carte et sortie haut-parleurs stéréo |
| USB | USB-UART Type-C et USB 2.0 HS Type-C |
| Canaux USB-UART | Le guide des modèles de cartes de SiFli mentionne deux canaux de débogage USB-UART CH343K ; le guide détaillé de la carte n'associe pas chaque canal à un connecteur Type-C précis |
| Stockage | Emplacement de carte MicroSD via SDIO |
| Antenne | Chemin RF du module avec connecteur IPEX |
| Extension | Deux connecteurs à 40 broches pour l'extension du cœur principal et du cœur basse consommation |
| Commandes et points de test | Deux touches utilisateur (HOME/réinitialisation par appui long et touche de fonction), une touche de réinitialisation distincte, un cavalier de démarrage MODE et des points de test UART/USB/CAN |
| Conversion de puissance | Convertisseurs DC-DC sur la carte ; le journal des modifications SiFli V1.0.1 consigne un remplacement de convertisseur pour réduire l'ondulation de sortie mais n'en précise pas la référence. Vérifiez la révision exacte dans le schéma/la nomenclature. |
| Dimensions de la carte / température de fonctionnement | 65 × 50 mm / −40 à 85 °C |

</div>

## Prise en main { #getting-started }

### Matériel nécessaire { #required-hardware }

- Carte SF32LB58-DevKit-LCD
- Module LCD MIPI DSI, RGB888 ou QSPI, selon le cas
- Câble de données USB 2.0, Type-A vers Type-C ou équivalent
- Ordinateur hôte sous Windows, Linux ou macOS

### Matériel optionnel { #optional-hardware }

- Deux haut-parleurs
- Carte TF / MicroSD
- J-Link ou débogueur SWD compatible
- Carte transceiver CAN
- Module Wi-Fi SDIO

### Mise en place de base { #basic-setup }

1. Branchez l'écran cible sur le bon connecteur LCD.
2. Reliez le port USB Type-C USB-UART à l'ordinateur hôte.
3. Ouvrez l'outil de téléchargement de SiFli et sélectionnez le bon port COM.
4. Installez ou retirez le cavalier Mode selon que vous souhaitez le mode téléchargement ou le mode d'exécution normal.
5. Alimentez la carte, puis téléchargez ou exécutez le firmware cible.
6. Après la mise en route de l'écran, validez le tactile, l'audio, le stockage et tous les périphériques d'extension requis par le produit.

Utilisez un véritable câble USB capable de transmettre des données. Certains câbles Type-C n'assurent que l'alimentation et n'exposent ni l'UART ni le chemin de données USB.

## Alimentation { #power }

Le SF32LB58-DevKit-LCD est alimenté par USB Type-C.

- Les deux connecteurs USB Type-C de la carte peuvent alimenter la carte
- Pour le téléchargement du firmware et la journalisation UART, utilisez le port Type-C USB-UART
- Prévoyez séparément le port Type-C USB 2.0 HS lorsque vous validez des fonctions USB natives

## Téléchargement et débogage { #download-and-debug }

L'interface principale de téléchargement du firmware et de journaux série est le port Type-C USB-UART.

- **Mode téléchargement** : installez le cavalier Mode, puis mettez la carte sous tension ou réinitialisez-la
- **Mode débogage logiciel/journaux** : retirez le cavalier Mode, puis mettez la carte sous tension ou réinitialisez-la

La carte prend aussi en charge le débogage J-Link / SWD.

![Référence de câblage J-Link du SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — référence de câblage J-Link</em></div>

![Référence de l'adaptateur J-Link](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>Référence de l'adaptateur J-Link</em></div>

![Référence de l'adaptateur SWD](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>Référence de l'adaptateur SWD</em></div>

## Cibles de compilation du SDK { #sdk-build-targets }

La configuration de compilation du SDK SiFli utilise les noms exacts de cartes cibles suivants avec `scons --board=<board_name>` :

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

Ce sont des identifiants de cibles de compilation du SDK, pas nécessairement les noms de produit imprimés sur une carte ou un module. L'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et le fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK peuvent énumérer des ensembles différents ; confirmez la cible par rapport à la révision du SDK utilisée. En particulier, l'index et la configuration de compilation ne décrivent pas toutes les cibles de la série 58 de la même façon, et l'actuel [guide des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) ne liste aucune référence physique correspondant à `sf32lb58-lcd_n16r64n4`.

## Principaux signaux du module et d'extension { #key-module-and-expansion-signals }

La carte expose à la fois des signaux au niveau du module et deux connecteurs d'extension à 40 broches. Utilisez la fiche technique du module et le dossier de schémas pour le brochage exhaustif ; le résumé ci-dessous couvre les groupes les plus importants pour la conception.

<div align="center"><em>Principaux groupes de signaux fonctionnels</em></div>

<div align="center" markdown>

| Groupe de signaux | Broches / signaux typiques | Usage principal |
| :--- | :--- | :--- |
| Téléchargement et débogage | PB36, PB37, SWDIO, SWCLK, Boot_Mode, RSTN | Téléchargement UART, débogage logiciel, mise en route SWD |
| MicroSD | PA75, PA76, PA77, PA70, PA81, PA79, PB58 | Interface de carte SDIO et détection de carte |
| RGB LCDC1 | PA12–PA15, PA22–PA27, PA43–PA48, PA50, PA53–PA58, PA61–PA63, PA65, PA67 | Chemin d'affichage RGB888 |
| MIPI DSI LCDC1 | Paires différentielles DSI_D0–DSI_D3 et DSI_CLK | Chemin d'affichage MIPI DSI ; le fonctionnement documenté prend en charge jusqu'à deux voies de données |
| QSPI LCDC1 | PA82, PA84, PA86, PA88, PA90, PA91, PA51, PA52 | Chemin d'affichage QSPI côté cœur principal |
| QSPI LCDC2 | PB02–PB04, PB06, PB08–PB10, PB23, PB27, PB30, PB31, PB34 | Chemin d'affichage QSPI côté cœur basse consommation |
| Tactile | PA16, PA17, PA59, PA60, PA92, PA93 | Signaux de réinitialisation, d'interruption et I2C de la dalle tactile |
| Audio | AU_DAC1/2, AU_ADC1/2, MIC_BIAS, PB23 | Entrée/sortie audio analogique et activation de l'amplificateur |
| CAN / extension générale | PA02, PA11 et groupes de GPIO des connecteurs | CAN et extension de périphériques |

</div>

## Interfaces d'écran { #display-interfaces }

La carte prend en charge trois chemins d'affichage principaux :

- **MIPI DSI** via un connecteur FPC à 30 broches au pas de 0,5 mm
- **RGB888** via un connecteur FPC à 40 broches au pas de 0,5 mm, compatible avec le brochage RVB ALIENTEK courant
- **QSPI / DSPI / SPI** via les deux connecteurs d'extension à 40 broches

Les indications d'écrans pris en charge issues de la source SiFli comprennent :

- Écrans MIPI DSI jusqu'à 2 voies et jusqu'à une résolution de 1280 × 800
- Écrans RGB888 jusqu'à une résolution de 1280 × 800
- Écrans QSPI jusqu'à une résolution de 512 × 512

!!! warning "Nombre de voies MIPI DSI"
    Le brochage du connecteur à 30 broches de la carte indique D0–D3, mais le guide de la carte et le SDK documentent un fonctionnement avec jusqu'à deux voies de données. Ne déduisez pas une prise en charge à quatre voies des libellés du connecteur. Vérifiez le câblage des voies pour l'écran et la révision de carte exacts avant utilisation.

![Référence de câblage d'écran MIPI](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — référence de câblage d'écran MIPI</em></div>

![Référence de câblage d'écran QSPI LCDC1](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — câblage d'écran QSPI LCDC1</em></div>

![Référence de câblage d'écran QSPI LCDC2](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — câblage d'écran QSPI LCDC2</em></div>

## Audio { #audio }

La carte prend en charge :

- Un chemin d'entrée microphone sur la carte
- Deux chemins d'entrée CAN audio ; des cavaliers à résistances déterminent si un chemin partagé est relié au microphone de la carte ou à l'entrée du connecteur à 40 broches
- Deux sorties haut-parleurs
- Un chemin de signal PDM multiplexé avec les signaux RGB et donc indisponible lorsque le chemin d'affichage RGB est actif

Le [guide détaillé de la carte](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html) de SiFli indique pour la sortie analogique stéréo jusqu'à 2,8 W/4 Ω, tandis que son [guide des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) indique 3 W/4 Ω pour les deux sorties haut-parleurs. Aucune source ne précise si la valeur s'entend par canal ou au total. Vérifiez la révision exacte de la carte, le schéma ainsi que les conditions d'alimentation et de charge de l'amplificateur avant de choisir des haut-parleurs ; ne considérez aucune de ces valeurs comme une puissance de sortie garantie par canal.

![Référence de câblage audio](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — référence de câblage audio</em></div>

## Extension CAN et Wi-Fi SDIO { #can-and-sdio-wi-fi-expansion }

Le module SF32LB58 sous-jacent comprend un contrôleur CAN, et la carte expose l'interface pour un usage avec un transceiver externe.

![Référence de câblage CAN](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — référence de câblage CAN</em></div>

![Carte transceiver CAN de référence](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>Carte transceiver CAN de référence</em></div>

La carte prend aussi en charge l'extension Wi-Fi SDIO via l'interface du connecteur.

![Module Wi-Fi SDIO de référence](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>Module Wi-Fi SDIO de référence</em></div>

![Référence de câblage Wi-Fi SDIO](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — référence de câblage Wi-Fi SDIO</em></div>

![Schéma de référence du Wi-Fi SDIO](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>Schéma de référence du Wi-Fi SDIO</em></div>

## Documents associés { #related-documents }

[Présentation de la puce SF32LB58x]: ../chips/SF32LB58x.md
[Manuel utilisateur du SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[Dossier de conception du SF32LB58-MOD]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[Dossier de conception du SF32LB58-DevKit-LCD]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[Projet LCEDA du SF32LB58-DevKit-LCD]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[Acheter des échantillons]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Présentation de la puce SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur du SF32LB58x]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[Dossier de conception du SF32LB58-MOD]__
- :fontawesome-solid-download: __[Dossier de conception du SF32LB58-DevKit-LCD]__
- :fontawesome-solid-download: __[Projet LCEDA du SF32LB58-DevKit-LCD]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__

</div>
