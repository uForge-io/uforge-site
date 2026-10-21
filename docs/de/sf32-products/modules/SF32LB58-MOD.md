---
icon: lucide/card-sim
description: "SF32LB58-MOD: stromsparendes Bluetooth-MCU-Modul auf Basis des SF32LB586VDD36 mit 16 + 16 MB HPI-PSRAM, 1 MB QSPI-NOR und NOR-, NAND- oder eMMC-Varianten."
tags:
  - Hardware
  - Modul
---

# SF32LB58-MOD { #sf32lb58-mod }

## Überblick { #overview }

SF32LB58-MOD ist ein energiesparendes Bluetooth-MCU-Modul auf Basis des SF32LB586VDD36 von SiFli. Die Standardkonfiguration umfasst 16 + 16 MB HPI-PSRAM und 1 MB QSPI-NOR. Das 24 × 24 × 3,1 mm große Modul vereint die Drei-Kern-Plattform, den RF-Pfad, den Quarz und verschiedene Speicheroptionen. Über die herausgeführten Schnittstellen lassen sich Display-, Audio-, Speicher- und Steuerungsfunktionen einbinden.

Das Modul integriert den BGA256-Baustein, den RF-Pfad, den Quarz und den schnellen Speicher im Modul selbst. Dadurch verringert sich der Umfang der zugehörigen Leiterbahnführung auf der Trägerplatine des Produkts. Das fertige Produkt muss weiterhin hinsichtlich der RF-Leistung validiert werden und die geltenden Zulassungsanforderungen erfüllen. Klären Sie die Antennenausführung und Speicherkonfiguration der gewählten SKU, bevor Sie das Layout der Trägerplatine festlegen.

Je nach Modul-SKU lässt sich die Plattform mit HPI-PSRAM sowie QSPI-NOR-, QSPI-NAND- oder eMMC-Speicher konfigurieren. Die herausgeführten Schnittstellen ermöglichen Produkte mit Display-, Audio-, Speicher- und Konnektivitätsfunktionen auf einer MCU-Plattform.

DS5802 V0.1 beschreibt eine modulintegrierte PCB-Antenne sowie Möglichkeiten zum Anschluss einer externen Antenne. Die externe Antenne kann über metallisierte Halblöcher oder den externen Antennenanschluss der ersten Generation angeschlossen werden; dieser Anschluss ist mit Hirose-U.FL-, I-PEX-MHFI- und Amphenol-AMC-Steckverbindern kompatibel. Das Datenblatt ordnet die Ausführungen nicht den einzelnen SKUs zu. Klären Sie daher die Antennenausführung des gewählten Moduls mit SiFli, bevor Sie das Layout der Trägerplatine festlegen.

!!! info
    Architektur und Peripherie der Chipfamilie sind auf der Seite [SF32LB58x](../chips/SF32LB58x.md) beschrieben. Diese Seite behandelt die Integration des Moduls, seine Speichervarianten, Versorgungsschienen und Auswahlkriterien.

## Anwendungen { #applications }

SiFli nennt für SF32LB58-MOD folgende Anwendungsbereiche:

- Wearables: hochwertige Smartwatches, Fitnessarmbänder, tragbare Medizingeräte und Fitnessgeräte
- Industrie: kostengünstige Displaylösungen, grafische HMI, Zentralen zur Steuerung industrieller Sensoren, Anlagenüberwachung und Messgeräte
- Automotive: zentrale Steuereinheiten für Elektrofahrzeuge, Fahrzeugschlüssel und am Körper tragbare Fernbedienungen für Fahrzeuge
- Hausautomation: kleine und mittelgroße intelligente Haushaltsgeräte sowie smarte Türschlösser
- Allgemein: Sensor-Hubs mit niedrigem Stromverbrauch und Bluetooth Mesh
- AIoT-Beispiele: Spracherkennung für Befehle, Smart-Home-Geräte, intelligente Schlüssel und Bedienpanels

Ziehen Sie SF32LB58-MOD in Betracht, wenn das Design eine oder mehrere der folgenden Eigenschaften erfordert:

- Integration von BGA256-Baustein, RF-Pfad, Quarz und schnellem Speicher auf Modulebene
- Modulintegrierte PCB-Antenne oder externe Antenne über metallisierte Halblöcher bzw. einen Anschluss, kompatibel mit Hirose U.FL, I-PEX MHFI und Amphenol AMC; SKU-Ausführung bestätigen
- Speicheroptionen mit QSPI-NOR, QSPI-NAND oder eMMC entsprechend der SKU
- Herausgeführte Schnittstellen für Display, Audio, Speicher und Steuerungsfunktionen

## Entwicklungsressourcen { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Chip Introduction]: ../chips/SF32LB58x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Moduldatenblatt][Module Datasheet]__
- :fontawesome-solid-microchip: __[Chipübersicht][Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden][Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und technische Daten { #features-and-specifications }

### Rechenleistung und Speicher { #compute-and-memory }

- 2 Arm-Cortex-M33-STAR-MC1-Anwendungskerne mit bis zu 240 MHz
- 1 Low-Power-Kern auf Basis von Arm Cortex-M33 STAR-MC1, vom Anwender programmierbar und bis zu 96 MHz schnell
- Bis zu 370 DMIPS / 984 EEMBC CoreMark pro Anwendungskern
- Bis zu 148 DMIPS / 394 EEMBC CoreMark auf dem Low-Power-Kern
- 2176 KB SRAM (HCPU) + 512 KB SRAM (ACPU) + 1056 KB Retention-SRAM (LCPU)
- FPU mit einfacher Genauigkeit und MPU auf allen Kernen

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung
- Empfindlichkeit bis -107,5 dBm bei BLE Long Range mit 125 kbit/s
- Maximale Sendeleistung: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- BR/EDR2/EDR3-Spitzenempfangsstrom: 2,2 mA bei 3,3 V

### Grafik, Display und Multimedia { #graphics-display-and-multimedia }

- ePicasso 2.0 2D/2.5D-Grafik-Engine
- Vivante GCNanoUltraV-Vektorgrafik-Engine
- Hardware-JPEG-Codec
- Zwei LCD-Controller mit Unterstützung für 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI und JDI
- TurboPixel: extDMA komprimiert den finalen Framebuffer verlustbehaftet mit festem Kompressionsverhältnis; der Display-Controller dekomprimiert ihn. Dadurch sinken sowohl die für den jeweiligen Workload benötigte PSRAM-Bandbreite als auch der benötigte Framebuffer-Speicher.
- Always-on-Display-Unterstützung auf beiden LCD-Controllern

### Audio { #audio }

- 2 × 24-Bit-Audio-DACs
- 2 × 24-Bit-Sigma-Delta-ADCs
- 2 × PDM-Schnittstellen (PDM1/PDM2)
- 3 × I2S-Schnittstellen, alle im Masterbetrieb; I2S1 ist nur für Eingabe, I2S2 und I2S3 unterstützen Eingabe und Ausgabe
- Analoge Audioein- und -ausgabe über die Modulschnittstelle

Der [SF32LB58x-Hardwareleitfaden](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html) von SiFli führt zwei PDM-Mikrofoneingänge (PDM1 und PDM2) auf. Eine PDM-Schnittstelle kann zwei Mikrofonkanäle übertragen: Das [PDM-SDK-Beispiel von SiFli](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) zeigt die Aufnahme mit zwei Mikrofonen über den linken und rechten Kanal einer Schnittstelle sowie mit vier Mikrofonen über PDM1 und PDM2. SF32LB58-MOD ist jedoch nicht in der Liste der vom Beispiel unterstützten Plattformen aufgeführt. Prüfen Sie für dieses Modul die vom Ziel-SDK unterstützte Mikrofon- und Kanalkonfiguration sowie Pin-Multiplexierung und Trägerboard-Layout. Leiten Sie die Unterstützung für vier Mikrofone nicht allein aus der Zahl der PDM-Schnittstellen ab.

### Speicherschnittstellen und Modulvarianten { #storage-interfaces-and-module-variants }

<div align="center"><em>Modulvarianten des SF32LB58-MOD</em></div>

<div align="center" markdown>

| Modulcode | Wählbarer Speicher | PSRAM | Standard-Flash | Temperatur | Abmessungen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 24 × 24 × 3,1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 24 × 24 × 3,1 mm |

</div>

Die [Modellübersicht für SiFli-Module](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt diese Varianten auf, nennt eMMC als mögliche interne Bestückung und weist darauf hin, dass weitere Konfigurationen angepasst werden können. Wählen Sie die SKU passend zum Speichermedium und zur Kapazität und klären Sie mit SiFli die aktuelle Verfügbarkeit und Speicherkonfiguration. Prüfen Sie außerdem, ob das Ziel-SDK und die Firmware das gewählte Gerät sowie den Boot- und Speicherpfad unterstützen.

### Stromversorgung, Gehäuse und I/O { #power-package-and-io }

- Modulgehäuse: 24 × 24 × 3,1 mm
- Betriebstemperatur: −40 °C bis +85 °C
- VDD_3V3: 2,97–3,6 V
- VDD_1V8: 1,7–1,95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1,7–3,6 V
- VDD_3V3 versorgt AVDD33_ANA, AVDD33_AUD und AVDD_USB sowie bei bestücktem eMMC dessen VDD-Eingang. SiFli empfiehlt für diese Versorgungsschiene einen LDO.
- VDD_1V8 versorgt PVDD1, PVDD2, AVDD_BRF, AVDD18_DSI und den im Gehäuse integrierten Speicher.
- VDDIOA versorgt die PA-I/Os außer PA00–PA11, den externen Flash und bei bestücktem eMMC dessen VIO. VDDIOA2 versorgt PA00–PA11; VDDIOB versorgt die PB-I/Os.
- 138-polige Modulschnittstelle; die multiplexierten Signalpins stellen Funktionen wie GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS und Audio bereit

## Verwandte Produkte { #related-products }

### Chip { #chip }

Basiert auf [SF32LB58x](../chips/SF32LB58x.md). Weitere Informationen zur Grafik-, Speicher- und Displayarchitektur der Chipfamilie finden Sie auf der Chipseite.

### Entwicklungsboards { #development-kits }

Das Board [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) eignet sich zur Firmwarevalidierung sowie zur Inbetriebnahme des Displays und zur Prüfung der Audio- und Speicherpfade, bevor ein eigenes Trägerboard für das Modul entwickelt wird.

### Referenzprodukte { #reference-products }

Die von SiFli dokumentierten Anwendungsbereiche umfassen Wearables, industrielle Display- und HMI-Geräte, Fahrzeugsteuerungen, Smart-Home-Geräte, Sensor-Hubs mit niedrigem Stromverbrauch und Bluetooth-Mesh-Produkte.
