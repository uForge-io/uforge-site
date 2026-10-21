---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directives de schéma du SF32LB57x pour horloge, RF et interfaces utilisateur : quartz 48 MHz/32,768 kHz, adaptation RF, affichage, tactile, audio, caméra, moteur."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x — Horloge, RF et interfaces utilisateur { #sf32lb57x-hardware-design-guide-clock-rf-user-interfaces }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Cette page couvre les sections 5.3 à 5.5 des directives de conception du schéma : génération d'horloge, RF et interfaces utilisateur. Revenez à [Système minimal et alimentation](SF32LB57x_schematic_system_power.md) ou poursuivez vers [Stockage et fabrication](SF32LB57x_schematic_storage_mfg.md).

### 5.3. Génération d'horloge { #53-clock-generation }

La génération d'horloge couvre le quartz principal de 48 MHz, le quartz RTC de 32,768 kHz et les conditions d'étalonnage qui influent sur la RF, le Bluetooth, la précision du RTC et le fonctionnement en basse consommation. Tenez compte des critères de sélection des quartz et de leurs contraintes d'implantation lors de la revue du schéma et de la PCB.

#### 5.3.1. Quartz principal de 48 MHz { #531-48-mhz-main-crystal }

Paramètres recommandés :

<div align="center"><em>Tableau 5.3-1 : Paramètres recommandés du quartz principal de 48 MHz</em></div>

<div align="center" markdown>

| Paramètre | Recommandation |
|:----------|:---------------|
| Capacité de charge CL | 7 pF à 12 pF, environ 8,8 pF recommandé |
| Tolérance de fréquence | <= ±10 ppm |
| ESR | <= 30 Ω, environ 22 Ω recommandé |

</div>

Selon le guide source, la consommation du quartz diminue lorsque `CL` et l'ESR diminuent. Prévoyez une empreinte pour un condensateur d'adaptation en parallèle, à côté du quartz de 48 MHz. Pour un quartz dont `CL` est inférieur à 12 pF, le condensateur n'a pas besoin d'être monté d'après la source.

Exigences de placement et de routage :

- Placez le quartz près des broches de la puce, de préférence sous le capot de blindage.
- Gardez-le à l'écart du PA, du chargeur, du PMU, du DC/DC, de la batterie et des pistes numériques à haute vitesse.
- Dans la mesure du possible, routez sur la couche supérieure avec une largeur de piste de 0,1 mm et une longueur de 3 mm à 10 mm. Maintenez un espacement d'au moins 0,15 mm entre `48M_XI` et `48M_XO`, comme sur la figure de routage source.
- Respectez la zone d'exclusion du quartz sur la couche supérieure indiquée dans la conception de référence et ne routez aucun signal sous le quartz. La source contient des indications contradictoires sur le cuivre de masse de la couche adjacente ; voir l'avertissement ci-dessous.
- Utilisez un blindage tridimensionnel relié à la masse, mais évitez de placer celle-ci trop près des pistes d'oscillation.

La plage spécifiée de capacité de charge du quartz de 48 MHz est de 7 à 12 pF, avec environ 8,8 pF recommandés. Validez le quartz choisi avec le circuit oscillateur sur le matériel du produit et confirmez l'écart de fréquence. Intégrez l'étalonnage de fréquence du quartz à la mise en service en production ; ne supposez pas que le réglage logiciel par défaut convient à tous les quartz.

#### 5.3.2. Quartz RTC de 32,768 kHz { #532-32768-khz-rtc-crystal }

Paramètres recommandés :

<div align="center"><em>Tableau 5.3-2 : Paramètres recommandés du quartz RTC de 32,768 kHz</em></div>

<div align="center" markdown>

| Paramètre | Recommandation |
|:----------|:---------------|
| Capacité de charge CL | 7 pF ou 11,5 pF (la puce utilise 11,5 pF par défaut ; 7 pF nécessite une modification de registre) ; 7 pF est recommandé pour la consommation la plus faible |
| Tolérance de fréquence | <= ±20 ppm |
| ESR | <= 80 kΩ, environ 38 kΩ recommandé |

</div>

Selon la source, une valeur plus faible de `CL` et d'ESR réduit la consommation du quartz. Les valeurs de 7 pF et 11,5 pF ne nécessitent pas de condensateur d'adaptation externe. Pour toute autre capacité de charge, mesurez le circuit afin de déterminer la valeur d'adaptation nécessaire.

Exigences de placement et de routage :

- Placez le quartz près de la puce et gardez les pistes courtes.
- Limitez la largeur des pistes à 0,1 mm et leur longueur à 10 mm maximum. Maintenez un espacement d'au moins 0,15 mm entre `32K_XI` et `32K_XO`, comme sur la figure de routage source, et ajoutez un blindage de masse 3D.
- Respectez la zone d'exclusion du quartz sur la couche supérieure indiquée dans la conception de référence et ne routez aucun signal sous le quartz. La source contient des indications contradictoires sur le cuivre de masse de la couche adjacente ; voir l'avertissement ci-dessous.
- Éloignez le quartz des sources de bruit liées à l'alimentation, à la RF, à l'USB, au SDIO, à l'horloge d'affichage et à la charge.

<div align="center"><em>Tableau 5.3-3 : Exemples de quartz recommandés</em></div>

<div align="center" markdown>

| Quartz | Numéro de pièce | Fournisseur | Paramètres clés |
|:--------|:------------|:-------|:---------------|
| 48 MHz | E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 à +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR -30 à 85 °C, boîtier 2016. |
| 32,768 kHz | ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 à +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 à 85 °C, boîtier 3215. |
| 48 MHz | SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 à +10 ppm, CL = 8,8 pF, ESR <= 40 Ω, TOPR -20 à 75 °C, boîtier 2016 ; un ESR plus élevé augmente légèrement la consommation statique. |
| 32,768 kHz | SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 à +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 à 85 °C, boîtier 3215. |
| 32,768 kHz | SF32WK32768D71T005 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 à +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 à 85 °C, boîtier 3215. |
| 48 MHz | CN4048M000885C822000 | JWT | F0 = 48,000000 MHz, ΔF/F0 = -8 à +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR -30 à 85 °C, boîtier 2016. |
| 32,768 kHz | DH2032K76807T2719002 | JWT | F0 = 32,768 kHz, ΔF/F0 = -20 à +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 à 85 °C, boîtier 3215. |

</div>

Le `CL` du quartz de 32,768 kHz doit correspondre à la configuration du registre : pour 7 pF, réglez `PMUC->LXT_CR->CAP_SEL = 0` ; pour 11,5 pF, réglez `PMUC->LXT_CR->CAP_SEL = 1`. Confirmez ce réglage dans le firmware avant l'EVT : les modèles de quartz recommandés sont principalement des modèles de 7 pF, alors que certains réglages par défaut du firmware peuvent correspondre à une autre capacité de charge.

!!! warning "Indications contradictoires de la source sur le cuivre de masse sous les quartz"
    La source n'est pas cohérente sur le cuivre sous les quartz : une note de la section horloge demande de retirer au moins le cuivre de masse de la deuxième couche ; le texte de routage des quartz prévoit une zone d'exclusion sur la couche adjacente ; les vues en coupe montrent du cuivre de masse sur L2 sous les pistes ; et la section sur l'empilage exige un plan de masse continu sur L2. N'en déduisez pas une règle unique. Avant la validation de la PCB, vérifiez l'implantation avec la dernière conception de référence SF32LB57x approuvée.

#### 5.3.3. Sorties d'horloge basse consommation { #533-low-power-clock-outputs }

En modes Sleep, DeepSleep, Standby et Hibernate, les broches `PA24` à `PA27` peuvent fournir l'horloge RC10K ou une horloge de 32,768 kHz.

En modes Sleep, DeepSleep et Standby, `PA24` à `PA27` peuvent également fournir une horloge PWM générée par LPTIM2, jusqu'à 16 kHz.

### 5.4. RF { #54-rf }

#### 5.4.1. Schéma RF { #541-rf-schematic }

Exigences clés du schéma RF :

- Réservez l'empreinte d'un réseau d'adaptation en π dans le chemin d'antenne pour le filtrage des parasites et l'ajustement de l'antenne.
- Le schéma de référence montre des empreintes NC pour les condensateurs shunt et un condensateur série de 15 pF / 50 V. Le texte source précise aussi qu'une antenne déjà adaptée en impédance ne nécessite aucun composant d'adaptation supplémentaire. Déterminez les composants à monter selon la conception de l'antenne et les mesures RF ; le montage illustré n'est pas universel.
- Placez le réseau d'adaptation près de la broche RF de la puce, pas près de l'extrémité de l'antenne.
- Placez le condensateur de filtrage `AVDD_BRF` près de la puce et connectez sa masse directement à la masse principale via des vias à proximité.
- Planifiez l'antenne, le réseau d'adaptation, l'ESD RF et le connecteur comme une seule chaîne de signal.

![Figure 5.4-1 : Référence de schéma RF](../../sf32-products/chips/assets/57x/SF32LB57x-rf-diagram.png){ width="80%" loading="lazy" }

<div align="center"><em>Figure 5.4-1 : Référence de schéma RF</em></div>

#### 5.4.2. PCB RF { #542-rf-pcb }

Exigences de routage de la PCB :

- Routez la piste RF comme une ligne asymétrique de 50 Ω.
- Préférez le routage en couche supérieure avec un minimum de vias et de changements de couche.
- Évitez les angles vifs et les coins à angle droit.
- Ajoutez du cuivre de masse et des clôtures de vias des deux côtés.
- Gardez une référence de masse continue sous la piste RF.
- Éloignez les pistes RF des convertisseurs DC/DC, des quartz, de l'USB, du SDIO, des horloges d'affichage, des chemins de charge à fort courant et des autres zones bruyantes.

#### 5.4.3. Mise en service et étalonnage RF { #543-rf-bring-up-and-calibration }

Vérifiez les performances RF par des mesures ; un schéma correctement câblé n'est que le point de départ.

Éléments recommandés de mise en service RF :

- Confirmez l'écart de fréquence du quartz de 48 MHz et la stabilité au démarrage.
- Effectuez des essais RF conduits pour vérifier la puissance d'émission, l'écart de fréquence, la sensibilité du récepteur et la qualité de modulation.
- Ajustez le réseau d'adaptation en π avec la structure mécanique finale, la batterie, le blindage et le placement de l'antenne.
- Vérifiez les performances RF pendant que l'affichage est allumé, la charge est active, l'USB/SDIO/rafraîchissement d'affichage est en cours, le moteur est actif et l'audio fonctionne.
- Assurez-vous que le banc de test de production permet l'étalonnage du quartz, les essais RF de base et le téléchargement du firmware.

!!! note
    L'adaptation d'antenne doit être réalisée sur un prototype dont la structure est proche de celle du produit final. Les résultats obtenus sur une carte nue ne représentent généralement pas les performances RF du produit final.

### 5.5. Interfaces utilisateur { #55-user-interfaces }

#### 5.5.1. Affichage, tactile et rétroéclairage { #551-display-touch-and-backlight }

Examinez l'affichage, le tactile et le rétroéclairage comme un seul groupe d'interfaces, car la synchronisation du panneau, la séquence d'alimentation, le routage FPC, le réveil tactile, l'ESD et le bruit du rétroéclairage interagissent souvent pendant la mise en service de la carte.

#### 5.5.2. Sélection de l'interface d'affichage { #552-display-interface-selection }

Le LCDC du SF32LB57x prend en charge plusieurs types d'interface d'affichage selon le composant exact.

<div align="center"><em>Tableau 5.5-1 : Guide de sélection de l'interface d'affichage</em></div>

<div align="center" markdown>

| Interface | Cas d'utilisation | Remarques matérielles |
|:----------|:---------|:---------------|
| SPI / QSPI | Petits écrans TFT/AMOLED et affichages portables | Faible nombre de broches, bande passante limitée, adapté au rafraîchissement partiel. |
| MCU 8080 | Panneaux d'affichage parallèles | Bande passante plus élevée que les interfaces série mais utilise plus de broches. |
| RGB / DPI | Panneaux de résolution moyenne ou élevée | Flux de pixels continu, avec des exigences strictes en matière de bande passante et de synchronisation. |
| MIPI DSI | AMOLED haute densité | Bande passante élevée avec peu de broches, mais initialisation et intégrité du signal plus complexes. |
| EPD | Papier électronique | Faible taux de rafraîchissement, nécessite VCOM, PMIC et planification de forme d'onde. |
| JDI | Affichages basse consommation Memory-in-Pixel | Adapté aux produits toujours actifs et lisibles en plein soleil. |

</div>

Remarques et exemples courants sur l'affichage :

- Le contrôleur d'affichage prend en charge le SPI 3 fils, le SPI 4 fils, le SPI double données, le SPI quadruple données, le RGB 16 bits, le MCU 8080 16 bits, l'EPD 16 bits et le JDI série/parallèle.
- Les profondeurs de couleur prises en charge incluent RGB888, RGB666, RGB565 et RGB111 ; la résolution maximale peut atteindre 1024 x 1024. Confirmez les modes exacts pour le composant sélectionné.
- Les projets haute résolution doivent examiner tôt la bande passante de l'interface, la RAM d'affichage, la bande passante PSRAM et la stratégie de rafraîchissement.
- Si un projet n'a pas besoin d'un brochage personnalisé, partez d'un groupe d'E/S adapté au SDK ou de conception de référence pour l'interface de panneau sélectionnée. Le routage matriciel est flexible, mais l'utilisation d'un groupe d'E/S pris en charge par logiciel réduit le risque de pilote et de mise en service.
- L'initialisation du panneau, la séquence d'alimentation et le mode d'interface doivent suivre la fiche technique du fournisseur de panneau.

<div align="center"><em>Tableau 5.5-2 : Points de départ des E/S d'affichage</em></div>

<div align="center" markdown>

| Interface d'affichage | Point de départ recommandé |
|:------------------|:---------------------------|
| SPI / QSPI | Préférez les broches dédiées `LCDC1_SPI_*` de la table de multiplexage. Si vous utilisez des signaux LCDC SPI routés via la matrice, limitez l'horloge d'affichage à 50 MHz et vérifiez la force de pilotage des GPIO. |
| RGB / DPI | Au-dessus de 30 MHz, utilisez `PA22` à `PA50` pour les signaux LCDC routés via la matrice ; `PA52` à `PA54` ne peuvent transporter que `B1` à `B6`. À des vitesses d'interface plus faibles, le routage matriciel reste possible après vérification des contraintes de synchronisation. |
| MCU 8080 | Pour les conceptions rapides, appliquez les mêmes règles de sélection des groupes de broches que pour RGB/DPI ; vérifiez la largeur du bus, la synchronisation et la force de pilotage par rapport aux exigences de l'écran. |
| EPD | Lorsque le bus EPD dépasse 30 MHz, appliquez les mêmes règles de sélection des groupes de broches que pour RGB/DPI ; vérifiez également les broches de commande VCOM et PMIC. |
| JDI | Suivez la table de mappage de signal LCDC JDI et préférez une configuration de panneau adaptée au SDK lorsque disponible. |
| MIPI DSI | Utilisez l'affectation fixe des signaux DSI définie pour le composant et la conception de référence ; vérifiez avec l'équipe logicielle le routage des voies et l'initialisation de l'écran. |

</div>

<div align="center"><em>Tableau 5.5-3 : Exemples de contrôleurs LCD</em></div>

<div align="center" markdown>

| Pilote | Fournisseur | Résolution | Type | Interfaces typiques |
|:-------|:-------|:-----------|:-----|:-------------------|
| RM69090 | Raydium | 368 x 448 | AMOLED | SPI, Quad SPI, MIPI-DSI |
| RM69330 | Raydium | 454 x 454 | AMOLED | SPI, Quad SPI, MCU 8080 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368 x 448 | AMOLED | Quad SPI, MIPI-DSI |
| SH8601A | Shenghe | 454 x 454 | AMOLED | SPI, Quad SPI, MCU 8080 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356 x 400 | TFT | Quad SPI |
| GC9C01 | Galaxycore | 360 x 360 | TFT | Quad SPI |
| GC9B71 | Galaxycore | 320 x 380 | TFT | Quad SPI |
| ST77903 | Sitronix | 400 x 400 | TFT | Quad SPI |
| ICNA3311 | Chipone | 454 x 454 | AMOLED | Quad SPI |
| FT2308 | FocalTech | 410 x 494 | AMOLED | Quad SPI |

</div>

Les tables suivantes donnent le mappage exact signal-broche pour chaque type d'interface d'affichage. Utilisez la table correspondant à l'interface du panneau sélectionné.

<div align="center"><em>Tableau 5.5-4 : Connexions de signal d'affichage SPI/QSPI</em></div>

<div align="center" markdown>

| Signal panneau SPI | Signal 57x | Description |
|:------------------|:-----------|:-------------|
| `CSx` | `LCDC1_SPI_CS` | Signal de sélection de puce. |
| `WRx_SCL` | `LCDC1_SPI_CLK` | Signal d'horloge. |
| `DCx` | `LCDC1_SPI_DIO1` | Signal de sélection données/commande en mode SPI 4 fils ; `DATA1` en mode Quad-SPI. |
| `SDI_RDx` | `LCDC1_SPI_DIO0` | Signal d'entrée de données en mode SPI 3/4 fils ; `DATA0` en mode Quad-SPI. |
| `SDO` | `LCDC1_SPI_DIO0` | Signal de sortie de données en mode SPI 3/4 fils ; connectez cette broche à `SDI_RDx` avec un fil court. |
| `D[0]` | `LCDC1_SPI_DIO2` | `DATA2` en mode Quad-SPI. |
| `D[1]` | `LCDC1_SPI_DIO3` | `DATA3` en mode Quad-SPI. |
| `RESET` | `LCDC1_SPI_RSTB` | Signal de réinitialisation. |
| `TE` | `LCDC1_SPI_TE` | Signal TE (Tearing Effect) transmis à la MCU. |

</div>

!!! note
    Préférez les broches dédiées `LCDC1_SPI_*` de fonction 1. Si vous utilisez à la place des signaux SPI routés via la matrice (index de fonction 121 à 150), limitez l'horloge à 50 MHz et réglez la force de pilotage des GPIO sur `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tableau 5.5-5 : Connexions de signal d'affichage RGB</em></div>

<div align="center" markdown>

| Signal panneau RGB888 | Signal panneau RGB565 | Signal 57x | Description |
|:---------------------|:----------------------|:-----------|:-------------|
| CLK | CLK | `LCDC_DPI_CLK` | Signal d'horloge. |
| DE | DE | `LCDC_DPI_DE` | Signal d'activation de données en mode DE. |
| HSYNC | HSYNC | `LCDC_DPI_HSYNC` | Signal de synchronisation horizontale. |
| VSYNC | VSYNC | `LCDC_DPI_VSYNC` | Signal de synchronisation verticale. |
| R0 | - | `LCDC_DPI_R0` | Donnée rouge 0. |
| R1 | - | `LCDC_DPI_R1` | Donnée rouge 1. |
| R2 | - | `LCDC_DPI_R2` | Donnée rouge 2. |
| R3 | R0 | `LCDC_DPI_R3` | Donnée rouge 3. |
| R4 | R1 | `LCDC_DPI_R4` | Donnée rouge 4. |
| R5 | R2 | `LCDC_DPI_R5` | Donnée rouge 5. |
| R6 | R3 | `LCDC_DPI_R6` | Donnée rouge 6. |
| R7 | R4 | `LCDC_DPI_R7` | Donnée rouge 7. |
| G0 | - | `LCDC_DPI_G0` | Donnée verte 0. |
| G1 | - | `LCDC_DPI_G1` | Donnée verte 1. |
| G2 | G0 | `LCDC_DPI_G2` | Donnée verte 2. |
| G3 | G1 | `LCDC_DPI_G3` | Donnée verte 3. |
| G4 | G2 | `LCDC_DPI_G4` | Donnée verte 4. |
| G5 | G3 | `LCDC_DPI_G5` | Donnée verte 5. |
| G6 | G4 | `LCDC_DPI_G6` | Donnée verte 6. |
| G7 | G5 | `LCDC_DPI_G7` | Donnée verte 7. |
| B0 | - | `LCDC_DPI_B0` | Donnée bleue 0. |
| B1 | - | `LCDC_DPI_B1` | Donnée bleue 1. |
| B2 | - | `LCDC_DPI_B2` | Donnée bleue 2. |
| B3 | B0 | `LCDC_DPI_B3` | Donnée bleue 3. |
| B4 | B1 | `LCDC_DPI_B4` | Donnée bleue 4. |
| B5 | B2 | `LCDC_DPI_B5` | Donnée bleue 5. |
| B6 | B3 | `LCDC_DPI_B6` | Donnée bleue 6. |
| B7 | B4 | `LCDC_DPI_B7` | Donnée bleue 7. |

</div>

<div align="center"><em>Tableau 5.5-6 : Configuration du mode RGB (attribution de bits LCDC_IFx par mode)</em></div>

<div align="center" markdown>

| Signal LCDC | Mode 0 (RGB565 Conf1) | Mode 1 (RGB565 Conf2) | Mode 2 (RGB565 Conf3) | Mode 3 (RGB666 Conf1) | Mode 4 (RGB666 Conf2) | Mode 5 (RGB888) | Mode 6 (RGB666 sur 8 bits) | Mode 7 (RGB888 sur 8 bits) |
|:------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------|:-----------------------------|:-----------------------------|
| `LCDC_IF0` | B0 | B0 | - | B0 | B0 | B0 | R0/G0/B0 | R0/G0/B0 |
| `LCDC_IF1` | B1 | B1 | B0 | B1 | B1 | B1 | R1/G1/B1 | R1/G1/B1 |
| `LCDC_IF2` | B2 | B2 | B1 | B2 | B2 | B2 | R2/G2/B2 | R2/G2/B2 |
| `LCDC_IF3` | B3 | B3 | B2 | B3 | B3 | B3 | R3/G3/B3 | R3/G3/B3 |
| `LCDC_IF4` | B4 | B4 | B3 | B4 | B4 | B4 | R4/G4/B4 | R4/G4/B4 |
| `LCDC_IF5` | G0 | - | B4 | B5 | B5 | B5 | R5/G5/B5 | R5/G5/B5 |
| `LCDC_IF6` | G1 | - | - | G0 | - | B6 | - | R6/G6/B6 |
| `LCDC_IF7` | G2 | - | - | G1 | - | B7 | - | R7/G7/B7 |
| `LCDC_IF8` | G3 | G0 | G0 | G2 | G0 | G0 | - | - |
| `LCDC_IF9` | G4 | G1 | G1 | G3 | G1 | G1 | - | - |
| `LCDC_IF10` | G5 | G2 | G2 | G4 | G2 | G2 | - | - |
| `LCDC_IF11` | R0 | G3 | G3 | G5 | G3 | G3 | - | - |
| `LCDC_IF12` | R1 | G4 | G4 | R0 | G4 | G4 | - | - |
| `LCDC_IF13` | R2 | G5 | G5 | R1 | G5 | G5 | - | - |
| `LCDC_IF14` | R3 | - | - | R2 | - | G6 | - | - |
| `LCDC_IF15` | R4 | - | - | R3 | - | G7 | - | - |
| `LCDC_IF16` | - | R0 | - | R4 | R0 | R0 | - | - |
| `LCDC_IF17` | - | R1 | R0 | R5 | R1 | R1 | - | - |
| `LCDC_IF18` | - | R2 | R1 | - | R2 | R2 | - | - |
| `LCDC_IF19` | - | R3 | R2 | - | R3 | R3 | - | - |
| `LCDC_IF20` | - | R4 | R3 | - | R4 | R4 | - | - |
| `LCDC_IF21` | - | - | R4 | - | R5 | R5 | - | - |
| `LCDC_IF22` | - | - | - | - | - | R6 | - | - |
| `LCDC_IF23` | - | - | - | - | - | R7 | - | - |

</div>

`LCDC_IF24` à `LCDC_IF29` sont inutilisés dans tous les modes RGB.

<div align="center"><em>Tableau 5.5-7 : Connexions de signal d'affichage MCU8080</em></div>

<div align="center" markdown>

| Signal panneau MCU8080 16 bits | Signal panneau MCU8080 8 bits | Signal 57x | Description |
|:------------------------------|:------------------------------|:------------|:-------------|
| `CSX` | `CSX` | `LCDC_8080_CS` | Sélection de puce. |
| `WR` | `WR` | `LCDC_8080_WR` | Signal de commande d'écriture pour écrire des données. |
| `DC` | `DC` | `LCDC_8080_DC` | Sélection données/commande d'affichage. |
| `RD` | `RD` | `LCDC_8080_RD` | Signal de commande de lecture. |
| `D[0]` | `D[0]` | `LCDC_8080_DIO0` | Donnée 0. |
| `D[1]` | `D[1]` | `LCDC_8080_DIO1` | Donnée 1. |
| `D[2]` | `D[2]` | `LCDC_8080_DIO2` | Donnée 2. |
| `D[3]` | `D[3]` | `LCDC_8080_DIO3` | Donnée 3. |
| `D[4]` | `D[4]` | `LCDC_8080_DIO4` | Donnée 4. |
| `D[5]` | `D[5]` | `LCDC_8080_DIO5` | Donnée 5. |
| `D[6]` | `D[6]` | `LCDC_8080_DIO6` | Donnée 6. |
| `D[7]` | `D[7]` | `LCDC_8080_DIO7` | Donnée 7. |
| `D[8]` | - | `LCDC_8080_DIO8` | Donnée 8 (mode 16 bits uniquement). |
| `D[9]` | - | `LCDC_8080_DIO9` | Donnée 9 (mode 16 bits uniquement). |
| `D[10]` | - | `LCDC_8080_DIO10` | Donnée 10 (mode 16 bits uniquement). |
| `D[11]` | - | `LCDC_8080_DIO11` | Donnée 11 (mode 16 bits uniquement). |
| `D[12]` | - | `LCDC_8080_DIO12` | Donnée 12 (mode 16 bits uniquement). |
| `D[13]` | - | `LCDC_8080_DIO13` | Donnée 13 (mode 16 bits uniquement). |
| `D[14]` | - | `LCDC_8080_DIO14` | Donnée 14 (mode 16 bits uniquement). |
| `D[15]` | - | `LCDC_8080_DIO15` | Donnée 15 (mode 16 bits uniquement). |
| `RESET` | `RESET` | `LCDC_8080_RSTB` | Réinitialisation. |
| `TE` | `TE` | `LCDC_8080_TE` | Signal TE (Tearing Effect) transmis à la MCU. |

</div>

<div align="center"><em>Tableau 5.5-8 : Connexions de signal d'affichage EPD</em></div>

<div align="center" markdown>

| Signal panneau EPD 16 bits | Signal panneau EPD 8 bits | Signal 57x | Description |
|:--------------------------|:--------------------------|:------------|:-------------|
| `CLK` | `CLK` | `LCDC_TCON_SDCLK` | Horloge du pilote de source. |
| `CKV`/`CPV` | `CKV`/`CPV` | `LCDC_TCON_GDCLK` | Horloge du pilote de grille. |
| `SPH` | `SPH` | `LCDC_TCON_SDSTL` | Impulsion de démarrage du pilote de source. |
| `SPV`/`STV` | `SPV`/`STV` | `LCDC_TCON_GDSP` | Impulsion de démarrage du pilote de grille. |
| `LE` | `LE` | `LCDC_TCON_SDLE` | Activation du verrou du pilote de source. |
| `OE` | `OE` | `LCDC_TCON_SDOE` | Activation de la sortie du pilote de source. |
| `D0` | `D0` | `LCDC_TCON_SDAT0` | Bit 0 des données du pilote de source. |
| `D1` | `D1` | `LCDC_TCON_SDAT1` | Bit 1 des données du pilote de source. |
| `D2` | `D2` | `LCDC_TCON_SDAT2` | Bit 2 des données du pilote de source. |
| `D3` | `D3` | `LCDC_TCON_SDAT3` | Bit 3 des données du pilote de source. |
| `D4` | `D4` | `LCDC_TCON_SDAT4` | Bit 4 des données du pilote de source. |
| `D5` | `D5` | `LCDC_TCON_SDAT5` | Bit 5 des données du pilote de source. |
| `D6` | `D6` | `LCDC_TCON_SDAT6` | Bit 6 des données du pilote de source. |
| `D7` | `D7` | `LCDC_TCON_SDAT7` | Bit 7 des données du pilote de source. |
| `D8` | `D8` | `LCDC_TCON_SDAT8` | Bit 8 des données du pilote de source. |
| `D9` | - | `LCDC_TCON_SDAT9` | Bit 9 des données du pilote de source (mode 16 bits uniquement). |
| `D10` | - | `LCDC_TCON_SDAT10` | Bit 10 des données du pilote de source (mode 16 bits uniquement). |
| `D11` | - | `LCDC_TCON_SDAT11` | Bit 11 des données du pilote de source (mode 16 bits uniquement). |
| `D12` | - | `LCDC_TCON_SDAT12` | Bit 12 des données du pilote de source (mode 16 bits uniquement). |
| `D13` | - | `LCDC_TCON_SDAT13` | Bit 13 des données du pilote de source (mode 16 bits uniquement). |
| `D14` | - | `LCDC_TCON_SDAT14` | Bit 14 des données du pilote de source (mode 16 bits uniquement). |
| `D15` | - | `LCDC_TCON_SDAT15` | Bit 15 des données du pilote de source (mode 16 bits uniquement). |
| `GMODE` | `GMODE` | GPIO quelconque | Sélection du mode de sortie pour le pilote de grille. |
| `VPOS` | `VPOS` | - | Signal PMIC EPD ; alimentation positive pour le pilote de source. |
| `VNEG` | `VNEG` | - | Signal PMIC EPD ; alimentation négative pour le pilote de source. |
| `VGH` | `VGH` | - | Signal PMIC EPD ; alimentation positive pour le pilote de grille. |
| `VGL` | `VGL` | - | Signal PMIC EPD ; alimentation négative pour le pilote de grille. |
| `VCOM` | `VCOM` | - | Signal PMIC EPD ; connexion d'électrode commune. |
| `WAKEUP` | `WAKEUP` | GPIO quelconque | Réveil du PMIC EPD. |
| `PWRUP` | `PWRUP` | GPIO quelconque | Mise sous tension du PMIC EPD. |
| `I2C_SDA` | `I2C_SDA` | GPIO quelconque | Données I2C du PMIC EPD. |
| `I2C_SCL` | `I2C_SCL` | GPIO quelconque | Horloge I2C du PMIC EPD. |
| `PWRCOM` | `PWRCOM` | GPIO quelconque | `VCOM_CTRL` du PMIC EPD ; activation VCOM. |
| `GOOD` | `GOOD` | GPIO quelconque | Sortie de bon fonctionnement (power-good) du PMIC EPD. |

</div>

<div align="center"><em>Tableau 5.5-9 : Connexions de signal d'affichage JDI parallèle</em></div>

<div align="center" markdown>

| Signal panneau JDI parallèle | Signal 57x | Description |
|:----------------------------|:------------|:-------------|
| `VST`/`GSP` | `LCDC_JDI_VST` | Signal de démarrage pour le pilote vertical. |
| `ENB`/`GEN` | `LCDC_JDI_ENB` | Signal d'activation d'écriture pour la mémoire de pixels. |
| `FRP`/`VA` | `#LPTIM2_OUTB` | Signal de commande à cristaux liquides (pixel « éteint »). |
| `HST`/`BSP` | `LCDC_JDI_HST` | Signal de démarrage pour le pilote horizontal. |
| `R1` | `LCDC_JDI_R1` | Donnée image rouge (pixels impairs). |
| `G1` | `LCDC_JDI_G1` | Donnée image verte (pixels impairs). |
| `B1` | `LCDC_JDI_B1` | Donnée image bleue (pixels impairs). |
| `VCOM` | `#LPTIM2_OUT` | Signal de commande d'électrode commune. |
| `B2` | `LCDC_JDI_B2` | Donnée image bleue (pixels pairs). |
| `G2` | `LCDC_JDI_G2` | Donnée image verte (pixels pairs). |
| `R2` | `LCDC_JDI_R2` | Donnée image rouge (pixels pairs). |
| `HCK`/`BCK` | `LCDC_JDI_HCK` | Horloge de décalage pour le pilote horizontal. |
| `XFRP`/`VB` | `#LPTIM2_OUT` | Signal de commande à cristaux liquides (pixel « allumé »). |
| `XRST`/`INTB` | `LCDC_JDI_XRST` | Signal de réinitialisation pour le pilote horizontal et vertical. |
| `VCK`/`GCK` | `LCDC_JDI_VCK` | Horloge de décalage pour le pilote vertical. |

</div>

<div align="center"><em>Tableau 5.5-10 : Connexions de signal d'affichage JDI série</em></div>

<div align="center" markdown>

| Signal panneau JDI série | Signal 57x | Description |
|:--------------------------|:------------|:-------------|
| `SCLK` | `LCDC_JDI_SCLK` | Signal d'horloge série. |
| `SI` | `LCDC_JDI_SO` | Signal d'entrée de données série. |
| `SCS` | `LCDC_JDI_SCS` | Signal de sélection de puce. |
| `EXTCOMIN` | `LCDC_JDI_EXTCOMIN` | Entrée de polarité d'inversion COM. |
| `DISP` | `LCDC_JDI_DISP` | Signal de commutation marche/arrêt de l'affichage. |

</div>

!!! note
    Pour les interfaces RGB, MCU8080 et EPD : en dessous de 30 MHz, toute broche peut être configurée comme signal LCDC correspondant. Au-dessus de 30 MHz, les signaux LCDC routés via la matrice doivent utiliser `PA22` à `PA50` ; `PA52` à `PA54` ne peuvent transporter que `B1` à `B6`. Dans tous les cas, réglez la force de pilotage des GPIO sur `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tableau 5.5-11 : Connexions de signal tactile et rétroéclairage</em></div>

<div align="center" markdown>

| Signal panneau CTP | Signal 57x | Description |
|:--------------------|:------------|:-------------|
| Interruption | GPIO quelconque | Signal d'interruption de l'état tactile, permettant le réveil du système. |
| `I2C1_SCL` | GPIO quelconque | Signal d'horloge I2C de l'écran tactile. |
| `I2C1_SDA` | GPIO quelconque | Signal de données I2C de l'écran tactile. |
| `BL_PWM` | GPIO quelconque | Signal de contrôle PWM du rétroéclairage. |
| Réinitialisation | GPIO quelconque | Signal de réinitialisation. |

</div>

#### 5.5.3. Directives d'affichage et de tactile { #553-display-and-touch-guidelines }

- Commandez indépendamment l'alimentation de l'affichage et celle du rétroéclairage ; laissez-les désactivées par défaut à la mise sous tension, sauf exigence contraire du produit.
- Pour les horloges d'affichage à haute fréquence, réservez une résistance série et, si nécessaire, une empreinte pour un condensateur shunt NC afin d'ajuster les émissions EMI.
- Gardez le FPC, le connecteur d'affichage et les pistes tactiles à l'écart de la zone de l'antenne RF.
- Si le réveil tactile est requis, connectez l'INT tactile à un GPIO permettant de réveiller le système.
- Faites correspondre les domaines de tension d'E/S de l'affichage, du circuit intégré tactile et de la MCU.
- Ajoutez une protection ESD aux interfaces d'affichage et tactiles exposées à l'extérieur du produit.
- Préférez des groupes de broches dédiés pour les signaux d'affichage SPI/QSPI. Pour le RGB, le 8080, l'EPD et les autres interfaces parallèles haute vitesse, choisissez des groupes adaptés aux sorties rapides et respectez les contraintes de synchronisation lors du routage.
- Lorsque le SPI/QSPI utilise le routage matriciel, limitez l'horloge à 50 MHz ou moins et réglez la force de pilotage des GPIO sur `DS1 = 0, DS0 = 1`.
- Pour les signaux RGB, MCU8080 et EPD au-dessus de 30 MHz, préférez le routage matriciel sur `PA22` à `PA50` ; `PA52` à `PA54` ne peuvent porter que `B1` à `B6`.

#### 5.5.4. Séquence de mise en service de l'affichage { #554-display-bring-up-sequence }

Mettez en service l'affichage par étapes pour éviter trop de variables à la fois :

1. Vérifiez l'alimentation de l'affichage, la réinitialisation, le rétroéclairage/l'activation et la relecture de l'ID du panneau.
2. Affichez des couleurs unies à la vitesse d'interface stable la plus basse ; confirmez l'ordre RGB, la profondeur de couleur et le sens de balayage.
3. Vérifiez les fenêtres de rafraîchissement partiel, le signal TE, la synchronisation de trame, ou le comportement en mode commande/vidéo.
4. Augmentez progressivement la vitesse d'interface, puis ajoutez LVGL, ePicasso, DMA et la gradation du rétroéclairage.
5. Validez enfin la veille, le réveil, l'extinction/allumage de l'écran, l'insertion/le retrait du chargeur et le fonctionnement connecté en Bluetooth.

En cas d'artefacts à l'écran, de déchirure de l'image, de couleurs incorrectes ou d'échecs intermittents de rafraîchissement, vérifiez d'abord l'initialisation de l'écran, la synchronisation de l'interface, le format des pixels, la fenêtre de rafraîchissement, la cohérence du cache et l'intégrité des signaux FPC.

#### 5.5.5. Audio { #555-audio }

Examinez l'audio comme un sous-système unique sensible au bruit : la polarisation du microphone, les références audio, les entrées analogiques, les sorties DAC, les horloges audio numériques, le contrôle du PA externe et l'acoustique de la structure mécanique doivent être vérifiés ensemble.

Le SF32LB57x dispose de deux entrées ADC analogiques, chacune pouvant fonctionner en asymétrique ou en différentiel, d'une sortie DAC analogique différentielle qui nécessite un PA externe pour piloter un haut-parleur ou un casque, ainsi que de deux interfaces PDM pouvant gérer jusqu'à quatre microphones numériques au total.

#### 5.5.6. Entrée audio analogique { #556-analog-audio-input }

Directives :

- Placez les condensateurs de découplage de MIC_BIAS, AUD_VREF et AVDD33_AUD près de la puce.
- Ajoutez un condensateur de liaison pour bloquer la composante continue à l'entrée du microphone analogique ; une capacité de 2,2 µF ou plus est recommandée.
- Placez les composants d'entrée analogique près des broches de la puce.
- Gardez les pistes ADCP et autres pistes analogiques courtes, blindées et à l'écart des sources de bruit.
- Lorsqu'un GPIO multiplexé est utilisé comme entrée analogique, configurez la broche en haute impédance selon les besoins.

<div align="center"><em>Tableau 5.5-12 : Connexions de signal audio</em></div>

<div align="center" markdown>

| Signal audio | Signal/broche 57x | Remarques |
|:-------------|:-----------------|:------|
| `MIC_BIAS` | `PA56` | Alimentation de polarisation du microphone. |
| `ADC1P` | `PA55` | Entrée microphone asymétrique ou entrée positive différentielle. |
| `ADC1N` | `PA09` | Entrée négative différentielle. |
| `ADC2P` | `PA10` | Entrée microphone asymétrique ou entrée positive différentielle. |
| `ADC2N` | `PA11` | Entrée négative différentielle. |
| `PDM1_CLK` / `PDM1_DATA` | GPIO quelconque via routage matriciel | Horloge et données de l'interface PDM 1. |
| `PDM2_CLK` / `PDM2_DATA` | GPIO quelconque via routage matriciel | Horloge et données de l'interface PDM 2. |
| `DAC1P` | `DACP` | Branche positive de la sortie audio analogique différentielle. |
| `DAC1N` | `DACN` | Branche négative de la sortie audio analogique différentielle. |

</div>

![Figure 5.5-1 : Circuit de référence d'entrée microphone analogique asymétrique](../../sf32-products/chips/assets/57x/SF32LB57x-Analog-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figure 5.5-1 : Circuit de référence d'entrée microphone analogique asymétrique</em></div>

Le circuit de référence montre, pour chaque microphone, une polarisation via une résistance de 1 kΩ, un découplage de polarisation de 4,7 µF, un condensateur série d'entrée de 2,2 µF et un condensateur de 10 nF entre l'entrée ADC et la masse. Ces valeurs proviennent du circuit illustré ; vérifiez-les pour le microphone et la conception d'entrée analogique retenus.

![Figure 5.5-2 : Circuit de référence d'entrée microphone numérique PDM](../../sf32-products/chips/assets/57x/SF32LB57x-PDM-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Figure 5.5-2 : Circuit de référence d'entrée microphone numérique PDM</em></div>

Le schéma de référence relie deux microphones à chaque interface PDM ; ils partagent les lignes d'horloge et de données de cette interface. Les broches `SELECT` des microphones sont câblées différemment pour les canaux gauche et droit, et chaque microphone possède un condensateur local de découplage d'alimentation de 100 nF. Le schéma nomme les lignes de données `PDM1_DAT` et `PDM2_DAT`, tandis que le tableau des signaux utilise `PDM1_DATA` et `PDM2_DATA` ; vérifiez les noms exacts des broches et de la matrice pour le composant choisi.

#### 5.5.7. Sortie audio analogique { #557-analog-audio-output }

Directives :

- Routez DACP/DACN comme une paire différentielle.
- Gardez la paire courte, appariée en longueur et à l'écart du RF, du DC/DC, de l'USB, du SDIO et des horloges d'affichage.
- Placez les réseaux d'adaptation RC de sortie près de la puce.
- Respectez la limite de capacité parasite définie pour l'audio.
- Gardez les chemins d'alimentation et de référence audio peu bruyants et courts.

Suivez le circuit recommandé de la Figure 5.5-3. Le filtre passe-bas différentiel à l'intérieur du cadre en pointillés doit être placé près des broches de la puce pour supprimer les interférences haute fréquence et améliorer le rapport signal/bruit de la sortie audio.

![Figure 5.5-3 : Circuit de référence de sortie PA audio analogique](../../sf32-products/chips/assets/57x/SF32LB57x-DAC-PA.png){ width="80%" loading="lazy" }

<div align="center"><em>Figure 5.5-3 : Circuit de référence de sortie PA audio analogique</em></div>

L'étage NS4150B illustré est alimenté en +5 V et utilise des condensateurs de liaison DAC de 100 nF, des résistances d'entrée de 43,2 kΩ et `PA51` pour activer l'amplificateur, avec une résistance de rappel à la masse de 5,1 MΩ. Le schéma indique 3 mA de courant statique pour l'amplificateur, 0,1 µA à l'arrêt et 0,6 µA dans la résistance de rappel. Ces valeurs concernent le circuit d'exemple ; elles ne constituent pas des spécifications universelles de PA. Vérifiez-les pour l'amplificateur et les exigences système retenus.

#### 5.5.8. Audio numérique { #558-digital-audio }

Pour I2S et PDM :

- Faites correspondre la tension d'E/S du périphérique.
- Vérifiez la longueur de piste d'horloge, la diaphonie et la continuité de la masse de référence.
- Examinez la séquence d'alimentation pour les microphones, le codec, le PA et la MCU.
- Assurez-vous que les périphériques audio numériques entrent dans un état sûr pendant la veille.

#### 5.5.9. Validation audio { #559-audio-validation }

Les problèmes audio impliquent souvent simultanément le matériel, la structure mécanique, le gain logiciel et le bruit d'alimentation. Validez :

- Le bruit au repos, le bruit d'enregistrement, le bruit de lecture et le bruit pendant la charge.
- La diaphonie pendant le rafraîchissement de l'affichage, l'émission Bluetooth, les vibrations du moteur, la connexion USB et l'activité SDIO.
- La tension de polarisation du microphone, la polarité/capacité du condensateur de blocage DC et la plage de mode commun d'entrée.
- Le niveau de sortie différentielle DACP/DACN, l'adaptation de charge et la plage d'entrée du PA externe.
- La fréquence d'horloge PDM/I2S, le mappage des canaux et la configuration du taux d'échantillonnage.

#### 5.5.10. Caméra { #5510-camera }

L'interface caméra prend en charge le DVP jusqu'à 16 bits, le SPI à 2 lignes de données et le QSPI à 4 lignes de données.

Directives :

- Confirmez la largeur d'interface, l'horloge, les signaux de synchronisation, les lignes de données et le multiplexage de broches.
- Rendez l'alimentation, la réinitialisation, le signal PWDN et l'horloge de la caméra contrôlables par la MCU.
- Regroupez les pistes de données et d'horloge de la caméra en maintenant leurs longueurs cohérentes et éloignez-les des signaux RF et analogiques.
- Fournissez un plan de masse de référence continu sous les pistes caméra à haute vitesse.
- Ajoutez une protection ESD pour le connecteur de caméra ou le FPC lorsque nécessaire.

Séquence de mise en service de caméra recommandée :

- Confirmez d'abord l'alimentation, la réinitialisation, les signaux PWDN et MCLK ainsi que la voie de commande I2C/SPI de la caméra.
- Lisez l'ID du capteur et vérifiez le tableau d'initialisation ainsi que le format de sortie.
- Utilisez un mode à faible résolution et à faible fréquence d'images pour valider PCLK, VSYNC, HSYNC/HREF et le mappage des lignes de données.
- Augmentez la résolution et la fréquence d'images seulement une fois le chemin de base stable, puis testez avec le rafraîchissement d'affichage, les écritures de stockage et la connexion Bluetooth.

<div align="center"><em>Tableau 5.5-13 : Connexions de signal caméra par capteur d'exemple</em></div>

<div align="center" markdown>

| GC032A SPI4 | GC032A DVP8 | GC2145 DVP8 | OV2640 DVP10 | Signal 57x | Description |
|:------------|:------------|:------------|:--------------|:-----------|:------------|
| `SBDA` | `SBDA` | `SIO-D` | `SIO-D` | GPIO quelconque | Signal de données I2C. |
| `SBCL` | `SBCL` | `SIO-C` | `SIO-C` | GPIO quelconque | Signal d'horloge I2C. |
| `RESET` | `RESET` | `RESET` | `RESET` | GPIO quelconque | Sortie du signal de réinitialisation. |
| NC | `VSYNC` | `VSYNC` | `VSYNC` | `DCMI_VSYNC` | Entrée du signal de synchronisation verticale. |
| `PWDN` | `PWDN` | `PWDN` | `PWDN` | GPIO quelconque | Sortie du signal de mise hors tension (active à l'état haut). |
| NC | `HSYNC` | `HREF` | `HREF` | `DCMI_HSYNC` | Entrée du signal de synchronisation horizontale. |
| NC | `D7` | `D7` | `Y9` | `DCMI_DI7` | Entrée du bit [7] du port vidéo YUV/RGB. |
| `MCLK` | `MCLK` | `MCLK` | `MCLK` | GPIO quelconque (GPTIM) | Sortie de l'horloge système. |
| NC | `D6` | `D6` | `Y8` | `DCMI_DI6` | Entrée du bit [6] du port vidéo YUV/RGB. |
| NC | `D5` | `D5` | `Y7` | `DCMI_DI5` | Entrée du bit [5] du port vidéo YUV/RGB. |
| `SCK` | `PCLK`/`SCK` | `PCLK` | `PCLK` | `DCMI_CLK` | Entrée de l'horloge pixel. |
| NC | `D4` | `D4` | `Y6` | `DCMI_DI4` | Entrée du bit [4] du port vidéo YUV/RGB. |
| `SD0` | `D0` | `D0` | `Y2` | `DCMI_DI0` | Entrée du bit [0] du port vidéo YUV/RGB. |
| `SD3` | `D3` | `D3` | `Y5` | `DCMI_DI3` | Entrée du bit [3] du port vidéo YUV/RGB. |
| `SD1` | `D1` | `D1` | `Y3` | `DCMI_DI1` | Entrée du bit [1] du port vidéo YUV/RGB. |
| `SD2` | `D2` | `D2` | `Y4` | `DCMI_DI2` | Entrée du bit [2] du port vidéo YUV/RGB. |
| NC | NC | NC | `Y1` | NC | Non connecté pour ce capteur. |
| NC | NC | NC | `Y0` | NC | Non connecté pour ce capteur. |

</div>

Pour les caméras DVP 10 bits, utilisez un câblage 8 bits lorsque les ressources GPIO sont limitées ; connectez tous les bits de données uniquement lorsque la conception dispose d'une marge GPIO suffisante.

#### 5.5.11. Boutons et moteur { #5511-buttons-and-motor }

- Le bouton d'alimentation/réinitialisation doit utiliser `PA34` et être actif à l'état haut ; la broche est tirée à l'état bas par défaut et passe à l'état haut lorsque le bouton est pressé. `PA34` permet une réinitialisation matérielle après un appui maintenu pendant 10 secondes. La résistance de rappel à la masse de 10 kΩ doit être placée sur la carte principale.
- Pour les conceptions de boutons GPADC à diviseur résistif, distinguez les boutons par la tension du diviseur et placez un condensateur de filtrage de 0,1 µF vers la masse près de la broche pour améliorer la précision d'échantillonnage.
- L'échelle résistive illustrée utilise des résistances de bouton de 1,1 kΩ, 2,8 kΩ et 5,1 kΩ, ainsi qu'une résistance de rappel à la masse de 10 kΩ et un condensateur de filtrage de 100 nF. Utilisez ces valeurs comme référence et vérifiez les seuils ADC en fonction de l'alimentation et des tolérances des résistances de la conception.
- Ajoutez une protection ESD pour les boutons externes.

![Figure 5.5-4 : Circuit de référence du bouton d'alimentation et du bouton GPADC](../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png){ width="80%" loading="lazy" }

<div align="center"><em>Figure 5.5-4 : Circuit de référence du bouton d'alimentation et du bouton GPADC</em></div>

Utilisez le circuit de référence du moteur vibrant SF32LB57x pour mettre en œuvre le retour haptique. Dans les produits basse consommation, l'alimentation du moteur devrait pouvoir être coupée ; la broche PWM/de commande ne devrait pas entrer en conflit avec les exigences de démarrage, d'affichage, de stockage ou de débogage.
