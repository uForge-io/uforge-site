---
icon: lucide/code
description: "Première évaluation de sifli-rs d'OpenSiFli sur SF32LB52 : installer la cible Rust, compiler Blinky sans modification, configurer sftool et garder un chemin de repli SDK."
tags:
    - Prise en main
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) fournit un HAL et un PAC en Rust, ainsi que des travaux sur les tables de flash pour les microcontrôleurs SiFli. Ses mainteneurs indiquent que le projet est encore en cours de développement et n'est pas prêt pour la production. Ce guide définit donc une **configuration de référence pour l'évaluation**, et non un processus de développement de firmware destiné à la production.

Avant de commencer, suivez le guide [Premiers pas avec SiFli-SDK](../sifli/getting-started-sifli-sdk.md) sur la même carte. Vous disposerez ainsi d'une liaison série et d'une procédure de récupération déjà validées si l'expérience Rust ne peut pas être flashée ou déboguée.

## Ce dont vous avez besoin { #what-you-need }

- Une carte SF32LB52 DevKit LCD et un câble de données USB Type-C connecté au port USB-UART de la carte.
- Une connaissance de base de Rust, du développement embarqué et de la ligne de commande.
- `git` et une chaîne d'outils Rust à jour installée avec [rustup](https://rustup.rs/).
- Le [guide de démarrage sifli-rs](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) actuel et le [guide de flashage et débogage](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md).

!!! warning "Voie d'exploration"
    Ce guide ne prouve pas qu'une puce, un périphérique, une configuration de carte ou une pile applicative est prête pour la production. Avant d'entreprendre un portage, vérifiez dans le dépôt l'état de prise en charge de la cible et du périphérique concernés.

## Préparer la cible Rust { #prepare-the-rust-target }

Le guide du dépôt utilise des cibles Rust Arm Cortex-M. Installez les cibles qu'il documente :

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Clonez le dépôt actuel, puis travaillez depuis son répertoire d'exemples SF32LB52 :

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

Le répertoire d'exemples contient la configuration de cible Cargo, la disposition mémoire, le script de compilation et les binaires des exemples. Ne reprenez pas ces fichiers tels quels dans un produit : ils reposent sur des hypothèses concernant la carte et la mémoire flash, à vérifier pour le matériel cible.

## Configurer le lanceur de flashage { #configure-the-flash-runner }

Le dépôt indique `sftool` comme runner de flashage habituel. Dans `examples/sf32lb52x/.cargo/config.toml`, configurez le runner pour utiliser le port USB-UART de la carte, conformément au guide actuel de flashage et de débogage. Le modèle documenté est :

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

Le premier flashage peut nécessiter une table de flash, un chargeur d'amorçage et une image d'application. Les images et adresses exactes dépendent de la configuration documentée de la carte et de la mémoire flash. Suivez le guide du dépôt plutôt que de reprendre des adresses ou des binaires provenant d'Arduino, Zephyr ou SiFli-SDK.

## Compiler et exécuter l'exemple de référence { #build-and-run-the-baseline }

Une fois le runner configuré, compilez et flashez l'exemple Blinky sans modification :

```bash
cargo run --bin blinky
```

Une compilation réussie n'est qu'une première vérification. Assurez-vous que la carte présente le comportement attendu et conservez la sortie complète de `cargo` et `sftool`. Modifiez ensuite un seul paramètre de façon réversible — par exemple la durée du clignotement — avant d'essayer un autre périphérique.

## Si l'exemple de référence échoue { #if-the-baseline-fails }

Vérifiez d'abord que la configuration de référence SiFli-SDK fonctionne toujours sur la carte. Recueillez ensuite la cible Rust, le commit, l'exemple choisi, la configuration Cargo, la commande `sftool` et sa sortie, la révision de la carte ainsi que le journal série ou de débogage. Le guide amont signale que le débogage peut être instable autour des états d'inactivité/WFI et que la table de flash doit être assez grande pour contenir l'image de l'application.

Pour les décisions d'architecture, le périmètre de prise en charge et l'adéquation au produit, consultez la [page Rust de la section Develop](../../develop/platforms/rust/overview.md).

## Avant de réutiliser l'exemple { #what-sifli-should-add }

Avant d'adapter l'exemple, vérifiez que le dépôt documente la prise en charge de votre carte et de ses périphériques précis, puis examinez la cible Rust, le chargeur d'amorçage, la disposition de la table de flash et le chemin de débogage correspondants. Conservez la configuration SiFli-SDK connue comme fonctionnelle afin de pouvoir vous en servir pour la récupération.
