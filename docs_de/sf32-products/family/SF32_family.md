---
icon: lucide/cpu
description: "Überblick über die Familie SF32LB5xx: heterogene Cortex-M33-Kerne, Bluetooth, ePicasso-Grafik und Edge-KI, mit Vergleichstabelle und Kurzleitfaden zur Chipauswahl."
tags:
  - Hardware
  - Chip
---

# SF32-Familie { #sf32-family }

## Einführung { #introduction }

Die **SF32**-Familie, insbesondere die Serie **SF32LB5xx**, ist ein Portfolio hochintegrierter 32-Bit-Mikrocontroller mit extrem niedrigem Energiebedarf, das SiFli Technologies für akkubetriebene AIoT- und Wearable-Anwendungen entwickelt hat.

Die **SF32**-Bausteine sollen die Lücke zwischen klassischen Mikrocontrollern und Applikationsprozessoren schließen und vereinen Low-Power-Sensorverarbeitung, drahtlose Konnektivität, Grafikbeschleunigung, Multimedia-Verarbeitung und großen integrierten Speicher in einer kompakten System-in-Package-Architektur (SiP). Die Familie ist für Produkte wie Smartwatches, Fitness-Tracker, intelligente Displays, tragbare Medizingeräte und vernetztes Zubehör mit Edge-Verarbeitung ausgelegt.

Die Serie **LB** (Low-Power Bluetooth) ist die erste SF32-Produktlinie. Weitere anwendungsorientierte Serien sind geplant.

## Hardware-Workflows { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Ein Produkt planen**

    Folgen Sie einem durchgängigen Weg von den Produktanforderungen und der Bauteilauswahl über die Board-Validierung bis zur Produktionsreife.

    [Ein Produkt planen :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **SF32-Produktwähler**

    Vergleichen Sie SF32-Familien, wählen Sie einen Chip oder ein Modul und finden Sie das passende Entwicklungsboard für die frühe Validierung.

    [Auswahlliste erstellen :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Design for Production**

    Gehen Sie vom gewählten Bauteil zu Schaltplan, Layout, Stückliste, CAD, Checkliste und Nachweisen für die Inbetriebnahme.

    [Produktionsarbeit planen :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## Wichtige Merkmale { #key-features }

1. **Heterogene Multicore-Architektur**

    SF32LB-Mikrocontroller nutzen eine heterogene Multicore-Architektur auf Basis von Arm Cortex-M33 STAR-MC1, die leistungsstarke Anwendungsverarbeitung mit Hintergrundbetrieb bei extrem niedrigem Energiebedarf ausbalanciert. Je nach Baustein kann die Architektur einen oder mehrere Anwendungsprozessoren neben dedizierten Low-Power-Prozessoren umfassen, die für Bluetooth-Konnektivität, Sensorverarbeitung und Always-on-Systemfunktionen zuständig sind.

    !!! info "STAR-MC1-Prozessor"
        STAR-MC1 ist ein konfigurierbares Armv8-M-Mainline-CPU-IP von Arm China, das in kompatiblen SF32-Bausteinen als Anwendungsprozessor der Cortex-M33-Klasse eingesetzt wird. Auf Cortex-M33 ausgerichtete Firmware, Middleware, RTOS-Portierungen und Werkzeuge bleiben relevant, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich in Cache, TCM, XIPU und TrustZone-Fähigkeit; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Merkmale. In der SiFli-Dokumentation kann je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33*** stehen.

        Bausteinspezifische Hinweise zu Konfiguration, TCM, Caches, CDE, Coprozessoren und repräsentativen Leistungsmessungen finden Sie unter [STAR-MC1-Architektur im Detail](../../learn/architecture/star-mc1.md).


2. **Drahtlose Konnektivität mit extrem niedrigem Energiebedarf**

    Die Serie SF32LB integriert Bluetooth Low Energy (BLE) oder Dual-Mode-Bluetooth (BT/BLE) direkt auf dem Chip.

    Unterstützte Bluetooth-Modi und HF-Leistung variieren je nach Baustein. Prüfen Sie für die genaue Teilenummer im Datenblatt und im validierten Referenzdesign die unterstützten Modi, Sendeleistungseinstellungen, Empfängerempfindlichkeit und Stromaufnahme; die Positionierung auf Familienebene ersetzt diese Werte nicht.

3. **Hardwarebeschleunigte Grafik- und Display-Engine**

    Alle SF32LB-Mikrocontroller integrieren ePicasso, eine von SiFli selbst entwickelte 2,5D-Grafik-Engine, sowie einen separaten Display-Controller.

    Die Hardwarebeschleunigung verringert die CPU-Last bei gängigen Grafikaufgaben erheblich, zum Beispiel bei:

    * Alpha-Blending
    * Bildskalierung
    * Drehung und Transformation
    * Ebenenkomposition
    * Rendering der Benutzeroberfläche

    In der Familie SF32LB gibt es die folgenden Display-Schnittstellen und Display-Typen. Die Verfügbarkeit variiert je nach Baustein; prüfen Sie die genaue SKU, statt anzunehmen, dass jedes Bauteil jeden aufgeführten Punkt unterstützt.

    * SPI / DSPI / QSPI
    * 8080-MCU-Schnittstelle
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (für Memory-in-Pixel-Displays)

    Bei Bausteinen mit den erforderlichen Display-Schnittstellen können Grafik-Frameworks wie LVGL die Hardwarebeschleunigung nutzen, um flüssige, reaktionsschnelle Oberflächen auf TFT-, AMOLED-, E-Paper- (EPD) und Memory-in-Pixel-Displays (MiP) zu liefern.

4. **Edge-KI und neuronale Beschleunigung**

    Ausgewählte SF32-Bausteine integrieren dedizierte Hardware-Beschleuniger für maschinelles Lernen, Multimedia-Verarbeitung und Sensorfusions-Lasten.

    Zu den Fähigkeiten können gehören:

    * Beschleunigung neuronaler Netze
    * Audioverarbeitung
    * Spracherkennung
    * Kameraschnittstellen (DVP und SPI)
    * Sensorfusions- und Biometrie-Algorithmen

    Diese Funktionen ermöglichen KI-Inferenz mit geringer Latenz direkt auf dem Gerät und minimieren dabei Stromverbrauch und Cloud-Abhängigkeit.

5. **Hochdichter System-in-Package-Speicher (SiP)**

    Um grafikintensive und KI-fähige Anwendungen zu unterstützen, integrieren SF32-Bausteine Instruktions- und Daten-Cache-Architekturen, die für die Hochleistungsausführung aus externem Speicher optimiert sind.

    Verfügbare Speicher im Gehäuse können umfassen:

    * Bis zu 256 Mb NOR-Flash
    * Bis zu 512 Mb PSRAM

    Nur ausgewählte Teilenummern enthalten NOR-Flash oder PSRAM im Gehäuse. Eine SiP-Konfiguration kann die Zahl getrennt bestückter Speicherbausteine und das zugehörige Routing verringern; Speichertyp, Kapazität, Schnittstelle, Versorgung und extern verfügbare Pins hängen jedoch von der genauen SKU ab. Prüfen Sie Datenblatt und Gehäuse-Pinbelegung, bevor Sie das Board abschließen.

## Vergleich der SF32-Mikrocontroller { #sf32-microcontroller-comparison }

<div align="center"><em>Vergleich der SF32-Mikrocontroller</em></div>

Die folgenden Werte fassen Fähigkeiten auf Familienebene zusammen, nicht garantierte Fähigkeiten jeder SKU. Schnittstellenverfügbarkeit und Ressourcenanzahl können je nach genauer Teilenummer, Gehäuse oder Konfiguration variieren; prüfen Sie das Datenblatt des gewählten Bauteils.

<div align="center" markdown>

| Merkmal | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Positionierung | Einstiegsklasse | Mainstream, nur BLE | Fortgeschritten | Erweiterte Rechenleistung | Flaggschiff |
| Anwendungs-CPU | Cortex-M33 @240MHz | Cortex-M33 @240MHz | Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz |
| Low-Power-CPU | Cortex-M33 @24/48 MHz, dedizierter Bluetooth-Controller | Cortex-M33 @48 MHz, vom Anwender programmierbar | Cortex-M33 @48/96 MHz, vom Anwender programmierbar | Cortex-M33 @24 MHz, dedizierter Bluetooth-Controller | Cortex-M33 @48/96 MHz, vom Anwender programmierbar |
| Interner SRAM | 576 KB | 1.312 KB | 960 KB | 592 KB | 3,7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Grafikbeschleuniger | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + Vektorgrafik<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Display-Unterstützung | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| Audio-ADC | 1x | n. v. | 1x | 2x | 2x |
| Audio-DAC | 1x | n. v. | 1x | 1x | 2x |
| PDM-Audio-Schnittstellen | 1x | 1–2x* | 2x | 2x | 2x |
| I²S-Audio-Schnittstellen | 1x | 1–2x* | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | n. v. | n. v. | 1x | 2x | 2x |
| PSRAM im Gehäuse | Bis zu 16 MB | Bis zu 16 MB + 2 MB | Bis zu 16 MB | Bis zu 32 MB | Bis zu 32 MB + 32 MB |
| NOR-Flash im Gehäuse | Bis zu 4 MB | Bis zu 8 MB | Bis zu 1 MB | Bis zu 32 MB | Bis zu 8 MB |
| Anzahl GPIOs | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58; bis zu 6 zusätzliche BGA112-I/Os* | 154 |
| Gehäuseoptionen | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Gehäuseabmessungen (L × B) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6.5 × 6.1 mm | QFN68: 7 × 7 mm<br> QFN80: 8 × 8 mm<br>BGA: 5.4 × 4.4 mm | 8.5 × 6.5 mm |
| Stromversorgung | 3.2–4.7 V (520/3/5/7)<br>2.97–3.63 V (52B/E/G/J)<br>1.8 V (52D) | 1.71–3.63 V | 1.71–3.63 V | 3.2–4.7 V<br>2.97–3.63 V | 1.71–3.63 V |

</div>

**Variantenhinweis zu SF32LB55x:** Die Anzahl der Audio-Schnittstellen hängt vom Bestellcode ab: Die Varianten SF32LB551/553/555 haben je eine PDM- und eine I²S-Schnittstelle; SF32LB557VD3A6 hat von beiden je zwei. Die Gehäuseübersicht im aktuellen [SF32LB55x-Datenblatt (V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) nennt für BGA169 119 GPIOs (71 HCPU + 48 LCPU), aber die detaillierte Produktserientabelle desselben Datenblatts gibt für SF32LB557 71 HCPU + 42 LCPU = 113 an. Auch der aktuelle [SiFli-Chip-Modellleitfaden](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt für SF32LB557VD3A6 71 + 42 = 113 auf. SiFli erklärt die Abweichung innerhalb des Datenblatts nicht; dieser Vergleich verwendet den teilespezifischen Wert von 113 GPIOs. Bestätigen Sie die genaue SKU anhand von Datenblatt und Pintabelle, bevor Sie Pins zuweisen. Jede PDM-Schnittstelle kann bis zu zwei digitale Mikrofone anschließen; die Schnittstellenanzahl ist nicht die Mikrofonanzahl.

**Hinweis zum NOR im Gehäuse bei SF32LB55x:** Das Familienmaximum von 8 MB schließt die separat dokumentierte Konfiguration SS6600A8 ein: zwei 4-MB-QSPI-NOR-Bausteine, als ein 8-MB-OSPI-NOR-Baustein konfiguriert. Die für SF32LB55x aufgeführten Bestellcodes mit SF32-Präfix haben bis zu 4 MB NOR-Flash im Gehäuse; prüfen Sie das genaue Modell.

**Hinweis zu SF32LB57x BGA112:** Dieser Hinweis gilt nur für BGA112. SF32LB57x hat die internen Schnittstellen MPI1, MPI2 und MPI3; ihre Positionen in einer Teilenummer erläutert die [SF32-Namenskonvention](SF32_namingrule.md). In jeder dieser Konfigurationen mit Speicher im Gehäuse sind die Pins von MPI2 und MPI3 für den externen Zugriff nicht verfügbar, sodass fest 58 GPIOs bleiben: (1) je ein PSRAM an den internen MPI1 und MPI2; (2) ein 256-Mb-PSRAM am internen MPI2; oder (3) ein NOR-Flash am internen MPI3. `SF32LB57GVD776` entspricht Fall (3): Die zweite `7` im abschließenden Code `776` kennzeichnet einen internen Baustein an MPI3, daher sind nur 58 GPIOs verfügbar. In anderen BGA112-Konfigurationen können die sechs zusätzlichen Gehäuse-I/Os für MPI3 oder als statische GP-Ausgänge mit Pull-up- bzw. Pull-down-Konfiguration verwendet werden; sie sind keine uneingeschränkten GPIOs. Die Schreibweise `58 + 6` für `SF32LB57ZVN7N6` bedeutet beispielsweise 58 nutzbare GPIOs plus sechs Pins für MPI3 oder statische Ausgänge. QFN68 und QFN80 unterliegen dieser BGA112-Einschränkung nicht; sie bieten nur die angegebene GPIO-Anzahl, ohne zusätzliche MPI3- oder statische Ausgangsoption. Die genaue SKU entnehmen Sie der Produktseite zu SF32LB57x und ihrem Datenblatt.

**Klarstellung zur GPIO-Anzahl bei SF32LB58x:** Das [Datenblatt DS5801 V1.8.3](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf) und der Familienvergleich von SiFli geben insgesamt 154 GPIOs an (HPSYS: 94; LPSYS: 60). Der separate [Chip-Modellleitfaden](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt HCPU: 94 und LCPU: 66 auf, was 160 ergibt und der Gesamtzahl des Datenblatts widerspricht. Dieser Vergleich folgt dem Datenblatt; prüfen Sie die nutzbaren Pins anhand der Gehäuse-Pintabelle der genauen SKU, bevor Sie sie zuweisen.

## Den richtigen SF32 wählen { #choosing-the-right-sf32 }

Die Familie SF32LB5xx deckt akkubetriebene vernetzte Geräte ab, von kostenoptimierten Bluetooth-Produkten bis zu Systemen mit fortschrittlicher Grafik und KI-Funktionen. Die Familienmitglieder teilen eine SDK-Grundlage, aber Prozessorkonfiguration, Peripherie, Speicherabbilder, Gehäuse und Pinbelegungen können sich unterscheiden. Eine Portierung kann Änderungen an Startup-Code, Treibern, Linker- oder Partitionseinstellungen, Pin-Multiplexing und SDK-Konfiguration erfordern; validieren Sie das Ergebnis auf dem Zielbaustein.

Berücksichtigen Sie bei der Bauteilauswahl die folgenden zentralen Anforderungen:

* Bluetooth-Konnektivität (BLE oder Dual-Mode-BT/BLE)
* Display-Schnittstelle und Auflösung
* Audio- und Multimedia-Fähigkeiten
* Speicherkapazität
* GPIO-Bedarf
* Grafikleistung
* KI- und Sensorverarbeitungslasten
* Zielwerte für den Energieverbrauch

<div align="center"><em>Kurzleitfaden zur Auswahl</em></div>

<div align="center" markdown>

| Wählen Sie ... | Wenn Ihre Anwendung ... benötigt | Typische Anwendungen |
| : ---      | : ---  | : --- |
| SF32LB52x  | • Dual-Mode-Bluetooth (BT/BLE)<br> • Integrierten Audio-ADC und -DAC<br> • Integriertes Laden von Li-Ion-Akkus<br> • Bis zu 45 GPIOs<br> • Display-Auflösungen bis 512 × 512<br> • Eine kompakte und kostengünstige Lösung<br> | • Einfache Smartwatches und Fitnessarmbänder<br> • Bluetooth-Module und Funkadapter<br> • Bluetooth-Audiozubehör<br> • Intelligente Sensoren und Wearables<br> • Elektronische Regaletiketten und Smart Badges<br> • Tragbare Etikettendrucker<br> • Displays für E-Bikes und E-Scooter<br> • Einfache HMI-Geräte auf LVGL-Basis |
| SF32LB55x  | • Bluetooth Low Energy (BLE)<br> • MIPI-DSI-Displays im Command-Modus<br>• Große SRAM-Kapazität für Algorithmen der Sensorverarbeitung<br> • Mehr als 45 GPIOs<br> • Erweiterte Low-Power-Verarbeitungsfähigkeiten | • Fitnessarmbänder und Aktivitätstracker<br> • Sport- und Fahrradcomputer<br> • Sensorreiche Wearables<br> • Geräte zur Gesundheitsüberwachung<br> • Akkubetriebene BLE-Peripherie |
| SF32LB56x  | • Dual-Mode-Bluetooth (BT/BLE)<br> • RGB/DPI-Display-Schnittstellen<br> • Integrierten Audio-ADC und -DAC<br> • Display-Auflösungen bis 1024 × 600<br> • Externe WLAN-Anbindung über SDIO<br> • Größere GPIO-Kapazität | • Smartwatches mit fortschrittlichen Benutzeroberflächen<br> • Vernetzte HMI-Systeme<br> • Medizin- und Gesundheitsgeräte<br> • Industrielle Handgeräte<br> • Tragbare Messinstrumente<br> • Fortschrittliche Displays für E-Bikes und E-Scooter|
| SF32LB57x | • Dual-Mode-Bluetooth (BT/BLE), BLE Audio und LE Long Range<br> • ePicasso-3.0-/eZip-3.0-Grafik mit RGB-Display-Schnittstellen<br> • DCMI-Kameraeingang und integrierten hochwertigen Audio-ADC/DAC<br> • Display-Auflösungen bis 1024 × 600<br> • PTM-Auslagerung für deterministische I/O oder eigenes Peripherie-Timing<br> • Bis zu 58 universelle GPIOs; sofern die SiP-Konfiguration es zulässt, bietet BGA112 zusätzlich bis zu 6 I/Os für MPI3 oder per Pull-up/Pull-down konfigurierte statische GP-Ausgänge<br> • SD/SDIO/eMMC-Speicherschnittstellen | • Kompakte fortschrittliche Smartwatches<br> • Displayreiche HMI- und E-Paper-Geräte<br> • Kamerataugliche Bluetooth-Produkte<br> • Tragbare Audio- und Aufnahmegeräte<br> • Smart-Home-Bedienfelder |
| SF32LB58x  | • Dual-Mode-Bluetooth (BT/BLE)<br> • Fortschrittliches Grafik-Rendering einschließlich Vektorgrafik<br> • MIPI-DSI-Displays im Command- oder Video-Modus<br> • Display-Auflösungen bis 1280 × 800<br> • Große Speicherkonfigurationen<br> • Hohe GPIO-Dichte und -Anzahl<br> • Externe WLAN-Anbindung über SDIO<br> • Edge-KI- und Machine-Learning-Lasten | • Hochwertige Smartwatches<br> • Sport- und Outdoor-Wearables<br>• Fortschrittliche Fahrradcomputer<br> • Intelligente Displays und vernetzte Dashboards<br> • KI-fähige Wearables<br> • Edge-KI- und Sensorfusions-Systeme|

</div>

## Softwarekompatibilität innerhalb der Familie { #software-compatibility-across-the-family }

Die SF32-Plattform bietet eine gemeinsame Software- und SDK-Grundlage. Prozessorkonfiguration, Peripherie, Speicherabbilder, Gehäuse und Pinbelegungen können sich jedoch unterscheiden. Eine Portierung kann die Anpassung von Startup-Code, Treibern, Linker- oder Partitionseinstellungen, Pin-Multiplexing und SDK-Konfiguration erfordern, gefolgt von der Validierung auf der Zielhardware.

Bewerten Sie Software-Wiederverwendung und Migrationsaufwand zusammen mit den Anforderungen an Leistung, Speicher, Display und Konnektivität. Nehmen Sie nicht an, dass Bausteine derselben Familie pinkompatibel sind oder dass Firmware unverändert läuft.

## Weiterführende Links { #reference-links }

- [Offizielle Website von SiFli](https://www.sifli.com/)
- [SiFli Wiki](https://wiki.sifli.com/)
- [SiFli-Softwaredokumentation](https://docs.sifli.com/)
- [OpenSiFli auf GitHub](https://github.com/OpenSiFli/)
- [Offizieller Taobao-Shop von SiFli](https://sifli.taobao.com/)
