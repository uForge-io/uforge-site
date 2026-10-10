---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplan-Design-Richtlinien für die SF32LB58x-MCU: Stromversorgungssystem, Takterzeugung, HF, Benutzerschnittstellen, Speicher und Konnektivität sowie Fertigung."
tags:
    - Hardware
    - Chip
---

# SF32LB58x-Hardwaredesignleitfaden — Schaltplanrichtlinien {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "Teil des SF32LB58x-Hardwaredesignleitfadens"
    Diese Seite behandelt Abschnitt 5, die Schaltplanrichtlinien. Beginnen Sie mit der [Übersicht zum SF32LB58x-Hardwaredesignleitfaden](SF32LB58x_hardware_design_guide.md), um das Bauteil auszuwählen und den gesamten Designablauf kennenzulernen. Lesen Sie anschließend die [Schaltplan-Checkliste](SF32LB58x_schematic_checklist.md) oder wechseln Sie direkt zu den [PCB-Layout-Richtlinien](SF32LB58x_pcb_layout.md).

## 5. Schaltplan-Design-Richtlinien {#5-schematic-design-guidelines}

Dieses Kapitel folgt dem Schaltplan-Workflow für den SF32LB58x: Es beginnt mit dem Minimal-Systemdesign und führt über Stromversorgung, Takterzeugung, HF, Benutzerschnittstellen, Speicher und Konnektivität bis zur Fertigung. Jeder Abschnitt erläutert zunächst das Designziel und fasst anschließend die Schaltungsanforderungen, typische Risiken und Prüfungen vor der Freigabe zusammen.

<div align="center"><em>Tabelle 5-1: Schaltplan-Abschnittsübersicht</em></div>

<div align="center" markdown>

| Gruppe | Wesentliche Entscheidungen | Nachweise für die Freigabe |
|:---|:---|:---|
| Minimal-Systemdesign | Exakte Bauteilvariante und Gehäuse, Stromversorgung und Reset, Takte, Boot und Speicher, Debug und Wiederherstellung | Erstprüfung für die Inbetriebnahme sowie Boot- und Wiederherstellungsplan |
| Stromversorgungssystem | System-PMIC, Chip-PMU-Schienen, BUCK-Induktivitäten, LDO-Kondensatoren, Reset, Weckquellen für den Energiesparbetrieb | Versorgungsplan, PMIC-Einstellungen, Messungen der Versorgungsschienen, Prüfung von POR/BOR/Reset |
| Takterzeugung | 48-MHz- und 32,768-kHz-Quarze | Prüfung der Quarzspezifikationen, Plan der Anpasskondensatoren, Layoutaufnahmen der Quarze |
| HF | HF-Anpassung und Antennenpfad | Impedanzplan, HF-Anpassnetzwerk, antennenfreie Zone, Layoutaufnahmen |
| Benutzerschnittstellen | Display, Touch/Hintergrundbeleuchtung, Audio, Tasten, Motor, PBR-Steuerung | Schnittstellenschaltpläne, Pinzuweisungen, Einschaltsequenz, Prüfung der Analog- und Audioschaltungen |
| Speicher und Konnektivität | Boot-Modus, MPI4, SD1/SD2, eMMC/SD NAND/SD-Karte, USB 2.0 HS | Boot-Konfiguration, Stromversorgungskonzept für den Speicher, Nachweis der differentiellen und schnellen Signalführung |
| Fertigung | SWD, UART-Debug-Ausgänge, Zugang für Produktionstests, Schaltplan-/PCB-Prüfliste | Testpunktzeichnung, Wiederherstellungsweg, Plan für Programmierung und Kalibrierung in der Fertigung |

</div>

### 5.1. Minimal-Systemdesign {#51-minimum-system-design}

Behandeln Sie das Minimal-Systemdesign als erstes Freigabekriterium der Schaltplanprüfung. Bevor produktspezifische Peripherie hinzukommt, müssen die genaue Bauteilvariante und das Gehäuse, die erforderlichen Versorgungsschienen und Takte, das Reset-Verhalten, Boot-Konfiguration und Speicher sowie ein praktikabler Debug- und Wiederherstellungspfad feststehen. Diese Entscheidungen bestimmen, ob sich die Platine zuverlässig einschalten, starten und in Betrieb nehmen lässt.

<div align="center"><em>Tabelle 5.1-1: Prüfpunkte für das Minimal-Systemdesign</em></div>

<div align="center" markdown>

| Funktionsblock | SF32LB58x-Prüfpunkt | Detaillierte Hinweise |
|:---|:---|:---|
| Bauteil und Gehäuse | Exakte Teilenummer und Gehäuse bestätigen; prüfen, ob Pinbelegung und integrierte Speicherkonfiguration die geplanten Schnittstellen unterstützen. | [Varianten und Gehäuse](SF32LB58x_hardware_design_guide.md#32-variants) |
| Stromversorgung | Erforderliche PMU- und externe Versorgungsschienen, BUCK-Bauteile und lokale Abblockkondensatoren vorsehen. | [Stromversorgungssystem](#51-power-system) |
| Takte | Den 48-MHz-Hauptquarz und den 32,768-kHz-RTC-Quarz vorsehen und die vorgegebenen Last- und Platzierungsbedingungen einhalten. | [Takterzeugung](#52-clock-generation) |
| Reset | Die externe RC-Reset-Schaltung für `RSTN` auf die Spannungsdomäne `PVDD1` beziehen. | [Einschaltsequenz und Reset](#5115-power-up-sequencing-and-reset) |
| Boot-Modus | Den `Mode`-Pin über einen 10-kΩ-Widerstand auf einen stabilen Pegel legen; Zugang für Produktionstests sowie auf Testplatinen einen Wiederherstellungs-Jumper vorsehen. | [Boot-Konfiguration](#551-boot-configuration) |
| Boot-Speicher | Eine unterstützte Speicherschnittstelle auswählen und Pinbelegung, I/O-Spannung und Versorgung auf den gewählten Baustein abstimmen. | [Speicher](#552-storage) |
| Inbetriebnahmezugang | Zugang zu SWD und den benötigten UART-Debugsignalen sowie die erforderlichen Versorgungs- und Massebezüge für den Debugger vorsehen. | [Debug- und Download-Schnittstelle](#561-debug-and-download-interface) |
| Energiesparverhalten | Die erforderlichen Weckquellen und die externe Leistungssteuerung für die vorgesehenen Schlafmodi bestätigen. | [Betriebsmodi und Weckquellen](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. Stromversorgungssystem {#51-power-system}

#### 5.2.1. Stromversorgung {#511-power-supply}
Die SF32LB58x-Serie verfügt über eine integrierte PMU mit zwei BUCK-Ausgängen und drei LDO-Ausgängen. Für jeden BUCK-Ausgang sind eine externe Induktivität und ein Kondensator erforderlich; der Ausgang wird mit dem zugehörigen internen Versorgungseingang verbunden. Auch die LDO-Ausgänge benötigen externe Kondensatoren. Bei Smartwatch-Designs kann der SF32LB58x mit dem SiFli-PMIC SF30147C kombiniert werden, der sowohl den Chip als auch die Peripherie versorgt.

##### 5.2.1.1. SiFli-PMIC-Stromverteilung {#5111-sifli-pmic-power-distribution}

Der SF30147C ist ein hochintegrierter, effizienter Energiemanagement-Chip für Wearables mit sehr niedrigem Stromverbrauch. Er enthält vier LDOs mit einem breiten Ein- und Ausgangsspannungsbereich und jeweils bis zu 100 mA Laststrom. Außerdem bietet er sieben Load-Switches mit geringem Leckstrom und niedrigem Einschaltwiderstand: zwei Hochspannungsschalter für direkt aus der Batteriespannung versorgte Peripherie (zum Beispiel einen Audioverstärker) sowie fünf Niederspannungsschalter für 1,8-V-Peripherie. Der SF32LB58x steuert den SF30147C über ein mit zwei GPIOs emuliertes TWI-Signal.

<div align="center"><em>Tabelle 5.2-1: SF30147C-Stromverteilung</em></div>

<div align="center" markdown>

| SF30147C-Stromversorgungspin | Min. Spannung (V) | Max. Spannung (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|
| VBUCK | 1,8 | 1,8 | 500 | Versorgt die Schienen PVDD1, PVDD2, VDDIOA, VDDIOA2, VDDIOB, AVDD_BRF, AVDD18_DSI und weitere 1,8-V-Schienen des SF32LB58x |
| LVSW1 | 1,8 | 1,8 | 100 | I2S-Class-K-PA-Logikversorgung |
| LVSW2 | 1,8 | 1,8 | 100 | G-Sensor-1,8-V-Versorgung |
| LVSW3 | 1,8 | 1,8 | 150 | Herzfrequenzsensor-1,8-V-Versorgung |
| LVSW4 | 1,8 | 1,8 | 150 | LCD-1,8-V-Versorgung |
| LVSW5 | 1,8 | 1,8 | 150 | eMMC-Kernversorgung |
| LDO1 | 2,8 | 3,3 | 100 | Versorgt die Schienen AVDD33_USB, AVDD33_ANA, AVDD33_AUD, AVDDIOA2 und weitere 3,3-V-Schienen des SF32LB58x |
| LDO2 | 2,8 | 3,3 | 100 | eMMC- oder SD-NAND-Versorgung |
| LDO3 | 2,8 | 3,3 | 100 | LCD-3,3-V-Versorgung |
| LDO4 | 2,8 | 3,3 | 100 | Herzfrequenzsensor-3,3-V-Versorgung |
| HVSW1 | 2,8 | 5 | 150 | Versorgung des analogen Class-K-PA |
| HVSW2 | 2,8 | 5 | 150 | GPS-Versorgung |

</div>

Vollständige Details finden Sie im Datenblatt des SF30147C-Chips.

##### 5.2.1.2. SF32LB58x-Stromversorgungsanforderungen {#5112-sf32lb58x-power-requirements}

Die PMU-Versorgungsspezifikationen der SF32LB58x-Serie sind in der folgenden Tabelle zusammengefasst.

<div align="center"><em>Tabelle 5.2-2: PMU-Versorgungsspezifikationen</em></div>

<div align="center" markdown>

| PMU-Stromversorgungspin | Min. Spannung (V) | Typ. Spannung (V) | Max. Spannung (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1,71 | 1,8 | 3,6 | 100 | PVDD1-Stromversorgungseingang |
| PVDD2 | 1,71 | 1,8 | 3,6 | 50 | PVDD2-Stromversorgungseingang |
| BUCK1_LX / BUCK1_FB | - | 1,25 | - | 100 | Der Ausgang BUCK1_LX wird mit der Induktivität und dem internen Stromversorgungseingang 1 verbunden; das andere Ende der Induktivität ist mit einem externen Kondensator verbunden |
| BUCK2_LX / BUCK2_FB | - | 0,9 | - | 50 | Der Ausgang BUCK2_LX wird mit der Induktivität und dem internen Stromversorgungseingang 2 verbunden; das andere Ende der Induktivität ist mit einem externen Kondensator verbunden |
| LDO_VOUT1 | - | 1,1 | - | 100 | LDO-Ausgang, externer Kondensator erforderlich |
| VDD_RET | - | 0,9 | - | 1 | RET-LDO-Ausgang, externer Kondensator erforderlich |
| VDD_RTC | - | 1,1 | - | 1 | RTC-LDO-Ausgang, externer Kondensator erforderlich |
| MIC_BIAS | 1,4 | - | 2,8 | - | Mikrofon-Stromversorgungsausgang |

</div>

Weitere Pins, die extern versorgt werden müssen, sind nachfolgend aufgeführt.

<div align="center"><em>Tabelle 5.2-3: Weitere Stromversorgungsspezifikationen</em></div>

<div align="center" markdown>

| Weiterer Stromversorgungspin | Min. Spannung (V) | Typ. Spannung (V) | Max. Spannung (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | HF-Stromversorgungseingang |
| AVDD18_DSI | 1,71 | 1,8 | 2,5 | 20 | MIPI-DSI-Stromversorgungseingang; bei Nichtnutzung unbeschaltet lassen |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Analoge Stromversorgung + HF-PA-Stromversorgungseingang |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Stromversorgungseingang für analoges Audio |
| AVDD33_USB | 3,15 | 3,3 | 3,45 | 50 | USB-Stromversorgungseingang |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | I/O-Stromversorgungseingang für PA12-PA93 |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | I/O-Stromversorgungseingang für PA0-PA11 |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | PB-I/O-Stromversorgungseingang |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | SIPA-Stromversorgungseingang |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | SIPB-Stromversorgungseingang |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | SIPC-Stromversorgungseingang |
| GPADC_VREFP | - | - | - | - | GPADC-Referenzspannungseingang; nur Kondensator, keine externe Versorgung |
| AUD_VREF | - | - | - | - | Audio-Referenzspannungseingang; nur Kondensator, keine externe Versorgung |

</div>

##### 5.2.1.3. Empfohlene Kondensatorwerte {#5113-recommended-capacitor-values}

<div align="center"><em>Tabelle 5.2-4: Empfohlene Entkopplungskondensatoren</em></div>

<div align="center" markdown>

| Stromversorgungspin | Kondensator | Beschreibung |
|:---|:---|:---|
| PVDD1 | 0,1 µF + 10 µF | Mindestens 10 µF und 0,1 µF (2 Kondensatoren insgesamt) nah am Pin platzieren |
| PVDD2 | 0,1 µF + 10 µF | Mindestens 10 µF und 0,1 µF (2 Kondensatoren insgesamt) nah am Pin platzieren |
| BUCK1_LX / BUCK1_FB | 0,1 µF + 4,7 µF | Mindestens 4,7 µF und 0,1 µF (2 Kondensatoren insgesamt) nah am Pin platzieren |
| BUCK2_LX / BUCK2_FB | 0,1 µF + 4,7 µF | Mindestens 4,7 µF und 0,1 µF (2 Kondensatoren insgesamt) nah am Pin platzieren |
| LDO_VOUT1 | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nah am Pin platzieren |
| VDD_RET | 0,47 µF | Mindestens einen 0,47-µF-Kondensator nah am Pin platzieren |
| VDD_RTC | 0,1 µF | Mindestens einen 0,1-µF-Kondensator nah am Pin platzieren |
| AVDD_BRF | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |
| AVDD18_DSI | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nah am Pin platzieren |
| AVDD33_ANA | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |
| AVDD33_AUD | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nah am Pin platzieren |
| AVDD33_USB | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |
| MIC_BIAS | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |
| VDDIOA / VDDIOA2 / VDDIOB | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 µF | Mindestens einen 1-µF-Kondensator nah am Pin platzieren |

</div>

##### 5.2.1.4. Auswahl der BUCK-Induktivität {#5114-buck-inductor-selection}

!!! important "Wichtige Parameter der Stromversorgungsinduktivität"
    L (Induktivität) = 4,7 µH, DCR (Gleichstromwiderstand) ≤ 0,4 Ω, Isat (Sättigungsstrom) ≥ 500 mA

##### 5.2.1.5. Einschaltsequenz und Reset {#5115-power-up-sequencing-and-reset}

Die SF32LB58x-Serie verfügt über integrierte POR- (Power-On Reset) und BOR-Funktionen (Brownout Reset) und unterstützt außerdem das externe Hardware-Reset-Signal RSTN.

RSTN sollte auf die PVDD1-Eingangsspannungsdomäne hochgezogen werden; ein 0,1-µF-Kondensator nach Masse bildet dabei einen RC-verzögerten Reset.

![Abbildung 5.2-1: Ein- und Ausschaltsequenz](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-1: Ein- und Ausschaltsequenz</em></div>

![Abbildung 5.2-2: Reset-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-2: Reset-Schaltung</em></div>

##### 5.2.1.6. Typische Stromversorgungsschaltung {#5116-typical-power-circuit}

Die SF32LB58x-Serie kann ihre Versorgungsschienen über den SiFli-PMIC SF30147C speisen; die Zuordnung ist in Tabelle 5.2-1 aufgeführt. Zusätzlich sind im Chipgehäuse zwei BUCK- und drei LDO-Ausgänge integriert.

![Abbildung 5.2-3: SF30147C-Stromversorgungsdiagramm](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-3: SF30147C-Stromversorgungsdiagramm</em></div>

![Abbildung 5.2-4: Eingebaute DC-DC-(BUCK-)Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-4: Eingebaute DC-DC-(BUCK-)Schaltung</em></div>

![Abbildung 5.2-5: Eingebaute LDO-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-5: Eingebaute LDO-Schaltung</em></div>

##### 5.2.1.7. Checkliste Stromversorgungsdesign {#5117-power-design-checklist}

- [ ] Bestätigen, dass der PVDD1/PVDD2-Versorgungsbereich (1,71 V–3,6 V) des ausgewählten Modells dem tatsächlichen Stromversorgungsschema entspricht
- [ ] BUCK-Induktivität erfüllt 4,7 µH, DCR ≤ 0,4 Ω, Isat ≥ 500 mA
- [ ] Entkopplungskondensatoren für PVDD1/PVDD2, BUCK1/2_LX/FB, LDO_VOUT1, VDD_RET und VDD_RTC verwenden die in diesem Abschnitt aufgeführten empfohlenen Werte
- [ ] Bei Verwendung von SF30147C entspricht die Spannungs-/Stromzuweisung der 7 Load-Switches den Peripherieanforderungen
- [ ] Die RC-Verzögerung der RSTN-Reset-Schaltung erfüllt die Reset-Timing-Anforderungen des Geräts

#### 5.2.2. Betriebsmodi und Weckquellen {#512-operating-modes-and-wake-sources}

Die Energiesparstrategie sollte gemeinsam mit den PBR-Funktionen, den aufweckfähigen Interrupts, den Speicherversorgungsschaltern, der Sensorversorgung und den Load-Switches des externen PMIC geprüft werden.

Die SF32LB58x-Serie bietet sechs PBR-Schnittstellen mit folgenden wesentlichen Eigenschaften:

1. PBR0 wechselt während des Einschaltens von 0 auf 1, nützlich zur Ansteuerung bestimmter externer LSWs; PBR1-PBR5 geben standardmäßig 0 aus;
2. PBR0-PBR5 können sowohl im Standby- als auch im Hibernate-Modus als Ausgänge fungieren;
3. PBR0-PBR5 können das LPTIM-Signal ausgeben;
4. PBR0-PBR5 können ein 32-kHz-Taktsignal ausgeben;
5. PBR0-PBR3 lassen sich als Eingänge für Wecksignale konfigurieren. Im aktiven Zustand empfängt die MCU darüber jedoch keinen Interrupt.

Alle GPIOs der SF32LB58x-Serie können im Light-Sleep- und Deep-Sleep-Modus zum Aufwecken verwendet werden. Im Standby- und Hibernate-Modus stehen 16 aufweckfähige Interruptquellen zur Verfügung: sechs an PA und zehn an PB.

<div align="center"><em>Tabelle 5.2-5: Interruptquellen-Verbindungen</em></div>

<div align="center" markdown>

| Interruptquelle | I/O | Beschreibung |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | Interruptsignal 0 |
| WKUP_PIN1 | PB55 | Interruptsignal 1 |
| WKUP_PIN2 | PB56 | Interruptsignal 2 |
| WKUP_PIN3 | PB57 | Interruptsignal 3 |
| WKUP_PIN4 | PB58 | Interruptsignal 4 |
| WKUP_PIN5 | PB59 | Interruptsignal 5 |
| WKUP_PIN6 | PA64 | Interruptsignal 6 |
| WKUP_PIN7 | PA65 | Interruptsignal 7 |
| WKUP_PIN8 | PA66 | Interruptsignal 8 |
| WKUP_PIN9 | PA67 | Interruptsignal 9 |
| WKUP_PIN10 | PA68 | Interruptsignal 10 |
| WKUP_PIN11 | PA69 | Interruptsignal 11 |
| WKUP_PIN12 | PBR0 | Interruptsignal 12 |
| WKUP_PIN13 | PBR1 | Interruptsignal 13 |
| WKUP_PIN14 | PBR2 | Interruptsignal 14 |
| WKUP_PIN15 | PBR3 | Interruptsignal 15 |

</div>

!!! note "Anzahl der Weckquellen laut Quelle zu bestätigen"
    Laut Quellentext gibt es 16 weckfähige Interruptquellen: 6 an PA und 10 an PB. Die Tabelle führt jedoch 6 PB-Pins, 6 PA-Pins und 4 PBR-Pins auf. Die Quelle erklärt nicht, ob PBR bei der Anzahl für PB mitgezählt wird. Klären Sie die Zuordnung mit SiFli, bevor Sie die angegebenen PA-/PB-Summen Ihrer Auslegung zugrunde legen.

### 5.3. Takterzeugung {#52-clock-generation}
Die SF32LB58x-Serie benötigt zwei externe Taktquellen: einen 48-MHz-Hauptquarz und einen 32,768-kHz-RTC-Quarz.

<div align="center"><em>Tabelle 5.3-1: Anforderungen an die Quarzspezifikation</em></div>

<div align="center" markdown>

| Quarz | Spezifikation | Beschreibung |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (empfohlen: 8,8 pF), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (empfohlen: 22 Ω) | Die Leistungsaufnahme des Quarzes hängt von CL und ESR ab; kleinere Werte senken den Verbrauch. Sehen Sie nahe am Quarz Footprints für parallele Anpasskondensatoren vor; bei CL < 12 pF sind sie nicht erforderlich. |
| 32,768 kHz | CL ≤ 12,5 pF (empfohlen: 7 pF), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (empfohlen: 38 kΩ) | Die Leistungsaufnahme des Quarzes hängt von CL und ESR ab; kleinere Werte senken den Verbrauch. Sehen Sie nahe am Quarz Footprints für parallele Anpasskondensatoren vor; bei CL < 12,5 pF sind sie nicht erforderlich. |

</div>

<div align="center"><em>Tabelle 5.3-2: Im SiFli-AVL gelistete Quarzmodelle</em></div>

<div align="center" markdown>

| Modell | Hersteller | Parameter |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 ~ 8 ppm, CL = 8,8 pF, ESR ≤ 22 Ω Max, TOPR = -30 ~ 85 °C, Gehäuse 2016 (metrisch) |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40 ~ 85 °C, Gehäuse 3215 (metrisch) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 ~ 10 ppm, CL = 8,8 pF, ESR ≤ 40 Ω Max, TOPR = -20 ~ 75 °C, Gehäuse 2016 (metrisch) |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 ~ 20 ppm, CL = 7 pF, ESR ≤ 70 kΩ Max, TOPR = -40 ~ 85 °C, Gehäuse 3215 (metrisch) |

</div>

!!! note
    Die allgemeine Empfehlung für den 48-MHz-Quarz nennt ESR ≤ 30 Ω (22 Ω empfohlen), während für das aufgeführte Modell SX20Y048000B31T-8.8 ESR ≤ 40 Ω angegeben ist. Die Quelle nennt beide Werte, erläutert den Unterschied jedoch nicht. Klären Sie vor dem Einsatz mit SiFli, ob dieses Modell geeignet ist. Der höhere ESR kann auch den statischen Stromverbrauch erhöhen. Entfernen Sie beim PCB-Layout die GND-Kupferfläche der zweiten Lage direkt unter dem Quarz, um die parasitäre Lastkapazität des Taktsignals zu verringern.

Weitere Angaben zu den gelisteten Bauteilen finden Sie in der [SiFli-Liste zugelassener Lieferanten][SiFli Approved Vendor List (AVL)].

### 5.4. HF {#53-rf}

Das HF-Frontend des SF32LB58x nutzt eine integrierte Breitband-Anpassfiltertechnik. Daher ist lediglich eine HF-Leiterbahn auf der PCB mit kontrollierter Impedanz von 50 Ω erforderlich. Für die Unterdrückung von Störsignalen und die Antennenanpassung sollte zusätzlich ein π-Anpassnetzwerk vorgesehen werden.

![Abbildung 5.4-1: HF-Schaltbild](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.4-1: HF-Schaltbild</em></div>

!!! note "Hinweis"
    Die Komponentenwerte im Anpassnetzwerk müssen durch Tests an der tatsächlichen Antenne und dem PCB-Layout ermittelt werden.

### 5.5. Benutzerschnittstellen {#54-user-interfaces}

#### 5.5.1. Display {#541-display}
##### 5.5.1.1. MIPI-DSI-Display-Schnittstelle {#5411-mipi-dsi-display-interface}

Die SF32LB58x-Serie unterstützt eine MIPI-DSI-Display-Schnittstelle mit zwei Lanes.

<div align="center"><em>Tabelle 5.5-1: MIPI-DSI-Signalverbindungen</em></div>

<div align="center" markdown>

| MIPI-DSI-Signal | I/O | Beschreibung |
|:---|:---|:---|
| CLKP | DSI_CLKP | MIPI-Taktsignal + |
| CLKN | DSI_CLKN | MIPI-Taktsignal - |
| D0P | DSI_D0P | MIPI-Datenleitung 0 + |
| D0N | DSI_D0N | MIPI-Datenleitung 0 - |
| D1P | DSI_D1P | MIPI-Datenleitung 1 + |
| D1N | DSI_D1N | MIPI-Datenleitung 1 - |
| - | AVDD18_DSI | MIPI-Stromversorgungseingang |
| - | DSI_REXT | Externer 10-kΩ-Widerstand gegen Masse |
| - | AVSS_DSI | Masse |
| TE | PB2 | Tearing-Effect-Signal zur MCU-Framesynchronisation |
| RESET | PB5 | Display-Reset-Signal |

</div>

##### 5.5.1.2. SPI-/QSPI-Display-Schnittstelle {#5412-spiqspi-display-interface}

Die SF32LB58x-Serie unterstützt 3- und 4-Draht-SPI sowie Quad-SPI zum Anschluss eines LCD-Panels. HCPU verwendet LCDC1 an PA, LCPU verwendet LCDC2 an PB.

<div align="center"><em>Tabelle 5.5-2: SPI-/QSPI-Signalverbindungen</em></div>

<div align="center" markdown>

| SPI-Signal | I/O (LCDC1) | I/O (LCDC2) | Beschreibung |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | Chip-Enable |
| WRX_SCL | PA46 | PB10 | Taktsignal |
| DCX | PA48 | PB03 | Daten-/Befehlssignal im 4-Draht-SPI-Modus; Daten 1 im Quad-SPI-Modus |
| SDI_RDX | PA50 | PB09 | Dateneingang im 3- oder 4-Draht-SPI-Modus; Datenleitung 0 im Quad-SPI-Modus |
| SDO | PA50 | PB09 | Datenausgang im 3- oder 4-Draht-SPI-Modus; mit SDI_RDX verbinden |
| D[0] | PA47 | PB04 | Daten 2 im Quad-SPI-Modus |
| D[1] | PA45 | PB06 | Daten 3 im Quad-SPI-Modus |
| REST | PA74 | PB05 | Display-Reset-Signal |
| TE | PA43 | PB02 | Tearing-Effect-Signal zur MCU-Framesynchronisation |

</div>

##### 5.5.1.3. MCU8080-Display-Schnittstelle {#5413-mcu8080-display-interface}

Die SF32LB58x-Serie unterstützt eine MCU8080-Schnittstelle zum Anschluss eines LCD-Panels.

<div align="center"><em>Tabelle 5.5-3: MCU8080-Signalverbindungen</em></div>

<div align="center" markdown>

| MCU8080-Signal | I/O | Beschreibung |
|:---|:---|:---|
| CSX | PA44 | Chip-Select |
| WRX | PA46 | Schreibstrobe-Signal für Schreibdaten |
| DCX | PA48 | Display-Daten-/Befehlsauswahl |
| RDX | PA50 | Lesestrobe-Signal |
| D[0] | PA47 | Daten 0 |
| D[1] | PA45 | Daten 1 |
| D[2] | PA26 | Daten 2 |
| D[3] | PA27 | Daten 3 |
| D[4] | PA42 | Daten 4 |
| D[5] | PA51 | Daten 5 |
| D[6] | PA52 | Daten 6 |
| D[7] | PA58 | Daten 7 |
| REST | PA24 | Reset |
| TE | PA43 | Tearing-Effect-Signal zur MCU-Framesynchronisation |

</div>

!!! note "Beschreibung des RDX-Signals"
    Die Quelle bezeichnet RDX als „Lesestrobe-Signal für Schreibdaten“; das ist in sich widersprüchlich. In der Tabelle ist RDX als „Lesestrobe-Signal“ aufgeführt. Klären Sie die vorgesehene Funktion vor der Freigabe mit SiFli.

##### 5.5.1.4. DPI-Display-Schnittstelle {#5414-dpi-display-interface}

Die SF32LB58x-Serie unterstützt eine DPI-Schnittstelle zum Anschluss eines LCD-Panels.

<div align="center"><em>Tabelle 5.5-4: DPI-Signalverbindungen</em></div>

<div align="center" markdown>

| DPI-Signal | I/O | Beschreibung |
|:---|:---|:---|
| CLK | PA12 | Taktsignal |
| DE | PA13 | Daten-Enable-Signal |
| HSYNC | PA14 | Horizontales Sync-Signal |
| VSYNC | PA15 | Vertikales Sync-Signal |
| SD | PA18 | Display-Shutdown-Steuerung |
| CM | PA19 | Schaltet zwischen Normal-Color- und Reduced-Color-Modus um |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | Pixeldaten (Rot R0-R7) |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | Pixeldaten (Grün G0-G7) |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | Pixeldaten (Blau B0-B7) |

</div>

##### 5.5.1.5. JDI-Display-Schnittstelle {#5415-jdi-display-interface}

Die SF32LB58x-Serie unterstützt sowohl parallele als auch serielle JDI-Schnittstellen zum Anschluss eines LCD-Panels, gemultiplext entweder auf LCDC1-(PA)- oder LCDC2-(PB)-Signale — LCDC2 (PB) wird empfohlen.

<div align="center"><em>Tabelle 5.5-5: Parallele JDI-Signalverbindungen</em></div>

<div align="center" markdown>

| JDI-Signal | I/O (LCDC1) | I/O (LCDC2) | Beschreibung |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | Schiebetakt für den vertikalen Treiber |
| JDI_VST | PA22 | PB19 | Startsignal für den vertikalen Treiber |
| JDI_XRST | PA25 | PB16 | Reset-Signal für den horizontalen und vertikalen Treiber |
| JDI_HCK | PA43 | PB05 | Schiebetakt für den horizontalen Treiber |
| JDI_HST | PA44 | PB10 | Startsignal für den horizontalen Treiber |
| JDI_ENB | PA45 | PB12 | Write-Enable-Signal für den Pixelspeicher |
| JDI_R1 | PA46 | PB09 | Rote Bilddaten (ungerade Pixel) |
| JDI_R2 | PA47 | PB06 | Rote Bilddaten (gerade Pixel) |
| JDI_G1 | PA48 | PB08 | Grüne Bilddaten (ungerade Pixel) |
| JDI_G2 | PA50 | PB04 | Grüne Bilddaten (gerade Pixel) |
| JDI_B1 | PA65 | PB02 | Blaue Bilddaten (ungerade Pixel) |
| JDI_B2 | PA67 | PB03 | Blaue Bilddaten (gerade Pixel) |
| JDI_XFRP | PBR1 | PBR1 | Flüssigkristall-Ansteuersignal („Ein“-Pixel) |
| JDI_VCOM/FRP | PBR2 | PBR2 | Ansteuersignal der gemeinsamen Elektrode / Flüssigkristall-Ansteuersignal („Aus“-Pixel) |

</div>

<div align="center"><em>Tabelle 5.5-6: Serielle JDI-Signalverbindungen</em></div>

<div align="center" markdown>

| JDI-Signal | I/O (LCDC1) | I/O (LCDC2) | Beschreibung |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | Chip-Select-Signal |
| JDI_SCLK | PA84 | PB02 | Serielles Taktsignal |
| JDI_SO | PA86 | PB06 | Serielles Datenausgangssignal |
| JDI_DISP | PA90 | PB04 | Display-EIN-/AUS-Umschaltsignal |
| JDI_EXTCOMIN | PA91 | PB05 | COM-Inversionspolaritätseingang |

</div>

#### 5.5.2. Touchscreen und Hintergrundbeleuchtung {#542-touch-and-backlight}

Die SF32LB58x-Serie unterstützt eine I2C-Schnittstelle für den Touch-Controller und einen Interrupt-Eingang für den Touch-Status. Ein PWM-Signal steuert die Aktivierung und Helligkeit des Hintergrundbeleuchtungstreibers.

<div align="center"><em>Tabelle 5.5-7: Verbindungen für Touch und Hintergrundbeleuchtung</em></div>

<div align="center" markdown>

| Touch-/Hintergrundbeleuchtungs-Signal | I/O | Beschreibung |
|:---|:---|:---|
| Interrupt | PA69 | Touch-Status-Interrupt (weckfähig) |
| I2C1_SCL | PA17 | Touch-Panel-I2C-Takt |
| I2C1_SDA | PA16 | Touch-Panel-I2C-Daten |
| BL_PWM | PB44 | PWM-Steuersignal für Hintergrundbeleuchtung |
| Reset | PA15 | Reset-Signal des Touch-Controllers |
| Versorgungsfreigabe | PA12 | Freigabesignal für die Stromversorgung des Touch-Panels |

</div>

#### 5.5.3. Audio {#543-audio}

Die SF32LB58x-Serie stellt verschiedene audiobezogene Schnittstellen mit folgenden Eigenschaften bereit:

1. Die SF32LB58x-Serie bietet drei I2S-Schnittstellen. I2S1 unterstützt nur den Eingang, während I2S2 und I2S3 Ein- und Ausgabe unterstützen. Alle drei arbeiten ausschließlich im Master-Modus; der Slave-Modus wird nicht unterstützt.
2. Für einen I2S-Mikrofoneingang wird I2S1 empfohlen.
3. Für einen Audio-DAC wird I2S2 empfohlen.
4. Für einen Audio-Codec wird I2S3 empfohlen.
5. Es stehen zwei PDM-Eingangsschnittstellen für digitale Mikrofone zur Verfügung. An jede PDM-Schnittstelle lassen sich bis zu zwei digitale Mikrofone anschließen; die Zahl der Schnittstellen ist daher nicht mit der Mikrofonzahl gleichzusetzen.
6. Es werden zwei analoge Mikrofoneingänge unterstützt. Jeder Eingang benötigt einen in Reihe geschalteten Koppelkondensator von mindestens 2,2 µF; MIC_BIAS des SF32LB58x versorgt die analogen Mikrofone.
7. Ein externer analoger Audio-Leistungsverstärker kann angeschlossen werden. Führen Sie die P/N-Leiterbahnen jedes DAC-Kanals als Differenzpaar und versehen Sie sie mit einer geeigneten, an Masse angeschlossenen Abschirmung. Halten Sie die parasitäre Kapazität unter 10 pF. Die Quelle nennt widersprüchliche Grenzwerte für die Leiterbahnlänge; beachten Sie den folgenden Hinweis.
8. Analoge Stereo-Kopfhörer können angeschlossen werden.

!!! note "Widersprüchliche DAC-Leiterbahnlängen in der Quelle"
    Die Hardware-Applikationsschrift von SiFli nennt zwei unterschiedliche Grenzwerte für die DAC-Leiterbahnlänge: In der Audioübersicht steht `<2 cm`, im ausführlichen Abschnitt zur DAC-Leiterbahnführung auf der Leiterplatte `<2 mm`. Die Quelle erklärt diesen Unterschied nicht. Klären Sie vor Abschluss des PCB-Layouts mit SiFli, welcher Grenzwert gilt; nehmen Sie nicht an, dass ein Wert den anderen ersetzt.

![Abbildung 5.5-1: Differentielle analoge Audioeingangsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-1: Differentielle analoge Audioeingangsschaltung</em></div>

![Abbildung 5.5-2: Unsymmetrische analoge Audioeingangsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-2: Unsymmetrische analoge Audioeingangsschaltung</em></div>

![Abbildung 5.5-3: Analoge Audioausgangsschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-3: Analoge Audioausgangsschaltung</em></div>

![Abbildung 5.5-4: Analoge MIC-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-4: Analoge MIC-Schaltung</em></div>

![Abbildung 5.5-5: Stereo-Kopfhörer-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-5: Stereo-Kopfhörer-Schaltung</em></div>

![Abbildung 5.5-6: Analoge Audio-PA-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-6: Analoge Audio-PA-Schaltung</em></div>

![Abbildung 5.5-7: I2S-Audio-PA-Schaltung](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-7: I2S-Audio-PA-Schaltung</em></div>

<div align="center"><em>Tabelle 5.5-8: Audiosignalverbindungen</em></div>

<div align="center" markdown>

| Audiosignal | I/O | Beschreibung |
|:---|:---|:---|
| I2S1_LRCK | PA14 | I2S1-Frame-Takt |
| I2S1_SDI | PA18 | I2S1-Dateneingang |
| I2S1_BCK | PA23 | I2S1-Bit-Takt |
| I2S2_LRCK | PA84 | I2S2-Frame-Takt |
| I2S2_SDI | PA86 | I2S2-Dateneingang |
| I2S2_SDO | PA82 | I2S2-Datenausgang |
| I2S2_BCK | PA91 | I2S2-Bit-Takt |
| I2S3_LRCK | PB31 | I2S3-Frame-Takt |
| I2S3_SDI | PB27 | I2S3-Dateneingang |
| I2S3_SDO | PB24 | I2S3-Datenausgang |
| I2S3_BCK | PB30 | I2S3-Bit-Takt |
| I2S3_MCLK | PB34 | I2S3-Master-Takt |
| PDM1_CLK | PA23 | PDM1-Takt |
| PDM1_DATA | PA18 | PDM1-Daten |
| PDM2_CLK | PA25 | PDM2-Takt |
| PDM2_DATA | PA22 | PDM2-Daten |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | Analoger Eingang 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | Analoger Eingang 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | Analoger Ausgang 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | Analoger Ausgang 2P/2N |

</div>

!!! note "Hinweis zum Pin-Multiplexing"
    I2S1_SDI und PDM1_DATA nutzen gemeinsam PA18; I2S1_BCK und PDM1_CLK teilen sich PA23. I2S1_LRCK liegt an PA14, PDM2_DATA an PA22. Prüfen Sie vor der Freigabe des Schaltplans in der Softwarekonfiguration, welche Audiofunktionen tatsächlich verwendet werden.

Der analoge MIC-Eingang des SF32LB58x unterstützt sowohl Single-Ended- als auch Differenzbetrieb. In beiden Fällen ist ein 2,2-µF-Kondensator in Reihe erforderlich. AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N werden auf der SF32LB58x-Seite angeschlossen. Die analogen Ausgänge AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N können den Eingang eines Stereo-Kopfhörerverstärkers oder eines externen analogen Audioverstärkers ansteuern. Sowohl der analoge Audio-PA als auch der I2S-Audio-PA werden über I2C3 konfiguriert.

#### 5.5.4. Tasten {#544-buttons}

##### 5.5.4.1. Ein-/Ausschalttaste mit Langdruck-Reset {#5441-power-and-long-press-reset-button}

PB54 wird als Ein-/Ausschaltsignal für die SF32LB58x-Serie empfohlen. Über eine Taste lassen sich das Ein- und Ausschalten per kurzem Druck sowie ein Reset durch langes Drücken auslösen. Das Signal ist high-aktiv; wird die Taste länger als 10 Sekunden gedrückt, setzt sich der Chip automatisch zurück.

![Abbildung 5.5-8: Schaltung für Ein-/Ausschalt- und Reset-Taste](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-8: Schaltung für Ein-/Ausschalt- und Reset-Taste</em></div>

##### 5.5.4.2. Funktionstaste oder Drehgeber {#5442-function-button-or-rotary-encoder}

Die SF32LB58x-Serie unterstützt Eingänge für Funktionstasten und Drehgeber; beide benötigen einen Pull-up. Außerdem wird ein optischer Tracking-Sensor unterstützt, für den die I2C4-Schnittstelle empfohlen wird.

![Abbildung 5.5-9: Funktionstasten-/Drehgeberschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-9: Funktionstasten-/Drehgeberschaltung</em></div>

<div align="center"><em>Tabelle 5.5-9: Signale des optischen Tracking-Sensors</em></div>

<div align="center" markdown>

| I2C-Signal | I/O | Beschreibung |
|:---|:---|:---|
| INT | PA58 | Interrupteingang des optischen Tracking-Sensors |
| SDA | PA59 | I2C-Daten des optischen Tracking-Sensors |
| SCL | PA60 | I2C-Takt des optischen Tracking-Sensors |

</div>

#### 5.5.5. Vibrationsmotor {#545-vibration-motor}

Die SF32LB58x-Serie unterstützt mehrere PWM-Ausgänge, die einen Vibrationsmotor ansteuern können.

!!! important
    Wenn die Software das HCPU-Frequenzskalierungsmakro `#define BSP_PM_FREQ_SCALING 1` aktiviert, sinkt der HCPU-Takt beim Eintritt in den Idle-Thread. Dadurch ändert sich auch die PWM-Frequenz an den entsprechenden PA-Pins. Das PWM-Signal sollte deshalb über einen PB-Pin ausgegeben werden.

![Abbildung 5.5-10: Schaltung für den Vibrationsmotor](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-10: Schaltung für den Vibrationsmotor</em></div>

### 5.6. Speicher und Konnektivität {#55-storage-and-connectivity}

#### 5.6.1. Boot-Konfiguration {#551-boot-configuration}
Die SF32LB58x-Serie besitzt einen `Mode`-Pin zur Auswahl des Boot-Modus.

<div align="center"><em>Tabelle 5.6-1: Mode-Konfiguration</em></div>

<div align="center" markdown>

| `Mode`-Einstellung | Beschreibung |
|:---|:---|
| High | Wechselt nach dem Einschalten in den Download-Modus |
| Low | Startet nach dem Einschalten die Benutzeranwendung |

</div>

!!! note "Hinweise"
    1. Die Spannungsdomäne des `Mode`-Pins entspricht der von VDDIOA;
    2. `Mode` über einen 10-kΩ-Widerstand mit der Versorgung oder GND verbinden, damit der Pegel stabil bleibt. Der Pin darf weder offen bleiben noch zwischen den Pegeln wechseln;
    3. Ein Testpunkt für den `Mode`-Pin muss auf Produktionsplatinen für Firmware-Download und Quarzkalibrierung reserviert werden; ein Jumper ist nicht erforderlich;
    4. Auf Testplatinen wird empfohlen, einen Jumper für den `Mode`-Pin zu reservieren, damit die Platine nach einem Firmware-Absturz im Download-Modus gestartet werden kann.

#### 5.6.2. Speicher {#552-storage}

Die SF32LB58x-Serie unterstützt MPI3 oder MPI4 für externe NOR- und SPI-NAND-Flash sowie SD1 für externe SD-NAND-Flash und eMMC.

##### 5.6.2.1. QSPI-NAND-Flash-Schnittstelle {#5521-qspi-nand-flash-interface}

Das SF32LB58x-EVB-Referenzboard verwendet standardmäßig MPI4 für den Anschluss eines externen SPI-NAND-Flash-Bausteins.

![Abbildung 5.6-1: SPI-NAND-Flash-Referenzschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.6-1: SPI-NAND-Flash-Referenzschaltung</em></div>

<div align="center"><em>Tabelle 5.6-2: MPI4-Signalverbindungen</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Signal (MPI4) | Beschreibung |
|:---|:---|:---|
| CS# | PA10 | Chip-Select, aktiv-low |
| SO | PA04 | Dateneingang (Daten-Ein-/Ausgang 1) |
| WP# | PA01 | Schreibschutz-Ausgang (Daten-Ein-/Ausgang 2) |
| SI | PA05 | Datenausgang (Daten-Ein-/Ausgang 0) |
| SCLK | PA09 | Serieller Taktausgang |
| Hold# | PA06 | Datenausgang (Daten-Ein-/Ausgang 3) |

</div>

!!! note "Hinweise"
    1. Wenn die Fertigungslinie Firmware in den externen Flash programmieren muss, muss die Download-Software den Versorgungssteuerpin PA43 auf High setzen, um die Stromversorgung des Flashs einzuschalten.
    2. Der Hold#-Pin des SPI-NAND-Flash muss über einen 10-kΩ-Widerstand auf die SPI-NAND-Flash-Versorgung hochgezogen werden.

##### 5.6.2.2. SDIO-eMMC-/Micro-SD-Schnittstelle {#5522-sdio-emmc-micro-sd-interface}

Die SF32LB58x-Serie unterstützt zwei SDIO-Schnittstellen. Auf dem EVB ist SD1 standardmäßig mit eMMC oder SD NAND verbunden; SD2 ist mit einer SD-Karte oder einem Wi-Fi-Chip verbunden.

SD1 nutzt 12 GPIOs (PA00–PA11), die über die VDDIOA2-Domäne versorgt werden. Je nach Schnittstellenpegel der Peripherie ist eine Versorgung mit 1,8 V oder 3,3 V möglich. Für SPI-NAND-Flash und eMMC werden 1,8 V empfohlen. SD-NAND-Flash-Bausteine unterstützen nur 3,3-V-Schnittstellenpegel; in diesem Fall muss VDDIOA2 auf 3,3 V eingestellt werden.

![Abbildung 5.6-2: eMMC-Referenzschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.6-2: eMMC-Referenzschaltung</em></div>

![Abbildung 5.6-3: SD-NAND-Referenzschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.6-3: SD-NAND-Referenzschaltung</em></div>

![Abbildung 5.6-4: SD-Karten-Referenzschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.6-4: SD-Karten-Referenzschaltung</em></div>

<div align="center"><em>Tabelle 5.6-3: SD1-Signalverbindungen</em></div>

<div align="center" markdown>

| SD1-Signal | I/O-Signal | Beschreibung |
|:---|:---|:---|
| SD1_D7 | PA00 | Daten 7 |
| SD1_D2 | PA01 | Daten 6 |
| SD1_D5 | PA03 | Daten 5 |
| SD1_D1 | PA04 | Daten 1 |
| SD1_D0 | PA05 | Daten 0 |
| SD1_D3 | PA06 | Daten 3 |
| SD1_D4 | PA07 | Daten 4 |
| SD1_D6 | PA08 | Daten 6 |
| SD1_CLK | PA09 | Taktsignal |
| SD1_CMD | PA10 | Befehlssignal |

</div>

!!! note "Prüfung der SD1-Bezeichnung"
    Die Quelle gibt an, dass SD1 12 GPIOs (PA00–PA11) verwendet, ihre Signaltabelle führt jedoch nur 10 Signale auf (SD1_D[7:0], CLK und CMD). Außerdem sind in der Tabelle sowohl SD1_D2 als auch SD1_D6 mit „Daten 6“ beschrieben. Die Quelle erklärt weder die zwei nicht aufgeführten GPIOs noch die doppelte Bezeichnung. Prüfen Sie die vollständige SD1-Pinbelegung vor Abschluss des Schaltplans anhand des Chip-Datenblatts.

<div align="center"><em>Tabelle 5.6-4: SD2-Signalverbindungen</em></div>

<div align="center" markdown>

| SD2-Signal | I/O-Signal | Beschreibung |
|:---|:---|:---|
| SD2_CMD | PA70 | Befehlssignal |
| SD2_D1 | PA75 | Daten 1 |
| SD2_D0 | PA76 | Daten 0 |
| SD2_CLK | PA77 | Taktsignal |
| SD2_D2 | PA79 | Daten 2 |
| SD2_D3 | PA81 | Daten 3 |

</div>

#### 5.6.3. USB {#553-usb}

Der USB der SF32LB58x-Serie unterstützt USB 2.0 HS im Host- und Device-Modus. Sehen Sie für USB DP und DM jeweils einen TVS-Schutz gegen Masse vor, mit einer TVS-Sperrschichtkapazität unter 5 pF. Führen Sie die DP/DM-Leiterbahnen auf der PCB als Differenzpaar mit einer Impedanz von 90 Ω.

![Abbildung 5.6-5: USB-Schnittstellenschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.6-5: USB-Schnittstellenschaltung</em></div>

### 5.7. Fertigung {#56-manufacturing}

#### 5.7.1. Debug- und Download-Schnittstelle {#561-debug-and-download-interface}
Die SF32LB58x-Serie unterstützt die Arm®-Standard-SWD-Debug-Schnittstelle zur Verbindung mit EDA-Tools für Einzelschritt-Debugging. Beim Anschluss einer SEGGER®-J-Link®-Sonde muss deren Versorgung auf „extern“ umkonfiguriert werden, sodass sie von der SF32LB58x-Platine selbst gespeist wird.

![Abbildung 5.7-1: SWD-Debug-Schnittstellenschaltung](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.7-1: SWD-Debug-Schnittstellenschaltung</em></div>

Der SF32LB58x bietet eine SWD-Schnittstelle sowie sechs wählbare UART-Schnittstellen für die Debug-Ausgabe.

<div align="center"><em>Tabelle 5.7-1: Debug-Port-Verbindungen</em></div>

<div align="center" markdown>

| UART-Signal | I/O | Beschreibung |
|:---|:---|:---|
| TXD1 | PA31 | UART1 RXD, HCPU-Standard-Print-Port |
| RXD1 | PA32 | UART1 TXD, HCPU-Standard-Print-Port |
| TXD2 | PA28 | UART2 RXD |
| RXD2 | PA29 | UART2 TXD |
| TXD3 | PA21 | UART3 RXD |
| RXD3 | PA20 | UART3 TXD |
| TXD4 | PB37 | UART4 RXD, LCPU-Standard-Print-Port |
| RXD4 | PB36 | UART4 TXD, LCPU-Standard-Print-Port |
| TXD5 | PB18 | UART5 RXD |
| RXD5 | PB17 | UART5 TXD |
| TXD6 | PB14 | UART6 RXD |
| RXD6 | PB13 | UART6 TXD |
| SWCLK | PB07 | J-Link-Taktsignal |
| SWDIO | PB11 | J-Link-Datensignal |

</div>

!!! note "Hinweis"
    UARTx-RXD-Signale dürfen nicht offen bleiben. Aktivieren Sie während der Softwareinitialisierung den internen Pull-up.

#### 5.7.2. Produktionsprogrammierung und Hardware-Zugang {#562-production-flashing-and-hardware-access}

Planen Sie den Zugang für Programmierung, Wiederherstellung und Kalibrierung in der Fertigung, bevor Gehäuse und Prüfadapter festgelegt werden. Mindestens müssen Stromversorgung, Masse, SWD, erforderliche UART-Debug-Ausgänge und Boot-/Konfigurationspins zugänglich bleiben. Sehen Sie außerdem die erforderlichen Reset- oder PMIC-Steuerpunkte auf der Platine vor, damit sich ein Gerät mit nicht startender Firmware wiederherstellen lässt.

#### 5.7.3. Schaltplan- und PCB-Zeichnungs-Checklisten {#563-schematic-and-pcb-drawing-checklists}

- [ ] Die Stromversorgung (direkt über die integrierte PMU oder mit SF30147C) entspricht dem Leistungsbudget des Systems
- [ ] Der Mode-Pin zur Boot-Konfiguration besitzt einen externen 10-kΩ-Widerstand; auf Produktionsplatinen ist ein Testpunkt vorgesehen
- [ ] Die Spezifikationen des 48-MHz-/32,768-kHz-Quarzes entsprechen den Empfehlungen; die GND-Fläche der Lage 2 unter dem Quarz ist entfernt
- [ ] Die Auswahl der Speicherschnittstelle (MPI4/SD1/SD2) entspricht der Boot-Konfiguration, und der PA43-Stromversorgungssteuer-Pin für externen Flash ist bestätigt
- [ ] Die Auswahl der Display-Schnittstelle (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) entspricht der LCDC1-/LCDC2-Pinzuweisung
- [ ] Die Pins des Debug-Ports (SWD + 6× UART) sind bedarfsgerecht zugewiesen; der interne Pull-up für UART-RXD ist aktiviert
- [ ] Die Multiplexbelegung von I2S/PDM und analogem Audio ist geprüft; die Anforderungen an die Differenzleitungen sind erfüllt
- [ ] USB DP und DM sind jeweils mit TVS-Schutz gegen Masse versehen; Sperrschichtkapazität < 5 pF

[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
