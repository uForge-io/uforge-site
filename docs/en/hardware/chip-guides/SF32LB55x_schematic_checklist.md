---
icon: lucide/list-checks
hide:
    - navigation
description: "Item-by-item schematic review checklist for the SF32LB55x MCU, covering power, clock, RF, storage, display, and manufacturing checks."
tags:
    - Hardware
    - Chip
    - Checklist
---

# SF32LB55x Hardware Design Guide — Schematic Checklist { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. Schematic Checklist { #58-schematic-checklist }

Each table below covers one schematic functional block. Apply a row only to the variants listed in the Applies To column when that column is present.

Red text and yellow backgrounds preserve the source workbook's review emphasis. The workbook does not explain each highlight, so treat them as additional review flags; they do not change an item's Required/Optional category.

### 5.8.1. Package { #581-package }

<div align="center"><em>Table 5.8.1-1: Package Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The package of the selected part number is correct, including pin names and pin numbers | All variants | Required |

</div>

### 5.8.2. Power Supply { #582-power-supply }

<div align="center"><em>Table 5.8.2-1: Power Supply Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 supply voltage is 1.8 V-3.3 V | 551/555/557 only | Required |
| 2 | <span class="flag-red">VDD1 supply voltage is 3.3 V</span> | <span class="flag-red">SS6600A8 only</span> | <span class="flag-red">Required</span> |
| 3 | VDD2 supply voltage is 1.8 V-3.3 V | 555/557 only | Required |
| 4 | BUCK1_VSW and BUCK1_VOUT connections are correct | All variants | Required |
| 5 | BUCK2_VSW and BUCK2_VOUT connections are correct | 555/557 only | Required |
| 6 | LDOVCC2_VOUT connection is correct | 555/557 only | Required |
| 7 | AVDD_DSI supply voltage is 1.8 V | 555/557 only | Required |
| 8 | LDO_VOUT1 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 9 | LDO_VOUT2 output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 10 | VDD_RET output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 11 | VDD_RTC output has a test point, or a filter capacitor convenient for voltage measurement | All variants | Required |
| 12 | VDD_SIP supply voltage is 1.8 V, and a load switch is provided so it can be shut off | 551/555/557 only | Required |
| 13 | <span class="flag-red">VDD_SIP supply voltage is 3.3 V, and a load switch is provided so it can be shut off</span> | <span class="flag-red">SS6600A8 only</span> | <span class="flag-red">Required</span> |
| 14 | AVDD33 supply voltage is 3.3 V | All variants | Required |
| 15 | AVDD_BRF supply voltage is 1.8 V-3.3 V and must match the VDD1 supply | 551/555/557 only | Required |
| 16 | <span class="flag-red">AVDD_BRF supply voltage is 3.3 V</span> | <span class="flag-red">SS6600A8 only</span> | <span class="flag-red">Required</span> |
| 17 | VDDIOA supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | 551/555/557 only | Required |
| 18 | VDDIOB supply voltage is 1.8 V-3.3 V; reserve a 0 Ω series resistor in the first board revision | 551/555/557 only | Required |
| 19 | <span class="flag-red">VDDIOA supply voltage is 3.3 V; reserve a 0 Ω series resistor in the first board revision</span> | <span class="flag-red">SS6600A8 only</span> | <span class="flag-red">Required</span> |
| 20 | <span class="flag-red">VDDIOA supply voltage is 3.3 V; reserve a 0 Ω series resistor in the first board revision</span> | <span class="flag-red">SS6600A8 only</span> | <span class="flag-red">Required</span> |
| 21 | When SF30147C supplies power, the TWI control interface must use MCU PB pins, and those pins must be PD pins | 551/555/557 only | Required |
| 22 | When SF30147C supplies power, rails controlled by EN must use PVDD or AVDD as the EN power domain; do not control EN from an MCU GPIO. Alternatively, tie EN to ground and control the corresponding rail output through registers | 551/555/557 only | Required |
| 23 | When SF30147C supplies power, BUCK and LDO1 can only be controlled by their respective enable signals, EN_BUCK and EN_LDO1; internal register control is not provided | 551/555/557 only | Required |
| 24 | Charging circuit requires path management so the system can be powered from the charger 5 V input when battery voltage is too low | All variants | Required |

</div>

Source ambiguity: items 19 and 20 in the original V1.0 workbook are identical; both specify 3.3 V on VDDIOA for SS6600A8. The [hardware application guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md) identifies VDDIOA as the PA I/O supply and VDDIOB as the PB I/O supply, but does not establish whether item 20 was intended to name VDDIOB. The checklist above preserves the workbook verbatim. Confirm the intended rail with SiFli before using item 20 as a design sign-off criterion.

### 5.8.3. Power Supply Capacitors and Inductors { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>Table 5.8.3-1: Power Supply Capacitors and Inductors Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | VDD1 bulk capacitor is at least 10 uF | All variants | Required |
| 2 | VDD2 capacitor is at least 10 uF | 555/557 only | Required |
| 3 | BUCK1_VOUT capacitor is 4.7 uF | All variants | Required |
| 4 | BUCK2_VOUT capacitor is 4.7 uF | 555/557 only | Required |
| 5 | <span class="flag-red">AVDD_DSI capacitor is at least 10 uF</span> | 555/557 only | Required |
| 6 | LDO_VOUT1 capacitor is 4.7 uF | All variants | Required |
| 7 | LDO_VOUT2 capacitor is 4.7 uF | All variants | Required |
| 8 | VDD_RET capacitor = 0.47 uF | All variants | Required |
| 9 | VDD_RTC capacitor = 1 uF | All variants | Required |
| 10 | VDD_SIP capacitor is at least 1 uF | All variants | Required |
| 11 | AVDD33 capacitor is at least 1 uF | All variants | Required |
| 12 | AVDD_BRF capacitor is at least 1 uF | All variants | Required |
| 13 | VDDIOA capacitor is at least 1 uF | All variants | Required |
| 14 | VDDIOB capacitor is at least 1 uF | All variants | Required |
| 15 | VDD1, VDD2 (555 only), AVDD_BRF, and the RESET pull-up supply must be the same | All variants | Required |
| 16 | BUCK1 inductor is a SiFli-recommended part number | 551/555/557 only | Required |
| 17 | BUCK2 inductor is a SiFli-recommended part number | 555/557 only | Required |
| 18 | If the BUCK inductor is not SiFli-recommended, it meets L = 4.7 uH, DCR &lt;= 0.4 ohm, and Isat &gt;= 450 mA | All variants | Required |
| 19 | If GPS or other interference-sensitive peripherals are present, reserve a shunt-to-ground capacitor footprint at BUCK_LX; the value depends on actual test results | All variants | Required |
| 20 | <span class="flag-red">When converting VBAT to 1.8 V for VDD1 and VDD2 (555 only), use a DCDC converter; do not use an LDO</span> | 551/555/557 only | Required |
| 21 | <span class="flag-red">Quiescent current of the selected DCDC is recorded and meets project requirements</span> | All variants | Required |
| 22 | <span class="flag-red">Quiescent current of the selected LDO is recorded and meets project requirements</span> | All variants | Required |

</div>

Source discrepancy: Table 3-3 of [SiFli's Chinese hardware application guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) and item 9 of the [V1.0 schematic checklist](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) specify 1 µF for VDD_RTC, while [C0313 in the reference schematic](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png) is labeled 0.1 µF. The sources do not explain when each value applies. Confirm the required value with SiFli for the exact device before design release; do not resolve the discrepancy by assumption.

### 5.8.4. Clock { #584-clock }

<div align="center"><em>Table 5.8.4-1: Clock Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Main 48 MHz crystal is an AVL-listed part number | All variants | Required |
| 2 | If the 48 MHz crystal is not AVL-listed, it meets 7 pF ≤ CL ≤ 12 pF (8.8 pF recommended), frequency tolerance ≤±10 ppm, ESR ≤30 Ω (22 Ω recommended) | All variants | Required |
| 3 | RTC 32.768 kHz crystal is an AVL-listed part number | All variants | Required |
| 4 | If the 32.768 kHz crystal is not AVL-listed, it meets CL ≤12.5 pF (7 pF recommended), frequency tolerance ≤±20 ppm, ESR ≤80 kΩ (38 kΩ recommended) | All variants | Required |
| 5 | <span class="flag-yellow">If the 32.768 kHz crystal is omitted, the XI pad must be grounded</span> | <span class="flag-yellow">All variants</span> | <span class="flag-yellow">Required</span> |

</div>

### 5.8.5. Reset { #585-reset }

<div align="center"><em>Table 5.8.5-1: Reset Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | RSTN is pulled up to the same supply as VDD1 | All variants | Required |
| 2 | RSTN reserves a 0.1 uF capacitor to ground | All variants | Required |
| 3 | RSTN has ESD protection | All variants | Required |

</div>

### 5.8.6. Ground Signals { #586-ground-signals }

<div align="center"><em>Table 5.8.6-1: Ground Signals Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | All AVSS signals are connected to GND | 555/557 only | Required |
| 2 | All VSS signals are connected to GND | 555/557 only | Required |
| 3 | EPAD signal is connected to GND | <span class="flag-red">551/SS6600A8 only</span> | Required |

</div>

### 5.8.7. Boot Mode { #587-boot-mode }

<div align="center"><em>Table 5.8.7-1: Boot Mode Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE defaults to a 10 kΩ pull-down to ground and is pulled up to VDDIOA during programming/download</span> | All variants | Required |
| 2 | <span class="flag-red">MODE signal has a reserved test point</span> | All variants | Required |
| 3 | If PCB space allows, reserve a 3-pin header so pull-up or pull-down can be selected with a jumper cap | All variants | Required |

</div>

### 5.8.8. RF { #588-rf }

<div align="center"><em>Table 5.8.8-1: RF Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | The ANT signal is annotated with the single-ended 50 Ω characteristic-impedance requirement | All variants | Required |
| 2 | A Pi-type matching network is reserved on the ANT signal: a parallel NC (do-not-populate) capacitor and a 15 pF series capacitor | All variants | Required |
| 3 | If spurious-emission filtering is required, reserve a Pi network with a 3.0 nH series inductor and a 1.5 pF shunt capacitor | All variants |    |
| 4 | <span class="flag-red">If an external PA or LNA must be controlled, connect PB05 to RX_EN and PB25 to TX_EN</span> | All variants | Optional |

</div>

The source workbook leaves the category for RF item 3 blank, so it remains blank here; do not infer “Required” or “Optional” without confirmation from SiFli.

### 5.8.9. I/O Resource Allocation { #589-io-resource-allocation }

<div align="center"><em>Table 5.8.9-1: I/O Resource Allocation Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | A GPIO resource-allocation table matching the schematic is provided | All variants | Required |
| 2 | The GPIO allocation in the resource table matches the schematic | All variants | Required |
| 3 | The actual GPIO allocation follows SiFli recommendations; refer to the EVB I/O config file | All variants | Required |

</div>

### 5.8.10. Hardware Wake-up { #5810-hardware-wake-up }

<div align="center"><em>Table 5.8.10-1: Hardware Wake-up Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">HCPU wake-up interrupt sources are correct: PA77, PA78, PA79, and PA80; do not use them for power-key wake-up</span> | All variants | Required |
| 2 | <span class="flag-red">LCPU wake-up interrupt sources are correct: PB43, PB44, PB45, PB46, PB47, and PB48, six pins total, can be used for power-key wake-up</span> | All variants | Required |
| 3 | <span class="flag-red">Interrupt and control signals for LCPU-side peripherals such as G-sensor and heart-rate sensor must connect to PB GPIOs</span> | All variants | Required |
| 4 | <span class="flag-red">The LCPU interrupt source corresponding to UART3 is used correctly; it is recommended only for button wake-up</span> | All variants | Required |

</div>

### 5.8.11. Storage { #5811-storage }

<div align="center"><em>Table 5.8.11-1: Storage Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | QSPI2 is designed using the priority PSRAM &gt; NOR flash &gt; NAND flash | All variants | Required |
| 2 | If code runs from the internal SiP NOR flash, VDD_SIP power-switch control is PA58 | All variants | Required |
| 3 | If code runs from external NOR flash on QSPI2, QSPI2 power-switch control is PA58 | All variants | Required |
| 4 | If external flash on QSPI2 must be programmed in production, its power switch must be controlled by PA58 | All variants | Required |
| 5 | <span class="flag-red">The voltage switch controlled by PA58 is active-high on and active-low off</span> | All variants | Required |
| 6 | <span class="flag-red">33 Ω series resistors are recommended on Flash CLK and data lines</span> | All variants | Required |
| 7 | QSPI3 is connected to NAND flash or eMMC as intended | 555/557 only | Optional |
| 8 | QSPI3 power-switch control is PA41; <span class="flag-red">QSPI3 power defaults off, and an active-high switch should use the default internal pull-down</span> | 555/557 only | Optional |
| 9 | <span class="flag-red">If QSPI3 power-switch control is not PA41, confirm the alternate IO with software</span> | 555/557 only | Optional |
| 10 | If external flash on QSPI3 must be programmed in production, its power switch must be controlled by PA58 | 555/557 only | Required |
| 11 | OPI PSRAM power-switch control is PA70; <span class="flag-red">PSRAM power defaults on, and an active-high switch should use the default internal pull-up</span> | 555/557 only | Optional |
| 12 | <span class="flag-red">The OPI PSRAM is a supported model and is listed as qualified in the key-component selection guide</span> | 555/557 only | Optional |
| 13 | OPI PSRAM signal connections are correct | 555/557 only | Optional |
| 14 | QSPI2 signal connection is correct | All variants | Optional |
| 15 | QSPI3 signal connection is correct | All variants | Optional |
| 16 | <span class="flag-yellow">When using SF32LB555 or <span class="flag-red">SF32LB557, confirm the memory required by the heart-rate-sensing algorithm; if LCPU memory is insufficient, add external 1 MB flash on QSPI4</span></span> | 555/557 only | Required |
| 17 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 18 | <span class="flag-red">NOR flash is listed as qualified in the key-component selection guide</span> | All variants | Required |
| 19 | <span class="flag-red">NAND flash is listed as qualified in the key-component selection guide</span> | All variants | Required |

</div>

### 5.8.12. Display { #5812-display }

<div align="center"><em>Table 5.8.12-1: Display Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SF32LB555xxxx connects the display through DSI + LCDC2 as intended | 555/557 only | Required |
| 2 | <span class="flag-red">SF32LB551xxxx connects the display through LCDC1 as intended</span> | <span class="flag-red">551/SS6600A8 only</span> | Required |
| 3 | LCDC1 QSPI signal connections are correct; <span class="flag-red">100 Ω series resistors are recommended on CLK and data lines</span> | All variants | Required |
| 4 | LCDC1 MCU8080 signal connections are correct | All variants | Required |
| 5 | DSI signal connections are correct | 555/557 only | Required |
| 6 | LCDC2 QSPI signal connection is correct | 555/557 only | Required |
| 7 | DSI_REXT is connected to GND through a 10 kΩ resistor | 555/557 only | Required |
| 8 | The LCDC RSTB connection is correct | All variants | Required |
| 9 | LCDC TE connection is correct (connects to the panel's TE or Fmark signal) | All variants | Required |
| 10 | <span class="flag-red">SPI LCD, 3-wire mode: CS connected to GPIO22 or PA31 or PB33, CLK connected to GPIO23 or PA20 or PB32, DATA connected to GPIO21 or PA34 or PB35; <br>4-wire mode: CS connected to GPIO22 or PA31 or PB33, CLK connected to GPIO23 or PA20 or PB32, DATA connected to GPIO21 or PA34 or PB35, DC connected to GPIO20 or PA36 or PB36</span> | All variants | Required |
| 11 | TP signals follow the recommended pin assignment (refer to the EVB I/O config file) | All variants | Required |
| 12 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 13 | If the design supports screen-off (always-on) display, connect the LCD QSPI interface to MCU PA pins; PB GPIOs are recommended for LCD_EN, LCD_RST, and similar control signals | <span class="flag-red">551/SS6600A8 only</span> | Required |
| 14 | If the design supports screen-off (always-on) display, connect the LCD QSPI interface to MCU PA pins, or connect the LCD MIPI interface to the MCU; PB GPIOs are recommended for LCD_EN, LCD_RST, and similar control signals | 555/557 only | Required |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>Table 5.8.13-1: GPADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | GPADC input is connected to the corresponding pin | All variants | Optional |
| 2 | GPADC input range is correct; maximum input voltage must not exceed 1.0 V | All variants | Optional |
| 3 | Battery-voltage divider recommendation: 1 MΩ 1% resistor on the supply side, 220 kΩ 1% resistor to ground, and 100 nF filter capacitor | All variants | Required |
| 4 | For every resistor-divider signal measured by GPADC, use 1%-tolerance divider resistors; <span class="flag-red">each GPADC channel must have a 100 nF filter capacitor placed close to the chip pin</span> | All variants | Required |

</div>

Source discrepancy: the higher-priority [OpenSiFli hardware application guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md) describes a five-channel, 10-bit GPADC with a 0–0.9 V input range. Item 2 in the linked [V1.0 source checklist workbook](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx) sets a 1.0 V maximum but does not specify the channel count. In contrast, the [SF32LB55x datasheet V1.7.2, section 3.2.1](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) specifies eight single-ended inputs or four differential pairs, with a 0–1.1 V single-ended range and a −0.7 to 0.7 V differential range; its pin table lists GPADC_CH0–CH7. The current [SDK ADC guide](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html) also maps eight channels (0–7) and lists 1.1 V as the maximum sampled voltage. SiFli has not explained the conflicting channel counts and voltage limits. The checklist table retains the workbook's 1.0 V value in item 2; until SiFli provides written clarification, however, design to the higher-priority hardware application's 0–0.9 V range and keep VADC at or below 0.9 V. Do not treat the workbook's 1.0 V or the datasheet/SDK's 1.1 V as an approved design limit, and confirm channel availability for the selected device and package.

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>Table 5.8.14-1: SDMADC Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SDMADC input is connected to the corresponding pin | 555/557 only | Optional |
| 2 | SDMADC input range is correct; maximum input voltage should not exceed 1.2 V | 555/557 only | Optional |
| 3 | SDMADC_VREF and SDMADC_VSS_VREF connections are correct | 555/557 only | Required |

</div>

### 5.8.15. Buttons { #5815-buttons }

<div align="center"><em>Table 5.8.15-1: Buttons Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Confirm with the customer whether the button requires wake-up capability | All variants | Required |
| 2 | Button connection is correct: pull-up present, correct resistor value, and correct pull-up voltage domain | All variants | Required |
| 3 | <span class="flag-red">Power button must use PB43, PB44, PB45, PB46, PB47, or PB48</span> | All variants | Required |
| 4 | All button signals have ESD protection | All variants | Required |

</div>

### 5.8.16. EOS and ESD Protection { #5816-eos-and-esd-protection }

<div align="center"><em>Table 5.8.16-1: EOS and ESD Protection Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Charging interface has EOS, ESD, and OVP design | All variants | Required |
| 2 | Charger-insertion detection signal has an ESD device | All variants | Required |
| 3 | Battery interface has an ESD device | All variants | Required |
| 4 | Antenna interface has an ESD device | All variants | Required |
| 5 | LCD and TP power interfaces have ESD devices | All variants | Required |
| 6 | TP I2C, RST, and INT lines have ESD devices | All variants | Required |
| 7 | Heart-rate sensor power interface and signal lines have ESD devices | All variants | Required |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>Table 5.8.17-1: I2C Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2C assignment accounts for HCPU/LCPU partitioning and whether the device must run in low-power mode | All variants | Required |
| 2 | I2C has pull-ups with the correct resistor value; if 400 kHz operation is required, 2.2 kΩ pull-ups are recommended. Use the peripheral-side voltage domain and shut the pull-up supply off with the peripheral at power-down | All variants | Required |
| 3 | I2C interrupt signal supports hardware wake-up where required | All variants | Required |
| 4 | If multiple devices share one I2C bus, their addresses are distinguished | All variants | Required |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>Table 5.8.18-1: I2S Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | I2S1 is input-only; the microphone is connected to I2S1 as intended | All variants | Optional |
| 2 | I2S2 supports input and output; the audio decoder or codec is connected to I2S2 as intended | All variants | Optional |
| 3 | I2S signal connections are correct | All variants | Optional |
| 4 | The dual-microphone I2S connection is correct | All variants | Optional |
| 5 | Microphone part specification is confirmed and supported by the chip | All variants | Optional |
| 6 | If MCLK is required, its connection is confirmed correct | All variants | Optional |
| 7 | The peripheral device's I/O logic level matches the main chip's | All variants | Optional |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>Table 5.8.19-1: PDM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | PDM connection is correct | 555/557 only | Optional |
| 2 | PDM dual-mic connection is correct | 555/557 only | Optional |
| 3 | Microphone part specification is confirmed and supported by the chip | 555/557 only | Optional |
| 4 | The peripheral device's I/O logic level matches the main chip's | 555/557 only | Optional |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>Table 5.8.20-1: SPI Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SPI connection is correct: <span class="flag-red">MCU SDO connects to peripheral SDI, and MCU SDI connects to peripheral SDO</span> | All variants | Optional |
| 2 | SPI peripheral timing requirements are confirmed and supported | All variants | Optional |
| 3 | The peripheral device's I/O logic level matches the main chip's | All variants | Optional |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>Table 5.8.21-1: USART Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USART3 is designed as the download and log interface | All variants | Required |
| 2 | <span class="flag-red">USART3 has test points and a pull-up resistor if required; a 100 Ω series resistor is recommended and may be adjusted for the actual design</span> | All variants | Required |
| 3 | Devices that must run on HCPU are connected to USART1 or USART2 | All variants | Optional |
| 4 | Devices that must run on LCPU are connected to USART4 or USART5 | All variants | Optional |
| 5 | <span class="flag-red">When connecting to a peripheral, MCU RXD connects to peripheral TXD and MCU TXD connects to peripheral RXD</span> | All variants | Required |
| 6 | The peripheral device's I/O logic level matches the main chip's | All variants | Required |
| 7 | Unused USART test points are reserved for backup use | All variants | Optional |
| 8 | <span class="flag-red">If UART1 connects to a device, test points are reserved</span> | All variants | Required |
| 9 | <span class="flag-red">If UART connects to a UART-to-USB chip, RX and TX must be disconnectable</span> | All variants | Required |
| 10 | <span class="flag-red">UART connected to peripherals is recommended to use the HCPU interface to avoid HCPU software using an LCPU UART interface</span> | All variants | Required |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>Table 5.8.22-1: PWM Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | Backlight PWM pin allocation is correct; use a GPTIMx different from the motor, preferably on the PB interface, to avoid HCPU frequency reduction affecting the backlight | All variants | Optional |
| 2 | Motor PWM pin allocation is correct; use a GPTIMx different from the backlight, preferably on the PB interface, to avoid HCPU frequency reduction affecting vibration | All variants | Optional |
| 3 | Motor PWM control pin is recommended on the PB interface, preferably PB24 or PB25, to avoid abnormal behavior during programming when an SMT motor is used | All variants | Optional |
| 4 | Signals that need PWM output must use the PB interface; also check for cold-boot abnormal behavior | All variants | Optional |

</div>

### 5.8.23. Debug { #5823-debug }

<div align="center"><em>Table 5.8.23-1: Debug Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | SWD signal connections are correct | All variants | Optional |
| 2 | The J-Link connector or test points correctly reserve the I/O power supply reference | All variants | Optional |
| 3 | <span class="flag-yellow">For SF32LB555x XXXX production programming, in addition to PVDD, VDDIOA, VDDIOB, VDDSIP, AVDD33, and AVDD_BRF, AVDD_DSI must also be powered</span> | 555/557 only | Required |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>Table 5.8.24-1: USB Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | USB interface connection is correct | All variants | Optional |
| 2 | USB interface has ESD protection | All variants | Optional |
| 3 | During normal non-sleep operation, as long as USB remains enabled, the PC/device side can sense insertion and removal; <br>If MCU sleeps, must sense insertion and removal, add a VBUS resistor-divider circuit, the divider outputs a high level matching the IO voltage, feed into an MCU wake-up pin, sharing the charger-insertion detection wake pin is recommended | All variants | Optional |

</div>

### 5.8.25. Power Consumption { #5825-power-consumption }

<div align="center"><em>Table 5.8.25-1: Power Consumption Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | QFN GPIO27 and BGA PA01 are not recommended as inputs because an internal 20 kΩ pull-down can cause a low high-level voltage with a large pull-up resistor or excessive leakage with a small pull-up resistor | All variants | Required |
| 2 | If QFN GPIO27 or BGA PA01 is used as an output, confirm the controlled circuit defaults inactive when the I/O is not driven. Prefer using it for high-current operating scenarios because driving a 1.8 V high level introduces about 90 uA leakage | All variants | Required |
| 3 | If PA01 and PA03 are used as GPIOs, keep the two IO levels consistent during sleep, or place at least one pin in high-impedance state with no pull-up or pull-down | All variants | Required |
| 4 | PA77, PA78, PA79, PA80, and PB43-PB48 are ten wake-capable pins. In Hibernate power-off state they are high impedance and internal PU/PD is disabled; add external pull-up or pull-down if a fixed level cannot otherwise be guaranteed | All variants | Required |
| 5 | If a PB wake-up pin is used for waveform output, reserve external pull-up or pull-down even when Hibernate is not used | All variants | Required |
| 6 | For all MOSFET, LDO, and DCDC enable pins, ensure the required on/off state is maintained in Hibernate with default pull-up or pull-down resistors | All variants | Required |
| 7 | For GPIO signals that control a load by driving high, use a 1 MΩ pull-down when it does not affect function to reduce leakage | All variants | Required |
| 8 | When a PA GPIO output must remain high during sleep, select a PU pin | All variants | Required |
| 9 | When a PA GPIO output must remain low during sleep, select a PD pin | All variants | Required |
| 10 | Hibernate-mode baseline-current requirement is recorded | All variants | Required |
| 11 | <span class="flag-red">The sum of selected peripheral baseline currents in Hibernate mode is recorded and meets project requirements</span> | All variants | Required |
| 12 | Standby-mode baseline-current requirement is recorded | All variants | Required |
| 13 | <span class="flag-red">The sum of selected peripheral baseline currents in Standby mode is recorded and meets project requirements</span> | All variants | Required |
| 14 | For PB43-PB48 wake pins used as outputs, reserve external pull-up or pull-down because internal pulls are disabled in Standby | All variants | Required |

</div>

### 5.8.26. Offline Download and Crystal Calibration { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>Table 5.8.26-1: Offline Download and Crystal Calibration Checklist</em></div>

<div align="center" markdown>

| No. | Check Point | Applies To | Category |
|:---|:---|:---|:---|
| 1 | If an offline-download board is required to program firmware, reserve VBAT, GND, UART3_TXD, UART3_RXD, MODE, and RESET test points | All variants | Optional |
| 2 | If crystal calibration is required, reserve PB08. If PB08 connects to a peripheral, preferably use it as an output and do not connect external capacitance | All variants | Optional |

</div>
