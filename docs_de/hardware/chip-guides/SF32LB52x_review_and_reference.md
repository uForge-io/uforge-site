---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Design-Review-Checkliste, verwandte Dokumente, Referenzanhänge (Schaltplan, PCB, Mechanik, Versorgung) und Versionshistorie des SF32LB52x-Hardware-Design-Leitfadens."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden — Design-Review-Checkliste und Referenzen { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 7-10: Design-Review-Checkliste, verwandte Dokumente und Referenzen, Anhänge und Versionshistorie. Zurück zu den [PCB-Layout-Richtlinien](SF32LB52x_pcb_layout.md).

## 7. Design-Review-Checkliste { #7-design-review-checklist }

- [ ] Die Prüfung des Minimalsystems ist abgeschlossen: genaue Variante, Gehäuse, Versorgungsstruktur, Boot-Medium, Bootstrap-Pins, Debug-/Download-Zugang, Takte und Weckstrategie sind dokumentiert
- [ ] Das exakte Chipmodell und die Stromversorgungsvariante sind bestätigt, und Stromversorgungsschaltpläne der beiden Varianten wurden nicht vermischt
- [ ] Die Versorgungspins des Prozessors (VBUS/VBAT/VCC oder PVDD/VDDIOA/VDD_SIP) liegen innerhalb des im Datenblatt angegebenen Spannungsbereichs
- [ ] Die BUCK-Induktivität erfüllt 4,7 µH ±20 %, DCR ≤0,4 Ω, Isat ≥450 mA
- [ ] Bei der akkubetriebenen Variante: Ladepfad, Spannungsbereich des OVP-Bauteils und Ausgangskapazität des integrierten LDO sind geprüft
- [ ] Die Quarze mit 48 MHz und 32,768 kHz erfüllen die empfohlenen Spezifikationen; Routing und Freihaltebereiche sind eingehalten
- [ ] Die RF-Leiterbahn ist auf 50 Ω ausgelegt und das Anpassnetzwerk nahe am Chip platziert
- [ ] Die Boot-Konfiguration des Speichers (einschließlich der eMMC-Option der extern geregelten Versorgungsvariante) stimmt mit den Bootstrap-Pin-Einstellungen überein
- [ ] Steuerpin des Speicherversorgungsschalters für die genaue Variante verifizieren; die Abweichung PA11/PA21 zwischen offizieller Checkliste und Anwendungshinweisen vor der Freigabe klären
- [ ] USB DP/DN sind als differenzielles Paar mit 90 Ω differenzieller Impedanz geführt
- [ ] SDIO-Signale sind gemeinsam geführt, mit einer Gesamtlänge ≤50 mm, einer Längendifferenz innerhalb der Gruppe ≤6 mm und Masseabschirmung
- [ ] Die gemultiplexten DBG_UART-/SWD-Pins und Produktionstestpunkte sind reserviert
- [ ] Die Teilenummern der Schlüsselbauteile wurden gegen die aktuelle [SiFli-Liste freigegebener Lieferanten][SiFli Approved Vendor List (AVL)] geprüft

## 8. Verwandte Dokumente und Referenzen { #8-related-documents-and-references }

[SF32LB52x Datasheet (Official PDF)]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x User Manual (Official PDF)]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 Hardware Reference Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J Hardware Application Note (Source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md
[Local SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/en/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x-Datenblatt (offizielles PDF)][SF32LB52x Datasheet (Official PDF)]__
- :fontawesome-solid-file-pdf: __[SF32LB52x-Benutzerhandbuch (offizielles PDF)][SF32LB52x User Manual (Official PDF)]__
- :fontawesome-solid-file-zipper: __[SF32LB52-Referenzdesign-Paket][SF32LB52 Hardware Reference Design Package]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweise für SF32LB520/3/5/7 (Quelle)][SF32LB520/3/5/7 Hardware Application Note (Source)]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweise für 52B/D/E/G/J (Quelle)][52B/D/E/G/J Hardware Application Note (Source)]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten auf dieser Website][Local SiFli Approved Vendor List]__
- :fontawesome-solid-file-excel: __[SiFli-Schaltplan- und PCB-Checkliste für SF32LB52 (XLSX)][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]__
- :fontawesome-brands-wikipedia-w: __[SiFli-Wiki: Index der Hardware-Design-Leitfäden für Chips][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Weitere Quellreferenzen:

- [SF32LB52x-Produktübersicht](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [SF32LB52x-Datenblatt](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [SF32LB52x-Referenzhandbuch](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [Hardware-Anwendungshinweise für SF32LB520/3/5/7](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB520-3-5-7-HW-Application.md)
- [Hardware-Anwendungshinweise für 52B/D/E/G/J](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52B-E-G-J-HW-Application.md)

Die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md) (Abschnitt 5.8) und die [PCB-Layout-Checkliste](SF32LB52x_pcb_layout_checklist.md) (Abschnitt 6.15) geben dieselbe *SF32LB52 Schematic & PCB Checklist* (V1.0, 2026-01-21) Punkt für Punkt wieder. Sie ergänzen die Schaltplan- und PCB-Layout-Hinweise, anhand derer das Design geprüft wird.

## 9. Anhänge { #9-appendices }

Die ursprünglichen SiFli-Anwendungshinweise enthalten die folgenden Referenzabbildungen zu Schaltplan, PCB-Layout, Mechanik und Stromversorgung. Die Anhänge bewahren diese Quellabbildungen zur Dokumentation der Designprüfung; die Abschnitte 5 und 6 bleiben die maßgeblichen Designrichtlinien.

!!! note "Verwendung dieser Abbildungen"
    Nutzen Sie diese Abbildungen als Referenzschaltungen und Layoutbeispiele aus den ursprünglichen Anwendungshinweisen. Bestätigen Sie die endgültige Umsetzung für das konkrete Gerät und Produkt anhand der Regeln, Tabellen, des Datenblatts, des Referenzhandbuchs, des aktuellen Referenzdesign-Pakets und der AVL.

<div align="center"><em>Tabelle 9-1: Anhangsübersicht</em></div>

<div align="center" markdown>

| Bedarf | Hier beginnen |
|:---|:---|
| Blockdiagramm-Beispiele für Smartwatches für beide SF32LB52x-Variantengruppen | Anhang A: Eine typische Smartwatch-Anwendung |
| Schaltplanbeispiele zu RF, Speicher/Boot-Konfiguration, Tasten, Motor, Audio, Takt, USB und DC/DC | Anhang B: Referenzschaltpläne |
| PCB-Platzierungs- und Routing-Beispiele für RF, Speicher, Audio, Stack-up, Fanout, Takt, USB und DC/DC | Anhang C: Referenz-PCB-Layouts |
| Zeichnungen zu Gehäuseumriss, Gehäuseform und empfohlenem Land-Pattern | Anhang D: Mechanik |
| Referenzschaltungen und PCB-Layouts für Laden, OVP, Versorgungsstruktur und PMU | Anhang E: Stromversorgung |

</div>

### 9.1. Anhang A. Eine typische Smartwatch-Anwendung { #appendix-a-a-typical-smart-watch-application }

Ein typisches Smartwatch-Design mit dem SF32LB52x umfasst den Mikrocontroller, das Display, den Touch-Controller, den Speicher, Sensoren, den Vibrationsmotor, Audio-Ein- und -Ausgänge, die Bluetooth-Antenne, Taktquellen, die Stromversorgung, eine Debug-Schnittstelle und Zugänge für Produktionstests. Bei der akkubetriebenen Variante kommt eine Ladeschaltung hinzu.
Die Abbildungen 9.1-1 und 9.1-2 zeigen ein QSPI-Display, Beschleunigungssensor/Gyroskop über SPI, ein Herzfrequenzmodul über I2C, ein analoges Mikrofon und den DAC-Verstärker-Pfad, einen PWM-gesteuerten Vibrationsmotor, den 48-MHz-Takt, den Bluetooth-RF-Pfad sowie SWD/UART. QSPI NAND, SD NAND und NOR Flash sind Speicherbeispiele, keine vollständige Liste der Boot-Medien. Beide Diagramme zeigen einen externen Lader und einen Buck/LDO-Pfad. Wählen Sie die tatsächliche Versorgungsarchitektur anhand von Abschnitt 5.2; das Blockdiagramm schreibt diese Schaltung nicht vor.


![Abbildung 9.1-1: SF32LB520/3/5/7-Smartwatch-Anwendungsdiagramm](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.1-1: SF32LB520/3/5/7-Smartwatch-Anwendungsdiagramm</em></div>

![Abbildung 9.1-2: 52B/D/E/G/J-Smartwatch-Anwendungsdiagramm](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.1-2: 52B/D/E/G/J-Smartwatch-Anwendungsdiagramm</em></div>

### 9.2. Anhang B. Referenzschaltpläne { #appendix-b-reference-schematics }

**RF**

![Abbildung 9.2-1: RF-Frontend-Blockdiagramm](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-1: RF-Frontend-Blockdiagramm</em></div>

![Abbildung 9.2-2: RF-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-2: RF-Schaltplan-Referenz</em></div>

![Abbildung 9.2-3: Referenz zur RF-Signalführung im Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-3: Referenz zur RF-Signalführung im Schaltplan</em></div>

**Speicher und Boot**

![Abbildung 9.2-4: SF32LB520/3/5/7-Bootstrap-Referenz](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-4: SF32LB520/3/5/7-Bootstrap-Referenz</em></div>

![Abbildung 9.2-5: 52B/D/E/G/J-Bootstrap-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-5: 52B/D/E/G/J-Bootstrap-Referenz</em></div>

![Abbildung 9.2-6: SDIO-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-6: SDIO-Schaltplan-Referenz</em></div>

**Tasten, Motor und Audio**

![Abbildung 9.2-7: SF32LB520/3/5/7-Vibrationsmotor-Referenz](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-7: SF32LB520/3/5/7-Vibrationsmotor-Referenz</em></div>

![Abbildung 9.2-8: 52B/D/E/G/J-Vibrationsmotor-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-8: 52B/D/E/G/J-Vibrationsmotor-Referenz</em></div>

![Abbildung 9.2-9: Referenz für die Power-Taste](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-9: Referenz für die Power-Taste</em></div>

![Abbildung 9.2-10: Referenz für den Drehgeber-Taster](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-10: Referenz für den Drehgeber-Taster</em></div>

![Abbildung 9.2-11: Analoges-MEMS-Mikrofon-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-11: Analoges-MEMS-Mikrofon-Referenz</em></div>

![Abbildung 9.2-12: Analoges-ECM-Mikrofon-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-12: Analoges-ECM-Mikrofon-Referenz</em></div>

![Abbildung 9.2-13: Referenzschaltung vom analogen DAC zum Leistungsverstärker (PA)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-13: Referenzschaltung vom analogen DAC zum Leistungsverstärker (PA)</em></div>

![Abbildung 9.2-14: Audio-Power-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-14: Audio-Power-Schaltplan-Referenz</em></div>

![Abbildung 9.2-15: Audio-ADC-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-15: Audio-ADC-Schaltplan-Referenz</em></div>

![Abbildung 9.2-16: Audio-DAC-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-16: Audio-DAC-Schaltplan-Referenz</em></div>

**Takt**

![Abbildung 9.2-17: 48-MHz-Quarz-Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-17: 48-MHz-Quarz-Schaltplan</em></div>

![Abbildung 9.2-18: 32,768-kHz-Quarz-Schaltplan](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-18: 32,768-kHz-Quarz-Schaltplan</em></div>

**USB**

![Abbildung 9.2-19: USB-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-19: USB-Schaltplan-Referenz</em></div>

**DC/DC**

![Abbildung 9.2-20: DC/DC-Schaltplan-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.2-20: DC/DC-Schaltplan-Referenz</em></div>

### 9.3. Anhang C. Referenz-PCB-Layouts { #appendix-c-reference-pcb-layouts }

**RF**

![Abbildung 9.3-1: Referenz für das RF-Anpassnetzwerk auf der PCB](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-1: Referenz für das RF-Anpassnetzwerk auf der PCB</em></div>

![Abbildung 9.3-2: RF-PCB-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-2: RF-PCB-Routing-Referenz</em></div>

**Speicher**

![Abbildung 9.3-3: SDIO-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-3: SDIO-PCB-Referenz</em></div>

**Audio**

![Abbildung 9.3-4: Audio-Power-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-4: Audio-Power-PCB-Referenz</em></div>

![Abbildung 9.3-5: Audio-ADC-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-5: Audio-ADC-PCB-Referenz</em></div>

![Abbildung 9.3-6: Audio-DAC-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-6: Audio-DAC-PCB-Referenz</em></div>

**PCB-Grundlage**

![Abbildung 9.3-7: PCB-Stack-up-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-7: PCB-Stack-up-Referenz</em></div>

![Abbildung 9.3-8: PCB-Designregel-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-8: PCB-Designregel-Referenz</em></div>

![Abbildung 9.3-9: QFN-Fanout-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-9: QFN-Fanout-Referenz</em></div>

![Abbildung 9.3-10: Quarzplatzierungs-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-10: Quarzplatzierungs-Referenz</em></div>

**Takt-Routing**

![Abbildung 9.3-11: 48-MHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-11: 48-MHz-Quarz-Routing-Modell</em></div>

![Abbildung 9.3-12: 48-MHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-12: 48-MHz-Quarz-Routing-Referenz</em></div>

![Abbildung 9.3-13: 32,768-kHz-Quarz-Routing-Modell](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-13: 32,768-kHz-Quarz-Routing-Modell</em></div>

![Abbildung 9.3-14: 32,768-kHz-Quarz-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-14: 32,768-kHz-Quarz-Routing-Referenz</em></div>

**USB**

![Abbildung 9.3-15: USB-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-15: USB-PCB-Referenz</em></div>

![Abbildung 9.3-16: USB-Layout-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-16: USB-Layout-Referenz</em></div>

![Abbildung 9.3-17: USB-Routing-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-17: USB-Routing-Referenz</em></div>

**DC/DC**

![Abbildung 9.3-18: DC/DC-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.3-18: DC/DC-PCB-Referenz</em></div>

### 9.4. Anhang D. Mechanik { #appendix-d-mechanical }

![Abbildung 9.4-1: SF32LB520/3/5/7-Gehäuselayout](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.4-1: SF32LB520/3/5/7-Gehäuselayout</em></div>

![Abbildung 9.4-2: 52B/D/E/G/J-Gehäuselayout](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.4-2: 52B/D/E/G/J-Gehäuselayout</em></div>

![Abbildung 9.4-3: QFN68L-Gehäuseabmessungen](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.4-3: QFN68L-Gehäuseabmessungen</em></div>

![Abbildung 9.4-4: QFN68L-Gehäuseform](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.4-4: QFN68L-Gehäuseform</em></div>

![Abbildung 9.4-5: Empfohlenes QFN68L-Land-Pattern](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.4-5: Empfohlenes QFN68L-Land-Pattern</em></div>

### 9.5. Anhang E. Stromversorgung { #appendix-e-power }

**SF32LB520/3/5/7 (akkubetrieben)**

Die folgenden Abbildungen zeigen externe Ladeschaltungen mit und ohne Power-Path-Management (PPM) sowie anschließend die integrierte Ladeschaltung.

![Abbildung 9.5-1: Externe Ladeschaltung ohne PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-1: Externe Ladeschaltung ohne Power-Path-Management (PPM)</em></div>

![Abbildung 9.5-2: Externe Ladeschaltung mit PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-2: Externe Ladeschaltung mit Power-Path-Management (PPM)</em></div>

![Abbildung 9.5-3: Integrierte Ladeschaltung](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-3: Integrierte Ladeschaltung</em></div>

![Abbildung 9.5-4: OVP-Schwellenwerteinstellung](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-4: OVP-Schwellenwerteinstellung</em></div>

![Abbildung 9.5-5: Anwendung des einstellbaren OVLO-OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-5: Anwendung des einstellbaren OVLO-OVP</em></div>

![Abbildung 9.5-6: Anwendung des OVP mit geregeltem Ausgang](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-6: Anwendung des OVP mit geregeltem Ausgang</em></div>

![Abbildung 9.5-7: SF32LB520/3/5/7-Stromversorgungsstruktur](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-7: SF32LB520/3/5/7-Stromversorgungsstruktur</em></div>

![Abbildung 9.5-8: VCC-Schaltplan-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-8: VCC-Schaltplan-Referenz</em></div>

![Abbildung 9.5-9: VCC-PCB-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-9: VCC-PCB-Referenz</em></div>

![Abbildung 9.5-10: Lade-Schaltplan-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-10: Lade-Schaltplan-Referenz</em></div>

![Abbildung 9.5-11: Lade-PCB-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-11: Lade-PCB-Referenz</em></div>

![Abbildung 9.5-12: PMU-TVS-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-12: PMU-TVS-Referenz</em></div>

![Abbildung 9.5-13: PMU-EOS-Referenz](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-13: PMU-EOS-Referenz</em></div>

**52B/D/E/G/J (extern geregelte Versorgung)**

![Abbildung 9.5-14: 52B/D/E/G/J-PMU-PCB-Referenz](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>Abbildung 9.5-14: 52B/D/E/G/J-PMU-PCB-Referenz</em></div>

## 10. Versionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Versionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Hinweis |
|:---|:---|:---|
| 1.1 | 2026-07 | Das Stromversorgungssystem wurde zu einem gleichrangigen Schaltplanabschnitt; Takterzeugung und RF wurden in separate Abschnitte aufgeteilt und die folgenden Schaltplanabschnitte neu nummeriert. |
| 1.0 | Dieses Dokument | Beide offiziellen Hardware-Anwendungshinweise wurden in einem Leitfaden zusammengeführt; Tabs trennen die Inhalte für akkubetriebene und extern geregelte Varianten. |
| 0.0.1 | 10/2024 | Erstveröffentlichung von `SF32LB520-3-5-7-HW-Application` |
| 0.0.1 | 10/2024 | Erstveröffentlichung von `SF32LB52B-E-G-J-HW-Application` |

</div>

### 10.1. Versionshistorie der Checkliste { #101-checklist-revision-history }

Die detaillierten Checklisten für [Schaltplan](SF32LB52x_schematic_checklist.md) und [PCB-Layout](SF32LB52x_pcb_layout_checklist.md) werden unabhängig vom Leitfaden versioniert. Ihre Versionsstände folgen SiFlis Tabellenblatt *SF32LB52 Schematic & PCB Checklist*.

<div align="center"><em>Tabelle 10.1-1: Versionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Version | Datum | Hinweis |
|:---|:---|:---|
| 1.0 | 2026-01-21 | Erstveröffentlichung, basierend auf SiFlis *SF32LB52 Schematic & PCB Checklist* V1.0 |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
