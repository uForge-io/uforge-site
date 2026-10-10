---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für den SF32LB52x MCU: Geräteübersicht, Designablauf und Links zu Schaltplan-, PCB-Layout-, Review- und Checklisten-Seiten."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden { #sf32lb52x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden bietet Designempfehlungen und quellenbasiertes Referenzmaterial für Produkte auf Basis der SF32LB52x-Familie besonders stromsparender AIoT-Mikrocontroller. Er richtet sich an Hardware-Ingenieure, PCB-Designer und Produktentwickler, die batteriebetriebene Wearable-Geräte und andere kompakte eingebettete Systeme entwickeln.

Der Leitfaden deckt den gesamten Hardware-Entwicklungsprozess ab, einschließlich Stromversorgungsdesign, Taktschaltungen, RF-Layout, Display- und Speicherschnittstellen, Audioschaltungen, PCB-Layout-Empfehlungen und Fertigungsaspekte. Die Einhaltung dieser Richtlinien hilft, das Entwicklungsrisiko zu verringern, die Systemzuverlässigkeit zu verbessern und den Produktentwicklungszyklus zu verkürzen.

Dieses Dokument setzt ein grundlegendes Verständnis von eingebettetem Hardwaredesign und Schaltplanerfassung voraus. Es ergänzt das SF32LB52x-Datenblatt, das Referenzhandbuch und die SDK-Dokumentation, die weiterhin maßgeblich für detaillierte elektrische Spezifikationen, Peripheriebetrieb und Softwareentwicklung sind.

Der Leitfaden führt zwei ursprüngliche Hardware-Anwendungshinweise von SiFli in einem gemeinsamen Entwicklungsablauf zusammen: einen für die batteriebetriebenen SF32LB520/3/5/7 und einen für die extern geregelt versorgten 52B/D/E/G/J. Bei uneinheitlichen Formulierungen in den Quellen legt er Wert auf genaue Bestellnummern, eine eindeutige Beschreibung der Versorgungsdomänen und verständliche Angaben für die Prüfung vor der Freigabe.

## 2. Entwicklungsressourcen { #2-development-resources }
[SF32LB52x Product Brief]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x Datasheet]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[SF32LB52x-Referenzhandbuch]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[KiCad-Dateien]: https://github.com/OpenSiFli/kicad-libraries
[Muster bestellen]: https://sifli.taobao.com/
[Entwicklungskits kaufen]: https://sifli.taobao.com/
[Liste der von SiFli freigegebenen Lieferanten]: ../cad-components/sifli-approved-vendor-list.md
[Liste der von SiFli freigegebenen Lieferanten (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x-Produktübersicht][SF32LB52x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB52x-Datenblatt][SF32LB52x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB52x-Referenzhandbuch]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Design-Leitfaden (520/3/5/7)][SF32LB52x Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Design-Leitfaden (52B/D/E/G/J)][SF32LB52x Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[Liste der von SiFli freigegebenen Lieferanten (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen]__
- :fontawesome-solid-cart-shopping: __[Entwicklungskits kaufen]__
- :fontawesome-brands-github: __[KiCad-Dateien]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. Geräteübersicht { #3-device-overview }

Die SF32LB52x-Familie kombiniert Dual-Core-STAR-MC1-Prozessoren, Bluetooth-Konnektivität, Grafikbeschleunigung, integriertes Audio, Display-Schnittstellen, Speichercontroller und Power-Management in einem kompakten QFN68-Gehäuse. Die Familie ist für Produkte optimiert, bei denen BOM-Kosten, Akkulaufzeit und PCB-Fläche gleichermaßen wichtig sind.

### 3.1. Merkmale { #31-features }

Die Familie integriert:

- Dual-Core-Arm-China-STAR-MC1-Prozessoren, kompatibel mit Arm Cortex-M33 und mit FPU und MPU ausgestattet
- Dual-Mode-Bluetooth-5.3-Funkeinheit
- ePicasso-2.0-2D/2.5D-Grafikbeschleuniger
- Display-Controller mit Unterstützung für SPI-, QSPI-, 8080-, JDI- und 8-Bit-EPD-Schnittstellen
- USB-2.0-Full-Speed-Gerät
- SDIO/eMMC-Speicherschnittstelle bei unterstützten Varianten
- Analoge und digitale Audioschnittstellen
- Integrierte PMU, DC/DC-Wandler und LDO-Regler
- QFN68-Gehäuse mit bis zu 44/45 GPIOs

### 3.2. Varianten { #32-variants }

Die SF32LB52x-Familie ist nach Stromversorgungsarchitektur in zwei praktische Design-Gruppen unterteilt: batteriebetriebene Geräte und Geräte mit extern geregelter Versorgung, wie unten dargestellt.

=== "SF32LB520/3/5/7 (batteriebetrieben)"

    Diese Gruppe integriert ein **Lademanagement-Modul und eine PMU** auf dem Chip. Sie kann direkt an einen einzelligen Lithium-Akku angeschlossen werden und unterstützt auch externe Ladelösungen.

    <div align="center"><em>Tabelle 3.2-1: Modellübersicht (batteriebetriebene Variante)</em></div>

    <div align="center" markdown>

    | Modell | Speicher im selben Gehäuse | Versorgung | Design-Hinweis |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR-Flash | Li-Ion-Batterie, 3,2–4,7 V, wiederaufladbar | Startet standardmäßig aus dem Flash-Speicher im selben Gehäuse; `VDD18_VOUT` benötigt eine externe 3,3-V-Versorgung |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | Li-Ion-Batterie, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | Li-Ion-Batterie, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | Li-Ion-Batterie, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |

    </div>

=== "52B/D/E/G/J (extern geregelt versorgt)"

    Diese Gruppe integriert die **PMU** auf dem Chip, enthält jedoch keine Ladeschaltung. Sie wird von einer geregelten externen Versorgung gespeist.

    <div align="center"><em>Tabelle 3.2-2: Modellübersicht (extern geregelte Variante)</em></div>

    <div align="center" markdown>

    | Modell | Speicher im selben Gehäuse | Versorgung | Design-Hinweis |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | 1 MB QSPI-NOR-Flash | 2,97–3,63 V, nicht wiederaufladbar | `VDD_SIP` benötigt eine externe 1,8-V- oder 3,3-V-Versorgung |
    | SF32LB52BU56 | 4 MB QSPI-NOR-Flash | 2,97–3,63 V, nicht wiederaufladbar | `VDD_SIP` benötigt eine externe 3,3-V-Versorgung |
    | SF32LB52DUB6 | 4 MB OPI-PSRAM | 1,71–1,98 V, nicht wiederaufladbar | `VDD_SIP` benötigt eine externe 1,8-V-Versorgung |
    | SF32LB52EUB6 | 4 MB OPI-PSRAM | 2,97–3,63 V, nicht wiederaufladbar | `VDD_SIP` kann vom internen LDO versorgt werden |
    | SF32LB52GUC6 | 8 MB OPI-PSRAM | 2,97–3,63 V, nicht wiederaufladbar | `VDD_SIP` kann vom internen LDO versorgt werden |
    | SF32LB52JUD6 | 16 MB OPI-PSRAM | 2,97–3,63 V, nicht wiederaufladbar | `VDD_SIP` kann vom internen LDO versorgt werden |

    </div>

### 3.3. Gehäuse { #33-packages }

Beide Design-Gruppen verwenden dasselbe QFN68-Gehäuse.

<div align="center"><em>Tabelle 3.3-1: Gehäuseinformationen</em></div>

<div align="center" markdown>

| Gehäusename | Abmessungen | Pin-Abstand |
|:---|:---|:---|
| QFN68L | 7 mm x 7 mm x 0,85 mm | 0,35 mm |

</div>

Die beiden Design-Gruppen unterscheiden sich geringfügig bei den Peripherieressourcen. Die batteriebetriebene Gruppe hat 44 GPIOs, während die extern geregelte Gruppe 45 GPIOs hat; der Unterschied ergibt sich aus den für das Laden reservierten Pins bei den batteriebetriebenen Geräten.

- 44/45 GPIOs
- 3x UART
- 4x I2C
- 2x GPTIM
- 2x SPI
- 1x I2S-Audioschnittstelle
- 1x SDIO-Speicherschnittstelle
- 1x PDM-Audioschnittstelle
- 1x differenzieller analoger Audioausgang
- 1x unsymmetrischer analoger Audioeingang
- SPI-Displayschnittstelle mit einer, zwei oder vier Datenleitungen, serielle JDI-Display-Schnittstelle
- Unterstützt Displays mit und ohne GRAM
- Unterstützt UART-Download und Software-Debugging

Die folgenden Abbildungen zeigen die Pinbelegung. Die Unterschiede werden im Abschnitt zum Schaltplanentwurf erneut behandelt.

![Abbildung 3.3-1: QFN68L-Pin-Layout für SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-1: QFN68L-Pin-Layout für SF32LB520/3/5/7</em></div>

![Abbildung 3.3-2: QFN68L-Pin-Layout für SF32LB52B/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-2: QFN68L-Pin-Layout für SF32LB52B/E/G/J</em></div>

### 3.4. Anwendungen { #34-applications }

Typische Anwendungen sind tragbare eingebettete Systeme, bei denen lange Akkulaufzeit und kompakte Bauformen wesentlich sind. Beispiele umfassen:

- Einsteiger-Smartwatches und Fitness-Armbänder
- Bluetooth-Module und drahtlose Adapter
- Bluetooth-Audio-Zubehör
- Smarte Sensoren und Wearable-Geräte
- Elektronische Regaletiketten und Smart Badges
- E-Book-Reader
- Tragbare Etikettendrucker
- eBike- und eScooter-Displays
- Vernetzte Mensch-Maschine-Schnittstellen (HMI)
- Tragbare Industrie- und Medizingeräte
- Andere batteriebetriebene AIoT-Geräte

## 4. Design im Überblick { #4-design-at-a-glance }

### 4.1. Hardware-Architektur { #41-hardware-architecture }

Die folgende Tabelle fasst die empfohlene Hardware-Architektur für eine typische SF32LB52x-Anwendung zusammen. Nutzen Sie sie als Kurzreferenz, bevor Sie die detaillierten Designhinweise in den späteren Abschnitten lesen.

<div align="center"><em>Tabelle 4.1-1: Zusammenfassung „Design im Überblick“</em></div>

<div align="center" markdown>

| Hardware-Block | Typische Umsetzung |
|:---|:---|
| Gehäuse | QFN68L, 7 mm x 7 mm x 0,85 mm, 0,35 mm Pitch |
| PCB | 4-Lagen-PTH-PCB empfohlen |
| Stromversorgung | einzellige Li-Ion-/Li-Po-Batterie oder geregelte externe Versorgung, abhängig von der Gerätevariante |
| Batterieladung | In unterstützten Varianten integrierter Lader oder externer Lade-IC mit oder ohne Power-Path-Management (PPM) |
| Buck-Induktivität | 4,7 µH ±20 %, DCR ≤ 0,4 Ω, Isat ≥ 450 mA |
| Quarz | 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz |
| RF | 50-Ω-Leitung mit kontrolliertem Wellenwiderstand und reserviertem π-Anpassnetzwerk |
| Display | 3-Draht-SPI, 4-Draht-SPI, Dual-SPI, Quad-SPI (bis 512 x 512), JDI und 8-Bit-EPD |
| Touch | kapazitiver I2C-Touch-Controller mit Aufwecken per Interrupt |
| Speicher | SiP-Flash/PSRAM, externes SPI-NOR, SPI-NAND, SD-NAND oder eMMC, abhängig von der Variante |
| Audio | Analoger Mikrofoneingang, differenzieller DAC-Ausgang, externer PA |
| Sensoren | I2C-/SPI-Sensoren wie Beschleunigungssensor, Gyroskop, Erdmagnetfeldsensor, Herzfrequenzsensor, SpO2-Sensor und EKG-Sensor |
| Haptik | PWM-gesteuerter Vibrationsmotor |
| Debug | DBG_UART auf PA18/PA19, gemultiplext mit SWD |

</div>


### 4.2. Hardware-Designablauf { #42-hardware-design-flow }

Folgen Sie dem Leitfaden in der Reihenfolge, in der Hardwareentscheidungen üblicherweise festgelegt werden. Der folgende Ablauf hält frühe Architekturentscheidungen sichtbar, bevor das Design in Schaltplan- und PCB-Details übergeht.

<div align="center"><em>Tabelle 4.2-1: Hardware-Designablauf</em></div>

<div align="center" markdown>

| Schritt | Design-Entscheidung | Primäre Abschnitte |
|:---|:---|:---|
| 1 | Exaktes bestellbares Gerät und Stromversorgungsvariante wählen | Geräteübersicht, Variantenauswahl |
| 2 | Gehäuse, GPIO-Anzahl und Pins mit fester Funktion bestätigen | Gehäuse, Schaltplan-Designrichtlinien |
| 3 | Minimalsystem festlegen: Power-Tree, Boot-Speicher, Bootstrap-Pins, Debug-Zugang, Takte und Wake-Strategie | Minimalsystem-Design, Speicher, Debug, Takterzeugung |
| 4 | RF-Topologie, Display, Audio, Sensoren und übrige Produktschnittstellen auswählen | Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität |
| 5 | PCB-Stack-up, Fanout, Impedanz und Routing störungsempfindlicher Signale überprüfen | PCB-Layout-Richtlinien |
| 6 | Mit Referenzschaltplänen, PCB-Layouts, Mechanikzeichnungen und Versorgungsdiagrammen aus den Quellen abgleichen | Anhänge A-E |
| 7 | Zugang für Bring-up, Debug, Kalibrierung und Produktionstest reservieren | Debug, Produktion, Design-Review-Checkliste |

</div>

**Design-Entscheidungsbaum**

- Benötigen Sie Betrieb mit einem einzelligen Akku, der über USB geladen wird? Beginnen Sie mit `SF32LB520/3/5/7`.
- Benötigen Sie eine extern geregelte Versorgung oder eMMC-Boot? Beginnen Sie mit `52B/D/E/G/J`.
- Benötigen Sie 8-Bit-paralleles EPD? Verwenden Sie den extern geregelten Designpfad, sofern SiFli den batteriebetriebenen Pfad nicht ausdrücklich für das konkrete Design bestätigt.
- Benötigen Sie den niedrigsten Standby-Strom? Entscheiden Sie über Schalten der Speicherversorgung, Lastschalter für Sensoren und Trennung der Displayversorgung, bevor die PCB-Platzierung beginnt.

### 4.3. Verwendung dieses Leitfadens { #43-how-to-use-this-guide }

Legen Sie vor Beginn des Schaltplanentwurfs die genaue Bestellnummer fest. Die SF32LB52x-Familie gliedert sich in zwei Gruppen: `SF32LB520/3/5/7` für Batteriebetrieb und `52B/D/E/G/J` für extern geregelte Versorgung. Wählen Sie die Gruppe anhand von Abschnitt 3.2. Prüfen Sie das Minimalsystem und die Stromversorgung in den Abschnitten 5.1 und 5.2 sowie den Boot-Speicher und den Debug-Zugang in den Abschnitten 5.6.1 und 5.7.1. Die Abschnitte 5 und 6 behandeln Schaltplan und PCB. Vergleichen Sie den Entwurf mit den Referenzabbildungen in den Anhängen A–E und nutzen Sie Abschnitt 7 als Checkliste vor der Freigabe.

Wenn ein Design einen älteren SF32LB52x-Schaltplan wiederverwendet, prüfen Sie zuerst die Versorgungs-Pins, die SiP-Speicherversorgung, die Boot-Speicher-Schiene, die DBG_UART-/SWD-Pins, die Quarzlast, den RF-Anpassungs-Footprint und die Produktionstestpunkte. Diese Punkte sind die häufigsten Quellen für Probleme bei der Inbetriebnahme, die bei der Prüfung leicht übersehen werden.

### 4.4. Nachweispaket für die Designprüfung { #44-review-evidence-pack }

Sammeln Sie vor der Hardware-Freigabe das Schaltplan-PDF, den PCB-Stack-up, den Impedanzbericht, den Bauteil-AVL-Abgleich, den DRC-Bericht sowie Screenshots der RF-, Quarz-, USB-, SDIO-/eMMC-, Audio-, Power- und Boot-Speicher-Layouts. Bewahren Sie die Nachweise zusammen mit der Board-Revision auf, damit spätere Firmware-, RF- und Produktionsprobleme auf die geprüfte Hardware-Baseline zurückverfolgt werden können.


## 5. Checklisten verwenden { #using-the-checklists }

Dieser Leitfaden bietet Checklisten auf zwei Ebenen. Die Kurzchecklisten in den Abschnitten 5.1.1.5, 5.5.3 und 7 enthalten die risikoreichsten Punkte für eine schnelle technische Selbstprüfung. Die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) (Abschnitt 6.15) geben SiFlis vollständige [*SF32LB52 Schematic & PCB Checklist*][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] (V1.0, 2026-01-21) Punkt für Punkt wieder. Sie wurde zusammen mit dem Hardware-Design-Leitfaden auf [SiFlis Wiki][SiFli Chip Hardware Design Guide Index (Wiki)] veröffentlicht und deckt sowohl die batteriebetriebenen SF32LB520/3/5/7 als auch die extern versorgten SF32LB52B/D/E/G/J ab.

Jeder Prüfpunkt nennt die zutreffenden SF32LB52x-Varianten und seine Kategorie: erforderlich (muss vor der Freigabe bestanden werden) oder optional (empfohlen, wenn die Funktion genutzt wird). „Alle Varianten“ umfasst SF32LB520/3/5/7 und SF32LB52B/D/E/G/J, sofern kein engerer Geltungsbereich angegeben ist. Farbiger Text und Text mit <span class="flag-red flag-yellow">gelbem Hintergrund</span> erhalten die Hervorhebungen der ursprünglichen Tabelle. Da die Quelle ihre Gründe nicht erläutert, sind sie als zusätzliche Prüfhinweise zu verstehen; nicht hervorgehobene Punkte derselben Tabelle bleiben ebenso zu prüfen. Die Checklisten behalten bewusst das Tabellenlayout bei. Ist eine Formulierung unvollständig, widersprüchlich oder zu knapp, ziehen Sie den Design-Leitfaden, das Datenblatt, das Referenzhandbuch und SiFlis Modellnummern-Richtlinien hinzu.

Führen Sie die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md) während des Schaltplan-Reviews durch, bevor das PCB-Layout beginnt. Führen Sie die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) während des Layout-Reviews durch, bevor die Gerber-Freigabe erfolgt. In der Praxis wird jeder Durchlauf üblicherweise zweimal durchgeführt: zuerst durch den Design-Ingenieur, dann durch einen unabhängigen Prüfer vor dem Design-Freeze oder der Fertigungsfreigabe.

Für beste Ergebnisse behandeln Sie die Checkliste als Abnahmeprotokoll und nicht als bloße Lesecheckliste:

1. Bestätigen Sie zunächst die genaue Zielvariante des Mikrocontrollers, insbesondere wenn der Entwurf sowohl mit 520/3/5/7 als auch mit 52B/D/E/G/J umgesetzt werden könnte.
2. Markieren Sie jeden Punkt während des Reviews als bestanden/nicht bestanden/nicht zutreffend, anstatt die Tabelle nur passiv zu lesen.
3. Wo ein Prüfpunkt auf Boot-Medium, Displaytyp oder Power-Switch-Verhalten verweist, prüfen Sie ihn anhand des tatsächlichen Schaltplans und des passenden Subsystem-Kapitels im Design-Leitfaden.
4. Bei jedem mehrdeutigen Quelltext dokumentieren Sie die exakte Teilenummer und die Design-Annahme in den Review-Notizen vor der Freigabe.

<div align="center"><em>Tabelle 5-1: Review-Protokollvorlage</em></div>

<div align="center" markdown>

| Feld | Wert |
|:---|:---|
| Kundenname | |
| Projektname des Kunden | |
| Datum der Einreichung zur Prüfung | |
| Erster Prüfer | |
| Datum der Erstprüfung | |
| Folgeprüfer | |
| Datum der Folgeprüfung | |

</div>

<div align="center"><em>Tabelle 5-2: Versionshistorie des Checklisten-Dokuments</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Release-Hinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstausgabe des Dokuments mit Schaltplan- und PCB-Checklisten |

</div>

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

## 6. Weiter im Design-Leitfaden { #continue-the-design-guide }

Der vollständige Leitfaden setzt sich über die folgenden Seiten fort. Jede deckt eine Phase des Designprozesses ab und ist von hier aus erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Schaltplan-Designrichtlinien](SF32LB52x_schematic_design.md)__ — Minimalsystem, Stromversorgungssystem, Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität sowie Fertigungszugang, verteilt auf drei Seiten
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md)__ — Punkt-für-Punkt-Checkliste für das Schaltplan-Review (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[PCB-Layout-Richtlinien](SF32LB52x_pcb_layout.md)__ — Footprint-, Stack-up-, Fanout- und Routing-Hinweise für Takt, RF, Audio, USB, SDIO und Versorgung
- :fontawesome-solid-list-check: __[PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md)__ — Punkt-für-Punkt-Checkliste für das PCB-Layout-Review (Abschnitt 6.15)
- :fontawesome-solid-book-open: __[Design-Review-Checkliste und Referenzen](SF32LB52x_review_and_reference.md)__ — Release-Checkliste, verwandte Dokumente, Referenzschaltplan-/PCB-/Mechanik-/Power-Anhänge und Versionshistorie

</div>
