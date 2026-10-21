---
icon: lucide/battery-charging
title: "Exemples du SDK pour la basse consommation"
description: "Choisir l'exemple de gestion d'énergie SiFli-SDK adapté : veille, sources de réveil, GPIO, CPU, Bluetooth, affichage, UI et scénarios d'objets portables."
tags:
  - Basse consommation
  - Exemples
---

# Exemples du SDK pour la basse consommation { #low-power-sdk-examples }

Les exemples de gestion d'énergie du SiFli-SDK servent de références pour les mesures et l'intégration ; ils ne constituent pas des spécifications de courant universelles. Chaque exemple est associé à une combinaison précise : famille de puces, carte, chemin d'alimentation, périphériques activés, configuration du firmware et charge de travail. Utilisez-le pour reproduire un état ou un scénario sur le matériel cible, puis mesurez le courant et la tension de votre produit dans les mêmes conditions.

Cette page classe les projets de l'[index des exemples PM du SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) selon la question d'ingénierie à laquelle ils répondent. Pour connaître les cartes prises en charge, les branchements d'alimentation, les cavaliers, la configuration du SDK, les commandes et le comportement attendu, consultez en priorité la page officielle de chaque exemple.

## Choisir l'exemple de gestion d'énergie adapté { #start-with-the-right-power-example }

<div align="center"><em>Tableau : Exemples PM SiFli-SDK par tâche d'ingénierie</em></div>

<div align="center" markdown>

| Objectif d'ingénierie | Commencer par | Ce que cela aide à établir | À revérifier pour le produit |
|:-----------------|:-----------|:------------------------|:-------------------------|
| Vérifier l'entrée dans les états PM de base et le comportement de réveil | [Exemple de gestion d'énergie (PM)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | La configuration de gestion d'énergie de base du SDK et le cycle veille/réveil | Les sources de réveil réelles, les dépendances d'horloge, les états conservés et les demandes d'état PM de chaque pilote |
| Caractériser l'activité GPIO en basse consommation | [Test de consommation GPIO](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | Le réveil périodique par temporisateur, l'accès GPIO et la différence entre réveil, veille et activité E/S | Les résistances de rappel externes, les périphériques hors tension, le multiplexage des broches, les rails d'alimentation et les chemins de fuite involontaires |
| Distinguer le calcul actif du comportement à l'arrêt | [Test de consommation du processeur](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | Les charges de calcul CPU et les boucles simples, l'arrêt, le réveil RTC et le réveil par broche | La fréquence du cœur, la charge de travail, la polarité de la broche de réveil, le mappage propre à la carte et la tension d'alimentation |
| Mesurer des scénarios Bluetooth | [Mesure de consommation : annonces et connexion BLE](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) ou [Test de consommation BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | Les annonces BLE, les connexions et l'activité Bluetooth comme scénarios mesurables | Les conditions RF, la puissance d'émission, les intervalles d'annonce et de connexion, le comportement de l'appareil distant, l'antenne et les callbacks de l'application |
| Comparer les politiques d'écran éteint et d'affichage permanent AMOLED | [Test de consommation AMOLED](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | Le rafraîchissement de l'affichage, la veille écran éteint et le fonctionnement permanent de l'écran | Le panneau utilisé, la luminosité, la politique de rafraîchissement, les rails d'alimentation de l'écran et le profil d'utilisation quotidien réel |
| Mesurer une chaîne d'affichage JDI | [Test de consommation JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | Le comportement basse consommation propre à la configuration JDI documentée | La variante de panneau, la zone mise à jour, la configuration du contrôleur, les rails d'alimentation et la fréquence de rafraîchissement |
| Intégrer une interface graphique basse consommation | [Guide de l'exemple GUI_PM basse consommation](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | L'interaction entre le comportement de l'UI, l'état de l'écran et la politique PM | Le cycle de vie de l'écran du produit, les animations, les sources de réveil tactiles ou du contrôleur et la stratégie de mise à jour des zones modifiées |
| Caractériser une charge de rafraîchissement de l'écran | [Exemple de mesure de consommation : scénario de rafraîchissement de l'écran](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | La part liée au rafraîchissement de l'écran dans une charge de travail produit | La résolution, le format de pixel, la zone modifiée, le débit de l'interface, la stratégie de tampon et le rythme de mise à jour du contenu |
| Concevoir une interaction déclenchée par un capteur dans un objet porté | [Allumer l'écran en levant le poignet](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | Le réveil par capteur, l'activation de l'écran et le retour en veille | Le choix du capteur, l'algorithme de détection du geste, l'intervalle d'échantillonnage, le délai avant extinction de l'écran, le modèle de batterie et l'usage quotidien mesuré |

</div>

### Vérifier les cartes concernées { #verify-the-board-scope }

Les listes ci-dessous distinguent les cartes explicitement indiquées dans le guide officiel de chaque exemple des cibles de la configuration de compilation GCC actuelle de SiFli-SDK. La présence d'une carte dans la matrice signifie que le projet est configuré comme cible de compilation ; elle ne prouve pas que les valeurs de consommation publiées ont été mesurées sur cette carte. Les liens de configuration pointent vers la branche `main` actuelle ; avec une autre révision du SDK, consultez le fichier `build_config_gcc.yaml` de cette copie avant de choisir une cible `scons --board`. Pour reproduire une mesure, respectez le montage matériel décrit dans le guide. Le nom d'une famille de puces dans l'URL de la documentation ne permet pas de conclure que toute la famille est prise en charge.

- **PM Example** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)) : le guide cite `sf32lb56-devkit-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8` et `sf32lb58-lcd_n16r64n4`. L'entrée actuelle du projet dans la configuration GCC utilise `sf32lb56-lcd_n16r12n1`, `eh-lb551`, `sf32lb52-lcd_n16r8`, `sf32lb58-lcd_n16r64n4` et `sf32lb52-core_n16r16`. Le premier identifiant diffère du `sf32lb56-devkit-lcd_n16r12n1` indiqué dans le guide ; vérifiez la correspondance des cartes au lieu de supposer que des identifiants différents sont interchangeables.
- **GPIO Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)) : le guide et la configuration GCC actuelle citent tous deux `sf32lb52-core_n16r16`.
- **Processor Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)) : le guide cite `eh-lb551`, `eh-lb555`, `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` et `eh-lb523`. La configuration GCC actuelle associe le projet à l'ensemble `default_boards` ; ses identifiants de cibles actuels figurent dans la [configuration de compilation](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml). Les noms de cartes indiqués dans le guide ne correspondent pas systématiquement un à un aux cibles de `default_boards` : vérifiez leur correspondance dans la révision du SDK utilisée au lieu de la déduire des noms. La présence d'une cible ne prouve pas non plus que les mesures publiées couvrent toutes les cartes de l'ensemble.
- **BLE Broadcast and Connection Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)) : le guide cite les cartes `eh-lb551` et `eh-lb555` ; les cibles de compilation GCC actuelles sont `eh-lb551_hcpu` et `eh-lb555_hcpu`.
- **BLE/BT Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)) : le guide cite `ec-lb583`, `ec-lb587`, `eh-lb561`, `eh-lb563` et `eh-lb523`. La configuration GCC actuelle utilise l'ensemble `bt_boards` ; ses identifiants exacts de cible figurent dans la [configuration](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml), et certains se terminent par `_hcpu`. Une entrée distincte du projet inclut aussi `sf32lb56-wlan-core_a128r12n1` et `sf32lb56-wlan-core_n16r12n1`. Ne substituez pas les noms de cartes du guide aux identifiants des cibles sans en avoir confirmé la correspondance.
- **AMOLED Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)) : le guide et la configuration GCC actuelle citent tous deux `sf32lb52-core_n16r16`.
- **JDI Power Consumption Test** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)) : le guide et la configuration GCC actuelle citent tous deux `sf32lb52-core_n16r16`.
- **GUI_PM Low-Power Example Guide** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)) : le guide et la configuration GCC actuelle citent tous deux `sf32lb52-lchspi-ulp`.
- **Power Consumption Test Example — Screen Refresh Scenario** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)) : le guide donne `sf32lb52-core_n16r16` comme exemple de compilation. Ce projet n'apparaît pas dans la matrice GCC actuelle, mais l'exemple et son guide restent publiés ; cette absence ne signifie pas qu'ils ne sont plus disponibles.
- **Raise Wrist to Light Up Screen** ([source du SDK](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)) : le guide et la configuration GCC actuelle citent tous deux `sf32lb52-lchspi-ulp`.

## Définir le bon périmètre de mesure électrique { #measure-at-the-right-electrical-boundary }

Ne comparez pas une mesure du produit à celle d'un exemple du SDK si elles ne portent pas sur le même périmètre électrique. Les exemples GPIO et de réveil au lever du poignet précisent notamment les branchements d'alimentation et les positions de cavaliers propres à la carte pour les mesures basse consommation. Une carte alimentée par USB, un débogueur, un adaptateur UART, un circuit de charge ou un module d'affichage peuvent modifier sensiblement le résultat.

Pour chaque essai, enregistrez :

1. Le point d'injection de l'alimentation et les rails effectivement alimentés.
2. La tension d'alimentation, ainsi que le mode d'échantillonnage et la plage de l'instrument de mesure du courant.
3. Les appareils externes, résistances de rappel, câbles et interfaces de débogage qui restent connectés.
4. La révision du firmware, le nom de la carte, la configuration `menuconfig` et le réglage du débogage PM.
5. La transition d'état ou la charge de travail exacte correspondant à chaque portion de la trace.

Mesurez la tension en même temps que le courant afin de consigner la puissance et l'énergie, et pas seulement le courant. La page [Mesurer et valider la consommation énergétique](measurement-and-validation.md) détaille la validation des composants, des scénarios et du profil quotidien.

## Premiers tests : PM, GPIO et processeur { #baseline-pm-gpio-and-processor-tests }

Utilisez l'[exemple de gestion d'énergie](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) pour vérifier le mode de veille attendu et les sources de réveil avant d'ajouter une charge de travail représentative du produit. Notez l'état PM demandé et vérifiez celui réellement atteint par le système. Si l'état profond demandé n'est jamais atteint, vérifiez d'abord la configuration et la gestion des demandes d'état PM. N'affinez les paramètres qu'après avoir résolu ce problème.

Le **test de consommation GPIO** est un bon point de départ lorsqu'une interface apparemment inactive augmente malgré tout le courant au repos. Dans le scénario documenté, le système se réveille périodiquement pour lire le GPIO ; l'exemple permet donc de distinguer le courant en veille de celui associé au réveil et aux E/S. Pour le produit, vérifiez également les résistances de rappel internes et externes, les états haute impédance, les interfaces entre domaines d'alimentation, les broches reliées à des périphériques hors tension, les valeurs par défaut après réinitialisation et les chemins de fuite via ESD ou d'alimentation inverse. Même un signal à un niveau logique valide peut provoquer une fuite de courant.

Le **test de consommation du processeur** distingue plusieurs situations : calcul sur le CPU, boucle simple, arrêt, réveil par RTC et réveil par broche. Il aide à caractériser le coût du calcul actif et le fonctionnement du réveil, mais ne prédit pas la consommation de l'application. Avant d'intégrer sa trace à un budget énergétique, remplacez le benchmark ou la boucle par une charge de travail représentative du firmware du produit.

## Scénarios Bluetooth et affichage { #bluetooth-and-display-scenarios }

Utilisez les projets [Annonces et connexion BLE](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) et [BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) pour établir des scénarios radio reproductibles avant d'optimiser les paramètres de connexion de l'application. Mesurez ensuite le produit final avec ses propres paramètres d'annonce ou de connexion, l'appareil distant, l'environnement RF, l'antenne et les callbacks. Une application qui réveille le CPU principal à chaque événement radio peut annuler les gains observés au niveau de la liaison.

Les exemples consacrés à l'affichage permettent d'examiner d'autres choix de conception :

- **Test de consommation AMOLED** compare la veille écran éteint à un mode d'affichage permanent. Les changements de mode et estimations d'autonomie de l'exemple ne valent que pour la carte, le panneau, la luminosité, le rythme de rafraîchissement et le modèle d'utilisation documentés ; ils ne s'appliquent pas automatiquement à tous les produits AMOLED.
- [Test de consommation JDI](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) fournit la référence spécifique à la plateforme pour un chemin d'affichage JDI.
- [Guide de l'exemple basse consommation GUI_PM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) relie les décisions de cycle de vie de l'UI au comportement PM.
- [Scénario de rafraîchissement de l'écran](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) se concentre sur la charge liée à la mise à jour de l'affichage.

Ensemble, ces exemples doivent aider à répondre à une question de conception : quels événements nécessitent réellement une mise à jour des pixels, et quelle partie de l'écran faut-il rafraîchir ? Consultez la [Vue d'ensemble des graphismes](../graphics/overview.md) et le [Contrôleur d'affichage](../graphics/display-controller.md) pour en déduire une stratégie de tampon et de rafraîchissement partiel.

## L'allumage de l'écran au lever du poignet : un scénario complet { #raise-to-wake-as-a-complete-scenario }

Le projet **Allumer l'écran au lever du poignet** est particulièrement utile : il combine l'échantillonnage du capteur, la reconnaissance du geste, le réveil de l'écran, une durée d'interaction définie et le retour en veille. Il illustre ainsi un scénario produit complet plutôt qu'un état isolé.

Les estimations d'autonomie de l'exemple d'origine dépendent de la capacité de batterie, du nombre de réveils, de la durée d'allumage de l'écran, du capteur, de l'intervalle d'échantillonnage, de la carte et des courants mesurés qui y sont documentés. Pour adapter la méthode, conservez sa démarche : mesurez la consommation écran allumé puis écran éteint, précisez le nombre d'événements par jour et calculez l'énergie quotidienne totale. Remplacez ensuite les valeurs de l'exemple par celles de votre produit.

Pour un exemple détaillé de la boucle entre modèle et mesures, consultez l'[analyse de la consommation d'une montre connectée](smartwatch-power-profiling.md).

## Utiliser un exemple PM pour valider le produit { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>Tableau : Vérifications à effectuer pour adapter un exemple PM au produit</em></div>

<div align="center" markdown>

| Étape | Éléments à conserver | Pourquoi c'est important |
|:-----|:-----------------|:---------------|
| Établir la référence initiale | Carte, branchement d'alimentation, cavaliers, révision du SDK, configuration et comportement attendu | Distingue le comportement de l'exemple source des modifications apportées au produit |
| Définir un scénario | État PM, composants actifs, source de réveil, durée et condition de fin | Évite une valeur moyenne de courant dépourvue de contexte technique |
| Mesurer le courant et la tension | Marqueurs dans la trace, courant, tension, puissance et énergie | Permet de comparer les résultats entre les rails et les révisions du firmware |
| Ajouter le matériel du produit | Composants externes, états des broches, rails d'alimentation et capteurs mis à jour | Révèle les fuites et la consommation des périphériques absents de la carte de développement |
| Recouper le modèle énergétique | Fréquence et durée des scénarios, ainsi que leur énergie mesurée | Rapproche l'estimation de la consommation quotidienne du comportement mesuré du produit |

</div>

## Ressources associées { #related-resources }

- [Vue d'ensemble de la conception basse consommation](overview.md) pour la responsabilité des demandes PM, les modes d'alimentation, la conception système et l'analyse de la consommation.
- [Mesurer et valider la consommation énergétique](measurement-and-validation.md) pour valider les composants, les scénarios et le profil du produit.
- [Analyse de la consommation d'une montre connectée](smartwatch-power-profiling.md) pour un modèle détaillé d'utilisation quotidienne.
- [Exemples](../../develop/examples/index.md) pour le catalogue des exemples du SDK, tous domaines confondus.
- [Index des exemples PM du SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) pour les projets officiels et leurs instructions de configuration à jour.
