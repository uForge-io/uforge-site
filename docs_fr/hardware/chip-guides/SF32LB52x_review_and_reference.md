---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Liste de contrôle de revue de conception, documents et références connexes, annexes de schéma/PCB/mécanique/alimentation de référence, et historique des révisions pour le guide de conception matérielle SF32LB52x."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x — Liste de contrôle de revue de conception et références { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre les sections 7 à 10 : Liste de contrôle de revue de conception, Documents et références connexes, Annexes, et Historique des révisions. Retournez aux [Recommandations d'implantation et de routage PCB](SF32LB52x_pcb_layout.md).

## 7. Liste de contrôle de revue de conception { #7-design-review-checklist }

- [ ] La revue du système minimal est terminée : la variante exacte, le boîtier, l'architecture d'alimentation, le support de démarrage, les broches de configuration au démarrage, l'accès au débogage et au téléchargement, les horloges et la stratégie de réveil sont documentés
- [ ] Le modèle exact de la puce et la variante d'alimentation sont confirmés, et les schémas d'alimentation des deux variantes ne sont pas mélangés
- [ ] Les broches d'alimentation du processeur (VBUS/VBAT/VCC ou PVDD/VDDIOA/VDD_SIP) se trouvent dans la plage de tension indiquée dans la fiche technique
- [ ] L'inductance BUCK respecte 4,7 uH ±20 %, DCR ≤0,4 Ω, Isat ≥450 mA
- [ ] Variante alimentée par batterie : le chemin de charge, la plage de tension du composant OVP et la capacité des condensateurs de sortie du LDO intégré sont vérifiés
- [ ] Les quartz 48 MHz et 32,768 kHz respectent les spécifications recommandées ; le routage est conforme et les zones d'exclusion sont respectées
- [ ] La piste RF présente une impédance de 50 Ω et le réseau d'adaptation est placé près de la puce
- [ ] La configuration de démarrage depuis le stockage (y compris l'option eMMC de la variante alimentée par une alimentation régulée externe) correspond aux réglages des broches Bootstrap
- [ ] Vérifier que la broche de commande du commutateur d'alimentation du stockage correspond à la variante exacte ; résoudre l'écart PA11/PA21 entre la liste de contrôle officielle et les notes d'application avant la validation finale
- [ ] USB DP/DN sont routés en paire différentielle avec une impédance différentielle de 90 Ω
- [ ] Les signaux SDIO sont routés ensemble, avec une longueur totale ≤50 mm, un écart de longueur dans le groupe ≤6 mm et un blindage de masse
- [ ] Les broches multiplexées DBG_UART/SWD et les points de test de production sont réservés
- [ ] Les références des composants clés ont été vérifiées par rapport à la dernière [Liste des fournisseurs approuvés par SiFli][SiFli Approved Vendor List (AVL)]

## 8. Documents et références connexes { #8-related-documents-and-references }

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB52x (PDF officiel)][SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur SF32LB52x (PDF officiel)][SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[Dossier de conception de référence SF32LB52][SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[Note d'application matérielle SF32LB520/3/5/7 (source)][SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[Note d'application matérielle 52B/D/E/G/J (source)][52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[Liste de fournisseurs approuvés SF32 (locale)][Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[Liste de contrôle SiFli du schéma et du PCB SF32LB52 (XLSX)][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[Index des guides de conception matérielle SiFli pour les puces (Wiki)][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Références sources supplémentaires :

- [Présentation du produit SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [Fiche technique SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [Manuel de référence SF32LB52x](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [Note d'application matérielle SF32LB520/3/5/7](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [Note d'application matérielle 52B/D/E/G/J](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

La [liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) (section 5.8) et la [liste de contrôle de l'implantation et du routage PCB](SF32LB52x_pcb_layout_checklist.md) (section 6.15) reproduisent, point par point, la même *liste de contrôle Schéma & PCB SF32LB52* (V1.0, 2026-01-21). Elles accompagnent les recommandations de conception du schéma, d'implantation et de routage PCB auxquelles la vérification doit se référer.

## 9. Annexes { #9-appendices }

Les notes d'application originales de SiFli comprennent les figures de référence suivantes : schémas, implantation et routage PCB, mécanique et alimentation. Les annexes conservent ces figures d'origine pour documenter la revue de conception ; les sections 5 et 6 restent les principales recommandations de conception.

!!! note "Comment utiliser ces figures"
    Utilisez ces figures comme des exemples de circuits et de disposition issus des notes d'application originales. Confirmez l'implémentation finale pour le composant et le produit concernés à l'aide des règles, des tableaux, de la fiche technique, du manuel de référence, du dernier dossier de conception de référence et de l'AVL.

<div align="center"><em>Tableau 9-1 : Sommaire des annexes</em></div>

<div align="center" markdown>

| Besoin | Commencer ici |
|:---|:---|
| Exemples de schéma-blocs de montre connectée pour les deux groupes de conception SF32LB52x | Annexe A : Une application typique de montre connectée |
| Exemples de schémas pour la RF, le stockage et le démarrage, les boutons, le moteur, l'audio, l'horloge, l'USB et le DC/DC | Annexe B : Schémas de référence |
| Exemples de placement et de routage PCB pour RF, stockage, audio, empilement, fanout, horloge, USB, et DC/DC | Annexe C : Implantations et routages PCB de référence |
| Plans du contour et de la géométrie du boîtier, ainsi que du motif de pastilles recommandé | Annexe D : Mécanique |
| Schémas et implantations de référence pour la charge, l'OVP, l'architecture d'alimentation et le PMU | Annexe E : Alimentation |

</div>

### 9.1. Annexe A. Une application typique de montre connectée { #appendix-a-a-typical-smart-watch-application }

Une conception typique de montre connectée SF32LB52x comprend le MCU, l'afficheur, le contrôleur tactile, le stockage, les capteurs, le moteur de vibration, l'entrée/sortie audio, l'antenne Bluetooth, les sources d'horloge, la gestion de l'alimentation, l'accès au débogage et aux tests de production. La conception alimentée par batterie inclut en plus la gestion de la charge.
Les figures 9.1-1 et 9.1-2 montrent un afficheur QSPI, un accéléromètre/gyroscope sur SPI, un module de fréquence cardiaque sur I2C, un microphone analogique et une liaison DAC-amplificateur, un moteur de vibration commandé par PWM, une horloge de 48 MHz, la liaison RF Bluetooth et l'accès SWD/UART. QSPI NAND, SD NAND et NOR Flash sont des exemples de stockage, pas une liste exhaustive des supports de démarrage. Les deux schémas-blocs présentent un chargeur externe et une alimentation Buck/LDO. Choisissez l'architecture réelle selon la section 5.2, sans considérer ces schémas-blocs comme des circuits imposés.


![Figure 9.1-1 : Schéma d'application de montre connectée SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Figure 9.1-1 : Schéma d'application de montre connectée SF32LB520/3/5/7</em></div>

![Figure 9.1-2 : Schéma d'application de montre connectée 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Figure 9.1-2 : Schéma d'application de montre connectée 52B/D/E/G/J</em></div>

### 9.2. Annexe B. Schémas de référence { #appendix-b-reference-schematics }

**RF**

![Figure 9.2-1 : Schéma-blocs du frontal RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-1 : Schéma-blocs du frontal RF</em></div>

![Figure 9.2-2 : Référence de schéma RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-2 : Référence de schéma RF</em></div>

![Figure 9.2-3 : Référence de routage du schéma RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-3 : Référence de routage du schéma RF</em></div>

**Stockage et démarrage**

![Figure 9.2-4 : Référence de Bootstrap SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-4 : Référence de Bootstrap SF32LB520/3/5/7</em></div>

![Figure 9.2-5 : Référence de Bootstrap 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-5 : Référence de Bootstrap 52B/D/E/G/J</em></div>

![Figure 9.2-6 : Référence de schéma SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-6 : Référence de schéma SDIO</em></div>

**Boutons, moteur et audio**

![Figure 9.2-7 : Référence de moteur de vibration SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-7 : Référence de moteur de vibration SF32LB520/3/5/7</em></div>

![Figure 9.2-8 : Référence de moteur de vibration 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-8 : Référence de moteur de vibration 52B/D/E/G/J</em></div>

![Figure 9.2-9 : Référence du bouton d'alimentation](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-9 : Référence du bouton d'alimentation</em></div>

![Figure 9.2-10 : Référence du bouton de l'encodeur rotatif](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-10 : Référence du bouton de l'encodeur rotatif</em></div>

![Figure 9.2-11 : Référence de microphone MEMS analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-11 : Référence de microphone MEMS analogique</em></div>

![Figure 9.2-12 : Référence de microphone ECM analogique](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-12 : Référence de microphone ECM analogique</em></div>

![Figure 9.2-13 : Référence de liaison entre le DAC analogique et le PA](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-13 : Référence de liaison entre le DAC analogique et le PA</em></div>

![Figure 9.2-14 : Référence de schéma d'alimentation audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-14 : Référence de schéma d'alimentation audio</em></div>

![Figure 9.2-15 : Référence de schéma ADC audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-15 : Référence de schéma ADC audio</em></div>

![Figure 9.2-16 : Référence de schéma DAC audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-16 : Référence de schéma DAC audio</em></div>

**Horloge**

![Figure 9.2-17 : Schéma du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-17 : Schéma du quartz 48 MHz</em></div>

![Figure 9.2-18 : Schéma du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-18 : Schéma du quartz 32,768 kHz</em></div>

**USB**

![Figure 9.2-19 : Référence de schéma USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-19 : Référence de schéma USB</em></div>

**DC/DC**

![Figure 9.2-20 : Référence de schéma DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Figure 9.2-20 : Référence de schéma DC/DC</em></div>

### 9.3. Annexe C. Implantations et routages PCB de référence { #appendix-c-reference-pcb-layouts }

**RF**

![Figure 9.3-1 : Référence du réseau d'adaptation RF sur PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-1 : Référence du réseau d'adaptation RF sur PCB</em></div>

![Figure 9.3-2 : Référence de routage PCB RF](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-2 : Référence de routage PCB RF</em></div>

**Stockage**

![Figure 9.3-3 : Référence PCB SDIO](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-3 : Référence PCB SDIO</em></div>

**Audio**

![Figure 9.3-4 : Référence PCB d'alimentation audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-4 : Référence PCB d'alimentation audio</em></div>

![Figure 9.3-5 : Référence PCB ADC audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-5 : Référence PCB ADC audio</em></div>

![Figure 9.3-6 : Référence PCB DAC audio](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-6 : Référence PCB DAC audio</em></div>

**Structure du PCB**

![Figure 9.3-7 : Référence d'empilement PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-7 : Référence d'empilement PCB</em></div>

![Figure 9.3-8 : Référence de règles de conception PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-8 : Référence de règles de conception PCB</em></div>

![Figure 9.3-9 : Référence de fanout QFN](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-9 : Référence de fanout QFN</em></div>

![Figure 9.3-10 : Référence de placement du quartz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-10 : Référence de placement du quartz</em></div>

**Routage d'horloge**

![Figure 9.3-11 : Modèle de routage du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-11 : Modèle de routage du quartz 48 MHz</em></div>

![Figure 9.3-12 : Référence de routage du quartz 48 MHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-12 : Référence de routage du quartz 48 MHz</em></div>

![Figure 9.3-13 : Modèle de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-13 : Modèle de routage du quartz 32,768 kHz</em></div>

![Figure 9.3-14 : Référence de routage du quartz 32,768 kHz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-14 : Référence de routage du quartz 32,768 kHz</em></div>

**USB**

![Figure 9.3-15 : Référence PCB USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-15 : Référence PCB USB</em></div>

![Figure 9.3-16 : Référence de disposition USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-16 : Référence de disposition USB</em></div>

![Figure 9.3-17 : Référence de routage USB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-17 : Référence de routage USB</em></div>

**DC/DC**

![Figure 9.3-18 : Référence PCB DC/DC](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Figure 9.3-18 : Référence PCB DC/DC</em></div>

### 9.4. Annexe D. Mécanique { #appendix-d-mechanical }

![Figure 9.4-1 : Disposition du boîtier SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Figure 9.4-1 : Disposition du boîtier SF32LB520/3/5/7</em></div>

![Figure 9.4-2 : Disposition du boîtier 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Figure 9.4-2 : Disposition du boîtier 52B/D/E/G/J</em></div>

![Figure 9.4-3 : Dimensions du boîtier QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Figure 9.4-3 : Dimensions du boîtier QFN68L</em></div>

![Figure 9.4-4 : Forme du boîtier QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Figure 9.4-4 : Forme du boîtier QFN68L</em></div>

![Figure 9.4-5 : Motif de pastilles recommandé pour le QFN68L](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Figure 9.4-5 : Motif de pastilles recommandé pour le QFN68L</em></div>

### 9.5. Annexe E. Alimentation { #appendix-e-power }

**SF32LB520/3/5/7 (alimenté par batterie)**

Les figures ci-dessous montrent deux circuits de charge externes, avec et sans gestion du chemin d'alimentation (PPM), puis le circuit de charge intégré.

![Figure 9.5-1 : Circuit de charge externe sans PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-1 : Circuit de charge externe sans gestion du chemin d'alimentation (PPM)</em></div>

![Figure 9.5-2 : Circuit de charge externe avec PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-2 : Circuit de charge externe avec gestion du chemin d'alimentation (PPM)</em></div>

![Figure 9.5-3 : Circuit de chargeur intégré](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-3 : Circuit de chargeur intégré</em></div>

![Figure 9.5-4 : Réglage du seuil OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-4 : Réglage du seuil OVP</em></div>

![Figure 9.5-5 : Application OVP OVLO ajustable](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-5 : Application OVP OVLO ajustable</em></div>

![Figure 9.5-6 : Application OVP à sortie régulée](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-6 : Application OVP à sortie régulée</em></div>

![Figure 9.5-7 : Structure d'alimentation SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-7 : Structure d'alimentation SF32LB520/3/5/7</em></div>

![Figure 9.5-8 : Référence de schéma VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-8 : Référence de schéma VCC</em></div>

![Figure 9.5-9 : Référence PCB VCC](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-9 : Référence PCB VCC</em></div>

![Figure 9.5-10 : Référence de schéma de charge](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-10 : Référence de schéma de charge</em></div>

![Figure 9.5-11 : Référence PCB de charge](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-11 : Référence PCB de charge</em></div>

![Figure 9.5-12 : Référence PMU TVS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-12 : Référence PMU TVS</em></div>

![Figure 9.5-13 : Référence PMU EOS](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-13 : Référence PMU EOS</em></div>

**52B/D/E/G/J (alimentation régulée externe)**

![Figure 9.5-14 : Référence PCB PMU 52B/D/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Figure 9.5-14 : Référence PCB PMU 52B/D/E/G/J</em></div>

## 10. Historique des révisions { #10-revision-history }

<div align="center"><em>Tableau 10-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Remarque |
|:---|:---|:---|
| 1.1 | 2026-07 | Le système d'alimentation est devenu une section de schéma de même niveau que les autres. La génération d'horloge et la RF ont été séparées en deux sections, puis les sections de schéma suivantes ont été renumérotées. |
| 1.0 | Ce document | Les deux notes d'application matérielles officielles ont été réunies dans un guide unique ; des onglets distinguent le contenu des variantes alimentées par batterie de celui des variantes à alimentation régulée externe. |
| 0.0.1 | 10/2024 | Publication initiale de `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Publication initiale de `SF32LB52B-E-G-J-HW-Application` |

</div>

### 10.1. Historique des révisions de la liste de contrôle { #101-checklist-revision-history }

Les listes de contrôle détaillées du [schéma](SF32LB52x_schematic_checklist.md) et de [l'implantation et du routage PCB](SF32LB52x_pcb_layout_checklist.md) ont leur propre historique de versions, distinct de celui du guide. Elles suivent les versions du classeur *SF32LB52 Schematic & PCB Checklist* de SiFli.

<div align="center"><em>Tableau 10.1-1 : Historique des révisions de la liste de contrôle</em></div>

<div align="center" markdown>

| Version | Date | Remarque |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Publication initiale, basée sur la *SF32LB52 Schematic & PCB Checklist* V1.0 de SiFli |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
