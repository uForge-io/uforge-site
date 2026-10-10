---
icon: lucide/microchip
description: "SF32LB55x: mainstream ultra-low-power MCU family for wearable and HMI products needing richer graphics, more SRAM, and a wider choice of packages than entry-level Bluetooth MCUs."
tags:
    - Hardware
    - Chip
---

# SF32LB55x

## Overview

The SF32LB55x series is a mainstream, ultra-low-power AIoT microcontroller family for BLE-connected products that need stronger display capabilities, more memory headroom, and a wider choice of packages than entry-level Bluetooth MCUs.

Its big.LITTLE dual-core architecture pairs two Arm Cortex-M33 STAR-MC1[^1] processors: a high-performance application core running at up to 240 MHz and an ultra-low-power core running at up to 48 MHz. This lets a product keep demanding UI work on the application core while assigning sensor processing, standby control, and BLE tasks that must remain active to the low-power core.

SiFli's official product brief and datasheet list BLE 5.2, the ePicasso 2.5D graphics engine, dual LCD controllers, a TinyML-oriented neural-network matrix accelerator, and 1,312 KB of on-chip SRAM (1,088 KB HCPU + 224 KB LCPU), along with support for external NOR, NAND, eMMC, and PSRAM. This makes SF32LB55x a practical choice for wearables, sensor-rich products, and compact HMI designs that need more resources than SF32LB52x but do not require a higher-tier 56/58-family device.

SiFli's chip model guide notes that SF32LB55x was defined before the later 52/56/58 families, so its suffixes do not fully follow the newer numbering convention. Use the complete orderable part number and package-specific capability tables when selecting a device; do not infer every capability from the suffix alone.

[^1]: STAR-MC1 is a configurable Armv8-M Mainline embedded CPU IP from Arm China. In compatible SF32 devices, SiFli documents it as an Arm Cortex-M33 STAR-MC1 application processor. Its Cortex-M33-class software model helps existing Cortex-M33 firmware, middleware, RTOS ports, and tools carry forward, subject to normal device-specific integration work. Its CU, SP, and SE configurations vary chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities that must be verified for the exact SF32 part. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

## Applications

**SF32LB55x is recommended for** BLE-first products that need a stronger UI, larger working memory, or more flexible packaging than entry-level wearable MCUs, including:

- Smartwatches and fitness bands
- Health-monitoring wearables
- Smart locks and smart-home controllers
- Sensor-rich connected accessories
- Compact graphical HMI products
- Smart stylus and pen-computing accessories
- Portable terminals and handheld controllers

Choose SF32LB55x when the design needs one or more of these capabilities:

- BLE 5.2 connectivity with very low receive current
- MIPI DSI command-mode display support
- Larger SRAM for LVGL, graphics assets, sensing, or TinyML workloads
- A user-programmable low-power processor
- More GPIO or denser package options than SF32LB52x
- External NOR, NAND, eMMC, QSPI-PSRAM, or OPI-PSRAM flexibility

## Development Resources

[Product Brief]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-User%20manual%20V0p3p4.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[SiFli Chip Model Guide]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[Hardware Design Checklist Source]: https://wiki.sifli.com/hardware/index.html
[SDK Documentation]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API Reference]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Note (GitHub source)]__
- :fontawesome-solid-list: __[SiFli Chip Model Guide]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge)]__
- :fontawesome-solid-book: __[SDK Documentation]__
- :fontawesome-solid-book-open: __[API Reference]__
- :fontawesome-solid-list-check: __[Hardware Design Checklist Source]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- High-performance Arm Cortex-M33 STAR-MC1 application processor, up to 240MHz
- Ultra-low-power Arm Cortex-M33 STAR-MC1 processor, up to 48MHz
- Up to 360 DMIPS / 965 EEMBC CoreMark on the application processor
- Up to 72 DMIPS / 193 EEMBC CoreMark on the low-power processor
- 1,088 KB application SRAM, including 64 KB retention SRAM
- 224 KB low-power SRAM, all retention SRAM
- External memory interfaces for NOR, NAND, eMMC, QSPI-PSRAM, and OPI-PSRAM

### Graphics, Display, and AI

- ePicasso 2.5D graphics engine with hardware rotation, scaling, mirroring, and alpha blending
- eZip losslessly decompresses graphics and can be chained with ePicasso
- The ePicasso transform layer supports resolutions up to 640 × 640; generic layers and display output support up to 1024 × 1024, and display output reaches up to 60 fps
- LCD controller supports 8080, SPI, Dual-SPI, Quad-SPI, DPI, MIPI DSI, and JDI reflective-display interfaces on supported variants; verify availability for the selected model
- TurboPixel framebuffer compression lets the LCD controller read compressed frame data and decompress it for display, reducing framebuffer storage and read-bandwidth requirements
- Dual LCD controllers; always-on-display interfaces and dual-display capability depend on the selected model and package
- Neural-network matrix accelerator for TinyML workloads, up to 1.92 GOPS and 5.73 TOPS/W

### Wireless Connectivity

- Bluetooth Low Energy 5.2
- BLE 125 kbps, 500 kbps, 1 Mbps, and 2 Mbps modes
- Sensitivity down to -100 dBm in 1 Mbps mode
- Maximum transmit power: 10 dBm
- Receive peak current: 2.0 mA at 3.3 V

### Security

- AES and CRC hardware accelerators
- True random number generator (TRNG)
- PSA Certified Level 1

### Peripherals and I/Os

- Up to 5 UART, 6 I2C, and 4 SPI interfaces across the family; counts vary by model, as shown below
- I2S and PDM interface counts vary by model (see the table). Each PDM interface can connect up to two digital microphones, so interface count is not microphone count; also check pin availability for the selected model.

<div align="center"><em>Published per-model peripheral and ADC counts (SS6600A8 not specified)</em></div>

<div align="center" markdown>

| Model | UART | I2C | SPI | I2S | PDM | 16-bit Sigma-Delta ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | Not specified | Not specified | Not specified | Not specified | Not specified | Not specified |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | Not present |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 channels |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 channels |

</div>

**SS6600A8 source note:** The current [SiFli Chip Model Guide][SiFli Chip Model Guide] lists this part's package, co-packaged memory, GPIO, and display interface, but does not specify its per-model UART, I2C, SPI, I2S, PDM, or Sigma-Delta ADC counts. Table 0-1 of the [DS5501 V1.7.2 datasheet][Datasheet] also has no separate row for SS6600A8. Its counts are therefore marked “Not specified”; do not infer them from SF32LB551U4O5 just because both use QFN68L. Confirm the configuration with SiFli before pin assignment.

- 1 × USB 2.0 FS host/device interface
- 1 × 10-bit GPADC (SAR ADC): the datasheet specifies up to 8 single-ended inputs or 4 differential pairs, with a 0–1.1 V single-ended input range
- **ADC source discrepancy:** The [DS5501 V1.7.2 datasheet][Datasheet] specifies up to 8 single-ended inputs or 4 differential pairs and a 0–1.1 V single-ended range. The [SF32LB55x hardware application note][Hardware Application Note (GitHub source)] states 5 channels and a 0–0.9 V input range. Confirm the channel mapping and limits for the exact part and SDK revision before designing the analog front end.
- 16-bit Sigma-Delta ADC with 5 channels on the BGA145 and BGA169 models shown above; it is not present on the QFN68L models
- Temperature sensor
- 2 × low-power voltage comparators
- Peripheral Task Controller (PTC)
- GPIO count varies by package; see the package table and source-discrepancy note below

### Power Supply and Package

- Power supply range is variant-specific: 2.97 V to 3.63 V for SS6600A8; 1.71 V to 3.63 V for 551U4O5 and the selected BGA variants
- Operating temperature is variant-specific: -20 °C to +70 °C for the documented QFN variants; -40 °C to +85 °C for the selected BGA variants
- Integrated power management with two high-efficiency buck regulators and low-power LDO
- Sleep current with RTC wake-up: 600 nA
- Sleep current with pin wake-up: 280 nA
- Package options: QFN68L, BGA145, and BGA169

## Family Variants

SF32LB55x devices are offered in QFN and BGA packages. Select the package early because GPIO count, integrated memory, display-interface choice, and PCB process all vary materially by package.

Package choice is not just a layout decision here. SiFli's [chip model guide][SiFli Chip Model Guide] explicitly notes that the 55x family supports all or only part of the display-interface set depending on package, so package selection should be locked before display, memory, and pin-budget planning are finalized. Parts in the same package are pin-to-pin compatible; confirm the exact memory configuration and display requirements before choosing a compatible replacement.

<div align="center"><em>SF32LB55x Package-Level I/O Options</em></div>

<div align="center" markdown>

| Package | HCPU / LCPU GPIOs | Total GPIOs | Typical Design Fit |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | Compact wearable or BLE sensor product with lower PCB process cost |
| BGA145 | 55 / 40 | 95 | Display, memory, and sensor-rich design with more routing headroom |
| BGA169 | 71 / 42 | 113 | Highest-I/O SF32LB55x designs with the broadest integrated-memory and display options |

</div>

The following current models listed in SiFli's chip model guide make the package and memory trade-off explicit. The part-number suffixes in this older family do not consistently follow SiFli's newer naming convention, so use the full orderable part number rather than decoding the suffix by rule.

<div align="center"><em>Representative SF32LB55x Variants</em></div>

<div align="center" markdown>

| Part Number | Package | Integrated Memory | Model-Guide-Listed Display Interfaces | Selection Notes |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | Two 4 MB QSPI NOR devices configured as one 8 MB OSPI NOR device; no co-packaged PSRAM | QSPI, 8080 | 49 GPIOs; 2.97 V to 3.63 V; -20 °C to +70 °C; compact option without co-packaged PSRAM |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI NOR boot Flash + 4 MB OPI-PSRAM | QSPI, 8080 | 49 GPIOs; 1.71 V to 3.63 V; -20 °C to +70 °C; compact option with integrated PSRAM |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI NOR boot Flash + 4 MB OPI-PSRAM | MIPI DSI command mode, QSPI, 8080 | 95 GPIOs; -40 °C to +85 °C; a balanced BGA145 choice for display products that need 4 MB PSRAM |
| SF32LB555V436 | BGA145 | 4 MB QSPI NOR boot Flash + 8 MB OPI-PSRAM | MIPI DSI command mode, QSPI, 8080 | 95 GPIOs; -40 °C to +85 °C; the BGA145 option when the design needs twice the integrated PSRAM of SF32LB555V4O6 |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI NOR boot Flash + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSI command mode, QSPI, 8080, JDI/Sharp MIP | 113 GPIOs; -40 °C to +85 °C; supports MIPI DSI plus SPI/DSPI dual displays with independent content |

</div>

For SF32LB557VD3A6, the current SiFli Chip Model Guide and Table 0-1 in the DS5501 V1.7.2 datasheet list 71 HCPU + 42 LCPU = 113 GPIOs. The datasheet's feature and package summaries, as well as the PB0001 V1.3 Product Brief, instead give BGA169 119 GPIOs (71 HCPU + 48 LCPU). The official sources therefore conflict, including within the datasheet. This page follows the model-specific row and current model guide (113). Before assigning pins or finalizing the design, verify GPIO availability against the selected package's ball map and confirm the orderable part with SiFli. Also verify the variant's supply and temperature ratings, full part number, and integrated-memory configuration against the [DS5501 V1.7.2 datasheet][Datasheet], [PB0001 V1.3 Product Brief][Product Brief], and [SiFli Chip Model Guide]. The BGA145 and BGA169 packages measure 7 × 7 × 0.94 mm with 0.5 mm pitch.

## Integration Path

Use this sequence to turn an SF32LB55x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the required display, Bluetooth, and low-power behavior.
2. **Plan the evaluation hardware.** μForge does not currently catalogue an SF32LB55-specific module or development board. Use the [SF32 Product Selector](../product-selector.md) to select the closest available evaluation platform, then verify package and interface coverage before transferring results to a 55x design.
3. **Design and review the hardware.** Before releasing the schematic or layout, use the μForge [hardware design guide](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md), including its [schematic](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md) and PCB-layout checklists.
4. **Verify the authoritative source.** Confirm the exact orderable part and package against the SiFli [datasheet][Datasheet], [user manual][User Manual], [original design guide][Original Design Guide (wiki.sifli.com)], and [hardware application note source][Hardware Application Note (GitHub source)].

## Related Products

### Development Kits

Use the official hardware application note, reference schematics, and checklist as the starting point for package selection, power-tree definition, display-interface choice, memory planning, RF layout, and production-test planning.

### Reference Products

Typical SF32LB55x end products include smartwatches, fitness bands, health-monitoring wearables, smart locks, connected accessories, smart-home controllers, and compact graphical HMIs.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
