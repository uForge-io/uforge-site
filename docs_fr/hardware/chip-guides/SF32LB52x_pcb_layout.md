---
icon: lucide/layers
hide:
    - navigation
description: "Recommandations d'implantation et de routage PCB pour le MCU SF32LB52x : empreinte, empilement, fanout, routage horloge/RF/audio/USB/SDIO, routage DC-DC et alimentation, EMI/ESD, et autres considérations de disposition."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x — Recommandations d'implantation et de routage PCB { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre la section 6, Recommandations d'implantation et de routage PCB. Retournez aux [Recommandations de conception du schéma](SF32LB52x_schematic_design.md) (la première de ses trois pages), poursuivez vers la [Liste de contrôle d'implantation et de routage PCB](SF32LB52x_pcb_layout_checklist.md), ou passez directement à la [Liste de contrôle de revue de conception et références](SF32LB52x_review_and_reference.md).

## 6. Recommandations d'implantation et de routage PCB { #6-pcb-layout-guidelines }

Utilisez ce chapitre pour examiner le placement et le routage du PCB en complément de la section 5. Avant le placement final, le schéma doit définir la variante, l'arbre d'alimentation, les composants d'horloge, la zone réservée à la RF, les broches d'affichage et de stockage, ainsi que l'accès aux points de test.

**Objectif de conception**

Réalisez à partir du schéma un PCB PTH à 4 couches fabricable, tout en protégeant les chemins RF, quartz, audio, alimentation, USB et SDIO sensibles aux problèmes d'impédance, de bruit et de courants de retour.

**Séquence de revue PCB**

1. Vérifiez l'empreinte du boîtier, ainsi que le pochoir de pâte à braser et le motif de pastilles.
2. Confirmez l'empilement, la largeur/espacement des pistes, le perçage, et les règles d'impédance avec le fournisseur de PCB.
3. Placez la puce, les quartz, le chemin RF, le DC/DC, le chargeur, les connecteurs d'affichage/stockage, et les composants audio.
4. Vérifiez le fanout et le routage des signaux sensibles avant de terminer les pistes GPIO moins prioritaires.
5. Enregistrez des captures d'écran documentant le placement et le routage RF, des quartz, de l'USB, du SDIO, de l'audio, du DC/DC, du chargeur et des rails d'alimentation.

### 6.1. Conception de l'empreinte PCB { #61-pcb-footprint-design }

Le boîtier QFN68L du SF32LB52x mesure 7 mm x 7 mm x 0,85 mm, avec 68 broches et un pas de 0,35 mm.

Le dessin du boîtier indique une hauteur totale nominale de 0,85 mm, comprise entre 0,8 et 0,9 mm. La distance au circuit imprimé est de 0,02 mm nominalement et de 0,05 mm au maximum. Vérifiez les dégagements de montage et du boîtier mécanique sur le dessin détaillé, pas uniquement sur le résumé des dimensions.

![Figure 6.1-1 : Dimensions du boîtier QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-1 : Dimensions du boîtier QFN68L</em></div>

![Figure 6.1-2 : Forme du boîtier QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-2 : Forme du boîtier QFN68L</em></div>

![Figure 6.1-3 : Empreinte de référence du QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.1-3 : Empreinte de référence du QFN68L</em></div>

La figure 6.1-3 indique des pastilles périphériques de 0,2 mm x 0,55 mm, un pas de 0,35 mm, des ouvertures de vernis épargne de 0,3 mm x 0,65 mm et des ouvertures de pochoir de 0,2 mm x 0,55 mm. Ce sont des dimensions de référence ; vérifiez les exigences d'assemblage avant de valider l'empreinte.

Le dessin du boîtier donne une pastille exposée nominale de 5,49 mm x 5,49 mm. L'exemple de fanout relie la pastille centrale à GND ; ne la considérez pas comme un élément mécanique à laisser non connecté.

### 6.2. Empilement PCB { #62-pcb-stack-up }

La conception de référence prend en charge un placement simple ou double face. Les composants peuvent être placés d'un côté, ou les condensateurs et passifs similaires peuvent être placés au dos, sous la puce. Un empilement 4 couches à trous métallisés traversants (PTH) est recommandé.

![Figure 6.2-1 : Structure d'empilement de référence](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.2-1 : Structure d'empilement de référence</em></div>

La figure 6.2-1 présente un empilement de référence de 0,8 mm ±10%, métallisation et vernis épargne compris. Son épaisseur totale calculée est de 0,79553 mm. Confirmez l'épaisseur finie et la constitution des diélectriques avec le fabricant de PCB ; cet exemple ne définit pas un empilement universel.

<div align="center"><em>Tableau 6.2-1 : Valeurs de l'empilage de référence</em></div>

<div align="center" markdown>

| Couche | Matériau | Épaisseur (mil) | Épaisseur (mm) | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| Vernis épargne supérieur | Vernis épargne | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | Cuivre + métallisation | 1.81 | 0.045974 | — | — |
| Diélectrique L1–L2 | Préimprégné 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | Cuivre + métallisation | 1.4 | 0.03556 | — | — |
| Diélectrique L2–L3 | Noyau | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | Cuivre + métallisation | 1.4 | 0.03556 | — | — |
| Diélectrique L3–L4 | Préimprégné 1080 (66%) x3 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | Cuivre + métallisation | 1.81 | 0.045974 | — | — |
| Vernis épargne inférieur | Vernis épargne | 1 | 0.0254 | 3.5 | 0.8 |

</div>

Les lignes de préimprégné supposent une surface de cuivre de 70%. Dk et Df sont repris de l'image, y compris Df 0,8 pour le vernis épargne ; ce ne sont pas des propriétés universelles vérifiées. Confirmez les données réelles du fabricant pour calculer l'impédance et les pertes.

### 6.3. Règles générales de conception PCB { #63-general-pcb-design-rules }

Suivez les règles générales de conception PCB à trous métallisés (PTH) de la conception de référence.

![Figure 6.3-1 : Règles générales de conception PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.3-1 : Règles générales de conception PCB</em></div>

Les règles de la figure 6.3-1 donnent une largeur de piste minimale et recommandée de 0,1 mm et une largeur maximale de 2,54 mm. Elles distinguent les espacements de 0,1 mm pour les pistes, vias et pastilles des règles de cuivre de 0,127 mm (0,15 mm entre zones de cuivre), avec un dégagement au bord de carte de 0,25 mm. Ce sont des règles CAD de référence : vérifiez séparément les limites de fabrication et le routage à impédance contrôlée.

Les règles complémentaires de la figure 6.3-1 fixent à 0,1 mm les espacements entre perçages et entre corps de composants. Certaines entrées d'un même réseau sont nulles ; elles ne suppriment ni les distances entre réseaux différents ni les règles de bord et de cuivre.

### 6.4. Fanout des pistes PCB { #64-pcb-trace-fanout }

Réalisez le fanout de tous les signaux du boîtier QFN sur la couche supérieure.

![Figure 6.4-1 : Référence de fanout en couche supérieure](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.4-1 : Référence de fanout en couche supérieure</em></div>

### 6.5. Routage de l'interface d'horloge { #65-clock-interface-routing }

Appliquez ces règles de routage d'horloge aux deux groupes de conception :

- Placez les quartz à l'intérieur du blindage, à plus de 1 mm du bord du PCB, et aussi loin que possible des composants générateurs de chaleur (PA, chargeur, circuits PMU) — idéalement plus de 5 mm — pour éviter d'affecter la dérive de fréquence du quartz
- Réservez autour du quartz un dégagement supérieur à 0,25 mm, sans autre métal ni composant.
- Acheminez les pistes du quartz 48 MHz sur la couche supérieure : longueur de 3 à 10 mm, largeur de 0,1 mm et blindage de masse complet. Éloignez-les de VBAT/VCC, du DC/DC et des signaux haute vitesse. Ne faites passer aucune autre piste sur la couche supérieure ni sur la couche adjacente sous la zone du quartz.
- Acheminez les pistes du quartz 32,768 kHz sur la couche supérieure : longueur ≤10 mm, largeur de 0,1 mm, espacement ≥0,15 mm entre les pistes parallèles 32K_XI et 32K_XO, avec blindage complet par la masse. Ne faites passer aucune autre piste sur la couche supérieure ni sur la couche adjacente sous ce circuit.

![Figure 6.5-1 : Placement du quartz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-1 : Placement du quartz</em></div>

![Figure 6.5-2 : Schéma du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-2 : Schéma du quartz 48 MHz</em></div>

![Figure 6.5-3 : Modèle de routage du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-3 : Modèle de routage du quartz 48 MHz</em></div>

![Figure 6.5-4 : Référence de routage du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-4 : Référence de routage du quartz 48 MHz</em></div>

![Figure 6.5-5 : Schéma du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-5 : Schéma du quartz 32,768 kHz</em></div>

![Figure 6.5-6 : Modèle de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-6 : Modèle de routage du quartz 32,768 kHz</em></div>

![Figure 6.5-7 : Référence de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.5-7 : Référence de routage du quartz 32,768 kHz</em></div>

Les figures 6.5-3 et 6.5-6 montrent un espacement ≥0,15 mm entre les pistes parallèles XI/XO des deux quartz. La figure 6.5-2 utilise un quartz de 48 MHz à capacité de charge de 8,8 pF et marque les condensateurs externes NF (non montés). La figure 6.5-5 utilise un quartz de 32,768 kHz, 7 pF, sur PA22/PA23, broches également multiplexées avec PDM_CLK/PDM_DATA.

!!! important "Traitement de la masse sous le quartz"
    La note d'application des variantes sur batterie se contredit au sujet du cuivre sous le quartz : sa section sur l'horloge demande de retirer le plan de masse L2 juste en dessous, tandis que sa section de routage PCB interdit les évidements de plan et les découpes de cuivre sur la couche supérieure et les couches adjacentes, et montre une masse L2 continue. Le guide de routage PCB distinct reprend l'interdiction des évidements. N'en déduisez pas de règle générale pour L2 et ne tranchez pas selon le seul nombre de couches ; confirmez auprès de SiFli le traitement propre à l'empilement avant validation. La zone d'exclusion du quartz et les dégagements des composants restent des contrôles distincts.

### 6.6. Routage de l'interface RF { #66-rf-interface-routing }

Appliquez ces règles de routage RF aux deux groupes de conception :

- Placez le circuit d'adaptation RF près de la puce, et non de l'antenne
- Placez le condensateur de filtrage AVDD_BRF près de la broche de la puce et reliez directement à la masse principale les vias associés à sa broche de masse
- Acheminez la RF sur la couche supérieure autant que possible, sans vias qui dégradent les performances. La source recommande une largeur supérieure à 10 mil ; vérifiez que l'empilement réel donne 50 Ω. Prévoyez un blindage par la masse et évitez les angles aigus ou droits.
- Contrôlez l'impédance de la piste RF à 50 Ω, avec des vias de masse de blindage denses des deux côtés

![Figure 6.6-1 : Schéma du réseau en π et du circuit d'alimentation](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-1 : Schéma du réseau en π et du circuit d'alimentation</em></div>

![Figure 6.6-2 : Implantation du réseau en π et du circuit d'alimentation](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-2 : Implantation du réseau en π et du circuit d'alimentation</em></div>

![Figure 6.6-3 : Schéma du circuit de signal RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-3 : Schéma du circuit de signal RF</em></div>

![Figure 6.6-4 : Routage PCB du signal RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.6-4 : Routage PCB du signal RF</em></div>

Les exemples RF utilisent un condensateur série de 15 pF/50 V (C0333), laissent C0318/C0319 NF et montrent un filtrage de 0,47 uF sur AVDD_BRF. Ce sont des valeurs de montage d'exemple, pas une prescription universelle d'adaptation d'antenne.

### 6.7. Routage de l'interface audio { #67-audio-interface-routing }

Appliquez ces règles de routage audio aux deux groupes de conception :

- Placez les condensateurs de filtrage d'AVDD33_AUD, de MIC_BIAS et d'AUD_VREF près de leurs broches respectives, puis reliez solidement leurs bornes de masse à la masse principale.
- Placez les composants de l'entrée analogique ADCP près de la broche de la puce. Utilisez des pistes courtes avec un blindage complet par la masse, et éloignez-les des sources de fortes perturbations.
- Placez les composants de sortie analogique DACP/DACN près des broches de la puce. Acheminez les signaux en paire différentielle, avec des pistes courtes, une capacité parasite inférieure à 10 pF et un blindage complet par la masse.

![Figure 6.7-1 : Schéma de filtrage de l'alimentation audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-1 : Schéma de filtrage de l'alimentation audio</em></div>

![Figure 6.7-2 : Référence de routage PCB du filtrage de l'alimentation audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-2 : Référence de routage PCB du filtrage de l'alimentation audio</em></div>

![Figure 6.7-3 : Schéma de l'entrée audio analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-3 : Schéma de l'entrée audio analogique</em></div>

![Figure 6.7-4 : Conception PCB de l'entrée audio analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-4 : Conception PCB de l'entrée audio analogique</em></div>

![Figure 6.7-5 : Schéma de la sortie audio analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-5 : Schéma de la sortie audio analogique</em></div>

![Figure 6.7-6 : Conception PCB de la sortie audio analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.7-6 : Conception PCB de la sortie audio analogique</em></div>

La figure 6.7-1 montre des condensateurs de filtrage de référence de 1 uF/6,3 V pour MIC_BIAS, 2,2 uF/10 V pour AVDD33_AUD et 1 uF/6,3 V pour AUD_VREF. Ces valeurs décrivent le circuit illustré ; confirmez celles nécessaires au projet réel. Éloignez également DACP/DACN des sources de fortes perturbations, en plus du routage différentiel.

Les recommandations du schéma source limitent aussi les pistes de sortie DAC à moins de 2 cm.

### 6.8. Routage de l'interface USB { #68-usb-interface-routing }

Acheminez d'abord USB DP (PA35) / DN (PA36) à travers les broches du composant ESD, puis vers la puce. Reliez solidement la masse du composant ESD à la masse principale. Acheminez la paire avec une impédance différentielle contrôlée à 90 Ω et un blindage de masse complet.

![Figure 6.8-1 : Schéma du signal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-1 : Schéma du signal USB</em></div>

![Figure 6.8-2 : Conception PCB du signal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-2 : Conception PCB du signal USB</em></div>

![Figure 6.8-3 : Référence de placement des composants du signal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-3 : Référence de placement des composants du signal USB</em></div>

![Figure 6.8-4 : Modèle de routage du signal USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.8-4 : Modèle de routage du signal USB</em></div>

La figure 6.8-3 compare le routage par les pastilles de protection à des branches non protégées : aucune branche ne doit atteindre la puce sans passer par la connexion de protection.

### 6.9. Routage de l'interface SDIO { #69-sdio-interface-routing }

Acheminez les signaux SDIO en groupe, avec une longueur totale de piste ≤50 mm et un écart de longueur maximal de 6 mm au sein du groupe. Assurez un blindage de masse complet pour le signal d'horloge, ainsi que pour les signaux DATA et CMD.

![Figure 6.9-1 : Schéma du circuit d'interface SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-1 : Schéma du circuit d'interface SDIO</em></div>

![Figure 6.9-2 : Modèle de routage PCB SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.9-2 : Modèle de routage PCB SDIO</em></div>

La figure 6.9-2 indique aussi un espacement ≥0,15 mm entre CMD et le blindage de masse adjacent.

Le schéma SDIO étiquette PA11 MPI2_VDD_EN/SD_VDD_EN. Les notes d'application et le guide de conception de schéma OpenSiFli, de priorité supérieure, indiquent PA21 pour la commutation de l'alimentation du stockage de démarrage ; retenez PA21 comme référence étayée par les sources. L'entrée PA11 du classeur de la liste de contrôle pour la Flash externe des variantes sur batterie ne précise pas s'il s'agit d'une commande distincte. Ne substituez pas PA11 sans clarification. Avant validation, confirmez auprès de SiFli le réseau et la variante concernés ; voir [Stockage et fabrication](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control).

### 6.10. Routage du circuit DC/DC { #610-dcdc-circuit-routing }

Placez l'inductance de puissance et les condensateurs de filtrage près des broches de la puce. Gardez la piste BUCK_LX courte et large, et donnez à la piste de contre-réaction BUCK_FB une largeur supérieure à 0,25 mm. Reliez au plan de masse principal, par plusieurs vias, les broches de masse de tous les condensateurs de filtrage de sortie DC/DC. Ne réalisez aucun remplissage de cuivre sur la couche supérieure dans la zone de l'inductance de puissance et conservez un plan de masse de référence continu sur la couche adjacente.

![Figure 6.10-1 : Schéma des composants clés DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-1 : Schéma des composants clés DC/DC</em></div>

![Figure 6.10-2 : Implantation des composants principaux du DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.10-2 : Implantation des composants principaux du DC/DC</em></div>

La figure 6.10-1 utilise une inductance de 4,7 uH et un condensateur de sortie de 4,7 uF/10 V. Les libellés PMU_BUCK_VSW et PMU_BUCK_VOUT correspondent respectivement au nœud de commutation et au nœud de sortie/contre-réaction, désignés BUCK_LX et BUCK_FB dans le tableau de broches de la source. Ne faites passer aucune autre piste dans la zone de l'inductance.

### 6.11. Routage de l'alimentation { #611-power-supply-routing }

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    VCC est la broche d'entrée du module PMU interne de la puce — placez son condensateur près de la broche, avec une largeur de piste non inférieure à 0,4 mm. Placez les condensateurs de filtrage pour VDD_VOUT1, VDD_VOUT2, VDD_RET, VDD_RTC, VDD18_VOUT, VDD33_VOUT1, VDD33_VOUT2, AVDD33_AUD et AVDD_BRF près de leurs broches respectives, avec des largeurs de piste dimensionnées pour le courant d'entrée requis.

    ![Figure 6.11-1 : Routage d'alimentation VCC (schéma)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 6.11-1 : Routage d'alimentation VCC (schéma)</em></div>

    ![Figure 6.11-2 : Routage d'alimentation VCC (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 6.11-2 : Routage d'alimentation VCC (PCB)</em></div>

    **Routage du circuit de charge**

    VBUS et VBAT sont les broches d'entrée/sortie du module de charge interne de la puce — placez leurs condensateurs de filtrage près des broches. Comme la boucle de charge transporte un courant relativement élevé, utilisez des largeurs de piste d'au moins 16 mil (environ 0,41 mm) et évitez de router des signaux sensibles en parallèle avec elles. Utilisez un routage en étoile afin que le chemin de charge ne partage pas de tronçon de piste avec des circuits sensibles. La note d'application arrondit ce minimum à 0,4 mm.

    ![Figure 6.11-3 : Routage d'alimentation VBUS et VBAT (schéma)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 6.11-3 : Routage d'alimentation VBUS et VBAT (schéma)</em></div>

    ![Figure 6.11-4 : Routage d'alimentation VBUS et VBAT (PCB)](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 6.11-4 : Routage d'alimentation VBUS et VBAT (PCB)</em></div>

    !!! note "Schéma de charge de référence"
        La figure 6.11-3 montre 10 uF/10 V sur VBUS et 4,7 uF/10 V sur VBAT. La plage VBUS imprimée est de 4,3–5,5 V ; Electrical Specification-A3 indique 4,5–5,5 V, tandis que la note d'application des variantes sur batterie spécifie 4,6–5,5 V pour le chargeur intégré et exige au moins 4,6 V sur la broche VBUS au courant de charge maximal. La figure illustre l'implantation et ne valide pas 4,3 V comme tension minimale de fonctionnement. Consultez aussi la note sur les divergences de sources en section 5.2.

=== "52B/D/E/G/J (alimentation régulée externe)"

    PVDD est la broche d'entrée du module PMU interne de la puce. Placez son condensateur près de la broche et utilisez une piste d'au moins 0,4 mm de large. Placez également les condensateurs de filtrage d'AVDD33, de VDDIOA, de VDD_SIP, d'AVDD33_AUD et d'AVDD_BRF près de leurs broches respectives. Dimensionnez les largeurs de piste pour le courant d'entrée requis et gardez les pistes aussi courtes et larges que possible afin de réduire l'ondulation de l'alimentation et d'améliorer la stabilité du système.

    ![Figure 6.11-5 : Routage d'alimentation PVDD](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 6.11-5 : Routage d'alimentation PVDD</em></div>

    !!! info "Non applicable"
        Cette variante n'a pas de circuit de gestion de charge, donc aucun routage de circuit de charge n'est requis.

### 6.12. Routage des autres interfaces { #612-other-interface-routing }

Blindez les pistes d'entrée GPADC par la masse et éloignez-les des autres circuits susceptibles de provoquer des interférences, notamment ceux de mesure du niveau de batterie et de détection de température.

### 6.13. EMI et ESD { #613-emi-esd }

Appliquez ces règles EMI et ESD aux deux groupes de conception :

- N'acheminez pas sur la couche supérieure les longues lignes d'horloge et d'alimentation perturbatrices situées hors du blindage ; utilisez les couches internes.
- Placez les composants de protection ESD près des broches du connecteur, en acheminant les signaux à travers le composant ESD avant tout autre chose
- Assurez-vous que les broches de masse du composant ESD se connectent à la masse principale par des vias, avec des pistes de pastille de masse courtes et larges pour réduire l'impédance et améliorer les performances ESD

### 6.14. Autres considérations { #614-other-considerations }

Placez les points de test de la ligne de charge USB côté connecteur, avant le point de protection TVS. Placez le TVS côté batterie à l'entrée de la carte, avant les branches vers le MCU et les autres charges. Faites passer la piste par le point de connexion du TVS avant d'atteindre la puce. Le TVS lui-même est connecté en dérivation vers la masse, pas en série. Gardez sa connexion de masse courte.

![Figure 6.14-1 : Référence de placement du TVS d'alimentation](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-1 : Référence de placement du TVS d'alimentation</em></div>

![Figure 6.14-2 : Référence de routage du TVS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 6.14-2 : Référence de routage du TVS</em></div>
