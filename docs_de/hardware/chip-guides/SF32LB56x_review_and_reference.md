---
icon: lucide/clipboard-check
description: "Checkliste zur Designprüfung, verwandte Dokumente und Referenzen, Anhänge und Versionshistorie für den SF32LB56x Hardware-Design-Leitfaden."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB56x Hardware-Design-Leitfaden — Checkliste zur Designprüfung und Referenzen { #sf32lb56x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Teil des SF32LB56x Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 7-10: Checkliste zur Designprüfung, verwandte Dokumente und Referenzen, Anhänge und Versionshistorie. Zurück zu den [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md).

## 7. Checkliste zur Designprüfung { #7-design-review-checklist }

- [ ] U- oder V-Variante, Gehäuse, Pinbelegung und PCB-Prozess sind bestätigt.
- [ ] Versorgungsschienen des Prozessors, PMIC-Ausgänge, Kondensatoren, Reset, Ladeschaltung und Schalter für den Low-Power-Betrieb sind geprüft.
- [ ] Betriebsmodi, Weckquellen, Versorgungsschienen der Pull-ups und Leckstrom im Schlafmodus sind geprüft.
- [ ] Parameter, Platzierung und Routing der 48-MHz- und 32,768-kHz-Quarze sind geprüft.
- [ ] HF-Anpassnetzwerk, Antennenlayout und Antennenabstimmungsplan sind vollständig.
- [ ] Pins für Display, Speicher, Audio, Sensoren, PBR, UART/I2C, GPTIM, Debug und Produktion weisen keine Konflikte auf.
- [ ] QFN- oder BGA-Fanout, Stack-up, Impedanz, DRC und ESD-Strategie sind vollständig.
- [ ] Der Ablauf für die Produktionsprogrammierung und Quarzkalibrierung wurde getestet.

## 8. Verwandte Dokumente und Referenzen { #8-related-documents-and-references }

Verwenden Sie die neuesten offiziellen Dokumente zur Prüfung von elektrischen Grenzwerten, Gehäusedaten, Pin-Multiplexing, Softwarekonfiguration, Bauteilqualifizierung und Fertigungsbeschränkungen.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xU]__
- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xV]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli-Wiki: Index der Hardware-Design-Leitfäden für Chips][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Die [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) (Abschnitt 5.8) und Abschnitt 6.3 der [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md) geben dieselbe *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21) punktweise wieder, zusammen mit den Schaltplan- und PCB-Layout-Hinweisen, gegen die sie prüfen.

[Hardware-Anwendungshinweis SF32LB56xU]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware-Anwendungshinweis SF32LB56xV]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SiFli-Liste freigegebener Lieferanten (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Anhänge { #9-appendices }

### 9.1. Anhang A. Ein typisches SF32LB56x-Produkt { #appendix-a-a-typical-sf32lb56x-product }

Ein typisches SF32LB56x-Produkt umfasst MCU, PMIC, Display- und Touch-Controller, Boot-Speicher, optionalen externen Speicher, Sensoren, Vibrationsmotor, Audio-Ein- und -Ausgänge, Bluetooth-Antenne, Quarze sowie Zugänge für Debugging und Produktionstests. Das U-Gehäuse eignet sich für eine kompakte QFN-Implementierung, während das V-Gehäuse mehr Schnittstellen ermöglicht und eine entsprechende BGA-/HDI-Layoutplanung erfordert.

## 10. Versionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Versionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
|:---|:---|:---|
| 0.1 | 2026-07 | Erste Fassung des SF32LB56x Hardware-Design-Leitfadens auf Basis der offiziellen Hardware-Applikationsschriften für SF32LB56xU und SF32LB56xV im SiFli-Wiki. |

</div>

### 10.1. Versionshistorie der Checkliste { #101-checklist-revision-history }

Die punktweise Checkliste in der [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) und Abschnitt 6.3 der [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md) wird gemäß SiFlis eigener Arbeitsmappe *SF32LB56x Schematic & PCB Checklist* unabhängig vom Leitfaden versioniert.

<div align="center"><em>Tabelle 10.1-1: Versionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Release-Hinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung des Dokuments Schematic & PCB Checklist |

</div>
