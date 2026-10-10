---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD: displayorientiertes SF32LB52x-Entwicklungsboard für die schnelle Inbetriebnahme von Produkten mit SPI-, QSPI- und MCU/8080-Displays samt Touch, Audio, Speicher und Akkuunterstützung."
tags:
    - Hardware
    - Entwicklungsboard
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## Überblick { #overview }

Das SF32LB52-DevKit-LCD ist ein displayorientiertes Entwicklungsboard für die SF32LB52x-Familie. Es basiert auf einem SF32LB52x-Modul und ist für die schnelle Entwicklung von Produkten gedacht, die Display-Schnittstellen mit SPI, DSPI, QSPI oder MCU/8080 verwenden.

Das Board vereint auf einer Evaluierungsplattform das MCU-Modul, Display-Steckverbinder, Touch-Schnittstelle, analogen Mikrofoneingang, analogen Audioausgang, USB-C, USB-zu-UART-Debug, TF-Karten-Speicher und Akkuunterstützung. Es ist ein praktischer Ausgangspunkt für HMIs im Smartwatch-Stil, kompakte Dashboards, Display-Peripherie und andere SF32LB52x-Anwendungen, die früh in der Entwicklung einen Bildschirm benötigen.

![SF32LB52-DevKit-LCD, Vorderseite](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Vorderseite</em></div>

![SF32LB52-DevKit-LCD, Rückseite](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Rückseite</em></div>

![Blockdiagramm des SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — Blockdiagramm</em></div>

## Highlights des Boards { #board-highlights }

- SF32LB52x-Modulplattform, kompatibel mit SF32LB52-MOD-1, SF32LB52-MOD-A und SF32LB52-MOD-B
- QSPI/SPI/DSPI-LCD-Unterstützung über einen 22-poligen FPC-Steckverbinder
- 8-Bit-MCU/8080-LCD-Unterstützung über den FPC und die 40-polige Erweiterungsleiste
- Unterstützung für I2C-Touchpanels
- USB-C für Download/Debug über USB-zu-UART und für die Board-Versorgung
- Separate USB-C-Schnittstelle für USB-2.0-FS-Anwendungsfälle
- MEMS-Mikrofon und Class-D-Audio-Leistungsverstärker auf dem Board
- MicroSD-Kartensteckplatz über SPI
- Akkuanschluss und linearer Lader ETA9640P
- 40-polige Erweiterungsleiste für Display-, GPIO-, Speicher-, Audio- und Versorgungssignale

## Wann dieses Board geeignet ist { #when-to-use-this-board }

Wählen Sie das SF32LB52-DevKit-LCD, wenn das Projekt eine fertige Display-Plattform statt eines minimalen Breakout-Boards benötigt.

- QSPI-, SPI-, DSPI- oder MCU/8080-LCD-Panels in Betrieb nehmen
- Die Integration von Touchpanels validieren
- LVGL- oder eigene UI-Anwendungen auf dem SF32LB52x testen
- Mikrofoneingang und Lautsprecherausgang evaluieren
- TF-Karten-Speicher prototypisch umsetzen
- Modulvarianten vergleichen, bevor eine eigene Leiterplatte festgelegt wird

Für ein kleineres Board mit Lötrandkontakten verwenden Sie das [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Für maximale Pin-Herausführung und direkten Signalzugriff verwenden Sie das [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md).

## Hardware-Konfiguration { #hardware-configuration }

<div align="center"><em>Übersicht der Hardware-Konfiguration</em></div>

<div align="center" markdown>

| Bereich | Konfiguration |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6; 16 MB QSPI-NOR + 8 MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6; 128 MB QSPI-NAND + 16 MB OPI-PSRAM |
| Takte | 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz auf dem Modul |
| HF | Antenne auf dem Board oder IPEX-Steckverbinder, per 0-Ω-Widerstand gewählt |
| Display | QSPI/SPI/DSPI und 8-Bit-MCU/8080 |
| Touch | I2C-Touch-Schnittstelle |
| Audio | MEMS-Mikrofoneingang und Class-D-Lautsprecherverstärker |
| Speicher | MicroSD-Kartensteckplatz über SPI |
| USB | USB-Type-C für USB-zu-UART und USB-Type-C für USB 2.0 FS |
| Akku | Anschluss für einzelne Li-Ion-/Li-Poly-Zelle |
| Lader | Linearer Lader ETA9640P, Standard-Ladestrom 450 mA |

</div>

Die Board-Codes und Speicherkonfigurationen oben folgen dem [Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) von SiFli. Prüfen Sie die Revision anhand der Board-Kennzeichnung und des passenden Designpakets, bevor Sie ein Board als Design-Referenzkonfiguration verwenden.

Die Flash-Bezeichnungen für A128R16 unterscheiden sich zwischen den offiziellen Quellen: Der [OpenSiFli-Leitfaden zu Modulmodellen](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) nennt das Modul 128 MB SPI-NAND, während der Leitfaden zu Boardmodellen die entsprechende DevKit-SKU als 128 MB QSPI-NAND aufführt. Die Quellen erläutern nicht, ob dies das bestückte Bauteil oder nur die Bezeichnung der Schnittstelle betrifft. Bestätigen Sie Flash-Bauteil und Busmodus anhand von Schaltplan und Stückliste der genauen Board-Revision, bevor Sie sich auf diese Konfiguration verlassen.

## Versionshinweise { #version-notes }

<div align="center"><em>Versionshistorie des Boards</em></div>

<div align="center" markdown>

| Version | Modulbasis | Hinweise |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | SD-Kartenerkennung auf PA26 geändert. Die aktuellen SiFli-Modelllisten enthalten die beiden oben gezeigten MOD-1-Konfigurationen. |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | Überarbeitet wurden Laderschaltung, Versorgungsumschaltung, Verstärkung des Audio-Leistungsverstärkers, Reset-Verhalten, RGB-LED-Schaltung, Pinkompatibilität der Module, HF-Versorgungsfilterung, Dual-Flash-Unterstützung, SD-Kartenerkennung, optionales SDIO-WLAN, Antennen-Freihaltebereich und VBUS-Schutz |
| V1.0.0 | Früheres SF32LB52-Modul | Erste öffentliche Board-Version |

</div>

Prüfen Sie Bestückungsdruck und Designpaket der genauen Board-Revision, bevor Sie die Pinbelegung für ein Produktions-Trägerboard oder eine Prüfvorrichtung verwenden.

![SF32LB52-DevKit-LCD, annotierte Vorderseite](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — annotierte Vorderseite</em></div>

![SF32LB52-DevKit-LCD, annotierte Rückseite](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — annotierte Rückseite</em></div>

## Erste Schritte { #getting-started }

### Erforderliche Hardware { #required-hardware }

- SF32LB52-DevKit-LCD-Board
- LCD-Modul, das zur gewählten Schnittstelle passt
- USB-2.0-Datenkabel, Typ A auf Type-C oder gleichwertig
- Host-Rechner mit Windows, Linux oder macOS

### Optionale Hardware { #optional-hardware }

- Lautsprecher
- TF-Karte
- Einzelne Li-Ion-/Li-Poly-Zelle, typischerweise 450 mAh bis 500 mAh
- Zweites USB-Kabel, wenn UART-Debug und nativer USB-Test gleichzeitig benötigt werden

### Grundlegender Aufbau { #basic-setup }

1. Schließen Sie das LCD-Modul an den passenden LCD-Steckverbinder an.
2. Verbinden Sie die Type-C-Buchse für USB-zu-UART mit dem Host-Rechner.
3. Öffnen Sie SifliTrace oder das SiFli-Firmware-Download-Werkzeug.
4. Wählen Sie die erkannte serielle Schnittstelle aus.
5. Versorgen Sie das Board und laden Sie die Ziel-Firmware herunter bzw. führen Sie sie aus.
6. Prüfen Sie, nachdem das Display leuchtet, Touch, Grafik, Speicher und Audio entsprechend den Anforderungen der Anwendung.

Verwenden Sie ein echtes datenfähiges USB-Kabel. Reine Ladekabel können das Board versorgen, stellen aber die serielle oder die USB-Datenschnittstelle nicht bereit.

## Stromversorgung { #power }

Das SF32LB52-DevKit-LCD kann auf zwei Hauptwegen versorgt werden:

- USB-Type-C-Versorgung über einen der beiden USB-Steckverbinder
- Akkuversorgung über den Akkuanschluss auf dem Board

Verwenden Sie für Firmware-Download und normales Debugging die Type-C-Buchse für USB-zu-UART. Die Akkuversorgung ist nützlich, um Display, Audio und Energiesparverhalten ohne Kabelverbindung zu testen.

Das Board integriert den linearen Lader ETA9640P. Der maximal unterstützte Ladestrom beträgt 1 A, die Standardeinstellung für den Konstantstrom 450 mA. Verwenden Sie eine einzelne Li-Ion- oder Li-Poly-Zelle und prüfen Sie die Polarität des Steckverbinders anhand des Bestückungsdrucks, bevor Sie den Akku anschließen.

## Download und Debug { #download-and-debug }

Die USB-zu-UART-Buchse ist die primäre Schnittstelle für Firmware-Download und Logs.

- **Download-Modus**: Die Option BOOT im Download-Werkzeug aktivieren, dann das Board mit Spannung versorgen oder zurücksetzen.
- **Debug-/Log-Modus**: Die Option BOOT deaktivieren, dann das Board mit Spannung versorgen oder zurücksetzen, um in den normalen Betrieb mit seriellem Log zu gelangen.

Einige SF32LB52x-Boards nutzen das RTS-Signal des USB-zu-UART-Bausteins für den Reset. Wenn das Board beim ersten Öffnen der seriellen Schnittstelle unerwartet zurückgesetzt wird, deaktivieren Sie in den Einstellungen der seriellen Schnittstelle des Hosts die Modem- bzw. Hardware-Flusssteuerung.

![Modem-Flusssteuerung in den erweiterten Einstellungen der seriellen Schnittstelle deaktivieren](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Modem-Flusssteuerung in den Einstellungen der seriellen Schnittstelle deaktivieren</em></div>

## LCD- und Touch-Schnittstelle { #lcd-and-touch-interface }

Das Board unterstützt QSPI-LCD-Panels über einen 22-poligen FPC-Steckverbinder mit 0,5 mm Raster. Der Steckverbinder ist eine vertikale Ausführung mit Klappverriegelung. Verwendet ein Panel eine andere Pinreihenfolge, setzen Sie vor dem Anschließen eine Adapterplatine ein.

Unterstützte LCD- und Touch-Funktionen:

- SPI-, DSPI- und QSPI-LCD-Signalisierung
- QSPI-LCD-Signalisierung im DDR-Modus
- 8-Bit-MCU/8080-LCD-Signalisierung
- LCD-Reset, Chip-Select, Takt, Daten, TE und PWM der Hintergrundbeleuchtung
- SDA/SCL, Interrupt und Reset des I2C-Touchpanels

Die ursprüngliche Board-Notiz von SiFli nennt `TFT-H043A28WQISTKN22_V0-3` als unterstütztes Displaymodell.

### Signalbelegung des 22-poligen QSPI-FPC { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>Signalbelegung des 22-poligen QSPI-FPC</em></div>

<div align="center" markdown>

| Pin | Signal | Funktion |
| :--- | :--- | :--- |
| 1 | LEDK | LCD-Hintergrundbeleuchtung, Kathode |
| 2 | LEDA | LCD-Hintergrundbeleuchtung, Anode |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | LCD-Reset |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3,3-V-Ausgang |
| 18 | PA31 | Touch-Interrupt |
| 19 | PA33 | Touch-I2C SDA |
| 20 | PA30 | Touch-I2C SCL |
| 21 | PA09 | Touch-Reset |
| 22 | GND | Masse |

</div>

**Quellenabweichung bei der Polzahl — vor dem Anschluss eines Displays prüfen:** SiFli beschriftet Steckverbinder und Signaltabelle als 22-polig, nummeriert die Kontakte in der zugehörigen Anschlusszeichnung jedoch von 1 bis 24 und kennzeichnet die Pins 22–24 als GND. Die Quelle gleicht diese Abweichung nicht ab. Prüfen Sie den physischen Steckverbinder und den Schaltplan der genauen Board-Revision, bevor Sie ein Flexkabel auswählen oder verdrahten; nehmen Sie nicht an, dass ein 22-poliges Kabel in einen Steckverbinder mit 24 Positionen passt.

## Wichtige Pinzuordnungen des Moduls { #key-module-pin-assignments }

![Definition der 40-poligen Stiftleiste des SF32LB52-DevKit-LCD](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>Definition der 40-poligen Stiftleiste</em></div>

<div align="center"><em>Wichtige Pinzuordnungen des Moduls</em></div>

<div align="center" markdown>

| Modul-Pin | Signal | Funktion auf dem Board |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | Erkennung angeschlossener Ladequelle |
| PA43..PA37 | DB7..DB2 | MCU/8080-LCD-Daten |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | LCD-Daten |
| PA06 | DC / QSPI D1 | LCD-Daten/-Befehl |
| PA05 | RD / QSPI D0 | LCD-Daten |
| PA04 | WR / QSPI CLK | LCD-Takt |
| PA03 | CS / QSPI CS | LCD-Chip-Select |
| PA02 | TE / QSPI TE | LCD-Signal für den Tearing-Effekt |
| PA01 | BL_PWM | Steuerung der Hintergrundbeleuchtung |
| PA00 | RSTB | LCD-Reset |
| PA33 / PA30 | I2C SDA / SCL | Touchpanel |
| PA31 / PA09 | Touch INT / RST | Touchpanel |
| PA24, PA25, PA28, PA29 | SPI1 | TF-Karten-Schnittstelle |
| PA26 | Kartenerkennung / LED | Gemeinsame Funktion |
| PA20 / PA27 | UART RX/TX | Benutzer-UART |
| PA18 / PA19 | Debug-UART RX/TX | Download und Software-Debug |
| PA10 | AU_PA_EN | Freigabe des Audioverstärkers |
| MIC_ADC_IN / MIC_BIAS | Analoges Mikrofon | Mikrofoneingang |
| AU_DAC1P_OUT / AU_DAC1N_OUT | Analoges Audio | Eingang des Lautsprecherverstärkers |

</div>

## Hinweise zur Modulkompatibilität { #module-compatibility-notes }

- Beim SF32LB52-MOD-1 ist Pin 17 ein 3,3-V-Ausgang, der standardmäßig deaktiviert ist und per Software aktiviert werden muss.
- Beim SF32LB52-MOD-A/B ist Pin 17 ein 3,3-V-Versorgungseingang.
- Beim SF32LB52-MOD-1 ist Pin 27 ein VBAT-Eingang von 3,2 V bis 4,7 V.
- Beim SF32LB52-MOD-A/B ist Pin 27 ein 3,3-V-Versorgungseingang.
- Beim SF32LB52-MOD-1 beträgt die Einschaltschwelle von VBAT 3,58 V und die Ausschaltschwelle 3,48 V. Für Tests ohne Akku werden 3,8 V an VBAT empfohlen.
- PA21 an Modul-Pin 62 steht nur beim SF32LB52-MOD-A/B zur Verfügung. Beim SF32LB52-MOD-1 ist er nicht angeschlossen.
- Die Modul-Pins 62 bis 68 können standardmäßig intern mit dem NOR-Flash verbunden sein. Um SDIO extern zu nutzen, wählen Sie eine Modulvariante ohne internen Flash an diesen Pins.

## Audio { #audio }

Das Board enthält ein MEMS-Mikrofon und einen Audio-Leistungsverstärker.

- Nutzen Sie den Mikrofonpfad auf dem Board, um den analogen Audioeingang zu validieren.
- Nutzen Sie den Lautsprecheranschluss für Tests des Audioausgangs.
- Der externe Lautsprecherpfad unterstützt laut der ursprünglichen Board-Notiz bis zu 3 W an 4 Ω.

## Speicher { #storage }

Die MicroSD-Buchse ist über SPI angebunden. Sie eignet sich, um Dateisysteme, Bild-Assets, Logs und Datenaufzeichnung zu validieren, bevor auf ein eigenes Board gewechselt wird.

## SDK-Build-Targets { #sdk-build-targets }

Das SiFli SDK verwendet mit `scons --board=<board_name>` die folgenden genauen Board-Target-Namen:

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

Dies sind Build-Target-Bezeichner des SDK und nicht zwingend die auf einem Board oder Modul aufgedruckten Produktnamen. Der [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und die Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK können unterschiedliche Mengen aufführen; bestätigen Sie das Target anhand der verwendeten SDK-Revision.

## Verwandte Dokumente { #related-documents }

[SF32LB52x-Chipeinführung]: ../chips/SF32LB52x.md
[SF32LB52x-Hardware-Designleitfaden]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[Originalartikel im SiFli-Wiki]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[Designpaket]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[Muster kaufen]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x-Chipeinführung]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Designleitfaden]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[Originalartikel im SiFli-Wiki]__
- :fontawesome-solid-download: __[Designpaket]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen]__

</div>
