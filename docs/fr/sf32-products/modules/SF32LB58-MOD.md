---
icon: lucide/card-sim
description: "SF32LB58-MOD : module MCU Bluetooth basse consommation basé sur le SF32LB586VDD36, avec 16 + 16 MB de HPI-PSRAM, 1 MB de QSPI-NOR et variantes NOR, NAND ou eMMC."
tags:
  - Matériel
  - Module
---

# SF32LB58-MOD { #sf32lb58-mod }

## Présentation { #overview }

Le SF32LB58-MOD est un module MCU Bluetooth basse consommation de SiFli, basé sur le SF32LB586VDD36. La configuration standard comprend 16 + 16 MB de HPI-PSRAM et 1 MB de QSPI-NOR. Ce module de 24 × 24 × 3,1 mm réunit la plateforme à trois cœurs, le circuit RF, le quartz et les options mémoire, et expose des interfaces pour l'affichage, l'audio, le stockage et la commande.

Le module intègre le composant BGA256, le circuit RF, le quartz et la mémoire rapide, ce qui réduit le routage correspondant sur la carte porteuse du produit. Le produit final doit néanmoins faire l'objet d'une validation RF et obtenir les homologations réglementaires applicables. Avant de finaliser la conception de la carte porteuse, confirmez la configuration d'antenne et de mémoire de la référence choisie.

Selon la référence choisie, la plateforme peut associer une HPI-PSRAM à une mémoire QSPI-NOR, QSPI-NAND ou eMMC. Les interfaces disponibles permettent de développer des produits dotés de fonctions d'affichage, d'audio, de stockage et de connectivité tout en conservant une plateforme reposant sur un MCU.

La fiche technique DS5802 V0.1 décrit une antenne PCB intégrée au module et des options de raccordement d'une antenne externe. Celle-ci peut être raccordée par le connecteur externe de première génération, compatible avec les connecteurs Hirose U.FL, I-PEX MHFI et Amphenol AMC. La fiche technique ne précise pas quelle configuration correspond à chaque référence ; confirmez auprès de SiFli l'implémentation d'antenne du module choisi avant de finaliser le routage de la carte porteuse.

!!! info
    Pour l'architecture et les périphériques de la puce sous-jacente, consultez la page [SF32LB58x](../chips/SF32LB58x.md). Cette page traite de l'intégration du module, des configurations mémoire, des alimentations et du choix du produit.

## Applications { #applications }

SiFli indique les domaines d'application suivants pour le SF32LB58-MOD :

- Objets connectés portables : montres connectées haut de gamme, bracelets connectés, dispositifs médicaux portables et équipements de fitness
- Industrie : solutions d'affichage économiques, IHM graphiques, centres de contrôle de capteurs industriels, surveillance des équipements et instruments
- Automobile : unités centrales de commande pour véhicules électriques, clés de voiture et télécommandes de véhicule à porter sur soi
- Domotique : petits et moyens appareils électroménagers intelligents et serrures connectées
- Applications générales : concentrateurs de capteurs à basse consommation et Bluetooth Mesh
- Exemples d'AIoT : reconnaissance de commandes vocales, maison connectée, clés intelligentes et panneaux de commande intelligents

Envisagez le SF32LB58-MOD si la conception nécessite une ou plusieurs des fonctions suivantes :

- Composant BGA256, circuit RF, quartz et mémoire rapide intégrés au module
- Antenne PCB intégrée ou antenne externe raccordée par un connecteur compatible avec Hirose U.FL, I-PEX MHFI ou Amphenol AMC ; configuration à confirmer selon la référence
- Options mémoire QSPI-NOR, QSPI-NAND ou eMMC selon la référence
- Interfaces exposées pour l'affichage, l'audio, le stockage et les fonctions de commande

## Ressources de développement { #development-resources }

[Fiche technique du module]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Présentation de la puce]: ../chips/SF32LB58x.md
[Guide de conception matérielle]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Commander des échantillons]: https://sifli.taobao.com/
[Acheter des cartes de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche technique du module]__
- :fontawesome-solid-microchip: __[Présentation de la puce]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle]__
- :fontawesome-solid-cart-shopping: __[Commander des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des cartes de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specifications }

### Marquages réglementaires { #regulatory-markings }

Les fichiers d'étiquettes fournis par SiFli pour **SF32LB58-MOD-N16R32N1** et **SF32LB58-MOD-A128R32N1** affichent les identifiants ci-dessous ainsi que le marquage CE.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 780px; margin: 1rem auto;">
<figure style="margin: 0;">
<a href="assets/SF32LB58-MOD/N16R32N1-label.png"><img src="assets/SF32LB58-MOD/N16R32N1-label.png" alt="SF32LB58-MOD-N16R32N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB58-MOD-N16R32N1</figcaption>
</figure>
<figure style="margin: 0;">
<a href="assets/SF32LB58-MOD/A128R32N1-label.png"><img src="assets/SF32LB58-MOD/A128R32N1-label.png" alt="SF32LB58-MOD-A128R32N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB58-MOD-A128R32N1</figcaption>
</figure>
</div>

<div align="center" markdown>

*Marquages figurant sur les étiquettes SF32LB58-MOD fournies*

| Champ | Valeur imprimée |
| --- | --- |
| Variantes étiquetées | `SF32LB58-MOD-N16R32N1`, `SF32LB58-MOD-A128R32N1` |
| FCC | `2BVUV-SF32LB58` |
| IC | `35666-SF32LB58` |
| CMIIT ID | `26J3260U7517(M)` |
| HVIN | `SF32LB58` |
| Marquage CE | Présent sur les deux étiquettes |

</div>

Ces valeurs sont transcrites à partir des étiquettes ; elles ne constituent ni une vérification indépendante des dossiers de certification ni une déclaration de conformité. Confirmez auprès de SiFli les documents d'homologation, les conditions d'utilisation de l'antenne et les consignes d'intégration applicables à la révision exacte du module. Ne généralisez pas ces marquages à SF32LB58-MOD-E4R32N1 ni aux autres variantes sans justificatifs. Le marquage du module ne prouve pas la conformité du produit final.

### Interfaces de stockage et variantes du module { #storage-interfaces-and-module-variants }

<div align="center"><em>Variantes du module SF32LB58-MOD</em></div>

<div align="center" markdown>

| Code de module | Stockage au choix | PSRAM | Flash standard | Température | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | QSPI-NOR 16 MB | HPI-PSRAM 16 + 16 MB | QSPI-NOR 1 MB | −40 °C à +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-A128R32N1 | QSPI-NAND 128 MB | HPI-PSRAM 16 + 16 MB | QSPI-NOR 1 MB | −40 °C à +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-E4R32N1 | eMMC 4 GB | HPI-PSRAM 16 + 16 MB | QSPI-NOR 1 MB | −40 °C à +85 °C | 24 × 24 × 3,1 mm |

</div>

!!! note "Disponibilité et personnalisation"
    **SF32LB58-MOD-E4R32N1 est actuellement indisponible en raison de pénuries de puces mémoire.** D'autres configurations du module sont possibles. Pour toute demande de personnalisation, [contactez μForge.io](../../about/contact.md).

Le [guide des modèles de modules SiFli](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) répertorie ces variantes, indique que l'eMMC peut être intégrée comme composant interne et précise que d'autres configurations peuvent être personnalisées. Choisissez la référence en fonction du support et de la capacité requis, puis confirmez auprès de SiFli la disponibilité actuelle et la configuration mémoire. Vérifiez aussi que le SDK et le firmware visés prennent en charge le composant ainsi que le chemin de démarrage et de stockage retenu.

### Calcul et mémoire { #compute-and-memory }

- 2 cœurs applicatifs Arm Cortex-M33 STAR-MC1, jusqu'à 240 MHz
- 1 cœur Arm Cortex-M33 STAR-MC1 à basse consommation, programmable par l'utilisateur, jusqu'à 96 MHz
- Jusqu'à 370 DMIPS / 984 EEMBC CoreMark par cœur applicatif
- Jusqu'à 148 DMIPS / 394 EEMBC CoreMark sur le cœur basse consommation
- SRAM 2176 KB (HCPU) + SRAM 512 KB (ACPU) + SRAM de rétention 1056 KB (LCPU)
- FPU simple précision et MPU sur tous les cœurs

### Connectivité sans fil { #wireless-connectivity }

- Bluetooth bimode 5.3 avec prise en charge BLE Audio
- Sensibilité jusqu'à -107,5 dBm pour le BLE Long Range à 125 kbit/s
- Puissance d'émission maximale : 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- Courant de crête en réception BR/EDR2/EDR3 : 2,2 mA à 3,3 V

### Graphisme, affichage et multimédia { #graphics-display-and-multimedia }

- Moteur graphique 2D/2,5D ePicasso 2.0
- Moteur graphique vectoriel Vivante GCNanoUltraV
- Codec JPEG matériel
- Deux contrôleurs LCD prennent en charge 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI et JDI
- TurboPixel : extDMA compresse avec perte le framebuffer final selon un rapport fixe, puis le contrôleur d'affichage le décompresse. Cela réduit, pour une charge graphique donnée, la bande passante PSRAM nécessaire et la capacité mémoire requise pour le framebuffer.
- Affichage permanent pris en charge sur les deux contrôleurs LCD

### Audio { #audio }

- 2 DAC audio 24 bits
- 2 ADC Sigma-Delta 24 bits
- 2 interfaces PDM (PDM1/PDM2)
- 3 interfaces I2S, toutes en mode maître ; I2S1 est réservé à l'entrée, tandis qu'I2S2 et I2S3 prennent en charge l'entrée et la sortie
- Entrées et sorties audio analogiques disponibles via l'interface du module

Le [guide matériel SF32LB58x](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html) de SiFli indique deux entrées microphone PDM (PDM1 et PDM2). Une seule interface PDM peut transporter deux canaux microphone : l'[exemple PDM du SDK SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) montre deux microphones enregistrés sur les canaux gauche et droit d'une même interface, ou quatre microphones répartis sur PDM1 et PDM2. Toutefois, la liste des plateformes prises en charge par cet exemple ne comprend pas le SF32LB58-MOD. Pour ce module, vérifiez la configuration des microphones et des canaux prise en charge par le SDK cible, ainsi que le multiplexage des broches et le routage de la carte porteuse. Ne déduisez pas la prise en charge de quatre microphones du seul nombre d'interfaces PDM.

### Alimentation, boîtier et E/S { #power-package-and-io }

- Boîtier du module : 24 × 24 × 3,1 mm
- Température de fonctionnement : de −40 °C à +85 °C
- VDD_3V3 : 2,97–3,6 V
- VDD_1V8 : 1,7–1,95 V
- VDDIOA / VDDIOA2 / VDDIOB : 1,7–3,6 V

- VDD_3V3 alimente AVDD33_ANA, AVDD33_AUD et AVDD_USB ; si le module intègre une eMMC, cette alimentation fournit aussi son entrée VDD. SiFli recommande un LDO pour cette alimentation.
- VDD_1V8 alimente PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI et la mémoire intégrée au boîtier.
- VDDIOA alimente les E/S PA sauf PA00–PA11, la Flash externe et VIO de l'eMMC si elle est intégrée. VDDIOA2 alimente PA00–PA11 ; VDDIOB alimente les E/S PB.
- Interface de module à 138 broches ; les broches de signal multiplexées exposent notamment les fonctions GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS et audio

!!! note "Tension des E/S externes"
    DS5802 V0.1 indique 1,7–3,6 V pour VDDIOA, VDDIOA2 et VDDIOB, tandis que sa liste de contrôle matérielle spécifie un niveau d'interface de 3,3 V pour les E/S du module et les périphériques externes. Le document n'explique pas cet écart. Confirmez auprès de SiFli la tension autorisée pour l'interface et la révision du module choisies ; ne déduisez pas de la seule plage d'alimentation que toutes les E/S externes tolèrent 3,6 V.

## Produits associés { #related-products }

### Puce { #chip }

Basé sur le [SF32LB58x](../chips/SF32LB58x.md). Consultez la page de la puce pour l'architecture graphique, mémoire et d'affichage qui sous-tend le module.

### Cartes de développement { #development-kits }

La carte [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) permet de valider le firmware et de tester l'affichage ainsi que les interfaces audio et de stockage avant de concevoir une carte porteuse personnalisée pour le module.

### Produits de référence { #reference-products }

Les domaines d'application documentés par SiFli comprennent les objets connectés portables, les équipements industriels d'affichage et IHM, les systèmes de commande automobile, les appareils de maison connectée, les concentrateurs de capteurs à basse consommation et les produits Bluetooth Mesh.
