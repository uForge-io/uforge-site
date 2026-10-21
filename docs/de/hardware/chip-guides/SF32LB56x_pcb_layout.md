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

Die U-Variante verwendet ein 68-poliges QFN68L-Gehäuse mit 7 × 7 × 0,75 mm und 0,35 mm Pinabstand. QFN unterstützt PTH. SiFli empfiehlt einen vierlagigen PTH-Aufbau, bei dem alle Pins auf der Oberseite aufgefächert werden. Die V-Variante verwendet ein WBBGA-Gehäuse mit 175 Kugeln, 6,5 × 6,1 × 0,94 mm, 0,4 mm Kugelabstand und 0,25 mm Kugeldurchmesser. PTH wird nicht unterstützt; erforderlich ist HDI. Fächern Sie die beiden äußersten Kugelreihen auf der Oberseite und die übrigen Kugeln auf Innenlagen auf. Bestätigen Sie vor der Layout-Freigabe, dass der PCB-Hersteller den gewählten Lagenaufbau, Lötstopplack und Fanout unterstützt.

### 6.2. Kritisches Routing { #62-critical-routing }

#### 6.2.1. Taktführung { #621-clock-routing }

Platzieren Sie die Quarze innerhalb des Abschirmblechs, mit mehr als 1 mm Abstand zum Platinenrand und möglichst mindestens 5 mm Abstand zu wärmeerzeugenden Bauteilen wie PA, Ladegerät und PMU. Halten Sie zu anderen Metallteilen und Bauteilen mindestens 0,25 mm Abstand zum Quarzschwingkreis. Führen Sie den 48-MHz-Quarz nach Möglichkeit auf der Oberseite. Die Leiterbahnen sollen 3–10 mm lang und 0,075 mm breit sein und eine dreidimensionale Masseabschirmung erhalten. Halten Sie Abstand zu VBAT, DC-DC und Hochgeschwindigkeitssignalen. Führen Sie den 32,768-kHz-Quarz auf der Oberseite; seine Leiterbahnen dürfen höchstens 10 mm lang und sollen 0,075 mm breit sein. Der Abstand zwischen 32K_XI und 32K_XO muss mindestens 0,15 mm betragen. Halten Sie die Oberseite und die benachbarte Lage unter beiden Quarzbereichen frei; keine anderen Leiterbahnen dürfen diese Bereiche kreuzen.

#### 6.2.2. RF-Routing { #622-rf-routing }

Führen Sie die RF-Leiterbahn als unsymmetrische, impedanzkontrollierte Leitung mit 50 Ω, vorzugsweise breiter als 10 mil und, sofern praktikabel, auf der Oberseite. Vermeiden Sie Vias und scharfe Ecken. Platzieren Sie das Anpassnetzwerk nahe am Chip, nicht an der Antenne. Setzen Sie den AVDD_BRF-Filterkondensator nahe am Chip-Pin und verbinden Sie seine Masse über ein Via direkt mit der Hauptmasse. Sorgen Sie beidseitig der RF-Leiterbahn für eine durchgehende Masseabschirmung mit Stitching-Vias. Führen Sie weder Versorgungsleitungen mit hohem di/dt noch schnelle Takte noch I2C-, SPI-, SDIO-, I2S- und UART-Signale im RF-Bereich oder darunter. Verbinden Sie AVSS_RF1/2/3 der U-Variante sowie AVSS_RRF, AVSS_TRF, AVSS_TRF2 und AVSS_BB der V-Variante zuverlässig mit der Hauptmasse.

#### 6.2.3. Versorgung und Masse { #623-power-and-ground }

Platzieren Sie BUCK-Induktivität und Filterkondensatoren nahe an den Chip-Pins. Führen Sie BUCK_LX kurz und breit; BUCK_FB muss mindestens 0,25 mm breit sein. Sehen Sie auf der Oberseite unter der Induktivität kein Kupfer vor. Sorgen Sie auf der benachbarten Lage für eine durchgehende Massefläche und führen Sie keine anderen Leiterbahnen durch den Induktivitätsbereich. Verbinden Sie die Massen der BUCK-Ausgangskondensatoren mit mehreren Vias mit der Hauptmasse. Platzieren Sie den PVDD-Kondensator nahe am Pin und führen Sie PVDD kurz und breit. Verbinden Sie PVSS über Vias mit der Hauptmasse. Platzieren Sie die LDO- und I/O-Abblockkondensatoren nahe an den jeweiligen Pins und dimensionieren Sie die Versorgungsleiterbahnen nach dem Laststrom.

!!! warning "Widersprüchliche Vorgaben zur PVDD-Leiterbahnbreite"
    Der SF32LB56xU/V-Hardwareleitfaden fordert für PVDD mindestens 0,5 mm Leiterbahnbreite; die zugehörige PCB-Checkliste nennt dagegen 8 mil. Die Angaben weichen voneinander ab. Vor dem Layout-Freeze ist mit SiFli oder der PCB-Designverantwortung zu klären, welche Vorgabe gilt.

#### 6.2.4. Audio- und Analogsignale { #624-audio-and-analog-signals }

Führen Sie AVDD33_ANA und AVDD33_AUD getrennt und sternförmig, schirmen Sie die Leiterbahnen mit Masse ab und halten Sie sie von stark stromführenden Störquellen fern. Platzieren Sie die Filterkondensatoren für AVDD33_AUD, MIC_BIAS und AUD_VREF nahe an den jeweiligen Pins und verbinden Sie ihre Masse direkt mit der Hauptmasse. Führen Sie ADCP/ADCN als kurzes, abgeschirmtes Differenzpaar und platzieren Sie die zugehörigen Bauteile nahe am Chip. Führen Sie DACP/DACN ebenfalls als Differenzpaar; die parasitäre Kapazität muss unter 10 pF und die Leiterbahnlänge unter 2 cm liegen. Halten Sie die Leitungen von starken Störquellen fern. Schirmen Sie GPADC-Leiterbahnen mit Masse ab und halten Sie sie von Störquellen der Akku- und Temperaturmessung fern.

#### 6.2.5. USB und SDIO { #625-usb-and-sdio }

Führen Sie USB D+/D− (PA17/PA18) als abgeschirmtes Differenzpaar mit 90 Ω. Platzieren Sie die ESD-Bauteile nahe am Steckverbinder und führen Sie die Signale auf dem Weg zum Chip zuerst durch diese Bauteile. Verzweigen Sie die Signale nicht vor dem Schutzbauteil. Verbinden Sie die Gerätemasse über kurze, breite Leiterbahnen und Vias mit der Hauptmasse. Die U-Variante besitzt eine SDIO-Schnittstelle, die V-Variante SDIO1 und SDIO2. Führen Sie die SDIO-Signale als Gruppe; die Gesamtlänge darf höchstens 50 mm und der Längenunterschied innerhalb der Gruppe höchstens 6 mm betragen. Schirmen Sie den Takt mit Masse ab und schützen Sie auch DATA und CMD mit Masse.

#### 6.2.6. EMI, ESD und Testpunkte { #626-emi-esd-and-test-points }

Vermeiden Sie lange Leiterbahnen auf der Oberseite außerhalb des Abschirmblechs für störende Takt- und Versorgungssignale; verwenden Sie nach Möglichkeit Innenlagen. Platzieren Sie TVS-/ESD-Bauteile nahe am jeweiligen Steckverbinder. Führen Sie jedes Signal zuerst durch das Schutzbauteil und verbinden Sie dessen Massepad über kurze, breite Leiterbahnen und Vias mit der Hauptmasse. Platzieren Sie den Testpunkt des USB-Ladekabels vor der zugehörigen TVS. Setzen Sie die TVS am Akkuanschluss vor der Akkuplattform, sodass externe Leitungen auf dem Weg zum Chip zuerst durch die TVS geführt werden. Binden Sie das Masse-Netz unter dem Chip mit ausreichend vielen Blind-/Buried-Vias an die Hauptmassefläche an.

### 6.3. PCB-Layout-Checkliste { #63-pcb-layout-checklist }

Die folgenden Tabellen decken jeweils einen Prüfbereich des PCB-Layouts ab. Ist keine Spalte „Gilt für“ vorhanden, gilt die Zeile für alle in der Arbeitsmappe erfassten Varianten.

#### 6.3.1. Gehäuse { #631-package }

<div align="center"><em>Tabelle 6.3-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Der Footprint entspricht der Gehäusespezifikation | Erforderlich |

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

#### 6.3.6. RF { #636-rf }

<div align="center"><em>Tabelle 6.3-6: Checkliste RF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die RF-Leiterbahn muss als unsymmetrische Leitung eine charakteristische Impedanz von 50 Ω aufweisen | Erforderlich |
| 2 | RF-Leiterbahnbreite ≥10 mil | Erforderlich |
| 3 | Auf jeder Seite der RF-Leiterbahn mindestens 60 mil Massekupfer vorsehen und mit ausreichend Massevias an die Hauptmassefläche anbinden | Erforderlich |
| 4 | Das vorgesehene π-Antennenanpassungsnetzwerk nahe am Chip platzieren | Erforderlich |
| 5 | Durchgehende GND-Fläche unter dem RF-Signal | Erforderlich |
| 6 | Keine Leiterbahnen für digitale Hochgeschwindigkeitssignale unter der RF-Leiterbahn führen | Erforderlich |
| 7 | Keine Versorgungsleiterbahnen mit hohem di/dt unter der RF-Leiterbahn führen | Erforderlich |
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
| 2 | Spannungsteilerwiderstände für die Akkuspannung sind nahe am Chip-Eingangspin platziert | Erforderlich |

</div>

#### 6.3.9. Testpunkte { #639-test-points }

<div align="center"><em>Tabelle 6.3-9: Checkliste Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Testpunktpositionen eignen sich für Messspitzen oder zum Löten in einer Prüfvorrichtung | Erforderlich |
| 2 | Die Testpunkte für Download und Quarzkalibrierung umfassen VBAT, GND, SWDIO, SWCLK, MODE, UART4_TXD, UART4_RXD sowie einen der Pins PB20/PB21/PB25. Bei Variante U müssen außerdem VDDIO2 und VDDIO3 oder VDDIO4, bei Variante V VDDIOA und VDDIOB verfügbar sein. Die Größen- und Positionsanforderungen der Prüfvorrichtung sind einzuhalten. | Erforderlich |

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
