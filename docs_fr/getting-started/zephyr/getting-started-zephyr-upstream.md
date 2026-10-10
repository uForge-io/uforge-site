---
icon: lucide/layers
description: "Compilez et flashez la cible amont SF32LB52 DevKit LCD de Zephyr, puis vérifiez la console et les fonctions documentées."
tags:
    - Prise en main
    - Zephyr
---

# Zephyr amont { #zephyr-upstream }

Depuis Zephyr v4.3.0, la carte `sf32lb52_devkit_lcd` est maintenue dans le dépôt amont de Zephyr. Consultez les [notes de version v4.3.0](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html) et la [documentation de la carte SF32LB52 DevKit LCD](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html). Ce guide crée un espace de travail v4.3.0, compile un premier exemple et flashe la carte. Pour bénéficier d'un ensemble plus complet de fonctions officielles SF32, utilisez [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! note "Vérifiez les fonctions de la carte"
    La présence d'une définition de carte en amont ne confirme pas, à elle seule, que tous les périphériques et modes de fonctionnement sont activés ou validés pour un produit. Consultez le tableau des fonctions prises en charge dans la documentation de la carte et vérifiez le comportement requis sur la révision exacte de votre carte.

## Ce dont vous aurez besoin { #what-youll-need }

**Matériel**

- SF32LB52 DevKit LCD, basée sur le module SF32LB52x-MOD-N16R8 avec SF32LB525UC6, 8 MB d'OPI-PSRAM et 128 Mb de QSPI-NOR.
- Câble de données USB Type-C raccordé à la liaison USB-UART de la carte.

**Logiciel**

- Un système hôte pris en charge par Zephyr v4.3.0, configuré conformément au [guide de démarrage](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html).
- Les dépendances hôte de Zephyr et le Zephyr SDK pour la cible ARM Cortex-M, installés comme indiqué dans ce guide.
- Git, Python 3 et `pip`.

## Préparer les outils { #prepare-the-tooling }

Commencez par installer les dépendances hôte et le Zephyr SDK en suivant le [guide de démarrage de Zephyr v4.3.0](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html). Créez ensuite un environnement Python et initialisez un espace de travail à partir du tag Zephyr correspondant :

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

Gardez cet environnement Python activé pour les étapes de compilation et de flash ci-dessous.

## Vérifier la carte { #confirm-the-board }

Vérifiez que la cible est présente dans l'espace de travail :

```bash
west boards
```

Le nom attendu est :

```text
sf32lb52_devkit_lcd
```

## Compiler Hello World { #build-hello-world }

Compilez l'exemple Hello World standard de Zephyr :

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

Une compilation réussie confirme que la cible de carte et la chaîne d'outils sont disponibles dans l'espace de travail. Elle ne valide pas tous les périphériques de la carte.

## Flasher la carte { #flash-the-board }

La carte amont définit `sftool` comme outil de flash par défaut. Installez [OpenSiFli sftool](https://github.com/OpenSiFli/sftool), vérifiez qu'il est accessible via `PATH`, puis placez la carte en mode de téléchargement série conformément à sa documentation. Exécutez ensuite :

```bash
west flash
```

En cas d'échec, vérifiez le port série sélectionné, le mode de téléchargement et les instructions relatives à l'outil dans la [documentation de la carte](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html).

## Ouvrir la console série { #open-the-serial-console }

La configuration amont de la carte dirige la console Zephyr vers `usart1` à `1000000` bauds. Ouvrez cet UART avec un terminal série et vérifiez la sortie suivante :

```text
Hello World! sf32lb52_devkit_lcd
```

## Choisir l'exemple suivant { #choose-a-next-sample }

Choisissez la prochaine API ou le prochain périphérique à évaluer à l'aide du tableau des fonctions prises en charge dans la documentation amont de la carte et du [catalogue d'exemples Zephyr](https://docs.zephyrproject.org/4.3.0/samples/index.html). Vérifiez que la fonction est répertoriée pour cette carte et que la configuration requise est activée avant de considérer un exemple comme preuve de maturité pour un produit.

## Dépannage { #troubleshooting }

<div align="center"><em>Tableau : Dépannage</em></div>

<div align="center" markdown>

| Symptôme | Vérification |
|:---------|:-------------|
| La cible SF32 n'apparaît pas dans `west boards` | Vérifiez que l'espace de travail a été initialisé avec Zephyr amont v4.3.0 ou une version ultérieure et que `west update` est terminé. |
| Échec avant la compilation du code | Vérifiez que l'environnement Python est actif, que le Zephyr SDK pour ARM Cortex-M est installé et que les dépendances v4.3.0 ont été installées. |
| La carte compile, mais ne se flashe pas | Vérifiez que `sftool` est installé et présent dans `PATH`, que le port série sélectionné est correct et que la carte est en mode de téléchargement série. |
| Aucune sortie série | Vérifiez `usart1`, le débit de `1000000` bauds, la connexion USB-UART et qu'aucun autre terminal n'occupe le port. |
| Un exemple de périphérique échoue | Consultez le tableau des fonctions prises en charge et la configuration de l'exemple ; la cible de base n'active pas nécessairement tous les périphériques. |

</div>

## Avant l'intégration au produit { #before-product-integration }

- Consultez le tableau des fonctions prises en charge de la carte amont et la configuration de l'exemple prévu.
- Validez les interfaces requises, les performances, l'utilisation mémoire et le comportement énergétique sur la carte cible avec la configuration du produit. La compilation de Hello World ne constitue qu'un test rapide de la chaîne d'outils.
- Comparez le périmètre fonctionnel de la cible amont avec [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) si votre conception exige une fonction qui n'est pas répertoriée ou validée pour cette cible Zephyr.
