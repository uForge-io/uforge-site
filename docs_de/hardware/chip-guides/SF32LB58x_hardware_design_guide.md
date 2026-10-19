---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für die SF32LB58x-MCU: Stromversorgungsarchitektur, Takt- und RF-Design, Display, Speicher, Audio und PCB-Layout-Hinweise."
tags:
    - Hardware
    - Chip
---

# SF32LB58x Hardware-Design-Leitfaden { #sf32lb58x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden enthält Empfehlungen und Referenzmaterial für Produkte auf Basis der leistungsstarken AIoT-Mikrocontrollerfamilie SF32LB58x. Er richtet sich an Hardwareingenieure, Leiterplattenentwickler und Produktentwickler, die akkubetriebene Produkte mit anspruchsvollen Benutzeroberflächen, großem Speicherbedarf, Bluetooth im Dual-Mode, Audio, zahlreichen GPIOs und niedrigem Standby-Stromverbrauch entwickeln.

Der Leitfaden beschreibt den gesamten Hardware-Entwicklungsprozess: PMIC und Stromverteilung, BGA256-Fanout, HDI-Lagenaufbau, Taktschaltungen, RF-Design, MIPI-DSI, USB 2.0 High-Speed, SDIO/eMMC, Audioschaltungen, Leiterplattenlayout, Validierung und Fertigungsvorbereitung. Die Empfehlungen helfen, Risiken bei kompakten BGA-/HDI-Designs zu senken, die Signalintegrität an Hochgeschwindigkeitsschnittstellen zu sichern und die Anforderungen des SF32LB58x an Stromversorgung, Gehäuse und Fertigung einzuhalten.

Dieses Dokument setzt Grundkenntnisse in der Entwicklung eingebetteter Hardware, im Erstellen von Schaltplänen und im Layout hochdichter Leiterplatten voraus. Es ergänzt das SF32LB58x-Datenblatt, das Benutzerhandbuch, den offiziellen Hardware-Anwendungshinweis, das Referenzdesign-Paket und die SiFli-Liste freigegebener Lieferanten. Für elektrische Spezifikationen, Pin-Multiplexing, Gehäuseabmessungen, Bauteilqualifizierung und Fertigungsgrenzwerte sind weiterhin diese offiziellen Unterlagen maßgeblich.

## 2. Entwicklungsressourcen { #2-development-resources }

[SF32LB58x Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32LB58x Schematic & PCB Checklist workbook]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x-Produktübersicht][SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x-Datenblatt][SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x-Benutzerhandbuch][SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware-Anwendungshinweis][SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SF32LB58x Schaltplan- und PCB-Checkliste (Arbeitsmappe)][SF32LB58x Schematic & PCB Checklist workbook]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

## 3. Geräteübersicht { #3-device-overview }

### 3.1. Architektur { #31-architecture }

<div align="center"><em>Tabelle 3.1-1: Übersicht der wichtigsten Hardware-Merkmale</em></div>

<div align="center" markdown>

| Merkmal | Beschreibung |
|:---|:---|
| Kernarchitektur | Heterogene Dreikernarchitektur: 2× Arm-Cortex-M33-STAR-MC1-Anwendungskerne mit bis zu 240 MHz und 1× energiesparender Arm-Cortex-M33-STAR-MC1-Kern mit bis zu 96 MHz |
| Bluetooth | Integrierter Dual-Mode-Bluetooth-5.3-Transceiver mit niedrigem Stromverbrauch |
| Grafik | ePicasso 2.0 2D/2,5D-Grafikbeschleunigung und Vivante GCNanoUltraV Vektorgrafik |
| Display-Schnittstellen | MIPI-DSI, SPI/QSPI, MCU8080, DPI, parallel/seriell JDI |
| Speicher | Je nach Modell im Gehäuse integrierter NOR-Flash und/oder PSRAM; externer NOR- oder SPI-NAND-Flash über MPI3 oder MPI4; SDIO-Schnittstellen SD1 und SD2 |
| Audio | 3 I2S-Schnittstellen, 2 PDM-Schnittstellen, differenzieller analoger Audio-Ein-/Ausgang; unterstützt externe analoge Audio-Leistungsverstärker und I2S-Audioverstärker |
| Weck-Interrupts | Alle GPIOs können den Chip aus Light Sleep und Deep Sleep aufwecken. Standby/Hibernate unterstützt 16 Weck-Interruptquellen: 6 auf PA und 10 auf PB |
| PBR-Schnittstelle | Sechs PBR-Pins. PBR0 wechselt beim Einschalten von 0 auf 1 und kann ausgewählte externe Lastschalter (LSW) steuern; PBR1-PBR5 sind standardmäßig Low. PBR0-PBR5 können LPTIM oder einen 32-kHz-Takt ausgeben und bleiben auch in Standby/Hibernate als Ausgänge nutzbar. PBR0-PBR3 lassen sich als Weckeingänge konfigurieren, lösen jedoch keinen Interrupt aus, solange die MCU aktiv ist. |

</div>

### 3.2. Varianten { #32-variants }

Bestätigen Sie vor der Schaltplanfreigabe die genaue Bestellnummer des SF32LB58x und die SiP-Speicherkonfiguration anhand des aktuellen Datenblatts und der AVL. Die Familie verwendet das BGA256-Gehäuse und erfordert eine HDI-Leiterplatte; der SiP-Speicher hängt vom Modell ab. Externer NOR- oder SPI-NAND-Flash kann über MPI3 oder MPI4 angebunden werden. Auf dem SiFli-EVB wird MPI4 für den externen SPI-NAND-Flash verwendet; SD1 ist für eMMC oder SD-NAND-Flash vorgesehen, SD2 für eine SD-Karte oder ein Wi-Fi-Gerät. Prüfen Sie vor dem Abschluss des Designs die Pinbelegung des gewählten Bauteils und das Routing der Ziel-Leiterplatte.

### 3.3. Gehäuse { #33-packages }
<div align="center"><em>Tabelle 3.3-1: Gehäuse</em></div>

<div align="center" markdown>

| Gehäusename | Abmessungen | Pinraster |
|:---|:---|:---|
| BGA256 | 8,5 mm × 6,5 mm × 0,94 mm | 0,4 mm |

</div>

### 3.4. Wichtige Hardware-Merkmale { #34-major-hardware-features }

- BGA256-Gehäuse mit 0,4-mm-Raster und dichtem Fanout für Stromversorgung und GPIOs.
- HDI-Fertigung ist erforderlich; PTH-Leiterplatten werden nicht unterstützt.
- Integrierte PMU mit 2 BUCK-Ausgängen und 3 internen LDO-Ausgängen.
- Optionaler System-PMIC SF30147C zur Stromversorgung von Systemen der Smartwatch-Klasse.
- Für MIPI-DSI, USB 2.0 HS, SDIO/eMMC, RF, Audio und das dichte BGA-Fanout müssen Lagenaufbau und Impedanz frühzeitig bestätigt werden.

### 3.5. Typische Anwendungen { #35-typical-applications }

Der SF32LB58x eignet sich für vernetzte Produkte, die fortschrittliche Grafik, viel Speicher, Multimedia und Edge-AI-Workloads kombinieren, zum Beispiel:

- Smartwatches, Sportuhren und Wearables für den Outdoor-Einsatz
- Fortschrittliche Fahrradcomputer und fahrzeugmontierte Dashboards
- Smart-Displays und vernetzte Dashboards
- KI-gestützte Wearables
- Edge-AI- und Sensorfusionssysteme
- Hochauflösende LVGL-basierte HMI-Geräte
- Tragbare medizinische und industrielle Terminals
- Zubehör mit Bluetooth und Wi-Fi, das ein externes SDIO-Wi-Fi-Gerät nutzt

## 4. Design auf einen Blick { #4-design-at-a-glance }

### 4.1. Hardware-Architektur { #41-hardware-architecture }
<div align="center"><em>Tabelle 4.1-1: Kurzübersicht des Designs</em></div>

<div align="center" markdown>

| Design-Punkt | Typische Umsetzung |
|:---|:---|
| Gehäuse | BGA256, 8,5 mm × 6,5 mm × 0,94 mm, Raster 0,4 mm |
| Leiterplatte | Ausschließlich HDI; nicht PTH-kompatibel. Lagenaufbau 6HDI-2 empfohlen |
| Stromversorgung | Integrierte PMU (2 BUCK + 3 LDO); für die Stromversorgung des Gesamtsystems optional mit dem SiFli-PMIC SF30147C kombinierbar |
| BUCK-Induktivität | 4,7 µH, DCR ≤ 0,4 Ω, Isat ≥ 500 mA |
| Takt | 48-MHz-Hauptquarz + 32,768-kHz-RTC-Quarz |
| RF | Leiterbahn mit 50-Ω-kontrollierter Impedanz, reserviertes π-Anpassnetzwerk |
| Display | MIPI-DSI (2 Lanes), SPI mit 3/4 Leitungen, Quad-SPI, MCU8080, DPI und paralleles/serielles JDI; Pinbelegung für beide LCDCs: LCDC1 (PA) / LCDC2 (PB) |
| Speicher | Externer NOR- oder SPI-NAND-Flash über MPI3 oder MPI4. Das SiFli-EVB nutzt MPI4 für SPI NAND, SD1 für eMMC oder SD NAND und SD2 für SD-Karte oder Wi-Fi-Gerät |
| Audio | 3 I2S-Schnittstellen (nur Master), 2 PDM-Schnittstellen, differenzieller analoger Audio-Ein-/Ausgang |
| Debugging | 1 SWD-Schnittstelle + 6 auswählbare UART-Debug-Ausgänge |
| USB | USB 2.0 HS, Host- und Gerätebetrieb |

</div>

### 4.2. Hardware-Designablauf { #42-hardware-design-flow }

<div align="center"><em>Tabelle 4.2-1: Hardware-Designablauf</em></div>

<div align="center" markdown>

| Schritt | Entwurfsentscheidung | Hauptabschnitte |
|:---|:---|:---|
| 1 | Bestellnummer, SiP-Speicherkonfiguration und Annahmen zum BGA256-Gehäuse bestätigen | Geräteübersicht, Gehäuse |
| 2 | HDI-Lagenaufbau, Via-Struktur, Impedanzregeln und Fertigungsmöglichkeiten vor Beginn des Layouts festlegen | PCB-Layout-Richtlinien |
| 3 | Entscheiden, ob der optionale System-PMIC SF30147C benötigt wird; anschließend die Versorgungsschienen der integrierten PMU, BUCK-Induktivitäten, LDO-Kondensatoren, Rücksetzung und Einschaltsequenz festlegen | Stromversorgungssystem |
| 4 | Boot-Speicher, Displayschnittstelle, USB-Betriebsart, SDIO/eMMC-Nutzung, Audio-Topologie und Debug-Zugang auswählen | Speicher und Konnektivität, Benutzerschnittstellen, Fertigung |
| 5 | Layout-Screenshots zu Takt, RF, DSI, USB 2.0 HS, SDIO/eMMC, Audio, DC/DC, BGA-Fanout und ESD prüfen | Takterzeugung, RF, PCB-Layout-Richtlinien |
| 6 | Schaltplan, Lagenaufbau, DRC- und Impedanzberichte, AVL-Abgleich, Fertigungsunterlagen und gezielte Layout-Dokumentation vor der Prototypfreigabe archivieren | Design-Review-Checkliste |

</div>

### 4.3. Verwendung dieses Leitfadens { #43-how-to-use-this-guide }

Verwenden Sie diesen Leitfaden in der Reihenfolge eines Leiterplatten-Reviews: Bestätigen Sie zunächst Gehäuse und SiP-Speicherkonfiguration und legen Sie dann HDI-Lagenaufbau und PMIC-Konzept fest. Prüfen Sie anschließend Boot-Speicher und Display-Signalführung sowie Takte, RF, USB, Audio, Debugging und Zugang zu Produktionstests. Abschnitt 5 dient als Grundlage für den Schaltplan, Abschnitt 6 für das Leiterplattenlayout und Abschnitt 7 als Freigabe-Checkliste.

### 4.4. Review-Nachweispaket { #44-review-evidence-pack }

Archivieren Sie vor der Prototypfreigabe das Schaltplan-PDF, den Leiterplatten-Lagenaufbau, den Nachweis zur Via- und Prozessfähigkeit, die Impedanz- und DRC-Berichte sowie den AVL-Abgleich. Halten Sie außerdem gezielte Layoutnachweise für PMIC, BUCK-Induktivitäten, DSI, USB, SDIO/eMMC, RF, Quarze, Audio, BGA-Fanout, Masse-Rückstrompfade und ESD-Eintrittspunkte fest.

### 4.5. Verwendung der Checklisten { #using-the-checklists }

Dieser Leitfaden enthält Checklisten auf zwei Ebenen. Die kurzen Checklisten in den Abschnitten 5.2.1.7 und 5.7.3 bündeln die risikoreichsten Punkte für eine schnelle technische Selbstprüfung. Die [Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md) (Abschnitt 6.18) geben die vollständige, punktweise *SF32LB58x Schematic & PCB Checklist* von SiFli wieder (V1.0, 2026-01-21).

Jeder Prüfpunkt ist entweder erforderlich (muss vor der Freigabe bestanden werden) oder optional (empfohlen, wenn die betreffende Funktion genutzt wird). Farbige Hervorhebungen und Text mit <span class="flag-yellow">gelbem Hintergrund</span> übernehmen die Markierungen aus der Quell-Arbeitsmappe. Da die Arbeitsmappe die einzelnen Markierungen nicht begründet, dienen sie als zusätzliche Prüfhinweise und ersetzen keine nicht hervorgehobenen Punkte derselben Tabelle.

Die Checklisten-Arbeitsmappe der Quelle fordert für eine nicht in der AVL geführte BUCK-Induktivität Isat ≥ 450 mA, während der offizielle Hardware-Anwendungshinweis Isat ≥ 500 mA bei L = 4,7 µH und DCR ≤ 0,4 Ω nennt. Die Checkliste behält den Wert der Arbeitsmappe bei. Bis SiFli die Abweichung klärt, wählen Sie für ein nicht in der AVL geführtes Bauteil eine Induktivität mit mindestens 500 mA Isat.

Verwenden Sie die [Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md) bei der Schaltplanprüfung, bevor das Leiterplattenlayout beginnt. Verwenden Sie die [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md) bei der Layoutprüfung vor der Freigabe der Gerber-Daten. Üblicherweise wird jede Prüfung zweimal durchgeführt: zuerst durch den verantwortlichen Entwicklungsingenieur, anschließend vor dem Design-Freeze oder der Fertigungsfreigabe durch eine unabhängige prüfende Person.

Verwenden Sie die Checkliste am besten als Abnahmeprotokoll und nicht nur als Leseliste:

1. Bestätigen Sie zuerst die genaue Bestellnummer und die SiP-Speicherkonfiguration.
2. Kennzeichnen Sie während der Prüfung jeden Punkt als bestanden, nicht bestanden oder nicht zutreffend, statt die Tabelle nur zu lesen.
3. Gleichen Sie die Punkte zu Display, Speicher, Aufwecken und niedrigem Stromverbrauch mit den entsprechenden Abschnitten des Hardware-Design-Leitfadens ab.
4. Halten Sie ungeklärte Annahmen vor der Freigabe in den Prüfnotizen fest.

<div align="center"><em>Tabelle 4.5-1: Vorlage für das Review-Protokoll</em></div>

<div align="center" markdown>

| Feld | Wert |
|:---|:---|
| Kundenname | |
| Name des Kundendesigns | |
| Einreichungsdatum zur Prüfung | |
| Erstprüfer | |
| Datum der Erstprüfung | |
| Zweitprüfer | |
| Datum der Zweitprüfung | |

</div>

<div align="center"><em>Tabelle 4.5-2: Versionshistorie des Checklisten-Dokuments</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Versionshinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung der Schaltplan- und PCB-Checkliste |

</div>

## Fortsetzung des Design-Leitfadens { #continue-the-design-guide }

Der vollständige Leitfaden setzt sich über die untenstehenden Seiten fort. Jede Seite behandelt eine Phase des Designprozesses und ist von hier aus erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Schaltplan-Designrichtlinien](SF32LB58x_schematic_design.md)__ — Stromversorgung, Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität sowie Fertigung
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md)__ — punktweise Schaltplan-Review-Checkliste (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[Leiterplattenlayout-Richtlinien](SF32LB58x_pcb_layout.md)__ — Gehäuse-Footprint, Lagenaufbau, Fanout und Leiterbahnführung für Takt, RF, Audio, USB, SDIO, DSI und Stromversorgung
- :fontawesome-solid-list-check: __[PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md)__ — punktweise PCB-Layout-Review-Checkliste (Abschnitt 6.18)
- :fontawesome-solid-book-open: __[Design-Review-Checkliste und Referenzen](SF32LB58x_review_and_reference.md)__ — Freigabe-Checkliste, zugehörige Dokumente, Anhänge und Revisionshistorie

</div>
