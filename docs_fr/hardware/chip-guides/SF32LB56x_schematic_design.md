---
icon: lucide/circuit-board
description: "Directives de conception du schéma pour le microcontrôleur SF32LB56x : système d'alimentation, modes de fonctionnement et sources de réveil, génération d'horloge, RF, interfaces d'affichage/tactile/rétroéclairage, stockage/capteurs/audio/connectivité, et fabrication."
tags:
    - Matériel
    - Puce
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56x — Directives de conception du schéma { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "Fait partie du guide de conception matérielle SF32LB56x"
    Cette page couvre la section 5, les directives de conception du schéma. Commencez par l'[aperçu du guide de conception matérielle SF32LB56x](SF32LB56x_hardware_design_guide.md) pour choisir le composant et consulter le flux de conception complet. Poursuivez avec la [liste de contrôle du schéma](SF32LB56x_schematic_checklist.md) ou passez directement aux [directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md).

## 5. Directives de conception du schéma { #5-schematic-design-guidelines }

### 5.1. Système d'alimentation { #51-power-system }

Examinez ensemble les rails d'alimentation du processeur, les condensateurs locaux requis, l'affectation des sorties du PMIC, la temporisation de la réinitialisation et le câblage du circuit de charge. Les variantes U et V suivent la même méthode de conception de l'alimentation, mais leurs broches d'alimentation et l'affectation des charges diffèrent.

<div align="center"><em>Tableau 5.1-1 : Rails d'alimentation du processeur SF32LB56xU</em></div>

<div align="center" markdown>

| Broche d'alimentation du PMU | Tension minimale (V) | Tension typique (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,7 | 1,8 | 3,6 | 100 | Entrée d'alimentation PVDD |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | Sortie BUCK_LX, connectée à l'inductance ; entrée d'alimentation interne, connectée à l'autre extrémité de l'inductance et à un condensateur externe |
| LDO1_VOUT | - | 1,1 | - | 50 | Sortie LDO1, avec condensateur externe |
| LDO2_VOUT | - | 0,9 | - | 20 | Sortie LDO2, avec condensateur externe |
| VDD_RET | - | 0,9 | - | 1 | Sortie LDO RET, avec condensateur externe |
| VDD_RTC | - | 1,1 | - | 1 | Sortie LDO RTC, avec condensateur externe |
| MIC_BIAS | 1,4 | - | 2,8 | - | Sortie d'alimentation du microphone |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrée d'alimentation analogique + alimentation RFPA |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentation audio analogique |
| VDDIO1 | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation pour le dispositif de stockage co-packagé du grand cœur |
| VDDIO2 | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation pour les GPIO PA (sauf PA5~11) |
| VDDIO3 | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation pour PA5~11 |
| VDDIO4 | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation pour les GPIO PB et la Flash co-packagée du petit cœur |
| GPADC_VREF | - | - | - | - | Entrée de tension de référence du GPADC ; connectez uniquement un condensateur externe, aucune alimentation externe requise |
| AUD_VREF | - | - | - | - | Entrée de tension de référence audio ; connectez uniquement un condensateur externe, aucune alimentation externe requise |

</div>

<div align="center"><em>Tableau 5.1-2 : Rails d'alimentation du processeur SF32LB56xV</em></div>

<div align="center" markdown>

| Broche d'alimentation du PMU | Tension minimale (V) | Tension typique (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,71 | 1,8 | 3,6 | 100 | Entrée d'alimentation PVDD |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | Sortie BUCK_LX, connectée à l'inductance ; entrée d'alimentation interne, connectée à l'autre extrémité de l'inductance et à un condensateur externe |
| LDO1_VOUT | - | 1,1 | - | 50 | Sortie LDO1, connectée à un condensateur externe |
| LDO2_VOUT | - | 0,9 | - | 20 | Sortie LDO2, connectée à un condensateur externe |
| VDD_RET | - | 0,9 | - | 1 | Sortie LDO RET, connectée à un condensateur externe |
| VDD_RTC | - | 1,1 | - | 1 | Sortie LDO RTC, connectée à un condensateur externe |
| MIC_BIAS | 1,4 | - | 2,8 | - | Sortie d'alimentation du microphone |
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | Entrée d'alimentation RF |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Entrée d'alimentation analogique + alimentation RFPA |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Alimentation audio analogique |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PA12-PA78 |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PA0-PA11 |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | Entrée d'alimentation E/S PB |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPA |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPB |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | Entrée d'alimentation SIPC |
| GPADC_VREF | - | - | - | - | Entrée de tension de référence du GPADC ; seul un condensateur externe est connecté, aucune alimentation externe n'est requise |
| AUD_VREF | - | - | - | - | Entrée de tension de référence audio ; seul un condensateur externe est connecté, aucune alimentation externe n'est requise |

</div>

<div align="center"><em>Tableau 5.1-3 : Condensateurs d'alimentation requis pour le SF32LB56xU</em></div>

<div align="center" markdown>

| Broche d'alimentation | Condensateur | Description détaillée |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Placez au moins deux condensateurs, 10 µF et 0,1 µF, près de la broche. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Placez au moins deux condensateurs, 4,7 µF et 0,1 µF, près de la broche. |
| LDO1_VOUT | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| LDO2_VOUT | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| VDD_RET | 0,47 µF | Placez au moins un condensateur de 0,47 µF près de la broche. |
| VDD_RTC | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| AVDD33_ANA | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| GPADC_VREF | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| AVDD33_AUD | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| AUD_VREF | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| MIC_BIAS | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIO1 | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIO2 | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIO3 | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIO4 | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |

</div>

<div align="center"><em>Tableau 5.1-4 : Condensateurs d'alimentation requis pour le SF32LB56xV</em></div>

<div align="center" markdown>

| Broche d'alimentation | Condensateur | Description détaillée |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Placez au moins deux condensateurs, 10 µF et 0,1 µF, près de la broche. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Placez au moins deux condensateurs, 4,7 µF et 0,1 µF, près de la broche. |
| LDO1_VOUT | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| LDO2_VOUT | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| VDD_RET | 0,47 µF | Placez au moins un condensateur de 0,47 µF près de la broche. |
| VDD_RTC | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| AVDD_BRF | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| AVDD33_ANA | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| GPADC_VREFP | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| AVDD33_AUD | 4,7 µF | Placez au moins un condensateur de 4,7 µF près de la broche. |
| AUD_VREF | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| MIC_BIAS | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIOA | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIOA2 | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIOB | 1 µF | Placez au moins un condensateur de 1 µF près de la broche. |
| VDDIOSA | 0,1 µF | Placez au moins un condensateur de 0,1 µF près de la broche. |
| VDDIOSB | 0,1 µF | Placez au moins un condensateur de 0,1 µF près de la broche. |
| VDDIOSC | 0,1 µF | Placez au moins un condensateur de 0,1 µF près de la broche. |

</div>

<div align="center"><em>Tableau 5.1-5 : Caractéristiques de sortie du PMIC SF30147C (exemple variante U)</em></div>

<div align="center" markdown>

| Broche d'alimentation SF30147C | Tension minimale (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Sortie 1,8 V ; ne déduisez pas de cette ligne l'affectation aux broches d'alimentation du SF32LB56xU. |
| LVSW1 | 1,8 | 1,8 | 100 | Sortie d'alimentation 1,8 V |
| LVSW2 | 1,8 | 1,8 | 100 | Entrée d'alimentation 1,8 V du G-SENSOR |
| LVSW3 | 1,8 | 1,8 | 150 | Entrée d'alimentation 1,8 V du capteur de fréquence cardiaque |
| LVSW4 | 1,8 | 1,8 | 150 | Entrée d'alimentation 1,8 V du LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Sortie d'alimentation 1,8 V |
| LDO1 | 2,8 | 3,3 | 100 | Sortie de 2,8 à 3,3 V ; ne déduisez pas de cette ligne l'affectation aux broches d'alimentation du SF32LB56xU. |
| LDO2 | 2,8 | 3,3 | 100 | Entrée d'alimentation du moteur |
| LDO3 | 2,8 | 3,3 | 100 | Entrée d'alimentation 3,3 V du LCD |
| LDO4 | 2,8 | 3,3 | 100 | Entrée d'alimentation 3,3 V du capteur de fréquence cardiaque |
| HVSW1 | 2,8 | 5 | 150 | Entrée d'alimentation du PA analogique Classe K |
| HVSW2 | 2,8 | 5 | 150 | Entrée d'alimentation GPS |

</div>

!!! warning "Vérifier l'affectation des rails PMIC de la variante U"
    Le tableau original de répartition d'alimentation SiFli pour la variante U cite VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C et AVDD_BRF, contrairement au tableau des alimentations du processeur U figurant dans le même guide. Le tableau ci-dessus conserve les limites de tension et de courant des sorties PMIC. Ne l'utilisez pas pour déduire le raccordement aux broches d'alimentation de la variante U ; vérifiez les connexions sur la révision de schéma correspondante et dans la fiche technique SF30147C avant la validation du routage.

<div align="center"><em>Tableau 5.1-6 : Exemple de distribution d'alimentation PMIC SF30147C pour V</em></div>

<div align="center" markdown>

| Broche d'alimentation SF30147C | Tension minimale (V) | Tension maximale (V) | Courant maximal (mA) | Description détaillée |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | Entrée d'alimentation 1,8 V pour PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC, AVDD_BRF, etc. du SF32LB56xV |
| LVSW1 | 1,8 | 1,8 | 100 | Entrée d'alimentation logique du PA I2S Classe K |
| LVSW2 | 1,8 | 1,8 | 100 | Entrée d'alimentation 1,8 V du G-SENSOR |
| LVSW3 | 1,8 | 1,8 | 150 | Entrée d'alimentation 1,8 V du capteur de fréquence cardiaque |
| LVSW4 | 1,8 | 1,8 | 150 | Entrée d'alimentation 1,8 V du LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Entrée d'alimentation du cœur eMMC |
| LDO1 | 2,8 | 3,3 | 100 | Entrée d'alimentation 3,3 V pour AVDD33_ANA, AVDD33_AUD, VDDIOA2, etc. du SF32LB56xV |
| LDO2 | 2,8 | 3,3 | 100 | Entrée d'alimentation de l'eMMC ou de la SD NAND |
| LDO3 | 2,8 | 3,3 | 100 | Entrée d'alimentation 3,3 V du LCD |
| LDO4 | 2,8 | 3,3 | 100 | Entrée d'alimentation 3,3 V du capteur de fréquence cardiaque |
| HVSW1 | 2,8 | 5 | 150 | Entrée d'alimentation du PA analogique Classe K |
| HVSW2 | 2,8 | 5 | 150 | Entrée d'alimentation GPS |

</div>

![Figure 5.1-1 : Chronogramme POR/BOR du SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-1 : Chronogramme POR/BOR du SF32LB56xU</em></div>

![Figure 5.1-2 : Chronogramme POR/BOR du SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-2 : Chronogramme POR/BOR du SF32LB56xV</em></div>

![Figure 5.1-3 : Circuit de référence BUCK du SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-3 : Circuit de référence BUCK du SF32LB56xU</em></div>

![Figure 5.1-4 : Circuit de référence BUCK du SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-4 : Circuit de référence BUCK du SF32LB56xV</em></div>

![Figure 5.1-5 : Circuit de référence LDO du SF32LB56xU](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-5 : Circuit de référence LDO du SF32LB56xU</em></div>

![Figure 5.1-6 : Circuit de référence LDO du SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-6 : Circuit de référence LDO du SF32LB56xV</em></div>

![Figure 5.1-7 : Circuit de référence de charge du SF32LB56xU](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-7 : Circuit de référence de charge du SF32LB56xU</em></div>

![Figure 5.1-8 : Circuit de référence de charge du SF32LB56xV](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Figure 5.1-8 : Circuit de référence de charge du SF32LB56xV</em></div>

Sans gestion du chemin d'alimentation, le système et la batterie sont directement raccordés à VBAT. Cette solution est moins coûteuse, mais les circuits en aval ne peuvent pas être entièrement isolés de la batterie : les courants de fuite augmentent et l'objectif de basse consommation en Shipping Mode n'est pas atteint. Lorsque la batterie est en décharge profonde, le courant de précharge du chargeur doit dépasser la somme du courant du système et des fuites (i1+i2 dans le schéma source). Lorsque le système fonctionne, le courant de charge constant doit également dépasser i1+i2 ; sinon, la charge du système consomme une partie du courant de charge et la batterie risque de ne pas être complètement chargée. Un chargeur avec gestion du chemin d'alimentation sépare l'alimentation du système sur VSYS de la charge de la batterie sur VBAT, prend en charge le Shipping Mode et peut alimenter le système depuis VSYS même si la batterie est en décharge profonde.

La variante U propose trois topologies d'alimentation, à choisir selon la tension d'E/S des périphériques et l'objectif de consommation du système. Dans les trois cas, AVDD33_ANA et AVDD33_AUD sont alimentées en 3,3 V. La topologie la moins énergivore alimente PVDD et VDDIO1–VDDIO4 en 1,8 V et utilise des périphériques avec E/S 1,8 V. La topologie intermédiaire maintient PVDD et VDDIO1 à 1,8 V, tandis que VDDIO2–VDDIO4 et les E/S des périphériques sont à 3,3 V. Dans la topologie la plus énergivore, seule VDDIO1, qui alimente la PSRAM intégrée, reste à 1,8 V ; PVDD, VDDIO2–VDDIO4 et les E/S des périphériques sont à 3,3 V. Utilisez des interrupteurs de charge pour gérer dynamiquement l'alimentation des modules externes et laissez-les éteints par défaut lorsqu'ils ne sont pas utilisés. Pour les modules qui doivent rester alimentés, choisissez des composants à faible courant de repos. Le niveau matériel par défaut du GPIO de commande doit correspondre à la polarité d'activation de l'interrupteur afin qu'il reste éteint au démarrage. SiFli recommande une résistance de pull-up ou de pull-down de 1 MΩ sur l'entrée d'activation.

La PMU de la variante U termine la réinitialisation à la mise sous tension (POR) lorsque PVDD atteint 1,5 V. Une baisse de PVDD déclenche une réinitialisation par sous-tension (BOR) lorsque le seuil configuré est atteint ; ce seuil est réglable de 1,5 à 2,5 V.

### 5.2. Modes de fonctionnement et sources de réveil { #52-operating-modes-and-wake-sources }

Examinez ensemble le mode de fonctionnement, la source de réveil, l'alimentation des résistances de pull-up et le courant de fuite. Utilisez des broches compatibles avec le réveil pour les boutons, l'écran tactile, les interruptions des capteurs, les événements du chargeur et les autres signaux de réveil en basse consommation.

<div align="center"><em>Tableau 5.2-1 : Modes de fonctionnement du SF32LB56xU</em></div>

<div align="center" markdown>

| Mode de fonctionnement | CPU | Périphérique | SRAM | IO | LPTIM | Source de réveil | Temps de réveil |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | Actif | Actif | Accessible | Commutable | Actif |  |  |
| WFI/WFE | Arrêté | Actif | Accessible | Commutable | Actif | Toute interruption | < 0,5 µs |
| DEEPWFI | Arrêté | Actif | Accessible | Commutable | Actif | Toute interruption | < 5 µs |
| Light sleep | Arrêté | Arrêté | Non accessible, entièrement conservée | Niveau maintenu | Actif | RTC, GPIO, LPTIM, inter-système, Bluetooth, comparateur | < 100 µs |
| Deep sleep | Arrêté | Arrêté | Non accessible, entièrement conservée | Niveau maintenu | Actif |  | < 300 µs |
| Standby | Reset | Reset | Non accessible, LP entièrement conservée, HP conserve seulement 160 Ko | Niveau maintenu | Actif | RTC, boutons, LPTIM, inter-système, Bluetooth | 1,5 ms + reprise |
| Hibernate rtc | Reset | Reset | Données non conservées | Haute impédance | Reset | RTC, boutons | > 2 ms |
| Hibernate pin | Reset | Reset | Données non conservées | Haute impédance | Reset | Boutons | > 2 ms |

</div>

<div align="center"><em>Tableau 5.2-2 : Modes de fonctionnement du SF32LB56xV</em></div>

<div align="center" markdown>

| Mode de fonctionnement | CPU | Périphérique | SRAM | IO | LPTIM | Source de réveil | Temps de réveil |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | Actif | Actif | Accessible | Commutable | Actif |  |  |
| WFI/WFE | Arrêté | Actif | Accessible | Commutable | Actif | Toute interruption | < 0,5 µs |
| DEEPWFI | Arrêté | Actif | Accessible | Commutable | Actif | Toute interruption | < 5 µs |
| Light sleep | Arrêté | Arrêté | Non accessible, entièrement conservée | Niveau maintenu | Actif | RTC/GPIO/LPTIM/LPCOMP/interruption inter-système/Bluetooth | < 100 µs |
| Deep sleep | Arrêté | Arrêté | Non accessible, entièrement conservée | Niveau maintenu | Actif | RTC/GPIO/LPTIM/LPCOMP/interruption inter-système/Bluetooth | < 300 µs |
| Standby | Reset | Reset | Non accessible, LP entièrement conservée, HP conserve seulement 160 Ko | Niveau maintenu | Actif | RTC/boutons/LPTIM/interruption inter-système/Bluetooth | 1,5 ms + reprise |
| Hibernate rtc | Reset | Reset | Données non conservées | Haute impédance | Reset | RTC/boutons | > 2 ms |
| Hibernate pin | Reset | Reset | Données non conservées | Haute impédance | Reset | Boutons | > 2 ms |

</div>

<div align="center"><em>Tableau 5.2-3 : Sources d'interruption de réveil du SF32LB56xU</em></div>

<div align="center" markdown>

| Source d'interruption | Broche | Description détaillée |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Signal d'interruption 0 |
| WKUP_PIN1 | PB33 | Signal d'interruption 1 |
| WKUP_PIN2 | PB34 | Signal d'interruption 2 |
| WKUP_PIN5 | PA50 | Signal d'interruption 5 |
| WKUP_PIN6 | PA51 | Signal d'interruption 6 |
| WKUP_PIN10 | PBR0 | Signal d'interruption 10 |
| WKUP_PIN11 | PBR1 | Signal d'interruption 11 |
| WKUP_PIN12 | PBR2 | Signal d'interruption 12 |

</div>

<div align="center"><em>Tableau 5.2-4 : Sources d'interruption de réveil du SF32LB56xV</em></div>

<div align="center" markdown>

| Source d'interruption | Broche | Description détaillée |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Signal d'interruption 0 |
| WKUP_PIN1 | PB33 | Signal d'interruption 1 |
| WKUP_PIN2 | PB34 | Signal d'interruption 2 |
| WKUP_PIN3 | PB35 | Signal d'interruption 3 |
| WKUP_PIN4 | PB36 | Signal d'interruption 4 |
| WKUP_PIN5 | PA50 | Signal d'interruption 5 |
| WKUP_PIN6 | PA51 | Signal d'interruption 6 |
| WKUP_PIN7 | PA52 | Signal d'interruption 7 |
| WKUP_PIN8 | PA53 | Signal d'interruption 8 |
| WKUP_PIN9 | PA54 | Signal d'interruption 9 |
| WKUP_PIN10 | PBR0 | Signal d'interruption 10 |
| WKUP_PIN11 | PBR1 | Signal d'interruption 11 |
| WKUP_PIN12 | PBR2 | Signal d'interruption 12 |
| WKUP_PIN13 | PBR3 | Signal d'interruption 13 |

</div>

BOOT_MODE sélectionne le démarrage : un niveau haut active le mode téléchargement ; à niveau bas, la ROM recherche un programme utilisateur, le lance s'il existe et passe sinon en mode téléchargement. La broche Mode de la variante U possède un pull-down interne, peut rester non connectée lorsqu'elle est inutilisée et appartient au domaine VDDIO2. La broche Mode de la variante V appartient au domaine VDDIOA et doit être stabilisée par un pull-up ou pull-down de 10 kΩ ; ne la laissez pas flottante et évitez les changements d'état dus aux interférences. Réservez un point de test Mode sur les cartes de production ; un cavalier de récupération est utile sur les cartes de développement.

Tenez compte de l'alimentation des E/S mémoire lors de l'arrêt en basse consommation. En Standby sur la variante U, les niveaux GPIO sont conservés et VDDIO1 peut rester alimenté ; placez en mode basse consommation les mémoires reliées à MPI1/MPI2. En Hibernate, les niveaux GPIO ne sont pas conservés : coupez VDDIO1 pour éviter les fuites par les E/S de la mémoire intégrée. Sur la variante V, gardez les E/S de la mémoire intégrée alimentées en Standby. Avant Hibernate, coupez VDDIOSA et VDDIOSB via PBR0 et placez la mémoire NOR en Deep Power-Down. VDDIOSC doit rester alimenté.

### 5.3. Génération d'horloge { #53-clock-generation }

<div align="center"><em>Tableau 5.3-1 : Exigences du cristal</em></div>

<div align="center" markdown>

| Cristal | Exigences de spécification du cristal | Description détaillée |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (valeur recommandée : 8,8 pF) ; △F/F0 ≤ ±10 ppm ; ESR ≤ 30 Ω (valeur recommandée : 22 Ω) | La consommation de l'oscillateur à quartz dépend de CL et de l'ESR. Plus CL et ESR sont faibles, plus la consommation est basse. Pour la réduire, choisissez des composants dont CL et ESR sont relativement faibles dans la plage spécifiée. Prévoyez près du quartz des empreintes pour des condensateurs d'adaptation en parallèle. Si CL < 12 pF, aucun condensateur n'est nécessaire. |
| 32,768 kHz | CL ≤ 12,5 pF (valeur recommandée : 7 pF) ; △F/F0 ≤ ±20 ppm ; ESR ≤ 80 kΩ (valeur recommandée : 38 kΩ) | La consommation du quartz dépend de CL et de l'ESR. Plus CL et ESR sont faibles, plus la consommation est basse. Pour la réduire, choisissez des composants dont CL et ESR sont relativement faibles dans la plage spécifiée. Prévoyez près du quartz des empreintes pour des condensateurs d'adaptation en parallèle. Si CL < 12,5 pF, aucun condensateur n'est nécessaire. |

</div>

<div align="center"><em>Tableau 5.3-2 : Modèles de cristaux recommandés</em></div>

<div align="center" markdown>

| Modèle | Fabricant | Paramètres |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz ; △F/F0 = −6 à +8 ppm ; CL = 8,8 pF ; ESR max. = 22 Ω ; TOPR = −30 à +85 °C ; boîtier métrique : 2016 |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz ; △F/F0 = −20 à +20 ppm ; CL = 7 pF ; ESR max. = 70 kΩ ; TOPR = −40 à +85 °C ; boîtier métrique : 3215 |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz ; △F/F0 = −10 à +10 ppm ; CL = 8,8 pF ; ESR max. = 40 Ω ; TOPR = −20 à +75 °C ; boîtier métrique : 2016 |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz ; △F/F0 = −20 à +20 ppm ; CL = 7 pF ; ESR max. = 70 kΩ ; TOPR = −40 à +85 °C ; boîtier métrique : 3215 |

</div>

Placez les quartz de 48 MHz et de 32,768 kHz près de la puce, prévoyez des empreintes pour les condensateurs d'adaptation et protégez les pistes des quartz contre le bruit du BUCK, de la RF, de l'affichage, du moteur et du chargeur.

### 5.4. RF { #54-rf }

Pour les conceptions SF32LB56xU et SF32LB56xV, routez le signal RF sur une piste à impédance contrôlée de 50 Ω. Si l'antenne choisie est déjà adaptée, aucun composant RF supplémentaire n'est généralement nécessaire. Prévoyez néanmoins un réseau d'adaptation en π pour supprimer les émissions parasites et effectuer l'accord final de l'antenne.

Placez le réseau d'adaptation RF près de la puce, et non de l'antenne. Gardez le filtre AVDD_BRF près de la broche du circuit, reliez directement les masses des condensateurs au plan de masse principal et routez la RF sur la couche supérieure si possible. Évitez les vias et les angles vifs, ajoutez de nombreux vias de blindage à la masse de part et d'autre de la piste RF, et éloignez de la zone RF les pistes DC-DC, VBAT, du quartz, de l'horloge haute vitesse, de l'I2C, du SPI, du SDIO, de l'I2S et de l'UART.

### 5.5. Interfaces d'affichage, tactiles et de rétroéclairage { #55-display-touch-and-backlight-interfaces }

Le choix de l'interface d'affichage dépend du boîtier. La variante U documente les interfaces d'affichage SPI/QSPI et JDI ; la variante V documente également les options MCU8080 et DPI. Affectez les signaux d'interruption tactile, de reset et de commande du rétroéclairage en tenant compte des fonctions de réveil et des besoins d'accès en production.

<div align="center"><em>Tableau 5.5-1 : Exemples de pilotes d'affichage</em></div>

<div align="center" markdown>

| Modèle | Fabricant | Résolution | Type | Interface |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | SPI 3 fils, SPI 4 fils, SPI double données, SPI quadruple données, MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | SPI 3 fils, SPI 4 fils, SPI double données, SPI quadruple données, MCU série 8080 8 bits, MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | SPI quadruple données, MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | SPI 3 fils, SPI 4 fils, SPI double données, SPI quadruple données, MCU série 8080 8 bits, MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | SPI quadruple données |
| GC9C01 | Galaxycore | 360*360 | TFT | SPI quadruple données |
| ST77903 | Sitronix | 400*400 | TFT | SPI quadruple données |

</div>

<div align="center"><em>Tableau 5.5-2 : Interface d'affichage SPI/QSPI du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal SPI | Broche SF32LB56xU | Broche SS6700A | Description détaillée |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | Signal de validation |
| WRX_SCL | PA37 | PA37 | Signal d'horloge |
| DCX | PA39 | PA39 | Signal de données/commande en mode SPI 4 fils ; donnée 1 en mode Quad-SPI |
| SDI_RDX | PA38 | PA38 | Signal d'entrée de données en mode SPI 3/4 fils ; donnée 0 en mode Quad-SPI |
| SDO | PA38 | PA38 | Signal de sortie de données en mode SPI 3/4 fils ; veuillez le court-circuiter avec SDI_RDX |
| D0 | PA40 | PA40 | Donnée 2 en mode Quad-SPI |
| D1 | PA41 | PA41 | Donnée 3 en mode Quad-SPI |
| REST | PA05 | PB04 | Signal de reset du panneau d'affichage |
| TE | PA33 | PA33 | Signal Tearing Effect pour la synchronisation des trames côté MCU |

</div>

<div align="center"><em>Tableau 5.5-3 : Interface d'affichage JDI du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal JDI | Broche | Description détaillée |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Signal de sélection de puce |
| JDI_SCLK | PA41 | Signal d'horloge série |
| JDI_SO | PA40 | Signal de sortie de données série |
| JDI_DISP | PA36 | Signal de commutation d'affichage ON/OFF |
| JDI_EXTCOMIN | PA38 | Entrée de polarité d'inversion COM |

</div>

<div align="center"><em>Tableau 5.5-4 : Interfaces tactiles et de rétroéclairage du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal tactile et de rétroéclairage | Broche | Description détaillée |
| :--- | :--- | :--- |
| Interruption | PA50 | Signal d'interruption d'état tactile (capable de réveil) |
| I2C1_SCL | PA48 | Signal d'horloge I2C du panneau tactile |
| I2C1_SDA | PA49 | Signal de données I2C du panneau tactile |
| BL_PWM | PA31 | Signal de contrôle PWM du rétroéclairage |
| Réinitialisation | PB18 | Signal de réinitialisation du panneau tactile |

</div>

<div align="center"><em>Tableau 5.5-5 : Interface d'affichage SPI/QSPI du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal SPI | E/S | Description détaillée |
| :--- | :--- | :--- |
| CSX | PA36 | Signal de validation |
| WRX_SCL | PA37 | Signal d'horloge |
| DCX | PA39 | Signal de données/commande en mode SPI 4 fils ; donnée 1 en mode Quad-SPI |
| SDI_RDX | PA38 | Signal d'entrée de données en mode SPI 3/4 fils ; donnée 0 en mode Quad-SPI |
| SDO | PA38 | Signal de sortie de données en mode SPI 3/4 fils ; court-circuitez-le avec SDI_RDX |
| D[0] | PA40 | Donnée 2 en mode Quad-SPI |
| D[1] | PA41 | Donnée 3 en mode Quad-SPI |
| REST | PA43 | Signal de reset pour l'affichage |
| TE | PA33 | Signal Tearing Effect pour la synchronisation des trames côté MCU |

</div>

<div align="center"><em>Tableau 5.5-6 : Interface d'affichage MCU8080 du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal MCU8080 | E/S | Description détaillée |
| :--- | :--- | :--- |
| CSX | PA36 | Sélection de puce |
| WRX | PA37 | Signal de validation d'écriture pour écrire des données |
| DCX | PA39 | Sélection données/commande d'affichage |
| RDX | PA38 | Signal de strobe de lecture des données |
| D[0] | PA40 | Donnée 0 |
| D[1] | PA41 | Donnée 1 |
| D[2] | PA28 | Donnée 2 |
| D[3] | PA29 | Donnée 3 |
| D[4] | PA30 | Donnée 4 |
| D[5] | PA31 | Donnée 5 |
| D[6] | PA32 | Donnée 6 |
| D[7] | PA34 | Donnée 7 |
| REST | PA43 | Reset |
| TE | PA33 | Signal Tearing Effect pour la synchronisation des trames côté MCU |

</div>

<div align="center"><em>Tableau 5.5-7 : Interface d'affichage DPI du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal DPI | E/S | Description détaillée |
| :--- | :--- | :--- |
| CLK | PA45 | Signal d'horloge |
| DE | PA47 | Signal de validation de données |
| HSYNC | PA44 | Signal de synchronisation horizontale |
| VSYNC | PA42 | Signal de synchronisation verticale |
| SD | PA50 | Contrôle l'extinction de l'affichage |
| CM | PA51 | Commute entre le mode couleur normal et le mode couleur réduite |
| R0 | PA14 | Signal de pixel |
| R1 | PA13 | Signal de pixel |
| R2 | PA16 | Signal de pixel |
| R3 | PA24 | Signal de pixel |
| R4 | PA19 | Signal de pixel |
| R5 | PA21 | Signal de pixel |
| R6 | PA23 | Signal de pixel |
| R7 | PA25 | Signal de pixel |
| G0 | PA28 | Signal de pixel |
| G1 | PA30 | Signal de pixel |
| G2 | PA32 | Signal de pixel |
| G3 | PA33 | Signal de pixel |
| G4 | PA34 | Signal de pixel |
| G5 | PA29 | Signal de pixel |
| G6 | PA31 | Signal de pixel |
| G7 | PA35 | Signal de pixel |
| B0 | PA36 | Signal de pixel |
| B1 | PA37 | Signal de pixel |
| B2 | PA38 | Signal de pixel |
| B3 | PA43 | Signal de pixel |
| B4 | PA41 | Signal de pixel |
| B5 | PA39 | Signal de pixel |
| B6 | PA40 | Signal de pixel |
| B7 | PA46 | Signal de pixel |

</div>

<div align="center"><em>Tableau 5.5-8 : Interface d'affichage parallèle JDI du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal JDI | E/S | Description détaillée |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | Horloge de décalage pour le pilote vertical |
| JDI_VST | PA40 | Signal de démarrage pour le pilote vertical |
| JDI_XRST | PA39 | Signal de reset pour les pilotes horizontal et vertical |
| JDI_HCK | PA36 | Horloge de décalage pour le pilote horizontal |
| JDI_HST | PA38 | Signal de démarrage pour le pilote horizontal |
| JDI_ENB | PA43 | Signal de validation d'écriture pour la mémoire de pixels |
| JDI_R1 | PA29 | Données d'image rouge (pixels impairs) |
| JDI_R2 | PA31 | Données d'image rouge (pixels pairs) |
| JDI_G1 | PA34 | Données d'image verte (pixels impairs) |
| JDI_G2 | PA32 | Données d'image verte (pixels pairs) |
| JDI_B1 | PA30 | Données d'image bleue (pixels impairs) |
| JDI_B2 | PA28 | Données d'image bleue (pixels pairs) |
| JDI_XFRP | PBR1 | Signal de commande du cristal liquide (pixel « allumé ») |
| JDI_VCOM/FRP | PBR2 | Signal de commande d'électrode commune / signal de commande du cristal liquide (pixel « éteint ») |

</div>

<div align="center"><em>Tableau 5.5-9 : Interface d'affichage série JDI du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal JDI | Broche | Description détaillée |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Signal de sélection de puce |
| JDI_SCLK | PA41 | Signal d'horloge série |
| JDI_SO | PA40 | Signal de sortie de données série |
| JDI_DISP | PA36 | Signal de commutation d'affichage ON/OFF |
| JDI_EXTCOMIN | PA38 | Entrée de polarité d'inversion COM |

</div>

<div align="center"><em>Tableau 5.5-10 : Interfaces tactiles et de rétroéclairage du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal tactile et de rétroéclairage | Broche | Description détaillée |
| :--- | :--- | :--- |
| Interruption | PA50 | Signal d'interruption d'état tactile (capable de réveil) |
| I2C1_SCL | PA48 | Signal d'horloge I2C du panneau tactile |
| I2C1_SDA | PA49 | Signal de données I2C du panneau tactile |
| BL_PWM | PA35 | Signal de contrôle PWM du rétroéclairage |
| Réinitialisation | PA44 | Signal de réinitialisation du panneau tactile |

</div>

### 5.6. Stockage, capteurs, audio et connectivité { #56-storage-sensors-audio-and-connectivity }

N'affectez pas les bus de stockage et d'affichage indépendamment : ils mobilisent tous deux des groupes de GPIO précieux et peuvent influer sur l'empilage des couches du PCB. Avant de figer le schéma, confirmez le type de stockage de démarrage, les pull-up, le domaine de tension, le comportement de l'interrupteur d'alimentation et l'accès à l'outillage de test.

<div align="center"><em>Tableau 5.6-1 : Interface Flash QSPI du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal flash | Signal E/S | Description détaillée |
| :--- | :--- | :--- |
| CS# | PA06 | Sélection de puce, active à l'état bas. |
| SO | PA07 | Entrée de données (E/S de données 1) |
| WP# | PA08 | Sortie de protection en écriture (E/S de données 2) |
| SI | PA09 | Sortie de données (E/S de données 0) |
| SCLK | PA10 | Sortie d'horloge série |
| Hold# | PA11 | Sortie de données (E/S de données 3) |

</div>

<div align="center"><em>Tableau 5.6-2 : Interface Flash SDIO du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal flash | Signal E/S | Description détaillée |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Signal de commande |
| SD2_D1 | PA11 | Donnée 1 |
| SD2_D0 | PA10 | Donnée 0 |
| SD2_CLK | PA08 | Signal d'horloge |
| SD2_D2 | PA06 | Donnée 2 |
| SD2_D3 | PA07 | Donnée 3 |

</div>

<div align="center"><em>Tableau 5.6-3 : Interface Flash QSPI du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal flash | Signal E/S | Description détaillée |
| :--- | :--- | :--- |
| CS# | PA06 | Sélection de puce, active à l'état bas. |
| SO | PA07 | Entrée de données (E/S de données 1) |
| WP# | PA08 | Sortie de protection en écriture (E/S de données 2) |
| SI | PA09 | Sortie de données (E/S de données 0) |
| SCLK | PA10 | Sortie d'horloge série |
| Hold# | PA11 | Sortie de données (E/S de données 3) |

</div>

<div align="center"><em>Tableau 5.6-4 : Interface Flash SDIO du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal flash | Signal E/S | Description détaillée |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Signal de commande |
| SD2_D1 | PA11 | Donnée 1 |
| SD2_D0 | PA10 | Donnée 0 |
| SD2_CLK | PA08 | Signal d'horloge |
| SD2_D2 | PA06 | Donnée 2 |
| SD2_D3 | PA07 | Donnée 3 |

</div>

<div align="center"><em>Tableau 5.6-5 : Interface eMMC du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal eMMC | Signal E/S | Description détaillée |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | Signal de commande |
| SD1_CLK | PA26 | Signal d'horloge |
| SD1_D0 | PA22 | Donnée 0 |
| SD1_D1 | PA15 | Donnée 1 |
| SD1_D2 | PA12 | Donnée 6 |
| SD1_D3 | PA20 | Donnée 3 |
| SD1_D4 | PA21 | Donnée 4 |
| SD1_D5 | PA19 | Donnée 5 |
| SD1_D6 | PA13 | Donnée 6 |
| SD1_D7 | PA14 | Donnée 7 |

</div>

!!! warning "Vérifier l'affectation des lignes de données SD1 du SF32LB56xV"
    La source SiFli désigne PA12 comme SD1_D2, mais le décrit comme `Data 6` ; elle attribue aussi `Data 6` à SD1_D6 et ne comporte aucune ligne `Data 2`. Avant le routage, vérifiez l'affectation réelle dans la documentation pin-mux publiée. Le tableau conserve les entrées publiées par SiFli.

<div align="center"><em>Tableau 5.6-6 : Interface I2C des capteurs</em></div>

<div align="center" markdown>

| Signal I2C | E/S | Description détaillée |
| :--- | :--- | :--- |
| SDA | PA18 | Signal de données I2C des capteurs de suivi de lumière |
| SCL | PA17 | Signal d'horloge I2C des capteurs de suivi de lumière |

</div>

Adaptez l'alimentation des E/S mémoire au niveau logique de la mémoire connectée : VDDIO3 pour la variante U et VDDIOA2 pour la variante V. Reliez la broche Hold# de la mémoire SPI NAND à son alimentation par une résistance de rappel de 10 kΩ. SD1/eMMC n'est disponible que sur la variante V ; n'appliquez pas à U le tableau des broches SD1/eMMC de V, car U utilise l'interface de stockage SD2.

<div align="center"><em>Tableau 5.6-7 : Interface audio du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal audio | E/S | Description détaillée |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrée microphone analogique différentielle P ou asymétrique |
| AU_ADC1N | ADCN | Entrée microphone analogique différentielle N ou GND |
| AU_DAC1P | DACP | Sortie analogique différentielle P |
| AU_DAC1N | DACN | Sortie analogique différentielle N |

</div>

<div align="center"><em>Tableau 5.6-8 : Interface audio du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal audio | E/S | Description détaillée |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Entrée microphone analogique différentielle P ou asymétrique |
| AU_ADC1N | ADCN | Entrée microphone analogique différentielle N ou GND |
| AU_DAC1P | DACP | Sortie analogique différentielle P |
| AU_DAC1N | DACN | Sortie analogique différentielle N |
| I2S1_LRCK | PA71 | Horloge de trame I2S2 |
| I2S1_SDI | PA69 | Entrée de données I2S2 |
| I2S1_SDO | PA64 | Sortie de données I2S2 |
| I2S1_BCK | PA73 | Horloge de bit I2S2 |

</div>

!!! warning "Vérifier l'instance I2S de la variante V"
    Le tableau des broches et les noms de réseau du schéma SiFli désignent ces broches comme I2S1_LRCK/SDI/SDO/BCK, tandis que les descriptions du tableau les présentent comme des signaux I2S2. L'instance périphérique n'est donc pas déterminée ; vérifiez-la dans la documentation pin-mux publiée avant d'affecter ces broches.

Pour un microphone analogique différentiel externe, placez des condensateurs de blocage CC d'au moins 2,2 µF sur les entrées ADC et alimentez le microphone depuis MIC_BIAS. Le schéma de référence U pour microphone MEMS alimente MIC_BIAS via 1 kΩ et ajoute un condensateur de découplage de 4,7 µF ; il montre également un condensateur de couplage de 0,01 µF sur la sortie du microphone. Le schéma de référence U pour PA analogique utilise des condensateurs de couplage d'entrée de 33 nF et place le filtre passe-bas différentiel près de la puce. Routez les sorties DAC analogiques en paire différentielle protégée par la masse ; limitez la capacité parasite à moins de 10 pF et la longueur à moins de 2 cm. La variante V dispose aussi d'I2S ; son amplificateur I2S de référence se configure via I2C3. Placez les condensateurs d'alimentation et de référence audio près de leurs broches et éloignez l'audio analogique des convertisseurs à découpage et des signaux numériques rapides.

Les deux variantes prennent en charge le PWM pour les moteurs de vibration. Le moteur peut être alimenté directement depuis VBAT si son courant de démarrage ne déstabilise pas le système. Lorsque `BSP_PM_FREQ_SCALING` est défini à `1`, le changement de fréquence du HCPU modifie également la fréquence PWM des broches PA ; utilisez alors une broche PB. PB32 est une entrée d'alimentation/reset active à l'état haut ; un appui d'au moins 10 s déclenche le reset. Le schéma U relie le bouton à VDDIOB via 1 kΩ et ajoute un pull-down de 10 kΩ ainsi qu'un condensateur de 0,1 µF vers GND. Le schéma V utilise une résistance série de 1 kΩ depuis VDD_1V8 et un pull-down de 10 kΩ. Les autres boutons et encodeurs rotatifs nécessitent des pull-up. Pour un encodeur mécanique qui ne revient pas à l'état arrêt après rotation, l'alimentation du pull-up doit pouvoir être coupée en Standby afin d'éviter les fuites.

U fournit PBR0–PBR2 et V fournit PBR0–PBR3. Au démarrage, PBR0 passe de Low à High et peut commander un interrupteur de charge externe ; les autres broches PBR sont à Low par défaut. Les broches PBR peuvent fonctionner en sortie en Standby et Hibernate et transporter LPTIM ; toutes sauf PBR0 peuvent aussi fournir une horloge de 32 kHz. Elles peuvent être configurées en entrées de réveil, mais le MCU ne reçoit pas d'interruption depuis cette entrée après son réveil. Privilégiez les broches PB du LCPU pour l'I2C, le SPI, la commande et les interruptions de réveil des capteurs. L'alimentation des capteurs peut être commutée selon les besoins depuis une sortie LVSW ou LDO du SF30147C.

Toutes les broches PA de U/V peuvent être multiplexées en UART, I2C ou GPTIM. Pour U, les exceptions sont PB32/PB33/PB34 et PBR0/PBR1/PBR2 ; pour V, PB32–PB36 et PBR0–PBR3. Vérifiez ces restrictions avec les affectations de réveil, de boutons et de PBR.

### 5.7. Fabrication { #57-manufacturing }

Prévoyez l'accès au débogage et à la programmation, le mode de programmation en production, l'accès à l'étalonnage du quartz, des points de mesure de la puissance, l'accès aux tests RF et la visibilité de la commande du PMIC. Vérifiez que l'outillage de test peut alimenter la carte, imposer le mode de démarrage/téléchargement, communiquer avec la puce et recueillir les données d'étalonnage.

Réservez au minimum les points de test suivants : VBAT, GND, VDDIO2 sur U (VDDIOB sur V), Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD et l'une des broches PB20/PB21/PB25. Lors du raccordement d'un J-Link, configurez son alimentation sur entrée externe afin que la carte cible alimente le débogueur. Le dispositif de téléchargement de production et d'étalonnage du quartz doit pouvoir accéder à ces points.

<div align="center"><em>Tableau 5.7-1 : Interface de débogage et de programmation du SF32LB56xU</em></div>

<div align="center" markdown>

| Signal | Broche | Description détaillée |
| :--- | :--- | :--- |
| SWCLK | PB15 | Signal d'horloge J-Link, interface de débogage |
| SWDIO | PB13 | Signal de données J-Link, interface de débogage |
| UART4_RXD | PB16 | Réception UART, interface de téléchargement et de sortie des journaux |
| UART4_TXD | PB17 | Transmission UART, interface de téléchargement et de sortie des journaux |

</div>

<div align="center"><em>Tableau 5.7-2 : Interface de débogage et de programmation du SF32LB56xV</em></div>

<div align="center" markdown>

| Signal | Broche | Description détaillée |
| :--- | :--- | :--- |
| SWCLK | PB15 | Signal d'horloge J-Link, interface de débogage |
| SWDIO | PB13 | Signal de données J-Link, interface de débogage |
| UART4_RXD | PB16 | Réception UART, interface de téléchargement et de sortie des journaux |
| UART4_TXD | PB17 | Transmission UART, interface de téléchargement et de sortie des journaux |

</div>
