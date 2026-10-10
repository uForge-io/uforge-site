---
icon: lucide/circuit-board
description: "Schaltplan-Design-Richtlinien für den SF32LB56x-MCU: Stromversorgungssystem, Betriebsmodi und Weckquellen, Takterzeugung, HF, Display-/Touch-/Hintergrundbeleuchtungs-Schnittstellen, Speicher/Sensoren/Audio/Konnektivität sowie Fertigung."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB56x Hardware-Design-Leitfaden — Schaltplanrichtlinien { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "Teil des SF32LB56x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 5, die Schaltplanrichtlinien. Beginnen Sie mit der [Übersicht zum SF32LB56x Hardware-Design-Leitfaden](SF32LB56x_hardware_design_guide.md), um das Gerät auszuwählen und den vollständigen Designablauf kennenzulernen. Fahren Sie dann mit der [Schaltplan-Checkliste](SF32LB56x_schematic_checklist.md) fort oder springen Sie direkt zu den [PCB-Layout-Richtlinien](SF32LB56x_pcb_layout.md).

## 5. Schaltplan-Design-Richtlinien { #5-schematic-design-guidelines }

### 5.1. Stromversorgungssystem { #51-power-system }

Versorgungsschienen des Prozessors, erforderliche lokale Kondensatoren, Zuordnung der PMIC-Ausgänge, Reset-Zeitverhalten und Anschlüsse der Ladeschaltung gemeinsam prüfen. Bei den U- und V-Varianten ist das Vorgehen für das Stromversorgungsdesign gleich, die Versorgungspin-Bezeichnungen und die Lastzuweisung unterscheiden sich jedoch.

<div align="center"><em>Tabelle 5.1-1: SF32LB56xU Prozessor-Spannungsschienen</em></div>

<div align="center" markdown>

| PMU-Stromversorgungspin | Minimalspannung (V) | Typische Spannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,7 | 1,8 | 3,6 | 100 | PVDD-Stromversorgungseingang |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | BUCK_LX-Ausgang, mit der Induktivität verbunden; interner Stromversorgungseingang, verbunden mit dem anderen Ende der Induktivität und einem externen Kondensator |
| LDO1_VOUT | - | 1,1 | - | 50 | LDO1-Ausgang, mit externem Kondensator |
| LDO2_VOUT | - | 0,9 | - | 20 | LDO2-Ausgang, mit externem Kondensator |
| VDD_RET | - | 0,9 | - | 1 | RET-LDO-Ausgang, mit externem Kondensator |
| VDD_RTC | - | 1,1 | - | 1 | RTC-LDO-Ausgang, mit externem Kondensator |
| MIC_BIAS | 1,4 | - | 2,8 | - | Mikrofon-Stromversorgungsausgang |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Analoger Stromversorgungseingang + RFPA-Stromversorgungseingang |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Analoge Audio-Stromversorgung |
| VDDIO1 | 1,71 | 1,8 | 1,98 | - | Stromversorgungseingang für den intern gehäusten Speicherbaustein des Big-Cores |
| VDDIO2 | 1,71 | 1,8 | 3,45 | - | Stromversorgungseingang für PA-GPIO (außer PA5~11) |
| VDDIO3 | 1,71 | 1,8 | 3,45 | - | Stromversorgungseingang für PA5~11 |
| VDDIO4 | 1,71 | 1,8 | 3,45 | - | Stromversorgungseingang für PB-GPIO und intern gehäustes Flash des Small-Cores |
| GPADC_VREF | - | - | - | - | GPADC-Referenzspannungseingang; nur ein externer Kondensator wird angeschlossen, keine externe Stromversorgung erforderlich |
| AUD_VREF | - | - | - | - | Audio-Referenzspannungseingang; nur ein externer Kondensator wird angeschlossen, keine externe Stromversorgung erforderlich |

</div>

<div align="center"><em>Tabelle 5.1-2: SF32LB56xV Prozessor-Spannungsschienen</em></div>

<div align="center" markdown>

| PMU-Stromversorgungspin | Minimalspannung (V) | Typische Spannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1,71 | 1,8 | 3,6 | 100 | PVDD-Stromversorgungseingang |
| BUCK_LX BUCK_FB | - | 1,25 | - | 100 | BUCK_LX-Ausgang, mit der Induktivität verbunden; interner Stromversorgungseingang, verbunden mit dem anderen Ende der Induktivität und einem externen Kondensator |
| LDO1_VOUT | - | 1,1 | - | 50 | LDO1-Ausgang, mit externem Kondensator verbunden |
| LDO2_VOUT | - | 0,9 | - | 20 | LDO2-Ausgang, mit externem Kondensator verbunden |
| VDD_RET | - | 0,9 | - | 1 | RET-LDO-Ausgang, mit externem Kondensator verbunden |
| VDD_RTC | - | 1,1 | - | 1 | RTC-LDO-Ausgang, mit externem Kondensator verbunden |
| MIC_BIAS | 1,4 | - | 2,8 | - | Mikrofon-Stromversorgungsausgang |
| AVDD_BRF | 1,71 | 1,8 | 3,3 | 1 | HF-Stromversorgungseingang |
| AVDD33_ANA | 3,15 | 3,3 | 3,45 | 50 | Analoger Stromversorgungseingang + RFPA-Stromversorgungseingang |
| AVDD33_AUD | 3,15 | 3,3 | 3,45 | 50 | Analoge Audio-Stromversorgung |
| VDDIOA | 1,71 | 1,8 | 3,45 | - | PA12-PA78-I/O-Stromversorgungseingang |
| VDDIOA2 | 1,71 | 1,8 | 3,45 | - | PA0-PA11-I/O-Stromversorgungseingang |
| VDDIOB | 1,71 | 1,8 | 3,45 | - | PB-I/O-Stromversorgungseingang |
| VDDIOSA | 1,71 | 1,8 | 1,98 | - | SIPA-Stromversorgungseingang |
| VDDIOSB | 1,71 | 1,8 | 1,98 | - | SIPB-Stromversorgungseingang |
| VDDIOSC | 1,71 | 1,8 | 1,98 | - | SIPC-Stromversorgungseingang |
| GPADC_VREF | - | - | - | - | GPADC-Referenzspannungseingang; nur ein externer Kondensator wird angeschlossen, keine externe Stromversorgung erforderlich |
| AUD_VREF | - | - | - | - | Audio-Referenzspannungseingang; nur ein externer Kondensator wird angeschlossen, keine externe Stromversorgung erforderlich |

</div>

<div align="center"><em>Tabelle 5.1-3: SF32LB56xU Erforderliche Stromversorgungskondensatoren</em></div>

<div align="center" markdown>

| Stromversorgungspin | Kondensator | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Mindestens zwei Kondensatoren, 10 µF und 0,1 µF, nahe am Pin platzieren. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Mindestens zwei Kondensatoren, 4,7 µF und 0,1 µF, nahe am Pin platzieren. |
| LDO1_VOUT | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| LDO2_VOUT | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| VDD_RET | 0,47 µF | Mindestens einen 0,47-µF-Kondensator nahe am Pin platzieren. |
| VDD_RTC | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| AVDD33_ANA | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| GPADC_VREF | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| AVDD33_AUD | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| AUD_VREF | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| MIC_BIAS | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIO1 | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIO2 | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIO3 | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIO4 | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |

</div>

<div align="center"><em>Tabelle 5.1-4: SF32LB56xV Erforderliche Stromversorgungskondensatoren</em></div>

<div align="center" markdown>

| Stromversorgungspin | Kondensator | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| PVDD | 0,1 µF + 10 µF | Mindestens zwei Kondensatoren, 10 µF und 0,1 µF, nahe am Pin platzieren. |
| BUCK_LX BUCK_FB | 0,1 µF + 4,7 µF | Mindestens zwei Kondensatoren, 4,7 µF und 0,1 µF, nahe am Pin platzieren. |
| LDO1_VOUT | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| LDO2_VOUT | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| VDD_RET | 0,47 µF | Mindestens einen 0,47-µF-Kondensator nahe am Pin platzieren. |
| VDD_RTC | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| AVDD_BRF | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| AVDD33_ANA | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| GPADC_VREFP | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| AVDD33_AUD | 4,7 µF | Mindestens einen 4,7-µF-Kondensator nahe am Pin platzieren. |
| AUD_VREF | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| MIC_BIAS | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOA | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOA2 | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOB | 1 µF | Mindestens einen 1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOSA | 0,1 µF | Mindestens einen 0,1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOSB | 0,1 µF | Mindestens einen 0,1-µF-Kondensator nahe am Pin platzieren. |
| VDDIOSC | 0,1 µF | Mindestens einen 0,1-µF-Kondensator nahe am Pin platzieren. |

</div>

<div align="center"><em>Tabelle 5.1-5: Ausgangsdaten des SF30147C-PMIC (Beispiel für die U-Variante)</em></div>

<div align="center" markdown>

| SF30147C-Stromversorgungspin | Minimalspannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | 1,8-V-Ausgang; die Zuordnung zu Versorgungspins der U-Variante darf nicht aus dieser Zeile abgeleitet werden |
| LVSW1 | 1,8 | 1,8 | 100 | 1,8-V-Stromversorgungsausgang |
| LVSW2 | 1,8 | 1,8 | 100 | 1,8-V-Stromversorgungseingang für G-Sensor |
| LVSW3 | 1,8 | 1,8 | 150 | 1,8-V-Stromversorgungseingang für Herzfrequenzsensor |
| LVSW4 | 1,8 | 1,8 | 150 | 1,8-V-Stromversorgungseingang für LCD |
| LVSW5 | 1,8 | 1,8 | 150 | 1,8-V-Stromversorgungsausgang |
| LDO1 | 2,8 | 3,3 | 100 | 2,8-bis-3,3-V-Ausgang; die Zuordnung zu Versorgungspins der U-Variante darf nicht aus dieser Zeile abgeleitet werden |
| LDO2 | 2,8 | 3,3 | 100 | Motor-Stromversorgungseingang |
| LDO3 | 2,8 | 3,3 | 100 | 3,3-V-Stromversorgungseingang für LCD |
| LDO4 | 2,8 | 3,3 | 100 | 3,3-V-Stromversorgungseingang für Herzfrequenzsensor |
| HVSW1 | 2,8 | 5 | 150 | Stromversorgungseingang für analogen Class-K-PA |
| HVSW2 | 2,8 | 5 | 150 | Stromversorgungseingang für GPS |

</div>

!!! warning "PMIC-Versorgungsschienen der U-Variante prüfen"
    In SiFlis ursprünglicher Stromverteilungstabelle für die U-Variante stehen VDDIOA, VDDIOA2, VDDIOB, VDDIOSA/B/C und AVDD_BRF. Diese Bezeichnungen stimmen nicht mit der Prozessorspannungstabelle der U-Variante im selben Leitfaden überein. Die obige Tabelle enthält daher nur die Spannungs- und Stromgrenzwerte der PMIC-Ausgänge. Leiten Sie daraus keine Zuordnung zu den Chip-Versorgungspins der U-Variante ab; prüfen Sie die tatsächliche Verbindung vor der Layoutfreigabe anhand der passenden Schaltplanrevision und des SF30147C-Datenblatts.

<div align="center"><em>Tabelle 5.1-6: SF30147C-PMIC-Stromverteilungsbeispiel für V</em></div>

<div align="center" markdown>

| SF30147C-Stromversorgungspin | Minimalspannung (V) | Maximalspannung (V) | Maximalstrom (mA) | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1,8 | 1,8 | 500 | 1,8-V-Stromversorgungseingang für SF32LB56xV PVDD, VDDIOA, VDDIOA2, VDDIOB, VDDIOSA, VDDIOSB, VDDIOSC, AVDD_BRF usw. |
| LVSW1 | 1,8 | 1,8 | 100 | Logik-Stromversorgungseingang für I2S-Class-K-PA |
| LVSW2 | 1,8 | 1,8 | 100 | 1,8-V-Stromversorgungseingang für G-Sensor |
| LVSW3 | 1,8 | 1,8 | 150 | 1,8-V-Stromversorgungseingang für Herzfrequenzsensor |
| LVSW4 | 1,8 | 1,8 | 150 | 1,8-V-Stromversorgungseingang für LCD |
| LVSW5 | 1,8 | 1,8 | 150 | Stromversorgungseingang für eMMC-CORE |
| LDO1 | 2,8 | 3,3 | 100 | 3,3-V-Stromversorgungseingang für SF32LB56xV AVDD33_ANA, AVDD33_AUD, VDDIOA2 usw. |
| LDO2 | 2,8 | 3,3 | 100 | Stromversorgungseingang für eMMC oder SD NAND |
| LDO3 | 2,8 | 3,3 | 100 | 3,3-V-Stromversorgungseingang für LCD |
| LDO4 | 2,8 | 3,3 | 100 | 3,3-V-Stromversorgungseingang für Herzfrequenzsensor |
| HVSW1 | 2,8 | 5 | 150 | Stromversorgungseingang für analogen Class-K-PA |
| HVSW2 | 2,8 | 5 | 150 | Stromversorgungseingang für GPS |

</div>

![Abbildung 5.1-1: SF32LB56xU POR-/BOR-Timing](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-1: SF32LB56xU POR-/BOR-Timing</em></div>

![Abbildung 5.1-2: SF32LB56xV POR-/BOR-Timing](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-2: SF32LB56xV POR-/BOR-Timing</em></div>

![Abbildung 5.1-3: SF32LB56xU BUCK-Referenzschaltung](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-3: SF32LB56xU BUCK-Referenzschaltung</em></div>

![Abbildung 5.1-4: SF32LB56xV BUCK-Referenzschaltung](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-4: SF32LB56xV BUCK-Referenzschaltung</em></div>

![Abbildung 5.1-5: SF32LB56xU LDO-Referenzschaltung](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-5: SF32LB56xU LDO-Referenzschaltung</em></div>

![Abbildung 5.1-6: SF32LB56xV LDO-Referenzschaltung](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-6: SF32LB56xV LDO-Referenzschaltung</em></div>

![Abbildung 5.1-7: SF32LB56xU Lade-Referenzschaltung](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-7: SF32LB56xU Lade-Referenzschaltung</em></div>

![Abbildung 5.1-8: SF32LB56xV Lade-Referenzschaltung](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-8: SF32LB56xV Lade-Referenzschaltung</em></div>

Ohne Power-Path-Management ist das System zusammen mit dem Akku direkt an VBAT angeschlossen. Das ist kostengünstiger, nachgeschaltete Schaltungen lassen sich jedoch nicht vollständig vom Akku trennen. Dadurch steigt der Leckstrom und das Ziel für den stromsparenden Shipping Mode wird verfehlt. Bei tiefentladenem Akku muss der Erhaltungsladestrom des Ladegeräts größer als die Summe aus System- und Leckstrom sein (i1+i2 im Quelldiagramm). Im laufenden Betrieb muss auch der Konstantladestrom i1+i2 übersteigen; andernfalls verbraucht die Systemlast einen Teil des Ladestroms und der Akku wird möglicherweise nicht vollständig geladen. Ein Ladegerät mit Power-Path-Management trennt die Systemversorgung über VSYS von der Akkuladung über VBAT, unterstützt den Shipping Mode und kann das System auch bei tiefentladenem Akku aus VSYS versorgen.

Für die U-Variante stehen drei Versorgungstopologien zur Wahl, abhängig von der I/O-Spannung der Peripherie und dem Leistungsziel des Systems. Bei allen drei werden AVDD33_ANA und AVDD33_AUD mit 3,3 V versorgt. Die Topologie mit dem niedrigsten Verbrauch versorgt PVDD und VDDIO1–VDDIO4 mit 1,8 V und verwendet Peripherie mit 1,8-V-I/O. Die mittlere Topologie hält PVDD und VDDIO1 auf 1,8 V und versorgt VDDIO2–VDDIO4 sowie die Peripherie-I/Os mit 3,3 V. Bei der Topologie mit dem höchsten Verbrauch bleibt nur VDDIO1 für den integrierten PSRAM auf 1,8 V; PVDD, VDDIO2–VDDIO4 und die Peripherie-I/Os werden mit 3,3 V versorgt. Verwenden Sie Lastschalter für die dynamische Stromversorgung externer Module und halten Sie diese bei Nichtgebrauch standardmäßig ausgeschaltet. Für Module, die dauerhaft eingeschaltet bleiben müssen, sollten Bauteile mit niedrigem Ruhestrom gewählt werden. Der Hardware-Standardpegel des Lastschalter-GPIOs muss zur Enable-Polarität passen, damit der Schalter beim Start ausgeschaltet bleibt. SiFli empfiehlt einen 1-MΩ-Pull-up oder -Pull-down am Enable-Eingang.

Die PMU der U-Variante schließt den Power-on-Reset ab, sobald PVDD 1,5 V erreicht. Sinkt PVDD, wird beim konfigurierten BOR-Schwellenwert ein Brownout-Reset ausgelöst; der Schwellenwert ist von 1,5 bis 2,5 V einstellbar.

### 5.2. Betriebsmodi und Weckquellen { #52-operating-modes-and-wake-sources }

Entscheidungen zu Betriebsmodus, Weckquelle, Versorgung der Pull-up-Widerstände und Leckstrom sollten gemeinsam geprüft werden. Für Tasten, Touchscreens, Sensorinterrupts, Ladeereignisse und andere Wecksignale im Low-Power-Betrieb sollten Pins verwendet werden, die aus dem jeweiligen Zustand aufwecken können.

<div align="center"><em>Tabelle 5.2-1: SF32LB56xU-Betriebsmodi</em></div>

<div align="center" markdown>

| Betriebsmodus | CPU | Peripherie | SRAM | IO | LPTIM | Weckquelle | Weckzeit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | Läuft | Läuft | Zugänglich | Umschaltbar | Läuft |  |  |
| WFI/WFE | Angehalten | Läuft | Zugänglich | Umschaltbar | Läuft | Jeder Interrupt | < 0,5 µs |
| DEEPWFI | Angehalten | Läuft | Zugänglich | Umschaltbar | Läuft | Jeder Interrupt | < 5 µs |
| Light Sleep | Angehalten | Angehalten | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft | RTC, GPIO, LPTIM, Cross-System, Bluetooth, Komparator | < 100 µs |
| Deep Sleep | Angehalten | Angehalten | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft |  | < 300 µs |
| Standby | Reset | Reset | Nicht zugänglich, LP vollständig erhalten, HP erhält nur 160 KB | Pegel gehalten | Läuft | RTC, Tasten, LPTIM, Cross-System, Bluetooth | 1,5 ms + Erholung |
| Hibernate rtc | Reset | Reset | Daten nicht erhalten | Hochohmig | Reset | RTC, Tasten | > 2 ms |
| Hibernate pin | Reset | Reset | Daten nicht erhalten | Hochohmig | Reset | Tasten | > 2 ms |

</div>

<div align="center"><em>Tabelle 5.2-2: SF32LB56xV-Betriebsmodi</em></div>

<div align="center" markdown>

| Betriebsmodus | CPU | Peripherie | SRAM | IO | LPTIM | Weckquelle | Weckzeit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Active | Läuft | Läuft | Zugänglich | Umschaltbar | Läuft |  |  |
| WFI/WFE | Angehalten | Läuft | Zugänglich | Umschaltbar | Läuft | Jeder Interrupt | < 0,5 µs |
| DEEPWFI | Angehalten | Läuft | Zugänglich | Umschaltbar | Läuft | Jeder Interrupt | < 5 µs |
| Light Sleep | Angehalten | Angehalten | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft | RTC/GPIO/LPTIM/LPCOMP/Cross-System-Interrupt/Bluetooth | < 100 µs |
| Deep Sleep | Angehalten | Angehalten | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft | RTC/GPIO/LPTIM/LPCOMP/Cross-System-Interrupt/Bluetooth | < 300 µs |
| Standby | Reset | Reset | Nicht zugänglich, LP vollständig erhalten, HP erhält nur 160 KB | Pegel gehalten | Läuft | RTC/Tasten/LPTIM/Cross-System-Interrupt/Bluetooth | 1,5 ms + Erholung |
| Hibernate rtc | Reset | Reset | Daten nicht erhalten | Hochohmig | Reset | RTC/Tasten | > 2 ms |
| Hibernate pin | Reset | Reset | Daten nicht erhalten | Hochohmig | Reset | Tasten | > 2 ms |

</div>

<div align="center"><em>Tabelle 5.2-3: SF32LB56xU-Weck-Interruptquellen</em></div>

<div align="center" markdown>

| Interruptquelle | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Interruptsignal 0 |
| WKUP_PIN1 | PB33 | Interruptsignal 1 |
| WKUP_PIN2 | PB34 | Interruptsignal 2 |
| WKUP_PIN5 | PA50 | Interruptsignal 5 |
| WKUP_PIN6 | PA51 | Interruptsignal 6 |
| WKUP_PIN10 | PBR0 | Interruptsignal 10 |
| WKUP_PIN11 | PBR1 | Interruptsignal 11 |
| WKUP_PIN12 | PBR2 | Interruptsignal 12 |

</div>

<div align="center"><em>Tabelle 5.2-4: SF32LB56xV-Weck-Interruptquellen</em></div>

<div align="center" markdown>

| Interruptquelle | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | Interruptsignal 0 |
| WKUP_PIN1 | PB33 | Interruptsignal 1 |
| WKUP_PIN2 | PB34 | Interruptsignal 2 |
| WKUP_PIN3 | PB35 | Interruptsignal 3 |
| WKUP_PIN4 | PB36 | Interruptsignal 4 |
| WKUP_PIN5 | PA50 | Interruptsignal 5 |
| WKUP_PIN6 | PA51 | Interruptsignal 6 |
| WKUP_PIN7 | PA52 | Interruptsignal 7 |
| WKUP_PIN8 | PA53 | Interruptsignal 8 |
| WKUP_PIN9 | PA54 | Interruptsignal 9 |
| WKUP_PIN10 | PBR0 | Interruptsignal 10 |
| WKUP_PIN11 | PBR1 | Interruptsignal 11 |
| WKUP_PIN12 | PBR2 | Interruptsignal 12 |
| WKUP_PIN13 | PBR3 | Interruptsignal 13 |

</div>

BOOT_MODE legt das Startverhalten fest: High aktiviert den Downloadmodus. Bei Low sucht die ROM nach einem Benutzerprogramm, startet es gegebenenfalls und wechselt andernfalls in den Downloadmodus. Der Mode-Pin der U-Variante hat einen internen Pull-down, darf unbeschaltet bleiben, wenn er nicht verwendet wird, und gehört zur VDDIO2-Domäne. Der Mode-Pin der V-Variante gehört zu VDDIOA und sollte mit einem 10-kΩ-Pull-up oder -Pull-down stabil gehalten werden; nicht offen lassen und nicht durch Störungen umschalten lassen. Für Produktionsboards einen Mode-Testpunkt vorsehen; auf Entwicklungsboards ist ein Jumper für die Wiederherstellung hilfreich.

Berücksichtigen Sie die Speicher-I/O-Versorgung bei stromsparenden Abschaltungen. Im Standby der U-Variante bleiben GPIO-Pegel erhalten und VDDIO1 kann eingeschaltet bleiben; versetzen Sie an MPI1/MPI2 angeschlossene Speicher in den Niedrigenergiemodus. Im Hibernate bleiben GPIO-Pegel nicht erhalten. Schalten Sie daher VDDIO1 ab, um Leckstrom über die I/O des integrierten Speichers zu verhindern. Halten Sie bei der V-Variante die I/O des integrierten Speichers im Standby versorgt. Schalten Sie vor Hibernate VDDIOSA und VDDIOSB über PBR0 ab und versetzen Sie den NOR-Flash in Deep Power-Down. VDDIOSC muss weiterhin versorgt werden.

### 5.3. Takterzeugung { #53-clock-generation }

<div align="center"><em>Tabelle 5.3-1: Kristallanforderungen</em></div>

<div align="center" markdown>

| Kristall | Anforderungen an die Kristallspezifikation | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF (empfohlener Wert: 8,8 pF); △F/F0 ≤ ±10 ppm; ESR ≤ 30 Ω (empfohlener Wert: 22 Ω) | Die Leistungsaufnahme des Quarzoszillators hängt von CL und ESR ab. Je kleiner CL und ESR, desto geringer die Leistungsaufnahme. Wählen Sie innerhalb des vorgegebenen Bereichs Bauteile mit möglichst kleinen CL- und ESR-Werten. Sehen Sie neben dem Quarz Platz für parallel geschaltete Anpassungskondensatoren vor. Bei CL < 12 pF müssen keine Kondensatoren bestückt werden. |
| 32,768 kHz | CL ≤ 12,5 pF (empfohlener Wert: 7 pF); △F/F0 ≤ ±20 ppm; ESR ≤ 80 kΩ (empfohlener Wert: 38 kΩ) | Die Leistungsaufnahme des Quarzes hängt von CL und ESR ab. Je kleiner CL und ESR, desto geringer die Leistungsaufnahme. Wählen Sie innerhalb des vorgegebenen Bereichs Bauteile mit möglichst kleinen CL- und ESR-Werten. Sehen Sie neben dem Quarz Platz für parallel geschaltete Anpassungskondensatoren vor. Bei CL < 12,5 pF muss kein Kondensator bestückt werden. |

</div>

<div align="center"><em>Tabelle 5.3-2: Empfohlene Kristallmodelle</em></div>

<div align="center" markdown>

| Modell | Hersteller | Parameter |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz; △F/F0 = −6 bis +8 ppm; CL = 8,8 pF; ESR ≤ 22 Ω; TOPR = −30 bis +85 °C; Gehäuse: 2016 (metrisch) |
| ETST00327000LE | Hosonic | F0 = 32,768 kHz; △F/F0 = −20 bis +20 ppm; CL = 7 pF; ESR ≤ 70 kΩ; TOPR = −40 bis +85 °C; Gehäuse: 3215 (metrisch) |
| SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz; △F/F0 = −10 bis +10 ppm; CL = 8,8 pF; ESR ≤ 40 Ω; TOPR = −20 bis +75 °C; Gehäuse: 2016 (metrisch) |
| SF32K32768D71T01 | TKD | F0 = 32,768 kHz; △F/F0 = −20 bis +20 ppm; CL = 7 pF; ESR ≤ 70 kΩ; TOPR = −40 bis +85 °C; Gehäuse: 3215 (metrisch) |

</div>

Die 48-MHz- und 32,768-kHz-Quarze nahe am Chip platzieren, Footprints für Anpassungskondensatoren vorsehen und die Quarz-Leiterbahnen vor Störungen durch BUCK, HF, Display, Motor und Ladeschaltung schützen.

### 5.4. HF { #54-rf }

Bei SF32LB56xU- und SF32LB56xV-Designs den HF-Pfad als Leiterbahn mit kontrolliertem Wellenwiderstand von 50 Ω auslegen. Ist die gewählte Antenne bereits angepasst, sind normalerweise keine zusätzlichen HF-Bauteile erforderlich. Dennoch sollte ein π-Anpassungsnetzwerk zur Unterdrückung unerwünschter Aussendungen und für den abschließenden Antennenabgleich vorgesehen werden.

Das HF-Anpassungsnetzwerk nahe am Chip und nicht an der Antenne platzieren. Die AVDD_BRF-Filterung nahe am Chip-Pin halten und die Kondensatormassen direkt mit der Hauptmasse verbinden. HF nach Möglichkeit auf der Außenlage routen, Durchkontaktierungen und scharfe Ecken vermeiden, entlang beider Seiten der HF-Leiterbahn dichte Masse-Durchkontaktierungen vorsehen und DC-DC-, VBAT-, Quarz-, Hochgeschwindigkeitstakt-, I2C-, SPI-, SDIO-, I2S- und UART-Signale vom HF-Bereich fernhalten.

### 5.5. Display-, Touch- und Hintergrundbeleuchtungs-Schnittstellen { #55-display-touch-and-backlight-interfaces }

Die Auswahl der Display-Schnittstelle hängt vom Gehäuse ab. Für die U-Variante sind SPI-/QSPI- und JDI-Displays dokumentiert; für die V-Variante zusätzlich MCU8080 und DPI. Touch-Interrupt, Reset und Hintergrundbeleuchtungssteuerung sollten so zugewiesen werden, dass Weckfunktionen und der Zugang während der Fertigung berücksichtigt sind.

<div align="center"><em>Tabelle 5.5-1: Beispiele für Display-Treiber</em></div>

<div align="center" markdown>

| Modell | Hersteller | Auflösung | Typ | Schnittstelle |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | 3-Draht-SPI, 4-Draht-SPI, Dual-Data-SPI, Quad-Data-SPI, MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | 3-Draht-SPI, 4-Draht-SPI, Dual-Data-SPI, Quad-Data-SPI, 8-Bit-8080-Serie-MCU, MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | Quad-Data-SPI, MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | 3-Draht-SPI, 4-Draht-SPI, Dual-Data-SPI, Quad-Data-SPI, 8-Bit-8080-Serie-MCU, MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | Quad-Data-SPI |
| GC9C01 | Galaxycore | 360*360 | TFT | Quad-Data-SPI |
| ST77903 | Sitronix | 400*400 | TFT | Quad-Data-SPI |

</div>

<div align="center"><em>Tabelle 5.5-2: SF32LB56xU SPI-/QSPI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| SPI-Signal | SF32LB56xU-Pin | SS6700A-Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | Enable-Signal |
| WRX_SCL | PA37 | PA37 | Taktsignal |
| DCX | PA39 | PA39 | Daten-/Befehlssignal im 4-Draht-SPI-Modus; Daten 1 im Quad-SPI-Modus |
| SDI_RDX | PA38 | PA38 | Dateneingangssignal im 3-/4-Draht-SPI-Modus; Daten 0 im Quad-SPI-Modus |
| SDO | PA38 | PA38 | Datenausgangssignal im 3-/4-Draht-SPI-Modus; bitte mit SDI_RDX kurzschließen |
| D0 | PA40 | PA40 | Daten 2 im Quad-SPI-Modus |
| D1 | PA41 | PA41 | Daten 3 im Quad-SPI-Modus |
| REST | PA05 | PB04 | Reset-Signal für das Display-Panel |
| TE | PA33 | PA33 | Tearing-Effect-Signal zur Bildsynchronisierung am MCU |

</div>

<div align="center"><em>Tabelle 5.5-3: SF32LB56xU JDI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| JDI-Signal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Chip-Select-Signal |
| JDI_SCLK | PA41 | Serielles Taktsignal |
| JDI_SO | PA40 | Serielles Datenausgangssignal |
| JDI_DISP | PA36 | Display-Ein/Aus-Umschaltsignal |
| JDI_EXTCOMIN | PA38 | COM-Inversionspolaritäts-Eingang |

</div>

<div align="center"><em>Tabelle 5.5-4: SF32LB56xU Touch- und Hintergrundbeleuchtungs-Schnittstellen</em></div>

<div align="center" markdown>

| Touchscreen- und Hintergrundbeleuchtungssignal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| Interrupt | PA50 | Touch-Status-Interruptsignal (wake-fähig) |
| I2C1_SCL | PA48 | Touchscreen-I2C-Taktsignal |
| I2C1_SDA | PA49 | Touchscreen-I2C-Datensignal |
| BL_PWM | PA31 | PWM-Steuersignal der Hintergrundbeleuchtung |
| Reset | PB18 | Touch-Reset-Signal |

</div>

<div align="center"><em>Tabelle 5.5-5: SF32LB56xV SPI-/QSPI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| SPI-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CSX | PA36 | Enable-Signal |
| WRX_SCL | PA37 | Taktsignal |
| DCX | PA39 | Daten-/Befehlssignal im 4-Draht-SPI-Modus; Daten 1 im Quad-SPI-Modus |
| SDI_RDX | PA38 | Dateneingangssignal im 3-/4-Draht-SPI-Modus; Daten 0 im Quad-SPI-Modus |
| SDO | PA38 | Datenausgangssignal im 3-/4-Draht-SPI-Modus; mit SDI_RDX kurzschließen |
| D[0] | PA40 | Daten 2 im Quad-SPI-Modus |
| D[1] | PA41 | Daten 3 im Quad-SPI-Modus |
| REST | PA43 | Reset-Signal für das Display |
| TE | PA33 | Tearing-Effect-Signal zur Bildsynchronisierung am MCU |

</div>

<div align="center"><em>Tabelle 5.5-6: SF32LB56xV MCU8080-Display-Schnittstelle</em></div>

<div align="center" markdown>

| MCU8080-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CSX | PA36 | Chip-Select |
| WRX | PA37 | Schreib-Strobe-Signal zum Schreiben von Daten |
| DCX | PA39 | Auswahl zwischen Display-Daten/-Befehl |
| RDX | PA38 | Lese-Strobe-Signal für Daten |
| D[0] | PA40 | Daten 0 |
| D[1] | PA41 | Daten 1 |
| D[2] | PA28 | Daten 2 |
| D[3] | PA29 | Daten 3 |
| D[4] | PA30 | Daten 4 |
| D[5] | PA31 | Daten 5 |
| D[6] | PA32 | Daten 6 |
| D[7] | PA34 | Daten 7 |
| REST | PA43 | Reset |
| TE | PA33 | Tearing-Effect-Signal zur Bildsynchronisierung am MCU |

</div>

<div align="center"><em>Tabelle 5.5-7: SF32LB56xV DPI-Display-Schnittstelle</em></div>

<div align="center" markdown>

| DPI-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CLK | PA45 | Taktsignal |
| DE | PA47 | Datenfreigabesignal |
| HSYNC | PA44 | Horizontales Synchronisationssignal |
| VSYNC | PA42 | Vertikales Synchronisationssignal |
| SD | PA50 | Steuert das Abschalten des Displays |
| CM | PA51 | Schaltet zwischen Normal Color und Reduced Color Mode um |
| R0 | PA14 | Pixelsignal |
| R1 | PA13 | Pixelsignal |
| R2 | PA16 | Pixelsignal |
| R3 | PA24 | Pixelsignal |
| R4 | PA19 | Pixelsignal |
| R5 | PA21 | Pixelsignal |
| R6 | PA23 | Pixelsignal |
| R7 | PA25 | Pixelsignal |
| G0 | PA28 | Pixelsignal |
| G1 | PA30 | Pixelsignal |
| G2 | PA32 | Pixelsignal |
| G3 | PA33 | Pixelsignal |
| G4 | PA34 | Pixelsignal |
| G5 | PA29 | Pixelsignal |
| G6 | PA31 | Pixelsignal |
| G7 | PA35 | Pixelsignal |
| B0 | PA36 | Pixelsignal |
| B1 | PA37 | Pixelsignal |
| B2 | PA38 | Pixelsignal |
| B3 | PA43 | Pixelsignal |
| B4 | PA41 | Pixelsignal |
| B5 | PA39 | Pixelsignal |
| B6 | PA40 | Pixelsignal |
| B7 | PA46 | Pixelsignal |

</div>

<div align="center"><em>Tabelle 5.5-8: SF32LB56xV JDI-Parallel-Display-Schnittstelle</em></div>

<div align="center" markdown>

| JDI-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | Schiebetakt für den vertikalen Treiber |
| JDI_VST | PA40 | Startsignal für den vertikalen Treiber |
| JDI_XRST | PA39 | Reset-Signal für den horizontalen und vertikalen Treiber |
| JDI_HCK | PA36 | Schiebetakt für den horizontalen Treiber |
| JDI_HST | PA38 | Startsignal für den horizontalen Treiber |
| JDI_ENB | PA43 | Schreibfreigabesignal für den Pixelspeicher |
| JDI_R1 | PA29 | Rote Bilddaten (ungerade Pixel) |
| JDI_R2 | PA31 | Rote Bilddaten (gerade Pixel) |
| JDI_G1 | PA34 | Grüne Bilddaten (ungerade Pixel) |
| JDI_G2 | PA32 | Grüne Bilddaten (gerade Pixel) |
| JDI_B1 | PA30 | Blaue Bilddaten (ungerade Pixel) |
| JDI_B2 | PA28 | Blaue Bilddaten (gerade Pixel) |
| JDI_XFRP | PBR1 | Flüssigkristall-Ansteuersignal ("An"-Pixel) |
| JDI_VCOM/FRP | PBR2 | Ansteuersignal der gemeinsamen Elektrode/Flüssigkristall-Ansteuersignal ("Aus"-Pixel) |

</div>

<div align="center"><em>Tabelle 5.5-9: SF32LB56xV JDI-Seriell-Display-Schnittstelle</em></div>

<div align="center" markdown>

| JDI-Signal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | Chip-Select-Signal |
| JDI_SCLK | PA41 | Serielles Taktsignal |
| JDI_SO | PA40 | Serielles Datenausgangssignal |
| JDI_DISP | PA36 | Display-Ein/Aus-Umschaltsignal |
| JDI_EXTCOMIN | PA38 | COM-Inversionspolaritäts-Eingang |

</div>

<div align="center"><em>Tabelle 5.5-10: SF32LB56xV Touch- und Hintergrundbeleuchtungs-Schnittstellen</em></div>

<div align="center" markdown>

| Touchscreen- und Hintergrundbeleuchtungssignal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| Interrupt | PA50 | Touch-Status-Interruptsignal (wake-fähig) |
| I2C1_SCL | PA48 | Touchscreen-I2C-Taktsignal |
| I2C1_SDA | PA49 | Touchscreen-I2C-Datensignal |
| BL_PWM | PA35 | PWM-Steuersignal der Hintergrundbeleuchtung |
| Reset | PA44 | Touch-Reset-Signal |

</div>

### 5.6. Speicher, Sensoren, Audio und Konnektivität { #56-storage-sensors-audio-and-connectivity }

Speicher- und Display-Busse sollten nicht unabhängig voneinander zugewiesen werden, da beide wichtige GPIO-Gruppen belegen und den Lagenaufbau der Leiterplatte beeinflussen können. Vor der Freigabe des Schaltplans Boot-Speicher, Pull-ups, Spannungsdomäne, Verhalten des Lastschalters und Zugang zur Prüfvorrichtung bestätigen.

<div align="center"><em>Tabelle 5.6-1: SF32LB56xU QSPI-Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Signal | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CS# | PA06 | Chip-Select, aktiv Low. |
| SO | PA07 | Dateneingang (Daten-E/A 1) |
| WP# | PA08 | Schreibschutz-Ausgang (Daten-E/A 2) |
| SI | PA09 | Datenausgang (Daten-E/A 0) |
| SCLK | PA10 | Serieller Takt-Ausgang |
| Hold# | PA11 | Datenausgang (Daten-E/A 3) |

</div>

<div align="center"><em>Tabelle 5.6-2: SF32LB56xU SDIO-Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Signal | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Befehlssignal |
| SD2_D1 | PA11 | Daten 1 |
| SD2_D0 | PA10 | Daten 0 |
| SD2_CLK | PA08 | Taktsignal |
| SD2_D2 | PA06 | Daten 2 |
| SD2_D3 | PA07 | Daten 3 |

</div>

<div align="center"><em>Tabelle 5.6-3: SF32LB56xV QSPI-Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Signal | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| CS# | PA06 | Chip-Select, aktiv Low. |
| SO | PA07 | Dateneingang (Daten-E/A 1) |
| WP# | PA08 | Schreibschutz-Ausgang (Daten-E/A 2) |
| SI | PA09 | Datenausgang (Daten-E/A 0) |
| SCLK | PA10 | Serieller Takt-Ausgang |
| Hold# | PA11 | Datenausgang (Daten-E/A 3) |

</div>

<div align="center"><em>Tabelle 5.6-4: SF32LB56xV SDIO-Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Signal | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | Befehlssignal |
| SD2_D1 | PA11 | Daten 1 |
| SD2_D0 | PA10 | Daten 0 |
| SD2_CLK | PA08 | Taktsignal |
| SD2_D2 | PA06 | Daten 2 |
| SD2_D3 | PA07 | Daten 3 |

</div>

<div align="center"><em>Tabelle 5.6-5: SF32LB56xV eMMC-Schnittstelle</em></div>

<div align="center" markdown>

| eMMC-Signal | I/O-Signal | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | Befehlssignal |
| SD1_CLK | PA26 | Taktsignal |
| SD1_D0 | PA22 | Daten 0 |
| SD1_D1 | PA15 | Daten 1 |
| SD1_D2 | PA12 | Daten 6 |
| SD1_D3 | PA20 | Daten 3 |
| SD1_D4 | PA21 | Daten 4 |
| SD1_D5 | PA19 | Daten 5 |
| SD1_D6 | PA13 | Daten 6 |
| SD1_D7 | PA14 | Daten 7 |

</div>

!!! warning "SD1-Datenleitungszuordnung des SF32LB56xV prüfen"
    Die SiFli-Quelle bezeichnet PA12 als SD1_D2, beschreibt das Signal jedoch als `Data 6`. Außerdem ist SD1_D6 ebenfalls als `Data 6` aufgeführt; eine Zeile für `Data 2` fehlt. Prüfen Sie vor dem Routing die tatsächliche Signalzuordnung anhand der veröffentlichten Pin-Mux-Dokumentation. Die Tabelle übernimmt die von SiFli veröffentlichten Einträge.

<div align="center"><em>Tabelle 5.6-6: Sensor-I2C-Schnittstelle</em></div>

<div align="center" markdown>

| I2C-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SDA | PA18 | I2C-Datensignal für Lichtverfolgungssensoren |
| SCL | PA17 | I2C-Taktsignal für Lichtverfolgungssensoren |

</div>

Die Speicher-I/O-Versorgung muss zum Logikpegel des angeschlossenen Speichers passen: Bei U wird VDDIO3, bei V VDDIOA2 verwendet. Ziehen Sie den Hold#-Pin des SPI-NAND-Flash über einen 10-kΩ-Widerstand auf seine Versorgung hoch. SD1/eMMC ist nur bei der V-Variante verfügbar. Übernehmen Sie die V-Tabelle für SD1/eMMC nicht für U; U verwendet die SD2-Speicherschnittstelle.

<div align="center"><em>Tabelle 5.6-7: SF32LB56xU Audio-Schnittstelle</em></div>

<div align="center" markdown>

| Audio-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Positiver Eingang bei differentieller Beschaltung oder unsymmetrischer Analogeingang für ein Mikrofon |
| AU_ADC1N | ADCN | Negativer Eingang bei differentieller Mikrofonbeschaltung oder GND |
| AU_DAC1P | DACP | Differenzieller analoger Ausgang P |
| AU_DAC1N | DACN | Differenzieller analoger Ausgang N |

</div>

<div align="center"><em>Tabelle 5.6-8: SF32LB56xV Audio-Schnittstelle</em></div>

<div align="center" markdown>

| Audio-Signal | I/O | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | Positiver Eingang bei differentieller Beschaltung oder unsymmetrischer Analogeingang für ein Mikrofon |
| AU_ADC1N | ADCN | Negativer Eingang bei differentieller Mikrofonbeschaltung oder GND |
| AU_DAC1P | DACP | Differenzieller analoger Ausgang P |
| AU_DAC1N | DACN | Differenzieller analoger Ausgang N |
| I2S1_LRCK | PA71 | I2S2-Rahmentakt |
| I2S1_SDI | PA69 | I2S2-Dateneingang |
| I2S1_SDO | PA64 | I2S2-Datenausgang |
| I2S1_BCK | PA73 | I2S2-Bit-Takt |

</div>

!!! warning "I2S-Instanz der V-Variante prüfen"
    Die SiFli-Pintabelle und die Netzbezeichnungen im Schaltplan kennzeichnen diese Pins als I2S1_LRCK/SDI/SDO/BCK, die Tabellenbeschreibungen bezeichnen sie jedoch als I2S2-Signale. Die Peripherieinstanz ist damit nicht eindeutig; prüfen Sie sie vor der Pinzuweisung anhand der veröffentlichten Pin-Mux-Dokumentation.

Bei einem externen differentiellen Analogmikrofon müssen an den ADC-Eingängen DC-Sperrkondensatoren von mindestens 2,2 µF vorgesehen und das Mikrofon über MIC_BIAS versorgt werden. Die U-Referenzschaltung für ein MEMS-Mikrofon führt MIC_BIAS über 1 kΩ und ergänzt einen 4,7-µF-Bypasskondensator; am Mikrofonausgang ist außerdem ein 0,01-µF-Koppelkondensator dargestellt. Die U-Referenz für den Analog-PA verwendet 33-nF-Eingangskoppelkondensatoren; der differentielle Tiefpassfilter liegt nahe am Chip. Analoge DAC-Ausgänge als massegeschütztes Differenzialpaar routen, mit weniger als 10 pF parasitärer Kapazität und weniger als 2 cm Leiterbahnlänge. Die V-Variante bietet zusätzlich I2S; der Referenz-I2S-Verstärker wird über I2C3 konfiguriert. Audio-Versorgungs- und Referenzkondensatoren nahe an den Pins platzieren und Analog-Audio von Schaltreglern und Hochgeschwindigkeitssignalen fernhalten.

Beide Varianten unterstützen PWM für Vibrationsmotoren. Der Motor darf direkt aus VBAT versorgt werden, sofern sein Anlaufstrom das System nicht destabilisiert. Ist `BSP_PM_FREQ_SCALING` auf `1` gesetzt, verändert die HCPU-Frequenzskalierung auch die PWM-Frequenz an den PA-Pins. Verwenden Sie in diesem Fall einen PB-Pin. PB32 ist ein aktiv-hoher Power-/Reset-Eingang; ein langer Tastendruck von mindestens 10 s löst einen Reset aus. Die U-Referenzschaltung verbindet die Taste über 1 kΩ mit VDDIOB und ergänzt einen 10-kΩ-Pull-down sowie einen 0,1-µF-Kondensator nach GND. Die V-Referenz verwendet einen 1-kΩ-Serienwiderstand von VDD_1V8 und einen 10-kΩ-Pull-down. Andere Tasten und Drehgeber benötigen Pull-ups. Bei mechanischen Drehgebern, die nach der Betätigung nicht in den Aus-Zustand zurückkehren, muss die Pull-up-Versorgung im Standby abschaltbar sein, um Leckstrom zu vermeiden.

U stellt PBR0–PBR2, V PBR0–PBR3 bereit. Beim Start wechselt PBR0 von Low nach High und kann einen externen Lastschalter steuern; die übrigen PBR-Pins starten standardmäßig Low. PBR-Pins können im Standby und Hibernate als Ausgänge arbeiten und LPTIM-Signale führen; alle außer PBR0 können außerdem einen 32-kHz-Takt ausgeben. PBR-Pins lassen sich auch als Weckeingänge konfigurieren, der MCU kann nach dem Aufwachen jedoch keinen Interrupt von diesem Eingang empfangen. Für Sensor-I2C, SPI, Steuerung und Interrupt-Wecksignale sind PB-Pins des LCPU vorzuziehen. Die Sensorversorgung kann bei Bedarf über einen LVSW- oder LDO-Ausgang des SF30147C geschaltet werden.

Alle PA-Pins von U/V können als UART, I2C oder GPTIM gemultiplext werden. Ausnahmen bei U sind PB32/PB33/PB34 sowie PBR0/PBR1/PBR2; bei V PB32–PB36 und PBR0–PBR3. Prüfen Sie diese Einschränkungen gemeinsam mit Weck-, Tasten- und PBR-Zuweisungen.

### 5.7. Fertigung { #57-manufacturing }

Zugang für Debugging und Programmierung, Produktionsprogrammiermodus, Zugang zur Quarzkalibrierung, Messpunkte für die Leistungsmessung, HF-Testzugang und Einsehbarkeit der PMIC-Steuerung vorsehen. Sicherstellen, dass die Prüfvorrichtung die Platine versorgen, den Boot-/Download-Modus erzwingen, mit dem Chip kommunizieren und Kalibrierungsdaten erfassen kann.

Mindestens folgende Produktions-Testpunkte vorsehen: VBAT, GND, bei U VDDIO2 (bei V VDDIOB), Mode, SWDIO, SWCLK, UART4_RXD, UART4_TXD und einer der Pins PB20/PB21/PB25. Stellen Sie beim Anschluss eines J-Link die Debugger-Versorgung auf externe Einspeisung, damit die Zielplatine den Debugger versorgt. Die Vorrichtung für Produktionsprogrammierung und Quarzkalibrierung muss auf diese Testpunkte zugreifen können.

<div align="center"><em>Tabelle 5.7-1: SF32LB56xU Debug- und Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Signal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Link-Taktsignal, Debug-Schnittstelle |
| SWDIO | PB13 | J-Link-Datensignal, Debug-Schnittstelle |
| UART4_RXD | PB16 | UART-Empfangssignal, Download- und Logausgabe-Schnittstelle |
| UART4_TXD | PB17 | UART-Sendesignal, Download- und Logausgabe-Schnittstelle |

</div>

<div align="center"><em>Tabelle 5.7-2: SF32LB56xV Debug- und Flash-Schnittstelle</em></div>

<div align="center" markdown>

| Signal | Pin | Detaillierte Beschreibung |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Link-Taktsignal, Debug-Schnittstelle |
| SWDIO | PB13 | J-Link-Datensignal, Debug-Schnittstelle |
| UART4_RXD | PB16 | UART-Empfangssignal, Download- und Logausgabe-Schnittstelle |
| UART4_TXD | PB17 | UART-Sendesignal, Download- und Logausgabe-Schnittstelle |

</div>
