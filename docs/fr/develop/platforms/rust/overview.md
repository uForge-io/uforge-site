---
icon: lucide/code
description: "Évaluation du support Rust communautaire pour SF32 via OpenSiFli/sifli-rs (sifli-hal, sifli-pac) : maturité actuelle, cas d'usage adaptés ou non, et risques à vérifier."
tags:
    - Développement
    - Rust
---

# Rust { #rust }

OpenSiFli mène des travaux Rust dans [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs). Le dépôt contient des crates pour le HAL, le PAC et les tables Flash, ainsi que des exemples et des notes sur le flashage et le débogage.

Les mainteneurs décrivent le projet comme un travail en cours, non prêt pour la production. Considérez Rust sur SF32 comme une voie d'exploration, sauf si votre équipe est prête à travailler au niveau du matériel et à proposer des correctifs au dépôt amont.

Pour configurer la chaîne d'outils, compiler l'exemple Blinky sans le modifier et préparer le runner de flashage, consultez [Premiers pas avec Rust](../../../getting-started/rust/getting-started-rust.md). Cette page aide à évaluer le périmètre du support et à décider s'il convient d'aller au-delà de cette configuration de référence avec Rust.

## Crates mentionnées par OpenSiFli { #crates-mentioned-by-opensifli }

<div align="center"><em>Tableau : Crates mentionnées par OpenSiFli</em></div>

<div align="center" markdown>

| Crate | Rôle |
|:------|:--------|
| `sifli-hal` | Couche d'abstraction matérielle. |
| `sifli-pac` | Crate d'accès aux périphériques. |
| `sifli-flash-table` | Prise en charge des tables Flash. |

</div>

## Quand Rust a du sens { #when-rust-makes-sense }

Rust peut vous convenir si vous souhaitez :

- expérimenter avec Rust embarqué ;
- utiliser le typage fort dans le firmware de bas niveau ;
- préparer une évolution vers des pilotes de style `embedded-hal` ;
- contribuer à l'écosystème Rust de SF32.

Utilisez SiFli-SDK pour le firmware de production aujourd'hui.

## Points de validation { #evaluation-gates }

Ne commencez pas le portage vers un produit avant que la configuration de référence ne fonctionne sur la carte cible. Validez ensuite séparément chaque périphérique requis, la disposition Flash, le chemin de débogage et chaque fonctionnalité d'exécution. Pour chaque résultat, consignez le commit upstream, la cible Rust, la configuration Cargo, la révision de la carte et la procédure de récupération.

Le dépôt associe `sifli-hal`, `sifli-pac`, des outils pour les tables Flash et des exemples asynchrones de style Embassy. La réussite d'une application dépend donc aussi de leur interaction, et pas seulement de la compilation d'une crate. Pour analyser une lacune, conservez l'exemple le plus réduit possible qui permet de la reproduire.

## Liste de contrôle des risques { #risk-checklist }

- La crate prend-elle en charge la puce exacte ?
- Le HAL couvre-t-il le périphérique nécessaire ?
- La disposition Flash est-elle compatible avec la carte ?
- Le flux de débogage est-il documenté pour la sonde ou l'outil utilisé ?
- Peut-on récupérer la carte avec SiFli-SDK ou `sftool` ?
- L'équipe est-elle à l'aise pour contribuer au projet en proposant des correctifs ?

## Cas d'usage adaptés ou non { #good-fit-poor-fit }

<div align="center"><em>Tableau : Cas d'usage adaptés ou non à Rust</em></div>

<div align="center" markdown>

| Bonne adéquation | Mauvaise adéquation |
|:---------|:---------|
| Expérimentations et exploration de pilotes. | Produits soumis à un calendrier de production qui exige le support du fournisseur. |
| Équipes déjà utilisatrices de Rust embarqué. | Produits nécessitant des piles Bluetooth/affichage/audio complètes dès aujourd'hui. |
| Contribution à la maturité du HAL/PAC. | Prototypes ponctuels où Arduino ou les exemples SDK sont plus rapides. |

</div>
