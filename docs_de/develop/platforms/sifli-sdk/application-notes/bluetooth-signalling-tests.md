---
icon: lucide/bluetooth
title: "Bluetooth-Signalisierungstests durchführen"
description: "SF32-DUTs mit einem Bluetooth-Tester verbinden und BLE- oder Classic-Bluetooth-Signalisierungsmessungen durchführen."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Bluetooth]
---

# Bluetooth-Signalisierungstests durchführen { #run-bluetooth-signaling-tests }

Im Signalisierungsmodus wird eine echte Bluetooth-Verbindung zwischen dem Prüfling (DUT) und dem Kommunikationstester hergestellt. Das SDK nutzt diesen Modus zur protokollkonformen TX/RX-Prüfung und für BQB-/QDID-Tests. Er unterscheidet sich von herstellerspezifischen Tests ohne Signalisierung und von RF-Tests einzelner Parameter.

## Testaufbau { #test-setup }

Bereiten Sie das DUT, einen Bluetooth-Kommunikationstester (die Quellanleitung verwendet ein CMW500), einen Windows-PC, ein USB-zu-UART-Kabel und ein RF-Koaxialkabel vor. Machen Sie am DUT die Signale `VBAT`, `GND` sowie UART1 TX/RX zugänglich. Die Standardbelegung von UART1 hängt vom Gerät und Gehäuse ab:

<div align="center" markdown>

<em>Tabelle: Standard-UART1-Pins nach Gerät/Gehäuse</em>

| Gerät/Gehäuse | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

Weicht die tatsächliche Projektkonfiguration von dieser Standardbelegung ab, verwenden Sie die dort festgelegte Pin-Zuordnung. Für BLE-Signalisierung ist eine serielle EUT-Steuerverbindung zum Tester erforderlich. Bei Classic BT kann der Tester das DUT über die Luftschnittstelle steuern, sobald es sich im Testmodus befindet.

Der entscheidende Unterschied liegt in der Steuertopologie: Bei BLE wird der UART-/HCI-Steuerpfad mit dem Tester verbunden; bei Classic BT erkennt der Tester das DUT über die Luftschnittstelle und stellt die Verbindung her. Die folgenden Diagramme zeigen Beispiele für SF32LB52x aus der SiFli-Anleitung. Für andere Familien ist die Pin-Tabelle des jeweiligen Zielprojekts maßgeblich.

!!! note "Geltungsbereich nach Produktfamilie"
    Die UART-Pin-Tabelle fasst die Standardbelegungen mehrerer Familien und Gehäuse zusammen. Die folgenden Topologiediagramme und Tester-Screenshots zeigen Beispiele für SF32LB52x aus der Quellanleitung. Sie veranschaulichen den Signalpfad, sind aber keine allgemeingültige Referenz für Pins oder Menüs anderer Gehäuse.

![BLE-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BLE-Signalisierung: Der PC versetzt das DUT in den Testmodus, dann wechselt der UART-/HCI-Steuerpfad zum Tester.</em></div>

![Classic-BT-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — Classic-BT-Signalisierung: Der Tester erkennt und verbindet sich über RF mit dem DUT.</em></div>

## DUT in den Testmodus versetzen { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Starten Sie das DUT und verhindern Sie, dass die DFU-/Anwendungsfirmware in einen Schlafmodus wechselt.
2. Verbinden Sie UART1 mit dem PC und senden Sie den FinSH-Befehl `bt_cm uart_dut` mit SiFli_Trace oder einem anderen seriellen Tool.
3. Stellen Sie das Terminal auf Hexadezimalanzeige um und überprüfen Sie `04 0E 04 XX 03 0C 00`.
4. Trennen Sie den PC und verbinden Sie dieselbe UART1 mit dem USB-zu-RS232-EUT-Steuerport des Testers.

![Serielle Antwort im BLE-Testmodus](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — `04 0E 04 XX 03 0C 00` bestätigen, bevor die UART-Verbindung umgesteckt wird.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. Starten Sie das DUT und halten Sie Bildschirm und CPU wach.
2. Verbinden Sie UART1 mit dem PC und senden Sie `bt_cm dut`.
3. Überprüfen Sie die Antwort `Write scan enable success`, verbinden Sie dann das RF-Koaxialkabel mit dem Tester. Starten Sie vor dem Wechsel in einen anderen Testmodus neu.

## Signalisierungsverbindung herstellen { #establish-the-signaling-connection }

Schalten Sie in der Anwendung `Bluetooth Signaling` des Testers die Signalisierung ein. Wählen Sie für BLE unter `EUT Control` die Optionen `USB-to-RS232 adapter`, 1.000.000 Baud und `Low Energy burst type`. Verbinden Sie UART1 des DUT mit dem Tester und das RF-Koaxialkabel mit dessen RF-Eingang. Führen Sie anschließend `Connection Check` aus und warten Sie auf `LE comm test passed`. Setzen Sie für Classic BT `HW Interface` auf `None (EUT Control off)`, suchen Sie mit `Inquire` nach der DUT-Adresse und wählen Sie `Connect Test Mode`.

![BLE-Tester-EUT-Control-Einstellungen](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BLE-EUT-Control-, Baudraten- und Low-Energy-Einstellungen.</em></div>

![Classic-BT-Tester-Einstellungen](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — Classic-BT-Signalisierung mit EUT Control auf `None (EUT Control off)`.</em></div>

## TX-Messungen durchführen { #run-tx-measurements }

Öffnen Sie `Bluetooth 1 Multi Eval.` und aktivieren Sie die Messung. Wählen Sie den erforderlichen BLE-1M/2M- oder Classic-BT-BR/EDR-Burst-Typ, Kanal, Pakettyp und Nutzlastlänge. Derselbe Tester-TX-Bildschirm wird nach jeder BLE- oder BT-Signalisierungsverbindung verwendet.

## RX-Empfindlichkeitsmessungen durchführen { #run-rx-sensitivity-measurements }

Deaktivieren Sie TX, kehren Sie zum Signalisierungsbildschirm zurück und öffnen Sie `Bluetooth 1 RX Meas.`. Wählen Sie für Classic BT BER und für BLE PER, konfigurieren Sie Kanal und Pakettyp und aktivieren Sie Rx Quality. Verringern Sie den `Tx Level (CMW)` des Testers schrittweise. Der letzte Wert, bei dem die BER-/PER-Anzeige noch gültig ist, entspricht der gemessenen Empfindlichkeit. Halten Sie fest, ob leitungsgebunden oder abgestrahlt gemessen wurde, und berücksichtigen Sie die Kabeldämpfung.

## Protokollieren und reproduzieren { #record-and-reproduce }

Bewahren Sie Chip/Gehäuse, UART-Pin-Zuordnung, SDK-Revision, Firmware-Identität, Testermodell und -konfiguration, RF-Verbindung, Kanal, PHY, Paketeinstellungen, TX-Pegel, BER/PER und Board-Revision zusammen mit dem Ergebnis auf. Die offiziellen Familienseiten sind [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
