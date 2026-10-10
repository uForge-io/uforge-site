---
icon: lucide/plug
description: "Règles de nommage pour l'interface de module M2 de μForge et ses spécifications d'extension M2xM/M2xA/M2xN/M2xH/M2xP, avec des exemples de déclaration et des principes de conception."
tags:
  - Matériel
  - Module
  - Interface
---

# Règles de nommage de l'interface M2 de μForge { #forge-m2-interface-naming-rules }

## Spécification de base { #base-specification }

Ce document définit les noms utilisés dans le système d'interfaces de modules proposé par μForge. Il s'agit d'une convention de nommage, pas d'une norme électrique ou mécanique publiée.

Dans cette convention, **M2** désigne l'interface de base commune obligatoire pour les modules qui adoptent ce système. Cette exigence ne signifie pas que tous les modules μForge ou SiFli existants implémentent M2. Le brochage et les exigences électriques et mécaniques de M2 sont encore en cours de définition et ne sont pas précisés ici.

Avant de présenter M2 comme compatible avec M.2 E-key, une définition M2 publiée devrait préciser l'interface mécanique, le brochage, les limites électriques, les signaux obligatoires et optionnels, les exigences de la carte porteuse et les règles de conformité. La [définition de l'interface M2](M2-interface-definition.md) actuelle est une ébauche : le nom M2 seul ne prouve ni la compatibilité électrique avec M.2 ni l'interchangeabilité d'un module entre différentes cartes porteuses.

## Spécifications d'extension { #extension-specifications }

Les fonctions optionnelles sont regroupées dans des spécifications d'extension **M2xY**. Les noms désignent des catégories fonctionnelles, sans garantir qu'un module donné implémente toutes les fonctions d'une catégorie.

**Format de nommage :**

> **M2xY**

Où :

- **M2** = spécification d'interface de base
- **x** = séparateur d'extension
- **Y** = catégorie d'extension

## Catégories d'extension { #extension-categories }

<div align="center"><em>Catégories d'extension M2</em></div>

<div align="center" markdown>

| Spécification | Description |
| --- | --- |
| **M2xM** | Multimédia : futures capacités d'affichage RGB, de caméra DVP, de microphone numérique et d'audio avancé. |
| **M2xA** | Analogique : futures capacités d'E/S analogique de précision et d'acquisition de données. |
| **M2xN** | Réseau : futures capacités Ethernet, CAN et de mise en réseau industrielle. |
| **M2xH** | Haute vitesse : futures interfaces à haute bande passante. |
| **M2xP** | Alimentation : futures capacités de gestion de l'alimentation et d'E/S à fort courant. |

</div>

Ces descriptions indiquent le périmètre prévu pour chaque catégorie, pas des exigences électriques définitives. Le classeur local de la proposition contient les plans d'affectation des contacts M2 et M2xM. L'article de définition présente aussi des résumés M2xN et M2xA, mais aucune donnée source de cartographie des contacts n'a été trouvée pour vérifier ces résumés ; ils doivent donc être considérés comme non vérifiés. M2xH et M2xP restent des noms réservés, sans affectation de contacts.

## Déclaration de module { #module-declaration }

Un module qui adopte cette convention déclare **M2** comme interface de base et peut indiquer une ou plusieurs extensions implémentées. Sa documentation doit aussi préciser les connecteurs réellement utilisés, les fonctions optionnelles et les modes mutuellement exclusifs.

Exemples de déclaration, et non une liste de configurations de modules officiellement publiées :

- **M2**
- **M2 + M2xM**
- **M2 + M2xA**
- **M2 + M2xM + M2xN**

## Principes de conception { #design-principles }

- **M2** vise à rester stable et rétrocompatible à mesure que le système évolue. La compatibilité doit être vérifiée pour les révisions de spécification applicables et l'implémentation réelle.
- Chaque extension **M2xY** a son propre périmètre fonctionnel. Des noms distincts ne signifient pas que toutes les fonctions peuvent fonctionner simultanément ni que leurs affectations de broches sont indépendantes.
- Les extensions complètent l'interface de base sans la modifier ni la remplacer.
- Les modules indiquent les fonctions prises en charge en listant leurs spécifications M2xY implémentées.

Avant de choisir un connecteur ou d'affirmer une compatibilité, suivez la procédure de vérification de la page [Normes d'interface de module](interface-standards-overview.md).
