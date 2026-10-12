---
icon: lucide/microchip
description: "SF32LB58x: AIoT-MCU-Familie der Flaggschiff-Klasse für vernetzte Produkte mit hohen Anforderungen an Grafik, Display, Speicher und Peripherie."
tags:
    - Hardware
    - Chip
---

# SF32LB58x { #sf32lb58x }

## Überblick { #overview }

Die Serie SF32LB58x bildet die Flaggschiffklasse der Familie SF32LB5x. Sie richtet sich an akkubetriebene AIoT-Produkte, die fortschrittliche Grafik, große Speicherkapazität, Dual-Mode-Bluetooth, vielfältige Audio-/Display-I/Os und eine hohe GPIO-Dichte benötigen, ohne auf eine größere Applikationsprozessor-Plattform zu wechseln.

SF32LB58x nutzt eine heterogene Drei-Kern-Architektur mit Arm Cortex-M33 STAR-MC1[^1]. HCPU und ACPU sind Hochleistungskerne mit bis zu 240 MHz; die LCPU läuft mit bis zu 96 MHz und zielt auf energiesensible Aufgaben. Die HCPU übernimmt Systemsteuerung, Benutzeroberfläche und allgemeine Anwendungsverarbeitung; die ACPU kann Audio-DSP-Lasten übernehmen; und die LCPU eignet sich für Bluetooth LE, Sensorerfassung und andere Low-Power-Aufgaben. Mit dieser Aufteilung kann die Firmware die HCPU bei geeigneten Lasten abschalten, wobei die tatsächliche Einsparung von Anwendung und Firmware abhängt.

SiFli dokumentiert 3 744 KB On-Chip-SRAM und SKU-abhängige Kombinationen aus NOR-Flash und OPI-/HPI-PSRAM im Gehäuse. Die Familie bietet außerdem Display-Unterstützung einschließlich MIPI DSI, Vektorgrafikbeschleunigung, USB 2.0 High-Speed und ein BGA-Gehäuse mit hoher I/O-Zahl. Evaluieren Sie SF32LB58x, wenn ein Design eine hochauflösende Bedienoberfläche, umfangreiche Grafikressourcen, externes WLAN über SDIO oder die Rechen- und Speicherressourcen für Edge-KI- oder Sensorfusionslasten benötigt.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. In kompatiblen SF32-Geräten dokumentiert SiFli STAR-MC1 als Anwendungsprozessor Arm Cortex-M33 STAR-MC1. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, die für das genaue SF32-Gerät zu prüfen sind. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

## Anwendungen { #applications }

**SF32LB58x empfiehlt sich für** hochwertige vernetzte Produkte, die größere Framebuffer, anspruchsvollere Displays, mehr Speicher und eine höhere Dichte an Hochgeschwindigkeits-I/Os benötigen, darunter:

- Hochwertige Smartwatches und Sportuhren
- Hochauflösende Wearable-HMIs
- Fahrradcomputer und smarte Dashboards
- Tragbare medizinische und industrielle Terminals
- Zubehör mit Bluetooth und externem WLAN
- Edge-KI- und Sensorfusions-Systeme
- Display-zentrierte vernetzte Steuergeräte

Wählen Sie SF32LB58x, wenn das Design eine oder mehrere dieser Fähigkeiten benötigt:

- Display-Auflösung ab 1024 × 600
- Unterstützung für MIPI-DSI-Displays im Command- oder Video-Modus
- Vektorgrafik, aufwendigere Animationen oder größere UI-Ressourcen
- Externes WLAN über SDIO
- Großer Speicher für Framebuffer, Audio, Grafik oder KI-Modelle
- Hohe GPIO-Anzahl oder mehrere schnelle externe Schnittstellen

## Entwicklungsressourcen { #development-resources }

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datenblatt][Datasheet]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch][User Manual]__
- :fontawesome-solid-file-lines: __[Originaler Designleitfaden (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware-Anwendungshinweis (GitHub-Quelle)][Hardware Application Note (GitHub source)]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Drei Arm-Cortex-M33-STAR-MC1-Kerne: HCPU und ACPU bis 240 MHz; LCPU bis 96 MHz
- 3 744 KB On-Chip-SRAM
- NOR-Flash-Optionen im Gehäuse von 1 MB bis 8 MB insgesamt, je nach SKU
- OPI-PSRAM- und HPI-PSRAM-Optionen im Gehäuse; HPI-PSRAM ist je nach SKU bis zu 2 × 32 MB verfügbar
- Externes NOR- oder SPI-NAND-Flash über MPI3/MPI4; SD-NAND, eMMC, SD-Karten oder externes WLAN über SDIO. Die verfügbaren Kombinationen hängen von Schnittstellenwahl und Pinzuweisung ab.

### Grafik, Display und KI { #graphics-display-and-ai }

- 2D/2.5D-Grafikbeschleuniger ePicasso 2.0
- Vektorgrafik-Engine Vivante GCNanoUltraV
- Beschleuniger eZip 2.0 für die verlustfreie Dekompression von Grafiken
- Hardware-JPEG-/MJPEG-Kodierung und -Dekodierung mit Bildzuschnitt und -skalierung
- Matrix-Beschleuniger für neuronale Netze für TinyML-Lasten
- Display-Auflösungen bis 1280 × 800
- Unterstützung für MIPI-DSI-Displays im Command- und Video-Modus
- Display-Schnittstellen SPI, DSPI, QSPI (einschließlich SPI-E-Paper), MCU8080, JDI, RGB/DPI (RGB888 oder RGB565) und MIPI DSI
- Unterstützt zwei Displays mit unterschiedlichem Inhalt, mit MIPI DSI zusammen mit SPI, DSPI oder QSPI
- Geeignet für lokale Edge-KI-, Machine-Learning- und Sensorfusions-Lasten

### Audio und drahtlose Konnektivität { #audio-and-wireless-connectivity }

- Dual-Mode-Bluetooth 5.3
- Unterstützung für Bluetooth Classic und Bluetooth LE
- Externe WLAN-Konnektivität über SDIO
- 2 × integrierte Audio-ADCs
- 2 × integrierte Audio-DACs
- 2 PDM-Schnittstellen, die jeweils bis zu zwei digitale Mikrofone bedienen können; die Schnittstellenanzahl ist nicht die Mikrofonanzahl, und nutzbare Verbindungen hängen auch von Pin-Multiplexing und Board-Routing ab
- 3 I2S-Schnittstellen: I2S1 ist nur Eingang; I2S2 und I2S3 unterstützen Ein- und Ausgang. Alle arbeiten im Master-Modus.
- USB 2.0 High-Speed im Host- und Device-Modus

### Systemintegration { #system-integration }

- Integrierte PMU mit zwei BUCK-Ausgängen und drei LDO-Ausgängen
- Optionale Unterstützung des PMIC SF30147C für Wearable-Versorgungsdesigns
- BGA256 eignet sich für hochdichte MCU-Designs, die Display, Speicher, Audio und Konnektivität kombinieren
- On-Chip-SRAM, PSRAM-Optionen im Gehäuse und Display-Schnittstellen unterstützen grafik- und speicherintensive Designs

### Peripherie und I/Os { #peripherals-and-ios }

**Hinweis zur GPIO-Anzahl:** Der aktuelle [SiFli-Chip-Modellleitfaden](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt für die gezeigten SF32LB58x-Varianten 94 HCPU- und 66 LCPU-GPIOs (insgesamt 160) auf. Ein früheres SiFli-Datenblatt gliedert dies in 94 HPSYS- und 60 LPSYS-GPIOs plus 6 AON-GPOs (154 GPIOs + 6 AON-GPOs). Die Quellen ordnen diese sechs Always-on-Ausgänge unterschiedlich ein; die Kategoriesummen allein belegen daher weder eine abweichende Anzahl der Gehäusepins noch, dass alle 160 Pins frei zuweisbare GPIOs sind. Der [SiFli-Produktindex](https://wiki.sifli.com/silicon/index.html) verweist auf das aktuelle Datenblatt V1.8.6. Prüfen Sie vor dem PCB-Layout GPIO-Anzahl und Pinfunktionstabelle für das genaue bestellbare Bauteil in diesem Datenblatt. Die [GPIO-FAQ](https://wiki.sifli.com/en/faq/mcu/gpio.html) von SiFli behandelt PBR als separate Low-Power-I/O-Bank; addieren Sie sie nicht zur HCPU-/LCPU-Anzahl, sofern die Quelle sie nicht ausdrücklich einschließt.

- 160 GPIOs (94 HCPU + 66 LCPU, laut aktuellem Chip-Modellleitfaden)
- 2 × CAN-Schnittstellen
- 2 × SDIO-Schnittstellen
- SWD-Debug-Schnittstelle
- 6 UART-Schnittstellen, für die Debug-Ausgabe wählbar
- RTC, Watchdog, GPIO-Aufwachen, PBR-Aufwachen, PWM, I2C, SPI und universelle Analogschnittstellen
- BGA256-Gehäuse für hochdichte Designs

### Stromversorgung und Gehäuse { #power-supply-and-package }

- Versorgungsspannungsbereich: 1,71 V bis 3,63 V
- BGA256-Gehäuse, 6,5 × 8,5 × 0,94 mm, 0,4 mm Rastermaß
- HDI-PCB erforderlich; für Serienprodukte wird der Lagenaufbau 6HDI-2 empfohlen

## Familienvarianten { #family-variants }

Der aktuelle SiFli-Chip-Modellleitfaden führt sechs SF32LB58x-Bestellcodes auf, alle im BGA256, mit den unten gezeigten Speicherkonfigurationen im Gehäuse. Bestätigen Sie den genauen Bestellcode anhand des aktuellen Datenblatts und der Approved Vendor List (AVL), da sich Konfigurationen und Verfügbarkeit ändern können.

<div align="center"><em>SF32LB58x-Bestellcodes und Speicher im Gehäuse</em></div>

<div align="center" markdown>

| Teilenummer | Gehäuse | Speicher im Gehäuse |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 MB Boot-NOR-Flash; kein Speicher im Gehäuse an MPI1 oder MPI2 |
| SF32LB581VCN36 | BGA256 | 1 MB Boot-NOR-Flash + 8 MB OPI-PSRAM an MPI1 |
| SF32LB583VCC36 | BGA256 | 1 MB Boot-NOR-Flash + 2 × 8 MB OPI-PSRAM an MPI1 und MPI2 |
| SF32LB585V5E56 | BGA256 | 4 MB Boot-NOR-Flash + 4 MB NOR-Flash an MPI1 + 32 MB HPI-PSRAM an MPI2 |
| SF32LB586VDD36 | BGA256 | 1 MB Boot-NOR-Flash + 2 × 16 MB HPI-PSRAM an MPI1 und MPI2 |
| SF32LB587VEE56 | BGA256 | 4 MB Boot-NOR-Flash + 2 × 32 MB HPI-PSRAM an MPI1 und MPI2 |

</div>

Prüfen Sie bei der Variantenwahl zuerst diese Punkte:

- Benötigte Größe für Framebuffer, Ressourcen, Audio und Modellspeicher
- Display-Schnittstelle und Zielauflösung
- Anforderungen an externen Speicher und WLAN-Schnittstelle
- PCB-Fertigungsfähigkeit für BGA256-HDI-Layout mit 0,4 mm Rastermaß

## Integrationspfad { #integration-path }

Mit dieser Abfolge machen Sie aus einer SF32LB58x-Vorauswahl ein validiertes Design:

1. **Firmware-Pfad nachweisen.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) und nutzen Sie dann den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um die Konfiguration von Display, Grafik, Audio, Speicher und Bluetooth zu validieren.
2. **Integrationslösung wählen.** Evaluieren Sie [SF32LB58-MOD](../modules/SF32LB58-MOD.md), wenn eine Verringerung des Risikos bei RF, BGA und Speicherlayout wichtig ist, oder nutzen Sie [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) für die frühe Validierung auf Board-Ebene.
3. **Hardware entwerfen und prüfen.** Nutzen Sie den lokalen [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) — einschließlich seiner Checklisten für [Schaltplan](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) und [PCB-Layout](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md) —, bevor Sie Schaltplan oder Layout freigeben. Validieren Sie die Annahmen zu BGA256-HDI und Speicher-Routing frühzeitig.
4. **Maßgebliche Quelle prüfen.** Bestätigen Sie das genaue bestellbare Bauteil und Gehäuse anhand von SiFli-[Datenblatt][Datasheet], [Benutzerhandbuch][User Manual], [Originaler Designleitfaden (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)] und [Hardware-Anwendungshinweis (GitHub-Quelle)][Hardware Application Note (GitHub source)].

## Verwandte Produkte { #related-products }

### Modul { #module }

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) bündelt den Chip SF32LB586VDD36 mit seinem RF-Anpassnetzwerk, dem HPI-PSRAM im Gehäuse und den Speicheroptionen zu einem integrationsfertigen Modul. Nutzen Sie es, wenn das Projekt die Fähigkeiten der 58er-Serie benötigt, aber das Risiko bei RF, BGA und Speicherlayout früh in der Hardwareentwicklung senken soll.

### Entwicklungsboards { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) ist der Ausgangspunkt für Designentscheidungen zu Versorgungsbaum, Display, Speicher, Audio, RF, USB und SDIO.

### Referenzprodukte { #reference-products }

Typische SF32LB58x-Endprodukte sind hochwertige Uhrenplattformen, hochauflösende Wearable-HMIs, smarte Dashboards, tragbare vernetzte Terminals sowie Geräte, die Bluetooth, Display, Audio, Speicher und lokale KI-Lasten kombinieren.

!!! note "Automatisch generierter Inhalt"
    Diese Seite wurde ohne vorhandenes Quelldokument zusammengestellt bzw. entworfen. Prüfen Sie technische Aussagen anhand der offiziellen SiFli-Dokumentation, bevor Sie sich darauf verlassen.
