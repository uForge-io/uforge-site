---
icon: lucide/clipboard-check
hide:
    - navigation
description: "Customer design self-check, related documents and references, appendices, and revision history for the SF32LB57x hardware design guide."
tags:
    - Hardware
    - Chip
---

# SF32LB57x Hardware Design Guide — Design Review Checklist and References { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Part of the SF32LB57x Hardware Design Guide"
This page covers Sections 7-10: the customer design self-check, related documents and references, appendices, and revision history. Return to the [PCB layout guidelines](SF32LB57x_pcb_layout.md).

## 7. Customer Design Self-Check { #7-customer-design-self-check }

Complete this checklist before requesting a schematic review, PCB layout review, or EVT release. The customer-side design owner should record the result and evidence for each item and, where applicable, cite schematic pages and attach PCB screenshots, measurements, or review records.

### 7.1. Package and Part Number { #71-package-and-part-number }

- [ ] Orderable part number, power family, package, and pinout are confirmed.
- [ ] The schematic-library symbol and PCB footprint match the datasheet.
- [ ] QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY --> pads, stencil, exposed pad, and via design are reviewed.

### 7.2. Power { #72-power }

- [ ] Every supply pin stays within its specified voltage and load limits; capacitor values and placement meet the datasheet requirements.
- [ ] BUCK inductor, capacitors, and feedback routing meet layout requirements.
- [ ] Internal LDO outputs are not misused as high-current peripheral supplies.
- [ ] Power paths match the selected supply family; verify the applicable charger/OVP, VBUS, VBAT, VCC, and/or PVDD connections against the exact package-and-variant power table, without mixing the battery-powered and 3.3 V supply topologies.
- [ ] Peripheral power rails can be switched off and default to safe states.

### 7.3. Clocks { #73-clocks }

- [ ] 48 MHz and 32.768 kHz crystals meet recommended parameters.
- [ ] Crystals are placed close to the chip, with keep-out areas defined around them.
- [ ] Crystal routing is away from power, RF, USB, SDIO, display, and charging noise.

### 7.4. Storage and Boot { #74-storage-and-boot }

- [ ] If the selected part includes co-packaged memory, its configuration and effect on available external memory interfaces and package pins are confirmed for that exact package and variant.
- [ ] External boot media type, pull-ups, power control, and default state are correct.
- [ ] Boot configuration and download/debug test points are reserved.

### 7.5. RF { #75-rf }

- [ ] The antenna feed trace is designed for a controlled 50 Ω impedance.
- [ ] π matching network is placed near the chip.
- [ ] RF trace has a continuous reference ground and via shielding.
- [ ] RF is isolated from noise sources and high-speed interfaces.

### 7.6. Display and Touch { #76-display-and-touch }

- [ ] Display interface, resolution, and pin group meet panel requirements.
- [ ] Display, backlight, and touch supplies are controllable.
- [ ] Touch interrupt uses a wake-capable GPIO if wake is required.
- [ ] FPC and high-speed display traces are kept away from RF.

### 7.7. Audio and Analog { #77-audio-and-analog }

- [ ] MIC_BIAS, AUD_VREF, and AVDD33_AUD decoupling is correct.
- [ ] Analog input DC-blocking and filtering are correct.
- [ ] DACP/DACN differential routing and matching network are correct.
- [ ] GPADC input voltage, divider, filtering, and shielding are correct.

### 7.8. General Interfaces { #78-general-interfaces }

- [ ] UART, I2C, SPI, SDIO, USB, and CAN wiring and IO levels are correct.
- [ ] The I2C pull-up rail switches with the corresponding peripheral I/O supply to prevent leakage when that domain is off.
- [ ] USB ESD, 90 ohm differential routing, and VBUS wake detection are implemented as needed.
- [ ] External wake signals use wake-capable pins.

### 7.9. Production and Reliability { #79-production-and-reliability }

- [ ] DBG-UART, SWD, boot-mode, PA00, PA01, PA34, power, and ground test points are reserved.
- [ ] Test points meet fixture probe requirements.
- [ ] ESD, EOS, OVP, reverse-protection, and surge strategy are reviewed.
- [ ] Production firmware download, crystal calibration, and RF test flow are executable.

### 7.10. Design Review Release Criteria { #710-review-release-criteria }

Before design freeze, use these release criteria:

- [ ] Every applicable item is closed with evidence such as schematic page references, PCB screenshots, measurements, or review notes; each item marked not applicable has a rationale.
- [ ] Every deviation from the datasheet or reference design has a project-level design reason.
- [ ] RF, crystals, charging, power, USB, display, audio, and production test points have been reviewed by the responsible owners.
- [ ] The low-power current budget includes all peripheral standby currents, pull-up currents, and regulator Iq.
- [ ] EVT bring-up paths for download, logs, current measurement, reset, and boot control are accessible.

## 8. Related Documents and References { #8-related-documents-and-references }

Use the latest official documents to verify electrical limits, package data, pin multiplexing, software configuration, component qualification, and manufacturing constraints.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB57x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB57x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB57x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__

</div>

The [Schematic Checklist](SF32LB57x_schematic_checklist.md) (Section 5.8) and [PCB Layout Checklist](SF32LB57x_pcb_layout_checklist.md) (Section 6.10) reproduce SiFli's official SF32LB57x design self-check tables item by item, alongside the schematic and PCB layout guidance they check against.

## 9. Appendices { #9-appendices }

The appendices collect application and reference-design context. Use them after the main schematic and PCB rules in Sections 5 and 6 have been applied.

<div align="center"><em>Table 9-1: Appendix Index</em></div>

<div align="center" markdown>

| Need | Start Here |
|:---|:---|
| Minimum system schematic examples | Section 5.1.2 |
| Package, land-pattern, stencil, stack-up, fanout, power, RF, audio, SDIO, USB, and TVS reference images | Section 6.9 |
| Customer design self-check | Section 7 |

</div>

### 9.1. Appendix A. A Typical SF32LB57x Product { #appendix-a-a-typical-sf32lb57x-product }

A typical SF32LB57x product may include the MCU, power tree, 48 MHz and 32.768 kHz crystals, RF matching and antenna, display and touch controller, boot storage, audio input/output, sensors, an optional camera, and whichever USB/SDIO/CAN/UART/I2C/SPI peripherals the product needs, together with debug and production-test access. Review charging, OVP, load-switch selection, and low-power leakage where applicable to the chosen power architecture.

## 10. Revision History { #10-revision-history }

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:--------|:-----|:------|
| 0.5 | 2026-08 | Restored full fidelity to the official application note: added the four per-package/power-family power-pin reference tables, the default debug-port table, the RF schematic figure, the complete display signal tables (SPI/QSPI, RGB, RGB mode configuration, MCU8080, EPD, parallel/serial JDI, touch/backlight), the analog-MIC/PDM-MIC/audio-PA reference figures, the full chip-specific camera signal table, the IO MUX table, the matrix table, the LCDC matrix sub-MUX table, the USB pin table, the expanded per-pin GPADC table, and the power-key/GPADC-key reference figure. Split the official design self-check tables into new companion [Schematic Checklist](SF32LB57x_schematic_checklist.md) and [PCB Layout Checklist](SF32LB57x_pcb_layout_checklist.md) pages so no check item is dropped. |
| 0.4 | 2026-08 | Reconciled facts against the official SF32LB57x hardware application note: corrected the `VCC`/`VBAT` pin-table minimum (3.0 V, not 3.2 V), added the 2.7 V hardware shutdown threshold, corrected the `VDD33_VOUT1` soft-start current limit to 30 mA, corrected the 32.768 kHz crystal load-capacitance options (7 pF or 11.5 pF, chip defaults to 11.5 pF), specified the `PA34` power/reset key circuit and GPADC resistor-divider key design, added the GPADC 0 V-3.3 V input range and 100 nF filter capacitor, added `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA` capacitor values, added MPI bus length/skew and crystal placement-spacing PCB constraints, and added the 4-layer stack-up assignment. |
| 0.3 | 2026-07 | Restructured schematic guidance so Minimum System Design, Power System, Clock Generation, RF, User Interfaces, Storage and Connectivity, and Manufacturing are separate peer sections. |
| 0.2 | 2026-07 | Added evidence pack, bring-up guidance, low-power validation, RF/display/audio/camera validation, and PCB critical-constraint quick reference. |
| 0.1 | 2026-07 | Initial SF32LB57x hardware design guide release based on the official hardware application note. |
| 0.0.1 | 2026-06 | Upstream source revision 0.0.1: initial SF32LB57x hardware application note; versioned separately from this guide. |

</div>

### 10.1. Checklist Revision History { #101-checklist-revision-history }

The item-by-item checklist in the [Schematic Checklist](SF32LB57x_schematic_checklist.md) and [PCB Layout Checklist](SF32LB57x_pcb_layout_checklist.md) is versioned separately from the guide, following the design self-check tables in SiFli's SF32LB57x hardware application note.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| Version | Date | Notes |
|:--------|:-----|:------|
| 1.0 | 2026-08 | Initial release, transcribed in full from the design self-check tables (Section 4) of the official SF32LB57x hardware application note, 2026-06 edition. |

</div>

[SF32LB57x Product Brief]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x Datasheet]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[SF32LB57x Hardware Application Note]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
