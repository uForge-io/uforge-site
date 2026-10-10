---
icon: lucide/bluetooth-connected
title: "Exemples du SDK Bluetooth"
description: "Choisissez l'exemple du SiFli-SDK adapté aux services BLE, aux profils Bluetooth classiques, à l'intégration avec un téléphone, à l'OTA, au transfert de données ou à la diffusion LE Audio."
tags:
  - Bluetooth
  - Exemples
---

# Exemples du SDK Bluetooth { #bluetooth-sdk-examples }

Les exemples Bluetooth du SiFli-SDK constituent des points de départ ciblés pour un profil, un rôle ou un scénario radio ; ils ne sont pas des firmwares prêts à intégrer dans un produit. Commencez par le projet qui couvre l'exigence technique la plus exigeante du produit. Faites d'abord fonctionner l'exemple sans modification sur la carte cible, puis ajoutez les exigences du produit une par une.

Cette page classe par tâche d'ingénierie les exemples de [Bluetooth classique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), de [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html) et de [diffusion LE Audio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) présentés dans la documentation SF32LB58x. Le chemin `sf32lb58x` indique où la documentation est classée ; il ne garantit pas que chaque exemple fonctionne sur toutes les cartes SF32LB58x ni sur d'autres familles SF32. L'URL `latest` évolue. Pour la version ou le commit du SDK envisagé, consultez la section **Supported Platforms** de la page du projet concerné et utilisez uniquement les noms de cartes et instructions de compilation qui y figurent. Si la prise en charge de la carte et de la révision du SDK n'est pas explicitement établie, indiquez qu'elle est **non vérifiée** ; ne la déduisez ni de l'URL, ni d'un autre exemple, ni d'une carte au nom similaire. Même si la page indique « all platforms », vérifiez l'exemple avec la révision exacte du SDK et la configuration de la carte avant tout travail produit. La page de chaque projet indique également les paramètres `menuconfig`, le matériel de test et les limites.

## Commencer par la bonne voie Bluetooth { #start-with-the-right-bluetooth-path }

<div align="center"><em>Tableau : Sélection d'exemples SDK Bluetooth</em></div>

<div align="center" markdown>

| Besoin du produit | Commencer par | À valider avant l'intégration au produit |
|:-------------|:-----------|:-------------------------------------|
| Un service BLE personnalisé ou une liaison avec une application compagnon | [Périphérique BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Annonces, connexion, interface et comportement du service, reconnexion et validation avec le téléphone |
| L'appareil doit agir à la fois comme périphérique pour le téléphone et comme central pour un capteur | [Central et périphérique BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Rôles GAP simultanés et répartition des rôles client et serveur GATT |
| Transfert de données BLE fiable | [Débit BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) ou [Transfert de fichiers BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | Le flux de charge utile requis, les réglages de connexion et le comportement de récupération |
| Mise à jour du firmware Bluetooth | [Périphérique avec OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) ou [Central et périphérique avec OTA Pingpong](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Rôles de mise à jour, reprise après interruption de la mise à jour, partitions et stratégie de retour arrière |
| Liaison série ou accès réseau via le téléphone en Bluetooth classique | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) ou [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | Le profil série ou l'accès réseau fourni par le téléphone, la compatibilité avec l'appareil pair et le comportement de reconnexion |
| Transport HCI sur UART entre l'hôte et un contrôleur BT/BLE | [HCI sur UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | La frontière hôte/contrôleur, le transport UART et la configuration du contrôleur et de la carte cibles |
| Audio ou appels en Bluetooth classique | [Récepteur de musique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Émetteur de musique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) ou [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Routage audio, synchronisation d'horloge, gestion des tampons, interopérabilité avec le téléphone et budget énergétique |
| Diffusion LE Audio | [Émetteur de diffusion BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) ou [Récepteur de diffusion BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Rôle de diffusion, chaîne audio, récepteur ou émetteur de test et marge temporelle |

</div>

## Faire fonctionner un exemple pour établir une base de validation { #bring-up-an-example-as-evidence }

Avant de modifier le projet, consignez la version exacte du SDK, le nom de la carte, la configuration, l'appareil pair ou l'application, les paramètres radio et les journaux attendus. Suivez ensuite ces étapes :

1. Compilez et flashez l'exemple sans modification avec le nom exact de la carte et les instructions indiqués pour la version correspondante du SDK. Si le lien entre la documentation et la révision du SDK, ou la prise en charge de la carte, n'est pas établi, considérez la compatibilité comme non vérifiée avant toute adaptation.
2. Vérifiez le comportement radio principal : découverte, connexion, transfert, diffusion ou réception, selon le cas.
3. Répétez le test après une réinitialisation, une déconnexion, une reconnexion et un cycle complet d'arrêt et de remise sous tension.
4. Ajoutez une seule exigence produit à la fois : service, parcours utilisateur, chemin audio ou politique de consommation.
5. Retestez le système sous la charge combinée du produit, avec l'écran, les capteurs, le stockage, l'audio et, le cas échéant, les transitions basse consommation.

Un exemple fonctionnel ne démontre que le scénario qu'il couvre. Il ne prouve pas que la politique de sécurité, la portée radio, la latence, la consommation électrique ou l'interopérabilité du produit sont prêtes pour la mise en production.

## Exemples BLE { #ble-examples }

Utilisez les exemples BLE pour les liaisons avec une application compagnon, les services GATT interopérables, les balises, le transfert de données et l'OTA basé sur BLE. Sélectionnez d'abord un exemple orienté rôle, puis ajoutez un exemple de profil uniquement lorsque le produit a besoin de ce service standardisé.

<div align="center"><em>Tableau : Exemples du SDK BLE par tâche d'ingénierie</em></div>

<div align="center" markdown>

| Tâche d'ingénierie | Exemples officiels | Ce que ces projets permettent de valider |
|:-----------------|:------------------|:--------------------------------|
| Rôles fondamentaux et accès aux services | [Périphérique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central et périphérique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Connexions multiples](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Annonces, balayage, gestion des connexions et répartition correcte des rôles central/périphérique |
| Intégration téléphone | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [ANCS sur deux cœurs](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Intégration média ou notification Apple et le flux d'appairage requis côté téléphone |
| Profils GATT standards | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | Le rôle du service, la spécification des caractéristiques GATT et l'interopérabilité du profil standard avec l'appareil pair |
| Périphériques d'entrée et interphonie | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [Interphonie BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | Le modèle d'interaction avant d'ajouter l'UI produit ou le comportement vocal |
| Comportement d'appairage et de reconnexion | [Appairage BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Conservation des clés d'appairage (bonding), gestion de l'identité et procédure de nouvel appairage du produit |
| Annonces et découverte | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Annonces périodiques](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Synchronisation des annonces périodiques](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | Le comportement de diffusion ou de synchronisation requis sans supposer une connexion GATT |
| Transfert de données et OTA | [Transfert de fichiers](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Débit](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Périphérique avec OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central et périphérique avec OTA Pingpong](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Charge utile, paramètres de liaison, rôles de mise à jour, reprise après interruption du transfert et validation de bout en bout |

</div>

Les résultats d'un test de débit ne préjugent pas du débit de données du produit. Ils dépendent de la PHY sélectionnée, des réglages de connexion, du comportement de l'appareil pair, de l'environnement RF, de l'activité hôte et du modèle de charge utile. De même, un exemple ANCS ou AMS sert de base à l'intégration avec un téléphone ; il ne garantit pas le même comportement pour chaque version d'iOS ni selon les autorisations accordées par l'utilisateur.

## Exemples de Bluetooth classique { #classic-bluetooth-examples }

Les projets Bluetooth classique conviennent aux produits qui nécessitent des profils BR/EDR, de l'audio, un transport série ou une connexion IP via un téléphone. Une démonstration réussie sur une carte de développement n'est qu'un point de départ ; validez l'interopérabilité avec les appareils pairs et les charges réelles du produit.

<div align="center"><em>Tableau : Exemples du SDK Bluetooth classique par tâche d'ingénierie</em></div>

<div align="center" markdown>

| Tâche d'ingénierie | Exemples officiels | À valider avec ces projets |
|:-----------------|:------------------|:--------------------------------|
| Transport hôte/contrôleur ou profil série Bluetooth classique | [HCI sur UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | La frontière hôte/contrôleur et le transport UART pour HCI, ou le comportement du profil série SPP |
| Streaming audio et contrôle des médias | [Connexions multiples A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [Partage audio A2DP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [Pochette d’album AVRCP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Récepteur de musique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Récepteur de musique avec retransmission](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Émetteur de musique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | Topologie émetteur/récepteur visée, routage audio, chemin de contrôle média et budget de ressources |
| Appels et liaisons vocales | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [Retransmission HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Topologie d'appel, latence audio, chemin micro/haut-parleur et comportement du téléphone |
| Réseau et OTA via le téléphone | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Partage de connexion du téléphone, trafic IP, reconnexion et chemin de transfert OTA |

</div>

Pour le modèle réseau PAN et sa configuration côté téléphone, consultez [Bluetooth PAN](pan.md). Pour le routage audio, la gestion des tampons et la validation en charge du système, consultez [Vue d’ensemble de l’audio](../audio/overview.md) et [Audio Server et mise en tampon](../audio/audio-server-buffering.md).

## Exemples de diffusion LE Audio { #le-audio-broadcast-examples }

Le chemin de documentation `sf32lb58x` ne suffit pas à établir la compatibilité d'une carte ; consultez la section **Supported Platforms** pour la révision exacte du SDK et la carte cible. Dans l'exemple reliant Bluetooth classique et BAP, le titre du README désigne un émetteur, mais le chemin et la présentation décrivent un récepteur. L'[implémentation dans la révision du SDK examinée](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) traite A2DP en Bluetooth classique et démarre une source de diffusion BAP. Ce constat vaut uniquement pour le commit indiqué et ne s'applique pas automatiquement à toutes les versions servies sous `latest`. Avant de compiler, vérifiez le README, le code source et la configuration de la carte pour la version ou le commit exact du SDK utilisé. Ne déduisez ni le rôle ni la compatibilité de la carte de la description copiée du récepteur.

Les projets `zbt` proposent des exemples d'émetteur et de récepteur en diffusion LE Audio, fondés sur le [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Évaluez-les ensemble dans un même test système : la configuration de diffusion, la source audio, le récepteur, la synchronisation d'horloge et les conditions RF influent sur le résultat.

<div align="center"><em>Tableau : Exemples du SDK de diffusion LE Audio</em></div>

<div align="center" markdown>

| Scénario d'utilisation | Exemple officiel | À valider en premier |
|:------------------|:-----------------|:------------------------|
| Recevoir un flux audio diffusé | [Récepteur de diffusion BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Comportement du récepteur, chemin audio de sortie et la configuration de diffusion de test |
| Émettre un flux audio diffusé | [Émetteur de diffusion BAP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Chaîne audio source, configuration de diffusion et récepteur de référence dont le fonctionnement est vérifié |
| Faire le pont entre le Bluetooth classique et la diffusion LE Audio | [Émetteur de diffusion BAP avec Bluetooth classique](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | Les deux chaînes de traitement audio, leur point de transfert et les marges temporelles et de ressources en fonctionnement simultané |

</div>

## Validation produit au-delà de l'exemple { #product-validation-beyond-the-example }

<div align="center"><em>Tableau : Vérifications d'adaptation produit des exemples Bluetooth</em></div>

<div align="center" markdown>

| Domaine de vérification | À préserver de l'exemple source | À revalider pour le produit |
|:---------|:---------------------------------|:----------------------------|
| Comportement radio | La carte prise en charge et le rôle ou profil prévu de l'exemple | Antenne, boîtier, portée, coexistence RF, appareils correspondants et plan d'essais de conformité réglementaire |
| Politique de connexion | Le flux d'annonces, de scan ou de connexion de base | Latence produit, objectif de consommation électrique, stratégie de reconnexion et transitions d'état |
| Sécurité | La configuration d'appairage ou de bonding de l'exemple | Exigences d'authentification, stockage des clés, confidentialité, réinitialisation d'usine et récupération côté utilisateur |
| Données et audio | Le flux de paquet ou de diffusion démontré | Format des données et règles d'échange, récupération d'erreur, latence, mise en tampon, configuration du codec et marge mémoire |
| Éléments de validation | Paramètres de compilation, journaux et comportement attendu | Matrice reproductible téléphone/accessoire, courbe de consommation électrique, récupération après déconnexion et tests de non-régression |

</div>

## Ressources associées { #related-resources }

- [Vue d'ensemble Bluetooth](overview.md) pour les choix de rôle, profil, sécurité, paramètres de connexion et coexistence au niveau produit.
- [Processeur Bluetooth](processor.md) pour les limites hôte/contrôleur et la consommation énergétique.
- [Bluetooth PAN](pan.md) pour le réseau IP via téléphone et l'OTA basée sur PAN.
- [Exemples audio du SDK](../audio/audio-sdk-examples.md) pour les exemples de capture locale, de codec et de lecture qui complètent le travail audio Bluetooth.
- [Exemples](../../develop/examples/index.md) pour le catalogue d'exemples SDK inter-domaines.
