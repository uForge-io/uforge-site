---
icon: lucide/list-tree
description: "Choisir et adapter un exemple SiFli-SDK ou Zephyr selon la carte, le framework et le périphérique le plus exigeant, plutôt que d'écrire un firmware SF32 de zéro."
tags:
    - Développement
    - Exemples
---

# Exemples { #examples }

Commencez par les exemples. Le firmware SF32 se construit généralement plus vite lorsque vous adaptez un exemple fonctionnel spécifique à une carte plutôt que de reconstruire chaque sous-système depuis zéro.

Le plus petit exemple n'est pas forcément le meilleur. Choisissez-en un qui inclut déjà la partie la plus exigeante de votre produit : profil Bluetooth, écran, chaîne audio, système de fichiers, OTA, USB, mode d'alimentation ou accélérateur IA.

## Domaines d'exemples { #example-areas }

<div align="center"><em>Tableau : Domaines d'exemples</em></div>

<div align="center" markdown>

| Domaine | Commencer par |
|:-----|:-----------|
| Première exécution | `example/get-started/hello_world/rtt/project` |
| Clignotement / GPIO | `example/get-started/blink/rtt` ou les exemples GPIO de la HAL et de RT-Device. |
| Bluetooth | Exemples BLE, BT Classic, LE Audio, débit, balise, OTA et profils. Commencez par la carte des tâches [Exemples du SDK Bluetooth](../../learn/bluetooth/bluetooth-sdk-examples.md). |
| Graphisme | Démonstrations LVGL, intégrations d'outils de conception, widgets, ressources compressées, animation/média et exemples spécifiques à l'affichage. Commencez par la carte des tâches [Exemples LVGL du SDK](../../learn/graphics/lvgl-sdk-examples.md). |
| Audio | Lecture, enregistrement, capture PDM, codec, Opus, MP3, mixage et audio USB lorsqu'il est pris en charge. Commencez par la carte des tâches [Exemples audio du SDK](../../learn/audio/audio-sdk-examples.md). |
| Basse consommation | États PM, GPIO, processeur, Bluetooth, affichage, UI et exemples de scénarios portables. Commencez par la carte des tâches [Exemples du SDK pour la basse consommation](../../learn/low-power/low-power-sdk-examples.md). |
| Stockage | Exemples de système de fichiers, Flash, SD et partitions. |
| USB | Exemples CherryUSB en mode périphérique et en mode hôte. |
| IA | Exemples HAL NNACC et RT-Device. |

</div>

## Points de départ représentatifs dans le SDK { #representative-sdk-starting-points }

Utilisez ce tableau après avoir choisi le domaine pertinent. Les chemins sont représentatifs et peuvent changer d'une version du SDK à l'autre ; vérifiez le SDK sélectionné, la carte cible et la configuration avant de compiler.

<div align="center"><em>Points de départ représentatifs des exemples SDK SF32</em></div>

<div align="center" markdown>

| Objectif de développement | Exemple représentatif du SDK | Ce qu'il faut vérifier en premier | Poursuivre avec |
|:---|:---|:---|:---|
| Sortie ou entrée GPIO | `example/hal/gpio`, `example/rt_device/gpio` | Multiplexage des broches, polarité et comportement des interruptions sur la carte réelle. | [Premiers pas avec les périphériques](../../getting-started/tutorials/beginner.md) |
| Console et inspection du système | `example/system/finsh` | Console série, journaux et inspection basique de l'exécution. | [Premiers pas avec les périphériques](../../getting-started/tutorials/beginner.md) |
| ADC, PWM ou RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | Configuration de broche, d'horloge et de périphérique spécifique à la carte. | [Premiers pas avec les périphériques](../../getting-started/tutorials/beginner.md) |
| Capteur I2C | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | Connexions électriques, adressage du bus et fiabilité des transferts répétés. | [Intégration de sous-systèmes](../../getting-started/tutorials/intermediate.md) |
| LVGL et écran local | `example/multimedia/lvgl/lvgl_v8_examples` | Initialisation du panneau, format des pixels et stabilité du chemin de flush avant de passer à des écrans complexes. | [Vue d'ensemble](../../learn/graphics/overview.md), [Contrôleur d'affichage](../../learn/graphics/display-controller.md) |
| Service de périphérique BLE | `example/ble/peripheral`, `example/ble/hrpc` | Publicité, connexion, une caractéristique GATT et comportement de reconnexion. | [Vue d'ensemble Bluetooth](../../learn/bluetooth/overview.md) |
| Lecture audio locale | `example/multimedia/audio/local_music`, `mp3_sd_player` | Configuration de la chaîne audio selon le codec et la carte, stabilité du tampon et libération des ressources après lecture. | [Vue d'ensemble de l'audio](../../learn/audio/overview.md) |
| Stockage sur Flash | `example/storage/littlefs/nor`, `example/storage/flashdb` | Montage, comportement de lecture/écriture et récupération après une réinitialisation ou lorsque le stockage est plein. | [Intégration de sous-systèmes](../../getting-started/tutorials/intermediate.md) |
| Comportement basse consommation | `example/pm/classical`, `example/pm/raise_wrist` | Courant mesuré dans des états nommés et comportement correct des sources de réveil. | [Vue d'ensemble de la conception basse consommation](../../learn/low-power/overview.md) |
| OTA BLE | `example/ble/peripheral_with_ota` | Récupération après une mise à jour interrompue et restauration de la version précédente sur le matériel cible. | [Validation produit](../../getting-started/tutorials/advanced.md) |
| Diagnostic en cours d'exécution | `example/system/cpu_usage_profiler`, `example/system/coredump` | Trace CPU reproductible ou capture de plantage avant optimisation. | [Validation produit](../../getting-started/tutorials/advanced.md) |

</div>

## Comment choisir un exemple { #how-to-choose-an-example }

Suivez cet ordre :

1. Choisissez la carte cible.
2. Choisissez le framework utilisé par le projet.
3. Repérez l'exemple qui couvre le périphérique le plus exigeant.
4. Vérifiez qu'il utilise le middleware adapté.
5. Tenez compte des contraintes de consommation et de mémoire.

Par exemple, un produit audio Bluetooth devrait partir d'un exemple audio/Bluetooth plutôt que d'un `hello_world` de base, même si ce dernier est plus facile à comprendre.

## Flux de travail d'adaptation { #adaptation-workflow }

1. Compilez et flashez l'exemple non modifié.
2. Enregistrez la commande de compilation réussie, le nom de la carte, la commande de flashage, le port série et le journal.
3. Apportez une seule modification liée au produit.
4. Recompilez et testez à nouveau.
5. Créez un commit ou consignez la modification avant d'ajouter un autre sous-système.

Cette méthode est plus lente pendant la première heure, et beaucoup plus rapide après le premier incident difficile.

## Preuves à conserver { #evidence-to-keep }

Pour chaque exemple qui servira de base au produit, consignez :

- La branche SDK ou la version du package.
- Le nom de la carte ou le FQBN.
- Les options de configuration requises.
- Les broches et périphériques requis.
- La sortie série attendue.
- Les limitations connues.
- L'empreinte mémoire si disponible.
- La commande de récupération.

## Règle de sélection d'exemple { #example-selection-rule }

Choisissez l'exemple correspondant au sous-système qui impose les contraintes les plus fortes au produit :

- Pour les produits Bluetooth, partez du profil le plus proche.
- Pour les produits dotés d'un écran, partez de la chaîne d'affichage et de LVGL.
- Pour les produits sur batterie, partez d'un exemple de gestion de l'énergie.
- Pour les produits OTA, partez du flux de mise à jour et de la disposition des partitions.

Ajoutez ensuite les autres sous-systèmes un par un.

## Parcours d'apprentissage suggéré { #suggested-learning-path }

Si vous découvrez le SDK, commencez par [Premiers pas avec les périphériques](../../getting-started/tutorials/beginner.md), puis passez à [Intégration de sous-systèmes](../../getting-started/tutorials/intermediate.md) lorsqu'un périphérique fonctionne de manière stable. Utilisez [Validation produit](../../getting-started/tutorials/advanced.md) pour mesurer la consommation, travailler sur l'OTA, mettre en service un écran personnalisé, analyser les défaillances, gérer plusieurs connexions Bluetooth et développer des pilotes personnalisés. Les aperçus thématiques expliquent l'architecture et les compromis associés à ces exemples.
