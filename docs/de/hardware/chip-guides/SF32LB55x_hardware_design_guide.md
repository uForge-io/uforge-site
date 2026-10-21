---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für den SF32LB55x-MCU: Stromversorgung, Taktschaltungen, RF-Anpassung, Speicher- und Display-Schnittstellen sowie Hinweise zum PCB-Layout."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware-Design-Leitfaden { #sf32lb55x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden enthält Empfehlungen und Referenzmaterial für Produkte auf Basis der vielseitig einsetzbaren AIoT-Mikrocontrollerfamilie SF32LB55x. Er richtet sich an Hardware-Ingenieure, PCB-Designer und Produktentwickler, die BLE-Wearables, akkubetriebene Produkte mit vielen Sensoren, Geräte zur Gesundheitsüberwachung und kompakte vernetzte Systeme entwickeln.

Der Leitfaden behandelt den gesamten Hardware-Entwicklungsprozess: Gehäuseauswahl, Stromversorgung, Taktschaltungen, RF-Layout, externen Speicher, Display-Schnittstellen, Weckquellen, Sensoren, Audio, Debug-Zugang, PCB-Layout, Validierung und Fertigungsvorbereitung. Die Empfehlungen helfen, Risiken in Schaltplan und Layout zu reduzieren, das Verhalten im Energiesparbetrieb zu erhalten und die Anforderungen des SF32LB55x an Gehäuse, Stromversorgung, Speicher, RF und Schnittstellen zu berücksichtigen.

Dieses Dokument setzt Grundkenntnisse im Embedded-Hardwaredesign und in der Schaltplanerstellung voraus. Es ergänzt das SF32LB55x-Datenblatt, das Benutzerhandbuch, den offiziellen Hardware-Anwendungshinweis, Referenzdesigns und die SiFli-Liste freigegebener Lieferanten. Diese Quellen bleiben maßgeblich für elektrische Spezifikationen, Pin-Multiplexing, Gehäuseabmessungen, Bauteilqualifizierung und Produktionsgrenzwerte.

SF32LB55x folgt einer älteren Suffixkonvention. Für verfügbare Schnittstellen, gehäuseabhängige Funktionen und die genaue Speicherkonfiguration sind die vollständige Bestellnummer und die Angaben zum jeweiligen Gehäuse maßgeblich; das Suffix allein reicht dafür nicht aus.

## 2. Entwicklungsressourcen { #2-development-resources }

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SF32LB55x Hardware Application Source]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SF32LB55x Datasheet]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[SF32LB55x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90EN.pdf
[SF32LB55x SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[SF32LB55x API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[SF32 Family Overview]: ../../sf32-products/family/SF32_family.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB55x][SF32LB55x Hardware Application Note]__
- :fontawesome-brands-github: __[Quelldatei zum Hardware-Anwendungshinweis SF32LB55x][SF32LB55x Hardware Application Source]__
- :fontawesome-solid-file-pdf: __[Datenblatt SF32LB55x][SF32LB55x Datasheet]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch SF32LB55x][SF32LB55x User Manual]__
- :fontawesome-solid-book: __[SDK-Dokumentation SF32LB55x][SF32LB55x SDK Documentation]__
- :fontawesome-solid-book-open: __[API-Referenz SF32LB55x][SF32LB55x API Reference]__
- :fontawesome-solid-microchip: __[SF32-Familienübersicht][SF32 Family Overview]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

## 3. Geräteübersicht { #3-device-overview }

### 3.1. Architektur { #31-architecture }

SF32LB55x richtet sich an energieeffiziente AIoT-Produkte, die schnell auf Benutzereingaben reagieren und zugleich im Bereitschafts- und Schlafzustand wenig Energie verbrauchen müssen. Der Chip integriert einen energieeffizienten Bluetooth-5.2-Transceiver, Energieverwaltung sowie Speicher- und Display-Schnittstellen. Die Hardwareintegration umfasst Gehäuseauswahl, PMU-Spannungsschienen, Boot-Modus, zwei Quarzschaltungen, RF-Anpassung, externen Speicher, die Auswahl eines MIPI/SPI/MCU8080/JDI-Displays, GPADC- und Sensoranschlüsse, externes Bluetooth-Audio, Debug-/Programmierzugang und die Kalibrierung in der Fertigung.

Die Speicheranbindung umfasst mehrere QSPI-Schnittstellen, eine unabhängige OPI-PSRAM-Schnittstelle sowie SD/eMMC-Unterstützung. Die im Gehäuse integrierte NOR-Flash- und PSRAM-Konfiguration hängt von der genauen Bestellnummer ab. Auch die Speicher- und Display-Schnittstellen hängen vom Gehäuse ab. BGA145 unterstützt einen externen OPI-PSRAM-Kanal, BGA169 zwei. Die MIPI-DSI-Schnittstelle mit zwei Daten-Lanes ist bei BGA145 und BGA169 verfügbar, nicht bei QFN68L. Prüfen Sie die Pinbelegung und die im Gehäuse integrierte Speicherkonfiguration der exakten Bestellnummer, bevor Sie externe Bauteile zuordnen.

### 3.2. Varianten und Gehäuse { #32-variants-and-packages }

<div align="center"><em>Tabelle 3.2-1: Gehäuseoptionen</em></div>

<div align="center" markdown>

| Gehäusename | Größe | Rastermaß | Kugeldurchmesser |
| :--- | :--- | :--- | :--- |
| QFN68L | 7 × 7 × 0,75 mm | 0,35 mm | - |
| BGA145 | 7 × 7 × 0,94 mm | 0,5 mm | 0,25 mm |
| BGA169 | 7 × 7 × 0,94 mm | 0,5 mm | 0,25 mm |

</div>

SF32LB55x ist in den Gehäusen QFN68L, BGA145 und BGA169 verfügbar. Legen Sie das Gehäuse frühzeitig fest, da sich Speicherschnittstellen, Fanout, PCB-Fertigungsanforderungen und verfügbare GPIOs je nach Gehäuse unterscheiden.

![Abbildung 3.2-1: QFN68L-Pinverteilung](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-1: QFN68L-Pinverteilung</em></div>

![Abbildung 3.2-2: BGA145-Pinverteilung](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-2: BGA145-Pinverteilung</em></div>

!!! warning "Historische BGA169-Pinbelegungen"
    SiFli kennzeichnet SF32LB557V8N6 als abgekündigt (EOL). Die folgende Belegung bleibt zur Prüfung bestehender Designs erhalten, ist aber keine Empfehlung für neue Designs. SF32LB557VD3A6 verwendet eine andere BGA169-Belegung: D11, E9, K12, L11, L13 und M13 sind NC. Prüfen Sie die Belegung der exakten Bestellnummer; gleiche Gehäuseabmessungen bedeuten keine Pinkompatibilität.

![Abbildung 3.2-3: BGA169 SF32LB557V8N6-Pinverteilung](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-3: BGA169 SF32LB557V8N6-Pinverteilung</em></div>

![Abbildung 3.2-4: BGA169 SF32LB557VD3A6-Pinverteilung](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-4: BGA169 SF32LB557VD3A6-Pinverteilung</em></div>

### 3.3. Wichtige Hardwaremerkmale { #33-major-hardware-features }

- Gehäuseoptionen QFN68L, BGA145 und BGA169.
- Designanforderungen für die beiden Quarze mit 48 MHz und 32,768 kHz.
- Energieeffizienter Bluetooth-5.2-Transceiver sowie Anforderungen an RF-Anpassung und Antennenlayout.
- Schnittstellen für OPI-PSRAM, QSPI-NOR-/NAND-Flash und PSRAM sowie SDIO-eMMC oder Micro SD; der integrierte Speicher hängt von der genauen Bestellnummer ab.
- MIPI-DSI-, SPI/QSPI-, MCU8080- und JDI-Display-Optionen.
- Designhinweise für Wecktaster, Vibrationsmotor, Weckinterrupt, GPADC, Sensoren und externes Bluetooth-Audio.
- DBG-UART, SWD, Programmierung in der Fertigung und Unterstützung der Quarzkalibrierung.

### 3.4. Typische Anwendungen { #34-typical-applications }

Typische Anwendungen sind Wearables in Armbandform, intelligente Mobilgeräte, Smart-Home-Produkte und weitere energieeffiziente AIoT-Designs.

## 4. Design auf einen Blick { #4-design-at-a-glance }

### 4.1. Technische Zusammenfassung { #41-engineering-summary }

<div align="center"><em>Tabelle 4.1-1: SF32LB55x-Design-Zusammenfassung</em></div>

<div align="center" markdown>

| Thema | Design-Schwerpunkt |
|:---|:---|
| Gehäuse | Wählen Sie QFN68L oder ein BGA-Gehäuse vor der Pinplanung und dem PCB-Lagenaufbau. |
| Stromversorgung | Prüfen Sie PMU-Spannungsschienen, weitere Stromversorgungspins, erforderliche Kondensatoren, POR/BOR/Reset und BUCK-Modus. |
| Takt | Verwenden Sie 48-MHz- und 32,768-kHz-Quarze, die die Anforderungen an CL, ppm und ESR erfüllen. |
| RF | Platzieren Sie das Anpassungsnetzwerk nahe am Chip und führen Sie die 50-Ω-Antennenleitung möglichst störungsarm. |
| Speicher | Planen Sie flüchtigen OPI-/QSPI-PSRAM getrennt vom Boot- und persistenten Speicher auf QSPI-Flash oder SDIO-eMMC/Micro-SD; prüfen Sie die Unterstützung durch Gehäuse und Boot-Modus. |
| Display | Wählen Sie frühzeitig MIPI DSI, SPI/QSPI, MCU8080 oder JDI, da sich Pin-Gruppen und Layout unterscheiden. |
| Produktion | Sehen Sie Zugriffsmöglichkeiten für DBG-UART, SWD, Boot-Modus, Stromversorgung sowie RF-/Quarzkalibrierung vor. |

</div>

### 4.2. Hardware-Design-Ablauf { #42-hardware-design-flow }

1. Gehäuse, Speicherstrategie, Display-Schnittstelle und Ziel für niedrigen Energieverbrauch festlegen.
2. Stromversorgungsstruktur, PMU-Spannungsschienen, BUCK-/LDO-Verhalten und Reset-Schaltung definieren.
3. Quarze, RF-Anpassungstopologie und Einschränkungen des Antennenlayouts auswählen.
4. Pins für Speicher, Display, Weckfunktion, Sensoren, Audio, Debug und Produktionstest zuweisen.
5. PCB-Lagenaufbau, Fanout, Impedanz, ESD, RF und Anforderungen an Hochgeschwindigkeitsschnittstellen festlegen.
6. Die Checkliste in Abschnitt 7 vor Schaltplan-Freigabe, Layout-Freigabe und EVT prüfen.

### 4.3. Unterlagen für die Designprüfung { #43-review-evidence-pack }

Archivieren Sie vor dem EVT die verwendeten Versionen von Datenblatt und Benutzerhandbuch, die Gehäusezeichnung, das Schaltplan-PDF, den PCB-Lagenaufbau, den Impedanzbericht, die DRC-/ERC-Berichte, die Stromversorgungsstruktur und die Boot-Modus-Tabelle. Ergänzen Sie Screenshots des RF- und Quarzlayouts sowie der Speicher- und Display-Leiterbahnführung und den Plan der Produktionstestpunkte.

### 4.4. Verwendung der Checklisten { #using-the-checklists }

Dieser Leitfaden bietet zwei Prüfebenen. Die Kurzcheckliste in Abschnitt 7 fasst die Punkte mit dem höchsten Risiko für eine schnelle technische Selbstprüfung zusammen. Die [Schaltplan-Checkliste](SF32LB55x_schematic_checklist.md) (Abschnitt 5.8) und Abschnitt 6.4 der [PCB-Layout-Richtlinien](SF32LB55x_pcb_layout.md) geben SiFlis vollständige *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21) Punkt für Punkt wieder. Das Original wurde zusammen mit den Hardware-Designunterlagen im [SiFli-Wiki][SiFli Chip Hardware Design Guide Index (Wiki)] veröffentlicht. Es umfasst die Geräte 551/555/557 sowie die Variante SS6600A8.

Jeder Prüfpunkt nennt die zutreffenden Variantengruppen und ist als „Erforderlich“ (muss vor der Freigabe bestanden werden) oder „Optional“ (bei Nutzung der betreffenden Funktion empfohlen) gekennzeichnet. Farbiger Text und <span class="flag-yellow">gelb hinterlegter Text</span> übernehmen die Hervorhebungen der Excel-Quelldatei. Da diese die Gründe für die einzelnen Markierungen nicht erläutert, dienen sie als zusätzliche Prüfhilfen und ersetzen keine anderen, nicht hervorgehobenen Punkte derselben Tabelle.

Verwenden Sie die [Schaltplan-Checkliste](SF32LB55x_schematic_checklist.md) bei der Schaltplanprüfung, bevor Sie mit dem PCB-Layout beginnen. Verwenden Sie die PCB-Layout-Checkliste (Abschnitt 6.4) bei der Layoutprüfung, bevor Sie die Gerber-Daten freigeben. In der Praxis wird jede Prüfung üblicherweise in zwei Durchgängen durchgeführt: zuerst durch den Entwicklungsingenieur, anschließend durch eine unabhängige prüfende Person vor dem Design-Freeze oder der Fertigungsfreigabe.

Verwenden Sie die Checklisten als Abnahmeprotokoll und nicht nur als Leseliste:

1. Bestätigen Sie zuerst die genaue Bestellnummer des Zielgeräts und das Gehäuse.
2. Markieren Sie jeden Punkt während der Prüfung als bestanden, nicht bestanden oder nicht zutreffend, statt die Tabelle nur zu überfliegen.
3. Gleichen Sie die Punkte zu Display, Speicher, Weckfunktion und Niedrigenergieverhalten mit den entsprechenden Abschnitten des Hardware-Design-Leitfadens ab.
4. Halten Sie gehäusespezifische Annahmen – insbesondere BGA oder QFN, DSI- oder SPI-Display und die Nutzung von QSPI2/QSPI3 für Speicher – in den Prüfnotizen fest.

<div align="center"><em>Tabelle 4.4-1: Vorlage für das Prüfprotokoll</em></div>

<div align="center" markdown>

| Feld | Wert |
|:---|:---|
| Kundenname | |
| Bezeichnung des Kundendesigns | |
| Datum der Einreichung zur Prüfung | |
| Erster Prüfer | |
| Datum der ersten Prüfung | |
| Zweiter Prüfer | |
| Datum der Nachprüfung | |

</div>

<div align="center"><em>Tabelle 4.4-2: Versionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Änderungshinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung des Dokuments „Schematic & PCB Checklist“ |

</div>

[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## Fortsetzung des Design-Leitfadens { #continue-the-design-guide }

Der vollständige Leitfaden setzt sich auf den folgenden Seiten fort. Jede Seite behandelt eine Phase des Designprozesses und ist von hier aus erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Richtlinien für den Schaltplanentwurf](SF32LB55x_schematic_design.md)__ — Stromversorgungssystem, Boot-Modus, Takterzeugung, RF, Speicherschnittstellen, Display- und Touch-Schnittstellen sowie Schnittstellen für Weckfunktionen, GPADC und Fertigung
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB55x_schematic_checklist.md)__ — punktweise Schaltplan-Prüfcheckliste (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[PCB-Layout-Richtlinien](SF32LB55x_pcb_layout.md)__ — Bauteil-Footprints, Leiterplatten-Lagenaufbau, allgemeine PCB-Regeln, Schnittstellenführung sowie die PCB-Layout-Checkliste mit Einzelprüfpunkten
- :fontawesome-solid-book-open: __[Design-Prüfcheckliste und Referenzen](SF32LB55x_review_and_reference.md)__ — Freigabecheckliste, verwandte Dokumente, Anhänge und Versionshistorie

</div>
