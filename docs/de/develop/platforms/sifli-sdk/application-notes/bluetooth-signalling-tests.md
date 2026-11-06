---
icon: lucide/bluetooth
title: "Bluetooth-Signalisierungstests durchführen"
description: "SF32-DUTs mit einem Bluetooth-Tester verbinden und BLE- oder Classic-Bluetooth-Signalisierungsmessungen durchführen."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Bluetooth]
---

# Bluetooth-Signalisierungstests durchführen { #run-bluetooth-signaling-tests }

Im Signalisierungsmodus wird für protokollkonforme TX/RX-Tests eine echte Bluetooth-Verbindung zwischen DUT und Kommunikationstester hergestellt. Der SiFli-Leitfaden beschreibt sowohl manuelle Bedienung als auch automatisierte Tests, bei denen Software den Tester steuert, etwa indem R&S® CMWrun einen CMW-Tester steuert. Dies unterscheidet sich von herstellerspezifischen Tests ohne Signalisierung und von RF-Einzelparametertests.

!!! note "Geltungsbereich für Qualifikationstests"
    Für Qualifikationstests ist der Ablauf passend zum jeweiligen Testtyp zu wählen. Laut SiFli-RF-Testleitfaden wird BT-Signalisierung für QDID-/Protokollkonformitätstests eingesetzt. BR/EDR-BQB-RF-Tests verwenden BT-Signalisierung, BLE-BQB-RF-Tests dagegen SIG DTM (BLE ohne Signalisierung). Die BLE-Signalisierungsschritte auf dieser Seite sind daher kein BLE-BQB-RF-Testablauf.

## Testaufbau { #test-setup }

Bereiten Sie einen Prüfling (DUT), einen Bluetooth-Kommunikationstester, einen Windows-PC, ein USB-zu-UART-Kabel und ein RF-Koaxialkabel vor. Der Quellleitfaden verwendet einen CMW500. Machen Sie am Prüfling die Signale `VBAT`, `GND` sowie UART1 TX/RX zugänglich. Die Standardbelegung von UART1 hängt vom Gerät und Gehäuse ab:

<div align="center" markdown>

<em>Tabelle: Standard-UART1-Pins laut SiFli-Bluetooth-Signalisierungsleitfaden</em>

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

!!! warning "Widersprüchliche Angaben zur UART1-Richtung bei SF32LB58x"
    Der SiFli-Bluetooth-Signalisierungsleitfaden und die Debug-Port-Tabelle im [SF32LB58x-Hardwaredesignleitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) ordnen UART1-TX/RX des Chips PA32/PA31 zu. Die [Pin-Tabelle des SF32LB58-DevKit-LCD](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) bezeichnet dagegen PA31 als UART1_TXD und PA32 als UART1_RXD; auch der [SiFli-RF-Testleitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) nennt TX=PA31/RX=PA32. Die offiziellen Quellen widersprechen sich. Prüfen Sie vor dem Verdrahten den Schaltplan des Zielboards und die Pin-Konfiguration des Projekts; verlassen Sie sich nicht allein auf diese zusammengefasste Tabelle.

Weicht die tatsächliche Projektkonfiguration von dieser Standardbelegung ab, verwenden Sie die dort festgelegte Pin-Zuordnung. Für BLE-Signalisierung ist eine serielle EUT-Steuerverbindung zum Tester erforderlich. Bei Classic BT kann der Tester den Prüfling über die Luftschnittstelle steuern, sobald dieser im Testmodus ist.

Der entscheidende Unterschied liegt in der Steuertopologie: Bei BLE wird der UART-/HCI-Steuerpfad mit dem Tester verbunden; bei Classic BT erkennt der Tester den Prüfling über die Luftschnittstelle und stellt die Verbindung her. Die folgenden Diagramme zeigen Beispiele für SF32LB52x aus der SiFli-Anleitung. Für andere Familien ist die Pin-Tabelle des jeweiligen Zielprojekts maßgeblich.

!!! note "Geltungsbereich nach Familie"
    Die UART-Pin-Tabelle fasst die Standardbelegungen mehrerer Familien und Gehäuse zusammen. Die folgenden Topologiediagramme und Tester-Screenshots zeigen Beispiele für SF32LB52x aus der Quellanleitung. Sie veranschaulichen den Signalpfad, sind aber keine allgemeingültige Referenz für Pins oder Menüs anderer Gehäuse.

![BLE-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BLE-Signalisierung: Der PC versetzt den Prüfling in den Testmodus, dann wechselt der UART-/HCI-Steuerpfad zum Tester.</em></div>

![Classic-BT-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — Classic-BT-Signalisierung: Der Tester erkennt den Prüfling über RF und stellt die Verbindung her.</em></div>

## Prüfling in den Testmodus versetzen { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Starten Sie den Prüfling und verhindern Sie, dass die DFU-/Anwendungsfirmware in einen Schlafmodus wechselt.
2. Verbinden Sie UART1 mit dem PC und senden Sie den FinSH-Befehl `bt_cm uart_dut` mit SiFli_Trace oder einem anderen seriellen Tool.
3. Stellen Sie das Terminal auf Hexadezimalanzeige um und überprüfen Sie `04 0E 04 XX 03 0C 00`.
4. Trennen Sie den PC und verbinden Sie dieselbe UART1 mit dem USB-zu-RS232-EUT-Steuerport des Testers.

![Serielle Antwort im BLE-Testmodus](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — `04 0E 04 XX 03 0C 00` vor dem Umstecken der UART-Verbindung bestätigen; der Beispiel-Screenshot zeigt `04 0E 04 06 03 0C 00`.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. Starten Sie den Prüfling und halten Sie Display und CPU wach.
2. Verbinden Sie UART1 mit dem PC und senden Sie `bt_cm dut`.
3. Überprüfen Sie die Antwort `Write scan enable success`, verbinden Sie dann das RF-Koaxialkabel mit dem Tester. Starten Sie vor dem Wechsel in einen anderen Testmodus neu.

## Signalisierungsverbindung herstellen { #establish-the-signaling-connection }

Schalten Sie in der Tester-Anwendung `Bluetooth Signaling` die Signalisierung ein. Wählen Sie für BLE unter `EUT Control` `HW Interface`=`USB to RS232 adapter`, `EUT Comm Protocol`=`HCI` und `Baud Rate`=`1000000`; wählen Sie unter General Setup `Burst Type: Low Energy`. Das gezeigte Messbeispiel verwendet `PHY=LE1M`. Solange das serielle Kabel nicht angeschlossen ist, wird `Virtual COM Port` als `None` angezeigt und ist deaktiviert. Verbinden Sie UART1 des Prüflings mit dem Tester und das RF-Koaxialkabel mit dessen RF-Eingang. Schalten Sie Bluetooth Signaling anschließend aus und wieder ein, damit der Tester den seriellen Port erkennt. Führen Sie `Connection Check` aus; nach etwa 3 Sekunden sollte `LE comm test passed` erscheinen. Setzen Sie für Classic BT `HW Interface` auf `None (EUT Control off)`, suchen Sie mit `Inquire` nach der DUT-Adresse und wählen Sie `Connect Test Mode`.

![BLE-Tester-EUT-Control-Einstellungen](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BLE-EUT-Control-, Baudraten- und Low-Energy-Einstellungen.</em></div>

![Classic-BT-Tester-Einstellungen](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — Classic-BT-Signalisierung mit EUT Control auf `None (EUT Control off)`.</em></div>

!!! note "In den Tester-Screenshots gezeigte Beispielwerte"
    Der BLE-Screenshot zeigt außerdem `Stop Bits=1`, `Parity=None`, serielles `Protocol=None`, `Autoreset EUT` aktiviert und `Use BR/EDR Settings` deaktiviert. Das Messbeispiel nennt `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` und `Dirty Tx` deaktiviert, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)` und `Pattern Type=PRBS9`. Der Classic-BT-Screenshot zeigt `Operating Mode=RF Test`, `Burst Type=Basic Rate`, `Test Mode=Loopback Test` in der Oberfläche, RX-/TX-Werte von `Channel` 10/39 und von `Frequency` 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)` und `Pattern Type=10101010`; Hopping, Auto Ranging, Dirty Tx und Whitening sind deaktiviert. Dies sind screenshotspezifische Messbeispiele, keine allgemeingültigen Einstellungen. Das Feld `Loopback Test` im Screenshot ändert nicht den Verbindungsschritt oben, bei dem nach `Inquire` `Connect Test Mode` gewählt wird.

## TX-Messungen durchführen { #run-tx-measurements }

Öffnen Sie `Bluetooth 1 Multi Eval.`; der Messbildschirm ist standardmäßig ausgeschaltet und wird mit `ON/OFF` aktiviert. Zum Ändern der Testparameter wählen Sie rechts `Input Signal` und unten am Bildschirm `Burst Type`. Für BLE stehen 1M/2M, für Classic BT BR/EDR zur Wahl. Kanal, Pakettyp und Nutzlastlänge werden im Bluetooth-Signaling-Bildschirm oder unter `Input Signal` eingestellt. Nach einer BLE- oder BT-Signalisierungsverbindung wird derselbe TX-Bildschirm verwendet.

## RX-Empfindlichkeitsmessungen durchführen { #run-rx-sensitivity-measurements }

Deaktivieren Sie TX, kehren Sie über `Bluetooth Signaling` rechts zum Verbindungsbildschirm zurück und öffnen Sie `Bluetooth 1 RX Meas.`. Wählen Sie für Classic BT BER und für BLE PER, konfigurieren Sie Kanal, Pakettyp und Nutzlastlänge und aktivieren Sie Rx Quality. Verringern Sie `Tx Level (CMW)` in Schritten von 0,01 oder 0,1. Wenn die BER-/PER-Anzeige rot wird, entspricht der vorherige Pegel der RX-Empfindlichkeit für diesen Kanal. Halten Sie fest, ob leitungsgebunden oder abgestrahlt gemessen wurde, und berücksichtigen Sie die Kabeldämpfung.

## Protokollieren und reproduzieren { #record-and-reproduce }

Bewahren Sie Chip/Gehäuse, UART-Pin-Zuordnung, SDK-Revision, Firmware-Identität, Testermodell und -konfiguration, RF-Verbindung, Kanal, PHY, Paketeinstellungen, TX-Pegel, BER/PER und Board-Revision zusammen mit dem Ergebnis auf. Die offiziellen Familienseiten sind [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
