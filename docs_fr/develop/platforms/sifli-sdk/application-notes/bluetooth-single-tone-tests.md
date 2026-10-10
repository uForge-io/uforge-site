---
icon: lucide/audio-lines
title: "Effectuer des tests RF individuels pour Bluetooth"
description: "Utiliser SiFli_RfTool pour piloter le RF BLE ou Bluetooth classique une opération à la fois, lors de la mise au point d'une carte et des évaluations préalables de conformité."
tags: [Développement, SiFli-SDK, Notes d’application, Bluetooth]
---

# Effectuer des tests RF individuels pour Bluetooth { #run-bluetooth-single-item-rf-tests }

Ces tests constituent la fonctionnalité RF de bas niveau du SDK pour la mise au point des cartes, les évaluations préalables à la conformité FCC/CE et l'étude d'une porteuse ou d'un réglage de modulation à la fois. Ils ne sont pas une fonctionnalité produit et ne remplacent pas les tests de signalisation BQB.

## Préparer le DUT et l'outil { #prepare-the-dut-and-tool }

Préparez un équipement sous test (DUT), un PC, un câble USB de données (et non un câble de charge uniquement), un câble coaxial RF et un testeur de communications radio ou un analyseur de spectre. Rendez accessibles `VBAT`, `GND` et TX/RX de l'UART1 pour les essais BLE/BT modulés. Pour un essai à porteuse unique (CW) sur SF32LB55x, prévoyez également TX/RX de l'UART3. Les affectations par défaut sont les suivantes :

<div align="center" markdown>

<em>Tableau : Affectations UART par défaut pour les essais modulés et à porteuse unique</em>

| Dispositif/boîtier | UART1 TX/RX pour les essais modulés | UART de commande pour l'essai à porteuse unique (CW) |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

Sur SF32LB55x, les broches de l'UART1 varient selon la référence. Pour les essais BLE/BT modulés, reliez l'UART1 au PC à 1 000 000 bauds. Pour les essais à porteuse unique sur SF32LB55x, utilisez l'UART3 (PB45/PB46) ; les autres familles indiquées conservent l'UART1. Si le projet diffère de ces valeurs par défaut, suivez sa configuration de broches. Reliez le port RF à l'instrument avec le coaxial, tenez compte de l'atténuation du câble et distinguez les mesures conduites des mesures rayonnées.

!!! note "Portée selon la famille"
    Le tableau UART est la comparaison consolidée par famille/boîtier. La topologie et les captures d'écran `SiFli_RfTool` qui suivent sont tirées du guide SF32LB52x ; sélectionnez la famille de puce réelle dans l'outil et vérifiez la correspondance UART du projet cible.

!!! warning "Affectation UART SF32LB58x contradictoire entre les guides officiels"
    Le [guide Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) indique TX/RX UART1 = PA32/PA31, tandis que le [guide RF général](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) indique PA31/PA32 pour l'UART de débogage RF. Avant le câblage, vérifiez le chemin de test du firmware cible et le pinmux de la carte. Ne supposez pas que ces affectations propres à chaque guide sont interchangeables.

![Topologie des tests RF individuels Bluetooth](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — le PC pilote le DUT via UART/HCI tandis que le port RF est relié par coaxial au testeur ou à l'analyseur de spectre.</em></div>

## Entrer en mode test RF { #enter-rf-test-mode }

1. Démarrez le DUT et évitez qu'il passe en veille.
2. Envoyez la commande FinSH `bt_cm uart_dut` via SiFli_Trace.
3. Vérifiez la réponse hexadécimale `04 0E 04 XX 03 0C 00`.
4. Déconnectez le terminal ; SiFli_RfTool utilisera la même UART pour le contrôle HCI.

## Émettre un signal BLE ou Bluetooth classique { #transmit-a-ble-or-classic-bt-signal }

1. Ouvrez `SiFli_RfTool.exe`, sélectionnez la famille de puce, choisissez BLE non-signaling ou BT non-signaling, sélectionnez le port COM de l'UART1 et connectez-vous à 1 000 000 bauds.
2. Pour le BLE, réglez Frequency, Data Length, payload et PHY, puis sélectionnez Start TX. Arrêtez le TX avant de changer de canal ou de PHY.
3. Pour le Bluetooth classique, réglez Frequency, Data Length et Packet Type, puis sélectionnez Start TX. Arrêtez le TX avant de changer les paramètres de paquet.
4. Sur le testeur, faites correspondre le canal, le type de paquet, la charge utile et le mode PHY. Un analyseur de spectre peut afficher la forme d'onde lorsqu'aucun testeur de communications radio n'est disponible.

Le code source du SDK fournit des niveaux TX de référence pour la HDK LB52x, mais ces valeurs sont propres à cette carte. Utilisez-les uniquement comme repères de débogage et mesurez la carte réelle du produit.

![Commandes principales de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — commandes de l'outil pour la famille de puce, le mode, l'UART, le débit et le TX/RX ; vérifiez ces sélections avant d'appliquer un vecteur de test.</em></div>

![Réglages TX BLE de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — sélectionnez la puce, le mode, le canal, la charge utile, la PHY, la longueur de données et la puissance avant de démarrer le TX.</em></div>

## Recevoir et calculer la sensibilité { #receive-and-calculate-sensitivity }

Arrêtez le TX avant d'entrer en RX. Réglez le canal et appuyez sur Start RX ; arrêtez le RX avant de le changer. Pour le RX BLE, configurez le testeur en mode Direct Test Mode, sélectionnez la PHY/le canal, envoyez 1 500 paquets et calculez :

```text
PER = (1500 - received_packets) / 1500 × 100%
```

Notez également le RSSI. Pour le RX Bluetooth classique, utilisez une forme d'onde du générateur GPRF du CMW500, par exemple DH1/2-DH1/3-DH1, et consignez le nombre de paquets reçus et erronés, le nombre de bits, le BER et le RSSI. Les chemins RF BLE et Bluetooth classique partagent le même matériel ; ne les exécutez pas en parallèle.

![Réglages RX BLE de SiFli_RfTool](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — arrêtez le TX avant le RX et notez le canal, la modulation, la PHY et le résultat de réception.</em></div>

## Porteuse unique et configuration de l'instrument { #single-carrier-and-instrument-setup }

Arrêtez l'opération en cours avant de passer à un essai à porteuse unique (CW). Sur SF32LB55x, remplacez la liaison DUT-PC sur UART1 par l'UART3 (PB45/PB46), sélectionnez le port COM correspondant dans SiFli_RfTool et réglez le débit sur 1 000 000 bauds. Les autres familles indiquées utilisent l'UART1. Réglez la fréquence porteuse et la puissance TX, démarrez l'émission, puis examinez le signal avec un analyseur de spectre ou un wattmètre.

Pour mesurer l'émission modulée BLE/BT avec un testeur, sélectionnez StandAlone (Non Signaling) comme mode de réception et faites correspondre le canal, le type de paquet, la charge utile et la PHY aux réglages de SiFli_RfTool. Pour mesurer la réception du DUT, configurez le testeur comme source du signal : le BLE utilise les paramètres DTM ; le Bluetooth classique utilise une forme d'onde GPRF.

Si l'outil ou la connexion série ne répond plus, fermez SiFli_RfTool, éteignez puis rallumez le DUT, attendez son démarrage et rétablissez la connexion. Consignez avec les résultats la version de l'outil, l'identité du firmware, la puce/le boîtier, les broches UART, la révision de la carte, le canal, le type PHY/paquet, la puissance, les pertes de câble, la configuration de l'instrument et les données brutes.

![Configuration du testeur pour la réception sans signalisation](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>Figure : Exemple du guide SF32LB52x — sélectionnez StandAlone (Non Signaling) et faites correspondre le canal et les paramètres de paquet du DUT.</em></div>

Sources officielles par famille : [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) et [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
