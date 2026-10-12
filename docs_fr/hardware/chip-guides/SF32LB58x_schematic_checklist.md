---
icon: lucide/list-checks
description: "Liste de contrôle de revue de schéma point par point pour le MCU SF32LB58x, couvrant les vérifications d'alimentation, d'horloge, de RF, de stockage, d'affichage, et de fabrication."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
hide:
    - navigation
---

# Guide de conception matérielle du SF32LB58x — Liste de contrôle du schéma { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "Fait partie du Guide de conception matérielle du SF32LB58x"
    Cette page couvre la section 5.8, la liste de contrôle du schéma point par point. Retournez aux [Directives de conception de schéma](SF32LB58x_schematic_design.md).

## 5.8. Liste de contrôle du schéma { #58-schematic-checklist }

Chaque tableau ci-dessous couvre un bloc fonctionnel du schéma. Déterminez l'applicabilité à partir des conditions indiquées dans chaque point : vérifiez les points obligatoires lorsque ces conditions sont réunies, et les points optionnels lorsque la fonction ou l'option de conception correspondante est utilisée.

### 5.8.1. Boîtier { #581-package }

<div align="center"><em>Tableau 5.8.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le boîtier de la référence sélectionnée est correct, y compris les noms et numéros de broches | Obligatoire |

</div>

### 5.8.2. Alimentation { #582-power-supply }

<div align="center"><em>Tableau 5.8.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La tension d'alimentation PVDD1 est de 1,8 V-3,3 V | Obligatoire |
| 2 | La tension d'alimentation PVDD2 est de 1,8 V-3,3 V | Obligatoire |
| 3 | Les connexions BUCK1_LX et BUCK1_FB sont correctes | Obligatoire |
| 4 | Les connexions BUCK2_LX et BUCK2_FB sont correctes | Obligatoire |
| 5 | La sortie LDO_VOUT1 dispose d'un point de test, ou d'un condensateur de filtrage pratique pour la mesure de tension | Obligatoire |
| 6 | La sortie VDD_RET dispose d'un point de test, ou d'un condensateur de filtrage pratique pour la mesure de tension | Obligatoire |
| 7 | La sortie VDD_RTC dispose d'un point de test, ou d'un condensateur de filtrage pratique pour la mesure de tension | Obligatoire |
| 8 | La tension d'alimentation VDDIOA est de 1,8 V-3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte | Obligatoire |
| 9 | La tension d'alimentation VDDIOA2 est de 1,8 V-3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte | Obligatoire |
| 10 | La tension d'alimentation VDDIOB est de 1,8 V-3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte | Obligatoire |
| 11 | La tension d'alimentation VDDIOSA est de 1,8 V, et un commutateur de charge est fourni afin de pouvoir la couper | Obligatoire |
| 12 | La tension d'alimentation VDDIOSB est de 1,8 V, et un commutateur de charge est fourni afin de pouvoir la couper | Obligatoire |
| 13 | La tension d'alimentation VDDIOSC est de 1,8 V et doit toujours être alimentée | Obligatoire |
| 14 | La tension d'alimentation AVDD33_USB est de 3,3 V | Obligatoire |
| 15 | La tension d'alimentation AVDD33_ANA est de 3,3 V | Obligatoire |
| 16 | La tension d'alimentation AVDD_BRF est de 1,8 V-3,3 V et doit correspondre à l'alimentation VDD1 | Obligatoire |
| 17 | La tension d'alimentation AVDD33_AUD est de 3,3 V | Obligatoire |
| 18 | La tension d'alimentation AVDD18_DSI est de 1,8 V | Obligatoire |
| 19 | Lorsque le SF30147C fournit l'alimentation, l'interface de contrôle TWI doit utiliser des broches PB du MCU, et ces broches doivent être des broches PD | Obligatoire |
| 20 | Le circuit de charge doit gérer le chemin d'alimentation afin que le système puisse être alimenté par l'entrée 5 V du chargeur lorsque la tension de la batterie est trop faible | Obligatoire |
| 21 | Lorsque le SF30147C fournit l'alimentation, utilisez l'interface de contrôle TWI dédiée à la puce | Obligatoire |
| 22 | Lorsque le SF30147C fournit l'alimentation, le domaine d'alimentation de l'entrée EN des rails commandés par EN doit être PVDD ou AVDD ; ne commandez pas EN depuis un GPIO du MCU. Autre possibilité : relier EN à la masse et commander par registre la sortie du rail correspondant | Obligatoire |
| 23 | Lorsque le SF30147C fournit l'alimentation, <span class="flag-red">BUCK et LDO1</span> ne peuvent être contrôlés que par leurs signaux d'activation respectifs, EN_BUCK et EN_LDO1 ; le contrôle par registre interne n'est pas fourni | Obligatoire |
| 24 | Les alimentations PVDD et VDDIOB du 58x doivent correspondre. Si PVDD est inférieure à VDDIOB, par exemple VDDIOB = 3,3 V et PVDD = 1,8 V, VDDIOB présente environ 15 µA de fuite en Standby et Hibernate | Obligatoire |
| 25 | Sur le 58x, la broche B4 est VDD_EXT1 et la broche B5 est VDD_EXT2 ; elles peuvent rester non connectées dans la conception | Obligatoire |

</div>

!!! note "Interface TWI à confirmer auprès de SiFli"
    Le point 19 de la liste de contrôle de l'alimentation du classeur indique que l'interface de contrôle TWI doit utiliser des broches PB du MCU et précise que ces broches doivent être des broches « PD ». Le point 21 demande séparément d'utiliser l'interface TWI dédiée à la puce. Le classeur ne définit pas « PD » et n'explique pas le lien entre ces exigences. La note d'application matérielle d'OpenSiFli indique que le SF32LB58x émule les signaux TWI avec deux GPIO pour commander le SF30147C. Avant de valider le schéma, confirmez auprès de SiFli l'interface et les broches à utiliser.

### 5.8.3. Condensateurs et inductances d'alimentation { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tableau 5.8.3-1 : Liste de contrôle des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le condensateur de stockage (bulk) PVDD1 est d'au moins 10 µF | Obligatoire |
| 2 | Le condensateur PVDD2 est d'au moins 10 µF | Obligatoire |
| 3 | Condensateur BUCK1_FB=4,7 µF | Obligatoire |
| 4 | Condensateur BUCK2_FB=4,7 µF | Obligatoire |
| 5 | Condensateur LDO_VOUT1=4,7 µF | Obligatoire |
| 6 | Condensateur VDD_RET=0,47 µF | Obligatoire |
| 7 | Condensateur VDD_RTC=1 µF | Obligatoire |
| 8 | Condensateur VDDIOA&gt;=1 µF | Obligatoire |
| 9 | Condensateur VDDIOA2&gt;=1 µF | Obligatoire |
| 10 | Condensateur VDDIOB&gt;=1 µF | Obligatoire |
| 11 | Condensateur VDDIOSA&gt;=1 µF | Obligatoire |
| 12 | Condensateur VDDIOSB&gt;=1 µF | Obligatoire |
| 13 | Condensateur VDDIOSC&gt;=1 µF | Obligatoire |
| 14 | Condensateur AVDD33_USB&gt;=1 µF | Obligatoire |
| 15 | Condensateur AVDD33_ANA&gt;=4,7 µF | Obligatoire |
| 16 | Condensateur AVDD_BRF&gt;=4,7 µF | Obligatoire |
| 17 | Condensateur AVDD33_AUD&gt;=4,7 µF | Obligatoire |
| 18 | Condensateur AUD_VREF=1 µF | Obligatoire |
| 19 | Condensateur AVDD18_DSI&gt;=4,7 µF | Obligatoire |
| 20 | Condensateur MIC_BIAS=1 µF | Obligatoire |
| 21 | Condensateur GPADC VREFP = 4,7 µF | Obligatoire |
| 22 | <span class="flag-red">PVDD1, PVDD2, AVDD_BRF et l'alimentation de tirage haut de RSTN doivent être identiques</span> | Obligatoire |
| 23 | Les inductances BUCK1 et BUCK2 sont des références recommandées par SiFli | Obligatoire |
| 24 | Si l'inductance BUCK n'est pas une référence recommandée par SiFli, elle respecte L = 4,7 µH, DCR ≤ 0,4 Ω et Isat ≥ 450 mA | Obligatoire |
| 25 | <span class="flag-red">Lorsque PVDD1 et PVDD2 sont alimentées à 1,8 V depuis VBAT, utilisez un convertisseur DCDC pour générer le 1,8 V ; n'utilisez pas de LDO</span> | Obligatoire |
| 26 | <span class="flag-red">Le courant de repos du DCDC sélectionné est consigné et répond aux exigences du projet</span> | Obligatoire |
| 27 | <span class="flag-red">Le courant de repos du LDO sélectionné est consigné et répond aux exigences du projet</span> | Obligatoire |

</div>

!!! note "Écart sur le courant de saturation de l'inductance BUCK"
    Le point 24 de la liste de contrôle des condensateurs et inductances d'alimentation du classeur fixe Isat ≥ 450 mA pour une inductance absente de l'AVL. La note d'application matérielle d'OpenSiFli fixe Isat ≥ 500 mA pour une inductance BUCK de L = 4,7 µH et DCR ≤ 0,4 Ω. Le tableau conserve la valeur de 450 mA du classeur ; le [guide de sélection des inductances BUCK de la conception du schéma](SF32LB58x_schematic_design.md#5114-buck-inductor-selection) applique 500 mA. Dans l'attente d'une clarification de SiFli, utilisez une inductance avec Isat ≥ 500 mA.

### 5.8.4. Horloge { #584-clock }

<div align="center"><em>Tableau 5.8.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le quartz principal 48 MHz est une référence listée dans l'AVL | Obligatoire |
| 2 | Si le quartz 48 MHz n'est pas listé dans l'AVL, il respecte 7 pF ≤ CL ≤ 12 pF (valeur recommandée : 8,8 pF), une tolérance de fréquence ≤ ±10 ppm et un ESR ≤ 30 Ω (valeur recommandée : 22 Ω) | Obligatoire |
| 3 | Le quartz RTC 32,768 kHz est une référence listée dans l'AVL | Obligatoire |
| 4 | Si le quartz 32,768 kHz n'est pas listé dans l'AVL, il respecte CL ≤ 12,5 pF (valeur recommandée : 7 pF), une tolérance de fréquence ≤ ±20 ppm et un ESR ≤ 80 kΩ (valeur recommandée : 38 kΩ) | Obligatoire |

</div>

### 5.8.5. Réinitialisation { #585-reset }

<div align="center"><em>Tableau 5.8.5-1 : Liste de contrôle de réinitialisation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | RSTN est tiré au niveau haut vers la même alimentation que PVDD1 | Obligatoire |
| 2 | RSTN réserve un condensateur de 0,1 µF vers la masse | Obligatoire |
| 3 | RSTN dispose d'une protection ESD | Obligatoire |

</div>

### 5.8.6. Signaux de masse { #586-ground-signals }

<div align="center"><em>Tableau 5.8.6-1 : Liste de contrôle des signaux de masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Tous les signaux AVSS_*** sont connectés à GND | Obligatoire |
| 2 | Tous les signaux VSS sont connectés à GND | Obligatoire |

</div>

### 5.8.7. Mode de démarrage { #587-boot-mode }

<div align="center"><em>Tableau 5.8.7-1 : Liste de contrôle du mode de démarrage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | MODE dispose d'un tirage bas interne ; réservez un tirage haut de 10 kΩ vers VDDIOA et pilotez MODE à l'état haut pendant le téléchargement du programme | Obligatoire |
| 2 | <span class="flag-red">Le signal MODE dispose d'un point de test réservé et doit être amené au gabarit de programmation de production</span> | Obligatoire |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tableau 5.8.8-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le signal ANT est annoté avec une exigence d'impédance caractéristique de 50 Ω en mode asymétrique | Obligatoire |
| 2 | Un réseau d'adaptation en π est réservé sur le signal ANT : un condensateur parallèle NC (non monté) et un condensateur série de 15 pF | Obligatoire |
| 3 | Si le filtrage des émissions parasites doit être pris en compte, un réseau d'adaptation en π est réservé avec une inductance série de 2,7 nH et un condensateur parallèle de 2 pF | Optionnel |
| 4 | Si un PA RF externe nécessite un contrôle MCU de RXEN et TXEN, utilisez uniquement PB39 pour PA RXEN et PB40 pour PA TXEN | Optionnel |
| 5 | <span class="flag-red">Si la puce Wi-Fi prend en charge l'arbitrage de coexistence d'antenne : <br> (1) Le mode 3 fils est recommandé : la puce Wi-Fi contrôle le commutateur RF de l'antenne Bluetooth/Wi-Fi et effectue l'arbitrage. À partir de BT_ACTIVE et BT_PRIORITY fournis par Bluetooth, elle décide si l'accès à l'antenne est accordé à Bluetooth. WLAN_ACTIVE peut désactiver l'émission/réception Bluetooth pendant le fonctionnement Wi-Fi.<br> (2) BT_ACTIVE doit utiliser PB08 ou PB45, WLAN_ACTIVE doit utiliser PB09 ou PB41, et BT_PRIORITY peut utiliser n'importe quel GPIO PB.<br></span> | Optionnel |
| 6 | Si la puce Wi-Fi ne prend pas en charge l'arbitrage de coexistence d'antenne :<br>(1) Le mode 1 fil est recommandé : Bluetooth contrôle le commutateur RF de l'antenne Bluetooth/Wi-Fi, effectue l'arbitrage via BT_ACTIVE et notifie la puce Wi-Fi.<br> (2) Si le Wi-Fi peut fournir un signal d'état de fonctionnement, cette configuration peut évoluer vers le mode 2 fils : connectez la sortie Wi-Fi à WLAN_ACTIVE afin que Bluetooth puisse inhiber les émissions/réceptions Bluetooth de faible priorité lorsque le Wi-Fi est actif, sans affecter Bluetooth lorsque le Wi-Fi est inactif.<br> (3) BT_ACTIVE doit utiliser PB08 ou PB45, WLAN_ACTIVE doit utiliser PB09 ou PB41 | Optionnel |

</div>

### 5.8.9. Allocation des ressources E/S { #589-io-resource-allocation }

<div align="center"><em>Tableau 5.8.9-1 : Liste de contrôle de l'allocation des ressources E/S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Un tableau d'allocation des ressources GPIO correspondant au schéma est fourni | Obligatoire |
| 2 | L'allocation GPIO du tableau de ressources correspond au schéma | Obligatoire |
| 3 | L'allocation GPIO réelle suit les recommandations de SiFli ; reportez-vous au fichier de configuration E/S de l'EVB | Obligatoire |

</div>

### 5.8.10. Réveil matériel { #5810-hardware-wake-up }

<div align="center"><em>Tableau 5.8.10-1 : Liste de contrôle du réveil matériel</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | <span class="flag-red">Les sources d'interruption de réveil HCPU sont correctes : PA64, PA65, PA66, PA67, PA68, et PA69, six broches au total</span> | Obligatoire |
| 2 | <span class="flag-red">Les sources d'interruption de réveil LCPU sont correctes : PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2, et PBR3, dix broches au total. Après le réveil du MCU, PBR0-PBR3 ne peuvent pas recevoir de signaux d'interruption</span> | Obligatoire |
| 3 | <span class="flag-red">Les signaux d'interruption et de contrôle des périphériques côté LCPU tels que le G-sensor et le capteur de fréquence cardiaque doivent se connecter à des GPIO PB</span> | Obligatoire |

</div>

### 5.8.11. Stockage { #5811-storage }

<div align="center"><em>Tableau 5.8.11-1 : Liste de contrôle du stockage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | MPI3 est connecté à la Flash NOR ou à la Flash SPI NAND comme prévu | Obligatoire |
| 2 | VDDIOSC est toujours alimentée | Obligatoire |
| 3 | Les alimentations VDDIOSA et VDDIOSB sont activées par PBR0 | Obligatoire |
| 4 | MPI3 ou MPI4 peuvent être utilisés pour une Flash NOR ou une Flash SPI NAND externe | Obligatoire |
| 5 | La broche HOLD# de la Flash SPI NAND est tirée au niveau haut vers l'alimentation de la Flash SPI NAND via une résistance de 10 kΩ | Obligatoire |
| 6 | Si la production doit programmer une Flash externe sur MPI3 ou MPI4, l'outil de téléchargement pilote PA43 au niveau haut pour activer l'alimentation MPI3 | Obligatoire |
| 7 | Si la production doit programmer l'eMMC ou la SD NAND sur SDIO1, l'outil de téléchargement active l'alimentation correspondante | Obligatoire |
| 8 | <span class="flag-red">Les commutateurs de tension contrôlés par PBR0/PA43 sont actifs à l'état haut pour l'activation et à l'état bas pour la désactivation. En Hibernate, PBR0 contrôle la commutation d'alimentation VDDIOSA/VDDIOSB, VDDIOSC reste toujours alimentée, et PA43 contrôle la commutation d'alimentation de la Flash externe</span> | Obligatoire |
| 9 | Si l'interface SD1 se connecte à l'eMMC ou à la SD NAND, les connexions de signaux sont correctes | Obligatoire |
| 10 | Le niveau de l'interface E/S de l'eMMC ou de la SD NAND correspond à VDDIOA2 | Obligatoire |
| 11 | Les connexions de signaux MPI3 ou MPI4 sont correctes | Obligatoire |
| 12 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Obligatoire |
| 13 | <span class="flag-red">La Flash NOR est qualifiée dans le guide de sélection des composants clés</span> | Obligatoire |
| 14 | <span class="flag-red">La Flash SPI/SD NAND est qualifiée dans le guide de sélection des composants clés</span> | Obligatoire |
| 15 | <span class="flag-red">L'eMMC est qualifiée dans le guide de sélection des composants clés</span> | Obligatoire |

</div>

<div align="center"><em>Tableau 5.8.11-2 : Connexions MPI4 de référence pour la SPI NAND sur l'EVB SiFli</em></div>

<div align="center" markdown>

| Signal SPI NAND | Broche SF32LB58x | Note de référence |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | Sélection de puce, active à l'état bas |
| SO | PA04 (SD1_D1) | Données en entrée de la puce (IO1) |
| WP# | PA01 (SD1_D2) | Signal de protection en écriture (IO2) |
| SI | PA05 (SD1_D0) | Données en sortie de la puce (IO0) |
| SCLK | PA09 (SD1_CLK) | Horloge série |
| HOLD# | PA06 (SD1_D3) | Ligne IO3 ; tirée au niveau haut vers VDD18_MPI4 via une résistance de 10 kΩ |

</div>

Dans le schéma de référence de l'EVB, VCC de la SPI NAND Flash est reliée à VDD18_MPI4 ; cette alimentation comporte également des condensateurs de 0,1 µF et de 1 µF (6,3 V). Ces brochages et valeurs de composants correspondent uniquement à la référence EVB. Avant de les appliquer, vérifiez-les avec le boîtier du circuit intégré sélectionné, la fiche technique de la Flash et la configuration du multiplexage des broches de la carte cible.

L'alimentation d'E/S VDDIOA2 de SD1 accepte 1,8 V ou 3,3 V et doit correspondre au niveau d'E/S du périphérique. SiFli recommande une interface à 1,8 V pour la SPI NAND Flash et l'eMMC. Les composants SD NAND ne prennent en charge que 3,3 V ; VDDIOA2 doit donc être réglée à 3,3 V avec une SD NAND.

### 5.8.12. Affichage { #5812-display }

<div align="center"><em>Tableau 5.8.12-1 : Liste de contrôle de l'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le SF32LB58x connecte l'affichage via DSI + LCDC2 comme prévu | Obligatoire |
| 2 | Les connexions de signaux DSI sont correctes | Obligatoire |
| 3 | <span class="flag-red">Si l'écran LCD utilise uniquement QSPI, l'interface QSPI LCDC1 du HCPU est recommandée pour éviter les problèmes de fréquence d'images et de RAM</span> | Obligatoire |
| 4 | DSI_REXT est connecté à GND via une résistance de 10 kΩ | Obligatoire |
| 5 | La connexion RSTB du LCDC est correcte | Obligatoire |
| 6 | La connexion TE du LCDC est correcte (se connecte au signal TE ou Fmark du panneau) | Obligatoire |
| 7 | Les signaux TP suivent l'affectation de broches recommandée (reportez-vous au fichier de configuration E/S de l'EVB) | Obligatoire |
| 8 | L'interface LCD prend en charge le MIPI-DSI, le SPI 3/4 fils, le SPI à données double/quadruple, le DBI 8080, le DPI, et les interfaces JDI parallèle/série | Obligatoire |
| 9 | <span class="flag-red">LCD SPI, mode 3 fils : CS connecté à PA44 ou PB08, CLK connecté à PA46 ou PB10, DATA connecté à PA50 ou PB09 ; <br>mode 4 fils : CS connecté à PA44 ou PB08, CLK connecté à PA46 ou PB10, DATA connecté à PA50 ou PB09, DC connecté à PA48 ou PB03</span> | Obligatoire |
| 10 | Confirmez si le LCD doit prendre en charge l'AOD ; si oui, un panneau QSPI doit se connecter au HCPU, tandis qu'un panneau JDI peut se connecter au LCPU | Obligatoire |
| 11 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Obligatoire |
| 12 | Pour les LCD DSI, connectez les signaux de données et d'horloge DSI. Les panneaux DSI en mode vidéo se comportent comme des panneaux RGB et n'ont pas de signal TE ; les panneaux DSI en mode commande ont un signal TE, et le DSI17801 nécessite TE. TE et RST sont tous deux recommandés ; l'usage final dépend du LCD sélectionné | Obligatoire |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tableau 5.8.13-1 : Liste de contrôle GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'entrée GPADC est connectée à la broche correspondante | Optionnel |
| 2 | La plage d'entrée GPADC est correcte ; la tension d'entrée maximale ne doit pas dépasser AVDD33_ANA | Optionnel |
| 3 | Recommandation de diviseur de tension de batterie : résistance 470 kΩ 1 % côté alimentation, résistance 1 MΩ 1 % vers la masse, et condensateur de filtrage 100 nF | Obligatoire |
| 4 | <span class="flag-red">Pour chaque signal de diviseur résistif mesuré par le GPADC, utilisez des résistances de diviseur à tolérance de 1 % ; chaque voie GPADC doit avoir un condensateur de filtrage de 100 nF placé près de la broche de la puce</span> | Obligatoire |
| 5 | <span class="flag-red">L'ADC peut détecter plusieurs boutons et économiser des broches ; par exemple, lorsque PB32 est utilisé comme bouton ADC, n'utilisez pas la batterie comme alimentation de tirage haut</span> | Obligatoire |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tableau 5.8.14-1 : Liste de contrôle SDMADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'entrée SDMADC est connectée à la broche correspondante | Optionnel |
| 2 | La plage d'entrée SDMADC est correcte ; la tension d'entrée maximale ne devrait pas dépasser AVDD33_ANA | Optionnel |
| 3 | Les connexions SDMADC_VREF et SDMADC_VSS_VREF sont correctes | Obligatoire |

</div>

### 5.8.15. Boutons { #5815-buttons }

<div align="center"><em>Tableau 5.8.15-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Confirmez avec le client si le bouton nécessite une capacité de réveil | Obligatoire |
| 2 | La connexion d'un bouton ordinaire est correcte (tirage haut présent, valeur de résistance correcte, domaine de tension de tirage haut correct) | Obligatoire |
| 3 | <span class="flag-red">Le bouton d'alimentation doit être connecté à PB54 et actif à l'état haut. Un appui maintenu pendant 10 secondes doit réinitialiser le système ; une résistance de tirage bas de 10 kΩ doit être présente sur la carte principale</span> | Obligatoire |
| 4 | Tous les signaux de bouton disposent d'une protection ESD | Obligatoire |

</div>

### 5.8.16. Protection EOS et ESD { #5816-eos-and-esd-protection }

<div align="center"><em>Tableau 5.8.16-1 : Liste de contrôle de la protection EOS et ESD</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'interface de charge dispose d'une conception de protection contre l'EOS, l'ESD et les surtensions (OVP) | Obligatoire |
| 2 | Le signal de détection du branchement du chargeur dispose d'un composant ESD | Obligatoire |
| 3 | L'interface batterie dispose d'un composant ESD | Obligatoire |
| 4 | L'interface antenne dispose d'un composant ESD | Obligatoire |
| 5 | Les interfaces d'alimentation LCD et TP disposent de composants ESD | Obligatoire |
| 6 | Les lignes I2C, RST, et INT du TP disposent de composants ESD | Obligatoire |
| 7 | L'interface d'alimentation et les lignes de signal du capteur de fréquence cardiaque disposent de composants ESD | Obligatoire |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tableau 5.8.17-1 : Liste de contrôle I2C</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'affectation des bus I2C tient compte du partitionnement HCPU/LCPU et de la nécessité éventuelle de faire fonctionner le périphérique en mode basse consommation | Obligatoire |
| 2 | L'I2C dispose de tirages haut avec la valeur de résistance correcte ; si un fonctionnement à 400 kHz est requis, des tirages haut de 2,2 kΩ sont recommandés. Utilisez le domaine de tension côté périphérique et coupez l'alimentation de tirage haut lorsque le périphérique est hors tension | Obligatoire |
| 3 | Le signal d'interruption I2C prend en charge le réveil matériel lorsque nécessaire | Obligatoire |
| 4 | Si plusieurs composants partagent un même bus I2C, leurs adresses sont distinguées | Obligatoire |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tableau 5.8.18-1 : Liste de contrôle I2S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 est uniquement en entrée et ne fonctionne qu'en mode maître ; le microphone est connecté à I2S1 comme prévu</span> | Optionnel |
| 2 | <span class="flag-red">I2S2 prend en charge l'entrée et la sortie uniquement en mode maître, et peut se connecter à des composants codec DAC/ADC externes</span> | Optionnel |
| 3 | <span class="flag-red">I2S3 prend en charge l'entrée et la sortie uniquement en mode maître ; il convient aux cas d'usage basse consommation où le HCPU est en veille et le LCPU reçoit/traite l'audio via I2S3</span> | Optionnel |
| 4 | Les connexions de signaux I2S sont correctes | Optionnel |
| 5 | <span class="flag-red">La connexion du microphone numérique de l'interface I2S1 est correcte</span> | Optionnel |
| 6 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Optionnel |

</div>

### 5.8.19. PDM et audio analogique { #5819-pdm-and-analog-audio }

<div align="center"><em>Tableau 5.8.19-1 : Liste de contrôle PDM et audio analogique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Le raccordement des deux microphones PDM est correct | Optionnel |
| 2 | Le microphone PDM est alimenté par une alimentation numérique | Optionnel |
| 3 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Optionnel |
| 4 | Le raccordement des deux microphones analogiques est correct | Optionnel |
| 5 | Le microphone analogique est alimenté par la sortie MIC_BIAS | Optionnel |
| 6 | Les deux entrées ADC audio doivent chacune inclure au moins un condensateur de blocage DC de 2,2 µF | Optionnel |
| 7 | Les chemins de sortie DAC P et N disposent chacun d'une résistance série de 1 kΩ, avec un condensateur de 1,5 nF entre eux | Optionnel |
| 8 | L'AW8155 est l'amplificateur audio recommandé ; configurez-le par logiciel en mode 4 / mode Class AB lors de l'utilisation de la référence recommandée | Optionnel |
| 9 | <span class="flag-red">Lors du renvoi de la sortie du PA audio vers l'ADC du MCU, ajoutez un diviseur et un filtre RC ou un filtrage numérique additionnel ; la tension divisée doit rester dans la plage d'entrée de l'ADC, et la fréquence de coupure du filtre RC devrait être de 20 kHz</span> | Optionnel |
| 10 | <span class="flag-red">Si le chemin ADC audio analogique intégré de la puce n'est pas utilisé, il est recommandé que ADC1P/ADC1N et ADC2P/ADC2N disposent chacun d'une résistance série de 0 Ω vers la masse</span> | Optionnel |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tableau 5.8.20-1 : Liste de contrôle SPI</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La connexion SPI est correcte ; SDO et SDI sont correctement croisés entre le MCU et le périphérique | Optionnel |
| 2 | Les exigences de timing du périphérique SPI sont confirmées et prises en charge | Optionnel |
| 3 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Optionnel |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tableau 5.8.21-1 : Liste de contrôle USART</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | USART4 est conçu comme l'interface de téléchargement et de journalisation | Obligatoire |
| 2 | <span class="flag-red">USART4 dispose de points de test ; TXD et RXD sont recommandés avec une résistance série de 100 Ω</span> | Obligatoire |
| 3 | <span class="flag-red">USART1 dispose d'un point de test</span> | Obligatoire |
| 4 | Les composants devant fonctionner sur le HCPU sont connectés à USART2 ou USART3 | Optionnel |
| 5 | Les composants devant fonctionner sur le LCPU sont connectés à USART5 ou USART6 | Optionnel |
| 6 | Lors de la connexion à un périphérique, RXD et TXD sont correctement croisés | Obligatoire |
| 7 | Le niveau logique E/S du composant périphérique correspond à celui de la puce principale | Obligatoire |
| 8 | Les points de test USART inutilisés sont réservés pour un usage de secours | Optionnel |
| 9 | <span class="flag-red">Pour les périphériques, il est recommandé d'utiliser une interface UART du HCPU afin d'éviter que le logiciel du HCPU n'ait à utiliser une interface UART du LCPU</span> | Obligatoire |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tableau 5.8.22-1 : Liste de contrôle PWM</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | L'affectation de la broche PWM du rétroéclairage est correcte ; utilisez un GPTIMx différent du PWM du moteur, de préférence sur l'interface PB, pour éviter que la réduction de fréquence du HCPU n'affecte le rétroéclairage | Obligatoire |
| 2 | L'affectation de la broche PWM du moteur est correcte ; utilisez un GPTIMx différent du PWM du rétroéclairage, de préférence sur l'interface PB, pour éviter que la réduction de fréquence du HCPU n'affecte la vibration | Obligatoire |
| 3 | Pour le contrôle PWM du moteur, sélectionnez un GPIO désactivé par défaut pour éviter un comportement anormal pendant la programmation du firmware lorsqu'un moteur CMS est utilisé | Obligatoire |
| 4 | Les signaux nécessitant une sortie PWM doivent utiliser l'interface PB ; vérifiez également tout comportement anormal au démarrage à froid | Obligatoire |

</div>

### 5.8.23. Débogage { #5823-debug }

<div align="center"><em>Tableau 5.8.23-1 : Liste de contrôle du débogage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Les connexions de signaux SWD sont correctes | Obligatoire |
| 2 | Le connecteur J-Link ou les points de test réservent correctement la référence d'alimentation E/S | Obligatoire |
| 3 | <span class="flag-yellow">Pendant le téléchargement du programme, PVDD, VDDIO, VDDSC et les rails similaires doivent être sous tension ; AVDD18_DSI (alimentation CAU2) doit également être sous tension</span> | Obligatoire |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tableau 5.8.24-1 : Liste de contrôle USB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | La connexion de l'interface USB est correcte | Optionnel |
| 2 | L'interface USB dispose d'une protection ESD | Optionnel |
| 3 | Tant que l'USB reste activé, le PC ou l'appareil connecté peut détecter les branchements et débranchements en fonctionnement normal, hors veille. Pour maintenir cette détection lorsque le MCU est en veille, ajoutez un diviseur résistif sur VBUS. Sa sortie doit fournir un niveau haut adapté à la tension d'E/S et être reliée à une broche de réveil du MCU. Il est recommandé de partager cette broche avec celle qui détecte le branchement du chargeur | Optionnel |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>Tableau 5.8.25-1 : Liste de contrôle PBR</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | PBR0 passe de 0 à 1 pendant la mise sous tension et peut être utilisé pour le contrôle de certains commutateurs de charge externes ; PBR1-PBR5 sont par défaut en sortie basse | Obligatoire |
| 2 | PBR0-PBR5 peuvent être utilisés comme sorties à la fois en Standby et en Hibernate | Optionnel |
| 3 | PBR0-PBR5 peuvent générer des signaux LPTIM | Optionnel |
| 4 | <span class="flag-red">Pour le SF32LB567, LPTIM3 est recommandé : LPTIM3_OUT et LPTIM3_OUT_BAR génèrent depuis les broches PBR des signaux de 21-25 kHz, de rapports cycliques différents et de polarités opposées</span> | Optionnel |
| 5 | <span class="flag-red">Les signaux 21-25 kHz de polarité opposée avec des rapports cycliques différents peuvent également être générés depuis l'ATIM du HCPU ; sélectionnez les signaux ATIMx_CHx et ATIMx_CHxN adaptés avec Pin_Config et tenez compte de l'impact de la réduction de fréquence du HCPU</span> | Optionnel |
| 6 | PBR0-PBR5 peuvent générer un signal d'horloge 32 kHz | Optionnel |
| 7 | <span class="flag-red">PBR0-PBR3 peuvent être configurées comme entrées de réveil, mais après le réveil du MCU, PBR0-PBRx ne peuvent pas recevoir de signaux d'interruption et ne peuvent détecter que des niveaux 0/1 ; à utiliser avec prudence</span> | Optionnel |

</div>

!!! note "Portée des sources et vérification technique"
    Le point 4 de la liste PBR du [classeur de contrôle d'origine](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) mentionne SF32LB567. Toutefois, le classeur ne confirme pas que les points 4 et 5 de la liste PBR sont des recommandations pour le SF32LB58x ; vérifiez leur applicabilité auprès de SiFli avant de les adopter.

    Le point 6 de la liste de contrôle du stockage du classeur indique que PA43 doit être mis à l'état haut pendant la programmation en production afin d'activer « l'alimentation MPI3 ». En revanche, la [note d'application matérielle officielle du SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md) décrit PA43 comme la commande d'alimentation de la Flash externe et indique qu'il faut le mettre à l'état haut pour alimenter cette Flash. La ligne de la liste conserve le texte du classeur. Avant de figer la procédure de programmation en production, confirmez auprès de SiFli le rail d'alimentation et les interfaces réellement commandés par PA43.

### 5.8.26. Consommation électrique { #5826-power-consumption }

<div align="center"><em>Tableau 5.8.26-1 : Liste de contrôle de la consommation électrique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Pour toutes les broches d'activation MOSFET, LDO, et DCDC utilisées pour la commutation d'alimentation, réservez un tirage bas de 1 MΩ vers la masse lorsque la broche d'activation est active à l'état haut | Obligatoire |
| 2 | Le courant de référence en mode Hibernate est consigné | Obligatoire |
| 3 | <span class="flag-red">La somme des courants de référence des périphériques sélectionnés en mode Hibernate est consignée et répond aux exigences du projet</span> | Obligatoire |
| 4 | Le courant de référence en mode Standby est consigné | Obligatoire |
| 5 | <span class="flag-red">La somme des courants de référence des périphériques sélectionnés en mode Standby est consignée et répond aux exigences du projet</span> | Obligatoire |

</div>

### 5.8.27. Téléchargement et calibration du quartz { #5827-download-and-crystal-calibration }

<div align="center"><em>Tableau 5.8.27-1 : Liste de contrôle de téléchargement et de calibration du quartz</em></div>

<div align="center" markdown>

| N° | Point de contrôle | Catégorie |
|:---|:---|:---|
| 1 | Prévoyez des points de test pour le téléchargement SWD sur VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA et VDDIOB | Obligatoire |
| 2 | Si une carte de téléchargement hors ligne est nécessaire pour programmer le firmware, prévoir des points de test sur VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN et VDDIOA | Optionnel |
| 3 | Si une calibration du quartz est requise, réservez un point de test de calibration du quartz ; PB45 est recommandé | Optionnel |

</div>
