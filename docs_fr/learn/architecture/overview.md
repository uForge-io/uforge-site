---
icon: lucide/network
title: "Vue d'ensemble de l'architecture"
description: "Choix d’architecture SF32 : processeurs, mémoire, Bluetooth et déport matériel, avec vérification des fonctions propres à chaque composant."
tags:
    - Architecture
    - Apprentissage
---

# Architecture en bref { #architecture-overview }

La configuration du processeur, de la mémoire et des blocs matériels dédiés varie selon les dispositifs SF32. En fonction des blocs intégrés au composant choisi, certaines tâches soumises à des contraintes temporelles ou devant rester actives en permanence peuvent être confiées à un sous-système dédié. Lorsqu’un accélérateur approprié est présent, il peut aussi exécuter certaines tâches prises en charge, comme le traitement graphique. Cette section aborde l’architecture à travers cinq décisions d’ingénierie : où exécuter le code applicatif ; où placer le code et les tampons ; quelles tâches confier au contrôleur sans fil ; dans quels cas utiliser un moteur de tâches dédié ; et si le composant choisi offre bien les blocs architecturaux et les interfaces nécessaires.

## Commencer par la charge de travail { #start-with-the-workload }

<div align="center"><em>Tableau : Articles à consulter selon la décision à prendre</em></div>

<div align="center" markdown>

| Question à résoudre… | Article à consulter | Ce qu'il explique |
|:----------------------|:-----------|:-----------------|
| Comment le firmware applicatif s'exécute et interagit avec le système mémoire | [STAR-MC1](star-mc1.md) | Le modèle de processeur applicatif compatible Cortex-M33, le comportement du cache et les caractéristiques de charge de travail sur les dispositifs SF32 concernés. |
| Où placer le code, les ressources et les tampons volumineux ou sensibles à la latence | [Comparer la PSRAM aux autres types de mémoire pour systèmes embarqués](psram-and-memory-types.md) | Compare PSRAM, SRAM, DRAM, RRAM et MRAM selon leur capacité, leur latence, la persistance des données, la bande passante et la consommation énergétique. |
| Quelles tâches Bluetooth relèvent du contrôleur et lesquelles du firmware du produit | [Processeur Bluetooth](../bluetooth/processor.md) | Précise la répartition entre temporisation du contrôleur, responsabilités de l'hôte et de l'application, contraintes RF et fonctionnement basse consommation. |
| Si une séquence personnalisée d'opérations sur les périphériques nécessite un moteur programmable | [PTM (Parallel Task Machine)](ptm-parallel-task-machine.md) | Le guide de conception matérielle du SF32LB57x documente un bloc PTM de 16 canaux, destiné aux tâches compactes soumises à de fortes contraintes temporelles, difficiles à réaliser avec des périphériques à fonction fixe. |
| Si le composant choisi offre bien l'architecture et les interfaces nécessaires | [Famille SF32](../../sf32-products/family/SF32_family.md) | Le choix dépend de l'ensemble du composant : mémoire, interfaces, fonctions sans fil et accélérateurs disponibles. |

</div>

## Repères pratiques pour la conception { #practical-decision-rule }

Procédez dans l'ordre suivant :

1. Laissez la logique produit, le comportement de l'interface, les décisions applicatives et les pilotes courants au firmware applicatif. Évaluez le processeur et le cache en fonction du composant et de la charge de travail choisis ; ne vous fiez pas à des résultats de benchmark génériques. L'article sur STAR-MC1 apporte des éléments pour cette évaluation.
2. Décidez dès le début où placer le code et les données. Placez ceux qui exigent une faible latence dans les niveaux adaptés de la hiérarchie mémoire. Avant de définir une charge de travail d'interface, audio, IA ou connectivité, dimensionnez également la mémoire externe, la bande passante de l'interface et le budget énergétique.
3. Distinguez les contraintes de temporisation du contrôleur Bluetooth des décisions propres au produit. L'article consacré au processeur Bluetooth aide à séparer les responsabilités du contrôleur, de l'hôte et de l'application, ainsi que les aspects RF et basse consommation à prendre en compte ensemble.
4. Avant de développer une tâche périphérique personnalisée, vérifiez si un temporisateur, un chemin DMA, UART, SPI, I2C, l'audio, l'affichage ou une fonction Bluetooth existante répond déjà au besoin. Sur SF32LB57x, envisagez PTM uniquement si la tâche exige une temporisation stricte ou ne peut pas être mise en œuvre correctement avec ces fonctions standard.

Avant de supposer qu'un bloc architectural est présent ou programmable par l'utilisateur, vérifiez les capacités documentées du composant choisi. Le guide de conception matérielle du SF32LB57x documente un bloc PTM de 16 canaux. Avant de baser une conception sur PTM, vérifiez sa disponibilité dans la documentation du composant visé.
