---
icon: lucide/list-checks
description: "Liste de contrôle du schéma SF32LB52x : boîtier, alimentation, horloge, RF, stockage, affichage et préparation à la fabrication."
hide:
    - navigation
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle SF32LB52x — Liste de contrôle du schéma { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre la section 5.8, la liste de contrôle du schéma point par point. Retournez à [Système minimal, alimentation et horloge](SF32LB52x_schematic_design.md), première des trois pages consacrées à la conception du schéma.

## 5.8. Liste de contrôle du schéma { #58-schematic-checklist }

Chaque tableau couvre un bloc fonctionnel du schéma. La colonne « S'applique à » précise les variantes d'alimentation ou les révisions du silicium concernées lorsqu'un point de contrôle ne s'applique pas à toutes les variantes.

« Obligatoire » signifie que le point doit être vérifié lorsqu’il s’applique, et non que tous les périphériques énumérés doivent être montés. Les points conditionnels ne s’appliquent qu’en présence du circuit ou de la fonction concernés. Conserver les catégories Obligatoire/Optionnel de la source et distinguer les recommandations des limites impératives.

### 5.8.1. Boîtier { #581-package }

<div align="center"><em>Tableau 5.8.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le boîtier de la référence commerciale sélectionnée est correct, y compris les noms et numéros de broches | Toutes les variantes | Obligatoire |

</div>

### 5.8.2. Alimentation { #582-power-supply }

<div align="center"><em>Tableau 5.8.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La tension d'alimentation VBUS est de <span class="flag-red">4,6 V–5,5 V</span> | 520/3/5/7 uniquement | Obligatoire |
| 2 | Si l'écran doit s'allumer dès le branchement du chargeur, le chargeur intégré n'est pas recommandé ; privilégier un circuit de charge externe avec gestion du chemin d'alimentation | 520/3/5/7 uniquement | Obligatoire |
| 3 | Le chargeur intégré convient uniquement si l'on peut attendre que la batterie atteigne 3,6 V avant que le logiciel n'allume l'écran | 520/3/5/7 uniquement | Obligatoire |
| 4 | Un composant OVP avec sortie LDO intégrée (par ex. LP5305AQVF) est recommandé : sortie LDO de 4,7–5,4 V, courant de sortie ≥0,5 A et seuil de déclenchement de la protection contre les surintensités ≥0,7 A | 520/3/5/7 uniquement | Obligatoire |
| 5 | Avec un composant OVP à OVLO réglable, les résistances du pont diviseur ont une tolérance de 1 % et l’erreur de V_OVLO_TH est inférieure à 3 % ; les valeurs minimale et maximale de V_OVP doivent toutes deux rester dans l’intervalle 5,15–5,55 V. La source présente 5,15 V comme la tension d’entrée maximale du chargeur et 5,55 V comme la limite d’entrée supérieure du chargeur 52x ; voir la note sur les divergences après le tableau | 520/3/5/7 uniquement | Obligatoire |
| 6 | Si le chargeur intégré à la puce n'est pas utilisé, VBUS peut rester non connecté et son condensateur peut être omis. VBAT ne peut alors plus servir de sortie d'alimentation ; ajouter dans ce cas un condensateur externe de 1 µF sur VBAT | 520/3/5/7 uniquement | Obligatoire |
| 7 | Mesure de la tension de batterie : la puce achemine déjà VBAT (ou VBATS) vers un canal GPADC interne ; ne pas relier aussi VBAT à une broche GPADC | Toutes les variantes | Obligatoire |
| 8 | <span class="flag-red">La tension d'alimentation des broches VCC et VBAT est de 3,2 V–4,7 V</span> | 520/3/5/7 uniquement | Obligatoire |
| 9 | Les connexions BUCK_LX et BUCK_FB sont correctes | Toutes les variantes | Obligatoire |
| 10 | Prévoir un point de test ou un condensateur de filtrage facilement accessible pour mesurer la tension de sortie VDD_VOUT1 | Toutes les variantes | Obligatoire |
| 11 | Prévoir un point de test ou un condensateur de filtrage facilement accessible pour mesurer la tension de sortie VDD_VOUT2 | Toutes les variantes | Obligatoire |
| 12 | Prévoir un point de test ou un condensateur de filtrage facilement accessible pour mesurer la tension de sortie VDD_RET | Toutes les variantes | Obligatoire |
| 13 | Prévoir un point de test ou un condensateur de filtrage facilement accessible pour mesurer la tension de sortie VDD_RTC | Toutes les variantes | Obligatoire |
| 14 | AVDD_BRF est alimenté via VSYS | 520/3/5/7 uniquement | Obligatoire |
| 15 | AVDD33_AUD est alimenté via LDO2 | 520/3/5/7 uniquement | Obligatoire |
| 16 | VSYS est une alimentation à usage interne du MCU — ne pas l'utiliser pour alimenter d'autres périphériques | 520/3/5/7 uniquement | Obligatoire |
| 17 | LDO2_OUT est recommandé pour alimenter la mémoire, les capteurs et les périphériques similaires ; un interrupteur de charge peut être ajouté pour commander leur alimentation | 520/3/5/7 uniquement | Obligatoire |
| 18 | <span class="flag-red">La somme des courants de crête de tous les périphériques alimentés par LDO2 est au plus de 150 mA</span> | 520/3/5/7 uniquement | Obligatoire |
| 19 | LDO3_OUT est recommandé pour alimenter le moteur de vibration | 520/3/5/7 uniquement | Obligatoire |
| 20 | <span class="flag-red">La somme des courants de crête de tous les périphériques alimentés par LDO3 est au plus de 150 mA</span> | 520/3/5/7 uniquement | Obligatoire |
| 21 | L'écran LCD nécessite une alimentation LDO dédiée à faible courant de repos (Iq) | Toutes les variantes | Obligatoire |
| 22 | Il est recommandé d'alimenter la LED du capteur de fréquence cardiaque depuis VBAT | Toutes les variantes | Obligatoire |
| 23 | L'entrée de charge nécessite un circuit OVP | Toutes les variantes | Obligatoire |
| 24 | Si la tension de la batterie est trop basse et que le système doit être alimenté par les 5 V de l’entrée du chargeur, un circuit de charge avec gestion du chemin d’alimentation est recommandé ; <span class="flag-red">la tension appliquée à VCC ne doit pas dépasser 4,7 V</span> | 520/3/5/7 uniquement | Obligatoire |
| 25 | <span class="flag-red">SF32LB52DUB6 : PVDD = 1,8 V</span> | 52D uniquement | Obligatoire |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6 : PVDD = 3,3 V</span> | 52B/E/G/J | Obligatoire |
| 27 | <span class="flag-red">SF32LB52BU36 et SF32LB52BU56 : VDD_SIP nécessite une alimentation externe 3,3 V</span> | 52B uniquement | Obligatoire |
| 28 | <span class="flag-red">SF32LB52DUB6 : VDD_SIP nécessite une alimentation externe 1,8 V</span> | 52D uniquement | Obligatoire |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6 : VDD_SIP n'a besoin d'aucune alimentation externe — un condensateur externe suffit</span> | 52E/G/J | Obligatoire |
| 30 | VBATS est le signal de détection de tension batterie ; la plage de détection de tension batterie est de 0–4,5 V | 52B/D/E/G/J | Obligatoire |

</div>

!!! important "Les seuils OVP ne sont pas les limites de fonctionnement de VBUS"
    Le point 5 de la source indique 5,15–5,55 V pour le choix d’un OVLO réglable, tandis que le point 1 reprend la vérification VBUS de 4,6–5,5 V du classeur. Ne pas interpréter 5,55 V comme une tension continue admissible sur VBUS. La [section consacrée au système d’alimentation](SF32LB52x_schematic_design.md#52-power-system) explique les différences entre les sources et cite une autre plage de sélection OVP tirée de la note d’application. Avant d’accepter la conception, confirmer auprès de SiFli les seuils et les limites de fonctionnement du composant choisi.

!!! note "Source et portée des valeurs de VBUS"
    Electrical Specification-A3 indique une plage d'alimentation VBUS de 4,5–5,5 V. La note d'application des variantes sur batterie donne 4,6–5,5 V dans son tableau d'alimentation et exige au moins 4,6 V à la broche VBUS pendant le courant de charge maximal. Ces valeurs relèvent de contextes différents ; tenez compte de la tolérance de l'alimentation et de la chute de tension lors de la vérification de la tension minimale au niveau de la puce.

### 5.8.3. Condensateurs et inductances d'alimentation { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tableau 5.8.3-1 : Liste de contrôle des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Condensateur VBUS ≥10 µF | 520/3/5/7 uniquement | Obligatoire |
| 2 | Condensateur VBAT ≥4,7 µF | 520/3/5/7 uniquement | Obligatoire |
| 3 | Sur SF32LB523/5/7, la broche 24 est VCC — condensateur externe ≥10 µF | 523/5/7 | Obligatoire |
| 4 | Sur les variantes 523/5/7/B/D/E/G/J, <span class="flag-red">la broche 23 est VDD_SIP — condensateur externe ≥2,2 µF</span> | 523/5/7/B/D/E/G/J | Obligatoire |
| 5 | Sur SF32LB520, la broche 24 est un GPIO, PA21 | 520/SS6500 | Obligatoire |
| 6 | Sur SF32LB520, la broche 23 est VCC — condensateur externe ≥10 µF | 520/SS6500 | Obligatoire |
| 7 | Condensateur BUCK_FB = 4,7 µF | Toutes les variantes | Obligatoire |
| 8 | Condensateur VDD_VOUT1 = 4,7 µF | Toutes les variantes | Obligatoire |
| 9 | Condensateur VDD_VOUT2 = 4,7 µF | Toutes les variantes | Obligatoire |
| 10 | Condensateur VDD_RET = 0,47 µF | Toutes les variantes | Obligatoire |
| 11 | Condensateur VDD_RTC = 1 µF | Toutes les variantes | Obligatoire |
| 12 | <span class="flag-red">Capacité totale VDD33_VOUT1 ≤9,6 µF</span> | <span class="flag-red">520/3/5/7 uniquement</span> | Obligatoire |
| 13 | <span class="flag-red">Capacité totale VDD33_VOUT2 ≤9,6 µF</span> | <span class="flag-red">520/3/5/7 uniquement</span> | Obligatoire |
| 14 | <span class="flag-red">Capacité totale VSYS ≤9,6 µF</span> | <span class="flag-red">520/3/5/7 uniquement</span> | Obligatoire |
| 15 | Condensateur MIC_BIAS = 1 µF | Toutes les variantes | Obligatoire |
| 16 | <span class="flag-red">Condensateur AVDD_BRF = 4,7 µF</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 17 | <span class="flag-red">Condensateur AVDD33_AUD = 2,2 µF</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 18 | Condensateur AUD_VREF = 1 µF | Toutes les variantes | Obligatoire |
| 19 | <span class="flag-red flag-yellow">Condensateur VSYS = 4,7 µF</span> | <span class="flag-red flag-yellow">520/3/5/7 uniquement</span> | Obligatoire |
| 20 | Condensateur GPADC VREFP = 4,7 µF | Toutes les variantes | Obligatoire |
| 21 | La référence de l'inductance BUCK figure dans la [liste de fournisseurs approuvés SF32][SiFli Approved Vendor List] (AVL) | Toutes les variantes | Obligatoire |
| 22 | Si l'inductance BUCK ne figure pas dans l'AVL, elle doit respecter L = 4,7 µH, DCR ≤0,4 Ω et Isat ≥450 mA | Toutes les variantes | Obligatoire |
| 23 | <span class="flag-red">En présence d'un GPS ou d'autres périphériques sensibles aux interférences, prévoir sur BUCK_LX une empreinte pour un condensateur de dérivation vers la masse ; sa valeur sera déterminée à partir des résultats des essais</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 24 | <span class="flag-red">Le courant de repos du DCDC sélectionné est enregistré et répond aux exigences du projet</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 25 | <span class="flag-red">Le courant de repos du LDO sélectionné est enregistré et répond aux exigences du projet</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |

</div>

!!! note "Applicabilité de la broche 24 dans la source"
    Le texte du point 3 sur les condensateurs mentionne SF32LB520/3/5/7, mais la colonne « S’applique à » le limite à 523/5/7. Les points 5 et 6 identifient en revanche la broche 24 du SF32LB520 comme PA21 et la broche 23 comme VCC. Ce tableau conserve l’applicabilité plus restreinte du point 3 ; vérifier le brochage de la référence exacte avant de valider la revue.

### 5.8.4. Horloge { #584-clock }

<div align="center"><em>Tableau 5.8.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le quartz principal 48 MHz est une référence commerciale listée à l'AVL | Toutes les variantes | Obligatoire |
| 2 | Si le quartz 48 MHz n'est pas listé à l'AVL, il respecte 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), tolérance de fréquence ≤±10 ppm, ESR ≤30 Ω (22 Ω recommandé) | Toutes les variantes | Obligatoire |
| 3 | Le quartz RTC 32,768 kHz est une référence commerciale listée à l'AVL | Toutes les variantes | Obligatoire |
| 4 | Si le quartz 32,768 kHz n'est pas listé à l'AVL, il respecte CL ≤12,5 pF (7 pF recommandé), tolérance de fréquence ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommandé) | Toutes les variantes | Obligatoire |
| 5 | Sur le 52x, PA24/25/26/27 sont tous capables de délivrer l'horloge xtal32k | Toutes les variantes | Obligatoire |

</div>

### 5.8.5. Configuration Bootstrap { #585-bootstrap-configuration }

<div align="center"><em>Tableau 5.8.5-1 : Liste de contrôle de configuration Bootstrap</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Avec une mémoire externe <span class="flag-purple">Flash SPI NOR, PA13 et PA17 ne nécessitent pas de pull-up</span> | Toutes les variantes | Obligatoire |
| 2 | Avec une mémoire <span class="flag-red">Flash SPI NAND</span> externe, PA13 ne nécessite pas de pull-up ; <span class="flag-red">PA17 nécessite une résistance pull-up de 7,5 kΩ</span> vers VDD de la mémoire | Toutes les variantes | Obligatoire |
| 3 | Avec une mémoire <span class="flag-blue">Flash SD NAND</span> externe, PA17 ne nécessite pas de pull-up ; <span class="flag-blue">PA13 nécessite une résistance pull-up de 7,5 kΩ</span> vers VDD de la mémoire | Toutes les variantes | Obligatoire |
| 4 | Avec une mémoire externe <span class="flag-green">eMMC, PA13 et PA17 nécessitent des résistances pull-up de 7,5 kΩ</span> vers VCCQ de l'eMMC | <span class="flag-red">52D/E/G/J</span> | Obligatoire |

</div>

### 5.8.6. RF { #586-rf }

<div align="center"><em>Tableau 5.8.6-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Indiquer sur le schéma une impédance caractéristique de 50 Ω en asymétrique pour le signal ANT | Toutes les variantes | Obligatoire |
| 2 | Prévoir un réseau d'adaptation en π sur le signal ANT : un condensateur parallèle NC (non monté) et un condensateur série de 15 pF | Toutes les variantes | Obligatoire |
| 3 | Si un filtrage des émissions parasites est nécessaire, prévoir un réseau d'adaptation en π comprenant une inductance série de 2,7 nH et un condensateur parallèle de 2 pF | Toutes les variantes | Optionnel |
| 4 | <span class="flag-red">Si une commande externe du PA/LNA est nécessaire, relier PA00 à RX_EN et PA01 à TX_EN</span> | Toutes les variantes | Optionnel |

</div>

### 5.8.7. Allocation des ressources E/S { #587-io-resource-allocation }

<div align="center"><em>Tableau 5.8.7-1 : Liste de contrôle de l'allocation des ressources E/S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Un tableau d'allocation des ressources GPIO correspondant au schéma est fourni | Toutes les variantes | Obligatoire |
| 2 | L'allocation GPIO dans le tableau de ressources correspond au schéma | Toutes les variantes | Obligatoire |
| 3 | L'affectation réelle des GPIO respecte les recommandations de SiFli (voir le fichier de configuration des E/S du HDK) | Toutes les variantes | Obligatoire |

</div>

### 5.8.8. Réveil matériel { #588-hardware-wake-up }

<div align="center"><em>Tableau 5.8.8-1 : Liste de contrôle du réveil matériel</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Les sources d'interruption de réveil sont correctes (sources d'interruption de réveil disponibles : PA24–PA27 et PA34–PA44, 15 broches au total)</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |

</div>

### 5.8.9. Stockage { #589-storage }

<div align="center"><em>Tableau 5.8.9-1 : Liste de contrôle du stockage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Si MPI2 (SD1) se connecte à une Flash SPI NOR : <span class="flag-red">PA13 (MPI D1) et PA17 (MPI D3) n'ont besoin d'aucun pull-up</span> | Toutes les variantes | Obligatoire |
| 2 | Si MPI2 (SD1) se connecte à une Flash SPI NAND : <span class="flag-red">PA13 (MPI D1) n'a besoin d'aucun pull-up ; PA17 (MPI D3) doit avoir un pull-up de 7,5 kΩ</span> | Toutes les variantes | Obligatoire |
| 3 | Si MPI2 (SD1) se connecte à une Flash SD NAND : <span class="flag-red">PA13 (SD D3) doit avoir un pull-up de 7,5 kΩ, PA17 (SD D1) n'a besoin d'aucun pull-up, PA15 (SD CMD) doit avoir un pull-up de 7,5 kΩ</span> | Toutes les variantes | Obligatoire |
| 4 | Si MPI2 (SD1) se connecte à un eMMC : <span class="flag-red">PA13 (SD D3) et PA17 (SD D1) doivent tous deux avoir des pull-up de 7,5 kΩ, PA15 (SD CMD) doit avoir un pull-up de 7,5 kΩ</span> | <span class="flag-red">52D/E/G/J</span> | Obligatoire |
| 5 | Le stockage externe de SF32LB520 et SF32LB52B doit être une Flash SPI NOR | 520/B | Obligatoire |
| 6 | Si le courant à l'arrêt est un critère important, <span class="flag-red">commander l'alimentation de la mémoire Flash externe par PA11</span>, niveau haut pour la mise sous tension, niveau bas pour la coupure | 520/3/5/7 uniquement | Obligatoire |
| 7 | Si le courant à l'arrêt est un critère important, <span class="flag-red">commander l'alimentation de la mémoire Flash externe par PA21</span>, niveau haut pour la mise sous tension, niveau bas pour la coupure | <span class="flag-red">52B/D/E/G/J</span> | Obligatoire |
| 8 | Si le courant à l'arrêt est un critère important, <span class="flag-red">commander l'alimentation de VDD_SIP par PA21</span>, niveau haut pour la mise sous tension, niveau bas pour la coupure | <span class="flag-red">52B/D/E/G/J</span> | Obligatoire |
| 9 | <span class="flag-red">Lorsque MPI pilote une flash NOR de 32 MB ou plus, l'alimentation de la flash doit être commutable via PA21 afin de pouvoir être coupée</span> | <span class="flag-red">52B/D/E/G/J</span> | Obligatoire |
| 10 | Si SD1 se connecte à un dispositif SD NAND, les connexions de signaux sont correctes | Toutes les variantes | Obligatoire |
| 11 | <span class="flag-red">Les lignes CLK et données de la Flash ont des résistances série de 33 Ω</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 12 | <span class="flag-red">Avec deux mémoires Flash NOR externes, CLK/D0–D3 sont partagés. PA12 sert de CS pour la première mémoire et PA26 pour la seconde. PA26 dispose d'un pull-up interne et convient donc à un CS actif à l'état bas : à la réinitialisation, son niveau par défaut est haut (mémoire désélectionnée).</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 13 | <span class="flag-red">Lorsque deux Flash NOR externes sont utilisées, la première doit être de 16 MB ; la seconde peut être de 8 MB ou 16 MB</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 14 | Le niveau logique E/S du dispositif périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |
| 15 | <span class="flag-red">La référence NOR Flash choisie figure parmi les composants qualifiés dans le guide de sélection des composants clés ; sinon, la ROM risque de ne pas la reconnaître et le système de ne pas démarrer</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 16 | <span class="flag-red">La référence SPI/SD NAND Flash choisie figure parmi les composants qualifiés dans le guide de sélection des composants clés ; sinon, la ROM risque de ne pas la reconnaître et le système de ne pas démarrer</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |

</div>

### 5.8.10. Affichage { #5810-display }

<div align="center"><em>Tableau 5.8.10-1 : Liste de contrôle de l'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Pour un écran QSPI, vérifier le câblage des signaux | Toutes les variantes | Obligatoire |
| 2 | Pour un écran à interface 8080, vérifier le câblage des signaux | Toutes les variantes | Obligatoire |
| 3 | Pour un écran JDI, vérifier le câblage des signaux | Toutes les variantes | Obligatoire |
| 4 | Vérifier le câblage de l'interface QSPI de l'écran LCD ; <span class="flag-red">les lignes CLK et données doivent comporter des résistances série de 100 Ω</span> | Toutes les variantes | Obligatoire |
| 5 | La connexion LCD RSTB est correcte (PA0 recommandé) | Toutes les variantes | Obligatoire |
| 6 | La connexion LCDC TE est correcte (se connecte au signal TE ou Fmark du panneau) | Toutes les variantes | Obligatoire |
| 7 | Les signaux TP suivent l'allocation de broches recommandée (référez-vous au fichier de configuration I/O de l'EVB) | Toutes les variantes | Obligatoire |
| 8 | Confirmer la prise en charge requise de l'affichage permanent (Always-on Display) | Toutes les variantes | Obligatoire |
| 9 | Un LDO à faible Iq alimente l'afficheur ; <span class="flag-red">PA30 est recommandé pour contrôler l'activation du LDO</span> | Toutes les variantes | Obligatoire |
| 10 | Confirmer si l'alimentation du panneau tactile (TP) et de l'écran LCD doit être commandée ensemble ou séparément | Toutes les variantes | Obligatoire |
| 11 | Si l'écran LCD intègre un capteur de luminosité, prévoir également son alimentation | Toutes les variantes | Obligatoire |
| 12 | Commande du rétroéclairage LCD TFT : s'il s'allume au niveau haut et s'éteint au niveau bas (actif à l'état haut), utiliser un GPIO avec pull-down (PD) ; s'il s'allume au niveau bas et s'éteint au niveau haut (actif à l'état bas), utiliser un GPIO avec pull-up (PU) | Toutes les variantes | Obligatoire |
| 13 | <span class="flag-red">LCD SPI : mode 3 fils — CS vers PA03, CLK vers PA04, DATA vers PA05 ; mode 4 fils — CS vers PA03, CLK vers PA04, DATA vers PA05, DC vers PA06</span> | Toutes les variantes | Obligatoire |
| 14 | Pour un afficheur Sharp Memory/JDI relié à l'interface JDI du MCU, connecter VCOM et VB à MCU-PA24, VA à MCU-PA25, R0/G0/B0 à MCU-R1/G1/B1, R1/G1/B1 à MCU-R2/G2/B2, GSP à MCU-VST, BSP à MCU-HST, GCK à MCU-VCK, BCK à MCU-HCK, GEN à MCU-ENB et INTB à MCU-XRST | Toutes les variantes | Obligatoire |
| 15 | Le niveau logique E/S du dispositif périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>Tableau 5.8.11-1 : Liste de contrôle GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Relier l'entrée GPADC à une broche compatible <span class="flag-red">(PA28–PA34 ; 7 GPIO peuvent être configurés en entrées GPADC)</span> | Toutes les variantes | Optionnel |
| 2 | La tension entrant dans le GPADC reste dans la plage 0–3,3 V | Toutes les variantes | Optionnel |
| 3 | Pour toute entrée à pont diviseur résistif mesurée par le GPADC, utiliser des résistances de pont diviseur à tolérance de 1 % ; <span class="flag-red">chaque canal GPADC dispose d'un condensateur de filtrage de 100 nF placé près de la broche de la puce</span> | Toutes les variantes | Obligatoire |

</div>

### 5.8.12. Boutons { #5812-buttons }

<div align="center"><em>Tableau 5.8.12-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'exigence de réveil par bouton (nécessaire ou non) est confirmée | Toutes les variantes | Obligatoire |
| 2 | Le circuit du bouton standard est correct (résistance de pull-up présente, valeur de résistance et domaine de tension du pull-up adaptés) | Toutes les variantes | Obligatoire |
| 3 | Le bouton marche/arrêt utilise PA34, actif à l'état haut ; un appui de 10 secondes déclenche la réinitialisation. <span class="flag-red">La résistance de pull-down de 10 kΩ doit être placée sur la carte principale.</span> | Toutes les variantes | Obligatoire |
| 4 | Tous les signaux de bouton disposent d'une protection ESD | Toutes les variantes | Obligatoire |

</div>

### 5.8.13. Protection EOS et ESD { #5813-eos-and-esd-protection }

<div align="center"><em>Tableau 5.8.13-1 : Liste de contrôle de la protection EOS et ESD</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Prévoir les protections EOS, ESD et OVP nécessaires sur l'interface de charge | Toutes les variantes | Obligatoire |
| 2 | L'interface batterie dispose d'un dispositif ESD | Toutes les variantes | Obligatoire |
| 3 | L'interface antenne dispose d'un dispositif ESD | Toutes les variantes | Obligatoire |
| 4 | Les interfaces d'alimentation LCD et TP disposent de dispositifs ESD | Toutes les variantes | Obligatoire |
| 5 | Les lignes TP I2C, RST et INT disposent de dispositifs ESD | Toutes les variantes | Obligatoire |
| 6 | L'interface d'alimentation du capteur de fréquence cardiaque et les lignes de signal disposent de dispositifs ESD | Toutes les variantes | Obligatoire |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tableau 5.8.14-1 : Liste de contrôle I2C</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Prévoir des pull-up I2C de valeur adaptée ; pour un fonctionnement à 400 kHz, des résistances de 2,2 kΩ sont recommandées. Alimenter les pull-up depuis le domaine de tension du périphérique et couper leur alimentation en même temps que celle du périphérique | Toutes les variantes | Obligatoire |
| 2 | Le signal d'interruption I2C prend en charge le réveil matériel lorsque requis | Toutes les variantes | Obligatoire |
| 3 | Les périphériques I2C, tels que les accéléromètres, les capteurs de fréquence cardiaque et les capteurs géomagnétiques, permettent de lire toutes les données en une seule transaction (burst) | Toutes les variantes | Obligatoire |
| 4 | Les périphériques partageant un même bus I2C ont des adresses distinctes | Toutes les variantes | Obligatoire |

</div>

### 5.8.15. Audio analogique { #5815-analog-audio }

<div align="center"><em>Tableau 5.8.15-1 : Liste de contrôle de l'audio analogique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion du microphone MEMS est correcte | Toutes les variantes | Optionnel |
| 2 | Le microphone MEMS est alimenté depuis MIC_BIAS | Toutes les variantes | Optionnel |
| 3 | La connexion du microphone ECM analogique asymétrique est correcte | Toutes les variantes | Optionnel |
| 4 | Le microphone ECM analogique asymétrique est alimenté depuis MIC_BIAS | Toutes les variantes | Optionnel |
| 5 | Toutes les entrées ADC audio disposent d'un condensateur de liaison d'au moins 2,2 µF | Toutes les variantes | Optionnel |
| 6 | Les sorties DACP et DACN du DAC audio ont chacune une résistance série de 1 kΩ près de la puce ; un condensateur de 1,5 nF est raccordé entre DACP et DACN | Toutes les variantes | Optionnel |
| 7 | <span class="flag-red">L'AW8155B est recommandé comme amplificateur de puissance audio et doit être configuré par logiciel en mode classe A/B ; tout autre amplificateur doit être validé par des essais</span> | Toutes les variantes | Optionnel |
| 8 | <span class="flag-red">Si le chemin ADC audio analogique intégré n'est pas utilisé, il est recommandé de relier ADCP à la masse par une résistance de 0 Ω</span> | Toutes les variantes | Optionnel |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>Tableau 5.8.16-1 : Liste de contrôle SPI</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Vérifier le croisement des signaux SPI : SDO côté MCU vers SDI du périphérique, et SDI côté MCU vers SDO du périphérique | Toutes les variantes | Optionnel |
| 2 | Les contraintes temporelles du périphérique SPI sont respectées | Toutes les variantes | Optionnel |
| 3 | Le niveau logique E/S du dispositif périphérique correspond à celui de la puce principale | Toutes les variantes | Optionnel |

</div>

### 5.8.17. USART et interface de débogage { #5817-usart-and-debug-interface }

<div align="center"><em>Tableau 5.8.17-1 : Liste de contrôle USART et interface de débogage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | PA18/PA19 (multiplexées en DBG_UART) constituent l'interface de téléchargement et de débogage ; prévoir des points de test et <span class="flag-red">une résistance série de 100 Ω</span> | Toutes les variantes | Obligatoire |
| 2 | Croiser les signaux UART : RXD du MCU vers TXD du périphérique, et TXD du MCU vers RXD du périphérique | Toutes les variantes | Obligatoire |
| 3 | Si PA35/PA36 sont multiplexées en UART vers un périphérique, celui-ci doit être hors tension à la réinitialisation du MCU, ou le logiciel doit maintenir ces broches à l'état bas | Toutes les variantes | Obligatoire |
| 4 | Le niveau logique E/S du dispositif périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>Tableau 5.8.18-1 : Liste de contrôle PWM</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La commande du rétroéclairage LCD utilise PA1 (recommandé) | Toutes les variantes | Optionnel |
| 2 | La broche PWM du moteur de vibration utilise PA20 | Toutes les variantes | Obligatoire |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>Tableau 5.8.19-1 : Liste de contrôle USB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Vérifier le câblage de l'interface USB | Toutes les variantes | Optionnel |
| 2 | L'interface USB dispose d'une protection ESD | Toutes les variantes | Optionnel |
| 3 | Si l'USB reste activé en fonctionnement normal (hors veille), l'hôte peut détecter le branchement et le débranchement. Pour permettre cette détection lorsque le MCU est en veille, prévoir un pont diviseur sur VBUS qui applique à la broche de réveil du MCU une tension compatible avec son niveau d'E/S. Il est recommandé d'utiliser aussi cette broche pour détecter le branchement du chargeur | Toutes les variantes | Optionnel |

</div>

### 5.8.20. Consommation électrique { #5820-power-consumption }

<div align="center"><em>Tableau 5.8.20-1 : Liste de contrôle de la consommation électrique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les LDO et DCDC utilisent une entrée d'activation active à l'état haut. Si la sortie est désactivée par défaut, prévoir une résistance de pull-down entre EN et la masse, de 1 MΩ à 5,1 MΩ, dimensionnée selon les exigences de consommation du projet | Toutes les variantes | Obligatoire |
| 2 | Pour la commutation d'alimentation par MOSFET, utiliser une combinaison PMOS+NMOS. Le niveau haut commande la mise sous tension et le niveau bas la coupure ; la broche de commande est reliée à la masse par une résistance pull-down de 1 MΩ | Toutes les variantes | Obligatoire |
| 3 | L'interrupteur d'alimentation de la flash externe est contrôlé par PA11 | 520/3/5/7 uniquement | Obligatoire |
| 4 | <span class="flag-red">PA21 commande à la fois l'interrupteur d'alimentation de la Flash externe et celui de VDD_SIP</span> | <span class="flag-red">52A/D</span>[^52a-note] | Non précisé dans la source[^52a-category-note] |
| 5 | Lorsqu'il alimente les pull-up des GPIO, VSYS reste toujours actif ; vérifier que cette contrainte respecte les exigences de consommation du projet | 520/3/5/7 uniquement | Obligatoire |
| 6 | Si LDO2 ou LDO3 alimente les pull-up des GPIO, vérifier que la coupure de ce LDO reste compatible avec les exigences de conception | 520/3/5/7 uniquement | Obligatoire |
| 7 | Faire commuter l'alimentation des pull-up I2C en même temps que l'alimentation E/S du périphérique afin d'éviter les courants de fuite | Toutes les variantes | Obligatoire |
| 8 | PA09 : le mettre à l'état haut à l'allumage de l'écran et le maintenir à l'état bas en veille | Révision silicium A2 ou antérieure | Obligatoire |
| 9 | Le courant de repos requis en mode Deep Sleep (veille profonde) est défini et consigné | Toutes les variantes | Obligatoire |
| 10 | <span class="flag-red">La somme des courants de repos de tous les périphériques sélectionnés en mode Deep Sleep est enregistrée et répond aux exigences du projet</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |
| 11 | Le courant de repos requis en mode Standby (veille) est défini et consigné | Toutes les variantes | Obligatoire |
| 12 | <span class="flag-red">La somme des courants de repos de tous les périphériques sélectionnés en mode Standby est enregistrée et répond aux exigences du projet</span> | <span class="flag-red">Toutes les variantes</span> | Obligatoire |

[^52a-note]: Le fichier source indique « 52A/52D ». Le [guide de conception matérielle SF32LB52x][SF32LB52x Hardware Design Guide - Dev] décrit les variantes SF32LB52B/D/E/G/J ; « 52A » ne désigne aucune de ces variantes de manière identifiable. Vérifier la référence exacte et sa fiche technique avant d’appliquer ce point ; ne pas remplacer automatiquement « 52A » par un autre modèle.
[^52a-category-note]: La source laisse la catégorie de cette ligne vide. Elle est conservée sous la mention « Non précisé dans la source », sans lui attribuer un caractère obligatoire ou optionnel. Confirmer son applicabilité et le critère de validation pour le composant retenu.

!!! important "Divergence des sources sur la broche du commutateur d'alimentation du stockage"
    Ce tableau conserve l'entrée PA11 du classeur de la checklist pour la commutation de la Flash externe sur SF32LB520/3/5/7. Selon la priorité des sources de ce projet, les notes d'application et le guide de conception de schéma OpenSiFli, de priorité supérieure, prévalent et indiquent PA21 pour la commutation de l'alimentation du stockage de démarrage. Retenez PA21 comme référence étayée par les sources et n'adoptez pas PA11 sur la seule base du classeur de priorité inférieure. Celui-ci ne précise pas si PA11 correspond à une autre commande d'activation sur la carte ou à une divergence d'affectation. Confirmez auprès de SiFli le réseau et la variante exacts avant validation.

</div>

### 5.8.21. Points de test de téléchargement et de débogage { #5821-download-and-debug-test-points }

<div align="center"><em>Tableau 5.8.21-1 : Liste de contrôle des points de test de téléchargement et de débogage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Prévoir des points de test pour VBAT, GND, PA18 (DBG_UART_RXD), PA19 (DBG_UART_TXD), VSYS et PA34, ainsi que pour les autres signaux nécessaires au téléchargement et au débogage | Toutes les variantes | Obligatoire |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
