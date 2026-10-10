---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: energiesparende Bluetooth-5.3-MCU-Modulfamilie für SF32LB52x mit integrierter HF-Schaltung, 48-MHz-Quarz und SKU-abhängigen Antennenoptionen."
tags:
  - Hardware
  - Modul
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## Überblick { #overview }

SF32LB52-MOD-1 ist eine stromsparende Bluetooth-MCU-Modulfamilie auf Basis der SF32LB52x-Plattform. Die Standardvariante N16R8 verwendet den SF32LB525UC6. Das 27,9 × 18,0 × 3,1 mm große Modul vereint ein Dual-Core-System auf Basis von Arm Cortex-M33 STAR-MC1 mit HF-Schaltung, 48-MHz-Quarz und Antennenanschluss. Je nach Modul-SKU kommt eine Leiterplattenantenne auf dem Modul oder eine externe Antenne über einen IPEX-Anschluss zum Einsatz.

DS5203 V0.3 dokumentiert eine Leiterplattenantenne auf dem Modul und nennt für ein weiteres Modell eine externe Antenne über IPEX; die Antennenausführung wird jedoch nicht den aufgeführten Speicher-SKUs zugeordnet. Klären Sie die genaue Antennenkonfiguration des gewählten Moduls mit SiFli, bevor Sie das Layout der Trägerplatine festlegen. Das Endprodukt muss weiterhin hinsichtlich seiner HF-Leistung validiert werden und die geltenden Produktzulassungsanforderungen erfüllen. Die herausgeführten Schnittstellen ermöglichen kompakte vernetzte Produkte mit den Bluetooth-, Grafik- und Audiofunktionen der Plattform.

Je nach Modul-SKU kann im Gehäuse des verwendeten Chips OPI-PSRAM integriert sein. Über die herausgeführten Modulschnittstellen stehen die wichtigsten Funktionen der Chipfamilie zur Verfügung, darunter GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS und analoge Audiosignale.

!!! info
    Architektur und Peripherie der Chipfamilie sind auf der Seite [SF32LB52x](../chips/SF32LB52x.md) beschrieben. Diese Seite behandelt die Integration des Moduls, die Stromversorgung, das Gehäuse und die Variantenwahl.

## Anwendungen { #applications }

**SF32LB52-MOD-1 eignet sich für Produkte, die Bluetooth, Grafik und Audio benötigen und zugleich das HF- und Layout-Risiko reduzieren sollen.** Dazu zählen:

- Smartwatches, Fitnessarmbänder und tragbare Medizinprodukte
- Bluetooth-Sensor-Hubs und vernetztes Zubehör
- Smarte Türschlösser, Smart-Home-Geräte und kompakte Haushaltsgeräte
- Kleine grafische HMI-Produkte
- Fahrzeugschlüssel und am Körper tragbare Fernbedienungen
- Kostenoptimierte vernetzte Displays

Ziehen Sie SF32LB52-MOD-1 in Betracht, wenn das Produkt eine oder mehrere der folgenden Eigenschaften erfordert:

- HF-Integration auf Modulebene mit Optionen für Leiterplattenantenne und externe Antenne
- Modulschnittstellen für die Bluetooth-, Grafik- und Audiofunktionen der SF32LB52x-Plattform
- Weiterverwendung der Software und Peripheriefunktionen von SF32LB52x
- Kompaktes Format für Wearables und HMI-Produkte mit begrenztem Bauraum

## Entwicklungsressourcen { #development-resources }

[Moduldatenblatt]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chipübersicht]: ../chips/SF32LB52x.md
[Hardware-Designleitfaden]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Originaler Hardwareleitfaden (wiki.sifli.com, EPD-Variante)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Muster bestellen]: https://sifli.taobao.com/
[Entwicklungskits kaufen]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Moduldatenblatt]__
- :fontawesome-solid-microchip: __[Chipübersicht]__
- :fontawesome-solid-file-lines: __[Hardware-Designleitfaden]__
- :fontawesome-solid-file-lines: __[Originaler Hardwareleitfaden (wiki.sifli.com, EPD-Variante)]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen]__
- :fontawesome-solid-cart-shopping: __[Entwicklungskits kaufen]__

</div>

---

## Merkmale und technische Daten { #features-and-specifications }

### Rechenleistung und Speicher { #compute-and-memory }

- Arm-Cortex-M33-STAR-MC1-Anwendungskern (HCPU), bis zu 240 MHz und mit einer maximalen Leistung von 370 DMIPS / 984 EEMBC CoreMark
- 32 KB Instruktions-Cache und 16 KB Daten-Cache
- 512 KB Retention-SRAM
- Dedizierter Arm-Cortex-M33-STAR-MC1-Kern mit sehr niedrigem Energiebedarf (LCPU), bis zu 24 MHz, mit 64 KB Retention-SRAM
- FPU mit einfacher Genauigkeit und MPU auf beiden Kernen
- Je nach Modul-SKU OPI-PSRAM im Chipgehäuse

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung
- Empfindlichkeit: -100 dBm (BLE/1 Mbit/s), -96,3 dBm (BR), -95,5 dBm (EDR2)
- Maximale Sendeleistung: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- BR-Spitzenempfangsstrom: 2,4 mA bei 3,8 V

### Grafik und Display { #graphics-and-display }

- ePicasso-2.0-2D/2,5D-Grafik-Engine
- eZip-2.0-Beschleuniger für verlustfreie Grafikdekompression
- LCD-Controller mit Unterstützung für 8080-, SPI-, Dual-SPI- und Quad-SPI-Schnittstellen
- Geeignet für kompakte, uhrenähnliche Produkte und kleine HMI-Displays

### Audio { #audio }

- 1 × 24-Bit-Audio-DAC
- 1 × 24-Bit-Sigma-Delta-Audio-ADC
- 1 × I2S-Schnittstelle
- 1 × PDM-Schnittstelle
- Analoge Audioeingänge und -ausgänge sind über die Modulschnittstelle verfügbar

An eine PDM-Schnittstelle lassen sich bis zu zwei digitale Mikrofone anschließen; die Anzahl der PDM-Schnittstellen entspricht also nicht der Mikrofonanzahl. Die tatsächliche Nutzung hängt von der Pin-Multiplexierung und dem Trägerboard-Layout ab. Bei diesem Modul sind PA22/PA23 von außen nicht verfügbar, wenn der optionale 32,768-kHz-Quarz bestückt ist; der Hardwareleitfaden beschreibt eine alternative PDM-Pinbelegung.

### Speicherschnittstellen { #storage-interfaces }

- Je nach Modul-SKU OPI-PSRAM im Chipgehäuse
- 1 × MPI (QSPI) für externen SPI-NOR- oder SPI-NAND-Flash
- 1 × SD/SDIO mit Unterstützung für SD 3.0, SDIO 3.0 und eMMC

### Sicherheit { #security }

- AES-, HASH- und CRC-Hardwarebeschleuniger
- Echter Zufallszahlengenerator (TRNG)
- PSA-Zertifizierung der Stufe 1 (PSA Certified Level 1)

### Stromversorgung, Gehäuse und I/O { #power-package-and-io }

- Modulgehäuse: 27,9 × 18,0 × 3,1 mm
- Betriebstemperatur: −40 °C bis +85 °C
- VSYS: 3,2–4,7 V bei direktem Anschluss einer Lithium-Ionen-Batterie oder 3,7–4,7 V bei geregelter Versorgung; empfohlen werden 3,8 V.
- I/O-Spannung: 3,3 V
- VBATS: Eingang zur Batteriespannungserfassung und für ADC-Messungen, 0–4,7 V. Die zu messende Spannung direkt anschließen; keinen externen Spannungsteiler verwenden.
- VDD33_VOUT2: integrierter 3,3-V-LDO-Ausgang zur Versorgung externer Peripherie. Standardmäßig deaktiviert und per Software zu aktivieren; maximaler Ausgangsstrom 150 mA, Gesamtkapazität der Versorgungsschiene höchstens 7,4 µF.
- 68-polige Modulschnittstelle; die Signalpins stellen multiplexte Funktionen wie GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS sowie digitales und analoges Audio bereit

## Modulvarianten { #module-variants }

<div align="center"><em>Modulvarianten des SF32LB52-MOD-1</em></div>

<div align="center" markdown>

| Modulcode | Chip | Flash | PSRAM | Temperatur | Abmessungen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C bis +85 °C | 27,9 × 18,0 × 3,1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C bis +85 °C | 27,9 × 18,0 × 3,1 mm |

</div>

Der [Modulmodell-Leitfaden](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) und der EPD-Anwendungsleitfaden von SiFli führen auch A128R16 auf; das hier verlinkte Datenblatt DS5203 V0.3 nennt jedoch nur N16R8. Klären Sie vor der Auswahl von A128R16 die aktuelle Verfügbarkeit und Speicherkonfiguration mit SiFli.

Die offiziellen Quellen verwenden unterschiedliche Bezeichnungen für den Flash-Speicher von A128R16: Der [OpenSiFli-Leitfaden zu Modulmodellen](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) nennt 128 MB SPI-NAND, während der [SiFli-Leitfaden zu Boardmodellen](https://wiki.sifli.com/board/devkit_guide.html) für die entsprechende DevKit-SKU 128 MB QSPI-NAND aufführt. Die Quellen erläutern nicht, ob sich die Abweichung auf das bestückte Bauteil oder die Schnittstellenbezeichnung bezieht. Prüfen Sie Flash-Bauteil und Busmodus anhand von Schaltplan und BOM der konkreten Board-Revision, bevor Sie die Board-Konfiguration als Modulreferenz verwenden.

## Verwandte Produkte { #related-products }

### Chip { #chip }

Die Seite [SF32LB52x](../chips/SF32LB52x.md) beschreibt die Architektur und Peripherie der Chipfamilie. Die Zuordnung von Chip und Speicher zu den einzelnen Modul-SKUs finden Sie in der Variantentabelle oben.

### Entwicklungskits { #development-kits }

Die [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) und [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) eignen sich zur Firmwarevalidierung, bevor ein eigenes Trägerboard für das Modul entwickelt wird.

### Referenzprodukte { #reference-products }

Typische Endprodukte umfassen Smartwatches der Einstiegs- bis Mittelklasse, Fitnessarmbänder, Bluetooth-Sensor-Hubs, smarte Türschlösser und kompakte grafische HMI-Geräte.
