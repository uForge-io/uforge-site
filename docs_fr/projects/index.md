---
icon: lucide/folder-kanban
title: "Projets μForge : présentation"
description: "Des projets μForge de bout en bout qui associent du matériel choisi, une base logicielle, des preuves de validation et un transfert vers la production."
tags:
    - Projets
---

# Présentation des projets { #projects-overview }

Les projets sont des références ancrées dans des usages concrets, que vous pouvez reprendre et adapter pour explorer des idées de produits basés sur SF32. Plutôt que de montrer chaque fonction isolément, chacun associe plusieurs capacités SF32 dans un produit que l’on peut réellement construire et utiliser.

## À quoi servent les projets { #what-projects-are-for }

Chaque projet doit réunir les qualités suivantes :

- **Être ancré dans un usage.** Chaque projet part d’un comportement produit ou d’un cas d’usage reconnaissable, pas d’une démonstration abstraite.
- **Être assez complet pour être suivi.** Il relie le matériel choisi, la base logicielle, ses dépendances, les étapes d’intégration, les preuves de validation et les pistes d’adaptation. Vous pouvez ainsi parcourir une part importante du cycle de développement.
- **Être conçu pour être repris.** Reproduisez d’abord une base concrète, puis adaptez-la à votre matériel, à votre mode d’interaction ou aux exigences de votre produit.
- **Être amusant à réaliser.** Un projet doit inviter à l’expérimentation et rendre visible ce que permettent les capacités SF32 ; utilité et plaisir vont ici de pair.

Utilisez un projet après avoir suivi le parcours [Bien démarrer](../getting-started/index.md) correspondant. Les [conceptions de référence](../hardware/reference-designs/reference-designs.md) présentent des bases réutilisables et des parcours de validation. L’entrée « Connected Wearable » actuellement publiée décrit un parcours de conception, et non un ensemble matériel mis à disposition. Lorsqu’une base précise et applicable existe, le projet doit y renvoyer ; sinon, il doit définir et valider sa propre base, sans présenter un parcours de planification comme une conception qualifiée.

## Projets SiFli-SDK { #sifli-sdk-projects }

!!! info "Responsabilité d’un projet tiers"
    Le [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) est maintenu par Xinyuan-LilyGO/LilyGO, et non par SiFli. Pour le matériel et le firmware propres à cette carte, consultez le dépôt de LilyGO ; pour le composant SF32 et SiFli-SDK, référez-vous aux sources de SiFli.

<div align="center"><em>Tableau : répertoire des projets</em></div>

<div align="center" markdown>

| Projet | Résultat | Base matérielle et logicielle | Usage conseillé |
|:--------|:--------|:-------------------------------|:---------|
| [Assistant vocal SF32 Xiaozhi](sf32-xiaozhi.md) | Assistant connecté avec interface vocale et écran, basé sur l’implémentation open source Xiaozhi SF32. | Cartes SF32LB52 prises en charge, code source Xiaozhi SF32, Bluetooth PAN et services cloud Xiaozhi. | Évaluer un parcours produit d’interaction vocale avec IA et adapter le matériel ou le comportement de l’application. |
| [Interphone BLE SF32 Talkback](sf32-ble-talkback.md) | Interphone BLE multi-appareils à alternat (push-to-talk) avec sélection des rôles, voix Opus, reconnexion des appareils secondaires, indication d’état et fonctionnement basse consommation. | Au moins deux cartes SF32LB52-DevKit-ULP, version figée du code Talkback, révision compatible avec SiFli-SDK 2.4 et `talk_back/1.2@sifli`. | Qualifier l’interphonie de groupe, l’acoustique, la reprise radio et la consommation avant de concevoir du matériel dédié. |
| [Lecteur EPUB SF32 à écran papier électronique](sf32-epd-reader.md) | Lecteur EPUB local avec bibliothèque et sommaire, commandes par touches et tactiles, polices dynamiques, rafraîchissement complet ou partiel, stockage et modes basse consommation. | SF32-OED-EPD V1.1, écran e-paper YZC085 V1.05, commits figés du lecteur EPD et du SDK, stockage TF, contenus et polices vérifiés. | Évaluer un terminal de lecture e-paper, les limites EPUB/rendu, les formes d’onde de dalle, la récupération du stockage et la consommation. |
| [Clavier macro multifonction SuperKey](superkey.md) | Contrôleur de bureau USB HID/CDC doté de trois écrans, de touches, d’un encodeur, de capteurs, de télémétrie et d’une application compagnon. | Matériel ouvert sf32-keyboard, cible firmware `sf32lb52-superkey` et SuperKeyHub. | Évaluer une IHM de bureau, un clavier macro, un panneau d’état ou une surface de commande reliée à un hôte. |
| [Radiation Monitor](radiation-monitor.md) | Moniteur portable du niveau de signal 2,4 GHz avec 79 points, lissage et lecture de l’historique. | Chaîne de test RF SF32LB52, écran LVGL, commande KEY2 et configuration de comparaison RF contrôlée. | Étudier les tendances relatives d’interférence et déterminer si une chaîne de mesure RF étalonnée se justifie. |
| [Console portable Pocket Pi SF32](pocket-pi.md) | Console portable émulant la NES, avec navigateur de jeux, commandes, audio, sauvegardes et stockage interne ou sur carte TF. | Cible SF32LB52-DevKit-ULP, sources PocketPi/Nofrendo, commandes AW9523 et contenus NES utilisables légalement. | Tester les charges graphiques, de commande, audio, de stockage et d’alimentation d’un jeu avant de créer du matériel dédié. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | Plateforme de développement SF32 tierce centrée sur l’affichage, avec tactile, détection de mouvement, stockage, audio, LoRa et gestion de l’alimentation. | Matériel LilyGO T-Display-SF32, révisions du dépôt de la carte et du fork SDK LilyGO sélectionnées et consignées pour l’évaluation, cible `t-display-sf32_hcpu`. | Évaluer une base pour objet connecté porté, terminal portable, terminal à capteurs ou IHM maintenue par LilyGO, sans la présenter comme un projet officiel de SiFli. |

</div>

## Projets Zephyr { #zephyr-projects }

Cette catégorie regroupe les projets basés directement sur Zephyr ou sur une couche dérivée documentée, comme ArduinoCore-zephyr d’OpenSiFli.

<div align="center"><em>Tableau : répertoire des projets Zephyr</em></div>

<div align="center" markdown>

| Projet | Résultat | Base matérielle et logicielle | Usage conseillé |
|:--------|:--------|:-------------------------------|:---------|
| [Portage d’Arduboy2 pour SF32LB52](arduboy2-sifli.md) | Parcours reproductible pour évaluer sur SF32LB52 un jeu ou une démo interactive de type Arduboy2. | Code source Arduboy2-SiFli d’OpenSiFli, variante ArduinoCore-Zephyr `sf32lb52_devkit_lcd_sf32lb525uc6` et chemin documenté des périphériques externes d’affichage, de commande et audio. | Tester les interactions locales, les graphismes, les commandes, l’audio et les limites d’une couche applicative portable issue de l’écosystème Arduino. |
| [Firmware clavier ZMK sur SF32](zmk-sf32.md) | Base SF32LB52 reproductible pour clavier séparé : balayage matriciel, couches, USB HID, liaisons BLE entre les moitiés et vers l’hôte, paramètres et ZMK Studio. | OpenSiFli/zmk, variante de carte ZMK SF32LB52-DevKit-LCD et shields `urchin_sf32lb52_left/right` avec dépendances du manifeste figées. | Évaluer des claviers sans fil, macro-pads et produits HID personnalisés sous ZMK, tout en mesurant le niveau de maturité du portage SF32 en aval. |

</div>

## Contenu attendu de chaque projet { #what-every-project-includes }

Chaque projet μForge devrait documenter son résultat cible, son lectorat, les versions matérielles et logicielles prises en charge, les prérequis, le dépôt source, les étapes de compilation organisées par jalon, les critères de validation, les mesures et les éléments nécessaires à son adaptation au produit. Un projet constitue un point de départ pour l’ingénierie ; il ne remplace pas la validation de production du matériel final ni l’évaluation de l’intégration des services, de la sécurité, de la confidentialité et des exigences réglementaires.

!!! note "Contenu généré automatiquement"
    Cette page a été rédigée sans document source préexistant. Vérifiez les affirmations techniques à l’aide de la documentation officielle de SiFli avant de les considérer comme fiables.
