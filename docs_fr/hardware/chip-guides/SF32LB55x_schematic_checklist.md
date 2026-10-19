---
icon: lucide/list-checks
hide:
    - navigation
description: "Liste de contrôle de revue de schéma point par point pour le microcontrôleur SF32LB55x, couvrant les vérifications d'alimentation, d'horloge, de RF, de stockage, d'affichage et de fabrication."
tags:
    - Matériel
    - Puce
    - Liste de contrôle
---

# Guide de conception matérielle SF32LB55x — Liste de contrôle du schéma { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. Liste de contrôle du schéma { #58-schematic-checklist }

Chaque tableau ci-dessous couvre un bloc fonctionnel du schéma. Appliquez une ligne uniquement aux variantes indiquées dans la colonne « S'applique à » lorsque cette colonne est présente.

Le texte rouge et les fonds jaunes reprennent les mises en évidence de contrôle du classeur source. Celui-ci n'en précise pas la raison ; considérez-les comme des repères supplémentaires de vérification, sans incidence sur la catégorie « Obligatoire/Optionnel » du point.

### 5.8.1. Boîtier { #581-package }

<div align="center"><em>Tableau 5.8.1-1 : Liste de contrôle du boîtier</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le boîtier de la référence sélectionnée est correct, y compris les noms et numéros de broches | Toutes les variantes | Obligatoire |

</div>

### 5.8.2. Alimentation { #582-power-supply }

<div align="center"><em>Tableau 5.8.2-1 : Liste de contrôle de l'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La tension de VDD1 doit être comprise entre 1,8 V et 3,3 V | 551/555/557 uniquement | Obligatoire |
| 2 | <span class="flag-red">La tension d'alimentation VDD1 est de 3,3 V</span> | <span class="flag-red">SS6600A8 uniquement</span> | <span class="flag-red">Obligatoire</span> |
| 3 | La tension de VDD2 doit être comprise entre 1,8 V et 3,3 V | 555/557 uniquement | Obligatoire |
| 4 | Les connexions BUCK1_VSW et BUCK1_VOUT sont correctes | Toutes les variantes | Obligatoire |
| 5 | Les connexions BUCK2_VSW et BUCK2_VOUT sont correctes | 555/557 uniquement | Obligatoire |
| 6 | La connexion LDOVCC2_VOUT est correcte | 555/557 uniquement | Obligatoire |
| 7 | La tension d'alimentation AVDD_DSI est de 1,8 V | 555/557 uniquement | Obligatoire |
| 8 | La sortie LDO_VOUT1 dispose d'un point de test ou d'un condensateur de filtrage permettant de mesurer facilement la tension | Toutes les variantes | Obligatoire |
| 9 | La sortie LDO_VOUT2 dispose d'un point de test ou d'un condensateur de filtrage permettant de mesurer facilement la tension | Toutes les variantes | Obligatoire |
| 10 | La sortie VDD_RET dispose d'un point de test ou d'un condensateur de filtrage permettant de mesurer facilement la tension | Toutes les variantes | Obligatoire |
| 11 | La sortie VDD_RTC dispose d'un point de test ou d'un condensateur de filtrage permettant de mesurer facilement la tension | Toutes les variantes | Obligatoire |
| 12 | La tension d'alimentation VDD_SIP est de 1,8 V, et un interrupteur de charge est prévu pour pouvoir la couper | 551/555/557 uniquement | Obligatoire |
| 13 | <span class="flag-red">La tension d'alimentation VDD_SIP est de 3,3 V, et un interrupteur de charge est prévu pour pouvoir la couper</span> | <span class="flag-red">SS6600A8 uniquement</span> | <span class="flag-red">Obligatoire</span> |
| 14 | La tension d'alimentation AVDD33 est de 3,3 V | Toutes les variantes | Obligatoire |
| 15 | La tension d'alimentation AVDD_BRF est de 1,8 V à 3,3 V et doit correspondre à l'alimentation VDD1 | 551/555/557 uniquement | Obligatoire |
| 16 | <span class="flag-red">La tension d'alimentation AVDD_BRF est de 3,3 V</span> | <span class="flag-red">SS6600A8 uniquement</span> | <span class="flag-red">Obligatoire</span> |
| 17 | La tension d'alimentation VDDIOA est de 1,8 V à 3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte | 551/555/557 uniquement | Obligatoire |
| 18 | La tension d'alimentation VDDIOB est de 1,8 V à 3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte | 551/555/557 uniquement | Obligatoire |
| 19 | <span class="flag-red">La tension d'alimentation VDDIOA est de 3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte</span> | <span class="flag-red">SS6600A8 uniquement</span> | <span class="flag-red">Obligatoire</span> |
| 20 | <span class="flag-red">La tension d'alimentation VDDIOA est de 3,3 V ; réservez une résistance série de 0 Ω dans la première révision de carte</span> | <span class="flag-red">SS6600A8 uniquement</span> | <span class="flag-red">Obligatoire</span> |
| 21 | Lorsque le SF30147C fournit l'alimentation, l'interface de contrôle TWI doit utiliser les broches PB du MCU, et ces broches doivent être des broches PD | 551/555/557 uniquement | Obligatoire |
| 22 | Lorsque le SF30147C fournit l'alimentation, les rails contrôlés par EN doivent utiliser PVDD ou AVDD comme domaine d'alimentation EN ; ne contrôlez pas EN depuis un GPIO du MCU. Autrement, reliez EN à la masse et contrôlez la sortie du rail correspondant via des registres | 551/555/557 uniquement | Obligatoire |
| 23 | Lorsque le SF30147C fournit l'alimentation, BUCK et LDO1 ne peuvent être contrôlés que par leurs signaux d'activation respectifs, EN_BUCK et EN_LDO1 ; le contrôle par registre interne n'est pas fourni | 551/555/557 uniquement | Obligatoire |
| 24 | Le circuit de charge doit assurer la gestion du chemin d'alimentation afin que le système puisse être alimenté par l'entrée 5 V du chargeur lorsque la tension de la batterie est trop basse | Toutes les variantes | Obligatoire |

</div>

Ambiguïté de la source : les points 19 et 20 du classeur V1.0 d'origine sont identiques ; ils indiquent tous deux 3,3 V sur VDDIOA pour le SS6600A8. Le [guide d'application matérielle](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) identifie VDDIOA comme l'alimentation E/S de PA et VDDIOB comme celle de PB, mais ne précise pas si le point 20 devait désigner VDDIOB. La liste reprend le contenu du classeur sans modification. Avant d'utiliser le point 20 comme critère de validation de conception, confirmez auprès de SiFli le rail à vérifier.

### 5.8.3. Condensateurs et inductances d'alimentation { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tableau 5.8.3-1 : Liste de contrôle des condensateurs et inductances d'alimentation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le condensateur réservoir (bulk) VDD1 est d'au moins 10 µF | Toutes les variantes | Obligatoire |
| 2 | Le condensateur VDD2 est d'au moins 10 µF | 555/557 uniquement | Obligatoire |
| 3 | Le condensateur BUCK1_VOUT est de 4,7 µF | Toutes les variantes | Obligatoire |
| 4 | Le condensateur BUCK2_VOUT est de 4,7 µF | 555/557 uniquement | Obligatoire |
| 5 | <span class="flag-red">Le condensateur AVDD_DSI est d'au moins 10 µF</span> | 555/557 uniquement | Obligatoire |
| 6 | Le condensateur LDO_VOUT1 est de 4,7 µF | Toutes les variantes | Obligatoire |
| 7 | Le condensateur LDO_VOUT2 est de 4,7 µF | Toutes les variantes | Obligatoire |
| 8 | Le condensateur VDD_RET = 0,47 µF | Toutes les variantes | Obligatoire |
| 9 | Le condensateur VDD_RTC = 1 µF | Toutes les variantes | Obligatoire |
| 10 | Le condensateur VDD_SIP est d'au moins 1 µF | Toutes les variantes | Obligatoire |
| 11 | Le condensateur AVDD33 est d'au moins 1 µF | Toutes les variantes | Obligatoire |
| 12 | Le condensateur AVDD_BRF est d'au moins 1 µF | Toutes les variantes | Obligatoire |
| 13 | Le condensateur VDDIOA est d'au moins 1 µF | Toutes les variantes | Obligatoire |
| 14 | Le condensateur VDDIOB est d'au moins 1 µF | Toutes les variantes | Obligatoire |
| 15 | VDD1, VDD2 (555 uniquement), AVDD_BRF, et l'alimentation du pull-up de RESET doivent être identiques | Toutes les variantes | Obligatoire |
| 16 | L'inductance BUCK1 est une référence recommandée par SiFli | 551/555/557 uniquement | Obligatoire |
| 17 | L'inductance BUCK2 est une référence recommandée par SiFli | 555/557 uniquement | Obligatoire |
| 18 | Si l'inductance BUCK n'est pas recommandée par SiFli, elle respecte L = 4,7 µH, DCR ≤ 0,4 Ω et Isat ≥ 450 mA | Toutes les variantes | Obligatoire |
| 19 | En présence de GPS ou d'autres périphériques sensibles aux interférences, réservez une empreinte de condensateur de dérivation vers la masse sur BUCK_LX ; la valeur dépend des résultats de tests réels | Toutes les variantes | Obligatoire |
| 20 | <span class="flag-red">Pour convertir VBAT en 1,8 V pour VDD1 et VDD2 (555 uniquement), utilisez un convertisseur DCDC ; n'utilisez pas de LDO</span> | 551/555/557 uniquement | Obligatoire |
| 21 | <span class="flag-red">Le courant de repos du DCDC sélectionné est consigné et respecte les exigences du projet</span> | Toutes les variantes | Obligatoire |
| 22 | <span class="flag-red">Le courant de repos du LDO sélectionné est consigné et respecte les exigences du projet</span> | Toutes les variantes | Obligatoire |

</div>

Les sources divergent : le tableau 3-3 du [guide d'application matérielle chinois de SiFli](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) et le point 9 de la [liste de contrôle du schéma V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) indiquent 1 µF pour VDD_RTC, tandis que [C0313 sur le schéma de référence](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) est indiqué à 0,1 µF. Les sources ne précisent pas les conditions d'application de chaque valeur. Avant la validation finale, confirmez auprès de SiFli la valeur requise pour le composant concerné ; ne tranchez pas par supposition.

### 5.8.4. Horloge { #584-clock }

<div align="center"><em>Tableau 5.8.4-1 : Liste de contrôle de l'horloge</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le quartz principal 48 MHz est une référence répertoriée dans l'AVL | Toutes les variantes | Obligatoire |
| 2 | Si le quartz 48 MHz n'est pas répertorié dans l'AVL, il respecte 7 pF ≤ CL ≤ 12 pF (8,8 pF recommandé), tolérance de fréquence ≤±10 ppm, ESR ≤30 Ω (22 Ω recommandé) | Toutes les variantes | Obligatoire |
| 3 | Le quartz RTC 32,768 kHz est une référence répertoriée dans l'AVL | Toutes les variantes | Obligatoire |
| 4 | Si le quartz 32,768 kHz n'est pas répertorié dans l'AVL, il respecte CL ≤12,5 pF (7 pF recommandé), tolérance de fréquence ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommandé) | Toutes les variantes | Obligatoire |
| 5 | <span class="flag-yellow">Si le quartz 32,768 kHz est omis, la pastille XI doit être reliée à la masse</span> | <span class="flag-yellow">Toutes les variantes</span> | <span class="flag-yellow">Obligatoire</span> |

</div>

### 5.8.5. Réinitialisation { #585-reset }

<div align="center"><em>Tableau 5.8.5-1 : Liste de contrôle de la réinitialisation</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | RSTN est tiré (pull-up) vers la même alimentation que VDD1 | Toutes les variantes | Obligatoire |
| 2 | Un emplacement pour un condensateur de 0,1 µF entre RSTN et la masse est prévu | Toutes les variantes | Obligatoire |
| 3 | RSTN dispose d'une protection ESD | Toutes les variantes | Obligatoire |

</div>

### 5.8.6. Signaux de masse { #586-ground-signals }

<div align="center"><em>Tableau 5.8.6-1 : Liste de contrôle des signaux de masse</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Tous les signaux AVSS sont connectés à GND | 555/557 uniquement | Obligatoire |
| 2 | Tous les signaux VSS sont connectés à GND | 555/557 uniquement | Obligatoire |
| 3 | Le signal EPAD est connecté à GND | <span class="flag-red">551/SS6600A8 uniquement</span> | Obligatoire |

</div>

### 5.8.7. Mode de démarrage { #587-boot-mode }

<div align="center"><em>Tableau 5.8.7-1 : Liste de contrôle du mode de démarrage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE est par défaut tiré vers la masse (pull-down) via 10 kΩ et est tiré vers VDDIOA (pull-up) pendant la programmation/le téléchargement</span> | Toutes les variantes | Obligatoire |
| 2 | <span class="flag-red">Le signal MODE dispose d'un point de test réservé</span> | Toutes les variantes | Obligatoire |
| 3 | Si l'espace PCB le permet, réservez un connecteur à 3 broches afin de pouvoir sélectionner le pull-up ou le pull-down avec un cavalier | Toutes les variantes | Obligatoire |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tableau 5.8.8-1 : Liste de contrôle RF</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le signal ANT est annoté avec l'exigence d'une impédance caractéristique de 50 Ω en configuration asymétrique (single-ended) | Toutes les variantes | Obligatoire |
| 2 | Un réseau d'adaptation de type Pi est réservé sur le signal ANT : un condensateur parallèle NC (non implanté) et un condensateur série de 15 pF | Toutes les variantes | Obligatoire |
| 3 | Si un filtrage des émissions parasites est requis, réservez un réseau Pi avec une inductance série de 3,0 nH et un condensateur de dérivation de 1,5 pF | Toutes les variantes |    |
| 4 | <span class="flag-red">Si un PA ou LNA externe doit être contrôlé, connectez PB05 à RX_EN et PB25 à TX_EN</span> | Toutes les variantes | Optionnel |

</div>

Le classeur source ne renseigne pas la catégorie du point RF 3 ; elle reste donc vide ici. Ne la classez pas comme obligatoire ou optionnelle sans confirmation de SiFli.

### 5.8.9. Affectation des ressources d'E/S { #589-io-resource-allocation }

<div align="center"><em>Tableau 5.8.9-1 : Liste de contrôle d'affectation des ressources d'E/S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Un tableau d'affectation des ressources GPIO correspondant au schéma est fourni | Toutes les variantes | Obligatoire |
| 2 | L'affectation des GPIO dans le tableau des ressources correspond au schéma | Toutes les variantes | Obligatoire |
| 3 | L'affectation réelle des GPIO suit les recommandations de SiFli ; référez-vous au fichier de configuration d'E/S de l'EVB | Toutes les variantes | Obligatoire |

</div>

### 5.8.10. Réveil matériel { #5810-hardware-wake-up }

<div align="center"><em>Tableau 5.8.10-1 : Liste de contrôle du réveil matériel</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Les sources d'interruption de réveil du HCPU sont correctes : PA77, PA78, PA79 et PA80 ; ne les utilisez pas pour le réveil par bouton d'alimentation</span> | Toutes les variantes | Obligatoire |
| 2 | <span class="flag-red">Les sources d'interruption de réveil du LCPU sont correctes : PB43, PB44, PB45, PB46, PB47 et PB48, six broches au total, utilisables pour le réveil par bouton d'alimentation</span> | Toutes les variantes | Obligatoire |
| 3 | <span class="flag-red">Les signaux d'interruption et de contrôle des périphériques côté LCPU tels que le G-sensor et le capteur de fréquence cardiaque doivent se connecter aux GPIO PB</span> | Toutes les variantes | Obligatoire |
| 4 | <span class="flag-red">La source d'interruption LCPU correspondant à UART3 est utilisée correctement ; elle est recommandée uniquement pour le réveil par bouton</span> | Toutes les variantes | Obligatoire |

</div>

### 5.8.11. Stockage { #5811-storage }

<div align="center"><em>Tableau 5.8.11-1 : Liste de contrôle du stockage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | QSPI2 est conçu selon la priorité PSRAM &gt; NOR flash &gt; NAND flash | Toutes les variantes | Obligatoire |
| 2 | Si le code s'exécute depuis la mémoire NOR flash SiP interne, le contrôle de l'interrupteur d'alimentation VDD_SIP est PA58 | Toutes les variantes | Obligatoire |
| 3 | Si le code s'exécute depuis une mémoire NOR flash externe sur QSPI2, le contrôle de l'interrupteur d'alimentation QSPI2 est PA58 | Toutes les variantes | Obligatoire |
| 4 | Si une mémoire flash externe sur QSPI2 doit être programmée en production, son interrupteur d'alimentation doit être contrôlé par PA58 | Toutes les variantes | Obligatoire |
| 5 | <span class="flag-red">L'interrupteur d'alimentation contrôlé par PA58 est activé à l'état haut et désactivé à l'état bas</span> | Toutes les variantes | Obligatoire |
| 6 | <span class="flag-red">Des résistances série de 33 Ω sont recommandées sur les lignes CLK et de données de la mémoire flash</span> | Toutes les variantes | Obligatoire |
| 7 | QSPI3 est connecté à la mémoire NAND flash ou eMMC comme prévu | 555/557 uniquement | Optionnel |
| 8 | Le contrôle de l'interrupteur d'alimentation QSPI3 est PA41 ; <span class="flag-red">l'alimentation QSPI3 est désactivée par défaut, et un interrupteur actif à l'état haut doit utiliser le pull-down interne par défaut</span> | 555/557 uniquement | Optionnel |
| 9 | <span class="flag-red">Si PA41 ne commande pas l'interrupteur d'alimentation QSPI3, validez l'E/S de remplacement avec le logiciel</span> | 555/557 uniquement | Optionnel |
| 10 | Si une mémoire flash externe sur QSPI3 doit être programmée en production, son interrupteur d'alimentation doit être contrôlé par PA58 | 555/557 uniquement | Obligatoire |
| 11 | Le contrôle de l'interrupteur d'alimentation OPI PSRAM est PA70 ; <span class="flag-red">l'alimentation PSRAM est activée par défaut, et un interrupteur actif à l'état haut doit utiliser le pull-up interne par défaut</span> | 555/557 uniquement | Optionnel |
| 12 | <span class="flag-red">La mémoire OPI PSRAM est un modèle pris en charge et figure parmi les composants qualifiés dans le guide de sélection des composants clés</span> | 555/557 uniquement | Optionnel |
| 13 | Les connexions de signaux OPI PSRAM sont correctes | 555/557 uniquement | Optionnel |
| 14 | La connexion des signaux QSPI2 est correcte | Toutes les variantes | Optionnel |
| 15 | La connexion des signaux QSPI3 est correcte | Toutes les variantes | Optionnel |
| 16 | <span class="flag-yellow">Lors de l'utilisation du SF32LB555 ou du <span class="flag-red">SF32LB557, confirmez la mémoire requise par l'algorithme de mesure de la fréquence cardiaque ; si la mémoire disponible dans le LCPU est insuffisante, ajoutez une mémoire flash externe de 1 Mo sur QSPI4</span></span> | 555/557 uniquement | Obligatoire |
| 17 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |
| 18 | <span class="flag-red">La mémoire NOR flash figure parmi les composants qualifiés dans le guide de sélection des composants clés</span> | Toutes les variantes | Obligatoire |
| 19 | <span class="flag-red">La mémoire NAND flash figure parmi les composants qualifiés dans le guide de sélection des composants clés</span> | Toutes les variantes | Obligatoire |

</div>

### 5.8.12. Affichage { #5812-display }

<div align="center"><em>Tableau 5.8.12-1 : Liste de contrôle de l'affichage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Le SF32LB555xxxx connecte l'affichage via DSI + LCDC2 comme prévu | 555/557 uniquement | Obligatoire |
| 2 | <span class="flag-red">Le SF32LB551xxxx connecte l'affichage via LCDC1 comme prévu</span> | <span class="flag-red">551/SS6600A8 uniquement</span> | Obligatoire |
| 3 | Les connexions de signaux QSPI de LCDC1 sont correctes ; <span class="flag-red">des résistances série de 100 Ω sont recommandées sur les lignes CLK et de données</span> | Toutes les variantes | Obligatoire |
| 4 | Les connexions de signaux MCU8080 de LCDC1 sont correctes | Toutes les variantes | Obligatoire |
| 5 | Les connexions de signaux DSI sont correctes | 555/557 uniquement | Obligatoire |
| 6 | La connexion de signal QSPI de LCDC2 est correcte | 555/557 uniquement | Obligatoire |
| 7 | DSI_REXT est connecté à GND via une résistance de 10 kΩ | 555/557 uniquement | Obligatoire |
| 8 | La connexion RSTB du LCDC est correcte | Toutes les variantes | Obligatoire |
| 9 | La connexion TE du LCDC est correcte (se connecte au signal TE ou Fmark du panneau) | Toutes les variantes | Obligatoire |
| 10 | <span class="flag-red">LCD SPI, mode 3 fils : CS connecté à GPIO22 ou PA31 ou PB33, CLK connecté à GPIO23 ou PA20 ou PB32, DATA connecté à GPIO21 ou PA34 ou PB35 ; <br>mode 4 fils : CS connecté à GPIO22 ou PA31 ou PB33, CLK connecté à GPIO23 ou PA20 ou PB32, DATA connecté à GPIO21 ou PA34 ou PB35, DC connecté à GPIO20 ou PA36 ou PB36</span> | Toutes les variantes | Obligatoire |
| 11 | Les signaux TP suivent l'affectation de broches recommandée (référez-vous au fichier de configuration d'E/S de l'EVB) | Toutes les variantes | Obligatoire |
| 12 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |
| 13 | Si la conception doit prendre en charge un affichage permanent avec écran éteint (always-on), connectez l'interface QSPI du LCD aux broches PA du MCU ; les GPIO PB sont recommandés pour LCD_EN, LCD_RST et les signaux de contrôle similaires | <span class="flag-red">551/SS6600A8 uniquement</span> | Obligatoire |
| 14 | Si la conception doit prendre en charge un affichage permanent avec écran éteint (always-on), connectez l'interface QSPI du LCD aux broches PA du MCU ou reliez l'interface MIPI du LCD au MCU ; les GPIO PB sont recommandés pour LCD_EN, LCD_RST et les signaux de contrôle similaires | 555/557 uniquement | Obligatoire |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tableau 5.8.13-1 : Liste de contrôle du GPADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'entrée GPADC est connectée à la broche correspondante | Toutes les variantes | Optionnel |
| 2 | La plage d'entrée du GPADC est correcte ; la tension d'entrée maximale ne doit pas dépasser 1,0 V | Toutes les variantes | Optionnel |
| 3 | Recommandation de diviseur de tension de batterie : résistance de 1 MΩ 1 % côté alimentation, résistance de 220 kΩ 1 % vers la masse, et condensateur de filtrage de 100 nF | Toutes les variantes | Obligatoire |
| 4 | Pour chaque signal de diviseur résistif mesuré par le GPADC, utilisez des résistances de diviseur à tolérance de 1 % ; <span class="flag-red">chaque canal GPADC doit avoir un condensateur de filtrage de 100 nF placé près de la broche de la puce</span> | Toutes les variantes | Obligatoire |

</div>

Les sources divergent : le [guide d'application matérielle OpenSiFli, de priorité supérieure](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) décrit un GPADC 10 bits à cinq canaux, avec une plage d'entrée de 0–0,9 V. Le point 2 du [classeur source de la liste de contrôle V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) fixe un maximum de 1,0 V, sans préciser le nombre de canaux. La [fiche technique SF32LB55x V1.7.2, section 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) spécifie huit entrées asymétriques ou quatre paires différentielles, avec des plages respectives de 0–1,1 V et de −0,7 à 0,7 V ; son tableau de broches répertorie GPADC_CH0–CH7. Le [guide ADC actuel du SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) mappe également huit canaux (0–7) et indique 1,1 V comme tension d'échantillonnage maximale. SiFli n'a pas expliqué les différences de nombre de canaux et de limites de tension. Le point 2 de la liste conserve la valeur de 1,0 V du classeur ; dans l'attente d'une clarification écrite de SiFli, la conception doit toutefois respecter la plage de 0–0,9 V du guide prioritaire et limiter VADC à 0,9 V au maximum. Ne considérez ni 1,0 V ni 1,1 V comme une limite de conception approuvée, et confirmez les canaux disponibles pour la référence et le boîtier retenus.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tableau 5.8.14-1 : Liste de contrôle du SDMADC</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'entrée SDMADC est connectée à la broche correspondante | 555/557 uniquement | Optionnel |
| 2 | La plage d'entrée du SDMADC est correcte ; la tension d'entrée maximale ne devrait pas dépasser 1,2 V | 555/557 uniquement | Optionnel |
| 3 | Les connexions SDMADC_VREF et SDMADC_VSS_VREF sont correctes | 555/557 uniquement | Obligatoire |

</div>

### 5.8.15. Boutons { #5815-buttons }

<div align="center"><em>Tableau 5.8.15-1 : Liste de contrôle des boutons</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Confirmez avec le client si le bouton doit permettre le réveil | Toutes les variantes | Obligatoire |
| 2 | La connexion du bouton est correcte : pull-up présent, valeur de résistance correcte, et domaine de tension de pull-up correct | Toutes les variantes | Obligatoire |
| 3 | <span class="flag-red">Le bouton d'alimentation doit utiliser PB43, PB44, PB45, PB46, PB47 ou PB48</span> | Toutes les variantes | Obligatoire |
| 4 | Tous les signaux de bouton disposent d'une protection ESD | Toutes les variantes | Obligatoire |

</div>

### 5.8.16. Protection EOS et ESD { #5816-eos-and-esd-protection }

<div align="center"><em>Tableau 5.8.16-1 : Liste de contrôle de la protection EOS et ESD</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'interface de charge comporte des protections EOS, ESD et OVP | Toutes les variantes | Obligatoire |
| 2 | Le signal de détection d'insertion du chargeur dispose d'un composant ESD | Toutes les variantes | Obligatoire |
| 3 | L'interface de batterie dispose d'un composant ESD | Toutes les variantes | Obligatoire |
| 4 | L'interface d'antenne dispose d'un composant ESD | Toutes les variantes | Obligatoire |
| 5 | Les interfaces d'alimentation du LCD et du TP disposent de composants ESD | Toutes les variantes | Obligatoire |
| 6 | Les lignes I2C, RST et INT du TP disposent de composants ESD | Toutes les variantes | Obligatoire |
| 7 | L'interface d'alimentation et les lignes de signal du capteur de fréquence cardiaque disposent de composants ESD | Toutes les variantes | Obligatoire |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tableau 5.8.17-1 : Liste de contrôle I2C</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'affectation I2C tient compte du partitionnement HCPU/LCPU et de la nécessité pour le composant de fonctionner en mode basse consommation | Toutes les variantes | Obligatoire |
| 2 | Les résistances de pull-up I2C ont la valeur adaptée ; des résistances de 2,2 kΩ sont recommandées pour un fonctionnement à 400 kHz. Utilisez le domaine de tension du périphérique et coupez l'alimentation des pull-ups en même temps que celle du périphérique | Toutes les variantes | Obligatoire |
| 3 | Le signal d'interruption I2C prend en charge le réveil matériel lorsque nécessaire | Toutes les variantes | Obligatoire |
| 4 | Si plusieurs composants partagent un bus I2C, leurs adresses sont différenciées | Toutes les variantes | Obligatoire |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tableau 5.8.18-1 : Liste de contrôle I2S</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | I2S1 est uniquement en entrée ; le microphone est connecté à I2S1 comme prévu | Toutes les variantes | Optionnel |
| 2 | I2S2 prend en charge l'entrée et la sortie ; le décodeur audio ou codec est connecté à I2S2 comme prévu | Toutes les variantes | Optionnel |
| 3 | Les connexions de signaux I2S sont correctes | Toutes les variantes | Optionnel |
| 4 | La connexion I2S pour deux microphones est correcte | Toutes les variantes | Optionnel |
| 5 | La spécification du microphone est confirmée et prise en charge par la puce | Toutes les variantes | Optionnel |
| 6 | Si MCLK est requis, sa connexion est confirmée correcte | Toutes les variantes | Optionnel |
| 7 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les variantes | Optionnel |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>Tableau 5.8.19-1 : Liste de contrôle PDM</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion PDM est correcte | 555/557 uniquement | Optionnel |
| 2 | La connexion PDM à deux microphones est correcte | 555/557 uniquement | Optionnel |
| 3 | La spécification du microphone est confirmée et prise en charge par la puce | 555/557 uniquement | Optionnel |
| 4 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | 555/557 uniquement | Optionnel |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tableau 5.8.20-1 : Liste de contrôle SPI</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion SPI est correcte : <span class="flag-red">le SDO du MCU se connecte au SDI du périphérique, et le SDI du MCU se connecte au SDO du périphérique</span> | Toutes les variantes | Optionnel |
| 2 | Les exigences de minutage du périphérique SPI sont confirmées et prises en charge | Toutes les variantes | Optionnel |
| 3 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les variantes | Optionnel |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tableau 5.8.21-1 : Liste de contrôle USART</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | USART3 est conçu comme interface de téléchargement et de journalisation | Toutes les variantes | Obligatoire |
| 2 | <span class="flag-red">USART3 dispose de points de test et d'une résistance de pull-up si nécessaire ; une résistance série de 100 Ω est recommandée et peut être ajustée selon la conception réelle</span> | Toutes les variantes | Obligatoire |
| 3 | Les composants devant fonctionner sur le HCPU sont connectés à USART1 ou USART2 | Toutes les variantes | Optionnel |
| 4 | Les composants devant fonctionner sur le LCPU sont connectés à USART4 ou USART5 | Toutes les variantes | Optionnel |
| 5 | <span class="flag-red">Lors de la connexion à un périphérique, le RXD du MCU se connecte au TXD du périphérique et le TXD du MCU se connecte au RXD du périphérique</span> | Toutes les variantes | Obligatoire |
| 6 | Le niveau logique d'E/S du périphérique correspond à celui de la puce principale | Toutes les variantes | Obligatoire |
| 7 | Les points de test USART inutilisés sont réservés pour un usage de secours | Toutes les variantes | Optionnel |
| 8 | <span class="flag-red">Si UART1 se connecte à un composant, des points de test sont réservés</span> | Toutes les variantes | Obligatoire |
| 9 | <span class="flag-red">Si UART se connecte à un convertisseur UART-USB, RX et TX doivent pouvoir être déconnectés</span> | Toutes les variantes | Obligatoire |
| 10 | <span class="flag-red">Il est recommandé que l'UART connecté aux périphériques utilise l'interface HCPU afin d'éviter que le logiciel HCPU n'utilise une interface UART du LCPU</span> | Toutes les variantes | Obligatoire |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tableau 5.8.22-1 : Liste de contrôle PWM</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | L'affectation de la broche PWM de rétroéclairage est correcte ; utilisez un GPTIMx différent de celui du moteur, de préférence sur l'interface PB, afin d'éviter que la réduction de fréquence du HCPU n'affecte le rétroéclairage | Toutes les variantes | Optionnel |
| 2 | L'affectation de la broche PWM du moteur est correcte ; utilisez un GPTIMx différent de celui du rétroéclairage, de préférence sur l'interface PB, afin d'éviter que la réduction de fréquence du HCPU n'affecte la vibration | Toutes les variantes | Optionnel |
| 3 | Il est recommandé que la broche de contrôle PWM du moteur soit sur l'interface PB, de préférence PB24 ou PB25, afin d'éviter un comportement anormal pendant la programmation lorsqu'un moteur CMS est utilisé | Toutes les variantes | Optionnel |
| 4 | Les signaux nécessitant une sortie PWM doivent utiliser l'interface PB ; vérifiez également l'absence de comportement anormal au démarrage à froid | Toutes les variantes | Optionnel |

</div>

### 5.8.23. Débogage { #5823-debug }

<div align="center"><em>Tableau 5.8.23-1 : Liste de contrôle du débogage</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Les connexions de signaux SWD sont correctes | Toutes les variantes | Optionnel |
| 2 | La référence de tension d'E/S est correctement prévue sur le connecteur J-Link ou les points de test | Toutes les variantes | Optionnel |
| 3 | <span class="flag-yellow">Pour la programmation en production du SF32LB555x XXXX, en plus de PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33 et AVDD_BRF, AVDD_DSI doit également être alimenté</span> | 555/557 uniquement | Obligatoire |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tableau 5.8.24-1 : Liste de contrôle USB</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | La connexion de l'interface USB est correcte | Toutes les variantes | Optionnel |
| 2 | L'interface USB dispose d'une protection ESD | Toutes les variantes | Optionnel |
| 3 | En fonctionnement normal, hors mode veille, tant que l'USB reste actif, le PC ou l'appareil peut détecter les connexions et déconnexions ; <br>si cette détection doit rester possible lorsque le MCU est en veille, ajoutez un diviseur résistif sur VBUS. Sa sortie, à un niveau haut adapté à la tension d'E/S, doit être reliée à une broche de réveil du MCU ; il est recommandé de partager la broche de réveil utilisée pour détecter l'insertion du chargeur | Toutes les variantes | Optionnel |

</div>

### 5.8.25. Consommation électrique { #5825-power-consumption }

<div align="center"><em>Tableau 5.8.25-1 : Liste de contrôle de la consommation électrique</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | GPIO27 en QFN et PA01 en BGA ne sont pas recommandés comme entrées : le pull-down interne de 20 kΩ peut abaisser le niveau haut avec une résistance de pull-up élevée, ou provoquer une fuite excessive avec une résistance de pull-up faible | Toutes les variantes | Obligatoire |
| 2 | Si GPIO27 en QFN ou PA01 en BGA est utilisé comme sortie, confirmez que le circuit contrôlé est inactif par défaut lorsque l'E/S n'est pas pilotée. Réservez de préférence cette broche aux applications à courant élevé, car un niveau haut de 1,8 V entraîne une fuite d'environ 90 µA | Toutes les variantes | Obligatoire |
| 3 | Si PA01 et PA03 sont utilisées comme GPIO, gardez les deux niveaux d'E/S cohérents pendant le sommeil, ou placez au moins une broche en état de haute impédance sans pull-up ni pull-down | Toutes les variantes | Obligatoire |
| 4 | PA77, PA78, PA79, PA80 et PB43-PB48 sont dix broches de réveil. À l'état hors tension du mode Hibernate, elles passent en haute impédance et les PU/PD internes sont désactivés ; ajoutez un pull-up ou pull-down externe si un niveau fixe ne peut pas être garanti autrement | Toutes les variantes | Obligatoire |
| 5 | Si une broche PB de réveil sert à générer un signal de sortie, réservez un pull-up ou pull-down externe même lorsque Hibernate n'est pas utilisé | Toutes les variantes | Obligatoire |
| 6 | Pour toutes les broches d'activation des MOSFET, LDO et DCDC, assurez-vous que des résistances de pull-up ou pull-down par défaut maintiennent l'état marche/arrêt requis en mode Hibernate | Toutes les variantes | Obligatoire |
| 7 | Pour les signaux GPIO qui contrôlent une charge en pilotant un niveau haut, utilisez un pull-down de 1 MΩ lorsque cela n'affecte pas la fonction, afin de réduire la fuite | Toutes les variantes | Obligatoire |
| 8 | Lorsqu'une sortie GPIO PA doit rester haute pendant le sommeil, sélectionnez une broche PU | Toutes les variantes | Obligatoire |
| 9 | Lorsqu'une sortie GPIO PA doit rester basse pendant le sommeil, sélectionnez une broche PD | Toutes les variantes | Obligatoire |
| 10 | L'exigence de courant de référence en mode Hibernate est consignée | Toutes les variantes | Obligatoire |
| 11 | <span class="flag-red">La somme des courants de référence des périphériques sélectionnés en mode Hibernate est consignée et respecte les exigences du projet</span> | Toutes les variantes | Obligatoire |
| 12 | L'exigence de courant de référence en mode Standby est consignée | Toutes les variantes | Obligatoire |
| 13 | <span class="flag-red">La somme des courants de référence des périphériques sélectionnés en mode Standby est consignée et respecte les exigences du projet</span> | Toutes les variantes | Obligatoire |
| 14 | Pour les broches de réveil PB43-PB48 utilisées comme sorties, réservez un pull-up ou pull-down externe car les pulls internes sont désactivés en Standby | Toutes les variantes | Obligatoire |

</div>

### 5.8.26. Téléchargement hors ligne et étalonnage du quartz { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>Tableau 5.8.26-1 : Liste de contrôle du téléchargement hors ligne et de l'étalonnage du quartz</em></div>

<div align="center" markdown>

| N° | Point de contrôle | S'applique à | Catégorie |
|:---|:---|:---|:---|
| 1 | Si une carte de téléchargement hors ligne est requise pour programmer le firmware, réservez les points de test VBAT, GND, UART3_TXD, UART3_RXD, MODE et RESET | Toutes les variantes | Optionnel |
| 2 | Si un étalonnage du quartz est nécessaire, réservez PB08. S'il est connecté à un périphérique, il est préférable de l'utiliser en sortie et de ne connecter aucun condensateur externe | Toutes les variantes | Optionnel |

</div>
