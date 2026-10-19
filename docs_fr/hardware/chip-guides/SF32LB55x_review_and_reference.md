---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Liste de contrôle de revue de conception, documents et références connexes, annexes et historique des révisions pour le guide de conception matérielle SF32LB55x."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB55x — Liste de contrôle de revue de conception et références { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. Liste de contrôle de revue de conception { #7-design-review-checklist }

- [ ] Le boîtier exact, le brochage, le motif de pastilles et le procédé de fabrication de la PCB sont confirmés.
- [ ] Tous les rails d'alimentation du PMU et auxiliaires respectent les limites de tension/courant de la fiche technique.
- [ ] Les condensateurs de découplage requis sont placés près des broches.
- [ ] La temporisation du POR/BOR/réinitialisation et le mode de démarrage sont vérifiés.
- [ ] Les quartz 48 MHz et 32,768 kHz respectent les exigences de CL, de ppm, d'ESR, de placement et de routage.
- [ ] L'adaptation RF, l'antenne et la zone d'exclusion de masse sont vérifiées.
- [ ] Les groupes de broches de mémoire externe et d'affichage correspondent au boîtier sélectionné.
- [ ] Les circuits de réveil, GPADC, capteurs, audio, tactile, rétroéclairage et moteur respectent les exigences de basse consommation.
- [ ] L'accès au débogage, au téléchargement, au flashage en production, au test RF et à l'étalonnage du quartz est réservé.

## 8. Documents et références connexes { #8-related-documents-and-references }

Utilisez les derniers documents officiels lors de la vérification des limites électriques, des données de boîtier, du multiplexage des broches, de la configuration logicielle, de la qualification des composants et des contraintes de fabrication.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB55x]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés par SiFli (AVL)]__
- :fontawesome-brands-wikipedia-w: __[Index des guides de conception matérielle SiFli pour les puces (Wiki)]__

</div>

La [liste de contrôle du schéma](SF32LB55x_schematic_checklist.md) (section 5.8) et la section 6.4 du document [Implantation et routage de la PCB](SF32LB55x_pcb_layout.md) reproduisent point par point la même *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21), accompagnée des conseils de conception du schéma et de la PCB auxquels elle se rapporte.

[Note d'application matérielle SF32LB55x]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Liste des fournisseurs approuvés par SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Index des guides de conception matérielle SiFli pour les puces (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Annexes { #9-appendices }

### 9.1. Annexe A. Un produit SF32LB55x typique { #appendix-a-a-typical-sf32lb55x-product }

Un produit SF32LB55x typique comprend la MCU, l'architecture d'alimentation, les quartz, le réseau d'adaptation RF et l'antenne, la mémoire externe, le contrôleur d'affichage et tactile, les capteurs, les entrées GPADC, le moteur de vibration, l'audio Bluetooth en option, ainsi que des accès pour le débogage et les essais de production. Les produits sur batterie devraient aussi inclure une revue des courants de fuite en basse consommation et la planification de l'accès du gabarit de test.

### 9.2. Questions de conception { #91-design-qa }

1. **Pourquoi l'état par défaut de certains GPIO diffère-t-il de la spécification avec Mode = 1 ?** Le mode téléchargement modifie l'état des GPIO associés à la mémoire Flash externe sur QSPI2 et QSPI3.
2. **Pourquoi un moteur CMS peut-il vibrer de façon inattendue pendant la programmation ?** Son alimentation ou son signal PWM peut être activé par erreur. Si un niveau haut démarre le moteur, un GPIO avec pull-up (PU) par défaut peut l'alimenter ; SiFli recommande GPIO17 ou GPIO39 avec pull-down (PD) par défaut pour le PWM.
3. **Pourquoi la soudure de la batterie peut-elle bloquer la puce, et comment l'éviter ?** Une mauvaise mise à la terre du fer peut provoquer une surtension transitoire. Ajoutez une protection contre les surtensions et les décharges électrostatiques à l'interface batterie, et reliez correctement le fer à la terre.
4. **Pourquoi un bouton de réveil ne réveille-t-il pas la MCU depuis le mode Hibernate ?** Seules les six entrées de réveil du LCPU, GPIO43–GPIO48, peuvent sortir la MCU du mode Hibernate ; les GPIO0–GPIO3 du HCPU ne le peuvent pas.
5. **Pourquoi un G-sensor ou un capteur de fréquence cardiaque peut-il consommer trop ou fonctionner anormalement pendant le débogage basse consommation ?** Son firmware s'exécute sur le LCPU ; les signaux I2C, SPI, de commande et d'interruption doivent donc tous utiliser des interfaces du LCPU. Une affectation au HCPU peut augmenter la consommation ou entraîner un dysfonctionnement.
6. **Pourquoi la consommation du capteur reste-t-elle élevée alors que tous les signaux utilisent des interfaces du LCPU ?** Couper uniquement l'alimentation du capteur ne suffit pas si les alimentations des pull-up I2C ou d'interruption restent actives. Coupez également ces alimentations de pull-up.
7. **Pourquoi l'utilisation de GPIO26 et GPIO27 comme sorties de commande peut-elle augmenter le courant de sommeil ?** Pendant le sommeil, placez les deux GPIO au même niveau ou configurez au moins l'un d'eux en haute impédance, sans pull-up ni pull-down.
8. **Comment analyser une consommation élevée de SS6600 en mode Hibernate ?** Maintenez les dix entrées de réveil à un niveau haut ou bas stable : GPIO0–GPIO3 du HCPU et GPIO43–GPIO48 du LCPU. Si les dix sont tirées au niveau haut, utilisez une alimentation 3,3 V toujours présente pour les pull-up.
9. **Le courant de repos des composants d'alimentation peut-il expliquer une consommation trop élevée en basse consommation ?** Oui. Des convertisseurs BUCK, LDO ou interrupteurs de charge à courant de repos (Iq) élevé augmentent la consommation ; SiFli recommande des composants avec Iq inférieur à 1 µA.
10. **Comment éviter les artefacts d'affichage pendant les essais ESD ?** Ajoutez une protection ESD sur VDD, SCL, SDA, RESET et INT de l'écran tactile, ainsi que sur l'alimentation et RESET de l'écran LCD.
11. **Comment éviter les anomalies du mode d'affichage permanent ?** Cette fonction concerne surtout les écrans AMOLED, qui consomment moins d'énergie que les écrans TFT. Les GPIO PB sont recommandés pour LCD_EN, LCD_RST et les commandes associées. Si un GPIO PA commande une activation à l'état haut, il doit avoir un pull-up (PU) par défaut ; un GPIO PA avec pull-down (PD) par défaut peut maintenir l'écran anormalement éteint pendant plus de 10 ms après le réveil.
12. **Comment éviter les défauts de commande d'alimentation de l'audio Bluetooth externe après le réveil, lorsque le module doit rester alimenté pendant le sommeil ?** Commandez son alimentation avec un GPIO du LCPU. Pour un interrupteur actif à l'état bas, choisissez un GPIO du LCPU avec pull-down (PD) par défaut.
13. **Comment garantir la charge après une surdécharge de la batterie ?** Lorsque la tension de la batterie est trop basse, la gestion du chemin d'alimentation doit permettre à l'entrée du chargeur d'alimenter le système après son branchement. En l'absence de cette gestion, le circuit intégré de charge choisi doit fournir un courant de charge lente d'au moins 40 mA.
14. **Pourquoi la charge peut-elle ne pas démarrer après le branchement du chargeur ?** Le signal de détection du branchement doit être relié à l'un des GPIO de réveil du LCPU, GPIO43–GPIO48. Un autre GPIO peut empêcher le démarrage correct de la séquence de charge.
15. **Comment éviter une consommation excessive en mode téléchargement lorsque MODE est haut ?** Pour les périphériques à fort courant, comme un amplificateur de puissance audio (PA) activé à l'état haut, utilisez un GPIO avec pull-down (PD) par défaut, jamais un GPIO avec pull-up (PU). Le mode téléchargement pourrait sinon activer le périphérique et perturber la programmation.
16. **Pourquoi la programmation peut-elle échouer lorsque MODE est haut, et que faire si l'interruption d'un capteur utilise GPIO46 ?** En mode téléchargement, GPIO46 est par défaut UART3_RX et peut perturber la programmation. Déplacez l'interruption du capteur sur GPIO43, GPIO44, GPIO47 ou GPIO48. Si davantage d'entrées de réveil LCPU sont nécessaires, reliez un bouton externe à GPIO45 ou GPIO46 au moyen d'une résistance de 0 Ω.
17. **Que faire si les algorithmes du G-sensor et de fréquence cardiaque dépassent la mémoire disponible ?** Vérifiez que la mémoire allouée au LCPU est suffisante. Si elle ne l'est pas, ajoutez une mémoire Flash NOR externe sur QSPI4.

## 10. Historique des révisions { #10-revision-history }

<div align="center"><em>Tableau 10-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:---|:---|:---|
| 0.1 | 2026-07 | Première édition du guide de conception matérielle SF32LB55x, rédigée à partir de la note d'application matérielle officielle publiée sur le wiki de SiFli. |

</div>

### 10.1. Historique des révisions de la liste de contrôle { #101-checklist-revision-history }

Les listes détaillées publiées dans la [liste de contrôle du schéma](SF32LB55x_schematic_checklist.md) et à la section 6.4 du document [Implantation et routage de la PCB](SF32LB55x_pcb_layout.md) sont versionnées séparément du guide, conformément au classeur *SF32LB55x Schematic & PCB Checklist* de SiFli.

<div align="center"><em>Tableau 10.1-1 : Historique des révisions de la liste de contrôle</em></div>

<div align="center" markdown>

| N° | Version | Date | Notes de version |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Publication initiale du document de liste de contrôle du schéma et de la PCB |

</div>
