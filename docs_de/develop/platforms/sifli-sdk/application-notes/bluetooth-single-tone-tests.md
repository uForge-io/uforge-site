---
icon: lucide/audio-lines
title: "Bluetooth-RF-Einzeltests durchführen"
description: "Mit SiFli_RfTool einzelne BLE- oder Classic-Bluetooth-RF-Tests für den Platinenabgleich und Vorabprüfungen zur Konformität durchführen."
tags: [Entwicklung, SiFli-SDK, Anwendungshinweise, Bluetooth]
---

# Bluetooth-RF-Einzeltests durchführen { #run-bluetooth-single-item-rf-tests }

RF-Einzeltests sind eine SDK-Funktion für RF-Tests auf niedriger Ebene. Sie dienen dem Platinenabgleich, FCC-/CE-Vorabprüfungen zur Konformität und der gezielten Untersuchung jeweils einer Trägerfrequenz oder einer Modulationseinstellung. Sie sind keine Produktfunktion und ersetzen keine BQB-Signalisierungstests.

## Prüfling und Tool vorbereiten { #prepare-the-dut-and-tool }

Bereiten Sie einen Prüfling (DUT), einen PC, ein USB-Datenkabel (kein reines Ladekabel), ein RF-Koaxialkabel sowie einen Kommunikationstester oder Spektrumanalysator vor. Stellen Sie am Prüfling `VBAT`, `GND` und UART1 TX/RX für modulierte BLE-/BT-Tests zur Verfügung. Für einen Einzelträgertest (CW) mit SF32LB55x wird zusätzlich UART3 TX/RX benötigt. Die Standardbelegung lautet:

<div align="center" markdown>

<em>Tabelle: Standard-UART-Belegung für modulierte und Einzelträgertests</em>

| Gerät/Gehäuse | UART1 TX/RX für modulierte Tests | Steuer-UART für Einzelträgertest (CW) |
|---|---|---|
| SF32LB52x | PA19 / PA18 | UART1 |
| SF32LB551 | PA49 / PA51 | UART3 (PB45 / PB46) |
| SF32LB555 / SF32LB557 | PA17 / PA19 | UART3 (PB45 / PB46) |
| SF32LB56xU (QFN) | PA17 / PA18 | UART1 |
| SF32LB56xV (BGA) | PA34 / PA30 | UART1 |
| SF32LB57x | PA19 / PA18 | UART1 |
| SF32LB58x | PA32 / PA31 | UART1 |

</div>

Bei SF32LB55x hängt die UART1-Belegung vom Modell ab. Verbinden Sie UART1 für modulierte BLE-/BT-Tests mit dem PC und verwenden Sie 1 000 000 Baud. Für Einzelträgertests mit SF32LB55x ist stattdessen UART3 (PB45/PB46) erforderlich; die übrigen aufgeführten Familien verwenden UART1. Weicht das Projekt von der Standardbelegung ab, gilt seine Pin-Konfiguration. Verbinden Sie den RF-Port über Koaxialkabel mit dem Messgerät, berücksichtigen Sie die Kabeldämpfung und unterscheiden Sie leitungsgebundene von abgestrahlten Messungen.

!!! note "Geltungsbereich nach Familie"
    Die UART-Tabelle ist der konsolidierte Familien-/Gehäusevergleich. Die folgenden Topologie- und `SiFli_RfTool`-Screenshots stammen aus dem SF32LB52x-Leitfaden; wählen Sie die tatsächliche Chip-Familie im Tool aus und überprüfen Sie die UART-Zuordnung des Zielprojekts.

!!! warning "Widersprüchliche SF32LB58x-UART-Zuordnung in offiziellen Leitfäden"
    Der [Bluetooth Individual RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/bt_individual_test_guide.html) nennt für UART1 TX/RX PA32/PA31, während der [allgemeine RF Test Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/rf_test_guide.html) für die RF-Debug-UART PA31/PA32 angibt. Prüfen Sie vor dem Anschließen den Testpfad der Ziel-Firmware und das Pinmux des Boards. Gehen Sie nicht davon aus, dass sich diese leitfadenspezifischen, widersprüchlichen Zuordnungen austauschen lassen.

![Testaufbau für Bluetooth-RF-Einzeltests](../../../../assets/develop/app-notes/bluetooth-single-item/figure_11-1.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — der PC steuert den Prüfling über UART/HCI, während der RF-Port über Koaxialkabel mit einem Tester oder Spektrumanalysator verbunden ist.</em></div>

## RF-Testmodus aktivieren { #enter-rf-test-mode }

1. Starten Sie den Prüfling und verhindern Sie, dass er in den Ruhezustand wechselt.
2. Senden Sie den FinSH-Befehl `bt_cm uart_dut` über SiFli_Trace.
3. Überprüfen Sie die hexadezimale Antwort `04 0E 04 XX 03 0C 00`.
4. Trennen Sie das Terminal; SiFli_RfTool verwendet dieselbe UART für die HCI-Steuerung.

## Ein BLE- oder Classic-BT-Signal senden { #transmit-a-ble-or-classic-bt-signal }

1. Öffnen Sie `SiFli_RfTool.exe`, wählen Sie die Chipfamilie sowie BLE Non-Signaling oder BT Non-Signaling aus und stellen Sie die Verbindung über den COM-Port von UART1 mit 1 000 000 Baud her.
2. Stellen Sie für BLE Frequency, Data Length, Nutzlast und PHY ein und wählen Sie dann Start TX. Stoppen Sie TX, bevor Sie Kanal oder PHY ändern.
3. Stellen Sie für Classic BT Frequency, Data Length und Packet Type ein und wählen Sie dann Start TX. Stoppen Sie TX, bevor Sie Paketparameter ändern.
4. Gleichen Sie am Tester Kanal, Pakettyp, Nutzlast und PHY ab. Ein Spektrumanalysator kann die Wellenform anzeigen, wenn kein Kommunikationstester verfügbar ist.

Der SDK-Quellcode enthält TX-Referenzpegel für das LB52x-HDK. Diese Werte gelten jedoch nur für diese Platine. Nutzen Sie sie lediglich zur Fehlersuche und messen Sie die tatsächliche Produktplatine.

![SiFli_RfTool Hauptsteuerelemente](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-1.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — die Chip-Familien-, Modus-, UART-, Baudraten- und TX-/RX-Steuerelemente des Tools; überprüfen Sie diese Auswahl, bevor Sie einen Testvektor anwenden.</em></div>

![SiFli_RfTool BLE-TX-Einstellungen](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-2.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — Chip, Modus, Kanal, Nutzlast, PHY, Datenlänge und Leistung auswählen, bevor TX gestartet wird.</em></div>

## Empfangen und Empfindlichkeit berechnen { #receive-and-calculate-sensitivity }

Stoppen Sie TX, bevor Sie RX aktivieren. Stellen Sie den Kanal ein und drücken Sie Start RX; stoppen Sie RX, bevor Sie ihn ändern. Konfigurieren Sie für BLE-RX den Tester für Direct Test Mode, wählen Sie PHY/Kanal, senden Sie 1 500 Pakete und berechnen Sie:

```text
PER = (1500 - received_packets) / 1500 × 100%
```

Notieren Sie auch den RSSI-Wert. Verwenden Sie für Classic-BT-RX eine CMW500-GPRF-Generator-Wellenform wie DH1/2-DH1/3-DH1 und zeichnen Sie empfangene Pakete, Fehlerpakete, Bitanzahl, BER und RSSI auf. Die BLE- und Classic-BT-RF-Pfade teilen sich die Hardware; führen Sie sie nicht parallel aus.

![SiFli_RfTool BLE-RX-Einstellungen](../../../../assets/develop/app-notes/bluetooth-single-item/figure_13-5.png){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — TX stoppen, bevor RX gestartet wird, und Kanal, Modulation, PHY und Empfangsergebnis aufzeichnen.</em></div>

## Einzelträger- und Messgerätekonfiguration { #single-carrier-and-instrument-setup }

Stoppen Sie den aktuellen Vorgang, bevor Sie zum Einzelträgertest (CW) wechseln. Stellen Sie bei SF32LB55x die Verbindung zwischen Prüfling und PC von UART1 auf UART3 (PB45/PB46) um, wählen Sie in SiFli_RfTool den zugehörigen COM-Port und stellen Sie 1 000 000 Baud ein. Verwenden Sie bei den übrigen aufgeführten Familien UART1. Stellen Sie Trägerfrequenz und TX-Leistung ein, starten Sie die Übertragung und prüfen Sie das Signal mit einem Spektrumanalysator oder Leistungsmesser.

Für Messungen der modulierten BLE-/BT-TX mit einem Tester wählen Sie den Empfangsmodus StandAlone (Non Signaling) und stimmen Kanal, Pakettyp, Nutzlast und PHY auf die Einstellungen in SiFli_RfTool ab. Für RX-Messungen am Prüfling konfigurieren Sie den Tester als Signalquelle: BLE verwendet DTM-Parameter, Classic BT eine GPRF-Wellenform.

Wenn das Tool oder die serielle Verbindung nicht mehr reagiert, schließen Sie SiFli_RfTool, schalten Sie den Prüfling aus und wieder ein und warten Sie den Start ab, bevor Sie die Verbindung erneut herstellen. Halten Sie Tool-Version, Firmware-Identität, Chip/Gehäuse, UART-Pins, Board-Revision, Kanal, PHY/Pakettyp, Leistung, Kabeldämpfung, Messgerätekonfiguration und Rohdaten im Testprotokoll fest.

![Tester-Konfiguration für Non-Signaling-Empfang](../../../../assets/develop/app-notes/bluetooth-single-item/figure_14-1.jpg){ loading="lazy" }
<div align="center"><em>Abbildung: Beispiel aus dem SF32LB52x-Leitfaden — StandAlone (Non Signaling) auswählen und Kanal sowie Paketparameter auf den Prüfling abstimmen.</em></div>

Offizielle Familienquellen: [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html) und [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E5%8D%95%E9%A1%B9%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
