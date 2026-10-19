---
icon: lucide/monitor
description: "Comment le contrôleur d'affichage SF32 envoie les pixels au panneau : choix de l'interface, transfert des pixels, rafraîchissement partiel et mise en service."
tags:
  - Graphismes
---

# Contrôleur d'affichage { #display-controller }

## Vue d'ensemble { #overview }

Le **contrôleur d'affichage** (LCDC) transmet au panneau les pixels déjà préparés via l'interface sélectionnée. Sur les composants et dans les configurations compatibles, il décompresse également le framebuffer TurboPixel pendant la sortie. LCDC permet un mélange alpha limité de ses couches de sortie sur un fond uni. La documentation décrit les couches 0 et 1, mais SF32LB52x ne prend pas en charge la couche 1. Cette fonction ne remplace ni le rendu général de l'interface ni la composition avec ePicasso. Le décodage des ressources eZip reste une opération distincte.

Référence principale : [documentation LCDC HAL de SiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/lcdc.md).

Le lien ci-dessus est figé sur un commit précis de SiFli-SDK. Il décrit le comportement du HAL dans cette révision, sans établir que chaque interface, couche ou fonction est disponible sur tous les composants et boîtiers SF32 ni dans les autres versions du SDK. Vérifiez la combinaison exacte composant, boîtier et version du SDK utilisée par le projet.

Consultez la [vue d'ensemble des graphismes](overview.md#sf32-graphics-flow) pour suivre le parcours complet des ressources jusqu'au panneau. Cet article se concentre sur le contrôleur, le raccordement du panneau et l'intégration du pilote logiciel.

Consultez cette page pour choisir l'interface du panneau, définir le transfert des pixels dans LVGL ou mettre en service un nouveau panneau. Elle distingue la sortie du contrôleur du décodage des ressources et de la composition des pixels, afin de faciliter le diagnostic à chaque niveau.

## Choisir l'interface d'affichage { #select-the-display-interface }

EPD et Memory-in-Pixel désignent des technologies de panneau ou des modes de mise à jour des pixels, pas des bus interchangeables. Un module EPD peut utiliser SPI pour se connecter à un contrôleur externe ; un mode de commande directe EPD par LCDC est également documenté pour le SF32LB57x. JDI propose des modes d'interface série et parallèle avec des signaux différents. Vérifiez l'interface électrique et les exigences de maintenance du panneau, pas seulement sa catégorie.

Le choix du panneau influe sur la bande passante, la stratégie de tampon, le nombre de broches, la consommation, la complexité d'initialisation et les risques liés à la PCB. Vérifiez les interfaces effectivement disponibles sur la référence et le boîtier choisis.

<div align="center"><em>Options d'interface et de technologie de panneau</em></div>

<div align="center" markdown>

| Interface ou type de panneau | Usage typique | Remarques de conception |
|:---|:---|:---|
| **SPI 3 fils / 4 fils** | Petits panneaux TFT ou AMOLED, HMI simples | Faible nombre de broches et routage simple, mais bande passante limitée pour l'animation plein écran. |
| **Dual-SPI / Quad-SPI** | Écrans AMOLED portables et compacts | Meilleure bande passante que le SPI de base tout en gardant un nombre de broches modéré. |
| **Interface MCU 8080** | Panneaux d'affichage parallèles | Bande passante plus élevée que le SPI série, mais utilise davantage de broches. |
| **RGB / DPI** | Écrans de grande taille ou à fréquence de rafraîchissement élevée | Flux continu de pixels, bande passante et nombre de broches plus importants, exigences de synchronisation plus strictes. |
| **MIPI DSI** | Panneaux AMOLED haute densité ou avancés | Bande passante élevée avec peu de broches, mais initialisation et intégrité de signal plus complexes. |
| **Technologie de panneau EPD** | Papier électronique et écrans à très faible fréquence de rafraîchissement | L'interface côté hôte dépend du module et du contrôleur. Une image fixe peut être maintenue avec une consommation réduite du panneau ; les mises à jour restent lentes et nécessitent une gestion spécifique de la forme d'onde et de l'alimentation. |
| **JDI (série ou parallèle)** | Panneaux réflectifs basse consommation | Les modes JDI utilisent des signaux différents ; vérifiez l'interface électrique et les exigences de maintenance du panneau choisi. |
| **Technologie de panneau Memory-in-Pixel** | Écrans réflectifs basse consommation, y compris pour les interfaces toujours actives ou lisibles en plein soleil | La mémoire des pixels est intégrée au panneau ; son mode de rafraîchissement diffère de celui des écrans TFT/AMOLED. Consultez la fiche technique du panneau. |

</div>

Par exemple, un petit panneau SPI/QSPI se prête aux mises à jour partielles, tandis qu'un panneau RGB/DPI exige de prévoir la bande passante nécessaire à la lecture continue des pixels (scanout). Ne choisissez pas l'interface sur le seul débit théorique : tenez compte du format de pixel, de la résolution, du mode de rafraîchissement, de la GRAM du panneau et du trafic généré par les autres utilisateurs de la PSRAM.

## Matrice des interfaces par famille et variante { #per-device-interface-matrix }

Le tableau ci-dessous aide à choisir une famille ; il ne définit pas l'affectation des broches. Il récapitule les interfaces d'affichage documentées pour chaque famille ou variante de silicium SF32. Un tiret indique que la documentation ne mentionne pas cette interface pour la ligne concernée ; cela n'exclut ni un contrôleur externe piloté par GPIO ni une implémentation propre à la carte. Avant de finaliser le schéma, vérifiez la référence exacte, le boîtier, le multiplexage des broches, la version du SDK et le pilote du panneau.

<div align="center"><em>Matrice d'interfaces d'affichage SF32</em></div>

<div align="center" markdown>

| Famille / Variante SF32 | Interfaces LCD/panneau documentées | Contrainte de boîtier ou de variante | Orientation de sélection pratique |
|:---|:---|:---|:---|
| **SF32LB52x** | SPI 3/4 fils, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), JDI série/parallèle ; EPD raccordé en SPI ; le guide matériel des SF32LB52B/D/E/G/J documente aussi une interface de signaux EPD parallèle 8 bits | Les modèles 52x répertoriés utilisent le boîtier QFN68L. Le guide matériel des SF32LB52B/D/E/G/J répertorie les signaux et la commande du PMIC TPS, mais cela n'établit pas la prise en charge du mode EPD direct du LCDC. Vérifiez le pilote et la variante exacte. | Convient aux conceptions compactes SPI/QSPI, 8080 et JDI ; pour un EPD parallèle, vérifiez l'implémentation GPIO, les contraintes temporelles et la commande d'alimentation TPS de la variante choisie. |
| **SF32LB55x** | SPI 3/4 fils, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI série/parallèle, MIPI DSI en mode commande | L'interface MIPI DSI documentée à 2 voies est disponible sur les boîtiers BGA145/169 ; JDI et le double affichage MIPI DSI + SPI/DSPI ne sont documentés que pour 557VD3A6. Le mode commande requiert un contrôleur de panneau avec SRAM/GRAM interne. | Appareils portables et autres appareils connectés dotés d'un écran, avec un boîtier BGA compatible et un panneau MIPI en mode commande. |
| **SF32LB56xU** | SPI 3/4 fils, Dual-SPI, Quad-SPI, JDI série | Les variantes U répertoriées utilisent le boîtier QFN68L ; vérifiez la référence exacte et le multiplexage des broches. | Convient aux panneaux série compacts lorsque la bande passante QSPI et la réduction du nombre de broches sont prioritaires. |
| **SF32LB56xV** | SPI 3/4 fils, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, JDI série/parallèle | Les variantes V répertoriées utilisent le boîtier WBBGA175 (BGA175 dans le guide des modèles) ; vérifiez les broches requises et le routage pour la référence exacte. | Convient aux résolutions et fréquences de rafraîchissement élevées, ou aux conceptions nécessitant 8080, DPI/RGB ou JDI parallèle. |
| **SF32LB57x** | SPI 3/4 fils, Dual-SPI, Quad-SPI, 8080/DBI 8/16 bits, DPI/RGB, JDI et EPD à commande directe | Les options de boîtier comprennent QFN68L, QFN80L et BGA112 ; vérifiez la référence exacte, les broches exposées et le chemin de commande du panneau. | Adapté aux conceptions graphiques exigeantes nécessitant une interface parallèle ou série, JDI ou EPD. |
| **SF32LB58x** | SPI 3/4 fils, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, JDI série/parallèle, MIPI DSI à 2 voies de données en modes commande et vidéo | Les références répertoriées utilisent le boîtier BGA256. Le mode commande utilise un contrôleur de panneau avec SRAM/GRAM interne ; le mode vidéo prend aussi en charge des contrôleurs sans RAM. Le guide des modèles répertorie également le double affichage MIPI DSI + SPI/DSPI/QSPI. Vérifiez le contrôleur LCD et le multiplexage des broches pour la conception exacte. | Conceptions d'interface utilisateur haute résolution et exigeantes en bande passante, y compris les configurations à double affichage et les panneaux MIPI DSI avec ou sans RAM dans le contrôleur. |

</div>

Pour **SF32LB56x**, ne considérez pas les variantes U et V comme interchangeables. Pour **SF32LB55x** et **SF32LB58x**, n'intégrez pas le MIPI DSI au schéma avant d'avoir confirmé le boîtier exact, les broches DSI disponibles et les exigences de voies et de mode du panneau. SF32LB55x ne prend en charge que le mode commande : il ne convient donc pas à un panneau sans RAM fonctionnant en mode vidéo. Une conception EPD doit aussi tenir compte des contraintes temporelles, de la forme d'onde et de l'alimentation propres au panneau ; la seule interface ne suffit pas à définir la conception.

Le guide des modèles de puces SiFli répertorie DPI/RGB parmi les interfaces de la famille SF32LB55x, mais son tableau par référence n'attribue pas DPI aux références listées. Il s'agit donc d'une indication au niveau de la famille seulement : avant de s'appuyer sur DPI, vérifiez sa prise en charge et la disponibilité des broches pour la référence exacte. La distinction U/V de SF32LB56x suit les guides d'application matériels distincts, et non le tableau HAL commun à la famille.

Les deux guides matériels SF32LB52x ne concordent pas sur JDI : leur aperçu mentionne le JDI série, tandis que les sections détaillées donnent des affectations de signaux parallèles. La matrice reprend donc les deux indications documentées, sans garantir la disponibilité des broches pour une référence précise. Avant de figer la conception, vérifiez le multiplexage LCDC, le SDK/pilote et les signaux du panneau pour la variante exacte.

Pour SF32LB52x, distinguez l'interface de signaux EPD parallèle 8 bits documentée du mode EPD direct du LCDC. Le guide matériel des SF32LB52B/D/E/G/J répertorie les signaux EPD parallèles et la commande du PMIC TPS ; séparément, les notes de version du SiFli-SDK v2.5.1 documentent la commande directe EPD par LCDC pour SF32LB57x. N'en déduisez pas qu'une conception 52x peut utiliser le mode EPD direct du LCDC du SF32LB57x ; vérifiez le pilote et la mise en œuvre des contraintes temporelles pour la variante exacte.

Sources sur les interfaces : [guide des modèles de puces SiFli](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), [guide matériel SF32LB52x sur batterie](https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html), [guide matériel SF32LB52B/D/E/G/J](https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html), [SF32LB55x](https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html), [SF32LB56xU](https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html), [SF32LB56xV](https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html), [SF32LB58x](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html) et [prise en charge du SF32LB57x dans le SDK](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1).

## Contrôleur, tampons et transfert vers l'écran { #controller-buffers-and-flush-paths }

Le schéma de référence de LCDC distingue la zone visible du panneau, la fenêtre de mise à jour et la région du tampon source. Appliquez les décalages de colonne et de ligne de manière cohérente. La fenêtre de mise à jour peut ne recouvrir qu'une partie de la région du tampon source ; dans cette fenêtre, les pixels sans données source affichent la couleur d'arrière-plan. Vérifiez ensemble les coordonnées, l'origine du tampon et le stride, sans supposer que le tampon et la fenêtre sont identiques.

Le framework d'interface utilisateur produit les pixels modifiés ; le pilote d'affichage et le contrôleur les livrent au panneau. Le chemin approprié dépend du panneau :

- Un pilote SPI/QSPI ou 8080 définit généralement une fenêtre de panneau et ne transfère que la région modifiée.
- Un contrôleur scannant un framebuffer consomme les données de pixel depuis la mémoire selon le séquencement de l'affichage.
- Un chemin compatible avec TurboPixel lit le bitmap final compressé et le décompresse au niveau du contrôleur d'affichage.

Dans LVGL, le callback de transfert vers l'écran (flush) marque la frontière entre le rendu et la sortie. Il devrait tenir compte de la région à mettre à jour, lancer la bonne opération DMA ou contrôleur et signaler la fin seulement lorsque le framework peut réutiliser le tampon de dessin sans risque. Gardez explicites les règles de nettoyage (clean) et d'invalidation (invalidate) du cache lorsque le CPU et le matériel partagent des tampons.

La réutilisation d'un tampon dépend du transfert effectué. Pour un transfert vers la mémoire du panneau, ne libérez le tampon de dessin qu'une fois sa lecture matérielle terminée. En balayage continu, une interruption de trame ne suffit pas à libérer le framebuffer actif : attendez la confirmation du changement de tampon et la fin des lectures de l'ancien tampon par le contrôleur. La fin du transfert et le rafraîchissement visible sont deux événements distincts. Utilisez le signal TE ou la temporisation de trame du panneau lorsque cela est nécessaire pour éviter le tearing.

Si la mémoire partagée est mise en cache, nettoyez le cache des données source écrites par le CPU avant leur lecture par le matériel. Avant une écriture matérielle, préparez la destination selon les règles de gestion du cache de la plateforme, afin que des lignes de cache modifiées puis réécrites n'écrasent pas le résultat. Après la fin de l'opération matérielle, invalidez la destination avant sa lecture par le CPU. Respectez l'alignement et la propriété des lignes de cache, y compris pour les données voisines partageant une même ligne.

<div align="center"><em>Choix relatifs au chemin d'affichage</em></div>

<div align="center" markdown>

| Décision | Point à vérifier |
|:---|:---|
| Région transférée | Ne transférer que les zones modifiées si le panneau et le pilote le permettent. |
| Mise en mémoire tampon | Choisir un tampon partiel ou de trame complète, en simple ou double tampon selon les exigences de latence et de mémoire. |
| Synchronisation | Ne libérer ou réutiliser le tampon que lorsque le matériel ne le lit plus ; confirmer le changement de tampon en balayage continu. |
| Format de pixel | Faire correspondre le panneau, le pilote, le moteur de rendu et tout chemin d'accélération pour éviter les conversions sur le chemin critique. |
| Cache | Nettoyer (clean) les tampons écrits par le CPU avant les lectures matérielles ; invalider (invalidate) les tampons écrits par le matériel avant les lectures CPU. |

</div>

## Rafraîchissement partiel et régions modifiées { #partial-refresh-and-dirty-regions }

Le rendu partiel et le transfert partiel au panneau sont deux optimisations distinctes. Un flux continu RGB/DPI ou DSI en mode vidéo peut encore transmettre toute l'image même si seule une petite zone mémoire change. Pour EPD, vérifiez les formes d'onde prises en charge, l'effet de la température, les images rémanentes et les intervalles de rafraîchissement complet. Une zone plus petite ne garantit pas une mise à jour valide.

La plupart des interfaces utilisateur embarquées n'ont pas besoin de redessiner tout l'écran à chaque image. LVGL suit les zones invalidées et le pilote peut ne transférer que celles qui ont changé. Cette approche est particulièrement utile avec les panneaux SPI/QSPI, les appareils portables alimentés par batterie, les pages statiques dont seules quelques valeurs changent et les écrans EPD ou JDI.

Le rafraîchissement plein écran convient aux écrans riches en animations, aux transitions ou aux panneaux qui effectuent naturellement un balayage à partir d'un framebuffer complet. Le choix dépend de la bande passante de l'interface d'affichage, du comportement du panneau et du budget mémoire, pas uniquement du réglage du framework d'interface utilisateur.

## Séquence de mise en service du panneau { #panel-bring-up-sequence }

Mettez le panneau en service par étapes avant de déboguer les widgets ou le comportement applicatif :

1. Vérifiez les rails d'alimentation, la temporisation de réinitialisation, les broches de rétroéclairage et d'activation, ainsi que la consommation de courant de base.
2. Envoyez la séquence d'initialisation du fournisseur du panneau exactement telle que fournie.
3. Affichez des aplats de couleur pour repérer les erreurs d'ordre des octets, de format de pixel ou de câblage de l'interface.
4. Dessinez des motifs géométriques simples pour vérifier le stride, l'adressage de fenêtre et les coordonnées.
5. Ajoutez des images et du texte pour vérifier la conversion des couleurs, les polices et l'emplacement des ressources.
6. Activez tour à tour le rafraîchissement partiel, le DMA, TurboPixel et l'accélération graphique.
7. Testez les chemins de veille, d'extinction de l'écran, de réveil et de réinitialisation.

Validez d'abord les aplats et les motifs avec une configuration minimale de l'interface prévue. Après l'ajout du DMA, de la compression ou de l'accélération, répétez ces tests sur chaque nouveau chemin avant de tester l'interface LVGL complète.

## Isoler les défaillances du chemin d'affichage { #isolate-display-path-failures }

Traitez chaque étape comme une frontière indépendante. Modifier simultanément les commandes du panneau, le code LVGL, l'emplacement des tampons et les réglages DMA rend les problèmes plus difficiles à reproduire.

<div align="center"><em>Matrice de diagnostic du chemin d'affichage</em></div>

<div align="center" markdown>

| Symptôme | Premier point à vérifier | Test ciblé | Classe de cause probable |
|:---|:---|:---|:---|
| Le panneau n'affiche rien | Alimentation, réinitialisation et initialisation du panneau | Mesurer les alimentations et la réinitialisation, exécuter la séquence du fabricant et afficher un aplat de couleur. | Séquence d'alimentation, polarité de réinitialisation, commandes d'initialisation ou connexion physique de l'interface. |
| Les aplats s'affichent, mais les couleurs sont incorrectes | Format de pixel entre le moteur de rendu et le panneau | Afficher des barres de test rouges, vertes, bleues, noires et blanches. | Ordre RGB/BGR, ordre des octets, profondeur de couleur ou conversion de format. |
| L'image est décalée, tronquée ou présente une déchirure (tearing) | Adressage et synchronisation | Dessiner une grille, puis tester plusieurs fois une même région de mise à jour fixe. | Coordonnées de fenêtre, stride, contraintes temporelles du panneau, réutilisation de tampon ou synchronisation DMA incomplète. |
| L'interface statique fonctionne, mais les animations saccadent | Frontière entre rendu, transfert et mémoire | Mesurer séparément le temps de rendu et le temps jusqu'à la fin du flush. | Zone redessinée trop grande, contention PSRAM, interface lente ou stratégie de tampon inadaptée. |
| Des artefacts apparaissent seulement après veille/réveil | Transition d'état d'alimentation | Réexécuter le test de remplissage/grille après chaque chemin d'extinction et de réveil pris en charge. | État de panneau perdu, omission de reset/init, séquencement des rails, ou état de cache/tampon obsolète. |
| Une fonctionnalité échoue seulement lorsqu'elle est activée | Chemin optionnel spécifique | Activer le DMA, le rafraîchissement partiel, ePicasso, ou TurboPixel un à la fois. | Configuration non prise en charge, règle d'alignement/cache, ou erreur d'intégration de pilote. |

</div>

## Recommandations spécifiques au panneau { #panel-specific-guidance }

### AMOLED/TFT SPI et QSPI { #spi-and-qspi-amoledtft }

Privilégiez le rafraîchissement partiel, utilisez RGB565 lorsque cela convient et limitez les zones animées. Pour de petits changements, évitez de redessiner tout l'écran ; effectuez le rendu et la composition avant de transférer la zone modifiée.

### Panneaux RGB / DPI { #rgb-dpi-panels }

Prévoyez la bande passante de balayage continue en tenant compte du trafic du CPU, d'ePicasso, du DMA et des autres accès mémoire. Choisissez une stratégie de framebuffer adaptée à la fréquence de rafraîchissement requise, envisagez le double buffering si la mémoire le permet et tenez compte des contraintes temporelles et de l'intégrité du signal lors de la conception de la PCB.

### Panneaux MIPI DSI { #mipi-dsi-panels }

Choisissez le mode du panneau avant d'arrêter le choix du composant. **SF32LB55x ne prend en charge que le mode commande MIPI DSI** : le contrôleur du panneau doit donc disposer d'une SRAM/GRAM interne pour conserver l'image mise à jour. **SF32LB58x prend en charge les modes commande et vidéo** : les panneaux en mode commande nécessitent une RAM de contrôleur, tandis que le mode vidéo peut piloter un contrôleur sans RAM à partir du flux continu de pixels. Validez rapidement l'initialisation, testez les états basse consommation et le délai de réveil, et maintenez le débit requis en dessous du débit utile de l'interface, avec une marge pour les échanges de protocole, les contraintes de temporisation et les autres accès mémoire.

### Écrans EPD { #epd-displays }

Concevez pour des mises à jour peu fréquentes ; utilisez les modes de mise à jour partielle uniquement s'ils sont pris en charge et donnent un résultat visuel acceptable. Ne partez pas du principe qu'il y aura des animations et prévoyez les exigences du PMIC d'affichage, du VCOM et de la forme d'onde.

### Interfaces JDI et panneaux Memory-in-Pixel { #jdi-memory-in-pixel-displays }

Dans cet article, JDI désigne les modes d'interface série ou parallèle du panneau ; Memory-in-Pixel désigne une technologie de panneau. Ils peuvent être associés dans certaines conceptions basse consommation, mais ne sont pas synonymes. Avec un panneau MIP, de petites zones de mise à jour et un agencement adapté de l'interface graphique peuvent exploiter la conservation de l'état des pixels lorsque le panneau est alimenté. Cela ne signifie ni stockage non volatil de l'image ni consommation nulle du système en veille. Respectez la fiche technique du panneau pour l'inversion COM et les autres opérations de maintenance, puis mesurez le rafraîchissement, la lisibilité en extérieur et la consommation dans les conditions du produit.

## Liste de contrôle pour le passage en production { #production-handoff-checklist }

Avant de traiter le chemin d'affichage comme complet, enregistrez les choix qu'un autre ingénieur doit pouvoir reproduire :

- Référence SF32 exacte, boîtier, version du SDK, révision de la carte, référence du panneau et révision de son contrôleur.
- Mode d'interface, affectation des broches, format de pixel, ordre des octets et des couleurs, comportement de rafraîchissement visé et source de la séquence d'initialisation du panneau.
- Emplacement, taille et alignement du tampon de dessin et du framebuffer ; responsable de la maintenance du cache et signal de fin du DMA/contrôleur.
- Politique de rafraîchissement partiel, règles des fenêtres du panneau et régions à rafraîchir ensemble pour éviter les artefacts.
- Temps de rendu mesuré, temps de transfert, trafic PSRAM de pointe/moyen le cas échéant, et courant pour des états d'interface représentatifs.
- Résultats de test de veille, extinction d'écran, réveil, et récupération, y compris le comportement après un transfert échoué ou interrompu.

Cet enregistrement transforme la prise en charge de l'affichage d'un résultat de mise en service ponctuel en une intégration produit reproductible. Revalidez-le chaque fois que le panneau, le SDK, la disposition mémoire, le format de pixel, ou le pilote d'affichage change.

## Points clés à retenir { #key-takeaways }

- Le contrôleur d'affichage gère la sortie vers le panneau ; il est distinct de la composition des pixels par ePicasso et de la décompression des ressources eZip.
- Le choix de l'interface détermine une grande partie de la bande passante, de la stratégie de tampon, de la consommation, du nombre de broches et de la conception de la PCB.
- Traitez le transfert des pixels, la synchronisation, la gestion du cache et l'initialisation du panneau comme des tâches essentielles du firmware.
- Validez le panneau avec des motifs simples avant d'activer l'interface utilisateur de plus haut niveau, le DMA, TurboPixel ou les fonctions d'accélération.
- Diagnostiquez les défaillances en examinant une frontière du chemin d'affichage à la fois, puis consignez la configuration validée et les mesures pour le transfert à la production.
