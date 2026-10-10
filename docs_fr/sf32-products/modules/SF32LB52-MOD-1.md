---
icon: lucide/card-sim
description: "SF32LB52-MOD-1 : famille de modules MCU Bluetooth 5.3 basse consommation pour SF32LB52x, avec circuit RF et quartz de 48 MHz intégrés et options d'antenne selon la référence."
tags:
  - Matériel
  - Module
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## Présentation { #overview }

SF32LB52-MOD-1 regroupe des modules MCU à basse consommation dotés du Bluetooth et basés sur la plateforme SF32LB52x. La variante standard N16R8 utilise le SF32LB525UC6. Le module de 27,9 × 18,0 × 3,1 mm réunit la plateforme double cœur Arm Cortex-M33 STAR-MC1, le circuit RF, un quartz de 48 MHz et la connexion d'antenne. Le type d'antenne dépend de la référence : antenne PCB intégrée au module ou antenne externe raccordée via un connecteur IPEX.

La DS5203 V0.3 décrit une antenne PCB intégrée au module et indique qu'un autre modèle accepte une antenne externe via IPEX, sans toutefois associer ces options aux références mémoire publiées. Avant de finaliser le routage de la carte porteuse, confirmez auprès de SiFli la configuration d'antenne exacte. Le produit final doit néanmoins faire l'objet d'une validation RF et satisfaire aux exigences de certification applicables. Les interfaces exposées permettent de réaliser des produits connectés compacts utilisant les fonctions Bluetooth, graphiques et audio de la plateforme.

Selon le code de commande, le composant monté sur le module peut intégrer de l'OPI-PSRAM dans son boîtier. Les interfaces du module donnent accès aux principales fonctions de la famille de puces, notamment GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS et les signaux audio analogiques.

!!! info
    Pour l'architecture et les périphériques de la famille de puces, consultez la page [SF32LB52x](../chips/SF32LB52x.md). Cette page traite de l'intégration du module, de son alimentation, du boîtier et du choix des variantes.

## Applications { #applications }

**Le SF32LB52-MOD-1 convient aux produits qui nécessitent Bluetooth, graphisme et audio tout en réduisant les risques liés à la RF et à la conception de la carte.** Exemples :

- Montres connectées, bracelets d'activité et appareils médicaux portables
- Hubs de capteurs Bluetooth et accessoires connectés
- Serrures intelligentes, équipements de maison connectée et appareils compacts
- Petits équipements IHM avec affichage graphique
- Clés électroniques de véhicule et télécommandes à porter sur soi
- Produits connectés avec écran destinés aux projets sensibles au coût

Envisagez le SF32LB52-MOD-1 si le produit nécessite une ou plusieurs des fonctions suivantes :

- Intégration RF au niveau du module, avec options d'antenne PCB ou d'antenne externe
- Interfaces du module donnant accès aux fonctions Bluetooth, graphiques et audio de la plateforme SF32LB52x
- Réutilisation des logiciels et des fonctions périphériques de la plateforme SF32LB52x
- Format compact adapté aux appareils portables et aux produits IHM soumis à des contraintes d'espace

## Ressources de développement { #development-resources }

[Fiche technique du module]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Présentation de la puce]: ../chips/SF32LB52x.md
[Guide de conception matérielle]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Guide de conception d'origine (wiki.sifli.com, variante EPD)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Commander des échantillons]: https://sifli.taobao.com/
[Acheter des cartes de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche technique du module]__
- :fontawesome-solid-microchip: __[Présentation de la puce]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle]__
- :fontawesome-solid-file-lines: __[Guide de conception d'origine (wiki.sifli.com, variante EPD)]__
- :fontawesome-solid-cart-shopping: __[Commander des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des cartes de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specifications }

### Calcul et mémoire { #compute-and-memory }

- Cœur applicatif Arm Cortex-M33 STAR-MC1 (HCPU), jusqu'à 240 MHz et avec une performance maximale de 370 DMIPS / 984 EEMBC CoreMark
- Cache d'instructions de 32 Ko et cache de données de 16 Ko
- 512 Ko de SRAM de rétention
- Cœur Arm Cortex-M33 STAR-MC1 dédié à très basse consommation (LCPU), jusqu'à 24 MHz, avec 64 Ko de SRAM de rétention
- FPU simple précision et MPU sur les deux cœurs
- OPI-PSRAM intégrée au boîtier du composant selon la référence du module

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth bimode 5.3 avec prise en charge BLE Audio
- Sensibilité : -100 dBm (BLE/1 Mbit/s), -96,3 dBm (BR) et -95,5 dBm (EDR2)
- Puissance d'émission maximale : 19 dBm (BR/BLE) et 13 dBm (EDR2/EDR3)
- Courant de réception de crête en BR : 2,4 mA à 3,8 V

### Graphisme et affichage { #graphics-and-display }

- Moteur graphique 2D/2,5D ePicasso 2.0
- Accélérateur eZip 2.0 de décompression graphique sans perte
- Contrôleur LCD prenant en charge les interfaces 8080, SPI, Dual-SPI et Quad-SPI
- Adapté aux écrans compacts de type montre et aux petits équipements IHM

### Audio { #audio }

- 1 DAC audio 24 bits
- 1 ADC audio Sigma-Delta 24 bits
- 1 interface I2S
- 1 interface PDM
- Entrée et sortie audio analogiques disponibles via l'interface du module

Une interface PDM peut prendre en charge jusqu'à deux microphones numériques : le nombre d'interfaces PDM n'est donc pas le nombre de microphones. La connectivité réelle dépend du multiplexage des broches et du routage de la carte porteuse. Sur ce module, PA22/PA23 ne sont pas accessibles depuis l'extérieur lorsque le quartz optionnel de 32,768 kHz est monté ; le guide de conception matérielle indique une autre affectation des broches PDM.

### Interfaces de stockage { #storage-interfaces }

- OPI-PSRAM intégrée au boîtier du composant selon la référence du module
- 1 interface MPI (QSPI) pour mémoire Flash SPI NOR ou SPI NAND externe
- 1 interface SD/SDIO compatible avec SD 3.0, SDIO 3.0 et eMMC

### Sécurité { #security }

- Accélérateurs matériels AES, HASH et CRC
- Générateur de nombres véritablement aléatoires (TRNG)
- PSA Certified Level 1

### Alimentation, boîtier et E/S { #power-package-and-io }

- Boîtier du module : 27,9 × 18,0 × 3,1 mm
- Température de fonctionnement : de −40 °C à +85 °C
- VSYS : 3,2–4,7 V avec une batterie lithium-ion directement raccordée, ou 3,7–4,7 V avec une alimentation régulée ; 3,8 V est recommandé.
- Tension d'E/S : 3,3 V
- VBATS : entrée de mesure de la batterie et entrée ADC, de 0 à 4,7 V. Raccordez directement la tension à mesurer ; n'utilisez pas de pont diviseur externe.
- VDD33_VOUT2 : sortie LDO 3,3 V intégrée au module pour alimenter les périphériques externes. Elle est désactivée par défaut et doit être activée par logiciel ; courant de sortie maximal : 150 mA ; capacité totale de la ligne : 7,4 µF maximum.
- Interface de module à 68 broches ; les broches de signal multiplexent notamment les fonctions GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS, audio numérique et analogique

## Variantes du module { #module-variants }

<div align="center"><em>Variantes du module SF32LB52-MOD-1</em></div>

<div align="center" markdown>

| Code de module | Puce | Flash | PSRAM | Température | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | QSPI-NOR 16 Mo | OPI-PSRAM 8 Mo | −40 °C à +85 °C | 27,9 × 18,0 × 3,1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | SPI-NAND 128 Mo | OPI-PSRAM 16 Mo | −40 °C à +85 °C | 27,9 × 18,0 × 3,1 mm |

</div>

Le [guide des modèles de modules de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) et le guide d'application EPD mentionnent également A128R16, mais la fiche DS5203 V0.3 liée ici ne répertorie que N16R8. Avant de choisir A128R16, vérifiez auprès de SiFli sa disponibilité actuelle et sa configuration mémoire.

Les sources officielles emploient des désignations différentes pour la mémoire Flash d'A128R16 : le [guide OpenSiFli des modèles de modules](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) indique une SPI-NAND de 128 Mo, tandis que le [guide SiFli des modèles de cartes](https://wiki.sifli.com/board/devkit_guide.html) indique une QSPI-NAND de 128 Mo pour la référence DevKit correspondante. Les sources ne précisent pas si cette différence concerne le composant monté ou la désignation de l'interface. Avant d'utiliser la configuration de la carte comme référence du module, vérifiez le composant Flash et le mode de bus dans le schéma et la BOM de la révision exacte de la carte.

## Produits associés { #related-products }

### Puce { #chip }

La page [SF32LB52x](../chips/SF32LB52x.md) décrit l'architecture et les périphériques de la famille ; consultez le tableau des variantes ci-dessus pour connaître la correspondance entre chaque SKU du module, sa puce et sa mémoire.

### Cartes de développement { #development-kits }

Les cartes [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) et [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) permettent de valider le firmware avant de concevoir une carte porteuse personnalisée pour le module.

### Produits de référence { #reference-products }

Les produits finaux typiques comprennent les montres connectées d'entrée et de milieu de gamme, les bracelets d'activité, les hubs de capteurs Bluetooth, les serrures intelligentes et les dispositifs IHM graphiques compacts.
