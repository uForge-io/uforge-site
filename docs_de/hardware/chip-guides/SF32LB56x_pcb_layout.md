---
icon: lucide/layers
description: "PCB-Layout-Richtlinien für den SF32LB56x-MCU: Footprint, Lagenaufbau, kritisches Routing und eine detaillierte PCB-Layout-Checkliste."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB56x Hardware-Design-Leitfaden — PCB-Layout-Richtlinien { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "Teil des SF32LB56x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 6, PCB-Layout-Richtlinien. Zurück zu den [Schaltplanrichtlinien](SF32LB56x_schematic_design.md) oder weiter zur [Checkliste zur Designprüfung und Referenzen](SF32LB56x_review_and_reference.md).

## 6. PCB-Layout-Richtlinien { #6-pcb-layout-guidelines }

### 6.1. Footprint und Lagenaufbau { #61-footprint-and-stack-up }

Die U-Variante verwendet ein 68-poliges QFN68L-Gehäuse mit 7 × 7 × 0,75 mm und 0,35 mm Pinabstand. QFN unterstützt PTH; SiFli empfiehlt einen vierlagigen PTH-Aufbau, bei dem alle Pins auf der Oberseite aufgefächert werden. Die V-Variante verwendet ein WBBGA-Gehäuse mit 175 Kugeln, 6,5 × 6,1 × 0,94 mm, 0,4 mm Kugelabstand und 0,25 mm Kugeldurchmesser. PTH wird nicht unterstützt; erforderlich ist HDI. Die beiden äußersten Kugelreihen werden auf der Oberseite aufgefächert, die übrigen Kugeln auf Innenlagen. Vor der Layout-Freigabe ist zu bestätigen, dass der PCB-Hersteller den gewählten Lagenaufbau, Lötstopplack und Fanout unterstützt.

### 6.2. Kritisches Routing { #62-critical-routing }

#### 6.2.1. Taktführung { #621-clock-routing }

Quarze innerhalb des Abschirmblechs platzieren, mehr als 1 mm vom Platinenrand und möglichst mindestens 5 mm von Wärmequellen wie PA, Ladegerät und PMU entfernt. Im Umkreis von mindestens 0,25 mm um den Quarzoszillator dürfen sich keine anderen Metallteile oder Bauteile befinden. Den 48-MHz-Quarz möglichst auf der Oberseite führen, 3–10 mm lang und 0,075 mm breit, mit dreidimensionaler Masseabschirmung. Abstand zu VBAT, DC-DC und Hochgeschwindigkeitssignalen halten. Den 32,768-kHz-Quarz auf der Oberseite führen, höchstens 10 mm lang und 0,075 mm breit; der Abstand zwischen 32K_XI und 32K_XO muss mindestens 0,15 mm betragen. Oberseite und benachbarte Lage unter beiden Quarzbereichen freihalten; keine anderen Leiterbahnen dürfen diese Bereiche kreuzen.

#### 6.2.2. HF-Routing { #622-rf-routing }

HF als einseitige, impedanzkontrollierte 50-Ω-Leiterbahn ausführen, vorzugsweise breiter als 10 mil und, wo praktikabel, auf der Oberseite; Vias und scharfe Ecken vermeiden. Das Anpassnetzwerk nahe am Chip und nicht an der Antenne platzieren. Den AVDD_BRF-Filterkondensator nahe am Chip-Pin anordnen und seine Masse über ein Via direkt mit der Hauptmasse verbinden. Beidseitig der HF-Leiterbahn eine durchgehende Masseabschirmung mit Stitching-Vias vorsehen. Keine Hoch-di/dt-Versorgung, schnellen Takte oder I2C-, SPI-, SDIO-, I2S- und UART-Signale im HF-Bereich oder darunter führen. AVSS_RF1/2/3 der U-Variante sowie AVSS_RRF, AVSS_TRF, AVSS_TRF2 und AVSS_BB der V-Variante zuverlässig mit der Hauptmasse verbinden.

#### 6.2.3. Versorgung und Masse { #623-power-and-ground }

BUCK-Induktivität und Filterkondensatoren nahe an den Chip-Pins platzieren. BUCK_LX kurz und breit führen; BUCK_FB muss mindestens 0,25 mm breit sein. Unter der Induktivität auf der Oberseite kein Kupfer vorsehen, auf der benachbarten Lage eine durchgehende Massefläche sicherstellen und keine anderen Leiterbahnen durch den Induktivitätsbereich führen. Massen der BUCK-Ausgangskondensatoren mit mehreren Vias an die Hauptmasse anschließen. Den PVDD-Kondensator nahe am Pin platzieren und PVDD kurz und breit führen; PVSS über Vias mit der Hauptmasse verbinden. LDO- und I/O-Abblockkondensatoren nahe an den jeweiligen Pins platzieren und die Versorgungsleiterbahnen nach Laststrom dimensionieren.

!!! warning "Widersprüchliche Vorgaben zur PVDD-Leiterbahnbreite"
    Der SF32LB56xU/V-Hardwareleitfaden fordert für PVDD mindestens 0,5 mm Leiterbahnbreite; die zugehörige PCB-Checkliste nennt dagegen 8 mil. Die Angaben weichen voneinander ab. Vor dem Layout-Freeze ist mit SiFli oder der PCB-Designverantwortung zu klären, welche Vorgabe gilt.

#### 6.2.4. Audio- und Analogsignale { #624-audio-and-analog-signals }

AVDD33_ANA und AVDD33_AUD getrennt sternförmig führen, mit Masse abschirmen und von stark stromführenden Störquellen fernhalten. Filterkondensatoren für AVDD33_AUD, MIC_BIAS und AUD_VREF nahe an den jeweiligen Pins platzieren und ihre Masse direkt an die Hauptmasse anschließen. ADCP/ADCN als kurzes, abgeschirmtes Differenzpaar führen und die zugehörigen Bauteile nahe am Chip platzieren. DACP/DACN ebenfalls als Differenzpaar führen, mit parasitärer Kapazität unter 10 pF und Leiterbahnlänge unter 2 cm; starke Störquellen meiden. GPADC-Leiterbahnen mit Masse abschirmen und von Störquellen wie Batterie- und Temperaturmessung fernhalten.

#### 6.2.5. USB und SDIO { #625-usb-and-sdio }

USB D+/D− (PA17/PA18) als abgeschirmtes Differenzpaar mit 90 Ω führen. ESD-Bauteile nahe am Steckverbinder platzieren und die Signale vor dem Chip zuerst durch sie führen; vor dem Schutzbauteil keine Signalabzweigung vorsehen. Die Masse des Bauteils über kurze, breite Leiterbahnen und Vias an die Hauptmasse anschließen. Die U-Variante besitzt eine SDIO-Schnittstelle, die V-Variante SDIO1 und SDIO2. SDIO-Signale gruppiert führen, Gesamtlänge höchstens 50 mm und Längenabweichung innerhalb der Gruppe höchstens 6 mm. Den Takt mit Masse abschirmen und auch DATA und CMD mit Masse schützen.

#### 6.2.6. EMI, ESD und Testpunkte { #626-emi-esd-and-test-points }

Lange Oberseiten-Leiterbahnen außerhalb des Abschirmblechs für störende Takt- und Versorgungssignale vermeiden; wenn möglich Innenlagen verwenden. TVS-/ESD-Bauteile nahe am jeweiligen Steckverbinder platzieren. Jedes Signal muss zuerst durch das Schutzbauteil geführt werden; dessen Massepad mit kurzen, breiten Leiterbahnen und Vias an die Hauptmasse anschließen. Den Testpunkt des USB-Ladekabels vor dessen TVS und die TVS am Batterieanschluss vor der Batterieplattform platzieren, sodass externe Leitungen vor dem Chip durch die TVS geführt werden. Das Masse-Netz unter dem Chip ausreichend anbinden und über Blind-/Buried-Vias mit der Hauptmassefläche verbinden.

### 6.3. PCB-Layout-Checkliste { #63-pcb-layout-checklist }

Die folgenden Tabellen decken jeweils einen Prüfbereich des PCB-Layouts ab. Ist keine Spalte „Gilt für“ vorhanden, gilt die Zeile für alle in der Arbeitsmappe erfassten Varianten.

#### 6.3.1. Gehäuse { #631-package }

<div align="center"><em>Tabelle 6.3-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Das Footprint entspricht der Gehäusespezifikation | Erforderlich |

</div>

#### 6.3.2. Stromversorgung { #632-power-supply }

<div align="center"><em>Tabelle 6.3-2: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PVDD-Versorgungsleiterbahn ist mindestens 8 mil breit | Erforderlich |
| 2 | Die Leiterbahnen zu BUCK_LX und BUCK_FB sind jeweils mindestens 8 mil breit | Erforderlich |
| 3 | VDDIO1-Versorgungsleiterbahn ist mindestens 5 mil breit | Erforderlich |
| 4 | VDDIO2-Versorgungsleiterbahn ist mindestens 8 mil breit | Erforderlich |
| 5 | VDDIO3-Versorgungsleiterbahn ist mindestens 5 mil breit | Erforderlich |
| 6 | VDDIO4-Versorgungsleiterbahn ist mindestens 6 mil breit | Erforderlich |
| 7 | VDDIOSC-Versorgungsleiterbahn ist mindestens 6 mil breit | Erforderlich |
| 8 | AVDD33_ANA-Versorgungsleiterbahn ist mindestens 6 mil breit | Erforderlich |
| 9 | AVDD33_AUD-Versorgungsleiterbahn ist mindestens 5 mil breit | Erforderlich |

</div>

#### 6.3.3. Platzierung von Kondensatoren und Induktivitäten der Stromversorgung { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabelle 6.3-3: Checkliste Platzierung von Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PVDD-Kondensator ist nahe am Pin platziert | Erforderlich |
| 2 | BUCK-Induktivität nahe am Chip platziert | Erforderlich |
| 3 | BUCK-Entkopplungskondensator so nah wie möglich am Chip-Pin platziert | Erforderlich |
| 4 | LDO1_VOUT-Kondensator ist nahe am Pin platziert | Erforderlich |
| 5 | LDO2_VOUT-Kondensator ist nahe am Pin platziert | Erforderlich |
| 6 | VDD_RET-Kondensator nahe am Pin platziert | Erforderlich |
| 7 | VDD_RTC-Kondensator nahe am Pin platziert | Erforderlich |
| 8 | VDDIO1-Kondensator ist nahe am Pin platziert | Erforderlich |
| 9 | VDDIO2-Kondensator ist nahe am Pin platziert | Erforderlich |
| 10 | VDDIO3-Kondensator ist nahe am Pin platziert | Erforderlich |
| 11 | VDDIO4-Kondensator ist nahe am Pin platziert | Erforderlich |
| 12 | AVDD33_ANA-Kondensator ist nahe am Pin platziert | Erforderlich |
| 13 | AVDD33_AUD-Kondensator nahe am Pin platziert | Erforderlich |

</div>

#### 6.3.4. Takt { #634-clock }

<div align="center"><em>Tabelle 6.3-4: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Der Quarz ist nahe am Chip platziert | Erforderlich |
| 2 | Der Quarz ist von einer GND-Abschirmung umgeben | Erforderlich |
| 3 | Unter dem Quarz ist eine kupferfreie Zone vorgesehen (4-Lagen-PTH-Platine: obere Lage; 6-Lagen-HDI-Platine: obere Lage und Lage 2) | Erforderlich |
| 4 | Der Abstand zwischen GND-Kupferfüllung und Quarzleiterbahnen ist größer als das 1,5-Fache der Leiterbahnbreite | Erforderlich |
| 5 | Der Abstand des parallelen Leiterbahnpaares des 32-kHz-Quarzes ist größer als das 2-Fache des Leiterbahnabstands | Erforderlich |

</div>

#### 6.3.5. Tasten { #635-buttons }

<div align="center"><em>Tabelle 6.3-5: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | ESD-Schutzbauteil der Taste nahe an der Taste platziert | Erforderlich |

</div>

#### 6.3.6. HF { #636-rf }

<div align="center"><em>Tabelle 6.3-6: Checkliste HF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die HF-Leiterbahn muss eine einseitige charakteristische Impedanz von 50 Ω aufweisen | Erforderlich |
| 2 | HF-Leiterbahnbreite ≥10 mil | Erforderlich |
| 3 | Auf jeder Seite der HF-Leiterbahn mindestens 60 mil Massekupfer vorsehen und mit ausreichend Massevias an die Hauptmassefläche anbinden | Erforderlich |
| 4 | Das vorgesehene π-Antennenanpassungsnetzwerk nahe am Chip platzieren | Erforderlich |
| 5 | Durchgehende GND-Fläche unter dem HF-Signal | Erforderlich |
| 6 | Keine Leiterbahnen für digitale Hochgeschwindigkeitssignale unter der HF-Leiterbahn führen | Erforderlich |
| 7 | Keine Versorgungsleiterbahnen mit hohem di/dt unter der HF-Leiterbahn führen | Erforderlich |
| 8 | AVSS_RF1, AVSS_RF2 und AVSS_RF3 sind durch verstärkte Masseanbindung mit der Hauptmassefläche verbunden | Erforderlich |

</div>

#### 6.3.7. Audio { #637-audio }

<div align="center"><em>Tabelle 6.3-7: Checkliste Audio</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN sind als Differenzleiterbahnen mit Masseabschirmung geroutet | Erforderlich |
| 2 | AU_DACP/AU_DACN sind als Differenzleiterbahnen mit Masseabschirmung geroutet | Erforderlich |
| 3 | AU_DACP/AU_DACN-Leiterbahnen sind kurz genug, dass die parasitäre Kapazität unter 10 pF liegt | Erforderlich |
| 4 | Die Versorgungsleiterbahnen von AVDD33_ANA und AVDD33_AUD verwenden Masseabschirmung, halten sich von hochstromigen Störsignalen fern, nutzen Sternverdrahtung, und jede Leiterbahn ist mindestens 5 mm lang | Erforderlich |
| 5 | AVSS ist über Vias mit der Hauptmassefläche verbunden | Erforderlich |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>Tabelle 6.3-8: Checkliste ADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Kein High-Speed-Signal verläuft ohne Masseabschirmung parallel zum GPADC-Signal | Erforderlich |
| 2 | Spannungsteilerwiderstände für die Batteriespannung sind nahe am Chip-Eingangspin platziert | Erforderlich |

</div>

#### 6.3.9. Testpunkte { #639-test-points }

<div align="center"><em>Tabelle 6.3-9: Checkliste Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Testpunktpositionen eignen sich für Messspitzen oder zum Löten in einer Prüfvorrichtung | Erforderlich |
| 2 | Download- und Quarzkalibrierungs-Testpunkte umfassen VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD und einen der Pins PB20/PB21/PB25; zusätzlich VDDIO2 und VDDIO3 oder VDDIO4 bei U beziehungsweise VDDIOA und VDDIOB bei V, und erfüllen die Größen- und Positionsanforderungen der Prüfvorrichtung | Erforderlich |

</div>

#### 6.3.10. Masse { #6310-ground }

<div align="center"><em>Tabelle 6.3-10: Checkliste Masse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Lagen neben dem Hauptchip bilden eine vollständige Hauptmassefläche mit ausreichend Massevias | Erforderlich |
| 2 | PVSS ist über Vias mit der Hauptmasse verbunden | Erforderlich |
| 3 | Der Bereich unter dem Chip verfügt über ausreichend Massevias, die mit der Hauptmassefläche verbunden sind | Erforderlich |
| 4 | Ein Ring aus Massevias verläuft um den Platinenrand | Erforderlich |

</div>
