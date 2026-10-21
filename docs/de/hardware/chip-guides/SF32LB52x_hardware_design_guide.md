---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für die SF32LB52x-MCU-Familie mit Geräteübersicht, Designablauf sowie Verweisen auf Schaltplan-, PCB-Layout- und Review-Checklisten."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden { #sf32lb52x-hardware-design-guide }

## 1. Einführung { #1-introduction }

Dieser Hardware-Design-Leitfaden enthält Designempfehlungen und quellenbasierte Referenzinformationen für Produkte mit Mikrocontrollern der besonders energieeffizienten SF32LB52x-AIoT-Familie. Er richtet sich an Hardware-Ingenieure, PCB-Designer und Produktentwickler, die akkubetriebene Wearables und andere kompakte eingebettete Systeme entwickeln.

Der Leitfaden behandelt den gesamten Hardware-Entwicklungsprozess: Stromversorgungsdesign, Taktschaltungen, RF-Layout, Display- und Speicherschnittstellen, Audioschaltungen, PCB-Layout und Fertigung. Wenn Sie die Empfehlungen berücksichtigen, können Sie Entwicklungsrisiken senken, die Systemzuverlässigkeit erhöhen und die Produktentwicklung verkürzen.

Dieses Dokument setzt Grundkenntnisse im Embedded-Hardwaredesign und in der Schaltplanerstellung voraus. Es ergänzt das SF32LB52x-Datenblatt, das Referenzhandbuch und die SDK-Dokumentation. Für detaillierte elektrische Spezifikationen, den Betrieb der Peripherie und die Softwareentwicklung bleiben diese Quellen maßgeblich.

Der Leitfaden fasst zwei ursprüngliche Hardware-Anwendungshinweise von SiFli in einem gemeinsamen Entwicklungsablauf zusammen: einen für die akkubetriebenen SF32LB520/3/5/7 und einen für die extern geregelten 52B/D/E/G/J. Wo die Quellen unterschiedlich formuliert sind, stellt dieser Leitfaden die genaue Bestellnummer, das Verhalten der einzelnen Versorgungsschienen und klare Prüfkriterien für die Freigabe in den Vordergrund.

## 2. Entwicklungsressourcen { #2-development-resources }
[SF32LB52x Product Brief]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x Datasheet]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[SF32LB52x Reference Manual]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[KiCad Files]: https://github.com/OpenSiFli/kicad-libraries
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x-Produktübersicht][SF32LB52x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB52x-Datenblatt][SF32LB52x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB52x-Referenzhandbuch][SF32LB52x Reference Manual]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Design-Leitfaden (520/3/5/7)][SF32LB52x Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Design-Leitfaden (52B/D/E/G/J)][SF32LB52x Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-file-excel: __[Liste der von SiFli freigegebenen Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__
- :fontawesome-brands-github: __[KiCad-Dateien][KiCad Files]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. Geräteübersicht { #3-device-overview }

Die SF32LB52x-Familie vereint zwei STAR-MC1-Prozessorkerne, Bluetooth, Grafikbeschleunigung, integrierte Audiofunktionen, Display-Schnittstellen, Speichercontroller und Power-Management in einem kompakten QFN68-Gehäuse. Sie eignet sich besonders für Produkte, bei denen Stücklistenkosten, Akkulaufzeit und Leiterplattenfläche gleichermaßen zählen.

### 3.1. Merkmale { #31-features }

Die Familie integriert:

- Zwei STAR-MC1-Prozessorkerne von Arm China, kompatibel mit Arm Cortex-M33 und mit FPU und MPU ausgestattet
- Dual-Mode-Bluetooth-Funktechnik nach Bluetooth 5.3
- ePicasso 2.0: 2D/2.5D-Grafikbeschleunigung
- Display-Controller für SPI-, QSPI-, 8080-, JDI- und 8-Bit-EPD-Schnittstellen
- USB-2.0-Full-Speed-Device
- SDIO/eMMC-Speicherschnittstelle bei unterstützten Varianten
- Analoge und digitale Audioschnittstellen
- Integrierte PMU sowie DC/DC-Wandler und LDO-Regler
- QFN68-Gehäuse mit bis zu 44/45 GPIOs

### 3.2. Varianten { #32-variants }

Je nach Stromversorgungsarchitektur lässt sich die SF32LB52x-Familie in zwei Designgruppen einteilen: akkubetriebene Geräte und Geräte mit externer, geregelter Versorgung.

=== "SF32LB520/3/5/7 (akkubetrieben)"

    Diese Gruppe verfügt über ein integriertes **Lademanagement-Modul und eine PMU**. Sie kann direkt an einen Lithium-Akku mit einer Zelle angeschlossen werden; externe Ladelösungen werden ebenfalls unterstützt.

    <div align="center"><em>Tabelle 3.2-1: Modellübersicht (akkubetriebene Variante)</em></div>

    <div align="center" markdown>

    | Modell | Speicher im selben Gehäuse | Versorgung | Design-Hinweis |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR-Flash | Li-Ion-Akku, 3,2–4,7 V, wiederaufladbar | Bootet standardmäßig vom integrierten Flash; `VDD18_VOUT` benötigt eine externe 3,3-V-Versorgung |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | Li-Ion-Akku, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | Li-Ion-Akku, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | Li-Ion-Akku, 3,2–4,7 V, wiederaufladbar | Muss von externem Speicher booten |

    </div>

=== "52B/D/E/G/J (extern geregelte Versorgung)"

    Diese Gruppe verfügt über eine integrierte **PMU**, jedoch nicht über eine Ladeschaltung. Die Versorgung erfolgt über eine externe Spannungsquelle mit geregelter Ausgangsspannung.

    <div align="center"><em>Tabelle 3.2-2: Modellübersicht (Variante mit externer Versorgung)</em></div>

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

Die Peripherieressourcen unterscheiden sich zwischen den beiden Designgruppen geringfügig: Die akkubetriebenen Varianten bieten 44 GPIOs, die extern versorgten 45. Bei den akkubetriebenen Varianten ist ein Pin für die Ladefunktion reserviert.

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
- SPI-Displayschnittstelle mit einer, zwei oder vier Datenleitungen sowie serielle JDI-Display-Schnittstelle
- Unterstützt Displays mit und ohne GRAM
- Unterstützt UART-Download und Software-Debugging

Die folgenden Abbildungen zeigen die Pinbelegung der beiden Gruppen. Auf die Unterschiede wird im Abschnitt zum Schaltplanentwurf nochmals eingegangen.

![Abbildung 3.3-1: QFN68L-Pin-Layout für SF32LB520/3/5/7](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-1: QFN68L-Pin-Layout für SF32LB520/3/5/7</em></div>

![Abbildung 3.3-2: QFN68L-Pin-Layout für SF32LB52B/E/G/J](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 3.3-2: QFN68L-Pin-Layout für SF32LB52B/E/G/J</em></div>

### 3.4. Anwendungen { #34-applications }

Typische Einsatzbereiche sind kompakte, mobile Embedded-Systeme mit hohen Anforderungen an die Akkulaufzeit, zum Beispiel:

- Smartwatches der Einstiegsklasse und Fitness-Armbänder
- Bluetooth-Module und drahtlose Adapter
- Bluetooth-Audio-Zubehör
- Intelligente Sensoren und Wearables
- Elektronische Regaletiketten und Smart Badges
- E-Book-Reader
- Tragbare Etikettendrucker
- Displays für E-Bikes und E-Scooter
- Vernetzte Mensch-Maschine-Schnittstellen (HMI)
- Mobile Industrie- und Medizingeräte
- Weitere akkubetriebene AIoT-Geräte

## 4. Design im Überblick { #4-design-at-a-glance }

### 4.1. Hardware-Architektur { #41-hardware-architecture }

Die folgende Tabelle gibt einen kompakten Überblick über die empfohlene Hardware-Architektur einer typischen SF32LB52x-Anwendung. Sie dient als Orientierung für die detaillierten Designhinweise in den folgenden Abschnitten.

<div align="center"><em>Tabelle 4.1-1: Zusammenfassung „Design im Überblick“</em></div>

<div align="center" markdown>

| Hardware-Block | Typische Umsetzung |
|:---|:---|
| Gehäuse | QFN68L, 7 mm x 7 mm x 0,85 mm, 0,35 mm Pitch |
| PCB | 4-Lagen-PTH-PCB empfohlen |
| Stromversorgung | einzelliger Li-Ion-/Li-Po-Akku oder geregelte externe Versorgung, abhängig von der Gerätevariante |
| Akkuladung | In unterstützten Varianten integrierter Lader oder externer Lade-IC mit oder ohne Power-Path-Management (PPM) |
| Buck-Induktivität | 4,7 µH ±20 %, DCR ≤ 0,4 Ω, Isat ≥ 450 mA |
| Quarz | 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz |
| RF | 50-Ω-Leitung mit kontrolliertem Wellenwiderstand und reserviertem π-Anpassnetzwerk |
| Display | 3-Draht-SPI, 4-Draht-SPI, Dual-SPI, Quad-SPI (bis 512 x 512), JDI und 8-Bit-EPD |
| Touch | kapazitiver I2C-Touch-Controller; das System kann per Interrupt aufgeweckt werden |
| Speicher | SiP-Flash/PSRAM, externes SPI-NOR, SPI-NAND, SD-NAND oder eMMC, abhängig von der Variante |
| Audio | Analoger Mikrofoneingang, differenzieller DAC-Ausgang, externer PA |
| Sensoren | I2C-/SPI-Sensoren wie Beschleunigungssensor, Gyroskop, Erdmagnetfeldsensor, Herzfrequenzsensor, SpO2-Sensor und EKG-Sensor |
| Haptik | PWM-gesteuerter Vibrationsmotor |
| Debug | DBG_UART auf PA18/PA19, gemultiplext mit SWD |

</div>


### 4.2. Hardware-Designablauf { #42-hardware-design-flow }

Gehen Sie den Leitfaden in der Reihenfolge durch, in der die zentralen Hardwareentscheidungen üblicherweise getroffen werden. So bleiben die Architekturentscheidungen geklärt, bevor Sie den Schaltplan und das PCB-Layout ausarbeiten.

<div align="center"><em>Tabelle 4.2-1: Hardware-Designablauf</em></div>

<div align="center" markdown>

| Schritt | Design-Entscheidung | Primäre Abschnitte |
|:---|:---|:---|
| 1 | Die konkrete bestellbare Variante und die passende Stromversorgung auswählen | Geräteübersicht, Variantenauswahl |
| 2 | Gehäuse, GPIO-Anzahl und Pins mit fest zugewiesenen Funktionen bestätigen | Gehäuse, Schaltplan-Designrichtlinien |
| 3 | Das Minimalsystem festlegen: Stromversorgungsstruktur, Boot-Speicher, Bootstrap-Pins, Debug-Zugang, Taktquellen und Aufwachstrategie | Minimalsystem-Design, Speicher, Debug, Takterzeugung |
| 4 | RF-Topologie, Display, Audio, Sensoren und weitere Produktschnittstellen auswählen | Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität |
| 5 | PCB-Stack-up, Fanout, Impedanz und Routing störungsempfindlicher Signale prüfen | PCB-Layout-Richtlinien |
| 6 | Den Entwurf mit den in den Quellen enthaltenen Referenzschaltplänen, PCB-Layouts, Mechanikzeichnungen und Versorgungsdiagrammen abgleichen | Anhänge A–E |
| 7 | Zugänge für Inbetriebnahme, Debugging, Kalibrierung und Produktionstests vorsehen | Debug, Produktion, Design-Review-Checkliste |

</div>

**Auswahlhilfe**

- Soll das Gerät mit einem über USB aufladbaren Einzelzellen-Akku betrieben werden? Beginnen Sie mit `SF32LB520/3/5/7`.
- Ist eine extern geregelte Versorgung oder das Booten von eMMC erforderlich? Beginnen Sie mit `52B/D/E/G/J`.
- Wird ein paralleles 8-Bit-EPD benötigt? Folgen Sie dem Designpfad für extern versorgte Varianten, sofern SiFli nicht ausdrücklich bestätigt, dass der akkubetriebene Pfad für den konkreten Entwurf geeignet ist.
- Ist ein möglichst niedriger Standby-Strom entscheidend? Legen Sie Schalter für die Speicherversorgung und Sensoren sowie die Abschaltung der Displayversorgung fest, bevor Sie die Bauteile auf dem PCB platzieren.

### 4.3. Verwendung dieses Leitfadens { #43-how-to-use-this-guide }

Legen Sie vor Beginn des Schaltplanentwurfs die genaue Bestellnummer fest. Die SF32LB52x-Familie umfasst zwei praktische Designgruppen: `SF32LB520/3/5/7` für Akkubetrieb und `52B/D/E/G/J` für extern geregelte Versorgung. Wählen Sie die passende Gruppe anhand von Abschnitt 3.2. Prüfen Sie das Minimalsystem und die Stromversorgung in den Abschnitten 5.1 und 5.2 sowie Boot-Speicher und Debug-Zugang in den Abschnitten 5.6.1 und 5.7.1. Die Abschnitte 5 und 6 enthalten die Schaltplan- und PCB-Layout-Hinweise. Gleichen Sie den Entwurf mit den Referenzabbildungen in den Anhängen A–E ab und verwenden Sie Abschnitt 7 als Freigabe-Checkliste.

Wenn Sie einen älteren SF32LB52x-Schaltplan wiederverwenden, prüfen Sie zuerst die Versorgungspins, die Versorgung des SiP-Speichers, die Versorgung des Boot-Speichers, die DBG_UART-/SWD-Pins, die Quarzbeschaltung, das RF-Anpassnetzwerk-Footprint und die Produktionstestpunkte. Fehler an diesen Stellen führen besonders häufig zu Problemen bei der Inbetriebnahme und werden bei einer oberflächlichen Prüfung leicht übersehen.

### 4.4. Nachweispaket für die Designprüfung { #44-review-evidence-pack }

Stellen Sie vor der Hardwarefreigabe die Nachweise zusammen: Schaltplan-PDF, PCB-Stack-up, Impedanzbericht, Abgleich der Bauteile mit der AVL, DRC-Bericht sowie Screenshots der RF-, Quarz-, USB-, SDIO-/eMMC-, Audio-, Stromversorgungs- und Boot-Speicher-Layouts. Archivieren Sie diese Unterlagen mit der jeweiligen Board-Revision. So lassen sich spätere Firmware-, RF- oder Fertigungsprobleme auf den geprüften Hardwarestand zurückführen.


## 5. Checklisten verwenden { #using-the-checklists }

Dieser Leitfaden enthält Checklisten auf zwei Ebenen. Die kompakten Prüflisten in den Abschnitten 5.1.1.5, 5.5.3 und 7 heben die wichtigsten Risiken für eine schnelle technische Selbstprüfung hervor. Die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) (Abschnitt 6.15) bilden SiFlis vollständige [*SF32LB52 Schematic & PCB Checklist*][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] (V1.0, 2026-01-21) Punkt für Punkt ab. Die Checkliste wurde zusammen mit dem Hardware-Design-Leitfaden im [SiFli-Wiki][SiFli Chip Hardware Design Guide Index (Wiki)] veröffentlicht. Sie gilt sowohl für die akkubetriebenen SF32LB520/3/5/7 als auch für die extern versorgten 52B/D/E/G/J.

Jeder Prüfpunkt nennt die zutreffenden SF32LB52x-Varianten und ist als erforderlich (muss vor der Freigabe erfüllt sein) oder optional (bei Nutzung der betreffenden Funktion empfohlen) gekennzeichnet. „Alle Varianten“ umfasst SF32LB520/3/5/7 und 52B/D/E/G/J, sofern der Geltungsbereich nicht weiter eingeschränkt ist. Farbige Schrift und <span class="flag-red flag-yellow">gelb hinterlegte Textstellen</span> übernehmen die Hervorhebungen aus der ursprünglichen Tabelle. Da die Quelle die Gründe für einzelne Hervorhebungen nicht nennt, sollten Sie diese als zusätzliche Prüfsignale verstehen, nicht als Ersatz für die übrigen Prüfpunkte. Das Tabellenformat der Quelle bleibt bewusst erhalten. Ist eine Formulierung unvollständig, widersprüchlich oder zu knapp, ziehen Sie zusätzlich den Design-Leitfaden, das Datenblatt, das Referenzhandbuch und SiFlis Modellnummern-Richtlinien heran.

Bearbeiten Sie die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md) bei der Schaltplanprüfung, bevor Sie mit dem PCB-Layout beginnen. Verwenden Sie die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) bei der Layoutprüfung vor der Gerber-Freigabe. Üblicherweise wird jede Prüfung zweimal durchgeführt: zuerst durch den zuständigen Entwicklungsingenieur und anschließend durch eine unabhängige prüfende Person, jeweils vor dem Design-Freeze oder der Fertigungsfreigabe.

Am nützlichsten ist die Checkliste als Abnahmeprotokoll, nicht als reine Leseliste:

1. Bestätigen Sie zuerst die genaue Zielvariante des Mikrocontrollers, besonders wenn der Entwurf sowohl mit 520/3/5/7 als auch mit 52B/D/E/G/J umgesetzt werden könnte.
2. Kennzeichnen Sie jeden Punkt bei der Prüfung als bestanden, nicht bestanden oder nicht zutreffend, statt die Tabelle nur durchzulesen.
3. Verweist ein Prüfpunkt auf das Boot-Medium, den Displaytyp oder das Schaltverhalten der Stromversorgung, gleichen Sie ihn mit dem tatsächlichen Schaltplan und dem passenden Kapitel des Design-Leitfadens ab.
4. Halten Sie bei jeder mehrdeutigen Formulierung in der Quelle die genaue Teilenummer und die zugrunde gelegte Designannahme vor der Freigabe in den Prüfnotizen fest.

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

## 6. Weitere Seiten des Design-Leitfadens { #continue-the-design-guide }

Der vollständige Leitfaden umfasst auch die folgenden Seiten. Jede behandelt eine Phase des Designprozesses und ist über die nachstehenden Links erreichbar.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Schaltplan-Designrichtlinien](SF32LB52x_schematic_design.md)__ — Minimalsystem, Stromversorgung, Takterzeugung, RF, Benutzerschnittstellen, Speicher und Konnektivität sowie Fertigungszugang, verteilt auf drei Seiten
- :fontawesome-solid-list-check: __[Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md)__ — Punkt-für-Punkt-Checkliste für das Schaltplan-Review (Abschnitt 5.8)
- :fontawesome-solid-microchip: __[PCB-Layout-Richtlinien](SF32LB52x_pcb_layout.md)__ — Hinweise zu Footprint, Stack-up, Fanout und Routing für Takt, RF, Audio, USB, SDIO und Stromversorgung
- :fontawesome-solid-list-check: __[PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md)__ — Punkt-für-Punkt-Checkliste für das PCB-Layout-Review (Abschnitt 6.15)
- :fontawesome-solid-book-open: __[Design-Review-Checkliste und Referenzen](SF32LB52x_review_and_reference.md)__ — Freigabe-Checkliste, weiterführende Dokumente, Anhänge mit Referenzschaltplänen, PCB-Layouts, Mechanik- und Stromversorgungsangaben sowie Versionshistorie

</div>
