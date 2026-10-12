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
- [ ] RF-Anpassnetzwerk, Antennenlayout und Antennenabstimmungsplan sind vollständig.
- [ ] Pins für Display, Speicher, Audio, Sensoren, PBR, UART/I2C, GPTIM, Debugging und Produktionstests sind konfliktfrei.
- [ ] Fanout für QFN oder BGA, Lagenaufbau, Impedanz, DRC und ESD-Strategie sind vollständig geprüft.
- [ ] Der Ablauf zum Flashen in der Fertigung und zur Quarzkalibrierung wurde getestet.

## 8. Verwandte Dokumente und Referenzen { #8-related-documents-and-references }

Verwenden Sie jeweils die neuesten offiziellen Dokumente, um elektrische Grenzwerte, Gehäusedaten, Pin-Multiplexing, Softwarekonfiguration, Bauteilqualifizierung und Fertigungsbeschränkungen zu prüfen.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xU][SF32LB56xU Hardware Application Note]__
- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB56xV][SF32LB56xV Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli-Wiki: Index der Hardware-Design-Leitfäden für Chips][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Die [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) (Abschnitt 5.8) und Abschnitt 6.3 der [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md) geben dieselbe *SF32LB56x Schematic & PCB Checklist* (V1.0, 2026-01-21) Punkt für Punkt wieder. Ergänzt werden die Prüfpunkte durch die zugehörigen Richtlinien für Schaltplan und PCB-Layout.

[SF32LB56xU Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Anhänge { #9-appendices }

### 9.1. Anhang A. Ein typisches SF32LB56x-Produkt { #appendix-a-a-typical-sf32lb56x-product }

Ein typisches SF32LB56x-Produkt umfasst MCU, PMIC, Display- und Touch-Controller, Boot-Speicher, optionalen externen Speicher, Sensoren, Vibrationsmotor, Audio-Ein- und -Ausgänge, Bluetooth-Antenne, Quarze sowie Debug-Zugang und Zugänge für Produktionstests. Das U-Gehäuse eignet sich für ein kompaktes QFN-Design. Das V-Gehäuse bietet mehr Schnittstellen, erfordert dafür aber eine entsprechende BGA-/HDI-Layoutplanung.

## 10. Versionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Versionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
|:---|:---|:---|
| 0.1 | 2026-07 | Erste Fassung des SF32LB56x Hardware-Design-Leitfadens auf Basis der offiziellen Hardware-Anwendungshinweise für SF32LB56xU und SF32LB56xV im SiFli-Wiki. |

</div>

### 10.1. Versionshistorie der Checkliste { #101-checklist-revision-history }

Die Checkliste in der [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) und Abschnitt 6.3 der [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md) wird Punkt für Punkt gemäß SiFlis eigener Arbeitsmappe *SF32LB56x Schematic & PCB Checklist* und unabhängig vom Leitfaden versioniert.

<div align="center"><em>Tabelle 10.1-1: Versionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Release-Hinweise |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung des Dokuments „Schematic & PCB Checklist“ |

</div>
