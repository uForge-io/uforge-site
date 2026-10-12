---
icon: lucide/audio-lines
description: "Guide pratique d'Audio Server et des tampons DMA sur SF32 : lecture et enregistrement sans coupure, en coexistence avec le Bluetooth et les traitements graphiques."
tags:
    - Audio
---

# Audio Server et mise en tampon { #audio-server-and-buffering }

Après avoir choisi l'interface audio et défini son usage dans le produit à partir de la [Vue d'ensemble de l'audio](overview.md), consultez cette page pour comprendre la collaboration à l'exécution entre le code applicatif, les sessions Audio Server, les tampons DMA et la chaîne audio matérielle.

**Périmètre des comportements propres au SDK :** les détails d'API ci-dessous sont documentés pour SF32LB52x dans la version actuelle du SDK SiFli. Vérifiez-les dans `audio_server.h`, l'implémentation et la configuration de la famille de puces et de la version du SDK visées. Les conseils sur la taille des tampons, l'ordonnancement et le cache relèvent des pratiques d'ingénierie ; Audio Server ne garantit pas un comportement ni une propriété des tampons identiques sur toutes les cibles.

## Responsabilités de session { #session-ownership }

Séparez la logique de contrôle de l'application du mécanisme de transmission. L'application décide du démarrage et de l'arrêt de la lecture ou de l'enregistrement, ainsi que de la gestion des changements d'état. Audio Server coordonne la session, le DMA transfère les blocs d'échantillons et le pilote configure le matériel. Pendant un flux actif, l'interface utilisateur, les callbacks Bluetooth et les opérations de lecture du système de fichiers ne doivent pas manipuler directement les registres du codec.

<div align="center"><em>Tableau : Responsabilités liées aux tampons</em></div>

<div align="center" markdown>

| Frontière de responsabilité | Responsable | Point à vérifier |
|:---------|:------|:----------------|
| Données source | Application, décodeur ou tâche de stockage | La file de lecture peut-elle être alimentée avant de se vider ? |
| Cache d'écriture Audio Server, s'il est configuré | Audio Server ; taille définie par la configuration de l'application | `write_cache_size` est-il valide pour ce SDK ? L'application traite-t-elle chaque résultat de `audio_write()` ? |
| Tampon en cours de transfert | Pilote DMA/audio | Reste-t-il stable et cohérent avec le cache pendant tout le transfert ? |
| Tampon après le transfert | Application ou tâche de traitement | Les données de lecture sont-elles renouvelées, ou les données capturées traitées, avant que le DMA réutilise cette zone ? |
| État de session | Audio Server et politique applicative | Les demandes répétées de démarrage, d'arrêt, de gestion d'erreur et de fermeture évitent-elles de fermer ou de libérer deux fois les ressources ? |

</div>

## Choisir une stratégie de tampon { #choose-a-buffer-strategy }

Si le pilote le permet, le double tampon est un bon point de départ : le DMA transfère une zone pendant que le logiciel prépare les données de lecture ou traite les données capturées dans l'autre. Distinguez la file PCM de l'application du tampon DMA du pilote. Une écriture vers Audio Server ne prouve pas, à elle seule, que le transfert DMA se fait sans copie.

N'augmentez la capacité de la file que si la latence du stockage, le temps de décodage, la gigue du transport Bluetooth ou les variations d'ordonnancement l'exigent. La capacité consomme de la mémoire ; la quantité d'audio réellement en attente détermine le temps d'attente. Réserver davantage de tampons n'augmente pas automatiquement la latence. Utilisez les calculs par trames de la [Vue d'ensemble de l'audio](overview.md#buffer-and-latency-budget), en tenant compte du nombre de canaux et des octets stockés par échantillon.

Mesurez la durée du bloc, le temps maximal de préparation ou de traitement et la latence de bout en bout acceptable. Déterminez chaque échéance à partir des notifications du pilote cible pour le remplissage du tampon et la fin du transfert, ainsi que de l'ordre de réutilisation des tampons. Si le pilote propose des callbacks de demi-transfert et de transfert complet, planifiez le traitement autour de ces transitions ; ne considérez pas la fin du transfert en cours comme l'unique échéance. Les données de lecture doivent être prêtes avant que le DMA en ait besoin ; les données enregistrées doivent être traitées ou copiées avant qu'il ne les écrase. Prévoyez une marge d'ordonnancement et recherchez la cause de tout manque de données dans le tampon de lecture (underrun) et de tout débordement du tampon d'enregistrement (overrun), même si ces cas sont rares.

Pour la mémoire que l'application ou le pilote transmet directement au DMA, respectez les règles de cache et de propriété de la cible : nettoyez les lignes de cache modifiées contenant les données de lecture avant que le DMA ne lise ces données, préparez les tampons de réception selon les exigences de la cible et invalidez le cache des données capturées avant leur lecture par le CPU si nécessaire. Ces opérations dépendent du SoC, de la région mémoire et de l'API du pilote. N'effectuez pas de maintenance manuelle du cache pour les tampons appartenant à Audio Server ou au pilote, sauf si l'API concernée l'exige. Ne modifiez, ne libérez et ne réutilisez pas une zone tant que le DMA en est propriétaire.

La [documentation Audio Server pour SF32LB52x](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/multimedia.html) indique que les callbacks s'exécutent dans le thread Audio Server et qu'un callback de `audio_open()` ne doit pas appeler `audio_close()`, car cela peut provoquer un interblocage. Limitez la durée des callbacks et confiez les accès au stockage ou les traitements bloquants à un thread de travail. Le callback de capture reçoit un pointeur et la longueur d'une trame audio ; la documentation citée ne précise pas combien de temps ce pointeur reste valide après le callback. Copiez les données avant le retour, sauf si le SDK cible garantit explicitement une durée de validité plus longue.

La même documentation SF32LB52x décrit les valeurs de retour de `audio_write()` suivantes :

<div align="center"><em>Tableau : Résultats documentés de audio_write() (SF32LB52x)</em></div>

<div align="center" markdown>

| Valeur de retour | Signification documentée |
|:-----------------|:-------------------------|
| `> 0` | La valeur est égale à `data_len` ; les données ont été acceptées dans le cache d'écriture. |
| `0` | Le cache d'écriture est plein. Une requête supérieure à la capacité configurée est également rejetée avec `0`. |
| `-1` | Le client est en pause ou suspendu ; les données envoyées sont abandonnées. |
| `-2` | Paramètre invalide. |

</div>

Dans cette API, `write_cache_size` est limité à `0x7FFF` octets et le guide recommande une capacité au moins égale au double des données d'un appel à `audio_write()` pour son schéma d'écriture ping-pong. Il s'agit du cache logiciel d'Audio Server, et non d'une garantie sur la disposition physique des tampons DMA du pilote. Vérifiez ces limites pour le SDK cible. La priorité des clients, le mixage et les chemins audio disponibles dépendent aussi de la configuration ; ouvrir une session ne garantit pas que toutes les interfaces de la puce soient exposées par Audio Server.

## Valider sous une charge produit réelle { #validate-under-product-load }

Testez la session avec les charges simultanées du produit : rafraîchissement de l'écran, notifications ou audio Bluetooth, lectures et écritures sur le stockage, journalisation et transitions basse consommation. Consignez les manques de données du tampon en lecture, les débordements du tampon en enregistrement, le remplissage de la file, le délai entre callback et thread de travail, les coupures, les reconnexions et les transitions veille/réveil. Testez les interruptions par priorité, la suspension et la reprise, les échecs de démarrage et les demandes d'arrêt répétées. Vérifiez la politique de récupération prévue, sans laisser passer des pertes de données silencieuses.

À la fermeture, vérifiez que le pilote a arrêté les transferts et qu'aucun callback en attente ne peut accéder à un tampon libéré. Assurez-vous que les demandes de gestion d'énergie liées à l'audio sont levées et que les composants externes sont désactivés selon la séquence matérielle. Consultez la [Vue d'ensemble de la conception basse consommation](../low-power/overview.md) pour valider la consommation du système et la [Vue d'ensemble Bluetooth](../bluetooth/overview.md) pour la coexistence radio.
