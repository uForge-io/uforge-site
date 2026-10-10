---
icon: lucide/bluetooth
title: "Exécuter les tests de signalisation Bluetooth"
description: "Connecter un équipement SF32 sous test (DUT) à un testeur Bluetooth et effectuer des mesures de signalisation BLE ou Bluetooth Classic."
tags: [Développement, SiFli-SDK, Notes d’application, Bluetooth]
---

# Exécuter les tests de signalisation Bluetooth { #run-bluetooth-signaling-tests }

En mode signalisation, une véritable liaison Bluetooth est établie entre l'équipement sous test (DUT) et un testeur de communication. Le SDK utilise ce mode pour valider TX/RX conformément au protocole et réaliser les essais BQB/QDID. Il se distingue des tests du fabricant sans signalisation et des tests RF portant sur des paramètres individuels.

## Préparation du test { #test-setup }

Préparez le DUT, un testeur de communications Bluetooth (le guide SiFli utilise un CMW500), un PC Windows, un câble USB-UART et un câble coaxial RF. Rendez accessibles les signaux `VBAT`, `GND` et TX/RX de l'UART1 du DUT. Les broches UART1 par défaut varient selon le boîtier :

<div align="center" markdown>

<em>Tableau : Broches UART1 par défaut selon le dispositif/boîtier</em>

| Dispositif/boîtier | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

Si le projet utilise une autre affectation, référez-vous à sa configuration réelle des broches. La signalisation BLE nécessite une liaison série de commande EUT entre le DUT et le testeur. En Bluetooth Classic, le testeur peut piloter le DUT par radio une fois celui-ci en mode test.

La différence essentielle concerne la topologie de commande : en BLE, le chemin de commande UART/HCI est relié au testeur ; en Bluetooth Classic, le testeur détecte le DUT et s'y connecte par radio. Les schémas ci-dessous illustrent des exemples SF32LB52x présentés dans le guide SiFli. Pour les autres familles, référez-vous au tableau des broches du projet concerné.

!!! note "Champ d'application par famille"
    Le tableau UART rassemble les affectations par défaut de plusieurs familles et boîtiers. Les schémas de topologie et les captures du testeur qui suivent illustrent des exemples SF32LB52x présentés dans le guide SiFli. Ils montrent le chemin du signal, mais ne constituent pas une référence universelle pour les broches ou les menus des autres boîtiers.

![Topologie du test de signalisation BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x présenté dans le guide SiFli — en signalisation BLE, le PC place le DUT en mode test, puis le chemin de contrôle UART/HCI est relié au testeur.</em></div>

![Topologie du test de signalisation Bluetooth Classic](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x présenté dans le guide SiFli — en signalisation Bluetooth Classic, le testeur détecte le DUT et s'y connecte par RF.</em></div>

## Placer le DUT en mode test { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Démarrez le DUT et empêchez le firmware DFU ou applicatif d'entrer en veille.
2. Connectez l'UART1 au PC et envoyez la commande FinSH `bt_cm uart_dut` via SiFli_Trace ou un autre outil série.
3. Basculez le terminal en affichage hexadécimal et vérifiez `04 0E 04 XX 03 0C 00`.
4. Déconnectez le PC et reliez la même UART1 au port de contrôle EUT USB-vers-RS232 du testeur.

![Réponse série en mode test BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x présenté dans le guide SiFli — vérifiez `04 0E 04 XX 03 0C 00` avant de déplacer la connexion UART.</em></div>

### Bluetooth Classic { #classic-bluetooth }

1. Démarrez le DUT, maintenez l'écran allumé et gardez le processeur hors veille.
2. Connectez l'UART1 au PC et envoyez `bt_cm dut`.
3. Vérifiez la réponse `Write scan enable success`, puis connectez le câble coaxial RF au testeur. Redémarrez avant de passer à un autre mode de test.

## Établir la connexion de signalisation { #establish-the-signaling-connection }

Dans l'application `Bluetooth Signaling` du testeur, activez la signalisation. Pour le BLE, sous `EUT Control`, sélectionnez `USB-to-RS232 adapter`, un débit de 1 000 000 bauds et `Low Energy burst type`. Reliez l'UART1 du DUT au testeur et son câble coaxial RF à l'entrée RF du testeur. Lancez ensuite `Connection Check` et attendez `LE comm test passed`. Pour le Bluetooth Classic, réglez `HW Interface` sur `None (EUT Control off)`, recherchez l'adresse du DUT avec `Inquire`, puis sélectionnez `Connect Test Mode`.

![Paramètres EUT Control du testeur BLE](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x présenté dans le guide SiFli — paramètres EUT Control, débit et Low Energy du BLE.</em></div>

![Paramètres du testeur pour le Bluetooth Classic](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple SF32LB52x présenté dans le guide SiFli — signalisation Bluetooth Classic avec EUT Control réglé sur `None (EUT Control off)`.</em></div>

## Effectuer les mesures TX { #run-tx-measurements }

Ouvrez `Bluetooth 1 Multi Eval.` et activez la mesure. Sélectionnez le type de rafale BLE 1M/2M ou Classic BT BR/EDR requis, le canal, le type de paquet et la longueur de charge utile. Après une connexion de signalisation BLE ou Bluetooth Classic, utilisez le même écran TX du testeur.

## Effectuer les mesures de sensibilité RX { #run-rx-sensitivity-measurements }

Désactivez TX avant de revenir à l'écran de signalisation, puis ouvrez `Bluetooth 1 RX Meas.`. Sélectionnez BER pour le Bluetooth Classic ou PER pour le BLE, configurez le canal et le type de paquet, puis activez Rx Quality. Réduisez par petits pas le `Tx Level (CMW)` du testeur ; la dernière valeur pour laquelle l'indicateur BER/PER reste valide correspond à la sensibilité mesurée. Précisez si la mesure est conduite ou rayonnée et incluez les pertes de câble.

## Consigner et reproduire les mesures { #record-and-reproduce }

Conservez avec le résultat la puce/le boîtier, la correspondance des broches UART, la révision du SDK, l'identité du firmware, le modèle et la configuration du testeur, la connexion RF, le canal, la couche PHY, les réglages de paquet, le niveau TX, le BER/PER et la révision de carte. Les pages officielles par famille sont [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) et [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
