---
icon: lucide/battery
title: "Vue d'ensemble de la conception basse consommation"
description: "Principes pratiques de conception basse consommation pour SF32 : modes de fonctionnement, gestion de l'énergie et effets du Bluetooth, de l'affichage, de l'audio et de l'IA sur l'autonomie."
tags:
  - Basse consommation
---

# Vue d'ensemble de la conception basse consommation { #low-power-overview }

## Objectif et portée { #overview }

Ce guide présente les principes pratiques de conception basse consommation pour les appareils SF32 : les modes de fonctionnement, les principaux postes de consommation et la manière d'organiser le firmware pour que le système reste le plus longtemps possible dans un état économe. La consommation dépend du système dans son ensemble : les choix liés au Bluetooth, à l'affichage, à l'audio et à l'IA influent directement sur l'autonomie et sont donc examinés conjointement.

La documentation du SDK SiFli décrit un middleware **PM (Power Management, gestion de l'énergie)** basé sur RT-Thread pour certaines familles, notamment SF32LB52x. Les modes disponibles et le comportement de réveil peuvent varier selon l'appareil et la configuration du SDK ; consultez la documentation de l'appareil concerné. Pour les familles dont le SDK confie les tâches du contrôleur Bluetooth à un processeur distinct (voir [Processeur Bluetooth](../bluetooth/processor.md)), le processeur distinct peut traiter les événements radio sans réveiller le CPU applicatif à chaque fois. La possibilité pour ce dernier de rester en veille dépend de la répartition des tâches, des sources de réveil configurées et du trafic interprocesseur ; vérifiez-la sur l'appareil concerné.

Utilisez ce guide pour traduire un objectif d'autonomie en décisions matérielles et logicielles étayées par des mesures. Il s'adresse aux ingénieurs qui doivent arbitrer entre veille connectée, comportement de l'affichage, audio, capteurs, IA et réactivité du produit. La gestion de la veille ne se résume pas à un simple appel d'API.

## Définir d'abord le budget énergétique du produit { #define-the-products-power-budget-first }

Avant d'implémenter la gestion de l'énergie, définissez l'autonomie et le comportement attendus du produit :

- Autonomie visée (heures, jours ou semaines) et capacité de la batterie.
- Profil d'utilisation attendu : quelle part de la journée l'appareil est-il utilisé activement, connecté mais inactif, ou complètement en veille ?
- Quels événements doivent réveiller le système, et dans quel délai ?
- Quels sous-systèmes doivent rester actifs en permanence — par exemple, une liaison Bluetooth, un écran toujours allumé ou une détection vocale — et lesquels peuvent fonctionner uniquement à la demande d'un événement ?
- Comportement de charge et nombre de cycles prévus, si ces éléments interviennent dans la stratégie énergétique du produit.

Ces objectifs doivent orienter les choix d'architecture dès le début : sélection de la puce et du type d'écran, mais aussi décision de maintenir ou non des fonctions comme l'écoute permanente d'un mot-clé ou un écran toujours allumé, au regard du budget énergétique.

## Modes de fonctionnement et gestion PM { #power-modes-and-the-pm-framework }

Les catégories suivantes représentent des états conceptuels du système, et non une liste exacte des modes matériels SF32 ou des valeurs d'énumération du SDK. Consultez la documentation du composant et du SDK retenus pour connaître les modes pris en charge, les sources de réveil et la conservation de l'état :

<div align="center"><em>Tableau : Modes de fonctionnement et gestion PM</em></div>

<div align="center" markdown>

| Mode | État typique | Quand utilisé |
|:-----|:---------------|:----------|
| **Actif** | Le CPU fonctionne ; les périphériques nécessaires sont actifs | Interaction avec l'interface, transfert Bluetooth, diffusion audio, traitement des capteurs. |
| **Inactif** | Le CPU attend un événement ou une interruption ; l'état des périphériques dépend de l'appareil et de sa configuration | Entre deux rafraîchissements de l'interface ou en attente de la prochaine tâche planifiée ou d'une interruption activée. |
| **Veille / basse consommation** | Un CPU ou un sous-système passe dans un état basse consommation pris en charge ; horloges, domaines et périphériques peuvent s'arrêter ou rester actifs selon cet état | Veille connectée ou attente d'un événement Bluetooth, d'une interruption de capteur ou d'un minuteur configurés. |
| **Deep Sleep (veille profonde) / Standby** | État plus profond propre à l'appareil, avec moins de domaines actifs ; la rétention et le réveil varient | Périodes d'inactivité prolongées lorsque le mode choisi et les exigences de réveil le permettent. |

</div>

La charge de travail fait passer le système d'un état à l'autre. Une source de réveil configurée réveille le CPU ou le sous-système ; la séquence de réveil et de restauration des horloges dépend de l'appareil. Une fois la tâche terminée, les pilotes ou tâches responsables doivent libérer les demandes PM qui empêchent la veille afin que la politique configurée puisse sélectionner un état basse consommation admissible. Le tracé ci-dessous est illustratif : il montre des transitions relatives, et non des valeurs de courant ou des durées propres à un appareil.

<div align="center">
<img src="assets/power-mode-transition-fr.svg" alt="Tracé illustratif du courant relatif : Deep Sleep, réveil, activité, inactivité et retour au mode basse consommation" width="960">
<br><em>Diagramme : Exemple de transitions entre modes pendant une tâche brève</em>
</div>

La sélection d'un mode de basse consommation et le blocage du passage en veille sont deux mécanismes distincts. La [référence du middleware PM pour SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/pm.html) et le [guide de gestion de la basse consommation SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/low_power.html) de SiFli indiquent que `rt_pm_request(PM_SLEEP_MODE_IDLE)` bloque l'entrée dans LIGHT, DEEP et STANDBY jusqu'à l'appel correspondant à `rt_pm_release(PM_SLEEP_MODE_IDLE)` ; cette demande ne sélectionne pas un mode plus profond.

Pour l'implémentation, consultez le guide officiel de basse consommation de la famille visée : [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/low_power.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/low_power.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/low_power.html) ou [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/low_power.html). Les modes disponibles, les conditions d'entrée, les sources de réveil et le maintien de l'état dépendent de la famille, de la carte et de la configuration du SDK. Le [guide basse consommation SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/low_power.html) contient un exemple de configuration des broches de réveil Hibernate explicitement regroupé pour 58x/56x/52x/57x. La référence commune de l'[API HAL PMU du SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/api/hal/pmu.html) précise que, pour le SF32LB57x, la plage d'indices utilisée par `HAL_PMU_EnablePinWakeup()` va de 0 à 13. Ces sources établissent uniquement cette configuration des broches ; elles ne démontrent pas que les modes RT-Thread disponibles sur 52x, les seuils définis par la politique PM ou le comportement de rétention de 52x s'appliquent également à 57x. Vérifiez ces points dans la documentation du SDK et du composant ciblés. En règle générale, une politique configurée ne peut sélectionner un état admissible plus profond que si l'intervalle d'inactivité et les autres conditions d'entrée le permettent. Une demande non libérée peut maintenir le système dans un état moins profond que prévu.

## Principaux postes de consommation d'un produit SF32 { #what-drains-power-on-an-sf32-product }

Chaque sous-système a un profil de consommation qui lui est propre :

<div align="center"><em>Tableau : Principaux postes de consommation d'un produit SF32</em></div>

<div align="center" markdown>

| Sous-système | Principal facteur de consommation | Guide |
|:----------|:--------------------|:------|
| **CPU** | Temps d'exécution actif, pas seulement la fréquence d'horloge | Ce guide |
| **Radio Bluetooth** | Intervalle de publicité, intervalle de connexion, latence de l'esclave (Slave Latency), puissance d'émission | [Vue d'ensemble Bluetooth](../bluetooth/overview.md#advertising-and-connection-parameters) |
| **Affichage** | Fréquence de rafraîchissement, mises à jour plein écran ou partielles, rétroéclairage | [Contrôleur d'affichage : rafraîchissement partiel](../graphics/display-controller.md#partial-refresh-and-dirty-regions) |
| **Codec audio/DMA** | Durée de la session, fréquence d'échantillonnage et maintien ou non du codec sous tension entre les sessions | [Vue d'ensemble de l'audio](../audio/overview.md#power-considerations-for-audio) |
| **Inférence IA** | Fréquence d'inférence et taille de fenêtre, pas seulement taille du modèle | [Vue d'ensemble de l'IA](../ai/overview.md#power-aware-inference-scheduling) |
| **Système mémoire** | Activité du cache/PSRAM et fréquence d'exécution du code depuis une mémoire externe lente | [STAR-MC1](../architecture/star-mc1.md) |
| **Capteurs** | Fréquence d'interrogation ou échantillonnage déclenché par interruption | Ce guide |

</div>

Aucune intervention isolée ne résout tous ces problèmes. Optimiser un produit réel consiste à ajuster la contribution de chaque sous-système, puis à vérifier l'effet combiné, car tous les sous-systèmes interviennent dans la même décision : jusqu'à quelle profondeur le système peut-il s'endormir ?

## Concevoir le firmware pour favoriser la veille { #sleep-aware-firmware-design }

Les gains les plus importants viennent généralement de l'architecture du firmware, et non d'astuces de bas niveau :

- **Préférez les interruptions et les événements aux interrogations périodiques (polling).** Une boucle de polling maintient le CPU actif même lorsqu'il n'y a rien à faire.
- **Regroupez les traitements.** Lorsque la latence le permet, accumulez les mesures des capteurs, les événements Bluetooth ou les blocs audio, puis traitez-les ensemble au lieu de réveiller le système pour chacun.
- **Libérez rapidement les demandes PM qui empêchent la veille.** Un pilote ou une tâche qui maintient une demande bloquant l'entrée dans un état basse consommation plus profond doit libérer la demande correspondante dès que ce blocage n'est plus nécessaire. Sinon, le système peut rester dans un état moins profond que prévu.
- **Concevez les parcours de l'interface et de l'audio pour réagir aux événements**, plutôt que de les interroger périodiquement, dans la mesure permise par le framework.
- **Passez les minuteurs en revue.** Un minuteur périodique programme une tâche future et peut réveiller le système ou réduire l'intervalle d'inactivité disponible pour la politique PM. Plusieurs minuteurs apparemment « inoffensifs » peuvent ainsi réduire le temps passé dans des états basse consommation plus profonds.

## Commencer par un exemple basse consommation validé { #start-from-a-verified-power-example }

Avant d'estimer l'autonomie du produit, choisissez un exemple du SDK qui valide le facteur de consommation le plus incertain. [Exemples du SDK pour la basse consommation](low-power-sdk-examples.md) présentent les projets officiels PM, GPIO, processeur, Bluetooth, affichage, interface graphique, rafraîchissement de l'écran et activation au lever du poignet, ainsi que les scénarios qu'ils illustrent. L'article précise aussi quelles hypothèses relatives à l'alimentation, à la carte, à la configuration, à la source de réveil, au circuit externe et à la charge de travail doivent être revérifiées avant d'utiliser un exemple comme élément de validation du produit.

## Réduire la consommation du Bluetooth { #bluetooth-power-tuning }

Les paramètres de connexion et de publicité sont les principaux leviers pour réduire la consommation du Bluetooth (voir le tableau complet dans la [Vue d'ensemble Bluetooth](../bluetooth/overview.md#advertising-and-connection-parameters)) :

- Pour les liaisons généralement inactives, augmentez l'intervalle de connexion et la latence de l'esclave (Slave Latency).
- Réduisez la puissance d'émission au niveau minimal qui garantit encore la portée requise.
- Quand le produit attend surtout des reconnexions et n'a plus besoin d'être découvert pour la première fois, réduisez la fréquence des annonces.
- Lorsque le SDK retenu traite les événements du contrôleur Bluetooth sur un processeur distinct, le CPU applicatif peut rester en veille entre les événements de connexion si aucune tâche, source de réveil ou communication interprocesseur ne le sollicite. Le réveiller à chaque callback Bluetooth réduit cet avantage ; vérifiez la répartition des cœurs et des tâches sur l'appareil cible.

Pour mesurer la consommation réelle, scénario par scénario, en Bluetooth classique seul, en BLE seul et en mode dual combinant les deux, consultez [Mesurer et analyser la consommation Bluetooth](../bluetooth/bluetooth-low-power-profiling.md).

## Consommation de l'affichage et du rétroéclairage { #display-and-backlight-power }

Sur les produits portables, l'affichage et son rétroéclairage constituent souvent le poste individuel de consommation le plus important :

- Lorsque l'écran et l'interface le permettent, actualisez seulement les zones modifiées au lieu de redessiner tout l'écran (voir [Contrôleur d'affichage : rafraîchissement partiel](../graphics/display-controller.md#partial-refresh-and-dirty-regions)).
- En période d'inactivité, réduisez la luminosité de l'affichage ou, si l'écran est équipé d'un rétroéclairage, éteignez-le. Arrêtez également les animations lorsque l'écran est atténué ou masqué.
- Pour un affichage toujours allumé, comparez les panneaux EPD, JDI/memory-in-pixel, AMOLED et TFT à partir de l'énergie mesurée dans ce mode et de l'expérience utilisateur attendue. Choisissez un panneau et une stratégie compatibles avec le budget, plutôt que de maintenir en permanence le mode actif habituel.
- Prévoyez une ligne distincte pour l'affichage toujours allumé dans le budget énergétique : il change fondamentalement la définition de l'inactivité du produit.

## Réduire la consommation de l'IA et des capteurs { #ai-and-sensor-power-tuning }

Planifiez l'inférence embarquée et l'échantillonnage des capteurs au lieu de les exécuter en continu :

- Ne lancez l'inférence que lorsque de nouvelles données utiles sont disponibles, plutôt qu'à intervalle fixe indépendamment de l'activité en entrée.
- Lorsque l'appareil et le SDK le permettent, confiez les tâches légères de détection permanente au processeur basse consommation. Le CPU applicatif principal n'aura ainsi pas à se réveiller pour chaque échantillon.
- Mesurez l'**énergie par inférence ou par échantillon**, et pas seulement la latence. Une opération plus rapide ne réduit la consommation que si elle permet au système de se remettre en veille plus tôt.

Consultez la [vue d'ensemble de l'IA](../ai/overview.md#power-aware-inference-scheduling) pour approfondir le compromis entre précision, latence et consommation.

## Mémoire et horloges { #memory-and-clock-considerations }

La mémoire depuis laquelle le code s'exécute influe à la fois sur les performances et sur la consommation. Sur les appareils SF32 qui implémentent et activent les caches concernés, les caches d'instructions et de données peuvent réduire les temps d'attente lors des accès au Flash ou à la PSRAM. Une exécution plus courte peut laisser davantage de temps au système pour se mettre en veille. Pour en savoir plus sur les caches et la hiérarchie mémoire, consultez [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization).

Au-delà du CPU lui-même :

- La PSRAM et le Flash externes ont leur propre consommation en modes actif et veille. Consultez leurs fiches techniques concernant la rétention des données et les accès, surtout si de grands tampons doivent rester valides en veille.
- Le choix de la source d'horloge — quartz ou oscillateur interne — ainsi que les domaines PLL et d'horloge maintenus actifs influent sur la latence de réveil et la consommation en veille.
- Réduire la fréquence du CPU pendant les phases peu exigeantes peut être utile. Vérifiez toutefois que l'allongement du temps d'activité n'annule pas le gain. Mesurez l'énergie consommée, et pas seulement le courant instantané.

## Matériel et conception RF { #hardware-and-rf-power-considerations }

La stratégie du firmware reste limitée par les capacités du matériel :

- Le rendement du PMIC et du LDO aux courants réellement demandés par le produit compte davantage que les valeurs de rendement mises en avant pour des charges sans rapport.
- Le routage RF et l'accord de l'antenne déterminent en partie la puissance d'émission nécessaire pour assurer la portée voulue. Une conception RF médiocre peut obliger le firmware à augmenter cette puissance, au détriment de l'autonomie. Voir [Processeur Bluetooth : RF et horloges](../bluetooth/processor.md#rf-and-clock-considerations).
- La précision du quartz influe sur les marges temporelles RF ainsi que sur les temporisations de supervision et les marges de réveil que le firmware doit prévoir.
- Prévoyez des points d'accès pour les tests et l'étalonnage en production. L'optimisation de la consommation et des performances RF se poursuit souvent après la première révision matérielle.

## Exemple : allumer l'écran en levant le poignet { #case-study-raise-to-wake }

L'allumage de l'écran lorsque l'utilisateur lève le poignet est un cas d'usage courant sur les appareils portables, mais sa mise en œuvre dépend du capteur, de la carte et du SDK. L'[exemple de lever de poignet SF32LB52x de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) cible la carte `sf32lb52-lchspi-ulp` et utilise un LSM6DSL (accéléromètre/gyroscope) ; il échantillonne l'accélération toutes les 200 ms pour reconnaître les gestes de lever et d'abaisser le poignet. L'appareil entre en veille après 10 secondes d'inactivité et se réveille pour allumer l'écran lorsqu'il détecte le lever du poignet. Il s'agit d'une mise en œuvre propre à une carte, qui ne prouve pas que d'autres cibles utilisent une interruption du capteur ou le même comportement PM. Si le capteur cible prend en charge les interruptions de mouvement ou de seuil, le firmware peut les configurer comme source de réveil afin d'éviter une interrogation continue par le CPU applicatif. Sinon, intégrez l'échantillonnage du capteur et les réveils du CPU au budget de consommation. Vérifiez le capteur, la carte, les sources de réveil et la configuration PM de la cible concernée.

## Modèle de budget énergétique { #power-budget-worksheet }

Chiffrez les objectifs du produit avant d'optimiser le firmware. Un tableau simple suffit généralement :

<div align="center"><em>Tableau : Modèle de budget énergétique</em></div>

<div align="center" markdown>

| État | Question à se poser | Consommation à budgéter |
|:------|:-----------------|:------------|
| Expédition/stockage | Combien de temps le produit peut-il rester stocké avant sa première utilisation ? | Courant en Deep Sleep, rétention RTC, courants de fuite des composants externes. |
| Inactivité avec connexion maintenue | Combien d'heures par jour le produit reste-t-il appairé sans être utilisé ? | Intervalle BLE, latence de l'esclave, interruptions des capteurs, courant écran éteint. |
| Consultation de l'écran | À quelle fréquence et pendant combien de temps l'écran s'active-t-il ? | Rétroéclairage, rafraîchissement partiel, activité ponctuelle du CPU/de l'interface, contrôleur tactile. |
| Session audio | Pendant combien de temps la lecture, l'enregistrement ou l'appel est-il actif ? | Codec, DMA, audio Bluetooth, bande passante mémoire. |
| Traitement IA | À quelle fréquence l'inférence est-elle exécutée ? | Acquisition des capteurs, prétraitement, temps processeur/accélérateur, post-traitement. |
| OTA/maintenance | À quelle fréquence des mises à jour sont-elles prévues ? | Intervalle de connexion court, effacement/écriture du Flash, espace de stockage pour revenir à la version précédente. |

</div>

Pour un ensemble d'états de fonctionnement mutuellement exclusifs, estimez `average current = state current x duty cycle` (courant moyen = courant dans l'état × facteur d'utilisation), puis additionnez les contributions de chaque état. Si des charges fonctionnent simultanément, incluez-les dans le total du scénario correspondant pour ne pas compter deux fois des états qui se chevauchent. Vous repérerez ainsi les problèmes de conception en amont : viser 20 µA en veille ne sauvera pas un produit qui passe trop de temps avec un rétroéclairage intense ou une boucle d'inférence à intervalle fixe actifs.

## Établir un profil énergétique : modéliser, mesurer, actualiser { #power-profiling-model-measure-update }

Un profil énergétique transforme le budget en une démarche d'ingénierie reproductible. Définissez des scénarios d'utilisation représentatifs, mesurez la tension et le courant à la limite d'alimentation pertinente et tenez compte de la durée et de la fréquence de chaque charge. Calculez l'énergie dans le temps et ramenez les mesures de chaque rail à la consommation côté batterie, en tenant compte des pertes de conversion ; n'additionnez pas directement les courants de rails à des tensions différentes. Vous pourrez ainsi estimer le courant moyen côté batterie, la charge consommée par jour et l'autonomie, et hiérarchiser les scénarios à mesurer et à optimiser.

<div align="center"><em>Diagramme : Cycle d'établissement et de validation du profil énergétique</em></div>

```mermaid
flowchart LR
    A["Définir des scénarios d'utilisation représentatifs"] --> B["Fixer les hypothèses de courant, tension, durée et fréquence"]
    B --> C["Calculer l'énergie par événement et par jour"]
    C --> D["Comparer au budget batterie et classer les principaux postes"]
    D --> E["Mesurer les scénarios prioritaires sur le matériel cible"]
    E --> F["Actualiser le modèle avec les courants et durées mesurés"]
    F --> B
```

Un profil fournit une estimation, pas une mesure. L'[Online Power Profiler for Bluetooth LE](https://devzone.nordicsemi.com/power/w/opp/2/online-power-profiler-for-bluetooth-le) de Nordic applique le même principe : il s'appuie sur des modèles dérivés de mesures, mais fournit des valeurs prévisionnelles et non une mesure d'un produit donné. Le courant réel dépend notamment du silicium, de la conception de la carte, de la tension de la batterie, de la température, des conditions RF, du séquencement du firmware et du scénario d'utilisation.

Pour chaque scénario, consignez les hypothèses qui influent sensiblement sur l'énergie :

- Quels sous-systèmes sont actifs, et dans quel mode basse consommation le MCU entre-t-il réellement ?
- Quel courant circule à l'entrée batterie et sur chacune des lignes d'alimentation régulées ?
- Combien de temps dure chaque activité et à quelle fréquence survient-elle au cours d'une journée type ?
- Quels pics de courant sont prévus et lesquels signalent une activité inattendue ou une mise en veille qui n'a pas eu lieu ?

Servez-vous de l'estimation pour repérer les principaux postes de consommation, puis validez ces scénarios sur le matériel avant d'annoncer une autonomie. L'article [Analyse de la consommation d'une montre connectée](smartwatch-power-profiling.md) applique cette méthode à un modèle d'utilisation quotidienne ; [Mesurer et valider la consommation énergétique](measurement-and-validation.md) décrit un protocole de mesure reproductible.

## Examiner les demandes PM et les sources de réveil { #pm-ownership-and-wake-source-review }

Une conception basse consommation fiable doit attribuer clairement la responsabilité de chaque source de réveil et de chaque demande qui empêche la veille. Vérifiez les points suivants lors de la revue de conception :

<div align="center"><em>Tableau : Revue des demandes PM et des sources de réveil</em></div>

<div align="center" markdown>

| Point à vérifier | Question de revue | Problème possible |
|:-----|:----------------|:-------------|
| Responsable des demandes/blocages PM | Quel pilote ou quelle tâche peut empêcher l'entrée dans un état plus profond ? | Une demande non libérée peut maintenir le système dans un état moins profond. |
| Condition de libération | Quel événement ou chemin d'erreur garantit la libération de la demande correspondante ? | Une demande laissée active peut empêcher une veille plus profonde et augmenter la consommation. |
| Source de réveil | Quelle interruption, quel minuteur, événement BLE ou capteur pris en charge et configuré sur l'appareil peut réveiller le CPU ? | Des réveils périodiques inattendus peuvent constituer la principale composante du courant au repos. |
| Dépendance d'horloge | Quel domaine d'horloge doit rester actif ? | Un périphérique peut empêcher sans avertissement une veille plus profonde. |
| Besoin de rétention | Quelles données ou quel état doivent être conservés pendant la veille ? | Une rétention excessive augmente le courant ; une rétention insuffisante perturbe le réveil. |

</div>

Pendant le débogage, consignez la politique PM configurée, les demandes actives qui empêchent des modes plus profonds et le dernier mode basse consommation indiqué par le SDK ou ses journaux. Si le système atteint un état moins profond que prévu, ces éléments sont souvent plus révélateurs qu'une valeur de courant isolée.

## Mesurer la consommation en pratique { #measuring-power-in-practice }

Ne vous contentez pas d'estimer : mesurez. Un dispositif de validation de base comprend :

- Une sonde de courant ou un analyseur de puissance en série entre la batterie ou l'alimentation et la carte.
- Des scénarios d'essai représentatifs de l'utilisation réelle : repos connecté, interaction avec l'interface, lecture audio, rafales d'inférence IA et charge combinée maximale.
- L'enregistrement ou le marquage des états du firmware (actif, inactif, veille) en parallèle du tracé de courant, afin de relier les pics aux chemins de code concernés.

La documentation du SDK SiFli propose des exemples de caractérisation de la consommation pour certains appareils et certaines cartes, notamment autour des écrans AMOLED et JDI, du GPIO, du BLE/Bluetooth classique et d'une charge CPU de type CoreMark. Consultez la documentation du SDK et de la carte cible pour vérifier leur disponibilité et leur configuration. Les exemples applicables peuvent servir de modèles de mesure et de contrôle de plausibilité, mais ne garantissent pas la consommation du produit.

## Matrice de validation de la consommation { #power-validation-matrix }

Utilisez des scénarios reproductibles pour comparer les résultats d'une version du firmware à l'autre. Mesurez au minimum :

<div align="center"><em>Tableau : Matrice de validation de la consommation</em></div>

<div align="center" markdown>

| Scénario de test | Fonctions à activer | Critère de réussite |
|:-----------|:---------------|:---------------|
| Démarrage jusqu'à l'inactivité | Démarrage normal, aucun appairage, écran éteint | Aucune activité périodique en dehors des minuteurs nécessaires. |
| Repos connecté | Liaison BLE avec bonding et les paramètres de connexion prévus en production | Vérifiez que le CPU ou le cœur censé dormir selon l'architecture de l'appareil atteint son état cible entre les événements ; contrôlez la répartition des tâches Bluetooth et le comportement de réveil. |
| Consultation de l'écran | Réveil de l'écran, actualisation typique, attente avant atténuation | Le rétroéclairage et les animations s'arrêtent à l'expiration du délai. |
| Audio actif | Lecture ou enregistrement en cours | Aucun manque de données dans le tampon ; le codec s'éteint à la fin de la session. |
| IA active | Entrée réelle du capteur et exécution d'une inférence | L'énergie par inférence respecte le budget. |
| Pire cas | Bluetooth, affichage et audio/IA actifs simultanément, selon le produit | Aucune déconnexion ni perturbation ; les limites thermiques et de puissance sont respectées. |

</div>

Consignez la version du firmware, la révision de la carte, la tension de la batterie ou de l'alimentation, la température, la configuration de l'antenne et du boîtier, ainsi que le script de test. Sans ces données, les mesures sont difficiles à comparer et faciles à interpréter de travers.

## Diagnostiquer une consommation excessive { #debugging-high-power-consumption }

<div align="center"><em>Tableau : Diagnostiquer une consommation excessive</em></div>

<div align="center" markdown>

| Symptôme | Cause probable à vérifier |
|:--------|:----------------------|
| L'appareil n'atteint jamais le mode Deep Sleep | Un pilote ou une tâche ne libère pas une demande PM. Recherchez les appels de libération manquants. |
| Consommation élevée malgré une connexion Bluetooth inactive | La latence de l'esclave n'est pas configurée ou l'application se réveille à chaque événement de connexion. |
| Les pics de courant coïncident avec l'activité de l'affichage | L'écran entier est redessiné au lieu d'être partiellement actualisé, ou le rétroéclairage reste à pleine luminosité. |
| La consommation augmente après une mise à jour du firmware | Un nouveau minuteur, une boucle de polling ou un périphérique toujours actif a été ajouté sans vérifier son impact énergétique. |
| Bons résultats au banc, consommation plus élevée dans le produit | Un mauvais accord RF/de l'antenne impose une puissance d'émission supérieure, ou le boîtier et la température modifient les résultats. |
| L'audio ou l'IA décharge excessivement la batterie | Le codec ou le chemin d'inférence reste actif entre les sessions. Voir la [vue d'ensemble de l'audio](../audio/overview.md#power-considerations-for-audio) et la [vue d'ensemble de l'IA](../ai/overview.md#power-aware-inference-scheduling). |

</div>

## Erreurs courantes { #common-mistakes }

- Reporter l'optimisation de la consommation à la fin du projet au lieu d'en faire une contrainte de conception dès le départ.
- Interroger périodiquement les capteurs, l'état Bluetooth ou les minuteurs au lieu d'utiliser des interruptions et des événements.
- Laisser une demande PM active après la fin du traitement qui la nécessitait.
- Redessiner tout l'écran pour de petites modifications de l'interface.
- Compenser un routage RF médiocre en augmentant la puissance d'émission dans le firmware.
- Mesurer uniquement le courant instantané au lieu de l'énergie consommée lors d'un scénario d'utilisation réaliste.
- Valider la consommation au banc, mais pas dans le boîtier final équipé de l'antenne et de la batterie réelles.

## Liste de contrôle de mise en service { #bring-up-checklist }

- [ ] Définir l'autonomie visée, le profil d'utilisation et les sources de réveil nécessaires.
- [ ] Déterminer quels sous-systèmes doivent rester actifs en permanence et lesquels peuvent fonctionner à la demande d'événements.
- [ ] Vérifier que chaque pilote et chaque tâche libère rapidement sa demande PM après utilisation.
- [ ] Adapter les paramètres de publicité et de connexion Bluetooth à l'utilisation réelle du produit.
- [ ] Vérifier que l'affichage utilise le rafraîchissement partiel lorsque c'est possible et que le rétroéclairage suit le comportement prévu.
- [ ] Examiner les minuteurs périodiques et supprimer ou regrouper ceux qui sont inutiles.
- [ ] Mettre en place les mesures de courant et valider séparément les états actif, inactif et veille.
- [ ] Tester la charge combinée maximale (Bluetooth, affichage et, selon le cas, audio et IA) et vérifier qu'elle respecte le budget énergétique.
- [ ] Revalider la consommation après chaque évolution importante du firmware, et pas seulement à la fin du projet.

## Points clés à retenir { #key-takeaways }

- La consommation dépend du système dans son ensemble : Bluetooth, affichage, audio, IA et mémoire déterminent ensemble la profondeur et la fréquence des périodes de veille.
- La politique PM configurée choisit parmi les états basse consommation admissibles ; une demande non libérée qui empêche les modes plus profonds peut maintenir le système dans un état moins profond que prévu.
- Les architectures fondées sur les événements et les interruptions consomment généralement moins que les interrogations périodiques.
- Sur un produit connecté, les paramètres de connexion Bluetooth et la stratégie de rafraîchissement de l'écran sont souvent deux leviers majeurs d'économie.
- Mesurez l'énergie consommée avec des charges combinées représentatives, sur le matériel réel et dans le boîtier final. Les mesures au banc et celles de sous-systèmes isolés peuvent sous-estimer la consommation du produit complet.
