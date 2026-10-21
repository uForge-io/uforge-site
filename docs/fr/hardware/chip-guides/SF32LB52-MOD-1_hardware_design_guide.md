---
icon: lucide/book-check
hide:
    - navigation
description: "Guide de conception matérielle pour le module MCU Bluetooth SF32LB52-MOD-1 : alimentation, interfaces et recommandations d'intégration PCB."
tags:
    - Matériel
    - Module
---

# Guide de conception matérielle SF32LB52-MOD-1 { #sf32lb52-mod-1-hardware-design-guide }

## 1. Aperçu { #1-overview }

**SF32LB52-MOD-1** est un module Bluetooth à microcontrôleur basse consommation certifié et polyvalent, construit autour de la puce SF32LB525UC6 de SiFli (Arm Cortex-M33 STAR-MC1 double cœur, jusqu'à 240 MHz). Il intègre un quartz de 48 MHz, un quartz optionnel de 32,768 kHz et, en option, une puce nue OPI-PSRAM de 64 Mb dans le même boîtier monté en surface, qui comporte 68 broches et mesure 27,9 × 18,0 × 3,1 mm.

Ce guide traite de l'intégration matérielle du module : définition des broches, interfaces périphériques, caractéristiques électriques, exigences d'alimentation, schémas de référence, liste de contrôle du schéma, dimensions mécaniques, empreinte PCB et précautions de manipulation. Il s'appuie sur la fiche technique SiFli **DS5203-SF32LB52-MOD-1 V0.3**.

Pour l'architecture sous-jacente de la puce (cœurs, graphiques, sous-système mémoire et périphériques plus en détail), voir [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) et le [Guide de conception matérielle SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Gestion des sources et figures"
    Ce guide suit la fiche technique **DS5203-SF32LB52-MOD-1 V0.3** pour les données techniques spécifiques au module. Certains schémas de brochage, de circuit et de dimensions mécaniques de la fiche technique sont des images matricielles et sont référencés plutôt que redessinés ici. Les numéros de figure et de tableau ci-dessous suivent la numérotation locale de ce guide sur le site ; les légendes des schémas non reproduits citent le numéro de figure correspondant dans la fiche technique officielle.

## 2. Résumé rapide de la conception { #2-quick-design-summary }

### 2.1 Variante du module { #21-module-variant }

<div align="center"><em>Tableau 2.1-1 : Variante du module</em></div>

<div align="center" markdown>

| Code du module | Flash | PSRAM | Température | Dimensions (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | QSPI-NOR 16 Mo | OPI-PSRAM 8 Mo | -40 à 85 °C | 27,9 × 18,0 × 3,1 |

</div>

### 2.2 Spécifications clés { #22-key-specifications }

<div align="center"><em>Tableau 2.2-1 : Spécifications clés</em></div>

<div align="center" markdown>

| Élément | Spécification |
| :--- | :--- |
| Cœur applicatif (HCPU) | Arm Cortex-M33 STAR-MC1, jusqu'à 240 MHz, 512 Ko de SRAM |
| Cœur basse consommation (LCPU) | Arm Cortex-M33 STAR-MC1, jusqu'à 24 MHz, 64 Ko de SRAM |
| Sans fil | Bluetooth 5.3 double mode avec BLE Audio |
| Graphiques | Moteur ePicasso 2.0 2D/2.5D, jusqu'à 512×512, décompression sans perte eZip 2.0 |
| Audio | 1 × DAC audio 24 bits, 1 × ADC audio Sigma-Delta 24 bits |
| Stockage | OPI-PSRAM en boîtier optionnelle (144 MHz) ; 1 × MPI externe (QSPI) ; 1 × SD/SDIO/eMMC |
| Boîtier | 68 broches, 27,9 × 18,0 × 3,1 mm |
| Alimentation | VSYS 3,2–4,7 V (Li-ion) ou 3,7–4,7 V (DCDC/LDO, 3,8 V recommandé) |
| Antenne | Antenne PCB embarquée, ou externe via connecteur IPEX (selon référence commerciale) |
| Température de fonctionnement | -40 à 85 °C |

</div>

## 3. Schéma fonctionnel { #3-functional-block-diagram }

Le module intègre la puce SF32LB525UC6, un quartz de 48 MHz et un quartz optionnel de 32,768 kHz. Sur ce SKU, il intègre également une puce OPI-PSRAM de 64 Mb dans le boîtier, ainsi qu'un réseau d'adaptation RF et le point d'alimentation de l'antenne.

!!! info "Figure 3-1 : Schéma fonctionnel"
    Voir la Figure 2-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

## 4. Définition des broches { #4-pin-definition }

### 4.1 Schéma de brochage { #41-pinout-diagram }

Le module expose 68 broches sur son pourtour. La broche 1 est marquée au coin proche de la zone d'antenne ; les broches sont numérotées dans le sens antihoraire autour du boîtier.

!!! info "Figure 4.1-1 : Schéma de brochage, vue de dessus"
    Voir la Figure 3-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 4.2 Tableau de définition des broches { #42-pin-definition-table }

Le module compte 68 broches au total, décrites dans le tableau ci-dessous.

<div align="center"><em>Tableau 4.2-1 : Tableau de définition des broches</em></div>

<div align="center" markdown>

| Nom | N° | Type | MUX par défaut | E/S par défaut | Fonction |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Ground | P | Masse |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *si le quartz 32K interne du module est monté, PA23 n'est pas disponible en externe* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *si le quartz 32K interne du module est monté, PA22 n'est pas disponible en externe* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | Sortie d'alimentation 3,3 V |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | Ground | P | Masse |
| VSYS | 27 | P | VSYS | P | Entrée d'alimentation principale. Plage batterie Li-ion 3,2–4,7 V ; lorsqu'alimenté via un DCDC/LDO (non Li-ion), la plage est de 3,7–4,7 V, 3,8 V recommandé |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Sortie différentielle DAC audio, positive |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Sortie différentielle DAC audio, négative |
| GND | 35 | P | Ground | P | Masse |
| MIC_BIAS | 36 | P | MIC_BIAS | P | Tension de polarisation du microphone |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | Entrée audio analogique |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | Ground | P | Masse (13 broches) |
| VBATS | 61 | P | VBAT | P | Entrée de détection de tension batterie |
| NC | 62 | — | NC | — | Non connectée |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Légende : P = alimentation ; I = entrée ; O = sortie ; T = configurable en haute impédance ; AO = sortie audio ; AI = entrée audio.*

!!! note
    La broche 29 (DBG_UART_TXD) et la broche 30 (DBG_UART_RXD) constituent le port par défaut pour les logs, le débogage de programme et le téléchargement de programme.

### 4.3 Description physique des broches { #43-physical-pin-description }

Le schéma de description physique des broches de la fiche technique indique les groupes fonctionnels sur le contour de la puce SF32LB525UC6 : SDIO, SPI, I2C, UART, GPTIM, interface LCD, GPADC, MPI, audio analogique, oscillateur externe 32K, réveil externe et SWD/UART de débogage. Utilisez ce schéma avec le tableau de définition des broches ci-dessus pour organiser les groupes de signaux sur la PCB hôte.

!!! info "Figure 4.3-1 : Description physique des broches"
    Voir la Figure 3-2 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

## 5. Périphériques { #5-peripherals }

### 5.1 Interfaces de communication { #51-communication-interfaces }

Toute broche marquée `PAxx_I2C_UART` dans le tableau ci-dessus peut être configurée en I2C ou en UART. La fiche technique indique un maximum configurable de 4 interfaces I2C et 3 interfaces UART.

!!! important "Incohérence du nombre de périphériques dans la fiche technique"
    Plus loin, la même fiche technique énumère I2C1 à I2C7 et UART1 à UART6, en contradiction avec les maxima indiqués. Confirmez auprès de SiFli le nombre réellement disponible pour la configuration exacte du module/SoC ; ne déduisez pas de la numérotation que toutes ces interfaces peuvent fonctionner simultanément.

**UART** — Fonctionnement en duplex intégral, débit jusqu'à 6 Mbps, format de données configurable, contrôle de flux matériel (CTS/RTS) et émission/réception de plusieurs paquets par DMA. UART1–3 sont sur HPSYS ; UART4–6 sont sur LPSYS.

**I2C** — Fonctionne en modes maître et esclave, avec une FIFO de 8 octets et la prise en charge du DMA. Il prend en charge les modes standard (100 kbps), rapide (400 kbps), rapide-plus (1 Mbps) et haute vitesse (3,4 Mbps), l'adressage sur 7 ou 10 bits en mode maître, ainsi qu'un filtre numérique anti-glitch configurable. I2C1–4 sont sur HPSYS ; I2C5–7 sont sur LPSYS.

**SPI** — Prend en charge les formats SSP/SPI (duplex intégral, maître ou esclave) et Microwire (semi-duplex, maître uniquement). La largeur des données est de 4 à 32 bits ; la polarité et la phase de l'horloge (SPO/SPH), ainsi que la polarité de sélection du circuit, sont configurables. La FIFO contient 16 entrées de 32 bits ; le DMA est pris en charge, avec une horloge jusqu'à 48 MHz.

**USB2.0 FS** — Un port hôte/périphérique pleine vitesse, avec points de terminaison configurables, suspension/reprise, dimensionnement dynamique de la FIFO, prise en charge du protocole de demande de session et du protocole de négociation de l'hôte, ainsi qu'un PHY USB2.0 FS intégré.

**MPI (Memory Peripheral Interface)** — Prend en charge la Flash SPI NOR (1/2/4 lignes) et la Flash SPI NAND (1/2/4 lignes), accès en mode registre et en mode mappé mémoire avec commutation matérielle automatique. L'interface MPI2 du module peut se connecter à une Flash SPI NOR/NAND externe. Si la Flash est déjà présente à l'intérieur du module, les six signaux externes de MPI2 (PA12, PA13, PA14, PA15, PA16, PA17) ne sont pas disponibles en externe.

**SD/SDIO/eMMC** — Conforme aux normes SD 3.0, SDIO 3.0 et eMMC 4.5.1 ; prend en charge les cartes SDSC/SDHC/SDXC/SDHS, les modes SDR12/25/50, les modes SDR à une ou quatre lignes, une FIFO de 2 Ko et les transferts de données par DMA. La fréquence peut atteindre 48 MHz (DDR non pris en charge). L'interface SDIO partage les E/S avec MPI2 : les deux ne peuvent pas être utilisées simultanément.

**I2S** — Modes maître/esclave, duplex intégral, formats à justification à gauche, à droite ou standard ; mono/stéréo en 8 ou 16 bits, avec une largeur PCM maximale de 24 bits.

**Interface LCD** — Mode SPI série DBI (3 fils/4 fils, ligne de données double/quadruple) et mode parallèle 8080 (largeur de bus 8/16/24 bits). Prend en charge les formats de couleur RGB332/RGB444/RGB565/RGB666/RGB888 selon le mode.

### 5.2 Traitement du signal analogique { #52-analog-signal-processing }

**GPADC 12 bits** — ADC SAR, fréquence d'échantillonnage maximale de 4 MS/s, plage d'entrée de 0 à 3,3 V en mode asymétrique et de ±2,1 V en mode différentiel. Il offre 7 canaux asymétriques et 1 canal de mesure de la tension de batterie (ou 3 paires différentielles), des modes de mesure unique et continue, 4 créneaux temporels configurables par mesure, le déclenchement logiciel ou matériel et la prise en charge du DMA.

**Capteur de température** — Résolution de 0,2 °C, plage de -40 °C à 125 °C et précision de ±3 °C ; lecture par scrutation ou interruption.

**DAC audio** — Une voie de sortie DAC 24 bits, avec des fréquences d'échantillonnage de 8 à 48 kHz et une sortie différentielle.

**PLL audio** — Génération d'horloge fractionnaire-N avec une résolution de 48 MHz/2^18, prenant en charge les fréquences d'échantillonnage dérivées suivantes : 48 MHz, 32,768 kHz et 44,1 kHz.

**ADC audio** — Une voie d'entrée ADC Sigma-Delta 24 bits, avec des fréquences d'échantillonnage de 8 à 48 kHz.

## 6. Caractéristiques électriques { #6-electrical-characteristics }

### 6.1 Valeurs limites absolues { #61-absolute-maximum-ratings }

Dépasser les valeurs du tableau ci-dessous peut endommager le module de façon permanente. Il s'agit uniquement de valeurs de contrainte ; un fonctionnement au-delà des conditions de fonctionnement recommandées au §6.2 n'est pas garanti. Une exposition prolongée aux conditions limites absolues peut réduire la fiabilité du module.

<div align="center"><em>Tableau 6.1-1 : Valeurs limites absolues</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Max | Unité |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | Tension de la broche d'alimentation | -0,3 | 4,7 | V |
| Tstore | Température de stockage | -40 | 125 | °C |

</div>

### 6.2 Conditions de fonctionnement recommandées { #62-recommended-operating-conditions }

<div align="center"><em>Tableau 6.2-1 : Conditions de fonctionnement recommandées</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Alimentation batterie Li-ion | 3,2 | - | 4,7 | V |
| VSYS | Alimentation non Li-ion via DCDC/LDO | 3,7 | 3,8 | 4,7 | V |
| TA | Température de fonctionnement | -40 | - | 85 | °C |

</div>

### 6.3 Caractéristiques électriques CC (3,3 V, 25 °C) { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>Tableau 6.3-1 : Caractéristiques électriques CC (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Symbole | Paramètre | Min | Typ | Max | Unité |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Capacité de broche | 2,5 | 3 | 3,5 | pF |
| VIH | Tension d'entrée haute | 0,7×VDD | - | VDD | V |
| VIL | Tension d'entrée basse | VSS | - | 0,3×VDD | V |
| IIH | Courant d'entrée haut | - | 10 | 40 | nA |
| IIL | Courant d'entrée bas | - | 10 | 40 | nA |
| VOH | Tension de sortie haute (charge haute impédance) | 0,8×VDD | - | VDD | V |
| VOL | Tension de sortie basse (charge haute impédance) | VSS | - | 0,2×VDD | V |
| IOH | Courant d'attaque de sortie haut | 24 | 30 | 38 | mA |
| IOL | Courant d'attaque de sortie bas | 24 | 30 | 38 | mA |
| RPU | Rappel interne vers le haut (Vpad=0,8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Rappel interne vers le bas (Vpad=0,2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Tension de relâchement de la réinitialisation | 0,7×VDD | - | VDD | V |
| VIL_nRST | Tension d'activation de la réinitialisation | VSS | - | 0,3×VDD | V |

</div>

VDD est le rail d'alimentation des E/S ; VOH/VOL sont mesurées sous charge haute impédance.

### 6.4 Consommation électrique { #64-power-consumption }

<div align="center"><em>Tableau 6.4-1 : Courant moyen Bluetooth et BLE (alimentation 3,8 V)</em></div>

<div align="center" markdown>

| Mode | Intervalle | @0 dBm | @4 dBm | @10 dBm | Unité |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 129,5 | 135,6 | 160,9 | µA |
| BT Sniff (attempt=1) | 1 s | 6,0 | 6,3 | 7,6 | µA |
| BLE ADV | 50 ms | 171,6 | 217,6 | 298,3 | µA |
| BLE ADV | 1 s | 8,9 | 9,5 | 17,0 | µA |
| Connexion BLE | 50 ms | 95,0 | 105,0 | 118,7 | µA |
| Connexion BLE | 1 s | 4,1 | 4,6 | 9,1 | µA |
| Balayage (Inquiry ou Page) | — | 33,4 | — | — | µA |
| Balayage combiné (Inquiry et Page) | — | 67,3 | — | — | µA |
| Veille | — | 20,0 | — | — | µA |

</div>

<div align="center"><em>Tableau 6.4-2 : Consommation électrique du processeur (alimentation 3,8 V)</em></div>

<div align="center" markdown>

| Horloge | Courant (µA) | Incrément (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192 MHz | 7360 | 35 |
| CoreMark @48 MHz | 1550 | 27 |
| WhileLoop @192 MHz | 5490 | 27 |
| WhileLoop @48 MHz | 1250 | 20 |

</div>

### 6.5 Performances RF Bluetooth bimode { #65-dual-mode-bluetooth-rf-performance }

Prend en charge le Bluetooth 5.3, rétrocompatible avec 4.2/4.1/4.0. Fréquence centrale du canal de fonctionnement : 2402–2480 MHz.

**Émetteur BLE (1 Mbps)** : puissance maximale de 19 dBm, plage de contrôle de puissance de -20 à 19 dBm, Δf1avg = 250 kHz typ. et Δf2max = 210 kHz typ. Il s'agit de valeurs d'excursion de fréquence (la fiche technique intitule ces paramètres modulation maximale/minimale), et non d'un indice de modulation sans dimension. La tolérance initiale typique de la fréquence porteuse est de ±20 kHz.

**Récepteur BLE (1 Mbps)** : sensibilité -100 dBm (mode dirty désactivé) / -99,3 dBm (mode dirty activé) @30,8 % PER, C/I co-canal 7 dB.

**BT classique (Basic Data Rate)** : puissance d'émission max 18 dBm ; sensibilité du récepteur -96,3 dBm (mode dirty désactivé) / -94 dBm (mode dirty activé) @0,1 % BER.

**BT classique (Enhanced Data Rate)** : puissance d'émission max 13 dBm ; sensibilité du récepteur π/4-DQPSK -95,5 dBm ; sensibilité du récepteur 8DPSK -88,5 dBm.

Les tableaux complets min/typ/max pour toutes les performances TX/RX BLE 1 Mbps/2 Mbps et les performances TX/RX BT classique BR/EDR sont fournis au §5.5 de la fiche technique officielle.

## 7. Alimentation du module { #7-module-power-supply }

Le module dispose d'une entrée d'alimentation principale unique, **VSYS**, qui peut être alimentée directement par une batterie Li-ion/Li-Po (3,2–4,7 V) ou par un régulateur DCDC/LDO (3,7–4,7 V, 3,8 V recommandé).

**VBATS** est la broche de détection de tension batterie, échantillonnée en interne par un ADC sur une plage de 0–4,7 V. N'utilisez pas de pont diviseur résistif externe sur VBATS — connectez directement le signal à mesurer à la broche.

**VDD33_VOUT2** est la sortie du LDO interne 3,3 V du module et peut alimenter jusqu'à 150 mA de périphériques externes ; la capacité totale sur ce rail ne doit pas dépasser 7,4 µF.

## 8. Schéma de référence et affectation des broches { #8-reference-schematic-and-pin-assignment }

La fiche technique fournit un schéma de référence complet pour une carte de développement basée sur le SF32LB52-MOD-1, couvrant l'alimentation, la réinitialisation, JTAG/SWD, UART, SDIO, LCD, et les circuits audio.

!!! info "Figure 8-1 : Schéma de référence de la carte de développement"
    Voir les Figures 7-2 à 7-6 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

La fiche technique fournit également un tableau d'affectation des broches recommandé pour cette carte de référence.

!!! info "Figure 8-2 : Affectation des broches recommandée pour la carte de référence"
    Voir la Figure 7-7 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

Utilisez ces éléments comme point de départ pour un schéma de production et adaptez la sélection des broches aux périphériques utilisés dans votre produit.

## 9. Liste de contrôle de conception du schéma { #9-schematic-design-checklist }

<div align="center"><em>Tableau 9-1 : Liste de contrôle de conception du schéma</em></div>

<div align="center" markdown>

| # | Point de contrôle |
| :-: | :--- |
| 1 | VSYS peut se connecter directement à une batterie Li-ion ; si alimenté via DCDC/LDO, 3,8 V est recommandé. VBATS est la broche de détection de tension batterie (plage 0–4,7 V) — n'utilisez pas de pont diviseur résistif externe ; connectez directement le signal à mesurer à VBATS. |
| 2 | Placez un condensateur 4,7 µF et un condensateur 0,1 µF près de la broche VSYS. |
| 3 | Placez un condensateur de 0,1 µF près de la broche VBATS. |
| 4 | VDD33_VOUT2 est la sortie du LDO 3,3 V, courant max 150 mA — ne dépassez pas cette valeur avec la charge externe. |
| 5 | La capacité totale sur VDD33_VOUT2 doit être ≤ 7,4 µF. |
| 6 | Le niveau logique de l'interface IO du module est 3,3 V — tout périphérique connecté doit également utiliser des niveaux logiques 3,3 V. |
| 7 | Si le module a un quartz 32K interne monté, PA22 et PA23 ne sont pas disponibles en externe. |
| 8 | Si la Flash est déjà présente à l'intérieur du module, les 6 signaux MPI2 (PA12, PA13, PA14, PA15, PA16, PA17) ne sont pas disponibles en externe. |
| 9 | L'interface SDIO et MPI2 partagent les IO et ne peuvent pas être utilisées simultanément. |
| 10 | Les broches marquées `#GPADC_CHx` dans le tableau des broches prennent en charge une entrée analogique dans la plage 0–3,3 V. |
| 11 | Les broches marquées `PAxx_TIM` dans le tableau des broches prennent en charge une sortie PWM. |
| 12 | PA34 prend en charge une réinitialisation par appui long de 10 secondes, active à l'état haut ; ajoutez une résistance de rappel vers le bas (pull-down) de 10 kΩ dans la conception. |
| 13 | Réservez des composants de protection ESD pour les interfaces de batterie et d'écran tactile (TP), ainsi que pour les autres interfaces exposées à l'extérieur, si nécessaire. |
| 14 | PA18/PA19, lorsqu'ils sont multiplexés en DBG_UART pour la programmation et le débogage, devraient chacun comporter une résistance série de 100 Ω. |

</div>

## 10. Dimensions du module et empreinte PCB { #10-module-dimensions-and-pcb-footprint }

### 10.1 Dimensions du module { #101-module-dimensions }

Le module mesure 27,9 × 18,0 × 3,1 mm.

!!! info "Figure 10.1-1 : Dimensions du module — vues de dessus, de côté et de dessous"
    Voir la Figure 8-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.2 Empreinte PCB recommandée { #102-recommended-pcb-footprint }

!!! info "Figure 10.2-1 : Empreinte PCB recommandée"
    Voir la Figure 8-2 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.3 Connecteur d'antenne externe { #103-external-antenna-connector }

Pour les SKU prenant en charge une antenne externe, le module utilise une empreinte de connecteur de première génération compatible avec :

- Hirose série U.FL
- Connecteurs I-PEX MHFI
- Connecteurs Amphenol AMC

!!! info "Figure 10.3-1 : Dimensions du connecteur d'antenne externe"
    Voir la Figure 8-3 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 10.4 Placement du module dans la conception PCB { #104-module-placement-in-pcb-design }

Si le produit final utilise une conception avec module monté sur la carte, réservez de l'espace afin qu'aucun autre composant ou zone métallique ne chevauche la zone d'antenne PCB du module, pour éviter de dégrader l'efficacité de rayonnement. Planifiez la position du module sur la carte hôte pour minimiser l'impact sur les performances de l'antenne.

Pratique recommandée :

- Prolongez la zone d'antenne du module au-delà du bord de la carte hôte, avec le point d'alimentation proche du bord de la carte.

!!! info "Figure 10.4-1 : Placement recommandé du module"
    Voir la Figure 8-4 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

- Si l'antenne ne peut pas dépasser le bord de la carte, prévoyez une zone d'exclusion d'au moins 15 mm autour de l'antenne PCB — sans plan de cuivre, pistes, ou composants — et découpez le matériau de la carte hôte sous l'antenne lorsque c'est possible.

!!! info "Figure 10.4-2 : Zone d'exclusion de l'antenne"
    Voir la Figure 8-5 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

- Gardez le point d'alimentation de l'antenne proche du bord de la carte même dans la disposition avec zone d'exclusion.
- Pour les conceptions de produit final complètes, évaluez l'effet du boîtier sur l'antenne et effectuez une validation RF, y compris un test final de portée de communication sur le produit fini.

## 11. Manipulation du produit { #11-product-handling }

### 11.1 Conditions de stockage { #111-storage-conditions }

- Stockez les produits scellés dans un sac barrière anti-humidité (MBB) à <40 °C / 90 % HR, sans condensation.
- Niveau de sensibilité à l'humidité du module (MSL) : 3.
- Après ouverture du sac sous vide, utilisez le module dans les 168 heures à 25 ± 5 °C / 60 % HR ; dans le cas contraire, étuvez-le avant sa réintroduction dans la ligne de production.

### 11.2 Décharge électrostatique (ESD) { #112-electrostatic-discharge-esd }

- Modèle du corps humain (HBM) : ±2000 V
- Modèle du dispositif chargé (CDM) : ±500 V

### 11.3 Profil de refusion { #113-reflow-profile }

Il est recommandé de ne faire passer le module en refusion qu'une seule fois.

!!! info "Figure 11.3-1 : Profil de température de refusion recommandé"
    Voir la Figure 9-1 de la fiche technique officielle pour ce schéma — non reproduit dans ce guide.

### 11.4 Vibrations ultrasoniques { #114-ultrasonic-vibration }

Évitez d'exposer les modules SiFli aux vibrations d'un équipement de soudage par ultrasons ou de nettoyage par ultrasons. Les vibrations ultrasoniques peuvent entrer en résonance avec les oscillateurs à quartz internes du module, provoquant une défaillance ou un dysfonctionnement du quartz, et peuvent rendre le module inopérant ou dégrader ses performances.

## 12. Documents connexes { #12-related-documents }

- [Fiche technique DS5203-SF32LB52-MOD-1 (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [Introduction à la puce SF32LB52x](../../sf32-products/chips/SF32LB52x.md)
- [Guide de conception matérielle SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. Historique des révisions { #13-revision-history }

<div align="center"><em>Tableau 13-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Date | Version | Notes |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | Mise à jour de la Figure 2-1 |
| 2025-03 | 0.2 | Révision des descriptions liées à l'alimentation ; mise à jour des Figures 3-1 et 6-3 |
| 2024-12 | 0.1 | Version préliminaire |

</div>

Ce guide est basé sur le contenu de la fiche technique ci-dessus ; reportez-vous au PDF officiel pour la révision faisant autorité et la plus à jour.
