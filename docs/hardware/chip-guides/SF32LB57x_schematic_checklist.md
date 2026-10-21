---
icon: lucide/list-checks
hide:
    - navigation
description: "Item-by-item schematic review checklist for the SF32LB57x MCU: package, power, clock, storage, RF, display, audio, camera, buttons, and manufacturing checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB57x Hardware Design Guide — Schematic Checklist { #sf32lb57x-hardware-design-guide-schematic-checklist }

!!! note "Part of the SF32LB57x Hardware Design Guide"
    This page covers Section 5.8, the item-by-item schematic checklist, transcribed from SiFli's official design self-check tables. Return to [Minimum System & Power](SF32LB57x_schematic_system_power.md), the first of the three Schematic Design Guidelines pages.

## 5.8. Schematic Checklist { #58-schematic-checklist }

Each table covers one functional block of the schematic. The Applies To column identifies checks limited to battery-powered or 3.3 V supply variants; checks marked "All variants" apply across the family.

### 5.8.1. Package { #581-package }

<div align="center"><em>Table 5.8.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | The schematic symbol library is correct | All variants | |

</div>

### 5.8.2. Power Supply { #582-power-supply }

<div align="center"><em>Table 5.8.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | `VBUS` input supply voltage is strictly controlled to 4.6 V–5.5 V | Battery-powered variants | |
| 2 | `VBAT` charging supports batteries rated 4.2 V–4.45 V; pre-charge current is 40 mA and maximum charge current is 1C (400 mA) | Battery-powered variants | |
| 3 | `VCC` rated operating range is 3.45 V–4.7 V; 3.45 V is the hardware power-on threshold and 2.7 V is the hardware shutdown threshold | Battery-powered variants | |
| 4 | `VSYS` is an internal dedicated supply — it may only power `AVDD_BRF` and the GPIO pull-up loop; do not drive any other external peripheral from it | Battery-powered variants | |
| 5 | `VDD33_VOUT1` load is limited to packaged Flash, external NOR/NAND Flash, and `AVDD33_AUD` — do not drive any other peripheral. The soft-start load current must not exceed 30 mA; load capability is 150 mA after full enable. | Battery-powered variants | |
| 6 | `VDD33_VOUT2` soft-start current limit is 30 mA; load capability is 150 mA once the voltage stabilizes at 3.3 V. The soft-start limit can be disabled by software — verify the connected peripheral's inrush current against this rail's recommended spec | Battery-powered variants | |
| 7 | `AVDD_BRF` is supplied by the `VSYS` domain | Battery-powered variants | |
| 8 | `AVDD33_AUD` is supplied by the `VDD33_VOUT1` domain | Battery-powered variants | |
| 9 | `PVDD` rated supply range is 2.93 V–3.63 V, typical default operating voltage 3.3 V | 3.3 V supply variants | |
| 10 | `VBATS` battery-voltage-sensing range is 0 V–4.5 V — do not exceed this range | 3.3 V supply variants | |
| 11 | `AVDD_BRF` is supplied by an external 3.3 V source | 3.3 V supply variants | |
| 12 | `AVDD33_AUD` is supplied by an external 3.3 V source | 3.3 V supply variants | |
| 13 | `AVDD33_ANA` is supplied by an external 3.3 V source | 3.3 V supply variants | |
| 14 | `VDDIOA` input-supply voltage range depends on the exact orderable part number — check the datasheet's part-number description | 3.3 V supply variants | |
| 15 | Battery-voltage sensing: the chip already routes an internal GPADC channel to `VBAT`/`VBATS` — do not additionally route it to another GPADC channel | All variants | |
| 16 | `BUCK_LX`/`BUCK_FB` wiring strictly follows the chip's hardware design spec | All variants | |
| 17 | `VDD18_VOUT` is only for powering the chip's packaged PSRAM — never use it for external 1.8 V peripherals | All variants | |
| 18 | `GPADC_VREF` accepts only an external capacitor — never an external voltage | All variants | |
| 19 | `AUD_VREF` accepts only an external capacitor — never an external voltage | All variants | |

</div>

!!! warning "Differences in the original source"
    The source self-check table gives a 2.93 V lower limit for `PVDD` and a 4.5 V upper limit for `VBATS`, while its package supply tables give 2.97 V and 4.7 V respectively. This page retains the self-check values. Confirm both discrepancies with SiFli for the exact orderable part; do not use the wider ranges for design sign-off.

    The reference schematic also labels `VCC` as 3.2 V–4.7 V and `VDD33_VOUT1` as supplying Flash and sensors, which differs from the 3.45 V lower limit and the restriction on other peripherals above. Retain the table restrictions; do not widen the voltage range or permitted loads based on the schematic labels.

    Elsewhere, the guide body gives a `VBUS` input range of 4.5 V–5.5 V and an integrated-LDO OVP output range of 4.5 V–5.4 V; the self-check table gives 4.6 V–5.5 V and 4.7 V–5.4 V, respectively. This page retains the self-check values. Confirm the applicable limits against the exact device and with SiFli before design sign-off.

    Source self-check row 25 is titled for the `VDD33_VOUT2` capacitor, but its detailed check text mistakenly names `VDD33_VOUT1` (also covered by row 24). This page follows row 25's title; confirm the intended rail with SiFli.

### 5.8.3. Power Supply Capacitors and Inductors { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Table 5.8.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | `VBUS` capacitor ≥10 uF/10 V, placed close to the pin | Battery-powered variants | |
| 2 | `VBAT` capacitor ≥4.7 uF/10 V, placed close to the pin | Battery-powered variants | |
| 3 | `VCC` capacitor ≥10 uF/10 V, placed close to the pin | Battery-powered variants | |
| 4 | `VSYS` capacitor = 2.2 uF/6.3 V; total capacitance on this domain ≤9.6 uF, placed close to the pin | Battery-powered variants | |
| 5 | `VDD33_VOUT1` capacitor = 2.2 uF/6.3 V; total capacitance on this domain ≤9.6 uF, placed close to the pin | Battery-powered variants | |
| 6 | `VDD33_VOUT2` capacitor = 2.2 uF/6.3 V; total capacitance on this domain ≤9.6 uF, placed close to the pin | Battery-powered variants | |
| 7 | `PVDD` capacitor ≥10 uF/6.3 V, placed close to the pin | 3.3 V supply variants | |
| 8 | `VBATS` capacitor = 0.1 uF/10 V decoupling, placed close to the pin | 3.3 V supply variants | |
| 9 | `VDDIOA` capacitor = 4.7 uF/6.3 V, placed close to the pin | 3.3 V supply variants | |
| 10 | `AVDD33_ANA` capacitor = 1 uF/6.3 V, placed close to the pin | 3.3 V supply variants | |
| 11 | `BUCK_FB` capacitor = 4.7 uF, placed between the inductor and the chip pin | All variants | |
| 12 | `VDD_VOUT1` capacitor = 4.7 uF/6.3 V, placed close to the pin | All variants | |
| 13 | `VDD_VOUT2` capacitor = 4.7 uF/6.3 V, placed close to the pin | All variants | |
| 14 | `VDD_RET` capacitor = 0.47 uF/6.3 V, placed close to the pin | All variants | |
| 15 | `VDD_RTC` capacitor = 1 uF/6.3 V, placed close to the pin | All variants | |
| 16 | `MIC_BIAS` capacitor = 1 uF/6.3 V, placed close to the pin | All variants | |
| 17 | `AVDD_BRF` capacitor = 4.7 uF/6.3 V, placed close to the pin | All variants | |
| 18 | `AVDD33_AUD` capacitor = 2.2 uF/6.3 V, placed close to the pin | All variants | |
| 19 | `AUD_VREF` capacitor = 1 uF/6.3 V, placed close to the pin | All variants | |
| 20 | `GPADC_VREF` capacitor = 4.7 uF/6.3 V, placed close to the pin | All variants | |
| 21 | Prefer a BUCK inductor listed on the [SiFli Approved Vendor List](../cad-components/sifli-approved-vendor-list.md); if another part is used, it must meet L = 4.7 uH, DCR ≤0.4 Ω, and Isat ≥450 mA | All variants | |
| 22 | Products with GPS or other interference-sensitive peripherals reserve a shunt-to-ground capacitor footprint at `BUCK_LX`, under 100 pF, with the final value set by whole-unit EMC testing | All variants | |

</div>

### 5.8.4. Charging and OVP { #584-charging-and-ovp }

<div align="center"><em>Table 5.8.4-1: Charging and OVP Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | Charging input interface has an OVP over-voltage protection circuit | Battery-powered variants | |
| 2 | If the product must light the screen immediately after the charger is inserted, the internal charger is not used — an external charger IC with power-path management is used instead | Battery-powered variants | |
| 3 | The internal charger is used only where it is acceptable for the display to turn on by software after the battery has charged to 3.6 V | Battery-powered variants | |
| 4 | OVP device with integrated LDO output (e.g. `LP5305AQVF`) is recommended: LDO output 4.7 V–5.4 V, load capability ≥0.5 A, over-current-protection trip ≥0.7 A | Battery-powered variants | |
| 5 | If an adjustable-OVLO OVP device is used, divider resistors are 1% tolerance, OVLO threshold error is under 3%, and the adjustment range is set to 5.15 V–5.55 V | Battery-powered variants | |
| 6 | If the internal charger is unused, `VBUS` may be left floating and its external capacitor omitted; `VBAT` then cannot provide output power externally | Battery-powered variants | |

</div>

### 5.8.5. Power Consumption { #585-power-consumption }

<div align="center"><em>Table 5.8.5-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | LDO/DCDC power ICs use an active-high EN pin; when the output defaults to off, EN is pulled down through a 1 MΩ–5.1 MΩ resistor sized to the whole-unit low-power requirement | All variants | |
| 2 | MOSFET power switches use a PMOS+NMOS topology, control pin active-high (on) / active-low (off), with a fixed 1 MΩ pull-down to ground on the control pin | All variants | |
| 3 | External boot-media power switch is controlled solely by `PA21` | All variants | |
| 4 | If `VSYS` is used as a GPIO pull-up rail, its always-on static current is fully evaluated and confirmed to meet the whole-unit low-power target | Battery-powered variants | |
| 5 | If LDO2 or LDO3 is used as a GPIO pull-up rail, its power-down scenario is evaluated to confirm no leakage or abnormal IO level | Battery-powered variants | |
| 6 | I2C pull-up supply switches on and off together with the corresponding peripheral's IO-domain supply, to prevent sleep leakage | All variants | |
| 7 | Deep Sleep mode whole-unit static-current ceiling is confirmed against the project spec | All variants | |
| 8 | Sum of static current for all peripherals in Deep Sleep mode is recorded and meets the project power target | All variants | |
| 9 | Standby mode whole-unit static-current ceiling is confirmed against the project spec | All variants | |
| 10 | Sum of static current for all peripherals in Standby mode is recorded and meets the project power target | All variants | |

</div>

### 5.8.6. Clock { #586-clock }

<div align="center"><em>Table 5.8.6-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | 48 MHz main crystal is a part number listed on the [SiFli Approved Vendor List](../cad-components/sifli-approved-vendor-list.md) (AVL) | All variants | |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All variants | |
| 3 | 32.768 kHz RTC crystal is a part number listed on the AVL | All variants | |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL = 7 pF or 11.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All variants | |

</div>

### 5.8.7. Storage and Boot { #587-storage-and-boot }

<div align="center"><em>Table 5.8.7-1: Storage and Boot Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | External SPI NOR Flash on MPI3: `PA13` (MPI D1) and `PA17` (MPI D3) need no pull-up | All variants | |
| 2 | External SPI NAND Flash on MPI3: `PA13` (MPI D1) needs no pull-up; `PA17` (MPI D3) needs a 7.5 kΩ pull-up | All variants | |
| 3 | External SD NAND Flash on MPI3: `PA13` (SD D3) and `PA15` (SD CMD) need 7.5 kΩ pull-ups; `PA17` (SD D1) needs no pull-up | All variants | |
| 4 | External eMMC on MPI3: `PA13` (SD D3), `PA17` (SD D1), and `PA15` (SD CMD) all need 7.5 kΩ pull-ups | All variants | |
| 5 | If packaged storage already occupies MPI3, external MPI3 use is limited to SD NAND / eMMC — do not attach external SPI NOR/SPI NAND | All variants | |
| 6 | MPI3 external storage power control: SPI NOR Flash may be always powered; SPI NAND/SD NAND/eMMC need a power-switch control; for external-medium boot, the storage supply defaults to powered-on | All variants | |
| 7 | Selected external storage part number is on the project's AVL | All variants | |
| 8 | Storage part's operating-voltage range matches the main chip's IO supply level | All variants | |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Table 5.8.8-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | ANT signal trace is explicitly annotated with a single-ended 50 Ω characteristic-impedance design constraint | All variants | |
| 2 | Signal chain reserves a PI matching network with NC capacitors in the shunt positions and a 15 pF capacitor in the series position (final values tuned on hardware) | All variants | |

</div>

### 5.8.9. Display { #589-display }

<div align="center"><em>Table 5.8.9-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | QSPI-interface display prefers the dedicated Function-1 pins in the `PA00`–`PA08` group | All variants | |
| 2 | RGB-interface display may use any GPIO at normal signal rates; above 30 MHz, pins are limited to `PA22`–`PA50` and `PA52`–`PA54` (`B1`–`B6` only) | All variants | |
| 3 | MCU 8080-interface display follows the same pin-assignment rule as RGB; high-speed scenarios are limited to `PA22`–`PA50` and `PA52`–`PA54` | All variants | |
| 4 | EPD e-paper display follows the same pin-assignment rule as RGB; high-speed scenarios are limited to `PA22`–`PA50` and `PA52`–`PA54` | All variants | |
| 5 | Display and backlight power draw is significant, so a power-switch control circuit is included; other than always-on-display designs, display and backlight supplies default to off at power-up | All variants | |
| 6 | Display and touch device operating-voltage ranges match the main chip's IO-domain supply level | All variants | |

</div>

### 5.8.10. Audio { #5810-audio }

<div align="center"><em>Table 5.8.10-1: Audio Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | MEMS microphone signal, bias, and other pin wiring complies with the hardware design spec | All variants | |
| 2 | MEMS microphone uses the chip's `MIC_BIAS` as its bias supply | All variants | |
| 3 | Single-ended analog ECM microphone signal, bias, and other pin wiring complies with the hardware design spec | All variants | |
| 4 | Single-ended analog ECM microphone uses the chip's `MIC_BIAS` as its bias supply | All variants | |
| 5 | Every audio ADC input channel has a series DC-blocking capacitor of at least 2.2 uF | All variants | |
| 6 | `DACP`/`DACN` each get a 1 kΩ series resistor close to the chip, with a 1.5 nF capacitor in parallel between the two signals | All variants | |
| 7 | `ADC1P`-shared pin `PA55` is configured as high-impedance input when `ADC1P` is enabled, to avoid function conflicts or signal issues | All variants | |
| 8 | `ADC2P`-shared pin `PA10` is configured as high-impedance input when `ADC2P` is enabled, to avoid function conflicts or signal issues | All variants | |
| 9 | `MICBIAS`-shared pin `PA56` is configured as high-impedance input when `MICBIAS` is enabled, to prevent pin-function conflicts causing leakage or circuit faults | All variants | |

</div>

### 5.8.11. Camera { #5811-camera }

<div align="center"><em>Table 5.8.11-1: Camera Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | Camera signal, power, and other pin wiring complies with the hardware design spec | All variants | |
| 2 | Every camera model's core supply meets its own datasheet requirement | All variants | |

</div>

### 5.8.12. Buttons { #5812-buttons }

<div align="center"><em>Table 5.8.12-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | Whether a button needs hardware-wake capability is confirmed against the product plan, with matching circuit and software configuration completed | All variants | |
| 2 | Ordinary button pull-up circuit uses a correctly selected resistor value and a pull-up voltage domain matching the IO supply domain | All variants | |
| 3 | Power/reset key uses `PA34`, configured active-high; it supports a 10-second long-press hardware reset; the 10 kΩ pull-down resistor is placed on the main board | All variants | |
| 4 | Every button input signal has a matching ESD protection device close to the button | All variants | |

</div>

### 5.8.13. UART { #5813-uart }

<div align="center"><em>Table 5.8.13-1: UART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | UART wiring follows the cross-wiring rule: MCU RXD connects to peripheral TXD, MCU TXD connects to peripheral RXD | All variants | |
| 2 | During MCU reset, the external peripheral on `PA35`/`PA36` (UART-multiplexed) is powered down, or software pulls `PA35`/`PA36` low, to prevent abnormal levels from triggering unintended peripheral operation | All variants | |
| 3 | Connected UART device's IO operating-voltage range matches the corresponding IO domain of the main chip | All variants | |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>Table 5.8.14-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | SDA and SCL have pull-up resistors (2.2 kΩ recommended at 400 kHz); pull-up voltage domain is supplied from the peripheral side so it powers down together with the peripheral | All variants | |
| 2 | Whether the I2C's companion interrupt pin needs hardware-wake is confirmed and configured accordingly | All variants | |
| 3 | Accelerometer, heart-rate, magnetometer, and similar I2C sensors support reading all registers in a single continuous burst read | All variants | |
| 4 | Every device sharing an I2C bus has a unique slave address with no conflicts | All variants | |

</div>

### 5.8.15. SPI { #5815-spi }

<div align="center"><em>Table 5.8.15-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | SPI wiring follows the cross-wiring rule: host SDO to peripheral SDI, host SDI to peripheral SDO; CLK and CS connect directly | All variants | |
| 2 | Host-configured clock frequency, phase, and polarity fully match the peripheral device's spec | All variants | |
| 3 | Peripheral's IO operating-voltage range matches the corresponding IO domain of the main chip | All variants | |

</div>

### 5.8.16. GPADC { #5816-gpadc }

<div align="center"><em>Table 5.8.16-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | GPADC input signals are assigned only to the 11 GPADC-capable pins `PA28`–`PA38` | All variants | |
| 2 | Analog voltage into every GPADC channel stays within the 0 V–3.3 V rated range | All variants | |
| 3 | Divider-based sampling channels use 1% resistors; every GPADC input has a 100 nF filter capacitor placed close to the chip pin | All variants | |

</div>

### 5.8.17. USB { #5817-usb }

<div align="center"><em>Table 5.8.17-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | USB differential-signal, power, and ground pin wiring follows the USB hardware design spec, with no misalignment or shorts | All variants | |
| 2 | USB data lines, `VBUS`, and other key pins have ESD protection devices meeting the whole-unit ESD spec | All variants | |
| 3 | While the MCU is not in sleep, USB stays enabled so insertion/removal is recognized normally via the USB protocol | All variants | |
| 4 | If USB insertion must be recognized while the MCU sleeps, a `VBUS` divider circuit feeds an IO-compatible level into a hardware-wake-capable pin, ideally shared with charger-insertion detection | All variants | |
| 5 | `USB_DP`-shared pin `PA35` is configured as high-impedance input when `USB_DP` is enabled | All variants | |
| 6 | `USB_DM`-shared pin `PA36` is configured as high-impedance input when `USB_DM` is enabled | All variants | |

</div>

### 5.8.18. External Hardware Wake { #5818-external-hardware-wake }

<div align="center"><em>Table 5.8.18-1: External Hardware Wake Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | External hardware-wake interrupts use only the 10 GPIOs in the `PA33`–`PA42` range | All variants | |

</div>

### 5.8.19. Debug and Download { #5819-debug-and-download }

<div align="center"><em>Table 5.8.19-1: Debug and Download Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | `PA18` (RXD) and `PA19` (TXD) are the default DBG-UART download/debug interface; TXD and RXD are confirmed used correctly | All variants | |
| 2 | `PA43`/`PA44`, the default SWD debug/download pins, have solderable test points reserved for programming and debug | All variants | |
| 3 | `PA00`, the boot-mode select pin, has a reserved pull-up resistor and a matching test point | All variants | |
| 4 | `PA01`, the SWD pin-location switch, has a pull-up resistor and test point reserved as needed for the product design | All variants | |

</div>

### 5.8.20. EOS and ESD { #5820-eos-and-esd }

<div align="center"><em>Table 5.8.20-1: EOS and ESD Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | Charging interface has a complete set of EOS surge, ESD, and OVP protection devices | All variants | |
| 2 | Battery interface power and signal pins have ESD protection devices | All variants | |
| 3 | RF antenna signal pin has a dedicated ESD protection device | All variants | |
| 4 | LCD and touch-panel supply pins have ESD protection devices | All variants | |
| 5 | Touch panel's I2C bus, `RST`, and `INT` signal lines all have ESD protection devices | All variants | |
| 6 | Heart-rate module's supply pin and every signal-transmission pin have ESD protection devices | All variants | |

</div>

### 5.8.21. Production Line { #5821-production-line }

<div align="center"><em>Table 5.8.21-1: Production Line Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Confirmed (Yes/No) |
|:---|:---|:---|:---|
| 1 | Program-download/debug test points reserve `VBAT` or 3.3 V, `GND`, `PA18` (`DBG_UART_RXD`), `PA19` (`DBG_UART_TXD`), `VSYS` (not applicable to 3.3 V supply variants), and `PA34` | Battery-powered variants | |
| 2 | Every reserved test point's layout allows manual probe testing and hand soldering, with no blockage or crowded routing | All variants | |
| 3 | Fixture-specific test points (`VBAT` or 3.3 V, `GND`, `PA18`, `PA19`, `VDD33_VOUT1` where applicable, `PA00`, `PA01`, `PA34`) have pad size, spacing, and orientation matching the production fixture's probe spec | All variants | |

</div>
