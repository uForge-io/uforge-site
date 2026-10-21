---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Auto-vérification de la conception côté client, documents et références associés, annexes et historique des révisions du guide de conception matérielle SF32LB57x."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB57x — Liste de contrôle de revue de conception et références { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Fait partie du guide de conception matérielle SF32LB57x"
    Cette page couvre les sections 7 à 10 : auto-vérification de la conception côté client, documents et références associés, annexes et historique des révisions. Revenez aux [recommandations de placement et de routage PCB](SF32LB57x_pcb_layout.md).

## 7. Auto-vérification de la conception côté client { #7-customer-design-self-check }

Complétez cette liste avant de demander une revue du schéma, une revue du routage PCB ou l'autorisation de lancer l'EVT. Le responsable de la conception côté client devrait consigner le résultat et les justificatifs pour chaque point et, le cas échéant, citer les pages du schéma et joindre des captures d'écran de la PCB, des mesures ou des comptes rendus de revue.

### 7.1. Boîtier et numéro de pièce { #71-package-and-part-number }

- [ ] La référence de commande, la famille d'alimentation, le boîtier et le brochage sont confirmés.
- [ ] Le symbole de la bibliothèque de schémas et l'empreinte PCB correspondent à la fiche technique.
- [ ] Les pastilles QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY -->, le pochoir, la pastille exposée et la conception des vias sont vérifiés.

### 7.2. Alimentation { #72-power }

- [ ] Chaque broche d'alimentation respecte ses limites de tension et de charge ; les valeurs et l'implantation des condensateurs sont conformes à la fiche technique.
- [ ] L'inductance BUCK, les condensateurs et le routage de rétroaction respectent les exigences d'implantation et de routage.
- [ ] Les sorties LDO internes ne sont pas utilisées à tort pour alimenter des périphériques à fort courant.
- [ ] Les chemins d'alimentation correspondent à la famille choisie. Vérifiez les connexions applicables du chargeur/OVP, du VBUS, du VBAT, du VCC et/ou du PVDD dans le tableau d'alimentation correspondant au boîtier et à la variante exacts ; ne mélangez pas les topologies des variantes alimentées par batterie et en 3,3 V.
- [ ] Les alimentations périphériques peuvent être coupées et ont des états par défaut sûrs.

### 7.3. Horloges { #73-clocks }

- [ ] Les quartz 48 MHz et 32,768 kHz respectent les paramètres recommandés.
- [ ] Les quartz sont proches de la puce et disposent de zones d'exclusion.
- [ ] Les pistes des quartz sont éloignées des sources de bruit liées à l'alimentation, à la RF, à l'USB, au SDIO, à l'affichage et aux circuits de charge.

### 7.4. Stockage et démarrage { #74-storage-and-boot }

- [ ] Si la référence choisie comporte une mémoire intégrée au boîtier, sa configuration et son incidence sur les interfaces mémoire externes et les broches disponibles sont confirmées pour ce boîtier et cette variante précis.
- [ ] Le type de support de démarrage externe, les résistances de rappel, la commande d'alimentation et l'état par défaut sont corrects.
- [ ] La configuration de démarrage et les points de test de téléchargement/débogage sont réservés.

### 7.5. RF { #75-rf }

- [ ] La ligne d'alimentation de l'antenne est conçue pour une impédance contrôlée de 50 Ω.
- [ ] Le réseau d'adaptation en π est placé près de la puce.
- [ ] La piste RF dispose d'une masse de référence continue et d'un blindage par vias.
- [ ] La RF est isolée des sources de bruit et des interfaces haute vitesse.

### 7.6. Affichage et tactile { #76-display-and-touch }

- [ ] L'interface d'affichage, la résolution et le groupe de broches respectent les exigences de l'écran.
- [ ] Les alimentations de l'écran, du rétroéclairage et du contrôleur tactile sont contrôlables.
- [ ] L'interruption tactile utilise un GPIO capable de réveil si le réveil est requis.
- [ ] Le FPC et les pistes d'affichage haute vitesse sont maintenus à l'écart de la RF.

### 7.7. Audio et analogique { #77-audio-and-analog }

- [ ] Le découplage de MIC_BIAS, AUD_VREF et AVDD33_AUD est correct.
- [ ] Le blocage du courant continu et le filtrage des entrées analogiques sont corrects.
- [ ] Le routage différentiel DACP/DACN et le réseau d'adaptation sont corrects.
- [ ] La tension d'entrée GPADC, le diviseur de tension, le filtrage et le blindage sont corrects.

### 7.8. Interfaces générales { #78-general-interfaces }

- [ ] Le câblage et les niveaux d'E/S de UART, I2C, SPI, SDIO, USB et CAN sont corrects.
- [ ] L'alimentation des résistances de rappel I2C commute avec l'alimentation d'E/S du périphérique correspondant afin d'éviter tout courant de fuite lorsque ce domaine est coupé.
- [ ] La protection ESD de l'USB, le routage différentiel à 90 Ω et la détection de réveil par VBUS sont mis en œuvre si nécessaire.
- [ ] Les signaux de réveil externes utilisent des broches compatibles avec la fonction de réveil.

### 7.9. Production et fiabilité { #79-production-and-reliability }

- [ ] Les points de test DBG-UART, SWD, mode de démarrage, PA00, PA01, PA34, alimentation et masse sont réservés.
- [ ] Les points de test répondent aux exigences des pointes de sonde du dispositif de test.
- [ ] La stratégie de protection contre l'ESD, l'EOS, l'OVP, l'inversion de polarité et les surtensions transitoires a été examinée.
- [ ] Le téléchargement du firmware de production, l'étalonnage du quartz et la procédure de test RF peuvent être exécutés.

### 7.10. Critères d'approbation de la revue { #710-review-release-criteria }

Avant le gel de conception, vérifiez que les critères d'approbation suivants sont satisfaits :

- [ ] Tous les points applicables sont clôturés avec des justificatifs (références aux pages du schéma, captures de la PCB, mesures ou comptes rendus de revue) ; chaque point déclaré non applicable est accompagné d'une justification.
- [ ] Chaque écart par rapport à la fiche technique ou à la conception de référence a une justification de conception au niveau du projet.
- [ ] La RF, les quartz, la recharge, l'alimentation, l'USB, l'affichage, l'audio et les points de test de production ont été examinés par les responsables concernés.
- [ ] Le budget de courant en mode basse consommation inclut les courants de veille des périphériques, les courants des résistances de rappel et le courant de repos Iq des régulateurs.
- [ ] Les accès nécessaires à la mise en service EVT — téléchargement, journalisation, mesure du courant, réinitialisation et contrôle du démarrage — sont accessibles.

## 8. Documents et références associés { #8-related-documents-and-references }

Consultez les documents officiels les plus récents pour vérifier les limites électriques, les données du boîtier, le multiplexage des broches, la configuration logicielle, la qualification des composants et les contraintes de fabrication.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Fiche produit SF32LB57x][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[Fiche technique SF32LB57x][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[Manuel utilisateur SF32LB57x][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[Note d'application matérielle SF32LB57x]__
- :fontawesome-solid-file-excel: __[Liste des fournisseurs approuvés par SiFli (AVL)]__

</div>

La [liste de contrôle du schéma](SF32LB57x_schematic_checklist.md) (section 5.8) et la [liste de contrôle de la conception de la PCB](SF32LB57x_pcb_layout_checklist.md) (section 6.10) reprennent point par point les tableaux officiels d'auto-vérification de conception SF32LB57x de SiFli et les présentent avec les directives de schéma et de disposition PCB correspondantes.

## 9. Annexes { #9-appendices }

Les annexes rassemblent des informations sur les applications et les conceptions de référence. Consultez-les après avoir appliqué les principales règles de schéma et de PCB des sections 5 et 6.

<div align="center"><em>Tableau 9-1 : Index des annexes</em></div>

<div align="center" markdown>

| Besoin | Commencer ici |
|:---|:---|
| Exemples de schéma de système minimal | Section 5.1.2 |
| Illustrations de référence du boîtier, de l'empreinte, du pochoir, de l'empilement des couches, du fanout, de l'alimentation, de la RF, de l'audio, du SDIO, de l'USB et des composants TVS | Section 6.9 |
| Auto-vérification de la conception côté client | Section 7 |

</div>

### 9.1. Annexe A. Un produit SF32LB57x typique { #appendix-a-a-typical-sf32lb57x-product }

Un produit basé sur le SF32LB57x peut comprendre la MCU, le réseau d'alimentation, des quartz de 48 MHz et de 32,768 kHz, un réseau d'adaptation RF et une antenne, un écran et un contrôleur tactile, un support de stockage de démarrage, des entrées/sorties audio, des capteurs, une caméra en option et les périphériques USB/SDIO/CAN/UART/I2C/SPI requis par le produit, ainsi que des accès de débogage et de test en production. Examinez la recharge, l'OVP, le choix du commutateur d'alimentation et les courants de fuite en mode basse consommation selon l'architecture d'alimentation retenue.

## 10. Historique des révisions { #10-revision-history }

<div align="center"><em>Tableau 10-1 : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Date | Remarques |
|:--------|:-----|:------|
| 0.5 | 2026-08 | Le niveau de détail complet de la note d'application officielle a été rétabli. Ont été ajoutés : quatre tableaux de référence des broches d'alimentation, répartis par boîtier et famille d'alimentation ; le tableau du port de débogage par défaut ; le schéma RF ; les tableaux complets des signaux d'affichage (SPI/QSPI, RGB, configuration du mode RGB, MCU8080, EPD, JDI parallèle/série, tactile/rétroéclairage) ; les schémas de référence du microphone analogique, du microphone PDM et de l'amplificateur audio ; le tableau complet des signaux de caméra propres à la puce ; les tableaux IO MUX et matriciel ; le sous-tableau de multiplexage de la matrice LCDC ; le tableau des broches USB ; le tableau GPADC détaillé par broche ; ainsi que le schéma de référence des touches d'alimentation et GPADC. Les tableaux officiels d'auto-vérification ont été répartis entre les nouvelles pages [liste de contrôle du schéma](SF32LB57x_schematic_checklist.md) et [liste de contrôle de la conception de la PCB](SF32LB57x_pcb_layout_checklist.md), sans omettre aucun point de contrôle. |
| 0.4 | 2026-08 | Les données ont été vérifiées par rapport à la note d'application matérielle officielle du SF32LB57x. Le minimum du tableau des broches `VCC`/`VBAT` a été corrigé à 3,0 V (au lieu de 3,2 V) et le seuil d'arrêt matériel de 2,7 V a été ajouté. La limite de courant de démarrage progressif de `VDD33_VOUT1` a été corrigée à 30 mA ; les capacités de charge possibles du quartz de 32,768 kHz ont été précisées (7 pF ou 11,5 pF ; la puce utilise 11,5 pF par défaut). Le circuit de la touche d'alimentation/réinitialisation `PA34` et la conception d'une touche GPADC à diviseur résistif ont été décrits. Ont également été ajoutés la plage d'entrée GPADC de 0 V à 3,3 V, le condensateur de filtrage de 100 nF, les valeurs des condensateurs `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA`, les contraintes PCB de longueur totale et d'écart de longueur entre signaux du bus MPI, les espacements de placement du quartz et l'affectation des couches pour un empilement à 4 couches. |
| 0.3 | 2026-07 | Restructuration des directives de schéma afin que la conception du système minimal, le système d'alimentation, la génération d'horloge, la RF, les interfaces utilisateur, le stockage et la connectivité, ainsi que la fabrication constituent des sections distinctes de même niveau. |
| 0.2 | 2026-07 | Ajout du dossier de preuves, des directives de mise en service, de la validation basse consommation, de la validation RF/affichage/audio/caméra, et de la référence rapide des contraintes PCB critiques. |
| 0.1 | 2026-07 | Publication initiale du guide de conception matérielle SF32LB57x basée sur la note d'application matérielle officielle. |
| 0.0.1 | 2026-06 | Révision 0.0.1 de la source : première édition de la note d'application matérielle SF32LB57x, versionnée séparément de ce guide. |

</div>

### 10.1. Historique des révisions de la liste de contrôle { #101-checklist-revision-history }

Les listes de contrôle détaillées dans la [liste de contrôle du schéma](SF32LB57x_schematic_checklist.md) et la [liste de contrôle de la conception de la PCB](SF32LB57x_pcb_layout_checklist.md) sont versionnées séparément du guide, selon les tableaux d'auto-vérification de conception de la note d'application matérielle SF32LB57x de SiFli.

<div align="center"><em>Tableau 10.1-1 : Historique des révisions de la liste de contrôle</em></div>

<div align="center" markdown>

| Version | Date | Remarques |
|:--------|:-----|:------|
| 1.0 | 2026-08 | Publication initiale, transcrite intégralement à partir des tables d'auto-vérification de conception (Section 4) de la note d'application matérielle officielle SF32LB57x, édition 2026-06. |

</div>

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Note d'application matérielle SF32LB57x]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Liste des fournisseurs approuvés par SiFli (AVL)]: ../cad-components/sifli-approved-vendor-list.md
