---
icon: lucide/cpu
description: "SF32LB5xx family overview: heterogeneous Cortex-M33 cores, Bluetooth, ePicasso graphics, and edge AI, with a comparison table and quick chip-selection guide."
tags:
  - Hardware
  - Chip
---

# SF32 Family

## Introduction

The **SF32** family, particularly the **SF32LB5xx** series, is a portfolio of highly integrated, ultra-low-power 32-bit microcontrollers developed by SiFli Technologies for battery-powered AIoT and wearable applications.

Designed to fill the gap between traditional microcontrollers and application processors, **SF32** devices combine low-power sensor processing, wireless connectivity, graphics acceleration, multimedia processing, and large-capacity integrated memory in a compact System-in-Package (SiP) architecture. The family is designed for products such as smartwatches, fitness trackers, smart displays, portable medical devices, and connected accessories with edge-processing capabilities.

The **LB** (Low-Power Bluetooth) series is the first SF32 product line. Additional application-focused series are planned.

## Hardware Workflows

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **Plan a Product**

    Follow one path from product requirements and device selection through board validation and production readiness.

    [Plan a Product :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **SF32 Product Selector**

    Compare SF32 families, select a chip or module, and identify the right development board for early validation.

    [Build a shortlist :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **Design for Production**

    Move from a selected part to schematic, layout, BOM, CAD, checklist, and bring-up evidence.

    [Plan production work :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## Key Features

1. **Heterogeneous Multi-Core Architecture**

    SF32LB microcontrollers employ an Arm Cortex-M33 STAR-MC1 based heterogeneous multi-core architecture that balances high-performance application processing with ultra-low-power background operation. Depending on the device, the architecture may include one or more application processors alongside dedicated low-power processors responsible for Bluetooth connectivity, sensor processing, and always-on system functions.

    !!! info "STAR-MC1 Processor"
        STAR-MC1 is a configurable Armv8-M Mainline CPU IP from Arm China, used as the Cortex-M33-class application processor in compatible SF32 devices. Cortex-M33-oriented firmware, middleware, RTOS ports, and tools remain relevant, subject to normal device-specific integration work. Its CU, SP, and SE configurations differ chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

        For device-specific guidance on configuration, TCM, caches, CDE, coprocessors, and representative performance measurement, see [STAR-MC1 Architecture Deep Dive](../../learn/architecture/star-mc1.md).


2. **Ultra-Low-Power Wireless Connectivity**

    The SF32LB series integrates Bluetooth Low Energy (BLE) or dual-mode Bluetooth (BT/BLE) connectivity directly on-chip.

    Supported Bluetooth modes and RF performance vary by device. For the exact part number, check the datasheet and validated reference design for supported modes, transmit-power settings, receiver sensitivity, and current consumption; family-level positioning is not a substitute for those figures.

3. **Hardware-Accelerated Graphics and Display Engine**

    All SF32LB microcontrollers integrate ePicasso, a 2.5D graphics engine developed in-house by SiFli, and a separate display controller.

    Hardware acceleration significantly reduces CPU workload for common graphics tasks such as:

    * Alpha blending
    * Image scaling
    * Rotation and transformation
    * Layer composition
    * User interface rendering

    Across the SF32LB family, display interfaces and display types include the following. Availability varies by device; check the exact SKU rather than assuming that every part supports every item listed.

    * SPI / DSPI / QSPI
    * 8080 MCU interface
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI (for Memory-in-Pixel displays)

    On devices with the required display interfaces, graphics frameworks such as LVGL can use the hardware acceleration engine to deliver smooth, responsive interfaces on TFT, AMOLED, e-Paper (EPD), and Memory-in-Pixel (MiP) displays.

4. **Edge AI and Neural Acceleration**

    Selected SF32 devices integrate dedicated hardware accelerators for machine learning, multimedia processing, and sensor fusion workloads.

    Capabilities may include:

    * Neural network acceleration
    * Audio processing
    * Voice recognition
    * Camera interfaces (DVP and SPI)
    * Sensor fusion and biometric algorithms

    These features enable low-latency AI inference on-device while minimizing power consumption and cloud dependency.

5. **High-Density System-in-Package (SiP) Memory**

    To support graphics-intensive and AI-enabled applications, SF32 devices integrate instruction and data cache architectures optimized for high-performance execution from external memory.

    Available in-package memories may include:

    * Up to 256 Mb NOR Flash
    * Up to 512 Mb PSRAM

    Only selected part numbers include co-packaged NOR Flash or PSRAM. A SiP configuration can reduce the number of separately mounted memory devices and their associated routing, but memory type, capacity, interface, power, and externally available pins depend on the exact SKU. Check its datasheet and package pinout before finalizing the board.

## SF32 Microcontroller Comparison

<div align="center"><em>SF32 Microcontroller Comparison</em></div>

The values below summarize family-level capabilities, not guaranteed capabilities of every SKU. Interface availability and resource counts can vary by exact part number, package, or configuration; verify the selected part's datasheet.

<div align="center" markdown>

| Feature | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| Positioning | Entry-Level | Mainstream with BLE only | Advanced | Enhanced Computing | Flagship |
| Application CPU | Cortex-M33 @240MHz | Cortex-M33 @240MHz | Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz | 2× Cortex-M33 @240MHz |
| Low-Power CPU | Cortex-M33 @24/48 MHz, dedicated Bluetooth controller | Cortex-M33 @48 MHz, user-programmable | Cortex-M33 @48/96 MHz, user-programmable | Cortex-M33 @24 MHz, dedicated Bluetooth controller | Cortex-M33 @48/96 MHz, user-programmable |
| Internal SRAM | 576 KB | 1,312 KB | 960 KB | 592 KB | 3.7 MB |
| Bluetooth | BT Classic + BLE | BLE | BT Classic + BLE | BT Classic + BLE | BT Classic + BLE |
| Graphics Accelerator | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + Vector Graphics<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| Display Support | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| Audio ADC | 1x | n/a | 1x | 2x | 2x |
| Audio DAC | 1x | n/a | 1x | 1x | 2x |
| PDM Audio Interfaces | 1x | 1–2x* | 2x | 2x | 2x |
| I²S Audio Interfaces | 1x | 1–2x* | 1x | 2x | 3x |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | n/a | n/a | 1x | 2x | 2x |
| In-Package PSRAM | Up to 16 MB | Up to 16 MB + 2 MB | Up to 16 MB | Up to 48 MB | Up to 32 MB + 32 MB |
| In-Package NOR Flash | Up to 4 MB | Up to 8 MB | Up to 1 MB | Up to 32 MB | Up to 8 MB |
| # of GPIOs | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58; up to 6 additional BGA112 I/Os* | 154 |
| Package Options | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| Package Footprint (L × W) | 7 × 7 mm | 7 × 7 mm | QFN: 7 × 7 mm<br>BGA: 6.5 × 6.1 mm | QFN68: 7 × 7 mm<br> QFN80: 8 × 8 mm<br>BGA: 5.4 × 4.4 mm | 8.5 × 6.5 mm |
| Power Supply | 3.2–4.7 V (520/3/5/7)<br>2.97–3.63 V (52B/E/G/J)<br>1.8 V (52D) | 1.71–3.63 V | 1.71–3.63 V | 3.0–4.7 V<br>2.97–3.63 V | 1.71–3.63 V |

</div>

**SF32LB55x variant note:** The audio-interface count depends on the order code: SF32LB551/553/555 variants have one PDM and one I²S interface; SF32LB557VD3A6 has two of each. The package summary in the latest [SF32LB55x datasheet (V1.7.2)](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf) lists 119 GPIOs for BGA169 (71 HCPU + 48 LCPU), but the same datasheet's detailed product-series table gives 71 HCPU + 42 LCPU = 113 for SF32LB557. The current [SiFli Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) also lists 71 + 42 = 113 for SF32LB557VD3A6. SiFli does not explain the discrepancy within the datasheet; this comparison uses the part-specific 113-GPIO figure. Confirm the exact SKU against its datasheet and pin table before assigning pins. Each PDM interface can connect up to two digital microphones; interface count is not microphone count.

**SF32LB55x in-package NOR note:** The 8 MB family maximum includes the separately documented SS6600A8 configuration: two 4 MB QSPI-NOR devices configured as one 8 MB OSPI-NOR device. The SF32-prefixed order codes listed for SF32LB55x have up to 4 MB of in-package NOR Flash; verify the exact model.

**SF32LB57x BGA112 note:** This note applies only to BGA112. SF32LB57x has internal MPI1, MPI2, and MPI3; their positions in a part number are explained in the [SF32 naming convention](SF32_namingrule.md). Under any of these co-packaged-memory configurations, the MPI2 and MPI3 pins are unavailable for external access, leaving a fixed 58 GPIOs: (1) one PSRAM each on internal MPI1 and MPI2; (2) one 256 Mb PSRAM on internal MPI2; or (3) one NOR Flash on internal MPI3. `SF32LB57GVD776` is case (3): the second `7` in its trailing `776` code indicates an internal device on MPI3, so only 58 GPIOs are available. In other BGA112 configurations, the six additional package I/Os may be used for MPI3 or as GP static outputs configured through pull-up or pull-down; they are not unrestricted GPIOs. For example, the `58 + 6` notation for `SF32LB57ZVN7N6` means 58 usable GPIOs plus six pins available for MPI3 or static outputs. QFN68 and QFN80 are outside this BGA112 constraint; they provide only their stated GPIO counts, with no additional MPI3 or static-output option. See the [SF32LB57x product page](../chips/SF32LB57x.md) and its datasheet for the exact SKU.

**SF32LB58x GPIO-count clarification:** The [DS5801 V1.8.3 datasheet](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf) and SiFli's family comparison specify 154 GPIOs in total (HPSYS: 94; LPSYS: 60). The separate [Chip Model Guide](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html) lists HCPU: 94 and LCPU: 66, which sums to 160 and conflicts with the datasheet total. This comparison follows the datasheet; verify usable pins against the exact SKU's package pin table before assigning them.

## Choosing the Right SF32

The SF32LB5xx family spans battery-powered connected devices, from cost-optimized Bluetooth products to systems with advanced graphics and AI features. Family members share an SDK foundation, but processor configuration, peripherals, memory maps, packages, and pin assignments can differ. Porting may require changes to startup code, drivers, linker or partition settings, pin multiplexing, and SDK configuration; validate the result on the target device.

When selecting a device, consider the following key requirements:

* Bluetooth connectivity (BLE or dual-mode BT/BLE)
* Display interface and resolution
* Audio and multimedia capabilities
* Memory capacity
* GPIO requirement
* Graphics performance
* AI and sensor-processing workloads
* Power consumption targets

<div align="center"><em>Quick Selection Guide</em></div>

<div align="center" markdown>

| Choose ... | If Your Application Requires ... | Typical Applications |
| : ---      | : ---  | : --- |
| SF32LB52x  | • Dual-mode Bluetooth (BT/BLE)<br> • Integrated audio ADC and DAC<br> • Integrated Li-ion battery charging<br> • Up to 45 GPIOs<br> • Display resolutions up to 512 × 512<br> • A compact and cost-effective solution<br> | • Entry-level smartwatches and fitness bands<br> • Bluetooth modules and wireless adapters<br> • Bluetooth audio accessories<br> • Smart sensors and wearable devices<br> • Electronic shelf labels and smart badges<br> • Portable label printers<br> • eBike and eScooter displays<br> • Basic LVGL-based HMI devices |
| SF32LB55x  | • Bluetooth Low Energy (BLE)<br> • MIPI DSI command-mode displays<br>• Large SRAM capacity for sensor processing algorithms<br> • More than 45 GPIOs<br> • Extended low-power processing capabilities | • Fitness bands and activity trackers<br> • Sports and cycling computers<br> • Sensor-rich wearable devices<br> • Health monitoring devices<br> • Battery-powered BLE peripherals |
| SF32LB56x  | • Dual-mode Bluetooth (BT/BLE)<br> • RGB/DPI display interfaces<br> • Integrated audio ADC and DAC<br> • Display resolutions up to 1024 × 600<br> • External Wi-Fi connectivity through SDIO<br> • Increased GPIO capacity | •     Smartwatches with advanced user interfaces<br> • Connected HMI systems<br> • Medical and healthcare devices<br> • Industrial handheld devices<br> • Portable instruments<br> • Advanced eBike and eScooter displays|
| SF32LB57x | • Dual-mode Bluetooth (BT/BLE), BLE Audio, and LE Long Range<br> • ePicasso 3.0/eZip 3.0 graphics with RGB display interfaces<br> • DCMI camera input and integrated high-fidelity audio ADC/DAC<br> • Display resolutions up to 1024 × 600<br> • PTM offload for deterministic I/O or custom peripheral timing<br> • Up to 58 general-purpose GPIOs; where the SiP configuration permits, BGA112 also provides up to 6 I/Os for MPI3 or pull-up/pull-down-configured GP static outputs<br> • SD/SDIO/eMMC storage interfaces | • Compact advanced smartwatches<br> • Display-rich HMI and e-paper devices<br> • Camera-enabled Bluetooth products<br> • Portable audio and recording devices<br> • Smart-home control panels |
| SF32LB58x  | • Dual-mode Bluetooth (BT/BLE)<br> • Advanced graphics rendering including vector graphics<br> • MIPI DSI command-mode or video-mode displays<br> • Display resolutions up to 1280 × 800<br> • Large memory configurations<br> • High GPIO density and count<br> • External Wi-Fi connectivity through SDIO<br> • Edge AI and machine-learning workloads | • Premium smartwatches<br> • Sports and outdoor wearable devices<br>• Advanced cycling computers<br> • Smart displays and connected dashboards<br> • AI-enabled wearable devices<br> • Edge AI and sensor-fusion systems|

</div>

## Software Compatibility Across the Family

The SF32 platform provides a shared software and SDK foundation. However, processor configuration, peripherals, memory maps, packages, and pin assignments can differ. Porting may require adapting startup code, drivers, linker or partition settings, pin multiplexing, and SDK configuration, followed by validation on the target hardware.

Evaluate software reuse and migration effort alongside performance, memory, display, and connectivity requirements. Do not assume that devices in the same family are pin-compatible or that firmware will run unchanged.

## Frequently Asked Questions

**Which SF32 chip suits a low-cost Bluetooth smartwatch or fitness band?**
SF32LB52x is the entry-level choice: dual-mode Bluetooth (BT Classic + BLE), integrated audio ADC/DAC and Li-ion charging, up to 45 GPIOs, and a 7 × 7 mm QFN68 package.

**Which SF32 chips support Classic Bluetooth, not just BLE?**
SF32LB52x, SF32LB56x, SF32LB57x and SF32LB58x support BT Classic + BLE. SF32LB55x is BLE only.

**Which SF32 chips support MIPI DSI displays?**
SF32LB55x and SF32LB58x list MIPI display support. SF32LB52x, 56x and 57x use SPI, QSPI, 8080, JDI/EPD and (56x/57x) RGB interfaces instead.

**Which SF32 chips offer camera input or CAN?**
SF32LB57x adds DCMI camera input. CAN is available on SF32LB56x (1×) and on SF32LB57x and SF32LB58x (2×).

**Are SF32 family members pin-compatible?**
No. They share an SDK foundation, but cores, peripherals, memory maps, packages and pin assignments differ, so porting needs driver, pin-mux and configuration changes and must be validated on the target device.

## Reference Links

- [SiFli official website](https://www.sifli.com/)
- [SiFli Wiki](https://wiki.sifli.com/)
- [SiFli software documentation](https://docs.sifli.com/)
- [OpenSiFli on GitHub](https://github.com/OpenSiFli/)
- [SiFli official Taobao store](https://sifli.taobao.com/)
