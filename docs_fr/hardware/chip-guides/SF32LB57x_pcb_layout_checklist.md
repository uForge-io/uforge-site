---
icon: lucide/list-checks
hide:
    - navigation
description: "Liste de contrôle détaillée de la conception du PCB du MCU SF32LB57x : boîtier, alimentation, horloge, RF, affichage, audio et GPADC."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle SF32LB57x — Liste de contrôle de la conception du PCB { #sf32lb57x-hardware-design-guide-pcb-layout-checklist }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Cette page correspond à la section 6.10 et reprend les points de contrôle détaillés de l'implantation et du routage du PCB, issus des tableaux officiels d'autocontrôle de conception de SiFli. Revenez aux [recommandations de placement et de routage PCB](SF32LB57x_pcb_layout.md).

## 6.10. Liste de contrôle de la conception du PCB { #610-pcb-layout-checklist }

La plupart des règles de routage ci-dessous s'appliquent à toutes les variantes du SF32LB57x. Lorsque la piste concernée n'existe que dans une famille de variantes donnée, la colonne « S'applique à » limite le point de contrôle aux variantes alimentées par batterie ou en 3,3 V.

### 6.10.1. Boîtier { #6101-package }

<div align="center"><em>Tableau 6.10.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'empreinte du PCB est conforme aux spécifications du boîtier indiquées dans la fiche technique | Toutes les variantes | Obligatoire |

</div>

### 6.10.2. Routage de l'alimentation { #6102-power-supply-routing }

<div align="center"><em>Tableau 6.10.2-1 : Liste de contrôle du routage de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Largeur de la piste d'alimentation `VBUS` ≥16 mil | Variantes alimentées par batterie | Obligatoire |
| 2 | Largeur de la piste d'alimentation `VBAT` ≥16 mil | Variantes alimentées par batterie | Obligatoire |
| 3 | Largeur de la piste d'alimentation `VCC` ≥12 mil | Variantes alimentées par batterie | Obligatoire |
| 4 | Largeur de la piste d'alimentation `VDD33_VOUT1` ≥10 mil | Variantes alimentées par batterie | Obligatoire |
| 5 | Largeur de la piste d'alimentation `VDD33_VOUT2` ≥10 mil (le titre du point 46 de la source répète `VDD33_VOUT1`) | Variantes alimentées par batterie | Obligatoire |
| 6 | Largeur de la piste d'alimentation `PVDD` ≥12 mil (le détail du point 47 de la source indique `VCC`) | Variantes alimentées en 3,3 V | Obligatoire |
| 7 | Largeur de la piste d'alimentation `VDDIOA` ≥10 mil | Variantes alimentées en 3,3 V | Obligatoire |
| 8 | Largeur des pistes `BUCK_LX`/`BUCK_FB` ≥10 mil ; elles doivent être aussi courtes que possible | Toutes les variantes | Obligatoire |
| 9 | Largeur de la piste d'alimentation `AVDD_BRF` ≥8 mil | Toutes les variantes | Obligatoire |
| 10 | Largeur de la piste d'alimentation `AVDD33_AUD` ≥8 mil | Toutes les variantes | Obligatoire |

</div>

!!! warning "Conflits non résolus sur les rails d'alimentation dans la source"
    - **Désignations de la liste :** Le point 44 de la table d'autocontrôle originale 4-2-1-1, applicable aux variantes sur batterie, exige `VCC` >= 12 mil. Les points 45 et 46 exigent chacun au moins 10 mil pour `VDD33_VOUT1` et `VDD33_VOUT2`, respectivement, mais le titre du point 46 répète `VDD33_VOUT1` alors que son détail indique `VDD33_VOUT2`. Le point 47, applicable aux variantes 3,3 V, porte le titre `PVDD`, mais son détail exige `VCC` >= 12 mil. Cette page reprend les valeurs et détails indiqués sans résoudre les incohérences de la source.
    - **Largeur des pistes :** La section 3.2.1 du guide PCB original exige au moins 0,4 mm (environ 15,7 mil) pour `VCC` et `PVDD` ; les points 44 (variantes sur batterie) et 47 (variantes 3,3 V) de la table 4-2-1-1 exigent `VCC` >= 12 mil. La source n'explique pas comment concilier ces exigences selon la variante ni si, pour le point 47, le titre `PVDD` ou le détail `VCC` prévaut. Ne déduisez pas de valeur corrigée et ne choisissez pas une référence comme exigence définitive sans confirmation.
    - **Noms des sorties :** La section 3.2.1 du guide PCB original utilise `VDD_VOUT1` / `VDD_VOUT2`, tandis que les points 45/46 de la table d'autocontrôle 4-2-1-1 utilisent `VDD33_VOUT1` / `VDD33_VOUT2`. La source ne précise pas si ces noms sont des alias ou des réseaux distincts.
    Avant de figer la conception, faites confirmer par SiFli les désignations prévues, les rails cibles, les variantes d'alimentation concernées et les largeurs de piste. Sans cette confirmation, n'affectez pas les désignations contradictoires de la liste à des réseaux, ne considérez pas les variantes de noms de sortie comme équivalentes et ne choisissez pas entre 12 mil et 0,4 mm.

### 6.10.3. Implantation et routage du circuit d'horloge { #6103-clock-layout }

<div align="center"><em>Tableau 6.10.3-1 : Liste de contrôle de la disposition d'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les quartz sont placés près des broches de quartz correspondantes de la puce afin de raccourcir les pistes | Toutes les variantes | Obligatoire |
| 2 | Le composant quartz et les pistes de l'oscillateur ont un blindage GND complet | Toutes les variantes | Obligatoire |
| 3 | Une zone sans cuivre est prévue sous le quartz : sur la carte PTH à 4 couches, seule la couche supérieure doit être dégagée ; sur la carte HDI à 6 couches, les couches supérieure et 2 doivent l'être | Toutes les variantes | Obligatoire |
| 4 | L'écart entre les pistes de signal de l'oscillateur et le cuivre GND environnant doit dépasser 1,5 fois la largeur de piste | Toutes les variantes | Obligatoire |
| 5 | L'écart entre les pistes parallèles du quartz 32,768 kHz doit dépasser deux fois la largeur de piste de référence | Toutes les variantes | Obligatoire |

</div>

!!! warning "Conflits non résolus dans les consignes source de routage du quartz"
    - **Plan de masse et zone sans cuivre :** La section 3.3 du guide PCB demande un plan de référence continu dans la zone du quartz ainsi qu'une zone sans cuivre sur TOP autour du quartz. La figure 3-3-1 (reproduite ici en figure 6.9-30) indique un dégagement d'au moins 0,25 mm autour du boîtier. Or, les points 6 et 7 du tableau d'autocontrôle original 4-3-1 demandent respectivement un blindage GND complet autour du quartz et des pistes d'oscillateur, et l'absence de cuivre sous le quartz uniquement sur TOP pour un PCB PTH à 4 couches, puis sur TOP et la couche 2 pour un HDI à 6 couches. La source ne délimite pas la zone blindée par rapport à la zone sans cuivre et n'explique pas comment appliquer l'exigence de masse continue dans les couches interdites selon l'empilement. Ce conflit de portée reste non résolu ; ne déduisez pas la disposition de cuivre ou de masse couche par couche.
    - **Espacement des pistes à 32,768 kHz :** La section 3.3 du guide PCB et le modèle de routage de la figure 3-3-4 (reproduite ici en figure 6.9-33) spécifient au moins 0,15 mm entre les pistes parallèles `32K_XI` / `32K_XO`. Le point 9 du tableau d'autocontrôle original 4-3-1 exige plus de deux fois la largeur de piste de base, soit plus de 0,2 mm pour la piste de 0,1 mm indiquée dans le guide. Ces exigences minimales d'espacement sont contradictoires.
    - **Portée du dégagement autour du boîtier :** La figure 3-3-1 (reproduite ici en figure 6.9-30) spécifie au moins 0,25 mm de dégagement de cuivre TOP autour du boîtier. Le point 7 du tableau d'autocontrôle 4-3-1 précise séparément les couches sans cuivre sous le quartz pour les deux empilements, sans expliquer le rapport entre ce dégagement périphérique et les zones sous le boîtier ou les interdictions de routage sur les couches adjacentes.
    Ces conflits et imprécisions de portée restent non résolus dans les documents source de SiFli. Avant de figer le routage, faites confirmer les exigences pour le boîtier et l'empilement réels ; ne choisissez pas entre les espacements et ne déduisez pas les limites de masse ou de zone sans cuivre couche par couche.

### 6.10.4. Implantation et routage RF { #6104-rf-layout }

<div align="center"><em>Tableau 6.10.4-1 : Liste de contrôle de la disposition RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'impédance de chaque piste RF est contrôlée sur le PCB, avec une cible de 50 Ω en configuration asymétrique (single-ended) | Toutes les variantes | Obligatoire |
| 2 | Le cuivre de masse des deux côtés de la piste RF a une largeur d'au moins 60 mil et est connecté au plan de masse principal via plusieurs vias | Toutes les variantes | Obligatoire |
| 3 | Le réseau d'adaptation en π réservé est placé près de la broche RF de la puce | Toutes les variantes | Obligatoire |
| 4 | Une couche de blindage GND continue et ininterrompue passe directement sous la piste de signal RF | Toutes les variantes | Obligatoire |
| 5 | Aucune piste de signal numérique haute vitesse ne passe directement sous la piste de signal RF | Toutes les variantes | Obligatoire |
| 6 | Aucune piste de signal liée à l'alimentation avec de grandes variations de courant ne passe directement sous la piste de signal RF | Toutes les variantes | Obligatoire |

</div>

### 6.10.5. Routage des signaux d'affichage { #6105-display-routing }

<div align="center"><em>Tableau 6.10.5-1 : Liste de contrôle du routage d'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La piste d'horloge de l'affichage comporte une résistance série ≤ 50 Ω. Une empreinte non montée est réservée pour un condensateur en dérivation, afin de pouvoir configurer un réseau RC pour réduire les EMI | Toutes les variantes | Obligatoire |
| 2 | Les pistes de signal d'affichage haute vitesse sont de préférence routées sur les couches internes ; le connecteur d'affichage et la nappe FPC sont maintenus à l'écart de la zone d'antenne RF | Toutes les variantes | Obligatoire |

</div>

### 6.10.6. Routage audio { #6106-audio-routing }

<div align="center"><em>Tableau 6.10.6-1 : Liste de contrôle du routage audio</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La zone de routage `ADCP` est entourée d'un blindage GND pour supprimer les interférences électromagnétiques externes | Toutes les variantes | Obligatoire |
| 2 | `DACP`/`DACN` sont routées comme une paire différentielle strictement appariée en longueur ; leur zone de routage est entourée d'un blindage GND | Toutes les variantes | Obligatoire |
| 3 | La longueur totale des pistes `DACP`/`DACN` est contrôlée pour que la capacité parasite reste inférieure à 10 pF | Toutes les variantes | Obligatoire |
| 4 | Les pistes d'alimentation analogique `AVDD_BRF`/`AVDD33_AUD` sont blindées par GND et éloignées des pistes parcourues par un courant élevé ainsi que des pistes de signaux générant de fortes perturbations | Toutes les variantes | Obligatoire |

</div>

### 6.10.7. Routage GPADC { #6107-gpadc-routing }

<div align="center"><em>Tableau 6.10.7-1 : Liste de contrôle du routage GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les pistes analogiques du GPADC sont éloignées des pistes de signal haute vitesse parallèles ; leur zone de routage est blindée par GND pour éviter que le bruit numérique ne dégrade la précision d'échantillonnage | Toutes les variantes | Obligatoire |

</div>
