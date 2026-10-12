---
icon: lucide/list
description: "Référence complète des commandes AT du module Bluetooth bimode SF32LB57 (SIFLI_AT) pour le BLE et le Bluetooth classique (BR/EDR) : format des commandes et trames, système et appareil, adresses et identité, modes de fonctionnement et visibilité, appairage et sécurité, port série et événements, gestion des connexions, transfert de données, commandes GATT personnalisées, événements non sollicités (URC) et commandes PDU."
tags:
  - Bluetooth
---

# Référence des commandes AT { #at-command-reference }

<div align="center"><em>Tableau : Informations sur le document</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Version | V1.2.1 |
| Date | 2026-07-28 |
| Module applicable | Module Bluetooth bimode SF32LB57 (SIFLI_AT) |

</div>

Cette référence décrit l'interface externe de commandes AT du module Bluetooth bimode SF32LB57 (SIFLI_AT), version V1.2.1. Les commandes et les réponses sont présentées en police à chasse fixe ; `\r` représente un retour chariot (0x0D) et `\n` un saut de ligne (0x0A). Les commandes AT sont transmises en texte ASCII ; les champs binaires des trames PDU sont encodés en little-endian.

Il s'agit de la spécification complète de l'interface AT référencée par la page Module Bluetooth à commandes AT.

<div align="center"><em>Tableau : Historique des révisions</em></div>

<div align="center" markdown>

| Version | Modifications | Date |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1 : ajout de `AT+CFGRESET` ; mise à jour de la synchronisation du nom Bluetooth Classic au démarrage, de `CLEARLINKKEY`, de la gestion des handles de connexion et de la documentation PDU ; activation de la configuration de compilation BQB. | 2026-07-28 |

</div>

## Vue d'ensemble { #overview }

Le module Bluetooth bimode SF32LB57 fournit à l'hôte une interface de commandes AT sur UART pour le BLE et le Bluetooth classique (BR/EDR). L'hôte peut ainsi configurer les paramètres de l'appareil, gérer les connexions, échanger des données et recevoir les notifications d'état asynchrones du module.

### Paramètres par défaut { #default-settings }

<div align="center"><em>Tableau : Paramètres par défaut</em></div>

<div align="center" markdown>

| Élément | Valeur par défaut |
|:-----|:----------------|
| Nom de l'appareil | `SIFLI_AT` |
| Débit en bauds de l'interface série | 460800 bps |
| Mode commande/transparent | Mode transparent |
| Mode de fonctionnement Bluetooth | Bimode (BLE+BT) |
| Notifications d'événements | Notifications normales |
| Suffixe MAC dans le nom de l'appareil | Désactivé |
| Class of Device (COD) | `000000` |
| MTU BLE maximale | 247 |
| Activation globale de la multiconnexion | Activée (1) |
| Délai de déconnexion après inactivité en mode transparent | 0 (désactivé) |
| Chargement automatique GATT à la mise sous tension | Activé |
| Adresse aléatoire BLE | Désactivée (utilise l'adresse publique) |
| Adresse Bluetooth | Générée automatiquement à partir de l'UID de la puce |

</div>

## Format des commandes { #command-format }

### Définition de la syntaxe { #syntax-definition }

Les commandes AT sont transmises en texte ASCII, terminées par un retour chariot `\r` (0x0D). Le préfixe de commande est `AT+` (commandes au format AT) ou `AT>` (commandes au format PDU). Sur SF32LB57, le port AT est USART1, utilisant un format 8N1 sans contrôle de flux matériel, à un débit par défaut de 460800 bps. Une trame AT unique est limitée à 512 octets.

### Commandes au format AT { #at-format-commands }

<div align="center"><em>Tableau : Formes des commandes au format AT</em></div>

<div align="center" markdown>

| Forme | Commande | Description |
|:-----|:--------|:-------------|
| Interrogation | `AT+<CMD>?\r` | Lire un paramètre ou un état |
| Réglage | `AT+<CMD>=<param>[,<param>...]\r` | Écrire un paramètre |
| Exécution | `AT+<CMD>\r` | Déclencher une action |

</div>

<div align="center"><em>Tableau : Réponses au format AT</em></div>

<div align="center" markdown>

| Résultat | Chaîne de réponse |
|:-------|:------------------|
| Succès | `\r\nOK\r\n` |
| Échec | `\r\nERROR\r\n` ou `\r\nFALSE\r\n` |
| Valeur renvoyée par une requête | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### Structure des trames de commande PDU { #pdu-format-command-framing }

Les commandes PDU transfèrent des charges utiles binaires pendant que le module est en mode commande. Sauf indication contraire, les champs numériques d'une trame sont en little-endian, et `data` correspond à des données binaires brutes.

**Commande (hôte → module)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>Tableau : Structure de trame de commande PDU</em></div>

<div align="center" markdown>

| Élément | Description |
|:--------|:-------------|
| `AT>` | Préfixe de commande, 3 octets ASCII |
| Opcode | Code d'opération sur 2 octets little-endian. `0x0101`, `0x0102` |
| Total Length | Nombre total d'octets du Body, 2 octets little-endian |
| Body | Charge utile ; sa structure dépend de l'Opcode |
| `\r` | Terminateur de commande sur 1 octet |

</div>

**Rapport (module → hôte)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## Commandes et réponses { #commands-and-responses }

Les commandes ci-dessous sont regroupées par fonction selon les mêmes catégories que le tableau récapitulatif de la page Module de commandes AT Bluetooth.

### Système et appareil { #system-and-device }

#### Obtenir la version du firmware { #get-firmware-version }

<div align="center"><em>Tableau : Obtenir la version du firmware</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GFWVER?\r` |
| Réponse | Succès : `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n` ; toute tentative de réglage renvoie `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Interrogation uniquement. La valeur de retour commence toujours par `SIFLI_AT_`, suivi du numéro de version et de la date de compilation. |

</div>

#### Interroger le nom de l'appareil { #query-device-name }

<div align="center"><em>Tableau : Interroger le nom de l'appareil</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+NAME?\r` |
| Réponse | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| Paramètres | Aucun |
| Remarques | Renvoie le nom actuellement configuré pour l'appareil, sans suffixe MAC. Ce suffixe n'est ajouté qu'au nom diffusé. |

</div>

#### Définir le nom de l'appareil { #set-device-name }

<div align="center"><em>Tableau : Définir le nom de l'appareil</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+NAME=<device name>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | Nom de l'appareil : une chaîne de 1 à 29 octets ; vide ou supérieur à 29 octets renvoie `ERROR`. Par défaut `SIFLI_AT`. |
| Remarques | Met à jour le nom de l'appareil et le synchronise avec le nom local ainsi qu'avec celui inclus dans la réponse de scan BLE. `MACNAME` détermine le nom finalement diffusé. |

</div>

#### Consulter l'option d'ajout du suffixe MAC au nom { #query-mac-name-suffix-switch }

<div align="center"><em>Tableau : Consulter l'option d'ajout du suffixe MAC au nom</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+MACNAME?\r` |
| Réponse | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| Paramètres | Aucun |
| Remarques | Renvoie l'état de l'option : 0 = désactivée, 1 = activée. |

</div>

#### Régler l'ajout du suffixe MAC au nom { #set-mac-name-suffix-switch }

<div align="center"><em>Tableau : Régler l'ajout du suffixe MAC au nom</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+MACNAME=<value>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | Valeur : 0 = afficher le nom de l'appareil tel quel ; 1 = lui ajouter le suffixe `-XXXX` (XXXX est la représentation hexadécimale en majuscules des deux derniers octets de l'adresse BD_ADDR locale). Plage : 0–1. Valeur par défaut : 0. |
| Remarques | Met à jour la configuration. Si l'option est activée et que le nom avec son suffixe dépasse la limite de 29 octets, le nom est tronqué pour conserver le suffixe de 5 octets. |

</div>

#### Interroger l'identifiant d'appareil IEEE 1284 { #query-ieee-1284-device-id }

<div align="center"><em>Tableau : Interroger l'identifiant d'appareil IEEE 1284</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+1284ID?\r` |
| Réponse | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| Paramètres | Aucun |
| Remarques | Retourne la chaîne d'identifiant d'appareil IEEE 1284 actuellement configurée ; vide si non configurée. |

</div>

#### Définir l'identifiant d'appareil IEEE 1284 { #set-ieee-1284-device-id }

<div align="center"><em>Tableau : Définir l'identifiant d'appareil IEEE 1284</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+1284ID=<ID string>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | Chaîne d'identifiant : chaîne d'identification IEEE 1284. Sa longueur doit rester inférieure à la capacité du tampon de stockage ; sinon, la commande renvoie `ERROR`. Valeur par défaut : chaîne vide. |
| Remarques | Met à jour la configuration. |

</div>

#### Réinitialiser l'appareil { #reset-device }

<div align="center"><em>Tableau : Réinitialiser l'appareil</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+RESET\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête (`AT+RESET?\r`) : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | À la réception de la commande, le module sauvegarde la configuration AT actuelle, répond `OK`, puis arrête la publicité, coupe les connexions et effectue une réinitialisation logicielle. Cette commande ne modifie pas elle-même la configuration. |

</div>

#### Réinitialisation d'usine { #factory-reset }

<div align="center"><em>Tableau : Réinitialisation d'usine</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+FACTORYRESET\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête (`AT+FACTORYRESET?\r`) : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Restaure les paramètres AT par défaut et efface la configuration des services GATT personnalisés, les informations d'appairage BLE et Bluetooth Classic (BR/EDR), ainsi que l'adresse aléatoire statique BLE. Le module répond ensuite `OK` puis redémarre. L'hôte doit attendre `IM_READY` après le redémarrage. |

</div>

#### Réinitialisation de la configuration { #configuration-reset }

<div align="center"><em>Tableau : Réinitialisation de la configuration</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+CFGRESET\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête (`AT+CFGRESET?\r`) : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Restaure la configuration AT et la configuration GATT personnalisée sauvegardée, puis répond `OK` et redémarre ; les enregistrements d'appairage et l'adresse BLE actuelle sont conservés. |

</div>

#### Entrer en mode de mise à jour OTA { #enter-ota-upgrade-mode }

<div align="center"><em>Tableau : Entrer en mode de mise à jour OTA</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+OTA\r` |
| Réponse | Succès : `\r\nOK\r\n` (puis passage en mode DFU et redémarrage — aucune réponse ultérieure) ; requête (`AT+OTA?\r`) : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Sauvegarde d'abord la configuration AT actuelle et répond `OK`, puis écrit un indicateur DFU et redémarre en mode de mise à jour DFU UART. |

</div>

#### Consulter l'étalonnage du décalage de fréquence { #query-frequency-offset-calibration }

<div align="center"><em>Tableau : Consulter l'étalonnage du décalage de fréquence</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+TRIM?\r` |
| Réponse | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| Paramètres | `freq_off` : valeur actuellement enregistrée pour l'étalonnage du décalage de fréquence, en Hz. |
| Remarques | Renvoie la valeur d'écho enregistrée dans la configuration AT ; la valeur réellement appliquée est stockée dans la partition `FACTORY_CFG_ID_CRYSTAL`. |

</div>

#### Régler l'étalonnage du décalage de fréquence { #set-frequency-offset-calibration }

<div align="center"><em>Tableau : Régler l'étalonnage du décalage de fréquence</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+TRIM=<freq_off>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; valeur hors plage ou échec de l'interface d'étalonnage : `\r\nERROR\r\n` |
| Paramètres | `freq_off` : valeur d'étalonnage du décalage de fréquence, en Hz. Plage : -120000 à 120000. Valeur par défaut : 0. La valeur 0 réinitialise l'étalonnage et restaure la valeur d'origine définie en usine ; toute valeur non nulle est appliquée directement. |
| Remarques | Le réglage met à jour le registre de la banque de condensateurs HXT et écrit le résultat dans la partition `FACTORY_CFG_ID_CRYSTAL`. Après un étalonnage réussi, la valeur enregistrée dans la configuration AT est mise à jour et marquée pour sauvegarde. |

</div>

#### Entrer en mode de test DUT { #enter-dut-test-mode }

<div align="center"><em>Tableau : Entrer en mode de test DUT</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+DUT\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête (`AT+DUT?\r`) : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Positionne le bit d'activation DUT Bluetooth Classic BR/EDR et répond `OK`, puis attend que l'équipement de test déclenche un test de signalisation par voie radio via `LMP_test_control`. L'UART AT (USART1) reste disponible. L'entrée en mode DUT est irréversible — on ne peut en sortir que par une réinitialisation. |

</div>

### Adresse et identité { #address-and-identity }

#### Interroger l'adresse Bluetooth { #query-bluetooth-address }

<div align="center"><em>Tableau : Interroger l'adresse Bluetooth</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+LBDADDR?\r` |
| Réponse | Succès : `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `addr` : retourne l'adresse Bluetooth publique actuelle, 12 caractères hexadécimaux (majuscules, sans séparateurs), octet le plus significatif en premier, par ex. `001583112233`. |
| Remarques | Retourne l'adresse publique lue depuis le firmware ; retourne `ERROR` en cas d'échec de lecture. |

</div>

#### Définir l'adresse Bluetooth { #set-bluetooth-address }

<div align="center"><em>Tableau : Définir l'adresse Bluetooth</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+LBDADDR=<addr>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `addr` : adresse Bluetooth à définir, composée exactement de 12 caractères hexadécimaux sans séparateurs, octet le plus significatif en premier, par exemple `001583112233`. |
| Remarques | L'adresse est écrite dans la configuration et sauvegardée. Prend effet après une réinitialisation. La valeur par défaut d'usine est entièrement à zéro, ce qui signifie que l'adresse est générée automatiquement à partir de l'UID de la puce. |

</div>

#### Interroger l'adresse BLE { #query-ble-address }

<div align="center"><em>Tableau : Interroger l'adresse BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BLEADDR?\r` |
| Réponse | Succès : `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `addr` : retourne l'adresse actuellement utilisée par le BLE, 12 caractères hexadécimaux (majuscules, sans séparateurs), octet le plus significatif en premier. |
| Remarques | Si une adresse aléatoire statique spécifique au BLE a été générée via `AT+RANDOMADDR=1`, cette adresse aléatoire statique est retournée ; sinon, la même adresse publique que l'adresse Bluetooth est retournée. Retourne `ERROR` en cas d'échec de lecture. |

</div>

#### Définir l'adresse BLE { #set-ble-address }

<div align="center"><em>Tableau : Définir l'adresse BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BLEADDR=<addr>\r` |
| Réponse | `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Cette commande n'accepte pas de définir directement l'adresse BLE — son appel renvoie toujours `ERROR`. Une adresse aléatoire statique BLE est générée via `AT+RANDOMADDR=1`. |

</div>

#### Consulter l'activation de l'adresse aléatoire BLE { #query-ble-random-address-switch }

<div align="center"><em>Tableau : Consulter l'activation de l'adresse aléatoire BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+RANDOMADDR?\r` |
| Réponse | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| Paramètres | `n` : état actuel de l'option. 0 = le BLE utilise l'adresse publique ; 1 = il utilise une adresse aléatoire statique. |
| Remarques | Aucune |

</div>

#### Activer ou désactiver l'adresse aléatoire BLE { #set-ble-random-address-switch }

<div align="center"><em>Tableau : Activer ou désactiver l'adresse aléatoire BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+RANDOMADDR=<n>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `n` : 0 ou 1. 1 active une adresse aléatoire statique BLE dérivée de l'adresse publique (les deux bits de poids fort de l'octet le plus significatif sont mis à 1 ; par exemple, `001583112233` donne l'adresse BLE `C01583112233`). 0 rétablit l'adresse publique. Toute autre valeur ou tout caractère supplémentaire renvoie `ERROR`. Valeur par défaut : 0. |
| Remarques | Met à jour le paramètre. Si la valeur 1 est demandée mais que la lecture de l'adresse publique échoue, le paramètre revient à 0 et la commande renvoie `ERROR`. La nouvelle adresse est écrite dans NVDS et prend effet après le redémarrage. Réexécuter `AT+RANDOMADDR=1` régénère la même adresse aléatoire à partir de l'adresse publique inchangée. |

</div>

#### Interroger la Class of Device { #query-class-of-device }

<div align="center"><em>Tableau : Interroger la Class of Device</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+CLASS?\r` |
| Réponse | Succès : `\r\n+CLASS:<cod>\r\n\r\nOK\r\n` (`<cod>` est composé de 6 chiffres hexadécimaux en majuscules) |
| Paramètres | `cod` : la Class of Device actuelle, toujours affichée sur 6 chiffres hexadécimaux (24 bits de poids faible, format `%06X`, complété par des zéros) |
| Remarques | Retourne la valeur actuelle de Class of Device. |

</div>

#### Définir la Class of Device { #set-class-of-device }

<div align="center"><em>Tableau : Définir la Class of Device</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+CLASS=<cod>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `cod` : Class of Device, une chaîne hexadécimale (analysée avec `%X`). Plage 0–FFFFFF (24 bits). Par défaut `000000`. |
| Remarques | Définit la Class of Device et met à jour la configuration ; seuls les 24 bits de poids faible sont conservés lors de l'analyse. |

</div>

### Mode de fonctionnement et visibilité { #operating-mode-and-visibility }

#### Interroger l'état de découvrabilité { #query-discoverable-state }

<div align="center"><em>Tableau : Interroger l'état de découvrabilité</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+DISCOVERABLE?\r` |
| Réponse | Succès : `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| Paramètres | `state` : état de découvrabilité actuel. 0 = non découvrable, 1 = découvrable, 2 = partiellement découvrable (état mixte). La signification dépend du mode de fonctionnement : en mode BLE (`BTMODE=1`), reflète le paramètre de publicité BLE — 1 = activé, 0 = désactivé ; en mode BT (`BTMODE=2`), reflète l'inquiry scan et le page scan — 1 quand les deux sont activés, 0 quand les deux sont désactivés, et 2 sinon ; en mode bimode (`BTMODE=0`), vaut 1 quand la publicité BLE, l'inquiry scan et le page scan sont tous activés, 0 quand tous sont désactivés, et 2 sinon. |
| Remarques | Interroge uniquement l'état de découvrabilité actuel — ne change pas l'état de l'appareil. |

</div>

#### Définir l'état de découvrabilité { #set-discoverable-state }

<div align="center"><em>Tableau : Définir l'état de découvrabilité</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+DISCOVERABLE=<mode>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `mode` : 0 = désactiver la découvrabilité, 1 = activer la découvrabilité. |
| Remarques | Agit selon le mode de fonctionnement actuel : en mode BLE (`BTMODE=1`), active ou désactive la publicité BLE ; en mode BT (`BTMODE=2`), active ou désactive l'inquiry scan et le page scan ; en mode bimode (`BTMODE=0`), contrôle ensemble la publicité BLE, l'inquiry scan et le page scan. |

</div>

#### Interroger l'état de publicité GATT { #query-gatt-advertising-state }

<div align="center"><em>Tableau : Interroger l'état de publicité GATT</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTDISCOVER?\r` |
| Réponse | Succès : `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `state` : l'état réel de la publicité BLE sur les ondes. 0 = aucune publicité, 1 = publicité en cours. |
| Remarques | Retourne l'état réel de la publicité BLE sur les ondes. Non disponible lorsque le mode de fonctionnement est BT uniquement (`BTMODE=2`) — renvoie `ERROR`. |

</div>

#### Définir la publicité GATT { #set-gatt-advertising }

<div align="center"><em>Tableau : Définir la publicité GATT</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTDISCOVER=<value>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `value` : 0 = arrêter la publicité BLE, 1 = démarrer la publicité BLE. |
| Remarques | Contrôle directement le démarrage et l'arrêt de la publicité BLE. Non disponible lorsque le mode de fonctionnement est BT uniquement (`BTMODE=2`). |

</div>

#### Interroger l'état de découvrabilité SPP { #query-spp-discoverable-state }

<div align="center"><em>Tableau : Interroger l'état de découvrabilité SPP</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+SPPDISCOVER?\r` |
| Réponse | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| Paramètres | `<state>` : état actuel de l'inquiry scan, qui contrôle la découvrabilité. 0 = désactivé, 1 = activé. |
| Remarques | Renvoie `ERROR` lorsque `AT+BTMODE` vaut 1 (BLE uniquement). |

</div>

#### Définir l'état de découvrabilité SPP { #set-spp-discoverable-state }

<div align="center"><em>Tableau : Définir l'état de découvrabilité SPP</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+SPPDISCOVER=<state>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `<state>` : paramètre d'activation de l'inquiry scan, qui contrôle la découvrabilité. 0 = désactivé, 1 = activé. |
| Remarques | Renvoie `ERROR` lorsque `AT+BTMODE` vaut 1 (BLE uniquement). Modifie uniquement le bit d'inquiry scan et laisse le bit de page scan inchangé. |

</div>

#### Interroger l'état de connectabilité SPP { #query-spp-connectable-state }

<div align="center"><em>Tableau : Interroger l'état de connectabilité SPP</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+SPPCONNECT?\r` |
| Réponse | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| Paramètres | `<state>` : état actuel du page scan, qui contrôle la connectabilité. 0 = désactivé, 1 = activé. |
| Remarques | Renvoie `ERROR` lorsque `AT+BTMODE` vaut 1 (BLE uniquement). |

</div>

#### Définir l'état de connectabilité SPP { #set-spp-connectable-state }

<div align="center"><em>Tableau : Définir l'état de connectabilité SPP</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+SPPCONNECT=<state>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `<state>` : paramètre d'activation du page scan, qui contrôle la connectabilité. 0 = désactivé, 1 = activé. |
| Remarques | Renvoie `ERROR` lorsque `AT+BTMODE` vaut 1 (BLE uniquement). Modifie uniquement le bit de page scan et laisse le bit d'inquiry scan inchangé. |

</div>

#### Interroger le mode de fonctionnement Bluetooth { #query-bluetooth-operating-mode }

<div align="center"><em>Tableau : Interroger le mode de fonctionnement Bluetooth</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BTMODE?\r` |
| Réponse | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| Paramètres | `mode` : mode de fonctionnement Bluetooth actuel. 0 = bimode (BLE+BT), 1 = BLE uniquement, 2 = BT uniquement. |
| Remarques | Aucune |

</div>

#### Définir le mode de fonctionnement Bluetooth { #set-bluetooth-operating-mode }

<div align="center"><em>Tableau : Définir le mode de fonctionnement Bluetooth</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BTMODE=<mode>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `mode` : mode de fonctionnement Bluetooth. 0 = bimode (BLE+BT), 1 = BLE uniquement, 2 = BT uniquement ; plage : 0–2. Valeur par défaut : 0 (bimode). |
| Remarques | Le réglage met à jour la configuration et prend effet après une réinitialisation. |

</div>

#### Interroger le mode commande { #query-command-mode }

<div align="center"><em>Tableau : Interroger le mode commande</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+COMMAND?\r` |
| Réponse | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| Paramètres | `mode` : mode de fonctionnement actuel. 0 = mode transparent, 1 = mode commande. |
| Remarques | Aucune |

</div>

#### Définir le mode commande { #set-command-mode }

<div align="center"><em>Tableau : Définir le mode commande</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+COMMAND=<mode>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `mode` : mode de fonctionnement. 0 = mode transparent, 1 = mode commande. Le module démarre en mode transparent après la mise sous tension. |
| Remarques | Prend effet immédiatement, non persisté — revient en mode transparent après une réinitialisation. En mode transparent, les données reçues sur le port série sont transmises telles quelles au correspondant connecté ; en mode commande, les données série sont analysées comme des commandes AT. |

</div>

### Appairage et sécurité { #pairing-and-security }

#### Effacer les informations d'appairage { #clear-pairing-information }

<div align="center"><em>Tableau : Effacer les informations d'appairage</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+CLEARLINKKEY\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête `AT+CLEARLINKKEY?\r` : `\r\nERROR\r\n` |
| Paramètres | Aucun paramètre. |
| Remarques | Efface les informations d'appairage BLE et la clé de liaison Bluetooth Classic. Après le succès, l'appareil redémarre ; la configuration AT telle que le nom d'appareil, le débit série et le COD est conservée. L'hôte doit attendre `IM_READY` après la réinitialisation. La requête n'est pas prise en charge. |

</div>

### Port série et événements { #serial-port-and-events }

#### Interroger le débit série { #query-serial-baud-rate }

<div align="center"><em>Tableau : Interroger le débit série</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BAUD?\r` |
| Réponse | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| Paramètres | `baud_rate` : le débit actuellement configuré, en bps. |
| Remarques | Après la définition du débit, l'appareil redémarre ; le nouveau débit prend effet après la réinitialisation. |

</div>

#### Définir le débit série { #set-serial-baud-rate }

<div align="center"><em>Tableau : Définir le débit série</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BAUD=<baud_rate>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `baud_rate` : débit série, en bps. Valeurs prises en charge : 38400, 57600, 115200, 230400, 460800, 921600, 1000000. Par défaut 460800. |
| Remarques | Le réglage met à jour la configuration. |

</div>

#### Consulter le paramètre de notification des événements { #query-event-reporting-switch }

<div align="center"><em>Tableau : Consulter le paramètre de notification des événements</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+EVT?\r` |
| Réponse | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| Paramètres | `evt_silent` : état du paramètre de silence des événements. 0 = notifications normales ; 1 = notifications désactivées. |
| Remarques | Aucune |

</div>

#### Régler le paramètre de notification des événements { #set-event-reporting-switch }

<div align="center"><em>Tableau : Régler le paramètre de notification des événements</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+EVT=<evt_silent>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `evt_silent` : paramètre de silence des événements. 0 = notifier normalement les événements `IM_CONN`/`IM_DISCONN`/`IM_READY`, entre autres ; 1 = désactiver toutes ces notifications. Valeur par défaut : 0 (notifications normales). |
| Remarques | Le réglage met à jour la configuration. Lorsqu'il est réglé sur 1, les événements de connexion établie, de déconnexion et de disponibilité ne sont pas envoyés sur le port série. |

</div>

#### Interroger le délai de déconnexion en mode transparent { #query-pass-through-idle-disconnect-time }

<div align="center"><em>Tableau : Interroger le délai de déconnexion en mode transparent</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+IDLE?\r` |
| Réponse | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| Paramètres | `idle_ms` : délai de déconnexion pour inactivité actuellement configuré, en millisecondes. |
| Remarques | Aucune |

</div>

#### Définir le délai de déconnexion en mode transparent { #set-pass-through-idle-disconnect-time }

<div align="center"><em>Tableau : Définir le délai de déconnexion en mode transparent</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+IDLE=<idle_ms>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `idle_ms` : délai de déconnexion pour inactivité en mode transparent, en millisecondes, plage 0–65535 ; au-delà de 65535 renvoie `ERROR`. 0 désactive la fonction de déconnexion pour inactivité. Par défaut 0 (désactivé). |
| Remarques | Le réglage met à jour la configuration. Ne prend effet qu'en mode transparent : en mode transparent, si plus de `idle_ms` millisecondes se sont écoulées depuis la dernière réception de données sur le port série, toutes les connexions (le cas échéant) sont coupées ; `idle_ms` = 0 ne déclenche jamais cela. |

</div>

### Gestion des connexions { #connection-management }

#### Interroger l'activation globale de la multiconnexion { #query-multi-connection-switch }

<div align="center"><em>Tableau : État d'activation globale de la multiconnexion</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+MULTICONN?\r` |
| Réponse | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| Paramètres | `<n>` : état de l'activation globale de la multiconnexion. 0 = désactivée (une seule connexion au total) ; 1 = activée (connexions simultanées, dans la limite de chaque transport). |
| Remarques | Aucune |

</div>

#### Définir l'activation globale de la multiconnexion { #set-multi-connection-switch }

<div align="center"><em>Tableau : Définir l'activation globale de la multiconnexion</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+MULTICONN=<n>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `<n>` : 0 = désactiver la multiconnexion ; 1 = activer la multiconnexion. La valeur est 0 ou 1. Par défaut 1. |
| Remarques | Le réglage met à jour la configuration. Lorsque la multiconnexion est désactivée, la capacité de connexion simultanée est restreinte ; lorsqu'elle est activée, elle fonctionne selon les réglages `AT+BLEMULTICONN` et `AT+BTMULTICONN`. |

</div>

#### Interroger le nombre maximal de connexions BLE simultanées { #query-maximum-ble-concurrent-connections }

<div align="center"><em>Tableau : Interroger le nombre maximal de connexions BLE simultanées</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BLEMULTICONN?\r` |
| Réponse | Succès : `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n` ; lorsque la multiconnexion est désactivée : `\r\nERROR\r\n` |
| Paramètres | `<n>` : le nombre maximal de connexions BLE simultanées actuellement configuré, en décimal. |
| Remarques | Ne peut être interrogé que lorsque la multiconnexion est activée (`AT+MULTICONN=1`) ; renvoie `ERROR` si elle est désactivée. |

</div>

#### Définir le nombre maximal de connexions BLE simultanées { #set-maximum-ble-concurrent-connections }

<div align="center"><em>Tableau : Définir le nombre maximal de connexions BLE simultanées</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BLEMULTICONN=<n>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `<n>` : nombre maximal de connexions BLE simultanées, en décimal, plage 1–6. Par défaut 3. |
| Remarques | Ne peut être défini que lorsque la multiconnexion est activée (`AT+MULTICONN=1`). Le réglage met à jour la configuration ; une fois le nombre maximal de connexions atteint, la publicité BLE s'arrête (les nouvelles connexions ne sont plus possibles) et reprend automatiquement dès qu'une connexion est libérée. |

</div>

#### Interroger le nombre maximal de connexions Bluetooth Classic simultanées { #query-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tableau : Interroger le nombre maximal de connexions Bluetooth Classic simultanées</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BTMULTICONN?\r` |
| Réponse | Succès : `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n` ; lorsque la multiconnexion est désactivée : `\r\nERROR\r\n` |
| Paramètres | `<n>` : le nombre maximal de connexions Bluetooth Classic (BR/EDR) simultanées actuellement configuré, en décimal. |
| Remarques | Ne peut être interrogé que lorsque la multiconnexion est activée (`AT+MULTICONN=1`) ; renvoie `ERROR` si elle est désactivée. |

</div>

#### Définir le nombre maximal de connexions Bluetooth Classic simultanées { #set-maximum-classic-bluetooth-concurrent-connections }

<div align="center"><em>Tableau : Définir le nombre maximal de connexions Bluetooth Classic simultanées</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+BTMULTICONN=<n>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `<n>` : nombre maximal de connexions Bluetooth Classic simultanées, en décimal, plage 1–7. Par défaut 7. |
| Remarques | Ne peut être défini que lorsque la multiconnexion est activée (`AT+MULTICONN=1`). Le réglage met à jour la configuration. Lorsque le nombre maximal de connexions est atteint, le module arrête le Page Scan et le reprend automatiquement dès qu'une connexion est libérée. |

</div>

#### Déconnecter { #disconnect }

<div align="center"><em>Tableau : Déconnecter</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Déconnecter une seule : `AT+DISCONN=<conn_hdl>\r` ; déconnecter toutes : `AT+DISCONN\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec ou non trouvée : `\r\nERROR\r\n` |
| Paramètres | `<conn_hdl>` : handle de connexion, hexadécimal. Les handles de connexion BLE sont des handles externes basés sur 1 (correspondant à ce que retourne `AT+CONNLIST`) ; les connexions BT utilisent leur handle ACL. `<conn_hdl>` = 0 est traité comme une entrée invalide et renvoie `ERROR`. |
| Remarques | Sans paramètre (ou avec un paramètre vide), toutes les liaisons actives (BLE et BR/EDR) sont déconnectées et `OK` est retourné. Avec un paramètre, le handle est recherché : d'abord comparé au handle externe BLE (handle interne = `<conn_hdl>` - 1) ; s'il n'est pas trouvé, comparé au handle ACL BT brut ; si aucune connexion correspondante n'est trouvée, renvoie `ERROR`. La requête `AT+DISCONN?` renvoie `ERROR`. |

</div>

#### Interroger la liste des connexions { #query-connection-list }

<div align="center"><em>Tableau : Interroger la liste des connexions</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+CONNLIST?\r` ou `AT+CONNLIST\r` |
| Réponse | Chaque connexion active est affichée sur une ligne : `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n` ; suivi de `\r\nOK\r\n` après toutes les lignes ; `\r\nOK\r\n` seul s'il n'y a aucune connexion active ; un paramètre non vide : `\r\nERROR\r\n` |
| Paramètres | Champs de sortie : `<conn_hdl>` — handle de connexion, 4 chiffres hexadécimaux ; le BLE utilise un handle externe numéroté à partir de 1. `<type>` — type de connexion, BLE ou BT. `<addr>` — adresse Bluetooth du correspondant, 12 chiffres hexadécimaux (octet le plus significatif en premier). `<extra>` — MTU actuel pour les connexions BLE ou canal de service pour les connexions BT, en décimal. |
| Remarques | La forme de réglage renvoie `ERROR` lorsqu'un paramètre non vide est fourni. Le module vérifie chaque emplacement de connexion et affiche chaque connexion active. |

</div>

### Transfert de données { #data-transfer }

#### Interroger le MTU BLE { #query-ble-mtu }

<div align="center"><em>Tableau : Interroger le MTU BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GMTU?\r` |
| Réponse | Succès : `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| Paramètres | `mtu` : le plafond MTU BLE actuellement configuré, en décimal. |
| Remarques | Aucune |

</div>

#### Définir le MTU BLE { #set-ble-mtu }

<div align="center"><em>Tableau : Définir le MTU BLE</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GMTU=<mtu>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nFALSE\r\n` |
| Paramètres | `mtu` : plafond MTU BLE, en décimal, plage 23–1024 ; hors plage renvoie `FALSE`. Par défaut 247. |
| Remarques | Cette valeur définit le plafond utilisé lors de la négociation du MTU. |

</div>

#### Envoyer des données SPP { #send-spp-data }

<div align="center"><em>Tableau : Envoyer des données SPP</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+SPPSEND=<conn_hdl>,<data>\r` ou `AT+SPPSEND=,<data>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `conn_hdl` : handle de connexion BT cible, hexadécimal. Peut être omis ou réglé sur 0, auquel cas la première connexion BT active actuelle est utilisée. `data` : les données à envoyer, une chaîne hexadécimale, chaque paire de caractères représentant un octet ; ne peut pas être vide et le nombre de caractères doit être pair. La longueur réelle des données transportées dans une trame AT ASCII est également limitée par la limite d'une seule trame AT. |
| Remarques | `conn_hdl` et `data` sont séparés par une virgule ; la virgule doit toujours être présente même lorsque `conn_hdl` est omis. La requête n'est pas prise en charge. |

</div>

### GATT personnalisé { #custom-gatt }

#### Interroger la liste des services GATT personnalisés { #query-custom-gatt-service-list }

<div align="center"><em>Tableau : Interroger la liste des services GATT personnalisés</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSRV?\r` |
| Réponse | Pour chaque service configuré, retourne une ligne `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`, suivie de `\r\nOK\r\n`. Si aucun service n'est configuré, seul `\r\nOK\r\n` est retourné |
| Paramètres | `idx` : numéro d'emplacement de service, 0–5. `char_count` : le nombre de caractéristiques configurées pour ce service. `state` : `REG` signifie enregistré auprès de la pile protocolaire, `CFG` signifie configuré en RAM uniquement et pas encore enregistré |
| Remarques | Ne liste que les emplacements de service actuellement utilisés |

</div>

#### Créer un service GATT personnalisé { #create-custom-gatt-service }

<div align="center"><em>Tableau : Créer un service GATT personnalisé</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSRV=<idx>,<uuid>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `idx` : numéro d'emplacement de service, 0–5. `uuid` : l'UUID du service, saisi comme chaîne hexadécimale avec le MSB en premier — 4 caractères pour un UUID 16 bits, 32 caractères pour un UUID 128 bits |
| Remarques | `idx` doit être un seul chiffre immédiatement suivi d'une virgule. La longueur de l'UUID doit être exactement de 4 ou 32 caractères — toute autre longueur renvoie `ERROR`. Si l'emplacement est déjà enregistré auprès de la pile protocolaire, il ne peut pas être reconfiguré, et la création renvoie `ERROR`. Créer un service efface toute configuration précédente dans cet emplacement |

</div>

#### Supprimer un service GATT personnalisé { #delete-custom-gatt-service }

<div align="center"><em>Tableau : Supprimer un service GATT personnalisé</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSRV=<idx>,DEL\r` |
| Réponse | `\r\nOK\r\n` |
| Paramètres | `idx` : numéro d'emplacement de service, 0–5 |
| Remarques | Efface la configuration de cet emplacement en RAM. Un service déjà enregistré auprès de la pile protocolaire ne peut pas être révoqué pendant l'exécution — cette commande efface uniquement la configuration en RAM |

</div>

#### Interroger la liste des caractéristiques GATT personnalisées { #query-custom-gatt-characteristic-list }

<div align="center"><em>Tableau : Interroger la liste des caractéristiques GATT personnalisées</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTCHAR?<svc>\r` |
| Réponse | Pour chaque caractéristique de ce service, retourne une ligne `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`, suivie de `\r\nOK\r\n` ; si le service n'existe pas : `\r\nERROR\r\n` |
| Paramètres | `svc` : numéro d'emplacement de service, 0–5. `chr` : index de caractéristique. `prop` : les bits de propriété de la caractéristique, en hexadécimal. `max_len` : longueur maximale de la valeur de caractéristique |
| Remarques | Aucune |

</div>

#### Ajouter une caractéristique GATT personnalisée { #add-custom-gatt-characteristic }

<div align="center"><em>Tableau : Ajouter une caractéristique GATT personnalisée</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `svc` : numéro d'emplacement de service, 0–5. `chr` : index de caractéristique, 0–7. `uuid` : UUID de la caractéristique, MSB en premier, 4 caractères pour du 16 bits, 32 caractères pour du 128 bits. `prop` : une chaîne de propriétés composée des caractères R (lecture), W (écriture avec réponse), w (écriture sans réponse), N (notify), I (indicate). `len` : longueur maximale de la valeur de caractéristique, 1–512 |
| Remarques | Les cinq paramètres sont requis — en omettre un renvoie `ERROR`. La longueur de l'UUID doit être exactement de 4 ou 32 caractères. `prop` doit contenir au moins un caractère de propriété reconnu ; si aucun n'est reconnu, renvoie `ERROR` — les caractères non reconnus dans `prop` sont simplement ignorés. `len` égal à 0 ou supérieur à 512 renvoie `ERROR`. Le service parent doit déjà être créé et pas encore enregistré auprès de la pile protocolaire |

</div>

#### Démarrer (enregistrer) les services GATT personnalisés { #start-register-custom-gatt-services }

<div align="center"><em>Tableau : Démarrer (enregistrer) les services GATT personnalisés</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSTART\r` |
| Réponse | `\r\n+GATTSTART:<count>\r\n` suivi de `\r\nOK\r\n` ; requête `AT+GATTSTART?\r` : `\r\nERROR\r\n` |
| Paramètres | `count` : le nombre de services enregistrés avec succès auprès de la pile protocolaire lors de cet appel |
| Remarques | Enregistre auprès de la pile protocolaire chaque service utilisé, pas encore enregistré et comportant au moins une caractéristique. Une fois enregistré, un service ne peut plus être révoqué ni reconfiguré pendant l'exécution. La requête n'est pas prise en charge |

</div>

#### Envoyer des données de caractéristique GATT (Notify/Indicate) { #send-gatt-characteristic-data-notifyindicate }

<div align="center"><em>Tableau : Envoyer des données de caractéristique GATT (Notify/Indicate)</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r` ; en omettant le handle de connexion : `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` ; requête `AT+GATTSEND?\r` : `\r\nERROR\r\n` |
| Paramètres | `svc` : numéro d'emplacement de service. `chr` : index de caractéristique. `conn_hdl` : handle de connexion BLE en hexadécimal, numéroté à partir de 1 ; peut être omis. `hex` : données à envoyer, sous forme de chaîne hexadécimale avec un nombre pair de caractères. La longueur effective est également limitée par la taille maximale d'une trame AT ASCII. |
| Remarques | Lorsque `conn_hdl` est omis, la première connexion BLE actuelle est utilisée. Le service cible doit déjà être enregistré et l'index de caractéristique doit être valide ; si les propriétés de la caractéristique incluent Indicate (I), une indication est utilisée, sinon une notification. |

</div>

#### Sauvegarder la configuration GATT personnalisée en flash { #save-custom-gatt-configuration-to-flash }

<div align="center"><em>Tableau : Sauvegarder la configuration GATT personnalisée en flash</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTSTORE\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` ; requête `AT+GATTSTORE?\r` : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Enregistre durablement dans la mémoire flash la configuration actuelle des services et des caractéristiques. Seules les données de configuration sont sauvegardées, pas les informations d'exécution telles que l'état d'enregistrement. Renvoie `ERROR` si KVDB n'est pas prêt ou si l'écriture échoue. La forme interrogative n'est pas prise en charge. |

</div>

#### Effacer la configuration GATT personnalisée en flash { #clear-custom-gatt-configuration-in-flash }

<div align="center"><em>Tableau : Effacer la configuration GATT personnalisée en flash</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTCLEAR\r` |
| Réponse | Succès : `\r\nOK\r\n` ; requête `AT+GATTCLEAR?\r` : `\r\nERROR\r\n` |
| Paramètres | Aucun |
| Remarques | Supprime la configuration GATT sauvegardée en flash. N'affecte pas la configuration actuelle en RAM. La requête n'est pas prise en charge. |

</div>

#### Consulter l'option de chargement automatique GATT au démarrage { #query-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tableau : Consulter l'option de chargement automatique GATT au démarrage</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTAUTOSTART?\r` |
| Réponse | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| Paramètres | `v` : état actuel de l'option. 0 = désactivée ; 1 = activée. Valeur par défaut : 1. |
| Remarques | Aucune |

</div>

#### Régler le chargement automatique GATT au démarrage { #set-gatt-auto-load-on-power-up-switch }

<div align="center"><em>Tableau : Régler le chargement automatique GATT au démarrage</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+GATTAUTOSTART=<v>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `v` : état de l'option. 0 = désactivée ; 1 = activée. Valeur par défaut : 1. |
| Remarques | Le réglage met à jour la configuration. Lorsqu'il est activé, l'appareil charge automatiquement la configuration de service GATT sauvegardée à la mise sous tension. |

</div>

## Événements non sollicités (URC) { #unsolicited-events-urc }

Les éléments suivants sont des notifications d'état émises automatiquement par le module ; l'hôte n'a pas besoin d'envoyer de commande pour les recevoir. Leur émission est contrôlée par le paramètre de notification des événements (`AT+EVT`). Aucune notification n'est émise lorsque le mode silencieux est activé.

### Indication de disponibilité IM_READY { #im_ready-ready-indication }

<div align="center"><em>Tableau : Indication de disponibilité IM_READY</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Aucune : le firmware envoie cette notification sans sollicitation de l'hôte. |
| Réponse | Chaîne de rapport : `\r\nIM_READY\r\n` |
| Paramètres | Aucun |
| Remarques | Le module émet cette notification une fois l'initialisation terminée et lorsqu'il est prêt. Il l'émet de nouveau lorsque toutes les connexions sont coupées et que leur nombre revient à zéro. Son émission est contrôlée par `AT+EVT` ; avec `AT+EVT=1` (mode silencieux), elle est supprimée. |

</div>

### Indication de connexion IM_CONN { #im_conn-connection-indication }

<div align="center"><em>Tableau : Indication de connexion IM_CONN</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Aucune : le firmware émet cette notification lorsqu'une connexion est établie. |
| Réponse | Mode commande : `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n` ; mode transparent : `\r\nIM_CONN\r\n` |
| Paramètres | `hdl` : handle de connexion, exactement 4 chiffres hexadécimaux en majuscules, complétés par des zéros à gauche. Pour BLE, le handle affiché est numéroté à partir de 1 (handle interne plus 1) ; les autres types affichent la valeur brute. `addr` : adresse du correspondant, 12 chiffres hexadécimaux, octet de poids fort en premier. `mtu` : MTU de la connexion actuelle, en décimal. |
| Remarques | En mode commande, le module émet une notification par connexion établie, avec le handle, l'adresse du correspondant et le MTU. En mode transparent, il ne l'émet qu'à la première connexion (lorsque le nombre de connexions passe à 1), sans paramètres. Son émission est contrôlée par `AT+EVT` ; avec `AT+EVT=1` (mode silencieux), elle est supprimée. |

</div>

### Indication de déconnexion IM_DISCONN { #im_disconn-disconnect-indication }

<div align="center"><em>Tableau : Indication de déconnexion IM_DISCONN</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Aucune : le firmware émet cette notification lorsqu'une connexion est coupée. |
| Réponse | Mode commande : `\r\nIM_DISCONN:<hdl>\r\n` |
| Paramètres | `hdl` : handle de la connexion déconnectée, exactement 4 chiffres hexadécimaux en majuscules, complétés par des zéros à gauche. Pour BLE, le handle affiché est numéroté à partir de 1 (handle brut plus 1) ; les autres types affichent la valeur brute. |
| Remarques | Cette notification ne contient qu'un handle et n'est émise qu'en mode commande, pas en mode transparent. Quel que soit le mode, le module émet aussi `\r\nIM_READY\r\n` lorsque toutes les connexions sont coupées et que leur nombre revient à zéro. Son émission est contrôlée par `AT+EVT` ; avec `AT+EVT=1` (mode silencieux), elle est supprimée. |

</div>

## Commandes au format PDU { #pdu-format-commands }

### Rapport de données PDU (opcode 0x0101) { #pdu-data-report-opcode-0x0101 }

<div align="center"><em>Tableau : Rapport de données PDU (module → hôte, opcode 0x0101)</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Aucune : le firmware envoie automatiquement les données en mode commande. |
| Réponse | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| Paramètres | `opcode` est fixé à `0x0101` ; `body` = `conn_hdl` (2 octets little-endian) + `data`. Les handles de connexion BLE utilisent la valeur externe basée sur 1 ; les connexions SPP utilisent le handle ACL brut. |
| Remarques | En mode commande, lorsque des données sont écrites dans une caractéristique BLE personnalisée ou reçues via SPP Bluetooth Classic, le module les rapporte à l'hôte dans le format ci-dessus ; en mode transparent, les données sont directement produites en sortie. |

</div>

### Envoi de données en mode PDU (sélection automatique de la caractéristique Notify, opcode 0x0101) { #pdu-mode-send-data-auto-select-notify-characteristic-opcode-0x0101 }

<div align="center"><em>Tableau : Envoi de données en mode PDU (sélection automatique de la caractéristique Notify, opcode 0x0101)</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Une trame binaire (pas une ligne AT texte) : `AT>` + opcode(2 octets little-endian) + len(2 octets little-endian) + body + `\r`. Ici opcode = `0x0101` (séquence d'octets 01 01) ; len est le nombre d'octets de body ; body = `conn_hdl`(2 octets little-endian) + `data`. `data` est la charge utile à envoyer. |
| Réponse | Aucune chaîne de réponse texte. Le firmware transmet `data` au correspondant selon le type de connexion, sans répondre `OK`/`ERROR`. |
| Paramètres | `opcode` : fixé à `0x0101`. `len` : longueur de body, plage 2–508 (les trames inférieures à 2 ou supérieures à `AT_RX_BUF_SIZE`-4 sont abandonnées ; `AT_RX_BUF_SIZE` = 512). `conn_hdl` : handle de connexion cible ; pour BLE, valeur externe numérotée à partir de 1 ; pour SPP, handle ACL brut. `data` : octets de charge utile, longueur = len-2, peut être 0. |
| Remarques | `conn_hdl` est d'abord recherché comme handle BLE numéroté à partir de 1 (c.-à-d. `conn_hdl`-1 correspond à un slot BLE) ; sans correspondance, la recherche utilise la valeur brute dans un slot SPP. Si aucune connexion n'est trouvée, la trame est abandonnée. Pour BLE, le firmware parcourt les services GATT personnalisés et sélectionne automatiquement la première caractéristique dotée de la propriété Notify ou Indicate ; sans caractéristique correspondante, rien n'est envoyé. Pour SPP (BR/EDR), `data` est envoyé sur le canal SPP. La trame doit être immédiatement suivie de `\r` ; sinon, la trame en cours est abandonnée. Si aucun nouvel octet n'arrive avant l'expiration du délai PDU entre deux trames, l'état de réception PDU est réinitialisé. |

</div>

### Envoi de données en mode PDU (service et caractéristique spécifiés, opcode 0x0102) { #pdu-mode-send-data-specify-service-and-characteristic-opcode-0x0102 }

<div align="center"><em>Tableau : Envoi de données en mode PDU (service et caractéristique spécifiés, opcode 0x0102)</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Une trame binaire (pas une ligne AT texte) : `AT>` + opcode(2 octets little-endian) + len(2 octets little-endian) + body + `\r`. Ici opcode = `0x0102` (séquence d'octets 02 01) ; len est le nombre d'octets de body ; body = `conn_hdl`(2 octets little-endian) + `svc_idx`(1 octet) + `char_idx`(1 octet) + `data`. |
| Réponse | Aucune chaîne de réponse texte. Le firmware envoie `data` au correspondant via le service/la caractéristique spécifiés, sans répondre `OK`/`ERROR`. |
| Paramètres | `opcode` : fixé à `0x0102`. `len` : longueur de body, de 4 à 508 octets. La couche de réception accepte généralement un minimum de 2 octets, mais cet opcode exige au moins 4 octets dans body, comprenant `svc_idx`+`char_idx` ; sinon, la trame est abandonnée. `conn_hdl` : handle de connexion BLE cible, numéroté à partir de 1 (valeur externe affichée). `svc_idx` : index du service GATT personnalisé. `char_idx` : index de la caractéristique dans ce service. `data` : octets de charge utile, longueur = len-4 ; une longueur nulle est autorisée. |
| Remarques | Connexions BLE uniquement ; si la connexion résolue est de type SPP, la trame est abandonnée. `svc_idx` doit correspondre à un service personnalisé enregistré et `char_idx` doit être inférieur au nombre de caractéristiques de ce service ; sinon, la trame est abandonnée. La caractéristique spécifiée doit avoir la propriété Notify ou Indicate ; sinon, la trame est abandonnée. `conn_hdl` suit la même règle de résolution que pour `0x0101` (handle BLE numéroté à partir de 1 d'abord, puis valeur brute). La trame doit être immédiatement suivie de `\r`. |

</div>

### Déconnexion en mode PDU { #pdu-mode-disconnect }

<div align="center"><em>Tableau : Déconnexion en mode PDU</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | `AT+DISCONN\r` (sans paramètre) ou `AT+DISCONN=<conn_hdl>\r` |
| Réponse | Succès : `\r\nOK\r\n` ; échec : `\r\nERROR\r\n` |
| Paramètres | `conn_hdl` : le handle de connexion à déconnecter, hexadécimal. Les connexions BLE sont basées sur 1 (valeur d'affichage externe) ; la valeur ne doit pas être 0 (0 est traité comme une entrée invalide et renvoie `ERROR`). Les connexions SPP utilisent le handle ACL brut. |
| Remarques | Sans paramètre, toutes les connexions actuelles sont déconnectées et `OK` est renvoyé. Avec un paramètre, le handle BLE numéroté à partir de 1 est recherché d'abord (`conn_hdl`-1 correspond à un slot BLE) ; sans correspondance, la valeur brute est recherchée dans un slot SPP. Si aucune connexion n'est trouvée, `ERROR` est renvoyé. Pour BLE, la déconnexion est lancée avec le code de raison `0x13` ; pour SPP, elle est lancée à partir de l'adresse du correspondant. La requête `AT+DISCONN?` renvoie `ERROR`. |

</div>

### Indication d'état de connexion PDU (IM_CONN / IM_DISCONN) { #pdu-connection-status-indication-im_conn-im_disconn }

<div align="center"><em>Tableau : Indication d'état de connexion PDU (IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| Élément | Contenu |
|:-----|:--------|
| Commande | Émise automatiquement par le module, sans commande de l'hôte : `IM_CONN` à l'établissement d'une connexion et `IM_DISCONN` à sa fermeture. |
| Réponse | Mode commande, connexion établie : `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`, où `<hdl>` est un handle hexadécimal à 4 chiffres, `<mac>` est une adresse hexadécimale à 12 chiffres (octet le plus significatif en premier), et `<mtu>` est un MTU décimal. Mode commande, connexion coupée : `\r\nIM_DISCONN:<hdl>\r\n` (`<hdl>` fait 4 chiffres hexadécimaux). Le mode transparent rapporte `\r\nIM_CONN\r\n` (sans paramètres) uniquement lorsque la première connexion est établie, et ne rapporte pas `IM_DISCONN` à la déconnexion. Les deux modes rapportent `\r\nIM_READY\r\n` une fois que toutes les connexions ont été coupées. |
| Paramètres | `<hdl>` : handle de connexion. Pour BLE, la valeur affichée commence à 1 (handle interne commençant à 0, plus 1) ; pour SPP, le handle brut est affiché. `<mac>` : adresse Bluetooth du correspondant. `<mtu>` : MTU négocié. |
| Remarques | Les notifications sont contrôlées par `AT+EVT` : à 0 (valeur par défaut), elles sont émises normalement ; à 1, aucune notification `IM_READY`, `IM_CONN` ou `IM_DISCONN` n'est envoyée. Leur format et leur contenu varient selon le mode de fonctionnement (mode commande ou mode transparent), comme indiqué ci-dessus. |

</div>

## Annexe { #appendix }

### Valeurs courantes de Class of Device { #common-class-of-device-values }

<div align="center"><em>Tableau : Valeurs courantes de Class of Device</em></div>

<div align="center" markdown>

| Type d'appareil | Valeur hexadécimale |
|:-------------|:-----------|
| Ordinateur | `0x000100` |
| Téléphone | `0x000200` |
| Point d'accès réseau local (LAN) | `0x000300` |
| Audio/Vidéo | `0x000400` |
| Périphérique (clavier/souris, etc.) | `0x000500` |
| Imagerie (imprimante/scanner, etc.) | `0x000600` |

</div>
