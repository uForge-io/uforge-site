---
icon: lucide/microchip
description: "SF32LB57x: Ultra-Low-Power-Multicore-AIoT-MCU mit Dual-Mode-Bluetooth, zwei 240-MHz-Kernen, ePicasso-3.0-Grafik, eZip 3.0 und kompakten QFN-/BGA-Gehäusen."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Überblick { #overview }

Die SF32LB57x-Serie ist eine erweiterte AIoT-MCU-Familie mit sehr niedrigem Energiebedarf für Wearables, mobile Smartgeräte, Smart-Home-Geräte und kompakte Displays. Sie richtet sich an Designs, die mehr Grafikleistung, Bluetooth-Audio, Kameraeingang, externen Speicher und Always-on-Funktionen benötigen, als eine einfache Bluetooth-MCU bieten kann, ohne die Nachteile einer Anwendungsprozessor-Plattform bei Energiebedarf, Kosten und Integration in Kauf nehmen zu müssen. SF32LB57x ist SiFlis Produktangebot für 2026 und eine Weiterentwicklung von SF32LB52x und SF32LB56x, die zugleich preislich wettbewerbsfähig bleiben soll. Die Familie bietet mehr CPU-Rechenleistung, eine leistungsfähigere Grafik, mehr GPIOs in kostengünstigen und einfach zu verarbeitenden QFN-Gehäusen sowie flexiblere Kombinationen mit Speicher im Gehäuse. Für die Grafikausgabe werden Auflösungen bis zu 1024 × 600 Pixel bei RGB888 mit 24 Bit Farbtiefe unterstützt.

SF32LB57x nutzt eine Drei-Kern-Architektur mit Arm Cortex-M33 STAR-MC1[^1]: Zwei Hochleistungskerne (HCPU und ACPU) laufen mit bis zu 240 MHz und erreichen zusammen 1968 CoreMark / 740 DMIPS; hinzu kommt ein 24-MHz-Low-Power-Kern (LCPU). Laut dem [ACPU-Leitfaden](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) von SiFli übernimmt die ACPU Audio- und Grafikverarbeitung, während die LCPU BLE-Aufgaben und die Verarbeitung von Sensordaten energieeffizient ausführt. Die Plattform integriert 592 KB Retention-SRAM, ePicasso-3.0-Grafik, eZip-3.0-Dekompression, LCD- und DCMI-Kamera-Controller, Dual-Mode-Bluetooth, Audio-ADC/DAC, Schnittstellen für SiP- und externen Speicher, Hardwarebeschleunigung für Sicherheitsfunktionen sowie eine flexible GPIO-Zuordnung über FreeIO. Ein zentrales Unterscheidungsmerkmal ist PTM (Parallel Task Machine): ein kompakter paralleler Task-Prozessor, der zyklenkritische Peripherieabläufe, eigene IO-Protokolle, Sensorerfassung, PWM-ähnliches Timing und die Ereignisverarbeitung von den Haupt-CPUs wegverlagert.

Wählen Sie die genaue bestellbare Teilenummer, bevor Sie Schaltpläne wiederverwenden oder mit dem PCB-Layout beginnen. SF32LB57x ist in den Gehäusen QFN68, QFN80 und BGA112 erhältlich. Je nach Bauteilfamilie ist die Basisvariante für Akkubetrieb oder für eine extern geregelte 3,3-V-Versorgung ausgelegt. Diese Wahl beeinflusst die Stromversorgungsarchitektur, die GPIO-Anzahl, das Gehäuse-Fanout, das Display- und Speicher-Routing, den Debug-Zugang und die Inbetriebnahmestrategie.

[^1]: STAR-MC1 ist ein konfigurierbarer Embedded-CPU-IP-Baustein von Arm China auf Basis von Armv8-M Mainline. Für kompatible SF32-Geräte beschreibt SiFli STAR-MC1 als Anwendungsprozessor Arm Cortex-M33 STAR-MC1. Das Softwaremodell auf Cortex-M33-Niveau erleichtert die Übernahme vorhandener Cortex-M33-Firmware, Middleware, RTOS-Portierungen und Werkzeuge; die übliche bausteinspezifische Integrationsarbeit bleibt erforderlich. Die Konfigurationen CU, SP und SE unterscheiden sich hauptsächlich bei Cache, TCM, XIPU und TrustZone. Arm Custom Instructions/CDE und die Coprozessor-Schnittstelle sind optionale Funktionen, deren Verfügbarkeit für das konkrete SF32-Gerät zu prüfen ist. In der SiFli-Dokumentation steht je nach Kontext ***Arm Cortex-M33 STAR-MC1*** oder ***Arm Cortex-M33***.

[^2]: **Nur BGA112.** SF32LB57x integriert MPI1, MPI2 und MPI3. Die Bezeichnungen der internen Speicherpositionen finden Sie in der [SF32-Konvention zur Teilenummerierung](../family/SF32_namingrule.md). Bei beiden Konfigurationen mit Speicher im Gehäuse sind die Pins von MPI2 und MPI3 für den externen Zugriff nicht verfügbar; damit bleiben 58 GPIOs: (1) bei einem PSRAM an MPI2, allein oder zusätzlich zu einem PSRAM an MPI1, oder (2) bei NOR-Flash an MPI3. `SF32LB57GVD776` entspricht Fall (2): Die zweite `7` kennzeichnet die interne Komponente an MPI3, sodass nur 58 GPIOs verfügbar sind. In allen anderen Konfigurationen können die sechs mit MPI3 verbundenen BGA112-I/Os für MPI3 oder als statische GP-Ausgänge mit Pull-up- bzw. Pull-down-Konfiguration genutzt werden; uneingeschränkte GPIOs sind sie nicht. Der Eintrag `58 + 6` für `SF32LB57ZVN7N6` bedeutet daher 58 nutzbare GPIOs plus 6 Pins für MPI3 oder statische Ausgänge, nicht 64 frei zuweisbare GPIOs. Diese Einschränkung gilt nicht für QFN68- und QFN80-Gehäuse: Sie bieten nur ihre nominelle GPIO-Anzahl und keine zusätzliche MPI3- oder statische Ausgangsoption.

[^3]: Gehäuseabmessungen und -dicken folgen den Bestelltabellen und Gehäusezeichnungen der SF32LB57x-Datenblätter von SiFli (DS5701 und DS5702): QFN68 (7 × 7 mm, Zeichnungen mit 0,9 mm oder 1,1 mm), QFN80 (8 × 8 mm, Zeichnungen mit 0,9 mm oder 1,1 mm) und BGA112 (5,4 × 4,4 mm, 0,98 mm). Bauteile mit drei Speicher-Dies (ein PSRAM plus Dual-Die-QSPI-NOR) sind mit der dickeren Gehäuseoption ausgeführt: 1,1 mm bei QFN68 und 1,03 mm bei BGA112, gemäß dem Hardware-Applikationsleitfaden von SiFli. SF32LB57ZVN7N6 ist nicht in den Bestelltabellen der Datenblätter aufgeführt; seine BGA112-Dicke von 0,98 mm stammt daher aus der einzigen BGA112-Zeichnung dieser Datenblätter. Das SF32LB57x-spezifische Diagramm zur Teilenummerierung ordnet U dem QFN68, Y dem QFN80 und V dem BGA112 zu. Übertragen Sie die Zuordnung von Y nicht auf andere SF32-Familien. Prüfen Sie Dicke und Gehäusezeichnung der genauen Teilenummer bei SiFli.
[^4]: Für die akkubetriebene Serie gibt das SF32LB57x-Datenblatt (DS5701) von SiFli für VBAT und VCC 3,0–4,7 V an, mit einer Einschaltspannung von 3,5 V ±10 %. Der Hardware-Designleitfaden von SiFli nennt einen engeren Eingangsbereich von 3,45–4,7 V (QFN68 Tabelle 2-1-1, QFN80 Tabelle 2-1-3, BGA112 Tabelle 2-1-5); die beiden Dokumente weichen voneinander ab. Bestätigen Sie daher den zutreffenden Eingangspin und die Grenzwerte im Datenblatt des genauen Bauteils.
[^5]: Der Eintrag zur I/O-Spannung fasst die unterstützten I/O-Domänen zusammen; er bedeutet nicht, dass jeder Pin beide Spannungen nutzen kann. VDDIOA versorgt, sofern separat gespeist, die GPIOs. VDDIOSB ist, sofern vorhanden, die I/O-Schiene des SiP-Speichers; der Leitfaden von SiFli gibt 1,8 V für PSRAM im Gehäuse und 3,3 V für NOR-Flash an. Für die QFN68-3,3-V-Serie spezifiziert Tabelle 2-1-2 VDDIOA nur mit 3,3 V. Prüfen Sie jeden Pin bzw. jede Domäne anhand des Gehäuseleitfadens und des Datenblatts des genauen Bauteils.
[^6]: Dual-Die: Die beiden Dies sind voneinander unabhängige Speicherbausteine an getrennten MPI-Schnittstellen und können unabhängig voneinander angesprochen werden.

## Anwendungen { #applications }

**SF32LB57x passt gut zu** kompakten vernetzten Produkten, die UI-Grafik, Bluetooth-Audio, Kameraeingang, externen Speicher oder Always-on-Sensorik auf einer Low-Power-MCU-Plattform kombinieren, darunter:

- Smartwatches, Fitnessarmbänder und medizinische Wearables
- Intelligente Mensch-Maschine-Schnittstellen, Display-zentrierte Terminals und Bedienfelder
- Smarte E-Paper-Geräte und elektronische Bilderrahmen
- Kleine und mittlere Smart-Home-Haushaltsgeräte und smarte Türschlösser
- Tragbare Aufnahmegeräte, Audioprodukte sowie Bluetooth-Walkie-Talkies und Gegensprechanlagen
- Wearables oder Handgeräte mit Kamera
- Industrielle Anzeige-, Sensor-, Überwachungs- und Messprodukte
- Controller für Fahrzeug-Mittelkonsolen, kabellose Autoschlüssel und tragbare Fahrzeugfernbedienungen
- Bluetooth-Mesh- und Low-Power-Sensor-Hub-Netzwerke

Siehe [Merkmale und Spezifikationen](#features-and-specs) für die Grafik-, Kamera-, Audio-, Speicher- und PTM-Fähigkeiten hinter diesen Einsatzfällen. Die Angabe Bluetooth 6.3 folgt den SF32LB57x-Datenblättern; die Produktkurzbeschreibungen nennen noch eine frühere Revision. Bestätigen Sie optionale Funktionen anhand der aktuellen SiFli-Dokumentation für das genaue bestellbare Bauteil.

## Entwicklungsressourcen { #development-resources }

[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __Produktkurzbeschreibung ([Batterie](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3,3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __Datenblatt ([Batterie / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3,3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[Benutzerhandbuch (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-solid-file-lines: __[Originaler Designleitfaden (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[Leitfaden zum Entwicklungsboard (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[Hardware-Design-Leitfaden (μForge)][Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Muster kaufen][Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Entwicklungsboards kaufen][Buy Dev Kits]__

</div>

---

## Merkmale und Spezifikationen { #features-and-specs }

### Rechenleistung und Speicher { #compute-and-memory }

- Zwei Arm-Cortex-M33-STAR-MC1-Hochleistungskerne mit bis zu 240 MHz, mit FPU und MPU (zusammen 1968 CoreMark / 740 DMIPS)
- Arm-Cortex-M33-STAR-MC1-Low-Power-Kern mit 24 MHz
- 32 KB Instruktions-Cache + 16 KB Daten-Cache (HCPU)
- 592 KB Retention-SRAM (512 KB HPSYS + 80 KB LPSYS), davon 128 KB D-TCM ohne Wartezyklen
- Variantenabhängige Speicheroptionen im Gehäuse, bis zu 48 MB PSRAM und 32 MB NOR-Flash

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- Parallel Task Machine mit 4 Kernen für eigene Peripherie-Aufgaben, mit hardwaregetakteter Ausführung statt kontinuierlicher CPU-Bedienung
- Timing auf Zyklusebene für deterministische IO-Abläufe
- Bis zu 16 IO-Kanäle pro Kern, mit FIFO-/DMA-Unterstützung
- Zugriff auf AHB-Speicher und Peripherieregister, CPU-Interrupts und Ereignisse zwischen den Kernen

### Drahtlose Konnektivität { #wireless-connectivity }

- Dual-Mode-Bluetooth 6.3 (Classic Bluetooth und BLE), mit BLE Audio und LE Long Range
- Maximale Sendeleistung:
    - 17 dBm für BLE/BR
    - 13 dBm für EDR2 und EDR3
- Empfindlichkeit: −100 dBm bei BLE mit 1 Mbit/s

### Grafik, Display und Kamera { #graphics-display-and-camera }

Maximale Auflösung und Panel-Schnittstellen: siehe [Schnittstellenmatrix pro Gerät](../../learn/graphics/display-controller.md#per-device-interface-matrix).

- ePicasso-3.0-2D/2.5D-Grafikbeschleuniger, bis zu 2048 × 2048
- eZip-3.0-Hardware-Decoder für verlustfreies eZip/eZip-A sowie JPEG und MJPEG
- Dedizierter LCD-Controller mit Unterstützung für 8080, SPI/DSPI/QSPI, DPI/RGB, JDI und 8/16-Bit-EPD
- DCMI-Kamera-Controller mit Unterstützung für DVP und SPI/DSPI/QSPI

### Audio und Analogtechnik { #audio-and-analog }

- 1 × 24-Bit-Audio-DAC mit 109 dB SNR
- 2 × 24-Bit-Audio-ADC mit 97 dB SNR
- 1 × 12-Bit-ADC für allgemeine Anwendungen (12 Kanäle)
- Temperatursensor

### Speicher und Sicherheit { #storage-and-security }

- 3 × MPI (QSPI) für NOR, NAND und QPI-PSRAM, mit XIP
- 2 × SD 3.0/SDIO 3.0/eMMC
- Hardware-Beschleuniger für AES/HASH/CRC
- TRNG
- Flash-Entschlüsselung im laufenden Betrieb und Sicherheitsarchitektur eShield
- PSA Certified Level 1

### Peripherie und I/Os { #peripherals-and-ios }

- 3 × UART
- 4 × I2C
- 2 × SPI
- 2 × I2S
- 2 × PDM-Schnittstelle (bis zu zwei digitale Mikrofone pro Schnittstelle)
- 1 × USB 2.0 FS
- 2 × CAN
- RTC, Watchdog und Allzweck-Timer (GPTIM, BTIM, ATIM, LPTIM) mit PWM
- Bis zu 58 GPIOs, je nach Gehäuse und Bauteil, mit flexibler Zuordnung über FreeIO

### Energiemanagement { #power-management }

- Integrierter Buck-Wandler und Low-Power-LDOs; zwei externe 3,3-V-Ausgänge mit je bis zu 150 mA
- Hibernate-Strom: 2,8 µA bei 3,8 V (akkubetriebene Basis) oder 1 µA bei 3,3 V (extern versorgte Basis)
- Li-Ion-Lader mit bis zu 400 mA (4,2 V bis 4,45 V) bei der akkubetriebenen Basis
- Akku-/Systemeingangsbereich[^4]: 3,0 V bis 4,7 V
- VBUS-Bereich: 4,5 V bis 5,5 V
- Betriebstemperaturbereich: −40 °C bis +85 °C

## Familienvarianten { #family-variants }

SF32LB57x umfasst akkubetriebene Varianten und Varianten für extern geregelte 3,3-V-Systeme. Wählen Sie die genaue Teilenummer vor der Schaltplanerfassung, denn Gehäusezeichnungen, Versorgungspins, verfügbare GPIO-Anzahl, integrierter Speicher und Randbedingungen auf Board-Ebene unterscheiden sich innerhalb der Familie.

Die folgenden Teilenummern stammen aus den Bestelltabellen der SF32LB57x-Datenblätter von SiFli (DS5701 und DS5702, beide vorläufige Entwürfe), mit Ausnahme von `SF32LB57ZVN7N6`, das diese Tabellen nicht aufführen. Bestätigen Sie jeden genauen Bestellcode, die Konfiguration des Speichers im Gehäuse, die elektrischen Grenzwerte und die Gehäusezeichnung anhand der aktuellen bauteilspezifischen Dokumentation von SiFli, bevor Sie das Bauteil einplanen.

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
| Dicke[^3] | 0,9 mm | 1,1 mm | 1,1 mm | 0,9 mm | 0,9 mm | 0,9 mm |
| Rastermaß | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm | 0,35 mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| PSRAM im Gehäuse | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | Keine |
| NOR-Flash im Gehäuse | 16 MB QSPI-NOR | 16 MB + 8 MB QSPI-NOR (Dual-Die)[^6] | 16 MB × 2 QSPI-NOR (Dual-Die)[^6] | Keine | Keine | 1 MB QSPI-NOR |
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
| Dicke[^3] | 0,9 mm | 0,9 mm | 0,98 mm | 1,03 mm |
| Rastermaß | 0,35 mm | 0,35 mm | 0,4 mm | 0,4 mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 oder statische Ausgänge)[^2] | 58[^2] |
| PSRAM im Gehäuse | 8 MB (2 × 4 MB, Dual-Die) OPI-PSRAM[^6] | 16 MB OPI-PSRAM | Keine | 16 MB OPI-PSRAM |
| NOR-Flash im Gehäuse | Keine | 16 MB QSPI-NOR | 16 MB QSPI-NOR | 32 MB (2 × 16 MB, Dual-Die) QSPI-NOR[^6] |
| Stromversorgung | **3,3 V** | **3,3 V** | **3,3 V** | **3,3 V** |
| I/O-Spannung[^5] | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V | 3,3 V / 1,8 V |
| Temperatur | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C | −40 bis 85 °C |

</div>

Bei SF32LB57x ist die Gehäusewahl nicht nur eine Frage der PCB-Kosten. Sie beeinflusst die Verfügbarkeit der Display-Schnittstelle, das Routing des externen Speichers, das GPIO-Budget, die Belegung der Debug-/Download-Pins und den Fanout-Aufwand; das Gehäuse sollte daher zusammen mit der Versorgungsarchitektur festgelegt werden. Verwenden Sie als Basis für Stückliste und Schaltplan die bestellbare Teilenummer und nicht nur den Gehäusenamen — der Speicher-Suffix ändert die SiP-Speicherkonfiguration und kann Annahmen zum Boot-Medium, zur Versorgungssequenz und zu den Anforderungen an externen Speicher beeinflussen.

## Integrationspfad { #integration-path }

Mit dieser Abfolge machen Sie aus einer SF32LB57x-Vorauswahl ein validiertes Design:

1. **Firmware-Pfad nachweisen.** Beginnen Sie mit der [Einstiegsanleitung zum SiFli SDK](../../getting-started/sifli/getting-started-sifli-sdk.md) und nutzen Sie dann den [SiFli-SDK-Workflow](../../develop/platforms/sifli-sdk/overview.md) und die [Beispiele](../../develop/examples/index.md), um die vorgesehenen Funktionen für Grafik, Audio, Kamera, Bluetooth und Speicher zu validieren.
2. **Evaluierungshardware planen.** Evaluieren Sie Display, Kamera, Audio und Konnektivität mit dem [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md). Prüfen Sie die Speicherkonfiguration des Moduls, die Platinenrevision und die Belegung gemeinsam genutzter Pins, bevor Sie das Board als Grundlage für ein 57x-Produkt verwenden.
3. **Hardware entwerfen und prüfen.** Nutzen Sie den lokalen [Hardware-Design-Leitfaden](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) — einschließlich seiner [Selbstprüfung des Kundendesigns](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — und die Prüfabfolge [Design for Production](../../hardware/design-for-production.md), bevor Sie Schaltplan oder Layout freigeben; eine familienspezifische μForge-Checkliste ist derzeit nicht veröffentlicht.
4. **Maßgebliche Quelle prüfen.** Bestätigen Sie das genaue bestellbare Bauteil und Gehäuse anhand von SiFli-[Datenblatt][Datasheet], [Benutzerhandbuch][User Manual] und [originalem Designleitfaden] und nutzen Sie die [SiFli Approved Vendor List], wenn Sie kritische Stücklistenentscheidungen kontrollieren.

<!-- uf-faq:start -->
## Häufig gestellte Fragen { #frequently-asked-questions }

**Was sind die wichtigsten Spezifikationen des SF32LB57x?**
Der SF32LB57x kombiniert eine Anwendungs-CPU (2× Cortex-M33 @240 MHz) mit einem Low-Power-Kern (Cortex-M33 @24 MHz; dedizierter Bluetooth-Controller). Hinzu kommen 592 KB internes SRAM und Dual-Mode-Bluetooth (BT Classic + BLE). Grafik: ePicasso 3.0 + eZip 3.0. Gehäuse: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5,4 × 4,4 mm (BGA112)). USB 2.0 FS.

**Welche Display-Schnittstellen unterstützt der SF32LB57x?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. ([Schnittstellenmatrix pro Gerät](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**Welche maximale Display-Auflösung unterstützt der SF32LB57x?**
Bis zu 1024 × 600 in RGB888 über die DPI/RGB-Schnittstelle. ([Schnittstellenmatrix pro Gerät](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**Wie viel Speicher im Gehäuse bietet der SF32LB57x?**
Bis zu 48 MB PSRAM und bis zu 32 MB NOR-Flash im Gehäuse.

**Welche Versorgungsspannung benötigt der SF32LB57x?**
3,0–4,7 V oder 2,97–3,63 V.

**Wo beginne ich ein Hardware-Design mit dem SF32LB57x?**
Beginnen Sie mit dem [Hardware-Design-Leitfaden für den SF32LB57x](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) zu Schaltplan, Stromversorgung, Takt/RF und PCB-Layout und nutzen Sie vor der Freigabe die Checklisten für Schaltplan und Layout.
<!-- uf-faq:end -->

## Verwandte Produkte { #related-products }

### Basis für das Hardware-Design { #hardware-design-baseline }

Nutzen Sie den [Hardware-Design-Leitfaden (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), den offiziellen Hardware-Anwendungshinweis, das Datenblatt und die Approved Vendor List als Designbasis. Bestätigen Sie Versorgungsarchitektur, Gehäuse-Fanout sowie den Plan für Display, Speicher, Audio, Kamera, RF und Debug/Download, bevor Sie Schaltplan oder PCB freigeben.

### Entwicklungsboards { #development-kits }

Das [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) dient zur Evaluierung von RGB-Displays, DVP-Kameras, zwei PDM-Mikrofonen, Lautsprecherausgabe, SDIO-Wi-Fi und USB. Es basiert auf dem SF32LB57-Core-Board, das bis zu seiner vollständigen RF-Zertifizierung und kommerziellen Verfügbarkeit als 57-Modul dient.

Nutzen Sie die offiziellen Referenzschaltpläne, die Hinweise zum Minimalsystem und das Checklistenmaterial, um Versorgung, Takte, RF, Display, Speicher, Audio, Kamera und Produktionszugang zu planen.

### Referenzprodukte { #reference-products }

Typische SF32LB57x-Endprodukte sind Wearable-Uhren und -Armbänder, intelligente HMI-Geräte, E-Paper-Produkte, kleine und mittlere Smart-Home-Haushaltsgeräte, tragbare Aufnahmegeräte und Audioprodukte, Smart-Home-Panels, kompakte Display-Terminals und Bluetooth-Produkte mit Kamera.
