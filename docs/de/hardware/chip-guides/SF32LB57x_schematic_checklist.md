---
icon: lucide/list-checks
hide:
    - navigation
description: "Punkt-für-Punkt-Schaltplan-Checkliste für den SF32LB57x-MCU: Gehäuse, Versorgung, Takt, Speicher, RF, Display, Audio, Kamera, Tasten und Fertigungsprüfungen."
tags:
    - Hardware
    - Chip
    - Checkliste
---

# SF32LB57x Hardware-Design-Leitfaden — Schaltplan-Checkliste { #sf32lb57x-hardware-design-guide-schematic-checklist }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Diese Seite behandelt Abschnitt 5.8 mit den einzelnen Prüfpunkten für den Schaltplan, übernommen aus SiFlis offiziellen Tabellen zur Design-Selbstprüfung. Zurück zu [Minimalsystem und Stromversorgung](SF32LB57x_schematic_system_power.md), der ersten der drei Seiten mit Schaltplanrichtlinien.

## 5.8. Schaltplan-Checkliste { #58-schematic-checklist }

Jede Tabelle behandelt einen Funktionsblock des Schaltplans. Die Spalte „Gilt für“ kennzeichnet Prüfpunkte, die nur für batteriegespeiste oder mit 3,3 V versorgte Varianten gelten; mit „Alle Varianten“ markierte Punkte gelten für die gesamte Produktfamilie.

### 5.8.1. Gehäuse { #581-package }

<div align="center"><em>Tabelle 5.8.1-1: Gehäuse-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Schaltplan-Symbolbibliothek ist korrekt | Alle Varianten | |

</div>

### 5.8.2. Stromversorgung { #582-power-supply }

<div align="center"><em>Tabelle 5.8.2-1: Stromversorgungs-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Eingangsspannung an `VBUS` muss strikt im Bereich von 4,6 V bis 5,5 V gehalten werden | Akkubetriebene Varianten | |
| 2 | Das Laden über `VBAT` unterstützt Akkus mit einer Nennspannung von 4,2 V bis 4,45 V; der Vorladestrom beträgt 40 mA, der maximale Ladestrom 1C (400 mA) | Akkubetriebene Varianten | |
| 3 | Der Nennbetriebsbereich von `VCC` ist 3,45 V–4,7 V; 3,45 V ist die Hardware-Einschaltschwelle und 2,7 V die Hardware-Abschaltschwelle | Akkubetriebene Varianten | |
| 4 | `VSYS` ist eine interne dedizierte Versorgung — sie darf nur `AVDD_BRF` und das GPIO-Pull-up-Netzwerk versorgen; andere externe Peripheriegeräte dürfen nicht daraus versorgt werden | Akkubetriebene Varianten | |
| 5 | Die Last von `VDD33_VOUT1` ist auf den im Gehäuse integrierten Flash-Speicher, externen NOR-/NAND-Flash und `AVDD33_AUD` begrenzt — andere Peripheriegeräte dürfen nicht daraus versorgt werden. Der Laststrom beim Softstart darf 30 mA nicht überschreiten; nach vollständiger Aktivierung beträgt die Belastbarkeit 150 mA. | Akkubetriebene Varianten | |
| 6 | Die Softstart-Strombegrenzung von `VDD33_VOUT2` beträgt 30 mA; sobald sich die Spannung bei 3,3 V stabilisiert hat, kann die Schiene 150 mA liefern. Die Softstart-Begrenzung kann per Software deaktiviert werden. Prüfen Sie dann, ob der Einschaltstrom des angeschlossenen Peripheriegeräts mit der empfohlenen Belastbarkeit dieser Versorgungsschiene vereinbar ist | Akkubetriebene Varianten | |
| 7 | `AVDD_BRF` wird aus der `VSYS`-Domäne versorgt | Akkubetriebene Varianten | |
| 8 | `AVDD33_AUD` wird aus der `VDD33_VOUT1`-Domäne versorgt | Akkubetriebene Varianten | |
| 9 | Der Nennversorgungsbereich von `PVDD` ist 2,93 V–3,63 V, typische Standardbetriebsspannung 3,3 V | 3,3-V-Versorgungsvarianten | |
| 10 | Der Akkuspannungs-Messbereich von `VBATS` ist 0 V–4,5 V — diesen Bereich nicht überschreiten | 3,3-V-Versorgungsvarianten | |
| 11 | `AVDD_BRF` wird aus einer externen 3,3-V-Quelle versorgt | 3,3-V-Versorgungsvarianten | |
| 12 | `AVDD33_AUD` wird aus einer externen 3,3-V-Quelle versorgt | 3,3-V-Versorgungsvarianten | |
| 13 | `AVDD33_ANA` wird aus einer externen 3,3-V-Quelle versorgt | 3,3-V-Versorgungsvarianten | |
| 14 | Der Eingangsversorgungsspannungsbereich von `VDDIOA` hängt von der genauen bestellbaren Teilenummer ab — die Teilenummernbeschreibung im Datenblatt prüfen | 3,3-V-Versorgungsvarianten | |
| 15 | Bei der Akkuspannungsmessung ist zu beachten, dass der Chip bereits einen internen GPADC-Kanal mit `VBAT`/`VBATS` verbindet. Weisen Sie dieses Signal daher keinem weiteren GPADC-Kanal zu | Alle Varianten | |
| 16 | Die `BUCK_LX`-/`BUCK_FB`-Verdrahtung folgt strikt der Hardware-Design-Spezifikation des Chips | Alle Varianten | |
| 17 | `VDD18_VOUT` dient ausschließlich der Versorgung des im Gehäuse integrierten PSRAM — niemals für externe 1,8-V-Peripheriegeräte verwenden | Alle Varianten | |
| 18 | `GPADC_VREF` akzeptiert nur einen externen Kondensator — niemals eine externe Spannung | Alle Varianten | |
| 19 | `AUD_VREF` akzeptiert nur einen externen Kondensator — niemals eine externe Spannung | Alle Varianten | |

</div>

!!! warning "Abweichungen in der Originalquelle"
    Die ursprüngliche Selbstprüftabelle nennt für `PVDD` eine Untergrenze von 2,93 V und für `VBATS` eine Obergrenze von 4,5 V; die Gehäuse-Versorgungstabellen nennen dagegen 2,97 V bzw. 4,7 V. Diese Seite behält die Werte der Selbstprüftabelle bei. Beide Abweichungen für die genaue bestellbare Teilenummer mit SiFli klären; die größeren Bereiche nicht zur Designfreigabe verwenden.

    Der Referenzschaltplan nennt außerdem 3,2 V–4,7 V für `VCC` und Flash sowie Sensoren als Lasten von `VDD33_VOUT1`. Das weicht von der Untergrenze 3,45 V und dem Verbot weiterer Peripherielasten oben ab. Die Tabellengrenzen beibehalten; Spannungsbereich und Lastumfang nicht anhand der Schaltplanbeschriftungen erweitern.

    An anderer Stelle nennt der Fließtext einen `VBUS`-Eingangsbereich von 4,5 V–5,5 V und einen Ausgangsbereich von 4,5 V–5,4 V für OVP-Bauteile mit integriertem LDO. Die Selbstprüftabelle nennt dagegen 4,6 V–5,5 V beziehungsweise 4,7 V–5,4 V. Diese Seite behält die Tabellenwerte bei. Die geltenden Grenzwerte vor der Designfreigabe für das konkrete Gerät und mit SiFli klären.

    Der Titel von Punkt 25 der ursprünglichen Selbstprüftabelle bezieht sich auf den Kondensator `VDD33_VOUT2`; im Detailtext wird jedoch irrtümlich `VDD33_VOUT1` genannt, das bereits in Punkt 24 geprüft wird. Diese Seite folgt dem Titel von Punkt 25. Die gemeinte Versorgungsschiene mit SiFli klären.

### 5.8.3. Stromversorgungskondensatoren und -induktivitäten { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Tabelle 5.8.3-1: Checkliste für Stromversorgungskondensatoren und -induktivitäten</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | `VBUS`-Kondensator ≥10 µF/10 V, nahe am Pin platziert | Akkubetriebene Varianten | |
| 2 | `VBAT`-Kondensator ≥4,7 µF/10 V, nahe am Pin platziert | Akkubetriebene Varianten | |
| 3 | `VCC`-Kondensator ≥10 µF/10 V, nahe am Pin platziert | Akkubetriebene Varianten | |
| 4 | `VSYS`-Kondensator = 2,2 µF/6,3 V; Gesamtkapazität auf dieser Domäne ≤9,6 µF, nahe am Pin platziert | Akkubetriebene Varianten | |
| 5 | `VDD33_VOUT1`-Kondensator = 2,2 µF/6,3 V; Gesamtkapazität auf dieser Domäne ≤9,6 µF, nahe am Pin platziert | Akkubetriebene Varianten | |
| 6 | `VDD33_VOUT2`-Kondensator = 2,2 µF/6,3 V; Gesamtkapazität auf dieser Domäne ≤9,6 µF, nahe am Pin platziert | Akkubetriebene Varianten | |
| 7 | `PVDD`-Kondensator ≥10 µF/6,3 V, nahe am Pin platziert | 3,3-V-Versorgungsvarianten | |
| 8 | `VBATS`-Kondensator = 0,1 µF/10 V zur Entkopplung, nahe am Pin platziert | 3,3-V-Versorgungsvarianten | |
| 9 | `VDDIOA`-Kondensator = 4,7 µF/6,3 V, nahe am Pin platziert | 3,3-V-Versorgungsvarianten | |
| 10 | `AVDD33_ANA`-Kondensator = 1 µF/6,3 V, nahe am Pin platziert | 3,3-V-Versorgungsvarianten | |
| 11 | `BUCK_FB`-Kondensator = 4,7 µF, zwischen Induktivität und Chip-Pin platziert | Alle Varianten | |
| 12 | `VDD_VOUT1`-Kondensator = 4,7 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 13 | `VDD_VOUT2`-Kondensator = 4,7 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 14 | `VDD_RET`-Kondensator = 0,47 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 15 | `VDD_RTC`-Kondensator = 1 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 16 | `MIC_BIAS`-Kondensator = 1 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 17 | `AVDD_BRF`-Kondensator = 4,7 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 18 | `AVDD33_AUD`-Kondensator = 2,2 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 19 | `AUD_VREF`-Kondensator = 1 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 20 | `GPADC_VREF`-Kondensator = 4,7 µF/6,3 V, nahe am Pin platziert | Alle Varianten | |
| 21 | Eine BUCK-Induktivität aus der [SiFli-Liste freigegebener Lieferanten](../cad-components/sifli-approved-vendor-list.md) wird bevorzugt; wird ein anderes Bauteil verwendet, muss es L = 4,7 µH, DCR ≤0,4 Ω und Isat ≥450 mA erfüllen | Alle Varianten | |
| 22 | Bei Produkten mit GPS oder anderen störungsempfindlichen Peripheriegeräten ist an `BUCK_LX` eine Lötfläche für einen parallel gegen Masse geschalteten Kondensator unter 100 pF vorzusehen; der endgültige Wert wird durch EMV-Tests am Gesamtgerät festgelegt | Alle Varianten | |

</div>

### 5.8.4. Laden und OVP { #584-charging-and-ovp }

<div align="center"><em>Tabelle 5.8.4-1: Checkliste für Laden und OVP</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Ladeeingangsschnittstelle verfügt über eine OVP-Überspannungsschutzschaltung | Akkubetriebene Varianten | |
| 2 | Soll sich das Display unmittelbar nach dem Anschließen des Ladegeräts einschalten, darf der interne Lader nicht verwendet werden. Stattdessen ist ein externer Lade-IC mit Power-Path-Management erforderlich | Akkubetriebene Varianten | |
| 3 | Der interne Lader wird nur dort eingesetzt, wo es akzeptabel ist, dass sich das Display erst per Software einschaltet, nachdem der Akku auf 3,6 V geladen wurde | Akkubetriebene Varianten | |
| 4 | Ein OVP-Bauteil mit integriertem LDO-Ausgang (z. B. `LP5305AQVF`) wird empfohlen: LDO-Ausgang 4,7 V–5,4 V, Lastfähigkeit ≥0,5 A, Überstromschutz-Auslösepunkt ≥0,7 A | Akkubetriebene Varianten | |
| 5 | Wird ein OVP-Bauteil mit einstellbarer OVLO verwendet, sind die Teiler-Widerstände mit 1 % Toleranz auszulegen, der OVLO-Schwellenfehler unter 3 % zu halten und der Einstellbereich auf 5,15 V–5,55 V zu setzen | Akkubetriebene Varianten | |
| 6 | Wird der interne Lader nicht genutzt, kann `VBUS` offen bleiben und dessen externer Kondensator entfallen; `VBAT` kann dann keine externe Last versorgen | Akkubetriebene Varianten | |

</div>

### 5.8.5. Stromverbrauch { #585-power-consumption }

<div align="center"><em>Tabelle 5.8.5-1: Checkliste zum Stromverbrauch</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Spannungsregler (LDO/DC-DC) verwenden einen bei High-Pegel aktiven EN-Pin. Soll der Ausgang standardmäßig ausgeschaltet sein, ziehen Sie EN über einen auf den Strombedarf des Gesamtgeräts abgestimmten Widerstand von 1 MΩ bis 5,1 MΩ auf Low | Alle Varianten | |
| 2 | MOSFET-Stromschalter verwenden eine PMOS+NMOS-Topologie; der Steuerpin ist high-aktiv (ein) / low-aktiv (aus) und über einen festen 1-MΩ-Pull-down mit Masse verbunden | Alle Varianten | |
| 3 | Der Stromschalter für externe Boot-Medien wird ausschließlich über `PA21` gesteuert | Alle Varianten | |
| 4 | Wird `VSYS` als Versorgung für GPIO-Pull-ups genutzt, ist der kontinuierliche statische Strom zu ermitteln. Bestätigen Sie, dass er das Energiesparziel des Gesamtgeräts erfüllt | Akkubetriebene Varianten | |
| 5 | Wird LDO2 oder LDO3 als GPIO-Pull-up-Schiene genutzt, ist dessen Abschaltszenario bewertet, um sicherzustellen, dass kein Leckstrom oder abnormaler IO-Pegel auftritt | Akkubetriebene Varianten | |
| 6 | Die I2C-Pull-up-Versorgung schaltet zusammen mit der IO-Domänenversorgung des entsprechenden Peripheriegeräts ein und aus, um Leckströme im Schlafmodus zu verhindern | Alle Varianten | |
| 7 | Es ist bestätigt, dass der maximale statische Gesamtstrom des Geräts im Deep-Sleep-Modus der Projektspezifikation entspricht | Alle Varianten | |
| 8 | Der statische Gesamtstrom aller Peripheriegeräte im Deep-Sleep-Modus ist erfasst und erfüllt das Stromverbrauchsziel des Projekts | Alle Varianten | |
| 9 | Es ist bestätigt, dass der maximale statische Gesamtstrom des Geräts im Standby-Modus der Projektspezifikation entspricht | Alle Varianten | |
| 10 | Der statische Gesamtstrom aller Peripheriegeräte im Standby-Modus ist erfasst und erfüllt das Stromverbrauchsziel des Projekts | Alle Varianten | |

</div>

### 5.8.6. Takt { #586-clock }

<div align="center"><em>Tabelle 5.8.6-1: Takt-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Der 48-MHz-Hauptquarz hat eine Teilenummer aus der [SiFli-Liste freigegebener Lieferanten](../cad-components/sifli-approved-vendor-list.md) (AVL) | Alle Varianten | |
| 2 | Ist der 48-MHz-Quarz nicht AVL-gelistet, erfüllt er 7 pF ≤ CL ≤ 12 pF (8,8 pF empfohlen), Frequenztoleranz ≤±10 ppm, ESR ≤30 Ω (22 Ω empfohlen) | Alle Varianten | |
| 3 | Der 32,768-kHz-RTC-Quarz ist eine auf der AVL gelistete Teilenummer | Alle Varianten | |
| 4 | Ist der 32,768-kHz-Quarz nicht AVL-gelistet, erfüllt er CL = 7 pF oder 11,5 pF (7 pF empfohlen), Frequenztoleranz ≤±20 ppm, ESR ≤80 kΩ (38 kΩ empfohlen) | Alle Varianten | |

</div>

### 5.8.7. Speicher und Boot { #587-storage-and-boot }

<div align="center"><em>Tabelle 5.8.7-1: Checkliste für Speicher und Boot</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Externes SPI-NOR-Flash an MPI3: `PA13` (MPI D1) und `PA17` (MPI D3) benötigen keinen Pull-up | Alle Varianten | |
| 2 | Externes SPI-NAND-Flash an MPI3: `PA13` (MPI D1) benötigt keinen Pull-up; `PA17` (MPI D3) benötigt einen 7,5-kΩ-Pull-up | Alle Varianten | |
| 3 | Externes SD-NAND-Flash an MPI3: `PA13` (SD D3) und `PA15` (SD CMD) benötigen 7,5-kΩ-Pull-ups; `PA17` (SD D1) benötigt keinen Pull-up | Alle Varianten | |
| 4 | Externes eMMC an MPI3: `PA13` (SD D3), `PA17` (SD D1) und `PA15` (SD CMD) benötigen jeweils 7,5-kΩ-Pull-ups | Alle Varianten | |
| 5 | Ist der im Gehäuse integrierte Speicher bereits an MPI3 angeschlossen, ist die externe MPI3-Nutzung auf SD NAND / eMMC beschränkt — kein externes SPI-NOR-/SPI-NAND-Flash anschließen | Alle Varianten | |
| 6 | Stromsteuerung des externen MPI3-Speichers: SPI-NOR-Flash kann dauerhaft versorgt sein; SPI-NAND/SD-NAND/eMMC benötigen eine Stromschaltsteuerung; für das Booten von externem Medium ist die Speicherversorgung standardmäßig eingeschaltet | Alle Varianten | |
| 7 | Die ausgewählte externe Speicher-Teilenummer ist auf der AVL des Projekts gelistet | Alle Varianten | |
| 8 | Der Betriebsspannungsbereich des Speicherbauteils stimmt mit dem IO-Versorgungspegel des Hauptchips überein | Alle Varianten | |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Tabelle 5.8.8-1: RF-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die ANT-Signalleitung ist ausdrücklich mit der Vorgabe einer charakteristischen Impedanz von 50 Ω in unsymmetrischer Signalführung gekennzeichnet | Alle Varianten | |
| 2 | Die Signalkette reserviert ein PI-Anpassnetzwerk mit NC-Kondensatoren an den Shunt-Positionen und einem 15-pF-Kondensator an der Serienposition (Endwerte werden auf der Hardware abgestimmt) | Alle Varianten | |

</div>

### 5.8.9. Display { #589-display }

<div align="center"><em>Tabelle 5.8.9-1: Display-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Für Displays mit QSPI-Schnittstelle sind die dedizierten Pins mit Funktion 1 in der Gruppe `PA00`–`PA08` zu bevorzugen | Alle Varianten | |
| 2 | Ein Display mit RGB-Schnittstelle kann bei normalen Signalraten jedes GPIO nutzen; oberhalb von 30 MHz sind die Pins auf `PA22`–`PA50` und `PA52`–`PA54` (nur `B1`–`B6`) begrenzt | Alle Varianten | |
| 3 | Ein Display mit MCU-8080-Schnittstelle folgt derselben Pin-Zuweisungsregel wie RGB; Hochgeschwindigkeitsszenarien sind auf `PA22`–`PA50` und `PA52`–`PA54` begrenzt | Alle Varianten | |
| 4 | Ein EPD-E-Paper-Display folgt derselben Pin-Zuweisungsregel wie RGB; Hochgeschwindigkeitsszenarien sind auf `PA22`–`PA50` und `PA52`–`PA54` begrenzt | Alle Varianten | |
| 5 | Display und Hintergrundbeleuchtung haben einen hohen Stromverbrauch; deshalb ist eine schaltbare Stromversorgung vorzusehen. Außer bei Always-on-Display-Konzepten müssen Display und Hintergrundbeleuchtung nach dem Einschalten standardmäßig ausgeschaltet sein | Alle Varianten | |
| 6 | Der Betriebsspannungsbereich von Display und Touch-Bauteil stimmt mit dem IO-Domänen-Versorgungspegel des Hauptchips überein | Alle Varianten | |

</div>

### 5.8.10. Audio { #5810-audio }

<div align="center"><em>Tabelle 5.8.10-1: Audio-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Verdrahtung von Signal, Bias und weiteren Pins des MEMS-Mikrofons entspricht der Hardware-Design-Spezifikation | Alle Varianten | |
| 2 | Das MEMS-Mikrofon nutzt `MIC_BIAS` des Chips als Bias-Versorgung | Alle Varianten | |
| 3 | Die Verdrahtung von Signal, Bias und weiteren Pins des unsymmetrischen analogen ECM-Mikrofons (single-ended) entspricht der Hardware-Design-Spezifikation | Alle Varianten | |
| 4 | Das unsymmetrische analoge ECM-Mikrofon (single-ended) nutzt `MIC_BIAS` des Chips als Bias-Versorgung | Alle Varianten | |
| 5 | Jeder Audio-ADC-Eingangskanal hat einen seriellen Koppelkondensator von mindestens 2,2 µF | Alle Varianten | |
| 6 | `DACP`/`DACN` erhalten jeweils einen 1-kΩ-Serienwiderstand nahe am Chip, mit einem 1,5-nF-Kondensator parallel zwischen beiden Signalen | Alle Varianten | |
| 7 | Der mit `ADC1P` geteilte Pin `PA55` wird als hochohmiger Eingang konfiguriert, wenn `ADC1P` aktiviert ist, um Funktionskonflikte oder Signalprobleme zu vermeiden | Alle Varianten | |
| 8 | Der mit `ADC2P` geteilte Pin `PA10` wird als hochohmiger Eingang konfiguriert, wenn `ADC2P` aktiviert ist, um Funktionskonflikte oder Signalprobleme zu vermeiden | Alle Varianten | |
| 9 | Der mit `MICBIAS` geteilte Pin `PA56` wird als hochohmiger Eingang konfiguriert, wenn `MICBIAS` aktiviert ist, um Pinfunktionskonflikte zu verhindern, die zu Leckstrom oder Schaltungsfehlern führen könnten | Alle Varianten | |

</div>

### 5.8.11. Kamera { #5811-camera }

<div align="center"><em>Tabelle 5.8.11-1: Kamera-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Verdrahtung von Signal, Strom und weiteren Pins der Kamera entspricht der Hardware-Design-Spezifikation | Alle Varianten | |
| 2 | Die Kernversorgung jedes Kameramodells erfüllt die Anforderungen des jeweiligen Datenblatts | Alle Varianten | |

</div>

### 5.8.12. Tasten { #5812-buttons }

<div align="center"><em>Tabelle 5.8.12-1: Tasten-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Anhand des Produktplans ist bestätigt, ob eine Taste Hardware-Weckfähigkeit benötigt; die passende Schaltung und Softwarekonfiguration sind umgesetzt | Alle Varianten | |
| 2 | Die normale Tasten-Pull-up-Schaltung verwendet einen korrekt gewählten Widerstandswert und eine Pull-up-Spannungsdomäne, die zur IO-Versorgungsdomäne passt | Alle Varianten | |
| 3 | Die Ein-/Aus- und Reset-Taste verwendet `PA34` und ist high-aktiv. Ein 10 Sekunden langer Tastendruck löst einen Hardware-Reset aus. Auf der Platine ist ein Pull-down-Widerstand von 10 kΩ vorzusehen | Alle Varianten | |
| 4 | Jedes Tasteneingangssignal hat ein passendes ESD-Schutzbauteil nahe der Taste | Alle Varianten | |

</div>

### 5.8.13. UART { #5813-uart }

<div align="center"><em>Tabelle 5.8.13-1: UART-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die UART-Verdrahtung folgt der Kreuzverdrahtungsregel: MCU RXD verbindet sich mit Peripherie-TXD, MCU TXD mit Peripherie-RXD | Alle Varianten | |
| 2 | Während des MCU-Resets ist das externe Peripheriegerät an `PA35`/`PA36` (UART-multiplext) abgeschaltet, oder die Software zieht `PA35`/`PA36` auf Low, damit abnormale Pegel keine unbeabsichtigte Reaktion des Peripheriegeräts auslösen | Alle Varianten | |
| 3 | Der IO-Betriebsspannungsbereich des angeschlossenen UART-Geräts stimmt mit der entsprechenden IO-Domäne des Hauptchips überein | Alle Varianten | |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Tabelle 5.8.14-1: I2C-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | SDA und SCL haben Pull-up-Widerstände (2,2 kΩ bei 400 kHz empfohlen); die Pull-up-Spannungsdomäne wird von der Peripherieseite versorgt, sodass sie zusammen mit dem Peripheriegerät abschaltet | Alle Varianten | |
| 2 | Es ist geklärt, ob der zugehörige I2C-Interrupt-Pin zum Wecken benötigt wird; der Pin ist entsprechend konfiguriert | Alle Varianten | |
| 3 | Beschleunigungssensoren, Herzfrequenzsensoren, Magnetometer und ähnliche I2C-Sensoren unterstützen das Auslesen aller Register in einem einzigen zusammenhängenden Burst-Lesevorgang | Alle Varianten | |
| 4 | Jedes Gerät an einem gemeinsamen I2C-Bus hat eine eindeutige Slave-Adresse ohne Konflikte | Alle Varianten | |

</div>

### 5.8.15. SPI { #5815-spi }

<div align="center"><em>Tabelle 5.8.15-1: SPI-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die SPI-Verdrahtung folgt der Kreuzverdrahtungsregel: Host-SDO zu Peripherie-SDI, Host-SDI zu Peripherie-SDO; CLK und CS werden direkt verbunden | Alle Varianten | |
| 2 | Die vom Host konfigurierte Taktfrequenz, -phase und -polarität stimmen vollständig mit der Spezifikation des Peripheriegeräts überein | Alle Varianten | |
| 3 | Der IO-Betriebsspannungsbereich des Peripheriegeräts stimmt mit der entsprechenden IO-Domäne des Hauptchips überein | Alle Varianten | |

</div>

### 5.8.16. GPADC { #5816-gpadc }

<div align="center"><em>Tabelle 5.8.16-1: GPADC-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | GPADC-Eingangssignale werden ausschließlich den 11 GPADC-fähigen Pins `PA28`–`PA38` zugewiesen | Alle Varianten | |
| 2 | Die analoge Spannung an jedem GPADC-Kanal bleibt innerhalb des Nennbereichs 0 V–3,3 V | Alle Varianten | |
| 3 | Spannungsteilerbasierte Abtastkanäle verwenden 1-%-Widerstände; jeder GPADC-Eingang hat einen 100-nF-Filterkondensator nahe am Chip-Pin | Alle Varianten | |

</div>

### 5.8.17. USB { #5817-usb }

<div align="center"><em>Tabelle 5.8.17-1: USB-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Verdrahtung von USB-Differenzsignal-, Strom- und Massepins folgt der USB-Hardware-Design-Spezifikation, ohne Vertauschung oder Kurzschlüsse | Alle Varianten | |
| 2 | USB-Datenleitungen, `VBUS` und weitere Schlüsselpins verfügen über ESD-Schutzbauteile, die die ESD-Spezifikation des Gesamtgeräts erfüllen | Alle Varianten | |
| 3 | Solange sich der MCU nicht im Schlafmodus befindet, bleibt USB aktiviert, damit Ein-/Ausstecken normal über das USB-Protokoll erkannt wird | Alle Varianten | |
| 4 | Soll das Einstecken von USB auch im Schlafmodus erkannt werden, speist eine `VBUS`-Spannungsteilerschaltung einen IO-kompatiblen Pegel in einen Pin mit Hardware-Weckfunktion ein. Dieser Pin sollte möglichst auch zur Erkennung des Ladegeräts dienen | Alle Varianten | |
| 5 | Der mit `USB_DP` geteilte Pin `PA35` wird als hochohmiger Eingang konfiguriert, wenn `USB_DP` aktiviert ist | Alle Varianten | |
| 6 | Der mit `USB_DM` geteilte Pin `PA36` wird als hochohmiger Eingang konfiguriert, wenn `USB_DM` aktiviert ist | Alle Varianten | |

</div>

### 5.8.18. Externe Hardware-Weckfunktion { #5818-external-hardware-wake }

<div align="center"><em>Tabelle 5.8.18-1: Checkliste für externe Hardware-Wecksignale</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Externe hardwareseitige Weckinterrupts nutzen ausschließlich die 10 GPIOs im Bereich `PA33`–`PA42` | Alle Varianten | |

</div>

### 5.8.19. Debug und Download { #5819-debug-and-download }

<div align="center"><em>Tabelle 5.8.19-1: Checkliste für Debug und Download</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | `PA18` (RXD) und `PA19` (TXD) bilden die standardmäßige DBG-UART-Schnittstelle für Download und Debugging; die korrekte Zuordnung von TXD und RXD ist bestätigt | Alle Varianten | |
| 2 | `PA43`/`PA44`, die Standard-SWD-Debug-/Download-Pins, haben lötbare Testpunkte für Programmierung und Debugging reserviert | Alle Varianten | |
| 3 | `PA00`, der Boot-Modus-Auswahl-Pin, hat einen reservierten Pull-up-Widerstand und einen passenden Testpunkt | Alle Varianten | |
| 4 | Für `PA01`, den Umschalter für die SWD-Pinposition, sind je nach Produktdesign bei Bedarf ein Pull-up-Widerstand und ein Testpunkt vorgesehen | Alle Varianten | |

</div>

### 5.8.20. EOS und ESD { #5820-eos-and-esd }

<div align="center"><em>Tabelle 5.8.20-1: Checkliste für EOS und ESD</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Die Ladeschnittstelle verfügt über einen vollständigen Satz EOS-Überspannungs-, ESD- und OVP-Schutzbauteile | Alle Varianten | |
| 2 | Die Strom- und Signalpins der Akkuschnittstelle verfügen über ESD-Schutzbauteile | Alle Varianten | |
| 3 | Der RF-Antennensignalpin verfügt über ein dediziertes ESD-Schutzbauteil | Alle Varianten | |
| 4 | Die Versorgungspins von LCD und Touch-Panel verfügen über ESD-Schutzbauteile | Alle Varianten | |
| 5 | Der I2C-Bus, `RST` und `INT` des Touch-Panels verfügen alle über ESD-Schutzbauteile | Alle Varianten | |
| 6 | Der Versorgungspin und jeder Signalübertragungspin des Herzfrequenzmoduls verfügen über ESD-Schutzbauteile | Alle Varianten | |

</div>

### 5.8.21. Fertigungslinie { #5821-production-line }

<div align="center"><em>Tabelle 5.8.21-1: Checkliste zur Fertigungslinie</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt | Gilt für | Bestätigt (Ja/Nein) |
|:---|:---|:---|:---|
| 1 | Programm-Download-/Debug-Testpunkte reservieren `VBAT` oder 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (nicht anwendbar bei 3,3-V-Versorgungsvarianten) und `PA34` | Akkubetriebene Varianten | |
| 2 | Die Anordnung jedes reservierten Testpunkts ermöglicht die manuelle Prüfung mit einer Prüfsonde und das Handlöten, ohne Hindernisse oder überfüllte Leiterführung | Alle Varianten | |
| 3 | Die für die Produktionsprüfvorrichtung vorgesehenen Testpunkte (`VBAT` oder 3,3 V, `GND`, `PA18`, `PA19`, gegebenenfalls `VDD33_VOUT1`, `PA00`, `PA01`, `PA34`) müssen Pad-Größe, Abstand und Ausrichtung der Prüfvorrichtung entsprechen | Alle Varianten | |

</div>
