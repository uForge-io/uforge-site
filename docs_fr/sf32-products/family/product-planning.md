---
icon: lucide/route
description: "Guide de planification d’un produit SF32 : choisissez la puce et le niveau d’intégration, validez le logiciel sur une carte, puis préparez la conception pour la production."
tags:
    - Matériel
    - Planification produit
---

# Planifier un produit { #plan-a-product }

Ce guide organise les décisions nécessaires pour faire passer un concept SF32 des premières exigences, à travers la validation, jusqu’à un plan de conception prêt pour la production. Suivez les étapes dans l’ordre tant que la puce, le module, la carte de développement, la plateforme logicielle et l’approche de fabrication ne sont pas encore définis.

## Parcours de planification produit { #product-planning-path }

<div align="center"><em>Tableau : parcours de planification produit SF32</em></div>

<div align="center" markdown>

| Étape | Décision clé | Commencer ici | Critère de sortie |
|:------|:-------------|:-----------|:---------------|
| 1. Définir les exigences | Rôle de l’appareil dans la communication sans fil, affichage, audio, IA, stockage, alimentation et budget de consommation, surface occupée par le boîtier du composant et durée de vie prévue du produit. | [Famille SF32](SF32_family.md) | Liste de candidats priorisée, avec les interfaces obligatoires et les contraintes clairement définies. |
| 2. Choisir le niveau d’intégration | PCB personnalisé avec la puce montée directement, module associé à une carte porteuse, ou carte de développement pour la validation initiale. | [Sélecteur de produits SF32](../product-selector.md) | Orientation définie pour le choix du composant et son niveau d’intégration, ainsi que la carte ou le module disponible le plus proche du besoin. |
| 3. Valider la base logicielle | Chaîne d’outils, procédure de programmation, sortie série et exemple de référence fonctionnel sur la carte choisie ou la plus proche. | [Premiers pas](../../getting-started/index.md) | Procédure reproductible de compilation et de programmation, avec journal de sortie console enregistré. |
| 4. Vérifier les risques du produit | Comportement propre au produit pour l’affichage, Bluetooth, l’audio, l’IA et le stockage, ainsi que le chemin d’alimentation et le profil de consommation énergétique. | [Tutoriels](../../getting-started/tutorials/overview.md), [Apprendre](../../learn/index.md) et [Développement](../../develop/index.md) | Résultats de mesure documentés pour les sous-systèmes déterminants pour les risques liés aux coûts, à la consommation ou au calendrier. |
| 5. Figer le plan de mise en œuvre | Schéma, implantation, plan mémoire et partitions, nomenclature (BOM), stratégie de test, fonctionnement des mises à jour et de la récupération, hypothèses de fabrication. | [Conception pour la production](../../hardware/design-for-production.md) | Dossier de conception vérifié et liste explicite des validations restant à effectuer. |

</div>

## Ne faites pas l’impasse sur la validation sur carte de développement { #do-not-skip-the-board-validation-loop }

Comparer les membres de la famille et obtenir une compilation réussie ne suffit pas pour choisir la puce destinée à la production. Avant d’arrêter la conception matérielle, validez la carte la plus proche du produit et consignez son nom, la version du SDK, l’exemple utilisé, les résultats mesurés et les différences avec le produit visé. Si le produit final utilise un écran, un composant de stockage, une alimentation par batterie, une antenne ou une carte porteuse de module différents, validez chaque changement séparément.

Une fois la base matérielle et logicielle établie, consultez la [conception de référence](../../hardware/reference-designs/reference-designs.md) la plus proche pour suivre la démarche complète à partir d’un exemple concret.

## Liste de contrôle de transfert { #handoff-checklist }

- [ ] La puce ou le module choisi respecte les contraintes du produit concernant les interfaces, la mémoire, le boîtier, l’alimentation et la consommation énergétique.
- [ ] Une carte compatible est disponible ou un plan précis de validation du matériel personnalisé est établi.
- [ ] L’équipe produit a validé la plateforme logicielle et son niveau de maturité.
- [ ] Les besoins de récupération, OTA/DFU, journalisation et programmation en usine sont définis avant d’arrêter le partitionnement et la BOM.
- [ ] Le guide de conception matérielle, la liste de contrôle, l’AVL et la bibliothèque EDA appropriés sont identifiés.

!!! note "Contenu généré automatiquement"
    Cette page a été compilée et rédigée sans document source dédié. Vérifiez les affirmations techniques dans la documentation officielle de SiFli avant de vous y fier.
