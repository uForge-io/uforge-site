---
icon: lucide/layers
description: "Directives d'implantation et de routage du PCB SF32LB56x : empreintes, empilage, routage critique et liste de contrôle détaillée."
tags:
    - Matériel
    - Puce
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56x — Implantation et routage du PCB { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Fait partie du guide de conception matérielle SF32LB56x"
    Cette page couvre la section 6, consacrée à l'implantation et au routage du PCB. Retournez aux [Directives de conception du schéma](SF32LB56x_schematic_design.md) ou continuez vers la [Liste de contrôle de la revue de conception et des références](SF32LB56x_review_and_reference.md).

## 6. Implantation et routage du PCB { #6-pcb-layout-guidelines }

### 6.1. Empreinte et empilage des couches { #61-footprint-and-stack-up }

La variante U utilise un boîtier QFN68L à 68 broches de 7 × 7 × 0,75 mm, avec un pas de 0,35 mm. Le QFN est compatible avec les vias traversants (PTH) ; SiFli recommande un empilage PTH à quatre couches, avec le fan-out de toutes les broches sur la couche supérieure. La variante V utilise un boîtier WBBGA à 175 billes de 6,5 × 6,1 × 0,94 mm, avec un pas de 0,4 mm et des billes de 0,25 mm de diamètre. Il n'est pas compatible avec les PTH et nécessite un procédé HDI. Faites le fan-out des deux rangées extérieures de billes sur la couche supérieure et des autres billes sur les couches internes. Avant de figer le routage, confirmez que le fabricant de PCB prend en charge l'empilage, le masque de soudure et la stratégie de fan-out retenus.

### 6.2. Routage critique { #62-critical-routing }

#### 6.2.1. Routage des horloges { #621-clock-routing }

Placez les quartz dans le blindage, à plus de 1 mm du bord de la carte et, de préférence, à au moins 5 mm des composants qui dégagent de la chaleur, tels que le PA, le chargeur et le PMU. Gardez les autres métaux et composants à au moins 0,25 mm du circuit du quartz. Routez si possible le quartz de 48 MHz sur la couche supérieure ; limitez ses pistes à 3–10 mm de long et 0,075 mm de large, avec un blindage de masse tridimensionnel. Éloignez-les de VBAT, du convertisseur DC-DC et des signaux haute vitesse. Routez le quartz de 32,768 kHz sur la couche supérieure, avec une longueur maximale de 10 mm, une largeur de 0,075 mm et un espacement d'au moins 0,15 mm entre 32K_XI et 32K_XO. Dégagez la couche supérieure et les couches adjacentes sous les deux zones de quartz ; aucune autre piste ne doit les traverser.

#### 6.2.2. Routage RF { #622-rf-routing }

Routez la RF sous forme d'une piste asymétrique à impédance contrôlée de 50 Ω, de préférence d'une largeur supérieure à 10 mil et, si possible, sur la couche supérieure ; évitez les vias et les angles vifs. Placez le réseau d'adaptation près de la puce, et non de l'antenne. Placez le condensateur de filtrage AVDD_BRF près de la broche de la puce et reliez sa masse directement à la masse principale par un via. Assurez un blindage de masse continu et des vias de couture le long des deux côtés de la piste RF. Éloignez de la zone RF et de sa face inférieure les alimentations à fort di/dt, les horloges haute vitesse et les signaux I2C, SPI, SDIO, I2S et UART. Reliez correctement à la masse principale AVSS_RF1/2/3 pour la variante U et AVSS_RRF, AVSS_TRF, AVSS_TRF2 et AVSS_BB pour la variante V.

#### 6.2.3. Alimentation et masse { #623-power-and-ground }

Placez l'inductance BUCK et les condensateurs de filtrage près des broches de la puce. Gardez BUCK_LX courte et large ; BUCK_FB doit avoir une largeur d'au moins 0,25 mm. Ne coulez pas de cuivre sur la couche supérieure sous l'inductance ; conservez un plan de masse continu sur la couche adjacente et ne faites passer aucune autre piste dans la zone de l'inductance. Reliez les masses des condensateurs de sortie BUCK au plan de masse principal par plusieurs vias. Placez le condensateur PVDD près de sa broche et routez PVDD de manière courte et large ; reliez PVSS à la masse principale par des vias. Placez les condensateurs de découplage LDO et E/S près de leurs broches et dimensionnez les pistes d'alimentation selon le courant de charge.

!!! warning "Valeurs contradictoires pour la largeur de piste PVDD"
    Le guide d'application matérielle SF32LB56xU/V spécifie une largeur minimale de piste PVDD de 0,5 mm, tandis que la liste de contrôle PCB correspondante indique 8 mil. Ces valeurs diffèrent ; confirmez auprès de SiFli ou du responsable de la conception PCB l'exigence applicable avant le gel du routage.

#### 6.2.4. Audio et signaux analogiques { #624-audio-and-analog-signals }

Alimentez AVDD33_ANA et AVDD33_AUD par des branches en étoile distinctes, protégez les pistes par la masse et éloignez-les des sources de bruit à fort courant. Placez les condensateurs de filtrage AVDD33_AUD, MIC_BIAS et AUD_VREF près de leurs broches respectives et reliez leurs masses directement à la masse principale. Routez ADCP/ADCN en paire différentielle courte et protégée par la masse, avec les composants associés près de la puce. Routez DACP/DACN en paire différentielle, avec une capacité parasite inférieure à 10 pF et une longueur de piste inférieure à 2 cm, à l'écart des fortes interférences. Protégez les pistes GPADC par la masse et éloignez-les des sources de bruit liées à la mesure de la batterie et de la température.

#### 6.2.5. USB et SDIO { #625-usb-and-sdio }

Routez USB D+/D− (PA17/PA18) en paire différentielle de 90 Ω protégée par la masse. Placez les dispositifs ESD près du connecteur et faites passer les signaux par ces dispositifs avant qu'ils n'atteignent la puce ; ne créez aucune dérivation avant le dispositif de protection. Reliez la masse du dispositif à la masse principale par des pistes courtes et larges et des vias. La variante U dispose d'une interface SDIO ; la variante V dispose de SDIO1 et SDIO2. Routez les signaux SDIO en groupe, avec une longueur totale maximale de 50 mm et un écart de longueur maximal de 6 mm au sein du groupe. Protégez l'horloge SDIO par la masse et prévoyez également une garde de masse autour des signaux DATA et CMD.

#### 6.2.6. EMI, ESD et points de test { #626-emi-esd-and-test-points }

Évitez les longues pistes sur la couche supérieure, hors du blindage, pour les signaux d'horloge et d'alimentation bruyants ; utilisez si possible les couches internes. Placez les composants TVS/ESD près du connecteur correspondant. Faites passer chaque signal par son dispositif de protection, puis reliez la pastille de masse du dispositif à la masse principale par des pistes courtes et larges et des vias. Placez le point de test du câble de charge USB en amont de sa TVS ; placez la TVS du connecteur de batterie en amont de la plateforme batterie afin que les lignes externes passent par la TVS avant d'atteindre la puce. Reliez suffisamment le réseau de masse sous la puce au plan de masse principal à l'aide de vias borgnes ou enterrés.

### 6.3. Liste de contrôle d'implantation et de routage du PCB { #63-pcb-layout-checklist }

Chaque tableau ci-dessous couvre un aspect de la revue de l'implantation et du routage du PCB. Lorsqu'une colonne « S'applique à » n'est pas présente, la ligne s'applique à toutes les variantes couvertes par le classeur.

#### 6.3.1. Boîtier { #631-package }

<div align="center"><em>Tableau 6.3-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'empreinte correspond à la spécification du boîtier | Obligatoire |

</div>

#### 6.3.2. Alimentation { #632-power-supply }

<div align="center"><em>Tableau 6.3-2 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La largeur de la piste d'alimentation PVDD est d'au moins 8 mil | Obligatoire |
| 2 | Les pistes BUCK_LX et BUCK_FB font chacune au moins 8 mil de large | Obligatoire |
| 3 | La largeur de la piste d'alimentation VDDIO1 est d'au moins 5 mil | Obligatoire |
| 4 | La largeur de la piste d'alimentation VDDIO2 est d'au moins 8 mil | Obligatoire |
| 5 | La largeur de la piste d'alimentation VDDIO3 est d'au moins 5 mil | Obligatoire |
| 6 | La largeur de la piste d'alimentation VDDIO4 est d'au moins 6 mil | Obligatoire |
| 7 | La largeur de la piste d'alimentation VDDIOSC est d'au moins 6 mil | Obligatoire |
| 8 | La largeur de la piste d'alimentation AVDD33_ANA est d'au moins 6 mil | Obligatoire |
| 9 | La largeur de la piste d'alimentation AVDD33_AUD est d'au moins 5 mil | Obligatoire |

</div>

#### 6.3.3. Placement des condensateurs et inductances d'alimentation { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tableau 6.3-3 : Liste de contrôle du placement des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le condensateur PVDD est placé près de la broche | Obligatoire |
| 2 | L'inductance BUCK est placée près de la puce | Obligatoire |
| 3 | Le condensateur de découplage BUCK est placé aussi près que possible de la broche de la puce | Obligatoire |
| 4 | Le condensateur LDO1_VOUT est placé près de la broche | Obligatoire |
| 5 | Le condensateur LDO2_VOUT est placé près de la broche | Obligatoire |
| 6 | Le condensateur VDD_RET est placé près de la broche | Obligatoire |
| 7 | Le condensateur VDD_RTC est placé près de la broche | Obligatoire |
| 8 | Le condensateur VDDIO1 est placé près de la broche | Obligatoire |
| 9 | Le condensateur VDDIO2 est placé près de la broche | Obligatoire |
| 10 | Le condensateur VDDIO3 est placé près de la broche | Obligatoire |
| 11 | Le condensateur VDDIO4 est placé près de la broche | Obligatoire |
| 12 | Le condensateur AVDD33_ANA est placé près de la broche | Obligatoire |
| 13 | Le condensateur AVDD33_AUD est placé près de la broche | Obligatoire |

</div>

#### 6.3.4. Horloge { #634-clock }

<div align="center"><em>Tableau 6.3-4 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le quartz est placé près de la puce | Obligatoire |
| 2 | Un blindage GND entoure le quartz | Obligatoire |
| 3 | Une zone sans cuivre est prévue sous le quartz (carte PTH 4 couches : couche supérieure ; carte HDI 6 couches : couche supérieure et couche 2) | Obligatoire |
| 4 | Le dégagement entre le remplissage de cuivre GND et les pistes du quartz dépasse 1,5 fois la largeur de piste | Obligatoire |
| 5 | L'espacement entre les deux pistes parallèles du quartz 32 kHz dépasse 2 fois l'espacement entre pistes | Obligatoire |

</div>

#### 6.3.5. Boutons { #635-buttons }

<div align="center"><em>Tableau 6.3-5 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le dispositif de protection ESD du bouton est placé près du bouton | Obligatoire |

</div>

#### 6.3.6. RF { #636-rf }

<div align="center"><em>Tableau 6.3-6 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La piste RF respecte l'exigence d'impédance caractéristique de 50 Ω en mode asymétrique (single-ended) | Obligatoire |
| 2 | Largeur de la piste RF ≥ 10 mil | Obligatoire |
| 3 | Prévoir au moins 60 mil de cuivre de masse de chaque côté de la piste RF et suffisamment de vias de raccordement à la masse pour relier ce cuivre à la masse principale | Obligatoire |
| 4 | Placer près de la puce le réseau π d'adaptation d'antenne prévu | Obligatoire |
| 5 | Plan de masse GND continu sous le signal RF | Obligatoire |
| 6 | Aucune piste de signal numérique haute vitesse ne passe sous la piste RF | Obligatoire |
| 7 | Aucune piste d'alimentation à di/dt élevé ne passe sous la piste RF | Obligatoire |
| 8 | Renforcer la mise à la masse d'AVSS_RF1, AVSS_RF2 et AVSS_RF3 et relier ces broches au plan de masse principal | Obligatoire |

</div>

#### 6.3.7. Audio { #637-audio }

<div align="center"><em>Tableau 6.3-7 : Liste de contrôle audio</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN sont routées comme des pistes différentielles avec garde de masse | Obligatoire |
| 2 | AU_DACP/AU_DACN sont routées comme des pistes différentielles avec garde de masse | Obligatoire |
| 3 | Les pistes AU_DACP/AU_DACN sont suffisamment courtes pour que la capacité parasite soit inférieure à 10 pF | Obligatoire |
| 4 | Les pistes d'alimentation AVDD33_ANA et AVDD33_AUD doivent être gardées par une masse, rester à l'écart des signaux bruyants à fort courant et suivre un routage en étoile ; chacune doit mesurer au moins 5 mm | Obligatoire |
| 5 | AVSS est connecté par des vias au plan de masse principal | Obligatoire |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>Tableau 6.3-8 : Liste de contrôle de l'ADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Aucun signal haute vitesse ne doit longer le signal GPADC en parallèle sans garde de masse | Obligatoire |
| 2 | Les résistances du diviseur de tension de batterie sont placées près de la broche d'entrée de la puce | Obligatoire |

</div>

#### 6.3.9. Points de test { #639-test-points }

<div align="center"><em>Tableau 6.3-9 : Liste de contrôle des points de test</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'emplacement des points de test permet une mesure à la sonde ou une soudure sur un gabarit de test | Obligatoire |
| 2 | Les points de test de téléchargement et d'étalonnage du quartz comprennent VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD et l'une des broches PB20/PB21/PB25 ; ajoutez VDDIO2 et VDDIO3 ou VDDIO4 pour U, ou VDDIOA et VDDIOB pour V, et respectez les exigences de dimensions et d'emplacement du gabarit | Obligatoire |

</div>

#### 6.3.10. Masse { #6310-ground }

<div align="center"><em>Tableau 6.3-10 : Liste de contrôle de la masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les couches adjacentes à la puce principale forment un plan de masse principal complet, avec suffisamment de vias de masse | Obligatoire |
| 2 | PVSS est connecté par des vias à la masse principale | Obligatoire |
| 3 | La zone sous la puce dispose de suffisamment de vias de masse connectés au plan de masse principal | Obligatoire |
| 4 | Un anneau de vias de masse longe le bord de la carte | Obligatoire |

</div>
