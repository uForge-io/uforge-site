---
icon: lucide/circuit-board
hide:
    - navigation
description: "Recommandations de conception de schéma RF et interfaces utilisateur pour le MCU SF32LB52x : adaptation d'antenne, affichage, audio, boutons, et moteur de vibration."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x — RF et interfaces utilisateur { #sf32lb52x-hardware-design-guide-rf-user-interfaces }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre les sections 5.4-5.5 des Recommandations de conception du schéma : RF et interfaces utilisateur. Retournez à [Système minimal, alimentation et horloge](SF32LB52x_schematic_design.md), poursuivez vers [Stockage et fabrication](SF32LB52x_schematic_storage_mfg.md), ou consultez la [Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) pour la revue point par point.

### 5.4. RF { #54-rf }

#### 5.4.1. Schéma RF et chemin d'antenne { #541-rf-schematic-and-antenna-path }

**Résumé rapide**

- Routez le chemin d'antenne comme une piste à impédance contrôlée de 50 Ω.
- Réservez un réseau d'adaptation en π même si l'antenne sélectionnée est déjà adaptée.
- Gardez le chemin RF court, blindé, et isolé du bruit du quartz, du DC/DC, de l'afficheur, et du chargeur.

**Objectif de conception**

Maximiser la sensibilité Bluetooth et les performances en rayonnement RF en maîtrisant l'impédance, en réduisant les discontinuités et en prévoyant une marge d'adaptation suffisante pour le réglage final de l'antenne.

L'impédance caractéristique de la piste RF est de 50 Ω. Si l'antenne est déjà adaptée, aucun composant RF supplémentaire n'est requis, mais un réseau d'adaptation de type π réservé reste recommandé pour le filtrage des émissions parasites ou le réglage de l'antenne.

![Figure 5.4-1 : Schéma du circuit RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.4-1 : Schéma du circuit RF</em></div>

La figure 5.4-1 montre un condensateur série de 15 pF, 50 V (C0323) ; les deux emplacements en dérivation C0318 et C0319 sont marqués NF (non montés). Ces valeurs décrivent le circuit de référence, pas une adaptation valable pour toute antenne. Placez le réseau près de la broche RF côté puce et choisissez sa configuration finale à partir de mesures sur le produit assemblé.

#### 5.4.2. Revue et réglage RF { #542-rf-review-and-tuning }

**Erreurs courantes - RF**

- Placer le réseau d'adaptation près de l'antenne au lieu de le placer près de la broche RF côté puce.
- Router la RF à travers des vias inutiles ou des coudes prononcés.
- Partager des chemins de retour de masse bruyants avec ceux des circuits DC/DC, d'affichage, USB ou du chargeur.
- Ne pas réserver d'emplacements pour le réseau d'adaptation, ce qui complique le réglage ultérieur de l'antenne.

**Liste de contrôle RF**

- [ ] L'objectif d'impédance de la piste RF est défini avec le fournisseur de PCB.
- [ ] Le réseau d'adaptation en π est prévu et placé près de la puce.
- [ ] La rangée de vias de masse et la zone d'exclusion RF ont été vérifiées.
- [ ] Les accès nécessaires au réglage de l'antenne et aux essais de certification sont prévus avant la finalisation de la conception du boîtier.

### 5.5. Interfaces utilisateur { #55-user-interfaces }

#### 5.5.1. Affichage { #551-display }

**Résumé rapide**

- Les interfaces prises en charge comprennent SPI, Dual-SPI, Quad-SPI et JDI série. L'EPD est également pris en charge sur les variantes compatibles à alimentation externe régulée.
- La résolution d'affichage maximale documentée est de 512 x 512.
- Le reset, le TE, le PWM de rétroéclairage, l'I2C tactile, l'interruption tactile, et le séquencement d'alimentation de l'afficheur doivent être revus ensemble.

**Objectif de conception**

Choisir une interface d'affichage adaptée à la bande passante et à la consommation visées, en préservant le comportement du réveil, du reset, du rétroéclairage et de la détection tactile, en fonctionnement normal comme dans les états basse consommation.

La puce prend en charge les interfaces SPI 3 fils, SPI 4 fils, SPI double ligne de données, SPI quadruple ligne de données, et JDI série, avec des modes de profondeur de couleur 16,7 M couleurs (RGB888), 262 K couleurs (RGB666), 65 K couleurs (RGB565), et 8 couleurs (RGB111), jusqu'à une résolution de 512x512.

Modèles de contrôleur LCD pris en charge :

<div align="center"><em>Tableau 5.5-1 : Liste des contrôleurs LCD pris en charge</em></div>

<div align="center" markdown>

| Modèle | Fabricant | Résolution | Type | Interface |
|:---|:---|:---|:---|:---|
| RM69090 | Raydium | 368x448 | AMOLED | SPI 3/4 fils, SPI double/quadruple données, MIPI-DSI |
| RM69330 | Raydium | 454x454 | AMOLED | SPI 3/4 fils, SPI double/quadruple données, MCU 8080 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368x448 | AMOLED | SPI quadruple données, MIPI-DSI |
| SH8601A | Shine World Technology | 454x454 | AMOLED | SPI 3/4 fils, SPI double/quadruple données, MCU 8080 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356x400 | TFT | SPI quadruple données |
| GC9C01 | Galaxycore | 360x360 | TFT | SPI quadruple données |
| GC9B71 | Galaxycore | 320x380 | TFT | SPI quadruple données |
| ST77903 | Sitronix | 400x400 | TFT | SPI quadruple données |
| ICNA3311 | Chipone | 454x454 | AMOLED | SPI quadruple données |
| FT2308 | FocalTech | 410x494 | AMOLED | SPI quadruple données |

</div>

!!! note "Les interfaces du pilote ne définissent pas les capacités du MCU"
    Le tableau 5.5-1 indique les interfaces proposées par les circuits intégrés pilotes LCD, et non des interfaces toutes disponibles sur SF32LB52x. La présence de MIPI-DSI ou d'un bus MCU 8080 de 8 bits dans une ligne ne prouve pas leur prise en charge par le MCU. Choisissez une interface compatible avec la référence exacte du MCU et avec le pilote.

##### 5.5.1.1. Interface d'affichage SPI/QSPI { #5511-spiqspi-display-interface }

<div align="center"><em>Tableau 5.5-2 : Connexions de signal SPI/QSPI</em></div>

<div align="center" markdown>

| Signal SPI | Broche | Description |
|:---|:---|:---|
| CSx | PA03 | Sélection de puce |
| WRx_SCL | PA04 | Horloge |
| DCx | PA06 | Donnée/commande en SPI 4 fils ; donnée 1 en Quad-SPI |
| SDI_RDx | PA05 | Entrée de données en SPI 3/4 fils ; donnée 0 en Quad-SPI |
| SDO | PA05 | Sortie de données en SPI 3/4 fils ; relié à SDI_RDx |
| D[0] | PA07 | Donnée 2 en Quad-SPI |
| D[1] | PA08 | Donnée 3 en Quad-SPI |
| RESET | PA00 | Reset de l'afficheur |
| TE | PA02 | Signal de synchronisation anti-déchirement (tearing effect), envoyé au MCU |

</div>

##### 5.5.1.2. Interface d'affichage JDI { #5512-jdi-display-interface }

!!! important "Terminologie JDI dans la source"
    Les notes d'application originales mentionnent JDI série dans leurs résumés des fonctions, mais présentent le tableau de broches suivant comme JDI parallèle. Les affectations de la source sont conservées ici. Avant de valider le schéma, confirmez le mode JDI prévu, les exigences de la dalle et sa prise en charge par la référence exacte du MCU. Ne considérez pas les interfaces série et parallèle comme interchangeables.

<div align="center"><em>Tableau 5.5-3 : Connexions de signal JDI parallèle</em></div>

<div align="center" markdown>

| Signal JDI | E/S | Description |
|:---|:---|:---|
| JDI_VCK | PA39 | Horloge de décalage pour le pilote vertical |
| JDI_VST | PA08 | Signal de démarrage pour le pilote vertical |
| JDI_XRST | PA40 | Signal de reset pour les pilotes horizontal et vertical |
| JDI_HCK | PA41 | Horloge de décalage pour le pilote horizontal |
| JDI_HST | PA06 | Signal de démarrage pour le pilote horizontal |
| JDI_ENB | PA07 | Signal de validation d'écriture pour la mémoire de pixels |
| JDI_R1 | PA05 | Donnée d'image rouge (pixels impairs) |
| JDI_R2 | PA42 | Donnée d'image rouge (pixels pairs) |
| JDI_G1 | PA04 | Donnée d'image verte (pixels impairs) |
| JDI_G2 | PA43 | Donnée d'image verte (pixels pairs) |
| JDI_B1 | PA03 | Donnée d'image bleue (pixels impairs) |
| JDI_B2 | PA02 | Donnée d'image bleue (pixels pairs) |

</div>

##### 5.5.1.3. Interface d'affichage EPD { #5513-epd-display-interface }

=== "52B/D/E/G/J (alimentation externe régulée)"

    La puce prend en charge une interface d'affichage EPD parallèle 8 bits :

    <div align="center"><em>Tableau 5.5-4 : Connexions de signal EPD</em></div>

    <div align="center" markdown>

    | Signal EPD | E/S | Description |
    |:---|:---|:---|
    | CLK | PA04 | Horloge du pilote de colonnes (Source Driver) |
    | CKV/CPV | GPIO | Horloge du pilote de lignes (Gate Driver) |
    | SPH | PA06 | Impulsion de démarrage du pilote de colonnes |
    | SPV/STV | GPIO | Impulsion de démarrage du pilote de lignes |
    | LE | GPIO | Validation de mémorisation du pilote de colonnes |
    | OE | GPIO | Activation des sorties du pilote de colonnes |
    | D0–D7 | PA07/PA08/PA37/PA39/PA40/PA41/PA42/PA43 | Données du pilote de colonnes, bits 0–7 |
    | GMODE | GPIO | Sélection du mode de sortie du pilote de lignes |
    | VPOS/VNEG | TPS | Alimentations positive/négative du pilote de colonnes |
    | VGH/VGL | TPS | Alimentations positive/négative du pilote de lignes |
    | VCOM | TPS | Électrode commune |
    | TPS_WAKEUP/TPS_PWRUP | GPIO | Réveil / contrôle de mise sous tension du PMIC TPS |
    | TPS_SDA/TPS_SCL | I2C | Interface I2C du PMIC TPS |
    | TPS_PWRCOM | GPIO | VCOM_CTRL du PMIC TPS, validation VCOM |
    | TPS_GOOD | GPIO | Sortie power-good du PMIC TPS |

    </div>

    !!! note
        Les signaux marqués « PA** » doivent utiliser l'affectation IO fixe indiquée. Les signaux marqués GPIO peuvent être affectés à n'importe quel IO. Les signaux marqués TPS proviennent de la sortie du PMIC d'affichage (TPS) vers le panneau. Les signaux marqués I2C nécessitent un IO capable d'I2C.

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    !!! info "Non applicable"
        La note d'application matérielle officielle de SiFli pour SF32LB520/3/5/7 n'inclut pas de conception de référence pour l'interface parallèle EPD. Si votre produit nécessite une prise en charge d'affichage EPD, consultez la documentation 52B/D/E/G/J et confirmez la faisabilité pour la variante alimentée par batterie directement avec le support FAE de SiFli.

##### 5.5.1.4. Interface tactile et rétroéclairage { #5514-touch-and-backlight-interface }

Le SF32LB52x prend en charge un contrôleur tactile raccordé en I2C, avec une entrée d'interruption pour signaler les événements tactiles. Un signal PWM permet d'activer le rétroéclairage et d'en régler la luminosité.

<div align="center"><em>Tableau 5.5-5 : Connexions tactile et rétroéclairage</em></div>

<div align="center" markdown>

| Signal tactile/rétroéclairage | Broche | Description |
|:---|:---|:---|
| Interrupt | PA43 | Interruption d'état tactile (capable de réveil) |
| I2C1_SCL | PA42 | Horloge I2C tactile |
| I2C1_SDA | PA41 | Donnée I2C tactile |
| BL_PWM | PA01 | Contrôle PWM du rétroéclairage |
| Reset | PA44 | Reset du contrôleur tactile |

</div>

**Erreurs courantes - Affichage**

- Oublier les broches de reset, TE, PWM de rétroéclairage, ou interruption tactile lors de l'affectation des broches.
- Supposer la prise en charge EPD sur la variante alimentée par batterie sans confirmer le composant réel et la conception source.
- Alimenter l'afficheur depuis un LDO interne plutôt qu'un rail externe correctement dimensionné.
- Router les horloges et données d'affichage à proximité du quartz, de la RF, de l'audio, ou de nœuds analogiques haute impédance.

**Liste de contrôle de l'affichage**

- [ ] L'interface d'affichage, la profondeur de couleur, la résolution, et la bande passante correspondent au panneau sélectionné.
- [ ] Le reset, le TE, le PWM de rétroéclairage, l'I2C tactile, et l'interruption tactile sont affectés et documentés.
- [ ] Le rail d'alimentation de l'afficheur et son séquencement sont compatibles avec le comportement de veille et de réveil.
- [ ] Le plan de mise en service couvre le reset, l'identification/relecture du panneau lorsque disponible, le rétroéclairage, l'interruption tactile, et la première image.

#### 5.5.2. Interface audio { #552-audio-interface }

**Résumé rapide**

- L'entrée microphone analogique est asymétrique et nécessite un condensateur de liaison pour bloquer la composante continue.
- La sortie DAC est différentielle et doit être routée comme une paire différentielle courte et blindée.
- Le filtrage de l'alimentation audio et le placement de MIC_BIAS influent fortement sur le niveau de bruit.

**Objectif de conception**

Préserver la qualité du signal analogique en gardant les chemins de microphone, de DAC, de polarisation, et d'alimentation audio courts, filtrés, blindés, et isolés des sources numériques et de bruit de commutation.

L'interface audio fournit :

1. Une entrée ADC asymétrique pour un microphone analogique, avec un condensateur de liaison en série d'au moins 2,2 uF ; le microphone est alimenté par la sortie MIC_BIAS de la puce.
2. Une sortie DAC différentielle pour un amplificateur de puissance audio (PA) externe — routez-la en paire différentielle avec un blindage par plan de masse ; gardez une capacité de piste < 10 pF et une longueur < 2 cm.

<div align="center"><em>Tableau 5.5-6 : Connexions de signal audio</em></div>

<div align="center" markdown>

| Signal audio | Broche | Description |
|:---|:---|:---|
| BIAS | MIC_BIAS | Alimentation du microphone |
| AU_ADC1P | ADCP | Entrée microphone analogique asymétrique |
| AU_DAC1P | DACP | Sortie analogique différentielle, positive |
| AU_DAC1N | DACN | Sortie analogique différentielle, négative |

</div>

![Figure 5.5-1 : Circuit d'entrée asymétrique du microphone MEMS analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-1 : Circuit d'entrée asymétrique du microphone MEMS analogique</em></div>

![Figure 5.5-2 : Circuit d'entrée asymétrique du microphone ECM analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-2 : Circuit d'entrée asymétrique du microphone ECM analogique</em></div>

Les circuits de microphone de référence filtrent MIC_BIAS avec une résistance série de 1 kΩ et un condensateur de 1 uF, 6,3 V à la masse. Le circuit ECM ajoute une résistance de polarisation du microphone de 4,7 kΩ. Les deux exemples montrent un condensateur d'entrée de 0,01 uF à la masse : il s'agit d'un filtre en dérivation, pas du condensateur de liaison série requis dans le trajet du signal. Conservez cette distinction lorsque vous adaptez les circuits.

![Figure 5.5-3 : Circuit de l'amplificateur de puissance audio analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-3 : Circuit de l'amplificateur de puissance audio analogique</em></div>

**Erreurs courantes - Audio**

- Router les pistes de microphone ou de DAC près des horloges d'affichage, du DC/DC, de la RF, de l'USB, ou du SDIO.
- Placer les condensateurs de filtrage MIC_BIAS ou AVDD33_AUD loin des broches de la puce.
- Traiter DACP/DACN comme des signaux asymétriques indépendants plutôt qu'une paire différentielle.
- Permettre une capacité parasite élevée ou une longueur de piste importante sur la sortie analogique.

**Liste de contrôle audio**

- [ ] Le placement des composants MIC_BIAS, ADCP, DACP, et DACN est revu par rapport aux exemples de disposition.
- [ ] DACP/DACN sont routés comme une paire différentielle courte et blindée.
- [ ] Les condensateurs de filtrage audio sont proches de leurs broches et mis à la masse proprement.
- [ ] Le plan de mise en service couvre la polarisation du microphone, le bruit de fond de l'ADC, la sortie DAC, l'activation du PA, et le bruit audible.

!!! important "Compléter les chemins du microphone et du DAC"
    La source relie MEMS_MIC_ADC_IN et ECM_MIC_ADC_IN à ADCP. Ajoutez en série le condensateur de blocage de la composante continue d'au moins 2,2 uF exigé plus haut ; le condensateur de 0,01 uF relié à la masse dans les circuits de microphone ne le remplace pas. Placez le filtre passe-bas différentiel du cadre en pointillés de la figure 5.5-3 près du MCU. Maintenez la capacité des pistes de sortie du DAC sous 10 pF et leur longueur sous 2 cm.

#### 5.5.3. Boutons { #553-buttons }

**Résumé rapide**

- `PA34` prend en charge le bouton d'alimentation, le comportement de mise sous/hors tension, et le reset par appui long.
- Les boutons d'encodeur rotatif doivent suivre le circuit de référence et être revus conjointement avec les exigences de réveil, d'anti-rebond, et d'ESD.

**Objectif de conception**

Fournir des entrées utilisateur et un reset fiables, sans faux réveils, état de reset maintenu ni courant de fuite excessif en veille dans les réseaux de polarisation.

##### 5.5.3.1. Bouton d'alimentation { #5531-power-button }

PA34 prend en charge le reset par appui long. Le même bouton peut assurer la mise sous/hors tension et le reset par appui long. Cette fonction de reset est active à l'état haut : au repos, le signal doit être maintenu à l'état bas par une résistance de pull-down, puis passer à l'état haut lorsque le bouton est enfoncé.

![Figure 5.5-4 : Circuit du bouton d'alimentation / reset par appui long](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-4 : Circuit du bouton d'alimentation / reset par appui long</em></div>

Le circuit de référence utilise R0703 (5,1 kΩ) entre VSYS_3V3 et le bouton, R0702 (100 kΩ) pour maintenir PA34 à l'état bas et C0720 (0,1 uF) relié à la masse. Il comprend aussi un composant de protection ESD. Ces valeurs correspondent au schéma présenté ; lors de son adaptation, vérifiez les seuils d'entrée, l'anti-rebond, les courants de fuite et les temps de reset.

##### 5.5.3.2. Bouton d'encodeur rotatif mécanique { #5532-mechanical-rotary-encoder-button }

Utilisez la conception de référence comme base pour le circuit du bouton d'encodeur rotatif.

![Figure 5.5-5 : Circuit du bouton d'encodeur rotatif mécanique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-5 : Circuit du bouton d'encodeur rotatif mécanique</em></div>

Les signaux A et B de l'encodeur sont reliés à PA35 et PA36 par des résistances de 0 Ω. Chaque signal possède une résistance de pull-up de 200 kΩ vers VDD33_LDO2_VOUT et une protection ESD ; C0703 et C0706 sont marqués NF (non montés). Les noms des signaux indiquent aussi des fonctions USB/UART multiplexées : vérifiez les conflits de broches avant de reprendre cette affectation.

**Erreurs courantes - Boutons**

- Laisser `PA34` flottant ou polarisé au mauvais niveau par défaut.
- Oublier que les circuits de bouton peuvent nécessiter une fonction de réveil, une protection ESD, un anti-rebond et des points d'accès pour les tests de production.
- Partager les réseaux de bouton avec des fonctions bruyantes ou fortement chargées sans vérifier la fiabilité du réveil.

**Liste de contrôle des boutons**

- [ ] Le niveau logique au repos du signal du bouton d'alimentation et de reset par appui long est correct.
- [ ] Le comportement de réveil est vérifié pour les états basse consommation prévus.
- [ ] Les exigences d'ESD et d'anti-rebond mécanique sont revues.
- [ ] Le plan de mise en service inclut le comportement d'appui court, appui long, réveil, et reset.

#### 5.5.4. Moteur de vibration { #554-vibration-motor }

**Résumé rapide**

- Utilisez une sortie PWM pour piloter le moteur de vibration à travers un étage pilote externe.
- Alimentez le moteur depuis un rail commutable lorsque le courant de veille compte.

**Objectif de conception**

Fournir un retour haptique reproductible tout en gardant le courant d'appel du moteur, le bruit de commutation, et la fuite en veille à l'écart des rails sensibles et des circuits de réveil.

Le SF32LB52x prend en charge une sortie PWM pour piloter un moteur de vibration à travers un étage pilote externe.

![Figure 5.5-6 : Circuit pilote du moteur de vibration (référence SF32LB520/3/5/7 ; fonctionnellement équivalent sur la variante à alimentation externe régulée)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-6 : Circuit pilote du moteur de vibration (référence SF32LB520/3/5/7 ; fonctionnellement équivalent sur la variante à alimentation externe régulée)</em></div>

![Figure 5.5-7 : Circuit pilote du moteur de vibration (référence 52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.5-7 : Circuit pilote du moteur de vibration (référence 52B/D/E/G/J)</em></div>

Les deux circuits de moteur utilisent PA20 pour commander un MOSFET côté masse, avec une résistance de pull-down de 1 MΩ sur la grille. La figure 5.5-6 alimente le moteur depuis la sortie VDD33_VOUT2 de 3,3 V de la puce. La figure 5.5-7 utilise deux LDO externes distincts de 3,3 V pour le moteur et PVDD, alimentés par VSYS/VBAT. La commande est fonctionnellement équivalente, mais les connexions d'alimentation ne sont pas interchangeables.

**Liste de contrôle du moteur**

- [ ] Le pilote du moteur, la protection contre les surtensions inductives/ESD et le courant admissible de l'alimentation ont été vérifiés.
- [ ] L'état par défaut du rail du moteur est éteint en veille et en état d'expédition.
- [ ] L'affectation de la broche PWM n'entre pas en conflit avec les broches d'affichage, de stockage, ou de débogage.
- [ ] Le plan de mise en service couvre le balayage du rapport cyclique PWM, le courant de démarrage, le bruit audible, et la fuite en veille.
