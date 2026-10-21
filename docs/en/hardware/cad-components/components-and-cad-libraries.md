---
icon: lucide/boxes
description: "Use component qualification records and official CAD data for an SF32 production design, then review the BOM and PCB layout in the right order."
tags:
    - Hardware
    - Production
    - CAD
---

# Components and CAD Libraries { #components-and-cad-libraries }

Use this page when a selected SF32 device or module is moving from an architecture decision into a controlled BOM and PCB design. The two resources below serve different purposes: the **Approved Vendor List (AVL)** helps choose components that SiFli has qualified, while the **EDA Tool Libraries** provide the symbols, footprints, and reference project data needed to implement the chosen hardware correctly.

Neither resource replaces the device-specific hardware design guide, package drawing, or final validation on the production-intent board.

## Choose the Right Resource { #choose-the-right-resource }

<div align="center"><em>Table: Components and CAD Resources</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Resource | Use it for | Do not use it as a substitute for |
|:---------|:-----------|:----------------------------------|
| [SF32 Approved Vendor List](sifli-approved-vendor-list.md) | Shortlisting qualified crystals, inductors, Flash, and other supported components; checking electrical and firmware-identification constraints. | Final component approval, supply-chain qualification, or product-level electrical validation. |
| [EDA Tool Libraries](eda-tool-libraries.md) | Obtaining schematic symbols, PCB footprints, package drawings, and reference design assets as a starting point in the supported EDA tools. | Verification of the exact orderable part number, pad-stack definitions, assembly process, or current device documentation. |

</div>

## BOM-to-CAD Review Sequence { #bom-to-cad-review-sequence }

1. **Lock the implementation baseline.** Select the exact chip or module, package, memory configuration, display interface, and power architecture. Read its hardware design guide before choosing supporting components.
2. **Shortlist critical components from the AVL.** Check the stated electrical requirements, not only a matching part number. Pay particular attention to crystal load capacitance and ESR, buck inductor current limits, Flash voltage and timing mode, temperature range, and firmware compatibility.
3. **Create the schematic from official libraries.** Use the relevant EDA libraries and reference designs as a starting point. Independently compare each symbol, footprint, pin number, land pattern, and keep-out rule with the selected part's current datasheet and package drawing.
4. **Review the complete BOM and layout together.** Ensure that every qualified component still fits the actual rail voltage, current, interface speed, assembly process, and enclosure constraints. Apply the device or module design guide's requirements for power, RF, clocks, memory, display, and debug access.
5. **Validate production-intent hardware.** Test boot, programming, peripherals, wireless, and recovery behavior, and measure power consumption on the final board revision. Record approved alternates and every deliberate deviation from the guide or AVL.

## Practical Boundaries { #practical-boundaries }

- An AVL is a qualification snapshot. Reconfirm the list's revision and component availability before releasing a production BOM.
- An EDA library provides starting design data, not proof that a finished layout is manufacturable or electrically correct.
- If a component is not listed in the AVL, qualify it against the relevant requirements and validate it on the target hardware before use in volume.
- For a module-based product, begin with the module's design guide; the carrier-board BOM and layout still require the same review discipline.

Continue with [Design for Production](../design-for-production.md) for the full design-review path, or return to the [SF32 Product Selector](../../sf32-products/product-selector.md) if the chip, module, or board baseline has not yet been selected.
