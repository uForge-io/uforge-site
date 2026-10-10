---
icon: lucide/microchip
description: "SF32LB56x : famille avancée de MCU Bluetooth bimode à très basse consommation pour les produits qui exigent des écrans plus riches, de l'audio intégré, de la mémoire externe et un traitement permanent plus puissant."
tags:
    - Matériel
    - Puce
---

# SF32LB56x { #sf32lb56x }

## Présentation { #overview }

La série SF32LB56x est une famille avancée de microcontrôleurs AIoT à très basse consommation pour les produits qui ont besoin du Bluetooth bimode, de graphismes plus riches, d'audio intégré, de mémoire externe et d'une plus grande souplesse d'affichage et de stockage que les composants SF32LB d'entrée de gamme.

Elle repose sur une architecture bicœur big.LITTLE : un processeur applicatif hautes performances Arm Cortex-M33 STAR-MC1[^1] jusqu'à 240 MHz et un processeur Arm Cortex-M33 STAR-MC1 à très basse consommation jusqu'à 96 MHz. Cette répartition permet au cœur principal d'absorber les charges d'interface, d'affichage, de stockage et de logique produit, tandis que le cœur basse consommation gère la détection permanente, le comportement en veille et le contrôle Bluetooth avec un budget énergétique réduit.

La fiche produit et la fiche technique officielles de SiFli positionnent le SF32LB56x comme un choix à plus forte intégration pour les appareils connectés riches en affichage et en audio. La famille ajoute le Bluetooth 5.3 bimode avec prise en charge de BLE Audio, les graphismes ePicasso 2.0, des chaînes CAN/CNA audio intégrées, un accélérateur orienté TinyML, des options de flash intégrées au boîtier, ainsi qu'une prise en charge plus large de la mémoire externe et des interfaces d'affichage. En pratique, elle convient bien lorsqu'une conception a dépassé le SF32LB55x en complexité sans fil, d'affichage ou audio, tout en voulant conserver la consommation et l'intégration d'un MCU.

Le guide des modèles de puces de SiFli compte aussi ici : la famille SF32LB56x prend en charge différentes combinaisons d'interfaces d'affichage selon le boîtier ; la référence exacte et le choix du boîtier doivent donc être traités comme un choix d'architecture de premier ordre, et non comme un détail tardif de circuit imprimé.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

## Applications { #applications }

**SF32LB56x est recommandé pour** les produits Bluetooth bimode qui exigent de meilleures capacités d'affichage, d'audio, de stockage ou de traitement local, notamment :

- Montres connectées et bracelets connectés
- Produits portables graphiques
- Dispositifs médicaux et de santé
- Produits IHM connectés
- Terminaux portables industriels
- Serrures connectées et appareils électroménagers intelligents
- Concentrateurs de capteurs basse consommation
- Afficheurs avancés pour vélos et trottinettes électriques

Choisissez le SF32LB56x lorsque la conception exige une ou plusieurs de ces capacités :

- Bluetooth 5.3 bimode avec prise en charge de BLE Audio
- CAN et CNA audio HiFi intégrés
- Charges d'affichage et de graphismes plus exigeantes
- Prise en charge de l'interface d'affichage DPI/RGB
- Wi-Fi externe via SDIO ; stockage externe via SD/SDIO ou eMMC
- Nombre de GPIO plus élevé grâce à l'option WBBGA175
- Meilleure marge pour la simultanéité TinyML, audio et interface

## Ressources de développement { #development-resources }

[Fiche produit]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[Fiche technique]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[Manuel utilisateur]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[Guide de conception matérielle (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Guide de conception matérielle (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Source de l'application matérielle (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Source de l'application matérielle (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Guide de conception matérielle (μForge)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Source de la liste de contrôle de conception matérielle]: https://wiki.sifli.com/hardware/index.html
[Documentation du SDK]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[Référence de l'API]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit]__
- :fontawesome-solid-file-pdf: __[Fiche technique]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Source de l'application matérielle (U)]__
- :fontawesome-brands-github: __[Source de l'application matérielle (V)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (μForge)]__
- :fontawesome-solid-book: __[Documentation du SDK]__
- :fontawesome-solid-book-open: __[Référence de l'API]__
- :fontawesome-solid-list-check: __[Source de la liste de contrôle de conception matérielle]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Processeur applicatif hautes performances Arm Cortex-M33 STAR-MC1 (HCPU), jusqu'à 240 MHz
- Processeur Arm Cortex-M33 STAR-MC1 à très basse consommation (LCPU), jusqu'à 96 MHz
- Jusqu'à 370 DMIPS / 984 EEMBC CoreMark sur le HCPU
- Jusqu'à 148 DMIPS / 394 EEMBC CoreMark sur le LCPU
- Système mémoire du HCPU : cache d'instructions de 32 Ko + cache de données de 16 Ko, 800 Ko de SRAM dont 128 Ko de SRAM de rétention
- Système mémoire du LCPU : cache d'instructions de 16 Ko + cache de données de 8 Ko, 160 Ko de SRAM de rétention
- Options de 512 Ko ou 1 Mo de NOR QSPI dans le boîtier
- Interfaces mémoire externes pour NOR QSPI, NAND SPI, PSRAM QPI/OPI, SD/SDIO et eMMC

### Graphismes, affichage et IA { #graphics-display-and-ai }

- Accélération graphique 2D/2,5D ePicasso 2.0
- Fusion alpha sur 4 couches plus une couche d'arrière-plan
- Rotation, mise à l'échelle, effet miroir et conversion des formats courants en matériel
- Charge du moteur graphique jusqu'à 1024 × 1024
- Décompression graphique sans perte eZip 2.0 avec prise en charge native des animations eZip-A
- Selon les variantes prises en charge, le contrôleur LCD gère les interfaces 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB et JDI ; la disponibilité dépend du boîtier et du code de commande exacts
- TurboPixel : compression avec perte à rapport fixe du tampon d'image final via extDMA et décompression dans le contrôleur d'affichage, réduisant la bande passante et la capacité de PSRAM
- Accélérateur matriciel de réseaux de neurones pour charges TinyML, jusqu'à 1,92 GOPS et plus de 10 TOPS/W

### Audio et connectivité sans fil { #audio-and-wireless-connectivity }

- Bluetooth 5.3 bimode avec prise en charge de BLE Audio
- Sensibilité : -100 dBm pour BLE à 1 Mbps, -96,3 dBm pour BR, -95,5 dBm pour EDR2 et -88,5 dBm pour EDR3
- Puissance d'émission maximale : 19 dBm pour BR/BLE, 13 dBm pour EDR2/EDR3
- Courant de crête en réception BR : 2,2 mA sous 3,3 V
- 1 CNA audio HiFi 24 bits, RSB de 108 dB
- 1 CAN audio HiFi 24 bits, RSB de 99 dB
- 2 interfaces PDM et 1 interface I2S

### Sécurité { #security }

- Accélérateurs matériels AES, HASH et CRC
- Générateur de nombres aléatoires vrais (TRNG)
- PSA Certified Level 1

### Périphériques et E/S { #peripherals-and-ios }

- 6 interfaces UART
- 7 interfaces I2C
- 4 interfaces SPI
- 1 interface ISO7816
- 1 interface USB 2.0 FS
- 4 interfaces MPI
- 2 interfaces SD/SDIO/eMMC, l'une sur 4 bits et l'autre sur 8 bits
- 1 CAN SAR 12 bits à usage général à 8 canaux
- Capteur de température
- 2 comparateurs de tension basse consommation
- Contrôleur de tâches périphériques (PTC)
- Jusqu'à 120 GPIO, selon le boîtier

### Alimentation et boîtier { #power-supply-and-package }

- Plage de tension d'alimentation : 1,71 V à 3,63 V
- Température de fonctionnement : -40 °C à +85 °C
- Régulateur Buck haut rendement et LDO basse consommation intégrés
- Courant en veille avec réveil par RTC : 600 nA
- Courant en veille avec réveil par broche : 300 nA
- Options de boîtier : QFN68L et WBBGA175

## Variantes de la famille { #family-variants }

Le SF32LB56x couvre des composants QFN68L compacts et des composants WBBGA175 à plus grand nombre d'E/S, avec différentes options de mémoire intégrée. Choisissez tôt le code de commande exact, car la prise en charge de l'interface d'affichage, la marge de GPIO, la capacité de stockage, le procédé de circuit imprimé et les options de migration vers un module diffèrent sensiblement au sein de la famille.

Les variantes listées ont une plage de tension d'alimentation documentée de 1,71 V à 3,63 V et une plage de température de fonctionnement de -40 °C à +85 °C. Les domaines d'alimentation des GPIO prennent en charge 1,71 V à 3,45 V ; les rails d'E/S de la mémoire intégrée au boîtier ont des limites distinctes. Consultez le guide matériel de la variante U ou V correspondante avant de définir les niveaux d'interface.

**Écart de documentation pour `SF32LB566VCB36` :** le [guide des modèles de puces SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) indique 1 Mo de NOR QSPI intégré au boîtier, alors que les informations de commande de la [fiche technique DS5601 V1.9.2](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf) plus ancienne indiquent 4 Mb (0,5 Mo). L'[index des produits](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst) actuel de SiFli renvoie vers la DS5601 V1.9.3, dont les informations de commande n'ont pas pu être vérifiées lors de cette revue ; ne supposez ni que l'ancien écart persiste ni qu'il a été corrigé. Ce tableau suit le guide des modèles de puces. Vérifiez l'entrée de la V1.9.3 ou confirmez auprès de SiFli le code de commande exact et la configuration mémoire livrée avant de figer la nomenclature.

<div align="center"><em>Variantes représentatives de la famille SF32LB56x</em></div>

<div align="center" markdown>

| Référence exemple | Boîtier | GPIO HCPU / LCPU | Mémoire intégrée | Interface d'affichage | Cas d'usage typique |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 Ko de flash NOR QSPI | QSPI | Conceptions d'entrée de gamme de la série 56 pour objets portables, papier électronique ou IHM compacte, avec l'empreinte mémoire la plus faible et l'éclatement de circuit imprimé le plus simple |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 Mo de PSRAM OPI + 512 Ko de flash NOR QSPI | QSPI | Conceptions graphiques compactes nécessitant plus de marge de tampon d'image que le niveau 560 de base |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 Mo de PSRAM OPI + 512 Ko de flash NOR QSPI | QSPI | Interfaces compactes de plus haute résolution qui restent sur la voie QFN, moins coûteuse |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 Mo de PSRAM OPI + 512 Ko de flash NOR QSPI | QSPI | Produits compacts gourmands en mémoire nécessitant de plus grandes ressources locales sans passer au BGA |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | 8 Mo + 4 Mo de PSRAM OPI + 1 Mo de flash NOR QSPI | DPI / QSPI / 8080 / JDI | Conceptions complètes pour objets portables et IHM exigeant des options d'affichage plus riches, davantage d'E/S et exactement le silicium utilisé par le SF32LB56-MOD |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 Mo de PSRAM OPI + 1 Mo de flash NOR QSPI | DPI / QSPI / 8080 / JDI | Conceptions à nombre élevé d'E/S privilégiant un plus grand bloc unique de PSRAM et un routage d'affichage avancé, sans utiliser la puce standard du module |

</div>

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB56x en conception validée :

1. **Prouver le chemin du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour exercer le chemin cible d'affichage, d'audio, de Bluetooth et de stockage.
2. **Choisir le support d'intégration.** Évaluez le [SF32LB56-MOD](../modules/SF32LB56-MOD.md) pour réduire le travail d'intégration RF et mémoire haute vitesse, ou utilisez le [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) pour la validation au niveau de la carte.
3. **Concevoir et relire le matériel.** Utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) local — y compris ses listes de contrôle du [schéma](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md) et de l'implantation du circuit imprimé — avant de valider le schéma ou l'implantation. Maintenez le choix du boîtier U/V et de l'interface d'affichage cohérent avec le composant retenu.
4. **Vérifier la source faisant autorité.** Confirmez la référence commandable et le boîtier exacts à l'aide de la [fiche technique][Fiche technique], du [manuel utilisateur][Manuel utilisateur], du [guide de conception matérielle U][Guide de conception matérielle (U, wiki.sifli.com)] ou [V][Guide de conception matérielle (V, wiki.sifli.com)] applicable, et de la [source d'application matérielle U][Source de l'application matérielle (U)] ou [V][Source de l'application matérielle (V)] correspondante de SiFli.

## Produits associés { #related-products }

### Module { #module }

Le [SF32LB56-MOD](../modules/SF32LB56-MOD.md) regroupe la puce SF32LB566VCB36, la mémoire, la conception RF et des options d'antenne dans un module prêt à intégrer. C'est un excellent choix lorsque le projet veut les capacités du SF32LB56x tout en réduisant les risques liés à l'implantation RF, à l'adaptation d'antenne, au placement du quartz et à l'intégration de la mémoire haute vitesse.

### Kits de développement { #development-kits }

Le [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) est un point de départ pratique pour la mise en route du firmware, la validation de l'écran, les tests audio et de stockage, les vérifications RF et le profilage de puissance avant de s'engager dans une conception à puce nue ou à base de module.

### Produits de référence { #reference-products }

Les produits finaux SF32LB56x typiques comprennent les montres connectées avancées, les panneaux IHM connectés, les dispositifs de santé, les terminaux portables industriels, les instruments portatifs et des afficheurs plus riches pour vélos ou trottinettes électriques.

!!! note "Contenu généré automatiquement"
    Cette page a été compilée/rédigée sans document source existant. Vérifiez les affirmations techniques dans la documentation officielle de SiFli avant de vous y fier.
