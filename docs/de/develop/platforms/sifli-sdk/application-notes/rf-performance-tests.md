---
icon: lucide/radio-tower
title: "RF-Tests mit SiFli-SDK durchführen"
description: "Den passenden Bluetooth-RF-Testmodus, Steuerpfad und die erforderliche Messtechnik auswählen."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, RF]
---

# RF-Tests mit SiFli-SDK durchführen { #run-sifli-sdk-rf-tests }

Das SDK unterteilt die Bluetooth-RF-Validierung in Signalisierungs-, Non-Signaling- und RF-Einzeltests. Wählen Sie den passenden Testweg anhand des Testziels aus, bevor Sie eine Testfirmware laden.

<div align="center" markdown>
<em>Tabelle: Umfang der RF-Testinhalte nach Familie</em>

| Inhalt | Geltungsbereich nach Familie |
|---|---|
| Vergleich der Testmodi und Messreihenfolge | Konsolidierter Workflow für SF32LB52x, SF32LB55x, SF32LB56x, SF32LB57x und SF32LB58x. |
| Verfügbarkeit von Bluetooth-Classic-Tests | Erfordert ein Ziel mit Bluetooth Classic. SF32LB55x unterstützt nur BLE und keine Bluetooth-Classic-Testverfahren; verwenden Sie für diese Familie die BLE-Testpfade. |
| Testtool-Unterstützung für SF32LB57x | Der [RF-Testleitfaden](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html) nennt UART-Pins für SF32LB57x, die Plattformauswahl im [SiFli_RfTool-Handbuch](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/SiFli_RfTool/SiFli_RfTool_UM.html) führt 57x jedoch nicht auf. Verwenden Sie dies nur als Hinweis zur Pinbelegung und prüfen Sie den mit der Ziel-SDK-Version unterstützten Testpfad. |
| Topologie-Screenshots und HCI-Befehlsmatrix | Beispiele für SF32LB52x aus der Quellanleitung; verwenden Sie für die Umsetzung die Befehls- und Pin-Dokumentation der Zielfamilie. |
| `CONFIG_BT_RF_TEST`-Konfiguration | Gilt für den dokumentierten Nicht-55x-Pfad; SF32LB55x `bt_rftest` verwendet dieses Symbol nicht. |
| UART-Pins, Paketwerte und Befehlssyntax | Abhängig von Zielfamilie und SDK-Release; überprüfen Sie die Projektkonfiguration und `bt_rftest help`. |

</div>

!!! warning "Widersprüchliche SF32LB58x-UART1-Pinbelegungen in den offiziellen Anleitungen"
    Der [allgemeine RF-Testleitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) nennt PA31/PA32 für UART1 TX/RX, der [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) dagegen PA32/PA31. Prüfen Sie vor dem Verdrahten den Testpfad der Ziel-Firmware und das Pinmux der Platine; die Angaben der beiden Leitfäden widersprechen sich.

## Testmodus auswählen { #select-the-test-mode }

<div align="center" markdown>
<em>Tabelle: Auswahl des Bluetooth- und RF-Testmodus</em>

| Modus | Geeignet für | SDK-Einstieg | Steuerpfad |
|---|---|---|---|
| BT-Signalisierung | BQB-/QDID-Qualifizierung und protokollkonforme Leistungsbewertung | `bt_cm dut`, `gap_enb_dut_mode_req()` | Luftschnittstelle des Testers und LMP-Teststeuerung |
| BT-Non-Signaling | RF-Abgleich während der Entwicklung und Prüfungen in der Fertigung | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | Lokale herstellerspezifische HCI |
| BLE-Non-Signaling (SIG DTM) | BLE-RF-Screening und SIG-DTM-Prüfpunkte | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | Lokale HCI oder Standard-HCI, weitergeleitet über `bt_cm uart_dut` |
| RF-Einzeltests | RF-Abgleich auf Platinenebene und FCC-/CE-Vorabprüfungen | `bt_cm uart_dut` + `SiFli_RfTool` | Das PC-Tool sendet jeweils eine Operation auf niedriger Ebene |

</div>

Bei der Signalisierung wird eine echte Bluetooth-Verbindung aufgebaut; sie ist der vorgesehene Weg zur Qualifizierung. Non-Signaling versetzt den RF-Teil direkt in einen Sende- oder Empfangszustand mit festem Kanal und fester Leistung. Das ist der übliche Weg für Entwicklung und Fertigung. RF-Einzeltests nutzen das PC-Tool zur präzisen Steuerung von Träger oder Modulation und werden mit einem Analysator oder Leistungsmesser durchgeführt. BT-Non-Signaling und RF-Einzeltests sind SiFli-spezifische Abläufe, keine BQB-Tests.

Die folgenden Topologieabbildungen stammen aus dem RF-Testleitfaden für SF32LB52x. Sie verdeutlichen die Unterschiede zwischen PC, Prüfling, Tester und den UART-/HCI-/RF-Pfaden. Für die tatsächliche UART-Standardbelegung und Pin-Zuordnung verwenden Sie die Tabelle der Zielfamilie.

![BT-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BT-Signalisierung: Der PC konfiguriert den Tester, während Prüfling und Tester die RF-Verbindung aufbauen.</em></div>

![BT-Non-Signaling-Test-Topologie](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BT-Non-Signaling: Der PC steuert den RF-Zustand des Prüflings direkt über serielle/HCI-Befehle.</em></div>

![BLE-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BLE-DTM: Sowohl der UART-/HCI-Steuerpfad als auch der RF-Messpfad verbinden sich mit dem Tester.</em></div>

## Firmware auswählen und das Projekt konfigurieren { #choose-firmware-and-configure-the-project }

`rf_test.bin` ist ein interner SiFli-RF-Test-Build und wird nicht als normales SDK-Artefakt verteilt. `User.bin` ist jede mit dem SDK gebaute Anwendungsfirmware; die RF-Funktionen sind in den Protokollstapel integriert und werden über FinSH-Befehle wie `bt_cm dut`, `bt_cm uart_dut` und `bt_rftest` aufgerufen.

Aktivieren Sie für einen eigenen Anwendungs-Build die relevanten Optionen:

```kconfig
CONFIG_RT_USING_FINSH=y
CONFIG_BSP_BT_CONNECTION_MANAGER=y
CONFIG_BT_RF_TEST=y
```

`CONFIG_BT_RF_TEST` wird für den SF32LB55x-`bt_rftest`-Pfad nicht verwendet. `CONFIG_BT_FINSH` dient dem Tracing und ist für die Testbefehle nicht erforderlich. Wird der Steuerpfad über die eigene IPC-UART des SDK geführt, setzen Sie `CONFIG_IPC_USE_OWN_DEVICE=y` und `CONFIG_IPC_OWN_DEVICE_NAME="uart2"` passend zum Board. Die SDK-Beispiele `example/bt/spp/` und `example/bt/HCI_over_uart/` bieten Ausgangspunkte.

## BT-Signalisierungstest { #bt-signaling-test }

1. Stellen Sie am Prüfling `VBAT`, `GND` sowie UART1 TX/RX bereit. Die Standardbelegung der UART1-Pins variiert je nach Gehäuse; verwenden Sie die Pin-Konfiguration des Projekts.
2. Verbinden Sie für BLE-Signalisierung UART1 mit einem PC und senden Sie `bt_cm uart_dut`. Überprüfen Sie `04 0E 04 XX 03 0C 00` und stecken Sie dann die UART auf den Tester um.
3. Halten Sie den Prüfling für BT-Signalisierung wach, senden Sie `bt_cm dut`, überprüfen Sie `Write scan enable success` und verbinden Sie das RF-Koaxialkabel mit dem Tester.
4. Im Menü „Bluetooth Signaling“ verwendet BLE die EUT-Steuerung über USB-zu-RS232 mit 1 000 000 Baud; für BT wählen Sie `None (EUT Control off)` und erkennen den Prüfling über die Luftschnittstelle.
5. Führen Sie TX in `Bluetooth 1 Multi Eval.` und RX in `Bluetooth 1 RX Meas.` aus. Verwenden Sie BER für Classic BT und PER für BLE; reduzieren Sie den Tester-TX-Pegel, um die Empfindlichkeit zu bestimmen.

## BT-/BLE-Non-Signaling-Befehle { #btble-non-signaling-commands }

Verwenden Sie die FinSH-Shell, nachdem der RF-Testpfad aktiviert wurde:

```text
bt_rftest enter
bt_rftest bttx <channel> <packet_type> <power> <length>
bt_rftest btrx <channel> <packet_type> <power>
bt_rftest btstop
bt_rftest exit
```

Die genaue Argumentreihenfolge und die zulässigen Paketwerte sind release-spezifisch; übernehmen Sie die von `bt_rftest help` im Ziel-SDK ausgegebene Syntax. RX-Paketstatistiken sind aussagekräftig; die TX-Paketanzahl ist keine Messung empfangener Pakete. BLE-DTM verwendet `bt_rftest bletx`/`blerx` oder Standard-HCI `LE_Transmitter_Test`, `LE_Receiver_Test v2` und `LE_Test_End`. BLE-Kanäle sind 0–39 und PHY-Werte sind 1M/2M/Coded; Classic-BT-Kanäle sind 0–78. Auf Dual-Mode-Zielen, die beides unterstützen, teilen sich BT und BLE die Funkhardware und müssen getrennt getestet werden.

## RF-Einzeltests mit SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Verbinden Sie UART1 des Prüflings mit dem PC und stellen Sie 1 000 000 Baud ein. Schließen Sie den RF-Anschluss über ein Koaxialkabel an einen Tester, Spektrumanalysator oder Leistungsmesser an.

Senden Sie `bt_cm uart_dut` und prüfen Sie die Antwort `04 0E 04 XX 03 0C 00`. Wählen Sie anschließend in `SiFli_RfTool.exe` die Familie, den BLE- oder BT-Non-Signaling-Modus und den COM-Port aus.

Stoppen Sie TX/RX, bevor Sie Kanal, PHY, Pakettyp oder Leistung ändern. Für BLE-RX kann ein Tester 1 500 Pakete senden; berechnen Sie `PER = (1500 - received) / 1500 × 100%` und protokollieren Sie den RSSI-Wert.

Verwenden Sie für Classic-BT-RX eine CMW500-GPRF-Wellenform und protokollieren Sie RSSI, Paket-/Bitfehleranzahl und BER/PER. Kompensieren Sie die Kabeldämpfung und kennzeichnen Sie die Ergebnisse als leitungsgebunden oder abgestrahlt.

## Das Ergebnis protokollieren { #record-the-result }

Die Quellanleitung enthält außerdem eine vollständige HCI-Befehls-/Rückgabewert-Matrix. Verwenden Sie sie, wenn ein Befehl gesendet wird, der Prüfling aber nicht in den erwarteten Zustand wechselt. Behandeln Sie nicht jeden Vektor dieser Tabelle als plattformübergreifend gültige API; stimmen Sie die Befehle auf das Ziel-SDK und die Chipfamilie ab.

<div align="center"><em>Tabelle: Beispiel-RX-Kanäle und Mittenfrequenzen aus der SF32LB52x-Matrix</em></div>

<div align="center" markdown>

| Testmodus | Kanäle | Mittenfrequenzen |
|:----------|:-------|:-----------------|
| BR/EDR | 0 / 39 / 78 | 2402 / 2441 / 2480 MHz |
| BLE | 0 / 19 / 39 | 2402 / 2440 / 2480 MHz |

</div>

Laut Quellmatrix ist vor einem erneuten Versuch nach einem fehlgeschlagenen RX-Test `HCI_Reset` (`01,03,0C,00`) zu senden. Die Befehle und Kanäle sind Beispiele aus der SF32LB52x-Quelle; prüfen Sie die Sequenz für das Ziel-SDK und die Zielfamilie.

![SF32LB52x HCI-RF-Test-Befehlsmatrix](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — Matrix aus HCI-Befehlen, Rückgabewerten und RF-Testpunkten.</em></div>

Bewahren Sie Familie, SDK-Revision, Firmware-Identität, UART-Pins, RF-Pfad, Kabeldämpfung, Messgerätemodell/-konfiguration, Kanal, PHY/Pakettyp, Leistungseinstellung, RX-Zählwerte, RSSI, BER/PER und Board-Revision zusammen mit jedem Ergebnis auf. Siehe die detaillierten offiziellen Leitfäden für [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (die UART-Tabelle enthält auch SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
