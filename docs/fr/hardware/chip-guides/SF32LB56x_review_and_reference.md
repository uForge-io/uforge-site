---
title: "Guide de conception matérielle SF32LB56x — Liste de contrôle de la revue de conception et des références"
icon: lucide/clipboard-check
description: "Liste de contrôle de la revue de conception, documents et références connexes, annexes et historique des révisions du guide de conception matérielle SF32LB56x."
tags:
    - Matériel
    - Puce
hide:
    - navigation
---

# Guide de conception matérielle SF32LB56x — Liste de contrôle de la revue de conception et des références { #sf32lb56x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Fait partie du guide de conception matérielle SF32LB56x"
    Cette page couvre les sections 7 à 10 : liste de contrôle de la revue de conception, documents et références connexes, annexes et historique des révisions. Retournez aux [directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md).

## 7. Liste de contrôle de la revue de conception { #7-design-review-checklist }

- [ ] La variante U ou V, le boîtier, le brochage et le procédé de fabrication du PCB sont confirmés.
- [ ] Les rails d'alimentation du processeur, les sorties du PMIC, les condensateurs, la réinitialisation, le circuit de charge et les commutateurs basse consommation sont vérifiés.
- [ ] Les modes de fonctionnement, les sources de réveil, les rails d'alimentation des résistances pull-up et les courants de fuite en veille sont vérifiés.
- [ ] Les paramètres, le placement et le routage des quartz 48 MHz et 32,768 kHz sont revus.
- [ ] L'adaptation RF, l'implantation de l'antenne et le plan de réglage sont définis.
- [ ] Les affectations de broches pour l'affichage, le stockage, l'audio, les capteurs, PBR, UART/I2C, GPTIM, le débogage et la production ne présentent aucun conflit.
- [ ] Le fan-out QFN ou BGA, l'empilage des couches, l'impédance, le DRC et la stratégie ESD sont finalisés.
- [ ] Le flux de flashage en production et d'étalonnage du quartz a été testé.

## 8. Documents et références connexes { #8-related-documents-and-references }

Utilisez les documents officiels les plus récents pour vérifier les limites électriques, les informations sur le boîtier, le multiplexage des broches, la configuration logicielle, la qualification des composants et les contraintes de fabrication.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB56xV]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Index des guides de conception matérielle SiFli pour les puces (Wiki)][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

La [liste de contrôle du schéma](SF32LB56x_schematic_checklist.md) (section 5.8) et la section 6.3 des [directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md) reproduisent point par point la même *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21), avec les recommandations correspondantes pour le schéma et l'implantation du PCB.

[Note d'application matérielle SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Note d'application matérielle SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Liste des fournisseurs approuvés SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Annexes { #9-appendices }

### 9.1. Annexe A. Produit type à base de SF32LB56x { #appendix-a-a-typical-sf32lb56x-product }

Les schémas d'application des boîtiers U et V sont des exemples, pas des nomenclatures obligatoires. Tous deux montrent le MCU avec le chargeur et l'alimentation Buck/LDO, une liaison vers l'écran LCD, des options de mémoire flash externe (QSPI NAND, SD NAND ou NOR), des capteurs de mouvement en SPI et de fréquence cardiaque en I2C, une entrée microphone analogique et une sortie haut-parleur via un amplificateur audio (PA), un moteur vibrant commandé par PWM, une antenne Bluetooth/RF, des quartz de 48 MHz et 32,768 kHz, et un accès SWD/UART. Les circuits tactiles et de rétroéclairage sont traités séparément dans les [directives de conception du schéma](SF32LB56x_schematic_design.md). Le schéma V montre en plus l'eMMC et le Wi-Fi via SDIO, le GPS et le NFC via UART, ainsi qu'un module LTE via SPI. Vérifiez les périphériques requis, le routage des interfaces et la compatibilité du boîtier pour le design visé.

## 10. Historique des révisions { #10-revision-history }

<div align="center"><em>Tableau 10-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:---|:---|:---|
| 0.1 | 2026-07 | Première édition du guide de conception matérielle SF32LB56x, élaborée à partir des notes d'application matérielle officielles SF32LB56xU et SF32LB56xV du wiki SiFli. |

</div>

### 10.1. Historique des révisions de la liste de contrôle { #101-checklist-revision-history }

Les vérifications détaillées figurant dans la [liste de contrôle du schéma](SF32LB56x_schematic_checklist.md) et à la section 6.3 des [directives d'implantation et de routage du PCB](SF32LB56x_pcb_layout.md) sont versionnées séparément du guide, conformément au classeur *SF32LB56x Schematic & PCB Checklist* de SiFli.

<div align="center"><em>Tableau 10.1-1 : Historique des révisions de la liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Publication initiale du document de liste de contrôle du schéma et du PCB |

</div>
