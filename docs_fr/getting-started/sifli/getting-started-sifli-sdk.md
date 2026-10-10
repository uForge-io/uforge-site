---
icon: lucide/terminal
description: "Exécutez hello_world sur une carte SF32 par UART avec SiFli-SDK : installez la chaîne d'outils, compilez avec scons et flashez le firmware par UART."
tags:
    - Prise en main
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

Ce guide explique comment lancer l'exemple `hello_world` sur une carte de développement SF32 tout juste déballée, par UART et avec **SiFli-SDK**, le SDK officiel basé sur RT-Thread pour les appareils SF32.

Même si vous comptez utiliser Arduino, Zephyr ou MicroPython, suivez ce guide une fois. Vous pourrez ainsi vérifier que la carte, le câble, le port série, le processus de flashage et la chaîne d'outils de base fonctionnent avant d'ajouter un autre framework.

## Ce dont vous aurez besoin { #what-youll-need }

**Matériel**

- Une carte de développement SF32, telle que la [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), ou une autre carte de la [famille SF32](../../sf32-products/family/SF32_family.md).
- Un câble USB Type-C de **données** connecté au port USB-UART de la carte, et non un câble réservé à la charge ni un port USB secondaire dédié aux fonctions USB.
- Un ordinateur sous Windows, macOS ou Linux.

**Logiciel**

- [git](https://git-scm.com/)
- Une chaîne d'outils C/C++ préparée avec [`uv`](https://docs.astral.sh/uv/getting-started/installation/) (l'installateur de SiFli-SDK télécharge le compilateur, le débogueur et l'environnement Python)
- Le dépôt [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK) lui-même

**Références officielles**

- [Guide d'installation de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [Cartes prises en charge par SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [Dépôt OpenSiFli SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)
- [Versions publiées de SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "Vous préférez un IDE ?"
    SiFli propose également l'extension **SiFli-SDK-CodeKit** pour VS Code, qui guide la configuration du SDK, la compilation et le flashage du firmware. Consultez [SiFli CodeKit](getting-started-sifli-codekit.md) si vous préférez cette méthode.

## Installer la chaîne d'outils { #install-the-toolchain }

Pour disposer d'une base reproductible, utilisez un tag de version publié plutôt que `main`. À la date de cette vérification, le dernier tag publié est `v2.5.1` ; consultez la [liste officielle des versions](https://github.com/OpenSiFli/SiFli-SDK/releases) avant de commencer pour vérifier qu'un tag plus récent n'est pas disponible. La branche `release/v2.5` reçoit des mises à jour de cette série et peut évoluer.

=== "macOS / Linux"

    Installez `uv`, le gestionnaire de paquets et d'environnements utilisé par les scripts de SiFli-SDK :

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Clonez le SDK :

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Exécutez l'installateur, puis chargez l'environnement du SDK dans votre shell :

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Installez `uv` (PowerShell) :

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Clonez le SDK :

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Exécutez l'installateur, puis chargez l'environnement du SDK :

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK contient des sous-modules"
    L'option « Download ZIP » de GitHub n'inclura pas les sous-modules requis. Utilisez `git clone --recursive`. Si vous avez déjà cloné sans les sous-modules, exécutez `git submodule update --init --recursive` depuis la racine du SDK.

!!! note "Vous travaillez depuis la Chine continentale ?"
    Avant l'installation, définissez `SIFLI_SDK_MIRROR_CHINA` à `1` dans votre shell : utilisez `export SIFLI_SDK_MIRROR_CHINA=1` sous macOS/Linux ou `$env:SIFLI_SDK_MIRROR_CHINA = "1"` dans PowerShell. Vous pouvez aussi cloner le dépôt depuis le [miroir Gitee](https://gitee.com/SiFli/sifli-sdk) plutôt que depuis GitHub. Pour plus de détails, consultez le [guide d'installation](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html).

`install.sh` / `install.ps1` télécharge les versions correspondantes du compilateur et du débogueur, ainsi que les dépendances Python. Relancez le script d'installation lorsque la version du SDK change. `export.sh` / `export.ps1` active l'environnement dans le terminal courant ; relancez ce script à chaque ouverture d'un nouveau terminal avant de compiler. Sous Windows, exécutez les scripts `.ps1` dans PowerShell.

## Choisir la cible de carte { #choose-the-board-target }

La valeur passée à `scons --board` correspond au nom du répertoire de la carte sous `customer/boards`. Choisissez la cible qui correspond à la mémoire et à l'écran de votre kit. Les noms ci-dessous sont sensibles à la casse.

<div align="center" markdown>

*Cibles de compilation des cartes de développement SiFli-SDK*

| Carte de développement | Cibles exactes de `scons --board` |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

Sur une carte à deux cœurs, l'absence de suffixe sélectionne la configuration HCPU. Vous pouvez préciser `_hcpu` ou ajouter `_lcpu` pour compiler la configuration LCPU, par exemple avec `scons --board=eh-lb551_lcpu`. Si votre configuration n'apparaît pas dans le tableau, consultez la [liste officielle des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html), qui fait foi pour les informations à jour.

## Compiler l'exemple « Hello World » { #build-the-hello-world-example }

Une fois l'environnement chargé, compilez l'exemple RT-Thread `hello_world` pour votre carte :

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Remplacez `sf32lb52-lcd_n16r8` par le nom de votre carte. Consultez la [liste des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) pour connaître les autres noms disponibles. `-j8` lance 8 tâches de compilation en parallèle ; adaptez ce nombre à votre machine. La commande ci-dessus omet le suffixe du cœur : elle construit donc HCPU et place les binaires dans `build_sf32lb52-lcd_n16r8_hcpu/`. Si vous indiquez une cible avec le suffixe `_lcpu`, le répertoire de sortie se termine également par `_lcpu`.

!!! tip "Besoin de réglages personnalisés ?"
    Exécutez `sdk.py menuconfig --board=<board_name>` depuis le répertoire du projet pour ouvrir le menu de configuration interactif. Appuyez deux fois sur ++esc++, puis choisissez d'enregistrer la configuration lorsque le menu vous y invite.

## Flasher la carte { #flash-the-board }

Gardez la carte connectée via USB, puis exécutez le script de téléchargement UART produit par la compilation :

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    Lorsque le programme vous demande le port série, indiquez le chemin du périphérique affiché par le système. Sous macOS, utilisez `/dev/cu.*` (par exemple `/dev/cu.usbserial-12345678`), pas `/dev/tty.*` ; sous Linux, indiquez le chemin correspondant, par exemple `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    Lorsque vous voyez l'invite `please input serial port number`, saisissez simplement le numéro de votre port COM (par exemple `19` pour `COM19`) et appuyez sur Entrée.

!!! tip
    Si l'outil ne parvient pas à passer en mode de téléchargement UART, réinitialisez la carte juste avant de lancer le transfert. Si le problème persiste, suivez les instructions de flashage propres à la carte.

## Observer l'exécution { #see-it-run }

Une fois le flashage terminé, réinitialisez la carte ou laissez-la se réinitialiser automatiquement. Ouvrez un terminal série au débit en bauds par défaut de la carte. Vous devriez voir la sortie de démarrage et la sortie de l'exemple `hello_world` sur UART.

## Vérifier que tout fonctionne { #success-check }

Vous pouvez poursuivre lorsque les conditions suivantes sont réunies :

- Le projet se compile sans erreurs.
- Le script de téléchargement UART se termine.
- La console série affiche une sortie de démarrage lisible.
- L'exemple `hello_world` affiche sa sortie après la réinitialisation.

## Où aller ensuite { #where-to-go-next }

- **Choisissez votre puce :** comparez les séries LB52, LB55, LB56 et LB58 dans la [vue d'ensemble de la famille SF32](../../sf32-products/family/SF32_family.md).
- **Explorez plus d'exemples :** au-delà de `hello_world`, le SDK fournit des exemples pour BLE, Bluetooth classique, l'interface graphique LVGL, l'audio et les modes basse consommation.
- **Vous préférez un autre framework :** continuez avec [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md) ou [MicroPython](../micropython/getting-started-micropython.md).
- **Besoin d'aide :** consultez la [FAQ SiFli](https://wiki.sifli.com/en/faq/index.html) pour résoudre les problèmes courants de chaîne d'outils, de J-Link et de débogage.

## Consigner votre configuration de référence { #what-sifli-should-add }

Pour pouvoir reproduire la configuration, consignez le tag ou la branche du SDK, la cible `scons --board` exacte, le système d'exploitation hôte, le port série et la procédure de téléchargement validée avec votre carte. Lors d'une mise à jour du SDK ou d'un changement de carte, consultez à nouveau la [liste officielle des cartes prises en charge](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) et les [versions publiées](https://github.com/OpenSiFli/SiFli-SDK/releases).
