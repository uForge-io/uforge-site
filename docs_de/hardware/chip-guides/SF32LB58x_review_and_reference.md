---
icon: lucide/clipboard-check
description: "Checkliste für das Design-Review, zugehörige Dokumente und Referenzen, Anhänge und Revisionshistorie zum SF32LB58x-Hardware-Design-Leitfaden."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB58x Hardware-Design-Leitfaden — Checkliste für das Design-Review und Referenzen { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Teil des SF32LB58x-Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 7 bis 10: Checkliste für das Design-Review, zugehörige Dokumente und Referenzen, Anhänge und Revisionshistorie. Zurück zur [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md).

## 7. Design-Review-Checkliste { #7-design-review-checklist }

- [ ] Prüfen Sie, ob die im Gehäuse integrierte Flash-/PSRAM-Kombination des ausgewählten Modells die Produktanforderungen erfüllt.
- [ ] Prüfen Sie, ob die PMU-Versorgung (PVDD1/PVDD2/BUCK/LDO) und alle übrigen Versorgungspins innerhalb der Spannungsgrenzen des Datenblatts liegen.
- [ ] Prüfen Sie, ob die Nenninduktivität der ausgewählten BUCK-Drossel 4,7 µH beträgt und DCR ≤ 0,4 Ω sowie Isat ≥ 500 mA einhält.
- [ ] Prüfen Sie, ob 48-MHz- und 32,768-kHz-Quarze die empfohlenen Spezifikationen erfüllen und Routing sowie Freihaltebereiche den Designvorgaben entsprechen.
- [ ] Stellen Sie für die HF-Leiterbahn eine kontrollierte Impedanz von 50 Ω sicher und platzieren Sie das Anpassnetzwerk nahe am Chip.
- [ ] Prüfen Sie, ob die ausgewählte externe Speicherschnittstelle mit dem vorgesehenen Boot-Design kompatibel ist. Prüfen Sie separat die Beschaltung des Mode-Pins: High-Pegel für den Download-Modus, Low-Pegel für den Start aus dem Benutzerprogrammbereich.
- [ ] Prüfen Sie, ob die Display-Schnittstellen (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) die jeweiligen Impedanz- und Längenabgleichregeln erfüllen. Für DSI gelten 100 Ω differentielle Impedanz, ein Längenunterschied von ≤0,5 mm innerhalb jedes Differenzpaars und ≤2 mm zwischen den Differenzpaaren.
- [ ] Prüfen Sie, ob die USB-Leitung die Anforderung von 90 Ω differentieller Impedanz erfüllt. Führen Sie SDIO-Signale gemeinsam; die Gesamtlänge darf 50 mm und der Längenunterschied innerhalb einer Gruppe 6 mm nicht überschreiten.
- [ ] Erhalten Sie den SWD-Zugang sowie die aus den sechs verfügbaren UARTs ausgewählte Debug-Ausgabeschnittstelle samt ihren Signalpins und die Produktionstestpunkte.
- [ ] Stellen Sie sicher, dass BGA-Pad-Vias zentriert sind und die Massefläche unter dem Chip durchgehend verbunden ist.
- [ ] Prüfen Sie die Teilenummern wichtiger Komponenten anhand der aktuellen [SiFli-Liste zugelassener Lieferanten][SiFli-Liste zugelassener Lieferanten (AVL)].
- [ ] Nehmen Sie Lagenaufbau und Prozessfähigkeit, Impedanz- und DRC-Ergebnisse, die AVL sowie gezielte Layout-Screenshots in das Prüfnachweispaket auf.
- [ ] Klären Sie alle offenen Fragen zu Schaltplan, Layout und Fertigung vor der Prototypfreigabe; dokumentieren und verfolgen Sie verbleibende Punkte ausdrücklich.

## 8. Zugehörige Dokumente und Referenzen { #8-related-documents-and-references }

Verwenden Sie die aktuellsten offiziellen Dokumente zur Prüfung elektrischer Grenzwerte, Gehäusedaten, Pin-Multiplexing, Softwarekonfiguration und Komponentenqualifizierung.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x-Produktübersicht][SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x-Datenblatt][SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x-Benutzerhandbuch][SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x-Hardware-Anwendungshinweis]__
- :fontawesome-solid-file-excel: __[SiFli-Liste zugelassener Lieferanten (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli-Wiki: Index der Hardware-Design-Leitfäden für Chips][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Zusammen geben die [Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md) (Abschnitt 6.18) die jeweils relevanten Schaltplan- und PCB-Punkte aus der Arbeitsmappe *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21) wieder, ergänzt um die zugehörigen Designhinweise.

[SF32LB58x Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x-Hardware-Anwendungshinweis]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SiFli-Liste zugelassener Lieferanten (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Anhänge { #9-appendices }

Die Anhänge fassen Anwendungs- und Referenzdesign-Kontext zusammen. Verwenden Sie sie als Review-Hilfsmittel, nachdem die Hauptregeln zu Schaltplan und PCB aus den Abschnitten 5 und 6 angewendet wurden.

<div align="center"><em>Tabelle 9-1: Anhangsverzeichnis</em></div>

<div align="center" markdown>

| Bedarf | Hier beginnen |
|:---|:---|
| Anwendungskontext für ein funktionsreiches Wearable oder intelligentes Endgerät | Anhang A: Ein typisches Smart-Wearable oder intelligentes Endgerät |
| Schaltplan-Screenshots und Beispiele auf Schaltungsebene | Abschnitt 5 und der SF32LB58x-Hardware-Anwendungshinweis |
| PCB-Layout-Screenshots für BGA, HDI, HF, DSI, USB, SDIO, Audio und Stromversorgung | Abschnitt 6 und der SF32LB58x-Hardware-Anwendungshinweis |

</div>

### 9.1. Anhang A. Ein typisches Smart-Wearable oder intelligentes Endgerät { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

Ein typisches Smart-Wearable auf Basis des SF32LB58x oder ein intelligentes Endgerät umfasst MCU, PMIC, ein hochauflösendes Display, Touch-Controller, Boot-Speicher, externen Speicher oder eMMC, Sensoren, Vibrationsmotor, Audio-Ein- und -Ausgänge, Bluetooth-Antenne, Quarze, USB, Debug-Zugang und Produktionstestzugang. Das BGA256-Gehäuse und die Hochgeschwindigkeits-Display- und Speicherschnittstellen machen die Auswahl des HDI-Prozesses zu einem Teil der Systemarchitektur und nicht nur zu einem PCB-Layoutdetail.

## 10. Revisionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Revisionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkung |
|:---|:---|:---|
| 1.0 | 2026-07 | SF32LB58x-Hardware-Design-Leitfaden mit Hinweisen zu Schaltplan, PCB, Validierung und Fertigungsreview aktualisiert |
| 0.0.1 | 1/2025 | Erstveröffentlichung des offiziellen Entwurfs von `SF32LB58x-HW-Application` |

</div>

### 10.1. Revisionshistorie der Checkliste { #101-checklist-revision-history }

Die punktweise Checkliste in der [Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md) und der [PCB-Layout-Checkliste](SF32LB58x_pcb_layout_checklist.md) wird separat vom Leitfaden versioniert, entsprechend SiFlis eigener Arbeitsmappe *SF32LB58x Schematic & PCB Checklist*.

<div align="center"><em>Tabelle 10.1-1: Revisionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Versionshinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erste Veröffentlichung des Schematic-&-PCB-Checklist-Dokuments |

</div>
