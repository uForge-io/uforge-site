---
icon: lucide/microchip
description: "SF32LB58x: flagship-tier AIoT MCU family for connected products with substantial graphics, display, memory, and peripheral requirements."
tags:
    - Hardware
    - Chip
---

# SF32LB58x

## Overview

The SF32LB58x series occupies the flagship tier of the SF32LB5x family. It targets battery-powered AIoT products that need advanced graphics, large memory capacity, dual-mode Bluetooth, rich audio/display I/O, and high GPIO density without moving to a larger application-processor platform.

SF32LB58x uses a heterogeneous three-core Arm Cortex-M33 STAR-MC1[^1] architecture. The HCPU and ACPU are high-performance cores running at up to 240 MHz; the LCPU runs at up to 96 MHz and targets power-sensitive work. The HCPU handles system control, the user interface, and general application processing; the ACPU can take on audio-DSP workloads; and the LCPU is suited to Bluetooth LE, sensor acquisition, and other low-power tasks. This partitioning can let firmware power down the HCPU during suitable workloads, although the actual savings depend on the application and its firmware.

SiFli documents 3,744 KB of on-chip SRAM and SKU-dependent combinations of co-packaged NOR Flash and OPI-/HPI-PSRAM. The family also provides display support including MIPI DSI, vector-graphics acceleration, USB 2.0 High-Speed, and a BGA package with a high I/O count. Evaluate SF32LB58x when a design needs a high-resolution UI, substantial graphics assets, external Wi-Fi through SDIO, or the compute and memory resources for edge-AI or sensor-fusion workloads.

[^1]: STAR-MC1 is a configurable Armv8-M Mainline embedded CPU IP from Arm China. In compatible SF32 devices, SiFli documents it as an Arm Cortex-M33 STAR-MC1 application processor. Its Cortex-M33-class software model helps existing Cortex-M33 firmware, middleware, RTOS ports, and tools carry forward, subject to normal device-specific integration work. Its CU, SP, and SE configurations vary chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities that must be verified for the exact SF32 part. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

## Applications

**SF32LB58x is recommended for** premium connected products that need larger framebuffers, richer displays, more memory, and denser high-speed I/O, including:

- Premium smartwatches and sports watches
- High-resolution wearable HMIs
- Cycling computers and smart dashboards
- Portable medical and industrial terminals
- Bluetooth + external Wi-Fi accessories
- Edge-AI and sensor-fusion systems
- Display-centric connected controllers

Choose SF32LB58x when the design needs one or more of these capabilities:

- Display resolution at or above 1024 × 600
- MIPI DSI command-mode or video-mode display support
- Vector graphics, richer animation, or larger UI assets
- External Wi-Fi over SDIO
- Large framebuffer, audio, graphics, or AI-model memory
- High GPIO count or multiple high-speed external interfaces

## Development Resources

[Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[Hardware Application Note (GitHub source)]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-brands-github: __[Hardware Application Note (GitHub source)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs

### Compute and Memory

- Three Arm Cortex-M33 STAR-MC1 cores: HCPU and ACPU up to 240 MHz; LCPU up to 96 MHz
- 3,744 KB on-chip SRAM
- Co-packaged NOR Flash options from 1 MB to 8 MB total across the package, depending on SKU
- Co-packaged OPI-PSRAM and HPI-PSRAM options; HPI-PSRAM is available up to 2 × 32 MB, depending on SKU
- External NOR or SPI NAND Flash through MPI3/MPI4; SD NAND, eMMC, SD cards, or external Wi-Fi through SDIO. Available combinations depend on interface selection and pin assignment.

### Graphics, Display, and AI

- ePicasso 2.0 2D/2.5D graphics accelerator
- Vivante GCNanoUltraV vector graphics engine
- eZip 2.0 lossless graphics-decompression accelerator
- Hardware JPEG/MJPEG encoding and decoding, with image cropping and scaling
- Neural-network matrix accelerator for TinyML workloads
- Display resolutions up to 1280 × 800
- MIPI DSI command-mode and video-mode display support
- SPI, DSPI, QSPI (including SPI e-paper), MCU8080, JDI, RGB/DPI (RGB888 or RGB565), and MIPI DSI display interfaces
- Supports two displays with different content, using MIPI DSI together with SPI, DSPI, or QSPI
- Suitable for local edge-AI, machine-learning, and sensor-fusion workloads

### Audio and Wireless Connectivity

- Dual-mode Bluetooth 5.3
- Support for Bluetooth Classic and Bluetooth LE
- External Wi-Fi connectivity through SDIO
- 2x integrated audio ADCs
- 2x integrated audio DACs
- 2 PDM interfaces, each able to serve up to two digital microphones; the interface count is not the microphone count, and usable connections also depend on pin multiplexing and board routing
- 3 I2S interfaces: I2S1 is input-only; I2S2 and I2S3 support input and output. All operate in master mode.
- USB 2.0 High-Speed in host and device modes

### System Integration { #system-integration }

- Integrated PMU with two BUCK outputs and three LDO outputs
- Optional SF30147C PMIC support for wearable power-tree designs
- BGA256 suits high-density MCU designs that combine display, storage, audio, and connectivity
- On-chip SRAM, in-package PSRAM options, and display interfaces support graphics- and memory-intensive designs

### Peripherals and I/Os { #peripherals-and-ios }

**GPIO-count note:** The current [SiFli Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lists 94 HCPU and 66 LCPU GPIOs (160 total) for the SF32LB58x variants shown. An earlier SiFli datasheet breaks this down as 94 HPSYS and 60 LPSYS GPIOs plus 6 AON GPOs (154 GPIOs + 6 AON GPOs). The sources classify those six always-on outputs differently, so the category totals alone do not establish a different package-pin count or mean that all 160 pins are freely assignable GPIOs. The [SiFli product index](https://wiki.sifli.com/silicon/index.html) links the current V1.8.6 datasheet. Before PCB layout, verify the GPIO count and pin-function table for the exact orderable part in that datasheet. SiFli's [GPIO FAQ](https://wiki.sifli.com/en/faq/mcu/gpio.html) treats PBR as a separate low-power I/O bank; do not add it to the HCPU/LCPU count unless the source explicitly includes it.

- 160 GPIOs (94 HCPU + 66 LCPU, per the current Chip Model Guide)
- 2x CAN interfaces
- 2x SDIO interfaces
- SWD debug interface
- 6 UART interfaces selectable for debug output
- RTC, watchdog, GPIO wake, PBR wake, PWM, I2C, SPI, and general-purpose analog interfaces
- BGA256 package for high-density designs

### Power Supply and Package

- Power-supply range: 1.71 V to 3.63 V
- BGA256 package, 6.5 × 8.5 × 0.94 mm, 0.4 mm pitch
- HDI PCB required; 6HDI-2 stack-up is recommended for production designs

## Family Variants

The current SiFli Chip Model Guide lists six SF32LB58x order codes, all in BGA256, with the co-packaged memory configurations shown below. Confirm the exact order code against the current datasheet and approved vendor list (AVL), because configurations and availability can change.

<div align="center"><em>SF32LB58x Order Codes and Co-Packaged Memory</em></div>

<div align="center" markdown>

| Part Number | Package | Co-Packaged Memory |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 MB boot NOR Flash; no memory co-packaged on MPI1 or MPI2 |
| SF32LB581VCN36 | BGA256 | 1 MB boot NOR Flash + 8 MB OPI-PSRAM on MPI1 |
| SF32LB583VCC36 | BGA256 | 1 MB boot NOR Flash + 2 × 8 MB OPI-PSRAM on MPI1 and MPI2 |
| SF32LB585V5E56 | BGA256 | 4 MB boot NOR Flash + 4 MB NOR Flash on MPI1 + 32 MB HPI-PSRAM on MPI2 |
| SF32LB586VDD36 | BGA256 | 1 MB boot NOR Flash + 2 × 16 MB HPI-PSRAM on MPI1 and MPI2 |
| SF32LB587VEE56 | BGA256 | 4 MB boot NOR Flash + 2 × 32 MB HPI-PSRAM on MPI1 and MPI2 |

</div>

When selecting a variant, check these items first:

- Required framebuffer, asset, audio, and model-memory size
- Display interface and target resolution
- External storage and Wi-Fi interface requirements
- PCB manufacturing capability for BGA256, 0.4mm-pitch HDI layout

## Integration Path

Use this sequence to turn an SF32LB58x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the display, graphics, audio, storage, and Bluetooth configuration.
2. **Choose the integration vehicle.** Evaluate [SF32LB58-MOD](../modules/SF32LB58-MOD.md) when reducing RF, BGA, and memory-layout risk is valuable, or use [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) for early board-level validation.
3. **Design and review the hardware.** Use the local [hardware design guide](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) — including its [schematic](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md) and [PCB layout](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md) checklists — before releasing the schematic or layout. Validate the BGA256 HDI and memory-routing assumptions early.
4. **Verify the authoritative source.** Confirm the exact orderable part and package against the SiFli [datasheet], [user manual], [Original Design Guide (wiki.sifli.com)], and [Hardware Application Note (GitHub source)].

<!-- uf-faq:start -->
## Frequently Asked Questions

**What are the key specifications of SF32LB58x?**
SF32LB58x pairs an application CPU (2× Cortex-M33 @240 MHz) with a low-power core (Cortex-M33 @48/96 MHz, a user-programmable core), 3.7 MB of internal SRAM and dual-mode Bluetooth (BT Classic + BLE). Graphics: ePicasso 2.0 + Vivante GCNanoUltraV (vector). Package: BGA256 (8.5 × 6.5 mm). USB 2.0 HS. Family-level values; verify the exact part number's datasheet.

**Which display interfaces does SF32LB58x support?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI. Availability varies by part number and package.

**How much in-package memory does SF32LB58x offer?**
Up to 32 MB + 32 MB of in-package PSRAM and up to 8 MB of in-package NOR Flash, depending on the part number.

**What supply voltage does SF32LB58x need?**
1.71–3.63 V, depending on the variant. Confirm the exact range in the datasheet.

**Where do I start a hardware design with SF32LB58x?**
Start with the [SF32LB58x hardware design guide](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md) for schematic, power, clock/RF and PCB layout guidance, then use the schematic and layout checklists before releasing the board.
<!-- uf-faq:end -->

## Related Products

### Module

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) packages the SF32LB586VDD36 chip, its RF matching network, and in-package HPI-PSRAM plus storage options into a ready-to-integrate module. Use it when the project needs 58-series capability but should reduce RF, BGA, and memory-layout risk early in hardware development.

### Development Kits

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) is the starting point for power-tree, display, storage, audio, RF, USB, and SDIO design decisions.

### Reference Products

Typical SF32LB58x end products include premium watch platforms, high-resolution wearable HMIs, smart dashboards, portable connected terminals, and devices that combine Bluetooth, display, audio, storage, and local AI workloads.
