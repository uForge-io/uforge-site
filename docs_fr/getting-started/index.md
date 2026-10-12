---
icon: lucide/rocket
title: "Vue d'ensemble des premiers pas"
description: "Choisir votre premier parcours logiciel SF32 — SiFli-SDK, CodeKit, Zephyr, Arduino, Rust ou MicroPython — selon son état actuel et le matériel requis."
tags:
    - Prise en main
    - SF32
---

# Vue d'ensemble de la prise en main { #getting-started }

Les puces SF32 prennent en charge plusieurs parcours logiciels. SiFli-SDK et CodeKit sont actuellement les parcours officiels pour une première mise en route. Depuis Zephyr v4.3.0, le projet Zephyr en amont maintient la prise en charge de la SF32LB52 DevKit LCD. OpenSiFli propose aussi une version bêta d'ArduinoCore-zephyr et développe la prise en charge de Rust pour SF32LB52. Pour proposer un tutoriel MicroPython vérifié, il manque encore des images de firmware officielles et des instructions propres à chaque carte.

Pour connaître le flux de développement de référence et le périmètre actuel de chaque parcours, consultez la [Vue d'ensemble du développement](../develop/index.md). Le tableau ci-dessous sert uniquement à choisir un point de départ. Les pages de chaque plateforme font référence pour connaître les cartes prises en charge et leurs limites.

## Choisissez votre parcours { #choose-your-path }

<div align="center"><em>Tableau : choisir son parcours logiciel</em></div>

<div align="center" markdown>

| Parcours | Statut actuel | Commencer ici |
|:-----|:---------------|:-----------|
| **SiFli-SDK** | Parcours officiel de SiFli pour le développement de référence sur SF32 : RT-Thread, Bluetooth, graphismes, audio, basse consommation et mise en service des cartes. | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | Environnement officiel SiFli pour VS Code : configuration du SDK, création de projets, compilation, flashage et utilisation du moniteur série. | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | Depuis Zephyr v4.3.0, le projet Zephyr en amont maintient la prise en charge de `sf32lb52_devkit_lcd`. | [Zephyr amont](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFli propose en version bêta un paquet ArduinoCore-zephyr pour la SF32LB52 DevKit LCD. | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | `sifli-rs`, développé par OpenSiFli, permet d'évaluer Rust. Ce support est en cours de développement et n'est pas prêt pour la production. | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | Nécessite des images de firmware officielles, des commandes de flashage, des paramètres REPL, et des détails d'API pris en charge. | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## Ce dont vous avez besoin { #what-you-need }

Commencez par une carte prise en charge par le parcours logiciel choisi. Les connexions de programmation et série peuvent varier selon la carte et le framework :

- Une carte de développement SF32, par exemple la [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md).
- Un câble de données et l'interface de programmation/série indiquée pour la carte et le framework. Pour la SF32LB52-DevKit-LCD, les [instructions de connexion de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html) indiquent d'utiliser le port USB-UART pour le téléchargement série ; ne le confondez pas avec le port USB dédié à la fonction USB de la carte.
- Un ordinateur sous Windows, macOS ou Linux.
- Un terminal série configuré pour la console de la carte, afin de voir les journaux de démarrage et la sortie des exemples.

!!! tip "Utilisez un câble de données"
    Les câbles USB réservés à la charge sont une cause fréquente de problèmes lors de la première mise en route. Si la carte s'allume mais qu'aucun port série n'apparaît, essayez un câble de données dont vous savez qu'il fonctionne et branchez-le directement sur un port USB de l'ordinateur.

## Première mise en route recommandée { #recommended-first-run }

S'il s'agit de votre première carte SF32, commencez par [SiFli-SDK](sifli/getting-started-sifli-sdk.md). C'est la pile logicielle de référence pour SF32 et le moyen le plus fiable de vérifier le bon fonctionnement de la carte, du câble, du port série, du processus de flashage et de la chaîne d'outils.

Une fois `hello_world` exécuté avec succès, vous pouvez passer à un autre framework compatible avec votre matériel. Si les essais suivants échouent, vous disposerez ainsi d'une configuration connue et fonctionnelle pour repartir.

## Critères de réussite { #what-success-looks-like }

À la fin d'un guide de premiers pas, vous devriez avoir :

- Compilé ou chargé un premier exemple.
- Flashé l'exemple sur la carte.
- Ouvert la console série.
- Observé une sortie prévisible, telle qu'un journal de démarrage, `hello_world`, une invite shell ou une bannière REPL.
- Noté le nom de la carte, le port série et la commande de flashage qui ont fonctionné.

Consignez ces informations dans les notes du projet. Elles permettent de retrouver rapidement une configuration fonctionnelle lorsque vous commencez à modifier les exemples.

## Poursuivre avec les tutoriels { #continue-with-tutorials }

Une fois que vous savez reproduire cette première mise en route, passez à la [Vue d'ensemble des tutoriels](tutorials/overview.md). Cette étape du parcours de démarrage commence par un périphérique, puis combine plusieurs sous-systèmes et aborde enfin les validations nécessaires à un produit.

## Quand passer à la section Développement { #when-to-move-to-develop }

La section des premiers pas est terminée lorsque vous savez répéter une mise en route fonctionnelle. La [Vue d'ensemble du développement](../develop/index.md) est la référence technique pour la suite du travail : maturité de la plateforme, outils, procédures de flashage et de débogage, architecture du firmware et intégration du produit. Après la mise en route initiale, consultez notamment la [référence de CodeKit](../develop/tools/codekit.md) pour l'intégrer au travail de développement quotidien. Cette page reste consacrée à la première mise en route.

## À vérifier avant de choisir un parcours de développement { #before-choosing-a-development-path }

Avant d'adopter un parcours logiciel, vérifiez que sa documentation couvre bien votre carte et votre version logicielle. Recherchez notamment :

- Une matrice publique, par carte, indiquant le statut et le niveau de maturité de SiFli-SDK, CodeKit, Zephyr, Arduino et MicroPython.
- L'identifiant exact de la carte utilisé par chaque parcours logiciel pris en charge.
- Les instructions de flashage/téléchargement pour Windows, macOS et Linux.
- La sortie série attendue pour chaque premier exemple.
- Les étapes de récupération après un flashage échoué ou l'utilisation d'une image de firmware invalide.
- Les limites connues de chaque framework, en particulier pour le Bluetooth, l'affichage, le stockage, l'USB et le fonctionnement en basse consommation.
- Des notes de version précisant les versions compatibles du SDK, de CodeKit, du paquet, de l'image de firmware et de la prise en charge de la carte.

Ne supposez pas qu'un parcours disponible sur une carte l'est sur toutes les cartes SF32. Vérifiez la carte précise et la version logicielle que vous comptez utiliser.
