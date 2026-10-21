---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD: SF32LB58x-Entwicklungsboard für die Inbetriebnahme von MIPI-DSI-, RGB- und QSPI-Displays mit Audio, SDIO, CAN und Erweiterungsschnittstellen."
tags:
    - Hardware
    - Entwicklungsboard
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## Überblick { #overview }

Das SF32LB58-DevKit-LCD ist ein Entwicklungsboard auf Basis der Modulfamilie SF32LB58-MOD. Es unterstützt Produkte mit DSI-, DPI/RGB- oder QSPI-Displays und bietet eine praxisnahe Plattform, um hochauflösende Bedienoberflächen, Audio, Speicher, USB und die Einbindung von Peripherie zu validieren.

Das Board vereint das SF32LB58x-Modul, mehrere Display-Steckverbinder, einen analogen Mikrofoneingang, einen Stereo-Lautsprecherausgang, MicroSD, zwei USB-Type-C-Anschlüsse, Erweiterungsleisten für den Hochleistungs- und den Low-Power-Kern sowie Zubehörschnittstellen wie CAN und SDIO-WLAN-Erweiterung.

Nutzen Sie das Board, um Display, Speicher, Audio, USB und externe Peripherie gemeinsam zu validieren, bevor Sie sich auf ein eigenes Design festlegen.

![Vorderansicht des SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Vorderansicht</em></div>

![Rückansicht des SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Rückansicht</em></div>

![Blockdiagramm des SF32LB58-DevKit-LCD](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Blockdiagramm</em></div>

## Hinweise zu Board- und Modulversionen { #board-and-module-version-notes }

<div align="center"><em>Übersicht der Modulversionen</em></div>

<div align="center" markdown>

| Modulversion | Grundlage | Hinweise |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1 und SF32LB58-MOD-A128R32N1 mit SF32LB586VDD36 | Aktuelle Version; ändert die eMMC-Spannungssteuerung: PA74 steuert VCC und PA80 steuert VCCQ; ergänzt den Widerstand R0115 |
| V1.0.0 | SF32LB58-MOD-N16R32N1 mit SF32LB586VDD36 | Erste Modulversion, wie im Abschnitt zur Modulversion bei SiFli aufgeführt |

</div>

<div align="center"><em>Übersicht der Board-Versionen</em></div>

<div align="center" markdown>

| Board-Version | Grundlage | Hinweise |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1-V1.0.1 und SF32LB58-MOD-A128R32N1-V1.0.1 | Aktuelle Version; ergänzt die USB-Steckererkennung an PB24; ändert die PTC-Auslegung auf 2 A / 6 V, um die maximale Audioausgabe über beide Kanäle zu unterstützen; entfernt die Pegelwandlerstufe der RGB-LED, da deren Timing ungeeignet ist; ersetzt den DC/DC-Wandler, um die Ausgangswelligkeit zu verringern; entfernt den Pull-up-Widerstand an USB DP, um das Interrupt-Problem im USB-Device-Betrieb zu beheben |
| V1.0.0 | SF32LB58-MOD-N16R32N1-V1.0.0 mit SF32LB587VEE56 | Erste öffentliche Board-Version |

</div>

Die Quelle von SiFli ist für V1.0.0 widersprüchlich: Der Abschnitt zur Modulversion nennt SF32LB586VDD36, während der Abschnitt zur Board-Version SF32LB587VEE56 für ein Board mit dem Modul N16R32N1-V1.0.0 nennt. Prüfen Sie Silizium- und Modulkennzeichnung auf der tatsächlichen Hardware sowie die passenden Designdateien, bevor Sie ein Firmware-Target wählen oder sich auf eine Speicherkonfiguration verlassen.

## Highlights des Boards { #board-highlights }

- Modul SF32LB58-MOD-N16R32N1 oder SF32LB58-MOD-A128R32N1, je nach Board-Version
- V1.0.1 nutzt SF32LB586VDD36 mit zwei HPI-PSRAM-Bausteinen zu je 16 MB und 1 MB QSPI-NOR im Gehäuse; die MCU-Kennung von V1.0.0 widerspricht sich in der SiFli-Quelle (siehe Versionshinweis oben)
- Zusätzlich 16 MB QSPI-NOR oder 128 MB QSPI-NAND, je nach Modulvariante
- 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz
- IPEX-Antennenanschluss und RF-Anpassnetzwerk des Moduls
- MIPI-DSI- / RGB888-Displayunterstützung über dedizierte FPC-Steckverbinder
- Zwei QSPI- / DSPI- / SPI-Display-Pfade über 40-polige Stiftleisten
- Unterstützung für I2C-Touch-Panels
- Analoger Mikrofoneingang auf dem Board und Stereo-Class-D-Audioausgang
- Zwei USB-Type-C-Anschlüsse: einer für USB-zu-UART-Download/Debug, einer für USB 2.0 HS
- MicroSD-Kartensteckplatz über SDIO
- GPIO-Erweiterung für den großen Kern und den Low-Power-Kern über zwei 40-polige Stiftleisten
- CAN und SDIO-WLAN-Erweiterung möglich

## Wann dieses Board geeignet ist { #when-to-use-this-board }

Wählen Sie das SF32LB58-DevKit-LCD, wenn das Projekt eine realistische High-End-Plattform zur Validierung von Display und Peripherie statt eines minimalen Breakout-Boards benötigt.

- MIPI-DSI-, RGB888- oder QSPI-Displays in Betrieb nehmen
- Touch, Audio, Speicher und USB gemeinsam validieren
- Das Verhalten hochauflösender Benutzeroberflächen auf der SF32LB58x-Plattform testen
- CAN- oder SDIO-WLAN-Erweiterung evaluieren
- NOR- und NAND-basierte Modulkonfigurationen vergleichen
- Firmware auf einem Board der Spitzenklasse validieren, bevor die Arbeit an einer eigenen Leiterplatte beginnt

Für die Integrationsplanung auf Modulebene lesen Sie zusätzlich [SF32LB58-MOD](../modules/SF32LB58-MOD.md). Zu Architektur sowie Display- und Speicherfähigkeiten der Chipfamilie siehe [SF32LB58x](../chips/SF32LB58x.md).

## Hardware-Konfiguration { #hardware-configuration }

<div align="center"><em>Übersicht der Hardware-Konfiguration</em></div>

<div align="center" markdown>

| Bereich | Konfiguration |
| :--- | :--- |
| Kernmodul | SF32LB58-MOD-N16R32N1 oder SF32LB58-MOD-A128R32N1 |
| MCU je Board-Revision | V1.0.1: SF32LB586VDD36; V1.0.0: Widerspruch in der SiFli-Quelle (siehe Versionshinweis oben) |
| Speicher im Gehäuse (V1.0.1) | 16 MB + 16 MB HPI-PSRAM sowie 1 MB QSPI-NOR |
| Zusätzlicher Speicher | 16 MB QSPI-NOR oder 128 MB QSPI-NAND, je nach Modulvariante |
| Display | Unterstützung für MIPI DSI, DPI/RGB888 und QSPI |
| Audio | Analoger Mikrofonpfad auf dem Board sowie Stereo-Lautsprecherausgang |
| USB | USB-zu-UART Type-C und USB 2.0 HS Type-C |
| USB-zu-UART-Kanäle | Der Modellleitfaden für Boards von SiFli nennt zwei CH343K-USB-zu-UART-Debug-Kanäle; der detaillierte Board-Leitfaden ordnet die Kanäle keinem bestimmten Type-C-Anschluss zu |
| Speicherkarte | MicroSD-Kartensteckplatz über SDIO |
| Antenne | RF-Pfad des Moduls mit IPEX-Anschluss |
| Erweiterung | Zwei 40-polige Stiftleisten zur Erweiterung des Hochleistungs- und des Low-Power-Kerns |
| Bedienelemente und Testpunkte | Zwei Benutzertasten (HOME/Reset durch langes Drücken und Funktionstaste), eine separate Reset-Taste, Boot-Jumper „Mode“ sowie Testpunkte für UART/USB/CAN |
| Spannungswandlung | DC-DC-Wandler auf dem Board; das Änderungsprotokoll von SiFli V1.0.1 verzeichnet einen Wandlerwechsel zur Verringerung der Ausgangswelligkeit, nennt aber keine Bauteilnummer. Prüfen Sie die genaue Revision in Schaltplan/Stückliste. |
| Abmessungen / Betriebstemperatur | 65 × 50 mm / −40 bis 85 °C |

</div>

## Erste Schritte { #getting-started }

### Erforderliche Hardware { #required-hardware }

- Board SF32LB58-DevKit-LCD
- LCD-Modul mit MIPI DSI, RGB888 oder QSPI, je nach Anwendung
- USB-2.0-Datenkabel, Typ A auf Typ C oder gleichwertig
- Host-Rechner mit Windows, Linux oder macOS

### Optionale Hardware { #optional-hardware }

- Zwei Lautsprecher
- TF- / MicroSD-Karte
- J-Link oder kompatibler SWD-Debugger
- CAN-Transceiver-Board
- SDIO-WLAN-Modul

### Grundlegende Einrichtung { #basic-setup }

1. Schließen Sie das Ziel-Display an den passenden LCD-Steckverbinder an.
2. Verbinden Sie den USB-zu-UART-Type-C-Anschluss mit dem Host-Rechner.
3. Öffnen Sie das Download-Werkzeug von SiFli und wählen Sie den richtigen COM-Port.
4. Setzen oder entfernen Sie den Mode-Jumper, je nachdem, ob Sie den Download-Modus oder den normalen Betriebsmodus wünschen.
5. Versorgen Sie das Board und laden Sie die Ziel-Firmware herunter oder führen Sie sie aus.
6. Validieren Sie nach der Display-Inbetriebnahme Touch, Audio, Speicher und alle für das Produkt benötigten Erweiterungsperipheriegeräte.

Verwenden Sie ein USB-Kabel, das Daten übertragen kann. Manche Type-C-Kabel liefern nur Strom und stellen weder UART noch USB-Datenpfad bereit.

## Stromversorgung { #power }

Das SF32LB58-DevKit-LCD wird über USB Type-C versorgt.

- Beide USB-Type-C-Anschlüsse auf dem Board können das Board versorgen
- Verwenden Sie für Firmware-Download und UART-Logging den USB-zu-UART-Type-C-Anschluss
- Planen Sie den USB-2.0-HS-Type-C-Anschluss separat ein, wenn Sie native USB-Funktionen validieren

## Download und Debug { #download-and-debug }

Die primäre Schnittstelle für Firmware-Download und serielle Logs ist der USB-zu-UART-Type-C-Anschluss.

- **Download-Modus**: Mode-Jumper setzen, dann das Board einschalten oder zurücksetzen
- **Software-Debug-/Log-Modus**: Mode-Jumper entfernen, dann das Board einschalten oder zurücksetzen

Das Board unterstützt zudem J-Link- / SWD-Debug.

![Verdrahtungsreferenz für J-Link am SF32LB58-DevKit-LCD](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — J-Link-Verdrahtungsreferenz</em></div>

![Referenz zum J-Link-Adapter](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>Referenz zum J-Link-Adapter</em></div>

![Referenz zum SWD-Adapter](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>Referenz zum SWD-Adapter</em></div>

## SDK-Build-Targets { #sdk-build-targets }

Die Build-Konfiguration des SiFli SDK verwendet die folgenden exakten Board-Target-Namen mit `scons --board=<board_name>`:

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

Dies sind Build-Target-Bezeichner des SDK und nicht zwingend die auf einem Board oder Modul aufgedruckten Produktnamen. Der [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und die Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK können unterschiedliche Mengen aufführen; bestätigen Sie das Target anhand der verwendeten SDK-Revision. Insbesondere beschreiben Index und Build-Konfiguration nicht jedes Target der 58er-Serie auf dieselbe Weise, und der aktuelle [Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) führt für `sf32lb58-lcd_n16r64n4` keine passende physische SKU auf.

## Wichtige Modul- und Erweiterungssignale { #key-module-and-expansion-signals }

Das Board führt sowohl Signale auf Modulebene als auch zwei 40-polige Erweiterungsleisten heraus. Die vollständige Pinbelegung entnehmen Sie dem Modul-Datenblatt und dem Schaltplanpaket; die folgende Zusammenfassung behandelt die für das Design wichtigsten Gruppen.

<div align="center"><em>Wichtige funktionale Signalgruppen</em></div>

<div align="center" markdown>

| Signalgruppe | Typische Pins / Signale | Hauptverwendung |
| :--- | :--- | :--- |
| Download und Debug | PB36, PB37, SWDIO, SWCLK, Boot_Mode, RSTN | UART-Download, Software-Debug, SWD-Inbetriebnahme |
| MicroSD | PA75, PA76, PA77, PA70, PA81, PA79, PB58 | SDIO-Kartenschnittstelle und Kartenerkennung |
| RGB LCDC1 | PA12–PA15, PA22–PA27, PA43–PA48, PA50, PA53–PA58, PA61–PA63, PA65, PA67 | RGB888-Display-Pfad |
| MIPI DSI LCDC1 | Differenzpaare DSI_D0–DSI_D3 und DSI_CLK | MIPI-DSI-Display-Pfad; dokumentiert ist der Betrieb mit bis zu zwei Datenleitungen |
| QSPI LCDC1 | PA82, PA84, PA86, PA88, PA90, PA91, PA51, PA52 | QSPI-Display-Pfad auf der Seite des großen Kerns |
| QSPI LCDC2 | PB02–PB04, PB06, PB08–PB10, PB23, PB27, PB30, PB31, PB34 | QSPI-Display-Pfad auf der Seite des Low-Power-Kerns |
| Touch | PA16, PA17, PA59, PA60, PA92, PA93 | Reset-, Interrupt- und I2C-Signale des Touch-Panels |
| Audio | AU_DAC1/2, AU_ADC1/2, MIC_BIAS, PB23 | Analoger Audio-Ein-/Ausgang und PA-Freigabe |
| CAN / allgemeine Erweiterung | PA02, PA11 und GPIO-Gruppen der Stiftleisten | CAN und Peripherieerweiterung |

</div>

## Display-Schnittstellen { #display-interfaces }

Das Board unterstützt drei Haupt-Display-Pfade:

- **MIPI DSI** über einen 30-poligen FPC-Steckverbinder mit 0,5 mm Raster
- **RGB888** über einen 40-poligen FPC-Steckverbinder mit 0,5 mm Raster, kompatibel mit der gängigen ALIENTEK-RGB-Pinbelegung
- **QSPI / DSPI / SPI** über die beiden 40-poligen Erweiterungsleisten

Die Display-Hinweise aus der SiFli-Quelle umfassen:

- MIPI-DSI-Panels mit bis zu 2 Lanes und Auflösungen bis 1280 × 800
- RGB888-Panels mit Auflösungen bis 1280 × 800
- QSPI-Panels mit Auflösungen bis 512 × 512

!!! warning "Anzahl der MIPI-DSI-Lanes"
    Die Pinbelegung des 30-poligen Steckverbinders am Board beschriftet D0–D3, aber der Board-Leitfaden und das SDK dokumentieren den Betrieb mit bis zu zwei Datenleitungen. Schließen Sie aus den Beschriftungen des Steckverbinders nicht auf Vier-Lane-Unterstützung. Prüfen Sie die Lane-Verdrahtung für das konkrete Panel und die Board-Revision vor der Verwendung.

![Verdrahtungsreferenz für MIPI-Displays](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Verdrahtungsreferenz für MIPI-Displays</em></div>

![Verdrahtungsreferenz für LCDC1-QSPI-Displays](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC1-QSPI-Display-Verdrahtung</em></div>

![Verdrahtungsreferenz für LCDC2-QSPI-Displays](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — LCDC2-QSPI-Display-Verdrahtung</em></div>

## Audio { #audio }

Das Board unterstützt:

- Einen Mikrofoneingangspfad auf dem Board
- Zwei Audio-ADC-Eingangspfade; Widerstandsjumper bestimmen, ob ein gemeinsamer Pfad mit dem Mikrofon auf dem Board oder mit dem Eingang der 40-poligen Stiftleiste verbunden ist
- Zwei Lautsprecherausgänge
- Einen PDM-Signalpfad, der mit RGB-Signalen gemultiplext ist und daher bei aktivem RGB-Display-Pfad nicht verfügbar ist

Der [detaillierte Board-Leitfaden](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html) von SiFli gibt für den analogen Stereo-Ausgang bis zu 2,8 W/4 Ω an, während der [Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) 3 W/4 Ω für die beiden Lautsprecherausgänge nennt. Keine der Quellen sagt, ob sich der Wert auf einen Kanal oder die Summe bezieht. Prüfen Sie genaue Board-Revision, Schaltplan sowie Versorgungs- und Lastbedingungen des Verstärkers, bevor Sie Lautsprecher auswählen; betrachten Sie keinen der Werte als garantierte Ausgangsleistung pro Kanal.

![Verdrahtungsreferenz für Audio](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — Audio-Verdrahtungsreferenz</em></div>

## CAN- und SDIO-WLAN-Erweiterung { #can-and-sdio-wi-fi-expansion }

Das zugrunde liegende SF32LB58-Modul enthält einen CAN-Controller, und das Board führt die Schnittstelle für den Einsatz mit einem externen Transceiver heraus.

![Verdrahtungsreferenz für CAN](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — CAN-Verdrahtungsreferenz</em></div>

![Referenz-CAN-Transceiver-Board](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>Referenz-CAN-Transceiver-Board</em></div>

Das Board unterstützt außerdem die SDIO-WLAN-Erweiterung über die Schnittstelle der Stiftleiste.

![Referenz-SDIO-WLAN-Modul](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>Referenz-SDIO-WLAN-Modul</em></div>

![Verdrahtungsreferenz für SDIO-WLAN](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — SDIO-WLAN-Verdrahtungsreferenz</em></div>

![Referenz-Schaltplan für SDIO-WLAN](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>Referenz-Schaltplan für SDIO-WLAN</em></div>

## Verwandte Dokumente { #related-documents }

[SF32LB58x Chip Introduction]: ../chips/SF32LB58x.md
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[SF32LB58-MOD Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[SF32LB58-DevKit-LCD Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[SF32LB58-DevKit-LCD LCEDA Project]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB58x-Chipeinführung][SF32LB58x Chip Introduction]__
- :fontawesome-solid-file-pdf: __[SF32LB58x-Benutzerhandbuch][SF32LB58x User Manual]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[SF32LB58-MOD-Designpaket][SF32LB58-MOD Design Package]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD-Designpaket][SF32LB58-DevKit-LCD Design Package]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD-LCEDA-Projekt][SF32LB58-DevKit-LCD LCEDA Project]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__

</div>
