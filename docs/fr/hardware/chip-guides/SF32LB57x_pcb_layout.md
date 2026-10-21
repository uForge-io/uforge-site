---
icon: lucide/layers
hide:
    - navigation
description: "Directives d'implantation PCB du MCU SF32LB57x : empilement, contraintes critiques, routage alimentation/quartz/RF/analogique/audio/haute vitesse, EMI/ESD/EOS."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x — Recommandations de placement et de routage PCB { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Cette page présente les recommandations de placement et de routage PCB de la section 6. Revenez à [Stockage et fabrication](SF32LB57x_schematic_storage_mfg.md) ou passez à [Liste de contrôle de revue de conception et références](SF32LB57x_review_and_reference.md).

## 6. Recommandations de placement et de routage PCB { #6-pcb-layout-guidelines }

### 6.1. Empilement { #61-stack-up }

Le SF32LB57x est disponible en boîtiers QFN68L (7 × 7 mm, 68 broches, pas de 0,35 mm) et QFN80L (8 × 8 mm, 80 broches, pas de 0,35 mm). Les conceptions QFN peuvent généralement utiliser un PCB PTH 4 couches, avec des composants placés sur une ou deux faces (par exemple, des condensateurs peuvent être placés sur la face arrière du PCB).<!-- BGA-ONLY --> Le boîtier BGA112 mesure 5,4 × 4,4 mm et comporte 112 billes au pas de 0,4 mm. Les conceptions BGA nécessitent généralement au moins 4 couches et peuvent utiliser un HDI de premier ordre avec vias borgnes/enterrés selon la difficulté du fanout ; les composants peuvent également être placés sur une ou deux faces.<!-- /BGA-ONLY -->

Un empilement adapté permet :

- De placer les composants critiques sur la couche supérieure et de réaliser des pistes courtes.
- Un plan de masse interne solide.
- Une distribution d'alimentation à faible impédance.
- Une masse de référence continue pour les pistes haute vitesse, RF, quartz, audio et analogiques.

Les schémas d'empilement de référence indiquent les matériaux et plages d'épaisseur totale suivants. Confirmez l'empilement final et la tolérance d'épaisseur finie avec le fabricant du PCB.

<div align="center"><em>Tableau 6.1-1 : Matériaux et épaisseurs des empilements QFN de référence</em></div>

<div align="center" markdown>

| Empilement de référence | Noyau | Préimprégné | Plage d'épaisseur totale |
|:-----|:-----|:-----|:-----|
| QFN, 1,6 mm | Noyau cuivre H/HOZ de 1,1 mm | 7628 RC49 %, désignation du matériau 8,6 mil ; colonne d'épaisseur 8,28 mil (0,2104 mm) | 1,43–1,74 mm |
| QFN, 0,8 mm | Noyau H/HOZ de 0,25 mm, sans cuivre | 7628 RC49 %, désignation du matériau 8,6 mil ; colonne d'épaisseur 8,28 mil (0,2104 mm) | 0,67–0,87 mm |

</div>

!!! warning "Conflit source : désignation et épaisseur du préimprégné QFN"
    Les figures d'empilement QFN 3-1-2-1 et 3-1-2-2 du guide PCB original, reprises ici dans le tableau 6.1-1, désignent le préimprégné `7628 RC49%, 8.6 mil`, tandis que la colonne d'épaisseur indique `8.28 mil (0.2104 mm)`. La source n'explique pas cet écart ni la valeur à retenir pour la fabrication. Sans confirmation de SiFli, ne choisissez pas l'une des valeurs et ne remplacez pas l'une par l'autre dans un empilement publié.

<!-- BGA-ONLY -->
<div align="center"><em>Tableau 6.1-2 : Matériaux et épaisseurs des empilements BGA de référence</em></div>

<div align="center" markdown>

| Empilement de référence | Noyau | Préimprégné | Plage d'épaisseur totale |
|:-----|:-----|:-----|:-----|
| BGA, 1,6 mm | Noyau cuivre H/HOZ de 1,3 mm | 1080 RC67 %, désignation du matériau 3,3 mil ; colonne d'épaisseur 3,01 mil (0,0764 mm) | 1,37–1,67 mm |
| BGA, 0,8 mm | Noyau H/H de 0,55 mm, sans cuivre | 1080 RC67 %, désignation du matériau 3,3 mil ; colonne d'épaisseur 3,01 mil (0,0764 mm) | 0,70–0,90 mm |

</div>

!!! warning "Conflit source : désignation et épaisseur du préimprégné BGA"
    Les figures d'empilement BGA 3-1-2-3 et 3-1-2-4 du guide PCB original, reprises ici dans le tableau 6.1-2, désignent le préimprégné `1080 RC67%, 3.3 mil`, tandis que la colonne d'épaisseur indique `3.01 mil (0.0764 mm)`. La source n'explique pas cet écart ni la valeur à retenir pour la fabrication. Sans confirmation de SiFli, ne choisissez pas l'une des valeurs et ne remplacez pas l'une par l'autre dans un empilement publié.
<!-- /BGA-ONLY -->

Les quatre empilements de référence utilisent du cuivre 1 oz sur L1/L4 (1,38 mil ; 0,0350 mm) et du cuivre de 0,60 mil (0,0152 mm) sur chaque face de L2/L3.

Pour une conception QFN à 4 couches, la répartition recommandée est la suivante : couche 1 (supérieure), cuivre relié à la masse, composants et routage des signaux ; couche 2, plan de masse continu sans signal afin de préserver la continuité de la référence ; couche 3, plan d'alimentation, éventuellement divisé par domaine et pouvant aussi accueillir des signaux ; couche 4 (inférieure), cuivre relié à la masse et routage des signaux.

### 6.2. Référence rapide des contraintes PCB critiques { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>Tableau 6.2-1 : Référence rapide des contraintes PCB critiques</em></div>

<div align="center" markdown>

| Élément | Contrainte / référence source | Remarques |
|:-----|:-----------------------|:------|
| `VBUS` / `VBAT` | Largeur de piste >= 0,4 mm (environ 16 mil) | Les chemins de charge et de batterie transportent un courant plus élevé ; gardez-les courts et larges, à l'écart des pistes sensibles. |
| `VCC` / `PVDD` | Valeurs source contradictoires : la section 3.2.1 du guide PCB exige >= 0,4 mm ; le point 44 de la table 4-2-1-1 (variantes sur batterie) exige `VCC` >= 12 mil, tandis que le point 47 (variantes 3,3 V) porte le titre `PVDD` mais contrôle `VCC` >= 12 mil. | Faites confirmer par SiFli le rail, le périmètre des variantes et la largeur applicable ; ne choisissez pas sur la seule base de ces références. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | Largeur de piste >= 10 mil | Variantes alimentées par batterie uniquement ; vérifiez la limite de courant au démarrage progressif, le courant d'appel et la charge autorisée. |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX` : >= 10 mil ; `BUCK_FB` : > 0,25 mm | Gardez `BUCK_LX` court et large ; voir la section 6.3 pour le placement et la zone sans cuivre. |
| `AVDD_BRF` / `AVDD33_AUD` | Largeur de piste >= 8 mil | Les alimentations analogiques/RF/audio doivent être courtes, propres et filtrées séparément. |
| USB DP/DN | Différentiel 90 Ω | Routez d'abord à travers l'ESD, évitez les stubs et gardez la masse de référence continue. |
| Piste d'antenne RF | 50 Ω asymétrique | Préférez la couche supérieure, un minimum de vias, une masse de référence continue et un blindage par vias de masse. |
| Largeur du cuivre de masse de part et d'autre de la piste RF | >= 60 mil de chaque côté | Reliez le cuivre des deux côtés à la masse principale par plusieurs vias. |
| Pistes du quartz 48 MHz | Environ 3 mm à 10 mm | Privilégiez la couche supérieure, le blindage par la masse et une zone sans cuivre sous le quartz. |
| Pistes du quartz 32,768 kHz | <= 10 mm | Respectez l'espacement entre les pistes, ajoutez un blindage et évitez les sources de bruit. |
| Placement du quartz | >= 1,5 mm de la broche d'horloge de la puce ; > 1 mm du bord de la carte ; >= 5 mm des sources de chaleur PA, charge et PMU | S'applique aux quartz de 48 MHz et de 32,768 kHz. |
| Bus MPI | Longueur totale <= 20 mm, écart de longueur entre signaux <= 3 mm | Routez l'horloge, les données et les signaux de commande en groupe avec une masse de référence continue. |
| Bus SDIO | Longueur totale <= 50 mm, écart de longueur entre signaux <= 6 mm | Routez CLK, CMD et DATA en groupe sur une masse de référence continue. |
| `VDDIOA` | Largeur de piste >= 10 mil | Variantes alimentées en 3,3 V uniquement. |

</div>

Les figures de règles PTH et HDI donnent également des exemples de fabrication : largeur de piste minimale et recommandée de 0,10 mm pour le PTH et de 0,075 mm pour le HDI, avec un maximum de 2,54 mm dans les deux cas. Les exemples de vias montrent un perçage de 0,25 mm et un pad de 0,45 mm pour le PTH, ainsi qu'un perçage de 0,10 mm et un pad de 0,23 mm pour un microvia HDI (l'exemple de via traversant est de 0,25 mm/0,45 mm). Ce sont des constructions de référence ; confirmez les capacités et règles réelles du fabricant avant la fabrication.

### 6.3. Placement et routage de l'alimentation { #63-power-layout }

- Gardez les chemins d'alimentation à fort courant courts et larges.
- Éloignez les chemins de charge des pistes analogiques, RF et de quartz sensibles.
- Placez les condensateurs de filtrage de VCC, PVDD, VBUS et VBAT près des broches de la puce. La section 3.2.1 du guide PCB indique au moins 0,4 mm pour `VCC` / `PVDD`, tandis que le point 47 de la table d'autocontrôle 4-2-1-1 donne la valeur contradictoire de 12 mil (titre `PVDD`, détail du contrôle `VCC`) ; ne figez la largeur de piste d'aucun de ces rails avant que SiFli ait confirmé l'exigence applicable. Placez également près de leurs broches les condensateurs de filtrage des autres sorties, notamment VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD et AVDD_BRF. Dimensionnez les pistes selon le courant d'entrée et gardez-les courtes et larges afin de réduire l'ondulation d'alimentation et d'améliorer la stabilité.
- Si PVDD, AVDD_BRF, AVDD33 ou AVDD33_AUD partagent une alimentation, créez des branches en étoile indépendantes depuis la source ; ne partagez pas de segment d'alimentation en amont.
- Routez VBUS et VBAT en branches en étoile indépendantes, sans partager leur chemin avec d'autres pistes. Évitez que les signaux sensibles longent ces chemins de charge.
- Placez l'inductance BUCK et les condensateurs de filtrage près des broches de la puce. Gardez BUCK_LX court et large et donnez à la piste BUCK_FB une largeur supérieure à 0,25 mm. Reliez les masses des condensateurs de sortie DC/DC au plan de masse principal par plusieurs vias de masse. N'ajoutez pas de cuivre sur la couche supérieure sous l'inductance, conservez un plan de référence continu sur la couche adjacente et ne routez aucun autre signal dans la zone de l'inductance.
- Connectez les masses des condensateurs à la masse principale avec des vias à proximité.
- Utilisez un routage en étoile pour les rails analogiques/RF/IO clés dans les variantes alimentées en 3,3 V.

!!! warning "Conflits non résolus sur les rails d'alimentation dans la source"
    - **Largeur des pistes et désignation du rail :** La section 3.2.1 du guide PCB original exige au moins 0,4 mm (environ 15,7 mil) pour `VCC` et `PVDD`. Le point 44 de la table d'autocontrôle 4-2-1-1, applicable aux variantes sur batterie, exige au moins 12 mil pour `VCC` ; le point 47, applicable aux variantes 3,3 V, porte le titre `PVDD`, mais son détail de contrôle exige au moins 12 mil pour `VCC`. La source ne concilie pas ces largeurs et ne précise pas si le titre ou le détail du point 47 désigne le rail visé. Ne déduisez pas de valeur corrigée et n'appliquez pas une entrée aux deux variantes d'alimentation ; faites confirmer par SiFli le rail, le périmètre et la largeur applicables avant de figer la conception.
    - **Noms des sorties :** La section 3.2.1 du guide PCB original utilise `VDD_VOUT1` / `VDD_VOUT2`, tandis que les points 45/46 de la table d'autocontrôle 4-2-1-1 et le tableau de référence rapide de la section 6.2 de cette page utilisent `VDD33_VOUT1` / `VDD33_VOUT2`. Le titre du point 46 répète `VDD33_VOUT1`, alors que son détail indique `VDD33_VOUT2`. La source ne précise pas si ces noms sont des alias ou des réseaux distincts.
    Sans confirmation de SiFli, ne choisissez pas une largeur de piste, n'affectez pas le point 47 à un rail et ne traitez pas les variantes de nom des sorties comme équivalentes lors de la finalisation de la conception.

### 6.4. Placement et routage du quartz { #64-crystal-layout }

- Conservez une masse de référence solide et continue sous le circuit RF et la puce principale ; ne divisez pas le plan de masse et ne le découpez pas par des fentes. Pour la zone du quartz, la source exige aussi une masse de référence continue et une suppression du cuivre sous le quartz. Voir l'avertissement ci-dessous : ne figez pas la géométrie de cuivre de cette zone avant que SiFli ait confirmé les limites propres à l'empilement choisi.
- Placez les quartz à au moins 1,5 mm de la broche d'horloge de la puce, à plus de 1 mm du bord et à au moins 5 mm des sources de chaleur telles que PA, charge et PMU, afin de limiter la dérive de fréquence due à la température. La source indique un dégagement de cuivre d'au moins 0,25 mm sur la couche supérieure autour du boîtier et renvoie à la conception de référence pour les couches adjacentes, sans préciser le rapport avec la zone sans cuivre sous le boîtier. Confirmez les limites applicables avec SiFli avant de figer le routage. Ne routez pas de signaux numériques haute fréquence directement sous le quartz ; évitez tout routage dans cette zone si possible. Éloignez des quartz les composants magnétiques, notamment les inductances de puissance.
- Routez XI/XO uniquement sur la couche supérieure, sans changement de couche. Gardez les pistes courtes et symétriques et assurez un blindage tridimensionnel par des vias de masse rapprochés de chaque côté. Placez les condensateurs de charge de part et d'autre du quartz, près de ses extrémités de piste, et reliez la masse de chaque condensateur près du pad de masse du quartz. Éloignez les vias d'alimentation des pistes du quartz.
- Pour le quartz de 48 MHz, utilisez des pistes sur la couche supérieure de 3 à 10 mm de long et de 0,1 mm de large. Maintenez au moins 0,15 mm entre les pistes parallèles 48M_XI et 48M_XO et assurez un blindage tridimensionnel par la masse. Éloignez-les de VBAT, du DC/DC et des signaux haute vitesse ; gardez la zone du quartz libre sur la couche supérieure et les couches adjacentes.
- Pour le quartz de 32,768 kHz, utilisez des pistes sur la couche supérieure de 10 mm maximum et de 0,1 mm de large. Le modèle de routage demande au moins 0,15 mm entre les pistes parallèles 32K_XI et 32K_XO, tandis que la table d'autocontrôle exige plus de deux fois la largeur de piste (>0,2 mm pour une largeur de 0,1 mm). Ne figez pas l'espacement avant que SiFli ait confirmé l'exigence applicable. Assurez un blindage tridimensionnel par la masse et gardez la zone du quartz libre sur la couche supérieure et les couches adjacentes.

!!! warning "Conflits non résolus dans les consignes source de routage du quartz"
    - **Plan de masse et zone sans cuivre :** La section 3.3 du guide PCB demande un plan de référence continu dans la zone du quartz ainsi qu'une zone sans cuivre sur TOP autour du quartz. La figure 3-3-1 (reproduite ici en figure 6.9-30) indique un dégagement d'au moins 0,25 mm autour du boîtier. Or, le point 6 du tableau d'autocontrôle original 4-3-1 demande un blindage GND complet autour du quartz et des pistes d'oscillateur, tandis que le point 7 impose l'absence de cuivre sous le quartz sur TOP pour un PCB PTH à 4 couches, et sur TOP ainsi que la couche 2 pour un HDI à 6 couches. La source ne délimite pas la zone blindée par rapport à la zone sans cuivre et n'explique pas comment appliquer l'exigence de masse continue dans les couches interdites selon l'empilement. Ce conflit de portée reste non résolu ; ne déduisez pas de motif de cuivre ou de masse couche par couche.
    - **Espacement des pistes à 32,768 kHz :** La section 3.3 du guide PCB et le modèle de routage de la figure 3-3-4 (reproduite ici en figure 6.9-33) spécifient au moins 0,15 mm entre les pistes parallèles `32K_XI` / `32K_XO`. Le point 9 du tableau d'autocontrôle original 4-3-1 exige plus de deux fois la largeur de piste de base, soit plus de 0,2 mm pour la piste de 0,1 mm indiquée dans le guide. Ces exigences minimales d'espacement sont contradictoires.
    - **Portée du dégagement autour du boîtier :** La figure 3-3-1 (reproduite ici en figure 6.9-30) spécifie au moins 0,25 mm de dégagement de cuivre TOP autour du boîtier. Le point 7 du tableau d'autocontrôle 4-3-1 précise séparément les couches sans cuivre sous le quartz pour les deux empilements, sans expliquer le rapport entre ce dégagement périphérique et les zones sous le boîtier ou les interdictions de routage sur les couches adjacentes.
    Ces conflits et imprécisions de portée restent non résolus dans les documents source de SiFli. Avant de figer le routage, faites confirmer les exigences pour le boîtier et l'empilement réels ; ne choisissez pas entre les espacements et ne déduisez pas les limites de masse ou de zone sans cuivre couche par couche.

### 6.5. Placement et routage RF { #65-rf-layout }

- Placez le réseau d'adaptation RF près de la puce et à l'écart de l'antenne. Placez le condensateur de filtrage AVDD_BRF juste à côté de sa broche sur la puce et reliez sa masse directement au plan de masse principal par un via.
- Gardez les pistes RF courtes et utilisez aussi peu de vias que possible en pratique.
- Privilégiez le routage RF sur la couche supérieure, sans changement de couche. Le cas échéant, une largeur de piste supérieure à 10 mil est recommandée. Prévoyez un blindage tridimensionnel relié à la masse, évitez les angles aigus et droits, contrôlez l'impédance à 50 Ω selon l'empilement du PCB et placez des vias de masse rapprochés de chaque côté pour former une rangée continue.
- Gardez la zone d'antenne dégagée conformément aux exigences du fournisseur et aux contraintes de conception industrielle du produit.
- Une différence entre la largeur du pad d'un composant d'adaptation et celle de la piste peut créer une discontinuité d'impédance. Une ouverture du plan de masse de référence sous les pads, adaptée à leurs dimensions, peut améliorer la continuité d'impédance.
- Avec un connecteur d'antenne IPEX, supprimez le cuivre sous le connecteur sur toutes les couches du PCB. Simulez les antennes PCB et mettez-les au point sur la carte réelle ; prévoyez un réseau d'adaptation CLC et placez-le aussi près que possible de l'antenne.
- Éloignez la RF des FPC LCD, de l'USB, du SDIO, du DC/DC, des quartz et des chemins de charge.

### 6.6. Analogique et audio { #66-analog-and-audio }

- Placez les condensateurs de filtrage AVDD33_AUD, MIC_BIAS et AUD_VREF près de leurs broches de la puce et reliez correctement chaque masse à la masse principale du PCB.
- Placez le découplage de l'alimentation analogique près de la puce.
- Appariez les longueurs des pistes différentielles audio et placez les réseaux RC près de la puce.
- Placez les composants périphériques de l'entrée ADCP près des broches de la puce. Gardez les pistes courtes, reliez leur blindage à la masse et éloignez-les des fortes sources d'interférence.
- Placez les composants périphériques des sorties DACP/DACN près des broches de la puce. Routez chaque paire P/N en différentiel, aussi court que possible, et limitez la capacité parasite à moins de 10 pF. Assurez un blindage tridimensionnel par la masse et éloignez les pistes des fortes sources d'interférence.
- Assurez un blindage tridimensionnel relié à la masse pour les pistes GPADC et éloignez-les des circuits susceptibles de les perturber, comme la détection de batterie ou de température.
- Évitez de router les chemins de retour à fort courant à travers la zone audio.

### 6.7. Interfaces haute vitesse { #67-high-speed-interfaces }

- Routez USB DP/DN en paire différentielle de 90 Ω et faites-les passer d'abord par la protection ESD.
- Regroupez les signaux de mémoire MPI : longueur totale ≤20 mm et différence de longueur dans le groupe ≤3 mm. Assurez un blindage tridimensionnel relié à la masse pour l'horloge, les données et les commandes, avec un plan de référence continu.
- Regroupez les signaux SDIO : longueur totale ≤50 mm et différence de longueur dans le groupe ≤6 mm. Assurez un blindage tridimensionnel relié à la masse pour l'horloge, les commandes et les données.
- Faites passer les bus d'affichage parallèles RGB/DPI, 8080, EPD et autres au-dessus d'une masse de référence continue.
- Faites passer USB PA35 (USB_DP) et PA36 (USB_DN) par la protection ESD avant leur connexion à la puce. Utilisez un routage différentiel de 90 Ω avec un blindage tridimensionnel relié à la masse et reliez correctement la masse du composant ESD à la masse principale.
- Réservez des résistances série sur les horloges haute vitesse où un ajustement EMI pourrait être nécessaire.

### 6.8. EMI, ESD et EOS { #68-emi-esd-and-eos }

- Vérifiez la protection ESD pour chaque interface externe.
- Évitez les longs routages en couche externe, hors du capot de blindage, pour les signaux perturbateurs tels que l'horloge et l'alimentation ; routez-les plutôt sur les couches internes.
- Placez chaque composant de protection ESD juste à côté de la broche correspondante du connecteur. Le signal doit traverser le composant avant d'atteindre le circuit aval, sans dérivation avant la protection. Reliez sa broche de masse directement à la masse principale par des vias, avec une connexion courte et large.
- L'USB, le chargeur, le connecteur de batterie, les touches, le tactile, l'affichage, le capteur de fréquence cardiaque et l'antenne sont des points de protection prioritaires.
- Placez le point de test de la ligne de charge USB en amont du TVS. Placez le TVS du connecteur de batterie en amont du circuit de la puce afin que le signal traverse le TVS avant d'atteindre la puce.
- La protection d'entrée du chargeur devrait prendre en compte l'OVP, l'EOS et l'ESD ensemble.

### 6.9. Figures de référence PCB { #69-pcb-reference-figures }

Les figures suivantes du SF32LB57x présentent les dimensions des boîtiers, les empreintes PCB, l'empilement, le fanout, le routage et les protections. Elles constituent les principales références PCB pour les nouvelles conceptions.

Le dessin d'empreinte QFN80L indique 5,90 mm pour le pad central exposé ; le dessin du boîtier indique 5,50 mm nominal (5,40–5,60 mm). Ils décrivent respectivement le pad PCB et celui du boîtier ; ces dimensions ne sont pas interchangeables. Vérifiez la révision du boîtier et l'empreinte recommandée par SiFli avant de créer la bibliothèque. Les modèles de pochoir QFN68L/QFN80L utilisent une épaisseur de 0,125 mm et une couverture de pâte annoncée de 60 % sur le pad exposé ; faites vérifier la cohérence des ouvertures et de cette couverture par le fabricant du pochoir.

<!-- BGA-ONLY -->
Le modèle de pochoir BGA112 utilise une épaisseur de 0,075 mm, 112 ouvertures carrées de 0,18 mm et des rayons d'angle R0,05 mm.
<!-- /BGA-ONLY -->

![Figure 6.9-1 : Dimensions du boîtier QFN68L 7 × 7 × 0,9 mm](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-1 : Dimensions du boîtier QFN68L 7 × 7 × 0,9 mm</em></div>

![Figure 6.9-2 : Dimensions du boîtier QFN68L 7 × 7 × 1,1 mm](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-2 : Dimensions du boîtier QFN68L 7 × 7 × 1,1 mm</em></div>

![Figure 6.9-3 : Empreinte PCB QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-3 : Empreinte PCB QFN68L</em></div>

![Figure 6.9-4 : Ouverture de pochoir QFN68L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-4 : Ouverture de pochoir QFN68L</em></div>

![Figure 6.9-5 : Dimensions du boîtier QFN80L 8 × 8 × 0,9 mm](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-5 : Dimensions du boîtier QFN80L 8 × 8 × 0,9 mm</em></div>

![Figure 6.9-6 : Dimensions du boîtier QFN80L 8 × 8 × 1,1 mm](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-6 : Dimensions du boîtier QFN80L 8 × 8 × 1,1 mm</em></div>

![Figure 6.9-7 : Empreinte PCB QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-7 : Empreinte PCB QFN80L</em></div>

![Figure 6.9-8 : Ouverture de pochoir QFN80L](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-8 : Ouverture de pochoir QFN80L</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-9 : Dimensions du boîtier BGA112 5,4 × 4,4 × 0,98 mm](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-9 : Dimensions du boîtier BGA112 5,4 × 4,4 × 0,98 mm</em></div>

![Figure 6.9-10 : Dimensions du boîtier BGA112 5,4 × 4,4 × 1,03 mm](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-10 : Dimensions du boîtier BGA112 5,4 × 4,4 × 1,03 mm</em></div>

![Figure 6.9-11 : Empreinte PCB BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-11 : Empreinte PCB BGA112</em></div>

![Figure 6.9-12 : Ouverture de pochoir BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-12 : Ouverture de pochoir BGA112</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-13 : Référence d'empilement PCB QFN 1,6 mm](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-13 : Référence d'empilement PCB QFN 1,6 mm</em></div>

![Figure 6.9-14 : Référence d'empilement PCB QFN 0,8 mm](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-14 : Référence d'empilement PCB QFN 0,8 mm</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-15 : Référence d'empilement PCB BGA 1,6 mm](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-15 : Référence d'empilement PCB BGA 1,6 mm</em></div>

![Figure 6.9-16 : Référence d'empilement PCB BGA 0,8 mm](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-16 : Référence d'empilement PCB BGA 0,8 mm</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-17 : Règles de conception PCB PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-17 : Règles de conception PCB PTH</em></div>

![Figure 6.9-18 : Règles de conception des vias PTH](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-18 : Règles de conception des vias PTH</em></div>

![Figure 6.9-19 : Règles de conception PCB HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-19 : Règles de conception PCB HDI</em></div>

![Figure 6.9-20 : Règles de conception des vias HDI](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-20 : Règles de conception des vias HDI</em></div>

![Figure 6.9-21 : Référence de routage (fanout) en couche supérieure QFN68](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-21 : Référence de routage (fanout) en couche supérieure QFN68</em></div>

![Figure 6.9-22 : Référence de routage (fanout) en couche supérieure QFN80](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-22 : Référence de routage (fanout) en couche supérieure QFN80</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-23 : Référence de routage (fanout) BGA112](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-23 : Référence de routage (fanout) BGA112</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-24 : Routage d'alimentation VCC QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-24 : Routage d'alimentation VCC QFN</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-25 : Routage d'alimentation VCC BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-25 : Routage d'alimentation VCC BGA</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-26 : Routage VBUS et VBAT QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-26 : Routage VBUS et VBAT QFN</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-27 : Routage VBUS et VBAT BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-27 : Routage VBUS et VBAT BGA</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-28 : Routage DCDC QFN](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-28 : Routage DCDC QFN</em></div>

<!-- BGA-ONLY -->
![Figure 6.9-29 : Routage DCDC BGA](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-29 : Routage DCDC BGA</em></div>
<!-- /BGA-ONLY -->

![Figure 6.9-30 : Zone d'exclusion de placement du quartz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-30 : Zone d'exclusion de placement du quartz</em></div>

![Figure 6.9-31 : Modèle de routage du quartz 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-31 : Modèle de routage du quartz 48 MHz</em></div>

![Figure 6.9-32 : Référence de routage du quartz 48 MHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-32 : Référence de routage du quartz 48 MHz</em></div>

![Figure 6.9-33 : Modèle de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-33 : Modèle de routage du quartz 32,768 kHz</em></div>

![Figure 6.9-34 : Référence de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-34 : Référence de routage du quartz 32,768 kHz</em></div>

![Figure 6.9-35 : Placement et routage du réseau d'adaptation RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-35 : Placement et routage du réseau d'adaptation RF</em></div>

![Figure 6.9-36 : Référence de routage du signal RF](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-36 : Référence de routage du signal RF</em></div>

![Figure 6.9-37 : Placement et routage du filtrage de l'alimentation audio](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-37 : Placement et routage du filtrage de l'alimentation audio</em></div>

![Figure 6.9-38 : Placement et routage de l'entrée audio analogique](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-38 : Placement et routage de l'entrée audio analogique</em></div>

![Figure 6.9-39 : Placement et routage de la sortie audio analogique](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-39 : Placement et routage de la sortie audio analogique</em></div>

![Figure 6.9-40 : Modèle de routage SDIO](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-40 : Modèle de routage SDIO</em></div>

![Figure 6.9-41 : Référence de routage PCB SDIO](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-41 : Référence de routage PCB SDIO</em></div>

![Figure 6.9-42 : Référence de placement des composants USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-42 : Référence de placement des composants USB</em></div>

![Figure 6.9-43 : Modèle de routage USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-43 : Modèle de routage USB</em></div>

![Figure 6.9-44 : Référence de routage PCB USB](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-44 : Référence de routage PCB USB</em></div>

![Figure 6.9-45 : Référence de placement TVS d'alimentation](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-45 : Référence de placement TVS d'alimentation</em></div>

![Figure 6.9-46 : Référence de mise à la masse EOS/TVS](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-46 : Référence de mise à la masse EOS/TVS</em></div>
