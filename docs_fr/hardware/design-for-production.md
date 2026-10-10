---
icon: lucide/clipboard-check
description: "Point d'entrée de la conception pour la production du matériel SF32 : guides de conception pour puces et modules, listes de contrôle, définitions d'interface, composants approuvés et bibliothèques EDA."
tags:
    - Matériel
    - Production
---

# Conception pour la production { #design-for-production }

Utilisez ce parcours après avoir sélectionné une puce ou un module et avant de libérer le schéma, le routage PCB, la BOM ou le dossier de fabrication. Il rassemble les références de mise en œuvre qui réduisent les risques lors de la première mise en service et de la qualification : guides de conception matérielle propres au dispositif, listes de contrôle, définitions d'interface des modules, composants approuvés et bibliothèques EDA.

## Séquence de conception pour la production recommandée { #recommended-production-sequence }

Utilisez cette séquence comme un cycle de revue, et non comme un transfert unique. Vérifiez les symboles et les empreintes avant de fabriquer le prototype ; ne libérez les fichiers CAO et le dossier de fabrication pour la production qu’après la revue de conception et la validation du matériel prévu pour la série. Reprenez les vérifications concernées lorsque la carte, le firmware ou la BOM change.

<div align="center"><em>Tableau : séquence de conception pour la production</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Étape | Référence à utiliser | Preuves à conserver |
|:------|:----|:-------------------|
| Architecture | Présentation du produit et exigences d'interface | Composant, boîtier, mémoire, affichage, audio, stockage et hypothèses d'alimentation retenus. |
| Schéma et routage | Guide de conception matérielle de la puce ou du module | Mise en œuvre vérifiée de l'alimentation, de l'horloge, du reset, du RF, du stockage, de l'affichage et des interfaces. |
| BOM | Liste de fournisseurs approuvés (AVL) et fiches techniques des composants | Alternatives qualifiées ou validées spécifiquement pour chaque composant critique. |
| Revue de conception | Liste de contrôle de conception matérielle | Traitement consigné pour chaque point applicable de la liste et chaque exception. |
| Mise en service | Documentation des cartes de développement, exemples SDK et mesures | Résultats reproductibles pour le démarrage, la programmation, les périphériques, la communication sans fil, la consommation et la récupération. |
| Libération CAO pour la production | Bibliothèques EDA officielles et plans de boîtier | Symbole, empreinte, brochage, disposition des pastilles et données de fabrication vérifiés. |

</div>

## Utilisez la bonne référence pour le produit choisi { #use-the-right-reference-for-the-chosen-product }

Pour la mise en œuvre, utilisez les références suivantes :

- **[Les guides de conception matérielle](index.md#find-a-guide)** fournissent des conseils spécifiques au dispositif sur le schéma, le routage, l'alimentation, les interfaces et la mise en service pour les puces, ainsi que des conseils d'intégration sur carte porteuse pour les modules. Utilisez la liste de contrôle correspondante lorsqu'elle est disponible, et consultez d'abord la présentation du module pour confirmer qu'il correspond à l'architecture du produit.
- **[Modules M2](m2-modules/interface-standards-overview.md)** contiennent les règles de nommage M2 de μForge et le projet de définition d'interface au niveau des broches. La définition d'interface est une proposition ; validez-la avant tout engagement de production.
- **[CAO et composants](cad-components/components-and-cad-libraries.md)** comprennent l'[AVL de SiFli](cad-components/sifli-approved-vendor-list.md) et les [bibliothèques EDA officielles](cad-components/eda-tool-libraries.md). Ni l'AVL ni les bibliothèques ne remplacent la vérification finale à partir de la référence exacte du composant, du plan de boîtier et du guide de conception sélectionné.

## Une référence de production ne remplace pas la validation { #a-production-reference-is-not-a-substitute-for-validation }

Les guides de conception et les listes de composants qualifiés réduisent le risque, mais ne prouvent pas qu'un produit fini est validé. Vérifiez la révision finale du PCB, l'image du firmware, le boîtier, la batterie, l'affichage, le dispositif de stockage, le comportement RF, l'environnement d'exploitation et le processus de test en fabrication. Consignez les écarts par rapport à un guide ou à une liste de contrôle comme des décisions d'ingénierie explicites, et non comme des exceptions non documentées.
