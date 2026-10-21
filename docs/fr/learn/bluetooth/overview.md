---
icon: lucide/bluetooth
title: "Vue d'ensemble Bluetooth"
description: "Bluetooth sur SF32 : BLE ou bimode, conception de services GATT, réglage des paramètres de connexion, appairage et sécurité, LE Audio et coexistence."
tags:
  - Bluetooth
---

# Vue d'ensemble Bluetooth { #bluetooth-overview }

## Vue d'ensemble { #overview }

Ce guide explique comment concevoir la connectivité Bluetooth des produits SF32. Il se concentre sur les décisions qui influencent concrètement le produit : BLE ou Bluetooth bimode, conception des services GATT, choix des profils, réglage des paramètres de connexion, appairage et sécurité, LE Audio, ainsi que coexistence avec les traitements graphiques, audio et capteurs.

SF32 sépare les traitements applicatifs des tâches du contrôleur Bluetooth soumises à des contraintes temporelles strictes. Le processeur applicatif exécute généralement la logique du produit et l'interface utilisateur ; un processeur Bluetooth ou basse consommation gère la temporisation de la couche liaison et l'ordonnancement radio. Le processeur qui exécute la pile hôte et les services GATT dépend du composant et de la configuration du SDK. Ne supposez pas que tous les services tournent sur le processeur applicatif : vérifiez la configuration des cœurs et leur communication dans l'exemple retenu.

Pour une explication plus approfondie du sous-système sous-jacent, voir [Processeur Bluetooth](processor.md).

Utilisez cette page pour définir le comportement sans fil du produit : les rôles et profils nécessaires, la réactivité et l'autonomie attendues, ainsi que la répartition des responsabilités entre le téléphone, la radio et le firmware applicatif. Ce guide aide à concevoir le produit, mais ne remplace pas les essais d'interopérabilité avec les téléphones et accessoires ciblés.

## Définir les exigences de connectivité du produit { #define-the-products-connectivity-requirements }

Avant d'écrire le moindre code GATT, précisez ce dont le produit a réellement besoin :

- BLE uniquement ou Bluetooth bimode (Bluetooth classique + BLE) ?
- Audio Bluetooth — Bluetooth classique (A2DP/AVRCP/HFP) ou LE Audio ?
- Intervalle de connexion typique, exigences de latence et de débit.
- À quelle fréquence le processeur applicatif doit se réveiller et combien de temps il peut rester en veille.
- Le produit doit-il interopérer avec des services existants côté téléphone (notifications, contrôle média, appels) ou seulement avec une application compagnon personnalisée ?
- Quelle portée est visée ? Quelles sont les contraintes liées à l'antenne et au boîtier, et quels sont les objectifs de certification RF ?
- Les mises à jour de firmware seront-elles livrées par Bluetooth ?

Ces réponses orientent le choix de l'appareil, les exemples du SDK à prendre comme point de départ et la durée pendant laquelle le processeur principal peut rester en veille.

## Choisir BLE, Bluetooth classique ou Bluetooth bimode { #choose-ble-classic-or-dual-mode }

### Bluetooth Low Energy (BLE) { #bluetooth-low-energy-ble }

Le BLE est le choix par défaut pour la plupart des appareils portables connectés et des capteurs : le trafic est intermittent et déclenché par des événements, la consommation moyenne est faible et les systèmes mobiles le prennent largement en charge. Les bracelets d'activité, les capteurs de santé, les balises et les liaisons de configuration ou de commande vers une application compagnon sont généralement conçus autour du BLE.

### Bluetooth classique et bimode { #classic-bluetooth-and-dual-mode }

Ajoutez le Bluetooth classique si le produit doit diffuser de l'audio (A2DP/AVRCP), prendre en charge les appels mains libres (HFP), fournir une liaison de données de type série (SPP) ou rester compatible avec les profils Bluetooth classiques existants. Le fonctionnement bimode impose davantage de contraintes d'ordonnancement radio et de coexistence que le BLE seul. Le processeur Bluetooth dédié est précisément conçu pour isoler cette charge du reste du système.

Tous les appareils de la famille SF32 ne prennent pas en charge le Bluetooth bimode. Consultez le tableau des appareils dans [Processeur Bluetooth](processor.md#device-family-differences) avant de choisir une référence.

## Choisir le bon appareil SF32 { #pick-the-right-sf32-device }

Choisissez l'appareil en fonction des fonctions de connectivité requises par le produit, pas uniquement de sa fréquence d'horloge.

<div align="center"><em>Tableau : Choisir le bon appareil SF32</em></div>

<div align="center" markdown>

| Exigence | Appareil généralement adapté |
|:------------|:-------------------------|
| Appareil portable ou capteur BLE uniquement | SF32LB55x |
| Solution Bluetooth bimode à coût maîtrisé (accessoire audio, module) | SF32LB52x |
| Bluetooth bimode avec affichage et interface utilisateur avancés | SF32LB56x |
| Bluetooth bimode avec deux cœurs applicatifs pour les graphiques et l'audio local | SF32LB57x |
| Produit haut de gamme nécessitant Bluetooth + graphiques + IA + grande capacité de mémoire | SF32LB58x |
| Le cœur basse consommation dédié au contrôleur Bluetooth suffit | SF32LB52x |
| Le cœur basse consommation doit aussi exécuter des tâches toujours actives supplémentaires, programmables par l'utilisateur | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Si le produit nécessite aussi un écran, davantage de mémoire ou des fonctions d'IA, vérifiez ces besoins dans les pages [Vue d'ensemble des graphiques](../graphics/overview.md) et [Accélérateur IA](../ai/accelerator.md).

## Services GATT et le framework Sibles { #gatt-services-and-the-sibles-framework }

SiFli-SDK fournit **Sibles** pour enregistrer et utiliser les services GATT. GATT définit la hiérarchie des services et des caractéristiques ainsi que l'accès aux attributs ; GAP définit la découverte des appareils, les annonces, l'établissement des connexions et les rôles associés. Ces responsabilités se complètent : GATT n'est pas une couche construite au-dessus de GAP. Partez de l'exemple du SDK le plus proche plutôt que de créer une base de données GATT de zéro.

Le SDK fournit des exemples d'implémentation pour plusieurs profils standards et spécifiques au fabricant, notamment :

<div align="center"><em>Tableau : Services GATT et le framework Sibles</em></div>

<div align="center" markdown>

| Profil / Service | Usage typique |
|:-------------------|:------------|
| **HRPC** (client collecteur de mesures de fréquence cardiaque) | Recevoir les mesures d'un capteur externe en tant que client GATT ; utile pour les produits de fitness et de suivi de santé. |
| **DISS** (Device Information Service) | Exposer le fabricant, le modèle et la version de firmware au téléphone. |
| **CTS** (Current Time Service) | Synchronisation de l'heure du téléphone vers l'appareil. |
| **BASC** / **CSCPC** / **CPPC** | Profils clients pour la batterie, la vitesse et la cadence de pédalage, ainsi que la puissance de pédalage dans les applications de fitness. |
| **HID sur GATT** | Émulation de claviers, de télécommandes et d'autres périphériques d'entrée. |
| Client **ANCS** (Apple Notification Center Service) | Lire les notifications iOS sur l'appareil. |
| Client **AMS** (Apple Media Service) | Contrôler la lecture média iOS depuis l'appareil. |
| Profil de transfert série | Transport bidirectionnel de données personnalisées sur BLE, fonctionnellement proche du SPP mais fondé sur GATT. |

</div>

Réutilisez l'enregistrement, la gestion des événements et les contrôles de sécurité de l'exemple le plus proche. Pour un profil standard, conservez ses UUID et son comportement prescrit ; si le modèle de données du produit l'exige, créez un service et des UUID propres. L'objectif est de réutiliser une infrastructure éprouvée, pas de faire entrer tous les protocoles de l'application dans un profil standard.

## Profils Bluetooth classiques { #classic-bluetooth-profiles }

Pour les produits Bluetooth bimode, le SDK fournit des implémentations d'exemple de profils pour :

- **SPP** — données série bidirectionnelles simples, utiles pour les applications compagnons héritées ou non-GATT.
- **A2DP** (puits et source) — diffusion audio Bluetooth.
- **AVRCP** — contrôle de lecture (lecture/pause/piste/volume) en complément d'une liaison A2DP.
- **HFP** — appels mains libres, avec les rôles HF (appareil mains libres) et AG (passerelle audio). L'[exemple HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) documenté implémente HF ; vérifiez séparément la prise en charge d'AG dans la configuration du SDK choisie.
- **PAN** — réseau via Bluetooth, incluant un exemple de livraison OTA basé sur PAN.

Les profils audio et les profils hérités ont souvent des contraintes de temporisation et de débit plus strictes que les liaisons BLE simples. Prévoyez suffisamment de temps pour tester la coexistence (voir [Coexistence](#coexistence-with-other-workloads) ci-dessous).

## Audio Bluetooth et LE Audio { #bluetooth-audio-and-le-audio }

Deux chemins distincts existent selon l'approche audio :

- **Audio Bluetooth classique** — A2DP pour la diffusion, AVRCP pour la commande de lecture, HFP pour les appels. Cette technologie éprouvée est largement compatible avec les téléphones et casques existants.
- **LE Audio** — le [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/) définit les procédures de gestion des flux LE Audio en unicast comme en broadcast. Le SDK comprend des exemples de sources et de récepteurs de diffusion, ainsi qu'un exemple combinant une source de diffusion LE Audio et le Bluetooth classique pour les produits qui doivent prendre en charge les deux technologies pendant une période de transition.

Les deux chemins exigent une temporisation stable, des tampons et un transfert fiable des échantillons audio, généralement par DMA. Choisissez SF32LB52x/56x/58x lorsque leurs rôles audio Bluetooth pris en charge et leurs configurations du SDK répondent aux besoins du produit. SF32LB55x ne prend en charge que BLE et ne peut pas fournir d'audio Bluetooth classique ; cela ne signifie pas qu'il est dépourvu de fonctions audio locales. Pour le DMA et les tampons, consultez la [Vue d'ensemble de l'audio](../audio/overview.md) et le [Processeur Bluetooth](processor.md#bluetooth-audio-and-le-audio).

## Modèle d'implémentation pour les services Sibles { #implementation-pattern-for-sibles-services }

Un service BLE maintenable suit généralement ce modèle :

<div align="center"><em>Tableau : Modèle d'implémentation pour les services Sibles</em></div>

<div align="center" markdown>

| Étape | Responsabilité du firmware | Point de revue |
|:-----|:------------------------|:-------------|
| Définir le contrat du service | UUID, caractéristiques, permissions, comportement de notification. | Répondre aux exigences de l'application compagnon et de sécurité. |
| Enregistrer le service | Suivre le mécanisme Sibles/GATT utilisé par l'exemple du SDK le plus proche. | Éviter une implémentation ad hoc du service. |
| Choisir les données annoncées | Inclure uniquement les données nécessaires à la découverte et à la reconnexion. | Garder la charge utile d'annonces BLE réduite et stable. |
| Filtrer les écritures | Valider la longueur, l'état, les permissions et la séquence de commandes. | Empêcher le trafic applicatif malformé de déstabiliser le firmware. |
| Notifier avec parcimonie | Envoyer les changements ou des données groupées, pas un flux d'état redondant. | Économise le temps d'antenne et la puissance au repos. |
| Conserver l'état | Stocker les clés d'appairage et les réglages du produit en sécurité. Gérer les abonnements CCCD par client : les conserver entre connexions pour les clients liés et les réinitialiser à la valeur par défaut pour les clients non liés. | Vérifier la récupération après redémarrage et OTA ; gérer les changements de la base GATT sans restaurer aveuglément d'anciens handles. |

</div>

Cette méthode maintient la cohérence entre le service GATT, l'interface avec l'application mobile, la politique de sécurité et le comportement énergétique.

## Paramètres d'annonces BLE et de connexion { #advertising-and-connection-parameters }

Les paramètres de connexion et d'annonces BLE sont les principaux leviers pour équilibrer latence, débit et consommation.

Ces paramètres décrivent les liaisons BLE ACL, pas tous les transports audio Bluetooth. L'audio classique suit la temporisation BR/EDR ; LE Audio utilise la temporisation isochrone des CIS ou BIS. N'appliquez pas directement un intervalle de connexion GATT BLE à ces chemins audio. L'[introduction à LE de Bluetooth SIG](https://www.bluetooth.com/bluetooth-le-primer/) explique ces différents transports.

<div align="center"><em>Tableau : Paramètres d'annonces BLE et de connexion</em></div>

<div align="center" markdown>

| Paramètre | Effet | Recommandation |
|:----------|:-------|:---------|
| Intervalle d'annonces BLE | Rapidité de découverte et consommation des annonces | Utilisez un intervalle court pendant une période limitée de découverte rapide, puis allongez-le en attendant une connexion ou reconnexion. Une connexion établie n'exige pas, à elle seule, de continuer les annonces. |
| Intervalle de connexion | Temps de réponse BLE ACL et consommation | Des intervalles plus longs peuvent réduire la consommation moyenne des liaisons peu chargées ; des intervalles plus courts peuvent améliorer la réactivité. Validez les paramètres négociés, le débit et le courant avec le téléphone cible. |
| Latence du périphérique (slave latency dans les anciens SDK) | Autorise le périphérique à ignorer certains événements de connexion | Améliore l'autonomie lorsque la liaison est principalement inactive. Réglez cette valeur à 0 si la faible latence prime sur la consommation. |
| Délai de supervision (supervision timeout) | Durée maximale sans réception d'un paquet de données valide de la couche liaison avant de déclarer la connexion perdue | Une valeur trop faible provoque des coupures lorsque la liaison RF est marginale ; une valeur trop élevée retarde la reconnexion après une perte réelle de la liaison. |
| Puissance TX | Portée, consommation et coexistence | Commencez par le réglage minimal qui satisfait la portée requise. Mesurez l'énergie totale, les retransmissions et la coexistence dans le boîtier définitif : un réglage inférieur n'est pas forcément plus économe s'il provoque des retransmissions fréquentes. |

</div>

Les usages de type balise (annonces compatibles avec iBeacon) et d'annonces périodiques, notamment la synchronisation pour les diffusions unidirectionnelles ou à grande échelle, sont couverts par des exemples dédiés du SDK. Ils ne nécessitent pas de connexion GATT complète.

L'intervalle de connexion, la latence du périphérique et le délai de supervision doivent former une combinaison valide acceptée par le contrôleur et l'appareil distant. Une demande de mise à jour ne prouve pas son application : consignez les valeurs négociées et testez le téléphone ou l'accessoire cible, y compris les demandes refusées et le retour aux réglages de repos.

## Préréglages de paramètres par phase produit { #parameter-presets-by-product-phase }

Adaptez les paramètres Bluetooth à chaque phase du produit au lieu d'utiliser un réglage unique de compromis :

<div align="center"><em>Tableau : Préréglages de paramètres par phase produit</em></div>

<div align="center" markdown>

| Phase | Objectif typique | Orientation des paramètres |
|:------|:-------------|:--------------------|
| Découverte initiale | Découverte rapide | Intervalle d'annonces BLE court, identité de l'appareil claire, durée limitée. |
| Reconnexion | Réduire la consommation moyenne | Après le délai d'expiration, allonger l'intervalle d'annonces BLE et, si nécessaire, utiliser un comportement dirigé ou filtré. |
| Contrôle interactif | Faible latence | Intervalle de connexion plus court, latence du périphérique faible ou nulle. |
| Connecté au repos | Préserver l'autonomie | Intervalle de connexion plus long, latence du périphérique non nulle et notifications réduites au minimum. |
| Transfert OTA par BLE | Débit et fiabilité | Intervalle court, latence du périphérique nulle, délai de supervision prudent. |
| Audio | Garantir une temporisation stable | Choisir les paramètres en fonction de la temporisation des trames du codec et de la profondeur des tampons. |

</div>

Documentez les transitions entre les phases. De nombreux problèmes Bluetooth apparemment « aléatoires » de consommation ou de latence viennent en réalité du produit resté dans la mauvaise phase après un changement d'état.

## Appairage, bonding et sécurité { #pairing-bonding-and-security }

BLE peut établir une connexion sans appairage. L'appairage crée les clés de sécurité ; le bonding les conserve pour les connexions suivantes. Déterminez quels services exigent chiffrement, authentification et conservation des clés, plutôt que d'imposer le bonding à tous les produits :

- Choisissez tôt entre Just Works, la saisie d'un code d'appairage et la comparaison numérique. Just Works ne protège pas contre les attaques de l'homme du milieu (MITM) : une connexion chiffrée n'est pas forcément authentifiée. Adaptez le mode d'appairage aux capacités d'E/S des deux appareils et aux exigences de sécurité du produit ; consultez les [exigences de sécurité de Bluetooth GAP](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-60/out/en/host/generic-access-profile.html).
- Pour [ANCS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html), l'autorisation sur le téléphone est distincte du chiffrement de la liaison et de la conservation des clés d'appairage ; gérez son refus ou sa révocation. ANCS et [AMS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleMediaService_Reference/Specification/Specification.html) peuvent apparaître ou disparaître pendant une connexion. Surveillez Service Changed et relancez la découverte du service : l'appairage ne garantit pas sa disponibilité permanente.
- Stockez les informations de bonding selon les recommandations du SDK concernant le stockage et les partitions, afin qu'elles restent disponibles après un redémarrage ou une mise à jour OTA.
- Définissez un flux de ré-appairage et « oublier l'appareil » à la fois pour l'UI produit et le côté téléphone.
- Traitez la politique de sécurité (exigences de chiffrement, capacité d'E/S, taille des clés) comme une décision produit, pas comme un défaut à laisser sans examen.

## Multi-connexion et rôles { #multi-connection-and-roles }

Le SDK propose des exemples de **fonctionnement simultané en central et périphérique** et de **plusieurs connexions concurrentes**. Un produit peut se connecter au téléphone comme périphérique BLE et à un capteur comme central, ou maintenir plusieurs connexions avec des appareils compagnons. Vérifiez les combinaisons de rôles et le nombre maximal de connexions pour le composant, le firmware du contrôleur, la configuration du SDK, les tampons et la charge radio totale retenus. Un exemple ne garantit pas la même capacité pour toute la famille.

Si le produit doit approcher le débit maximal de la liaison, utilisez l'exemple de débit du SDK comme référence avant d'attribuer une limitation à votre code applicatif.

## Mises à jour de firmware OTA par Bluetooth { #ota-firmware-updates-over-bluetooth }

Deux chemins de livraison courants existent :

- **Mises à jour de style DFU par BLE**, intégrées à une connexion périphérique (voir l'exemple `peripheral_with_ota` pour la manière dont l'OTA s'imbrique dans un rôle GATT périphérique normal).
- **PAN OTA**, livrant le firmware via une liaison réseau Bluetooth PAN pour les produits bimode utilisant déjà PAN pour les données.

Dans les deux cas, planifiez et testez les partitions, la récupération après un échec et le retour à la version précédente avant la mise en production. Pour une OTA par BLE, évaluez un intervalle de connexion plus court et une latence du périphérique nulle pendant le transfert, puis rétablissez les réglages habituels d'économie d'énergie. PAN OTA utilise le Bluetooth classique : optimisez séparément son débit et sa récupération, sans lui appliquer les paramètres de connexion BLE.

## Coexistence avec d'autres charges de travail { #coexistence-with-other-workloads }

Sur SF32, le Bluetooth partage généralement le système avec les traitements graphiques, l'audio, les capteurs et parfois un Wi-Fi externe. Le processeur Bluetooth dédié prend en charge une grande partie des contraintes de temporisation de la liaison, mais la coexistence au niveau applicatif reste à gérer :

- De longues sections critiques ou des interruptions désactivées sur le processeur applicatif peuvent retarder le traitement Bluetooth côté hôte.
- Le trafic d'écran et de PSRAM entre en concurrence pour la bande passante mémoire avec les tampons audio Bluetooth.
- Des interruptions de capteurs trop fréquentes peuvent réveiller inutilement le processeur applicatif et annuler les économies d'énergie possibles en le laissant dormir pendant que le processeur Bluetooth gère la liaison.

Pour une analyse à l'échelle du système, consultez [Coexistence avec d'autres charges de travail](processor.md#coexistence-with-other-workloads). Testez des combinaisons réalistes correspondant au pire cas (par exemple, écran actif, audio et liaison BLE très sollicitée) plutôt que chaque sous-système séparément.

## RF, interopérabilité et préparation à la certification { #rf-interoperability-and-certification-readiness }

Le firmware Bluetooth doit être validé avec autant de rigueur que le matériel RF :

- Testez plusieurs marques de téléphones, versions de système d'exploitation et scénarios de reconnexion, pas uniquement le téléphone utilisé pour le développement.
- Vérifiez le comportement après des informations de bonding obsolètes, un « oublier l'appareil » côté téléphone, une réinitialisation d'usine côté appareil et une OTA.
- Validez la portée et la stabilité des paquets dans le boîtier final avec la batterie, l'écran, le chargeur et les positions portées ou tenues par l'utilisateur.
- Gardez disponibles les modes de test RF, l'accès à la calibration et les journaux pour la production et le support de certification.
- Pour les produits prenant en charge de nombreux profils, prévoyez du temps pour les essais de qualification et de profil. Le bon fonctionnement d'une application de démonstration ne garantit pas l'interopérabilité.

## Déboguer les problèmes Bluetooth { #debugging-bluetooth-issues }

<div align="center"><em>Tableau : Déboguer les problèmes Bluetooth</em></div>

<div align="center" markdown>

| Symptôme | Zone probable à vérifier |
|:--------|:----------------------|
| Découverte lente ou peu fiable | Intervalle et type d'annonces BLE, implantation RF, adaptation de l'antenne. |
| Déconnexions fréquentes malgré une bonne qualité RF | Délai de supervision trop court, intervalle de connexion inadapté ou interférences liées à la coexistence. |
| Consommation élevée malgré une connexion « au repos » | Latence du périphérique non configurée, réveils trop fréquents du processeur applicatif ou trafic GATT superflu. |
| Artefacts ou coupures audio | Épuisement du tampon DMA (underrun), concurrence avec le trafic écran/PSRAM ou problèmes de temporisation et de configuration propres au transport (BR/EDR pour l'audio classique ; CIS/BIS pour LE Audio). |
| L'appairage échoue par intermittence | Problèmes de stockage de bonding, capacité d'E/S non concordante, informations de bonding obsolètes d'un côté. |
| Bonne portée au banc, mais médiocre dans le boîtier | Désaccord de l'antenne causé par le boîtier, la batterie ou la PCB ; réglage de la puissance TX ou réseau d'adaptation RF. |

</div>

## Erreurs courantes { #common-mistakes }

- Choisir un appareil BLE seul alors que le produit nécessite déjà l'audio Bluetooth classique.
- Réimplémenter inutilement l'infrastructure des services ou faire entrer de force un modèle de données personnalisé dans un profil standard inadapté.
- Laisser la latence du périphérique à 0 pour une liaison qui reste inactive la majeure partie du temps.
- Ignorer les tests de coexistence jusqu'à l'intégration tardive, quand écran/audio/Bluetooth sont combinés pour la première fois.
- Traiter l'appairage et le bonding comme des éléments secondaires, au lieu de concevoir leur parcours utilisateur.
- Reporter la validation RF (antenne, réseau d'adaptation, précision du quartz) jusqu'aux dernières révisions de la PCB.
- Supposer qu'un réglage purement firmware peut compenser une mauvaise disposition RF.

## Liste de contrôle de mise en service { #bring-up-checklist }

- [ ] Confirmer si le produit nécessite le BLE seul ou le Bluetooth bimode, puis sélectionner l'appareil SF32 adapté.
- [ ] Identifier les exemples de profil/service SDK les plus proches pour le cas d'usage du produit.
- [ ] Définir les paramètres d'annonces BLE et de connexion pour la découverte, l'utilisation active et les périodes d'inactivité.
- [ ] Concevoir l'UX d'appairage, de bonding et de la fonction « oublier l'appareil ».
- [ ] Valider la disposition RF, l'adaptation d'antenne et la précision du quartz sur du matériel réel.
- [ ] Tester les profils choisis (services GATT, A2DP/AVRCP/HFP ou diffusion LE Audio) avec un téléphone réel ou un hôte de référence.
- [ ] Tester la coexistence avec l'écran, l'audio et les charges de travail des capteurs sous charge combinée réaliste.
- [ ] Planifier et tester la méthode de mise à jour OTA si le firmware doit être mis à jour par Bluetooth.
- [ ] Mesurer la consommation au repos connecté et vérifier que le processeur applicatif se met en veille comme prévu.

## Points clés à retenir { #key-takeaways }

- Décidez d'abord si le produit nécessite le BLE seul ou le Bluetooth bimode : ce choix détermine l'appareil et une grande partie du travail d'intégration avec le SDK.
- Partez des services GATT et des exemples de profils Bluetooth classiques du SDK (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP, PAN) plutôt que de construire à partir de zéro.
- L'intervalle de connexion, la latence du périphérique, le délai de supervision et la puissance TX sont les principaux leviers pour équilibrer latence, débit et consommation.
- Pour l'audio Bluetooth, vérifiez le rôle Classic ou LE Audio requis sur le composant et la configuration du SDK choisis, puis concevez et testez les tampons et la coexistence. Une affirmation portant sur toute la famille ne remplace pas cette vérification.
- Le Bluetooth est une préoccupation au niveau système : la disposition RF, les horloges, l'UX d'appairage et la coexistence avec les graphiques, l'audio et les capteurs comptent autant que le code GATT lui-même.

Pour un aperçu des projets actuels du SDK en Bluetooth classique, BLE et LE Audio, consultez [Exemples du SDK Bluetooth](bluetooth-sdk-examples.md).

Pour une méthode pratique de mesure et d'analyse de la consommation Bluetooth d'un appareil, voir [Mesurer et analyser la consommation Bluetooth](bluetooth-low-power-profiling.md).
