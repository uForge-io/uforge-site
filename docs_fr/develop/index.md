---
icon: lucide/code-2
title: "Vue d'ensemble du développement"
description: "Un guide pratique axé sur les tâches pour développer des produits SF32 avec SiFli-SDK : flux de travail quotidien, notes d'application, exemples, outils, sujets firmware et parcours communautaires."
tags:
    - Développement
    - Logiciel
---

# Vue d'ensemble du développement { #develop }

La section Développement vous accompagne pour passer d'une carte SF32 fonctionnelle à un firmware de produit maintenable. Après le premier `hello_world`, utilisez-la pour choisir une configuration de carte, reproduire de manière fiable la compilation et le flashage, adapter un exemple approprié, intégrer les fonctions du produit, diagnostiquer les défaillances et planifier les mises à jour et la récupération.

Consultez [Prise en main](../getting-started/index.md) pour votre première mise en route d'une carte, [Produits SF32](../sf32-products/index.md) pour choisir le composant et la carte de développement, [Matériel](../hardware/index.md) pour les schémas et le matériel destiné à la production, et [Apprendre](../learn/index.md) pour les bases de l'architecture. Cette section décrit le flux de travail d'ingénierie et fournit des conseils de mise en œuvre par tâche.

!!! info "SiFli-Solution"
    SiFli-Solution est un ensemble logiciel distinct proposé par SiFli, que μForge.io ne documente pas actuellement. Les indications fournies ici se limitent à SiFli-SDK et aux parcours communautaires listés ci-dessous. Si votre produit nécessite une solution plus complète pour les appareils dotés d'un écran, consultez la [documentation officielle de SiFli Solution](https://docs.sifli.com/projects/solution/index.html) et contactez directement SiFli. Un produit complexe empruntant cette voie peut nécessiter un accompagnement direct et approfondi de SiFli.

## Établir une configuration de référence SiFli-SDK { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) est le package logiciel officiel de SiFli, basé sur RT-Thread, et constitue le parcours de référence pour le développement du firmware SF32. Commencez par là, sauf si vous avez une raison précise d'évaluer un autre écosystème : c'est la voie de développement de référence dont la documentation couvre le plus largement la prise en charge des cartes, le Bluetooth, le graphisme, l'audio, le stockage, la gestion de l'énergie et le travail de mise en production.

Avant de développer les fonctionnalités du produit, établissez et consignez une configuration de référence reproductible :

1. Sélectionnez la configuration SDK correspondant exactement à la carte dans [Configuration de la carte](platforms/sifli-sdk/board-configuration.md).
2. Suivez jusqu'au bout le cycle [Compiler, flasher et surveiller la sortie série](platforms/sifli-sdk/build-flash-monitor.md) et vérifiez qu'il fonctionne.
3. Enregistrez la version ou le commit du SDK, le nom de la carte, la commande de compilation, la commande de flashage, les paramètres série et un journal de démarrage.
4. Partez de l'[exemple](examples/index.md) le plus proche, en privilégiant celui qui met déjà en œuvre le sous-système le plus exigeant du produit.

Ce relevé servira de référence pour les modifications ultérieures de l'application, les portages sur d'autres cartes, l'analyse des échecs de test et la récupération sur le terrain.

## Trouver des indications par tâche { #find-guidance-by-task }

<div align="center"><em>Tableau : Tâches de développement SF32</em></div>

<div align="center" markdown>

| Tâche | Commencer ici | Puis utiliser |
|:----------------|:-----------|:---------|
| Compiler et flasher le firmware ; vérifier la sortie série | [Compiler, flasher et surveiller la sortie série](platforms/sifli-sdk/build-flash-monitor.md) | [Outils](tools/index.md) pour le flashage par script, le traçage et les outils de diagnostic des plantages. |
| Adapter le firmware à une carte de développement, un module ou un matériel personnalisé | [Configuration de la carte](platforms/sifli-sdk/board-configuration.md) | Le guide matériel correspondant et l'exemple le plus proche pour la carte. |
| Réutiliser un pilote ou une couche middleware dans plusieurs projets | [Composants et `sf_pkg`](platforms/sifli-sdk/components.md) | Un exemple minimal et le périmètre de configuration documenté. |
| Mettre en œuvre un périphérique ou un sous-système concret | [Notes d'application du SDK](platforms/sifli-sdk/sdk-application-notes.md) | Le guide officiel du SDK correspondant, pour connaître les API, symboles de configuration et commandes exacts. |
| Démarrer un produit à partir de code déjà fonctionnel | [Exemples](examples/index.md) | La configuration de carte correspondante, puis des tests après chaque modification. |
| Diagnostiquer une défaillance ou recueillir des preuves sur le produit | [Débogage et diagnostics](platforms/sifli-sdk/debugging-diagnostics.md) | [Journalisation et analyse des plantages](firmware-topics/logging-crash-analysis.md). |
| Modifier l'organisation du démarrage, le stockage, les mises à jour, l'USB ou la consommation | [Sujets liés au firmware](firmware-topics/index.md) | Consultez le sujet pertinent (partitions, mises à jour, USB, énergie ou journalisation) avant de modifier le code. |

</div>

## Notes d'application SiFli-SDK { #sifli-sdk-application-notes }

Les notes d'application sont classées par tâche d'intégration plutôt que selon l'ordre du catalogue SDK. Commencez par le sous-système concerné. Avant de réutiliser une configuration ou une commande, vérifiez les familles de puces couvertes, la configuration de la carte, la version du SDK et les prérequis matériels.

<div align="center"><em>Tableau : Parcours des notes d'application SiFli-SDK</em></div>

<div align="center" markdown>

| Domaine d'ingénierie | Point de départ des notes d'application |
|:-----------------|:--------------------------------|
| Analogique et capteurs | [Échantillonnage avec le GPADC](platforms/sifli-sdk/application-notes/adc-sampling.md) · [Intégrer et lire des capteurs](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| Stockage et ressources graphiques | [Utiliser une mémoire Flash externe](platforms/sifli-sdk/application-notes/external-flash.md) · [Compresser les ressources graphiques avec EZIP](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| Fiabilité, énergie et débogage | [Configurer le watchdog](platforms/sifli-sdk/application-notes/watchdog.md) · [Configurer les modes basse consommation et mesurer le courant](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [Capturer les journaux et analyser les plantages](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| Validation RF et Bluetooth | [Exécuter les tests RF du SDK SiFli](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Exécuter les tests de signalisation Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Effectuer des tests RF individuels pour Bluetooth](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## Parcourir la section Développement { #navigate-the-develop-section }

<div align="center"><em>Tableau : Carte de la section Développement</em></div>

<div align="center" markdown>

| Domaine | Objectif |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Mettre en place le parcours de référence pris en charge : configuration, compilation, flashage, composants réutilisables et diagnostics. |
| [Notes d'application du SDK](platforms/sifli-sdk/sdk-application-notes.md) | Appliquer le SDK à une tâche ciblée : ADC, capteurs, Flash externe, basse consommation, diagnostics, RF ou tests Bluetooth. |
| [Exemples](examples/index.md) | Sélectionner et adapter une implémentation fonctionnelle pour la carte exacte et le sous-système produit le plus exigeant. |
| [Outils](tools/index.md) | Choisir les outils de téléchargement, de surveillance, de traçage, de diagnostic des plantages, de gestion des ressources et de production. |
| [Sujets liés au firmware](firmware-topics/index.md) | Prendre les décisions transversales concernant les partitions, l'OTA/DFU, l'USB, la gestion de l'énergie et les éléments de diagnostic. |
| [Expérimental / communauté](platforms/zephyr/overview.md) | Évaluer Zephyr, Arduino, MicroPython ou Rust dans le périmètre et selon le niveau de maturité indiqués sur chaque page. |

</div>

## Évaluer les parcours communautaires de manière réfléchie { #evaluate-community-paths-deliberately }

Le groupe [Expérimental / communauté](platforms/zephyr/overview.md) s'adresse aux équipes qui ont une raison précise de sortir du parcours SDK de référence. Cela n'implique pas un niveau de prise en charge équivalent pour la production.

<div align="center"><em>Tableau : Adéquation des parcours communautaires</em></div>

<div align="center" markdown>

| Parcours | À envisager quand | À considérer comme |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | Vous avez besoin des API Zephyr, de devicetree, de Kconfig ou d'un travail en aval sur une carte. | Un parcours d'évaluation en aval, propre à la carte. |
| [Arduino](platforms/arduino/overview.md) | Vous avez besoin de sketches ou d'un prototypage rapide de périphérique sur sa carte prise en charge. | Un parcours bêta, limité à la carte. |
| [MicroPython](platforms/micropython/status.md) | Vous évaluez la future prise en charge des scripts. | Une page de statut jusqu'à l'existence d'un portage public reproductible. |
| [Rust](platforms/rust/overview.md) | Vous pouvez évaluer le travail sur le HAL/PAC et proposer des correctifs au projet amont. | Un parcours communautaire encore en développement. |

</div>

Avant de retenir l'un de ces parcours pour un produit, validez sur la carte exacte chaque périphérique requis, l'organisation de la mémoire Flash, la méthode de débogage et la procédure de récupération. Conservez avec le code source du produit la révision testée, la configuration, les commandes et les résultats.

## Preuves de développement prêtes pour le produit { #product-ready-development-evidence }

Avant de considérer un parcours firmware comme prêt pour le produit, assurez-vous de pouvoir répondre à ces questions :

- Quel composant, quelle révision de carte ou de matériel personnalisé, et quelle configuration ont été testés ?
- Quel SDK, quel package, quelle branche ou quel commit a servi à produire le firmware ?
- Quelles commandes de compilation, de flashage, de surveillance et de récupération complète fonctionnent ?
- Quel exemple ou test valide le fonctionnement de chaque périphérique requis et de chaque sous-système du produit ?
- Quel agencement de partitions, quel comportement de mise à jour, quel objectif de consommation électrique et quelle procédure de décodage des rapports de plantage ont été validés ?

Si une réponse manque, le travail peut rester un prototype utile, mais il ne constitue pas encore une base de firmware reproductible pour un produit.
