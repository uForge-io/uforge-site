---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP: wearable-orientiertes SF32LB52x-Entwicklungsboard mit AMOLED, Touch, Sensoren, Audio, Akkuladung und Strommessung für die Bewertung des Energiesparverhaltens auf Systemebene."
tags:
    - Hardware
    - Entwicklungsboard
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## Überblick { #overview }

Das SF32LB52-DevKit-ULP ist auch unter den Bezeichnungen **立创黄山派**, **LCKFB-HSPI-SF32LB52-ULP** und **SF32LB52-ULP** bekannt. Es ist ein kompaktes Wearable-Entwicklungsboard mit extrem niedrigem Energiebedarf auf Basis der SF32LB52x-Familie und als Prototypenplattform für Smartwatches und Fitnessarmbänder positioniert, nicht als einfaches MCU-Breakout-Board.

Im Vergleich zu den Boards LCD, Nano und Core-3p3 ist dieses Board produktnäher: Es vereint ein SF32LB52-Modul, AMOLED-Display, Touch, Mikrofon, Lautsprecherverstärker, RGB-LED, Treiber für einen Vibrationsmotor, Bewegungssensor, Magnetsensor, Umgebungslichtsensor, Akkuladung und Jumper zur Leistungsmessung. Das macht es besonders nützlich, wenn die Produktfrage nicht nur „Läuft die MCU?“ lautet, sondern „Wie verhält sich das gesamte Wearable-System im Akkubetrieb?“

Der [ULP-Board-Leitfaden][Originalartikel im SiFli-Wiki] von SiFli ist weiterhin nur ein Platzhalter. Für die detaillierte Board-Konfiguration verwenden Sie den chinesischen [Leitfaden zum Huangshan-Pi-Entwicklungsboard][Originalleitfaden Huangshan Pi von SiFli] von SiFli, der das Board V1.0.0 dokumentiert; die unten genannten Bauteilwerte sind die Grundlage für diese Revision. Das separate [LCKFB-Hardware-Wiki] nennt seine Board-Revision nicht und führt mehrere abweichende Bauteilnummern auf. Betrachten Sie diese als mögliche Abweichung zwischen Revisionen bzw. Quellen und nicht als austauschbare Bauteile, und prüfen Sie vor der Designarbeit die tatsächliche Board-Kennzeichnung, den Schaltplan und die Stückliste.

**Hinweis zum Veröffentlichungsstatus:** Der Leitfaden V1.0.0 von SiFli besagt, dass das dokumentierte Board damals für interne Tests vorgesehen war und vor der externen Veröffentlichung überarbeitet werden sollte. Diese Aussage gilt nur für diese Revision der Quelle; sie sagt nichts über Status oder Stückliste späterer Boards aus. Prüfen Sie die genaue Board-Revision und die Stückliste.

Die [Board-Seite im SiFli SDK][Board-Seite ULP im SiFli SDK] führt dieses Board-Target als `sf32lb52-lchspi-ulp`. Die Board-Seite des SDK und der Abschnitt zum Lieferumfang im chinesischen Huangshan-Pi-Leitfaden verwenden `SF32LB52X-MOD-1-N16R8`, während der [Modellleitfaden für Module][Modellleitfaden für Module von SiFli] von SiFli und die Beschriftung der GPIO-Tabelle `SF32LB52-MOD-1-N16R8` verwenden. Die Quellen erläutern diesen Unterschied beim `X` nicht. Das SDK-Target ist eindeutig; prüfen Sie Kennzeichnung und Stückliste des bestückten Moduls, statt anzunehmen, die beiden Schreibweisen der SKU bezeichneten unterschiedliche Hardware.

![Montagereferenz des SF32LB52-ULP-Wearable-Boards](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — Montagereferenz des Wearable-Boards</em></div>

![Blockdiagramm der Huangshan Pi SF32LB52](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>Huangshan Pi SF32LB52 — Blockdiagramm</em></div>

## Bezeichnungen { #naming }

<div align="center"><em>Alternative Bezeichnungen des Boards</em></div>

<div align="center" markdown>

| Name | Verwendung |
| :--- | :--- |
| SF32LB52-DevKit-ULP | Bezeichnung der Board-Familie bei SiFli/OpenSiFli |
| SF32LB52-ULP | Kurzer Hardware-/Produktname |
| LCKFB-HSPI-SF32LB52-ULP | Projekt-/Bestellbezeichnung bei LCKFB |
| 立创黄山派 / 立创・黄山派 SF32LB52 | Chinesischer Produkt- und Dokumentationsname |

</div>

Verwenden Sie diese Namen als Synonyme für dieselbe Board-Familie, wenn Sie nach Hardware-Dokumenten, Beispielen, Bestellseiten oder Community-Material suchen. Für Schaltplan, Pinbelegung oder Stückliste bestätigen Sie stets die genaue Board-Revision und den Dokumentensatz des Herstellers.

## Highlights des Boards { #board-highlights }

- Modul SF32LB52-MOD-1-N16R8 auf Basis des SF32LB52x
- Standard-Modulkonfiguration mit SF32LB525UC6
- 8 MB OPI-PSRAM, Schnittstelle mit 144 MHz
- 128 Mb QSPI-NOR-Flash, 72 MHz im STR-Modus
- 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz
- PCB-Antenne auf dem Board
- 1,85-Zoll-AMOLED-Display, Auflösung 390 x 450
- Quad-SPI-Display-Schnittstelle mit Touch-Unterstützung
- MEMS-Mikrofon auf dem Board
- Analoger Audioausgang mit Class-D-Lautsprecherverstärker
- Externer Lautsprecheranschluss für Lautsprecher mit 3 W/4 Ω oder 2 W/8 Ω
- USB-Type-C-UART-Schnittstelle über CH340N für Download, Debug und Versorgung
- USB-2.0-FS-Signale über den 30-poligen Erweiterungssteckverbinder herausgeführt
- MicroSD-Kartensteckplatz über SPI
- Eine Funktionstaste und eine Power-/Reset-Taste
- RGB-LED SK6812MINI-HS (Leitfaden V1.0.0 der SiFli Huangshan Pi; die Seite von LCKFB ohne Versionsangabe nennt WS2812B-2020)
- Treiberschaltung für Vibrationsmotor mit externen Lötpads für den Motor
- 6-Achsen-IMU LSM6DS3TR-C
- 3-Achsen-Magnetsensor MMC5603NJ
- Umgebungslichtsensor LTR-303ALS-01
- Akkulader und Bausteine für das Energiemanagement zum Testen der Wearable-Versorgung
- Erweiterungsleiste 2x15 Pins mit 1,27 mm Raster mit GPIO und Unterstützung für Strommessung

## Wann dieses Board geeignet ist { #when-to-use-this-board }

Wählen Sie das SF32LB52-DevKit-ULP / 立创黄山派, wenn es um die Validierung eines Wearable-Systems geht.

- Uhren-, Armband- und sensorreiche Wearable-Prototypen aufbauen
- Das AMOLED-UI-Verhalten auf der SF32LB52x-Plattform bewerten
- Touch, Bewegungs-, Magnetfeld- und Umgebungslichterfassung, Audio, Vibration und RGB-LED-Verhalten gemeinsam testen
- Ströme von Akku, System und 3,3 V im Ruhezustand und im aktiven Betrieb messen
- Weckabläufe validieren, die durch Tasten, Sensoren, Touch oder Firmware-Timer ausgelöst werden
- Produktnahes Energieverhalten mit frühen Schätzungen von einfacheren DevKit-Boards vergleichen

Für ein displayorientiertes allgemeines Evaluierungsboard verwenden Sie das [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md). Für kompakte Modul-Prototypen zum Auflöten verwenden Sie das [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Für maximalen direkten Pinzugriff bei der frühen Inbetriebnahme am Prüfplatz verwenden Sie das [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Hardware-Konfiguration { #hardware-configuration }

<div align="center"><em>Übersicht der Hardware-Konfiguration</em></div>

<div align="center" markdown>

| Bereich | Konfiguration |
| :--- | :--- |
| Kernmodul | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB OPI-PSRAM, Schnittstelle mit 144 MHz |
| Flash | 128 Mb QSPI-NOR-Flash, 72 MHz im STR-Modus |
| Display | 1,85-Zoll-AMOLED (ZC-A1D85W-010), 390 x 450, 800 cd/m², Quad-SPI |
| Display-Treiber | CO5300AF-01 |
| Versorgungs-IC des Displays | BV6802W |
| Touch-Controller | FT6146-M00 |
| Mikrofon | MEMS-Mikrofon auf dem Board |
| Lautsprecherausgang | Class-D-Verstärker, externer GH-1.25mm-Lautsprecheranschluss |
| Speicher | MicroSD-Karte über SPI |
| Bewegungssensor | 6-Achsen-IMU LSM6DS3TR-C |
| Magnetsensor | 3-Achsen-Magnetometer MMC5603NJ |
| Umgebungslichtsensor | LTR-303ALS-01 |
| USB-UART | CH340N über USB Type-C |
| Akku | Externer Li-Ion-Akku über GH1.25mm-Steckverbinder |
| Lader | SY6103, maximale Ladespannung 4,5 V; Standardeinstellung für Konstantstrom 450 mA; maximaler Strom 500 mA |
| Schutz-/Versorgungsbausteine | SY5320 (OVP), LP5240HVF (Lastschalter), ETA5055V330DS2F (LDO) |

</div>

**Revisionsabhängige Bauteilliste — vor dem Design prüfen:** Der [Huangshan-Pi-Leitfaden][Originalleitfaden Huangshan Pi von SiFli] von SiFli in der Version V1.0.0 nennt Lader SY6103, OVP SY5320 und RGB-LED SK6812MINI-HS. Das [LCKFB-Hardware-Wiki] ohne Versionsangabe führt stattdessen AW32001ECSR in der Funktionsliste und AW23001ECSR im Abschnitt zur Ladung sowie OVP LP5305AQVF und RGB-LED WS2812B-2020 auf. Die Quellen legen nicht fest, ob diese Unterschiede eine Hardware-Revision widerspiegeln oder auf veralteter Dokumentation beruhen. Verwenden Sie die Werte aus SiFli V1.0.0 nur für diese dokumentierte Referenz; prüfen Sie tatsächliche Board-Kennzeichnung, Schaltplan und Stückliste, bevor Sie sich auf bauteilspezifisches Verhalten verlassen.

## Lieferumfang { #package-contents }

Das Huangshan-Pi-Board-Set ist als enthaltend dokumentiert:

- Kernplatine
- Bildschirmplatine
- Akku
- Lautsprecher

Prüfen Sie den Lieferumfang des gekauften Kits, bevor Sie einen Laboraufbau planen, da sich Zubehörpakete je nach Verkäufer oder Produktionscharge unterscheiden können.

## Stromversorgung und Akku { #power-and-battery }

Das Board unterstützt zwei Hauptbetriebsarten der Versorgung:

- USB-Type-C-Versorgung
- Eigenständiger Akkubetrieb

Der Akkueingang ist für eine einzelne Li-Ion-Zelle mit einem GH1.25mm-Steckverbinder in gerader Pinreihenfolge vorgesehen. Die dokumentierte Ladekonfiguration unterstützt einen maximalen Ladestrom von 500 mA, mit 450 mA als Standardeinstellung für den Konstantstrom.

Wird das Board ohne Akku betrieben und VBAT aus einem Labornetzteil gespeist, beträgt der dokumentierte Eingangsbereich von VBAT 3,7 V bis 4,7 V, wobei 3,8 V für Versorgungstests bei Normalspannung empfohlen werden. Die Schwellen des SF32LB52-MOD-1-N16R8 sind mit 3,58 V zum Einschalten und 3,48 V zum Ausschalten dokumentiert.

Der Hardware-Leitfaden von LCKFB warnt, dass die Funktion der Taste für langes Drücken möglicherweise nicht funktioniert, wenn kein Akku angeschlossen ist. Prüfen Sie dieses Verhalten an der genauen Board-Revision und mit der vorgesehenen Versorgung.

## Jumper für die Leistungsmessung { #power-measurement-jumpers }

Das Board führt Jumper für Strommessungen an den wichtigsten Versorgungspfaden heraus.

<div align="center"><em>Zuordnung der Jumper für die Leistungsmessung</em></div>

<div align="center" markdown>

| Pins | Pfad | Zweck |
| :--- | :--- | :--- |
| 5-6 | VBAT-Pfad | Strommesser zwischen Akku/Lader und nachgelagertem System einfügen |
| 7-8 | VSYS-Pfad | Strommesser in den VSYS-Pfad einfügen |
| 11-12 | VCC_3V3-Pfad | Strommesser in die 3,3-V-Hauptschiene einfügen |

</div>

Im Normalbetrieb müssen die Pins 5-6, 7-8 und 11-12 mit Jumpern überbrückt sein. Entfernen Sie den jeweiligen Jumper nur, wenn Sie einen Strommesser oder Leistungsanalysator einfügen.

## Download und Debug { #download-and-debug }

Verwenden Sie die UART-Schnittstelle über USB Type-C für Firmware-Download, serielle Logs und die Board-Versorgung bei der normalen Entwicklung.

Erforderliche Hardware für die erste Inbetriebnahme:

- Board SF32LB52-DevKit-ULP / 立创黄山派
- USB-2.0-Datenkabel
- Host-Rechner mit Windows, Linux oder macOS

Optionale Hardware:

- Externer Lautsprecher
- TF-Karte
- Li-Ion-Akku mit 450 mAh oder mehr
- Zweites USB-Kabel, wenn UART-Debug und nativer USB-Test gleichzeitig benötigt werden

Verwenden Sie ein echtes datenfähiges USB-Kabel. Reine Ladekabel können das Board versorgen, stellen aber die serielle Datenschnittstelle nicht bereit.

## SDK-Build-Targets { #sdk-build-targets }

Das SDK von SiFli verwendet mit `scons --board=<board_name>` den genauen Board-Target-Namen `sf32lb52-lchspi-ulp`. Dies ist ein Build-Target-Bezeichner des SDK und nicht zwingend der auf einem Board oder Modul aufgedruckte Produktname. Bestätigen Sie das Target anhand des [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und der Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK für die verwendete SDK-Revision.

## Wichtige Signalzuordnungen { #key-signal-assignments }

<div align="center"><em>Wichtige Signalzuordnungen</em></div>

<div align="center" markdown>

| Signal | Funktion |
| :--- | :--- |
| PA44 | VBUS_DET, Erkennung angeschlossener Ladequelle |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN |
| PA41 | Touch-Interrupt |
| PA40 / PA39 | Sensor-I2C1 SCL / SDA laut GPIO-Zuordnungstabelle; siehe die Abweichung bei den Header-Pins weiter unten |
| PA38 | Steuerung des Schalters von VSYS zu VSYS_1 |
| PA37 / PA33 | Touch-I2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | HOME-Taste und Reset durch langes Drücken (10 s) |
| PA32 | Daten der RGB-LED |
| PA31 | Sensor-Interrupt 1 |
| PA30 | Steuerung des Schalters von VSYS_1 zu HR3V3 |
| PA27 | SD-Kartenerkennung |
| PA24, PA25, PA28, PA29 | SPI1-MicroSD-Schnittstelle |
| PA20 | PWM des Vibrationsmotors |
| PA19 / PA18 | Debug-UART TXD / RXD |
| PA11 / PA10 | Lader-I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | Mikrofon-Vorspannung und -Eingang |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Analoger Audioausgang |
| PA08..PA03, PA02, PA01, PA00 | QSPI-Display, TE, PWM der Hintergrundbeleuchtung und Reset |
| PA15..PA12, PA16, PA17 | MPI2- / SD1-Signale, beim Modul N16R8 intern vom Modul-Flash genutzt |

</div>

## 30-polige Erweiterungsleiste { #30-pin-expansion-header }

Die 30-polige Leiste führt Versorgung, USB, Sensor-, displaynahe, Speicher-, Vibrations-, Debug-, Tasten- und Lader-Steuersignale heraus.

<div align="center"><em>Signalbelegung der 30-poligen Erweiterungsleiste</em></div>

<div align="center" markdown>

| Pin-Gruppe | Signale | Hinweise |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | 5 V vom USB, wenn angeschlossen; kann 5-V-Eingang sein, wenn kein USB angeschlossen ist |
| 3-4 | GND | Masse |
| 5-6 | VBAT_S / VBAT | Im Normalbetrieb überbrückt; für die Strommessung an VBAT öffnen |
| 7-8 | VSYS_S / VSYS | Im Normalbetrieb überbrückt; für die Strommessung an VSYS öffnen |
| 9-10 | GND | Masse |
| 11-12 | VCC_3V3_S / VCC_3V3 | Im Normalbetrieb überbrückt; für die 3,3-V-Strommessung öffnen |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | Die Header-Tabelle von SiFli V1.0.0 bezeichnet diese als Sensor-I2C1 SDA / SCL; Pin 14 steht im Widerspruch zur GPIO-Zuordnungstabelle (siehe unten) |
| 17 | PA32 | Daten der RGB-LED, auch als GPIO nutzbar |
| 18 | PA30 | Steuerung der Sensorversorgung; GPIO-Nutzung kann das Verhalten von PA39/PA40 beeinflussen |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | Pins für SPI1/SD-Karte; die Nutzung als Erweiterung kollidiert mit der TF-Karte auf dem Board |
| 24 | PA20 | PWM der Vibration; Nutzung als Erweiterung kollidiert mit dem Motortreiber |
| 25 / 27 | PA19 / PA18 | Debug-UART TXD / RXD |
| 26 / 28 | PA34 / PA43 | Power-/Reset-Taste und Funktionstaste |
| 29 / 30 | PA11 / PA10 | Lader-I2C0 SDA / SCL |

</div>

**Abweichung in der Pinbelegung der Quelle — vor dem Verdrahten prüfen:** Die GPIO-Zuordnungstabelle von SiFli V1.0.0 weist Sensor-I2C1_SDA PA39 zu, während die Tabelle der 30-poligen Leiste Header-Pin 14 als PB39 bezeichnet und als I2C1_SDA kennzeichnet; Pin 16 ist als PA40/I2C1_SCL aufgeführt. Die Tabellen von LCKFB wiederholen den Unterschied zwischen PA39 und PB39, nennen aber keine Board-Revision und gleichen die Einträge nicht ab. Betrachten Sie den MCU-Pad bzw. die Leitungsführung von Header-Pin 14 als ungeklärt: Prüfen Sie Schaltplan und Stückliste des genauen Boards und verifizieren Sie die Durchgängigkeit, bevor Sie eine Peripherie anschließen. Nehmen Sie nicht an, dass PA39 und PB39 austauschbar sind.

## Display- und Touch-Schnittstelle { #display-and-touch-interface }

Das Board nutzt einen AMOLED-Display-Pfad und führt einen 22-poligen QSPI-FPC-Signalsatz heraus. Die Tabelle von SiFli V1.0.0 kennzeichnet die Pins 5-10 als NC; die folgende Tabelle enthält alle 22 Positionen und benennt diese Pins ausdrücklich.

<div align="center"><em>Signalbelegung des 22-poligen QSPI-FPC für Display und Touch</em></div>

<div align="center" markdown>

| Pin | Signal | Funktion |
| :--- | :--- | :--- |
| 1 | VBAT | VBAT-Ausgang auf der Display-Seite |
| 2 | PA01 | PWM der Hintergrundbeleuchtung für TFT-Betrieb |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | Nicht angeschlossen |
| 6 | NC | Nicht angeschlossen |
| 7 | NC | Nicht angeschlossen |
| 8 | NC | Nicht angeschlossen |
| 9 | NC | Nicht angeschlossen |
| 10 | NC | Nicht angeschlossen |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | LCD-Reset |
| 13 | PA04 | QSPI/SPI-Takt |
| 14 | PB05 (FPC-Tabelle von SiFli V1.0.0) | QSPI D0 / SPI SDI; die separate GPIO-Zuordnungstabelle führt PA05 |
| 15 | PA03 | QSPI/SPI-Chip-Select |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3,3-V-Ausgang |
| 18 | PA41 | Touch-Interrupt |
| 19 | PA33 | Touch-I2C SDA |
| 20 | PA37 | Touch-I2C SCL |
| 21 | PA09 | Touch-Reset |
| 22 | GND | Masse |

</div>

**Abweichung in der Pinbelegung der Quelle — vor dem Anschluss eines Displays prüfen:** Die 22-polige FPC-Tabelle von SiFli V1.0.0 weist dem Steckverbinder-Pin 14 für QSPI D0 PB05 zu, während die separate GPIO-Zuordnungstabelle für dieses Signal PA05 führt. Auch die FPC-Tabelle von LCKFB nennt PB05, ihre GPIO-Tabelle verwendet jedoch PA05. Keine der Quellen erläutert, wie die Bezeichnungen von Modul-Pad und Steckverbinder zusammenhängen. Betrachten Sie die elektrische Verbindung als ungeklärt, bis Sie Schaltplan und Stückliste der genauen Board-Revision geprüft oder die Durchgängigkeit verifiziert haben; nehmen Sie nicht an, dass PA05 und PB05 austauschbar sind.

## Hinweise zur Leistungsmessung { #power-measurement-guidance }

Für aussagekräftige Messungen bei extrem niedrigem Energiebedarf:

- Messen Sie VBAT, VSYS und VCC_3V3 nach Möglichkeit getrennt.
- Lassen Sie den passenden Jumper für jede Schiene überbrückt, die nicht gemessen wird.
- Deaktivieren Sie vermeidbare Lasten wie RGB-LED-Effekte, Debug-Logging, Display-Aktualisierung und Sensorabfragen, bevor Sie den Ruhestrom messen.
- Halten Sie bei jeder Messung Board-Revision, Firmware-Commit, Akku- bzw. Versorgungsspannung, Jumper-Konfiguration und Sensorzustand fest.
- Messen Sie sowohl den stationären Ruhestrom als auch den Strom bei Ereignissen wie Touch, Sensor-Interrupts, Bluetooth-Aktivität, Display-Aufwachen und Vibration.

## Verwandte Dokumente { #related-documents }

[SF32LB52x-Chipeinführung]: ../chips/SF32LB52x.md
[SF32LB52x-Hardware-Designleitfaden]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Originalartikel im SiFli-Wiki]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[Originalleitfaden Huangshan Pi von SiFli]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[Board-Seite ULP im SiFli SDK]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[Modellleitfaden für Module von SiFli]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[LCKFB-Projektseite]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[LCKFB-Hardware-Wiki]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[Muster kaufen]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x-Chipeinführung]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Designleitfaden]__
- :fontawesome-brands-github: __[Originalartikel im SiFli-Wiki]__
- :fontawesome-solid-up-right-from-square: __[LCKFB-Projektseite]__
- :fontawesome-solid-book: __[LCKFB-Hardware-Wiki]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen]__

</div>
