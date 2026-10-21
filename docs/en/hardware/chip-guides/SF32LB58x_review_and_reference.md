---
icon: lucide/clipboard-check
description: "Design review checklist, related documents and references, appendices, and revision history for the SF32LB58x hardware design guide."
tags:
    - Hardware
    - Chip
hide:
    - navigation
---

# SF32LB58x Hardware Design Guide — Design Review Checklist and References { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "Part of the SF32LB58x Hardware Design Guide"
    This page covers Sections 7-10: Design Review Checklist, Related Documents and References, Appendices, and Revision History. Return to [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md).

## 7. Design Review Checklist { #7-design-review-checklist }

- [ ] Confirm that the selected model's co-packaged Flash/PSRAM combination meets the product requirements
- [ ] Verify that the PMU supply (PVDD1/PVDD2/BUCK/LDO) and all other power-pin voltages are within the datasheet limits
- [ ] Verify that the selected BUCK inductor has a nominal inductance of 4.7 µH, DCR ≤ 0.4 Ω, and Isat ≥ 500 mA
- [ ] Confirm that the 48 MHz and 32.768 kHz crystals meet the recommended specifications and that their routing and keep-out zones meet the design requirements
- [ ] Verify a 50 Ω controlled-impedance RF trace and place the matching network close to the chip
- [ ] Confirm that the selected external storage interface is compatible with the intended boot design. Separately verify that the Mode pin is strapped high for download mode or low for user-application startup, as intended
- [ ] Confirm that display-interface routing (MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI) meets each interface's impedance and length-matching rules; for DSI, verify 100 Ω differential impedance, intra-pair length mismatch ≤0.5 mm, and inter-pair length mismatch ≤2 mm
- [ ] Confirm that USB routing meets the 90 Ω differential-impedance requirement. Route SDIO signals together, keep total routing length ≤50 mm, and limit within-group length mismatch to ≤6 mm
- [ ] Preserve SWD access and the selected debug-output interface from the six available UARTs, along with its signal pins and production test points
- [ ] Confirm that BGA pad vias are centered and the ground plane beneath the chip is continuous
- [ ] Verify key component part numbers against the latest [SiFli Approved Vendor List][SiFli Approved Vendor List (AVL)]
- [ ] Include stack-up and process-capability data, impedance and DRC results, the AVL, and focused layout screenshots in the review evidence pack
- [ ] Close all open schematic, layout, and manufacturing issues before prototype release, or explicitly track them to closure

## 8. Related Documents and References { #8-related-documents-and-references }

Use the latest official documents when checking electrical limits, package data, pin multiplexing, software configuration, and component qualification.

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x Product Brief]__
- :fontawesome-solid-file-pdf: __[SF32LB58x Datasheet]__
- :fontawesome-solid-file-pdf: __[SF32LB58x User Manual]__
- :fontawesome-solid-file-lines: __[SF32LB58x Hardware Application Note]__
- :fontawesome-solid-file-excel: __[SiFli Approved Vendor List (AVL)]__
- :fontawesome-brands-wikipedia-w: __[SiFli Chip Hardware Design Guide Index (Wiki)]__

</div>

Together, the [Schematic Checklist](SF32LB58x_schematic_checklist.md) (Section 5.8) and [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) (Section 6.18) reproduce the applicable schematic and PCB items from the *SF32LB58x Schematic & PCB Checklist* workbook (V1.0, 2026-01-21), alongside the design guidance they check against.

[SF32LB58x Product Brief]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x Datasheet]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x User Manual]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x Hardware Application Note]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[SiFli Approved Vendor List (AVL)]: ../cad-components/sifli-approved-vendor-list.md
[SiFli Chip Hardware Design Guide Index (Wiki)]: https://wiki.sifli.com/hardware/index.html

## 9. Appendices { #9-appendices }

The appendices collect application and reference-design context. Use them as review aids after the main schematic and PCB rules in Sections 5 and 6 have been applied.

<div align="center"><em>Table 9-1: Appendix Index</em></div>

<div align="center" markdown>

| Need | Start Here |
|:---|:---|
| Application context for a feature-rich wearable device or smart terminal | Appendix A: A Typical Smart Wearable or Smart Terminal |
| Schematic screenshots and circuit-level examples | Section 5 and the SF32LB58x hardware application note |
| PCB layout screenshots for BGA, HDI, RF, DSI, USB, SDIO, audio, and power | Section 6 and the SF32LB58x hardware application note |

</div>

### 9.1. Appendix A. A Typical Smart Wearable or Smart Terminal { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

A typical SF32LB58x design for a wearable device or smart terminal includes the MCU, PMIC, high-resolution display, touch controller, boot storage, external memory or eMMC, sensors, vibration motor, audio input/output, Bluetooth antenna, crystals, USB, debug access, and production test access. The BGA256 package and high-speed display/storage interfaces make HDI process selection part of the system architecture, not just a PCB-layout detail.

## 10. Revision History { #10-revision-history }

<div align="center"><em>Table 10-1: Revision History</em></div>

<div align="center" markdown>

| Version | Date | Note |
|:---|:---|:---|
| 1.0 | 2026-07 | Updated SF32LB58x hardware design guide with schematic, PCB, validation, and production-review guidance |
| 0.0.1 | 1/2025 | Official Draft release of `SF32LB58x-HW-Application` |

</div>

### 10.1. Checklist Revision History { #101-checklist-revision-history }

The item-by-item checklist in the [Schematic Checklist](SF32LB58x_schematic_checklist.md) and [PCB Layout Checklist](SF32LB58x_pcb_layout_checklist.md) is versioned separately from the guide, following SiFli's own *SF32LB58x Schematic & PCB Checklist* workbook.

<div align="center"><em>Table 10.1-1: Checklist Revision History</em></div>

<div align="center" markdown>

| No. | Version | Date | Release Notes |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | Initial release of the Schematic & PCB Checklist document |

</div>
