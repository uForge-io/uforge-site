---
icon: lucide/list-checks
hide:
    - navigation
description: "Punkt-für-Punkt-Checkliste für das PCB-Layout-Review des SF32LB52x MCU, mit Prüfungen zu Gehäuse, Routing, Stromversorgung und Masse."
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB52x Hardware-Design-Leitfaden — PCB-Layout-Checkliste { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 6.15, die Punkt-für-Punkt-PCB-Layout-Checkliste. Zurück zu den [PCB-Layout-Richtlinien](SF32LB52x_pcb_layout.md).

## 6.15. PCB-Layout-Checkliste { #615-pcb-layout-checklist }

Die ursprüngliche PCB-Checkliste enthält keine Spalte „Gilt für“. Wenden Sie jeden Prüfpunkt nur an, wenn die gewählte Variante und Schaltung den genannten Pin, die Versorgung oder die Funktion enthalten; kennzeichnen Sie nicht vorhandene Funktionen als nicht zutreffend. Die ursprünglichen Kategorien Erforderlich/Optional bleiben erhalten. Optional bedeutet jedoch nicht, dass ein laut Bauteilspezifikation notwendiges Bauteil entfallen darf.

!!! note "Kupferbehandlung am Quarz in der Quelle"
    Takt-Prüfpunkt 3 der Checkliste legt nicht fest, auf welchen Lagen eine Kupfer-Sperrzone erforderlich ist. Der Anwendungshinweis für batteriegespeiste Varianten widerspricht sich: Im Taktabschnitt soll die L2-Massefläche unter dem Quarz entfernt werden; im PCB-Routing-Abschnitt sind Ebenenaussparungen und Kupferausschnitte auf der oberen und den angrenzenden Lagen verboten und zeigen durchgehende L2-Masse. Der separate PCB-Layout-Leitfaden wiederholt das Verbot von Aussparungen. Klären Sie die Ausführung für den gewählten Lagenaufbau vor der Freigabe mit SiFli, statt sie aus der Checkliste abzuleiten.

!!! note "Prüfung der Leiterbahnbreiten"
    Die Arbeitsmappe gibt VCC ≥12 mil, BUCK-Leiterbahnen ≥10 mil und RF ≥10 mil vor. Abschnitt 6 enthält strengere Vorgaben für VCC und BUCK sowie die Empfehlung RF >10 mil. Erfüllen Sie beide jeweils zutreffenden Vorgabensätze einschließlich der 50-Ω-Anforderung für RF. Der Mindestwert der Checkliste ersetzt nicht die detaillierten Layoutvorgaben.

### 6.15.1. Gehäuse { #6151-package }

<div align="center"><em>Tabelle 6.15.1-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Der PCB-Footprint entspricht der Gehäusespezifikation | Erforderlich |

</div>

### 6.15.2. Routing der Stromversorgung { #6152-power-supply-routing }

<div align="center"><em>Tabelle 6.15.2-1: Checkliste Routing der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | <span class="flag-red">Breite der VBUS-Versorgungsleiterbahn ≥16 mil</span> | Erforderlich |
| 2 | <span class="flag-red">Breite der VBAT-Versorgungsleiterbahn ≥16 mil</span> | Erforderlich |
| 3 | <span class="flag-red">Breite der VCC-Versorgungsleiterbahn ≥12 mil</span> | Erforderlich |
| 4 | Breite der LDO2_OUT-Versorgungsleiterbahn ≥10 mil | Erforderlich |
| 5 | Breite der LDO3_OUT-Versorgungsleiterbahn ≥8 mil | Erforderlich |
| 6 | <span class="flag-red">Breite der PMU_BUCK_VSW- und PMU_BUCK_VOUT-Leiterbahnen ≥10 mil</span> | Erforderlich |
| 7 | Breite der AVDD_BRF-Versorgungsleiterbahn ≥8 mil | Erforderlich |
| 8 | <span class="flag-red">Breite der AVDD33_AUD-Versorgungsleiterbahn ≥8 mil</span> | Erforderlich |

</div>

### 6.15.3. Platzierung von Stromversorgungskondensatoren und -induktivitäten { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabelle 6.15.3-1: Checkliste Platzierung von Stromversorgungskondensatoren und -induktivitäten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | VBUS-Kondensator nahe am Pin platziert | Erforderlich |
| 2 | VBAT-Kondensator nahe am Pin platziert | <span class="flag-red">Optional</span> |
| 3 | VCC-Kondensator nahe am Pin platziert | Erforderlich |
| 4 | LDO2_OUT-Kondensator nahe am Pin platziert | <span class="flag-red">Optional</span> |
| 5 | LDO3_OUT-Kondensator nahe am Pin platziert | <span class="flag-red">Optional</span> |
| 6 | VSYS-Kondensator nahe am Pin platziert | Erforderlich |
| 7 | BUCK-Induktivität nahe am Chip platziert | <span class="flag-red">Optional</span> |
| 8 | BUCK-Entkopplungskondensator so nah wie möglich am Chip-Pin platziert | Erforderlich |
| 9 | VDD_HPSYS-Kondensator nahe am Pin platziert | Erforderlich |
| 10 | VDD_LPSYS-Kondensator nahe am Pin platziert | Erforderlich |
| 11 | VDD_RET-Kondensator nahe am Pin platziert | Erforderlich |
| 12 | VDD_RTC-Kondensator nahe am Pin platziert | Erforderlich |
| 13 | AVDD_BRF-Kondensator nahe am Pin platziert | Erforderlich |
| 14 | AVDD<span class="flag-red">33</span>_AUD-Kondensator nahe am Pin platziert | Erforderlich |

</div>

### 6.15.4. Takt { #6154-clock }

<div align="center"><em>Tabelle 6.15.4-1: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Quarz nahe am Chip platziert | Erforderlich |
| 2 | Der Quarz ist rundum mit einer GND-Abschirmung versehen | Erforderlich |
| 3 | Kupferbehandlung am Quarz für den gewählten Lagenaufbau mit SiFli bestätigt; siehe den obigen Hinweis zu den Quellenabweichungen | Erforderlich |
| 4 | Der Abstand von der Kante jeder Quarzleiterbahn zur angrenzenden GND-Kupferfläche ist größer als das 1,5-Fache der Leiterbahnbreite | Erforderlich |
| 5 | Abstand zwischen den parallelen XI/XO-Leiterbahnen des 32,768-kHz-Quarzes ≥0,15 mm | Erforderlich |

</div>

### 6.15.5. Tasten { #6155-buttons }

<div align="center"><em>Tabelle 6.15.5-1: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | ESD-Schutzbauteil der Taste nahe an der Taste platziert | Erforderlich |

</div>

### 6.15.6. RF { #6156-rf }

<div align="center"><em>Tabelle 6.15.6-1: Checkliste RF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | RF-Leiterbahn erfüllt die Anforderung an den unsymmetrischen 50-Ω-Wellenwiderstand | Erforderlich |
| 2 | RF-Leiterbahnbreite ≥10 mil | Erforderlich |
| 3 | Mindestens 60 mil Massefläche auf jeder Seite der RF-Leiterbahn, mit ausreichend Masse-Durchkontaktierungen zur Hauptmasse | Erforderlich |
| 4 | Reserviertes π-Antennenanpassnetzwerk nahe der Chipseite platziert | Erforderlich |
| 5 | Durchgehende GND-Fläche unter dem RF-Signal | Erforderlich |
| 6 | Keine Hochgeschwindigkeits-Digitalsignalleiterbahnen kreuzen unter dem RF-Signal | Erforderlich |
| 7 | Keine Stromversorgungsleiterbahnen mit hohem di/dt kreuzen unter dem RF-Signal | Erforderlich |

</div>

### 6.15.7. Audio { #6157-audio }

<div align="center"><em>Tabelle 6.15.7-1: Checkliste Audio</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | ADCP ist dreidimensional durch Masse abgeschirmt | Erforderlich |
| 2 | DACP/DACN sind als differenzielles Paar mit dreidimensionaler Masseabschirmung geführt | Erforderlich |
| 3 | DACP/DACN-Leiterbahnen sind kurz genug, damit die parasitäre Kapazität unter 10 pF bleibt | Erforderlich |
| 4 | Die Versorgungsleiterbahnen für AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD sind durch Masse abgeschirmt und von Signalen mit hohem Strom und starken Störungen fernzuhalten | Erforderlich |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>Tabelle 6.15.8-1: Checkliste ADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Kein Hochgeschwindigkeitssignal verläuft ohne Masseabschirmung parallel zum GPADC-Signal | Erforderlich |

</div>

### 6.15.9. Testpunkte { #6159-test-points }

<div align="center"><em>Tabelle 6.15.9-1: Checkliste Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Testpunktpositionen eignen sich für Messungen mit einer Prüfspitze oder für das Anlöten eines Prüfadapters | Erforderlich |
| 2 | Die Testpunkte für den Programmdownload (VBAT, GND, PA18/DBG_UART_RXD, PA19/DBG_UART_TXD, LDO2_OUT, PA0, PA1, PA34 usw.) erfüllen die Größen- und Positionsanforderungen der Testvorrichtung | Erforderlich |

</div>

### 6.15.10. Masse { #61510-ground }

<div align="center"><em>Tabelle 6.15.10-1: Checkliste Masse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | An den Hauptchip angrenzende Lagen bilden eine vollständige Hauptmassefläche mit ausreichend Masse-Vias | Erforderlich |
| 2 | Exposed Pad (EPAD) ist über Vias mit der Hauptmasse verbunden | Erforderlich |
| 3 | Bereich unter dem Chip verfügt über ausreichend Masse-Vias, die mit der Hauptmassefläche verbunden sind | Erforderlich |
| 4 | <span class="flag-red">Ein Ring aus Masse-Vias verläuft um den Platinenrand</span> | Erforderlich |

</div>
