---
icon: lucide/package
description: "SiFli-SDK, voie de référence du développement SF32 : build scons et menuconfig, noms de carte, structure de projet et préparation à la production."
tags:
    - Développement
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK est le SDK officiel de SiFli pour le développement du firmware SF32. Il propose un environnement de développement basé sur RT-Thread et, pour les cibles prises en charge, des exemples No-OS. Il comprend également la prise en charge des cartes et le middleware maintenus par SiFli pour le Bluetooth, le graphisme, l'audio, la gestion de l'énergie, le stockage et les flux de production. Les fonctionnalités disponibles dépendent de la puce, de la carte et de la version du SDK.

!!! info "SiFli-Solution"
    SiFli-Solution est une suite logicielle distincte de SiFli, hors du périmètre de cette page. Cette page et les ressources de développement associées documentent uniquement SiFli-SDK. Pour connaître le périmètre de SiFli-Solution, les appareils pris en charge et les conditions d'accès, consultez la [documentation officielle de SiFli Solution](https://docs.sifli.com/projects/solution/index.html) et contactez directement SiFli.

Suivez le [guide de démarrage SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) pour installer l'environnement et exécuter `hello_world` pour la première fois. Cette page explique comment travailler avec le SDK une fois la chaîne d'outils configurée et opérationnelle.

Références principales :

- [Guide d'installation de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [Liste des cartes SF32LB52x prises en charge par le SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## Quand choisir SiFli-SDK { #when-to-use-sifli-sdk }

Choisissez SiFli-SDK lorsque vous avez besoin de :

- Un parcours documenté, avec des cartes prises en charge et des exemples maintenus par SiFli pour la puce et la version du SDK visées.
- Des exemples et du middleware pour le Bluetooth, l'affichage, l'audio, l'énergie, le stockage, l'USB et l'OTA lorsque la cible et la version choisies les prennent en charge.
- L'intégration RT-Thread et les outils accessibles depuis le shell.
- Une configuration au niveau de la carte via les noms de carte du SDK tels que `sf32lb52-lcd_n16r8`.
- L'accès au middleware, aux outils, aux configurations de partitions et aux procédures de production spécifiques à SiFli.

## Modèle de développement { #development-model }

Le [guide de démarrage SiFli-SDK](../../../getting-started/sifli/getting-started-sifli-sdk.md) permet de préparer la chaîne d'outils et de valider un premier projet `hello_world`. Ensuite, consignez ensemble la révision du SDK, la carte choisie, le répertoire de l'exemple ou du projet, la configuration et les artefacts de compilation et de flashage correspondants dans un historique de compilation reproductible. Lorsque le nom de carte ne précise pas de cœur, le répertoire HCPU suit généralement le modèle `build_<board_name>_hcpu/` ; `sf32lb52-lcd_n16r8` génère par exemple `build_sf32lb52-lcd_n16r8_hcpu/`. Utilisez le répertoire réellement généré pour la cible carte/cœur résolue au lieu de reconstruire son nom manuellement.

Pour garantir la reproductibilité, fixez la branche SDK utilisée, consignez le nom de la carte, séparez vos modifications locales des fichiers fournis par SiFli et faites évoluer la configuration par petites étapes faciles à vérifier. Le cycle détaillé de compilation, de flashage et de surveillance est décrit dans [Compiler, flasher et surveiller la sortie série](build-flash-monitor.md).

## Noms de carte { #board-names }

Les noms de carte SiFli-SDK sont propres au SDK et peuvent différer des noms de carte Zephyr, des FQBN Arduino ou des noms commerciaux. Reprenez toujours le nom exact dans la liste des cartes prises en charge par le SDK ou dans la documentation de l'exemple.

Pour les cartes SF32LB52 DevKit LCD, un nom de carte SDK couramment utilisé dans les exemples de prise en main est :

```text
sf32lb52-lcd_n16r8
```

## Structure de projet { #project-structure }

La plupart des exemples SDK suivent le modèle :

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

Par exemple :

```text
example/get-started/hello_world/rtt/project
```

Pour développer le firmware du produit, partez de l'exemple SiFli-SDK fonctionnel le plus proche et ne modifiez qu'un sous-système à la fois. Vous préserverez ainsi la configuration de la carte, les dépendances du middleware, les hypothèses concernant les partitions et le paramétrage des pilotes.

## Configuration { #configuration }

Dans le projet d'exemple, utilisez la commande `menuconfig` du SDK pour modifier la configuration fonctionnelle d'une carte sélectionnée :

```bash
sdk.py menuconfig --board=<board_name>
```

Cas d'usage courants :

- Activer ou désactiver du middleware.
- Modifier les rôles ou profils Bluetooth.
- Ajuster la prise en charge de l'affichage, du système de fichiers ou de l'audio.
- Ajuster la gestion de l'énergie.
- Sélectionner les options de journalisation ou de shell.

## Questions de préparation à la production { #production-readiness-questions }

Avant de retenir SiFli-SDK pour une branche produit, répondez aux questions suivantes :

- Quelle branche de version du SDK sera figée pour le produit ?
- Quels fichiers de prise en charge des cartes sont maintenus par l'équipe produit et lesquels sont fournis par SiFli ?
- Quels exemples prouvent les fonctionnalités critiques ?
- Quelle table de partitions est utilisée pour la fabrication et l'OTA ?
- Quels outils sont approuvés pour le flashage en usine ?
- Quels journaux sont activés dans les compilations de release ?
- Quelle image de récupération est conservée pour un usage en laboratoire ?

## Pages pratiques suivantes { #practical-next-pages }

- [Compiler, flasher et surveiller la sortie série](build-flash-monitor.md)
- [Configuration de la carte](board-configuration.md)
- [Composants et `sf-pkg`](components.md)
- [Exemples](../../examples/index.md) — choisissez l'exemple fonctionnel le plus proche comme base avant d'adapter un sous-système.
- [CodeKit](../../tools/codekit.md) — utilisez le flux de travail VS Code lorsque cela est utile, en veillant à la cohérence du nom de carte du SDK et des informations de compilation consignées dans le projet.
- [Notes d'application du SDK](sdk-application-notes.md)
- [Tables de partitions](../../firmware-topics/partition-tables.md)
- [Débogage et diagnostics](debugging-diagnostics.md)
