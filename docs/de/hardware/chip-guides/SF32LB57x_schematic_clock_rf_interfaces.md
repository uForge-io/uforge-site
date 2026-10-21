---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplanrichtlinien für Takt, RF und Benutzerschnittstellen des SF32LB57x: 48-MHz-/32,768-kHz-Quarze, RF-Anpassung, Display, Touch, Audio, Kamera und Motor."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden — Takt, RF & Benutzerschnittstellen { #sf32lb57x-hardware-design-guide-clock-rf-user-interfaces }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 5.3 bis 5.5 der Schaltplanrichtlinien: Takterzeugung, RF und Benutzerschnittstellen. Kehren Sie zu [Minimalsystem und Stromversorgung](SF32LB57x_schematic_system_power.md) zurück oder fahren Sie mit [Speicher und Fertigung](SF32LB57x_schematic_storage_mfg.md) fort.

### 5.3. Takterzeugung { #53-clock-generation }

Die Takterzeugung umfasst den 48-MHz-Hauptquarz, den 32,768-kHz-RTC-Quarz sowie die Kalibrierbedingungen, die RF, Bluetooth, RTC-Genauigkeit und das Energiesparverhalten beeinflussen. Berücksichtigen Sie die Quarzauswahl und Layout-Randbedingungen bei der Schaltplanprüfung und Bauteilplatzierung.

#### 5.3.1. 48-MHz-Hauptquarz { #531-48-mhz-main-crystal }

Empfohlene Parameter:

<div align="center"><em>Tabelle 5.3-1: Empfohlene Parameter des 48-MHz-Hauptquarzes</em></div>

<div align="center" markdown>

| Parameter | Empfehlung |
|:----------|:---------------|
| Lastkapazität CL | 7 pF bis 12 pF, etwa 8,8 pF empfohlen |
| Frequenztoleranz | <= ±10 ppm |
| ESR | <= 30 Ω, etwa 22 Ω empfohlen |

</div>

Laut Quellleitfaden sinkt die Verlustleistung des Quarzes, wenn `CL` und ESR kleiner sind. Sehen Sie neben dem 48-MHz-Quarz einen Footprint für einen parallel geschalteten Anpasskondensator vor. Bei einem Quarz mit `CL` unter 12 pF muss dieser Kondensator laut Quelle nicht bestückt werden.

Layout-Anforderungen:

- Platzieren Sie den Quarz nahe an den Chip-Pins, bevorzugt innerhalb der Abschirmhaube.
- Halten Sie ihn von PA, Lader, PMU, DC/DC, Akku und Hochgeschwindigkeits-Digitalleitungen fern.
- Routen Sie ihn nach Möglichkeit auf der Top-Lage, mit einer Leiterbahnbreite von 0,1 mm und einer Länge von 3 mm bis 10 mm. Halten Sie zwischen `48M_XI` und `48M_XO` mindestens 0,15 mm Abstand ein, wie in der Quell-Layoutabbildung gezeigt.
- Halten Sie den Freihaltebereich des Quarzes auf der Top-Lage konsistent mit dem Referenzdesign und routen Sie keine Signale unter dem Quarz. Die Quelle enthält widersprüchliche Angaben zu Massekupfer auf der benachbarten Lage; siehe den folgenden Hinweis.
- Verwenden Sie eine dreidimensionale Masseabschirmung, platzieren Sie Masse jedoch nicht zu nahe an den Oszillationsleitungen.

Der spezifizierte Lastkapazitätsbereich des 48-MHz-Quarzes beträgt 7 bis 12 pF; empfohlen werden etwa 8,8 pF. Prüfen Sie den gewählten Quarz zusammen mit der Oszillatorschaltung auf der Produkthardware und bestätigen Sie den Frequenzfehler. Die Quarzfrequenzkalibrierung gehört zur Produktionsinbetriebnahme; gehen Sie nicht davon aus, dass die Software-Standardeinstellung für jeden Quarz geeignet ist.

#### 5.3.2. 32,768-kHz-RTC-Quarz { #532-32768-khz-rtc-crystal }

Empfohlene Parameter:

<div align="center"><em>Tabelle 5.3-2: Empfohlene Parameter des 32,768-kHz-RTC-Quarzes</em></div>

<div align="center" markdown>

| Parameter | Empfehlung |
|:----------|:---------------|
| Lastkapazität CL | 7 pF oder 11,5 pF (Chip-Standard ist 11,5 pF; 7 pF erfordert eine Registeränderung); 7 pF wird für den niedrigsten Stromverbrauch empfohlen |
| Frequenztoleranz | <= ±20 ppm |
| ESR | <= 80 kΩ, etwa 38 kΩ empfohlen |

</div>

Laut Quelle sinkt die Verlustleistung des Quarzes, wenn `CL` und ESR kleiner sind. Bei 7 pF und 11,5 pF ist kein externer Anpasskondensator erforderlich. Bei anderen Lastkapazitäten muss die Schaltung vermessen werden, um den erforderlichen Anpasswert zu bestimmen.

Layout-Anforderungen:

- Platzieren Sie den Quarz nahe am Chip und halten Sie die Leitungen kurz.
- Begrenzen Sie die Leiterbahnbreite auf 0,1 mm und die Länge auf höchstens 10 mm. Halten Sie zwischen `32K_XI` und `32K_XO` mindestens 0,15 mm Abstand ein, wie in der Quell-Layoutabbildung gezeigt, und ergänzen Sie eine dreidimensionale Masseabschirmung.
- Halten Sie den Freihaltebereich des Quarzes auf der Top-Lage konsistent mit dem Referenzdesign und routen Sie keine Signale unter dem Quarz. Die Quelle enthält widersprüchliche Angaben zu Massekupfer auf der benachbarten Lage; siehe den folgenden Hinweis.
- Halten Sie den Quarzbereich von Störungen durch Stromversorgung, RF, USB, SDIO, Display-Takte und Ladeelektronik fern.

<div align="center"><em>Tabelle 5.3-3: Empfohlene Quarzbauteile</em></div>

<div align="center" markdown>

| Quarz | Teilenummer | Hersteller | Schlüsselparameter |
|:--------|:------------|:-------|:---------------|
| 48 MHz | E1SB48E001G00E | Hosonic | F0 = 48,000000 MHz, ΔF/F0 = -6 bis +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR -30 bis 85 °C, Baugröße 2016. |
| 32,768 kHz | ETST00327000LE | Hosonic | F0 = 32,768 kHz, ΔF/F0 = -20 bis +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 bis 85 °C, Baugröße 3215. |
| 48 MHz | SX20Y048000B31T-8.8 | TKD | F0 = 48,000000 MHz, ΔF/F0 = -10 bis +10 ppm, CL = 8,8 pF, ESR <= 40 Ω, TOPR -20 bis 75 °C, Baugröße 2016; höherer ESR erhöht die statische Leistungsaufnahme leicht. |
| 32,768 kHz | SF32K32768D71T01 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 bis +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 bis 85 °C, Baugröße 3215. |
| 32,768 kHz | SF32WK32768D71T005 | TKD | F0 = 32,768 kHz, ΔF/F0 = -20 bis +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 bis 85 °C, Baugröße 3215. |
| 48 MHz | CN4048M000885C822000 | JWT | F0 = 48,000000 MHz, ΔF/F0 = -8 bis +8 ppm, CL = 8,8 pF, ESR <= 22 Ω, TOPR -30 bis 85 °C, Baugröße 2016. |
| 32,768 kHz | DH2032K76807T2719002 | JWT | F0 = 32,768 kHz, ΔF/F0 = -20 bis +20 ppm, CL = 7 pF, ESR <= 70 kΩ, TOPR -40 bis 85 °C, Baugröße 3215. |

</div>

Das `CL` des 32,768-kHz-Quarzes muss zur Registerkonfiguration passen: für 7 pF `PMUC->LXT_CR->CAP_SEL = 0` setzen; für 11,5 pF `PMUC->LXT_CR->CAP_SEL = 1` setzen. Bestätigen Sie diese Einstellung vor dem EVT in der Firmware, da die empfohlene Quarzliste überwiegend 7 pF vorsieht, während manche Firmware-Standardwerte eine andere Lastkapazität verwenden können.

!!! warning "Widersprüchliche Angaben der Quelle zum Massekupfer unter dem Quarz"
    Die Quelle ist hinsichtlich des Kupfers unter den Quarzen nicht konsistent: Ein Hinweis im Taktabschnitt fordert, mindestens das Massekupfer der zweiten Lage zu entfernen; der Text zur Quarzführung verlangt einen Freihaltebereich auf der benachbarten Lage; die Querschnittsabbildungen zeigen Massekupfer auf L2 unter den Leiterbahnen; und der Abschnitt zum Lagenaufbau fordert eine durchgehende Massefläche auf L2. Leiten Sie daraus keine einzelne Regel ab. Klären Sie das Layout vor der PCB-Freigabe anhand des aktuell freigegebenen SF32LB57x-Referenzdesigns.

#### 5.3.3. Taktausgänge für Energiesparzustände { #533-low-power-clock-outputs }

In den Modi Sleep, DeepSleep, Standby und Hibernate können die Pins `PA24` bis `PA27` entweder den RC10K-Takt oder einen 32,768-kHz-Takt ausgeben.

In Sleep, DeepSleep und Standby können `PA24` bis `PA27` außerdem einen von LPTIM2 erzeugten PWM-Takt mit bis zu 16 kHz ausgeben.

### 5.4. RF { #54-rf }

#### 5.4.1. RF-Schaltplan { #541-rf-schematic }

Wesentliche RF-Schaltplananforderungen:

- Reservieren Sie im Antennenpfad ein Lötflächenmuster für ein π-Anpassnetzwerk, um Störaussendungen zu filtern und die Antenne abzustimmen.
- Die Referenzschaltung zeigt NC-Bestückungspositionen für die Shunt-Kondensatoren und einen 15-pF-/50-V-Serienkondensator. Der Quelltext sagt außerdem, dass eine bereits impedanzangepasste Antenne keine zusätzlichen Anpassbauteile benötigt. Legen Sie anhand des Antennendesigns und der RF-Messungen fest, welche Positionen bestückt werden; die dargestellte Bestückung ist nicht universell.
- Platzieren Sie das Anpassnetzwerk nahe am RF-Pin des Chips, nicht am antennenseitigen Ende.
- Platzieren Sie den `AVDD_BRF`-Filterkondensator nahe am Chip und verbinden Sie seine Masse über nahegelegene Vias direkt mit der Hauptmasse.
- Planen Sie Antenne, Anpassnetzwerk, RF-ESD und Steckverbinder als zusammenhängende Signalkette.

![Abbildung 5.4-1: RF-Schaltplan-Referenz](../../sf32-products/chips/assets/57x/SF32LB57x-rf-diagram.png){ width="80%" loading="lazy" }

<div align="center"><em>Abbildung 5.4-1: RF-Schaltplan-Referenz</em></div>

#### 5.4.2. RF-PCB { #542-rf-pcb }

PCB-Anforderungen:

- Führen Sie die RF-Leitung als unsymmetrische 50-Ω-Leitung aus.
- Bevorzugen Sie ein Routing auf der Top-Lage mit möglichst wenigen Vias und Lagenwechseln.
- Vermeiden Sie scharfe Winkel und rechtwinklige Ecken.
- Ergänzen Sie beidseitig Massekupfer und Via-Zäune.
- Sorgen Sie unter der RF-Leitung für eine durchgehende Referenzmasse.
- Halten Sie RF von DC/DC, Quarzen, USB, SDIO, Display-Takten, Hochstrom-Ladepfaden und anderen Störbereichen fern.

#### 5.4.3. RF-Inbetriebnahme und Kalibrierung { #543-rf-bring-up-and-calibration }

Verifizieren Sie die RF-Leistung durch Messungen; ein korrekter Schaltplan ist nur der Ausgangspunkt.

Empfohlene Prüfungen bei der RF-Inbetriebnahme:

- Bestätigen Sie Frequenzfehler und Anlaufstabilität des 48-MHz-Quarzes.
- Prüfen Sie Sendeleistung, Frequenzfehler, Empfängerempfindlichkeit und Modulationsqualität mit einer leitungsgebundenen Messung.
- Stimmen Sie das π-Anpassnetzwerk mit dem endgültigen Gehäuse, dem Akku, der Abschirmhaube und der Antennenplatzierung ab.
- Verifizieren Sie die RF-Leistung bei eingeschaltetem Display und während des Ladens sowie bei aktiver USB-/SDIO-Kommunikation, Bildschirmaktualisierung, Motor- und Audiobetrieb.
- Stellen Sie sicher, dass die Fertigungsprüfvorrichtung Quarzkalibrierung, grundlegende RF-Prüfungen und den Firmware-Download unterstützt.

!!! note
    Die Antennenanpassung sollte an einem Prototyp mit einer dem Endprodukt möglichst ähnlichen Struktur abgeschlossen werden. Ergebnisse auf einer unbestückten Platine bilden die RF-Leistung des Endprodukts üblicherweise nicht ab.

### 5.5. Benutzerschnittstellen { #55-user-interfaces }

#### 5.5.1. Display, Touch und Hintergrundbeleuchtung { #551-display-touch-and-backlight }

Prüfen Sie Display, Touch und Hintergrundbeleuchtung als eine Schnittstellengruppe, da Panel-Timing, Einschaltsequenz, FPC-Routing, Wecken per Touch, ESD und Störungen der Hintergrundbeleuchtung bei der Inbetriebnahme der Platine oft zusammenwirken.

#### 5.5.2. Auswahl der Display-Schnittstelle { #552-display-interface-selection }

Der SF32LB57x-LCDC unterstützt je nach genauem Gerät mehrere Display-Schnittstellentypen.

<div align="center"><em>Tabelle 5.5-1: Leitfaden zur Auswahl der Display-Schnittstelle</em></div>

<div align="center" markdown>

| Schnittstelle | Anwendungsfall | Hardware-Hinweise |
|:----------|:---------|:---------------|
| SPI / QSPI | Kleine TFT-/AMOLED- und Wearable-Displays | Geringe Pinzahl, begrenzte Bandbreite, gut für Teil-Refresh. |
| 8080 MCU | Parallele Display-Panels | Höhere Bandbreite als serielle Schnittstellen, benötigt aber mehr Pins. |
| RGB / DPI | Mittel- und hochauflösende Panels | Kontinuierlicher Pixelstrom, strenge Bandbreiten- und Timing-Anforderungen. |
| MIPI DSI | AMOLED-Displays mit hoher Pixeldichte | Hohe Bandbreite bei geringer Pinzahl, aber komplexere Initialisierung und Signalintegrität. |
| EPD | E-Paper | Niedrige Refresh-Rate, erfordert VCOM, PMIC und Waveform-Planung. |
| JDI | Memory-in-Pixel-Displays mit niedrigem Stromverbrauch | Gut für Always-on- und sonnenlichttaugliche Produkte. |

</div>

Allgemeine Display-Hinweise und Beispiele:

- Der Display-Controller unterstützt 3-Leitungs-SPI, 4-Leitungs-SPI, Dual-Data-SPI, Quad-Data-SPI, 16-Bit-RGB, 16-Bit-MCU-8080, 16-Bit-EPD sowie serielles/paralleles JDI.
- Unterstützte Farbtiefen sind RGB888, RGB666, RGB565 und RGB111; die maximale Auflösung kann 1024 x 1024 erreichen. Bestätigen Sie die genauen Modi für das gewählte Gerät.
- Prüfen Sie bei hochauflösenden Projekten frühzeitig Schnittstellenbandbreite, Display-RAM, PSRAM-Bandbreite und Refresh-Strategie.
- Wenn Sie kein individuelles Pinout benötigen, beginnen Sie mit einer SDK-angepassten oder im Referenzdesign verwendeten I/O-Gruppe für die gewählte Panel-Schnittstelle. Matrix-Routing ist flexibel, doch eine softwareunterstützte I/O-Gruppe verringert das Risiko bei Treiberentwicklung und Inbetriebnahme.
- Panel-Initialisierung, Einschaltsequenz und Schnittstellenmodus müssen dem Datenblatt des Panel-Herstellers folgen.

<div align="center"><em>Tabelle 5.5-2: Ausgangspunkte für Display-IO</em></div>

<div align="center" markdown>

| Display-Schnittstelle | Empfohlener Ausgangspunkt |
|:------------------|:---------------------------|
| SPI / QSPI | Bevorzugen Sie die dedizierten `LCDC1_SPI_*`-Pins in der Pinmux-Tabelle. Wenn Sie LCDC-SPI-Signale über die Matrix zuordnen, begrenzen Sie den Display-Takt auf höchstens 50 MHz und prüfen Sie die Treiberstärke. |
| RGB / DPI | Verwenden Sie für Signale über 30 MHz die Pins `PA22` bis `PA50` für die LCDC-Signale; `PA52` bis `PA54` dürfen nur `B1` bis `B6` führen. Bei langsameren Designs kann die Zuordnung über die Matrix nach Prüfung des Timings verwendet werden. |
| 8080 MCU | Wenden Sie bei schnellen Designs dieselben Regeln für Hochgeschwindigkeits-Pin-Gruppen wie bei RGB/DPI an. Prüfen Sie Busbreite, Timing und Treiberstärke anhand der Panelanforderungen. |
| EPD | Wenden Sie dieselben Regeln für Hochgeschwindigkeits-Pin-Gruppen wie bei RGB/DPI an, wenn der EPD-Bus über 30 MHz läuft. Prüfen Sie zusätzlich VCOM- und PMIC-Steuerpins. |
| JDI | Folgen Sie der LCDC-JDI-Signalzuordnungstabelle und bevorzugen Sie, sofern verfügbar, eine SDK-angepasste Panel-Konfiguration. |
| MIPI DSI | Verwenden Sie die feste DSI-Signalzuweisung des gewählten Geräts und Referenzdesigns. Prüfen Sie Lane-Routing und Panel-Initialisierung gemeinsam mit dem Softwareteam. |

</div>

<div align="center"><em>Tabelle 5.5-3: Beispiele für LCD-Controller</em></div>

<div align="center" markdown>

| Treiber | Hersteller | Auflösung | Typ | Typische Schnittstellen |
|:-------|:-------|:-----------|:-----|:-------------------|
| RM69090 | Raydium | 368 x 448 | AMOLED | SPI, Quad SPI, MIPI-DSI |
| RM69330 | Raydium | 454 x 454 | AMOLED | SPI, Quad SPI, 8-Bit-8080-MCU, MIPI-DSI |
| ILI8688E | ILITEK | 368 x 448 | AMOLED | Quad SPI, MIPI-DSI |
| SH8601A | Shenghe | 454 x 454 | AMOLED | SPI, Quad SPI, 8-Bit-8080-MCU, MIPI-DSI |
| SPD2012 | Solomon | 356 x 400 | TFT | Quad SPI |
| GC9C01 | Galaxycore | 360 x 360 | TFT | Quad SPI |
| GC9B71 | Galaxycore | 320 x 380 | TFT | Quad SPI |
| ST77903 | Sitronix | 400 x 400 | TFT | Quad SPI |
| ICNA3311 | Chipone | 454 x 454 | AMOLED | Quad SPI |
| FT2308 | FocalTech | 410 x 494 | AMOLED | Quad SPI |

</div>

Die folgenden Tabellen zeigen die genaue Zuordnung der Signale zu den Pins für jeden Display-Schnittstellentyp. Verwenden Sie jeweils die Tabelle, die zur Schnittstelle des gewählten Panels passt.

<div align="center"><em>Tabelle 5.5-4: SPI/QSPI-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| SPI-Panel-Signal | 57x-Signal | Beschreibung |
|:------------------|:-----------|:-------------|
| `CSx` | `LCDC1_SPI_CS` | Chip-Select-Signal. |
| `WRx_SCL` | `LCDC1_SPI_CLK` | Taktsignal. |
| `DCx` | `LCDC1_SPI_DIO1` | Daten-/Kommando-Auswahlsignal im 4-Leitungs-SPI-Modus; `DATA1` im Quad-SPI-Modus. |
| `SDI_RDx` | `LCDC1_SPI_DIO0` | Dateneingangssignal im 3-/4-Leitungs-SPI-Modus; `DATA0` im Quad-SPI-Modus. |
| `SDO` | `LCDC1_SPI_DIO0` | Datenausgangssignal im 3-/4-Leitungs-SPI-Modus; diesen Pin mit kurzer Leitung an `SDI_RDx` anschließen. |
| `D[0]` | `LCDC1_SPI_DIO2` | `DATA2` im Quad-SPI-Modus. |
| `D[1]` | `LCDC1_SPI_DIO3` | `DATA3` im Quad-SPI-Modus. |
| `RESET` | `LCDC1_SPI_RSTB` | Reset-Signal. |
| `TE` | `LCDC1_SPI_TE` | Tearing-Effect-Signal an die MCU. |

</div>

!!! note
    Bevorzugen Sie die dedizierten `LCDC1_SPI_*`-Pins der Funktion 1. Werden stattdessen matrix-gemappte SPI-Signale (Funktionsindex 121-150) verwendet, begrenzen Sie den Takt auf 50 MHz und konfigurieren Sie die GPIO-Treiberstärke als `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabelle 5.5-5: RGB-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| RGB888-Panel-Signal | RGB565-Panel-Signal | 57x-Signal | Beschreibung |
|:---------------------|:----------------------|:-----------|:-------------|
| CLK | CLK | `LCDC_DPI_CLK` | Taktsignal. |
| DE | DE | `LCDC_DPI_DE` | Data-Enable-Signal im DE-Modus. |
| HSYNC | HSYNC | `LCDC_DPI_HSYNC` | Horizontal-Sync-Signal. |
| VSYNC | VSYNC | `LCDC_DPI_VSYNC` | Vertikal-Sync-Signal. |
| R0 | - | `LCDC_DPI_R0` | Rot-Daten 0. |
| R1 | - | `LCDC_DPI_R1` | Rot-Daten 1. |
| R2 | - | `LCDC_DPI_R2` | Rot-Daten 2. |
| R3 | R0 | `LCDC_DPI_R3` | Rot-Daten 3. |
| R4 | R1 | `LCDC_DPI_R4` | Rot-Daten 4. |
| R5 | R2 | `LCDC_DPI_R5` | Rot-Daten 5. |
| R6 | R3 | `LCDC_DPI_R6` | Rot-Daten 6. |
| R7 | R4 | `LCDC_DPI_R7` | Rot-Daten 7. |
| G0 | - | `LCDC_DPI_G0` | Grün-Daten 0. |
| G1 | - | `LCDC_DPI_G1` | Grün-Daten 1. |
| G2 | G0 | `LCDC_DPI_G2` | Grün-Daten 2. |
| G3 | G1 | `LCDC_DPI_G3` | Grün-Daten 3. |
| G4 | G2 | `LCDC_DPI_G4` | Grün-Daten 4. |
| G5 | G3 | `LCDC_DPI_G5` | Grün-Daten 5. |
| G6 | G4 | `LCDC_DPI_G6` | Grün-Daten 6. |
| G7 | G5 | `LCDC_DPI_G7` | Grün-Daten 7. |
| B0 | - | `LCDC_DPI_B0` | Blau-Daten 0. |
| B1 | - | `LCDC_DPI_B1` | Blau-Daten 1. |
| B2 | - | `LCDC_DPI_B2` | Blau-Daten 2. |
| B3 | B0 | `LCDC_DPI_B3` | Blau-Daten 3. |
| B4 | B1 | `LCDC_DPI_B4` | Blau-Daten 4. |
| B5 | B2 | `LCDC_DPI_B5` | Blau-Daten 5. |
| B6 | B3 | `LCDC_DPI_B6` | Blau-Daten 6. |
| B7 | B4 | `LCDC_DPI_B7` | Blau-Daten 7. |

</div>

<div align="center"><em>Tabelle 5.5-6: RGB-Modus-Konfiguration (LCDC_IFx Bit-Zuweisung je Modus)</em></div>

<div align="center" markdown>

| LCDC-Signal | Modus 0 (RGB565 Konf.1) | Modus 1 (RGB565 Konf.2) | Modus 2 (RGB565 Konf.3) | Modus 3 (RGB666 Konf.1) | Modus 4 (RGB666 Konf.2) | Modus 5 (RGB888) | Modus 6 (RGB666 über 8-Bit) | Modus 7 (RGB888 über 8-Bit) |
|:------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------|:-----------------------------|:-----------------------------|
| `LCDC_IF0` | B0 | B0 | - | B0 | B0 | B0 | R0/G0/B0 | R0/G0/B0 |
| `LCDC_IF1` | B1 | B1 | B0 | B1 | B1 | B1 | R1/G1/B1 | R1/G1/B1 |
| `LCDC_IF2` | B2 | B2 | B1 | B2 | B2 | B2 | R2/G2/B2 | R2/G2/B2 |
| `LCDC_IF3` | B3 | B3 | B2 | B3 | B3 | B3 | R3/G3/B3 | R3/G3/B3 |
| `LCDC_IF4` | B4 | B4 | B3 | B4 | B4 | B4 | R4/G4/B4 | R4/G4/B4 |
| `LCDC_IF5` | G0 | - | B4 | B5 | B5 | B5 | R5/G5/B5 | R5/G5/B5 |
| `LCDC_IF6` | G1 | - | - | G0 | - | B6 | - | R6/G6/B6 |
| `LCDC_IF7` | G2 | - | - | G1 | - | B7 | - | R7/G7/B7 |
| `LCDC_IF8` | G3 | G0 | G0 | G2 | G0 | G0 | - | - |
| `LCDC_IF9` | G4 | G1 | G1 | G3 | G1 | G1 | - | - |
| `LCDC_IF10` | G5 | G2 | G2 | G4 | G2 | G2 | - | - |
| `LCDC_IF11` | R0 | G3 | G3 | G5 | G3 | G3 | - | - |
| `LCDC_IF12` | R1 | G4 | G4 | R0 | G4 | G4 | - | - |
| `LCDC_IF13` | R2 | G5 | G5 | R1 | G5 | G5 | - | - |
| `LCDC_IF14` | R3 | - | - | R2 | - | G6 | - | - |
| `LCDC_IF15` | R4 | - | - | R3 | - | G7 | - | - |
| `LCDC_IF16` | - | R0 | - | R4 | R0 | R0 | - | - |
| `LCDC_IF17` | - | R1 | R0 | R5 | R1 | R1 | - | - |
| `LCDC_IF18` | - | R2 | R1 | - | R2 | R2 | - | - |
| `LCDC_IF19` | - | R3 | R2 | - | R3 | R3 | - | - |
| `LCDC_IF20` | - | R4 | R3 | - | R4 | R4 | - | - |
| `LCDC_IF21` | - | - | R4 | - | R5 | R5 | - | - |
| `LCDC_IF22` | - | - | - | - | - | R6 | - | - |
| `LCDC_IF23` | - | - | - | - | - | R7 | - | - |

</div>

`LCDC_IF24` bis `LCDC_IF29` werden in keinem RGB-Modus verwendet.

<div align="center"><em>Tabelle 5.5-7: MCU8080-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| MCU8080 16-Bit-Panel-Signal | MCU8080 8-Bit-Panel-Signal | 57x-Signal | Beschreibung |
|:------------------------------|:------------------------------|:------------|:-------------|
| `CSX` | `CSX` | `LCDC_8080_CS` | Chip-Select. |
| `WR` | `WR` | `LCDC_8080_WR` | Write-Strobe-Signal zum Schreiben von Daten. |
| `DC` | `DC` | `LCDC_8080_DC` | Auswahl Display-Daten/Kommando. |
| `RD` | `RD` | `LCDC_8080_RD` | Lese-Strobe-Signal. |
| `D[0]` | `D[0]` | `LCDC_8080_DIO0` | Daten 0. |
| `D[1]` | `D[1]` | `LCDC_8080_DIO1` | Daten 1. |
| `D[2]` | `D[2]` | `LCDC_8080_DIO2` | Daten 2. |
| `D[3]` | `D[3]` | `LCDC_8080_DIO3` | Daten 3. |
| `D[4]` | `D[4]` | `LCDC_8080_DIO4` | Daten 4. |
| `D[5]` | `D[5]` | `LCDC_8080_DIO5` | Daten 5. |
| `D[6]` | `D[6]` | `LCDC_8080_DIO6` | Daten 6. |
| `D[7]` | `D[7]` | `LCDC_8080_DIO7` | Daten 7. |
| `D[8]` | - | `LCDC_8080_DIO8` | Daten 8 (nur 16-Bit-Modus). |
| `D[9]` | - | `LCDC_8080_DIO9` | Daten 9 (nur 16-Bit-Modus). |
| `D[10]` | - | `LCDC_8080_DIO10` | Daten 10 (nur 16-Bit-Modus). |
| `D[11]` | - | `LCDC_8080_DIO11` | Daten 11 (nur 16-Bit-Modus). |
| `D[12]` | - | `LCDC_8080_DIO12` | Daten 12 (nur 16-Bit-Modus). |
| `D[13]` | - | `LCDC_8080_DIO13` | Daten 13 (nur 16-Bit-Modus). |
| `D[14]` | - | `LCDC_8080_DIO14` | Daten 14 (nur 16-Bit-Modus). |
| `D[15]` | - | `LCDC_8080_DIO15` | Daten 15 (nur 16-Bit-Modus). |
| `RESET` | `RESET` | `LCDC_8080_RSTB` | Reset. |
| `TE` | `TE` | `LCDC_8080_TE` | Tearing-Effect-Signal an die MCU. |

</div>

<div align="center"><em>Tabelle 5.5-8: EPD-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| EPD 16-Bit-Panel-Signal | EPD 8-Bit-Panel-Signal | 57x-Signal | Beschreibung |
|:--------------------------|:--------------------------|:------------|:-------------|
| `CLK` | `CLK` | `LCDC_TCON_SDCLK` | Taktsignal des Source-Treibers. |
| `CKV`/`CPV` | `CKV`/`CPV` | `LCDC_TCON_GDCLK` | Taktsignal des Gate-Treibers. |
| `SPH` | `SPH` | `LCDC_TCON_SDSTL` | Startimpuls des Source-Treibers. |
| `SPV`/`STV` | `SPV`/`STV` | `LCDC_TCON_GDSP` | Startimpuls des Gate-Treibers. |
| `LE` | `LE` | `LCDC_TCON_SDLE` | Latch-Freigabe des Source-Treibers. |
| `OE` | `OE` | `LCDC_TCON_SDOE` | Ausgangsfreigabe des Source-Treibers. |
| `D0` | `D0` | `LCDC_TCON_SDAT0` | Datenbit 0 des Source-Treibers. |
| `D1` | `D1` | `LCDC_TCON_SDAT1` | Datenbit 1 des Source-Treibers. |
| `D2` | `D2` | `LCDC_TCON_SDAT2` | Datenbit 2 des Source-Treibers. |
| `D3` | `D3` | `LCDC_TCON_SDAT3` | Datenbit 3 des Source-Treibers. |
| `D4` | `D4` | `LCDC_TCON_SDAT4` | Datenbit 4 des Source-Treibers. |
| `D5` | `D5` | `LCDC_TCON_SDAT5` | Datenbit 5 des Source-Treibers. |
| `D6` | `D6` | `LCDC_TCON_SDAT6` | Datenbit 6 des Source-Treibers. |
| `D7` | `D7` | `LCDC_TCON_SDAT7` | Datenbit 7 des Source-Treibers. |
| `D8` | `D8` | `LCDC_TCON_SDAT8` | Datenbit 8 des Source-Treibers. |
| `D9` | - | `LCDC_TCON_SDAT9` | Datenbit 9 des Source-Treibers (nur im 16-Bit-Modus). |
| `D10` | - | `LCDC_TCON_SDAT10` | Datenbit 10 des Source-Treibers (nur im 16-Bit-Modus). |
| `D11` | - | `LCDC_TCON_SDAT11` | Datenbit 11 des Source-Treibers (nur im 16-Bit-Modus). |
| `D12` | - | `LCDC_TCON_SDAT12` | Datenbit 12 des Source-Treibers (nur im 16-Bit-Modus). |
| `D13` | - | `LCDC_TCON_SDAT13` | Datenbit 13 des Source-Treibers (nur im 16-Bit-Modus). |
| `D14` | - | `LCDC_TCON_SDAT14` | Datenbit 14 des Source-Treibers (nur im 16-Bit-Modus). |
| `D15` | - | `LCDC_TCON_SDAT15` | Datenbit 15 des Source-Treibers (nur im 16-Bit-Modus). |
| `GMODE` | `GMODE` | Beliebiger GPIO | Ausgabemodus-Auswahl für den Gate-Treiber. |
| `VPOS` | `VPOS` | - | EPD-PMIC-Signal; positive Versorgung des Source-Treibers. |
| `VNEG` | `VNEG` | - | EPD-PMIC-Signal; negative Versorgung des Source-Treibers. |
| `VGH` | `VGH` | - | EPD-PMIC-Signal; positive Versorgung des Gate-Treibers. |
| `VGL` | `VGL` | - | EPD-PMIC-Signal; negative Versorgung des Gate-Treibers. |
| `VCOM` | `VCOM` | - | EPD-PMIC-Signal; gemeinsamer Elektrodenanschluss. |
| `WAKEUP` | `WAKEUP` | Beliebiger GPIO | EPD-PMIC-Wake-up. |
| `PWRUP` | `PWRUP` | Beliebiger GPIO | EPD-PMIC-Power-up. |
| `I2C_SDA` | `I2C_SDA` | Beliebiger GPIO | EPD-PMIC-I2C-Daten. |
| `I2C_SCL` | `I2C_SCL` | Beliebiger GPIO | EPD-PMIC-I2C-Takt. |
| `PWRCOM` | `PWRCOM` | Beliebiger GPIO | EPD-PMIC `VCOM_CTRL`; VCOM-Enable. |
| `GOOD` | `GOOD` | Beliebiger GPIO | EPD-PMIC Power-Good-Ausgang. |

</div>

<div align="center"><em>Tabelle 5.5-9: Parallele JDI-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| Paralleles-JDI-Panel-Signal | 57x-Signal | Beschreibung |
|:----------------------------|:------------|:-------------|
| `VST`/`GSP` | `LCDC_JDI_VST` | Startsignal für den vertikalen Treiber. |
| `ENB`/`GEN` | `LCDC_JDI_ENB` | Write-Enable-Signal für den Pixelspeicher. |
| `FRP`/`VA` | `#LPTIM2_OUTB` | Flüssigkristall-Ansteuersignal („Aus“-Pixel). |
| `HST`/`BSP` | `LCDC_JDI_HST` | Startsignal für den horizontalen Treiber. |
| `R1` | `LCDC_JDI_R1` | Rote Bilddaten (ungerade Pixel). |
| `G1` | `LCDC_JDI_G1` | Grüne Bilddaten (ungerade Pixel). |
| `B1` | `LCDC_JDI_B1` | Blaue Bilddaten (ungerade Pixel). |
| `VCOM` | `#LPTIM2_OUT` | Ansteuersignal der gemeinsamen Elektrode. |
| `B2` | `LCDC_JDI_B2` | Blaue Bilddaten (gerade Pixel). |
| `G2` | `LCDC_JDI_G2` | Grüne Bilddaten (gerade Pixel). |
| `R2` | `LCDC_JDI_R2` | Rote Bilddaten (gerade Pixel). |
| `HCK`/`BCK` | `LCDC_JDI_HCK` | Schiebetakt für den horizontalen Treiber. |
| `XFRP`/`VB` | `#LPTIM2_OUT` | Flüssigkristall-Ansteuersignal („Ein“-Pixel). |
| `XRST`/`INTB` | `LCDC_JDI_XRST` | Reset-Signal für den horizontalen und vertikalen Treiber. |
| `VCK`/`GCK` | `LCDC_JDI_VCK` | Schiebetakt für den vertikalen Treiber. |

</div>

<div align="center"><em>Tabelle 5.5-10: Serielle JDI-Display-Signalverbindungen</em></div>

<div align="center" markdown>

| Serielles-JDI-Panel-Signal | 57x-Signal | Beschreibung |
|:--------------------------|:------------|:-------------|
| `SCLK` | `LCDC_JDI_SCLK` | Serielles Taktsignal. |
| `SI` | `LCDC_JDI_SO` | Serielles Dateneingangssignal. |
| `SCS` | `LCDC_JDI_SCS` | Chip-Select-Signal. |
| `EXTCOMIN` | `LCDC_JDI_EXTCOMIN` | Eingangssignal für die COM-Polaritätsumkehr. |
| `DISP` | `LCDC_JDI_DISP` | Signal zum Ein- und Ausschalten des Displays. |

</div>

!!! note
    GPIO-Auswahl für RGB, MCU8080 und EPD: Bei Signalraten unter 30 MHz kann jeder GPIO-Pin für das entsprechende LCDC-Signal konfiguriert werden. Oberhalb von 30 MHz müssen LCDC-Signale über die Matrix den Pins `PA22` bis `PA50` zugeordnet werden; `PA52` bis `PA54` dürfen nur `B1` bis `B6` führen. Konfigurieren Sie die GPIO-Treiberstärke in allen Fällen als `DS1 = 0, DS0 = 1`.

<div align="center"><em>Tabelle 5.5-11: Touch- und Hintergrundbeleuchtungs-Signalverbindungen</em></div>

<div align="center" markdown>

| CTP-Panel-Signal | 57x-Signal | Beschreibung |
|:--------------------|:------------|:-------------|
| Interrupt | Beliebiger GPIO | Touch-Statusinterrupt-Signal (weckfähig). |
| `I2C1_SCL` | Beliebiger GPIO | Touchscreen-I2C-Taktsignal. |
| `I2C1_SDA` | Beliebiger GPIO | Touchscreen-I2C-Datensignal. |
| `BL_PWM` | Beliebiger GPIO | Hintergrundbeleuchtungs-PWM-Steuersignal. |
| Reset | Beliebiger GPIO | Reset-Signal. |

</div>

#### 5.5.3. Richtlinien für Display und Touch { #553-display-and-touch-guidelines }

- Schalten Sie Display und Hintergrundbeleuchtung unabhängig voneinander. Lassen Sie beide beim Einschalten standardmäßig ausgeschaltet, sofern das Produkt nichts anderes verlangt.
- Reservieren Sie für schnelle Display-Takte einen Serienwiderstand und optional einen unbestückten Footprint für einen Shunt-Kondensator zur EMI-Abstimmung.
- Halten Sie FPC, Display-Steckverbinder und Touch-Leitungen vom RF-Antennenbereich fern.
- Verbinden Sie Touch-INT mit einem weckfähigen GPIO, wenn das System per Touch geweckt werden soll.
- Stimmen Sie die I/O-Spannungsdomänen von Display, Touch-IC und MCU aufeinander ab.
- Ergänzen Sie ESD-Schutz für Display- und Touch-Schnittstellen, wenn diese der Außenwelt ausgesetzt sind.
- Bevorzugen Sie dedizierte Pin-Gruppen für SPI/QSPI-Display-Signale. Wählen Sie für RGB, 8080, EPD und andere schnelle parallele Schnittstellen Pin-Gruppen, die für Hochgeschwindigkeitsausgabe geeignet sind, und erhalten Sie die zeitliche Abstimmung im Layout.
- Begrenzen Sie bei Matrix-Routing für SPI/QSPI den Takt auf höchstens 50 MHz und konfigurieren Sie die GPIO-Treiberstärke als `DS1 = 0, DS0 = 1`.
- Bevorzugen Sie für RGB-, MCU8080- und EPD-Signale über 30 MHz Matrix-Routing auf `PA22` bis `PA50`; `PA52` bis `PA54` dürfen nur `B1` bis `B6` führen.

#### 5.5.4. Display-Inbetriebnahme { #554-display-bring-up-sequence }

Nehmen Sie das Display schrittweise in Betrieb, damit nicht zu viele Variablen gleichzeitig geändert werden:

1. Verifizieren Sie Display-Versorgung, Reset, Hintergrundbeleuchtung/Enable und das Auslesen der Panel-ID.
2. Zeigen Sie Volltonfarben bei der niedrigsten stabilen Schnittstellengeschwindigkeit an. Bestätigen Sie RGB-Reihenfolge, Farbtiefe und Scanrichtung.
3. Verifizieren Sie Teil-Refresh-Fenster, TE-Signal, Frame-Synchronisation oder das Verhalten im Kommando-/Videomodus.
4. Erhöhen Sie schrittweise die Schnittstellengeschwindigkeit. Ergänzen Sie anschließend LVGL, ePicasso, DMA und die Dimmung der Hintergrundbeleuchtung.
5. Validieren Sie abschließend Ruhezustand, Wecken, Bildschirm aus/ein, Anschließen/Entfernen des Ladegeräts und den Betrieb bei aktiver Bluetooth-Verbindung.

Prüfen Sie bei Bildrauschen, Tearing, falschen Farben oder unregelmäßigen Refresh-Fehlern zuerst Panel-Initialisierung, Schnittstellen-Timing, Pixelformat, Refresh-Fenster, Cache-Kohärenz und FPC-Signalintegrität.

#### 5.5.5. Audio { #555-audio }

Behandeln Sie Audio als rauschempfindliches Subsystem. Prüfen Sie Mikrofon-Bias, Audio-Referenzen, Analogeingänge, DAC-Ausgänge, digitale Audio-Takte, externe PA-Steuerung und Gehäuseakustik gemeinsam.

SF32LB57x bietet zwei analoge ADC-Eingänge, die jeweils unsymmetrisch oder differentiell betrieben werden können, einen differentiellen analogen DAC-Ausgang, der zum Ansteuern eines Lautsprechers oder Kopfhörers eine externe PA benötigt, sowie zwei PDM-Schnittstellen für insgesamt bis zu vier digitale Mikrofone.

#### 5.5.6. Analoger Audioeingang { #556-analog-audio-input }

Richtlinien:

- Platzieren Sie die Entkopplungskondensatoren für MIC_BIAS, AUD_VREF und AVDD33_AUD nahe am Chip.
- Fügen Sie am analogen Mikrofoneingang einen DC-Sperrkondensator ein; empfohlen werden mindestens 2,2 µF.
- Platzieren Sie analoge Eingangsbauteile nahe an den Chip-Pins.
- Halten Sie ADCP- und andere Analogleitungen kurz, abgeschirmt und störungsarm.
- Konfigurieren Sie ein als Analogeingang genutzter gemultiplexter GPIO bei Bedarf hochohmig.

<div align="center"><em>Tabelle 5.5-12: Audio-Signalverbindungen</em></div>

<div align="center" markdown>

| Audio-Signal | 57x-Signal / Pin | Hinweise |
|:-------------|:-----------------|:------|
| `MIC_BIAS` | `PA56` | Mikrofon-Bias-Versorgung. |
| `ADC1P` | `PA55` | Unsymmetrischer Mikrofoneingang oder positiver Differenzeingang. |
| `ADC1N` | `PA09` | Differenzieller negativer Eingang. |
| `ADC2P` | `PA10` | Unsymmetrischer Mikrofoneingang oder positiver Differenzeingang. |
| `ADC2N` | `PA11` | Differenzieller negativer Eingang. |
| `PDM1_CLK` / `PDM1_DATA` | Beliebiger GPIO über Matrix-Routing | Takt und Daten der PDM-Schnittstelle 1. |
| `PDM2_CLK` / `PDM2_DATA` | Beliebiger GPIO über Matrix-Routing | Takt und Daten der PDM-Schnittstelle 2. |
| `DAC1P` | `DACP` | Positive Seite des differentiellen analogen Audioausgangs. |
| `DAC1N` | `DACN` | Negative Seite des differentiellen analogen Audioausgangs. |

</div>

![Abbildung 5.5-1: Referenzschaltung für einen unsymmetrischen analogen Mikrofoneingang](../../sf32-products/chips/assets/57x/SF32LB57x-Analog-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-1: Referenzschaltung für einen unsymmetrischen analogen Mikrofoneingang</em></div>

Die Referenzschaltung zeigt für jedes Mikrofon einen Bias-Pfad über einen 1-kΩ-Widerstand, eine Entkopplung der Bias-Versorgung mit 4,7 µF, einen 2,2-µF-Serienkondensator am Eingang sowie einen 10-nF-Kondensator vom ADC-Eingang nach Masse. Dies sind Werte aus der dargestellten Referenzschaltung; prüfen Sie sie für das gewählte Mikrofon und die konkrete Analogeingangsschaltung.

![Abbildung 5.5-2: Referenzschaltung für PDM-Digitalmikrofoneingang](../../sf32-products/chips/assets/57x/SF32LB57x-PDM-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-2: Referenzschaltung für PDM-Digitalmikrofoneingang</em></div>

Die Referenzzeichnung verbindet zwei Mikrofone mit jeder PDM-Schnittstelle; sie teilen sich jeweils deren Takt- und Datenleitungen. Die `SELECT`-Pins der Mikrofone sind für den linken und rechten Kanal unterschiedlich beschaltet. Jedes Mikrofon hat einen lokalen 100-nF-Abblockkondensator an der Versorgung. In der Zeichnung heißen die Datennetze `PDM1_DAT` und `PDM2_DAT`, in der Signaltabelle dagegen `PDM1_DATA` und `PDM2_DATA`; prüfen Sie die exakten Pin- und Matrixnamen für das gewählte Gerät.

#### 5.5.7. Analoger Audioausgang { #557-analog-audio-output }

Richtlinien:

- Routen Sie DACP/DACN als Differenzpaar.
- Halten Sie das Paar kurz und längenangepasst und führen Sie es fern von RF, DC/DC, USB, SDIO und Display-Takten.
- Platzieren Sie Ausgangs-RC-Anpassnetzwerke nahe am Chip.
- Halten Sie die parasitäre Kapazität innerhalb der für den Audioausgang geltenden Grenzwerte.
- Halten Sie Audio-Versorgungs- und Referenzpfade sauber und kurz.

Verwenden Sie die empfohlene Schaltung aus Abbildung 5.5-3. Der Differenz-Tiefpassfilter innerhalb des gestrichelten Kastens muss nahe an den Chip-Pins platziert werden, um Hochfrequenzstörungen zu unterdrücken und das Signal-Rausch-Verhältnis des Audioausgangs zu verbessern.

![Abbildung 5.5-3: Referenzschaltung für analogen Audio-PA-Ausgang](../../sf32-products/chips/assets/57x/SF32LB57x-DAC-PA.png){ width="80%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-3: Referenzschaltung für analogen Audio-PA-Ausgang</em></div>

Die dargestellte NS4150B-Stufe wird mit +5 V versorgt und verwendet 100-nF-DAC-Koppelkondensatoren, 43,2-kΩ-Eingangswiderstände sowie PA51 zur Verstärkerfreigabe mit einem 5,1-MΩ-Pulldown. In der Zeichnung sind 3 mA Ruhestrom des Verstärkers, 0,1 µA im Shutdown und 0,6 µA durch den Pulldown angegeben. Diese Werte gelten für die Beispielschaltung und sind keine allgemeinen PA-Spezifikationen; prüfen Sie sie für den gewählten Verstärker und die Systemanforderungen.

#### 5.5.8. Digitales Audio { #558-digital-audio }

Für I2S und PDM:

- Stimmen Sie die I/O-Spannung der Peripherie ab.
- Prüfen Sie Taktleitungslänge, Übersprechen und Durchgängigkeit der Referenzmasse.
- Prüfen Sie die Einschaltsequenz für Mikrofone, Codec, PA und MCU.
- Stellen Sie sicher, dass digitale Audio-Peripheriegeräte im Schlafmodus einen sicheren Zustand einnehmen.

#### 5.5.9. Audio-Validierung { #559-audio-validation }

Audioprobleme betreffen oft gleichzeitig Hardware, Gehäuse, Software-Verstärkung und Versorgungsrauschen. Validieren Sie daher:

- Leerlaufrauschen, Aufnahmerauschen, Wiedergaberauschen und Rauschen beim Laden.
- Übersprechen, während das Display aktualisiert, Bluetooth sendet, der Motor vibriert, USB angeschlossen ist und SDIO aktiv ist.
- Mikrofon-Bias-Spannung, Polarität/Kapazität des DC-Sperrkondensators und Gleichtaktbereich des Eingangs.
- Differenzieller Ausgangspegel von DACP/DACN, Lastanpassung und Eingangsbereich der externen PA.
- PDM-/I2S-Taktfrequenz, Kanalzuordnung und Abtastratenkonfiguration.

#### 5.5.10. Kamera { #5510-camera }

Die Kameraschnittstelle unterstützt DVP mit bis zu 16 Bit, SPI mit 2 Datenleitungen und QSPI mit 4 Datenleitungen.

Richtlinien:

- Bestätigen Sie Schnittstellenbreite, Takt, Sync-Signale, Datenleitungen und Pinmux.
- Stellen Sie sicher, dass Kameraversorgung, Reset, PWDN und Takt von der MCU gesteuert werden können.
- Führen Sie Kamera-Daten- und Taktleitungen als längenabgestimmte Gruppe und halten Sie sie von RF- und Analogsignalen fern.
- Sorgen Sie beim Hochgeschwindigkeits-Routing der Kamera für eine durchgehende Referenzmasse.
- Ergänzen Sie bei Bedarf ESD-Schutz am Kamerastecker oder FPC.

Empfohlener Ablauf zur Inbetriebnahme der Kamera:

- Bestätigen Sie zuerst Kameraversorgung, Reset, PWDN, MCLK und den I2C-/SPI-Steuerpfad.
- Lesen Sie die Sensor-ID aus und verifizieren Sie Initialisierungstabelle sowie Ausgabeformat.
- Validieren Sie PCLK, VSYNC, HSYNC/HREF und die Zuordnung der Datenleitungen zunächst bei niedriger Auflösung und Bildrate.
- Erhöhen Sie Auflösung und Bildrate erst, wenn der Grundpfad stabil ist. Testen Sie anschließend gemeinsam mit Display-Refresh, Speicherschreibvorgängen und Bluetooth-Verbindung.

<div align="center"><em>Tabelle 5.5-13: Kamera-Signalverbindungen nach Beispielsensor</em></div>

<div align="center" markdown>

| GC032A SPI4 | GC032A DVP8 | GC2145 DVP8 | OV2640 DVP10 | 57x-Signal | Beschreibung |
|:------------|:------------|:------------|:--------------|:-----------|:------------|
| `SBDA` | `SBDA` | `SIO-D` | `SIO-D` | Beliebiger GPIO | I2C-Datensignal. |
| `SBCL` | `SBCL` | `SIO-C` | `SIO-C` | Beliebiger GPIO | I2C-Taktsignal. |
| `RESET` | `RESET` | `RESET` | `RESET` | Beliebiger GPIO | Reset-Ausgangssignal. |
| NC | `VSYNC` | `VSYNC` | `VSYNC` | `DCMI_VSYNC` | Vertikal-Sync-Eingangssignal. |
| `PWDN` | `PWDN` | `PWDN` | `PWDN` | Beliebiger GPIO | Power-Down-Ausgangssignal (high-aktiv). |
| NC | `HSYNC` | `HREF` | `HREF` | `DCMI_HSYNC` | Horizontal-Sync-Eingangssignal. |
| NC | `D7` | `D7` | `Y9` | `DCMI_DI7` | Eingang von Bit [7] des YUV/RGB-Videoports. |
| `MCLK` | `MCLK` | `MCLK` | `MCLK` | Beliebiger GPIO (GPTIM) | Systemtakt-Ausgang. |
| NC | `D6` | `D6` | `Y8` | `DCMI_DI6` | Eingang von Bit [6] des YUV/RGB-Videoports. |
| NC | `D5` | `D5` | `Y7` | `DCMI_DI5` | Eingang von Bit [5] des YUV/RGB-Videoports. |
| `SCK` | `PCLK`/`SCK` | `PCLK` | `PCLK` | `DCMI_CLK` | Pixeltakt-Eingang. |
| NC | `D4` | `D4` | `Y6` | `DCMI_DI4` | Eingang von Bit [4] des YUV/RGB-Videoports. |
| `SD0` | `D0` | `D0` | `Y2` | `DCMI_DI0` | Eingang von Bit [0] des YUV/RGB-Videoports. |
| `SD3` | `D3` | `D3` | `Y5` | `DCMI_DI3` | Eingang von Bit [3] des YUV/RGB-Videoports. |
| `SD1` | `D1` | `D1` | `Y3` | `DCMI_DI1` | Eingang von Bit [1] des YUV/RGB-Videoports. |
| `SD2` | `D2` | `D2` | `Y4` | `DCMI_DI2` | Eingang von Bit [2] des YUV/RGB-Videoports. |
| NC | NC | NC | `Y1` | NC | Bei diesem Sensor nicht angeschlossen. |
| NC | NC | NC | `Y0` | NC | Bei diesem Sensor nicht angeschlossen. |

</div>

Verwenden Sie bei 10-Bit-DVP-Kameras und knappen GPIO-Ressourcen die 8-Bit-Verdrahtung. Schließen Sie alle Datenbits nur an, wenn das Design genügend GPIO-Reserven bietet.

#### 5.5.11. Tasten und Motor { #5511-buttons-and-motor }

- Die Ein-/Aus- und Reset-Taste muss `PA34` verwenden und high-aktiv sein; der Pin wird standardmäßig auf Low gezogen und geht beim Drücken auf High. `PA34` unterstützt einen Hardware-Reset bei 10 Sekunden langem Tastendruck, und der 10-kΩ-Pull-down-Widerstand muss auf der Hauptplatine platziert werden.
- Bei GPADC-Tastendesigns mit Spannungsteiler werden Tasten anhand der Teilerspannung unterschieden. Platzieren Sie nahe am Pin einen 0,1-µF-Filterkondensator gegen Masse, um die Abtastgenauigkeit zu verbessern.
- Die dargestellte Widerstandsleiter verwendet 1,1 kΩ, 2,8 kΩ und 5,1 kΩ für die Tasten sowie einen 10-kΩ-Pulldown und einen 100-nF-Filterkondensator. Verwenden Sie diese Werte als Referenz und prüfen Sie die ADC-Schwellen für Versorgung und Widerstandstoleranzen des konkreten Designs.
- Ergänzen Sie ESD-Schutz für externe Tasten.

![Abbildung 5.5-4: Referenzschaltung für Power-Taste und GPADC-Taste](../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png){ width="80%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-4: Referenzschaltung für Power-Taste und GPADC-Taste</em></div>

Verwenden Sie für haptisches Feedback die SF32LB57x-Referenzschaltung für den Vibrationsmotor. In stromsparenden Produkten sollte sich die Motorversorgung abschalten lassen; der PWM-/Steuerpin sollte nicht mit Anforderungen an Boot, Display, Speicher oder Debugging kollidieren.
