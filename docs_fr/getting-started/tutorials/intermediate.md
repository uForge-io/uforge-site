---
icon: lucide/trending-up
description: "Tutoriels SF32 sur l'intégration de sous-systèmes : capteurs I2C, écran LVGL de base, service périphérique BLE, lecture audio locale, stockage sur système de fichiers et tests de coexistence."
tags:
    - Tutoriels
---

# Intégration de sous-systèmes { #intermediate-tutorials }

Ces tutoriels supposent que vous maîtrisez les notions de [Premiers pas avec les périphériques](beginner.md) : GPIO, shell, bases ADC/PWM et modèle de pilote `rt_device_find()`. Cette série vous fait passer des périphériques individuels au middleware et aux flux de travail combinés : capteurs I2C, interface graphique, services BLE, lecture audio, stockage persistant et tests ciblés de coexistence.

Il ne s'agit pas seulement de faire fonctionner chaque sous-système une fois, mais de comprendre comment le firmware SF32 est généralement assemblé : partir d'un exemple SDK adapté, vérifier le chemin matériel, le relier à la couche périphérique RT-Thread ou au middleware, puis le tester avec le reste du produit.

Utilisez cette série lorsque les périphériques individuels fonctionnent déjà et que les risques d'intégration deviennent concrets : mémoire partagée, comportement temporel, consommation électrique, câblage propre à la carte et interactions entre composants middleware. Chaque exercice doit vous permettre d'isoler un sous-système testable, et pas seulement de produire une démonstration visuelle.

## Avant de commencer { #before-you-start }

Les exemples C sont des extraits, pas des fichiers source complets. Ajoutez les en-têtes, déclarations, traitements d'erreur et libérations de ressources nécessaires à votre projet et à votre version du SDK.

Les chemins des exemples et les cartes prises en charge peuvent varier selon la version du SDK. Avant la compilation, vérifiez la liste « Supported Platforms » et les exigences matérielles et de configuration propres à chaque exemple ; la prise en charge d'un exercice ne garantit pas celle des autres.

<div align="center"><em>Tableau : avant de commencer</em></div>

<div align="center" markdown>

| Prérequis | Pourquoi c'est important |
|:------------|:---------------|
| Shell fonctionnel | Vous avez besoin de `list_thread`, `list_device`, des journaux et d'outils d'inspection rapide. |
| E/S GPIO vérifiées | De nombreuses démonstrations middleware ont encore besoin de boutons, de LED ou d'interruptions. |
| Schéma de la carte | Les broches I2C et d'affichage, le chemin audio et l'organisation du stockage varient selon la carte. |
| Configuration de référence validée | Conservez une compilation dont le bon fonctionnement est établi avant de combiner des fonctionnalités. |
| Possibilité de mesurer le courant | L'intégration de sous-systèmes peut modifier la consommation au repos, même lorsque tout semble fonctionner. |

</div>

## Lire un capteur via I2C { #read-a-sensor-over-i2c }

**Objectif :** communiquer avec un véritable périphérique I2C plutôt qu'une seule broche GPIO.

**Durée :** 30-45 minutes

**Exemple de départ :** `example/hal/i2c/master` ou `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

Le nom `i2c1` est donné à titre d'exemple. Utilisez le nom du périphérique I2C enregistré par votre carte et vérifiez que `rt_device_find()` renvoie bien un périphérique avant d'utiliser le bus.

1. À l'aide de la fiche technique, vérifiez l'adresse I2C du capteur, la cartographie des registres, la tension d'alimentation et les résistances de rappel (pull-up) requises.
2. Confirmez quel bus `i2cX` et quelles broches votre carte utilise.
3. Adaptez l'exemple I2C EEPROM ou maître pour communiquer avec le capteur. S'il dispose d'un registre d'identification, lisez-le en premier ; sinon, commencez par un registre dont le comportement attendu est connu.
4. Décodez une vraie mesure et affichez-la via le shell.
5. Si le capteur dispose d'une sortie d'interruption ou d'une broche signalant que les données sont prêtes, reliez-la à un GPIO et reprenez le modèle d'interruption de l'exercice 2 de Premiers pas avec les périphériques.
6. Dans la mesure du possible, remplacez l'interrogation périodique par des lectures déclenchées par événement.

**Critères de réussite :** le firmware lit correctement un registre connu (celui de l'identifiant du périphérique, s'il existe), décode une valeur de capteur plausible et ne bloque pas le système si le capteur est absent.

**Dépannage :** si les lectures renvoient toujours `0xff` ou `0x00`, ou provoquent un dépassement du délai d'attente, vérifiez le format d'adresse (7 ou 8 bits), les résistances de rappel, la séquence d'alimentation et l'éventuelle utilisation des mêmes broches par un autre périphérique.

**Ce que vous avez appris :** les transactions I2C sur plusieurs octets et comment combiner une broche GPIO pilotée par interruption avec un périphérique de bus.

## Construire un écran LVGL de base { #build-a-basic-lvgl-screen }

**Objectif :** obtenir un véritable élément d'interface utilisateur sur l'affichage plutôt que des écritures brutes dans le framebuffer.

**Durée :** 45-60 minutes

**Exemple de départ :** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. Initialisez le pilote d'affichage et vérifiez les aplats de couleur avant de déboguer les widgets LVGL.
2. Créez une étiquette et un bouton.
3. Configurez la fonction de rappel du bouton pour modifier le texte de l'étiquette.
4. Ajoutez une petite animation et observez l'utilisation du CPU ou le timing des images via les outils shell.
5. Avant d'augmenter la charge graphique, lisez dans la [Vue d'ensemble des graphismes](../../learn/graphics/overview.md) les sections sur la stratégie de tampon, le rafraîchissement partiel et ePicasso.

**Critères de réussite :** l'écran s'initialise de façon fiable après une réinitialisation ; une entrée tactile ou par bouton, si elle est disponible et configurée, modifie l'état de l'interface ; et une animation simple ne bloque ni le shell ni Bluetooth.

**Dépannage :** distinguez les problèmes de panneau de ceux de LVGL. Si les aplats de couleur échouent, vérifiez l'alimentation, le reset, la séquence d'initialisation, le format des pixels et l'ordre des octets avant de modifier le code LVGL.

**Ce que vous avez appris :** le modèle objet/événement de LVGL et les étapes d'initialisation de l'affichage qui servent de point de départ aux projets graphiques.

## Diffuser des annonces BLE et établir une connexion en mode périphérique { #advertise-and-connect-as-a-ble-peripheral }

**Objectif :** établir la communication entre un téléphone ou un appareil central BLE et votre carte via un service GATT fonctionnel.

**Durée :** 45-60 minutes

**Exemple de départ :** `example/ble/peripheral`

1. Commencez par l'exemple de périphérique BLE simple et vérifiez l'annonce dans une application de scan BLE.
2. Connectez-vous depuis le téléphone et confirmez que l'appareil reste stable pendant plusieurs minutes.
3. Pour transmettre des données de capteur, configurez une caractéristique adaptée dans le service GATT de l'exemple et actualisez-la avec une mesure réelle, par exemple la lecture ADC de Premiers pas avec les périphériques, exercice 4, ou la mesure du capteur I2C de cette série, exercice 1.
4. Configurez les propriétés nécessaires de la caractéristique. Si vous utilisez les notifications, activez-les et vérifiez que le téléphone reçoit les changements.
5. Testez la déconnexion/reconnexion ainsi que le redémarrage de la carte pendant une connexion.
6. Lisez la [Vue d'ensemble Bluetooth](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework) avant de concevoir un service personnalisé.

**Critères de réussite :** l'appareil diffuse des annonces, établit la connexion, expose le service GATT configuré, échange des données selon les propriétés choisies pour la caractéristique et revient à un état propre après déconnexion/reconnexion.

**Dépannage :** testez ces cas : données de bonding obsolètes, oubli de l'appareil côté téléphone, redémarrage du périphérique pendant une connexion et modification des paramètres de connexion. De nombreux problèmes BLE n'apparaissent qu'après la première connexion réussie.

**Ce que vous avez appris :** le flux de diffusion d'annonces -> connexion -> notification GATT utilisé par la plupart des produits BLE.

## Lire de l'audio local depuis le stockage { #play-local-audio-from-storage }

**Objectif :** lire un fichier audio plutôt qu'une tonalité synthétisée.

**Durée :** 45-60 minutes

**Exemple de départ :** `example/multimedia/audio/local_music`

La documentation actuelle indique `sf32lb52-lchspi-ulp` comme plateforme prise en charge par `example/multimedia/audio/mp3_sd_player`. Ne supposez pas que l'exemple fonctionne sur votre carte : vérifiez sa liste des [plateformes prises en charge et ses prérequis matériels](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) avant de l'utiliser.

1. Chargez un petit fichier WAV ou MP3 sur le support de stockage attendu par l'exemple.
2. Compilez et flashez l'exemple.
3. Vérifiez que la lecture démarre sans distorsion et que la carte ne redémarre pas à son lancement.
4. Intégrez la logique de démarrage et d'arrêt de la lecture au gestionnaire de bouton de Premiers pas avec les périphériques, exercice 2.
5. Surveillez les défauts de sous-alimentation du tampon lorsque la journalisation shell ou les mises à jour de l'affichage sont actives.
6. Lisez la [Vue d'ensemble de l'audio](../../learn/audio/overview.md#playback-and-recording-basics) avant de changer le taux d'échantillonnage, le format ou la taille du tampon.

**Critères de réussite :** la lecture peut être lancée, arrêtée et reprise à plusieurs reprises sans claquements ni défauts de sous-alimentation du tampon ; après l'arrêt, aucun état d'alimentation actif ne reste bloqué inutilement.

**Dépannage :** si le son est déformé, vérifiez la fréquence d'échantillonnage, la profondeur de bits, le chemin de sortie, la configuration du codec, le format du fichier et la taille du tampon. Vérifiez aussi que les lectures depuis le stockage alimentent le décodeur assez rapidement.

**Ce que vous avez appris :** comment le middleware audio du SDK, la lecture avec tampon et le décodage de fichiers s'articulent.

## Stocker et récupérer des données persistantes { #store-and-retrieve-data-with-a-filesystem }

**Objectif :** conserver des données après les redémarrages plutôt que de les perdre à chaque réinitialisation.

**Durée :** 30-45 minutes

**Exemple de départ :** `example/storage/littlefs` ou `example/storage/flashdb`

LittleFS convient aux données organisées en fichiers. FlashDB est une base de données embarquée proposant les modes clé-valeur (KVDB) et séries temporelles (TSDB) ; le backend de stockage et les cartes pris en charge dépendent de la configuration de l'exemple. Avant de choisir une cible, consultez la documentation officielle des exemples [LittleFS NOR](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html) et [FlashDB](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html).

Les appels POSIX ci-dessous illustrent l'accès à un système de fichiers monté ; ils ne font pas partie de l'API FlashDB.

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. Choisissez un système de fichiers comme LittleFS pour les journaux organisés en fichiers. Pour des paramètres structurés ou des données horodatées, évaluez les modes KVDB ou TSDB de FlashDB et choisissez un backend adapté à votre carte et à votre mémoire.
2. Confirmez la partition et le chemin de montage utilisés par l'exemple.
3. Écrivez une petite entrée de journal ou un paramètre.
4. Coupez l'alimentation de la carte et confirmez que les données sont toujours présentes.
5. Enregistrez périodiquement les lectures de capteur du Tutoriel 1.
6. Définissez une règle de rétention simple, par exemple la suppression des anciens journaux, pour éviter leur croissance sans limite.

**Critères de réussite :** les données sont conservées après un redémarrage et le firmware gère correctement un stockage absent, plein ou fraîchement formaté.

**Dépannage :** vérifiez la disposition des partitions, le chemin de montage, les erreurs d'effacement ou d'écriture de la mémoire flash et la fermeture des fichiers. Assurez-vous également que la fréquence d'écriture reste compatible avec la durée de vie visée pour le stockage.

**Ce que vous avez appris :** quand utiliser un système de fichiers ou une base de données embarquée, et comment préserver l'état du produit après une réinitialisation.

## Combiner deux sous-systèmes délibérément { #combine-two-subsystems-on-purpose }

**Objectif :** exécuter deux sous-systèmes à la fois et apprendre comment ils s'affectent mutuellement.

**Durée :** 1 heure

**Exemple de départ :** choisissez deux des tutoriels 1 à 5 les plus pertinents pour votre produit.

1. Choisissez deux sous-systèmes dont votre produit aura réellement besoin ensemble, tels que BLE plus un capteur I2C, ou LVGL plus lecture audio.
2. Vérifiez d'abord chacun séparément.
3. Combinez-les en apportant le moins de modifications possible.
4. Soumettez-les à une charge simultanée : envoyez une notification BLE pendant une lecture I2C, animez l'interface pendant la lecture audio ou écrivez dans le stockage pendant la mise à jour d'un capteur.
5. Surveillez l'utilisation du CPU, les journaux, la mémoire et le comportement observable.
6. Comparez ce que vous observez avec la [Vue d'ensemble du Bluetooth](../../learn/bluetooth/overview.md#coexistence-with-other-workloads), la [Vue d'ensemble des graphismes](../../learn/graphics/overview.md#graphics-validation-matrix), et la [Vue d'ensemble de la basse consommation](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product).

**Critères de réussite :** les deux sous-systèmes continuent de fonctionner en même temps, et le courant au repos revient au niveau attendu une fois le test arrêté.

**Dépannage :** recherchez les appels bloquants de longue durée, les journaux trop fréquents, les rafales de temporisateurs, les écritures dans des chemins sensibles à la latence et les erreurs de cache sur les tampons partagés.

**Ce que vous avez appris :** deux sous-systèmes qui fonctionnent séparément peuvent néanmoins se perturber lorsqu'ils partagent le temps processeur, la bande passante mémoire, les interruptions et la gestion de l'alimentation.

## Liste de contrôle pour intégrer les sous-systèmes { #intermediate-integration-checklist }

- [ ] Chaque tutoriel part d'un exemple du SDK dont le fonctionnement a été vérifié.
- [ ] Chaque chemin matériel est d'abord vérifié : lecture d'un registre ou d'une valeur connue du capteur, affichage d'une couleur unie, annonce BLE, sortie audio ou montage du stockage.
- [ ] La fonctionnalité survit à la réinitialisation et à la déconnexion/reconnexion le cas échéant.
- [ ] Les chemins d'erreur sont testés : capteur manquant, fichier manquant, téléphone déconnecté, stockage plein.
- [ ] Au moins un test de charge combinée a été exécuté.
- [ ] Le comportement au repos a été vérifié après l'arrêt de chaque fonctionnalité.

## Où aller ensuite { #where-to-go-next }

[Validation produit](advanced.md) traite de l'optimisation de la consommation, des mises à jour OTA, de la mise en service d'écrans et de pilotes personnalisés, du Bluetooth multi-connexion et du débogage en production. Ce parcours transforme des démonstrations fonctionnelles en firmware prêt pour un produit.
