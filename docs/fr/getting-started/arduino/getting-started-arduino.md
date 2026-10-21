---
icon: lucide/puzzle
description: "Première prise en main pas à pas du cœur ArduinoCore-zephyr bêta d'OpenSiFli sur le SF32LB52 DevKit LCD : installer le paquet de cartes, téléverser un test série et Blink."
tags:
    - Prise en main
    - Arduino
---

# Arduino { #arduino }

OpenSiFli propose un cœur Arduino bêta pour SF32 basé sur Zephyr : [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). Le projet publie le paquet Arduino `sifli:sf32lb52`, qui apparaît dans le Boards Manager (gestionnaire de cartes) sous le nom **SiFli Serial Boards** et prend actuellement en charge la carte **SiFli SF32LB52 DevKit LCD**.

Ce cœur convient aux essais de sketches, aux vérifications rapides de périphériques, aux démonstrations et aux premiers prototypes. Pour un firmware destiné à la production, le réglage fin de la pile Bluetooth, les applications exigeantes en graphismes, l'optimisation de la consommation ou la mise en service d'une carte personnalisée, utilisez [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Cœur bêta"
    OpenSiFli marque ce cœur Arduino comme **BÊTA** et indique qu'il doit être utilisé uniquement pour les tests. Les fonctionnalités, API, comportement du chargeur, contenu du paquet et mécanismes de publication peuvent changer. Ne le considérez pas comme prêt pour la production.

## Ce dont vous aurez besoin { #what-youll-need }

**Matériel**

- SiFli SF32LB52 DevKit LCD.
- Un câble de données USB Type-C connecté au port USB-UART de la carte.
- Un ordinateur sous Windows, macOS ou Linux.

**Logiciel**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) ou [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- Le paquet Arduino OpenSiFli `sifli:sf32lb52`.
- Un moniteur série.

## Installer le paquet de la carte { #install-the-board-package }

Ouvrez **Arduino IDE > Settings** et ajoutez cette URL dans **Additional Boards Manager URLs** :

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

En Chine continentale, vous pouvez utiliser l'index de paquets hébergé sur le miroir :

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Ouvrez ensuite **Boards Manager**, recherchez **SiFli Serial Boards** et installez la plateforme `sifli:sf32lb52`.

Avec Arduino CLI :

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

Pour utiliser le miroir en Chine :

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Sélectionner la carte { #select-the-board }

Dans Arduino IDE, sélectionnez :

```text
SiFli SF32LB52 DevKit LCD
```

Le FQBN de la carte est :

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

La définition de carte OpenSiFli associe cette carte Arduino à la cible Zephyr `sf32lb52_devkit_lcd` et à la variante `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Choisir les options de compilation { #choose-build-options }

Le cœur expose deux menus importants :

<div align="center"><em>Options de compilation</em></div>

<div align="center" markdown>

| Menu | Option | Signification |
|:-----|:-------|:--------|
| **Mode** | `Standard` | Le sketch démarre automatiquement après le chargement. |
| **Mode** | `Debug` | Le shell Zephyr attend la commande `sketch`. |
| **Link mode** | `Dynamic` | Le sketch est empaqueté pour le chargeur Zephyr. |
| **Link mode** | `Static` | Le sketch est lié dans un binaire flashable. |

</div>

Choisissez **Dynamic** pour utiliser le chargeur Zephyr. Choisissez **Static** si le sketch doit être lié dans une image firmware flashable.

## Mettre la carte en mode téléchargement série { #put-the-board-in-serial-download-mode }

Pour la première utilisation, la carte doit être en mode téléchargement série, selon la documentation OpenSiFli. Suivez la séquence de démarrage/réinitialisation de la SF32LB52 DevKit LCD, puis téléversez depuis Arduino IDE ou CLI.

L'outil de téléversement est `sftool`.

## Téléverser un test série de base { #upload-a-serial-smoke-test }

Commencez par vérifier la sortie série. Elle permet de confirmer le téléversement, la réinitialisation, le démarrage de l'environnement d'exécution et l'acheminement vers la console, sans dépendre de la polarité de la LED :

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Téléversez depuis Arduino IDE, ou utilisez Arduino CLI :

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Remplacez `/dev/cu.usbserial-XXXX` par le port série de votre carte. Sous Windows, utilisez le port `COM` correspondant. Sous Linux, utilisez le port `/dev/ttyUSB*` ou `/dev/ttyACM*` correspondant.

Ouvrez le Serial Monitor à `115200` bauds. En mode de compilation **Standard**, le sketch devrait afficher une ligne par seconde. En mode de compilation **Debug**, ouvrez le shell Zephyr et exécutez :

```text
sketch
```

## Téléverser Blink { #upload-blink }

Vérifiez si la variante SF32LB52 DevKit LCD installée définit `LED_BUILTIN` ; ne supposez pas que les numéros de broche Arduino sont universels. Si la macro existe et que la variante associe `LED_BUILTIN` à la LED intégrée, essayez Blink après la réussite du test série. Sinon, consultez la documentation de la carte pour confirmer le raccordement et la polarité de la LED avant de choisir un GPIO.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Dépannage { #troubleshooting }

<div align="center"><em>Tableau : dépannage</em></div>

<div align="center" markdown>

| Symptôme | Vérification |
|:--------|:------|
| Le paquet n'apparaît pas | Vérifiez l'URL de l'index de paquets et utilisez Arduino IDE 2.x. |
| Le téléversement échoue | Mettez la carte en mode téléchargement série et assurez-vous qu'aucun moniteur série n'occupe le port. |
| Le sketch ne démarre pas | Vérifiez **Mode**. En `Debug`, exécutez `sketch` depuis le shell Zephyr. |
| Symbole Zephyr non défini | Le README du cœur indique que les fonctions Zephyr manquantes peuvent devoir être exportées dans `loader/llext_exports.c`, puis que le chargeur doit être reconstruit. |
| Sous-système Zephyr manquant | Activez l'option `CONFIG_` requise dans le `.conf` de la carte, reconstruisez le chargeur, puis téléversez-le. |
| Mémoire insuffisante | Le shell Zephyr et le chargement dynamique de sketch consomment de la RAM ; réduisez l'utilisation de la pile ou changez de mode de compilation le cas échéant. |

</div>

## Périmètre actuel { #what-sifli-team-should-finish }

Le paquet actuellement publié cible la SF32LB52 DevKit LCD et reste une version bêta destinée aux tests. Avant d'essayer une autre carte ou de dépendre d'une API, consultez le [dépôt amont](https://github.com/OpenSiFli/ArduinoCore-zephyr) et les notes de version correspondant à la version exacte du paquet. La prise en charge dans Zephyr ou SiFli-SDK ne garantit pas celle de ce paquet Arduino.
