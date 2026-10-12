---
icon: lucide/microchip
description: "SF32LB52x : famille de MCU AIoT bicœur Arm Cortex-M33 à coût optimisé pour les objets portables et les produits AIoT compacts, avec les SF32LB520/3/5/7 sur batterie et les variantes 52B/D/E/G/J à alimentation externe."
tags:
    - Matériel
    - Puce
---

# SF32LB52x { #sf32lb52x }

## Présentation { #overview }

SF32LB52x est la famille de MCU à coût optimisé de SiFli, destinée aux objets portables intelligents d'entrée de gamme, aux interfaces graphiques compactes, aux périphériques Bluetooth et aux autres produits AIoT à encombrement contraint qui exigent malgré tout un affichage, de l'audio, du stockage et une connectivité sans fil intégrés.

Au niveau de la plateforme, la famille associe un cœur applicatif Arm Cortex-M33 STAR-MC1[^1] à 240 MHz et un cœur contrôleur Bluetooth basse consommation dédié à 24 MHz. La puce peut ainsi exécuter une interface réactive et une pile applicative tout en gardant séparées la connectivité Bluetooth et les tâches permanentes (always-on).

Pour la planification produit, les principales variantes du guide des modèles de puces de SiFli se répartissent en deux groupes selon l'alimentation :

- **SF32LB520/3/5/7** : variantes alimentées par batterie lithium-ion, avec chemin de charge intégré
- **52B/D/E/G/J** : variantes à alimentation externe, où 52B/E/G/J ciblent les systèmes 3,3 V standard et **52D** cible un rail spécial 1,8 V à très basse consommation

Ces groupes ne sont pas interchangeables au niveau de la carte. Les familles sur batterie et à alimentation externe ne sont pas compatibles broche à broche entre elles, et la variante 52D en 1,8 V est électriquement distincte du groupe 52B/E/G/J en 3,3 V, même si leurs implantations de boîtier se ressemblent.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

## Applications { #applications }

**SF32LB52x est recommandé pour** les produits centrés sur le Bluetooth où le coût, l'intégration et l'autonomie sont les principaux critères de conception, notamment :

- Montres connectées et bracelets d'activité d'entrée de gamme
- Modules Bluetooth et adaptateurs sans fil
- Accessoires audio Bluetooth
- Capteurs intelligents et objets portables
- Étiquettes électroniques de rayon et badges intelligents
- Imprimantes d'étiquettes portables
- Afficheurs pour vélos et trottinettes électriques
- Appareils IHM de base reposant sur LVGL

## Ressources de développement { #development-resources }

[Fiche produit (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Fiche technique (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Fiche produit (famille SF32LB52X à alimentation externe)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Fiche technique (famille SF32LB52X à alimentation externe)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[Manuel utilisateur]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Guide de conception matérielle (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Guide de conception matérielle (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Fiche technique (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Fiche produit (famille SF32LB52X à alimentation externe)]__
- :fontawesome-solid-file-pdf: __[Fiche technique (famille SF32LB52X à alimentation externe)]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Cœur applicatif Arm Cortex-M33 STAR-MC1 jusqu'à 240 MHz, avec DSP et MPU
- Cœur contrôleur Bluetooth Arm Cortex-M33 STAR-MC1 dédié à 24 MHz
- Cache d'instructions de 32 Ko + cache de données de 16 Ko
- 512 Ko de SRAM applicative plus 64 Ko de SRAM pour le contrôleur Bluetooth
- Options de mémoire intégrée au boîtier selon la variante, de 1 Mo de NOR QSPI à 16 Mo de PSRAM OPI

### Graphismes et audio { #graphics-and-audio }

- Accélérateur graphique 2D/2,5D ePicasso 2.0
- Décodeur matériel eZip 2.0 pour la compression graphique sans perte
- Contrôleur LCD dédié prenant en charge SPI/DSPI/QSPI, y compris le SPI pour papier électronique, ainsi que 8080-8 bits
- 1 ADC audio 24 bits, RSB de 99 dB
- 1 DAC audio 24 bits, RSB de 109 dB

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth 5.3 bimode (Bluetooth Classic et BLE)
- Puissance d'émission maximale :
    - 19 dBm pour BLE/BR
    - 13 dBm pour BT/EDR2 et BT/EDR3
- Sensibilité : -100 dBm @ BLE/1Mbps
- Cœur contrôleur Bluetooth Arm Cortex-M33 STAR-MC1 dédié avec 64 Ko de SRAM @ 24 MHz
- Courant en veille profonde : 2 µA selon la fiche produit ; le courant de veille au niveau système dépend du mode de fonctionnement et des fuites au niveau de la carte

### Sécurité { #security }

- Accélérateurs matériels AES/HASH/CRC
- TRNG
- PSA Certified Level 1

### Périphériques et E/S { #peripherals-and-ios }

- 3 UART
- 4 I2C
- 2 SPI
- 1 USB 2.0 FS
- 1 I2S
- 1 interface PDM (jusqu'à deux microphones numériques)
- 1 SD3.0/SDIO3.0/eMMC
- 1 ADC 12 bits à usage général
- Capteur de température
- RTC et timers de surveillance (watchdog)
- 44 ou 45 GPIO selon la famille de variantes

### Alimentation { #power-supply }

- **Groupe sur batterie : SF32LB520/3/5/7** — alimenté directement par une seule cellule Li-ion/Li-Po et destiné aux conceptions utilisant l'architecture d'alimentation intégrée orientée charge.

- **Groupe à alimentation externe 3,3 V : 52B/E/G/J** — destiné aux systèmes à alimentation externe régulée ; les composants sont compatibles broche à broche entre eux.

- **Groupe à alimentation externe 1,8 V : SF32LB52D** — destiné aux conceptions spéciales à très basse consommation en 1,8 V, non interchangeable électriquement avec les composants 3,3 V.

Les groupes sur batterie et à alimentation externe sont des configurations de silicium indépendantes et **ne sont pas compatibles broche à broche** d'une famille d'alimentation à l'autre.

## Variantes de la famille { #family-variants }

Pour les principales variantes du guide des modèles de puces de SiFli, la répartition pratique pour le choix du composant est la suivante :

- **SF32LB520/3/5/7** : groupe sur batterie lithium-ion, compatible broche à broche au sein du groupe
- **52B/E/G/J** : groupe standard à alimentation externe 3,3 V, compatible broche à broche au sein du groupe
- **SF32LB52D** : variante spéciale à alimentation externe 1,8 V pour les scénarios à très basse consommation

Si vous changez de niveau de mémoire, la correspondance de contenu la plus proche est :

- 520 ↔ 52B
- 523 ↔ 52E, avec 52D comme équivalent en 1,8 V
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>Principales variantes du SF32LB52x</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Boîtier | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Dimensions | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm |
| Pas | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIO | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Mémoire intégrée au boîtier | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| Plage de tension d'alimentation | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 2,97–3,63 V | 2,97–3,63 V | 1,71–1,98 V | 2,97–3,63 V | 2,97–3,63 V | 2,97–3,63 V |
| Tension d'E/S | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Température | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C | -40 à 85 °C |

</div>

Ce tableau reprend les principales variantes du [guide des modèles de puces](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) de SiFli ; ce n'est pas un catalogue de commande complet. La fiche technique de la famille à alimentation externe liée ici répertorie en outre le **SF32LB52HUD6** (1,8 V, QFN68L, PSRAM 128 Mb), tandis que le guide matériel emploie aussi les formes de suffixe `52AUx6` et `52D/F/HUx6`. Les sources disponibles ne fournissent pas de tableau de variantes unique et cohérent. Avant la validation de la conception, vérifiez dans la fiche technique à jour l'état de commercialisation, les limites d'alimentation, l'interface mémoire et les détails d'E/S de toute référence de ce type.

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB52x en conception validée :

1. **Valider le parcours de développement du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour valider les périphériques requis et le comportement Bluetooth.
2. **Choisir le support d'intégration.** Évaluez le [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) lorsqu'un module RF déjà intégré convient au produit ; sinon, choisissez la [carte de développement SF32LB52](../devkits/SF32LB52-DevKit-LCD.md) la plus proche pour la validation précoce du firmware et des périphériques.
3. **Concevoir et relire le matériel.** Utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) local — y compris ses listes de contrôle du [schéma](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) et de l'[implantation du circuit imprimé](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md) — avant de valider le schéma ou l'implantation. Confirmez la bonne base de famille d'alimentation : 520/3/5/7, 52B/E/G/J ou 52D.
4. **Vérifier la source faisant autorité.** Contrôlez la [fiche technique](#development-resources) applicable et le [guide de conception matérielle pour 520/3/5/7] ou le [guide de conception matérielle pour 52B/D/E/G/J] de SiFli par rapport à la référence commandable et au boîtier exacts.

## Produits associés { #related-products }

### Module { #module }

Le [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) associe le SF32LB525UC6, qui dispose de 8 Mo de PSRAM OPI intégrée au boîtier dans la configuration standard, à un réseau d'adaptation RF. Le module mesure 27,9 × 18,0 × 3,1 mm et convient aux projets qui veulent les capacités de la classe SF32LB52 sans assumer l'implantation et la validation RF au niveau de la puce.

### Kits de développement { #development-kits }

- Le [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) est la principale carte de mise en service orientée écran pour l'écosystème de modules SF32LB52, avec connectivité LCD QSPI et MCU/8080.
- Le [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) est la carte cœur compacte à alimentation externe pour une mise en service rapide du firmware, des GPIO et du mode basse consommation sur des composants de classe 52B/52J.
- Le [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) est la plus petite carte de développement de la série 52, utile lorsque le produit cible est contraint en taille.
- Le [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) est la voie orientée basse consommation pour l'évaluation sur batterie et les expérimentations de produits compacts.

### Produits de référence { #reference-products }

Les conceptions SF32LB52 typiques comprennent les montres connectées d'entrée de gamme, les bracelets d'activité, les accessoires Bluetooth, les commandes graphiques compactes, les étiquettes électroniques de rayon, les badges intelligents, les imprimantes d'étiquettes portables et les afficheurs économiques pour vélos ou trottinettes électriques.

!!! note "Contenu généré automatiquement"
    Cette page a été compilée/rédigée sans document source existant. Vérifiez les affirmations techniques dans la documentation officielle de SiFli avant de vous y fier.
