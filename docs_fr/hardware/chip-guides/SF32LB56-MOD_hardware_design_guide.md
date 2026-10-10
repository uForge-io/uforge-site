---
icon: lucide/book-check
description: "Guide de conception matérielle pour le module MCU Bluetooth SF32LB56-MOD : alimentation, interfaces et conseils d'intégration PCB."
tags:
  - Matériel
  - Module
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56-MOD { #sf32lb56-mod-hardware-design-guide }

## 1. Introduction { #1-introduction }

**SF32LB56-MOD** est une famille polyvalente de modules MCU Bluetooth basse consommation de SiFli, basée sur la série SF32LB56xV.

Ce guide s'appuie sur la **spécification technique DS5602-SF32LB56-MOD V0.3** et rassemble les informations propres au module nécessaires à la conception du schéma, à l'implantation et au routage du PCB, à la validation et à la préparation de la production. Il couvre les variantes de mémoire, l'interface à 89 broches, les trois rails d'alimentation, les interfaces d'affichage, audio et stockage, le placement de l'antenne, les exigences de manipulation et la liste de contrôle du schéma.

!!! note "Source et recommandations"
    Les valeurs techniques ci-dessous suivent la **spécification technique DS5602-SF32LB56-MOD V0.3**, sauf mention explicite d'un conseil d'intégration ou d'une recommandation de conception.

## 2. Présentation du composant { #2-device-overview }

### 2.1 Architecture { #21-architecture }

Le SF32LB56-MOD repose sur une plateforme MCU double cœur de la série SF32LB56xV. Le HCPU traite les applications et les graphiques, tandis que le LCPU exécute les tâches permanentes basse consommation. Le HCPU est un cœur Arm Cortex-M33 STAR-MC1 pouvant fonctionner jusqu'à 240 MHz ; le LCPU est du même type et peut fonctionner jusqu'à 96 MHz. Les deux cœurs prennent en charge FPU et MPU.

Le module prend en charge la connectivité Bluetooth 5.3 et fournit l'accélération d'affichage, l'entrée/sortie audio, des interfaces de mémoire externe, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC ainsi que l'accès au débogage et au téléchargement.

### 2.2 Variantes { #22-variants }

<div align="center"><em>Tableau 2.2-1 : Variantes de la série SF32LB56-MOD</em></div>

<div align="center" markdown>

| Code du module | Flash principale | PSRAM | Flash de secours | Température de fonctionnement | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 Mo QSPI-NOR | 4+8 Mo OPI-PSRAM | 1 Mo QSPI-NOR | -40~85°C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 Mo QSPI-NAND | 4+8 Mo OPI-PSRAM | 1 Mo QSPI-NOR | -40~85°C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 Mo SD-NAND | 4+8 Mo OPI-PSRAM | 1 Mo QSPI-NOR | -40~85°C | 18,0 × 32,9 × 3,1 mm |

</div>

### 2.3 Principales fonctionnalités matérielles { #23-major-hardware-features }

<div align="center"><em>Tableau 2.3-1 : Principales fonctionnalités matérielles</em></div>

<div align="center" markdown>

| Domaine | Capacité |
| :--- | :--- |
| CPU | HCPU jusqu'à 240 MHz, LCPU jusqu'à 96 MHz, tous deux Arm Cortex-M33 STAR-MC1 |
| Sans fil | Bluetooth 5.3 double mode avec prise en charge BLE Audio |
| Graphisme | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Audio | DAC 24 bits, ADC Sigma-Delta 24 bits, 2 interfaces PDM (PDM1/PDM2), chacune pouvant connecter deux microphones via les canaux gauche et droit (quatre au total au maximum), 1 interface I2S |
| IA/DSP | Accélérateur matriciel jusqu'à 1,92 GOPS, FFT, FIR, CORDIC |
| Stockage | Options de Flash/PSRAM du module, MPI3, prise en charge SD/SDIO/eMMC |
| Sécurité | AES, HASH, CRC, TRNG, démarrage sécurisé, eFuse 1024 bits, certifié PSA niveau 1 |
| Antenne | Antenne intégrée sur PCB ou antenne externe via connecteur compatible IPEX |

</div>

### 2.4 Applications typiques { #24-typical-applications }

Les applications typiques incluent les montres intelligentes haut de gamme, les bracelets connectés, les équipements médicaux portables, les équipements de fitness, les tableaux de bord de vélos électriques, les clés de voiture, les télécommandes pour véhicules portées sur soi, les appareils électroménagers intelligents, les serrures intelligentes, les dispositifs HMI graphiques, les concentrateurs de capteurs industriels, les terminaux de surveillance industrielle, les concentrateurs de capteurs basse consommation et les dispositifs Bluetooth Mesh.

## 3. Vue d'ensemble de la conception { #3-design-at-a-glance }

### 3.1 Résumé technique en une page { #31-one-page-engineering-summary }

<div align="center"><em>Tableau 3.1-1 : Résumé technique</em></div>

<div align="center" markdown>

| Sujet | Conseil de conception |
| :--- | :--- |
| Rails d'alimentation | Fournissez VDD_3V3, VDD_1V8 et VDDIO. Les trois rails doivent monter en tension simultanément. |
| Découplage local | Placez des condensateurs de 4,7 µF près des broches du module sur VDD_3V3, VDD_1V8 et VDDIO. |
| Niveau d'E/S | VDDIO prend en charge 1,7–3,6 V, mais PA00–PA11 sont fixés à 3,3 V. Vérifiez chaque périphérique connecté. |
| Débogage/téléchargement | UART4_TXD/UART4_RXD sont les broches UART par défaut pour les journaux, le téléchargement et le débogage ; SWDIO/SWCLK prennent en charge le téléchargement SWD. |
| Mode de démarrage | BOOT_MODE à l'état haut sélectionne le mode de téléchargement ; BOOT_MODE à l'état bas sélectionne le mode utilisateur. |
| Conflit avec la Flash interne | PA06–PA11 sont connectées par défaut à la Flash interne du module et sont indisponibles en externe. |
| Conflit SDIO/MPI3 | SDIO et MPI3 partagent des ressources d'E/S et ne peuvent pas être utilisés simultanément. |
| Sources de réveil | PA50, PA51, PB32 et PB35 peuvent recevoir des interruptions pendant la veille du MCU. |
| PWRKEY | PB32 déclenche une réinitialisation après un appui de 10 s à l'état haut ; une résistance de pull-down de 10 kΩ est requise. |
| Antenne | Gardez la zone d'antenne PCB exempte de cuivre, de pistes, de composants et de métal ; utilisez un dégagement d'au moins 15 mm si l'antenne ne peut pas dépasser du bord de la carte. |
| Fabrication | MSL 3 ; après ouverture, utilisez le module dans les 168 heures à 25 ± 5 °C / 60 % HR ; au-delà, séchez-le au four avant réutilisation. |

</div>

### 3.2 Composants externes recommandés { #32-recommended-external-components }

<div align="center"><em>Tableau 3.2-1 : Composants externes recommandés</em></div>

<div align="center" markdown>

| Circuit | Composant | Placement / Notes |
| :--- | :--- | :--- |
| VDD_3V3 | Condensateur de 4,7 µF | Placez-le près de la broche d'alimentation du module. |
| VDD_1V8 | Condensateur de 4,7 µF | Placez-le près de la broche d'alimentation du module. |
| VDDIO | Condensateur de 4,7 µF | Placez-le près de la broche d'alimentation du module. |
| PB32/PWRKEY | Pull-down de 10 kΩ | Requis pour une réinitialisation après un appui de 10 s à l'état haut. |
| Signaux RGB du LCD | Résistances en série de 33–100 Ω | Ajoutez-les sur les lignes de signal RGB. |
| UART de débogage PA16/PA17 | Résistances en série de 100 Ω | Requises sur l'interface UART multiplexée de téléchargement et de débogage. |
| Écran tactile / connecteurs utilisateur | Protection ESD | Réservez des dispositifs ESD sur les interfaces exposées telles que le TP. |

</div>

### 3.3 Arbre d'alimentation { #33-power-tree }

VDD_3V3 alimente le PVDD du MCU, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2 et la Flash interne du module. SiFli recommande d'utiliser un LDO pour ce rail. VDD_1V8 alimente la mémoire co-packagée du MCU. VDDIO alimente les ports d'E/S VDDIOA/VDDIOB du MCU.

!!! info "Figure 3.3-1 : Schéma d'alimentation du SF32LB56-MOD"
    Voir la figure 7-1 du DS5602 V0.3.

### 3.4 Schéma-bloc système { #34-system-block-diagram }

Le schéma-bloc du module montre le MCU SF32LB56xV, les ressources mémoire, le chemin RF, l'option d'antenne, les entrées d'alimentation et les groupes d'interfaces externes.

!!! info "Figure 3.4-1 : Schéma-bloc fonctionnel du SF32LB56-MOD"
    Voir la figure 2-1 du DS5602 V0.3.

## 4. Flux de conception matérielle { #4-hardware-design-flow }

### 4.1 Séquence de conception { #41-design-sequence }

1. Sélectionnez la variante de mémoire en fonction de la taille du firmware, des ressources graphiques, des besoins de stockage externe et de l'objectif de coût.
2. Choisissez la variante à antenne PCB ou à antenne externe avant de finaliser la conception mécanique.
3. Définissez l'architecture d'alimentation pour VDD_3V3, VDD_1V8 et VDDIO, et confirmez la montée en tension simultanée.
4. Affectez les broches d'affichage, de stockage, d'USB, d'audio, de capteurs, de réveil, de débogage et de test de production.
5. Résolvez les conflits de ressources partagées, en particulier SDIO contre MPI3 et les broches Flash PA06–PA11 utilisées en interne.
6. Ajoutez le découplage, l'ESD, le pull-down PWRKEY et les résistances en série pour le LCD et l'UART de débogage.
7. Placez le module avec le dégagement et la zone interdite d'antenne requis.
8. Passez en revue le schéma et le PCB par rapport à la liste de contrôle de la section 7 avant la publication.

### 4.2 Séquence de revue { #42-review-sequence }

Utilisez une séquence de revue par étapes : revue du schéma, revue du multiplexage des broches, revue de la mise sous tension, revue RF/antenne, revue de l'implantation du PCB, revue de mise en service du premier article, validation RF, revue environnementale/fiabilité et revue du test de production.

### 4.3 Jalons { #43-milestones }

<div align="center"><em>Tableau 4.3-1 : Jalons matériels recommandés</em></div>

<div align="center" markdown>

| Jalon | Preuves requises |
| :--- | :--- |
| Gel du schéma | Variante sélectionnée, conflits de broches résolus, rails d'alimentation vérifiés, liste de contrôle complète. |
| Gel de l'implantation | Zone interdite d'antenne vérifiée, découplage d'alimentation placé, interfaces haute vitesse revues. |
| Mise en service EVT | Rails, mode de démarrage, UART/SWD, Flash, affichage, USB, audio et RF : essais fonctionnels initiaux réussis. |
| DVT | Portée RF, courant, thermique, veille/réveil, stratégie ESD et impact du boîtier validés. |
| Publication pour production | Programmation, pastilles de test, règles d'inspection, gestion MSL/refusion et registres de révision complets. |

</div>

## 5. Conception du schéma { #5-schematic-design }

### 5.1 Système d'alimentation { #51-power-system }

#### 5.1.1 Alimentation { #511-power-supply }

<div align="center"><em>Tableau 5.1-1 : Rails d'alimentation</em></div>

<div align="center" markdown>

| Rail | Plage de fonctionnement recommandée | Objectif |
| :--- | :--- | :--- |
| VDD_3V3 | 2,97–3,6 V | PVDD du MCU, domaines analogiques 3,3 V, domaine analogique RF, VDDIOA2, Flash interne. |
| VDD_1V8 | 1,7–1,95 V | Alimentation de la mémoire intégrée dans le même boîtier que le MCU. |
| VDDIO | 1,7–3,6 V | Alimentation d'E/S VDDIOA/VDDIOB du MCU. |

</div>

VDD_3V3, VDD_1V8 et VDDIO doivent monter en tension simultanément. Placez un condensateur de 4,7 µF près de chaque broche d'alimentation du module. Bien que VDDIO puisse fonctionner de 1,7 V à 3,6 V, la fiche technique précise séparément que PA00–PA11 sont fixées à 3,3 V et ne suivent pas VDDIO.

#### 5.1.2 Modes de fonctionnement { #512-operating-modes }

BOOT_MODE sélectionne le mode de démarrage : état haut pour le téléchargement et état bas pour le mode utilisateur. Assurez-vous que le niveau logique de BOOT_MODE reste défini lors de la réinitialisation et de la programmation en production. PB32/PWRKEY déclenche une réinitialisation après un appui de 10 s à l'état haut ; une résistance de pull-down de 10 kΩ est requise.

### 5.2 Cadencement et RF { #52-timing-and-rf }

#### 5.2.1 Horloge { #521-clock }

La plateforme du module utilise un oscillateur à cristal de 48 MHz et prend en charge des oscillateurs RC basse consommation à 1 MHz/48 MHz, un oscillateur RC ultra-basse consommation à 10 kHz, et un oscillateur à cristal optionnel de 32,768 kHz. Respectez les recommandations d'implantation et de mise à la masse des circuits d'horloge de la conception de référence du module, et évitez les procédés ultrasoniques qui peuvent solliciter mécaniquement le cristal interne.

#### 5.2.2 RF { #522-rf }

<div align="center"><em>Tableau 5.2-1 : Résumé RF Bluetooth</em></div>

<div align="center" markdown>

| Élément | Valeur |
| :--- | :--- |
| Plage de fréquence Bluetooth | 2402–2480 MHz |
| Puissance d'émission maximale BLE | 19 dBm |
| Plage de contrôle de puissance RF BLE | -20 à 19 dBm |
| Sensibilité BLE 1 Mbps | -100 dBm dirty off, -99,3 dBm dirty on |
| Sensibilité BLE 2 Mbps | -97 dBm dirty off, -96,5 dBm dirty on |
| Puissance d'émission maximale BR | 19 dBm |
| Puissance d'émission maximale EDR | 13 dBm |
| Sensibilité BR | -96,3 dBm dirty off, -94 dBm dirty on |
| Sensibilité EDR2 | -95,5 dBm dirty off, -95 dBm dirty on |
| Sensibilité EDR3 | -88,5 dBm dirty off, -87 dBm dirty on |

</div>

Le module prend en charge une antenne intégrée sur PCB ou une antenne externe via un connecteur compatible IPEX. Validez la distance de communication et les performances RF dans le boîtier final, pas seulement sur un banc ouvert.

### 5.3 Interfaces utilisateur { #53-user-interfaces }

#### 5.3.1 Affichage { #531-display }

Le contrôleur LCD prend en charge le mode DBI SPI série, Dual-SPI, Quad-SPI, le mode parallèle 8080, DPI/RGB et JDI. La figure d'affectation de broches recommandée dans la fiche technique associe les groupes LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper et de type Raspberry Pi aux broches du module.

Ajoutez des résistances en série de 33–100 Ω sur les lignes de signal RGB du LCD. Gardez le routage RGB, de l'affichage SPI et de l'écran tactile court et cohérent en impédance, et prévoyez une protection ESD pour les interfaces tactiles ou de connecteur exposées.

!!! info "Figure 5.3-1 : Affectation de broches recommandée pour la carte de développement"
    Voir la figure 7-6 du DS5602 V0.3.

#### 5.3.2 Audio { #532-audio }

Le module expose des sorties DAC audio analogiques, MIC_BIAS, MIC_ADC_IN, I2S, et des broches compatibles PDM. Le DAC audio est un chemin de sortie 24 bits prenant en charge des fréquences d'échantillonnage de 8 kHz à 48 kHz avec un SNR et une plage dynamique de 109 dB. L'ADC audio est un chemin d'entrée Sigma-Delta 24 bits prenant en charge des fréquences d'échantillonnage de 8 kHz à 48 kHz avec un SNR et une plage dynamique de 99 dB.

Routez l'audio analogique à l'écart des nœuds de commutation bruyants, des horloges du LCD et de la ligne d'alimentation de l'antenne. Placez les filtres MIC_BIAS et MIC_ADC_IN près du circuit du microphone.

#### 5.3.3 Boutons { #533-buttons }

PB32 est l'entrée PWRKEY et déclenche une réinitialisation après un appui de 10 s à l'état haut. Ajoutez la résistance de pull-down de 10 kΩ requise et assurez-vous que le circuit du bouton ne peut pas rester flottant pendant le transport, la veille profonde ou les séquences d'alimentation.

#### 5.3.4 Moteur et charges PWM { #534-motor-and-pwm-loads }

Les broches marquées GPTIM dans la figure d'affectation de broches recommandée de la fiche technique prennent en charge la sortie PWM. Utilisez des pilotes externes pour les moteurs, rétroéclairages, buzzers ou autres charges ; ne pilotez pas directement de charges inductives ou à fort courant depuis un GPIO du module.

### 5.4 Stockage et connectivité { #54-storage-and-connectivity }

#### 5.4.1 Stockage { #541-storage }

La famille de modules fournit une Flash principale dépendant du SKU, 4+8 Mo d'OPI-PSRAM, et 1 Mo de Flash QSPI-NOR de secours. MPI3 peut connecter une SPI NOR ou SPI NAND externe, mais PA06–PA11 sont connectées par défaut à la Flash interne du module et sont indisponibles en externe. SDIO et MPI3 partagent des ressources d'E/S et ne peuvent pas être utilisés simultanément.

#### 5.4.2 Capteurs { #542-sensors }

Le GPADC prend en charge une conversion 12 bits, un taux d'échantillonnage jusqu'à 4 MS/s, une plage d'entrée asymétrique de 0–3,3 V, une plage d'entrée différentielle de -2,1 V à +2,1 V, un déclenchement logiciel/matériel, et le DMA. Les broches marquées GPADC_CHx prennent en charge l'entrée analogique ; gardez les chemins analogiques courts, filtrés, et à l'écart du bruit de commutation du LCD et de la RF.

#### 5.4.3 UART/I2C { #543-uarti2c }

L'UART prend en charge un fonctionnement full-duplex jusqu'à 6 Mbps. L'I2C prend en charge les modes standard 100 kbps, rapide 400 kbps, rapide plus 1 Mbps, et haute vitesse 3,4 Mbps. De nombreux GPIO sont multiplexés en tant que `PAxx_I2C_UART` ou `PBxx_I2C_UART` ; confirmez le plan de multiplexage final avant le gel du schéma.

UART4_TXD sur la broche 6 et UART4_RXD sur la broche 7 constituent le port série de journalisation par défaut et prennent en charge le téléchargement et le débogage du programme. PA16 et PA17 peuvent être multiplexées en DBG_UART et nécessitent des résistances en série de 100 Ω lorsqu'elles servent au téléchargement ou au débogage.

#### 5.4.4 USB, SPI, SDIO et I2S { #544-usb-spi-sdio-and-i2s }

L'USB2.0 FS prend en charge le mode Hôte/Périphérique avec un PHY intégré. Le SPI prend en charge les formats SSP/SPI et Microwire ; le SPI du HPSYS atteint jusqu'à 48 MHz et celui du LPSYS jusqu'à 24 MHz. SDMMC1 prend en charge SD 3.0, SDIO 3.0 et eMMC 4.5.1 avec les modes SDR et DDR ; SDMMC2 prend en charge les fonctions SD/SDIO/eMMC avec des modes SDR jusqu'à 48 MHz. L'I2S prend en charge les modes maître/esclave, full duplex, les formats gauche/droite/standard, et une largeur PCM jusqu'à 24 bits.

### 5.5 Fabrication { #55-manufacturing }

#### 5.5.1 Débogage { #551-debug }

SWDIO sur la broche 79 et SWCLK sur la broche 80 sont les broches de débogage/téléchargement SWD. Gardez le SWD accessible sur les premiers prototypes et les gabarits de production. Exposez également le chemin de téléchargement/débogage UART4 par défaut, sauf si le produit dispose d'un autre chemin de programmation approuvé.

#### 5.5.2 Production { #552-production }

Réservez l'accès de production pour l'alimentation, la masse, le mode de démarrage, le reset/PWRKEY, le SWD, le téléchargement UART, et toute interface d'étalonnage ou de test RF au niveau de la carte. Le logiciel de test final doit couvrir le démarrage, la Flash, l'affichage, le tactile, l'audio, l'USB, les capteurs, la communication RF, le comportement de veille/réveil et la consommation de courant.

## 6. Implantation et routage du PCB { #6-pcb-layout }

### 6.1 Mécanique et empreinte { #61-mechanical-and-footprint }

Le module mesure 18,0 × 32,9 × 3,1 mm. Utilisez l'empreinte PCB recommandée dans la fiche technique et vérifiez avec le fabricant du PCB l'empreinte des pastilles, le débord du masque de soudure, les ouvertures du pochoir de pâte, les zones d'exclusion et le contour d'encombrement du composant (courtyard).

!!! info "Figure 6.1-1 : Dimensions du module SF32LB56-MOD"
    Voir la figure 8-1 du DS5602 V0.3.

!!! info "Figure 6.1-2 : Empreinte PCB recommandée"
    Voir la figure 8-2 du DS5602 V0.3. Les dimensions sont en millimètres.

### 6.2 Placement de l'antenne { #62-antenna-placement }

Si le produit utilise l'antenne intégrée sur PCB, réservez la zone d'antenne sans composants ni métal. Placez le module de sorte que la zone d'antenne dépasse du bord de la carte porteuse lorsque c'est possible, avec le point d'alimentation près du bord de la carte.

Si l'antenne ne peut pas dépasser du bord de la carte, prévoyez une zone de dégagement d'au moins 15 mm. Ne placez pas de cuivre, de pistes ou de composants dans cette zone de dégagement, et découpez le matériau de la carte porteuse sous l'antenne PCB autant que possible.

!!! info "Figure 6.2-1 : Placement recommandé du module"
    Voir la figure 8-4 du DS5602 V0.3.

!!! info "Figure 6.2-2 : Zone de dégagement de l'antenne PCB"
    Voir la figure 8-5 du DS5602 V0.3.

### 6.3 Connecteur d'antenne externe { #63-external-antenna-connector }

Pour les conceptions à antenne externe, la fiche technique décrit un connecteur d'antenne externe de première génération compatible avec les connecteurs Hirose série U.FL, I-PEX MHF I et Amphenol AMC.

!!! info "Figure 6.3-1 : Dimensions du connecteur d'antenne externe"
    Voir la figure 8-3 du DS5602 V0.3.

### 6.4 Liste de contrôle de l'implantation { #64-layout-checklist }

<div align="center"><em>Tableau 6.4-1 : Liste de contrôle d'implantation et de routage du PCB</em></div>

<div align="center" markdown>

| Domaine | Vérification |
| :--- | :--- |
| Alimentation | Les condensateurs de 4,7 µF sont près des broches VDD_3V3, VDD_1V8 et VDDIO. |
| Masse | Les broches de masse du module se connectent à un système de masse basse impédance avec des vias de couture près des chemins haute vitesse et RF. |
| Antenne | La zone interdite d'antenne ne comporte aucune intrusion de cuivre, de pistes, de composants, de vis, de blindage, de métal de batterie ou de métal de boîtier. |
| Affichage | Les lignes RGB/SPI du LCD sont courtes, routées en tenant compte de l'impédance et équipées des résistances en série requises. |
| USB | Les lignes USB DP/DM sont routées comme une paire différentielle adaptée avec une protection ESD près du connecteur. |
| Audio analogique | MIC_BIAS, MIC_ADC_IN et les sorties DAC évitent les régulateurs à commutation, les horloges du LCD et les zones d'alimentation RF. |
| Débogage | Le SWD et le chemin de téléchargement/débogage UART sont accessibles sur les prototypes et les gabarits de production. |

</div>

## 7. Validation matérielle { #7-hardware-validation }

### 7.1 Caractéristiques électriques { #71-electrical-characteristics }

<div align="center"><em>Tableau 7.1-1 : Valeurs maximales absolues</em></div>

<div align="center" markdown>

| Symbole | Description | Min | Max | Unité |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | Entrée d'alimentation 3,3 V | -0,3 | 3,6 | V |
| VDD_1V8 | Entrée d'alimentation 1,8 V | -0,3 | 1,95 | V |
| VDDIO | Entrée d'alimentation E/S | -0,3 | 3,6 | V |
| Tstore | Température de stockage | -40 | 125 | °C |

</div>

<div align="center"><em>Tableau 7.1-2 : Conditions de fonctionnement recommandées</em></div>

<div align="center" markdown>

| Symbole | Description | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | Entrée d'alimentation 3,3 V | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | Entrée d'alimentation 1,8 V | 1,7 | 1,8 | 1,95 | V |
| VDDIO | Entrée d'alimentation E/S | 1,7 | - | 3,6 | V |
| TA | Température de fonctionnement | -40 | - | 85 | °C |

</div>

<div align="center"><em>Tableau 7.1-3 : Caractéristiques électriques CC à 3,3 V, 25 °C</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacité de broche | 2,5 | 3 | 3,5 | pF |
| VIH | Tension d'entrée haute | 0,7×VDD | - | VDD | V |
| VIL | Tension d'entrée basse | VSS | - | 0,3×VDD | V |
| IIH | Courant d'entrée haut | - | 10 | 40 | nA |
| IIL | Courant d'entrée bas | - | 10 | 40 | nA |
| VOH | Tension de sortie haute, charge à haute impédance | 0,8×VDD | - | VDD | V |
| VOL | Tension de sortie basse, charge à haute impédance | VSS | - | 0,2×VDD | V |
| IOH | Courant d'attaque de sortie haut | 24 | 30 | 38 | mA |
| IOL | Courant d'attaque de sortie bas | 24 | 30 | 38 | mA |
| RPU | Pull-up interne | 7 | 10 | 20 | kΩ |
| RPD | Pull-down interne | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tension de relâchement du reset | 0,7×VDD | - | VDD | V |
| VIL_nRST | Tension d'activation du reset | VSS | - | 0,3×VDD | V |

</div>

VDD est l'alimentation des E/S. VOH et VOL sont mesurées sous charge à haute impédance.

### 7.2 Consommation électrique { #72-power-consumption }

<div align="center"><em>Tableau 7.2-1 : Courant Bluetooth et BLE à 3,3 V, puissance TX 0 dBm</em></div>

<div align="center" markdown>

| Mode | Condition | Courant typique |
| :--- | :--- | :-: |
| BT Sniff | Intervalle 50 ms | 196,0 µA |
| BT Sniff | Intervalle 1 s | 13,8 µA |
| BLE ADV | Intervalle 50 ms | 228,7 µA |
| BLE ADV | Intervalle 1 s | 15,7 µA |
| Connexion BLE | Intervalle 50 ms | 172,8 µA |
| Connexion BLE | Intervalle 1 s | 11,5 µA |
| Scan | Inquiry Scan ou Page Scan | 36,8 µA |
| Double scan | Inquiry Scan et Page Scan | 64,0 µA |
| Standby | - | 4,6 µA |

</div>

<div align="center"><em>Tableau 7.2-2 : Courant du processeur</em></div>

<div align="center" markdown>

| Charge de travail | Domaine | Fréquence | Courant | Efficacité |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9,38 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7,90 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 48 MHz | 0,92 mA | 30,92 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0,55 mA | 15,13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7,54 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6,30 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0,70 mA | 25,75 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0,44 mA | 10,63 µA/MHz |

</div>

### 7.3 Liste de contrôle du schéma { #73-schematic-checklist }

<div align="center"><em>Tableau 7.3-1 : Liste de contrôle de conception du schéma</em></div>

<div align="center" markdown>

| N° | Point de contrôle |
| :-: | :--- |
| 1 | La plage d'entrée VDD_3V3 est de 2,97–3,6 V ; placez un condensateur de 4,7 µF près de la broche du module. |
| 2 | La plage d'entrée VDD_1V8 est de 1,7–1,95 V ; placez un condensateur de 4,7 µF près de la broche du module. |
| 3 | La plage d'entrée VDDIO est de 1,7–3,6 V ; placez un condensateur de 4,7 µF près de la broche du module. |
| 4 | Lorsque la spécification fixe une interface E/S du module à 3,3 V, vérifiez la compatibilité avec les niveaux des périphériques connectés. |
| 5 | Si le module comporte une Flash interne, PA06, PA07, PA08, PA09, PA10 et PA11 ne peuvent pas être utilisées en externe. |
| 6 | SDIO et MPI3 partagent des ressources d'E/S et ne peuvent pas être utilisés simultanément. |
| 7 | PA50, PA51, PB32 et PB35 peuvent recevoir des interruptions pendant la veille du MCU. |
| 8 | PB32 déclenche une réinitialisation après un appui de 10 s à l'état haut ; une résistance de pull-down de 10 kΩ est requise. |
| 9 | Les broches marquées GPADC_CHx prennent en charge une entrée analogique de 0–3,3 V. |
| 10 | Les broches marquées GPTIM prennent en charge la sortie PWM. |
| 11 | Les interfaces telles que le TP nécessitent des dispositifs de protection ESD. |
| 12 | Les signaux RGB du LCD nécessitent des résistances en série de 33–100 Ω. |
| 13 | PA16 et PA17 multiplexées en DBG_UART sont des broches de téléchargement/débogage du programme et nécessitent des résistances en série de 100 Ω. |

</div>

### 7.4 Stockage, manutention et assemblage { #74-storage-handling-and-assembly }

<div align="center"><em>Tableau 7.4-1 : Exigences de stockage, de manutention et d'assemblage</em></div>

<div align="center" markdown>

| Élément | Exigence |
| :--- | :--- |
| Stockage en sac MBB scellé | Atmosphère sans condensation, à une température inférieure à 40 °C et une humidité relative inférieure à 90 %. |
| Sensibilité à l'humidité | MSL 3. |
| Après ouverture du sac sous vide | Utilisez le module dans les 168 heures à 25 ± 5 °C / 60 % HR ; au-delà, effectuez un séchage au four avant réutilisation. |
| ESD HBM | ±2000 V. |
| ESD CDM | ±500 V. |
| Refusion | SiFli recommande un seul passage de refusion pour le module. |
| Procédé ultrasonique | Évitez le soudage ultrasonique ou le nettoyage ultrasonique ; les vibrations peuvent endommager ou dégrader les cristaux internes. |

</div>

!!! info "Figure 7.4-1 : Profil de température de refusion"
    Voir la figure 9-1 du DS5602 V0.3.

## 8. Documents connexes { #8-related-documents }

<div align="center"><em>Tableau 8-1 : Documents et produits connexes</em></div>

<div align="center" markdown>

| Type | Élément |
| :--- | :--- |
| Fiche technique du module | [Spécification technique DS5602-SF32LB56-MOD V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| Spécification de la puce | Spécification technique de la puce SF32LB56x |
| Guide de carte de développement | Guide utilisateur du SF32LB56-DevKit-LCD |
| Famille de puces | Série SF32LB56xV |
| Module | SF32LB56-MOD |
| Carte de développement | SF32LB56-DevKit-LCD |

</div>

## 9. Annexes { #appendices }

### 9.1. Annexe A. Référence de planification des broches { #appendix-a-pin-planning-reference }

Le DS5602 V0.3 fournit le tableau complet de définition des 89 broches ainsi que leur brochage en vue de dessus. Le tableau ci-dessous met en évidence les broches et groupes de signaux qui influent le plus souvent sur les risques du schéma, l'accès au démarrage et au débogage, ou la planification des ressources partagées.

<div align="center"><em>Tableau 9.1-1 : Groupes de broches et de signaux critiques</em></div>

<div align="center" markdown>

| Broche / Groupe | Fonction / Contrainte |
| :--- | :--- |
| Broche 6 PB17 | UART4_TXD, TX de l'UART par défaut pour les journaux, le téléchargement et le débogage. |
| Broche 7 PB16 | UART4_RXD, RX de l'UART par défaut pour les journaux, le téléchargement et le débogage. |
| Broche 25 BOOT_MODE | État haut : mode de téléchargement ; état bas : mode utilisateur. |
| Broche 26 VDD_3V3 | Rail 3,3 V, plage de fonctionnement 2,97–3,6 V. |
| Broche 27 VDD_1V8 | Rail 1,8 V, plage de fonctionnement 1,7–1,95 V. |
| Broche 29 VDDIO | Rail E/S, plage de fonctionnement 1,7–3,6 V. |
| Broches 43/44 | Sorties DAC différentielles AU_DACP / AU_DACN. |
| Broche 46 MIC_BIAS | Sortie de polarisation du microphone. |
| Broche 47 MIC_ADC_IN | Entrée ADC analogique du microphone. |
| Broches 67–72 PA06–PA11 | Connectées par défaut à la Flash interne ; indisponibles en externe. |
| Broche 79 PB13 | SWDIO débogage/téléchargement. |
| Broche 80 PB15 | SWCLK débogage/téléchargement. |
| PA50, PA51, PB32, PB35 | Broches de réveil capables d'interruption en veille. |
| PA00–PA11 | Niveau d'interface fixé à 3,3 V, indépendamment de VDDIO. |

</div>

## 10. Historique des révisions { #appendix-b-revision-history }

### 10.1. Historique des révisions du guide { #guide-revision-history }

<div align="center"><em>Tableau 10.1-1 : Historique des révisions du guide</em></div>

<div align="center" markdown>

| Version | Date | Notes |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | Guide de conception matérielle initial du module SF32LB56-MOD basé sur le DS5602-SF32LB56-MOD V0.3. |

</div>

### 10.2. Historique des révisions de la fiche technique source { #source-datasheet-revision-history }

<div align="center"><em>Tableau 10.2-1 : Historique des révisions de la fiche technique source</em></div>

<div align="center" markdown>

| Date | Version | Notes de version |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | Mise à jour des descriptions de l'ADC et du DAC audio du chapitre 4. |
| 2025-02 | 0.2 | Mise à jour des broches du module et des informations associées. |
| 2025-01 | 0.1 | Version préliminaire. |

</div>
