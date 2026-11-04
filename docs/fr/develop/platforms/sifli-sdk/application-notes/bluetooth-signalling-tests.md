---
icon: lucide/bluetooth
title: "Exécuter les tests de signalisation Bluetooth"
description: "Connecter un équipement SF32 sous test (DUT) à un testeur Bluetooth et effectuer des mesures de signalisation BLE ou Bluetooth classique."
tags: [Développement, SiFli-SDK, Notes d'application, Bluetooth]
---

# Exécuter les tests de signalisation Bluetooth { #run-bluetooth-signaling-tests }

Le mode signalisation établit une véritable liaison Bluetooth entre le DUT et un testeur de communication pour effectuer des essais TX/RX conformes au protocole. Le guide SiFli couvre les opérations manuelles et les essais automatisés pilotés par logiciel, par exemple R&S® CMWrun qui commande un testeur CMW. Ce mode se distingue des essais sans signalisation propres au fabricant et des essais RF portant sur des paramètres individuels.

!!! note "Périmètre des essais de qualification"
    Pour la qualification, suivez le parcours correspondant au type d'essai. Le guide RF de SiFli indique que la signalisation BT sert aux essais QDID/conformes au protocole ; les essais RF BQB en BR/EDR utilisent la signalisation BT, tandis que les essais RF BQB en BLE utilisent SIG DTM (BLE sans signalisation). Les étapes de signalisation BLE de cette page ne constituent donc pas une procédure d'essai RF BQB pour BLE.

## Préparation du test { #test-setup }

Préparez le DUT, un testeur de communications Bluetooth (le guide source utilise un CMW500), un PC Windows, un câble USB-UART et un câble coaxial RF. Rendez accessibles les signaux `VBAT`, `GND` et TX/RX de l'UART1 du DUT. Les broches UART1 par défaut varient selon le boîtier :

<div align="center" markdown>

<em>Tableau : Broches UART1 par défaut indiquées dans le guide de signalisation Bluetooth de SiFli</em>

| Composant/boîtier | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "Divergence sur le sens TX/RX de l'UART1 du SF32LB58x"
    Le guide de signalisation Bluetooth de SiFli et le tableau du port de débogage du [guide de conception matérielle SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) associent TX/RX de l'UART1 du circuit à PA32/PA31. En revanche, le tableau de broches du [SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) indique PA31 comme UART1_TXD et PA32 comme UART1_RXD ; le [guide RF de SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) donne également TX=PA31/RX=PA32. Les références officielles se contredisent. Avant le câblage, vérifiez le schéma de la carte cible et la configuration de broches du projet ; ne vous fiez pas uniquement à ce tableau consolidé.

Si le projet utilise une autre affectation, référez-vous à sa configuration réelle des broches. La signalisation BLE nécessite une liaison série de commande EUT entre le DUT et le testeur. En Bluetooth classique, le testeur peut piloter le DUT par radio une fois celui-ci en mode test.

La différence essentielle concerne la topologie de commande : en BLE, le chemin de commande UART/HCI est relié au testeur ; en Bluetooth classique, le testeur détecte le DUT et s'y connecte par radio. Les schémas ci-dessous illustrent des exemples SF32LB52x issus du guide source. Pour les autres familles, référez-vous au tableau des broches du projet concerné.

!!! note "Champ d'application par famille"
    Le tableau UART rassemble les affectations par défaut de plusieurs familles et boîtiers. Les schémas de topologie et les captures du testeur qui suivent illustrent des exemples SF32LB52x issus du guide source. Ils montrent le chemin du signal, mais ne constituent pas une référence universelle pour les broches ou les menus des autres boîtiers.

![Topologie du test de signalisation BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x issu de la source — en signalisation BLE, le PC place le DUT en mode test, puis le chemin de contrôle UART/HCI est relié au testeur.</em></div>

![Topologie du test de signalisation Bluetooth classique](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x issu de la source — en signalisation Bluetooth classique, le testeur détecte le DUT et s'y connecte par RF.</em></div>

## Placer le DUT en mode test { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Démarrez le DUT et empêchez le firmware DFU ou applicatif d'entrer en veille.
2. Connectez l'UART1 au PC et envoyez la commande FinSH `bt_cm uart_dut` via SiFli_Trace ou un autre outil série.
3. Basculez le terminal en affichage hexadécimal et vérifiez `04 0E 04 XX 03 0C 00`.
4. Déconnectez le PC et reliez la même UART1 au port de contrôle EUT USB-vers-RS232 du testeur.

![Réponse série en mode test BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x issu de la source — vérifiez `04 0E 04 XX 03 0C 00` avant de déplacer la connexion UART ; la capture d'exemple affiche `04 0E 04 06 03 0C 00`.</em></div>

### Bluetooth classique { #classic-bluetooth }

1. Démarrez le DUT, maintenez l'écran allumé et gardez le processeur hors veille.
2. Connectez l'UART1 au PC et envoyez `bt_cm dut`.
3. Vérifiez la réponse `Write scan enable success`, puis connectez le câble coaxial RF au testeur. Redémarrez avant de passer à un autre mode de test.

## Établir la connexion de signalisation { #establish-the-signaling-connection }

Dans l'application `Bluetooth Signaling` du testeur, activez la signalisation. Pour le BLE, sous `EUT Control`, définissez `HW Interface`=`USB to RS232 adapter`, `EUT Comm Protocol`=`HCI` et `Baud Rate`=`1000000` ; sous General Setup, choisissez `Burst Type: Low Energy`. L'exemple de mesure illustré utilise `PHY=LE1M`. Avant le branchement du câble série, `Virtual COM Port` apparaît comme `None` et reste désactivé. Reliez l'UART1 du DUT au testeur et le câble coaxial RF à son entrée RF, puis désactivez et réactivez Bluetooth Signaling pour que le testeur détecte le port série. Lancez `Connection Check` ; `LE comm test passed` doit apparaître après environ 3 secondes. Pour le Bluetooth Classic, réglez `HW Interface` sur `None (EUT Control off)`, recherchez l'adresse du DUT avec `Inquire`, puis sélectionnez `Connect Test Mode`.

![Paramètres EUT Control du testeur BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x issu de la source — paramètres EUT Control, débit et Low Energy du BLE.</em></div>

![Paramètres du testeur pour le Bluetooth classique](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x issu de la source — signalisation Bluetooth classique avec EUT Control réglé sur `None (EUT Control off)`.</em></div>

!!! note "Valeurs d'exemple affichées dans les captures du testeur"
    La capture BLE montre également `Stop Bits=1`, `Parity=None`, `Protocol=None` pour le port série, `Autoreset EUT` activé et `Use BR/EDR Settings` désactivé. Les champs de mesure de l'exemple sont `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` et `Dirty Tx` désactivés, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)` et `Pattern Type=PRBS9`. La capture Classic BT montre `Operating Mode=RF Test`, `Burst Type=Basic Rate`, `Test Mode=Loopback Test` dans l'interface, les valeurs Rx/Tx de `Channel` 10/39 et de `Frequency` 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)` et `Pattern Type=10101010` ; Hopping, Auto Ranging, Dirty Tx et Whitening sont désactivés. Ce sont des exemples de mesure visibles à l'écran, pas des réglages universels. Le champ `Loopback Test` de la capture ne modifie pas l'étape de connexion ci-dessus, qui consiste à sélectionner `Connect Test Mode` après `Inquire`.

## Effectuer les mesures TX { #run-tx-measurements }

Ouvrez `Bluetooth 1 Multi Eval.` ; l'écran de mesure est désactivé par défaut, appuyez donc sur `ON/OFF` pour l'activer. Pour modifier les paramètres, sélectionnez `Input Signal` à droite, puis `Burst Type` en bas de l'écran. En BLE, choisissez 1M/2M ; en Classic BT, BR/EDR. Réglez le canal, le type de paquet et la longueur de charge utile dans l'écran Bluetooth Signaling ou sous `Input Signal`. Le même écran TX est utilisé après une connexion de signalisation BLE ou BT.

## Effectuer les mesures de sensibilité RX { #run-rx-sensitivity-measurements }

Désactivez TX, revenez à l'écran de connexion avec `Bluetooth Signaling` à droite, puis ouvrez `Bluetooth 1 RX Meas.`. Sélectionnez BER pour le Bluetooth Classic ou PER pour le BLE, configurez le canal, le type de paquet et la longueur de charge utile, puis activez Rx Quality. Réduisez le `Tx Level (CMW)` par pas de 0,01 ou 0,1. Lorsque l'indicateur BER/PER devient rouge, le niveau précédent correspond à la sensibilité RX de ce canal. Précisez si la mesure est conduite ou rayonnée et incluez les pertes de câble.

## Consigner et reproduire les mesures { #record-and-reproduce }

Conservez avec le résultat la puce/le boîtier, la correspondance des broches UART, la révision du SDK, l'identité du firmware, le modèle et la configuration du testeur, la connexion RF, le canal, la couche PHY, les réglages de paquet, le niveau TX, le BER/PER et la révision de carte. Les pages officielles par famille sont [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) et [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
