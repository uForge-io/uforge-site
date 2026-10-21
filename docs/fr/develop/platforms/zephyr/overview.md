---
icon: lucide/layers
description: "Prise en charge Zephyr downstream d'OpenSiFli pour SF32LB52 DevKit LCD : identité de carte, limites de configuration, couverture des pilotes et risques d'intégration."
tags:
    - Développement
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli développe activement la prise en charge de Zephyr dans [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) et [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). L'arborescence downstream comprend la carte `sf32lb52_devkit_lcd`, l'intégration du HAL SiFli, les fichiers devicetree SF32LB52, les pilotes, les tests et les overlays d'exemples.

Utilisez Zephyr si vous avez besoin de ses API, du devicetree, de Kconfig, d'une structure RTOS portable ou d'une voie d'intégration avec ArduinoCore-zephyr. À ce jour, SiFli-SDK offre la couverture fonctionnelle du fournisseur la plus complète.

Pour la configuration de l'espace de travail, la première compilation `hello_world`, le flashage et la vérification de la console, consultez [Démarrer avec Zephyr downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). Cette page présente la plateforme downstream une fois cette configuration de référence validée.

Références principales :

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Documentation du projet Zephyr](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD dans la documentation des cartes Zephyr](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Carte downstream vérifiée { #verified-downstream-board }

<div align="center"><em>Tableau : carte downstream vérifiée</em></div>

<div align="center" markdown>

| Élément | Valeur |
|:-----|:------|
| Carte | `sf32lb52_devkit_lcd` |
| Nom complet | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Runner de flashage | `sftool` |
| Argument du runner | `--chip=SF32LB52` |
| Console | `usart1` |
| Vitesse de la console | `1000000` bauds |
| Nœud d'affichage sélectionné | `co5300` |

</div>

La documentation de la carte downstream décrit le module SF32LB52x-MOD-N16R8 avec 8 Mo d'OPI-PSRAM, 128 Mb de QSPI-NOR, des quartz de 48 MHz et 32,768 kHz, des interfaces d'affichage et du matériel audio, USB et microSD.

## Limites de configuration { #configuration-boundaries }

La cible de carte, le devicetree, la configuration Kconfig, les overlays et la révision du HAL downstream forment une seule limite de compatibilité. Épinglez la révision downstream dans chaque projet et gardez les overlays d'application et les fragments de configuration sous contrôle de version avec l'application.

Ne copiez pas un nom de carte, un mappage de broches ou un paramètre de runner d'un projet Arduino ou SiFli-SDK vers Zephyr. Les trois voies utilisent des modèles de configuration différents même lorsqu'elles s'exécutent sur la même carte physique.

## Notes matérielles sur la carte { #board-hardware-notes }

La documentation de la carte downstream liste :

- Le module SF32LB52x-MOD-N16R8 basé sur le SF32LB525UC6.
- 8 Mo d'OPI-PSRAM.
- 128 Mb de QSPI-NOR.
- Des quartz de 48 MHz et 32,768 kHz.
- Des interfaces d'affichage SPI/DSPI/QSPI et MCU/8080.
- La prise en charge de l'interface tactile I2C.
- Une entrée microphone analogique et une sortie audio analogique avec PA classe D embarqué.
- Des ports USB Type-C pour USB-vers-série et USB 2.0 FS.
- microSD via SPI.

## Domaines de pilotes présents dans l'arborescence downstream { #driver-areas-present-in-the-downstream-tree }

L'arborescence downstream contient des pilotes et des bindings liés à SF32LB, ou des configurations d'exemples spécifiques à la carte, dans les domaines suivants :

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC, watchdog.
- Flash, contrôleur mémoire, OPI PSRAM, QSPI NOR.
- Configuration d'exemples Display/LCDC/MIPI DBI et LVGL.
- Configuration de la boîte aux lettres HCI Bluetooth et du récepteur de diffusion BAP.
- Codec audio, DMA, CRC, cryptographie, entropie, OTP/eFuse, régulateurs, reset et capteur de température.

La présence dans l'arborescence ne signifie pas que chaque scénario produit est prêt pour la production. Validez la combinaison exacte d'exemple et de pilote sur la carte cible.

## Séquence d'intégration { #integration-sequence }

Après avoir validé la configuration de référence au premier démarrage, vérifiez un sous-système à la fois : E/S de la carte, comportement UART, affichage, stockage, Bluetooth, audio et gestion de l'alimentation. Conservez ensemble l'exemple, l'overlay, les fragments Kconfig, la révision downstream et le journal série pour chaque point de contrôle. La présence d'un pilote dans l'arborescence ne prouve pas que la combinaison applicative complète est prête pour la production.

## Liste de contrôle des risques downstream { #downstream-risk-checklist }

- Utilisez-vous la version downstream d'OpenSiFli plutôt que Zephyr upstream ?
- La révision du HAL est-elle figée ?
- `west flash` utilise-t-il le runner `sftool` attendu ?
- La console est-elle configurée à `1000000` bauds ?
- Les overlays requis sont-ils inclus pour l'exemple ?
- Le pilote est-il marqué comme pris en charge par des tests, ou simplement présent dans l'arborescence ?
