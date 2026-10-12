---
icon: lucide/app-window
description: "Guide de première utilisation de SiFli CodeKit dans VS Code : installer l'extension, choisir une carte SF32, compiler et flasher hello_world, puis ouvrir la console série."
tags:
    - Prise en main
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit est l'extension VS Code destinée au développement avec SiFli-SDK. Elle propose des actions guidées pour installer les outils du SDK, sélectionner une carte, compiler un exemple, flasher le firmware et ouvrir une console série.

Suivez cette procédure si vous préférez travailler dans un IDE. Pour connaître les commandes exécutées par les boutons, consultez le [guide manuel de SiFli-SDK](getting-started-sifli-sdk.md).

Cette page décrit la configuration initiale. Une fois `hello_world` opérationnel, consultez la [documentation de référence de CodeKit](../../develop/tools/codekit.md) pour connaître son rôle au quotidien, les exigences de reproductibilité et les limites de ce que CodeKit peut prendre en charge en cas de problème.

## Ce dont vous aurez besoin { #what-youll-need }

**Matériel**

- Une carte de développement SF32 prise en charge par SiFli-SDK.
- Un câble de données USB Type-C connecté au port USB-UART de la carte.
- Un ordinateur sous Windows, macOS ou Linux.

**Logiciel**

- [Visual Studio Code](https://code.visualstudio.com/)
- L'extension SiFli CodeKit.
- Git, si CodeKit vous demande de cloner ou d'importer SiFli-SDK.

**Référence officielle**

- [Guide officiel d'installation de SiFli CodeKit](https://docs.sifli.com/projects/codekit/get-started/install.html)

## Installer CodeKit { #install-codekit }

1. Ouvrez VS Code.
2. Ouvrez **Extensions**.
3. Recherchez **SiFli-SDK-CodeKit**.
4. Installez l'extension.
5. Rechargez VS Code si vous y êtes invité.

Pour ouvrir la gestion du SDK, cliquez sur l'icône SiFli dans la barre latérale de VS Code, puis choisissez **SDK Manager**. Vous pouvez aussi ouvrir **View > Command Palette** (raccourci par défaut : `F1`) et exécuter **Manage SiFli SDK installation**. Les libellés exacts peuvent varier selon la version de l'extension ; consultez le guide officiel d'installation ci-dessus.

!!! tip
    Si vous ne trouvez pas l'action dont vous avez besoin, ouvrez la palette de commandes et recherchez `SiFli`.

## Installer ou sélectionner SiFli-SDK { #install-or-select-sifli-sdk }

Utilisez le processus de configuration de CodeKit pour installer SiFli-SDK ou indiquez le chemin d'une copie déjà clonée. Pour la plupart des utilisateurs, **Release/Tag** fournit une base versionnée et testée. Choisissez **Branch** si vous avez besoin de correctifs ou de fonctions plus récents et acceptez une stabilité potentiellement moindre. Le guide officiel présente une branche `release/vX.Y` comme un moyen d'obtenir les dernières corrections et fonctionnalités de sa ligne de version sans utiliser la branche `main`, moins stable. Son contenu peut néanmoins évoluer.

Pour les utilisateurs en Chine continentale, le guide officiel recommande Gitee comme source du SDK et le miroir SiFli hébergé en Chine pour télécharger la chaîne d'outils.

Si CodeKit demande un emplacement de SDK, choisissez un chemin court sans espaces, par exemple :

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit utilise l'installateur et les scripts d'environnement du SDK. Il prépare ainsi le même environnement que l'installation manuelle : compilateur, environnement Python, outils de compilation et outils de flashage.

## Ouvrir un exemple { #open-an-example }

Partez de l'exemple `hello_world` du SDK :

```text
example/get-started/hello_world/rtt/project
```

Ouvrez ce dossier de projet dans VS Code. Si CodeKit propose un assistant d'importation de projet, choisissez le projet `hello_world` et laissez-le détecter la racine du SDK.

## Sélectionner la carte { #select-the-board }

Choisissez la configuration de carte correspondant à votre matériel. Pour une carte de type SF32LB52-DevKit-LCD, le nom de carte courant est :

```text
sf32lb52-lcd_n16r8
```

Si vous utilisez une autre carte, sélectionnez le nom correspondant dans la liste de CodeKit ou la documentation du SDK sur les cartes prises en charge. Ce nom détermine la disposition mémoire, l'affectation des broches, les paramètres de flash et les périphériques activés par défaut.

## Compiler { #build }

Exécutez l'action **Build** de CodeKit. Une compilation réussie crée un dossier de sortie spécifique à la carte tel que :

```text
build_sf32lb52-lcd_n16r8_hcpu
```

Si la compilation échoue immédiatement, vérifiez que CodeKit connaît l'emplacement de SiFli-SDK et que l'installation de l'environnement du SDK est terminée.

## Flasher { #flash }

Connectez la carte via le port USB-UART, puis exécutez l'action **Flash** ou **Download** de CodeKit.

Lorsqu'un port série vous est demandé :

- Sous Windows, choisissez le port `COM` correspondant.
- Sous macOS, choisissez le périphérique `/dev/cu.*` plutôt que `/dev/tty.*`.
- Sous Linux, choisissez le périphérique `/dev/ttyUSB*` ou `/dev/ttyACM*` correspondant.

Si l'outil de téléchargement ne parvient pas à faire passer la carte en mode de téléchargement UART, réinitialisez-la juste avant de lancer le transfert. Si le problème persiste, suivez les instructions de flashage propres à la carte.

## Ouvrir la console série { #open-the-serial-console }

Utilisez le moniteur série de CodeKit, les outils série de VS Code ou un autre programme de terminal. Après la réinitialisation, la console devrait afficher des messages de démarrage lisibles ainsi que la sortie de l'exemple `hello_world`.

Si les messages de démarrage sont lisibles, la carte et la configuration série fonctionnent correctement. Si la sortie est illisible, fermez les autres outils série et vérifiez le débit utilisé par l'exemple.

## Vérifier le fonctionnement { #success-check }

Vous pouvez poursuivre lorsque les conditions suivantes sont réunies :

- CodeKit reconnaît l'emplacement du SDK.
- La carte sélectionnée correspond à votre matériel.
- Les actions de compilation et de flashage se terminent.
- La console série affiche la sortie de `hello_world` après réinitialisation.

## Dépannage { #troubleshooting }

<div align="center"><em>Tableau : Dépannage</em></div>

<div align="center" markdown>

| Symptôme | Vérification |
|:--------|:------|
| Aucun port série n'apparaît | Essayez un câble de données, un autre port USB ou le connecteur USB-UART de la carte. |
| CodeKit ne trouve pas le SDK | Relancez le flux de configuration de CodeKit et sélectionnez le dossier racine de SiFli-SDK. |
| Les outils sont introuvables à la compilation | Laissez CodeKit réinstaller la chaîne d'outils ou exécutez une fois l'installateur du SDK manuellement. |
| Le flashage ne démarre pas | Si l'outil ne passe pas en mode de téléchargement UART, réinitialisez la carte juste avant le transfert. Si le problème persiste, suivez les instructions de flashage propres à la carte. |
| La sortie série est illisible | Vérifiez le débit en bauds et assurez-vous qu'un seul moniteur série est ouvert. |

</div>

## Où aller ensuite { #where-to-go-next }

- Utilisez [SiFli-SDK](getting-started-sifli-sdk.md) pour comprendre les commandes équivalentes en ligne de commande.
- Continuez avec les [Tutoriels débutants](../tutorials/beginner.md) une fois que `hello_world` fonctionne.
- Consultez la [Vue d'ensemble du Bluetooth](../../learn/bluetooth/overview.md), la [Vue d'ensemble des graphismes](../../learn/graphics/overview.md), la [Vue d'ensemble de l'audio](../../learn/audio/overview.md) et la [Vue d'ensemble de la basse consommation](../../learn/low-power/overview.md) lorsque vous commencez à développer une fonctionnalité produit concrète.

## Consigner une configuration reproductible { #what-sifli-should-add }

Consignez les versions de CodeKit et du SDK, le tag ou la branche choisi et la cible exacte de la carte. Si un nom de menu ou de commande diffère, reportez-vous au [guide officiel d'installation](https://docs.sifli.com/projects/codekit/get-started/install.html) et à la [liste des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) correspondant aux versions installées.
