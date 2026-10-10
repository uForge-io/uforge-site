---
icon: lucide/layers
hide:
    - navigation
description: "Richtlinien für das PCB-Layout des SF32LB55x-MCU: Footprint, Leiterplattenaufbau, allgemeine PCB-Regeln, Schnittstellen-Routing und eine detaillierte Layout-Checkliste."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware-Design-Guide — PCB-Layout-Richtlinien { #sf32lb55x-hardware-design-guide-pcb-layout-guidelines }

## 6. PCB-Layout-Richtlinien { #6-pcb-layout-guidelines }

### 6.1. Footprint und Leiterplattenaufbau { #61-footprint-and-stack-up }

Berücksichtigen Sie die Gehäusezeichnung, die Vorgaben für das Pad-Layout und die Bestückbarkeit des gewählten QFN- oder BGA-Gehäuses. Bei BGA-Gehäusen müssen das Ball-Fanout, die Via-Strategie, die Lötstopplack-Regeln und die Fertigungsgrenzen frühzeitig geklärt werden.

#### 6.1.1. Referenz für Lagenaufbau und Fertigung { #611-stack-up-and-fabrication }

SiFli empfiehlt für QFN68L und BGA145 ein konventionelles PTH-Verfahren und eine vierlagige Leiterplatte. Für BGA169 empfiehlt die Referenz einen einstufigen HDI-Aufbau mit Blind-/Buried-Vias. Die dargestellten vier- und sechslagigen Aufbauten haben eine fertige Dicke von 0,7 mm ±10 %. Dies sind Referenzaufbauten, keine allgemeinen Grenzwerte. Stimmen Sie Gehäusezeichnung, fertige Dicke und Fertigungsfähigkeit mit dem Leiterplattenhersteller ab.

<div align="center"><em>Tabelle 6.1-1: Referenz-Lagenaufbau mit vier PTH-Lagen</em></div>

<div align="center" markdown>

| Lage / Material | Angenommener Kupferflächenanteil | Materialtyp | Dk | DF | Theoretische Dicke (mil) | Theoretische Dicke (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Obere Lötstoppmaske | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| L1 Kupfer + Beschichtung | - | Kupfer + Beschichtung | - | - | 0.048 | 0.001219 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| L2 Kupfer | - | Kupfer | - | - | 0.07 | 0.001778 |
| Kern | 70% | In der Quelldarstellung nicht angegeben | 4 | 0.017 | 16.1 | 0.408941 |
| L3 Kupfer | - | Kupfer | - | - | 0.07 | 0.001778 |
| Prepreg | 70% | 2116 | 4.2 | 0.015 | 4.2 | 0.10668 |
| L4 Kupfer + Beschichtung | - | Kupfer + Beschichtung | - | - | 0.048 | 0.001219 |
| Untere Lötstoppmaske | - | - | 3.5 | 0.8 | 1 | 0.0254 |
| Theoretische Gesamtdicke | - | - | - | - | 26.736 | 0.679096 |

</div>

Die Quelldarstellung nennt eine fertige Leiterplattendicke von 0,7 mm ±10 %, einschließlich Beschichtung und Lötstoppmaske. Für die Kupfer-plus-Beschichtung-Dicke von L1/L4 sind 0,048 mil (0,001219 mm) und für die Kupferdicke von L2/L3 0,07 mil (0,001778 mm) angegeben. Diese Werte weichen deutlich von der üblichen Angabe von Leiterplatten-Kupferdicken ab. Sie sind wie abgebildet übernommen, keine Fertigungsvorgaben; lassen Sie sie vor der Verwendung schriftlich von SiFli und dem Leiterplattenhersteller bestätigen.

<div align="center"><em>Tabelle 6.1-2: Referenz-Lagenaufbau mit sechs HDI-Lagen</em></div>

<div align="center" markdown>

| Lage / Material | Angenommener Kupferflächenanteil | Materialtyp | Dk | DF | Theoretische Dicke (mil) | Theoretische Dicke (mm) |
|:---|:---:|:---|:---:|:---:|---:|---:|
| Obere Lötstoppmaske | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| L1 Kupfer + Beschichtung | - | Kupfer + Beschichtung | - | - | 1.2 | 0.03048 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| L2 Kupfer | - | Kupfer | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| L3 Kupfer | - | Kupfer | - | - | 0.7 | 0.01778 |
| Kern | 70% | FR-4 CORE | 4.43 | 0.017 | 4 | 0.1016 |
| L4 Kupfer | - | Kupfer | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 2116 | 4.14 | 0.02 | 4.8 | 0.12192 |
| L5 Kupfer | - | Kupfer | - | - | 0.7 | 0.01778 |
| Prepreg | 70% | 1080 | 4.14 | 0.02 | 2.6 | 0.06604 |
| L6 Kupfer + Beschichtung | - | Kupfer + Beschichtung | - | - | 1.2 | 0.03048 |
| Untere Lötstoppmaske | - | - | 3.5 | 0.8 | 0.4 | 0.01016 |
| Theoretische Gesamtdicke | - | - | - | - | 24.8 | 0.629921 |

</div>

Die Quelldarstellung nennt für die sechslagige HDI-Leiterplatte eine fertige Dicke von 0,7 mm ±10 %, einschließlich Beschichtung und Lötstoppmaske. Lagenaufbau, dielektrische Parameter und theoretische Dicke sind Referenzwerte; lassen Sie sie vor der Serienfertigung anhand der tatsächlichen Materialien, Kupferdicken und Impedanzvorgaben vom Leiterplattenhersteller prüfen.

#### 6.1.2. Abmessungen der Land-Patterns { #612-land-pattern-dimensions }

- BGA145/BGA169: Kugeldurchmesser 0,25 mm und Rastermaß 0,5 mm; das Referenz-Land-Pattern zeigt eine Lötstoppmaskenöffnung von 0,33 mm und eine Pastenöffnung von 0,25 mm.
- QFN68L: Umfangspads 0,2 × 0,55 mm bei 0,35 mm Rastermaß; die Referenz zeigt eine Lötstoppmaskenöffnung von 0,3 × 0,65 mm und eine Pastenöffnung von 0,2 × 0,55 mm. Das freiliegende Pad hat nominal 5,49 mm × 5,49 mm, zulässig sind 5,39–5,59 mm.

Prüfen Sie vor der Footprint-Freigabe die Gehäusezeichnung sowie die Vorgaben des Bestückers für Schablone und Lötstoppmaske.

### 6.2. Allgemeine PCB-Regeln { #62-general-pcb-rules }

- BUCK-Schleifen kurz und breit halten, mit Rückstrom nahe der Schaltschleife.
- HF-, Quarz-, GPADC- und Audio-Bereiche von Schaltnetzteilen, Display-Takten, Motoren und Ladeschaltungen fernhalten.
- High-Speed-Speicher- und Display-Schnittstellen über einer durchgehenden Referenzmasse routen.
- ESD-Schutz nahe an Steckverbindern platzieren und Signale zuerst durch das Schutzbauteil führen.
- Ausreichend Testpunkte für Stromversorgung, Boot, Debug, HF und Produktionskalibrierung vorsehen.

#### 6.2.1. Referenzwerte für Fertigungsabstände { #621-fabrication-clearances }

Die folgenden Werte sind aus den PTH- und sechslagigen HDI-Referenzregeln von SiFli übernommen. Sie ersetzen nicht die aktuellen Fertigungsregeln des Herstellers für den gewählten Lagenaufbau.

<div align="center"><em>Tabelle 6.2-1: Referenzabstände für PTH und sechslagiges HDI</em></div>

<div align="center" markdown>

| Regel / Abstand | Vierlagiges PTH (mm) | Sechslagiges HDI (mm) |
|:---|---:|---:|
| Leiterbahnbreite: Minimum / empfohlen | 0.10 / 0.10 | 0.075 / 0.075 |
| Leiterbahnbreite: Maximum | 2.54 | 2.54 |
| Leiterbahn-Leiterbahn, Leiterbahn-Via, Via-Via | 0.10 | 0.075 |
| Pad/SMD zu Leiterbahn oder Via | 0.10 | 0.075 |
| Pad-Pad oder SMD-Pad | 0.10 | 0.10 |
| Kupfer zu Leiterbahn, Via, Pad oder SMD | 0.127 | 0.10 |
| Kupfer-Kupfer | 0.15 | 0.15 |
| Leiterplattenrand zu Leiterbahn, Via, Pad, SMD oder Kupfer | 0.25 | 0.20 |
| Bohrung zu Leiterbahn oder Via | 0.10 | 0.075 |
| Bohrung zu Pad, SMD oder Kupfer | 0.10 | 0.10 |
| Bohrung-Bohrung; Bauteilkörper-Bauteilkörper | 0.10 | 0.10 |

</div>

In der Gleichnetz-Abstandsmatrix der Quelldarstellungen sind nur einzelne Zellen mit 0 mm markiert; leere Zellen sind nicht spezifiziert. Leiten Sie daraus nicht ab, dass auch nicht aufgeführte Kombinationen 0 mm zulassen. Bestätigen Sie alle Regeln vor der Layoutfreigabe mit dem Leiterplattenhersteller.

#### 6.2.2. Stromversorgung und Masseführung { #622-power-and-ground-layout }

- Platzieren Sie DC-DC-Induktivitäten und -Kondensatoren nahe an den Pins. Führen Sie BUCK_VSW kurz und breit, minimieren Sie die Schleifenfläche, verbinden Sie die Masse der Ausgangskondensatoren über mehrere Vias mit der Massefläche und führen Sie die BUCK_VOUT-Feedback-Leiterbahn mit einer Breite von mehr als 0,25 mm. Vermeiden Sie Oberflächenkupfer und andere Leiterbahnen unter einer Induktivität; die angrenzende Lage soll eine durchgehende Massefläche sein.
- Platzieren Sie die Kondensatoren für PVDD_PMU1 (Pin 67) nahe am Pin und verwenden Sie eine mindestens 0,3 mm breite Leiterbahn. LDO-/IO-Kondensatoren gehören nahe an die jeweiligen Pins. Bemessen Sie die Leiterbahnbreite nach dem Laststrom und halten Sie empfindliche Versorgungsleitungen für geringe Welligkeit und stabile Funktion kurz und breit.
- Verbinden Sie das freiliegende QFN-Pad über mehrere Vias direkt mit der Hauptmasse, besonders in RF- und PMU-Bereichen. Bei BGA145 und BGA169 sind C12, C13, D12 und E13 die RF-Masseballs; verbinden Sie sie gemäß der [BGA145-Ballmap](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-Ballmap.svg), der [BGA169-Ballmap für Baustein 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg) und der [BGA169-Ballmap für Baustein 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg) mit der Hauptmasse. D2 und B3 sind bei BGA169 PMU-Masseballs; bei BGA145 ist D2 PA79 und B3 BUCK2_VOUT. Verbinden Sie unterschiedliche Masseballs nicht mit Oberflächenkupfer miteinander.

**Abgleich mit der Originalabbildung:** Im Begleittext wird E13 in der Liste der RF-Masseballs doppelt genannt. Die [RF-Masseabbildung](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-RF-VSS-PCB.png) kennzeichnet dagegen AVSS_TRF mit C13, AVSS_RRF mit E13, AVSS_BB mit C12 und AVSS_VCO mit D12. Die obigen Koordinaten folgen den Beschriftungen der Abbildung; prüfen Sie sie vor dem Routing anhand der Ballmap des gewählten Gehäuses.

#### 6.2.3. EMI, ESD und Schutz { #623-emi-esd-and-protection }

Führen Sie Takt- und störende Versorgungsleitungen nach Möglichkeit auf Innenlagen. Platzieren Sie ESD-Bauteile am Steckverbinder, sodass jedes Signal vor dem Eintritt in die Leiterplatte durch den Schutz geführt wird und keine Abzweigung entsteht. Die Masseverbindung soll kurz und breit sein und über ein direktes Via an die Fläche angebunden werden. Beim USB-Laden liegt der Testpunkt auf der Steckverbinderseite des TVS. Am Batterieeingang wird das TVS zwischen Steckverbinder und Last platziert, sodass der Strompfad zum Chip zuerst am TVS vorbeiführt; halten Sie seine Masseverbindung kurz.

### 6.3. Schnittstellen-Routing { #63-interface-routing }

Takt-Leiterbahnen sollten kurz, geschirmt und von schnellen digitalen Signalen isoliert sein. HF-Leiterbahnen sind als 50-Ω-Leitungen mit einem kompakten Anpassungsnetzwerk auszulegen. Speicher- und Display-Leiterbahnen sollten entsprechend ihrer Geschwindigkeit längenkontrolliert und als gruppierte Busse geroutet werden. Audio- und GPADC-Signale sollten geschirmt und von Schaltströmen ferngehalten werden.

#### 6.3.1. Platzierung und Routing der Quarze { #631-crystal-placement-and-routing }

- Platzieren Sie jeden Quarz innerhalb des geschirmten Bereichs, mehr als 1 mm vom Leiterplattenrand und mehr als 5 mm von Wärmequellen wie PA, Ladegerät und PMU entfernt. Halten Sie rund um den Quarz mindestens 0,25 mm Abstand ein.
- Führen Sie die 48-MHz-Quarzleitungen auf der obersten Lage; sie sollen 3–10 mm lang und 0,1 mm breit sein. Der Abstand zwischen 48M_XI und 48M_XO muss mindestens 0,15 mm betragen, wie im [ursprünglichen Routingmodell](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) dargestellt; sorgen Sie für eine dreidimensionale Masseabschirmung. Halten Sie die Leitungen von VBAT, DC-DC und schnellen Signalen fern. Der Begleittext fordert unter dem Quarzbereich auf der obersten und angrenzenden Lage eine Kupferfreihaltung und verbietet dort fremde Leiterbahnen.
- Führen Sie die 32,768-kHz-Quarzleitungen auf der obersten Lage; sie sollen höchstens 10 mm lang und 0,1 mm breit sein. Der Abstand zwischen XI und XO muss mindestens 0,15 mm betragen; sorgen Sie für eine dreidimensionale Masseabschirmung. Der Begleittext fordert unter dem Quarzbereich auf der obersten und angrenzenden Lage eine Kupferfreihaltung und verbietet dort fremde Leiterbahnen.

#### 6.3.2. HF- und Hochgeschwindigkeitsschnittstellen { #632-rf-and-high-speed-interfaces }

Platzieren Sie das HF-Anpassungsnetzwerk nahe am Chip, nicht an der Antenne. Der AVDD_BRF-Kondensator gehört nahe an den Pin; seine Masse ist direkt mit der Hauptmasse zu verbinden. Führen Sie HF auf der obersten Lage ohne Lagenwechsel und mit kontrollierten 50 Ω. Der Begleittext empfiehlt eine Breite von mehr als 10 mil, während die Checkliste ≥10 mil als erforderlich kennzeichnet. Behalten Sie diese Unterscheidung bei und bestimmen Sie die endgültige Breite anhand der 50-Ω-Berechnung für den gewählten Lagenaufbau. Verwenden Sie eine dreidimensionale Masseabschirmung und Stitching-Vias auf beiden Seiten, vermeiden Sie scharfe Ecken und halten Sie DC-DC, VBAT, Takte sowie schnelle I2C/SPI/SDIO/I2S/UART vom HF-Bereich fern.

Führen Sie MIPI_DSI als differentielle Paare mit 100 Ω und gleichen Sie die Datenpaare auf das Taktpaar ab. Stimmen Sie auch die Längen von OPI-PSRAM- und LCDC-SPI/QSPI-Bussen ab. Schirmen Sie Takt- und I2C-Leitungen nach Möglichkeit mit Masse und vermeiden Sie lange parallele Abschnitte mit nicht zugehörigen Signalen.

#### 6.3.3. Analoges Routing { #633-analog-routing }

Schirmen Sie GPADC-Leiterbahnen dreidimensional mit Masse ab und halten Sie sie von verrauschten Batteriespannungs- und Temperaturmesspfaden fern. Prüfen Sie Teilerimpedanz und Leckstrom im Hinblick auf die erforderliche Einschwingzeit.

### 6.4. PCB-Layout-Checkliste { #64-pcb-layout-checklist }

Die folgenden Tabellen decken die einzelnen Prüfbereiche des PCB-Layouts ab. Ist keine Spalte "Gilt für" vorhanden, gilt die Zeile für alle in der Arbeitsmappe erfassten Varianten.

#### 6.4.1. Gehäuse { #641-package }

<div align="center"><em>Tabelle 6.4-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der Footprint entspricht der Gehäusespezifikation | Alle Varianten | Erforderlich |

</div>

#### 6.4.2. Stromversorgung { #642-power-supply }

<div align="center"><em>Tabelle 6.4-2: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VDD1-Versorgungsleiterbahn ist mindestens 8 mil breit | Alle Varianten | Erforderlich |
| 2 | VDD2-Versorgungsleiterbahn ist mindestens 8 mil breit | Nur 555 | Erforderlich |
| 3 | BUCK1_VSW- und BUCK1_VOUT-Leiterbahn ist mindestens 8 mil breit | Alle Varianten | Erforderlich |
| 4 | BUCK2_VSW- und BUCK2_VOUT-Leiterbahn ist mindestens 8 mil breit | Nur 555 | Erforderlich |
| 5 | LDOVCC2_VOUT-Leiterbahn ist mindestens 8 mil breit | Nur 555 | Optional |
| 6 | AVDD_DSI-Versorgungsleiterbahn ist mindestens 8 mil breit | Nur 555 | Erforderlich |
| 7 | VDD_SIP-Versorgungsleiterbahn ist mindestens 6 mil breit | Alle Varianten | Erforderlich |
| 8 | VDDIOA-Versorgungsleiterbahn ist mindestens 10 mil breit | Alle Varianten | Erforderlich |
| 9 | VDDIOB-Versorgungsleiterbahn ist mindestens 10 mil breit | Alle Varianten | Erforderlich |

</div>

#### 6.4.3. Platzierung von Kondensatoren und Induktivitäten der Stromversorgung { #643-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>Tabelle 6.4-3: Checkliste Platzierung von Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VDD1-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 2 | VDD2-Kondensator ist nahe am Pin platziert | Nur 555 | Erforderlich |
| 3 | BUCK1-Induktivität ist nahe am Chip platziert | Alle Varianten | Erforderlich |
| 4 | BUCK1-Kondensator ist so nah wie möglich am Chip-Pin platziert | Alle Varianten | Erforderlich |
| 5 | BUCK2-Induktivität ist nahe am Chip platziert | Nur 555 | Erforderlich |
| 6 | Der 0,1-µF-Kondensator an AVDD_DSI ist nahe am Pin platziert | Nur 555 | Erforderlich |
| 7 | LDO_VOUT1-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 8 | LDO_VOUT2-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 9 | VDD_RET-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 10 | VDD_RTC-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 11 | VDD_SIP-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 12 | AVDD33-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 13 | AVDD_BRF-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 14 | VDDIOA-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |
| 15 | VDDIOB-Kondensator ist nahe am Pin platziert | Alle Varianten | Erforderlich |

</div>

#### 6.4.4. Takt { #644-clock }

<div align="center"><em>Tabelle 6.4-4: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Quarz nahe am Chip platziert | Alle Varianten | Erforderlich |
| 2 | GND-Abschirmung rund um den Quarz angebracht | Alle Varianten | Erforderlich |
| 3 | Die Checkliste fordert unter dem Quarz eine Kupferfreihaltung: auf einer 4-Lagen-Platine auf der oberen Lage und bei Bedarf auch auf den Lagen 2 und 3 | Alle Varianten | Erforderlich |
| 4 | Abstand der Quarz-Leiterbahn zum GND-Schutzkupfer ist größer als das 3-fache der Leiterbahnbreite | Alle Varianten | Erforderlich |
| 5 | Das 32-kHz-Quarzsignal verläuft nicht parallel zu BUCK1; dazwischen ist Masse platziert | Alle Varianten | Erforderlich |

</div>

**Hinweis zur Quelle:** Der Begleittext fordert unter dem Quarzbereich eine Kupferfreihaltung auf der obersten und angrenzenden Lage; die Checkliste nennt bei einer 4-Lagen-Platine die oberste Lage sowie bei Bedarf die Lagen 2 und 3. Die [48-MHz-Routingabbildung](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-48M-M-PCB.png) und das [32,768-kHz-Routingmodell](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-32K-M-PCB.png) zeigen jedoch jeweils eine L2-Massefläche unter den XI/XO-Leitungen. Die Quelle klärt weder, ob die Freihaltung nur unter dem Quarzgehäuse oder auch im Leiterbahnbereich gilt, noch wie die Lagenangaben zusammenpassen. Bestätigen Sie die erforderliche Kupferfreihaltung vor der Freigabe mit SiFli; treffen Sie keine eigene Annahme.

#### 6.4.5. Tasten { #645-buttons }

<div align="center"><em>Tabelle 6.4-5: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | ESD-Schutzbauteil der Taste nahe an der Taste platziert | Alle Varianten | Erforderlich |

</div>

#### 6.4.6. HF { #646-rf }

<div align="center"><em>Tabelle 6.4-6: Checkliste HF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die HF-Leiterbahn erfüllt die Anforderung an eine charakteristische Impedanz von 50 Ω im unsymmetrischen Betrieb | Alle Varianten | Erforderlich |
| 2 | HF-Leiterbahnbreite ≥10 mil | Alle Varianten | Erforderlich |
| 3 | Beidseits der HF-Leiterbahn einen mindestens 60 mil breiten Massekupferstreifen vorsehen und diesen mit ausreichend Stitching-Vias an die Hauptmassefläche anbinden | Alle Varianten | Erforderlich |
| 4 | Platz für ein Pi-Antennenanpassnetzwerk nahe am Chip vorsehen | Alle Varianten | Erforderlich |
| 5 | Durchgehende GND-Fläche unter dem HF-Signal | Alle Varianten | Erforderlich |
| 6 | Unter dem HF-Signal verlaufen keine Leiterbahnen für schnelle Digitalsignale | Alle Varianten | Erforderlich |
| 7 | Unter dem HF-Signal verlaufen keine Stromversorgungs-Leiterbahnen mit hohem di/dt | Alle Varianten | Erforderlich |

</div>

#### 6.4.7. High-Speed-Signale { #647-high-speed-signals }

<div align="center"><em>Tabelle 6.4-7: Checkliste High-Speed-Signale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | DSI-Differenzsignale erfüllen die Anforderung an die 100-Ω-Differenzimpedanz | Nur 555 | Erforderlich |
| 2 | DSI-Daten-Differenzpaare sind auf das Takt-Differenzpaar innerhalb von 200 mil längenangepasst | Nur 555 | Erforderlich |
| 3 | DSI-Signale werden so weit wie möglich auf derselben Lage geroutet | Nur 555 | Erforderlich |
| 4 | Längenanpassung der OPI-PSRAM-Signalleiterbahnen wird innerhalb von 200 mil kontrolliert | Nur 555 | Optional |

</div>

#### 6.4.8. ADC { #648-adc }

<div align="center"><em>Tabelle 6.4-8: Checkliste ADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Neben dem GPADC-Signal verläuft kein schnell schaltendes Signal parallel, außer wenn eine geeignete Guard-Leitung vorgesehen ist | Alle Varianten | Erforderlich |
| 2 | Spannungsteilerwiderstände für die Batteriespannung sind nahe am Chip-Eingangspin platziert | Alle Varianten | Erforderlich |
| 3 | Das Batteriespannungsmesssignal muss am Batterieanschluss abgegriffen und durch eine Masse-Guard-Leiterbahn abgeschirmt werden | Alle Varianten | Erforderlich |
| 4 | Neben dem SDMADC-Signal verläuft kein schnell schaltendes Signal parallel, außer wenn eine geeignete Guard-Leitung vorgesehen ist | Nur 555 | Optional |

</div>

#### 6.4.9. Testpunkte { #649-test-points }

<div align="center"><em>Tabelle 6.4-9: Checkliste Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Testpunkte lassen sich mit Prüfspitzen kontaktieren oder an einer Prüfvorrichtung anlöten | Alle Varianten | Erforderlich |
| 2 | Testpads für Programm-Download und Quarzkalibrierung (VBAT, GND, SWDCLK, SWDIO, MODE, RSTN, VDDIOA, UART3_TXD, UART3_RXD usw.) haben einen Durchmesser von mindestens 0,8 mm, liegen 2 mm auseinander und halten rundherum einen 2 mm breiten bauteilfreien Bereich ein | Alle Varianten | Erforderlich |

</div>

#### 6.4.10. Masse { #6410-ground }

<div align="center"><em>Tabelle 6.4-10: Checkliste Masse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Lagen neben dem Hauptchip bilden eine vollständige Hauptmassefläche mit ausreichend Massevias | Alle Varianten | Erforderlich |
| 2 | Exposed Pad (EPAD) ist über Vias mit der Hauptmasse verbunden | Alle Varianten | Erforderlich |
| 3 | Der Bereich unter dem Chip verfügt über ausreichend Massevias, die mit der Hauptmassefläche verbunden sind | Alle Varianten | Erforderlich |
| 4 | Ein Ring aus Massevias verläuft um den Platinenrand | Alle Varianten | Erforderlich |

</div>
