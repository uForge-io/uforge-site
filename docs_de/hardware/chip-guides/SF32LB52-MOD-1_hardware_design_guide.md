---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für das SF32LB52-MOD-1 Bluetooth-MCU-Modul: Anleitung zu Stromversorgung, Schnittstellen und PCB-Integration."
tags:
    - Hardware
    - Modul
---

# SF32LB52-MOD-1 Hardware-Design-Leitfaden { #sf32lb52-mod-1-hardware-design-guide }

## 1. Übersicht { #1-overview }

**SF32LB52-MOD-1** ist ein zertifiziertes, universell einsetzbares stromsparendes Bluetooth-MCU-Modul auf Basis des SF32LB525UC6-Chips von SiFli (Arm Cortex-M33 STAR-MC1 Dual-Core, bis zu 240 MHz). Es integriert einen 48-MHz-Quarz, einen optionalen 32,768-kHz-Quarz sowie einen optionalen im Gehäuse untergebrachten 64-Mb-OPI-PSRAM-Die in einem einzigen oberflächenmontierbaren Gehäuse mit 68 Pins und den Abmessungen 27,9 × 18,0 × 3,1 mm.

Dieser Leitfaden behandelt die Hardware-Integration auf Modulebene: Pin-Definitionen, Peripherieschnittstellen, elektrische Eigenschaften, Anforderungen an die Stromversorgung, Referenzschaltpläne, eine Schaltplan-Design-Checkliste, mechanische Abmessungen und PCB-Footprint sowie Anforderungen an die Produkthandhabung. Er basiert auf dem SiFli-Datenblatt **DS5203-SF32LB52-MOD-1 V0.3**.

Für die zugrunde liegende Chiparchitektur (Kerne, Grafik, Speicheruntersystem und Peripherie im Detail) siehe [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) und den [SF32LB52x Hardware-Design-Leitfaden](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Umgang mit Quelle und Abbildungen"
    Dieser Leitfaden folgt **DS5203-SF32LB52-MOD-1 V0.3** für modulspezifische technische Daten. Einige Pinbelegungs-, Schaltplan- und Mechanikzeichnungen im Datenblatt sind Rasterbilder und werden hier referenziert statt neu gezeichnet. Abbildungs- und Tabellennummern unten folgen der Nummerierung dieses Leitfadens; Bildunterschriften für nicht reproduzierte Abbildungen zitieren die entsprechende Abbildungsnummer im offiziellen Datenblatt.

## 2. Kurzübersicht des Designs { #2-quick-design-summary }

### 2.1 Modulvariante { #21-module-variant }

<div align="center"><em>Tabelle 2.1-1: Modulvariante</em></div>

<div align="center" markdown>

| Modulcode | Flash | PSRAM | Temperatur | Abmessungen (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40~85 °C | 27,9 × 18,0 × 3,1 |

</div>

### 2.2 Wichtige Spezifikationen { #22-key-specifications }

<div align="center"><em>Tabelle 2.2-1: Wichtige Spezifikationen</em></div>

<div align="center" markdown>

| Punkt | Spezifikation |
| :--- | :--- |
| Anwendungskern (HCPU) | Arm Cortex-M33 STAR-MC1, bis zu 240 MHz, 512 KB SRAM |
| Low-Power-Kern (LCPU) | Arm Cortex-M33 STAR-MC1, bis zu 24 MHz, 64 KB SRAM |
| Funk | Dual-Mode-Bluetooth 5.3 mit BLE Audio |
| Grafik | ePicasso-2.0-2D/2.5D-Engine, bis zu 512×512, eZip-2.0-verlustfreie Dekompression |
| Audio | 1x 24-Bit-Audio-DAC, 1x 24-Bit-Audio-Sigma-Delta-ADC |
| Speicher | Optionales im Gehäuse integriertes OPI-PSRAM (144 MHz); 1x externes MPI (QSPI); 1x SD/SDIO/eMMC |
| Gehäuse | 68-Pin, 27,9 × 18,0 × 3,1 mm |
| Stromversorgung | VSYS 3,2–4,7 V (Li-Ion) oder 3,7–4,7 V (DCDC/LDO, 3,8 V empfohlen) |
| Antenne | PCB-Onboard-Antenne oder extern über IPEX-Steckverbinder (je nach Teilenummer) |
| Betriebstemperatur | -40 bis 85 °C |

</div>

## 3. Funktionsblockschaltbild { #3-functional-block-diagram }

Das Modul integriert den SF32LB525UC6-Chip, einen 48-MHz-Quarz, einen optionalen 32,768-kHz-Quarz und – bei dieser Variante – einen im Gehäuse integrierten 64-Mb-OPI-PSRAM-Die, zusammen mit dem RF-Anpassnetzwerk und der Antennenzuleitung.

!!! info "Abbildung 3-1: Funktionsblockschaltbild"
    Siehe Abbildung 2-1 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

## 4. Pin-Definition { #4-pin-definition }

### 4.1 Pinbelegungsdiagramm { #41-pinout-diagram }

Das Modul führt 68 Pins entlang seines Umfangs heraus. Pin 1 ist an der Ecke nahe der Antennenzone markiert; die Pins sind gegen den Uhrzeigersinn um das Gehäuse herum nummeriert.

!!! info "Abbildung 4.1-1: Pinbelegungsdiagramm, Draufsicht"
    Siehe Abbildung 3-1 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

### 4.2 Pin-Definitionstabelle { #42-pin-definition-table }

Das Modul verfügt über insgesamt 68 Pins, die in der folgenden Tabelle beschrieben sind.

<div align="center"><em>Tabelle 4.2-1: Pin-Definitionstabelle</em></div>

<div align="center" markdown>

| Name | Nr. | Typ | Standard-MUX | Standard-I/O | Funktion |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Ground | P | Masse |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *wenn der interne 32K-Quarz des Moduls bestückt ist, steht PA23 extern nicht zur Verfügung* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *wenn der interne 32K-Quarz des Moduls bestückt ist, steht PA22 extern nicht zur Verfügung* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | 3,3-V-Versorgungsausgang |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | Ground | P | Masse |
| VSYS | 27 | P | VSYS | P | Hauptversorgungseingang. Li-Ion-Batterieversorgungsbereich 3,2–4,7 V; bei Versorgung über DCDC/LDO (nicht Li-Ion) beträgt der Bereich 3,7–4,7 V, 3,8 V empfohlen |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Differenzieller Audio-DAC-Ausgang, positiv |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Differenzieller Audio-DAC-Ausgang, negativ |
| GND | 35 | P | Ground | P | Masse |
| MIC_BIAS | 36 | P | MIC_BIAS | P | Mikrofon-Vorspannung |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | Analoger Audioeingang |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | Ground | P | Masse (13 Pins) |
| VBATS | 61 | P | VBAT | P | Batteriespannungs-Erfassungseingang |
| NC | 62 | — | NC | — | Nicht angeschlossen |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Legende: P = Versorgung; I = Eingang; O = Ausgang; T = kann als hochohmig konfiguriert werden; AO = Audioausgang; AI = Audioeingang.*

!!! note
    Pin 29 (DBG_UART_TXD) und Pin 30 (DBG_UART_RXD) bilden den Standardanschluss für Log-Ausgabe, Programmdebugging und Programm-Download.

### 4.3 Physische Pin-Beschreibung { #43-physical-pin-description }

Die Abbildung zur physischen Pin-Beschreibung im Datenblatt zeigt die Funktionsgruppen auf dem Die-Umriss des SF32LB525UC6: SDIO, SPI, I2C, UART, GPTIM, LCD-Schnittstelle, GPADC, MPI, analoges Audio, externer 32K-Oszillator, externes Wake-up und SWD/Debug-UART. Nutzen Sie die Abbildung zusammen mit der obigen Pin-Definitionstabelle, um die Signalgruppen auf der Trägerplatine anzuordnen.

!!! info "Abbildung 4.3-1: Physische Pin-Beschreibung"
    Siehe Abbildung 3-2 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

## 5. Peripherie { #5-peripherals }

### 5.1 Kommunikationsschnittstellen { #51-communication-interfaces }

Jeder in der obigen Tabelle mit `PAxx_I2C_UART` markierte Pin kann entweder als I2C oder UART konfiguriert werden. Das Datenblatt nennt als konfigurierbare Höchstzahl 4 I2C- und 3 UART-Schnittstellen.

!!! important "Widersprüchliche Angaben zur Anzahl der Peripherieschnittstellen"
    Später listet dasselbe Datenblatt I2C1–I2C7 und UART1–UART6 auf. Diese Angaben widersprechen den zuvor genannten Höchstzahlen. Klären Sie mit SiFli, wie viele Schnittstellen in der konkreten Modul-/SoC-Konfiguration tatsächlich verfügbar sind; leiten Sie aus den Controller-Nummern nicht ab, dass alle gleichzeitig nutzbar sind.

**UART** — Vollduplex, bis zu 6 Mbit/s Baudrate, konfigurierbares Datenformat, Hardware-Flusskontrolle (CTS/RTS), DMA-Mehrpaket-TX/RX. UART1–3 liegen auf HPSYS; UART4–6 liegen auf LPSYS.

**I2C** — Master- und Slave-fähig, 8-Byte-FIFO, DMA-Unterstützung, Standard- (100 kbit/s), Fast- (400 kbit/s), Fast-Mode-Plus- (1 Mbit/s) und High-Speed-Modus (3,4 Mbit/s), 7-Bit-/10-Bit-Adressierung als Master sowie ein konfigurierbarer digitaler Filter zur Unterdrückung kurzer Störimpulse. I2C1–4 liegen auf HPSYS; I2C5–7 liegen auf LPSYS.

**SPI** — Unterstützt SSP/SPI (Vollduplex, Master oder Slave) und Microwire (Halbduplex, nur Master) Formate. 4–32-Bit-Datenbreite, konfigurierbare Taktpolarität/-phase (SPO/SPH), konfigurierbare Chip-Select-Polarität, 32-Bit × 16-Einträge-FIFO, DMA-Unterstützung, bis zu 48 MHz Takt.

**USB2.0 FS** — Ein Full-Speed-Host-/Device-Port mit konfigurierbaren Endpunkten, Suspend/Resume, dynamischer FIFO-Größenanpassung, Unterstützung für Session Request und Host Negotiation Protocol sowie integriertem USB2.0-FS-PHY.

**MPI (Memory Peripheral Interface)** — Unterstützt SPI-NOR-Flash und SPI-NAND-Flash mit 1-, 2- oder 4-Leitungsbetrieb sowie den Zugriff im Register- und Memory-Mapped-Modus mit automatischer Hardware-Umschaltung. An die MPI2-Schnittstelle des Moduls kann externer SPI-NOR- oder SPI-NAND-Flash angeschlossen werden. Ist im Modul bereits Flash bestückt, sind die sechs MPI2-Signale (PA12, PA13, PA14, PA15, PA16 und PA17) extern nicht nutzbar.

**SD/SDIO/eMMC** — Konform zu SD 3.0, SDIO 3.0 und eMMC 4.5.1; unterstützt SDSC-/SDHC-/SDXC-/SDHS-Karten, SDR12/25/50, Single-Line- und 4-Line-SDR-Modi, 2-KB-FIFO, DMA-Datenbewegung, bis zu 48 MHz (kein DDR). Hinweis: Die SDIO-Schnittstelle teilt sich die IO mit MPI2 — beide können nicht gleichzeitig verwendet werden.

**I2S** — Master/Slave, Vollduplex, Left-Justified-/Right-Justified-/Standard-Formate, 8-Bit- und 16-Bit-Mono/Stereo, bis zu 24-Bit-PCM-Breite.

**LCD-Schnittstelle** — DBI-Seriell-SPI-Modus (3-Line/4-Line, Dual-/Quad-Datenleitung) und paralleler 8080-Modus (8-/16-/24-Bit-Busbreite). Unterstützt je nach Modus die Farbformate RGB332/RGB444/RGB565/RGB666/RGB888.

### 5.2 Analoge Signalverarbeitung { #52-analog-signal-processing }

**12-Bit-GPADC** — SAR-ADC, max. Abtastrate 4 MS/s, Eingangsbereich 0–3,3 V unsymmetrisch / ±2,1 V differenziell, 7 unsymmetrische Kanäle + 1 Batteriespannungskanal (oder 3 differenzielle Paare), Einzel-/Dauermessmodi, 4 konfigurierbare Zeitschlitze pro Messung, Software-/Hardware-Trigger, DMA-Unterstützung.

**Temperatursensor** — 0,2 °C Auflösung, Bereich -40 °C bis 125 °C, ±3 °C Genauigkeit, Auslesen per Polling oder Interrupt.

**Audio-DAC** — Ein 24-Bit-DAC-Ausgangspfad, Abtastraten 8 kHz–48 kHz, differenzieller Ausgang.

**Audio-PLL** — Fractional-N-Takterzeugung mit einer Auflösung von 48 MHz/2^18; unterstützt die folgenden abgeleiteten Abtastraten: 48 MHz, 32,768 kHz und 44,1 kHz.

**Audio-ADC** — Ein 24-Bit-Sigma-Delta-ADC-Eingangspfad, Abtastraten 8 kHz–48 kHz.

## 6. Elektrische Eigenschaften { #6-electrical-characteristics }

### 6.1 Absolute Grenzwerte { #61-absolute-maximum-ratings }

Das Überschreiten der Werte in der folgenden Tabelle kann das Modul dauerhaft beschädigen. Dies sind reine Belastungsgrenzwerte; ein funktionaler Betrieb außerhalb der empfohlenen Betriebsbedingungen in §6.2 wird dadurch nicht impliziert. Längere Belastung unter absoluten Grenzwertbedingungen kann die Zuverlässigkeit des Moduls verringern.

<div align="center"><em>Tabelle 6.1-1: Absolute Grenzwerte</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | Versorgungspin-Spannung | -0,3 | 4,7 | V |
| Tstore | Lagertemperatur | -40 | 125 | °C |

</div>

### 6.2 Empfohlene Betriebsbedingungen { #62-recommended-operating-conditions }

<div align="center"><em>Tabelle 6.2-1: Empfohlene Betriebsbedingungen</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Li-Ion-Batterieversorgung | 3,2 | - | 4,7 | V |
| VSYS | Nicht-Li-Ion-Versorgung über DCDC/LDO | 3,7 | 3,8 | 4,7 | V |
| TA | Betriebstemperatur | -40 | - | 85 | °C |

</div>

### 6.3 Elektrische DC-Eigenschaften (3,3 V, 25 °C) { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>Tabelle 6.3-1: Elektrische DC-Eigenschaften (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin-Kapazität | 2,5 | 3 | 3,5 | pF |
| VIH | Eingangsspannung High | 0,7×VDD | - | VDD | V |
| VIL | Eingangsspannung Low | VSS | - | 0,3×VDD | V |
| IIH | Eingangsstrom High | - | 10 | 40 | nA |
| IIL | Eingangsstrom Low | - | 10 | 40 | nA |
| VOH | Ausgangsspannung High (hochohmige Last) | 0,8×VDD | - | VDD | V |
| VOL | Ausgangsspannung Low (hochohmige Last) | VSS | - | 0,2×VDD | V |
| IOH | Ausgangstreiberstrom High | 24 | 30 | 38 | mA |
| IOL | Ausgangstreiberstrom Low | 24 | 30 | 38 | mA |
| RPU | Interner Pull-up (Vpad=0,8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Interner Pull-down (Vpad=0,2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Reset-Freigabespannung | 0,7×VDD | - | VDD | V |
| VIL_nRST | Reset-Auslösespannung | VSS | - | 0,3×VDD | V |

</div>

VDD ist die I/O-Versorgungsschiene; VOH/VOL werden unter hochohmiger Last gemessen.

### 6.4 Stromverbrauch { #64-power-consumption }

<div align="center"><em>Tabelle 6.4-1: Durchschnittlicher Bluetooth- und BLE-Strom (3,8-V-Versorgung)</em></div>

<div align="center" markdown>

| Modus | Intervall | @0dBm | @4dBm | @10dBm | Einheit |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (Versuch=1) | 50 ms | 129,5 | 135,6 | 160,9 | µA |
| BT Sniff (Versuch=1) | 1 s | 6,0 | 6,3 | 7,6 | µA |
| BLE ADV | 50 ms | 171,6 | 217,6 | 298,3 | µA |
| BLE ADV | 1 s | 8,9 | 9,5 | 17,0 | µA |
| BLE-Verbindung | 50 ms | 95,0 | 105,0 | 118,7 | µA |
| BLE-Verbindung | 1 s | 4,1 | 4,6 | 9,1 | µA |
| Scan (Inquiry oder Page) | — | 33,4 | — | — | µA |
| Beide Scans | — | 67,3 | — | — | µA |
| Sleep | — | 20,0 | — | — | µA |

</div>

<div align="center"><em>Tabelle 6.4-2: Prozessor-Stromverbrauch (3,8-V-Versorgung)</em></div>

<div align="center" markdown>

| Takt | Strom (µA) | Zuwachs (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 Dual-Mode-Bluetooth-RF-Leistung { #65-dual-mode-bluetooth-rf-performance }

Unterstützt Bluetooth 5.3 und ist abwärtskompatibel zu 4.2/4.1/4.0. Betriebskanal-Mittenfrequenz: 2402–2480 MHz.

**BLE-Sender (1 Mbit/s)**: maximale Leistung 19 dBm, Leistungsregelbereich -20 bis 19 dBm, Δf1avg = 250 kHz typ. und Δf2max = 210 kHz typ. Dies sind Frequenzabweichungen (das Datenblatt bezeichnet die Einträge als maximale/minimale Modulation), kein dimensionsloser Modulationsindex. Die typische anfängliche Trägerfrequenztoleranz beträgt ±20 kHz.

**BLE-Empfänger (1 Mbit/s)**: Empfindlichkeit -100 dBm (dirty off) / -99,3 dBm (dirty on) @30,8 % PER, Gleichkanal-C/I 7 dB.

**Classic BT (Basic Data Rate)**: max. Sendeleistung 18 dBm; Empfängerempfindlichkeit -96,3 dBm (dirty off) / -94 dBm (dirty on) @0,1 % BER.

**Classic BT (Enhanced Data Rate)**: max. Sendeleistung 13 dBm; π/4-DQPSK-Empfängerempfindlichkeit -95,5 dBm; 8DPSK-Empfängerempfindlichkeit -88,5 dBm.

Vollständige Min/Typ/Max-Tabellen für alle BLE-1-Mbit/s-/2-Mbit/s-TX/RX-Leistungswerte und die Classic-BT-BR/EDR-TX/RX-Leistung finden sich in §5.5 des offiziellen Datenblatts.

## 7. Stromversorgung des Moduls { #7-module-power-supply }

Das Modul verfügt über einen einzigen Hauptversorgungseingang, **VSYS**, der direkt von einer Li-Ion-/Li-Po-Batterie (3,2–4,7 V) oder von einem DCDC-/LDO-Regler (3,7–4,7 V, 3,8 V empfohlen) versorgt werden kann.

**VBATS** ist der Batteriespannungs-Erfassungspin, der intern von einem ADC über einen Bereich von 0–4,7 V abgetastet wird. Verwenden Sie an VBATS keinen externen Widerstandsteiler — verbinden Sie das zu messende Signal direkt mit dem Pin.

**VDD33_VOUT2** ist der Ausgang des internen 3,3-V-LDO des Moduls und kann bis zu 150 mA an externe Peripherie liefern; die Gesamtkapazität auf dieser Schiene darf 7,4 µF nicht überschreiten.

## 8. Referenzschaltplan und Pin-Zuordnung { #8-reference-schematic-and-pin-assignment }

Das Datenblatt stellt einen vollständigen Referenzschaltplan für ein Entwicklungsboard auf Basis des SF32LB52-MOD-1 bereit, der Stromversorgung, Reset, JTAG/SWD, UART, SDIO, LCD und Audioschaltungen abdeckt.

!!! info "Abbildung 8-1: Referenzschaltplan des Entwicklungsboards"
    Siehe Abbildungen 7-2–7-6 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

Das Datenblatt stellt außerdem eine empfohlene Pin-Zuordnungstabelle für dieses Referenzboard bereit.

!!! info "Abbildung 8-2: Empfohlene Pin-Zuordnung für das Referenzboard"
    Siehe Abbildung 7-7 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

Verwenden Sie diese als Ausgangspunkt für einen Produktionsschaltplan und passen Sie die Pin-Auswahl an die spezifische Peripherie-Kombination Ihres Produkts an.

## 9. Schaltplan-Design-Checkliste { #9-schematic-design-checklist }

<div align="center"><em>Tabelle 9-1: Schaltplan-Design-Checkliste</em></div>

<div align="center" markdown>

| # | Prüfpunkt |
| :-: | :--- |
| 1 | VSYS kann direkt an eine Li-Ion-Batterie angeschlossen werden; bei Versorgung über DCDC/LDO werden 3,8 V empfohlen. VBATS ist der Batteriespannungs-Erfassungspin (Bereich 0–4,7 V) — verwenden Sie keinen externen Widerstandsteiler; verbinden Sie das zu messende Signal direkt mit VBATS. |
| 2 | Platzieren Sie je einen 4,7-µF- und einen 0,1-µF-Kondensator nahe dem VSYS-Pin. |
| 3 | Platzieren Sie einen 0,1-µF-Kondensator nahe dem VBATS-Pin. |
| 4 | VDD33_VOUT2 ist der 3,3-V-LDO-Ausgang, max. Strom 150 mA — diesen Wert mit externer Last nicht überschreiten. |
| 5 | Die Gesamtkapazität an VDD33_VOUT2 muss ≤ 7,4 µF sein. |
| 6 | Der IO-Schnittstellenpegel des Moduls ist 3,3 V — jede angeschlossene Peripherie muss ebenfalls 3,3-V-Logikpegel verwenden. |
| 7 | Ist der interne 32K-Quarz des Moduls bestückt, stehen PA22 und PA23 extern nicht zur Verfügung. |
| 8 | Ist bereits Flash im Modul bestückt, stehen die 6 MPI2-Signale (PA12, PA13, PA14, PA15, PA16, PA17) extern nicht zur Verfügung. |
| 9 | Die SDIO-Schnittstelle und MPI2 teilen sich die IO und können nicht gleichzeitig verwendet werden. |
| 10 | In der Pin-Tabelle mit `#GPADC_CHx` markierte Pins unterstützen analogen Eingang im Bereich 0–3,3 V. |
| 11 | In der Pin-Tabelle mit `PAxx_TIM` markierte Pins unterstützen PWM-Ausgang. |
| 12 | PA34 unterstützt einen 10-Sekunden-Long-Press-Reset, aktiv high; sehen Sie im Design einen 10-kΩ-Pull-down-Widerstand vor. |
| 13 | ESD-Schutzbauteile für Batterie- und Touchpanel-Schnittstellen (TP) sowie bei Bedarf für weitere nach außen geführte Schnittstellen vorsehen. |
| 14 | PA18/PA19, gemultiplext als DBG_UART für Programmierung/Debug, sollten jeweils einen 100-Ω-Serienwiderstand erhalten. |

</div>

## 10. Modulabmessungen und PCB-Footprint { #10-module-dimensions-and-pcb-footprint }

### 10.1 Modulabmessungen { #101-module-dimensions }

Das Modul misst 27,9 × 18,0 × 3,1 mm.

!!! info "Abbildung 10.1-1: Modulabmessungen — Ansicht von oben, seitlich und von unten"
    Siehe Abbildung 8-1 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

### 10.2 Empfohlener PCB-Footprint { #102-recommended-pcb-footprint }

!!! info "Abbildung 10.2-1: Empfohlener PCB-Footprint"
    Siehe Abbildung 8-2 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

### 10.3 Externer Antennenanschluss { #103-external-antenna-connector }

Für SKUs mit Unterstützung einer externen Antenne verwendet das Modul einen Steckverbinder-Footprint der ersten Generation, kompatibel mit:

- Hirose-U.FL-Serie
- I-PEX-MHFI-Steckverbindern
- Amphenol-AMC-Steckverbindern

!!! info "Abbildung 10.3-1: Abmessungen des externen Antennenanschlusses"
    Siehe Abbildung 8-3 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

### 10.4 Modulplatzierung im PCB-Design { #104-module-placement-in-pcb-design }

Wenn das Endprodukt ein Design mit aufgesetztem Modul verwendet, reservieren Sie ausreichend Platz, damit keine anderen Bauteile oder Metallflächen die PCB-Antennenzone des Moduls überlappen, um eine Verschlechterung des Abstrahlwirkungsgrads zu vermeiden. Planen Sie die Position des Moduls auf dem Host-Board so, dass die Auswirkung auf die Antennenleistung minimiert wird.

Empfohlene Vorgehensweise:

- Verlängern Sie die Antennenfläche des Moduls über den Rand des Host-Boards hinaus, mit dem Speisepunkt nahe am Boardrand.

!!! info "Abbildung 10.4-1: Empfohlene Modulplatzierung"
    Siehe Abbildung 8-4 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

- Kann die Antenne nicht über den Boardrand hinausragen, sehen Sie eine Sperrzone von mindestens 15 mm um die PCB-Antenne vor — keine Kupferflächen, keine Leiterbahnen, keine Bauteile — und entfernen Sie nach Möglichkeit das Host-Board-Material unterhalb der Antenne.

!!! info "Abbildung 10.4-2: Antennen-Sperrzone"
    Siehe Abbildung 8-5 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

- Halten Sie den Antennenspeisepunkt auch im Layout mit Sperrzone nahe am Boardrand.
- Bewerten Sie für vollständige Endprodukt-Designs den Einfluss des Gehäuses auf die Antenne und führen Sie eine RF-Validierung durch, einschließlich eines abschließenden Kommunikationsreichweitentests am fertigen Produkt.

## 11. Produkthandhabung { #11-product-handling }

### 11.1 Lagerbedingungen { #111-storage-conditions }

- Lagern Sie Produkte versiegelt in einem Moisture Barrier Bag (MBB) bei <40 °C / 90 % RH, nicht kondensierend.
- Feuchteempfindlichkeitsklasse (MSL) des Moduls: 3.
- Nach dem Öffnen des Vakuumbeutels das Modul innerhalb von 168 Stunden bei 25±5 °C / 60 % RH verwenden; andernfalls ist es vor der erneuten Zuführung in die Fertigungslinie zu backen.

### 11.2 Elektrostatische Entladung (ESD) { #112-electrostatic-discharge-esd }

- Human Body Model (HBM): ±2000 V
- Charged Device Model (CDM): ±500 V

### 11.3 Reflow-Profil { #113-reflow-profile }

Für das Modul wird empfohlen, den Reflow-Prozess nur einmal zu durchlaufen.

!!! info "Abbildung 11.3-1: Empfohlenes Reflow-Temperaturprofil"
    Siehe Abbildung 9-1 im offiziellen Datenblatt für diese Abbildung — in diesem Leitfaden nicht reproduziert.

### 11.4 Ultraschallvibration { #114-ultrasonic-vibration }

Vermeiden Sie es, SiFli-Module Vibrationen durch Ultraschallschweiß- oder Ultraschallreinigungsgeräte auszusetzen. Ultraschallvibration kann mit den internen Quarzoszillatoren des Moduls in Resonanz treten, was zu Quarzausfall oder Fehlfunktion führen und das Modul funktionsunfähig machen oder seine Leistung beeinträchtigen kann.

## 12. Verwandte Dokumente { #12-related-documents }

- [DS5203-SF32LB52-MOD-1 Datenblatt (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [SF32LB52x Chip-Einführung](../../sf32-products/chips/SF32LB52x.md)
- [SF32LB52x Hardware-Design-Leitfaden](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. Versionshistorie { #13-revision-history }

<div align="center"><em>Tabelle 13-1: Versionshistorie</em></div>

<div align="center" markdown>

| Datum | Version | Hinweise |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | Abbildung 2-1 aktualisiert |
| 2025-03 | 0.2 | Beschreibungen zur Stromversorgung überarbeitet; Abbildungen 3-1 und 6-3 aktualisiert |
| 2024-12 | 0.1 | Entwurfsversion |

</div>

Dieser Leitfaden basiert auf dem oben genannten Datenblattinhalt; die maßgebliche und aktuellste Revision entnehmen Sie bitte dem offiziellen PDF.
