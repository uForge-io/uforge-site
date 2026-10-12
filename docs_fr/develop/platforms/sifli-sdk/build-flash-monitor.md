---
icon: lucide/terminal
description: "Le déroulement quotidien avec le SiFli-SDK : activer l'environnement, compiler avec scons, flasher au moyen du script de téléchargement UART ou de sftool, puis suivre la sortie série."
tags:
    - Développement
    - SiFli-SDK
---

# Compiler, flasher et surveiller la sortie série { #build-flash-monitor }

Cette page présente le cycle de développement quotidien avec le SiFli-SDK : activer l'environnement, compiler avec `scons`, flasher la carte et consulter les journaux.

## Activer le SDK { #activate-the-sdk }

Installez l'environnement du SDK en suivant le [guide officiel d'installation](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html) adapté à votre version. Avant de compiler, activez l'environnement dans chaque nouveau terminal en exécutant le script d'export depuis la racine du SDK :

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

Le script d'export charge dans le terminal courant l'environnement correspondant à la copie du SDK utilisée. Les étapes d'installation et de gestion de l'environnement peuvent varier selon la version du SDK ; consultez le guide officiel correspondant.

## Compiler { #build }

Dans le répertoire d'un exemple :

```bash
scons --board=<board_name> -j8
```

Choisissez une valeur de `-j` adaptée à votre machine. Si le nom de la carte ne précise pas de cœur, le SDK sélectionne HCPU par défaut. Par exemple, `sf32lb52-lcd_n16r8` génère `build_sf32lb52-lcd_n16r8_hcpu/`. Utilisez le répertoire indiqué pour la cible carte/cœur résolue ; si l'identifiant de la carte indique déjà le cœur, n'ajoutez pas `_hcpu` une seconde fois.

## Nettoyer et recompiler { #clean-rebuilds }

Nettoyez puis recompilez le projet lorsque vous changez de carte, modifiez un paramètre majeur ou recherchez la cause d'un artefact suspect. Depuis le répertoire du projet d'exemple, lancez l'option de nettoyage de SCons :

```bash
scons -c
```

Cette commande nettoie les cibles de compilation ainsi que les fichiers temporaires et les fichiers objets générés. Recompilez ensuite avec la configuration de carte voulue.

## Flasher { #flash }

Par exemple, pour la cible HCPU `sf32lb52-lcd_n16r8`, utilisez le script de téléchargement UART généré par la compilation :

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli publie également [`sftool`](https://github.com/OpenSiFli/sftool), un utilitaire en ligne de commande open source permettant de communiquer avec les SoC SiFli via une interface série. Les opérations documentées comprennent l'écriture, la lecture et l'effacement de la mémoire flash, ainsi que le contrôle de la réinitialisation de la puce. Consultez le README de l'outil pour connaître les puces et les types de stockage pris en charge, ainsi que les options des commandes.

## Surveiller la sortie série { #monitor }

Utilisez un terminal série configuré pour la carte et l'exemple. Le journal série devrait afficher les informations de démarrage, les messages de lancement de RT-Thread, les messages de l'application ou une invite du shell.

Notez les informations suivantes :

- Le nom de la carte.
- Le port série.
- Le débit en bauds.
- La commande de compilation.
- La commande de flashage.
- La branche ou version du SDK.

## Cycle quotidien de développement { #daily-developer-loop }

<div align="center"><em>Tableau : Cycle quotidien de développement</em></div>

<div align="center" markdown>

| Étape | Objectif |
|:-----|:-----|
| Activer | Charger l'environnement SDK dans le terminal actuel. |
| Configurer | Sélectionner la carte et les options de fonctionnalités. |
| Compiler | Produire des binaires spécifiques à la carte. |
| Flasher | Placer l'image sur le matériel. |
| Surveiller | Confirmer le comportement de démarrage et de l'application. |
| Consigner | Enregistrer les commandes et les journaux pour pouvoir reproduire le processus. |

</div>

## Partir d'un exemple correspondant { #start-from-a-matching-example }

Avant de créer un projet ou de le modifier en profondeur, choisissez l'[exemple du SDK](../../examples/index.md) qui correspond le mieux à la carte et au sous-système critique. Compilez, flashez et surveillez d'abord cet exemple sans le modifier ; consignez ensuite son nom de carte, sa version du SDK, les commandes et la sortie attendue avec le projet adapté.

Si vous utilisez [CodeKit](../../tools/codekit.md), conservez les mêmes traces de validation et vérifiez que les opérations effectuées dans l'éditeur peuvent être reproduites avec les commandes du SDK.

## Dépannage { #troubleshooting }

<div align="center"><em>Tableau : Dépannage</em></div>

<div align="center" markdown>

| Symptôme | À vérifier |
|:--------|:------|
| Outil de compilation introuvable | Réexécutez `export.sh` / `export.ps1` dans le terminal actuel. |
| Nom de carte inconnu | Vérifiez la documentation des cartes prises en charge du SDK. |
| Le script de téléchargement ne peut pas ouvrir le port | Fermez les terminaux série et vérifiez le câble/connecteur USB-vers-UART. |
| Le flashage ne démarre pas | Suivez la séquence de téléchargement documentée pour la carte. Pour `sf32lb52-lcd_n16r8`, après avoir sélectionné le port série, redémarrez la carte, puis appuyez sur Entrée dans les 2 secondes pour lancer le téléchargement ; pour les autres cartes, suivez leur procédure propre. Vérifiez également l'alimentation, le port sélectionné et la connexion UART. |
| La sortie série est illisible | Vérifiez le débit en bauds et utilisez l'UART de données, et non un câble réservé à la charge. |

</div>

## Liste de contrôle pour le transfert { #handoff-checklist }

Avant de transmettre un projet à un autre développeur, incluez :

- La branche ou le commit du SDK.
- Le nom de la carte.
- Les notes de configuration/installation.
- La commande de compilation.
- La commande de flashage.
- Les paramètres du moniteur série.
- Les premières lignes de journal attendues.
- La commande de récupération.
