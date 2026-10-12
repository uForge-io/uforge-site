---
icon: lucide/circuit-board
hide:
    - navigation
description: "Conception du schéma du SF32LB52x : mémoire de démarrage, capteurs, interfaces, accès de débogage et flashage en production."
tags:
    - Matériel
    - Puce
---

# Guide de conception matérielle SF32LB52x — Stockage et fabrication { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "Fait partie du Guide de conception matérielle SF32LB52x"
    Cette page couvre les sections 5.6-5.7 des recommandations de conception du schéma : stockage, connectivité et fabrication. Retournez à [RF et interfaces utilisateur](SF32LB52x_schematic_rf_interfaces.md), ou consultez la [liste de contrôle du schéma](SF32LB52x_schematic_checklist.md).

### 5.6. Stockage et connectivité { #56-storage-and-connectivity }

#### 5.6.1. Stockage { #561-storage }

**Résumé rapide**

- Les mémoires de démarrage externes comprennent SPI NOR, SPI NAND et SD NAND ; eMMC est disponible sur les variantes compatibles à alimentation externe régulée.
- Les broches de bootstrap `PA13` et `PA17` sélectionnent le support de démarrage.
- Les notes d'application et le guide de conception du schéma indiquent `PA21` pour la commutation de l'alimentation du stockage de démarrage, tandis que la liste de contrôle officielle indique `PA11` pour la Flash externe des variantes alimentées par batterie. Faites confirmer par SiFli la broche de commande adaptée à votre conception. Par ailleurs, une mémoire NOR Flash de 32 Mo ou plus connectée via MPI doit pouvoir être mise hors tension puis réalimentée par `PA21` afin que la ROM la reconnaisse après une réinitialisation ou l'entrée en Hibernate. Pendant Hibernate, `VDD_SIP` doit être coupé afin d'éviter les courants de fuite sur les E/S de la mémoire intégrée au même boîtier.

**Objectif de conception**

Choisissez le support de démarrage et son schéma d'alimentation en fonction de la taille du firmware, de la stratégie de mise à jour et des états basse consommation, en veillant aussi à un démarrage fiable par la ROM après un reset ou l'entrée en mode Hibernate.

##### 5.6.1.1. Description de l'interface de stockage { #5611-storage-interface-description }

La puce prend en charge les mémoires Flash SPI NOR, SPI NAND et SD NAND externes. **L'eMMC n'est prise en charge que sur les variantes 52B/D/E/G/J alimentées par une source externe régulée.**

<div align="center"><em>Tableau 5.6-1 : Connexions de signal Flash SPI NOR/NAND</em></div>

<div align="center" markdown>

| Signal Flash | Broche E/S | Description |
|:---|:---|:---|
| CS# | PA12 | Sélection de puce, active basse |
| SO | PA13 | Donnée IO1 |
| WP# | PA14 | Donnée IO2 / protection en écriture |
| SI | PA15 | Donnée IO0 |
| SCLK | PA16 | Horloge série |
| Hold# | PA17 | Donnée IO3 / maintien |

</div>

<div align="center"><em>Tableau 5.6-2 : Connexions de signal Flash SD NAND et eMMC</em></div>

<div align="center" markdown>

| Signal SD NAND/eMMC | Broche E/S | Description |
|:---|:---|:---|
| SD2_CMD | PA15 | Commande |
| SD2_D1 | PA17 | Donnée 1 |
| SD2_D0 | PA16 | Donnée 0 |
| SD2_CLK | PA14 | Horloge |
| SD2_D2 | PA12 | Donnée 2 |
| SD2_D3 | PA13 | Donnée 3 |

</div>

!!! note "Domaines d'alimentation eMMC (variantes à alimentation externe régulée uniquement)"
    Les mémoires eMMC possèdent deux domaines d'alimentation : VCC et VCCQ. Option 1 : commuter les deux ensemble réduit le courant à l'arrêt, mais ralentit la reprise de l'eMMC depuis son mode basse consommation et augmente la consommation moyenne du CPU. Option 2 : commuter uniquement VCC et laisser VCCQ alimenté en permanence augmente le courant à l'arrêt par rapport à l'option 1, mais accélère la reprise de l'eMMC et réduit la consommation moyenne du CPU.

!!! important "Résistances de pull-up des interfaces mémoire"
    Pour les variantes à alimentation externe régulée, la note d'application indique qu'aucune résistance de pull-up externe n'est requise pour la NOR Flash, qu'une résistance doit être placée sur PA17 (Hold#) pour la SPI NAND, sur PA13 (D3) et PA15 (CMD) pour la SD NAND, ainsi que sur PA17 (D1), PA13 (D3) et PA15 (CMD) pour l'eMMC. La valeur recommandée est de 7,5 kΩ. Pour les variantes sur batterie, la note ne mentionne que les empreintes de bootstrap PA13/PA17 et ne précise pas si une résistance sur PA15/CMD est également requise. N'étendez pas sans confirmation l'exigence concernant PA15 des variantes à alimentation régulée aux modèles sur batterie ; confirmez auprès de SiFli les résistances requises pour la variante et le support de démarrage concernés.

##### 5.6.1.2. Configuration de démarrage { #5612-boot-configuration }

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    La puce prend en charge le démarrage depuis une mémoire Flash SPI NOR intégrée dans le même boîtier, une Flash SPI NOR externe, une Flash SPI NAND externe ou une Flash SD NAND externe (**le démarrage depuis eMMC n'est pas pris en charge**) :

    - Le SF32LB520Ux6 intègre une Flash dans son boîtier et démarre par défaut depuis celle-ci.
    - Les SF32LB523/5/7Ux6 intègrent une PSRAM dans leur boîtier et doivent démarrer depuis un stockage externe.

    ![Figure 5.6-1 : Circuit recommandé des broches de Bootstrap (variante alimentée par batterie)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.6-1 : Circuit recommandé des broches de Bootstrap (variante alimentée par batterie)</em></div>

    <div align="center"><em>Tableau 5.6-3 : Réglages des options de démarrage (variante alimentée par batterie)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Support de démarrage |
    |:---|:---|:---|
    | L | L | Flash SPI NOR |
    | L | H | Flash SPI NAND |
    | H | X | Flash SD NAND |

    </div>

=== "52B/D/E/G/J (alimentation externe régulée)"

    La puce prend en charge le démarrage depuis une mémoire Flash SPI NOR intégrée dans le même boîtier, une Flash SPI NOR externe, une Flash SPI NAND externe, une Flash SD NAND externe ou une mémoire **eMMC** externe :

    - Le modèle avec Flash intégrée dans le boîtier (SF32LB52BU36) démarre par défaut depuis celle-ci.
    - Les modèles avec PSRAM intégrée dans le boîtier (SF32LB52DUB6/EUB6/GUC6/JUD6) doivent démarrer depuis un stockage externe.

    ![Figure 5.6-2 : Circuit recommandé des broches de Bootstrap (variante à alimentation externe régulée)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.6-2 : Circuit recommandé des broches de Bootstrap (variante à alimentation externe régulée)</em></div>

    <div align="center"><em>Tableau 5.6-4 : Réglages des options de démarrage (variante à alimentation externe régulée)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Support de démarrage |
    |:---|:---|:---|
    | L | L | Flash SPI NOR |
    | L | H | Flash SPI NAND |
    | H | X | Flash SD NAND |
    | H | H | eMMC |

    </div>

    !!! note "Remarque de nomenclature dans la documentation originale de SiFli"
        Dans cette section, le document source de SiFli utilise les suffixes « SF32LB52AUx6 » et « SF32LB52D/F/HUx6 », qui ne correspondent pas aux noms de modèles B/D/E/G/J employés au début du même document. Ce guide distingue donc les variantes selon le type de mémoire réellement intégré au boîtier (Flash ou PSRAM). En cas de doute, vérifiez le modèle exact de la puce et sa fiche technique.

!!! important "Confirmer les configurations de démarrage qui se chevauchent"
    Les notes d'application indiquent H/X pour la SD NAND, tandis que le guide de conception du schéma SF32LB52x indique H/L ; la note d'application des variantes à alimentation externe régulée indique en outre H/H pour l'eMMC. Comme X désigne normalement l'un ou l'autre niveau logique, les entrées des variantes à alimentation externe régulée se chevauchent, sans que les sources expliquent la différence. Ne déduisez pas les niveaux définitifs des broches de configuration au démarrage à partir de ces seuls tableaux ; confirmez la variante exacte et le comportement de la ROM auprès de SiFli. Les circuits de référence utilisent des résistances de pull-up de 7,5 kΩ : la figure 5.6-1 les relie au rail VDD33_VOUT1 de 3,3 V et la figure 5.6-2 à VDDIOA de 3,3 V.

##### 5.6.1.3. Contrôle d'alimentation du stockage de démarrage { #5613-boot-storage-power-control }

Les notes d'application OpenSiFli et le guide de conception du schéma, qui ont priorité, indiquent `PA21` pour commander l'interrupteur (niveau haut : marche ; niveau bas : arrêt) ; ce guide retient donc `PA21` comme référence étayée par les sources. En revanche, le classeur de la liste de contrôle lié depuis le wiki SiFli indique `PA11` pour la Flash externe des variantes sur batterie. Ne remplacez pas `PA21` par `PA11` sur la seule base de ce classeur. Celui-ci ne précise pas si `PA11` correspond à une autre commande d'activation sur la carte ou à une divergence d'affectation ; confirmez auprès de SiFli le réseau et la variante exacts avant validation.

=== "SF32LB520/3/5/7 (alimenté par batterie)"

    - Le SF32LB520Ux6 intègre une mémoire Flash dans son boîtier : alimentez VDD18_VOUT depuis VDD33_VOUT1 et désactivez le LDO VDD18_VOUT interne.
    - Les SF32LB523/5/7Ux6 intègrent une PSRAM dans leur boîtier : utilisez le LDO interne ; VDD18_VOUT peut aussi être alimenté par une source externe.
    - Alimentez la Flash NOR externe depuis VDD33_VOUT1 ; aucun interrupteur d'alimentation supplémentaire n'est nécessaire.
    - Alimentez la Flash SPI NAND ou SD NAND externe depuis VDD33_VOUT1 et ajoutez un interrupteur d'alimentation.
    - Le circuit de référence prévoit des emplacements pour les résistances de pull-up de PA13 et PA17. Montez-les selon le type de mémoire ; la valeur recommandée est 7,5 kΩ.

=== "52B/D/E/G/J (alimentation externe régulée)"

    - Le modèle avec Flash intégrée dans le boîtier (SF32LB52BU36) : ajoutez un interrupteur d'alimentation sur VDD_SIP.
    - Pour les modèles avec PSRAM intégrée dans le boîtier (SF32LB52DUB6/EUB6/GUC6/JUD6), l'interrupteur de VDD_SIP est optionnel si PVDD = 3,3 V et si VDD_SIP utilise le LDO interne ; il est obligatoire si PVDD = 1,8 V.
    - L'alimentation du stockage externe est indépendante de VDD_SIP — ajoutez un interrupteur d'alimentation séparé
    - Voir la section 5.6.1.1 pour les compromis de domaine d'alimentation VCC/VCCQ de l'eMMC
    - La note d'application indique **PA21** pour les interrupteurs d'alimentation du stockage liés au démarrage ; la divergence entre les sources concernant la Flash externe des variantes alimentées par batterie est signalée plus haut
    - Les mémoires Flash NOR de 32 Mo ou plus connectées via MPI (Memory Peripheral Interface, interface de périphériques mémoire utilisée avec les mémoires SPI-NOR/SPI-NAND) doivent pouvoir être mises hors tension par PA21. Elles quittent ainsi le mode d'adressage sur 4 octets au redémarrage du MCU ou à l'entrée en Hibernate ; sinon, la ROM ne reconnaîtra pas la Flash. Les Flash NOR de 16 Mo ou moins peuvent rester alimentées en permanence.
    - Le circuit de référence prévoit des emplacements pour les résistances de pull-up de PA13 et PA17. Montez-les selon le type de mémoire ; la valeur recommandée est 7,5 kΩ.

**Erreurs courantes - Stockage**

- Résistances de bootstrap manquantes ou montées pour le mauvais support de démarrage.
- Laisser déconnectée la commande de l'interrupteur d'alimentation du stockage de démarrage confirmée par la source.
- Traiter l'eMMC comme disponible sur toutes les variantes.
- Laisser une Flash NOR de grande capacité alimentée en permanence, alors que le mode d'adressage sur 4 octets peut empêcher sa reconnaissance par la ROM après un redémarrage.

**Liste de contrôle du stockage**

- [ ] Le support de démarrage est sélectionné et documenté avant le routage du PCB.
- [ ] Les niveaux de tirage des broches de bootstrap `PA13`/`PA17` correspondent au tableau de démarrage.
- [ ] Les commutateurs nécessaires au stockage de démarrage sont commandés par la broche propre à la variante, confirmée par la source ; la divergence PA11/PA21 a été résolue avec SiFli.
- [ ] Le compromis VCC/VCCQ de l'eMMC est évalué pour les conceptions à alimentation externe régulée.
- [ ] Le plan de mise en service couvre les niveaux des broches de configuration de démarrage, les temps d'établissement de l'alimentation mémoire, la lecture de son identifiant et le transfert du firmware.

#### 5.6.2. Capteurs { #562-sensors }

**Résumé rapide**

- Les capteurs se connectent généralement par I2C ou SPI. Coupez l'alimentation des capteurs inutilisés pour réduire le courant de veille ; conservez ceux nécessaires au réveil dans le mode de fonctionnement requis.
- Les broches d'interruption des capteurs utilisés pour le réveil doivent être affectées avant de figer le brochage.

**Objectif de conception**

Assurer des connexions fiables pour l'alimentation, les interruptions et les bus des capteurs, tout en permettant l'arrêt correct des capteurs inutilisés dans les modes basse consommation.

Le SF32LB52x peut se connecter à des capteurs de fréquence cardiaque, des accéléromètres, des capteurs géomagnétiques et d'autres composants similaires. Choisissez un commutateur d'alimentation à faible courant de repos (Iq) pour couper et rétablir leur alimentation.

**Liste de contrôle des capteurs**

- [ ] Les broches de bus, d'interruption, de reset et d'activation de l'alimentation des capteurs sont affectées.
- [ ] Le courant de repos (Iq) et le courant à l'arrêt du commutateur d'alimentation des capteurs respectent l'objectif de veille.
- [ ] Les résistances de pull-up sont reliées au rail d'alimentation E/S approprié du capteur.
- [ ] Le plan de mise en service comprend la recherche des composants sur le bus, le réveil par interruption et les cycles de coupure/rétablissement de l'alimentation du capteur.

#### 5.6.3. Affectation des broches UART et I2C { #563-uart-and-i2c-pin-assignment }

**Résumé rapide**

- Les fonctions UART et I2C peuvent être affectées à n'importe quelle broche PA.
- Le choix des broches doit néanmoins tenir compte des contraintes de démarrage, de réveil, de débogage, de test de production, et de routage de la carte.

**Objectif de conception**

Exploiter l'affectation flexible des broches pour simplifier le routage, sans occuper les broches nécessaires au démarrage, au réveil, au débogage ou à l'outillage de production.

Le SF32LB52x permet d'affecter les fonctions UART et I2C à n'importe quelle broche PA.

**Liste de contrôle UART/I2C**

- [ ] Les tirages vers le haut, les domaines de tension, et la capacité de bus sont corrects pour chaque bus I2C.
- [ ] Les broches UART nécessaires pour les logs, le téléchargement, ou les modules externes sont accessibles.
- [ ] Le multiplexage des broches n'entre pas en conflit avec les fonctions de bootstrap, de réveil, d'affichage, de stockage, ou de débogage.

#### 5.6.4. Affectation des broches GPTIM { #564-gptim-pin-assignment }

**Résumé rapide**

- Les fonctions GPTIM peuvent être affectées à n'importe quelle broche PA.
- Les fonctions du temporisateur couvrent les sorties PWM, la capture d'entrée, la commande du moteur, le rétroéclairage et les besoins de temporisation propres au produit.

**Objectif de conception**

Prévoir suffisamment tôt les broches du temporisateur pour les fonctions PWM, capture et temporisation. Cela évite de devoir les affecter en fin de conception à des broches difficiles à router ou incompatibles avec les besoins de réveil.

Le SF32LB52x permet d'affecter les fonctions GPTIM à n'importe quelle broche PA.

**Liste de contrôle GPTIM**

- [ ] Les canaux du temporisateur nécessaires au PWM, à la capture ou aux boucles de régulation sont indiqués dans le tableau d'affectation des broches.
- [ ] Les broches GPTIM n'entrent pas en conflit avec les exigences de rétroéclairage, de moteur, de débogage, ou de stockage.
- [ ] Le plan de mise en service inclut la vérification de la fréquence PWM, de la plage de rapport cyclique, et de la polarité des broches.

### 5.7. Fabrication { #57-manufacturing }

#### 5.7.1. Interface de débogage et de téléchargement { #571-debug-and-download-interface }

**Résumé rapide**

- `PA18` et `PA19` sont par défaut en DBG_UART après la mise sous tension et sont multiplexés avec SWD.
- Réservez un accès physique aux broches de débogage/téléchargement sur chaque carte de prototype et de production.

**Objectif de conception**

Conserver l'accès nécessaire au transfert du firmware, à la lecture des journaux, au débogage pas à pas et à la récupération après panne, même une fois le boîtier et l'outillage de production définis.

Le SF32LB52x prend en charge une interface DBG_UART pour le téléchargement et le débogage, connectée à un PC via un adaptateur UART-USB de 3,3 V. SWD et DBG_UART sont multiplexés sur PA18 et PA19 ; la configuration par défaut à la mise sous tension est DBG_UART, qui prend en charge le débogage pas à pas ainsi que la sortie de journaux.

Pour le débogage pas à pas et la sortie des journaux via DBG_UART, consultez les manuels de SFtool et d'Impeller.

<div align="center"><em>Tableau 5.7-1 : Connexions du port de débogage</em></div>

<div align="center" markdown>

| Signal de débogage | Broche | Description |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | Réception UART de débogage |
| DBG_UART_TXD | PA19 | Émission UART de débogage |

</div>

**Liste de contrôle du débogage**

- [ ] `PA18`/`PA19`, la masse, et la référence d'alimentation requise sont exposées sur des pastilles de test ou des broches de connecteur.
- [ ] L'accès de débogage reste disponible après l'assemblage du boîtier, de la batterie, et de l'afficheur.
- [ ] Le niveau de tension UART est de 3,3 V, compatible avec l'adaptateur ou le montage sélectionné.
- [ ] Le chemin de récupération est documenté pour une carte incapable de démarrer le firmware applicatif.

#### 5.7.2. Flashage de production et calibrage du quartz { #572-production-flashing-and-crystal-calibration }

**Résumé rapide**

- La programmation de production et le calibrage du quartz nécessitent une alimentation stable, un accès DBG_UART, PA01, et les points de test d'alimentation/masse requis.
- L'accès pour le montage de test doit être conçu avant que le contour mécanique du PCB et le boîtier ne soient figés.

**Objectif de conception**

Rendre chaque carte de production programmable, calibrable, et récupérable sans soudure manuelle ni démontage du produit.

SiFli fournit un programmateur autonome pour écrire le firmware en production et calibrer le quartz. Prévoyez au minimum les points de test PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD et PA01. La procédure détaillée figure dans le guide d'utilisation du programmateur autonome (« Offline Downloader User Guide »), inclus dans le dossier de développement.

**Liste de contrôle de production**

- [ ] Les points de test PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD, et PA01 sont réservés.
- [ ] Les pastilles de test sont accessibles par le montage prévu après l'assemblage mécanique.
- [ ] La procédure de calibrage du quartz et les limites d'acceptation sont définies avec l'équipe de fabrication.
- [ ] Les enregistrements de programmation, de calibrage, et de test fonctionnel peuvent être rattachés à la révision de carte.

#### 5.7.3. Listes de contrôle de schéma et de dessin PCB { #573-schematic-and-pcb-drawing-checklists }

Utilisez la [liste de contrôle officielle du schéma et du PCB][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)], publiée sur le wiki de SiFli, comme étape formelle d'approbation avant fabrication. Consultez la [Liste de contrôle du schéma](SF32LB52x_schematic_checklist.md) pour la version complète, point par point. Les listes de contrôle de ce guide aident à repérer les problèmes courants avant la revue formelle.

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**Liste de contrôle de mise en production**

- [ ] La liste de contrôle du schéma, la liste de contrôle PCB, la vérification AVL, le rapport DRC, et le rapport d'impédance sont complets.
- [ ] Les captures d'écran de preuve sont archivées pour l'alimentation, l'horloge, la RF, l'affichage, le stockage, l'audio, l'USB, le SDIO, le DC/DC, et l'accès de test de production.
- [ ] Les hypothèses propres à chaque variante sont consignées dans les notes de revue.
- [ ] Chaque risque matériel non résolu est confié à un responsable avant la mise en production.
