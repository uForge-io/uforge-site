---
icon: lucide/layers
hide:
    - navigation
description: "Directives d'implantation et de routage du PCB du microcontrôleur SF32LB55x : empreinte, empilage des couches, règles générales, routage des interfaces et liste de contrôle détaillée."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB55x — Implantation et routage du PCB { #sf32lb55x-hardware-design-guide-pcb-layout-guidelines }

## 6. Implantation et routage du PCB { #6-pcb-layout-guidelines }

### 6.1. Empreinte et empilage des couches { #61-footprint-and-stack-up }

Utilisez le dessin du boîtier, respectez les exigences relatives au motif des pastilles et tenez compte des capacités d'assemblage du boîtier QFN ou BGA sélectionné. Pour un boîtier BGA, confirmez tôt le fan-out des billes, la stratégie de vias, les règles de masque de soudure et les limites de fabrication.

#### 6.1.1. Références d'empilage et de fabrication { #611-stack-up-and-fabrication }

SiFli recommande un procédé PTH conventionnel et un circuit imprimé à quatre couches pour les QFN68L et BGA145. Pour le BGA169, la référence recommande un HDI à un niveau avec vias borgnes/enterrés. Les empilages illustrés à quatre et six couches ont une épaisseur finie de 0,7 mm ±10 %. Ce sont des constructions de référence, et non des limites universelles ; confirmez le dessin du boîtier, l'épaisseur finie et les capacités de fabrication auprès du fabricant du PCB.

<div align="center"><em>Tableau 6.1-1 : Empilage PTH de référence à quatre couches</em></div>

<div align="center" markdown>

| Couche / matériau | Surface de cuivre supposée | Type de matériau | Dk | DF | Épaisseur théorique (mil) | Épaisseur théorique (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Masque de soudure supérieur | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Cuivre + métallisation L1 | - | Cuivre + métallisation | - | - | 0.048 | 0.001219 |
| Préimprégné | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| Cuivre L2 | - | Cuivre | - | - | 0.07 | 0.001778 |
| Noyau | 70% | Non indiqué dans la figure source | 4 | 0.017 | 16.1 | 0.408941 |
| Cuivre L3 | - | Cuivre | - | - | 0.07 | 0.001778 |
| Préimprégné | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| Cuivre + métallisation L4 | - | Cuivre + métallisation | - | - | 0.048 | 0.001219 |
| Masque de soudure inférieur | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Total théorique | - | - | - | - | 26.736 | 0.679096 |

</div>

La figure source indique une épaisseur finie de 0,7 mm ±10 %, métallisation et masque de soudure compris. Elle donne 0,048 mil (0,001219 mm) pour l'épaisseur cuivre + métallisation de L1/L4 et 0,07 mil (0,001778 mm) pour le cuivre de L2/L3. Ces valeurs diffèrent nettement de la notation usuelle des épaisseurs de cuivre pour PCB. Elles sont retranscrites telles qu'indiquées, sans constituer des cibles de fabrication ; faites-les confirmer par écrit par SiFli et le fabricant du PCB avant toute utilisation.

<div align="center"><em>Tableau 6.1-2 : Empilage HDI de référence à six couches</em></div>

<div align="center" markdown>

| Couche / matériau | Surface de cuivre supposée | Type de matériau | Dk | DF | Épaisseur théorique (mil) | Épaisseur théorique (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Masque de soudure supérieur | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Cuivre + métallisation L1 | - | Cuivre + métallisation | - | - | 1.2 | 0.03048 |
| Préimprégné | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| Cuivre L2 | - | Cuivre | - | - | 0.7 | 0.01778 |
| Préimprégné | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| Cuivre L3 | - | Cuivre | - | - | 0.7 | 0.01778 |
| Noyau | 70% | FR-4 CORE | 4.43 | 0.017 | 4 | 0.1016 |
| Cuivre L4 | - | Cuivre | - | - | 0.7 | 0.01778 |
| Préimprégné | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| Cuivre L5 | - | Cuivre | - | - | 0.7 | 0.01778 |
| Préimprégné | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| Cuivre + métallisation L6 | - | Cuivre + métallisation | - | - | 1.2 | 0.03048 |
| Masque de soudure inférieur | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Total théorique | - | - | - | - | 24.8 | 0.629921 |

</div>

La figure source indique une épaisseur finie de 0,7 mm ±10 % pour le circuit imprimé HDI à six couches, métallisation et masque de soudure compris. L'empilage, les paramètres diélectriques et l'épaisseur théorique sont des références ; faites-les vérifier par le fabricant du PCB selon les matériaux, épaisseurs de cuivre et exigences d'impédance réels.

#### 6.1.2. Dimensions des motifs de pastilles { #612-land-pattern-dimensions }

- BGA145/BGA169 : billes de 0,25 mm de diamètre au pas de 0,5 mm ; le motif de référence indique une ouverture de masque de soudure de 0,33 mm et une ouverture de pâte de 0,25 mm.
- QFN68L : pastilles périphériques de 0,2 × 0,55 mm au pas de 0,35 mm ; la référence indique une ouverture de masque de 0,3 × 0,65 mm et une ouverture de pâte de 0,2 × 0,55 mm. La pastille exposée mesure 5,49 mm de côté nominalement, dans une plage de 5,39 à 5,59 mm.

Avant de libérer l'empreinte, vérifiez le dessin du boîtier et les règles de pochoir et de masque de soudure de l'assembleur.

### 6.2. Règles PCB générales { #62-general-pcb-rules }

- Gardez les boucles BUCK courtes et larges, avec un courant de retour proche de la boucle de commutation.
- Éloignez les zones RF, cristal, GPADC et audio des alimentations à commutation, des horloges d'affichage, des moteurs et des chargeurs.
- Routez les interfaces mémoire et d'affichage haute vitesse au-dessus d'un plan de masse de référence continu.
- Placez la protection ESD près des connecteurs et routez les signaux d'abord à travers le dispositif de protection.
- Prévoyez suffisamment de points de test pour l'alimentation, le démarrage, le débogage, la RF et l'étalonnage de production.

#### 6.2.1. Distances de fabrication { #621-fabrication-clearances }

Les valeurs suivantes sont retranscrites des figures de règles de référence PTH et HDI à six couches de SiFli. Elles ne remplacent pas les règles actuelles du fabricant pour l'empilage retenu.

<div align="center"><em>Tableau 6.2-1 : Distances de référence PTH et HDI à six couches</em></div>

<div align="center" markdown>

| Règle / distance | PTH à quatre couches (mm) | HDI à six couches (mm) |
|:---|---:|---:|
| Largeur de piste : minimum / recommandée | 0.10 / 0.10 | 0.075 / 0.075 |
| Largeur de piste : maximum | 2.54 | 2.54 |
| Piste-piste, piste-via, via-via | 0.10 | 0.075 |
| Pastille/SMD-piste ou via | 0.10 | 0.075 |
| Pastille-pastille ou SMD-pastille | 0.10 | 0.10 |
| Cuivre-piste, via, pastille ou SMD | 0.127 | 0.10 |
| Cuivre-cuivre | 0.15 | 0.15 |
| Bord de carte-piste, via, pastille, SMD ou cuivre | 0.25 | 0.20 |
| Perçage-piste ou via | 0.10 | 0.075 |
| Perçage-pastille, SMD ou cuivre | 0.10 | 0.10 |
| Perçage-perçage ; corps de composant-corps de composant | 0.10 | 0.10 |

</div>

Dans la matrice de distances entre éléments d'un même réseau des figures source, seules certaines cellules indiquent 0 mm ; les cellules vides ne sont pas spécifiées. N'en déduisez pas que les combinaisons non indiquées autorisent également 0 mm. Confirmez toutes les règles auprès du fabricant avant de figer le routage.

#### 6.2.2. Implantation de l'alimentation et de la masse { #622-power-and-ground-layout }

- Placez les inductances et condensateurs DC-DC près de leurs broches. Gardez BUCK_VSW court et large, réduisez la surface de boucle, reliez la masse des condensateurs de sortie au plan par plusieurs vias et donnez à la piste de rétroaction de BUCK_VOUT une largeur supérieure à 0,25 mm. Ne placez ni cuivre de surface ni piste sans rapport sous une inductance ; réservez un plan de masse continu sur la couche adjacente.
- Placez les condensateurs de PVDD_PMU1 (broche 67) près de la broche et utilisez une piste d'au moins 0,3 mm de large. Placez les condensateurs LDO/IO près de leurs broches respectives ; dimensionnez les pistes selon le courant de charge et gardez-les courtes et larges lorsque l'ondulation ou la stabilité est sensible.
- Reliez directement la pastille exposée du QFN à la masse principale par plusieurs vias, en particulier près des zones RF et PMU. Pour les BGA145 et BGA169, les billes de masse RF sont C12, C13, D12 et E13 ; reliez-les à la masse principale conformément à la [carte de billes BGA145](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-Ballmap.svg), aux [cartes BGA169 pour le composant 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg) et [pour le composant 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg). D2 et B3 sont des billes de masse PMU sur BGA169 ; sur BGA145, D2 correspond à PA79 et B3 à BUCK2_VOUT. Ne reliez pas des billes de masse distinctes entre elles par du cuivre de surface.

**Précision d'après la figure source :** Le texte source répète E13 dans sa liste des billes de masse RF. La [figure des masses RF](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-RF-VSS-PCB.png) indique AVSS_TRF en C13, AVSS_RRF en E13, AVSS_BB en C12 et AVSS_VCO en D12. Les coordonnées ci-dessus suivent les libellés de la figure ; vérifiez-les dans la carte de billes du boîtier choisi avant le routage.

#### 6.2.3. EMI, ESD et protection { #623-emi-esd-and-protection }

Lorsque c'est possible, placez les horloges et les pistes d'alimentation bruyantes sur les couches internes. Placez les composants ESD près du connecteur afin que chaque signal passe par la protection avant d'entrer sur la carte, sans dérivation ; utilisez une connexion de masse courte et large avec un via direct vers le plan. Pour la charge USB, placez le point de test côté connecteur par rapport à la TVS. À l'entrée batterie, placez la TVS entre le connecteur et la charge de la carte afin que le trajet vers la puce passe d'abord par la TVS, et gardez sa connexion de masse courte.

### 6.3. Routage des interfaces { #63-interface-routing }

Les pistes d'horloge doivent être courtes, blindées et isolées des signaux numériques rapides. La ligne RF doit être conçue pour une impédance de 50 Ω avec un réseau d'adaptation compact. Les pistes mémoire et d'affichage doivent avoir une longueur contrôlée selon leur vitesse et être regroupées par bus. Les signaux audio et GPADC doivent être blindés et éloignés des courants de commutation.

#### 6.3.1. Implantation et routage des cristaux { #631-crystal-placement-and-routing }

- Placez chaque cristal dans la zone blindée, à plus de 1 mm du bord du circuit et à plus de 5 mm des sources de chaleur telles que le PA, le chargeur et le PMU. Maintenez un dégagement d'au moins 0,25 mm autour du cristal.
- Routez les pistes du quartz 48 MHz sur la couche supérieure, sur une longueur de 3 à 10 mm et avec une largeur de 0,1 mm. Espacez 48M_XI et 48M_XO d'au moins 0,15 mm, comme indiqué dans le [modèle de routage source](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png), et blindez-les par la masse en trois dimensions. Éloignez-les de VBAT, du DC-DC et des signaux rapides. Le texte source demande une zone sans cuivre sur les couches supérieure et adjacente sous la zone du quartz, et interdit le passage de pistes sans rapport dans cette zone.
- Routez les pistes du quartz 32,768 kHz sur la couche supérieure, sur une longueur maximale de 10 mm et avec une largeur de 0,1 mm. Espacez XI et XO d'au moins 0,15 mm et blindez-les par la masse en trois dimensions. Le texte source demande une zone sans cuivre sur les couches supérieure et adjacente sous la zone du quartz, et interdit le passage de pistes sans rapport dans cette zone.

#### 6.3.2. RF et interfaces à haut débit { #632-rf-and-high-speed-interfaces }

Placez le réseau d'adaptation RF près de la puce, et non de l'antenne. Placez le condensateur AVDD_BRF près de sa broche et reliez sa masse directement à la masse principale. Routez la RF sur la couche supérieure sans changement de couche et contrôlez son impédance à 50 Ω. Le texte source recommande une largeur supérieure à 10 mil, tandis que la liste de contrôle impose au moins 10 mil. Distinguez cette recommandation du minimum obligatoire, puis déterminez la largeur finale pour obtenir 50 Ω avec l'empilage choisi. Utilisez un blindage de masse tridimensionnel et des vias de couture des deux côtés ; évitez les angles vifs et éloignez du domaine RF le DC-DC, VBAT, les horloges et les liaisons I2C/SPI/SDIO/I2S/UART à haut débit.

Routez MIPI_DSI en paires différentielles de 100 Ω et égalisez la longueur des paires de données par rapport à la paire d'horloge. Égalisez aussi les longueurs des bus OPI PSRAM et LCDC SPI/QSPI. Lorsque c'est possible, protégez les pistes d'horloge et I2C par la masse et évitez les longs parcours parallèles à des signaux sans rapport.

#### 6.3.3. Routage analogique { #633-analog-routing }

Blindez les pistes GPADC par la masse en trois dimensions et éloignez-les des chemins bruyants de tension batterie et de mesure de température. Vérifiez l'impédance du diviseur et les fuites en fonction du temps d'établissement requis.

### 6.4. Liste de contrôle d'implantation et de routage du PCB { #64-pcb-layout-checklist }

Chaque tableau ci-dessous couvre un domaine de revue de l'implantation et du routage du PCB. Lorsqu'une colonne « S'applique à » n'est pas présente, la ligne s'applique à toutes les variantes couvertes par le classeur.

#### 6.4.1. Boîtier { #641-package }

<div align="center"><em>Tableau 6.4-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'empreinte correspond à la spécification du boîtier | Toutes les variantes | Obligatoire |

</div>

#### 6.4.2. Alimentation { #642-power-supply }

<div align="center"><em>Tableau 6.4-2 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La piste d'alimentation VDD1 a une largeur d'au moins 8 mil | Toutes les variantes | Obligatoire |
| 2 | La piste d'alimentation VDD2 a une largeur d'au moins 8 mil | 555 uniquement | Obligatoire |
| 3 | Les pistes BUCK1_VSW et BUCK1_VOUT ont une largeur d'au moins 8 mil | Toutes les variantes | Obligatoire |
| 4 | Les pistes BUCK2_VSW et BUCK2_VOUT ont une largeur d'au moins 8 mil | 555 uniquement | Obligatoire |
| 5 | La piste LDOVCC2_VOUT a une largeur d'au moins 8 mil | 555 uniquement | Optionnel |
| 6 | La piste d'alimentation AVDD_DSI a une largeur d'au moins 8 mil | 555 uniquement | Obligatoire |
| 7 | La piste d'alimentation VDD_SIP a une largeur d'au moins 6 mil | Toutes les variantes | Obligatoire |
| 8 | La piste d'alimentation VDDIOA a une largeur d'au moins 10 mil | Toutes les variantes | Obligatoire |
| 9 | La piste d'alimentation VDDIOB a une largeur d'au moins 10 mil | Toutes les variantes | Obligatoire |

</div>

#### 6.4.3. Placement des condensateurs et inductances d'alimentation { #643-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tableau 6.4-3 : Liste de contrôle du placement des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le condensateur VDD1 est placé près de la broche | Toutes les variantes | Obligatoire |
| 2 | Le condensateur VDD2 est placé près de la broche | 555 uniquement | Obligatoire |
| 3 | L'inductance BUCK1 est placée près de la puce | Toutes les variantes | Obligatoire |
| 4 | Le condensateur BUCK1 est placé aussi près que possible de la broche de la puce | Toutes les variantes | Obligatoire |
| 5 | L'inductance BUCK2 est placée près de la puce | 555 uniquement | Obligatoire |
| 6 | Le condensateur de 0,1 µF sur AVDD_DSI est placé près de la broche | 555 uniquement | Obligatoire |
| 7 | Le condensateur LDO_VOUT1 est placé près de la broche | Toutes les variantes | Obligatoire |
| 8 | Le condensateur LDO_VOUT2 est placé près de la broche | Toutes les variantes | Obligatoire |
| 9 | Le condensateur VDD_RET est placé près de la broche | Toutes les variantes | Obligatoire |
| 10 | Le condensateur VDD_RTC est placé près de la broche | Toutes les variantes | Obligatoire |
| 11 | Le condensateur VDD_SIP est placé près de la broche | Toutes les variantes | Obligatoire |
| 12 | Le condensateur AVDD33 est placé près de la broche | Toutes les variantes | Obligatoire |
| 13 | Le condensateur AVDD_BRF est placé près de la broche | Toutes les variantes | Obligatoire |
| 14 | Le condensateur VDDIOA est placé près de la broche | Toutes les variantes | Obligatoire |
| 15 | Le condensateur VDDIOB est placé près de la broche | Toutes les variantes | Obligatoire |

</div>

#### 6.4.4. Horloge { #644-clock }

<div align="center"><em>Tableau 6.4-4 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le cristal est placé près de la puce | Toutes les variantes | Obligatoire |
| 2 | Un blindage GND est appliqué autour du cristal | Toutes les variantes | Obligatoire |
| 3 | La liste de contrôle demande une zone sans cuivre sous le cristal : la couche supérieure sur une carte 4 couches, et aussi les couches 2 et 3 si nécessaire | Toutes les variantes | Obligatoire |
| 4 | La distance entre la piste du cristal et le cuivre de garde GND est supérieure à 3× la largeur de la piste | Toutes les variantes | Obligatoire |
| 5 | Le signal du cristal 32 kHz ne longe pas BUCK1 en parallèle ; une masse est placée entre les deux | Toutes les variantes | Obligatoire |

</div>

**Précision sur la source :** Le texte source demande une zone sans cuivre sur les couches supérieure et adjacente sous la zone du quartz ; la liste de contrôle cite la couche supérieure sur une carte 4 couches, puis les couches 2 et 3 si nécessaire. Le [modèle de routage 48 MHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) et le [modèle 32,768 kHz](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-32K-M-PCB.png) représentent tous deux un plan de masse L2 sous les pistes XI/XO. La source ne précise pas si la zone sans cuivre se limite à l'empreinte du quartz ou englobe aussi le routage, ni comment concilier les couches indiquées. Confirmez la zone sans cuivre requise auprès de SiFli avant la fabrication ; ne la déduisez pas.

#### 6.4.5. Boutons { #645-buttons }

<div align="center"><em>Tableau 6.4-5 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le dispositif de protection ESD du bouton est placé près du bouton | Toutes les variantes | Obligatoire |

</div>

#### 6.4.6. RF { #646-rf }

<div align="center"><em>Tableau 6.4-6 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La piste RF respecte l'exigence d'une impédance caractéristique de 50 Ω en configuration asymétrique (single-ended) | Toutes les variantes | Obligatoire |
| 2 | Largeur de la piste RF ≥ 10 mil | Toutes les variantes | Obligatoire |
| 3 | Prévoir de chaque côté de la piste RF une bande de cuivre GND d'au moins 60 mil de largeur, reliée au plan GND principal par suffisamment de vias de couture | Toutes les variantes | Obligatoire |
| 4 | Réserver près de la puce l'emplacement d'un réseau d'adaptation d'antenne en pi | Toutes les variantes | Obligatoire |
| 5 | Plan de masse GND continu sous le signal RF | Toutes les variantes | Obligatoire |
| 6 | Aucune piste de signal numérique haute vitesse ne croise sous le signal RF | Toutes les variantes | Obligatoire |
| 7 | Aucune piste d'alimentation à di/dt élevé ne croise sous le signal RF | Toutes les variantes | Obligatoire |

</div>

#### 6.4.7. Signaux haute vitesse { #647-high-speed-signals }

<div align="center"><em>Tableau 6.4-7 : Liste de contrôle des signaux haute vitesse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les signaux différentiels DSI respectent l'exigence d'impédance différentielle de 100 Ω | 555 uniquement | Obligatoire |
| 2 | Les paires différentielles de données DSI sont adaptées en longueur à la paire différentielle d'horloge à moins de 200 mil | 555 uniquement | Obligatoire |
| 3 | Les signaux DSI sont routés autant que possible sur la même couche | 555 uniquement | Obligatoire |
| 4 | L'adaptation de longueur des pistes de signal OPI PSRAM est contrôlée à moins de 200 mil | 555 uniquement | Optionnel |

</div>

#### 6.4.8. ADC { #648-adc }

<div align="center"><em>Tableau 6.4-8 : Liste de contrôle de l'ADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Aucun signal à commutation rapide ne doit être routé en parallèle du signal GPADC, sauf si une garde appropriée est prévue | Toutes les variantes | Obligatoire |
| 2 | Les résistances du diviseur de tension de batterie sont placées près de la broche d'entrée de la puce | Toutes les variantes | Obligatoire |
| 3 | Le signal de mesure de la tension de la batterie doit être prélevé au connecteur de batterie et protégé par une piste de garde reliée à la masse | Toutes les variantes | Obligatoire |
| 4 | Aucun signal à commutation rapide ne doit être routé en parallèle du signal SDMADC, sauf si une garde appropriée est prévue | 555 uniquement | Optionnel |

</div>

#### 6.4.9. Points de test { #649-test-points }

<div align="center"><em>Tableau 6.4-9 : Liste de contrôle des points de test</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les points de test sont accessibles à une sonde ou peuvent être soudés sur un dispositif de test | Toutes les variantes | Obligatoire |
| 2 | Les pastilles de test de téléchargement de programme et d'étalonnage du quartz (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD, etc.) doivent avoir un diamètre d'au moins 0,8 mm, être espacées de 2 mm et disposer d'une zone sans composant de 2 mm autour d'elles | Toutes les variantes | Obligatoire |

</div>

#### 6.4.10. Masse { #6410-ground }

<div align="center"><em>Tableau 6.4-10 : Liste de contrôle de la masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les couches adjacentes à la puce principale forment un plan de masse principal complet, avec suffisamment de vias de masse | Toutes les variantes | Obligatoire |
| 2 | La pastille exposée (EPAD) est connectée à la masse principale par des vias | Toutes les variantes | Obligatoire |
| 3 | La zone sous la puce dispose de suffisamment de vias de masse connectés au plan de masse principal | Toutes les variantes | Obligatoire |
| 4 | Un anneau de vias de masse longe le bord de la carte | Toutes les variantes | Obligatoire |

</div>
