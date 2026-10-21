---
icon: lucide/microchip
description: "SF32LB57x: ultra-low-power multicore AIoT MCU family with dual-mode Bluetooth, dual 240 MHz cores, ePicasso 3.0 graphics, eZip 3.0, and compact QFN/BGA packages."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Overview { #overview }

The SF32LB57x series is an enhanced ultra-low-power, highly integrated AIoT MCU family for wearable, portable smart-device, smart-home, and compact display products. It is intended for designs that need richer graphics, Bluetooth audio, camera input, external storage, and always-on behavior than a basic Bluetooth MCU can comfortably support, without taking on the power, cost, and integration trade-offs of an application-processor-class platform.

SF32LB57x uses a three-core Arm Cortex-M33 STAR-MC1[^1] architecture: two performance cores run at up to 240 MHz, alongside a low-power core that runs at up to 24 MHz. SiFli's [ACPU Usage Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifies the three cores as HCPU, ACPU, and LCPU: ACPU handles audio and graphics processing, while LCPU supports low-power tasks such as BLE and sensor-data processing. The two performance cores are rated together at 1968 CoreMark / 740 DMIPS. This split gives UI rendering, application code, and multimedia workloads sufficient headroom while allowing Bluetooth, sensor-hub, and other always-on tasks to remain on a lower-power path.

The platform integrates 592 KB of on-chip retention SRAM, ePicasso 3.0 2D/2.5D graphics acceleration, eZip 3.0 hardware decompression, a dedicated LCD controller, a DCMI camera controller, dual-mode Bluetooth wireless, high-fidelity audio ADC/DAC resources, storage interfaces for SiP and external memory, security acceleration, and flexible GPIO assignment through FreeIO. A key 57x differentiator is PTM (Parallel Task Machine): a small parallel task processor that moves cycle-sensitive peripheral sequencing, custom IO protocols, sensor collection, PWM-like timing, and event-driven coordination away from the main CPUs.

For hardware planning, the most important early decision is the power/package baseline. SF32LB57x is available in QFN68, QFN80, and BGA112 packages, with battery-powered and externally regulated 3.3 V baselines differentiated by part family. That choice affects power-tree design, available GPIO count, package fanout, display/storage routing, debug access, and bring-up strategy, so the exact orderable part should be selected before schematic reuse or PCB layout starts.

[^1]: STAR-MC1 is a configurable Armv8-M Mainline embedded CPU IP from Arm China. In compatible SF32 devices, SiFli documents it as an Arm Cortex-M33 STAR-MC1 application processor. Its Cortex-M33-class software model helps existing Cortex-M33 firmware, middleware, RTOS ports, and tools carry forward, subject to normal device-specific integration work. Its CU, SP, and SE configurations vary chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities that must be verified for the exact SF32 part. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

[^2]: **BGA112 only.** SF32LB57x integrates MPI1, MPI2, and MPI3; see the [SF32 part-numbering convention](../family/SF32_namingrule.md) for the internal co-packaged-memory positions. In either of these co-packaged-memory configurations, the MPI2 and MPI3 pins are unavailable for external access, leaving only 58 GPIOs: (1) one PSRAM on MPI2, either alone or together with one PSRAM on MPI1; or (2) NOR Flash on MPI3. `SF32LB57GVD776` is case (2): its second `7` identifies the internal component on MPI3, so only 58 GPIOs are available. In all other configurations, the six BGA112 I/Os associated with MPI3 are available for MPI3 or as GP static outputs configured through pull-up or pull-down; they are not unrestricted GPIOs. The `58 + 6` entry for `SF32LB57ZVN7N6` therefore means 58 usable GPIOs plus 6 pins for MPI3 or static outputs, not 64 freely assignable GPIOs. This limitation does not apply to QFN68 or QFN80 packages, which expose only their nominal GPIO count and have no additional MPI3 or static-output option.

[^3]: Package dimensions and thickness follow the ordering tables and package drawings of SiFli's SF32LB57x datasheets (DS5701 and DS5702, V0.2.1): QFN68 (7 × 7 mm, 0.9 mm or 1.1 mm drawings), QFN80 (8 × 8 mm, 0.9 mm or 1.1 mm drawings), and BGA112 (5.4 × 4.4 mm, 0.98 mm). Among the listed parts, only SF32LB573UB776 uses the 1.1 mm QFN68; the ordering tables do not list SF32LB57ZVN7N6, so its BGA112 thickness is taken from the only BGA112 drawing. SiFli's hardware design guide additionally quotes a 1.03 mm BGA112 option that the datasheets do not show. The SF32LB57x-specific part-numbering diagram maps U to QFN68, Y to QFN80, and V to BGA112; do not assume the Y mapping applies to other SF32 families. Verify the thickness and package drawing for the exact part number with SiFli.
[^4]: For the battery-powered series, SiFli's SF32LB57x datasheet (DS5701) specifies VBAT and VCC at 3.0–4.7 V, with a power-on voltage of 3.5 V ±10 %. SiFli's hardware design guide quotes a narrower 3.45–4.7 V input (QFN68 Table 2-1-1, QFN80 Table 2-1-3, BGA112 Table 2-1-5); the two documents differ, so confirm the applicable input pin and limits against the exact part's datasheet.
[^5]: The I/O-voltage entry summarizes supported I/O domains; it does not mean every pin can use either voltage. VDDIOA, where separately supplied, powers GPIO. VDDIOSB, where present, is the SiP-memory I/O rail; SiFli's guide specifies 1.8 V for co-packaged PSRAM and 3.3 V for NOR Flash. For the QFN68 3.3 V series, Table 2-1-2 specifies VDDIOA at 3.3 V only. Verify each pin/domain against the package guide and exact part datasheet.

## Applications { #applications }

**SF32LB57x is a strong fit for** compact connected products that need graphics, Bluetooth audio, camera input, external storage, or always-on sensing in a low-power MCU platform, including:

- Wearable smartwatches and fitness bands
- Smart human-machine-interface devices
- E-paper smart devices
- Small and medium smart home appliances
- Portable recording and audio products
- Wearable medical devices and fitness equipment
- Industrial display, sensing, monitoring, and instrumentation products
- Camera-enabled wearable or handheld devices
- Display-centric compact terminals and control panels
- Automotive center-console controllers, wireless car keys, and wearable car remote controls
- Smart door locks
- Bluetooth walkie-talkie and intercom products
- Electronic photo frames
- Bluetooth mesh and low-power sensor-hub networks

It is especially suitable when the design needs one or more of these capabilities:

- Dual 240 MHz performance cores plus a 24 MHz efficiency core for UI/application work and low-power background tasks
- ePicasso 3.0 graphics acceleration with real-time rotation, scaling, projection, mirroring, and alpha blending
- eZip 3.0 decompression for eZip/eZip-A, JPEG, and MJPEG assets without forcing every asset through a CPU-heavy decode path
- LCD interfaces across 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, and 8/16-bit EPD
- DCMI camera input over DVP or SPI/Dual-SPI/Quad-SPI
- Dual-mode Bluetooth 6.3 (BR/EDR and BLE), including BLE Audio and LE Long Range
- High-fidelity 24-bit audio ADC/DAC resources for playback, recording, and Bluetooth calling
- SiP OPI-PSRAM / QSPI-NOR plus external QSPI-NOR/NAND, QPI-PSRAM, SD, SDIO, or eMMC storage options
- PTM offload for custom peripheral tasks, deterministic IO timing, fast trigger response, and low-overhead sensor or interface automation

The Bluetooth 6.3 figure follows the SF32LB57x datasheets (V0.2.1); the v0.4 product briefs still show an earlier revision. Confirm optional features against the current SiFli documentation for the exact orderable part.

## Development Resources { #development-resources }

[Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[Original Design Guide (wiki.sifli.com)]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[Product Brief]__
- :fontawesome-solid-file-pdf: __[Datasheet]__
- :fontawesome-solid-file-pdf: __[User Manual]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com)]__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs { #features-and-specs }

### Compute and Memory { #compute-and-memory }

- High-performance system with dual Arm Cortex-M33 STAR-MC1 cores up to 240 MHz
- Low-power system with one Arm Cortex-M33 STAR-MC1 efficiency core up to 24 MHz
- Dual-performance-core score of 1968 CoreMark / 740 DMIPS
- HCPU cache: 32 KB 2-way instruction cache and 16 KB 4-way data cache
- ACPU instruction/data cache resources for XIP and application acceleration
- 512 KB HPSYS retention SRAM plus 80 KB LPSYS retention SRAM, for 592 KB total on-chip SRAM
- 128 KB zero-wait-cycle D-TCM shared with the HPSYS SRAM address space
- Single-precision FPU and MPU support
- GPDMA with linked-list mode

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- 4-core Parallel Task Machine for custom peripheral tasks that benefit from hardware-timed execution instead of continuous CPU service
- Compact custom instruction set for bus reads/writes, data operations, conditional branches, IO reads/writes, event waits, and fixed delays
- Cycle-level timing control when executing from PTM TCM, suitable for deterministic IO sequencing
- Each PTM core can handle up to 16 IO channels, with FIFO/DMA support for custom communication interfaces
- PTM cores can access AHB bus memory and peripheral registers, generate interrupts to the CPU, and coordinate with each other through internal event notifications
- Practical fit for custom interface protocols, custom PWM, batched memory/data operations, multi-module scheduling, and automatic sensor collection

### Wireless Connectivity { #wireless-connectivity }

- Dual-mode Bluetooth radio
- BLE Audio and LE Long Range support
- Receiver sensitivity: −100 dBm at BLE 1 Mbps, −107.5 dBm at BLE 125 kbps, −96 dBm at BR, and −95 dBm at EDR2
- Maximum transmit power: 13 dBm for EDR2/EDR3 and 17 dBm for BR/BLE
- BR receiver peak current as low as 2.0 mA at 3.8 V

### Graphics, Display, and Camera { #graphics-display-and-camera }

- ePicasso 3.0 2D/2.5D graphics engine
- Hardware-accelerated rotation, scaling, projection, mirroring, alpha blending, and multi-layer composition
- Maximum graphics resolution of 2048 × 2048
- RGB formats including RGB888, RGB565, aRGB8888, and aRGB8565
- Additional formats including L8/L4, G8/G4/G2, A8/A4/A2, and YUV
- eZip 3.0 decompression engine for lossless eZip/eZip-A image and animation assets
- JPEG image and MJPEG animation decompression
- eZip and ePicasso linked operation without an intermediate frame buffer
- Dedicated LCD controller supporting 8080, SPI/Dual-SPI/Quad-SPI, DPI/RGB, JDI, and 8/16-bit EPD display interfaces
- Low-power always-on display use cases supported by the display subsystem
- DCMI camera controller supporting DVP and SPI/Dual-SPI/Quad-SPI camera interfaces

### Audio and Analog { #audio-and-analog }

- 1× high-fidelity 24-bit audio DAC with 109 dB SNR
- 2× high-fidelity 24-bit audio ADCs with 97 dB SNR
- Audio sample-rate coverage from 8 kHz to 96 kHz, including common telephony and music rates
- Micbias LDO with 1.4 V to 2.8 V output range and up to 2 mA output current
- Supports audio playback, recording, Bluetooth calling, and headset-connected MP3 playback designs
- 1× 12-bit general-purpose SAR ADC with 12 channels
- 1× on-chip temperature sensor

### Storage and Security { #storage-and-security }

- SiP OPI-PSRAM support up to 156 MHz
- SiP NOR Flash support up to 104 MHz
- 3× MPI (QSPI) interfaces for NOR, NAND, and QPI-PSRAM, with address-mapped XIP operation
- 2× SD/SDIO interfaces supporting SD 3.0, SDIO 3.0, and eMMC
- On-the-fly Flash decryption support
- AES, HASH, and CRC accelerators
- True random-number generator (TRNG)
- eShield security architecture
- PSA Certified Level 1

### Peripherals and I/Os { #peripherals-and-ios }

- Up to 58 GPIOs, depending on package and orderable part
- FreeIO flexible GPIO assignment
- 3× UART
- 4× I2C
- 2× SPI
- 2× I2S
- 2 PDM interfaces (up to two digital microphones per interface)
- 1× USB 2.0 Full-Speed
- 2× CAN
- PTM event integration for event-driven peripheral workflows and multicore coordination
- 2× 16-bit GPTIM
- 4× 32-bit BTIM
- 2× 32-bit ATIM
- 2× 24-bit LPTIM
- 1× PWM
- 1× RTC
- 2× 24-bit WDT and 1× independent WDT

### Power Management { #power-management }

- Integrated high-efficiency Buck converter and low-power LDOs
- Two external 3.3 V supply outputs, up to 150 mA each
- Hibernate current of 2.8 µA at 3.8 V (battery-powered baseline) or 1 µA at 3.3 V (externally supplied baseline)
- Integrated configurable linear Li-ion battery charger (up to 400 mA charge current) on the battery-powered baseline
- Charger full-voltage range from 4.2 V to 4.45 V
- Battery/system input range[^4]: 3.0 V to 4.7 V
- VBUS range: 4.5 V to 5.5 V
- Operating temperature range: −40°C to +85°C

## Family Variants { #family-variants }

SF32LB57x includes battery-powered variants and variants for externally regulated 3.3 V systems. Select the exact part number before schematic capture, because package drawings, power pins, available GPIO count, bundled memory, and board constraints differ across the family.

The part numbers below come from the ordering tables of SiFli's SF32LB57x datasheets (DS5701 and DS5702, V0.2.1, both preliminary drafts), except `SF32LB57ZVN7N6`, which those tables do not list. Confirm each exact order code, co-packaged-memory configuration, electrical limits, and package drawing against SiFli's current part-specific documentation before design-in.

The practical part-selection split is:

- **`SF32LB57xU`**: QFN68, lithium-ion battery-powered group (digit tier, e.g. `3`/`5`/`7`)
- **`SF32LB57XU`**: QFN68, standard external 3.3 V-supply group (letter tier, e.g. `Z`/`C`/`E`/`F`/`G`/`H`/`J`)
- **`SF32LB57XY`** / **`SF32LB57XV`**: QFN80 / BGA112, external 3.3 V-supply group.

The battery-powered series datasheet (DS5701) also lists a battery-powered QFN80 (8 × 8 mm, 58 GPIOs) and a battery-powered BGA112 (up to 58 GPIOs plus 6 GPO or MPI interface I/Os). Its ordering table, however, contains no battery-powered QFN80 or BGA112 part number, so confirm the orderable SKU with SiFli before designing around either.

<div align="center"><em>SF32LB57x QFN68 Variants (57xU / 57XU)</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| Package | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| Plan-view dimensions[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| Thickness[^3] | 0.9 mm | 0.9 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| Pitch | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| Co-packaged memory | 4MB OPI-PSRAM + 16MB QSPI-NOR | 4MB OPI-PSRAM + 16MB+8MB QSPI-NOR (dual-die) | 4MB OPI-PSRAM + 16MB×2 QSPI-NOR (dual-die) | 8MB OPI-PSRAM, no QSPI-NOR | 16MB OPI-PSRAM, no QSPI-NOR | No PSRAM, 1MB QSPI-NOR only |
| Power supply[^4] | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | **3.3V** |
| I/O voltage[^5] | 3.3V | 3.3V | 3.3V | 3.3V | 3.3V | 3.3V / 1.8V |
| Temperature | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

<div align="center"><em>SF32LB57x QFN80 / BGA112 Variants (57XY / 57XV)</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| Package | QFN80 | QFN80 | BGA112 | BGA112 |
| Plan-view dimensions[^3] | 8 × 8 mm | 8 × 8 mm | 5.4 × 4.4 mm | 5.4 × 4.4 mm |
| Thickness[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 0.98 mm |
| Pitch | 0.35mm | 0.35mm | 0.4mm | 0.4mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 or static outputs)[^2] | 58[^2] |
| Co-packaged memory | 8MB (2×4MB dual-die) OPI-PSRAM, no QSPI-NOR | 16MB OPI-PSRAM + 16MB QSPI-NOR | No PSRAM + 16MB QSPI-NOR | 16MB OPI-PSRAM + 32MB (2×16MB dual-die) QSPI-NOR |
| Power supply | **3.3V** | **3.3V** | **3.3V** | **3.3V** |
| I/O voltage[^5] | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V |
| Temperature | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

For SF32LB57x, package selection is not just a PCB-cost question. It affects display-interface availability, external-storage routing, GPIO budget, debug/download pin retention, and fanout difficulty, so package choice should be locked together with the power architecture. Use the orderable part number, not only the package name, as the BOM and schematic baseline -- the memory suffix changes the SiP storage configuration and can affect boot-media assumptions, power sequencing, and external-storage requirements.

## Integration Path { #integration-path }

Use this sequence to turn an SF32LB57x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the intended graphics, audio, camera, Bluetooth, and storage features.
2. **Plan the evaluation hardware.** μForge does not currently catalogue an SF32LB57-specific module or development board. Use the [SF32 Product Selector](../product-selector.md) to identify the closest evaluation platform, but verify package, power, memory, and interface coverage before applying results to a 57x design.
3. **Design and review the hardware.** Use the local [hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) — including its [Customer Design Self-Check](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — and the [Design for Production](../../hardware/design-for-production.md) review sequence before releasing the schematic or layout; a family-specific μForge checklist is not currently published.
4. **Verify the authoritative source.** Confirm the exact orderable part and package against the SiFli [datasheet], [user manual], and [original design guide], and use the [SiFli Approved Vendor List] when controlling critical BOM choices.

<!-- uf-faq:start -->
## Frequently Asked Questions

**What are the key specifications of SF32LB57x?**
SF32LB57x pairs an application CPU (2× Cortex-M33 @240 MHz) with a low-power core (Cortex-M33 @24 MHz, a dedicated Bluetooth controller), 592 KB of internal SRAM and dual-mode Bluetooth (BT Classic + BLE). Graphics: ePicasso 3.0 + eZip 3.0. Package: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS. Family-level values; verify the exact part number's datasheet.

**Which display interfaces does SF32LB57x support?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. Availability varies by part number and package.

**How much in-package memory does SF32LB57x offer?**
Up to 48 MB of in-package PSRAM and up to 32 MB of in-package NOR Flash, depending on the part number.

**What supply voltage does SF32LB57x need?**
3.0–4.7 V or 2.97–3.63 V, depending on the variant. Confirm the exact range in the datasheet.

**Where do I start a hardware design with SF32LB57x?**
Start with the [SF32LB57x hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) for schematic, power, clock/RF and PCB layout guidance, then use the schematic and layout checklists before releasing the board.
<!-- uf-faq:end -->

## Related Products { #related-products }

### Hardware Design Baseline { #hardware-design-baseline }

Use the [Hardware Design Guide (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), the official hardware application note, the datasheet, and the approved vendor list as the design baseline. Confirm the power architecture, package fanout, display, storage, audio, camera, RF, and debug/download plan before releasing the schematic or PCB.

### Development Kits { #development-kits }

Use the official reference schematics, minimum-system guidance, and checklist material to plan power, clocks, RF, display, storage, audio, camera, and production access.

### Reference Products { #reference-products }

Typical SF32LB57x end products include wearable watches and bands, smart HMI devices, e-paper products, small and medium smart appliances, portable recording/audio devices, smart-home panels, compact display terminals, and camera-enabled Bluetooth products.
