---
icon: lucide/list-checks
hide:
    - navigation
description: "Liste de revue de schéma point par point du MCU SF32LB57x : boîtier, alimentation, horloge, stockage, RF, affichage, audio, caméra, boutons et fabrication."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle SF32LB57x — Liste de contrôle du schéma { #sf32lb57x-hardware-design-guide-schematic-checklist }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Cette page présente la section 5.8 et ses points de vérification du schéma, repris des tableaux officiels d'autocontrôle de conception de SiFli. Revenez à [Système minimal et alimentation](SF32LB57x_schematic_system_power.md), première des trois pages consacrées aux directives de conception du schéma.

## 5.8. Liste de contrôle du schéma { #58-schematic-checklist }

Chaque tableau correspond à un bloc fonctionnel du schéma. La colonne « S'applique à » indique si un point concerne uniquement les variantes alimentées par batterie ou en 3,3 V ; les points marqués « Toutes les variantes » s'appliquent à toute la famille.

### 5.8.1. Boîtier { #581-package }

<div align="center"><em>Tableau 5.8.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | La bibliothèque de symboles de schéma est correcte | Toutes les variantes | |

</div>

### 5.8.2. Alimentation { #582-power-supply }

<div align="center"><em>Tableau 5.8.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | La tension à l'entrée `VBUS` est strictement maintenue entre 4,6 V et 5,5 V | Variantes alimentées par batterie | |
| 2 | La charge via `VBAT` prend en charge des batteries dont la tension nominale est de 4,2 V à 4,45 V ; le courant de précharge est de 40 mA et le courant de charge maximal est de 1C (400 mA) | Variantes alimentées par batterie | |
| 3 | La plage de fonctionnement nominale de `VCC` est de 3,45 V à 4,7 V ; le seuil matériel de mise sous tension est de 3,45 V et celui d'arrêt de 2,7 V | Variantes alimentées par batterie | |
| 4 | `VSYS` est une alimentation interne dédiée : elle ne peut alimenter que `AVDD_BRF` et le réseau de résistances pull-up des GPIO. Ne l'utilisez pour alimenter aucun autre périphérique externe | Variantes alimentées par batterie | |
| 5 | La charge de `VDD33_VOUT1` est limitée à la mémoire Flash intégrée au boîtier, à la Flash NOR/NAND externe et à `AVDD33_AUD` — cette alimentation ne doit alimenter aucun autre périphérique. Le courant de charge au démarrage progressif ne doit pas dépasser 30 mA ; après activation complète, la capacité de charge est de 150 mA. | Variantes alimentées par batterie | |
| 6 | La limite de courant au démarrage progressif de `VDD33_VOUT2` est de 30 mA ; une fois la tension stabilisée à 3,3 V, le rail peut fournir 150 mA. Cette limite peut être désactivée par logiciel ; vérifiez alors que le courant d'appel du périphérique connecté est compatible avec la spécification recommandée pour ce rail | Variantes alimentées par batterie | |
| 7 | `AVDD_BRF` est alimentée par le domaine `VSYS` | Variantes alimentées par batterie | |
| 8 | `AVDD33_AUD` est alimentée par le domaine `VDD33_VOUT1` | Variantes alimentées par batterie | |
| 9 | La plage d'alimentation nominale de `PVDD` est de 2,93 V à 3,63 V ; sa tension de fonctionnement typique par défaut est de 3,3 V | Variantes alimentées en 3,3 V | |
| 10 | La plage de détection de tension de batterie `VBATS` est de 0 V à 4,5 V ; ne dépassez pas cette plage | Variantes alimentées en 3,3 V | |
| 11 | `AVDD_BRF` est alimentée par une source externe de 3,3 V | Variantes alimentées en 3,3 V | |
| 12 | `AVDD33_AUD` est alimentée par une source externe de 3,3 V | Variantes alimentées en 3,3 V | |
| 13 | `AVDD33_ANA` est alimentée par une source externe de 3,3 V | Variantes alimentées en 3,3 V | |
| 14 | La plage de tension d'entrée de `VDDIOA` dépend de la référence exacte commandée — vérifiez sa description dans la fiche technique | Variantes alimentées en 3,3 V | |
| 15 | Détection de tension de batterie : un canal GPADC interne est déjà relié à `VBAT`/`VBATS` — ne le reliez pas en plus à un autre canal GPADC | Toutes les variantes | |
| 16 | Le câblage `BUCK_LX`/`BUCK_FB` suit strictement la spécification de conception matérielle de la puce | Toutes les variantes | |
| 17 | `VDD18_VOUT` sert uniquement à alimenter la PSRAM intégrée au boîtier de la puce — ne jamais l'utiliser pour des périphériques externes 1,8 V | Toutes les variantes | |
| 18 | `GPADC_VREF` n'accepte qu'un condensateur externe — jamais une tension externe | Toutes les variantes | |
| 19 | `AUD_VREF` n'accepte qu'un condensateur externe — jamais une tension externe | Toutes les variantes | |

</div>

!!! warning "Écarts dans la source originale"
    La table de vérification originale donne une limite basse de 2,93 V pour `PVDD` et une limite haute de 4,5 V pour `VBATS`, alors que les tables par boîtier donnent respectivement 2,97 V et 4,7 V. Cette page conserve les valeurs de vérification. Confirmez ces deux écarts avec SiFli pour la référence exacte ; ne validez pas le circuit sur la base des plages les plus larges.

    Le schéma de référence indique aussi `VCC` de 3,2 V à 4,7 V et `VDD33_VOUT1` pour la Flash et les capteurs, contrairement à la limite basse de 3,45 V et à l'interdiction d'autres périphériques ci-dessus. Conservez les restrictions de la table ; n'élargissez ni la plage ni les charges autorisées sur la base des annotations du schéma.

    Ailleurs dans le corps du guide, la plage d'entrée de `VBUS` est donnée pour 4,5 V–5,5 V et la plage de sortie des composants OVP à LDO intégré pour 4,5 V–5,4 V. Le tableau d'autocontrôle donne respectivement 4,6 V–5,5 V et 4,7 V–5,4 V. Cette page conserve les valeurs du tableau ; confirmez les limites applicables pour le composant exact et auprès de SiFli avant validation de la conception.

    Le point 25 du tableau d'autocontrôle d'origine est intitulé comme une vérification du condensateur de `VDD33_VOUT2`, mais le détail mentionne par erreur `VDD33_VOUT1` (déjà vérifié au point 24). Cette page suit l'intitulé du point 25 ; confirmez auprès de SiFli le rail visé.

### 5.8.3. Condensateurs et inductances d'alimentation { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tableau 5.8.3-1 : Liste de contrôle des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Condensateur `VBUS` ≥10 µF/10 V, placé près de la broche | Variantes alimentées par batterie | |
| 2 | Condensateur `VBAT` ≥4,7 µF/10 V, placé près de la broche | Variantes alimentées par batterie | |
| 3 | Condensateur `VCC` ≥10 µF/10 V, placé près de la broche | Variantes alimentées par batterie | |
| 4 | Condensateur `VSYS` = 2,2 µF/6,3 V ; capacité totale sur ce domaine ≤9,6 µF, placé près de la broche | Variantes alimentées par batterie | |
| 5 | Condensateur `VDD33_VOUT1` = 2,2 µF/6,3 V ; capacité totale sur ce domaine ≤9,6 µF, placé près de la broche | Variantes alimentées par batterie | |
| 6 | Condensateur `VDD33_VOUT2` = 2,2 µF/6,3 V ; capacité totale sur ce domaine ≤9,6 µF, placé près de la broche | Variantes alimentées par batterie | |
| 7 | Condensateur `PVDD` ≥10 µF/6,3 V, placé près de la broche | Variantes alimentées en 3,3 V | |
| 8 | Condensateur de découplage `VBATS` = 0,1 µF/10 V, placé près de la broche | Variantes alimentées en 3,3 V | |
| 9 | Condensateur `VDDIOA` = 4,7 µF/6,3 V, placé près de la broche | Variantes alimentées en 3,3 V | |
| 10 | Condensateur `AVDD33_ANA` = 1 µF/6,3 V, placé près de la broche | Variantes alimentées en 3,3 V | |
| 11 | Condensateur `BUCK_FB` = 4,7 µF, placé entre l'inductance et la broche de la puce | Toutes les variantes | |
| 12 | Condensateur `VDD_VOUT1` = 4,7 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 13 | Condensateur `VDD_VOUT2` = 4,7 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 14 | Condensateur `VDD_RET` = 0,47 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 15 | Condensateur `VDD_RTC` = 1 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 16 | Condensateur `MIC_BIAS` = 1 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 17 | Condensateur `AVDD_BRF` = 4,7 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 18 | Condensateur `AVDD33_AUD` = 2,2 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 19 | Condensateur `AUD_VREF` = 1 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 20 | Condensateur `GPADC_VREF` = 4,7 µF/6,3 V, placé près de la broche | Toutes les variantes | |
| 21 | Privilégiez une inductance BUCK répertoriée dans la [liste des fournisseurs approuvés par SiFli](../cad-components/sifli-approved-vendor-list.md) ; si vous utilisez un autre composant, il doit respecter L = 4,7 µH, DCR ≤0,4 Ω et Isat ≥450 mA | Toutes les variantes | |
| 22 | Pour les produits avec GPS ou d'autres périphériques sensibles aux interférences, prévoyez sur `BUCK_LX` une empreinte pour un condensateur shunt à la masse de capacité inférieure à 100 pF ; sa valeur finale est déterminée par les essais EMC du produit complet | Toutes les variantes | |

</div>

### 5.8.4. Charge et OVP { #584-charging-and-ovp }

<div align="center"><em>Tableau 5.8.4-1 : Liste de contrôle de la charge et de l'OVP</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | L'interface d'entrée de charge dispose d'un circuit de protection en surtension OVP | Variantes alimentées par batterie | |
| 2 | Si l'écran doit s'allumer dès le branchement du chargeur, n'utilisez pas le chargeur interne ; utilisez plutôt un circuit intégré de charge externe doté d'une gestion du chemin d'alimentation (power-path management) | Variantes alimentées par batterie | |
| 3 | Le chargeur interne n'est utilisé que lorsqu'il est acceptable que l'affichage s'allume par logiciel après que la batterie a chargé jusqu'à 3,6 V | Variantes alimentées par batterie | |
| 4 | Il est recommandé d'utiliser un composant OVP avec sortie LDO intégrée (par exemple `LP5305AQVF`) : sortie LDO de 4,7 V à 5,4 V, courant de sortie admissible ≥0,5 A et seuil de déclenchement de la protection contre les surintensités ≥0,7 A | Variantes alimentées par batterie | |
| 5 | Si un composant OVP à OVLO ajustable est utilisé, les résistances du diviseur ont une tolérance de 1 %, l'erreur du seuil OVLO est inférieure à 3 % et la plage d'ajustement est fixée à 5,15 V–5,55 V | Variantes alimentées par batterie | |
| 6 | Si le chargeur interne n'est pas utilisé, la ligne `VBUS` peut rester flottante et son condensateur externe peut être omis ; `VBAT` ne peut alors pas alimenter de charge externe | Variantes alimentées par batterie | |

</div>

### 5.8.5. Consommation d'énergie { #585-power-consumption }

<div align="center"><em>Tableau 5.8.5-1 : Liste de contrôle de la consommation d'énergie</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Les circuits intégrés d'alimentation LDO/DCDC utilisent une broche EN active à l'état haut ; lorsque la sortie est désactivée par défaut, EN est tirée vers le bas via une résistance de 1 MΩ–5,1 MΩ dimensionnée selon l'exigence basse consommation du produit complet | Toutes les variantes | |
| 2 | Les commutateurs d'alimentation à MOSFET utilisent une topologie PMOS+NMOS. La broche de commande est active à l'état haut (marche) et à l'état bas (arrêt), avec une résistance pull-down fixe de 1 MΩ vers la masse | Toutes les variantes | |
| 3 | Le commutateur d'alimentation du support de démarrage externe est contrôlé uniquement par `PA21` | Toutes les variantes | |
| 4 | Si `VSYS` alimente les résistances pull-up des GPIO, évaluez son courant statique permanent et confirmez qu'il respecte l'objectif de basse consommation du produit complet | Variantes alimentées par batterie | |
| 5 | Si LDO2 ou LDO3 alimente les résistances pull-up des GPIO, évaluez son comportement à la mise hors tension et vérifiez l'absence de courant de fuite ou de niveau d'E/S anormal | Variantes alimentées par batterie | |
| 6 | L'alimentation des résistances pull-up I2C est activée et coupée en même temps que celle du domaine d'E/S du périphérique correspondant afin d'éviter les courants de fuite en veille | Toutes les variantes | |
| 7 | La limite supérieure du courant statique du produit complet en mode Deep Sleep (veille profonde) est vérifiée par rapport à la spécification du projet | Toutes les variantes | |
| 8 | La somme des courants statiques de tous les périphériques en mode Deep Sleep est consignée et respecte l'objectif de consommation électrique du projet | Toutes les variantes | |
| 9 | La limite supérieure du courant statique du produit complet en mode Standby (veille) est vérifiée par rapport à la spécification du projet | Toutes les variantes | |
| 10 | La somme des courants statiques de tous les périphériques en mode Standby est consignée et respecte l'objectif de consommation électrique du projet | Toutes les variantes | |

</div>

### 5.8.6. Horloge { #586-clock }

<div align="center"><em>Tableau 5.8.6-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le quartz principal 48 MHz est un numéro de pièce répertorié dans la [liste des fournisseurs approuvés par SiFli](../cad-components/sifli-approved-vendor-list.md) (AVL) | Toutes les variantes | |
| 2 | Si le quartz 48 MHz n'est pas répertorié sur l'AVL, il respecte 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), tolérance de fréquence ≤±10 ppm, ESR ≤30 Ω (22 Ω recommandé) | Toutes les variantes | |
| 3 | Le quartz RTC 32,768 kHz est un numéro de pièce répertorié sur l'AVL | Toutes les variantes | |
| 4 | Si le quartz 32,768 kHz n'est pas répertorié sur l'AVL, il respecte CL = 7 pF ou 11,5 pF (7 pF recommandé), tolérance de fréquence ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommandé) | Toutes les variantes | |

</div>

### 5.8.7. Stockage et démarrage { #587-storage-and-boot }

<div align="center"><em>Tableau 5.8.7-1 : Liste de contrôle du stockage et du démarrage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Flash SPI NOR externe sur MPI3 : aucune résistance pull-up n'est requise sur `PA13` (MPI D1) ni sur `PA17` (MPI D3) | Toutes les variantes | |
| 2 | Flash SPI NAND externe sur MPI3 : aucune résistance pull-up n'est requise sur `PA13` (MPI D1) ; une résistance pull-up de 7,5 kΩ est requise sur `PA17` (MPI D3) | Toutes les variantes | |
| 3 | SD NAND externe sur MPI3 : des résistances pull-up de 7,5 kΩ sont requises sur `PA13` (SD D3) et `PA15` (SD CMD), mais pas sur `PA17` (SD D1) | Toutes les variantes | |
| 4 | eMMC externe sur MPI3 : des résistances pull-up de 7,5 kΩ sont requises sur `PA13` (SD D3), `PA17` (SD D1) et `PA15` (SD CMD) | Toutes les variantes | |
| 5 | Si le stockage intégré au boîtier occupe déjà MPI3, l'utilisation externe de MPI3 est limitée à SD NAND / eMMC — ne pas connecter de Flash NOR/NAND SPI externe | Toutes les variantes | |
| 6 | Contrôle d'alimentation du stockage externe MPI3 : la Flash NOR SPI peut être alimentée en permanence ; la Flash NAND SPI/SD NAND/eMMC nécessite un contrôle par commutateur d'alimentation ; pour un démarrage depuis un support externe, l'alimentation du stockage est activée par défaut | Toutes les variantes | |
| 7 | Le numéro de pièce du stockage externe sélectionné figure sur l'AVL du projet | Toutes les variantes | |
| 8 | La plage de tension de fonctionnement du composant de stockage correspond au niveau d'alimentation d'E/S de la puce principale | Toutes les variantes | |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tableau 5.8.8-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | La piste de signal ANT est explicitement annotée avec une contrainte d'impédance caractéristique de 50 Ω en configuration asymétrique (single-ended) | Toutes les variantes | |
| 2 | La chaîne de signal réserve un réseau d'adaptation en π avec des condensateurs NC (non montés) aux emplacements en dérivation et un condensateur de 15 pF en série (valeurs finales ajustées lors des essais sur le matériel) | Toutes les variantes | |

</div>

### 5.8.9. Affichage { #589-display }

<div align="center"><em>Tableau 5.8.9-1 : Liste de contrôle de l'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Pour un écran à interface QSPI, privilégiez les broches dédiées à la fonction 1 du groupe `PA00`–`PA08` | Toutes les variantes | |
| 2 | L'affichage à interface RGB peut utiliser n'importe quel GPIO à des débits de signal normaux ; au-delà de 30 MHz, les broches sont limitées à `PA22`–`PA50` et `PA52`–`PA54` (`B1`–`B6` uniquement) | Toutes les variantes | |
| 3 | L'affichage à interface MCU 8080 suit la même règle d'attribution de broches que le RGB ; les scénarios haute vitesse sont limités à `PA22`–`PA50` et `PA52`–`PA54` | Toutes les variantes | |
| 4 | L'affichage EPD (papier électronique) suit la même règle d'attribution de broches que le RGB ; les scénarios haute vitesse sont limités à `PA22`–`PA50` et `PA52`–`PA54` | Toutes les variantes | |
| 5 | La consommation de l'affichage et du rétroéclairage est significative, un circuit de contrôle par commutateur d'alimentation est donc inclus ; sauf pour les conceptions à affichage toujours actif, les alimentations d'affichage et de rétroéclairage sont désactivées par défaut à la mise sous tension | Toutes les variantes | |
| 6 | Les plages de tension de fonctionnement de l'affichage et du composant tactile correspondent au niveau d'alimentation du domaine d'E/S de la puce principale | Toutes les variantes | |

</div>

### 5.8.10. Audio { #5810-audio }

<div align="center"><em>Tableau 5.8.10-1 : Liste de contrôle audio</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le câblage du signal, de la polarisation et des autres broches du microphone MEMS est conforme à la spécification de conception matérielle | Toutes les variantes | |
| 2 | Le microphone MEMS utilise `MIC_BIAS` de la puce comme alimentation de polarisation | Toutes les variantes | |
| 3 | Le câblage du signal, de la polarisation et des autres broches du microphone ECM analogique asymétrique est conforme à la spécification de conception matérielle | Toutes les variantes | |
| 4 | Le microphone ECM analogique asymétrique utilise `MIC_BIAS` de la puce comme alimentation de polarisation | Toutes les variantes | |
| 5 | Chaque canal d'entrée ADC audio comporte un condensateur de liaison en série d'au moins 2,2 µF | Toutes les variantes | |
| 6 | Ajoutez une résistance série de 1 kΩ sur chacune des lignes `DACP`/`DACN` près de la puce et placez un condensateur de 1,5 nF entre les deux signaux | Toutes les variantes | |
| 7 | La broche `PA55`, partagée avec `ADC1P`, est configurée en entrée haute impédance lorsque `ADC1P` est activé afin d'éviter les conflits de fonction ou les problèmes de signal | Toutes les variantes | |
| 8 | La broche partagée `PA10` de `ADC2P` est configurée en entrée haute impédance lorsque `ADC2P` est activé, pour éviter les conflits de fonction ou les problèmes de signal | Toutes les variantes | |
| 9 | La broche partagée `PA56` de `MICBIAS` est configurée en entrée haute impédance lorsque `MICBIAS` est activé, pour éviter que des conflits de fonction de broche ne causent des fuites ou des défauts de circuit | Toutes les variantes | |

</div>

### 5.8.11. Caméra { #5811-camera }

<div align="center"><em>Tableau 5.8.11-1 : Liste de contrôle de la caméra</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le câblage du signal, de l'alimentation et des autres broches de la caméra est conforme à la spécification de conception matérielle | Toutes les variantes | |
| 2 | L'alimentation du cœur de chaque modèle de caméra respecte les exigences de sa propre fiche technique | Toutes les variantes | |

</div>

### 5.8.12. Boutons { #5812-buttons }

<div align="center"><em>Tableau 5.8.12-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | La nécessité d'une capacité de réveil matériel pour un bouton est confirmée par rapport au plan produit, avec le circuit et la configuration logicielle correspondants réalisés | Toutes les variantes | |
| 2 | Le circuit pull-up d'un bouton ordinaire utilise une résistance de valeur appropriée et une tension de rappel compatible avec le domaine d'alimentation d'E/S | Toutes les variantes | |
| 3 | Le bouton marche/réinitialisation utilise `PA34`, actif à l'état haut, et permet une réinitialisation matérielle après un appui de 10 secondes. Placez la résistance pull-down de 10 kΩ sur la carte principale | Toutes les variantes | |
| 4 | Chaque signal d'entrée de bouton dispose d'un composant de protection ESD assorti près du bouton | Toutes les variantes | |

</div>

### 5.8.13. UART { #5813-uart }

<div align="center"><em>Tableau 5.8.13-1 : Liste de contrôle UART</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le câblage UART suit la règle de câblage croisé : le RXD du MCU se connecte au TXD du périphérique, le TXD du MCU se connecte au RXD du périphérique | Toutes les variantes | |
| 2 | Pendant la réinitialisation du MCU, le périphérique externe sur `PA35`/`PA36` (multiplexés avec l'UART) est mis hors tension, ou le logiciel force `PA35`/`PA36` à l'état bas afin que des niveaux anormaux ne déclenchent pas de fonctionnement intempestif du périphérique | Toutes les variantes | |
| 3 | La plage de tension de fonctionnement d'E/S du composant UART connecté correspond au domaine d'E/S correspondant de la puce principale | Toutes les variantes | |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tableau 5.8.14-1 : Liste de contrôle I2C</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | SDA et SCL ont des résistances pull-up (2,2 kΩ recommandé à 400 kHz). Le domaine de tension de rappel est alimenté côté périphérique afin d'être coupé en même temps que celui-ci | Toutes les variantes | |
| 2 | La nécessité d'un réveil matériel pour la broche d'interruption associée à l'I2C est confirmée et configurée en conséquence | Toutes les variantes | |
| 3 | Les capteurs I2C tels que les accéléromètres, les capteurs de fréquence cardiaque et les magnétomètres permettent de lire tous leurs registres lors d'une seule lecture en rafale continue | Toutes les variantes | |
| 4 | Chaque composant partageant un bus I2C dispose d'une adresse esclave unique sans conflit | Toutes les variantes | |

</div>

### 5.8.15. SPI { #5815-spi }

<div align="center"><em>Tableau 5.8.15-1 : Liste de contrôle SPI</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le câblage SPI suit la règle de câblage croisé : SDO hôte vers SDI périphérique, SDI hôte vers SDO périphérique ; CLK et CS se connectent directement | Toutes les variantes | |
| 2 | La fréquence, la phase et la polarité d'horloge configurées par l'hôte correspondent entièrement à la spécification du composant périphérique | Toutes les variantes | |
| 3 | La plage de tension de fonctionnement d'E/S du périphérique correspond au domaine d'E/S correspondant de la puce principale | Toutes les variantes | |

</div>

### 5.8.16. GPADC { #5816-gpadc }

<div align="center"><em>Tableau 5.8.16-1 : Liste de contrôle GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Les signaux d'entrée GPADC ne sont attribués qu'aux 11 broches compatibles GPADC `PA28`–`PA38` | Toutes les variantes | |
| 2 | La tension analogique de chaque canal GPADC reste dans la plage nominale de 0 V–3,3 V | Toutes les variantes | |
| 3 | Les canaux d'échantillonnage à diviseur utilisent des résistances à 1 % ; chaque entrée GPADC dispose d'un condensateur de filtrage de 100 nF placé près de la broche de la puce | Toutes les variantes | |

</div>

### 5.8.17. USB { #5817-usb }

<div align="center"><em>Tableau 5.8.17-1 : Liste de contrôle USB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Le câblage des broches de signal différentiel USB, d'alimentation et de masse respecte la spécification de conception matérielle USB, sans erreur de câblage ni court-circuit | Toutes les variantes | |
| 2 | Les lignes de données USB, `VBUS` et les autres broches clés disposent de composants de protection ESD conformes à la spécification ESD du produit complet | Toutes les variantes | |
| 3 | Tant que le MCU n'est pas en veille, l'USB reste activé afin que le protocole USB détecte normalement les connexions et déconnexions | Toutes les variantes | |
| 4 | Si l'insertion USB doit être détectée pendant que le MCU est en veille, un diviseur de tension sur `VBUS` applique un niveau compatible avec les E/S à une broche prenant en charge le réveil matériel ; dans la mesure du possible, cette broche sert aussi à détecter le branchement du chargeur | Toutes les variantes | |
| 5 | La broche partagée `PA35` de `USB_DP` est configurée en entrée haute impédance lorsque `USB_DP` est activé | Toutes les variantes | |
| 6 | La broche partagée `PA36` de `USB_DM` est configurée en entrée haute impédance lorsque `USB_DM` est activé | Toutes les variantes | |

</div>

### 5.8.18. Réveil matériel externe { #5818-external-hardware-wake }

<div align="center"><em>Tableau 5.8.18-1 : Liste de contrôle du réveil matériel externe</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Les interruptions de réveil matériel externe n'utilisent que les 10 GPIO de la plage `PA33`–`PA42` | Toutes les variantes | |

</div>

### 5.8.19. Débogage et téléchargement { #5819-debug-and-download }

<div align="center"><em>Tableau 5.8.19-1 : Liste de contrôle du débogage et du téléchargement</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | `PA18` (RXD) et `PA19` (TXD) sont l'interface DBG-UART de téléchargement/débogage par défaut ; il est confirmé que TXD et RXD sont utilisés correctement | Toutes les variantes | |
| 2 | `PA43`/`PA44`, les broches de débogage/téléchargement SWD par défaut, disposent de points de test soudables réservés pour la programmation et le débogage | Toutes les variantes | |
| 3 | Réservez une résistance pull-up et un point de test pour `PA00`, qui sélectionne le mode de démarrage | Toutes les variantes | |
| 4 | Si la conception du produit le nécessite, réservez une résistance pull-up et un point de test pour `PA01`, qui sélectionne l'emplacement des broches SWD | Toutes les variantes | |

</div>

### 5.8.20. EOS et ESD { #5820-eos-and-esd }

<div align="center"><em>Tableau 5.8.20-1 : Liste de contrôle EOS et ESD</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | L'interface de charge dispose d'un ensemble complet de composants de protection contre les surtensions EOS, l'ESD et l'OVP | Toutes les variantes | |
| 2 | Les broches d'alimentation et de signal de l'interface batterie disposent de composants de protection ESD | Toutes les variantes | |
| 3 | La broche de signal d'antenne RF dispose d'un composant de protection ESD dédié | Toutes les variantes | |
| 4 | Les broches d'alimentation du LCD et du panneau tactile disposent de composants de protection ESD | Toutes les variantes | |
| 5 | Le bus I2C du panneau tactile ainsi que les lignes de signal `RST` et `INT` disposent de composants de protection ESD | Toutes les variantes | |
| 6 | La broche d'alimentation du module de fréquence cardiaque et chaque broche de transmission de signal disposent de composants de protection ESD | Toutes les variantes | |

</div>

### 5.8.21. Ligne de production { #5821-production-line }

<div align="center"><em>Tableau 5.8.21-1 : Liste de contrôle de la ligne de production</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Confirmation (Oui/Non) |
|:---|:---|:---|:---|
| 1 | Les points de test pour le téléchargement et le débogage du programme réservent `VBAT` ou 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (non applicable aux variantes alimentées en 3,3 V) et `PA34` | Variantes alimentées par batterie | |
| 2 | L'implantation de chaque point de test réservé permet l'accès d'une sonde manuelle et le brasage manuel, sans obstruction ni routage encombré | Toutes les variantes | |
| 3 | Les points de test dédiés au banc de production (`VBAT` ou 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` le cas échéant, `PA00`, `PA01`, `PA34`) ont des pastilles dont la taille, l'espacement et l'orientation sont compatibles avec les sondes du banc | Toutes les variantes | |

</div>
