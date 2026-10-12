---
icon: lucide/blocks
description: "Vue d'ensemble des sujets liés au firmware SF32 sur plusieurs plateformes : tables de partitions, OTA/DFU, USB, gestion de l'énergie, journalisation et analyse des plantages."
tags:
    - Développement
    - Firmware
---

# Sujets liés au firmware { #firmware-topics }

Ces sujets concernent toutes les plateformes. Ils couvrent les choix de firmware nécessaires pour transformer des exemples en produits : configuration du démarrage, partitions, OTA, USB, gestion de l'énergie, journalisation et analyse des plantages.

Lisez ces pages avant de modifier l'organisation du firmware, le comportement des mises à jour ou la politique de basse consommation. Ces erreurs peuvent ne pas empêcher la compilation, mais compliquer la récupération, le débogage et la livraison du produit.

## Sujets { #topics }

<div align="center"><em>Tableau : Sujets</em></div>

<div align="center" markdown>

| Sujet | Pourquoi c'est important |
|:------|:---------------|
| [Tables de partitions](partition-tables.md) | Définit la disposition du firmware, du système de fichiers, de l'OTA et du stockage. |
| [OTA et DFU](ota-dfu.md) | Indispensables pour les mises à jour sur le terrain et les plans de récupération. |
| [USB et CherryUSB](usb-cherryusb.md) | Présente les capacités USB en mode périphérique et hôte, au-delà de ce qu'indique une simple case cochée dans une fiche technique. |
| [Gestion de l'énergie](power-management.md) | Permet de faire d'une démonstration fonctionnelle un produit adapté à une alimentation sur batterie. |
| [Journalisation et analyse des plantages](logging-crash-analysis.md) | Aide à identifier et diagnostiquer les défaillances. |

</div>

## Règle pratique { #practical-rule }

Avant de modifier le démarrage, l'OTA, le système de fichiers ou le stockage, vérifiez la table de partitions et la procédure de récupération. Une défaillance de l'application est gênante ; une erreur de configuration du démarrage ou des mises à jour peut rendre la carte difficile à récupérer.

## Liste de contrôle de la préparation produit { #product-readiness-checklist }

- [ ] Une commande testée permettant de flasher l'ensemble de l'appareil est disponible en dehors du parcours OTA habituel.
- [ ] La disposition des partitions est documentée dans le dépôt du produit.
- [ ] Le comportement en cas d'échec de l'OTA/DFU a été testé.
- [ ] Si l'USB est utilisé, ses descripteurs et l'attribution du VID/PID sont documentés.
- [ ] Les modes basse consommation ont été mesurés sur du matériel réel.
- [ ] Les journaux de plantage peuvent être décodés à l'aide du binaire livré.
- [ ] Les procédures de flashage en usine et pour le développement sont distinctes.
