---
icon: lucide/wrench
description: "Carte des outils pour le développement SF32 : sftool, scripts de téléchargement UART du SDK, actions CodeKit, outils de plantage/trace et outillage de ressources/production selon le cas d'usage."
tags:
    - Développement
    - Outils
---

# Outils { #tools }

Le développement SF32 ne se limite pas à la compilation. Un flux firmware pratique s'appuie aussi sur des outils de flashage, de surveillance série, d'analyse des plantages, de capture de traces, de conversion d'images, de réglage RF/audio et de programmation en usine.

Le tableau ci-dessous associe les tâches courantes aux outils correspondants. Il complète les manuels sans les remplacer ; consultez la documentation liée pour l'installation, les commandes exactes et les procédures propres à chaque outil.

## Carte des outils { #tool-map }

<div align="center"><em>Tableau : carte des outils</em></div>

<div align="center" markdown>

| Outil | Usage |
|:-----|:----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | Outil multiplateforme pour télécharger et flasher le firmware SF32, utilisé dans les flux OpenSiFli avec Zephyr et Arduino. |
| [Scripts de téléchargement UART du SDK](../platforms/sifli-sdk/build-flash-monitor.md) | Scripts de flashage de première exécution générés par les compilations SiFli-SDK. |
| [Actions CodeKit](codekit.md) | Actions VS Code de configuration, compilation, flashage et surveillance. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | Capture des données mémoire lors d'un plantage pour analyse ultérieure. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | Capture de traces et de journaux, et débogage via UART au moyen du Debug IP de la puce. |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | Programmation du firmware, calibration et tests PCBA en production. |
| [eZip / outillage d'images](../../learn/graphics/ezip.md) | Conversion de ressources pour les pipelines graphiques compressés. |
| [Outils RF, audio et de production](https://docs.sifli.com/projects/solution/6.tools/index.html) | Flux de calibration, de test et de réglage en production. |

</div>

## Outils de flashage { #flashing-tools }

Utilisez les scripts UART générés par le SDK pour la première mise en service, car ils sont produits par la compilation que vous venez d'effectuer. Ajoutez `sftool` lorsque vous avez besoin de :

- Un outil de flashage en ligne de commande cohérent entre les flux de travail.
- L'intégration `west flash` de Zephyr.
- Le comportement de téléversement d'ArduinoCore-zephyr.
- L'automatisation en CI, en usine ou pour les tests de régression.

Consignez les deux méthodes dans la documentation du projet jusqu'à ce que l'équipe en adopte une comme référence.

## Outils de journalisation et de trace { #logging-and-trace-tools }

Pour un développement normal, un terminal série suffit. Pour les défaillances difficiles, capturez des journaux structurés et des données de plantage :

- Enregistrez un journal de démarrage complet depuis la réinitialisation.
- Enregistrez les fichiers ELF/map/symboles exacts correspondant à l'image flashée.
- Notez si le shell RT-Thread, le shell Zephyr ou le mode débogage Arduino était actif.
- Lorsqu'ils sont disponibles, utilisez les outils de diagnostic SiFli pour analyser les dumps d'assertion et capturer des traces.

## Outils de ressources et de production { #asset-and-production-tools }

Les produits qui font largement appel à l'affichage graphique devraient documenter le processus de conversion des ressources, notamment lorsqu'ils utilisent la compression eZip ou l'accélération graphique matérielle. Pour les produits en production, documentez séparément les outils RF, audio et de production des outils de flashage réservés aux développeurs, afin que les opérateurs d'usine ne dépendent pas de commandes réservées au développement.

## Liste de contrôle pour le choix des outils { #tool-selection-checklist }

<div align="center"><em>Tableau : liste de contrôle pour le choix des outils</em></div>

<div align="center" markdown>

| Besoin | Outil recommandé |
|:-----|:------------------|
| Premier flashage SDK | Script de téléchargement UART du SDK. |
| Flashage scripté multiplateforme | `sftool`. |
| Compilation et surveillance VS Code | CodeKit. |
| Plantage après démarrage | Journal série et outil d'analyse des dumps d'assertion. |
| Capture de trace longue durée | Outils serveur de capture de trace/UART. |
| Pipeline de ressources d'affichage | Outillage eZip/image. |
| Programmation en usine | Outils de production SiFli et procédures figées. |

</div>

## Conseils pratiques { #practical-advice }

- Maîtrisez une première voie de flashage fiable avant d'en ajouter une deuxième.
- Enregistrez des journaux série connus comme bons pour chaque carte.
- Utilisez les scripts générés par le SDK pour la première mise en service.
- Utilisez `sftool` lorsque vous avez besoin d'un flashage en ligne de commande reproductible entre Zephyr, Arduino ou l'automatisation.
- Ajoutez l'outillage d'analyse des plantages avant le premier bug difficile à reproduire.
