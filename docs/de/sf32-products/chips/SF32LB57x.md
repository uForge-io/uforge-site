---
icon: lucide/microchip
description: "SF32LB57x: Ultra-Low-Power-Multicore-AIoT-MCU mit Dual-Mode-Bluetooth, zwei 240-MHz-Kernen, ePicasso-3.0-Grafik, eZip 3.0 und kompakten QFN-/BGA-Gehäusen."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Überblick { #overview }

Die Serie SF32LB57x ist eine erweiterte, hochintegrierte AIoT-MCU-Familie mit extrem niedrigem Energiebedarf für Wearables, tragbare Smart Devices, Smart-Home-Geräte und kompakte Display-Produkte. Sie ist für Designs gedacht, die mehr Grafik, Bluetooth-Audio, Kameraeingang, externen Speicher und Always-on-Verhalten benötigen, als eine einfache Bluetooth-MCU komfortabel leisten kann, ohne die Kompromisse bei Energiebedarf, Kosten und Integration einer Plattform der Anwendungsprozessor-Klasse einzugehen.

SF32LB57x nutzt eine Drei-Kern-Architektur mit Arm Cortex-M33 STAR-MC1[^1]: Zwei Hochleistungskerne laufen mit bis zu 240 MHz, daneben ein Low-Power-Kern mit bis zu 24 MHz. Der [ACPU-Leitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) von SiFli bezeichnet die drei Kerne als HCPU, ACPU und LCPU: Die ACPU übernimmt Audio- und Grafikverarbeitung, während die LCPU Low-Power-Aufgaben wie BLE und die Verarbeitung von Sensordaten unterstützt. Die beiden Hochleistungskerne sind zusammen mit 1968 CoreMark / 740 DMIPS spezifiziert. Diese Aufteilung gibt UI-Rendering, Anwendungscode und Multimedia-Lasten ausreichend Spielraum und lässt Bluetooth, Sensor-Hub und andere Always-on-Aufgaben auf einem energiesparenderen Pfad laufen.

Die Plattform integriert 592 KB On-Chip-Retention-SRAM, die 2D/2.5D-Grafikbeschleunigung ePicasso 3.0, die Hardware-Dekompression eZip 3.0, einen dedizierten LCD-Controller, einen DCMI-Kamera-Controller, Dual-Mode-Bluetooth, hochwertige Audio-ADC/DAC-Ressourcen, Speicherschnittstellen für SiP- und externen Speicher, Sicherheitsbeschleunigung und flexible GPIO-Zuordnung über FreeIO. Ein zentrales Unterscheidungsmerkmal der 57x ist PTM (Parallel Task Machine): ein kompakter paralleler Task-Prozessor, der zyklenkritische Peripherieabläufe, eigene IO-Protokolle, Sensorerfassung, PWM-ähnliches Timing und ereignisgesteuerte Koordination von den Haupt-CPUs wegverlagert.

Für die Hardwareplanung ist die frühe Wahl der Versorgungs- und Gehäusevariante entscheidend. SF32LB57x ist in den Gehäusen QFN68, QFN80 und BGA112 erhältlich; die Bauteilfamilie legt fest, ob die Variante für Akkubetrieb oder für eine extern geregelte 3,3-V-Versorgung ausgelegt ist. Diese Wahl beeinflusst die Stromversorgungsarchitektur, die verfügbare GPIO-Anzahl, das Gehäuse-Fanout, das Display- und Speicher-Routing, den Debug-Zugang und die Inbetriebnahmestrategie. Wählen Sie daher das genaue bestellbare Bauteil, bevor Sie Schaltpläne wiederverwenden oder mit dem PCB-Layout beginnen.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. In kompatiblen SF32-Geräten dokumentiert SiFli STAR-MC1 als Anwendungsprozessor Arm Cortex-M33 STAR-MC1. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge, vorbehaltlich der üblichen bausteinspezifischen Integrationsarbeit. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone; Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, die für das genaue SF32-Gerät zu prüfen sind. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

[^2]: **Nur BGA112.** SF32LB57x integriert MPI1, MPI2 und MPI3; die internen Positionen des Speichers im Gehäuse siehe [SF32-Konvention zur Teilenummerierung](../family/SF32_namingrule.md). Bei beiden Konfigurationen mit Speicher im Gehäuse sind die Pins von MPI2 und MPI3 für den externen Zugriff nicht verfügbar, sodass nur 58 GPIOs bleiben: (1) ein PSRAM an MPI2, entweder allein oder zusammen mit einem PSRAM an MPI1; oder (2) NOR-Flash an MPI3. `SF32LB57GVD776` entspricht Fall (2): Seine zweite `7` kennzeichnet die interne Komponente an MPI3, daher sind nur 58 GPIOs verfügbar. In allen anderen Konfigurationen stehen die sechs mit MPI3 verbundenen BGA112-I/Os für MPI3 oder als statische GP-Ausgänge mit Pull-up- bzw. Pull-down-Konfiguration zur Verfügung; sie sind keine uneingeschränkten GPIOs. Der Eintrag `58 + 6` für `SF32LB57ZVN7N6` bedeutet daher 58 nutzbare GPIOs plus 6 Pins für MPI3 oder statische Ausgänge, nicht 64 frei zuweisbare GPIOs. Diese Einschränkung gilt nicht für die Gehäuse QFN68 und QFN80, die nur ihre nominelle GPIO-Anzahl bereitstellen und keine zusätzliche MPI3- oder statische Ausgangsoption haben.

[^3]: Gehäuseabmessungen und Dicke folgen den Bestelltabellen und Gehäusezeichnungen der SF32LB57x-Datenblätter von SiFli (DS5701 und DS5702, V0.2.1): QFN68 (7 × 7 mm, Zeichnungen mit 0,9 mm oder 1,1 mm), QFN80 (8 × 8 mm, Zeichnungen mit 0,9 mm oder 1,1 mm) und BGA112 (5,4 × 4,4 mm, 0,98 mm). Unter den aufgeführten Bauteilen verwendet nur SF32LB573UB776 das QFN68 mit 1,1 mm; die Bestelltabellen führen SF32LB57ZVN7N6 nicht auf, daher stammt seine BGA112-Dicke aus der einzigen BGA112-Zeichnung. Der Hardware-Designleitfaden von SiFli nennt zusätzlich eine BGA112-Option mit 1,03 mm, die die Datenblätter nicht zeigen. Das SF32LB57x-spezifische Diagramm zur Teilenummerierung ordnet U dem QFN68, Y dem QFN80 und V dem BGA112 zu; nehmen Sie nicht an, dass die Zuordnung von Y für andere SF32-Familien gilt. Prüfen Sie Dicke und Gehäusezeichnung für die genaue Teilenummer bei SiFli.
[^4]: Für die akkubetriebene Serie gibt das SF32LB57x-Datenblatt (DS5701) von SiFli für VBAT und VCC 3,0–4,7 V an, mit einer Einschaltspannung von 3,5 V ±10 %. Der Hardware-Designleitfaden von SiFli nennt einen engeren Eingangsbereich von 3,45–4,7 V (QFN68 Tabelle 2-1-1, QFN80 Tabelle 2-1-3, BGA112 Tabelle 2-1-5); die beiden Dokumente weichen voneinander ab. Bestätigen Sie daher den zutreffenden Eingangspin und die Grenzwerte im Datenblatt des genauen Bauteils.
[^5]: Der Eintrag zur I/O-Spannung fasst die unterstützten I/O-Domänen zusammen; er bedeutet nicht, dass jeder Pin beide Spannungen nutzen kann. VDDIOA versorgt, sofern separat gespeist, die GPIOs. VDDIOSB ist, sofern vorhanden, die I/O-Schiene des SiP-Speichers; der Leitfaden von SiFli gibt 1,8 V für PSRAM im Gehäuse und 3,3 V für NOR-Flash an. Für die QFN68-3,3-V-Serie spezifiziert Tabelle 2-1-2 VDDIOA nur mit 3,3 V. Prüfen Sie jeden Pin bzw. jede Domäne anhand des Gehäuseleitfadens und des Datenblatts des genauen Bauteils.

## Anwendungen { #applications }

**SF32LB57x passt gut zu** kompakten vernetzten Produkten, die Grafik, Bluetooth-Audio, Kameraeingang, externen Speicher oder Always-on-Sensorik auf einer Low-Power-MCU-Plattform benötigen, darunter:

- Wearable-Smartwatches und Fitnessarmbänder
- Intelligente Mensch-Maschine-Schnittstellen
- Smarte E-Paper-Geräte
- Kleine und mittlere Smart-Home-Haushaltsgeräte
- Tragbare Aufnahmegeräte und Audioprodukte
- Medizinische Wearables und Fitnessgeräte
- Industrielle Anzeige-, Sensor-, Überwachungs- und Messprodukte
- Wearables oder Handgeräte mit Kamera
- Display-zentrierte kompakte Terminals und Bedienfelder
- Controller für Fahrzeug-Mittelkonsolen, kabellose Autoschlüssel und tragbare Fahrzeugfernbedienungen
- Smarte Türschlösser
- Bluetooth-Walkie-Talkie- und Gegensprechprodukte
- Elektronische Bilderrahmen
- Bluetooth-Mesh- und Low-Power-Sensor-Hub-Netzwerke

Besonders geeignet ist sie, wenn das Design eine oder mehrere dieser Fähigkeiten benötigt:

- Zwei 240-MHz-Hochleistungskerne plus ein 24-MHz-Effizienzkern für UI-/Anwendungsarbeit und Low-Power-Hintergrundaufgaben
- ePicasso-3.0-Grafikbeschleunigung mit Drehung, Skalierung, Projektion, Spiegelung und Alpha-Blending in Echtzeit
- eZip-3.0-Dekompression für eZip-/eZip-A-, JPEG- und MJPEG-Ressourcen, ohne dass jede Ressource über einen CPU-lastigen Dekodierpfad laufen muss
- LCD-Schnittstellen über 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI und 8/16-Bit-EPD
- DCMI-Kameraeingang über DVP oder SPI/Dual-SPI/Quad-SPI
- Dual-Mode-Bluetooth 6.3 (BR/EDR und BLE), einschließlich BLE Audio und LE Long Range
- Hochwertige 24-Bit-Audio-ADC/DAC-Ressourcen für Wiedergabe, Aufnahme und Bluetooth-Telefonie
- SiP-OPI-PSRAM / QSPI-NOR sowie externe Speicheroptionen mit QSPI-NOR/NAND, QPI-PSRAM, SD, SDIO oder eMMC
- PTM-Auslagerung für eigene Peripherie-Aufgaben, deterministisches IO-Timing, schnelle Trigger-Reaktion und aufwandsarme Sensor- oder Schnittstellenautomatisierung

Die Angabe Bluetooth 6.3 folgt den SF32LB57x-Datenblättern (V0.2.1); die Produktkurzbeschreibungen v0.4 nennen noch eine frühere Revision. Bestätigen Sie optionale Funktionen anhand der aktuellen SiFli-Dokumentation für das genaue bestellbare Bauteil.

## Entwicklungsressourcen { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Produktkurzbeschreibung][Product Brief]__
- :fontawesome-solid-file-pdf: __[Datenblatt][Datasheet]__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch][User Manual]__
- :fontawesome-solid-file-lines: __[Originaler Designleitfaden (wiki.sifli.com)][Original Design Guide (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Hochleistungssystem mit zwei Arm-Cortex-M33-STAR-MC1-Kernen bis 240 MHz
- Low-Power-System mit einem Arm-Cortex-M33-STAR-MC1-Effizienzkern bis 24 MHz
- Score der beiden Hochleistungskerne: 1968 CoreMark / 740 DMIPS
- HCPU-Cache: 32 KB 2-Wege-Instruktions-Cache und 16 KB 4-Wege-Daten-Cache
- ACPU-Instruktions-/Daten-Cache-Ressourcen für XIP und Anwendungsbeschleunigung
- 512 KB HPSYS-Retention-SRAM plus 80 KB LPSYS-Retention-SRAM, insgesamt 592 KB On-Chip-SRAM
- 128 KB D-TCM ohne Wartezyklen, geteilt mit dem Adressraum des HPSYS-SRAM
- FPU mit einfacher Genauigkeit und MPU-Unterstützung
- GPDMA mit Linked-List-Modus

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- Parallel Task Machine mit 4 Kernen für eigene Peripherie-Aufgaben, die von hardwaregetakteter Ausführung statt kontinuierlicher CPU-Bedienung profitieren
- Kompakter eigener Befehlssatz für Bus-Lese-/Schreibzugriffe, Datenoperationen, bedingte Sprünge, IO-Lese-/Schreibzugriffe, Ereignis-Wartezustände und feste Verzögerungen
- Timing-Kontrolle auf Zyklusebene bei Ausführung aus dem PTM-TCM, geeignet für deterministische IO-Abläufe
- Jeder PTM-Kern kann bis zu 16 IO-Kanäle bedienen, mit FIFO-/DMA-Unterstützung für eigene Kommunikationsschnittstellen
- PTM-Kerne können auf AHB-Busspeicher und Peripherieregister zugreifen, Interrupts an die CPU erzeugen und sich über interne Ereignismeldungen untereinander abstimmen
- Geeignet für eigene Schnittstellenprotokolle und PWM-Signale, gebündelte Speicher-/Datenoperationen, die zeitliche Koordination mehrerer Module und die automatische Sensorerfassung

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth-Funk
- Unterstützung für BLE Audio und LE Long Range
- Empfängerempfindlichkeit: −100 dBm bei BLE 1 Mbps, −107,5 dBm bei BLE 125 kbps, −96 dBm bei BR und −95 dBm bei EDR2
- Maximale Sendeleistung: 13 dBm für EDR2/EDR3 und 17 dBm für BR/BLE
- BR-Empfangsspitzenstrom: kann bei 3,8 V bis auf 2,0 mA sinken

### Grafik, Display und Kamera { #graphics-display-and-camera }

- 2D/2.5D-Grafik-Engine ePicasso 3.0
- Hardwarebeschleunigte Drehung, Skalierung, Projektion, Spiegelung, Alpha-Blending und Mehrebenen-Komposition
- Maximale Grafikauflösung von 2048 × 2048
- RGB-Formate einschließlich RGB888, RGB565, aRGB8888 und aRGB8565
- Weitere Formate einschließlich L8/L4, G8/G4/G2, A8/A4/A2 und YUV
- Dekompressions-Engine eZip 3.0 für verlustfreie eZip-/eZip-A-Bild- und Animationsressourcen
- Dekompression von JPEG-Bildern und MJPEG-Animationen
- Verkettete Ausführung von eZip und ePicasso ohne Zwischen-Framebuffer
- Dedizierter LCD-Controller mit Unterstützung für die Display-Schnittstellen 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI und 8/16-Bit-EPD
- Das Display-Subsystem unterstützt Always-on-Display-Anwendungen mit niedrigem Energiebedarf
- DCMI-Kamera-Controller mit Unterstützung für DVP- und SPI/Dual-SPI/Quad-SPI-Kameraschnittstellen

### Audio und Analogtechnik { #audio-and-analog }

- 1× hochwertiger 24-Bit-Audio-DAC mit 109 dB SNR
- 2× hochwertige 24-Bit-Audio-ADCs mit 97 dB SNR
- Abdeckung der Audio-Abtastraten von 8 kHz bis 96 kHz, einschließlich gängiger Telefonie- und Musikraten
- Micbias-LDO mit 1,4 V bis 2,8 V Ausgangsbereich und bis zu 2 mA Ausgangsstrom
- Unterstützt Audiowiedergabe, Aufnahme, Bluetooth-Telefonie und Designs für MP3-Wiedergabe über angeschlossenes Headset
- 1× universeller 12-Bit-SAR-ADC mit 12 Kanälen
- 1× On-Chip-Temperatursensor

### Speicher und Sicherheit { #storage-and-security }

- Unterstützung für SiP-OPI-PSRAM bis 156 MHz
- Unterstützung für SiP-NOR-Flash bis 104 MHz
- 3× MPI-Schnittstellen (QSPI) für NOR, NAND und QPI-PSRAM, mit adressabgebildetem XIP-Betrieb
- 2× SD/SDIO-Schnittstellen mit Unterstützung für SD 3.0, SDIO 3.0 und eMMC
- Unterstützung für Flash-Entschlüsselung im laufenden Betrieb
- Beschleuniger für AES, HASH und CRC
- Echter Zufallszahlengenerator (TRNG)
- Sicherheitsarchitektur eShield
- PSA Certified Level 1

### Peripherie und I/Os { #peripherals-and-ios }

- Bis zu 58 GPIOs, je nach Gehäuse und bestellbarem Bauteil
- Flexible GPIO-Zuordnung mit FreeIO
- 3× UART
- 4× I2C
- 2× SPI
- 2× I2S
- 2 PDM-Schnittstellen (bis zu zwei digitale Mikrofone pro Schnittstelle)
- 1× USB 2.0 Full-Speed
- 2× CAN
- PTM-Ereignisintegration für ereignisgesteuerte Peripherie-Abläufe und Multicore-Koordination
- 2× 16-Bit-GPTIM
- 4× 32-Bit-BTIM
- 2× 32-Bit-ATIM
- 2× 24-Bit-LPTIM
- 1× PWM
- 1× RTC
- 2× 24-Bit-WDT und 1× unabhängiger WDT

### Energiemanagement { #power-management }

- Integrierter hocheffizienter Buck-Wandler und Low-Power-LDOs
- Zwei externe 3,3-V-Versorgungsausgänge mit je bis zu 150 mA
- Stromaufnahme im Hibernate-Modus: 2,8 µA bei 3,8 V (akkubetriebene Referenzkonfiguration) oder 1 µA bei 3,3 V (extern versorgte Referenzkonfiguration)
- Integrierter konfigurierbarer linearer Li-Ion-Akkulader (bis zu 400 mA Ladestrom) bei der akkubetriebenen Basis
- Ladeschlussspannungsbereich des Laders von 4,2 V bis 4,45 V
- Akku-/Systemeingangsbereich[^4]: 3,0 V bis 4,7 V
- VBUS-Bereich: 4,5 V bis 5,5 V
- Betriebstemperaturbereich: −40 °C bis +85 °C

## Familienvarianten { #family-variants }

SF32LB57x umfasst akkubetriebene Varianten und Varianten für extern geregelte 3,3-V-Systeme. Wählen Sie die genaue Teilenummer vor der Schaltplanerfassung, denn Gehäusezeichnungen, Versorgungspins, verfügbare GPIO-Anzahl, integrierter Speicher und Randbedingungen auf Board-Ebene unterscheiden sich innerhalb der Familie.

Die folgenden Teilenummern stammen aus den Bestelltabellen der SF32LB57x-Datenblätter von SiFli (DS5701 und DS5702, V0.2.1, beide vorläufige Entwürfe), mit Ausnahme von `SF32LB57ZVN7N6`, das diese Tabellen nicht aufführen. Bestätigen Sie jeden genauen Bestellcode, die Konfiguration des Speichers im Gehäuse, die elektrischen Grenzwerte und die Gehäusezeichnung anhand der aktuellen bauteilspezifischen Dokumentation von SiFli, bevor Sie das Bauteil einplanen.

Die praktische Aufteilung bei der Bauteilauswahl lautet:

- **`SF32LB57xU`**: QFN68, akkubetriebene Lithium-Ionen-Gruppe (Ziffernstufe, z. B. `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, extern versorgte 3,3-V-Standardgruppe (Buchstabenstufe, z. B. `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, extern versorgte 3,3-V-Gruppe.

Das Datenblatt der akkubetriebenen Serie (DS5701) führt zusätzlich ein akkubetriebenes QFN80 (8 × 8 mm, 58 GPIOs) und ein akkubetriebenes BGA112 (bis zu 58 GPIOs plus 6 GPO- oder MPI-Schnittstellen-I/Os) auf. Seine Bestelltabelle enthält jedoch keine Teilenummer für ein akkubetriebenes QFN80 oder BGA112; bestätigen Sie daher die bestellbare SKU bei SiFli, bevor Sie um eine dieser Varianten herum entwerfen.

<div align="center"><em>SF32LB57x-QFN68-Varianten (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Gehäuse | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Abmessungen in der Draufsicht[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Dicke[^3] | 0,9 mm | 0,9 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Rastermaß | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| Speicher im Gehäuse | 4 MB OPI-PSRAM + 16 MB QSPI-NOR | 4 MB OPI-PSRAM + 16 MB + 8 MB QSPI-NOR (Dual-Die) | 4 MB OPI-PSRAM + 16 MB × 2 QSPI-NOR (Dual-Die) | 8 MB OPI-PSRAM, kein QSPI-NOR | 16 MB OPI-PSRAM, kein QSPI-NOR | Kein PSRAM, nur 1 MB QSPI-NOR |
| Stromversorgung[^4] | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | 3,0–4,7 V | **3,3 V** |
| I/O-Spannung[^5] | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V | 3,3 V / 1,8 V |
| Temperatur | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C |

</div>

<div align="center"><em>SF32LB57x-QFN80- / BGA112-Varianten (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Gehäuse | QFN80 | QFN80 | BGA112 | BGA112 |
| Abmessungen in der Draufsicht[^3] | 8 × 8 mm | 8 × 8 mm | 5,4 × 4,4 mm | 5,4 × 4,4 mm |
| Dicke[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 0,98 mm |
| Rastermaß | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 oder statische Ausgänge)[^2] | 58[^2] |
| Speicher im Gehäuse | 8 MB (2 × 4 MB, Dual-Die) OPI-PSRAM, kein QSPI-NOR | 16 MB OPI-PSRAM + 16 MB QSPI-NOR | Kein PSRAM + 16 MB QSPI-NOR | 16 MB OPI-PSRAM + 32 MB (2 × 16 MB, Dual-Die) QSPI-NOR |
| Stromversorgung | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| I/O-Spannung[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatur | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C |

</div>

Bei SF32LB57x ist die Gehäusewahl nicht nur eine Frage der PCB-Kosten. Sie beeinflusst die Verfügbarkeit der Display-Schnittstelle, das Routing des externen Speichers, das GPIO-Budget, die Belegung der Debug-/Download-Pins und den Fanout-Aufwand; das Gehäuse sollte daher zusammen mit der Versorgungsarchitektur festgelegt werden. Verwenden Sie als Basis für Stückliste und Schaltplan die bestellbare Teilenummer und nicht nur den Gehäusenamen — der Speicher-Suffix ändert die SiP-Speicherkonfiguration und kann Annahmen zum Boot-Medium, zur Versorgungssequenz und zu den Anforderungen an externen Speicher beeinflussen.

## Integrationspfad { #integration-path }

Mit dieser Abfolge machen Sie aus einer SF32LB57x-Vorauswahl ein validiertes Design:

1. **Firmware-Pfad nachweisen.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) und nutzen Sie dann den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um die vorgesehenen Funktionen für Grafik, Audio, Kamera, Bluetooth und Speicher zu validieren.
2. **Evaluierungshardware planen.** μForge führt derzeit weder ein SF32LB57-spezifisches Modul noch ein entsprechendes Entwicklungsboard im Katalog. Ermitteln Sie mit der [SF32-Produktauswahl](../product-selector.md) die am besten passende Evaluierungsplattform. Prüfen Sie vor der Übertragung der Ergebnisse auf ein 57x-Design, ob Gehäuse, Versorgung, Speicher und Schnittstellen abgedeckt sind.
3. **Hardware entwerfen und prüfen.** Nutzen Sie den lokalen [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) — einschließlich seiner [Selbstprüfung des Kundendesigns](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — und die Prüfabfolge [Design for Production](../../hardware/design-for-production.md), bevor Sie Schaltplan oder Layout freigeben; eine familienspezifische μForge-Checkliste ist derzeit nicht veröffentlicht.
4. **Maßgebliche Quelle prüfen.** Bestätigen Sie das genaue bestellbare Bauteil und Gehäuse anhand von SiFli-[Datenblatt][Datasheet], [Benutzerhandbuch][User Manual] und [originalem Designleitfaden] und nutzen Sie die [SiFli Approved Vendor List], wenn Sie kritische Stücklistenentscheidungen kontrollieren.

<!-- uf-faq:start -->
## Häufig gestellte Fragen { #frequently-asked-questions }

**Was sind die wichtigsten Spezifikationen des SF32LB57x?**
Der SF32LB57x kombiniert eine Anwendungs-CPU (2× Cortex-M33 @240 MHz) mit einem Low-Power-Kern (Cortex-M33 @24 MHz, mit einem dedizierten Bluetooth-Controller), 592 KB internem SRAM und Dual-Mode-Bluetooth (BT Classic + BLE). Grafik: ePicasso 3.0 + eZip 3.0. Gehäuse: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. Werte auf Familienebene; prüfen Sie das Datenblatt der genauen Typnummer.

**Welche Display-Schnittstellen unterstützt der SF32LB57x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. Die Verfügbarkeit hängt von Typnummer und Gehäuse ab.

**Wie viel Speicher im Gehäuse bietet der SF32LB57x?**
Bis zu 48 MB PSRAM und bis zu 32 MB NOR-Flash im Gehäuse, abhängig von der Typnummer.

**Welche Versorgungsspannung benötigt der SF32LB57x?**
3.0–4.7 V or 2.97–3.63 V, je nach Variante. Den genauen Bereich bestätigt das Datenblatt.

**Wo beginne ich ein Hardware-Design mit dem SF32LB57x?**
Beginnen Sie mit dem [Hardware-Design-Leitfaden für den SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) zu Schaltplan, Stromversorgung, Takt/RF und PCB-Layout und nutzen Sie vor der Freigabe die Checklisten für Schaltplan und Layout.
<!-- uf-faq:end -->

## Verwandte Produkte { #related-products }

### Basis für das Hardware-Design { #hardware-design-baseline }

Nutzen Sie den [Hardware-Design-Leitfaden (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), den offiziellen Hardware-Anwendungshinweis, das Datenblatt und die Approved Vendor List als Designbasis. Bestätigen Sie Versorgungsarchitektur, Gehäuse-Fanout sowie den Plan für Display, Speicher, Audio, Kamera, RF und Debug/Download, bevor Sie Schaltplan oder PCB freigeben.

### Entwicklungsboards { #development-kits }

Nutzen Sie die offiziellen Referenzschaltpläne, die Hinweise zum Minimalsystem und das Checklistenmaterial, um Versorgung, Takte, RF, Display, Speicher, Audio, Kamera und Produktionszugang zu planen.

### Referenzprodukte { #reference-products }

Typische SF32LB57x-Endprodukte sind Wearable-Uhren und -Armbänder, intelligente HMI-Geräte, E-Paper-Produkte, kleine und mittlere Smart-Home-Haushaltsgeräte, tragbare Aufnahmegeräte und Audioprodukte, Smart-Home-Panels, kompakte Display-Terminals und Bluetooth-Produkte mit Kamera.
