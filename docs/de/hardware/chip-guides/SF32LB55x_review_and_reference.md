---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Design-Prüfcheckliste, verwandte Dokumente und Referenzen, Anhänge und Versionshistorie für den SF32LB55x Hardware-Design-Leitfaden."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware-Design-Leitfaden — Design-Prüfcheckliste und Referenzen { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. Design-Prüfcheckliste { #7-design-review-checklist }

- [ ] Exaktes Gehäuse, Pinbelegung, Pad-Layout und Leiterplattenprozess sind bestätigt.
- [ ] Alle PMU- und Hilfsspannungsschienen entsprechen den Spannungs-/Stromgrenzwerten des Datenblatts.
- [ ] Erforderliche Entkopplungskondensatoren sind nahe an den Pins platziert.
- [ ] POR-/BOR-/Reset-Timing und Boot-Modus sind verifiziert.
- [ ] 48-MHz- und 32,768-kHz-Quarze erfüllen die Anforderungen an CL, ppm, ESR, Platzierung und Routing.
- [ ] RF-Anpassung, Antenne und Masse-Freihaltebereich sind geprüft.
- [ ] Pin-Gruppen für externen Speicher und Display entsprechen dem gewählten Gehäuse.
- [ ] Schaltungen für das Aufwecken sowie für GPADC, Sensoren, Audio, Touch, Hintergrundbeleuchtung und Motor erfüllen die Anforderungen an den Energiesparbetrieb.
- [ ] Zugänge für Debugging, Download, Fertigungsprogrammierung, RF-Tests und Quarzkalibrierung sind vorgesehen.

## 8. Verwandte Dokumente und Referenzen { #8-related-documents-and-references }

Verwenden Sie die neuesten offiziellen Dokumente zur Prüfung von elektrischen Grenzwerten, Gehäusedaten, Pin-Multiplexing, Softwarekonfiguration, Bauteilqualifizierung und Fertigungsbeschränkungen.

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[Hardware-Anwendungshinweis SF32LB55x][SF32LB55x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli-Liste freigegebener Lieferanten (AVL)][SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli-Wiki: Index der Hardware-Design-Leitfäden für Chips][SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Die [Schaltplan-Checkliste](SF32LB55x_schematic_checklist.md) (Abschnitt 5.8) und Abschnitt 6.4 der [PCB-Layout-Richtlinien](SF32LB55x_pcb_layout.md) geben dieselbe *SF32LB55x Schematic & PCB Checklist* (V1.0, 2026-01-21) punktweise wieder, zusammen mit den Schaltplan- und PCB-Layout-Hinweisen, gegen die sie geprüft wird.

[SF32LB55x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Anhänge { #9-appendices }

### 9.1. Anhang A. Ein typisches SF32LB55x-Produkt { #appendix-a-a-typical-sf32lb55x-product }

Ein typisches SF32LB55x-Produkt umfasst die MCU, die Versorgungsarchitektur, Quarze, RF-Anpassung und Antenne, externen Speicher, Display- und Touch-Controller, Sensoren, GPADC-Eingänge, Vibrationsmotor, optionales Bluetooth-Audio sowie Zugänge für Debugging und Produktionstests. Bei akkubetriebenen Geräten sollten außerdem die Leckströme im Energiesparbetrieb geprüft und der Zugang der Prüfvorrichtung zur Leiterplatte eingeplant werden.

### 9.2. Fragen zum Design { #91-design-qa }

1. **Warum weichen beim Start mit Mode = 1 die Standardzustände einiger GPIOs von der Spezifikation ab?** Im Download-Modus ändern sich die Zustände der GPIOs, die mit externem Flash an QSPI2 und QSPI3 verbunden sind.
2. **Warum kann ein SMD-Motor während des Programmierens unerwartet vibrieren?** Möglicherweise wird das Enable-Signal der Stromversorgung oder das PWM-Signal unbeabsichtigt aktiviert. Startet der Motor bei High-Pegel, kann ein GPIO mit Standard-Pull-up (PU) ihn einschalten. SiFli empfiehlt für PWM GPIO17 oder GPIO39 mit Standard-Pull-down (PD).
3. **Warum kann der Chip beim Anlöten des Akkus hängen bleiben, und wie lässt sich das verhindern?** Eine schlechte Erdung des Lötkolbens kann eine transiente Überspannung verursachen. Ergänzen Sie am Akkuanschluss einen Überspannungs- und ESD-Schutz und erden Sie den Lötkolben ordnungsgemäß.
4. **Warum kann eine Taste die MCU in Hibernate nicht aufwecken?** Aus Hibernate können nur die sechs LCPU-Weckeingänge GPIO43–GPIO48 die MCU aufwecken; die HCPU-GPIOs GPIO0–GPIO3 sind dafür nicht geeignet.
5. **Warum können G-Sensor oder Herzfrequenzsensor beim Debuggen des Energiesparbetriebs zu viel Strom aufnehmen oder fehlerhaft arbeiten?** Die Sensor-Firmware läuft auf der LCPU. Daher müssen I2C-, SPI-, Steuer- und Interruptsignale ausschließlich LCPU-Schnittstellen verwenden. Eine Zuordnung zu HCPU-Schnittstellen kann den Stromverbrauch erhöhen oder Fehlfunktionen verursachen.
6. **Warum bleibt der Sensorstrom trotz LCPU-Zuordnung aller Signale hoch?** Das Abschalten der Sensorversorgung allein reicht nicht, wenn die Pull-up-Versorgung von I2C- oder Interruptsignalen eingeschaltet bleibt. Schalten Sie auch diese Pull-up-Versorgungen ab.
7. **Warum kann der Schlafstrom steigen, wenn GPIO26 und GPIO27 beide als Ausgangssteuerungen verwendet werden?** Setzen Sie beide GPIOs im Schlaf auf denselben Pegel oder konfigurieren Sie mindestens einen ohne Pull-up und Pull-down hochohmig.
8. **Wie lässt sich eine hohe Stromaufnahme von SS6600 in Hibernate untersuchen?** Halten Sie alle zehn Weckeingänge stabil auf High oder Low: HCPU GPIO0–GPIO3 und LCPU GPIO43–GPIO48. Werden alle zehn hochgezogen, verwenden Sie für die Pull-up-Versorgung eine dauerhaft eingeschaltete 3,3-V-Quelle.
9. **Können Ruheströme von Versorgungsbauteilen einen zu hohen Verbrauch im Energiesparmodus erklären?** Ja. BUCK-Wandler, LDOs und Lastschalter mit hohem Ruhestrom (Iq) erhöhen den Verbrauch. SiFli empfiehlt Bauteile mit Iq unter 1 µA.
10. **Wie lassen sich Bildstörungen bei ESD-Prüfungen verhindern?** Sehen Sie ESD-Schutz für VDD, SCL, SDA, RESET und INT des Touchpanels sowie für LCD-Versorgung und RESET vor.
11. **Wie lassen sich Fehler bei der Always-on-Display-Funktion vermeiden?** Sie wird vor allem mit AMOLED-Panels eingesetzt, die weniger Energie als TFT-Panels verbrauchen. Für LCD_EN, LCD_RST und ähnliche Steuersignale werden PB-GPIOs empfohlen. Steuert ein PA-GPIO eine high-aktive Enable-Leitung, muss er standardmäßig PU sein; ein PA-GPIO mit Standard-PD kann das Display nach dem Aufwachen für mehr als 10 ms unerwartet dunkel lassen.
12. **Wie lassen sich Fehler der Bluetooth-Audio-Stromsteuerung nach dem Aufwachen vermeiden, wenn das Modul im Schlaf versorgt bleiben muss?** Steuern Sie seine Versorgung mit einem LCPU-GPIO. Bei low-aktiver Schaltung wählen Sie einen LCPU-GPIO mit Standard-PD.
13. **Wie bleibt das Laden nach einer Tiefentladung des Akkus möglich?** Bei sehr niedriger Akkuspannung sollte das Power-Path-Management dafür sorgen, dass nach Anschluss des Ladegeräts dessen Eingang das System versorgt. Ohne Power-Path-Management muss der ausgewählte Lade-IC einen Vorladestrom von mindestens 40 mA liefern.
14. **Warum startet der Ladevorgang nach Anschluss eines Ladegeräts möglicherweise nicht?** Das Erkennungssignal für den Ladegerätanschluss muss an einen der weckfähigen LCPU-GPIOs GPIO43 bis GPIO48 angeschlossen werden. Ein anderer GPIO kann den ordnungsgemäßen Start der Ladesequenz verhindern.
15. **Wie lässt sich ein hoher Strom im Download-Modus bei MODE = High vermeiden?** Steuern Sie stromintensive Peripherie wie einen Audio-PA mit high-aktivem Enable über einen GPIO mit Standard-PD, niemals über einen GPIO mit Standard-PU. Andernfalls kann der Download-Modus die Peripherie unbeabsichtigt einschalten und die Programmierung beeinträchtigen.
16. **Warum kann die Programmierung bei MODE = High fehlschlagen, und was ist bei einem Sensorinterrupt an GPIO46 zu tun?** Im Download-Modus ist GPIO46 standardmäßig UART3_RX und kann die Programmierung stören. Verlegen Sie den Sensorinterrupt auf GPIO43, GPIO44, GPIO47 oder GPIO48. Werden weitere LCPU-Weckeingänge benötigt, schließen Sie eine externe Taste über einen 0-Ω-Widerstand an GPIO45 oder GPIO46 an.
17. **Was ist zu tun, wenn G-Sensor- und Herzfrequenzalgorithmen den verfügbaren Speicher überschreiten?** Prüfen Sie, ob der LCPU genügend Speicher zugewiesen ist. Reicht er nicht aus, ergänzen Sie externen NOR-Flash an QSPI4.

## 10. Versionshistorie { #10-revision-history }

<div align="center"><em>Tabelle 10-1: Versionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
|:---|:---|:---|
| 0.1 | 2026-07 | Erste Version des SF32LB55x Hardware-Design-Leitfadens, erstellt auf Basis des offiziellen Hardware-Anwendungshinweises im SiFli-Wiki. |

</div>

### 10.1. Versionshistorie der Checkliste { #101-checklist-revision-history }

Die punktweise Checkliste in der [Schaltplan-Checkliste](SF32LB55x_schematic_checklist.md) und Abschnitt 6.4 der [PCB-Layout-Richtlinien](SF32LB55x_pcb_layout.md) wird getrennt vom Leitfaden versioniert, entsprechend SiFlis eigener Arbeitsmappe *SF32LB55x Schematic & PCB Checklist*.

<div align="center"><em>Tabelle 10.1-1: Versionshistorie der Checkliste</em></div>

<div align="center" markdown>

| Nr. | Version | Datum | Änderungen |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Erstveröffentlichung des Dokuments Schematic & PCB Checklist |

</div>
