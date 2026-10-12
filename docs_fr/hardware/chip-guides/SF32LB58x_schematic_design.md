---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directives de conception de schéma pour la MCU SF32LB58x : système d'alimentation, génération d'horloge, RF, interfaces utilisateur, stockage et connectivité et fabrication."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle du SF32LB58x — Directives de conception de schéma {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "Fait partie du Guide de conception matérielle du SF32LB58x"
    Cette page couvre la section 5, Directives de conception de schéma. Commencez par l'[aperçu du Guide de conception matérielle du SF32LB58x](SF32LB58x_hardware_design_guide.md) pour la sélection du composant et le flux de conception complet, poursuivez vers la [Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md), ou passez directement à [Conception et routage du PCB](SF32LB58x_pcb_layout.md).

## 5. Directives de conception de schéma {#5-schematic-design-guidelines}

Ce chapitre suit le flux de conception du schéma du SF32LB58x : il commence par le système minimal, puis traite l'alimentation, la génération d'horloge, la RF, les interfaces utilisateur, le stockage et la connectivité, et enfin la fabrication. Chaque sous-section part de l'intention de conception, puis détaille les exigences de circuit, les risques courants et les vérifications de sortie pour la plateforme SF32LB58x.

<div align="center"><em>Tableau 5-1 : Plan des sections du schéma</em></div>

<div align="center" markdown>

| Groupe | Décisions principales | Preuves de sortie |
|:---|:---|:---|
| Conception du système minimal | Variante et boîtier exacts, alimentation et réinitialisation, horloges, démarrage et stockage, débogage et récupération | Revue initiale de mise en service et plan de démarrage/récupération |
| Système d'alimentation | PMIC système, rails PMU de la puce, inductances BUCK, condensateurs LDO, réinitialisation, sources de réveil basse consommation | Arbre d'alimentation, réglages PMIC, mesures de rail, revue POR/BOR/réinitialisation |
| Génération d'horloge | Quartz 48 MHz et 32,768 kHz | Vérification des spécifications du quartz, plan des condensateurs d'adaptation, captures d'écran de disposition du quartz |
| RF | Adaptation RF et chemin d'antenne | Plan d'impédance, réseau d'adaptation RF, zone d'exclusion d'antenne, captures d'écran de disposition |
| Interfaces utilisateur | Affichage, tactile/rétroéclairage, audio, boutons, moteur, contrôle PBR | Schémas d'interface, affectations de broches, séquencement d'alimentation, revue analogique/audio |
| Stockage et connectivité | Mode de démarrage, MPI4, SD1/SD2, eMMC/SD NAND/carte SD, USB2.0 HS | Configuration de démarrage, plan d'alimentation du stockage, preuves de routage différentiel/haute vitesse |
| Fabrication | SWD, sorties de débogage UART, accès de test de production, liste de contrôle schéma/PCB | Dessin des points de test, chemin de récupération, plan de flashage/calibration de production |

</div>

### 5.1. Conception du système minimal {#51-minimum-system-design}

Considérez le système minimal comme le premier jalon de revue du schéma. Avant d'ajouter les périphériques propres au produit, confirmez la référence exacte et le boîtier, les rails d'alimentation et horloges nécessaires, le comportement de la réinitialisation, la configuration de démarrage et le stockage, ainsi qu'un chemin pratique de débogage et de récupération. Ces choix déterminent si la carte peut être alimentée, démarrer et être mise en service de manière fiable.

<div align="center"><em>Tableau 5.1-1 : Vérifications de conception du système minimal</em></div>

<div align="center" markdown>

| Bloc | Vérification de conception pour le SF32LB58x | Guide détaillé |
|:---|:---|:---|
| Composant et boîtier | Confirmez la référence et le boîtier exacts ; vérifiez que le brochage et la configuration mémoire intégrée permettent les interfaces prévues. | [Variantes et boîtiers](SF32LB58x_hardware_design_guide.md#32-variants) |
| Alimentation | Prévoyez les rails PMU et externes requis, les composants BUCK et le découplage local. | [Système d'alimentation](#51-power-system) |
| Horloges | Prévoyez le quartz principal de 48 MHz et le quartz RTC de 32,768 kHz, en respectant les conditions de charge et de placement spécifiées. | [Génération d'horloge](#52-clock-generation) |
| Réinitialisation | Réalisez le circuit RC externe de `RSTN` en le référant au domaine d'alimentation `PVDD1`. | [Séquence de mise sous tension et réinitialisation](#5115-power-up-sequencing-and-reset) |
| Mode de démarrage | Maintenez la broche `Mode` à un niveau stable avec une résistance de 10 kΩ ; prévoyez l'accès de test de production et un cavalier de récupération sur les cartes de test. | [Configuration de démarrage](#551-boot-configuration) |
| Stockage de démarrage | Choisissez une interface de stockage prise en charge et vérifiez le brochage, la tension d'E/S et l'alimentation selon le composant retenu. | [Stockage](#552-storage) |
| Accès à la mise en service | Prévoyez l'accès sur la carte à SWD et aux signaux UART de débogage nécessaires, ainsi que les références d'alimentation et de masse pour la sonde. | [Interface de débogage et de téléchargement](#561-debug-and-download-interface) |
| Fonctionnement basse consommation | Confirmez les sources de réveil et le contrôle d'alimentation externe requis par les modes veille prévus. | [Modes de fonctionnement et sources de réveil](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. Système d'alimentation {#51-power-system}

#### 5.2.1. Alimentation {#511-power-supply}

La série SF32LB58x intègre une PMU avec deux sorties BUCK et trois sorties LDO. Chaque sortie BUCK nécessite une inductance et un condensateur externes et doit être reliée à l'entrée d'alimentation interne correspondante ; les sorties LDO nécessitent également des condensateurs externes. Pour une montre connectée, le SF32LB58x peut être associé au PMIC SF30147C de SiFli, qui alimente à la fois le SF32LB58x et ses périphériques.

##### 5.2.1.1. Distribution d'alimentation PMIC SiFli {#5111-sifli-pmic-power-distribution}

Le SF30147C est un PMIC hautement intégré et efficace destiné aux produits portables à très basse consommation. Il intègre quatre LDO, chacun offrant une large plage de tensions d'entrée et de sortie et un courant de charge maximal de 100 mA. Il comprend également sept interrupteurs de charge à faible courant de fuite et à faible résistance à l'état passant : deux interrupteurs haute tension pour les périphériques alimentés directement par la batterie (par exemple, un amplificateur audio) et cinq interrupteurs basse tension pour les périphériques alimentés en 1,8 V. Le SF32LB58x commande le SF30147C au moyen d'un signal TWI émulé par deux GPIO.

<div align="center"><em>Tableau 5.2-1 : Distribution d'alimentation du SF30147C</em></div>

<div align="center" markdown>

| Broche d'alimentation SF30147C | Tension min (V) | Tension max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|
| VBUCK | 1,8 | 1,8 | 500 | Alimente les rails 1,8 V PVDD1, PVDD2, VDDIOA, VDDIOA2, VDDIOB, AVDD_BRF et AVDD18_DSI, ainsi que d'autres rails 1,8 V du SF32LB58x |
| LVSW1 | 1,8 | 1,8 | 100 | Alimentation logique du PA I2S Class-K |
| LVSW2 | 1,8 | 1,8 | 100 | Alimentation 1,8 V du G-sensor |
| LVSW3 | 1,8 | 1,8 | 150 | Alimentation 1,8 V du capteur de fréquence cardiaque |
| LVSW4 | 1,8 | 1,8 | 150 | Alimentation 1,8 V du LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Alimentation du cœur eMMC |
| LDO1 | 2,8 | 3,3 | 100 | Alimente les rails 3,3 V AVDD33_USB, AVDD33_ANA, AVDD33_AUD et AVDDIOA2, ainsi que d'autres rails 3,3 V du SF32LB58x |
| LDO2 | 2,8 | 3,3 | 100 | Alimentation eMMC ou SD NAND |
| LDO3 | 2,8 | 3,3 | 100 | Alimentation 3,3 V du LCD |
| LDO4 | 2,8 | 3,3 | 100 | Alimentation 3,3 V du capteur de fréquence cardiaque |
| HVSW1 | 2,8 | 5 | 150 | Alimentation du PA Class-K analogique |
| HVSW2 | 2,8 | 5 | 150 | Alimentation GPS |

</div>

Reportez-vous à la fiche technique de la puce SF30147C pour les détails complets.

##### 5.2.1.2. Exigences d'alimentation du SF32LB58x {#5112-sf32lb58x-power-requirements}

La série SF32LB58x intègre les spécifications d'alimentation PMU suivantes.

<div align="center"><em>Tableau 5.2-2 : Spécification d'alimentation PMU</em></div>

<div align="center" markdown>

| Broche d'alimentation PMU | Tension min (V) | Tension typ (V) | Tension max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1,71 | 1,8 | 3,6 | 100 | Entrée d'alimentation PVDD1 |
| PVDD2 | 1,71 | 1,8 | 3,6 | 50 | Entrée d'alimentation PVDD2 |
| BUCK1_LX / BUCK1_FB | - | 1,25 | - | 100 | La sortie BUCK1_LX se connecte à l'inductance et à l'entrée d'alimentation interne 1 ; l'autre extrémité de l'inductance se connecte à un condensateur externe |
| BUCK2_LX / BUCK2_FB | - | 0,9 | - | 50 | La sortie BUCK2_LX se connecte à l'inductance et à l'entrée d'alimentation interne 2 ; l'autre extrémité de l'inductance se connecte à un condensateur externe |
| LDO_VOUT1 | - | 1,1 | - | 100 | Sortie LDO, condensateur externe requis |
| VDD_RET | - | 0,9 | - | 1 | Sortie LDO RET, condensateur externe requis |
| VDD_RTC | - | 1,1 | - | 1 | Sortie LDO RTC, condensateur externe requis |
| MIC_BIAS | 1,4 | - | 2,8 | - | Sortie d'alimentation du microphone |

</div>

Les autres broches d'alimentation nécessitant une alimentation externe sont spécifiées ci-dessous.

<div align="center"><em>Tableau 5.2-3 : Autres spécifications d'alimentation</em></div>

<div align="center" markdown>

| Autre broche d'alimentation | Tension min (V) | Tension typ (V) | Tension max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | Entrée d'alimentation RF |
| AVDD18_DSI | 1,71 | 1,8 | 2,5 | 20 | Entrée d'alimentation MIPI DSI ; laisser la broche non connectée si l'interface est inutilisée |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrée d'alimentation analogique + PA RF |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Entrée d'alimentation audio analogique |
| AVDD33_USB | 3,15 | 3,3 | 3,45 | 50 | Entrée d'alimentation USB |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PA12-PA93 |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PA0-PA11 |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PB |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPA |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPB |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPC |
| GPADC_VREFP | - | - | - | - | Entrée de tension de référence GPADC ; condensateur uniquement, pas d'alimentation externe |
| AUD_VREF | - | - | - | - | Entrée de tension de référence audio ; condensateur uniquement, pas d'alimentation externe |

</div>

##### 5.2.1.3. Valeurs de condensateurs recommandées {#5113-recommended-capacitor-values}

<div align="center"><em>Tableau 5.2-4 : Condensateurs de découplage recommandés</em></div>

<div align="center" markdown>

| Broche d'alimentation | Condensateur | Description |
|:---|:---|:---|
| PVDD1 | 0,1 µF + 10 µF | Placez au moins 10 µF et 0,1 µF (2 condensateurs au total) près de la broche |
| PVDD2 | 0,1 µF + 10 µF | Placez au moins 10 µF et 0,1 µF (2 condensateurs au total) près de la broche |
| BUCK1_LX / BUCK1_FB | 0,1 µF + 4,7 µF | Placez au moins 4,7 µF et 0,1 µF (2 condensateurs au total) près de la broche |
| BUCK2_LX / BUCK2_FB | 0,1 µF + 4,7 µF | Placez au moins 4,7 µF et 0,1 µF (2 condensateurs au total) près de la broche |
| LDO_VOUT1 | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| VDD_RET | 0,47 µF | Placez au moins un condensateur de 0,47 µF près de la broche |
| VDD_RTC | 0,1 µF | Placez au moins un condensateur de 0,1 µF près de la broche |
| AVDD_BRF | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| AVDD18_DSI | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| AVDD33_ANA | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| AVDD33_AUD | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche |
| AVDD33_USB | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| MIC_BIAS | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| VDDIOA / VDDIOA2 / VDDIOB | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 µF | Placez au moins un condensateur de 1 µF près de la broche |

</div>

##### 5.2.1.4. Sélection de l'inductance BUCK {#5114-buck-inductor-selection}

!!! important "Paramètres clés de l'inductance d'alimentation"
    L (inductance) = 4,7 µH, DCR (résistance en courant continu) ≤ 0,4 Ω, Isat (courant de saturation) ≥ 500 mA

##### 5.2.1.5. Séquencement de mise sous tension et réinitialisation {#5115-power-up-sequencing-and-reset}

La série SF32LB58x dispose d'un POR (Power-On Reset) et d'un BOR (Brownout Reset) intégrés, et prend également en charge un signal de réinitialisation matérielle externe, RSTN.

Le signal de réinitialisation RSTN doit être tiré vers le domaine de tension d'entrée PVDD1, avec un condensateur de 0,1 µF vers la masse formant une réinitialisation retardée RC.

![Figure 5.2-1 : Séquence de mise sous/hors tension](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-1 : Séquence de mise sous/hors tension</em></div>

![Figure 5.2-2 : Circuit de réinitialisation](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-2 : Circuit de réinitialisation</em></div>

##### 5.2.1.6. Circuit d'alimentation typique {#5116-typical-power-circuit}

La série SF32LB58x peut utiliser le PMIC SF30147C de SiFli pour alimenter ses différents rails ; leur affectation est indiquée dans le tableau 5.2-1. La puce intègre également deux sorties BUCK et trois sorties LDO.

![Figure 5.2-3 : Schéma d'alimentation du SF30147C](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-3 : Schéma d'alimentation du SF30147C</em></div>

![Figure 5.2-4 : Circuit DC-DC (BUCK) intégré](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-4 : Circuit DC-DC (BUCK) intégré</em></div>

![Figure 5.2-5 : Circuit LDO intégré](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-5 : Circuit LDO intégré</em></div>

##### 5.2.1.7. Liste de contrôle de conception de l'alimentation {#5117-power-design-checklist}

- [ ] Confirmez que la plage d'alimentation PVDD1/PVDD2 (1,71 V–3,6 V) du modèle sélectionné correspond au schéma d'alimentation réel
- [ ] L'inductance BUCK respecte 4,7 µH, DCR ≤ 0,4 Ω, Isat ≥ 500 mA
- [ ] Les condensateurs de découplage PVDD1/PVDD2, BUCK1/2_LX/FB, LDO_VOUT1, VDD_RET et VDD_RTC utilisent les valeurs recommandées listées dans cette section
- [ ] En cas d'utilisation du SF30147C, l'allocation tension/courant des 7 commutateurs de charge correspond aux exigences des périphériques
- [ ] Le délai RC du circuit de réinitialisation RSTN répond aux exigences de temporisation de réinitialisation du composant

#### 5.2.2. Modes de fonctionnement et sources de réveil {#512-operating-modes-and-wake-sources}

Évaluez la stratégie basse consommation en tenant compte des fonctions PBR, des interruptions de réveil, des commutateurs d'alimentation du stockage, de l'alimentation des capteurs et des interrupteurs de charge du PMIC externe.

La série SF32LB58x fournit 6 interfaces PBR, avec les caractéristiques clés suivantes :

1. PBR0 passe de 0 à 1 pendant la mise sous tension, utile pour piloter certains commutateurs de charge externes (LSW) ; PBR1-PBR5 sont par défaut en sortie 0 ;
2. PBR0-PBR5 peuvent tous agir comme sorties à la fois en modes Standby et Hibernate ;
3. PBR0-PBR5 peuvent générer le signal LPTIM ;
4. PBR0-PBR5 peuvent générer un signal d'horloge 32 kHz ;
5. PBR0-PBR3 peuvent être configurées comme entrées pour recevoir des signaux de réveil. Lorsque la MCU est actif, ces entrées ne génèrent toutefois pas d'interruption.

Tous les GPIO de la série SF32LB58x peuvent réveiller le système en mode Light Sleep et Deep Sleep. En modes Standby et Hibernate, 16 sources d'interruption de réveil sont disponibles : six sur PA et dix sur PB.

<div align="center"><em>Tableau 5.2-5 : Connexions des sources d'interruption</em></div>

<div align="center" markdown>

| Source d'interruption | E/S | Description |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | Signal d'interruption 0 |
| WKUP_PIN1 | PB55 | Signal d'interruption 1 |
| WKUP_PIN2 | PB56 | Signal d'interruption 2 |
| WKUP_PIN3 | PB57 | Signal d'interruption 3 |
| WKUP_PIN4 | PB58 | Signal d'interruption 4 |
| WKUP_PIN5 | PB59 | Signal d'interruption 5 |
| WKUP_PIN6 | PA64 | Signal d'interruption 6 |
| WKUP_PIN7 | PA65 | Signal d'interruption 7 |
| WKUP_PIN8 | PA66 | Signal d'interruption 8 |
| WKUP_PIN9 | PA67 | Signal d'interruption 9 |
| WKUP_PIN10 | PA68 | Signal d'interruption 10 |
| WKUP_PIN11 | PA69 | Signal d'interruption 11 |
| WKUP_PIN12 | PBR0 | Signal d'interruption 12 |
| WKUP_PIN13 | PBR1 | Signal d'interruption 13 |
| WKUP_PIN14 | PBR2 | Signal d'interruption 14 |
| WKUP_PIN15 | PBR3 | Signal d'interruption 15 |

</div>

!!! note "Nombre de sources de réveil à confirmer auprès de SiFli"
    Le texte source indique 16 sources d'interruption capables de réveiller le système : 6 sur PA et 10 sur PB. Toutefois, le tableau répertorie 6 broches PB, 6 broches PA et 4 broches PBR. La source ne précise pas si les broches PBR sont incluses dans le décompte de PB. Confirmez le regroupement auprès de SiFli avant de vous fier aux totaux PA/PB.

### 5.3. Génération d'horloge {#52-clock-generation}

La série SF32LB58x nécessite 2 sources d'horloge externes : un quartz principal 48 MHz et un quartz RTC 32,768 kHz.

<div align="center"><em>Tableau 5.3-1 : Exigences de spécification du quartz</em></div>

<div align="center" markdown>

| Quartz | Spécification | Description |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω recommandé) | La consommation du quartz dépend de CL et de l'ESR : des valeurs plus faibles réduisent la consommation. Prévoyez des empreintes pour des condensateurs d'adaptation en parallèle près du quartz ; ils ne sont pas nécessaires lorsque CL < 12 pF. |
| 32,768 kHz | CL ≤ 12,5 pF (7 pF recommandé), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ recommandé) | La consommation du quartz dépend de CL et de l'ESR : des valeurs plus faibles réduisent la consommation. Prévoyez des empreintes pour des condensateurs d'adaptation en parallèle près du quartz ; ils ne sont pas nécessaires lorsque CL < 12,5 pF. |

</div>

<div align="center"><em>Tableau 5.3-2 : Modèles de quartz répertoriés dans l'AVL SiFli</em></div>

<div align="center" markdown>

| Modèle | Fournisseur | Paramètres |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 ~ 8 ppm, CL = 8,8 pF, ESR ≤ 22 Ω Max, TOPR = -30 ~ 85 °C, Boîtier 2016 (métrique) |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40 ~ 85 °C, Boîtier 3215 (métrique) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 ~ 10 ppm, CL = 8,8 pF, ESR ≤ 40 Ω Max, TOPR = -20 ~ 75 °C, Boîtier 2016 (métrique) |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40 ~ 85 °C, Boîtier 3215 (métrique) |

</div>

!!! note
    La recommandation générale pour le quartz de 48 MHz fixe l'ESR à ≤ 30 Ω (22 Ω recommandé), tandis que le modèle SX20Y048000B31T-8.8 indiqué est donné pour un ESR ≤ 40 Ω. La source fournit les deux valeurs sans expliquer cet écart ; confirmez auprès de SiFli que ce modèle convient avant de l'utiliser. Son ESR plus élevé peut aussi accroître la consommation statique. Lors du routage du PCB, retirez le cuivre GND de la couche 2 directement sous le quartz pour réduire la capacité de charge parasite sur le signal d'horloge.

Pour plus de détails sur les composants répertoriés, consultez la [Liste des fournisseurs approuvés SiFli][SiFli Approved Vendor List (AVL)].

### 5.4. RF {#53-rf}

Le front-end RF du SF32LB58x utilise une technologie de filtre d'adaptation large bande intégrée sur puce, de sorte que seule une piste PCB RF à impédance contrôlée de 50 Ω est nécessaire. Un réseau d'adaptation π pour le filtrage des émissions parasites et l'adaptation d'antenne doit être réservé dans la conception.

![Figure 5.4-1 : Schéma du circuit RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.4-1 : Schéma du circuit RF</em></div>

!!! note "Remarque"
    Les valeurs des composants du réseau d'adaptation doivent être déterminées par des tests effectués sur l'antenne réelle et l'implantation réelle du PCB.

### 5.5. Interfaces utilisateur {#54-user-interfaces}

#### 5.5.1. Affichage {#541-display}

##### 5.5.1.1. Interface d'affichage MIPI DSI {#5411-mipi-dsi-display-interface}

La série SF32LB58x prend en charge une interface d'affichage MIPI DSI à deux voies.

<div align="center"><em>Tableau 5.5-1 : Connexions de signaux MIPI-DSI</em></div>

<div align="center" markdown>

| Signal MIPI DSI | E/S | Description |
|:---|:---|:---|
| CLKP | DSI_CLKP | Signal d'horloge MIPI + |
| CLKN | DSI_CLKN | Signal d'horloge MIPI - |
| D0P | DSI_D0P | Voie de données MIPI 0 + |
| D0N | DSI_D0N | Voie de données MIPI 0 - |
| D1P | DSI_D1P | Voie de données MIPI 1 + |
| D1N | DSI_D1N | Voie de données MIPI 1 - |
| - | AVDD18_DSI | Entrée d'alimentation MIPI |
| - | DSI_REXT | Résistance externe de 10 kΩ vers la masse |
| - | AVSS_DSI | Masse |
| TE | PB2 | Signal TE de synchronisation de trame vers la MCU |
| RESET | PB5 | Signal de réinitialisation de l'affichage |

</div>

##### 5.5.1.2. Interface d'affichage SPI/QSPI {#5412-spiqspi-display-interface}

La série SF32LB58x prend en charge les interfaces SPI à 3 ou 4 fils et Quad-SPI pour connecter un écran LCD. HCPU utilise LCDC1 sur PA ; LCPU utilise LCDC2 sur PB.

<div align="center"><em>Tableau 5.5-2 : Connexions de signaux SPI/QSPI</em></div>

<div align="center" markdown>

| Signal SPI | E/S (LCDC1) | E/S (LCDC2) | Description |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | Activation de la puce |
| WRX_SCL | PA46 | PB10 | Signal d'horloge |
| DCX | PA48 | PB03 | Signal données/commande en mode SPI 4 fils ; données 1 en mode Quad-SPI |
| SDI_RDX | PA50 | PB09 | Entrée de données en mode SPI à 3 ou 4 fils ; donnée 0 en mode Quad-SPI |
| SDO | PA50 | PB09 | Sortie de données en mode SPI à 3 ou 4 fils ; à relier à SDI_RDX |
| D[0] | PA47 | PB04 | Données 2 en mode Quad-SPI |
| D[1] | PA45 | PB06 | Données 3 en mode Quad-SPI |
| REST | PA74 | PB05 | Signal de réinitialisation de l'affichage |
| TE | PA43 | PB02 | Signal TE de synchronisation de trame vers la MCU |

</div>

##### 5.5.1.3. Interface d'affichage MCU8080 {#5413-mcu8080-display-interface}

La série SF32LB58x prend en charge une interface MCU8080 pour connecter un panneau LCD.

<div align="center"><em>Tableau 5.5-3 : Connexions de signaux MCU8080</em></div>

<div align="center" markdown>

| Signal MCU8080 | E/S | Description |
|:---|:---|:---|
| CSX | PA44 | Sélection de puce |
| WRX | PA46 | Signal de commande d'écriture pour les données d'écriture |
| DCX | PA48 | Sélection données d'affichage / commande |
| RDX | PA50 | Signal de strobe de lecture |
| D[0] | PA47 | Données 0 |
| D[1] | PA45 | Données 1 |
| D[2] | PA26 | Données 2 |
| D[3] | PA27 | Données 3 |
| D[4] | PA42 | Données 4 |
| D[5] | PA51 | Données 5 |
| D[6] | PA52 | Données 6 |
| D[7] | PA58 | Données 7 |
| REST | PA24 | Réinitialisation |
| TE | PA43 | Signal TE de synchronisation de trame vers la MCU |

</div>

!!! note "Description du signal RDX"
    La source décrit RDX comme un « signal de strobe de lecture pour les données en écriture », ce qui est contradictoire. Le tableau le présente comme un signal de strobe de lecture ; confirmez auprès de SiFli la fonction attendue avant publication.

##### 5.5.1.4. Interface d'affichage DPI {#5414-dpi-display-interface}

La série SF32LB58x prend en charge une interface DPI pour connecter un panneau LCD.

<div align="center"><em>Tableau 5.5-4 : Connexions de signaux DPI</em></div>

<div align="center" markdown>

| Signal DPI | E/S | Description |
|:---|:---|:---|
| CLK | PA12 | Signal d'horloge |
| DE | PA13 | Signal de validation de données |
| HSYNC | PA14 | Signal de synchronisation horizontale |
| VSYNC | PA15 | Signal de synchronisation verticale |
| SD | PA18 | Contrôle d'arrêt de l'affichage |
| CM | PA19 | Commute entre le mode Normal Color et Reduced Color |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | Données de pixel (rouge R0-R7) |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | Données de pixel (vert G0-G7) |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | Données de pixel (bleu B0-B7) |

</div>

##### 5.5.1.5. Interface d'affichage JDI {#5415-jdi-display-interface}

La série SF32LB58x prend en charge à la fois les interfaces JDI parallèle et série pour connecter un panneau LCD, multiplexées sur les signaux LCDC1 (PA) ou LCDC2 (PB) — LCDC2 (PB) est recommandé.

<div align="center"><em>Tableau 5.5-5 : Connexions de signaux JDI parallèle</em></div>

<div align="center" markdown>

| Signal JDI | E/S (LCDC1) | E/S (LCDC2) | Description |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | Horloge de décalage pour le pilote vertical |
| JDI_VST | PA22 | PB19 | Signal de démarrage pour le pilote vertical |
| JDI_XRST | PA25 | PB16 | Signal de réinitialisation pour les pilotes horizontal et vertical |
| JDI_HCK | PA43 | PB05 | Horloge de décalage pour le pilote horizontal |
| JDI_HST | PA44 | PB10 | Signal de démarrage pour le pilote horizontal |
| JDI_ENB | PA45 | PB12 | Signal de validation d'écriture pour la mémoire de pixels |
| JDI_R1 | PA46 | PB09 | Données d'image rouge (pixels impairs) |
| JDI_R2 | PA47 | PB06 | Données d'image rouge (pixels pairs) |
| JDI_G1 | PA48 | PB08 | Données d'image verte (pixels impairs) |
| JDI_G2 | PA50 | PB04 | Données d'image verte (pixels pairs) |
| JDI_B1 | PA65 | PB02 | Données d'image bleue (pixels impairs) |
| JDI_B2 | PA67 | PB03 | Données d'image bleue (pixels pairs) |
| JDI_XFRP | PBR1 | PBR1 | Signal de pilotage des cristaux liquides (pixel « allumé ») |
| JDI_VCOM/FRP | PBR2 | PBR2 | Signal de pilotage de l'électrode commune / signal de pilotage des cristaux liquides (pixel « éteint ») |

</div>

<div align="center"><em>Tableau 5.5-6 : Connexions de signaux JDI série</em></div>

<div align="center" markdown>

| Signal JDI | E/S (LCDC1) | E/S (LCDC2) | Description |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | Signal de sélection de puce |
| JDI_SCLK | PA84 | PB02 | Signal d'horloge série |
| JDI_SO | PA86 | PB06 | Signal de sortie de données série |
| JDI_DISP | PA90 | PB04 | Signal de commutation Marche/Arrêt de l'affichage |
| JDI_EXTCOMIN | PA91 | PB05 | Entrée de polarité d'inversion COM |

</div>

#### 5.5.2. Tactile et rétroéclairage {#542-touch-and-backlight}

La série SF32LB58x prend en charge une interface I2C pour le contrôleur tactile, une entrée d'interruption signalant l'état tactile et un signal PWM pour commander l'activation et la luminosité du pilote de rétroéclairage.

<div align="center"><em>Tableau 5.5-7 : Connexions tactile et rétroéclairage</em></div>

<div align="center" markdown>

| Signal tactile/rétroéclairage | E/S | Description |
|:---|:---|:---|
| Interruption | PA69 | Interruption d'état tactile pouvant réveiller le système |
| I2C1_SCL | PA17 | Horloge I2C du panneau tactile |
| I2C1_SDA | PA16 | Données I2C du panneau tactile |
| BL_PWM | PB44 | Signal de contrôle PWM du rétroéclairage |
| Réinitialisation | PA15 | Signal de réinitialisation de l'écran tactile |
| Activation de l'alimentation | PA12 | Signal d'activation de l'alimentation de l'écran tactile |

</div>

#### 5.5.3. Audio {#543-audio}

La série SF32LB58x propose plusieurs interfaces audio, avec les caractéristiques suivantes :

1. La série SF32LB58x prend en charge trois interfaces I2S. I2S1 est exclusivement en entrée, tandis que I2S2 et I2S3 prennent en charge l'entrée et la sortie. Les trois fonctionnent uniquement en mode maître ; le mode esclave n'est pas pris en charge.
2. I2S1 est recommandé pour connecter un microphone I2S.
3. I2S2 est recommandé pour connecter un DAC audio.
4. I2S3 est recommandé pour connecter un codec audio.
5. Deux interfaces d'entrée PDM sont disponibles pour les microphones numériques. Chaque interface PDM peut connecter jusqu'à deux microphones numériques ; le nombre d'interfaces ne correspond donc pas au nombre de microphones.
6. Deux entrées pour microphones analogiques sont prises en charge. Chacune nécessite un condensateur de liaison en série d'au moins 2,2 µF pour bloquer la composante continue ; la sortie MIC_BIAS du SF32LB58x les alimente.
7. Un amplificateur de puissance audio analogique externe peut être connecté. Acheminez les pistes P/N de chaque canal DAC en paire différentielle, avec un blindage relié à la masse, et maintenez la capacité parasite sous 10 pF. La source donne des limites contradictoires pour la longueur des pistes ; voir la note ci-dessous.
8. Des écouteurs analogiques stéréo peuvent être connectés.

!!! note "Divergence de longueur des pistes DAC dans la source"
    La note d'application matérielle de SiFli donne deux limites différentes pour la longueur des pistes DAC : le résumé audio indique `<2 cm`, tandis que la section détaillée de routage du PCB du DAC indique `<2 mm`. La source n'explique pas cet écart. Confirmez auprès de SiFli la limite applicable avant de finaliser le PCB ; ne supposez pas qu'une valeur remplace l'autre.

![Figure 5.5-1 : Circuit d'entrée audio analogique différentielle](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-1 : Circuit d'entrée audio analogique différentielle</em></div>

![Figure 5.5-2 : Circuit d'entrée audio analogique asymétrique](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-2 : Circuit d'entrée audio analogique asymétrique</em></div>

![Figure 5.5-3 : Circuit de sortie audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-3 : Circuit de sortie audio analogique</em></div>

![Figure 5.5-4 : Circuit du microphone analogique](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-4 : Circuit du microphone analogique</em></div>

![Figure 5.5-5 : Circuit casque stéréo](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-5 : Circuit casque stéréo</em></div>

![Figure 5.5-6 : Circuit du PA audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-6 : Circuit du PA audio analogique</em></div>

![Figure 5.5-7 : Circuit du PA audio I2S](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-7 : Circuit du PA audio I2S</em></div>

<div align="center"><em>Tableau 5.5-8 : Connexions de signaux audio</em></div>

<div align="center" markdown>

| Signal audio | E/S | Description |
|:---|:---|:---|
| I2S1_LRCK | PA14 | Horloge de trame I2S1 |
| I2S1_SDI | PA18 | Entrée de données I2S1 |
| I2S1_BCK | PA23 | Horloge de bit I2S1 |
| I2S2_LRCK | PA84 | Horloge de trame I2S2 |
| I2S2_SDI | PA86 | Entrée de données I2S2 |
| I2S2_SDO | PA82 | Sortie de données I2S2 |
| I2S2_BCK | PA91 | Horloge de bit I2S2 |
| I2S3_LRCK | PB31 | Horloge de trame I2S3 |
| I2S3_SDI | PB27 | Entrée de données I2S3 |
| I2S3_SDO | PB24 | Sortie de données I2S3 |
| I2S3_BCK | PB30 | Horloge de bit I2S3 |
| I2S3_MCLK | PB34 | Horloge maître I2S3 |
| PDM1_CLK | PA23 | Horloge PDM1 |
| PDM1_DATA | PA18 | Données PDM1 |
| PDM2_CLK | PA25 | Horloge PDM2 |
| PDM2_DATA | PA22 | Données PDM2 |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | Entrée analogique 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | Entrée analogique 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | Sortie analogique 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | Sortie analogique 2P/2N |

</div>

!!! note "Remarque sur le multiplexage des broches"
    I2S1_SDI partage PA18 avec PDM1_DATA, et I2S1_BCK partage PA23 avec PDM1_CLK. I2S1_LRCK utilise PA14, tandis que PDM2_DATA utilise PA22. Confirmez la fonction audio active dans la configuration de l'interface logicielle avant de finaliser le schéma.

L'entrée microphone analogique du SF32LB58x accepte les modes asymétrique et différentiel ; dans les deux cas, un condensateur série de 2,2 µF est nécessaire. Les signaux AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N se raccordent côté SF32LB58x. À la sortie, AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N sont des sorties du SF32LB58x et peuvent alimenter l'entrée d'un amplificateur pour casque stéréo ou d'un amplificateur audio analogique externe. Les deux types d'amplificateurs se configurent via I2C3.

#### 5.5.4. Boutons {#544-buttons}

##### 5.5.4.1. Bouton d'alimentation et de réinitialisation par appui long {#5441-power-and-long-press-reset-button}

PB54 est le signal de touche d'alimentation recommandé pour la série SF32LB58x, combinant une fonction marche/arrêt par appui court et une fonction de réinitialisation par appui long sur un seul bouton. La conception est active à l'état haut ; maintenir le bouton enfoncé plus de 10 secondes déclenche une réinitialisation automatique de la puce.

![Figure 5.5-8 : Circuit du bouton d'alimentation/réinitialisation](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-8 : Circuit du bouton d'alimentation/réinitialisation</em></div>

##### 5.5.4.2. Bouton fonction ou encodeur rotatif {#5442-function-button-or-rotary-encoder}

La série SF32LB58x prend en charge les entrées d'un bouton de fonction et d'un encodeur rotatif ; toutes deux nécessitent une résistance de tirage au niveau haut. Elle prend également en charge un capteur de suivi optique, pour lequel l'interface I2C4 est recommandée.

![Figure 5.5-9 : Circuit du bouton fonction / encodeur rotatif](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-9 : Circuit du bouton fonction / encodeur rotatif</em></div>

<div align="center"><em>Tableau 5.5-9 : Signaux du capteur de suivi optique</em></div>

<div align="center" markdown>

| Signal I2C | E/S | Description |
|:---|:---|:---|
| INT | PA58 | Entrée d'interruption du capteur de suivi optique |
| SDA | PA59 | Données I2C du capteur de suivi optique |
| SCL | PA60 | Horloge I2C du capteur de suivi optique |

</div>

#### 5.5.5. Moteur de vibration {#545-vibration-motor}

La série SF32LB58x prend en charge plusieurs sorties PWM, pouvant piloter un moteur de vibration.

!!! important
    Si le logiciel active la macro de mise à l'échelle de fréquence du HCPU `#define BSP_PM_FREQ_SCALING 1`, l'horloge du HCPU ralentit lorsqu'il entre dans le thread inactif, ce qui modifie la fréquence PWM sur les broches PA correspondantes. Il est donc recommandé de sortir le signal PWM sur une broche PB.

![Figure 5.5-10 : Circuit du moteur de vibration](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-10 : Circuit du moteur de vibration</em></div>

### 5.6. Stockage et connectivité {#55-storage-and-connectivity}

#### 5.6.1. Configuration de démarrage {#551-boot-configuration}

La série SF32LB58x fournit une broche `Mode` pour configurer le mode de démarrage.

<div align="center"><em>Tableau 5.6-1 : Configuration du mode</em></div>

<div align="center" markdown>

| Niveau logique de la broche `Mode` | Description |
|:---|:---|
| Haut | Entre en mode téléchargement après la mise sous tension |
| Bas | Saute vers la zone d'application utilisateur après la mise sous tension |

</div>

!!! note "Remarques"
    1. Le domaine de tension de la broche `Mode` est identique à celui de VDDIOA ;
    2. Reliez `Mode` à l'alimentation ou à GND par une résistance de 10 kΩ afin de stabiliser son niveau. La broche ne doit pas rester flottante ni changer d'état ;
    3. Un point de test pour la broche `Mode` doit être réservé sur les cartes de production pour le téléchargement du firmware et l'étalonnage du quartz ; un cavalier n'est pas requis ;
    4. Sur les cartes de test, il est recommandé de réserver un cavalier pour la broche `Mode` afin de pouvoir démarrer la carte en mode téléchargement après un plantage du firmware.

#### 5.6.2. Stockage {#552-storage}

La série SF32LB58x prend en charge les interfaces MPI3 ou MPI4 pour la Flash NOR externe et la Flash SPI NAND, et une interface SD1 pour la SD NAND externe et l'eMMC.

##### 5.6.2.1. Interface Flash QSPI NAND {#5521-qspi-nand-flash-interface}

La carte de référence EVB du SF32LB58x utilise par défaut MPI4 pour connecter un composant Flash SPI NAND externe.

![Figure 5.6-1 : Circuit de référence de la Flash SPI NAND](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.6-1 : Circuit de référence de la Flash SPI NAND</em></div>

<div align="center"><em>Tableau 5.6-2 : Connexions de signaux MPI4</em></div>

<div align="center" markdown>

| Signal Flash | Signal E/S (MPI4) | Description |
|:---|:---|:---|
| CS# | PA10 | Sélection de puce, active à l'état bas |
| SO | PA04 | Entrée de données (entrée/sortie de données 1) |
| WP# | PA01 | Sortie de protection en écriture (entrée/sortie de données 2) |
| SI | PA05 | Sortie de données (entrée/sortie de données 0) |
| SCLK | PA09 | Sortie d'horloge série |
| Hold# | PA06 | Sortie de données (entrée/sortie de données 3) |

</div>

!!! note "Remarques"
    1. Si la chaîne de production doit flasher le firmware sur la Flash externe, le logiciel de l'outil de téléchargement doit piloter la broche de contrôle d'alimentation PA43 de la Flash externe à l'état haut pour activer son alimentation.
    2. La broche Hold# de la Flash SPI NAND doit être tirée au niveau haut vers l'alimentation de la Flash SPI NAND via une résistance de 10 kΩ.

##### 5.6.2.2. Interface SDIO eMMC/Micro SD {#5522-sdio-emmc-micro-sd-interface}

La série SF32LB58x prend en charge 2 interfaces SDIO. Sur l'EVB, SD1 se connecte par défaut à l'eMMC ou à la SD NAND, et SD2 se connecte à une carte SD ou à une puce Wi-Fi.

SD1 utilise 12 GPIO (PA00-PA11) alimentés par le domaine VDDIOA2. Celui-ci peut être réglé sur 1,8 V ou 3,3 V selon le niveau d'interface du périphérique. Une interface de 1,8 V est recommandée pour la Flash SPI NAND et l'eMMC ; les composants Flash SD NAND ne prennent en charge que 3,3 V. Dans ce cas, VDDIOA2 doit donc être réglé sur 3,3 V.

![Figure 5.6-2 : Circuit de référence eMMC](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.6-2 : Circuit de référence eMMC</em></div>

![Figure 5.6-3 : Circuit de référence SD NAND](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.6-3 : Circuit de référence SD NAND</em></div>

![Figure 5.6-4 : Circuit de référence carte SD](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.6-4 : Circuit de référence carte SD</em></div>

<div align="center"><em>Tableau 5.6-3 : Connexions de signaux SD1</em></div>

<div align="center" markdown>

| Signal SD1 | Signal E/S | Description |
|:---|:---|:---|
| SD1_D7 | PA00 | Données 7 |
| SD1_D2 | PA01 | Données 6 |
| SD1_D5 | PA03 | Données 5 |
| SD1_D1 | PA04 | Données 1 |
| SD1_D0 | PA05 | Données 0 |
| SD1_D3 | PA06 | Données 3 |
| SD1_D4 | PA07 | Données 4 |
| SD1_D6 | PA08 | Données 6 |
| SD1_CLK | PA09 | Signal d'horloge |
| SD1_CMD | PA10 | Signal de commande |

</div>

!!! note "Vérification des libellés SD1"
    La source indique que SD1 utilise 12 GPIO (PA00–PA11), mais son tableau des signaux n'en répertorie que 10 (SD1_D[7:0], CLK et CMD). De plus, le tableau décrit à la fois SD1_D2 et SD1_D6 comme « Data 6 ». La source ne précise ni la fonction des deux GPIO non répertoriés ni l'origine du libellé en double. Vérifiez le brochage complet de SD1 dans la fiche technique de la puce avant de finaliser le schéma.

<div align="center"><em>Tableau 5.6-4 : Connexions de signaux SD2</em></div>

<div align="center" markdown>

| Signal SD2 | Signal E/S | Description |
|:---|:---|:---|
| SD2_CMD | PA70 | Signal de commande |
| SD2_D1 | PA75 | Données 1 |
| SD2_D0 | PA76 | Données 0 |
| SD2_CLK | PA77 | Signal d'horloge |
| SD2_D2 | PA79 | Données 2 |
| SD2_D3 | PA81 | Données 3 |

</div>

#### 5.6.3. USB {#553-usb}

L'USB de la série SF32LB58x prend en charge l'USB 2.0 HS en modes hôte et périphérique. Prévoyez une protection TVS reliant chacune des lignes USB DP et DM à la masse ; la capacité de jonction de la TVS doit être inférieure à 5 pF. Acheminez DP/DM en paire différentielle avec une impédance de 90 Ω sur le circuit imprimé.

![Figure 5.6-5 : Circuit d'interface USB](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.6-5 : Circuit d'interface USB</em></div>

### 5.7. Fabrication {#56-manufacturing}

#### 5.7.1. Interface de débogage et de téléchargement {#561-debug-and-download-interface}

La série SF32LB58x prend en charge l'interface de débogage standard Arm® SWD, qui permet le débogage pas à pas avec les outils EDA. Lorsqu'une sonde SEGGER® J-Link® est utilisée, configurez-la pour être alimentée par une source externe, en l'occurrence la carte SF32LB58x.

![Figure 5.7-1 : Circuit d'interface de débogage SWD](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.7-1 : Circuit d'interface de débogage SWD</em></div>

Le SF32LB58x offre 1 interface SWD plus 6 interfaces UART sélectionnables pour la sortie de débogage.

<div align="center"><em>Tableau 5.7-1 : Connexions du port de débogage</em></div>

<div align="center" markdown>

| Signal UART | E/S | Description |
|:---|:---|:---|
| TXD1 | PA31 | UART1 RXD, port d'impression par défaut du HCPU |
| RXD1 | PA32 | UART1 TXD, port d'impression par défaut du HCPU |
| TXD2 | PA28 | UART2 RXD |
| RXD2 | PA29 | UART2 TXD |
| TXD3 | PA21 | UART3 RXD |
| RXD3 | PA20 | UART3 TXD |
| TXD4 | PB37 | UART4 RXD, port d'impression par défaut du LCPU |
| RXD4 | PB36 | UART4 TXD, port d'impression par défaut du LCPU |
| TXD5 | PB18 | UART5 RXD |
| RXD5 | PB17 | UART5 TXD |
| TXD6 | PB14 | UART6 RXD |
| RXD6 | PB13 | UART6 TXD |
| SWCLK | PB07 | Signal d'horloge J-Link |
| SWDIO | PB11 | Signal de données J-Link |

</div>

!!! note "Remarque"
    Les signaux RXD des UARTx ne doivent pas flotter ; activez un tirage haut interne lors de l'initialisation logicielle.

#### 5.7.2. Flashage de production et accès matériel {#562-production-flashing-and-hardware-access}

Prévoyez l'accès au flashage en production, à la récupération et à l'étalonnage avant de figer le boîtier du produit et le gabarit de test. Au minimum, gardez accessibles l'alimentation, la masse, le SWD, les sorties UART de débogage nécessaires et les broches de démarrage/configuration. Prévoyez également les points de réinitialisation de la carte ou de commande du PMIC nécessaires pour récupérer un système dont le firmware ne démarre pas.

#### 5.7.3. Listes de contrôle du schéma et du dessin PCB {#563-schematic-and-pcb-drawing-checklists}

- [ ] Le schéma d'alimentation (alimentation directe par PMU intégrée, ou associée au SF30147C) correspond au budget d'alimentation du système
- [ ] La broche de configuration de démarrage Mode dispose d'une résistance externe de 10 kΩ et d'un point de test réservé sur les cartes de production
- [ ] Les spécifications du quartz 48 MHz/32,768 kHz correspondent aux recommandations, avec le GND de la couche 2 retiré sous le quartz
- [ ] La sélection de l'interface de stockage (MPI4/SD1/SD2) correspond à la configuration de démarrage, et la broche de contrôle d'alimentation de la Flash externe PA43 est confirmée
- [ ] La sélection de l'interface d'affichage (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) correspond à l'affectation de broches LCDC1/LCDC2
- [ ] Les broches du port de débogage (SWD + 6x UART) sont affectées selon les besoins, avec le tirage haut interne RXD de l'UART activé
- [ ] Le multiplexage de l'interface audio I2S/PDM et audio analogique a été vérifié, avec le budget de piste différentielle satisfait
- [ ] USB DP et DM disposent chacune d'une protection TVS reliée à la masse ; capacité de jonction < 5 pF

[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
