---
icon: lucide/card-sim
description: "SF32LB56-MOD : famille polyvalente de modules MCU Bluetooth 5.3 basse consommation basée sur SF32LB56xV, avec 4 Mo + 8 Mo de mémoire OPI-PSRAM intégrée au boîtier et des variantes Flash selon le SKU."
tags:
  - Matériel
  - Module
---

# SF32LB56-MOD { #sf32lb56-mod }

## Présentation { #overview }

La famille SF32LB56-MOD regroupe des modules MCU Bluetooth polyvalents et basse consommation basés sur la plateforme SF32LB56xV de SiFli. La configuration standard utilise le SF32LB566VCB36 avec 4 Mo + 8 Mo de mémoire OPI-PSRAM intégrée au boîtier et 1 Mo de QSPI-NOR. Le module compact réunit un MCU double cœur, le Bluetooth 5.3 avec BLE Audio, l'accélération graphique, des interfaces audio, des variantes Flash selon le SKU et un trajet RF intégré.

Le module intègre le trajet RF, le quartz et la mémoire rapide ; l'antenne est soit une antenne PCB intégrée au module, soit une antenne externe raccordée par un connecteur compatible IPEX. Le produit final doit néanmoins faire l'objet d'une validation RF, et le routage de la carte porteuse doit tenir compte de la configuration d'antenne choisie. Les interfaces et variantes mémoire répondent aux besoins des produits équipés d'un écran, de fonctions audio, de capteurs et de capacités de traitement local.

La famille est proposée dans plusieurs configurations mémoire ; toutes mesurent 18,0 × 32,9 × 3,1 mm et fonctionnent de -40 à 85 °C. Le [guide de conception matérielle du SF32LB56-MOD](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md), basé sur DS5602 V0.3, fournit des détails sur l'antenne et le routage. Le guide des modèles de modules de SiFli répertorie les configurations mémoire sans préciser quelle option d'antenne correspond à chaque SKU. Avant de finaliser le routage de la carte porteuse, confirmez auprès de SiFli la configuration d'antenne du module choisi.

!!! info
    Les fonctions de calcul, de graphisme et d'audio ci-dessous décrivent la plateforme SF32LB56xV intégrée au module ; leur disponibilité externe dépend du brochage du module et du multiplexage des broches. Pour l'architecture et l'ensemble des périphériques de la famille de puces, consultez [SF32LB56x](../chips/SF32LB56x.md). Cette page traite de l'intégration du module, de la mémoire selon le SKU, des alimentations et des critères de sélection.

## Applications { #applications }

SiFli indique les domaines d'application suivants pour le SF32LB56-MOD :

- Objets connectés portés : montres connectées haut de gamme, bracelets connectés, dispositifs médicaux portables et équipements de fitness
- Industrie : solutions d'affichage économiques, interfaces IHM graphiques, systèmes de contrôle de capteurs industriels, surveillance des équipements et instruments
- Automobile : unités centrales de commande pour véhicules électriques, clés de voiture et dispositifs de télécommande automobile à porter sur soi
- Domotique : petits et moyens appareils électroménagers intelligents et serrures connectées
- Usage général : concentrateurs de capteurs basse consommation et Bluetooth Mesh
- Exemples d'AIoT : reconnaissance de commandes vocales, maison connectée, clés intelligentes et panneaux de commande intelligents

Envisagez le SF32LB56-MOD si la conception nécessite une ou plusieurs des fonctions suivantes :

- Trajet RF, option d'antenne, quartz et mémoire rapide intégrés au module
- Plusieurs configurations mémoire correspondant aux références répertoriées
- Interfaces pour l'affichage, l'audio, les capteurs et le traitement local
- Dimensions compactes pour les produits soumis à des contraintes d'espace

## Ressources de développement { #development-resources }

[Fiche technique du module]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Présentation de la puce]: ../chips/SF32LB56x.md
[Guide de conception matérielle]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[Guide de conception matérielle SF32LB56x]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Commander des échantillons]: https://sifli.taobao.com/
[Acheter des cartes de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche technique du module]__
- :fontawesome-solid-microchip: __[Présentation de la puce]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB56x]__
- :fontawesome-solid-cart-shopping: __[Commander des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des cartes de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specifications }

### Calcul et mémoire { #compute-and-memory }

- HCPU : Arm Cortex-M33 STAR-MC1, jusqu'à 240 MHz et jusqu'à 370 DMIPS / 984 EEMBC CoreMark
- LCPU : Arm Cortex-M33 STAR-MC1, jusqu'à 96 MHz et jusqu'à 148 DMIPS / 394 EEMBC CoreMark
- Mémoire HCPU : cache d'instructions de 32 Ko, cache de données de 16 Ko et 800 Ko de SRAM, dont 128 Ko de SRAM de rétention
- Mémoire LCPU : cache d'instructions de 16 Ko, cache de données de 8 Ko et 160 Ko de SRAM de rétention
- FPU simple précision et MPU sur les deux cœurs
- Accélérateur matriciel pour réseaux neuronaux et accélérateurs de traitement du signal pour les tâches locales plus exigeantes

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth bimode 5.3 avec prise en charge BLE Audio
- Sensibilité : -100 dBm en BLE à 1 Mbit/s, -96,3 dBm en BR, -95,5 dBm en EDR2 et -88,5 dBm en EDR3
- Puissance d'émission maximale : 19 dBm en BR/BLE et 13 dBm en EDR2/EDR3
- Courant de réception de crête en BR : 2,2 mA à 3,3 V

### Graphisme et affichage { #graphics-and-display }

- Moteur graphique 2D/2,5D ePicasso 2.0
- Rotation, mise à l'échelle, mise en miroir et fusion alpha accélérées matériellement
- Prise en charge de charges de travail graphiques jusqu'à 1024 × 1024
- Décompression graphique sans perte avec eZip 2.0 et prise en charge des animations eZip-A
- Prise en charge LCD pour 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB et JDI
- TurboPixel : extDMA compresse avec perte le framebuffer final selon un rapport fixe, puis le contrôleur d'affichage le décompresse. Cela réduit, pour une charge graphique donnée, la bande passante PSRAM nécessaire et la capacité mémoire requise pour le framebuffer.

### Audio { #audio }

- 1 DAC audio 24 bits
- 1 ADC audio Sigma-Delta 24 bits
- 2 interfaces PDM (PDM1/PDM2), chacune prenant en charge les canaux gauche et droit
- 1 interface I2S
- Conversion de fréquence d'échantillonnage audio et accélération EQ

Chaque interface PDM peut prendre en charge jusqu'à deux microphones numériques, soit jusqu'à quatre au total pour les deux interfaces. Le nombre d'interfaces PDM ne correspond pas au nombre de microphones. La connectivité réelle dépend du multiplexage des broches et du routage de la carte porteuse.

### Variantes mémoire et module { #memory-and-module-variants }

<div align="center"><em>Configurations mémoire du SF32LB56-MOD</em></div>

<div align="center" markdown>

| Code de module | Flash selon le SKU | PSRAM | Flash standard | Température | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | QSPI-NOR 16 Mo | OPI-PSRAM 4 + 8 Mo | QSPI-NOR 1 Mo | -40 à 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | QSPI-NAND 128 Mo | OPI-PSRAM 4 + 8 Mo | QSPI-NOR 1 Mo | -40 à 85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | SD-NAND 128 Mo | OPI-PSRAM 4 + 8 Mo | QSPI-NOR 1 Mo | -40 à 85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

Le [guide des modèles de modules SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) répertorie ces trois configurations et précise que d'autres variantes peuvent être personnalisées. Avant de choisir, confirmez auprès de SiFli les références actuellement disponibles et leur configuration mémoire.

SiFli indique comme configuration standard le SF32LB566VCB36 associé à 4 Mo + 8 Mo d'OPI-PSRAM intégrée au boîtier et à 1 Mo de QSPI-NOR ; cette mémoire correspond à la configuration N16R12N1. Le guide n'attribue pas de référence de puce distincte à A128R12N1 ou D128R12N1. Demandez à SiFli de confirmer la référence exacte de la puce pour ces SKU.

### Alimentation et E/S { #power-and-io }

- Plage de fonctionnement recommandée de VDD_3V3 : 2,97–3,6 V
- Plage de fonctionnement recommandée de VDD_1V8 : 1,7–1,95 V
- Plage de fonctionnement recommandée de VDDIO : 1,7–3,6 V
- Les lignes VDD_3V3, VDD_1V8 et VDDIO doivent être mises sous tension simultanément
- Le niveau d'interface de PA00–PA11 est fixe, à 3,3 V, et ne suit pas VDDIO
- Interface de module à 89 broches
- Température de fonctionnement : de -40 à 85 °C

## Produits associés { #related-products }

### Puce { #chip }

Basé sur le [SF32LB56x](../chips/SF32LB56x.md), plus précisément sur la famille de plateformes SF32LB56xV. Pour une vue d'ensemble de l'architecture, de l'affichage, de l'audio et des boîtiers de cette famille, consultez la page de la puce.

### Cartes de développement { #development-kits }

La [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) permet de valider l'affichage, l'audio, le stockage et les pilotes des périphériques. Sa documentation présente les configurations N16R12N1 et A128R12N1. Vérifiez le marquage du module et la révision de la carte avant de prendre sa mémoire comme référence pour votre conception.

### Produits de référence { #reference-products }

Les domaines d'application documentés par SiFli comprennent les objets connectés portés, les équipements industriels d'affichage et IHM, les systèmes de commande automobile, les appareils de maison connectée, les concentrateurs de capteurs basse consommation et les produits Bluetooth Mesh.
