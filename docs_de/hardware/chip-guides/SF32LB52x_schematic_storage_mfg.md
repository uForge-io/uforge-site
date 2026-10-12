---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplanrichtlinien für Speicher, Konnektivität und Fertigungszugang der SF32LB52x-MCU: Boot-Speicher, Sensoren, Debug-/Download-Schnittstelle und Produktionsprogrammierung."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden — Speicher & Fertigung { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 5.6-5.7 der Schaltplanrichtlinien: Speicher und Konnektivität sowie Fertigung. Die vorherige Seite behandelt [RF & Benutzerschnittstellen](SF32LB52x_schematic_rf_interfaces.md). Für die Prüfung einzelner Punkte verwenden Sie die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md).

### 5.6. Speicher und Konnektivität { #56-storage-and-connectivity }

#### 5.6.1. Speicher { #561-storage }

**Kurzübersicht**

- Externe Boot-Speicher können SPI NOR, SPI NAND oder SD NAND sein; eMMC ist bei unterstützten Varianten mit externer geregelter Versorgung verfügbar.
- Die Bootstrap-Pins `PA13` und `PA17` wählen das Boot-Medium.
- Anwendungshinweise und Schaltungsentwurfsleitfaden nennen `PA21` zum Schalten der Boot-Speicherversorgung, während die offizielle Checkliste `PA11` für externen Flash bei akkubetriebenen Varianten nennt. Lassen Sie den zutreffenden Steuerpin für das konkrete Design von SiFli bestätigen. Unabhängig davon muss NOR-Flash ab 32 MB am MPI über PA21 aus- und wieder eingeschaltet werden können, damit die ROM ihn nach einem Reset oder dem Wechsel in Hibernate erkennt. Bei Varianten mit Co-Packaged Memory muss VDD_SIP in Hibernate abgeschaltet werden, um Leckströme an den Memory-I/Os zu vermeiden.

**Design-Ziel**

Wählen Sie ein Boot-Medium und ein dazu passendes Versorgungskonzept, das Firmware-Größe, Update-Strategie und Energiesparzustände berücksichtigt und einen zuverlässigen ROM-Start nach einem Reset oder dem Wecken aus Hibernate ermöglicht.

##### 5.6.1.1. Beschreibung der Speicherschnittstelle { #5611-storage-interface-description }

Der Chip unterstützt externes SPI-NOR-Flash, SPI-NAND-Flash und SD-NAND-Flash. **eMMC wird nur bei den Varianten 52B/D/E/G/J mit externer geregelter Versorgung unterstützt.**

<div align="center"><em>Tabelle 5.6-1: SPI-NOR-/NAND-Flash-Signalverbindungen</em></div>

<div align="center" markdown>

| Flash-Signal | I/O-Pin | Beschreibung |
|:---|:---|:---|
| CS# | PA12 | Chip Select, low-aktiv |
| SO | PA13 | Daten IO1 |
| WP# | PA14 | Daten IO2 / Schreibschutz |
| SI | PA15 | Daten IO0 |
| SCLK | PA16 | Serieller Takt |
| Hold# | PA17 | Daten IO3 / Hold |

</div>

<div align="center"><em>Tabelle 5.6-2: SD-NAND-Flash- und eMMC-Signalverbindungen</em></div>

<div align="center" markdown>

| SD-NAND-/eMMC-Signal | I/O-Pin | Beschreibung |
|:---|:---|:---|
| SD2_CMD | PA15 | Befehl |
| SD2_D1 | PA17 | Daten 1 |
| SD2_D0 | PA16 | Daten 0 |
| SD2_CLK | PA14 | Takt |
| SD2_D2 | PA12 | Daten 2 |
| SD2_D3 | PA13 | Daten 3 |

</div>

!!! note "eMMC-Versorgungsdomänen (nur bei Varianten mit externer geregelter Versorgung)"
    eMMC-Bausteine haben zwei Versorgungsdomänen: VCC und VCCQ. Option 1: Beide gemeinsam schalten. Dadurch sinkt der Strom im abgeschalteten Zustand, die eMMC wacht jedoch langsamer aus dem Schlafmodus auf und die durchschnittliche Leistungsaufnahme der CPU steigt. Option 2: Nur VCC schalten und VCCQ dauerhaft versorgen. Dadurch ist der Strom im abgeschalteten Zustand höher als bei Option 1, die eMMC wacht jedoch schneller auf und die durchschnittliche Leistungsaufnahme der CPU sinkt.

!!! important "Pull-ups für die Speicherschnittstellen"
    Der Anwendungshinweis für Varianten mit externer geregelter Versorgung sieht für NOR Flash keinen externen Pull-up vor. SPI NAND benötigt einen Pull-up an PA17 (Hold#), SD NAND an PA13 (D3) und PA15 (CMD), eMMC an PA17 (D1), PA13 (D3) und PA15 (CMD). Empfohlen werden 7,5 kΩ. Der Anwendungshinweis für batteriegespeiste Varianten nennt nur Bootstrap-Footprints an PA13/PA17 und legt nicht fest, ob dort auch ein Pull-up an PA15/CMD erforderlich ist. Übertragen Sie die PA15-Vorgabe der extern versorgten Varianten nicht ungeprüft auf Akkudesigns; klären Sie die Pull-ups für die konkrete Variante und das Boot-Medium mit SiFli.

##### 5.6.1.2. Boot-Konfiguration { #5612-boot-configuration }

=== "SF32LB520/3/5/7 (akkubetrieben)"

    Der Chip kann vom SPI-NOR-Flash-Speicher im selben Gehäuse sowie von externem SPI-NOR-, SPI-NAND- oder SD-NAND-Flash booten (**Booten von eMMC wird nicht unterstützt**):

    - SF32LB520Ux6 enthält Flash-Speicher im selben Gehäuse und bootet standardmäßig davon.
    - SF32LB523/5/7Ux6 enthalten PSRAM im selben Gehäuse und müssen von externem Speicher booten.

    ![Abbildung 5.6-1: Empfohlene Beschaltung der Bootstrap-Pins (akkubetriebene Variante)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.6-1: Empfohlene Beschaltung der Bootstrap-Pins (akkubetriebene Variante)</em></div>

    <div align="center"><em>Tabelle 5.6-3: Einstellungen der Boot-Optionen (akkubetriebene Variante)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Boot-Medium |
    |:---|:---|:---|
    | L | L | SPI-NOR-Flash |
    | L | H | SPI-NAND-Flash |
    | H | X | SD-NAND-Flash |

    </div>

=== "52B/D/E/G/J (mit externer geregelter Versorgung)"

    Der Chip kann vom SPI-NOR-Flash-Speicher im selben Gehäuse sowie von externem SPI-NOR-, SPI-NAND- oder SD-NAND-Flash und von externem **eMMC-Speicher** booten:

    - Das Modell mit Flash-Speicher im selben Gehäuse (SF32LB52BU36) bootet standardmäßig davon.
    - Modelle mit PSRAM im selben Gehäuse (SF32LB52DUB6/EUB6/GUC6/JUD6) müssen von externem Speicher booten.

    ![Abbildung 5.6-2: Empfohlene Beschaltung der Bootstrap-Pins (Variante mit externer geregelter Versorgung)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.6-2: Empfohlene Beschaltung der Bootstrap-Pins (Variante mit externer geregelter Versorgung)</em></div>

    <div align="center"><em>Tabelle 5.6-4: Boot-Optionen (Variante mit externer geregelter Versorgung)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Boot-Medium |
    |:---|:---|:---|
    | L | L | SPI-NOR-Flash |
    | L | H | SPI-NAND-Flash |
    | H | X | SD-NAND-Flash |
    | H | H | eMMC |

    </div>

    !!! note "Hinweis zur Benennung in der ursprünglichen SiFli-Dokumentation"
        Das ursprüngliche SiFli-Quelldokument verwendet in diesem Abschnitt die Suffixe „SF32LB52AUx6“ und „SF32LB52D/F/HUx6“. Sie weichen von der B/D/E/G/J-Modellbenennung am Anfang desselben Dokuments ab. Dieser Leitfaden unterscheidet deshalb nach dem tatsächlich im Gehäuse integrierten Speichertyp (Flash oder PSRAM). Prüfen Sie im Zweifelsfall das genaue Chipmodell und das zugehörige Datenblatt.

!!! important "Überlappende Boot-Einträge bestätigen"
    Die Anwendungshinweise nennen H/X für SD NAND, während der separate SF32LB52x-Schaltungsentwurfsleitfaden H/L angibt; der Anwendungshinweis für Varianten mit externer geregelter Versorgung nennt außerdem H/H für eMMC. Da X normalerweise einen beliebigen Logikpegel bezeichnet, überlappen die Einträge dieser Variante, und die Quellen erklären den Unterschied nicht. Leiten Sie die endgültigen Strap-Pegel nicht allein aus diesen Tabellen ab; bestätigen Sie die genaue Variante und das ROM-Verhalten mit SiFli. Die Referenzschaltungen verwenden Pull-ups mit 7,5 kΩ: in Abbildung 5.6-1 an der 3,3-V-Schiene VDD33_VOUT1, in Abbildung 5.6-2 an VDDIOA mit 3,3 V.

##### 5.6.1.3. Versorgungssteuerung des Boot-Speichers { #5613-boot-storage-power-control }

Die höherrangigen OpenSiFli-Anwendungshinweise und der Schaltungsentwurfsleitfaden nennen `PA21` als Steuersignal für den Versorgungsschalter (High: ein, Low: aus); dieser Leitfaden verwendet `PA21` daher als quellenbasierten Entwurfswert. Das über das SiFli-Wiki verlinkte Checklisten-Arbeitsblatt nennt dagegen `PA11` für externen Flash bei batteriegespeisten Varianten. Ersetzen Sie PA21 nicht allein aufgrund dieses Arbeitsblatts durch `PA11`. Ob `PA11` ein separates Enable-Signal auf der Platine oder eine abweichende Pinzuordnung bezeichnet, bleibt offen; klären Sie das konkrete Netz und die Variante vor der Freigabe mit SiFli.

=== "SF32LB520/3/5/7 (akkubetrieben)"

    - Speisen Sie bei SF32LB520Ux6 mit Flash-Speicher im selben Gehäuse VDD18_VOUT aus VDD33_VOUT1 und deaktivieren Sie den internen VDD18_VOUT-LDO.
    - Verwenden Sie bei SF32LB523/5/7Ux6 mit PSRAM im selben Gehäuse den internen LDO; VDD18_VOUT kann auch extern versorgt werden.
    - Versorgen Sie externen NOR-Flash von VDD33_VOUT1; ein zusätzlicher Versorgungsschalter ist nicht erforderlich.
    - Versorgen Sie externen SPI-NAND- oder SD-NAND-Flash von VDD33_VOUT1 und ergänzen Sie einen Versorgungsschalter.
    - Das Referenzdesign sieht an PA13 und PA17 Footprints für Pull-up-Widerstände vor. Bestücken Sie sie je nach Speichertyp; empfohlen werden 7,5 kΩ.

=== "52B/D/E/G/J (mit externer geregelter Versorgung)"

    - Sehen Sie beim Modell mit Flash-Speicher im selben Gehäuse (SF32LB52BU36) einen Versorgungsschalter an VDD_SIP vor.
    - Bei Modellen mit PSRAM im selben Gehäuse (SF32LB52DUB6/EUB6/GUC6/JUD6) ist ein VDD_SIP-Versorgungsschalter optional, wenn PVDD = 3,3 V beträgt und VDD_SIP über den internen LDO versorgt wird. Bei PVDD = 1,8 V ist der Schalter erforderlich.
    - Die Stromversorgung des externen Speichers ist unabhängig von VDD_SIP; ergänzen Sie daher einen separaten Versorgungsschalter.
    - Die Abwägungen zu den eMMC-Versorgungsdomänen VCC/VCCQ sind in Abschnitt 5.6.1.1 beschrieben.
    - Der Anwendungshinweis nennt **PA21** für bootbezogene Speicher-Versorgungsschalter; die Quellenabweichung für externen Flash bei akkubetriebenen Varianten ist oben beschrieben.
    - Ein über MPI (Memory Peripheral Interface, Schnittstelle für SPI-NOR/SPI-NAND) angeschlossener NOR-Flash-Speicher mit mindestens 32 MB muss über PA21 aus- und wieder eingeschaltet werden können, damit er beim Neustart der MCU oder beim Wechsel in Hibernate den 4-Byte-Adressmodus verlässt; andernfalls erkennt die ROM den Flash nicht. NOR-Flash-Speicher mit höchstens 16 MB kann dauerhaft versorgt bleiben.
    - Das Referenzdesign sieht an PA13 und PA17 Footprints für Pull-up-Widerstände vor. Je nach Speichertyp bestücken; empfohlen werden 7,5 kΩ.

**Häufige Fehler beim Speicherdesign**

- Fehlende Bootstrap-Widerstände oder Bestückung für das falsche Boot-Medium.
- Der quellenbestätigte Steuerpin für den Versorgungsschalter des Boot-Speichers bleibt unbeschaltet.
- Annahme, dass eMMC bei allen Varianten verfügbar ist.
- Großer NOR-Flash-Speicher bleibt dauerhaft versorgt, obwohl der 4-Byte-Modus die ROM-Erkennung nach einem Neustart stören kann.

**Checkliste Speicher**

- [ ] Das Boot-Medium ist ausgewählt und dokumentiert, bevor das PCB-Layout beginnt.
- [ ] Die Bootstrap-Pull-Optionen von `PA13`/`PA17` stimmen mit der Boot-Tabelle überein.
- [ ] Alle erforderlichen Versorgungsschalter für Boot-Speicher werden über den quellenbestätigten, variantenspezifischen Pin gesteuert; die Abweichung PA11/PA21 wurde mit SiFli geklärt.
- [ ] Die eMMC-VCC-/VCCQ-Abwägung ist für Designs mit externer geregelter Versorgung geprüft.
- [ ] Der Inbetriebnahmeplan deckt die Boot-Modus-Beschaltung, das Timing der Speicherversorgung, das Auslesen der Speicher-ID und den Firmware-Download ab.

#### 5.6.2. Sensoren { #562-sensors }

**Kurzübersicht**

- Sensoren werden üblicherweise über I2C oder SPI angeschlossen. Schalten Sie ungenutzte Sensoren ab, um den Stromverbrauch im Standby zu senken. Sensoren, die das System wecken sollen, müssen im dafür erforderlichen Betriebsmodus bleiben.
- Sensor-Interrupts für das Aufwecken müssen vor der Freigabe der Pinbelegung zugewiesen werden.

**Design-Ziel**

Sorgen Sie für eine zuverlässige Sensorversorgung sowie zuverlässige Interrupt- und Busverbindungen. Stellen Sie sicher, dass sich ungenutzte Sensoren in Energiesparmodi zuverlässig abschalten lassen.

Der SF32LB52x lässt sich mit Herzfrequenzsensoren, Beschleunigungssensoren, geomagnetischen Sensoren und ähnlichen Sensoren verbinden. Wählen Sie zur Sensorversorgung einen Lastschalter mit geringem Ruhestrom (Iq).

**Checkliste Sensoren**

- [ ] Sensor-Bus-, Interrupt-, Reset- und Power-Enable-Pins sind zugewiesen.
- [ ] Ruhestrom (Iq) und Abschaltstrom des Sensor-Lastschalters erfüllen das Standby-Ziel.
- [ ] Pull-up-Widerstände sind an die korrekte Sensor-I/O-Versorgungsschiene angeschlossen.
- [ ] Der Inbetriebnahmeplan umfasst den Bus-Scan, das Aufwecken per Interrupt und das Aus- und Einschalten der Sensorversorgung.

#### 5.6.3. UART- und I2C-Pin-Zuweisung { #563-uart-and-i2c-pin-assignment }

**Kurzübersicht**

- UART- und I2C-Funktionen können beliebigen PA-Pins zugeordnet werden.
- Berücksichtigen Sie bei der Pin-Auswahl dennoch Einschränkungen durch Boot-Funktionen, Weckquellen, Debugging, Produktionstests und das Leiterplatten-Routing.

**Design-Ziel**

Nutzen Sie die flexible Pin-Zuordnung, um das Routing zu vereinfachen, ohne benötigte Bootstrap- oder Weck-Pins, den Debug-Zugang oder Anschlüsse für Fertigungsprüfvorrichtungen zu blockieren.

Der SF32LB52x unterstützt die Zuordnung von UART- und I2C-Funktionen auf beliebige PA-Pins.

**Checkliste UART/I2C**

- [ ] Pull-ups, Spannungsdomänen und Buskapazität sind für jeden I2C-Bus korrekt.
- [ ] Für Logs, Download oder externe Module benötigte UART-Pins sind zugänglich.
- [ ] Das Pin-Multiplexing steht nicht in Konflikt mit Bootstrap-, Weck-, Display-, Speicher- oder Debug-Funktionen.

#### 5.6.4. GPTIM-Pin-Zuweisung { #564-gptim-pin-assignment }

**Kurzübersicht**

- GPTIM-Funktionen können beliebigen PA-Pins zugeordnet werden.
- Timerfunktionen dienen für PWM-Ausgänge, Eingangserfassung, Motorsteuerung, Hintergrundbeleuchtung und produktspezifische Zeitsteuerung.

**Design-Ziel**

Legen Sie timerbezogene Pin-Funktionen früh fest. So müssen PWM-, Capture- und Taktsignale später nicht auf ungünstig geroutete oder mit Weckfunktionen kollidierende Pins gelegt werden.

Der SF32LB52x unterstützt die Zuordnung von GPTIM-Funktionen auf beliebige PA-Pins.

**Checkliste GPTIM**

- [ ] Für PWM, Capture oder Regelschleifen benötigte Timer-Kanäle sind in der Pinbelegungstabelle aufgeführt.
- [ ] GPTIM-Pins stehen nicht in Konflikt mit Anforderungen an Hintergrundbeleuchtung, Motor, Debug oder Speicher.
- [ ] Der Inbetriebnahmeplan umfasst die Prüfung von PWM-Frequenz, Tastgradbereich und Pin-Polarität.

### 5.7. Fertigung { #57-manufacturing }

#### 5.7.1. Debug- und Download-Schnittstelle { #571-debug-and-download-interface }

**Kurzübersicht**

- `PA18` und `PA19` sind nach dem Einschalten standardmäßig DBG_UART und mit SWD gemultiplext.
- Sehen Sie auf jeder Prototypen- und Serienplatine zugängliche Testpunkte oder Steckverbinder für die Debug-/Download-Pins vor.

**Design-Ziel**

Stellen Sie den Firmware-Download, Debug-Protokolle, Einzelschritt-Debugging und die Fehlerwiederherstellung sicher, auch nachdem Produktgehäuse und Produktionsprüfvorrichtung festgelegt sind.

Der SF32LB52x unterstützt eine DBG_UART-Schnittstelle für Download und Debug, die über ein 3,3-V-UART-zu-USB-Adapterboard mit einem PC verbunden wird. SWD und DBG_UART sind auf PA18 und PA19 gemultiplext; die Standardkonfiguration nach dem Einschalten ist DBG_UART, das sowohl Einzelschritt-Debugging als auch Log-Ausgabe unterstützt.

Hinweise zum Einzelschritt-Debugging und zur Log-Ausgabe über DBG_UART finden Sie in den Handbüchern von SFtool und Impeller.

<div align="center"><em>Tabelle 5.7-1: Debug-Port-Verbindungen</em></div>

<div align="center" markdown>

| Debug-Signal | Pin | Beschreibung |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | Debug-UART-Empfang |
| DBG_UART_TXD | PA19 | Debug-UART-Sendung |

</div>

**Checkliste Debug**

- [ ] `PA18`/`PA19`, Masse und die erforderliche Spannungsreferenz sind auf Testpads oder Steckverbinder-Pins zugänglich.
- [ ] Der Debug-Zugang bleibt nach Gehäuse-, Akku- und Display-Montage verfügbar.
- [ ] Der UART-Signalpegel beträgt 3,3 V und ist mit dem gewählten Adapter oder der Testvorrichtung kompatibel.
- [ ] Für eine Leiterplatte, auf der die Anwendungsfirmware nicht startet, ist ein Wiederherstellungsweg dokumentiert.

#### 5.7.2. Produktionsprogrammierung und Quarzkalibrierung { #572-production-flashing-and-crystal-calibration }

**Kurzübersicht**

- Die Produktionsprogrammierung und Quarzkalibrierung erfordern eine stabile Stromversorgung, DBG_UART-Zugang, PA01 sowie die erforderlichen Versorgungs- und Masse-Testpunkte.
- Der Zugang über die Produktionsprüfvorrichtung sollte vor der Freigabe von Platinenkontur und Gehäusedesign festgelegt sein.

**Design-Ziel**

Jede Serienplatine muss sich ohne manuelles Löten oder Zerlegen des Produkts programmieren, kalibrieren und wiederherstellen lassen.

SiFli stellt einen Offline-Downloader für das Flashen der Produktionsfirmware und die Quarzkalibrierung bereit. Reservieren Sie im Hardwaredesign mindestens diese Testpunkte: PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD und PA01. Den detaillierten Flash- und Kalibrierungsprozess finden Sie im Dokument „Offline Downloader User Guide“ im Entwicklungspaket.

**Checkliste Produktion**

- [ ] Die Testpunkte PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD und PA01 sind reserviert.
- [ ] Die Testpads sind nach der mechanischen Montage für die vorgesehene Testvorrichtung erreichbar.
- [ ] Der Ablauf der Quarzkalibrierung und die Abnahmegrenzwerte sind mit der Fertigung abgestimmt.
- [ ] Programmier-, Kalibrierungs- und Funktionstestdatensätze lassen sich der Leiterplattenrevision zuordnen.

#### 5.7.3. Schaltplan- und PCB-Zeichnungs-Checklisten { #573-schematic-and-pcb-drawing-checklists }

Verwenden Sie die offizielle [Schaltplan- und PCB-Checkliste][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] aus dem SiFli-Wiki als formales Freigabekriterium. Die vollständige Prüfung Punkt für Punkt finden Sie in der [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md). Die Checklisten dieses Leitfadens helfen, typische Entwicklungsfehler vor der formalen Prüfung zu erkennen.

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**Freigabe-Checkliste**

- [ ] Schaltplan-Checkliste, PCB-Checkliste, AVL-Prüfung, DRC-Bericht und Impedanzbericht sind vollständig.
- [ ] Nachweis-Screenshots sind archiviert für Stromversorgung, Takt, RF, Display, Speicher, Audio, USB, SDIO, DC/DC und Produktionstestzugang.
- [ ] Variantenspezifische Annahmen sind in den Review-Notizen dokumentiert.
- [ ] Offene Hardware-Risiken sind vor der Freigabe einem Verantwortlichen zugewiesen.
