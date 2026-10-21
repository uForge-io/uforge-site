---
icon: lucide/audio-lines
title: "Exemples audio du SDK"
description: "Choisissez l'exemple de SiFli-SDK adapté à la capture de microphones PDM, à l'enregistrement, à la lecture, aux codecs, au stockage et au mixage audio."
tags:
  - Audio
  - Exemples
---

# Exemples audio du SDK { #audio-sdk-examples }

Les exemples audio de SiFli-SDK sont des points de départ pratiques pour valider une chaîne de signal complète, mais ne constituent pas un firmware prêt à intégrer dans un produit. Choisissez l'exemple qui couvre déjà la partie la plus complexe de votre conception : capture par microphone, sortie haut-parleur, stockage, codec ou flux audio simultanés. Faites d'abord fonctionner l'exemple sans modification sur la carte cible, puis adaptez un seul sous-système à la fois.

Cette page regroupe une sélection d'exemples audio de SiFli-SDK par tâche d'ingénierie. L'[index audio officiel](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) sert de point de départ. Le tableau indique les cartes explicitement listées sur les pages officielles de SiFli au moment de cette vérification ; le nom d'une série ne garantit pas la compatibilité de toutes ses cartes ni de toutes les versions du SDK. Avant de compiler, vérifiez la page correspondant à la version utilisée et la configuration de la carte cible.

## Choisir l'exemple adapté { #start-with-the-right-example }

<div align="center"><em>Tableau : Exemples audio de SiFli-SDK classés par tâche</em></div>

<div align="center" markdown>

| Objectif | Exemple à privilégier | Ce qu'il permet de valider | Cartes et limites documentées officiellement |
|:-----------------|:-----------|:---------------|:----------------------------|
| Capturer avec deux ou quatre microphones numériques | [Exemple PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | Capture PDM ; enregistrement WAV et lecture dans les modes qui les prennent en charge | La page actuelle ne liste que `sf32lb56-lcd_a128r12n1`. Vérifiez le câblage PDM et le multiplexage des broches. La légende de la configuration des broches comporte une faute dans le nom de la carte : `f32lb56-lcd_a128r12n1` (le `s` initial manque). La commande de compilation utilise le nom correct. |
| Capturer avec deux microphones analogiques | [Exemple de musique locale pour haut-parleur stéréo (Local Music Example for stereo speaker, ADC/DAC double)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Capture simultanée dans des fichiers PCM distincts ; sélection d'un microphone pour l'écoute sur haut-parleur | Nécessite une carte SF32LB58x personnalisée et ne fonctionne pas sur les cartes équipées d'un module SiFli. Deux microphones analogiques et deux haut-parleurs analogiques sont requis. |
| Valider le chemin de base du microphone au haut-parleur | [Exemple d'enregistrement](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Capture de cinq secondes dans un tampon PCM en mémoire, puis lecture automatique | `eh-lb525` et les séries `sf32lb52-lcd`, `sf32lb56-lcd` ou `sf32lb58-lcd` ; un haut-parleur est requis. |
| Lire un fichier audio prédéfini depuis le système de fichiers racine | [Exemple de lecture locale](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | Lecture du fichier prédéfini `16k.wav` depuis la partition racine FAT montée ; un MP3 prédéfini est aussi possible s'il tient dans la capacité configurée | `eh-lb525` et les séries `sf32lb52-lcd`, `sf32lb56-lcd` ou `sf32lb58-lcd` ; partition racine FAT et haut-parleur requis. |
| Lire de la musique depuis une carte SD | [Lecteur MP3 local](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | Lecture de fichiers MP3 ou WAV du répertoire `music` de la carte SD et réglage du volume via le shell | La page actuelle ne liste que `sf32lb52-lchspi-ulp`. SPI1, FAT/MSD et un haut-parleur sont requis ; une batterie externe est aussi nécessaire pour détecter les appuis longs. |
| Enregistrer, compresser, décoder et lire de l'audio sans perte | [Exemple FLAC](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | Enregistrement PCM, encodage FLAC, décodage et lecture | Séries `sf32lb52-lcd`, `sf32lb56-lcd` et `sf32lb58-lcd` ; FAT, `libFLAC` et composants audio requis. |
| Enregistrer, compresser, décoder et lire de l'audio destiné à la parole | [Exemple Opus](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | Capture au microphone à 16 kHz, encodage et décodage Opus, puis lecture sur haut-parleur | La page actuelle ne liste que `eh-lb525`. FAT et composants audio requis ; suivez les recommandations de pile propres à cet exemple ci-dessous. |
| Mixer plusieurs pistes locales | [Lecteur mixeur audio à trois canaux (page officielle en chinois)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Décodage indépendant de trois fichiers locaux, rééchantillonnage si nécessaire et sortie mixée | La page actuelle liste `sf32lb52-lcd_n16r8` et `sf32lb56-lcd_n16r12n1` comme cartes testées ; utilisez l'image de système de fichiers et les fichiers fournis pour l'exemple. |

</div>

## Prérequis communs { #shared-starting-point }

La plupart des exemples partagent les mêmes prérequis : la carte doit disposer du matériel audio nécessaire et celui-ci doit être correctement connecté ; sa configuration doit activer les blocs audio requis, et l'exemple doit être compatible avec la carte cible. Les exemples qui lisent ou écrivent des fichiers nécessitent aussi un système de fichiers monté. Ne reprenez pas sans vérification un nom de carte, une affectation de broches ou un réglage `menuconfig` d'un autre exemple : consultez la page amont et les fichiers de configuration de la carte cible.

!!! warning "Protéger les données existantes du système de fichiers"
    L'exemple Opus de la v2.5.1 appelle `dfs_mkfs()` si le montage du système de fichiers racine échoue ([code source](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). Ne reprenez pas cette récupération par formatage automatique dans un produit sans politique explicite de conservation des données. Un échec de montage n'autorise pas l'effacement des données utilisateur.

Pour tous les exemples, limitez volontairement la première validation :

1. Compilez et flashez le projet sans modification sur une carte compatible.
2. Vérifiez la capture ou la lecture attendue avec du matériel audio fonctionnel et des fichiers de référence validés.
3. Consignez la révision du SDK, le nom de la carte, la configuration, l'affectation des broches et le journal de console série.
4. Modifiez un seul élément propre au produit, puis répétez le même test.

La [Vue d'ensemble de l'audio](overview.md) explique les choix d'interface et d'architecture qui sous-tendent ces exemples. Pour la gestion des tampons, l'arrêt des sessions et la coexistence avec l'affichage ou Bluetooth, consultez [Audio Server et mise en tampon](audio-server-buffering.md).

## Capture par microphones numériques : PDM { #digital-microphone-capture-pdm }

Utilisez l'exemple PDM lorsqu'un produit doit capter le son avec des microphones numériques plutôt qu'avec une entrée analogique. L'exemple officiel prend en charge deux ou quatre microphones PDM, mais la création du fichier d'enregistrement et sa lecture dépendent du mode de traitement. La topologie documentée utilise les canaux gauche et droit de `PDM1` pour deux microphones et ajoute `PDM2` pour en gérer quatre. Une interface PDM peut gérer jusqu'à deux microphones numériques : le nombre d'interfaces ne correspond donc pas au nombre de microphones. Vérifiez la configuration prise en charge à partir du mappage des interfaces et des canaux du SoC cible.

La page amont actuelle indique `sf32lb56-lcd_a128r12n1` comme carte prise en charge. Le mode `pdm open pdm12 4 raw` produit uniquement des journaux, sans fichier d'enregistrement. Les modes de traitement Anyka donnent une sortie mono, même avec quatre microphones : quatre entrées ne signifient pas un fichier de sortie à quatre canaux. Vérifiez les dépendances de l'algorithme et le format de sortie avant d'utiliser cet exemple pour un réseau de microphones.

Avant de l'adapter, vérifiez ces quatre points :

- La puce et la carte choisies exposent les signaux PDM nécessaires.
- Les signaux d'horloge et de données, l'alimentation et la masse des microphones respectent leur fiche technique.
- La configuration de multiplexage des broches attribue les fonctions PDM avant le démarrage du pilote.
- Le produit a besoin des services d'enregistrement et de lecture activés par l'exemple ; ils ne sont pas nécessaires pour la seule capture PDM.

La page amont de l'exemple PDM décrit une configuration de carte et un brochage propres à cet exemple. Utilisez-les comme référence vérifiée, mais remplacez-les par le câblage réel de la carte cible ; ne supposez pas qu'ils peuvent être repris sans modification. Voir l'[exemple PDM](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html).

## Capture analogique, enregistrement et lecture de base { #analog-capture-and-basic-recordplayback }

L'**exemple d'enregistrement** permet de valider simplement la capture par microphone suivie d'une lecture locale : il enregistre pendant cinq secondes dans un tampon PCM en mémoire, puis le lit automatiquement sur le haut-parleur. La page officielle liste `eh-lb525` et les séries `sf32lb52-lcd`, `sf32lb56-lcd` et `sf32lb58-lcd`. C'est un bon point de départ avant d'ajouter un système de fichiers, de la compression, le transport Bluetooth ou plusieurs microphones.

Le **Local Music Example for stereo speaker** (exemple ADC/DAC double) est une référence spécialisée pour une carte SF32LB58x personnalisée. La page officielle précise qu'il ne fonctionne pas sur les cartes équipées d'un module SiFli et qu'il nécessite deux microphones analogiques et deux haut-parleurs analogiques. La commande `mic2file` enregistre les deux microphones dans des fichiers PCM distincts ; `mic2speaker 0` ou `mic2speaker 1` sélectionne un microphone pour l'écoute sur haut-parleur. Utilisez-le uniquement si cette topologie analogique correspond au produit ; sinon, commencez par l'exemple d'enregistrement, plus simple.

Dans les deux cas, vérifiez le niveau de bruit de fond sans signal, le gain, l'écrêtage ainsi que le comportement au démarrage et à l'arrêt avant d'examiner les fonctions logicielles. Une chaîne stable de capture et de lecture PCM constitue la base du travail sur les codecs, les fichiers et Bluetooth.

## Lecture locale et supports de stockage { #local-playback-and-storage }

L'**exemple de lecture locale** est la référence la plus simple pour la lecture à partir de fichiers. La page officielle liste `eh-lb525` et les séries `sf32lb52-lcd`, `sf32lb56-lcd` et `sf32lb58-lcd`. Il monte la partition racine FAT et lit le fichier prédéfini `16k.wav`. Un fichier MP3 peut aussi être préchargé dans le répertoire `disk/` de l'exemple, à condition de respecter la capacité configurée du système de fichiers. Utilisez-le pour valider tôt la sortie haut-parleur locale et lire des sons de notification ou des messages préenregistrés.

Le **lecteur MP3 local** ajoute le stockage amovible : il lit des MP3 ou WAV depuis le répertoire `music` d'une carte SD et règle le volume via le shell. Les deux exemples de lecture locale nécessitent un système de fichiers ; celui-ci utilise aussi SPI1 et le pilote SPI MSD. Sur la carte documentée `sf32lb52-lchspi-ulp`, connectez une batterie, sinon les appuis longs ne seront pas détectés. Choisissez cet exemple si le produit utilise une carte SD.

Ces deux exemples valident la lecture, mais ne fournissent pas une architecture complète de lecteur multimédia. Avant d'en faire une fonction produit, concevez séparément l'indexation des fichiers, le traitement des fichiers endommagés, les interruptions, la reprise après un changement d'état d'alimentation et le comportement de l'interface utilisateur.

## Chaînes de traitement FLAC et Opus { #flac-and-opus-codec-pipelines }

L'**exemple FLAC** couvre toute la chaîne sans perte : enregistrer le PCM du microphone, l'encoder en FLAC, le décoder puis le lire. La page officielle liste les séries `sf32lb52-lcd`, `sf32lb56-lcd` et `sf32lb58-lcd` . L'exemple requiert le système de fichiers FAT, les composants audio et `libFLAC`. Il permet de tester une chaîne de capture avec stockage dans un fichier ou de comparer l'espace requis à celui du PCM non compressé.

L'**exemple Opus** illustre une chaîne de compression conçue pour les applications vocales. La page officielle actuelle ne liste que `eh-lb525`. L'exemple capture à 16 kHz, traite des trames de 10 ms à environ 16 kbit/s, puis décode et lit le flux obtenu. Sa documentation précise que la taille de pile requise varie selon le mode d'encodage choisi. Respectez cette contrainte lors de l'adaptation de l'exemple et ne supposez pas que la pile par défaut de la tâche restera suffisante après l'ajout de code applicatif.

Le README officiel de SiFli-SDK donne des réglages de pile propres à cet exemple : `OPUS_STACK_SIZE` à 20k lorsque `opus_test()` appelle `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))` ; sans ce mode forcé, il recommande 200k. Ce ne sont pas des exigences générales d'Opus. Avant de reprendre ces valeurs, vérifiez la révision du SDK et le chemin d'encodage utilisés, puis mesurez le pic d'utilisation de la pile avec la charge du produit pour dimensionner la tâche.

Ces deux exemples ne réalisent ni un appel Bluetooth complet ni un produit de streaming de bout en bout. Utilisez-les d'abord pour valider l'encodage et le décodage locaux, puis intégrez le transport, la gestion des tampons et la stratégie de session en mesurant les marges de latence et de mémoire.

## Mixage sur trois canaux { #three-channel-mixing }

Le **lecteur-mixeur à trois canaux** figure actuellement comme testé sur `sf32lb52-lcd_n16r8` et `sf32lb56-lcd_n16r12n1`. L'exemple lit trois fichiers audio locaux, décode chaque flux, rééchantillonne si nécessaire les entrées dont la fréquence diffère de 48 kHz, combine les flux PCM mono et lit le résultat. L'ensemble documenté comprend deux MP3 et un WAV ; utilisez l'image de système de fichiers et les noms indiqués, sans supposer que des fichiers arbitraires y sont inclus.

Le mixeur vérifié additionne les trois échantillons mono puis divise par trois, au lieu de les additionner à plein gain. Son exécution documentée dure environ 50 secondes. Distinguez cette politique de gain et cette durée de démonstration limitée des besoins de mixage du produit.

Cet exemple convient aux messages, effets et musiques simultanés, lorsque le produit doit déterminer quels sons peuvent se superposer. Il ne définit pas la stratégie audio du produit : précisez la priorité des flux, le contrôle du volume, le comportement en cas d'écrêtage, le budget mémoire et la réaction si la lecture d'un fichier ou le décodage dépasse son délai. Consultez [Audio Server et mise en tampon](audio-server-buffering.md) pour expliciter ces contraintes à l'exécution.

## Adapter un exemple tout en conservant les éléments de validation { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Tableau : Éléments à conserver et à revalider lors de l'adaptation d'un exemple audio</em></div>

<div align="center" markdown>

| Domaine | À conserver de l'exemple | À revalider pour le produit |
|:---------|:----------------------|:----------------------------|
| Matériel | Routage de la carte validé et chemin périphérique pris en charge | Référence du microphone ou du haut-parleur, gain, alimentations, multiplexage des broches, routage et accès aux tests de production |
| Configuration | Composants du SDK strictement nécessaires | Mémoire, système de fichiers, codecs, Audio Manager et options réellement requises par le produit |
| Données audio | Format des échantillons et fichiers de référence validés | Fréquence d'échantillonnage, nombre de canaux, taille des tampons, latence visée et gestion des erreurs |
| Fonctionnement à l'exécution | Séquence de base pour la capture ou la lecture | Activité simultanée de l'interface, de Bluetooth et du stockage ; transitions basse consommation, reprise et arrêt |
| Éléments de validation | Comportement attendu d'après la source officielle | Journal série, fichiers de capture/lecture, courant mesuré et test de régression reproductible |

</div>

## Pour aller plus loin { #related-resources }

- [Vue d'ensemble de l'audio](overview.md) pour les interfaces, les types de sessions, la consommation énergétique et la validation.
- [Audio Server et mise en tampon](audio-server-buffering.md) pour la gestion des flux, les tampons DMA et les essais sous charge produit.
- [Exemples](../../develop/examples/index.md) pour le catalogue d'exemples du SDK couvrant plusieurs domaines.
- [Index des exemples audio de SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) pour la liste officielle à jour et les instructions de configuration propres à chaque exemple.
