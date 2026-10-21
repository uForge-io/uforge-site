---
icon: lucide/cpu
title: Matériel
description: Réutilisez une configuration de référence SF32 ou concevez autour du composant choisi, puis préparez la carte pour la production.
---

# Matériel { #hardware }

Après avoir choisi un composant SF32 et validé une configuration de référence sur une carte de développement, utilisez cette section pour concevoir la carte ou la carte porteuse du module et préparer la production. Réutilisez une conception de référence si elle convient, suivez le guide du composant choisi et rassemblez les résultats de validation et le dossier de conception nécessaires à la revue de préparation à la production.

## Choisissez un point de départ { #choose-a-starting-point }

<div align="center"><em>Parcours matériels</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Votre tâche | Commencez ici | Résultat |
|:----------|:-----------|:--------|
| Réutiliser une configuration matérielle et logicielle validée | [Conceptions de référence](reference-designs/reference-designs.md) | Un point de départ reproductible, les points à valider et les limites de réutilisation. |
| Concevoir une carte autour de la puce ou une carte porteuse pour un module | [Trouver le guide adapté](#find-a-guide) | Le guide de conception adapté à la puce ou au module, ainsi que la liste de contrôle disponible. |
| Planifier une interface de module selon la proposition M2 | [Modules M2](m2-modules/interface-standards-overview.md) | Les règles de nommage M2 et le projet de brochage à vérifier pour le module choisi. |
| Préparer les fichiers de CAO et la nomenclature (BOM) | [CAO et composants](cad-components/components-and-cad-libraries.md) | Les bibliothèques EDA officielles, les ressources AVL et les vérifications propres au composant choisi. |
| Finaliser le dossier de conception pour la production | [Conception pour la production](design-for-production.md) | La revue de préparation à la production, les preuves à conserver et le transfert à la fabrication. |

</div>

## Trouver un guide { #find-a-guide }

Choisissez la puce ou le module au cœur de votre conception et consultez le guide correspondant. Si le boîtier, l'alimentation, la configuration mémoire ou le mode d'intégration restent à confirmer, commencez par la présentation du produit.

### Guides et listes de contrôle des puces { #chip-guides-and-checklists }

<div align="center"><em>Tableau : Guides et listes de contrôle des puces</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Famille de puces sélectionnée | Guide de conception matérielle | Liste de contrôle | Commencez ici quand |
|:---------------------|:----------------------|:----------|:----------------|
| SF32LB52x | [Guide](chip-guides/SF32LB52x_hardware_design_guide.md) | [Liste de contrôle](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Vous concevez une carte SF32LB52x en chip-down. |
| SF32LB55x | [Guide](chip-guides/SF32LB55x_hardware_design_guide.md) | [Liste de contrôle](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Vous concevez une carte SF32LB55x en chip-down. |
| SF32LB56x | [Guide](chip-guides/SF32LB56x_hardware_design_guide.md) | [Liste de contrôle](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Vous concevez une carte SF32LB56x en chip-down. |
| SF32LB57x | [Guide](chip-guides/SF32LB57x_hardware_design_guide.md) | [Schéma](chip-guides/SF32LB57x_schematic_checklist.md) / [Routage PCB](chip-guides/SF32LB57x_pcb_layout_checklist.md) | Vous concevez une carte SF32LB57x en chip-down. |
| SF32LB58x | [Guide](chip-guides/SF32LB58x_hardware_design_guide.md) | [Liste de contrôle](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Vous concevez une carte SF32LB58x en chip-down. |

</div>

### Guides des modules { #module-guides }

<div align="center"><em>Tableau : Guides d'intégration des modules</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Module sélectionné | Guide du module | À utiliser pour |
|:----------------|:-------------|:-----------|
| SF32LB52-MOD-1 | [Guide du module](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Alimentation de la carte porteuse, brochage, dégagement autour de l'antenne et précautions de manipulation en fabrication. |
| SF32LB56-MOD | [Guide du module](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Intégration sur la carte porteuse, alimentation, implantation RF, interfaces et validation. |
| SF32LB58-MOD | [Guide du module](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Alimentation de la carte porteuse, brochage, dégagement autour de l'antenne et précautions de manipulation en fabrication. |

</div>

## Suivre le parcours matériel { #follow-the-hardware-path }

1. **Réutilisez une configuration de référence si elle convient.** Reproduisez d'abord la configuration matérielle et logicielle indiquée avant de l'adapter ; sinon, commencez directement par le guide du composant choisi.
2. **Réalisez la conception et vérifiez-la.** Consultez le guide correspondant avant la saisie du schéma, puis utilisez sa liste de contrôle lors des revues du schéma et du routage. Avant de figer le matériel, validez le logiciel et les périphériques prévus sur la [carte de développement](../sf32-products/index.md) la plus proche de votre configuration. Les essais sur la carte de développement ne remplacent pas la validation de l'alimentation, des fonctions des broches et de la RF sur la carte finale.
3. **Consultez la documentation M2 si la carte porteuse doit suivre la proposition M2.** Appliquez les [règles de nommage M2](m2-modules/M2%20Interface%20Naming%20Rules.md) et vérifiez la [définition de l'interface](m2-modules/M2-interface-definition.md) pour le module exact avant de figer son interface ; la définition des broches reste à l'état de brouillon.
4. **Vérifiez les fichiers de CAO et le choix des composants.** Dans [CAO et composants](cad-components/components-and-cad-libraries.md), vérifiez pour la référence exacte le symbole, l'empreinte, le plan du boîtier, l'AVL et les hypothèses concernant les composants critiques.
5. **Franchissez le point de contrôle de mise en production.** Passez à [Conception pour la production](design-for-production.md) avec les justificatifs de conception, les dérogations approuvées, les risques restants et les hypothèses de test en fabrication.

## Poursuivez le développement { #stay-connected-to-the-platform-path }

Si vous n'avez pas encore choisi le composant, le module ou la carte de développement, revenez à [Produits SF32](../sf32-products/index.md). Pour mettre en place une configuration vérifiée de la chaîne d'outils, du flashage et des journaux série, consultez [Premiers pas](../getting-started/index.md). La section [Développement](../develop/index.md) présente les éléments logiciels à valider avec le matériel.
