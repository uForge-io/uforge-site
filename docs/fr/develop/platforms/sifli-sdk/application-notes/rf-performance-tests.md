---
icon: lucide/radio-tower
title: "Exécuter les tests RF du SDK SiFli"
description: "Choisir le bon mode de test RF Bluetooth, le chemin de contrôle et l'équipement de mesure appropriés."
tags: [Développement, SiFli-SDK, Notes d'application, RF]
---

# Exécuter les tests RF du SDK SiFli { #run-sifli-sdk-rf-tests }

Le SDK distingue trois modes de validation RF Bluetooth : les tests de signalisation, les tests sans signalisation et les tests RF individuels. Choisissez la méthode adaptée à l'objectif avant de charger un firmware de test.

<div align="center" markdown>
<em>Tableau : Portée du contenu des tests RF par famille</em>

| Contenu | Portée par famille |
|---|---|
| Comparaison des modes de test et séquence de mesure | Flux de travail consolidé pour SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x et SF32LB58x. |
| Disponibilité des tests Bluetooth classique | Nécessite une cible compatible avec Bluetooth classique. Le SF32LB55x ne prend en charge que le BLE et pas les procédures de test Bluetooth classique ; utilisez les tests BLE pour cette famille. |
| Prise en charge des outils pour SF32LB57x | Le [guide de test RF](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) indique les broches UART du SF32LB57x, mais le sélecteur de plateforme du [manuel SiFli_RfTool](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) ne mentionne pas le 57x. N'utilisez cette information que pour le brochage ; vérifiez le chemin de test pris en charge par la version du SDK cible. |
| Captures d'écran de topologie et matrice de commandes HCI | Exemples du guide RF du SF32LB52x ; utilisez la documentation de commandes et de broches de la famille cible pour l'implémentation. |
| Configuration `CONFIG_BT_RF_TEST` | S'applique au chemin documenté hors 55x ; le `bt_rftest` du SF32LB55x n'utilise pas ce symbole. |
| Broches UART, valeurs de paquet et comportement des commandes | Dépendent de la famille cible et de la version du SDK ; vérifiez la configuration du projet et l'implémentation du SDK cible. |

</div>

!!! warning "Les brochages UART1 du SF32LB58x diffèrent entre les guides officiels"
    Le [guide RF général](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indique PA31/PA32 pour TX/RX de l'UART1, tandis que le [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indique PA32/PA31. Avant le câblage, vérifiez le chemin de test du firmware cible et le pinmux de la carte : les deux guides se contredisent.

## Sélectionner le mode de test { #select-the-test-mode }

<div align="center" markdown>
<em>Tableau : Sélection du mode de test Bluetooth et RF</em>

| Mode | À utiliser pour | Point d'entrée SDK | Chemin de contrôle |
|---|---|---|---|
| Signalisation BT (BR/EDR) | Qualification BQB/QDID et performance conforme au protocole | `bt_cm dut`, `gap_enb_dut_mode_req()` | Interface radio du testeur et contrôle de test LMP |
| Non-signalisation BT | Réglages RF en développement et contrôle en production | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | Commandes HCI locales propres au fabricant |
| Non-signalisation BLE (SIG DTM) | Contrôle RF BLE et essais de qualification SIG DTM | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | HCI local ou HCI standard relayé par `bt_cm uart_dut` |
| Tests RF individuels | Mise au point RF au niveau de la carte et évaluations préalables à la conformité FCC/CE | `bt_cm uart_dut` + `SiFli_RfTool` | L'outil PC envoie une opération de bas niveau à la fois |

</div>

Pour le BR/EDR, la signalisation établit une véritable liaison Bluetooth et constitue la voie de qualification RF BQB. Pour la qualification RF BQB du BLE, les tests utilisent SIG DTM, présenté ici dans la catégorie BLE sans signalisation. Les tests BT sans signalisation et les tests RF individuels sont des procédures propres à SiFli, et non des tests BQB. En mode sans signalisation, la radio émet ou reçoit sur un canal fixe à une puissance définie ; cette méthode est courante en développement et en production. Les tests RF individuels s'appuient sur l'outil PC pour régler précisément la porteuse ou la modulation et effectuer les mesures avec un analyseur ou un wattmètre.

Les figures de topologie ci-dessous proviennent du guide de test RF du SF32LB52x. Elles mettent en évidence les différences entre les chemins PC, DUT, testeur et UART/HCI/RF. Pour connaître l'affectation UART et les broches par défaut, consultez le guide de test RF de la famille cible.

![Topologie du test de signalisation BT](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SiFli pour SF32LB52x — signalisation BT : le PC configure le testeur tandis que le DUT et le testeur établissent la liaison RF.</em></div>

![Topologie du test de non-signalisation BT](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SiFli pour SF32LB52x — non-signalisation BT : le PC contrôle directement l'état RF du DUT via des commandes série/HCI.</em></div>

![Topologie du test BLE DTM](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SiFli pour SF32LB52x — DTM BLE : le chemin de contrôle UART/HCI et le chemin de mesure RF sont tous deux reliés au testeur.</em></div>

## Choisir le firmware et configurer le projet { #choose-firmware-and-configure-the-project }

`rf_test.bin` est une compilation RF de test interne à SiFli et n'est pas distribuée comme un artefact SDK normal. `User.bin` désigne tout firmware applicatif compilé avec le SDK ; les fonctions RF sont intégrées dans la pile protocolaire et sont invoquées avec des commandes FinSH telles que `bt_cm dut`, `bt_cm uart_dut` et `bt_rftest`.

Pour une compilation utilisateur, activez les options pertinentes :

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

`CONFIG_BT_RF_TEST` n'est pas utilisé pour le chemin `bt_rftest` du SF32LB55x. `CONFIG_BT_FINSH` sert au traçage et n'est pas requis pour les commandes de test. Lorsque le chemin de contrôle utilise l'UART IPC propre au SDK, définissez `CONFIG_IPC_USE_OWN_DEVICE=y` et `CONFIG_IPC_OWN_DEVICE_NAME="uart2"` selon la carte. Les exemples SDK `example/bt/spp/` et `example/bt/HCI_over_uart/` fournissent des points de départ.

## Signalisation BR/EDR et préparation du DTM BLE { #bt-signaling-test }

1. Exposez `VBAT`, `GND` et les broches TX/RX de l'UART1 sur le DUT. Les broches UART1 par défaut varient selon le boîtier ; utilisez la configuration de broches du projet.
2. Pour le DTM BLE, connectez l'UART1 à un PC et envoyez `bt_cm uart_dut`. Vérifiez `04 0E 04 XX 03 0C 00`, puis déplacez l'UART vers le testeur.
3. Pour la signalisation BT, maintenez le DUT éveillé, envoyez `bt_cm dut`, vérifiez `Write scan enable success`, puis connectez le coaxial RF au testeur.
4. Dans Bluetooth Signaling, le BLE utilise le contrôle EUT USB-vers-RS232 à 1 000 000 bauds ; le BT utilise `None (EUT Control off)` et découvre le DUT par voie radio.
5. Exécutez le TX dans `Bluetooth 1 Multi Eval.` et le RX dans `Bluetooth 1 RX Meas.`. Utilisez BER pour le Bluetooth classique et PER pour le BLE ; réduisez le niveau TX du testeur pour déterminer la sensibilité.

## Commandes de non-signalisation BT/BLE { #btble-non-signaling-commands }

Utilisez le shell FinSH une fois le chemin de test RF activé :

```text
bt_rftest enter
bt_rftest bttx
bt_rftest btrx
bt_rftest btstop
bt_rftest exit
```

Dans le SDK documenté, `bt_rftest bttx` et `bt_rftest btrx` utilisent des paramètres de test fixes et ne prennent aucun argument. Pour les modifier, consultez l'implémentation de `bt_rftest()` dans `middleware/bluetooth/service/common/bf0_bt_common.c` pour la version cible et définissez des sous-commandes paramétrées si nécessaire. L'implémentation et les valeurs disponibles peuvent varier selon la version.

Les statistiques RX sont utiles, mais le nombre de paquets TX n'indique pas combien le DUT en a reçus. Le DTM BLE utilise `bt_rftest bletx`/`blerx`, ou le HCI standard `LE_Transmitter_Test`, `LE_Receiver_Test v2` et `LE_Test_End`. Les canaux BLE vont de 0 à 39 et les valeurs PHY sont 1M/2M/Coded ; les canaux Bluetooth classique vont de 0 à 78. Sur les cibles bimodes prenant en charge les deux technologies, le BT et le BLE utilisent le même matériel RF ; effectuez ces tests séparément.

## Tests RF individuels avec SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Cette section couvre uniquement le TX/RX sans signalisation. Pour les tests à porteuse unique (CW), suivez la [procédure Bluetooth single-tone distincte](bluetooth-single-tone-tests.md).

Connectez l'UART1 du DUT au PC à 1 000 000 bauds. Reliez le port RF par câble coaxial à un testeur, à un analyseur de spectre ou à un wattmètre.

Envoyez `bt_cm uart_dut` et vérifiez la réponse `04 0E 04 XX 03 0C 00`. Dans `SiFli_RfTool.exe`, sélectionnez ensuite la famille, le mode BLE ou BT sans signalisation et le port COM.

Arrêtez le TX/RX avant de changer de canal, de PHY, de type de paquet ou de puissance. Pour le RX BLE, un testeur peut envoyer 1 500 paquets ; calculez `PER = (1500 - received) / 1500 × 100%` et notez le RSSI.

Pour le RX Bluetooth classique, utilisez une forme d'onde CMW500 GPRF et notez le RSSI, le nombre d'erreurs de paquets et de bits, ainsi que le BER/PER. Compensez les pertes du câble et précisez si les mesures sont conduites ou rayonnées.

## Consigner le résultat { #record-the-result }

Le guide SiFli inclut également une matrice complète des commandes HCI et de leurs valeurs de retour. Consultez-la lorsqu'une commande est envoyée mais que le DUT n'entre pas dans l'état attendu. Ne considérez pas chaque vecteur de cette table comme une API portable d'une plateforme à l'autre ; adaptez les commandes au SDK et à la famille de puces cibles.

<div align="center"><em>Tableau : Exemples de canaux RX et de fréquences centrales dans la matrice SF32LB52x</em></div>

<div align="center" markdown>

| Mode de test | Canaux | Fréquences centrales |
|:-------------|:-------|:---------------------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

La matrice source indique d'envoyer `HCI_Reset` (`01,03,0C,00`) avant de réessayer un test RX en échec. Ces commandes et canaux sont des exemples SF32LB52x ; vérifiez la séquence correspondant au SDK et à la famille cibles.

Les tableaux ci-dessous transcrivent toutes les lignes de l'exemple source SF32LB52x sous forme structurée. Ils ne constituent pas une API portable ; utilisez la documentation du SDK de la famille cible pour l'implémentation. Les identifiants de commande, séquences d'octets, valeurs de test, limites et remarques opérationnelles sont conservés tels que dans la source.

<div align="center" markdown>
<em>Tableau : Exemple source SF32LB52x — commandes de configuration et d'entrée</em>

| Description de l'essai | Nom de l'essai | Commande envoyée | Valeur de retour | Valeur de test | Limite basse | Limite haute | Remarques |
|---|---|---|---|---|---|---|---|
| Entrer en mode sans signal | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Configurer la table de pertes | `BT_SetMultiLossTable` | `/` | `/` | `/` | `/` | `/` |  |
| Entrer en mode de test HCI | `HEX_Cmd_Enter_HCI_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Attendre 3 s | `Delay_Millisecond` | `/` | `/` | `/` | `/` | `/` |  |
| Test d'étalonnage de l'écart de fréquence | `BT_BR_TX_Cal_Test_L` | 1. `01,71,FC,06,00,53,01,01,05,0A`<br>2. `08,FF,EE,06`<br>3. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `09,FF,EE,00,06,01,00`<br>3. `04,0E,06,06,72,FC,00,E7,02` | `1` | `0` | `1` |  |
| Envoyer la commande HCI_Reset | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Éteindre l'alimentation programmable | `Simple_For_Updata_8IuOFF2` | `/` | `/` | `1` | `0` | `1` |  |
| Désactiver la communication série | `Serial_Port_Switch_Reset2` | `/` | `/` | `1` | `0` | `1` |  |
| Attendre 2 s | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Allumer l'alimentation programmable | `Simple_For_Updata_8IuON2` | `/` | `/` | `1` | `0` | `1` |  |
| Activer la communication série | `Serial_Port_Switch_COM` | `/` | `/` | `1` | `0` | `1` |  |
| Attendre 3 s le démarrage de la carte principale | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Vérifier le démarrage de la carte principale | `AT_Cmd_Check_OS_Ready` | `AT_START` | `START=OK` | `1` | `0` | `1` |  |
| Entrer en mode sans signal | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Envoyer la commande d'arrêt | `HEX_Cmd_Enter_BT_Mode` | `01,72,FC,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Vérifier que le mode a bien été activé. |
| Envoyer la commande HCI_Reset | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tableau : Exemple source SF32LB52x — matrice des tests RX</em>

| Description de l'essai | Nom de l'essai | Commande envoyée | Valeur de retour | Valeur de test | Limite basse | Limite haute | Remarques |
|---|---|---|---|---|---|---|---|
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH0` Test RX | `BT_BR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH0` Test RX | `BT_BR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH0` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH39` Test RX | `BT_BR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH39` Test RX | `BT_BR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH39` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH78` Test RX | `BT_BR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH78` Test RX | `BT_BR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH78` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Test RX | `BT_EDR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Test RX | `BT_EDR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Test RX | `BT_EDR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Test RX | `BT_EDR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Test RX | `BT_EDR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Test RX | `BT_EDR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Test RX | `BT_BLE_RX_BER_2402` | 1. `01,1F,20,00`<br>2. `01,33,20,03,00,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Test RX | `BT_BLE_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Test RX | `BT_BLE_RX_BER_2440` | 1. `01,1F,20,00`<br>2. `01,33,20,03,13,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Test RX | `BT_BLE_RX_RSSI_2440` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Test RX | `BT_BLE_RX_BER_2480` | 1. `01,1F,20,00`<br>2. `01,33,20,03,27,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Test RX | `BT_BLE_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Test RX | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | En cas d'échec d'un test RX, envoyez la commande reset avant de réessayer. |

</div>

<div align="center" markdown>
<em>Tableau : Exemple source SF32LB52x — matrice des tests TX</em>

| Description de l'essai | Nom de l'essai | Commande envoyée | Valeur de retour | Valeur de test | Limite basse | Limite haute | Remarques |
|---|---|---|---|---|---|---|---|
| `BT_BR CH0` Test TX | `BT_BR_TX_DF1_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH0` Test TX | `BT_BR_TX_DF2_2402` | 1. `01,71,FC,06,00,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH39` Test TX | `BT_BR_TX_DF1_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH39` Test TX | `BT_BR_TX_DF2_2441` | 1. `01,71,FC,06,27,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH78` Test TX | `BT_BR_TX_DF1_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH78` Test TX | `BT_BR_TX_DF2_2480` | 1. `01,71,FC,06,4E,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| Passer de BR à EDR | `HEX_Cmd_Switch_To_EDR` | `08,FF,EE,02,0A` | `09,FF,EE,00,02,01,00` | `1` | `0` | `1` |  |
| `BT_EDR CH0` Test TX | `BT_EDR_TX_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` Test TX | `BT_EDR_TX_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` Test TX | `BT_EDR_TX_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Test TX | `BT_BLE_TX_DF1_2402` | 1. `01,1F,20,00`<br>2. `01,34,20,04,00,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH0` Test TX | `BT_BLE_TX_DF2_2402` | 1. `01,34,20,04,00,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Test TX | `BT_BLE_TX_DF1_2440` | 1. `01,1F,20,00`<br>2. `01,34,20,04,13,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` Test TX | `BT_BLE_TX_DF2_2440` | 1. `01,34,20,04,13,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Test TX | `BT_BLE_TX_DF1_2480` | 1. `01,1F,20,00`<br>2. `01,34,20,04,27,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` Test TX | `BT_BLE_TX_DF2_2480` | 1. `01,34,20,04,27,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tableau : Exemple source SF32LB52x — sortie et réinitialisation</em>

| Description de l'essai | Nom de l'essai | Commande envoyée | Valeur de retour | Valeur de test | Limite basse | Limite haute | Remarques |
|---|---|---|---|---|---|---|---|
| Quitter le mode sans signal | `AT_Cmd_Exit_BT_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Écrire le marqueur RFT | `AT_Cmd_Write_RFT_Flag_Test` | `AT_SET_RFT_FLAG P` | `SET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| Lire le marqueur RFT | `AT_Cmd_Read_RFT_Flag_Test` | `AT_GET_RFT_FLAG` | `GET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| Attendre | `Delay_Millisecond2s` | `/` | `/` | `1` | `0` | `1` |  |
| Réinitialiser le boîtier de communication | `Serial_Port_Switch_Reset` | `/` | `/` | `1` | `0` | `1` |  |
| Réinitialiser l'alimentation programmable | `Power_Supply_Off` | `/` | `/` | `1` | `0` | `1` |  |
| Réinitialiser l'outil | `Release_Test_Parameters` | `/` | `/` | `1` | `0` | `1` |  |

</div>

![Matrice de commandes HCI de test RF SF32LB52x](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Figure : Image source originale en chinois de la matrice réservée au SF32LB52x ; référence uniquement, ce n'est pas une API portable.</em></div>

Pour chaque essai, consignez la famille, la révision du SDK, l'identité du firmware, la révision de la carte, les broches UART, le chemin RF et les pertes de câble. Notez aussi le modèle et la configuration de l'instrument, le canal, le type PHY/paquet, le réglage de puissance, les comptages RX, le RSSI et le BER/PER. Consultez les guides officiels détaillés pour [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (le tableau UART couvre aussi SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) et [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
