---
icon: lucide/circuit-board
hide:
    - navigation
description: "Richtlinien für den Schaltplanentwurf des SF32LB55x-MCU: Stromversorgungssystem, Boot-Modus, Takterzeugung, HF, Speicherschnittstellen, Display- und Touch-Schnittstellen sowie Wake-/GPADC-/Fertigungsschnittstellen."
tags:
    - Hardware
    - Chip
---

# SF32LB55x Hardware-Design-Leitfaden — Richtlinien für den Schaltplanentwurf { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. Richtlinien für den Schaltplanentwurf { #5-schematic-design-guidelines }

<div align="center"><em>Tabelle 5-1: Übersicht der Schaltplan-Abschnitte</em></div>

<div align="center" markdown>

| Gruppe | Themen |
|:---|:---|
| Stromversorgungssystem | PMU-Spannungsschienen, weitere Schienen, Kondensatoren, POR/BOR/Reset, BUCK-Induktivität. |
| Boot-Modus | Spannungsdomäne des Mode-Pins, Pull-Widerstand, Download/Wiederherstellung und Produktionszugang. |
| Takterzeugung | 48-MHz-Quarz, 32,768-kHz-Quarz und Prüfung der Anpassungskondensatoren. |
| HF | HF-Anpassung, 50-Ohm-Antennenpfad, AVDD_BRF-Filterung und HF-Freihaltebereich. |
| Speicherschnittstellen | OPI-PSRAM, QSPI-NOR/NAND/PSRAM und SDIO-eMMC/Micro-SD. |
| Display und Touch | MIPI DSI, SPI/QSPI, MCU8080, JDI, Touch-Interrupt, Reset, Hintergrundbeleuchtung und Panel-Stromversorgung. |
| Wake, GPADC und Fertigung | Weckquellen und Taster, Motor-PWM, GPADC-Spannungsteiler, Sensoren, Bluetooth-Audio, DBG-UART, SWD, Produktionsprogrammierung und Quarzkalibrierung. |

</div>

### 5.1. Stromversorgungssystem { #51-power-system }

SF32LB551 im QFN68L besitzt keine Pins VDD2, BUCK2_VSW, BUCK2_VOUT, LDOVCC2_VOUT oder AVDD_DSI. Wenden Sie die Versorgungs- und Kondensatortabellen nur auf vorhandene Pins des gewählten Gehäuses an. BGA-Gehäuse bieten zwei BUCK-Ausgänge; BUCK2 unterstützt BUCK- oder LDO-Betrieb, wobei BUCK empfohlen wird. QFN68L bietet einen BUCK-Ausgang.

<div align="center"><em>Tabelle 5.1-1: PMU-Stromversorgungspins</em></div>

<div align="center" markdown>

| PMU-Versorgungspins | Mindestspannung (V) | Typische Spannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VDD1 | 1,71 | 1,8 | 3,6 | 50 | VDD1-Stromversorgungseingang |
| VDD2 | 1,71 | 1,8 | 3,6 | 50 | VDD2-Stromversorgungseingang |
| BUCK1_VSW BUCK1_VOUT | - | 1,25 | - | 50 | BUCK1-VSW-Ausgang, mit der Induktivität verbunden; interner Stromversorgungseingang 1, verbunden mit dem anderen Ende der Induktivität und einem externen Kondensator |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0,9 | - | 50 | BUCK2-VSW-Ausgang, mit der Induktivität verbunden; interner Stromversorgungseingang 2, verbunden mit dem anderen Ende der Induktivität und einem externen Kondensator |
| LDO_VOUT1 | - | 1,1 | - | 50 | LDO-Ausgang 1, externen Kondensator anschließen |
| LDO_VOUT2 | - | 0,9 | - | 20 | LDO-Ausgang 2, externen Kondensator anschließen |
| VDD_RET | - | 0,9 | - | 1 | RET-LDO-Ausgang, externen Kondensator anschließen |
| VDD_RTC | - | 1,1 | - | 1 | RTC-LDO-Ausgang, externen Kondensator anschließen |

</div>

<div align="center"><em>Tabelle 5.1-2: Weitere Stromversorgungspins</em></div>

<div align="center" markdown>

| Weitere Versorgungspins | Mindestspannung (V) | Typische Spannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AVDD_BRF | 1,71 | 1,8 | 3,63 | 30 | HF-Stromversorgungseingang |
| AVDD_DSI | 1,71 | 1,8 | 2,75 | 20 | MIPI-DSI-Stromversorgungseingang; muss versorgt werden |
| VDD_SIP | 1,71 | 1,8 | 1,98 | 30 | Versorgungseingang für den im selben Gehäuse integrierten Speicherchip |
| AVDD33 | 3,15 | 3,3 | 3,63 | 50 | Stromversorgungseingang |
| VDDIOA | 1,71 | 1,8 | 3,63 | - | PA-I/O-Stromversorgungseingang |
| VDDIOB | 1,71 | 1,8 | 3,63 | - | PB-I/O-Stromversorgungseingang |

</div>

<div align="center"><em>Tabelle 5.1-3: Erforderliche Stromversorgungskondensatoren</em></div>

<div align="center" markdown>

| Versorgungspins | Kondensator | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| VDD1 VDD2 | 0,1 µF + 10 µF | VDD1 und VDD2 miteinander kurzschließen. Mindestens zwei Kondensatoren, 10 µF und 0,1 µF, nahe an den Pins platzieren |
| BUCK1_VSW BUCK1_VOUT | 0,1 µF + 4,7 µF | Mindestens zwei Kondensatoren, 4,7 µF und 0,1 µF, nahe an den Pins platzieren |
| BUCK2_VSW BUCK2_VOUT | 0,1 µF + 4,7 µF | Mindestens zwei Kondensatoren, 4,7 µF und 0,1 µF, nahe an den Pins platzieren |
| LDOVCC2_VOUT | 0,1 µF + 4,7 µF | Ist BUCK2 im BUCK-Modus konfiguriert, diesen Pin offen lassen; ist BUCK2 im LDO-Modus konfiguriert, BUCK2_VSW offen lassen, LDOVCC2_VOUT und BUCK2_VOUT kurzschließen und mindestens zwei Kondensatoren, 4,7 µF und 0,1 µF, nahe an den Pins platzieren |
| LDO_VOUT1 | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren |
| LDO_VOUT2 | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren |
| VDD_RET | 0,47 µF | Mindestens einen 0,47-µF-Kondensator nahe am Pin platzieren |
| VDD_RTC | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren |
| VDD_SIP | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren |
| SDMADC_VREF | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren |
| AVDD_DSI | 0,1 µF + 10 µF | Mindestens zwei Kondensatoren, 10 µF und 0,1 µF, nahe an den Pins platzieren |
| AVDD33 | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren |
| AVDD_BRF | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren |
| VDDIOA VDDIOB | 2 × 0,1 µF + 2 × 1 µF | Mindestens zwei Kondensatoren, 1 µF und 0,1 µF, nahe an jedem Pin platzieren |

</div>

Platzieren Sie die erforderlichen Kondensatoren nahe an den zugehörigen Pins, halten Sie die BUCK-Stromschleifen kompakt und prüfen Sie den BUCK-/LDO-Betriebsmodus vor Beginn des PCB-Layouts. Überprüfen Sie die Reset-Schaltung und das POR-/BOR-Timing an der realen Hardware.

Die Quellen widersprechen sich: Tabelle 3-3 des [chinesischen SiFli-Hardware-Anwendungshinweises](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) und Punkt 9 der [Schaltplan-Checkliste V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) nennen 1 µF für VDD_RTC, während [C0313 im Referenzschaltplan des Anwendungshinweises](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) mit 0,1 µF beschriftet ist. Die Quellen erläutern nicht, wann welcher Wert gilt. Klären Sie den erforderlichen Wert für das konkrete Bauteil vor der Designfreigabe mit SiFli; lösen Sie den Widerspruch nicht durch Annahmen.

VDD1 und VDD2 müssen gleichzeitig eingeschaltet werden; SF32LB551 hat kein VDD2. Ziehen Sie RSTN zur Eingangsspannungsdomäne von VDD1 hoch und verbinden Sie 0,1 µF mit Masse. Die Referenzzeichnung kennzeichnet die Pull-up-Versorgung mit 1,8 V/3,3 V und verwendet einen 10-kΩ-Widerstand; wählen Sie den Pegel passend zur VDD1-Spannungsdomäne des Designs. Abbildung 5.1-1 zeigt einen POR-Pegel von 1,50 V, BOR einstellbar von 2,5 V bis 1,5 V und eine RSTN-Markierung bei 0,7 V. Die Messung in Abbildung 5.1-3 zeigt in diesem Beispiel etwa 700 µs zwischen Versorgungsanstieg und Reset-Freigabe; dies ist keine garantierte Verzögerung für jedes Design.

![Abbildung 5.1-1: Ein- und Ausschalt-Timing](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-1: Ein- und Ausschalt-Timing</em></div>

![Abbildung 5.1-2: Reset-Schaltung](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-2: Reset-Schaltung</em></div>

![Abbildung 5.1-3: Gemessener Einschalt- und Reset-Verlauf](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-3: Gemessener Einschalt- und Reset-Verlauf</em></div>

![Abbildung 5.1-4: BGA-DC-DC-Referenzschaltung](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-4: BGA-DC-DC-Referenzschaltung</em></div>

![Abbildung 5.1-5: QFN-DC-DC-Referenzschaltung](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-5: QFN-DC-DC-Referenzschaltung</em></div>

Wählen Sie gemäß SiFlis Hardware-Anwendungshinweis eine BUCK-Induktivität von 4,7 µH mit einem Gleichstromwiderstand DCR ≤ 0,4 Ω und einem Sättigungsstrom Isat ≥ 450 mA.

### 5.2. Boot-Modus { #52-boot-mode }

<div align="center"><em>Tabelle 5.2-1: Boot-Modus-Konfiguration</em></div>

<div align="center" markdown>

| Moduskonfiguration | Detaillierte Beschreibung |
| :--- | :--- |
| High-Pegel | Nach dem Einschalten und Hochfahren des Chips wird der Download-Modus aufgerufen |
| Low-Pegel | Nach dem Einschalten und Hochfahren des Chips springt er zum Start in den Benutzerprogrammbereich |

</div>

Bei High-Pegel wechselt der Chip nach dem Einschalten in den Download-Modus; bei Low-Pegel startet er das Benutzerprogramm. Stellen Sie sicher, dass Prüfvorrichtungen in der Fertigung den erforderlichen Boot-Zustand erzwingen können und dass die Boot-Pins trotz Produktgehäuse und eingeschränktem Testzugang erreichbar bleiben.

Der Mode-Pin gehört zur gleichen Spannungsdomäne wie VDDIOA. Halten Sie ihn mit einem externen 10-kΩ-Widerstand zur entsprechenden Versorgung oder zu GND auf einem stabilen Pegel; er darf weder offen bleiben noch unbeabsichtigt umschalten. Produktionsplatinen müssen einen Mode-Testpunkt für Firmware-Programmierung und Quarzkalibrierung vorsehen; ein Jumper ist dafür nicht erforderlich. Sehen Sie auf Testplatinen einen Jumper vor, damit eine hängende Anwendung durch Starten im Download-Modus wiederhergestellt werden kann.

### 5.3. Takterzeugung { #53-clock-generation }

<div align="center"><em>Tabelle 5.3-1: Anforderungen an die Quarze</em></div>

<div align="center" markdown>

| Quarz | Spezifikationsanforderungen | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| 48 MHz | 7 pF≦CL≦12 pF (empfohlener Wert 8,8 pF) △F/F0≦±10 ppm ESR≦30 Ω (empfohlener Wert 22 Ω) | Die Leistungsaufnahme des Quarzoszillators hängt von CL und ESR ab: Je kleiner beide Werte sind, desto geringer ist der Verbrauch. Für einen möglichst niedrigen Verbrauch sollten innerhalb des zulässigen Bereichs Bauteile mit vergleichsweise niedrigen CL- und ESR-Werten gewählt werden. Sehen Sie neben dem Quarz Footprints für parallel geschaltete Anpassungskondensatoren vor. Bei CL<12 pF müssen keine Kondensatoren bestückt werden |
| 32,768 kHz | CL≦12,5 pF (empfohlener Wert 7 pF) △F/F0≦±20 ppm ESR≦80 kΩ (empfohlener Wert 38 kΩ) | Die Leistungsaufnahme des Quarzes hängt von CL und ESR ab: Je kleiner beide Werte sind, desto geringer ist der Verbrauch. Für einen möglichst niedrigen Verbrauch sollten innerhalb des zulässigen Bereichs Bauteile mit vergleichsweise niedrigen CL- und ESR-Werten gewählt werden. Sehen Sie neben dem Quarz Footprints für parallel geschaltete Anpassungskondensatoren vor. Bei CL<12,5 pF muss kein Kondensator bestückt werden |

</div>

Platzieren Sie beide Quarze nahe am Chip, halten Sie die Leiterbahnen kurz und symmetrisch und sehen Sie Footprints für Anpassungskondensatoren vor. Schützen Sie die Quarznetze vor Störungen durch HF, BUCK, Display und Motor.

### 5.4. HF { #54-rf }

Das HF-Frontend des SF32LB55x enthält ein integriertes Breitband-Anpassungs- und Filternetzwerk. Legen Sie die HF-Leiterbahn mit einem Wellenwiderstand von 50 Ω aus und sehen Sie ein π-Anpassungsnetzwerk zur Filterung von Störaussendungen und zur Antennenanpassung vor. Bestimmen Sie die endgültigen Bauteilwerte anhand von Messungen mit der tatsächlichen Antenne und dem PCB-Layout. Ist die gewählte Antenne bereits angepasst, müssen im vorgesehenen Netzwerk normalerweise keine zusätzlichen Bauteile bestückt werden.

Führen Sie die HF-Leiterbahnen über einer durchgehenden Massefläche, platzieren Sie das Anpassungsnetzwerk möglichst nahe am Chip und den AVDD_BRF-Filter nahe am Pin. Halten Sie DC-DC-, VBAT-, Quarz-, Hochgeschwindigkeitstakt-, SPI-, SDIO-, I2S- und UART-Leiterbahnen vom HF-Bereich fern.

Die HF-Referenzschaltung setzt C0323 (15 pF/50 V) in Reihe mit ANT; die beiden Massezweige C0318 und C0319 bleiben unbestückt (NF). Dies sind Beispielwerte, keine universellen Antennenanpassungswerte.

![Abbildung 5.4-1: Referenzschaltung zur HF-Anpassung](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.4-1: Referenzschaltung zur HF-Anpassung</em></div>

### 5.5. Speicherschnittstellen { #55-storage-interfaces }

SF32LB55x unterstützt OPI-PSRAM, QSPI-NOR-/NAND-Flash und PSRAM sowie SDIO für eMMC oder Micro-SD. Da die Gehäuseauswahl die verfügbaren Pins und Schnittstellen beeinflusst, muss die Speicherauswahl vor der Pin-Festlegung und der Prüfung des PCB-Lagenaufbaus abgeschlossen sein.

BGA145 bietet einen externen OPI-PSRAM-Kanal, BGA169 zwei. Tabellen 5.5-1 bis 5.5-3 beschreiben die BGA145-Konfiguration und die beiden BGA169-Speicherbausteine, nicht drei Kanäle in einem Gehäuse. Die QSPI-Tabellen entsprechen QSPI2, QSPI3 und QSPI4. Die SDIO-Tabellen zeigen SDIO1 im 4-/8-Bit-Modus und SDIO2 im 4-Bit-Modus.

Für externen QSPI-PSRAM wird QSPI2 empfohlen. Steuert ein HCPU-GPIO die Versorgung eines externen OPI/QSPI-PSRAM, verwenden Sie einen HCPU-Pin vom Typ PU: High schaltet ein, Low aus. Wird VDD_SIP für internen Flash geschaltet, muss PA58 mit derselben Polarität verwendet werden. Lassen Sie den Flashbedarf der LCPU-Beschleunigungs- und Herzfrequenzalgorithmen von SiFlis FAE bewerten, bevor Sie zusätzlichen NOR-Flash an QSPI4 vorsehen.

Die Richtungsangaben in den ursprünglichen OPI-Tabellen sind uneinheitlich. Im [BGA145-Referenzschaltplan](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png), im [BGA169-Referenzschaltplan für Speicher 1](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png) und im [Referenzschaltplan für Speicher 2](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png) steuern die MCU-Pins PA37/PA20 bzw. PA07/PA08 die CS#- und CLK-Pins des externen PSRAM. Die folgenden Tabellen geben CS# und CLK daher aus MCU-Sicht an: MCU-Ausgang, PSRAM-Eingang. Die Schaltpläne legen keine feste Richtung für DQS/DM fest; prüfen Sie Funktion und Richtung im Datenblatt des ausgewählten PSRAM.

Jeder gezeigte PSRAM verwendet 1,8 V, drei 0,1-µF-Kondensatoren und einen 1-µF/6,3-V-Kondensator. Die offenen RESET#- und NC/CLK#-Anschlüsse gelten für den dargestellten Speicher; prüfen Sie das Datenblatt des tatsächlich gewählten Bausteins.

![Abbildung 5.5-1: BGA145-OPI-PSRAM-Referenzschaltung](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-1: BGA145-OPI-PSRAM-Referenzschaltung</em></div>

<div align="center"><em>Tabelle 5.5-1: OPI-PSRAM im BGA145</em></div>

<div align="center" markdown>

| PSRAM-Signal | MCU-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CS# | PA37 | MCU-Ausgang; PSRAM-Eingang |
| CLK | PA20 | MCU-Ausgang; PSRAM-Eingang |
| DQS | PA35 | DQS/DM; Funktion und Richtung im Datenblatt der ausgewählten PSRAM prüfen |
| DQ0 | PA28 | Dateneingang/-ausgang 0 |
| DQ1 | PA29 | Dateneingang/-ausgang 1 |
| DQ2 | PA30 | Dateneingang/-ausgang 2 |
| DQ3 | PA31 | Dateneingang/-ausgang 3 |
| DQ4 | PA34 | Dateneingang/-ausgang 4 |
| DQ5 | PA36 | Dateneingang/-ausgang 5 |
| DQ6 | PA38 | Dateneingang/-ausgang 6 |
| DQ7 | PA42 | Dateneingang/-ausgang 7 |

</div>

![Abbildung 5.5-2: BGA169-OPI-PSRAM-Referenzschaltung, Speicher 1](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-2: BGA169-OPI-PSRAM-Referenzschaltung, Speicher 1</em></div>

<div align="center"><em>Tabelle 5.5-2: OPI-PSRAM im BGA169, Speicher 1</em></div>

<div align="center" markdown>

| PSRAM-Signal | MCU-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CS# | PA07 | MCU-Ausgang; PSRAM-Eingang |
| CLK | PA08 | MCU-Ausgang; PSRAM-Eingang |
| DQS | PA15 | DQS/DM; Funktion und Richtung im Datenblatt des ausgewählten PSRAM prüfen |
| DQ0 | PA02 | Dateneingang/-ausgang 0 |
| DQ1 | PA04 | Dateneingang/-ausgang 1 |
| DQ2 | PA05 | Dateneingang/-ausgang 2 |
| DQ3 | PA06 | Dateneingang/-ausgang 3 |
| DQ4 | PA09 | Dateneingang/-ausgang 4 |
| DQ5 | PA11 | Dateneingang/-ausgang 5 |
| DQ6 | PA12 | Dateneingang/-ausgang 6 |
| DQ7 | PA13 | Dateneingang/-ausgang 7 |

</div>

![Abbildung 5.5-3: BGA169-OPI-PSRAM-Referenzschaltung, Speicher 2](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-3: BGA169-OPI-PSRAM-Referenzschaltung, Speicher 2</em></div>

<div align="center"><em>Tabelle 5.5-3: OPI-PSRAM im BGA169, Speicher 2</em></div>

<div align="center" markdown>

| PSRAM-Signal | MCU-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CS# | PA07 | MCU-Ausgang; PSRAM-Eingang |
| CLK | PA08 | MCU-Ausgang; PSRAM-Eingang |
| DQS | PA26 | DQS/DM; Funktion und Richtung im Datenblatt des ausgewählten PSRAM prüfen |
| DQ0 | PA18 | Dateneingang/-ausgang 0 |
| DQ1 | PA22 | Dateneingang/-ausgang 1 |
| DQ2 | PA24 | Dateneingang/-ausgang 2 |
| DQ3 | PA32 | Dateneingang/-ausgang 3 |
| DQ4 | PA33 | Dateneingang/-ausgang 4 |
| DQ5 | PA59 | Dateneingang/-ausgang 5 |
| DQ6 | PA62 | Dateneingang/-ausgang 6 |
| DQ7 | PA64 | Dateneingang/-ausgang 7 |

</div>

<div align="center"><em>Tabelle 5.5-4: QSPI2: NOR-/NAND-Flash oder PSRAM</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CS# | GPIO9 | PA61 | Chip-Select, aktiv Low |
| SO | GPIO7 | PA65 | Dateneingang (Daten-E/A-Leitung 1) |
| WP# | GPIO6 | PA66 | Schreibschutz-Ausgang (Daten-E/A-Leitung 2) |
| SI | GPIO8 | PA63 | Datenausgang (Daten-E/A-Leitung 0) |
| SCLK | GPIO10 | PA60 | Serieller Takt-Ausgang |
| Hold# | GPIO5 | PA68 | Datenausgang (Daten-E/A-Leitung 3) |

</div>

<div align="center"><em>Tabelle 5.5-5: QSPI3: NOR-/NAND-Flash oder PSRAM</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CS# | GPIO16 | PA45 | Chip-Select, aktiv Low |
| SO | GPIO14 | PA49 | Dateneingang (Daten-E/A-Leitung 1) |
| WP# | GPIO13 | PA51 | Schreibschutz-Ausgang (Daten-E/A-Leitung 2) |
| SI | GPIO15 | PA47 | Datenausgang (Daten-E/A-Leitung 0) |
| SCLK | GPIO17 | PA44 | Serieller Takt-Ausgang |
| Hold# | GPIO12 | PA55 | Datenausgang (Daten-E/A-Leitung 3) |

</div>

<div align="center"><em>Tabelle 5.5-6: QSPI4: NOR-/NAND-Flash oder PSRAM</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CS# | - | PB33 | Chip-Select, aktiv Low |
| SO | - | PB36 | Dateneingang (Daten-E/A-Leitung 1) |
| WP# | - | PB37 | Schreibschutz-Ausgang (Daten-E/A-Leitung 2) |
| SI | - | PB35 | Datenausgang (Daten-E/A-Leitung 0) |
| SCLK | - | PB32 | Serieller Takt-Ausgang |
| Hold# | - | PB07 | Datenausgang (Daten-E/A-Leitung 3) |

</div>

<div align="center"><em>Tabelle 5.5-7: SDIO1: 4-Bit-eMMC/Micro SD</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Takt-Eingang |
| CMD | GPIO9 | PA36 | Befehlseingang |
| DATA0 | GPIO8 | PA28 | Daten 0 |
| DATA1 | GPIO7 | PA29 | Daten 1 |
| DATA2 | GPIO6 | PA30 | Daten 2 |
| DATA3 | GPIO5 | PA31 | Daten 3 |

</div>

<div align="center"><em>Tabelle 5.5-8: SDIO1: 8-Bit-eMMC</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | Takt-Eingang |
| CMD | GPIO9 | PA36 | Befehlseingang |
| DATA0 | GPIO8 | PA28 | Daten 0 |
| DATA1 | GPIO7 | PA29 | Daten 1 |
| DATA2 | GPIO6 | PA30 | Daten 2 |
| DATA3 | GPIO5 | PA31 | Daten 3 |
| DATA4 | GPIO15 | PA47 | Daten 4 |
| DATA5 | GPIO14 | PA49 | Daten 5 |
| DATA6 | GPIO13 | PA51 | Daten 6 |
| DATA7 | GPIO12 | PA55 | Daten 7 |

</div>

<div align="center"><em>Tabelle 5.5-9: SDIO2: 4-Bit-eMMC/Micro SD</em></div>

<div align="center" markdown>

| Schnittstellensignal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CLK | GPIO17 | PA44 | Takt-Eingang |
| CMD | GPIO16 | PA45 | Befehlseingang |
| DATA0 | GPIO15 | PA47 | Daten 0 |
| DATA1 | GPIO14 | PA49 | Daten 1 |
| DATA2 | GPIO13 | PA51 | Daten 2 |
| DATA3 | GPIO12 | PA55 | Daten 3 |

</div>


### 5.6. Display- und Touch-Schnittstellen { #56-display-and-touch-interfaces }

Zu den Display-Optionen zählen MIPI DSI, SPI/QSPI, MCU8080 und JDI. Wählen Sie das Panel vor der Pin-Zuweisung und dem PCB-Routing aus, damit Schnittstellenbreite, Taktung, Stromversorgung, Touch-Interrupt und Hintergrundbeleuchtungsstrategie gemeinsam geprüft werden.

Für paralleles und serielles JDI stehen die multiplexierten Signalgruppen auf der PA-Seite (LCDC1) oder der PB-Seite (LCDC2) zur Verfügung. Die folgenden Tabellen zeigen nur die PA/LCDC1-Pinbelegung. SiFli empfiehlt die PB/LCDC2-Schnittstelle. Die Quell-Anleitung enthält keine Pin-für-Pin-Tabelle für LCDC2; prüfen Sie die konkrete Zuordnung in der Pin-Mux-Tabelle des Chips, statt sie aus den LCDC1-Tabellen abzuleiten.

<div align="center"><em>Tabelle 5.6-1: MIPI-DSI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| MIPI-DSI-Signal | BGA145/169-Pin | Beschreibung |
| :--- | :--- | :--- |
| CLKP | DSI_CLKP | MIPI-Taktsignal + |
| CLKN | DSI_CLKN | MIPI-Taktsignal − |
| D0P | DSI_D0P | MIPI-Datenleitung 0+ |
| D0N | DSI_D0N | MIPI-Datenleitung 0− |
| D1P | DSI_D1P | MIPI-Datenleitung 1+ |
| D1N | DSI_D1N | MIPI-Datenleitung 1− |
| - | AVDD18_DSI | MIPI-Stromversorgungseingang |
| - | DSI_REXT | Externen 10-kΩ-Widerstand gegen Masse anschließen |
| - | AVSS_DSI | Masse |
| TE | PA77 | Tearing-Effect-Signal zur Synchronisierung mit dem MCU-Frame |
| RESET | PB17 | Reset-Signal für das Display-Panel |

</div>

Hinweise zur Display-Pinbelegung:

- Für TE kann auch ein anderer GPIO der PA-Gruppe verwendet werden.
- Unterstützt das Panel TE über DSI, ist kein separater TE-Pin erforderlich.
- Für RESET kann auch ein anderer GPIO der PB-Gruppe verwendet werden.

<div align="center"><em>Tabelle 5.6-2: SPI-/QSPI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| SPI-Signal | QFN68-GPIO | BGA145/169-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | PB33 | Enable-Signal |
| WRX_SCL | GPIO23 | PB32 | Taktsignal |
| DCX | GPIO20 | PB36 | Daten-/Befehlssignal im 4-Draht-SPI-Modus; Daten 1 im Quad-SPI-Modus |
| SDI_RDX | GPIO21 | PB35 | Dateneingangssignal im 3-/4-Draht-SPI-Modus; Daten 0 im Quad-SPI-Modus |
| SDO | GPIO21 | PB35 | Datenausgangssignal im 3-/4-Draht-SPI-Modus; mit SDI_RDX kurzschließen |
| D[0] | GPIO19 | PB37 | Daten 2 im Quad-SPI-Modus |
| D[1] | GPIO18 | PB07 | Daten 3 im Quad-SPI-Modus |
| RESET | GPIO2 | PB17 | Reset-Signal für das Display-Panel |
| TE | GPIO3 | PB77 | Tearing-Effect-Signal zur Synchronisierung mit dem MCU-Frame |

</div>

Hinweise zur Display-Pinbelegung:

- Für TE kann PA77 oder ein anderer PA-GPIO verwendet werden, der das Signal nachbildet.
- RESET kann jedem GPIO zugeordnet werden. Für ein Always-on-Display (AOD) empfiehlt SiFli einen GPIO der PB-Gruppe.

<div align="center"><em>Tabelle 5.6-3: MCU8080-Display-Schnittstelle</em></div>

<div align="center" markdown>

| MCU8080-Signal | QFN68-GPIO | BGA145/169-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | - | Chip-Select |
| WRX | GPIO23 | - | Schreib-Strobe-Signal zum Schreiben von Daten |
| DCX | GPIO20 | - | Auswahl zwischen Display-Daten/-Befehl |
| RDX | GPIO21 | - | Lese-Strobe-Signal für Lesezugriffe auf den Displaycontroller |
| D[0] | GPIO19 | - | Daten 0 |
| D[1] | GPIO18 | - | Daten 1 |
| D[2] | GPIO17 | - | Daten 2 |
| D[3] | GPIO16 | - | Daten 3 |
| D[4] | GPIO15 | - | Daten 4 |
| D[5] | GPIO14 | - | Daten 5 |
| D[6] | GPIO13 | - | Daten 6 |
| D[7] | GPIO12 | - | Daten 7 |
| RESET | GPIO2 | - | Reset |
| TE | GPIO3 | - | Tearing-Effect-Signal zur Synchronisierung mit dem MCU-Frame |

</div>

Hinweise zur Display-Pinbelegung:

- Für TE kann PA77 oder ein anderer PA-GPIO verwendet werden, der das Signal nachbildet.
- RESET kann jedem GPIO zugeordnet werden. Für ein Always-on-Display (AOD) empfiehlt SiFli einen GPIO der PB-Gruppe.

Der [SiFli-Hardware-Anwendungshinweis](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) bezeichnet RDX als Lese-Strobe-Signal, beendet die Beschreibung jedoch mit „zum Schreiben von Daten“. Das widerspricht sowohl dem Signalnamen RDX als auch dem zugehörigen WRX-Schreib-Strobe-Signal; hier wird es als Formulierungsfehler der Quelle behandelt. Ob ein Lesezugriff unterstützt wird und welche Zeitvorgaben gelten, hängt vom Displaycontroller ab. Prüfen Sie dessen Datenblatt.

<div align="center"><em>Tabelle 5.6-4: JDI-Parallel-Display-Schnittstelle</em></div>

<div align="center" markdown>

| JDI-Signal | MCU-Pin (LCDC1) | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| JDI_VCK | PA20 | Schiebetakt für den vertikalen Treiber |
| JDI_VST | PA31 | Startsignal für den vertikalen Treiber |
| JDI_XRST | PA34 | Reset-Signal für den horizontalen und vertikalen Treiber |
| JDI_HCK | PA36 | Schiebetakt für den horizontalen Treiber |
| JDI_HST | PA38 | Startsignal für den horizontalen Treiber |
| JDI_ENB | PA42 | Schreibfreigabesignal für den Pixelspeicher |
| JDI_R1 | PA49 | Rote Bilddaten (ungerade Pixel) |
| JDI_R2 | PA51 | Rote Bilddaten (gerade Pixel) |
| JDI_G1 | PA55 | Grüne Bilddaten (ungerade Pixel) |
| JDI_G2 | PA77 | Grüne Bilddaten (gerade Pixel) |
| JDI_B1 | PA78 | Blaue Bilddaten (ungerade Pixel) |
| JDI_B2 | PA79 | Blaue Bilddaten (gerade Pixel) |
| JDI_XFRP | PA45 | Flüssigkristall-Ansteuersignal ("An"-Pixel) |
| JDI_VCOM/FRP | PA47 | Ansteuersignal der gemeinsamen Elektrode/Flüssigkristall-Ansteuersignal ("Aus"-Pixel) |

</div>

<div align="center"><em>Tabelle 5.6-5: JDI-Seriell-Display-Schnittstelle</em></div>

<div align="center" markdown>

| JDI-Signal | MCU-Pin (LCDC1) | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| JDI_SCS | PA31 | Chip-Select-Signal |
| JDI_SCLK | PA20 | Serielles Taktsignal |
| JDI_SO | PA34 | Serielles Datenausgangssignal |
| JDI_DISP | PA36 | Display-Ein/Aus-Umschaltsignal |
| JDI_EXTCOMIN | PA38 | COM-Inversionspolaritäts-Eingang |

</div>

<div align="center"><em>Tabelle 5.6-6: Touch- und Hintergrundbeleuchtungs-Schnittstellen</em></div>

<div align="center" markdown>

| Touch- und Hintergrundbeleuchtungssignale | QFN68-GPIO | BGA145-Pin | BGA169-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- |
| Interrupt | GPIO1 | PA79 | PA79 | Touch-Status-Interruptsignal (weckfähig) |
| I2C1_SCL | GPIO25 | PA10 | PA10 | Touchscreen-I2C-Taktsignal |
| I2C1_SDA | GPIO24 | PA14 | PA14 | Touchscreen-I2C-Datensignal |
| BL_PWM | GPIO0 | - | - | PWM-Steuersignal der Hintergrundbeleuchtung |
| Reset | GPIO16 | PA00 | PA00 | Touch-Reset-Signal |
| Stromversorgungsfreigabe | GPIO26 | PA06 | PA03 | Freigabesignal für die Touchscreen-Stromversorgung |

</div>

Für BL_PWM ist ein GPIO mit GPTIM1_CHx-Funktion zu verwenden. Legen Sie einen geeigneten Pull-up- oder Pull-down-Pegel fest, damit sich die Hintergrundbeleuchtung beim Kaltstart nicht unbeabsichtigt einschaltet.

### 5.7. Weck-, GPADC- und Fertigungsschnittstellen { #57-wake-gpadc-and-manufacturing-interfaces }

Zugänge für Wecksignale, analoge Messungen, Debugging und Produktion sind unter Berücksichtigung des Gehäuses und der Fertigungsprüfvorrichtungen zu planen. Für die Weckpins sind definierte Ruhezustände und ESD-Schutz erforderlich. Bei GPADC-Spannungsteilern sind Einschwingzeit und Leckstrom abzuwägen. Debug- und Download-Zugänge müssen während EVT und Fertigung erreichbar bleiben.

SF32LB55x bietet vier HCPU-Weckquellen (WKUP_A0–WKUP_A3) und sechs LCPU-Weckquellen (WKUP_B0–WKUP_B5). Jede weckt ihre zugehörige CPU; aus Hibernate wecken nur die sechs LCPU-Quellen. Keiner der zehn Eingänge darf offen bleiben: Ergänzen Sie externe Pull-up- oder Pull-down-Widerstände passend zur Funktion, um Leckstrom im Schlafzustand zu vermeiden.

Im Referenzschaltplan ist KEY1 mit PB48 verbunden und über 10 kΩ nach VDD_1V8 hochgezogen; außerdem sind ESD-Schutz und ein Kondensator eingezeichnet. Das KEY2-Netzwerk zeigt 10-kΩ-Pull-ups, ESD-Schutz und per Jumper wählbare Verbindungen zu PA08, PA77 und PA78; C0004 ist mit NF (nicht bestückt) gekennzeichnet. Dies sind Schaltungsbeispiele, keine Liste weckfähiger Pins: PA08 ist in Tabelle 5.7-1 nicht aufgeführt. Wählen Sie den tatsächlich weckfähigen Eingang aus dieser Tabelle und sorgen Sie für einen definierten Ruhezustand aller Eingänge.

![Abbildung 5.7-1: Referenzschaltung für Wecktaster](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.7-1: Referenzschaltung für Wecktaster</em></div>

Verwenden Sie für Motor-PWM einen GPIO mit GPTIM1_CHx. Wählen Sie das passende PU/PD-Pinverhalten, damit der Motor beim Kaltstart nicht unbeabsichtigt anläuft. Die Referenzschaltung nutzt GPIO17 (PA44), einen Low-Side-Transistor und einen 1-MΩ-Gate-Pull-down sowie 3 V für den Motor und eine separate 3,3-V-MCU-Versorgung.

![Abbildung 5.7-2: Referenzschaltung des Motortreibers](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.7-2: Referenzschaltung des Motortreibers</em></div>

<div align="center"><em>Tabelle 5.7-1: Wake-up-Interruptquellen</em></div>

<div align="center" markdown>

| Wake-up-Interruptquelle | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| WKUP_A0 | GPIO3 | PA77 | HCPU-Interruptsignal 0 |
| WKUP_A1 | GPIO2 | PA78 | HCPU-Interruptsignal 1 |
| WKUP_A2 | GPIO1 | PA79 | HCPU-Interruptsignal 2 |
| WKUP_A3 | GPIO0 | PA80 | HCPU-Interruptsignal 3 |
| WKUP_B0 | GPIO43 | PB43 | LCPU-Interruptsignal 0 |
| WKUP_B1 | GPIO44 | PB44 | LCPU-Interruptsignal 1 |
| WKUP_B2 | GPIO45 | PB45 | LCPU-Interruptsignal 2 |
| WKUP_B3 | GPIO46 | PB46 | LCPU-Interruptsignal 3 |
| WKUP_B4 | GPIO47 | PB47 | LCPU-Interruptsignal 4 |
| WKUP_B5 | GPIO48 | PB48 | LCPU-Interruptsignal 5 |

</div>

Der SiFli-Hardware-Anwendungshinweis beschreibt einen fünfkanaligen 10-Bit-GPADC mit einem Eingangsbereich von 0–0,9 V. Für ein konservatives Platinendesign darf VIN nur unter 0,9 V direkt angeschlossen werden; höhere Spannungen müssen geteilt werden, sodass VADC unter 0,9 V bleibt. Für Batteriemessungen empfiehlt die Quelle R1:R2 etwa 5:1 und Widerstände im MΩ-Bereich: weniger Teilerstrom bedeutet längere Einschwingzeit. Die Schaltung enthält 0,1 µF von VADC nach Masse. Prüfen Sie mit `VADC = VIN × R2 / (R1 + R2)` die maximale Batteriespannung und Widerstandstoleranzen; die Ströme in Tabelle 5.7-2 gelten für VIN = 4,2 V, nicht für jeden Betriebsfall.

Quellenabweichung: Der höherrangige [OpenSiFli-Hardware-Anwendungshinweis](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) beschreibt einen 10-Bit-GPADC mit fünf Kanälen und einem Eingangsbereich von 0–0,9 V. Punkt 2 der [Schaltplan-Checkliste V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) legt 1,0 V als Maximum fest, nennt aber keine Kanalzahl. Das [Datenblatt SF32LB55x V1.7.2, Abschnitt 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) beschreibt acht Single-Ended-Eingänge oder vier differentielle Eingangspaare mit Bereichen von 0–1,1 V bzw. −0,7 bis 0,7 V; die Pin-Tabelle führt GPADC_CH0–CH7 auf. Der aktuelle [SDK-ADC-Anwendungshinweis](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) ordnet ebenfalls acht Kanäle (0–7) zu und nennt 1,1 V als maximale Abtastspannung. SiFli hat die Unterschiede bei Kanalzahl und Spannungsgrenzen nicht erklärt. Bis zur schriftlichen Klärung legt dieser Leitfaden weiterhin die Angaben der höher priorisierten Quelle als Entwurfsgrundlage zugrunde: fünf Kanäle und ein Eingangsbereich von 0–0,9 V. Halten Sie VADC unter 0,9 V, behandeln Sie 1,0 V und 1,1 V nicht als freigegebene Entwurfsgrenzen und bestätigen Sie die Kanalverfügbarkeit für das gewählte Bauteil und Gehäuse.

![Abbildung 5.7-3: GPADC-Eingang und Referenz-Spannungsteiler](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.7-3: GPADC-Eingang und Referenz-Spannungsteiler</em></div>

<div align="center"><em>Tabelle 5.7-2: GPADC-Teilerbeispiele</em></div>

<div align="center" markdown>

| Widerstandskombination | R1 (kΩ) ±1% | R2 (kΩ) ±1% | Spannungs-Einschwingzeit (ms) | Iq (µA) (VIN = 4,2 V) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1000 | 220 | 138 | 3,44 |
| 2 | 2000 | 430 | 250 | 1,73 |
| 3 | 3000 | 680 | 302 | 1,14 |
| 4 | 4300 | 910 | - | 0,81 |
| 5 | 5100 | 1100 | 420 | 0,68 |

</div>

Führen Sie I2C/SPI, Steuerung und Weckinterrupts von Herzfrequenz- und Beschleunigungssensoren über LCPU. Verwenden Sie DC-DC-Wandler, LDOs oder Lastschalter mit niedrigem Iq für bedarfsgerecht schaltbare Sensorversorgungen.

Externes Bluetooth-Audio kommuniziert über HCPU-UART1. Passen Sie die Spannungspegel an oder verwenden Sie einen Pegelwandler; beim Abschalten des Moduls muss die Versorgung des Pegelwandlers gleichzeitig abgeschaltet werden, um Leckstrom zu vermeiden. Bleibt das Modul in Standby versorgt und ist sein Versorgungseingang aktiv-low, verwenden Sie einen LCPU-GPIO mit standardmäßigem PD-Verhalten.

<div align="center"><em>Tabelle 5.7-3: Debug- und Flash-Schnittstelle</em></div>

<div align="center" markdown>

| UART-Signal | QFN68 | BGA145/169 | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| TXD1 | GPIO13 | PA19 | UART1-RXD-Signal |
| RXD1 | GPIO14 | PA17 | UART1-TXD-Signal |
| TXD2 | - | PA07 | UART2-RXD-Signal |
| RXD2 | - | PA05 | UART2-TXD-Signal |
| TXD3 | GPIO46 | PB46 | UART3-RXD-Signal, System-Standard-Log-Port |
| RXD3 | GPIO45 | PB45 | UART3-TXD-Signal, System-Standard-Log-Port |
| TXD4 | - | PB14 | UART4-RXD-Signal |
| RXD4 | - | PB12 | UART4-TXD-Signal |
| TXD5 | - | PB11 | UART5-RXD-Signal |
| RXD5 | - | PB06 | UART5-TXD-Signal |
| SWCLK | GPIO41 | PB31 | SWD-Taktsignal |
| SWDIO | GPIO42 | PB34 | SWD-Datensignal |

</div>

UART RXD darf nicht offen bleiben; aktivieren Sie beim Firmwarestart den internen Pull-up. UART3 ist der Standard-Logport. SiFli bietet einen Offline-Programmierer für Fertigungsprogrammierung und Quarzkalibrierung. Reservieren Sie mindestens VBAT, GND, VDDIOA, VDDIOB, RSTN, Mode, SWDIO, SWCLK, RXD1, TXD1, RXD3 und TXD3 als Testpunkte. Für die Fertigung ist folgende Teilmenge vorgesehen: VBAT, GND, boot_mode, VDDIOB, RXD3 und TXD3. VBAT und boot_mode sind Prüfaufbau-Bezeichnungen der Quelle; ordnen Sie diese vor der Verdrahtung der tatsächlichen Platinenversorgung und Mode-Verbindung zu.

Die Quellzeichnung verbindet VDD_1V8 mit Pin 1 (VTref). SWDIO und SWCLK sind jeweils über einen 22-Ω-Serienwiderstand mit Pin 7 beziehungsweise Pin 9 verbunden. Standard-[J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector) verwendet Pin 1 ebenfalls als [VTref](https://kb.segger.com/VTref), also als Eingang für die Zielspannungsreferenz und nicht als Stromversorgungsausgang des Debug-Probes. Prüfen Sie vor dem Anschluss eines Standardkabels die Steckerausrichtung und die Kompatibilität mit 1,8 V.

![Abbildung 5.7-4: SWD-Quellschaltung: Adapterbelegung prüfen](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.7-4: SWD-Quellschaltung: Adapterbelegung prüfen</em></div>
