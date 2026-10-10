---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP : carte de développement SF32LB52x orientée objets portables, avec AMOLED, tactile, capteurs, audio, charge de batterie et mesure de consommation pour évaluer l'économie d'énergie au niveau système."
tags:
    - Matériel
    - Carte de développement
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## Présentation { #overview }

Le SF32LB52-DevKit-ULP est aussi connu sous les noms **立创黄山派**, **LCKFB-HSPI-SF32LB52-ULP** et **SF32LB52-ULP**. C'est une carte de développement compacte, à très basse consommation, pour objets portables, basée sur la famille SF32LB52x. Elle se positionne comme plateforme de prototypage pour montres connectées et bracelets d'activité, et non comme une simple carte d'éclatement de MCU.

Par rapport aux cartes LCD, Nano et Core-3p3, cette carte est plus proche d'un produit : elle réunit un module SF32LB52, un écran AMOLED, le tactile, un microphone, un amplificateur de haut-parleur, une LED RVB, un pilote de moteur vibrant, un capteur de mouvement, un capteur magnétique, un capteur de lumière ambiante, la charge de batterie et des cavaliers de mesure de puissance. Elle est donc particulièrement utile lorsque la question produit n'est pas seulement « le MCU fonctionne-t-il ? » mais « comment l'ensemble du système portable se comporte-t-il sur batterie ? »

Le [guide de la carte ULP][Article d'origine du wiki SiFli] de SiFli reste pour l'instant un simple espace réservé. Pour la configuration détaillée de la carte, utilisez le [guide de la carte de développement Huangshan Pi][Guide d'origine Huangshan Pi de SiFli] de SiFli, en chinois, qui documente la carte V1.0.0 ; les valeurs de composants citées ci-dessous s'appuient sur cette révision. Le [wiki matériel LCKFB] distinct ne précise pas sa révision de carte et cite plusieurs références de composants différentes. Considérez-les comme un écart possible entre révisions ou entre sources, et non comme des composants interchangeables, et vérifiez le marquage réel de la carte, le schéma et la nomenclature avant tout travail de conception.

**Note sur l'état de publication :** le guide SiFli V1.0.0 indique que la carte documentée était alors destinée à des tests internes et devait être révisée avant sa diffusion externe. Cette remarque ne vaut que pour cette révision de la source ; elle ne dit rien de l'état ni de la nomenclature des cartes ultérieures. Vérifiez la révision exacte de la carte et sa nomenclature.

La [page de la carte dans le SDK SiFli][Page de la carte ULP dans le SDK SiFli] liste cette carte sous la cible `sf32lb52-lchspi-ulp`. La page du SDK et la section « contenu du kit » du guide Huangshan Pi en chinois emploient `SF32LB52X-MOD-1-N16R8`, tandis que le [guide des modèles de modules][Guide des modèles de modules de SiFli] de SiFli et le libellé du tableau GPIO emploient `SF32LB52-MOD-1-N16R8`. Les sources n'expliquent pas cette différence de « X ». La cible du SDK est sans ambiguïté ; vérifiez le marquage et la nomenclature du module réellement monté plutôt que de supposer que les deux graphies de la référence désignent des matériels différents.

![Référence de montage de la carte portable SF32LB52-ULP](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — référence de montage de la carte portable</em></div>

![Schéma fonctionnel de la Huangshan Pi SF32LB52](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>Huangshan Pi SF32LB52 — schéma fonctionnel</em></div>

## Dénominations { #naming }

<div align="center"><em>Noms alternatifs de la carte</em></div>

<div align="center" markdown>

| Nom | Usage |
| :--- | :--- |
| SF32LB52-DevKit-ULP | Nom de la famille de cartes chez SiFli/OpenSiFli |
| SF32LB52-ULP | Nom court du matériel ou du produit |
| LCKFB-HSPI-SF32LB52-ULP | Nom de projet / de commande chez LCKFB |
| 立创黄山派 / 立创・黄山派 SF32LB52 | Nom de produit et de documentation en chinois |

</div>

Employez ces noms comme synonymes d'une même famille de cartes lorsque vous cherchez des documents matériels, des exemples, des pages de commande ou des contenus communautaires. Pour le schéma, le brochage ou la nomenclature, confirmez toujours la révision exacte de la carte et le jeu de documents du fabricant.

## Points forts de la carte { #board-highlights }

- Module SF32LB52-MOD-1-N16R8 basé sur le SF32LB52x
- Configuration de module standard avec SF32LB525UC6
- PSRAM OPI de 8 Mo, interface à 144 MHz
- Flash NOR QSPI de 128 Mb, 72 MHz en mode STR
- Quartz principal de 48 MHz et quartz RTC de 32,768 kHz
- Antenne imprimée sur la carte
- Écran AMOLED de 1,85 pouce, résolution 390 x 450
- Interface d'écran Quad-SPI avec prise en charge du tactile
- Microphone MEMS sur la carte
- Sortie audio analogique avec amplificateur de haut-parleur de classe D
- Connecteur externe pour haut-parleur de 3 W/4 Ω ou 2 W/8 Ω
- Interface UART USB Type-C via CH340N pour le téléchargement, le débogage et l'alimentation
- Signaux USB 2.0 FS disponibles sur le connecteur d'extension à 30 broches
- Emplacement de carte MicroSD via SPI
- Une touche de fonction et une touche d'alimentation/réinitialisation
- LED RVB SK6812MINI-HS (guide SiFli Huangshan Pi V1.0.0 ; la page LCKFB sans version indique WS2812B-2020)
- Circuit de pilotage de moteur vibrant avec plots externes à souder pour le moteur
- IMU 6 axes LSM6DS3TR-C
- Capteur magnétique 3 axes MMC5603NJ
- Capteur de lumière ambiante LTR-303ALS-01
- Chargeur de batterie et circuits de gestion d'énergie pour tester l'alimentation d'un objet portable
- Connecteur d'extension 2x15 broches au pas de 1,27 mm avec GPIO et prise en charge de la mesure de puissance

## Quand utiliser cette carte { #when-to-use-this-board }

Choisissez le SF32LB52-DevKit-ULP / 立创黄山派 lorsque l'objectif est de valider un système portable.

- Construire des prototypes de montres, de bracelets et d'objets portables riches en capteurs
- Évaluer le comportement d'une interface AMOLED sur la plateforme SF32LB52x
- Tester ensemble le tactile, la détection de mouvement, de champ magnétique et de lumière ambiante, l'audio, la vibration et la LED RVB
- Mesurer les courants de la batterie, du système et du rail 3,3 V au repos et en fonctionnement
- Valider des scénarios de réveil déclenchés par des touches, des capteurs, le tactile ou des minuteries du firmware
- Comparer le comportement énergétique proche du produit aux premières estimations de cartes de développement plus simples

Pour une carte d'évaluation généraliste centrée sur l'écran, utilisez le [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md). Pour des prototypes compacts à base de module à souder, utilisez le [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Pour un accès direct maximal aux broches lors de la mise en route initiale sur banc, utilisez le [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Configuration matérielle { #hardware-configuration }

<div align="center"><em>Résumé de la configuration matérielle</em></div>

<div align="center" markdown>

| Domaine | Configuration |
| :--- | :--- |
| Module principal | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | PSRAM OPI de 8 Mo, interface à 144 MHz |
| Flash | Flash NOR QSPI de 128 Mb, 72 MHz en mode STR |
| Écran | AMOLED de 1,85 pouce (ZC-A1D85W-010), 390 x 450, 800 cd/m², Quad-SPI |
| Pilote d'écran | CO5300AF-01 |
| CI d'alimentation de l'écran | BV6802W |
| Contrôleur tactile | FT6146-M00 |
| Microphone | Microphone MEMS sur la carte |
| Sortie haut-parleur | Amplificateur de classe D, connecteur haut-parleur externe GH-1.25mm |
| Stockage | Carte MicroSD via SPI |
| Capteur de mouvement | IMU 6 axes LSM6DS3TR-C |
| Capteur magnétique | Magnétomètre 3 axes MMC5603NJ |
| Capteur de lumière ambiante | LTR-303ALS-01 |
| USB-UART | CH340N via USB Type-C |
| Batterie | Batterie Li-ion externe via connecteur GH1.25mm |
| Chargeur | SY6103, tension de charge maximale 4,5 V ; courant constant par défaut 450 mA ; courant maximal 500 mA |
| Circuits de protection / d'alimentation | SY5320 (OVP), LP5240HVF (interrupteur de charge), ETA5055V330DS2F (LDO) |

</div>

**Liste de composants dépendant de la révision — à vérifier avant la conception :** le [guide Huangshan Pi][Guide d'origine Huangshan Pi de SiFli] de SiFli en version V1.0.0 indique le chargeur SY6103, l'OVP SY5320 et la LED RVB SK6812MINI-HS. Le [wiki matériel LCKFB] sans version cite à la place AW32001ECSR dans sa liste de fonctions et AW23001ECSR dans la section charge, ainsi que l'OVP LP5305AQVF et la LED RVB WS2812B-2020. Les sources ne précisent pas si ces différences reflètent une révision matérielle ou une documentation obsolète. N'utilisez les valeurs de SiFli V1.0.0 que pour cette référence documentée ; vérifiez le marquage réel de la carte, le schéma et la nomenclature avant de vous appuyer sur un comportement propre à un composant.

## Contenu du kit { #package-contents }

Le kit de la carte Huangshan Pi est documenté comme contenant :

- La carte principale
- La carte d'écran
- Une batterie
- Un haut-parleur

Vérifiez le contenu du kit acheté avant de planifier un montage de laboratoire, car les accessoires peuvent varier selon le vendeur ou le lot de production.

## Alimentation et batterie { #power-and-battery }

La carte prend en charge deux modes d'alimentation principaux :

- Alimentation par USB Type-C
- Fonctionnement autonome sur batterie

L'entrée batterie est prévue pour une seule cellule Li-ion avec un connecteur GH1.25mm dans l'ordre de broches direct. La configuration de charge documentée prend en charge un courant de charge maximal de 500 mA, avec 450 mA comme réglage par défaut du courant constant.

Si la carte fonctionne sans batterie et que VBAT est alimenté par une alimentation de laboratoire, la plage d'entrée documentée de VBAT est de 3,7 V à 4,7 V, avec 3,8 V recommandés pour les essais d'alimentation en tension normale. Les seuils du SF32LB52-MOD-1-N16R8 sont documentés à 3,58 V pour la mise sous tension et 3,48 V pour la mise hors tension.

Le guide matériel de LCKFB avertit que la fonction d'appui long sur la touche peut ne pas fonctionner lorsqu'aucune batterie n'est connectée. Vérifiez ce comportement sur la révision exacte de la carte et avec l'alimentation prévue.

## Cavaliers de mesure de puissance { #power-measurement-jumpers }

La carte expose des cavaliers pour mesurer le courant sur les principaux chemins d'alimentation.

<div align="center"><em>Correspondance des cavaliers de mesure de puissance</em></div>

<div align="center" markdown>

| Broches | Chemin | Objet |
| :--- | :--- | :--- |
| 5-6 | Chemin VBAT | Insérer un ampèremètre entre la batterie/le chargeur et le système en aval |
| 7-8 | Chemin VSYS | Insérer un ampèremètre dans le chemin VSYS |
| 11-12 | Chemin VCC_3V3 | Insérer un ampèremètre dans le rail principal 3,3 V |

</div>

En fonctionnement normal, les broches 5-6, 7-8 et 11-12 doivent être pontées par des cavaliers. Ne retirez un cavalier que lorsque vous insérez un ampèremètre ou un analyseur de puissance.

## Téléchargement et débogage { #download-and-debug }

Utilisez l'interface UART via USB Type-C pour le téléchargement du firmware, les journaux série et l'alimentation de la carte en développement courant.

Matériel nécessaire pour la première mise en route :

- Carte SF32LB52-DevKit-ULP / 立创黄山派
- Câble de données USB 2.0
- Ordinateur hôte sous Windows, Linux ou macOS

Matériel optionnel :

- Haut-parleur externe
- Carte TF
- Batterie Li-ion de 450 mAh ou plus
- Second câble USB si le débogage UART et le test USB natif sont nécessaires en même temps

Utilisez un véritable câble capable de transmettre des données. Les câbles de charge seule peuvent alimenter la carte mais n'offrent pas l'interface de données série.

## Cibles de compilation du SDK { #sdk-build-targets }

Le SDK de SiFli utilise le nom exact de carte cible `sf32lb52-lchspi-ulp` avec `scons --board=<board_name>`. Il s'agit d'un identifiant de cible de compilation du SDK, pas forcément du nom de produit imprimé sur une carte ou un module. Confirmez la cible à l'aide de l'[index des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) et du fichier [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) du SDK pour la révision du SDK utilisée.

## Principales affectations de signaux { #key-signal-assignments }

<div align="center"><em>Principales affectations de signaux</em></div>

<div align="center" markdown>

| Signal | Fonction |
| :--- | :--- |
| PA44 | VBUS_DET, détection de source de charge connectée |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | Interruption tactile |
| PA40 / PA39 | I2C1 des capteurs SCL / SDA selon le tableau d'affectation GPIO ; voir l'écart sur les broches du connecteur plus bas |
| PA38 | Commande de l'interrupteur VSYS vers VSYS_1 |
| PA37 / PA33 | I2C tactile SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | Touche HOME et réinitialisation par appui long (10 s) |
| PA32 | Données de la LED RVB |
| PA31 | Interruption capteur 1 |
| PA30 | Commande de l'interrupteur VSYS_1 vers HR3V3 |
| PA27 | Détection de carte SD |
| PA24, PA25, PA28, PA29 | Interface SPI1 MicroSD |
| PA20 | PWM du moteur vibrant |
| PA19 / PA18 | UART de débogage TXD / RXD |
| PA11 / PA10 | I2C0 du chargeur SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | Polarisation et entrée du microphone |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Sortie audio analogique |
| PA08..PA03, PA02, PA01, PA00 | QSPI de l'écran, TE, PWM du rétroéclairage et réinitialisation |
| PA15..PA12, PA16, PA17 | Signaux MPI2 / SD1, utilisés en interne par la flash du module N16R8 |

</div>

## Connecteur d'extension à 30 broches { #30-pin-expansion-header }

Le connecteur à 30 broches expose l'alimentation, l'USB, les signaux de capteurs, des signaux proches de l'écran, du stockage, de la vibration, du débogage, des touches et de la commande du chargeur.

<div align="center"><em>Affectation des signaux du connecteur d'extension à 30 broches</em></div>

<div align="center" markdown>

| Groupe de broches | Signaux | Remarques |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | 5 V provenant de l'USB lorsqu'il est connecté ; peut servir d'entrée 5 V en l'absence d'USB |
| 3-4 | GND | Masse |
| 5-6 | VBAT_S / VBAT | Pontées en fonctionnement normal ; ouvrir pour mesurer le courant de VBAT |
| 7-8 | VSYS_S / VSYS | Pontées en fonctionnement normal ; ouvrir pour mesurer le courant de VSYS |
| 9-10 | GND | Masse |
| 11-12 | VCC_3V3_S / VCC_3V3 | Pontées en fonctionnement normal ; ouvrir pour mesurer le courant du 3,3 V |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | Le tableau du connecteur de SiFli V1.0.0 les désigne comme I2C1 des capteurs SDA / SCL ; la broche 14 contredit le tableau d'affectation GPIO (voir ci-dessous) |
| 17 | PA32 | Données de la LED RVB, utilisable aussi comme GPIO |
| 18 | PA30 | Commande de l'alimentation des capteurs ; l'usage en GPIO peut modifier le comportement de PA39/PA40 |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | Broches SPI1/carte SD ; l'usage en extension entre en conflit avec la carte TF embarquée |
| 24 | PA20 | PWM de vibration ; l'usage en extension entre en conflit avec le pilote du moteur |
| 25 / 27 | PA19 / PA18 | UART de débogage TXD / RXD |
| 26 / 28 | PA34 / PA43 | Touche d'alimentation/réinitialisation et touche de fonction |
| 29 / 30 | PA11 / PA10 | I2C0 du chargeur SDA / SCL |

</div>

**Écart de brochage dans la source — à vérifier avant le câblage :** le tableau d'affectation GPIO de SiFli V1.0.0 attribue PA39 à l'I2C1_SDA des capteurs, tandis que le tableau du connecteur à 30 broches désigne la broche 14 par PB39 et la marque I2C1_SDA ; la broche 16 est listée PA40/I2C1_SCL. Les tableaux de LCKFB reprennent la différence PA39/PB39 sans indiquer de révision de carte et ne rapprochent pas les entrées. Considérez le plot MCU ou le routage de la broche 14 du connecteur comme non résolu : vérifiez le schéma et la nomenclature de la carte exacte et contrôlez la continuité avant de brancher un périphérique. Ne supposez pas que PA39 et PB39 sont interchangeables.

## Interface d'écran et tactile { #display-and-touch-interface }

La carte utilise un chemin d'affichage AMOLED et expose un jeu de signaux QSPI sur FPC à 22 broches. Le tableau de SiFli V1.0.0 marque les broches 5 à 10 comme NC ; le tableau ci-dessous comprend les 22 positions et nomme explicitement ces broches.

<div align="center"><em>Affectation des signaux du FPC QSPI à 22 broches pour l'écran et le tactile</em></div>

<div align="center" markdown>

| Broche | Signal | Fonction |
| :--- | :--- | :--- |
| 1 | VBAT | Sortie VBAT côté écran |
| 2 | PA01 | PWM du rétroéclairage pour l'usage TFT |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | Non connectée |
| 6 | NC | Non connectée |
| 7 | NC | Non connectée |
| 8 | NC | Non connectée |
| 9 | NC | Non connectée |
| 10 | NC | Non connectée |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | Réinitialisation du LCD |
| 13 | PA04 | Horloge QSPI/SPI |
| 14 | PB05 (tableau FPC de SiFli V1.0.0) | QSPI D0 / SPI SDI ; le tableau d'affectation GPIO distinct indique PA05 |
| 15 | PA03 | Sélection de puce QSPI/SPI |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | Sortie 3,3 V |
| 18 | PA41 | Interruption tactile |
| 19 | PA33 | I2C tactile SDA |
| 20 | PA37 | I2C tactile SCL |
| 21 | PA09 | Réinitialisation du tactile |
| 22 | GND | Masse |

</div>

**Écart de brochage dans la source — à vérifier avant de brancher un écran :** le tableau FPC à 22 broches de SiFli V1.0.0 attribue PB05 à la broche 14 du connecteur pour QSPI D0, alors que le tableau d'affectation GPIO distinct indique PA05 pour ce signal. Le tableau FPC de LCKFB indique lui aussi PB05, mais son tableau GPIO emploie PA05. Aucune source n'explique le lien entre les désignations du plot du module et du connecteur. Considérez la connexion électrique comme non résolue tant que vous n'avez pas vérifié le schéma et la nomenclature de la révision exacte ou contrôlé la continuité ; ne supposez pas que PA05 et PB05 sont interchangeables.

## Conseils pour la mesure de puissance { #power-measurement-guidance }

Pour des mesures significatives à très basse consommation :

- Mesurez VBAT, VSYS et VCC_3V3 séparément lorsque c'est possible.
- Laissez le cavalier correspondant ponté pour chaque rail que vous ne mesurez pas.
- Désactivez les charges évitables telles que les effets de la LED RVB, la journalisation de débogage, le rafraîchissement de l'écran et l'interrogation des capteurs avant de mesurer le courant de repos.
- Consignez la révision de la carte, le commit du firmware, la tension de la batterie ou de l'alimentation, la configuration des cavaliers et l'état des capteurs pour chaque mesure.
- Mesurez à la fois le courant de repos stable et le courant lors d'événements tels que le tactile, les interruptions de capteurs, l'activité Bluetooth, le réveil de l'écran et la vibration.

## Documents associés { #related-documents }

[Présentation de la puce SF32LB52x]: ../chips/SF32LB52x.md
[Guide de conception matérielle SF32LB52x]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Article d'origine du wiki SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[Guide d'origine Huangshan Pi de SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[Page de la carte ULP dans le SDK SiFli]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[Guide des modèles de modules de SiFli]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Page du projet LCKFB]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[wiki matériel LCKFB]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[Acheter des échantillons]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[Présentation de la puce SF32LB52x]__
- :fontawesome-solid-file-lines: __[Guide de conception matérielle SF32LB52x]__
- :fontawesome-brands-github: __[Article d'origine du wiki SiFli]__
- :fontawesome-solid-up-right-from-square: __[Page du projet LCKFB]__
- :fontawesome-solid-book: __[wiki matériel LCKFB]__
- :fontawesome-solid-cart-shopping: __[Acheter des échantillons]__

</div>
