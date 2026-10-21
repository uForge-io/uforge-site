---
icon: lucide/workflow
description: "PTM (Parallel Task Machine) sur SF32LB57x : moteur programmable qui exécute séquences d'E/S précises et protocoles personnalisés, en déchargeant le Cortex-M33."
tags:
    - Architecture
    - PTM
    - SF32LB57
---

# PTM (Parallel Task Machine) { #ptm-parallel-task-machine }

## Introduction { #introduction }

**PTM**, abréviation de **Parallel Task Machine**, est un moteur programmable de tâches périphériques documenté pour SF32LB57x. Il est destiné aux tâches trop sensibles à la temporisation pour des boucles de firmware classiques, trop spécifiques pour des périphériques à fonction fixe et trop limitées pour justifier de mobiliser en permanence le Cortex-M33 principal.

Concrètement, le firmware peut confier à PTM des opérations périphériques au comportement déterministe : séquences d'E/S à temporisation précise, protocoles personnalisés, acquisition de données de capteurs, génération de formes d'onde de type PWM, réponse rapide à des déclencheurs ou opérations simples sur des registres et en mémoire déclenchées par des événements externes.

Le principe est simple : le CPU configure et supervise la tâche, tandis que PTM exécute les opérations répétitives et critiques pour la temporisation. Il est relié aux E/S, aux FIFO/DMA, aux événements et au bus AHB. PTM ne se limite donc pas à produire des formes d'onde GPIO ; c'est un moteur programmable qui automatise les tâches des périphériques.

Consultez cette page lorsqu'aucun périphérique standard ne peut répondre aux exigences de temporisation ou de protocole et qu'une boucle de scrutation exécutée par le CPU principal entraînerait davantage de latence, de consommation énergétique ou de complexité logicielle. Elle s'adresse aux ingénieurs qui conçoivent la répartition entre matériel et firmware, et non à ceux qui recherchent des conseils d'utilisation courante des GPIO ou des minuteries.

## Pourquoi le PTM est nécessaire { #why-ptm-exists }

Dans un microcontrôleur, les besoins de temporisation des périphériques ne correspondent pas toujours aux capacités de traitement de l'application. Même si le CPU principal est assez puissant pour le produit, certaines opérations de bas niveau peuvent compliquer inutilement le firmware :

- séquences d'E/S bit à bit ou soumises à des contraintes de temporisation au cycle d'horloge près ;
- protocoles série personnalisés difficiles à mettre en œuvre avec UART, SPI, I2C ou CAN ;
- scrutation ou échantillonnage de capteurs exigeant une réponse rapide à un déclencheur ;
- commandes de type PWM qui dépassent les modes de sortie standard des minuteries ;
- transferts de données limités ou opérations sur des registres déclenchées par des événements périphériques ;
- coordination de plusieurs périphériques sans réveiller le chemin d'exécution principal à chaque étape.

Gérer ces tâches par interruption peut accroître la charge d'interruption et rendre la latence plus difficile à maîtriser. Les boucles d'attente active consomment du temps CPU et de l'énergie, tandis que l'ajout d'une logique externe complique la carte. PTM constitue une solution intermédiaire : il exécute sous le contrôle du firmware des tâches périphériques compactes et déterministes.

## PTM dans l'architecture SF32LB57x { #ptm-in-the-sf32lb57x-architecture }

PTM est un moteur programmable relié aux E/S, aux événements, aux FIFO/DMA et au bus AHB du SoC SF32LB57x. Cette capacité est documentée pour SF32LB57x : avant de supposer qu'un autre membre de la famille SF32 prend en charge PTM, vérifiez la documentation du composant concerné.

<div align="center"><em>Figure : déroulement d'une tâche PTM</em></div>

```text
Application / firmware
        │
        ▼
Le CPU configure la tâche PTM
        │
        ▼
PTM exécute une séquence déterministe de tâches périphériques
        │
        ├── Lecture / écriture des E/S
        ├── Transfert de données par FIFO / DMA
        ├── Accès à la mémoire ou aux registres AHB
        ├── Attente d'un événement / délai fixe
        └── Interruption CPU ou notification d'événement interne
```

L'intérêt architectural de PTM est qu'il exécute un programme d'instructions compact et personnalisé et ne se limite pas au contrôle des broches. Il peut lire et écrire les E/S, attendre des événements, utiliser les FIFO/DMA, accéder à la mémoire AHB et aux registres des périphériques, puis avertir le CPU lorsqu'une intervention du firmware de plus haut niveau est nécessaire.

Le système peut ainsi réserver les périphériques standard à leurs fonctions habituelles et confier à PTM les séquences personnalisées dont la temporisation ne peut pas être assurée par ces périphériques.

## Capacités principales { #core-capabilities }

Le [guide de conception matérielle de SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) décrit **un bloc PTM comportant 16 canaux** ; sa table de multiplexage des broches répertorie PTM1_CH0 à PTM1_CH15. Avec les définitions du SDK, les fonctions documentées comprennent :

- ressources d'exécution PTM commandées indépendamment ;
- un jeu d'instructions personnalisé compact ;
- exécution d'instructions depuis la TCM interne ou depuis le bus système ;
- lecture et écriture d'adresses sur le bus ;
- opérations sur les données ;
- branchements conditionnels et boucles ;
- lectures et écritures d'E/S ;
- attente d'un déclencheur ;
- délai fixe ;
- contrôle temporel à l'échelle du cycle d'horloge lors de l'exécution depuis la TCM PTM ;
- 16 canaux d'E/S dans le bloc PTM ;
- prise en charge d'une FIFO avec interface DMA ;
- accès bus AHB pour les opérations de mémoire et de registres périphériques ;
- génération d'interruptions CPU ;
- événements internes permettant d'enchaîner des tâches ;
- commandes du SDK de réinitialisation, démarrage, pause et exécution pas à pas pour les ressources PTM indexées.

Ensemble, ces fonctions font de PTM un moteur d'automatisation déterministe des périphériques, pas seulement un séquenceur de broches.

**Configuration des ressources :** Les [définitions de registres du SDK v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/cmsis/sf32lb57x/ptm.h) comportent des groupes de contrôle et de registres indexés de 0 à 7. Les [définitions d'instructions](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h) utilisent les mêmes index pour les ressources TCM. Les sources disponibles n'expliquent pas le lien entre les index du SDK et le nombre de cœurs de traitement physiques. Ne déduisez donc pas le nombre de cœurs à partir de ces index ; vérifiez les ressources disponibles dans la documentation du composant et l'implémentation du SDK.

## Modèle d'exécution { #execution-model }

PTM exécute des instructions dans un format spécifique. Le jeu d'instructions est volontairement compact, mais comprend les opérations nécessaires à la création de séquences de tâches périphériques :

- **Flux de contrôle** : tests de condition, sauts, boucles, attentes et délais.
- **Contrôle des E/S** : lecture et écriture des canaux d'E/S affectés.
- **Manipulation de données** : arithmétique simple et opérations sur les bits.
- **Accès au bus** : lecture ou écriture de la mémoire et des registres de périphériques via le bus AHB.
- **Synchronisation** : attente de déclencheurs, génération d'interruptions et coordination par événements internes.

Lorsqu'une tâche s'exécute depuis la TCM PTM, sa temporisation peut être contrôlée au cycle près. C'est essentiel pour les protocoles personnalisés et les séquences d'E/S : le CPU n'a pas à réagir à chaque front, intervalle de temporisation ou phase périphérique de courte durée.

Les tâches les mieux adaptées à PTM sont généralement courtes, explicites et déterministes. Si la logique devient de haut niveau, comporte de nombreux branchements ou dépend des décisions propres à l'application, elle relève probablement du CPU.

## E/S, FIFO et DMA { #io-fifo-and-dma }

Le bloc PTM de SF32LB57x comporte 16 canaux d'E/S. Une tâche PTM peut ainsi surveiller plusieurs broches, générer des séquences utilisant plusieurs signaux ou assurer la temporisation d'une interface personnalisée.

PTM prend également en charge une FIFO avec une interface DMA. Un protocole personnalisé ne se limite généralement pas à faire basculer les broches : il doit souvent transférer des données entre la mémoire et la logique d'E/S sans solliciter le CPU pour chaque octet ou chaque mot.

PTM peut notamment servir à :

- transférer un flux de données par une interface personnalisée ;
- acquérir ou générer des motifs d'E/S répétitifs ;
- synchroniser les transferts de données avec des événements périphériques ;
- mettre en mémoire tampon de petites transactions de protocole ;
- laisser le DMA alimenter la tâche en données ou récupérer ses résultats sans faire intervenir le CPU dans le chemin critique.

## Événements et interruptions { #events-interrupts-and-multicore-coordination }

PTM fonctionne en réponse à des événements. Il peut attendre un événement ou un délai fixe, et les événements internes peuvent relier des séquences de tâches. La documentation disponible n'établit ni le nombre de cœurs PTM physiques ni le lien entre les index de ressources du SDK et ces cœurs. Certains chemins d'événements peuvent également déclencher une interruption CPU. Le firmware ne se réveille ou n'intervient alors que lorsque la séquence atteint une étape significative.

L'avantage est le suivant : PTM prend en charge les contraintes de temporisation de bas niveau et fournit au firmware des points de synchronisation clairement définis. Au lieu d'interroger continuellement les périphériques ou de traiter chaque intervalle par interruption, le CPU configure la tâche, laisse PTM l'exécuter, puis traite le résultat.

## Cas d'usage typiques de PTM { #typical-ptm-use-cases }

Dans une conception fondée sur SF32LB57x, PTM est particulièrement utile lorsque le comportement demandé est trop spécifique pour les périphériques à fonction fixe et exige une temporisation trop stricte pour une boucle logicielle classique.

Les cas d'usage typiques sont notamment :

- protocoles d'interface personnalisés ;
- commande PWM personnalisée ou génération d'impulsions ;
- acquisition automatique de données de capteurs ;
- réponse rapide à des déclencheurs ;
- coordination de plusieurs modules ;
- opérations groupées en mémoire ou sur des registres ;
- petites boucles de commande déterministes pour des composants externes ;
- compensation des écarts de temporisation de protocole entre un capteur, un écran, un actionneur ou un circuit intégré compagnon et le firmware principal.

### Limites d'utilisation { #usage-boundaries }

PTM ne doit pas remplacer un périphérique standard lorsque celui-ci répond déjà au besoin. Pour les fonctions courantes, privilégiez UART, SPI, I2C, CAN, SDIO, I2S, PDM, les minuteries et le DMA. PTM devient intéressant lorsque le produit exige un comportement qui dépasse les capacités de ces blocs dédiés.

## PTM et consommation énergétique du CPU { #ptm-and-cpu-power }

PTM peut réduire le nombre de réveils du CPU pour les tâches périphériques courtes et déterministes. Le CPU configure la tâche, reste moins sollicité pendant son exécution et intervient lorsque PTM atteint une étape qui nécessite l'attention du firmware.

Cette possibilité est particulièrement utile dans les produits portables et AIoT qui doivent :

- surveiller un capteur ou un état GPIO ;
- acquérir de courtes rafales de données ;
- piloter un composant externe spécifique ;
- maintenir la temporisation lorsque le cœur applicatif n'est pas pleinement actif ;
- réduire la fréquence des interruptions pendant les tâches périphériques répétitives.

Le gain énergétique réel dépend de la configuration d'horloge, de la stratégie de réveil, de l'emplacement du code et des données en mémoire, de l'état des périphériques et de l'architecture du firmware. PTM peut néanmoins exécuter de courtes tâches périphériques sans réveiller le CPU à chaque étape.

## PTM, RP2040 PIO et Nordic PPI/DPPI { #ptm-rp2040-pio-and-nordic-ppidppi }

PTM, RP2040 PIO et Nordic PPI/DPPI peuvent réduire la participation du CPU aux opérations soumises à des contraintes de temporisation. Ils interviennent toutefois à des niveaux architecturaux différents et ne sont pas interchangeables.

- **PTM** est un moteur programmable de tâches périphériques. Il exécute des instructions et combine les E/S, les événements, les FIFO/DMA ainsi que l'accès à la mémoire et aux registres AHB.
- **PIO** est une machine à états d'E/S programmable. Elle exécute de petits programmes d'instructions destinés au contrôle temporisé des GPIO et aux protocoles série personnalisés.
- **PPI/DPPI** sont des mécanismes programmables d'interconnexion des périphériques. Ils relient les événements périphériques à des tâches déjà prises en charge par les périphériques ; ils n'exécutent pas d'instructions et ne traitent pas de données.

<div align="center"><em>Tableau : comparaison de PTM, RP2040 PIO et Nordic PPI/DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Critère | SF32LB57x PTM | RP2040 PIO | Nordic PPI/DPPI |
|:-----|:--------------|:-----------|:-----------|
| Principe | Moteur programmable de tâches périphériques pour les E/S déterministes, les protocoles personnalisés, l'acquisition de données de capteurs et les opérations déclenchées par événement. | Machines à états d'E/S programmables pour le contrôle déterministe des GPIO et les protocoles série personnalisés. | Interconnexion matérielle reliant événements et tâches périphériques, pour coordonner des périphériques sans CPU lorsque les points de connexion nécessaires existent. |
| Unité d'exécution | Ressources d'exécution PTM indexées ; vérifier leur disponibilité sur le composant choisi. | Deux blocs PIO comprenant chacun quatre machines à états, soit huit au total. | Canaux qui propagent des événements ; ils n'exécutent pas de programme. |
| Fonctionnement | PTM exécute des instructions de tâche personnalisées. | Les machines à états exécutent les instructions PIO cycle par cycle. | PPI relie les points de connexion des événements et des tâches. DPPI fait communiquer les périphériques émetteurs et abonnés par un canal partagé. |
| Temporisation | Contrôle au cycle près depuis la TCM PTM ; prise en charge de l'attente et des délais fixes. | Exécution au cycle près des machines à états, avec instructions d'attente et créneaux de délai. | Un événement déclenche une tâche périphérique existante. La temporisation dépend des périphériques reliés et de l'implémentation de l'interconnexion. |
| E/S | Le bloc PTM de SF32LB57x comporte 16 canaux d'E/S. | Les instructions s'appliquent aux broches GPIO sélectionnées au moyen de la configuration de contrôle des broches. | Ne génère pas directement de formes d'onde GPIO ; peut déclencher les tâches exposées par des périphériques tels que GPIOTE et les minuteries. |
| Instructions et logique | Jeu d'instructions personnalisé pour les E/S, les accès en lecture/écriture au bus, le traitement des données, les branchements conditionnels, l'attente et les délais. | Jeu d'instructions réduit pour les E/S sur broches, le décalage, l'attente, les sauts, les opérations push/pull sur FIFO, les IRQ et les transferts. | Pas d'exécution d'instructions, de boucles, de branchements ni de traitement de données. |
| Accès à la mémoire et aux registres | Accès à la mémoire AHB et aux registres des périphériques. | Principalement axé sur les GPIO, les FIFO et les registres à décalage ; le CPU ou le DMA fournit généralement les données et la configuration. | Aucun accès à la mémoire ni aux registres périphériques généraux ; relie uniquement les points de connexion disponibles pour les événements et les tâches. |
| FIFO/DMA | FIFO avec interface DMA. | FIFO TX/RX, couramment utilisées avec le DMA. | Pas de chemin de données dans l'interconnexion elle-même ; peut déclencher des tâches de périphériques dotés de DMA. |
| Interaction avec le CPU | Peut générer des interruptions CPU et relier des séquences de tâches par des événements internes. | Utilise des indicateurs IRQ, des FIFO et des échanges avec le CPU ou le DMA. | Le CPU configure les canaux ; à l'exécution, les périphériques peuvent déclencher automatiquement des tâches à partir d'événements. |
| Cas d'usage typiques | Protocoles d'interface personnalisés, PWM personnalisé, acquisition automatique de données de capteurs, opérations groupées en mémoire ou sur des registres, coordination de plusieurs modules. | Interfaces personnalisées de type UART/SPI/I2S, formes d'onde de type WS2812, protocoles série au niveau des broches et temporisation GPIO précise. | Événements RTC ou de minuterie déclenchant une conversion ADC, un comptage ou d'autres tâches standard exposées par les périphériques. |

</div>

### Fonctionnement interne { #under-the-hood-model }

Les chemins d'exécution de ces mécanismes sont les suivants :

<div align="center"><em>Figure : chemins d'exécution de PPI, DPPI, PIO et PTM</em></div>

```text
PPI : point de connexion d'événement ──> canal PPI ──> point de connexion de tâche

DPPI : périphérique émetteur ──> canal DPPI ──> tâche du périphérique abonné

PIO : CPU/DMA ──> instructions de la machine à états PIO ──> temporisation GPIO et FIFO

PTM : configuration CPU ──> instructions de tâche PTM ──> E/S + événements + FIFO/DMA + accès AHB
```

PPI et DPPI relient les événements sans exécuter de programme, mais se limitent à relier des événements et des tâches existants ; ils ne permettent pas de définir une nouvelle logique de protocole. PIO permet de programmer le comportement des broches au moyen de machines à états, principalement pour les GPIO et les FIFO. PTM couvre des tâches plus larges : il peut réunir dans une même séquence exécutable la temporisation des E/S, l'attente d'événements, les transferts de données, l'accès aux registres et la coordination de petites tâches.

PIO peut suspendre son exécution en attendant une condition ou lorsqu'une FIFO est pleine ou vide ; la temporisation des instructions ne garantit pas celle des données fournies par le DMA système. Le routage des événements présente lui aussi une latence qui dépend de l'implémentation. Ces différences architecturales ne permettent pas de classer systématiquement les solutions par consommation. Le transfert DPPI entre domaines exige des ponts implémentés sur le composant choisi ; tous les systèmes DPPI ne les possèdent pas.

### Nordic PPI et DPPI { #nordic-ppi-and-dppi }

PPI est le modèle historique de Nordic, présent notamment dans la famille nRF52. Le logiciel associe à chaque canal un point de connexion d'événement et un point de connexion de tâche. Un canal peut également disposer d'un point de connexion de tâche supplémentaire (fork), mais la relation entre événements et tâches reste explicitement configurée.

DPPI est le modèle plus récent de Nordic. Un périphérique publie un événement sur un canal, auquel une ou plusieurs tâches de périphériques peuvent s'abonner. La source de l'événement est ainsi découplée de ses abonnés, ce qui convient aux architectures Nordic récentes comportant plusieurs domaines. Si un signal doit traverser des domaines d'alimentation, un pont PPI peut acheminer les canaux DPPI pris en charge d'un domaine à l'autre.

<div align="center"><em>Tableau : comparaison de Nordic PPI et DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Critère | PPI | DPPI |
| :--- | :--- | :--- |
| Configuration | Le logiciel associe à un canal un point de connexion d'événement et un ou plusieurs points de connexion de tâche. | Les périphériques émetteurs d'événements et les tâches abonnées choisissent un canal commun. |
| Mode de connexion | Liaison explicite entre un événement et une tâche. | Publication et abonnement. |
| Un événement, plusieurs tâches | Utilisation de plusieurs canaux ou du point de connexion de tâche fork d'un canal. | Plusieurs tâches peuvent s'abonner au même canal publié. |
| Contexte matériel typique | Anciens composants Nordic compatibles PPI, dont de nombreux nRF52. | Composants Nordic plus récents qui intègrent le système d'événements distribué. |
| Capacités d'exécution | N'exécute pas d'instructions et ne traite pas de données. | N'exécute pas d'instructions et ne traite pas de données. |

</div>

### Cas d'usage d'un concentrateur de capteurs dans une montre connectée { #smartwatch-sensor-hub-use-cases }

Pour un concentrateur de capteurs de montre connectée classique, commencez par les périphériques I2C/SPI standard, le DMA, les minuteries et les mécanismes de réveil à basse consommation. Déterminez ensuite la nature du besoin :

- **Échantillonnage courant :** un RTC ou une minuterie déclenche une tâche prise en charge par un périphérique standard, puis le CPU est averti à la fin de l'opération ou lorsqu'un seuil est atteint. Sur les plateformes Nordic, ce schéma « événement vers tâche existante » convient à PPI sur les anciens composants et à DPPI sur les modèles plus récents. Aucun programme PIO ou PTM n'est nécessaire.
- **Protocole électrique personnalisé :** si un capteur exige une forme d'onde, une largeur de mot (nombre de bits) ou une temporisation que l'I2C/SPI standard ne permet pas, PIO convient mieux pour implémenter le protocole directement sur les broches.
- **Séquence personnalisée de traitement de capteur :** si une transaction doit attendre plusieurs déclencheurs, contrôler plusieurs signaux d'E/S, transférer quelques données, accéder à des registres et coordonner plusieurs étapes, PTM est mieux adapté sur SF32LB57x. Il peut avertir le CPU à des étapes définies.

PPI/DPPI, PIO et PTM ne sont donc pas des solutions concurrentes à classer de la meilleure à la moins bonne. Ils répondent à des besoins différents : relier des événements, mettre en œuvre des protocoles au niveau des broches ou automatiser des tâches périphériques. Sur SF32LB57x, commencez par les périphériques standard et ne choisissez PTM que si les exigences de temporisation ou de séquencement dépassent leurs capacités.

Références : [définitions d'instructions PTM de SiFli](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h), [fiche technique du RP2040](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), [spécification PPI de Nordic](https://docs.nordicsemi.com/r/bundle/ps_nrf52811/page/ppi.html) et [système d'événements DPPI de Nordic](https://docs.nordicsemi.com/r/bundle/ps_nrf54lv10a/page/ppi.html).

## Recommandations de conception { #design-guidance }

**Limites de temporisation et de consommation :** Le contrôle des instructions au cycle près ne garantit pas une durée fixe pour toute la transaction. Les accès AHB, l'attente de fin du DMA et les événements externes peuvent introduire des délais variables. Maintenez actifs les horloges et domaines d'alimentation nécessaires à PTM, à la mémoire et aux périphériques. L'inactivité du CPU ne signifie pas que PTM fonctionne dans tous les modes de veille du SoC. Mesurez l'énergie totale, y compris les horloges maintenues actives et le coût du réveil, puis comparez-la à une implémentation utilisant les périphériques standard.

**Affectation des ressources :** Dans le SDK v2.5.1, le [pilote d'écran DPI sans mémoire de trame (RAMless)](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_lcdc_aux.c) pour SF32LB57x utilise la ressource identifiée par le SDK comme « PTM core 0 », sa TCM, l'événement 0, l'interruption associée et un canal DMA alloué. Cet identifiant du SDK ne permet pas de déduire le nombre de cœurs PTM physiques. C'est un exemple concret d'accès au bus et de coordination du DMA, pas une affectation librement réutilisable. N'écrasez pas les ressources d'un pilote actif. Définissez la propriété des tampons entre CPU et DMA et effectuez les opérations de maintenance du cache nécessaires.

Vérifiez d'abord que le composant visé est un SF32LB57x et que la documentation couvre les fonctions PTM nécessaires à votre conception. Envisagez PTM si plusieurs des critères suivants s'appliquent :

- la tâche se répète assez souvent pour que son traitement par le CPU consomme inutilement de l'énergie ou réduise la marge de temporisation ;
- elle exige une temporisation déterministe autour des fronts d'E/S ou des réponses aux déclencheurs ;
- elle utilise une interface personnalisée que les périphériques standard ne prennent pas correctement en charge ;
- elle peut tirer parti de transferts de données assistés par FIFO/DMA ;
- elle peut être décrite par une machine à états compacte ou une séquence de tâches ;
- le firmware ne doit être averti qu'à des étapes significatives.

Évitez PTM lorsque :

- un périphérique standard met déjà en œuvre le protocole de façon adaptée ;
- la tâche relève d'une logique applicative de haut niveau comportant de nombreux branchements ;
- les contraintes de temporisation sont assez souples pour que des interruptions classiques ou des tâches RTOS soient plus simples ;
- l'équipe logicielle ne dispose pas encore de la prise en charge SDK, des exemples ou des outils nécessaires au programme PTM.

Une bonne conception commence par séparer les opérations déterministes des décisions propres à l'application. Confiez à PTM la temporisation, les transferts de données courts et le traitement des événements. Laissez au firmware les décisions produit, la stratégie de gestion des erreurs, les grands tampons et la gestion des états complexes.

## Points clés à retenir { #key-takeaways }

- Le guide matériel de SF32LB57x décrit un bloc PTM avec 16 canaux ; pour les autres familles, consultez la documentation de chaque composant.
- Vérifiez les ressources PTM implémentées pour le composant et le SDK choisis.
- Il peut exécuter des instructions personnalisées compactes depuis la TCM PTM ou le bus système.
- Il prend en charge le contrôle des E/S, l'accès au bus et aux registres, le traitement des données, l'attente, les délais, les FIFO/DMA, les interruptions et les événements internes.
- Il convient aux opérations périphériques personnalisées et déterministes qui se situent entre le matériel à fonction fixe et le firmware classique.
- Il présente des similitudes conceptuelles avec RP2040 PIO, mais couvre une intégration système et un éventail de tâches plus larges.
- Pour les conceptions SF32LB57x, PTM peut constituer un élément distinctif de l'architecture si la documentation du composant choisi confirme la disponibilité des ressources PTM requises. Il est particulièrement utile pour intégrer des capteurs, des écrans et des actionneurs personnalisés, adapter des protocoles et automatiser des tâches périphériques en sollicitant peu le CPU.
