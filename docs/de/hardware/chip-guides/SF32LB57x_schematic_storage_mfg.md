---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schaltplanhinweise für Speicher, Schnittstellen und Fertigung des SF32LB57x: Boot-Medien, UART/I2C/SPI/SDIO/USB/CAN/GPADC, Produktionsprogrammierung und Testzugang."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware-Design-Leitfaden — Speicher & Fertigung { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "Teil des SF32LB57x Hardware-Design-Leitfadens"
    Diese Seite deckt die Abschnitte 5.6-5.7 der Schaltplan-Design-Richtlinien ab: Speicher und Konnektivität sowie Fertigung. Zurück zu [Takt, RF & Benutzerschnittstellen](SF32LB57x_schematic_clock_rf_interfaces.md), oder weiter zu [PCB-Layout-Richtlinien](SF32LB57x_pcb_layout.md).

### 5.6. Speicher und Konnektivität { #56-storage-and-connectivity }

#### 5.6.1. Speicher und Boot { #561-storage-and-boot }

Prüfen Sie Speicher- und Boot-Entscheidungen gemeinsam. Das gewählte Boot-Medium bestimmt die Boot-Strap-Widerstände, den standardmäßigen Versorgungszustand des Speichers, die Busbelegung und den Wiederherstellungszugang für die Fertigung.

Bestellbare Varianten mit gehäuseintegriertem SPI-NOR-Flash booten standardmäßig davon. Varianten ohne gehäuseintegrierten SPI-NOR-Flash müssen von externem Speicher booten. Das externe Boot-Medium wird über `PA13` (`Bootstrap[1]`) und `PA17` (`Bootstrap[0]`) ausgewählt. Der Quellschaltplan zeigt an jedem Pin einen Jumper und eine Position für einen 7,5-kΩ-Pull-up, verbunden mit `VDD33_VOUT1/VDDIOA`.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="Boot-Auswahljumper und Pull-ups für PA13 und PA17" /></div>
<div align="center"><em>Abbildung 5.6-1: Schaltung zur Auswahl des Boot-Mediums über PA13 und PA17</em></div>

<div align="center"><em>Tabelle 5.6-1: Auswahl des externen Boot-Mediums</em></div>

<div align="center" markdown>

| `PA13` (`Bootstrap[1]`) | `PA17` (`Bootstrap[0]`) | Externes Boot-Medium |
|:-------------------|:-------------------|:---------------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. Speicherschnittstellen { #562-storage-interfaces }

Der SF32LB57x unterstützt externen SPI-NOR-Flash, SPI-NAND-Flash, SD-NAND-Flash und eMMC. Nur MPI3 an `PA12` bis `PA17` unterstützt SPI NOR und SPI NAND; SD NAND oder eMMC können an eine der beiden SDIO-Schnittstellen angeschlossen werden. Bei manchen bestellbaren Varianten belegt gehäuseintegrierter Speicher MPI3.

Prüfen Sie vor der Freigabe des Schaltplans:

- Ob gehäuseintegrierter Flash oder PSRAM einen MPI-Kanal belegt.
- Welches externe Boot-Medium verwendet wird: SPI NOR, SPI NAND, SD NAND oder eMMC.
- Ob die I/O-Spannung zum Speicherbauteil passt.
- Ob Pull-ups, Chip-Select, Takt, Datenleitungen und Stromsteuerung die Boot-Anforderungen erfüllen.
- Ob das externe Boot-Medium beim Start den korrekten Standard-Versorgungszustand hat.

<div align="center"><em>Tabelle 5.6-2: Empfohlene MPI3-Speicherverbindungen</em></div>

<div align="center" markdown>

| Speichersignal | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. Boot- und Versorgungssteuerung { #563-boot-and-power-control }

Ein eMMC-Baustein besitzt getrennte Versorgungsdomänen `VCC` und `VCCQ`. Werden beide gemeinsam geschaltet, sinkt der Stromverbrauch beim Herunterfahren, aber das Aufwachen aus dem Schlafmodus dauert länger und die mittlere CPU-Leistungsaufnahme steigt. Wird nur `VCC` geschaltet und `VCCQ` dauerhaft versorgt, steigt der Stromverbrauch beim Herunterfahren, aber die eMMC wacht schneller auf und die mittlere CPU-Leistungsaufnahme sinkt.

<div align="center"><em>Tabelle 5.6-3: Pull-up-Anforderungen für externen MPI3-Speicher</em></div>

<div align="center" markdown>

| Externes Medium | `PA13` | `PA15` | `PA17` |
|:----------------|:-----|:-----|:-----|
| SPI NOR Flash | MPI `D1`: kein Pull-up | In der Quelle nicht angegeben | MPI `D3`: kein Pull-up |
| SPI NAND Flash | MPI `D1`: kein Pull-up | In der Quelle nicht angegeben | MPI `D3`: 7,5-kΩ-Pull-up |
| SD NAND Flash | SD `D3`: 7,5-kΩ-Pull-up | SD `CMD`: 7,5-kΩ-Pull-up | SD `D1`: kein Pull-up |
| eMMC | SD `D3`: 7,5-kΩ-Pull-up | SD `CMD`: 7,5-kΩ-Pull-up | SD `D1`: 7,5-kΩ-Pull-up |

</div>

„In der Quelle nicht angegeben“ bedeutet, dass die Quell-Checkliste für diese Zelle keine Anforderung nennt; daraus folgt nicht, dass kein Pull-up erforderlich ist.

Die Auswahl des externen Boot-Mediums ist in Tabelle 5.6-1 und Abbildung 5.6-1 dargestellt. Die Freigabe des Speicherversorgungsschalters ist fest `PA21` zugeordnet und high-aktiv. Wählen Sie die Speicherversorgung entsprechend der Stromversorgungsvariante:

- Akkubetriebene Varianten: Externer SPI-NOR-Flash kann dauerhaft von `VDD33_VOUT1` versorgt werden; SPI-NAND-Flash muss über einen Schalter hinter `VDD33_VOUT1` versorgt werden; SD-NAND-Flash und eMMC verwenden einen externen LDO, vorzugsweise mit `PA21` als Enable. Bei einer Gehäusevariante ohne `PA21` kann ein GPIO verwendet werden, dessen Standardzustand nach dem Reset Pull-up ist.
- 3,3-V-versorgte Varianten: Sämtlicher externer Boot-Speicher verwendet einen externen LDO; `PA21` ist die empfohlene LDO-Enable-Steuerung.
- SPI-NOR-Flash kann dauerhaft versorgt bleiben; SPI NAND, SD NAND und eMMC benötigen einen Versorgungsschalter. Für den Boot von externem Medium muss dessen Versorgung beim Start standardmäßig eingeschaltet sein.
- Sehen Sie Pull-up-Footprints an `PA13` und `PA17` vor und bestücken Sie sie für das gewählte Boot-Medium. Der empfohlene Wert beträgt 7,5 kΩ. Die pinspezifischen Anforderungen für MPI3 stehen in Tabelle 5.6-3.
- Belegt gehäuseintegrierter Speicher bereits MPI3, ist die externe Nutzung von MPI3 auf SD NAND oder eMMC beschränkt; schließen Sie keinen externen SPI-NOR-/SPI-NAND-Flash an diesen Kanal an.
- Passen Sie die I/O-Betriebsspannung des Speicherbausteins an die MCU-I/O-Versorgung an und wählen Sie ein Bauteil aus der Approved Vendor List (AVL) des Projekts.

#### 5.6.4. GPIO und Pin-Multiplexing { #564-gpio-and-pin-multiplexing }

Planen Sie die GPIOs, bevor Sie alle Peripheriegeräte fest zuordnen. Signale für Boot, Debugging, Wecken, USB, Analogfunktionen, Display, Speicher und Hochgeschwindigkeitsverbindungen können die flexible Zuordnung über die Matrix einschränken.

#### 5.6.5. Pin-Planung { #565-pin-planning }

SF32LB57x unterstützt flexibles Pin-Multiplexing. Legen Sie jedoch folgende Signale früh fest:

- RF-, Quarz-, Strom-, USB-, Analog-Audio-, GPADC-, Boot- und Debug-Pins.
- Hochgeschwindigkeits-Display-, SDIO-, Speicher- und DCMI-Schnittstellen, die bestimmte Pin-Gruppen erfordern.
- weckfähige GPIOs, die Boot-Konfiguration, die SWD-Umschaltung und Pins für Produktionstests.

#### 5.6.6. GPIO-Richtlinien { #566-gpio-guidelines }

- Konfigurieren Sie ungenutzte GPIOs in einem definierten Zustand.
- Stimmen Sie die I/O-Spannung der Peripherie auf die entsprechende I/O-Versorgungsdomäne ab.
- Berücksichtigen Sie Leckströme durch GPIO-Pull-ups im Schlafmodus im Energiebudget.
- Wenn Sie einen Pin als Analogeingang, USB-, Audio- oder Sonderfunktion wiederverwenden, konfigurieren Sie die digitalen Ein- und Ausgangspfade gemäß Benutzerhandbuch.
- Flexibles Matrix-Routing hebt die Hochgeschwindigkeits-Layoutrandbedingungen nicht auf. Beachten Sie die Anforderungen an Pin-Gruppen und PCB.

Jeder GPIO kann die Funktionen 0 bis 15 über die nachstehende IO-MUX-Tabelle erreichen. Die Spalte Funktion 16-255 verweist auf die Matrix-Zuordnung; die anschließende Matrix-Tabelle führt die Funktionsindizes 16 bis 175 auf. Prüfen Sie anhand beider Tabellen, welchem physischen Pin ein Peripheriesignal zugeordnet werden kann, bevor Sie den Schaltplan freigeben.

<div align="center"><em>Tabelle 5.6-4: IO-MUX-Tabelle</em></div>

<div align="center" markdown>

| PAD | PUPD | Funktion 0 | Funktion 1 | Funktion 2 | Funktion 3 | Funktion 4 | Funktion 5 | Funktion 6 | Funktion 15 | Funktion 16-255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | Matrix-Tabelle |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | Matrix-Tabelle |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | Matrix-Tabelle |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | Matrix-Tabelle |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | Matrix-Tabelle |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | Matrix-Tabelle |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | Matrix-Tabelle |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | Matrix-Tabelle |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | Matrix-Tabelle |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | Matrix-Tabelle |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | Matrix-Tabelle |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | Matrix-Tabelle |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | Matrix-Tabelle |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | Matrix-Tabelle |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | Matrix-Tabelle |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | Matrix-Tabelle |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | Matrix-Tabelle |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | Matrix-Tabelle |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | Matrix-Tabelle |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | Matrix-Tabelle |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | Matrix-Tabelle |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | Matrix-Tabelle |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | Matrix-Tabelle |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | Matrix-Tabelle |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Matrix-Tabelle |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | Matrix-Tabelle |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Matrix-Tabelle |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | Matrix-Tabelle |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | Matrix-Tabelle |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | Matrix-Tabelle |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | Matrix-Tabelle |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | Matrix-Tabelle |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | Matrix-Tabelle |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | Matrix-Tabelle |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | Matrix-Tabelle |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | Matrix-Tabelle |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | Matrix-Tabelle |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | Matrix-Tabelle |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | Matrix-Tabelle |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | Matrix-Tabelle |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | Matrix-Tabelle |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | Matrix-Tabelle |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | Matrix-Tabelle |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | Matrix-Tabelle |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | Matrix-Tabelle |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | Matrix-Tabelle |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | Matrix-Tabelle |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | Matrix-Tabelle |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | Matrix-Tabelle |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | Matrix-Tabelle |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | Matrix-Tabelle |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | Matrix-Tabelle |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | Matrix-Tabelle |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | Matrix-Tabelle |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | Matrix-Tabelle |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | Matrix-Tabelle |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | Matrix-Tabelle |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | Matrix-Tabelle |

</div>

Fett markiert die Reset-Funktion des Pins. `PUPD` ist die interne Pull-Richtung im Reset-Zustand (`PU` Pull-up, `PD` Pull-down, `-` keine). `#` markiert eine Analogfunktion.

!!! note
    - Analogfunktionen sind ausschließlich über die Funktionen 0 bis 15 in der obigen IO-MUX-Tabelle erreichbar.
    - Nur `PA11` bis `PA17` und `SB01` bis `SB09` unterstützen die MPI-Schnittstelle.
    - In Sleep, DeepSleep und Standby können nur `PA24` bis `PA27` Signale ausgeben; diese Pins können den LPTIM2-PWM-Takt bis 16 kHz ausgeben.
    - `PA18` und `PA19` sind die dedizierten Debug-Pins und unterstützen `DBG-UART` und `SWD`.
    - `PA43` und `PA44` sind die Backup-Debug-Pins und unterstützen nur `SWD`.
    - `PA00` und `PA01` konfigurieren den Geräte-Download-Modus und die Umschaltung der `SWD`-Pinposition; siehe Abschnitt 5.7.1.
    - Externe hardwareseitige Weckinterrupts sind auf die 10 GPIOs `PA33` bis `PA42` beschränkt.

<div align="center"><em>Tabelle 5.6-5: Matrix-Tabelle (Funktionsindex 16-175)</em></div>

<div align="center" markdown>

| Modul | Bitbreite | Index | Sub-Index | Funktion |
|:-------|:----------|:------|:----------|:----------|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA` (in Indexreihenfolge). |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO` (in Indexreihenfolge). |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS` (in Indexreihenfolge). |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD` (in Indexreihenfolge). |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX` (in Indexreihenfolge). |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR` (in Indexreihenfolge). |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR` (in Indexreihenfolge). |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2` (in Indexreihenfolge). |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5` (in Indexreihenfolge). |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK` (in Indexreihenfolge). |
| PTM | 16 | 105-120 | 89-104 | `PTM1_CH0` bis `PTM1_CH15` (in Indexreihenfolge). |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0` bis `LCDC_IF29` (in Indexreihenfolge). Siehe Tabelle 5.6-6 für die Sub-Zuordnung je Schnittstellenmodus. |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2` (in Indexreihenfolge). |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, `DCMI_DI0` bis `DCMI_DI15` (in Indexreihenfolge). |

</div>

Jeder GPIO-Pin kann per Matrix auf jede der obigen Funktionen zugeordnet werden (vorbehaltlich der an anderer Stelle in diesem Leitfaden genannten Routing- und Layout-Randbedingungen); die Index- und Sub-Index-Spalten enthalten die genauen Registerfeldwerte, die bei der Konfiguration des Matrix-Routers in der Firmware verwendet werden.

<div align="center"><em>Tabelle 5.6-6: LCDC-Matrix-Sub-MUX-Tabelle</em></div>

<div align="center" markdown>

| Matrix-Signal | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "IF_SEL-Werte in der LCDC-Submux-Tabelle"
    Die SiFli-Quelltabelle weist sowohl dem SPI- als auch dem JDI-Modus `IF_SEL=0` zu. Dieser Artikel übernimmt die Quellwerte, die doppelte Zuordnung ist jedoch mehrdeutig. Prüfen Sie die Einstellung vor der Panelkonfiguration anhand des passenden SDK-Treibers und Referenzdesigns; leiten Sie den Registerwert nicht allein aus dieser Tabelle ab.

#### 5.6.7. Allgemeine Schnittstellen { #567-general-interfaces }

Wenden Sie für jede allgemeine Schnittstelle dasselbe Prüfschema an: elektrische Verbindung, I/O-Spannung, Zustand nach Reset und im Schlafmodus, Versorgung der Pull-ups, ESD-Belastung sowie Konflikte mit Boot-, Debug-, Aufweck- oder Hochgeschwindigkeitsfunktionen.

`PA34` unterstützt die Ein-/Aus-Taste und einen Reset durch langes Drücken. Der Reset ist high-aktiv; bestücken Sie daher auf der Hauptplatine einen 10-kΩ-Pull-down. Beim Drücken der Taste wird der Pin High; ein langes Drücken von 10 Sekunden löst einen Hardware-Reset aus. Die GPADC-Referenzschaltung mit Widerstandsleiter verwendet Tastenwiderstände von 1,1 kΩ, 2,8 kΩ und 5,1 kΩ. Die Knotenspannungen sind mit 2,97 V/1,62 V, 2,58 V/1,41 V und 2,19 V/1,19 V beschriftet. Am `PA34`-Knoten befinden sich außerdem ein 10-kΩ-Pull-down und ein 100-nF-Kondensator gegen Masse. Bringen Sie ESD-Schutz nahe jeder zugänglichen Taste an.

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="Referenzschaltung für PA34-Ein-/Aus-Taste und GPADC-Widerstandsleiter-Taste" /></div>
<div align="center"><em>Abbildung 5.6-2: Referenzschaltung für PA34-Ein-/Aus- und GPADC-Taste</em></div>

!!! warning "Spannungsangaben der GPADC-Taste"
    Der SiFli-Schaltplan zeigt für jeden Tastenknoten zwei durch einen Schrägstrich getrennte Spannungswerte, erläutert jedoch nicht die zugehörigen Bedingungen. Prüfen Sie die Zuordnung anhand der vorgesehenen Versorgung und der Referenzschaltung, bevor Sie die Werte als Schwellwerte verwenden.

#### 5.6.8. Prüfprinzipien für Schnittstellen { #568-interface-review-principles }

Für jede Peripherieschnittstelle vier Punkte prüfen:

1. Elektrische Konnektivität, einschließlich gekreuzter Signale, Pull-up-/Pull-down-Widerstände, ESD und Terminierung.
2. Kompatibilität der I/O-Spannungsdomäne, einschließlich des Rückspeisungsrisikos bei ausgeschalteter Peripherie.
3. Sichere Zustände nach Reset und im Schlafmodus.
4. Konflikte mit Boot-, Download-, SWD-, USB- und Aufweckfunktionen sowie mit multiplexierten Hochgeschwindigkeits-Displayfunktionen.

#### 5.6.9. UART { #569-uart }

- Der SF32LB57x bietet drei Vollduplex-UARTs mit bis zu 6 Mbps und konfigurierbaren Datenformaten. Die UART-Signale können Pins der Funktionen 0 bis 15 nutzen oder per Matrix auf jeden GPIO gelegt werden.
- MCU-RXD verbindet sich mit Peripherie-TXD; MCU-TXD verbindet sich mit Peripherie-RXD.
- Stimmen Sie die I/O-Spannung der Peripherie auf die I/O-Domäne der MCU ab.
- Prüfen Sie das Reset-Verhalten von UART-Pins, die sich Pins mit USB-, Boot-, Download- oder Debug-Funktionen teilen.
- `PA18` und `PA19` sind die Standardpins der `DBG-UART`. Für häufig gesteckte und gezogene UART-Testanschlüsse empfiehlt die Quelle `PA18`, `PA19`, `PA43` oder `PA44`; diese GPIO-Gruppe ist bis 5,5 V ausgelegt. Sehen Sie bei langen Testleitungen einen 100-Ω-Serienwiderstand gegen Überschwingen vor.

#### 5.6.10. I2C { #5610-i2c }

- SDA und SCL benötigen Pull-up-Widerstände.
- Der SF32LB57x bietet vier I2C-Schnittstellen mit Host- und Gerätemodus; sie lassen sich per Matrix jedem GPIO zuordnen.
- Die Quelle empfiehlt 4,7 kΩ im Standardmodus (100 kHz), 2,2 bis 3,3 kΩ im Schnellmodus (400 kHz) und 1 bis 2,2 kΩ im Schnellmodus Plus (1 MHz). Beginnen Sie bei 400 kHz mit 2,2 kΩ und passen Sie den Wert an die Buskapazität an.
- Für einen gemeinsam genutzten I2C-Bus genügt ein Pull-up-Satz nahe am Host; nicht jedes Gerät benötigt einen eigenen Satz. Betreiben Sie Pull-ups an der Peripherieversorgung, damit sie mit dieser abgeschaltet werden und im Schlafmodus keinen Leckstrom verursachen.
- Stellen Sie sicher, dass jedes Gerät am selben Bus eine eindeutige Adresse hat.

#### 5.6.11. SPI { #5611-spi }

- Der SF32LB57x bietet zwei SPI-Schnittstellen mit Host- und Gerätemodus; sie können Pins der Funktionen 0 bis 15 oder Matrix-Routing verwenden.
- MCU-SDO verbindet sich mit Peripherie-SDI; MCU-SDI verbindet sich mit Peripherie-SDO.
- Passen Sie CLK, CS, Modus, Phase, Polarität und maximale Frequenz an das Datenblatt der Peripherie an.
- Halten Sie das Hochgeschwindigkeits-SPI-Routing kurz und mit durchgehender Referenzmasse. Fügen Sie serielle Dämpfung hinzu, wenn Signalintegritätstests dies als notwendig zeigen.
- SPI unter 30 MHz kann per Matrix-Routing auf jeden GPIO gelegt werden; oberhalb von 30 MHz sollten dedizierte Pins mit den Funktionen 0 bis 15 bevorzugt werden.
- Platzieren Sie für Hochgeschwindigkeits-SPI einen 22-Ω- bis 27-Ω-Serienwiderstand nahe am Treiber und reservieren Sie einen Shunt-Kondensator-Footprint auf der Taktleitung für die Signalintegritätsabstimmung.

#### 5.6.12. SDIO { #5612-sdio }

- Der SF32LB57x enthält zwei SD/MMC-Hostcontroller, die nur im Hostmodus arbeiten und SD-Karten, SDIO-Peripherie sowie eMMC unterstützen. Die SDIO-Signale sind auf die durch den Pin-MUX festgelegten GPIOs gebunden.
- Routen Sie SDIO-Signale als Gruppe.
- Begrenzen Sie die Gesamtlänge auf etwa 50 mm und den Gruppen-Skew auf etwa 6 mm, wo praktikabel.
- Führen Sie CLK-, CMD- und DATA-Leitungen über einer durchgehenden Referenzmasse.
- Prüfen Sie Pull-ups, Stromsteuerung und Spannungsdomänen für SDIO/eMMC/SD NAND.
- Bei 24 MHz können die internen GPIO-Pull-ups für CMD und Data0 bis Data3 ausreichen; fügen Sie bei 48 MHz und darüber externe 10-kΩ-Pull-ups auf CMD und Data0 bis Data3 hinzu.
- Fügen Sie 27-Ω- bis 33-Ω-Serienwiderstände auf SDIO-Signalen hinzu und reservieren Sie einen Shunt-Kondensator-Footprint auf der Taktleitung.
- Ziehen Sie bei einem externen TF-Kartensteckplatz den Karten-Detect-Pin `DET` über 10 kΩ an 3,3 V hoch und konfigurieren Sie den MCU-Pin als Eingang mit internem Pull-up. Sehen Sie ESD-Schutz sowohl für SDIO-Signale als auch für die Versorgung vor.

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>Tabelle 5.6-7: USB-Pin-Zuweisung</em></div>

<div align="center" markdown>

| USB-Signal | GPIO-Pin |
|:------------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- Führen Sie USB DP/DN als 90-Ω-Differenzpaar aus.
- USB DP/DM verwenden üblicherweise die gemultiplexten Funktionen `PA35` / `PA36`. Stellen Sie bei aktiviertem USB sicher, dass die externe Beschaltung während des Resets keine unzulässigen Pegel erzwingt.
- Platzieren Sie das ESD-Schutzbauteil nahe am Steckverbinder und führen Sie die Signale zuerst durch dieses Bauteil und anschließend zum Chip.
- Vermeiden Sie Stichleitungen und erhalten Sie die Paaranpassung sowie eine durchgehende Referenzmasse.
- Wenn das System im Schlafmodus durch das Anstecken von USB geweckt werden soll, verbinden Sie einen VBUS-Widerstandsteiler mit einem hardwareseitigen Weck-GPIO. Es wird empfohlen, denselben GPIO auch zur Erkennung eines angeschlossenen Ladegeräts zu verwenden.
- `PA35` ist fest als `USB_DP` und `PA36` fest als `USB_DM` zugeordnet; diese Funktionen sind nicht remappbar. USB2.0 FS unterstützt bis zu 12 Mbit/s.
- Reservieren Sie für DP/DM chipseitig 22-Ω- oder 33-Ω-Serienwiderstände sowie unbestückte Footprints für parallel geschaltete Kondensatoren zur Abstimmung der Signalintegrität.
- USB verwendet unsymmetrische 3,3-V-Signalisierung. Der Chip enthält einen Identifikationswiderstand; die Software kann einen 1,5-kΩ-Pull-up an DP oder DM aktivieren, um Full-Speed- oder Low-Speed-Geräte zu erkennen. Konfigurieren Sie bei aktiviertem USB `PA35` und `PA36` als hochohmige Eingänge, um Pin-MUX-Konflikte zu vermeiden.

#### 5.6.14. CAN { #5614-can }

- Der SF32LB57x bietet zwei CAN-2.0B-kompatible Schnittstellen, die per Matrix jedem GPIO zugeordnet werden können.
- Passen Sie Versorgung und I/O-Spannung des CAN-Transceivers an die MCU an.
- Fügen Sie Terminierung, Gleichtaktdrossel und ESD gemäß Systemanforderungen hinzu.
- Prüfen Sie für Industrie- oder Fahrzeugumgebungen Überspannungen, EFT, ESD und Massepotenzialunterschiede.

#### 5.6.15. GPADC { #5615-gpadc }

- Halten Sie die GPADC-Eingangsspannung im Nennbereich 0 V bis 3,3 V.
- Nur `PA28` bis `PA38` (11 Pins) sind über die Pinmux GPADC-fähig; weisen Sie die Funktion keinen anderen Pins zu.
- Verwenden Sie für spannungsteilerbasierte Messungen Widerstände mit 1 % Toleranz.
- Platzieren Sie an jedem GPADC-Eingang nahe am Chip-Pin einen 100-nF-(0,1-µF-)Filterkondensator.
- Halten Sie GPADC-Leitungen von DC/DC, RF, USB, SDIO, Display-Takten und Ladeschleifen fern.

<div align="center"><em>Tabelle 5.6-8: GPADC-Pin-Zuweisung</em></div>

<div align="center" markdown>

| Pin | GPADC-Funktion |
|:----|:---------------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT` / `VBATS` | `GPADC_CH11`; gehört zur Akkuspannungsdomäne und hat einen anderen Messbereich als normale GPADC-Pins. |

</div>

!!! warning "VBATS-Pinspannung und Messbereich"
    Für 3,3-V-Versorgungsvarianten nennt die Versorgungspin-Tabelle für `VBATS` 0 bis 4,7 V, während die Schaltplan-Checkliste den Akkuspannungs-Messbereich auf 0 bis 4,5 V begrenzt. Für GPADC-Messungen gilt der engere Bereich von 0 bis 4,5 V; die 4,7-V-Angabe der Pin-Tabelle ist kein gültiger ADC-Messbereich.

### 5.7. Fertigung { #57-manufacturing }

#### 5.7.1. Produktions-Boot- und Download-Modi { #571-production-boot-and-download-modes }

Halten Sie die Standard-Debug-/Download-Pins für die Produktionsvorrichtung zugänglich und reservieren Sie die Boot-Modus-Steuerungen, bevor Sie die Produkt-I/Os zuweisen. Die Quell-Checkliste verlangt lötbare Testpunkte an `PA43`/`PA44`; sie fordert außerdem einen Pull-up und einen Testpunkt an `PA00`, wobei ein Widerstand und ein Testpunkt an `PA01` optional sind.

<div align="center"><em>Tabelle 5.7-1: Testpunktanforderungen für Debug- und Boot-Steuerung</em></div>

<div align="center" markdown>

| Signal | Pin | Produktionsanforderung |
|:-------|:----|:-----------------------|
| `DBG_UART_RXD` | `PA18` | Reservieren Sie den Standard-Empfangspin der Debug-UART und sehen Sie Zugang für die Prüfvorrichtung vor. |
| `DBG_UART_TXD` | `PA19` | Reservieren Sie den Standard-Sendepin der Debug-UART und sehen Sie Zugang für die Prüfvorrichtung vor. |
| `SWD_CLK` | `PA43` | Sehen Sie einen lötbaren Testpunkt vor. |
| `SWD_DIO` | `PA44` | Sehen Sie einen lötbaren Testpunkt vor. |
| Boot-Modusauswahl | `PA00` | Sehen Sie Pull-up und Testpunkt vor. |
| SWD-Positionsauswahl | `PA01` | Widerstand und Testpunkt sind optional. |

</div>

<div align="center"><em>Tabelle 5.7-2: Boot-Modus und Download-Schnittstellen</em></div>

<div align="center" markdown>

| `PA00` / Boot-Register | `PA01` | Host-Boot-Schalter | Boot-Zweig und verfügbare Schnittstellen |
|:-----------------------|:-------|:-----------------|:------------|
| L | H | Beliebig | Normaler Boot; `PA19` gibt keine Boot-Logs aus; `PA18`/`PA19` wechseln zu SWD, und `PA43`/`PA44` SWD ist deaktiviert. |
| L | L | Aus | Normaler Boot; `PA19` gibt Boot-Logs aus; `PA18`/`PA19` sind DBG-UART, und `PA43`/`PA44` sind SWD. |
| L | L | Ein | Boot-Modus; DBG-UART-, SWD-, UART- und USB-Programmierung werden unterstützt. |
| PA00 oder Boot-Register = 1 | L | Beliebig | Boot-Modus; DBG-UART-, SWD-, UART- und USB-Programmierung werden unterstützt. |
| PA00 oder Boot-Register = 1 | H | Beliebig | Boot-Modus; `PA19` gibt keine Boot-Logs aus; SWD/USB-Programmierung wird unterstützt, und `PA18`/`PA19` wechseln zu SWD. |

</div>

!!! warning "Bezeichnung der Debug-UART-Testpunkte in der Quelle"
    Abschnitt 2.10 führt `DB_UART_RXD` zweimal auf (ohne das `G`). Die Debug-Pintabelle und die Checkliste ordnen `PA18` `DBG_UART_RXD` und `PA19` `DBG_UART_TXD` zu. Bestätigen Sie die Signalnamen vor der Freigabe mit der Prüfvorrichtung; reservieren Sie RXD nicht doppelt.

<div align="center"><em>Tabelle 5.7-3: In der Quelle aufgeführte Produktions-Testpunkte</em></div>

<div align="center" markdown>

| Quellenliste | Angegebener Geltungsbereich | Aufgeführte Testpunkte |
|:-------------|:----------------------------|:-----------------------|
| Abschnitt 2.10, Liste für Produktionsprogrammierung und Quarzkalibrierung | Nicht angegeben | `VBAT`, `PVDD`, `GND`, `AVDD33`, `PA00`, `PA01` und `DB_UART_RXD` zweimal. |
| Hardware-Checkliste 4.8, Punkt 1 | Akkuversorgte Varianten | `VBAT` oder 3,3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (bei 3,3-V-Varianten nicht vorhanden) und `PA34`. |
| Hardware-Checkliste 4.8, Punkt 3 | Alle Modelle | `VBAT` oder 3,3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` (bei der 3,3-V-Serie nicht vorhanden), `PA00`, `PA01` und `PA34`; stimmen Sie Padgröße, Abstand und Ausrichtung auf die Prüfspitzen ab. |

</div>

#### 5.7.2. Produktionsprogrammierung und Kalibrierung { #572-production-programming-and-calibration }

Die Quelle fordert einen Offline-Programmierer zum Programmieren des Flash-Speichers und zur Quarzkalibrierung. Eine RF-Kalibrierung oder Messung der Versorgungsstromaufnahme ist in diesem Abschnitt nicht angegeben. Beachten Sie beim Layout der Produktionstestpads die in der Quelle genannten Anforderungen an Größe, Abstand und Ausrichtung der Prüfspitzen. Klären Sie außerdem die unterschiedlichen Testpunktlisten in Tabelle 5.7-3 mit dem Verantwortlichen für den Prüfadapter.

Siehe [SiFli-Dokumentation zum Offline-Programmierer](https://wiki.sifli.com/tools/index.html).
