---
icon: lucide/file-archive
description: "Comment eZip et eZip-A de SiFli réduisent l'espace occupé par les ressources d'UI, le trafic mémoire et la charge de décodage CPU sur les appareils SF32 compatibles."
tags:
  - Graphismes
---

# eZip : compression sans perte et décodage matériel { #ezip-lossless-compression-and-hardware-decoding }

## Introduction { #introduction }

**eZip** est le format propriétaire sans perte de SiFli destiné aux ressources graphiques. Sur les appareils SF32 qui prennent en charge les fonctions concernées, le bloc matériel EZIP décode les ressources graphiques eZip. Il propose également des modes GZIP et LZ4 distincts pour les données générales ; les données décompressées sont écrites en mémoire via AHB, et non directement vers EPIC. Au lieu de stocker chaque ressource d'affichage sous forme de bitmap non compressé en NOR Flash, PSRAM ou dans un système de fichiers, le produit peut enregistrer les données eZip et les décoder lorsque l'UI en a besoin.

**eZip-A** est le format correspondant aux ressources animées. Les fichiers sources sont convertis pendant la compilation ou la préparation des ressources ; eZip n'est pas un décodeur d'image universel capable de traiter n'importe quel fichier à l'exécution.

Pour des données non graphiques, comme une image OTA, le produit doit définir et valider l'ensemble du processus de mise à jour : stockage, vérification d'intégrité, compatibilité et voie de décompression prévue. Le [flux graphique](overview.md#sf32-graphics-flow) concerne les ressources d'affichage, pas ce processus de mise à jour propre à l'application.

Dans un produit doté d'une interface graphique, l'objectif est de lire moins de données depuis le stockage et d'éviter que le CPU applicatif ne décompresse sans cesse les mêmes ressources. Cela peut réduire l'espace de stockage utilisé et le trafic vers la mémoire externe, tout en libérant des ressources pour l'UI, le Bluetooth, l'audio et les autres tâches de l'application.

Pour situer eZip par rapport à ePicasso, TurboPixel et au contrôleur d'affichage, consultez la [Vue d'ensemble des graphismes](overview.md#sf32-graphics-flow). Cette page porte sur la préparation des ressources eZip, leur compression et leur décodage.

Consultez cette page si les ressources d'UI occupent trop d'espace en Flash, consomment trop de bande passante mémoire externe ou nécessitent un processus de conversion reproductible. Elle distingue la compression sans perte des fichiers sources de celle du framebuffer final, abordée dans [TurboPixel](turbopixel.md).

## Capacités et limites { #capabilities-and-boundaries }

eZip est conçu pour s'intégrer à un processus de production de ressources, et non pour des conversions ponctuelles de fichiers :

- **Compression graphique sans perte.** Le format conserve les données d'image et prend en charge la transparence. SiFli décrit qualitativement son taux de compression graphique habituel comme *légèrement supérieur à celui du PNG*, sans publier de valeur numérique fixe.
- **Ressources statiques et animées.** GraphicsTool convertit les fichiers PNG, GIF et APNG en ressources eZip statiques ou en animations eZip-A.
- **Décodage assisté par le matériel sur les appareils compatibles.** Il peut réduire la charge de décodage du CPU applicatif, selon la puce, le SDK, le format source et la voie du pilote.
- **Flux de travail GraphicsTool.** GraphicsTool de SiFli prend en charge les formats sources courants, le redimensionnement, la conversion d'images, le traitement par lots et la génération eZip/eZip-A.
- **Liaison avec ePicasso sur les appareils compatibles.** La sortie directe peut éviter un tampon contenant l'image source entièrement décodée, réduisant les besoins en mémoire et le trafic.

« Sans perte » qualifie la compression des pixels fournis à l'encodeur, pas toutes les conversions antérieures. Le redimensionnement, la conversion de RGB888 en RGB565 ou la suppression d'alpha peuvent déjà faire perdre de l'information. Comparez les pixels décodés à l'entrée de l'encodeur de mêmes dimensions et format ; conservez le canal alpha si la transparence est nécessaire.

## Taux de compression et usages généraux { #compression-ratio-and-general-purpose-use }

Pour les ressources graphiques, utilisez le PNG comme référence pratique. Selon SiFli, eZip offre un taux de compression légèrement supérieur à celui du PNG tout en préservant les données d'image et la transparence. La réduction réelle de la taille des fichiers dépend toutefois des dimensions, du format de pixel, de la transparence, de l'usage d'une palette et du niveau de détail. Mesurez des ressources représentatives avec le profil de conversion approuvé ; ne dimensionnez pas le stockage à partir d'un pourcentage unique.

L'outil EZIP de SiFli peut aussi compresser des fichiers à usage général en GZIP ou LZ4. Cette opération est distincte de la conversion des ressources graphiques au format eZip. Le taux de compression des données générales dépend de leur contenu : les données répétitives ou structurées peuvent bien se compresser, tandis que les fichiers déjà compressés — images JPEG, vidéos MP4, archives ZIP — et les données chiffrées se prêtent peu à une compression supplémentaire, voire pas du tout. Avant d'utiliser cette voie pour des données non graphiques, vérifiez la taille obtenue et le mode de décompression pris en charge par l'appareil cible.

Le HAL EZIP distingue les modes eZip graphique, GZIP et LZ4. La décompression GZIP/LZ4 des données générales écrit le résultat en mémoire via AHB, et non directement vers EPIC. Une archive OTA doit respecter l'encapsulation des données prise en charge et les limites de taille du mode choisi ; un fichier graphique `.ezip` n'est pas interchangeable avec un paquet de mise à jour compressé quelconque.

## Comparaison de taille de fichiers d'images représentatives (modèle) { #representative-image-size-comparison-placeholder }

Utilisez cette section pour consigner des mesures comparables d'images d'UI représentatives **opaques** et **avec canal alpha**. Remplacez les valeurs provisoires après avoir converti chaque image source avec les versions et réglages approuvés des outils. Consignez aussi les dimensions de l'image, le format de couleur, le traitement du canal alpha et la qualité JPEG. eZip et PNG conservent la transparence source, contrairement au JPEG qui ne prend pas en charge le canal alpha. Pour comparer une image transparente en JPEG, utilisez donc un arrière-plan précomposé et documentez-le. Ne présentez pas ce résultat comme une préservation équivalente de la transparence.

<div align="center"><em>Comparaison de taille de fichiers d'images représentatives — modèle</em></div>

<div align="center" markdown>

| Scénario | Format | Encodage | Taille du fichier | Rapport au BMP | Réglages et notes de test |
|:---|:---|:---|---:|---:|:---|
| Image d'UI opaque | BMP | Référence non compressée | À déterminer | 100 % | Image source : à déterminer ; dimensions : à déterminer ; format de pixel : à déterminer |
| Image d'UI opaque | eZip | Sans perte | À déterminer | À déterminer | Version GraphicsTool et profil de conversion : à déterminer |
| Image d'UI opaque | PNG | Sans perte | À déterminer | À déterminer | Encodeur et réglages : à déterminer |
| Image d'UI opaque | JPEG | Avec perte | À déterminer | À déterminer | Encodeur et réglage de qualité : à déterminer |
| Image d'UI avec canal alpha par pixel | BMP | Référence non compressée | À déterminer | 100 % | Préciser la variante BMP et le traitement du canal alpha : à déterminer |
| Image d'UI avec canal alpha par pixel | eZip | Sans perte avec alpha | À déterminer | À déterminer | Version de GraphicsTool et profil de conversion ; vérifier les bords transparents : à déterminer |
| Image d'UI avec canal alpha par pixel | PNG | Sans perte avec alpha | À déterminer | À déterminer | Encodeur et réglages : à déterminer |
| Image d'UI avec canal alpha par pixel | JPEG | Avec perte, sans alpha | À déterminer | À déterminer | Documenter l'arrière-plan précomposé et le réglage de qualité ; il ne s'agit pas d'une comparaison préservant le canal alpha |

</div>

Calculez le **rapport au BMP** pour chaque scénario avec la formule `file size ÷ BMP file size × 100%` : divisez la taille du fichier par celle du BMP, puis multipliez le résultat par 100 %. Ne comparez pas directement les lignes opaques et celles avec canal alpha, et ne présentez pas ce tableau comme un taux de compression général. Il s'agit d'un modèle de mesure ; les résultats dépendent des images choisies, de la couverture du canal alpha et des réglages de conversion.

## Pourquoi utiliser eZip { #why-use-ezip }

### Réduire l'espace occupé par les ressources { #reduce-asset-storage }

Les ressources compressées peuvent occuper moins d'espace que les tampons de pixels non compressés en NOR Flash, PSRAM, NAND ou stockage amovible. C'est particulièrement utile pour les cadrans de montre, les jeux de polices multilingues, les collections d'icônes, les thèmes d'UI et les interfaces riches en animations.

### Réduire le trafic sur le bus mémoire { #reduce-memory-bus-traffic }

Lorsque les ressources résident en NOR Flash externe ou en PSRAM, les bitmaps non compressés peuvent consommer beaucoup de bande passante avant même le début du dessin. Transférer les ressources compressées et les décoder près du chemin graphique peut réduire ce trafic. Le gain réel dépend du taux de compression, du format source, du mode de mise à jour de l'écran et de la vitesse de l'interface de stockage.

### Libérer du temps processeur { #preserve-cpu-time }

Avec une voie de décodage matériel compatible, le processeur applicatif n'a pas à décompresser chaque ressource par logiciel. Le temps ainsi libéré peut améliorer la réactivité de l'interface ou être consacré aux communications sans fil, à l'audio, aux capteurs et à la gestion basse consommation.

### Rendre la préparation des ressources reproductible { #make-asset-delivery-repeatable }

Un outil de conversion et un format de ressources maîtrisé rendent les versions reproductibles : les illustrations sources, les paramètres de conversion, les fichiers générés et les profils de résolution cible peuvent être versionnés ensemble. C'est plus fiable qu'une conversion manuelle ou que de demander aux développeurs d'interface de reproduire les mêmes réglages.

## Comparaison des implémentations eZip { #ezip-version-comparison }

Le tableau reprend les noms attestés par les fiches produit et le SDK. Un numéro de version ne garantit pas un ensemble universel de fonctions : vérifiez la puce choisie, la version du SDK, le format des ressources et la configuration mémoire de la carte.

<div align="center"><em>Implémentations eZip et prise en charge indépendante de JPEG</em></div>

<div align="center" markdown>

| Implémentation | Familles SF32 représentatives | Fonctions documentées | Conséquences pour la conception |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | Décompression graphique sans perte avec liaison directe vers ePicasso ; le SDK exclut cette famille de la prise en charge native d'eZip-A. | Utilisez des ressources eZip statiques ; ne supposez pas une prise en charge native des animations eZip-A. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Décompression graphique sans perte et animations eZip-A natives. SF32LB58x possède également un codec JPEG distinct. | Validez les besoins de l'animation et de la mémoire ; traitez JPEG/MJPEG comme une chaîne multimédia distincte. |
| **EZIP** | SF32LB57x | Décodage eZip/eZip-A et sortie directe vers EPIC. JPEGD est un décodeur JPEG distinct ; ne supposez pas qu'il utilise la même voie de sortie directe vers EPIC. | Générez les ressources avec une fenêtre de compression de 2048 octets. Ces éléments n'établissent pas une chaîne complète de lecture MJPEG ; vérifiez la prise en charge du middleware et du décodeur pour la cible exacte. |

</div>

La sortie directe vers EPIC évite de stocker l'image source entièrement décodée avant le rendu. Elle ne supprime ni la mémoire de travail du décodeur ni le tampon de rendu final, et ne fait pas du décodage JPEG une fonction d'EZIP. Pour la voie JPEGD indépendante, suivez la chaîne de pilotes documentée pour la famille cible.

## Préparer les ressources { #preparing-assets }

Versionnez les fichiers sources modifiables, puis générez les fichiers eZip comme artefact de compilation :

1. Définissez la résolution d'écran, le format de pixel et les besoins en animation de l'appareil choisi.
2. Préparez les images ou animations sources aux dimensions prévues ; ne comptez pas sur la mise à l'échelle à l'exécution pour corriger des ressources mal dimensionnées.
3. Utilisez SiFli GraphicsTool pour convertir et redimensionner les fichiers, puis générer les ressources eZip ou eZip-A.
4. Consignez la version de l'outil et le profil de conversion dans le projet, puis vérifiez les ressources générées sur le matériel cible.
5. Placez les fichiers à l'emplacement prévu et testez le démarrage à froid, les utilisations répétées de l'UI, le fonctionnement avec peu de mémoire et les mises à jour de l'écran pendant l'activité Bluetooth ou audio.

GraphicsTool prend en charge les formats courants PNG, JPEG, WebP et AVIF, et peut convertir des fichiers GIF, PNG et APNG en ressources eZip/eZip-A. Une ressource convertie n'est utilisable que si l'appareil cible et son SDK prennent en charge la voie de décodage configurée.

Pour les autres formats d'images fixes, le parcours documenté consiste à redimensionner et convertir d'abord en PNG, puis à encoder en eZip. Adaptez le format de couleur, le traitement d'alpha et la version de LVGL à la cible. L'exemple en ligne de commande du SDK exige `-winsize 2048` pour SF32LB57x ; les autres familles du tableau n'en ont pas besoin. Utilisez `sdk/tools/png2ezip/ezip.exe` et conservez les arguments exacts avec les ressources générées.

## Outils d'intégration { #integration-tools }

En plus de GraphicsTool pour ordinateur, SiFli propose les outils d'intégration suivants :

- **Les outils de développement en ligne de commande** permettent d'intégrer la conversion eZip à un processus automatisé et reproductible. Utilisez-les dans les scripts de compilation locaux ou les tâches d'intégration continue pour assurer la traçabilité entre les fichiers sources versionnés et les ressources eZip générées.
- **Les SDK Android et iOS** permettent d'intégrer eZip aux applications mobiles. Ils sont utiles lorsqu'une application mobile associée doit préparer, gérer, transférer ou traiter des ressources eZip dans le cadre d'un flux de travail lié à l'appareil.

Versionnez les profils de conversion, les versions des outils et du SDK, les sommes de contrôle des fichiers générés et les exigences de compatibilité de l'appareil cible. Les applications mobiles et les outils en ligne de commande doivent utiliser le même profil de ressources approuvé que le produit embarqué. Un fichier généré pour une puce ou une configuration du SDK ne fonctionnera pas nécessairement sans modification sur tous les appareils SF32.

## Recommandations de conception et de mise au point { #design-and-debugging-guidance }

- **Utilisez eZip pour les ressources.** Elles peuvent résider dans la NOR Flash, la PSRAM, la NAND ou un système de fichiers, mais le décodeur n'interprète pas les chemins de fichiers. Le pilote de stockage doit fournir ou charger les données par un accès matériel compatible. Le HAL impose un alignement sur 4 octets aux tampons d'entrée et de sortie AHB. eZip ne compresse pas le framebuffer final.
- **Dimensionnez la bande passante de transfert des ressources.** eZip peut réduire le trafic lié à leur transfert, mais les pixels décodés doivent toujours emprunter le chemin de rendu et d'affichage décrit dans la [Vue d'ensemble des graphismes](overview.md#sf32-graphics-flow).
- **Prévoyez une solution de repli sur le processeur.** Tous les types de ressources, formats de pixel ou opérations d'interface ne disposent pas nécessairement d'une voie de décodage ou de traitement graphique matériel.
- **Validez l'emplacement mémoire.** Testez les ressources et les tampons de dessin en SRAM interne, NOR Flash, PSRAM ou stockage amovible ; chaque choix influe sur la latence et la contention du bus.
- **Testez la charge de travail réelle.** Mesurez le temps de chargement à froid, la cadence d'animation, la latence de l'interface et la consommation lorsque le Bluetooth, l'audio, les capteurs et le rafraîchissement de l'écran fonctionnent simultanément.
- **Figez les paramètres de conversion avant la mise en production.** Une mise à jour de l'outil ou une modification des paramètres peut affecter la compatibilité des fichiers générés, leur qualité, l'espace de stockage requis et les performances de décodage.

## Points clés à retenir { #key-takeaways }

- eZip est le format de compression sans perte des ressources d'affichage de SiFli et une voie de décodage assistée par matériel sur les appareils SF32 compatibles.
- Utilisez eZip pour les ressources graphiques et les modes GZIP/LZ4 de l'outil pour les données générales ; leur taux de compression dépend des données sources et doit être mesuré.
- eZip-A est destiné aux ressources animées ; GraphicsTool convertit des illustrations courantes en ressources eZip/eZip-A.
- SiFli fournit également des outils en ligne de commande et des SDK Android/iOS pour intégrer eZip aux processus automatisés et aux applications mobiles associées.
- eZip peut réduire l'espace de stockage des ressources, le trafic en mémoire externe et le travail de décompression du processeur applicatif, mais ne remplace ni ePicasso ni le contrôleur d'affichage.
- Choisissez l'implémentation et la sortie documentées, sans supposer une hiérarchie de versions. Distinguez JPEGD d'EZIP et utilisez la fenêtre de compression imposée pour SF32LB57x.
- La réussite d'une intégration eZip repose sur un processus maîtrisé : illustrations sources, paramètres de conversion, emplacement de stockage, intégration graphique et essais sur la cible.

## Sources primaires { #primary-references }

- [GraphicsTool et préparation des ressources](https://wiki.sifli.com/tools/图形转换工具.html)
- [Modes, sorties, alignement et prise en charge des animations du HAL EZIP](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [Documentation de l'utilitaire EZIP](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [Modes, alignement et animations du HAL EZIP](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [Exemple LVGL eZip et paramètres de conversion](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [Documentation du SDK mobile eZip](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- Fiches produit : [SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [Interface JPEGD indépendante](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
