---
icon: lucide/network
description: "Bluetooth PAN sur SF32 : transport BNEP, rôles NAP/GN/PANU, avantages et limites du partage de connexion, configuration de SiFli-SDK et validation OTA."
tags:
  - Bluetooth
---

# Bluetooth PAN { #bluetooth-pan }

## Vue d'ensemble { #overview }

**Bluetooth PAN** (Personal Area Networking, réseau personnel) permet à un appareil SF32 d'accéder à un réseau IP par une liaison Bluetooth classique. Pour accéder à Internet, il utilise généralement le partage de connexion du téléphone. Cette solution peut éviter l'ajout d'une radio Wi-Fi dédiée. PAN est l'un des profils Bluetooth classiques présentés dans la [Vue d'ensemble Bluetooth](overview.md#classic-bluetooth-profiles) et l'une des options de transport OTA décrites dans [OTA et DFU](../../develop/firmware-topics/ota-dfu.md).

Envisagez PAN pour un trafic IP intermittent ou modéré : météo, synchronisation de l'heure, appels d'API cloud, échanges avec un assistant vocal ou téléchargements de firmware. PAN peut éviter l'ajout d'un sous-système Wi-Fi dédié lorsque le coût, l'encombrement, l'effort d'intégration et la consommation de celui-ci l'emportent sur son intérêt pour le cas d'usage. Évaluez les exigences de conformité RF applicables au matériel choisi et au produit final.

## Comment fonctionne le Bluetooth PAN { #how-bluetooth-pan-works }

Le Bluetooth SIG définit PAN comme un profil Bluetooth Classic (BR/EDR). PAN transporte des paquets au format Ethernet sur une liaison ACL Bluetooth au moyen de **BNEP** (Bluetooth Network Encapsulation Protocol). BNEP fonctionne au-dessus de L2CAP, et non de RFCOMM. PAN nécessite BR/EDR et une implémentation PAN compatible, mais pas la prise en charge de BLE. Un matériel limité à Bluetooth Classic peut donc aussi implémenter PAN.

PAN ne fonctionne pas sur BLE. En revanche, le profil distinct [Internet Protocol Support Profile (IPSP)](https://www.bluetooth.com/specifications/specs/internet-protocol-support-profile-1-0/) permet de transporter IPv6 sur BLE. Cette possibilité du protocole ne prouve pas que SiFli-SDK ou le service de partage de connexion d'un téléphone implémentent IPSP. La comparaison BLE ci-dessous porte sur une application qui relaie les données GATT, pas sur IPSP.

Le profil définit trois rôles :

<div align="center"><em>Tableau : Rôles Bluetooth PAN</em></div>

<div align="center" markdown>

| Rôle | Fonction |
|:-----|:---------|
| **NAP** (Network Access Point) | Relie les appareils Bluetooth connectés à un réseau externe et achemine les paquets entre le piconet Bluetooth et ce réseau. Le téléphone tient généralement ce rôle lorsqu'il partage sa connexion ou active son point d'accès personnel. |
| **PANU** (PAN User) | Rôle client : il se connecte à un NAP (ou à un GN) et utilise son accès réseau. Les appareils SF32 utilisent ce rôle. |
| **GN** (Group Ad-hoc Network) | Achemine les paquets entre les PANU connectés, sans leur fournir d'accès à un réseau externe. Ce rôle sert à créer un réseau ad hoc entre appareils, pas à accéder à Internet. |

</div>

Le PANU peut découvrir les appareils proches par Inquiry et identifier leur service PAN et leur rôle par SDP. L'indication Networking dans Class of Device est un indice de découverte, pas une preuve qu'un service NAP utilisable est disponible. Après l'établissement d'ACL et de BNEP au-dessus de L2CAP, le NAP transmet le trafic vers son réseau externe par pontage ou routage, selon son implémentation. Il peut s'agir d'un téléphone ou d'une passerelle LAN, comme l'indique la [spécification PAN](https://www.bluetooth.com/specifications/specs/personal-area-networking-profile-1-0/). Chaque extrémité peut terminer la connexion ; dans l'architecture avec partage de connexion du téléphone décrite ici, un changement d'état du partage peut nécessiter une reconnexion.

## Quand choisir PAN plutôt que le Wi-Fi { #why-use-pan-instead-of-wi-fi }

<div align="center"><em>Tableau : accès réseau par PAN, Wi-Fi ou BLE</em></div>

<div align="center" markdown>

| Approche | Convient bien quand | Compromis |
|:---------|:---------------|:---------|
| Bluetooth PAN | Le produit utilise déjà le Bluetooth bimode, n'a besoin que d'un trafic IP intermittent ou modéré et dispose généralement d'un téléphone appairé à proximité. | Le débit et la portée dépendent de BR/EDR et de la connexion amont du NAP. Une architecture avec partage de connexion dépend du téléphone ; d'autres architectures peuvent utiliser une passerelle NAP autre qu'un téléphone. |
| Radio Wi-Fi dédiée | Le produit a besoin d'un débit élevé et soutenu ou d'une connectivité indépendante du téléphone. | Ajoute une radio, une antenne, du travail d'intégration et un budget de consommation. Évaluez les exigences de conformité RF applicables à la radio ou au module choisi et au produit final. |
| BLE GATT → application compagnon → Internet | Le produit échange de petites quantités de données que l'application peut transmettre au cloud. | Ce relais personnalisé ne fournit pas de connexion IP directe à l'appareil. BLE IPSP est une autre solution, dont la prise en charge doit être vérifiée dans la pile de l'appareil et la passerelle ; ce n'est pas PAN. |

</div>

Pour un produit qui utilise déjà le Bluetooth bimode pour l'audio, les services GATT ou les profils Bluetooth Classic, PAN permet souvent d'ajouter un accès à Internet à faible coût, sans second sous-système radio. Cette solution suppose toutefois que le produit puisse dépendre d'un téléphone proche capable de partager sa connexion.

## Transport de données sous iOS : relais BLE, Bluetooth Classic et PAN { #ios-data-transport-ble-relay-classic-bluetooth-and-pan }

Il est important de distinguer trois conceptions de connectivité iPhone différentes. Dire « le Bluetooth Classic requiert MFi » sans nuance est trop large : iOS prend en charge les profils Bluetooth standards, et le Partage de connexion lui-même peut utiliser le Bluetooth. La restriction s'applique lorsqu'une application iOS a besoin d'un **canal de données personnalisé** vers un accessoire Bluetooth Classic via le chemin External Accessory/iAP d'Apple. Apple documente qu'External Accessory communique avec les accessoires MFi via Bluetooth, tandis que son [Q&A technique](https://developer.apple.com/library/archive/qa/qa1657/_index.html) indique que les accessoires BLE utilisent Core Bluetooth à la place et ne sont pas tenus d'être conformes MFi.

<div align="center"><em>Tableau : Choix d'architecture pour connecter un accessoire à Internet sous iOS</em></div>

<div align="center" markdown>

| Conception | Liaison entre l'appareil et le téléphone | Conséquences pour le produit iOS | Débit Internet et contraintes de conception |
|:-------|:---------------------|:------------------------|:--------------------------------------------|
| BLE → application → Internet | Protocole GATT personnalisé ; l'application iOS reçoit les données de l'appareil et les transmet au cloud. | Le BLE peut utiliser Core Bluetooth sans passer par la voie MFi d'External Accessory. L'application doit gérer l'appairage, le format des trames, les tentatives répétées, son fonctionnement en arrière-plan et le relais vers le cloud. | La charge utile et la planification des communications BLE dépendent des paramètres de connexion et du comportement d'iOS et de l'application. Cette voie convient souvent aux petits volumes de données intermittents, mais ne constitue pas une liaison IP générale. Pour un trafic continu ou important, elle peut devenir un goulot d'étranglement. |
| Bluetooth Classic personnalisé → application | Canal de données personnalisé entre un accessoire Bluetooth Classic et une application iOS. | Le [framework External Accessory](https://developer.apple.com/documentation/externalaccessory) est destiné aux accessoires MFi. Apple précise qu'il est réservé au matériel MFi ; les profils standard pris en charge constituent un cas distinct. | Cette voie exige un accessoire MFi et son protocole pris en charge, ainsi que l'intégration de l'application et la qualification du produit. Elle ne fournit pas à elle seule de connectivité IP directe à l'appareil. |
| Bluetooth PAN → point d'accès du téléphone → Internet | Connexion PANU-NAP standard ; SF32 utilise le point d'accès personnel ou le partage de connexion Bluetooth du téléphone. | L'appareil utilise le partage de connexion du téléphone, et non un transport personnalisé entre l'application et l'accessoire. Le produit doit aussi valider le téléphone, l'opérateur et le comportement de cette fonction. | SF32 exécute son propre client IP sans relais applicatif. Cela ne démontre aucun avantage de vitesse ni de consommation d'énergie par rapport au BLE. Comparez le débit utile, la durée de mise à jour et l'énergie consommée sur les téléphones visés, avec les mêmes données et le même serveur. Les résultats dépendent du lien Bluetooth, des règles du téléphone, du réseau amont et du serveur de destination. |

</div>

Pour un assistant vocal, un client OTA ou tout autre produit qui nécessite un flux continu ou des échanges HTTP/WebSocket directs, PAN peut remplacer le relais BLE par application après validation de l'iPhone cible et de la configuration du SDK. L'exemple SiFli v2.5.1 active également A2DP pour contourner le problème documenté de connexion à PAN seul sous iOS ; A2DP n'est pas une exigence du protocole PAN. PAN ne remplace **pas** l'application nécessaire à la configuration du produit, à l'authentification des utilisateurs, aux notifications ou au contrôle local ; il évite simplement que le plan de données applicatif soit limité par ce relais applicatif. L'[assistant vocal SF32 Xiaozhi](../../projects/sf32-xiaozhi.md) illustre cette architecture en fonctionnement.

## Prise en charge des appareils SF32 { #device-support-on-sf32 }

Pour SF32, choisissez une famille compatible avec Bluetooth Classic et vérifiez la pile PAN, la version du SDK et la configuration de la carte cible. Les familles compatibles avec PAN du tableau utilisent le Bluetooth bimode : c'est une caractéristique de ces appareils SF32, pas une exigence du protocole PAN.

<div align="center"><em>Tableau : Compatibilité PAN par famille SF32</em></div>

<div align="center" markdown>

| Famille | Capacité Bluetooth | Prise en charge PAN |
|:-------|:----------------------|:-------------|
| SF32LB52x | Bluetooth bimode | Oui |
| SF32LB55x | BLE uniquement | Non — PAN requiert Bluetooth Classic |
| SF32LB56x | Bluetooth bimode | Oui |
| SF32LB57x | Bluetooth bimode | Vérifiez la pile PAN et la carte cible ; cette famille ne figure pas dans l'exemple PAN de la version de référence v2.5.1 |
| SF32LB58x | Bluetooth bimode | Oui |

</div>

Pour d'autres critères de choix entre BLE et Bluetooth bimode, consultez la [Vue d'ensemble Bluetooth](overview.md#choose-ble-classic-or-dual-mode).

## Exemple PAN de SiFli-SDK { #sifli-sdks-pan-example }

SiFli-SDK fournit une implémentation PANU fonctionnelle dans `example/bt/pan`, compatible avec les séries de cartes `eh-lb52x`, `eh-lb56x`, `eh-lb58x` et `sf32lb52/56/58-lcd`. L'exemple se connecte au service PAN (NAP) d'un téléphone et permet de tester le réseau à l'aide de commandes Finsh. Par exemple, `weather` récupère les conditions météorologiques actuelles via la liaison PAN établie. La capture du README présente les champs de la réponse du service météo : `id`, `name`, `country`, `path`, `timezone`, `timezone_offset`, `txt`, `code`, `temperature` et `last_update`. L'exemple indique Chongqing (CN), Asia/Shanghai (+08:00), `多云` (« nuageux », code `4`), une température de `10` et une mise à jour à `2025-01-13T15:54:09+08:00`. Il s'agit de données applicatives, pas de champs PAN/BNEP ; leurs valeurs peuvent varier.

Au démarrage, l'exemple active Inquiry et Page Scan Bluetooth. Le téléphone peut ainsi détecter l'appareil et s'y appairer sous son nom Bluetooth par défaut, `sifli_pan`.

Pour HTTPS, configurez les certificats conformément au [README PAN de v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md). Les certificats CA par défaut se trouvent dans `external/mbedtls_228/certs/default` ; placez les certificats CA supplémentaires nécessaires dans `external/mbedtls_228/certs`. Ils doivent être au format PEM, pas DER : vérifiez la présence de `-----BEGIN CERTIFICATE-----` dans le contenu, sans vous fier uniquement à l'extension. Lorsque `PKG_USING_MBEDTLS_USER_CERTS` est activé dans `proj.conf`, la compilation regroupe les fichiers de ce répertoire dans `ports/src/tls_certificate.c`. Vérifiez les ancres de confiance nécessaires au serveur réel. Une connexion PAN réussie ne prouve pas que le certificat TLS a été validé ; vérifiez l'identité du serveur et l'heure de l'appareil lorsque le contrôle de la période de validité en dépend.

Le README nomme ce répertoire `mbedtls_288`, mais ses captures et le [code de génération des certificats de v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/external/mbedtls_228/SConscript) utilisent `mbedtls_228`. Les chemins ci-dessus suivent l'implémentation. Le script n'accepte que les certificats dont la première ligne commence par `-----BEGIN CERTIFICATE` ; conservez ce format et consultez les avertissements de compilation pour repérer les fichiers ignorés.

<div align="center"><em>Tableau : Commandes Finsh de l'exemple PAN</em></div>

<div align="center" markdown>

| Commande | Effet |
|:--------|:-------|
| `pan_cmd conn_pan` | Se connecter au PAN une fois le partage réseau du téléphone activé. |
| `pan_cmd ota_pan` | Télécharger et installer l'image de firmware spécifiée dans `main.c` via la liaison PAN. |
| `pan_cmd set_retry_flag 1` / `0` | Activer ou désactiver la reconnexion PAN automatique. |
| `pan_cmd set_retry_time N` | Définir le nombre maximal de tentatives de reconnexion automatique. |
| `pan_cmd autoconnect` | Déclencher manuellement une tentative de reconnexion après que le téléphone a coupé puis réactivé le partage. |

</div>

Avant d'exécuter l'exemple, vérifiez ces réglages dans le README de la version indiquée et pour votre plateforme cible :

- Activez `CONFIG_BLUETOOTH`, `CONFIG_BT_PROFILE_CUSTOMIZE`, `CONFIG_CFG_PAN` et `CONFIG_BSP_BT_CONNECTION_MANAGER`. L'exemple active aussi A2DP pour contourner le problème documenté d'iOS lors d'une connexion PAN seule ; A2DP n'est pas une exigence du protocole PAN.
- `CONFIG_BT_FINSH` active les commandes optionnelles de contrôle Bluetooth. Conservez les fonctions du shell nécessaires aux commandes à tester.
- Réglez `CONFIG_BSP_BLE_NVDS_SYNC` selon le processeur qui exécute Bluetooth : le README l'active pour HCPU et le désactive pour LCPU. Ne recopiez pas telle quelle une configuration dont la répartition entre processeurs est différente.
- Pour reconnecter le dernier appareil, vérifiez `CONFIG_BT_AUTO_CONNECT_LAST_DEVICE` et `CONFIG_PKG_USING_FLASHDB`. Validez la conservation des réglages après redémarrage et limitez les tentatives à l'aide des commandes de reconnexion du tableau précédent, plutôt que de réessayer indéfiniment.

## Compatibilité des systèmes mobiles et validation produit { #mobile-phone-os-support-and-qualification }

Le téléphone joue le rôle de **NAP** et fait partie du chemin réseau du produit ; ce n'est pas un simple outil de configuration. Son système d'exploitation, son modèle, le forfait de l'opérateur et les règles de partage de connexion font partie de la configuration produit à prendre en charge. Un appairage Bluetooth réussi ne suffit pas : le téléphone doit fournir un service PAN par Bluetooth et acheminer le trafic après la connexion du PANU.

<div align="center"><em>Tableau : Compatibilité Bluetooth PAN selon le système mobile</em></div>

<div align="center" markdown>

| Système mobile | Informations documentées par la plateforme | Conseils de mise en service SF32 | Points à valider pour le produit |
|:----------|:----------------------------|:-----------------------|:-------------------------------|
| **iOS / iPadOS avec service cellulaire** | La [documentation Apple sur le partage de connexion](https://support.apple.com/guide/iphone/share-your-internet-connection-iph45447ca6/27/ios/27) cite le Bluetooth comme méthode de connexion et précise que cette fonction partage la connexion Internet mobile du téléphone. | Suivez les [étapes iOS de SiFli Xiaozhi](https://docs.sifli.com/projects/xiaozhi/get-started/) : utilisez un téléphone avec un service cellulaire actif, activez le Partage de connexion avant l'appairage, laissez le Bluetooth activé, puis appairez et connectez l'appareil SF32 au téléphone. Si `sifli-pan` n'apparaît pas, le guide SiFli indique qu'un redémarrage du téléphone peut aider. | La disponibilité du Partage de connexion, les limites de données et le nombre d'appareils connectés dépendent de l'opérateur et du modèle d'iPhone. Testez chaque version d'iOS/iPadOS, catégorie d'appareil et forfait pris en charge. Ne déduisez pas la compatibilité PAN du seul fonctionnement du point d'accès Wi-Fi. |
| **Android** | [Aide Android](https://support.google.com/android/answer/9059108) indique que la plupart des téléphones Android peuvent partager leurs données mobiles par Bluetooth : appairez d'abord les appareils, configurez la connexion réseau Bluetooth de l'autre appareil, puis activez le **partage de connexion Bluetooth**. | Activez le partage de connexion Bluetooth avant `pan_cmd conn_pan`. Le nom et l'emplacement des réglages varient selon le fabricant, la version d'Android et les règles de l'entreprise ; notez le chemin exact pour chaque téléphone testé. | Selon Google, la fonction est disponible sur la *plupart* des téléphones Android, mais pas tous. Les opérateurs peuvent limiter ou facturer le partage de connexion, et les fabricants peuvent masquer ou modifier le réglage. Testez les combinaisons téléphone/OS/opérateur prévues pour le produit au lieu de vous fier à la seule version d'Android. |
| **HarmonyOS et autres systèmes mobiles dérivés d'Android** | Ce guide ne formule aucune affirmation générale de compatibilité PAN pour ces plateformes. Leurs fonctions Bluetooth et de partage de connexion peuvent dériver d'Android, mais varier selon le modèle, le marché, la version, la configuration de l'opérateur ou les règles de gestion de l'appareil. | Recherchez le réglage de partage de connexion Bluetooth, appairez le téléphone et l'appareil SF32, puis vérifiez qu'un trafic IP réel passe avec l'exemple PAN. | Considérez chaque combinaison précise de téléphone, version d'OS, région et opérateur comme **à valider** tant qu'elle n'a pas passé les mêmes essais que les appareils Android. N'annoncez pas sa compatibilité sur la seule base de la marque ou d'un appairage Bluetooth réussi. |

</div>

### Configuration sur le téléphone { #phone-side-setup }

<div align="center"><em>Figure : Emplacement indicatif des réglages de partage de connexion sur iOS et Android</em></div>

![Exemples des réglages de partage de connexion sur iOS et Android](assets/mobile-hotspot-switches-illustrative.png)

Cette illustration indique où chercher les réglages ; ce n'est pas une capture d'écran réelle du système. Leur libellé et leur emplacement varient selon la version d'iOS/iPadOS, le fabricant Android et les règles de gestion du téléphone. Recherchez **Autoriser d'autres personnes à se connecter** sous iOS/iPadOS ou l'option de **partage de connexion Bluetooth** sous Android. La [capture iOS de SiFli v2.5.1](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/bt/pan/README.md) montre également l'option **Maximize Compatibility** activée. Il s'agit d'un réglage illustratif, pas d'une exigence PAN ; vérifiez s'il est nécessaire sur chaque téléphone cible.

Suivez ces étapes pour chaque téléphone testé :

1. Vérifiez la connexion amont du téléphone. Le partage de connexion d'Apple utilise les données cellulaires ; assurez-vous que l'opérateur l'autorise. Certains téléphones Android peuvent aussi partager une connexion Wi-Fi, mais cette possibilité doit être vérifiée sur le modèle et la version exacte du système.
2. Activez le partage de connexion Bluetooth ou le Point d'accès personnel du téléphone **avant** de demander une connexion PAN depuis l'appareil SF32.
3. Appairez le téléphone et l'appareil, en gardant le téléphone découvrable lorsque l'OS l'exige.
4. Exécutez `pan_cmd conn_pan`, puis vérifiez un échange IP réel, par exemple avec la commande `weather`. Une connexion Bluetooth réussie ne suffit pas.
5. Désactivez le partage de connexion, mettez le téléphone en veille puis réactivez-le, et éloignez-le hors de portée. Vérifiez que le produit se reconnecte comme prévu.

Si le partage n'est activé qu'après que la connexion Bluetooth est déjà établie, reconnectez explicitement le PAN avec `pan_cmd conn_pan`.

### Définir la matrice des téléphones pris en charge par le produit { #define-a-shipping-phone-support-matrix }

Pour un produit grand public, publiez les combinaisons prises en charge **modèle de téléphone + version d'OS + opérateur/région**, plutôt qu'une simple mention « iOS » ou « Android ». Pour chaque modèle testé, consignez au minimum : modèle, build de l'OS, opérateur, service cellulaire actif et état de la SIM/eSIM, nom du réglage de partage de connexion, délai de première connexion, reconnexion après verrouillage de l'écran ou perte de la liaison radio, résultat avec un trafic soutenu et actions nécessaires pour rétablir le service. Reprenez ces essais après toute modification de l'application, du firmware PAN, de l'OS du téléphone ou du profil opérateur.

## Mise à jour OTA via PAN { #pan-based-ota-delivery }

Dans l'exemple PAN, OTA est activé par défaut. `pan_cmd ota_pan` télécharge et installe une image de firmware par la même liaison Bluetooth PAN que celle utilisée pour le réseau, selon le chemin DFU_PAN OTA décrit avec le service de mise à jour de firmware de SiFli-SDK. Cette solution convient aux produits qui utilisent déjà PAN pour leurs données et n'ont pas besoin d'un second transport OTA. Consultez [OTA et DFU](../../develop/firmware-topics/ota-dfu.md) pour comparer PAN à BLE et aux autres transports de mise à jour ; quel que soit le transport, prévoyez un mécanisme de retour arrière et de récupération.

Le README décrit aussi un échec de compilation lorsque la cible choisie ne possède pas de `ptab.json` adapté à OTA. Ses captures montrent comment désactiver le sous-projet DFU et le support de mise à jour du middleware pour tester l'exemple sans OTA. Ce diagnostic supprime OTA ; il ne permet pas de commercialiser un produit qui doit être mis à jour. Fournissez et validez la disposition des partitions et la configuration de mise à jour correctes avant d'activer ce transport.

PAN fournit un transport, pas une garantie d'authenticité du firmware ou de récupération. Avant la commercialisation, validez l'authentification du serveur, l'authenticité et l'intégrité de l'image, la compatibilité de cible et de version et la récupération après interruption. Testez les pertes de connexion et les coupures d'alimentation, puis vérifiez le comportement réel de récupération ou de retour arrière du bootloader ; ne supposez pas que la commande de téléchargement fournit ces protections.

## Exemple de produit SF32 utilisant PAN { #a-real-sf32-product-using-pan }

Le projet [assistant vocal SF32 Xiaozhi](../../projects/sf32-xiaozhi.md) est un exemple fonctionnel de PAN sur SF32 : l'appareil accède à Internet via un téléphone appairé et transmet les échanges vocaux à un service cloud par cette liaison. Le projet montre comment un produit intègre la connectivité PAN, le trafic applicatif WebSocket/HTTP et sa dépendance au partage de connexion du téléphone.

## Dépannage { #troubleshooting }

Le README recommande aussi de contrôler l'attribution de l'adresse Bluetooth. Lisez l'adresse avec `nvds get_mac`. Utilisez uniquement un OUI attribué à votre organisation ou autorisé pour le produit, avec une adresse unique par appareil ; ne copiez pas l'OUI d'un autre fabricant depuis un exemple. Dans `nvds update addr 6 xxxxxxYYYYYY`, `YYYYYY` est l'OUI avec l'ordre des octets inversé et `xxxxxx` représente les trois autres octets. Respectez l'ordre des octets de la commande au lieu de coller telle quelle une adresse MAC affichée.

`CONFIG_NVDS_AUTO_UPDATE_MAC_ADDRESS` peut écraser une modification manuelle. Si une adresse de test autorisée n'est pas conservée, le README recommande de désactiver cette option, de recompiler et de flasher à nouveau le firmware, puis de définir à nouveau l'adresse. Il s'agit d'un diagnostic de test, pas d'une politique d'attribution en production : validez après redémarrage la politique automatique ou de programmation en usine retenue avant la commercialisation.

<div align="center"><em>Tableau : Dépannage du Bluetooth PAN</em></div>

<div align="center" markdown>

| Symptôme | Vérifications et actions |
|:--------|:--------------|
| Le PAN se connecte mais les commandes réseau (par ex. `weather`) échouent | Vérifiez l'établissement de BNEP, l'adresse IP attribuée, la route, DNS, la disponibilité du serveur et, le cas échéant, les erreurs TLS. Le README recommande aussi de contrôler l'OUI de l'adresse MAC Bluetooth avec `nvds get_mac` ; ne le modifiez avec `nvds update addr 6 ...` que selon une politique d'attribution autorisée. Un OUI invalide n'est pas la seule cause possible. |
| Le téléphone ne détecte pas l'appareil ou ne parvient pas à s'y connecter | Vérifiez que le partage de connexion du téléphone est activé *avant* la connexion et que l'appareil est détectable (Inquiry/Page Scan actifs). |
| Le téléphone s'appaire, mais `weather` ou une autre opération IP échoue | L'appairage ne prouve pas la présence d'un service PAN NAP. Vérifiez le partage de connexion Bluetooth ou le Point d'accès personnel et la connexion amont. Pour les données cellulaires, confirmez l'autorisation de l'opérateur ; pour le partage Wi-Fi sous Android, vérifiez le modèle et l'OS exacts. Comparez la combinaison testée à la matrice de compatibilité. |
| Le PAN est interrompu après un changement d'état réseau du téléphone | Cela peut arriver ; validez le comportement sur chaque téléphone pris en charge. Rétablissez la connexion avec `pan_cmd conn_pan` ou activez `pan_cmd set_retry_flag 1`, en utilisant la limite de tentatives décrite plus haut pour borner les reconnexions automatiques. |
| La mise à jour OTA via PAN échoue en cours de transfert | Procédez comme pour tout autre transport OTA : vérifiez l'URL de l'image, la disposition des partitions et le mécanisme de retour arrière décrit dans [OTA et DFU](../../develop/firmware-topics/ota-dfu.md), sans incriminer PAN par défaut. |

</div>

## Liste de contrôle de mise en service { #bring-up-checklist }

- [ ] Vérifier le matériel Bluetooth Classic et la pile/configuration PAN pour le SDK et la carte précis. L'exemple de référence liste SF32LB52x/56x/58x ; valider SF32LB57x séparément. SF32LB55x ne prend en charge que BLE.
- [ ] Déterminer si la dépendance de PAN au partage de connexion du téléphone convient au produit ou si une radio Wi-Fi dédiée est nécessaire.
- [ ] Mettre en service `example/bt/pan` sur la carte cible et vérifier le partage de connexion côté téléphone (Point d'accès personnel sous iOS/iPadOS ou partage Bluetooth sous Android).
- [ ] Valider de bout en bout une connexion PAN réelle et au moins une opération réseau, par exemple la commande `weather` de l'exemple.
- [ ] Tester chaque modèle de téléphone, build d'OS, combinaison région/opérateur et chemin de réglage prévu. Ne pas annoncer une compatibilité générale « iOS/Android » sans ces essais.
- [ ] Vérifier que l'OUI de l'adresse MAC Bluetooth de l'appareil est valide avant d'utiliser les fonctions réseau.
- [ ] Si PAN sert au transport OTA, tester entièrement `pan_cmd ota_pan`, y compris le retour arrière, avant la mise sur le marché.
- [ ] Définir le comportement de reconnexion et de reconnexion automatique (`set_retry_flag`, `set_retry_time`) selon la fréquence à laquelle le téléphone doit se trouver à portée.

## Points clés à retenir { #key-takeaways }

- Bluetooth PAN transporte du trafic IP ou de type Ethernet sur BR/EDR, par BNEP au-dessus de L2CAP. BLE n'est pas requis. IPv6 sur BLE utilise le profil distinct IPSP, pas PAN, et nécessite une pile et une passerelle dont la compatibilité a été vérifiée.
- Les appareils SF32 utilisent le rôle client **PANU** et se connectent généralement à un téléphone jouant le rôle de **NAP** via le partage de connexion ou le Point d'accès personnel.
- Sous iOS, les accessoires BLE peuvent utiliser Core Bluetooth sans MFi. En revanche, un canal de données personnalisé entre une application et un accessoire Bluetooth Classic via External Accessory/iAP relève du programme MFi. PAN utilise le partage de connexion du téléphone pour permettre à l'appareil SF32 d'utiliser son propre client IP plutôt que de faire relayer les données par une application BLE.
- L'exemple PAN de référence liste les cibles SF32LB52x/56x/58x. SF32LB57x dispose d'un matériel bimode, mais sa pile PAN et sa carte nécessitent une validation distincte ; SF32LB55x ne prend en charge que BLE et ne peut pas utiliser PAN.
- `example/bt/pan` de SiFli-SDK est une implémentation de référence fonctionnelle avec des commandes Finsh pour se connecter, rétablir la connexion et effectuer une mise à jour OTA via PAN.
- Le PAN avec partage de connexion convient à un trafic IP intermittent ou modéré lorsque le téléphone se trouve généralement à proximité. Pour un débit élevé soutenu ou un fonctionnement indépendant du téléphone, évaluez une radio Wi-Fi dédiée ou une autre voie réseau indépendante ; une passerelle NAP autre qu'un téléphone est également possible.
