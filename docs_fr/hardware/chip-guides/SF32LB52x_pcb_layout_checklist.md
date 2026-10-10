---
icon: lucide/list-checks
hide:
    - navigation
description: "Liste de contrôle de l’implantation et du routage PCB pour le MCU SF32LB52x : boîtier, routage, alimentation et masse."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle SF32LB52x — Liste de contrôle d’implantation et de routage PCB { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre la section 6.15, la liste de contrôle de l’implantation et du routage PCB. Retournez aux [Recommandations d’implantation et de routage PCB](SF32LB52x_pcb_layout.md).

## 6.15. Liste de contrôle d’implantation et de routage PCB { #615-pcb-layout-checklist }

La liste PCB d'origine ne comporte pas de colonne « S'applique à ». Appliquez chaque contrôle uniquement si la variante et le circuit choisis comportent la broche, l'alimentation ou la fonction indiquées ; marquez les fonctions absentes comme non applicables. Conservez les catégories Requis/Optionnel de la source, sans interpréter Optionnel comme une autorisation d'omettre un composant exigé par les spécifications du dispositif.

!!! note "Traitement du cuivre sous le quartz dans la source"
    Le point 3 de la rubrique horloge du classeur de la checklist ne précise pas quelles couches doivent comporter une zone d’exclusion du cuivre. La note d’application des variantes sur batterie se contredit : sa section horloge demande de retirer le plan de masse L2 sous le quartz, tandis que sa section de routage PCB interdit les évidements de plan et découpes de cuivre sur la couche supérieure et les couches adjacentes, et montre une masse L2 continue. Le guide de routage PCB distinct reprend cette interdiction. Confirmez auprès de SiFli le traitement adapté à l’empilement retenu avant validation ; ne le déduisez pas du seul texte de la checklist.

!!! note "Contrôle des largeurs de piste"
    Le classeur indique VCC ≥12 mil, pistes BUCK ≥10 mil et RF ≥10 mil. La section 6 donne des recommandations plus strictes pour VCC et BUCK et recommande RF >10 mil. Respectez les deux ensembles d'exigences applicables, dont l'impédance RF de 50 Ω ; le minimum de la liste ne remplace pas les recommandations détaillées de routage.

### 6.15.1. Boîtier { #6151-package }

<div align="center"><em>Tableau 6.15.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'empreinte PCB correspond aux spécifications du boîtier | Obligatoire |

</div>

### 6.15.2. Routage de l'alimentation { #6152-power-supply-routing }

<div align="center"><em>Tableau 6.15.2-1 : Liste de contrôle du routage de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | <span class="flag-red">Largeur de la piste d'alimentation VBUS ≥16 mil</span> | Obligatoire |
| 2 | <span class="flag-red">Largeur de la piste d'alimentation VBAT ≥16 mil</span> | Obligatoire |
| 3 | <span class="flag-red">Largeur de la piste d'alimentation VCC ≥12 mil</span> | Obligatoire |
| 4 | Largeur de la piste d'alimentation LDO2_OUT ≥10 mil | Obligatoire |
| 5 | Largeur de la piste d'alimentation LDO3_OUT ≥8 mil | Obligatoire |
| 6 | <span class="flag-red">Largeur des pistes PMU_BUCK_VSW et PMU_BUCK_VOUT ≥10 mil</span> | Obligatoire |
| 7 | Largeur de la piste d'alimentation AVDD_BRF ≥8 mil | Obligatoire |
| 8 | <span class="flag-red">Largeur de la piste d'alimentation AVDD33_AUD ≥8 mil</span> | Obligatoire |

</div>

### 6.15.3. Placement des condensateurs et inductances d'alimentation { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tableau 6.15.3-1 : Liste de contrôle du placement des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Condensateur VBUS placé près de la broche | Obligatoire |
| 2 | Condensateur VBAT placé près de la broche | <span class="flag-red">Optionnel</span> |
| 3 | Condensateur VCC placé près de la broche | Obligatoire |
| 4 | Condensateur LDO2_OUT placé près de la broche | <span class="flag-red">Optionnel</span> |
| 5 | Condensateur LDO3_OUT placé près de la broche | <span class="flag-red">Optionnel</span> |
| 6 | Condensateur VSYS placé près de la broche | Obligatoire |
| 7 | Inductance BUCK placée près de la puce | <span class="flag-red">Optionnel</span> |
| 8 | Condensateur de découplage BUCK placé aussi près que possible de la broche de la puce | Obligatoire |
| 9 | Condensateur VDD_HPSYS placé près de la broche | Obligatoire |
| 10 | Condensateur VDD_LPSYS placé près de la broche | Obligatoire |
| 11 | Condensateur VDD_RET placé près de la broche | Obligatoire |
| 12 | Condensateur VDD_RTC placé près de la broche | Obligatoire |
| 13 | Condensateur AVDD_BRF placé près de la broche | Obligatoire |
| 14 | Condensateur AVDD<span class="flag-red">33</span>_AUD placé près de la broche | Obligatoire |

</div>

### 6.15.4. Horloge { #6154-clock }

<div align="center"><em>Tableau 6.15.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Quartz placé près de la puce | Obligatoire |
| 2 | Blindage GND appliqué autour du quartz | Obligatoire |
| 3 | Confirmer auprès de SiFli le traitement du cuivre autour du quartz pour l’empilement retenu ; voir la note ci-dessus sur les divergences de sources | Obligatoire |
| 4 | L’écart entre le bord de chaque piste du quartz et le cuivre GND adjacent dépasse 1,5 fois la largeur de piste | Obligatoire |
| 5 | Espacement ≥0,15 mm entre les pistes XI/XO parallèles du quartz 32,768 kHz | Obligatoire |

</div>

### 6.15.5. Boutons { #6155-buttons }

<div align="center"><em>Tableau 6.15.5-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Dispositif de protection ESD du bouton placé près du bouton | Obligatoire |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>Tableau 6.15.6-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La piste RF respecte l'exigence d'impédance caractéristique asymétrique de 50 Ω | Obligatoire |
| 2 | Largeur de piste RF ≥10 mil | Obligatoire |
| 3 | Prévoir au moins 60 mil de cuivre de masse de chaque côté de la piste RF et suffisamment de vias pour le relier à la masse principale | Obligatoire |
| 4 | Réseau d'adaptation d'antenne en π réservé, placé du côté de la puce | Obligatoire |
| 5 | Plan de masse GND continu sous le signal RF | Obligatoire |
| 6 | Aucune piste de signal numérique haute vitesse ne traverse sous le signal RF | Obligatoire |
| 7 | Aucune piste d'alimentation à di/dt élevé ne traverse sous le signal RF | Obligatoire |

</div>

### 6.15.7. Audio { #6157-audio }

<div align="center"><em>Tableau 6.15.7-1 : Liste de contrôle audio</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | ADCP bénéficie d'un blindage de masse tridimensionnel | Obligatoire |
| 2 | DACP/DACN sont routés en paire différentielle avec un blindage de masse tridimensionnel | Obligatoire |
| 3 | Les pistes DACP/DACN sont assez courtes pour que la capacité parasite reste inférieure à 10 pF | Obligatoire |
| 4 | Les pistes d'alimentation AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD sont protégées par une garde de masse et éloignées des signaux à fort courant et fortement perturbateurs | Obligatoire |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>Tableau 6.15.8-1 : Liste de contrôle ADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Aucun signal haute vitesse ne doit longer le signal GPADC sans garde de masse | Obligatoire |

</div>

### 6.15.9. Points de test { #6159-test-points }

<div align="center"><em>Tableau 6.15.9-1 : Liste de contrôle des points de test</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les emplacements des points de test conviennent à la prise de mesure ou au soudage sur montage de test | Obligatoire |
| 2 | Les points de test de téléchargement de programme (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34, etc.) respectent les exigences de taille et d'emplacement du montage de test | Obligatoire |

</div>

### 6.15.10. Masse { #61510-ground }

<div align="center"><em>Tableau 6.15.10-1 : Liste de contrôle de la masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les couches adjacentes à la puce principale forment un plan de masse principal complet, avec suffisamment de vias de mise à la masse | Obligatoire |
| 2 | La pastille exposée (EPAD) est connectée à la masse principale par des vias | Obligatoire |
| 3 | La zone sous la puce comporte suffisamment de vias de mise à la masse connectés au plan de masse principal | Obligatoire |
| 4 | <span class="flag-red">Un anneau de vias de mise à la masse fait le tour du bord de la carte</span> | Obligatoire |

</div>
