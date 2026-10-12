---
icon: lucide/cpu
title: "Produits SF32"
description: "Explorez le matériel SF32, planifiez un produit, choisissez une puce, un module ou une carte de développement, réutilisez des conceptions de référence et préparez la conception pour la production."
tags:
    - Matériel
    - Présentation
---

# Produits SF32 { #sf32-products }

La section Produits SF32 vous aide à passer d’une idée de produit à une conception SF32 réalisable. Vous y découvrirez les familles SF32, pourrez choisir puis valider le matériel, trouver une base technique réutilisable et accéder aux ressources nécessaires à la préparation de la production.

## Choisir votre point de départ { #choose-your-starting-point }

<div align="center"><em>Parcours de sélection du matériel</em></div>

<div align="center" markdown>

| Votre objectif | Commencer ici | Contenu proposé |
|:----------|:-----------|:--------------------|
| Découvrir la famille SF32 | [Comprendre SF32](family/SF32_family.md) | Une comparaison des familles et les règles pour interpréter la référence d’un composant disponible à la commande. |
| Transformer une idée en plan produit | [Planifier un produit](family/product-planning.md) | Une démarche par étapes, des exigences et du choix du composant à la validation de la carte et à la préparation de la production. |
| Choisir une puce ou un module | [Sélecteur de produits SF32](product-selector.md) | Un outil interactif pour établir une présélection de puces et de modules, consulter les critères de choix et accéder aux présentations des produits. Les cartes de développement sont répertoriées séparément pour la validation. |
| Réutiliser une base technique | [Conceptions de référence](../hardware/reference-designs/reference-designs.md) | Des bases matérielles et logicielles reproductibles, leurs points de validation et leurs limites de réutilisation. |
| Finaliser une conception de carte | [Conception pour la production](../hardware/design-for-production.md) | Guides de conception, listes de contrôle, définitions d’interfaces, composants de la liste approuvée et bibliothèques EDA officielles. |

</div>

## Contenu de cette section { #what-this-section-covers }

Consultez d’abord la [présentation de la famille SF32](family/SF32_family.md) pour découvrir les familles disponibles et leurs principales différences fonctionnelles. Une fois la famille et le boîtier ciblés, les [règles de nomenclature](family/SF32_namingrule.md) vous aideront à décoder la référence complète.

Utilisez le [sélecteur de produits SF32](product-selector.md) lorsque le choix dépend de l’alimentation, du boîtier, de l’affichage, de l’audio, de la mémoire, des GPIO, de la connectivité ou de fonctions matérielles spécialisées. Il sert à établir une première liste de candidats ; la référence exacte, le boîtier, les limites électriques et le routage sur la carte doivent ensuite être vérifiés dans la documentation SiFli correspondante.

Une fois l’orientation choisie, poursuivez avec les [conceptions de référence](../hardware/reference-designs/reference-designs.md) et la [préparation à la production](../hardware/design-for-production.md). Ces ressources relient le choix du composant au matériel de référence, aux recommandations de conception, aux bibliothèques CAO, aux décisions relatives à la nomenclature (BOM), aux listes de contrôle de revue et aux preuves de mise en service.

## Accéder directement au matériel { #browse-hardware-directly }

Vous savez déjà quel type de matériel vous recherchez ? Accédez directement au catalogue concerné :

- [Puces](family/SF32_family.md) : informations sur les familles et la sélection des composants.
- [Modules](modules/SF32LB52-MOD-1.md) : conception d’une carte porteuse autour d’un module intégrant déjà la RF et les circuits principaux.
- [Cartes de développement](devkits/SF32LB52-DevKit-LCD.md) : matériel pris en charge pour valider le logiciel et les périphériques.

La documentation matérielle couvre la réalisation physique du produit. Pour la configuration du SDK, les exemples, les chaînes d’outils et la prise en charge des plateformes logicielles, consultez la section [Développement](../develop/index.md).
