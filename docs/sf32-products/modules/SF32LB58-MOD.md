---
icon: lucide/card-sim
description: "SF32LB58-MOD: low-power Bluetooth MCU module based on SF32LB586VDD36, with standard 16 + 16 MB HPI-PSRAM, 1 MB QSPI-NOR, and NOR, NAND, or eMMC storage variants."
tags:
  - Hardware
  - Module
---

# SF32LB58-MOD

## Overview

SF32LB58-MOD is a low-power Bluetooth MCU module based on SiFli's SF32LB586VDD36. The standard configuration includes 16 + 16 MB of HPI-PSRAM and 1 MB of QSPI-NOR. The 24 × 24 × 3.1 mm module combines the triple-core platform, RF path, crystal, and memory options with external interfaces for display, audio, storage, and control.

The module integrates the BGA256 device, RF path, crystal, and high-speed memory within the module, reducing the amount of related routing on the product carrier board. The finished product still requires RF validation and applicable regulatory approvals. Confirm the antenna option and memory configuration for the selected SKU before finalizing the carrier-board design.

Depending on the selected module SKU, the platform can combine HPI-PSRAM with QSPI-NOR, QSPI-NAND, or eMMC storage. The module's interfaces support products that need display, audio, storage, and connectivity capabilities while retaining an MCU-class platform.

DS5802 V0.1 identifies an on-module PCB antenna and external-antenna configurations. An external antenna may connect through castellated pads or the first-generation external antenna connector, which is compatible with Hirose U.FL, I-PEX MHFI, and Amphenol AMC connectors. The datasheet does not map these options to individual SKUs, so confirm the antenna implementation of the selected module with SiFli before finalizing the carrier-board layout.

!!! info
    For the underlying chip family, architecture, and peripheral set, see [SF32LB58x](../chips/SF32LB58x.md). This page focuses on module-specific integration, memory variants, power rails, and product-fit decisions.

## Applications

SiFli lists the following application areas for SF32LB58-MOD:

- Wearables: high-end smartwatches, smart bands, wearable medical devices, and fitness equipment
- Industrial: cost-effective display solutions, graphical HMI, industrial sensor-control centers, equipment monitoring, and instruments
- Automotive: electric-vehicle central-control devices, car keys, and wearable remote controls for vehicles
- Home automation: small and medium-sized smart appliances and smart locks
- General: low-power sensor hubs and Bluetooth Mesh
- AIoT examples: voice-command recognition, smart-home devices, smart keys, and smart control panels

Consider SF32LB58-MOD when the design needs one or more of these capabilities:

- Module-level integration of the BGA256 device, RF path, crystal, and high-speed memory
- On-module PCB antenna or external antenna routed through castellated pads or a connector compatible with Hirose U.FL, I-PEX MHFI, and Amphenol AMC connectors; confirm the SKU configuration
- Memory choices spanning QSPI-NOR, QSPI-NAND, and eMMC configurations
- External interfaces for display, audio, storage, and control

## Development Resources

[Module Datasheet]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[Chip Introduction]: ../chips/SF32LB58x.md
[Hardware Design Guide]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Module Datasheet]__
- :fontawesome-solid-microchip: __[Chip Introduction]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specifications

### Compute and Memory

- 2 × Arm Cortex-M33 STAR-MC1 application cores, up to 240 MHz
- 1 × user-programmable Arm Cortex-M33 STAR-MC1 low-power core, up to 96 MHz
- Up to 370 DMIPS / 984 EEMBC CoreMark per application core
- Up to 148 DMIPS / 394 EEMBC CoreMark on the low-power core
- 2176 KB SRAM (HCPU) + 512 KB SRAM (ACPU) + 1056 KB retention SRAM (LCPU)
- Single-precision FPU and MPU on all cores

### Wireless Connectivity

- Dual-mode Bluetooth 5.3 with BLE Audio support
- Sensitivity down to -107.5 dBm for BLE Long Range at 125 kbps
- Maximum transmit power: 19 dBm (BR/BLE), 13 dBm (EDR2/EDR3)
- BR/EDR2/EDR3 peak receive current: 2.2 mA @ 3.3 V

### Graphics, Display, and Multimedia

- ePicasso 2.0 2D/2.5D graphics engine
- Vivante GCNanoUltraV vector graphics engine
- Hardware JPEG codec
- Dual LCD controllers supporting 8080, SPI, Dual-SPI, Quad-SPI, DPI/RGB, MIPI DSI, and JDI
- TurboPixel: extDMA compresses the final framebuffer using fixed-ratio lossy compression, and the display controller decompresses it. This reduces the PSRAM bandwidth and framebuffer capacity required by a given workload.
- Always-on-display support on both LCD controllers

### Audio

- 2 × 24-bit audio DACs
- 2 × 24-bit Sigma-Delta ADCs
- 2 × PDM interfaces (PDM1/PDM2)
- 3 × I2S interfaces, all in master mode; I2S1 is input-only, while I2S2 and I2S3 support input and output
- Analog audio input/output support exposed through the module interface

The [SF32LB58x hardware design guide](https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html) lists two PDM microphone inputs (PDM1 and PDM2). A single PDM interface can carry two microphone channels: SiFli's [PDM SDK example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) demonstrates two-microphone capture on the left and right channels of one interface, or four-microphone capture across PDM1 and PDM2. However, the example does not list SF32LB58-MOD as a supported platform. For this module, verify the intended microphone/channel configuration in the target SDK and check pin multiplexing and carrier-board routing; do not infer four-microphone support from the two-interface count alone.

### Storage Interfaces and Module Variants

<div align="center"><em>SF32LB58-MOD Module Variants</em></div>

<div align="center" markdown>

| Module Code | Selectable Storage | PSRAM | Standard Flash | Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40 to 85 °C | 24 × 24 × 3.1 mm |

</div>

The [SiFli Module Model Guide](https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lists these variants, notes that eMMC may be included as an internal device, and states that other configurations can be customized. Select a SKU based on the required storage medium and capacity, then confirm availability and memory configuration with SiFli. Also verify that the selected device and boot/storage path are supported by the target SDK and firmware.

### Power, Package, and I/O

- Module package: 24 × 24 × 3.1 mm
- Operating temperature: -40 to 85 °C
- VDD_3V3: 2.97–3.6 V
- VDD_1V8: 1.7–1.95 V
- VDDIOA / VDDIOA2 / VDDIOB: 1.7–3.6 V
- VDD_3V3 supplies AVDD33_ANA, AVDD33_AUD, and AVDD_USB; when eMMC is fitted, it also supplies the eMMC VDD input. SiFli recommends an LDO for this rail.
- VDD_1V8 supplies PVDD1, PVDD2, AVDD_BRF, and AVDD18_DSI, as well as the co-packaged memory.
- VDDIOA supplies PA I/O except PA00–PA11, the external Flash, and eMMC VIO when eMMC is fitted. VDDIOA2 supplies PA00–PA11; VDDIOB supplies PB I/O.
- 138-pin module interface; multiplexed pins expose functions including GPIO, SPI, LCD, MPI, UART, I2C, PWM, SDIO, USB 2.0 HS, and audio

## Related Products

### Chip

Built on [SF32LB58x](../chips/SF32LB58x.md). Use the chip page for the broader graphics, memory, and display architecture behind the module.

### Development Kits

The [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) board is a practical starting point for firmware validation, display bring-up, and audio/storage-path checks before moving to a custom carrier design around the module.

### Reference Products

SiFli's documented application areas include wearables, industrial display and HMI equipment, vehicle-control products, smart-home appliances, low-power sensor hubs, and Bluetooth Mesh products.
