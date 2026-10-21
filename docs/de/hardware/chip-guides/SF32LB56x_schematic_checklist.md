---
icon: lucide/list-checks
description: "Punktweise Schaltplan-Prüfcheckliste für den SF32LB56x-MCU, mit Prüfungen zu Stromversorgung, Takt, RF, Speicher, Display und Fertigung."
tags:
    - Hardware
    - Chip
    - Checkliste
hide:
    - navigation
---

# SF32LB56x Hardware-Design-Leitfaden — Schaltplan-Checkliste { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "Teil des SF32LB56x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 5.8, die punktweise Schaltplan-Checkliste. Zurück zu den [Schaltplan-Design-Richtlinien](SF32LB56x_schematic_design.md).

## 5.8. Schaltplan-Checkliste { #58-schematic-checklist }

Jede der folgenden Tabellen deckt einen funktionalen Schaltplanblock ab. Ein Prüfpunkt gilt nur für die Varianten, die in der Spalte „Gilt für“ aufgeführt sind.

### 5.8.1. Gehäuse { #581-package }

<div align="center"><em>Tabelle 5.8.1-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Das Gehäuse der gewählten Teilenummer ist korrekt, einschließlich Pin-Namen und Pin-Nummern | Alle Chips | Erforderlich |

</div>

### 5.8.2. Stromversorgung { #582-power-supply }

<div align="center"><em>Tabelle 5.8.2-1: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die PVDD-Versorgungsspannung beträgt 1,8 V–3,3 V; für SF32LB56xU/SF32LB56xV werden 1,8 V und für SS6700A 3,3 V empfohlen | Alle Chips | Erforderlich |
| 2 | BUCK_LX- und BUCK_FB-Verbindungen sind korrekt | Alle Chips | Erforderlich |
| 3 | LDO_VOUT1-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Chips | Erforderlich |
| 4 | LDO_VOUT2-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Chips | Erforderlich |
| 5 | VDD_RET-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Chips | Erforderlich |
| 6 | VDD_RTC-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Chips | Erforderlich |
| 7 | Die VDDIO1-Versorgungsspannung beträgt 1,8 V–3,3 V; SF32LB56xU verwendet 1,8 V, SS6700A 3,3 V. VDDIO1 kann unter PBR0-Steuerung gemeinsam mit dem externen Flash geschaltet werden. Wird VDDIO1 nicht über PBR0 gesteuert, muss die Schiene während des Programm-Downloads versorgt sein. Bei GPIO-Steuerung wird PB22 empfohlen; das Download-Tool muss diese Schiene aktivieren | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 8 | Wird VDDIO1 von SF30147 versorgt, wird LVSW1 empfohlen; das Download-Tool muss diese Schiene aktivieren | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 9 | Die VDDIO2-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen (für SF32LB56xU werden 1,8 V, für SS6700A 3,3 V empfohlen) | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 10 | Die VDDIO3-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen (für SF32LB56xU werden 1,8 V, für SS6700A 3,3 V empfohlen) | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 11 | Die VDDIO4-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen (für SF32LB56xU werden 1,8 V empfohlen; SS6700A besitzt diese Spannungsschiene nicht) | SF32LB560/561/563/56W | Erforderlich |
| 12 | Die VDDIOA-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen | SF32LB565/567 | Erforderlich |
| 13 | Die VDDIOA2-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen | SF32LB565/567 | Erforderlich |
| 14 | Die VDDIOB-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision ist eine Bestückungsoption für einen 0-Ω-Serienwiderstand vorzusehen | SF32LB565/567 | Erforderlich |
| 15 | Die VDDIOSA-Versorgungsspannung beträgt 1,8 V; zur Steuerung der Versorgung ist ein Lastschalter vorgesehen | SF32LB565/567 | Erforderlich |
| 16 | Die VDDIOSB-Versorgungsspannung beträgt 1,8 V; zur Steuerung der Versorgung ist ein Lastschalter vorgesehen | SF32LB565/567 | Erforderlich |
| 17 | VDDIOSC-Versorgungsspannung ist 1,8 V, und VDDIOSC muss immer versorgt sein | SF32LB565/567 | Erforderlich |
| 18 | AVDD33_ANA-Versorgungsspannung ist 3,3 V | Alle Chips | Erforderlich |
| 19 | AVDD33_AUD-Versorgungsspannung ist 3,3 V | Alle Chips | Erforderlich |
| 20 | Für die Ladeschaltung wird ein Lade-IC mit Power-Path-Management empfohlen. So kann das System über den Ladeeingang eingeschaltet werden, wenn die Akkuspannung unter der Einschaltschwelle liegt | Alle Chips | Erforderlich |
| 21 | Wird ein Lade-IC ohne Power-Path-Management verwendet, muss der Erhaltungsladestrom mindestens 40 mA betragen | Alle Chips | Erforderlich |
| 22 | Das Stromversorgungsdesign sollte, wo zutreffend, hardwareseitig zwischen SF32LB56xU und SS6700 kompatibel sein | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 23 | Wenn SF30147 die Stromversorgung übernimmt, verwenden Sie zur Registersteuerung die dedizierte TWI-Schnittstelle des SF32LB56x | Alle Chips | Erforderlich |
| 24 | Teilt sich die SF30147-TWI den I2C-Bus des G-Sensors, muss dessen I2C-Pull-up-Versorgung dauerhaft eingeschaltet bleiben, damit TWI ordnungsgemäß funktioniert | Alle Chips | Erforderlich |
| 25 | Wenn SF30147 die Stromversorgung übernimmt, können Lastschalter und LDOs über EN gesteuert werden. Die EN-Spannungsdomäne muss PVDD oder AVDD sein; steuern Sie den Schalter nicht über einen MCU-GPIO mit 1,8-V- oder 3,3-V-Pegel. Alternativ kann EN mit Masse verbunden und die jeweilige Spannungsschiene über Register gesteuert werden | Alle Chips | Erforderlich |
| 26 | Übernimmt SF30147 die Stromversorgung, können BUCK und LDO1 nur über ihre jeweiligen Enable-Signale EN_BUCK und EN_LDO1 gesteuert werden; eine interne Registersteuerung ist nicht vorgesehen | Alle Chips | Erforderlich |
| 27 | Die PVDD des 56x muss mit VDDIO3 bei SF32LB56xU bzw. VDDIOB bei SF32LB56xV übereinstimmen. Ist PVDD niedriger – zum Beispiel 1,8 V bei einer I/O-Schiene von 3,3 V –, fließen auf der I/O-Schiene in Standby und Hibernate etwa 15 µA Leckstrom | Alle Chips | Erforderlich |

</div>

### 5.8.3. Kondensatoren und Induktivitäten der Stromversorgung { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabelle 5.8.3-1: Checkliste Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | PVDD-Pufferkondensator beträgt mindestens 10 µF | Alle Chips | Erforderlich |
| 2 | BUCK_FB-Kondensator = 4,7 µF | Alle Chips | Erforderlich |
| 3 | LDO_VOUT1-Kondensator beträgt 4,7 µF | Alle Chips | Erforderlich |
| 4 | LDO_VOUT2-Kondensator beträgt 4,7 µF | Alle Chips | Erforderlich |
| 5 | VDD_RET-Kondensator = 0,47 µF | Alle Chips | Erforderlich |
| 6 | VDD_RTC-Kondensator = 1 µF | Alle Chips | Erforderlich |
| 7 | VDDIO1-Kondensator beträgt mindestens 1 µF | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 8 | VDDIO2-Kondensator beträgt mindestens 1 µF | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 9 | VDDIO3-Kondensator beträgt mindestens 1 µF | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 10 | VDDIO4-Kondensator beträgt mindestens 1 µF | SF32LB560/561/563/56W | Erforderlich |
| 11 | VDDIOA-Kondensator beträgt mindestens 1 µF | SF32LB565/567 | Erforderlich |
| 12 | VDDIOA2-Kondensator beträgt mindestens 1 µF | SF32LB565/567 | Erforderlich |
| 13 | VDDIOB-Kondensator beträgt mindestens 1 µF | SF32LB565/567 | Erforderlich |
| 14 | VDDIOSA-Kondensator beträgt mindestens 0,1 µF | SF32LB565/567 | Erforderlich |
| 15 | VDDIOSB-Kondensator beträgt mindestens 0,1 µF | SF32LB565/567 | Erforderlich |
| 16 | VDDIOSC-Kondensator beträgt mindestens 0,1 µF | SF32LB565/567 | Erforderlich |
| 17 | MIC_BIAS-Kondensator beträgt 1 µF | Alle Chips | Erforderlich |
| 18 | AVDD33_ANA-Kondensator beträgt mindestens 4,7 µF | Alle Chips | Erforderlich |
| 19 | AVDD33_AUD-Kondensator beträgt mindestens 4,7 µF | Alle Chips | Erforderlich |
| 20 | AVDD33_BRF-Kondensator beträgt mindestens 4,7 µF | SF32LB565/567 | Erforderlich |
| 21 | AUD_VREF-Kondensator = 1 µF | Alle Chips | Erforderlich |
| 22 | GPADC-VREFP-Kondensator = 4,7 µF | Alle Chips | Erforderlich |
| 23 | Die Teilenummer der BUCK-Induktivität ist in der [von SiFli freigegebenen Lieferantenliste][SiFli Approved Vendor List] (AVL) aufgeführt | Alle Chips | Erforderlich |
| 24 | Wenn die BUCK-Induktivität nicht von SiFli empfohlen ist, muss sie L = 4,7 µH, DCR ≤ 0,4 Ω und Isat ≥ 450 mA erfüllen | Alle Chips | Erforderlich |
| 25 | Die PVDD-Versorgung beträgt 1,8 V; empfohlen wird ein DCDC-Wandler von VBAT auf 1,8 V | Alle Chips | Erforderlich |
| 26 | Bei GPS oder anderen störempfindlichen Peripheriegeräten einen Footprint für einen parallel nach Masse geschalteten Kondensator an BUCK_LX vorsehen; der Kapazitätswert richtet sich nach den tatsächlichen Testergebnissen | Alle Chips | Erforderlich |
| 27 | Der Ruhestrom des gewählten DCDC-Wandlers ist dokumentiert und erfüllt die Projektanforderungen | Alle Chips | Erforderlich |
| 28 | Der Ruhestrom des gewählten LDO ist dokumentiert und erfüllt die Projektanforderungen | Alle Chips | Erforderlich |

</div>

### 5.8.4. Takt { #584-clock }

<div align="center"><em>Tabelle 5.8.4-1: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der 48-MHz-Hauptquarz ist eine in der AVL gelistete Teilenummer | Alle Chips | Erforderlich |
| 2 | Ist der 48-MHz-Quarz nicht in der AVL gelistet, muss er 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), eine Frequenztoleranz von ≤ ±10 ppm und ESR ≤ 30 Ω (22 Ω empfohlen) erfüllen | Alle Chips | Erforderlich |
| 3 | Der 32,768-kHz-RTC-Quarz ist eine in der AVL gelistete Teilenummer | Alle Chips | Erforderlich |
| 4 | Ist der 32,768-kHz-Quarz nicht in der AVL gelistet, muss er CL ≤ 12,5 pF (7 pF empfohlen), eine Frequenztoleranz von ≤ ±20 ppm und ESR ≤ 80 kΩ (38 kΩ empfohlen) erfüllen | Alle Chips | Erforderlich |

</div>

### 5.8.5. Massesignale { #585-ground-signals }

<div align="center"><em>Tabelle 5.8.5-1: Checkliste Massesignale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Alle VSS-Signale sind mit GND verbunden | Alle Chips | Erforderlich |

</div>

### 5.8.6. Boot-Modus { #586-boot-mode }

<div align="center"><em>Tabelle 5.8.6-1: Checkliste Boot-Modus</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | MODE besitzt einen internen Pull-down. Sehen Sie einen 10-kΩ-Pull-up zu VDDIOA vor und treiben Sie MODE während des Programm-Downloads auf High | Alle Chips | Erforderlich |
| 2 | Das MODE-Signal verfügt über einen reservierten Testpunkt und muss zur Produktionsprogrammier-Fixture herausgeführt werden | Alle Chips | Erforderlich |

</div>

### 5.8.7. RF { #587-rf }

<div align="center"><em>Tabelle 5.8.7-1: Checkliste RF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Das ANT-Signal ist mit der Anforderung an eine unsymmetrische charakteristische Impedanz von 50 Ω gekennzeichnet | Alle Chips | Erforderlich |
| 2 | Für das ANT-Signal ist ein π-Anpassungsnetzwerk vorgesehen: ein paralleler NC-Kondensator (nicht bestückt) und ein 15-pF-Serienkondensator | Alle Chips | Erforderlich |

</div>

### 5.8.8. Zuweisung der I/O-Ressourcen { #588-io-resource-allocation }

<div align="center"><em>Tabelle 5.8.8-1: Checkliste Zuweisung der I/O-Ressourcen</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Eine mit dem Schaltplan übereinstimmende GPIO-Ressourcenzuweisungstabelle wird bereitgestellt | Alle Chips | Erforderlich |
| 2 | Die GPIO-Zuweisung in der Ressourcentabelle stimmt mit dem Schaltplan überein | Alle Chips | Erforderlich |
| 3 | Bei der GPIO-Ausgangssteuerung den Standard-PU/PD-Zustand beim Kaltstart berücksichtigen und betroffene Peripheriegeräte bei Bedarf vorab aktivieren | Alle Chips | Erforderlich |
| 4 | Die tatsächliche GPIO-Zuweisung folgt den Empfehlungen von SiFli; siehe die I/O-Konfigurationsdatei | Alle Chips | Erforderlich |

</div>

### 5.8.9. Hardwareseitiges Wecken { #589-hardware-wake-up }

<div align="center"><em>Tabelle 5.8.9-1: Checkliste zum hardwareseitigen Wecken</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Interruptquellen zum Aufwecken aus Hibernate und Standby sind korrekt: PA50, PA51, PB32, PB33, PB34, PBR0, PBR1 und PBR2, insgesamt acht Pins | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 2 | Die Interruptquellen zum Aufwecken aus Hibernate und Standby sind korrekt: PA50-PA54, PB32-PB36 und PBR0-PBR3, insgesamt vierzehn Pins | SF32LB565/567 | Erforderlich |
| 3 | Die Wake-up-Pins können je nach Softwarekonfiguration HCPU oder LCPU aufwecken | Alle Chips | Erforderlich |
| 4 | Interrupt- und Steuersignale für LCPU-seitige Peripheriegeräte wie G-Sensor und Herzfrequenzsensor müssen mit PB-GPIOs verbunden werden | Alle Chips | Erforderlich |

</div>

### 5.8.10. Speicher { #5810-storage }

<div align="center"><em>Tabelle 5.8.10-1: Checkliste Speicher</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) verbindet sich mit SPI-NAND-Flash oder SD-NAND-Flash; bei externem Flash an SF32LB56xU sicherstellen, dass die Flash-Versorgungsspannung mit VDDIO3 übereinstimmt | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 2 | MPI3 (SD2) verbindet sich mit SPI-NAND-Flash oder SD-NAND-Flash, und der Flash-I/O-Pegel entspricht VDDIOA2 | SF32LB565/567 | Erforderlich |
| 3 | Der HOLD#-Pin des SPI-NAND-Flash ist über einen 10-kΩ-Widerstand zur SPI-NAND-Flash-Versorgung hochgezogen | Alle Chips | Erforderlich |
| 4 | MPI3 verbindet sich mit NOR-Flash (bei SS6700A muss der externe Speicher NOR-Flash sein) | Alle Chips | Erforderlich |
| 5 | Muss in der Produktion MPI3-(SD2-)Flash programmiert werden, ist dessen Versorgung während des Programm-Downloads einzuschalten | Alle Chips | Erforderlich |
| 6 | Der von PBR0 oder einem anderen GPIO gesteuerte Lastschalter ist bei High eingeschaltet und bei Low ausgeschaltet | Alle Chips | Erforderlich |
| 7 | Verbindet sich die SD2-Schnittstelle mit SD-NAND, sind die Signalverbindungen korrekt | Alle Chips | Erforderlich |
| 8 | An Flash-CLK- und Datenleitungen werden 33-Ω-Serienwiderstände empfohlen | Alle Chips | Optional |
| 9 | Der SD-NAND-I/O-Pegel entspricht VDDIO2 | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 10 | Flash-CLK- und Datenleitungen besitzen 33-Ω-Serienwiderstände | Alle Chips | Erforderlich |
| 11 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Chips | Erforderlich |
| 12 | Der im Gehäuse integrierte NOR-Flash-Speicher für die LCPU bleibt immer versorgt; standardmäßig steuert PBR0 die Versorgung des externen Flash.<br>(1) Bei begrenzter GPIO-Anzahl kann PBR0 auch die PSRAM-Versorgung (VDDIO1) bei 561/2/3/W steuern. Werden Daten, die im Schlafmodus benötigt werden, im PSRAM gespeichert, dürfen weder PSRAM noch externes Flash abgeschaltet werden.<br>(2) Sind GPIOs verfügbar, PB22 zur Steuerung des PSRAM-Versorgungsschalters verwenden | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 13 | <span class="flag-yellow">Die Versorgungen VDDIOSA und VDDIOSB werden von PBR0 gesteuert, VDDIOSC ist immer versorgt, und die Versorgung des externen Flash wird von PA03 gesteuert</span> | SF32LB565/567 | Erforderlich |
| 14 | NOR-Flash ist im Leitfaden zur Auswahl von Schlüsselkomponenten qualifiziert | Alle Chips | Erforderlich |
| 15 | SPI-/SD-NAND-Flash ist im Leitfaden zur Auswahl von Schlüsselkomponenten qualifiziert | Alle Chips | Erforderlich |

</div>

### 5.8.11. Display { #5811-display }

<div align="center"><em>Tabelle 5.8.11-1: Checkliste Display</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Bei SF32LB56xU oder SS6700A ist ein QSPI-Panel angeschlossen | Alle Chips | Erforderlich |
| 2 | Bei SF32LB56xU oder SS6700A ist ein serielles JDI-Panel angeschlossen | Alle Chips | Erforderlich |
| 3 | LCDC1-QSPI-Signalverbindungen sind korrekt; an CLK- und Datenleitungen werden 100-Ω-Serienwiderstände empfohlen | Alle Chips | Erforderlich |
| 4 | Die seriellen JDI-Signalverbindungen des LCDC1 sind korrekt | Alle Chips | Erforderlich |
| 5 | Die LCDC-RSTB-Verbindung ist korrekt | Alle Chips | Erforderlich |
| 6 | Die LCDC-TE-Verbindung ist korrekt (Verbindung zum TE- bzw. Fmark-Signal des Panels) | Alle Chips | Erforderlich |
| 7 | TP-Signale folgen der empfohlenen Pin-Zuweisung (siehe die EVB-I/O-Konfigurationsdatei) | Alle Chips | Erforderlich |
| 8 | Die LCD-Schnittstelle unterstützt 3-/4-Draht-SPI, Dual-/Quad-Data-SPI, serielle JDI und ähnliche Modi | Alle Chips | Optional |
| 9 | SPI-LCD, 3-Draht-Modus: CS verbunden mit PA36, CLK verbunden mit PA37, DATA verbunden mit PA38; 4-Draht-Modus: CS verbunden mit PA36, CLK verbunden mit PA37, DATA verbunden mit PA38, DC verbunden mit PA39 | Alle Chips | Optional |
| 10 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Chips | Erforderlich |
| 11 | Wird LCD-AOD benötigt, muss LCD_RST (PA05) über VDDIO3 versorgt werden, und VDDIO3 muss ständig eingeschaltet bleiben. Verbinden Sie VDDIO3 nicht mit der Versorgung des externen Flash; andernfalls kann das Abschalten des Flash im Schlafmodus auch VDDIO3 und LCD_RST abschalten und dadurch die AOD-Funktion beeinträchtigen | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 12 | Bei DSI-LCDs die DSI-Daten- und Taktsignale anschließen. DSI-Video-Mode-Panels verhalten sich wie RGB-Panels und besitzen kein TE-Signal; DSI-Command-Mode-Panels besitzen ein TE-Signal, und DSI17801 benötigt TE. TE und RST werden beide empfohlen; die tatsächliche Nutzung hängt vom gewählten LCD ab | SF32LB565/567 | Erforderlich |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>Tabelle 5.8.12-1: Checkliste GPADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | GPADC-Eingang ist mit dem entsprechenden Pin verbunden | Alle Chips | Optional |
| 2 | GPADC-Eingangsbereich ist korrekt; die maximale Eingangsspannung darf AVDD33_AVA (3,3 V) nicht überschreiten | Alle Chips | Optional |
| 3 | Empfohlener Akkuspannungsteiler: 470-kΩ-Widerstand mit 1 % Toleranz auf der Versorgungsseite, 1-MΩ-Widerstand mit 1 % Toleranz gegen Masse und ein 100-nF-Filterkondensator | Alle Chips | Erforderlich |
| 4 | Für jedes über GPADC gemessene Spannungsteilersignal Teilerwiderstände mit 1 % Toleranz verwenden; jeder GPADC-Kanal muss einen 100-nF-Filterkondensator nahe am Chip-Pin aufweisen | Alle Chips | Erforderlich |
| 5 | Mit dem ADC lassen sich mehrere Tasten erkennen und GPIOs einsparen. Wird PB32 beispielsweise als ADC-Taste verwendet, darf der Akku nicht als Pull-up-Versorgung dienen | Alle Chips | Erforderlich |

</div>

### 5.8.13. Tasten { #5813-buttons }

<div align="center"><em>Tabelle 5.8.13-1: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Mit dem Kunden klären, ob die Taste das System aufwecken können muss | Alle Chips | Erforderlich |
| 2 | Die Verbindung einer normalen Taste ist korrekt (Pull-up vorhanden, korrekter Widerstandswert, korrekte Pull-up-Spannungsdomäne) | Alle Chips | Erforderlich |
| 3 | Die Ein-/Aus-Taste muss an PB32 angeschlossen und bei High-Pegel aktiv sein. Ein zehn Sekunden langer Tastendruck löst einen Reset aus; auf der Hauptplatine muss ein 10-kΩ-Pull-down-Widerstand vorgesehen sein | Alle Chips | Erforderlich |
| 4 | Alle Tastensignale verfügen über ESD-Schutz | Alle Chips | Erforderlich |

</div>

### 5.8.14. EOS- und ESD-Schutz { #5814-eos-and-esd-protection }

<div align="center"><em>Tabelle 5.8.14-1: Checkliste EOS- und ESD-Schutz</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Ladeschnittstelle verfügt über Schutzmaßnahmen gegen EOS, ESD und Überspannung (OVP) | Alle Chips | Erforderlich |
| 2 | Das Signal zur Ladegeräteerkennung verfügt über ein ESD-Bauteil | Alle Chips | Erforderlich |
| 3 | Die Akkuschnittstelle verfügt über ein ESD-Bauteil | Alle Chips | Erforderlich |
| 4 | Die Antennenschnittstelle verfügt über ein ESD-Bauteil | Alle Chips | Erforderlich |
| 5 | LCD- und TP-Versorgungsschnittstellen verfügen über ESD-Bauteile | Alle Chips | Erforderlich |
| 6 | TP-I2C-, RST- und INT-Leitungen verfügen über ESD-Bauteile | Alle Chips | Erforderlich |
| 7 | Versorgungsschnittstelle und Signalleitungen des Herzfrequenzsensors verfügen über ESD-Bauteile | Alle Chips | Erforderlich |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>Tabelle 5.8.15-1: Checkliste I2C</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die I2C-Zuweisung berücksichtigt die HCPU-/LCPU-Aufteilung und ob das Gerät im Low-Power-Modus laufen muss | Alle Chips | Erforderlich |
| 2 | I2C-Pull-ups müssen den passenden Widerstandswert haben; für den Betrieb mit 400 kHz werden 2,2-kΩ-Pull-ups empfohlen. Verwenden Sie die Spannungsdomäne auf der Peripherieseite und schalten Sie die Pull-up-Versorgung zusammen mit der Peripherie ab | Alle Chips | Erforderlich |
| 3 | Das I2C-Interruptsignal unterstützt bei Bedarf die Hardware-Aufweckung | Alle Chips | Erforderlich |
| 4 | Teilen sich mehrere Geräte einen I2C-Bus, müssen ihre Adressen eindeutig sein | Alle Chips | Erforderlich |
| 5 | Der SiFli-Quelleneintrag zum SF30147C-PMIC lautet: „I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C“. Daraus geht weder die Beziehung zwischen den Signalen noch die Bedeutung von „normal“ eindeutig hervor. Prüfen Sie vor der Freigabe die PB23-Zuordnung, die Pull-up-Versorgung und den TWI-DAT-Betrieb mit dem SF30147C anhand des offiziellen Schaltplans und der Dokumentation. | SF32LB560/561/563/56W und SS6700A | Erforderlich |

</div>

### 5.8.16. Analog-Audio { #5816-analog-audio }

<div align="center"><em>Tabelle 5.8.16-1: Checkliste Analog-Audio</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die MEMS-Mikrofonverbindung ist korrekt | Alle Chips | Erforderlich |
| 2 | Das MEMS-Mikrofon wird von MIC_BIAS versorgt | Alle Chips | Erforderlich |
| 3 | Das analog angeschlossene ECM-Mikrofon in unsymmetrischer Beschaltung ist korrekt verbunden | Alle Chips | Erforderlich |
| 4 | Das analog angeschlossene ECM-Mikrofon in unsymmetrischer Beschaltung wird über MIC_BIAS versorgt | Alle Chips | Erforderlich |
| 5 | Das analog angeschlossene ECM-Mikrofon in differentieller Beschaltung ist korrekt verbunden | Alle Chips | Erforderlich |
| 6 | Das analog angeschlossene ECM-Mikrofon in differentieller Beschaltung wird über MIC_BIAS versorgt | Alle Chips | Erforderlich |
| 7 | Alle Audio-ADC-Eingänge besitzen einen DC-Sperrkondensator von mindestens 2,2 µF | Alle Chips | Erforderlich |
| 8 | Die Audio-DAC-Ausgänge DACP und DACN besitzen jeweils einen 1-kΩ-Serienwiderstand nahe am Chip, mit einem 1,5-nF-Kondensator parallel zwischen DACP und DACN | Alle Chips | Erforderlich |
| 9 | AW8155 ist der empfohlene Audioverstärker; bei Verwendung dieses Bauteils die Softwareeinstellung „Mode 4 / Class AB mode“ (Modus 4 / Class-AB-Betrieb) wählen | Alle Chips | Erforderlich |
| 10 | Wird der Audio-PA-Ausgang auf den MCU-ADC zurückgeführt, einen Spannungsteiler und RC-Filter oder zusätzliche digitale Filterung hinzufügen. Die Spannung nach dem Teiler muss innerhalb des ADC-Eingangsbereichs liegen; die Grenzfrequenz des RC-Filters sollte 20 kHz betragen | Alle Chips | Erforderlich |
| 11 | Wird der im Chip integrierte analoge Audio-ADC-Pfad nicht genutzt, wird empfohlen, ADCP und ADCN jeweils mit einem 0-Ω-Serienwiderstand gegen Masse zu versehen | Alle Chips | Erforderlich |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>Tabelle 5.8.17-1: Checkliste SPI</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SPI-Verbindung ist korrekt; SDO und SDI sind zwischen MCU und Peripherie korrekt gekreuzt | Alle Chips | Optional |
| 2 | Die Zeitvorgaben der SPI-Peripherie sind bestätigt und werden unterstützt | Alle Chips | Optional |
| 3 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Chips | Optional |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>Tabelle 5.8.18-1: Checkliste USART</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | USART4 ist die Programmier- und Debug-Schnittstelle. Sehen Sie Testpunkte und den empfohlenen 100-Ω-Serienwiderstand vor; passen Sie diesen bei Bedarf an das konkrete Design an | Alle Chips | Erforderlich |
| 2 | <span class="flag-yellow">Bei SF32LB56xU sind PA17/PA18 für RF-Zertifizierungstests als USART1 gemultiplext; sehen Sie Testpunkte vor</span> | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 3 | <span class="flag-yellow">Bei SF32LB56xV sind PA30/PA34 für RF-Zertifizierungstests als USART1 gemultiplext; sehen Sie Testpunkte vor</span> | SF32LB565/567 | Erforderlich |
| 4 | Beim Anschluss an eine Peripherie verbindet sich RXD auf MCU-Seite mit Peripherie-TXD und TXD auf MCU-Seite mit Peripherie-RXD | Alle Chips | Erforderlich |
| 5 | Sind PA17/PA18 als UART zu Peripheriegeräten gemultiplext, beim MCU-Reset sicherstellen, dass die angeschlossenen Peripheriegeräte abgeschaltet sind oder die Software beide Pins auf Low treibt | Alle Chips | Erforderlich |
| 6 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Chips | Erforderlich |
| 7 | Ungenutzte USART-Testpunkte werden als Reserve vorgehalten | Alle Chips | Optional |
| 8 | Für UART-Verbindungen zu Peripheriegeräten wird die HCPU-Schnittstelle empfohlen, damit HCPU-Software keine LCPU-UART-Schnittstelle belegt | Alle Varianten | Erforderlich |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>Tabelle 5.8.19-1: Checkliste PWM</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Pin-Zuweisung für die Hintergrundbeleuchtungs-PWM ist korrekt; die LCD-Hintergrundbeleuchtungssteuerung muss PB-GPIOs mit PWM-Funktion verwenden | Alle Chips | Optional |
| 2 | Die Pin-Zuweisung für die Motor-PWM ist korrekt; die Motorvibrationssteuerung muss PB-GPIOs mit PWM-Funktion verwenden | Alle Chips | Optional |
| 3 | Für die Motor-PWM-Steuerung ein standardmäßig deaktiviertes GPIO wählen, um Fehlverhalten während der Firmware-Programmierung bei Verwendung eines SMT-Motors zu vermeiden | Alle Chips | Optional |
| 4 | Andere PWM-Ausgänge als Hintergrundbeleuchtung und Motor müssen ebenfalls die PB-Schnittstelle verwenden, und das Kaltstartverhalten muss geprüft werden | Alle Chips | Optional |

</div>

### 5.8.20. Debug { #5820-debug }

<div align="center"><em>Tabelle 5.8.20-1: Checkliste Debug</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | UART4_TXD/UART4_RXD werden für Debug empfohlen. Sehen Sie Testpunkte und den empfohlenen 100-Ω-Serienwiderstand vor | Alle Chips | Erforderlich |
| 2 | SWD-Signalverbindungen sind korrekt | Alle Chips | Erforderlich |
| 3 | Am J-Link-Steckverbinder oder an den Testpunkten ist die I/O-Spannungsreferenz korrekt vorgesehen | Alle Chips | Erforderlich |
| 4 | Beim Produktions-Download sicherstellen, dass PVDD, VDDIO2 bei SF32LB56xU bzw. VDDIOA bei SF32LB56xV, VDDIO3 bei SF32LB56xU bzw. VDDIOA2 bei SF32LB56xV, sowie VDDIO4 bei SF32LB56xU bzw. VDDIOB bei SF32LB56xV versorgt sind. VDDIO1 bei 561/563/56W bzw. VDDIOSB bei 565/567 müssen ebenfalls versorgt sein | Alle Chips | Erforderlich |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>Tabelle 5.8.21-1: Checkliste USB</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | USB-Schnittstellenverbindung ist korrekt | Alle Chips | Optional |
| 2 | Die USB-Schnittstelle verfügt über ESD-Schutz | Alle Chips | Optional |
| 3 | Im normalen Betrieb außerhalb des Schlafmodus kann die PC- bzw. Geräteseite das Anschließen und Trennen erkennen, solange USB aktiviert ist.<br>Wenn dies auch im Schlafmodus der MCU erforderlich ist, eine Spannungsteilerschaltung am VBUS vorsehen. Ihr Ausgang muss einen dem I/O-Spannungspegel entsprechenden High-Pegel liefern und mit einem Wake-up-Pin der MCU verbunden werden. Es wird empfohlen, dafür denselben Wake-up-Pin wie für die Ladegeräteerkennung zu verwenden | Alle Chips | Optional |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>Tabelle 5.8.22-1: Checkliste PBR</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Beim Einschalten wechselt PBR0 von 0 auf 1 und kann zur Steuerung einiger externer Lastschalter verwendet werden; PBR1-PBR2 geben standardmäßig Low-Pegel aus | Alle Chips | Erforderlich |
| 2 | PBR0-PBRx können sowohl in Standby als auch in Hibernate als Ausgänge verwendet werden | Alle Chips | Optional |
| 3 | PBR0-PBRx können LPTIM-Signale ausgeben | Alle Chips | Optional |
| 4 | Für 567 wird LPTIM3 empfohlen: LPTIM3_OUT und LPTIM3_OUT_BAR geben an PBR-Pins Signale mit 21–25 kHz, unterschiedlichem Tastverhältnis und entgegengesetzter Polarität aus | Alle Chips | Optional |
| 5 | Die 21-25-kHz-Signale mit entgegengesetzter Polarität und unterschiedlichem Tastverhältnis können auch von HCPU-ATIM ausgegeben werden; passende ATIMx_CHx- und ATIMx_CHxN-Signale zusammen mit Pin_Config auswählen und den Einfluss einer HCPU-Frequenzreduzierung berücksichtigen | Alle Chips | Optional |
| 6 | PBR1-PBRx können ein 32-kHz-Taktsignal ausgeben | Alle Chips | Optional |
| 7 | PBR0-PBRx können als Eingänge für Wake-up-Signale konfiguriert werden | Alle Chips | Optional |
| 8 | Wird PBR als Wake-up-Pin verwendet, muss die Software seinen Zustand nach dem Aufwachen des MCU abfragen. PBR eignet sich für langsam wechselnde Pegel, etwa von Tasten oder der Ladegeräteerkennung. Für kurze Impulse, etwa Herzfrequenz-Interrupts, stattdessen einen normalen GPIO-Pin mit Wake-up-Unterstützung verwenden | Alle Chips | Optional |

</div>

### 5.8.23. Stromverbrauch { #5823-power-consumption }

<div align="center"><em>Tabelle 5.8.23-1: Checkliste Stromverbrauch</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Für alle Enable-Pins von MOSFETs, LDOs und DCDC-Wandlern zur Stromversorgungsschaltung einen 1-MΩ-Pull-down gegen Masse vorsehen, wenn der Enable-Pin high-aktiv ist; den Wert bei Bedarf an das Projekt anpassen | Alle Chips | Erforderlich |
| 2 | Die PVDD des SF32LB56x wird mit 1,8 V versorgt. Dafür ist ein 1,8-V-Ausgang eines DCDC-Wandlers mit niedrigem Ruhestrom (Low-Iq) zu verwenden, der dauerhaft eingeschaltet bleibt | Alle Chips | Erforderlich |
| 3 | Bei SF32LB56xU und SS6700 benötigt VDDIO1 eine Lastschaltersteuerung. PBR0 als Steuersignal verwenden; sind GPIOs verfügbar, kann PB22 die Versorgung steuern. Das Download-Tool muss die VDDIO1-Versorgung aktivieren | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 4 | Bei SF32LB56xU und SS6700 benötigt die Versorgung des externen Flash einen von PBR0 gesteuerten Lastschalter | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 5 | <span class="flag-yellow">Im Hibernate-off- oder Standby-off-Modus benötigen VDDIOSA und VDDIOSB des SF32LB56xV jeweils einen von PBR0 gesteuerten Lastschalter; VDDIOSC muss dagegen ständig versorgt sein</span> | SF32LB565/567 | Erforderlich |
| 6 | <span class="flag-yellow">Die MPI3-Flash-Versorgung bei SF32LB56xV benötigt einen von PA03 gesteuerten Lastschalter; die MPI3-Flash-Versorgung während des Downloads aktivieren</span> | SF32LB565/567 | Erforderlich |
| 7 | Der Ruhestrombedarf im Deep-Sleep-Modus ist dokumentiert. Der Ruhestrom in Deep Sleep ist höher als in Standby; dieser Modus eignet sich für häufiges Aufwecken mit Intervallen unter 200 ms. Alle PB-Pins unterstützen Wake-up; der Ruhestrom beträgt 90 µA | Alle Chips | Erforderlich |
| 8 | Die Summe der Ruheströme aller gewählten Peripheriegeräte im Deep-Sleep-Modus ist dokumentiert und erfüllt die Projektanforderungen | Alle Chips | Erforderlich |
| 9 | Der Ruhestrombedarf im Standby-Modus ist dokumentiert. Standby eignet sich für selteneres Aufwecken mit Intervallen über 200 ms. Nur PA50, PA51, PB33 und PB34 unterstützen Wake-up; der Ruhestrom beträgt 4–5 µA | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 10 | Der Ruhestrombedarf im Standby-Modus ist dokumentiert. Standby eignet sich für selteneres Aufwecken mit Intervallen über 200 ms. Nur PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35 und PB36 unterstützen Wake-up; der Ruhestrom beträgt 4–5 µA | SF32LB565/567 | Erforderlich |
| 11 | Der Standby-Stromverbrauch der ausgewählten Peripheriegeräte ist dokumentiert und erfüllt die Projektanforderungen | Alle Chips | Erforderlich |

</div>

### 5.8.24. Download { #5824-download }

<div align="center"><em>Tabelle 5.8.24-1: Checkliste Download</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SF32LB56xU: Download-Testpunkte für VBAT, GND, VDDIO2, VDDIO3 oder VDDIO4, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD und einen der Pins PB20/PB21/PB25 vorsehen | SF32LB560/561/563/56W und SS6700A | Erforderlich |
| 2 | SF32LB56xV: Download-Testpunkte für VBAT, GND, VDDIOA, VDDIOB, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD und einen der Pins PB20/PB21/PB25 vorsehen | SF32LB565/567 | Erforderlich |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
