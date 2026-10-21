---
icon: lucide/component
description: "SiFlis Approved Vendor List für SF32-Designs: qualifizierte Quarze, Induktivitäten, NOR-/NAND-Flash und LCD-Treiber, mit Auswahlkriterien und Stücklisten-Prüfliste."
tags:
    - Hardware
    - Lieferanten
    - AVL
---

# Freigegebene Lieferantenliste für SF32 { #sf32-approved-vendor-list }

## Wofür diese Liste dient { #what-this-list-is-for }

Die **freigegebene Lieferantenliste (Approved Vendor List, AVL)** dokumentiert die von SiFli qualifizierten Bauteile für SF32-Designs. V0.3 führt Quarze, Induktivitäten für Buck-Wandler, NOR-/NAND-Flash, SD-NAND und einen LCD-Treiber auf; das Tabellenblatt für Touch-Controller enthält keine Einträge. Nutzen Sie die Liste zur Vorauswahl geeigneter Bauteile und möglicher Zweitquellen. Prüfen Sie anschließend das konkrete Bauteil im vorgesehenen Produkt: auf der Platine, mit der Firmware, im Gehäuse sowie unter den geplanten Fertigungs- und Lieferkettenbedingungen. Die Aufnahme in die AVL ersetzt keine Produktvalidierung.

Diese Seite basiert direkt auf SiFlis offizieller AVL-Tabelle, **`SIFLI-MCU-AVL-认证表`, Version V0.3 (2026-01-21)**. Da die AVL mit der Qualifizierung neuer Bauteile aktualisiert werden kann, bildet diese Seite den datierten Stand V0.3 ab und ist keine Live-Datenbank. Diese Prüfung bestätigt nur den Inhalt von V0.3; sie belegt nicht, dass ein Bauteil in einer späteren AVL-Fassung weiterhin freigegeben ist. Prüfen Sie vor der endgültigen Festlegung einer Stückliste die aktuelle Quelldatei:

<div class="grid cards" markdown>

- :fontawesome-solid-file-excel: __[SiFli freigegebene Lieferantenliste (AVL): V0.3 .xlsx herunterladen](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx)__
- :fontawesome-solid-globe: __[SiFli Wiki — Hardware-Design-Leitfäden und Downloads](https://wiki.sifli.com/en/hardware/index.html)__

</div>

!!! note "So verwenden Sie diese Liste"
    Die Quelle nennt allgemeine Anforderungen an Quarze und Buck-Induktivitäten; die übrigen Tabellen enthalten überwiegend Daten zu einzelnen Bauteilen. Prüfen Sie Kandidaten anhand dieser Anforderungen, ohne vorauszusetzen, dass jedes gelistete Bauteil alle allgemeinen Grenzwerte erfüllt. Abweichungen in der Quelle werden unten erläutert. Vollständig leere Spalten, etwa zur Unterstützung durch Flash-Download-Tools, sind weggelassen; daraus lässt sich keine Unterstützung ableiten. Ein Gedankenstrich (—) in den Detailtabellen bedeutet in der Regel, dass V0.3 für dieses Feld keinen Wert enthält. In den DTR-Taktfeldern für NOR-Flash steht er dagegen für den Quelleintrag „nicht unterstützt“; siehe den Hinweis zu NOR-Flash.

Prüfen Sie die Bauteilauswahl für Ihre Stückliste in drei Schritten, statt nur eine Teilenummer auszuwählen:

1. **Vorauswahl anhand der Anforderungen.** Stimmen Sie Kapazität, Versorgungsspannung, Gehäuse und die Anforderungen der jeweiligen Bauteilart (Lastkapazität bei Quarzen, DCR/Isat bei Induktivitäten, SDR-/DTR-Takt bei Flash) auf Schaltplan und Leistungsbudget ab.
2. **Prüfen Sie auch Randbedingungen, die sich nicht aus einem einzelnen Datenblattwert ergeben.** Bestätigen Sie den Temperaturbereich für die Betriebs- und Lagerumgebung des Produkts, die genaue von der Firmware erwartete Hersteller-/JEDEC-ID sowie, ob OTA-, Dateisystem- oder Download-Tool-Unterstützung mit genau diesem Bauteil und nicht nur mit einem anderen Bauteil derselben Familie getestet wurde.
3. **Validieren Sie auf realer Hardware vor der Serienfertigung.** Messen Sie die Stromaufnahme im Standby und im aktiven Betrieb auf Ihrer Platine. Prüfen Sie die RF-Kalibrierung des Quarzes erneut mit der endgültigen Leiterplatte und dem Gehäuse, und ermitteln Sie für jedes Bauteil mit nur einem Lieferanten mindestens eine Zweitquelle.

## Abdeckung im Überblick { #coverage-at-a-glance }

<div align="center"><em>Tabelle: Abdeckung im Überblick</em></div>

<div align="center" markdown>

| Kategorie | Qualifizierte Bauteile | Wichtigste Auswahlkriterien |
|:---|---:|:---|
| 48-MHz-Quarze | 10 | Lastkapazität, Frequenztoleranz, ESR, Anlaufzeit, CBANK-Kalibrierung, Bluetooth-Frequenzversatz |
| 32,768-kHz-Quarze | 5 | Lastkapazität, Frequenztoleranz, ESR, Gehäuse, Betriebstemperatur |
| Buck-Induktivitäten | 8 | 4,7-µH-Wert, DCR, Sättigungsstrom (Isat), Nennstrom (Irms), SRF, Kompatibilität mit dem 2016-Gehäuse |
| NOR-Flash | 44 | Kapazität, Versorgungsspannung, SDR-/DTR-Takt, Angegebene ID, Standby-/Deep-Power-Down-Strom |
| SPI-NAND-Flash | 18 | Kapazität, ECC-Modus, Seiten-/Block-Geometrie, Golden Block, Standby-/Lese-/Programmierströme |
| SD-NAND-Flash | 5 | SD-2.0-Kompatibilität, 50-MHz-Betrieb, Standby-Strom, Betriebstemperaturbereich |
| LCD-Treiber | 1 | Ein Bauteil aufgeführt; Panel-Timing, Treiberunterstützung und Schnittstellenmodus vor der Freigabe prüfen |
| Touch-Panel-Controller | 0 | Keine Einträge in V0.3; Qualifizierung und Treiberunterstützung separat bestätigen |

</div>

Diese Übersicht zeigt den Umfang von V0.3. Display- und Touch-Bauteile erfordern besondere Aufmerksamkeit, da diese Version nur einen LCD-Treiber und keine Touch-Controller enthält. Klären Sie das gewählte Bauteil mit SiFli und validieren Sie es im Produkt. Auch eine Aufnahme in spätere AVL-Versionen ersetzt diese Prüfung nicht.

## Revisionshistorie { #revision-history }

<div align="center"><em>Tabelle: Revisionshistorie</em></div>

<div align="center" markdown>

| Version | Datum | Autor | Änderung |
|:--------|:-----|:-------|:-------|
| V0.1 | 2023-12-29 | yzli | Erstveröffentlichung. |
| V0.2 | 2025-07-16 | yzli | Huilun- und JWT (晶威特)-48-MHz-Quarze hinzugefügt. |
| V0.3 | 2026-01-21 | yzli | UCUN-NOR-Flash hinzugefügt: UC25WQ80IB, UC25IQ32A, UC25IQ64A, UC25IQ128A. |

</div>

---

## Quarze { #crystal-oscillators }

Die AVL enthält 48-MHz-Systemquarze und 32,768-kHz-RTC-Quarze. Prüfen Sie die Anforderungen an die Taktquellen im Designleitfaden des genauen SF32-Geräts und wählen Sie anhand von Lastkapazität, Frequenztoleranz, ESR, Anlaufverhalten und Leistungsbudget. Die Qualifizierungstabellen legen nicht für alle SF32-Produkte dieselbe zwingende Taktkonfiguration fest.

### 48-MHz-Systemquarz { #48-mhz-system-crystal }

!!! info "Anforderung"
    Lastkapazität CL ≤ 12 pF (7 pF empfohlen) · Frequenzabweichung ΔF/F0 ≤ ±10 ppm · ESR ≤ 30 Ω (22 Ω empfohlen)

<div align="center"><em>Qualifizierte Bauteile für den 48-MHz-Systemquarz</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | CL | ΔF/F0 | ESR | Betriebstemperatur | Gehäuse | Anlaufzeit | Zusatzstrom | Optimaler CBANK_SEL | TX-Kanal-39-Frequenzversatz (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:--------------|:-------------|:-------------------|:---------------------------------------------|
| E1SB48E001G00E | Hosonic (鸿星) | 8,8 pF | −10 bis +9 ppm | ≤22 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | 0 µA | 0x1C9 | −32 bis −1 kHz / ±20 kHz / +33 bis +73 kHz |
| SX20Y048000B31T-8.8 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −20 °C bis +75 °C | 2016 metrisch | <800 µs | <30 µA | 0x1DC | −52 bis −15 kHz / ±22 kHz / +50 bis +100 kHz |
| SX20Y048000B31T001 | TKD (泰晶) | 8,8 pF | ±10 ppm | ≤40 Ω | −40 °C bis +85 °C | 2016 metrisch | <800 µs | <30 µA | 0x1F7 | −53 bis +13 kHz / ±30 kHz / +44 bis +90 kHz |
| CN4048M00085C822000 | JWT (晶威特) | 8 pF | ±8 ppm | ≤22 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | 0 µA | 0x195 | −40 bis +1 kHz / −25 bis +14 kHz / +12 bis +45 kHz |
| HS48000013 | 汇隆电子 | 8,8 pF | ±10 ppm | ≤22 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | <12 µA | 0x1F3 | −27 bis +8 kHz / −25 bis +10 kHz / −1,2 bis +32 kHz |
| SX20Y048000B81T003 | TKD (泰晶) | 8 pF | ±10 ppm | ≤40 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | <10 µA | 0x1F4 | −41 bis +7 kHz / −30 bis +20 kHz / +5 bis +57 kHz |
| L214S480D11-S | Lucki (蓝晶) | 8 pF | ±10 ppm | ≤30 Ω | −30 °C bis +85 °C | 2016 metrisch | <750 µs | <50 µA | 0x196 | −38 bis 0 kHz / −28 bis 0 kHz / −4 bis +45 kHz |
| 8Y48090002 | TXC (晶技) | 8,8 pF | −6 bis +8 ppm | ≤22 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | <30 µA | 0x1D0 | −34 bis −9,6 kHz / — / +27,9 bis +46,1 kHz |
| 9S48000051 | 惠伦晶体 | 8,8 pF | −6 bis +8 ppm | ≤20 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | <15 µA | — | — |
| CN4048M000885C822000 | JWT (晶威特) | 8,8 pF | ±8 ppm | ≤22 Ω | −30 °C bis +85 °C | 2016 metrisch | <700 µs | <10 µA | 0x1D0 | −34 bis −9,6 kHz / −25 bis +10 kHz / +27,9 bis +46,1 kHz |

</div>

!!! tip "Was die RF-Kalibrierungsspalten bedeuten"
    **CBANK_SEL** ist die in SiFlis Qualifizierungsdaten angegebene Trimm-Einstellung. **TX Ch39 Freq Offset** übernimmt die Prüfbezeichnung der Quelle und die Ergebnisse bei drei Temperaturen. Die Arbeitsmappe nennt weder den Bluetooth-Modus noch die Prüffrequenz. Setzen Sie die Bezeichnung daher nicht mit BLE-Advertising-Kanal 39 oder einem bestimmten Kanal in der Bandmitte gleich. Klären Sie Prüfaufbau und Kalibrierverfahren, bevor Sie Ergebnisse vergleichen oder Trimm-Einstellungen auf Ihre Platine übertragen. Drei TKD-Einträge nennen ESR ≤40 Ω trotz der allgemeinen Vorgabe ≤30 Ω; auch diese Abweichung muss geklärt werden.

Für die zusätzlichen Stromwerte in der Quarztabelle sind weder der Vergleichswert noch der vollständige Prüfaufbau dokumentiert. Sie beschreiben nicht den Versorgungsstrom eines Quarzes allein. Klären Sie die Messdefinition, bevor Sie Kandidaten vergleichen oder die Werte in das Leistungsbudget des Systems übernehmen.

### 32,768-kHz-RTC-Quarz { #32768-khz-rtc-crystal }

!!! info "Anforderung"
    Lastkapazität CL ≤ 12,5 pF (7 pF empfohlen) · Frequenzabweichung ΔF/F0 ≤ ±20 ppm · ESR ≤ 80 kΩ (38 kΩ empfohlen)

<div align="center"><em>Qualifizierte Bauteile für den 32,768-kHz-RTC-Quarz</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | CL | ΔF/F0 | ESR | Betriebstemperatur | Gehäuse | Prozentwerte der Quelle; Bedeutung unbestätigt (−35 °C / 25 °C / 105 °C) |
|:--------------|:-------|:---|:------|:----|:----------------|:--------|:-------------------------------------|
| ETST00327000LE | Hosonic (鸿星) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C bis +85 °C | 3215 metrisch | 32 % bis 55 % / 43 % bis 54 % / 38 % bis 45 % |
| SF32K32768D71T01 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C bis +85 °C | 3215 metrisch | 33 % bis 54 % / 42 % bis 56 % / 35 % bis 44 % |
| X1A0001210008xx | Epson (爱普生) | 7 pF | ±20 ppm | ≤90 kΩ | −40 °C bis +85 °C | 1610 metrisch | 35 % bis 61 % / 42 % bis 58 % / 36 % bis 48 % |
| DH2032K76807T2719002 | JWT (晶威特) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C bis +85 °C | 3215 metrisch | 43 % bis 60 % / 45 % bis 59 % / 37 % bis 48 % |
| SF32WK32768D71T024 | TKD (泰晶) | 7 pF | ±20 ppm | ≤70 kΩ | −40 °C bis +85 °C | 3215 metrisch | 34 % bis 55 % / 41 % bis 54 % / 36 % bis 46 % |

</div>

Die Arbeitsmappe gibt für jedes Bauteil bei drei einzelnen Prüftemperaturen 32,76 kHz an: −35 °C, 25 °C und 105 °C. Diese Anzeigeauflösung belegt weder eine Genauigkeit im ppm-Bereich noch das Verhalten über den gesamten Temperaturbereich. Die Prozentwerte der Tabelle stehen im Original unter der Überschrift `TX_CH39_Freq_offset(KHz)`, obwohl ihr Format auf Tastverhältnismessungen hindeutet. Klären Sie die Bedeutung mit SiFli, bevor Sie diese Werte als Tastverhältnisgrenzen verwenden. Der Prüfpunkt bei 105 °C erweitert auch nicht den angegebenen Betriebstemperaturbereich von −40 °C bis +85 °C. Die ESR-Obergrenze des Epson-Bauteils von 90 kΩ überschreitet die allgemeine Vorgabe von 80 kΩ. Diese Abweichung bleibt erhalten; klären Sie die Zulässigkeit für Ihr Design.

---

## Buck-Induktivitäten { #buck-inductors }

!!! info "Anforderung"
    Induktivität L = 4,7 µH ±20 % · Gleichstromwiderstand (DCR) ≤ 0,4 Ω · Sättigungsstrom (Isat) ≥ 450 mA

<div align="center"><em>Qualifizierte Buck-Induktivitäten</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Typ | Toleranz | SRF | DCR | Isat | Irms | Gehäuse |
|:--------------|:-------|:-----|:----------|:----|:----|:-----|:-----|:--------|
| WPN201610U4R7MT | Sunlord | Drahtgewickelt | ±20 % | 21 MHz | ≤288 mΩ | 1,3 A | 1,45 A | 0806 (2016 metrisch) |
| WPN201610H4R7MT | Sunlord | Drahtgewickelt | ±20 % | 25 MHz | ≤425 mΩ | 1,2 A | 1,0 A | 0806 (2016 metrisch) |
| HTTX20161T-4R7MDR | Cyntec | Drahtgewickelt | ±20 % | — | ≤250 mΩ | 1,7 A | 1,5 A | 0806 (2016 metrisch) |
| VLS201612CX-4R7M-1 | TDK | Drahtgewickelt | ±20 % | 51 MHz | ≤252 mΩ | 0,88 A | 1,32 A | 0806 (2016 metrisch) |
| CIGW201610GL4R7MLE | Samsung | Drahtgewickelt | ±20 % | — | ≤240 mΩ | 1,4 A | 1,4 A | 0806 (2016 metrisch) |
| DFE201612E-4R7M=P2 | Murata | Drahtgewickelt | ±20 % | — | ≤252 mΩ | 1,8 A | 1,2 A | 0806 (2016 metrisch) |
| SWAI201610H4R7M | 三体微 | Drahtgewickelt | ±20 % | — | ≤390 mΩ | 1,3 A | 1,05 A | 0806 (2016 metrisch) |
| FSHJ201610-4R7M | 方磁 | Drahtgewickelt | ±20 % | — | ≤425 mΩ | 1,1 A | 0,9 A | 0806 (2016 metrisch) |

</div>

Die Aufnahme in diese Tabelle macht die acht Induktivitäten nicht elektrisch austauschbar. Für WPN201610H4R7MT und FSHJ201610-4R7M ist jeweils ein maximaler DCR von 425 mΩ angegeben, mehr als die allgemeine Vorgabe von 0,4 Ω. Die Arbeitsmappe erklärt diese Abweichung nicht. Klären Sie die Zulässigkeit mit SiFli, statt die Einhaltung dieses Grenzwerts anzunehmen. Prüfen Sie bei jedem Kandidaten DCR-Verluste, Isat, Irms, SRF, Footprint, Bauhöhe und Temperaturanstieg anhand des tatsächlichen Induktivitätsstroms und der Betriebsbedingungen des Wandlers, nicht anhand des mittleren Stroms des gesamten Produkts.

---

## NOR-Flash { #nor-flash }

V0.3 führt 44 NOR-Flash-Bauteile von 4 Mb bis 256 Mb auf, gruppiert nach Kapazität. Die Taktangaben gelten für die Speicherbauteile und garantieren diese Geschwindigkeiten nicht für jedes SF32-Gerät oder jede Platine. Prüfen Sie Lesebefehle, Controller-Grenzen, Timing und die Bauteilerkennung im Treiber für Ihr konkretes Design. Die Quelle bezeichnet die Hexadezimalwerte als „Manufacture ID“; sie enthalten jedoch auch Gerätekennungen. Vergleichen Sie daher die vollständige erwartete Antwort und nicht nur das Herstellerbyte. Berechnen Sie Aktiv- und Standby-Leistung anhand von Stromwerten mit dokumentierten Betriebsbedingungen.

### 4 Mb – 16 Mb { #4-mb-16-mb }

Keines der sechs Bauteile in dieser Kapazitätsstufe unterstützt den DTR-Modus, daher wird nur eine einzelne SDR-Taktspalte angezeigt.

<div align="center"><em>Qualifizierte 4-Mb- bis 16-Mb-NOR-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Kapazität | Spannung | Temperaturbereich | Max. SDR-Takt | Angegebene ID | Standby | Deep Power-Down | Aktivlesestrom |
|:--------------|:-------|:---------|:--------|:-----------|:---------------|:-------|:--------|:------------------|:----------------------|
| P25Q40SU | PUYA | 4 Mb | 1,65–3,6 V | −40 °C bis +85 °C | 85 MHz @1,8 V / 104 MHz @3,3 V | 0x856013 | 10 µA | 0,1 µA @1,8 V / 0,6 µA @3,3 V | 3,5 mA @85 MHz (1,8 V) / 5 mA @85 MHz (3,3 V) / EDH: nicht unterstützt |
| P25Q80LE | PUYA | 8 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 104 MHz | 0x856014 | 9 µA | 0,1 µA | 1,5 mA @85 MHz / EDH: nicht unterstützt |
| GD25LE80E | GD (GigaDevice) | 8 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz | 0xC86014 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: nicht unterstützt |
| UC25WQ80IB | UCUN | 8 Mb | 1,65–3,6 V | −40 °C bis +85 °C | 104 MHz | 0xB36014 | 1,5 µA | 0,5 µA | 6 mA @85 MHz / EDH: nicht angegeben |
| P25Q16LE | PUYA | 16 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 104 MHz | 0x856015 | 18 µA | 0,1 µA | 3 mA @85 MHz / EDH: nicht unterstützt |
| GD25LE16E | GD (GigaDevice) | 16 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz | 0xC86015 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: nicht unterstützt |

</div>

### 32 Mb – 64 Mb { #32-mb-64-mb }

<div align="center"><em>Qualifizierte 32-Mb- bis 64-Mb-NOR-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Kapazität | Spannung | Temperaturbereich | Max. Takt (SDR / DTR) | Angegebene ID | Standby | Deep Power-Down | Aktivlesestrom |
|:--------------|:-------|:---------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q32L | PUYA | 32 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 120 MHz / — | 0x856016 | 9 µA | 0,2 µA | 2 mA @85 MHz / EDH: nicht unterstützt |
| SK25LE032 | SK | 32 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz / 80 MHz | 0x257016 | 10 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LE32E | GD (GigaDevice) | 32 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz / — | 0xC86016 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: nicht unterstützt |
| UC25IQ32A | UCUN | 32 Mb | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / 66 MHz | 0xB34014 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: nicht angegeben |
| P25Q64LE | PUYA | 64 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 104 MHz / — | 0x856017 | 18 µA | 0,3 µA | 2 mA @85 MHz / EDH: nicht unterstützt |
| P25Q64H | PUYA | 64 Mb | 2,3–3,6 V | −40 °C bis +85 °C | 120 MHz / — | 0x856017 | 18 µA | 0,6 µA | 4 mA @85 MHz / EDH: nicht unterstützt |
| P25Q64SH | PUYA | 64 Mb | 2,3–3,6 V | −40 °C bis +85 °C | 120 MHz / 70 MHz | 0x856017 | 10 µA | 0,3 µA | 6,8 mA @85 MHz (SDR) / 9,45 mA @70 MHz (DTR) |
| GD25LE64E | GD (GigaDevice) | 64 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz / — | 0xC86017 | 10 µA | 0,2 µA | 3 mA @80 MHz / EDH: nicht unterstützt |
| ZB25LQ64A | ZBIT | 64 Mb | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz / 66 MHz | 0x5E7017 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: nicht angegeben |
| BY25Q64ES | BOYA | 64 Mb | 2,7–3,6 V | −40 °C bis +85 °C | 120 MHz / — | 0x684017 | 9 µA | 0,4 µA | 6 mA @80 MHz / EDH: nicht unterstützt |
| UC25IQ64A | UCUN | 64 Mb | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / 66 MHz | 0xB34017 | 10 µA | 1 µA | 15 mA @80 MHz / EDH: nicht angegeben |

</div>

### 128 Mb { #128-mb }

<div align="center"><em>Qualifizierte 128-Mb-NOR-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Spannung | Temperaturbereich | Max. Takt (SDR / DTR) | Angegebene ID | Standby | Deep Power-Down | Aktivlesestrom |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| P25Q128L | PUYA | 1,65–2,0 V | −40 °C bis +85 °C | 70 MHz / 43 MHz | 0x856018 | 15 µA | 0,5 µA | 4,5 mA @85 MHz / EDH: nicht angegeben |
| PY25Q128HA | PUYA | 2,7–3,6 V | −40 °C bis +85 °C | 104 MHz / 66 MHz | 0x852018 | 15 µA | 1 µA | 7 mA @85 MHz (SDR) / 9 mA @66 MHz (DTR) |
| SK25LP128 | SK | 1,65–2,0 V | −40 °C bis +85 °C | 166 MHz / 104 MHz | 0x257018 | 8 µA | 0,1 µA | 2 mA @80 MHz (SDR) / 2,6 mA @80 MHz (DTR) |
| GD25LQ128E | GD (GigaDevice) | 1,65–2,0 V | −40 °C bis +85 °C | 120 MHz / — | 0xC86018 | 35 µA | 1 µA | 13 mA @80 MHz / EDH: nicht unterstützt |
| GD25Q128E | GD (GigaDevice) | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / — | 0xC84018 | 14 µA | 1 µA | 8 mA @80 MHz / EDH: nicht unterstützt |
| GD25F128F | GD (GigaDevice) | 2,7–3,6 V | −40 °C bis +85 °C | 166 MHz / 104 MHz | 0xC84318 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: nicht angegeben |
| W25Q128JW | Winbond | 1,7–1,95 V | −40 °C bis +85 °C | 133 MHz / — | 0xEF6018 | 10 µA | 1 µA | — / EDH: nicht unterstützt |
| W25Q128JV | Winbond | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / — | 0xEF4018 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: nicht unterstützt |
| XT25F128F | XTX | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / 104 MHz | 0x0B4018 | 15 µA | 1 µA | 8 mA @80 MHz / EDH: nicht angegeben |
| XT25Q128DW | XTX | 1,7–2,0 V | −40 °C bis +85 °C | 108 MHz / 76 MHz | 0x0B6018 | 12 µA | 0,4 µA | 9 mA @80 MHz / EDH: nicht angegeben |
| FM25W128 | FM | 1,65–3,6 V | −40 °C bis +85 °C | 50 MHz @1,8 V / 100 MHz @3,3 V (nur SDR, DTR nicht unterstützt) | 0xA12818 | 5 µA | 1 µA @3,3 V | — / EDH: nicht unterstützt |
| XM25QU128C | XMC | 1,65–1,95 V | −40 °C bis +85 °C | 133 MHz / — | 0x204118 | 18 µA | 6 µA | 6 mA @66 MHz / EDH: nicht unterstützt |
| ZB25VQ128D | ZBIT | 2,3–3,6 V | −40 °C bis +85 °C | 104 MHz / — | 0x5E4018 | 10 µA | 1 µA | 4 mA @104 MHz / EDH: nicht unterstützt |
| ZB25LQ128B | ZBIT | 1,65–2,0 V | −40 °C bis +85 °C | 104 MHz / — | 0x5E5018 | 9 µA | 3 µA | 9 mA @104 MHz / EDH: nicht unterstützt |
| BY25Q128ES | BOYA | 2,7–3,6 V | −40 °C bis +85 °C | 108 MHz / — | 0x684018 | 14 µA | 0,2 µA | 6 mA @80 MHz / EDH: nicht unterstützt |
| UC25IQ128A | UCUN | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / 66 MHz | 0xB34018 | 15 µA | 1 µA | 12 mA @80 MHz / EDH: nicht angegeben |

</div>

### 256 Mb { #256-mb }

<div align="center"><em>Qualifizierte 256-Mb-NOR-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Spannung | Temperaturbereich | Max. Takt (SDR / DTR) | Angegebene ID | Standby | Deep Power-Down | Aktivlesestrom |
|:--------------|:-------|:--------|:-----------|:------------------------|:-------|:--------|:------------------|:----------------------|
| W25Q256JW | Winbond | 1,7–1,95 V | −40 °C bis +85 °C | 133 MHz / — | 0xEF6019 | 10 µA | 1 µA | 8 mA @80 MHz / EDH: nicht unterstützt |
| W25Q256JV | Winbond | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / — | 0xEF7019 | 10 µA | 1 µA | 12 mA @104 MHz / EDH: nicht unterstützt |
| PY25Q256HB | PUYA | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / 100 MHz | 0x852019 | 20 µA | 1 µA | 7 mA @80 MHz (SDR) / 11,5 mA @80 MHz (DTR) |
| GD25LQ256D | GD (GigaDevice) | 1,65–2,0 V | −40 °C bis +85 °C | 120 MHz / — | 0xC86019 | 70 µA | 2 µA | 10 mA @80 MHz / EDH: nicht unterstützt |
| GD25Q256E | GD (GigaDevice) | 2,7–3,6 V | −40 °C bis +85 °C | 133 MHz / — | 0xC84019 | 16 µA | 1 µA | 12 mA @80 MHz / EDH: nicht unterstützt |
| XM25QU256C | XMC | 1,65–1,95 V | −40 °C bis +85 °C | 133 MHz / — | 0x204119 | 15 µA | 7 µA | 11 mA @66 MHz / EDH: nicht unterstützt |
| XM25QH256C | XMC | 2,3–3,6 V | −40 °C bis +85 °C | 133 MHz / — | 0x204019 | 15 µA | 7 µA | 7 mA @66 MHz / EDH: nicht unterstützt |
| XT25F256BW | XTX | 2,7–3,6 V | −40 °C bis +85 °C | 104 MHz / 50 MHz | 0x0B4019 | 15 µA | 0,5 µA | 8 mA @80 MHz / EDH: nicht angegeben |
| DS25M4BA | Dosilicon | 1,65–1,95 V | −40 °C bis +85 °C | 108 MHz / 80 MHz | 0xE54219 | 15 µA | 5 µA | 13 mA @108 MHz / EDH: nicht angegeben |
| BY25Q256FS | BOYA | 2,7–3,6 V | −40 °C bis +85 °C | 100 MHz / 54 MHz | 0x684919 | 28 µA | 2 µA | 13 mA @80 MHz / EDH: nicht angegeben |
| MX25U25643G | MXIC (Macronix) | 1,65–2,0 V | −40 °C bis +85 °C | 133 MHz / 54 MHz | 0xC22539 | 15 µA | 0,8 µA | 7 mA @84 MHz / EDH: nicht angegeben |

</div>

!!! warning "Stromwerte und Modusgrenzen benötigen ihre ursprünglichen Bedingungen"
    Dies sind in der AVL angegebene Werte, keine unabhängigen Messungen dieser Website. Ohne ausdrückliche Kennzeichnung dürfen Sie weder einen typischen beziehungsweise maximalen Wert noch identische, nicht angegebene Spannungs-, Temperatur- und Taktbedingungen über mehrere Zeilen annehmen. Prüfen Sie das Bauteildatenblatt und messen Sie Ihre Platine. Die Leseströme stammen aus den Quellspalten `EBH` und `EDH`. „—“ in einer Stromzelle bedeutet eine fehlende Angabe; in der DTR-Taktspalte steht es für den als nicht unterstützt bezeichneten Modus. Die Quelle nennt die zweite Taktspalte `TDR`; diese Seite verwendet `DTR`. Lesemodus und Befehl müssen dennoch für das genaue Bauteil geprüft werden.

    Die EDH-Angaben bewahren die Unterscheidung der Quelle zwischen fehlenden Daten und nicht unterstütztem Betrieb; sie werden nicht aus der Taktspalte abgeleitet. Bei P25Q128L ist die Quelle widersprüchlich: Der maximale SDR-Takt beträgt laut Tabelle 70 MHz, der Lesestrom ist jedoch für 85 MHz angegeben. Beide Originalwerte bleiben erhalten; klären Sie die gültigen Bedingungen vor der Verwendung.

---

## SPI-NAND-Flash { #spi-nand-flash }

V0.3 führt 18 SPI-NAND-Bauteile mit 512 Mb und 1 Gb auf. Mit einem kompatiblen Treiber und Software-Stack können sie Dateien oder Daten speichern; Beispiele sind FatFS, FlashDB und LittleFS. Die Kompatibilität mit dem gewählten Bauteil muss jedoch geprüft werden. Seitenzugriff, ECC und Bad-Block-Verwaltung unterscheiden sich bei NAND vom direkten NOR-XIP-Zugriff. Für jedes aufgeführte Bauteil steht in der Arbeitsmappe **Golden Block** auf `block0`; Garantiebedingungen und darauf angewiesene Firmware-Routinen sind nicht angegeben. Prüfen Sie diese Voraussetzungen anhand der Geräte- und SDK-Dokumentation.

Für GD5F1GM7RE und GD5F1GM7UE nennt die Quelle `2048+64` Byte pro Seite, aber `128K+8K` Byte pro Block. Die Angaben zum Spare-Bereich passen bei einer einfachen Hochrechnung von der Seite auf den Block nicht zusammen. Beide Werte bleiben in der Tabelle erhalten. Prüfen Sie vor der Treiberkonfiguration die Seiten-, Block- und Spare-Bereichsgeometrie im Datenblatt des genauen Bauteils.

### 512 Mb { #512-mb }

<div align="center"><em>Qualifizierte 512-Mb-SPI-NAND-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Spannung | Temperaturbereich | Angegebene ID | Seiten-/Blockgröße | Max. Rate | ECC | Golden Block | Standby | Seitenlesen | Programmieren/Löschen |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| F35SQA512M | FORESEE | 2,7–3,6 V | −40 °C bis +85 °C | 0xCD7070 | 2048+64 B / 128K+4K | 133 MHz | HW 1 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| F35UQA512M | FORESEE | 1,7–1,95 V | −40 °C bis +85 °C | 0xCD6060 | 2048+64 B / 128K+4K | 104 MHz | HW 1 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35M12B | Dosilicon | 1,7–1,95 V | −40 °C bis +85 °C | 0xE5A5E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q12B | Dosilicon | 2,7–3,6 V | −40 °C bis +85 °C | 0xE5F5E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8 Bit | `block0` | 10 µA | 10 mA | 15 mA |

</div>

### 1 Gb { #1-gb }

<div align="center"><em>Tabelle: qualifizierte 1-Gb-SPI-NAND-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Spannung | Temperaturbereich | Angegebene ID | Seiten-/Blockgröße | Max. Rate | ECC | Golden Block | Standby | Seitenlesen | Programmieren/Löschen |
|:--------------|:-------|:--------|:-----------|:-------|:---------------------|:---------|:----|:---------------|:--------|:-----------|:-----------------|
| W25N01GW | Winbond | 1,7–1,95 V | −40 °C bis +85 °C | 0xEFBA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1 Bit | `block0` | 10 µA | 25 mA | 25 mA |
| W25N01GV | Winbond | 2,7–3,6 V | −40 °C bis +85 °C | 0xEFAA21 | 2048+64 B / 128K+4K | 104 MHz | HW 1 Bit | `block0` | 10 µA | 25 mA | 25 mA |
| GD5F1GM7RE | GD (GigaDevice) | 1,7–2,0 V | −40 °C bis +85 °C | 0xC881C8 | 2048+64 B / 128K+8K | 104 MHz SDR / 80 MHz DTR | HW 8 Bit | `block0` | 10 µA | 10 mA | 10 mA |
| GD5F1GM7UE | GD (GigaDevice) | 2,7–3,6 V | −40 °C bis +85 °C | 0xC891C8 | 2048+64 B / 128K+8K | 133 MHz SDR / 104 MHz DTR | HW 8 Bit | `block0` | 10 µA | 15 mA | 15 mA |
| F35SQA001G | FORESEE | 2,7–3,6 V | −40 °C bis +85 °C | 0xCD7171 | 2048+64 B / 128K+4K | 104 MHz | HW 1 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| HYF1GQ4IDACAE | HeYangTek | 1,7–1,98 V | −40 °C bis +85 °C | 0xC981C9 | 2048+64 B / 128K+4K | 80 MHz | HW 4 Bit | `block0` | 10 µA | 5 mA | — |
| HYF1GQ4UDACAE | HeYangTek | 2,7–3,6 V | −40 °C bis +85 °C | 0xC921C9 | 2048+64 B / 128K+4K | 108 MHz | HW 4 Bit | `block0` | 10 µA | 15 mA | — |
| XT26Q01D | XTX | 1,7–1,95 V | −40 °C bis +85 °C | 0x0B5100 | 2048+128 B / 128K+8K | 108 MHz | HW 8 Bit | `block0` | 15 µA | 26 mA | 28 mA / 18 mA |
| XT26G01C | XTX | 2,7–3,6 V | −40 °C bis +85 °C | 0x0B3100 | 2048+128 B / 128K+8K | 104 MHz | HW 8 Bit | `block0` | 180 µA | 25 mA | 30 mA / 25 mA |
| DS35M1GB | Dosilicon | 1,7–1,95 V | −40 °C bis +85 °C | 0xE5A1E5 | 2048+128 B / 128K+8K | 83 MHz | HW 8 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| DS35Q1GB | Dosilicon | 2,7–3,6 V | −40 °C bis +85 °C | 0xE5F1E5 | 2048+128 B / 128K+8K | 104 MHz | HW 8 Bit | `block0` | 10 µA | 10 mA | 15 mA |
| ZB35Q01A | ZBIT | 2,7–3,6 V | −40 °C bis +85 °C | 0x5E415E | 2048+64 B / 128K+4K | 80 MHz | HW 8 Bit | `block0` | 10 µA | 10 mA | 10 mA |
| FM25SL01 | FM | 1,75–1,95 V | −40 °C bis +85 °C | 0xA1A5A1 | 2048+128 B / 128K+8K | 80 MHz | HW 1 Bit | `block0` | 10 µA | 16 mA | 16 mA |
| TC58CYG0S3HRAIJ | KIOXIA | 1,7–1,95 V | −40 °C bis +85 °C | 0x98D240 | 2048+64 B / 128K+4K | 133 MHz | HW 8 Bit | `block0` | 30 µA | 17 mA | 26 mA |

</div>

Prüfen Sie vor der Implementierung der Flash-Erkennung die JEDEC-/Hersteller-ID-Sequenz im Datenblatt jedes Bauteils. Die Anzahl der nach dem Opcode `0x9F` zurückgegebenen ID-Bytes unterscheidet sich je nach Hersteller: Manche liefern eine 2-Byte-Geräte-ID als `DID1`+`DID2`, andere ein einzelnes ID-Byte. Diese Unterschiede können bei der Inbetriebnahme eines Bauteils aus einer neuen Zweitquelle zu Fehlern wie „Flash nicht erkannt“ führen.

---

### ID-Lesesequenzen der Quelle { #read-jedec-id-sequences }

Die Arbeitsmappe nennt die folgenden drei ID-Leseformate. `MID` bezeichnet die Hersteller-ID; `DID`, `DID1` und `DID2` bezeichnen Geräte-ID-Felder. Dies sind Zeichenfolgen der Quelle, keine direkt ausführbaren Transaktionen. Prüfen Sie vor der Implementierung Opcode, Dummy-/Adressphase, Anzahl der zurückgegebenen Bytes und Chip-Select-Timing anhand des Datenblatts des genauen Bauteils. Die hexadezimalen IDs in den Bauteiltabellen sind nicht durchgehend einzelne Hersteller-ID-Bytes.

<div align="center"><em>In V0.3 angegebene SPI-NAND-ID-Lesesequenzen</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Bauteile | Sequenz der Quelle |
|:---|:---|
| F35SQA512M, F35UQA512M, W25N01GW, W25N01GV, F35SQA001G, TC58CYG0S3HRAIJ | `9F+dummy(8bit)+MID+DID1+DID2` |
| DS35M12B, DS35Q12B, GD5F1GM7RE, GD5F1GM7UE, DS35M1GB, DS35Q1GB, FM25SL01 | `9F+dummy(8bit)+MID+DID` |
| HYF1GQ4IDACAE, HYF1GQ4UDACAE, XT26Q01D, XT26G01C, ZB35Q01A | `9F+00+MID+DID` |

</div>

---

## SD-NAND-Flash { #sd-nand-flash }

V0.3 führt fünf qualifizierte SD-NAND-Bauteile mit jeweils 1 Gb und einer SD-2.0-Schnittstelle auf. Sie kommen als fest verbauter Speicher infrage, der ohne physischen Kartensteckplatz über eine SD-Schnittstelle angesprochen wird. Prüfen Sie vor der Auswahl die Kompatibilität von Controller und Treiber für das genaue Bauteil und Produktdesign.

<div align="center"><em>Qualifizierte SD-NAND-Flash-Bauteile</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Temperaturbereich | Spannung | Schnittstelle | Max. Takt | Standby | Betriebsstrom |
|:--------------|:-------|:-----------|:--------|:----------|:----------|:--------|:---------------------|
| CSNP1GCR01-BOW | CS | −30 °C bis +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 150 µA (typ.) | 15 mA @50 MHz (typ.) |
| XTSD01GLGEAG | XTX | −30 °C bis +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 200 µA (max.) | 30 mA @50 MHz (max.) |
| XSSD01GGAI | XSS | 0 °C bis +70 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 300 µA (max.) | 45 mA @50 MHz (max.) |
| MKDV1GCL-AB | MK | −25 °C bis +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 50 µA (max.) | 28 mA @50 MHz (max.) |
| XS26D01GACW | Icthink | −25 °C bis +85 °C | 2,7–3,6 V | SD 2.0 | 50 MHz | 250 µA (max.) | 100 mA @50 MHz (max.) |

</div>

XSSD01GGAI ist für 0 °C bis +70 °C aufgeführt. Bei den anderen vier Bauteilen liegt die Untergrenze bei −25 °C oder −30 °C und die Obergrenze bei +85 °C. Verwenden Sie die tatsächlichen Grenzen jeder Zeile, statt eine gemeinsame Temperaturklasse anzunehmen, und prüfen Sie die nötige Reserve für die Produktumgebung.

---

## LCD-Treiber { #lcd-driver }

!!! warning "Display-Treiber in V0.3"
    V0.3 enthält einen LCD-Treiber. Die [Arbeitsmappe zu V0.3](https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx) ist ein fester Datenstand und verweist nicht auf künftige Revisionen. Ein fehlender Eintrag bedeutet nicht, dass ein Bauteil grundsätzlich nicht unterstützt wird; klären Sie seine Eignung vor der Serienauswahl mit SiFli. MIPI und QSPI sind Schnittstellen des Display-Treibers, nicht zwangsläufig jedes SF32-Geräts. Prüfen Sie die Schnittstellen und Softwaretreiber des gewählten Chips; siehe [Grafik-Übersicht](../../learn/graphics/overview.md) und [ePicasso-GPU-Architektur](../../learn/graphics/epicasso-gpu.md). Die Quelle nennt für SDR `?MHz`, also keinen konkreten Wert, und bezeichnet DDR als nicht unterstützt.

<div align="center"><em>Qualifizierte LCD-Treiber</em></div>

<div align="center" markdown>

| Qualifizierte Teilenr. | Hersteller | Auflösung | Typ | IO-Spannung | Schnittstelle | GRAM | Farbtiefe | Max. Rate (SDR / DDR) |
|:--------------|:-------|:-----------|:-----|:-----------|:----------|:-----|:--------------|:--------------------------|
| RM69090 | Raydium | 368×448 | AMOLED | 1,65–3,3 V | MIPI, QSPI | Ja | 16,7 Mio. Farben | Nicht angegeben / nicht unterstützt |

</div>

---

## Touch-Panel-Controller { #touch-panel-controller }

V0.3 enthält keine Touch-Controller-Einträge. Daraus lässt sich weder der Qualifizierungsstand späterer Revisionen noch fehlende Unterstützung für ein bestimmtes Bauteil ableiten. Lassen Sie für einen Kandidaten den Qualifizierungsstand und die Treiberunterstützung durch SiFlis FAE- oder Vertriebsteam bestätigen. Geben Sie die genaue Bestellnummer und die Produktanforderungen an. Siehe [Kontaktinformationen](../../about/index.md).

---

## Checkliste zur Designprüfung { #design-review-checklist }

Prüfen Sie vor der Freigabe von Schaltplan oder Stückliste jedes ausgewählte AVL-Bauteil anhand des tatsächlichen Produktdesigns:

- [ ] Die genaue Teilenummer, das Gehäuse, die Temperaturklasse und das Bestellsuffix stimmen mit dem freigegebenen Eintrag überein oder haben einen expliziten technischen Freigabeweg.
- [ ] Der Spannungsbereich stimmt mit der auf der Platine verwendeten SF32-IO-Schiene, Flash-Schiene, Display-Schiene oder Spannungswandler-Schiene überein.
- [ ] Gehäuse, Pad-Layout, Höhe und Montagebeschränkungen stimmen mit der PCB-Bibliothek und dem Fertigungsprozess überein.
- [ ] Die Firmware kann das Bauteil korrekt identifizieren, mittels JEDEC-/Hersteller-ID oder einer gleichwertigen Laufzeitprüfung, sofern zutreffend.
- [ ] Boot-, Download-, OTA-, Dateisystem-, Display- oder Touch-Treiberverhalten wurde am genauen Bauteil verifiziert.
- [ ] Der Stromverbrauch im Energiesparmodus wurde auf realer Hardware gemessen und nicht direkt aus der AVL oder dem Bauteil-Datenblatt übernommen.
- [ ] Frequenzversatz des Quarzes, CBANK_SEL-Verhalten und RF-Kalibrierung sind auf der endgültigen Leiterplatte, Antenne und im Gehäuse validiert.
- [ ] Die Zeiten für das Löschen, Programmieren und Lesen des Flash wurden im erwarteten Spannungs- und Temperaturbereich des Produkts geprüft.
- [ ] Für risikoreiche Stücklistenpositionen wie Quarze, Induktivitäten, Flash und Display-Panels ist mindestens ein Zweitquellenkandidat identifiziert.

Diese Checkliste ist bewusst strenger als „das Bauteil steht in der AVL“. Die AVL grenzt die Auswahl ein; die Produktfreigabe erfordert weiterhin Validierungsnachweise auf der eigenen Platine.

## Beschaffungscheckliste { #sourcing-checklist }

- [ ] Gleichen Sie Teilenummer und Revisionssuffix mit der aktuellen herunterladbaren AVL ab — Tabellen-Momentaufnahmen (einschließlich dieser Seite) veralten, sobald neue Chargen qualifiziert werden.
- [ ] Bestätigen Sie bei Flash-Bauteilen, dass die vom Initialisierungscode erwartete Hersteller-/JEDEC-ID zum genau bestellten Bauteil passt, nicht nur zur Familie. Manche Familien verwenden denselben Handelsnamen, geben aber unterschiedliche ID-Bytes zurück.
- [ ] Verifizieren Sie bei NAND, SD-NAND und jedem Speicherbauteil für ein Dateisystem die Boot-/Download-Tool-Unterstützung, den OTA-Update-Ablauf und das Dateisystemverhalten (FatFS/FlashDB/LittleFS) auf realer Hardware. Ein Bauteil, das bei der Inbetriebnahme korrekt gelesen wird, ist nicht automatisch für OTA validiert.
- [ ] Prüfen Sie CBANK_SEL und den angegebenen TX-Ch39-Frequenzversatz auf Ihrer Platine. Die Arbeitsmappe nennt weder das Referenzlayout noch den vollständigen Messaufbau; klären Sie Testmodus und Bedingungen vor einem Vergleich.
- [ ] Messen Sie Standby-, Deep-Power-Down- und Lesestrom auf Ihrer Platine. Die AVL dokumentiert Herkunft und Betriebsbedingungen nicht für jeden Wert vollständig; prüfen Sie Datenblatt und Messbedingungen.
- [ ] Bestätigen Sie, dass Gehäuse und Footprint zu Ihrer PCB-Bibliothek und Fertigungsfähigkeit passen, nicht nur zur elektrischen Spezifikation.
- [ ] Qualifizieren Sie jedes noch nicht auf dieser Liste stehende Bauteil anhand der Anforderungszeile für seine Bauteilklasse, bevor Sie es in eine Stückliste aufnehmen, und erwägen Sie, die Qualifizierungsdaten an SiFli zurückzumelden.
- [ ] Benennen Sie für jede Position mit nur einem Lieferanten einen Zweitquellenkandidaten. V0.3 enthält einen LCD-Treiber und keine Touch-Controller; prüfen Sie aktuelle Verfügbarkeit und Unterstützung, statt diese Momentaufnahme als aktuellen Stand zu behandeln.
- [ ] Prüfen Sie diese Liste vor jeder größeren Stücklistenfreigabe erneut: Sie ist eine Momentaufnahme, keine laufend aktualisierte Datenbank.

## Verwandte Seiten { #related-pages }

- [SF32LB52x Hardware-Design-Leitfaden](../chip-guides/SF32LB52x_hardware_design_guide.md) — Schaltplan- und Layoutanleitung, die mehrere Bauteile dieser Liste direkt referenziert.
- [SF32LB57x Hardware-Design-Leitfaden](../chip-guides/SF32LB57x_hardware_design_guide.md)
- [SF32-Familie](../../sf32-products/family/SF32_family.md)
