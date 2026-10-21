---
icon: lucide/app-window
description: "Comment l'extension VS Code SiFli CodeKit s'intègre au développement SiFli-SDK : configuration du projet, flux de compilation/flashage/surveillance et dépannage."
tags:
    - Développement
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit est l'extension VS Code dédiée au développement SiFli-SDK. Elle guide l'installation du SDK, la création et la configuration de projets, la compilation, le flashage et la surveillance.

Utilisez [Bien démarrer avec CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) pour la première exécution. Cette page explique la place de CodeKit dans le flux de développement.

Référence principale :

- [Prise en main de SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/)

## Meilleurs cas d'usage { #best-use-cases }

Utilisez CodeKit lorsque vous souhaitez :

- Un flux de travail SDK centré sur VS Code.
- Une configuration de projet guidée.
- La configuration de la carte et du projet depuis l'éditeur.
- Des actions de compilation, de flashage et de surveillance sans avoir à mémoriser chaque commande.
- Un parcours plus fluide pour les développeurs découvrant SiFli-SDK.

Utilisez le flux SDK en ligne de commande pour écrire des scripts CI, diagnostiquer des problèmes de chemin d'accès à la chaîne d'outils ou préparer des procédures de production et de publication. CodeKit facilite le travail des développeurs, mais ne dispense pas de comprendre le processus de compilation du SDK.

## Relation avec SiFli-SDK { #relationship-to-sifli-sdk }

CodeKit fournit une interface pour le flux de travail du SDK, sans remplacer le SDK. Les mêmes notions sous-jacentes restent importantes :

- La racine du SDK.
- Le nom de la carte.
- Le répertoire du projet.
- Le répertoire de sortie de compilation.
- Le chemin de flashage/téléchargement.
- Le moniteur série.

Si une action CodeKit échoue, reproduisez la commande SDK sous-jacente si possible. Cela clarifie les rapports de bug et aide à distinguer les problèmes d'extension des problèmes de SDK.

Utilisez [SiFli-SDK](../platforms/sifli-sdk/overview.md) pour choisir la configuration de référence prise en charge et [Compiler, flasher et surveiller la sortie série](../platforms/sifli-sdk/build-flash-monitor.md) pour documenter les opérations équivalentes en ligne de commande. Partez d'un [exemple SDK](../examples/index.md) correspondant avant d'adapter un projet CodeKit.

## Modèle opérationnel { #operational-model }

CodeKit est le plus utile lorsque ses actions dans l'éditeur restent reproductibles à partir du SDK sous-jacent. Considérez l'extension comme l'interface de contrôle et SiFli-SDK comme la référence faisant autorité pour la chaîne d'outils, la définition de carte, le répertoire de sortie de compilation et les artefacts de téléchargement.

La page [Bien démarrer avec CodeKit](../../getting-started/sifli/getting-started-sifli-codekit.md) explique l'installation de l'extension et l'exécution de `hello_world`. Une fois cette configuration de référence opérationnelle, utilisez CodeKit pour raccourcir le cycle édition-compilation-flashage-surveillance. Utilisez la ligne de commande du SDK pour automatiser, examiner ou reproduire une action en dehors de VS Code.

## Ce qu'il faut consigner { #what-to-record }

Pour chaque projet CodeKit, consignez :

- La version de l'extension CodeKit.
- Le chemin SiFli-SDK et la branche du SDK.
- La carte sélectionnée dans CodeKit.
- Le nom de carte SDK équivalent.
- Le répertoire de sortie de compilation.
- Le comportement de flashage/téléchargement.
- Le débit en bauds du moniteur série.

Cela permet de reproduire une action de l'interface graphique depuis la ligne de commande en cas de besoin.

## Diagnostic des problèmes { #failure-boundaries }

<div align="center"><em>Tableau : stratégie de dépannage</em></div>

<div align="center" markdown>

| Défaillance | Prochaine étape |
|:--------|:---------------|
| SDK introuvable | Resélectionnez la racine du SDK et confirmez que l'installation du SDK est terminée. |
| Échec de la compilation | Reproduisez le même projet avec `scons` si possible. |
| Le flashage échoue alors que la configuration de référence fonctionne | Comparez la carte sélectionnée et le répertoire de sortie du projet à ceux de la configuration de référence fonctionnelle, puis vérifiez que le port est libre et le mode de téléchargement. |
| Le moniteur affiche des caractères illisibles | Confirmez le débit et le port sélectionnés. |
| Commande d'interface manquante | Utilisez la palette de commandes et recherchez `SiFli`. |

</div>
