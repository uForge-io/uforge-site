---
icon: lucide/layout-dashboard
title: "Exemples LVGL du SDK"
description: "Choisissez l'exemple LVGL de SiFli-SDK adapté pour valider l'interface utilisateur, les widgets, les outils de conception, les ressources compressées, l'animation, les médias et les interfaces pour appareils portables."
tags:
  - Graphismes
  - LVGL
  - Exemples
---

# Exemples LVGL du SDK { #lvgl-sdk-examples }

Les exemples LVGL du SiFli-SDK sont des points de départ pour tester l'affichage et l'UI, pas des modèles de produit interchangeables. Validez d'abord le panneau et les entrées avec une démo de la bonne version. Choisissez ensuite l'exemple qui couvre le principal risque d'intégration du produit, exécutez-le sans modification avec une configuration de carte documentée, puis remplacez une couche à la fois. Consultez le statut de vérification et les restrictions de chaque README avant de retenir l'exemple comme référence fonctionnelle.

Ce guide classe les exemples de l'[index LVGL de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) selon leur objectif d'ingénierie. Reportez-vous à la page source officielle pour connaître les cartes actuellement prises en charge, la configuration du SDK, les chemins des sources, les ressources, les commandes de compilation et les restrictions propres à chaque version.

Cet index est un catalogue, pas une matrice de compatibilité des cartes. La prise en charge est propre à chaque exemple ; le nom d'une famille dans l'URL de documentation ne prouve pas que cette famille est prise en charge. Consultez la section **Supported Boards** de chaque exemple. Une commande de compilation générique ou la présence d'une carte dans la matrice de compilation du dépôt ne constitue pas, à elle seule, une preuve de validation à l'exécution. Si les sources divergent, explicitez cette différence et vérifiez la révision exacte du SDK et la carte.

## Choisir une base LVGL adaptée { #start-with-the-right-lvgl-baseline }

<div align="center"><em>Tableau : Exemples LVGL de SiFli-SDK par objectif d'ingénierie</em></div>

<div align="center" markdown>

| Objectif d'ingénierie | Exemple recommandé | Ce que l'exemple permet de valider | Passer à l'étape suivante lorsque |
|:-----------------|:-----------|:----------------------------|:-------------|
| Démarrer une application LVGL standard | **[Démos LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[Exemples officiels LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[Démo LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)** ou **[Exemples officiels LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | La version LVGL choisie, le pilote d'affichage de la carte, la boucle de rendu et les widgets de base | Le chemin de transfert vers le panneau (flush) et le périphérique d'entrée fonctionnent de façon stable avec l'écran réel |
| Évaluer un flux de conception d'UI | Exemples **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)** ou **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** | Comment intégrer le code d'UI généré à un projet du SDK | Le code généré se compile sans erreur et utilise la même version LVGL que le projet |
| Prototyper un comportement d'UI précis | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)** ou **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | Un schéma précis d'interaction, de widget, de disposition ou d'animation | Le produit nécessite un écran composé de plusieurs éléments plutôt qu'un élément visuel isolé |
| Valider des ressources, une animation ou des médias | **[Chargement dynamique eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Lecture vidéo locale](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)** ou **[Lecture en streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | Le chemin de stockage, de décodage, de rendu et de rafraîchissement pour du contenu plus riche | La taille des ressources, leur placement en mémoire, la fréquence de mise à jour et la consommation électrique ont été mesurées sur le matériel cible et respectent les limites du produit |
| Construire une UI représentative avec un parcours complet | **[Boussole électronique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Index des jeux](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([README du Démineur](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)) ou **[Interface de montre v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | Le parcours à l'écran, les interactions et une charge graphique couvrant plusieurs fonctions | Les données propres au produit, le comportement du cycle de vie et les limites de performance sont prêts à remplacer le contenu de démonstration |

</div>

Les listes de cartes diffèrent selon les exemples. Le README des démos v8 cite `eh-lb563` et les séries LCD SF32LB52x, SF32LB56x et SF32LB58x. Celui des exemples officiels v8 cite `sf32lb52-lchspi-ulp` et ces trois séries LCD. Le README de la démo v9 cite les trois séries LCD ; ses instructions génériques de compilation mentionnent aussi `eh-lb563`, qui ne figure pas dans sa liste explicite **Supported Development Boards**. Le README des exemples officiels v9 cite `sf32lb52-lchspi-ulp` et les trois séries LCD. Fiez-vous à la liste explicite de chaque README pour connaître le périmètre documenté ; n'ajoutez pas une cible sur la seule base d'un exemple générique de compilation.

## Définir d'abord le périmètre d'intégration { #confirm-the-integration-boundary-first }

Avant d'adapter un exemple LVGL, déterminez les parties qu'il valide déjà et celles qui restent à concevoir et à vérifier pour le produit :

<div align="center"><em>Tableau : Périmètre d'intégration des exemples LVGL</em></div>

<div align="center" markdown>

| Domaine | Ce que l'exemple valide | Ce qu'il reste à vérifier pour le produit |
|:---------|:--------------------------|:--------------------------------|
| Carte et panneau | Une configuration de carte SDK connue et une chaîne d'affichage | Le panneau exact, le contrôleur tactile, la séquence d'alimentation, le multiplexage des broches, la temporisation de réinitialisation et le processus de test en production |
| LVGL | L'initialisation propre à la version et le comportement de l'UI de l'exemple | L'architecture des écrans du produit, la gestion des événements, les limites mémoire et la politique de mise à jour |
| Ressources | Un chemin de chargement pris en charge pour les ressources de l'exemple | Le format, l'espace de stockage, le temps de chargement, la stratégie de cache, les licences et la gestion des erreurs |
| Rendu | Une boucle fonctionnelle de dessin et de transfert vers l'écran (flush) | La stratégie de mise à jour des zones modifiées, le nombre de tampons, le format couleur, la gestion du DMA et du cache ainsi que la réactivité de l'UI sous charge |
| Application | Le comportement visible de la démonstration | Les capteurs, le Bluetooth, le stockage, la gestion de l'heure, les transitions basse consommation, la récupération après erreur et les données utilisateur |

</div>

Commencez par vérifier l'écran physique, son interface et le processus de mise à jour de base. Consultez la [Vue d'ensemble des graphismes](overview.md) et le [Contrôleur d'affichage](display-controller.md) : une démo LVGL ne suffit pas à démontrer que l'architecture graphique finale est prête.

## Choisir avec soin la version LVGL { #choose-the-lvgl-version-deliberately }

L'index officiel inclut des exemples LVGL v8 et LVGL v9. Gardez le projet UI généré, l'exemple de référence et la configuration du SDK sur la même version majeure de LVGL. Ne transférez pas vers une autre version majeure un écran généré ou un widget personnalisé sans revue explicite du portage.

Pour la première mise en route de la carte, utilisez la démo ou l'exemple officiel correspondant à la version LVGL sélectionnée dans sa configuration SDK. Vous pourrez ainsi vérifier le panneau, les tampons, les entrées et le chemin d'ordonnancement avant de commencer le développement propre à l'application.

!!! warning "Sauvegardez la carte avant d'utiliser l'exemple SJPG de LVGL v8"
    Dans le projet des exemples officiels v8, le chemin facultatif qui charge des fichiers SJPG depuis une carte TF appelle `dfs_mkfs()` sur la zone racine de la carte si le montage échoue ; des données peuvent alors être effacées. Sauvegardez la carte avant d'activer et d'exécuter ce chemin, puis vérifiez le code de votre révision du SDK. Ne généralisez pas cet avertissement à tous les exemples LVGL v8 ou v9 : vérifiez le montage et le formatage propres à chaque projet.

## Générer l'UI avec gui_guider, SquareLine et EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

Utilisez un exemple d'outil de conception d'UI si l'équipe a besoin d'un éditeur visuel pour créer la hiérarchie des écrans, les styles et les ressources. L'index comprend des exemples de **gui_guider**, **SquareLine** et **EEZ Studio**.

Avant d'importer le résultat d'un générateur dans le produit, vérifiez la version du code généré, la résolution d'écran, la profondeur de couleur, les chemins des ressources et la responsabilité des callbacks.

Les exemples sources gui_guider et EEZ Studio spécifient tous deux LVGL v8. SquareLine exige aussi le thème par défaut utilisé par le code généré. Incluez les sous-répertoires générés dans la compilation et suivez les étapes documentées de conversion eZip facultative ; une simple copie de fichiers ne suffit pas.

Le code généré accélère le développement de l'UI, mais ne remplace ni le pilote d'affichage, ni la stratégie de tampons, ni les pilotes d'entrée, ni la politique basse consommation, ni les tests d'intégration. Séparez les fichiers générés de la logique applicative écrite à la main afin qu'une nouvelle exportation n'écrase pas les modifications du produit sans avertissement.

## Comportements des widgets et interactions { #widget-and-interaction-patterns }

Utilisez les exemples ciblés LVGL v8 pour étudier un comportement d'UI. Leur portée varie : Multlist est une démo complète du framework applicatif, pas un test minimal de widget.

- **Basechart** trace des séries de données ; **Baselabel** relie des sources de données à un texte actualisé périodiquement.
- **Follow** présente un menu d'icônes piloté par la gravité ; **Select**, des états de sélection ; **Sector**, une portion angulaire d'image liée à une valeur.
- **Imgarray** compose des valeurs numériques avec des glyphes sous forme d'images ; **Imgbar** découpe une image de premier plan pour afficher une progression.
- **Mulroller** est un sélecteur à rouleau personnalisable par callbacks ; **Multroller**, une version plus simple pour des options textuelles.
- **Multlist** couvre listes, pagination, transitions, cache de ressources et cycle de vie des pages ; **Multslider** affiche une valeur ou un libellé court sur la poignée du curseur.
- **Multanim** présente des transitions dont certaines dépendent du support GPU/VGLite ; **Timeline** coordonne les animations sur un axe temporel commun.

La prise en charge des cartes n'est pas uniforme pour ces exemples ciblés. Par exemple, les listes explicites **Supported Boards** de Multanim et Multlist citent `sf32lb52-lcd_n16r8` et `sf32lb52-lchspi-ulp`, tandis que des instructions génériques ultérieures mentionnent des cibles 52x/56x/58x plus larges et prennent `eh-lb563` comme exemple de compilation. Ces indications ne définissent pas le même périmètre. Consultez le README concerné et la configuration actuelle du projet ; ne déduisez pas la compatibilité des autres widgets à partir de l'index ou de l'URL.

Utilisez l'un de ces exemples lorsqu'un contrôle particulier présente un risque pour le produit. Limitez le premier portage : exécutez le contrôle d'origine, utilisez les données du produit, puis mesurez le coût de redessin et l'utilisation mémoire avant de l'intégrer à un écran plus complexe. Même plusieurs contrôles visuellement simples peuvent fortement solliciter le framebuffer, la bande passante de lecture des ressources ou l'ordonnancement des événements d'entrée.

## Charges liées aux ressources, aux animations et aux médias { #asset-animation-and-media-workloads }

Les exemples de chargement dynamique eZip sont disponibles pour LVGL v8 et LVGL v9. Utilisez la version correspondant à l'application pour valider le chargement dynamique de ressources compressées avant de l'adopter à grande échelle. L'article [eZip](ezip.md) explique le rôle de la compression des ressources dans la chaîne graphique.

Pour les ressources animées GIF/APNG, SiFli propose aussi les exemples [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) et [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html), dans la rubrique **Multimedia > AGIF**. Les deux README citent `eh-lb525` ; la [matrice de compilation GCC](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) actuelle enregistre également les deux chemins de projet sous `devkit_lcd_boards`. Cette inscription indique une cible de compilation, pas une validation à l'exécution sur toutes les cartes du groupe. Vérifiez la cible exacte et la révision du SDK avant de prendre l'un de ces exemples comme base produit.

Les exemples eZip dynamiques comparent l'accès par chemin de fichier au préchargement en SRAM ou PSRAM. Ce dernier consomme plus de mémoire et peut réduire les lectures répétées. Générez les ressources pour la version LVGL v8/v9 correspondante. Le chemin documenté de v9 exige un préfixe de lecteur tel que `A:/`, contrairement à v8. Vérifiez le stockage réel et la configuration de la lettre de lecteur. Le README v9 cite explicitement `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi` et `sf32lb58-lcd_n16r32n1_qspi` ; ne transposez pas cette liste à v8 et n'en déduisez pas la prise en charge d'autres cartes. Pour SF32LB57 uniquement, la documentation eZip impose l'option de conversion `-winsize 2048`.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [lecture vidéo locale](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html) et [lecture en streaming](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html) testent des chaînes de contenu différentes, sans ordre fixe de complexité. Le README Lottie marque l'exemple comme **non vérifié**, cite `eh-lb563` et les séries SF32LB52x/SF32LB56x, et l'entrée correspondante est commentée dans la matrice GCC actuelle. Considérez cette liste comme une indication non vérifiée, pas comme un ensemble de cibles validées. Le README de lecture vidéo locale cite explicitement `eh-lb523` et `sf32lb52-lcd_n16r8`, mais contient aussi des instructions génériques plus larges ; l'entrée du projet est commentée dans la matrice GCC actuelle. Vérifiez la révision exacte du SDK avant d'appliquer ces indications à une autre cible. L'exemple lit une vidéo H.264 dans `disk/video_example.mp4` ; si la carte TF est montée, le fichier `video_example.mp4` à la racine de la carte est lu en priorité. Le README de streaming cite uniquement `sf32lb52-lchspi-ulp` ; il accède au réseau via le partage Bluetooth PAN d'un téléphone et utilise FFmpeg. Ce n'est pas un exemple de streaming vidéo BLE.

Évaluez chaque exemple comme une charge système. Avec le Bluetooth, les capteurs et l'interface d'affichage du produit actifs, mesurez le stockage des ressources ou du flux, le temps de décodage, la fréquence de mise à jour des images, l'utilisation de la PSRAM/SRAM, la bande passante d'affichage et le courant consommé. Le coût réel dépend du contenu, de la résolution, de la configuration du décodeur et des tampons.

Une démo courte et fluide ne prouve pas que le système peut maintenir une animation prolongée. Pour valider le produit, utilisez un contenu de durée réaliste et la politique de rafraîchissement réellement prévue pour le panneau.

## Polices et changement de langue à l'exécution { #fonts-and-runtime-language-switching }

L'[exemple FreeType](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html) charge des polices TrueType depuis le système de fichiers et permet de changer de police et de taille à l'exécution. Son README indique qu'il a été vérifié sur `sf32lb52-lchspi-ulp` ; les autres cartes nécessitent une partition `FS_REGION` et suffisamment de heap système, et ne sont donc pas validées par cet exemple. Il prévoit une police intégrée de secours en cas d'échec, des contrôles de mémoire dynamique et la libération de l'ancienne police lors du changement. Vérifiez les caractères couverts et la mémoire utilisée avec les langues et tailles du produit ; limitez les grandes polices CJK aux caractères nécessaires plutôt que de supposer que la police complète tient en mémoire. La chaîne documentée exige des contours TrueType, pas des polices OpenType à contours CFF. Ne libérez pas une police encore référencée par un widget ou un style ; effectuez les changements dans le thread LVGL. Toute modification des polices fournies nécessite de régénérer et programmer l'image du système de fichiers `fs_root.bin`. Mettre à jour uniquement l'application ne remplace pas ces fichiers.

Les exemples multilingues pour [LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html) et [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html) couvrent les langues intégrées, l'installation de packs externes, le changement à l'exécution, une nouvelle recherche dans le répertoire d'installation et la sauvegarde du choix via `share_prefs`. Le README v8 cite `sf32lb52-lchspi-ulp` ; vérifiez séparément la liste de cibles du README v9 au lieu de lui attribuer cette carte par extrapolation. Les entrées JSON ou XLSX produisent des ressources compilées pour les langues intégrées ou des packs binaires externes. Conservez les mêmes clés de traduction et vérifiez la couverture des polices. Testez le changement, la persistance après redémarrage, les ressources manquantes et la mise à jour du système de fichiers. Suivez les chemins et la configuration documentés pour chaque version ; ne supposez pas qu'ils sont identiques au seul motif que les exemples ont des fonctions similaires.

## Boussole, jeux et interfaces de montre connectée { #compass-games-and-watch-interfaces }

Les exemples de boussole électronique et d'interface de montre associent affichage et fonctions applicatives. Ils permettent d'étudier les écrans, la temporisation des entrées et des animations et les charges graphiques plus importantes. L'index des jeux renvoie à un exemple de Démineur. Son README cite `eh-lb563` et les séries SF32LB52x/56x, mais pas 58x ; vérifiez sa prise en charge dans la version actuelle du SDK avant de l'utiliser sur 58x.

L'exemple documenté de boussole utilise un magnétomètre trois axes MMC56x3 relié par I2C sur `sf32lb52-lchspi-ulp`. Vérifiez le pilote, le câblage et l'étalonnage pour le produit réel ; l'affichage d'un cap ne suffit pas à démontrer sa précision.

Les jeux et interfaces de montre constituent des points de départ pour concevoir la navigation entre écrans, mais le produit doit encore définir la gestion des données, le comportement basse consommation, la stratégie de réveil de l'écran, les notifications et la reprise après défaillance.

Le README de montre v8 cite les séries LCD SF32LB52x, SF32LB56x et SF32LB58x, ainsi que `sf32lb52-lchspi-ulp` ; celui de v9 cite les trois séries LCD. Les deux excluent `520-hdk` et précisent que la démo de rotation 3D n'est pas disponible sur SF32LB55x. Vérifiez les partitions de ressources lors de l'ajout de polices : l'exemple v8 peut dépasser la zone allouée.

## Adapter un exemple en conservant les éléments de preuve { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tableau : Vérifications pour adapter un exemple LVGL au produit</em></div>

<div align="center" markdown>

| Étape | Éléments à consigner | Pourquoi c'est important |
|:-----|:-----------------|:---------------|
| Compiler l'exemple d'origine | Révision du SDK, nom de la carte, configuration et journal de compilation | Conserve une référence dont le fonctionnement est connu |
| L'exécuter sur le matériel | Photo ou vidéo, journal série, comportement du panneau et du tactile | Confirme la chaîne réelle d'affichage et d'entrée |
| Ajouter un élément du produit | Journal des modifications et mesures de la fréquence d'images et du comportement de rafraîchissement | Permet de relier les régressions aux modifications concernées |
| Tester la charge du produit | Réactivité de l'UI avec Bluetooth, capteurs, stockage et transitions basse consommation | Révèle des limites d'intégration qu'une démo isolée ne montre pas |
| Consigner les limites finales | Utilisation des tampons, placement mémoire, fréquence d'images, consommation et défaillances connues | Transforme l'exemple en référence technique exploitable pour la maintenance |

</div>

## Ressources associées { #related-resources }

- [Vue d'ensemble des graphismes](overview.md) pour choisir l'affichage, planifier le framebuffer, intégrer LVGL et évaluer les compromis système.
- [Contrôleur d'affichage](display-controller.md) pour le contrôleur, les tampons et le chemin de transfert des pixels vers le panneau (flush).
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md) et [TurboPixel](turbopixel.md) pour l'accélération et la compression graphiques SF32.
- [Exemples](../../develop/examples/index.md) pour le catalogue transversal d'exemples du SDK.
- [Index des exemples LVGL de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) pour consulter la liste officielle et la configuration à jour.
