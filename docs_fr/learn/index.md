---
icon: lucide/lightbulb
title: "Aperçu de la section Apprendre"
description: "Consultez les ressources sur l’architecture et les sous-systèmes SF32 : graphismes, Bluetooth, IA, audio, basse consommation et architecture de processeur sous-jacente."
tags:
    - Apprentissage
---

# Aperçu de la section Apprendre { #learn-overview }

La section **Apprendre** vous aide à prendre des décisions d’architecture et de sous-système tant qu’elles restent faciles à ajuster dans le firmware ou le matériel. Ses articles expliquent comment les blocs SF32 s’articulent et dans quels cas un CPU généraliste peut confier certaines tâches à un moteur graphique, à un contrôleur sans fil, à un accélérateur IA ou à un autre matériel spécialisé. Ils indiquent aussi ce qu’il faut valider lorsque les graphismes, les communications sans fil, l’audio, l’IA, la mémoire et la consommation doivent cohabiter dans un même produit.

Pour réussir le premier démarrage d’une carte, consultez [Bien démarrer](../getting-started/index.md) ; pour des exercices guidés, les [tutoriels](../getting-started/tutorials/overview.md) ; pour les flux de travail de développement logiciel et les exemples associés, la rubrique [Développement](../develop/index.md) ; pour choisir un composant et concevoir un produit destiné à la production, la [famille SF32](../sf32-products/family/SF32_family.md).

## Commencer par votre question de conception { #start-with-your-design-question }

<div align="center"><em>Tableau : Choisir un parcours d’apprentissage adapté</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Si vous devez… | Commencez ici | Puis explorez |
|:----------------|:-----------|:-------------|
| Comprendre l’architecture du processeur et de la mémoire, ainsi que le transfert de tâches vers du matériel spécialisé | [Architecture en bref](architecture/overview.md) | Consultez [STAR-MC1](architecture/star-mc1.md), [Comparer la PSRAM aux autres types de mémoire pour systèmes embarqués](architecture/psram-and-memory-types.md) et [PTM](architecture/ptm-parallel-task-machine.md) selon le composant choisi. |
| Créer une interface d’affichage ou définir la stratégie des ressources graphiques et du framebuffer | [Vue d’ensemble des graphismes](graphics/overview.md) | Consultez le [contrôleur d’affichage](graphics/display-controller.md), [ePicasso](graphics/epicasso-gpu.md), [eZip](graphics/ezip.md) et [TurboPixel](graphics/turbopixel.md) pour les choix liés à l’affichage, au rendu et à la compression. |
| Connecter un téléphone, un accessoire ou un dispositif audio | [Vue d’ensemble Bluetooth](bluetooth/overview.md) | [Processeur Bluetooth](bluetooth/processor.md) pour comprendre la séparation entre contrôleur et application, puis [Bluetooth PAN](bluetooth/pan.md) lorsque le produit a besoin d’un accès IP via le téléphone. |
| Ajouter de l’inférence sur l’appareil | [Vue d’ensemble de l’IA](ai/overview.md) | Consultez l’[accélérateur IA](ai/accelerator.md), puis les vérifications de mémoire, de latence et de consommation requises par le modèle et le pipeline. |
| Enregistrer, lire ou traiter du son | [Vue d’ensemble de l’audio](audio/overview.md) | Consultez [Audio Server et mise en tampon](audio/audio-server-buffering.md). Si le produit diffuse de l’audio ou gère des appels par Bluetooth, consultez aussi les ressources Bluetooth. |
| Atteindre l’autonomie visée | [Vue d’ensemble de la conception basse consommation](low-power/overview.md) | Consultez [Mesurer et valider la consommation énergétique](low-power/measurement-and-validation.md), puis les pages Bluetooth, graphismes, audio et IA pour connaître la consommation de chaque sous-système. |

</div>

## Utiliser les pages ensemble { #use-the-pages-together }

La plupart des produits associent plusieurs sous-systèmes. Pour un wearable doté d’un écran, du BLE et d’un microphone, dont la batterie impose un budget énergétique limité, ces fonctions ne peuvent pas être considérées séparément : le rafraîchissement de l’écran influe sur le trafic mémoire et la durée d’activité ; la planification Bluetooth, sur la fréquence de réveil ; l’audio et l’IA, sur les tampons et la latence. Chaque choix modifie le budget énergétique global.

Utilisez ces pages tout au long du cycle de conception :

1. Partez de l’exigence principale du produit et du dispositif choisi. Confirmez que les capacités d’affichage, Bluetooth, IA, audio, mémoire et basse consommation requises sont réellement documentées pour ce dispositif.
2. Définissez les responsabilités des processeurs et l’affectation de la mémoire avant d’intégrer l’application. Prévoyez où placer l’ensemble de travail, les framebuffers, le modèle et les tampons audio ; placez le code et les données nécessaires aux tâches sensibles à la latence dans une mémoire à faible latence adaptée ; et ne faites appel au matériel spécialisé que si ses capacités et ses contraintes d’intégration conviennent au produit.
3. Depuis la vue d’ensemble du sous-système principal, passez à la page consacrée à son implémentation. Considérez les renvois vers le Bluetooth, la mémoire et la basse consommation comme des dépendances de conception, et non comme de simples lectures complémentaires.
4. Validez l’ensemble sur le matériel prévu. Suivez les flux de travail de la rubrique [Développement](../develop/index.md) et les méthodes de mesure présentées dans les pages pertinentes pour vérifier conjointement le fonctionnement, la latence, la bande passante, le comportement RF et la consommation.

!!! note "Contenu généré automatiquement"
    Cette page a été compilée et rédigée sans document source existant dédié à son contenu. Vérifiez les affirmations techniques dans la documentation officielle de SiFli avant de vous y fier.
