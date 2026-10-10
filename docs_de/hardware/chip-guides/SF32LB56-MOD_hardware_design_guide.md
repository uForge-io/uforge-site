---
icon: lucide/book-check
description: "Hardware-Design-Guide für das SF32LB56-MOD Bluetooth-MCU-Modul: Stromversorgung, Schnittstellen und Hinweise zur PCB-Integration."
tags:
  - Hardware
  - Modul
hide:
    - navigation
---

# SF32LB56-MOD Hardware-Design-Guide { #sf32lb56-mod-hardware-design-guide }

## 1. Einführung { #1-introduction }

**SF32LB56-MOD** ist eine universell einsetzbare, stromsparende Bluetooth-MCU-Modulfamilie von SiFli auf Basis der Serie SF32LB56xV.

Dieser Leitfaden stützt sich auf die **technische Spezifikation DS5602-SF32LB56-MOD V0.3** und bündelt die modulspezifischen Angaben, die für Schaltplanentwurf, PCB-Layout, Validierung und Produktionsfreigabe benötigt werden. Dazu gehören Speichervarianten, die 89-Pin-Schnittstelle, drei Versorgungsschienen, Display-, Audio- und Speicherschnittstellen, Antennenplatzierung, Handhabungsanforderungen und die Schaltplan-Checkliste.

!!! note "Quelle und Empfehlungen"
    Die nachfolgenden technischen Werte folgen der **technischen Spezifikation DS5602-SF32LB56-MOD V0.3**, sofern nicht ausdrücklich als Integrationshinweis oder Designempfehlung gekennzeichnet.

## 2. Geräteübersicht { #2-device-overview }

### 2.1 Architektur { #21-architecture }

SF32LB56-MOD verwendet eine Dual-Core-MCU-Plattform der Serie SF32LB56xV. Die HCPU verarbeitet Anwendungen und Grafiken, während die LCPU stromsparende, ständig aktive Aufgaben übernimmt. Die HCPU ist ein Arm Cortex-M33 STAR-MC1-Kern mit bis zu 240 MHz; die LCPU ist derselbe Kerntyp mit bis zu 96 MHz. Beide unterstützen FPU und MPU.

Das Modul unterstützt Bluetooth 5.3 und bietet Display-Beschleunigung, Audio-Ein- und -Ausgabe, Schnittstellen für externen Speicher, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC sowie Debug- und Download-Zugang.

### 2.2 Varianten { #22-variants }

<div align="center"><em>Tabelle 2.2-1: Varianten des Moduls SF32LB56-MOD</em></div>

<div align="center" markdown>

| Modulcode | Haupt-Flash | PSRAM | Backup-Flash | Betriebstemperatur | Abmessungen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

### 2.3 Wichtige Hardware-Merkmale { #23-major-hardware-features }

<div align="center"><em>Tabelle 2.3-1: Wichtige Hardware-Merkmale</em></div>

<div align="center" markdown>

| Bereich | Fähigkeit |
| :--- | :--- |
| CPU | HCPU bis zu 240 MHz, LCPU bis zu 96 MHz, beide Arm Cortex-M33 STAR-MC1 |
| Funk | Dual-Mode Bluetooth 5.3 mit BLE-Audio-Unterstützung |
| Grafik | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Audio | 24-Bit-DAC, 24-Bit-Sigma-Delta-ADC, 2 PDM-Schnittstellen (PDM1/PDM2), jeweils für zwei Mikrofone über linken und rechten Kanal (insgesamt bis zu vier Mikrofone), 1x I2S |
| KI/DSP | Matrix-Beschleuniger mit bis zu 1,92 GOPS, FFT, FIR, CORDIC |
| Speicher | Modul-Flash-/PSRAM-Optionen, MPI3, SD/SDIO/eMMC-Unterstützung |
| Sicherheit | AES, HASH, CRC, TRNG, Secure Boot, 1024-Bit-eFuse, PSA Certified Level 1 |
| Antenne | PCB-Onboard-Antenne oder externe Antenne über IPEX-kompatiblen Steckverbinder |

</div>

### 2.4 Typische Anwendungen { #24-typical-applications }

Typische Anwendungen umfassen High-End-Smartwatches, Smart Bands, tragbare medizinische Geräte, Fitnessgeräte, E-Bike-Bedienfelder, Autoschlüssel, am Körper tragbare Fernbedienungen für Fahrzeuge, Smart-Home-Geräte, Smart Locks, grafische HMI-Geräte, industrielle Sensor-Hubs, industrielle Überwachungsterminals, Low-Power-Sensor-Hubs und Bluetooth-Mesh-Geräte.

## 3. Design auf einen Blick { #3-design-at-a-glance }

### 3.1 Technische Zusammenfassung auf einer Seite { #31-one-page-engineering-summary }

<div align="center"><em>Tabelle 3.1-1: Technische Zusammenfassung</em></div>

<div align="center" markdown>

| Thema | Design-Hinweis |
| :--- | :--- |
| Spannungsschienen | VDD_3V3, VDD_1V8 und VDDIO bereitstellen. Alle drei Schienen müssen gleichzeitig hochfahren. |
| Lokale Entkopplung | 4,7-µF-Kondensatoren nahe an den Modulpins von VDD_3V3, VDD_1V8 und VDDIO platzieren. |
| I/O-Pegel | VDDIO unterstützt 1,7–3,6 V, aber PA00–PA11 sind fest auf 3,3 V eingestellt. Jedes angeschlossene Peripheriegerät prüfen. |
| Debug/Download | UART4_TXD/UART4_RXD sind die Standard-UART-Pins für Logausgabe, Download und Debug; SWDIO/SWCLK unterstützen den SWD-Download. |
| Boot-Modus | BOOT_MODE High wählt den Download-Modus; BOOT_MODE Low wählt den Benutzermodus. |
| Konflikt mit internem Flash | PA06–PA11 sind standardmäßig mit dem internen Modul-Flash verbunden und extern nicht verfügbar. |
| SDIO-/MPI3-Konflikt | SDIO und MPI3 teilen sich I/O-Ressourcen und können nicht gleichzeitig verwendet werden. |
| Weckquellen | PA50, PA51, PB32 und PB35 können während des MCU-Schlafs Interrupts empfangen. |
| PWRKEY | PB32 unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel; ein 10-kΩ-Pull-down ist erforderlich. |
| Antenne | Den PCB-Antennenbereich frei von Kupfer, Leiterbahnen, Bauteilen und Metall halten; mindestens 15 mm Abstand einhalten, falls die Antenne nicht über den Platinenrand hinausragen kann. |
| Fertigung | MSL 3; nach dem Öffnen des Vakuumbeutels innerhalb von 168 Stunden bei 25 ± 5 °C und 60 % rF verwenden, andernfalls vor der Wiederverwendung im Ofen trocknen. |

</div>

### 3.2 Empfohlene externe Bauteile { #32-recommended-external-components }

<div align="center"><em>Tabelle 3.2-1: Empfohlene externe Bauteile</em></div>

<div align="center" markdown>

| Schaltung | Bauteil | Platzierung/Hinweise |
| :--- | :--- | :--- |
| VDD_3V3 | 4,7-µF-Kondensator | Nahe am Modul-Versorgungspin platzieren. |
| VDD_1V8 | 4,7-µF-Kondensator | Nahe am Modul-Versorgungspin platzieren. |
| VDDIO | 4,7-µF-Kondensator | Nahe am Modul-Versorgungspin platzieren. |
| PB32/PWRKEY | 10-kΩ-Pull-down | Erforderlich für einen Reset nach 10 s langem Drücken bei High-Pegel. |
| LCD-RGB-Signale | 33–100-Ω-Serienwiderstände | In Reihe an den RGB-Signalleitungen hinzufügen. |
| PA16/PA17 Debug-UART | 100-Ω-Serienwiderstände | Erforderlich an der gemultiplexten Programm-Download-/Debug-UART-Schnittstelle. |
| Touch-Panel/Benutzeranschlüsse | ESD-Schutz | ESD-Bauteile an exponierten Schnittstellen wie TP reservieren. |

</div>

### 3.3 Stromversorgungsbaum { #33-power-tree }

VDD_3V3 versorgt MCU-PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2 und das interne Modul-Flash. SiFli empfiehlt für diese Schiene einen LDO. VDD_1V8 versorgt den Speicher, der sich im selben Gehäuse wie die MCU befindet. VDDIO versorgt die VDDIOA-/VDDIOB-I/O-Ports der MCU.

!!! info "Abbildung 3.3-1: SF32LB56-MOD Stromversorgungsdiagramm"
    Siehe Abbildung 7-1 in DS5602 V0.3.

### 3.4 Systemblockdiagramm { #34-system-block-diagram }

Das Modulblockdiagramm zeigt die MCU der Serie SF32LB56xV, Speicherressourcen, HF-Pfad, Antennenoption, Stromversorgungseingänge und externe Schnittstellengruppen.

!!! info "Abbildung 3.4-1: SF32LB56-MOD Funktionsblockdiagramm"
    Siehe Abbildung 2-1 in DS5602 V0.3.

## 4. Hardware-Design-Ablauf { #4-hardware-design-flow }

### 4.1 Design-Reihenfolge { #41-design-sequence }

1. Die Speichervariante basierend auf Firmware-Größe, Grafik-Assets, Bedarf an externem Speicher und Kostenziel auswählen.
2. Vor Abschluss der Mechanikplanung zwischen PCB-Antenne und Variante mit externer Antenne wählen.
3. Die Stromversorgungsarchitektur für VDD_3V3, VDD_1V8 und VDDIO festlegen und das gleichzeitige Hochfahren bestätigen.
4. Pins für Display, Speicher, USB, Audio, Sensoren, Weckfunktion, Debug und Produktionstest zuweisen.
5. Konflikte bei gemeinsam genutzten Ressourcen lösen, insbesondere SDIO gegenüber MPI3 sowie die intern genutzten PA06–PA11-Flash-Pins.
6. Entkopplung, ESD, PWRKEY-Pull-down, LCD-Serienwiderstände und Debug-UART-Serienwiderstände hinzufügen.
7. Das Modul mit dem erforderlichen Antennenabstand und Freihaltebereich platzieren.
8. Schaltplan und PCB vor der Freigabe anhand der Checkliste in Abschnitt 7 prüfen.

### 4.2 Prüfreihenfolge { #42-review-sequence }

Eine gestufte Prüfreihenfolge verwenden: Schaltplanprüfung, Pin-Mux-Prüfung, Hochfahrprüfung, HF-/Antennenprüfung, Layoutprüfung, Erstmuster-Inbetriebnahmeprüfung, HF-Validierung, Umwelt-/Zuverlässigkeitsprüfung und Produktionstestprüfung.

### 4.3 Meilensteine { #43-milestones }

<div align="center"><em>Tabelle 4.3-1: Empfohlene Hardware-Meilensteine</em></div>

<div align="center" markdown>

| Meilenstein | Erforderlicher Nachweis |
| :--- | :--- |
| Schaltplan-Freeze | Variante ausgewählt, Pin-Konflikte behoben, Spannungsschienen geprüft, Checkliste vollständig. |
| Layout-Freeze | Antennenfreihaltebereich geprüft, Versorgungsentkopplung platziert, High-Speed-Schnittstellen geprüft. |
| EVT-Inbetriebnahme | Schienen, Boot-Modus, UART/SWD, Flash, Display, USB, Audio und HF-Funktionstests bestanden. |
| DVT | HF-Reichweite, Strom, Thermik, Schlaf-/Weckverhalten, ESD-Strategie und Gehäuseeinfluss validiert. |
| Produktionsfreigabe | Programmierung, Testpads, Prüfregeln, MSL-/Reflow-Handhabung und Revisionsaufzeichnungen vollständig. |

</div>

## 5. Schaltplandesign { #5-schematic-design }

### 5.1 Stromversorgungssystem { #51-power-system }

#### 5.1.1 Stromversorgung { #511-power-supply }

<div align="center"><em>Tabelle 5.1-1: Spannungsschienen</em></div>

<div align="center" markdown>

| Schiene | Empfohlener Betriebsbereich | Zweck |
| :--- | :--- | :--- |
| VDD_3V3 | 2,97–3,6 V | MCU-PVDD, analoge 3,3-V-Domänen, analoge HF-Domäne, VDDIOA2, internes Flash. |
| VDD_1V8 | 1,7–1,95 V | Versorgung des Speichers, der sich im selben Gehäuse wie die MCU befindet. |
| VDDIO | 1,7–3,6 V | VDDIOA-/VDDIOB-I/O-Versorgung der MCU. |

</div>

VDD_3V3, VDD_1V8 und VDDIO müssen gleichzeitig hochfahren. An jedem Modul-Versorgungspin einen 4,7-µF-Kondensator nahe platzieren. Obwohl VDDIO von 1,7 V bis 3,6 V betrieben werden kann, weist das Datenblatt gesondert darauf hin, dass PA00–PA11 fest auf 3,3 V eingestellt sind und VDDIO nicht folgen.

#### 5.1.2 Betriebsmodi { #512-operating-modes }

BOOT_MODE wählt den Startmodus: High für den Download-Modus und Low für den Benutzermodus. Den Pegel am BOOT_MODE-Pin bei Reset und während der Produktionsprogrammierung eindeutig festlegen. PB32/PWRKEY unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel; ein 10-kΩ-Pull-down ist erforderlich.

### 5.2 Takt und HF { #52-timing-and-rf }

#### 5.2.1 Takt { #521-clock }

Die Modulplattform verwendet einen 48-MHz-Quarzoszillator und unterstützt Low-Power-RC-Oszillatoren bei 1 MHz/48 MHz, einen Ultra-Low-Power-10-kHz-RC-Oszillator sowie einen optionalen 32,768-kHz-Quarzoszillator. Das Layout und die Masseführung im Taktbereich konsistent mit dem Modul-Referenzdesign halten und Ultraschallprozesse vermeiden, die den internen Kristall mechanisch belasten können.

#### 5.2.2 HF { #522-rf }

<div align="center"><em>Tabelle 5.2-1: Bluetooth-HF-Zusammenfassung</em></div>

<div align="center" markdown>

| Punkt | Wert |
| :--- | :--- |
| Bluetooth-Frequenzbereich | 2402–2480 MHz |
| Maximale BLE-Sendeleistung | 19 dBm |
| BLE-HF-Leistungsregelbereich | -20 bis 19 dBm |
| BLE-1-Mbps-Empfindlichkeit | -100 dBm dirty off, -99,3 dBm dirty on |
| BLE-2-Mbps-Empfindlichkeit | -97 dBm dirty off, -96,5 dBm dirty on |
| Maximale BR-Sendeleistung | 19 dBm |
| Maximale EDR-Sendeleistung | 13 dBm |
| BR-Empfindlichkeit | -96,3 dBm dirty off, -94 dBm dirty on |
| EDR2-Empfindlichkeit | -95,5 dBm dirty off, -95 dBm dirty on |
| EDR3-Empfindlichkeit | -88,5 dBm dirty off, -87 dBm dirty on |

</div>

Das Modul unterstützt eine PCB-Onboard-Antenne oder eine externe Antenne über einen IPEX-kompatiblen Steckverbinder. Kommunikationsreichweite und HF-Leistung im endgültigen Gehäuse validieren, nicht nur auf offener Werkbank.

### 5.3 Benutzerschnittstellen { #53-user-interfaces }

#### 5.3.1 Display { #531-display }

Der LCD-Controller unterstützt DBI-Seriell-SPI-Modus, Dual-SPI, Quad-SPI, 8080-Parallelmodus, DPI/RGB und JDI. Die im Datenblatt empfohlene Pin-Zuweisungsabbildung ordnet die Gruppen LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper und Raspberry-Pi-Stil den Modulpins zu.

An den LCD-RGB-Signalleitungen 33–100-Ω-Serienwiderstände hinzufügen. RGB-, SPI-Display- und Touch-Panel-Routing kurz und konsistent halten und ESD-Schutz an exponierten Touch- oder Steckverbinderschnittstellen reservieren.

!!! info "Abbildung 5.3-1: Empfohlene Pin-Zuweisung des Entwicklungsboards"
    Siehe Abbildung 7-6 in DS5602 V0.3.

#### 5.3.2 Audio { #532-audio }

Das Modul stellt analoge Audio-DAC-Ausgänge, MIC_BIAS, MIC_ADC_IN, I2S und PDM-fähige Pins bereit. Der Audio-DAC ist ein 24-Bit-Ausgangspfad, der Abtastraten von 8 kHz bis 48 kHz mit 109 dB SNR und Dynamikumfang unterstützt. Der Audio-ADC ist ein 24-Bit-Sigma-Delta-Eingangspfad, der Abtastraten von 8 kHz bis 48 kHz mit 99 dB SNR und Dynamikumfang unterstützt.

Analoges Audio von störenden Schaltknoten, LCD-Takten und Antennenzuführungsstrukturen fernhalten. Die Filterung von MIC_BIAS und MIC_ADC_IN nahe an der angeschlossenen Mikrofonschaltung halten.

#### 5.3.3 Tasten { #533-buttons }

PB32 ist der PWRKEY-Eingang und unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel. Den erforderlichen 10-kΩ-Pull-down vorsehen und sicherstellen, dass der Tastenschaltkreis während Transport, Deep Sleep und Ein-/Ausschaltsequenzen keinen undefinierten Pegel annimmt.

#### 5.3.4 Motor- und PWM-Lasten { #534-motor-and-pwm-loads }

Im Datenblatt in der empfohlenen Pin-Zuweisungsabbildung mit GPTIM gekennzeichnete Pins unterstützen PWM-Ausgang. Externe Treiber für Motoren, Hintergrundbeleuchtung, Summer oder andere Lasten verwenden; induktive oder Hochstromlasten nicht direkt von Modul-GPIOs ansteuern.

### 5.4 Speicher und Konnektivität { #54-storage-and-connectivity }

#### 5.4.1 Speicher { #541-storage }

Die Modulfamilie stellt SKU-abhängiges Haupt-Flash, 4+8 MB OPI-PSRAM und 1 MB Backup-QSPI-NOR-Flash bereit. MPI3 kann extern SPI-NOR oder SPI-NAND anbinden, aber PA06–PA11 sind standardmäßig mit dem internen Modul-Flash verbunden und extern nicht verfügbar. SDIO und MPI3 teilen sich I/O-Ressourcen und können nicht gleichzeitig verwendet werden.

#### 5.4.2 Sensoren { #542-sensors }

GPADC unterstützt 12-Bit-Wandlung, eine Abtastrate von bis zu 4 MS/s, einen Eingangsbereich von 0–3,3 V single-ended, einen Differenzeingangsbereich von -2,1 V bis +2,1 V, Software-/Hardware-Trigger und DMA. Mit GPADC_CHx gekennzeichnete Pins unterstützen Analogeingänge; analoge Pfade kurz, gefiltert und fern von LCD- und HF-Schaltstörungen halten.

#### 5.4.3 UART/I2C { #543-uarti2c }

UART unterstützt Vollduplex-Betrieb bis zu 6 Mbps. I2C unterstützt die Standardmodi 100 kbps, Fast 400 kbps, Fast-Mode Plus 1 Mbps und High-Speed 3,4 Mbps. Viele GPIOs sind als `PAxx_I2C_UART` oder `PBxx_I2C_UART` gemultiplext; den endgültigen Mux-Plan vor dem Schaltplan-Freeze bestätigen.

UART4_TXD an Pin 6 und UART4_RXD an Pin 7 bilden die Standard-UART für Logausgabe und unterstützen Programm-Download sowie Debug. PA16 und PA17 können als DBG_UART gemultiplext werden; bei Verwendung für Download oder Debug sind 100-Ω-Serienwiderstände erforderlich.

#### 5.4.4 USB, SPI, SDIO und I2S { #544-usb-spi-sdio-and-i2s }

USB2.0 FS unterstützt Host-/Device-Modus mit integriertem PHY. SPI unterstützt SSP/SPI- und Microwire-Formate; HPSYS-SPI erreicht bis zu 48 MHz, LPSYS-SPI bis zu 24 MHz. SDMMC1 unterstützt SD 3.0, SDIO 3.0 und eMMC 4.5.1 mit SDR- und DDR-Modi; SDMMC2 unterstützt SD-/SDIO-/eMMC-Funktionen mit SDR-Modi bis zu 48 MHz. I2S unterstützt Master-/Slave-Betrieb, Vollduplex, Links-/Rechts-/Standardformate und eine PCM-Breite von bis zu 24 Bit.

### 5.5 Fertigung { #55-manufacturing }

#### 5.5.1 Debug { #551-debug }

SWDIO an Pin 79 und SWCLK an Pin 80 sind SWD-Debug-/Download-Pins. SWD auf frühen Prototypen und Produktions-Fixtures zugänglich halten. Zudem den Standard-UART4-Download-/Debug-Pfad zugänglich halten, sofern das Produkt keinen anderen zugelassenen Programmierpfad besitzt.

#### 5.5.2 Produktion { #552-production }

Produktionszugang für Stromversorgung, Masse, Boot-Modus, Reset/PWRKEY, SWD, UART-Download und jede Kalibrierungs- oder HF-Testschnittstelle auf Board-Ebene reservieren. Die finale Testsoftware sollte Boot, Flash, Display, Touch, Audio, USB, Sensoren, HF-Kommunikation, Schlaf-/Weckverhalten und Stromverbrauch abdecken.

## 6. PCB-Layout { #6-pcb-layout }

### 6.1 Mechanik und Footprint { #61-mechanical-and-footprint }

Das Modul misst 18,0 × 32,9 × 3,1 mm. Den empfohlenen PCB-Footprint aus dem Datenblatt verwenden und Land Pattern, Lötstopplack-Erweiterung, Pastenöffnung, Freihaltebereich und Bestückungs-Courtyard mit dem PCB-Bestückungsdienstleister abstimmen.

!!! info "Abbildung 6.1-1: SF32LB56-MOD Modulabmessungen"
    Siehe Abbildung 8-1 in DS5602 V0.3.

!!! info "Abbildung 6.1-2: Empfohlener PCB-Footprint"
    Siehe Abbildung 8-2 in DS5602 V0.3. Abmessungen in Millimetern.

### 6.2 Antennenplatzierung { #62-antenna-placement }

Verwendet das Produkt die PCB-Onboard-Antenne, den Antennenbereich frei von Bauteilen oder Metall reservieren. Das Modul so platzieren, dass der Antennenbereich nach Möglichkeit über den Rand der Trägerplatine hinausragt, mit dem Speisepunkt nahe am Platinenrand.

Kann die Antenne nicht über den Platinenrand hinausragen, einen Freihaltebereich von mindestens 15 mm vorsehen. In diesem Freihaltebereich kein Kupfer, keine Leiterbahnen oder Bauteile platzieren und das Trägerplatinenmaterial unter der PCB-Antenne so weit wie praktikabel aussparen.

!!! info "Abbildung 6.2-1: Empfohlene Modulplatzierung"
    Siehe Abbildung 8-4 in DS5602 V0.3.

!!! info "Abbildung 6.2-2: PCB-Antennen-Freihaltebereich"
    Siehe Abbildung 8-5 in DS5602 V0.3.

### 6.3 Externer Antennensteckverbinder { #63-external-antenna-connector }

Für Designs mit externer Antenne beschreibt das Datenblatt einen Steckverbinder der ersten Generation für externe Antennen, kompatibel mit Hirose-U.FL-Serie, I-PEX-MHF-I- und Amphenol-AMC-Steckverbindern.

!!! info "Abbildung 6.3-1: Abmessungen des externen Antennensteckverbinders"
    Siehe Abbildung 8-3 in DS5602 V0.3.

### 6.4 Layout-Checkliste { #64-layout-checklist }

<div align="center"><em>Tabelle 6.4-1: PCB-Layout-Checkliste</em></div>

<div align="center" markdown>

| Bereich | Prüfung |
| :--- | :--- |
| Stromversorgung | 4,7-µF-Kondensatoren befinden sich nahe an den Pins von VDD_3V3, VDD_1V8 und VDDIO. |
| Masse | Modul-Massepins sind mit einem niederohmigen Massesystem mit Stitching nahe den High-Speed- und HF-Pfaden verbunden. |
| Antenne | Der Antennenfreihaltebereich weist kein Eindringen von Kupfer, Leiterbahnen, Bauteilen, Schrauben, Abschirmungen, Batteriemetall oder Gehäusemetall auf. |
| Display | LCD-RGB-/SPI-Leitungen sind kurz, impedanzbewusst und weisen die erforderlichen Serienwiderstände auf. |
| USB | USB-DP/DM sind als angepasstes Differenzpaar geroutet, mit ESD nahe am Steckverbinder. |
| Analoges Audio | MIC_BIAS, MIC_ADC_IN und DAC-Ausgänge meiden Schaltregler, LCD-Takte und HF-Speisebereiche. |
| Debug | SWD- und UART-Download-/Debug-Zugang ist bei Prototypen und Produktions-Fixtures erreichbar. |

</div>

## 7. Hardware-Validierung { #7-hardware-validation }

### 7.1 Elektrische Eigenschaften { #71-electrical-characteristics }

<div align="center"><em>Tabelle 7.1-1: Absolute Grenzwerte</em></div>

<div align="center" markdown>

| Symbol | Beschreibung | Min | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3,3-V-Stromversorgungseingang | -0,3 | 3,6 | V |
| VDD_1V8 | 1,8-V-Stromversorgungseingang | -0,3 | 1,95 | V |
| VDDIO | I/O-Stromversorgungseingang | -0,3 | 3,6 | V |
| Tstore | Lagertemperatur | -40 | 125 | °C |

</div>

<div align="center"><em>Tabelle 7.1-2: Empfohlene Betriebsbedingungen</em></div>

<div align="center" markdown>

| Symbol | Beschreibung | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3,3-V-Stromversorgungseingang | 2,97 | 3,3 | 3,6 | V |
| VDD_1V8 | 1,8-V-Stromversorgungseingang | 1,7 | 1,8 | 1,95 | V |
| VDDIO | I/O-Stromversorgungseingang | 1,7 | - | 3,6 | V |
| TA | Betriebstemperatur | -40 | - | 85 | °C |

</div>

<div align="center"><em>Tabelle 7.1-3: DC-Kenndaten bei 3,3 V, 25 °C</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin-Kapazität | 2,5 | 3 | 3,5 | pF |
| VIH | Eingangs-High-Spannung | 0,7×VDD | - | VDD | V |
| VIL | Eingangs-Low-Spannung | VSS | - | 0,3×VDD | V |
| IIH | Eingangs-High-Strom | - | 10 | 40 | nA |
| IIL | Eingangs-Low-Strom | - | 10 | 40 | nA |
| VOH | Ausgangs-High-Spannung, hochohmige Last | 0,8×VDD | - | VDD | V |
| VOL | Ausgangs-Low-Spannung, hochohmige Last | VSS | - | 0,2×VDD | V |
| IOH | Ausgangstreiberstrom High | 24 | 30 | 38 | mA |
| IOL | Ausgangstreiberstrom Low | 24 | 30 | 38 | mA |
| RPU | Interner Pull-up | 7 | 10 | 20 | kΩ |
| RPD | Interner Pull-down | 7 | 10 | 20 | kΩ |
| VIH_nRST | Reset-Freigabespannung | 0,7×VDD | - | VDD | V |
| VIL_nRST | Reset-Auslösespannung | VSS | - | 0,3×VDD | V |

</div>

VDD ist die I/O-Versorgung. VOH und VOL werden mit einer hochohmigen Last gemessen.

### 7.2 Stromverbrauch { #72-power-consumption }

<div align="center"><em>Tabelle 7.2-1: Bluetooth- und BLE-Strom bei 3,3 V, TX-Leistung 0 dBm</em></div>

<div align="center" markdown>

| Modus | Bedingung | Typischer Strom |
| :--- | :--- | :-: |
| BT Sniff | 50-ms-Intervall | 196,0 µA |
| BT Sniff | 1-s-Intervall | 13,8 µA |
| BLE ADV | 50-ms-Intervall | 228,7 µA |
| BLE ADV | 1-s-Intervall | 15,7 µA |
| BLE-Verbindung | 50-ms-Intervall | 172,8 µA |
| BLE-Verbindung | 1-s-Intervall | 11,5 µA |
| Scan | Inquiry Scan oder Page Scan | 36,8 µA |
| Beide Scans | Inquiry Scan und Page Scan | 64,0 µA |
| Standby | - | 4,6 µA |

</div>

<div align="center"><em>Tabelle 7.2-2: Prozessorstrom</em></div>

<div align="center" markdown>

| Workload | Domäne | Frequenz | Strom | Strom pro MHz |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9,38 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7,90 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 48 MHz | 0,92 mA | 30,92 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0,55 mA | 15,13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7,54 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6,30 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0,70 mA | 25,75 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0,44 mA | 10,63 µA/MHz |

</div>

### 7.3 Schaltplan-Checkliste { #73-schematic-checklist }

<div align="center"><em>Tabelle 7.3-1: Schaltplan-Design-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt |
| :-: | :--- |
| 1 | VDD_3V3-Eingangsbereich ist 2,97–3,6 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 2 | VDD_1V8-Eingangsbereich ist 1,7–1,95 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 3 | VDDIO-Eingangsbereich ist 1,7–3,6 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 4 | Der Pegel der Modul-I/O-Schnittstelle beträgt, wo spezifiziert, 3,3 V; die Pegel der angeschlossenen Peripherie müssen kompatibel sein. |
| 5 | Wenn das Modul mit internem Flash ausgestattet ist, können PA06, PA07, PA08, PA09, PA10 und PA11 extern nicht verwendet werden. |
| 6 | SDIO und MPI3 teilen sich I/O-Ressourcen und können nicht gleichzeitig verwendet werden. |
| 7 | PA50, PA51, PB32 und PB35 können Interrupts empfangen, während die MCU schläft. |
| 8 | PB32 unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel; ein 10-kΩ-Pull-down ist erforderlich. |
| 9 | Mit GPADC_CHx gekennzeichnete Pins unterstützen 0–3,3-V-Analogeingang. |
| 10 | Mit GPTIM gekennzeichnete Pins unterstützen PWM-Ausgang. |
| 11 | Schnittstellen wie TP benötigen ESD-Schutzbauteile. |
| 12 | LCD-RGB-Signale benötigen 33–100-Ω-Serienwiderstände. |
| 13 | PA16 und PA17, gemultiplext als DBG_UART, sind Programm-Download-/Debug-Pins und benötigen 100-Ω-Serienwiderstände. |

</div>

### 7.4 Lagerung, Handhabung und Bestückung { #74-storage-handling-and-assembly }

<div align="center"><em>Tabelle 7.4-1: Anforderungen an Lagerung, Handhabung und Bestückung</em></div>

<div align="center" markdown>

| Punkt | Anforderung |
| :--- | :--- |
| Lagerung im versiegelten MBB | Nicht kondensierende Atmosphäre; Temperatur unter 40 °C und relative Luftfeuchtigkeit unter 90 %. |
| Feuchtigkeitsempfindlichkeit | MSL 3. |
| Nach Öffnen des Vakuumbeutels | Bei 25 ± 5 °C und 60 % rF innerhalb von 168 Stunden verwenden; andernfalls vor der Wiederverwendung im Ofen trocknen. |
| ESD HBM | ±2000 V. |
| ESD CDM | ±500 V. |
| Reflow | SiFli empfiehlt für das Modul nur einen Reflow-Durchlauf. |
| Ultraschallprozess | Ultraschallschweißen oder Ultraschallreinigung vermeiden; Vibration kann interne Kristalle beschädigen oder beeinträchtigen. |

</div>

!!! info "Abbildung 7.4-1: Reflow-Temperaturprofil"
    Siehe Abbildung 9-1 in DS5602 V0.3.

## 8. Verwandte Dokumente { #8-related-documents }

<div align="center"><em>Tabelle 8-1: Verwandte Dokumente und Produkte</em></div>

<div align="center" markdown>

| Typ | Element |
| :--- | :--- |
| Modul-Datenblatt | [Technische Spezifikation DS5602-SF32LB56-MOD V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| Chip-Spezifikation | Technische Spezifikation des Chips SF32LB56x |
| Entwicklungsboard-Guide | SF32LB56-DevKit-LCD Benutzerhandbuch |
| Chip-Familie | Serie SF32LB56xV |
| Modul | SF32LB56-MOD |
| Entwicklungsboard | SF32LB56-DevKit-LCD |

</div>

## 9. Anhänge { #appendices }

### 9.1. Anhang A. Referenz zur Pin-Planung { #appendix-a-pin-planning-reference }

DS5602 V0.3 enthält die vollständige 89-Pin-Definitionstabelle und eine Pinbelegung in Draufsicht. Die folgende Tabelle hebt Pins und Signalgruppen hervor, die besonders häufig das Schaltplanrisiko, den Start-/Debug-Zugang oder die Planung gemeinsam genutzter Ressourcen beeinflussen.

<div align="center"><em>Tabelle 9.1-1: Kritische Pin- und Signalgruppen</em></div>

<div align="center" markdown>

| Pin/Gruppe | Funktion/Einschränkung |
| :--- | :--- |
| Pin 6 PB17 | UART4_TXD, Standard-TX der UART für Logausgabe, Download und Debug. |
| Pin 7 PB16 | UART4_RXD, Standard-RX der UART für Logausgabe, Download und Debug. |
| Pin 25 BOOT_MODE | High: Download-Modus; Low: Benutzermodus. |
| Pin 26 VDD_3V3 | 3,3-V-Schiene, Betriebsbereich 2,97–3,6 V. |
| Pin 27 VDD_1V8 | 1,8-V-Schiene, Betriebsbereich 1,7–1,95 V. |
| Pin 29 VDDIO | I/O-Schiene, Betriebsbereich 1,7–3,6 V. |
| Pins 43/44 | AU_DACP/AU_DACN differenzielle DAC-Ausgänge. |
| Pin 46 MIC_BIAS | Mikrofon-Bias-Ausgang. |
| Pin 47 MIC_ADC_IN | Analoger Mikrofon-ADC-Eingang. |
| Pins 67–72 PA06–PA11 | Standardmäßig mit internem Flash verbunden; extern nicht verfügbar. |
| Pin 79 PB13 | SWDIO Debug/Download. |
| Pin 80 PB15 | SWCLK Debug/Download. |
| PA50, PA51, PB32, PB35 | Pins zum interruptgesteuerten Aufwecken aus dem Schlafmodus. |
| PA00–PA11 | Schnittstellenpegel fest auf 3,3 V, unabhängig von VDDIO. |

</div>

## 10. Versionshistorie { #appendix-b-revision-history }

### 10.1. Versionshistorie des Leitfadens { #guide-revision-history }

<div align="center"><em>Tabelle 10.1-1: Versionshistorie des Leitfadens</em></div>

<div align="center" markdown>

| Version | Datum | Anmerkungen |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | Erste Ausgabe des Hardware-Design-Guides für das Modul SF32LB56-MOD, basierend auf DS5602-SF32LB56-MOD V0.3. |

</div>

### 10.2. Versionshistorie des Quelldatenblatts { #source-datasheet-revision-history }

<div align="center"><em>Tabelle 10.2-1: Versionshistorie des Quelldatenblatts</em></div>

<div align="center" markdown>

| Datum | Version | Release-Hinweise |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | Kapitel 4 Beschreibungen von Audio-ADC und -DAC aktualisiert. |
| 2025-02 | 0.2 | Modul-Pin- und zugehörige Informationen aktualisiert. |
| 2025-01 | 0.1 | Entwurfsversion. |

</div>
