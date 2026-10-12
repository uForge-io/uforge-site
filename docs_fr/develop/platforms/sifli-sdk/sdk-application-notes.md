---
icon: lucide/notebook-tabs
title: "Notes d'application du SDK"
description: "Un parcours de lecture par tâche, avec des liens vers les sources, pour les guides d'utilisation de SiFli-SDK destinés au développement SF32."
tags:
    - Développement
    - SiFli-SDK
    - Notes d'application
---

# Notes d'application du SDK { #sdk-application-notes }

Cette page organise les guides d'utilisation de SiFli-SDK par tâche d'ingénierie. Vous pouvez ainsi trouver rapidement la procédure pertinente et savoir quels enregistrements de validation conserver pour le produit.

Ces articles fournissent des conseils pratiques d'intégration, mais ne remplacent pas le manuel du SDK. Avant d'appliquer une configuration, une API, un exemple ou une procédure de test, sélectionnez d'abord la famille de puces cible et la version du SDK dans le [guide d'utilisation officiel de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html).

## Lire par tâche { #read-by-task }

<div align="center"><em>Tableau : parcours de lecture des notes d'application du SDK</em></div>

<div align="center" markdown>

| Tâche | Consultez cet article pour | Sujet du guide officiel |
|:-----|:----------------------------|:--------------------------|
| [Échantillonnage avec le GPADC](application-notes/adc-sampling.md) | Mettre en place un chemin de mesure ADC à usage général. | Guide d'utilisation de l'ADC (GPADC) |
| [Intégrer et lire des capteurs](application-notes/sensor-integration.md) | Connecter et valider un capteur externe. | Guide d'ajout de capteurs |
| [Utiliser une mémoire Flash externe](application-notes/external-flash.md) | Stocker des données, des ressources ou un système de fichiers en Flash. | Guide d'utilisation de la Flash |
| [Configurer le watchdog](application-notes/watchdog.md) | Valider une procédure de récupération déclenchée par le watchdog. | Guide d'utilisation du watchdog |
| [Compresser les ressources graphiques avec EZIP](application-notes/ezip-image-assets.md) | Convertir et intégrer des ressources d'image EZIP. | Utilisation de l'outil de conversion d'images EZIP |
| [Configurer les modes basse consommation et mesurer le courant](application-notes/low-power-measurement.md) | Configurer un mode basse consommation et comparer les mesures. | Guide de développement basse consommation |
| [Capturer les journaux et analyser les plantages](application-notes/crash-analysis.md) | Conserver les journaux correspondants, le contexte du plantage et les fichiers de symboles. | Guide d'analyse des plantages ; débogage et journalisation |
| [Exécuter les tests RF du SDK SiFli](application-notes/rf-performance-tests.md) | Choisir entre les essais RF avec signalisation, sans signalisation ou par élément individuel. | Guide de test RF SiFli SDK |
| [Exécuter les tests de signalisation Bluetooth](application-notes/bluetooth-signalling-tests.md) | Effectuer une validation Bluetooth basée sur le protocole. | Guide de test de signalisation Bluetooth |
| [Effectuer des tests RF individuels pour Bluetooth](application-notes/bluetooth-single-tone-tests.md) | Suivre la procédure de test RF Bluetooth individuel pour l'élément sélectionné. | Guide de test RF individuel Bluetooth |

</div>

## Comment utiliser ces articles { #how-to-use-these-articles }

1. Commencez par la page qui correspond à votre tâche d'ingénierie immédiate.
2. Avant d'adapter un exemple ou une commande, vérifiez que les prérequis indiqués pour le projet, la carte, la version du SDK, la configuration et le matériel sont réunis.
3. Reportez-vous à la source SDK liée pour les chemins, symboles de configuration, commandes, API et versions d'outils exacts.
4. Consignez comme éléments de preuve la carte validée, la version du SDK, les fichiers de configuration, le matériel d'essai et les résultats observés.

Pour les décisions d'architecture communes à plusieurs plateformes, consultez [Sujets liés au firmware](../../firmware-topics/index.md). Pour les configurations de référence prises en charge dans les parcours SDK et communautaires, consultez [Exemples](../../examples/index.md).
