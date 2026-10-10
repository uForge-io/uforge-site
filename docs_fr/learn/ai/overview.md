---
icon: lucide/brain-circuit
title: "Vue d’ensemble de l’IA"
description: "Vue d'ensemble de l'IA embarquée sur SF32 : choisir un dispositif, utiliser le HAL NNACC, dimensionner la mémoire et planifier l'inférence dans le budget énergétique."
tags:
  - IA
---

# Vue d’ensemble de l’IA { #ai-overview }

## Vue d'ensemble { #overview }

Cette page explique comment déployer une fonction d'IA embarquée sur SF32 : choisir un dispositif, préparer le modèle pour son chemin d'exécution, dimensionner la mémoire et planifier les inférences dans le budget énergétique du produit. Elle suppose acquises les notions matérielles présentées dans [Accélérateur IA](accelerator.md). Pour connaître d'abord le rôle et les limites de l'accélérateur, consultez cet article.

Le SDK expose les opérations accélérées via le HAL **NNACC** (accélérateur de réseaux neuronaux), avec des exemples distincts pour le [HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/hal/nnacc/README_EN.md) et le [pilote RT-Thread](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/rt_device/nnacc/README_EN.md). Ces exemples valident une opération individuelle de convolution depthwise, pas le déploiement complet d'un modèle entraîné. Utilisez-les pour établir une base de référence fonctionnelle au niveau d'un opérateur ; choisissez et vérifiez séparément l'environnement d'exécution, les outils de conversion et la correspondance des couches.

Les détails d'implémentation cités ci-dessous sont propres au SDK v2.5.1. Ni ces détails ni la disponibilité de NNACC au niveau de la famille ne garantissent la prise en charge d'une référence précise, d'un environnement d'exécution ou d'un convertisseur de modèles complets, la compatibilité des opérateurs, un repli CPU automatique ou une entrée caméra. Vérifiez ces points avec la révision et la configuration exactes du SDK, la révision de la puce, l'environnement choisi et la carte.

Utilisez cette page lorsque vous êtes responsable des choix produit et du déploiement d'une fonctionnalité IA : ce que l'appareil doit décider localement, combien de mémoire et d'énergie il peut consommer, et comment la fonctionnalité doit se comporter face à des données de capteurs réelles. Elle complète l'article sur l'accélérateur, qui décrit la frontière matérielle.

## Définir ce que le produit doit décider localement { #define-what-the-product-needs-to-decide-locally }

Partez de la décision produit, pas du modèle :

- Que doit classifier ou détecter l'appareil par lui-même, sans aller-retour vers un téléphone ou le cloud ?
- Quels capteurs alimentent cette décision : mouvement, audio, signaux biométriques, caméra ou une combinaison ?
- À quelle fréquence l'appareil doit-il prendre cette décision, et quel délai de réponse doit-il respecter ?
- Que se passe-t-il si le modèle embarqué se trompe — un faux positif ou un faux négatif est-il plus coûteux ?
- Le modèle devra-t-il un jour être mis à jour sur le terrain, et comment ?

Ces réponses déterminent tous les choix suivants : la taille du modèle, le budget mémoire, le dispositif à sélectionner et la durée pendant laquelle le système peut rester en veille entre deux inférences.

## Choisir le bon dispositif SF32 { #pick-the-right-sf32-device }

Tous les dispositifs SF32 ne ciblent pas les charges de travail IA de la même manière :

<div align="center"><em>Tableau : Choisir le bon dispositif SF32</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Exigence | Dispositif à privilégier |
|:------------|:-------------------------|
| Classification légère et occasionnelle sur un produit à coût optimisé | SF32LB52x — gardez les modèles petits et orientés CPU. |
| Appareil portable BLE avec des besoins de fusion de capteurs de base | SF32LB55x |
| Pipeline de capteurs ou multimédia plus riche aux côtés de l'interface utilisateur | SF32LB56x |
| IA en périphérie comme fonctionnalité principale — modèles plus grands, entrée caméra lorsque le dispositif choisi la prend en charge, ou fortes contraintes de latence | SF32LB58x |

</div>

Ce tableau constitue un point de départ, pas une garantie que le modèle tiendra en mémoire ou s'exécutera efficacement. Vérifiez la mémoire, les interfaces de capteurs, l'instance d'accélérateur et le support SDK de la référence retenue pour la charge complète. Le [guide NNACC du SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) indique un accélérateur HCPU pour chacune des familles SF32LB55x et SF32LB56x, et un dans chacun des sous-systèmes HCPU et LCPU de SF32LB58x. Il ne confirme pas la disponibilité de NNACC sur SF32LB52x ou SF32LB57x ; cette absence d'information ne prouve pas l'absence de l'accélérateur. Ces nombres ne démontrent ni la compatibilité d'un modèle ni son efficacité énergétique. Voir [Positionnement par famille de dispositifs](accelerator.md#device-family-positioning) pour le contexte de sélection.

## Le flux de développement du modèle { #the-model-development-workflow }

Sur le plan pratique, l'intégration d'un modèle sur du matériel SF32 suit la même structure quel que soit le cas d'usage spécifique :

1. **Entraîner ou sélectionner un modèle** sur un poste de travail, avec des données représentatives de ce que le capteur verra réellement sur le terrain — les données de laboratoire, souvent très propres, diffèrent sensiblement des signaux bruités rencontrés en conditions réelles.
2. **Le réduire pour les contraintes embarquées** — via le choix de l'architecture, l'élagage (pruning), ou la quantification — avant de se préoccuper de la conversion spécifique à l'accélérateur.
3. **Exporter le modèle et associer ses opérations** à l'environnement d'inférence choisi ainsi qu'aux opérateurs, dispositions et formats numériques effectivement pris en charge par le SDK cible. Le HAL NNACC ne fournit pas à lui seul un convertisseur de modèles complets ni un moteur d'exécution de graphes.
4. **Valider numériquement** après conversion et quantification ; ne supposez pas que la précision obtenue sur un poste de travail se maintient sans changement.
5. **Intégrer** le prétraitement, l'inférence et le post-traitement dans le firmware — le modèle n'est qu'un appel de fonction au sein d'un pipeline plus vaste.
6. **Profiler** la latence, la mémoire, la consommation et la précision sur du matériel réel, pas seulement en simulation.
7. **Tester sous une charge combinée réaliste** — Bluetooth, écran et capteurs actifs en même temps que l'inférence, pas isolément.

Une erreur fréquente d'intégration consiste à optimiser le modèle sans mesurer le prétraitement, la mise en tampon et le post-traitement. Ces étapes peuvent coûter autant que l'inférence accélérée ; mesurez donc le chemin complet.

## Définir la spécification d'exécution { #define-the-runtime-contract }

Avant de convertir un modèle, consignez précisément les exigences d'exécution auxquelles le firmware doit répondre :

<div align="center"><em>Tableau : Spécification d'exécution du modèle</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Exigence | Décision à figer |
|:--------------|:----------------------|
| Forme d'entrée | Fenêtre d'échantillonnage, taille d'image, nombre de canaux, disposition du tenseur. |
| Format numérique | Largeur en bits des entiers, gestion de l'échelle/du point zéro, jeu de données de calibration. |
| Ensemble d'opérateurs | Couches qui doivent s'exécuter sur NNACC et replis CPU autorisés. |
| Objectif de latence | Latence du pipeline de bout en bout, pas seulement le temps de l'accélérateur. |
| Plafond mémoire | Poids, activations, tenseurs d'entrée/sortie, tampons pré/post. |
| Politique de mise à jour | Si le modèle peut être modifié via OTA et comment il est validé. |

</div>

Les responsables du machine learning et du firmware doivent examiner ces exigences ensemble. Si la forme des tenseurs, le format ou l'ensemble d'opérateurs du modèle change sans mise à jour du firmware, le problème peut se manifester par une précision dégradée ou une latence instable, plutôt que par une erreur de compilation explicite.

## Revue des opérateurs et des replis (fallback) { #operator-and-fallback-review }

Avant de sélectionner un modèle, vérifiez chaque opérateur, ses paramètres et son chemin réel d'exécution. Une implémentation CPU ou un repli automatique doit être explicitement fourni par l'environnement choisi ; une opération non prise en charge peut aussi empêcher le déploiement. Même un petit modèle peut être lent si des couches fréquentes s'exécutent sur le CPU ou imposent des conversions répétées de disposition.

<div align="center"><em>Tableau : Revue des opérateurs et des replis</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Classe | Signification | Action |
|:------|:--------|:-------|
| Accéléré | Pris en charge directement par le chemin NNACC du dispositif cible. | À privilégier pour les couches les plus sollicitées. |
| Repli CPU | L'environnement choisi ou le firmware fournit une implémentation CPU vérifiée. | Mesurer son coût ; l'accepter uniquement si le pipeline complet atteint ses objectifs. |
| Conversion nécessaire | Nécessite une conversion de disposition, de type ou de format. | Inclure le coût de conversion dans les budgets de latence et d'énergie. |
| Non pris en charge | Non disponible dans l'environnement d'exécution cible. | Remplacer la couche ou modifier l'architecture du modèle. |

</div>

Le critère de réussite n'est pas « le modèle s'exécute ». Le critère de réussite est « le pipeline complet atteint les objectifs de précision, de latence, de mémoire et d'énergie avec la même distribution de données que celle que le produit rencontre sur le terrain ».

## Quantification et dimensionnement mémoire { #quantization-and-memory-budgeting }

Les modèles compacts et quantifiés sont courants pour l'IA sur microcontrôleur, souvent avec des entiers sur 8 bits plutôt que des nombres à virgule flottante. Choisissez le format numérique pris en charge par le chemin réel d'exécution. Avant de fixer l'architecture, dimensionnez la mémoire pour tous les éléments suivants, pas seulement les poids :

<div align="center"><em>Tableau : Quantification et dimensionnement mémoire</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Consommateur de mémoire | Remarques |
|:------------------|:------|
| Poids du modèle | Réduits significativement par la quantification, mais restent l'empreinte de base. |
| Tenseurs d'entrée | Dimensionnés selon la fenêtre du capteur, la résolution d'image ou la longueur des trames audio. |
| Activations intermédiaires | Faciles à sous-estimer ; peuvent dépasser la taille des poids pour certaines architectures. |
| Tenseurs de sortie | Généralement petits, mais ne les oubliez pas dans le budget. |
| Tampons de pré/post-traitement | Le filtrage, le découpage en trames, l'extraction de caractéristiques et le seuillage ont tous besoin de mémoire de travail. |
| Mémoire système concurrente | Les tampons de l'interface utilisateur, du Bluetooth et de l'audio se disputent en même temps la même SRAM/PSRAM. |

</div>

La quantification peut réduire les coûts mémoire et de calcul, mais revérifiez la précision après conversion avec des données de capteurs représentatives. Le guide du SDK v2.5.1 documente l'accélération de `arm_convolve_1x1_HWC_q7_fast_nonsquare`, `arm_convolve_HWC_q7_basic_nonsquare` et `arm_depthwise_separable_conv_HWC_q7_nonsquare`. La [configuration du HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) utilise des tampons sur 8 bits et des décalages pour le biais et la sortie. Cela ne prouve pas que les points zéro et les échelles par canal de tout modèle int8 moderne sont directement compatibles. Vérifiez l'équivalence numérique et définissez, pour chaque couche non prise en charge, une implémentation CPU, une conversion ou un refus de déploiement.

## Placement des tampons et hiérarchie mémoire { #buffer-placement-and-the-memory-hierarchy }

La bande passante mémoire peut limiter les performances de l'IA même si la capacité de calcul est disponible. Sur les dispositifs SF32 avec SRAM, Flash, PSRAM et caches d'instructions/données STAR-MC1, vérifiez l'accessibilité de la mémoire et le coût du placement des tampons :

- Placez les tenseurs et tampons intermédiaires souvent utilisés dans une mémoire accessible au CPU et à l'instance d'accélérateur choisie, avec l'alignement et la disposition requis.
- Placez les poids volumineux ou les ressources rarement utilisées en mémoire externe seulement si le chemin d'exécution le permet. Toute copie vers une mémoire accessible à l'accélérateur doit être incluse dans les budgets mémoire, latence et énergie.
- Pendant un transfert, le tampon partagé doit être utilisé exclusivement par le CPU ou par l'accélérateur/DMA. Avant l'accès matériel, préparez toute la plage alignée sur les lignes de cache : nettoyez les lignes de cache contenant les données d'entrée écrites par le CPU et traitez les lignes modifiées de la zone de sortie selon les règles du SDK pour les écritures de périphérique. Attendez la fin de l'opération avant d'invalider la sortie et de rendre le tampon au CPU. Ne modifiez ni le tampon ni d'autres données partageant ses lignes de cache tant que le matériel l'utilise.

L'[implémentation du HAL v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) vérifie que les tampons ne franchissent pas les limites des fenêtres d'adresses de 1 MiB (1 048 576 octets) et impose que l'entrée et le biais soient dans la même fenêtre. Vérifiez les adresses réellement allouées, pas seulement la mémoire libre totale. Le démarrage bloquant attend la fin par scrutation ; le mode avec interruptions exige un traitement correct de l'IRQ et une notification de fin. Vérifiez les valeurs de retour et prévoyez une récupération après erreur ainsi que des attentes bornées côté application, sans supposer que le moteur du modèle possède un délai d'expiration.

Voir [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization) pour les considérations de cache et de système mémoire dans ce type de profil d'accès mixte.

## Feuille de calcul du budget mémoire { #memory-sizing-worksheet }

Avant l'intégration au firmware, établissez un tableau de dimensionnement mémoire à partir des valeurs de pire cas, et non d'estimations moyennes :

<div align="center"><em>Tableau : Dimensionnement mémoire</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Tampon | Facteur de taille | Préférence de placement |
|:-------|:------------|:---------------------|
| Fenêtre d'entrée brute | Fréquence d'échantillonnage x canaux x durée de fenêtre x octets par échantillon, plus remplissage de la disposition | Mémoire accessible au DMA si un périphérique effectue la capture. |
| Espace de travail de prétraitement | Filtres, FFT/MFCC, normalisation, redimensionnement/recadrage | SRAM rapide lorsque réutilisé à chaque inférence. |
| Poids du modèle | Taille du modèle quantifié | Flash/PSRAM si pris en charge ; SRAM uniquement pour les sections critiques. |
| Activations | Plus grands tenseurs intermédiaires | Mémoire rapide accessible à l'accélérateur. |
| Sortie/post-traitement | Classes, boîtes, scores, état de lissage | SRAM ; généralement petit mais sensible à la latence. |
| Tampons de coexistence | Audio, écran, Bluetooth, journalisation | Budgétiser en parallèle, pas après que l'IA « tienne ». |

</div>

Laissez de la marge pour la pile, le tas, les objets RTOS, la journalisation et l'OTA. Un modèle qui ne tient que lorsque tous les autres sous-systèmes sont désactivés n'est pas un modèle prêt pour la production.

## Construire le pipeline complet { #building-the-full-pipeline }

L'accélérateur est une étape du pipeline allant du capteur à la décision. Trois chemins d'entrée courants sont décrits ci-dessous.

### Audio et voix { #audio-and-voice }

La détection de mots-clés, les déclencheurs de type mot de réveil et la classification d'événements audio nécessitent la capture microphone, le découpage en trames et l'extraction de caractéristiques avant le début de l'inférence. La [vue d'ensemble de l'audio](../audio/overview.md) décrit la capture et la mise en tampon de ce flux. L'accélérateur n'est utile que si l'audio qui l'alimente est capturé et mis en tampon efficacement dès le départ.

### Mouvement et fusion de capteurs { #motion-and-sensor-fusion }

La reconnaissance de gestes, la classification d'activité et l'analyse biométrique utilisent généralement les données d'accéléromètres, de gyroscopes ou d'autres capteurs. Mesurez séparément le fonctionnement des capteurs, la capture, le prétraitement et l'inférence avant de déterminer ce qui consomme le plus d'énergie. Le regroupement et la capture par interruptions peuvent réduire les réveils si la latence et la détection de tous les signaux nécessaires le permettent ; leur effet ne dépasse pas systématiquement le coût du modèle. Consultez la [vue d'ensemble de la conception basse consommation](../low-power/overview.md#ai-and-sensor-power-tuning) pour des conseils d'ordonnancement.

### Caméra et entrée image { #camera-and-image-input }

Une entrée caméra peut entraîner des coûts importants de capture, de mise en tampon, de bande passante et d'inférence. La charge réelle dépend de la résolution, de la cadence, du fonctionnement du capteur et de l'architecture du modèle. Si la précision le permet, réduisez l'image ou traitez une région d'intérêt. Choisissez un modèle adapté aux contraintes embarquées plutôt que de supposer qu'un modèle de vision pour ordinateur se déploie sans modification.

## Ordonnancement de l'inférence en fonction de l'énergie { #power-aware-inference-scheduling }

Choisissez l'ordonnancement pour détecter les signaux requis dans le délai de réponse prévu. L'inférence périodique est valable si le produit exige des décisions régulières ; conditionner l'exécution à des événements n'est utile que si aucun signal nécessaire n'est manqué.

- Lorsque cela convient, déclenchez l'inférence sur de nouvelles données pertinentes, par exemple un seuil de capteur ou une trame audio complète. Conservez le traitement périodique s'il est nécessaire et vérifiez les faux négatifs et le pire délai de réponse après modification du déclencheur.
- Regroupez les échantillons lorsque les exigences de latence le permettent, plutôt que d'exécuter de nombreuses petites inférences.
- Lorsque le dispositif et le SDK le prennent en charge, déplacez la détection permanente légère vers le processeur basse consommation plutôt que de réveiller le CPU applicatif principal pour chaque échantillon.
- Mesurez l'**énergie par inférence** en intégrant la puissance d'alimentation mesurée (tension d'alimentation × courant) sur un intervalle clairement défini. Incluez la capture, le pré/post-traitement et les transitions réveil/veille dans le budget de la fonction. Une exécution plus rapide peut réduire l'énergie en activité ou permettre un retour plus tôt en veille, mais le gain dépend du courant, du trafic mémoire et du reste du système.

Les conseils sur la consommation à l'échelle du système figurent dans la [vue d'ensemble de la conception basse consommation](../low-power/overview.md). Consultez-la en complément pour toute fonctionnalité IA qui doit fonctionner en continu ou presque.

## Arbitrage entre précision, latence et consommation { #the-accuracy-latency-power-tradeoff }

Ces points décrivent des contraintes de conception courantes, pas des relations fixes. Mesurez la précision réelle du modèle et l'énergie du pipeline complet pour effectuer ces arbitrages :

<div align="center"><em>Tableau : Arbitrage entre précision, latence et consommation</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Priorité | Conséquences habituelles sur la conception |
|:---------|:--------------------------|
| Précision plus élevée | Modèle plus grand, plus de caractéristiques d'entrée, fenêtre plus longue, plus de mémoire. |
| Latence plus faible | Fenêtres de capture plus courtes, exécution plus rapide ou décisions plus fréquentes ; vérifier les effets sur la précision et l'énergie. |
| Consommation plus faible | Inférences moins fréquentes, modèle compact, placement mémoire efficace et périodes de veille plus longues entre les exécutions. |

</div>

Avant tout réglage, déterminez quel compromis le produit doit privilégier. Un détecteur de gestes peut souvent accepter un léger délai supplémentaire pour préserver l'autonomie ; un déclencheur vocal tolère généralement peu de retard, mais doit aussi éviter les réveils intempestifs qui gaspillent de l'énergie.

## Mise à jour du modèle et validation sur le terrain { #model-update-and-field-validation }

Si la fonctionnalité IA est susceptible de s'améliorer après le lancement, concevez le support de mise à jour du modèle dès le début :

- Versionnez le modèle séparément du firmware lorsque c'est possible, et consignez dans le paquet le format et les exigences d'entrée attendus.
- Vérifiez l'authenticité, l'intégrité et la compatibilité du paquet avec l'environnement d'exécution et les entrées avant activation. L'activation doit résister à une interruption de mise à jour et permettre un retour à une version validée si les contrôles de démarrage échouent.
- Stockez la calibration, les seuils et les constantes de post-traitement avec la version du modèle qui les requiert.
- Journalisez suffisamment de statistiques de terrain pour diagnostiquer une dérive sans stocker inutilement des données brutes de capteurs privées.
- Relancez les tests de consommation et de coexistence après chaque mise à jour du modèle ; une amélioration de la précision du modèle peut rester une régression produit si elle réveille le système plus souvent.

## Déboguer la performance et la précision de l'IA { #debugging-ai-performance-and-accuracy }

<div align="center"><em>Tableau : Déboguer la performance et la précision de l'IA</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Symptôme | Zone probable à vérifier |
|:--------|:----------------------|
| Le modèle s'exécute mais la précision chute par rapport aux résultats du poste de travail | Décalage de quantification/calibration, ou données d'entraînement non représentatives du bruit réel des capteurs. |
| L'inférence est plus lente que prévu | Exécution réelle des couches sur le CPU, conversion de disposition, bande passante mémoire ou concurrence d'ordonnancement. |
| Le système n'atteint jamais la profondeur de veille attendue | Réveils inutiles, pilotes/horloges actifs, verrous de gestion d'énergie ou opération d'accélérateur non terminée. |
| La fonctionnalité fonctionne seule mais échoue dans le produit complet | Non testée sous charge combinée (Bluetooth + écran + capteurs actifs ensemble). |
| Consommation élevée malgré un modèle « rapide » | Mesure de la latence au lieu de l'énergie par inférence ; chemin codec/capteur laissé actif entre les exécutions. |
| Sortie erratique intermittente sur des tampons partagés | Préparation des lignes de cache, lignes modifiées, réutilisation prématurée, fin d'opération non confirmée ou accès simultanés du CPU et du matériel. |

</div>

## Erreurs courantes { #common-mistakes }

- Choisir une architecture de modèle avant de vérifier quels opérateurs l'environnement d'exécution cible accélère réellement.
- Porter un modèle à l'échelle d'un poste de travail au lieu de concevoir dès le départ pour les contraintes embarquées.
- Ignorer le coût mémoire des activations intermédiaires et ne budgétiser que les poids du modèle.
- Exécuter l'inférence sans vérifier que sa fréquence et son déclencheur respectent les signaux à détecter et le délai de réponse requis.
- Valider la précision uniquement sur des données de laboratoire propres, jamais sur du bruit réaliste de terrain/capteur.
- Tester la fonctionnalité IA isolément et ne découvrir les problèmes de coexistence qu'après l'intégration complète du produit.
- Optimiser la latence du modèle en ignorant les étapes de pré- et post-traitement qui l'entourent.

## Liste de contrôle de mise en service { #bring-up-checklist }

- [ ] Définir la décision locale que le produit doit prendre et le compromis acceptable latence/précision/consommation.
- [ ] Sélectionner le dispositif SF32 en fonction de la taille du modèle et des besoins mémoire, pas seulement de l'objectif de coût.
- [ ] Construire et valider le pipeline complet (capture -> prétraitement -> inférence -> post-traitement) d'abord avec un modèle de test minimal, puis avec le modèle de production.
- [ ] Convertir et quantifier le modèle réel, puis valider la précision par rapport à des données de capteurs réalistes.
- [ ] Budgétiser la mémoire pour les poids, les tenseurs d'entrée/sortie et les activations intermédiaires ensemble.
- [ ] Valider la gestion de la cohérence de cache pour tout tampon partagé entre le CPU et l'accélérateur.
- [ ] Valider l'ordonnancement périodique ou événementiel par rapport aux signaux à détecter, à la latence maximale et au budget énergétique mesuré.
- [ ] Profiler l'énergie par inférence sous charge système combinée (Bluetooth, écran, capteurs actifs).
- [ ] Revalider la précision et la consommation après tout changement de quantification, de modèle, ou d'ordonnancement.

## Points clés à retenir { #key-takeaways }

- Partez de la décision produit et des données de capteurs, pas de l'architecture du modèle — le modèle n'est qu'une étape dans un pipeline plus vaste.
- Utilisez le positionnement des familles pour présélectionner, puis vérifiez la référence, le SDK, l'association des opérateurs, l'allocation mémoire et la charge simultanée.
- Budgétisez la mémoire pour l'ensemble du pipeline (poids, tenseurs, activations, tampons de pré/post-traitement), pas seulement la taille du fichier modèle.
- Choisissez une inférence périodique ou événementielle qui détecte tous les signaux requis et mesurez l'énergie de la fonction complète, sans assimiler la vitesse du modèle à un résultat de consommation.
- Testez la précision sur des données de terrain réalistes et testez la fonctionnalité complète sous charge système combinée, pas isolément.
