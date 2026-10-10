---
icon: lucide/book-check
description: "Hardware-Design-Leitfaden für den SF32LB56x-MCU: Stromversorgungssystem, Takterzeugung, HF-Design, Display, Audio und PCB-Layout-Hinweise."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB56x Hardware-Design-Leitfaden { #sf32lb56x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden enthält Empfehlungen und Referenzmaterial für Produkte auf Basis der SF32LB56x-Familie grafikoptimierter AIoT-Mikrocontroller. Er richtet sich an Hardware-Ingenieure, PCB-Designer und Produktentwickler, die Smartwatches, vernetzte HMI-Systeme, medizinische Geräte und Gesundheitsprodukte, industrielle Handgeräte, tragbare Instrumente sowie fortschrittliche Displays für E-Bikes oder E-Scooter entwickeln.

Der Leitfaden deckt den vollständigen Hardware-Entwicklungsprozess sowohl für SF32LB56xU- als auch SF32LB56xV-Designs ab, einschließlich Gehäuseauswahl, Stromversorgung von PMIC und Prozessor, Reset, Boot-Modus, Betriebsmodi, Quarze, HF, Display, Speicher, Audio, Sensoren, Pinbelegung für UART/I2C/GPTIM, PCB-Layout, Validierung und Fertigungsvorbereitung. Die Einhaltung dieser Richtlinien hilft, Risiken bei Schaltplan und Layout zu reduzieren, das Verhalten im Energiesparbetrieb zu erhalten und die Unterschiede zwischen den U-/V-Varianten während des gesamten Designs sichtbar zu halten.

Dieses Dokument setzt ein grundlegendes Verständnis von eingebettetem Hardwaredesign, Schaltplanerfassung und PCB-Layout voraus. Es ergänzt die Hardware-Anwendungshinweise, Datenblätter, Benutzerhandbücher, Referenzdesigns und die SiFli Approved Vendor List für SF32LB56xU und SF32LB56xV, die weiterhin maßgeblich für elektrische Spezifikationen, Pin-Multiplexing, Gehäuseabmessungen, Bauteilqualifizierung und Produktionsgrenzwerte sind.

## 2. Entwicklungsressourcen { #2-development-resources }

[Hardware-Anwendungshinweis SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware-Anwendungshinweis SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Quelltext zum Hardware-Anwendungshinweis SF32LB56xU]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Quelltext zum Hardware-Anwendungshinweis SF32LB56xV]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Überblick über die SF32-Familie]: ../../sf32-products/family/SF32_family.md
[SiFli-Liste freigegebener Lieferanten (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Muster bestellen]: https://sifli.taobao.com/
[Entwicklungskits bestellen]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xV]__
- :fontawesome-brands-github: __[Quelltext zum Hardware-Anwendungshinweis SF32LB56xU]__
- :fontawesome-brands-github: __[Quelltext zum Hardware-Anwendungshinweis SF32LB56xV]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen]__
- :fontawesome-solid-cart-shopping: __[Entwicklungskits bestellen]__

</div>

## 3. Geräteübersicht { #3-device-overview }

### 3.1. Architektur { #31-architecture }

SF32LB56x richtet sich an Produkte mit anspruchsvolleren Display- und HMI-Anforderungen als reine BLE-Sensorknoten. Die offiziellen Hardware-Anwendungshinweise für U und V behandeln dieselben technischen Schwerpunkte: PMIC-basierte Stromverteilung, 48-MHz- und 32,768-kHz-Quarze, HF-Design, Auswahl der Display- und Speicherschnittstelle, Audio, PBR-Pins, Sensoren, UART-/I2C-/GPTIM-Planung, Debuggen und Flashen sowie die Quarzkalibrierung in der Fertigung.

### 3.2. Varianten und Gehäuse { #32-variants-and-packages }

<div align="center"><em>Tabelle 3.2-1: SF32LB56x-Gehäusevarianten</em></div>

<div align="center" markdown>

| Variante | Gehäuse | Abmessungen | Rastermaß | Kugeldurchmesser |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7x7x0,75 mm | 0,35 mm | - |
| SF32LB56xV | WBBGA175 | 6,5x6,1x0,94 mm | 0,4 mm | 0,25 mm |

</div>

Die U-Variante verwendet ein QFN68L-Gehäuse. Die V-Variante verwendet ein WBBGA175-Gehäuse und erfordert eine sorgfältigere Planung von Fanout, Vias und HDI-Prozess.

![Abbildung 3.2-1: SF32LB56xU QFN68L-Pinverteilung](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-1: SF32LB56xU QFN68L-Pinverteilung</em></div>

![Abbildung 3.2-2: SF32LB56xV WBBGA175-Pinverteilung](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.2-2: SF32LB56xV WBBGA175-Pinverteilung</em></div>

### 3.3. Wichtige Hardware-Merkmale { #33-major-hardware-features }

- PMIC-zentrierte Stromverteilung anhand von SF30147C-Beispielen.
- Anforderungen an 48-MHz- und 32,768-kHz-Quarze und empfohlene Quarzmodelle.
- Anforderungen an Bluetooth-HF-Design und Antennenanpassung.
- SPI/QSPI- und JDI-Display bei U; SPI/QSPI-, MCU8080-, DPI- und JDI-Display bei V.
- Optionen für externen Speicher und Boot-Speicher, einschließlich Schnittstellen im Stil von SDIO/eMMC/SD-NAND.
- Tasten, Vibrationsmotor, Audio-Schnittstelle, PBR-Pins, Sensoren, UART/I2C, GPTIM, Debug/Flashen und Kalibrierung.

### 3.4. Typische Anwendungen { #34-typical-applications }

![Abbildung 3.4-1: SF32LB56xU Smartwatch-Anwendungsblockdiagramm](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.4-1: SF32LB56xU Smartwatch-Anwendungsblockdiagramm</em></div>

![Abbildung 3.4-2: SF32LB56xV Smartwatch-Anwendungsblockdiagramm](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.4-2: SF32LB56xV Smartwatch-Anwendungsblockdiagramm</em></div>

SF32LB56x eignet sich für Smartwatches, vernetzte HMI-Panels, Gesundheitsprodukte, industrielle Handgeräte, tragbare Instrumente und fortschrittliche Display-Produkte, die Bluetooth, Audio, Sensoren, externen Speicher und umfangreichere UI-Fähigkeiten benötigen.

## 4. Design auf einen Blick { #4-design-at-a-glance }

### 4.1. Technische Zusammenfassung { #41-engineering-summary }

<div align="center"><em>Tabelle 4.1-1: SF32LB56x-Design-Zusammenfassung</em></div>

<div align="center" markdown>

| Thema | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| Gehäuse | QFN68L, 7x7x0,75 mm, 0,35 mm Rastermaß | WBBGA175, 6,5x6,1x0,94 mm, 0,4 mm Rastermaß |
| Display | SPI/QSPI und JDI sind die primär dokumentierten Schnittstellen | SPI/QSPI, MCU8080, DPI und JDI sind dokumentiert |
| PCB-Prozess | Kompaktes QFN-Routing und Fanout | BGA-/HDI-Planung, Prüfung blinder/vergrabener Vias und engere Fanout-Kontrolle |
| Stromversorgung | Versorgungsspannungen des Prozessors plus SF30147C-PMIC-Verteilung | Versorgungsspannungen des Prozessors plus SF30147C-PMIC-Verteilung, mit V-spezifischen Lastzuweisungen |
| Speicher | Design für externen Speicher über dokumentierte SF32LB56xU-Speicherpins | Design für externen Speicher über dokumentierte SF32LB56xV-Speicherpins |

</div>

### 4.2. Hardware-Design-Ablauf { #42-hardware-design-flow }

1. U- oder V-Variante, Gehäuse, Display-Schnittstelle, Speicheroption und Ziel-PCB-Prozess auswählen.
2. PMIC-Stromverteilung, Versorgungsspannungen des Prozessors, Reset, Ladefunktion und Low-Power-Steuerung definieren.
3. Quarze, HF-Anpassung sowie Display-, Speicher-, Audio-, Sensor-, Tasten-, Motor- und PBR-Schaltungen auswählen.
4. Pin-Zuweisungen festlegen und Konflikte zwischen Display-, Speicher-, Audio-, Debug-, Weck- und Produktionsfunktionen prüfen.
5. PCB-Fanout, Stack-up, Impedanz, HF, Takte, USB/SDIO, Audio, DC-DC und ESD prüfen.
6. Die Design-Checkliste vor dem Einfrieren des Schaltplans, vor der Layout-Freigabe, vor dem EVT und vor der Freigabe der Produktionsprüfvorrichtung durchgehen.

### 4.3. Unterlagen für die Designprüfung { #43-review-evidence-pack }

Vor dem EVT sollten die Versionen der Hardware-Anwendungshinweise für SF32LB56xU und SF32LB56xV, der Datenblätter und Benutzerhandbücher, das Schaltplan-PDF, der PCB-Stack-up, die PCB-Prozessfähigkeit, DRC-/ERC-Berichte, PMIC-Konfiguration, Stromversorgungskonzept, Boot- und Speicherkonfiguration, Screenshots des Display-Routings und des HF-/Quarzlayouts, Audio-/Analog-Screenshots sowie der Plan für die Produktionsprogrammierung und Kalibrierung archiviert werden.

### 4.4. Verwendung der Checklisten { #using-the-checklists }

Dieser Leitfaden umfasst zwei Ebenen der Checklisten-Abdeckung. Die Kurzcheckliste in Abschnitt 7 enthält die Punkte mit dem höchsten Risiko für eine schnelle technische Selbstprüfung. Die [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) (Abschnitt 5.8) und Abschnitt 6.3 der [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md) geben SiFlis vollständige, punktweise *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21) wieder. Diese wurde zusammen mit den Hardware-Design-Unterlagen im [SiFli-Wiki][SiFli-Wiki-Index für Chip-Hardware-Design-Leitfäden] veröffentlicht und umfasst die SF32LB56xU-Familie, die SF32LB56xV-Familie sowie die Variante SS6700A.

Jeder Prüfpunkt gibt an, für welche Chipgruppe(n) er gilt und ob er erforderlich (muss vor der Freigabe erfüllt sein) oder optional (bei Verwendung der Funktion empfohlen) ist. Farbiger Text und Text mit <span class="flag-yellow">gelbem Hintergrund</span> übernehmen die Prüfhervorhebungen aus der Quell-Arbeitsmappe. Da die Arbeitsmappe die Gründe für einzelne Hervorhebungen nicht nennt, sind diese Markierungen zusätzliche Prüfhinweise und kein Ersatz für die übrigen Punkte derselben Tabelle.

Führen Sie die [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) während der Schaltplanprüfung durch, bevor das PCB-Layout beginnt. Führen Sie die PCB-Layout-Checkliste (Abschnitt 6.3) während der Layout-Prüfung durch, bevor die Gerber-Freigabe erfolgt. In der Praxis wird jeder Durchlauf üblicherweise zweimal durchgeführt: zunächst durch den Design-Ingenieur, dann durch einen unabhängigen Prüfer vor dem Design-Freeze oder der Fertigungsfreigabe.

Am besten dient die Checkliste als Abnahmeprotokoll und nicht nur als Leseliste:

1. Zunächst die genaue Zielteilenummer und das Gehäuse bestätigen.
2. Jeden Punkt während der Prüfung als bestanden/nicht bestanden/nicht zutreffend markieren, anstatt die Tabelle nur passiv zu lesen.
3. Prüfpunkte zu Display, Speicher, Weckfunktionen und Energiesparbetrieb mit den entsprechenden Abschnitten des Hardware-Design-Leitfadens abgleichen.
4. Gehäusespezifische Annahmen – insbesondere 56xU gegenüber 56xV, QFN gegenüber WBBGA, DSI- gegenüber SPI-Display und die Nutzung von SD2/MPI3 für Speicher – in den Prüfnotizen festhalten.

<div align="center"><em>Tabelle 4.4-1: Vorlage für das Prüfprotokoll</em></div>

<div align="center" markdown>

| Feld | Wert |
|:---|:---|
| Kundenname | |
| Kunden-Design-Name | |
| Einreichungsdatum zur Prüfung | |
| Erster Prüfer | |
| Datum der ersten Prüfung | |
| Folgeprüfer | |
| Datum der Folgeprüfung | |

</div>

<div align="center"><em>Tabelle 4.4-2: Versionshistorie des Checklisten-Dokuments</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Release-Hinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung des Dokuments Schematic & PCB Checklist |

</div>

[SiFli-Wiki-Index für Chip-Hardware-Design-Leitfäden]: https://wiki.sifli.com/hardware/index.html

## Fortsetzung des Hardware-Design-Leitfadens { #continue-the-design-guide }

Der vollständige Leitfaden setzt sich auf den folgenden Seiten fort. Jede behandelt eine Phase des Designprozesses und ist von hier aus erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Schaltplanrichtlinien](SF32LB56x_schematic_design.md)__ — Stromversorgungssystem, Betriebsmodi und Weckquellen, Takterzeugung, HF, Display-/Touch-/Hintergrundbeleuchtungs-Schnittstellen, Speicher/Sensoren/Audio/Konnektivität sowie Fertigung
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md)__ — punktweise Schaltplan-Prüfcheckliste (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md)__ — Footprint, Stack-up, kritisches Routing sowie die punktweise PCB-Layout-Checkliste
- :fontawesome-solid-book-open: __[Checkliste zur Designprüfung und Referenzen](SF32LB56x_review_and_reference.md)__ — Freigabecheckliste, verwandte Dokumente, Anhänge und Versionshistorie

</div>
