---
icon: lucide/list-checks
hide:
    - navigation
description: "Punktweise Schaltplan-Prüfcheckliste für den SF32LB55x-MCU, mit Prüfungen zu Stromversorgung, Takt, RF, Speicher, Display und Fertigung."
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB55x Hardware-Design-Leitfaden — Schaltplan-Checkliste { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. Schaltplan-Checkliste { #58-schematic-checklist }

Jede Tabelle deckt einen funktionalen Schaltplanblock ab. Ein Prüfpunkt gilt nur für die Varianten, die in der Spalte „Gilt für“ aufgeführt sind.

Rot hervorgehobener Text und gelbe Hinterlegungen übernehmen die Prüfhinweise aus der Quell-Arbeitsmappe. Da die Arbeitsmappe die Gründe für die einzelnen Markierungen nicht erläutert, sind sie als zusätzliche Prüfhilfen zu verstehen; die Einstufung als „Erforderlich/Optional“ bleibt davon unberührt.

### 5.8.1. Gehäuse { #581-package }

<div align="center"><em>Tabelle 5.8.1-1: Checkliste Gehäuse</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Das Gehäuse der gewählten Teilenummer ist korrekt, einschließlich Pin-Namen und Pin-Nummern | Alle Varianten | Erforderlich |

</div>

### 5.8.2. Stromversorgung { #582-power-supply }

<div align="center"><em>Tabelle 5.8.2-1: Checkliste Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VDD1-Versorgungsspannung beträgt 1,8 V–3,3 V | Nur 551/555/557 | Erforderlich |
| 2 | <span class="flag-red">VDD1-Versorgungsspannung ist 3,3 V</span> | <span class="flag-red">Nur SS6600A8</span> | <span class="flag-red">Erforderlich</span> |
| 3 | VDD2-Versorgungsspannung beträgt 1,8 V–3,3 V | Nur 555/557 | Erforderlich |
| 4 | BUCK1_VSW- und BUCK1_VOUT-Verbindungen sind korrekt | Alle Varianten | Erforderlich |
| 5 | BUCK2_VSW- und BUCK2_VOUT-Verbindungen sind korrekt | Nur 555/557 | Erforderlich |
| 6 | LDOVCC2_VOUT-Verbindung ist korrekt | Nur 555/557 | Erforderlich |
| 7 | AVDD_DSI-Versorgungsspannung ist 1,8 V | Nur 555/557 | Erforderlich |
| 8 | LDO_VOUT1-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Varianten | Erforderlich |
| 9 | LDO_VOUT2-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Varianten | Erforderlich |
| 10 | VDD_RET-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Varianten | Erforderlich |
| 11 | VDD_RTC-Ausgang verfügt über einen Testpunkt oder einen Filterkondensator, der eine Spannungsmessung ermöglicht | Alle Varianten | Erforderlich |
| 12 | VDD_SIP-Versorgungsspannung ist 1,8 V, und es ist ein Lastschalter vorgesehen, damit sie abgeschaltet werden kann | Nur 551/555/557 | Erforderlich |
| 13 | <span class="flag-red">VDD_SIP-Versorgungsspannung ist 3,3 V, und es ist ein Lastschalter vorgesehen, damit sie abgeschaltet werden kann</span> | <span class="flag-red">Nur SS6600A8</span> | <span class="flag-red">Erforderlich</span> |
| 14 | AVDD33-Versorgungsspannung ist 3,3 V | Alle Varianten | Erforderlich |
| 15 | AVDD_BRF-Versorgungsspannung beträgt 1,8 V–3,3 V und muss mit der VDD1-Versorgung übereinstimmen | Nur 551/555/557 | Erforderlich |
| 16 | <span class="flag-red">AVDD_BRF-Versorgungsspannung ist 3,3 V</span> | <span class="flag-red">Nur SS6600A8</span> | <span class="flag-red">Erforderlich</span> |
| 17 | VDDIOA-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision einen Footprint für einen 0-Ω-Serienwiderstand vorsehen | Nur 551/555/557 | Erforderlich |
| 18 | VDDIOB-Versorgungsspannung beträgt 1,8 V–3,3 V; für die erste Board-Revision einen Footprint für einen 0-Ω-Serienwiderstand vorsehen | Nur 551/555/557 | Erforderlich |
| 19 | <span class="flag-red">VDDIOA-Versorgungsspannung beträgt 3,3 V; für die erste Board-Revision einen Footprint für einen 0-Ω-Serienwiderstand vorsehen</span> | <span class="flag-red">Nur SS6600A8</span> | <span class="flag-red">Erforderlich</span> |
| 20 | <span class="flag-red">VDDIOA-Versorgungsspannung beträgt 3,3 V; für die erste Board-Revision einen Footprint für einen 0-Ω-Serienwiderstand vorsehen</span> | <span class="flag-red">Nur SS6600A8</span> | <span class="flag-red">Erforderlich</span> |
| 21 | Wenn SF30147C die Stromversorgung übernimmt, muss die TWI-Steuerschnittstelle MCU-PB-Pins verwenden, und diese Pins müssen PD-Pins sein | Nur 551/555/557 | Erforderlich |
| 22 | Wenn SF30147C die Stromversorgung übernimmt, müssen über EN gesteuerte Schienen PVDD oder AVDD als EN-Spannungsdomäne verwenden; EN nicht über ein MCU-GPIO steuern. Alternativ EN mit Masse verbinden und den entsprechenden Schienenausgang über Register steuern | Nur 551/555/557 | Erforderlich |
| 23 | Wenn SF30147C die Stromversorgung übernimmt, können BUCK und LDO1 nur über ihre jeweiligen Enable-Signale EN_BUCK und EN_LDO1 gesteuert werden; eine interne Registersteuerung ist nicht vorgesehen | Nur 551/555/557 | Erforderlich |
| 24 | Die Ladeschaltung muss über ein Power-Path-Management verfügen, damit das System bei zu niedriger Akkuspannung über den 5-V-Eingang des Ladegeräts versorgt werden kann | Alle Varianten | Erforderlich |

</div>

Unklarheit in der Quelle: Die Punkte 19 und 20 der ursprünglichen Checkliste V1.0 sind identisch; beide fordern für SS6600A8 3,3 V an VDDIOA. Der [Hardware-Anwendungshinweis](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) weist VDDIOA als PA-I/O-Versorgung und VDDIOB als PB-I/O-Versorgung aus, klärt aber nicht, ob Punkt 20 ursprünglich VDDIOB nennen sollte. Die Checkliste übernimmt den Wortlaut der Quelle unverändert. Klären Sie mit SiFli, welche Versorgungsschiene gemeint ist, bevor Sie Punkt 20 als Freigabekriterium verwenden.

### 5.8.3. Kondensatoren und Induktivitäten der Stromversorgung { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabelle 5.8.3-1: Checkliste Kondensatoren und Induktivitäten der Stromversorgung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | VDD1-Pufferkondensator beträgt mindestens 10 µF | Alle Varianten | Erforderlich |
| 2 | VDD2-Kondensator beträgt mindestens 10 µF | Nur 555/557 | Erforderlich |
| 3 | BUCK1_VOUT-Kondensator beträgt 4,7 µF | Alle Varianten | Erforderlich |
| 4 | BUCK2_VOUT-Kondensator beträgt 4,7 µF | Nur 555/557 | Erforderlich |
| 5 | <span class="flag-red">AVDD_DSI-Kondensator beträgt mindestens 10 µF</span> | Nur 555/557 | Erforderlich |
| 6 | LDO_VOUT1-Kondensator beträgt 4,7 µF | Alle Varianten | Erforderlich |
| 7 | LDO_VOUT2-Kondensator beträgt 4,7 µF | Alle Varianten | Erforderlich |
| 8 | VDD_RET-Kondensator = 0,47 µF | Alle Varianten | Erforderlich |
| 9 | VDD_RTC-Kondensator = 1 µF | Alle Varianten | Erforderlich |
| 10 | VDD_SIP-Kondensator beträgt mindestens 1 µF | Alle Varianten | Erforderlich |
| 11 | AVDD33-Kondensator beträgt mindestens 1 µF | Alle Varianten | Erforderlich |
| 12 | AVDD_BRF-Kondensator beträgt mindestens 1 µF | Alle Varianten | Erforderlich |
| 13 | VDDIOA-Kondensator beträgt mindestens 1 µF | Alle Varianten | Erforderlich |
| 14 | VDDIOB-Kondensator beträgt mindestens 1 µF | Alle Varianten | Erforderlich |
| 15 | VDD1, VDD2 (nur 555), AVDD_BRF und die RESET-Pull-up-Versorgung müssen identisch sein | Alle Varianten | Erforderlich |
| 16 | BUCK1-Induktivität ist eine von SiFli empfohlene Teilenummer | Nur 551/555/557 | Erforderlich |
| 17 | BUCK2-Induktivität ist eine von SiFli empfohlene Teilenummer | Nur 555/557 | Erforderlich |
| 18 | Wenn die BUCK-Induktivität nicht von SiFli empfohlen ist, muss sie L = 4,7 µH, DCR ≤ 0,4 Ω und Isat ≥ 450 mA erfüllen | Alle Varianten | Erforderlich |
| 19 | Bei GPS oder anderen störempfindlichen Peripheriegeräten einen Footprint für einen nach Masse geschalteten Kondensator an BUCK_LX vorsehen; der Wert richtet sich nach den tatsächlichen Testergebnissen | Alle Varianten | Erforderlich |
| 20 | <span class="flag-red">Bei der Umwandlung von VBAT auf 1,8 V für VDD1 und VDD2 (nur 555) einen DCDC-Wandler verwenden; keinen LDO verwenden</span> | Nur 551/555/557 | Erforderlich |
| 21 | <span class="flag-red">Der Ruhestrom des gewählten DCDC-Wandlers ist dokumentiert und erfüllt die Projektanforderungen</span> | Alle Varianten | Erforderlich |
| 22 | <span class="flag-red">Der Ruhestrom des gewählten LDO ist dokumentiert und erfüllt die Projektanforderungen</span> | Alle Varianten | Erforderlich |

</div>

Die Quellen widersprechen sich: Tabelle 3-3 des [chinesischen SiFli-Hardware-Anwendungshinweises](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) und Punkt 9 der [verlinkten Quell-Arbeitsmappe der Checkliste V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) nennen 1 µF für VDD_RTC, während [C0313 im Referenzschaltplan](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) mit 0,1 µF beschriftet ist. Die Quellen erläutern nicht, wann welcher Wert gilt. Klären Sie den erforderlichen Wert für das konkrete Gerät vor der Designfreigabe mit SiFli; lösen Sie den Widerspruch nicht durch Annahmen.

### 5.8.4. Takt { #584-clock }

<div align="center"><em>Tabelle 5.8.4-1: Checkliste Takt</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Der 48-MHz-Hauptquarz entspricht einer in der AVL gelisteten Teilenummer | Alle Varianten | Erforderlich |
| 2 | Ist der 48-MHz-Quarz nicht in der AVL gelistet, muss er 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), Frequenztoleranz ≤±10 ppm, ESR ≤30 Ω (22 Ω empfohlen) erfüllen | Alle Varianten | Erforderlich |
| 3 | Der 32,768-kHz-Quarz für die RTC entspricht einer in der AVL gelisteten Teilenummer | Alle Varianten | Erforderlich |
| 4 | Ist der 32,768-kHz-Quarz nicht in der AVL gelistet, muss er CL ≤12,5 pF (7 pF empfohlen), Frequenztoleranz ≤±20 ppm, ESR ≤80 kΩ (38 kΩ empfohlen) erfüllen | Alle Varianten | Erforderlich |
| 5 | <span class="flag-yellow">Wird der 32,768-kHz-Quarz weggelassen, muss das XI-Pad mit Masse verbunden werden</span> | <span class="flag-yellow">Alle Varianten</span> | <span class="flag-yellow">Erforderlich</span> |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Tabelle 5.8.5-1: Checkliste Reset</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | RSTN ist auf dieselbe Versorgung wie VDD1 hochgezogen (Pull-up) | Alle Varianten | Erforderlich |
| 2 | Ein Bestückungsplatz für einen 0,1-µF-Kondensator zwischen RSTN und Masse ist vorgesehen | Alle Varianten | Erforderlich |
| 3 | RSTN verfügt über ESD-Schutz | Alle Varianten | Erforderlich |

</div>

### 5.8.6. Massesignale { #586-ground-signals }

<div align="center"><em>Tabelle 5.8.6-1: Checkliste Massesignale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Alle AVSS-Signale sind mit GND verbunden | Nur 555/557 | Erforderlich |
| 2 | Alle VSS-Signale sind mit GND verbunden | Nur 555/557 | Erforderlich |
| 3 | EPAD-Signal ist mit GND verbunden | <span class="flag-red">Nur 551/SS6600A8</span> | Erforderlich |

</div>

### 5.8.7. Boot-Modus { #587-boot-mode }

<div align="center"><em>Tabelle 5.8.7-1: Checkliste Boot-Modus</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE ist standardmäßig mit 10 kΩ gegen Masse heruntergezogen (Pull-down) und wird während Programmierung/Download auf VDDIOA hochgezogen</span> | Alle Varianten | Erforderlich |
| 2 | <span class="flag-red">Das MODE-Signal verfügt über einen reservierten Testpunkt</span> | Alle Varianten | Erforderlich |
| 3 | Wenn der PCB-Platz es zulässt, eine 3-polige Stiftleiste vorsehen, damit sich Pull-up oder Pull-down mit einem Jumper auswählen lässt | Alle Varianten | Erforderlich |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabelle 5.8.8-1: Checkliste RF</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Am ANT-Signal ist eine charakteristische Impedanz von 50 Ω im unsymmetrischen Betrieb (single-ended) angegeben | Alle Varianten | Erforderlich |
| 2 | Am ANT-Signal ist ein Pi-Anpassungsnetzwerk reserviert: ein paralleler NC-Kondensator (nicht bestückt) und ein 15-pF-Serienkondensator | Alle Varianten | Erforderlich |
| 3 | Falls eine Filterung von Störaussendungen erforderlich ist, ein Pi-Netzwerk mit einer 3,0-nH-Serieninduktivität und einem 1,5-pF-Parallelkondensator reservieren | Alle Varianten |    |
| 4 | <span class="flag-red">Wenn ein externer PA oder LNA gesteuert werden muss, PB05 mit RX_EN und PB25 mit TX_EN verbinden</span> | Alle Varianten | Optional |

</div>

In der Quell-Arbeitsmappe ist die Kategorie für RF-Punkt 3 leer; sie bleibt daher auch hier leer. Ohne Bestätigung durch SiFli darf sie nicht als erforderlich oder optional eingestuft werden.

### 5.8.9. Zuweisung der I/O-Ressourcen { #589-io-resource-allocation }

<div align="center"><em>Tabelle 5.8.9-1: Checkliste Zuweisung der I/O-Ressourcen</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Eine mit dem Schaltplan übereinstimmende GPIO-Ressourcenzuweisungstabelle wird bereitgestellt | Alle Varianten | Erforderlich |
| 2 | Die GPIO-Zuweisung in der Ressourcentabelle stimmt mit dem Schaltplan überein | Alle Varianten | Erforderlich |
| 3 | Die tatsächliche GPIO-Zuweisung folgt den Empfehlungen von SiFli; siehe die EVB-I/O-Konfigurationsdatei | Alle Varianten | Erforderlich |

</div>

### 5.8.10. Hardwareseitiges Wecken { #5810-hardware-wake-up }

<div align="center"><em>Tabelle 5.8.10-1: Checkliste zum hardwareseitigen Wecken</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">HCPU-Interrupt-Weckquellen sind korrekt: PA77, PA78, PA79 und PA80; nicht zum Aufwecken über die Ein-/Aus-Taste verwenden</span> | Alle Varianten | Erforderlich |
| 2 | <span class="flag-red">LCPU-Interrupt-Weckquellen sind korrekt: PB43, PB44, PB45, PB46, PB47 und PB48, insgesamt sechs Pins, die zum Aufwecken über die Ein-/Aus-Taste verwendet werden können</span> | Alle Varianten | Erforderlich |
| 3 | <span class="flag-red">Interrupt- und Steuersignale für LCPU-seitige Peripheriegeräte wie G-Sensor und Herzfrequenzsensor müssen mit PB-GPIOs verbunden werden</span> | Alle Varianten | Erforderlich |
| 4 | <span class="flag-red">Die UART3 zugeordnete LCPU-Interruptquelle wird korrekt verwendet; sie wird nur zum Wecken per Taste empfohlen</span> | Alle Varianten | Erforderlich |

</div>

### 5.8.11. Speicher { #5811-storage }

<div align="center"><em>Tabelle 5.8.11-1: Checkliste Speicher</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | QSPI2 wird nach der Priorität PSRAM &gt; NOR-Flash &gt; NAND-Flash ausgelegt | Alle Varianten | Erforderlich |
| 2 | Wird der Code aus dem internen SiP-NOR-Flash ausgeführt, muss PA58 den Versorgungsschalter für VDD_SIP steuern | Alle Varianten | Erforderlich |
| 3 | Wird der Code aus externem NOR-Flash an QSPI2 ausgeführt, muss PA58 den Versorgungsschalter für QSPI2 steuern | Alle Varianten | Erforderlich |
| 4 | Muss externes Flash an QSPI2 in der Produktion programmiert werden, muss PA58 dessen Versorgungsschalter steuern | Alle Varianten | Erforderlich |
| 5 | <span class="flag-red">Der von PA58 gesteuerte Spannungsschalter ist high-aktiv (ein) und low-aktiv (aus)</span> | Alle Varianten | Erforderlich |
| 6 | <span class="flag-red">An Flash-CLK- und Datenleitungen werden 33-Ω-Serienwiderstände empfohlen</span> | Alle Varianten | Erforderlich |
| 7 | QSPI3 ist wie vorgesehen mit NAND-Flash oder eMMC verbunden | Nur 555/557 | Optional |
| 8 | Den QSPI3-Versorgungsschalter über PA41 steuern; <span class="flag-red">QSPI3 ist standardmäßig ausgeschaltet. Bei einem high-aktiven Versorgungsschalter den standardmäßigen internen Pull-down verwenden</span> | Nur 555/557 | Optional |
| 9 | <span class="flag-red">Wird für die Steuerung des QSPI3-Versorgungsschalters nicht PA41 verwendet, die alternative I/O-Zuweisung mit der Software abstimmen</span> | Nur 555/557 | Optional |
| 10 | Muss externes Flash an QSPI3 in der Produktion programmiert werden, muss PA58 dessen Versorgungsschalter steuern | Nur 555/557 | Erforderlich |
| 11 | Den OPI-PSRAM-Versorgungsschalter über PA70 steuern; <span class="flag-red">PSRAM ist standardmäßig eingeschaltet. Bei einem high-aktiven Versorgungsschalter den standardmäßigen internen Pull-up verwenden</span> | Nur 555/557 | Optional |
| 12 | <span class="flag-red">Der OPI-PSRAM ist ein unterstütztes Modell und im Leitfaden zur Auswahl der Schlüsselkomponenten als qualifiziert aufgeführt</span> | Nur 555/557 | Optional |
| 13 | OPI-PSRAM-Signalverbindungen sind korrekt | Nur 555/557 | Optional |
| 14 | QSPI2-Signalverbindung ist korrekt | Alle Varianten | Optional |
| 15 | QSPI3-Signalverbindung ist korrekt | Alle Varianten | Optional |
| 16 | <span class="flag-yellow">Bei Verwendung von SF32LB555 oder <span class="flag-red">SF32LB557 den Speicherbedarf des Herzfrequenzsensor-Algorithmus bestätigen; reicht der LCPU-Speicher nicht aus, externes 1-MB-Flash an QSPI4 hinzufügen</span></span> | Nur 555/557 | Erforderlich |
| 17 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Varianten | Erforderlich |
| 18 | <span class="flag-red">NOR-Flash ist im Leitfaden zur Auswahl der Schlüsselkomponenten als qualifiziert aufgeführt</span> | Alle Varianten | Erforderlich |
| 19 | <span class="flag-red">NAND-Flash ist im Leitfaden zur Auswahl der Schlüsselkomponenten als qualifiziert aufgeführt</span> | Alle Varianten | Erforderlich |

</div>

### 5.8.12. Display { #5812-display }

<div align="center"><em>Tabelle 5.8.12-1: Checkliste Display</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SF32LB555xxxx verbindet das Display wie vorgesehen über DSI + LCDC2 | Nur 555/557 | Erforderlich |
| 2 | <span class="flag-red">SF32LB551xxxx verbindet das Display wie vorgesehen über LCDC1</span> | <span class="flag-red">Nur 551/SS6600A8</span> | Erforderlich |
| 3 | LCDC1-QSPI-Signalverbindungen sind korrekt; an CLK- und Datenleitungen werden <span class="flag-red">100-Ω-Serienwiderstände empfohlen</span> | Alle Varianten | Erforderlich |
| 4 | LCDC1-MCU8080-Signalverbindungen sind korrekt | Alle Varianten | Erforderlich |
| 5 | DSI-Signalverbindungen sind korrekt | Nur 555/557 | Erforderlich |
| 6 | LCDC2-QSPI-Signalverbindung ist korrekt | Nur 555/557 | Erforderlich |
| 7 | DSI_REXT ist über einen 10-kΩ-Widerstand mit GND verbunden | Nur 555/557 | Erforderlich |
| 8 | Die LCDC-RSTB-Verbindung ist korrekt | Alle Varianten | Erforderlich |
| 9 | Die LCDC-TE-Verbindung ist korrekt (Verbindung zum TE- bzw. Fmark-Signal des Panels) | Alle Varianten | Erforderlich |
| 10 | <span class="flag-red">SPI-LCD, 3-Draht-Modus: CS verbunden mit GPIO22 oder PA31 oder PB33, CLK verbunden mit GPIO23 oder PA20 oder PB32, DATA verbunden mit GPIO21 oder PA34 oder PB35; <br>4-Draht-Modus: CS verbunden mit GPIO22 oder PA31 oder PB33, CLK verbunden mit GPIO23 oder PA20 oder PB32, DATA verbunden mit GPIO21 oder PA34 oder PB35, DC verbunden mit GPIO20 oder PA36 oder PB36</span> | Alle Varianten | Erforderlich |
| 11 | TP-Signale folgen der empfohlenen Pin-Zuweisung (siehe die EVB-I/O-Konfigurationsdatei) | Alle Varianten | Erforderlich |
| 12 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Varianten | Erforderlich |
| 13 | Wenn das Design eine Always-on-Anzeige bei ausgeschaltetem Bildschirm unterstützen soll, die LCD-QSPI-Schnittstelle mit MCU-PA-Pins verbinden; für LCD_EN, LCD_RST und ähnliche Steuersignale werden PB-GPIOs empfohlen | <span class="flag-red">Nur 551/SS6600A8</span> | Erforderlich |
| 14 | Wenn das Design eine Always-on-Anzeige bei ausgeschaltetem Bildschirm unterstützen soll, die LCD-QSPI-Schnittstelle mit MCU-PA-Pins oder die LCD-MIPI-Schnittstelle mit der MCU verbinden; für LCD_EN, LCD_RST und ähnliche Steuersignale werden PB-GPIOs empfohlen | Nur 555/557 | Erforderlich |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Tabelle 5.8.13-1: Checkliste GPADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | GPADC-Eingang ist mit dem entsprechenden Pin verbunden | Alle Varianten | Optional |
| 2 | GPADC-Eingangsbereich ist korrekt; die maximale Eingangsspannung darf 1,0 V nicht überschreiten | Alle Varianten | Optional |
| 3 | Empfehlung für den Akkuspannungsteiler: 1-MΩ-1%-Widerstand versorgungsseitig, 220-kΩ-1%-Widerstand gegen Masse und 100-nF-Filterkondensator | Alle Varianten | Erforderlich |
| 4 | Für jedes über GPADC gemessene Spannungsteilersignal Teilerwiderstände mit 1 % Toleranz verwenden; <span class="flag-red">jeder GPADC-Kanal muss einen 100-nF-Filterkondensator nahe am Chip-Pin aufweisen</span> | Alle Varianten | Erforderlich |

</div>

Die Quellen widersprechen sich: Der höherrangige [OpenSiFli-Hardware-Anwendungshinweis](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) beschreibt einen 10-Bit-GPADC mit fünf Kanälen und einem Eingangsbereich von 0–0,9 V. Punkt 2 der [verlinkten Quell-Arbeitsmappe der Checkliste V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) legt 1,0 V als Maximum fest, nennt aber keine Kanalzahl. Das [Datenblatt SF32LB55x V1.7.2, Abschnitt 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) beschreibt acht Single-Ended-Eingänge oder vier differentielle Eingangspaare, mit Bereichen von 0–1,1 V bzw. −0,7 bis 0,7 V; die Pin-Tabelle führt GPADC_CH0–CH7 auf. Der aktuelle [SDK-ADC-Anwendungshinweis](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) ordnet ebenfalls acht Kanäle (0–7) zu und nennt 1,1 V als maximale Abtastspannung. SiFli hat die Unterschiede bei Kanalzahl und Spannungsgrenzen nicht erklärt. Checklistenpunkt 2 behält den Arbeitsmappenwert von 1,0 V bei; bis zur schriftlichen Klärung muss die Auslegung jedoch dem höher priorisierten Anwendungshinweis mit 0–0,9 V folgen, und VADC ist auf höchstens 0,9 V zu begrenzen. 1,0 V und 1,1 V sind nicht als freigegebene Entwurfsgrenzen zu behandeln. Bestätigen Sie außerdem die Kanalverfügbarkeit für das gewählte Gerät und Gehäuse.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Tabelle 5.8.14-1: Checkliste SDMADC</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SDMADC-Eingang ist mit dem entsprechenden Pin verbunden | Nur 555/557 | Optional |
| 2 | SDMADC-Eingangsbereich ist korrekt; die maximale Eingangsspannung sollte 1,2 V nicht überschreiten | Nur 555/557 | Optional |
| 3 | SDMADC_VREF- und SDMADC_VSS_VREF-Verbindungen sind korrekt | Nur 555/557 | Erforderlich |

</div>

### 5.8.15. Tasten { #5815-buttons }

<div align="center"><em>Tabelle 5.8.15-1: Checkliste Tasten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Mit dem Kunden klären, ob die Taste eine Aufweckfunktion benötigt | Alle Varianten | Erforderlich |
| 2 | Tastenverbindung ist korrekt: Pull-up vorhanden, korrekter Widerstandswert und korrekte Pull-up-Spannungsdomäne | Alle Varianten | Erforderlich |
| 3 | <span class="flag-red">Die Ein-/Aus-Taste muss PB43, PB44, PB45, PB46, PB47 oder PB48 verwenden</span> | Alle Varianten | Erforderlich |
| 4 | Alle Tastensignale verfügen über ESD-Schutz | Alle Varianten | Erforderlich |

</div>

### 5.8.16. EOS- und ESD-Schutz { #5816-eos-and-esd-protection }

<div align="center"><em>Tabelle 5.8.16-1: Checkliste EOS- und ESD-Schutz</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Ladeschnittstelle verfügt über Schutz gegen EOS, ESD und Überspannung (OVP) | Alle Varianten | Erforderlich |
| 2 | Das Signal zur Ladegeräteerkennung verfügt über ein ESD-Bauteil | Alle Varianten | Erforderlich |
| 3 | Die Akkuschnittstelle verfügt über ein ESD-Bauteil | Alle Varianten | Erforderlich |
| 4 | Die Antennenschnittstelle verfügt über ein ESD-Bauteil | Alle Varianten | Erforderlich |
| 5 | LCD- und TP-Versorgungsschnittstellen verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |
| 6 | TP-I2C-, RST- und INT-Leitungen verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |
| 7 | Versorgungsschnittstelle und Signalleitungen des Herzfrequenzsensors verfügen über ESD-Bauteile | Alle Varianten | Erforderlich |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Tabelle 5.8.17-1: Checkliste I2C</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die I2C-Zuweisung berücksichtigt die HCPU-/LCPU-Aufteilung und ob das Gerät im Low-Power-Modus laufen muss | Alle Varianten | Erforderlich |
| 2 | Die I2C-Pull-ups haben den passenden Widerstandswert; für den Betrieb mit 400 kHz werden 2,2-kΩ-Pull-ups empfohlen. Die Spannungsdomäne des Peripheriegeräts verwenden und die Pull-up-Versorgung zusammen mit der Peripherie abschalten | Alle Varianten | Erforderlich |
| 3 | Das I2C-Interruptsignal unterstützt bei Bedarf die Hardware-Aufweckung | Alle Varianten | Erforderlich |
| 4 | Teilen sich mehrere Geräte einen I2C-Bus, müssen ihre Adressen eindeutig sein | Alle Varianten | Erforderlich |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Tabelle 5.8.18-1: Checkliste I2S</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | I2S1 ist nur Eingang; das Mikrofon ist wie vorgesehen mit I2S1 verbunden | Alle Varianten | Optional |
| 2 | I2S2 unterstützt Ein- und Ausgang; der Audio-Decoder oder Codec ist wie vorgesehen mit I2S2 verbunden | Alle Varianten | Optional |
| 3 | I2S-Signalverbindungen sind korrekt | Alle Varianten | Optional |
| 4 | Die I2S-Verbindung für zwei Mikrofone ist korrekt | Alle Varianten | Optional |
| 5 | Die Mikrofonspezifikation ist bestätigt und wird vom Chip unterstützt | Alle Varianten | Optional |
| 6 | Falls MCLK benötigt wird, ist dessen Verbindung als korrekt bestätigt | Alle Varianten | Optional |
| 7 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Varianten | Optional |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>Tabelle 5.8.19-1: Checkliste PDM</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | PDM-Verbindung ist korrekt | Nur 555/557 | Optional |
| 2 | Die Verbindung von zwei digitalen Mikrofonen über PDM ist korrekt | Nur 555/557 | Optional |
| 3 | Die Mikrofonspezifikation ist bestätigt und wird vom Chip unterstützt | Nur 555/557 | Optional |
| 4 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Nur 555/557 | Optional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Tabelle 5.8.20-1: Checkliste SPI</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SPI-Verbindung ist korrekt: <span class="flag-red">MCU-SDO verbindet sich mit Peripherie-SDI, und MCU-SDI verbindet sich mit Peripherie-SDO</span> | Alle Varianten | Optional |
| 2 | Die Zeitvorgaben der SPI-Peripherie sind bestätigt und werden unterstützt | Alle Varianten | Optional |
| 3 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Varianten | Optional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Tabelle 5.8.21-1: Checkliste USART</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | USART3 ist als Download- und Log-Schnittstelle ausgelegt | Alle Varianten | Erforderlich |
| 2 | <span class="flag-red">USART3 verfügt über Testpunkte und bei Bedarf einen Pull-up-Widerstand; ein 100-Ω-Serienwiderstand wird empfohlen und kann für das tatsächliche Design angepasst werden</span> | Alle Varianten | Erforderlich |
| 3 | Geräte, die auf der HCPU laufen müssen, sind mit USART1 oder USART2 verbunden | Alle Varianten | Optional |
| 4 | Geräte, die auf der LCPU laufen müssen, sind mit USART4 oder USART5 verbunden | Alle Varianten | Optional |
| 5 | <span class="flag-red">Beim Anschluss an eine Peripherie verbindet sich MCU-RXD mit Peripherie-TXD und MCU-TXD mit Peripherie-RXD</span> | Alle Varianten | Erforderlich |
| 6 | Der I/O-Logikpegel des Peripheriegeräts entspricht dem des Hauptchips | Alle Varianten | Erforderlich |
| 7 | Ungenutzte USART-Testpunkte werden als Reserve vorgehalten | Alle Varianten | Optional |
| 8 | <span class="flag-red">Wenn UART1 mit einem Gerät verbunden ist, werden Testpunkte reserviert</span> | Alle Varianten | Erforderlich |
| 9 | <span class="flag-red">Wenn UART mit einem UART-zu-USB-Chip verbunden ist, müssen RX und TX trennbar sein</span> | Alle Varianten | Erforderlich |
| 10 | <span class="flag-red">Für Peripheriegeräte wird eine HCPU-UART-Schnittstelle empfohlen, damit HCPU-Software nicht versehentlich eine LCPU-UART-Schnittstelle nutzt</span> | Alle Varianten | Erforderlich |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Tabelle 5.8.22-1: Checkliste PWM</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Die Pin-Zuweisung für die Hintergrundbeleuchtungs-PWM ist korrekt; einen anderen GPTIMx als für den Motor verwenden, vorzugsweise auf der PB-Schnittstelle, um zu vermeiden, dass eine HCPU-Frequenzreduzierung die Hintergrundbeleuchtung beeinflusst | Alle Varianten | Optional |
| 2 | Die Pin-Zuweisung für die Motor-PWM ist korrekt; einen anderen GPTIMx als für die Hintergrundbeleuchtung verwenden, vorzugsweise auf der PB-Schnittstelle, um zu vermeiden, dass eine HCPU-Frequenzreduzierung die Vibration beeinflusst | Alle Varianten | Optional |
| 3 | Für den Motor-PWM-Steuerpin wird die PB-Schnittstelle empfohlen, vorzugsweise PB24 oder PB25, um Fehlverhalten während der Programmierung bei Verwendung eines SMT-Motors zu vermeiden | Alle Varianten | Optional |
| 4 | Signale, die einen PWM-Ausgang benötigen, müssen die PB-Schnittstelle verwenden; zusätzlich auf Fehlverhalten beim Kaltstart prüfen | Alle Varianten | Optional |

</div>

### 5.8.23. Debug { #5823-debug }

<div align="center"><em>Tabelle 5.8.23-1: Checkliste Debug</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | SWD-Signalverbindungen sind korrekt | Alle Varianten | Optional |
| 2 | Die I/O-Spannungsreferenz ist am J-Link-Steckverbinder oder an den Testpunkten korrekt vorgesehen | Alle Varianten | Optional |
| 3 | <span class="flag-yellow">Für die Produktionsprogrammierung von SF32LB555x XXXX müssen zusätzlich zu PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33 und AVDD_BRF auch AVDD_DSI versorgt werden</span> | Nur 555/557 | Erforderlich |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Tabelle 5.8.24-1: Checkliste USB</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | USB-Schnittstellenverbindung ist korrekt | Alle Varianten | Optional |
| 2 | Die USB-Schnittstelle verfügt über ESD-Schutz | Alle Varianten | Optional |
| 3 | Im Normalbetrieb kann die PC-/Geräteseite das Einstecken und Entfernen erkennen, solange USB aktiviert ist. <br>Sollen Einstecken und Entfernen auch erkannt werden, wenn die MCU schläft, einen Spannungsteiler an VBUS ergänzen. Dessen Ausgang muss einen High-Pegel entsprechend der I/O-Spannung liefern und mit einem Wake-up-Pin der MCU verbunden sein. Es wird empfohlen, dafür denselben Wake-up-Pin wie für die Ladegerät-Erkennung zu verwenden | Alle Varianten | Optional |

</div>

### 5.8.25. Stromverbrauch { #5825-power-consumption }

<div align="center"><em>Tabelle 5.8.25-1: Checkliste Stromverbrauch</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | QFN GPIO27 und BGA PA01 werden nicht als Eingänge empfohlen, da der interne 20-kΩ-Pull-down bei einem hochohmigen Pull-up den High-Pegel zu weit absenken und bei einem niederohmigen Pull-up übermäßigen Leckstrom verursachen kann | Alle Varianten | Erforderlich |
| 2 | Wird QFN GPIO27 oder BGA PA01 als Ausgang verwendet, muss die gesteuerte Schaltung im nicht angesteuerten Zustand standardmäßig inaktiv sein. Den Pin vorzugsweise für Anwendungen mit hohem Strombedarf verwenden, da ein High-Pegel von 1,8 V etwa 90 µA Leckstrom verursacht | Alle Varianten | Erforderlich |
| 3 | Werden PA01 und PA03 als GPIOs verwendet, beide I/O-Pegel im Sleep-Modus gleich halten oder mindestens einen Pin ohne Pull-up/Pull-down in den hochohmigen Zustand versetzen | Alle Varianten | Erforderlich |
| 4 | PA77, PA78, PA79, PA80 und PB43-PB48 sind zehn Pins mit Wake-up-Funktion. Im ausgeschalteten Hibernate-Zustand sind sie hochohmig und der interne PU/PD ist deaktiviert; einen externen Pull-up oder Pull-down hinzufügen, falls sich ein fester Pegel sonst nicht garantieren lässt | Alle Varianten | Erforderlich |
| 5 | Wird ein PB-Wake-up-Pin für die Signalausgabe verwendet, externen Pull-up oder Pull-down auch dann reservieren, wenn Hibernate nicht genutzt wird | Alle Varianten | Erforderlich |
| 6 | Für alle Enable-Pins von MOSFET, LDO und DCDC sicherstellen, dass der erforderliche Ein-/Aus-Zustand im Hibernate durch Standard-Pull-up- oder Pull-down-Widerstände aufrechterhalten wird | Alle Varianten | Erforderlich |
| 7 | Für GPIO-Signale, die eine Last mit einem High-Pegel steuern, nach Möglichkeit einen 1-MΩ-Pull-down verwenden, sofern dies die Funktion nicht beeinträchtigt, um den Leckstrom zu reduzieren | Alle Varianten | Erforderlich |
| 8 | Muss ein PA-GPIO-Ausgang im Sleep-Modus High bleiben, einen PU-Pin auswählen | Alle Varianten | Erforderlich |
| 9 | Muss ein PA-GPIO-Ausgang im Sleep-Modus Low bleiben, einen PD-Pin auswählen | Alle Varianten | Erforderlich |
| 10 | Die Anforderung an den Ruhestrom im Hibernate-Modus ist dokumentiert | Alle Varianten | Erforderlich |
| 11 | <span class="flag-red">Die Summe der Ruheströme der ausgewählten Peripheriegeräte im Hibernate-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | Alle Varianten | Erforderlich |
| 12 | Die Anforderung an den Ruhestrom im Standby-Modus ist dokumentiert | Alle Varianten | Erforderlich |
| 13 | <span class="flag-red">Die Summe der Ruheströme der ausgewählten Peripheriegeräte im Standby-Modus ist dokumentiert und erfüllt die Projektanforderungen</span> | Alle Varianten | Erforderlich |
| 14 | Für als Ausgänge verwendete PB43-PB48-Wake-Pins externen Pull-up oder Pull-down reservieren, da interne Pulls im Standby deaktiviert sind | Alle Varianten | Erforderlich |

</div>

### 5.8.26. Offline-Download und Quarzkalibrierung { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>Tabelle 5.8.26-1: Checkliste Offline-Download und Quarzkalibrierung</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Kategorie |
|:---|:---|:---|:---|
| 1 | Wird ein Offline-Download-Board zum Programmieren der Firmware benötigt, Testpunkte für VBAT, GND, UART3_TXD, UART3_RXD, MODE und RESET vorsehen | Alle Varianten | Optional |
| 2 | Wenn eine Quarzkalibrierung erforderlich ist, PB08 vorsehen. Wird PB08 an ein Peripheriegerät angeschlossen, sollte der Pin vorzugsweise als Ausgang dienen; ein externer Kondensator darf nicht angeschlossen werden | Alle Varianten | Optional |

</div>
