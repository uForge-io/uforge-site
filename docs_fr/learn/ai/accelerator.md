---
icon: lucide/microchip
description: "Opérateurs NNACC du SF32, rôles du CPU et de l'environnement d'inférence, contraintes mémoire et évaluation de latence et d'énergie."
tags:
  - IA
---
# Accélérateur IA { #ai-accelerator }

## Introduction { #introduction }

L'**accélérateur d'IA**, appelé NNACC dans le SDK, prend en charge certaines opérations de réseaux neuronaux sur des dispositifs SF32 sélectionnés. Il permet l'**IA en périphérie**, où l'inférence s'exécute localement sans dépendre d'un service cloud. Les gains de latence, d'occupation CPU ou d'énergie dépendent du modèle, du placement mémoire, du logiciel et de la charge du produit complet.

Les appareils portables, les dispositifs de suivi de santé, les écrans intelligents, les accessoires vocaux, la fusion de capteurs et les produits AIoT compacts sont des applications possibles. Ces appareils sur batterie associent souvent Bluetooth, graphisme, audio, acquisition et interaction utilisateur. Déléguer certaines opérations au matériel peut libérer du temps CPU pour d'autres tâches, mais la réactivité et les économies d'énergie doivent être mesurées.

Les fonctionnalités d'IA disponibles dépendent du dispositif SF32 et de sa prise en charge par le SDK. Avant de valider une architecture de modèle ou un plan mémoire, vérifiez toujours la fiche technique, le manuel de référence et la documentation du SDK de la puce cible.

Les informations ci-dessous sur les opérations CMSIS-NN et le nombre de ressources NNACC par dispositif s'appuient sur la documentation de SiFli-SDK v2.5.1. Le guide NNACC de cette version cite des ressources pour SF32LB55x/56x/58x, mais ne confirme pas leur disponibilité sur SF32LB52x ou SF32LB57x ; cette absence d'information ne prouve pas l'absence de l'accélérateur. Les contrôles de fenêtres d'adresses, le comportement d'attente et la configuration du GC032A sont des observations tirées des sources HAL ou du pilote de cette version, et non des garanties universelles pour toutes les révisions de puce ou versions du SDK. Le guide NNACC et les exemples cités n'établissent ni l'existence d'un convertisseur de modèle ou d'un moteur de graphe complet, ni un repli automatique sur CPU, ni la compatibilité de capture caméra de chaque composant et carte. Avant de figer la conception, vérifiez la révision et la configuration exactes du SDK, la révision de la puce, l'environnement d'exécution et la carte.

Consultez cette page pour déterminer si une fonction d'IA locale convient au dispositif SF32 choisi et pour répartir la chaîne d'inférence entre capteurs, CPU, mémoire et accélérateur. Pour intégrer et déployer les modèles, commencez par la page complémentaire [Vue d'ensemble de l'IA](overview.md).

## Pourquoi l'IA embarquée est utile { #why-on-device-ai-matters }

De nombreux produits embarqués doivent pouvoir réagir de manière intelligente sans transmettre en continu des données brutes à un téléphone ou à un service cloud. L'IA embarquée peut apporter plusieurs avantages :

- Latence potentiellement réduite : l'inférence locale peut éviter un aller-retour vers un téléphone ou le cloud, mais mesurez la latence complète, de l'acquisition du capteur à la décision, sur le produit final.
- Meilleure confidentialité, car les données biométriques, audio ou de mouvement brutes peuvent rester locales.
- Trafic sans fil réduit, car seuls les événements ou résumés doivent être transmis.
- Meilleur comportement hors ligne, car les fonctionnalités essentielles peuvent fonctionner sans accès réseau.
- Une puissance moyenne plus faible n'est possible que si la fonction complète consomme moins d'énergie sur la même durée d'utilisation, à précision et couverture de détection équivalentes. Tenez compte du surcoût lié au déport des calculs.

Pour les appareils portables et les dispositifs AIoT, ces avantages sont concrets. Une montre peut classer des gestes, détecter des niveaux d'activité, surveiller des signaux de santé, reconnaître de simples déclencheurs vocaux ou traiter des données de capteurs, tout en préservant la réactivité de l'écran, de Bluetooth et du processeur applicatif.

Ces avantages sont conditionnels. Le traitement local réduit le trafic sans fil seulement si le produit évite d'envoyer les données brutes. La confidentialité exige toujours un stockage adapté, des contrôles d'accès et la protection des données transmises. Les usages ci-dessous sont des possibilités de conception, pas une garantie que le SDK fournit tous les modèles.

## Position dans le système SF32 { #position-in-the-sf32-system }

Une chaîne simplifiée de traitement de l'IA en périphérie sur SF32 se présente ainsi :

<div align="center"><em>Schéma : Étapes de traitement et inférence pilotée par le firmware</em></div>

```text
Capteurs / Audio / Caméra
        │
        ▼
Prétraitement
  - filtrage
  - découpage en trames
  - normalisation
  - extraction des caractéristiques
        │
        ▼
Firmware / runtime d'inférence
  - orchestration du graphe du modèle
  - opérations prises en charge par NNACC
  - autres opérations sur le CPU, si elles sont implémentées
        │
        ▼
Post-traitement
  - seuillage
  - lissage
  - détection d'événements
  - décisions applicatives
        │
        ▼
Application, UI, Bluetooth ou stockage
```

L'accélérateur n'est qu'un élément de la chaîne complète de traitement de l'IA. Un produit doit aussi assurer l'acquisition et la mise en tampon des données, le prétraitement, la planification de l'inférence, le post-traitement et la prise de décision applicative. Les meilleurs résultats s'obtiennent généralement en concevant toute la chaîne autour de la hiérarchie mémoire et des accélérateurs disponibles, plutôt qu'en considérant l'inférence comme un simple appel de fonction isolé.

## Ce que fait l'accélérateur IA { #what-the-ai-accelerator-does }

Les accélérateurs d'IA sont utiles, car les réseaux neuronaux répètent souvent les mêmes opérations mathématiques des milliers, voire des millions de fois : convolutions, multiplications matricielles, opérations vectorielles, fonctions d'activation, agrégation (pooling) et autres calculs en virgule fixe. Un matériel dédié peut exécuter certaines de ces opérations avec une meilleure efficacité énergétique qu'un CPU généraliste.

Il s'agit d'exemples de calculs utilisés par les réseaux neuronaux, pas d'une liste des opérations prises en charge par le NNACC du SF32. Le [guide NNACC du SDK SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) documente l'accélération NNACC de trois fonctions de convolution q7 de CMSIS-NN, dont la convolution par canal (depthwise convolution), et indique que l'implémentation CMSIS-NN avec NNACC est 8 fois plus rapide que l'implémentation ARM DSP de CMSIS-NN. Le guide ne précise pas les conditions de mesure de cette valeur : considérez-la comme une comparaison publiée par le fabricant, et non comme une garantie de réduction de la latence ou de la consommation énergétique sur l'ensemble du modèle. Vérifiez chaque opérateur du modèle et son format numérique par rapport à l'implémentation retenue ; ne supposez pas que la multiplication matricielle, l'activation ou le pooling bénéficient chacun d'une accélération indépendante. Le SDK propose aussi des API HAL pour piloter directement l'accélérateur, mais ne supposez pas que l'une ou l'autre interface fournisse un convertisseur de modèle complet ou un moteur de graphe. Le firmware ou un moteur d'inférence distinct doit orchestrer les couches et gérer les tampons ; un repli sur le CPU nécessite également une implémentation des opérateurs non pris en charge.

Les ressources mémoire et la bande passante des dispositifs SF32 sont limitées : commencez donc par un modèle embarqué compact. Vérifiez la présence du NNACC et la prise en charge des opérateurs pour la référence exacte, puis mesurez la mémoire, la latence et l'énergie de toute la chaîne. Ne déduisez pas la compatibilité du seul nom de la famille.

Les applications d'IA courantes comprennent :

- La détection de mots-clés ou la détection simple d'événements vocaux.
- La reconnaissance de gestes à partir des données d'accéléromètre et de gyroscope.
- La classification d'activité et la détection d'état de mouvement.
- La fusion de données de capteurs pour les appareils portables et les dispositifs de santé.
- L'analyse de signaux biométriques, selon les capteurs disponibles et les algorithmes pris en charge.
- La classification simple d'images ou à partir de la caméra, sur les dispositifs disposant d'une entrée caméra.
- La détection d'anomalies et le filtrage local d'événements.

## Rôles du CPU, de l'accélérateur et de la mémoire { #cpu-accelerator-and-memory-roles }

Pour se représenter le rôle de chacun, le CPU pilote le traitement tandis que l'accélérateur prend en charge certaines opérations de calcul intensives.

<div align="center"><em>Tableau : Rôles du CPU, de l'accélérateur et de la mémoire</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Composant | Rôle typique |
|:----------|:-------------|
| **CPU applicatif** | Exécute la logique applicative, planifie l'inférence, gère les tampons et pilote l'interface utilisateur, le Bluetooth, le stockage et les règles système. |
| **Processeur basse consommation** | Peut assurer une détection en continu ou des tâches d'arrière-plan sur les appareils où il est programmable par l'utilisateur. |
| **Accélérateur IA** | Exécute les opérations prises en charge par NNACC ; comparez le temps CPU et l'énergie de toute la chaîne à la référence logicielle. |
| **DMA / système mémoire** | Assure les accès mémoire et les transferts configurés ; un transfert d'entrée ou de sortie NNACC ne nécessite pas systématiquement une copie DMA distincte. |
| **Autres accélérateurs** | Les blocs audio, graphiques, cryptographiques ou de traitement des capteurs peuvent contribuer à l'ensemble de la chaîne produit. |

</div>

L'accélérateur ne remplace pas le CPU et n'exécute pas seul n'importe quel modèle. Le firmware prépare les entrées, configure les opérations prises en charge, attend leur fin, traite les résultats et pilote l'application. Une opération non prise en charge ne peut s'exécuter sur le CPU que si l'environnement d'inférence ou l'application fournit cette implémentation ; sinon, le déploiement peut échouer. La présence du matériel ne garantit pas un repli automatique sur le CPU.

## Positionnement par famille de dispositifs { #device-family-positioning }

Choisissez le dispositif selon les opérateurs, le budget mémoire et la charge du produit complet, plutôt que selon un classement global des familles. Le guide du SDK v2.5.1 documente un NNACC dans le sous-système HCPU de chaque famille SF32LB55x et SF32LB56x, et un dans chacun des sous-systèmes HCPU et LCPU du SF32LB58x. Ces ressources aident à choisir, mais ne garantissent ni une exécution plus rapide du modèle complet ni une baisse de l'énergie consommée. Vérifiez la disponibilité, la mémoire accessible et le support logiciel pour la référence et la configuration exactes.

<div align="center"><em>Tableau : Positionnement par famille de dispositifs</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Famille de dispositifs | Positionnement IA |
|:--------------|:---------------|
| **SF32LB52x** | À envisager pour Bluetooth, audio et HMI simple à coût optimisé ; utiliser une implémentation CPU légère comme référence, sauf accélération spécifique vérifiée. |
| **SF32LB55x** | Adapté aux appareils BLE portables et aux produits riches en capteurs ; utile pour la détection à basse consommation et les algorithmes compacts. |
| **SF32LB56x** | À envisager pour une UI plus riche, une HMI connectée et des chaînes de capteurs ou multimédia ; vérifier la configuration choisie et les opérateurs du NNACC HCPU. |
| **SF32LB57x** | Le guide cité ne confirme pas la disponibilité de NNACC pour cette famille ; vérifiez la référence, la carte et le support SDK des opérateurs, du runtime et de la mémoire avant de la choisir pour l'IA. |
| **SF32LB58x** | À envisager pour des traitements combinant IA, graphisme et audio lorsque la mémoire et les ressources HCPU/LCPU de la référence choisie répondent aux besoins du produit ; vérifier les opérateurs, les coûts d'intégration et l'énergie mesurée. |

</div>

Ce tableau aide à choisir un produit, mais ne remplace pas la fiche technique. Pour la référence retenue, vérifiez la disponibilité de l'accélérateur, les opérateurs pris en charge, les limites mémoire et les outils du SDK.

## Développement du modèle { #model-development-flow }

Un processus classique de développement d'IA embarquée comporte plusieurs étapes :

1. Entraîner ou choisir un modèle sur un poste de travail à l'aide de données représentatives.
2. Adapter le modèle aux contraintes embarquées en le sélectionnant avec soin, en élaguant ses paramètres, en le quantifiant ou en modifiant son architecture.
3. Choisir ou implémenter l'environnement d'inférence et la représentation du modèle, puis vérifier la couverture des opérateurs et la compatibilité numérique avec les noyaux SDK retenus. Ne pas supposer que le HAL NNACC inclut un convertisseur de modèles complets.
4. Valider la précision numérique après conversion et quantification.
5. Intégrer le prétraitement, l'inférence et le post-traitement dans le firmware.
6. Mesurer et profiler la latence, l'utilisation mémoire, la consommation et la précision sur le matériel cible.
7. Tester des charges réalistes avec Bluetooth, affichage, audio et capteurs en parallèle, y compris les transitions vers les états basse consommation prévus et leur sortie.

L'erreur la plus courante consiste à optimiser uniquement le réseau neuronal et à négliger le reste de la chaîne. Dans de nombreux produits embarqués, le prétraitement, les transferts mémoire, la synchronisation des capteurs et le post-traitement comptent autant que l'accélérateur lui-même.

## Quantification et taille du modèle { #quantization-and-model-size }

L'IA embarquée sur microcontrôleur repose généralement sur des modèles compacts et des formats numériques efficaces. Les modèles quantifiés, souvent représentés par des entiers sur 8 bits, peuvent réduire l'empreinte mémoire, la bande passante requise et le coût de calcul par rapport aux modèles à virgule flottante.

Un modèle sur 8 bits n'est pas automatiquement compatible avec NNACC. La [configuration HAL du SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) utilise des tampons `int8_t` et les champs `bias_shift` / `out_shift`. Cela ne démontre pas la prise en charge de points zéro arbitraires, d'échelles par canal ou de tous les opérateurs int8 actuels. Vérifiez la disposition des tenseurs, le traitement du signe, les décalages et la représentation du biais par rapport au noyau retenu ; comparez ensuite ses sorties à une référence logicielle avec des entrées représentatives et des valeurs limites.

La quantification comporte des compromis :

- Elle peut grandement améliorer l'efficacité.
- Elle peut réduire la taille du modèle et la mémoire des tenseurs.
- Elle peut réduire la précision si le modèle n'est pas entraîné ou calibré avec soin.
- Certains opérateurs peuvent ne pas correspondre directement aux fonctions de l'accélérateur ou de l'environnement d'exécution.

En vue de la production, mesurez à la fois la précision et les performances du système après conversion. Un modèle efficace dans un environnement d'entraînement sur poste de développement peut se comporter différemment après quantification, en présence de bruit des capteurs et avec le prétraitement embarqué.

## Considérations sur la mémoire et la bande passante { #memory-and-bandwidth-considerations }

Les traitements d'IA peuvent solliciter fortement la mémoire, même lorsque le modèle semble petit. Le système peut avoir besoin d'espace pour :

- Les poids du modèle.
- Les tenseurs d'entrée.
- Les tampons d'activation intermédiaires.
- Les tenseurs de sortie.
- Les trames audio, les fenêtres de données des capteurs ou les images de caméra.
- Les tampons de prétraitement et de post-traitement.
- Les données de l'interface utilisateur, de Bluetooth et de l'application utilisées en même temps.

Selon la configuration SRAM interne, Flash, PSRAM et cache du dispositif choisi, placez les tenseurs fréquemment utilisés et les tampons intermédiaires là où CPU et accélérateur peuvent y accéder efficacement. Budgétez ensemble stockage externe, tampons de travail et copies, au lieu d'optimiser seulement la taille du modèle.

Vérifiez d'abord que le NNACC choisi peut accéder à chaque tampon ; les données en Flash ou PSRAM externes peuvent nécessiter une copie dans des tampons de travail. Comptez le temps de copie, la RAM de travail et l'énergie dans le budget. L'[implémentation HAL du SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) arrondit les tailles contrôlées à des multiples de 4 octets et refuse un tampon si son début et sa fin contrôlée appartiennent à des fenêtres d'adressage différentes de 1 MiB (1 048 576 octets). L'entrée et le biais doivent aussi partager une fenêtre. Une fin exactement à la limite de la fenêtre suivante échoue également. Planifiez les allocations selon ces contrôles et traitez les erreurs renvoyées avant de lancer l'opération suivante.

Si le CPU partage des tampons avec le DMA ou NNACC, attribuez un accès exclusif pendant chaque transfert ou opération. Écrivez en mémoire les entrées modifiées dans le cache du CPU avant leur lecture par le matériel. Préparez les lignes de cache du tampon de destination selon le SDK avant l'écriture matérielle, pour éviter qu'une ligne modifiée du CPU ne remplace ensuite le résultat. Après confirmation de la fin du traitement matériel, invalidez les copies obsolètes du CPU avant de lire la sortie. Les opérations de maintenance doivent couvrir des lignes entières ; évitez de les partager avec d'autres données encore utilisées. Réécrire en mémoire une ancienne ligne de cache de la sortie après l'écriture du matériel peut détruire le résultat. L'écriture en mémoire (clean) et l'invalidation (invalidate) ne sont pas interchangeables.

## Chaînes de traitement audio, capteurs et caméra { #audio-sensor-and-camera-pipelines }

L'accélération IA fonctionne rarement de façon isolée. Elle s'intègre généralement à une chaîne de traitement des capteurs, de l'audio ou de l'image.

### Audio et voix { #audio-and-voice }

La détection de voix ou d'événements audio peut comprendre l'entrée microphone, les tampons DMA, le découpage en trames, le filtrage, l'extraction de caractéristiques, l'inférence et le lissage des résultats. NNACC exécute les opérations neuronales prises en charge ; le firmware ou l'environnement choisi gère le reste du graphe, tandis que le CPU ou le sous-système audio gère les échantillons et caractéristiques. Le modèle et une implémentation logicielle validée restent nécessaires.

Les exemples typiques incluent :

- La détection de mots-clés.
- La détection d'un mot de réveil, si le logiciel la prend en charge.
- La classification de scènes ou d'événements audio.
- La détection d'activité vocale.

### Mouvement et fusion de capteurs { #motion-and-sensor-fusion }

Dans les appareils portables, les données proviennent souvent d'accéléromètres, de gyroscopes, de capteurs de fréquence cardiaque, de capteurs SpO2, de circuits de mesure ECG ou d'autres périphériques. L'IA peut classifier des états de mouvement, des gestes, des profils d'activité ou des caractéristiques de signaux liés à la santé.

Regroupez les échantillons et utilisez les interruptions si la couverture de détection et la latence exigées le permettent. Confier des tâches de fond adaptées à un processeur basse consommation programmable par l'utilisateur peut réduire les réveils du CPU applicatif. Incluez toutefois son activité, l'échantillonnage et les coûts de réveil dans la comparaison. N'arrêtez pas l'acquisition nécessaire à la détection de l'événement.

### Caméra et entrée image { #camera-and-image-input }

L'entrée caméra dépend de la puce, du boîtier, de la carte et du pilote de capture exacts. Le [pilote du capteur GC032A du SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/customer/peripherals/camera/gc032a/drv_gc032a.c) configure une sortie DVP sur 8 bits ou SPI sur deux bits ; cela ne prouve pas que les deux voies de capture fonctionnent sur tous les dispositifs SF32. Avant de choisir la caméra, vérifiez les broches, la capture par périphérique ou PTM, la temporisation du capteur et le pilote. L'image demande souvent des tampons et une bande passante plus importants que l'audio ou le mouvement, mais comparez les résolutions et cadences réelles.

Envisagez des images plus petites, des régions d'intérêt, une cadence réduite ou un modèle adapté à l'embarqué. Recadrer par firmware après capture réduit l'entrée du modèle, pas nécessairement le trafic caméra ni le tampon de capture. Pour réduire ces coûts, un recadrage dans le capteur ou une acquisition réduite peut être nécessaire.

## Ordonnancement et gestion de l'énergie { #scheduling-and-power-management }

Les tâches d'IA doivent être planifiées en tenant compte du reste du système. Un appareil portable peut devoir maintenir la connexion Bluetooth, actualiser l'écran, acquérir l'audio, lire les capteurs et exécuter l'inférence sans dépasser les limites de consommation ou de latence.

Bonnes pratiques de planification :

- Choisir une inférence périodique ou déclenchée par événement selon la couverture de détection, le risque de manquer des événements et les exigences de latence.
- Éviter les boucles d'interrogation périodique (polling) lorsque des interruptions ou des événements peuvent déclencher le traitement.
- Regrouper les échantillons de capteurs lorsque les exigences de latence le permettent.
- Borner la latence de l'entrée à la décision tout en conservant la fenêtre nécessaire à une détection fiable.
- Coordonner les traitements d'IA avec l'activité de l'affichage et de Bluetooth.
- Remettre le CPU et l'accélérateur dans les états basse consommation autorisés après confirmation de la fin, transfert des tampons et libération des verrous de gestion de l'énergie ; maintenir l'acquisition nécessaire et les autres travaux en attente.

Mesurez l'énergie de la fonction complète en intégrant dans le temps la puissance d'alimentation mesurée (tension d'alimentation × courant) ; la latence d'inférence seule ne suffit pas. Incluez l'acquisition, le prétraitement, les copies, les calculs accélérés, le repli sur le CPU, le post-traitement et les périodes inactives. Une exécution plus rapide peut réduire l'énergie en activité sans permettre une veille plus précoce ; les gains dépendent des autres charges du système. Comparez une couverture de détection et une précision équivalentes avant de réduire la fréquence d'inférence.

Dans le SDK v2.5.1, le démarrage bloquant du HAL attend la fin par scrutation sans délai maximal explicite propre. Le mode interruption exige un gestionnaire IRQ fonctionnel et une notification de fin. Vérifiez les erreurs de démarrage, bornez l'attente de l'application et définissez la récupération avant de réutiliser les tampons ou de libérer les verrous de gestion de l'énergie.

## Compromis entre précision, latence et consommation { #accuracy-latency-and-power-tradeoffs }

La conception d'IA embarquée consiste à arbitrer entre trois objectifs : la précision, la latence et la consommation.

<div align="center"><em>Tableau : Compromis entre précision, latence et consommation</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Objectif | Conséquences habituelles sur la conception |
|:-----|:------------------------|
| Précision accrue | Peut demander un modèle plus grand, davantage de caractéristiques ou une fenêtre d'entrée plus longue ; vérifier le gain réel de précision et le coût mémoire. |
| Latence réduite | Réduire les délais d'acquisition, d'attente et de calcul. Une fenêtre plus courte peut dégrader la précision ; une cadence d'inférence accrue peut augmenter l'énergie. |
| Consommation réduite | Utiliser des modèles compacts et un placement efficace ; réduire la fréquence seulement si la couverture de détection le permet, puis vérifier acquisition et stratégie de veille. |

</div>

Le bon équilibre dépend du produit. Un détecteur de gestes peut tolérer un léger délai s'il économise de l'énergie. Un déclencheur vocal peut nécessiter une réponse rapide mais doit éviter les faux réveils. Un algorithme de surveillance de santé peut privilégier la robustesse et l'autonomie de la batterie à long terme plutôt qu'une classification instantanée.

## Recommandations pratiques de conception { #practical-design-guidance }

Pour concevoir un produit SF32 intégrant de l'IA, partez du comportement attendu du produit, et non du modèle :

- Quelle décision l'appareil doit-il prendre localement ?
- Quels capteurs fournissent les données d'entrée ?
- À quelle fréquence l'inférence doit-elle s'exécuter ?
- Quelle latence est acceptable ?
- Quel budget mémoire maximal peut-on consacrer aux poids et aux tenseurs du modèle ?
- Le modèle peut-il être quantifié sans perdre trop de précision ?
- Quelles opérations sont accélérées par la puce et le SDK retenus ?
- Que se passe-t-il lorsque Bluetooth, écran, audio et inférence sont actifs simultanément ?
- Comment la précision du modèle sera-t-elle validée avec des données réelles du produit ?
- Comment le firmware pourra-t-il mettre à jour ou remplacer le modèle sur le terrain, si nécessaire ?

Un produit d'IA embarquée réussi combine généralement un modèle compact, une collecte de données soignée, un placement mémoire adapté au matériel, des mesures de performance sous des charges représentatives et une stratégie énergétique qui évite les réveils inutiles.

## Cas d'usage typiques { #typical-use-cases }

Envisagez l'accélération IA du SF32 pour l'inférence locale compacte dans des produits connectés sur batterie lorsque les opérateurs pris en charge et le budget système mesuré conviennent :

- La reconnaissance de gestes sur montres, bracelets et dispositifs portatifs.
- La classification d'activité pour les produits de suivi sportif et de santé.
- La détection d'événements vocaux ou de mots-clés pour les accessoires audio.
- Les algorithmes de fusion de capteurs pour les appareils portables.
- L'analyse de signaux biométriques, si les capteurs et le logiciel la prennent en charge.
- La détection locale d'anomalies pour les dispositifs intelligents.
- La classification simple d'images ou les événements déclenchés par la caméra, sur les dispositifs dotés d'une entrée caméra.
- Une interface homme-machine (HMI) qui s'adapte au contexte d'utilisation.

## Points clés à retenir { #key-takeaways }

- NNACC peut prendre en charge des opérations compatibles et réduire l'occupation CPU ; les gains de latence et d'énergie doivent être vérifiés pour la fonction complète.
- Il s'intègre à une chaîne complète comprenant les capteurs, l'entrée audio ou caméra, le prétraitement, les transferts mémoire, le post-traitement et la logique applicative.
- Le SDK v2.5.1 documente des ressources NNACC pour SF32LB55x, SF32LB56x et SF32LB58x, mais ne confirme pas leur disponibilité sur SF32LB52x ou SF32LB57x ; vérifiez la référence et la charge réelles sans déduire la présence ou l'absence de l'accélérateur du seul nom de famille.
- Les performances réelles dépendent de la taille du modèle, de la quantification, des opérateurs pris en charge, du placement mémoire, de la gestion du cache, du comportement du DMA et de l'environnement d'exécution fourni par le SDK.
- L'inférence locale est utile si elle répond aux objectifs de réactivité, de fonctionnement hors ligne, de confidentialité ou de trafic sans fil du produit ; le seul matériel accélérateur ne garantit pas ces avantages.
