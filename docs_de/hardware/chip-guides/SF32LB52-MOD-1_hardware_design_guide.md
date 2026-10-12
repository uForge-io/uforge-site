---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware-Design-Leitfaden für das Bluetooth-MCU-Modul SF32LB52-MOD-1 mit Hinweisen zu Stromversorgung, Schnittstellen und PCB-Integration."
tags:
    - Hardware
    - Modul
---

# Hardware-Design-Leitfaden für SF32LB52-MOD-1 { #sf32lb52-mod-1-hardware-design-guide }

## 1. Übersicht { #1-overview }

**SF32LB52-MOD-1** ist ein zertifiziertes Universalmodul für stromsparende Bluetooth-Anwendungen. Es basiert auf dem SiFli-Chip SF32LB525UC6 mit zwei Arm-Cortex-M33-STAR-MC1-Kernen und einer Taktfrequenz von bis zu 240 MHz. Im 68-poligen SMD-Modulgehäuse (27,9 × 18,0 × 3,1 mm) sind ein 48-MHz-Quarz, optional ein 32,768-kHz-Quarz und bei dieser Variante ein 64-Mb-OPI-PSRAM-Die integriert.

Dieser Leitfaden beschreibt die Hardware-Integration auf Modulebene. Er enthält Pinbelegungen, Peripherieschnittstellen, elektrische Kenndaten, Anforderungen an die Stromversorgung, Referenzschaltpläne, eine Checkliste für den Schaltplanentwurf, mechanische Abmessungen und das empfohlene PCB-Footprint sowie Hinweise zur Handhabung. Grundlage ist das SiFli-Datenblatt **DS5203-SF32LB52-MOD-1 V0.3**.

Weitere Einzelheiten zur Chiparchitektur, zu den Kernen, zur Grafik, zum Speichersubsystem und zu den Peripherieeinheiten finden Sie unter [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) und im [SF32LB52x Hardware-Design-Leitfaden](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Quellen und Abbildungen"
    Die modulspezifischen technischen Angaben in diesem Leitfaden basieren auf **DS5203-SF32LB52-MOD-1 V0.3**. Pinbelegungs-, Schaltplan- und mechanische Zeichnungen aus dem Datenblatt liegen teilweise nur als Rasterbilder vor; deshalb verweisen wir auf sie, statt sie neu zu zeichnen. Abbildungs- und Tabellennummern folgen der Nummerierung dieses Leitfadens. Bei nicht übernommenen Abbildungen ist zusätzlich die Nummer der entsprechenden Abbildung im offiziellen Datenblatt angegeben.

## 2. Kurzübersicht des Designs { #2-quick-design-summary }

### 2.1 Modulvariante { #21-module-variant }

<div align="center"><em>Tabelle 2.1-1: Modulvariante</em></div>

<div align="center" markdown>

| Modulcode | Flash | PSRAM | Temperaturbereich | Abmessungen (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40 bis 85 °C | 27,9 × 18,0 × 3,1 |

</div>

### 2.2 Wichtige Spezifikationen { #22-key-specifications }

<div align="center"><em>Tabelle 2.2-1: Wichtige Spezifikationen</em></div>

<div align="center" markdown>

| Merkmal | Spezifikation |
| :--- | :--- |
| Anwendungskern (HCPU) | Arm Cortex-M33 STAR-MC1, bis zu 240 MHz, 512 KB SRAM |
| Low-Power-Kern (LCPU) | Arm Cortex-M33 STAR-MC1, bis zu 24 MHz, 64 KB SRAM |
| Funk | Dual-Mode-Bluetooth 5.3 mit BLE Audio |
| Grafik | ePicasso-2.0-2D/2.5D-Grafik-Engine, bis zu 512×512, verlustfreie Dekompression mit eZip 2.0 |
| Audio | 1x 24-Bit-Audio-DAC, 1x 24-Bit-Audio-Sigma-Delta-ADC |
| Speicher | Optionaler im Gehäuse integrierter OPI-PSRAM (144 MHz); 1x externes MPI (QSPI); 1x SD/SDIO/eMMC |
| Gehäuse | 68-Pin, 27,9 × 18,0 × 3,1 mm |
| Stromversorgung | VSYS 3,2–4,7 V (Li-Ion) oder 3,7–4,7 V (DCDC/LDO, 3,8 V empfohlen) |
| Antenne | Integrierte PCB-Antenne oder externe Antenne über IPEX-Steckverbinder (je nach Teilenummer) |
| Betriebstemperatur | -40 bis 85 °C |

</div>

## 3. Funktionsblockschaltbild { #3-functional-block-diagram }

Das Modul enthält den SF32LB525UC6-Chip, einen 48-MHz-Quarz und optional einen 32,768-kHz-Quarz. Bei dieser Variante ist außerdem ein 64-Mb-OPI-PSRAM-Die im Gehäuse integriert. Hinzu kommen das RF-Anpassnetzwerk und die Antennenzuleitung.

!!! info "Abbildung 3-1: Funktionsblockschaltbild"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 2-1 im offiziellen Datenblatt.

## 4. Pinbelegung { #4-pin-definition }

### 4.1 Pinbelegungsdiagramm { #41-pinout-diagram }

Das Modul hat 68 Anschlusspins an seinem Rand. Pin 1 ist an der Ecke nahe der Antennenzone markiert. Die Nummerierung verläuft gegen den Uhrzeigersinn um das Gehäuse.

!!! info "Abbildung 4.1-1: Pinbelegungsdiagramm, Draufsicht"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 3-1 im offiziellen Datenblatt.

### 4.2 Pinbelegungstabelle { #42-pin-definition-table }

Die folgende Tabelle beschreibt alle 68 Modulanschlüsse.

<div align="center"><em>Tabelle 4.2-1: Pin-Definitionstabelle</em></div>

<div align="center" markdown>

| Name | Nr. | Typ | Standard-MUX | Standard-I/O | Funktion |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Masse | P | Masse |
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
| GND | 26 | P | Masse | P | Masse |
| VSYS | 27 | P | VSYS | P | Haupteingang für die Versorgung. Li-Ion-Akku: 3,2–4,7 V; Versorgung über DCDC/LDO (kein Li-Ion-Akku): 3,7–4,7 V, empfohlen sind 3,8 V |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Differenzieller Audio-DAC-Ausgang, positiv |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Differenzieller Audio-DAC-Ausgang, negativ |
| GND | 35 | P | Masse | P | Masse |
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
| GND | 48–60 | P | Masse | P | Masse (13 Pins) |
| VBATS | 61 | P | VBAT | P | Akkuspannungs-Erfassungseingang |
| NC | 62 | — | NC | — | Nicht angeschlossen |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Legende: P = Versorgung; I = Eingang; O = Ausgang; T = hochohmig konfigurierbar; AO = Audioausgang; AI = Audioeingang.*

!!! note
    Pin 29 (DBG_UART_TXD) und Pin 30 (DBG_UART_RXD) dienen standardmäßig als Schnittstelle für Log-Ausgabe, Debugging und Programm-Download.

### 4.3 Physische Pinbelegung { #43-physical-pin-description }

Die Abbildung zur physischen Pinbelegung im Datenblatt ordnet die Funktionsgruppen auf dem Die-Umriss des SF32LB525UC6 an: SDIO, SPI, I2C, UART, GPTIM, LCD-Schnittstelle, GPADC, MPI, analoges Audio, externer 32K-Oszillator, externe Wake-up-Signale und SWD/Debug-UART. Verwenden Sie sie zusammen mit der obigen Pin-Tabelle, um die Signalgruppen auf der Trägerplatine anzuordnen.

!!! info "Abbildung 4.3-1: Physische Pinbelegung"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 3-2 im offiziellen Datenblatt.

## 5. Peripherie { #5-peripherals }

### 5.1 Kommunikationsschnittstellen { #51-communication-interfaces }

Jeder in der obigen Tabelle mit `PAxx_I2C_UART` markierte Pin lässt sich entweder als I2C- oder als UART-Pin konfigurieren. Laut Datenblatt können maximal 4 I2C- und 3 UART-Schnittstellen konfiguriert werden.

!!! important "Widersprüchliche Angaben zur Anzahl der Peripherieschnittstellen"
    An späterer Stelle führt dasselbe Datenblatt I2C1–I2C7 und UART1–UART6 auf. Das widerspricht den zuvor genannten Höchstzahlen von 4 I2C- und 3 UART-Schnittstellen. Klären Sie mit SiFli, wie viele Schnittstellen in der konkreten Modul-/SoC-Konfiguration tatsächlich verfügbar sind. Die aufgeführten Controller-Nummern belegen nicht, dass alle Schnittstellen gleichzeitig genutzt werden können.

**UART** — Vollduplex mit bis zu 6 Mbit/s, konfigurierbarem Datenformat, Hardware-Flusskontrolle (CTS/RTS) und DMA-gestütztem Mehrpaket-TX/RX. UART1–3 befinden sich auf HPSYS, UART4–6 auf LPSYS.

**I2C** — Betrieb als Master oder Slave, 8-Byte-FIFO und DMA-Unterstützung. Unterstützt werden Standard Mode (100 kbit/s), Fast Mode (400 kbit/s), Fast Mode Plus (1 Mbit/s) und High-Speed Mode (3,4 Mbit/s), 7-Bit- und 10-Bit-Adressierung im Masterbetrieb sowie ein konfigurierbarer digitaler Filter zur Unterdrückung kurzer Störimpulse. I2C1–4 befinden sich auf HPSYS, I2C5–7 auf LPSYS.

**SPI** — Unterstützt die Formate SSP/SPI (Vollduplex, Master oder Slave) und Microwire (Halbduplex, nur Master). Die Datenbreite beträgt 4 bis 32 Bit; Taktpolarität und -phase (SPO/SPH) sowie die Chip-Select-Polarität sind konfigurierbar. Das FIFO umfasst 16 Einträge zu je 32 Bit; DMA wird unterstützt. Der Takt reicht bis 48 MHz.

**USB2.0 FS** — Ein Full-Speed-Port, der als Host oder Device betrieben werden kann. Er bietet konfigurierbare Endpunkte, Suspend/Resume, eine dynamisch anpassbare FIFO-Größe sowie Unterstützung für Session Request und Host Negotiation Protocol. Der USB2.0-FS-PHY ist integriert.

**MPI (Memory Peripheral Interface)** — Unterstützt SPI-NOR- und SPI-NAND-Flash mit 1, 2 oder 4 Datenleitungen sowie Registerzugriffe und den Memory-Mapped-Modus mit automatischer Umschaltung durch die Hardware. An MPI2 des Moduls kann externer SPI-NOR- oder SPI-NAND-Flash angeschlossen werden. Ist das Modul bereits mit Flash bestückt, sind die sechs MPI2-Signale PA12, PA13, PA14, PA15, PA16 und PA17 von außen nicht zugänglich.

**SD/SDIO/eMMC** — Konform zu SD 3.0, SDIO 3.0 und eMMC 4.5.1. Unterstützt werden SDSC-/SDHC-/SDXC-/SDHS-Karten, SDR12/25/50, SDR-Modi mit einer oder vier Datenleitungen, ein 2-KB-FIFO und DMA-gestützte Datenübertragung mit bis zu 48 MHz (kein DDR). Hinweis: SDIO und MPI2 verwenden dieselben IO-Pins und können daher nicht gleichzeitig betrieben werden.

**I2S** — Betrieb als Master oder Slave, Vollduplex, Left-Justified-, Right-Justified- und Standard-Formate, Mono oder Stereo mit 8 oder 16 Bit sowie PCM-Wortbreiten bis 24 Bit.

**LCD-Schnittstelle** — Serieller DBI-SPI-Modus mit 3 oder 4 Leitungen und Dual-/Quad-Datenleitungen sowie paralleler 8080-Modus mit 8, 16 oder 24 Bit Busbreite. Je nach Modus werden die Farbformate RGB332/RGB444/RGB565/RGB666/RGB888 unterstützt.

### 5.2 Analoge Signalverarbeitung { #52-analog-signal-processing }

**12-Bit-GPADC** — SAR-ADC mit einer maximalen Abtastrate von 4 MS/s. Der Eingangsbereich beträgt 0–3,3 V bei einseitiger Messung beziehungsweise ±2,1 V bei Differenzmessung. Verfügbar sind 7 einseitige Kanäle plus 1 Akkuspannungskanal oder 3 differentielle Kanalpaare. Unterstützt werden Einzel- und Dauermessungen, 4 konfigurierbare Zeitfenster pro Messung, Software- und Hardware-Trigger sowie DMA.

**Temperatursensor** — Auflösung 0,2 °C, Messbereich -40 °C bis 125 °C und Genauigkeit ±3 °C; die Messwerte können per Polling oder Interrupt ausgelesen werden.

**Audio-DAC** — Ein 24-Bit-Ausgangspfad mit Abtastraten von 8 kHz bis 48 kHz und differenziellem Ausgang.

**Audio-PLL** — Fractional-N-Takterzeugung mit einer Auflösung von 48 MHz/2^18. Unterstützt werden daraus abgeleitete Abtastraten von 48 MHz, 32,768 kHz und 44,1 kHz.

**Audio-ADC** — Ein 24-Bit-Sigma-Delta-Eingangspfad mit Abtastraten von 8 kHz bis 48 kHz.

## 6. Elektrische Eigenschaften { #6-electrical-characteristics }

### 6.1 Absolute Maximalwerte { #61-absolute-maximum-ratings }

Das Überschreiten der Werte in der folgenden Tabelle kann das Modul dauerhaft beschädigen. Dies sind reine Belastungsgrenzwerte; ein funktionsfähiger Betrieb außerhalb der empfohlenen Betriebsbedingungen in §6.2 ist dadurch nicht zugesichert. Längere Belastung nahe den absoluten Maximalwerten kann die Zuverlässigkeit des Moduls verringern.

<div align="center"><em>Tabelle 6.1-1: Absolute Maximalwerte</em></div>

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
| VSYS | Li-Ion-Akkuversorgung | 3,2 | - | 4,7 | V |
| VSYS | Nicht-Li-Ion-Versorgung über DCDC/LDO | 3,7 | 3,8 | 4,7 | V |
| TA | Betriebstemperatur | -40 | - | 85 | °C |

</div>

### 6.3 Elektrische DC-Eigenschaften (3,3 V, 25 °C) { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>Tabelle 6.3-1: Elektrische DC-Eigenschaften (3,3 V, 25 °C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Einheit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin-Kapazität | 2,5 | 3 | 3,5 | pF |
| VIH | High-Pegel am Eingang | 0,7×VDD | - | VDD | V |
| VIL | Low-Pegel am Eingang | VSS | - | 0,3×VDD | V |
| IIH | Eingangsstrom High | - | 10 | 40 | nA |
| IIL | Eingangsstrom Low | - | 10 | 40 | nA |
| VOH | High-Pegel am Ausgang (hochohmige Last) | 0,8×VDD | - | VDD | V |
| VOL | Low-Pegel am Ausgang (hochohmige Last) | VSS | - | 0,2×VDD | V |
| IOH | Ausgangsstrom bei High-Pegel | 24 | 30 | 38 | mA |
| IOL | Ausgangsstrom bei Low-Pegel | 24 | 30 | 38 | mA |
| RPU | Interner Pull-up (Vpad=0,8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Interner Pull-down (Vpad=0,2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Freigabeschwelle für Reset | 0,7×VDD | - | VDD | V |
| VIL_nRST | Auslöseschwelle für Reset | VSS | - | 0,3×VDD | V |

</div>

VDD bezeichnet die Versorgungsschiene der I/O-Pins. VOH und VOL werden bei hochohmiger Last gemessen.

### 6.4 Stromverbrauch { #64-power-consumption }

<div align="center"><em>Tabelle 6.4-1: Durchschnittlicher Stromverbrauch bei Bluetooth und BLE (Versorgung mit 3,8 V)</em></div>

<div align="center" markdown>

| Modus | Intervall | @ 0 dBm | @ 4 dBm | @ 10 dBm | Einheit |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 129,5 | 135,6 | 160,9 | µA |
| BT Sniff (attempt=1) | 1 s | 6,0 | 6,3 | 7,6 | µA |
| BLE ADV | 50 ms | 171,6 | 217,6 | 298,3 | µA |
| BLE ADV | 1 s | 8,9 | 9,5 | 17,0 | µA |
| BLE-Verbindung | 50 ms | 95,0 | 105,0 | 118,7 | µA |
| BLE-Verbindung | 1 s | 4,1 | 4,6 | 9,1 | µA |
| Scan (Inquiry oder Page) | — | 33,4 | — | — | µA |
| Inquiry- und Page-Scan | — | 67,3 | — | — | µA |
| Sleep | — | 20,0 | — | — | µA |

</div>

<div align="center"><em>Tabelle 6.4-2: Prozessorstrom (Versorgung mit 3,8 V)</em></div>

<div align="center" markdown>

| Benchmark / Takt | Strom (µA) | Stromzunahme (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @ 192 MHz | 7360 | 35 |
| CoreMark @ 48 MHz | 1550 | 27 |
| WhileLoop @ 192 MHz | 5490 | 27 |
| WhileLoop @ 48 MHz | 1250 | 20 |

</div>

### 6.5 Dual-Mode-Bluetooth-RF-Leistung { #65-dual-mode-bluetooth-rf-performance }

Das Modul unterstützt Bluetooth 5.3 und ist abwärtskompatibel zu Bluetooth 4.2/4.1/4.0. Die Mittenfrequenzen der Betriebskanäle liegen zwischen 2402 und 2480 MHz.

**BLE-Sender (1 Mbit/s)**: maximale Sendeleistung 19 dBm, Leistungsregelbereich -20 bis 19 dBm, Δf1avg = 250 kHz (typ.) und Δf2max = 210 kHz (typ.). Dabei handelt es sich um Frequenzabweichungen. Das Datenblatt bezeichnet die Einträge als maximale beziehungsweise minimale Modulation; sie sind jedoch kein dimensionsloser Modulationsindex. Die typische anfängliche Trägerfrequenztoleranz beträgt ±20 kHz.

**BLE-Empfänger (1 Mbit/s)**: Empfindlichkeit -100 dBm (dirty off) beziehungsweise -99,3 dBm (dirty on) bei 30,8 % PER; Gleichkanal-C/I: 7 dB.

**Classic BT (Basic Data Rate)**: maximale Sendeleistung 18 dBm; Empfängerempfindlichkeit -96,3 dBm (dirty off) beziehungsweise -94 dBm (dirty on) bei 0,1 % BER.

**Classic BT (Enhanced Data Rate)**: maximale Sendeleistung 13 dBm; Empfängerempfindlichkeit -95,5 dBm bei π/4-DQPSK und -88,5 dBm bei 8DPSK.

Die vollständigen Tabellen mit Minimal-, Typ- und Maximalwerten für BLE-TX/RX bei 1 und 2 Mbit/s sowie für Classic-BT-BR/EDR-TX/RX finden Sie in Abschnitt 5.5 des offiziellen Datenblatts.

## 7. Stromversorgung des Moduls { #7-module-power-supply }

Das Modul hat einen Haupteingang für die Versorgung: **VSYS**. Er kann direkt von einem Li-Ion-/Li-Po-Akku (3,2–4,7 V) oder über einen DCDC-/LDO-Regler (3,7–4,7 V; empfohlen sind 3,8 V) versorgt werden.

**VBATS** ist der Eingang zur Erfassung der Akkuspannung. Ein interner ADC misst dort Spannungen von 0 bis 4,7 V. Verwenden Sie keinen externen Widerstandsteiler, sondern verbinden Sie das zu messende Signal direkt mit VBATS.

**VDD33_VOUT2** ist der Ausgang des integrierten 3,3-V-LDO und kann externe Peripherie mit bis zu 150 mA versorgen. Die Gesamtkapazität an dieser Versorgungsschiene darf 7,4 µF nicht überschreiten.

## 8. Referenzschaltplan und Pin-Zuordnung { #8-reference-schematic-and-pin-assignment }

Das Datenblatt enthält einen vollständigen Referenzschaltplan für ein Entwicklungsboard mit SF32LB52-MOD-1. Er umfasst die Stromversorgung, Reset, JTAG/SWD, UART, SDIO, LCD und Audioschaltungen.

!!! info "Abbildung 8-1: Referenzschaltplan des Entwicklungsboards"
    Der Schaltplan ist in diesem Leitfaden nicht enthalten. Die einzelnen Blätter finden Sie als Abbildungen 7-2 bis 7-6 im offiziellen Datenblatt.

Das Datenblatt enthält außerdem eine Tabelle mit der empfohlenen Pinbelegung dieses Referenzboards.

!!! info "Abbildung 8-2: Empfohlene Pin-Zuordnung für das Referenzboard"
    Die Tabelle ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 7-7 im offiziellen Datenblatt.

Verwenden Sie die Referenzunterlagen als Ausgangspunkt für den Schaltplan Ihres Serienprodukts und wählen Sie die Pins passend zu den tatsächlich benötigten Peripherieeinheiten.

## 9. Schaltplan-Design-Checkliste { #9-schematic-design-checklist }

<div align="center"><em>Tabelle 9-1: Schaltplan-Design-Checkliste</em></div>

<div align="center" markdown>

| Nr. | Prüfpunkt |
| :-: | :--- |
| 1 | VSYS kann direkt an einen Li-Ion-Akku angeschlossen werden. Bei Versorgung über DCDC/LDO werden 3,8 V empfohlen. VBATS erfasst die Akkuspannung im Bereich von 0 bis 4,7 V. Verwenden Sie dort keinen externen Widerstandsteiler, sondern verbinden Sie das zu messende Signal direkt mit VBATS. |
| 2 | Platzieren Sie nahe am VSYS-Pin jeweils einen Kondensator mit 4,7 µF und einen mit 0,1 µF. |
| 3 | Platzieren Sie nahe am VBATS-Pin einen Kondensator mit 0,1 µF. |
| 4 | VDD33_VOUT2 ist der 3,3-V-LDO-Ausgang und liefert maximal 150 mA. Überschreiten Sie diesen Grenzwert nicht, wenn Sie externe Lasten anschließen. |
| 5 | Die Gesamtkapazität an VDD33_VOUT2 darf 7,4 µF nicht überschreiten. |
| 6 | Die I/O-Pins des Moduls arbeiten mit 3,3-V-Logikpegeln. Auch die angeschlossenen Peripheriebausteine müssen 3,3-V-Logikpegel verwenden. |
| 7 | Ist der interne 32K-Quarz des Moduls bestückt, sind PA22 und PA23 von außen nicht verfügbar. |
| 8 | Ist Flash im Modul bestückt, sind die 6 MPI2-Signale PA12, PA13, PA14, PA15, PA16 und PA17 von außen nicht verfügbar. |
| 9 | SDIO und MPI2 verwenden dieselben I/O-Pins und können daher nicht gleichzeitig betrieben werden. |
| 10 | Die in der Pin-Tabelle mit `#GPADC_CHx` markierten Pins unterstützen analoge Eingangsspannungen von 0 bis 3,3 V. |
| 11 | Die in der Pin-Tabelle mit `PAxx_TIM` markierten Pins unterstützen PWM-Ausgabe. |
| 12 | PA34 unterstützt einen 10-Sekunden-Reset bei langem Tastendruck (High-aktiv). Sehen Sie dafür einen 10-kΩ-Pull-down-Widerstand vor. |
| 13 | Sehen Sie ESD-Schutzbauteile für die Akku- und Touchpanel-Schnittstellen (TP) sowie bei Bedarf für weitere nach außen geführte Schnittstellen vor. |
| 14 | Für PA18 und PA19, die für Programmierung und Debugging als DBG_UART gemultiplext werden, wird jeweils ein 100-Ω-Serienwiderstand empfohlen. |

</div>

## 10. Modulabmessungen und PCB-Footprint { #10-module-dimensions-and-pcb-footprint }

### 10.1 Modulabmessungen { #101-module-dimensions }

Das Modul ist 27,9 × 18,0 × 3,1 mm groß.

!!! info "Abbildung 10.1-1: Modulabmessungen — Ansicht von oben, seitlich und von unten"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 8-1 im offiziellen Datenblatt.

### 10.2 Empfohlener PCB-Footprint { #102-recommended-pcb-footprint }

!!! info "Abbildung 10.2-1: Empfohlener PCB-Footprint"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 8-2 im offiziellen Datenblatt.

### 10.3 Externer Antennenanschluss { #103-external-antenna-connector }

Bei SKUs mit externer Antenne verwendet das Modul ein Anschluss-Footprint der ersten Generation. Es ist kompatibel mit:

- Hirose-U.FL-Serie
- I-PEX-MHFI-Steckverbindern
- Amphenol-AMC-Steckverbindern

!!! info "Abbildung 10.3-1: Abmessungen des externen Antennenanschlusses"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 8-3 im offiziellen Datenblatt.

### 10.4 Modulplatzierung im PCB-Design { #104-module-placement-in-pcb-design }

Wenn Sie das Modul auf der Leiterplatte des Endprodukts einsetzen, darf dessen PCB-Antennenzone nicht von anderen Bauteilen oder Metallflächen überdeckt werden. Andernfalls kann die Abstrahleffizienz sinken. Platzieren Sie das Modul so auf der Trägerplatine, dass die Antennenleistung möglichst wenig beeinträchtigt wird.

Empfohlene Vorgehensweise:

- Lassen Sie die Antennenzone des Moduls über den Rand der Trägerplatine hinausragen und platzieren Sie den Speisepunkt nahe am Platinenrand.

!!! info "Abbildung 10.4-1: Empfohlene Modulplatzierung"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 8-4 im offiziellen Datenblatt.

- Kann die Antennenzone nicht über den Platinenrand hinausragen, halten Sie um die PCB-Antenne einen mindestens 15 mm breiten Bereich frei von Kupferflächen, Leiterbahnen und Bauteilen. Entfernen Sie nach Möglichkeit auch das Leiterplattenmaterial unter der Antenne.

!!! info "Abbildung 10.4-2: Antennen-Freihaltebereich"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 8-5 im offiziellen Datenblatt.

- Halten Sie auch bei diesem Layout den Antennenspeisepunkt nahe am Platinenrand.
- Prüfen Sie bei einem vollständigen Endprodukt den Einfluss des Gehäuses auf die Antenne. Validieren Sie die RF-Leistung und führen Sie am fertigen Produkt abschließend einen Reichweitentest durch.

## 11. Produkthandhabung { #11-product-handling }

### 11.1 Lagerbedingungen { #111-storage-conditions }

- Lagern Sie die Produkte versiegelt in einem Moisture Barrier Bag (MBB) bei <40 °C / 90 % RH und vermeiden Sie Kondensation.
- Feuchteempfindlichkeitsklasse (MSL) des Moduls: 3.
- Verarbeiten Sie das Modul nach dem Öffnen des Vakuumbeutels innerhalb von 168 Stunden bei 25±5 °C / 60 % RH. Andernfalls muss es vor der Rückführung in die Fertigung gemäß Datenblattvorgabe gebacken werden.

### 11.2 Elektrostatische Entladung (ESD) { #112-electrostatic-discharge-esd }

- Human Body Model (HBM): ±2000 V
- Charged Device Model (CDM): ±500 V

### 11.3 Reflow-Profil { #113-reflow-profile }

Das Modul sollte nur einmal einem Reflow-Prozess unterzogen werden.

!!! info "Abbildung 11.3-1: Empfohlenes Reflow-Temperaturprofil"
    Die Abbildung ist in diesem Leitfaden nicht enthalten. Sie finden sie als Abbildung 9-1 im offiziellen Datenblatt.

### 11.4 Ultraschallvibration { #114-ultrasonic-vibration }

Setzen Sie SiFli-Module keinen Vibrationen durch Ultraschallschweiß- oder Ultraschallreinigungsgeräte aus. Solche Vibrationen können die internen Quarzoszillatoren anregen und Resonanzeffekte verursachen. Dadurch können die Quarze ausfallen oder fehlerhaft arbeiten, sodass das Modul unbrauchbar wird oder seine Leistung nachlässt.

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

Dieser Leitfaden basiert auf dem genannten Datenblatt. Die maßgebliche und aktuelle Fassung finden Sie im offiziellen PDF.
