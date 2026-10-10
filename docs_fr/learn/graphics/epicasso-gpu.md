---
icon: lucide/layers-3
description: "Comment le moteur graphique ePicasso 2D/2.5D de SiFli accélère le rendu des interfaces embarquées sur SF32 et s'intègre à LVGL, à la mémoire et au contrôleur d'affichage."
tags:
  - Graphismes
---
# Moteur graphique ePicasso 2D / 2.5D { #epicasso-2d-25d-graphics-engine }

## Introduction { #introduction }

**ePicasso** est le moteur d'accélération graphique 2D/2.5D de SiFli pour les microcontrôleurs SF32. Il décharge le CPU applicatif des opérations répétitives sur les pixels qu'il prend en charge, ce qui permet aux interfaces embarquées de rester fluides et réactives et d'actualiser l'écran efficacement dans le budget énergétique d'un MCU.

Dans le flux graphique SF32, ePicasso intervient une fois les ressources accessibles au moteur de rendu et avant l'envoi du bitmap final au contrôleur d'affichage. Il accélère des opérations comme la copie d'images, le mélange de pixels, la mise à l'échelle, la rotation et la composition de couches. eZip décompresse les ressources et peut transmettre les images décodées à ePicasso ; le contrôleur d'affichage transfère les pixels préparés vers le panneau. Consultez la [vue d'ensemble des graphismes](overview.md#sf32-graphics-flow) pour suivre le parcours complet des ressources jusqu'au panneau.

En général, les applications ne programment pas directement chaque opération d'ePicasso. Un framework graphique comme **LVGL** ou une bibliothèque du fournisseur génère plutôt les commandes des tâches courantes de l'interface. Le pilote graphique SF32 confie à ePicasso les opérations prises en charge et utilise le CPU pour le rendu lorsqu'une opération ne l'est pas.

Consultez cette page lorsque le profilage de l'interface révèle que la copie, le remplissage, le mélange alpha, la mise à l'échelle, la rotation ou la composition limitent la réactivité ou augmentent la consommation d'énergie. Elle aide les ingénieurs firmware à déterminer quelles opérations peuvent être accélérées et lesquelles doivent conserver une solution de repli correcte exécutée par le CPU.

## Pourquoi l'accélération graphique matérielle est importante { #why-hardware-graphics-acceleration-matters }

Dans une interface embarquée, les performances sont souvent limitées davantage par les transferts en mémoire que par la capacité de calcul du CPU. Pour chaque pixel concerné, une simple icône semi-transparente peut nécessiter de lire la source et le framebuffer, de mélanger les pixels, puis d'écrire le résultat dans le framebuffer.

ePicasso améliore cette situation en accélérant les opérations de pixels répétitives qui apparaissent dans toute une interface utilisateur :

- Copier des blocs d'image et des régions de framebuffer.
- Remplir des rectangles et des arrière-plans d'interface.
- Appliquer le mélange alpha aux icônes, masques de texte, ombres et superpositions.
- Mettre à l'échelle les bitmaps pour des mises en page adaptatives et des animations.
- Faire pivoter ou transformer des régions d'image.
- Composer plusieurs couches en un tampon d'affichage final.
- Convertir entre les formats de pixel courants lorsqu'ils sont pris en charge par l'appareil et le pilote.

Le bénéfice ne se limite pas à la fréquence d'images : l'accélération matérielle peut réduire l'utilisation du CPU, améliorer la réactivité tactile et permettre davantage de périodes en basse consommation entre les mises à jour de l'écran.

Décharger le CPU ne garantit pas une baisse de l'énergie totale consommée. Les horloges de l'accélérateur, les accès mémoire, la synchronisation et le coût du pilote peuvent annuler le gain côté CPU. Comparez sur le matériel cible l'énergie nécessaire pour chaque mise à jour de l'écran achevée, en incluant l'énergie consommée par l'affichage et l'intervalle au repos, plutôt que de juger l'efficacité sur la seule charge CPU.

## Concepts de rendu de base { #core-rendering-concepts }

### Surfaces et framebuffers { #surfaces-and-framebuffers }

Une **surface** est une zone rectangulaire de mémoire contenant des pixels. Elle peut représenter un framebuffer plein écran, un tampon de dessin partiel, une ressource image, un canevas ou une couche intermédiaire. Les opérations ePicasso lisent généralement les pixels d'une ou plusieurs surfaces source et les écrivent dans une surface de destination.

Placez chaque surface dans une mémoire adaptée à son profil d'accès :

- Les tampons de dessin fréquemment mis à jour bénéficient souvent d'une SRAM interne rapide lorsque suffisamment d'espace est disponible.
- Les images volumineuses, les polices et les ressources d'interface peuvent résider en Flash ou en PSRAM.
- Les framebuffers plein écran pour les écrans à résolution plus élevée peuvent nécessiter de la PSRAM.
- Les tampons visibles par DMA doivent suivre les règles de mémoire et de cohérence de cache du SDK.

### Mélange des pixels { #blending }

Le mélange combine les pixels source et destination. Il est essentiel pour des éléments d'interface tels que les cartes translucides, les ombres douces, les caractères anticrénelés, les superpositions et les animations en fondu.

Les principaux cas de mélange sont :

- Le mélange à alpha constant pour faire apparaître ou disparaître une couche entière.
- Le mélange alpha par pixel pour les images de type PNG et les icônes anticrénelées.
- Le mélange à partir d'un masque pour le texte, les formes ou les ressources monochromes.

Lorsque ePicasso effectue ce mélange en matériel, le CPU n'a pas à répéter les mêmes calculs pour chaque pixel de la zone concernée.

### Mise à l'échelle et rotation { #scaling-and-rotation }

La mise à l'échelle et la rotation sont fréquentes dans les interfaces animées et adaptatives. La mise à l'échelle matérielle sert aux effets de zoom, aux vignettes d'aperçu, au redimensionnement des icônes et à l'adaptation des ressources aux différentes densités d'écran. La rotation peut servir lors d'un changement d'orientation, pour des jauges ou des éléments de cadran de montre, ainsi que dans certains effets de transition.

Ces opérations sollicitent la bande passante mémoire. Leur intérêt dépend des formats source et destination, de leur emplacement en mémoire et de la possibilité pour le pilote graphique de les associer à une fonction matérielle prise en charge.

### Composition de couches { #layer-composition }

De nombreux écrans sont composés de plusieurs couches visuelles : arrière-plan, ressources graphiques, texte, indicateurs d'état, fenêtres contextuelles et superpositions animées. La composition rassemble ces éléments pour produire l'image finale.

ePicasso est conçu pour accélérer ce type de composition 2D. Plutôt que de redessiner tout l'écran par logiciel, un framework d'interface peut ne mettre à jour que les zones invalidées et confier à l'accélérateur la composition des pixels modifiés.

## Graphisme 2D et 2.5D { #2d-and-25d-graphics }

Le terme **graphisme 2D** désigne généralement des opérations sur des images rectangulaires planes : copie, remplissage, mélange, mise à l'échelle, rotation et composition.

Le terme **graphisme 2.5D** désigne des effets dessinés dans un framebuffer 2D, mais qui ajoutent des transformations ou une impression de perspective. Dans une interface embarquée, il peut s'agir de zones d'image transformées, de transitions plus élaborées ou d'effets donnant une impression de profondeur sans pipeline de rendu 3D complet.

Dans la documentation SF32, ePicasso doit être considéré avant tout comme un **accélérateur d'interface 2D/2.5D**, et non comme un GPU 3D programmable comparable à celui d'un ordinateur de bureau. Il vise à rendre les interfaces embarquées plus fluides et plus sobres en énergie, notamment sur les objets connectés portables, les commandes intelligentes, les appareils portatifs et les tableaux de bord compacts.

## Comparaison des implémentations ePicasso { #epicasso-generation-comparison }

Comparez l'implémentation de chaque famille, pas seulement le nom du moteur. La résolution, le nombre de couches, les formats pris en charge, les fonctions eZip, la bande passante de la mémoire externe et la prise en charge des pilotes dépendent aussi du composant SF32, du boîtier, du SDK et de la conception de la carte. La [présentation du SF32LB52x par SiFli](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf) nomme le moteur ePicasso 2.0. La [fiche technique du SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) précise quatre couches de premier plan, une couche de masque dédiée et une couche d'arrière-plan monochrome ; elle décrit séparément TurboPixel comme une fonction de compression du framebuffer du contrôleur LCD. La [fiche technique SF32LB58x](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf) documente ePicasso 2.0 et un moteur vectoriel distinct, Vivante GCNanoUltraV.

<div align="center"><em>Comparaison des implémentations ePicasso</em></div>

<div align="center" markdown>

| Moteur documenté | Famille SF32 représentative | Fonctions graphiques | Caractéristiques documentées | Usages adaptés |
|:---|:---|:---|:---|:---|
| **ePicasso** | SF32LB55x | Accélération d'interface 2.5D | Rotation, mise à l'échelle et miroir horizontal matériels, ainsi que mélange alpha ; le miroir vertical n'est pas pris en charge ; flux de ressources eZip sans perte | Objets connectés portables BLE et HMI compacts nécessitant une interface plus riche qu'une conception d'entrée de gamme |
| **ePicasso 2.0** | SF32LB52x | Accélération d'interface 2D/2.5D | Décompression des ressources eZip 2.0 dans une configuration graphique optimisée pour réduire les coûts | Objets connectés portables d'entrée de gamme, produits Bluetooth, papier électronique et HMI compacts |
| **ePicasso 2.0** | SF32LB56x | Accélération d'interface 2D/2.5D | Quatre couches de premier plan avec mélange alpha, une couche de masque dédiée et une couche d'arrière-plan monochrome ; rotation, mise à l'échelle et miroir horizontal matériels (miroir vertical non pris en charge) ; conversion de format ; eZip 2.0 ; compression distincte du framebuffer TurboPixel | Écrans de résolution supérieure et interfaces LVGL plus riches ; vérifiez les opérations prises en charge par le composant et le SDK choisis |
| **ePicasso 2.0** | SF32LB58x | Accélération d'interface 2D/2.5D | Comprend ePicasso 2.0 et le moteur graphique vectoriel distinct Vivante GCNanoUltraV ; vérifiez séparément les fonctions de chaque moteur | Produits graphiques haute résolution ; confirmez les fonctions prises en charge par chaque moteur dans le SDK cible |
| **ePicasso (EPIC)** | SF32LB57x | Accélération d'interface 2D/2.5D | Rotation, mise à l'échelle, transformations matricielles, miroirs horizontal et vertical, mélange alpha et composition multicouche ; EZIP transmet à EPIC les ressources eZip/eZip-A décompressées. La table des formats d'entrée EPIC cite aussi JPEG sur SF32LB57x ; le SDK fournit aussi un décodeur HAL JPEGD autonome, qui constitue un chemin distinct. | Produits connectés exigeants en graphismes et multimédia, avec prise en charge de la caméra |

</div>

Ce tableau ne classe pas les performances. Pour votre produit, vérifiez les formats de pixel pris en charge par la puce choisie, les limites de couches et de résolution, les fonctions eZip, la mémoire disponible pour le framebuffer, la bande passante de l'interface d'affichage et la prise en charge par le pilote du SDK.

La table des capacités EPIC du SDK documente le miroir horizontal pour toutes les familles répertoriées, mais le miroir vertical uniquement pour SF32LB52x et SF32LB57x. Ne déduisez pas de la mention générique « miroir » que les deux directions sont prises en charge. Cette même table exclut EZIP, JPEG et YUV de la rotation et des transformations matricielles.

Le chemin EZIP vers EPIC évite de stocker toute l'image source décompressée dans un framebuffer intermédiaire ; la mémoire de travail du décodeur et le tampon de rendu final restent nécessaires. Le décodage JPEG n'est pas une fonction d'EZIP. Le SDK cite JPEG comme format d'entrée EPIC sur SF32LB57x et fournit séparément un [exemple HAL JPEGD](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/hal/jpegd/README.html) qui décode une image JPEG avec HAL_JPEGD. Il s'agit de deux chemins documentés distincts : vérifiez celui qu'utilise réellement l'application.

Cet exemple de décodage d'une image JPEG statique ne démontre pas que JPEGD décode les flux MJPEG. Le SDK documente MJPEG séparément dans son [guide du middleware vidéo FFmpeg](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/video.html), dont la note de configuration indique que le décodage matériel MJPEG n'est disponible que sur SF32LB58x.

Vérifiez également les restrictions propres aux formats et les différences entre familles avant de choisir une voie accélérée. Consultez la [table des capacités EPIC du dépôt d'origine](https://github.com/OpenSiFli/SiFli-SDK/blob/main/docs/source/zh_CN/hal/epic.md) et l'[interface JPEGD](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h).

## ePicasso au sein de la famille SF32 { #epicasso-across-the-sf32-family }

Les appareils SF32 intègrent différentes configurations ePicasso. Pour confirmer les fonctions disponibles, consultez la fiche technique et le manuel de référence de la puce choisie.

<div align="center"><em>Tableau : ePicasso au sein de la famille SF32</em></div>

<div align="center" markdown>

| Famille d'appareils | Accélérateur graphique | Positionnement typique |
|:--------------|:---------------------|:--------------------|
| **SF32LB52x** | Accélérateur 2D/2.5D ePicasso 2.0 | Objets connectés portables, produits Bluetooth et HMI compacts conçus pour réduire les coûts. |
| **SF32LB55x** | Accélérateur 2.5D ePicasso | Objets connectés portables BLE et appareils riches en capteurs ayant également besoin d'un écran. |
| **SF32LB56x** | Accélérateur 2D/2.5D ePicasso 2.0 | Produits à écran haute résolution et interfaces plus riches basées sur LVGL. |
| **SF32LB57x** | Accélérateur 2D/2.5D ePicasso (EPIC) | Produits connectés riches en graphismes, compatibles avec une caméra et orientés multimédia. |
| **SF32LB58x** | ePicasso 2.0 et le moteur vectoriel distinct Vivante GCNanoUltraV | Graphismes haut de gamme, interface utilisateur haute résolution et applications visuelles avancées. |

</div>

Les développeurs peuvent ainsi conserver un modèle logiciel graphique similaire au sein de la famille SF32, tout en choisissant le composant adapté à la résolution d'affichage, à la mémoire, à la complexité graphique, au nombre de GPIO et au budget énergétique du produit.

## Intégration avec LVGL et les frameworks UI { #integration-with-lvgl-and-ui-frameworks }

**LVGL** est couramment utilisé pour les interfaces graphiques embarquées sur SF32. L'application compose les écrans avec des widgets, styles, images, polices et animations. LVGL identifie les zones à redessiner ; son moteur de rendu logiciel ou son backend de dessin matériel produit les pixels. Le chemin de flush du pilote d'affichage transfère ces pixels vers l'écran et signale la fin du transfert. Distinguez la fin du rendu de la fin du transfert d'affichage.

ePicasso peut améliorer les performances de LVGL lorsque l'adaptation de LVGL pour SF32 confie au matériel les opérations de dessin prises en charge. Les opérations qui en tirent généralement le plus parti sont :

- Les blits d'image.
- Les remplissages de couleur.
- Le mélange alpha.
- La mise à l'échelle d'image.
- La rotation ou transformation de régions d'image prises en charge.
- La composition dans un tampon de dessin ou framebuffer.

Une intégration LVGL robuste conserve des chemins de repli corrects exécutés par le CPU. Toutes les fonctions, tous les formats de pixel, tous les effets de style et tous les agencements d'image de LVGL ne peuvent pas être associés directement à une opération matérielle. Accélérez les opérations fréquentes portant sur de gros volumes et laissez les cas rares ou complexes au logiciel.

## Considérations de mémoire et de bande passante { #memory-and-bandwidth-considerations }

L'accélération graphique ne supprime pas le besoin d'une conception mémoire soignée. Dans de nombreux systèmes d'affichage embarqués, le bus mémoire est la ressource limitante : ePicasso, le CPU, le contrôleur d'affichage, les moteurs DMA, la Flash, la PSRAM, l'audio, et les sous-systèmes sans fil peuvent tous être en concurrence pour l'accès.

Une bonne performance graphique dépend de plusieurs choix de conception :

- Utiliser des résolutions d'affichage et profondeurs de couleur correspondant à l'exigence produit.
- Placer les ressources d'interface les plus utilisées dans des mémoires offrant une latence d'accès acceptable.
- Utiliser le rendu partiel ou les mises à jour de région modifiée lorsque le rafraîchissement plein écran est inutile.
- Éviter la conversion de format inutile sur le chemin critique.
- Aligner les tampons de dessin et framebuffers selon les recommandations du SDK.
- Définir clairement les règles de cohérence DMA et de cache lorsque les tampons sont partagés entre le CPU, ePicasso et le contrôleur d'affichage.

Pour les tampons pouvant être mis en cache et partagés entre le CPU et ePicasso, suivez les règles du SDK sur le cache et la propriété des tampons. Effectuez un clean des données source écrites par le CPU avant leur lecture matérielle. Avant que le matériel écrive dans un tampon de destination, préparez celui-ci selon les règles du SDK afin que les lignes de cache CPU modifiées ne puissent pas écraser le résultat par la suite ; après la fin du traitement matériel, invalidez les lignes obsolètes avant une lecture par le CPU. Respectez l'alignement et les données voisines et ne modifiez pas un tampon détenu par le matériel. Consultez la [vue d'ensemble des graphismes](overview.md#memory-placement-strategy) pour ce flux.

La séparation des rôles décrite dans la [vue d'ensemble des graphismes](overview.md#sf32-graphics-flow) est essentielle pour diagnostiquer les performances de l'interface. Une mise à jour lente peut venir du temps de rendu, de la bande passante mémoire, du transfert vers le panneau, de la configuration de l'interface d'affichage ou de la synchronisation. ePicasso est surtout utile lorsque le rendu constitue le goulot d'étranglement. Si le transfert vers le panneau limite les performances, le rafraîchissement partiel, une profondeur de couleur réduite, une autre stratégie de tampon ou une interface plus rapide peuvent être plus efficaces.

## Cas d'usage typiques { #typical-use-cases }

ePicasso est le plus utile dans les produits où l'interface contient de nombreux éléments visuels, tout en respectant un budget énergétique adapté à un microcontrôleur.

Les cas d'usage typiques incluent :

- Cadrans et écrans d'application de montre connectée.
- Bracelets d'activité et objets connectés portables dotés d'un écran de suivi de la santé.
- Interfaces utilisateur d'audio Bluetooth.
- Tableaux de bord de vélos et trottinettes électriques, ainsi que de véhicules compacts.
- Commandes domotiques et petits panneaux tactiles.
- Instruments médicaux ou industriels portables.
- Imprimantes d'étiquettes, badges intelligents et étiquettes électroniques de rayonnage.
- HMI basées sur LVGL avec icônes, transparence et animations.

## Recommandations pratiques de conception { #practical-design-guidance }

Partez des exigences d'affichage et d'expérience utilisateur, puis remontez vers l'architecture graphique.

Les questions importantes incluent :

- Quelle est la résolution d'affichage et la profondeur de couleur ?
- Le panneau est-il mis à jour via SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD ou JDI ?
- Le produit a-t-il besoin d'animations plein écran ou principalement de mises à jour partielles ?
- Les ressources d'interface sont-elles stockées en SRAM interne, en Flash ou en PSRAM ?
- Combien de mémoire est disponible pour les tampons de dessin ou framebuffers ?
- Quelles opérations le pilote graphique peut-il accélérer via ePicasso ?
- Les tampons partagés par le CPU, ePicasso et le contrôleur d'affichage sont-ils cohérents du point de vue du cache ?

Pour de nombreux produits, les meilleurs résultats viennent de la combinaison de plusieurs techniques : dessin accéléré matériellement, rafraîchissement partiel, ressources compressées ou optimisées, placement soigné des tampons et conception de l'interface évitant les redessins plein écran inutiles.

## Points clés à retenir { #key-takeaways }

- ePicasso est l'accélérateur graphique 2D/2.5D de SiFli pour les microcontrôleurs SF32.
- Il prend en charge des opérations courantes sur les pixels, comme le remplissage, la copie, le mélange, la mise à l'échelle, la rotation et la composition de couches, libérant ainsi le CPU.
- Il travaille aux côtés du contrôleur d'affichage ; ePicasso prépare les données de pixel, tandis que le contrôleur d'affichage les envoie au panneau.
- Il est particulièrement utile dans les produits à interface graphique complexe, où les transferts mémoire, le mélange et les traitements répétés des pixels consommeraient beaucoup de temps CPU.
- LVGL et d'autres frameworks d'interface peuvent bénéficier d'ePicasso lorsque le pilote graphique SF32 associe les opérations de dessin prises en charge aux fonctions matérielles.
- Les performances réelles dépendent de la résolution, de l'emplacement des données en mémoire, des formats de pixel, de la stratégie de tampon, de la gestion du cache et de la bande passante de l'interface du panneau.
