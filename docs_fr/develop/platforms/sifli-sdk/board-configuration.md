---
icon: lucide/circuit-board
description: "Comment le nom de carte --board de SiFli-SDK associe le firmware au matériel SF32 : disposition Flash/PSRAM, multiplexage des broches, chemins d'affichage et audio, et vérifications de mise en service de la carte."
tags:
    - Développement
    - SiFli-SDK
---

# Configuration de la carte { #board-configuration }

La configuration de la carte associe le firmware au matériel réel et couvre notamment la disposition de la Flash, la PSRAM, les broches, l'interface d'affichage, le chemin audio, les horloges, les rails d'alimentation et les périphériques activés par défaut.

Dans SiFli-SDK, `--board=<board_name>` est le paramètre le plus important de la compilation. Il sélectionne le package de prise en charge de la carte utilisé par l'exemple.

Sur les cartes à deux cœurs, l'absence de suffixe sélectionne la configuration HCPU par défaut. Ajoutez `_lcpu` au nom de la carte pour compiler pour LCPU ; utilisez `_hcpu` pour sélectionner explicitement HCPU. Vérifiez que l'exemple prend en charge le cœur choisi.

## Éléments pouvant varier selon la carte sélectionnée { #what-the-board-name-controls }

La carte sélectionnée peut affecter :

- La variante de puce et de boîtier.
- La disposition Flash et PSRAM.
- Les cibles de compilation HCPU/LCPU.
- Le multiplexage de broches et la disponibilité des périphériques.
- Les paramètres de téléchargement via UART.
- La configuration de l'affichage et du tactile.
- Le routage du codec audio.
- La configuration Bluetooth.
- La table de partitions et les hypothèses de démarrage.

## Règles pratiques { #practical-rules }

- Ne devinez pas le nom de la carte à partir du nom marketing.
- Ne copiez pas un nom de carte de Zephyr ou d'Arduino vers SiFli-SDK.
- Consultez le schéma de la carte ou la page du kit de développement avant de choisir les ressources GPIO, ADC, PWM, I2C, SPI ou d'affichage.
- Partez de l'exemple SDK le plus proche pour la même carte.
- Après un changement de carte, nettoyez les fichiers de compilation puis recompilez.

## Liste de vérification de mise en service de la carte { #board-bring-up-checklist }

- [ ] Confirmer la variante de puce et le boîtier.
- [ ] Confirmer le type, la capacité et la configuration de la Flash et de la PSRAM.
- [ ] Confirmer la source d'alimentation et le comportement du circuit de charge.
- [ ] Confirmer les sources et fréquences d'horloge utilisées par cette carte, notamment 48 MHz et 32,768 kHz le cas échéant.
- [ ] Confirmer l'UART de téléchargement et l'UART de journalisation.
- [ ] Confirmer les interfaces de l'afficheur et de la dalle tactile.
- [ ] Confirmer le chemin audio si utilisé.
- [ ] Confirmer les broches de démarrage et le comportement de réinitialisation.
- [ ] Confirmer la disposition des partitions.

Ne commencez pas le débogage de l'application tant que la configuration de la carte ne correspond pas au matériel réellement utilisé.

## Exemple de nom de carte SDK { #sdk-board-name-example }

<div align="center"><em>Tableau : Nom de carte SDK du SF32LB52-DevKit-LCD_N16R8</em></div>

<div align="center" markdown>

| Type de nom | Identifiant |
|:------------|:------------|
| Modèle de carte | `SF32LB52-DevKit-LCD_N16R8` |
| Valeur `--board` de SiFli-SDK | `sf32lb52-lcd_n16r8` |

</div>

Dans SiFli-SDK, utilisez l'identifiant du SDK avec `--board` ; le nom commercial n'est pas un identifiant de compilation.

## Lors d'un portage vers une carte personnalisée { #when-porting-to-a-custom-board }

Partez de la configuration du kit de développement ou du module qui se rapproche le plus de votre matériel, puis modifiez :

1. La configuration Flash et PSRAM.
2. Le multiplexage de broches.
3. L'UART console/téléchargement.
4. Les ressources d'affichage/tactile/audio.
5. Les hypothèses concernant l'alimentation et le circuit de charge.
6. La disposition des partitions.
7. Les périphériques spécifiques au produit.

Validez chaque changement avec l'exemple le plus simple qui le couvre.
