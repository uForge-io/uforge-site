---
icon: lucide/card-sim
description: "SF32LB56-MOD: general-purpose low-power Bluetooth 5.3 MCU module family based on SF32LB56xV, with 4 MB + 8 MB of co-packaged OPI-PSRAM and SKU-dependent Flash variants."
tags:
  - Hardware
  - Module
---

# SF32LB56-MOD

## Overview

SF32LB56-MOD is SiFli's general-purpose, low-power Bluetooth MCU module family based on the SF32LB56xV platform. The standard configuration uses an SF32LB566VCB36 with 4 MB + 8 MB of co-packaged OPI-PSRAM and 1 MB of QSPI-NOR. The module combines dual-core MCU processing, Bluetooth 5.3 with BLE Audio support, graphics acceleration, audio interfaces, SKU-dependent Flash variants, and an integrated RF path in a compact form factor.

The module integrates the RF path, crystal, and high-speed memory, and supports either an on-module PCB antenna or an external antenna connected through an IPEX-compatible connector. Validate RF performance in the finished product, and design the carrier board around the selected antenna arrangement. The module's interfaces and memory configurations support products with display, audio, sensing, and local-processing requirements.

The family is available in multiple memory configurations. All variants measure 18.0 × 32.9 × 3.1 mm and are rated for operation from -40 to 85 °C. The [SF32LB56-MOD hardware design guide](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md), based on DS5602 V0.3, provides further antenna and layout details. The SiFli module-model guide lists the memory configurations but does not map antenna options to SKUs. Confirm the antenna arrangement of the selected module with SiFli before finalizing the carrier-board layout.

!!! info
    The compute, graphics, and audio features below describe the SF32LB56xV platform integrated in the module; external availability depends on the module pinout and pin multiplexing. For the chip family's architecture and full peripheral set, see [SF32LB56x](../chips/SF32LB56x.md). This page focuses on module integration, SKU-dependent memory, power rails, and product fit.

## Applications

SiFli lists the following application areas for SF32LB56-MOD:

- Wearables: high-end smartwatches, smart bands, wearable medical devices, and fitness equipment
- Industrial: cost-effective display solutions, graphical HMI, industrial sensor-control centers, equipment monitoring, and instruments
- Automotive: electric-vehicle central-control devices, car keys, and wearable vehicle remotes
- Home automation: small and medium-sized smart appliances and smart locks
- General: low-power sensor hubs and Bluetooth Mesh
- AIoT examples: voice-command recognition, smart-home devices, smart keys, and smart control panels

Consider SF32LB56-MOD when the design needs one or more of these capabilities:

- Module-level integration of the RF path, antenna option, crystal, and high-speed memory
- Memory configuration choices across the listed module SKUs
- Interfaces for display, audio, sensing, and local processing
- Compact module dimensions for space-constrained products

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[Chip Introduction]: ../chips/SF32LB56x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x Hardware Design Guide]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-file-lines: __[SF32LB56x Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- HCPU: Arm Cortex-M33 STAR-MC1, up to 240 MHz, up to 370 DMIPS / 984 EEMBC CoreMark
- LCPU: Arm Cortex-M33 STAR-MC1, up to 96 MHz, up to 148 DMIPS / 394 EEMBC CoreMark
- HCPU memory system: 32 KB instruction cache, 16 KB data cache, and 800 KB SRAM, including 128 KB retention SRAM
- LCPU memory system: 16 KB instruction cache, 8 KB data cache, and 160 KB retention SRAM
- Single-precision FPU and MPU on both cores
- Neural-network matrix accelerator and signal-processing accelerators for richer local workloads

### Wireless Connectivity

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Sensitivity: -100 dBm BLE 1 Mbps, -96.3 dBm BR, -95.5 dBm EDR2, -88.5 dBm EDR3
- Maximum transmit power: 19 dBm for BR/BLE, 13 dBm for EDR2/EDR3
- BR peak receive current: 2.2 mA at 3.3 V

### Graphics and Display

- ePicasso 2.0 2D/2.5D graphics engine
- Hardware rotation, scaling, mirroring, and alpha blending
- Graphics workloads up to 1024 × 1024
- eZip 2.0 lossless graphics decompression and eZip-A animation support
- LCD support for 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, and JDI
- TurboPixel: extDMA compresses the final framebuffer using fixed-ratio lossy compression, and the display controller decompresses it. This reduces the PSRAM bandwidth and framebuffer capacity required by a given workload.

### Audio

- 1 × 24-bit audio DAC
- 1 × 24-bit Sigma-Delta audio ADC
- 2 × PDM interfaces (PDM1/PDM2), each supporting left/right microphone channels
- 1 × I2S interface
- Audio sample-rate conversion and EQ acceleration

Each PDM interface can serve up to two digital microphones, so the two interfaces can support up to four microphones in total. PDM interface count is not microphone count; actual connectivity depends on pin multiplexing and board routing.

### Memory and Module Variants

<div align="center"><em>SF32LB56-MOD Memory Configurations</em></div>

<div align="center" markdown>

| Module Code | Flash by SKU | PSRAM | Standard Flash | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 18.0 × 32.9 × 3.1 mm |

</div>

The [SiFli Module Model Guide](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lists these three configurations and notes that other configurations can be customized. Confirm current SKU availability and memory configuration with SiFli.

SiFli identifies SF32LB566VCB36 with 4 MB + 8 MB OPI-PSRAM and 1 MB QSPI-NOR as the standard configuration; this matches the N16R12N1 memory configuration. The model guide does not assign a chip part number to A128R12N1 or D128R12N1 individually; confirm the exact chip part number for either SKU with SiFli.

### Power and I/O

- VDD_3V3 recommended operating range: 2.97–3.6 V
- VDD_1V8 recommended operating range: 1.7–1.95 V
- VDDIO recommended operating range: 1.7–3.6 V
- VDD_3V3, VDD_1V8, and VDDIO must power up together
- PA00–PA11 interface level is fixed at 3.3 V and does not follow VDDIO
- 89-pin module interface
- Operating temperature: -40 to 85 °C

## Related Products

### Chip

Built on [SF32LB56x](../chips/SF32LB56x.md), specifically the SF32LB56xV platform family. Use the chip page for the broader architecture, display, audio, and package context behind the module.

### Development Kits

The [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) is a practical platform for validating display, audio, storage, and peripheral drivers. Its documentation lists N16R12N1 and A128R12N1 configurations; verify the module marking and board revision before using its memory setup as a design baseline.

### Reference Products

SiFli's documented application areas include wearables, industrial display and HMI equipment, vehicle-control products, smart-home appliances, low-power sensor hubs, and Bluetooth Mesh products.
