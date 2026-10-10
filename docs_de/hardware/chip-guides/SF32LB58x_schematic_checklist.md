---
icon: lucide/list-checks
description: "Checkliste zur systematischen Prüfung des SF32LB58x-Schaltplans mit Prüfpunkten zu Stromversorgung, Takt, HF, Speicher, Display und Fertigung."
tags:
    - Hardware
    - Chip
    - Checkliste
hide:
    - navigation
---

# SF32LB58x Hardware-Design-Leitfaden — Schaltplan-Checkliste { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "Teil des SF32LB58x Hardware-Design-Leitfadens"
    Diese Seite enthält die einzelnen Prüfpunkte aus Abschnitt 5.8. Zurück zu den [Schaltplan-Design-Richtlinien](SF32LB58x_schematic_design.md).

## 5.8. Schaltplan-Checkliste { #58-schematic-checklist }

Die folgenden Tabellen sind nach funktionalen Schaltungsblöcken gegliedert. Maßgeblich für die Anwendbarkeit sind die Bedingungen im jeweiligen Prüfpunkt: erforderliche Punkte sind zu prüfen, sobald diese Bedingungen erfüllt sind; optionale Punkte sind relevant, wenn die entsprechende Funktion oder Entwurfsoption verwendet wird.

### 5.8.1. Gehäuse { #581-package }

<div align="center"><em>Tabelle 5.8.1-1: Gehäuse-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Das Gehäuse der ausgewählten Teilenummer ist korrekt, einschließlich Pin-Namen und Pin-Nummern | Erforderlich |

</div>

### 5.8.2. Stromversorgung { #582-power-supply }

<div align="center"><em>Tabelle 5.8.2-1: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PVDD1-Versorgungsspannung beträgt 1,8 V-3,3 V | Erforderlich |
| 2 | PVDD2-Versorgungsspannung beträgt 1,8 V-3,3 V | Erforderlich |
| 3 | BUCK1_LX- und BUCK1_FB-Verbindungen sind korrekt | Erforderlich |
| 4 | BUCK2_LX- und BUCK2_FB-Verbindungen sind korrekt | Erforderlich |
| 5 | LDO_VOUT1-Ausgang hat einen Testpunkt oder einen Filterkondensator, der die Spannungsmessung erleichtert | Erforderlich |
| 6 | VDD_RET-Ausgang hat einen Testpunkt oder einen Filterkondensator, der die Spannungsmessung erleichtert | Erforderlich |
| 7 | VDD_RTC-Ausgang hat einen Testpunkt oder einen Filterkondensator, der die Spannungsmessung erleichtert | Erforderlich |
| 8 | VDDIOA-Versorgungsspannung beträgt 1,8 V-3,3 V; in der ersten Platinenrevision einen 0-Ω-Serienwiderstand reservieren | Erforderlich |
| 9 | VDDIOA2-Versorgungsspannung beträgt 1,8 V-3,3 V; in der ersten Platinenrevision einen 0-Ω-Serienwiderstand reservieren | Erforderlich |
| 10 | VDDIOB-Versorgungsspannung beträgt 1,8 V-3,3 V; in der ersten Platinenrevision einen 0-Ω-Serienwiderstand reservieren | Erforderlich |
| 11 | VDDIOSA-Versorgungsspannung beträgt 1,8 V, und es ist ein Load-Switch vorgesehen, mit dem sie abgeschaltet werden kann | Erforderlich |
| 12 | VDDIOSB-Versorgungsspannung beträgt 1,8 V, und es ist ein Load-Switch vorgesehen, mit dem sie abgeschaltet werden kann | Erforderlich |
| 13 | VDDIOSC-Versorgungsspannung beträgt 1,8 V und muss immer eingeschaltet sein | Erforderlich |
| 14 | AVDD33_USB-Versorgungsspannung beträgt 3,3 V | Erforderlich |
| 15 | AVDD33_ANA-Versorgungsspannung beträgt 3,3 V | Erforderlich |
| 16 | AVDD_BRF-Versorgungsspannung beträgt 1,8 V-3,3 V und muss der VDD1-Versorgung entsprechen | Erforderlich |
| 17 | AVDD33_AUD-Versorgungsspannung beträgt 3,3 V | Erforderlich |
| 18 | AVDD18_DSI-Versorgungsspannung beträgt 1,8 V | Erforderlich |
| 19 | Wenn SF30147C die Stromversorgung übernimmt, muss die TWI-Steuerschnittstelle MCU-PB-Pins verwenden, und diese Pins müssen PD-Pins sein | Erforderlich |
| 20 | Die Ladeschaltung erfordert ein Versorgungspfadmanagement, damit das System bei zu niedriger Batteriespannung über den 5-V-Eingang des Ladegeräts versorgt werden kann | Erforderlich |
| 21 | Wird die Stromversorgung über SF30147C bereitgestellt, ist die dedizierte TWI-Steuerschnittstelle des Chips zu verwenden | Erforderlich |
| 22 | Bei Versorgung über SF30147C muss für die über EN gesteuerten Versorgungsschienen PVDD oder AVDD als Versorgungsdomäne des EN-Signals verwendet werden. EN darf nicht über ein MCU-GPIO angesteuert werden. Alternativ EN mit Masse verbinden und den Ausgang der jeweiligen Versorgungsschiene per Register steuern | Erforderlich |
| 23 | Wenn SF30147C die Stromversorgung übernimmt, können <span class="flag-red">BUCK und LDO1</span> nur über ihre jeweiligen Enable-Signale EN_BUCK und EN_LDO1 gesteuert werden; eine interne Registersteuerung ist nicht vorgesehen | Erforderlich |
| 24 | Bei 58x müssen PVDD und VDDIOB übereinstimmen. Wenn PVDD niedriger als VDDIOB ist, z. B. VDDIOB = 3,3 V und PVDD = 1,8 V, hat VDDIOB in Standby und Hibernate einen Leckstrom von etwa 15 µA | Erforderlich |
| 25 | Bei 58x ist Pin B4 VDD_EXT1 und Pin B5 VDD_EXT2; sie können im Design unverbunden bleiben | Erforderlich |

</div>

!!! note "Klarstellung zur Quelle"
    Prüfpunkt 19 der Checkliste Stromversorgung in der Arbeitsmappe verlangt MCU-PB-Pins für die TWI-Steuerschnittstelle und bezeichnet diese Pins zusätzlich als „PD“-Pins. Prüfpunkt 21 verlangt separat die dedizierte TWI-Schnittstelle des Chips. Die Arbeitsmappe definiert „PD“ nicht und erläutert nicht, wie diese Anforderungen zusammenhängen. Laut Hardware-Anwendungshinweis von OpenSiFli emuliert der SF32LB58x TWI-Signale mit zwei GPIOs, um den SF30147C zu steuern. Klären Sie vor der Freigabe des Schaltplans mit SiFli, welche Schnittstelle und Pins vorgesehen sind.

### 5.8.3. Kondensatoren und Induktivitäten der Stromversorgung { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabelle 5.8.3-1: Checkliste Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PVDD1-Pufferkondensator beträgt mindestens 10 µF | Erforderlich |
| 2 | PVDD2-Kondensator beträgt mindestens 10 µF | Erforderlich |
| 3 | BUCK1_FB-Kondensator = 4,7 µF | Erforderlich |
| 4 | BUCK2_FB-Kondensator = 4,7 µF | Erforderlich |
| 5 | LDO_VOUT1-Kondensator = 4,7 µF | Erforderlich |
| 6 | VDD_RET-Kondensator = 0,47 µF | Erforderlich |
| 7 | VDD_RTC-Kondensator = 1 µF | Erforderlich |
| 8 | VDDIOA-Kondensator ≥1 µF | Erforderlich |
| 9 | VDDIOA2-Kondensator ≥1 µF | Erforderlich |
| 10 | VDDIOB-Kondensator ≥1 µF | Erforderlich |
| 11 | VDDIOSA-Kondensator ≥1 µF | Erforderlich |
| 12 | VDDIOSB-Kondensator ≥1 µF | Erforderlich |
| 13 | VDDIOSC-Kondensator ≥1 µF | Erforderlich |
| 14 | AVDD33_USB-Kondensator ≥1 µF | Erforderlich |
| 15 | AVDD33_ANA-Kondensator ≥4,7 µF | Erforderlich |
| 16 | AVDD_BRF-Kondensator ≥4,7 µF | Erforderlich |
| 17 | AVDD33_AUD-Kondensator ≥4,7 µF | Erforderlich |
| 18 | AUD_VREF-Kondensator = 1 µF | Erforderlich |
| 19 | AVDD18_DSI-Kondensator ≥4,7 µF | Erforderlich |
| 20 | MIC_BIAS-Kondensator = 1 µF | Erforderlich |
| 21 | GPADC-VREFP-Kondensator = 4,7 µF | Erforderlich |
| 22 | <span class="flag-red">PVDD1, PVDD2, AVDD_BRF und die RSTN-Pull-up-Versorgung müssen gleich sein</span> | Erforderlich |
| 23 | Die BUCK1- und BUCK2-Induktivitäten sind von SiFli empfohlene Teilenummern | Erforderlich |
| 24 | Wenn die BUCK-Induktivität keine von SiFli empfohlene Teilenummer ist, muss sie L = 4,7 µH, DCR ≤ 0,4 Ω und Isat ≥ 450 mA erfüllen | Erforderlich |
| 25 | <span class="flag-red">Wenn PVDD1 und PVDD2 mit 1,8 V aus VBAT versorgt werden, einen DCDC-Wandler zur Erzeugung von 1,8 V verwenden; keinen LDO verwenden</span> | Erforderlich |
| 26 | <span class="flag-red">Der Ruhestrom des ausgewählten DCDC ist erfasst und erfüllt die Projektanforderungen</span> | Erforderlich |
| 27 | <span class="flag-red">Der Ruhestrom des ausgewählten LDO ist erfasst und erfüllt die Projektanforderungen</span> | Erforderlich |

</div>

!!! note "Abweichende Sättigungsstromangaben für die BUCK-Induktivität"
    Prüfpunkt 24 der Checkliste zu Kondensatoren und Induktivitäten in der Arbeitsmappe fordert für eine nicht in der AVL geführte Induktivität Isat ≥ 450 mA. Der OpenSiFli-Hardware-Anwendungshinweis fordert für eine BUCK-Induktivität mit L = 4,7 µH und DCR ≤ 0,4 Ω Isat ≥ 500 mA. Die Tabelle behält den Arbeitsmappenwert von 450 mA bei; die [Auslegung der BUCK-Induktivität im Abschnitt Schaltplanentwurf](SF32LB58x_schematic_design.md#5114-buck-inductor-selection) verwendet 500 mA. Bis SiFli die Abweichung klärt, verwenden Sie eine Induktivität mit Isat ≥ 500 mA.

### 5.8.4. Takt { #584-clock }

<div align="center"><em>Tabelle 5.8.4-1: Takt-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Der 48-MHz-Hauptquarz ist eine AVL-gelistete Teilenummer | Erforderlich |
| 2 | Falls der 48-MHz-Quarz nicht AVL-gelistet ist, muss er 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), Frequenztoleranz ≤±10 ppm, ESR ≤30 Ω (22 Ω empfohlen) erfüllen | Erforderlich |
| 3 | Der RTC-32,768-kHz-Quarz ist eine AVL-gelistete Teilenummer | Erforderlich |
| 4 | Falls der 32,768-kHz-Quarz nicht AVL-gelistet ist, muss er CL ≤12,5 pF (7 pF empfohlen), Frequenztoleranz ≤±20 ppm, ESR ≤80 kΩ (38 kΩ empfohlen) erfüllen | Erforderlich |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Tabelle 5.8.5-1: Reset-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | RSTN ist auf dieselbe Versorgung wie PVDD1 hochgezogen | Erforderlich |
| 2 | RSTN reserviert einen 0,1-µF-Kondensator gegen Masse | Erforderlich |
| 3 | RSTN besitzt ESD-Schutz | Erforderlich |

</div>

### 5.8.6. Massesignale { #586-ground-signals }

<div align="center"><em>Tabelle 5.8.6-1: Checkliste Massesignale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Alle AVSS_***-Signale sind mit GND verbunden | Erforderlich |
| 2 | Alle VSS-Signale sind mit GND verbunden | Erforderlich |

</div>

### 5.8.7. Boot-Modus { #587-boot-mode }

<div align="center"><em>Tabelle 5.8.7-1: Checkliste Boot-Modus</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | MODE hat einen internen Pull-down; einen 10-kΩ-Pull-up zu VDDIOA reservieren und MODE während des Programm-Downloads auf High treiben | Erforderlich |
| 2 | <span class="flag-red">Das MODE-Signal hat einen reservierten Testpunkt und muss auf die Produktionsprogrammier-Fixture herausgeführt werden</span> | Erforderlich |

</div>

### 5.8.8. HF { #588-rf }

<div align="center"><em>Tabelle 5.8.8-1: HF-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Das ANT-Signal ist mit der Anforderung an einen unsymmetrischen Wellenwiderstand von 50 Ω gekennzeichnet | Erforderlich |
| 2 | Ein Pi-förmiges Anpassnetzwerk ist am ANT-Signal reserviert: ein paralleler NC-Kondensator (nicht bestückt) und ein 15-pF-Serienkondensator | Erforderlich |
| 3 | Falls eine Filterung von Störstrahlung berücksichtigt werden muss, ist ein Pi-förmiges Anpassnetzwerk mit einer 2,7-nH-Serieninduktivität und einem 2-pF-Parallelkondensator reserviert | Optional |
| 4 | Falls ein externer HF-PA eine MCU-Steuerung von RXEN und TXEN erfordert, ausschließlich PB39 für PA RXEN und PB40 für PA TXEN verwenden | Optional |
| 5 | <span class="flag-red">Falls der Wi-Fi-Chip die Antennen-Koexistenz-Arbitrierung unterstützt: <br> (1) Der 3-Draht-Modus wird empfohlen: Der Wi-Fi-Chip steuert den Bluetooth-/Wi-Fi-Antennen-HF-Schalter und führt die Arbitrierung durch. Anhand von BT_ACTIVE und BT_PRIORITY von Bluetooth entscheidet er, ob Bluetooth Zugriff auf die Antenne erhält. WLAN_ACTIVE kann die Bluetooth-Sende-/Empfangsaktivität während des Wi-Fi-Betriebs deaktivieren.<br> (2) BT_ACTIVE muss PB08 oder PB45 verwenden, WLAN_ACTIVE muss PB09 oder PB41 verwenden, und BT_PRIORITY kann ein beliebiges PB-GPIO verwenden.<br></span> | Optional |
| 6 | Falls der Wi-Fi-Chip keine Antennen-Koexistenz-Arbitrierung unterstützt:<br>(1) Der 1-Draht-Modus wird empfohlen: Bluetooth steuert den Bluetooth-/Wi-Fi-Antennen-HF-Schalter, führt die Arbitrierung über BT_ACTIVE durch und benachrichtigt den Wi-Fi-Chip.<br> (2) Falls Wi-Fi ein Betriebszustandssignal ausgeben kann, lässt sich die Konfiguration auf den 2-Draht-Modus erweitern: Den Wi-Fi-Ausgang mit WLAN_ACTIVE verbinden, damit Bluetooth niedrig priorisierte Sende-/Empfangsvorgänge unterdrücken kann, während Wi-Fi aktiv ist, ohne Bluetooth zu beeinträchtigen, wenn Wi-Fi inaktiv ist.<br> (3) BT_ACTIVE muss PB08 oder PB45 verwenden, WLAN_ACTIVE muss PB09 oder PB41 verwenden | Optional |

</div>

### 5.8.9. I/O-Ressourcenzuweisung { #589-io-resource-allocation }

<div align="center"><em>Tabelle 5.8.9-1: Checkliste I/O-Ressourcenzuweisung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Eine mit dem Schaltplan übereinstimmende GPIO-Ressourcenzuweisungstabelle wird bereitgestellt | Erforderlich |
| 2 | Die GPIO-Zuweisung in der Ressourcentabelle stimmt mit dem Schaltplan überein | Erforderlich |
| 3 | Die tatsächliche GPIO-Zuweisung folgt den SiFli-Empfehlungen; siehe die EVB-I/O-Konfigurationsdatei | Erforderlich |

</div>

### 5.8.10. Hardware-Wake-up { #5810-hardware-wake-up }

<div align="center"><em>Tabelle 5.8.10-1: Checkliste Hardware-Wake-up</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | <span class="flag-red">HCPU-Wake-up-Interruptquellen sind korrekt: PA64, PA65, PA66, PA67, PA68 und PA69, insgesamt sechs Pins</span> | Erforderlich |
| 2 | <span class="flag-red">LCPU-Wake-up-Interruptquellen sind korrekt: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2 und PBR3, insgesamt zehn Pins. Nach dem MCU-Wake-up können PBR0-PBR3 keine Interruptsignale empfangen</span> | Erforderlich |
| 3 | <span class="flag-red">Interrupt- und Steuersignale für LCPU-seitige Peripherie wie G-Sensor und Herzfrequenzsensor müssen mit PB-GPIOs verbunden werden</span> | Erforderlich |

</div>

### 5.8.11. Speicher { #5811-storage }

<div align="center"><em>Tabelle 5.8.11-1: Speicher-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | MPI3 ist wie vorgesehen mit NOR-Flash oder SPI-NAND-Flash verbunden | Erforderlich |
| 2 | VDDIOSC ist immer eingeschaltet | Erforderlich |
| 3 | VDDIOSA- und VDDIOSB-Versorgungen werden von PBR0 aktiviert | Erforderlich |
| 4 | MPI3 oder MPI4 kann für externen NOR-Flash oder SPI-NAND-Flash verwendet werden | Erforderlich |
| 5 | Der HOLD#-Pin des SPI-NAND-Flash ist über einen 10-kΩ-Widerstand auf die SPI-NAND-Flash-Versorgung hochgezogen | Erforderlich |
| 6 | Falls die Produktion externen Flash auf MPI3 oder MPI4 programmieren muss, treibt das Download-Tool PA43 auf High, um die MPI3-Stromversorgung zu aktivieren | Erforderlich |
| 7 | Falls die Produktion eMMC oder SD NAND auf SDIO1 programmieren muss, aktiviert das Download-Tool die entsprechende Stromversorgung | Erforderlich |
| 8 | <span class="flag-red">Die von PBR0/PA43 gesteuerten Spannungsschalter sind aktiv-high ein und aktiv-low aus. Im Hibernate-Modus steuert PBR0 die VDDIOSA-/VDDIOSB-Stromumschaltung, VDDIOSC bleibt immer eingeschaltet, und PA43 steuert die Stromumschaltung des externen Flash</span> | Erforderlich |
| 9 | Falls die SD1-Schnittstelle mit eMMC oder SD NAND verbunden ist, sind die Signalverbindungen korrekt | Erforderlich |
| 10 | Der I/O-Schnittstellenpegel von eMMC oder SD NAND entspricht VDDIOA2 | Erforderlich |
| 11 | MPI3- oder MPI4-Signalverbindungen sind korrekt | Erforderlich |
| 12 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Erforderlich |
| 13 | <span class="flag-red">NOR-Flash ist im Leitfaden zur Auswahl von Schlüsselkomponenten qualifiziert</span> | Erforderlich |
| 14 | <span class="flag-red">SPI-/SD-NAND-Flash ist im Leitfaden zur Auswahl von Schlüsselkomponenten qualifiziert</span> | Erforderlich |
| 15 | <span class="flag-red">eMMC ist im Leitfaden zur Auswahl von Schlüsselkomponenten qualifiziert</span> | Erforderlich |

</div>

<div align="center"><em>Tabelle 5.8.11-2: Referenzanschlüsse der SPI-NAND-Flash über MPI4 auf der SiFli-EVB</em></div>

<div align="center" markdown>

| SPI-NAND-Signal | SF32LB58x-Pin | Referenzhinweis |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | Chip-Select, Low-aktiv |
| SO | PA04 (SD1_D1) | Dateneingang zum Chip (IO1) |
| WP# | PA01 (SD1_D2) | Schreibschutzsignal (IO2) |
| SI | PA05 (SD1_D0) | Datenausgang des Chips (IO0) |
| SCLK | PA09 (SD1_CLK) | Serieller Takt |
| HOLD# | PA06 (SD1_D3) | IO3; über einen 10-kΩ-Widerstand auf VDD18_MPI4 hochgezogen |

</div>

Im EVB-Referenzschaltplan ist VCC der SPI-NAND-Flash an VDD18_MPI4 angeschlossen; an dieser Versorgung sind außerdem Kondensatoren mit 0,1 µF und 1 µF (6,3 V) vorgesehen. Diese Pinzuordnungen und Bauteilwerte gelten nur für die EVB-Referenz. Vor der Übernahme sind sie anhand des ausgewählten Chip-Gehäuses, des Flash-Datenblatts und der Pinmux-Konfiguration der Zielplatine zu prüfen.

Die I/O-Versorgung VDDIOA2 für SD1 unterstützt 1,8 V oder 3,3 V und muss zum I/O-Pegel des Peripheriegeräts passen. SiFli empfiehlt eine 1,8-V-Schnittstelle für SPI-NAND-Flash und eMMC. SD-NAND-Bausteine unterstützen nur 3,3 V; bei Verwendung von SD NAND muss VDDIOA2 daher auf 3,3 V gesetzt werden.

### 5.8.12. Display { #5812-display }

<div align="center"><em>Tabelle 5.8.12-1: Display-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | SF32LB58x verbindet das Display wie vorgesehen über DSI + LCDC2 | Erforderlich |
| 2 | DSI-Signalverbindungen sind korrekt | Erforderlich |
| 3 | <span class="flag-red">Falls das LCD ausschließlich QSPI verwendet, wird die HCPU-LCDC1-QSPI-Schnittstelle empfohlen, um Probleme mit Bildrate und RAM zu vermeiden</span> | Erforderlich |
| 4 | DSI_REXT ist über einen 10-kΩ-Widerstand mit GND verbunden | Erforderlich |
| 5 | Die LCDC-RSTB-Verbindung ist korrekt | Erforderlich |
| 6 | Die LCDC-TE-Verbindung ist korrekt (mit dem TE- oder Fmark-Signal des Panels verbunden) | Erforderlich |
| 7 | TP-Signale folgen der empfohlenen Pinbelegung (siehe die EVB-I/O-Konfigurationsdatei) | Erforderlich |
| 8 | Die LCD-Schnittstelle unterstützt MIPI-DSI, 3-/4-Draht-SPI, Dual-/Quad-Daten-SPI, DBI 8080, DPI sowie parallele und serielle JDI-Schnittstellen | Erforderlich |
| 9 | <span class="flag-red">SPI-LCD, 3-Draht-Modus: CS mit PA44 oder PB08 verbunden, CLK mit PA46 oder PB10 verbunden, DATA mit PA50 oder PB09 verbunden; <br>4-Draht-Modus: CS mit PA44 oder PB08 verbunden, CLK mit PA46 oder PB10 verbunden, DATA mit PA50 oder PB09 verbunden, DC mit PA48 oder PB03 verbunden</span> | Erforderlich |
| 10 | Bestätigen, ob das LCD AOD unterstützen muss; falls ja, muss ein QSPI-Panel mit HCPU verbunden werden, während ein JDI-Panel mit LCPU verbunden werden kann | Erforderlich |
| 11 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Erforderlich |
| 12 | Bei DSI-LCDs die DSI-Daten- und Taktsignale verbinden. DSI-Video-Modus-Panels verhalten sich wie RGB-Panels und haben kein TE-Signal; DSI-Command-Modus-Panels haben ein TE-Signal, und DSI17801 erfordert TE. TE und RST werden beide empfohlen; die endgültige Nutzung hängt vom ausgewählten LCD ab | Erforderlich |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabelle 5.8.13-1: GPADC-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | GPADC-Eingang ist mit dem entsprechenden Pin verbunden | Optional |
| 2 | GPADC-Eingangsbereich ist korrekt; die maximale Eingangsspannung darf AVDD33_ANA nicht überschreiten | Optional |
| 3 | Empfehlung zum Batteriespannungsteiler: 470-kΩ-1%-Widerstand versorgungsseitig, 1-MΩ-1%-Widerstand gegen Masse und 100-nF-Filterkondensator | Erforderlich |
| 4 | <span class="flag-red">Für jedes von GPADC gemessene Widerstandsteiler-Signal 1%-tolerante Teilerwiderstände verwenden; jeder GPADC-Kanal muss einen 100-nF-Filterkondensator nah am Chip-Pin haben</span> | Erforderlich |
| 5 | <span class="flag-red">ADC kann mehrere Tasten erkennen und Pins sparen; wenn beispielsweise PB32 als ADC-Taste verwendet wird, die Batterie nicht als Pull-up-Versorgung verwenden</span> | Erforderlich |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabelle 5.8.14-1: SDMADC-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | SDMADC-Eingang ist mit dem entsprechenden Pin verbunden | Optional |
| 2 | SDMADC-Eingangsbereich ist korrekt; die maximale Eingangsspannung sollte AVDD33_ANA nicht überschreiten | Optional |
| 3 | SDMADC_VREF- und SDMADC_VSS_VREF-Verbindungen sind korrekt | Erforderlich |

</div>

### 5.8.15. Tasten { #5815-buttons }

<div align="center"><em>Tabelle 5.8.15-1: Tasten-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Beim Kunden bestätigen, ob die Taste Wake-up-Fähigkeit benötigt | Erforderlich |
| 2 | Verbindung der gewöhnlichen Taste ist korrekt (Pull-up vorhanden, korrekter Widerstandswert, korrekte Pull-up-Spannungsdomäne) | Erforderlich |
| 3 | <span class="flag-red">Die Power-Taste muss an PB54 angeschlossen sein und aktiv-high arbeiten. Ein 10 Sekunden langer Tastendruck muss einen Reset auslösen; auf der Hauptplatine ist ein 10-kΩ-Pull-down vorzusehen</span> | Erforderlich |
| 4 | Alle Tastensignale haben ESD-Schutz | Erforderlich |

</div>

### 5.8.16. EOS- und ESD-Schutz { #5816-eos-and-esd-protection }

<div align="center"><em>Tabelle 5.8.16-1: Checkliste EOS- und ESD-Schutz</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Ladeschnittstelle hat EOS-, ESD- und OVP-Design | Erforderlich |
| 2 | Das Signal zur Erkennung des Ladegeräteanschlusses hat ein ESD-Bauteil | Erforderlich |
| 3 | Die Batterieschnittstelle hat ein ESD-Bauteil | Erforderlich |
| 4 | Die Antennenschnittstelle hat ein ESD-Bauteil | Erforderlich |
| 5 | LCD- und TP-Stromversorgungsschnittstellen haben ESD-Bauteile | Erforderlich |
| 6 | TP-I2C-, RST- und INT-Leitungen haben ESD-Bauteile | Erforderlich |
| 7 | Stromversorgungsschnittstelle und Signalleitungen des Herzfrequenzsensors haben ESD-Bauteile | Erforderlich |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabelle 5.8.17-1: I2C-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die I2C-Zuweisung berücksichtigt die HCPU-/LCPU-Aufteilung und ob das Gerät im Low-Power-Modus laufen muss | Erforderlich |
| 2 | I2C hat Pull-ups mit korrektem Widerstandswert; falls 400-kHz-Betrieb erforderlich ist, werden 2,2-kΩ-Pull-ups empfohlen. Die peripherieseitige Spannungsdomäne verwenden und die Pull-up-Versorgung bei Abschaltung der Peripherie ausschalten | Erforderlich |
| 3 | Das I2C-Interruptsignal unterstützt Hardware-Wake-up, sofern erforderlich | Erforderlich |
| 4 | Falls mehrere Geräte einen I2C-Bus teilen, sind ihre Adressen unterscheidbar | Erforderlich |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabelle 5.8.18-1: I2S-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 ist nur Eingang und arbeitet nur im Master-Modus; das Mikrofon ist wie vorgesehen mit I2S1 verbunden</span> | Optional |
| 2 | <span class="flag-red">I2S2 unterstützt Eingang und Ausgang nur im Master-Modus und kann mit externen Codec-DAC-/ADC-Geräten verbunden werden</span> | Optional |
| 3 | <span class="flag-red">I2S3 unterstützt Eingang und Ausgang nur im Master-Modus; geeignet für Low-Power-Anwendungsfälle, bei denen HCPU schläft und LCPU Audio über I2S3 empfängt/verarbeitet</span> | Optional |
| 4 | I2S-Signalverbindungen sind korrekt | Optional |
| 5 | <span class="flag-red">Die digitale MIC-Verbindung der I2S1-Schnittstelle ist korrekt</span> | Optional |
| 6 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Optional |

</div>

### 5.8.19. PDM und analoges Audio { #5819-pdm-and-analog-audio }

<div align="center"><em>Tabelle 5.8.19-1: Checkliste PDM und analoges Audio</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PDM-Dual-Mic-Verbindung ist korrekt | Optional |
| 2 | PDM-MIC wird aus einer digitalen Versorgung gespeist | Optional |
| 3 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Optional |
| 4 | Analoge Dual-Mic-Verbindung ist korrekt | Optional |
| 5 | Analoges MIC wird von MIC_BIAS-Ausgang versorgt | Optional |
| 6 | Beide Audio-ADC-Eingänge müssen jeweils mindestens einen 2,2-µF-DC-Blockkondensator enthalten | Optional |
| 7 | DAC-Ausgangspfade P und N haben jeweils einen 1-kΩ-Serienwiderstand, mit einem 1,5-nF-Kondensator dazwischen | Optional |
| 8 | AW8155 ist der empfohlene Audioverstärker; bei Verwendung des empfohlenen Bauteils in Software für Modus 4 / Class-AB-Modus konfigurieren | Optional |
| 9 | <span class="flag-red">Bei Rückführung des Audio-PA-Ausgangs zum MCU-ADC einen Teiler und RC-Filter oder zusätzliche digitale Filterung hinzufügen; die geteilte Spannung muss innerhalb des ADC-Eingangsbereichs bleiben, und die RC-Filter-Grenzfrequenz sollte 20 kHz betragen</span> | Optional |
| 10 | <span class="flag-red">Falls der im Chip integrierte analoge Audio-ADC-Pfad nicht genutzt wird, wird für ADC1P/ADC1N und ADC2P/ADC2N jeweils ein 0-Ω-Serienwiderstand gegen Masse empfohlen</span> | Optional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabelle 5.8.20-1: SPI-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | SPI-Verbindung ist korrekt; SDO und SDI sind zwischen MCU und Peripherie korrekt gekreuzt | Optional |
| 2 | Timing-Anforderungen der SPI-Peripherie sind bestätigt und werden unterstützt | Optional |
| 3 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Optional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabelle 5.8.21-1: USART-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | USART4 ist als Download- und Log-Schnittstelle ausgelegt | Erforderlich |
| 2 | <span class="flag-red">USART4 hat Testpunkte; für TXD und RXD wird ein Serienwiderstand von 100 Ω empfohlen</span> | Erforderlich |
| 3 | <span class="flag-red">USART1 hat einen Testpunkt</span> | Erforderlich |
| 4 | Geräte, die auf HCPU laufen müssen, sind mit USART2 oder USART3 verbunden | Optional |
| 5 | Geräte, die auf LCPU laufen müssen, sind mit USART5 oder USART6 verbunden | Optional |
| 6 | Beim Anschluss an eine Peripherie sind RXD und TXD korrekt gekreuzt | Erforderlich |
| 7 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Erforderlich |
| 8 | Ungenutzte USART-Testpunkte sind für die Backup-Nutzung reserviert | Optional |
| 9 | <span class="flag-red">Für den Anschluss an Peripherie wird empfohlen, die HCPU-Schnittstelle zu verwenden, um zu vermeiden, dass HCPU-Software eine LCPU-UART-Schnittstelle nutzt</span> | Erforderlich |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabelle 5.8.22-1: PWM-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Die Pin-Zuweisung des Hintergrundbeleuchtungs-PWM ist korrekt; ein von Motor-PWM abweichendes GPTIMx verwenden, vorzugsweise auf der PB-Schnittstelle, um zu vermeiden, dass eine HCPU-Frequenzabsenkung die Hintergrundbeleuchtung beeinträchtigt | Erforderlich |
| 2 | Die Pin-Zuweisung des Motor-PWM ist korrekt; ein von Hintergrundbeleuchtungs-PWM abweichendes GPTIMx verwenden, vorzugsweise auf der PB-Schnittstelle, um zu vermeiden, dass eine HCPU-Frequenzabsenkung die Vibration beeinträchtigt | Erforderlich |
| 3 | Für die Motor-PWM-Steuerung ein standardmäßig deaktiviertes GPIO auswählen, um abnormales Verhalten während der Firmware-Programmierung bei Verwendung eines SMT-Motors zu vermeiden | Erforderlich |
| 4 | Signale, die einen PWM-Ausgang benötigen, müssen die PB-Schnittstelle verwenden; zusätzlich auf abnormales Verhalten beim Kaltstart prüfen | Erforderlich |

</div>

### 5.8.23. Debug { #5823-debug }

<div align="center"><em>Tabelle 5.8.23-1: Debug-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | SWD-Signalverbindungen sind korrekt | Erforderlich |
| 2 | Der J-Link-Steckverbinder oder die Testpunkte reservieren korrekt die I/O-Stromversorgungsreferenz | Erforderlich |
| 3 | <span class="flag-yellow">Während des Programm-Downloads müssen PVDD, VDDIO, VDDSC und ähnliche Schienen versorgt sein, AVDD18_DSI (CAU2-Versorgung) muss ebenfalls versorgt sein</span> | Erforderlich |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabelle 5.8.24-1: USB-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | USB-Schnittstellenverbindung ist korrekt | Optional |
| 2 | Die USB-Schnittstelle hat ESD-Schutz | Optional |
| 3 | Solange USB aktiviert ist, kann der PC bzw. das angeschlossene Gerät im normalen Betrieb das Ein- und Ausstecken erkennen. Soll dies auch im Schlafmodus der MCU möglich sein, ist ein Spannungsteiler an VBUS vorzusehen. Dessen Ausgang muss einen zur I/O-Spannung passenden High-Pegel liefern und mit einem Wake-up-Pin der MCU verbunden werden. Es wird empfohlen, dafür denselben Wake-up-Pin wie für die Erkennung des Ladegeräteanschlusses zu verwenden | Optional |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>Tabelle 5.8.25-1: PBR-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | PBR0 wechselt während des Einschaltens von 0 auf 1 und kann für die Steuerung bestimmter externer Load-Switches verwendet werden; PBR1-PBR5 sind standardmäßig Ausgang low | Erforderlich |
| 2 | PBR0-PBR5 können sowohl in Standby als auch in Hibernate als Ausgänge verwendet werden | Optional |
| 3 | PBR0-PBR5 können das LPTIM-Signal ausgeben | Optional |
| 4 | <span class="flag-red">Für den SF32LB567 wird LPTIM3 empfohlen: LPTIM3_OUT und LPTIM3_OUT_BAR geben 21-25-kHz-Signale von PBR-Pins mit unterschiedlichen Tastverhältnissen und entgegengesetzter Polarität aus</span> | Optional |
| 5 | <span class="flag-red">Die 21-25-kHz-Signale mit entgegengesetzter Polarität und unterschiedlichen Tastverhältnissen können auch von HCPU ATIM ausgegeben werden; geeignete ATIMx_CHx- und ATIMx_CHxN-Signale zusammen mit Pin_Config auswählen und die Auswirkung der HCPU-Frequenzabsenkung berücksichtigen</span> | Optional |
| 6 | PBR0-PBR5 können ein 32-kHz-Taktsignal ausgeben | Optional |
| 7 | <span class="flag-red">PBR0-PBR3 können als Wake-up-Eingänge konfiguriert werden, aber nach dem MCU-Wake-up können PBR0-PBRx keine Interruptsignale empfangen und nur 0/1-Pegel erkennen; mit Vorsicht verwenden</span> | Optional |

</div>

!!! note "Quellenumfang und technische Prüfung"
    Prüfpunkt 4 der PBR-Checkliste in der [ursprünglichen Checklisten-Arbeitsmappe](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) nennt SF32LB567. Die Arbeitsmappe bestätigt jedoch nicht, dass die Punkte 4 und 5 der PBR-Checkliste Empfehlungen für SF32LB58x sind. Klären Sie die Anwendbarkeit mit SiFli, bevor Sie diese Punkte übernehmen.

    Prüfpunkt 6 der Speicher-Checkliste in der Arbeitsmappe sagt, dass PA43 auf High getrieben wird, um die „MPI3-Stromversorgung“ zu aktivieren. Der [offizielle Hardware-Anwendungshinweis für SF32LB58x](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md) beschreibt PA43 dagegen als Steuerpin für die Stromversorgung des externen Flash und fordert High, um diesen zu versorgen. Die Checklistenzeile behält den Wortlaut der Arbeitsmappe bei. Klären Sie mit SiFli, welche Versorgungsschiene und welcher Schnittstellenumfang vorgesehen sind, bevor Sie den Produktions-Programmierablauf festlegen.

### 5.8.26. Stromverbrauch { #5826-power-consumption }

<div align="center"><em>Tabelle 5.8.26-1: Checkliste Stromverbrauch</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | Für alle für die Stromumschaltung verwendeten MOSFET-, LDO- und DCDC-Enable-Pins einen 1-MΩ-Pull-down gegen Masse reservieren, wenn der Enable-Pin aktiv-high ist | Erforderlich |
| 2 | Die angesetzte Basisstromaufnahme im Hibernate-Modus ist dokumentiert | Erforderlich |
| 3 | <span class="flag-red">Die Summe der angesetzten Basisstromaufnahmen der ausgewählten Peripheriegeräte im Hibernate-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | Erforderlich |
| 4 | Die angesetzte Basisstromaufnahme im Standby-Modus ist dokumentiert | Erforderlich |
| 5 | <span class="flag-red">Die Summe der angesetzten Basisstromaufnahmen der ausgewählten Peripheriegeräte im Standby-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | Erforderlich |

</div>

### 5.8.27. Download und Quarzkalibrierung { #5827-download-and-crystal-calibration }

<div align="center"><em>Tabelle 5.8.27-1: Checkliste Download und Quarzkalibrierung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Kategorie |
|:---|:---|:---|
| 1 | SWD-Download-Testpunkte, VBAT-, GND-, SWDIO-, SDCLK-, MODE-, RSTN-, VDDIOA-, VDDIOB-Testpunkt reservieren | Erforderlich |
| 2 | Falls eine Offline-Download-Platine zum Programmieren der Firmware erforderlich ist, VBAT-, GND-, UART4_TXD-, UART4_RXD-, MODE-, RSTN- und VDDIOA-Testpunkte reservieren | Optional |
| 3 | Falls eine Quarzkalibrierung erforderlich ist, einen Quarzkalibrierungs-Testpunkt reservieren; PB45 wird empfohlen | Optional |

</div>
