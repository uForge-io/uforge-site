---
icon: lucide/circuit-board
hide:
    - navigation
description: "Directives de schéma du SF32LB57x : stockage, connectivité et fabrication, supports de démarrage, UART/I2C/SPI/SDIO/USB/CAN/GPADC, programmation et bancs de test."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x — Stockage et fabrication { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "Fait partie du Guide de conception matérielle SF32LB57x"
    Cette page couvre les sections 5.6 et 5.7 des directives de conception des schémas : stockage et connectivité, puis fabrication. Revenez à [Horloge, RF et interfaces utilisateur](SF32LB57x_schematic_clock_rf_interfaces.md) ou passez aux [Recommandations de placement et de routage PCB](SF32LB57x_pcb_layout.md).

### 5.6. Stockage et connectivité { #56-storage-and-connectivity }

#### 5.6.1. Stockage et démarrage { #561-storage-and-boot }

Les choix de stockage et de démarrage doivent être examinés ensemble. Le support de démarrage détermine les résistances de configuration des broches de démarrage, l'état d'alimentation initial du stockage, l'affectation des bus et les moyens de récupération en production.

Les variantes dotées d'une mémoire Flash SPI NOR intégrée au boîtier démarrent par défaut sur celle-ci. Les variantes sans cette mémoire doivent démarrer depuis un support externe. Le support externe est sélectionné par `PA13` (`Bootstrap[1]`) et `PA17` (`Bootstrap[0]`). Le schéma SiFli montre un cavalier et un emplacement de résistance de pull-up de 7,5 kΩ sur chaque signal, reliés à `VDD33_VOUT1`/`VDDIOA`.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="Cavaliers de sélection du démarrage et pull-ups de PA13 et PA17" /></div>
<div align="center"><em>Figure 5.6-1 : Circuit de sélection du support de démarrage par PA13 et PA17</em></div>

<div align="center"><em>Tableau 5.6-1 : Sélection du support de démarrage externe</em></div>

<div align="center" markdown>

| `PA13` (`Bootstrap[1]`) | `PA17` (`Bootstrap[0]`) | Support de démarrage externe |
|:-------------------|:-------------------|:-----------------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. Interfaces de stockage { #562-storage-interfaces }

Le SF32LB57x prend en charge les mémoires externes SPI NOR Flash, SPI NAND Flash, SD NAND Flash et eMMC. Seule l'interface MPI3 sur `PA12` à `PA17` prend en charge SPI NOR et SPI NAND ; SD NAND ou eMMC peuvent être raccordés à l'une ou l'autre des deux interfaces SDIO. Sur certaines références commandables, la mémoire intégrée au boîtier occupe MPI3.

Avant de figer le schéma, confirmez :

- Si la Flash intégrée au boîtier ou la PSRAM occupe un canal MPI.
- Quel support de démarrage externe sera utilisé : SPI NOR, SPI NAND, SD NAND ou eMMC.
- Si la tension d'E/S correspond au composant de stockage.
- Si les résistances de pull-up, la sélection de puce, l'horloge, les lignes de données et la commande d'alimentation satisfont aux exigences de démarrage.
- Si le support de démarrage externe a le bon état d'alimentation par défaut.

<div align="center"><em>Tableau 5.6-2 : Connexions de stockage MPI3 recommandées</em></div>

<div align="center" markdown>

| Signal de stockage | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. Contrôle du démarrage et de l'alimentation { #563-boot-and-power-control }

Une eMMC possède deux domaines d'alimentation distincts, `VCC` et `VCCQ`. La commutation simultanée des deux réduit la consommation à l'arrêt, mais ralentit la sortie de veille et augmente la consommation moyenne du processeur. La commutation de `VCC` uniquement, avec `VCCQ` toujours alimenté, augmente la consommation à l'arrêt, mais accélère la reprise de l'eMMC et réduit la consommation moyenne du processeur.

<div align="center"><em>Tableau 5.6-3 : Exigences de pull-up du stockage externe MPI3</em></div>

<div align="center" markdown>

| Support externe | `PA13` | `PA15` | `PA17` |
|:----------------|:-----|:-----|:-----|
| SPI NOR Flash | MPI `D1` : aucun pull-up | Non spécifié dans la source | MPI `D3` : aucun pull-up |
| SPI NAND Flash | MPI `D1` : aucun pull-up | Non spécifié dans la source | MPI `D3` : pull-up de 7,5 kΩ |
| SD NAND Flash | SD `D3` : pull-up de 7,5 kΩ | SD `CMD` : pull-up de 7,5 kΩ | SD `D1` : aucun pull-up |
| eMMC | SD `D3` : pull-up de 7,5 kΩ | SD `CMD` : pull-up de 7,5 kΩ | SD `D1` : pull-up de 7,5 kΩ |

</div>

« Non spécifié dans la source » signifie que la liste de contrôle SiFli ne donne aucune exigence pour cette cellule ; cela ne signifie pas qu'un pull-up est inutile.

La sélection du support de démarrage externe est présentée dans le Tableau 5.6-1 et la Figure 5.6-1. L'activation du interrupteur d'alimentation du stockage est fixée à `PA21` et active à l'état haut. Choisissez l'alimentation selon la variante :

- Variantes alimentées par batterie : la SPI NOR Flash externe peut être alimentée en permanence par `VDD33_VOUT1` ; la SPI NAND Flash doit être alimentée par un interrupteur placé après `VDD33_VOUT1`. La SD NAND Flash et l'eMMC utilisent un LDO externe, de préférence activé par `PA21`. Pour les boîtiers sans `PA21`, un GPIO dont l'état par défaut après réinitialisation est un rappel haut (pull-up) peut être utilisé.
- Variantes alimentées en 3,3 V : utilisez un LDO externe pour tout stockage de démarrage externe ; `PA21` est recommandé pour commander son activation.
- La SPI NOR Flash peut rester alimentée en permanence ; la SPI NAND, la SD NAND et l'eMMC nécessitent un interrupteur d'alimentation. Pour démarrer sur un support externe, son alimentation doit être activée par défaut au démarrage.
- Réservez des empreintes de pull-up sur `PA13` et `PA17` et montez-les selon le support de démarrage choisi ; la valeur recommandée est 7,5 kΩ. Voir le Tableau 5.6-3 pour les exigences par broche MPI3.
- Si le stockage intégré au boîtier occupe MPI3, l'utilisation externe de MPI3 est limitée à SD NAND ou eMMC ; ne raccordez pas de SPI NOR/SPI NAND externe à ce canal.
- Faites correspondre la tension d'E/S du stockage à l'alimentation d'E/S de la MCU et choisissez un composant figurant dans la liste des fournisseurs approuvés (AVL) du projet.

#### 5.6.4. GPIO et multiplexage des broches { #564-gpio-and-pin-multiplexing }

Planifiez les GPIO avant d'affecter tous les périphériques du produit : les signaux de démarrage, de débogage, de réveil, USB, analogiques, d'affichage, de stockage et à haut débit peuvent restreindre le routage matriciel, malgré sa souplesse.

#### 5.6.5. Planification des broches { #565-pin-planning }

Le SF32LB57x prend en charge un multiplexage de broches flexible, mais les signaux suivants doivent être fixés tôt :

- Les broches RF, des quartz, d'alimentation, USB, audio analogique, GPADC, de démarrage et de débogage.
- Les interfaces d'affichage haute vitesse, SDIO, de stockage et DCMI qui nécessitent des groupes de broches spécifiques.
- Les GPIO de réveil, la configuration de démarrage, la commutation SWD et les broches de test de production.

#### 5.6.6. Directives GPIO { #566-gpio-guidelines }

- Configurez les GPIO inutilisés dans un état défini.
- Faites correspondre la tension d'E/S du périphérique avec le domaine d'alimentation d'E/S correspondant.
- Incluez dans le budget énergétique les courants de fuite en veille dus aux résistances de pull-up des GPIO.
- Lorsqu'une broche est réutilisée pour une entrée analogique, l'USB, l'audio ou une fonction spéciale, configurez les chemins d'entrée/sortie numériques selon le manuel utilisateur.
- Le routage matriciel flexible ne supprime pas les contraintes de disposition haute vitesse. Respectez les exigences de groupe de broches et de PCB.

Chaque GPIO peut utiliser les fonctions 0 à 15 indiquées dans le tableau IO MUX ci-dessous. La colonne « Fonction 16-255 » correspond au routage matriciel ; le tableau matriciel qui suit répertorie les index de fonction 16 à 175. Consultez les deux tableaux pour déterminer précisément sur quelle broche physique chaque signal de périphérique peut être routé avant de figer le schéma.

<div align="center"><em>Tableau 5.6-4 : Table IO MUX</em></div>

<div align="center" markdown>

| PAD | PUPD | Fonction 0 | Fonction 1 | Fonction 2 | Fonction 3 | Fonction 4 | Fonction 5 | Fonction 6 | Fonction 15 | Fonction 16-255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | Table matricielle |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | Table matricielle |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | Table matricielle |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | Table matricielle |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | Table matricielle |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | Table matricielle |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | Table matricielle |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | Table matricielle |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | Table matricielle |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | Table matricielle |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | Table matricielle |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | Table matricielle |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | Table matricielle |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | Table matricielle |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | Table matricielle |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | Table matricielle |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | Table matricielle |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | Table matricielle |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | Table matricielle |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | Table matricielle |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | Table matricielle |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | Table matricielle |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | Table matricielle |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | Table matricielle |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Table matricielle |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | Table matricielle |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Table matricielle |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Table matricielle |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | Table matricielle |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | Table matricielle |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | Table matricielle |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | Table matricielle |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | Table matricielle |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | Table matricielle |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | Table matricielle |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | Table matricielle |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | Table matricielle |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | Table matricielle |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | Table matricielle |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | Table matricielle |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | Table matricielle |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | Table matricielle |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | Table matricielle |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | Table matricielle |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | Table matricielle |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | Table matricielle |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | Table matricielle |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | Table matricielle |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | Table matricielle |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | Table matricielle |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | Table matricielle |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | Table matricielle |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | Table matricielle |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | Table matricielle |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | Table matricielle |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | Table matricielle |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | Table matricielle |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | Table matricielle |

</div>

Le gras indique la fonction de la broche après réinitialisation. `PUPD` indique l'état de la résistance de rappel interne après réinitialisation (`PU` : pull-up, `PD` : pull-down, `-` : aucune). `#` signale une fonction analogique.

!!! note
    - Les fonctions analogiques ne sont accessibles que via les fonctions 0 à 15 du tableau IO MUX ci-dessus.
    - Seules `PA11` à `PA17` et `SB01` à `SB09` prennent en charge l'interface MPI.
    - En modes Sleep, DeepSleep et Standby, seules `PA24` à `PA27` peuvent encore émettre des signaux ; ces broches peuvent produire l'horloge PWM LPTIM2 jusqu'à 16 kHz.
    - `PA18` et `PA19` sont les broches de débogage dédiées et prennent en charge `DBG-UART` et `SWD`.
    - `PA43` et `PA44` sont les broches de débogage de secours et ne prennent en charge que `SWD`.
    - `PA00` et `PA01` configurent le mode de téléchargement du composant et la sélection de l'emplacement des broches `SWD` ; voir la section 5.7.1.
    - Les interruptions matérielles externes de réveil sont limitées aux dix GPIO `PA33` à `PA42`.

<div align="center"><em>Tableau 5.6-5 : Table matricielle (index de fonction 16-175)</em></div>

<div align="center" markdown>

| Module | Largeur en bits | Index | Sous-index | Fonction |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA` (dans l'ordre des index). |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO` (dans l'ordre des index). |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS` (dans l'ordre des index). |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD` (dans l'ordre des index). |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX` (dans l'ordre des index). |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR` (dans l'ordre des index). |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR` (dans l'ordre des index). |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2` (dans l'ordre des index). |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5` (dans l'ordre des index). |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK` (dans l'ordre des index). |
| PTM | 16 | 105-120 | 89-104 | `PTM1_CH0` à `PTM1_CH15` (dans l'ordre des index). |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0` à `LCDC_IF29` (dans l'ordre des index). Voir le Tableau 5.6-6 pour le sous-mappage par mode d'interface. |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2` (dans l'ordre des index). |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, `DCMI_DI0` à `DCMI_DI15` (dans l'ordre des index). |

</div>

N'importe quel GPIO peut être associé par la matrice à l'une des fonctions ci-dessus, sous réserve des contraintes de routage et de placement indiquées ailleurs dans ce guide. Les colonnes « index » et « sous-index » donnent les valeurs exactes des champs de registre utilisés pour configurer le routeur matriciel dans le firmware.

<div align="center"><em>Tableau 5.6-6 : Table de sous-multiplexage matriciel LCDC</em></div>

<div align="center" markdown>

| Signal matriciel | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "Valeurs IF_SEL dans le tableau du sous-multiplexeur LCDC"
    Le tableau source de SiFli attribue `IF_SEL=0` aux modes SPI et JDI. Cet article conserve les valeurs de la source, mais cette attribution en double est ambiguë. Avant de configurer un panneau, vérifiez le réglage dans le pilote SDK et le schéma de référence correspondants ; ne déduisez pas la valeur du registre à partir de ce seul tableau.

#### 5.6.7. Interfaces générales { #567-general-interfaces }

Appliquez les mêmes critères à chaque interface générale : connexions électriques, tension d'E/S, état par défaut après réinitialisation et en veille, alimentation des résistances de pull-up, exposition aux décharges électrostatiques (ESD) et conflits éventuels avec les fonctions de démarrage, de débogage, de réveil ou à haut débit.

`PA34` prend en charge le bouton marche/arrêt et la réinitialisation par appui prolongé. La réinitialisation est active à l'état haut : prévoyez un pull-down de 10 kΩ sur la carte principale. L'appui force la broche à l'état haut ; un appui de 10 secondes déclenche une réinitialisation matérielle. Le circuit de référence des boutons à échelle résistive GPADC utilise des résistances de 1,1 kΩ, 2,8 kΩ et 5,1 kΩ. Les nœuds sont étiquetés respectivement 2,97 V/1,62 V, 2,58 V/1,41 V et 2,19 V/1,19 V. Le nœud `PA34` comprend également un pull-down de 10 kΩ et un condensateur de 100 nF à la masse. Placez une protection ESD près de chaque bouton accessible.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="Circuit de référence du bouton marche/arrêt PA34 et du bouton GPADC à échelle résistive" /></div>
<div align="center"><em>Figure 5.6-2 : Circuit de référence des boutons PA34 et GPADC</em></div>

!!! warning "Étiquettes de tension des boutons GPADC"
    Le schéma SiFli indique deux tensions séparées par une barre oblique pour chaque nœud de bouton, sans préciser les conditions associées. Vérifiez leur correspondance avec l'alimentation prévue et le schéma de référence avant d'utiliser ces valeurs comme seuils.

#### 5.6.8. Principes de revue d'interface { #568-interface-review-principles }

Examinez quatre éléments pour chaque interface de périphérique :

1. Connexions électriques : croisement des signaux, résistances de pull-up et de pull-down, protection ESD et terminaison.
2. Compatibilité du domaine de tension d'E/S, y compris le risque d'alimentation en retour (back-power) lorsque le périphérique est éteint.
3. États par défaut sûrs de réinitialisation et de veille.
4. Conflits avec les fonctions multiplexées de démarrage, téléchargement, SWD, USB, réveil, ou affichage haute vitesse.

#### 5.6.9. UART { #569-uart }

- Le SF32LB57x intègre trois UART full-duplex, jusqu'à 6 Mbps, avec formats de données configurables. Les signaux peuvent utiliser les fonctions 0 à 15 des broches ou être routés par matrice vers tout GPIO.
- Le RXD de la MCU se connecte au TXD du périphérique ; le TXD de la MCU se connecte au RXD du périphérique.
- Faites correspondre la tension d'E/S du périphérique avec le domaine d'E/S de la MCU.
- Examinez le comportement de l'état de réinitialisation pour les broches UART multiplexées avec les fonctions USB, démarrage, téléchargement, ou débogage.
- PA18 et PA19 sont les broches DBG-UART par défaut. Pour les interfaces UART de test fréquemment branchées et débranchées, SiFli recommande PA18, PA19, PA43 ou PA44 ; ce groupe de GPIO est prévu pour 5,5 V. Pour les longs câbles de test, ajoutez une résistance série de 100 Ω afin de limiter les dépassements.

#### 5.6.10. I2C { #5610-i2c }

- SDA et SCL nécessitent des résistances de pull-up.
- Le SF32LB57x intègre quatre interfaces I2C, chacune prenant en charge les modes hôte et périphérique et pouvant être routée par matrice vers tout GPIO.
- SiFli recommande 4,7 kΩ pour le mode standard (100 kHz), 2,2 kΩ à 3,3 kΩ pour le mode rapide (400 kHz) et 1 kΩ à 2,2 kΩ pour le mode rapide plus (1 MHz). Pour 400 kHz, partez de 2,2 kΩ et ajustez selon la capacité du bus.
- Pour un bus I2C partagé, un seul ensemble de résistances de pull-up près de l'hôte suffit ; n'en ajoutez pas un à chaque périphérique. Alimentez-les depuis le rail du périphérique afin qu'elles soient coupées avec celui-ci et ne provoquent pas de fuite en veille.
- Assurez-vous que chaque composant sur le même bus a une adresse unique.

#### 5.6.11. SPI { #5611-spi }

- Le SF32LB57x intègre deux interfaces SPI, chacune prenant en charge les modes hôte et périphérique ; elles peuvent utiliser les fonctions 0 à 15 des broches ou le routage matriciel.
- Le SDO de la MCU se connecte au SDI du périphérique ; le SDI de la MCU se connecte au SDO du périphérique.
- Faites correspondre CLK, CS, le mode, la phase, la polarité et la fréquence maximale à la fiche technique du périphérique.
- Gardez le routage SPI haute vitesse court avec une masse de référence continue. Ajoutez un amortissement série si les tests d'intégrité de signal montrent que c'est nécessaire.
- Le SPI à moins de 30 MHz peut utiliser le routage matriciel vers n'importe quel GPIO ; au-delà de 30 MHz, préférez les broches dédiées aux fonctions 0 à 15.
- Pour le SPI haute vitesse, placez une résistance série de 22 ohms à 27 ohms près du pilote et réservez une empreinte de condensateur shunt sur la ligne d'horloge pour l'ajustement d'intégrité de signal.

#### 5.6.12. SDIO { #5612-sdio }

- Le SF32LB57x intègre deux contrôleurs hôtes SD/MMC ; ils fonctionnent uniquement en mode hôte et prennent en charge les cartes SD, les périphériques SDIO et l'eMMC. Les signaux SDIO sont fixés aux GPIO définis par le multiplexeur de broches.
- Routez les signaux SDIO en groupe.
- Limitez la longueur totale à environ 50 mm et l'écart de longueur entre les signaux du groupe à environ 6 mm, dans la mesure du possible.
- Faites passer les pistes CLK, CMD et DATA au-dessus d'un plan de référence de masse continu.
- Vérifiez les résistances de pull-up, la commande d'alimentation et les domaines de tension pour SDIO/eMMC/SD NAND.
- À 24 MHz, les résistances de pull-up internes des GPIO peuvent suffire pour CMD et Data0 à Data3. À partir de 48 MHz, ajoutez des résistances de pull-up externes de 10 kΩ sur CMD et Data0 à Data3.
- Ajoutez des résistances série de 27 ohms à 33 ohms sur les signaux SDIO et réservez une empreinte de condensateur shunt sur la ligne d'horloge.
- Pour un logement de carte TF externe, reliez `DET` au 3,3 V par un pull-up de 10 kΩ et configurez la broche de la MCU en entrée avec pull-up interne. Ajoutez une protection ESD aux signaux SDIO et à l'alimentation.

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>Tableau 5.6-7 : Attribution des broches USB</em></div>

<div align="center" markdown>

| Signal USB | Broche GPIO |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- Routez USB DP/DN comme une paire différentielle 90 ohms.
- USB DP/DM utilisent couramment les fonctions multiplexées `PA35` / `PA36`. Lorsque l'USB est activé, assurez-vous que le circuit externe ne force pas de niveaux dangereux pendant la réinitialisation.
- Placez l'ESD près du connecteur ; routez les signaux à travers l'ESD avant la puce.
- Évitez les stubs et maintenez l'appariement de la paire et la continuité de la masse de référence.
- Si un réveil par insertion USB en mode veille est requis, ajoutez un diviseur résistif VBUS vers un GPIO capable de réveil. Il est recommandé de partager ce GPIO avec la détection d'insertion du chargeur.
- `PA35` est fixé comme `USB_DP`, et `PA36` est fixé comme `USB_DM` ; ces fonctions ne peuvent pas être réaffectées. L'USB 2.0 FS prend en charge jusqu'à 12 Mbps.
- Réservez des résistances série de 22 ohms ou 33 ohms près du côté puce sur DP/DM, ainsi que des empreintes de condensateur shunt non montées pour l'ajustement d'intégrité de signal.
- L'USB utilise une signalisation asymétrique de 3,3 V. La puce intègre une résistance d'identification ; le logiciel peut activer un pull-up de 1,5 kΩ sur DP ou DM pour identifier les périphériques Full-Speed ou Low-Speed. Lorsque l'USB est activé, configurez `PA35` et `PA36` en entrées haute impédance afin d'éviter les conflits de multiplexage.

#### 5.6.14. CAN { #5614-can }

- Le SF32LB57x intègre deux interfaces CAN compatibles CAN 2.0B, routables par matrice vers tout GPIO.
- Faites correspondre l'alimentation et la tension d'E/S de l'émetteur-récepteur CAN à celles de la MCU.
- Ajoutez la terminaison, la self de mode commun, et l'ESD selon les exigences du système.
- Dans les environnements industriels ou automobiles, examinez les surtensions, les transitoires électriques rapides (EFT), les décharges électrostatiques (ESD) et les différences de potentiel de masse.

#### 5.6.15. GPADC { #5615-gpadc }

- Gardez la tension d'entrée GPADC dans la plage nominale de 0 V à 3,3 V.
- Seules `PA28` à `PA38` (11 broches) sont compatibles GPADC via le multiplexage de broches ; n'attribuez pas la fonction à d'autres broches.
- Utilisez des résistances à 1 % pour la mesure par diviseur.
- Placez un condensateur de filtrage de 100 nF (0,1 µF) près de la broche de la puce sur chaque entrée GPADC.
- Gardez les pistes GPADC à l'écart du DC/DC, du RF, de l'USB, du SDIO, des horloges d'affichage, et des boucles de charge.

<div align="center"><em>Tableau 5.6-8 : Attribution des broches GPADC</em></div>

<div align="center" markdown>

| Broche | Fonction GPADC |
|:----|:---------------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT` / `VBATS` | `GPADC_CH11` ; ceci appartient au domaine de tension de batterie et a une plage de mesure différente des broches GPADC normales. |

</div>

!!! warning "Tension de la broche VBATS et plage de mesure"
    Pour les variantes alimentées en 3,3 V, le tableau des broches d'alimentation indique 0 à 4,7 V pour `VBATS`, tandis que la liste de contrôle du schéma limite la mesure de tension de batterie à 0–4,5 V. Pour les mesures GPADC, respectez la plage la plus étroite de 0 à 4,5 V ; ne considérez pas la limite de 4,7 V du tableau des broches comme une plage de mesure ADC valide.

### 5.7. Fabrication { #57-manufacturing }

#### 5.7.1. Modes de démarrage et de téléchargement en production { #571-production-boot-and-download-modes }

Les broches de débogage et de téléchargement par défaut doivent rester accessibles au banc de production ; réservez les commandes de démarrage avant d'affecter les E/S du produit. La liste de contrôle SiFli exige des points de test soudables sur `PA43`/`PA44` et un pull-up ainsi qu'un point de test sur `PA00`. La résistance et le point de test de `PA01` sont optionnels.

<div align="center"><em>Tableau 5.7-1 : Exigences de test pour le débogage et la commande de démarrage</em></div>

<div align="center" markdown>

| Signal | Broche | Exigence de production |
|:-------|:-------|:-----------------------|
| `DBG_UART_RXD` | `PA18` | Réserver la broche de réception DBG-UART par défaut ; prévoir un accès pour le banc. |
| `DBG_UART_TXD` | `PA19` | Réserver la broche d'émission DBG-UART par défaut ; prévoir un accès pour le banc. |
| `SWD_CLK` | `PA43` | Prévoir un point de test soudable. |
| `SWD_DIO` | `PA44` | Prévoir un point de test soudable. |
| Sélection du mode de démarrage | `PA00` | Prévoir un pull-up et un point de test. |
| Sélection de l'emplacement SWD | `PA01` | Résistance et point de test optionnels. |

</div>

<div align="center"><em>Tableau 5.7-2 : Mode de démarrage et interfaces de téléchargement</em></div>

<div align="center" markdown>

| `PA00` / Registre de démarrage | `PA01` | Commutateur de démarrage hôte | Branche de démarrage et interfaces disponibles |
|:-----------------------|:-------|:-----------------|:------------|
| L | H | Quelconque | Démarrage normal ; `PA19` ne produit pas de journaux de démarrage ; `PA18` / `PA19` basculent vers SWD et le SWD de `PA43` / `PA44` est désactivé. |
| L | L | Désactivé | Démarrage normal ; `PA19` produit des journaux de démarrage ; `PA18` / `PA19` sont DBG-UART et `PA43` / `PA44` sont SWD. |
| L | L | Activé | Mode de démarrage ; la programmation DBG-UART, SWD, UART, et USB est prise en charge. |
| PA00 ou registre de démarrage = 1 | L | Quelconque | Mode de démarrage ; la programmation DBG-UART, SWD, UART, et USB est prise en charge. |
| PA00 ou registre de démarrage = 1 | H | Quelconque | Mode de démarrage ; `PA19` ne produit pas de journaux de démarrage ; la programmation SWD/USB est prise en charge, et `PA18` / `PA19` basculent vers SWD. |

</div>

!!! warning "Nom des points de test UART de débogage dans la source"
    La section 2.10 énumère deux fois `DB_UART_RXD` (sans le G). Le tableau des broches de débogage et la liste de contrôle identifient `PA18` comme `DBG_UART_RXD` et `PA19` comme `DBG_UART_TXD`. Confirmez les noms de signaux d'après le banc de production avant la mise en production ; ne réservez pas RXD deux fois.

<div align="center"><em>Tableau 5.7-3 : Listes de points de test de production dans la source</em></div>

<div align="center" markdown>

| Liste de la source | Champ d'application indiqué | Points de test énumérés |
|:------------------|:----------------------------|:------------------------|
| Section 2.10, liste de programmation et d'étalonnage du quartz | Non précisé | `VBAT`, `PVDD`, `GND`, `AVDD33`, `PA00`, `PA01` et `DB_UART_RXD` deux fois. |
| Liste de contrôle matériel 4.8, élément 1 | Variantes alimentées par batterie | `VBAT` ou 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (absent sur les variantes 3,3 V) et `PA34`. |
| Liste de contrôle matériel 4.8, élément 3 | Tous les modèles | `VBAT` ou 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` (absent de la série 3,3 V), `PA00`, `PA01` et `PA34` ; adapter les dimensions, l'espacement et l'orientation des pastilles aux sondes du banc. |

</div>

#### 5.7.2. Programmation et étalonnage de production { #572-production-programming-and-calibration }

La source demande d'utiliser un programmateur hors ligne pour programmer la Flash et étalonner le quartz. Cette section ne précise ni étalonnage RF ni mesure du courant d'alimentation. Lors de la conception des pastilles de production, respectez les exigences de la source concernant les dimensions, l'espacement et l'orientation des sondes, et confirmez avec le responsable du banc les différences entre les listes de points de test du tableau 5.7-3.

Consultez la [documentation du programmateur hors ligne SiFli](https://wiki.sifli.com/tools/index.html).
