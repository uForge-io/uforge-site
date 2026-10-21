---
icon: lucide/list-checks
description: "Item-by-item schematic review checklist for the SF32LB58x MCU, covering power, clock, RF, storage, display, and manufacturing checks."
tags:
    - Hardware
    - Chip
    - Checklist
hide:
    - navigation
---

# SF32LB58x Hardware Design Guide — Schematic Checklist { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Section 5.8, the item-by-item schematic checklist. Return to [Schematic Design Guidelines](SF32LB58x_schematic_design.md).

## 5.8. Schematic Checklist { #58-schematic-checklist }

Each table below covers one schematic functional block. Use the condition stated in each item to determine when it applies. Review Required items whenever their stated conditions are met; review Optional items when the corresponding feature or design choice is used.

### 5.8.1. Package { #581-package }

<div align="center"><em>Table 5.8.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | Required |

</div>

### 5.8.2. Power Supply { #582-power-supply }

<div align="center"><em>Table 5.8.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD1 supply voltage is 1.8 V-3.3 V | Required |
| 2 | PVDD2 supply voltage is 1.8 V-3.3 V | Required |
| 3 | BUCK1_LX and BUCK1_FB connections are correct | Required |
| 4 | BUCK2_LX and BUCK2_FB connections are correct | Required |
| 5 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 6 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 7 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | Required |
| 8 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 9 | VDDIOA2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 10 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | Required |
| 11 | VDDIOSA supply voltage is 1.8 V, and a load switch is provided so it can be shut off | Required |
| 12 | VDDIOSB supply voltage is 1.8 V, and a load switch is provided so it can be shut off | Required |
| 13 | VDDIOSC supply voltage is 1.8 V and must always be powered | Required |
| 14 | AVDD33_USB supply voltage is 3.3 V | Required |
| 15 | AVDD33_ANA supply voltage is 3.3 V | Required |
| 16 | AVDD_BRF supply voltage is 1.8 V-3.3 V and must match the VDD1 supply | Required |
| 17 | AVDD33_AUD supply voltage is 3.3 V | Required |
| 18 | AVDD18_DSI supply voltage is 1.8 V | Required |
| 19 | When SF30147C supplies power, the TWI control interface must use MCU PB pins, and those pins must be PD pins | Required |
| 20 | Charging circuit requires path management so the system can be powered from the charger 5 V input when battery voltage is too low | Required |
| 21 | When SF30147C supplies power, use the chip-dedicated TWI control interface | Required |
| 22 | When SF30147C supplies power, rails controlled by EN must use PVDD or AVDD as the EN power domain; do not control EN from an MCU GPIO. Alternatively, tie EN to ground and control the corresponding rail output through registers | Required |
| 23 | When SF30147C supplies power, <span class="flag-red">BUCK and LDO1</span> can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | Required |
| 24 | 58x PVDD and VDDIOB supplies must match. If PVDD is lower than VDDIOB, for example VDDIOB = 3.3 V and PVDD = 1.8 V, VDDIOB has about 15 uA leakage in Standby and Hibernate | Required |
| 25 | On 58x, pin B4 is VDD_EXT1 and pin B5 is VDD_EXT2; they may be left unconnected in the design | Required |

</div>

!!! note "Source clarification"
    Item 19 in the workbook's Power Supply checklist says the TWI control interface must use MCU PB pins and that those pins must be "PD" pins; item 21 separately calls for the chip-dedicated TWI control interface. The workbook does not define "PD" or explain how these requirements relate. The OpenSiFli hardware application note says SF32LB58x uses two GPIOs to emulate TWI when controlling SF30147C. Confirm the intended interface and pin selection with SiFli before schematic sign-off.

### 5.8.3. Power Supply Capacitors and Inductors { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Table 5.8.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PVDD1 bulk capacitor is at least 10 uF | Required |
| 2 | PVDD2 capacitor is at least 10 uF | Required |
| 3 | BUCK1_FB capacitor = 4.7 uF | Required |
| 4 | BUCK2_FB capacitor = 4.7 uF | Required |
| 5 | LDO_VOUT1 capacitor = 4.7 uF | Required |
| 6 | VDD_RET capacitor = 0.47 uF | Required |
| 7 | VDD_RTC capacitor = 1 uF | Required |
| 8 | VDDIOA capacitor &gt;= 1 uF | Required |
| 9 | VDDIOA2 capacitor &gt;= 1 uF | Required |
| 10 | VDDIOB capacitor &gt;= 1 uF | Required |
| 11 | VDDIOSA capacitor &gt;= 1 uF | Required |
| 12 | VDDIOSB capacitor &gt;= 1 uF | Required |
| 13 | VDDIOSC capacitor &gt;= 1 uF | Required |
| 14 | AVDD33_USB capacitor &gt;= 1 uF | Required |
| 15 | AVDD33_ANA capacitor &gt;= 4.7 uF | Required |
| 16 | AVDD_BRF capacitor &gt;= 4.7 uF | Required |
| 17 | AVDD33_AUD capacitor &gt;= 4.7 uF | Required |
| 18 | AUD_VREF capacitor = 1 uF | Required |
| 19 | AVDD18_DSI capacitor &gt;= 4.7 uF | Required |
| 20 | MIC_BIAS capacitor = 1 uF | Required |
| 21 | GPADC VREFP capacitor = 4.7 uF | Required |
| 22 | <span class="flag-red">PVDD1, PVDD2, AVDD_BRF, and the RSTN pull-up supply must be the same</span> | Required |
| 23 | BUCK1 and BUCK2 inductors are SiFli-recommended part numbers | Required |
| 24 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | Required |
| 25 | <span class="flag-red">When PVDD1 and PVDD2 are powered at 1.8 V from VBAT, use a DCDC converter to generate 1.8 V; do not use an LDO</span> | Required |
| 26 | <span class="flag-red">Quiescent current of the selected DCDC is recorded and meets project requirements</span> | Required |
| 27 | <span class="flag-red">Quiescent current of the selected LDO is recorded and meets project requirements</span> | Required |

</div>

!!! note "BUCK inductor saturation-current discrepancy"
    Item 24 in the workbook's Power Supply Capacitors and Inductors checklist specifies Isat ≥ 450 mA for a non-AVL inductor. The OpenSiFli hardware application note specifies Isat ≥ 500 mA for a BUCK inductor with L = 4.7 µH and DCR ≤ 0.4 Ω. The table retains the workbook's 450 mA value; the [BUCK inductor selection guidance in Schematic Design](SF32LB58x_schematic_design.md#5114-buck-inductor-selection) uses 500 mA. Until SiFli clarifies the discrepancy, use an inductor rated for at least 500 mA Isat.

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Table 5.8.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | Required |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Table 5.8.5-1: Reset Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | RSTN is pulled up to the same supply as PVDD1 | Required |
| 2 | RSTN reserves a 0.1 uF capacitor to ground | Required |
| 3 | RSTN has ESD protection | Required |

</div>

### 5.8.6. Ground Signals { #586-ground-signals }

<div align="center"><em>Table 5.8.6-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | All AVSS_*** signals are connected to GND | Required |
| 2 | All VSS signals are connected to GND | Required |

</div>

### 5.8.7. Boot Mode { #587-boot-mode }

<div align="center"><em>Table 5.8.7-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | MODE has an internal pull-down; reserve a 10 kΩ pull-up to VDDIOA and drive MODE high during program download | Required |
| 2 | <span class="flag-red">MODE signal has a reserved test point and must be brought out to the production programming fixture</span> | Required |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Table 5.8.8-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | Required |
| 3 | If spurious-emission filtering must be considered, a Pi-type matching network is reserved with a 2.7 nH series inductor and a 2 pF parallel capacitor | Optional |
| 4 | If an external RF PA requires MCU control of RXEN and TXEN, use only PB39 for PA RXEN and PB40 for PA TXEN | Optional |
| 5 | <span class="flag-red">If Wi-Fi chip supports antenna coexistence arbitration: <br> (1) 3-wire mode is recommended: the Wi-Fi chip controls the Bluetooth/Wi-Fi antenna RF switch and performs arbitration. It uses BT_ACTIVE and BT_PRIORITY from Bluetooth to decide whether to grant antenna ownership to Bluetooth, and WLAN_ACTIVE can disable Bluetooth transmit/receive during Wi-Fi operation.<br> (2)BT_ACTIVE must use PB08 or PB45, WLAN_ACTIVE must use PB09 or PB41, and BT_PRIORITY may use any PB GPIO.<br></span> | Optional |
| 6 | If the Wi-Fi chip does not support antenna coexistence arbitration:<br>(1) 1-wire mode is recommended, Bluetooth controls the Bluetooth/Wi-Fi antenna RF switch, performs arbitration using BT_ACTIVE, and notifies the Wi-Fi chip.<br> (2) If Wi-Fi can output an operating-state signal, this scheme can be upgraded to 2-wire mode: connect the Wi-Fi output to WLAN_ACTIVE so Bluetooth can mask low-priority Bluetooth transmit/receive while Wi-Fi is active, without affecting Bluetooth when Wi-Fi is idle.<br> (3)BT_ACTIVE must use PB08 or PB45, WLAN_ACTIVE must use PB09 or PB41 | Optional |

</div>

### 5.8.9. I/O Resource Allocation { #589-io-resource-allocation }

<div align="center"><em>Table 5.8.9-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | Required |
| 3 | The actual GPIO allocation follows SiFli recommendations; refer to the EVB I/O config file | Required |

</div>

### 5.8.10. Hardware Wake-up { #5810-hardware-wake-up }

<div align="center"><em>Table 5.8.10-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | <span class="flag-red">HCPU wake-up interrupt sources are correct: PA64, PA65, PA66, PA67, PA68, and PA69, six pins total</span> | Required |
| 2 | <span class="flag-red">LCPU wake-up interrupt sources are correct: PB54, PB55, PB56, PB57, PB58, PB59, PBR0, PBR1, PBR2, and PBR3, ten pins total. After MCU wake-up, PBR0-PBR3 cannot receive interrupt signals</span> | Required |
| 3 | <span class="flag-red">Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs</span> | Required |

</div>

### 5.8.11. Storage { #5811-storage }

<div align="center"><em>Table 5.8.11-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | MPI3 is connected to NOR flash or SPI NAND flash as intended | Required |
| 2 | VDDIOSC is always powered | Required |
| 3 | VDDIOSA and VDDIOSB supplies are enabled by PBR0 | Required |
| 4 | MPI3 or MPI4 may be used for external NOR flash or SPI NAND flash | Required |
| 5 | The SPI NAND flash HOLD# pin is pulled up to the SPI NAND flash supply through a 10 kΩ resistor | Required |
| 6 | If production needs to program external flash on MPI3 or MPI4, the download tool drives PA43 high to enable MPI3 power | Required |
| 7 | If production needs to program eMMC or SD NAND on SDIO1, the download tool enables the corresponding power supply | Required |
| 8 | <span class="flag-red">PBR0/PA43-controlled voltage switches are active-high on and active-low off. In Hibernate, PBR0 controls VDDIOSA/VDDIOSB power switching, VDDIOSC remains always powered, and PA43 controls external flash power switching</span> | Required |
| 9 | If the SD1 interface connects to eMMC or SD NAND, the signal connections are correct | Required |
| 10 | The eMMC or SD NAND I/O interface level matches VDDIOA2 | Required |
| 11 | MPI3 or MPI4 signal connections are correct | Required |
| 12 | The peripheral device's I/O logic level matches the main chip's | Required |
| 13 | <span class="flag-red">NOR flash is qualified in the key-component selection guide</span> | Required |
| 14 | <span class="flag-red">SPI/SD NAND flash is qualified in the key-component selection guide</span> | Required |
| 15 | <span class="flag-red">eMMC is qualified in the key-component selection guide</span> | Required |

</div>

<div align="center"><em>Table 5.8.11-2: SiFli EVB SPI NAND MPI4 Reference Connections</em></div>

<div align="center" markdown>

| SPI NAND signal | SF32LB58x pin | Reference note |
|:---|:---|:---|
| CS# | PA10 (SD1_CMD) | Chip select, active low |
| SO | PA04 (SD1_D1) | Data input to the chip (IO1) |
| WP# | PA01 (SD1_D2) | Write-protect signal (IO2) |
| SI | PA05 (SD1_D0) | Data output from the chip (IO0) |
| SCLK | PA09 (SD1_CLK) | Serial clock |
| HOLD# | PA06 (SD1_D3) | IO3; pull up to VDD18_MPI4 through a 10 kΩ resistor |

</div>

In the EVB reference schematic, the SPI NAND Flash VCC connects to VDD18_MPI4; the rail also has 0.1 µF and 1 µF (6.3 V) capacitors. These pin assignments and component values describe the EVB reference only. Verify them against the selected chip package, Flash datasheet, and target-board pin-mux configuration before use.

For SD1, the VDDIOA2 I/O supply supports 1.8 V or 3.3 V and must match the peripheral's I/O level. SiFli recommends a 1.8 V interface for SPI NAND Flash and eMMC. SD NAND devices support only 3.3 V, so set VDDIOA2 to 3.3 V when using SD NAND.

### 5.8.12. Display { #5812-display }

<div align="center"><em>Table 5.8.12-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SF32LB58x connects the display through DSI + LCDC2 as intended | Required |
| 2 | DSI signal connections are correct | Required |
| 3 | <span class="flag-red">If only a QSPI LCD is used, the HCPU LCDC1 QSPI interface is recommended to avoid frame-rate and RAM issues</span> | Required |
| 4 | DSI_REXT is connected to GND through a 10 kΩ resistor | Required |
| 5 | The LCDC RSTB connection is correct | Required |
| 6 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | Required |
| 7 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | Required |
| 8 | The LCD interface supports MIPI-DSI, 3-/4-wire SPI, dual/quad-data SPI, DBI 8080, DPI, and parallel/serial JDI interfaces | Required |
| 9 | <span class="flag-red">SPI LCD, 3-wire mode: CS connected to PA44 or PB08, CLK connected to PA46 or PB10, DATA connected to PA50 or PB09; <br>4-wire mode: CS connected to PA44 or PB08, CLK connected to PA46 or PB10, DATA connected to PA50 or PB09, DC connected to PA48 or PB03</span> | Required |
| 10 | Confirm whether the LCD must support AOD; if so, a QSPI panel must connect to HCPU, while a JDI panel may connect to LCPU | Required |
| 11 | The peripheral device's I/O logic level matches the main chip's | Required |
| 12 | For DSI LCDs, connect DSI data and clock signals. DSI video-mode panels behave like RGB panels and have no TE signal; DSI command-mode panels have a TE signal, and DSI17801 requires TE. TE and RST are both recommended; final usage depends on the selected LCD | Required |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Table 5.8.13-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed AVDD33_ANA | Optional |
| 3 | Battery-voltage divider recommendation: 470 kΩ 1% resistor on the supply side, 1 MΩ 1% resistor to ground, and 100 nF filter capacitor | Required |
| 4 | <span class="flag-red">For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin</span> | Required |
| 5 | <span class="flag-red">ADC can detect multiple buttons and save pins; for example, when PB32 is used as an ADC button, do not use the battery as the pull-up supply</span> | Required |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Table 5.8.14-1: SDMADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SDMADC input is connected to the corresponding pin | Optional |
| 2 | SDMADC input range is correct; maximum input voltage should not exceed AVDD33_ANA | Optional |
| 3 | SDMADC_VREF and SDMADC_VSS_VREF connections are correct | Required |

</div>

### 5.8.15. Buttons { #5815-buttons }

<div align="center"><em>Table 5.8.15-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | Required |
| 2 | Ordinary-button connection is correct (pull-up present, correct resistor value, correct pull-up voltage domain) | Required |
| 3 | <span class="flag-red">Power button must use PB54, active-high, 10-second long-press reset, 10 kΩ pull-down resistor must be on the main board</span> | Required |
| 4 | All button signals have ESD protection | Required |

</div>

### 5.8.16. EOS and ESD Protection { #5816-eos-and-esd-protection }

<div align="center"><em>Table 5.8.16-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | Required |
| 2 | Charger-insertion detection signal has an ESD device | Required |
| 3 | Battery interface has an ESD device | Required |
| 4 | Antenna interface has an ESD device | Required |
| 5 | LCD and TP power interfaces have ESD devices | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | Required |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Table 5.8.17-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | Required |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Table 5.8.18-1: I2S Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 is input-only and operates only in master mode; the microphone is connected to I2S1 as intended</span> | Optional |
| 2 | <span class="flag-red">I2S2 supports input and output in master mode only, and may connect to external codec DAC/ADC devices</span> | Optional |
| 3 | <span class="flag-red">I2S3 supports input and output in master mode only; it is suitable for low-power use cases where HCPU sleeps and LCPU receives/processes audio through I2S3</span> | Optional |
| 4 | I2S signal connections are correct | Optional |
| 5 | <span class="flag-red">I2S1 interface digital MIC connection is correct</span> | Optional |
| 6 | The peripheral device's I/O logic level matches the main chip's | Optional |

</div>

### 5.8.19. PDM and Analog Audio { #5819-pdm-and-analog-audio }

<div align="center"><em>Table 5.8.19-1: PDM and Analog Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PDM dual-mic connection is correct | Optional |
| 2 | PDM MIC is powered from a digital supply | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | Optional |
| 4 | Analog dual-mic connection is correct | Optional |
| 5 | Analog MIC is powered by MIC_BIAS output | Optional |
| 6 | Both audio ADC inputs must each include at least 2.2 uF DC-blocking capacitor | Optional |
| 7 | DAC output paths P and N each have a 1 kΩ series resistor, with a 1.5 nF capacitor between them | Optional |
| 8 | AW8155 is the recommended audio amplifier; configure it in software for Mode 4 / Class AB mode when using the recommended part | Optional |
| 9 | <span class="flag-red">When feeding audio PA output back to the MCU ADC, add a divider and RC filter or additional digital filtering; the divided voltage must stay within the ADC input range, and RC filter cutoff should be 20 kHz</span> | Optional |
| 10 | <span class="flag-red">If the chip integrated analog audio ADC path is unused, ADC1P/ADC1N and ADC2P/ADC2N are each recommended to have a 0 Ω series resistor to ground</span> | Optional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Table 5.8.20-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SPI connection is correct; SDO and SDI are crossed correctly between MCU and peripheral | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | Optional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Table 5.8.21-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | USART4 is designed as the download and log interface | Required |
| 2 | <span class="flag-red">USART4 has test points; TXD and RXD are recommended with a series 100 Ω resistor</span> | Required |
| 3 | <span class="flag-red">USART1 has a test point</span> | Required |
| 4 | Devices that must run on HCPU are connected to USART2 or USART3 | Optional |
| 5 | Devices that must run on LCPU are connected to USART5 or USART6 | Optional |
| 6 | When connecting to a peripheral, RXD and TXD are crossed correctly | Required |
| 7 | The peripheral device's I/O logic level matches the main chip's | Required |
| 8 | Unused USART test points are reserved for backup use | Optional |
| 9 | <span class="flag-red">UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface</span> | Required |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Table 5.8.22-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; use a GPTIMx different from motor PWM, preferably on the PB interface, to avoid HCPU frequency reduction affecting the backlight | Required |
| 2 | Motor PWM pin allocation is correct; use a GPTIMx different from backlight PWM, preferably on the PB interface, to avoid HCPU frequency reduction affecting vibration | Required |
| 3 | For motor PWM control, select a default-disabled GPIO to avoid abnormal behavior during firmware programming when an SMT motor is used | Required |
| 4 | Signals that need PWM output must use the PB interface; also check for cold-boot abnormal behavior | Required |

</div>

### 5.8.23. Debug { #5823-debug }

<div align="center"><em>Table 5.8.23-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SWD signal connections are correct | Required |
| 2 | The J-Link connector or test points correctly reserve the I/O power supply reference | Required |
| 3 | <span class="flag-yellow">During program download, PVDD, VDDIO, VDDSC, and similar rails must be powered, AVDD18_DSI (CAU2 power) must also be powered</span> | Required |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Table 5.8.24-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | USB interface connection is correct | Optional |
| 2 | USB interface has ESD protection | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | Optional |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>Table 5.8.25-1: PBR Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | PBR0 changes from 0 to 1 during power-on and may be used for some external load-switch control; PBR1-PBR5 default to output low | Required |
| 2 | PBR0-PBR5 can be used as outputs in both Standby and Hibernate | Optional |
| 3 | PBR0-PBR5 can output LPTIM signals | Optional |
| 4 | <span class="flag-red">For SF32LB567, LPTIM3 is recommended: LPTIM3_OUT and LPTIM3_OUT_BAR output 21-25 kHz signals from PBR pins with different duty cycles and opposite polarity</span> | Optional |
| 5 | <span class="flag-red">The 21-25 kHz opposite-polarity signals with different duty cycles may also be output from HCPU ATIM; select suitable ATIMx_CHx and ATIMx_CHxN signals together with Pin_Config and consider the impact of HCPU frequency reduction</span> | Optional |
| 6 | PBR0-PBR5 can output a 32 kHz clock signal | Optional |
| 7 | <span class="flag-red">PBR0-PBR3 can be configured as wake-up inputs, but after MCU wake-up PBR0-PBRx cannot receive interrupt signals and can only detect 0/1 levels; use with caution</span> | Optional |

</div>

!!! note "Source applicability and verification"
    PBR checklist item 4 in the [source checklist workbook](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) names SF32LB567. The workbook does not establish PBR checklist items 4 and 5 as recommendations for SF32LB58x; confirm their applicability with SiFli before adopting them.

    Storage checklist item 6 in the workbook says PA43 is driven high to enable "MPI3 power." The [official SF32LB58x hardware application note](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md), however, describes PA43 as the external-Flash power-control pin and says to drive it high to power the external Flash. The checklist row retains the workbook's wording. Confirm the intended power rail and interface scope with SiFli before finalizing production programming.

### 5.8.26. Power Consumption { #5826-power-consumption }

<div align="center"><em>Table 5.8.26-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | For all MOSFET, LDO, and DCDC enable pins used for power switching, reserve a 1 MΩ pull-down to ground when the enable pin is active-high | Required |
| 2 | Hibernate-mode base-current requirement is recorded | Required |
| 3 | <span class="flag-red">The sum of selected peripheral base currents in Hibernate mode is recorded and meets project requirements</span> | Required |
| 4 | Standby-mode base-current requirement is recorded | Required |
| 5 | <span class="flag-red">The sum of selected peripheral base currents in Standby mode is recorded and meets project requirements</span> | Required |

</div>

### 5.8.27. Download and Crystal Calibration { #5827-download-and-crystal-calibration }

<div align="center"><em>Table 5.8.27-1: Download and Crystal Calibration Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Category |
|:---|:---|:---|
| 1 | SWD download test points, reserve VBAT, GND, SWDIO, SDCLK, MODE, RSTN, VDDIOA, VDDIOB test point | Required |
| 2 | If an offline-download board is required to program firmware, reserve VBAT, GND, UART4_TXD, UART4_RXD, MODE, RSTN, and VDDIOA test points | Optional |
| 3 | If crystal calibration is required, reserve a crystal-calibration test point; PB45 is recommended | Optional |

</div>
