---
icon: lucide/list-checks
hide:
    - navigation
description: "Liste de revue d'implantation PCB point par point du MCU SF32LB58x : boîtier, alimentation, horloge, RF, audio, signaux haute vitesse et empilement."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle du SF32LB58x — Liste de contrôle d'implantation du PCB { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "Fait partie du Guide de conception matérielle du SF32LB58x"
    Cette page couvre la section 6.18, la liste de contrôle d'implantation du PCB point par point. Retournez à la page [Conception et routage du PCB](SF32LB58x_pcb_layout.md).

## 6.18. Liste de contrôle d'implantation du PCB { #618-pcb-layout-checklist }

Chaque tableau couvre un domaine de revue du PCB. En l'absence d'une colonne « S'applique à », les contrôles s'appliquent à toutes les conceptions PCB SF32LB58x couvertes par cette liste.

### 6.18.1. Boîtier { #6181-package }

<div align="center"><em>Tableau 6.18.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'empreinte du PCB correspond à la spécification du boîtier | Obligatoire |

</div>

### 6.18.2. Alimentation { #6182-power-supply }

<div align="center"><em>Tableau 6.18.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La piste d'alimentation VDD1 fait au moins 8 mil | Obligatoire |
| 2 | La piste d'alimentation VDD2 fait au moins 8 mil | Obligatoire |
| 3 | Les pistes BUCK1_VSW et BUCK1_VOUT font au moins 8 mil | Obligatoire |
| 4 | Les pistes BUCK2_VSW et BUCK2_VOUT font au moins 8 mil | Obligatoire |
| 5 | La piste d'alimentation VDDIOA fait au moins 10 mil | Obligatoire |
| 6 | La piste d'alimentation VDDIOA2 fait au moins 10 mil | Obligatoire |
| 7 | La piste d'alimentation VDDIOB fait au moins 10 mil | Obligatoire |
| 8 | La piste d'alimentation VDDIOSA fait au moins 6 mil | Obligatoire |
| 9 | La piste d'alimentation VDDIOSB fait au moins 6 mil | Obligatoire |
| 10 | La piste d'alimentation VDDIOSC fait au moins 6 mil | Obligatoire |
| 11 | La piste d'alimentation AVDD33_USB fait au moins 6 mil | Obligatoire |
| 12 | La piste d'alimentation AVDD33_ANA fait au moins 6 mil | Obligatoire |
| 13 | La piste d'alimentation AVDD_BRF a une largeur d'au moins 8 mil | Obligatoire |
| 14 | La piste d'alimentation AVDD33_AUD fait au moins 6 mil | Obligatoire |
| 15 | La piste d'alimentation AVDD33_DSI fait au moins 8 mil | Obligatoire |

</div>

### 6.18.3. Placement des condensateurs et inductances d'alimentation { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tableau 6.18.3-1 : Liste de contrôle du placement des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le condensateur VDD1 est placé près de la broche | Obligatoire |
| 2 | Le condensateur VDD2 est placé près de la broche | Obligatoire |
| 3 | L'inductance BUCK1 est placée près de la puce | Obligatoire |
| 4 | Le condensateur BUCK1 est placé aussi près que possible de la broche de la puce | Obligatoire |
| 5 | L'inductance BUCK2 est placée près de la puce | Obligatoire |
| 6 | Le condensateur BUCK2 est placé aussi près que possible de la broche de la puce | Obligatoire |
| 7 | Le condensateur HPSYS_LDO_VOUT est placé près de la broche | Obligatoire |
| 8 | Le condensateur LPMU_VDD07_RET est placé près de la broche | Obligatoire |
| 9 | Le condensateur LPMU_VDD11_RTC est placé près de la broche | Obligatoire |
| 10 | Le condensateur VDDIOA est placé près de la broche | Obligatoire |
| 11 | Le condensateur VDDIOA2 est placé près de la broche | Obligatoire |
| 12 | Le condensateur VDDIOB est placé près de la broche | Obligatoire |
| 13 | Le condensateur VDDIOSA est placé près de la broche | Obligatoire |
| 14 | Le condensateur VDDIOSB est placé près de la broche | Obligatoire |
| 15 | Le condensateur VDDIOSC est placé près de la broche | Obligatoire |
| 16 | Le condensateur AVDD33_USB est placé près de la broche | Obligatoire |
| 17 | Le condensateur AVDD33_ANA est placé près de la broche | Obligatoire |
| 18 | Le condensateur AVDD_BRF est placé près de la broche | Obligatoire |
| 19 | Le condensateur AVDD33_AUD est placé près de la broche | Obligatoire |
| 20 | Le condensateur AVDD33_DSI est placé près de la broche | Obligatoire |

</div>

### 6.18.4. Horloge { #6184-clock }

<div align="center"><em>Tableau 6.18.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le quartz est placé près de la puce | Obligatoire |
| 2 | Un blindage de masse est appliqué autour du quartz | Obligatoire |
| 3 | Aucun cuivre ne doit être placé sous le quartz. Sur un PCB à 4 couches, la zone d'exclusion doit couvrir au minimum les couches 1 (supérieure), 2 et 3 | Obligatoire |
| 4 | La distance entre les pistes du quartz et le cuivre de garde GND est supérieure à trois fois la largeur de la piste | Obligatoire |

</div>

!!! warning "Confirmez auprès de SiFli les couches d'exclusion du quartz"
    Le classeur de la liste de contrôle demande des zones sans cuivre sur les couches 1, 2 et 3 d'un PCB à quatre couches. Le [guide de conception et routage du PCB](SF32LB58x_pcb_layout.md#65-clock-interface-routing) indique la couche supérieure et la couche adjacente sous chaque zone de quartz. Les sources ne concordent pas sur l'inclusion de la couche 3 ; ne déduisez pas l'exigence finale sans confirmation de SiFli.

### 6.18.5. Boutons { #6185-buttons }

<div align="center"><em>Tableau 6.18.5-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le composant de protection ESD du bouton est placé près du bouton | Obligatoire |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>Tableau 6.18.6-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La piste RF respecte l'exigence d'impédance caractéristique de 50 Ω en mode asymétrique | Obligatoire |
| 2 | La largeur de la piste RF ≥ 10 mil | Obligatoire |
| 3 | Un réseau d'adaptation d'antenne de type π est réservé près de la puce | Obligatoire |
| 4 | Un plan de masse continu est prévu sous le signal RF | Obligatoire |
| 5 | Aucune piste de signal numérique haute vitesse ne passe sous le signal RF | Obligatoire |
| 6 | Aucune piste d'alimentation à fort di/dt ne passe sous le signal RF | Obligatoire |

</div>

### 6.18.7. Audio { #6187-audio }

<div align="center"><em>Tableau 6.18.7-1 : Liste de contrôle audio</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les pistes parallèles AU_ADC1P et AU_ADC1N sont protégées par une garde de masse | Obligatoire |
| 2 | Les pistes parallèles AU_ADC2P et AU_ADC2N sont protégées par une garde de masse | Obligatoire |
| 3 | Les pistes parallèles AU_DAC1P et AU_DAC1N sont protégées par une garde de masse | Obligatoire |
| 4 | Les pistes parallèles AU_DAC2P et AU_DAC2N sont protégées par une garde de masse | Obligatoire |
| 5 | La capacité des pistes AU_DAC1P, AU_DAC1N, AU_DAC2P et AU_DAC2N est &lt; 10 pF et leur longueur &lt; 2 cm | Obligatoire |

</div>

!!! warning "Les sources divergent sur la longueur maximale des pistes DAC"
    Ce classeur indique une longueur de piste DAC inférieure à 2 cm (20 mm), tandis que le [guide de conception et routage du PCB](SF32LB58x_pcb_layout.md#67-audio-interface-routing) indique moins de 2 mm. Ces limites diffèrent d'un facteur dix. Ne choisissez pas de limite sans confirmation de SiFli.

### 6.18.8. Signaux haute vitesse { #6188-high-speed-signals }

<div align="center"><em>Tableau 6.18.8-1 : Liste de contrôle des signaux haute vitesse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les signaux différentiels DSI respectent l'exigence d'impédance différentielle de 100 Ω | Obligatoire |
| 2 | Les paires différentielles de données DSI sont adaptées en longueur à la paire différentielle d'horloge à 200 mil près | Obligatoire |
| 3 | Les signaux DSI sont routés autant que possible sur la même couche | Obligatoire |

</div>

!!! warning "Les sources divergent sur la limite entre paires différentielles DSI"
    Ce classeur demande que les paires différentielles de données DSI soient adaptées à la paire différentielle d'horloge à 200 mil (5,08 mm) près. Le [guide de conception et routage du PCB](SF32LB58x_pcb_layout.md#610-dsi-interface-routing) limite l'écart entre paires à ≤ 2 mm et l'écart au sein d'une paire à ≤ 0,5 mm. Les limites entre paires se contredisent ; confirmez auprès de SiFli la limite inter-paires à appliquer avant de finaliser le routage.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>Tableau 6.18.9-1 : Liste de contrôle ADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Évitez de router des signaux à commutation rapide en parallèle avec le signal GPADC ; si cela ne peut être évité, prévoyez une garde de masse adéquate | Obligatoire |
| 2 | Les résistances du diviseur de tension de batterie sont placées près de la broche d'entrée de la puce | Obligatoire |
| 3 | Évitez de router des signaux à commutation rapide en parallèle avec le signal SDMADC ; si cela ne peut être évité, prévoyez une garde de masse adéquate | Optionnel |

</div>

### 6.18.10. Points de test { #61810-test-points }

<div align="center"><em>Tableau 6.18.10-1 : Liste de contrôle des points de test</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les points de test sont positionnés de façon à permettre l'accès d'une sonde ou leur soudage sur un montage de test | Obligatoire |
| 2 | Les points de test pour le téléchargement du programme et l'étalonnage du quartz (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD, etc.) respectent les exigences de dimensions et d'emplacement du montage de test | Obligatoire |

</div>

### 6.18.11. Empilement PCB { #61811-pcb-stack-up }

<div align="center"><em>Tableau 6.18.11-1 : Liste de contrôle de l'empilement PCB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La couche adjacente à la puce principale doit être un plan de masse principal continu | Obligatoire |

</div>
