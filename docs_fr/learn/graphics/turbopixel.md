---
icon: lucide/minimize-2
description: "Comment TurboPixel utilise la compression de framebuffer avec perte à rapport fixe pour réduire le stockage du framebuffer et le trafic de lecture d'affichage sur les appareils SF32 pris en charge."
tags:
  - Graphismes
---

# Compression du framebuffer TurboPixel { #turbopixel-framebuffer-compression }

## Vue d'ensemble { #overview }

**TurboPixel** est un format de compression avec perte à rapport fixe, appliqué à l'image finale après rendu sur les appareils SF32 compatibles. Il fait partie du chemin d'affichage : **extDMA** compresse l'image, puis le contrôleur d'affichage décompresse TurboPixel lors du transfert des pixels vers le panneau.

TurboPixel n'est pas un format de stockage des ressources et ne remplace pas [eZip](ezip.md). eZip compresse sans perte les ressources sources avant leur lecture depuis le stockage ; TurboPixel compresse l'image finale après rendu afin de réduire la capacité PSRAM et la bande passante PSRAM nécessaires au trafic du framebuffer.

Pour connaître le flux graphique complet et la place de TurboPixel par rapport à eZip, ePicasso et au contrôleur d'affichage, consultez la [Vue d'ensemble des graphismes](overview.md#sf32-graphics-flow). Cette page porte sur le fonctionnement de la compression TurboPixel, ses compromis d'intégration et sa disponibilité.

Consultez cette page si la capacité du framebuffer ou le trafic de lecture de l'écran devient un goulot d'étranglement sur un produit SF32LB55x, SF32LB56x ou SF32LB58x. Elle aide les équipes produit et firmware à mettre en balance les économies prévisibles de PSRAM et la perte de qualité d'image ; elle ne remplace pas la compression des ressources par eZip.

## Rapport fixe et compression avec perte { #fixed-ratio-and-lossy-by-design }

TurboPixel a deux propriétés déterminantes :

- **Rapport fixe pour une configuration donnée.** Le format de pixel en entrée et le niveau de compression déterminent le facteur nominal ; il ne varie pas avec les détails de l'image. L'allocation dépend aussi de l'alignement des lignes et du découpage en blocs. Utilisez les règles de taille de la puce et du SDK choisis, pas un rapport repris d'une autre configuration.
- **Compression avec perte.** Un bitmap décompressé par TurboPixel n'est pas garanti de restituer chaque valeur de pixel d'origine. Le format sacrifie une part de la fidélité de l'image pour réduire de façon prévisible l'utilisation de la PSRAM et le trafic sur cette mémoire.

La compression avec perte peut être un compromis judicieux dans un système d'affichage embarqué contraint, mais la décision dépend du produit. Évaluez des écrans représentatifs à la résolution et à la profondeur de couleur du panneau cible, à la distance d'observation prévue et avec le rythme de rafraîchissement attendu. Ne vous fiez pas uniquement à une image de test générique.

## Modèle de mesure du framebuffer { #framebuffer-compression-comparison-placeholder }

Utilisez cette section pour consigner les résultats mesurés de TurboPixel pour une résolution d'affichage représentative et une configuration du SDK. Contrairement à la comparaison de taille de fichier eZip, il s'agit ici de comparer **l'allocation du framebuffer et le trafic PSRAM** : TurboPixel intervient après le rendu, et non sur le fichier source de la ressource.

Incluez des écrans opaques et des écrans avec mélange alpha. Celui-ci a généralement lieu avant TurboPixel, lorsque le moteur de rendu compose les pixels de premier plan et d'arrière-plan dans le framebuffer final. Un écran contenant des icônes translucides, du texte, des ombres ou des couches peut tout de même produire un framebuffer RGB565 opaque. Notez cette distinction : la présence d'alpha dans les ressources sources ne signifie pas que le framebuffer compressé possède un canal alpha.

<div align="center"><em>Modèle de mesure d'un framebuffer TurboPixel représentatif</em></div>

<div align="center" markdown>

| Scénario | Alpha source/couche | Format et état alpha du framebuffer final | Allocation/trafic non compressé | Allocation/trafic TurboPixel | Ratio TurboPixel / non compressé | Réglages de test / résultat visuel |
|:---|:---|:---|---:|---:|---:|:---|
| UI opaque | Aucun | À déterminer, opaque | À déterminer | À déterminer | À déterminer | Résolution : à déterminer ; politique de rafraîchissement : à déterminer ; rapport/configuration TurboPixel : à déterminer |
| UI avec mélange alpha, composée avant la sortie | Alpha par pixel et/ou global dans les couches sources | À déterminer, généralement opaque après composition | À déterminer | À déterminer | À déterminer | Décrire le contenu composé ; vérifier les artefacts sur les contours, les ombres, les dégradés et le texte |
| Chemin de sortie conservant l'alpha, si pris en charge | Alpha conservé jusqu'au tampon final | À déterminer | À déterminer | À déterminer | À déterminer | Confirmer la puce, le SDK, le format et le chemin d'affichage exacts avant les essais |

</div>

Pour chaque chemin TurboPixel valide, calculez le **ratio TurboPixel / non compressé** avec la formule `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%` : divisez la taille du framebuffer TurboPixel par celle du framebuffer non compressé, puis multipliez par 100 %. L'allocation attendue suit le rapport fixe applicable, mais le rapport exact, les formats pris en charge, l'alignement, la politique de rafraîchissement et le trafic PSRAM mesuré doivent provenir de la documentation de la puce sélectionnée, du SDK et d'un test sur le matériel cible. Enregistrez l'acceptation visuelle séparément : un rapport d'allocation fixe ne garantit pas des artefacts identiques pour un contenu opaque, riche en texte, dégradé ou composé avec alpha.

## Pourquoi utiliser TurboPixel { #why-use-turbopixel }

### Réduire le stockage du framebuffer { #reduce-psram-capacity }

Un framebuffer complet peut occuper beaucoup de PSRAM à haute résolution ou avec plusieurs tampons de dessin. TurboPixel réduit l'allocation du bitmap final compressé et peut laisser davantage de mémoire pour les ressources d'interface, l'audio, les données applicatives ou d'autres surfaces.

Calculez toutefois le pic de mémoire occupée simultanément, pas seulement la taille de ce bitmap. Un tampon de rendu non compressé, un tampon d'affichage compressé, la mémoire de travail de compression et des copies pour le double tampon peuvent coexister. Leurs tailles et durées de vie déterminent si la conception complète exige moins de PSRAM.

### Réduire le trafic de lecture d'affichage { #reduce-psram-bandwidth }

Le contrôleur d'affichage lit moins d'octets dans un framebuffer compressé avant décompression. Cela réduit les lectures d'affichage et la contention avec le CPU, ePicasso, le DMA, l'audio et les communications sans fil.

Ce n'est pas l'économie de trafic total. Le rendu écrit toujours des pixels ; la compression lit son entrée et écrit sa sortie. Mesurez ces transferts et leur chevauchement avec les lectures d'affichage. Si l'écran est souvent redessiné, le coût de compression peut annuler le gain en lecture ; le bilan peut différer lorsqu'une même image est affichée à répétition. Mesurez aussi l'énergie du système.

### Rendre le budget prévisible { #make-budgeting-predictable }

Avec un format de pixel et un niveau de compression constants, le contenu ne modifie pas le rapport nominal. Allouez les tampons selon les règles du SDK pour les lignes compressées et leur alignement, puis incluez toutes les lectures et écritures du rendu, de la compression et de l'affichage. Comptez séparément les octets envoyés au panneau : TurboPixel est décompressé avant cette sortie et ne réduit pas automatiquement son volume.

## Compromis de qualité et d'intégration { #quality-and-integration-trade-offs }

TurboPixel doit être validé dans le cadre de la conception d'affichage complète :

- Testez le texte, les lignes fines, les dégradés, les icônes, les photographies, les animations et les éléments d'UI à fort contraste pour détecter des artefacts visibles.
- Confirmez que l'appareil et le SDK choisis prennent en charge le format de couleur, l'alignement des tampons, le chemin extDMA et la configuration du contrôleur d'affichage.
- Mesurez le temps de trame, la bande passante PSRAM, la latence de l'interface et la consommation sous des charges combinées d'affichage, Bluetooth, audio et IA.
- Gardez un chemin non compressé disponible pendant la mise en service afin que les problèmes de qualité d'image et de pilote puissent être isolés.
- Ne présentez pas TurboPixel comme sans perte, même lorsque les artefacts ne sont pas visibles dans une UI particulière.

## Vérifications d'intégration au SDK { #sdk-integration-checks }

Le guide extDMA cité énumère dix niveaux nominaux, tandis que le calcul de taille du SDK cité implémente les niveaux 1, 2 et 3. Ne supposez pas que votre compilation accepte tous les niveaux documentés. Validez le niveau choisi et le calcul de taille des lignes correspondant ; une valeur non prise en charge peut déclencher un autre réglage dans une fonction auxiliaire.

Le guide extDMA cite les formats d'entrée RGB565, RGB888 et ARGB8888. Leur prise en charge ne garantit pas que le chemin d'affichage compressé conserve le canal alpha. La branche LCDC sans registre dédié de décompression de la couche 0 n'accepte que RGB565/RGB888 pour les couches compressées ; vérifiez la branche utilisée par la puce. Dans le pilote LCDC cité, `HAL_LCDC_LayerSetCmpr` active la compression sur la couche 0.

L'en-tête LCDC actuel d'OpenSiFli ne définit la macro de prise en charge des couches compressées que si `HAL_EXTDMA_MODULE_ENABLED` est activé ; la condition de famille exclut SF32LB52x et SF32LB57x. L'en-tête fixe une largeur maximale de 512 pixels pour SF32LB55x/SF32LB56x et de 1024 pixels pour SF32LB58x. Ce sont des limites d'intégration des couches compressées, pas des limites universelles de résolution de l'écran. Un commentaire du code précise également que le chemin LCPU n'est pas activé.

Pour SF32LB55x, une réserve d'intégration s'impose. L'en-tête LCDC actuel d'OpenSiFli définit la macro des couches compressées lorsque `HAL_EXTDMA_MODULE_ENABLED` est activé, mais son commentaire précise que le chemin LCPU n'est pas activé. Le tableau LCDC publié avec le SDK indique que la décompression des couches compressées n'est pas prise en charge sur 55x, tandis que la fiche technique SF32LB55x décrit TurboPixel et la décompression par le contrôleur LCD. La présence d'une macro de compilation ne prouve pas que toute la chaîne d'affichage a été validée. Considérez le support sur 55x comme conditionnel et vérifiez la version du SDK, le cœur, la configuration de compilation et le matériel cible ; ne déduisez pas le fonctionnement à l'exécution de la seule présence de cette macro.

Distinguez la propriété des tampons entre le moteur de rendu, extDMA et le contrôleur d'affichage. Attendez la fin du rendu avant compression, la fin de la compression avant affichage et la fin de l'utilisation par l'affichage avant de réutiliser le tampon. En mémoire partagée avec cache, écrivez d'abord en mémoire (opération clean) les lignes de cache modifiées contenant les données source écrites par le CPU, avant que le matériel les lise. Préparez les lignes de cache de destination pour qu'aucune ligne modifiée ne puisse ensuite écraser le résultat matériel ; après la fin du traitement, invalidez les lignes obsolètes avant leur lecture par le CPU. Respectez les limites des lignes de cache et les données voisines. La fin de compression n'est pas la fin du transfert au panneau.

Les adresses source et destination et la longueur de transfert extDMA doivent être alignées sur 4 octets. Suivez les règles du SDK pour le stride, les blocs et la taille des tampons ; diviser les octets de l'image non compressée par le rapport nominal ne suffit pas.

## Disponibilité au sein de la famille SF32 { #availability-in-the-sf32-family }

TurboPixel est documenté pour les familles SF32 suivantes :

<div align="center"><em>Disponibilité documentée de TurboPixel</em></div>

<div align="center" markdown>

| Famille SF32 | Statut TurboPixel | Contexte d'intégration |
|:---|:---|:---|
| **SF32LB52x** | Non disponible | Utiliser un framebuffer non compressé ou une autre stratégie mémoire/bande passante prise en charge. |
| **SF32LB55x** | Conditionnel dans le code actuel ; fonctionnement de bout en bout non établi | L'en-tête LCDC actuel expose la fonction de couche compressée avec extDMA, mais indique que le chemin LCPU n'est pas activé ; le tableau publié du SDK marque 55x comme non pris en charge. Vérifiez le cœur, la configuration du SDK et le matériel cible. |
| **SF32LB56x** | Documenté | extDMA compresse le framebuffer final avec perte et à rapport fixe ; le contrôleur d'affichage le décompresse. |
| **SF32LB57x** | Non disponible | Utiliser un framebuffer non compressé ou une autre stratégie mémoire/bande passante prise en charge. |
| **SF32LB58x** | Documenté | extDMA compresse le framebuffer final avec perte et à rapport fixe ; le contrôleur d'affichage le décompresse. |
| **Autres familles SF32** | Confirmer pour chaque appareil | Ne déduisez pas la prise en charge de TurboPixel d'eZip, d'ePicasso ou de la présence de PSRAM. Vérifiez la fiche technique et le manuel de référence du modèle exact, la version du SDK et le pilote d'affichage. |

</div>

Ce tableau indique la disponibilité documentée pour chaque famille ; il ne garantit pas la prise en charge de tous les boîtiers, interfaces de panneau, formats de pixel, versions du SDK ou configurations de carte. Confirmez la cible exacte avant d'arrêter vos choix de mémoire ou de bande passante.

## Points clés à retenir { #key-takeaways }

- TurboPixel compresse le framebuffer final avec perte et selon un **rapport fixe**.
- extDMA produit TurboPixel à partir du bitmap rendu ; le contrôleur d'affichage le décompresse sur le chemin du panneau.
- Son objectif principal est de réduire le **stockage du framebuffer** et le **trafic de lecture d'affichage** ; vérifiez les économies pour l'ensemble des tampons et transferts.
- La documentation produit décrit TurboPixel sur SF32LB55x, SF32LB56x et SF32LB58x. Pour 55x, l'en-tête actuel définit la macro des couches compressées avec extDMA, mais précise que le chemin LCPU n'est pas activé ; le tableau publié du SDK marque 55x comme non pris en charge. Considérez ce support comme conditionnel et validez toute la chaîne d'affichage. Le code actuel exclut SF32LB52x et SF32LB57x ; vérifiez les autres cibles individuellement.
- TurboPixel complète eZip : eZip est une compression de ressources sans perte, tandis que TurboPixel est une compression avec perte pour le bitmap final.

## Sources primaires { #primary-references }

- [Guide extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [Implémentation du calcul de taille](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [API extDMA](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [Conditions de prise en charge LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [Garde actuelle des couches compressées LCDC dans OpenSiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [Tableau généré des capacités LCDC du SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [Implémentation des couches LCDC](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- Fiches produit : [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
