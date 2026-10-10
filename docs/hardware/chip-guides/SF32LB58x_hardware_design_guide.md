---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware design guide for the SF32LB58x MCU: power architecture, clock and RF design, display, storage, audio, and PCB layout guidance."
tags:
    - Hardware
    - Chip
---

# SF32LB58x Hardware Design Guide { #sf32lb58x-hardware-design-guide }

## 1. Introduction { #1-introduction }

This hardware design guide provides recommendations and reference material for products based on the SF32LB58x family of high-performance AIoT microcontrollers. It is intended for hardware engineers, PCB designers, and product developers building battery-powered products with rich user interfaces, large memory, dual-mode Bluetooth, audio, high GPIO count, and low-power standby requirements.

The guide covers the complete hardware development process, including PMIC and power distribution, BGA256 fanout, HDI stack-up planning, clock circuits, RF design, MIPI-DSI, USB2.0 High-Speed, SDIO/eMMC, audio circuits, PCB layout, validation, and manufacturing preparation. Following these guidelines helps reduce risk in dense BGA/HDI designs, protect signal integrity on high-speed interfaces, and keep the product aligned with the SF32LB58x power, package, and production requirements.

This document assumes a basic understanding of embedded hardware design, schematic capture, and high-density PCB layout. It complements the SF32LB58x datasheet, user manual, official hardware application note, reference design package, and SiFli Approved Vendor List, which remain the authority for electrical specifications, pin multiplexing, package dimensions, component qualification, and production limits.

## 2. Development Resources { #2-development-resources }

[SF32LB58x Product Brief]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SF32LB58x Schematic & PCB Checklist workbook]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[Buy Samples]: https://sifli.taobao.com/
[Buy Dev Kits]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SF32LB58x Schematic & PCB Checklist workbook]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-solid-cart-shopping: __[Buy Samples]__
- :fontawesome-solid-cart-shopping: __[Buy Dev Kits]__

</div>

## 3. Device Overview { #3-device-overview }

### 3.1. Architecture { #31-architecture }

<div align="center"><em>Table 3.1-1: Major Hardware Feature Summary</em></div>

<div align="center" markdown>

| Feature | Description |
|:---|:---|
| Core architecture | Heterogeneous triple-core architecture: 2x application Arm Cortex-M33 STAR-MC1 cores up to 240 MHz and 1x low-power Arm Cortex-M33 STAR-MC1 core up to 96 MHz |
| Bluetooth | Integrated low-power dual-mode Bluetooth 5.3 transceiver |
| Graphics | ePicasso 2.0 2D/2.5D graphics acceleration and Vivante GCNanoUltraV vector graphics |
| Display interfaces | MIPI-DSI, SPI/QSPI, MCU8080, DPI, parallel/serial JDI |
| Storage | Model-dependent co-packaged NOR Flash/PSRAM; external NOR/SPI NAND Flash via MPI3 or MPI4; SD1 and SD2 SDIO interfaces |
| Audio | 3x I2S, 2x PDM, differential analog audio input/output, external analog audio PA and I2S audio PA support |
| Wake interrupts | All GPIOs can wake the chip from Light/Deep Sleep; Standby/Hibernate support 16 wake-up interrupt sources (6 on PA, 10 on PB) |
| PBR interface | Six pins: PBR0 rises from 0 to 1 at power-up and can control selected external LSWs; PBR1-PBR5 default low. PBR0-PBR5 can output LPTIM or 32 kHz and remain usable as outputs in Standby/Hibernate. PBR0-PBR3 can be wake inputs, but do not generate an interrupt while the MCU is awake. |

</div>

### 3.2. Variants { #32-variants }

Confirm the exact SF32LB58x ordering code and co-packaged memory combination against the latest datasheet and AVL before schematic freeze. Treat the family as a BGA256, HDI-only platform; SiP memory varies by model. The family supports external NOR or SPI NAND Flash on MPI3 or MPI4. On the SiFli EVB, MPI4 is the default interface for external SPI NAND; SD1 is used for eMMC or SD NAND, while SD2 is used for an SD card or Wi-Fi device. Check the selected part's pin assignment and the target board's routing before finalizing the design.

### 3.3. Packages { #33-packages }
<div align="center"><em>Table 3.3-1: Package</em></div>

<div align="center" markdown>

| Package Name | Dimensions | Pin Pitch |
|:---|:---|:---|
| BGA256 | 8.5 mm x 6.5 mm x 0.94 mm | 0.4 mm |

</div>

### 3.4. Major Hardware Features { #34-major-hardware-features }

- BGA256 package with 0.4 mm pitch and dense power/GPIO fanout.
- HDI PCB process required; the design is not PTH-compatible.
- Integrated PMU with 2 BUCK outputs and 3 internal LDO outputs.
- Optional system PMIC SF30147C for watch-class system power distribution.
- MIPI-DSI, USB2.0 HS, SDIO/eMMC, RF, audio, and dense BGA fanout require early stack-up and impedance confirmation.

### 3.5. Typical Applications { #35-typical-applications }

SF32LB58x fits connected products that combine advanced graphics, large memory, multimedia, and edge-AI workloads, including:

- Smartwatches, sports watches, and outdoor wearables
- Advanced cycling computers and vehicle-mounted dashboards
- Smart displays and connected dashboards
- AI-enabled wearable devices
- Edge AI and sensor-fusion systems
- High-resolution LVGL-based HMI devices
- Portable medical and industrial terminals
- Bluetooth + Wi-Fi accessories that use an external SDIO Wi-Fi device

## 4. Design at a Glance { #4-design-at-a-glance }

### 4.1. Hardware Architecture { #41-hardware-architecture }
<div align="center"><em>Table 4.1-1: Quick Design Summary</em></div>

<div align="center" markdown>

| Design Item | Typical Implementation |
|:---|:---|
| Package | BGA256, 8.5 mm x 6.5 mm x 0.94 mm, 0.4 mm pitch |
| PCB | HDI board only — not PTH-compatible; 6HDI-2 stack-up recommended |
| Power Supply | Integrated PMU (2x BUCK + 3x LDO); optionally paired with SiFli's PMIC SF30147C for whole-system power |
| Buck Inductor | 4.7 uH, DCR ≤ 0.4 Ω, Isat ≥ 500 mA |
| Clock | 48 MHz main crystal + 32.768 kHz RTC crystal |
| RF | 50 Ω controlled-impedance trace, reserved π matching network |
| Display | MIPI-DSI (2-lane), 3/4-wire SPI, Quad-SPI, MCU8080, DPI, parallel/serial JDI; dual LCDC1 (PA) / LCDC2 (PB) pin mapping |
| Storage | External NOR or SPI NAND Flash via MPI3 or MPI4. The SiFli EVB uses MPI4 for external SPI NAND, SD1 for eMMC or SD NAND, and SD2 for an SD card or Wi-Fi device |
| Audio | 3x I2S (master-only), 2x PDM, differential analog audio input/output |
| Debug | 1x SWD + 6x selectable UART debug outputs |
| USB | USB2.0 HS, Host/Device modes |

</div>

### 4.2. Hardware Design Flow { #42-hardware-design-flow }

<div align="center"><em>Table 4.2-1: Hardware Design Flow</em></div>

<div align="center" markdown>

| Step | Design Decision | Primary Sections |
|:---|:---|:---|
| 1 | Confirm ordering code, SiP memory configuration, and BGA256 package assumptions | Device Overview, Packages |
| 2 | Freeze HDI stack-up, via structure, impedance rules, and assembly capability before layout starts | PCB Layout Guidelines |
| 3 | Decide whether the optional SF30147C system PMIC is needed; define chip PMU rails, BUCK inductors, LDO capacitors, reset, and power sequencing | Power System |
| 4 | Select boot storage, display interface, USB role, SDIO/eMMC usage, audio topology, and debug access | Storage and Connectivity, User Interfaces, Manufacturing |
| 5 | Review clock, RF, DSI, USB2.0 HS, SDIO/eMMC, audio, DC/DC, BGA fanout, and ESD routing screenshots | Clock Generation, RF, PCB Layout Guidelines |
| 6 | Archive schematic, stack-up, DRC, impedance, AVL, manufacturing, and focused layout evidence before prototype release | Design Review Checklist |

</div>

### 4.3. How to Use This Guide { #43-how-to-use-this-guide }

Use this guide in board-review order: confirm the package and SiP-memory configuration, lock the HDI stack-up and PMIC strategy, review boot storage and display routing, then verify clocks, RF, USB, audio, debug, and production test access. Section 5 is the schematic baseline, Section 6 is the PCB implementation baseline, and Section 7 is the release checklist.

### 4.4. Review Evidence Pack { #44-review-evidence-pack }

Before prototype release, archive the schematic PDF, PCB stack-up, via/process capability statement, impedance report, DRC report, AVL cross-check, and focused layout screenshots for the PMIC, BUCK inductors, DSI, USB, SDIO/eMMC, RF, crystals, audio, BGA fanout, ground return, and ESD entry points.

### 4.5. Using the Checklists { #using-the-checklists }

This guide includes two levels of checklist coverage. The short checklists embedded throughout Sections 5.2.1.7 and 5.7.3 give the highest-risk items for a quick engineering self-check. The [Schematic Checklist](SF32LB58x_schematic_checklist.md) (Section 5.8) and [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) (Section 6.18) reproduce SiFli's complete, item-by-item *SF32LB58x Schematic & PCB Checklist* (V1.0, 2026-01-21).

Each check point is Required (must pass before release) or Optional (recommended if the feature is used). Colored text and text with a <span class="flag-yellow">yellow background</span> preserve the source workbook's review emphasis; the workbook doesn't state a reason for each highlight, so treat these marks as additional review flags, not as replacements for any non-highlighted item in the same table.

The source checklist workbook specifies Isat ≥ 450 mA for a non-AVL BUCK inductor, while the official hardware application note specifies Isat ≥ 500 mA for L = 4.7 µH and DCR ≤ 0.4 Ω. The checklist retains the workbook value. Until SiFli clarifies the discrepancy, use an inductor rated for at least 500 mA Isat when selecting a non-AVL part.

Run the [Schematic Checklist](SF32LB58x_schematic_checklist.md) during schematic review, before PCB layout begins. Run the [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) during layout review, before Gerber release. In practice, each pass is usually performed twice: first by the design engineer, then by an independent reviewer before design freeze or manufacturing release.

For best results, treat the checklist as a sign-off record rather than a reading checklist:

1. Confirm the exact target part number and co-packaged memory configuration first.
2. Mark every item as pass / fail / not applicable during review instead of reading the table passively.
3. Cross-check display, storage, wake-up, and low-power rows against the matching hardware design guide sections.
4. Record any open assumptions in the review notes before release.

<div align="center"><em>Table 4.5-1: Review Record Template</em></div>

<div align="center" markdown>

| Field | Value |
|:---|:---|
| Customer name | |
| Customer design name | |
| Submission date for review | |
| Initial reviewer | |
| Initial review date | |
| Follow-up reviewer | |
| Follow-up review date | |

</div>

<div align="center"><em>Table 4.5-2: Checklist Document Version History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>

## Continue the Design Guide { #continue-the-design-guide }

The full guide continues across the pages below. Each covers one stage of the design process and can be reached from here.

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[Schematic Design Guidelines](SF32LB58x_schematic_design.md)__ — power system, clock generation, RF, user interfaces, storage and connectivity, and manufacturing
- :fontawesome-solid-list-check: __[Schematic Checklist](SF32LB58x_schematic_checklist.md)__ — item-by-item schematic review checklist (Section 5.8)
- :fontawesome-solid-microchip: __[PCB Layout Guidelines](SF32LB58x_pcb_layout.md)__ — package footprint, stack-up, fanout, and routing guidance for clock, RF, audio, USB, SDIO, DSI, and power
- :fontawesome-solid-list-check: __[PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md)__ — item-by-item PCB layout review checklist (Section 6.18)
- :fontawesome-solid-book-open: __[Design Review Checklist and References](SF32LB58x_review_and_reference.md)__ — release checklist, related documents, appendices, and revision history

</div>
