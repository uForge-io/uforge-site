---
title: "SF32LB56-MOD - Hardware-Design-Leitfaden"
icon: lucide/book-check
description: "Hardware-Design-Leitfaden für das SF32LB56-MOD Bluetooth-MCU-Modul: Stromversorgung, Schnittstellen und Hinweise zur PCB-Integration."
tags:
  - Hardware
  - Modul
hide:
    - navigation
---

<div id="sf32lb56-mod"></div>

# SF32LB56-MOD Hardware-Design-Leitfaden { #sf32lb56-mod-hardware-design-guide }

<div id="1"></div>

## 1. Einführung { #1-introduction }

**SF32LB56-MOD** ist eine vielseitig einsetzbare Bluetooth-MCU-Modulfamilie von SiFli mit niedrigem Stromverbrauch auf Basis der Serie SF32LB56xV.

Dieser Leitfaden bündelt die modulspezifischen Angaben, die für Schaltplanentwurf, PCB-Layout, Validierung und Produktionsfreigabe benötigt werden. Er folgt der **technischen Spezifikation DS5602-SF32LB56-MOD V0.3** und behandelt Speichervarianten, die 89-Pin-Schnittstelle, drei Versorgungsschienen, Display-, Audio- und Speicherschnittstellen, Antennenplatzierung, Handhabungsanforderungen und die Schaltplan-Checkliste.

!!! note "Quelle und Empfehlungen"
    Technische Werte und Pinbelegungen folgen DS5602 V0.3. Ungeklärte elektrische oder fertigungstechnische Mehrdeutigkeiten der Spezifikation bleiben in den jeweiligen Abschnitten erhalten; dort ist auch angegeben, was vor der Designfreigabe bestätigt werden muss. Integrationshinweise und Empfehlungen sind von Quellenanforderungen unterschieden.

!!! note "Geltungsbereich der Kennzeichnung"
    Die bereitgestellten Etiketten für SF32LB56-MOD-N16R12N1 und SF32LB56-MOD-A128R12N1 zeigen FCC-, IC-, CMIIT-ID- und HVIN-Kennungen sowie CE. Siehe [Kennzeichnungsübersicht](../../sf32-products/modules/SF32LB56-MOD.md#regulatory-markings). Prüfen Sie Unterlagen und Antennen-/Integrationsbedingungen der genauen Revision; andere Varianten und das Endprodukt sind nicht automatisch abgedeckt.

<div id="2"></div>

## 2. Geräteübersicht { #2-device-overview }

<div id="21"></div>

### 2.1 Architektur { #21-architecture }

SF32LB56-MOD verwendet eine Dual-Core-MCU-Plattform der Serie SF32LB56xV. Die HCPU verarbeitet Anwendungen und Grafiken, während die LCPU stromsparende, ständig aktive Aufgaben übernimmt. Die HCPU ist ein Arm Cortex-M33 STAR-MC1-Kern mit bis zu 240 MHz; die LCPU ist derselbe Kerntyp mit bis zu 96 MHz. Beide unterstützen FPU und MPU.

Das Modul unterstützt Bluetooth 5.3 und bietet Display-Beschleunigung, Audio-Ein- und -Ausgabe, Schnittstellen für externen Speicher, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC sowie Debug- und Download-Zugang.

!!! note "Individuelle Anpassungen"
    Für andere Modulkonfigurationen oder individuelle Anpassungen [wenden Sie sich an μForge.io](../../about/contact.md).

<div id="22"></div>

### 2.2 Varianten { #22-variants }

<div align="center"><em>Tabelle 2.2-1: Varianten des Moduls SF32LB56-MOD</em></div>

<div align="center" markdown>

| Modulcode | Haupt-Flash | PSRAM | Backup-Flash | Betriebstemperatur | Abmessungen |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85 °C | 18,0 × 32,9 × 3,1 mm |

</div>

<div id="23"></div>

### 2.3 Wichtige Hardware-Merkmale { #23-major-hardware-features }

<div align="center"><em>Tabelle 2.3-1: Wichtige Hardware-Merkmale</em></div>

<div align="center" markdown>

| Bereich | Fähigkeit |
| :--- | :--- |
| CPU | HCPU bis zu 240 MHz, LCPU bis zu 96 MHz, beide Arm Cortex-M33 STAR-MC1 |
| Funk | Dual-Mode Bluetooth 5.3 mit BLE-Audio-Unterstützung |
| Grafik | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Audio | 24-Bit-DAC, 24-Bit-Sigma-Delta-ADC, zwei PDM-Schnittstellen (PDM1/PDM2); DS5602 V0.3 nennt zwei Digitarmikrofoneingänge; eine I2S-Schnittstelle |
| KI/DSP | Matrix-Beschleuniger mit bis zu 1,92 GOPS, FFT, FIR, CORDIC |
| Speicher | Modul-Flash-/PSRAM-Optionen, MPI3, SD/SDIO/eMMC-Unterstützung |
| Sicherheit | AES, HASH, CRC, TRNG, Secure Boot, 1024-Bit-eFuse, PSA Certified Level 1 |
| Antenne | Integrierte PCB-Antenne oder externe Antenne über IPEX-kompatiblen Steckverbinder |

</div>

<div id="24"></div>

### 2.4 Typische Anwendungen { #24-typical-applications }

Typische Anwendungen umfassen High-End-Smartwatches, Smart Bands, tragbare medizinische Geräte, Fitnessgeräte, E-Bike-Bedienfelder, Autoschlüssel, am Körper tragbare Fernbedienungen für Fahrzeuge, smarte Haushaltsgeräte, Smart Locks, grafische HMI-Geräte, industrielle Sensor-Hubs, industrielle Überwachungsterminals, Low-Power-Sensor-Hubs und Bluetooth-Mesh-Geräte.

<div id="3"></div>

## 3. Design auf einen Blick { #3-design-at-a-glance }

<div id="31"></div>

### 3.1 Technische Zusammenfassung auf einer Seite { #31-one-page-engineering-summary }

<div align="center"><em>Tabelle 3.1-1: Technische Zusammenfassung</em></div>

<div align="center" markdown>

| Thema | Design-Hinweis |
| :--- | :--- |
| Spannungsschienen | Stellen Sie VDD_3V3, VDD_1V8 und VDDIO bereit. Alle drei Schienen müssen gleichzeitig hochfahren. |
| Lokale Entkopplung | Platzieren Sie 4,7-µF-Kondensatoren nahe an den Modulpins von VDD_3V3, VDD_1V8 und VDDIO. |
| I/O-Pegel | VDDIO unterstützt 1,7–3,6 V, PA00–PA11 sind jedoch fest auf 3,3 V eingestellt. Prüfen Sie jedes angeschlossene Peripheriegerät. |
| Debug/Download | UART4_TXD/UART4_RXD sind die Standard-UART-Pins für Logausgabe, Download und Debug; SWDIO/SWCLK unterstützen den SWD-Download. |
| Boot-Modus | Ein High-Pegel an BOOT_MODE wählt den Download-Modus, ein Low-Pegel den Benutzermodus. |
| Konflikt mit internem Flash | PA06–PA11 sind standardmäßig mit dem internen Flash des Moduls verbunden und extern nicht verfügbar. |
| SDIO-/MPI3-Konflikt | SDIO und MPI3 teilen sich I/O-Ressourcen und können nicht gleichzeitig verwendet werden. |
| Weckquellen | PA50, PA51, PB32 und PB35 können Interrupts empfangen, während sich die MCU im Schlafmodus befindet. |
| PWRKEY | PB32 unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel; ein 10-kΩ-Pull-down ist erforderlich. |
| Antenne | Halten Sie den Bereich der integrierten PCB-Antenne frei von Kupfer, Leiterbahnen, Bauteilen und Metall. Falls die Antenne nicht über den Platinenrand hinausragen kann, halten Sie mindestens 15 mm Abstand. |
| Fertigung | MSL 3; verwenden Sie das Modul nach dem Öffnen des Vakuumbeutels innerhalb von 168 Stunden bei 25 ± 5 °C und 60 % rF. Trocknen Sie es andernfalls vor der Wiederverwendung im Ofen. |

</div>

<div id="32"></div>

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

<div id="33"></div>

### 3.3 Stromversorgungsbaum { #33-power-tree }

VDD_3V3 versorgt MCU-PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2 und den internen Flash des Moduls. SiFli empfiehlt für diese Schiene einen LDO. VDD_1V8 versorgt den Speicher, der sich im selben Gehäuse wie die MCU befindet. VDDIO versorgt die VDDIOA-/VDDIOB-I/O-Ports der MCU.

!!! info "Abbildung 3.3-1: SF32LB56-MOD Stromversorgungsdiagramm"
    Siehe Abbildung 7-1 in DS5602 V0.3.

<div id="34"></div>

### 3.4 Systemblockdiagramm { #34-system-block-diagram }

Das Modulblockdiagramm zeigt die MCU der Serie SF32LB56xV, Speicherressourcen, RF-Pfad, Antennenoption, Stromversorgungseingänge und externe Schnittstellengruppen.

!!! info "Abbildung 3.4-1: SF32LB56-MOD Funktionsblockdiagramm"
    Siehe Abbildung 2-1 in DS5602 V0.3.

<div id="4"></div>

## 4. Hardware-Design-Ablauf { #4-hardware-design-flow }

<div id="41"></div>

### 4.1 Design-Reihenfolge { #41-design-sequence }

1. Wählen Sie die Speichervariante anhand der Firmware-Größe, der Grafik-Assets, des Bedarfs an externem Speicher und des Kostenziels aus.
2. Entscheiden Sie sich vor Abschluss der Mechanikplanung für die integrierte PCB-Antenne oder die Variante mit externer Antenne.
3. Legen Sie die Stromversorgungsarchitektur für VDD_3V3, VDD_1V8 und VDDIO fest und bestätigen Sie, dass alle drei Schienen gleichzeitig hochfahren.
4. Weisen Sie Pins für Display, Speicher, USB, Audio, Sensoren, Weckfunktion, Debugging und Produktionstests zu.
5. Lösen Sie Konflikte bei gemeinsam genutzten Ressourcen, insbesondere zwischen SDIO und MPI3 sowie bei den intern genutzten Flash-Pins PA06–PA11.
6. Ergänzen Sie Entkopplung, ESD-Schutz, den PWRKEY-Pull-down sowie die Serienwiderstände für LCD und Debug-UART.
7. Platzieren Sie das Modul mit dem erforderlichen Antennenabstand und Freihaltebereich.
8. Prüfen Sie Schaltplan und PCB vor der Freigabe anhand der Checkliste in Abschnitt 7.

<div id="42"></div>

### 4.2 Prüfreihenfolge { #42-review-sequence }

Verwenden Sie eine gestufte Prüfreihenfolge: Schaltplanprüfung, Pin-Mux-Prüfung, Prüfung des Hochfahrens, RF-/Antennenprüfung, Layoutprüfung, Inbetriebnahme des Erstmusters, RF-Validierung, Umwelt- und Zuverlässigkeitsprüfung sowie Produktionstest.

<div id="43"></div>

### 4.3 Meilensteine { #43-milestones }

<div align="center"><em>Tabelle 4.3-1: Empfohlene Hardware-Meilensteine</em></div>

<div align="center" markdown>

| Meilenstein | Erforderlicher Nachweis |
| :--- | :--- |
| Schaltplan-Freeze | Variante ausgewählt, Pin-Konflikte behoben, Spannungsschienen geprüft, Checkliste vollständig. |
| Layout-Freeze | Antennenfreihaltebereich geprüft, Versorgungsentkopplung platziert, High-Speed-Schnittstellen geprüft. |
| EVT-Inbetriebnahme | Schienen, Boot-Modus, UART/SWD, Flash, Display, USB, Audio und RF-Funktionstests bestanden. |
| DVT | RF-Reichweite, Strom, Thermik, Schlaf-/Weckverhalten, ESD-Strategie und Gehäuseeinfluss validiert. |
| Produktionsfreigabe | Programmierung, Testpads, Prüfregeln, MSL-/Reflow-Handhabung und Revisionsaufzeichnungen vollständig. |

</div>

<div id="5"></div>

## 5. Schaltplandesign { #5-schematic-design }

<div id="51"></div>

### 5.1 Stromversorgungssystem { #51-power-system }

<div id="511"></div>

#### 5.1.1 Stromversorgung { #511-power-supply }

<div align="center"><em>Tabelle 5.1-1: Spannungsschienen</em></div>

<div align="center" markdown>

| Schiene | Empfohlener Betriebsbereich | Zweck |
| :--- | :--- | :--- |
| VDD_3V3 | 2,97–3,6 V | MCU-PVDD, analoge 3,3-V-Domänen, analoge RF-Domäne, VDDIOA2, interner Flash. |
| VDD_1V8 | 1,7–1,95 V | Versorgung des Speichers, der sich im selben Gehäuse wie die MCU befindet. |
| VDDIO | 1,7–3,6 V | VDDIOA-/VDDIOB-I/O-Versorgung der MCU. |

</div>

VDD_3V3, VDD_1V8 und VDDIO müssen gleichzeitig hochfahren. Platzieren Sie an jedem Modul-Versorgungspin einen 4,7-µF-Kondensator in unmittelbarer Nähe. Obwohl VDDIO mit 1,7 V bis 3,6 V betrieben werden kann, weist das Datenblatt gesondert darauf hin, dass PA00–PA11 fest auf 3,3 V eingestellt sind und VDDIO nicht folgen.

<div id="512"></div>

#### 5.1.2 Betriebsmodi { #512-operating-modes }

BOOT_MODE wählt den Startmodus: High für den Download-Modus und Low für den Benutzermodus. Legen Sie den Pegel am BOOT_MODE-Pin bei Reset und während der Produktionsprogrammierung eindeutig fest. PB32/PWRKEY unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel; ein 10-kΩ-Pull-down ist erforderlich.

<div id="52-rf"></div>

### 5.2 Takt und RF { #52-timing-and-rf }

<div id="521"></div>

#### 5.2.1 Takt { #521-clock }

Die Modulplattform verwendet einen 48-MHz-Quarzoszillator und unterstützt stromsparende RC-Oszillatoren mit 1 MHz/48 MHz, einen besonders stromsparenden 10-kHz-RC-Oszillator sowie einen optionalen 32,768-kHz-Quarzoszillator. Halten Sie Layout und Masseführung im Taktbereich konsistent mit dem Modul-Referenzdesign. Vermeiden Sie Ultraschallprozesse, die den internen Quarz mechanisch belasten können.

#### 5.2.2 RF { #522-rf }

<div align="center"><em>Tabelle 5.2-1: Bluetooth-RF-Zusammenfassung</em></div>

<div align="center" markdown>

| Merkmal | Wert |
| :--- | :--- |
| Bluetooth-Frequenzbereich | 2402–2480 MHz |
| Maximale BLE-Sendeleistung | 19 dBm |
| BLE-RF-Leistungsregelbereich | -20 bis 19 dBm |
| BLE-1-Mbps-Empfindlichkeit | -100 dBm dirty off, -99,3 dBm dirty on |
| BLE-2-Mbps-Empfindlichkeit | -97 dBm dirty off, -96,5 dBm dirty on |
| Maximale BR-Sendeleistung | 19 dBm |
| Maximale EDR-Sendeleistung | 13 dBm |
| BR-Empfindlichkeit | -96,3 dBm dirty off, -94 dBm dirty on |
| EDR2-Empfindlichkeit | -95,5 dBm dirty off, -95 dBm dirty on |
| EDR3-Empfindlichkeit | -88,5 dBm dirty off, -87 dBm dirty on |

</div>

Das Modul unterstützt eine integrierte PCB-Antenne oder eine externe Antenne über einen IPEX-kompatiblen Steckverbinder. Validieren Sie Kommunikationsreichweite und RF-Leistung im endgültigen Gehäuse, nicht nur auf einer offenen Werkbank.

<div id="53"></div>

### 5.3 Benutzerschnittstellen { #53-user-interfaces }

<div id="531"></div>

#### 5.3.1 Display { #531-display }

Der LCD-Controller unterstützt DBI-Seriell-SPI-Modus, Dual-SPI, Quad-SPI, 8080-Parallelmodus, DPI/RGB und JDI. Die im Datenblatt empfohlene Pin-Zuweisungsabbildung ordnet die Gruppen LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper und Raspberry-Pi-Stil den Modulpins zu.

Fügen Sie den LCD-RGB-Signalleitungen Serienwiderstände von 33–100 Ω hinzu. Halten Sie RGB-, SPI-Display- und Touch-Panel-Leiterbahnen kurz und konsistent. Sehen Sie ESD-Schutz an exponierten Touch- oder Steckverbinderschnittstellen vor.

!!! info "Abbildung 5.3-1: Empfohlene Pin-Zuweisung des Entwicklungsboards"
    Siehe Abbildung 7-6 in DS5602 V0.3.

<div id="532"></div>

#### 5.3.2 Audio { #532-audio }

Das Modul stellt analoge Audio-DAC-Ausgänge, MIC_BIAS, MIC_ADC_IN, I2S und PDM-fähige Pins bereit. Der Audio-DAC ist ein 24-Bit-Ausgangspfad, der Abtastraten von 8 kHz bis 48 kHz mit 109 dB SNR und Dynamikumfang unterstützt. Der Audio-ADC ist ein 24-Bit-Sigma-Delta-Eingangspfad, der Abtastraten von 8 kHz bis 48 kHz mit 99 dB SNR und Dynamikumfang unterstützt.

DS5602 V0.3 nennt zwei Digitarmikrofoneingänge und zwei PDM-Schnittstellen (PDM1/PDM2). Die empfohlene Pinbelegung weist PDM1_DATA PA20 oder PA64, PDM1_CLK PA24 oder PA69, PDM2_DATA PA25 oder PA71 sowie PDM2_CLK PA26 oder PA73 zu. Dies sind alternative Pin-Multiplexoptionen, keine Bestätigung der Leiterbahnführung auf dem Trägerboard. Aus der Zahl der Eingänge und Schnittstellen lassen sich weder die Höchstzahl physischer Mikrofone noch die Unterstützung einer Kanalteilung ableiten. Prüfen Sie vor einer Mehrmikrofon-Auslegung den unterstützten Modus und die tatsächliche Pinbelegung auf dem Board.

Halten Sie analoge Audiosignale von störenden Schaltknoten, LCD-Takten und Antennenzuführungsstrukturen fern. Platzieren Sie die Filterung für MIC_BIAS und MIC_ADC_IN nahe an der angeschlossenen Mikrofonschaltung.

<div id="533"></div>

#### 5.3.3 Tasten { #533-buttons }

PB32 ist der PWRKEY-Eingang und unterstützt einen Reset nach 10 s langem Drücken bei High-Pegel. Sehen Sie den erforderlichen 10-kΩ-Pull-down vor und stellen Sie sicher, dass der Tastenschaltkreis während Transport, Deep Sleep und Ein-/Ausschaltsequenzen keinen undefinierten Pegel annimmt.

<div id="534-pwm"></div>

#### 5.3.4 Motor- und PWM-Lasten { #534-motor-and-pwm-loads }

Die in der empfohlenen Pin-Zuweisungsabbildung des Datenblatts mit GPTIM gekennzeichneten Pins unterstützen PWM-Ausgänge. Verwenden Sie externe Treiber für Motoren, Hintergrundbeleuchtung, Summer oder andere Lasten. Steuern Sie induktive oder stromstarke Lasten nicht direkt über Modul-GPIOs an.

<div id="54"></div>

### 5.4 Speicher und Konnektivität { #54-storage-and-connectivity }

<div id="541"></div>

#### 5.4.1 Speicher { #541-storage }

Die Modulfamilie stellt SKU-abhängigen Haupt-Flash, 4+8 MB OPI-PSRAM und 1 MB Backup-QSPI-NOR-Flash bereit. MPI3 kann extern SPI-NOR oder SPI-NAND anbinden, aber PA06–PA11 sind standardmäßig mit dem internen Flash des Moduls verbunden und extern nicht verfügbar. SDIO und MPI3 teilen sich I/O-Ressourcen und können nicht gleichzeitig verwendet werden.

<div id="542"></div>

#### 5.4.2 Sensoren { #542-sensors }

GPADC unterstützt 12-Bit-Wandlung, eine Abtastrate von bis zu 4 MS/s, einen Eingangsbereich von 0–3,3 V single-ended, einen Differenzeingangsbereich von -2,1 V bis +2,1 V, Software-/Hardware-Trigger und DMA. Mit GPADC_CHx gekennzeichnete Pins unterstützen Analogeingänge; halten Sie analoge Pfade kurz, gefiltert und fern von LCD- und RF-Schaltstörungen.

#### 5.4.3 UART/I2C { #543-uarti2c }

UART unterstützt Vollduplex-Betrieb bis zu 6 Mbps. I2C unterstützt die Standardmodi 100 kbps, Fast 400 kbps, Fast-Mode Plus 1 Mbps und High-Speed 3,4 Mbps. Viele GPIOs sind als `PAxx_I2C_UART` oder `PBxx_I2C_UART` gemultiplext; bestätigen Sie den endgültigen Mux-Plan vor dem Schaltplan-Freeze.

UART4_TXD an Pin 6 und UART4_RXD an Pin 7 bilden die Standard-UART für Logausgabe und unterstützen Programm-Download sowie Debugging. PA16 und PA17 können als DBG_UART gemultiplext werden; werden diese Pins für Download oder Debugging verwendet, sind Serienwiderstände von 100 Ω erforderlich.

<div id="544-usb-spi-sdio-i2s"></div>

#### 5.4.4 USB, SPI, SDIO und I2S { #544-usb-spi-sdio-and-i2s }

USB2.0 FS unterstützt Host-/Device-Modus mit integriertem PHY. SPI unterstützt SSP/SPI- und Microwire-Formate; HPSYS-SPI erreicht bis zu 48 MHz, LPSYS-SPI bis zu 24 MHz. SDMMC1 unterstützt SD 3.0, SDIO 3.0 und eMMC 4.5.1 mit SDR- und DDR-Modi; SDMMC2 unterstützt SD-/SDIO-/eMMC-Funktionen mit SDR-Modi bis zu 48 MHz. I2S unterstützt Master-/Slave-Betrieb, Vollduplex, Links-/Rechts-/Standardformate und eine PCM-Breite von bis zu 24 Bit.

<div id="55"></div>

### 5.5 Fertigung { #55-manufacturing }

<div id="551"></div>

#### 5.5.1 Debug { #551-debug }

SWDIO an Pin 79 und SWCLK an Pin 80 sind SWD-Debug-/Download-Pins. Halten Sie SWD bei frühen Prototypen und an Fertigungsprüfvorrichtungen zugänglich. Halten Sie außerdem den Standard-UART4-Download-/Debug-Pfad zugänglich, sofern das Produkt keinen anderen zugelassenen Programmierpfad besitzt.

<div id="552"></div>

#### 5.5.2 Produktion { #552-production }

Reservieren Sie auf Platinenebene Fertigungszugänge für Stromversorgung, Masse, Boot-Modus, Reset/PWRKEY, SWD, UART-Download sowie jede Kalibrierungs- oder RF-Testschnittstelle. Die finale Testsoftware sollte Boot, Flash, Display, Touch, Audio, USB, Sensoren, RF-Kommunikation, Schlaf- und Weckverhalten sowie Stromverbrauch abdecken.

<div id="6-pcb"></div>

## 6. PCB-Layout { #6-pcb-layout }

<div id="61"></div>

### 6.1 Mechanik und Footprint { #61-mechanical-and-footprint }

Das Modul misst 18,0 × 32,9 × 3,1 mm. Verwenden Sie den empfohlenen PCB-Footprint aus dem Datenblatt und stimmen Sie Land Pattern, Lötstopplack-Erweiterung, Pastenöffnung, Freihaltebereich und Bestückungs-Courtyard mit dem PCB-Bestückungsdienstleister ab.

!!! info "Abbildung 6.1-1: SF32LB56-MOD Modulabmessungen"
    Siehe Abbildung 8-1 in DS5602 V0.3.

!!! info "Abbildung 6.1-2: Empfohlener PCB-Footprint"
    Siehe Abbildung 8-2 in DS5602 V0.3. Abmessungen in Millimetern.

<div id="62"></div>

### 6.2 Antennenplatzierung { #62-antenna-placement }

Verwendet das Produkt die integrierte PCB-Antenne, halten Sie deren Bereich frei von Bauteilen und Metall. Platzieren Sie das Modul so, dass die Antenne nach Möglichkeit über den Rand der Trägerplatine hinausragt und der Speisepunkt nahe am Platinenrand liegt.

Kann die Antenne nicht über den Platinenrand hinausragen, sehen Sie einen Freihaltebereich von mindestens 15 mm vor. Platzieren Sie in diesem Bereich weder Kupfer noch Leiterbahnen noch Bauteile und sparen Sie das Material der Trägerplatine unter der PCB-Antenne so weit wie praktikabel aus.

!!! info "Abbildung 6.2-1: Empfohlene Modulplatzierung"
    Siehe Abbildung 8-4 in DS5602 V0.3.

!!! info "Abbildung 6.2-2: PCB-Antennen-Freihaltebereich"
    Siehe Abbildung 8-5 in DS5602 V0.3.

<div id="63"></div>

### 6.3 Externer Antennensteckverbinder { #63-external-antenna-connector }

Für Designs mit externer Antenne beschreibt das Datenblatt einen Steckverbinder der ersten Generation für externe Antennen, kompatibel mit Hirose-U.FL-Serie, I-PEX-MHF-I- und Amphenol-AMC-Steckverbindern.

!!! info "Abbildung 6.3-1: Abmessungen des externen Antennensteckverbinders"
    Siehe Abbildung 8-3 in DS5602 V0.3.

<div id="64"></div>

### 6.4 Layout-Checkliste { #64-layout-checklist }

<div align="center"><em>Tabelle 6.4-1: PCB-Layout-Checkliste</em></div>

<div align="center" markdown>

| Bereich | Prüfung |
| :--- | :--- |
| Stromversorgung | 4,7-µF-Kondensatoren befinden sich nahe an den Pins von VDD_3V3, VDD_1V8 und VDDIO. |
| Masse | Modul-Massepins sind mit einem niederohmigen Massesystem mit Stitching nahe den High-Speed- und RF-Pfaden verbunden. |
| Antenne | In den Antennenfreihaltebereich ragen weder Kupfer, Leiterbahnen, Bauteile, Schrauben, Abschirmungen noch Akku- oder Gehäusemetall hinein. |
| Display | LCD-RGB-/SPI-Leitungen sind kurz, impedanzbewusst und weisen die erforderlichen Serienwiderstände auf. |
| USB | USB-DP/DM sind als angepasstes Differenzpaar geroutet, mit ESD nahe am Steckverbinder. |
| Analoges Audio | MIC_BIAS, MIC_ADC_IN und DAC-Ausgänge meiden Schaltregler, LCD-Takte und RF-Speisebereiche. |
| Debug | SWD- und UART-Download-/Debug-Zugang ist bei Prototypen und Fertigungsprüfvorrichtungen erreichbar. |

</div>

<div id="7"></div>

## 7. Hardware-Validierung { #7-hardware-validation }

<div id="71"></div>

### 7.1 Elektrische Eigenschaften { #71-electrical-characteristics }

Die elektrischen Werte in diesem Abschnitt folgen DS5602 V0.3. Absolute Maximalwerte sind Belastungsgrenzwerte: Eine Überschreitung kann das Gerät dauerhaft beschädigen; der Betrieb außerhalb der empfohlenen Bedingungen ist nicht garantiert, und eine längere Einwirkung kann die Zuverlässigkeit beeinträchtigen.

<div align="center"><em>Tabelle 7.1-1: Absolute Maximalwerte</em></div>

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

<div id="72"></div>

### 7.2 Stromverbrauch { #72-power-consumption }

<div align="center"><em>Tabelle 7.2-1: Bluetooth- und BLE-Strom bei 3,3 V, TX-Leistung 0 dBm</em></div>

<div align="center" markdown>

| Modus | Bedingung | Typischer Strom |
| :--- | :--- | :-: |
| BT Sniff | 50-ms-Intervall | 196,0 µA |
| BT Sniff | 100-ms-Intervall | 100,1 µA |
| BT Sniff | 200-ms-Intervall | 52,2 µA |
| BT Sniff | 500-ms-Intervall | 23,4 µA |
| BT Sniff | 1-s-Intervall | 13,8 µA |
| BLE ADV | 50-ms-Intervall | 228,7 µA |
| BLE ADV | 100-ms-Intervall | 116,6 µA |
| BLE ADV | 200-ms-Intervall | 60,5 µA |
| BLE ADV | 500-ms-Intervall | 26,9 µA |
| BLE ADV | 1-s-Intervall | 15,7 µA |
| BLE-Verbindung | 50-ms-Intervall | 172,8 µA |
| BLE-Verbindung | 100-ms-Intervall | 87,9 µA |
| BLE-Verbindung | 200-ms-Intervall | 45,5 µA |
| BLE-Verbindung | 500-ms-Intervall | 20,0 µA |
| BLE-Verbindung | 1-s-Intervall | 11,5 µA |
| Scan | Inquiry Scan oder Page Scan | 36,8 µA |
| Beide Scans | Inquiry Scan und Page Scan | 64,0 µA |
| Standby | - | 4,6 µA |

</div>

Die BT-Sniff-Messung erfolgte mit einem iPhone 8 Plus und attempt=1. Scan und Beide Scans empfangen alle 1,28 s für 28,82 ms beziehungsweise 57,64 ms; die Versorgung erfolgt über PVDD + VDD_3V3. Diese Werte folgen DS5602 V0.3.

<div align="center"><em>Tabelle 7.2-2: Prozessorstrom</em></div>

<div align="center" markdown>

| Workload | Domäne | Frequenz | Strom | Stromzuwachs |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9,38 mA | 30,92 µA/MHz |
| CoreMark | HPSYS | 192 MHz | 7,90 mA | 30,92 µA/MHz |
| CoreMark | LPSYS | 48 MHz | 0,92 mA | 15,13 µA/MHz |
| CoreMark | LPSYS | 24 MHz | 0,55 mA | 15,13 µA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7,54 mA | 25,75 µA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6,30 mA | 25,75 µA/MHz |
| WhileLoop | LPSYS | 48 MHz | 0,70 mA | 10,63 µA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0,44 mA | 10,63 µA/MHz |

</div>

<div id="73"></div>

### 7.3 Schaltplan-Checkliste { #73-schematic-checklist }

<div align="center"><em>Tabelle 7.3-1: Schaltplan-Design-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt |
| :-: | :--- |
| 1 | VDD_3V3-Eingangsbereich ist 2,97–3,6 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 2 | VDD_1V8-Eingangsbereich ist 1,7–1,95 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 3 | VDDIO-Eingangsbereich ist 1,7–3,6 V; einen 4,7-µF-Kondensator nahe am Modulpin platzieren. |
| 4 | Der Pegel der Modul-I/O-Schnittstelle beträgt 3,3 V; die Pegel der angeschlossenen Peripherie müssen kompatibel sein. |
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

DS5602 V0.3 gibt für VDDIO einen Betriebsbereich von 1,7–3,6 V an und hält PA00–PA11 unabhängig von VDDIO auf 3,3 V fest. Prüfpunkt 4 der Checkliste nennt dagegen pauschal 3,3 V als Modul-I/O-Schnittstellenpegel. Die Spezifikation klärt nicht, ob diese Aussage für alle I/O-Pins gilt. Leiten Sie keine allgemeine 3,3-V-Kompatibilität ab; klären Sie die elektrische Domäne jedes verwendeten Pins und Peripheriegeräts mit SiFli.

<div id="74"></div>

### 7.4 Lagerung, Handhabung und Bestückung { #74-storage-handling-and-assembly }

<div align="center"><em>Tabelle 7.4-1: Anforderungen an Lagerung, Handhabung und Bestückung</em></div>

<div align="center" markdown>

| Thema | Anforderung |
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
    Abbildung 9-1 in DS5602 V0.3 nennt: Aufheizen von 25–150 °C in 60–90 s bei 1–3 °C/s; Vorheizen von 150–200 °C für 60–120 s; 60–90 s oberhalb von 217 °C; einen Spitzenwert von 235–250 °C; und Abkühlen vom Spitzenwert auf 180 °C mit -1 bis -5 °C/s. Als Lot ist SAC305 angegeben. Die Legende unten nennt ein Zeitfenster am Spitzenwert von 30–70 s, während die Grafik separat „焊接时间 >30 s“ (Lötzeit >30 s) angibt. Die Spezifikation löst diesen Unterschied nicht auf. Führen Sie die Angaben nicht zusammen und bestätigen Sie das Produktionsprofil.

<div id="8"></div>

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

DS5602 V0.3 enthält die 89-Pin-Definitionstabelle und eine Pinbelegung in Draufsicht. Die folgende Tabelle hebt Pins und Signalgruppen hervor, die besonders häufig das Schaltplanrisiko, den Start-/Debug-Zugang oder die Planung gemeinsam genutzter Ressourcen beeinflussen. Prüfen Sie die vollständige Pinbelegung anhand des Datenblatts der genauen Modulrevision.

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
| Pins 43/44 | Differenzielle DAC-Ausgänge AU_DAC1P_OUT/AU_DAC1N_OUT. |
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
| 0.1 | 2026-07 | Erste Ausgabe des Leitfadens auf Grundlage von DS5602 V0.3. |

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
