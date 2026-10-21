---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für den SF32LB57x-MCU: Minimalsystem-Design, Stromversorgung, Takt, RF, Display, Kamera, Speicher und PCB-Layout-Hinweise."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden { #sf32lb57x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden enthält Empfehlungen und Referenzmaterial für Produkte auf Basis der hochintegrierten AIoT-Mikrocontrollerfamilie SF32LB57x. Er richtet sich an Hardware-Ingenieure, PCB-Designer und Produktentwickler, die Wearables, tragbare Smart-Geräte, Smart-Home-Produkte und energieeffiziente vernetzte Produkte entwickeln.

Der Leitfaden deckt den gesamten Hardware-Entwicklungsprozess ab, einschließlich Stromversorgungsarchitektur, Taktschaltungen, RF-Design, Display- und Kameraschnittstellen, Speicher- und Boot-Konfiguration, Audioschaltungen, PCB-Layout, Validierung und Fertigungsvorbereitung. Die Einhaltung dieser Richtlinien hilft, Schaltplan- und Layoutrisiken zu reduzieren, das Energiesparverhalten zu erhalten und das Design auf die Gehäuse-, Stromversorgungs- und Schnittstellenanforderungen des SF32LB57x abzustimmen.

Dieses Dokument setzt Grundkenntnisse im Embedded-Hardware-Design und in der Schaltplaneingabe voraus. Es ergänzt das SF32LB57x-Datenblatt, das Benutzerhandbuch, den offiziellen Hardware-Anwendungshinweis, die Referenzdesign-Dateien und die von SiFli freigegebene Lieferantenliste. Für elektrische Spezifikationen, Pin-Multiplexing, Gehäuseabmessungen, Bauteilqualifizierung und Produktionsgrenzwerte bleiben diese offiziellen Quellen maßgeblich.

## 2. Entwicklungsressourcen { #2-development-resources }

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x-Produktübersicht][SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB57x-Datenblatt][SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB57x-Benutzerhandbuch][SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB57x-Hardware-Anwendungshinweis][SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[Von SiFli freigegebene Lieferantenliste (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

## 3. Geräteübersicht { #3-device-overview }

### 3.1. Merkmale { #31-features }

Typische SF32LB57x-Ressourcen sind unter anderem:

- Bis zu 58 GPIOs<!-- BGA-ONLY -->; bei passenden BGA112-Varianten kommen sechs I/Os hinzu, die für MPI3 oder per Pull-up/Pull-down als statische GP-Ausgänge verwendet werden können. Weitere Hinweise stehen unter „Gehäuse“<!-- /BGA-ONLY -->.
- 3x UART, 4x I2C, 2x SPI, 2x CAN.
- 2x GPTIM (je 4 Kanäle), 2x LPTIM, 2x ATIM (je 3 differenzielle oder 4 Single-Ended-Kanäle), 1x PWM (5 Kanäle), 1x PTM (16 Kanäle).
- 4x RTC-Taktausgänge; 4x Niederfrequenz-Taktausgänge im Schlafzustand (max. 16 kHz).
- 2x SDIO- und 3x MPI-Speicherschnittstellen.
- 2x I2S- und 2x PDM-Audioschnittstellen; 1x differenzieller analoger Audioausgang und 2x differenzielle analoge Audioeingänge.
- 1x USB 2.0 FS.
- 1x GPADC (12 Kanäle).
- 1x LCDC-Display-Controller (24-Bit DPI, 8/16-Bit 8080, QSPI, 8/16-Bit EPD sowie serielles/paralleles JDI).
- 1x DCMI-Kameraschnittstelle (DVP mit bis zu 16 Bit, SPI mit 2 Datenleitungen und QSPI mit 4 Datenleitungen).
- 10x Hardware-Weckquellen.
- DBG-UART- und SWD-Debugging; DBG-UART, SWD, UART und USB-Download.

!!! note "Geltungsbereich der Display-Schnittstellen"
    Der SF32LB57x-Hardware-Anwendungshinweis nennt in der LCDC-Schnittstellenübersicht SPI/QSPI, 24-Bit-DPI, 16-Bit-8080, 16-Bit-EPD sowie serielle/parallele JDI. MIPI-DSI erscheint in der Kompatibilitätsliste bestimmter Display-Controller-ICs, nicht jedoch in dieser Übersicht der direkten LCDC-Schnittstellen des Chips. Die Nennung eines Panel-Controllers ist kein Nachweis für eine native MIPI-DSI-Hostschnittstelle des Chips. Klären Sie den genauen Display-Controller-Pfad vor der Designauswahl mit SiFli.

### 3.2. Varianten { #32-variants }

SF32LB57x umfasst zwei Stromversorgungsfamilien:

<div align="center"><em>Tabelle 3.2-1: Übersicht der Teilenummern und Stromversorgungsvarianten</em></div>

<div align="center" markdown>

| Familie | Typische Teilenummern | Bedeutung für das Design |
|:-------|:---------------------|:---------------|
| Akkubetriebene Varianten | 570 / 573 / 575 / 576 / 577 / 578 / 579 | Für Produkte mit Li-Ion-Akku. Designs enthalten üblicherweise VBAT, VCC, VBUS sowie internes oder externes Laden. |
| 3,3-V-Versorgungsvarianten | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | Für extern geregelte 3,3-V-Systeme. PVDD, AVDD, VDDIO und verwandte Schienen werden extern versorgt. |

</div>

!!! warning
    Die beiden Stromversorgungsfamilien unterscheiden sich bei den Stromversorgungsanschlüssen, beim Hochfahrverhalten und teilweise bei den Gehäusedefinitionen. Bestätigen Sie die genaue bestellbare Teilenummer, bevor Sie ein anderes Design wiederverwenden.

### 3.3. Gehäuse { #33-packages }

Zu den gängigen Gehäuseoptionen zählen QFN68L, QFN80L<!-- BGA-ONLY --> und BGA112<!-- /BGA-ONLY -->. Die Gehäusedaten des SF32LB57x führen für jedes Gehäuse zwei Dickenvarianten auf. Außerdem unterscheiden sich die Pinout-Diagramme der akkubetriebenen und der 3,3-V-Versorgungsfamilie. Wählen Sie Pinout, POD, Footprint und Schablonenzeichnung passend zur genauen bestellbaren Teilenummer.

<div align="center"><em>Tabelle 3.3-1: Gehäuseoptionen und Auslegungsschwerpunkte</em></div>

<div align="center" markdown>

| Gehäuse | Typische Größe | Rastermaß | Auslegungsschwerpunkt |
|:--------|:-------------|:------|:-------------|
| QFN68L | 7 mm x 7 mm | 0,35 mm | Gut für kompakte Designs; Erdung des freiliegenden Pads, Schablonenöffnungen und Fanout-Fähigkeit der obersten Kupferlage prüfen. |
| QFN80L | 8 mm x 8 mm | 0,35 mm | Mehr I/O-Ressourcen; Unterschiede der Stromdomänen sowie die Pin-Gruppen für Display und Speicher prüfen. |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,4 mm | Kleine Fläche, aber schwierigerer Fanout; PCB-Prozessfähigkeit frühzeitig bestätigen. |
<!-- /BGA-ONLY -->

</div>

QFN68L und QFN80L bieten nur die für die jeweilige bestellbare Teilenummer angegebene GPIO-Anzahl; zusätzliche I/Os für MPI3 oder statische Ausgänge gibt es nicht.

<!-- BGA-ONLY -->
!!! note "GPIO-Verfügbarkeit bei BGA112"
    Dies gilt nur für BGA112. SF32LB57x integriert MPI1, MPI2 und MPI3. Die Zuordnung der internen Speicherpositionen ist in der [SF32-Teilenummernkonvention](../../sf32-products/family/SF32_namingrule.md) beschrieben. Bei einer der folgenden drei gehäuseintegrierten Speicherkonfigurationen sind die MPI2- und MPI3-Pins von außerhalb des Gehäuses nicht zugänglich; dann stehen nur 58 GPIOs zur Verfügung: (1) je ein PSRAM-Baustein auf MPI1 und MPI2; (2) ein einzelner 256-Mb-PSRAM-Baustein auf MPI2; oder (3) ein NOR-Flash-Baustein auf MPI3. `SF32LB57GVD776` entspricht Fall (3); die zweite `7` im Code kennzeichnet die interne Nutzung von MPI3. Bei allen anderen Konfigurationen stehen die sechs MPI3 zugeordneten BGA112-I/Os für MPI3 zur Verfügung oder können per Pull-up oder Pull-down als statische GP-Ausgänge konfiguriert werden; sie sind keine frei zuweisbaren GPIOs. `58 + 6` bei `SF32LB57ZVN7N6` bedeutet daher 58 GPIOs plus sechs I/Os für MPI3 oder statische Ausgänge, nicht 64 frei zuweisbare GPIOs.
<!-- /BGA-ONLY -->

<div align="center"><em>Tabelle 3.3-2: Gehäuseabmessungen</em></div>

<div align="center" markdown>

| Gehäuse | Gehäusegröße | Chipdicke | Rastermaß |
|:--------|:----------|:---------------|:------|
| QFN68L | 7 mm x 7 mm | 0,9 mm | 0,35 mm |
| QFN68L | 7 mm x 7 mm | 1,1 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 0,9 mm | 0,35 mm |
| QFN80L | 8 mm x 8 mm | 1,1 mm | 0,35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5,4 mm x 4,4 mm | 0,98 mm | 0,4 mm |
| BGA112 | 5,4 mm x 4,4 mm | 1,03 mm | 0,4 mm |
<!-- /BGA-ONLY -->

</div>

Empfohlene Prüfpunkte:

- Die Pin-Nummerierung stimmt mit dem Pinout im Datenblatt überein.
- Strom-, Masse-, RF-, Quarz-, USB-, Display-, Boot- und Debug-Pins sind nicht vertauscht.
- Erdung des freiliegenden QFN-Pads und thermische Vias folgen den Montagevorgaben.
<!-- BGA-ONLY -->
- BGA-Fanout, Blind-/Buried-Vias, Lötstopplack, Schablonenöffnungen und Montagefähigkeit wurden mit dem PCB-Hersteller abgestimmt.
<!-- /BGA-ONLY -->

![Abbildung 3.3-1: SF32LB57x Teilenummern-Schema](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-1: SF32LB57x Teilenummern-Schema</em></div>

![Abbildung 3.3-2: QFN68L Pinout, akkubetriebene Variante](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-2: QFN68L Pinout, akkubetriebene Variante</em></div>

![Abbildung 3.3-3: QFN68L Pinout, 3,3-V-Versorgungsvariante](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-3: QFN68L Pinout, 3,3-V-Versorgungsvariante</em></div>

![Abbildung 3.3-4: QFN80L Pinout, akkubetriebene Variante](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-4: QFN80L Pinout, akkubetriebene Variante</em></div>

![Abbildung 3.3-5: QFN80L Pinout, 3,3-V-Versorgungsvariante](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-5: QFN80L Pinout, 3,3-V-Versorgungsvariante</em></div>

<!-- BGA-ONLY -->
![Abbildung 3.3-6: BGA112 Pinout, akkubetriebene Variante](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-6: BGA112 Pinout, akkubetriebene Variante</em></div>

![Abbildung 3.3-7: BGA112 Pinout, 3,3-V-Versorgungsvariante](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-7: BGA112 Pinout, 3,3-V-Versorgungsvariante</em></div>
<!-- /BGA-ONLY -->

### 3.4. Wichtige Hardware-Merkmale { #34-major-hardware-features }

- Zwei praxisrelevante Stromversorgungsfamilien: akkubetriebene Varianten und extern geregelte 3,3-V-Varianten.
- QFN68L-, QFN80L<!-- BGA-ONLY -->- und BGA112<!-- /BGA-ONLY -->-Gehäuse, jeweils mit eigenem Pinout, Footprint sowie Anforderungen an Schablone und PCB-Prozess.
- Display-Unterstützung für SPI/QSPI, 8080, RGB/DPI, EPD und JDI, abhängig von Gerät und Pinout; zum Geltungsbereich von MIPI-DSI siehe den Hinweis in Abschnitt 3.1.
- Speicher- und Boot-Optionen über den im Gehäuse integrierten Speicher und externen MPI-/SDIO-Speicher.
- RF-, Quarz-, Audio-, Kamera-, Display-, USB-, SDIO- und Stromversorgungslayouts erfordern eine frühzeitige gemeinsame Schaltplan- und PCB-Prüfung.

### 3.5. Typische Anwendungen { #35-typical-applications }

SF32LB57x eignet sich für Produkte, die KI-, Kamera- oder erweiterte Display-Funktionen zusammen mit Bluetooth-Konnektivität in kompakter Bauform benötigen:

- Smartwatches, Sportuhren und Wearables
- Intelligente mobile Endgeräte und Smart-Home-Steuerungen
- KI-fähige Sensoren und Geräte für Edge-Inferenz
- Kamerafähige Bluetooth-Produkte
- Anzeigegeräte mit SPI/QSPI-, RGB/DPI-, 8080-, EPD- oder JDI-Schnittstellen, abhängig vom gewählten Gerät und der Display-Controller-Topologie
- Produkte, die kompakte QFN<!-- BGA-ONLY -->- oder BGA<!-- /BGA-ONLY -->-Gehäuse mit umfangreichen GPIO- und Speicheroptionen benötigen

## 4. Design im Überblick { #4-design-at-a-glance }

### 4.1. Hardware-Architektur { #41-hardware-architecture }

<div align="center"><em>Tabelle 4.1-1: Design im Überblick</em></div>

<div align="center" markdown>

| Design-Element | Typische Umsetzung |
|:---|:---|
| Stromversorgungsfamilien | Akkubetriebene Varianten oder extern geregelte 3,3-V-Varianten; Schaltpläne für unterschiedliche Versorgungspfade nicht vermischen |
| Gehäuse | QFN68L, QFN80L<!-- BGA-ONLY -->, BGA112<!-- /BGA-ONLY -->; wählen Sie Pinout, POD, Footprint und Schablone passend zur genauen bestellbaren Teilenummer |
| PCB-Prozess | Stimmen Sie Anforderungen an QFN-Pads, Vias im freiliegenden Pad und Schablone mit dem PCB- und Bestückungsanbieter ab<!-- BGA-ONLY -->; bestätigen Sie bei BGA zusätzlich Fanout und Fertigungsprozess frühzeitig<!-- /BGA-ONLY --> |
| Taktquellen | 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz |
| RF | 50-Ω-Antennenpfad, π-Anpassnetzwerk nahe am Chip, lokale RF-Versorgungsfilterung |
| Display | SPI/QSPI, 8080, RGB/DPI, EPD oder JDI, je nach Gerätefunktion und Pinout; zum Geltungsbereich von MIPI-DSI siehe den Hinweis in Abschnitt 3.1 |
| Speicher | Im Gehäuse integrierter Speicher und externe MPI-/SDIO-Speicheroptionen; das Boot-Medium muss vor dem Layout feststehen |
| Audio | Analoger Audio-Ein-/Ausgang, PDM/I2S, Mikrofon-Bias, Audio-Referenz und externe PA-Optionen |
| Kamera | DCMI-Kameraschnittstelle; behandeln Sie sie beim Routing und bei der Versorgung als rauschempfindliche Hochgeschwindigkeitsschnittstelle |
| Debug und Produktion | DBG-UART, SWD, Boot-Konfiguration, PA00/PA01/PA34, Stromschienen und Produktionstestpunkte |

</div>

### 4.2. Hardware-Design-Ablauf { #42-hardware-design-flow }

<div align="center"><em>Tabelle 4.2-1: Hardware-Design-Ablauf</em></div>

<div align="center" markdown>

| Schritt | Design-Entscheidung | Hauptabschnitte |
|:---|:---|:---|
| 1 | Bestätigen Sie die genaue bestellbare Teilenummer, Stromversorgungsfamilie, das Gehäuse und das Pinout. | Geräteübersicht |
| 2 | Legen Sie Boot-Speicher, Display-Schnittstelle, Kameranutzung, Debug-Zugang und Energiesparziele fest. | Design im Überblick, Schaltplan-Design |
| 3 | Definieren Sie Stromversorgungsbaum, Lade-/OVP-Strategie, BUCK-/LDO-Komponenten und Hochfahrverhalten. | Stromversorgungssystem |
| 4 | Wählen Sie Taktquellen, RF-Topologie, Speicher, Display, Audio, Kamera und allgemeine Schnittstellen aus. | Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität |
| 5 | Prüfen Sie Gehäuse-Footprint, Lagenaufbau, Fanout sowie RF-, Quarz-, USB-, SDIO-, Display-, Audio- und Stromversorgungs-Layouts. | PCB-Layout-Richtlinien |
| 6 | Schließen Sie die Kunden-Selbstprüfung ab und archivieren Sie vor dem EVT die Schaltplan-, Layout-, AVL-, DRC/ERC-, Impedanz-, Strom-, RF- und Produktionsnachweise. | Kunden-Design-Selbstprüfung |

</div>

### 4.3. Verwendung dieses Leitfadens { #43-how-to-use-this-guide }

Verwenden Sie diesen Leitfaden in der Reihenfolge der Platinendesign-Prüfung. Bestätigen Sie zuerst die genaue bestellbare SF32LB57x-Teilenummer und die Stromversorgungsfamilie, legen Sie Gehäuse und PCB-Prozess fest und prüfen Sie das Datenblatt zusammen mit dem passenden Minimalsystem-Schaltplan in Abschnitt 5.1. Definieren Sie anschließend den Stromversorgungsbaum, das Boot-Medium und den erforderlichen Debug-/Download-Zugang. Weisen Sie danach die I/O-Funktionen anhand der Pinmux-Tabelle und der Produktanforderungen zu. Sobald das Minimalsystem feststeht, prüfen Sie Takte, RF, Display, Speicher, Audio, Kamera, allgemeine Schnittstellen, PCB-Layout und Produktionszugang. Abschnitt 5 bildet die Schaltplanbasis, Abschnitt 6 die PCB-Umsetzungsbasis und Abschnitt 7 die Kunden-Selbstprüfung vor der Schaltplan- oder Layout-Freigabe.

### 4.4. Review-Nachweispaket { #44-review-evidence-pack }

Archivieren Sie vor dem EVT die Versionen von Datenblatt, Benutzerhandbuch und Referenzdesign, das Schaltplan-PDF, den PCB-Lagenaufbau, den Impedanzbericht, die DRC/ERC-Berichte, den Stromversorgungsbaum, das Energiebudget, den Ladepfad, den Boot-Pfad, die Liste der Produktionstestpunkte sowie gezielte Screenshots zu RF, Quarzen, USB, SDIO, Display, Kamera, Audio, GPADC und Gehäuse-Fanout.

## Weiter im Design-Leitfaden { #continue-the-design-guide }

Der vollständige Leitfaden setzt sich über die folgenden Seiten fort. Jede deckt eine Phase des Designprozesses ab und ist von hier aus erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Minimalsystem & Stromversorgung](SF32LB57x_schematic_system_power.md)__ — Abgleich von Gehäuse und Stromversorgungsfamilie, Boot-Straps, Boot-Medium, Debug-/Download-Zugang, Stromversorgungsbaum, Laden/OVP, BUCK, Versorgungsschienen für Energiesparzustände und Betriebsmodi
- :fontawesome-solid-wave-square: __[Takt, RF & Benutzerschnittstellen](SF32LB57x_schematic_clock_rf_interfaces.md)__ — 48-MHz- und 32,768-kHz-Quarze, RF-Anpassung und Antennenpfad, Display, Touch/Hintergrundbeleuchtung, Audio, Kamera, Tasten und Motor
- :fontawesome-solid-database: __[Speicher & Fertigung](SF32LB57x_schematic_storage_mfg.md)__ — Speicher, Boot, GPIO, IO-MUX- und Matrix-Pinmux-Tabellen, UART/I2C/SPI/SDIO/USB/CAN/GPADC, Produktionsprogrammierung, Kalibrierung und Zugang zum Prüfadapter
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB57x_schematic_checklist.md)__ — Punkt-für-Punkt-Schaltplan-Prüfliste (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[PCB-Layout-Richtlinien](SF32LB57x_pcb_layout.md)__ — Lagenaufbau, kritische PCB-Randbedingungen, Strom-/Quarz-/RF-/Analog-/Audio-/Hochgeschwindigkeits-Routing, EMI/ESD/EOS und Referenzabbildungen
- :fontawesome-solid-list-check: __[PCB-Layout-Checkliste](SF32LB57x_pcb_layout_checklist.md)__ — Punkt-für-Punkt-PCB-Layout-Prüfliste (Abschnitt 6.10)
- :fontawesome-solid-book-open: __[Design-Review-Checkliste und Referenzen](SF32LB57x_review_and_reference.md)__ — Kunden-Design-Selbstprüfung, verwandte Dokumente, Anhänge und Revisionshistorie

</div>
