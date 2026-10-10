---
icon: lucide/circuit-board
description: "Wie der SiFli-SDK-Parameter --board die Firmware dem konkreten SF32-Board zuordnet: Flash-/PSRAM-Belegung, Pin-Multiplexing, Display- und Audiopfade sowie eine Checkliste zur Inbetriebnahme."
tags:
    - Entwicklung
    - SiFli-SDK
---

# Board-Konfiguration { #board-configuration }

Die Board-Konfiguration ordnet die Firmware der realen Hardware zu. Dazu gehören das Flash-Layout, der PSRAM, die Pins, die Display-Schnittstelle, der Audiopfad, die Taktung, die Spannungsversorgung und die standardmäßig verwendeten Peripheriegeräte.

In SiFli-SDK ist `--board=<board_name>` der wichtigste Build-Parameter. Er bestimmt, welches Board-Support-Paket das Beispiel verwendet.

Bei Dual-Core-Boards wird standardmäßig die HCPU-Konfiguration gewählt, wenn kein Core-Suffix angegeben ist. Für einen LCPU-Build hängen Sie `_lcpu` an den Board-Namen an; mit `_hcpu` wählen Sie HCPU ausdrücklich aus. Prüfen Sie, ob das Beispiel den gewählten Core unterstützt.

## Was die Board-Auswahl beeinflussen kann { #what-the-board-name-controls }

Das gewählte Board kann Folgendes beeinflussen:

- Chip- und Gehäusevariante.
- Flash- und PSRAM-Layout.
- HCPU-/LCPU-Build-Ziele.
- Pin-Mux und Peripherieverfügbarkeit.
- UART-Download-Einstellungen.
- Display- und Touch-Konfiguration.
- Audio-Codec-Routing.
- Bluetooth-Konfiguration.
- Partitionstabelle und Annahmen zum Bootvorgang.

## Praktische Regeln { #practical-rules }

- Den Board-Namen nicht aus dem Marketingnamen erraten.
- Keinen Board-Namen aus Zephyr oder Arduino in SiFli-SDK übernehmen.
- Beim Auswählen von GPIO-, ADC-, PWM-, I2C-, SPI- oder Display-Ressourcen den Schaltplan des Boards oder die Seite des Dev-Kits heranziehen.
- Mit dem nächstliegenden SDK-Beispiel für dasselbe Board beginnen.
- Nach einem Board-Wechsel sauber neu bauen.

## Checkliste zur Inbetriebnahme { #board-bring-up-checklist }

- [ ] Chipvariante und Gehäuse bestätigen.
- [ ] Typ, Kapazität und Konfiguration von Flash und PSRAM bestätigen.
- [ ] Stromquelle und Ladeverhalten bestätigen.
- [ ] Die auf diesem Board verwendeten Taktquellen und Frequenzen bestätigen, einschließlich 48 MHz und 32,768 kHz, sofern zutreffend.
- [ ] Download-UART und Log-UART bestätigen.
- [ ] Display- und Touch-Schnittstelle bestätigen.
- [ ] Audio-Pfad bestätigen, falls verwendet.
- [ ] Boot-Pins und Reset-Verhalten bestätigen.
- [ ] Partitionslayout bestätigen.

Beginnen Sie erst mit dem Anwendungs-Debugging, wenn die Board-Konfiguration der tatsächlich verwendeten Hardware entspricht.

## Beispiel für einen SDK-Board-Namen { #sdk-board-name-example }

<div align="center"><em>Tabelle: SDK-Board-Name des SF32LB52-DevKit-LCD_N16R8</em></div>

<div align="center" markdown>

| Namensart | Kennung |
|:----------|:--------|
| Board-Modell | `SF32LB52-DevKit-LCD_N16R8` |
| SiFli-SDK-Wert für `--board` | `sf32lb52-lcd_n16r8` |

</div>

Verwenden Sie mit SiFli-SDK die SDK-Kennung für `--board`; der Produktname ist keine Build-Kennung.

## Bei der Portierung auf ein eigenes Board { #when-porting-to-a-custom-board }

Beginnen Sie mit der ähnlichsten Konfiguration eines Dev-Kits oder Moduls und passen Sie anschließend Folgendes an:

1. Flash- und PSRAM-Konfiguration.
2. Pin-Mux.
3. Konsolen-/Download-UART.
4. Display-/Touch-/Audio-Ressourcen.
5. Stromversorgungs- und Ladeannahmen.
6. Partitionslayout.
7. Produktspezifische Peripherie.

Prüfen Sie jede Änderung mit dem kleinsten Beispiel, mit dem sich die jeweilige Anpassung testen lässt.
