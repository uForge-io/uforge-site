---
icon: lucide/list-checks
description: "Item-by-item schematic review checklist for the SF32LB56x MCU, covering power, clock, RF, storage, display, and manufacturing checks."
tags:
    - Hardware
    - Chip
    - Checklist
hide:
    - navigation
---

# SF32LB56x Hardware Design Guide — Schematic Checklist { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "Part of the SF32LB56x Hardware Design Guide"
    This page covers Section 5.8, the item-by-item schematic checklist. Return to [Schematic Design Guidelines](SF32LB56x_schematic_design.md).

## 5.8. Schematic Checklist { #58-schematic-checklist }

Each table below covers one schematic functional block. Apply a row only to the variants listed in the Applies To column when that column is present.

### 5.8.1. Package { #581-package }

<div align="center"><em>Table 5.8.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | All chips | Required |

</div>

### 5.8.2. Power Supply { #582-power-supply }

<div align="center"><em>Table 5.8.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PVDD supply voltage is 1.8 V-3.3 V; 1.8 V is recommended for SF32LB56xU/SF32LB56xV, and 3.3 V is recommended for SS6700A | All chips | Required |
| 2 | BUCK_LX and BUCK_FB connections are correct | All chips | Required |
| 3 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 4 | LDO_VOUT2 output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 5 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 6 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | All chips | Required |
| 7 | VDDIO1 supply voltage is 1.8 V-3.3 V; SF32LB56xU uses 1.8 V and SS6700A uses 3.3 V. VDDIO1 may be switched together with external flash under PBR0 control. If VDDIO1 is not controlled by PBR0, ensure it is powered during program download. If controlled by GPIO, PB22 is recommended and the download tool must enable this rail | SF32LB560/561/563/56W and SS6700A | Required |
| 8 | When VDDIO1 is supplied by SF30147, LVSW1 is recommended; the download tool must enable this rail | SF32LB560/561/563/56W and SS6700A | Required |
| 9 | VDDIO2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A recommended to use 3.3 V) | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | VDDIO3 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A recommended to use 3.3 V) | SF32LB560/561/563/56W and SS6700A | Required |
| 11 | VDDIO4 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision (SF32LB56xU recommended to use 1.8 V, SS6700A does not have this power rail) | SF32LB560/561/563/56W | Required |
| 12 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 13 | VDDIOA2 supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 14 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | SF32LB565/567 | Required |
| 15 | VDDIOSA supply voltage is 1.8 V, and a load switch is provided for power control | SF32LB565/567 | Required |
| 16 | VDDIOSB supply voltage is 1.8 V, and a load switch is provided for power control | SF32LB565/567 | Required |
| 17 | VDDIOSC supply voltage is 1.8 V and VDDIOSC must always be powered | SF32LB565/567 | Required |
| 18 | AVDD33_ANA supply voltage is 3.3 V | All chips | Required |
| 19 | AVDD33_AUD supply voltage is 3.3 V | All chips | Required |
| 20 | The charging circuit is recommended to use a charger IC with path management so the system can power on from the charger input when battery voltage is below the power-on threshold | All chips | Required |
| 21 | If a charger IC without path management is used, trickle charge current must be at least 40 mA | All chips | Required |
| 22 | Power-supply design should be hardware-compatible between SF32LB56xU and SS6700 where applicable | SF32LB560/561/563/56W and SS6700A | Required |
| 23 | When SF30147 supplies power, use the SF32LB56x dedicated TWI interface for register control | All chips | Required |
| 24 | If SF30147 TWI shares the G-sensor I2C bus, the G-sensor I2C pull-up supply must always be powered so TWI can operate normally | All chips | Required |
| 25 | When SF30147 supplies power, EN-controlled load switches and LDOs may be used. The EN power domain must be PVDD or AVDD; do not control the switch from an MCU GPIO at a 1.8 V or 3.3 V level. Alternatively, tie EN to ground and control the corresponding rail output through registers | All chips | Required |
| 26 | When SF30147 supplies power, BUCK and LDO1 can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | All chips | Required |
| 27 | 56x PVDD must match VDDIO3 on SF32LB56xU or VDDIOB on SF32LB56xV. If PVDD is lower, for example the IO rail is 3.3 V while PVDD is 1.8 V, the IO rail has about 15 uA leakage in Standby and Hibernate | All chips | Required |

</div>

### 5.8.3. Power Supply Capacitors and Inductors { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Table 5.8.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PVDD bulk capacitor is at least 10 uF | All chips | Required |
| 2 | BUCK_FB capacitor = 4.7 uF | All chips | Required |
| 3 | LDO_VOUT1 capacitor is 4.7 uF | All chips | Required |
| 4 | LDO_VOUT2 capacitor is 4.7 uF | All chips | Required |
| 5 | VDD_RET capacitor = 0.47 uF | All chips | Required |
| 6 | VDD_RTC capacitor = 1 uF | All chips | Required |
| 7 | VDDIO1 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 8 | VDDIO2 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 9 | VDDIO3 capacitor is at least 1 uF | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | VDDIO4 capacitor is at least 1 uF | SF32LB560/561/563/56W | Required |
| 11 | VDDIOA capacitor is at least 1 uF | SF32LB565/567 | Required |
| 12 | VDDIOA2 capacitor is at least 1 uF | SF32LB565/567 | Required |
| 13 | VDDIOB capacitor is at least 1 uF | SF32LB565/567 | Required |
| 14 | VDDIOSA capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 15 | VDDIOSB capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 16 | VDDIOSC capacitor is at least 0.1 uF | SF32LB565/567 | Required |
| 17 | MIC_BIAS capacitor is 1 uF | All chips | Required |
| 18 | AVDD33_ANA capacitor is at least 4.7 uF | All chips | Required |
| 19 | AVDD33_AUD capacitor is at least 4.7 uF | All chips | Required |
| 20 | AVDD33_BRF capacitor is at least 4.7 uF | SF32LB565/567 | Required |
| 21 | AUD_VREF capacitor = 1 uF | All chips | Required |
| 22 | GPADC VREFP capacitor = 4.7 uF | All chips | Required |
| 23 | BUCK inductor is a part number listed on the [SiFli Approved Vendor List] (AVL) | All chips | Required |
| 24 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | All chips | Required |
| 25 | Set PVDD to 1.8 V; a VBAT-to-1.8 V DCDC converter is recommended | All chips | Required |
| 26 | If GPS or other interference-sensitive peripherals are present, reserve a shunt-to-ground capacitor footprint at BUCK_LX; the value depends on actual test results | All chips | Required |
| 27 | Quiescent current of the selected DCDC is recorded and meets project requirements | All chips | Required |
| 28 | Quiescent current of the selected LDO is recorded and meets project requirements | All chips | Required |

</div>

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Table 5.8.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | All chips | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All chips | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | All chips | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All chips | Required |

</div>

### 5.8.5. Ground Signals { #585-ground-signals }

<div align="center"><em>Table 5.8.5-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | All VSS signals are connected to GND | All chips | Required |

</div>

### 5.8.6. Boot Mode { #586-boot-mode }

<div align="center"><em>Table 5.8.6-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MODE has an internal pull-down; reserve a 10 kΩ pull-up to VDDIOA and drive MODE high during program download | All chips | Required |
| 2 | MODE signal has a reserved test point and must be brought out to the production programming fixture | All chips | Required |

</div>

### 5.8.7. RF { #587-rf }

<div align="center"><em>Table 5.8.7-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | All chips | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | All chips | Required |

</div>

### 5.8.8. I/O Resource Allocation { #588-io-resource-allocation }

<div align="center"><em>Table 5.8.8-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | All chips | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | All chips | Required |
| 3 | For GPIO output control, account for the default PU/PD state during cold boot and enable related peripherals in advance if required | All chips | Required |
| 4 | Actual GPIO allocation follows SiFli recommendations; refer to the I/O config file | All chips | Required |

</div>

### 5.8.9. Hardware Wake-up { #589-hardware-wake-up }

<div align="center"><em>Table 5.8.9-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Hibernate/Standby wake-up interrupt sources are correct: PA50, PA51, PB32, PB33, PB34, PBR0, PBR1, and PBR2, eight pins total | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | Hibernate/Standby wake-up interrupt sources are correct: PA50-PA54, PB32-PB36, and PBR0-PBR3, fourteen pins total | SF32LB565/567 | Required |
| 3 | Wake-up pins can wake HCPU or LCPU according to software configuration | All chips | Required |
| 4 | Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs | All chips | Required |

</div>

### 5.8.10. Storage { #5810-storage }

<div align="center"><em>Table 5.8.10-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MPI3 (SD2) connects to SPI NAND flash or SD NAND flash; on SF32LB56xU external flash, ensure the flash supply voltage matches VDDIO3 | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | MPI3 (SD2) connects to SPI NAND flash or SD NAND flash, and the flash I/O level matches VDDIOA2 | SF32LB565/567 | Required |
| 3 | The SPI NAND flash HOLD# pin is pulled up to the SPI NAND flash supply through a 10 kΩ resistor | All chips | Required |
| 4 | MPI3 connects to NOR flash (SS6700A external memory must be NOR flash) | All chips | Required |
| 5 | If production must download MPI3 (SD2) FLASH, during program download, external flash power supply is enabled | All chips | Required |
| 6 | The power switch controlled by PBR0 or another GPIO is active-high on and active-low off | All chips | Required |
| 7 | If the SD2 interface connects to SD NAND, signal connections are correct | All chips | Required |
| 8 | 33 Ω series resistors are recommended on Flash CLK and data lines | All chips | Optional |
| 9 | SD NAND I/O level matches VDDIO2 | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | Flash CLK and data lines have 33 Ω series resistors | All chips | Required |
| 11 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 12 | LCPU co-packaged NOR flash is always powered, and PBR0 controls external flash power by default.<br>(1) If GPIOs are limited, PBR0 may also control the 561/2/3/W co-packaged PSRAM supply (VDDIO1). If sleep data is stored in PSRAM, do not power off PSRAM or external flash.<br>(2) If GPIOs are available, use PB22 to control the PSRAM supply switch | SF32LB560/561/563/56W and SS6700A | Required |
| 13 | <span class="flag-yellow">VDDIOSA and VDDIOSB supplies are controlled by PBR0, VDDIOSC is always powered, and external flash supply is controlled by PA03</span> | SF32LB565/567 | Required |
| 14 | NOR flash is qualified in the key-component selection guide | All chips | Required |
| 15 | SPI/SD NAND flash is qualified in the key-component selection guide | All chips | Required |

</div>

### 5.8.11. Display { #5811-display }

<div align="center"><em>Table 5.8.11-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB56xU or SS6700A connects to a QSPI panel | All chips | Required |
| 2 | SF32LB56xU or SS6700A connects to a serial JDI panel | All chips | Required |
| 3 | LCDC1 QSPI signal connections are correct; 100 Ω series resistors are recommended on CLK and data lines | All chips | Required |
| 4 | LCDC1 serial JDI signal connections are correct | All chips | Required |
| 5 | The LCDC RSTB connection is correct | All chips | Required |
| 6 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | All chips | Required |
| 7 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | All chips | Required |
| 8 | LCD interface supports 3/4-wire SPI, dual/quad-data SPI, serial JDI, and similar modes | All chips | Optional |
| 9 | SPI LCD, 3-wire mode: CS connected to PA36, CLK connected to PA37, DATA connected to PA38; 4-wire mode: CS connected to PA36, CLK connected to PA37, DATA connected to PA38, DC connected to PA39 | All chips | Optional |
| 10 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 11 | If LCD AOD is required, note LCD_RST (PA05) supply VDDIO3, must always be powered, VDDIO3 must not be tied to external flash power, otherwise disabling flash power during sleep may also turn off VDDIO3 and LCD_RST, causing AOD abnormalities | SF32LB560/561/563/56W and SS6700A | Required |
| 12 | For DSI LCDs, connect DSI data and clock signals. DSI video-mode panels behave like RGB panels and have no TE signal; DSI command-mode panels have a TE signal, and DSI17801 requires TE. TE and RST are both recommended; final usage depends on the selected LCD | SF32LB565/567 | Required |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>Table 5.8.12-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | All chips | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed AVDD33_AVA (3.3 V) | All chips | Optional |
| 3 | Battery-voltage divider recommendation: 470 kΩ 1% resistor on the supply side, 1 MΩ 1% resistor to ground, and 100 nF filter capacitor | All chips | Required |
| 4 | For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin | All chips | Required |
| 5 | ADC can detect multiple buttons and save pins; for example, when PB32 is used as an ADC button, do not use the battery as the pull-up supply | All chips | Required |

</div>

### 5.8.13. Buttons { #5813-buttons }

<div align="center"><em>Table 5.8.13-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | All chips | Required |
| 2 | Ordinary-button connection is correct (pull-up present, correct resistor value, correct pull-up voltage domain) | All chips | Required |
| 3 | Power button must use PB32, active-high, 10-second long-press reset, 10 kΩ pull-down resistor must be on the main board | All chips | Required |
| 4 | All button signals have ESD protection | All chips | Required |

</div>

### 5.8.14. EOS and ESD Protection { #5814-eos-and-esd-protection }

<div align="center"><em>Table 5.8.14-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | All chips | Required |
| 2 | Charger-insertion detection signal has an ESD device | All chips | Required |
| 3 | Battery interface has an ESD device | All chips | Required |
| 4 | Antenna interface has an ESD device | All chips | Required |
| 5 | LCD and TP power interfaces have ESD devices | All chips | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | All chips | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | All chips | Required |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>Table 5.8.15-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | All chips | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | All chips | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | All chips | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | All chips | Required |
| 5 | The SiFli source row for the SF30147C PMIC reads: “I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C.” The wording does not clarify how the signals relate or what “normal” means. Verify the PB23 assignment, pull-up supply, and TWI DAT operation with the SF30147C against the official schematic and documentation before release. | SF32LB560/561/563/56W and SS6700A | Required |

</div>

### 5.8.16. Analog Audio { #5816-analog-audio }

<div align="center"><em>Table 5.8.16-1: Analog Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | MEMS mic connection is correct | All chips | Required |
| 2 | MEMS mic is powered from MIC_BIAS | All chips | Required |
| 3 | Analog ECM single-ended mic connection is correct | All chips | Required |
| 4 | Analog ECM single-ended mic is powered from MIC_BIAS | All chips | Required |
| 5 | Analog ECM differential MIC connection is correct | All chips | Required |
| 6 | Analog ECM differential microphone is powered from MIC_BIAS | All chips | Required |
| 7 | All audio ADC inputs have a DC-blocking capacitor of at least 2.2 uF | All chips | Required |
| 8 | Audio DAC outputs DACP and DACN each have a 1 kΩ series resistor near the chip, with a 1.5 nF capacitor in parallel between DACP and DACN | All chips | Required |
| 9 | AW8155 is the recommended audio amplifier; configure it in software for Mode 4 / Class AB mode when using the recommended part | All chips | Required |
| 10 | When feeding audio PA output back to the MCU ADC, add a divider and RC filter or additional digital filtering; the divided voltage must stay within the ADC input range, and RC filter cutoff should be 20 kHz | All chips | Required |
| 11 | If the chip integrated analog audio ADC path is unused, ADCP and ADCN are each recommended to have a 0 Ω series resistor to ground | All chips | Required |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>Table 5.8.17-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SPI connection is correct; SDO and SDI are crossed correctly between MCU and peripheral | All chips | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | All chips | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | All chips | Optional |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>Table 5.8.18-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USART4 is the program-download/debug interface; reserve test points and add a recommended 100 Ω series resistor, adjustable for the actual design | All chips | Required |
| 2 | <span class="flag-yellow">SF32LB56xU PA17/PA18 are muxed as USART1 for RF certification testing; reserve test points</span> | SF32LB560/561/563/56W and SS6700A | Required |
| 3 | <span class="flag-yellow">SF32LB56xV PA30/PA34 are muxed as USART1 for RF certification testing; reserve test points</span> | SF32LB565/567 | Required |
| 4 | When connecting to a peripheral, MCU-side RXD connects to peripheral TXD and MCU-side TXD connects to peripheral RXD | All chips | Required |
| 5 | When PA17/PA18 are muxed as UART to peripherals, ensure at MCU reset that the connected peripherals are powered down or software drives both pins low | All chips | Required |
| 6 | The peripheral device's I/O logic level matches the main chip's | All chips | Required |
| 7 | Unused USART test points are reserved for backup use | All chips | Optional |
| 8 | UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface | All variants | Required |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>Table 5.8.19-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; LCD backlight control must use PB GPIOs with PWM function | All chips | Optional |
| 2 | Motor PWM pin allocation is correct; motor vibration control must use PB GPIOs with PWM function | All chips | Optional |
| 3 | For motor PWM control, select a default-disabled GPIO to avoid abnormal behavior during firmware programming when an SMT motor is used | All chips | Optional |
| 4 | PWM outputs other than backlight and motor must also use the PB interface, and cold-boot behavior must be checked | All chips | Optional |

</div>

### 5.8.20. Debug { #5820-debug }

<div align="center"><em>Table 5.8.20-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | UART4_TXD/UART4_RXD are recommended for debug; reserve test points and add a recommended 100 Ω series resistor | All chips | Required |
| 2 | SWD signal connections are correct | All chips | Required |
| 3 | The J-Link connector or test points correctly reserve the I/O power supply reference | All chips | Required |
| 4 | During production download, ensure PVDD, VDDIO2 on SF32LB56xU or VDDIOA on SF32LB56xV, VDDIO3 on SF32LB56xU or VDDIOA2 on SF32LB56xV, and VDDIO4 on SF32LB56xU or VDDIOB on SF32LB56xV are powered. VDDIO1 on 561/563/56W or VDDIOSB on 565/567 must also be powered | All chips | Required |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>Table 5.8.21-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USB interface connection is correct | All chips | Optional |
| 2 | USB interface has ESD protection | All chips | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | All chips | Optional |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>Table 5.8.22-1: PBR Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PBR0 changes from 0 to 1 during power-on and may be used for some external load-switch control; PBR1-PBR2 default to output low | All chips | Required |
| 2 | PBR0-PBRx can be used as outputs in both Standby and Hibernate | All chips | Optional |
| 3 | PBR0-PBRx can output LPTIM signals | All chips | Optional |
| 4 | For 567, LPTIM3 is recommended: LPTIM3_OUT and LPTIM3_OUT_BAR output 21-25 kHz signals from PBR pins with different duty cycles and opposite polarity | All chips | Optional |
| 5 | The 21-25 kHz opposite-polarity signals with different duty cycles may also be output from HCPU ATIM; select suitable ATIMx_CHx and ATIMx_CHxN signals together with Pin_Config and consider the impact of HCPU frequency reduction | All chips | Optional |
| 6 | PBR1-PBRx can output a 32 kHz clock signal | All chips | Optional |
| 7 | PBR0-PBRx can be configured as inputs for wake-up signals | All chips | Optional |
| 8 | When PBR is used as a wake-up pin, software must poll it after MCU wake-up. It supports slow-changing levels such as buttons and charger detection, but fast pulses such as heart-rate interrupts must use a normal wake-capable GPIO, not PBR | All chips | Optional |

</div>

### 5.8.23. Power Consumption { #5823-power-consumption }

<div align="center"><em>Table 5.8.23-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | For all MOSFET, LDO, and DCDC enable pins used for power switching, reserve a 1 MΩ pull-down to ground when the enable pin is active-high; adjust the value if needed for the actual project | All chips | Required |
| 2 | Supply SF32LB56x PVDD at 1.8 V from a low-Iq DCDC converter and keep it powered continuously | All chips | Required |
| 3 | For SF32LB56xU and SS6700, VDDIO1 requires load-switch control. Use PBR0 as the control signal; if GPIOs are available, PB22 may control the supply. The download tool must enable VDDIO1 power | SF32LB560/561/563/56W and SS6700A | Required |
| 4 | For SF32LB56xU and SS6700, external flash power requires a load switch controlled by PBR0 | SF32LB560/561/563/56W and SS6700A | Required |
| 5 | <span class="flag-yellow">In Hibernate-off or Standby-off mode, SF32LB56xV VDDIOSA and VDDIOSB require load-switch control through PBR0, while VDDIOSC must always be powered</span> | SF32LB565/567 | Required |
| 6 | <span class="flag-yellow">SF32LB56xV MPI3 flash supply requires a load switch controlled by PA03; enable MPI3 flash power during download</span> | SF32LB565/567 | Required |
| 7 | Deep Sleep base-current requirement is recorded. Deep Sleep current is higher than Standby and is suitable for frequent wake-up with intervals below 200 ms; all PB pins support wake-up, and base current is 90 uA | All chips | Required |
| 8 | Sum of base currents of all selected peripherals in Deep Sleep mode is recorded and meets project requirements | All chips | Required |
| 9 | Standby base-current requirement is recorded. Standby is suitable for less frequent wake-up with intervals above 200 ms; only PA50, PA51, PB33, and PB34 support wake-up, and base current is 4-5 uA | SF32LB560/561/563/56W and SS6700A | Required |
| 10 | Standby base-current requirement is recorded. Standby is suitable for less frequent wake-up with intervals above 200 ms; only PA50, PA51, PA52, PA53, PA54, PB33, PB34, PB35, and PB36 support wake-up, and base current is 4-5 uA | SF32LB565/567 | Required |
| 11 | Selected peripherals, in Standby mode is recorded and meets project requirements | All chips | Required |

</div>

### 5.8.24. Download { #5824-download }

<div align="center"><em>Table 5.8.24-1: Download Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB56xU: reserve VBAT, GND, VDDIO2, VDDIO3 or VDDIO4, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD, and one of PB20/PB21/PB25 as download test points | SF32LB560/561/563/56W and SS6700A | Required |
| 2 | SF32LB56xV: reserve VBAT, GND, VDDIOA, VDDIOB, MODE, SWDIO, SWCLK, UART4_RXD, UART4_TXD, and one of PB20/PB21/PB25 as download test points | SF32LB565/567 | Required |

</div>

[SiFli Approved Vendor List]: ../cad-components/sifli-approved-vendor-list.md
