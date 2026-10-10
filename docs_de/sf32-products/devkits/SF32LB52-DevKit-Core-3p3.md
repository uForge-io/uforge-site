---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3: kompaktes SF32LB52x-Evaluierungsboard mit per Jumper wählbarer MCU-Versorgung (1,8 V oder 3,3 V) und direktem Zugriff auf GPIO, Display, Audio, USB und Versorgungsschienen."
tags:
    - Hardware
    - Entwicklungsboard
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## Überblick { #overview }

Das SF32LB52-DevKit-Core-3p3 ist ein kompaktes Entwicklungsboard für die direkte Evaluierung von SF32LB52x-Chips. Ein Jumper auf dem Board wählt für die MCU eine Versorgung von 1,8 V oder 3,3 V. Die wichtigsten MCU-Signale sind über Randleisten herausgeführt, und die durchkontaktierten Randkontakte nehmen Stiftleisten ohne Löten auf. Das Board eignet sich für Entwickler, die direkten Zugriff auf GPIO, serielle Busse, Display-Signale, Audio, ADC, PWM und Versorgungsschienen benötigen.

Mit 30,88 mm × 68 mm ist das Board kompakt für Prototypen am Prüfplatz und bietet zugleich praxistaugliche Schnittstellen für die Hardware- und Firmware-Inbetriebnahme des SF32LB52x.

![SF32LB52-DevKit-Core-3p3, Vorderseite](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — Vorderseite</em></div>

![SF32LB52-DevKit-Core-3p3, Rückseite](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — Rückseite</em></div>

## Board-Varianten { #board-variants }

<div align="center"><em>Board-Varianten des SF32LB52-DevKit-Core-3p3</em></div>

<div align="center" markdown>

| Variante | MCU | Speicher im Gehäuse | Speicher auf dem Board |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB SPI-NOR-Flash | Keiner |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB SPI-NOR-Flash | Keiner |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB OPI-PSRAM | 16 MB SPI-NOR-Flash |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB OPI-PSRAM | 16 MB SPI-NOR-Flash |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB SPI-NOR-Flash |

</div>

Verwenden Sie die Varianten nur mit NOR für kompakte Bluetooth-, Steuerungs- und einfache HMI-Aufgaben. Verwenden Sie die Varianten mit PSRAM + externem NOR, wenn die Anwendung größere Grafik-Assets, Framebuffer, Dateisysteme oder Anwendungsspeicher benötigt.

**Quellenabweichung — Board-Bezeichnung vor der Auswahl prüfen:** Der [ausführliche Core-3p3-Board-Leitfaden](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html) von SiFli nennt die Konfiguration mit SF32LB52JUD6 `R16N16 V1.0.0` (aktuell), während der [Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) dieselbe Konfiguration aus JUD6 / 16 MB PSRAM / 16 MB NOR als `N16R16` aufführt. Die Zeile mit den Revisionsinformationen im ausführlichen Leitfaden gibt für EUB6 8 MB gemeinsam gehäustes PSRAM an, die Funktionsliste und die Variantentabelle jedoch 4 MB. Auch die [SF32LB52-Übersicht](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB52/SF32LB52-Overview-B3.md) von SiFli nennt für EUB6 4 MB, weshalb dieser Artikel 4 MB verwendet. Bestätigen Sie die Kennzeichnung des Boards sowie den passenden Schaltplan bzw. die Stückliste, wenn es auf das genaue Board-Suffix ankommt.

## Highlights des Boards { #board-highlights }

- SF32LB52x-MCU-Varianten mit Konfigurationen nur mit NOR oder mit PSRAM + NOR
- 48-MHz-Hauptquarz und 32,768-kHz-RTC-Quarz
- USB-Type-C-Versorgung sowie Download/Debug über USB-zu-UART mit CH340N
- PCB-Antenne auf dem Board und I-PEX-Antennenbuchse
- Per Jumper wählbare Versorgung der MCU mit 1,8 V oder 3,3 V
- USB-2.0-FS-Signale auf die Randleiste geführt
- 37 herausgeführte GPIOs; die MCU stellt 3 UARTs, 4 I2C-Schnittstellen, 2 GPTIMs, 2 SPI-Schnittstellen und 6 GPADC-Kanäle bereit
- Alle GPIOs lassen sich als UART, I2C oder GPTIM konfigurieren; das Pin-Multiplexing umfasst außerdem SPI, PWM, I2S, PDM und Weck-Eingänge
- 16-poliger FPC-Display-Steckverbinder mit 0,5 mm Raster; Display-Schnittstellen sind SPI, DSPI und Quad-SPI, mit Unterstützung für QSPI im DDR-Modus
- I2C-Touchpanel-Signale
- Analoges Mikrofon und differenzielle Audioausgangspins
- Eine Benutzer-LED
- Power-Taste und Funktionstaste
- Messpunkte für Strommessungen einzelner Versorgungsschienen; SiFli dokumentiert außerdem Leistungstests für die einzelne MCU, das minimale System und das gesamte Board

## Wann dieses Board geeignet ist { #when-to-use-this-board }

Wählen Sie das SF32LB52-DevKit-Core-3p3, wenn Sie den direktesten Zugriff auf die SF32LB52x-Signale benötigen.

- Eigene Tochterplatinen oder Sensorboards in Betrieb nehmen
- Speichervarianten des SF32LB52x evaluieren
- LCD-, Audio-, USB- und GPIO-Funktionen prototypisch umsetzen
- Den Strom einzelner Versorgungsschienen messen
- Firmware validieren, bevor eine kompakte Produkt-Leiterplatte entworfen wird

Für ein kleineres Board im Modulstil mit Lötrandkontakten verwenden Sie das [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md). Für ein fertiges Display-Board mit Audioverstärker, TF-Karten-Steckplatz und Akkulader verwenden Sie das [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Stromversorgung { #power }

Das Board unterstützt drei Versorgungseingänge:

- USB-Type-C-Versorgung, für normale Entwicklung und Debugging empfohlen
- 5-V-Eingang über die Pins 5 V und GND der Randleiste, wenn USB getrennt ist
- 3,3-V-Eingang über die Pins 3,3 V und GND der Randleiste, wenn USB getrennt ist; ein externes Labornetzteil kann verwendet werden

Ein separater Jumper auf dem Board wählt die MCU-Versorgung zwischen 1,8 V und 3,3 V. Diese Einstellung ist von den externen 1,8-V- und 3,3-V-Versorgungspins der Randleiste zu unterscheiden; prüfen Sie Pinbelegung und Schaltplan der passenden Board-Revision, bevor Sie den Jumper ändern oder externe Schaltungen versorgen.

Für Strommessungen einzelner Schienen schalten Sie ein Amperemeter an den Messpunkten des Boards in Reihe mit der zu messenden Schiene.

Ist USB Type-C angeschlossen, kann das Board über ausgewählte Pins der Randleiste auch 3,3 V, 1,8 V und 5 V ausgeben. Bestätigen Sie die erforderliche Richtung, bevor Sie externe Schaltungen anschließen.

Das Board enthält einen Versorgungsschalter. Das Signal RTS# des CH340N kann den Board-Enable steuern, sodass das Host-Werkzeug die MCU bei Download- oder Debug-Abläufen zurücksetzen kann.

## Download und Debug { #download-and-debug }

Verwenden Sie die UART-Buchse (USB Type-C) für Firmware-Download und Software-Debug.

- **Download-Modus**: BOOT im Download-Werkzeug aktivieren, dann das Board mit Spannung versorgen oder zurücksetzen.
- **Debug-/Log-Modus**: BOOT deaktivieren, dann das Board mit Spannung versorgen oder zurücksetzen.
- **Reset**: Funktion von Reset bzw. Power-Taste auf dem Board oder der werkzeuggesteuerte RTS-Reset-Pfad.

## Bedienelemente { #user-controls }

<div align="center"><em>Signale der Bedienelemente</em></div>

<div align="center" markdown>

| Funktion | GPIO | Verhalten |
| :--- | :--- | :--- |
| LED | PA32 | High-aktiv |
| KEY1 | PA34 | High-aktiv, unterstützt Reset durch langes Drücken (10 s) |
| KEY2 | PA33 | High-aktiv |

</div>

## Display-Schnittstelle { #display-interface }

Das Board unterstützt LCD-Schnittstellen mit SPI, DSPI und Quad-SPI, einschließlich QSPI im DDR-Modus, über einen vertikalen 16-poligen FPC-Steckverbinder mit 0,5 mm Raster, aufklappbarem Verriegelungsbügel und Kontakten an der Unterseite. Er führt LCD-Reset, PWM der Hintergrundbeleuchtung, TE, Chip-Select, Takt, vier Datenleitungen und I2C-Touch-Signale.

![FPC-Adapterkabel](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>FPC-Adapterkabel</em></div>

### Signalbelegung des 16-poligen LCD-FPC { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>Signalbelegung des 16-poligen LCD-FPC</em></div>

<div align="center" markdown>

| Pin | Signal | Funktion |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | PA00 | LCD-Reset |
| 3 | PA01 | Hintergrundbeleuchtung (PWM) |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | Display-Versorgungsausgang |
| 12 | GND | Masse |
| 13 | PA09 | Touch-Interrupt |
| 14 | PA11 | Touch-I2C SDA |
| 15 | PA20 | Touch-I2C SCL |
| 16 | PA10 | Touch-Reset |

</div>

Im chinesischen Board-Leitfaden von SiFli heißt es, das 1,85-Zoll-AMOLED-Modul werde direkt über ein 16-poliges FPC-Kabel angeschlossen. Der englische Leitfaden nennt stattdessen ein FPC-22p-Kabel, und der Dateiname der Abbildung lautet `FPC-22P`. Der Steckverbinder auf dem Board selbst ist 16-polig. Die Quellen lösen diese Abweichung nicht auf; prüfen Sie Polzahl und Pinbelegung des Kabels anhand des Display-Moduls, bevor Sie es anschließen.

## Signalübersicht der Randleisten { #header-signal-summary }

Das Board führt zwei 24-polige Randleisten heraus. Die erste Seite konzentriert sich auf allgemeine GPIOs, SPI2, USB, GPADC und Versorgung. Die zweite Seite konzentriert sich auf LCD, Touch, Debug-UART, Audio und Versorgung.

![Pinbelegung des SF32LB52-DevKit-Core-3p3](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>Pinbelegung des SF32LB52-DevKit-Core-3p3</em></div>

### Randleiste für allgemeine E/A { #general-io-header }

<div align="center"><em>Pinzuordnung der Randleiste für allgemeine E/A</em></div>

<div align="center" markdown>

| Pin-Bereich | Signale | Hauptfunktionen |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART, I2C, GPTIM, SPI2, Weck-Eingänge |
| 10-11 | PA36 / PA35 | USB DM / USB DP, UART, I2C, GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0, SPI1, I2S1, UART, I2C |
| 17 | 3.3V | 3,3-V-Eingang oder -Ausgang, abhängig von der USB-Versorgung |
| 18-21 | PA27..PA24 | Weck-Eingänge, SPI1, I2S1 |
| 22 | PA34 | UART, I2C, GPTIM, GPADC6, WKUP10 |
| 23-24 | PA33 / PA32 | UART, I2C, GPTIM, GPADC5 / GPADC4 |

</div>

### Randleiste für LCD, Audio und Debug { #lcd-audio-and-debug-header }

<div align="center"><em>Pinzuordnung der Randleiste für LCD, Audio und Debug</em></div>

<div align="center" markdown>

| Pin-Bereich | Signale | Hauptfunktionen |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD, Touch, PDM, I2S, UART, I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | Analoges Mikrofon und Audioausgang |
| 17 | 1.8V | 1,8-V-Eingang oder -Ausgang, abhängig von der USB-Versorgung |
| 18-20 | PA10, PA11, PA20 | PA10: CTP_RST; PA11: CTP_SDA; PA20: CTP_SCL; alle unterstützen UART, I2C und GPTIM |
| 21 | PA21 | UART, I2C, GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX, SWDIO/SWCLK, Download/Debug |
| 24 | 5V | 5-V-Eingang oder -Ausgang, abhängig von der USB-Versorgung |

</div>

## Pins für externen Flash und SDIO { #external-flash-and-sdio-pins }

Einige Varianten enthalten einen externen 16-MB-QSPI-NOR-Flash. Die gemeinsame Pingruppe für Speicher/SDIO lautet:

<div align="center"><em>Pingruppe für externen Flash und SDIO</em></div>

<div align="center" markdown>

| MCU-GPIO | Gemeinsame Funktion Flash / SDIO |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

Prüfen Sie, ob diese Pins bereits vom bestückten Flash belegt sind, bevor Sie sie für SDIO oder andere Erweiterungsfunktionen verwenden.

## Audio-Erweiterung { #audio-expansion }

Das Board führt Mikrofon-Vorspannung/-Eingang und den differenziellen DAC-Ausgang heraus. Das Mikrofon und ein Class-AB/D-Verstärker zum Ansteuern eines Lautsprechers sind extern; wählen Sie sie passend zum vorgesehenen Audiopfad aus.

## SDK-Build-Targets { #sdk-build-targets }

Die Build-Konfiguration des SiFli SDK verwendet mit `scons --board=<board_name>` die folgenden genauen Board-Target-Namen:

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

Dies sind Build-Target-Bezeichner des SDK und nicht zwingend die auf einem Board oder Modul aufgedruckten Produktnamen. Der [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und die Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK können unterschiedliche Mengen aufführen; bestätigen Sie das Target anhand der verwendeten SDK-Revision.

## Verwandte Dokumente { #related-documents }

[SF32LB52x-Chipeinführung]: ../chips/SF32LB52x.md
[SF32LB52x-Hardware-Designleitfaden]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Originalartikel im SiFli-Wiki]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[Designpaket]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[Muster kaufen]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x-Chipeinführung]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Designleitfaden]__
- :fontawesome-brands-github: __[Originalartikel im SiFli-Wiki]__
- :fontawesome-solid-download: __[Designpaket]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen]__

</div>
