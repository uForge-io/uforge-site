---
icon: lucide/cable
description: "Conventions d'interface M2 de μForge : appliquer les règles de nommage pour une terminologie stable et valider la définition des broches avant la carte porteuse."
tags:
    - Matériel
    - Module
    - Interface
---

# Normes d'interface de module { #module-interface-standards }

Cette section présente les conventions utilisées pour décrire les interfaces des modules μForge. Consultez-la avant de choisir le connecteur d'une carte porteuse, de figer son brochage ou d'affirmer sa compatibilité avec un module. Elle renvoie à deux types de documents : des règles de nommage qui établissent une terminologie commune et une proposition de brochage utile à la planification, mais à valider pour le module et le produit sélectionnés.

## Utilisez les documents dans le bon ordre { #use-the-documents-in-the-right-order }

<div align="center"><em>Tableau : documents d'interface de module</em></div>

<div align="center" markdown>

| Document | État et objectif | À utiliser quand |
|:---------|:-------------------|:------------|
| [Règles de nommage de l'interface M2](M2%20Interface%20Naming%20Rules.md) | Convention de nommage pour les familles et profils d'interface M2. | Pour nommer un module, un connecteur, une carte porteuse ou un profil d'interface dans la documentation et les fichiers de conception. |
| [Définition de l'interface M2](M2-interface-definition.md) | Projet de définition du brochage et proposition d'affectation des signaux. | Vous évaluez une proposition d'interface M2 pour une carte porteuse ou vérifiez le partage des signaux avant de choisir le connecteur. |

</div>

## Nommage et compatibilité électrique { #what-is-stable-and-what-must-be-verified }

Appliquez les règles de nommage de façon cohérente dans les descriptions de modules, les schémas, les notes de BOM et la documentation produit. Les noms décrivent le profil d'interface prévu, pas une spécification électrique ou mécanique définitive. Ni un nom de profil ni une forme de connecteur identique ne prouvent l'interchangeabilité d'un module et d'une carte porteuse.

La proposition de brochage ne garantit pas que tous les modules μForge ou boîtiers SF32 prennent en charge l'ensemble des signaux et interfaces proposés, ni toutes les combinaisons d'utilisation simultanée. Avant de figer la conception, vérifiez les points suivants dans la documentation du module, de la puce et du boîtier sélectionnés, ainsi que dans le guide de conception matérielle correspondant :

- le plan mécanique du connecteur, le détrompage, la numérotation des broches et les contraintes d'assemblage ;
- les rails d'alimentation, les domaines de tension, le courant admissible et le séquencement des alimentations ;
- la disponibilité des interfaces, le multiplexage des broches et toute fonction mutuellement exclusive ;
- l'intégrité des signaux, l'impédance, l'égalisation des longueurs de pistes, l'ESD et les zones d'exclusion RF ;
- l'accès au débogage, au démarrage, à la récupération et au test de production ; et
- les exigences de la carte porteuse concernant l'affichage, la caméra, l'audio, le stockage et les modules sans fil associés.

## Parcours de décision pour la carte porteuse { #carrier-board-decision-path }

1. Choisissez le module et lisez sa présentation ainsi que son guide de conception matérielle.
2. Utilisez les [règles de nommage de l'interface M2](M2%20Interface%20Naming%20Rules.md) pour rendre le profil visé sans ambiguïté.
3. Utilisez la [définition de l'interface M2](M2-interface-definition.md) pour identifier les signaux candidats et les conflits de partage.
4. Confirmez chaque contact utilisé dans la documentation spécifique au module et dans la documentation source SiFli applicable.
5. Avant le début du routage, consignez dans la revue du schéma les versions des documents, les révisions du module et de la carte porteuse, les exceptions confirmées et les points non résolus.

Pour une revue complète de la carte porteuse, poursuivez avec [Conception pour la production](../design-for-production.md). Pour les exigences de mise en œuvre spécifiques à un module, utilisez le guide de module correspondant dans le groupe **Guides de conception matérielle**.
