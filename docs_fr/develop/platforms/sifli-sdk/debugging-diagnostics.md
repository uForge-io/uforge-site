---
icon: lucide/bug
description: "Diagnostiquer le firmware SF32 avec sftool, AssertDump, SiFli_Trace et le shell RT-Thread, selon une séquence reproductible et une liste des éléments à fournir pour signaler un plantage."
tags:
    - Développement
    - Débogage
---

# Débogage et diagnostics { #debugging-and-diagnostics }

Commencez le débogage SF32 par les journaux série. Selon la puce, la version du SDK et la configuration du projet, des outils de vidage de plantage, de capture de trace et un shell RT-Thread peuvent également être disponibles ; utilisez uniquement les procédures documentées pour la cible.

## Premières étapes de débogage { #first-line-debugging }

Utilisez la console série pour collecter :

- Les journaux de démarrage.
- Les messages de l'application.
- La sortie du shell RT-Thread, s'il est activé dans le projet.
- Les messages d'erreur.
- Le comportement lors du téléchargement et de la réinitialisation.

Conservez les journaux avec la révision de la carte, la branche SDK, les commandes de compilation et de flashage, ainsi que les paramètres série.

## Ordre de débogage { #debugging-order }

1. Reproduisez le problème avec le même firmware.
2. Vérifiez s'il réapparaît après une réinitialisation.
3. Vérifiez s'il réapparaît après un nouveau flashage du firmware complet.
4. Vérifiez s'il se reproduit avec l'exemple SDK le plus proche.
5. Réintroduisez les modifications propres au produit une par une.

Cette démarche évite de confondre les problèmes matériels, ceux de la prise en charge de la carte, du middleware et de l'application.

## Outils à connaître { #tools-to-know }

<div align="center"><em>Tableau : Outils à connaître</em></div>

<div align="center" markdown>

| Outil | Usage |
|:-----|:----|
| `sftool` | Outil CLI série pour lire, écrire ou effacer la Flash et réinitialiser les puces prises en charge ; les options dépendent de la puce et du stockage. |
| `SiFli_Trace` | Capturer et consulter les journaux de la carte selon la procédure prise en charge par la cible. |
| `UsartServer` | Outil compagnon requis pour le débogage par UART via le Debug IP intégré, selon la procédure documentée pour SF32LB52X et SF32LB56X ; ne généralisez pas cette exigence aux autres cibles. |
| `AssertDump` et outils de vidage | À utiliser uniquement s'ils sont fournis pour la puce et la version du SDK ; suivez la procédure de capture et d'analyse correspondante. |
| Shell RT-Thread | Inspection à l'exécution et commandes uniquement si la configuration du projet active le shell. |

</div>

## Ce qu'il faut inspecter en premier { #what-to-inspect-first }

<div align="center"><em>Tableau : Ce qu'il faut inspecter en premier</em></div>

<div align="center" markdown>

| Symptôme | Premières vérifications |
|:--------|:-------------|
| HardFault ou assertion | Taille de pile, pointeurs nuls, tampons DMA et maintenance du cache. |
| Périphérique qui ne répond pas | Multiplexage de broches, horloge, rail d'alimentation, nom de carte, activation du pilote. |
| Bluetooth instable | Horloge RF, chemin d'antenne, configuration de la pile Bluetooth, paramètres de connexion. |
| Artefacts d'affichage | Temporisation de la dalle, format du tampon, synchronisation cache/DMA. |
| Réinitialisation aléatoire | Watchdog, rail d'alimentation, chute de tension (brownout), débordement de pile. |

</div>

## Liste de contrôle du rapport de plantage { #crash-report-checklist }

Lors du signalement d'un plantage, incluez :

- La carte et sa révision.
- La variante de puce.
- La branche ou le commit du SDK.
- L'exemple ou le projet exact.
- La commande de compilation et le nom de la carte.
- La commande de flashage.
- Le journal série de démarrage à partir de la réinitialisation.
- Le vidage de plantage ou la sortie d'assertion.
- Si le problème se reproduit sur un exemple SDK non modifié.
