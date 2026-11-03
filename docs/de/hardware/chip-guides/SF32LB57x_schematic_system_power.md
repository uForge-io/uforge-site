---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplanrichtlinien für Minimalsystem und Versorgung des SF32LB57x: Versorgungsfamilie, Boot-Straps, Versorgungsbaum, Laden/OVP, BUCK, Energiesparschienen und Modi."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden — Minimalsystem & Stromversorgung { #sf32lb57x-hardware-design-guide-minimum-system-power }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Die Schaltplanrichtlinien sind auf drei Seiten verteilt: diese Seite (Abschnitte 5.1-5.2: Minimalsystem und Stromversorgung), [Takt, RF & Benutzerschnittstellen](SF32LB57x_schematic_clock_rf_interfaces.md) (Abschnitte 5.3-5.5) und [Speicher & Fertigung](SF32LB57x_schematic_storage_mfg.md) (Abschnitte 5.6-5.7). Beginnen Sie mit der [Übersicht zum SF32LB57x-Hardware-Design-Leitfaden](SF32LB57x_hardware_design_guide.md), um das Gerät auszuwählen und den vollständigen Designablauf kennenzulernen.

## 5. Richtlinien für den Schaltplanentwurf { #5-schematic-design-guidelines }

Dieses Kapitel folgt der üblichen Reihenfolge zur Inbetriebnahme einer Platine. Schließen Sie zuerst das Minimalsystem-Design ab; andernfalls kann die erste Platine möglicherweise nicht hochfahren, nicht vom Speicher booten, keine Firmware herunterladen oder nicht in den Debug-Modus wechseln. Nachdem diese Basis steht, prüfen Sie im Detail Stromversorgungssystem, Takterzeugung, RF-Pfad, Display, Audio, Kamera, Sensoren und andere produktspezifische Funktionen.

<div align="center"><em>Tabelle 5-1: Übersicht der Schaltplan-Abschnitte</em></div>

<div align="center" markdown>

| Gruppe | Wesentliche Entscheidungen | Nachweise für die Entwurfsfreigabe |
|:---|:---|:---|
| Minimalsystem-Design | Abgleich von Gehäuse und Stromversorgungsfamilie, Boot-Straps, Boot-Medium, Debug-/Download-Zugang | Passender Minimalsystem-Schaltplan, Boot-Tabelle, Debug-Testpunkte |
| Stromversorgungssystem | Stromversorgungsfamilie, Stromversorgungsbaum, Laden/OVP, BUCK, Versorgungsschienen für Energiesparzustände, Betriebsmodi, Weckverhalten | Schienenplan, OVP-/Ladeprüfung, Schienenmessungen, Strommessplan für Energiesparzustände |
| Takterzeugung | 48-MHz-Hauptquarz, 32,768-kHz-RTC-Quarz, Kalibrierannahmen | Quarzspezifikationsprüfung, Platzierungsplan, Kalibrierplan |
| RF | RF-Anpassung und Antennenpfad | RF-Impedanzplan, RF-Anpassungs- und Layout-Screenshots |
| Benutzerschnittstellen | Display, Touch/Hintergrundbeleuchtung, Audio, Kamera, Tasten, Motor | Schnittstellenschaltpläne, Power-Sequencing, Pin-Zuweisungen, Validierungsplan |
| Speicher und Konnektivität | Speicher, Boot, GPIO, UART/I2C/SPI/SDIO/USB/CAN/GPADC | Boot-Tabelle, Versorgungsplan für den Speicher, Busbelegung, Nachweis für Hochgeschwindigkeitsrouting |
| Fertigung | Produktionsprogrammierung, Kalibrierung, Zugang zum Prüfadapter und Zuverlässigkeitsprüfungen | Testpunktzeichnung sowie Prüfadapter- und Programmierplan |

</div>

### 5.1. Minimalsystem-Design { #51-minimum-system-design }

#### 5.1.1. Ablauf zur Auslegung des Minimalsystems { #511-minimum-system-design-sequence }

Fehler bei der Inbetriebnahme gehen meist auf das Minimalsystem, die Stromversorgungsfamilie, den Boot-Modus, Pull-up-Widerstände am Speicher, die Quarzauswahl, BUCK-Komponenten oder fehlenden Download-Zugang zurück. Klären Sie diese Punkte, bevor Sie Pins für die Produktperipherie zuweisen:

1. Passen Sie den Minimalsystem-Schaltplan an Gehäuse und Stromversorgungsfamilie an.
2. Legen Sie Boot- und Debug-Verhalten von `PA00`/`PA01` fest und reservieren Sie einen Wiederherstellungszugang.
3. Wählen Sie das Boot-Medium und sehen Sie die erforderlichen Pull-up-Widerstände an `PA13`/`PA15`/`PA17` vor.
4. Legen Sie den Stromversorgungsbaum im Grobentwurf, den Lade-/OVP-Pfad, BUCK-Induktivität und -Kondensatoren sowie die Standardzustände der Versorgungsschienen fest. Schließen Sie anschließend die Detailprüfung in Abschnitt 5.2 ab.
5. Wählen Sie den 48-MHz- und den 32,768-kHz-Quarz und bestätigen Sie den Kalibrierplan in Abschnitt 5.3.
6. Reservieren Sie Testpunkte für DBG-UART, SWD, Boot-Modus, Stromversorgung, Masse und den Prüfadapter.

#### 5.1.2. Minimalsystem-Schaltpläne { #512-minimum-system-schematics }

SF32LB57x besitzt mehrere Minimalsystem-Schaltplanvarianten. Verwenden Sie diejenige, die sowohl zum Gehäuse als auch zur Stromversorgungsfamilie passt; mischen Sie keine akkubetriebenen und 3,3-V-Versorgungsvarianten.

!!! warning "Auch V2-Schaltpläne müssen bauteilspezifisch geprüft werden"
    Die V2-Abbildungen behalten SiFlis Originalbeschriftungen bei, darunter die Sensorversorgung aus `VDD33_VOUT1`, zusätzliche Domänen an `VSYS` und eine feste Verbindung von `VDDIOA` mit 3,3 V. Das stimmt nicht vollständig mit der Lasten-Checkliste oder der wählbaren I/O-Spannung überein. Übernehmen Sie diese Beispiele nicht als universelle Versorgungsschaltung. Prüfen Sie jede Verbindung anhand von Abschnitt 5.2, der genauen Bestellnummer und der tatsächlichen Last.

![Abbildung 5.1-1: QFN68L Minimalsystem, akkubetrieben](../../sf32-products/chips/assets/57x/SF32LB57-UH-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-1: QFN68L Minimalsystem, akkubetrieben</em></div>

![Abbildung 5.1-2: QFN68L Minimalsystem, 3,3-V-Versorgung](../../sf32-products/chips/assets/57x/SF32LB57-UL-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-2: QFN68L Minimalsystem, 3,3-V-Versorgung</em></div>

![Abbildung 5.1-3: QFN80L Minimalsystem, akkubetrieben](../../sf32-products/chips/assets/57x/SF32LB57-YH-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-3: QFN80L Minimalsystem, akkubetrieben</em></div>

![Abbildung 5.1-4: QFN80L Minimalsystem, 3,3-V-Versorgung](../../sf32-products/chips/assets/57x/SF32LB57-YL-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-4: QFN80L Minimalsystem, 3,3-V-Versorgung</em></div>

<!-- BGA-ONLY -->
![Abbildung 5.1-5: BGA112 Minimalsystem, akkubetrieben](../../sf32-products/chips/assets/57x/SF32LB57-VH-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-5: BGA112 Minimalsystem, akkubetrieben</em></div>

![Abbildung 5.1-6: BGA112 Minimalsystem, 3,3-V-Versorgung](../../sf32-products/chips/assets/57x/SF32LB57-VL-MHS-SCH-V2.svg){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-6: BGA112 Minimalsystem, 3,3-V-Versorgung</em></div>
<!-- /BGA-ONLY -->

#### 5.1.3. Boot-Speicher und Strap-Konfiguration { #513-boot-storage-and-strap-configuration }

Wählen Sie das Boot-Medium vor dem Einfrieren des Schaltplans. Gehäuseintegrierter Speicher kann bereits einen MPI-Kanal belegen; externe Medien haben unterschiedliche Pull-up- und Stromversorgungssteuerungsanforderungen.

<div align="center"><em>Tabelle 5.1-1: Auswahl des externen Boot-Mediums</em></div>

<div align="center" markdown>

| `Bootstrap[1]` (`PA13`) | `Bootstrap[0]` (`PA17`) | Externes Boot-Medium |
|:------------------------|:------------------------|:--------------------|
| L | L | SPI-NOR-Flash |
| L | H | SPI-NAND-Flash |
| H | L | SD-NAND-Flash |
| H | H | eMMC |

</div>

<div align="center"><em>Tabelle 5.1-2: Pull-up-Anforderungen für externe Boot-Medien</em></div>

<div align="center" markdown>

| Boot-Medium | Pull-up-Anforderung |
|:-----------|:--------------------|
| SPI-NOR-Flash | Kein externer Pull-up an `PA13`/`PA17` erforderlich. |
| SPI-NAND-Flash | `PA17` benötigt einen 7,5-kΩ-Pull-up; `PA13` benötigt keinen Pull-up. |
| SD-NAND-Flash | `PA13` und `PA15` benötigen 7,5-kΩ-Pull-ups; `PA17` benötigt keinen Pull-up. |
| eMMC | `PA13`, `PA15` und `PA17` benötigen alle 7,5-kΩ-Pull-ups. |

</div>

![Abbildung 5.1-7: Empfohlene Bootstrap-Pin-Schaltung](../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.1-7: Empfohlene Bootstrap-Pin-Schaltung</em></div>

Die Versorgung des Boot-Mediums hängt vom Medientyp und von der Versorgungsfamilie ab. Bei akkubetriebenen Varianten wird externes NOR-Flash aus `VDD33_VOUT1` versorgt; für externes SPI-NAND-Flash ist ein Lastschalter hinter `VDD33_VOUT1` erforderlich; externes SD-NAND-Flash und eMMC verwenden einen externen LDO. Verwenden Sie bei 3,3-V-Versorgungsvarianten für alle externen Boot-Medien einen externen LDO. SiFli empfiehlt `PA21` als Enable-Signal für den Versorgungsschalter des externen Boot-Mediums: High schaltet die Schiene ein, Low schaltet sie aus. Führt eine akkubetriebene Variante `PA21` nicht heraus, erlaubt der Quellleitfaden stattdessen einen GPIO mit standardmäßigem Pull-up. Stellen Sie sicher, dass die Versorgung des Boot-Mediums beim Start verfügbar ist. Belegt gehäuseintegrierter Speicher bereits MPI3, ist die externe Nutzung von MPI3 auf SD-NAND-Flash oder eMMC beschränkt; schließen Sie kein externes SPI-NOR- oder SPI-NAND-Flash an diesen Kanal an.

#### 5.1.4. Debug- und Download-Zugang { #514-debug-and-download-access }

Reservieren Sie Debug- und Wiederherstellungszugang vor der Zuweisung der Produkt-IOs. Viele Erstplatinenfehler werden schwer behebbar, wenn der Standard-DBG-UART, die Boot-Straps oder der SWD-Pfad nicht zugänglich sind.

<div align="center"><em>Tabelle 5.1-3: Empfohlene Debug- und Download-Testpunkte</em></div>

<div align="center" markdown>

| Testpunkt | Empfehlung | Zweck |
|:-----------|:---------------|:--------|
| Versorgungseingang | `VBAT` oder 3,3 V, bei Bedarf zusätzlich `VSYS` / `VDD33_VOUT1` | Versorgung über den Prüfadapter, Strommessung und Validierung des Energiesparbetriebs. |
| GND | Mehrere Massetestpunkte | Rückführpfad für Download, Debug, Kalibrierung und Stromtest. |
| DBG-UART | `PA18`/`PA19`, entsprechend `DBG_UART_RXD`/`DBG_UART_TXD` | Standard-Download, Log und Produktionsprogrammierung. |
| SWD | `PA43`/`PA44` oder die durch die Teilenummer festgelegten SWDIO-/SWCLK-Pins | Debugging und Fehleranalyse. |
| Boot-Modus | `PA00` oder der durch die Teilenummer festgelegte Boot-Modus-Auswahl-Pin | Download- oder Wiederherstellungsmodus betreten. |
| SWD-Umschalter | `PA01` oder entsprechender Konfigurations-Pin | Verwendet, wenn die SWD-Pin-Lage umgeschaltet werden muss. |
| Ein-/Aus-Taste / Weckfunktion | `PA34` oder entsprechender Tasten-Pin | Einschalt-, Reset- oder Wecktest über den Prüfadapter. |

</div>

<div align="center"><em>Tabelle 5.1-4: Standard-Debug-Port-Verbindungen</em></div>

<div align="center" markdown>

| Debug-Signal | Pin | Netzname |
|:-------------|:----|:---------|
| `DBG_UART_RXD` | `PA18` | `USART1_RXD` |
| `DBG_UART_TXD` | `PA19` | `USART1_TXD` |
| `SWD_CLK` | `PA43` | `SWCLK` |
| `SWD_DIO` | `PA44` | `SWDIO` |

</div>

!!! warning
    Produktionstestpunkte sollten sowohl `DBG_UART_RXD` als auch `DBG_UART_TXD` umfassen. Reservieren Sie RXD nicht versehentlich doppelt.

`PA18`/`PA19` sind standardmäßig die DBG-UART-Pins und `PA43`/`PA44` die SWD-Pins; SWD kann auch auf `PA18`/`PA19` umgeschaltet werden. Der Chip unterstützt vier Download-Schnittstellen: DBG-UART, SWD, Standard-UART und USB. Im normalen Boot sind nur DBG-UART und SWD verfügbar; der BOOT-Modus kann alle vier aktivieren. BOOT-Modus und SWD-Pinumschaltung hängen von `PA00`, dem BOOT-Register, `PA01` und dem BOOT-Schalter des Hosts ab. Prüfen Sie für Produktionsprogrammierung und Wiederherstellung die vollständige Modustabelle der Quelle; leiten Sie die Download-Schnittstelle nicht allein aus einem einzelnen Pinzustand ab.

### 5.2. Stromversorgungssystem { #52-power-system }

#### 5.2.1. Planung des Stromversorgungsbaums { #521-power-tree-planning }

Zeichnen Sie den Stromversorgungsbaum vor der Schaltplaneingabe und beschriften Sie jede Schiene mit Quelle, Standardzustand, maximaler Last, Schlafzustand und steuerndem GPIO.

<div align="center"><em>Tabelle 5.2-1: Kurzreferenz zur Planung der Versorgungsschienen</em></div>

<div align="center" markdown>

| Schienenkategorie | Planungsschwerpunkt |
|:--------------|:---------------|
| Dauerhaft aktive Schienen | Sehen Sie nur RTC, Weckfunktionen, erforderliche Erkennung und Bluetooth-Retention-Schaltungen vor. Berechnen Sie den statischen Strom jeder Schiene einzeln. |
| Schaltbare Peripherie-Schienen | Bevorzugen Sie Lastschalter oder schaltbare LDOs für Display, Hintergrundbeleuchtung, Sensoren, Motor, externen Speicher und Kamera. |
| Analog-/RF-/Audio-Schienen | Filtern Sie diese Schienen separat, halten Sie die Stromschleifen kurz und isolieren Sie sie von hochstromführenden und schnellen Digitalbereichen. |
| Boot-Medium-Schiene | Der Standardzustand muss den Boot unterstützen; im Schlafzustand müssen Rückspeisung und Leckstrom verhindert werden. |
| Pull-up-Schienen | Planen Sie die Schienen für I2C-, Tasten-, Sensor-Interrupt- und andere Pull-ups gemeinsam mit der Stromversorgungsstrategie der jeweiligen Peripherie. |

</div>

#### 5.2.2. Akkubetriebene Varianten { #522-battery-powered-variants }

Akkubetriebene Varianten nutzen üblicherweise `VBUS`, `VBAT`, `VCC`, `VSYS`, `BUCK_LX`, `BUCK_FB`, interne LDO-Ausgänge, Audio-Versorgungspins und RF-Versorgungspins.

Wesentliche Anforderungen:

- Halten Sie `VBUS` innerhalb des zulässigen Eingangsbereichs und ergänzen Sie einen OVP-Schutz.
- Verbinden Sie `VBAT` mit dem Akku und nutzen Sie den Pin zur Akkuspannungsmessung.
- Behandeln Sie `VCC` als Haupt-Systemeingang. Verwenden Sie eine ausreichende Leiterbahnbreite und platzieren Sie die Entkopplungskondensatoren nahe am Chip.
- Nutzen Sie `VSYS` nur für die angegebenen internen Lasten, `AVDD_BRF` und GPIO-Pull-up-Schaltungen. Versorgen Sie daraus keine externen Peripheriegeräte.
- Nutzen Sie `VDD33_VOUT1`, `VDD33_VOUT2` und andere interne Reglerausgänge nur für ausdrücklich erlaubte Lasten. Die SiFli-Quelle enthält einen Widerspruch: Der Text zum Energiesparbetrieb und das zugehörige Diagramm zeigen externe Sensoren an `VDD33_VOUT1`, während die Stromversorgungs-Checkliste derselben Anleitung diesen Ausgang auf gehäuseintegriertes oder externes NOR-/NAND-Flash und `AVDD33_AUD` beschränkt und andere Peripherie untersagt. Bis SiFli den Widerspruch klärt, schließen Sie keine Sensoren an `VDD33_VOUT1` an.
- Schließen Sie `AVDD_BRF` und `AVDD33_AUD` über die empfohlenen Quellschienen mit lokaler Filterung an.

#### 5.2.3. 3,3-V-Versorgungsvarianten { #523-33-v-supply-variants }

Varianten mit 3,3-V-Versorgung verwenden externe 3,3 V für `PVDD`, `AVDD33`, `AVDD_BRF`, `AVDD33_AUD` und weitere Domänen. Wählen Sie für `VDDIOA` anhand der genauen Bestellnummer 1,8 V oder 3,3 V.

Wesentliche Anforderungen:

- Verwenden Sie für wichtige 3,3-V-Domänen eine sternförmige Verteilung.
- Filtern Sie Analog-, RF- und Audioversorgungen getrennt von hochstromführenden oder schnellen Digitalpfaden.
- Wird `VBATS` zur Akkumessung genutzt, prüfen Sie Eingangsbereich und Filterung.
- Versorgen Sie bei 3,3-V-Versorgungsvarianten alle externen Boot-Medien aus einem externen LDO; als Enable-Signal wird `PA21` empfohlen.
- Verbinden Sie interne Referenzen und interne LDO-Ausgangspins nur mit den erforderlichen externen Kondensatoren. Speisen Sie sie nicht aus einer externen Spannungsquelle.

#### 5.2.4. Kurzreferenz zu Versorgungskondensatoren und ihrer Verwendung { #524-power-capacitor-and-usage-quick-reference }

Verwenden Sie diese Tabelle für die Schaltplan-Vorprüfung. Die endgültigen Werte müssen weiterhin gegen Datenblatt und Referenzdesign geprüft werden.

<div align="center"><em>Tabelle 5.2-2: Kurzreferenz zu Versorgungskondensatoren und ihrer Verwendung</em></div>

<div align="center" markdown>

| Schiene / Pin | Typischer externer Kondensator | Hauptverwendung | Design-Hinweise |
|:-----------|:---------------------------|:---------|:-------------|
| `VBUS` | >= 10 µF | USB-/Ladeeingang | Nur akkubetriebene Varianten; OVP-/ESD-/EOS-Schutz hinzufügen. |
| `VBAT` | >= 4,7 µF | Akkuanschluss und Akkuspannungsmessung | Akkupfad kurz und breit halten; paralleles Routing mit empfindlichen Leitungen vermeiden. |
| `VCC` / `PVDD` | >= 10 µF | Haupt-PMU-/Systemeingang | Entkopplung nahe am Chip platzieren und Leitung für den Strom dimensionieren. |
| `VSYS` | Etwa 2,2 µF | Interne oder spezifizierte analoge/RF-bezogene Versorgung | Nicht als allgemeine Peripherieversorgung verwenden; Gesamtlast und -kapazität kontrollieren. |
| `VDD33_VOUT1` | 2,2 µF / 6,3 V | Nur für im Gehäuse integriertes Flash, externes NOR-/NAND-Flash und `AVDD33_AUD` | Nicht für Herzfrequenzsensoren oder andere gewöhnliche Peripherie verwenden; der Laststrom während des Softstarts muss innerhalb der zulässigen Quellgrenze bleiben. |
| `VDD33_VOUT2` | Etwa 2,2 µF | Display, Motor oder spezifizierte schaltbare Lasten | Standardzustand und Einschaltstrom müssen zur Firmware-Konfiguration passen. |
| `VDD18_VOUT` | Den gewählten Minimalsystem-Schaltplan verwenden | 1,8-V-Versorgung für den internen oder im Gehäuse integrierten PSRAM | Nicht als externe 1,8-V-Peripherieversorgung verwenden. |
| `VDD_VOUT1` / `VDD_VOUT2` | Je 4,7 µF / 6,3 V | Interne LDO-Ausgänge | Nur interne Versorgung; keine externen Peripheriegeräte versorgen. |
| `VDD_RET` / `VDD_RTC` | 0,47 µF / 6,3 V für `VDD_RET`; 1 µF / 6,3 V für `VDD_RTC` | Interne Retention- und RTC-Versorgung | Kondensatoren nahe an den Pins platzieren. |
| `AVDD_BRF` | Etwa 4,7 µF | RF-Analogversorgung | Kondensator nahe am Chip mit kurzer Mehr-Via-Erdung platzieren. |
| `AVDD33_AUD` | Etwa 2,2 µF | Audio-Analogversorgung | Von DC/DC, RF, USB, SDIO und Display-Takten fernhalten. |
| `MIC_BIAS` | 1 µF / 6,3 V | Mikrofon-Bias | Nur als Mikrofon-Bias verwenden. |
| `AUD_VREF` / `GPADC_VREF` | 1 µF für `AUD_VREF`; 4,7 µF für `GPADC_VREF` | Interne Referenz | Nur Kondensator; niemals extern ansteuern. |

</div>

#### 5.2.5. BUCK-Induktivität und Feedback { #525-buck-inductor-and-feedback }

Empfohlene BUCK-Induktivitätsparameter:

<div align="center"><em>Tabelle 5.2-3: Empfohlene BUCK-Induktivitätsparameter</em></div>

<div align="center" markdown>

| Parameter | Empfohlener Wert |
|:----------|:------------------|
| Induktivität | 4,7 µH ±20 % |
| DCR | <= 0,4 Ω |
| Sättigungsstrom | >= 450 mA |

</div>

PCB-Anforderungen:

- Platzieren Sie Induktivität, Ausgangskondensator und Feedback-Kondensator nahe am Chip.
- Halten Sie die `BUCK_LX`-Schleife kurz und breit. Vermeiden Sie Kupferflächen und empfindliche Leitungen in diesem Bereich.
- Halten Sie die `BUCK_FB`-Leitung angemessen breit; 0,25 mm oder breiter wird empfohlen.
- Halten Sie eine solide Referenzmasse nahe dem Induktivitätsbereich und vermeiden Sie das Einkoppeln von Rauschen in Quarz-, RF-, Audio- und GPADC-Leitungen.
- Enthält das Produkt empfindliche Schaltungen wie GPS, Herzfrequenzmessung, EKG oder analoge Mikrofone, reservieren Sie optionale Footprints für EMI-Abstimmbauteile nahe dem BUCK_LX-Bereich. Legen Sie die endgültigen Werte während der EMV-Validierung des Systems fest.

#### 5.2.6. Laden und OVP { #526-charging-and-ovp }

Akkubetriebene Produkte können ein externes Ladegerät oder die integrierte Ladefunktion verwenden.

<div align="center"><em>Tabelle 5.2-4: Vergleich der Lade-Optionen</em></div>

<div align="center" markdown>

| Option | Versorgungspfad | Hinweise zur Auslegung |
|:-------|:------------|:-------------|
| Externes Ladegerät ohne PPM | Der Akku versorgt die Chip-Pins `VBAT` und `VCC` direkt. | Der GPADC-Kanal des Chips an `VBAT` misst die Akkuspannung mit einer Abtastgenauigkeit von ±30 mV. |
| Externes Ladegerät mit PPM | `VSYS` des Ladegeräts versorgt `VCC` des Chips; `VBAT` des Ladegeräts ist sowohl mit dem Akku als auch mit `VBAT` des Chips verbunden. | Der GPADC-Kanal des Chips an `VBAT` misst die Akkuspannung mit einer Abtastgenauigkeit von ±30 mV. |
| Integriertes Ladegerät | Verwendet den integrierten Ladeverwaltungsblock des Chips. | Hat ein zu schwacher Akku das System abgeschaltet, muss die Akkuspannung zuerst den Boot-Schwellenwert erreichen, bevor das System starten und den Ladebildschirm anzeigen kann. Laut SiFli-Checkliste wird vorausgesetzt, dass die Software das Display einschaltet, sobald der Akku etwa 3,6 V erreicht. |

</div>

OVP-Hinweise:

- `VBUS` darf den zulässigen Eingangsbereich niemals überschreiten.
- Als Referenz für eine OVP mit einstellbarem OVLO nennt SiFli den AW32905FCR. Der Anwendungstext gibt 5,2–5,5 V an, die Checkliste dagegen 5,15–5,55 V. Bis SiFli die Abweichung klärt, legen Sie den gemeinsamen Bereich von 5,2–5,5 V zugrunde. Berücksichtigen Sie Bauteil- und Widerstandstoleranzen in `V_IN_OVLO = ((R1 + R2) / R2) × V_OVLO_TH`; halten Sie den Fehler von `V_OVLO_TH` innerhalb von 3 % und verwenden Sie für R1/R2 Widerstände mit 1 % Toleranz.
- Für eine OVP mit geregeltem Ausgang nennt SiFli SGM4064YDE8G und LP5305AQVF. Der Anwendungstext gibt 4,5–5,4 V an, die Checkliste 4,7–5,4 V. Bis zur Klärung verwenden Sie den engeren Bereich von 4,7–5,4 V bei einer Belastbarkeit von mindestens 0,5 A und einer OCP-Schwelle von mindestens 0,7 A.
- Führen Sie den Ladeeingang vor dem Chip über einen TVS-/OVP-Schutz.

!!! warning "Abweichender VBUS-Bereich"
    Die aktuellen Gehäusetabellen und der OVP-Text nennen 4,5–5,5 V für `VBUS`; die Checkliste verlangt weiterhin 4,6–5,5 V. Bis zur Klärung durch SiFli mit der strengeren Untergrenze von 4,6 V auslegen.

#### 5.2.7. Versorgungsstrategie für Energiesparzustände { #527-low-power-supply-strategy }

Planen Sie das Energiesparverhalten bereits im Schaltplan ein.

Empfehlungen:

- Verwenden Sie Lastschalter oder schaltbare LDOs für Display, Hintergrundbeleuchtung, Sensoren, Motor und externen Speicher.
- Wählen Sie Bauteile mit high-aktivem EN-Eingang. Soll der Ausgang standardmäßig ausgeschaltet sein, verbinden Sie EN über einen 1-MΩ- bis 5,1-MΩ-Pull-down-Widerstand mit Masse. Legen Sie den Widerstandswert anhand des Energiesparziels des Produkts fest.
- Verwenden Sie für einen MOSFET-Leistungsschalter die in der Quelle empfohlene PMOS-plus-NMOS-Topologie: High am Steuereingang schaltet die Versorgung ein, Low schaltet sie aus. Sehen Sie einen festen 1-MΩ-Pull-down vom Steuereingang nach Masse vor.
- Versorgen Sie I2C-Pull-ups aus derselben Schiene wie die entsprechende Peripherie, um Leckstrom im Schlafzustand zu vermeiden.
- Wählen Sie für dauerhaft aktive Schaltungen Bauteile mit niedrigem Iq und niedrigem Abschaltstrom.
- Dient `VSYS` oder ein dauerhaft aktiver LDO als GPIO-Pull-up-Schiene, berücksichtigen Sie diesen Leckstrom im Schlafstrombudget.

#### 5.2.8. Referenzabbildungen zu Stromversorgung und Laden { #528-power-and-charging-reference-figures }

Die SF32LB57x-Referenzschaltpläne und Layoutbeispiele zeigen Stromversorgungsbaum, POR-Sequenz, Ladepfad, OVP-Auswahl und Lastschalterstrategie für den Energiesparbetrieb. Verwenden Sie bei akkubetriebenen Varianten je nach Boot-Medium einen internen LDO, einen nachgeschalteten Lastschalter oder einen externen LDO. Bei 3,3-V-Versorgungsvarianten ist für alle externen Boot-Medien ein externer LDO erforderlich. Beachten Sie für VBUS die Referenzschaltungen zum EOS/ESD- und OVP-Schutz sowie zum Anschluss des Akku-NTC-Thermistors. Prüfen Sie Beispiele für akkubetriebene Varianten getrennt von Beispielen für 3,3-V-Versorgungsvarianten, damit Sie die beiden Stromversorgungsfamilien nicht vermischen.

Die Versorgungsrampe muss außerdem den in den Referenzabbildungen angegebenen VDD-Anstiegszeitbereich erfüllen: `1 < tVR < 500000 μs/V`. Halten Sie bei 3,3-V-Versorgungsvarianten das dargestellte Verhältnis der PVDD- und VDDIO-Rampen ein; VDDIO darf gleichzeitig mit PVDD eingeschaltet werden.

Referenzabbildungen für akkubetriebene Varianten:

![Abbildung 5.2-1: Einschaltverlauf der akkubetriebenen Variante](../../sf32-products/chips/assets/57x/SF32LB57x-POR-VBAT.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-1: Einschaltverlauf der akkubetriebenen Variante</em></div>

![Abbildung 5.2-2: Stromversorgungsstruktur der akkubetriebenen Variante](../../sf32-products/chips/assets/57x/SF32LB57x-H-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-2: Stromversorgungsstruktur der akkubetriebenen Variante</em></div>

Referenzabbildungen für 3,3-V-Versorgungsvarianten:

![Abbildung 5.2-3: Einschaltverlauf der 3,3-V-Versorgungsvariante](../../sf32-products/chips/assets/57x/SF32LB57x-POR-3V3.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-3: Einschaltverlauf der 3,3-V-Versorgungsvariante</em></div>

![Abbildung 5.2-4: Stromversorgungsstruktur der 3,3-V-Versorgungsvariante](../../sf32-products/chips/assets/57x/SF32LB57x-L-PWR-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-4: Stromversorgungsstruktur der 3,3-V-Versorgungsvariante</em></div>

Referenzabbildungen zu Laden und OVP:

![Abbildung 5.2-5: Externes Ladegerät ohne PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-NPPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-5: Externes Ladegerät ohne PPM</em></div>

![Abbildung 5.2-6: Externes Ladegerät mit PPM](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-PPM.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-6: Externes Ladegerät mit PPM</em></div>

![Abbildung 5.2-7: Referenzschaltung integriertes Ladegerät](../../sf32-products/chips/assets/57x/SF32LB57x-CHG-INNER.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-7: Referenzschaltung integriertes Ladegerät</em></div>

![Abbildung 5.2-8: Anwendung mit einstellbarem OVLO-OVP](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-OVLO.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-8: Anwendung mit einstellbarem OVLO-OVP</em></div>

![Abbildung 5.2-9: Anwendung mit geregeltem OVP-Ausgang](../../sf32-products/chips/assets/57x/SF32LB57x-OVP-REGU.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.2-9: Anwendung mit geregeltem OVP-Ausgang</em></div>

#### 5.2.9. Elektrische Randbedingungen nach Gehäuse und Stromversorgungsfamilie { #529-package-and-power-family-electrical-constraints }

Die Versorgungsanforderungen des SF32LB57x unterscheiden sich je nach Gehäuse und Stromversorgungsfamilie. Die unbedingt zu prüfenden Unterschiede sind unten zusammengefasst; endgültige Schaltpläne sollten dennoch anhand des Minimalsystem-Schaltplans und des Datenblatts für das gewählte Gehäuse geprüft werden.

<div align="center"><em>Tabelle 5.2-5: Wesentliche Unterschiede zwischen den Stromversorgungsfamilien</em></div>

<div align="center" markdown>

| Design-Element | Akkubetriebene Varianten | 3,3-V-Versorgungsvarianten |
|:------------|:-------------------------|:----------------------|
| Haupt-Versorgungseingang | Gehäusetabellen: `VBUS` 4,5–5,5 V, `VBAT`/`VCC` 3,0–4,7 V. Checkliste: `VBUS` 4,6–5,5 V, `VCC` 3,45–4,7 V, Ein-/Abschaltschwelle 3,45 V/2,7 V. Die Tabellenfußnoten nennen 3,5 V ±10 % zum Einschalten. Konstantspannung: 3,6–4,7 V, vorzugsweise 3,8 V; Software-Unterspannungsschwelle 3,48 V. Unterschiede klären, nicht den Betriebsbereich erweitern. | `PVDD`/`PVDD_PMU` 2,97–3,63 V; `VBATS` dient ausschließlich der Akkuspannungsmessung. |
| Analog- und RF-Versorgungen | `AVDD_BRF` wird von `VSYS` versorgt; `AVDD33_AUD` wird von `VDD33_VOUT1` versorgt. | Externe 3,3 V sternförmig an `AVDD33` / `AVDD33_ANA`, `AVDD_BRF` und `AVDD33_AUD` führen; `VDDIOA` je nach Bestellnummer mit 1,8 V oder 3,3 V versorgen. |
| Interne LDO-Ausgänge | `VDD_VOUT1`, `VDD_VOUT2`, `VDD_RET`, `VDD_RTC` und `VDD18_VOUT` sind interne Versorgungen und sollten keine gewöhnlichen externen Peripheriegeräte versorgen. | Gleich; `VDD18_VOUT` ist nur für den internen oder im Gehäuse integrierten PSRAM vorgesehen, nicht als Versorgung externer 1,8-V-Peripheriegeräte. |
| `VDD33_VOUT1` | 3,3 V, 150 mA nach dem Hochfahren, standardmäßig aktiviert; der Softstart-Laststrom darf 30 mA nicht überschreiten, sonst kann der LDO nicht starten. Die Stromversorgungs-Checkliste erlaubt nur im Gehäuse integriertes Flash, externes NOR-/NAND-Flash und `AVDD33_AUD` und untersagt andere Peripherie. | Nicht anwendbar. |
| `VDD33_VOUT2` | 3,3 V, 150 mA, standardmäßig deaktiviert und per Software aktivierbar; Laststrom darf während des Softstarts 30 mA nicht überschreiten. Laut SiFli-Checkliste kann die Software diese Softstart-Strombegrenzung deaktivieren. Prüfen Sie in diesem Fall, ob der Einschaltstrom der Peripherie mit den empfohlenen Versorgungsbedingungen vereinbar ist. | Nicht anwendbar. |
| `VDDIOSB` / `VDDIOSA` | Die QFN80L-Batterietabelle führt `VDD33_VOUT1`, nicht `VDDIOSB` auf.<!-- BGA-ONLY --> BGA112 bietet `VDDIOSA` (1,8 V aus `VDD18_VOUT`) und `VDDIOSB` (bei PSRAM im Gehäuse 1,8 V aus `VDD18_VOUT`, bei NOR-Flash 3,3 V aus `VDD33_VOUT1`).<!-- /BGA-ONLY --> | Bei QFN80L<!-- BGA-ONLY --> und BGA112<!-- /BGA-ONLY --> erhält `VDDIOSB` für PSRAM im Gehäuse 1,8 V aus `VDD18_VOUT`, für NOR-Flash externe 3,3 V.<!-- BGA-ONLY --> Bei BGA112 wird `VDDIOSA` an `VDD18_VOUT` angeschlossen.<!-- /BGA-ONLY --> |

</div>

!!! warning "Widerspruch in der Quelle zum Lastbereich von VDD33_VOUT1"
    Im Versorgungsbaum der SiFli-Designanleitung sind Sensoren mit `VDD33_VOUT1` verbunden. Die Stromversorgungs-Checkliste derselben Anleitung beschränkt diesen Ausgang jedoch ausdrücklich auf NOR-/NAND-Flash und `AVDD33_AUD` und untersagt weitere Peripherie. Bis SiFli den Widerspruch klärt, befolgen Sie die strengere Checkliste: Versorgen Sie keine Sensoren und anderen Peripheriegeräte aus dieser Schiene.

!!! warning "Abweichung bei der PVDD-Mindestspannung in der Quelle"
    Die Schaltplan-Checkliste nennt für `PVDD` einen Bereich von 2,93–3,63 V, während die obige Referenztabelle zur Versorgungsfamilie 2,97–3,63 V angibt. Die Quelldokumente lösen diese Abweichung nicht auf. Setzen Sie bis zur Klärung durch SiFli für die Designprüfung den strengeren Mindestwert von 2,97 V an und bestätigen Sie die elektrischen Daten für die genaue Teilenummer.

!!! warning "Abweichung beim VBATS-Eingangsbereich"
    Die Gehäuse-Pintabellen für 3,3-V-Versorgungsvarianten nennen für `VBATS` 0 bis 4,7 V; die Schaltplan-Checkliste begrenzt die Akkuspannungsmessung dagegen auf 0–4,5 V. Bis SiFli den Unterschied klärt, halten Sie `VBATS` bei diesen Varianten auf höchstens 4,5 V.

<div align="center"><em>Tabelle 5.2-6: Wesentliche Kondensatoren und Lastgrenzen</em></div>

<div align="center" markdown>

| Schiene / Pin | Quellanforderung |
|:-----------|:------------------------|
| `VBUS` | Akkubetriebene Varianten benötigen mindestens 10 µF / 10 V, wenn das integrierte Ladegerät genutzt wird. |
| `VBAT` | Mindestens 4,7 µF / 10 V; die Akkuspannung wird über einen internen GPADC-Kanal gemessen. |
| `VCC`/`PVDD` | `VCC` benötigt mindestens 10 µF / 10 V; `PVDD` benötigt mindestens 10 µF / 6,3 V. |
| `BUCK_FB` | 4,7 µF, zwischen Induktivität und Chip-Pin platziert. |
| `VSYS` | 2,2 µF / 6,3 V; Gesamtkapazität auf dieser Domäne sollte 9,6 µF nicht überschreiten, und die Schiene sollte nur spezifizierte interne/analoge/RF-bezogene Lasten versorgen. |
| `VDD33_VOUT1`/`VDD33_VOUT2` | Je 2,2 µF / 6,3 V; Gesamtkapazität je Domäne sollte 9,6 µF nicht überschreiten. |
| `VDD_VOUT1`/`VDD_VOUT2` | Je 4,7 µF / 6,3 V. |
| `VDD_RET`/`VDD_RTC` | `VDD_RET` nutzt 0,47 µF / 6,3 V; `VDD_RTC` nutzt 1 µF / 6,3 V. |
| `AVDD_BRF`/`AVDD33_AUD` | `AVDD_BRF` nutzt 4,7 µF / 6,3 V; `AVDD33_AUD` nutzt 2,2 µF / 6,3 V. |
| `VDDIOA`/`VBATS`/`AVDD33_ANA` | Nur 3,3-V-Versorgungsvarianten: `VDDIOA` nutzt 4,7 µF / 6,3 V, `VBATS` nutzt 0,1 µF / 10 V, `AVDD33_ANA` nutzt 1 µF / 6,3 V. |
| `AUD_VREF`/`GPADC_VREF` | Nur Kondensator; nicht extern ansteuern. Typische Werte sind 1 µF für `AUD_VREF` und 4,7 µF für `GPADC_VREF`. |
| `MIC_BIAS` | 1 µF / 6,3 V, nur als Mikrofon-Bias verwendet. |

</div>

<div align="center"><em>Tabelle 5.2-7: Unbedingt zu prüfende Punkte zu Laden und OVP</em></div>

<div align="center" markdown>

| Thema | Anforderung |
|:-----|:------------|
| Anwendungsfall integriertes Ladegerät | Nur verwenden, wenn das Produkt warten kann, bis der Akku etwa 3,6 V erreicht, bevor die Firmware das Display einschaltet. |
| Anforderung an sofortiges Einschalten des Displays | Muss das Produkt das Display unmittelbar nach dem Anschließen des Ladegeräts einschalten, verwenden Sie ein externes Ladegerät mit PPM-Power-Path-Management. |
| Akkuspezifikation | Das `VBAT`-Laden unterstützt Akkus mit einer Nennspannung von 4,2 V bis 4,45 V; der Vorladestrom beträgt etwa 40 mA, der maximale Ladestrom 1C bis 400 mA. |
| Einstellbares OVLO-OVP | Der Anwendungstext nennt 5,2–5,5 V, die Checkliste dagegen 5,15–5,55 V; der gemeinsame Bereich beträgt 5,2–5,5 V. 1-%-Teilerwiderstände verwenden und den OVLO-Schwellenfehler unter 3 % halten. Bis SiFli die Abweichung klärt, den gemeinsamen Bereich zugrunde legen. |
| OVP mit geregeltem Ausgang | LDO-Ausgangs-OVP wird empfohlen; Ausgang sollte 4,7 V bis 5,4 V betragen, Lastfähigkeit mindestens 0,5 A, OCP-Schwelle mindestens 0,7 A. |
| Integriertes Ladegerät nicht genutzt | `VBUS` kann offen bleiben und dessen Kondensator entfallen; in diesem Fall liefert `VBAT` keine Ausgangsleistung. |

</div>


#### 5.2.10. Betriebsmodi und Weckquellen { #5210-operating-modes-and-wake-sources }

Betriebsmodi und Weckquellen gehören zur Prüfung des Stromversorgungssystems, da sie bestimmen, welche Schienen, Pull-ups, externen Lasten und weckfähigen GPIOs in jedem Energiesparzustand aktiv bleiben.

#### 5.2.11. Energiemodi { #5211-power-modes }

Die SF32LB57x-Familie bietet zehn Interruptquellen, die das Gerät aus Standby und Hibernate wecken können; ihre Zuordnung ist in der folgenden Tabelle dargestellt.

<div align="center"><em>Tabelle 5.2-8: Vergleich der Energiemodi</em></div>

<div align="center" markdown>

| Modus | CPU | Peripherie | SRAM | IO | LPTIM | Typische Weckquellen | Typische Aufwachzeit |
|:-----|:----|:------------|:-----|:---|:------|:---------------------|:------------------|
| Active | Läuft | Läuft | Zugänglich | Toggelt | Läuft | - | - |
| Sleep | Angehalten | Läuft | Zugänglich | Toggelt | Läuft | Jeder Interrupt | <0,5 µs |
| DeepSleep | Angehalten | Angehalten | Erhalten, nicht zugänglich | Pegel gehalten | Läuft | RTC, Weck-IO, GPIO, LPTIM, Bluetooth | ~250 µs |
| Standby | Reset | Reset | Erhalten, nicht zugänglich | Pegel gehalten | Läuft | RTC, Weck-IO, LPTIM, Bluetooth | ~1 ms |
| Hibernate | Reset | Reset | Nicht erhalten | Hochohmig | Reset | RTC, Weck-IO | >2 ms |

</div>

#### 5.2.12. Weckkonzept { #5212-wake-design }

- Verbinden Sie Tasten, Touch-Interrupts und Sensor-Interrupts, die das System wecken sollen, mit weckfähigen GPIOs.
- Planen Sie externe hardwareseitige Wecksignale vorzugsweise an `PA33` bis `PA42` und kennzeichnen Sie die Weckfunktion im Schaltplan.
- Prüfen Sie IO-Hold-, Hochohmig-, Pull-up-, Pull-down- und Peripherieversorgungszustände in Standby und Hibernate.
- Für ein Wecken beim Anschließen von USB ist ein VBUS-Teiler erforderlich, der mit einem weckfähigen GPIO mit korrekter I/O-Spannung verbunden ist.
- Prüfen Sie Bluetooth-, RTC- und externe Weckfunktionen gemeinsam mit der Energiesparrichtlinie der Firmware.

#### 5.2.13. Validierung des Energiesparbetriebs { #5213-low-power-validation }

Messen Sie während des EVT mindestens die folgenden Zustände:

<div align="center"><em>Tabelle 5.2-9: Zustände und Ziele für die Energiesparvalidierung</em></div>

<div align="center" markdown>

| Zustand | Messziel |
|:------|:-----------------|
| Ausgeschaltet / Versandmodus | Leckstrom des ausgeschalteten Systems bei längerer Lagerung messen und Rückspeisung durch Peripheriegeräte prüfen. |
| Hibernate | Minimalen Systemstrom bestätigen, wenn SRAM nicht erhalten bleibt. |
| Standby | IO-Hold, RTC-/Weckquellen und Bluetooth-Weckrichtlinie prüfen. |
| DeepSleep | Basisstrom für gängige verbundene Standby-Szenarien prüfen. |
| Bildschirm im Leerlauf eingeschaltet | Kombinierten Strom von Display, Hintergrundbeleuchtung, Touch, Sensoren und Bluetooth prüfen. |
| Laden | VBUS, VBAT, thermisches Verhalten, OVP und Systemstrompfad prüfen. |

</div>

<div align="center"><em>Tabelle 5.2-10: Externe Weck-Pins für Standby/Hibernate</em></div>

<div align="center" markdown>

| Weckquelle | Pin |
|:------------|:----|
| `WKUP_PIN0` | `PA33` |
| `WKUP_PIN1` | `PA34` |
| `WKUP_PIN2` | `PA35` |
| `WKUP_PIN3` | `PA36` |
| `WKUP_PIN4` | `PA37` |
| `WKUP_PIN5` | `PA38` |
| `WKUP_PIN6` | `PA39` |
| `WKUP_PIN7` | `PA40` |
| `WKUP_PIN8` | `PA41` |
| `WKUP_PIN9` | `PA42` |

</div>

Erfassen Sie für jede Messung Firmware-Version, Versorgungsspannung, Akkusimulator-Einstellung, Peripherie-Verbindungszustand, Bluetooth-Verbindungszustand und Umgebungstemperatur.

#### 5.2.14. Vollständige Stromversorgungs-Pin-Referenz { #5214-full-power-supply-pin-reference }

Verwenden Sie diese Tabellen für die pinweise Schaltplanprüfung. Jede Tabelle listet für eine Kombination aus Gehäuse und Stromversorgungsfamilie die minimale, typische und maximale Spannung sowie den maximalen Strom jedes Versorgungspins auf. Wählen Sie die Tabelle, die zur genauen bestellbaren Teilenummer passt; mischen Sie keine Zeilen aus unterschiedlichen Gehäusen oder Stromversorgungsfamilien.

!!! warning "Geltungsbereich von Versorgungstabellen und Checkliste"
    Die folgenden Werte stammen aus den aktuellen gehäusespezifischen Versorgungstabellen von SiFli. Dort beträgt die Mindestspannung für `VBUS` 4,5 V und für `VBAT`/`VCC` 3,0 V. Die Checkliste verlangt dagegen 4,6–5,5 V an `VBUS` und 3,45–4,7 V an `VCC`, mit 3,45 V Einschalt- und 2,7 V Abschaltschwelle. Die Tabellenfußnoten nennen eine abweichende Einschaltspannung von 3,5 V ±10 %. Für `VSYS` steht als typischer Wert 3,3 V, in derselben Zeile jedoch eine Beschreibung als 3,0 V. Die 3,3 V bei `BUCK_LX` bezeichnen einen Schaltknoten, keinen geregelten Gleichspannungsausgang. Klären Sie diese Unterschiede für die genaue Bestellnummer vor der Freigabe; 3,0 V als Tabellenminimum garantieren keinen Start.

<div align="center"><em>Tabelle 5.2-11: Versorgungspin-Referenz QFN68L, akkubetriebene Variante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,5 | 5,0 | 5,5 | 400 | VBUS-Versorgungseingang; versorgt das interne Lademodul. |
| `VBAT` | 3,0 | - | 4,7 | 400 | Akkuanschluss; ein interner GPADC-Kanal misst an diesem Pin ebenfalls die Akkuspannung. |
| `VSYS` | - | 3,3 | - | 150 | Interner 3,0-V-Versorgungsausgang; externen Kondensator gegen Masse hinzufügen. Versorgt `AVDD_BRF`. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung — keine externen Peripheriegeräte versorgen. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung — keine externen Peripheriegeräte versorgen. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung — keine externen Peripheriegeräte versorgen. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung — keine externen Peripheriegeräte versorgen. |
| `VCC` | 3,0 | - | 4,7 | 200 | Systemversorgungseingang; an den Akku anschließen. Die Tabellenfußnoten nennen 3,5 V ±10 % zum Einschalten und 3,48 V als standardmäßige Software-Unterspannungsschwelle. Bei Konstantspannungsversorgung 3,6–4,7 V verwenden, vorzugsweise 3,8 V; Abweichungen zur Checkliste siehe Warnhinweis. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, Kondensator gegen Masse hinzufügen, keine externen Peripheriegeräte versorgen. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 1; Kondensator gegen Masse hinzufügen. 150 mA Lastfähigkeit nach dem Hochfahren; standardmäßig aktiviert. Der Softstart-Laststrom darf 30 mA nicht überschreiten, sonst kann der LDO nicht starten. Versorgt im Gehäuse integriertes und externes Flash sowie `AVDD33_AUD`. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 2; standardmäßig deaktiviert, benötigt Softwarekonfiguration zur Aktivierung. 150 mA Lastfähigkeit nach dem Hochfahren; Softstart-Laststrom darf 30 mA nicht überschreiten. Versorgt den Motor oder das LCD-Panel. |
| `GPADC_VREF` | - | - | - | - | GPADC-Referenzeingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit `VSYS` verbinden. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzspannungseingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit `VDD33_VOUT1` verbinden. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>

<div align="center"><em>Tabelle 5.2-12: Versorgungspin-Referenz QFN68L, 3,3-V-Versorgungsvariante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 1,62 | 1,8 / 3,3 | 3,63 | 100 | GPIO-Versorgungseingang; gemäß genauer Bestellnummer an 1,8 V oder 3,3 V anschließen. |
| `VBATS` | 0 | - | 4,7 | 1 | Akkuspannungs-Messeingang; ein interner GPADC-Kanal misst an diesem Pin die Akkuspannung. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 200 | PMU-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Analogversorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `GPADC_VREF` | - | - | - | - | GPADC-Referenzeingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzspannungseingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>

!!! note "VDDIOA-Spannung und Flash-Takt"
    `SF32LB57ZUN3N6` unterstützt 1,8 V oder 3,3 V an `VDDIOA`; die geltenden Grenzen sind anhand der Bestellnummer zu prüfen. Für QFN68L-Varianten mit 3,3-V-Versorgung schreibt SiFli bei 1,8 V an `VDDIOA` einen internen Flash-Lese-/Schreibtakt unter 80 MHz vor. Bei 3,3 V kann die Standardeinstellung 104 MHz verwendet werden.

!!! note
    Versorgen Sie `PVDD`, `AVDD33`, `AVDD_BRF` und `AVDD33_AUD` mit externen 3,3 V über unabhängige sternförmige Zweige. Wählen Sie für `VDDIOA` je nach genauer Bestellnummer 1,8 V oder 3,3 V; eine 3,3-V-Hauptversorgung erfordert keine 3,3-V-I/O-Versorgung.

<div align="center"><em>Tabelle 5.2-13: Versorgungspin-Referenz QFN80L, akkubetriebene Variante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 1,62 | 1,8 / 3,3 | 3,63 | 100 | GPIO-Versorgungseingang; gemäß genauer Bestellnummer an 1,8 V oder 3,3 V anschließen. |
| `VBATS` | 0 | - | 4,7 | 1 | Akkuspannungs-Messeingang; ein interner GPADC-Kanal misst an diesem Pin die Akkuspannung. |
| `VSYS` | - | 3,3 | - | 150 | Interner 3,0-V-Versorgungsausgang; externen Kondensator gegen Masse hinzufügen. Versorgt `AVDD_BRF`. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Analogversorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `VCC` | 3,0 | - | 4,7 | 200 | Systemversorgungseingang; an den Akku anschließen. Die Tabellenfußnoten nennen 3,5 V ±10 % zum Einschalten und 3,48 V als standardmäßige Software-Unterspannungsschwelle. Bei Konstantspannungsversorgung 3,6–4,7 V verwenden, vorzugsweise 3,8 V; Abweichungen zur Checkliste siehe Warnhinweis. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 1; Kondensator gegen Masse hinzufügen. 150 mA Lastfähigkeit nach dem Hochfahren; standardmäßig aktiviert. Der Softstart-Laststrom darf 30 mA nicht überschreiten, sonst kann der LDO nicht starten. Versorgt im Gehäuse integriertes und externes Flash sowie `AVDD33_AUD`. |
| `GPADC_VREF` | - | - | - | - | GPADC-Referenzeingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit `VSYS` verbinden. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzspannungseingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit `VDD33_VOUT1` verbinden. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>


<div align="center"><em>Tabelle 5.2-14: Versorgungspin-Referenz QFN80L, 3,3-V-Versorgungsvariante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VDDIOA` | 1,62 | 3,3 | 3,63 | 100 | GPIO-Versorgungseingang; gemäß genauer Bestellnummer an 1,8 V oder 3,3 V anschließen. |
| `VBATS` | 0 | - | 4,7 | 1 | Akkuspannungs-Messeingang; ein interner GPADC-Kanal misst an diesem Pin die Akkuspannung. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `AVDD33` | 2,97 | 3,3 | 3,63 | 20 | Analogversorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `PVDD` | 2,97 | 3,3 | 3,63 | 200 | PMU-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, keine externen Peripheriegeräte versorgen. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | SIP-SB-IO-Versorgungseingang; die Spannung hängt von der genauen Teilenummer ab. Ist PSRAM auf MPI2/MPI3 im Gehäuse integriert, diesen Pin mit `VDD18_VOUT` (1,8 V) verbinden. Ist NOR-Flash integriert, den Pin extern mit 3,3 V versorgen. |
| `GPADC_VREF` | - | - | - | - | GPADC-Referenzeingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzspannungseingang; nur Kondensator gegen Masse hinzufügen, nicht extern ansteuern. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>

!!! note
    Versorgen Sie `PVDD`, `AVDD33`, `AVDD_BRF` und `AVDD33_AUD` mit externen 3,3 V über unabhängige sternförmige Zweige. Wählen Sie für `VDDIOA` je nach genauer Bestellnummer 1,8 V oder 3,3 V; eine 3,3-V-Hauptversorgung erfordert keine 3,3-V-I/O-Versorgung.

<!-- BGA-ONLY -->
<div align="center"><em>Tabelle 5.2-15: Versorgungspin-Referenz für die akkubetriebene BGA112-Variante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VBUS` | 4,5 | 5,0 | 5,5 | 400 | VBUS-Versorgungseingang; versorgt das interne Lademodul. |
| `VBAT` | 3,0 | - | 4,7 | 400 | Akkuanschluss; ein interner GPADC-Kanal misst an diesem Pin ebenfalls die Akkuspannung. |
| `VSYS` | - | 3,3 | - | 150 | Interner 3,0-V-Versorgungsausgang; externen Kondensator gegen Masse hinzufügen. Versorgt `AVDD_BRF`. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VCC` | 3,0 | - | 4,7 | 200 | Systemversorgungseingang; an den Akku anschließen. Die Tabellenfußnoten nennen 3,5 V ±10 % zum Einschalten und 3,48 V als standardmäßige Software-Unterspannungsschwelle. Bei Konstantspannungsversorgung 3,6–4,7 V verwenden, vorzugsweise 3,8 V; Abweichungen zur Checkliste siehe Warnhinweis. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, Kondensator gegen Masse hinzufügen. |
| `VDD33_VOUT1` | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 1; standardmäßig aktiviert. Softstart-Last auf 30 mA begrenzen; nach dem Hochfahren sind bis zu 150 mA möglich. |
| `VDD33_VOUT2` | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 2; standardmäßig deaktiviert und per Software aktivierbar. Softstart-Last auf 30 mA begrenzen; nach dem Hochfahren sind bis zu 150 mA möglich. |
| `PVSS_PMU` | - | - | - | - | PMU-Versorgungsmasse. |
| `AVSS_PMU` | - | - | - | - | PMU-Analogmasse. |
| `VDDIOA` | 1,62 | 1,8 / 3,3 | 3,63 | 100 | GPIO-Versorgungseingang; gemäß genauer Bestellnummer an 1,8 V oder 3,3 V anschließen. |
| `VDDIOSA` | - | 1,8 | - | 30 | IO-Versorgungseingang für den gehäuseintegrierten Speicher; mit `VDD18_VOUT` verbinden. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | I/O-Versorgungseingang für den gehäuseintegrierten Speicher; die Spannung hängt von der genauen Teilenummer ab. Bei integriertem PSRAM mit `VDD18_VOUT` (1,8 V) verbinden; bei integriertem NOR-Flash mit `VDD33_VOUT1` (3,3 V) verbinden. |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Analogversorgungseingang; mit 3,3 V verbinden. |
| `AVSS33_ANA` | - | - | - | - | Analogmasse. |
| `GPADC_VREFP` | - | - | - | - | Positiver GPADC-Referenzeingang; nur einen Kondensator anschließen, nicht extern ansteuern. |
| `GPADC_VREFN` | - | - | - | - | Negative GPADC-Referenz; mit Masse verbinden. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit `VSYS` verbinden. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | RF-Masse. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzeingang; nur einen Kondensator anschließen, nicht extern ansteuern. |
| `AUD_VREF_GND` | - | - | - | - | Audiomasse. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit `VDD33_VOUT1` verbinden. |
| `AVSS33_AUD` | - | - | - | - | Audiomasse. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>

<div align="center"><em>Tabelle 5.2-16: Versorgungspin-Referenz für die 3,3-V-BGA112-Variante</em></div>

<div align="center" markdown>

| Versorgungspin | Min. (V) | Typ. (V) | Max. (V) | Max. Strom (mA) | Beschreibung |
|:---|:---|:---|:---|:---|:---|
| `VBATS` | 0 | - | 4,7 | 1 | Eingang zur Akkuspannungsmessung; ein interner GPADC-Kanal misst hier die Akkuspannung. |
| `BUCK_LX` | - | 3,3 | - | 50 | BUCK-Induktivitäts-Schaltknoten; ein Ende der Induktivität anschließen. |
| `BUCK_FB` | - | 1,25 | - | 50 | BUCK-Feedback; das andere Ende der Induktivität und einen Kondensator gegen Masse anschließen. |
| `VDD_VOUT1` | - | 1,1 | - | 50 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_VOUT2` | - | 0,9 | - | 20 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_RET` | - | 0,9 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `VDD_RTC` | - | 1,1 | - | 1 | Interner LDO-Ausgang; externen Kondensator hinzufügen. Nur interne Versorgung. |
| `PVDD_PMU` | 2,97 | 3,3 | 3,63 | 200 | PMU-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `VDD18_VOUT` | - | 1,8 | - | 30 | 1,8-V-LDO-Ausgang; nur interne Versorgung, Kondensator gegen Masse hinzufügen. |
| `PVSS_PMU` | - | - | - | - | PMU-Versorgungsmasse. |
| `AVSS_PMU` | - | - | - | - | PMU-Analogmasse. |
| `VDDIOA` | 1,62 | 1,8 / 3,3 | 3,63 | 100 | GPIO-Versorgungseingang; gemäß genauer Bestellnummer an 1,8 V oder 3,3 V anschließen. |
| `VDDIOSA` | - | 1,8 | - | 30 | IO-Versorgungseingang für den gehäuseintegrierten Speicher; mit `VDD18_VOUT` verbinden. |
| `VDDIOSB` | - | 1,8 / 3,3 | - | 30 | I/O-Versorgungseingang für den gehäuseintegrierten Speicher; die Spannung hängt von der genauen Teilenummer ab. Bei integriertem PSRAM mit `VDD18_VOUT` (1,8 V) verbinden; bei integriertem NOR-Flash diesen Pin extern mit 3,3 V versorgen. |
| `AVDD33_ANA` | 2,97 | 3,3 | 3,63 | 20 | Analogversorgungseingang; mit 3,3 V verbinden. |
| `AVSS33_ANA` | - | - | - | - | Analogmasse. |
| `GPADC_VREFP` | - | - | - | - | Positiver GPADC-Referenzeingang; nur einen Kondensator anschließen, nicht extern ansteuern. |
| `GPADC_VREFN` | - | - | - | - | Negative GPADC-Referenz; mit Masse verbinden. |
| `AVDD_BRF` | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `AVSS_BB` / `AVSS_LO` / `AVSS_RRF` / `AVSS_TRF` / `AVSS_TRF2` | - | - | - | - | RF-Masse. |
| `AUD_VREF` | - | - | - | - | Audio-Referenzeingang; nur einen Kondensator anschließen, nicht extern ansteuern. |
| `AUD_VREF_GND` | - | - | - | - | Audiomasse. |
| `AVDD33_AUD` | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang; mit einer externen 3,3-V-Versorgung verbinden. |
| `AVSS33_AUD` | - | - | - | - | Audiomasse. |
| `MIC_BIAS` | 1,4 | - | 2,8 | 2 | Mikrofon-Bias-Ausgang; mit der Mikrofonversorgung verbinden. |

</div>


<!-- /BGA-ONLY -->

Weiter zu [Takt, RF & Benutzerschnittstellen](SF32LB57x_schematic_clock_rf_interfaces.md).
