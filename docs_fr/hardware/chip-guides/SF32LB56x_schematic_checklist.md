---
icon: lucide/list-checks
description: "Liste de revue de schéma point par point du MCU SF32LB56x : vérifications d'alimentation, d'horloge, de RF, de stockage, d'affichage et de fabrication."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56x — Liste de contrôle du schéma { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "Fait partie du guide de conception matérielle SF32LB56x"
    Cette page couvre la section 5.8, la liste de contrôle du schéma point par point. Retournez aux [Directives de conception du schéma](SF32LB56x_schematic_design.md).

## 5.8. Liste de contrôle du schéma { #58-schematic-checklist }

Chaque tableau ci-dessous couvre un bloc fonctionnel du schéma. Appliquez une ligne uniquement aux variantes indiquées dans la colonne « S'applique à » lorsque cette colonne est présente.

### 5.8.1. Boîtier { #581-package }

<div align="center"><em>Tableau 5.8.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le boîtier de la référence sélectionnée est correct, y compris les noms et numéros de broches | Toutes les puces | Obligatoire |

</div>

### 5.8.2. Alimentation { #582-power-supply }

<div align="center"><em>Tableau 5.8.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La tension PVDD doit être comprise entre 1,8 V et 3,3 V. Une tension de 1,8 V est recommandée pour le SF32LB56xU/SF32LB56xV, et de 3,3 V pour le SS6700A | Toutes les puces | Obligatoire |
| 2 | Les connexions BUCK_LX et BUCK_FB sont correctes | Toutes les puces | Obligatoire |
| 3 | La sortie LDO_VOUT1 dispose d'un point de test ou d'un condensateur de filtrage facilement accessible pour mesurer la tension | Toutes les puces | Obligatoire |
| 4 | La sortie LDO_VOUT2 dispose d'un point de test ou d'un condensateur de filtrage facilement accessible pour mesurer la tension | Toutes les puces | Obligatoire |
| 5 | La sortie VDD_RET dispose d'un point de test ou d'un condensateur de filtrage facilement accessible pour mesurer la tension | Toutes les puces | Obligatoire |
| 6 | La sortie VDD_RTC dispose d'un point de test ou d'un condensateur de filtrage facilement accessible pour mesurer la tension | Toutes les puces | Obligatoire |
| 7 | La tension de VDDIO1 doit être comprise entre 1,8 V et 3,3 V ; le SF32LB56xU utilise 1,8 V et le SS6700A utilise 3,3 V. VDDIO1 peut être commutée avec la Flash externe sous le contrôle de PBR0. Si VDDIO1 n'est pas contrôlée par PBR0, assurez-vous qu'elle est alimentée pendant le téléchargement de programme. Si elle est contrôlée par un GPIO, PB22 est recommandé et l'outil de téléchargement doit activer ce rail | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 8 | Lorsque VDDIO1 est alimentée par le SF30147, LVSW1 est recommandé ; l'outil de téléchargement doit activer ce rail | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 9 | La tension de VDDIO2 doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte (1,8 V est recommandé pour le SF32LB56xU et 3,3 V pour le SS6700A) | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 10 | La tension de VDDIO3 doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte (1,8 V est recommandé pour le SF32LB56xU et 3,3 V pour le SS6700A) | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 11 | La tension de VDDIO4 doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte (1,8 V est recommandé pour le SF32LB56xU ; le SS6700A ne dispose pas de ce rail d'alimentation) | SF32LB560/561/563/56W | Obligatoire |
| 12 | La tension de VDDIOA doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte | SF32LB565/567 | Obligatoire |
| 13 | La tension de VDDIOA2 doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte | SF32LB565/567 | Obligatoire |
| 14 | La tension de VDDIOB doit être comprise entre 1,8 V et 3,3 V ; prévoyez une résistance série de 0 Ω sur la première révision de la carte | SF32LB565/567 | Obligatoire |
| 15 | La tension d'alimentation VDDIOSA est de 1,8 V, et un interrupteur de charge est prévu pour le contrôle d'alimentation | SF32LB565/567 | Obligatoire |
| 16 | La tension d'alimentation VDDIOSB est de 1,8 V, et un interrupteur de charge est prévu pour le contrôle d'alimentation | SF32LB565/567 | Obligatoire |
| 17 | La tension d'alimentation VDDIOSC est de 1,8 V et VDDIOSC doit toujours être alimentée | SF32LB565/567 | Obligatoire |
| 18 | La tension d'alimentation AVDD33_ANA est de 3,3 V | Toutes les puces | Obligatoire |
| 19 | La tension d'alimentation AVDD33_AUD est de 3,3 V | Toutes les puces | Obligatoire |
| 20 | Il est recommandé d'utiliser un circuit intégré de charge avec gestion du chemin d'alimentation afin que le système puisse démarrer depuis l'entrée du chargeur lorsque la tension de la batterie est inférieure au seuil de mise sous tension | Toutes les puces | Obligatoire |
| 21 | Si un circuit intégré de charge sans gestion du chemin d'alimentation est utilisé, le courant de charge lente doit être d'au moins 40 mA | Toutes les puces | Obligatoire |
| 22 | Le cas échéant, la conception de l'alimentation doit assurer la compatibilité matérielle entre le SF32LB56xU et le SS6700 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 23 | Lorsque le SF30147 fournit l'alimentation, utilisez l'interface TWI dédiée du SF32LB56x pour le contrôle par registre | Toutes les puces | Obligatoire |
| 24 | Si le TWI du SF30147 partage le bus I2C de l'accéléromètre, l'alimentation des résistances de pull-up de ce bus I2C doit rester activée pour que le TWI fonctionne correctement | Toutes les puces | Obligatoire |
| 25 | Lorsque le SF30147 fournit l'alimentation, des interrupteurs de charge et des LDO contrôlés par EN peuvent être utilisés. Le domaine d'alimentation d'EN doit être PVDD ou AVDD ; ne commandez pas l'interrupteur depuis un GPIO du MCU à 1,8 V ou 3,3 V. Autre possibilité : relier EN à la masse et commander par registre la sortie du rail correspondant | Toutes les puces | Obligatoire |
| 26 | Lorsque le SF30147 fournit l'alimentation, BUCK et LDO1 ne peuvent être contrôlés que par leurs signaux d'activation respectifs, EN_BUCK et EN_LDO1 ; le contrôle par registre interne n'est pas fourni | Toutes les puces | Obligatoire |
| 27 | Le PVDD du 56x doit correspondre à VDDIO3 sur le SF32LB56xU ou à VDDIOB sur le SF32LB56xV. Si PVDD est plus bas, par exemple si le rail d'E/S est à 3,3 V alors que PVDD est à 1,8 V, ce rail présente un courant de fuite d'environ 15 µA en Standby et Hibernate | Toutes les puces | Obligatoire |

</div>

### 5.8.3. Condensateurs et inductances d'alimentation { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tableau 5.8.3-1 : Liste de contrôle des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le condensateur réservoir de PVDD est d'au moins 10 µF | Toutes les puces | Obligatoire |
| 2 | Le condensateur BUCK_FB = 4,7 µF | Toutes les puces | Obligatoire |
| 3 | Le condensateur LDO_VOUT1 est de 4,7 µF | Toutes les puces | Obligatoire |
| 4 | Le condensateur LDO_VOUT2 est de 4,7 µF | Toutes les puces | Obligatoire |
| 5 | Le condensateur VDD_RET = 0,47 µF | Toutes les puces | Obligatoire |
| 6 | Le condensateur VDD_RTC = 1 µF | Toutes les puces | Obligatoire |
| 7 | Le condensateur VDDIO1 est d'au moins 1 µF | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 8 | Le condensateur VDDIO2 est d'au moins 1 µF | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 9 | Le condensateur VDDIO3 est d'au moins 1 µF | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 10 | Le condensateur VDDIO4 est d'au moins 1 µF | SF32LB560/561/563/56W | Obligatoire |
| 11 | Le condensateur VDDIOA est d'au moins 1 µF | SF32LB565/567 | Obligatoire |
| 12 | Le condensateur VDDIOA2 est d'au moins 1 µF | SF32LB565/567 | Obligatoire |
| 13 | Le condensateur VDDIOB est d'au moins 1 µF | SF32LB565/567 | Obligatoire |
| 14 | Le condensateur VDDIOSA est d'au moins 0,1 µF | SF32LB565/567 | Obligatoire |
| 15 | Le condensateur VDDIOSB est d'au moins 0,1 µF | SF32LB565/567 | Obligatoire |
| 16 | Le condensateur VDDIOSC est d'au moins 0,1 µF | SF32LB565/567 | Obligatoire |
| 17 | Le condensateur MIC_BIAS est de 1 µF | Toutes les puces | Obligatoire |
| 18 | Le condensateur AVDD33_ANA est d'au moins 4,7 µF | Toutes les puces | Obligatoire |
| 19 | Le condensateur AVDD33_AUD est d'au moins 4,7 µF | Toutes les puces | Obligatoire |
| 20 | Le condensateur AVDD33_BRF est d'au moins 4,7 µF | SF32LB565/567 | Obligatoire |
| 21 | Le condensateur AUD_VREF = 1 µF | Toutes les puces | Obligatoire |
| 22 | Le condensateur GPADC VREFP = 4,7 µF | Toutes les puces | Obligatoire |
| 23 | La référence de l'inductance BUCK figure dans la [liste des fournisseurs agréés par SiFli][SiFli Approved Vendor List] (AVL) | Toutes les puces | Obligatoire |
| 24 | Si l'inductance BUCK n'est pas recommandée par SiFli, elle respecte L = 4,7 µH, DCR &lt;= 0,4 ohm, et Isat &gt;= 450 mA | Toutes les puces | Obligatoire |
| 25 | PVDD est alimenté sous 1,8 V ; il est recommandé d'utiliser un convertisseur DCDC de VBAT vers 1,8 V | Toutes les puces | Obligatoire |
| 26 | En présence d'un GPS ou d'autres périphériques sensibles aux interférences, prévoyez sur BUCK_LX une empreinte pour un condensateur en dérivation vers la masse ; sa valeur sera déterminée par les essais sur le matériel réel | Toutes les puces | Obligatoire |
| 27 | Le courant de repos du DCDC sélectionné est consigné et respecte les exigences du projet | Toutes les puces | Obligatoire |
| 28 | Le courant de repos du LDO sélectionné est consigné et respecte les exigences du projet | Toutes les puces | Obligatoire |

</div>

### 5.8.4. Horloge { #584-clock }

<div align="center"><em>Tableau 5.8.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le quartz principal 48 MHz est une référence répertoriée dans l'AVL | Toutes les puces | Obligatoire |
| 2 | Si le quartz 48 MHz n'est pas répertorié dans l'AVL, il respecte 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), tolérance de fréquence ≤±10 ppm, ESR ≤30 Ω (22 Ω recommandé) | Toutes les puces | Obligatoire |
| 3 | Le quartz RTC 32,768 kHz est une référence répertoriée dans l'AVL | Toutes les puces | Obligatoire |
| 4 | Si le quartz 32,768 kHz n'est pas répertorié dans l'AVL, il respecte CL ≤12,5 pF (7 pF recommandé), tolérance de fréquence ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommandé) | Toutes les puces | Obligatoire |

</div>

### 5.8.5. Signaux de masse { #585-ground-signals }

<div align="center"><em>Tableau 5.8.5-1 : Liste de contrôle des signaux de masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Tous les signaux VSS sont connectés à GND | Toutes les puces | Obligatoire |

</div>

### 5.8.6. Mode de démarrage { #586-boot-mode }

<div align="center"><em>Tableau 5.8.6-1 : Liste de contrôle du mode de démarrage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | MODE dispose d'un pull-down interne ; réservez un pull-up de 10 kΩ vers VDDIOA et pilotez MODE à l'état haut pendant le téléchargement de programme | Toutes les puces | Obligatoire |
| 2 | Le signal MODE dispose d'un point de test réservé et doit être amené jusqu'au gabarit de programmation de production | Toutes les puces | Obligatoire |

</div>

### 5.8.7. RF { #587-rf }

<div align="center"><em>Tableau 5.8.7-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le signal ANT est annoté avec l'exigence d'une impédance caractéristique de 50 Ω en configuration asymétrique (single-ended) | Toutes les puces | Obligatoire |
| 2 | Un réseau d'adaptation de type Pi est réservé sur le signal ANT : un condensateur parallèle NC (non implanté) et un condensateur série de 15 pF | Toutes les puces | Obligatoire |

</div>

### 5.8.8. Affectation des ressources d'E/S { #588-io-resource-allocation }

<div align="center"><em>Tableau 5.8.8-1 : Liste de contrôle d'affectation des ressources d'E/S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Un tableau d'affectation des ressources GPIO correspondant au schéma est fourni | Toutes les puces | Obligatoire |
| 2 | L'affectation des GPIO dans le tableau des ressources correspond au schéma | Toutes les puces | Obligatoire |
| 3 | Pour le contrôle de sortie GPIO, tenez compte de l'état PU/PD par défaut pendant le démarrage à froid et activez les périphériques concernés à l'avance si nécessaire | Toutes les puces | Obligatoire |
| 4 | L'affectation réelle des GPIO suit les recommandations de SiFli ; référez-vous au fichier de configuration d'E/S | Toutes les puces | Obligatoire |

</div>

### 5.8.9. Réveil matériel { #589-hardware-wake-up }

<div align="center"><em>Tableau 5.8.9-1 : Liste de contrôle du réveil matériel</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les sources d'interruption de réveil Hibernate/Standby sont correctes : PA50, PA51, PB32, PB33, PB34, PBR0, PBR1 et PBR2, huit broches au total | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 2 | Les sources d'interruption de réveil Hibernate/Standby sont correctes : PA50-PA54, PB32-PB36, et PBR0-PBR3, quatorze broches au total | SF32LB565/567 | Obligatoire |
| 3 | Les broches de réveil peuvent réveiller le HCPU ou le LCPU selon la configuration logicielle | Toutes les puces | Obligatoire |
| 4 | Les signaux d'interruption et de contrôle des périphériques côté LCPU tels que le G-sensor et le capteur de fréquence cardiaque doivent se connecter aux GPIO PB | Toutes les puces | Obligatoire |

</div>

### 5.8.10. Stockage { #5810-storage }

<div align="center"><em>Tableau 5.8.10-1 : Liste de contrôle du stockage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) se connecte à une mémoire flash SPI NAND ou SD NAND ; sur la Flash externe du SF32LB56xU, assurez-vous que la tension d'alimentation de la Flash correspond à VDDIO3 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 2 | MPI3 (SD2) se connecte à une mémoire flash SPI NAND ou SD NAND, et le niveau d'E/S de la Flash correspond à VDDIOA2 | SF32LB565/567 | Obligatoire |
| 3 | La broche HOLD# de la mémoire flash SPI NAND est tirée (pull-up) vers l'alimentation de la mémoire flash SPI NAND via une résistance de 10 kΩ | Toutes les puces | Obligatoire |
| 4 | MPI3 se connecte à une mémoire NOR flash (la mémoire externe du SS6700A doit être une mémoire NOR flash) | Toutes les puces | Obligatoire |
| 5 | Si la Flash MPI3 (SD2) doit être programmée en production, son alimentation externe doit être activée pendant le téléchargement du programme | Toutes les puces | Obligatoire |
| 6 | L'interrupteur d'alimentation contrôlé par PBR0 ou un autre GPIO est activé à l'état haut et désactivé à l'état bas | Toutes les puces | Obligatoire |
| 7 | Si l'interface SD2 se connecte à une SD NAND, les connexions de signaux sont correctes | Toutes les puces | Obligatoire |
| 8 | Des résistances série de 33 Ω sont recommandées sur les lignes CLK et de données de la mémoire flash | Toutes les puces | Optionnel |
| 9 | Le niveau d'E/S de la SD NAND correspond à VDDIO2 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 10 | Les lignes CLK et de données de la mémoire flash disposent de résistances série de 33 Ω | Toutes les puces | Obligatoire |
| 11 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les puces | Obligatoire |
| 12 | La mémoire NOR co-packagée du LCPU reste toujours alimentée, et PBR0 contrôle par défaut l'alimentation de la Flash externe.<br>(1) Si les GPIO sont limités, PBR0 peut également contrôler l'alimentation de la PSRAM co-packagée du 561/2/3/W (VDDIO1). Si la PSRAM contient des données à conserver pendant la veille, ne coupez l'alimentation ni de la PSRAM ni de la Flash externe.<br>(2) Si des GPIO sont disponibles, utilisez PB22 pour contrôler l'interrupteur d'alimentation de la PSRAM | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 13 | <span class="flag-yellow">Les alimentations VDDIOSA et VDDIOSB sont contrôlées par PBR0, VDDIOSC est toujours alimentée, et l'alimentation de la Flash externe est contrôlée par PA03</span> | SF32LB565/567 | Obligatoire |
| 14 | La mémoire NOR flash est qualifiée dans le guide de sélection des composants clés | Toutes les puces | Obligatoire |
| 15 | La mémoire flash SPI/SD NAND est qualifiée dans le guide de sélection des composants clés | Toutes les puces | Obligatoire |

</div>

### 5.8.11. Affichage { #5811-display }

<div align="center"><em>Tableau 5.8.11-1 : Liste de contrôle de l'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le SF32LB56xU ou SS6700A se connecte à un panneau QSPI | Toutes les puces | Obligatoire |
| 2 | Le SF32LB56xU ou SS6700A se connecte à un panneau JDI série | Toutes les puces | Obligatoire |
| 3 | Les connexions de signaux QSPI de LCDC1 sont correctes ; des résistances série de 100 Ω sont recommandées sur les lignes CLK et de données | Toutes les puces | Obligatoire |
| 4 | Les connexions de signaux JDI série de LCDC1 sont correctes | Toutes les puces | Obligatoire |
| 5 | La connexion RSTB du LCDC est correcte | Toutes les puces | Obligatoire |
| 6 | La connexion TE du LCDC est correcte (se connecte au signal TE ou Fmark du panneau) | Toutes les puces | Obligatoire |
| 7 | Les signaux TP suivent l'affectation de broches recommandée (référez-vous au fichier de configuration d'E/S de l'EVB) | Toutes les puces | Obligatoire |
| 8 | L'interface LCD prend en charge le SPI à 3 ou 4 fils, le SPI avec données en mode double ou quadruple, le JDI série et des modes similaires | Toutes les puces | Optionnel |
| 9 | LCD SPI, mode 3 fils : CS connecté à PA36, CLK connecté à PA37, DATA connecté à PA38 ; mode 4 fils : CS connecté à PA36, CLK connecté à PA37, DATA connecté à PA38, DC connecté à PA39 | Toutes les puces | Optionnel |
| 10 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les puces | Obligatoire |
| 11 | Si l'AOD du LCD est requis, notez que LCD_RST (PA05) est alimenté par VDDIO3, qui doit toujours être alimenté ; VDDIO3 ne doit pas être lié à l'alimentation de la Flash externe, sinon la désactivation de l'alimentation de la Flash pendant la veille pourrait également couper VDDIO3 et LCD_RST, causant des anomalies AOD | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 12 | Pour les LCD DSI, connectez les signaux de données et d'horloge DSI. Les panneaux DSI en mode vidéo se comportent comme des panneaux RGB et n'ont pas de signal TE ; les panneaux DSI en mode commande ont un signal TE, et le DSI17801 nécessite TE. TE et RST sont tous deux recommandés ; l'usage final dépend du LCD sélectionné | SF32LB565/567 | Obligatoire |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>Tableau 5.8.12-1 : Liste de contrôle du GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'entrée GPADC est connectée à la broche correspondante | Toutes les puces | Optionnel |
| 2 | La plage d'entrée du GPADC est correcte ; la tension d'entrée maximale ne doit pas dépasser AVDD33_AVA (3,3 V) | Toutes les puces | Optionnel |
| 3 | Recommandation de diviseur de tension de batterie : résistance de 470 kΩ 1 % côté alimentation, résistance de 1 MΩ 1 % vers la masse, et condensateur de filtrage de 100 nF | Toutes les puces | Obligatoire |
| 4 | Pour chaque signal mesuré par le GPADC au moyen d'un pont diviseur résistif, utilisez des résistances à tolérance de 1 % ; placez un condensateur de filtrage de 100 nF près de la broche de la puce pour chaque canal GPADC | Toutes les puces | Obligatoire |
| 5 | L'ADC peut détecter plusieurs boutons et économiser des broches ; par exemple, lorsque PB32 est utilisé comme bouton ADC, n'utilisez pas la batterie comme alimentation de pull-up | Toutes les puces | Obligatoire |

</div>

### 5.8.13. Boutons { #5813-buttons }

<div align="center"><em>Tableau 5.8.13-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Confirmez avec le client si le bouton doit pouvoir réveiller le système | Toutes les puces | Obligatoire |
| 2 | La connexion du bouton ordinaire est correcte (pull-up présent, valeur de résistance correcte, domaine de tension de pull-up correct) | Toutes les puces | Obligatoire |
| 3 | Le bouton d'alimentation doit être raccordé à PB32 et être actif à l'état haut. Un appui long de 10 secondes doit déclencher la réinitialisation ; prévoir une résistance de pull-down de 10 kΩ sur la carte principale | Toutes les puces | Obligatoire |
| 4 | Tous les signaux de bouton disposent d'une protection ESD | Toutes les puces | Obligatoire |

</div>

### 5.8.14. Protection EOS et ESD { #5814-eos-and-esd-protection }

<div align="center"><em>Tableau 5.8.14-1 : Liste de contrôle de la protection EOS et ESD</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'interface de charge dispose d'une conception EOS, ESD et OVP | Toutes les puces | Obligatoire |
| 2 | Le signal de détection d'insertion du chargeur dispose d'un composant ESD | Toutes les puces | Obligatoire |
| 3 | L'interface de batterie dispose d'un composant ESD | Toutes les puces | Obligatoire |
| 4 | L'interface d'antenne dispose d'un composant ESD | Toutes les puces | Obligatoire |
| 5 | Les interfaces d'alimentation du LCD et du TP disposent de composants ESD | Toutes les puces | Obligatoire |
| 6 | Les lignes I2C, RST et INT du TP disposent de composants ESD | Toutes les puces | Obligatoire |
| 7 | L'interface d'alimentation et les lignes de signal du capteur de fréquence cardiaque disposent de composants ESD | Toutes les puces | Obligatoire |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>Tableau 5.8.15-1 : Liste de contrôle I2C</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'affectation I2C tient compte du partitionnement HCPU/LCPU et de la nécessité pour le composant de fonctionner en mode basse consommation | Toutes les puces | Obligatoire |
| 2 | L'I2C dispose de pull-ups avec la valeur de résistance correcte ; pour un fonctionnement à 400 kHz, des pull-ups de 2,2 kΩ sont recommandés. Utilisez le domaine de tension côté périphérique et coupez l'alimentation du pull-up avec le périphérique lors de la mise hors tension | Toutes les puces | Obligatoire |
| 3 | Le signal d'interruption I2C prend en charge le réveil matériel lorsque nécessaire | Toutes les puces | Obligatoire |
| 4 | Si plusieurs composants partagent un bus I2C, leurs adresses sont distinctes | Toutes les puces | Obligatoire |
| 5 | La ligne source de SiFli relative au PMIC SF30147C indique : « I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C ». La formulation ne précise ni la relation entre les signaux ni le sens de « normal ». Avant la validation, vérifiez l'affectation de PB23, l'alimentation du pull-up et le fonctionnement de TWI DAT avec le SF30147C dans le schéma et la documentation officiels. | SF32LB560/561/563/56W et SS6700A | Obligatoire |

</div>

### 5.8.16. Audio analogique { #5816-analog-audio }

<div align="center"><em>Tableau 5.8.16-1 : Liste de contrôle audio analogique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion du microphone MEMS est correcte | Toutes les puces | Obligatoire |
| 2 | Le microphone MEMS est alimenté depuis MIC_BIAS | Toutes les puces | Obligatoire |
| 3 | La connexion du microphone ECM analogique asymétrique est correcte | Toutes les puces | Obligatoire |
| 4 | Le microphone ECM analogique asymétrique est alimenté depuis MIC_BIAS | Toutes les puces | Obligatoire |
| 5 | La connexion du microphone ECM analogique différentiel est correcte | Toutes les puces | Obligatoire |
| 6 | Le microphone ECM analogique différentiel est alimenté depuis MIC_BIAS | Toutes les puces | Obligatoire |
| 7 | Toutes les entrées de l'ADC audio disposent d'un condensateur de blocage DC d'au moins 2,2 µF | Toutes les puces | Obligatoire |
| 8 | Les sorties DACP et DACN du DAC audio disposent chacune d'une résistance série de 1 kΩ près de la puce, avec un condensateur de 1,5 nF en parallèle entre DACP et DACN | Toutes les puces | Obligatoire |
| 9 | L'AW8155 est l'amplificateur audio recommandé ; configurez-le par logiciel en mode 4 / mode Classe AB lors de l'utilisation du composant recommandé | Toutes les puces | Obligatoire |
| 10 | Si la sortie du PA audio est renvoyée vers l'ADC du MCU, ajoutez un pont diviseur et un filtre RC, ou un filtrage numérique supplémentaire. La tension après division doit rester dans la plage d'entrée de l'ADC, et la fréquence de coupure du filtre RC devrait être de 20 kHz | Toutes les puces | Obligatoire |
| 11 | Si le chemin ADC audio analogique intégré à la puce n'est pas utilisé, il est recommandé que ADCP et ADCN disposent chacun d'une résistance série de 0 Ω vers la masse | Toutes les puces | Obligatoire |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>Tableau 5.8.17-1 : Liste de contrôle SPI</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion SPI est correcte ; SDO et SDI sont correctement croisés entre le MCU et le périphérique | Toutes les puces | Optionnel |
| 2 | Les exigences de minutage du périphérique SPI sont confirmées et prises en charge | Toutes les puces | Optionnel |
| 3 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les puces | Optionnel |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>Tableau 5.8.18-1 : Liste de contrôle USART</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | USART4 est l'interface de téléchargement/débogage de programme ; réservez des points de test et ajoutez une résistance série de 100 Ω recommandée, ajustable selon la conception réelle | Toutes les puces | Obligatoire |
| 2 | <span class="flag-yellow">Sur le SF32LB56xU, PA17/PA18 sont multiplexées en USART1 pour les tests de certification RF ; réservez des points de test</span> | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 3 | <span class="flag-yellow">Sur le SF32LB56xV, PA30/PA34 sont multiplexées en USART1 pour les tests de certification RF ; réservez des points de test</span> | SF32LB565/567 | Obligatoire |
| 4 | Lors de la connexion à un périphérique, le RXD côté MCU se connecte au TXD du périphérique et le TXD côté MCU se connecte au RXD du périphérique | Toutes les puces | Obligatoire |
| 5 | Lorsque PA17/PA18 sont multiplexées en UART vers des périphériques, assurez-vous que, lors de la réinitialisation du MCU, les périphériques connectés sont hors tension ou que le logiciel force les deux broches à l'état bas | Toutes les puces | Obligatoire |
| 6 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les puces | Obligatoire |
| 7 | Les points de test USART inutilisés sont réservés pour un usage de secours | Toutes les puces | Optionnel |
| 8 | Il est recommandé que l'UART connecté aux périphériques utilise l'interface HCPU afin d'éviter que le logiciel HCPU n'utilise une interface UART du LCPU | Toutes les variantes | Obligatoire |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>Tableau 5.8.19-1 : Liste de contrôle PWM</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'affectation de la broche PWM de rétroéclairage est correcte ; le contrôle du rétroéclairage LCD doit utiliser des GPIO PB dotés de la fonction PWM | Toutes les puces | Optionnel |
| 2 | L'affectation de la broche PWM du moteur est correcte ; le contrôle de vibration du moteur doit utiliser des GPIO PB dotés de la fonction PWM | Toutes les puces | Optionnel |
| 3 | Pour le contrôle PWM du moteur, sélectionnez un GPIO désactivé par défaut afin d'éviter un comportement anormal pendant la programmation du firmware lorsqu'un moteur CMS est utilisé | Toutes les puces | Optionnel |
| 4 | Les sorties PWM autres que le rétroéclairage et le moteur doivent également utiliser l'interface PB, et le comportement au démarrage à froid doit être vérifié | Toutes les puces | Optionnel |

</div>

### 5.8.20. Débogage { #5820-debug }

<div align="center"><em>Tableau 5.8.20-1 : Liste de contrôle du débogage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les broches UART4_TXD et UART4_RXD sont recommandées pour le débogage ; prévoyez des points de test et une résistance série recommandée de 100 Ω | Toutes les puces | Obligatoire |
| 2 | Les connexions de signaux SWD sont correctes | Toutes les puces | Obligatoire |
| 3 | Le connecteur J-Link ou les points de test réservent correctement la référence d'alimentation d'E/S | Toutes les puces | Obligatoire |
| 4 | Pendant le téléchargement en production, assurez-vous que PVDD, VDDIO2 sur le SF32LB56xU ou VDDIOA sur le SF32LB56xV, VDDIO3 sur le SF32LB56xU ou VDDIOA2 sur le SF32LB56xV, et VDDIO4 sur le SF32LB56xU ou VDDIOB sur le SF32LB56xV sont alimentées. VDDIO1 sur les 561/563/56W ou VDDIOSB sur les 565/567 doivent également être alimentées | Toutes les puces | Obligatoire |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>Tableau 5.8.21-1 : Liste de contrôle USB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion de l'interface USB est correcte | Toutes les puces | Optionnel |
| 2 | L'interface USB dispose d'une protection ESD | Toutes les puces | Optionnel |
| 3 | En fonctionnement normal, tant que l'USB reste activé, le PC ou le périphérique peut détecter son branchement et son débranchement.<br>Si cette détection doit également fonctionner lorsque le MCU est en veille, prévoyez un pont diviseur résistif sur VBUS. Sa sortie doit fournir un niveau haut correspondant à la tension d'E/S et être reliée à une broche de réveil du MCU. Il est recommandé de partager cette broche avec celle de détection de l'insertion du chargeur | Toutes les puces | Optionnel |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>Tableau 5.8.22-1 : Liste de contrôle PBR</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | PBR0 passe de 0 à 1 pendant la mise sous tension et peut commander certains interrupteurs de charge externes ; par défaut, PBR1-PBR2 sont configurées en sorties à l'état bas | Toutes les puces | Obligatoire |
| 2 | PBR0-PBRx peuvent être utilisées comme sorties à la fois en Standby et en Hibernate | Toutes les puces | Optionnel |
| 3 | PBR0-PBRx peuvent produire des signaux LPTIM | Toutes les puces | Optionnel |
| 4 | Pour le 567, LPTIM3 est recommandé : LPTIM3_OUT et LPTIM3_OUT_BAR produisent des signaux de 21-25 kHz depuis des broches PBR avec des rapports cycliques différents et une polarité opposée | Toutes les puces | Optionnel |
| 5 | Les signaux de polarité opposée de 21-25 kHz avec des rapports cycliques différents peuvent également être produits depuis l'ATIM du HCPU ; sélectionnez les signaux ATIMx_CHx et ATIMx_CHxN appropriés avec Pin_Config et tenez compte de l'impact de la réduction de fréquence du HCPU | Toutes les puces | Optionnel |
| 6 | PBR1-PBRx peuvent produire un signal d'horloge 32 kHz | Toutes les puces | Optionnel |
| 7 | PBR0-PBRx peuvent être configurées comme entrées pour les signaux de réveil | Toutes les puces | Optionnel |
| 8 | Lorsqu'une broche PBR est utilisée comme broche de réveil, le logiciel doit l'interroger après le réveil du MCU. Elle prend en charge les niveaux à variation lente comme les boutons et la détection de chargeur, mais les impulsions rapides comme les interruptions de fréquence cardiaque doivent utiliser un GPIO normal capable de réveil, pas une broche PBR | Toutes les puces | Optionnel |

</div>

### 5.8.23. Consommation électrique { #5823-power-consumption }

<div align="center"><em>Tableau 5.8.23-1 : Liste de contrôle de la consommation électrique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Pour toutes les broches d'activation MOSFET, LDO et DCDC utilisées pour la commutation d'alimentation, réservez un pull-down de 1 MΩ vers la masse lorsque la broche d'activation est active à l'état haut ; ajustez la valeur si nécessaire pour le projet réel | Toutes les puces | Obligatoire |
| 2 | Alimentez le PVDD du SF32LB56x en 1,8 V à partir d'un convertisseur DCDC à faible Iq et maintenez-le alimenté en permanence | Toutes les puces | Obligatoire |
| 3 | Pour le SF32LB56xU et le SS6700, VDDIO1 nécessite un contrôle par interrupteur de charge. Utilisez PBR0 comme signal de contrôle ; si des GPIO sont disponibles, PB22 peut contrôler l'alimentation. L'outil de téléchargement doit activer l'alimentation VDDIO1 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 4 | Pour le SF32LB56xU et le SS6700, l'alimentation de la Flash externe nécessite un interrupteur de charge contrôlé par PBR0 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 5 | <span class="flag-yellow">En mode Hibernate-off ou Standby-off, VDDIOSA et VDDIOSB du SF32LB56xV nécessitent un contrôle par interrupteur de charge via PBR0, tandis que VDDIOSC doit toujours être alimentée</span> | SF32LB565/567 | Obligatoire |
| 6 | <span class="flag-yellow">L'alimentation de la Flash MPI3 du SF32LB56xV nécessite un interrupteur de charge contrôlé par PA03 ; activez l'alimentation de la Flash MPI3 pendant le téléchargement</span> | SF32LB565/567 | Obligatoire |
| 7 | L'exigence de courant de référence en Deep Sleep est consignée. Le courant en Deep Sleep est supérieur à celui du Standby et convient à un réveil fréquent avec des intervalles inférieurs à 200 ms ; toutes les broches PB prennent en charge le réveil, et le courant de référence est de 90 µA | Toutes les puces | Obligatoire |
| 8 | La somme des courants de référence de tous les périphériques sélectionnés en mode Deep Sleep est consignée et respecte les exigences du projet | Toutes les puces | Obligatoire |
| 9 | L'exigence de courant de référence en Standby est consignée. Le Standby convient à un réveil moins fréquent avec des intervalles supérieurs à 200 ms ; seules PA50, PA51, PB33 et PB34 prennent en charge le réveil, et le courant de référence est de 4-5 µA | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 10 | L'exigence de courant de référence en Standby est consignée. Le Standby convient à un réveil moins fréquent avec des intervalles supérieurs à 200 ms ; seules PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35 et PB36 prennent en charge le réveil, et le courant de référence est de 4-5 µA | SF32LB565/567 | Obligatoire |
| 11 | Les courants des périphériques sélectionnés en mode Standby sont consignés et respectent les exigences du projet | Toutes les puces | Obligatoire |

</div>

### 5.8.24. Téléchargement { #5824-download }

<div align="center"><em>Tableau 5.8.24-1 : Liste de contrôle du téléchargement</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | SF32LB56xU : prévoyez des points de test de téléchargement pour VBAT, GND, VDDIO2, VDDIO3 ou VDDIO4, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD et l'une des broches PB20/PB21/PB25 | SF32LB560/561/563/56W et SS6700A | Obligatoire |
| 2 | SF32LB56xV : prévoyez des points de test de téléchargement pour VBAT, GND, VDDIOA, VDDIOB, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD et l'une des broches PB20/PB21/PB25 | SF32LB565/567 | Obligatoire |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
