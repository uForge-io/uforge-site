---
icon: lucide/microchip
description: "SF32LB56x: fortschrittliche Ultra-Low-Power-Dual-Mode-Bluetooth-MCU-Familie für anspruchsvollere Displays, integriertes Audio, externen Speicher und Always-on-Verarbeitung."
tags:
    - Hardware
    - Chip
---

# SF32LB56x { #sf32lb56x }

## Überblick { #overview }

Die Serie SF32LB56x ist eine fortschrittliche AIoT-Mikrocontrollerfamilie mit extrem niedrigem Energiebedarf für Produkte, die Dual-Mode-Bluetooth, anspruchsvollere Grafik, integriertes Audio, externen Speicher sowie mehr Display- und Speicherflexibilität benötigen als die SF32LB-Bausteine der unteren Klassen.

Sie nutzt eine big.LITTLE-Dual-Core-Architektur mit einem Hochleistungs-Anwendungsprozessor Arm Cortex-M33 STAR-MC1[^1] mit bis zu 240 MHz und einem Arm-Cortex-M33-STAR-MC1-Prozessor mit extrem niedrigem Energiebedarf und bis zu 96 MHz. Durch diese Aufteilung kann der Hauptkern Lasten aus UI, Display, Speicher und Produktlogik übernehmen, während der Low-Power-Kern Always-on-Sensorik, Standby-Verhalten und Bluetooth-Steuerung mit geringerem Energiebudget abwickelt.

Die offizielle Produktkurzbeschreibung und das Datenblatt von SiFli positionieren SF32LB56x als höher integrierte Lösung für vernetzte Geräte mit umfangreichen Display- und Audiofunktionen. Die Familie bietet Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung, ePicasso-2.0-Grafik, integrierte Audio-ADC/DAC-Pfade, einen auf TinyML ausgerichteten Beschleuniger, Flash-Optionen im Gehäuse sowie breitere Unterstützung für externen Speicher und Display-Schnittstellen. In der Praxis passt sie gut, wenn ein Design bei Funk-, Display- oder Audio-Komplexität über SF32LB55x hinausgewachsen ist, aber weiterhin mit einem Energiebedarf und Integrationsgrad auf MCU-Niveau auskommen soll.

Auch der Chip-Modellleitfaden von SiFli ist hier wichtig: Die Familie SF32LB56x unterstützt je nach Gehäuse unterschiedliche Kombinationen von Display-Schnittstellen. Genaue Teilenummer und Gehäusewahl sind daher eine Architekturentscheidung ersten Ranges und kein spätes PCB-Detail.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. In kompatiblen SF32-Geräten dokumentiert SiFli STAR-MC1 als Anwendungsprozessor Arm Cortex-M33 STAR-MC1. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, die für das genaue SF32-Gerät zu prüfen sind. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

## Anwendungen { #applications }

**SF32LB56x empfiehlt sich für** Dual-Mode-Bluetooth-Produkte, die bessere Display-, Audio-, Speicher- oder lokale Verarbeitungsfähigkeit benötigen, darunter:

- Smartwatches und Smart-Armbänder
- Grafische Wearable-Produkte
- Medizin- und Gesundheitsgeräte
- Vernetzte HMI-Produkte
- Industrielle Handterminals
- Smarte Schlösser und intelligente Haushaltsgeräte
- Low-Power-Sensor-Hubs
- Fortschrittliche Displays für E-Bikes und E-Scooter

Wählen Sie SF32LB56x, wenn das Design eine oder mehrere dieser Fähigkeiten benötigt:

- Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung
- Integrierter HiFi-Audio-ADC und -DAC
- Anspruchsvollere Display- und Grafiklasten
- Unterstützung der DPI/RGB-Display-Schnittstelle
- Externes WLAN über SDIO; externer Speicher über SD/SDIO oder eMMC
- Höhere GPIO-Anzahl über die Option WBBGA175
- Mehr Spielraum für gleichzeitiges TinyML, Audio und UI

## Entwicklungsressourcen { #development-resources }

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-Product%20Brief%20V1p2.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-Datasheet%20V1p9p3.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-User%20mannual%20V1p0p5.pdf
[Hardware Design Guide (U, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[Hardware Design Guide (V, wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[Hardware Application Source (U)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[Hardware Application Source (V)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datenblatt][Datasheet]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch][User Manual]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (U, wiki.sifli.com)][Hardware Design Guide (U, wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (V, wiki.sifli.com)][Hardware Design Guide (V, wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweis-Quelle (U)][Hardware Application Source (U)]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweis-Quelle (V)][Hardware Application Source (V)]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[SDK-Dokumentation][SDK Documentation]__
- :fontawesome-solid-book-open: __[API-Referenz][API Reference]__
- :fontawesome-solid-list-check: __[Quelle der Hardware-Design-Checkliste][Hardware Design Checklist Source]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Hochleistungs-Anwendungsprozessor Arm Cortex-M33 STAR-MC1 (HCPU), bis zu 240 MHz
- Arm-Cortex-M33-STAR-MC1-Prozessor mit extrem niedrigem Energiebedarf (LCPU), bis zu 96 MHz
- Bis zu 370 DMIPS / 984 EEMBC CoreMark auf der HCPU
- Bis zu 148 DMIPS / 394 EEMBC CoreMark auf der LCPU
- Speichersystem der HCPU: 32 KB I-Cache + 16 KB D-Cache, 800 KB SRAM einschließlich 128 KB Retention-SRAM
- Speichersystem der LCPU: 16 KB I-Cache + 8 KB D-Cache, 160 KB Retention-SRAM
- Optionen mit 512 KB oder 1 MB QSPI-NOR im Gehäuse
- Externe Speicherschnittstellen für QSPI-NOR, SPI-NAND, QPI/OPI-PSRAM, SD/SDIO und eMMC

### Grafik, Display und KI { #graphics-display-and-ai }

- ePicasso-2.0-2D/2.5D-Grafikbeschleunigung
- 4-Ebenen-Alpha-Blending plus eine Hintergrundebene
- Hardware-Drehung, -Skalierung, -Spiegelung und Umwandlung gängiger Formate
- Grafik-Engine-Last bis zu 1024 × 1024
- eZip-2.0-Dekompression für verlustfreie Grafik mit nativer Unterstützung für eZip-A-Animationen
- Über die unterstützten Varianten hinweg unterstützt der LCD-Controller die Schnittstellen 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB und JDI; die Verfügbarkeit hängt vom genauen Gehäuse und Bestellcode ab
- TurboPixel: verlustbehaftete Kompression des finalen Framebuffers mit festem Verhältnis über extDMA und Dekompression im Display-Controller, was PSRAM-Bandbreite und -Kapazität reduziert
- Matrix-Beschleuniger für neuronale Netze für TinyML-Lasten, bis zu 1,92 GOPS und über 10 TOPS/W

### Audio und drahtlose Konnektivität { #audio-and-wireless-connectivity }

- Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung
- Empfindlichkeit: -100 dBm für BLE bei 1 Mbps, -96,3 dBm für BR, -95,5 dBm für EDR2 und -88,5 dBm für EDR3
- Maximale Sendeleistung: 19 dBm für BR/BLE, 13 dBm für EDR2/EDR3
- BR-Empfangsspitzenstrom: 2,2 mA bei 3,3 V
- 1 HiFi-24-Bit-Audio-DAC mit 108 dB SNR
- 1 HiFi-24-Bit-Audio-ADC mit 99 dB SNR
- 2 PDM-Schnittstellen und 1 I2S-Schnittstelle

### Sicherheit { #security }

- Hardware-Beschleuniger für AES, HASH und CRC
- Echter Zufallszahlengenerator (TRNG)
- PSA Certified Level 1

### Peripherie und I/Os { #peripherals-and-ios }

- 6 UART-Schnittstellen
- 7 I2C-Schnittstellen
- 4 SPI-Schnittstellen
- 1 ISO7816-Schnittstelle
- 1 USB-2.0-FS-Schnittstelle
- 4 MPI-Schnittstellen
- 2 SD/SDIO/eMMC-Schnittstellen, eine 4-Bit und eine 8-Bit
- 1 universeller 12-Bit-SAR-ADC mit 8 Kanälen
- Temperatursensor
- 2 Low-Power-Spannungskomparatoren
- Peripheral Task Controller (PTC)
- Bis zu 120 GPIOs, je nach Gehäuse

### Stromversorgung und Gehäuse { #power-supply-and-package }

- Versorgungsspannungsbereich: 1,71 V bis 3,63 V
- Betriebstemperatur: -40 °C bis +85 °C
- Integrierter hocheffizienter Buck-Regler und Low-Power-LDO
- Schlafstrom mit RTC-Aufwachen: 600 nA
- Schlafstrom mit Pin-Aufwachen: 300 nA
- Gehäuseoptionen: QFN68L und WBBGA175

## Familienvarianten { #family-variants }

SF32LB56x umfasst kompakte QFN68L-Bauteile und I/O-stärkere WBBGA175-Bauteile mit unterschiedlichen integrierten Speicheroptionen. Wählen Sie den genauen Bestellcode früh, denn Unterstützung der Display-Schnittstelle, GPIO-Reserve, Speicherkapazität, PCB-Prozess und Migrationsoptionen für Module unterscheiden sich innerhalb der Familie erheblich.

Für die aufgeführten Varianten ist ein Versorgungsspannungsbereich von 1,71 V bis 3,63 V und ein Betriebstemperaturbereich von -40 °C bis +85 °C dokumentiert. Die GPIO-Versorgungsdomänen unterstützen 1,71 V bis 3,45 V; die I/O-Versorgungsschienen des Speichers im Gehäuse haben eigene Grenzwerte. Prüfen Sie den passenden Hardware-Leitfaden für die U- bzw. V-Variante, bevor Sie Schnittstellenpegel festlegen.

**Dokumentationsabweichung bei `SF32LB566VCB36`:** Der [SiFli-Chip-Modellleitfaden](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt 1 MB QSPI-NOR im Gehäuse auf, während die Bestellinformationen im früheren [Datenblatt DS5601 V1.9.2](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-Datasheet%20V1p9p2.pdf) 4 Mb (0,5 MB) nennen. Der aktuelle [Produktindex](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst) von SiFli verweist auf DS5601 V1.9.3, dessen Bestellinformationen in dieser Prüfung nicht verifizierbar waren; nehmen Sie weder an, dass die ältere Abweichung fortbesteht, noch dass sie korrigiert wurde. Diese Tabelle folgt dem Chip-Modellleitfaden. Prüfen Sie den Eintrag in V1.9.3 oder bestätigen Sie Bestellcode und ausgelieferte Speicherkonfiguration bei SiFli, bevor Sie die Stückliste abschließen.

<div align="center"><em>Repräsentative Varianten der Familie SF32LB56x</em></div>

<div align="center" markdown>

| Beispielteil | Gehäuse | HCPU- / LCPU-GPIOs | Integrierter Speicher | Display-Schnittstelle | Typische Eignung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB QSPI-NOR-Flash | QSPI | Einstiegs-Wearable, E-Paper oder kompakte HMI-Designs der 56er-Serie mit geringstem Speicherbedarf und einfachstem PCB-Breakout |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB OPI-PSRAM + 512 KB QSPI-NOR-Flash | QSPI | Kompakte Grafikdesigns, die Framebuffer-Reserven über die Basisstufe 560 hinaus benötigen |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB OPI-PSRAM + 512 KB QSPI-NOR-Flash | QSPI | Kompakte UI-Designs mit höherer Auflösung, die weiterhin den kostengünstigeren QFN-Weg wählen |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB OPI-PSRAM + 512 KB QSPI-NOR-Flash | QSPI | Speicherintensive kompakte Produkte, die größere lokale Ressourcen benötigen, ohne auf BGA zu wechseln |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | 8 MB + 4 MB OPI-PSRAM + 1 MB QSPI-NOR-Flash | DPI / QSPI / 8080 / JDI | Voll ausgestattete Wearable- und HMI-Designs mit vielfältigeren Display-Optionen, höherer I/O-Zahl und genau dem Silizium, das im SF32LB56-MOD verwendet wird |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB OPI-PSRAM + 1 MB QSPI-NOR-Flash | DPI / QSPI / 8080 / JDI | Designs mit hoher I/O-Zahl, die einen größeren einzelnen PSRAM-Pool und fortgeschrittenes Display-Routing priorisieren, ohne die Standard-Chipwahl des Moduls zu nutzen |

</div>

## Integrationspfad { #integration-path }

Mit dieser Abfolge machen Sie aus einer SF32LB56x-Vorauswahl ein validiertes Design:

1. **Firmware-Pfad nachweisen.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) und nutzen Sie dann den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um den Ziel-Pfad für Display, Audio, Bluetooth und Speicher zu erproben.
2. **Integrationslösung wählen.** Evaluieren Sie [SF32LB56-MOD](../modules/SF32LB56-MOD.md), um den Integrationsaufwand für RF und Hochgeschwindigkeitsspeicher zu verringern, oder nutzen Sie [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) für die Validierung auf Board-Ebene.
3. **Hardware entwerfen und prüfen.** Nutzen Sie den lokalen [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) — einschließlich seiner Checklisten für [Schaltplan](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md) und PCB-Layout —, bevor Sie Schaltplan oder Layout freigeben. Halten Sie die Wahl von U/V-Gehäuse und Display-Schnittstelle konsistent mit dem gewählten Bauteil.
4. **Maßgebliche Quelle prüfen.** Bestätigen Sie das genaue bestellbare Bauteil und Gehäuse anhand von SiFli-[Datenblatt][Datasheet], [Benutzerhandbuch][User Manual], dem zutreffenden [U-Hardware-Design-Leitfaden][Hardware Design Guide (U, wiki.sifli.com)] bzw. [V-Hardware-Design-Leitfaden][Hardware Design Guide (V, wiki.sifli.com)] und der entsprechenden [Quelle des U-Hardware-Anwendungshinweises][Hardware Application Source (U)] bzw. [Quelle des V-Hardware-Anwendungshinweises][Hardware Application Source (V)].

<!-- uf-faq:start -->
## Häufig gestellte Fragen { #frequently-asked-questions }

**Was sind die wichtigsten Spezifikationen des SF32LB56x?**
Der SF32LB56x kombiniert eine Anwendungs-CPU (Cortex-M33 @240 MHz) mit einem Low-Power-Kern (Cortex-M33 @48/96 MHz, mit einem vom Anwender programmierbaren Kern), 960 KB internem SRAM und Dual-Mode-Bluetooth (BT Classic + BLE). Grafik: ePicasso 2.0. Gehäuse: QFN68 / BGA175 (7 × 7 mm (QFN), 6.5 × 6.1 mm (BGA)). USB 2.0 FS. Werte auf Familienebene; prüfen Sie das Datenblatt der genauen Typnummer.

**Welche Display-Schnittstellen unterstützt der SF32LB56x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. Die Verfügbarkeit hängt von Typnummer und Gehäuse ab.

**Wie viel Speicher im Gehäuse bietet der SF32LB56x?**
Bis zu 16 MB PSRAM und bis zu 1 MB NOR-Flash im Gehäuse, abhängig von der Typnummer.

**Welche Versorgungsspannung benötigt der SF32LB56x?**
1.71–3.63 V, je nach Variante. Den genauen Bereich bestätigt das Datenblatt.

**Wo beginne ich ein Hardware-Design mit dem SF32LB56x?**
Beginnen Sie mit dem [Hardware-Design-Leitfaden für den SF32LB56x](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md) zu Schaltplan, Stromversorgung, Takt/RF und PCB-Layout und nutzen Sie vor der Freigabe die Checklisten für Schaltplan und Layout.
<!-- uf-faq:end -->

## Verwandte Produkte { #related-products }

### Modul { #module }

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) bündelt den Chip SF32LB566VCB36, Speicher, RF-Design und Antennenoptionen zu einem integrationsfertigen Modul. Es ist eine gute Wahl, wenn das Projekt die Fähigkeiten von SF32LB56x nutzen und zugleich das Risiko bei RF-Layout, Antennenanpassung, Quarzplatzierung und Integration des Hochgeschwindigkeitsspeichers senken will.

### Entwicklungsboards { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) ist ein praktischer Ausgangspunkt für Firmware-Inbetriebnahme, Display-Validierung, Audio- und Speichertests, RF-Prüfungen und Stromverbrauchsmessungen, bevor Sie sich auf ein Chip-down- oder modulbasiertes Design festlegen.

### Referenzprodukte { #reference-products }

Typische SF32LB56x-Endprodukte sind fortschrittliche Smartwatches, vernetzte HMI-Panels, Gesundheitsgeräte, industrielle Handgeräte, tragbare Messinstrumente sowie anspruchsvollere Displays für E-Bikes oder E-Scooter.
