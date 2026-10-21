---
icon: lucide/boxes
description: "Démarrez une conception de production SF32 avec des composants qualifiés et les données CAO officielles, puis effectuez la revue de la BOM et du routage dans le bon ordre."
tags:
    - Matériel
    - Production
    - CAD
---

# Composants et bibliothèques CAO { #components-and-cad-libraries }

Utilisez cette page lorsqu'une puce ou un module SF32 retenu passe de la décision d'architecture à une nomenclature (BOM) maîtrisée et à la conception du PCB. Les deux ressources ci-dessous remplissent des fonctions différentes : la **liste de fournisseurs approuvés (AVL)** aide à choisir des composants qualifiés par SiFli, tandis que les **bibliothèques d'outils EDA** fournissent les symboles, empreintes et données de projet de référence nécessaires à la mise en œuvre correcte du matériel choisi.

Aucune des deux ressources ne remplace le guide de conception matérielle spécifique au composant, le plan de boîtier ou la validation finale sur la carte destinée à la production.

## Choisissez la bonne ressource { #choose-the-right-resource }

<div align="center"><em>Tableau : ressources composants et CAO</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Ressource | À utiliser pour | Ne pas utiliser comme substitut pour |
|:---------|:-----------|:----------------------------------|
| [Liste de fournisseurs approuvés SF32](sifli-approved-vendor-list.md) | Présélectionner les quartz, inductances, mémoires Flash et autres composants pris en charge et qualifiés ; vérifier les contraintes électriques et d'identification par le firmware. | L'approbation finale des composants, la qualification de la chaîne d'approvisionnement ou la validation électrique au niveau du produit. |
| [Bibliothèques d'outils EDA](eda-tool-libraries.md) | Point de départ pour les symboles de schéma, les empreintes PCB, les plans de boîtier et les ressources de conception de référence dans les outils EDA pris en charge. | La vérification de la référence exacte à commander, de l'empilement des pastilles, du processus d'assemblage ou de la documentation actuelle du composant. |

</div>

## Séquence de revue, de la BOM à la CAO { #bom-to-cad-review-sequence }

1. **Figez la base de mise en œuvre.** Sélectionnez la puce ou le module exact, le boîtier, la configuration mémoire, l'interface d'affichage et l'architecture d'alimentation. Lisez son guide de conception matérielle avant de choisir les composants associés.
2. **Présélectionnez les composants critiques à partir de l'AVL.** Vérifiez les exigences électriques indiquées, pas seulement une correspondance de référence. Portez une attention particulière à la capacité de charge et à l'ESR du quartz, aux limites de courant de l'inductance du convertisseur abaisseur, à la tension et au mode de cadencement de la mémoire Flash, à la plage de température et à la compatibilité firmware.
3. **Créez le schéma à partir des bibliothèques officielles.** Utilisez les bibliothèques EDA et les conceptions de référence pertinentes comme point de départ. Comparez indépendamment chaque symbole, empreinte, numéro de broche, disposition des plages de soudure et règle de zone d'exclusion avec la fiche technique actuelle et le plan de boîtier du composant sélectionné.
4. **Vérifiez ensemble la BOM complète et le routage.** Assurez-vous que chaque composant qualifié correspond toujours à la tension de rail réelle, au courant, à la vitesse d'interface, au processus d'assemblage et aux contraintes mécaniques du produit. Appliquez les exigences du guide de conception de la puce ou du module pour l'alimentation, la RF, les horloges, la mémoire, l'affichage et l'accès au débogage.
5. **Validez le matériel destiné à la production.** Testez le démarrage, la programmation, les périphériques, les communications sans fil et la récupération, puis mesurez la consommation d'énergie sur la révision finale de la carte. Consignez les alternatives approuvées et chaque écart délibéré par rapport au guide ou à l'AVL.

## Limites pratiques { #practical-boundaries }

- Une AVL présente les résultats de qualification à une date donnée. Vérifiez à nouveau la version de la liste et la disponibilité des composants avant de publier une BOM de production.
- Une bibliothèque EDA est un point de départ pour la conception, pas une preuve qu'un routage terminé est fabricable ou électriquement correct.
- Si un composant ne figure pas dans l'AVL, qualifiez-le par rapport aux exigences pertinentes et validez-le sur le matériel cible avant une utilisation en production de série.
- Pour un produit à base de module, commencez par le guide de conception du module ; la BOM et le routage de la carte porteuse exigent quand même la même rigueur de revue.

Poursuivez avec [Conception pour la production](../design-for-production.md) pour le parcours complet de revue de conception, ou revenez au [sélecteur de produits SF32](../../sf32-products/product-selector.md) si la base de la puce, du module ou de la carte n'a pas encore été sélectionnée.
