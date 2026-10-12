---
icon: lucide/microchip
description: "SF32LB52x: kostenoptimierte MCU-Familie mit zwei Arm-Cortex-M33-Kernen für Wearables und kompakte AIoT-Produkte. Umfasst akkubetriebene SF32LB520/3/5/7 und extern versorgte Varianten 52B/D/E/G/J."
tags:
    - Hardware
    - Chip
---

# SF32LB52x { #sf32lb52x }

## Überblick { #overview }

SF32LB52x ist die kostenoptimierte MCU-Familie von SiFli für Wearables im Einstiegssegment, kompakte grafische HMI-Geräte, Bluetooth-Peripherie und andere platzbeschränkte AIoT-Produkte, die integrierte Display-, Audio-, Speicher- und Funkfunktionen benötigen.

Die Plattform kombiniert einen Anwendungskern Arm Cortex-M33 STAR-MC1[^1] mit 240 MHz und einen dedizierten 24-MHz-Bluetooth-Controller-Kern für den Low-Power-Betrieb. Dadurch kann der Chip eine reaktionsschnelle Benutzeroberfläche und den Anwendungs-Stack ausführen, während Bluetooth-Konnektivität und Always-on-Aufgaben auf einem separaten Kern laufen.

Für die Produktplanung lassen sich die wichtigsten Varianten im Chip-Modellleitfaden von SiFli nach ihrer Versorgung in zwei Gruppen gliedern:

- **SF32LB520/3/5/7**: akkubetriebene Lithium-Ionen-Varianten mit integriertem Ladepfad
- **52B/D/E/G/J**: extern versorgte Varianten, wobei 52B/E/G/J auf Standard-3,3-V-Systeme zielen und **52D** auf eine spezielle 1,8-V-Ultra-Low-Power-Schiene

Diese Gruppen sind auf Board-Ebene nicht austauschbar. Akkubetriebene und extern versorgte Varianten sind untereinander nicht pinkompatibel. Die 1,8-V-Variante 52D unterscheidet sich zudem elektrisch von der 3,3-V-Gruppe 52B/E/G/J, auch wenn die Gehäuselayouts ähnlich aussehen.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. In kompatiblen SF32-Geräten ordnet SiFli STAR-MC1 als Anwendungsprozessor der Cortex-M33-Klasse ein. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, die für das genaue SF32-Gerät zu prüfen sind. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

## Anwendungen { #applications }

**SF32LB52x empfiehlt sich für** Bluetooth-zentrierte Produkte, bei denen Kosten, Integration und Akkulaufzeit die wichtigsten Designkriterien sind, darunter:

- Smartwatches im Einstiegssegment und Fitnessarmbänder
- Bluetooth-Module und Funkadapter
- Bluetooth-Audiozubehör
- Intelligente Sensoren und Wearables
- Elektronische Regaletiketten und Smart Badges
- Tragbare Etikettendrucker
- Displays für E-Bikes und E-Scooter
- Einfache HMI-Geräte auf LVGL-Basis

## Entwicklungsressourcen { #development-resources }

[Product Brief (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Datasheet (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Product Brief (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Datasheet (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung (SF32LB520/3/5/7)][Product Brief (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Datenblatt (SF32LB520/3/5/7)][Datasheet (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung (extern versorgte Familie SF32LB52X)][Product Brief (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Datenblatt (extern versorgte Familie SF32LB52X)][Datasheet (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch][User Manual]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (520/3/5/7)][Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (52B/D/E/G/J)][Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Arm-Cortex-M33-STAR-MC1-Anwendungskern mit bis zu 240 MHz sowie DSP und MPU
- Dedizierter Arm-Cortex-M33-STAR-MC1-Bluetooth-Controller-Kern mit 24 MHz
- 32 KB Instruktions-Cache + 16 KB Daten-Cache
- 512 KB Anwendungs-SRAM plus 64 KB SRAM für den Bluetooth-Controller
- Variantenabhängige Speicheroptionen im Gehäuse von 1 MB QSPI-NOR bis 16 MB OPI-PSRAM

### Grafik und Audio { #graphics-and-audio }

- ePicasso-2.0-2D/2.5D-Grafikbeschleuniger
- eZip-2.0-Hardware-Decoder für verlustfreie Grafikkompression
- Dedizierter LCD-Controller mit Unterstützung für SPI/DSPI/QSPI, einschließlich E-Paper-SPI, sowie 8080-8bit
- 1 × 24-Bit-Audio-ADC mit 99 dB SNR
- 1 × 24-Bit-Audio-DAC mit 109 dB SNR

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth 5.3 (Classic Bluetooth und BLE)
- Maximale Sendeleistung:
    - 19 dBm für BLE/BR
    - 13 dBm für BT/EDR2 und BT/EDR3
- Empfindlichkeit: −100 dBm bei BLE mit 1 Mbit/s
- Dedizierter Arm-Cortex-M33-STAR-MC1-Bluetooth-Controller-Kern mit 64 KB SRAM bei 24 MHz
- Schlafstrom: 2 µA laut Produktkurzbeschreibung; der Standby-Strom auf Systemebene hängt vom Betriebsmodus und von Leckströmen auf Board-Ebene ab

### Sicherheit { #security }

- Hardware-Beschleuniger für AES/HASH/CRC
- TRNG
- PSA Certified Level 1

### Peripherie und I/Os { #peripherals-and-ios }

- 3 × UART
- 4 × I2C
- 2 × SPI
- 1 × USB 2.0 FS
- 1 × I2S
- 1 × PDM-Schnittstelle (bis zu zwei digitale Mikrofone)
- 1 × SD 3.0/SDIO 3.0/eMMC
- 1 × 12-Bit-ADC für allgemeine Anwendungen
- Temperatursensor
- RTC und Watchdog-Timer
- 44 oder 45 GPIOs, je nach Variantenfamilie

### Stromversorgung { #power-supply }

- **Akkubetriebene Gruppe: SF32LB520/3/5/7** — für die direkte Versorgung aus einer Li-Ion-/Li-Po-Einzelzelle und für Designs mit integrierter, auf das Laden ausgelegter Versorgungsarchitektur gedacht.

- **Extern versorgte 3,3-V-Gruppe: 52B/E/G/J** — für geregelte externe Versorgungssysteme gedacht; die Bausteine sind untereinander pinkompatibel.

- **Extern versorgte 1,8-V-Gruppe: SF32LB52D** — für spezielle, besonders stromsparende 1,8-V-Designs gedacht und elektrisch nicht mit den 3,3-V-Bauteilen austauschbar.

Diese Gruppen beruhen auf unterschiedlichen Siliziumkonfigurationen und sind **untereinander nicht pinkompatibel**.

## Familienvarianten { #family-variants }

Für die im Chip-Modellleitfaden von SiFli aufgeführten Schlüsselvarianten ergibt sich für die praktische Bauteilauswahl folgende Aufteilung:

- **SF32LB520/3/5/7**: akkubetriebene Lithium-Ionen-Gruppe, innerhalb der Gruppe pinkompatibel
- **52B/E/G/J**: extern versorgte 3,3-V-Standardgruppe, innerhalb der Gruppe pinkompatibel
- **SF32LB52D**: spezielle extern versorgte 1,8-V-Variante für besonders stromsparende Anwendungen

Wenn Sie zwischen Speicherausbaustufen wechseln, dienen die folgenden Zuordnungen als Orientierung:

- 520 ↔ 52B
- 523 ↔ 52E, mit 52D als 1,8-V-Gegenstück
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>Wichtige SF32LB52x-Varianten</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Gehäuse | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Größe | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm | 7 × 7 × 0,85 mm |
| Rastermaß | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIOs | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Speicher im Gehäuse | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| Versorgungsspannungsbereich | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 3,2–4,7 V | 2,97–3,63 V | 2,97–3,63 V | 1,71–1,98 V | 2,97–3,63 V | 2,97–3,63 V | 2,97–3,63 V |
| I/O-Spannung | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatur | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C | −40 bis +85 °C |

</div>

Diese Tabelle folgt den wichtigsten Varianten im [Chip-Modellleitfaden](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) von SiFli; sie ist kein vollständiger Bestellkatalog. Das verlinkte Datenblatt der extern versorgten Familie führt außerdem den **SF32LB52HUD6** auf (1,8 V, QFN68L, 128 Mb PSRAM), während der Hardware-Leitfaden zusätzlich die Suffixmuster `52AUx6` und `52D/F/HUx6` verwendet. Die verfügbaren Quellen enthalten keine konsistente, zusammengeführte Variantentabelle. Prüfen Sie vor der Designfreigabe Bestellstatus, Versorgungsgrenzen, Speicherschnittstelle und I/O-Details jeder solchen SKU im aktuellen Datenblatt.

## Integrationspfad { #integration-path }

Mit diesen Schritten überführen Sie eine Vorauswahl für SF32LB52x in ein validiertes Design:

1. **Firmware-Basis validieren.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) und nutzen Sie anschließend den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um die benötigte Peripherie und das Bluetooth-Verhalten zu prüfen.
2. **Integrationsform wählen.** Prüfen Sie, ob das [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) als fertig integriertes RF-Modul zum Produkt passt. Andernfalls nutzen Sie das am besten passende [SF32LB52-Entwicklungsboard](../devkits/SF32LB52-DevKit-LCD.md), um Firmware und Peripherie frühzeitig zu validieren.
3. **Hardware entwerfen und prüfen.** Nutzen Sie den hier bereitgestellten [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) und die zugehörigen Checklisten für [Schaltplan](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) und [PCB-Layout](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md), bevor Sie Schaltplan oder Layout freigeben. Bestätigen Sie die passende Versorgungsfamilie: 520/3/5/7, 52B/E/G/J oder 52D.
4. **Maßgebliche Quelle prüfen.** Prüfen Sie das zutreffende [Datenblatt](#development-resources) und den SiFli-[Hardware-Design-Leitfaden für 520/3/5/7] bzw. den [Hardware-Design-Leitfaden für 52B/D/E/G/J] anhand des genauen bestellbaren Bauteils und Gehäuses.

## Verwandte Produkte { #related-products }

### Modul { #module }

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) kombiniert den SF32LB525UC6, der in der Standardkonfiguration 8 MB OPI-PSRAM im Gehäuse hat, mit einem RF-Anpassnetzwerk. Das Modul misst 27,9 × 18,0 × 3,1 mm und eignet sich für Projekte, die Funktionen der SF32LB52-Leistungsklasse benötigen, ohne selbst RF-Layout und -Validierung auf Chip-Ebene übernehmen zu wollen.

### Entwicklungsboards { #development-kits }

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) ist das wichtigste displayorientierte Inbetriebnahme-Board für das SF32LB52-Modul-Ökosystem, mit QSPI- und MCU/8080-LCD-Anbindung.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) ist das kompakte, extern versorgte Core-Board für schnelle Firmware-, GPIO- und Low-Power-Inbetriebnahme mit Bauteilen der Klasse 52B/52J.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) ist das kleinste Entwicklungsboard der 52er-Serie und eignet sich, wenn das Zielprodukt möglichst kompakt sein muss.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) eignet sich für akkuorientierte Evaluierungen und kompakte Produktexperimente mit Fokus auf niedrigen Energieverbrauch.

### Referenzprodukte { #reference-products }

Typische SF32LB52-Designs umfassen Smartwatches im Einstiegssegment, Fitnessarmbänder, Bluetooth-Zubehör, kompakte grafische Bedienelemente, elektronische Regaletiketten, Smart Badges, tragbare Etikettendrucker sowie kostensensible Displays für E-Bikes oder E-Scooter.

!!! note "Automatisch generierter Inhalt"
    Diese Seite wurde ohne vorhandenes Quelldokument zusammengestellt bzw. entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
