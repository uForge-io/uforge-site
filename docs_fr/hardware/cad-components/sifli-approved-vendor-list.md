---
icon: lucide/component
description: "La liste de fournisseurs approuvés de SiFli pour les conceptions SF32 : quartz qualifiés, inductances de convertisseurs abaisseurs, mémoires Flash NOR/NAND et SD-NAND, et pilotes LCD, avec les critères de sélection et les vérifications de nomenclature."
tags:
    - Matériel
    - Fournisseur
    - AVL
---

# Liste de fournisseurs approuvés SF32 { #sf32-approved-vendor-list }

## À quoi sert cette liste { #what-this-list-is-for }

La **liste de fournisseurs approuvés (AVL)** consigne les qualifications de composants réalisées par SiFli pour les conceptions SF32. V0.3 répertorie des résonateurs à quartz, des inductances de convertisseurs abaisseurs, des mémoires Flash NOR/NAND, de la SD-NAND et un pilote LCD ; la feuille des contrôleurs tactiles est vide. Utilisez cette liste pour présélectionner des composants et repérer des fournisseurs de remplacement. Validez ensuite la référence exacte sur votre carte, avec le firmware prévu, dans le boîtier du produit et au regard du procédé de fabrication et de la chaîne d’approvisionnement envisagés. L’inscription ne remplace pas la validation du produit.

Cette page reprend le classeur AVL officiel de SiFli, **`SIFLI-MCU-AVL-认证表`, version V0.3 (2026-01-21)**. L’AVL peut évoluer à mesure que de nouvelles références sont qualifiées ; cette page présente la version V0.3 datée du 2026-01-21 et n’est pas actualisée en temps réel. Cette vérification confirme uniquement le contenu de V0.3 ; elle ne permet pas d’établir si une référence reste qualifiée dans une révision ultérieure de l’AVL. Consultez le classeur source en vigueur avant de figer la BOM :

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[Liste de fournisseurs approuvés SiFli (AVL) : télécharger V0.3 .xlsx](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[Wiki SiFli — guides de conception matérielle et téléchargements](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "Comment utiliser cette liste"
    La source donne des exigences générales pour les quartz et les inductances de convertisseurs abaisseurs ; les autres tableaux consignent surtout les données de chaque référence. Évaluez les candidats selon ces exigences sans supposer que chaque composant inscrit respecte toutes les limites générales : les incohérences de la source sont signalées ci-dessous. Les colonnes entièrement vides, notamment la prise en charge des outils de téléchargement Flash, sont omises ; cela ne confirme pas cette prise en charge. Dans les tableaux détaillés, un tiret (—) signifie généralement que la version V0.3 ne fournit aucune valeur pour le champ concerné. Dans les cellules d’horloge DTR des NOR Flash, il correspond en revanche à la mention explicite « non pris en charge » de la source ; voir la note sur les NOR Flash.

Pour établir votre nomenclature, procédez en trois étapes plutôt que de simplement choisir une référence :

1. **Présélectionnez selon les exigences.** Vérifiez la capacité, la tension d'alimentation, le boîtier et les exigences propres à chaque type de composant (capacité de charge des quartz, DCR/Isat des inductances, fréquence SDR/DTR des mémoires Flash) en fonction de votre schéma et de votre budget énergétique.
2. **Vérifiez aussi les contraintes que ne révèlent pas les principales caractéristiques de la fiche technique.** Confirmez la plage de température requise pour l'exploitation et le stockage, l'ID fabricant/JEDEC exact attendu par le firmware et la prise en charge de l'OTA, du système de fichiers ou de l'outil de programmation sur cette référence précise, et non seulement sur une autre référence de la même famille.
3. **Validez sur le matériel réel avant la production en série.** Mesurez les courants en veille et en fonctionnement sur votre carte, vérifiez à nouveau le calibrage RF du quartz avec le PCB et le boîtier définitifs, et identifiez au moins une seconde source pour chaque composant à fournisseur unique.

## Aperçu de la couverture { #coverage-at-a-glance }

<div align="center"><em>Tableau : aperçu de la couverture</em></div>

<div align="center" markdown>

| Catégorie | Composants qualifiés | Critères de sélection principaux |
|:---|---:|:---|
| Quartz 48 MHz | 10 | Capacité de charge, tolérance de fréquence, ESR, temps de démarrage, calibrage CBANK, décalage de fréquence Bluetooth |
| Quartz 32,768 kHz | 5 | Capacité de charge, tolérance de fréquence, ESR, boîtier, température de fonctionnement |
| Inductances de convertisseurs abaisseurs | 8 | Valeur 4,7 µH, DCR, courant de saturation (Isat), courant nominal (Irms), SRF, compatibilité boîtier 2016 |
| Mémoire Flash NOR | 44 | Capacité, rail de tension, horloge SDR/DTR, ID indiqué, courant en veille/deep-power-down |
| Mémoire Flash SPI-NAND | 18 | Capacité, mode ECC, géométrie page/bloc, Golden Block, courants veille/lecture/programmation |
| Mémoire Flash SD-NAND | 5 | Compatibilité SD 2.0, fonctionnement à 50 MHz, courant en veille, plage de température de fonctionnement |
| Pilotes LCD | 1 | Une référence répertoriée ; confirmez les contraintes temporelles de la dalle, le pilote et le mode d’interface avant la sortie |
| Contrôleurs de dalles tactiles | 0 | Aucune entrée dans V0.3 ; confirmez séparément la qualification et le pilote |

</div>

Ce résumé présente la couverture de V0.3. Le choix des composants d’affichage et tactiles mérite une attention particulière : cette version ne contient qu’un pilote LCD et aucun contrôleur tactile. Confirmez la référence auprès de SiFli et validez-la dans le produit ; son ajout à une révision ultérieure ne supprime pas cette exigence.

## Historique des révisions { #revision-history }

<div align="center"><em>Tableau : historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Auteur | Changement |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Publication initiale. |
| V0.2 | 2025-07-16 | yzli | Ajout des quartz 48 MHz Huilun et JWT (晶威特). |
| V0.3 | 2026-01-21 | yzli | Ajout de mémoires Flash NOR UCUN : UC25WQ80IB, UC25IQ32A, UC25IQ64A, UC25IQ128A. |

</div>

---

## Quartz { #crystal-oscillators }

L'AVL couvre les quartz système de 48 MHz et les quartz RTC de 32,768 kHz. Consultez les exigences relatives aux sources d'horloge dans le guide de conception de la référence SF32 exacte, puis sélectionnez selon la capacité de charge, la tolérance de fréquence, l'ESR, le démarrage et le budget énergétique. Ces tableaux de qualification n'imposent pas une configuration d'horloge unique à tous les produits SF32.

### Quartz système 48 MHz { #48-mhz-system-crystal }

!!! info "Exigence"
    Capacité de charge CL ≤ 12 pF (7 pF recommandé) · Écart de fréquence ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω recommandé)

<div align="center"><em>Composants qualifiés — quartz système 48 MHz</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | CL | ΔF/F0 | ESR | Temp. de fonctionnement | Boîtier | Temps de démarrage | Courant additionnel | CBANK_SEL optimal | Décalage de fréq. TX Ch39 (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8,8 pF | −10 à +9 ppm | ≤22 Ω | −30°C à +85°C | métrique 2016 | <700 µs | 0 µA | 0x1C9 | −32 à −1 kHz / ±20 kHz / +33 à +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −20°C à +75°C | métrique 2016 | <800 µs | <30 µA | 0x1DC | −52 à −15 kHz / ±22 kHz / +50 à +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −40°C à +85°C | métrique 2016 | <800 µs | <30 µA | 0x1F7 | −53 à +13 kHz / ±30 kHz / +44 à +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30°C à +85°C | métrique 2016 | <700 µs | 0 µA | 0x195 | −40 à +1 kHz / −25 à +14 kHz / +12 à +45 kHz |
| HS48000013 | 汇隆电子 | 8,8 pF | ±10 ppm | ≤22 Ω | −30°C à +85°C | métrique 2016 | <700 µs | <12 µA | 0x1F3 | −27 à +8 kHz / −25 à +10 kHz / −1,2 à +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30°C à +85°C | métrique 2016 | <700 µs | <10 µA | 0x1F4 | −41 à +7 kHz / −30 à +20 kHz / +5 à +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30°C à +85°C | métrique 2016 | <750 µs | <50 µA | 0x196 | −38 à 0 kHz / −28 à 0 kHz / −4 à +45 kHz |
| 8Y48090002 | TXC (晶技) | 8,8 pF | −6 à +8 ppm | ≤22 Ω | −30°C à +85°C | métrique 2016 | <700 µs | <30 µA | 0x1D0 | −34 à −9,6 kHz / — / +27,9 à +46,1 kHz |
| 9S48000051 | 惠伦晶体 | 8,8 pF | −6 à +8 ppm | ≤20 Ω | −30°C à +85°C | métrique 2016 | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8,8 pF | ±8 ppm | ≤22 Ω | −30°C à +85°C | métrique 2016 | <700 µs | <10 µA | 0x1D0 | −34 à −9,6 kHz / −25 à +10 kHz / +27,9 à +46,1 kHz |

</div>

!!! tip "Ce que signifient les colonnes de calibrage RF"
    **CBANK_SEL** est le réglage indiqué dans les données de qualification de SiFli. **TX Ch39 Freq Offset** conserve le libellé d'essai de la source et les résultats à trois températures. Le classeur ne précise ni le mode Bluetooth ni la fréquence d'essai ; ne supposez pas qu'il s'agit du canal publicitaire BLE 39 ou d'un canal particulier en milieu de bande. Confirmez les conditions d'essai et la procédure de calibrage avant de comparer les résultats ou d'appliquer les réglages à votre carte. Trois références TKD indiquent ESR ≤40 Ω malgré l'exigence générale ≤30 Ω ; cette divergence doit également être clarifiée.

Les courants supplémentaires du tableau des quartz n'ont ni valeur de référence ni configuration d'essai complète documentées. Il ne s'agit pas du courant d'alimentation du quartz seul ; confirmez la définition de la mesure avant de comparer les candidats ou d'utiliser ces valeurs dans le budget énergétique du système.

### Quartz RTC 32,768 kHz { #32768-khz-rtc-crystal }

!!! info "Exigence"
    Capacité de charge CL ≤ 12,5 pF (7 pF recommandé) · Écart de fréquence ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ recommandé)

<div align="center"><em>Composants qualifiés — quartz RTC 32,768 kHz</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | CL | ΔF/F0 | ESR | Temp. de fonctionnement | Boîtier | Pourcentages de la source ; signification à confirmer (−35°C / 25°C / 105°C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C à +85°C | métrique 3215 | 32 % à 55 % / 43 % à 54 % / 38 % à 45 % |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C à +85°C | métrique 3215 | 33 % à 54 % / 42 % à 56 % / 35 % à 44 % |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40°C à +85°C | métrique 1610 | 35 % à 61 % / 42 % à 58 % / 36 % à 48 % |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C à +85°C | métrique 3215 | 43 % à 60 % / 45 % à 59 % / 37 % à 48 % |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40°C à +85°C | métrique 3215 | 34 % à 55 % / 41 % à 54 % / 36 % à 46 % |

</div>

Le classeur indique 32,76 kHz pour chaque composant à trois températures d'essai distinctes : −35°C, 25°C et 105°C. Cette précision d'affichage ne démontre ni une exactitude à l'échelle du ppm ni les performances sur toute la plage thermique. Les pourcentages du tableau figurent dans des colonnes intitulées `TX_CH39_Freq_offset(KHz)` dans la source, bien que leur format évoque des mesures de rapport cyclique. Confirmez leur signification auprès de SiFli avant de les utiliser comme limites de rapport cyclique. L'essai à 105°C n'étend pas non plus la plage de fonctionnement indiquée, de −40°C à +85°C. La limite d'ESR de 90 kΩ du composant Epson dépasse l'exigence générale de 80 kΩ ; cette divergence de la source est conservée et son acceptabilité doit être confirmée pour votre conception.

---

## Inductances de convertisseurs abaisseurs { #buck-inductors }

!!! info "Exigence"
    Inductance L = 4,7 µH ±20 % · Résistance en courant continu (DCR) ≤ 0,4 Ω · Courant de saturation (Isat) ≥ 450 mA

<div align="center"><em>Inductances qualifiées pour les convertisseurs abaisseurs</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Type | Tolérance | SRF | DCR | Isat | Irms | Boîtier |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Bobiné | ±20 % | 21 MHz | ≤288 mΩ | 1,3 A | 1,45 A | 0806 (métrique 2016) |
| WPN201610H4R7MT | Sunlord | Bobiné | ±20 % | 25 MHz | ≤425 mΩ | 1,2 A | 1,0 A | 0806 (métrique 2016) |
| HTTX20161T-4R7MDR | Cyntec | Bobiné | ±20 % | — | ≤250 mΩ | 1,7 A | 1,5 A | 0806 (métrique 2016) |
| VLS201612CX-4R7M-1 | TDK | Bobiné | ±20 % | 51 MHz | ≤252 mΩ | 0,88 A | 1,32 A | 0806 (métrique 2016) |
| CIGW201610GL4R7MLE | Samsung | Bobiné | ±20 % | — | ≤240 mΩ | 1,4 A | 1,4 A | 0806 (métrique 2016) |
| DFE201612E-4R7M=P2 | Murata | Bobiné | ±20 % | — | ≤252 mΩ | 1,8 A | 1,2 A | 0806 (métrique 2016) |
| SWAI201610H4R7M | 三体微 | Bobiné | ±20 % | — | ≤390 mΩ | 1,3 A | 1,05 A | 0806 (métrique 2016) |
| FSHJ201610-4R7M | 方磁 | Bobiné | ±20 % | — | ≤425 mΩ | 1,1 A | 0,9 A | 0806 (métrique 2016) |

</div>

La présence dans ce tableau ne rend pas les huit inductances électriquement interchangeables. WPN201610H4R7MT et FSHJ201610-4R7M ont chacune une DCR maximale indiquée de 425 mΩ, supérieure à l'exigence générale de 0,4 Ω. Le classeur n'explique pas cette divergence ; confirmez leur acceptabilité auprès de SiFli au lieu de supposer qu'elles respectent cette limite. Pour chaque candidate, vérifiez les pertes liées à la DCR, Isat, Irms, SRF, l'empreinte, la hauteur et l'élévation de température en fonction du courant réel dans l'inductance et des conditions du convertisseur, et non du courant moyen du produit complet.

---

## Mémoire Flash NOR { #nor-flash }

V0.3 répertorie 44 références de Flash NOR de 4 Mb à 256 Mb, regroupées par capacité. Les fréquences indiquées concernent les mémoires et ne garantissent pas ces vitesses sur tous les composants SF32 ou toutes les cartes. Vérifiez les commandes de lecture, les limites du contrôleur, les contraintes temporelles et l’identification par le pilote pour votre conception. La source nomme les valeurs hexadécimales « Manufacture ID », mais elles comprennent aussi des champs d’identification du composant : comparez la réponse complète attendue, pas seulement l’octet du fabricant. Calculez la consommation active et en veille avec des courants dont les conditions de fonctionnement sont documentées.

### 4 Mb – 16 Mb { #4-mb-16-mb }

Aucun des six composants de cette tranche de capacité ne prend en charge le mode DTR ; une seule colonne d'horloge SDR est donc affichée.

<div align="center"><em>Composants qualifiés — mémoire Flash NOR 4 Mb à 16 Mb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Capacité | Tension | Plage de temp. | Horloge SDR max | ID indiqué | Veille | Deep Power-Down | Courant de lecture active |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1,65–3,6 V | −40°C à +85°C | 85 MHz @1,8 V / 104 MHz @3,3 V | 0x856013 | 10 µA | 0,1 µA @1,8 V / 0,6 µA @3,3 V | 3,5 mA @85 MHz (1,8 V) / 5 mA @85 MHz (3,3 V) / EDH: non pris en charge |
| P25Q80LE | PUYA | 8 Mb | 1,65–2,0 V | −40°C à +85°C | 104 MHz | 0x856014 | 9 µA | 0,1 µA | 1,5 mA @85 MHz / EDH: non pris en charge |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz | 0xC86014 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: non pris en charge |
| UC25WQ80IB | UCUN | 8 Mb | 1,65–3,6 V | −40°C à +85°C | 104 MHz | 0xB36014 | 1,5 µA | 0,5 µA | 6 mA @85 MHz / EDH: non indiqué |
| P25Q16LE | PUYA | 16 Mb | 1,65–2,0 V | −40°C à +85°C | 104 MHz | 0x856015 | 18 µA | 0,1 µA | 3 mA @85 MHz / EDH: non pris en charge |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz | 0xC86015 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: non pris en charge |

</div>

### 32 Mb – 64 Mb { #32-mb-64-mb }

<div align="center"><em>Composants qualifiés — mémoire Flash NOR 32 Mb à 64 Mb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Capacité | Tension | Plage de temp. | Horloge max (SDR / DTR) | ID indiqué | Veille | Deep Power-Down | Courant de lecture active |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1,65–2,0 V | −40°C à +85°C | 120 MHz / — | 0x856016 | 9 µA | 0,2 µA | 2 mA @85 MHz / EDH: non pris en charge |
| SK25LE032 | SK | 32 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz / — | 0xC86016 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: non pris en charge |
| UC25IQ32A | UCUN | 32 Mb | 2,7–3,6 V | −40°C à +85°C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: non indiqué |
| P25Q64LE | PUYA | 64 Mb | 1,65–2,0 V | −40°C à +85°C | 104 MHz / — | 0x856017 | 18 µA | 0,3 µA | 2 mA @85 MHz / EDH: non pris en charge |
| P25Q64H | PUYA | 64 Mb | 2,3–3,6 V | −40°C à +85°C | 120 MHz / — | 0x856017 | 18 µA | 0,6 µA | 4 mA @85 MHz / EDH: non pris en charge |
| P25Q64SH | PUYA | 64 Mb | 2,3–3,6 V | −40°C à +85°C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0,3 µA | 6,8 mA @85 MHz (SDR) / 9,45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz / — | 0xC86017 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: non pris en charge |
| ZB25LQ64A | ZBIT | 64 Mb | 1,65–2,0 V | −40°C à +85°C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: non indiqué |
| BY25Q64ES | BOYA | 64 Mb | 2,7–3,6 V | −40°C à +85°C | 120 MHz / — | 0x684017 | 9 µA | 0,4 µA | 6 mA @80 MHz / EDH: non pris en charge |
| UC25IQ64A | UCUN | 64 Mb | 2,7–3,6 V | −40°C à +85°C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz / EDH: non indiqué |

</div>

### 128 Mb { #128-mb }

<div align="center"><em>Composants qualifiés — mémoire Flash NOR 128 Mb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Tension | Plage de temp. | Horloge max (SDR / DTR) | ID indiqué | Veille | Deep Power-Down | Courant de lecture active |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1,65–2,0 V | −40°C à +85°C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0,5 µA | 4,5 mA @85 MHz / EDH: non indiqué |
| PY25Q128HA | PUYA | 2,7–3,6 V | −40°C à +85°C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz (SDR) / 9 mA @66 MHz (DTR) |
| SK25LP128 | SK | 1,65–2,0 V | −40°C à +85°C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1,65–2,0 V | −40°C à +85°C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz / EDH: non pris en charge |
| GD25Q128E | GD (GigaDevice) | 2,7–3,6 V | −40°C à +85°C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz / EDH: non pris en charge |
| GD25F128F | GD (GigaDevice) | 2,7–3,6 V | −40°C à +85°C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: non indiqué |
| W25Q128JW | Winbond | 1,7–1,95 V | −40°C à +85°C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — / EDH: non pris en charge |
| W25Q128JV | Winbond | 2,7–3,6 V | −40°C à +85°C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: non pris en charge |
| XT25F128F | XTX | 2,7–3,6 V | −40°C à +85°C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: non indiqué |
| XT25Q128DW | XTX | 1,7–2,0 V | −40°C à +85°C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0,4 µA | 9 mA @80 MHz / EDH: non indiqué |
| FM25W128 | FM | 1,65–3,6 V | −40°C à +85°C | 50 MHz @1,8 V / 100 MHz @3,3 V (SDR uniquement, DTR non pris en charge) | 0xA12818 | 5 µA | 1 µA @3,3 V | — / EDH: non pris en charge |
| XM25QU128C | XMC | 1,65–1,95 V | −40°C à +85°C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz / EDH: non pris en charge |
| ZB25VQ128D | ZBIT | 2,3–3,6 V | −40°C à +85°C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: non pris en charge |
| ZB25LQ128B | ZBIT | 1,65–2,0 V | −40°C à +85°C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz / EDH: non pris en charge |
| BY25Q128ES | BOYA | 2,7–3,6 V | −40°C à +85°C | 108 MHz / — | 0x684018 | 14 µA | 0,2 µA | 6 mA @80 MHz / EDH: non pris en charge |
| UC25IQ128A | UCUN | 2,7–3,6 V | −40°C à +85°C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz / EDH: non indiqué |

</div>

### 256 Mb { #256-mb }

<div align="center"><em>Composants qualifiés — mémoire Flash NOR 256 Mb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Tension | Plage de temp. | Horloge max (SDR / DTR) | ID indiqué | Veille | Deep Power-Down | Courant de lecture active |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1,7–1,95 V | −40°C à +85°C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz / EDH: non pris en charge |
| W25Q256JV | Winbond | 2,7–3,6 V | −40°C à +85°C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: non pris en charge |
| PY25Q256HB | PUYA | 2,7–3,6 V | −40°C à +85°C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11,5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1,65–2,0 V | −40°C à +85°C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz / EDH: non pris en charge |
| GD25Q256E | GD (GigaDevice) | 2,7–3,6 V | −40°C à +85°C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: non pris en charge |
| XM25QU256C | XMC | 1,65–1,95 V | −40°C à +85°C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz / EDH: non pris en charge |
| XM25QH256C | XMC | 2,3–3,6 V | −40°C à +85°C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz / EDH: non pris en charge |
| XT25F256BW | XTX | 2,7–3,6 V | −40°C à +85°C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0,5 µA | 8 mA @80 MHz / EDH: non indiqué |
| DS25M4BA | Dosilicon | 1,65–1,95 V | −40°C à +85°C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz / EDH: non indiqué |
| BY25Q256FS | BOYA | 2,7–3,6 V | −40°C à +85°C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz / EDH: non indiqué |
| MX25U25643G | MXIC (Macronix) | 1,65–2,0 V | −40°C à +85°C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0,8 µA | 7 mA @84 MHz / EDH: non indiqué |

</div>

!!! warning "Les courants et limites de mode nécessitent leurs conditions d'origine"
    Ce sont des valeurs consignées dans l'AVL, pas des mesures indépendantes réalisées par ce site. Sauf indication explicite, ne supposez pas qu'une valeur est typique ou maximale, ni que des conditions de tension, de température et d'horloge non précisées sont identiques entre lignes. Consultez la fiche technique et mesurez votre carte. Les courants de lecture proviennent des colonnes `EBH` et `EDH` de la source. « — » dans une cellule de courant signifie une valeur manquante ; dans la colonne d'horloge DTR, il correspond à un mode indiqué comme non pris en charge. La source nomme sa deuxième colonne d'horloge `TDR` ; cette page utilise `DTR`, mais le mode de lecture et la commande doivent être vérifiés pour la référence exacte.

    Les indications EDH conservent la distinction de la source entre données absentes et fonctionnement non pris en charge ; elles ne sont pas déduites de la colonne de fréquence. P25Q128L présente une incohérence : sa fréquence SDR maximale est donnée à 70 MHz, mais le courant de lecture est indiqué à 85 MHz. Les deux valeurs sont conservées ; confirmez les conditions valides avant de les utiliser.

---

## Mémoire Flash SPI-NAND { #spi-nand-flash }

V0.3 répertorie 18 références SPI-NAND de 512 Mb et 1 Gb. Avec un pilote et une pile logicielle compatibles, elles peuvent stocker des fichiers ou des données ; FatFS, FlashDB et LittleFS en sont des exemples, mais la compatibilité avec la référence choisie doit être validée. L’accès page par page, la gestion de l’ECC et celle des blocs défectueux diffèrent de l’accès XIP direct en NOR. Pour toutes les références, la valeur indiquée dans le classeur pour **Golden Block** est `block0`, sans précision sur les conditions de garantie ni sur les routines du firmware qui en dépendent. Vérifiez ces hypothèses dans la documentation du composant et du SDK.

Pour GD5F1GM7RE et GD5F1GM7UE, la source indique `2048+64` octets par page, mais `128K+8K` octets par bloc. Les tailles de la zone de réserve ne concordent pas avec un calcul direct à partir des pages. Le tableau conserve les deux valeurs ; confirmez la géométrie des pages, des blocs et des zones de réserve dans la fiche technique de la référence exacte avant de configurer le pilote.

### 512 Mb { #512-mb }

<div align="center"><em>Composants qualifiés — mémoire Flash SPI-NAND 512 Mb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Tension | Plage de temp. | ID indiqué | Taille page / bloc | Débit max | ECC | Golden Block | Veille | Lecture page | Programmation/Effacement |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2,7–3,6 V | −40°C à +85°C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1,7–1,95 V | −40°C à +85°C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1,7–1,95 V | −40°C à +85°C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2,7–3,6 V | −40°C à +85°C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb { #1-gb }

<div align="center"><em>Composants qualifiés — mémoire Flash SPI-NAND 1 Gb</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Tension | Plage de temp. | ID indiqué | Taille page / bloc | Débit max | ECC | Golden Block | Veille | Lecture page | Programmation/Effacement |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1,7–1,95 V | −40°C à +85°C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2,7–3,6 V | −40°C à +85°C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1,7–2,0 V | −40°C à +85°C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2,7–3,6 V | −40°C à +85°C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW 8-bit | `block0` | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2,7–3,6 V | −40°C à +85°C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW 1-bit | `block0` | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1,7–1,98 V | −40°C à +85°C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW 4-bit | `block0` | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2,7–3,6 V | −40°C à +85°C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW 4-bit | `block0` | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1,7–1,95 V | −40°C à +85°C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW 8-bit | `block0` | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2,7–3,6 V | −40°C à +85°C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1,7–1,95 V | −40°C à +85°C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2,7–3,6 V | −40°C à +85°C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2,7–3,6 V | −40°C à +85°C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW 8-bit | `block0` | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1,75–1,95 V | −40°C à +85°C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW 1-bit | `block0` | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1,7–1,95 V | −40°C à +85°C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW 8-bit | `block0` | 30 µA | 17 mA | 26 mA |

</div>

Avant d'implémenter la détection de la mémoire Flash, vérifiez la séquence de lecture de l'ID JEDEC/fabricant dans la fiche technique de chaque référence. Le nombre d'octets renvoyés après l'opcode `0x9F` dépend du fournisseur : certains composants renvoient un ID sur 2 octets, `DID1`+`DID2`, d'autres un seul octet. Ces différences peuvent provoquer une erreur « Flash non reconnue » lors de la mise en service d'un composant obtenu auprès d'un fournisseur de remplacement.

---

### Séquences de lecture d'ID de la source { #read-jedec-id-sequences }

Le classeur indique les trois formats de lecture d'ID suivants. `MID` désigne l'ID du fabricant ; `DID`, `DID1` et `DID2` désignent les champs d'ID du composant. Ce sont des chaînes reprises de la source, et non des transactions directement exécutables. Avant l'implémentation, confirmez l'opcode, la phase dummy ou d'adresse, le nombre d'octets renvoyés et la temporisation de sélection du circuit dans la fiche technique de la référence exacte. Les ID hexadécimaux des tableaux ne correspondent pas tous à un seul octet d'ID fabricant.

<div align="center"><em>Séquences de lecture d'ID SPI-NAND indiquées dans V0.3</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Composants | Séquence de la source |
|:---|:---|
| F35SQA512M, F35UQA512M, W25N01GW, W25N01GV, F35SQA001G, TC58CYG0S3HRAIJ | `9F+dummy(8bit)+MID+DID1+DID2` |
| DS35M12B, DS35Q12B, GD5F1GM7RE, GD5F1GM7UE, DS35M1GB, DS35Q1GB, FM25SL01 | `9F+dummy(8bit)+MID+DID` |
| HYF1GQ4IDACAE, HYF1GQ4UDACAE, XT26Q01D, XT26G01C, ZB35Q01A | `9F+00+MID+DID` |

</div>

---

## Mémoire Flash SD-NAND { #sd-nand-flash }

V0.3 répertorie cinq références SD-NAND qualifiées de 1 Gb avec une interface SD 2.0. Elles peuvent être envisagées pour un stockage fixe accessible par une interface SD, sans emplacement physique pour carte. Avant de les retenir, confirmez la compatibilité du contrôleur et du pilote avec la référence exacte et le design du produit.

<div align="center"><em>Composants qualifiés — mémoire Flash SD-NAND</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Plage de temp. | Tension | Interface | Horloge max | Veille | Courant de fonctionnement |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30°C à +85°C | 2,7–3,6 V | SD 2.0 | 50 MHz | 150 µA (typ.) | 15 mA @50 MHz (typ.) |
| XTSD01GLGEAG | XTX | −30°C à +85°C | 2,7–3,6 V | SD 2.0 | 50 MHz | 200 µA (max.) | 30 mA @50 MHz (max.) |
| XSSD01GGAI | XSS | 0°C à +70°C | 2,7–3,6 V | SD 2.0 | 50 MHz | 300 µA (max.) | 45 mA @50 MHz (max.) |
| MKDV1GCL-AB | MK | −25°C à +85°C | 2,7–3,6 V | SD 2.0 | 50 MHz | 50 µA (max.) | 28 mA @50 MHz (max.) |
| XS26D01GACW | Icthink | −25°C à +85°C | 2,7–3,6 V | SD 2.0 | 50 MHz | 250 µA (max.) | 100 mA @50 MHz (max.) |

</div>

XSSD01GGAI est donné pour 0°C à +70°C. Les quatre autres références ont une limite inférieure de −25°C ou −30°C et une limite supérieure de +85°C. Utilisez les limites réelles de chaque ligne sans supposer une même classe de température, puis vérifiez la marge nécessaire pour l’environnement du produit.

---

## Pilote LCD { #lcd-driver }

!!! warning "Pilotes d’affichage répertoriés dans V0.3"
    V0.3 contient un pilote LCD. Le [classeur V0.3](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) est une version figée, pas un lien vers les révisions futures. L’absence d’une référence ne signifie pas qu’elle n’est pas prise en charge ; confirmez-la auprès de SiFli avant de la retenir pour la production. MIPI et QSPI sont les interfaces du pilote d’affichage, pas nécessairement de chaque composant SF32. Vérifiez les interfaces et le pilote logiciel du circuit choisi ; consultez la [présentation graphique](../../learn/graphics/overview.md) et l’[architecture GPU ePicasso](../../learn/graphics/epicasso-gpu.md). La source indique `?MHz` pour SDR, sans valeur précise, et signale DDR comme non pris en charge.

<div align="center"><em>Composants qualifiés — pilote LCD</em></div>

<div align="center" markdown>

| Référence qualifiée | Fournisseur | Résolution | Type | Tension IO | Interface | GRAM | Profondeur de couleur | Débit max (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1,65–3,3 V | MIPI, QSPI | Oui | 16,7 M couleurs | Non précisé / non pris en charge |

</div>

---

## Contrôleur de dalle tactile { #touch-panel-controller }

V0.3 ne contient aucune référence de contrôleur tactile. Cela ne permet pas de conclure sur la qualification dans les révisions ultérieures ni sur l’absence de prise en charge d’un composant. Pour une référence envisagée, demandez aux équipes FAE ou commerciales de SiFli de confirmer la qualification et la disponibilité du pilote, en fournissant le code de commande exact et les exigences du produit. Consultez les [coordonnées de contact](../../about/index.md).

---

## Vérifications avant validation du design { #design-review-checklist }

Avant de figer un schéma ou une BOM, vérifiez chaque composant AVL sélectionné par rapport à la conception réelle du produit :

- [ ] La référence exacte, le boîtier, la classe de température et le suffixe de commande correspondent à la ligne approuvée ou font l'objet d'une procédure explicite de validation technique.
- [ ] La plage de tension correspond au rail IO SF32, au rail Flash, au rail d'affichage ou au rail du convertisseur d'alimentation utilisé sur la carte.
- [ ] Le boîtier, la géométrie des pastilles, la hauteur et les contraintes d'assemblage correspondent à la bibliothèque PCB et au processus de fabrication.
- [ ] Le firmware peut identifier correctement le composant par son ID JEDEC/fabricant ou, le cas échéant, par une vérification équivalente à l'exécution.
- [ ] Le comportement de démarrage, de téléchargement, d'OTA, de système de fichiers, d'affichage ou de pilote tactile a été vérifié sur le composant exact.
- [ ] Le courant basse consommation a été mesuré sur du matériel réel, et non recopié directement depuis l'AVL ou la fiche technique du composant.
- [ ] Le décalage de fréquence du quartz, le comportement de CBANK_SEL et le calibrage RF sont validés sur le PCB, l'antenne et le boîtier finaux.
- [ ] Le timing d'effacement/programmation/lecture de la Flash est testé dans la plage de tension et de température attendue du produit.
- [ ] Au moins un fournisseur alternatif est identifié pour chaque composant à risque élevé de la BOM, notamment les quartz, les inductances, la Flash et les dalles d'affichage.

Cette liste de contrôle applique volontairement des critères plus stricts que « le composant figure dans l'AVL ». L'AVL réduit l'espace de recherche ; la mise sur le marché dépend toujours des résultats de validation obtenus sur la carte.

## Liste de contrôle d'approvisionnement { #sourcing-checklist }

- [ ] Vérifiez la référence et le suffixe de révision par rapport à l'AVL téléchargeable actuelle — les versions datées du classeur, dont cette page, deviennent obsolètes à mesure que de nouveaux lots sont qualifiés.
- [ ] Pour les composants Flash, confirmez que l'ID Manufacturer/JEDEC attendu par votre code de mise en service correspond au composant exact commandé, pas seulement à la famille — certaines familles partagent un nom commercial mais renvoient des octets d'ID différents.
- [ ] Pour la NAND, la SD-NAND et tout composant servant au stockage d'un système de fichiers, vérifiez sur le matériel réel la prise en charge du démarrage et de l'outil de programmation, la procédure de mise à jour OTA et le fonctionnement de FatFS/FlashDB/LittleFS. Une lecture correcte lors de la mise en service ne suffit pas à valider le composant pour l'OTA.
- [ ] Vérifiez CBANK_SEL et le décalage de fréquence TX Ch39 indiqué sur votre carte. Le classeur ne précise ni le routage de référence ni le dispositif de mesure complet ; confirmez le mode et les conditions d’essai avant de comparer les résultats.
- [ ] Mesurez sur votre carte les courants de veille, de deep-power-down et de lecture. L’AVL ne documente pas entièrement l’origine et les conditions de chaque valeur ; vérifiez la fiche technique et les conditions de mesure.
- [ ] Confirmez que le boîtier et l'empreinte PCB correspondent à votre bibliothèque et à vos capacités d'assemblage, pas seulement à la spécification électrique.
- [ ] Pour tout composant ne figurant pas encore dans cette liste, qualifiez-le par rapport à la ligne d'exigence de sa classe de composant avant de l'engager dans une BOM, et envisagez de partager les données de qualification avec SiFli.
- [ ] Identifiez une seconde source pour chaque composant à fournisseur unique. V0.3 contient un pilote LCD et aucun contrôleur tactile ; confirmez la disponibilité et la prise en charge actuelles sans considérer cet instantané comme l’état le plus récent.
- [ ] Revérifiez cette liste avant chaque gel important de la nomenclature : cette version datée n'est pas une base de données actualisée en temps réel.

## Pages associées { #related-pages }

- [Guide de conception matérielle SF32LB52x](../chip-guides/SF32LB52x_hardware_design_guide.md) — conseils de schéma et de routage faisant référence directement à plusieurs composants de cette liste.
- Guide de conception matérielle SF32LB57x
- [Famille SF32](../../sf32-products/family/SF32_family.md)
