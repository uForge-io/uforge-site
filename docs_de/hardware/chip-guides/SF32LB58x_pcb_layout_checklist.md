---
icon: lucide/list-checks
hide:
    - navigation
description: "Detaillierte Checkliste für das PCB-Layout des SF32LB58x mit Prüfpunkten zu Gehäuse, Stromversorgung, Takt, RF, Audio, Hochgeschwindigkeitssignalen und Lagenaufbau."
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB58x Hardware-Design-Leitfaden — PCB-Layout-Checkliste { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "Teil des Hardware-Design-Leitfadens für SF32LB58x"
    Diese Seite enthält die Checkliste aus Abschnitt 6.18 für die Prüfung des PCB-Layouts. Zurück zu den [PCB-Layout-Richtlinien](SF32LB58x_pcb_layout.md).

## 6.18. PCB-Layout-Checkliste { #618-pcb-layout-checklist }

Jede Tabelle behandelt einen eigenen Prüfbereich des PCB-Layouts. Fehlt die Spalte „Gilt für“, gelten die Prüfpunkte für alle SF32LB58x-PCB-Designs im Umfang dieser Checkliste.

### 6.18.1. Gehäuse { #6181-package }

<div align="center"><em>Tabelle 6.18.1-1: Gehäuse-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Der Leiterplatten-Footprint entspricht der Gehäusespezifikation | Erforderlich |

</div>

### 6.18.2. Stromversorgung { #6182-power-supply }

<div align="center"><em>Tabelle 6.18.2-1: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Leiterbahnbreite der VDD1-Versorgung: mindestens 8 mil | Erforderlich |
| 2 | Leiterbahnbreite der VDD2-Versorgung: mindestens 8 mil | Erforderlich |
| 3 | Leiterbahnbreite von BUCK1_VSW und BUCK1_VOUT: jeweils mindestens 8 mil | Erforderlich |
| 4 | Leiterbahnbreite von BUCK2_VSW und BUCK2_VOUT: jeweils mindestens 8 mil | Erforderlich |
| 5 | Leiterbahnbreite der VDDIOA-Versorgung: mindestens 10 mil | Erforderlich |
| 6 | Leiterbahnbreite der VDDIOA2-Versorgung: mindestens 10 mil | Erforderlich |
| 7 | Leiterbahnbreite der VDDIOB-Versorgung: mindestens 10 mil | Erforderlich |
| 8 | Leiterbahnbreite der VDDIOSA-Versorgung: mindestens 6 mil | Erforderlich |
| 9 | Leiterbahnbreite der VDDIOSB-Versorgung: mindestens 6 mil | Erforderlich |
| 10 | Leiterbahnbreite der VDDIOSC-Versorgung: mindestens 6 mil | Erforderlich |
| 11 | Leiterbahnbreite der AVDD33_USB-Versorgung: mindestens 6 mil | Erforderlich |
| 12 | Leiterbahnbreite der AVDD33_ANA-Versorgung: mindestens 6 mil | Erforderlich |
| 13 | Leiterbahnbreite der AVDD_BRF-Versorgung: mindestens 8 mil | Erforderlich |
| 14 | Leiterbahnbreite der AVDD33_AUD-Versorgung: mindestens 6 mil | Erforderlich |
| 15 | Leiterbahnbreite der AVDD33_DSI-Versorgung: mindestens 8 mil | Erforderlich |

</div>

### 6.18.3. Platzierung von Kondensatoren und Induktivitäten der Stromversorgung { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabelle 6.18.3-1: Checkliste zur Platzierung von Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Kondensator für VDD1 nahe am Pin platziert | Erforderlich |
| 2 | Kondensator für VDD2 nahe am Pin platziert | Erforderlich |
| 3 | BUCK1-Induktivität nahe am Chip platziert | Erforderlich |
| 4 | BUCK1-Kondensator so nahe wie möglich am Chip-Pin platziert | Erforderlich |
| 5 | BUCK2-Induktivität nahe am Chip platziert | Erforderlich |
| 6 | BUCK2-Kondensator so nahe wie möglich am Chip-Pin platziert | Erforderlich |
| 7 | Kondensator für HPSYS_LDO_VOUT nahe am Pin platziert | Erforderlich |
| 8 | Kondensator für LPMU_VDD07_RET nahe am Pin platziert | Erforderlich |
| 9 | Kondensator für LPMU_VDD11_RTC nahe am Pin platziert | Erforderlich |
| 10 | Kondensator für VDDIOA nahe am Pin platziert | Erforderlich |
| 11 | Kondensator für VDDIOA2 nahe am Pin platziert | Erforderlich |
| 12 | Kondensator für VDDIOB nahe am Pin platziert | Erforderlich |
| 13 | Kondensator für VDDIOSA nahe am Pin platziert | Erforderlich |
| 14 | Kondensator für VDDIOSB nahe am Pin platziert | Erforderlich |
| 15 | Kondensator für VDDIOSC nahe am Pin platziert | Erforderlich |
| 16 | Kondensator für AVDD33_USB nahe am Pin platziert | Erforderlich |
| 17 | Kondensator für AVDD33_ANA nahe am Pin platziert | Erforderlich |
| 18 | Kondensator für AVDD_BRF nahe am Pin platziert | Erforderlich |
| 19 | Kondensator für AVDD33_AUD nahe am Pin platziert | Erforderlich |
| 20 | Kondensator für AVDD33_DSI nahe am Pin platziert | Erforderlich |

</div>

### 6.18.4. Takt { #6184-clock }

<div align="center"><em>Tabelle 6.18.4-1: Takt-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Quarz nah am Chip platziert | Erforderlich |
| 2 | GND-Abschirmung um den Quarz angewendet | Erforderlich |
| 3 | Unter dem Quarz muss eine kupferfreie Zone vorgesehen werden. Bei einer 4-Lagen-Platine muss sie mindestens die Lagen 1 (Oberseite), 2 und 3 umfassen | Erforderlich |
| 4 | Abstand der Quarz-Leiterbahn zum GND-Schutzkupfer ist größer als das 3-fache der Leiterbahnbreite | Erforderlich |

</div>

!!! warning "Lagen der kupferfreien Zone unter dem Quarz mit SiFli abstimmen"
    Die Checklisten-Arbeitsmappe fordert bei einer vierlagigen Leiterplatte kupferfreie Zonen auf den Lagen 1, 2 und 3. Der [PCB-Layout-Leitfaden](SF32LB58x_pcb_layout.md#65-clock-interface-routing) nennt für den jeweiligen Quarzbereich die Oberseite und die direkt darunterliegende Lage. Die Quellen unterscheiden sich darin, ob Lage 3 einzubeziehen ist; legen Sie die endgültige Anforderung nicht ohne Bestätigung durch SiFli fest.

### 6.18.5. Tasten { #6185-buttons }

<div align="center"><em>Tabelle 6.18.5-1: Tasten-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | ESD-Schutzbauteil der Taste nah an der Taste platziert | Erforderlich |

</div>

### 6.18.6. RF { #6186-rf }

<div align="center"><em>Tabelle 6.18.6-1: RF-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die RF-Leiterbahn ist für eine einseitige Impedanz von 50 Ω ausgelegt | Erforderlich |
| 2 | RF-Leiterbahnbreite ≥10 mil | Erforderlich |
| 3 | Für ein π-förmiges Antennenanpassnetzwerk ist nahe am Chip ein Footprint reserviert | Erforderlich |
| 4 | Durchgehende GND-Ebene unterhalb des RF-Signals | Erforderlich |
| 5 | Keine digitalen Hochgeschwindigkeitssignal-Leiterbahnen kreuzen unterhalb des RF-Signals | Erforderlich |
| 6 | Unterhalb des RF-Signals verlaufen keine Versorgungsleiterbahnen mit hohem di/dt | Erforderlich |

</div>

### 6.18.7. Audio { #6187-audio }

<div align="center"><em>Tabelle 6.18.7-1: Audio-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die parallelen Leiterbahnen AU_ADC1P und AU_ADC1N werden durch Masseleiterbahnen abgeschirmt | Erforderlich |
| 2 | Die parallelen Leiterbahnen AU_ADC2P und AU_ADC2N werden durch Masseleiterbahnen abgeschirmt | Erforderlich |
| 3 | Die parallelen Leiterbahnen AU_DAC1P und AU_DAC1N werden durch Masseleiterbahnen abgeschirmt | Erforderlich |
| 4 | Die parallelen Leiterbahnen AU_DAC2P und AU_DAC2N werden durch Masseleiterbahnen abgeschirmt | Erforderlich |
| 5 | Die Leiterbahnkapazität von AU_DAC1P, AU_DAC1N, AU_DAC2P und AU_DAC2N beträgt &lt; 10 pF; die Leiterbahnlänge beträgt &lt; 2 cm | Erforderlich |

</div>

!!! warning "Widersprüchliche Grenzwerte für die DAC-Leiterbahnlänge"
    Diese Arbeitsmappe nennt für DAC-Leiterbahnen eine Länge unter 2 cm (20 mm); der [PCB-Layout-Leitfaden](SF32LB58x_pcb_layout.md#67-audio-interface-routing) nennt dagegen unter 2 mm. Die Grenzwerte unterscheiden sich um den Faktor zehn. Wählen Sie keinen Grenzwert ohne Bestätigung durch SiFli.

### 6.18.8. Hochgeschwindigkeitssignale { #6188-high-speed-signals }

<div align="center"><em>Tabelle 6.18.8-1: Checkliste Hochgeschwindigkeitssignale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | DSI-Differenzsignale erfüllen die Anforderung an die 100-Ω-Differenzimpedanz | Erforderlich |
| 2 | DSI-Datendifferenzpaare sind innerhalb von 200 mil längenangepasst zum Takt-Differenzpaar | Erforderlich |
| 3 | DSI-Signale werden so weit wie möglich auf derselben Lage geführt | Erforderlich |

</div>

!!! warning "Widersprüchliche DSI-Grenzwerte zwischen Differenzpaaren"
    Diese Arbeitsmappe fordert, dass die DSI-Datendifferenzpaare innerhalb von 200 mil (5,08 mm) auf das Takt-Differenzpaar längenangepasst sind. Der [PCB-Layout-Leitfaden](SF32LB58x_pcb_layout.md#610-dsi-interface-routing) begrenzt den Längenversatz zwischen Paaren auf ≤2 mm und innerhalb eines Paars auf ≤0,5 mm. Klären Sie vor Abschluss des Layouts mit SiFli, welcher Grenzwert zwischen Paaren gilt.

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>Tabelle 6.18.9-1: ADC-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Schnell schaltende Signale nicht parallel zum GPADC-Signal führen; ist das nicht vermeidbar, eine geeignete Masseabschirmung vorsehen | Erforderlich |
| 2 | Akkuspannungsteiler-Widerstände sind nah am Chip-Eingangspin platziert | Erforderlich |
| 3 | Schnell schaltende Signale nicht parallel zum SDMADC-Signal führen; ist das nicht vermeidbar, eine geeignete Masseabschirmung vorsehen | Optional |

</div>

### 6.18.10. Testpunkte { #61810-test-points }

<div align="center"><em>Tabelle 6.18.10-1: Checkliste Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Testpunkte sind so positioniert, dass Prüfspitzen oder Lötverbindungen zum Prüfadapter sicher angesetzt werden können | Erforderlich |
| 2 | Die Testpunkte für Firmware-Download und Quarzkalibrierung (VBAT, GND, SWDIO, SWCLK, VDDIOB, MODE, RESET, UART4_TXD, UART4_RXD usw.) erfüllen die Größen- und Positionsvorgaben des Prüfadapters | Erforderlich |

</div>

### 6.18.11. Leiterplatten-Lagenaufbau { #61811-pcb-stack-up }

<div align="center"><em>Tabelle 6.18.11-1: Checkliste zum Leiterplatten-Lagenaufbau</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die dem Hauptchip benachbarte Lage muss eine durchgehende Hauptmasseebene sein | Erforderlich |

</div>
