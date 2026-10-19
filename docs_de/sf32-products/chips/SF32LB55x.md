---
icon: lucide/microchip
description: "SF32LB55x: MCU-Familie der Mittelklasse mit sehr niedrigem Energieverbrauch für Wearables und HMI-Produkte, die umfangreichere Displayfunktionen, mehr SRAM und eine größere Gehäuseauswahl als einfache Bluetooth-MCUs benötigen."
tags:
    - Hardware
    - Chip
---

# SF32LB55x { #sf32lb55x }

## Überblick { #overview }

Die Serie SF32LB55x ist eine AIoT-Mikrocontrollerfamilie der Mittelklasse mit sehr niedrigem Energieverbrauch. Sie richtet sich an BLE-vernetzte Produkte, die umfangreichere Displayfunktionen, mehr Speicherreserven und eine größere Gehäuseauswahl benötigen als einfache Bluetooth-MCUs.

Ihre big.LITTLE-Dual-Core-Architektur kombiniert zwei Arm-Cortex-M33-STAR-MC1[^1]-Prozessoren: einen leistungsstarken Anwendungskern mit bis zu 240 MHz und einen besonders sparsamen Kern mit bis zu 48 MHz. So kann der Anwendungskern anspruchsvolle UI-Aufgaben übernehmen, während der Low-Power-Kern Sensoren verarbeitet, den Standby-Betrieb steuert und BLE-Aufgaben ausführt, die im Hintergrund aktiv bleiben müssen.

Die offizielle Produktkurzbeschreibung und das Datenblatt von SiFli nennen BLE 5.2, die 2.5D-Grafik-Engine ePicasso, zwei LCD-Controller, einen auf TinyML ausgelegten Matrixbeschleuniger für neuronale Netze und 1 312 KB On-Chip-SRAM (1 088 KB HCPU + 224 KB LCPU). Außerdem unterstützen die Bausteine externe NOR-, NAND-, eMMC- und PSRAM-Speicher. SF32LB55x eignet sich damit für Wearables, sensorreiche Produkte und kompakte HMI-Designs, die mehr Ressourcen als SF32LB52x benötigen, aber kein Bauteil der höher angesiedelten SF32LB56x- oder SF32LB58x-Familie erfordern.

Der Chip-Modellleitfaden von SiFli weist darauf hin, dass SF32LB55x vor den späteren Familien 52/56/58 definiert wurde und seine Suffixe deshalb der neueren Nummerierungskonvention nicht vollständig folgen. Verwenden Sie bei der Bauteilauswahl die vollständige bestellbare Teilenummer und die gehäusespezifischen Fähigkeitstabellen; leiten Sie nicht alle Fähigkeiten allein aus dem Suffix ab.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. In kompatiblen SF32-Geräten dokumentiert SiFli STAR-MC1 als Anwendungsprozessor Arm Cortex-M33 STAR-MC1. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, die für das genaue SF32-Gerät zu prüfen sind. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

## Anwendungen { #applications }

**SF32LB55x empfiehlt sich für** BLE-orientierte Produkte, die eine stärkere Bedienoberfläche, größeren Arbeitsspeicher oder eine größere Gehäuseauswahl benötigen als einfache Wearable-MCUs, darunter:

- Smartwatches und Fitnessarmbänder
- Wearables zur Gesundheitsüberwachung
- Smarte Schlösser und Smart-Home-Steuerungen
- Sensorreiches, vernetztes Zubehör
- Kompakte grafische HMI-Produkte
- Digitale Eingabestifte und Zubehör für stiftbasierte Computerbedienung
- Mobile Terminals und Handheld-Controller

Wählen Sie SF32LB55x, wenn das Design eine oder mehrere dieser Fähigkeiten benötigt:

- BLE-5.2-Konnektivität mit sehr niedrigem Empfangsstrom
- Unterstützung für MIPI-DSI-Displays im Command-Modus
- Mehr SRAM für LVGL, Grafikressourcen, Sensorik oder TinyML-Workloads
- Einen vom Anwender programmierbaren Low-Power-Prozessor
- Mehr GPIOs oder eine größere Gehäuseauswahl als bei SF32LB52x
- Flexibilität bei externem NOR, NAND, eMMC, QSPI-PSRAM oder OPI-PSRAM

## Entwicklungsressourcen { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SiFli Chip Model Guide]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datenblatt][Datasheet]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch][User Manual]__
- :fontawesome-solid-file-lines: __[Originaler Designleitfaden (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweis (GitHub-Quelle)][Hardware Application Note (GitHub source)]__
- :fontawesome-solid-list: __[SiFli-Chip-Modellleitfaden][SiFli Chip Model Guide]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[SDK-Dokumentation][SDK Documentation]__
- :fontawesome-solid-book-open: __[API-Referenz][API Reference]__
- :fontawesome-solid-list-check: __[Quelle der Hardware-Design-Checkliste][Hardware Design Checklist Source]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Hochleistungsfähiger Arm Cortex-M33 STAR-MC1 als Anwendungsprozessor, bis zu 240 MHz
- Energiesparender Arm Cortex-M33 STAR-MC1, bis zu 48 MHz
- Bis zu 360 DMIPS / 965 EEMBC CoreMark auf dem Anwendungsprozessor
- Bis zu 72 DMIPS / 193 EEMBC CoreMark auf dem Low-Power-Prozessor
- 1 088 KB Anwendungs-SRAM, davon 64 KB Retention-SRAM
- 224 KB Low-Power-SRAM, vollständig Retention-SRAM
- Externe Speicherschnittstellen für NOR, NAND, eMMC, QSPI-PSRAM und OPI-PSRAM

### Grafik, Display und KI { #graphics-display-and-ai }

- 2.5D-Grafik-Engine ePicasso mit Hardware-Drehung, -Skalierung, -Spiegelung und Alpha-Blending
- eZip dekomprimiert Grafiken verlustfrei und lässt sich mit ePicasso verketten
- Die Transformationsebene von ePicasso unterstützt Auflösungen bis 640 × 640; generische Ebenen und die Display-Ausgabe unterstützen bis zu 1024 × 1024, und die Display-Ausgabe erreicht bis zu 60 fps
- Der LCD-Controller unterstützt bei geeigneten Varianten die Schnittstellen 8080, SPI, Dual-SPI, Quad-SPI, DPI, MIPI DSI und JDI-Schnittstellen für reflektive Displays; prüfen Sie die Verfügbarkeit für das gewählte Modell
- Die Framebuffer-Kompression TurboPixel lässt den LCD-Controller komprimierte Bilddaten lesen und für die Anzeige dekomprimieren, was Framebuffer-Speicher und Lesebandbreite reduziert
- Zwei LCD-Controller; Always-on-Display-Schnittstellen und Dual-Display-Fähigkeit hängen vom gewählten Modell und Gehäuse ab
- Matrix-Beschleuniger für neuronale Netze für TinyML-Workloads, bis zu 1,92 GOPS und 5,73 TOPS/W

### Drahtlose Konnektivität { #wireless-connectivity }

- Bluetooth Low Energy 5.2
- BLE-Modi mit 125 kbps, 500 kbps, 1 Mbps und 2 Mbps
- Empfindlichkeit bis −100 dBm im 1-Mbps-Modus
- Maximale Sendeleistung: 10 dBm
- Spitzenstrom im Empfang: 2,0 mA bei 3,3 V

### Sicherheit { #security }

- Hardware-Beschleuniger für AES und CRC
- Echter Zufallszahlengenerator (TRNG)
- PSA Certified Level 1

### Peripherie und Ein-/Ausgänge { #peripherals-and-ios }

- Je nach Modell stehen in der gesamten Familie bis zu 5 UART-, 6 I2C- und 4 SPI-Schnittstellen zur Verfügung; die genaue Anzahl ist unten aufgeführt.
- Die Zahl der I2S- und PDM-Schnittstellen ist modellabhängig (siehe Tabelle). An eine PDM-Schnittstelle lassen sich bis zu zwei digitale Mikrofone anschließen. Die Zahl der PDM-Schnittstellen entspricht daher nicht der Zahl der Mikrofone. Prüfen Sie außerdem, ob die benötigten Pins beim gewählten Modell verfügbar sind.

<div align="center"><em>Veröffentlichte Anzahlen der Peripherieschnittstellen und ADC-Kanäle je Modell (SS6600A8 nicht spezifiziert)</em></div>

<div align="center" markdown>

| Modell | UART | I2C | SPI | I2S | PDM | 16-Bit-Sigma-Delta-ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | Nicht spezifiziert | Nicht spezifiziert | Nicht spezifiziert | Nicht spezifiziert | Nicht spezifiziert | Nicht spezifiziert |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | Nicht vorhanden |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 Kanäle |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 Kanäle |

</div>

**Quellenhinweis zu SS6600A8:** Der aktuelle [SiFli-Chip-Modellleitfaden][SiFli Chip Model Guide] führt Gehäuse, Speicher im Gehäuse, GPIO und Display-Schnittstelle dieses Bauteils auf, spezifiziert aber nicht dessen Anzahl an UART, I2C, SPI, I2S, PDM oder Sigma-Delta-ADC. Auch Tabelle 0-1 des [Datenblatts DS5501 V1.7.2][Datasheet] enthält keine eigene Zeile für SS6600A8. Die Anzahlen sind daher mit „Nicht spezifiziert“ markiert; leiten Sie sie nicht von SF32LB551U4O5 ab, nur weil beide QFN68L verwenden. Bestätigen Sie die Konfiguration bei SiFli, bevor Sie Pins zuweisen.

- 1 × USB-2.0-FS-Host-/Device-Schnittstelle
- 1 × 10-Bit-GPADC (SAR-ADC): Das Datenblatt spezifiziert bis zu 8 Single-Ended-Eingänge oder 4 Differenzpaare mit einem Single-Ended-Eingangsbereich von 0–1,1 V
- **Quellenabweichung beim ADC:** Das [Datenblatt DS5501 V1.7.2][Datasheet] spezifiziert bis zu 8 Single-Ended-Eingänge oder 4 Differenzpaare und einen Single-Ended-Bereich von 0–1,1 V. Der [Hardware-Anwendungshinweis zu SF32LB55x][Hardware Application Note (GitHub source)] nennt 5 Kanäle und einen Eingangsbereich von 0–0,9 V. Bestätigen Sie Kanalzuordnung und Grenzwerte für das genaue Bauteil und die SDK-Revision, bevor Sie das analoge Frontend entwerfen.
- 16-Bit-Sigma-Delta-ADC mit 5 Kanälen bei den oben gezeigten Modellen in BGA145 und BGA169; bei den QFN68L-Modellen nicht vorhanden
- Temperatursensor
- 2 × Low-Power-Spannungskomparatoren
- Peripheral Task Controller (PTC)
- Die GPIO-Anzahl hängt vom Gehäuse ab; siehe die Gehäusetabelle und den weiter unten stehenden Hinweis zur Quellenabweichung.

### Stromversorgung und Gehäuse { #power-supply-and-package }

- Der Versorgungsspannungsbereich ist variantenspezifisch: 2,97 V bis 3,63 V für SS6600A8; 1,71 V bis 3,63 V für 551U4O5 und die ausgewählten BGA-Varianten
- Die Betriebstemperatur ist variantenspezifisch: −20 °C bis +70 °C für die dokumentierten QFN-Varianten; −40 °C bis +85 °C für die ausgewählten BGA-Varianten
- Integriertes Energiemanagement mit zwei hocheffizienten Buck-Reglern und Low-Power-LDO
- Schlafstrom mit RTC-Aufwachen: 600 nA
- Schlafstrom mit Pin-Aufwachen: 280 nA
- Gehäuseoptionen: QFN68L, BGA145 und BGA169

## Familienvarianten { #family-variants }

SF32LB55x-Bausteine werden in QFN- und BGA-Gehäusen angeboten. Legen Sie das Gehäuse früh fest, denn GPIO-Anzahl, integrierter Speicher, verfügbare Display-Schnittstellen und Leiterplatten-Fertigungsanforderungen unterscheiden sich je nach Gehäuse erheblich.

Die Gehäusewahl ist hier nicht nur eine Layoutentscheidung. Der [Chip-Modellleitfaden][SiFli Chip Model Guide] von SiFli weist ausdrücklich darauf hin, dass die 55x-Familie je nach Gehäuse alle oder nur einen Teil der Display-Schnittstellen unterstützt; das Gehäuse sollte daher festgelegt sein, bevor Display-, Speicher- und Pinplanung abgeschlossen werden. Bauteile im selben Gehäuse sind pinkompatibel; bestätigen Sie vor der Wahl eines kompatiblen Ersatzes die genaue Speicherkonfiguration und die Display-Anforderungen.

<div align="center"><em>Gehäusebezogene I/O-Optionen des SF32LB55x</em></div>

<div align="center" markdown>

| Gehäuse | HCPU- / LCPU-GPIOs | GPIOs gesamt | Typische Eignung |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | Kompaktes Wearable- oder BLE-Sensorprodukt mit geringeren Leiterplatten-Fertigungskosten |
| BGA145 | 55 / 40 | 95 | Display-, speicher- und sensorreiches Design mit mehr Platz für das Leiterbahn-Routing |
| BGA169 | 71 / 42 | 113 | SF32LB55x-Designs mit der höchsten GPIO-Zahl und der größten Auswahl an integriertem Speicher und Displays |

</div>

Die folgenden aktuellen Modelle aus dem Chip-Modellleitfaden von SiFli verdeutlichen die Abwägung zwischen Gehäuse und Speicher. Die Teilenummern-Suffixe dieser älteren Familie folgen der neueren Namenskonvention von SiFli nicht durchgängig. Verwenden Sie deshalb die vollständige bestellbare Teilenummer und leiten Sie die Ausstattung nicht allein aus dem Suffix ab.

<div align="center"><em>Repräsentative SF32LB55x-Varianten</em></div>

<div align="center" markdown>

| Teilenummer | Gehäuse | Integrierter Speicher | Im Modellleitfaden aufgeführte Display-Schnittstellen | Auswahlhinweise |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | Zwei 4-MB-QSPI-NOR-Bausteine, als ein 8-MB-OSPI-NOR-Baustein konfiguriert; kein PSRAM im Gehäuse | QSPI, 8080 | 49 GPIOs; 2,97 V bis 3,63 V; −20 °C bis +70 °C; kompakte Option ohne PSRAM im Gehäuse |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI-NOR-Boot-Flash + 4 MB OPI-PSRAM | QSPI, 8080 | 49 GPIOs; 1,71 V bis 3,63 V; −20 °C bis +70 °C; kompakte Option mit integriertem PSRAM |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI-NOR-Boot-Flash + 4 MB OPI-PSRAM | MIPI DSI Command-Modus, QSPI, 8080 | 95 GPIOs; −40 °C bis +85 °C; ausgewogene BGA145-Wahl für Display-Produkte mit 4 MB PSRAM |
| SF32LB555V436 | BGA145 | 4 MB QSPI-NOR-Boot-Flash + 8 MB OPI-PSRAM | MIPI DSI Command-Modus, QSPI, 8080 | 95 GPIOs; −40 °C bis +85 °C; BGA145-Option für Designs, die doppelt so viel integrierten PSRAM wie SF32LB555V4O6 benötigen |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI-NOR-Boot-Flash + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSI Command-Modus, QSPI, 8080, JDI/Sharp MIP | 113 GPIOs; −40 °C bis +85 °C; unterstützt MIPI DSI plus SPI/DSPI-Dual-Displays mit unabhängigem Inhalt |

</div>

Für den SF32LB557VD3A6 nennen der aktuelle SiFli-Chip-Modellleitfaden und Tabelle 0-1 im Datenblatt DS5501 V1.7.2 71 HCPU + 42 LCPU = 113 GPIOs. Die Feature- und Gehäuse-Zusammenfassungen des Datenblatts sowie die Produktkurzbeschreibung PB0001 V1.3 geben für BGA169 dagegen 119 GPIOs an (71 HCPU + 48 LCPU). Die offiziellen Quellen widersprechen sich also, auch innerhalb des Datenblatts. Diese Seite folgt der modellspezifischen Zeile und dem aktuellen Modellleitfaden (113). Prüfen Sie vor der Pinzuweisung oder dem Abschluss des Designs die GPIO-Verfügbarkeit anhand der Ball-Map des gewählten Gehäuses und bestätigen Sie das bestellbare Bauteil bei SiFli. Prüfen Sie außerdem Versorgungs- und Temperaturwerte der Variante, die vollständige Teilenummer und die Konfiguration des integrierten Speichers anhand des [Datenblatts DS5501 V1.7.2][Datasheet], der [Produktkurzbeschreibung PB0001 V1.3][Product Brief] und des [SiFli-Chip-Modellleitfadens]. Die Gehäuse BGA145 und BGA169 messen 7 × 7 × 0,94 mm bei 0,5 mm Rastermaß.

## Integrationspfad { #integration-path }

Mit dieser Abfolge wird aus einer SF32LB55x-Vorauswahl ein validiertes Design:

1. **Firmwarepfad validieren.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md). Nutzen Sie anschließend den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um das erforderliche Display-, Bluetooth- und Energiesparverhalten zu prüfen.
2. **Evaluierungshardware planen.** μForge führt derzeit weder ein speziell für SF32LB55 entwickeltes Modul noch ein entsprechendes Entwicklungsboard im Produktkatalog. Wählen Sie über die [SF32-Produktauswahl](../product-selector.md) die am besten passende verfügbare Evaluierungsplattform. Prüfen Sie vor der Übertragung der Ergebnisse auf ein 55x-Design, ob Gehäuse und Schnittstellen Ihren Anforderungen entsprechen.
3. **Hardware entwerfen und prüfen.** Nutzen Sie vor der Freigabe von Schaltplan und Layout den [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md) von μForge sowie die zugehörigen Checklisten für [Schaltplan](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) und PCB-Layout.
4. **Maßgebliche Quellen prüfen.** Bestätigen Sie die genaue bestellbare Teilenummer und das Gehäuse anhand des SiFli-[Datenblatts][Datasheet], des [Benutzerhandbuchs][User Manual], des [originalen Designleitfadens][Original Design Guide (wiki.sifli.com)] und der [Quelle des Hardware-Anwendungshinweises][Hardware Application Note (GitHub source)].

## Verwandte Produkte { #related-products }

### Entwicklungsboards { #development-kits }

Verwenden Sie den offiziellen Hardware-Anwendungshinweis, die Referenzschaltpläne und die Checkliste als Ausgangspunkt für die Gehäusewahl, die Auslegung der Stromversorgung, die Wahl der Display-Schnittstelle, die Speicherplanung, das RF-Layout und die Planung der Produktionstests.

### Referenzprodukte { #reference-products }

Typische SF32LB55x-Endprodukte sind Smartwatches, Fitnessarmbänder, Wearables zur Gesundheitsüberwachung, smarte Schlösser, vernetztes Zubehör, Smart-Home-Steuerungen und kompakte grafische HMIs.

!!! note "Automatisch generierter Inhalt"
    Diese Seite wurde ohne vorhandenes Quelldokument zusammengestellt bzw. entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
