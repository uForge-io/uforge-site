---
icon: lucide/waypoints
description: "Un parcours pratique de conception de référence SF32, de la validation sur carte de développement SF32LB52 jusqu'à un plan de mise en production du matériel et du firmware d'un objet connecté portable personnalisé."
tags:
    - Matériel
    - Conception de référence
---

# Parcours de conception de référence pour objet connecté portable { #connected-wearable-reference-design-journey }

Ce parcours décrit la validation d'un produit connecté compact, alimenté par batterie, avec écran, BLE et entrée de capteur. Il ne constitue ni un schéma publié, ni une BOM, ni un ensemble de référence matériel validé. Utilisez-le pour établir et tester votre propre configuration matérielle et logicielle avant de concevoir une carte spécifique.

1. **Sélectionnez les composants et établissez une configuration de référence.** Consultez la [Famille SF32](../../sf32-products/family/SF32_family.md) et le [Sélecteur de produits SF32](../../sf32-products/product-selector.md) pour réduire la liste des candidats. Exécutez `hello_world` du SiFli-SDK sur une [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) ou une carte disponible qui respecte les contraintes matérielles et offre les interfaces nécessaires. Consignez la révision de la carte, la version ou le commit du SDK, les commandes de compilation et de programmation ainsi que le journal série.
2. **Validez les fonctions du produit.** Suivez les [tutoriels](../../getting-started/tutorials/overview.md) pour valider la gestion des entrées et des capteurs, le BLE, une interface utilisateur simple, le stockage si nécessaire et la procédure de récupération via l'interface série.
3. **Validez les interactions système.** Utilisez [Graphismes](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md) et [Basse consommation](../../learn/low-power/overview.md) pour tester ensemble le rafraîchissement de l'affichage, l'activité sans fil et la mise en veille/le réveil.
4. **Préparez le matériel personnalisé.** Dans la section [Conception pour la production](../design-for-production.md), consultez le guide de conception et la liste de contrôle de la puce sélectionnée. Confirmez les hypothèses relatives à l'affichage, au stockage, à la batterie, à l'antenne/RF, ainsi qu'à la programmation et aux tests.
5. **Réunissez les preuves de validation pour la mise en production.** Conservez le nom et la révision de la carte, la version ou le commit du SDK, une image de firmware validée, les journaux, la consommation mesurée par scénario et les conditions associées, le comportement de récupération/OTA, les choix de BOM et les conclusions de la liste de contrôle.

Une démonstration réussie ne suffit pas à terminer ce parcours. Les procédures de compilation, de flashage et de récupération doivent être reproductibles, et des mesures doivent confirmer le fonctionnement conjoint des principaux sous-systèmes sur un matériel représentatif. Associez à chaque résultat de consommation le scénario de fonctionnement, la tension d'alimentation et les conditions de mesure, afin qu'un autre ingénieur puisse reproduire la comparaison.
