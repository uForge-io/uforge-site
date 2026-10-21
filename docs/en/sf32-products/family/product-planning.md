---
icon: lucide/route
description: "End-to-end SF32 product-planning path: select a device and integration level, validate software on a board, then prepare the design for production."
tags:
    - Hardware
    - Product planning
---

# Plan a Product { #plan-a-product }

This guide maps the decisions needed to take an SF32 concept from initial requirements through validation to a production-ready design plan. Follow the stages in order while the chip, module, development board, software stack, and manufacturing approach are still undecided.

## Product Planning Path { #product-planning-path }

<div align="center"><em>Table: SF32 Product Planning Path</em></div>

<div align="center" markdown>

| Stage | Key decision | Start here | Exit criterion |
|:------|:-------------|:-----------|:---------------|
| 1. Define requirements | Wireless device role, display, audio, AI, storage, power supply and consumption budget, package area, and target product lifetime. | [SF32 Family](SF32_family.md) | A ranked shortlist with explicit must-have interfaces and constraints. |
| 2. Select integration | A custom PCB with the chip mounted directly, a module plus carrier board, or a development board for early validation. | [SF32 Product Selector](../product-selector.md) | A preferred device and integration approach, plus the closest available board or module. |
| 3. Prove the software baseline | Toolchain, flash flow, serial output, and one known-good example on the selected or closest board. | [Getting Started](../../getting-started/index.md) | A repeatable build-and-flash process with a captured console log. |
| 4. Validate product risks | Product-specific behavior of the display, Bluetooth, audio, AI, and storage, plus the power-supply path and consumption profile. | [Tutorials](../../getting-started/tutorials/overview.md), [Learn](../../learn/index.md), and [Develop](../../develop/index.md) | Measured results for the subsystems that drive cost, power, or schedule risk. |
| 5. Freeze the implementation plan | Schematic, layout, memory/partition plan, BOM, test approach, update/recovery behavior, and manufacturing assumptions. | [Design for Production](../../hardware/design-for-production.md) | Reviewed design package and an explicit list of remaining validation items. |

</div>

## Do Not Skip the Board Validation Loop { #do-not-skip-the-board-validation-loop }

A family comparison and a successful compile are not enough to select a production device. Validate the closest board before freezing hardware, then record the board name, SDK version, SDK example used, measured behavior, and differences from the intended product. If the final product uses a new display, storage part, battery path, antenna, or module carrier, treat each as a separate validation item.

For a complete worked path, choose the closest [Reference Design](../../hardware/reference-designs/reference-designs.md) after the initial hardware and software baseline is established.

## Handoff Checklist { #handoff-checklist }

- [ ] The selected part or module meets the product's interface, memory, package, power-supply, and power-consumption constraints.
- [ ] A supported board or deliberate custom-hardware validation plan exists.
- [ ] The software path and its maturity are accepted by the product team.
- [ ] Recovery, OTA/DFU, logging, and factory-programming needs are defined before partition and BOM decisions are frozen.
- [ ] The correct hardware design guide, checklist, AVL, and EDA library have been identified.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
