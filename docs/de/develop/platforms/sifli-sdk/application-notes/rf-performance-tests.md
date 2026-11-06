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
| UART-Pins, Paketwerte und Befehlsverhalten | Abhängig von Zielfamilie und SDK-Release; überprüfen Sie die Projektkonfiguration und die Implementierung des Ziel-SDKs. |

</div>

!!! warning "Widersprüchliche SF32LB58x-UART1-Pinbelegungen in den offiziellen Anleitungen"
    Der [allgemeine RF-Testleitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) nennt PA31/PA32 für UART1 TX/RX, der [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) dagegen PA32/PA31. Prüfen Sie vor dem Verdrahten den Testpfad der Ziel-Firmware und das Pinmux der Platine; die Angaben der beiden Leitfäden widersprechen sich.

## Testmodus auswählen { #select-the-test-mode }

<div align="center" markdown>
<em>Tabelle: Auswahl des Bluetooth- und RF-Testmodus</em>

| Modus | Geeignet für | SDK-Einstieg | Steuerpfad |
|---|---|---|---|
| BT-Signalisierung (BR/EDR) | BQB-/QDID-Qualifizierung und protokollkonforme Leistungsbewertung | `bt_cm dut`, `gap_enb_dut_mode_req()` | Luftschnittstelle des Testers und LMP-Teststeuerung |
| BT-Non-Signaling | RF-Abgleich während der Entwicklung und Prüfungen in der Fertigung | `bt_rftest`, `bt_enter_no_signal_dut_mode()` | Lokale herstellerspezifische HCI |
| BLE-Non-Signaling (SIG DTM) | BLE-RF-Screening und SIG-DTM-Qualifizierungstests | `bt_rftest bletx/blerx`, `ble_enter_dut_mode()` | Lokale HCI oder Standard-HCI, weitergeleitet über `bt_cm uart_dut` |
| RF-Einzeltests | RF-Abgleich auf Platinenebene und FCC-/CE-Vorabprüfungen | `bt_cm uart_dut` + `SiFli_RfTool` | Das PC-Tool sendet jeweils eine Operation auf niedriger Ebene |

</div>

Für BR/EDR wird bei der Signalisierung eine echte Bluetooth-Verbindung aufgebaut; dies ist der BQB-RF-Qualifizierungspfad. BLE-BQB-RF-Tests verwenden SIG DTM, das hier als BLE-Non-Signaling aufgeführt ist. BT-Non-Signaling und RF-Einzeltests sind SiFli-spezifische Abläufe, keine BQB-Tests. Beim Non-Signaling wird der RF-Teil auf einem festen Kanal und mit festgelegter Leistung dauerhaft in den Sende- oder Empfangszustand versetzt; das ist der übliche Weg für Entwicklung und Fertigung. RF-Einzeltests nutzen das PC-Tool zur präzisen Einstellung von Träger oder Modulation und messen mit einem Analysator oder Leistungsmesser.

Die folgenden Topologieabbildungen stammen aus dem RF-Testleitfaden für SF32LB52x. Sie verdeutlichen die Unterschiede zwischen PC, Prüfling, Tester und den UART-/HCI-/RF-Pfaden. Im RF-Testleitfaden der Zielfamilie finden Sie, welche UART standardmäßig verwendet wird und wie ihre Pins zugeordnet sind.

![BT-Signalisierungstest-Topologie](../../../../assets/develop/app-notes/rf/bt_signaling_test.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BT-Signalisierung: Der PC konfiguriert den Tester, während Prüfling und Tester die RF-Verbindung aufbauen.</em></div>

![BT-Non-Signaling-Test-Topologie](../../../../assets/develop/app-notes/rf/non_signaling_test.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel für SF32LB52x aus der Quellanleitung — BT-Non-Signaling: Der PC steuert den RF-Zustand des Prüflings direkt über serielle/HCI-Befehle.</em></div>

![BLE-DTM-Testtopologie](../../../../assets/develop/app-notes/rf/ble_signaling_test.png){ loading="lazy" }
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

## BR/EDR-Signalisierung und BLE-DTM-Einrichtung { #bt-signaling-test }

1. Stellen Sie am Prüfling `VBAT`, `GND` sowie UART1 TX/RX bereit. Die Standardbelegung der UART1-Pins variiert je nach Gehäuse; verwenden Sie die Pin-Konfiguration des Projekts.
2. Verbinden Sie für BLE-DTM UART1 mit einem PC und senden Sie `bt_cm uart_dut`. Überprüfen Sie `04 0E 04 XX 03 0C 00` und stecken Sie dann die UART auf den Tester um.
3. Halten Sie den Prüfling für BT-Signalisierung wach, senden Sie `bt_cm dut`, überprüfen Sie `Write scan enable success` und verbinden Sie das RF-Koaxialkabel mit dem Tester.
4. Im Menü „Bluetooth Signaling“ verwendet BLE die EUT-Steuerung über USB-zu-RS232 mit 1 000 000 Baud; für BT wählen Sie `None (EUT Control off)` und erkennen den Prüfling über die Luftschnittstelle.
5. Führen Sie TX in `Bluetooth 1 Multi Eval.` und RX in `Bluetooth 1 RX Meas.` aus. Verwenden Sie BER für Classic BT und PER für BLE; reduzieren Sie den Tester-TX-Pegel, um die Empfindlichkeit zu bestimmen.

## BT-/BLE-Non-Signaling-Befehle { #btble-non-signaling-commands }

Verwenden Sie die FinSH-Shell, nachdem der RF-Testpfad aktiviert wurde:

```text
bt_rftest enter
bt_rftest bttx
bt_rftest btrx
bt_rftest btstop
bt_rftest exit
```

Im dokumentierten SDK verwenden `bt_rftest bttx` und `bt_rftest btrx` festgelegte Testparameter und erwarten keine Argumente. Um diese zu ändern, prüfen Sie `bt_rftest()` in `middleware/bluetooth/service/common/bf0_bt_common.c` für das Ziel-Release und definieren Sie bei Bedarf parametrisierte Unterbefehle. Implementierung und verfügbare Werte können je nach Release variieren.

RX-Paketstatistiken sind hilfreich, aber die TX-Paketanzahl zeigt nicht, wie viele Pakete der Prüfling empfangen hat. BLE-DTM verwendet `bt_rftest bletx`/`blerx` oder Standard-HCI `LE_Transmitter_Test`, `LE_Receiver_Test v2` und `LE_Test_End`. BLE-Kanäle sind 0–39 und PHY-Werte sind 1M/2M/Coded; Classic-BT-Kanäle sind 0–78. Auf Dual-Mode-Zielen, die beides unterstützen, teilen sich BT und BLE die Funkhardware und müssen getrennt getestet werden.

## RF-Einzeltests mit SiFli_RfTool { #single-item-testing-with-sifli_rftool }

Dieser Abschnitt behandelt nur TX/RX ohne Signalisierung. Für Einzelträger- (CW-)Tests verwenden Sie die separate [Bluetooth-Single-Tone-Anleitung](bluetooth-single-tone-tests.md).

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

Die folgenden Tabellen übertragen alle Zeilen des SF32LB52x-Quellbeispiels strukturiert. Sie sind keine portable API; verwenden Sie für die Implementierung die SDK-Dokumentation der Zielfamilie. Befehlskennungen, Bytefolgen, Testwerte, Grenzwerte und Bedienhinweise sind wie in der Quelle übernommen.

<div align="center" markdown>
<em>Tabelle: SF32LB52x-Quellbeispiel — Einrichtungs- und Startbefehle</em>

| Testbeschreibung | Testbezeichnung | Gesendeter Befehl | Rückgabewert | Testwert | Untergrenze | Obergrenze | Hinweise |
|---|---|---|---|---|---|---|---|
| Nicht-Signaling-Modus aktivieren | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Verlusttabelle einstellen | `BT_SetMultiLossTable` | `/` | `/` | `/` | `/` | `/` |  |
| HCI-Testmodus aktivieren | `HEX_Cmd_Enter_HCI_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| 3 s warten | `Delay_Millisecond` | `/` | `/` | `/` | `/` | `/` |  |
| Frequenzabweichung kalibrieren | `BT_BR_TX_Cal_Test_L` | 1. `01,71,FC,06,00,53,01,01,05,0A`<br>2. `08,FF,EE,06`<br>3. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `09,FF,EE,00,06,01,00`<br>3. `04,0E,06,06,72,FC,00,E7,02` | `1` | `0` | `1` |  |
| HCI_Reset-Befehl senden | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| Programmierbares Netzteil ausschalten | `Simple_For_Updata_8IuOFF2` | `/` | `/` | `1` | `0` | `1` |  |
| Serielle Kommunikation deaktivieren | `Serial_Port_Switch_Reset2` | `/` | `/` | `1` | `0` | `1` |  |
| 2 s warten | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Programmierbares Netzteil einschalten | `Simple_For_Updata_8IuON2` | `/` | `/` | `1` | `0` | `1` |  |
| Serielle Kommunikation aktivieren | `Serial_Port_Switch_COM` | `/` | `/` | `1` | `0` | `1` |  |
| 3 s auf den Start des Mainboards warten | `Delay_Millisecond` | `/` | `/` | `1` | `0` | `1` |  |
| Mainboard-Start prüfen | `AT_Cmd_Check_OS_Ready` | `AT_START` | `START=OK` | `1` | `0` | `1` |  |
| Nicht-Signaling-Modus aktivieren | `AT_Cmd_Enter_BT_CM_Mode` | `bt_cm uart_dut` | `bt_cm uart_dut` | `1` | `0` | `1` |  |
| Stoppbefehl senden | `HEX_Cmd_Enter_BT_Mode` | `01,72,FC,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Prüfen, ob der Modus erfolgreich aktiviert wurde. |
| HCI_Reset-Befehl senden | `HEX_Cmd_HCI_Reset_Mode` | `01,03,0C,00` | `04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tabelle: SF32LB52x-Quellbeispiel — RX-Testmatrix</em>

| Testbeschreibung | Testbezeichnung | Gesendeter Befehl | Rückgabewert | Testwert | Untergrenze | Obergrenze | Hinweise |
|---|---|---|---|---|---|---|---|
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX-Test | `BT_BR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX-Test | `BT_BR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH0` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX-Test | `BT_BR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX-Test | `BT_BR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH39` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX-Test | `BT_BR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,05`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX-Test | `BT_BR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_BR CH78` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX-Test | `BT_EDR_RX_BER_2402` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,00,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX-Test | `BT_EDR_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH0` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX-Test | `BT_EDR_RX_BER_2441` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,27,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX-Test | `BT_EDR_RX_RSSI_2441` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX-Test | `BT_EDR_RX_BER_2480` | 1. `01,72,FC,00`<br>2. `01,70,FC,02,4E,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC,0C,00,00`<br>2. `04,0E,04,06,70,FC,00`<br>3. `04,0E,06,06,72,FC,00,EB,03` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX-Test | `BT_EDR_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX-Test | `BT_BLE_RX_BER_2402` | 1. `01,1F,20,00`<br>2. `01,33,20,03,00,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX-Test | `BT_BLE_RX_RSSI_2402` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH0` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX-Test | `BT_BLE_RX_BER_2440` | 1. `01,1F,20,00`<br>2. `01,33,20,03,13,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX-Test | `BT_BLE_RX_RSSI_2440` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH19` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |
|  |  | `/` | `/` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX-Test | `BT_BLE_RX_BER_2480` | 1. `01,1F,20,00`<br>2. `01,33,20,03,27,01,01`<br>3. `01,1F,20,00` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,33,20,00`<br>3. `04,0E,06,06,1F,20,00,44,19` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX-Test | `BT_BLE_RX_RSSI_2480` | `08,FF,EE,05` | `09,FF,EE,00,05,02,00,BB` | `1` | `0` | `1` |  |
| `BT_BLE CH39` RX-Test | `HCI_Reset` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` | Schlägt ein RX-Test fehl, senden Sie vor dem erneuten Versuch den Reset-Befehl. |

</div>

<div align="center" markdown>
<em>Tabelle: SF32LB52x-Quellbeispiel — TX-Testmatrix</em>

| Testbeschreibung | Testbezeichnung | Gesendeter Befehl | Rückgabewert | Testwert | Untergrenze | Obergrenze | Hinweise |
|---|---|---|---|---|---|---|---|
| `BT_BR CH0` TX-Test | `BT_BR_TX_DF1_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH0` TX-Test | `BT_BR_TX_DF2_2402` | 1. `01,71,FC,06,00,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX-Test | `BT_BR_TX_DF1_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH39` TX-Test | `BT_BR_TX_DF2_2441` | 1. `01,71,FC,06,27,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX-Test | `BT_BR_TX_DF1_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,53,01,01,05,0A` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00` | `1` | `0` | `1` |  |
| `BT_BR CH78` TX-Test | `BT_BR_TX_DF2_2480` | 1. `01,71,FC,06,4E,53,01,02,05,0A`<br>2. `01,72,FC,00` | 1. `04,0E,04,06,71,FC,00`<br>2. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| Von BR zu EDR wechseln | `HEX_Cmd_Switch_To_EDR` | `08,FF,EE,02,0A` | `09,FF,EE,00,02,01,00` | `1` | `0` | `1` |  |
| `BT_EDR CH0` TX-Test | `BT_EDR_TX_2402` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,00,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH39` TX-Test | `BT_EDR_TX_2441` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,27,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_EDR CH78` TX-Test | `BT_EDR_TX_2480` | 1. `01,72,FC,00`<br>2. `01,71,FC,06,4E,A7,02,00,0A,0A`<br>3. `01,72,FC,00` | 1. `04,0E,06,06,72,FC`<br>2. `04,0E,04,06,71,FC,00`<br>3. `04,0E,06,06,72,FC` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX-Test | `BT_BLE_TX_DF1_2402` | 1. `01,1F,20,00`<br>2. `01,34,20,04,00,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH0` TX-Test | `BT_BLE_TX_DF2_2402` | 1. `01,34,20,04,00,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX-Test | `BT_BLE_TX_DF1_2440` | 1. `01,1F,20,00`<br>2. `01,34,20,04,13,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH19` TX-Test | `BT_BLE_TX_DF2_2440` | 1. `01,34,20,04,13,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX-Test | `BT_BLE_TX_DF1_2480` | 1. `01,1F,20,00`<br>2. `01,34,20,04,27,FF,01,01` | 1. `04,0E,06,06,1F,20,0C,00,00`<br>2. `04,0E,04,06,34,20,00` | `1` | `0` | `1` |  |
| `BT_BLE CH39` TX-Test | `BT_BLE_TX_DF2_2480` | 1. `01,34,20,04,27,FF,02,01`<br>2. `01,1F,20,00` | 1. `04,0E,04,06,34,20,0C`<br>2. `04,0E,06,06,1F,20,0C,00,00` | `1` | `0` | `1` |  |

</div>

<div align="center" markdown>
<em>Tabelle: SF32LB52x-Quellbeispiel — Beenden und Zurücksetzen</em>

| Testbeschreibung | Testbezeichnung | Gesendeter Befehl | Rückgabewert | Testwert | Untergrenze | Obergrenze | Hinweise |
|---|---|---|---|---|---|---|---|
| Nicht-Signaling-Modus beenden | `AT_Cmd_Exit_BT_Mode` | `01,03,0C,00` | `01,03,0C,04,0E,04,06,03,0C,00` | `1` | `0` | `1` |  |
| RFT-Flag schreiben | `AT_Cmd_Write_RFT_Flag_Test` | `AT_SET_RFT_FLAG P` | `SET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| RFT-Flag lesen | `AT_Cmd_Read_RFT_Flag_Test` | `AT_GET_RFT_FLAG` | `GET_RFT_FLAG=OK,P` | `1` | `0` | `1` |  |
| Warten | `Delay_Millisecond2s` | `/` | `/` | `1` | `0` | `1` |  |
| Kommunikationsbox zurücksetzen | `Serial_Port_Switch_Reset` | `/` | `/` | `1` | `0` | `1` |  |
| Programmierbares Netzteil zurücksetzen | `Power_Supply_Off` | `/` | `/` | `1` | `0` | `1` |  |
| Werkzeug zurücksetzen | `Release_Test_Parameters` | `/` | `/` | `1` | `0` | `1` |  |

</div>

![SF32LB52x HCI-RF-Test-Befehlsmatrix](../../../../assets/develop/app-notes/rf/hci_cmd.png){ loading="lazy" }
<div align="center"><em>Abbildung: Chinesisches Originalbild der SF32LB52x-spezifischen Matrix; nur als Referenz, keine portable API.</em></div>

Dokumentieren Sie für jeden Durchlauf Familie, SDK-Revision, Firmware-Identität, Board-Revision, UART-Pins, RF-Pfad und Kabeldämpfung. Halten Sie außerdem Modell und Konfiguration des Messgeräts, Kanal, PHY/Pakettyp, Leistungseinstellung, RX-Zählwerte, RSSI und BER/PER fest. Siehe die detaillierten offiziellen Leitfäden für [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/rf_test_guide.html), [SF32LB55x (die UART-Tabelle enthält auch SF32LB57x)](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/rf_test_guide.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/rf_test_guide.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/rf_test_guide.html).
