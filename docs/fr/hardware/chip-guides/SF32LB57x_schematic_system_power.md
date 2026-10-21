---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directives de schéma du SF32LB57x pour système minimal et alimentation : famille d'alimentation, straps, arbre d'alimentation, charge/OVP, BUCK, rails basse consommation."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x — Système minimal et alimentation { #sf32lb57x-hardware-design-guide-minimum-system-power }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Les directives de conception du schéma sont réparties sur trois pages : celle-ci (sections 5.1 et 5.2 : système minimal et alimentation), [Horloge, RF et interfaces utilisateur](SF32LB57x_schematic_clock_rf_interfaces.md) (sections 5.3 à 5.5) et [Stockage et fabrication](SF32LB57x_schematic_storage_mfg.md) (sections 5.6 et 5.7). Consultez d'abord l'[aperçu du guide de conception matérielle SF32LB57x](SF32LB57x_hardware_design_guide.md) pour choisir le composant et connaître l'ensemble du processus de conception.

## 5. Directives de conception de schéma { #5-schematic-design-guidelines }

Ce chapitre suit l'ordre habituel de mise en service d'une carte. Commencez par concevoir le système minimal : sans cette base, la première carte risque de ne pas s'alimenter, de ne pas démarrer depuis le stockage, de ne pas permettre le téléchargement du firmware ou de ne pas être accessible pour le débogage. Vérifiez ensuite le système d'alimentation, la génération d'horloge, le chemin RF, l'affichage, l'audio, la caméra, les capteurs et les autres fonctions propres au produit.

<div align="center"><em>Tableau 5-1 : Plan des sections de schéma</em></div>

<div align="center" markdown>

| Groupe | Décisions principales | Éléments de validation de la conception |
|:---|:---|:---|
| Conception du système minimal | Correspondance boîtier et famille d'alimentation, straps de démarrage, support de démarrage, accès débogage/téléchargement | Schéma de système minimal correspondant, table de démarrage, points de test de débogage |
| Système d'alimentation | Famille d'alimentation, distribution des alimentations, charge/OVP, BUCK, rails basse consommation, modes de fonctionnement, comportement de réveil | Schéma de distribution des rails, revue OVP/charge, mesures des rails, budget de courant basse consommation |
| Génération d'horloge | Quartz principal 48 MHz, quartz RTC 32,768 kHz, hypothèses d'étalonnage du quartz | Vérification des spécifications des quartz, plan de placement, plan d'étalonnage |
| RF | Adaptation RF et chemin d'antenne | Plan d'impédance RF, captures d'écran d'adaptation et de disposition RF |
| Interfaces utilisateur | Affichage, tactile/rétroéclairage, audio, caméra, boutons, moteur | Schémas d'interface, séquencement d'alimentation, attributions de broches, plan de validation |
| Stockage et connectivité | Stockage, démarrage, GPIO, UART/I2C/SPI/SDIO/USB/CAN/GPADC | Tableau de démarrage, plan d'alimentation du stockage, attribution des bus, preuves de routage haute vitesse |
| Fabrication | Programmation de production, étalonnage, accès aux bancs de test et vérifications de fiabilité | Plan des points de test, plan du banc de test et de programmation |

</div>

### 5.1. Conception du système minimal { #51-minimum-system-design }

#### 5.1.1. Séquence de conception du système minimal { #511-minimum-system-design-sequence }

Les problèmes rencontrés lors de la mise en service proviennent souvent du système minimal, de la famille d'alimentation, du mode de démarrage, des résistances de pull-up du stockage, du choix du quartz, des composants BUCK ou d'un accès de téléchargement manquant. Définissez ces éléments avant d'affecter les broches aux périphériques du produit :

1. Faites correspondre le schéma de système minimal au boîtier et à la famille d'alimentation.
2. Réglez le comportement de démarrage et de débogage de `PA00` / `PA01` et réservez un accès de récupération.
3. Choisissez le support de démarrage et prévoyez les résistances de pull-up requises sur `PA13` / `PA15` / `PA17`.
4. Définissez l'architecture d'alimentation, le chemin de charge et d'OVP, l'inductance et les condensateurs BUCK ainsi que les états par défaut des rails ; terminez la revue détaillée à la section 5.2.
5. Choisissez les quartz de 48 MHz et de 32,768 kHz, puis confirmez le plan d'étalonnage à la section 5.3.
6. Prévoyez des points de test pour le DBG-UART, le SWD, le mode de démarrage, l'alimentation, la masse et le banc de test.

#### 5.1.2. Schémas de système minimal { #512-minimum-system-schematics }

Le SF32LB57x dispose de plusieurs variantes de schéma de système minimal. Utilisez celle qui correspond à la fois au boîtier et à la famille d'alimentation ; ne mélangez pas les variantes alimentées par batterie et alimentées en 3,3 V.

![Figure 5.1-1 : Système minimal alimenté par batterie QFN68L](../../sf32-products/chips/assets/57x/SF32LB57-UH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-1 : Système minimal alimenté par batterie QFN68L</em></div>

![Figure 5.1-2 : Système minimal alimenté en 3,3 V QFN68L](../../sf32-products/chips/assets/57x/SF32LB57-UL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-2 : Système minimal alimenté en 3,3 V QFN68L</em></div>

![Figure 5.1-3 : Système minimal alimenté par batterie QFN80L](../../sf32-products/chips/assets/57x/SF32LB57-YH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-3 : Système minimal alimenté par batterie QFN80L</em></div>

![Figure 5.1-4 : Système minimal alimenté en 3,3 V QFN80L](../../sf32-products/chips/assets/57x/SF32LB57-YL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-4 : Système minimal alimenté en 3,3 V QFN80L</em></div>

<!-- BGA-ONLY -->
![Figure 5.1-5 : Système minimal alimenté par batterie BGA112](../../sf32-products/chips/assets/57x/SF32LB57-VH-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-5 : Système minimal alimenté par batterie BGA112</em></div>

![Figure 5.1-6 : Système minimal alimenté en 3,3 V BGA112](../../sf32-products/chips/assets/57x/SF32LB57-VL-MHS-SCH.svg){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-6 : Système minimal alimenté en 3,3 V BGA112</em></div>
<!-- /BGA-ONLY -->

#### 5.1.3. Stockage de démarrage et configuration des straps { #513-boot-storage-and-strap-configuration }

Choisissez le support de démarrage avant de figer le schéma. La mémoire intégrée au boîtier peut déjà occuper un canal MPI et les supports externes ont des exigences différentes en matière de résistances de pull-up et de commande d'alimentation.

<div align="center"><em>Tableau 5.1-1 : Sélection du support de démarrage externe</em></div>

<div align="center" markdown>

| `Bootstrap[1]` (`PA13`) | `Bootstrap[0]` (`PA17`) | Support de démarrage externe |
|:------------------------|:------------------------|:--------------------|
| L | L | Flash SPI NOR |
| L | H | Flash SPI NAND |
| H | L | Flash SD NAND |
| H | H | eMMC |

</div>

<div align="center"><em>Tableau 5.1-2 : Résistances de pull-up requises selon le support de démarrage externe</em></div>

<div align="center" markdown>

| Support de démarrage | Résistances de pull-up requises |
|:-----------|:--------------------|
| Flash SPI NOR | Aucune résistance de pull-up externe n'est requise sur `PA13` / `PA17`. |
| Flash SPI NAND | Une résistance de pull-up de 7,5 kΩ est requise sur `PA17` ; aucune n'est requise sur `PA13`. |
| Flash SD NAND | Des résistances de pull-up de 7,5 kΩ sont requises sur `PA13` et `PA15` ; aucune n'est requise sur `PA17`. |
| eMMC | Des résistances de pull-up de 7,5 kΩ sont requises sur `PA13`, `PA15` et `PA17`. |

</div>

![Figure 5.1-7 : Circuit recommandé de la broche bootstrap](../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-7 : Circuit recommandé de la broche bootstrap</em></div>

L'alimentation du support de démarrage dépend de son type et de la famille d'alimentation. Dans les variantes alimentées par batterie, la Flash NOR externe est alimentée par `VDD33_VOUT1` ; la Flash SPI NAND externe nécessite un interrupteur de charge en aval de `VDD33_VOUT1` ; la Flash SD NAND externe et l'eMMC utilisent un LDO externe. Dans les variantes alimentées en 3,3 V, tous les supports de démarrage externes doivent utiliser un LDO externe. SiFli recommande `PA21` comme signal d'activation du commutateur d'alimentation du support externe : un niveau haut active le rail et un niveau bas le désactive. Si `PA21` n'est pas exposée sur une variante alimentée par batterie, le guide source autorise à utiliser à la place un GPIO avec pull-up par défaut. Vérifiez que le rail du support est disponible au démarrage. Si le stockage intégré au boîtier occupe déjà MPI3, l'utilisation externe de MPI3 est limitée à SD NAND ou eMMC ; ne connectez pas de Flash SPI NOR/SPI NAND externe à ce canal.

#### 5.1.4. Accès de débogage et de téléchargement { #514-debug-and-download-access }

Réservez l'accès au débogage et à la récupération avant d'attribuer les E/S du produit. De nombreuses défaillances de la première carte deviennent difficiles à récupérer si le DBG-UART par défaut, les straps de démarrage ou le chemin SWD ne sont pas accessibles.

<div align="center"><em>Tableau 5.1-3 : Points de test de débogage et de téléchargement recommandés</em></div>

<div align="center" markdown>

| Point de test | Recommandation | Objectif |
|:-----------|:---------------|:--------|
| Entrée d'alimentation | `VBAT` ou 3,3 V, plus `VSYS` / `VDD33_VOUT1` si nécessaire | Alimentation du banc de test, mesure du courant et validation basse consommation. |
| GND | Plusieurs points de test de masse | Chemin de retour pour le téléchargement, le débogage, l'étalonnage et le test de courant. |
| DBG-UART | `PA18` / `PA19`, correspondant à `DBG_UART_RXD` / `DBG_UART_TXD` | Téléchargement par défaut, journaux et programmation de production. |
| SWD | `PA43` / `PA44` ou les broches SWDIO/SWCLK définies par le numéro de pièce | Débogage et analyse de défaillance. |
| Mode de démarrage | `PA00` ou la broche de sélection de mode de démarrage définie par le numéro de pièce | Entrer en mode téléchargement ou récupération. |
| Commutateur SWD | `PA01` ou la broche de configuration correspondante | Utilisé lorsque l'emplacement de la broche SWD doit être commuté. |
| Touche d'alimentation / réveil | `PA34` ou la broche de touche correspondante | Essais de mise sous tension, de réinitialisation et de réveil sur le banc de test. |

</div>

<div align="center"><em>Tableau 5.1-4 : Connexions par défaut du port de débogage</em></div>

<div align="center" markdown>

| Signal de débogage | Broche | Nom de net |
|:-------------|:----|:---------|
| `DBG_UART_RXD` | `PA18` | `USART1_RXD` |
| `DBG_UART_TXD` | `PA19` | `USART1_TXD` |
| `SWD_CLK` | `PA43` | `SWCLK` |
| `SWD_DIO` | `PA44` | `SWDIO` |

</div>

!!! warning
    Les points de test de production doivent inclure à la fois `DBG_UART_RXD` et `DBG_UART_TXD`. Ne réservez pas accidentellement RXD deux fois.

`PA18`/`PA19` sont les broches DBG-UART par défaut et `PA43`/`PA44` les broches SWD par défaut ; le SWD peut également être basculé sur `PA18`/`PA19`. La puce prend en charge quatre interfaces de téléchargement : DBG-UART, SWD, UART standard et USB. Le démarrage normal ne prend en charge que DBG-UART et SWD ; le mode BOOT peut activer les quatre interfaces. Le mode BOOT et la commutation des broches SWD dépendent de `PA00`, du registre BOOT, de `PA01` et du commutateur BOOT de l'hôte. Pour concevoir la programmation de production et la récupération, consultez le tableau complet des modes dans la source ; ne déduisez pas l'interface de téléchargement d'un seul état de broche.

### 5.2. Système d'alimentation { #52-power-system }

#### 5.2.1. Planification de la distribution des alimentations { #521-power-tree-planning }

Établissez le schéma de distribution des alimentations avant de saisir le schéma électronique. Pour chaque rail, indiquez la source, l'état par défaut, la charge maximale, l'état en veille et le GPIO de commande.

<div align="center"><em>Tableau 5.2-1 : Référence rapide de planification des rails d'alimentation</em></div>

<div align="center" markdown>

| Catégorie de rail | Priorité de planification |
|:--------------|:---------------|
| Rails toujours actifs | Gardez uniquement le RTC, le réveil, la détection requise et les circuits de rétention Bluetooth. Calculez le courant statique élément par élément. |
| Rails périphériques commutables | Préférez les commutateurs de charge ou les LDO commutables pour l'affichage, le rétroéclairage, les capteurs, le moteur, le stockage externe et la caméra. |
| Rails analogique/RF/audio | Filtrez séparément, gardez les boucles courtes et isolez des zones numériques à fort courant et haute vitesse. |
| Rail du support de démarrage | L'état par défaut doit prendre en charge le démarrage, tandis que l'état de veille doit empêcher l'alimentation en retour et les fuites. |
| Alimentation des résistances de pull-up | Alimentez les résistances de pull-up de l'I2C, des touches, des interruptions de capteur et des autres signaux conformément à la stratégie d'alimentation du périphérique correspondant. |

</div>

#### 5.2.2. Variantes alimentées par batterie { #522-battery-powered-variants }

Les variantes alimentées par batterie utilisent couramment `VBUS`, `VBAT`, `VCC`, `VSYS`, `BUCK_LX`, `BUCK_FB`, les sorties LDO internes, les broches d'alimentation audio et les broches d'alimentation RF.

Exigences clés :

- Gardez `VBUS` dans la plage d'entrée autorisée et ajoutez une protection OVP.
- Connectez `VBAT` à la batterie et utilisez-la pour la détection de tension de batterie.
- Traitez `VCC` comme l'entrée principale du système. Utilisez une largeur de piste suffisante et placez les condensateurs de découplage près de la puce.
- Utilisez `VSYS` uniquement pour les charges internes spécifiées, `AVDD_BRF` et les circuits de pull-up GPIO ; ne l'utilisez pas pour alimenter des périphériques externes.
- Utilisez `VDD33_VOUT1`, `VDD33_VOUT2` et les autres sorties de régulateurs internes uniquement pour les charges explicitement autorisées. La source SiFli présente une divergence : le texte et le schéma basse consommation montrent des capteurs externes alimentés par `VDD33_VOUT1`, tandis que la liste de contrôle d'alimentation du même guide limite cette sortie aux Flash NOR/NAND intégrées au boîtier ou externes et à `AVDD33_AUD` et interdit les autres périphériques. Dans l'attente d'une clarification de SiFli, ne connectez pas de capteurs à `VDD33_VOUT1`.
- Alimentez `AVDD_BRF` et `AVDD33_AUD` depuis les rails recommandés, avec un filtrage local.

#### 5.2.3. Variantes alimentées en 3,3 V { #523-33-v-supply-variants }

Les variantes 3,3 V utilisent typiquement un rail externe de 3,3 V pour `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD`, `VDDIOA` et les domaines associés.

Exigences clés :

- Utilisez une distribution en étoile pour les domaines 3,3 V importants.
- Filtrez les alimentations analogique, RF et audio séparément des chemins numériques à fort courant ou haute vitesse.
- Si `VBATS` est utilisé pour la détection de batterie, vérifiez la plage d'entrée et le filtrage.
- Dans les variantes alimentées en 3,3 V, alimentez tous les supports de démarrage externes depuis un LDO externe ; `PA21` est le signal d'activation recommandé.
- Les références internes et les broches de sortie LDO internes ne devraient être connectées qu'aux condensateurs externes requis. Ne les pilotez pas depuis une source de tension externe.

#### 5.2.4. Référence rapide des condensateurs d'alimentation et de leur usage { #524-power-capacitor-and-usage-quick-reference }

Utilisez ce tableau pour la pré-revue de schéma. Les valeurs finales doivent toujours être vérifiées par rapport à la fiche technique et à la conception de référence.

<div align="center"><em>Tableau 5.2-2 : Référence rapide des condensateurs d'alimentation et de leur usage</em></div>

<div align="center" markdown>

| Rail / Broche | Condensateur externe typique | Usage principal | Remarques de conception |
|:-----------|:---------------------------|:---------|:-------------|
| `VBUS` | >= 10 µF | Entrée USB / chargeur | Variantes alimentées par batterie uniquement ; ajoutez une protection OVP/ESD/EOS. |
| `VBAT` | >= 4,7 µF | Connexion batterie et détection de tension de batterie | Gardez le chemin de batterie court et large ; évitez le routage parallèle avec des pistes sensibles. |
| `VCC` / `PVDD` | >= 10 µF | Entrée PMU / système principale | Placez le découplage près de la puce et dimensionnez la piste pour le courant. |
| `VSYS` | Environ 2,2 µF | Alimentation interne ou analogique/RF spécifiée | Ne l'utilisez pas comme alimentation périphérique générale ; contrôlez la charge totale et la capacité. |
| `VDD33_VOUT1` | 2,2 µF / 6,3 V | Uniquement la Flash intégrée au boîtier, la Flash NOR/NAND externe et `AVDD33_AUD` | Ne l'utilisez pas pour les capteurs de fréquence cardiaque ni pour d'autres périphériques courants ; pendant le démarrage progressif, le courant de charge doit rester dans la limite autorisée par la source. |
| `VDD33_VOUT2` | Environ 2,2 µF | Affichage, moteur, ou charges commutables spécifiées | L'état par défaut et le courant d'appel doivent correspondre à la configuration du firmware. |
| `VDD18_VOUT` | Utilisez le schéma de système minimal sélectionné | Alimentation 1,8 V pour la PSRAM interne ou intégrée au boîtier | Ne l'utilisez pas pour alimenter des périphériques externes en 1,8 V. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 µF / 6,3 V chacun | Sorties LDO internes | Alimentations internes uniquement ; n'alimentez pas de périphériques externes. |
| `VDD_RET` / `VDD_RTC` | 0,47 µF / 6,3 V pour `VDD_RET` ; 1 µF / 6,3 V pour `VDD_RTC` | Alimentations internes de rétention et RTC | Placez les condensateurs près des broches. |
| `AVDD_BRF` | Environ 4,7 µF | Alimentation analogique RF | Placez le condensateur près de la puce avec une mise à la masse courte multi-vias. |
| `AVDD33_AUD` | Environ 2,2 µF | Alimentation analogique audio | Gardez à l'écart du DC/DC, du RF, de l'USB, du SDIO et des horloges d'affichage. |
| `MIC_BIAS` | 1 µF / 6,3 V | Polarisation du microphone | À n'utiliser que comme polarisation du microphone. |
| `AUD_VREF` / `GPADC_VREF` | 1 µF pour `AUD_VREF` ; 4,7 µF pour `GPADC_VREF` | Référence interne | Condensateur uniquement ; ne jamais piloter en externe. |

</div>

#### 5.2.5. Inductance BUCK et rétroaction { #525-buck-inductor-and-feedback }

Paramètres recommandés de l'inductance BUCK :

<div align="center"><em>Tableau 5.2-3 : Paramètres recommandés de l'inductance BUCK</em></div>

<div align="center" markdown>

| Paramètre | Valeur recommandée |
|:----------|:------------------|
| Inductance | 4,7 µH ±20 % |
| DCR | <= 0,4 ohm |
| Courant de saturation | >= 450 mA |

</div>

Exigences PCB :

- Placez l'inductance, le condensateur de sortie et le condensateur de rétroaction près de la puce.
- Gardez la boucle `BUCK_LX` courte et large. Évitez les remplissages de cuivre et les pistes sensibles dans cette zone.
- Gardez la piste `BUCK_FB` raisonnablement large ; 0,25 mm ou plus est recommandé.
- Gardez un plan de masse de référence continu près de l'inductance et évitez de coupler du bruit aux pistes du quartz, RF, audio et GPADC.
- Si le produit contient des circuits sensibles tels que le GPS, la mesure de la fréquence cardiaque, l'ECG ou des microphones analogiques, prévoyez des empreintes facultatives pour les composants de filtrage CEM près de la zone BUCK_LX. Déterminez les valeurs finales lors de la validation CEM du système.

#### 5.2.6. Charge et OVP { #526-charging-and-ovp }

Les produits sur batterie peuvent utiliser un circuit de charge externe ou la fonction de charge intégrée.

<div align="center"><em>Tableau 5.2-4 : Comparaison des options de charge</em></div>

<div align="center" markdown>

| Option | Chemin d'alimentation | Remarques de conception |
|:-------|:------------|:-------------|
| Chargeur externe sans PPM | La batterie alimente directement les broches `VBAT` et `VCC` de la puce. | Le canal GPADC de la puce sur `VBAT` mesure la tension de la batterie avec une précision d'échantillonnage de ±30 mV. |
| Chargeur externe avec PPM | `VSYS` du chargeur alimente `VCC` de la puce ; `VBAT` du chargeur est relié à la fois à la batterie et à `VBAT` de la puce. | Le canal GPADC de la puce sur `VBAT` mesure la tension de la batterie avec une précision d'échantillonnage de ±30 mV. |
| Chargeur intégré | Utilise le bloc de gestion de charge intégré à la puce. | Si une batterie faible a arrêté le système, elle doit d'abord atteindre la tension de démarrage pour que le système puisse démarrer et afficher l'écran de charge. La liste de contrôle SiFli prévoit que le logiciel allume l'écran lorsque la batterie atteint environ 3,6 V. |

</div>

Directives OVP :

- `VBUS` ne doit jamais dépasser la plage d'entrée autorisée.
- Pour une OVP à seuil OVLO réglable, SiFli cite l'AW32905FCR comme référence. Le texte d'application indique 5,2–5,5 V, tandis que la liste de contrôle indique 5,15–5,55 V. Dans l'attente d'une clarification de SiFli, retenez leur plage commune de 5,2–5,5 V. Intégrez les tolérances du composant et du diviseur dans `V_IN_OVLO = ((R1 + R2) / R2) × V_OVLO_TH` ; maintenez l'erreur de `V_OVLO_TH` à 3 % maximum et utilisez des résistances R1/R2 à 1 %.
- Pour une OVP à sortie régulée, SiFli cite les références SGM4064YDE8G et LP5305AQVF. Le texte d'application indique 4,5–5,4 V, tandis que la liste de contrôle indique 4,7–5,4 V. Dans l'attente d'une clarification, utilisez la plage la plus étroite de 4,7–5,4 V, avec une capacité de charge d'au moins 0,5 A et un seuil de surintensité d'au moins 0,7 A.
- Acheminez l'entrée du chargeur à travers une protection TVS/OVP avant qu'elle n'atteigne la puce.

!!! warning "Écart sur la plage de tension d'entrée"
    Le tableau des broches d'alimentation et la liste de contrôle indiquent une plage d'entrée `VBUS` de 4,6–5,5 V, tandis que le texte de sélection OVP indique 4,5–5,5 V. Dans l'attente d'une clarification de SiFli, retenez 4,6 V comme tension minimale de fonctionnement.

#### 5.2.7. Stratégie d'alimentation basse consommation { #527-low-power-supply-strategy }

Le comportement basse consommation doit être conçu dans le schéma.

Recommandations :

- Utilisez des commutateurs de charge ou des LDO commutables pour l'affichage, le rétroéclairage, les capteurs, le moteur et le stockage externe.
- Choisissez des composants de gestion d'alimentation dont l'entrée EN est active à l'état haut. Si la sortie doit être désactivée par défaut, reliez EN à la masse par une résistance de pull-down de 1 MΩ à 5,1 MΩ ; choisissez sa valeur selon l'objectif de basse consommation du produit.
- Pour un interrupteur d'alimentation à MOSFET, utilisez la topologie PMOS + NMOS recommandée dans la source : l'état haut sur la commande active l'alimentation et l'état bas la coupe. Reliez cette commande à la masse par une résistance fixe de pull-down de 1 MΩ.
- Alimentez les résistances de pull-up du bus I2C depuis le même rail que le périphérique correspondant afin d'éviter les courants de fuite en veille.
- Choisissez des composants à faible Iq et à faible courant d'arrêt pour les circuits toujours actifs.
- Si `VSYS` ou un LDO toujours actif alimente les résistances de pull-up GPIO, incluez le courant correspondant dans le budget de veille.

#### 5.2.8. Figures de référence d'alimentation et de charge { #528-power-and-charging-reference-figures }

Les schémas de référence et les exemples d'implantation du PCB du SF32LB57x couvrent la distribution des alimentations, la séquence POR, le chemin de charge, le choix de l'OVP et la stratégie de commutation des charges en basse consommation. Pour les variantes alimentées par batterie, choisissez un LDO intégré, un interrupteur de charge placé en aval du LDO ou un LDO externe selon le support de démarrage. Pour les variantes alimentées en 3,3 V, utilisez un LDO externe pour tous les supports de démarrage externes. Suivez les schémas de référence pour la protection EOS/ESD et OVP de VBUS ainsi que pour le raccordement de la thermistance NTC de la batterie. Examinez séparément les exemples sur batterie et ceux alimentés en 3,3 V afin de ne pas confondre les deux familles d'alimentation.

La rampe d'alimentation doit également respecter la plage de temps de montée VDD indiquée dans les figures de référence : `1 < tVR < 500000 μs/V`. Pour les variantes alimentées en 3,3 V, respectez la relation illustrée entre les rampes PVDD et VDDIO ; VDDIO peut être mis sous tension en même temps que PVDD.

Figures de référence alimentées par batterie :

![Figure 5.2-1 : Chronogramme de mise sous tension de la variante alimentée par batterie](../../sf32-products/chips/assets/57x/SF32LB57x-POR-VBAT.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-1 : Chronogramme de mise sous tension de la variante alimentée par batterie</em></div>

![Figure 5.2-2 : Structure d'alimentation du système alimenté par batterie](../../sf32-products/chips/assets/57x/SF32LB57x-H-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-2 : Structure d'alimentation du système alimenté par batterie</em></div>

Figures de référence alimentées en 3,3 V :

![Figure 5.2-3 : Chronogramme de mise sous tension de la variante alimentée en 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-POR-3V3.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-3 : Chronogramme de mise sous tension de la variante alimentée en 3,3 V</em></div>

![Figure 5.2-4 : Structure d'alimentation du système alimenté en 3,3 V](../../sf32-products/chips/assets/57x/SF32LB57x-L-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-4 : Structure d'alimentation du système alimenté en 3,3 V</em></div>

Figures de référence de charge et OVP :

![Figure 5.2-5 : Chargeur externe sans PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-NPPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-5 : Chargeur externe sans PPM</em></div>

![Figure 5.2-6 : Chargeur externe avec PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-PPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-6 : Chargeur externe avec PPM</em></div>

![Figure 5.2-7 : Circuit de référence du chargeur intégré](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-INNER.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-7 : Circuit de référence du chargeur intégré</em></div>

![Figure 5.2-8 : Application OVP à OVLO ajustable](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-OVLO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-8 : Application OVP à OVLO ajustable</em></div>

![Figure 5.2-9 : Application OVP à sortie régulée](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-REGU.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.2-9 : Application OVP à sortie régulée</em></div>

#### 5.2.9. Contraintes électriques par boîtier et famille d'alimentation { #529-package-and-power-family-electrical-constraints }

Les exigences d'alimentation du SF32LB57x diffèrent selon le boîtier et la famille d'alimentation. Les différences à vérifier impérativement sont consolidées ci-dessous ; les schémas finaux doivent toujours être examinés par rapport au schéma de système minimal et à la fiche technique du boîtier sélectionné.

<div align="center"><em>Tableau 5.2-5 : Différences clés par famille d'alimentation</em></div>

<div align="center" markdown>

| Élément de conception | Variantes alimentées par batterie | Variantes alimentées en 3,3 V |
|:------------|:-------------------------|:----------------------|
| Entrée d'alimentation principale | Le tableau des broches et la liste de contrôle indiquent une plage `VBUS` de 4,6 à 5,5 V. La plage `VBAT` est de 3,45 à 4,7 V ; la liste de contrôle spécifie des batteries de tension nominale comprise entre 4,2 et 4,45 V. La plage de fonctionnement de `VCC` est de 3,45 à 4,7 V, avec un seuil de démarrage matériel de 3,45 V et un seuil d'arrêt matériel de 2,7 V. Le seuil logiciel par défaut de batterie faible est de 3,48 V ; pour une alimentation de laboratoire à tension constante, utilisez 3,6 à 4,7 V, avec 3,8 V recommandé. | `PVDD` / `PVDD_PMU` : 2,97 à 3,63 V ; `VBATS` sert uniquement à mesurer la tension de la batterie. |
| Alimentations analogiques et RF | `AVDD_BRF` est alimentée par `VSYS` ; `AVDD33_AUD` est alimentée par `VDD33_VOUT1`. | `AVDD33` / `AVDD33_ANA`, `AVDD_BRF`, `AVDD33_AUD` et `VDDIOA` sont alimentées par une source externe de 3,3 V et devraient être routées en étoile. |
| Sorties LDO internes | `VDD_VOUT1`, `VDD_VOUT2`, `VDD_RET`, `VDD_RTC` et `VDD18_VOUT` sont des alimentations internes et ne devraient pas alimenter de périphériques externes courants. | Même règle ; `VDD18_VOUT` alimente uniquement la PSRAM interne ou intégrée au boîtier, pas les périphériques externes en 1,8 V. |
| `VDD33_VOUT1` | 3,3 V, 150 mA après démarrage, activé par défaut ; pendant le démarrage progressif, le courant de charge ne doit pas dépasser 30 mA, faute de quoi le LDO risque de ne pas démarrer correctement. La liste de contrôle d'alimentation n'autorise que la Flash NOR/NAND intégrée au boîtier ou externe et `AVDD33_AUD` et interdit les autres périphériques. | Non applicable. |
| `VDD33_VOUT2` | 3,3 V, 150 mA, désactivé par défaut et activé par logiciel ; le courant de charge ne doit pas dépasser 30 mA pendant le démarrage progressif. La liste de contrôle SiFli indique que le logiciel peut désactiver cette limitation de courant de démarrage ; dans ce cas, vérifiez que le courant d'appel du périphérique reste compatible avec les conditions d'alimentation recommandées. | Non applicable. |
| `VDDIOSB` / `VDDIOSA` | QFN80L<!-- BGA-ONLY --> expose `VDDIOSB`, dont la tension dépend du composant MPI intégré : 1,8 V pour la PSRAM ou 3,3 V pour la Flash NOR. BGA112<!-- /BGA-ONLY --> expose aussi `VDDIOSA`, fixé à 1,8 V et alimenté par `VDD18_VOUT` ; la tension de `VDDIOSB` dépend du composant intégré (1,8 V pour la PSRAM, 3,3 V pour la Flash NOR). Vérifiez le numéro de pièce exact. | Identique ; confirmez selon le numéro de pièce commandable exact. |

</div>

!!! warning "Divergence de la source sur les charges de VDD33_VOUT1"
    Le schéma de distribution de l'alimentation du guide SiFli associe certaines charges de capteurs à `VDD33_VOUT1`, mais la liste de contrôle d'alimentation du même guide réserve explicitement cette sortie aux Flash NOR/NAND et à `AVDD33_AUD` et interdit les autres périphériques. Dans l'attente d'une clarification de SiFli, suivez la liste de contrôle, plus restrictive, et n'alimentez ni capteurs ni autres périphériques depuis ce rail.

!!! warning "Divergence de la tension minimale PVDD dans la source"
    La liste de contrôle du schéma indique une plage `PVDD` de 2,93 à 3,63 V, tandis que le tableau de référence des familles d'alimentation ci-dessus indique 2,97 à 3,63 V. Les documents source ne résolvent pas cet écart. Dans l'attente d'une clarification de SiFli, utilisez 2,97 V comme seuil inférieur provisoire le plus restrictif pour la revue de conception et confirmez les caractéristiques électriques du numéro de pièce exact.

!!! warning "Divergence sur la plage d'entrée de VBATS"
    Les tableaux des broches des variantes alimentées en 3,3 V indiquent pour `VBATS` une plage de 0 à 4,7 V, tandis que la liste de contrôle limite la mesure de la batterie à 0–4,5 V. Dans l'attente d'une clarification de SiFli, ne dépassez pas 4,5 V sur `VBATS` pour ces variantes.

<div align="center"><em>Tableau 5.2-6 : Condensateurs clés et limites de charge</em></div>

<div align="center" markdown>

| Rail / Broche | Exigence de source |
|:-----------|:------------------------|
| `VBUS` | Les variantes alimentées par batterie nécessitent au moins 10 µF / 10 V lorsque le chargeur intégré est utilisé. |
| `VBAT` | Au moins 4,7 µF / 10 V ; la tension de batterie est détectée par un canal GPADC interne. |
| `VCC` / `PVDD` | `VCC` nécessite au moins 10 µF / 10 V ; `PVDD` nécessite au moins 10 µF / 6,3 V. |
| `BUCK_FB` | 4,7 µF, placé entre l'inductance et la broche de la puce. |
| `VSYS` | 2,2 µF / 6,3 V ; la capacité totale sur ce domaine ne doit pas dépasser 9,6 µF et le rail ne doit alimenter que les charges internes/analogiques/RF spécifiées. |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 2,2 µF / 6,3 V chacun ; la capacité totale sur chaque domaine ne doit pas dépasser 9,6 µF. |
| `VDD_VOUT1` / `VDD_VOUT2` | 4,7 µF / 6,3 V chacun. |
| `VDD_RET` / `VDD_RTC` | `VDD_RET` utilise 0,47 µF / 6,3 V ; `VDD_RTC` utilise 1 µF / 6,3 V. |
| `AVDD_BRF` / `AVDD33_AUD` | `AVDD_BRF` utilise 4,7 µF / 6,3 V ; `AVDD33_AUD` utilise 2,2 µF / 6,3 V. |
| `VDDIOA` / `VBATS` / `AVDD33_ANA` | Variantes alimentées en 3,3 V uniquement : `VDDIOA` utilise 4,7 µF / 6,3 V, `VBATS` utilise 0,1 µF / 10 V, `AVDD33_ANA` utilise 1 µF / 6,3 V. |
| `AUD_VREF` / `GPADC_VREF` | Condensateur uniquement ; ne pas piloter en externe. Les valeurs typiques sont 1 µF pour `AUD_VREF` et 4,7 µF pour `GPADC_VREF`. |
| `MIC_BIAS` | 1 µF / 6,3 V, à utiliser uniquement comme polarisation du microphone. |

</div>

<div align="center"><em>Tableau 5.2-7 : Éléments à vérifier impérativement pour la charge et l'OVP</em></div>

<div align="center" markdown>

| Élément | Exigence |
|:-----|:------------|
| Cas d'utilisation du chargeur intégré | À n'utiliser que lorsque le produit peut attendre que la batterie atteigne environ 3,6 V avant que le firmware n'alimente l'affichage. |
| Exigence d'allumage immédiat de l'écran | Si le produit doit allumer l'affichage immédiatement après l'insertion du chargeur, utilisez un chargeur externe avec gestion du chemin d'alimentation PPM. |
| Spécification de batterie | La charge `VBAT` prend en charge des batteries de tension nominale 4,2 V à 4,45 V ; la pré-charge est d'environ 40 mA et le courant de charge maximal est 1C jusqu'à 400 mA. |
| OVP à OVLO ajustable | Le texte de conception indique 5,2–5,5 V, tandis que la liste de contrôle indique 5,15–5,55 V ; leur plage commune est de 5,2–5,5 V. Utilisez des résistances de diviseur à 1 % et gardez l'erreur du seuil OVLO en dessous de 3 %. Dans l'attente d'une clarification de SiFli, retenez cette plage commune. |
| OVP à sortie régulée | Une OVP à sortie LDO est recommandée ; la sortie devrait être de 4,7 V à 5,4 V, avec une capacité de charge d'au moins 0,5 A et un seuil OCP d'au moins 0,7 A. |
| Chargeur intégré non utilisé | `VBUS` peut être laissée flottante et son condensateur peut être omis ; dans ce cas `VBAT` ne fournit pas de puissance de sortie. |

</div>


#### 5.2.10. Modes de fonctionnement et sources de réveil { #5210-operating-modes-and-wake-sources }

Les modes de fonctionnement et les sources de réveil font partie de la revue de l'alimentation : ils déterminent les rails actifs, les résistances de pull-up, les charges externes et les GPIO capables de réveil dans chaque état basse consommation.

#### 5.2.11. Modes d'alimentation { #5211-power-modes }

La famille SF32LB57x fournit dix sources d'interruption capables de réveiller le composant depuis les modes Standby et Hibernate ; leur correspondance est présentée dans le tableau suivant.

<div align="center"><em>Tableau 5.2-8 : Comparaison des modes d'alimentation</em></div>

<div align="center" markdown>

| Mode | CPU | Périphériques | SRAM | E/S | LPTIM | Sources de réveil typiques | Temps de réveil typique |
|:-----|:----|:------------|:-----|:---|:------|:---------------------|:------------------|
| Active | En fonctionnement | En fonctionnement | Accessible | Commute | En fonctionnement | - | - |
| Sleep | Arrêté | En fonctionnement | Accessible | Commute | En fonctionnement | Toute interruption | < 0,5 µs |
| DeepSleep | Arrêté | Arrêté | Conservée, inaccessible | Niveau maintenu | En fonctionnement | RTC, E/S de réveil, GPIO, LPTIM, Bluetooth | ~250 µs |
| Standby | Réinitialisé | Réinitialisé | Conservée, inaccessible | Niveau maintenu | En fonctionnement | RTC, E/S de réveil, LPTIM, Bluetooth | ~1 ms |
| Hibernate | Réinitialisé | Réinitialisé | Non conservée | Haute impédance | Réinitialisé | RTC, E/S de réveil | > 2 ms |

</div>

#### 5.2.12. Conception du réveil { #5212-wake-design }

- Connectez les touches, interruptions tactiles et interruptions de capteur nécessitant une capacité de réveil à des GPIO capables de réveil.
- Planifiez les signaux de réveil matériel externe de préférence dans la plage `PA33` à `PA42` et étiquetez la fonction de réveil dans le schéma.
- Vérifiez en Standby et Hibernate l'état de maintien des E/S, la haute impédance, les résistances de pull-up et de pull-down ainsi que l'alimentation des périphériques.
- Le réveil par branchement USB nécessite un diviseur VBUS connecté à un GPIO capable de réveil avec la tension d'E/S correcte.
- Le comportement de réveil Bluetooth, RTC et externe doit être examiné avec la politique basse consommation du firmware.

#### 5.2.13. Validation basse consommation { #5213-low-power-validation }

Pendant l'EVT, mesurez au moins ces états :

<div align="center"><em>Tableau 5.2-9 : États et objectifs de validation basse consommation</em></div>

<div align="center" markdown>

| État | Objectif de mesure |
|:------|:-----------------|
| Arrêt / mode expédition | Confirmez le courant de fuite du système à l'état arrêté lors d'un stockage prolongé et vérifiez l'absence d'alimentation en retour depuis les périphériques. |
| Hibernate | Confirmez le courant système minimal lorsque la SRAM n'est pas conservée. |
| Standby | Confirmez le maintien d'E/S, les sources RTC/réveil et la politique de réveil Bluetooth. |
| DeepSleep | Confirmez le courant de base pour les scénarios courants de veille connectée. |
| Écran allumé au repos | Confirmez le courant combiné de l'affichage, du rétroéclairage, du tactile, des capteurs et du Bluetooth. |
| Charge | Confirmez VBUS, VBAT, le comportement thermique, l'OVP et le chemin d'alimentation système. |

</div>

<div align="center"><em>Tableau 5.2-10 : Broches de réveil externe Standby/Hibernate</em></div>

<div align="center" markdown>

| Source de réveil | Broche |
|:------------|:----|
| `WKUP_PIN0` | `PA33` |
| `WKUP_PIN1` | `PA34` |
| `WKUP_PIN2` | `PA35` |
| `WKUP_PIN3` | `PA36` |
| `WKUP_PIN4` | `PA37` |
| `WKUP_PIN5` | `PA38` |
| `WKUP_PIN6` | `PA39` |
| `WKUP_PIN7` | `PA40` |
| `WKUP_PIN8` | `PA41` |
| `WKUP_PIN9` | `PA42` |

</div>

Enregistrez la version du firmware, la tension d'alimentation, le réglage du simulateur de batterie, l'état de connexion des périphériques, l'état de connexion Bluetooth et la température ambiante pour chaque mesure.

#### 5.2.14. Référence complète des broches d'alimentation { #5214-full-power-supply-pin-reference }

Utilisez ces tableaux pour la revue de schéma broche par broche. Chaque tableau indique la tension minimale, typique et maximale, ainsi que le courant maximal de chaque broche d'alimentation pour une combinaison boîtier et famille d'alimentation. Sélectionnez le tableau correspondant au numéro de pièce commandable exact ; ne mélangez pas les lignes de différents boîtiers ou familles d'alimentation.

<div align="center"><em>Tableau 5.2-11 : Référence des broches d'alimentation de la variante alimentée par batterie QFN68L</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrée d'alimentation VBUS ; alimente le module de charge interne. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Connexion batterie ; un canal GPADC interne détecte également la tension de batterie sur cette broche. |
| `VSYS` | - | 3,0 | - | 150 | Sortie d'alimentation interne 3,0 V ; ajoutez un condensateur externe à la masse. Alimente `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement — n'alimentez pas de périphériques externes. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement — n'alimentez pas de périphériques externes. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement — n'alimentez pas de périphériques externes. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement — n'alimentez pas de périphériques externes. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrée d'alimentation système ; connectez-la à la batterie. Le seuil matériel de démarrage est de 3,45 V et le seuil matériel d'arrêt est de 2,7 V. Le seuil logiciel par défaut de batterie faible est de 3,48 V. Pour une alimentation de banc à tension constante, utilisez 3,6 V à 4,7 V ; 3,8 V est recommandé. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, ajoutez un condensateur à la masse, n'alimentez pas de périphériques externes. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Sortie LDO 3,3 V n°1 ; ajoutez un condensateur à la masse. Capacité de charge de 150 mA après démarrage ; activée par défaut. Pendant le démarrage progressif, le courant de charge ne doit pas dépasser 30 mA, faute de quoi le LDO risque de ne pas démarrer correctement. Alimente la Flash intégrée au boîtier, la Flash externe et `AVDD33_AUD`. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Sortie LDO 3,3 V n°2 ; désactivée par défaut, nécessite une configuration logicielle pour l'activer. Capacité de charge de 150 mA après démarrage ; le courant de charge ne doit pas dépasser 30 mA pendant le démarrage progressif. Alimente le moteur ou le panneau LCD. |
| `GPADC_VREF` | - | - | - | - | Entrée de référence GPADC ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrée de tension de référence audio ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

<div align="center"><em>Tableau 5.2-12 : Référence des broches d'alimentation de la variante alimentée en 3,3 V QFN68L</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation GPIO ; ce tableau de référence présente la configuration 3,3 V. Confirmez la tension d'E/S pour le numéro de pièce exact. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrée de détection de tension de batterie ; un canal GPADC interne détecte la tension de batterie sur cette broche. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrée d'alimentation PMU ; connectez à une alimentation externe 3,3 V. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrée d'alimentation analogique ; connectez à une alimentation externe 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `GPADC_VREF` | - | - | - | - | Entrée de référence GPADC ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à une alimentation externe 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrée de tension de référence audio ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à une alimentation externe 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

!!! warning "Configuration VDDIOA du SF32LB57ZUN3N6"
    Le `VDDIOA` du `SF32LB57ZUN3N6` accepte 1,8 V ou 3,3 V. La plage de 2,97 à 3,63 V du tableau générique QFN68L alimenté en 3,3 V ne s'applique pas au fonctionnement en 1,8 V ; consultez les limites électriques du numéro de pièce exact avant de choisir l'alimentation 1,8 V.

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` et `VDDIOA` se connectent tous au même rail externe de 3,3 V. Utilisez un routage en étoile : faites partir la piste de chaque broche séparément depuis la source, sans partager de segment commun en amont.

<div align="center"><em>Tableau 5.2-13 : Référence des broches d'alimentation de la variante alimentée par batterie QFN80L</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation GPIO ; connectez à une alimentation externe 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrée de détection de tension de batterie ; un canal GPADC interne détecte la tension de batterie sur cette broche. |
| `VSYS` | - | 3,0 | - | 150 | Sortie d'alimentation interne 3,0 V ; ajoutez un condensateur externe à la masse. Alimente `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrée d'alimentation analogique ; connectez à une alimentation externe 3,3 V. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrée d'alimentation système ; connectez-la à la batterie. Le seuil matériel de démarrage est de 3,45 V et le seuil matériel d'arrêt est de 2,7 V. Le seuil logiciel par défaut de batterie faible est de 3,48 V. Pour une alimentation de banc à tension constante, utilisez 3,6 V à 4,7 V ; 3,8 V est recommandé. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrée d'alimentation E/S du groupe SB du SIP ; la tension dépend du numéro de pièce exact. Pour une PSRAM intégrée sur MPI2 ou MPI3, reliez cette broche à `VDD18_VOUT` (1,8 V) ; pour une Flash NOR intégrée, alimentez cette broche en externe avec 3,3 V. |
| `GPADC_VREF` | - | - | - | - | Entrée de référence GPADC ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à `VSYS`. |
| `AUD_VREF` | - | - | - | - | Entrée de tension de référence audio ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à `VDD33_VOUT1`. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

!!! warning "Incohérence de la source dans le tableau d'alimentation QFN80L"
    Le schéma de brochage QFN80L pour la variante sur batterie, présenté dans la vue d'ensemble, désigne une broche comme `VDD33_VOUT1`, tandis que le tableau d'alimentation QFN80L de SiFli répertorie `VDDIOSB` sans expliquer la correspondance entre ces deux désignations. De plus, ce tableau ne mentionne ni `VDD33_VOUT1` ni `VDD33_VOUT2`. Pourtant, le schéma général d'alimentation montre ces deux rails et le même tableau indique que `AVDD33_AUD` est alimenté par `VDD33_VOUT1`. La source ne précise pas si ces sorties sont accessibles de l'extérieur sur ce boîtier. Avant d'affecter l'un ou l'autre de ces rails, vérifiez le brochage de la référence exacte et le schéma de référence officiel.

<div align="center"><em>Tableau 5.2-14 : Référence des broches d'alimentation de la variante alimentée en 3,3 V QFN80L</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation GPIO ; connectez à une alimentation externe 3,3 V. |
| `VBATS` | 0 | - | 4,7 | 1 | Entrée de détection de tension de batterie ; un canal GPADC interne détecte la tension de batterie sur cette broche. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Entrée d'alimentation analogique ; connectez à une alimentation externe 3,3 V. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 400 | Entrée d'alimentation PMU ; connectez à une alimentation externe 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, n'alimentez pas de périphériques externes. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrée d'alimentation E/S du groupe SB du SIP ; la tension dépend du numéro de pièce exact. Si le boîtier intègre une PSRAM sur MPI2/MPI3, reliez cette broche à `VDD18_VOUT` (1,8 V). S'il intègre une Flash NOR, alimentez cette broche en externe avec 3,3 V. |
| `GPADC_VREF` | - | - | - | - | Entrée de référence GPADC ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à une alimentation externe 3,3 V. |
| `AUD_VREF` | - | - | - | - | Entrée de tension de référence audio ; ajoutez uniquement un condensateur à la masse, ne pilotez pas en externe. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à une alimentation externe 3,3 V. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

!!! note
    `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` et `VDDIOA` se connectent tous au même rail externe de 3,3 V. Utilisez un routage en étoile : faites partir la piste de chaque broche séparément depuis la source, sans partager de segment commun en amont.

<!-- BGA-ONLY -->
<div align="center"><em>Tableau 5.2-15 : Référence des broches d'alimentation de la variante BGA112 alimentée par batterie</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,6 | 5,0 | 5,5 | 400 | Entrée d'alimentation VBUS ; alimente le module de charge interne. |
| `VBAT` | 3,45 | - | 4,7 | 400 | Connexion batterie ; un canal GPADC interne mesure également la tension de batterie sur cette broche. |
| `VSYS` | - | 3,0 | - | 150 | Sortie d'alimentation interne 3,0 V ; ajoutez un condensateur externe à la masse. Alimente `AVDD_BRF`. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VCC` | 3,45 | - | 4,7 | 400 | Entrée d'alimentation système ; connectez-la à la batterie. Le seuil logiciel par défaut de batterie faible est de 3,48 V. Pour une alimentation de banc à tension constante, utilisez 3,6 à 4,7 V ; 3,8 V est recommandé. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, ajoutez un condensateur à la masse. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | Sortie LDO 3,3 V n°1 ; activée par défaut. Limitez la charge en démarrage progressif à 30 mA ; la capacité de charge atteint 150 mA après démarrage. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | Sortie LDO 3,3 V n°2 ; désactivée par défaut et activée par logiciel. Limitez la charge en démarrage progressif à 30 mA ; la capacité de charge atteint 150 mA après démarrage. |
| `PVSS_PMU` | - | - | - | - | Masse d'alimentation du PMU. |
| `AVSS_PMU` | - | - | - | - | Masse analogique du PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrée d'alimentation GPIO ; connectez à 1,8 V ou 3,3 V selon le numéro de pièce exact. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrée d'alimentation E/S de la mémoire intégrée au boîtier ; connectez à `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrée d'alimentation E/S de la mémoire intégrée au boîtier ; la tension dépend du numéro de pièce exact. Pour une PSRAM intégrée, reliez-la à `VDD18_VOUT` (1,8 V) ; pour une Flash NOR intégrée, reliez-la à `VDD33_VOUT1` (3,3 V). |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrée d'alimentation analogique ; connectez à 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Masse analogique. |
| `GPADC_VREFP` | - | - | - | - | Entrée de référence positive GPADC ; connectez uniquement un condensateur, ne la pilotez pas de l'extérieur. |
| `GPADC_VREFN` | - | - | - | - | Référence négative GPADC ; connectez à la masse. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à `VSYS`. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Masses RF. |
| `AUD_VREF` | - | - | - | - | Entrée de référence audio ; connectez uniquement un condensateur, ne la pilotez pas de l'extérieur. |
| `AUD_VREF_GND` | - | - | - | - | Masse audio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à `VDD33_VOUT1`. |
| `AVSS33_AUD` | - | - | - | - | Masse audio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

<div align="center"><em>Tableau 5.2-16 : Référence des broches d'alimentation de la variante BGA112 alimentée en 3,3 V</em></div>

<div align="center" markdown>

| Broche d'alimentation | Min (V) | Typ (V) | Max (V) | Courant max (mA) | Description |
|:---|:---|:---|:---|:---|:---|
| `VBATS` | 0 | - | 4,7 | 1 | Entrée de détection de tension de batterie ; un canal GPADC interne mesure ici la tension de batterie. |
| `BUCK_LX` | - | 1,25 | - | 50 | Nœud de commutation de l'inductance BUCK ; connectez une extrémité de l'inductance. |
| `BUCK_FB` | - | 1,25 | - | 50 | Rétroaction BUCK ; connectez l'autre extrémité de l'inductance et un condensateur à la masse. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_RET` | - | 0,9 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `VDD_RTC` | - | 1,1 | - | 1 | Sortie LDO interne ; ajoutez un condensateur externe. Alimentation interne uniquement. |
| `PVDD_PMU` | 2,97 | 3,3 | 3,63 | 400 | Entrée d'alimentation PMU ; connectez à une alimentation externe 3,3 V. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | Sortie LDO 1,8 V ; alimentation interne uniquement, ajoutez un condensateur à la masse. |
| `PVSS_PMU` | - | - | - | - | Masse d'alimentation du PMU. |
| `AVSS_PMU` | - | - | - | - | Masse analogique du PMU. |
| `VDDIOA` | 2,97 | 1,8 / 3,3 | 3,63 | 100 | Entrée d'alimentation GPIO ; connectez à 1,8 V ou 3,3 V selon le numéro de pièce exact. |
| `VDDIOSA` | - | 1,8 | - | 30 | Entrée d'alimentation E/S de la mémoire intégrée au boîtier ; connectez à `VDD18_VOUT`. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | Entrée d'alimentation E/S de la mémoire intégrée au boîtier ; la tension dépend du numéro de pièce exact. Pour une PSRAM intégrée, reliez-la à `VDD18_VOUT` (1,8 V) ; pour une Flash NOR intégrée, alimentez cette broche en externe avec 3,3 V. |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Entrée d'alimentation analogique ; connectez à 3,3 V. |
| `AVSS33_ANA` | - | - | - | - | Masse analogique. |
| `GPADC_VREFP` | - | - | - | - | Entrée de référence positive GPADC ; connectez uniquement un condensateur, ne la pilotez pas de l'extérieur. |
| `GPADC_VREFN` | - | - | - | - | Référence négative GPADC ; connectez à la masse. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | Entrée d'alimentation RF ; connectez à une alimentation externe 3,3 V. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | Masses RF. |
| `AUD_VREF` | - | - | - | - | Entrée de référence audio ; connectez uniquement un condensateur, ne la pilotez pas de l'extérieur. |
| `AUD_VREF_GND` | - | - | - | - | Masse audio. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Entrée d'alimentation audio ; connectez à une alimentation externe 3,3 V. |
| `AVSS33_AUD` | - | - | - | - | Masse audio. |
| `MIC_BIAS` | 1,4 | - | 2,8 | - | Sortie de polarisation du microphone ; connectez à l'alimentation du microphone. |

</div>

!!! warning "Plage de tension VDDIOA en BGA112"
    Le tableau source de SiFli indique pour `VDDIOA` un minimum de 2,97 V, une valeur typique de 1,8 V / 3,3 V et un maximum de 3,63 V. L'option 1,8 V est incohérente avec le minimum indiqué. Confirmez les caractéristiques électriques du numéro de pièce exact ; n'appliquez pas les limites de 2,97 à 3,63 V à une configuration 1,8 V sans confirmation.

<!-- /BGA-ONLY -->

Continuez vers [Horloge, RF et interfaces utilisateur](SF32LB57x_schematic_clock_rf_interfaces.md).
