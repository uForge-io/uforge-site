---
icon: lucide/card-sim
description: "SF32LB52-MOD-1: low-power Bluetooth 5.3 MCU module family for SF32LB52x, with integrated RF circuitry, a 48 MHz crystal, and SKU-dependent antenna options."
tags:
  - Hardware
  - Module
---

# SF32LB52-MOD-1

## Overview

SF32LB52-MOD-1 is a low-power Bluetooth MCU module family built on the SF32LB52x platform. The standard N16R8 SKU uses SF32LB525UC6. The 27.9 × 18.0 × 3.1 mm module combines the dual-core Arm Cortex-M33 STAR-MC1 platform, RF circuitry, a 48 MHz crystal, and an antenna connection. Depending on the part number, it uses either an on-board PCB antenna or an IPEX connector for an external antenna.

DS5203 V0.3 documents an on-module PCB antenna and says an IPEX-connected external antenna is available on another model, but does not map antenna options to the published memory-SKU list. Confirm the exact antenna configuration with SiFli before finalizing the carrier-board layout. The finished product still requires RF validation and applicable product-level certification. The exposed interfaces provide the Bluetooth, graphics, and audio functions used in compact connected products.

Depending on the selected SKU, the chip package may include OPI-PSRAM. The module interface exposes key functions of the underlying chip family, including GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS, and analog audio.

!!! info
    For the underlying chip family, architecture, and peripheral set, see [SF32LB52x](../chips/SF32LB52x.md). This page focuses on module-level integration, power, package, and variant selection.

## Applications

**SF32LB52-MOD-1 is recommended for** products that need Bluetooth, graphics, and audio capability with lower RF and layout risk, including:

- Smartwatches, fitness bands, and wearable medical products
- Bluetooth sensor hubs and connected accessories
- Smart locks, smart-home devices, and compact appliances
- Small graphical HMI products
- Vehicle key fobs and wearable remote products
- Cost-sensitive connected display devices

Consider SF32LB52-MOD-1 when the product needs one or more of these capabilities:

- Module-level RF integration with PCB-antenna and external-antenna options
- Exposed interfaces for the chip platform's Bluetooth, graphics, and audio capabilities
- Reuse of SF32LB52x software and peripheral capability
- Compact module integration for space-constrained wearable or HMI products

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB52x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[Original Design Guide (wiki.sifli.com, EPD variant)]: https://wiki.sifli.com/en/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com, EPD variant)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- Arm Cortex-M33 STAR-MC1 application core (HCPU), up to 240 MHz, up to 370 DMIPS / 984 EEMBC CoreMark
- 32 KB instruction cache and 16 KB data cache
- 512 KB retention SRAM
- Dedicated ultra-low-power Arm Cortex-M33 STAR-MC1 core (LCPU), up to 24 MHz, with 64 KB retention SRAM
- Single-precision FPU and MPU on both cores
- Optional in-package OPI-PSRAM depending on module SKU

### Wireless Connectivity

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Sensitivity: -100 dBm (BLE/1 Mbps), -96.3 dBm (BR), -95.5 dBm (EDR2)
- Maximum transmit power: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- BR peak receive current: 2.4 mA @ 3.8 V

### Graphics and Display

- ePicasso 2.0 2D/2.5D graphics engine
- eZip 2.0 lossless graphics decompression accelerator
- LCD controller supporting 8080, SPI, Dual-SPI, and Quad-SPI interfaces
- Practical fit for compact watch-style or small-HMI display products

### Audio

- 1 × 24-bit audio DAC
- 1 × 24-bit Sigma-Delta audio ADC
- 1 × I2S interface
- 1 × PDM interface
- Analog audio input/output support exposed through the module interface

The PDM interface can connect up to two digital microphones; the number of PDM interfaces is not the microphone count. Actual connectivity depends on pin multiplexing and board routing. On this module, PA22/PA23 are unavailable externally when the optional 32.768 kHz crystal is populated; the hardware guide documents an alternate PDM pin mapping.

### Storage Interfaces

- Optional in-package OPI-PSRAM, depending on module SKU
- 1 × MPI (QSPI) for external SPI NOR or SPI NAND
- 1 × SD/SDIO supporting SD3.0, SDIO3.0, and eMMC

### Security

- AES, HASH, and CRC hardware accelerators
- True random number generator (TRNG)
- PSA Certified Level 1

### Power, Package, and I/O

- Module package: 27.9 × 18.0 × 3.1 mm
- Operating temperature: -40 to 85 °C
- VSYS: 3.2–4.7 V for direct Li-ion battery input, or 3.7–4.7 V from a regulated supply; 3.8 V is recommended.
- IO voltage: 3.3 V
- VBATS: 0–4.7 V battery-sense input that can also be used for ADC measurement. Connect the voltage to be measured directly; do not use an external resistor divider.
- VDD33_VOUT2: on-module 3.3 V LDO output for external peripherals. It is off by default and must be enabled in software; maximum output current is 150 mA, and total capacitance on the rail must not exceed 7.4 µF.
- 68-pin module interface; signal pins expose multiplexed functions including GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 FS, and digital and analog audio

## Module Variants

<div align="center"><em>SF32LB52-MOD-1 Module Variants</em></div>

<div align="center" markdown>

| Module Code | Chip | Flash | PSRAM | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40 to 85 °C | 27.9 × 18.0 × 3.1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | -40 to 85 °C | 27.9 × 18.0 × 3.1 mm |

</div>

The [SiFli module-model guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) and EPD application guide also list A128R16, but the linked DS5203 V0.3 datasheet lists only N16R8. Confirm current availability and memory configuration with SiFli before selecting A128R16.

The A128R16 Flash labels differ across the official sources: the [OpenSiFli module-model guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) identifies 128 MB SPI-NAND, while SiFli's [board-model guide](https://wiki.sifli.com/board/devkit_guide.html) lists 128 MB QSPI-NAND for the corresponding DevKit SKU. The sources do not explain whether this reflects the fitted part or interface wording. Confirm the Flash part and bus mode against the schematic/BOM for the exact board revision before using the board configuration as a module baseline.

## Related Products

### Chip

The [SF32LB52x](../chips/SF32LB52x.md) page covers family-level architecture and peripherals; see the variant table above for the chip and memory mapping of each listed module SKU.

### Development Kits

The [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md), [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md), [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md), and [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) are practical starting points for firmware validation before moving to a custom module carrier design.

### Reference Products

Typical end products include entry-to-mid-tier smartwatches, fitness bands, Bluetooth sensor hubs, smart locks, and compact graphical HMI devices.
