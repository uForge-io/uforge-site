---
icon: lucide/microchip
description: "SF32LB58x : famille de MCU AIoT haut de gamme pour produits connectés aux besoins importants en graphismes, affichage, mémoire et périphériques."
tags:
    - Matériel
    - Puce
---

# SF32LB58x { #sf32lb58x }

## Présentation { #overview }

La série SF32LB58x se situe au sommet de la gamme SF32LB5x. Elle cible les produits AIoT alimentés par batterie qui ont besoin de graphismes avancés, d'une grande capacité mémoire, du Bluetooth bimode, d'une connectique audio et d'affichage étendue et d'une forte densité de GPIO, sans adopter une plateforme plus volumineuse de la catégorie des processeurs applicatifs.

Le SF32LB58x repose sur une architecture hétérogène à trois cœurs Arm Cortex-M33 STAR-MC1[^1]. Le HCPU et l'ACPU sont des cœurs hautes performances jusqu'à 240 MHz ; le LCPU fonctionne jusqu'à 96 MHz et vise les tâches sensibles à la consommation. Le HCPU gère le contrôle du système, l'interface utilisateur et le traitement applicatif général ; l'ACPU peut prendre en charge des charges de DSP audio ; et le LCPU convient au Bluetooth LE, à l'acquisition de capteurs et aux autres tâches basse consommation. Ce partitionnement permet au firmware de mettre le HCPU hors tension pour des charges adaptées, même si l'économie réelle dépend de l'application et de son firmware.

SiFli documente 3 744 Ko de SRAM sur puce et des combinaisons, selon la référence, de flash NOR et de PSRAM OPI/HPI intégrées au boîtier. La famille offre aussi une prise en charge de l'affichage incluant MIPI DSI, l'accélération graphique vectorielle, l'USB 2.0 High-Speed et un boîtier BGA offrant un grand nombre d'E/S. Évaluez le SF32LB58x lorsqu'une conception exige une interface haute résolution, d'importantes ressources graphiques, du Wi-Fi externe via SDIO ou des ressources de calcul et de mémoire adaptées à des charges d'IA embarquée ou de fusion de capteurs.

[^1]: STAR-MC1 est un IP de CPU embarqué Armv8-M Mainline configurable, proposé par Arm China. Dans les composants SF32 compatibles, SiFli le documente comme processeur applicatif Arm Cortex-M33 STAR-MC1. Son modèle logiciel de classe Cortex-M33 facilite la reprise du firmware, des intergiciels, des portages de RTOS et des outils Cortex-M33 existants, sous réserve du travail d'intégration habituel propre à chaque composant. Ses configurations CU, SP et SE diffèrent principalement par le cache, la TCM, la XIPU et les capacités TrustZone ; les instructions personnalisées Arm/CDE et l'interface de coprocesseur sont des fonctions optionnelles à vérifier pour la référence SF32 exacte. La documentation SiFli peut employer ***Arm Cortex-M33 STAR-MC1*** ou ***Arm Cortex-M33*** selon le contexte.

## Applications { #applications }

**SF32LB58x est recommandé pour** les produits connectés haut de gamme qui ont besoin de tampons d'image plus grands, d'écrans plus riches, de plus de mémoire et d'E/S haute vitesse plus denses, notamment :

- Montres connectées haut de gamme et montres de sport
- IHM portables haute résolution
- Compteurs de vélo et tableaux de bord intelligents
- Terminaux médicaux et industriels portables
- Accessoires Bluetooth + Wi-Fi externe
- Systèmes d'IA embarquée et de fusion de capteurs
- Contrôleurs connectés centrés sur l'affichage

Choisissez le SF32LB58x lorsque la conception exige une ou plusieurs de ces capacités :

- Résolution d'affichage égale ou supérieure à 1024 × 600
- Prise en charge d'écrans MIPI DSI en mode commande ou en mode vidéo
- Graphismes vectoriels, animations plus riches ou ressources d'interface plus volumineuses
- Wi-Fi externe via SDIO
- Grande mémoire pour tampon d'image, audio, graphismes ou modèles d'IA
- Nombre élevé de GPIO ou plusieurs interfaces externes haute vitesse

## Ressources de développement { #development-resources }

[Fiche produit]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Fiche technique]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[Manuel utilisateur]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Guide de conception d'origine (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Note d'application matérielle (source GitHub)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Guide de conception matérielle (μForge)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Acheter des échantillons]: https://sifli.taobao.com/
[Acheter des kits de développement]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit]__
- :fontawesome-solid-file-pdf: __[Fiche technique]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur]__
- :fontawesome-solid-file-lines: __[Guide de conception d'origine (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Note d'application matérielle (source GitHub)]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle (μForge)]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__
- :fontawesome-solid-cart-shopping: __[Acheter des kits de développement]__

</div>

---

## Caractéristiques et spécifications { #features-and-specs }

### Calcul et mémoire { #compute-and-memory }

- Trois cœurs Arm Cortex-M33 STAR-MC1 : HCPU et ACPU jusqu'à 240 MHz ; LCPU jusqu'à 96 MHz
- 3 744 Ko de SRAM sur puce
- Options de flash NOR intégrée au boîtier de 1 Mo à 8 Mo au total, selon la référence
- Options de PSRAM OPI et HPI intégrées au boîtier ; la PSRAM HPI est disponible jusqu'à 2 × 32 Mo, selon la référence
- Flash NOR ou NAND SPI externe via MPI3/MPI4 ; NAND SD, eMMC, cartes SD ou Wi-Fi externe via SDIO. Les combinaisons disponibles dépendent du choix des interfaces et de l'affectation des broches.

### Graphismes, affichage et IA { #graphics-display-and-ai }

- Accélérateur graphique 2D/2,5D ePicasso 2.0
- Moteur graphique vectoriel Vivante GCNanoUltraV
- Accélérateur de décompression graphique sans perte eZip 2.0
- Encodage et décodage JPEG/MJPEG matériels, avec recadrage et mise à l'échelle des images
- Accélérateur matriciel de réseaux de neurones pour charges TinyML
- Résolutions d'affichage jusqu'à 1280 × 800
- Prise en charge d'écrans MIPI DSI en mode commande et en mode vidéo
- Interfaces d'affichage SPI, DSPI, QSPI (y compris SPI pour papier électronique), MCU8080, JDI, RGB/DPI (RGB888 ou RGB565) et MIPI DSI
- Prend en charge deux écrans au contenu différent, en associant MIPI DSI à SPI, DSPI ou QSPI
- Adapté aux charges locales d'IA embarquée, d'apprentissage automatique et de fusion de capteurs

### Audio et connectivité sans fil { #audio-and-wireless-connectivity }

- Bluetooth 5.3 bimode
- Prise en charge de Bluetooth Classic et de Bluetooth LE
- Connectivité Wi-Fi externe via SDIO
- 2x ADC audio intégrés
- 2x DAC audio intégrés
- 2 interfaces PDM, chacune pouvant gérer jusqu'à deux microphones numériques ; le nombre d'interfaces n'est pas le nombre de microphones, et les connexions utilisables dépendent aussi du multiplexage des broches et du routage de la carte
- 3 interfaces I2S : I2S1 est en entrée seule ; I2S2 et I2S3 prennent en charge l'entrée et la sortie. Toutes fonctionnent en mode maître.
- USB 2.0 High-Speed en modes hôte et périphérique

### Intégration système { #system-integration }

- PMU intégrée avec deux sorties BUCK et trois sorties LDO
- Prise en charge optionnelle du PMIC SF30147C pour les arbres d'alimentation d'objets portables
- Le BGA256 convient aux conceptions de MCU haute densité associant affichage, stockage, audio et connectivité
- La SRAM sur puce, les options de PSRAM intégrée au boîtier et les interfaces d'affichage prennent en charge les conceptions gourmandes en graphismes et en mémoire

### Périphériques et E/S { #peripherals-and-ios }

**Note sur le nombre de GPIO :** le [guide des modèles de puces SiFli](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) actuel indique 94 GPIO HCPU et 66 GPIO LCPU (160 au total) pour les variantes SF32LB58x présentées. Une fiche technique SiFli antérieure les ventile en 94 GPIO HPSYS et 60 GPIO LPSYS plus 6 GPO AON (154 GPIO + 6 GPO AON). Les sources classent différemment ces six sorties permanentes ; les totaux par catégorie ne suffisent donc pas à établir un nombre de broches de boîtier différent ni que les 160 broches sont des GPIO librement affectables. L'[index des produits SiFli](https://wiki.sifli.com/silicon/index.html) renvoie vers la fiche technique V1.8.6 actuelle. Avant l'implantation du circuit imprimé, vérifiez dans cette fiche technique le nombre de GPIO et le tableau des fonctions de broches pour la référence commandable exacte. La [FAQ GPIO](https://wiki.sifli.com/en/faq/mcu/gpio.html) de SiFli traite PBR comme une banque d'E/S basse consommation distincte ; ne l'ajoutez pas au nombre HCPU/LCPU sauf si la source l'inclut expressément.

- 160 GPIO (94 HCPU + 66 LCPU, selon le guide des modèles de puces actuel)
- 2x interfaces CAN
- 2x interfaces SDIO
- Interface de débogage SWD
- 6 interfaces UART sélectionnables pour la sortie de débogage
- RTC, watchdog, réveil par GPIO, réveil par PBR, PWM, I2C, SPI et interfaces analogiques à usage général
- Boîtier BGA256 pour conceptions haute densité

### Alimentation et boîtier { #power-supply-and-package }

- Plage de tension d'alimentation : 1,71 V à 3,63 V
- Boîtier BGA256, 6,5 × 8,5 × 0,94 mm, pas de 0,4 mm
- Circuit imprimé HDI requis ; l'empilage 6HDI-2 est recommandé pour les conceptions de production

## Variantes de la famille { #family-variants }

Le guide des modèles de puces SiFli actuel liste six codes de commande SF32LB58x, tous en BGA256, avec les configurations de mémoire intégrée au boîtier indiquées ci-dessous. Confirmez le code de commande exact dans la fiche technique à jour et la liste des fournisseurs agréés (AVL), car les configurations et la disponibilité peuvent changer.

<div align="center"><em>Codes de commande du SF32LB58x et mémoire intégrée au boîtier</em></div>

<div align="center" markdown>

| Référence | Boîtier | Mémoire intégrée au boîtier |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 Mo de flash NOR de démarrage ; aucune mémoire intégrée sur MPI1 ou MPI2 |
| SF32LB581VCN36 | BGA256 | 1 Mo de flash NOR de démarrage + 8 Mo de PSRAM OPI sur MPI1 |
| SF32LB583VCC36 | BGA256 | 1 Mo de flash NOR de démarrage + 2 × 8 Mo de PSRAM OPI sur MPI1 et MPI2 |
| SF32LB585V5E56 | BGA256 | 4 Mo de flash NOR de démarrage + 4 Mo de flash NOR sur MPI1 + 32 Mo de PSRAM HPI sur MPI2 |
| SF32LB586VDD36 | BGA256 | 1 Mo de flash NOR de démarrage + 2 × 16 Mo de PSRAM HPI sur MPI1 et MPI2 |
| SF32LB587VEE56 | BGA256 | 4 Mo de flash NOR de démarrage + 2 × 32 Mo de PSRAM HPI sur MPI1 et MPI2 |

</div>

Lors du choix d'une variante, vérifiez d'abord ces points :

- Taille requise pour le tampon d'image, les ressources, l'audio et la mémoire des modèles
- Interface d'affichage et résolution cible
- Besoins en stockage externe et en interface Wi-Fi
- Capacité de fabrication du circuit imprimé pour une implantation HDI BGA256 au pas de 0,4 mm

## Parcours d'intégration { #integration-path }

Suivez cette séquence pour transformer une présélection SF32LB58x en conception validée :

1. **Valider le parcours de développement du firmware.** Commencez par le [guide de prise en main du SDK SiFli](../../getting-started/sifli/getting-started-sifli-sdk.md), puis utilisez le [flux de travail du SDK SiFli](../../develop/platforms/sifli-sdk/overview.md) et les [exemples](../../develop/examples/index.md) pour valider la configuration de l'affichage, des graphismes, de l'audio, du stockage et du Bluetooth.
2. **Choisir le mode d'intégration.** Évaluez le [SF32LB58-MOD](../modules/SF32LB58-MOD.md) pour réduire les risques liés à la conception RF, au boîtier BGA et au routage de la mémoire, ou utilisez le [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) pour une validation précoce au niveau de la carte.
3. **Concevoir et relire le matériel.** Utilisez le [guide de conception matérielle](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) local — y compris ses listes de contrôle du [schéma](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) et de l'[implantation du circuit imprimé](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md) — avant de valider le schéma ou l'implantation. Validez tôt les hypothèses sur le HDI BGA256 et le routage de la mémoire.
4. **Vérifier la source faisant autorité.** Confirmez la référence commandable et le boîtier exacts à l'aide de la [fiche technique], du [manuel utilisateur], du [Guide de conception d'origine (wiki.sifli.com)] et de la [Note d'application matérielle (source GitHub)] de SiFli.

<!-- uf-faq:start -->
## Questions fréquentes { #frequently-asked-questions }

**Quelles sont les principales caractéristiques du SF32LB58x ?**
Le SF32LB58x associe un CPU applicatif (2× Cortex-M33 @240 MHz) à un cœur basse consommation (Cortex-M33 @48/96 MHz, avec un cœur programmable par l'utilisateur), 3.7 MB de SRAM interne et Bluetooth bimode (BT classique + BLE). Graphismes : ePicasso 2.0 + Vivante GCNanoUltraV (vector). Boîtier : BGA256 (8.5 × 6.5 mm). USB 2.0 HS. Valeurs au niveau de la famille ; vérifiez la fiche technique de la référence exacte.

**Quelles interfaces d'affichage le SF32LB58x prend-il en charge ?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI. La disponibilité varie selon la référence et le boîtier.

**Quelle mémoire dans le boîtier le SF32LB58x propose-t-il ?**
Jusqu'à 32 MB + 32 MB de PSRAM et jusqu'à 8 MB de Flash NOR dans le boîtier, selon la référence.

**Quelle tension d'alimentation faut-il pour le SF32LB58x ?**
1.71–3.63 V, selon la variante. Confirmez la plage exacte dans la fiche technique.

**Par où commencer une conception matérielle avec le SF32LB58x ?**
Commencez par le [guide de conception matérielle du SF32LB58x](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) (schéma, alimentation, horloge/RF, routage PCB), puis utilisez les listes de contrôle de schéma et d'implantation avant de figer la carte.
<!-- uf-faq:end -->

## Produits associés { #related-products }

### Module { #module }

Le [SF32LB58-MOD](../modules/SF32LB58-MOD.md) regroupe la puce SF32LB586VDD36, son réseau d'adaptation RF, ainsi que de la PSRAM HPI intégrée au boîtier et des options de stockage dans un module prêt à intégrer. Utilisez-le lorsque le projet a besoin des capacités de la série 58 tout en limitant, dès les premières étapes du développement matériel, les risques liés à la RF, au boîtier BGA et au routage de la mémoire.

### Kits de développement { #development-kits }

Le [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) est le point de départ pour les décisions de conception portant sur l'arbre d'alimentation, l'affichage, le stockage, l'audio, la RF, l'USB et le SDIO.

### Produits de référence { #reference-products }

Les produits finaux SF32LB58x typiques comprennent les plateformes de montres haut de gamme, les IHM portables haute résolution, les tableaux de bord intelligents, les terminaux connectés portables et les appareils qui associent Bluetooth, affichage, audio, stockage et charges d'IA locale.
