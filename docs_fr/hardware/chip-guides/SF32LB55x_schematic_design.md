---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directives de conception du schéma pour le microcontrôleur SF32LB55x : système d'alimentation, mode de démarrage, génération d'horloge, RF, interfaces de stockage, interfaces d'affichage et tactiles, et interfaces de réveil/GPADC/fabrication."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB55x — Directives de conception du schéma { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. Directives de conception du schéma { #5-schematic-design-guidelines }

<div align="center"><em>Tableau 5-1 : Plan des sections du schéma</em></div>

<div align="center" markdown>

| Groupe | Sujets |
|:---|:---|
| Système d'alimentation | Rails du PMU, autres rails, condensateurs, POR/BOR/reset, inductance BUCK. |
| Mode de démarrage | Domaine de tension de la broche Mode, résistance de rappel, téléchargement, récupération et accès en production. |
| Génération d'horloge | Quartz 48 MHz, quartz 32,768 kHz, et revue des condensateurs d'adaptation. |
| RF | Adaptation RF, chemin d'antenne à 50 ohms, filtrage AVDD_BRF, et zone interdite RF. |
| Interfaces de stockage | OPI PSRAM, QSPI NOR/NAND/PSRAM, et SDIO eMMC/Micro SD. |
| Affichage et tactile | MIPI DSI, SPI/QSPI, MCU8080, JDI, interruption tactile, reset, rétroéclairage et alimentation du panneau. |
| Réveil, GPADC et fabrication | Sources et boutons de réveil, PWM du moteur, diviseurs GPADC, capteurs, audio Bluetooth, DBG-UART, SWD, flashage en production et étalonnage du quartz. |

</div>

### 5.1. Système d'alimentation { #51-power-system }

Le SF32LB551 en QFN68L ne possède pas les broches VDD2, BUCK2_VSW, BUCK2_VOUT, LDOVCC2_VOUT ni AVDD_DSI. Appliquez les tableaux d'alimentation et de condensateurs uniquement aux broches présentes sur le boîtier choisi. Les boîtiers BGA disposent de deux sorties BUCK ; BUCK2 accepte le mode BUCK ou LDO, le mode BUCK étant recommandé. QFN68L dispose d'une seule sortie BUCK.

<div align="center"><em>Tableau 5.1-1 : Broches d'alimentation du PMU</em></div>

<div align="center" markdown>

| Broches d'alimentation PMU | Tension minimale (V) | Tension typique (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VDD1 | 1,71 | 1,8 | 3,6 | 50 | Entrée d'alimentation VDD1 |
| VDD2 | 1,71 | 1,8 | 3,6 | 50 | Entrée d'alimentation VDD2 |
| BUCK1_VSW BUCK1_VOUT | - | 1,25 | - | 50 | Sortie VSW de BUCK1, connectée à l'inductance ; entrée d'alimentation interne 1, connectée à l'autre extrémité de l'inductance et à un condensateur externe |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0,9 | - | 50 | Sortie VSW de BUCK2, connectée à l'inductance ; entrée d'alimentation interne 2, connectée à l'autre extrémité de l'inductance et à un condensateur externe |
| LDO_VOUT1 | - | 1,1 | - | 50 | Sortie LDO 1, connectez un condensateur externe |
| LDO_VOUT2 | - | 0,9 | - | 20 | Sortie LDO 2, connectez un condensateur externe |
| VDD_RET | - | 0,9 | - | 1 | Sortie LDO RET, connectez un condensateur externe |
| VDD_RTC | - | 1,1 | - | 1 | Sortie LDO RTC, connectez un condensateur externe |

</div>

<div align="center"><em>Tableau 5.1-2 : Autres broches d'alimentation</em></div>

<div align="center" markdown>

| Autres broches d'alimentation | Tension minimale (V) | Tension typique (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AVDD_BRF | 1,71 | 1,8 | 3,63 | 30 | Entrée d'alimentation RF |
| AVDD_DSI | 1,71 | 1,8 | 2,75 | 20 | Entrée d'alimentation MIPI DSI ; l'alimentation doit être fournie |
| VDD_SIP | 1,71 | 1,8 | 1,98 | 30 | Entrée d'alimentation pour la puce mémoire co-packagée |
| AVDD33 | 3,15 | 3,3 | 3,63 | 50 | Entrée d'alimentation |
| VDDIOA | 1,71 | 1,8 | 3,63 | - | Entrée d'alimentation E/S PA |
| VDDIOB | 1,71 | 1,8 | 3,63 | - | Entrée d'alimentation E/S PB |

</div>

<div align="center"><em>Tableau 5.1-3 : Condensateurs d'alimentation requis</em></div>

<div align="center" markdown>

| Broches d'alimentation | Condensateur | Description détaillée |
| :--- | :--- | :--- |
| VDD1 VDD2 | 0,1 µF + 10 µF | Reliez VDD1 et VDD2 ensemble. Placez au moins deux condensateurs, 10 µF et 0,1 µF, près des broches |
| BUCK1_VSW BUCK1_VOUT | 0,1 µF + 4,7 µF | Placez au moins deux condensateurs, 4,7 µF et 0,1 µF, près des broches |
| BUCK2_VSW BUCK2_VOUT | 0,1 µF + 4,7 µF | Placez au moins deux condensateurs, 4,7 µF et 0,1 µF, près des broches |
| LDOVCC2_VOUT | 0,1 µF + 4,7 µF | Lorsque BUCK2 est configuré en mode BUCK, laissez cette broche flottante ; lorsque BUCK2 est configuré en mode LDO, laissez BUCK2_VSW flottante, reliez LDOVCC2_VOUT et BUCK2_VOUT ensemble, et placez au moins deux condensateurs, 4,7 µF et 0,1 µF, près des broches |
| LDO_VOUT1 | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| LDO_VOUT2 | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| VDD_RET | 0,47 µF | Placez au moins un condensateur de 0,47 µF près de la broche |
| VDD_RTC | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| VDD_SIP | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| SDMADC_VREF | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| AVDD_DSI | 0,1 µF + 10 µF | Placez au moins deux condensateurs, 10 µF et 0,1 µF, près des broches |
| AVDD33 | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| AVDD_BRF | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| VDDIOA VDDIOB | 2 × 0,1 µF + 2 × 1 µF | Placez au moins deux condensateurs, 1 µF et 0,1 µF, près de chaque broche |

</div>

Placez les condensateurs requis près des broches correspondantes, gardez les boucles de courant BUCK compactes et vérifiez le mode de fonctionnement BUCK/LDO avant le routage. Le circuit de réinitialisation et la temporisation POR/BOR devraient être vérifiés sur le matériel réel.

Les sources sont contradictoires : le tableau 3-3 du [guide d'application matérielle chinois de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) et le point 9 de la [liste de contrôle de schéma V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) indiquent 1 µF pour VDD_RTC, tandis que [C0313 sur le schéma de référence du guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) est marqué 0,1 µF. Les sources ne précisent pas les conditions d'application de chaque valeur. Avant la validation de la conception, confirmez auprès de SiFli la valeur requise pour le composant exact ; ne tranchez pas cette divergence par hypothèse.

Alimentez VDD1 et VDD2 simultanément ; le SF32LB551 n'a pas de VDD2. Reliez RSTN au domaine de tension d'entrée de VDD1 par une résistance de rappel et ajoutez 0,1 µF vers la masse. Le schéma de référence indique 1,8 V/3,3 V pour l'alimentation du rappel et utilise une résistance de 10 kΩ ; choisissez le niveau correspondant au domaine VDD1 de la conception. La Figure 5.1-1 montre un niveau POR de 1,50 V, un BOR configurable de 2,5 V à 1,5 V et un repère RSTN à 0,7 V. La mesure de la Figure 5.1-3 indique environ 700 µs entre la montée de l'alimentation et la libération du reset dans cet exemple ; ce n'est pas un délai garanti pour toutes les conceptions.

![Figure 5.1-1 : Minutage de mise sous/hors tension](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-1 : Minutage de mise sous/hors tension</em></div>

![Figure 5.1-2 : Circuit de reset](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-2 : Circuit de reset</em></div>

![Figure 5.1-3 : Mesure de la mise sous tension et du reset](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-3 : Mesure de la mise sous tension et du reset</em></div>

![Figure 5.1-4 : Circuit de référence DC-DC pour BGA](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-4 : Circuit de référence DC-DC pour BGA</em></div>

![Figure 5.1-5 : Circuit de référence DC-DC pour QFN](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-5 : Circuit de référence DC-DC pour QFN</em></div>

Conformément à la note d'application matérielle de SiFli, choisissez une inductance BUCK de 4,7 µH avec DCR ≤ 0,4 Ω et un courant de saturation Isat ≥ 450 mA.

### 5.2. Mode de démarrage { #52-boot-mode }

<div align="center"><em>Tableau 5.2-1 : Configuration du mode de démarrage</em></div>

<div align="center" markdown>

| Configuration du mode | Description détaillée |
| :--- | :--- |
| Niveau haut | Après la mise sous tension et le démarrage de la puce, elle entre en mode de téléchargement |
| Niveau bas | Après la mise sous tension et le démarrage de la puce, elle saute vers la zone du programme utilisateur pour démarrer |

</div>

Avec un niveau haut, la puce entre en mode de téléchargement après la mise sous tension ; avec un niveau bas, elle démarre le programme utilisateur. Assurez-vous que l'outillage de test en production peut imposer l'état de démarrage requis et que les broches de démarrage restent accessibles malgré le coffret du produit et les contraintes d'accès aux points de test.

La broche Mode appartient au même domaine de tension que VDDIOA. Maintenez son niveau stable avec une résistance externe de 10 kΩ reliée à l'alimentation correspondante ou à GND ; ne la laissez pas flottante et évitez les transitions involontaires. Les cartes de production doivent prévoir un point de test Mode pour le flashage du firmware et l'étalonnage du quartz ; un cavalier n'est pas nécessaire. Sur les cartes de test, réservez un cavalier afin de pouvoir récupérer une application bloquée en démarrant en mode téléchargement.

### 5.3. Génération d'horloge { #53-clock-generation }

<div align="center"><em>Tableau 5.3-1 : Exigences du quartz</em></div>

<div align="center" markdown>

| Quartz | Exigences du quartz | Description détaillée |
| :--- | :--- | :--- |
| 48 MHz | 7 pF≦CL≦12 pF (valeur recommandée : 8,8 pF), △F/F0≦±10 ppm, ESR≦30 Ω (valeur recommandée : 22 Ω) | La consommation de l'oscillateur à quartz dépend de CL et de l'ESR : plus leurs valeurs sont faibles, plus la consommation diminue. Pour l'optimiser, choisissez des composants dont les valeurs de CL et d'ESR sont plutôt faibles tout en restant dans la plage requise. Prévoyez des empreintes pour des condensateurs d'adaptation en parallèle près du quartz. Si CL<12 pF, il n'est pas nécessaire de monter de condensateur |
| 32,768 kHz | CL≦12,5 pF (valeur recommandée : 7 pF), △F/F0≦±20 ppm, ESR≦80 kΩ (valeur recommandée : 38 kΩ) | La consommation du quartz dépend de CL et de l'ESR : plus leurs valeurs sont faibles, plus la consommation diminue. Pour l'optimiser, choisissez des composants dont les valeurs de CL et d'ESR sont plutôt faibles tout en restant dans la plage requise. Prévoyez des empreintes pour des condensateurs d'adaptation en parallèle près du quartz. Si CL<12,5 pF, il n'est pas nécessaire de souder de condensateur |

</div>

Placez les deux quartz près de la puce, gardez leurs pistes courtes et symétriques, prévoyez les empreintes des condensateurs d'adaptation et protégez leurs réseaux des perturbations RF, BUCK, d'affichage et de moteur.

### 5.4. RF { #54-rf }

Le frontal RF du SF32LB55x intègre une technologie de filtrage et d'adaptation large bande. Maintenez l'impédance caractéristique de la piste RF du PCB à 50 Ω et prévoyez un réseau d'adaptation en π pour filtrer les émissions parasites et adapter l'antenne. Déterminez les valeurs finales des composants par des essais avec l'antenne et le PCB réels. Si l'antenne choisie est déjà adaptée, il n'est généralement pas nécessaire de monter des composants supplémentaires dans le réseau prévu.

Routez les pistes RF au-dessus d'un plan de référence de masse continu, placez le réseau d'adaptation au plus près de la puce et le filtre AVDD_BRF près de la broche. Éloignez de la zone RF les pistes DC-DC, VBAT, du quartz, de l'horloge haute vitesse, du SPI, du SDIO, de l'I2S et de l'UART.

Le circuit RF de référence place C0323 (15 pF/50 V) en série avec ANT et laisse les deux branches vers la masse C0318 et C0319 non montées (NF). Ces valeurs sont des exemples, pas des valeurs d'adaptation universelles.

![Figure 5.4-1 : Circuit de référence d'adaptation RF](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.4-1 : Circuit de référence d'adaptation RF</em></div>

### 5.5. Interfaces de stockage { #55-storage-interfaces }

Le SF32LB55x prend en charge les options OPI PSRAM, mémoire flash QSPI NOR/NAND et PSRAM, et SDIO eMMC ou Micro SD. Le choix du boîtier affecte les broches et interfaces disponibles, donc le choix du stockage doit être finalisé avant le verrouillage des broches et la revue de l'empilage PCB.

BGA145 dispose d'un canal OPI PSRAM externe, BGA169 de deux. Les tableaux 5.5-1 à 5.5-3 décrivent la configuration BGA145 et les deux mémoires BGA169, et non trois canaux sur un même boîtier. Les tableaux QSPI correspondent à QSPI2, QSPI3 et QSPI4. Les tableaux SDIO couvrent SDIO1 en modes 4/8 bits et SDIO2 en mode 4 bits.

QSPI2 est recommandé pour une PSRAM QSPI externe. Si un GPIO du HCPU commande l'alimentation d'une PSRAM OPI/QSPI externe, utilisez une broche HCPU de type PU : niveau haut pour activer, bas pour couper. Pour commuter VDD_SIP de la Flash interne, utilisez PA58 avec la même polarité. Demandez au FAE de SiFli d'évaluer l'espace Flash requis par les algorithmes d'accéléromètre et de fréquence cardiaque du LCPU avant de décider d'ajouter une NOR Flash sur QSPI4.

Les indications de direction des tableaux OPI d'origine ne sont pas cohérentes. Dans le [schéma de référence BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png), le [schéma BGA169 pour la mémoire 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png) et le [schéma pour la mémoire 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png), les broches MCU PA37/PA20 et PA07/PA08 pilotent respectivement CS# et CLK de la PSRAM externe. Les tableaux ci-dessous décrivent donc CS# et CLK du point de vue du MCU : sortie MCU, entrée PSRAM. Les schémas n'indiquent pas de direction fixe pour DQS/DM ; vérifiez sa fonction et sa direction dans la fiche technique de la PSRAM choisie.

Chaque PSRAM illustrée utilise 1,8 V, trois condensateurs de 0,1 µF et un de 1 µF/6,3 V. Les connexions RESET# et NC/CLK# laissées ouvertes concernent le composant représenté ; consultez la fiche technique du composant choisi sans les généraliser.

![Figure 5.5-1 : Circuit OPI PSRAM BGA145](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-1 : Circuit OPI PSRAM BGA145</em></div>

<div align="center"><em>Tableau 5.5-1 : OPI PSRAM en BGA145</em></div>

<div align="center" markdown>

| Signal PSRAM | Broche MCU | Description détaillée |
| :--- | :--- | :--- |
| CS# | PA37 | Sortie MCU ; entrée PSRAM |
| CLK | PA20 | Sortie MCU ; entrée PSRAM |
| DQS | PA35 | DQS/DM ; vérifier la fonction et la direction dans la fiche technique de la PSRAM choisie |
| DQ0 | PA28 | Entrée/sortie de données 0 |
| DQ1 | PA29 | Entrée/sortie de données 1 |
| DQ2 | PA30 | Entrée/sortie de données 2 |
| DQ3 | PA31 | Entrée/sortie de données 3 |
| DQ4 | PA34 | Entrée/sortie de données 4 |
| DQ5 | PA36 | Entrée/sortie de données 5 |
| DQ6 | PA38 | Entrée/sortie de données 6 |
| DQ7 | PA42 | Entrée/sortie de données 7 |

</div>

![Figure 5.5-2 : Circuit OPI PSRAM BGA169, mémoire 1](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-2 : Circuit OPI PSRAM BGA169, mémoire 1</em></div>

<div align="center"><em>Tableau 5.5-2 : OPI PSRAM en BGA169, mémoire 1</em></div>

<div align="center" markdown>

| Signal PSRAM | Broche MCU | Description détaillée |
| :--- | :--- | :--- |
| CS# | PA07 | Sortie MCU ; entrée PSRAM |
| CLK | PA08 | Sortie MCU ; entrée PSRAM |
| DQS | PA15 | DQS/DM ; vérifier la fonction et la direction dans la fiche technique de la PSRAM choisie |
| DQ0 | PA02 | Entrée/sortie de données 0 |
| DQ1 | PA04 | Entrée/sortie de données 1 |
| DQ2 | PA05 | Entrée/sortie de données 2 |
| DQ3 | PA06 | Entrée/sortie de données 3 |
| DQ4 | PA09 | Entrée/sortie de données 4 |
| DQ5 | PA11 | Entrée/sortie de données 5 |
| DQ6 | PA12 | Entrée/sortie de données 6 |
| DQ7 | PA13 | Entrée/sortie de données 7 |

</div>

![Figure 5.5-3 : Circuit OPI PSRAM BGA169, mémoire 2](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-3 : Circuit OPI PSRAM BGA169, mémoire 2</em></div>

<div align="center"><em>Tableau 5.5-3 : OPI PSRAM en BGA169, mémoire 2</em></div>

<div align="center" markdown>

| Signal PSRAM | Broche MCU | Description détaillée |
| :--- | :--- | :--- |
| CS# | PA07 | Sortie MCU ; entrée PSRAM |
| CLK | PA08 | Sortie MCU ; entrée PSRAM |
| DQS | PA26 | DQS/DM ; vérifier la fonction et la direction dans la fiche technique de la PSRAM choisie |
| DQ0 | PA18 | Entrée/sortie de données 0 |
| DQ1 | PA22 | Entrée/sortie de données 1 |
| DQ2 | PA24 | Entrée/sortie de données 2 |
| DQ3 | PA32 | Entrée/sortie de données 3 |
| DQ4 | PA33 | Entrée/sortie de données 4 |
| DQ5 | PA59 | Entrée/sortie de données 5 |
| DQ6 | PA62 | Entrée/sortie de données 6 |
| DQ7 | PA64 | Entrée/sortie de données 7 |

</div>

<div align="center"><em>Tableau 5.5-4 : QSPI2 : NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CS# | GPIO9 | PA61 | Sélection de puce, active à l'état bas |
| SO | GPIO7 | PA65 | Entrée de données (entrée/sortie de données 1) |
| WP# | GPIO6 | PA66 | Sortie de protection en écriture (entrée/sortie de données 2) |
| SI | GPIO8 | PA63 | Sortie de données (entrée/sortie de données 0) |
| SCLK | GPIO10 | PA60 | Sortie d'horloge série |
| Hold# | GPIO5 | PA68 | Sortie de données (entrée/sortie de données 3) |

</div>

<div align="center"><em>Tableau 5.5-5 : QSPI3 : NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CS# | GPIO16 | PA45 | Sélection de puce, active à l'état bas |
| SO | GPIO14 | PA49 | Entrée de données (entrée/sortie de données 1) |
| WP# | GPIO13 | PA51 | Sortie de protection en écriture (entrée/sortie de données 2) |
| SI | GPIO15 | PA47 | Sortie de données (entrée/sortie de données 0) |
| SCLK | GPIO17 | PA44 | Sortie d'horloge série |
| Hold# | GPIO12 | PA55 | Sortie de données (entrée/sortie de données 3) |

</div>

<div align="center"><em>Tableau 5.5-6 : QSPI4 : NOR/NAND Flash ou PSRAM</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CS# | - | PB33 | Sélection de puce, active à l'état bas |
| SO | - | PB36 | Entrée de données (entrée/sortie de données 1) |
| WP# | - | PB37 | Sortie de protection en écriture (entrée/sortie de données 2) |
| SI | - | PB35 | Sortie de données (entrée/sortie de données 0) |
| SCLK | - | PB32 | Sortie d'horloge série |
| Hold# | - | PB07 | Sortie de données (entrée/sortie de données 3) |

</div>

<div align="center"><em>Tableau 5.5-7 : SDIO1 : eMMC/Micro SD 4 bits</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Entrée d'horloge |
| CMD | GPIO9 | PA36 | Entrée de commande |
| DATA0 | GPIO8 | PA28 | Donnée 0 |
| DATA1 | GPIO7 | PA29 | Donnée 1 |
| DATA2 | GPIO6 | PA30 | Donnée 2 |
| DATA3 | GPIO5 | PA31 | Donnée 3 |

</div>

<div align="center"><em>Tableau 5.5-8 : SDIO1 : eMMC 8 bits</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Entrée d'horloge |
| CMD | GPIO9 | PA36 | Entrée de commande |
| DATA0 | GPIO8 | PA28 | Donnée 0 |
| DATA1 | GPIO7 | PA29 | Donnée 1 |
| DATA2 | GPIO6 | PA30 | Donnée 2 |
| DATA3 | GPIO5 | PA31 | Donnée 3 |
| DATA4 | GPIO15 | PA47 | Donnée 4 |
| DATA5 | GPIO14 | PA49 | Donnée 5 |
| DATA6 | GPIO13 | PA51 | Donnée 6 |
| DATA7 | GPIO12 | PA55 | Donnée 7 |

</div>

<div align="center"><em>Tableau 5.5-9 : SDIO2 : eMMC/Micro SD 4 bits</em></div>

<div align="center" markdown>

| Signal d'interface | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CLK | GPIO17 | PA44 | Entrée d'horloge |
| CMD | GPIO16 | PA45 | Entrée de commande |
| DATA0 | GPIO15 | PA47 | Donnée 0 |
| DATA1 | GPIO14 | PA49 | Donnée 1 |
| DATA2 | GPIO13 | PA51 | Donnée 2 |
| DATA3 | GPIO12 | PA55 | Donnée 3 |

</div>


### 5.6. Interfaces d'affichage et tactiles { #56-display-and-touch-interfaces }

Les choix d'affichage incluent MIPI DSI, SPI/QSPI, MCU8080 et JDI. Choisissez le panneau avant l'affectation des broches et le routage PCB, afin que la largeur d'interface, le cadencement, le contrôle d'alimentation, l'interruption tactile et la stratégie de rétroéclairage soient examinés ensemble.

Les interfaces JDI parallèle et série utilisent les groupes de signaux multiplexés côté PA (LCDC1) ou côté PB (LCDC2). Les tableaux ci-dessous ne donnent que le brochage PA/LCDC1. SiFli recommande l'interface PB/LCDC2. Le guide source ne fournit pas de tableau de brochage détaillé pour LCDC2 : vérifiez l'affectation réelle dans le tableau des fonctions multiplexées de la puce, sans la déduire des tableaux LCDC1.

<div align="center"><em>Tableau 5.6-1 : Interface d'affichage MIPI DSI</em></div>

<div align="center" markdown>

| Signal MIPI DSI | Broche BGA145/169 | Description |
| :--- | :--- | :--- |
| CLKP | DSI_CLKP | Signal d'horloge MIPI + |
| CLKN | DSI_CLKN | Signal d'horloge MIPI - |
| D0P | DSI_D0P | Voie de données MIPI 0+ |
| D0N | DSI_D0N | Voie de données MIPI 0- |
| D1P | DSI_D1P | Voie de données MIPI 1+ |
| D1N | DSI_D1N | Voie de données MIPI 1- |
| - | AVDD18_DSI | Entrée d'alimentation MIPI |
| - | DSI_REXT | Connectez une résistance externe de 10 K vers la masse |
| - | AVSS_DSI | Masse |
| TE | PA77 | Signal TE de synchronisation avec les trames du MCU |
| RESET | PB17 | Signal de reset pour le panneau d'affichage |

</div>

Notes d'affectation des broches d'affichage :

- TE peut utiliser un autre GPIO du groupe PA.
- Si le panneau prend en charge le signal TE via DSI, aucune broche TE distincte n'est nécessaire.
- RESET peut utiliser un autre GPIO du groupe PB.

<div align="center"><em>Tableau 5.6-2 : Interface d'affichage SPI/QSPI</em></div>

<div align="center" markdown>

| Signal SPI | GPIO QFN68 | Broche BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | PB33 | Signal de validation |
| WRX_SCL | GPIO23 | PB32 | Signal d'horloge |
| DCX | GPIO20 | PB36 | Signal de données/commande en mode SPI 4 fils ; donnée 1 en mode Quad-SPI |
| SDI_RDX | GPIO21 | PB35 | Signal d'entrée de données en mode SPI 3/4 fils ; donnée 0 en mode Quad-SPI |
| SDO | GPIO21 | PB35 | Signal de sortie de données en mode SPI 3/4 fils ; reliez-le à SDI_RDX |
| D[0] | GPIO19 | PB37 | Donnée 2 en mode Quad-SPI |
| D[1] | GPIO18 | PB07 | Donnée 3 en mode Quad-SPI |
| RESET | GPIO2 | PB17 | Signal de reset pour le panneau d'affichage |
| TE | GPIO3 | PB77 | Signal TE de synchronisation avec les trames du MCU |

</div>

Notes d'affectation des broches d'affichage :

- TE peut utiliser PA77 ou un autre GPIO du groupe PA configuré pour émuler ce signal.
- RESET peut utiliser n'importe quel GPIO. Pour un affichage permanent (AOD), SiFli recommande un GPIO du groupe PB.

<div align="center"><em>Tableau 5.6-3 : Interface d'affichage MCU8080</em></div>

<div align="center" markdown>

| Signal MCU8080 | GPIO QFN68 | Broche BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | - | Sélection de puce |
| WRX | GPIO23 | - | Signal de validation d'écriture pour écrire des données |
| DCX | GPIO20 | - | Sélection données/commande d'affichage |
| RDX | GPIO21 | - | Signal de validation des opérations de lecture du contrôleur d'affichage |
| D[0] | GPIO19 | - | Donnée 0 |
| D[1] | GPIO18 | - | Donnée 1 |
| D[2] | GPIO17 | - | Donnée 2 |
| D[3] | GPIO16 | - | Donnée 3 |
| D[4] | GPIO15 | - | Donnée 4 |
| D[5] | GPIO14 | - | Donnée 5 |
| D[6] | GPIO13 | - | Donnée 6 |
| D[7] | GPIO12 | - | Donnée 7 |
| RESET | GPIO2 | - | Reset |
| TE | GPIO3 | - | Signal TE de synchronisation avec les trames du MCU |

</div>

Notes d'affectation des broches d'affichage :

- TE peut utiliser PA77 ou un autre GPIO du groupe PA configuré pour émuler ce signal.
- RESET peut utiliser n'importe quel GPIO. Pour un affichage permanent (AOD), SiFli recommande un GPIO du groupe PB.

Le [guide d'application matérielle de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) désigne RDX comme un signal de lecture, mais termine sa description par « pour écrire des données ». Cette formulation contredit le nom RDX et le signal d'écriture WRX associé ; elle est donc traitée ici comme une erreur rédactionnelle de la source. La prise en charge de la lecture et les contraintes temporelles dépendent du contrôleur d'affichage choisi ; vérifiez-les dans sa fiche technique.

<div align="center"><em>Tableau 5.6-4 : Interface d'affichage parallèle JDI</em></div>

<div align="center" markdown>

| Signal JDI | Broche MCU (LCDC1) | Description détaillée |
| :--- | :--- | :--- |
| JDI_VCK | PA20 | Horloge de décalage pour le pilote vertical |
| JDI_VST | PA31 | Signal de démarrage pour le pilote vertical |
| JDI_XRST | PA34 | Signal de reset pour les pilotes horizontal et vertical |
| JDI_HCK | PA36 | Horloge de décalage pour le pilote horizontal |
| JDI_HST | PA38 | Signal de démarrage pour le pilote horizontal |
| JDI_ENB | PA42 | Signal de validation d'écriture pour la mémoire de pixels |
| JDI_R1 | PA49 | Données d'image rouge (pixels impairs) |
| JDI_R2 | PA51 | Données d'image rouge (pixels pairs) |
| JDI_G1 | PA55 | Données d'image verte (pixels impairs) |
| JDI_G2 | PA77 | Données d'image verte (pixels pairs) |
| JDI_B1 | PA78 | Données d'image bleue (pixels impairs) |
| JDI_B2 | PA79 | Données d'image bleue (pixels pairs) |
| JDI_XFRP | PA45 | Signal de commande du cristal liquide (pixel « allumé ») |
| JDI_VCOM/FRP | PA47 | Signal de commande d'électrode commune / signal de commande du cristal liquide (pixel « éteint ») |

</div>

<div align="center"><em>Tableau 5.6-5 : Interface d'affichage série JDI</em></div>

<div align="center" markdown>

| Signal JDI | Broche MCU (LCDC1) | Description détaillée |
| :--- | :--- | :--- |
| JDI_SCS | PA31 | Signal de sélection de puce |
| JDI_SCLK | PA20 | Signal d'horloge série |
| JDI_SO | PA34 | Signal de sortie de données série |
| JDI_DISP | PA36 | Signal de commutation d'affichage ON/OFF |
| JDI_EXTCOMIN | PA38 | Entrée de polarité d'inversion COM |

</div>

<div align="center"><em>Tableau 5.6-6 : Interfaces tactiles et de rétroéclairage</em></div>

<div align="center" markdown>

| Signaux tactiles et de rétroéclairage | GPIO QFN68 | Broche BGA145 | Broche BGA169 | Description détaillée |
| :--- | :--- | :--- | :--- | :--- |
| Interruption | GPIO1 | PA79 | PA79 | Signal d'interruption d'état tactile (capable de réveil) |
| I2C1_SCL | GPIO25 | PA10 | PA10 | Signal d'horloge I2C du panneau tactile |
| I2C1_SDA | GPIO24 | PA14 | PA14 | Signal de données I2C du panneau tactile |
| BL_PWM | GPIO0 | - | - | Signal de contrôle PWM du rétroéclairage |
| Réinitialisation | GPIO16 | PA00 | PA00 | Signal de réinitialisation tactile |
| Activation d'alimentation | GPIO26 | PA06 | PA03 | Signal d'activation d'alimentation du panneau tactile |

</div>

Pour BL_PWM, utilisez un GPIO disposant de la fonction GPTIM1_CHx et configurez un état de pull-up ou pull-down adapté afin d'éviter l'allumage inattendu du rétroéclairage au démarrage à froid.

### 5.7. Interfaces de réveil, GPADC et fabrication { #57-wake-gpadc-and-manufacturing-interfaces }

Les accès liés au réveil, aux mesures analogiques, au débogage et à la production doivent être planifiés en tenant compte du coffret et des gabarits de test. Les broches de réveil nécessitent des niveaux de repos définis et une protection ESD. Les diviseurs de tension GPADC doivent concilier temps de stabilisation et courant de fuite, et les accès au débogage et au téléchargement doivent rester disponibles pendant l'EVT et la production.

SF32LB55x possède quatre sources de réveil HCPU (WKUP_A0–WKUP_A3) et six LCPU (WKUP_B0–WKUP_B5). Chacune réveille son CPU ; seules les six sources LCPU permettent de sortir de Hibernate. Aucune de ces dix entrées ne doit rester flottante : ajoutez des résistances externes de rappel au niveau haut ou bas selon la fonction pour éviter les fuites en sommeil.

Dans le circuit de référence, KEY1 est relié à PB48 avec un rappel de 10 kΩ vers VDD_1V8, une protection ESD et un condensateur. Le réseau KEY2 montre des rappels de 10 kΩ, une protection ESD et des connexions sélectionnables par cavalier vers PA08, PA77 et PA78 ; C0004 est marqué NF (non monté). Il s'agit d'exemples de circuit, pas d'une liste de broches capables de réveiller le système : PA08 ne figure pas dans le Tableau 5.7-1. Choisissez dans ce tableau l'entrée réellement compatible avec le réveil et maintenez chaque entrée à un niveau de repos défini.

![Figure 5.7-1 : Circuit de référence du bouton de réveil](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.7-1 : Circuit de référence du bouton de réveil</em></div>

Utilisez un GPIO avec GPTIM1_CHx pour le PWM du moteur. Choisissez le comportement PU/PD adapté pour éviter une activation au démarrage à froid. Le circuit de référence utilise GPIO17 (PA44), un transistor côté masse et une résistance de rappel de grille de 1 MΩ, avec 3 V pour le moteur et une alimentation MCU séparée de 3,3 V.

![Figure 5.7-2 : Circuit de référence du moteur](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.7-2 : Circuit de référence du moteur</em></div>

<div align="center"><em>Tableau 5.7-1 : Sources d'interruption de réveil</em></div>

<div align="center" markdown>

| Source d'interruption | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| WKUP_A0 | GPIO3 | PA77 | Signal d'interruption HCPU 0 |
| WKUP_A1 | GPIO2 | PA78 | Signal d'interruption HCPU 1 |
| WKUP_A2 | GPIO1 | PA79 | Signal d'interruption HCPU 2 |
| WKUP_A3 | GPIO0 | PA80 | Signal d'interruption HCPU 3 |
| WKUP_B0 | GPIO43 | PB43 | Signal d'interruption LCPU 0 |
| WKUP_B1 | GPIO44 | PB44 | Signal d'interruption LCPU 1 |
| WKUP_B2 | GPIO45 | PB45 | Signal d'interruption LCPU 2 |
| WKUP_B3 | GPIO46 | PB46 | Signal d'interruption LCPU 3 |
| WKUP_B4 | GPIO47 | PB47 | Signal d'interruption LCPU 4 |
| WKUP_B5 | GPIO48 | PB48 | Signal d'interruption LCPU 5 |

</div>

Le guide d'application matérielle de SiFli décrit un GPADC à cinq canaux de 10 bits et une plage d'entrée de 0–0,9 V. Pour une conception de carte conservatrice, ne raccordez directement VIN que s'il est inférieur à 0,9 V ; au-delà, utilisez un diviseur pour maintenir VADC sous 0,9 V. Pour la batterie, la source conseille R1:R2 proche de 5:1 et des résistances de l'ordre du MΩ : réduire le courant allonge le temps d'établissement. Le circuit ajoute 0,1 µF entre VADC et la masse. Vérifiez la tension maximale de batterie et les tolérances avec `VADC = VIN × R2 / (R1 + R2)` ; les courants du tableau 5.7-2 sont donnés pour VIN = 4,2 V, pas pour toutes les conditions.

Divergence entre les sources : le [guide d'application matérielle OpenSiFli, de priorité supérieure](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) décrit un GPADC 10 bits à cinq canaux, avec une plage d'entrée de 0–0,9 V. Le point 2 de la [liste de contrôle de schéma V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) fixe un maximum de 1,0 V, sans préciser le nombre de canaux. La [fiche technique SF32LB55x V1.7.2, section 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) spécifie huit entrées asymétriques ou quatre paires différentielles, avec des plages respectives de 0–1,1 V et de −0,7 à 0,7 V ; son tableau de broches répertorie GPADC_CH0–CH7. Le [guide ADC actuel du SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) mappe également huit canaux (0–7) et indique 1,1 V comme tension d'échantillonnage maximale. SiFli n'a pas expliqué les différences de nombre de canaux et de limites de tension. Dans l'attente d'une clarification écrite, ce guide conserve comme base de conception la configuration à cinq canaux et la plage d'entrée de 0–0,9 V de la source prioritaire. Maintenez VADC sous 0,9 V ; ne considérez pas 1,0 V ou 1,1 V comme des limites de conception approuvées et confirmez les canaux disponibles pour la référence et le boîtier retenus.

![Figure 5.7-3 : Entrée GPADC et diviseur de référence](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.7-3 : Entrée GPADC et diviseur de référence</em></div>

<div align="center"><em>Tableau 5.7-2 : Exemples de diviseurs GPADC</em></div>

<div align="center" markdown>

| Combinaison de résistances | R1 (kΩ) ±1% | R2 (kΩ) ±1% | Temps d'établissement de la tension (ms) | Iq (µA) (VIN = 4,2 V) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1000 | 220 | 138 | 3,44 |
| 2 | 2000 | 430 | 250 | 1,73 |
| 3 | 3000 | 680 | 302 | 1,14 |
| 4 | 4300 | 910 | - | 0,81 |
| 5 | 5100 | 1100 | 420 | 0,68 |

</div>

Raccordez au LCPU les interfaces I2C/SPI, de commande et d'interruption de réveil des capteurs de fréquence cardiaque et d'accélération. Choisissez des DC-DC, LDO ou interrupteurs de charge à faible Iq pour couper leur alimentation selon les besoins.

L'audio Bluetooth externe communique par UART1 du HCPU. Adaptez les niveaux ou ajoutez un convertisseur ; coupez l'alimentation du convertisseur en même temps que celle du module pour éviter les fuites. Si le module reste alimenté en Standby et que sa commande d'alimentation est active à l'état bas, utilisez un GPIO LCPU avec comportement PD par défaut.

<div align="center"><em>Tableau 5.7-3 : Interface de débogage et de flashage</em></div>

<div align="center" markdown>

| Signal UART | QFN68 | BGA145/169 | Description détaillée |
| :--- | :--- | :--- | :--- |
| TXD1 | GPIO13 | PA19 | Signal RXD d'UART1 |
| RXD1 | GPIO14 | PA17 | Signal TXD d'UART1 |
| TXD2 | - | PA07 | Signal RXD d'UART2 |
| RXD2 | - | PA05 | Signal TXD d'UART2 |
| TXD3 | GPIO46 | PB46 | Signal RXD d'UART3, port de journalisation par défaut du système |
| RXD3 | GPIO45 | PB45 | Signal TXD d'UART3, port de journalisation par défaut du système |
| TXD4 | - | PB14 | Signal RXD d'UART4 |
| RXD4 | - | PB12 | Signal TXD d'UART4 |
| TXD5 | - | PB11 | Signal RXD d'UART5 |
| RXD5 | - | PB06 | Signal TXD d'UART5 |
| SWCLK | GPIO41 | PB31 | Signal d'horloge SWD |
| SWDIO | GPIO42 | PB34 | Signal de données SWD |

</div>

Ne laissez pas UART RXD flottant ; activez le rappel interne au niveau haut à l'initialisation du firmware. UART3 est le port de journalisation par défaut. SiFli fournit un programmateur autonome pour la production et l'étalonnage du quartz. Réservez au moins les points de test VBAT, GND, VDDIOA, VDDIOB, RSTN, Mode, SWDIO, SWCLK, RXD1, TXD1, RXD3 et TXD3. Le sous-ensemble du gabarit de production est VBAT, GND, boot_mode, VDDIOB, RXD3 et TXD3. VBAT et boot_mode sont les libellés du gabarit dans la source ; faites-les correspondre à l'alimentation réelle de la carte et à la connexion Mode avant le câblage.

Le dessin source relie VDD_1V8 à la broche 1 du connecteur (VTref), SWDIO à la broche 7 et SWCLK à la broche 9 par des résistances série de 22 Ω. Le [J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector) standard utilise également la broche 1 pour [VTref](https://kb.segger.com/VTref), l'entrée de référence de tension de la cible, et non une sortie d'alimentation de la sonde. Vérifiez l'orientation du connecteur et la compatibilité avec 1,8 V avant d'utiliser un câble standard.

![Figure 5.7-4 : Connecteur SWD source : vérifier l'adaptateur](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.7-4 : Connecteur SWD source : vérifier l'adaptateur</em></div>
