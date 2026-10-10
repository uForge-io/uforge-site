---
icon: lucide/palette
title: "Vue d'ensemble des graphismes"
description: "Concevoir une interface graphique sur SF32 : choix de l'écran, stratégie de framebuffer, intégration LVGL, accélération ePicasso et organisation de la mémoire."
tags:
  - Graphismes
---

# Vue d'ensemble { #graphics-overview }

## Planifier l'architecture graphique { #overview }

Ce guide explique comment créer des interfaces graphiques réactives sur les composants SF32. Il traite des décisions de conception qui comptent pour le produit : choix de l'écran, stratégie de framebuffer, intégration de LVGL, accélération matérielle ePicasso, organisation de la mémoire et comportement de rafraîchissement.

Les composants SF32 ciblent les produits AIoT compacts et les appareils portables, soumis à de fortes contraintes de consommation électrique, de mémoire et d'encombrement du circuit imprimé. L'interface doit pourtant rester fluide. Le pipeline graphique distingue la gestion des ressources, la composition des pixels, la compression facultative du framebuffer et la sortie vers l'écran. Comprendre le rôle de chaque étape aide à choisir les optimisations adaptées.

Consultez cette page pour les décisions d'architecture UI qu'il sera coûteux de modifier par la suite : écran et interface, stratégie de framebuffer, profondeur de couleur, transparence, emplacement des ressources et politique de rafraîchissement. Les articles associés détaillent la mise en œuvre de chaque étape.

## Flux graphique SF32 { #sf32-graphics-flow }

Le parcours habituel des ressources d'affichage est le suivant :

<div align="center"><em>Schéma : parcours des ressources graphiques jusqu'à l'affichage</em></div>

```text
Images, polices et animations sources
        │
        ▼
GraphicsTool convertit les ressources prises en charge en eZip ou eZip-A
        │
        ▼
Ressources compressées stockées en NOR Flash, PSRAM, NAND ou dans un système de fichiers
        │
        ▼
Le décodeur matériel eZip décompresse une ressource lorsque nécessaire
        │
        ▼
LVGL ou un autre framework UI + pilote graphique/d'affichage
        │
        ├── Rendu de secours par le CPU
        │
        └── Accélération des opérations sur les pixels par ePicasso
        │
        ▼
Bitmap final rendu dans un tampon de dessin ou un framebuffer
        │
        ├── Chemin d'affichage non compressé
        │
        └── Facultatif : extDMA le compresse au format TurboPixel
                    │
                    ▼
             Framebuffer TurboPixel stocké en PSRAM
        │
        ▼
Le contrôleur d'affichage transfère les pixels vers l'écran
        │
        ▼
Écran SPI / QSPI / 8080 / RGB / MIPI DSI / EPD / JDI
```

Ce pipeline est configurable : un produit n'a pas nécessairement besoin d'eZip, d'ePicasso, de TurboPixel ou d'un framebuffer complet. La disponibilité et le raccordement des fonctions dépendent du composant, du SDK, de l'interface d'affichage, de l'écran et de la configuration du pilote. L'en-tête LCDC actuel d'OpenSiFli définit `LCDC_SUPPORTED_COMPRESSED_LAYER` uniquement si `HAL_EXTDMA_MODULE_ENABLED` est activé et si la condition liée à la famille est remplie ; SF32LB52x et SF32LB57x sont exclus. Un commentaire du code précise également que le chemin LCPU n'est pas activé. Le tableau LCDC publié avec le SDK indique que la décompression des couches compressées n'est pas prise en charge sur SF32LB55x. Il faut donc considérer le support sur 55x comme conditionnel, et non comme une chaîne complète validée en fonctionnement. Vérifiez la version exacte du SDK, le cœur, la configuration de compilation et le matériel cible. Voir [TurboPixel](turbopixel.md#availability-in-the-sf32-family).

<div align="center"><em>Rôle des différentes étapes du pipeline graphique SF32</em></div>

<div align="center" markdown>

| Bloc | Position dans le flux | Responsabilité principale | Il ne remplace pas |
|:---|:---|:---|:---|
| **eZip / eZip-A** | Avant le rendu, lors de la lecture des ressources stockées | Décompresse sans perte les ressources graphiques eZip prises en charge, notamment les images fixes et les animations. | Le moteur de rendu, le framebuffer final ou le contrôleur d'affichage. |
| **ePicasso** | Pendant le rendu et la composition | Accélère les opérations prises en charge de copie, remplissage, mélange, transformation et composition des pixels en mémoire. | La compression des ressources ou leur transfert vers l'écran. |
| **TurboPixel** | Après le rendu et avant la sortie vers l'écran, sur les composants compatibles | Utilise extDMA pour appliquer au bitmap final une compression avec perte à taux fixe, ce qui réduit la capacité PSRAM nécessaire et le trafic de lecture de l'écran. L'en-tête actuel expose la fonction de couche compressée sur SF32LB55x, SF32LB56x et SF32LB58x lorsque extDMA est activé, et exclut SF32LB52x et SF32LB57x ; un commentaire indique que le chemin LCPU n'est pas activé. Le tableau publié marque 55x comme non pris en charge : vérifiez donc le cœur, la configuration du SDK et le chemin sur le matériel cible avant de vous y fier. | La compression sans perte des ressources ou le rendu des pixels. |
| **Contrôleur d'affichage** | Étape finale de sortie | Décompresse les données TurboPixel lorsque cette voie est activée et transfère les pixels préparés par l'interface de l'écran. | La décompression des ressources eZip ou la composition graphique. |

</div>

Le code applicatif décrit l'état et le comportement de l'interface. Le framework UI gère les widgets, les zones à redessiner et le dessin. Le pilote graphique/d'affichage choisit entre le CPU et ePicasso et coordonne les tampons ; le contrôleur d'affichage assure le transfert vers l'écran. Pour les détails de mise en œuvre, consultez [ePicasso](epicasso-gpu.md), [eZip](ezip.md) et [TurboPixel](turbopixel.md).

## Choisir d'abord l'écran { #choose-the-display-first }

Le choix de l'affichage affecte presque chaque décision graphique. Avant d'optimiser le code, définissez clairement les exigences du panneau :

- Résolution.
- Profondeur de couleur.
- Taux de rafraîchissement.
- Type d'interface.
- Exigences du contrôleur tactile.
- Alimentation du rétroéclairage ou de l'écran.
- Si le rafraîchissement partiel est pris en charge.
- Si le panneau dispose d'une GRAM interne.
- Si un affichage permanent basse consommation (always-on display) est requis.

Un petit écran AMOLED SPI ou QSPI ne se comporte pas comme un écran RGB, MIPI DSI ou EPD, ni comme un écran mémoire JDI. Un même framework UI peut piloter plusieurs types d'écran, mais la stratégie de tampon et la politique de rafraîchissement optimales varient selon le modèle.

Pour choisir l'interface, concevoir le chemin de flush et mettre en route l'écran, consultez [Contrôleur d'affichage](display-controller.md).

## Partir d'un exemple LVGL validé { #start-from-a-verified-lvgl-example }

Avant de concevoir les écrans du produit, choisissez un exemple du SDK qui valide déjà son point graphique le plus risqué. [Exemples LVGL du SDK](lvgl-sdk-examples.md) classent les exemples officiels — base, outil de conception, widgets, ressources compressées, animation et multimédia, boussole, jeux et interface de montre — selon la tâche d'ingénierie qu'ils couvrent. La page précise aussi quelles hypothèses concernant la carte, la version, l'écran, la mémoire et les performances doivent être vérifiées à nouveau lors de l'adaptation au produit.

## Choisir le composant SF32 adapté { #pick-the-right-sf32-device }

Choisissez la puce en fonction de l'affichage et de la charge de travail UI, pas seulement de la fréquence CPU.

<div align="center"><em>Tableau : Choix du composant SF32</em></div>

<div align="center" markdown>

| Exigence | Repère pour le choix du composant |
|:------------|:-------------------------|
| Produit Bluetooth de base avec une interface utilisateur simple | SF32LB52x |
| Montre connectée d'entrée de gamme, badge, étiquette, HMI simple | SF32LB52x |
| Produit BLE portable avec une interface affichant de nombreuses données issues des capteurs | SF32LB55x |
| Écran RGB ou interface LVGL plus élaborée | SF32LB56x |
| Charges audio/graphiques adaptées à un déport sur l'ACPU | SF32LB57x ; vérifier la prise en charge du SDK et l'affectation des tâches |
| Affichage haute résolution ou graphisme avancé | SF32LB56x ou SF32LB58x |
| Écran MIPI DSI | SF32LB55x ou SF32LB58x, selon le panneau et la classe de produit |
| Interface haut de gamme avec graphismes, audio, IA et grande capacité mémoire | SF32LB58x |

</div>

Les contraintes les plus importantes sont l'interface d'affichage, la résolution, la capacité mémoire, la génération de l'accélérateur graphique, les broches disponibles et le budget énergétique.

## Calculer la taille du framebuffer et la bande passante { #framebuffer-and-bandwidth-calculator }

Estimez le coût de mémoire et de transfert avant de choisir un panneau ou un style d'animation :

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Exemples :

<div align="center"><em>Tableau : Taille du framebuffer et trafic d'affichage</em></div>

<div align="center" markdown>

| Écran | Format | Un framebuffer complet | Trafic à 30 images/s |
|:------|:-------|----------------:|--------------------------:|
| 240 x 240 | RGB565 | ~113 KiB | ~3,46 MB/s |
| 390 x 390 | RGB565 | ~297 KiB | ~9,13 MB/s |
| 454 x 454 | RGB565 | ~403 KiB | ~12,37 MB/s |
| 480 x 480 | RGB888 | ~675 KiB | ~20,74 MB/s |

</div>

La taille des tampons est indiquée en KiB (1 024 octets) et la bande passante en MB/s décimaux (1 000 000 octets/s). Ces valeurs correspondent aux données brutes des pixels. Elles ne tiennent pas compte de la surcharge des commandes, de l'alignement, de la maintenance du cache, de la lecture des ressources, du mélange ni des autres transferts de données du système. Si le produit utilise aussi l'audio Bluetooth, l'IA ou la PSRAM externe, prévoyez une marge supplémentaire.

## Comprendre vos tampons { #understand-your-buffers }

Au final, une interface graphique est représentée par des pixels en mémoire. Voici les principaux types de tampons :

<div align="center"><em>Tableau : Comprendre vos tampons</em></div>

<div align="center" markdown>

| Type de tampon | Objectif |
|:------------|:--------|
| **Tampon de dessin** | Zone temporaire dans laquelle LVGL ou le pilote graphique dessine les parties modifiées. |
| **Framebuffer** | Mémoire contenant les pixels de l'écran et servant de source à son affichage. |
| **Framebuffer partiel** | Tampon de taille réduite, utilisé lorsque la mise en mémoire tampon de tout l'écran est trop coûteuse. |
| **Tampon de ressources** | Données d'images, de polices, d'icônes ou de ressources décodées. |
| **Couche intermédiaire** | Surface temporaire pour le mélange, l'animation ou la composition. |

</div>

Un framebuffer plein écran est pratique, mais peut consommer trop de SRAM sur les grands écrans. Un tampon RGB565 de 454 × 454 contient 412 232 octets (environ 412 kB ou 403 KiB) ; deux tampons nécessitent le double. La mémoire requise augmente rapidement avec la résolution et la profondeur de couleur.

Si la mémoire est limitée, utilisez des tampons de dessin partiels et ne mettez à jour que les zones modifiées. Si l'animation est importante et que la mémoire le permet, un framebuffer complet ou le double buffering peut rendre l'interface plus fluide.

## Choisir la profondeur de couleur avec soin { #choose-color-depth-carefully }

La profondeur de couleur influe sur la qualité visuelle, la mémoire utilisée et la bande passante du bus.

<div align="center"><em>Tableau : Choisir la profondeur de couleur avec soin</em></div>

<div align="center" markdown>

| Format | Octets par pixel | Remarques |
|:-------|----------------:|:------|
| **RGB565** | 2 | Format courant pour les interfaces embarquées ; bon compromis entre qualité, mémoire et bande passante. |
| **RGB666** | 3 ou compacté | Meilleure précision des couleurs, au prix d'une bande passante accrue. |
| **RGB888** | 3 | Qualité d'image supérieure, mais davantage de mémoire et de trafic. |
| **RGB111 / formats monochromes** | Selon le composant | Adaptés aux écrans simples ou à très basse consommation, par exemple aux applications EPD/JDI. |

</div>

Pour la plupart des produits portables et des HMI compactes, RGB565 constitue un bon point de départ, sauf si l'écran, la qualité d'image visée ou les exigences du produit imposent un format supérieur.

## Transparence, alpha et composition des couches { #transparency-alpha-and-layer-composition }

La transparence est représentée par le facteur **alpha**, qui détermine la contribution du pixel de premier plan lorsqu'il est composé avec le pixel d'arrière-plan. L'alpha est indépendant des canaux de couleur RGB. Un pixel opaque a une valeur alpha de 1 (ou de 255 dans un canal alpha sur 8 bits) ; un pixel entièrement transparent a une valeur de 0.

Pour une composition source-over sur un **fond opaque**, avec des couleurs de premier plan **non prémultipliées par alpha** et un alpha normalisé entre 0 et 1, chaque canal RGB de sortie se calcule comme suit. Cette formule simplifiée ne calcule pas l'alpha de sortie d'une destination transparente :

```text
output = foreground × alpha + background × (1 − alpha)
```

Par exemple, avec une valeur alpha de 50 %, un pixel d'icône apporte la moitié de sa couleur et laisse apparaître la moitié de l'arrière-plan. La répétition de cette opération compose les couches de l'interface : arrière-plan, images, texte, commandes translucides, ombres et animations. Le bitmap final ainsi composé passe ensuite par les étapes du framebuffer et du contrôleur d'affichage décrites plus haut.

<div align="center"><em>Tableau : Modes alpha et leur usage</em></div>

<div align="center" markdown>

| Mode alpha | Signification | Usage typique | Considération d'intégration |
|:-----------|:--------|:------------|:--------------------------|
| **Alpha par pixel** | Chaque pixel possède sa propre valeur alpha. | Icônes et texte anticrénelés, bords adoucis, ombres, ressources de type PNG. | Préserve une transparence détaillée, mais augmente la taille des données source et le coût du mélange. |
| **Alpha global** | Une même valeur alpha s'applique à un objet ou à une couche entière. | Fondu d'un écran, d'une boîte de dialogue ou d'une image. | Efficace pour un fondu uniforme, mais ne permet pas d'adoucir les bords à l'intérieur de l'objet. |
| **Alpha binaire** | Chaque pixel est soit entièrement visible, soit entièrement transparent. | Masques et glyphes simples. | Moins complexe, mais les bords peuvent être crénelés sans anticrénelage. |

</div>

RGB565 ne possède pas de canal alpha ; il sert donc généralement aux surfaces de dessin opaques et aux framebuffers finaux. Les ressources source et les couches intermédiaires qui nécessitent de l'alpha utilisent souvent un format doté d'un canal alpha, comme ARGB8888, ou associent une image couleur à un masque alpha séparé. Le pilote doit utiliser les formats effectivement pris en charge par le SDK, le chemin d'affichage et l'accélérateur sélectionné.

Deux représentations de l'alpha sont courantes. Avec l'**alpha non prémultiplié** (straight alpha), les valeurs RGB décrivent la couleur d'origine et l'alpha est appliqué lors du mélange. Avec l'**alpha prémultiplié**, les valeurs RGB ont déjà été multipliées par l'alpha ; l'équation source-over devient `output = premultiplied_foreground + background × (1 − alpha)`. Ne confondez pas ces deux représentations : interpréter des données non prémultipliées comme si elles étaient prémultipliées, ou inversement, crée des halos clairs ou sombres sur les bords.

Le mélange alpha lit les pixels de premier plan et de destination, puis écrit le résultat. Il génère donc plus de trafic mémoire qu'une simple copie ou qu'un remplissage opaque. Utilisez ePicasso si le pilote prend en charge l'opération de mélange et les formats de pixel choisis ; sinon, conservez une solution de repli par CPU. Si la bande passante PSRAM ou le budget de consommation électrique sont limités, limitez les couches translucides plein écran, ne mettez à jour que les zones modifiées et évitez les surfaces intermédiaires inutiles.

## Intégrer LVGL { #integrating-lvgl }

LVGL est un framework pratique pour les interfaces des appareils SF32. Il fournit des widgets, des styles, la gestion des entrées, des animations, le suivi des zones à redessiner et des interfaces pour les pilotes d'affichage.

Une intégration LVGL typique nécessite :

- Un callback flush du pilote d'affichage.
- Un ou plusieurs tampons de dessin.
- Une source de ticks qui cadence LVGL.
- Des pilotes de périphérique de saisie pour le tactile, les boutons, les encodeurs ou les gestes.
- La gestion des ressources graphiques, notamment les images et les polices.
- Des points d'extension facultatifs pour l'accélération matérielle ePicasso.

Le callback flush relie le rendu à la sortie écran. Le fonctionnement du contrôleur et du DMA est décrit dans [Contrôleur d'affichage](display-controller.md#controller-buffers-and-flush-paths).

## Choix d'intégration de LVGL { #lvgl-porting-decisions }

Définissez les points suivants avant de peaufiner les écrans :

<div align="center"><em>Tableau : Décisions de portage LVGL</em></div>

<div align="center" markdown>

| Décision | Recommandation |
|:---------|:--------------------|
| Source de tick | Utilisez une base de temps système stable qui reste correcte après l'entrée en veille et le réveil. |
| Callback flush | Transférez les zones nécessaires et attendez la notification de fin du DMA ou du pilote d'affichage. |
| Nombre de tampons de dessin | Choisissez un ou deux tampons selon la latence visée et le budget mémoire. |
| Mise à jour des zones invalidées | Ne fusionnez les petites zones que si cela réduit le coût total du transfert. |
| Périphériques d'entrée | Intégrez l'écran tactile, les boutons et l'encodeur via les pilotes d'entrée LVGL, plutôt que par interrogation répétée dans l'application. |
| Accélération matérielle | Activez uniquement les opérations prises en charge par le SDK et le pilote, et conservez un repli par CPU. |
| Gestion du cache | Gérez le nettoyage et l'invalidation du cache des tampons partagés à la frontière entre le framework et le pilote. |

</div>

Une intégration LVGL bien conçue laisse le code des écrans décrire l'interface, tandis que le pilote gère le transfert, la synchronisation, l'accélération et le cache.

## Accélération avec ePicasso { #using-epicasso-acceleration }

ePicasso est utile lorsque l'interface effectue de nombreuses opérations répétitives sur les pixels, par exemple :

- Les remplissages de rectangle.
- La copie et le blit d'images.
- Le mélange alpha.
- La mise à l'échelle d'image.
- La rotation ou transformation de régions d'image prises en charge.
- La composition de couches.
- La conversion de format de pixel lorsque prise en charge par le pilote.

Une bonne intégration accélère les opérations fréquentes et volumineuses, tout en conservant un chemin de repli par CPU pour les cas non pris en charge. Ne partez pas du principe que chaque effet de style ou widget LVGL est exécuté par le matériel. Mesurez les écrans réellement utilisés par le produit.

### Quand l'accélération aide le plus { #when-acceleration-helps-most }

ePicasso aide généralement le plus lorsque :

- De grandes régions sont remplies, copiées, mélangées, mises à l'échelle ou transformées.
- L'UI utilise des icônes transparentes, des masques de texte, des ombres, des superpositions ou des transitions animées.
- Sans accélération, le CPU consacrerait une grande partie du temps de chaque image à traiter les pixels dans des boucles.
- Le placement mémoire et les formats de pixel correspondent à ce que l'accélérateur peut gérer efficacement.

### Quand l'accélération apporte peu { #when-acceleration-may-not-help-much }

L'accélération matérielle peut apporter peu lorsque :

- La région mise à jour est très petite.
- Le goulot d'étranglement est la bande passante de transfert vers le panneau, pas le rendu.
- Les ressources utilisent des formats non pris en charge ou nécessitent une conversion coûteuse.
- Les tampons sont placés dans une mémoire lente sans bande passante suffisante.
- La surcharge de maintenance du cache domine l'opération.

## Stratégie d'allocation mémoire { #memory-placement-strategy }

Les performances graphiques sont souvent limitées par les transferts de données en mémoire. Choisissez soigneusement l'emplacement des tampons :

- Placez les tampons de dessin fréquemment utilisés en SRAM rapide si possible.
- Gardez les grands framebuffers en PSRAM seulement lorsque la SRAM est insuffisante.
- Stockez les grandes images et polices en Flash ou en PSRAM, mais tenez compte de la latence d'accès.
- Évitez de convertir les ressources à répétition pendant l'exécution.
- Gardez les tampons accessibles par DMA alignés selon les recommandations du SDK.
- Utilisez des ressources compressées ou à couleurs indexées lorsqu'elles réduisent le trafic mémoire total et le coût de décodage.

Lorsque le CPU et le matériel graphique ou d'affichage partagent des tampons, suivez les règles du SDK concernant le cache et la propriété des tampons. Avant une lecture matérielle de données écrites par le CPU, effectuez un clean des lignes concernées et terminez la synchronisation requise. Avant une écriture matérielle, préparez le tampon pour éviter qu'une ligne modifiée du cache CPU ne soit ensuite réécrite en mémoire et n'écrase le résultat. Attendez la fin du transfert, puis invalidez les lignes obsolètes avant que le CPU lise le résultat. Respectez l'alignement des lignes de cache et les données voisines ; ne modifiez pas un tampon détenu par le matériel. Utilisez les routines prises en charge par le SDK : clean et invalidate ne sont pas interchangeables.

Pour le rafraîchissement partiel, le comportement propre à chaque écran et la séquence de mise en route, consultez [Contrôleur d'affichage](display-controller.md).

## Préparer les ressources graphiques { #asset-preparation }

Des ressources bien préparées peuvent accélérer l'interface avant même l'optimisation du code.

Suivez ces recommandations :

- Faites correspondre les dimensions d'image à la taille réelle à l'écran.
- Évitez de mettre à l'échelle de grandes images à chaque trame.
- Pré-rendez les ombres, dégradés ou arrière-plans complexes lorsque possible.
- Utilisez l'alpha uniquement là où la transparence est nécessaire.
- Préférez des jeux d'icônes et sous-ensembles de polices partagés.
- Retirez les glyphes inutilisés des polices.
- Conservez les ressources fréquemment utilisées dans des formats traités efficacement par le pipeline graphique.

Dans un produit multilingue, les polices peuvent représenter une part importante de la mémoire réservée à l'interface. Prévoyez tôt les polices de remplacement, les sous-ensembles de glyphes et la mise en page du texte.

## Stratégie d'animation { #animation-strategy }

La fluidité des animations dépend du budget de temps par image, de la bande passante de l'écran, du coût du rendu et de la consommation électrique.

Une approche pratique :

- N'animez que ce que les utilisateurs remarquent.
- Gardez les régions animées petites.
- Préférez les transformations ou changements d'opacité qui correspondent bien à l'accélération.
- Évitez les effets coûteux de flou, d'ombre ou de transparence plein écran à chaque trame.
- Réduisez la fréquence d'images pour les effets non critiques.
- Arrêtez les animations lorsque l'écran est atténué, couvert ou inactif.

Une interface pour appareil portable n'a pas besoin d'animations de type bureau partout. Quelques transitions rapides et claires offrent généralement une meilleure expérience que de nombreux effets énergivores qui font chuter la fréquence d'images.

## Matrice de validation graphique { #graphics-validation-matrix }

Utilisez des écrans de test reproductibles au lieu de vous fier à une appréciation subjective (« assez fluide ») :

<div align="center"><em>Tableau : Matrice de validation graphique</em></div>

<div align="center" markdown>

| Écran de test | Éléments sollicités |
|:------------|:-----------------|
| Aplat de couleur et barres colorées | Format de pixel, ordre des octets et chemin de flush. |
| Écran riche en texte | Mémoire des polices, cache des glyphes et rafraîchissement partiel. |
| Grille d'icônes avec alpha | Mélange, bande passante des ressources et chemin ePicasso. |
| Liste défilante | Zones à redessiner, bande passante de transfert et latence d'entrée. |
| Transition plein écran | Budget de temps par image, double buffering et bande passante de l'écran. |
| Écran atténué ou inactif | Arrêt des animations, rétroéclairage et demandes de gestion de l'énergie (PM vote). |
| Coexistence au pire cas | Bluetooth, audio ou IA actifs pendant la mise à jour de l'interface. |

</div>

Pour chaque écran, relevez le temps de rendu, le temps de flush, la charge CPU et la consommation électrique. Si vous ne mesurez que le temps total d'une image, il sera difficile de déterminer si le goulot d'étranglement se situe dans LVGL, ePicasso, la mémoire ou l'interface de l'écran.

## Diagnostiquer les performances graphiques { #debugging-graphics-performance }

Lorsque l'UI est lente, identifiez le goulot d'étranglement avant de changer la conception.

<div align="center"><em>Tableau : Symptômes et pistes de diagnostic</em></div>

<div align="center" markdown>

| Symptôme | Cause possible |
|:--------|:---------------------|
| Charge CPU élevée pendant le dessin | Accélération matérielle absente, trop d'opérations logicielles sur les pixels ou widgets complexes. |
| Le rendu est terminé, mais l'écran se met à jour lentement | Bande passante de l'interface, volume transféré lors du flush ou chemin du pilote d'affichage. |
| Déchirures ou scintillements | Stratégie de tampon, synchronisation ou temporisation du rafraîchissement partiel. |
| Artefacts aléatoires | Cohérence du cache, durée de vie du tampon ou incohérence du stride/format de pixel. |
| Les écrans simples fonctionnent, mais l'animation est médiocre | Redessins plein écran, mélanges alpha importants, mise à l'échelle des ressources ou bande passante de l'écran. |
| Consommation électrique élevée lorsque l'interface est inactive | Redessins inutiles, temporisateurs, animations ou gestion de l'écran et du rétroéclairage. |

</div>

Mesurez séparément :

- Temps de rendu LVGL.
- Temps d'opération ePicasso.
- Temps de flush de l'écran.
- Charge CPU.
- Utilisation de la bande passante mémoire.
- Consommation électrique en activité, au repos et en veille.

## Erreurs courantes { #common-mistakes }

Évitez ces erreurs dès le départ : elles sont coûteuses à corriger par la suite.

- Choisir une interface de panneau avant d'estimer la bande passante.
- Utiliser des redessins plein écran pour de petits changements d'UI.
- Stocker toutes les ressources graphiques en mémoire lente sans mesurer les performances.
- Utiliser du RGB888 quand le RGB565 suffit.
- Mettre à l'échelle de grandes images à chaque trame.
- Oublier la maintenance du cache pour les tampons partagés avec le matériel.
- Supposer qu'ePicasso accélère automatiquement chaque opération d'UI.
- Utiliser trop de timers ou d'animations qui gardent le CPU éveillé.
- Ignorer la latence tactile en n'optimisant que la fréquence d'images.
- Attendre la mise en route du PCB pour valider l'initialisation du panneau.

## Liste de contrôle pour la mise en route { #bring-up-checklist }

Pour démarrer un nouveau projet graphique sur SF32, suivez cette liste :

- [ ] Confirmez la résolution, la profondeur de couleur, l'interface d'affichage et le circuit intégré du pilote d'écran.
- [ ] Vérifiez que le composant SF32 choisi prend en charge l'interface d'affichage requise.
- [ ] Estimez la mémoire nécessaire au framebuffer et aux tampons de dessin.
- [ ] Choisissez une stratégie avec framebuffer complet ou partiel et un ou deux tampons.
- [ ] Vérifiez la réinitialisation de l'écran, ses alimentations, le rétroéclairage et la séquence d'initialisation.
- [ ] Implémentez le tick LVGL, le callback flush et les pilotes d'entrée.
- [ ] Vérifiez les opérations de base : remplissage, image, texte et tactile.
- [ ] Activez l'accélération ePicasso lorsque le SDK et le pilote la prennent en charge.
- [ ] Vérifiez le nettoyage et l'invalidation du cache pour les tampons partagés.
- [ ] Mesurez le temps de rendu et de flush, la charge CPU et la consommation électrique.
- [ ] Testez les écrans au pire cas, les animations, l'activité Bluetooth et les transitions veille/réveil.

## À retenir { #key-takeaways }

- Commencez par définir l'interface d'affichage, la résolution, la profondeur de couleur et la fréquence de rafraîchissement requise.
- Utilisez LVGL ou un framework similaire pour gérer les widgets, les zones à redessiner, le dessin et les entrées.
- Accélérez les opérations courantes sur les pixels avec ePicasso, tout en conservant un chemin de repli par CPU.
- Optimisez l'emplacement des données et la stratégie de tampon autant que le code de rendu.
- Privilégiez le rafraîchissement partiel pour les panneaux limités par la bande passante et les écrans statiques d'appareils portables.
- Évaluez les performances de l'interface à l'échelle du système : CPU, ePicasso, mémoire, contrôleur et interface d'affichage, tactile et gestion de l'énergie.
