---
icon: lucide/book-a
description: "Glossaire des termes et sigles liés aux systèmes embarqués, aux communications sans fil, aux graphismes et à SiFli dans la documentation SF32 de μForge.io."
tags:
    - À propos
---
# Glossaire { #glossary }

Ce glossaire rassemble les sigles et termes employés sur μForge.io : vocabulaire général des systèmes embarqués et des communications sans fil, ainsi que noms propres à SiFli pour la plateforme SF32. Chaque entrée renvoie vers une page qui développe le sujet. Ce glossaire est un aide-mémoire ; il ne remplace pas le contexte de ces pages.

## Architecture et traitement { #architecture-and-processing }

* **MCU** — **Microcontroller Unit (microcontrôleur).** Circuit intégré réunissant un cœur de processeur, de la mémoire et des périphériques d’entrée/sortie programmables. Il est optimisé pour exécuter un firmware dédié avec une faible surcharge, plutôt qu’un système d’exploitation généraliste.
* **SoC** — **System on Chip (système sur puce).** Circuit intégré qui rassemble sur une même puce les circuits et composants nécessaires à un système informatique. Dans cette documentation, les composants SF32 sont classés comme des MCU : ils exécutent des firmwares de classe microcontrôleur et ne visent pas l’environnement complet d’un système d’exploitation pour processeur d’application.
* **Arm Cortex-M33** — Architecture de processeur 32 bits Armv8-M Mainline utilisée par les cœurs applicatifs et Bluetooth de la famille SF32. Armv8-M Mainline permet d’ajouter l’extension de sécurité TrustZone, qui sépare matériellement le code et les données de confiance des autres. Contrairement aux Cortex-M3/M4 précédents, TrustZone dépend toutefois de la configuration de chaque implémentation silicium ; cette fonction n’est pas garantie pour tous les Cortex-M33 et n’est pas configurée sur les composants SF32LB52x à SF32LB58x actuels. Voir également STAR-MC1 ci-dessous et la [page du SF32LB52x](../sf32-products/chips/SF32LB52x.md).
* **STAR-MC1** — Propriété intellectuelle de processeur embarqué Armv8-M Mainline configurable, développée par Arm China et utilisée comme processeur applicatif de classe Cortex-M33 dans les composants SF32 compatibles. Les configurations CU, SP et SE diffèrent notamment par le cache, le TCM, le XIPU et les capacités TrustZone. Les fonctions exposées dépendent du composant SF32 concerné. Selon le contexte, la documentation SiFli parle d’« Arm Cortex-M33 STAR-MC1 » ou d’« Arm Cortex-M33 ». Voir la [page consacrée à l’architecture STAR-MC1](../learn/architecture/star-mc1.md).
* **CDE** — **Custom Datapath Extension.** Mécanisme d’instructions personnalisées d’Arm destiné à accélérer certaines opérations. La documentation STAR-MC1 d’Arm China cite CRC32 comme exemple de CDE ; la disponibilité réelle sur un composant SF32 et la prise en charge logicielle doivent être vérifiées au cas par cas.
* **DSP** — **Digital Signal Processor / Digital Signal Processing.** Extensions intégrées au cœur Cortex-M33 pour les calculs intensifs, par exemple le traitement audio et la fusion de données de capteurs.
* **MPU** — **Memory Protection Unit.** Matériel qui contrôle les régions mémoire accessibles au code et contribue à l’isolation des erreurs et à la sécurité.
* **HAL** — **Hardware Abstraction Layer.** Couche du SDK qui expose les périphériques au moyen d’une API cohérente, indépendamment de la variante exacte de la puce.
* **Accélérateur IA/ML** — Matériel qui accélère des traitements d’intelligence artificielle ou d’apprentissage automatique, par exemple l’inférence d’un petit réseau neuronal. Sa disponibilité dépend du composant ; vérifiez le sélecteur de produits et la fiche technique de la référence visée.

## Connectivité sans fil { #wireless-connectivity }

* **BLE** — **Bluetooth Low Energy.** Mode radio Bluetooth à basse consommation sur lequel reposent de nombreux objets connectés et produits portables SF32.
* **Wi-Fi** — Technologie de réseau local sans fil. Lorsqu’un produit SF32 documente la prise en charge du Wi-Fi externe, la connexion passe par son interface SDIO. Avant de figer la conception, vérifiez la référence exacte, le routage sur la carte, l’alimentation et la prise en charge logicielle.
* **Bluetooth bimode** — Prise en charge de BLE et de Bluetooth Classic (BR/EDR) par la même radio. Cette configuration convient aux produits qui ont besoin des deux, par exemple pour diffuser de l’audio (Bluetooth Classic ou LE Audio) tout en conservant un canal de commande à basse consommation. Pris en charge par les SF32LB52x/56x/57x/58x ; le SF32LB55x ne prend en charge que BLE.
* **GAP** — **Generic Access Profile.** Couche Bluetooth qui définit les rôles des appareils, la publicité et l’établissement des connexions ; elle constitue la base de toute application BLE.
* **GATT** — **Generic Attribute Profile.** Couche Bluetooth qui définit la structure et l’échange des services et caractéristiques, c’est-à-dire les données exposées par un appareil BLE.
* **Sibles** — Framework de services GATT du SiFli-SDK, construit au-dessus de la couche GAP standard. La plupart des produits Bluetooth SF32 partent d’un exemple existant fondé sur Sibles plutôt que de créer une base GATT de toutes pièces. Voir la [vue d’ensemble Bluetooth](../learn/bluetooth/overview.md).
* **LE Audio** — Norme audio récente fondée sur Bluetooth Low Energy, qui comprend le codec LC3 et la diffusion Auracast, à distinguer des profils audio Bluetooth Classic. Prise en charge par les SF32LB52x/56x/57x/58x, mais pas par le SF32LB55x. Voir [Bluetooth Audio et LE Audio](../learn/bluetooth/processor.md).
* **OTA** — **Over-The-Air (mise à jour du firmware par liaison radio).** Mise à jour du firmware d’un appareil par une liaison sans fil, généralement BLE, plutôt que par une connexion filaire.
* **DFU** — **Device Firmware Update.** Catégorie générale de mécanismes et protocoles de mise à jour du firmware d’un appareil ; les mises à jour OTA par Bluetooth reposent généralement sur un mécanisme DFU.

## Graphismes et affichage { #graphics-and-display }

* **ePicasso** — Moteur d’accélération graphique 2D/2,5D conçu par SiFli pour la famille SF32. Il décharge le processeur applicatif d’opérations sur les pixels telles que la copie, le mélange, le redimensionnement, la rotation et la composition de calques. Voir la [page d’architecture ePicasso](../learn/graphics/epicasso-gpu.md).
* **eZip** — Format de compression sans perte de SiFli pour les graphismes et les données générales, décodé matériellement sur les composants SF32 compatibles. Pour les graphismes, SiFli indique un taux de compression légèrement supérieur à celui de PNG ; pour les données générales, le résultat dépend du contenu. Les ressources étant transférées sur le bus avant décodage, eZip peut réduire la bande passante externe consommée par la PSRAM et la NOR Flash.
* **TurboPixel** — Format avec perte à taux fixe pour le framebuffer final sur les composants SF32 compatibles. extDMA compresse l’image rendue au format TurboPixel, puis le contrôleur d’affichage la décompresse. Cela réduit la bande passante et la capacité PSRAM nécessaires. Voir la page sur la [compression du framebuffer TurboPixel](../learn/graphics/turbopixel.md).
* **LVGL** — **Light and Versatile Graphics Library.** Bibliothèque open source d’interface utilisateur embarquée que la plupart des produits SF32 utilisent pour l’interface au niveau applicatif, avec un rendu accéléré par ePicasso.
* **HMI** — **Human-Machine Interface (interface homme-machine).** Terme désignant l’interface utilisateur intégrée à l’appareil : écran, tactile et boutons, par exemple.
* **Interface d’affichage RGB/DPI** — Interface parallèle qui transmet directement les composantes couleur des pixels à un écran ou contrôleur compatible. Son nom officiel est **DPI (Display Pixel Interface)** ; « interface RGB » est l’appellation courante en conception de cartes. Elle utilise généralement une horloge pixel, des signaux de synchronisation horizontale et verticale et plusieurs lignes de données couleur parallèles. Par rapport à une interface série, DPI mobilise davantage de GPIO et exige un routage parallèle plus soigné. Vérifiez le budget de broches du boîtier et les timings de l’écran.
* **Interface d’affichage MIPI** — Interface définie par les normes de la MIPI Alliance et utilisée par des écrans compatibles nécessitant une bande passante plus élevée.
* **EPD** — **Electronic Paper Display (écran à encre électronique).** Technologie d’affichage réfléchissante couramment utilisée pour des écrans à basse consommation.
* **Interface d’affichage JDI** — Prise en charge des écrans JDI / Sharp Memory-in-Pixel compatibles, lorsqu’elle est documentée pour le composant SF32 sélectionné.

## Audio { #audio }

* **ADC / DAC** — **Analog-to-Digital Converter / Digital-to-Analog Converter.** Convertisseurs des voies d’entrée et de sortie audio analogiques sur les composants SF32 dotés de fonctions audio intégrées. Des ADC/DAC audio dédiés sont disponibles sur les SF32LB52x/56x/57x/58x ; le SF32LB55x n’en possède pas.
* **PDM** — **Pulse-Density Modulation.** Format courant d’interface pour microphones numériques, pris en charge avec I2S sur les composants SF32 compatibles avec l’audio. Une interface PDM ne correspond pas à un microphone : elle peut généralement relier jusqu’à deux microphones numériques, qui partagent l’horloge. L’un utilise le front montant et l’autre le front descendant pour distinguer les voies gauche et droite. Indiquez et comparez le nombre d’interfaces PDM, pas le nombre de microphones.
* **I2S** — **Inter-IC Sound.** Interface audio numérique standard permettant de connecter des codecs, des DAC ou d’autres périphériques audio.

## Alimentation et fiabilité { #power-and-reliability }

* **PMU** — **Power Management Unit.** Bloc intégré aux puces SF32 qui assure la régulation des tensions, notamment par les sorties BUCK/LDO. Certaines conceptions l’associent à un PMIC SiFli externe, tel que le SF30147C, pour fournir d’autres rails d’alimentation.
* **PMIC** — **Power Management IC.** Circuit intégré externe dédié à la fourniture de rails régulés supplémentaires au-delà de ceux de la PMU interne du MCU.
* **LDO** — **Low-Dropout Regulator.** Régulateur linéaire et l’un des étages de sortie de la PMU intégrée aux composants SF32.
* **BUCK** — Topologie de régulateur à découpage, également intégrée à la PMU SF32 et généralement plus efficace qu’un LDO lorsque le courant demandé est élevé.
* **TRNG** — **True Random Number Generator.** Source matérielle d’entropie fondée sur le bruit thermique physique, utilisée notamment pour générer des clés cryptographiques et assurer des fonctions de sécurité.
* **PSA** — **Platform Security Architecture.** Cadre de sécurité et programme de certification d’Arm. Certaines pages de puces SF32 indiquent **PSA Certified Level 1** ; vérifiez le statut et le niveau de certification de la référence exacte dans sa documentation officielle, sans les extrapoler à toute la famille.

## Stockage et mémoire { #storage-and-memory }

* **SRAM** — **Static RAM.** Mémoire de travail rapide intégrée à la puce, utilisée pour le code et les données de l’application.
* **PSRAM** — **Pseudo-Static RAM.** Mémoire externe de plus grande capacité, souvent intégrée en SiP dans les modules SF32. Elle complète la SRAM interne pour les tampons graphiques et les applications plus volumineuses.
* **NOR / NAND Flash** — Deux types de mémoire flash non volatile utilisés pour le firmware et les ressources. La NOR permet des lectures aléatoires rapides et convient souvent à l’exécution directe du code (XiP, Execute-in-Place). La NAND/SD-NAND offre une densité bien supérieure au prix d’accès aléatoires moins rapides ; elle convient au stockage en volume d’images, de polices et de journaux.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (ou Serial Peripheral) Interface.** Ces sigles désignent les configurations d’interface Flash ou PSRAM selon leur nombre de lignes de données et la bande passante associée : Quad en utilise quatre et Octal huit. Le choix influe sur la bande passante mémoire atteignable.
* **eMMC** — **Embedded MultiMediaCard.** Interface de stockage NAND géré utilisée dans les conceptions SF32 nécessitant une capacité de stockage plus élevée.

## Périphériques et interfaces { #peripherals-and-interfaces }

* **GPIO** — **General-Purpose Input/Output.** Broches numériques configurables pour les signaux simples, les boutons, les LED et les interfaces réalisées par bit-banging logiciel.
* **I/O** — **Input/Output.** Terme générique désignant les broches et signaux périphériques par lesquels un appareil échange des données ou des commandes avec le reste du système.
* **UART** — **Universal Asynchronous Receiver/Transmitter.** Interface série standard pour la console, le débogage et les communications simples point à point.
* **SPI** — **Serial Peripheral Interface.** Bus série synchrone utilisé avec les écrans, la mémoire Flash, les capteurs et d’autres périphériques rapides.
* **I2C** — **Inter-Integrated Circuit.** Bus série synchrone multipoint, couramment utilisé pour les capteurs et la configuration de périphériques à faible débit.
* **SDIO** — **Secure Digital Input Output.** Interface hôte utilisée dans les conceptions SF32 documentées pour relier un composant Wi-Fi externe.
* **DCMI** — **Digital Camera Module Interface.** Interface caméra parallèle permettant de connecter un capteur d’image compatible.
* **FreeIO** — Fonction d’affectation flexible des GPIO de SiFli, qui permet de mapper les signaux pris en charge vers des GPIO appropriés dans les limites documentées du composant.
* **PTM** — **Peripheral Task Machine.** Fonction matérielle SiFli de traitement déterministe des tâches périphériques sur les appareils compatibles.
* **RTC** — **Real-Time Clock (horloge temps réel).** Périphérique de mesure du temps qui peut continuer à fonctionner ou réveiller le système indépendamment des domaines d’horloge principaux de l’application.

## Matériel et fabrication { #hardware-and-manufacturing }

* **QFN** — **Quad Flat No-lead.** Boîtier des puces SF32, caractérisé par le nombre de broches et les dimensions du corps, par exemple QFN68.
* **BGA** — **Ball Grid Array.** Boîtier dont les billes de soudure sont disposées sous le composant. Il permet une empreinte compacte et un nombre de broches élevé, mais nécessite un routage d’échappement et un assemblage adaptés aux BGA.
* **BOM** — **Bill of Materials (nomenclature).** Liste détaillée et contrôlée de tous les composants, éléments passifs et pièces mécaniques nécessaires à la fabrication d’une carte assemblée (PCBA). L’une des principales raisons de privilégier les composants et modules recommandés par SiFli est la réduction de la complexité de la nomenclature.
* **EDA** — **Electronic Design Automation.** Catégorie de logiciels de saisie de schémas, simulation SPICE et conception de circuits imprimés. Consultez la page des [bibliothèques d’outils EDA](../hardware/cad-components/eda-tool-libraries.md) pour les empreintes et symboles propres à SF32.
* **AVL** — **Approved Vendor List.** Liste SiFli de composants de seconde source qualifiés (quartz, régulateurs, mémoire Flash, etc.) et vérifiés selon les tolérances électriques des conceptions matérielles SF32. Voir la page de la [liste des fournisseurs approuvés](../hardware/cad-components/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board.** Carte de référence ou de développement SF32 fournie par SiFli pour la mise en service et la validation avant la disponibilité d’un matériel personnalisé.
* **FAE** — **Field Application Engineer.** Interlocuteur technique SiFli pour les questions de conception matérielle qui dépassent le périmètre de la documentation publique.

## Logiciels et outils { #software-and-tools }

* **SiFli-SDK** — Kit principal de développement de firmware de SiFli pour les composants SF32 ; c’est le SDK de référence utilisé pour la plupart des firmwares de production.
* **SiFli CodeKit** — Extension VS Code pour le développement avec SiFli-SDK. Elle accompagne la création et la configuration du projet, la compilation, le flashage et la surveillance, sans imposer l’utilisation directe de la chaîne d’outils en ligne de commande.
* **RTOS** — **Real-Time Operating System (système d’exploitation temps réel).** Catégorie de systèmes d’exploitation offrant une planification déterministe et une faible surcharge. Les firmwares SF32 s’exécutent généralement avec l’intégration RTOS de SiFli-SDK ou avec Zephyr.
* **sftool** — Outil SiFli en ligne de commande pour flasher et récupérer les cartes SF32, y compris celles qui ne démarrent plus.
