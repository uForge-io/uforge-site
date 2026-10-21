---
icon: lucide/file-warning
description: "Concevoir la journalisation et l'analyse des plantages du firmware SF32 pour diagnostiquer les défaillances terrain : données minimales, démarche et niveaux de log par phase."
tags:
    - Développement
    - Journalisation
    - Analyse des plantages
---

# Journalisation et analyse des plantages { #logging-and-crash-analysis }

Les journaux font partie du produit ; ils ne sont pas un simple outil de débogage temporaire. Une journalisation bien conçue réduit le temps nécessaire à la mise en service des cartes, au diagnostic sur le terrain et aux investigations en usine.

Prévoyez la journalisation avant le premier essai sur le terrain. En cas de défaillance, vous ne pourrez récupérer que les données que le firmware avait été configuré pour enregistrer ou émettre.

## Configuration de journalisation minimale { #minimum-logging-setup }

Pour chaque compilation du firmware, consignez les éléments suivants :

- La version du firmware.
- La branche ou le commit du SDK.
- Le nom et la révision de la carte.
- La cause du démarrage.
- La version de la disposition des partitions.
- Les résultats d'initialisation des sous-systèmes principaux.
- Les messages de plantage ou d'assertion en cas d'échec du démarrage.

## Flux d'analyse des plantages { #crash-analysis-flow }

1. Reproduisez le problème sur une carte dont la configuration de référence a été validée en fonctionnement.
2. Capturez le journal complet depuis la réinitialisation.
3. Conservez le binaire exact et les fichiers de symboles correspondants.
4. Décodez les assertions ou les vidages à l'aide des outils SiFli.
5. Vérifiez la taille des piles d'exécution, déterminez qui est responsable de chaque zone mémoire, examinez les tampons DMA et les opérations de maintenance du cache.
6. Isolez le problème à partir de l'exemple du SDK qui s'en rapproche le plus.

## Niveaux de journalisation { #log-levels }

<div align="center"><em>Tableau : Niveaux de journalisation</em></div>

<div align="center" markdown>

| Phase | Journalisation suggérée |
|:------|:------------------|
| Mise en service initiale de la carte | Journaux détaillés des périphériques et du démarrage. |
| Développement de fonctionnalités | Journaux de débogage au niveau du module autour de la fonctionnalité testée. |
| Optimisation de la consommation | Journalisation minimale, car la journalisation modifie elle-même le comportement énergétique. |
| Version candidate | Avertissements, erreurs, version, cause du démarrage et vérifications d'état essentielles. |
| Compilation de diagnostic sur le terrain | Journaux ciblés sur le sous-système suspecté. |

</div>

## Éléments d'un bon rapport de plantage { #what-makes-a-good-crash-report }

- Il inclut le journal complet, de la réinitialisation jusqu'au plantage.
- Il identifie précisément le binaire utilisé.
- Il inclut les fichiers de symboles ou une compilation reproductible.
- Il indique si le plantage se produit sur un exemple du SDK non modifié.
- Il liste les périphériques connectés et la source d'alimentation.
- Il indique si le plantage persiste après l'effacement complet de la mémoire Flash et un nouveau flashage.
