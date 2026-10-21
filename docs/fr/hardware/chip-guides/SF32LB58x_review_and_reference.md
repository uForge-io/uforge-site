---
icon: lucide/clipboard-check
description: "Liste de contrôle de revue de conception, documents et références associés, annexes, et historique des révisions pour le guide de conception matérielle du SF32LB58x."
tags:
    - Matériel
    - Puce
hide:
    - navigation
---

# Guide de conception matérielle du SF32LB58x — Liste de contrôle pour la revue de conception et références { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Fait partie du Guide de conception matérielle du SF32LB58x"
    Cette page couvre les sections 7 à 10 : liste de contrôle pour la revue de conception, documents et références associés, annexes et historique des révisions. Retournez à la [liste de contrôle d'implantation du PCB](SF32LB58x_pcb_layout_checklist.md).

## 7. Liste de contrôle de revue de conception { #7-design-review-checklist }

- [ ] Vérifiez que la combinaison Flash/PSRAM co-packagée du modèle sélectionné répond aux exigences du produit.
- [ ] Vérifiez que l'alimentation PMU (PVDD1/PVDD2/BUCK/LDO) et toutes les autres broches d'alimentation restent dans les plages de tension de la fiche technique.
- [ ] Vérifiez que l'inductance nominale de la bobine BUCK sélectionnée est de 4,7 µH, avec une DCR ≤ 0,4 Ω et un Isat ≥ 500 mA.
- [ ] Vérifiez que les quartz 48 MHz et 32,768 kHz respectent les spécifications recommandées et que leur routage ainsi que les zones d'exclusion respectent les exigences de conception.
- [ ] Assurez une impédance contrôlée de 50 Ω sur la piste RF et placez le réseau d'adaptation près de la puce.
- [ ] Vérifiez que l'interface de stockage externe sélectionnée est compatible avec la conception de démarrage prévue. Vérifiez séparément le niveau de la broche Mode : niveau haut pour le mode téléchargement, niveau bas pour le démarrage de l'application utilisateur.
- [ ] Vérifiez que le routage des interfaces d'affichage (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) respecte les règles d'impédance et d'adaptation de longueur propres à chaque interface. Pour le DSI, l'impédance différentielle doit être de 100 Ω, l'écart de longueur au sein de chaque paire ≤ 0,5 mm et l'écart entre les paires ≤ 2 mm.
- [ ] Vérifiez que le routage USB respecte l'exigence d'impédance différentielle de 90 Ω. Routez ensemble les signaux SDIO ; la longueur totale doit rester ≤ 50 mm et l'écart de longueur au sein d'un groupe ≤ 6 mm.
- [ ] Préservez l'accès SWD et l'interface de sortie de débogage sélectionnée parmi les six UART disponibles, ainsi que ses broches de signal et les points de test de production.
- [ ] Vérifiez que les vias des pastilles BGA sont centrés et que le plan de masse sous la puce est continu.
- [ ] Vérifiez les références des composants clés par rapport à la dernière [liste des fournisseurs agréés SiFli][Liste des fournisseurs agréés SiFli (AVL)].
- [ ] Incluez dans le dossier de revue l'empilement des couches, la capacité du procédé, les résultats d'impédance et de DRC, l'AVL ainsi que des captures des zones critiques du routage.
- [ ] Clôturez tous les points ouverts concernant le schéma, le routage et la fabrication avant d'autoriser la fabrication du prototype, ou consignez explicitement ceux qui restent à résoudre et suivez leur clôture.

## 8. Documents et références associés { #8-related-documents-and-references }

Utilisez les derniers documents officiels lors de la vérification des limites électriques, des données de boîtier, du multiplexage des broches, de la configuration logicielle, et de la qualification des composants.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB58x]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur SF32LB58x]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB58x]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs agréés SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Index des guides de conception matérielle SiFli pour les puces (Wiki)][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Ensemble, la [Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md) (section 5.8) et la [Liste de contrôle d'implantation du PCB](SF32LB58x_pcb_layout_checklist.md) (section 6.18) reprennent les points applicables au schéma et au PCB du classeur *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21), en complément des directives de conception correspondantes.

[Fiche produit SF32LB58x]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[Fiche technique SF32LB58x]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[Manuel utilisateur SF32LB58x]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[Note d’application matérielle SF32LB58x]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Liste des fournisseurs agréés SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Annexes { #9-appendices }

Les annexes rassemblent le contexte d'application et de conception de référence. Utilisez-les comme aides à la revue après avoir appliqué les règles principales de schéma et de PCB des sections 5 et 6.

<div align="center"><em>Tableau 9-1 : Index des annexes</em></div>

<div align="center" markdown>

| Besoin | Commencez ici |
|:---|:---|
| Contexte d'application d'un objet connecté portable riche en fonctionnalités ou d'un terminal intelligent | Annexe A : Un objet connecté portable ou un terminal intelligent typique |
| Captures d'écran de schéma et exemples au niveau circuit | Section 5 et la note d'application matérielle du SF32LB58x |
| Captures d'écran de routage du PCB pour le BGA, le HDI, la RF, le DSI, l'USB, le SDIO, l'audio et l'alimentation | Section 6 et la note d'application matérielle du SF32LB58x |

</div>

### 9.1. Annexe A. Un objet connecté portable ou un terminal intelligent typique { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

Une conception typique basée sur le SF32LB58x pour un objet connecté portable ou un terminal intelligent comprend la MCU, le PMIC, un écran haute résolution, un contrôleur tactile, un stockage de démarrage, une mémoire externe ou de l'eMMC, des capteurs, un moteur de vibration, des entrées/sorties audio, une antenne Bluetooth, des quartz, l'USB ainsi que des interfaces de débogage et de test en production. Le boîtier BGA256 et les interfaces d'affichage et de stockage à haut débit font du choix du procédé HDI un élément de l'architecture système, et non un simple détail du routage du PCB.

## 10. Historique des révisions { #10-revision-history }

<div align="center"><em>Tableau 10-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Note |
|:---|:---|:---|
| 1.0 | 2026-07 | Mise à jour du guide de conception matérielle du SF32LB58x avec des directives de schéma, de PCB, de validation, et de revue de production |
| 0.0.1 | 1/2025 | Publication du brouillon officiel de `SF32LB58x-HW-Application` |

</div>

### 10.1. Historique des révisions de la liste de contrôle { #101-checklist-revision-history }

La liste de contrôle point par point de la [Liste de contrôle du schéma](SF32LB58x_schematic_checklist.md) et de la [Liste de contrôle d'implantation du PCB](SF32LB58x_pcb_layout_checklist.md) est versionnée séparément du guide, suivant le classeur *SF32LB58x Schematic & PCB Checklist* propre à SiFli.

<div align="center"><em>Tableau 10.1-1 : Historique des révisions de la liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Version initiale du document Schematic & PCB Checklist |

</div>
