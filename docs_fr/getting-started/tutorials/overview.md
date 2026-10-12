---
icon: lucide/map
description: "Une feuille de route pratique de tutoriels SF32 organisée par résultat d'ingénierie : premiers périphériques, sous-systèmes connectés et validation produit."
tags:
    - Tutoriels
---

# Vue d'ensemble des tutoriels { #tutorials-overview }

Cette série vous aide à passer d'un premier flash réussi à des compétences pratiques de développement sur SF32. La progression suit les étapes du travail d'ingénierie : vérifier d'abord un périphérique, combiner ensuite des sous-systèmes, puis réunir les éléments de validation nécessaires au produit. Les tutoriels partent d'exemples SiFli-SDK, mais les bonnes pratiques — vérifier le matériel, conserver une configuration de référence validée et mesurer les résultats — s'appliquent quel que soit le parcours logiciel SF32.

Les tutoriels constituent la deuxième étape de la [prise en main](../index.md). Validez d'abord les critères de réussite de la première mise en route. Si vous choisissez une puce, un module ou une carte de développement, consultez la [famille SF32](../../sf32-products/family/SF32_family.md) avant de commencer.

## Ce dont vous avez besoin { #what-you-need }

Utilisez une carte de développement SF32 avec une connexion de données USB fonctionnelle et une console série. Par exemple, `sf32lb52-lcd_n16r8` est le nom de carte SiFli-SDK de la SF32LB52-DevKit-LCD_N16R8. Cette série ne suppose pas qu'une seule carte prenne en charge tous les exercices : consultez la liste des plateformes prises en charge par chaque exemple et vérifiez les broches, périphériques, fonctions d'affichage et audio ainsi que le stockage à l'aide du schéma et des fichiers de carte concernés. La liste officielle des [cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) fournit les identifiants de cartes SDK pour SF32LB52x.

<div align="center"><em>Tableau : prérequis des tutoriels</em></div>

<div align="center" markdown>

| Élément | Vérification minimale avant de commencer |
|:-----|:------------------------|
| Chaîne d'outils | SiFli-SDK peut compiler un exemple déjà validé pour votre carte. |
| Flux de flashage | Vous pouvez programmer la carte de manière répétée sans changer la configuration. |
| Console série | Vous pouvez voir les journaux de démarrage et accéder à l'invite FinSH `msh>`. |
| Informations sur la carte | Vous disposez du schéma de carte ou des fichiers de support avant d'assigner des broches ou des périphériques. |
| Outils de mesure | Utilisez un multimètre ou un analyseur logique si nécessaire ; utilisez un montage de mesure du courant pour les travaux sur la basse consommation. |

</div>

## Parcours d'apprentissage recommandé { #recommended-learning-path }

<div align="center"><em>Tableau : feuille de route des tutoriels</em></div>

<div align="center" markdown>

| Objectif | Commencer quand | Contenu | Passer à la suite quand |
|:------|:-----------|:------------------|:--------------|
| [Premiers pas avec les périphériques](beginner.md) | `hello_world` se compile et se flashe, et la sortie série fonctionne. | GPIO, FinSH, ADC, PWM, RTC et un petit projet au niveau de la carte. | Passez à la suite lorsque vous savez vérifier de façon autonome une entrée, une sortie et un périphérique de base. |
| [Intégration de sous-systèmes](intermediate.md) | Chaque périphérique fonctionne de manière fiable lorsqu'il est utilisé seul. | Capteurs I2C, LVGL, BLE, audio, stockage et tests ciblés de coexistence. | Passez à la suite lorsque deux sous-systèmes fonctionnent ensemble de façon stable. |
| [Validation produit](advanced.md) | Vous pouvez intégrer du middleware et diagnostiquer les problèmes courants. | Consommation électrique mesurée, récupération OTA, affichages personnalisés, analyse des plantages, BLE à connexions multiples et pilotes réutilisables. | Utilisez les articles pertinents des sections Développement et Apprentissage comme références continues pour l'implémentation. |

</div>

Cet ordre est volontaire. Ne commencez pas par l'affichage, un service BLE ou un pilote personnalisé avant d'avoir validé la carte, la procédure de flashage, la console série et un test GPIO simple. Si un tutoriel ultérieur échoue, revenez à la dernière étape dont vous pouvez encore reproduire le critère de réussite.

## Comment utiliser chaque tutoriel { #how-to-use-each-tutorial }

Chaque exercice indique un exemple SDK adapté, un objectif, un critère de réussite et les vérifications à effectuer en cas d'échec. Partez de l'exemple indiqué plutôt que d'un projet vide, ne changez qu'un comportement à la fois et conservez une compilation de référence fonctionnelle avant de combiner des fonctions. Pour toute configuration destinée à être réutilisée, notez la révision de la carte, la version du SDK, le nom de la carte et le résultat observé.

Les tutoriels ne remplacent pas la documentation de référence :

- Utilisez [Développement](../../develop/index.md) pour les flux de travail de la plateforme, les outils, les sujets liés au firmware et l'index consolidé des exemples du SDK.
- Utilisez [Apprentissage](../../learn/graphics/overview.md) pour les décisions d'architecture et de sous-système, comme la chaîne de traitement graphique, le comportement Bluetooth et la stratégie énergétique.
- Utilisez la [Famille SF32](../../sf32-products/family/SF32_family.md) pour la sélection du composant, les informations sur les cartes, les conseils de conception matérielle et les vérifications de production.
