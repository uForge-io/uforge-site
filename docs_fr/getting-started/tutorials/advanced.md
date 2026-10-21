---
icon: lucide/rocket
description: "Tutoriels SF32 de validation produit : consommation mesurée, OTA BLE avec reprise, afficheurs personnalisés, analyse de plantages, Bluetooth multi-connexion et pilotes."
tags:
    - Tutoriels
---

# Validation produit { #advanced-tutorials }

Ces tutoriels supposent que vous maîtrisez l'[intégration de sous-systèmes](intermediate.md) : vous savez initialiser un périphérique, le relier au middleware et avez déjà rencontré un problème de coexistence. Cette série porte sur les étapes qui transforment une démonstration fonctionnelle en un produit prêt à être livré : mesure de la consommation, OTA récupérable, intégration reproductible de matériel personnalisé, analyse de plantages, Bluetooth multi-connexion et pilotes réutilisables.

La validation produit consiste moins à copier un exemple qu'à constituer des éléments vérifiables. Pour chaque tutoriel, consignez la révision de la carte, la version du SDK, l'exemple de départ, la configuration du test, le résultat attendu et le résultat observé, ainsi que les changements effectués.

Utilisez cette série lorsque votre responsabilité dépasse le fait de faire fonctionner une fonctionnalité une seule fois : vous devez mesurer sa consommation, récupérer après un échec de mise à jour, reproduire la mise en service de matériel personnalisé et recueillir des éléments sur les défaillances qui surviennent hors du fonctionnement normal.

Les chemins des exemples et les cartes prises en charge peuvent varier selon la version du SDK. Avant la compilation, vérifiez pour chaque exemple la liste « Supported Platforms » actuelle ainsi que ses exigences matérielles et de configuration propres à la carte. La prise en charge d'un exemple ne garantit pas celle des autres exemples ni de toutes les combinaisons de fonctionnalités.

## Régler les modes basse consommation et les sources de réveil { #tune-low-power-modes-and-wake-sources }

**Objectif :** mesurer concrètement l'autonomie, plutôt que de supposer que le firmware consomme peu simplement parce qu'il appelle une fonction de veille.

**Durée :** 2 heures ou plus, plus la mise en place de la mesure

**Exemples de départ :** `example/pm/classical`, `example/pm/raise_wrist`

1. Mettez en place la mesure de courant comme décrit dans la [Vue d'ensemble de la conception basse consommation](../../learn/low-power/overview.md#measuring-power-in-practice).
2. Relevez des valeurs de référence au démarrage, en fonctionnement actif, au repos avec une connexion, au repos écran éteint et, si disponible, en Deep Sleep.
3. Commencez par l'exemple PM classique et repérez où `rt_pm_request(PM_SLEEP_MODE_IDLE)` empêche l'entrée dans des modes basse consommation plus profonds que IDLE, puis où l'appel correspondant à `rt_pm_release(PM_SLEEP_MODE_IDLE)` lève cette restriction. Vérifiez aussi si le framework de pilotes bloque automatiquement la veille lorsqu'un périphérique est actif.
4. Étudiez ensuite l'exemple raise-to-wake : comment échantillonne-t-il l'accéléromètre, reconnaît-il les gestes du poignet, allume-t-il l'écran puis revient-il en veille ? Vérifiez la séquence réelle d'échantillonnage et de réveil de l'exemple ; ne supposez pas qu'il utilise une interruption.
5. Appliquez le même principe d'économie d'énergie à votre produit. Lorsque le matériel et les pilotes le permettent, utilisez des interruptions ou un traitement événementiel pour éviter les minuteurs et interrogations inutiles.
6. Remesurez après chaque changement.
7. Si Deep Sleep n'est pas aussi profond que prévu, utilisez `list_thread`, `list_device`, les journaux PM et les données de diagnostic des sources de réveil pour identifier le sous-système encore actif.

**Critères de réussite :** le firmware atteint l'état de basse consommation attendu, le courant est reproductible d'une exécution à l'autre et les sources de réveil sont intentionnelles plutôt qu'accidentelles.

**Dépannage :** si la consommation est bonne une fois puis se dégrade ensuite, vérifiez les chemins d'erreur et de reconnexion, la séquence d'extinction de l'affichage, la fermeture des sessions audio et tout minuteur créé après le démarrage.

**Ce que vous avez appris :** comment passer de « le système devrait consommer peu » à une consommation mesurée, et comment repérer une demande de gestion de l'alimentation laissée active sans être libérée.

## Ajouter des mises à jour de firmware OTA via BLE { #add-ota-firmware-updates-over-ble }

**Objectif :** mettre à jour le firmware sur le terrain sans connexion filaire.

**Durée :** 2 heures

**Exemple de départ :** `example/ble/peripheral_with_ota`

1. Compilez et flashez l'exemple de périphérique compatible OTA.
2. Confirmez que le comportement normal du périphérique BLE fonctionne toujours avant de tenter une mise à jour.
3. Déclenchez une mise à jour OTA et confirmez que l'appareil démarre sur la nouvelle image.
4. Sur un appareil de test disposant d'une procédure de récupération documentée, provoquez un seul type d'interruption à la fois, par exemple en coupant la connexion pendant le transfert ou en sortant de portée. Ne coupez pas l'alimentation sauf si la documentation de la carte et la conception de récupération du produit confirment explicitement que le test est sûr.
5. Vérifiez le comportement réellement prévu par le produit après une mise à jour interrompue ou rejetée : nouvelle tentative, reprise, mode de récupération ou retour à la version précédente, par exemple. N'exigez ce retour que si l'architecture de démarrage et de partitionnement l'implémente.
6. Testez l'OTA avec des données d'association BLE obsolètes, après avoir supprimé l'appareil de la liste des appareils mémorisés sur le téléphone et après avoir redémarré l'appareil.
7. Si votre produit utilise déjà PAN pour les données, évaluez le chemin OTA via PAN comme un choix de conception distinct.

**Critères de réussite :** après une OTA réussie, l'appareil démarre sur la nouvelle image. Une mise à jour interrompue ou rejetée suit la politique de récupération documentée du produit, et l'utilisateur peut identifier l'état de l'appareil. Ne supposez pas que toutes les solutions OTA prennent en charge le retour à la version précédente.

**Dépannage :** vérifiez la disposition des partitions, la signature de l'image ou ses contrôles d'intégrité le cas échéant, la sélection de l'image au démarrage et le comportement de récupération, la prise en charge du retour à la version précédente si cette fonction est implémentée, les paramètres de connexion pendant le transfert et la nécessité de conserver les données d'association ou de stockage après la mise à jour.

**Ce que vous avez appris :** comment la disposition des partitions, la validation de l'image, la sélection au démarrage et la politique de récupération déterminent le comportement OTA, et pourquoi une mise à jour réussie ne prouve pas à elle seule que l'appareil peut récupérer après une interruption.

## Mettre en service un module d'affichage personnalisé { #bring-up-a-custom-display-module }

**Objectif :** intégrer un nouvel écran LCD, AMOLED, EPD ou à mémoire plutôt que d'utiliser un écran de référence déjà pris en charge.

**Durée :** 3 heures ou plus

**Point de départ :** le pilote d'affichage du SDK le plus proche de votre panneau

1. Réunissez la fiche technique du panneau et relevez la séquence d'initialisation, les paramètres de temporisation, le type d'interface, les exigences de réinitialisation et la séquence d'alimentation.
2. Confirmez que la puce SF32 et son boîtier prennent en charge l'interface et le brochage requis.
3. Reprenez le pilote existant le plus proche et remplacez la séquence d'initialisation et la table de registres propres au panneau.
4. Vérifiez d'abord l'affichage de plages de couleur unie. Ne déboguez pas les widgets LVGL avant que le panneau affiche correctement des motifs simples.
5. Vérifiez l'ordre des couleurs, l'ordre des octets, l'orientation, la fenêtre d'adressage et le comportement de mise à jour partielle.
6. Réintégrez LVGL depuis l'exercice 2 d'Intégration de sous-systèmes.
7. Si la puce, le chemin d'affichage, le pilote et le SDK choisis les prennent en charge, activez un par un le DMA, le rafraîchissement partiel et l'accélération ePicasso.
8. Testez les chemins écran éteint, veille, réveil et réinitialisation.

**Critères de réussite :** le panneau s'initialise de manière fiable après un démarrage à froid et une réinitialisation, rend correctement des motifs connus, et survit à la veille/réveil sans corruption.

**Dépannage :** si les plages de couleur sont incorrectes, vérifiez le format de pixel, les bits MADCTL/orientation, l'ordre des octets, les lignes de commande et de données, la temporisation de réinitialisation et la séquence d'activation des alimentations avant de modifier le code de l'interface.

**Ce que vous avez appris :** comment distinguer les problèmes électriques ou de séquencement de ceux liés à la configuration du framework d'interface.

## Profiler l'utilisation du CPU et analyser un plantage { #profile-cpu-usage-and-analyze-a-crash }

**Objectif :** déboguer des problèmes difficiles à reproduire pendant une session de débogage avec un débogueur connecté.

**Durée :** 2 heures

**Exemples de départ :** `example/system/cpu_usage_profiler`, `example/system/coredump`

1. Exécutez l'exemple de profilage du CPU sur l'une des charges combinées de l'étape Intégration de sous-systèmes.
2. Identifiez quelle tâche consomme du temps CPU et si cela correspond à votre attente.
3. Ajoutez un défaut contrôlé dans une branche d'essai ou un exemple jetable et capturez un core dump.
4. Utilisez les outils d'analyse de dump du SDK pour localiser la fonction à l'origine du défaut et reconstruire la pile d'appels.
5. Comparez le contexte du plantage avec `list_thread`, les journaux et les événements récents.
6. Retirez le défaut délibéré et répétez le flux avec un véritable problème intermittent si vous en avez un.

**Critères de réussite :** vous pouvez expliquer à la fois un problème de performance et un plantage en utilisant des preuves capturées plutôt que des suppositions.

**Dépannage :** avant d'interpréter la pile d'appels, vérifiez que les symboles correspondent au binaire flashé, que les journaux indiquent la version du firmware et que vous connaissez le niveau d'optimisation utilisé.

**Ce que vous avez appris :** le profilage proactif pour les chemins lents et l'analyse post-mortem de dump pour les défaillances difficiles à saisir en direct.

## Construire un produit BLE multi-connexion { #build-a-multi-connection-ble-product }

**Objectif :** prendre en charge plus d'un rôle ou d'une connexion BLE simultanés.

**Durée :** 2 heures

**Exemples de départ :** `example/ble/central_and_peripheral`, `example/ble/multi_connection`

1. Reprenez le comportement de périphérique vérifié dans l'exercice 3 de l'étape Intégration de sous-systèmes.
2. Ajoutez un rôle central : l'appareil peut, par exemple, agir comme périphérique auprès d'un téléphone et comme central auprès d'un accessoire équipé de capteurs.
3. Étendez à plusieurs connexions simultanées.
4. Pour chaque liaison, consignez l'intervalle de connexion, la latence esclave, le délai de supervision et le débit des notifications.
5. Établissez d'abord une référence de débit à l'aide de l'exemple de débit du SDK avant de mettre en cause le code applicatif.
6. Testez les reconnexions, la mise en veille du téléphone, la perte de l'accessoire et les rafales simultanées de notifications.

**Critères de réussite :** tous les rôles prévus se connectent, se déconnectent, et se reconnectent de manière fiable, et les choix de paramètres de connexion restent stables sous activité combinée.

**Dépannage :** recherchez les demandes de paramètres incompatibles, un volume excessif de notifications, des fonctions de rappel applicatives bloquantes et une politique d'alimentation qui réveille le CPU principal à chaque événement de liaison.

**Ce que vous avez appris :** les configurations BLE prises en charge par le SiFli-SDK peuvent combiner les rôles périphérique et central ; certaines prennent également en charge plusieurs connexions simultanées. Vérifiez les rôles et limites de connexion pour la puce, la configuration de la pile et l'exemple concernés. Les compromis de paramètres s'accumulent lorsque plusieurs liaisons partagent l'ordonnancement radio.

## Écrire un pilote de périphérique RT-Thread personnalisé { #write-a-custom-rt-thread-device-driver }

**Objectif :** intégrer un périphérique sans pilote SDK existant comme périphérique RT-Thread à part entière, plutôt que par un bricolage ponctuel dans l'application.

**Durée :** 3 heures ou plus

**Point de départ :** le guide de développement d'applications du SDK et le pilote existant le plus proche

1. Passez en revue comment le SDK organise les définitions de carte, le multiplexage de broches, les horloges et les pilotes de périphériques.
2. Prenez comme base le pilote existant dont l'architecture est la plus proche de celle de votre périphérique.
3. Gardez séparés l'accès au bus, l'enregistrement de l'appareil, la configuration et la logique applicative.
4. Enregistrez l'appareil et confirmez qu'il apparaît sous `list_device`.
5. Testez-le comme vous l'avez fait pour l'ADC, le PWM, l'I2C et les périphériques de stockage dans les tutoriels précédents.
6. Gérez les erreurs liées à l'absence du matériel, aux arguments invalides, aux délais d'attente et à la suspension/reprise.
7. Si le pilote est réutilisable, empaquetez-le comme composant SDK plutôt que de le copier-coller entre produits.

**Critères de réussite :** le code applicatif trouve et utilise le pilote via le modèle de périphériques habituel de RT-Thread, et celui-ci se comporte de manière prévisible lors de l'initialisation, de l'utilisation, des erreurs et des transitions veille/réveil.

**Dépannage :** si le pilote ne fonctionne que depuis un fichier applicatif, il contourne probablement le modèle de périphériques. Refactorez-le jusqu'à pouvoir l'utiliser comme les pilotes intégrés.

**Ce que vous avez appris :** comment étendre proprement l'écosystème du SDK sans créer de charge de maintenance supplémentaire.

## Liste de contrôle de validation avant livraison { #advanced-release-checklist }

- [ ] Les valeurs de consommation sont mesurées, reproductibles et associées à des scénarios de test clairement nommés.
- [ ] La réussite des mises à jour OTA, les contrôles d'intégrité et la récupération après interruption ont été testés conformément à la politique documentée du produit ; le retour à la version précédente n'est considéré comme vérifié que si la conception l'implémente.
- [ ] La mise en service d'un afficheur personnalisé est validée avec des motifs avant la complexité LVGL.
- [ ] Les flux de profilage et de coredump sont documentés pour l'équipe.
- [ ] Le Bluetooth multi-connexion est testé lors des reconnexions et dans les cas limites impliquant le téléphone ou l'accessoire.
- [ ] Les pilotes personnalisés utilisent le modèle d'appareil RT-Thread et gèrent la veille/réveil.
- [ ] Les tests de charge combinée incluent l'affichage, le Bluetooth, le stockage, l'audio, les capteurs, et l'IA le cas échéant.

## Où aller ensuite { #where-to-go-next }

Vous disposez maintenant de l'ensemble des outils : périphériques, middleware, gestion de la coexistence et de la consommation, OTA, mise en service de matériel personnalisé, analyse post-mortem et intégration de pilotes. Le catalogue des [exemples](../../develop/examples/index.md) et la [Vue d'ensemble des graphismes](../../learn/graphics/overview.md) vous serviront ensuite de références. Consultez-les selon vos besoins plutôt que de les parcourir linéairement.
