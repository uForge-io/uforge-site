---
icon: lucide/card-sim
description: "SF32LB56-MOD: Allzweck-Bluetooth-5.3-MCU-Modulfamilie auf Basis der SF32LB56xV mit 4 MB + 8 MB OPI-PSRAM im Gehäuse und SKU-abhängigen Flash-Varianten."
tags:
  - Hardware
  - Modul
---

# SF32LB56-MOD { #sf32lb56-mod }

## Überblick { #overview }

SF32LB56-MOD ist eine universelle, stromsparende Bluetooth-MCU-Modulfamilie auf Basis der SF32LB56xV-Plattform von SiFli. Die Standardkonfiguration verwendet den SF32LB566VCB36 mit 4 MB + 8 MB OPI-PSRAM im SiP und 1 MB QSPI-NOR. Das kompakte Modul vereint Dual-Core-MCU-Verarbeitung, Bluetooth 5.3 mit BLE Audio, Grafikbeschleunigung, Audioschnittstellen, SKU-abhängige Flash-Varianten und einen integrierten RF-Pfad.

Das Modul integriert den RF-Pfad, den Quarz und den schnellen Speicher. Als Antenne ist entweder eine Leiterplattenantenne auf dem Modul oder eine externe Antenne über einen IPEX-kompatiblen Anschluss vorgesehen. Das fertige Produkt muss hinsichtlich der RF-Leistung validiert werden; außerdem muss das Layout der Trägerplatine zur gewählten Antennenausführung passen. Die Schnittstellen und Speichervarianten unterstützen Produkte mit Anforderungen an Display, Audio, Sensorik und lokale Verarbeitung.

Die Familie ist mit mehreren Speicherkonfigurationen erhältlich. Alle Varianten haben Außenmaße von 18,0 × 32,9 × 3,1 mm und sind für einen Betrieb von −40 °C bis +85 °C ausgelegt. Der auf DS5602 V0.3 basierende [Hardware-Design-Leitfaden für SF32LB56-MOD](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md) enthält weitere Angaben zu Antenne und Layout. Die SiFli-Modellübersicht für Module führt die Speicherkonfigurationen auf, ordnet den einzelnen SKUs jedoch keine Antennenausführung zu. Klären Sie die Antennenausführung des gewählten Moduls mit SiFli, bevor Sie das Layout der Trägerplatine festlegen.

!!! info
    Die nachfolgend aufgeführten Rechen-, Grafik- und Audiofunktionen beziehen sich auf die im Modul integrierte Plattform SF32LB56xV. Welche Funktionen extern verfügbar sind, hängt vom Modul-Pinout und der Pin-Multiplexierung ab. Architektur und vollständige Peripherie der Chipfamilie sind auf der Seite [SF32LB56x](../chips/SF32LB56x.md) beschrieben. Diese Seite behandelt die Modul-Integration, SKU-abhängige Speicherbestückung, Versorgungsschienen und Auswahlkriterien.

## Anwendungen { #applications }

SiFli nennt für SF32LB56-MOD folgende Anwendungsbereiche:

- Wearables: hochwertige Smartwatches, Fitnessarmbänder, tragbare Medizingeräte und Fitnessgeräte
- Industrie: kostengünstige Displaylösungen, grafische HMI-Systeme, industrielle Steuerzentralen für Sensoren, Anlagenüberwachung und Messgeräte
- Automotive: zentrale Steuereinheiten für Elektrofahrzeuge, Fahrzeugschlüssel und tragbare Fahrzeugfernbedienungen im Wearable-Format
- Hausautomation: kleine und mittelgroße intelligente Haushaltsgeräte sowie smarte Türschlösser
- Allgemein: stromsparende Sensor-Hubs und Bluetooth Mesh
- AIoT-Beispiele: Spracherkennung für Befehle, Smart-Home-Geräte, intelligente Schlüssel und Bedienpanels

Ziehen Sie SF32LB56-MOD in Betracht, wenn das Design eine oder mehrere der folgenden Eigenschaften erfordert:

- Integration von RF-Pfad, Antennenoption, Quarz und schnellem Speicher auf Modulebene
- Unterschiedliche Speicherkonfigurationen entsprechend den aufgeführten Modul-SKUs
- Schnittstellen für Display, Audio, Sensorik und lokale Verarbeitung
- Kompakte Abmessungen für Produkte mit begrenztem Bauraum

## Entwicklungsressourcen { #development-resources }

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB56x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Moduldatenblatt][Module Datasheet]__
- :fontawesome-solid-microchip: __[Chipübersicht][Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden][Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden SF32LB56x][SF32LB56x Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Muster bestellen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und technische Daten { #features-and-specifications }

### Regulatorische Kennzeichnungen { #regulatory-markings }

Die bereitgestellten SiFli-Etikettendesigns für **SF32LB56-MOD-N16R12N1** und **SF32LB56-MOD-A128R12N1** zeigen folgende Kennungen und die CE-Kennzeichnung.

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 780px; margin: 1rem auto;">
<figure style="margin: 0;">
<a href="assets/SF32LB56-MOD/N16R12N1-label.jpg"><img src="assets/SF32LB56-MOD/N16R12N1-label.jpg" alt="SF32LB56-MOD-N16R12N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB56-MOD-N16R12N1</figcaption>
</figure>
<figure style="margin: 0;">
<a href="assets/SF32LB56-MOD/A128R12N1-label.jpg"><img src="assets/SF32LB56-MOD/A128R12N1-label.jpg" alt="SF32LB56-MOD-A128R12N1" loading="lazy" style="display: block; width: 100%; height: auto;"></a>
<figcaption>SF32LB56-MOD-A128R12N1</figcaption>
</figure>
</div>

<div align="center" markdown>

*Kennzeichnungen der bereitgestellten SF32LB56-MOD-Etiketten*

| Feld | Aufdruck |
| --- | --- |
| Gekennzeichnete Varianten | `SF32LB56-MOD-N16R12N1`, `SF32LB56-MOD-A128R12N1` |
| FCC | `2BVUV-SF32LB56` |
| IC | `35666-SF32LB56` |
| CMIIT ID | `25J3260UM187` |
| HVIN | `SF32LB56` |
| CE-Kennzeichnung | Auf beiden Etiketten vorhanden |

</div>

Die Angaben wurden von den Etiketten übernommen; eine unabhängige Prüfung anhand von Zulassungsunterlagen oder einer Konformitätserklärung ist nicht erfolgt. Lassen Sie sich von SiFli die Zulassungsunterlagen, Antennenbedingungen und Integrationsanweisungen für die genaue Modulrevision bestätigen. Übertragen Sie diese Kennzeichnungen ohne entsprechende Nachweise nicht auf andere Varianten. Modulkennzeichnungen belegen nicht die Konformität des Endprodukts.

### Speicherschnittstellen und Modulvarianten { #storage-interfaces-and-module-variants }

<span id="memory-and-module-variants"></span>

<div align="center"><em>Modulvarianten des SF32LB56-MOD</em></div>

<div align="center" markdown>

| Modulcode | Wählbarer Speicher | PSRAM | Standard-Flash | Temperatur | Abmessungen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C bis +85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

!!! note "Individuelle Anpassungen"
    Für andere Modulkonfigurationen oder individuelle Anpassungen [wenden Sie sich an μForge.io](../../about/contact.md).

Die [Modellübersicht für SiFli-Module](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) führt diese drei Konfigurationen auf und weist darauf hin, dass weitere Varianten angepasst werden können. Klären Sie mit SiFli, welche SKUs derzeit verfügbar sind und welche Speicherkonfiguration sie haben.

SiFli führt SF32LB566VCB36 mit 4 MB + 8 MB OPI-PSRAM und 1 MB QSPI-NOR als Standardkonfiguration auf; diese Speicherausstattung entspricht N16R12N1. Die Modellübersicht ordnet A128R12N1 und D128R12N1 keine eigene Chip-Teilenummer zu. Lassen Sie sich die genaue Chip-Teilenummer für diese SKUs von SiFli bestätigen.

### Rechenleistung und Speicher { #compute-and-memory }

- HCPU: Arm Cortex-M33 STAR-MC1 mit bis zu 240 MHz, bis zu 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1 mit bis zu 96 MHz, bis zu 148 DMIPS / 394 EEMBC CoreMark
- HCPU-Speicher: 32 KB Instruktions-Cache, 16 KB Daten-Cache und 800 KB SRAM, davon 128 KB Retention-SRAM
- LCPU-Speicher: 16 KB Instruktions-Cache, 8 KB Daten-Cache und 160 KB Retention-SRAM
- FPU mit einfacher Genauigkeit und MPU auf beiden Kernen
- Matrixbeschleuniger für neuronale Netze und Signalverarbeitungsbeschleuniger für anspruchsvollere lokale Aufgaben

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth 5.3 mit BLE-Audio-Unterstützung
- Empfindlichkeit: -100 dBm bei BLE mit 1 Mbit/s, -96,3 dBm bei BR, -95,5 dBm bei EDR2 und -88,5 dBm bei EDR3
- Maximale Sendeleistung: 19 dBm bei BR/BLE und 13 dBm bei EDR2/EDR3
- BR-Spitzenempfangsstrom: 2,2 mA bei 3,3 V

### Grafik und Display { #graphics-and-display }

- 2D/2.5D-Grafik-Engine ePicasso 2.0
- Hardwarebeschleunigte Drehung, Skalierung, Spiegelung und Alpha-Blending
- Grafikverarbeitung bis 1024 × 1024
- Verlustfreie Grafikdekompression mit eZip 2.0 und Unterstützung für eZip-A-Animationen
- LCD-Unterstützung für 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB und JDI
- TurboPixel: extDMA komprimiert den finalen Framebuffer verlustbehaftet mit festem Kompressionsverhältnis; der Display-Controller dekomprimiert ihn. Dadurch sinken sowohl die für den jeweiligen Workload benötigte PSRAM-Bandbreite als auch der benötigte Framebuffer-Speicher.

### Audio { #audio }

- 1 × 24-Bit-Audio-DAC
- 1 × 24-Bit-Sigma-Delta-Audio-ADC
- 2 × PDM-Schnittstellen (PDM1/PDM2); DS5602 V0.3 nennt zwei Digitarmikrofoneingänge
- 1 × I2S-Schnittstelle
- Audio-Abtastratenkonvertierung und EQ-Beschleunigung

Die empfohlene Pinbelegung nennt PDM1_DATA auf PA20 oder PA64, PDM1_CLK auf PA24 oder PA69, PDM2_DATA auf PA25 oder PA71 sowie PDM2_CLK auf PA26 oder PA73. Das sind alternative Pin-Multiplexoptionen, keine Bestätigung der Leiterbahnführung auf dem Trägerboard. DS5602 V0.3 bestätigt weder Kanalteilung noch eine Konfiguration mit vier Mikrofonen. Prüfen Sie vor einer Mehrmikrofon-Auslegung den unterstützten Modus und die tatsächliche Boardführung.

### Stromversorgung und I/O { #power-and-io }

- Empfohlener Betriebsbereich für VDD_3V3: 2,97–3,6 V
- Empfohlener Betriebsbereich für VDD_1V8: 1,7–1,95 V
- Empfohlener Betriebsbereich für VDDIO: 1,7–3,6 V
- VDD_3V3, VDD_1V8 und VDDIO müssen gleichzeitig eingeschaltet werden
- Der Schnittstellenpegel von PA00–PA11 ist fest auf 3,3 V eingestellt und folgt nicht VDDIO
- 89-polige Modulschnittstelle
- Betriebstemperatur: −40 °C bis +85 °C

## Verwandte Produkte { #related-products }

### Chip { #chip }

Basiert auf [SF32LB56x](../chips/SF32LB56x.md), insbesondere auf der Plattformfamilie SF32LB56xV. Weitere Informationen zu Architektur, Display, Audio und Gehäuse der zugrunde liegenden Chipfamilie finden Sie auf der Chipseite.

### Entwicklungsboards { #development-kits }

Das [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) eignet sich zur Validierung von Display, Audio, Speicher und Peripherietreibern. Die Dokumentation führt die Konfigurationen N16R12N1 und A128R12N1 auf. Prüfen Sie Modulkennzeichnung und Board-Revision, bevor Sie die Speicherausstattung als Designgrundlage verwenden.

### Referenzprodukte { #reference-products }

Die von SiFli dokumentierten Anwendungsbereiche umfassen Wearables, industrielle Display- und HMI-Geräte, Fahrzeugsteuerungen, Smart-Home-Geräte, stromsparende Sensor-Hubs und Bluetooth-Mesh-Produkte.
