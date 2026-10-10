---
icon: lucide/circuit-board
description: "Carte de développement SF32LB56-DevKit-LCD : une plateforme modulaire basée sur le SF32LB56xV pour développer avec affichage, audio, stockage et périphériques."
tags:
    - Matériel
    - Carte de développement
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD est une carte de développement orientée affichage, disponible avec le module SF32LB56-MOD-N16R12N1 ou SF32LB56-MOD-A128R12N1, tous deux fondés sur un composant de la série SF32LB56xV. Utilisez-la pour évaluer les interfaces d'affichage, l'audio, le stockage amovible et les pilotes de périphériques avant de concevoir votre propre carte SF32LB56x.

## Pour quels usages elle convient le mieux { #what-it-is-best-for }

- Applications d'affichage utilisant les interfaces MIPI-DPI (RVB), SPI, DSPI, QSPI ou MCU 8 bits/8080.
- Intégration d'un écran tactile via I2C.
- Essais audio avec une entrée microphone analogique et une sortie analogique via l'amplificateur de puissance de classe D embarqué.
- Stockage SDIO/carte TF et développement général de pilotes de périphériques.
- Évaluation d'une architecture produit modulaire SF32LB56 avant de s'engager sur une carte porteuse.

## Ressources de la carte { #board-resources }

<div align="center"><em>Tableau : ressources de la carte SF32LB56-DevKit-LCD</em></div>

<div align="center" markdown>

| Ressource | Réalisation sur la carte | Usage pratique |
|:----------|:-------------------------|:---------------|
| Configuration N16R12N1 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 Mo de QSPI-NOR, 4 Mo + 8 Mo de PSRAM OPI et 1 Mo de QSPI-NOR ; évaluation modulaire et planification de la carte porteuse. |
| Configuration A128R12N1 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 Mo de QSPI-NAND, 4 Mo + 8 Mo de PSRAM OPI et 1 Mo de QSPI-NOR ; évaluation modulaire et planification de la carte porteuse. |
| Dimensions et température | 65 mm × 38 mm ; -40 °C à 85 °C selon le guide des modèles | Planification mécanique et environnementale. |
| Affichage | MIPI-DPI RVB 24 bits via un connecteur FPC 40 broches au pas de 0,5 mm avec le brochage ALIENTEK ; signaux SPI/DSPI/QSPI et MCU 8 bits/8080 sur l'embase 40 broches (2 × 20) | Mise en service des dalles et développement de pilotes d'affichage. |
| Tactile | Prise en charge d'un écran tactile I2C | Prototypes d'affichages interactifs. |
| Audio | Une entrée microphone MEMS analogique et un canal d'amplificateur de classe D embarqué ; sortie haut-parleur jusqu'à 3 W / 4 Ω selon le guide des modèles | Essais d'enregistrement et de lecture locale ; vérifiez la charge du haut-parleur et la révision de la carte. |
| Stockage | Emplacement MicroSD via SDIO | Tests de médias, de journalisation, de système de fichiers et de ressources. |
| USB et alimentation | Deux connecteurs USB Type-C : un USB-UART (CH343K selon le guide des modèles) et un USB 2.0 FS ; chacun peut alimenter la carte | Journaux série, téléchargement/débogage, évaluation USB et alimentation sur banc. |
| Conversion de puissance | Circuits de conversion 3,3 V et 1,8 V embarqués | Vérifiez les besoins des rails dans le schéma avant d'ajouter des charges. |
| Débogage et amorçage | Embase SWD 4 broches à une rangée, pas de 2,54 mm ; cavalier d'amorçage Mode ; boutons d'alimentation, de fonction et de réinitialisation | Téléchargement du firmware, débogage SWD et sélection du mode d'amorçage. |
| Indicateurs | LED RVB, LED pilotée par GPIO et LED d'alimentation | Vérification de l'état du firmware et de l'alimentation. |
| RF | Antenne embarquée par défaut ; sélection IPEX via une option 0 Ω | Évaluation de l'antenne et du boîtier avec la configuration de module choisie. |

</div>

**Remarque sur les sources — confirmer la révision de la carte :** le guide détaillé de la carte publié par SiFli indique que la carte documentée porte le module `SF32LB56-MOD-A128R12N1`, avec 4 Mo + 8 Mo de PSRAM OPI co-intégrée et 1 Gbit de QSPI-NAND ; il prévient que ces caractéristiques mémoire peuvent changer avant la publication officielle. Le guide des modèles actuel répertorie N16R12N1 et A128R12N1, chacun avec 4 + 8 Mo de PSRAM OPI et 1 Mo de QSPI-NOR standard. Pour A128R12N1, les 128 Mo de QSPI-NAND du guide des modèles équivalent en capacité au 1 Gbit du guide détaillé. Ces capacités concordent donc pour A128R12N1 ; toutefois, le guide détaillé ne mentionne pas le NOR standard de 1 Mo et n'établit pas quelle référence est montée sur chaque carte ou révision. Le guide des modèles prévoit deux canaux de débogage USB-UART sur le CH343K, tandis que le guide détaillé décrit les rôles des connecteurs Type-C comme USB-UART et USB 2.0 FS sans documenter l'affectation des canaux aux connecteurs. Consultez le schéma et la nomenclature correspondants avant de vous appuyer sur un canal UART particulier. Confirmez le marquage du module et le schéma/la nomenclature correspondants avant d'utiliser un exemplaire précis comme base de produit.

**Divergence sur le pont USB-UART — vérifier le composant monté :** le schéma fonctionnel du guide détaillé de la carte désigne le pont comme CH342K, alors que le guide des modèles l'identifie comme CH343K. Vérifiez le composant réel dans le schéma et la nomenclature de la révision de votre carte.

**Divergence photo/texte sur la référence — vérifier le module monté :** le texte du guide détaillé indique que la carte documentée porte `SF32LB56-MOD-A128R12N1`, mais la photo annotée de la face avant désigne le module `SF32LB56-MOD-N16R12N1`. SiFli ne précise pas si la photo montre une autre variante ou une autre révision. Vérifiez le marquage du module et la nomenclature de votre exemplaire ; ne déduisez pas sa référence du seul texte ou de la photo.

## Programmation et débogage { #programming-and-debug }

Pour le mode de téléchargement, installez le cavalier Mode avant de mettre la carte sous tension ou de la réinitialiser ; retirez-le pour le démarrage normal de l'application et le fonctionnement avec journal série. Reliez l'hôte au port Type-C USB-UART avec un câble compatible données. Le port Type-C USB 2.0 FS distinct est disponible pour les tests USB natifs. La carte fournit aussi une embase SWD 4 broches à une rangée, au pas de 2,54 mm, pour un débogueur compatible. Les deux connecteurs Type-C peuvent alimenter la carte ; reportez-vous au guide de la carte et au schéma pour l'alimentation prévue.

## Cibles de compilation du SDK { #sdk-build-targets }

Le SiFli SDK utilise les noms de cibles de carte exacts suivants avec `scons --board=<board_name>` :

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

Ce sont des identifiants de cibles de compilation du SDK, pas nécessairement les noms de produit imprimés sur une carte ou un module. L'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et le fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK peuvent énumérer des ensembles différents ; confirmez la cible avec la révision du SDK utilisée.

## Premier parcours de validation { #first-validation-path }

1. Connectez un écran MIPI-DPI 24 bits compatible au connecteur FPC 40 broches et utilisez le port USB-UART avec un câble USB compatible données.
2. Suivez [Démarrage](../../getting-started/index.md) pour établir une base de référence fiable de compilation, de flashage et de journal série.
3. Mettez en service des motifs d'affichage unis avant de déboguer un framework d'interface ; voir [Vue d'ensemble des graphiques](../../learn/graphics/overview.md).
4. Ajoutez le tactile, le stockage, l'audio ou le sans-fil un sous-système à la fois, puis testez la coexistence et le comportement énergétique.
5. Avant une conception personnalisée, consultez [SF32LB56-MOD](../modules/SF32LB56-MOD.md) et [Conception pour la production](../../hardware/design-for-production.md).

## Référence { #reference }

SiFli tient à jour un [guide des modèles de cartes de développement](https://wiki.sifli.com/en/board/devkit_guide.html) avec les codes de cartes et de modules sélectionnables, ainsi qu'un [guide utilisateur détaillé de la carte de développement SF32LB56-DevKit-LCD](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html) avec les affectations de GPIO, les définitions des embases et interfaces, des notes sur l'alimentation et les procédures de flashage et de débogage.
