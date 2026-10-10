---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplanrichtlinien für RF und Benutzerschnittstellen der SF32LB52x-MCU: Antennenanpassung, Display, Audio, Tasten und Vibrationsmotor."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware-Design-Leitfaden — RF & Benutzerschnittstellen { #sf32lb52x-hardware-design-guide-rf-user-interfaces }

!!! note "Teil des SF32LB52x Hardware-Design-Leitfadens"
    Diese Seite behandelt die Abschnitte 5.4-5.5 der Schaltplanrichtlinien: RF und Benutzerschnittstellen. Die vorherige Seite behandelt [Minimalsystem, Stromversorgung & Takt](SF32LB52x_schematic_design.md), die folgende [Speicher & Fertigung](SF32LB52x_schematic_storage_mfg.md). Für die Prüfung einzelner Punkte verwenden Sie die [Schaltplan-Checkliste](SF32LB52x_schematic_checklist.md).

### 5.4. RF { #54-rf }

#### 5.4.1. RF-Schaltplan und Antennenpfad { #541-rf-schematic-and-antenna-path }

**Kurzübersicht**

- Verlegen Sie den Antennenpfad als Leiterbahn mit kontrolliertem 50-Ω-Wellenwiderstand.
- Reservieren Sie ein π-Anpassnetzwerk, auch wenn die gewählte Antenne bereits angepasst ist.
- Halten Sie den RF-Pfad kurz und abgeschirmt, mit Abstand zu Störquellen wie Quarz-, DC/DC-, Display- und Ladeschaltungen.

**Design-Ziel**

Maximieren Sie die Bluetooth-Empfangsempfindlichkeit und das Abstrahlverhalten der Antenne, indem Sie die Impedanz kontrollieren, Diskontinuitäten minimieren und genügend Spielraum für die abschließende Antennenabstimmung lassen.

Der Wellenwiderstand der RF-Leiterbahn beträgt 50 Ω. Ist die Antenne bereits angepasst, sind keine zusätzlichen RF-Bauteile erforderlich, ein reserviertes π-Anpassnetzwerk wird jedoch weiterhin für die Filterung von Nebenaussendungen oder die Antennenabstimmung empfohlen.

![Abbildung 5.4-1: RF-Schaltungsdiagramm](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.4-1: RF-Schaltungsdiagramm</em></div>

Abbildung 5.4-1 zeigt einen Serienkondensator mit 15 pF und 50 V (C0323); die beiden Positionen nach Masse, C0318 und C0319, sind mit NF (nicht bestückt) gekennzeichnet. Diese Werte gehören zum Referenzdesign und sind keine universelle Antennenanpassung. Platzieren Sie das Anpassnetzwerk nahe am chipseitigen RF-Pin und legen Sie die endgültige Bestückung anhand von Messungen am zusammengebauten Produkt fest.

#### 5.4.2. RF-Review und Abstimmung { #542-rf-review-and-tuning }

**Häufige Fehler - RF**

- Platzierung des Anpassnetzwerks in der Nähe der Antenne statt nahe am chipseitigen RF-Pin.
- Verlegung von RF durch unnötige Vias oder scharfe Biegungen.
- Gemeinsame Nutzung von störbehafteten Masse-Rückleitungspfaden mit DC/DC-, Display-, USB- oder Ladeschaltungen.
- Keine Bestückungsplätze für das Anpassnetzwerk vorsehen, sodass eine spätere Antennenabstimmung kaum möglich ist.

**Checkliste RF**

- [ ] Der Zielwert für die RF-Leiterbahnimpedanz ist mit dem PCB-Hersteller festgelegt.
- [ ] Das π-Anpassnetzwerk ist reserviert und nahe am Chip platziert.
- [ ] Masse-Via-Zaun und RF-Sperrzone sind geprüft.
- [ ] Vor Abschluss des Gehäusedesigns sind die Zugänge für die Antennenabstimmung und Zertifizierungsmessungen vorgesehen.

### 5.5. Benutzerschnittstellen { #55-user-interfaces }

#### 5.5.1. Display { #551-display }

**Kurzübersicht**

- Unterstützte Schnittstellen umfassen SPI, Dual-SPI, Quad-SPI, serielles JDI und EPD bei unterstützten Varianten mit externer geregelter Versorgung.
- Die maximal dokumentierte Displayauflösung beträgt 512 x 512.
- Reset, TE, Hintergrundbeleuchtungs-PWM, Touch-I2C, Touch-Interrupt und die Einschaltreihenfolge der Displayversorgung sollten gemeinsam geprüft werden.

**Design-Ziel**

Wählen Sie eine Display-Schnittstelle, die die Anforderungen an Bandbreite und Leistungsaufnahme erfüllt, und erhalten Sie dabei das Verhalten von Aufwecken, Reset, Hintergrundbeleuchtung und Touch im Normalbetrieb und in Low-Power-Zuständen.

Der Chip unterstützt 3-Line-SPI, 4-Line-SPI, Dual-Data-SPI, Quad-Data-SPI und serielle JDI-Schnittstellen sowie die Farbtiefen RGB888 (16,7 Mio. Farben), RGB666 (262.000 Farben), RGB565 (65.000 Farben) und RGB111 (8 Farben) bei einer maximalen Auflösung von 512 × 512.

Unterstützte LCD-Treibermodelle:

<div align="center"><em>Tabelle 5.5-1: Liste unterstützter LCD-Treiber</em></div>

<div align="center" markdown>

| Modell | Hersteller | Auflösung | Typ | Schnittstelle |
|:---|:---|:---|:---|:---|
| RM69090 | Raydium | 368x448 | AMOLED | 3/4-Line SPI, Dual-/Quad-Data SPI, MIPI-DSI |
| RM69330 | Raydium | 454x454 | AMOLED | 3/4-Line SPI, Dual-/Quad-Data SPI, 8-Bit-8080-MCU, MIPI-DSI |
| ILI8688E | ILITEK | 368x448 | AMOLED | Quad-Data SPI, MIPI-DSI |
| SH8601A | Shine World Technology | 454x454 | AMOLED | 3/4-Line SPI, Dual-/Quad-Data SPI, 8-Bit-8080-MCU, MIPI-DSI |
| SPD2012 | Solomon | 356x400 | TFT | Quad-Data SPI |
| GC9C01 | Galaxycore | 360x360 | TFT | Quad-Data SPI |
| GC9B71 | Galaxycore | 320x380 | TFT | Quad-Data SPI |
| ST77903 | Sitronix | 400x400 | TFT | Quad-Data SPI |
| ICNA3311 | Chipone | 454x454 | AMOLED | Quad-Data SPI |
| FT2308 | FocalTech | 410x494 | AMOLED | Quad-Data SPI |

</div>

!!! note "Schnittstellen des Displaytreibers sind keine MCU-Funktionsliste"
    Tabelle 5.5-1 nennt die Schnittstellen der LCD-Treiber-ICs. Daraus folgt nicht, dass SF32LB52x alle aufgeführten Schnittstellen unterstützt. Ein Eintrag mit MIPI-DSI oder einem 8-Bit-8080-MCU-Bus belegt keine entsprechende MCU-Unterstützung. Wählen Sie eine Schnittstelle, die sowohl die genaue MCU-Variante als auch der Treiber unterstützt.

##### 5.5.1.1. SPI-/QSPI-Display-Schnittstelle { #5511-spiqspi-display-interface }

<div align="center"><em>Tabelle 5.5-2: SPI-/QSPI-Signalverbindungen</em></div>

<div align="center" markdown>

| SPI-Signal | Pin | Beschreibung |
|:---|:---|:---|
| CSx | PA03 | Chip Select |
| WRx_SCL | PA04 | Takt |
| DCx | PA06 | Daten/Befehl im 4-Draht-SPI; Daten 1 im Quad-SPI |
| SDI_RDx | PA05 | Dateneingang im 3-/4-Draht-SPI; Daten 0 im Quad-SPI |
| SDO | PA05 | Datenausgang im 3-/4-Draht-SPI; mit SDI_RDx kurzgeschlossen |
| D[0] | PA07 | Daten 2 im Quad-SPI |
| D[1] | PA08 | Daten 3 im Quad-SPI |
| RESET | PA00 | Display-Reset |
| TE | PA02 | Tearing-Effect-Signal an die MCU |

</div>

##### 5.5.1.2. JDI-Display-Schnittstelle { #5512-jdi-display-interface }

!!! important "JDI-Bezeichnungen in der Quelle"
    Die ursprünglichen Anwendungshinweise nennen in der Funktionsübersicht serielles JDI, bezeichnen die folgende Pin-Tabelle jedoch als paralleles JDI. Die Pin-Zuweisungen der Quelle bleiben hier erhalten. Bestätigen Sie vor der Schaltplanfreigabe den vorgesehenen JDI-Modus, die Panelanforderungen und die Unterstützung durch die genaue MCU-Variante. Serielle und parallele Schnittstellen sind nicht als austauschbar zu betrachten.

<div align="center"><em>Tabelle 5.5-3: Parallele JDI-Signalverbindungen</em></div>

<div align="center" markdown>

| JDI-Signal | I/O | Beschreibung |
|:---|:---|:---|
| JDI_VCK | PA39 | Schiebetakt für den vertikalen Treiber |
| JDI_VST | PA08 | Startsignal für den vertikalen Treiber |
| JDI_XRST | PA40 | Reset-Signal für horizontale und vertikale Treiber |
| JDI_HCK | PA41 | Schiebetakt für den horizontalen Treiber |
| JDI_HST | PA06 | Startsignal für den horizontalen Treiber |
| JDI_ENB | PA07 | Schreibfreigabe-Signal für Pixelspeicher |
| JDI_R1 | PA05 | Rot-Bilddaten (ungerade Pixel) |
| JDI_R2 | PA42 | Rot-Bilddaten (gerade Pixel) |
| JDI_G1 | PA04 | Grün-Bilddaten (ungerade Pixel) |
| JDI_G2 | PA43 | Grün-Bilddaten (gerade Pixel) |
| JDI_B1 | PA03 | Blau-Bilddaten (ungerade Pixel) |
| JDI_B2 | PA02 | Blau-Bilddaten (gerade Pixel) |

</div>

##### 5.5.1.3. EPD-Display-Schnittstelle { #5513-epd-display-interface }

=== "52B/D/E/G/J (mit externer geregelter Versorgung)"

    Der Chip unterstützt eine 8-Bit-parallele EPD-Display-Schnittstelle:

    <div align="center"><em>Tabelle 5.5-4: EPD-Signalverbindungen</em></div>

    <div align="center" markdown>

    | EPD-Signal | I/O | Beschreibung |
    |:---|:---|:---|
    | CLK | PA04 | Takt für den Spaltentreiber (Source Driver) |
    | CKV/CPV | GPIO | Takt für den Zeilentreiber (Gate Driver) |
    | SPH | PA06 | Startimpuls für den Spaltentreiber |
    | SPV/STV | GPIO | Startimpuls für den Zeilentreiber |
    | LE | GPIO | Latch-Freigabe des Spaltentreibers |
    | OE | GPIO | Ausgangsfreigabe des Spaltentreibers |
    | D0–D7 | PA07/PA08/PA37/PA39/PA40/PA41/PA42/PA43 | Daten für den Spaltentreiber, Bits 0–7 |
    | GMODE | GPIO | Auswahl des Ausgangsmodus des Zeilentreibers |
    | VPOS/VNEG | TPS | Positive/negative Versorgungsspannung des Spaltentreibers |
    | VGH/VGL | TPS | Positive/negative Versorgungsspannung des Zeilentreibers |
    | VCOM | TPS | Gemeinsame Elektrode |
    | TPS_WAKEUP/TPS_PWRUP | GPIO | TPS-PMIC-Wake-up-/Power-up-Steuerung |
    | TPS_SDA/TPS_SCL | I2C | TPS-PMIC-I2C-Schnittstelle |
    | TPS_PWRCOM | GPIO | TPS-PMIC VCOM_CTRL, VCOM-Freigabe |
    | TPS_GOOD | GPIO | TPS-PMIC Power-Good-Ausgang |

    </div>

    !!! note
        Signale mit der Kennzeichnung „PA**“ müssen die angegebenen festen I/O-Zuweisungen verwenden. GPIO-Signale können einem beliebigen I/O zugewiesen werden. TPS-Signale werden vom Display-PMIC (TPS) an das Panel ausgegeben. I2C-Signale benötigen I/Os mit I2C-Unterstützung.

=== "SF32LB520/3/5/7 (batteriebetrieben)"

    !!! info "Nicht zutreffend"
        SiFlis offizieller Hardware-Anwendungshinweis für SF32LB520/3/5/7 enthält kein Referenzdesign für eine parallele EPD-Schnittstelle. Wenn Ihr Produkt EPD-Display-Unterstützung benötigt, konsultieren Sie die 52B/D/E/G/J-Dokumentation und bestätigen Sie die Machbarkeit für die batteriebetriebene Variante direkt mit dem SiFli-FAE-Support.

##### 5.5.1.4. Touch- und Hintergrundbeleuchtungsschnittstelle { #5514-touch-and-backlight-interface }

Der SF32LB52x unterstützt eine I2C-Schnittstelle für den Touch-Controller mit einem Eingang für dessen Statusinterrupt. Ein PWM-Signal steuert die Freigabe und Helligkeit der Hintergrundbeleuchtung.

<div align="center"><em>Tabelle 5.5-5: Touch- und Hintergrundbeleuchtungsverbindungen</em></div>

<div align="center" markdown>

| Touch-/Hintergrundbeleuchtungssignal | Pin | Beschreibung |
|:---|:---|:---|
| Interrupt | PA43 | Touch-Status-Interrupt (wake-fähig) |
| I2C1_SCL | PA42 | Touch-I2C-Takt |
| I2C1_SDA | PA41 | Touch-I2C-Daten |
| BL_PWM | PA01 | Hintergrundbeleuchtungs-PWM-Steuerung |
| Reset | PA44 | Touch-Controller-Reset |

</div>

**Häufige Fehler - Display**

- Vergessen von Reset-, TE-, Hintergrundbeleuchtungs-PWM- oder Touch-Interrupt-Pins bei der Pin-Zuweisung.
- Annahme von EPD-Unterstützung auf der batteriebetriebenen Variante, ohne das tatsächliche Gerät und Quelldesign zu bestätigen.
- Versorgung des Displays von einem internen LDO statt von einer angemessen dimensionierten externen Schiene.
- Verlegung von Display-Takten und -Daten neben Quarz-, RF-, Audio- oder hochohmigen analogen Knoten.

**Checkliste Display**

- [ ] Display-Schnittstelle, Farbtiefe, Auflösung und Bandbreite stimmen mit dem gewählten Panel überein.
- [ ] Reset, TE, Hintergrundbeleuchtungs-PWM, Touch-I2C und Touch-Interrupt sind zugewiesen und dokumentiert.
- [ ] Die Versorgung des Displays und ihre Einschaltreihenfolge sind mit Standby und dem Aufwecken vereinbar.
- [ ] Der Inbetriebnahmeplan umfasst Reset, Panel-ID/Readback (sofern verfügbar), Hintergrundbeleuchtung, Touch-Interrupt und die erste Bildausgabe.

#### 5.5.2. Audioschnittstelle { #552-audio-interface }

**Kurzübersicht**

- Der analoge Mikrofoneingang ist unsymmetrisch und benötigt einen DC-Blockkondensator.
- Der DAC-Ausgang ist differenziell und sollte als kurzes, abgeschirmtes differenzielles Paar verlegt werden.
- Die Filterung der Audio-Versorgung und die Platzierung von MIC_BIAS beeinflussen das Rauschverhalten deutlich.

**Design-Ziel**

Bewahren Sie die analoge Signalqualität, indem Sie Mikrofon-, DAC-, Bias- und Audio-Stromversorgungspfade kurz, gefiltert, abgeschirmt und isoliert von digitalen Signalen und Schaltrauschquellen halten.

Die Audioschnittstelle bietet:

1. Einen unsymmetrischen ADC-Eingang für ein analoges Mikrofon, mit einem in Serie geschalteten DC-Blockkondensator von mindestens 2,2 µF; das Mikrofon wird vom MIC_BIAS-Ausgang des Chips versorgt
2. Einen differenziellen DAC-Ausgang für eine externe Audio-PA — als differenzielles Paar mit angemessener Masseabschirmung verlegen; Leiterbahnkapazität < 10 pF und Länge < 2 cm halten

<div align="center"><em>Tabelle 5.5-6: Audio-Signalverbindungen</em></div>

<div align="center" markdown>

| Audio-Signal | Pin | Beschreibung |
|:---|:---|:---|
| BIAS | MIC_BIAS | Mikrofon-Stromversorgung |
| AU_ADC1P | ADCP | Unsymmetrischer analoger Mikrofoneingang |
| AU_DAC1P | DACP | Differenzieller analoger Ausgang, positiv |
| AU_DAC1N | DACN | Differenzieller analoger Ausgang, negativ |

</div>

![Abbildung 5.5-1: Schaltung des unsymmetrischen analogen MEMS-Mikrofoneingangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-1: Schaltung des unsymmetrischen analogen MEMS-Mikrofoneingangs</em></div>

![Abbildung 5.5-2: Schaltung des unsymmetrischen analogen ECM-Mikrofoneingangs](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-2: Schaltung des unsymmetrischen analogen ECM-Mikrofoneingangs</em></div>

Die Mikrofon-Referenzschaltungen filtern MIC_BIAS mit einem Serienwiderstand von 1 kΩ und einem Kondensator von 1 µF, 6,3 V nach Masse. Die ECM-Schaltung enthält zusätzlich einen Mikrofon-Biaswiderstand von 4,7 kΩ. Beide Beispiele zeigen einen Eingangskondensator von 0,01 µF nach Masse. Er dient als Parallelfilter und ersetzt nicht den erforderlichen DC-Blockkondensator in Serie im Signalpfad. Behalten Sie diese Unterscheidung bei, wenn Sie die Schaltungen anpassen.

![Abbildung 5.5-3: Schaltung der analogen Audio-PA](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-3: Schaltung der analogen Audio-PA</em></div>

**Häufige Fehler - Audio**

- Verlegung von Mikrofon- oder DAC-Leiterbahnen in der Nähe von Display-Takten, DC/DC, RF, USB oder SDIO.
- Platzierung der Filterkondensatoren von MIC_BIAS oder AVDD33_AUD weit entfernt von den Chip-Pins.
- Behandlung von DACP/DACN als unabhängige unsymmetrische Signale statt als differenzielles Paar.
- Zulassen hoher parasitärer Kapazität oder langer Leiterbahnlänge am analogen Ausgang.

**Checkliste Audio**

- [ ] Die Platzierung der Bauteile für MIC_BIAS, ADCP, DACP und DACN wurde anhand der Layout-Beispiele geprüft.
- [ ] DACP/DACN sind als kurzes, abgeschirmtes differenzielles Paar verlegt.
- [ ] Audio-Filterkondensatoren liegen nahe an ihren Pins und sind sauber geerdet.
- [ ] Der Inbetriebnahmeplan umfasst Mikrofon-Bias, ADC-Grundrauschen, DAC-Ausgang, PA-Freigabe und hörbares Rauschen.

!!! important "Mikrofon- und DAC-Signalpfade vervollständigen"
    Die Quelle verbindet MEMS_MIC_ADC_IN und ECM_MIC_ADC_IN jeweils mit ADCP. Fügen Sie den oben geforderten DC-Blockkondensator von mindestens 2,2 uF in Serie ein. Der in den Mikrofonschaltungen nach Masse geschaltete 0,01-uF-Kondensator ersetzt ihn nicht. Platzieren Sie den differenziellen Tiefpass im gestrichelten Rahmen von Abbildung 5.5-3 nahe der MCU. Halten Sie die Kapazität der DAC-Ausgangsleiterbahnen unter 10 pF und ihre Länge unter 2 cm.

#### 5.5.3. Tasten { #553-buttons }

**Kurzübersicht**

- `PA34` unterstützt die Ein-/Aus-Taste sowie einen Reset bei langem Tastendruck.
- Drehgeber-Tasten sollten der Referenzschaltung folgen und gemeinsam mit Wake-, Entprell- und ESD-Anforderungen geprüft werden.

**Design-Ziel**

Zuverlässige Benutzereingaben und Resets ermöglichen, ohne falsche Wake-Events, dauerhaft aktive Reset-Zustände oder hohen Standby-Leckstrom über Pull-Netzwerke.

##### 5.5.3.1. Ein-/Aus-Taste { #5531-power-button }

PA34 unterstützt einen Reset bei langem Tastendruck. Die Taste kann zugleich zum Ein- und Ausschalten dienen. Die Reset-Funktion ist high-aktiv: Der Standardzustand sollte low sein (Pull-down), und beim Drücken der Taste sollte der Pegel auf high gelegt werden.

![Abbildung 5.5-4: Schaltung der Ein-/Aus-Taste mit Reset bei langem Tastendruck](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-4: Schaltung der Ein-/Aus-Taste mit Reset bei langem Tastendruck</em></div>

Die Referenzschaltung verwendet R0703 (5,1 kΩ) zwischen VSYS_3V3 und der Taste, R0702 (100 kΩ) als Pull-down für PA34 und C0720 (0,1 µF) nach Masse. Außerdem ist ein ESD-Schutzbauteil vorgesehen. Diese Werte beschreiben das dargestellte Design. Prüfen Sie bei Anpassungen die Eingangsschwellen, Entprellung, Leckströme und Reset-Zeiten.

##### 5.5.3.2. Mechanische Drehgeber-Taste { #5532-mechanical-rotary-encoder-button }

Verwenden Sie das Referenzdesign als Grundlage für die Drehgeber-Tastenschaltung.

![Abbildung 5.5-5: Schaltung der mechanischen Drehgeber-Taste](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-5: Schaltung der mechanischen Drehgeber-Taste</em></div>

Die A- und B-Signale des Drehgebers sind über 0-Ω-Widerstände mit PA35 und PA36 verbunden. Jedes Signal besitzt einen 200-kΩ-Pull-up nach VDD33_LDO2_VOUT und ESD-Schutz; C0703 und C0706 sind mit NF (nicht bestückt) gekennzeichnet. Die Signalnamen nennen auch multiplexierte USB-/UART-Funktionen. Prüfen Sie daher mögliche Pin-Konflikte, bevor Sie diese Zuordnung übernehmen.

**Häufige Fehler - Tasten**

- `PA34` bleibt offen (floating) oder ist auf den falschen Standardpegel vorgespannt.
- Vergessen, dass Tastenschaltungen Wake-, ESD-, Entprell- und Produktionstestzugang benötigen können.
- Gemeinsame Nutzung von Tastennetzen mit störbehafteten oder stark belasteten Funktionen ohne Prüfung der Wake-Zuverlässigkeit.

**Checkliste Tasten**

- [ ] Der Standardpegel der Ein-/Aus-Taste und des Resets bei langem Tastendruck ist korrekt.
- [ ] Das Wake-Verhalten ist für die vorgesehenen Low-Power-Zustände verifiziert.
- [ ] ESD- und mechanische Entprellanforderungen sind geprüft.
- [ ] Der Inbetriebnahmeplan umfasst kurze und lange Tastendrücke sowie Wake- und Reset-Verhalten.

#### 5.5.4. Vibrationsmotor { #554-vibration-motor }

**Kurzübersicht**

- Verwenden Sie einen PWM-Ausgang, um den Vibrationsmotor über eine externe Treiberstufe anzusteuern.
- Versorgen Sie den Motor über eine schaltbare Schiene, wenn der Standby-Strom relevant ist.

**Design-Ziel**

Liefern Sie reproduzierbares haptisches Feedback und halten Sie dabei Motor-Einschaltstromstoß, Schaltrauschen und Standby-Leckstrom von empfindlichen Schienen und Wake-Schaltungen fern.

Der SF32LB52x unterstützt einen PWM-Ausgang zur Ansteuerung eines Vibrationsmotors über eine externe Treiberstufe.

![Abbildung 5.5-6: Vibrationsmotor-Treiberschaltung (Referenz SF32LB520/3/5/7; funktional äquivalent bei Varianten mit externer geregelter Versorgung)](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-6: Vibrationsmotor-Treiberschaltung (Referenz SF32LB520/3/5/7; funktional äquivalent bei Varianten mit externer geregelter Versorgung)</em></div>

![Abbildung 5.5-7: Vibrationsmotor-Treiberschaltung (Referenz 52B/D/E/G/J)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>Abbildung 5.5-7: Vibrationsmotor-Treiberschaltung (Referenz 52B/D/E/G/J)</em></div>

Beide Motorschaltungen steuern über PA20 einen Low-Side-MOSFET mit einem 1-MΩ-Pull-down am Gate. Abbildung 5.5-6 versorgt den Motor über den 3,3-V-Ausgang VDD33_VOUT2 des Chips. Abbildung 5.5-7 verwendet dagegen getrennte externe 3,3-V-LDOs für den Motor und PVDD, gespeist aus VSYS/VBAT. Die Ansteuerung ist funktional gleichwertig, die Versorgungsanschlüsse sind jedoch nicht austauschbar.

**Checkliste Motor**

- [ ] Motortreiber, Freilauf-/ESD-Schutz und Strombelastbarkeit der Versorgung sind geprüft.
- [ ] Der Standardzustand der Motorschiene ist im Standby- und Versandzustand ausgeschaltet.
- [ ] Die PWM-Pin-Zuweisung steht nicht in Konflikt mit Display-, Speicher- oder Debug-Pins.
- [ ] Der Inbetriebnahmeplan umfasst die PWM-Tastgradvariation, den Anlaufstrom, hörbare Störgeräusche und den Standby-Leckstrom.
