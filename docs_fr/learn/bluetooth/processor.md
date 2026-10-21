---
icon: lucide/radio-tower
description: "Comment le processeur Bluetooth dédié du SF32 décharge le CPU applicatif de la temporisation radio et du contrôle de liaison pour des produits connectés basse consommation."
tags:
  - Bluetooth
---
# Processeur Bluetooth { #bluetooth-processor }

## Introduction { #introduction }

Le **processeur Bluetooth** est le sous-système dédié au contrôle sans fil des appareils SF32LB. Il prend en charge les fonctions Bluetooth soumises à des contraintes strictes de temporisation, notamment la planification radio, le contrôle de liaison, le maintien des connexions tout en limitant la consommation et la coordination avec le processeur applicatif principal.

Cette architecture est utile aux produits connectés alimentés par batterie. Les appareils SF32 s'appuient sur une architecture multicœur hétérogène pour éviter de réveiller le CPU applicatif principal à chaque événement sans fil : le processeur applicatif gère la logique produit et les fonctions destinées à l'utilisateur, tandis qu'un processeur Bluetooth basse consommation ou toujours actif maintient la liaison sans fil.

La possibilité d'exécuter du code applicatif sur ce processeur basse consommation, et son étendue, varient selon la famille. Consultez le comparatif ci-dessous et vérifiez la répartition des tâches prise en charge par le SDK de la référence choisie.

Lisez cette page pour comprendre où s'exécutent la temporisation Bluetooth et le firmware du contrôleur, si le processeur basse consommation de la famille choisie est programmable par l'utilisateur, et comment laisser le CPU applicatif en veille tout en maintenant la connexion. Pour concevoir les services et intégrer Bluetooth au produit, consultez la [Vue d'ensemble Bluetooth](overview.md).

## Pourquoi un processeur Bluetooth dédié est important { #why-a-dedicated-bluetooth-processor-matters }

Le Bluetooth n'est pas simplement un protocole logiciel exécuté de temps à autre en arrière-plan. Un appareil connecté doit respecter des contraintes strictes de temporisation radio pour les annonces, le scan, les événements de connexion, les échanges de paquets, le transport audio, le chiffrement et la coexistence avec les autres activités du système.

En isolant ces fonctions sans fil sensibles aux contraintes de temporisation de la charge principale de l'application, un sous-système Bluetooth dédié apporte plusieurs avantages :

- Consommation électrique moyenne plus faible en veille connectée.
- Une temporisation radio plus fiable lorsque l'interface utilisateur, les graphismes, l'audio ou l'IA sollicitent le système.
- Traitement des événements radio côté contrôleur sans réveiller le CPU applicatif à chaque événement.
- Séparation plus nette entre le firmware applicatif et le firmware de contrôle de protocole.
- Meilleure prise en charge des produits devant rester connectés pendant que le CPU principal dort.

Pour les produits portés sur soi et les appareils portables, cette séparation est particulièrement précieuse. L'appareil peut rester connecté dans un état basse consommation la majeure partie du temps et ne se réveiller que pour une interaction utilisateur, un événement capteur, une mise à jour de l'écran, une activité audio ou une synchronisation avec le téléphone.

Ce sont des possibilités offertes par l'architecture, pas des valeurs garanties de consommation ou de réveil. L'emplacement de la pile hôte, les interruptions, le démarrage de l'horloge, la politique de veille et le trafic applicatif déterminent le résultat mesuré. Mesurez le courant et le temps de réponse avec le firmware et la charge prévus.

## Position dans le système SF32 { #position-in-the-sf32-system }

Une architecture sans fil simplifiée de SF32 se présente ainsi :

<div align="center"><em>Figure : Architecture sans fil simplifiée de SF32</em></div>

```text
Processeur applicatif
  - firmware produit
  - interface utilisateur et graphisme
  - logique applicative audio
  - services utilisateur
        │
        ▼
Hôte Bluetooth / services système
        │
        ▼
Processeur Bluetooth / firmware du contrôleur
  - temporisation de la couche liaison
  - planification radio
  - événements de connexion basse consommation
  - travail de protocole côté contrôleur
        │
        ▼
Radio Bluetooth et étage RF
```

La répartition exacte entre le firmware hôte, le contrôleur et l'application dépend du SDK, de la configuration de la pile et des exigences du produit. Le processeur applicatif principal ne devrait toutefois pas être considéré comme le seul processeur impliqué dans le fonctionnement Bluetooth. Le sous-système Bluetooth dispose de son propre contexte d'exécution et vise à assurer un comportement sans fil déterministe tout en limitant la consommation.

## Différences entre familles d'appareils { #device-family-differences }

La famille SF32LB propose différentes configurations de processeur basse consommation selon la classe d'appareil. Vérifiez toujours la fiche technique et la documentation SDK de la référence choisie.

<div align="center"><em>Tableau : Différences entre familles d'appareils</em></div>

<div align="center" markdown>

| Famille d'appareils | Capacité Bluetooth | Rôle du processeur basse consommation | Positionnement typique |
|:--------------|:---------------------|:-------------------------|:--------------------|
| **SF32LB52x** | Bluetooth bimode, Bluetooth classique + BLE | Le LCPU exécute la pile Bluetooth ; il n'est pas ouvert au code applicatif | Modules Bluetooth à coût maîtrisé, accessoires audio, objets connectés d'entrée de gamme et interfaces HMI compactes. |
| **SF32LB55x** | BLE | Le LCPU peut exécuter les tâches applicatives prises en charge par le SDK | Objets connectés BLE et produits basse consommation riches en capteurs. |
| **SF32LB56x** | Bluetooth bimode, Bluetooth classique + BLE | Le LCPU peut exécuter les tâches applicatives prises en charge par le SDK | Produits à affichage plus riche, HMI connectées et appareils portables. |
| **SF32LB57x** | Bluetooth bimode, Bluetooth classique + BLE | Le LCPU gère Bluetooth et les tâches sensibles à la consommation ; vérifiez celles prises en charge par le SDK | Produits répartissant graphisme et audio local entre HCPU et ACPU. |
| **SF32LB58x** | Bluetooth bimode, Bluetooth classique + BLE | Le LCPU peut exécuter les tâches applicatives prises en charge par le SDK | Produits haut de gamme avec graphisme, audio, IA et besoins de connectivité complexes. |

</div>

Le [guide HAL du SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/index.html) de SiFli indique que le LCPU exécute la pile de protocoles Bluetooth et n'est pas accessible aux applications. Les guides HAL des [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/index.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/index.html) et [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/hal/index.html) décrivent l'exécution sur le LCPU de fonctions sensibles à la consommation, comme BLE et le traitement des capteurs. Pour le **SF32LB57x**, le [guide ACPU du SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) décrit une architecture HCPU/ACPU/LCPU et attribue au LCPU des tâches telles que BLE et le traitement des capteurs, sans préciser si d'autres tâches utilisateur sont possibles ni dans quelle mesure. Ne généralisez pas la programmabilité du LCPU d'une famille à l'autre. Pour la référence choisie, vérifiez la configuration des cœurs dans la fiche technique, puis confirmez que la version du SDK et la configuration de la carte permettent d'exécuter la tâche applicative visée sur le LCPU. Si cette combinaison n'est pas documentée, indiquez que l'affectation est non vérifiée ; vérifiez également la mémoire disponible et les limites d'ordonnancement avant de la retenir.

Ce même guide ACPU distingue aussi les rôles des cœurs applicatifs : le SF32LB57x utilise l'ACPU pour l'audio et le graphisme, tandis que le SF32LB58x le destine au traitement DSP audio. Ces fonctions sont distinctes de celles du contrôleur Bluetooth ; vérifiez la répartition des tâches disponible pour la carte et le SDK choisis.

Les capacités Bluetooth du tableau résument la documentation à l'échelle de chaque famille ; elles ne garantissent pas la disponibilité de tous les profils sur chaque référence ou compilation du SDK. Les fiches techniques SiFli des [SF32LB52x](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/DS0001-SF32LB55x-Datasheet%20V1p6.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) et [SF32LB58x](https://downloads.sifli.com/silicon/DS0058-SF32LB58x-Datasheet%20V1p6.pdf) précisent les capacités BLE ou bimodes indiquées. Le [guide de test de signalisation Bluetooth du SDK](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/bt_signaling_test_guide.html) couvre les tests BR/EDR et BLE et inclut le SF32LB57x. Vérifiez la prise en charge des profils, fonctions et configurations pour la référence et la version du SDK retenues.

### Programmabilité de l'application et firmware du contrôleur { #controller-firmware-programmability }

La possibilité d'exécuter des tâches applicatives sur le LCPU ne donne pas accès au code source du contrôleur Bluetooth et ne permet pas nécessairement de remplacer la pile radio. Les mises à jour et correctifs pris en charge, la mémoire disponible et les limites d'ordonnancement dépendent de l'appareil et du SDK.

- **Développer des applications basse consommation.** Déplacez l'acquisition de capteurs, les traitements légers et la gestion système vers le LCPU lorsque la configuration le permet. Prévoyez la mémoire de la pile, le temps d'exécution et les échanges avec le HCPU.
- **Maintenir et personnaliser le contrôleur.** Utilisez les mises à jour et mécanismes de correctif fournis par le fabricant pour la puce et le SDK choisis. Un cœur applicatif programmable ne garantit ni l'accès au code source propriétaire du contrôleur ni la disponibilité d'une pile radio de remplacement. Confirmez ces possibilités séparément avec SiFli.

Une configuration réservée au contrôleur peut aussi recevoir des mises à jour du fabricant ; son image n'est pas forcément immuable. Validez les changements pour la qualification Bluetooth, l'interopérabilité, la compatibilité hôte-contrôleur et la récupération après un échec OTA. Distinguez le retour à une version fonctionnelle pour récupérer le produit de la politique de sécurité qui empêche l'installation d'anciennes versions vulnérables.

## BLE et Bluetooth bimode { #ble-and-dual-mode-bluetooth }

Les appareils SF32 peuvent prendre en charge soit le **Bluetooth Low Energy (BLE)** uniquement, soit le **Bluetooth bimode** combinant le **Bluetooth classique** et le **BLE**, selon le modèle.

### Bluetooth Low Energy { #bluetooth-low-energy }

Le BLE est optimisé pour l'échange de données basse consommation. Il est couramment utilisé pour :

- Bracelets fitness et montres connectées.
- Capteurs de santé et objets portables.
- Notifications de téléphone et applications compagnons.
- Synchronisation de capteurs.
- Balises et appareils proposant des services de localisation.
- Canaux de contrôle et de configuration basse consommation.

Les connexions BLE sont souvent intermittentes et pilotées par événements ; elles conviennent donc bien à un processeur Bluetooth basse consommation.

### Bluetooth classique et conceptions bimodes { #bluetooth-classic-and-dual-mode-designs }

Le Bluetooth bimode ajoute la prise en charge du Bluetooth classique en complément du BLE. Il est utile pour des produits tels que :

- Accessoires audio Bluetooth.
- Adaptateurs et modules sans fil.
- Appareils nécessitant une compatibilité avec les profils Bluetooth classiques existants.
- Produits combinant le contrôle par BLE et le transport audio ou de données par Bluetooth classique.

Le fonctionnement bimode peut être plus exigeant que le BLE seul, car l'audio et les profils hérités peuvent imposer des exigences plus strictes en matière de débit, de latence ou de coexistence. Un sous-système Bluetooth dédié aide à isoler ces contraintes des pics de charge du CPU principal.

## Audio Bluetooth et LE Audio { #bluetooth-audio-and-le-audio }

Les produits audio Bluetooth imposent des contraintes supplémentaires à l'architecture du système. Ils impliquent parfois simultanément la temporisation radio, la mise en mémoire tampon, le traitement du codec, la synchronisation des horloges et les mises à jour de l'interface utilisateur.

Un système audio Bluetooth SF32 bien conçu sépare généralement les responsabilités :

- Le processeur Bluetooth gère la temporisation radio et de liaison côté contrôleur.
- Le processeur applicatif gère la logique du produit, l'interface utilisateur et les fonctions audio de plus haut niveau.
- Les interfaces audio telles que I2S, PDM, ADC ou DAC acheminent les échantillons vers le reste du système et en provenance de celui-ci.
- Le DMA et la mise en tampon réduisent la surcharge CPU pendant la diffusion audio continue.

Pour LE Audio et les autres usages modernes de l'audio Bluetooth, le résultat dépend aussi de l'architecture du firmware, de la prise en charge par la pile, du codec choisi, de la bande passante mémoire et de la stratégie de gestion de l'énergie. Les fiches techniques SiFli des SF32LB56x et SF32LB58x indiquent explicitement la prise en charge de BLE Audio ; la prise en charge du BLE ou du mode bimode ne garantit pas celle de LE Audio. La disponibilité des profils, codecs et chemins logiciels dans le SDK dépend toujours de la référence et de sa version. Vérifiez ces points avant de retenir LE Audio. Le processeur Bluetooth assure le cadencement de base, mais le comportement final dépend du SDK et de la conception de l'application.

## Fonctionnement à basse consommation { #low-power-operation }

Le sous-système Bluetooth est particulièrement utile lorsque le processeur applicatif principal peut rester en veille pendant que la liaison sans fil demeure active. En veille connectée, le système peut n'avoir besoin de réveiller le processeur applicatif que pour des événements significatifs tels que :

- Une notification ou une commande reçue.
- Un changement d'état de connexion.
- Une tâche de synchronisation planifiée.
- Le démarrage ou l'arrêt d'un flux audio.
- Un événement de capteur ou une action de l'utilisateur.
- Une mise à jour de firmware ou une opération de provisionnement.

Ce modèle maintient autant que possible le CPU principal en dehors de l'état actif. Le processeur Bluetooth et la radio se réveillent aux événements de connexion prévus, exécutent les opérations de protocole nécessaires, puis permettent au système de repasser dans un état moins énergivore.

Le profil de consommation réel dépend de l'intervalle de connexion, de la puissance d'émission, du comportement des annonces, du mode de veille, de la configuration du quartz, de la disposition RF, de la politique du firmware et de la fréquence de réveil du processeur applicatif.

## Rôles de l'hôte, du contrôleur et de l'application { #host-controller-and-application-boundaries }

Le logiciel Bluetooth est souvent décrit en deux couches principales :

<div align="center"><em>Tableau : Répartition entre l'hôte, le contrôleur et l'application</em></div>

<div align="center" markdown>

| Couche | Responsabilité principale |
|:------|:--------------------|
| **Hôte** | Profils, services, politique d'appairage, API destinées à l'application et fonctions de protocole de niveau supérieur. |
| **Contrôleur** | Couche liaison, planification radio, temporisation des paquets, prise en charge du chiffrement et procédures Bluetooth de bas niveau. |

</div>

Dans un système SF32, les responsabilités du contrôleur sont étroitement liées au processeur Bluetooth et au sous-système radio. Les fonctions de l'hôte peuvent s'exécuter sur le processeur applicatif, dans le firmware système ou au moyen de composants du SDK, selon l'architecture de la pile.

Pour les développeurs d'applications, l'essentiel est que le fonctionnement Bluetooth implique plusieurs processeurs. La mémoire partagée, les échanges interprocesseurs, les événements et les API du SDK font partie de l'architecture du produit. Traitez Bluetooth comme un sous-système, et non comme une simple bibliothèque liée à l'application principale.

## Interaction avec le processeur applicatif { #interaction-with-the-application-processor }

Le processeur applicatif contrôle généralement le comportement au niveau produit :

- Démarrer et arrêter les annonces.
- Créer ou accepter des connexions.
- Gérer les services et caractéristiques GATT.
- Gérer l'appairage, l'association persistante des clés (bonding) et la politique de sécurité.
- Échanger des données applicatives avec un téléphone ou une passerelle.
- Mettre à jour l'interface utilisateur lorsque l'état Bluetooth change.
- Coordonner les flux audio, les capteurs et les modes d'alimentation.

Le processeur Bluetooth prend en charge les fonctions de bas niveau nécessaires au maintien de la connexion. La communication entre les deux côtés est généralement masquée derrière les API du SDK, les événements, les files d'attente ou les mécanismes de communication interprocesseur.

Une bonne conception applicative évite de réveiller inutilement le CPU principal. Regroupez les événements lorsque c'est possible, choisissez des paramètres de connexion adaptés et évitez l'interrogation périodique à haute fréquence lorsqu'un mécanisme de rappel événementiel est disponible.

## Considérations RF et d'horloge { #rf-and-clock-considerations }

Le processeur Bluetooth ne suffit pas à garantir de bonnes performances radio : la conception matérielle compte aussi. La disposition RF, l'adaptation de l'antenne, la précision de l'horloge, l'intégrité de l'alimentation et l'étalonnage en production influent sur la portée, la sensibilité, la puissance d'émission et la stabilité de la connexion.

Les considérations matérielles importantes incluent :

- Utiliser le réseau d'adaptation RF et la disposition d'antenne recommandés.
- Garder la piste RF courte, à impédance contrôlée et bien isolée des signaux bruyants.
- Suivre les exigences de quartz du guide de conception matérielle.
- Fournir des rails d'alimentation propres et un découplage local aux circuits RF et d'horloge.
- Préserver les points de test nécessaires à l'étalonnage RF et au flashage du firmware en production.
- Éviter de faire passer des pistes rapides d'écran, de stockage ou d'alimentation à découpage près des chemins RF sensibles.

Les équipes logicielles et matérielles doivent considérer les performances Bluetooth comme une propriété du système. Les paramètres du firmware ne peuvent pas compenser entièrement un mauvais routage RF ou des horloges instables.

## Coexistence avec d'autres charges de travail { #coexistence-with-other-workloads }

Les appareils SF32 exécutent souvent Bluetooth en parallèle des graphismes, de l'audio, des capteurs, du stockage et parfois du Wi-Fi externe. Ces sous-systèmes partagent l'alimentation, les horloges, la bande passante mémoire, les broches et les ressources CPU.

Les points à surveiller lorsque ces traitements coexistent sont :

- Le rafraîchissement de l'écran ou le trafic PSRAM qui réduit la bande passante mémoire disponible.
- Le DMA audio et les tampons Bluetooth audio qui exigent une temporisation stable.
- Des interruptions de capteur qui réveillent trop souvent le processeur applicatif.
- Le Wi-Fi externe ou d'autres sources RF qui dégradent les performances Bluetooth.
- De longues sections critiques ou des interruptions désactivées qui retardent le traitement Bluetooth côté hôte.

Le processeur Bluetooth réduit le risque de perturbation temporelle, mais ne supprime pas tous les goulots d'étranglement liés aux ressources partagées. Les produits combinant audio, interface utilisateur riche ou connectivité sans fil externe doivent être testés dans des conditions défavorables réalistes.

## Cas d'usage typiques { #typical-use-cases }

Le processeur Bluetooth joue un rôle central dans de nombreuses catégories de produits SF32 :

- Modules Bluetooth et adaptateurs série.
- Montres connectées d'entrée de gamme et bracelets fitness.
- Capteurs de santé BLE et appareils portables.
- Accessoires audio Bluetooth.
- Badges intelligents et étiquettes électroniques de rayonnage.
- Tableaux de bord et appareils HMI connectés au téléphone.
- Contrôles domotiques et produits avec application compagnon.
- Appareils de synchronisation de capteurs et de journalisation de données.

La variante SF32 la mieux adaptée dépend des besoins du produit : BLE seul ou Bluetooth bimode, fonctions audio, affichage, capacité mémoire et traitements basse consommation programmables par l'utilisateur.

## Recommandations pratiques de conception { #practical-design-guidance }

Lors de la conception d'un firmware Bluetooth pour SF32, commencez par définir le comportement de connectivité du produit :

- Le produit a-t-il besoin de BLE uniquement ou de Bluetooth bimode ?
- L'audio Bluetooth est-il requis ?
- Quel intervalle de connexion, quelle latence et quel débit sont nécessaires ?
- À quelle fréquence le processeur applicatif principal doit-il se réveiller ?
- Quels événements doivent réveiller le système d'un mode Deep Sleep ou Standby ?
- Des tâches liées aux capteurs ou à l'interface utilisateur entrent-elles en concurrence avec la temporisation Bluetooth ?
- Quelles cibles de portée RF et de puissance d'émission sont requises ?
- Comment seront gérés le téléchargement du firmware en production et l'étalonnage RF ?

Une conception robuste associe généralement le processeur Bluetooth à des paramètres de connexion bien choisis, à un code applicatif piloté par événements, à une gestion planifiée des états basse consommation et à une conception RF soignée.

## Points clés à retenir { #key-takeaways }

- Les appareils SF32LB s'appuient sur un processeur Bluetooth ou basse consommation dédié pour assurer un fonctionnement sans fil fiable et économe en énergie.
- Le SF32LB52x réserve le LCPU au contrôleur Bluetooth. Les SF32LB55x, SF32LB56x et SF32LB58x prennent en charge sur le LCPU des tâches applicatives définies par le SDK, dans les configurations documentées. Le SF32LB57x utilise le LCPU pour le Bluetooth et les tâches sensibles à la consommation, mais vérifiez la prise en charge de chaque tâche utilisateur prévue sur le SDK et la carte cibles.
- Un LCPU programmable permet des tâches applicatives dans les limites du SDK ; l'accès au code du contrôleur et sa personnalisation doivent être confirmés séparément. Utilisez les mises à jour du fabricant et validez les changements.
- Le BLE est optimisé pour les produits connectés basse consommation ; le Bluetooth bimode ajoute des cas d'usage du Bluetooth classique, tels que l'audio et la prise en charge de profils hérités.
- Le processeur Bluetooth permet au CPU applicatif principal de rester en veille pendant que les connexions, les annonces et les événements radio planifiés se poursuivent.
- De bonnes performances Bluetooth dépendent à la fois de l'architecture du firmware et de la conception matérielle, notamment du routage RF, des horloges, de l'alimentation, de l'adaptation de l'antenne et de l'étalonnage.
- Traitez Bluetooth comme un sous-système comportant des frontières hôte/contrôleur, des échanges interprocesseurs, des choix de gestion de l'énergie et des contraintes liées aux ressources partagées.
