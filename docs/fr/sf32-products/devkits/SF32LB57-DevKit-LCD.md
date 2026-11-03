---
icon: lucide/circuit-board
description: "Carte d'évaluation modulaire SF32LB57-DevKit-LCD : écran RGB, caméra DVP, deux microphones PDM, sortie haut-parleur, Wi-Fi via SDIO et USB."
tags:
    - Hardware
    - Development board
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## Vue d’ensemble { #overview }

La SF32LB57-DevKit-LCD est une carte d'évaluation multimédia basée sur **SF32LB57-MOD-WD**, un module que SiFli semble prévoir comme produit. **WD** pourrait signifier **Wi-Fi Dual-band** (« Wi-Fi double bande »), mais cette interprétation n'est pas confirmée. La carte associe la MCU SF32LB57x, le Wi-Fi via SDIO, une Flash de démarrage et des interfaces pour périphériques. Elle convient aux IHM intelligentes, aux terminaux à caméra, aux interphones et aux écrans connectés ; elle permet de valider l'affichage, la capture, l'audio et la connectivité avant de concevoir une carte porteuse.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — Vue de face" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vue de face</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — Vue de dos" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Vue de dos</figcaption></figure>
</div>

## Ressources de la carte { #board-resources }

La source indique deux cœurs de performance STAR-MC1 à 240 MHz, pour un score combiné de 1968 CoreMark, ainsi que 592 KB de SRAM à rétention (512 KB HPSYS + 80 KB LPSYS). Consultez [SF32LB57x](../chips/SF32LB57x.md) pour l'architecture multicœur complète. Le module comprend une Flash QSPI-NOR de démarrage, une OPI-PSRAM selon la variante, un quartz MCU de 48 MHz et un quartz Wi-Fi de 40 MHz. Vérifiez le marquage du module avant de choisir la configuration mémoire.

La source précise que cette variante SF32LB57x est alimentée en 3,3 V et que des demi-trous métallisés permettent de monter le module sur une carte porteuse. L'OPI-PSRAM est facultative et dépend de la référence exacte ; elle n'est pas présente dans toutes les configurations.

<div align="center"><em>Ressources de la carte</em></div>

<div align="center" markdown>

| Composant / Connecteur | Implémentation |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM (facultative); SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0,5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0,5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2,54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

SiFli identifie le circuit Wi-Fi comme AIC8800D40LS-N et le décrit parfois comme un module combinant Wi-Fi et Bluetooth. Distinguez cette fonction du Bluetooth de la MCU SF32. Vérifiez le circuit monté, la commutation RF et les pilotes du SDK ; ne présumez pas qu'une seconde liaison Bluetooth est exploitable. La carte comporte un connecteur d'antenne IPEX-1 ainsi que des commandes d'alimentation, de réveil et de commutation de l'antenne Wi-Fi.

![Schéma fonctionnel](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram-en.svg){ width="100%" loading="lazy" }
<div align="center"><em>Schéma fonctionnel</em></div>

Le schéma fonctionnel d'origine décrit les fonctions, pas le câblage de référence. Il montre les lignes TF D0–D3 et place WS2812B sous l'extension d'E/S, tandis que le texte indique un SDIO TF sur 1 bit et une commande directe par la MCU sur PA_11/PA_08 selon la révision. Vérifiez ces connexions dans le schéma et la configuration des broches du SDK correspondant.

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — Composants côté face" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Composants côté face</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — Composants côté dos" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Composants côté dos</figcaption></figure>
</div>

## Premier démarrage { #getting-started }

Pour les essais d'affichage, prévoyez la carte, une dalle DPI-RGB compatible avec un connecteur de 40 broches au pas de 0,5 mm, un câble USB de données et un ordinateur Windows, Linux ou macOS. L'antenne IPEX-1, la caméra DVP, une carte MicroSD/TF, un haut-parleur de 8 Ω et un J-Link ou DAP-Link sont facultatifs. Pour utiliser simultanément les journaux UART et l'USB natif, il faut deux câbles de données.

1. Hors tension, vérifiez la broche 1, l'orientation des contacts FPC et la tension de la dalle, puis raccordez-la à FPC1. Montez l'antenne avant tout essai radio.
2. Raccordez le port Type-C USB-to-UART, pas le port USB natif, puis sélectionnez son port COM dans SifliTrace ou Impeller.
3. Pour programmer la carte, placez le cavalier BOOT MODE J1 avant la mise sous tension ou la réinitialisation. Retirez J1, puis réinitialisez la carte pour démarrer normalement avec les journaux série.
4. Validez d’abord hello-world sur le port série, puis un écran uni et le tactile, si présent. Ajoutez séparément caméra, audio, stockage et radio avant les essais de coexistence.

Avec le firmware d'usine, la carte peut afficher son interface par défaut à la mise sous tension ; cela dépend du firmware et de la dalle. Un écran noir ne suffit pas à conclure à un échec de programmation. Consultez [Premiers pas avec SiFli-SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) pour les outils, l'environnement et le flashage.

## Cibles de compilation du SDK { #sdk-build-targets }

La configuration actuelle du SDK répertorie les cibles suivantes. Ce sont des identifiants précis ; ils ne garantissent pas que toute carte SF32LB57-MOD-WD soit compatible avec chacune d'elles. Faites correspondre la mémoire, l'écran, les broches et la révision à la version du SDK utilisée. La source n'établit pas de correspondance entre les révisions du module WD et ces noms.

- `sf32lb57-lcd_n16r16_dpi`
- `sf32lb57-lcd_n16r8_dpi`
- `sf32lb57-lcd_n16r16_qspi`

Après avoir configuré l'environnement SDK, utilisez cet exemple hello-world **uniquement avec le matériel correspondant à la configuration N16R16 DPI**. Une exécution réussie sur UART ne valide pas les pilotes d'écran, de caméra ou de Wi-Fi.

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb57-lcd_n16r16_dpi -j8
```

## Alimentation et débogage { #power-and-debug }

Chaque connecteur Type-C peut alimenter la carte en 5 V. U4 (ETA3425D2G) produit `VDD_3V3` ; U7 (ETA3425D2G) produit `WF_3V3`, activé indépendamment par `IOEX_WF_PWREN`. Le pont USB-to-UART est un CH343P ; l'autre connecteur expose l'USB 2.0 FS sur `PA35`/`PA36`. Pour le SWD, utilisez `PA_43` (SWCLK), `PA_44` (SWDIO), la tension de référence cible de 3,3 V et une masse commune. Ne raccordez pas une sortie 5 V du débogueur à une broche 3,3 V.

Le schéma SWD affecte respectivement les broches 17, 18, 19 et 20 de J3 à 3,3 V, SWCLK, SWDIO et GND. Ces numéros désignent les broches du connecteur de la carte, pas celles de l'adaptateur du débogueur ; raccordez les deux côtés en suivant les noms de signaux.

![Câblage SWD](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>Câblage SWD</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptateur J-Link" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptateur J-Link</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — Adaptateur SWD" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>Adaptateur SWD</figcaption></figure>
</div>

## Affichage et caméra { #display-and-camera }

FPC1 est un connecteur `FPC-05FB-40PH20` de 40 broches au pas de 0,5 mm, suivant le brochage RGB d'ALIENTEK. RGB888 est le mode par défaut ; RGB565/RGB666 peuvent libérer des broches si la dalle et le firmware le permettent. FreeIO permet aussi d'expérimenter avec QSPI, MCU8080, EPD et JDI en adaptant ce connecteur, avec l'adaptateur, l'alimentation et le firmware appropriés. Il ne s'agit pas de connexions DSI natives.

Selon la source, un module basé sur QFN80 ou BGA112 est nécessaire pour le RGB888 complet sur 24 bits. Elle décrit ePicasso 3.0 comme un accélérateur graphique 2D/2.5D. La broche 1 de FPC1 fournit les 5 V du rétroéclairage ou du convertisseur élévateur du pilote d'affichage ; ce n'est pas une GPIO 3,3 V. Les broches 3 et 5 de J3 partagent le bus I2C de configuration de la caméra et du tactile sur PA_23/PA_22.

!!! warning
    La source donne une limite de traitement ePicasso 3.0 de 2048 × 2048 et un rafraîchissement plein écran de 60 fps, tout en précisant que la résolution et la fréquence dépendent de la dalle. Cela ne garantit pas un affichage en 2048 × 2048 à 60 fps : vérifiez la temporisation du LCDC, l'interface, les tampons d'image, la bande passante et la charge mesurée. L'affectation des broches 37–40 de FPC1 reste indéterminée : cinq signaux sont proposés pour quatre contacts. Consultez `57x LCD-DevKit ioconfig-08192026.xlsx` et le schéma correspondant avant tout raccordement.

![Raccordement de la dalle RGB](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Raccordement de la dalle RGB</em></div>

FPC4 est un connecteur DVP de l'interface DCMI, à 24 broches au pas de 0,5 mm. La source cite GC032A, OV2640, OV5640 et OV3660 ; OV2640/OV5640 sont les références par défaut. D'autres modules peuvent nécessiter une adaptation des alimentations conformément au schéma. Les rails comprennent `DVDD_1V5`, `DVDD_2V8` et `AVDD_2V8` : respectez les exigences du capteur, pas seulement celles du connecteur. Des cavaliers sélectionnent les lignes DVP partagées avec le Wi-Fi SDIO ou le SDIO de la carte TF. Par défaut, les fonctions en conflit ne peuvent pas être utilisées simultanément.

Les trois rails d'alimentation de la caméra sont fournis par des LDO indépendants. L'image annotée de la face avant indique 22 broches, alors que le texte et le tableau FPC4 en indiquent 24. Utilisez le tableau à 24 broches comme référence documentaire, puis vérifiez le connecteur réel et le schéma avant le raccordement. L'affectation de réinitialisation de la broche 6 de FPC4 (IOEX_DVP_PDN/RESET) reste également ambiguë ; vérifiez le câblage sans présumer que les commandes de réinitialisation et de mise hors service sont indépendantes.

![Raccordement de la caméra](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>Raccordement de la caméra</em></div>

## Broches partagées et révisions { #shared-pins-and-revisions }

- `PA35`/`PA36` sont affectées à la fois à FPC1 et à l'USB FS natif : n'utilisez pas simultanément les connexions de dalle en conflit et la fonction périphérique USB.
- Le SWD sur `PA_43`/`PA_44` partage des broches avec l'écran et la caméra. Préservez une voie de récupération par débogage.
- WS2812B utilise `PA_11` sur V1.0 et `PA_08` sur V1.1. La source affecte également `PA_11` à `BL_PWM` ; résolvez ce conflit avant de piloter la LED ou le rétroéclairage.
- J3 reprend les affectations d'alimentation et de masse du connecteur Raspberry Pi à 40 broches, mais pas son environnement logiciel ni une compatibilité HAT universelle. Vérifiez la tension, le pinmux et les signaux partagés avant d'ajouter une extension.

## Audio, boutons et extension d’E/S { #audio-controls-and-io-expansion }

La source décrit une sortie audio par DAC 24 bits, acheminée via l'amplificateur mono Class-D U8 (NS4150B) vers J7 (`MX1.25-2P`), avec un haut-parleur de 8 Ω comme configuration par défaut. Les deux microphones PDM, MSM261DGT007 ou LMD4020T261-AC23, sont compatibles broche à broche. `PA_56` porte l'horloge PDM et `PA_55` les données ; `IOEX_PDM_PWREN` commande leur alimentation et `IOEX_AU_PA_EN` active l'amplificateur. Vérifiez le format audio réel, le gain et les limites du haut-parleur avant l'intégration au produit.

S1–S3 partagent `PA_34` / `GPADC_CH6` ; selon la source, les tensions correspondant aux touches sont de 2,97 V, 2,58 V et 2,19 V. S4 est `KEY_RSTN`, actif à l'état bas. U11 (AW9523BTOR) fournit 16 E/S via I2C sur `PA_22` (SCL) et `PA_23` (SDA). Le tableau reprend les états par défaut indiqués dans la source ; vérifiez la réinitialisation et l'initialisation du firmware sur votre carte. P0_2/P0_3 ne sont pas spécifiées dans le tableau d'origine.

<div align="center"><em>États initiaux de l’extension d’E/S</em></div>

<div align="center" markdown>

| Port | Signal / Repère | État initial | Sens | Fonction |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3,3 V | Sortie | Commutation d’antenne 2,4 GHz |
| P1_1 | IOEX_LED_R | 3,3 V | Sortie | LED rouge |
| P1_2 | IOEX_LED_G | 3,3 V | Sortie | LED verte |
| P1_3 | IOEX_LED_B | 3,3 V | Sortie | LED bleue |
| P1_4 | IOEX_WF_PWRKEY | 0 V | Sortie | Touche d’alimentation du module Wi-Fi |
| P1_5 | IOEX_WF_PWREN | 0 V | Sortie | Activation du convertisseur abaisseur Wi-Fi 3,3 V |
| P1_6 | IOEX_CTP_RST | 0 V | Sortie | Réinitialisation du contrôleur tactile |
| P1_7 | IOEX_LCD_RESET | 0 V | Sortie | Réinitialisation LCD |
| P0_0 | IOEX_USB_DET | Hi-Z | Entrée | Détection de connexion USB |
| P0_1 | IOEX_TF_DET | Hi-Z | Entrée | Détection d’insertion de carte TF |
| P0_4 | IOEX_PDM_PWREN | 0 V | Sortie | Activation de l’alimentation des microphones PDM |
| P0_5 | IOEX_AU_PA_EN | 0 V | Sortie | Activation de l’amplificateur audio |
| P0_6 | IOEX_DVP_PDN | 0 V | Sortie | Mise hors service de la caméra |
| P0_7 | IOEX_HST_WAK_WF | 0 V | Sortie | Réveil du Wi-Fi par l’hôte |

</div>

## Référence des connecteurs { #connector-reference }

!!! warning
    Ces tableaux reprennent les affectations de la source et ne remplacent pas le schéma. Le résumé du module est incomplet (`58~?`) et attribue les signaux USB_DP/USB_DM à `PA_00`/`PA_01`, en contradiction avec l'affectation explicite de l'USB natif à `PA35`/`PA36`. Distinguez le numéro de pastille du module du GPIO de la MCU. N'utilisez pas les lignes non résolues pour concevoir la carte.

<div align="center"><em>Pastilles du module : entrées non résolues conservées</em></div>

<div align="center" markdown>

| Broche | Signal / Repère | Fonction |
|:---|:---|:---|
| 1 | GND | Masse |
| 2 | VDD_3V3 · 3,3 V | Entrée d’alimentation 3,3 V |
| 3 | VDD_1V8 · 1,8 V LDO | Sortie 1,8 V du LDO interne |
| 4 | RSTN | Réinitialisation ; reliée au bouton de réinitialisation |
| 5~22 | PA_41 ~ PA_24 | Multiplexage GPIO / LCDC / SPI / SD / débogage |
| 23~36 | PA_23 ~ PA_10 | Multiplexage GPIO / I2C / SD / USB / audio / débogage |
| 37 | DAC1P | Sortie différentielle DAC P |
| 38 | DAC1N | Sortie différentielle DAC N |
| 39 | MICBIAS_PA56 / PDM_CLK | Polarisation microphone / horloge PDM |
| 40 | ADC1P_PA55 / PDM_DAT | Entrée P de l’ADC audio / données PDM |
| 41 | GND | Masse |
| 42 | PA_00 / USB_DP | GPIO / USB_DP (contradiction de la source ; voir avertissement) |
| 43 | PA_01 / USB_DM | GPIO / USB_DM (contradiction de la source ; voir avertissement) |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO / SD / tactile / détection USB |
| 54 | GND | Masse |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK / GPIO |
| 57 | PA_44 / SWDIO | SWDIO / GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | Données de poids fort DPI-RGB / PDM / réveil Wi-Fi ; disponibilité selon le boîtier du module |

</div>

<div align="center"><em>J3 : connecteur d’extension 40 broches</em></div>

<div align="center" markdown>

| Broche | Signal / Repère | Connexion / Fonction |
|:---|:---|:---|
| 1 | 3V3 | 3,3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3,3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1 : connecteur d’écran RGB</em></div>

<div align="center" markdown>

| Broche | Signal / Repère |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | Commandes : affectation à vérifier: PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4 : connecteur de caméra DVP</em></div>

<div align="center" markdown>

| Broche | Signal / Repère |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2,8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2,8 V |
| 23 | NC |
| 24 | GND |

</div>

## Sources et suite du développement { #related-documents }

Pour concevoir une carte personnalisée, consultez le [guide matériel SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) et le guide [Conception pour la production](../../hardware/design-for-production.md). Consultez aussi les pages [Graphisme](../../learn/graphics/overview.md), [Audio](../../learn/audio/overview.md) et [Bluetooth](../../learn/bluetooth/overview.md) pour approfondir ces sous-systèmes.

- [Documentation produit SiFli SF32LB57x](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [Téléchargements des manuels utilisateur SiFli](https://downloads.sifli.com/user%20manual/)
- [Guide matériel original SF32LB57x](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

La source de la carte indique que le manuel utilisateur SF32LB57x n'est pas encore publié ; vérifiez s'il est désormais disponible dans le répertoire de téléchargement.

- [Guide chinois original de la carte](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Source Markdown](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [Configuration de compilation du SDK](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [Outils d’affichage](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Programmation avec Impeller](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [Boutique SiFli](https://sifli.taobao.com/)

SiFli oriente les achats d'échantillons et de petites quantités vers sa boutique, et les demandes en volume vers sales@sifli.com. La source mentionne également les demandes d'échantillons pour les projets open source et le groupe QQ 674699679 ; confirmez les conditions et la disponibilité auprès de SiFli. Pour votre projet, [contactez μForge.io](../../about/contact.md).
