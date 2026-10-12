---
icon: lucide/circuit-board
hide:
    - navigation
description: "Richtlinien für den Schaltplanentwurf mit dem SF32LB52x-MCU: Minimalsystem, Stromversorgung und Takterzeugung."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden — Schaltplan-Designrichtlinien { #sf32lb52x-hardware-design-guide-schematic-design-guidelines }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Die Schaltplanrichtlinien erstrecken sich über drei Seiten: diese Seite (Abschnitte 5.1-5.3: Minimalsystem, Stromversorgung und Takt), [RF & Benutzerschnittstellen](SF32LB52x_schematic_rf_interfaces.md) (Abschnitte 5.4-5.5) und [Speicher & Fertigung](SF32LB52x_schematic_storage_mfg.md) (Abschnitte 5.6-5.7). Für die Geräteauswahl und den vollständigen Designablauf beginnen Sie mit der [Übersicht des SF32LB52x Hardware-Design-Leitfadens](SF32LB52x_hardware_design_guide.md). Für die Prüfung einzelner Anforderungen verwenden Sie die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md).

## 5. Schaltplan-Designrichtlinien { #5-schematic-design-guidelines }

Dieses Kapitel führt Sie auf drei Seiten durch den Schaltplanentwurf. Prüfen Sie zuerst das Minimalsystem, anschließend auf dieser Seite die Stromversorgung und die Takterzeugung, auf der nächsten Seite RF und Benutzerschnittstellen und zuletzt Speicher, Fertigungszugang sowie PCB-abhängige Entscheidungen. Klären Sie für jeden Funktionsblock zunächst das Entwurfsziel und die betroffenen Varianten. Prüfen Sie danach die Schaltungsanforderungen, Pin-Zuweisungen, häufigen Fehler und Freigabe-Checklisten.

<div align="center"><em>Tabelle 5-1: Übersicht der Schaltplanabschnitte</em></div>

<div align="center" markdown>

| Block | Hauptentscheidung | Freigabenachweis |
|:---|:---|:---|
| Minimalsystem-Design | Exakte Variante, Gehäuse, Boot-Speicher, Bootstrap-Pins, Debug-/Download-Zugang und Mindestablauf zur Inbetriebnahme | Minimalsystem-Review, Bootstrap-Tabelle, Debug-Testpunkte, Boot- und Recovery-Plan |
| Stromversorgungssystem | Variantenspezifische Versorgungsstruktur, Ladepfad, BUCK, LDOs, Versorgung des Boot-Speichers, Betriebsmodi und Weckquellen | Prüfung der Versorgungsstruktur, AVL-Bauteile, Lade-/OVP-Einstellungen, Energiespar- und Weckquellenplan |
| Takterzeugung | Auswahl, Lastkapazität und Kalibrierungsannahmen der 48-MHz- und 32,768-kHz-Quarze | Quarz-CL/ESR-Prüfung, Screenshots von Platzierung und Routing, Kalibrierungsplan |
| RF | RF-Anpassung, Antennenpfad und Tuning-Zugang | RF-Impedanzplan, Screenshot der Anpassnetzwerk-Platzierung, Antennen-Tuning-Plan |
| Benutzerschnittstellen | Display, Audio, Tasten und Vibrationsmotor | Schnittstellen-Schaltplan-Review, Timing-/Steuerungspins, Versorgungssequenz, Prüfung der Analogschaltung |
| Speicher und Konnektivität | Boot-Medium, Bootstrap-Pins, Lastschalter für den Speicher, Sensoren, UART/I2C und GPTIM | Bootstrap-Tabelle, Quellenabweichung PA11/PA21, Bus-Zuweisung, Prüfung der Speicherversorgung |
| Fertigung | DBG_UART/SWD, Testpunkte, Serienprogrammierung, Kalibrierungszugang und Freigabe-Checklisten | Testpunkt-Zeichnung, Plan der Prüfvorrichtung für die Serienfertigung, vollständige Freigabenachweise |

</div>

### 5.1. Minimalsystem-Design { #51-minimum-system-design }

Das Minimalsystem-Design ist die erste Freigabestufe im Schaltplanentwurf eines SF32LB52x-Boards. Es umfasst alle Entscheidungen, die vor dem Hinzufügen produktspezifischer Peripherie geklärt sein müssen: genaue Gerätevariante, Gehäuse, Versorgungsstruktur, Boot-Medium, Bootstrap-Widerstände, Steuerung der Speicherversorgung, Debug-/Download-Zugang, Taktquellen und Weckverhalten. Änderungen an der Display- oder Sensorverkabelung lassen sich oft noch spät vornehmen. Eine falsche Bootstrap-Konfiguration des Speichers, fehlender Debug-Zugang, eine instabile Versorgung oder ungeeignete Annahmen zu den Versorgungszuständen können dagegen den normalen Betrieb der Platine verhindern.

Prüfen Sie den ersten Schaltplanentwurf in folgender Reihenfolge:

1. Wählen Sie das exakte Gerät und Gehäuse aus Abschnitt 3.2 und Abschnitt 3.3.
2. Wählen Sie den korrekten Strompfad: `SF32LB520/3/5/7` für wiederaufladbare akkubetriebene Produkte oder `52B/D/E/G/J` für extern geregelte Produkte.
3. Legen Sie die Stromversorgungsentscheidungen in Abschnitt 5.2 fest, einschließlich `VBUS`/`VBAT`/`VCC` oder `PVDD`/`VDDIOA`/`VDD_SIP`, BUCK, Entkopplung der internen LDOs, RF-/Audio-Versorgungsschienen und aller Lastschalter für Energiesparzustände.
4. Wählen Sie das Boot-Medium und bestücken Sie die Bootstrap-Pull-Optionen von `PA13`/`PA17` passend zur Boot-Tabelle in Abschnitt 5.6.1.
5. Klären Sie vor dem Layout anhand der Quellenabweichung, welcher Pin den Lastschalter für den Boot-Speicher steuert. Anwendungshinweis und Schaltplan-Leitfaden nennen `PA21`; die offizielle Checkliste nennt dagegen `PA11` für externe Flash-Speicher bei akkubetriebenen Varianten.
6. Reservieren Sie `PA18`/`PA19`, Masse und eine gültige Spannungsreferenz für den DBG_UART-/SWD-Zugang, bevor Gehäuse und Fertigungsvorrichtung endgültig festgelegt werden.
7. Wählen Sie die 48-MHz- und 32,768-kHz-Quarze aus Abschnitt 5.3.1 und halten Sie deren Platzierungsvorgaben während des Schaltplan-Reviews sichtbar.
8. Legen Sie Weck-Pins, das Verhalten der Einschalttaste, Ladeereignisse und die Abschaltzustände von Speicher und Sensoren fest, bevor die Energiesparstrategie der Firmware endgültig definiert wird.

Nach dieser Prüfung sollte sich die Schaltung ohne optionale Produktperipherie einschalten lassen, vom gewählten Medium booten, einen Wiederherstellungszugang bereitstellen, die Taktkalibrierung durchführen und den vorgesehenen Energiesparzustand erreichen.

### 5.2. Stromversorgungssystem { #52-power-system }

Die Stromversorgung umfasst Versorgungsspannungen, Lastschalter, Ladepfad, OVP, interne LDOs, Weckverhalten und Energiesparzustände. Sie bildet die Grundlage für ein zuverlässiges Minimalsystem. Legen Sie sie vor der Bauteilplatzierung fest, da davon die weitere Auslegung von Display, Speicher, RF, Audio und Sensoren abhängt.

#### 5.2.1. Stromversorgung { #521-power-supply }

**Kurzübersicht**

- Akkubetriebene Geräte verwenden den `SF32LB520/3/5/7`-Pfad mit Entscheidungen zu `VBUS`, `VBAT`, `VCC`, Laden und OVP.
- Die Geräte `52B/D/E/G/J` verwenden den extern geregelten Versorgungspfad für `PVDD` und `VDDIOA`. Konfigurieren Sie `VDD_SIP` passend zum genauen Chipmodell: Die Versorgung kann extern oder über den internen LDO erfolgen. Ein interner Ladepfad ist nicht vorhanden.
- BUCK-Induktivität, interne LDO-Entkopplung, RF-/Audio-Schienen und Standby-Lastschalter müssen vor der PCB-Platzierung festgelegt sein.

**Entwurfsziel**

Entwerfen Sie für die gewählte Variante eine stabile Versorgungsstruktur mit geringem Leckstrom. Vermeiden Sie eine Überlastung der internen LDO-Ausgänge und Störungen auf den RF- und Audio-Versorgungsschienen. Ungenutzte Lasten und der Boot-Speicher lassen sich in Energiesparmodi abschalten.

##### 5.2.1.1. Anforderungen an die Prozessor-Stromversorgung { #5211-processor-power-supply-requirements }

=== "SF32LB520/3/5/7 (akkubetrieben)"

    <div align="center"><em>Tabelle 5.2-1: Anforderungen an die Stromversorgung (akkubetriebene Variante)</em></div>

    <div align="center" markdown>

    | Pin | Min (V) | Typ (V) | Max (V) | Max. Strom (mA) | Beschreibung |
    |:---|:---|:---|:---|:---|:---|
    | VBUS | 4,5 | 5,0 | 5,5 | 500 | VBUS-Versorgungseingang; siehe Quellenhinweis unten |
    | VBAT | 3,2 | - | 4,7 | 500 | VBAT-Versorgungsausgang |
    | VCC | 3,2 | - | 4,7 | 500 | Systemversorgungseingang (1) |
    | VSYS | - | 3,3 | - | 500 | VSYS-Versorgungsausgang (2) |
    | BUCK_LX | - | 1,25 | - | 50 | BUCK-Ausgangspin; an die Induktivität anschließen |
    | BUCK_FB | - | 1,25 | - | 50 | BUCK-Rückkopplung / interner Versorgungseingang; an das andere Ende der Induktivität und einen externen Kondensator anschließen |
    | VDD_VOUT1 | - | 1,1 | - | 50 | Interner LDO, externer Kondensator, versorgt keine Peripherie |
    | VDD_VOUT2 | - | 0,9 | - | 20 | Interner LDO, externer Kondensator, versorgt keine Peripherie |
    | VDD_RET | - | 0,9 | - | 1 | Interner LDO, externer Kondensator, versorgt keine Peripherie |
    | VDD_RTC | - | 1,1 | - | 1 | Interner LDO, externer Kondensator, versorgt keine Peripherie |
    | VDD18_VOUT | - | 1,8 | - | 30 | SIP-Versorgung (3), intern, versorgt keine Peripherie; kann extern versorgt werden, wenn der LDO deaktiviert ist |
    | VDD33_VOUT1 | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 1 (4), Ausgang standardmäßig abgeschaltet; erfordert Softwarekonfiguration |
    | VDD33_VOUT2 | - | 3,3 | - | 150 | 3,3-V-LDO-Ausgang 2, Ausgang standardmäßig abgeschaltet; erfordert Softwarekonfiguration |
    | AVDD33_AUD | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang mit 3,3 V |
    | AVDD_BRF | 2,97 | 3,3 | 3,63 | 100 | RF-Versorgungseingang |
    | MIC_BIAS | 1,4 | - | 2,8 | - | Mikrofon-Versorgungsausgang |

    </div>

    (1) Bei Versorgung des VCC-Eingangs aus einem Lithium-Akku liegt der softwareseitige Standard-Schwellwert für niedrigen Akkustand bei 3,48 V. Bei Versorgung durch eine Konstantspannungsquelle beträgt der unterstützte Bereich 3,6–4,7 V; empfohlen werden 3,8 V.
    (2) VSYS versorgt AVDD_BRF.
    (3) VDD18_VOUT: SF32LB520U36 benötigt eine externe 3,3-V-Versorgung; SF32LB523/5/7Ux6 verwenden den internen LDO und benötigen keine externe Versorgung. Konfigurieren Sie den internen VDD18-LDO softwareseitig entsprechend dem Chipmodell und aktivieren Sie ihn bei externer Versorgung nicht.
    (4) VDD33_VOUT1: bei SF32LB520U36 versorgt es nur VDD18_VOUT, externen Flash und AVDD33_AUD; bei SF32LB523/5/7Ux6 versorgt es nur externen Flash und AVDD33_AUD.

=== "52B/D/E/G/J (extern geregelt versorgt)"

    <div align="center"><em>Tabelle 5.2-2: Anforderungen an die Stromversorgung (extern geregelte Variante)</em></div>

    <div align="center" markdown>

    | Pin | Min (V) | Typ (V) | Max (V) | Max. Strom (mA) | Beschreibung |
    |:---|:---|:---|:---|:---|:---|
    | PVDD | 2,97 | 3,3 | 3,63 | 150 | PVDD-Systemversorgungseingang, 10-µF-Kondensator |
    | BUCK_LX | - | 1,25 | - | 50 | BUCK-Ausgangspin; an eine 4,7-µH-Induktivität anschließen |
    | BUCK_FB | - | 1,25 | - | 50 | BUCK-Rückkopplung / interner Versorgungseingang; an das andere Ende der Induktivität und einen 4,7-µF-Kondensator anschließen |
    | VDD_VOUT1 | - | 1,1 | - | 50 | Interner LDO, 4,7-µF-Kondensator, versorgt keine Peripherie |
    | VDD_VOUT2 | - | 0,9 | - | 20 | Interner LDO, 4,7-µF-Kondensator, versorgt keine Peripherie |
    | VDD_RET | - | 0,9 | - | 1 | Interner LDO, 0,47-µF-Kondensator, versorgt keine Peripherie |
    | VDD_RTC | - | 1,1 | - | 1 | Interner LDO, 1-µF-Kondensator, versorgt keine Peripherie |
    | VDDIOA | 1,71 | 1,8/3,3 | 3,63 | - | GPIO-Versorgungseingang, 1-µF-Kondensator |
    | AVDD33 | 2,97 | 3,3 | 3,63 | 100 | Analoger Versorgungseingang mit 3,3 V, 4,7-µF-Kondensator |
    | AVDD33_AUD | 2,97 | 3,3 | 3,63 | 50 | Audio-Versorgungseingang mit 3,3 V, 2,2-µF-Kondensator |
    | VDD_SIP | 1,71 | 1,8/3,3 | 3,63 | 30 | Interner LDO oder externe Versorgung (1), 1-µF-Kondensator |
    | AVDD_BRF | 2,97 | 3,3 | 3,63 | 100 | Analoger Versorgungseingang, 4,7-µF-Kondensator |
    | MIC_BIAS | 1,4 | - | 2,8 | - | Mikrofon-Versorgungsausgang, 1-µF-Kondensator |

    </div>

    (1) VDD_SIP: SF32LB52BU36 benötigt eine externe 1,8-V- oder 3,3-V-Versorgung; SF32LB52BU56 benötigt eine externe 3,3-V-Versorgung; SF32LB52DUB6 benötigt eine externe 1,8-V-Versorgung; SF32LB52E/G/JUx6 werden direkt vom internen LDO versorgt und benötigen keine externe Versorgung.

    !!! important "Hinweis zum Hibernate-Modus"
        Wenn das System in den Hibernate-Modus wechselt, muss VDD_SIP abgeschaltet werden, da sonst Leckstrom über die I/O-Pins des im selben Gehäuse integrierten Speichers fließen kann. Verwenden Sie den dedizierten Pin PA21, um den VDD_SIP-Lastschalter zu steuern.

##### 5.2.1.2. Auswahl der BUCK-Induktivität { #5212-buck-inductor-selection }

Beide Versorgungsvarianten verwenden dieselbe Induktivitätsspezifikation.

!!! important "Wichtige Parameter der Leistungsinduktivität"
    L (Induktivität) = 4,7 µH ± 20 %, DCR (Gleichstromwiderstand) ≤ 0,4 Ω, Isat (Sättigungsstrom) ≥ 450 mA.

##### 5.2.1.3. Akku- und Ladesteuerung { #5213-battery-and-charging-control }

=== "SF32LB520/3/5/7 (akkubetrieben)"

    Die Ladeschaltung kann mit einem externen Lade-IC oder dem im Mikrocontroller integrierten Ladeblock realisiert werden.

    **Externer Lademanagement-Chip**

    Externe Lade-ICs gibt es mit oder ohne Power-Path-Management (PPM). Ohne PPM versorgt der Akku direkt die Pins VBAT und VCC. Mit PPM versorgt der VSYS-Ausgang des Lade-ICs den VCC-Pin. Der VBAT-Anschluss des Lade-ICs ist sowohl mit dem Akku als auch mit dem VBAT-Pin des Mikrocontrollers verbunden. In beiden Fällen wird die Akkuspannung über den VBAT-Pin gemessen. Dessen integrierter GPADC-Kanal bietet eine Abtastgenauigkeit von ±30 mV.

    ![Abbildung 5.2-1: Externe Ladeschaltung ohne PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-1: Externe Ladeschaltung ohne PPM</em></div>

    ![Abbildung 5.2-2: Externe Ladeschaltung mit PPM](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-2: Externe Ladeschaltung mit PPM</em></div>

    Verbinden Sie bei PPM den VSYS-Ausgang des Lade-ICs mit dem VCC-Pin des Chips und halten Sie die voreingestellte VSYS-Ausgangsspannung des Lade-ICs bei höchstens 4,7 V, der maximalen VCC-Eingangsspannung.

    **Integriertes On-Chip-Lademanagement-Modul**

    Ist das Gerät wegen niedriger Akkuspannung ausgeschaltet, muss der Akku bei Verwendung des integrierten Ladeblocks nach Anschluss des Ladegeräts zunächst die Einschaltschwelle erreichen. Erst dann kann das System booten und die Ladeanzeige darstellen.

    ![Abbildung 5.2-3: Integrierte Lademanagement-Schaltung](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-3: Integrierte Lademanagement-Schaltung</em></div>

    **Auswahl des OVP-Chips (bei Verwendung des integrierten Lademoduls)**

    Der VBUS-Eingangsbereich beträgt 4,5 V–5,5 V. Wählen Sie daher einen der folgenden OVP-Chip-Typen:

    - OVP-Chip mit einstellbarem OVLO, z. B. AW32905FCR — OVLO zwischen 5,2 V und 5,5 V einstellen (VOVLO_TH-Toleranz ≤3 %, Widerstandstoleranz ≤1 %)
    - OVP-Chip mit geregeltem Ausgang, z. B. SGM4064YDE8G oder LP5305AQVF — der Reglerausgang muss zwischen 4,5 V und 5,4 V liegen

    !!! important "VBUS-Werte weichen zwischen den Quelldokumenten ab"
        Der OpenSiFli-Anwendungshinweis für batteriegespeiste Varianten enthält widersprüchliche VBUS-Angaben: Im Abschnitt zur OVP-Auswahl werden für den VBUS-Pin des Chips 4,5–5,5 V genannt, in der Versorgungstabelle und den Hinweisen zum integrierten Ladegerät dagegen 4,6–5,5 V; außerdem muss der VBUS-Pin bei maximalem Ladestrom mindestens 4,6 V führen. Electrical Specification-A3 nennt allgemein 4,5–5,5 V, während das Referenz-Ladeschaltbild mit 4,3–5,5 V beschriftet ist. Halten Sie bei integriertem Ladegerät bis zur Klärung des maßgeblichen Mindestwerts durch SiFli unter maximaler Last mindestens 4,6 V am Pin ein. Die 4,3-V-Beschriftung ist kein freigegebener Mindestwert.

        Derselbe Anwendungshinweis legt `VIN_OVLO` für OVP-Bausteine mit einstellbarem OVLO auf 5,2–5,5 V fest; die Toleranz von `VOVLO_TH` darf höchstens 3 %, die von R1/R2 höchstens 1 % betragen. Bei OVP-Bausteinen mit geregeltem Ausgang muss der LDO-Ausgang 4,5–5,4 V betragen. Dies sind topologiespezifische OVP-Einstellungen und keine austauschbaren Betriebsbereiche für VBUS. Berücksichtigen Sie Bauteiltoleranzen und bestätigen Sie die freigegebene Schaltung mit SiFli.

    ![Abbildung 5.2-4: OVLO-Einstellpunkt-Formel](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-4: OVLO-Einstellpunkt-Formel</em></div>

    ![Abbildung 5.2-5: Anwendungsschaltung des einstellbaren OVLO-OVP](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-5: Anwendungsschaltung des einstellbaren OVLO-OVP</em></div>

    ![Abbildung 5.2-6: Anwendungsschaltung des OVP mit geregeltem Ausgang](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-6: Anwendungsschaltung des OVP mit geregeltem Ausgang</em></div>

    !!! important "Hinweise zum integrierten Lademodul"
        - VBUS-Eingangsbereich: 4,6 V–5,5 V
        - VCC-Eingangsbereich: 3,2 V–4,7 V
        - Standard-Vorladestrom: 56 mA; Übergangsspannung von Vorladung zu Konstantstromladung: 3,0 V
        - Standard-Konstantladestrom: 65 mA, einstellbar 5–560 mA
        - Standard-Vollladespannung: 4,2 V, einstellbar bis zu 4,45 V
        - Wiederaufladespannung: Vollladespannung - 0,15 V
        - VBUS des Laders muss mindestens 350 mA liefern; die VBUS-Pin-Spannung darf bei maximalem Ladestrom nicht unter 4,6 V fallen
        - Bei kabellosem Laden sicherstellen, dass die Versorgungsfähigkeit des kabellosen Laders den Konstantladestrom übersteigt

    !!! important "Hinweise zum integrierten LDO"
        - Die Gesamtkapazität an den Ausgangspfaden VDD33_VOUT1 und VDD33_VOUT2 darf 9,6 µF nicht überschreiten
        - AVDD33_AUD muss von VDD33_VOUT1 versorgt werden, nicht von VSYS
        - Das LCD darf nicht vom internen LDO versorgt werden — einen externen LDO verwenden

=== "52B/D/E/G/J (extern geregelt versorgt)"

    !!! info "Nicht zutreffend"
        Diese Variante wird direkt aus einer extern geregelten Quelle versorgt und **verfügt über keine Lademanagement-Schaltung**. Dieser Abschnitt gilt nicht. Wenn Ihr Produkt Akkubetrieb und Laden benötigt, verwenden Sie stattdessen die Serie SF32LB520/3/5/7.

##### 5.2.1.4. Verringerung der Standby-Leistungsaufnahme { #5214-reducing-standby-power }

=== "SF32LB520/3/5/7 (akkubetrieben)"

    Empfohlene Stromversorgungsstruktur: **VDD33_VOUT2** versorgt den Vibrationsmotor, **VDD33_VOUT1** versorgt externen Flash und Sensoren, und das LCD verwendet einen externen LDO.

    ![Abbildung 5.2-7: Versorgungsstruktur des SF32LB52x-Systems](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ width="100%" loading="lazy" }

    <div align="center"><em>Abbildung 5.2-7: Versorgungsstruktur des SF32LB52x-Systems</em></div>

    Legen Sie den hardwareseitigen Anfangszustand der GPIOs zur Lastschaltersteuerung sorgfältig fest. Verwenden Sie Pull-up-/Pull-down-Widerstände im Megaohm-Bereich, damit die Lastschalter standardmäßig ausgeschaltet sind. Wählen Sie bei der LDO- und Lastschalterauswahl Bauteile mit niedrigem Ruhestrom (Iq) und niedrigem Abschaltstrom (Istb), und achten Sie besonders auf Iq bei dauerhaft eingeschalteten Stromversorgungsbauteilen.

=== "52B/D/E/G/J (extern geregelt versorgt)"

    Verwenden Sie Lastschalter für das dynamische Power-Management jedes Funktionsblocks; wählen Sie für dauerhaft eingeschaltete Module oder Pfade Bauteile mit niedrigem Ruhestrom.

    Legen Sie den hardwareseitigen Anfangszustand der GPIOs zur Lastschaltersteuerung sorgfältig fest. Verwenden Sie Pull-up-/Pull-down-Widerstände im Megaohm-Bereich, damit die Lastschalter standardmäßig ausgeschaltet sind. Wählen Sie bei der LDO- und Lastschalterauswahl Bauteile mit niedrigem Ruhestrom (Iq) und niedrigem Abschaltstrom (Istb), und achten Sie besonders auf Iq bei dauerhaft eingeschalteten Stromversorgungsbauteilen.

##### 5.2.1.5. Checkliste Stromversorgungsdesign { #5215-power-design-checklist }

- [ ] Bestätigt, welche Stromversorgungsvariante (akkubetrieben / extern geregelte Versorgung) zum exakten Chipmodell passt
- [ ] Die BUCK-Induktivität erfüllt 4,7 µH ±20 %, DCR ≤0,4 Ω, Isat ≥450 mA
- [ ] Alle internen LDO-Entkopplungskondensatoren sind gemäß Anforderungen platziert
- [ ] Die LCD-Stromversorgung ist isoliert und wird nicht direkt vom internen LDO gespeist
- [ ] Audio- und RF-Versorgungen sind ordnungsgemäß gefiltert
- [ ] Bei der akkubetriebenen Variante: Ladepfad und Spannungsbereiche des OVP-Bauteils geprüft; bei der extern geregelten Variante: VDD_SIP-/VDDIOA-Versorgung korrekt für das Chipmodell konfiguriert

**Häufige Fehler - Stromversorgung**

- Das LCD wird direkt von einem internen LDO statt von einem externen LDO versorgt.
- Annahmen zur akkubetriebenen und zur extern geregelten Stromversorgung werden im selben Schaltplan vermischt.
- `VDD_SIP` bleibt während Hibernate bei Varianten eingeschaltet, bei denen ein Leckstromrisiko am Speicher besteht.
- Die Wahl eines Lade- oder OVP-Bauteils erfolgt, ohne den Worst-Case-VBUS-Strom und -Spannungsbereich zu prüfen.

**Inbetriebnahmeprüfungen - Stromversorgung**

- Messen Sie `VCC`/`PVDD`, den BUCK-Ausgang, RF-/Audio-Schienen und die Speicherversorgung, bevor die Firmware Peripherie aktiviert.
- Prüfen Sie bei akkubetriebenen Designs den Ladegeräteanschluss, die Vorladung, die Konstantstromladung und den erneuten Ladebeginn.
- Messen Sie den Standby- und Hibernate-Strom bei ausgeschalteten Lastschaltern für Display, Sensoren, Speicher und Motor.

#### 5.2.2. Betriebsmodi und Weckquellen { #522-operating-modes-and-wake-sources }

**Kurzübersicht**

- Active und Sleep ermöglichen eine schnelle Interrupt-Reaktion. DeepSleep und Standby senken den Stromverbrauch, benötigen aber mehr Zeit zum Aufwachen.
- Hibernate ist der Zustand mit dem niedrigsten Stromverbrauch, aber SRAM wird nicht erhalten und einige externe Versorgungen müssen abgeschaltet werden.
- Die Auswahl weckfähiger GPIOs beeinflusst Tasten, Touch-Interrupts, Ladeereignisse und das Weckverhalten von Sensoren.

**Entwurfsziel**

Wählen Sie Weckquellen und Anfangszustände der externen Lastschalter so, dass das Produkt den vorgesehenen Energiesparzustand ohne Leckstrompfade oder verpasste Weckereignisse erreicht.

!!! note "Gemeinsame Auslegung"
    Die Betriebsmodi und das Verhalten der Weckquellen gelten für die gesamte SF32LB52x-Familie, sofern eine produktspezifische Versorgungsstruktur nicht ausdrücklich eine externe Weckquelle deaktiviert.

<div align="center"><em>Tabelle 5.2-3: CPU-Modus-Tabelle</em></div>

<div align="center" markdown>

| Modus | CPU | Peripherie | SRAM | IO | LPTIM | Weckquelle | Weckzeit |
|:---|:---|:---|:---|:---|:---|:---|:---|
| Active | Läuft | Läuft | Zugänglich | Kann umschalten | Läuft | - | - |
| Sleep | Gestoppt | Läuft | Zugänglich | Kann umschalten | Läuft | Beliebiger Interrupt | <0,5 µs |
| DeepSleep | Gestoppt | Gestoppt | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft | RTC, Wake-up-IO, GPIO, LPTIM, Bluetooth | 250 µs |
| Standby | Reset | Reset | Nicht zugänglich, vollständig erhalten | Pegel gehalten | Läuft | RTC, Wake-up-IO, LPTIM, Bluetooth | 1 ms |
| Hibernate | Reset | Reset | Nicht zugänglich, nicht erhalten | Hochohmig | Reset | RTC, Wake-up-IO | >2 ms |

</div>

Die gesamte Familie unterstützt 15 weckfähige Interruptquellen in den Modi Standby und Hibernate:

<div align="center"><em>Tabelle 5.2-4: Interrupt-Weckquellen</em></div>

<div align="center" markdown>

| Weckquelle | Pin | Weckquelle | Pin |
|:---|:---|:---|:---|
| LWKUP_PIN0 | PA24 | LWKUP_PIN12 | PA36 |
| LWKUP_PIN1 | PA25 | LWKUP_PIN13 | PA37 |
| LWKUP_PIN2 | PA26 | LWKUP_PIN14 | PA38 |
| LWKUP_PIN3 | PA27 | LWKUP_PIN15 | PA39 |
| LWKUP_PIN10 | PA34 | LWKUP_PIN16 | PA40 |
| LWKUP_PIN11 | PA35 | LWKUP_PIN17 | PA41 |
| — | — | LWKUP_PIN18 | PA42 |
| — | — | LWKUP_PIN19 | PA43 |
| — | — | LWKUP_PIN20 | PA44 |

</div>

**Checkliste Betriebsmodi**

- [ ] Benötigte Weck-Pins sind zugewiesen, bevor das Pin-Mux eingefroren wird.
- [ ] Pull-Zustände an Weck-Pins sind mit Standby und Hibernate kompatibel.
- [ ] Externe Speicher- und Sensorversorgungen weisen im Hibernate-Modus keinen Leckstrom über I/O-Pins auf.
- [ ] Firmware- und Hardwareteams haben abgestimmt, welcher Zustand für Versand, Lagerung und normalen Standby verwendet wird.

### 5.3. Takterzeugung { #53-clock-generation }

#### 5.3.1. Quarzauswahl { #531-crystal-selection }

**Kurzübersicht**

- Verwenden Sie einen 48-MHz-Hauptquarz und einen 32,768-kHz-RTC-Quarz.
- Bevorzugen Sie Bauteile mit niedrigem CL und niedrigem ESR aus der AVL, um Startstrom und statischen Strom zu reduzieren.
- Halten Sie Quarzleiterbahnen kurz, abgeschirmt und entfernt von Wärme-, RF-, Lader-, PMU- und DC/DC-Störungen.

**Entwurfsziel**

Stabile, jitterarme Taktquellen bereitstellen und dabei Oszillatorstrom, Frequenzdrift, RF-Störungen und Inbetriebnahmerisiken minimieren.

Der Chip benötigt zwei externe Taktquellen: einen 48-MHz-Hauptquarz und einen 32,768-kHz-RTC-Quarz. Die Anforderungen sind für beide Varianten identisch.

!!! important "Anforderungen an die Quarzspezifikation"
    <div align="center"><em>Tabelle 5.3-1: Anforderungen an die Quarzspezifikation</em></div>

    <div align="center" markdown>

    | Quarz | Anforderung | Hinweise |
    |:---|:---|:---|
    | 48 MHz | 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), ΔF/F0 ≤ ±10 ppm, ESR ≤ 30 Ω (22 Ω empfohlen) | Niedrigeres CL und ESR verringern den Stromverbrauch; Anpasskondensatoren sind bei CL < 12 pF in der Regel nicht erforderlich |
    | 32,768 kHz | CL ≤ 12,5 pF (7 pF empfohlen), ΔF/F0 ≤ ±20 ppm, ESR ≤ 80 kΩ (38 kΩ empfohlen) | Niedrigeres CL und ESR verringern den Stromverbrauch; Anpasskondensatoren sind bei CL < 12,5 pF in der Regel nicht erforderlich |

    </div>

Empfohlene Quarze:

<div align="center"><em>Tabelle 5.3-2: Liste empfohlener Quarze</em></div>

<div align="center" markdown>

| Teilenummer | Hersteller | Parameter |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0=48 MHz, ΔF/F0=-6~8 ppm, CL=8,8 pF, ESR≤22 Ω, TOPR=-30~85 °C, 2016-Metrik-Gehäuse |
| SX20Y048000B31T-8.8 | TKD | F0=48 MHz, ΔF/F0=-10~10 ppm, CL=8,8 pF, ESR≤40 Ω, TOPR=-20~75 °C, 2016-Metrik-Gehäuse |
| ETST00327000LE | Hosonic | F0=32,768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85 °C, 3215-Metrik-Gehäuse |
| SF32K32768D71T01 | TKD | F0=32,768 kHz, ΔF/F0=-20~20 ppm, CL=7 pF, ESR≤70 kΩ, TOPR=-40~85 °C, 3215-Metrik-Gehäuse |

</div>

!!! note "Zusätzliche Hinweise"
    Der TKD SX20Y048000B31T-8.8 hat einen etwas höheren ESR, was den statischen Stromverbrauch geringfügig erhöht. Der Schaltplan-Anwendungshinweis von SiFli empfiehlt außerdem, mindestens die GND-Kupferfläche der zweiten Lage unter dem 48-MHz-Quarz zu entfernen, um die parasitäre Lastkapazität zu verringern. Der PCB-Layout-Leitfaden verbietet jedoch Masseflächen-Aussparungen oder Kupferfreistellungen unter dem Quarzbereich auf benachbarten Lagen. Die Empfehlungen widersprechen sich; siehe [Routing der Taktschnittstelle](SF32LB52x_pcb_layout.md#65-clock-interface-routing). Klären Sie mit SiFli, welche Lagenbehandlung gilt, bevor Sie das Layout freigeben.

!!! important "Abweichender Quarz-ESR in der Quelle"
    Die Quelle führt den TKD SX20Y048000B31T-8.8 mit ESR ≤ 40 Ω auf, obwohl die allgemeine Anforderung für 48 MHz ESR ≤ 30 Ω lautet. Prüfen Sie deshalb die Freigabe dieses konkreten Bauteils; daraus folgt keine allgemeine Zulässigkeit von 40-Ω-Quarzen. Bestätigen Sie vor der Projektfreigabe die aktuelle AVL-Zulassung der genauen Teilenummer und prüfen Sie Anschwingen, Frequenzkalibrierung und Oszillatorstrom.

!!! important "Abweichende 32,768-kHz-Quarzempfehlungen innerhalb der Quelle"
    Die Parameter-Tabelle der Quelle empfiehlt für 32,768 kHz CL = 7 pF und ESR = 38 kΩ; im Fließtext werden dagegen CL ≤ 9 pF und ESR ≤ 40 kΩ empfohlen. Beide Angaben stehen in der Quelle. Klären Sie vor der Freigabe mit SiFli den anzuwendenden Zielwert und die AVL-Freigabe des gewählten Quarzes.

Die vollständigen, laufend gepflegten Qualifizierungsdaten finden Sie in der [SiFli-Liste freigegebener Lieferanten][SiFli Approved Vendor List (AVL)].

**Häufige Fehler - Takt**

- Auswahl eines Quarzes nur nach Frequenz und Gehäuse, ohne Prüfung von CL, ESR, Toleranz und Temperaturbereich.
- Platzierung des Quarzes in der Nähe von PA, Lader, PMU, RF-Anpassung oder anderen Wärme-/Störquellen.
- Belassen von Kupfer oder Hochgeschwindigkeits-Routing unter dem Quarz-Sperrbereich.
- Lange, parallele 32-kHz-Leiterbahnen ohne Abstand oder Masseabschirmung.

**Checkliste Takt**

- [ ] Die 48-MHz- und 32,768-kHz-Quarze erfüllen die AVL-/Datenblattanforderungen.
- [ ] Quarz-Lastkapazität und ESR sind gegen die Oszillatorgrenzwerte geprüft.
- [ ] Freihaltebereich, Leiterbahnlänge, Leiterbahnbreite, Abstand und Masseabschirmung sind im PCB-Review geprüft.
- [ ] Der Inbetriebnahmeplan umfasst die Messung der 48-MHz- und 32-kHz-Takte sowie die Prüfung der Bluetooth-Frequenzkalibrierung.

---

Weiter zu [RF & Benutzerschnittstellen](SF32LB52x_schematic_rf_interfaces.md).

[SiFli Approved Vendor List (AVL)]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
