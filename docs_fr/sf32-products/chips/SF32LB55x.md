---
icon: lucide/microchip
description: "SF32LB55x : famille de MCU grand public à très basse consommation pour objets portables et produits IHM nécessitant davantage de graphismes, de SRAM et de choix de boîtiers que les MCU Bluetooth d'entrée de gamme."
tags:
    - Matériel
    - Puce
---

# SF32LB55x { #sf32lb55x }

## Présentation { #overview }

La série SF32LB55x est une famille de microcontrôleurs AIoT grand public à très basse consommation pour les produits connectés en BLE qui exigent des capacités d'affichage plus poussées, plus de marge mémoire et un choix de boîtiers plus large que les MCU Bluetooth d'entrée de gamme.

Son architecture bicœur big.LITTLE associe deux processeurs Arm Cortex-M33 STAR-MC1[^1] : un cœur applicatif hautes performances jusqu'à 240 MHz et un cœur à très basse consommation jusqu'à 48 MHz. Un produit peut ainsi garder le travail d'interface exigeant sur le cœur applicatif, tout en confiant au cœur basse consommation le traitement des capteurs, la gestion de la veille et les tâches BLE qui doivent rester actives.

La fiche produit et la fiche technique officielles de SiFli indiquent le BLE 5.2, le moteur graphique 2,5D ePicasso, deux contrôleurs LCD, un accélérateur matriciel de réseaux de neurones orienté TinyML et 1 312 Ko de SRAM sur puce (1 088 Ko HCPU + 224 Ko LCPU), ainsi que la prise en charge de NOR, NAND, eMMC et PSRAM externes. SF32LB55x est ainsi un choix pertinent pour les objets portables, les produits riches en capteurs et les conceptions IHM compactes qui demandent plus de ressources que le SF32LB52x sans exiger un composant de la gamme supérieure 56/58.

Le guide des modèles de puces de SiFli précise que le SF32LB55x a été défini avant les familles ultérieures 52/56/58 ; ses suffixes ne suivent donc pas entièrement la convention de numérotation plus récente. Pour choisir un composant, utilisez la référence commandable complète et les tableaux de capacités propres à chaque boîtier ; ne déduisez pas toutes les capacités du seul suffixe.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

## Applications { #applications }

**SF32LB55x est recommandé pour** les produits axés sur le BLE qui exigent une interface plus riche, une mémoire de travail plus grande ou des boîtiers plus flexibles que les MCU d'objets portables d'entrée de gamme, notamment :

- Montres connectées et bracelets d'activité
- Objets portables de suivi de la santé
- Serrures connectées et contrôleurs domotiques
- Accessoires connectés riches en capteurs
- Produits IHM graphiques compacts
- Stylets intelligents et accessoires de saisie au stylet
- Terminaux portables et contrôleurs portatifs

Choisissez le SF32LB55x lorsque la conception exige une ou plusieurs de ces capacités :

- Connectivité BLE 5.2 avec très faible courant de réception
- Prise en charge d'écrans MIPI DSI en mode commande
- SRAM plus grande pour LVGL, ressources graphiques, détection ou charges TinyML
- Un processeur basse consommation programmable par l'utilisateur
- Plus de GPIO ou des boîtiers plus denses que le SF32LB52x
- Souplesse pour NOR, NAND, eMMC, PSRAM QSPI ou PSRAM OPI externes

## Ressources de développement { #development-resources }

[Fiche produit]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Fiche technique]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[Manuel utilisateur]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Guide de conception d'origine (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Note d'application matérielle (source GitHub)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[Guide des modèles de puces SiFli]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Guide de conception matérielle (μForge)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Source de la liste de contrôle de conception matérielle]: https://wiki.sifli.com/hardware/index.html
[Documentation du SDK]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[Référence de l'API]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit]__
- :fontawesome-solid-file-pdf: __[Fiche technique]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur]__
- :fontawesome-solid-file-lines: __[Guide de conception d'origine (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Note d'application matérielle (source GitHub)]__
- :fontawesome-solid-list: __[Guide des modèles de puces SiFli]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (μForge)]__
- :fontawesome-solid-book: __[Documentation du SDK]__
- :fontawesome-solid-book-open: __[Référence de l'API]__
- :fontawesome-solid-list-check: __[Source de la liste de contrôle de conception matérielle]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Processeur applicatif hautes performances Arm Cortex-M33 STAR-MC1, jusqu'à 240 MHz
- Processeur Arm Cortex-M33 STAR-MC1 à très basse consommation, jusqu'à 48 MHz
- Jusqu'à 360 DMIPS / 965 EEMBC CoreMark sur le processeur applicatif
- Jusqu'à 72 DMIPS / 193 EEMBC CoreMark sur le processeur basse consommation
- 1 088 Ko de SRAM applicative, dont 64 Ko de SRAM de rétention
- 224 Ko de SRAM basse consommation, entièrement en rétention
- Interfaces mémoire externes pour NOR, NAND, eMMC, PSRAM QSPI et PSRAM OPI

### Graphismes, affichage et IA { #graphics-display-and-ai }

- Moteur graphique 2,5D ePicasso avec rotation, mise à l'échelle, effet miroir et fusion alpha matériels
- eZip décompresse les graphismes sans perte et peut être chaîné avec ePicasso
- La couche de transformation d'ePicasso prend en charge des résolutions jusqu'à 640 × 640 ; les couches génériques et la sortie d'affichage prennent en charge jusqu'à 1024 × 1024, avec une cadence d'affichage pouvant atteindre 60 ips
- Le contrôleur LCD prend en charge les interfaces 8080, SPI, Dual-SPI, Quad-SPI, DPI et MIPI DSI, ainsi que les écrans réflectifs JDI sur les variantes compatibles ; vérifiez la disponibilité pour le modèle choisi
- La compression de tampon d'image TurboPixel permet au contrôleur LCD de lire des données d'image compressées et de les décompresser pour l'affichage, réduisant ainsi la mémoire requise pour le tampon d'image et les besoins en bande passante de lecture
- Deux contrôleurs LCD ; les interfaces d'affichage permanent (always-on) et la capacité double écran dépendent du modèle et du boîtier choisis
- Accélérateur matriciel de réseaux de neurones pour charges TinyML, jusqu'à 1,92 GOPS et 5,73 TOPS/W

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- Modes BLE à 125 kbps, 500 kbps, 1 Mbps et 2 Mbps
- Sensibilité jusqu'à -100 dBm en mode 1 Mbps
- Puissance d'émission maximale : 10 dBm
- Courant de crête en réception : 2,0 mA sous 3,3 V

### Sécurité { #security }

- Accélérateurs matériels AES et CRC
- Générateur de nombres aléatoires vrais (TRNG)
- PSA Certified Level 1

### Périphériques et E/S { #peripherals-and-ios }

- Jusqu'à 5 interfaces UART, 6 I2C et 4 SPI sur l'ensemble de la famille ; les nombres varient selon le modèle, comme indiqué ci-dessous
- Le nombre d'interfaces I2S et PDM varie selon le modèle (voir le tableau). Chaque interface PDM peut connecter jusqu'à deux microphones numériques ; le nombre d'interfaces n'est donc pas le nombre de microphones. Vérifiez aussi la disponibilité des broches pour le modèle choisi.

<div align="center"><em>Nombres de périphériques et d'ADC publiés par modèle (SS6600A8 non spécifié)</em></div>

<div align="center" markdown>

| Modèle | UART | I2C | SPI | I2S | PDM | ADC Sigma-Delta 16 bits |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | Non spécifié | Non spécifié | Non spécifié | Non spécifié | Non spécifié | Non spécifié |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | Absent |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 canaux |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 canaux |

</div>

**Note sur la source pour le SS6600A8 :** le [guide des modèles de puces SiFli][Guide des modèles de puces SiFli] actuel indique le boîtier, la mémoire intégrée, les GPIO et l'interface d'affichage de ce composant, mais ne précise pas ses nombres d'UART, I2C, SPI, I2S, PDM ou d'ADC Sigma-Delta. Le tableau 0-1 de la [fiche technique DS5501 V1.7.2][Fiche technique] ne comporte pas non plus de ligne distincte pour le SS6600A8. Ses nombres sont donc marqués « Non spécifié » ; ne les déduisez pas du SF32LB551U4O5 sous prétexte que les deux utilisent le QFN68L. Confirmez la configuration auprès de SiFli avant d'affecter les broches.

- 1 × interface USB 2.0 FS hôte/périphérique
- 1 × GPADC 10 bits (ADC SAR) : la fiche technique indique jusqu'à 8 entrées asymétriques ou 4 paires différentielles, avec une plage d'entrée asymétrique de 0–1,1 V
- **Écart entre sources pour l'ADC :** la [fiche technique DS5501 V1.7.2][Fiche technique] indique jusqu'à 8 entrées asymétriques ou 4 paires différentielles et une plage asymétrique de 0–1,1 V. La [note d'application matérielle du SF32LB55x][Note d'application matérielle (source GitHub)] indique 5 canaux et une plage d'entrée de 0–0,9 V. Confirmez l'affectation des canaux et les limites pour le composant exact et la révision du SDK avant de concevoir le frontal analogique.
- ADC Sigma-Delta 16 bits à 5 canaux sur les modèles BGA145 et BGA169 ci-dessus ; absent des modèles QFN68L
- Capteur de température
- 2 × comparateurs de tension basse consommation
- Contrôleur de tâches périphériques (PTC)
- Le nombre de GPIO varie selon le boîtier ; voir le tableau des boîtiers et la note sur l'écart entre sources ci-dessous

### Alimentation et boîtier { #power-supply-and-package }

- La plage de tension d'alimentation dépend de la variante : 2,97 V à 3,63 V pour le SS6600A8 ; 1,71 V à 3,63 V pour le 551U4O5 et les variantes BGA retenues
- La température de fonctionnement dépend de la variante : -20 °C à +70 °C pour les variantes QFN documentées ; -40 °C à +85 °C pour les variantes BGA retenues
- Gestion d'énergie intégrée avec deux régulateurs Buck à haut rendement et un LDO basse consommation
- Courant en veille avec réveil par RTC : 600 nA
- Courant en veille avec réveil par broche : 280 nA
- Options de boîtier : QFN68L, BGA145 et BGA169

## Variantes de la famille { #family-variants }

Les composants SF32LB55x sont proposés en boîtiers QFN et BGA. Choisissez le boîtier dès le début du projet, car le nombre de GPIO, la mémoire intégrée, les interfaces d'affichage disponibles et le procédé de fabrication du PCB varient sensiblement selon le boîtier.

Le choix du boîtier n'est pas ici une simple décision de placement et de routage. Le [guide des modèles de puces][Guide des modèles de puces SiFli] de SiFli précise que, selon le boîtier, la famille 55x prend en charge la totalité ou seulement une partie des interfaces d'affichage. Il faut donc arrêter ce choix avant de finaliser les options d'affichage et de mémoire ainsi que le budget de broches. Les composants d'un même boîtier sont compatibles broche à broche ; confirmez la configuration mémoire exacte et les besoins d'affichage avant de choisir un composant de remplacement compatible.

<div align="center"><em>Options d'E/S par boîtier du SF32LB55x</em></div>

<div align="center" markdown>

| Boîtier | GPIO HCPU / LCPU | Total GPIO | Cas d'usage typique |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | Produit portable compact ou capteur BLE avec un coût de procédé de circuit imprimé plus faible |
| BGA145 | 55 / 40 | 95 | Conception riche en écran, mémoire et capteurs avec plus de marge de routage |
| BGA169 | 71 / 42 | 113 | Conceptions SF32LB55x aux E/S les plus nombreuses, avec les options de mémoire intégrée et d'affichage les plus larges |

</div>

Les modèles actuels suivants, issus du guide des modèles de puces de SiFli, explicitent le compromis entre boîtier et mémoire. Les suffixes des références de cette famille plus ancienne ne suivent pas systématiquement la convention de nommage plus récente de SiFli ; utilisez donc la référence commandable complète plutôt que de décoder le suffixe selon une règle.

<div align="center"><em>Variantes représentatives du SF32LB55x</em></div>

<div align="center" markdown>

| Référence | Boîtier | Mémoire intégrée | Interfaces d'affichage listées dans le guide des modèles | Remarques de sélection |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | Deux composants NOR QSPI de 4 Mo configurés comme un seul NOR OSPI de 8 Mo ; pas de PSRAM intégrée au boîtier | QSPI, 8080 | 49 GPIO ; 2,97 V à 3,63 V ; -20 °C à +70 °C ; option compacte sans PSRAM intégrée au boîtier |
| SF32LB551U4O5 | QFN68L | Flash de démarrage NOR QSPI de 4 Mo + PSRAM OPI de 4 Mo | QSPI, 8080 | 49 GPIO ; 1,71 V à 3,63 V ; -20 °C à +70 °C ; option compacte avec PSRAM intégrée |
| SF32LB555V4O6 | BGA145 | Flash de démarrage NOR QSPI de 4 Mo + PSRAM OPI de 4 Mo | MIPI DSI en mode commande, QSPI, 8080 | 95 GPIO ; -40 °C à +85 °C ; un choix BGA145 équilibré pour les produits à écran nécessitant 4 Mo de PSRAM |
| SF32LB555V436 | BGA145 | Flash de démarrage NOR QSPI de 4 Mo + PSRAM OPI de 8 Mo | MIPI DSI en mode commande, QSPI, 8080 | 95 GPIO ; -40 °C à +85 °C ; l'option BGA145 lorsque la conception requiert deux fois la PSRAM intégrée du SF32LB555V4O6 |
| SF32LB557VD3A6 | BGA169 | Flash de démarrage NOR QSPI de 1 Mo + PSRAM OPI de 16 Mo + PSRAM QPI de 2 Mo | MIPI DSI en mode commande, QSPI, 8080, JDI/Sharp MIP | 113 GPIO ; -40 °C à +85 °C ; prend en charge MIPI DSI plus des doubles écrans SPI/DSPI à contenu indépendant |

</div>

Pour le SF32LB557VD3A6, le guide des modèles de puces SiFli actuel et le tableau 0-1 de la fiche technique DS5501 V1.7.2 indiquent 71 HCPU + 42 LCPU = 113 GPIO. Les résumés des fonctionnalités et des boîtiers de la fiche technique, ainsi que la fiche produit PB0001 V1.3, donnent en revanche 119 GPIO pour le BGA169 (71 HCPU + 48 LCPU). Les sources officielles se contredisent donc, y compris au sein de la fiche technique. Cette page suit la ligne propre au modèle et le guide des modèles actuel (113). Avant d'affecter les broches ou de finaliser la conception, vérifiez la disponibilité des GPIO à l'aide de la carte des billes du boîtier choisi et confirmez la référence commandable auprès de SiFli. Vérifiez aussi les valeurs d'alimentation et de température de la variante, la référence complète et la configuration de la mémoire intégrée dans la [fiche technique DS5501 V1.7.2][Fiche technique], la [fiche produit PB0001 V1.3][Fiche produit] et le [guide des modèles de puces SiFli]. Les boîtiers BGA145 et BGA169 mesurent 7 × 7 × 0,94 mm avec un pas de 0,5 mm.

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB55x en conception validée :

1. **Valider le parcours de développement du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour valider le comportement requis de l'affichage, du Bluetooth et de la basse consommation.
2. **Planifier le matériel d'évaluation.** μForge ne répertorie actuellement aucun module ni carte de développement spécifique au SF32LB55. Utilisez le [sélecteur de produits SF32](../product-selector.md) pour choisir la plateforme d'évaluation disponible la plus proche, puis vérifiez la couverture du boîtier et des interfaces avant de transposer les résultats à une conception 55x.
3. **Concevoir et relire le matériel.** Avant de publier le schéma ou le placement-routage, utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md) de μForge, y compris ses listes de contrôle du [schéma](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) et du placement et du routage du PCB.
4. **Vérifier la source faisant autorité.** Confirmez la référence commandable et le boîtier exacts à l'aide de la [fiche technique][Fiche technique], du [manuel utilisateur][Manuel utilisateur], du [guide de conception d'origine][Guide de conception d'origine (wiki.sifli.com)] et de la [source de la note d'application matérielle][Note d'application matérielle (source GitHub)] de SiFli.

## Produits associés { #related-products }

### Kits de développement { #development-kits }

Utilisez la note d'application matérielle officielle, les schémas de référence et la liste de contrôle comme point de départ pour le choix du boîtier, la définition de l'arbre d'alimentation, le choix de l'interface d'affichage, la planification de la mémoire, le placement et le routage RF et la planification des tests de production.

### Produits de référence { #reference-products }

Les produits finaux SF32LB55x typiques comprennent les montres connectées, les bracelets d'activité, les objets portables de suivi de la santé, les serrures connectées, les accessoires connectés, les contrôleurs domotiques et les IHM graphiques compactes.

!!! note "Contenu généré automatiquement"
    Cette page a été compilée/rédigée sans document source existant. Vérifiez les affirmations techniques dans la documentation officielle de SiFli avant de vous y fier.
