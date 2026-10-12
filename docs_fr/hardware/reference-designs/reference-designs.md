---
icon: lucide/waypoints
description: "Parcours de conceptions de référence pour μForge : comparez les démarches de validation matérielle et logicielle et choisissez celle qui correspond le mieux à votre produit."
tags:
    - Matériel
    - Conception de référence
---

# Conceptions de référence { #reference-designs }

Les conceptions de référence relient la planification du produit à sa mise en œuvre. Une base matérielle et logicielle réutilisable doit préciser le matériel de départ, la version logicielle, les fichiers de conception disponibles, les résultats de mise en service et les limites de réutilisation. Les parcours présentés ici aident à établir et à valider cette base ; leur présence ne prouve pas qu'un schéma, une BOM ou un dossier de qualification pour la production ont été publiés.

Utilisez [Planifier un produit](../../sf32-products/family/product-planning.md) pour établir une première présélection, puis choisissez ci-dessous le parcours le plus proche de votre produit afin d'organiser la validation de la carte et de réduire les risques liés au produit.

## Conceptions de référence et projets { #reference-designs-and-projects }

Utilisez une conception de référence pour répondre à la question : **« Quelle base technique réutilisable puis-je prendre comme point de départ ? »** Utilisez un [projet](../../projects/index.md) pour répondre à la question : **« Comment faire passer un produit spécifique de cette base aux décisions d'intégration et de mise en production ? »**

<div align="center"><em>Tableau : limite entre conception de référence et projet</em></div>

<div align="center" markdown>

| Élément | Conception de référence | Projet |
|:-----|:-----------------|:--------|
| Rôle principal | Une base technique réutilisable. | Un parcours propre au produit pour l'intégration et les décisions de mise en production. |
| Principaux éléments de preuve | Base matérielle/logicielle, fichiers de conception ou indications sur leur disponibilité, résultats de mise en service et limites de réutilisation. | Décisions produit, dépendances, étapes d'adaptation, jalons de validation et preuves de mise en production. |
| Attente de réutilisation | Un lecteur peut adopter et adapter la base pour plusieurs produits. | Le lecteur suit le parcours d'un produit concret, puis applique des changements maîtrisés propres à ce produit. |
| Relation | Renvoie vers les projets qui l'adoptent. | Renvoie vers la conception de référence dont il part, le cas échéant. |

</div>

## Parcours disponibles { #available-journeys }

Le parcours actuel d'objet connecté portable décrit une démarche de validation, pas un dossier publié de carte de référence. Il ne publie pas encore de combinaison fixe de révisions de carte et de SDK, de version des fichiers de conception ni de dossier de qualification fondé sur des mesures. Établissez et consignez ces bases pour votre produit avant de considérer les résultats comme reproductibles.

<div align="center"><em>Tableau : parcours de conception de référence</em></div>

<div align="center" markdown>

| Parcours | Produit visé | Base matérielle | Base logicielle | Priorité de validation |
|:--------|:--------------|:------------------|:------------------|:--------------------|
| [Objet connecté portable](connected-wearable-journey.md) | Produit compact alimenté par batterie avec affichage, BLE et entrée de capteur. | SF32LB52-DevKit-LCD ou une autre carte adaptée, puis une carte personnalisée utilisant la puce ou le module retenu. | `hello_world` du SiFli-SDK et exemples pertinents pour le produit. | Comportement de l'affichage, du Bluetooth, du capteur, mise en veille/réveil, récupération et preuves de conception pour la production. |

</div>

## Comment utiliser un parcours { #how-to-use-a-journey }

1. Vérifiez que le produit visé par le parcours et le matériel retenu respectent les contraintes de votre conception.
2. Reproduisez sa base logicielle sur la carte indiquée avant de l'adapter.
3. Consignez avec le dossier du projet la référence exacte de la carte, la version du SDK, l'exemple, la commande de compilation/flashage et le journal série.
4. Ajoutez une validation spécifique au produit pour chaque modification de l'affichage, du composant de mémoire, du chemin d'alimentation par batterie, de la conception RF, du boîtier ou des interfaces.
5. Transmettez les résultats à [Conception pour la production](../design-for-production.md), y compris le guide sélectionné, la liste de contrôle, les décisions AVL, la méthode de récupération et les risques restants.

## Ajouter un nouveau parcours { #adding-a-new-journey }

Avant de présenter un parcours comme une base de référence reproductible, documentez le produit et le public visés, les versions matérielles et logicielles prises en charge, les prérequis, le dépôt source, les jalons, les critères de validation, les mesures et le transfert vers l'adaptation du produit. S'il s'agit encore d'une démarche de planification, indiquez cet état et les preuves manquantes, sans laisser entendre que la base est déjà qualifiée.

Pour des réalisations complètes et centrées sur un projet, allant au-delà d'un parcours de référence réutilisable, utilisez [Projets](../../projects/index.md). Un projet doit renvoyer vers la conception de référence pertinente plutôt que de dupliquer sa base matérielle, ses fichiers de conception ou sa documentation de production.
