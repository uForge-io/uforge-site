---
icon: lucide/microchip
description: "SF32LB57x: ultra-low-power multicore AIoT MCU family with dual-mode Bluetooth, dual 240 MHz cores, ePicasso 3.0 graphics, eZip 3.0, and compact QFN/BGA packages."
tags:
    - Hardware
    - Chip
---

# SF32LB57x { #sf32lb57x }

## Overview { #overview }

The SF32LB57x series is an enhanced ultra-low-power AIoT MCU family for wearable, portable smart-device, smart-home, and compact display products that need richer graphics, Bluetooth audio, camera input, external storage, and always-on behavior than a basic Bluetooth MCU can support, without the power, cost, and integration trade-offs of an application-processor-class platform. As SiFli's 2026 offering, SF32LB57x serves as an upgrade from SF32LB52x and SF32LB56x while still aiming to keep cost competitive. It offers more CPU power, improved graphics performance, more GPIOs in compact QFN packages suited to lower-cost assembly, and more flexible co-packaged memory combinations. SiFli's [hardware design guide](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html) states a display ceiling of 1024 × 1024, while its [LCD FAQ](https://docs.sifli.com/projects/solution/7.FAQ/lcd/index.html) lists 1024 × 600 and 720 × 720 among common or verified RGB/DPI designs and distinguishes these references from an absolute silicon limit. The current μForge [interface matrix](../../learn/graphics/display-controller.md#per-device-interface-matrix) lists 1024 × 600 RGB888 through DPI/RGB. Treat these as reference values, not guaranteed panel modes; verify the exact part/package, interface, panel timing, refresh rate, pinmux, and framebuffer/PSRAM bandwidth.

It uses a three-core Arm Cortex-M33 STAR-MC1[^1] architecture: two performance cores (HCPU and ACPU) at up to 240 MHz, rated together at 1968 CoreMark / 740 DMIPS, plus a 24 MHz low-power LCPU. SiFli's [ACPU Usage Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) explicitly describes SF32LB57x as a three-core system, assigning audio and graphics work to ACPU and power-sensitive tasks such as BLE and sensor data processing to LCPU. Confirm the target SDK configuration and task allocation for the product workload. The platform adds 592 KB of retention SRAM, ePicasso 3.0 graphics, eZip 3.0 decompression, LCD and DCMI camera controllers, dual-mode Bluetooth, audio ADC/DAC, SiP and external memory interfaces, security acceleration, and FreeIO pin assignment. Its key differentiator is PTM (Parallel Task Machine), a small parallel task processor that takes cycle-sensitive peripheral sequencing, custom IO protocols, sensor collection, PWM-like timing, and event handling off the main CPUs.

Select the exact orderable part before schematic reuse or PCB layout. SF32LB57x comes in QFN68, QFN80, and BGA112 packages, with battery-powered and externally regulated 3.3 V baselines by part family; this choice sets the power tree, GPIO count, package fanout, display/storage routing, debug access, and bring-up strategy.

[^1]: STAR-MC1 is a configurable Armv8-M Mainline embedded CPU IP from Arm China. In compatible SF32 devices, SiFli documents it as an Arm Cortex-M33 STAR-MC1 application processor. Its Cortex-M33-class software model helps existing Cortex-M33 firmware, middleware, RTOS ports, and tools carry forward, subject to normal device-specific integration work. Its CU, SP, and SE configurations vary chiefly in cache, TCM, XIPU, and TrustZone capability; Arm Custom Instructions/CDE and the coprocessor interface are optional capabilities that must be verified for the exact SF32 part. SiFli documentation may use ***Arm Cortex-M33 STAR-MC1*** or ***Arm Cortex-M33*** according to context.

[^2]: **BGA112 only.** SF32LB57x integrates MPI1, MPI2, and MPI3; see the [SF32 part-numbering convention](../family/SF32_namingrule.md) for the internal co-packaged-memory positions. In either of these co-packaged-memory configurations, the MPI2 and MPI3 pins are unavailable for external access, leaving only 58 GPIOs: (1) one PSRAM on MPI2, either alone or together with one PSRAM on MPI1; or (2) NOR Flash on MPI3. `SF32LB57GVD776` is case (2): its second `7` identifies the internal component on MPI3, so only 58 GPIOs are available. In all other configurations, the six BGA112 I/Os associated with MPI3 are available for MPI3 or as GP static outputs configured through pull-up or pull-down; they are not unrestricted GPIOs. The `58 + 6` entry for `SF32LB57ZVN7N6` therefore means 58 usable GPIOs plus 6 pins for MPI3 or static outputs, not 64 freely assignable GPIOs. This limitation does not apply to QFN68 or QFN80 packages, which expose only their nominal GPIO count and have no additional MPI3 or static-output option.

[^3]: Package dimensions and thickness follow the ordering tables and package drawings of SiFli's SF32LB57x datasheets (DS5701 and DS5702): QFN68 (7 × 7 mm, 0.9 mm or 1.1 mm drawings), QFN80 (8 × 8 mm, 0.9 mm or 1.1 mm drawings), and BGA112 (5.4 × 4.4 mm, 0.98 mm). Parts with three memory dies (a PSRAM plus dual-die QSPI-NOR) use the thicker package option: 1.1 mm for QFN68 and 1.03 mm for BGA112, as listed in SiFli's hardware application guide. The datasheet ordering tables do not list SF32LB57ZVN7N6, so its BGA112 thickness is taken from the only BGA112 drawing in the datasheets (0.98 mm). The SF32LB57x-specific part-numbering diagram maps U to QFN68, Y to QFN80, and V to BGA112; do not assume the Y mapping applies to other SF32 families. Verify the thickness and package drawing for the exact part number with SiFli.
[^4]: For the battery-powered series, SiFli's SF32LB57x datasheet (DS5701) specifies VBAT and VCC at 3.0–4.7 V, with a power-on voltage of 3.5 V ±10 %. SiFli's hardware design guide quotes a narrower 3.45–4.7 V input (QFN68 Table 2-1-1, QFN80 Table 2-1-3, BGA112 Table 2-1-5); the two documents differ, so confirm the applicable input pin and limits against the exact part's datasheet.
[^5]: The I/O-voltage entry summarizes supported I/O domains; it does not mean every pin can use either voltage. VDDIOA, where separately supplied, powers GPIO. VDDIOSB, where present, is the SiP-memory I/O rail; SiFli's guide specifies 1.8 V for co-packaged PSRAM and 3.3 V for NOR Flash. For the QFN68 3.3 V series, Table 2-1-2 specifies VDDIOA at 3.3 V only. Verify each pin/domain against the package guide and exact part datasheet.
[^6]: Dual-die: the two dies are separate memory devices on separate MPI interfaces and can be accessed independently.

## Applications { #applications }

**SF32LB57x is a strong fit for** compact connected products that combine UI graphics, Bluetooth audio, camera input, external storage, or always-on sensing in a low-power MCU platform, including:

- Smartwatches, fitness bands, and wearable medical devices
- Smart HMI devices, display-centric terminals, and control panels
- E-paper smart devices and electronic photo frames
- Small and medium smart home appliances and smart door locks
- Portable recording, audio, and Bluetooth walkie-talkie or intercom products
- Camera-enabled wearable or handheld devices
- Industrial display, sensing, monitoring, and instrumentation products
- Automotive center-console controllers, wireless car keys, and car remotes
- Bluetooth mesh and low-power sensor-hub networks

See [Features and Specs](#features-and-specs) for the graphics, camera, audio, storage, and PTM capabilities behind these uses. The Bluetooth 6.3 figure follows the SF32LB57x datasheets; the product briefs still show an earlier revision. Confirm optional features against the current SiFli documentation for the exact orderable part.

## Development Resources { #development-resources }

[Hardware Design Guide (μForge)]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[SiFli Approved Vendor List]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[SiFli SDK source repository]: https://github.com/OpenSiFli/SiFli-SDK
[Battery Datasheet]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[3.3 V Datasheet]: https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf
[User Manual]: https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf
[Original Design Guide]: https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __Product Brief ([Battery](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf), [3.3 V](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf))__
- :fontawesome-solid-file-pdf: __Datasheet ([Battery / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf), [3.3 V / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf))__
- :fontawesome-solid-file-pdf: __[User Manual (ZH)](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-brands-github: __[SiFli SDK source repository]__
- :fontawesome-solid-file-lines: __[Original Design Guide (wiki.sifli.com, ZH)](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[Dev Kit Guide (wiki.sifli.com, ZH)](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[Hardware Design Guide (μForge)]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

---

## Features and Specs { #features-and-specs }

### Compute and Memory { #compute-and-memory }

- Two Arm Cortex-M33 STAR-MC1 performance cores up to 240 MHz, with FPU and MPU (1968 CoreMark / 740 DMIPS combined)
- Arm Cortex-M33 STAR-MC1 low-power core at 24 MHz
- 32 KB instruction cache + 16 KB data cache (HCPU)
- 592 KB retention SRAM (512 KB HPSYS + 80 KB LPSYS), including 128 KB zero-wait-cycle D-TCM
- Variant-dependent co-packaged memory, up to 48 MB PSRAM and 32 MB NOR Flash

### AI Acceleration { #ai-acceleration }

SiFli's [SF32LB57x hardware guide](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html) lists an integrated AI neural-network accelerator. However, the SiFli SDK [v2.5.1 NNACC guide](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) names 55x, 56x, and 58x, but not 57x. Confirm driver, operator, and toolchain support for the exact 57x target before planning around acceleration.

### PTM Parallel Task Machine { #ptm-peripheral-task-machine }

- 4-core Parallel Task Machine for custom peripheral tasks with hardware-timed execution instead of continuous CPU service
- Cycle-level timing for deterministic IO sequencing
- Up to 16 IO channels per core, with FIFO/DMA support
- Access to AHB memory and peripheral registers, CPU interrupts, and inter-core events

### Wireless Connectivity { #wireless-connectivity }

- Dual-mode Bluetooth 6.3 (Classic Bluetooth and BLE), with BLE Audio and LE Long Range
- Maximum transmit power:
    - 17 dBm for BLE/BR
    - 13 dBm for EDR2 and EDR3
- Sensitivity: −100 dBm @ BLE 1 Mbps

### Graphics, Display, and Camera { #graphics-display-and-camera }

The current μForge interface matrix lists 1024 × 600 RGB888 over DPI/RGB; source qualifications and mode-validation caveats are noted in [Overview](#overview). Confirm the interface and exposed pins for the exact part/package in the [Per-Device Interface Matrix](../../learn/graphics/display-controller.md#per-device-interface-matrix).

- ePicasso 3.0 2D/2.5D graphics accelerator, up to 2048 × 2048
- eZip 3.0 hardware decoder for lossless eZip/eZip-A, plus JPEG and MJPEG
- Dedicated LCD controller supporting 8080, SPI/DSPI/QSPI, DPI/RGB, JDI, and 8/16-bit EPD
- DCMI camera controller supporting DVP and SPI/DSPI/QSPI

### Audio and Analog { #audio-and-analog }

- 1x 24-bit Audio DAC with 109 dB SNR
- 2x 24-bit Audio ADC with 97 dB SNR
- 1x 12-bit general-purpose ADC (12 channels)
- Temperature sensor

### Storage and Security { #storage-and-security }

- 3x MPI (QSPI) for NOR, NAND, and QPI-PSRAM, with XIP
- 2x SD3.0/SDIO3.0/eMMC
- AES/HASH/CRC hardware accelerators
- TRNG
- On-the-fly Flash decryption and eShield security architecture
- PSA Certified Level 1

### Peripherals and I/Os { #peripherals-and-ios }

- 3x UART
- 4x I2C
- 2x SPI
- 2x I2S
- 2x PDM interface (up to two digital microphones each)
- 1x USB2.0 FS
- 2x CAN
- RTC, watchdog, and general-purpose timers (GPTIM, BTIM, ATIM, LPTIM) with PWM
- Up to 58 GPIOs depending on package and part, with FreeIO flexible assignment

### Power Management { #power-management }

- Integrated Buck converter and low-power LDOs; two external 3.3 V outputs, up to 150 mA each
- Hibernate current: 2.8 µA at 3.8 V (battery-powered baseline) or 1 µA at 3.3 V (externally supplied baseline)
- Li-ion charger up to 400 mA (4.2 V to 4.45 V) on the battery-powered baseline
- Battery/system input range[^4]: 3.0 V to 4.7 V
- VBUS range: 4.5 V to 5.5 V
- Operating temperature range: −40°C to +85°C

## Family Variants { #family-variants }

SF32LB57x includes battery-powered variants and variants for externally regulated 3.3 V systems. Select the exact part number before schematic capture, because package drawings, power pins, available GPIO count, bundled memory, and board constraints differ across the family.

The part numbers below come from the ordering tables of SiFli's SF32LB57x datasheets (DS5701 and DS5702, both preliminary drafts), except `SF32LB57ZVN7N6`, which those tables do not list. Confirm each exact order code, co-packaged-memory configuration, electrical limits, and package drawing against SiFli's current part-specific documentation before design-in.

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
| Thickness[^3] | 0.9 mm | 1.1 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| Pitch | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm | 0.35mm |
| GPIOs | 46 | 46 | 46 | 46 | 46 | 47 |
| Co-packaged PSRAM | 4MB OPI-PSRAM | 4MB OPI-PSRAM | 4MB OPI-PSRAM | 8MB OPI-PSRAM | 16MB OPI-PSRAM | None |
| Co-packaged NOR Flash | 16MB QSPI-NOR | 16MB+8MB QSPI-NOR (dual-die)[^6] | 16MB×2 QSPI-NOR (dual-die)[^6] | None | None | 1MB QSPI-NOR |
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
| Thickness[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 1.03 mm |
| Pitch | 0.35mm | 0.35mm | 0.4mm | 0.4mm |
| GPIOs | 58 | 58 | 58 + 6 (MPI3 or static outputs)[^2] | 58[^2] |
| Co-packaged PSRAM | 8MB (2×4MB dual-die) OPI-PSRAM[^6] | 16MB OPI-PSRAM | None | 16MB OPI-PSRAM |
| Co-packaged NOR Flash | None | 16MB QSPI-NOR | 16MB QSPI-NOR | 32MB (2×16MB dual-die) QSPI-NOR[^6] |
| Power supply | **3.3V** | **3.3V** | **3.3V** | **3.3V** |
| I/O voltage[^5] | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V | 3.3V / 1.8V |
| Temperature | -40 to 85°C | -40 to 85°C | -40 to 85°C | -40 to 85°C |

</div>

For SF32LB57x, package selection is not just a PCB-cost question. It affects display-interface availability, external-storage routing, GPIO budget, debug/download pin retention, and fanout difficulty, so package choice should be locked together with the power architecture. Use the orderable part number, not only the package name, as the BOM and schematic baseline -- the memory suffix changes the SiP storage configuration and can affect boot-media assumptions, power sequencing, and external-storage requirements.

## Integration Path { #integration-path }

Use this sequence to turn an SF32LB57x shortlist into a validated design:

1. **Prove the firmware path.** Start with the [SiFli SDK getting-started guide](../../getting-started/sifli/getting-started-sifli-sdk.md), then use the [SiFli SDK workflow](../../develop/platforms/sifli-sdk/overview.md) and [examples](../../develop/examples/index.md) to validate the intended graphics, audio, camera, Bluetooth, and storage features.
2. **Plan the evaluation hardware.** Use [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) to evaluate display, camera, audio and connectivity. Confirm the module memory, board revision and shared-pin configuration before using it as a baseline for a 57x product.
3. **Design and review the hardware.** Use the local [hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) — including its [Customer Design Self-Check](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check) — and the [Design for Production](../../hardware/design-for-production.md) review sequence before releasing the schematic or layout. Apply the [schematic checklist](../../hardware/chip-guides/SF32LB57x_schematic_checklist.md) and [PCB layout checklist](../../hardware/chip-guides/SF32LB57x_pcb_layout_checklist.md) as part of the review.
4. **Verify the authoritative sources.** Confirm the exact orderable part and package against the SiFli [battery datasheet][Battery Datasheet] or [3.3 V datasheet][3.3 V Datasheet], the [user manual][User Manual], and the [original design guide][Original Design Guide]. Use the [SiFli Approved Vendor List] for critical BOM choices.

<!-- uf-faq:start -->
## Frequently Asked Questions

**What are the key specifications of SF32LB57x?**
SF32LB57x provides application processing (2× Cortex-M33 @240 MHz), a low-power core (Cortex-M33 @24 MHz, a dedicated Bluetooth controller), 592 KB of internal SRAM and dual-mode Bluetooth (BT Classic + BLE). Graphics: ePicasso 3.0 + eZip 3.0. Package: QFN68 / QFN80 / BGA112 (7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)). USB 2.0 FS.

The hardware guide lists an integrated neural-network accelerator, but the pinned SDK v2.5.1 NNACC guide does not establish 57x driver or operator support. Confirm the exact target's software path; see [AI acceleration](#ai-acceleration).

**Which display interfaces does SF32LB57x support?**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB. ([Per-Device Interface Matrix](../../learn/graphics/display-controller.md#per-device-interface-matrix)) This is a family-wide list, not a guarantee for every order code or package; check the linked interface matrix.

**What is the maximum display resolution of SF32LB57x?**
The hardware guide states a ceiling of 1024 × 1024; SiFli's LCD FAQ lists common or validated RGB/DPI designs at 1024 × 600 and 720 × 720. The current interface matrix lists 1024 × 600 RGB888. These are not interchangeable guarantees. Check the exact part/package, interface, panel timing, refresh rate, pin multiplexing and framebuffer/PSRAM bandwidth; see the [display qualifications](#overview). ([Per-Device Interface Matrix](../../learn/graphics/display-controller.md#per-device-interface-matrix))

**How much in-package memory does SF32LB57x offer?**
Up to 48 MB of in-package PSRAM and up to 32 MB of in-package NOR Flash.

**What supply voltage does SF32LB57x need?**
Battery-powered variants: 3.0–4.7 V in DS5701, versus 3.45–4.7 V in the hardware guide for QFN68/QFN80/BGA112. DS5701 also gives a power-on voltage of 3.5 V ±10%. Externally regulated variants: 2.97–3.63 V. Resolve the source discrepancy for the exact part and input pin; see the [power qualifications](#power-management).

**Where do I start a hardware design with SF32LB57x?**
Start with the [SF32LB57x hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) for schematic, power, clock/RF and PCB layout guidance, then use the schematic and layout checklists before releasing the board.
<!-- uf-faq:end -->

## Related Products { #related-products }

### Hardware Design Baseline { #hardware-design-baseline }

Use the [Hardware Design Guide (μForge)](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md), the official hardware application note, the datasheet, and the approved vendor list as the design baseline. Confirm the power architecture, package fanout, display, storage, audio, camera, RF, and debug/download plan before releasing the schematic or PCB.

### Development Kits { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) is the evaluation board for RGB displays, DVP cameras, dual PDM microphones, speaker output, SDIO Wi-Fi, and USB. It uses an SF32LB57-MOD-WD module; SiFli's board guide describes a 3.3 V SF32LB57X module with onboard Wi-Fi/Bluetooth, boot QSPI Flash, and optional OPI-PSRAM depending on the module SKU. Confirm the exact module configuration and RF-certification status with SiFli before using the board as a production baseline.

Use the official reference schematics, minimum-system guidance, and checklist material to plan power, clocks, RF, display, storage, audio, camera, and production access.

### Reference Products { #reference-products }

Typical SF32LB57x end products include wearable watches and bands, smart HMI devices, e-paper products, small and medium smart appliances, portable recording/audio devices, smart-home panels, compact display terminals, and camera-enabled Bluetooth products.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
