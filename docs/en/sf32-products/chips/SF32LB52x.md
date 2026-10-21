---
icon: lucide/microchip
description: "SF32LB52x: cost-optimized dual-core Arm Cortex-M33 AIoT MCU family for wearables and compact AIoT products, in battery-powered and external-supply variants."
tags:
    - Hardware
    - Chip
---

# SF32LB52x

## Overview

SF32LB52x is SiFli's cost-optimized MCU family for entry-level smart wearables, compact graphical HMIs, Bluetooth peripherals, and other space-constrained AIoT products that still need integrated display, audio, storage, and wireless capability.

At the platform level, the family combines a 240 MHz Arm Cortex-M33 STAR-MC1[^1] application core with a dedicated 24 MHz low-power Bluetooth controller core, enabling the chip to run a responsive UI and application stack while keeping Bluetooth connectivity and always-on workloads separate.

For product planning, the key variants in SiFli's chip model guide fall into two supply-oriented groups:

- **SF32LB520/3/5/7**: lithium-ion battery-powered variants with an integrated charger path
- **52B/D/E/G/J**: external-supply variants, where 52B/E/G/J target standard 3.3V systems and **52D** targets a special 1.8V ultra-low-power rail

These groups are not interchangeable at the board level. The battery-powered and external-supply families are not pin compatible with each other, and the 1.8 V 52D variant is electrically distinct from the 3.3 V 52B/E/G/J group even when their package layouts appear similar.

[^1]: STAR-MC1 is a configurable Armv8-M Mainline embedded CPU IP from Arm China. In compatible SF32 devices, SiFli documents it as an Arm Cortex-M33 STAR-MC1 application processor. Its Cortex-M33-class software model helps existing Cortex-M33 firmware, middleware, RTOS ports, and tools carry forward, subject to normal device-specific integration work. Its CU, SP, and SE configurations vary chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities that must be verified for the exact SF32 part. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

## Applications

**SF32LB52x is recommended for** Bluetooth-centric products where cost, integration, and battery life are the primary design considerations, including:

- Entry-level smartwatches and fitness bands
- Bluetooth modules and wireless adapters
- Bluetooth audio accessories
- Smart sensors and wearable devices
- Electronic shelf labels and smart badges
- Portable label printers
- eBike and eScooter displays
- Basic LVGL-based HMI devices

## Development Resources

[Product Brief (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-Product%20Brief.pdf
[Datasheet (SF32LB520/3/5/7)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-Datasheet%20V2p5p5.pdf
[Product Brief (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-Product%20Brief%20V0p1.pdf
[Datasheet (SF32LB52X external-supply family)]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-Datasheet%20V0p2p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-User%20Manual%20V0p8p8.pdf
[Hardware Design Guide (520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[Hardware Design Guide (52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad Files]:
[Schematic]:
-->

[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB520/3/5/7)]__
- :fontawesome-solid-file-pdf: __[Product Brief (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[Datasheet (SF32LB52X external-supply family)]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (520/3/5/7)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- Arm Cortex-M33 STAR-MC1 application core up to 240MHz, with DSP and MPU
- Dedicated Arm Cortex-M33 STAR-MC1 Bluetooth controller core at 24MHz
- 32 KB instruction cache + 16 KB data cache
- 512 KB application SRAM plus 64 KB Bluetooth-controller SRAM
- Variant-dependent co-packaged memory options ranging from 1MB QSPI-NOR to 16MB OPI-PSRAM

### Graphics and Audio

- ePicasso 2.0 2D/2.5D graphics accelerator
- eZip 2.0 hardware decoder for lossless graphics compression
- Dedicated LCD controller supporting SPI/DSPI/QSPI, including e-paper SPI, plus 8080-8bit
- 1x 24-bit Audio ADC with 99 dB SNR
- 1x 24-bit Audio DAC with 109 dB SNR

### Wireless Connectivity

- Dual-mode Bluetooth 5.3 (Classic Bluetooth and BLE)
- Maximum transmit power:
    - 19 dBm for BLE/BR
    - 13 dBm for BT/EDR2 and BT/EDR3
- Sensitivity: -100 dBm @ BLE/1Mbps
- Dedicated Arm Cortex-M33 STAR-MC1 Bluetooth-controller core with 64 KB SRAM @ 24 MHz
- Sleep current: 2 µA in the product brief; system-level standby current depends on the operating mode and board-level leakage

### Security

- AES/HASH/CRC hardware accelerators
- TRNG
- PSA Certified Level 1

### Peripherals and I/Os

- 3x UART
- 4x I2C
- 2x SPI
- 1x USB2.0 FS
- 1x I2S
- 1x PDM interface (up to two digital microphones)
- 1x SD3.0/SDIO3.0/eMMC
- 1x 12-bit general-purpose ADC
- Temperature sensor
- RTC and watchdog timers
- 44 or 45 GPIOs depending on variant family

### Power Supply

- **Battery-powered group: SF32LB520/3/5/7** — powered directly from a single-cell Li-ion/Li-Po battery and intended for designs that use the integrated charging-oriented power architecture.

- **External-supply 3.3V group: 52B/E/G/J** — intended for regulated external-supply systems and pin compatible with one another.

- **External-supply 1.8V group: SF32LB52D** — intended for special ultra-low-power 1.8V designs and not electrically interchangeable with the 3.3V parts.

The battery-powered and external-supply groups are independent silicon configurations and are **not pin compatible** across those supply families.

## Family Variants

For the key variants listed in SiFli's chip model guide, the practical part-selection split is:

- **SF32LB520/3/5/7**: lithium-ion battery-powered group, pin compatible within the group
- **52B/E/G/J**: standard 3.3V external-supply group, pin compatible within the group
- **SF32LB52D**: special 1.8V external-supply variant for ultra-low-power scenarios

If you are migrating between memory tiers, the nearest content-correspondence map is:

- 520 ↔ 52B
- 523 ↔ 52E, with 52D as the 1.8V counterpart
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>Key SF32LB52x Variants</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| Package | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| Size | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm | 7 × 7 × 0.85mm |
| Pitch | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm |
| GPIOs | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| Co-packaged memory | 1MB QSPI-NOR | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM | 1MB QSPI-NOR | 4MB QSPI-NOR | 4MB OPI-PSRAM | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM |
| Power supply range | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 2.97–3.63 V | 2.97–3.63 V | 1.71–1.98 V | 2.97–3.63 V | 2.97–3.63 V | 2.97–3.63 V |
| I/O voltage | 3.3V | 3.3V | 3.3V | 3.3V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V |
| Temperature | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

This table follows the key variants in SiFli's [Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html); it is not a complete ordering catalog. The linked external-supply datasheet also lists **SF32LB52HUD6** (1.8 V, QFN68L, 128 Mb PSRAM), while the hardware guide uses the additional suffix patterns `52AUx6` and `52D/F/HUx6`. The available sources do not provide a single, consistent variant table. Before design release, verify the ordering status, supply limits, memory interface, and I/O details of any such SKU in its current datasheet.

## Integration Path

Use this sequence to turn an SF32LB52x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the required peripherals and Bluetooth behavior.
2. **Choose the integration vehicle.** Evaluate [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) when a ready-integrated RF module suits the product; otherwise select the closest [SF32LB52 development board](../devkits/SF32LB52-DevKit-LCD.md) for early firmware and peripheral validation.
3. **Design and review the hardware.** Use the local [hardware design guide](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) — including its [schematic](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md) and [PCB layout](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md) checklists — before releasing the schematic or layout. Confirm the correct supply-family baseline: 520/3/5/7, 52B/E/G/J, or 52D.
4. **Verify the authoritative source.** Check the applicable [datasheet](#development-resources) and SiFli [hardware design guide for 520/3/5/7] or [hardware design guide for 52B/D/E/G/J] against the exact orderable part and package.

<!-- uf-faq:start -->
## Frequently Asked Questions

**What are the key specifications of SF32LB52x?**
SF32LB52x pairs an application CPU (Cortex-M33 @240 MHz) with a low-power core (Cortex-M33 @24/48 MHz, a dedicated Bluetooth controller), 576 KB of internal SRAM and dual-mode Bluetooth (BT Classic + BLE). Graphics: ePicasso 2.0 Lite. Package: QFN68 (7 × 7 mm). USB 2.0 FS. Family-level values; verify the exact part number's datasheet.

**Which display interfaces does SF32LB52x support?**
SPI / DSPI / QSPI / 8080 / EPD / JDI. Availability varies by part number and package.

**How much in-package memory does SF32LB52x offer?**
Up to 16 MB of in-package PSRAM and up to 4 MB of in-package NOR Flash, depending on the part number.

**What supply voltage does SF32LB52x need?**
3.2–4.7 V (520/3/5/7), 2.97–3.63 V (52B/E/G/J), 1.8 V (52D), depending on the variant. Confirm the exact range in the datasheet.

**Where do I start a hardware design with SF32LB52x?**
Start with the [SF32LB52x hardware design guide](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md) for schematic, power, clock/RF and PCB layout guidance, then use the schematic and layout checklists before releasing the board.
<!-- uf-faq:end -->

## Related Products

### Module

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) combines the SF32LB525UC6, which has 8 MB of co-packaged OPI-PSRAM in the standard configuration, with an RF matching network. The module measures 27.9 × 18.0 × 3.1 mm and suits projects that need SF32LB52-class capability without taking on chip-level RF layout and validation.

### Development Kits

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) is the main display-oriented bring-up board for the SF32LB52 module ecosystem, with QSPI and MCU/8080 LCD connectivity.
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) is the compact external-supply core board for quick firmware, GPIO, and low-power bring-up on 52B/52J-class parts.
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) is the smallest 52-series dev board, useful when the target product is size constrained.
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) is the low-power-oriented board path for battery-focused evaluation and compact product experiments.

### Reference Products

Typical SF32LB52 designs include entry-level smartwatches, fitness bands, Bluetooth accessories, compact graphical controls, electronic shelf labels, smart badges, portable label printers, and cost-sensitive eBike or eScooter displays.
