---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano: kompaktes SF32LB52x-Entwicklungsboard mit Lötrandkontakten für produktnahe Prototypen, kleine Displays und Evaluierung zum Auflöten."
tags:
    - Hardware
    - Entwicklungsboard
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## Überblick { #overview }

Das SF32LB52-DevKit-Nano ist ein kleines SF32LB52x-Entwicklungsboard für kompakte Prototypen und die Evaluierung im Embedded-Umfeld. Es besitzt Lötrandkontakte (Castellated Half-Holes) rund um die Platinenkante und eignet sich daher sowohl als eigenständiges Entwicklungsboard als auch als aufgelötetes Modul in frühen Produktprototypen.

Das Board misst 51 mm × 20,32 mm und führt die wichtigsten Ressourcen des SF32LB52x für die Entwicklung mit GPIO, UART, I2C, SPI, LCD, I2S, GPADC, PWM, USB und analogem Audio heraus.

![SF32LB52-DevKit-Nano, Vorderseite](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — Vorderseite</em></div>

![SF32LB52-DevKit-Nano, Rückseite](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — Rückseite</em></div>

## Board-Varianten { #board-variants }

<div align="center"><em>Board-Varianten des SF32LB52-DevKit-Nano</em></div>

<div align="center" markdown>

| Variante | MCU | Speicher im Gehäuse | Externer Flash |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB SPI-NOR-Flash | Keiner |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB QSPI-NOR-Flash |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 128 MB QSPI-NAND-Flash |

</div>

Die Variante N4 eignet sich für kompakte Steuerungen, Bluetooth und einfache UI-Anwendungen. N16R16 kombiniert 16 MB OPI-PSRAM mit 16 MB QSPI-NOR, A128R16 kombiniert 16 MB OPI-PSRAM mit 128 MB QSPI-NAND. Beide passen zu Anwendungen, die größere Display-Assets, externe Dateisysteme oder einen Framebuffer bzw. Arbeitsspeicher im PSRAM benötigen.

**Quellenabweichung — vor der Auswahl prüfen:** Der [ausführliche Nano-Board-Leitfaden](https://wiki.sifli.com/en/board/sf32lb52x/SF32LB52-DevKit-Nano.html) von SiFli nennt seine Konfiguration mit 16 MB OPI-PSRAM + 16 MB NOR `R16N16 V1.0.0`; der [aktuelle Modellleitfaden für Entwicklungsboards](https://wiki.sifli.com/en/board/devkit_guide.html) führt dieselbe Speicherkonfiguration als `N16R16` auf und listet `A128R16` mit 16 MB OPI-PSRAM + 128 MB QSPI-NAND separat. Der ausführliche Leitfaden beschreibt A128R16 nicht gesondert. Verlassen Sie sich für diese SKU auf den Eintrag im Modellleitfaden, statt Angaben aus der Beschreibung des N16R16-Boards zu übertragen. Prüfen Sie vor der Wahl von Firmware oder Speicherlayout die Kennzeichnung des Boards sowie den aktuellen Schaltplan bzw. die Stückliste.

Auch bei den Abmessungen des Nano-Boards weichen die SiFli-Quellen leicht voneinander ab: Der ausführliche Leitfaden nennt 21 × 51 mm, der Modellleitfaden 51 × 20,32 mm. Die längere Abmessung von 51 mm stimmt überein, die kürzere unterscheidet sich um 0,68 mm. Diese Seite verwendet den genaueren Wert des Modellleitfadens; prüfen Sie die mechanische Zeichnung der konkreten Board-Revision, bevor Sie Gehäuse oder Trägerplatine entwerfen.

## Highlights des Boards { #board-highlights }

- Kompaktes Board mit 51 mm × 20,32 mm
- Lötrandkontakte an der Kante für aufgelötete Prototypen
- USB-Type-C-Versorgung sowie Download/Debug über USB-zu-UART mit CH340N
- GPIO, UART, I2C, SPI, GPADC, PWM, I2S, PDM und weckfähige Pins herausgeführt
- QSPI-LCD-Unterstützung über einen 16-poligen FPC-Pfad, üblicherweise mit einem Adapterkabel von 22 auf 16 Pins
- Unterstützung für I2C-Touchpanels
- Analoger Mikrofoneingang und differenzielle Audioausgangspins
- USB 2.0 FS auf Randkontakte geführt
- Zwei Benutzer-LEDs
- Power-Taste und Funktionstaste

## Wann dieses Board geeignet ist { #when-to-use-this-board }

Wählen Sie das SF32LB52-DevKit-Nano, wenn der Prototyp nahe am Formfaktor des Endprodukts bleiben soll.

- Kompakte Bluetooth- und Display-Prototypen aufbauen
- Das Board auf eine Trägerplatine löten
- Produktnahe Pinbelegungen testen, bevor ein eigenes Board entworfen wird
- Die Variante mit ausschließlich NOR-Flash sowie QSPI-NOR- und QSPI-NAND-Varianten mit PSRAM vergleichen
- LCD-, Audio-, Sensor- und USB-Funktionen auf kleiner Fläche in Betrieb nehmen

Für einfachere Verdrahtung am Prüfplatz und eine breitere Herausführung der Signale verwenden Sie das [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md). Für ein Board mit umfangreicher Display-Ausstattung, Lader, TF-Karte, Mikrofon und Lautsprecherverstärker verwenden Sie das [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md).

## Stromversorgung { #power }

Das Board unterstützt drei Arten der Versorgung:

- USB-Type-C-Versorgung, für die Entwicklung empfohlen
- 3,3-V-Eingang über die Randkontakte 3.3V und GND, wenn kein USB angeschlossen ist
- 5-V-Eingang über die Randkontakte 5V und GND, wenn kein USB angeschlossen ist

Ist USB Type-C angeschlossen, können ausgewählte 3,3-V- und 5-V-Pins als Ausgänge dienen. Prüfen Sie die Stromrichtung, bevor Sie externe Schaltungen anschließen.

Das Board enthält einen Versorgungsschalter, der über das Signal RTS# des CH340N gesteuert wird und ein werkzeuggesteuertes Reset-Verhalten ermöglicht.

## Download und Debug { #download-and-debug }

Verwenden Sie für Firmware-Download und serielle Logs die UART-Schnittstelle über USB Type-C.

- **Download-Modus**: Aktivieren Sie BOOT im Download-Werkzeug und versorgen Sie das Board dann mit Spannung oder setzen Sie es zurück.
- **Debug-/Log-Modus**: Deaktivieren Sie BOOT und versorgen Sie das Board dann mit Spannung oder setzen Sie es zurück.
- **RTS-Reset-Verhalten**: Wenn das Öffnen der seriellen Schnittstelle das Board unerwartet zurücksetzt oder abschaltet, deaktivieren Sie in den Einstellungen der seriellen Schnittstelle des Hosts die Modem- bzw. Hardware-Flusssteuerung.

![Modem-Flusssteuerung in den erweiterten Einstellungen der seriellen Schnittstelle deaktivieren](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>Modem-Flusssteuerung in den Einstellungen der seriellen Schnittstelle deaktivieren</em></div>

## Bedienelemente { #user-controls }

<div align="center"><em>Signale der Bedienelemente</em></div>

<div align="center" markdown>

| Funktion | GPIO | Verhalten |
| :--- | :--- | :--- |
| LED1 | PA31 | Low-aktiv |
| LED2 | PA32 | Low-aktiv |
| KEY1 | PA34 | High-aktiv, unterstützt Reset durch langes Drücken (10 s) |
| KEY2 | PA33 | High-aktiv |

</div>

## Übersicht der Randkontakte { #castellated-pin-summary }

Das Nano-Board führt zwei Gruppen von Randkontakten heraus. Die erste Gruppe enthält Audio, SPI1, Debug-UART, USB-nahe Versorgung und GPADC-fähige Pins. Die zweite Gruppe enthält SPI2, USB FS, weckfähige GPIOs und Versorgung.

### Signale am Rand der Vorderseite { #front-side-edge-signals }

<div align="center"><em>Signalbelegung am Rand der Vorderseite</em></div>

<div align="center" markdown>

| Pin | Signal | Hauptfunktion |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | DACP | Analoger Audioausgang |
| 3 | DACN | Analoger Audioausgang |
| 4 | MIC_ADC | Analoger Mikrofoneingang |
| 5 | MIC_BIAS | Mikrofon-Vorspannung |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | Masse |
| 8 | PA19 | UART0_TXD / SWCLK / Debug |
| 9 | PA18 | UART0_RXD / SWDIO / Debug |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | 3,3-V-Eingang/-Ausgang |
| 14 | GND | Masse |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | 5-V-Eingang/-Ausgang |

</div>

### Signale am Rand der Rückseite { #back-side-edge-signals }

<div align="center"><em>Signalbelegung am Rand der Rückseite</em></div>

<div align="center" markdown>

| Pin | Signal | Hauptfunktion |
| :--- | :--- | :--- |
| 1 | GND | Masse |
| 2 | 3.3V | 3,3-V-Eingang/-Ausgang |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | Masse |
| 10 | 3.3V | 3,3-V-Eingang/-Ausgang |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | 5-V-Eingang/-Ausgang |
| 16 | GND | Masse |

</div>

## LCD-Schnittstelle { #lcd-interface }

Das Board unterstützt QSPI-LCD-Panels über einen 16-poligen FPC-Signalsatz. Die ursprüngliche Board-Notiz beschreibt den Anschluss des 1,85-Zoll-AMOLED-Displays der Huangshan Pi über ein FPC-Kabel von 22 auf 16 Pins.

![FPC-Adapterkabel von 22 auf 16 Pins](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>FPC-Adapterkabel von 22 auf 16 Pins</em></div>

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

## Pins für externen Flash und SDIO { #external-flash-and-sdio-pins }

Die Variante N16R16 enthält externen 16-MB-QSPI-NOR-Flash. Die gemeinsam genutzte Pin-Gruppe für Speicher und SDIO lautet:

<div align="center"><em>Pin-Gruppe für externen Flash und SDIO</em></div>

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

Je nach Variante können diese Pins vom bestückten Flash belegt sein. Prüfen Sie die genaue Bestückung des Boards, bevor Sie sie als Erweiterungspins verwenden.

## Audio-Erweiterung { #audio-expansion }

Das Nano-Board führt den analogen Mikrofoneingang, die Mikrofon-Vorspannung und den differenziellen analogen Audioausgang heraus. Ergänzen Sie je nach Zielprodukt eine externe Mikrofonschaltung und einen Audio-Leistungsverstärker.

## SDK-Build-Targets { #sdk-build-targets }

Das SiFli SDK verwendet mit `scons --board=<board_name>` die folgenden genauen Board-Target-Namen:

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

Dies sind Build-Target-Bezeichner des SDK und nicht zwingend die auf einem Board oder Modul aufgedruckten Produktnamen. Der [Index der unterstützten Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) und die Datei [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) des SDK können unterschiedliche Mengen aufführen; bestätigen Sie das Target anhand der verwendeten SDK-Revision.

## Verwandte Dokumente { #related-documents }

[SF32LB52x Chip Introduction]: ../chips/SF32LB52x.md
[SF32LB52x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[Original SiFli Wiki Article]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[Design Package]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[Buy Samples]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x-Chipeinführung][SF32LB52x Chip Introduction]__
- :fontawesome-solid-file-lines: __[SF32LB52x-Hardware-Design-Leitfaden][SF32LB52x Hardware Design Guide]__
- :fontawesome-brands-github: __[Originalartikel im SiFli-Wiki][Original SiFli Wiki Article]__
- :fontawesome-solid-download: __[Designpaket][Design Package]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__

</div>
