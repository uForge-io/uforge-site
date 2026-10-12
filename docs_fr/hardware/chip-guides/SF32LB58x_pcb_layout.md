---
icon: lucide/layers
hide:
    - navigation
description: "Recommandations de conception du PCB du MCU SF32LB58x : empreinte du boîtier, empilement des couches, fanout et routage des signaux d'horloge, RF, audio, USB, SDIO et DSI, ainsi que des alimentations."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle du SF32LB58x — Conception et routage du PCB { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Fait partie du Guide de conception matérielle du SF32LB58x"
    Cette page couvre la section 6, consacrée à la conception et au routage du PCB. Retournez aux [Directives de conception de schéma](SF32LB58x_schematic_design.md), poursuivez vers la [Liste de contrôle d'implantation du PCB](SF32LB58x_pcb_layout_checklist.md), ou passez directement à la [Liste de contrôle pour la revue de conception et références](SF32LB58x_review_and_reference.md).

## 6. Conception et routage du PCB { #6-pcb-layout-guidelines }

### 6.1. Conception de l'empreinte du boîtier { #61-package-footprint-design }

La série SF32LB58x utilise un boîtier BGA256 de 8,5 mm × 6,5 mm × 0,94 mm, avec un pas de billes de 0,4 mm et un diamètre nominal de bille de 0,25 mm. Reportez-vous à la fiche technique officielle pour consulter toutes les données de qualification du boîtier.

!!! warning "Les sources donnent des hauteurs de boîtier différentes"
    Le texte du guide SiFli indique une hauteur de boîtier de 0,94 mm, tandis que le dessin du BGA256 donne pour la cote A une valeur nominale de 0,91 mm et une plage de 0,84 à 1,04 mm. Ces valeurs de source se contredisent. Si la hauteur influe sur le dégagement mécanique ou l'ajustement dans le boîtier du produit, ne choisissez pas une valeur sans confirmation de SiFli ; utilisez la spécification de boîtier confirmée.

![Figure 6.1-1 : Dimensions du boîtier BGA256](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-1 : Dimensions du boîtier BGA256</em></div>

![Figure 6.1-2 : Forme de l'empreinte du boîtier](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-2 : Forme de l'empreinte du boîtier</em></div>

![Figure 6.1-3 : Exemple de motif de pastilles du PCB](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-3 : Exemple de motif de pastilles du PCB</em></div>

![Figure 6.1-4 : Plan des billes du boîtier](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-4 : Plan des billes du boîtier</em></div>

![Figure 6.1-5 : Informations sur les billes du substrat du boîtier](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-5 : Informations sur les billes du substrat du boîtier</em></div>

### 6.2. Empilement PCB { #62-pcb-stack-up }

La série SF32LB58x prend en charge le montage sur une ou deux faces. Le PCB doit être une carte HDI ; le PTH n'est pas pris en charge. L'empilement 6HDI-2 est recommandé. La structure de référence de la figure indique une épaisseur finale de carte de 0,8 mm ±10 % (environ 32 mil nominaux).

![Figure 6.2-1 : Structure d'empilement de référence](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.2-1 : Structure d'empilement de référence</em></div>

### 6.3. Règles générales de conception du PCB { #63-general-pcb-design-rules }

Reportez-vous à la figure des règles générales de conception du PCB dans la fiche technique officielle (dimensions en mm). Les règles de référence indiquent une largeur de piste minimale et recommandée de 0,075 mm, avec un maximum de 2 mm ; un dégagement minimal de 0,075 mm entre pistes, vias, pastilles, composants CMS, texte et cuivre ; 0,25 mm de dégagement par rapport au bord du PCB ; et 0,1 mm entre perçages ainsi qu'entre corps de composants. Confirmez les règles définitives avec le fabricant du PCB.

![Figure 6.3-1 : Règles générales de conception du PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-1 : Règles générales de conception du PCB</em></div>

#### 6.3.1. Conception des vias aveugles { #631-blind-via-design }

Reportez-vous aux figures de conception des vias aveugles (couches 1-2 et 1-3) dans la fiche technique officielle (dimensions en mm). Les vias aveugles métallisés de référence ont un diamètre de 0,23 mm et un perçage de 0,10 mm.

![Figure 6.3-2 : Configuration des vias aveugles entre les couches 1 et 2](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-2 : Configuration des vias aveugles entre les couches 1 et 2</em></div>

![Figure 6.3-3 : Configuration des vias aveugles entre les couches 1 et 3](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-3 : Configuration des vias aveugles entre les couches 1 et 3</em></div>

#### 6.3.2. Conception des vias enterrés { #632-buried-via-design }

Reportez-vous à la figure de conception des vias enterrés (couches 2-5) dans la fiche technique officielle (dimensions en mm). Le via enterré métallisé de référence a un diamètre de 0,40 mm et un perçage de 0,20 mm.

![Figure 6.3-4 : Configuration des vias enterrés entre les couches 2 et 5](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-4 : Configuration des vias enterrés entre les couches 2 et 5</em></div>

### 6.4. Fanout des pistes { #64-trace-fanout }

Les pistes des deux premières rangées de billes BGA sortent sur la couche supérieure ; celles des autres billes sont acheminées vers les couches internes au moyen de vias.

![Figure 6.4-1 : Exemple de fanout sur la couche supérieure](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.4-1 : Exemple de fanout sur la couche supérieure</em></div>

![Figure 6.4-2 : Exemple de fanout sur une couche interne](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.4-2 : Exemple de fanout sur une couche interne</em></div>

### 6.5. Routage de l'interface d'horloge { #65-clock-interface-routing }

Placez le quartz sous un capot de blindage, à plus de 1 mm du bord du circuit imprimé et aussi loin que possible des composants qui dégagent de la chaleur, tels que le PA, le circuit de charge et la PMU. Un écart de plus de 5 mm est préférable afin de ne pas affecter le décalage de fréquence du quartz. Maintenez une distance supérieure à 0,25 mm entre la zone d'exclusion du quartz et tout autre métal ou composant.

Routez les pistes du quartz de 48 MHz sur la couche supérieure. Leur longueur est comprise entre 3 et 10 mm et leur largeur est de 0,075 mm. Appliquez un blindage 3D complet et éloignez ces pistes de VBAT, du DC/DC et des signaux à haute vitesse. Ne faites passer aucune autre piste sur la couche supérieure ni sur la couche adjacente sous la zone du quartz de 48 MHz.

Routez les pistes du quartz de 32,768 kHz sur la couche supérieure. Leur longueur est ≤ 10 mm, leur largeur est de 0,075 mm et l'espacement entre les pistes parallèles 32K_XI et 32K_XO est ≥ 0,15 mm. Appliquez un blindage 3D complet et ne faites passer aucune autre piste sur la couche supérieure ni sur la couche adjacente sous la zone du quartz.

!!! warning "Confirmez auprès de SiFli les couches d'exclusion du quartz"
    Le guide de routage demande une zone d'exclusion sur la couche supérieure et la couche adjacente sous chaque zone de quartz. Le classeur de la liste de contrôle demande des zones d'exclusion sur les couches 1, 2 et 3 d'un PCB à quatre couches. Les sources ne concordent pas sur l'inclusion de la couche 3. Ne déduisez pas l'exigence finale pour cette couche ; confirmez-la auprès de SiFli.

![Figure 6.5-1 : Placement du quartz](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-1 : Placement du quartz</em></div>

![Figure 6.5-2 : Schéma du quartz 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-2 : Schéma du quartz 48 MHz</em></div>

![Figure 6.5-3 : Modèle de routage du quartz 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-3 : Modèle de routage du quartz 48 MHz</em></div>

![Figure 6.5-4 : Référence de routage du quartz 48 MHz](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-4 : Référence de routage du quartz 48 MHz</em></div>

![Figure 6.5-5 : Schéma du quartz 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-5 : Schéma du quartz 32,768 kHz</em></div>

![Figure 6.5-6 : Modèle de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-6 : Modèle de routage du quartz 32,768 kHz</em></div>

![Figure 6.5-7 : Référence de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-7 : Référence de routage du quartz 32,768 kHz</em></div>

### 6.6. Routage de l'interface RF { #66-rf-interface-routing }

Placez le circuit d'adaptation RF aussi près que possible de la puce, et non près de l'antenne. Placez le condensateur de découplage d'alimentation RF AVDD_BRF aussi près que possible de la broche de la puce ; les vias reliant sa pastille de masse débouchent directement sur le plan de masse principal.

Dans la mesure du possible, routez les pistes RF sur la couche supérieure afin d'éviter les vias susceptibles de dégrader les performances RF. Il est préférable que leur largeur dépasse 10 mil. Évitez les angles aigus ou droits et appliquez un blindage 3D complet. Ajoutez des vias de masse de blindage supplémentaires le long des deux côtés de la piste RF et contrôlez son impédance à 50 Ω. Éloignez de la zone de routage RF les lignes DC-DC et VBAT ainsi que les signaux numériques à haute vitesse, notamment ceux du quartz, des horloges haute fréquence et des interfaces I2C/SPI/SDIO/I2S/UART. Les broches AVSS_RRF, AVSS_TRF, AVSS_TRF2, AVSS_VCO et AVSS_BB assurent la mise à la masse du circuit RF. Reliez-les correctement à la masse principale au moyen de vias aveugles placés directement sur leurs pastilles.

![Figure 6.6-1 : Schéma du réseau π et du circuit d'alimentation](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-1 : Schéma du réseau π et du circuit d'alimentation</em></div>

![Figure 6.6-2 : Implantation sur PCB du réseau π et du circuit d'alimentation](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-2 : Implantation sur PCB du réseau π et du circuit d'alimentation</em></div>

![Figure 6.6-3 : Schéma du circuit de signal RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-3 : Schéma du circuit de signal RF</em></div>

![Figure 6.6-4 : Routage sur PCB du signal RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-4 : Routage sur PCB du signal RF</em></div>

![Figure 6.6-5 : Schéma de masse du circuit RF](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-5 : Schéma de masse du circuit RF</em></div>

![Figure 6.6-6 : Plan de masse du circuit RF sur PCB](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-6 : Plan de masse du circuit RF sur PCB</em></div>

### 6.7. Routage de l'interface audio { #67-audio-interface-routing }

Placez le condensateur de découplage de l'alimentation audio AVDD33_AUD près de sa broche et reliez correctement sa pastille de masse à la masse principale. Faites de même pour le condensateur de découplage de MIC_BIAS, l'alimentation des microphones. Placez également le condensateur de découplage AUD_VREF près de sa broche.

AU_ADC1P/AU_ADC1N et AU_ADC2P/AU_ADC2N sont les deux paires d'entrées analogiques. Placez les composants associés aussi près que possible des broches, puis routez chaque paire P/N en différentiel avec des pistes aussi courtes que possible. Appliquez un blindage 3D à chaque paire et éloignez-en les autres signaux susceptibles de générer des interférences importantes.

AU_DAC1P/AU_DAC1N et AU_DAC2P/AU_DAC2N sont les deux paires de sorties analogiques. Placez les composants associés aussi près que possible des broches, puis routez chaque paire P/N en différentiel sur une longueur aussi courte que possible et inférieure à 2 mm. La capacité parasite des pistes reste inférieure à 10 pF et la largeur différentielle des pistes est de 0,075 mm. Appliquez un blindage 3D à chaque paire et éloignez-en les autres signaux susceptibles de générer des interférences importantes.

!!! warning "Les sources divergent sur la longueur maximale des pistes DAC"
    Le guide de routage fixe la longueur des pistes DAC à moins de 2 mm, tandis que le classeur de la liste de contrôle indique moins de 2 cm (20 mm). Ces limites diffèrent d'un facteur dix. Ne choisissez ni ne remplacez une limite sans confirmation de SiFli.

![Figure 6.7-1 : Schéma d'alimentation audio](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-1 : Schéma d'alimentation audio</em></div>

![Figure 6.7-2 : Implantation sur PCB du filtre d'alimentation audio](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-2 : Implantation sur PCB du filtre d'alimentation audio</em></div>

![Figure 6.7-3 : Schéma d'entrée audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-3 : Schéma d'entrée audio analogique</em></div>

![Figure 6.7-4 : Implantation sur PCB de l'entrée audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-4 : Implantation sur PCB de l'entrée audio analogique</em></div>

![Figure 6.7-5 : Schéma de sortie audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-5 : Schéma de sortie audio analogique</em></div>

![Figure 6.7-6 : Implantation sur PCB de la sortie audio analogique](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-6 : Implantation sur PCB de la sortie audio analogique</em></div>

### 6.8. Routage de l'interface USB { #68-usb-interface-routing }

Placez le condensateur de découplage AVDD33_USB et la résistance de calibration USB2_REXT près de leurs broches respectives. Acheminez les pistes USB à travers le composant de protection ESD avant qu'elles n'atteignent la puce, et reliez correctement la broche de masse du composant ESD à la masse principale. Routez USB DP/DN en paire différentielle avec une impédance différentielle contrôlée de 90 Ω et un blindage 3D.

![Figure 6.8-1 : Schéma du signal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-1 : Schéma du signal USB</em></div>

![Figure 6.8-2 : Routage sur PCB des signaux USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-2 : Routage sur PCB des signaux USB</em></div>

![Figure 6.8-3 : Exemple d'implantation des composants USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-3 : Exemple d'implantation des composants USB</em></div>

![Figure 6.8-4 : Modèle de routage du signal USB](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-4 : Modèle de routage du signal USB</em></div>

### 6.9. Routage de l'interface SDIO { #69-sdio-interface-routing }

Le SF32LB58x dispose de deux interfaces SDIO : SDIO1 et SDIO2. Regroupez les signaux de chaque interface et évitez de les séparer. La longueur totale des pistes est ≤ 50 mm et l'écart de longueur entre les signaux d'un même groupe est ≤ 6 mm. Appliquez un blindage 3D à l'horloge SDIO et blindez également les signaux DATA et CMD.

![Figure 6.9-1 : Circuit d'interface SDIO1](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-1 : Circuit d'interface SDIO1</em></div>

![Figure 6.9-2 : Modèle de routage sur PCB de l'interface SDIO1](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-2 : Modèle de routage sur PCB de l'interface SDIO1</em></div>

### 6.10. Routage de l'interface DSI { #610-dsi-interface-routing }

Placez le condensateur de découplage AVDD18_DSI et la résistance d'étalonnage DSI_REXT près de leurs broches respectives. Routez les signaux DSI en paires différentielles à impédance contrôlée de 100 Ω et adaptez les longueurs d'horloge et de données : l'écart de longueur au sein d'une paire est ≤ 0,5 mm et celui entre les paires ≤ 2 mm. Appliquez un blindage 3D à chaque paire différentielle.

!!! warning "Les sources divergent sur la limite entre paires différentielles DSI"
    Le guide de routage limite l'écart de longueur entre paires à ≤ 2 mm et celui au sein d'une paire à ≤ 0,5 mm. Le classeur de la liste de contrôle demande plutôt que les paires différentielles de données DSI soient adaptées à la paire d'horloge à 200 mil (5,08 mm) près. Les limites entre paires se contredisent. Distinguez la limite intra-paire et confirmez auprès de SiFli la limite inter-paires à appliquer avant de finaliser le routage.

![Figure 6.10-1 : Circuit de signal DSI](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-1 : Circuit de signal DSI</em></div>

![Figure 6.10-2 : Routage sur PCB des signaux DSI](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-2 : Routage sur PCB des signaux DSI</em></div>

### 6.11. Routage du circuit DC-DC { #611-dc-dc-circuit-routing }

Placez l'inductance d'alimentation DC-DC et les condensateurs de découplage près des broches de la puce. Maintenez les pistes BUCK_LX aussi courtes et larges que possible pour minimiser l'inductance de boucle. Ajoutez des vias de masse supplémentaires aux broches de masse de tous les condensateurs de découplage de sortie DC-DC et reliez-les au plan de masse principal. La piste de rétroaction BUCK_FB ne doit pas être trop fine : sa largeur doit être supérieure à 0,25 mm. Aucune zone de cuivre ne doit être présente sur la couche supérieure sous l'inductance ; conservez un plan de masse de référence continu sur la couche adjacente et ne faites passer aucune autre piste dans la zone de l'inductance.

![Figure 6.11-1 : Circuit des composants clés DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.11-1 : Circuit des composants clés DC-DC</em></div>

![Figure 6.11-2 : Implantation sur PCB des composants clés du convertisseur DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.11-2 : Implantation sur PCB des composants clés du convertisseur DC-DC</em></div>

### 6.12. Routage de l'alimentation { #612-power-supply-routing }

PVDD1 et PVDD2 sont les entrées d'alimentation du module PMU intégré — placez leurs condensateurs de découplage près des broches et maintenez les pistes aussi larges que possible, jamais en dessous de 0,5 mm. PVSS1 et PVSS2 sont des broches de masse du module PMU qui doivent être connectées à la masse principale via des vias — évitez de les laisser flottantes, ce qui affecterait les performances globales de la PMU.

![Figure 6.12-1 : Schéma du circuit DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.12-1 : Schéma du circuit DC-DC</em></div>

![Figure 6.12-2 : Routage sur PCB du convertisseur DC-DC](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.12-2 : Routage sur PCB du convertisseur DC-DC</em></div>

### 6.13. Routage des alimentations LDO et E/S { #613-ldo-and-io-power-input-routing }

Placez les condensateurs de découplage pour toutes les sorties LDO et entrées d'alimentation IO près de leurs broches respectives, avec des largeurs de piste répondant à l'exigence de courant d'entrée — maintenez les pistes aussi courtes et larges que possible pour réduire l'ondulation du rail d'alimentation et améliorer la stabilité du système.

![Figure 6.13-1 : Exemple de routage des sorties LDO et des entrées d'E/S](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.13-1 : Exemple de routage des sorties LDO et des entrées d'E/S</em></div>

### 6.14. Routage des autres interfaces { #614-other-interface-routing }

Les réseaux de signaux de broches GPADC nécessitent un blindage 3D complet et doivent être maintenus à l'écart d'autres sources d'interférence, telles que les circuits de détection de niveau de batterie et de détection de température.

![Figure 6.14-1 : Circuit GPADC](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-1 : Circuit GPADC</em></div>

Les réseaux de signaux de broches d'entrée/sortie d'horloge, tels que la sortie 32 kHz, nécessitent de même un blindage 3D complet et doivent être maintenus à l'écart d'autres sources d'interférence.

![Figure 6.14-2 : Circuit de sortie d'horloge 32 kHz](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-2 : Circuit de sortie d'horloge 32 kHz</em></div>

### 6.15. Routage de la masse de la puce { #615-chip-ground-routing }

Sous la zone centrale de la puce SF32LB58x, interconnectez complètement le réseau de masse au moyen de pistes afin de former un plan de masse adéquat. Reliez ce plan au plan de masse principal à l'aide de vias aveugles ou enterrés.

![Figure 6.15-1 : Plan de masse de la couche supérieure sous la puce](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-1 : Plan de masse de la couche supérieure sous la puce</em></div>

![Figure 6.15-2 : Plan de masse de la deuxième couche sous la puce](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-2 : Plan de masse de la deuxième couche sous la puce</em></div>

![Figure 6.15-3 : Plan de masse de la troisième couche sous la puce](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-3 : Plan de masse de la troisième couche sous la puce</em></div>

![Figure 6.15-4 : Plan de masse de la quatrième couche sous la puce](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.15-4 : Plan de masse de la quatrième couche sous la puce</em></div>

### 6.16. EMI et ESD { #616-emi-esd }

À l'extérieur du capot de blindage, évitez les longues pistes sur la couche supérieure. Les signaux d'horloge, d'alimentation et les autres signaux susceptibles de générer des interférences doivent être routés sur des couches internes, et non sur la couche supérieure. Placez les composants de protection ESD près des broches du connecteur et faites passer les signaux par le composant ESD avant tout autre embranchement. Reliez les broches de masse des composants ESD à la masse principale par des vias ; gardez les pistes entre leurs pastilles de masse et ces vias courtes et larges afin de réduire l'impédance et d'améliorer la protection ESD.

### 6.17. Autres considérations { #617-other-considerations }

Placez les points de test de la ligne de charge USB en amont de la diode TVS. Pour la ligne du support de batterie, placez la diode TVS avant la connexion à la plateforme, de sorte que le signal passe par la TVS avant d'atteindre la puce. Gardez aussi courtes que possible les pistes reliant la broche de masse de la TVS.

!!! note "La source ne définit pas le repère de placement de la TVS"
    La source chinoise demande de placer la TVS du connecteur de batterie « avant la plateforme », sans préciser le nœud ni le point de connexion désigné par « plateforme ». Faites confirmer ce repère par SiFli au lieu de l'interpréter. La source demande séparément que le signal traverse la TVS avant d'atteindre la puce et que la piste de masse de la TVS reste courte.

![Figure 6.17-1 : Référence de placement de la TVS d'alimentation](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-1 : Référence de placement de la TVS d'alimentation</em></div>

![Figure 6.17-2 : Référence de routage de la TVS](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-2 : Référence de routage de la TVS</em></div>

Pour éviter que le masque de soudure ne recouvre les pastilles et préserver la fiabilité des soudures, placez les vias des pastilles BGA au centre des billes, sans les décaler. Pour améliorer le rendement de fabrication, consultez les figures de référence de raccordement des billes BGA.

![Figure 6.17-3 : Référence de placement des vias BGA](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-3 : Référence de placement des vias BGA</em></div>

![Figure 6.17-4 : Référence de connexion des billes BGA 1](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-4 : Référence de connexion des billes BGA 1</em></div>

![Figure 6.17-5 : Référence de connexion des billes BGA 2](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.17-5 : Référence de connexion des billes BGA 2</em></div>
