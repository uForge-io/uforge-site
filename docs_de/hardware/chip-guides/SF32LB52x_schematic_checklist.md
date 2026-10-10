---
icon: lucide/list-checks
description: "Schaltplan-Checkliste für den SF32LB52x: Gehäuse, Stromversorgung, Takt, RF, Speicher, Display und Fertigung."
hide:
    - navigation
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB52x Hardware-Design-Leitfaden — Schaltplan-Checkliste { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite enthält die Schaltplan-Checkliste aus Abschnitt 5.8. Zurück zu [Minimalsystem, Stromversorgung und Takt](SF32LB52x_schematic_design.md), der ersten der drei Seiten zu den Schaltplan-Designrichtlinien.

## 5.8. Schaltplan-Checkliste { #58-schematic-checklist }

Jede Tabelle behandelt einen Funktionsblock des Schaltplans. Die Spalte „Gilt für“ nennt die Stromversorgungsvariante oder Siliziumrevision des SF32LB52x, für die ein Prüfpunkt gilt, wenn er nicht alle Varianten betrifft.

„Erforderlich“ bedeutet, dass der zutreffende Punkt geprüft werden muss; es verlangt nicht den Einbau sämtlicher aufgeführter Peripherie. Bedingte Prüfungen gelten nur, wenn die entsprechende Schaltung oder Funktion vorhanden ist. Die Kategorien Erforderlich/Optional der Quelle bleiben erhalten; Empfehlungen sind von verbindlichen Grenzwerten zu unterscheiden.

### 5.8.1. Gehäuse { #581-package }

<div align="center"><em>Tabelle 5.8.1-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Das Gehäuse der ausgewählten Teilenummer ist korrekt, einschließlich Pin-Namen und Pin-Nummern | Alle Varianten | Erforderlich |

</div>

### 5.8.2. Stromversorgung { #582-power-supply }

<div align="center"><em>Tabelle 5.8.2-1: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VBUS-Versorgungsspannung ist <span class="flag-red">4,6 V–5,5 V</span> | nur 520/3/5/7 | Erforderlich |
| 2 | Soll das Display unmittelbar beim Anschließen des Ladegeräts einschalten, wird der interne Ladeblock nicht empfohlen; bevorzugt wird ein externer Lade-IC mit Power-Path-Management | nur 520/3/5/7 | Erforderlich |
| 3 | Der integrierte Lader ist nur geeignet, wenn es akzeptabel ist, den Akku zunächst bis auf 3,6 V zu laden, bevor die Software das Display einschaltet | nur 520/3/5/7 | Erforderlich |
| 4 | Ein OVP-Bauteil mit integriertem LDO-Ausgang (z. B. LP5305AQVF) wird empfohlen: LDO-Ausgang 4,7–5,4 V, Belastbarkeit ≥0,5 A, Überstromschutz-Auslösung ≥0,7 A | nur 520/3/5/7 | Erforderlich |
| 5 | Bei einem OVP-Bauteil mit einstellbarem OVLO haben die Teilerwiderstände 1 % Toleranz, und der Fehler von V_OVLO_TH liegt unter 3 %. Sowohl der minimale als auch der maximale V_OVP-Wert liegen innerhalb von 5,15–5,55 V. Die Quelle bezeichnet 5,15 V als maximale Eingangsspannung des Ladegeräts und 5,55 V als obere Eingangsgrenze des 52x-Ladeblocks; siehe den Hinweis zu den abweichenden Quellenangaben nach der Tabelle | nur 520/3/5/7 | Erforderlich |
| 6 | Wird der integrierte Lader nicht verwendet, kann VBUS unbeschaltet bleiben und der zugehörige Kondensator entfallen. VBAT kann dann jedoch nicht mehr als Versorgungsausgang dienen; deshalb einen externen 1-µF-Kondensator an VBAT anschließen | nur 520/3/5/7 | Erforderlich |
| 7 | Batteriespannungserfassung: Der Chip führt bereits einen internen GPADC-Kanal auf VBAT (bzw. VBATS) — VBAT nicht zusätzlich auf einen GPADC-Pin führen | Alle Varianten | Erforderlich |
| 8 | <span class="flag-red">Versorgungsspannung an den Pins VCC und VBAT ist 3,2 V–4,7 V</span> | nur 520/3/5/7 | Erforderlich |
| 9 | BUCK_LX- und BUCK_FB-Verbindungen sind korrekt | Alle Varianten | Erforderlich |
| 10 | Für die Spannungsmessung am Ausgang VDD_VOUT1 ist ein Prüfpunkt oder ein gut zugänglicher Filterkondensator vorgesehen | Alle Varianten | Erforderlich |
| 11 | Für die Spannungsmessung am Ausgang VDD_VOUT2 ist ein Prüfpunkt oder ein gut zugänglicher Filterkondensator vorgesehen | Alle Varianten | Erforderlich |
| 12 | Für die Spannungsmessung am Ausgang VDD_RET ist ein Prüfpunkt oder ein gut zugänglicher Filterkondensator vorgesehen | Alle Varianten | Erforderlich |
| 13 | Für die Spannungsmessung am Ausgang VDD_RTC ist ein Prüfpunkt oder ein gut zugänglicher Filterkondensator vorgesehen | Alle Varianten | Erforderlich |
| 14 | AVDD_BRF wird über VSYS versorgt | nur 520/3/5/7 | Erforderlich |
| 15 | AVDD33_AUD wird über LDO2 versorgt | nur 520/3/5/7 | Erforderlich |
| 16 | VSYS ist eine ausschließlich MCU-intern genutzte Versorgung — nicht zur Versorgung anderer Peripherie verwenden | nur 520/3/5/7 | Erforderlich |
| 17 | LDO2_OUT wird zur Versorgung von Speicher, Sensoren und ähnlichen Peripheriegeräten empfohlen; bei Bedarf kann zur Steuerung der Versorgung ein Lastschalter eingefügt werden | nur 520/3/5/7 | Erforderlich |
| 18 | <span class="flag-red">Die Summe der Spitzenströme aller von LDO2 versorgten Peripheriegeräte beträgt höchstens 150 mA</span> | nur 520/3/5/7 | Erforderlich |
| 19 | LDO3_OUT wird zur Versorgung des Vibrationsmotors empfohlen | nur 520/3/5/7 | Erforderlich |
| 20 | <span class="flag-red">Die Summe der Spitzenströme aller von LDO3 versorgten Peripheriegeräte beträgt höchstens 150 mA</span> | nur 520/3/5/7 | Erforderlich |
| 21 | Das LCD benötigt eine eigene LDO-Versorgung mit niedrigem Ruhestrom (Iq) | Alle Varianten | Erforderlich |
| 22 | Die LED des Herzfrequenzsensors sollte aus VBAT versorgt werden | Alle Varianten | Erforderlich |
| 23 | Der Ladeeingang benötigt eine OVP-Schaltung | Alle Varianten | Erforderlich |
| 24 | Muss das System bei zu niedriger Akkuspannung aus den 5 V am Ladeeingang versorgt werden, wird ein Lade-IC mit Power-Path-Management empfohlen; <span class="flag-red">die an VCC anliegende Spannung darf 4,7 V nicht überschreiten</span> | nur 520/3/5/7 | Erforderlich |
| 25 | <span class="flag-red">SF32LB52DUB6: PVDD = 1,8 V</span> | nur 52D | Erforderlich |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6: PVDD = 3,3 V</span> | 52B/E/G/J | Erforderlich |
| 27 | <span class="flag-red">SF32LB52BU36 und SF32LB52BU56: VDD_SIP benötigt eine externe 3,3-V-Versorgung</span> | nur 52B | Erforderlich |
| 28 | <span class="flag-red">SF32LB52DUB6: VDD_SIP benötigt eine externe 1,8-V-Versorgung</span> | nur 52D | Erforderlich |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6: VDD_SIP benötigt keine externe Versorgung — ein externer Kondensator genügt</span> | 52E/G/J | Erforderlich |
| 30 | VBATS ist das Batteriespannungs-Erfassungssignal; der Erfassungsbereich der Batteriespannung ist 0–4,5 V | 52B/D/E/G/J | Erforderlich |

</div>

!!! important "OVP-Schwellen sind keine VBUS-Betriebsspannungsgrenzen"
    Punkt 5 der Quelle nennt 5,15–5,55 V für die Auswahl einer einstellbaren OVLO-Schwelle, während Punkt 1 die 4,6–5,5-V-VBUS-Prüfung der Arbeitsmappe wiedergibt. 5,55 V ist nicht als zulässige dauerhafte Betriebsspannung an VBUS zu verstehen. Der [Abschnitt zum Stromversorgungssystem](SF32LB52x_schematic_design.md#52-power-system) erläutert die Quellenabweichungen und nennt einen abweichenden OVP-Auswahlbereich aus dem Anwendungshinweis. Vor der Freigabe sind Schwellen und Betriebsgrenzen für das gewählte Bauteil mit SiFli zu klären.

!!! note "Quelle und Geltungsbereich der VBUS-Werte"
    Electrical Specification-A3 nennt 4,5–5,5 V als VBUS-Versorgungsbereich. Der Anwendungshinweis für batteriebetriebene Varianten gibt in seiner Versorgungstabelle 4,6–5,5 V an und verlangt bei maximalem Ladestrom mindestens 4,6 V am VBUS-Pin. Diese Werte haben unterschiedliche Kontexte; berücksichtigen Sie bei der Prüfung der Mindestspannung am Chip Versorgungstoleranz und Spannungsabfall.

### 5.8.3. Stromversorgungskondensatoren und -induktivitäten { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabelle 5.8.3-1: Checkliste Stromversorgungskondensatoren und -induktivitäten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VBUS-Kondensator ≥10 µF | nur 520/3/5/7 | Erforderlich |
| 2 | VBAT-Kondensator ≥4,7 µF | nur 520/3/5/7 | Erforderlich |
| 3 | Bei SF32LB523/5/7 ist Pin 24 VCC — externer Kondensator ≥10 µF | 523/5/7 | Erforderlich |
| 4 | Bei den Varianten 523/5/7/B/D/E/G/J ist <span class="flag-red">Pin 23 VDD_SIP — externer Kondensator ≥2,2 µF</span> | 523/5/7/B/D/E/G/J | Erforderlich |
| 5 | Bei SF32LB520 ist Pin 24 ein GPIO, PA21 | 520/SS6500 | Erforderlich |
| 6 | Bei SF32LB520 ist Pin 23 VCC — externer Kondensator ≥10 µF | 520/SS6500 | Erforderlich |
| 7 | BUCK_FB-Kondensator = 4,7 µF | Alle Varianten | Erforderlich |
| 8 | VDD_VOUT1-Kondensator = 4,7 µF | Alle Varianten | Erforderlich |
| 9 | VDD_VOUT2-Kondensator = 4,7 µF | Alle Varianten | Erforderlich |
| 10 | VDD_RET-Kondensator = 0,47 µF | Alle Varianten | Erforderlich |
| 11 | VDD_RTC-Kondensator = 1 µF | Alle Varianten | Erforderlich |
| 12 | <span class="flag-red">VDD33_VOUT1-Gesamtkapazität ≤9,6 µF</span> | <span class="flag-red">nur 520/3/5/7</span> | Erforderlich |
| 13 | <span class="flag-red">VDD33_VOUT2-Gesamtkapazität ≤9,6 µF</span> | <span class="flag-red">nur 520/3/5/7</span> | Erforderlich |
| 14 | <span class="flag-red">VSYS-Gesamtkapazität ≤9,6 µF</span> | <span class="flag-red">nur 520/3/5/7</span> | Erforderlich |
| 15 | MIC_BIAS-Kondensator = 1 µF | Alle Varianten | Erforderlich |
| 16 | <span class="flag-red">AVDD_BRF-Kondensator = 4,7 µF</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 17 | <span class="flag-red">AVDD33_AUD-Kondensator = 2,2 µF</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 18 | AUD_VREF-Kondensator = 1 µF | Alle Varianten | Erforderlich |
| 19 | <span class="flag-red flag-yellow">VSYS-Kondensator = 4,7 µF</span> | <span class="flag-red flag-yellow">nur 520/3/5/7</span> | Erforderlich |
| 20 | GPADC-VREFP-Kondensator = 4,7 µF | Alle Varianten | Erforderlich |
| 21 | Die Teilenummer der BUCK-Induktivität steht auf der [Liste der von SiFli freigegebenen Lieferanten (AVL)][SiFli Approved Vendor List] | Alle Varianten | Erforderlich |
| 22 | Ist die BUCK-Induktivität nicht AVL-gelistet, erfüllt sie L = 4,7 µH, DCR ≤0,4 Ω, Isat ≥450 mA | Alle Varianten | Erforderlich |
| 23 | <span class="flag-red">Bei GPS oder anderen störempfindlichen Peripheriegeräten einen Footprint für einen parallel nach Masse geschalteten Kondensator an BUCK_LX vorsehen; die Kapazität ist anhand der tatsächlichen Testergebnisse festzulegen</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 24 | <span class="flag-red">Ruhestrom des gewählten DCDC ist dokumentiert und erfüllt die Projektanforderungen</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 25 | <span class="flag-red">Ruhestrom des gewählten LDO ist dokumentiert und erfüllt die Projektanforderungen</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |

</div>

!!! note "Geltungsbereich von Pin 24 in der Quellcheckliste"
    Der Text des Kondensator-Prüfpunkts 3 nennt SF32LB520/3/5/7, die Spalte „Gilt für“ dagegen nur 523/5/7. Die Punkte 5 und 6 weisen bei SF32LB520 Pin 24 PA21 und Pin 23 VCC zu. Diese Tabelle folgt für Punkt 3 dem engeren Geltungsbereich der Quelle. Vor der Freigabe ist die Pinbelegung der genauen Teilenummer zu prüfen.

### 5.8.4. Takt { #584-clock }

<div align="center"><em>Tabelle 5.8.4-1: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der 48-MHz-Hauptquarz ist eine AVL-gelistete Teilenummer | Alle Varianten | Erforderlich |
| 2 | Ist der 48-MHz-Quarz nicht AVL-gelistet, erfüllt er 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), Frequenztoleranz ≤±10 ppm, ESR ≤30 Ω (22 Ω empfohlen) | Alle Varianten | Erforderlich |
| 3 | Der RTC-32,768-kHz-Quarz ist eine AVL-gelistete Teilenummer | Alle Varianten | Erforderlich |
| 4 | Ist der 32,768-kHz-Quarz nicht AVL-gelistet, erfüllt er CL ≤12,5 pF (7 pF empfohlen), Frequenztoleranz ≤±20 ppm, ESR ≤80 kΩ (38 kΩ empfohlen) | Alle Varianten | Erforderlich |
| 5 | Beim 52x können PA24/25/26/27 alle den xtal32k-Takt ausgeben | Alle Varianten | Erforderlich |

</div>

### 5.8.5. Bootstrap-Konfiguration { #585-bootstrap-configuration }

<div align="center"><em>Tabelle 5.8.5-1: Checkliste Bootstrap-Konfiguration</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Bei Verwendung eines externen <span class="flag-purple">SPI-NOR-Flashs benötigen PA13 und PA17 keinen Pull-up</span> | Alle Varianten | Erforderlich |
| 2 | Bei Verwendung eines externen <span class="flag-red">SPI-NAND-Flashs</span> benötigt PA13 keinen Pull-up; <span class="flag-red">PA17 benötigt einen 7,5-kΩ-Pull-up</span> an der VDD des Flash-Bausteins | Alle Varianten | Erforderlich |
| 3 | Bei Verwendung eines externen <span class="flag-blue">SD-NAND-Flashs</span> benötigt PA17 keinen Pull-up; <span class="flag-blue">PA13 benötigt einen 7,5-kΩ-Pull-up</span> an der VDD des Flash-Bausteins | Alle Varianten | Erforderlich |
| 4 | Bei Verwendung einer externen <span class="flag-green">eMMC benötigen sowohl PA13 als auch PA17 einen 7,5-kΩ-Pull-up</span> an der VCCQ der eMMC | <span class="flag-red">52D/E/G/J</span> | Erforderlich |

</div>

### 5.8.6. RF { #586-rf }

<div align="center"><em>Tabelle 5.8.6-1: Checkliste RF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Für das ANT-Signal ist im Schaltplan eine Impedanz von 50 Ω für eine unsymmetrische Leitung angegeben | Alle Varianten | Erforderlich |
| 2 | Für das ANT-Signal ist ein π-Anpassnetzwerk vorgesehen: ein paralleler NC-Kondensator (nicht bestückt) und ein 15-pF-Serienkondensator | Alle Varianten | Erforderlich |
| 3 | Falls eine Filterung von Nebenwellen erforderlich ist, ist ein π-Anpassnetzwerk mit einer 2,7-nH-Serieninduktivität und einem 2-pF-Parallelkondensator vorgesehen | Alle Varianten | Optional |
| 4 | <span class="flag-red">Falls eine externe PA-/LNA-Steuerung erforderlich ist, PA00 mit RX_EN und PA01 mit TX_EN verbinden</span> | Alle Varianten | Optional |

</div>

### 5.8.7. I/O-Ressourcenzuweisung { #587-io-resource-allocation }

<div align="center"><em>Tabelle 5.8.7-1: Checkliste I/O-Ressourcenzuweisung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Eine mit dem Schaltplan übereinstimmende GPIO-Ressourcenzuweisungstabelle liegt vor | Alle Varianten | Erforderlich |
| 2 | Die GPIO-Zuweisung in der Ressourcentabelle stimmt mit dem Schaltplan überein | Alle Varianten | Erforderlich |
| 3 | Die tatsächliche GPIO-Zuweisung entspricht der Empfehlung von SiFli (siehe HDK-I/O-Konfigurationsdatei) | Alle Varianten | Erforderlich |

</div>

### 5.8.8. Hardware-Wake-up { #588-hardware-wake-up }

<div align="center"><em>Tabelle 5.8.8-1: Checkliste Hardware-Wake-up</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">Wake-up-Interrupt-Quellen sind korrekt (verfügbare Wake-up-Interrupt-Quellen: PA24–PA27 und PA34–PA44, insgesamt 15 Pins)</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |

</div>

### 5.8.9. Speicher { #589-storage }

<div align="center"><em>Tabelle 5.8.9-1: Checkliste Speicher</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Wenn MPI2 (SD1) mit SPI-NOR-Flash verbunden ist: <span class="flag-red">PA13 (MPI D1) und PA17 (MPI D3) benötigen beide keinen Pull-up</span> | Alle Varianten | Erforderlich |
| 2 | Wenn MPI2 (SD1) mit SPI-NAND-Flash verbunden ist: <span class="flag-red">PA13 (MPI D1) benötigt keinen Pull-up; PA17 (MPI D3) muss einen 7,5-kΩ-Pull-up haben</span> | Alle Varianten | Erforderlich |
| 3 | Wenn MPI2 (SD1) mit SD-NAND-Flash verbunden ist: <span class="flag-red">PA13 (SD D3) muss einen 7,5-kΩ-Pull-up haben, PA17 (SD D1) benötigt keinen Pull-up, PA15 (SD CMD) muss einen 7,5-kΩ-Pull-up haben</span> | Alle Varianten | Erforderlich |
| 4 | Wenn MPI2 (SD1) mit eMMC verbunden ist: <span class="flag-red">PA13 (SD D3) und PA17 (SD D1) müssen beide 7,5-kΩ-Pull-ups haben, PA15 (SD CMD) muss einen 7,5-kΩ-Pull-up haben</span> | <span class="flag-red">52D/E/G/J</span> | Erforderlich |
| 5 | Bei SF32LB520 und SF32LB52B muss der externe Speicher SPI-NOR-Flash sein | 520/B | Erforderlich |
| 6 | Wenn Anforderungen an die Stromaufnahme im ausgeschalteten Zustand bestehen, <span class="flag-red">muss die Versorgung des externen Flashs über PA11 schaltbar sein</span>, High zum Einschalten / Low zum Ausschalten | nur 520/3/5/7 | Erforderlich |
| 7 | Wenn Anforderungen an die Stromaufnahme im ausgeschalteten Zustand bestehen, <span class="flag-red">muss die Versorgung des externen Flashs über PA21 schaltbar sein</span>, High zum Einschalten / Low zum Ausschalten | <span class="flag-red">52B/D/E/G/J</span> | Erforderlich |
| 8 | Wenn Anforderungen an die Stromaufnahme im ausgeschalteten Zustand bestehen, <span class="flag-red">muss die Versorgung von VDD_SIP über PA21 schaltbar sein</span>, High zum Einschalten / Low zum Ausschalten | <span class="flag-red">52B/D/E/G/J</span> | Erforderlich |
| 9 | <span class="flag-red">Wenn MPI ein NOR-Flash mit 32 MB oder mehr ansteuert, muss die Flash-Versorgung über PA21 schaltbar sein, damit sie abgeschaltet werden kann</span> | <span class="flag-red">52B/D/E/G/J</span> | Erforderlich |
| 10 | Wenn SD1 mit einem SD-NAND-Gerät verbunden ist, sind die Signalverbindungen korrekt | Alle Varianten | Erforderlich |
| 11 | <span class="flag-red">Flash-CLK- und Datenleitungen haben 33-Ω-Serienwiderstände</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 12 | <span class="flag-red">Bei zwei externen NOR-Flash-Bausteinen werden CLK/D0–D3 gemeinsam genutzt. Flash 1 verwendet PA12 als CS, Flash 2 PA26. Dieser Pin hat einen internen Pull-up und eignet sich daher für ein aktiv-low-CS-Signal: Beim Reset liegt er standardmäßig auf High (Baustein nicht ausgewählt).</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 13 | <span class="flag-red">Bei zwei externen NOR-Flash-Bausteinen muss der erste eine Kapazität von 16 MB haben; für den zweiten sind 8 MB oder 16 MB zulässig</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 14 | Der I/O-Logikpegel des Peripheriegeräts stimmt mit dem des Hauptchips überein | Alle Varianten | Erforderlich |
| 15 | <span class="flag-red">Das ausgewählte NOR-Flash-Bauteil ist im Leitfaden zur Auswahl der Schlüsselkomponenten als qualifiziert aufgeführt; andernfalls erkennt das ROM es möglicherweise nicht und das System startet eventuell nicht</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 16 | <span class="flag-red">Das ausgewählte SPI-/SD-NAND-Flash-Bauteil ist im Leitfaden zur Auswahl der Schlüsselkomponenten als qualifiziert aufgeführt; andernfalls erkennt das ROM es möglicherweise nicht und das System startet eventuell nicht</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |

</div>

### 5.8.10. Display { #5810-display }

<div align="center"><em>Tabelle 5.8.10-1: Checkliste Display</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Bei Anschluss an ein QSPI-Display sind die Signalverbindungen korrekt | Alle Varianten | Erforderlich |
| 2 | Bei Anschluss an ein Display mit 8080-Schnittstelle sind die Signalverbindungen korrekt | Alle Varianten | Erforderlich |
| 3 | Bei Anschluss an ein JDI-Display sind die Signalverbindungen korrekt | Alle Varianten | Erforderlich |
| 4 | Die Signalverbindungen des LCD-QSPI sind korrekt; <span class="flag-red">CLK- und Datenleitungen haben 100-Ω-Serienwiderstände</span> | Alle Varianten | Erforderlich |
| 5 | Die LCD-RSTB-Verbindung ist korrekt (PA0 empfohlen) | Alle Varianten | Erforderlich |
| 6 | Der TE-Eingang des LCDC ist korrekt mit dem TE- oder Fmark-Signal des Panels verbunden | Alle Varianten | Erforderlich |
| 7 | TP-Signale folgen der empfohlenen Pin-Zuweisung (siehe EVB-I/O-Konfigurationsdatei) | Alle Varianten | Erforderlich |
| 8 | Es ist geklärt, ob ein Always-on-Display erforderlich ist | Alle Varianten | Erforderlich |
| 9 | Ein Low-Iq-LDO versorgt das Display; <span class="flag-red">PA30 wird zur Steuerung der LDO-Freigabe empfohlen</span> | Alle Varianten | Erforderlich |
| 10 | Es ist geklärt, ob die Versorgung von TP und LCD gemeinsam oder getrennt gesteuert wird | Alle Varianten | Erforderlich |
| 11 | Wenn das LCD einen Lichtsensor integriert, ist auch dessen Stromversorgung bereitgestellt | Alle Varianten | Erforderlich |
| 12 | TFT-LCD-Hintergrundbeleuchtungssteuerung: schaltet die Hintergrundbeleuchtung bei einem High-Signal ein und bei Low aus (aktiv high), einen Pull-down-(PD)-GPIO verwenden; schaltet sie bei Low ein und bei High aus (aktiv low), einen Pull-up-(PU)-GPIO verwenden | Alle Varianten | Erforderlich |
| 13 | <span class="flag-red">SPI-LCD: 3-Draht-Modus — CS an PA03, CLK an PA04, DATA an PA05; 4-Draht-Modus — CS an PA03, CLK an PA04, DATA an PA05, DC an PA06</span> | Alle Varianten | Erforderlich |
| 14 | Sharp-Memory-/JDI-Display an der JDI-Schnittstelle des MCU: VCOM und VB an MCU-PA24, VA an MCU-PA25, R0/G0/B0 an MCU-R1/G1/B1, R1/G1/B1 an MCU-R2/G2/B2, GSP an MCU-VST, BSP an MCU-HST, GCK an MCU-VCK, BCK an MCU-HCK, GEN an MCU-ENB und INTB an MCU-XRST anschließen | Alle Varianten | Erforderlich |
| 15 | Der I/O-Logikpegel des Peripheriegeräts stimmt mit dem des Hauptchips überein | Alle Varianten | Erforderlich |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>Tabelle 5.8.11-1: Checkliste GPADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der GPADC-Eingang ist mit dem entsprechenden Pin verbunden <span class="flag-red">(PA28–PA34, 7 GPIOs können als GPADC-Eingänge verwendet werden)</span> | Alle Varianten | Optional |
| 2 | Die in GPADC eingespeiste Spannung bleibt innerhalb von 0–3,3 V | Alle Varianten | Optional |
| 3 | Für jeden von GPADC gemessenen Widerstandsteiler-Eingang Teilerwiderstände mit 1 % Toleranz verwenden; <span class="flag-red">jeder GPADC-Kanal hat einen 100-nF-Filterkondensator nahe am Chip-Pin</span> | Alle Varianten | Erforderlich |

</div>

### 5.8.12. Tasten { #5812-buttons }

<div align="center"><em>Tabelle 5.8.12-1: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Es ist geklärt, ob die Tasten den MCU aufwecken müssen | Alle Varianten | Erforderlich |
| 2 | Der Anschluss eines normalen Tasters ist korrekt ausgelegt (Pull-up vorhanden, Widerstandswert und Pull-up-Spannungsdomäne korrekt) | Alle Varianten | Erforderlich |
| 3 | Der Ein-/Aus-Taster verwendet PA34 und ist aktiv-high; ein 10 Sekunden langer Tastendruck löst einen Reset aus. <span class="flag-red">Der 10-kΩ-Pull-down-Widerstand muss sich auf der Hauptplatine befinden.</span> | Alle Varianten | Erforderlich |
| 4 | Alle Tastensignale verfügen über ESD-Schutz | Alle Varianten | Erforderlich |

</div>

### 5.8.13. EOS- und ESD-Schutz { #5813-eos-and-esd-protection }

<div align="center"><em>Tabelle 5.8.13-1: Checkliste EOS- und ESD-Schutz</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Ladeschnittstelle verfügt über EOS-, ESD- und OVP-Schutz | Alle Varianten | Erforderlich |
| 2 | Die Batterieschnittstelle verfügt über ein ESD-Bauteil | Alle Varianten | Erforderlich |
| 3 | Die Antennenschnittstelle verfügt über ein ESD-Bauteil | Alle Varianten | Erforderlich |
| 4 | Die Stromversorgungsschnittstellen von LCD und TP verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |
| 5 | Die Leitungen TP-I2C, RST und INT verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |
| 6 | Stromversorgungsschnittstelle und Signalleitungen des Herzfrequenzsensors verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabelle 5.8.14-1: Checkliste I2C</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | I2C verfügt über Pull-ups mit korrektem Widerstandswert; für 400-kHz-Betrieb werden 2,2-kΩ-Pull-ups empfohlen; die peripherieseitige Spannungsdomäne verwenden und die Pull-up-Versorgung beim Abschalten zusammen mit der Peripherie abschalten | Alle Varianten | Erforderlich |
| 2 | Das I2C-Interrupt-Signal unterstützt bei Bedarf Hardware-Wake-up | Alle Varianten | Erforderlich |
| 3 | I2C-Geräte wie Beschleunigungs-, Herzfrequenz- und geomagnetische Sensoren unterstützen das Auslesen aller Daten in einem einzigen Burst-Lesezugriff | Alle Varianten | Erforderlich |
| 4 | Teilen sich mehrere Geräte einen I2C-Bus, müssen sie unterschiedliche Adressen haben | Alle Varianten | Erforderlich |

</div>

### 5.8.15. Analoges Audio { #5815-analog-audio }

<div align="center"><em>Tabelle 5.8.15-1: Checkliste analoges Audio</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die MEMS-Mikrofonverbindung ist korrekt | Alle Varianten | Optional |
| 2 | Das MEMS-Mikrofon wird von MIC_BIAS versorgt | Alle Varianten | Optional |
| 3 | Die analoge unsymmetrische ECM-Mikrofonverbindung ist korrekt | Alle Varianten | Optional |
| 4 | Das analoge unsymmetrische ECM-Mikrofon wird von MIC_BIAS versorgt | Alle Varianten | Optional |
| 5 | Alle Audio-ADC-Eingänge haben einen DC-Blockkondensator von mindestens 2,2 µF | Alle Varianten | Optional |
| 6 | Die Audio-DAC-Ausgänge DACP und DACN haben jeweils einen 1-kΩ-Serienwiderstand nahe am Chip, mit einem 1,5-nF-Kondensator parallel zwischen DACP und DACN | Alle Varianten | Optional |
| 7 | <span class="flag-red">Als Audio-Leistungsverstärker wird der AW8155B empfohlen; er ist per Software auf den Class-A/B-Modus einzustellen. Andere Verstärker müssen durch Tests verifiziert werden.</span> | Alle Varianten | Optional |
| 8 | <span class="flag-red">Wird der integrierte analoge Audio-ADC-Pfad nicht verwendet, wird empfohlen, ADCP über einen 0-Ω-Widerstand mit Masse zu verbinden</span> | Alle Varianten | Optional |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>Tabelle 5.8.16-1: Checkliste SPI</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die SPI-Verbindungen sind korrekt: SDO des MCU ist mit SDI der Peripherie verbunden, SDI des MCU mit SDO der Peripherie | Alle Varianten | Optional |
| 2 | Die Timing-Anforderungen der SPI-Peripherie sind erfüllt | Alle Varianten | Optional |
| 3 | Der I/O-Logikpegel des Peripheriegeräts stimmt mit dem des Hauptchips überein | Alle Varianten | Optional |

</div>

### 5.8.17. USART und Debug-Schnittstelle { #5817-usart-and-debug-interface }

<div align="center"><em>Tabelle 5.8.17-1: Checkliste USART und Debug-Schnittstelle</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | PA18/PA19 (gemultiplext als DBG_UART) bilden die Programm-Download- und Debug-Schnittstelle — Testpunkte sind reserviert, <span class="flag-red">mit einem 100-Ω-Serienwiderstand</span> | Alle Varianten | Erforderlich |
| 2 | Die UART-Verbindungen sind korrekt: RXD des MCU ist mit TXD der Peripherie verbunden, TXD des MCU mit RXD der Peripherie | Alle Varianten | Erforderlich |
| 3 | Wenn PA35/PA36 als UART mit einem Peripheriegerät verbunden sind, muss dieses beim Reset des MCU ausgeschaltet sein oder die Software muss die Pins auf Low setzen | Alle Varianten | Erforderlich |
| 4 | Der I/O-Logikpegel des Peripheriegeräts stimmt mit dem des Hauptchips überein | Alle Varianten | Erforderlich |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>Tabelle 5.8.18-1: Checkliste PWM</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die LCD-Hintergrundbeleuchtungssteuerung verwendet PA1 (empfohlen) | Alle Varianten | Optional |
| 2 | Der PWM-Pin des Vibrationsmotors verwendet PA20 | Alle Varianten | Erforderlich |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>Tabelle 5.8.19-1: Checkliste USB</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die USB-Schnittstellenverbindung ist korrekt | Alle Varianten | Optional |
| 2 | Die USB-Schnittstelle verfügt über ESD-Schutz | Alle Varianten | Optional |
| 3 | Ist USB im normalen Betrieb (außerhalb des Schlafmodus) eingeschaltet, kann der Host das An- und Abstecken erkennen. Soll die Erkennung auch im Schlafmodus des MCU möglich sein, eine VBUS-Spannungsteilerschaltung vorsehen, die am Wake-up-Pin des MCU einen zum I/O-Pegel passenden Spannungspegel ausgibt. Es wird empfohlen, diesen Pin zugleich für die Erkennung eines angeschlossenen Ladegeräts zu verwenden | Alle Varianten | Optional |

</div>

### 5.8.20. Stromaufnahme { #5820-power-consumption }

<div align="center"><em>Tabelle 5.8.20-1: Checkliste Stromaufnahme</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | LDOs und DCDCs haben einen aktiv-high-Enable-Eingang. Ist der Ausgang standardmäßig ausgeschaltet, einen Pull-down-Widerstand von 1 MΩ bis 5,1 MΩ zwischen EN und Masse vorsehen; den Wert an die Anforderungen an die Stromaufnahme des Projekts anpassen | Alle Varianten | Erforderlich |
| 2 | Für die MOSFET-basierte Versorgungsschaltung eine PMOS-/NMOS-Kombination verwenden. Der Steuerpin schaltet bei High ein und bei Low aus; er ist über einen 1-MΩ-Pull-down-Widerstand mit Masse verbunden | Alle Varianten | Erforderlich |
| 3 | Der Versorgungsschalter für den externen Flash wird über PA11 gesteuert | nur 520/3/5/7 | Erforderlich |
| 4 | <span class="flag-red">Der Versorgungsschalter für den externen Flash und der VDD_SIP-Versorgungsschalter werden beide über PA21 gesteuert</span> | <span class="flag-red">52A/D</span>[^52a-note] | In der Quelle nicht angegeben[^52a-category-note] |
| 5 | VSYS ist, wenn als GPIO-Pull-up-Versorgung verwendet, immer eingeschaltet; dies ist als mit den Anforderungen an die Stromaufnahme vereinbar bestätigt | nur 520/3/5/7 | Erforderlich |
| 6 | Wird LDO2 oder LDO3 als GPIO-Pull-up-Versorgung verwendet, ist bestätigt, dass das Szenario mit abgeschaltetem LDO2/LDO3 weiterhin die Designanforderungen erfüllt | nur 520/3/5/7 | Erforderlich |
| 7 | Die I2C-Pull-up-Versorgung schaltet zusammen mit der IO-Versorgung der Peripherie, um Leckströme zu vermeiden | Alle Varianten | Erforderlich |
| 8 | PA09-Hinweis: Beim Einschalten des Displays auf High setzen und im Schlafmodus auf Low ziehen | Siliziumrevision A2 oder älter | Erforderlich |
| 9 | Der erforderliche Ruhestrom im Deep-Sleep-Modus ist festgelegt und dokumentiert | Alle Varianten | Erforderlich |
| 10 | <span class="flag-red">Die Summe der Ruheströme aller ausgewählten Peripheriegeräte im Deep-Sleep-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |
| 11 | Der erforderliche Ruhestrom im Standby-Modus ist festgelegt und dokumentiert | Alle Varianten | Erforderlich |
| 12 | <span class="flag-red">Die Summe der Ruheströme aller ausgewählten Peripheriegeräte im Standby-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | <span class="flag-red">Alle Varianten</span> | Erforderlich |

[^52a-note]: Die Quelltabelle nennt „52A/52D“. Der [SF32LB52x Hardware-Design-Leitfaden][SF32LB52x Hardware Design Guide - Dev] beschreibt SF32LB52B/D/E/G/J; „52A“ bezeichnet keine dieser Varianten eindeutig. Vor der Anwendung sind die genaue Teilenummer und ihr Datenblatt zu prüfen. „52A“ darf nicht eigenständig durch ein anderes Modell ersetzt werden.
[^52a-category-note]: Die Quelle lässt die Kategorie dieser Zeile leer. Sie bleibt als „In der Quelle nicht angegeben“ erhalten; eine Einstufung als erforderlich oder optional wird nicht abgeleitet. Geltungsbereich und Freigabekriterium für das gewählte Bauteil sind zu bestätigen.

!!! important "Abweichende Pinangaben für den Speicher-Versorgungsschalter"
    Diese Tabelle übernimmt den PA11-Eintrag des Checklisten-Arbeitsblatts für das Schalten des externen Flashs beim SF32LB520/3/5/7. Nach der Quellenpriorität dieses Projekts haben die höherrangigen OpenSiFli-Anwendungshinweise und der Leitfaden zum Schaltplanentwurf Vorrang; sie nennen PA21 zum Schalten der Boot-Speicherversorgung. Verwenden Sie PA21 als quellenbasierte Entwurfsgrundlage und übernehmen Sie PA11 nicht allein aufgrund des niedriger priorisierten Arbeitsblatts. Es klärt nicht, ob PA11 ein separates Enable-Signal auf der Platine oder eine abweichende Pinzuordnung bezeichnet. Klären Sie das konkrete Netz und die Variante vor der Freigabe mit SiFli.

</div>

### 5.8.21. Download- und Debug-Testpunkte { #5821-download-and-debug-test-points }

<div align="center"><em>Tabelle 5.8.21-1: Checkliste Download- und Debug-Testpunkte</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Für Programmierung und Debugging sind Testpunkte für VBAT, GND, PA18 (DBG_UART_RXD), PA19 (DBG_UART_TXD), VSYS, PA34 und weitere erforderliche Signale vorgesehen | Alle Varianten | Erforderlich |

</div>

[SF32LB52x Hardware Design Guide - Dev]: SF32LB52x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
