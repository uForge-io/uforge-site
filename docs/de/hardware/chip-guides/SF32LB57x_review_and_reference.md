---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Selbstprüfung des Kundendesigns, zugehörige Dokumente und Referenzen, Anhänge und Revisionshistorie zum SF32LB57x-Hardware-Design-Leitfaden."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden — Checkliste für das Design-Review und Referenzen { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Teil des SF32LB57x-Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 7 bis 10: Selbstprüfung des Kundendesigns, zugehörige Dokumente und Referenzen, Anhänge und Revisionshistorie. Zurück zu den [Richtlinien für das PCB-Layout](SF32LB57x_pcb_layout.md).

## 7. Selbstprüfung des Kundendesigns { #7-customer-design-self-check }

Schließen Sie diese Checkliste ab, bevor Sie ein Schaltplan-Review, ein PCB-Layout-Review oder die EVT-Freigabe anfordern. Die verantwortliche Person auf Kundenseite sollte für jeden Punkt Ergebnis und Nachweis dokumentieren und gegebenenfalls die betreffenden Schaltplanseiten angeben sowie PCB-Screenshots, Messwerte oder Prüfvermerke beifügen.

### 7.1. Gehäuse und Teilenummer { #71-package-and-part-number }

- [ ] Bestellbare Teilenummer, Stromversorgungsfamilie, Gehäuse und Pinbelegung sind bestätigt.
- [ ] Das Symbol aus der Schaltplanbibliothek und der PCB-Footprint stimmen mit dem Datenblatt überein.
- [ ] Bei QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY -->-Gehäusen sind Pads, Schablone, freiliegendes Pad und Via-Design geprüft.

### 7.2. Stromversorgung { #72-power }

- [ ] Jeder Versorgungspin bleibt innerhalb der spezifizierten Spannungs- und Belastungsgrenzen; Kondensatorwerte und Platzierung entsprechen dem Datenblatt.
- [ ] BUCK-Induktivität, Kondensatoren und Rückkopplungsführung erfüllen die Layoutanforderungen.
- [ ] Interne LDO-Ausgänge werden nicht fälschlich als Hochstrom-Peripherieversorgung genutzt.
- [ ] Die Stromversorgungspfade entsprechen der gewählten Versorgungsfamilie. Prüfen Sie die geltenden Lade-/OVP-, VBUS-, VBAT-, VCC- und/oder PVDD-Verbindungen anhand der Versorgungstabelle für das genaue Gehäuse und die genaue Variante; die Topologien für akkubetriebene und 3,3-V-Versorgung dürfen nicht vermischt werden.
- [ ] Peripherieversorgungen lassen sich abschalten und haben sichere Standardzustände.

### 7.3. Takte { #73-clocks }

- [ ] Die 48-MHz- und 32,768-kHz-Quarze erfüllen die empfohlenen Parameter.
- [ ] Die Quarze sind nahe am Chip platziert; um sie herum sind Freihaltebereiche definiert.
- [ ] Die Quarzleitungen sind von Störungen durch Stromversorgung, RF, USB, SDIO, Display und Ladeelektronik ferngehalten.

### 7.4. Speicher und Boot { #74-storage-and-boot }

- [ ] Falls die gewählte Teilenummer gehäuseintegrierten Speicher enthält, sind dessen Konfiguration und Auswirkungen auf verfügbare externe Speicherschnittstellen und Gehäusepins für genau dieses Gehäuse und diese Variante bestätigt.
- [ ] Typ des externen Boot-Mediums, Pull-ups, Stromsteuerung und Standardzustand sind korrekt.
- [ ] Boot-Konfiguration sowie Download-/Debug-Testpunkte sind reserviert.

### 7.5. RF { #75-rf }

- [ ] Die Antennenzuleitung ist für eine kontrollierte Impedanz von 50 Ω ausgelegt.
- [ ] Das π-Anpassnetzwerk ist nahe am Chip platziert.
- [ ] Die RF-Leitung hat eine durchgehende Referenzmasse und Via-Abschirmung.
- [ ] RF ist von Störquellen und Hochgeschwindigkeitsschnittstellen isoliert.

### 7.6. Display und Touch { #76-display-and-touch }

- [ ] Display-Schnittstelle, Auflösung und Pin-Gruppe erfüllen die Anforderungen des Displays.
- [ ] Display-, Hintergrundbeleuchtungs- und Touch-Versorgungen sind steuerbar.
- [ ] Der Touch-Interrupt liegt auf einem GPIO mit Weckfunktion, wenn das System darüber aufgeweckt werden soll.
- [ ] FPC und Hochgeschwindigkeits-Display-Leitungen werden von RF ferngehalten.

### 7.7. Audio und Analog { #77-audio-and-analog }

- [ ] MIC_BIAS-, AUD_VREF- und AVDD33_AUD-Entkopplung ist korrekt.
- [ ] DC-Sperre und Filterung der Analogeingänge sind korrekt.
- [ ] Das DACP/DACN-Differenzrouting und das Anpassnetzwerk sind korrekt.
- [ ] GPADC-Eingangsspannung, Spannungsteiler, Filterung und Abschirmung sind korrekt.

### 7.8. Allgemeine Schnittstellen { #78-general-interfaces }

- [ ] UART-, I2C-, SPI-, SDIO-, USB- und CAN-Verdrahtung sowie IO-Pegel sind korrekt.
- [ ] Die I2C-Pull-up-Versorgung schaltet gemeinsam mit der I/O-Versorgung der jeweiligen Peripherie, damit bei abgeschalteter Versorgungsschiene kein Leckstrom fließt.
- [ ] USB-ESD-Schutz, 90-Ω-Differenzführung und VBUS-Weckerkennung sind bei Bedarf implementiert.
- [ ] Für externe Wecksignale werden weckfähige Pins verwendet.

### 7.9. Produktion und Zuverlässigkeit { #79-production-and-reliability }

- [ ] Testpunkte für DBG-UART, SWD, Boot-Modus, PA00, PA01, PA34, Stromversorgung und Masse sind reserviert.
- [ ] Die Testpunkte erfüllen die Anforderungen der Prüfspitzen der Testvorrichtung.
- [ ] ESD-, EOS-, OVP-, Verpolungsschutz- und Überspannungsstrategie sind geprüft.
- [ ] Das Programmieren der Produktionsfirmware, die Quarzkalibrierung und der RF-Testablauf sind durchführbar.

### 7.10. Freigabekriterien für das Design-Review { #710-review-release-criteria }

Prüfen Sie vor der Designfreigabe, ob die folgenden Kriterien für die Freigabe erfüllt sind:

- [ ] Alle zutreffenden Punkte sind abgeschlossen und durch Schaltplan-Seitenverweise, PCB-Screenshots, Messwerte oder Prüfvermerke belegt; für als nicht zutreffend markierte Punkte ist eine Begründung dokumentiert.
- [ ] Jede Abweichung vom Datenblatt oder Referenzdesign hat eine projektbezogene Designbegründung.
- [ ] RF, Quarze, Laden, Stromversorgung, USB, Display, Audio und Produktionstestpunkte wurden von den jeweils Verantwortlichen geprüft.
- [ ] Das Budget für die Stromaufnahme im Energiesparbetrieb berücksichtigt alle Standby-Ströme der Peripherie, Pull-up-Ströme und den Ruhestrom Iq der Spannungsregler.
- [ ] Für die EVT-Inbetriebnahme stehen Zugänge für Download, Protokollausgabe, Strommessung, Reset und Boot-Steuerung zur Verfügung.

## 8. Verwandte Dokumente und Referenzen { #8-related-documents-and-references }

Prüfen Sie elektrische Grenzwerte, Gehäusedaten, Pin-Multiplexing, Softwarekonfiguration, Bauteilqualifizierung und Fertigungsanforderungen anhand der jeweils neuesten offiziellen Dokumente.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x-Produktübersicht][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB57x-Datenblatt][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB57x-Benutzerhandbuch][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB57x-Hardware-Anwendungshinweis][SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Liste der von SiFli freigegebenen Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__

</div>

Die [Schaltplan-Checkliste](SF32LB57x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB57x_pcb_layout_checklist.md) (Abschnitt 6.10) übernehmen Punkt für Punkt die offiziellen Tabellen zur Selbstprüfung des SF32LB57x-Designs von SiFli, jeweils zusammen mit den Schaltplan- und PCB-Layout-Richtlinien, gegen die geprüft wird.

## 9. Anhänge { #9-appendices }

Die Anhänge enthalten ergänzende Informationen zu Anwendungen und Referenzdesigns. Ziehen Sie sie heran, nachdem Sie die wesentlichen Schaltplan- und PCB-Regeln aus den Abschnitten 5 und 6 umgesetzt haben.

<div align="center"><em>Tabelle 9-1: Anhangsverzeichnis</em></div>

<div align="center" markdown>

| Bedarf | Einstieg hier |
|:---|:---|
| Minimalsystem-Schaltplanbeispiele | Abschnitt 5.1.2 |
| Referenzabbildungen zu Gehäuse, Lötflächenmustern, Schablone, Lagenaufbau, Fanout, Stromversorgung, RF, Audio, SDIO, USB und TVS | Abschnitt 6.9 |
| Selbstprüfung des Kundendesigns | Abschnitt 7 |

</div>

### 9.1. Anhang A. Ein typisches SF32LB57x-Produkt { #appendix-a-a-typical-sf32lb57x-product }

Ein typisches SF32LB57x-Produkt kann den Mikrocontroller, die Stromversorgungsstruktur, 48-MHz- und 32,768-kHz-Quarze, das RF-Anpassnetzwerk und die Antenne, Display- und Touch-Controller, Boot-Speicher, Audio-Ein- und -Ausgänge, Sensoren, optional eine Kamera sowie die vom Produkt benötigten USB-/SDIO-/CAN-/UART-/I2C-/SPI-Peripheriegeräte umfassen. Hinzu kommen die nötigen Zugänge für Debugging und Produktionstests. Prüfen Sie Ladeschaltung, OVP, Auswahl der Lastschalter und Leckströme im Energiesparbetrieb, soweit diese Punkte für die gewählte Stromversorgungsarchitektur relevant sind.

## 10. Revisionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Revisionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
|:--------|:-----|:------|
| 0.5 | 2026-08 | Der vollständige Detailumfang des offiziellen Anwendungshinweises wurde wieder aufgenommen. Ergänzt wurden vier nach Gehäuse und Stromversorgungsfamilie gegliederte Referenztabellen zu Versorgungspins, die Tabelle des Standard-Debug-Ports, die RF-Schaltplanabbildung, die vollständigen Display-Signaltabellen (SPI/QSPI, RGB, RGB-Moduskonfiguration, MCU8080, EPD, paralleles/serielles JDI, Touch/Hintergrundbeleuchtung), Referenzabbildungen für analoges Mikrofon, PDM-Mikrofon und Audio-Leistungsverstärker, die vollständige chipspezifische Kamerasignaltabelle, Tabellen für IO MUX und Matrix, die LCDC-Matrix-Sub-MUX-Tabelle, die USB-Pin-Tabelle, die erweiterte, nach Pins aufgeschlüsselte GPADC-Tabelle sowie die Referenzabbildung für die Ein/Aus-Taste und die GPADC-Taste. Die offiziellen Tabellen zur Selbstprüfung des Designs wurden auf die ergänzenden Seiten [Schaltplan-Checkliste](SF32LB57x_schematic_checklist.md) und [PCB-Layout-Checkliste](SF32LB57x_pcb_layout_checklist.md) verteilt, damit kein Prüfpunkt entfällt. |
| 0.4 | 2026-08 | Die Angaben wurden mit dem offiziellen SF32LB57x-Hardware-Anwendungshinweis abgeglichen: Der Mindestwert in der `VCC`/`VBAT`-Pin-Tabelle wurde auf 3,0 V statt 3,2 V korrigiert; die Hardware-Abschaltschwelle von 2,7 V wurde ergänzt; die Softstart-Strombegrenzung von `VDD33_VOUT1` wurde auf 30 mA korrigiert; die Lastkapazitätsoptionen des 32,768-kHz-Quarzes wurden auf 7 pF oder 11,5 pF berichtigt (Standardwert des Chips: 11,5 pF). Außerdem wurden die Schaltung der `PA34`-Taste für Ein/Aus und Reset sowie das GPADC-Tastendesign mit Spannungsteiler beschrieben, der GPADC-Eingangsbereich von 0 V bis 3,3 V und der 100-nF-Filterkondensator ergänzt, die Kondensatorwerte für `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA` aufgenommen, PCB-Vorgaben zur MPI-Gesamtlänge und zu Längenabweichungen innerhalb der Signalgruppe sowie zu Abständen bei der Quarzplatzierung ergänzt und die Lagenbelegung für den 4-Lagen-Aufbau ergänzt. |
| 0.3 | 2026-07 | Die Schaltplananleitung so umstrukturiert, dass Minimalsystemdesign, Stromversorgungssystem, Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität sowie Fertigung gleichrangige Abschnitte bilden. |
| 0.2 | 2026-07 | Nachweispaket, Anleitung zur Inbetriebnahme, Validierung des Energiesparbetriebs, RF-/Display-/Audio-/Kamera-Validierung sowie Kurzübersicht wichtiger PCB-Vorgaben hinzugefügt. |
| 0.1 | 2026-07 | Erstveröffentlichung des SF32LB57x-Hardware-Design-Leitfadens auf Basis des offiziellen Hardware-Anwendungshinweises. |
| 0.0.1 | 2026-06 | Quellrevision 0.0.1: Erstfassung des SF32LB57x-Hardware-Anwendungshinweises; getrennt von diesem Leitfaden versioniert. |

</div>

### 10.1. Revisionshistorie der Checkliste { #101-checklist-revision-history }

Die Punkt-für-Punkt-Checklisten in der [Schaltplan-Checkliste](SF32LB57x_schematic_checklist.md) und der [PCB-Layout-Checkliste](SF32LB57x_pcb_layout_checklist.md) werden getrennt vom Leitfaden versioniert. Sie folgen den offiziellen Tabellen zur Selbstprüfung des Designs im SF32LB57x-Hardware-Anwendungshinweis von SiFli.

<div align="center"><em>Tabelle 10.1-1: Revisionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
|:--------|:-----|:------|
| 1.0 | 2026-08 | Erstveröffentlichung; vollständig aus den Tabellen zur Selbstprüfung des Designs (Abschnitt 4) des offiziellen SF32LB57x-Hardware-Anwendungshinweises, Ausgabe 2026-06, übernommen. |

</div>

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
