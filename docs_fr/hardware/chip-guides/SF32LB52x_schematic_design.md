---
icon: lucide/circuit-board
hide:
    - navigation
description: "Recommandations de conception de schéma pour le MCU SF32LB52x : système minimal, alimentation et génération d'horloge."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x — Recommandations de conception du schéma { #sf32lb52x-hardware-design-guide-schematic-design-guidelines }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Les recommandations de conception du schéma s'étendent désormais sur trois pages : cette page (sections 5.1-5.3 : Système minimal, Alimentation, et Horloge), [RF et interfaces utilisateur](SF32LB52x_schematic_rf_interfaces.md) (sections 5.4-5.5), et [Stockage et fabrication](SF32LB52x_schematic_storage_mfg.md) (sections 5.6-5.7). Partez de l'[aperçu du Guide de conception matérielle SF32LB52x](SF32LB52x_hardware_design_guide.md) pour la sélection du composant et le flux de conception complet, ou consultez la [Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) pour la revue point par point.

## 5. Recommandations de conception du schéma { #5-schematic-design-guidelines }

Ce chapitre présente le flux de conception du schéma sur trois pages. Commencez par valider le système minimal, puis examinez sur cette page l'alimentation et la génération d'horloge, sur la suivante la RF et les interfaces utilisateur, et enfin le stockage, les accès nécessaires à la fabrication et les décisions liées au PCB. Pour chaque bloc, précisez d'abord l'objectif de conception et les variantes concernées, puis vérifiez les exigences du circuit, l'affectation des broches, les erreurs courantes et les points de la liste de contrôle de publication.

<div align="center"><em>Tableau 5-1 : Navigation du chapitre du schéma</em></div>

<div align="center" markdown>

| Bloc | Décision principale | Éléments de preuve pour la publication |
|:---|:---|:---|
| Conception du système minimal | Variante exacte, boîtier, stockage de démarrage, broches de bootstrap, accès de débogage/téléchargement, et chemin de mise en service minimal | Revue du système minimal, tableau de bootstrap, points de test de débogage, plan de démarrage et de récupération |
| Système d'alimentation | Arbre d'alimentation de la variante, chemin de charge, BUCK, LDO, rail de stockage de démarrage, modes de fonctionnement, et sources de réveil | Revue de l'arbre d'alimentation, composants AVL, réglages du chargeur/OVP, plan de basse consommation et de sources de réveil |
| Génération d'horloge | Sélection des quartz 48 MHz et 32,768 kHz, capacité de charge et hypothèses d'étalonnage | Vérification CL/ESR des quartz, captures d'écran de placement et de routage, plan d'étalonnage |
| RF | Adaptation RF, chemin d'antenne, et accès au réglage | Plan d'impédance RF, capture d'écran de placement du réseau d'adaptation, plan de réglage d'antenne |
| Interfaces utilisateur | Affichage, audio, boutons, et moteur de vibration | Revue du schéma d'interface, broches de cadencement et de commande, séquencement d'alimentation, revue analogique |
| Stockage et connectivité | Support de démarrage, broches de bootstrap, interrupteur d'alimentation du stockage, capteurs, UART/I2C, et GPTIM | Tableau de bootstrap, divergence des sources PA11/PA21, affectation de bus, revue du rail de stockage |
| Fabrication | DBG_UART/SWD, points de test, flashage en production, accès pour l'étalonnage et listes de contrôle de publication | Plan des points de test, plan du dispositif de test en production, éléments de preuve de publication complets |

</div>

### 5.1. Conception du système minimal { #51-minimum-system-design }

La conception du système minimal constitue le premier point de contrôle de publication du schéma d'une carte SF32LB52x. Elle couvre les décisions qui doivent être correctes avant l'ajout des périphériques du produit : variante exacte du composant, boîtier, arbre d'alimentation, support de démarrage, résistances de bootstrap, contrôle d'alimentation du stockage, accès de débogage/téléchargement, sources d'horloge et comportement de réveil. Le câblage de l'afficheur ou des capteurs peut souvent être modifié tardivement ; en revanche, la carte ne tolère généralement pas une configuration incorrecte des broches de bootstrap du stockage, l'absence d'accès de débogage, un rail instable ou une hypothèse incompatible sur les états d'alimentation.

Effectuez la première revue du schéma dans l'ordre suivant :

1. Sélectionnez le composant et le boîtier exacts depuis les sections 3.2 et 3.3.
2. Choisissez le chemin d'alimentation correct : `SF32LB520/3/5/7` pour les produits alimentés par batterie rechargeable, ou `52B/D/E/G/J` pour les produits à régulation externe.
3. Verrouillez les décisions du système d'alimentation à la section 5.2, y compris `VBUS`/`VBAT`/`VCC` ou `PVDD`/`VDDIOA`/`VDD_SIP`, le BUCK, le découplage du LDO interne, les rails RF/audio, et tous les interrupteurs d'alimentation basse consommation.
4. Sélectionnez le support de démarrage et configurez les résistances de polarisation des broches de bootstrap `PA13`/`PA17` pour correspondre au tableau de démarrage de la section 5.6.1.
5. Confirmez la broche de commande de l'interrupteur d'alimentation du stockage de démarrage au regard de la divergence entre les sources, avant le routage. Les notes d'application et le guide du schéma indiquent `PA21`, tandis que la liste de contrôle officielle indique `PA11` pour la Flash externe des variantes sur batterie.
6. Réservez `PA18`/`PA19`, la masse, et une référence d'alimentation valide pour l'accès DBG_UART/SWD avant que le coffret du produit et le dispositif de test en production ne soient figés.
7. Sélectionnez les quartz 48 MHz et 32,768 kHz depuis la section 5.3.1 et gardez leurs contraintes de placement visibles pendant la revue du schéma.
8. Définissez les broches de réveil, le comportement du bouton d'alimentation, les événements du chargeur et les états de mise hors tension du stockage et des capteurs avant d'arrêter la politique de basse consommation du firmware.

À l'issue de ce point de contrôle, le schéma devrait permettre la mise sous tension, le démarrage depuis le support sélectionné, l'accès à une voie de récupération, l'étalonnage de l'horloge et le passage à l'état de basse consommation prévu, sans dépendre de périphériques optionnels du produit.

### 5.2. Système d'alimentation { #52-power-system }

La conception du système d'alimentation définit les rails, les interrupteurs d'alimentation, le chemin de charge, l'OVP, l'utilisation des LDO internes, le comportement de réveil et les états de basse consommation qui assurent la fiabilité du système minimal. Terminez cette section avant le placement des composants sur le PCB, car les choix ultérieurs concernant l'affichage, le stockage, la RF, l'audio et les capteurs dépendent de l'architecture d'alimentation retenue.

#### 5.2.1. Alimentation { #521-power-supply }

**Résumé rapide**

- Pour les composants alimentés par batterie, suivez la configuration `SF32LB520/3/5/7` et définissez `VBUS`, `VBAT`, `VCC`, la charge et l'OVP.
- Les composants à alimentation externe régulée utilisent la configuration `52B/D/E/G/J`, avec `PVDD` et `VDDIOA` régulés à l'extérieur. Configurez `VDD_SIP` selon la référence exacte : alimentation externe ou LDO interne. Il n'y a pas de circuit de charge intégré.
- L'inductance BUCK, le découplage du LDO interne, les rails RF/audio, et les interrupteurs d'alimentation de veille doivent être fixés avant le placement PCB.

**Objectif de conception**

Concevoir une architecture d'alimentation stable et à faible courant de fuite, adaptée à la variante sélectionnée. Elle doit éviter de surcharger les sorties des LDO internes, limiter le bruit sur les rails d'alimentation RF et audio et permettre de couper les charges inutilisées ainsi que le stockage de démarrage en mode basse consommation.

##### 5.2.1.1. Exigences d'alimentation du processeur { #5211-processor-power-supply-requirements }

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    <div align="center"><em>Tableau 5.2-1 : Exigences d'alimentation (variante alimentée par batterie)</em></div>

    <div align="center" markdown>

    | Broche | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
    |:---|:---|:---|:---|:---|:---|
    | VBUS | 4,5 | 5,0 | 5,5 | 500 | Entrée d'alimentation VBUS ; voir la note sur la divergence des sources |
    | VBAT | 3,2 | - | 4,7 | 500 | Sortie d'alimentation VBAT |
    | VCC | 3,2 | - | 4,7 | 500 | Entrée d'alimentation système (1) |
    | VSYS | - | 3,3 | - | 500 | Sortie d'alimentation VSYS (2) |
    | BUCK_LX | - | 1,25 | - | 50 | Broche de sortie BUCK, se connecte à l'inductance |
    | BUCK_FB | - | 1,25 | - | 50 | Entrée de rétroaction BUCK / alimentation interne, se connecte à l'autre extrémité de l'inductance plus un condensateur externe |
    | VDD_VOUT1 | - | 1,1 | - | 50 | LDO interne, condensateur externe, n'alimente pas de périphériques |
    | VDD_VOUT2 | - | 0,9 | - | 20 | LDO interne, condensateur externe, n'alimente pas de périphériques |
    | VDD_RET | - | 0,9 | - | 1 | LDO interne, condensateur externe, n'alimente pas de périphériques |
    | VDD_RTC | - | 1,1 | - | 1 | LDO interne, condensateur externe, n'alimente pas de périphériques |
    | VDD18_VOUT | - | 1,8 | - | 30 | Alimentation SIP (3), interne, n'alimente pas de périphériques ; peut être alimentée en externe lorsque le LDO est désactivé |
    | VDD33_VOUT1 | - | 3,3 | - | 150 | Sortie LDO 3,3 V n° 1 (4), sortie désactivée par défaut ; nécessite une configuration logicielle |
    | VDD33_VOUT2 | - | 3,3 | - | 150 | Sortie LDO 3,3 V n° 2, sortie désactivée par défaut ; nécessite une configuration logicielle |
    | AVDD33_AUD | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio 3,3 V |
    | AVDD_BRF | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF |
    | MIC_BIAS | 1,4 | - | 2,8 | - | Sortie d'alimentation du microphone |

    </div>

    (1) Lorsque VCC est alimenté par une batterie au lithium, le seuil logiciel de batterie faible est fixé par défaut à 3,48 V. Avec une source à tension constante, la plage admise est de 3,6–4,7 V ; la valeur recommandée est 3,8 V.
    (2) VSYS alimente AVDD_BRF.
    (3) VDD18_VOUT : le SF32LB520U36 nécessite une alimentation externe 3,3 V ; les SF32LB523/5/7Ux6 utilisent le LDO interne et n'ont besoin d'aucune alimentation externe. Configurez par logiciel le LDO VDD18 interne selon la référence de la puce, et ne l'activez pas lorsqu'il est alimenté en externe.
    (4) VDD33_VOUT1 : sur SF32LB520U36, il alimente uniquement VDD18_VOUT, la Flash externe, et AVDD33_AUD ; sur SF32LB523/5/7Ux6, il alimente uniquement la Flash externe et AVDD33_AUD.

=== "52B/D/E/G/J (alimentation externe régulée)"

    <div align="center"><em>Tableau 5.2-2 : Exigences d'alimentation (variante à alimentation externe régulée)</em></div>

    <div align="center" markdown>

    | Broche | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
    |:---|:---|:---|:---|:---|:---|
    | PVDD | 2,97 | 3,3 | 3,63 | 150 | Entrée d'alimentation système PVDD, condensateur 10 µF |
    | BUCK_LX | - | 1,25 | - | 50 | Broche de sortie BUCK, se connecte à une inductance de 4,7 µH |
    | BUCK_FB | - | 1,25 | - | 50 | Entrée de rétroaction BUCK / alimentation interne, se connecte à l'autre extrémité de l'inductance plus un condensateur de 4,7 µF |
    | VDD_VOUT1 | - | 1,1 | - | 50 | LDO interne, condensateur 4,7 µF, n'alimente pas de périphériques |
    | VDD_VOUT2 | - | 0,9 | - | 20 | LDO interne, condensateur 4,7 µF, n'alimente pas de périphériques |
    | VDD_RET | - | 0,9 | - | 1 | LDO interne, condensateur 0,47 µF, n'alimente pas de périphériques |
    | VDD_RTC | - | 1,1 | - | 1 | LDO interne, condensateur 1 µF, n'alimente pas de périphériques |
    | VDDIOA | 1,71 | 1,8/3,3 | 3,63 | - | Entrée d'alimentation GPIO, condensateur 1 µF |
    | AVDD33 | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation analogique 3,3 V, condensateur 4,7 µF |
    | AVDD33_AUD | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio 3,3 V, condensateur 2,2 µF |
    | VDD_SIP | 1,71 | 1,8/3,3 | 3,63 | 30 | LDO interne ou alimentation externe (1), condensateur 1 µF |
    | AVDD_BRF | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation analogique, condensateur 4,7 µF |
    | MIC_BIAS | 1,4 | - | 2,8 | - | Sortie d'alimentation du microphone, condensateur 1 µF |

    </div>

    (1) VDD_SIP : le SF32LB52BU36 nécessite une alimentation externe 1,8 V ou 3,3 V ; le SF32LB52BU56 nécessite une alimentation externe 3,3 V ; le SF32LB52DUB6 nécessite une alimentation externe 1,8 V ; les SF32LB52E/G/JUx6 sont alimentés directement par le LDO interne et n'ont besoin d'aucune alimentation externe.

    !!! important "Remarque sur le mode Hibernate"
        À l'entrée en mode Hibernate, VDD_SIP doit être coupé ; sinon, un courant de fuite peut circuler par les E/S de la mémoire intégrée dans le même boîtier. Utilisez la broche dédiée PA21 pour commander l'interrupteur d'alimentation de VDD_SIP.

##### 5.2.1.2. Sélection de l'inductance BUCK { #5212-buck-inductor-selection }

Les deux groupes de conception utilisent la même spécification d'inductance.

!!! important "Paramètres clés de l'inductance de puissance"
    L (inductance) = 4,7 µH ± 20 %, DCR (résistance CC) ≤ 0,4 Ω, Isat (courant de saturation) ≥ 450 mA.

##### 5.2.1.3. Batterie et contrôle de charge { #5213-battery-and-charging-control }

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    Le circuit de charge peut utiliser un circuit intégré externe ou le bloc de gestion de charge intégré au microcontrôleur.

    **Puce de gestion de charge externe**

    Les circuits intégrés de charge externes peuvent intégrer ou non une gestion du chemin d'alimentation (PPM). Sans PPM, la batterie alimente directement les broches VBAT et VCC. Avec PPM, le VSYS du chargeur alimente VCC, et le VBAT du chargeur se connecte à la fois à la batterie et à la broche VBAT de la puce. Dans les deux cas, la tension de la batterie est mesurée via la broche VBAT, qui dispose d'un canal GPADC intégré avec une précision d'échantillonnage de ±30 mV.

    ![Figure 5.2-1 : Circuit de charge externe sans PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-1 : Circuit de charge externe sans PPM</em></div>

    ![Figure 5.2-2 : Circuit de charge externe avec PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-2 : Circuit de charge externe avec PPM</em></div>

    Avec PPM, reliez la sortie VSYS du chargeur à la broche VCC de la puce et maintenez la tension de sortie VSYS par défaut du chargeur à 4,7 V au maximum, qui est la tension d'entrée maximale de VCC.

    **Module de gestion de charge intégré sur puce**

    Avec le bloc de charge intégré, si l'appareil est éteint parce que la tension de la batterie est trop faible, la connexion du chargeur ne permet pas un démarrage immédiat. La batterie doit d'abord atteindre le seuil de mise sous tension ; le système peut alors démarrer et afficher l'écran de charge.

    ![Figure 5.2-3 : Circuit de gestion de charge intégré](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-3 : Circuit de gestion de charge intégré</em></div>

    **Sélection de la puce OVP (lors de l'utilisation du module de charge intégré)**

    La plage d'entrée VBUS est de 4,5 V–5,5 V. Choisissez l'un des types de puce OVP suivants :

    - Puce OVP à OVLO ajustable, par ex. AW32905FCR — réglez l'OVLO entre 5,2 V et 5,5 V (tolérance VOVLO_TH ≤3 %, tolérance des résistances ≤1 %)
    - Puce OVP à sortie régulée, par ex. SGM4064YDE8G ou LP5305AQVF — la sortie du régulateur doit être entre 4,5 V et 5,4 V

    !!! important "Limites de VBUS et de l'OVP : divergence dans la source"
        La note d'application OpenSiFli des variantes sur batterie contient des indications VBUS contradictoires : la section de sélection de l'OVP donne 4,5–5,5 V pour la broche VBUS du composant, tandis que le tableau d'alimentation et les notes du chargeur intégré indiquent 4,6–5,5 V et exigent au moins 4,6 V sur la broche au courant de charge maximal. Electrical Specification-A3 donne une plage générale de 4,5–5,5 V, et le schéma de charge de référence porte l'indication 4,3–5,5 V. Avec le chargeur intégré, maintenez au moins 4,6 V sur la broche en charge maximale jusqu'à ce que SiFli précise la limite minimale applicable ; l'indication 4,3 V du schéma n'est pas une limite basse approuvée.

        La même note fixe `VIN_OVLO` entre 5,2 et 5,5 V pour les composants OVP à OVLO réglable ; la tolérance de `VOVLO_TH` est ≤3 % et celle de R1/R2, ≤1 %. Pour les composants OVP à sortie régulée, elle spécifie une sortie LDO de 4,5 à 5,4 V. Il s'agit de réglages propres à chaque topologie OVP, et non de plages de fonctionnement VBUS du composant interchangeables. Tenez compte des tolérances des composants et confirmez auprès de SiFli la conception approuvée.

    ![Figure 5.2-4 : Formule du point de réglage OVLO](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-4 : Formule du point de réglage OVLO</em></div>

    ![Figure 5.2-5 : Circuit d'application OVP à OVLO ajustable](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-5 : Circuit d'application OVP à OVLO ajustable</em></div>

    ![Figure 5.2-6 : Circuit d'application OVP à sortie régulée](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-6 : Circuit d'application OVP à sortie régulée</em></div>

    !!! important "Remarques sur le module de charge intégré"
        - Plage d'entrée VBUS : 4,6 V–5,5 V
        - Plage d'entrée VCC : 3,2 V–4,7 V
        - Courant de précharge par défaut : 56 mA, tension de passage de la précharge à la charge à courant constant : 3,0 V
        - Courant de charge à courant constant par défaut : 65 mA, ajustable de 5 à 560 mA
        - Tension de pleine charge par défaut : 4,2 V, ajustable jusqu'à 4,45 V
        - Tension de recharge : tension de pleine charge - 0,15 V
        - Le VBUS du chargeur doit fournir au moins 350 mA ; la tension de la broche VBUS ne doit pas descendre en dessous de 4,6 V au courant de charge maximal
        - Pour la charge sans fil, assurez-vous que la capacité d'alimentation du chargeur sans fil dépasse le courant de charge constant

    !!! important "Remarques sur le LDO intégré"
        - La capacité totale sur les chemins de sortie VDD33_VOUT1 et VDD33_VOUT2 ne doit pas dépasser 9,6 µF
        - AVDD33_AUD doit être alimenté depuis VDD33_VOUT1, pas depuis VSYS
        - Le LCD ne doit pas être alimenté par le LDO interne — utilisez un LDO externe

=== "52B/D/E/G/J (alimentation externe régulée)"

    !!! info "Non applicable"
        Cette variante est alimentée directement par une source externe régulée et **ne comporte pas de circuit de gestion de charge**. Cette section ne s'applique pas. Si votre produit nécessite une alimentation par batterie et une fonction de charge, utilisez plutôt la série SF32LB520/3/5/7.

##### 5.2.1.4. Réduction de la consommation en veille { #5214-reducing-standby-power }

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    Structure d'alimentation recommandée : **VDD33_VOUT2** alimente le moteur de vibration, **VDD33_VOUT1** alimente la Flash externe et les capteurs, et le LCD utilise un LDO externe.

    ![Figure 5.2-7 : Schéma de structure d'alimentation système SF32LB52x](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.2-7 : Schéma de structure d'alimentation système SF32LB52x</em></div>

    Définissez soigneusement l'état matériel initial des GPIO qui commandent les interrupteurs d'alimentation. Ajoutez des résistances de rappel au niveau haut ou bas, de l'ordre du mégohm, pour que ces interrupteurs soient désactivés par défaut. Choisissez des LDO et des interrupteurs d'alimentation à faible courant de repos (Iq) et à faible courant d'arrêt (Istb). Accordez une attention particulière à l'Iq des composants d'alimentation qui restent toujours actifs.

=== "52B/D/E/G/J (alimentation externe régulée)"

    Utilisez des interrupteurs d'alimentation pour la gestion dynamique de l'alimentation de chaque bloc fonctionnel ; pour les modules ou chemins toujours actifs, sélectionnez des composants à faible courant de repos.

    Définissez soigneusement l'état matériel initial des GPIO qui commandent les interrupteurs d'alimentation. Ajoutez des résistances de rappel au niveau haut ou bas, de l'ordre du mégohm, pour que ces interrupteurs soient désactivés par défaut. Choisissez des LDO et des interrupteurs d'alimentation à faible courant de repos (Iq) et à faible courant d'arrêt (Istb). Accordez une attention particulière à l'Iq des composants d'alimentation qui restent toujours actifs.

##### 5.2.1.5. Liste de contrôle de conception de l'alimentation { #5215-power-design-checklist }

- [ ] La variante d'alimentation correspondant au modèle exact est confirmée (batterie / source externe régulée).
- [ ] L'inductance BUCK respecte 4,7 µH ±20 %, DCR ≤0,4 Ω, Isat ≥450 mA
- [ ] Tous les condensateurs de découplage du LDO interne sont placés selon les exigences
- [ ] L'alimentation du LCD est isolée et non alimentée directement par le LDO interne
- [ ] Les rails d'alimentation audio et RF sont correctement filtrés
- [ ] Variante alimentée par batterie : chemin de charge et plages de tension du composant OVP vérifiés ; variante à alimentation externe régulée : alimentation VDD_SIP/VDDIOA configurée conformément au modèle de puce.

**Erreurs courantes - Alimentation**

- Alimenter le LCD directement depuis un LDO interne au lieu d'un LDO externe.
- Mélanger dans un même schéma les hypothèses d'alimentation par batterie et d'alimentation externe régulée.
- Laisser `VDD_SIP` alimenté en mode Hibernate sur les variantes où la fuite du stockage est un risque.
- Choisir un chargeur ou un composant OVP sans vérifier le courant VBUS dans le pire cas et la plage de tension.

**Vérifications à la mise en service - Alimentation**

- Mesurez `VCC`/`PVDD`, la sortie BUCK, les rails RF/audio, et l'alimentation du stockage avant que le firmware n'active les périphériques.
- Sur les conceptions alimentées par batterie, vérifiez la détection de connexion du chargeur, la précharge, la charge à courant constant et le comportement de recharge.
- Mesurez le courant en Standby et en Hibernate avec les interrupteurs d'alimentation de l'afficheur, des capteurs, du stockage, et du moteur désactivés.

#### 5.2.2. Modes de fonctionnement et sources de réveil { #522-operating-modes-and-wake-sources }

**En bref**

- Active et Sleep conservent une réponse rapide aux interruptions ; DeepSleep et Standby réduisent le courant, au prix d'un temps de réveil plus long.
- Hibernate est l'état de plus basse consommation, mais la SRAM n'est pas conservée et certaines alimentations externes doivent être coupées.
- Le choix des GPIO pouvant servir de sources de réveil influe sur les boutons, les interruptions tactiles, les événements du chargeur et le réveil par les capteurs.

**Objectif de conception**

Choisir les sources de réveil et l'état par défaut des interrupteurs d'alimentation externes afin que le produit puisse atteindre l'état de basse consommation prévu sans courant de fuite ni événement de réveil manqué.

!!! note "Conception partagée"
    Les modes de fonctionnement et le comportement des sources de réveil sont communs à toute la famille SF32LB52x, sauf si l'architecture d'alimentation du produit désactive volontairement une source de réveil externe.

<div align="center"><em>Tableau 5.2-3 : Tableau des modes du CPU</em></div>

<div align="center" markdown>

| Mode | CPU | Périphériques | SRAM | IO | LPTIM | Source de réveil | Temps de réveil |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Active | En fonctionnement | En fonctionnement | Accessible | Peut basculer | En fonctionnement | - | - |
| Sleep | Arrêté | En fonctionnement | Accessible | Peut basculer | En fonctionnement | Toute interruption | <0,5 µs |
| DeepSleep | Arrêté | Arrêtés | Inaccessible, entièrement conservée | Niveau maintenu | En fonctionnement | RTC, IO de réveil, GPIO, LPTIM, Bluetooth | 250 µs |
| Standby | Réinitialisé | Réinitialisés | Inaccessible, entièrement conservée | Niveau maintenu | En fonctionnement | RTC, IO de réveil, LPTIM, Bluetooth | 1 ms |
| Hibernate | Réinitialisé | Réinitialisés | Inaccessible, non conservée | Haute impédance | Réinitialisé | RTC, IO de réveil | >2 ms |

</div>

En modes Standby et Hibernate, toute la famille prend en charge 15 sources d'interruption capables de réveiller le système :

<div align="center"><em>Tableau 5.2-4 : Tableau des sources de réveil par interruption</em></div>

<div align="center" markdown>

| Source de réveil | Broche | Source de réveil | Broche |
|:---|:---|:---|:---|
| LWKUP_PIN0 | PA24 | LWKUP_PIN12 | PA36 |
| LWKUP_PIN1 | PA25 | LWKUP_PIN13 | PA37 |
| LWKUP_PIN2 | PA26 | LWKUP_PIN14 | PA38 |
| LWKUP_PIN3 | PA27 | LWKUP_PIN15 | PA39 |
| LWKUP_PIN10 | PA34 | LWKUP_PIN16 | PA40 |
| LWKUP_PIN11 | PA35 | LWKUP_PIN17 | PA41 |
| — | — | LWKUP_PIN18 | PA42 |
| — | — | LWKUP_PIN19 | PA43 |
| — | — | LWKUP_PIN20 | PA44 |

</div>

**Liste de contrôle des modes de fonctionnement**

- [ ] Les broches de réveil requises sont affectées avant que le multiplexage des broches ne soit figé.
- [ ] Les états de polarisation sur les broches de réveil sont compatibles avec Standby et Hibernate.
- [ ] Les alimentations du stockage externe et des capteurs ne provoquent pas de courant de fuite par les broches d'E/S en Hibernate.
- [ ] Les équipes firmware et matériel s'accordent sur l'état utilisé pour l'expédition, le stockage en rayon, et les modes de veille normaux.

### 5.3. Génération d'horloge { #53-clock-generation }

#### 5.3.1. Sélection du quartz { #531-crystal-selection }

**Résumé rapide**

- Utilisez un quartz principal 48 MHz et un quartz RTC 32,768 kHz.
- Privilégiez les composants à faible CL et faible ESR de l'AVL pour réduire le courant de démarrage et le courant de repos.
- Gardez les pistes du quartz courtes, blindées, et à l'écart de la chaleur, de la RF, du chargeur, du PMU, et du bruit du DC/DC.

**Objectif de conception**

Fournir des sources d'horloge stables et à faible gigue tout en minimisant le courant de l'oscillateur, la dérive de fréquence, les interférences RF, et le risque à la mise en service.

La puce nécessite deux sources d'horloge externes : un quartz principal 48 MHz et un quartz RTC 32,768 kHz. Les exigences sont identiques pour les deux variantes.

!!! important "Exigences de spécification du quartz"
    <div align="center"><em>Tableau 5.3-1 : Exigences de spécification du quartz</em></div>

    <div align="center" markdown>

    | Quartz | Exigence | Remarques |
    |:---|:---|:---|
    | 48 MHz | 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω recommandé) | Un CL et un ESR plus faibles réduisent la consommation ; des condensateurs d'adaptation sont généralement inutiles lorsque CL < 12 pF |
    | 32,768 kHz | CL ≤ 12,5 pF (7 pF recommandé), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ recommandé) | Un CL et un ESR plus faibles réduisent la consommation ; des condensateurs d'adaptation sont généralement inutiles lorsque CL < 12,5 pF |

    </div>

Quartz recommandés :

<div align="center"><em>Tableau 5.3-2 : Liste des quartz recommandés</em></div>

<div align="center" markdown>

| Référence | Fabricant | Paramètres |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0=48 MHz, ΔF/F0=-6~8 ppm, CL=8,8 pF, ESR≤22 Ω, TOPR=-30~85 °C, boîtier métrique 2016 |
| SX20Y048000B31T-8.8 | TKD | F0=48 MHz, ΔF/F0=-10~10 ppm, CL=8,8 pF, ESR≤40 Ω, TOPR=-20~75 °C, boîtier métrique 2016 |
| ETST00327000LE | Hosonic | F0=32,768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85 °C, boîtier métrique 3215 |
| SF32K32768D71T01 | TKD | F0=32,768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85 °C, boîtier métrique 3215 |

</div>

!!! note "Remarques supplémentaires"
    Le TKD SX20Y048000B31T-8.8 présente un ESR quelque peu plus élevé, ce qui augmente légèrement la consommation statique. La note d'application de SiFli sur le schéma recommande également de supprimer au moins le cuivre GND du deuxième plan sous le quartz 48 MHz afin de réduire la capacité de charge parasite. Or, le guide de routage PCB interdit les évidements de plan ou découpes de cuivre sous le quartz sur les couches adjacentes. Ces consignes se contredisent ; voir [Routage de l'interface d'horloge](SF32LB52x_pcb_layout.md#65-clock-interface-routing). Confirmez avec SiFli le traitement de couche attendu avant de figer le routage.

!!! important "Exception concernant l'ESR du quartz dans la source"
    La source cite le TKD SX20Y048000B31T-8.8 avec ESR ≤ 40 Ω, alors que l'exigence générale à 48 MHz est ESR ≤ 30 Ω. Il faut donc vérifier la qualification de cette référence précise, sans en déduire que tout quartz de 40 Ω convient. Avant la publication, confirmez son approbation dans l'AVL en vigueur et validez le démarrage, l'étalonnage de fréquence et le courant de l'oscillateur.

!!! important "La recommandation du quartz 32,768 kHz varie dans la source"
    Le tableau des paramètres 32,768 kHz de la source recommande CL = 7 pF et ESR = 38 kΩ, tandis que le texte recommande CL ≤ 9 pF et ESR ≤ 40 kΩ. Les deux indications figurent dans la source. Confirmez auprès de SiFli la cible à appliquer et la qualification AVL du quartz choisi avant la publication.

Pour les données de qualification complètes et continuellement mises à jour, référez-vous à la [Liste des fournisseurs approuvés SiFli][SiFli Approved Vendor List (AVL)].

**Erreurs courantes - Horloge**

- Sélectionner un quartz uniquement par fréquence et boîtier, sans vérifier le CL, l'ESR, la tolérance, et la plage de température.
- Placer le quartz près du PA, du chargeur, du PMU, de l'adaptation RF, ou d'autres sources de chaleur/bruit.
- Laisser du cuivre ou du routage haute vitesse sous la zone d'exclusion du quartz.
- Router de longues pistes 32 kHz en parallèle sans espacement suffisant ni blindage par la masse.

**Liste de contrôle de l'horloge**

- [ ] Les quartz 48 MHz et 32,768 kHz correspondent aux exigences de l'AVL/fiche technique.
- [ ] La capacité de charge et l'ESR du quartz sont vérifiés par rapport aux limites de l'oscillateur.
- [ ] La zone d'exclusion, la longueur de piste, la largeur de piste, l'espacement, et le blindage de masse sont vérifiés lors de la revue PCB.
- [ ] Le plan de mise en service prévoit la mesure des horloges 48 MHz et 32 kHz ainsi que la vérification de l'étalonnage de fréquence Bluetooth.

---

Poursuivez vers [RF et interfaces utilisateur](SF32LB52x_schematic_rf_interfaces.md).

[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
