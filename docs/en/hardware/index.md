---
icon: lucide/cpu
title: Hardware
description: Reuse an SF32 reference baseline or implement a selected device, then prepare the design for production.
---

# Hardware { #hardware }

After selecting an SF32 device and validating a development-board baseline, use this section to design the board or module carrier and prepare it for production. Start with a reference design if one fits, follow the device-specific implementation guide, and assemble the evidence and design package needed for the production-readiness review.

## Choose a Starting Point { #choose-a-starting-point }

<div align="center"><em>Hardware Paths</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Your task | Start here | Outcome |
|:----------|:-----------|:--------|
| Reuse a validated hardware and software baseline | [Reference Designs](reference-designs/reference-designs.md) | A reproducible starting point, its validation focus, and its reuse boundaries. |
| Design a chip-down board or module carrier | [Find the matching guide](#find-a-guide) | The matching chip or module implementation guidance and available checklist. |
| Plan a module interface using the M2 proposal | [M2 Modules](m2-modules/interface-standards-overview.md) | The M2 naming convention and draft pin-level proposal to verify for the selected module. |
| Prepare CAD and BOM assets | [CAD & Components](cad-components/components-and-cad-libraries.md) | Official EDA libraries, AVL resources, and the checks needed for the selected part. |
| Release a design package | [Design for Production](design-for-production.md) | The production-readiness review, retained evidence, and manufacturing handoff. |

</div>

## Find a Guide { #find-a-guide }

Choose the chip or module at the center of your design, then open the matching implementation material. Use the product introduction first if you still need to confirm the package, power baseline, memory tier, or integration approach.

### Chip Guides and Checklists { #chip-guides-and-checklists }

<div align="center"><em>Table: Chip Guides and Checklists</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Selected chip family | Hardware design guide | Checklist | Start here when |
|:---------------------|:----------------------|:----------|:----------------|
| SF32LB52x | [Guide](chip-guides/SF32LB52x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB52x chip-down board. |
| SF32LB55x | [Guide](chip-guides/SF32LB55x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB55x chip-down board. |
| SF32LB56x | [Guide](chip-guides/SF32LB56x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB56x chip-down board. |
| SF32LB57x | [Guide](chip-guides/SF32LB57x_hardware_design_guide.md) | [Schematic](chip-guides/SF32LB57x_schematic_checklist.md) / [PCB layout](chip-guides/SF32LB57x_pcb_layout_checklist.md) | Designing an SF32LB57x chip-down board. |
| SF32LB58x | [Guide](chip-guides/SF32LB58x_hardware_design_guide.md) | [Checklist](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | Designing an SF32LB58x chip-down board. |

</div>

### Module Guides { #module-guides }

<div align="center"><em>Table: Module Integration Guides</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Selected module | Module guide | Use it for |
|:----------------|:-------------|:-----------|
| SF32LB52-MOD-1 | [Module guide](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | Carrier-board power, pin planning, antenna clearance, and manufacturing handling. |
| SF32LB56-MOD | [Module guide](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | Carrier-board integration, power, RF placement, interfaces, and validation. |
| SF32LB58-MOD | [Module guide](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | Carrier-board power, pin planning, antenna clearance, and manufacturing handling. |

</div>

## Follow the Hardware Path { #follow-the-hardware-path }

1. **Reuse a reference baseline when it fits.** Reproduce its stated board and software baseline before adapting it; otherwise, begin directly with the selected device guide.
2. **Implement and review.** Use the matching guide before schematic capture, then apply its checklist during schematic and layout review. Validate the intended software and peripheral path on the closest [development board](../sf32-products/index.md) before freezing hardware. Development-board tests do not replace power, pin-function and RF validation on the final board.
3. **Use M2 materials when the carrier is intended to follow the M2 proposal.** Apply the [M2 naming rules](m2-modules/M2%20Interface%20Naming%20Rules.md) and confirm the [interface definition](m2-modules/M2-interface-definition.md) against the exact module before committing to the interface; the pin-level definition remains a draft.
4. **Verify CAD and component choices.** Use [CAD & Components](cad-components/components-and-cad-libraries.md) to cross-check the symbol, footprint, package drawing, AVL, and critical component assumptions for the exact part.
5. **Close the release gate.** Move to [Design for Production](design-for-production.md) with the design evidence, approved deviations, remaining risks, and manufacturing-test assumptions.

## Continue Your Development { #stay-connected-to-the-platform-path }

If the part, module, or board direction is still uncertain, return to [SF32 Products](../sf32-products/index.md). For a repeatable toolchain, flash, and serial-log baseline, use [Getting Started](../getting-started/index.md). Continue to [Develop](../develop/index.md) for software implementation guidance that must be validated alongside the hardware.
