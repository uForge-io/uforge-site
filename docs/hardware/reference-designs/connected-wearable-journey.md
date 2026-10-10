---
icon: lucide/waypoints
description: "A practical SF32 reference-design journey from SF32LB52 development-board validation to a custom connected wearable hardware and firmware release plan."
tags:
    - Hardware
    - Reference design
---

# Connected Wearable Reference-Design Journey { #connected-wearable-reference-design-journey }

This journey is a validation workflow for a compact, battery-powered connected product with a display, BLE, and sensor input. It is not a released schematic, BOM, or qualified reference-board package. Use it to establish and test your own hardware/software baseline before designing custom hardware.

1. **Select and establish a baseline.** Use [SF32 Family](../../sf32-products/family/SF32_family.md) and the [SF32 Product Selector](../../sf32-products/product-selector.md) to shortlist suitable parts. Run SiFli-SDK `hello_world` on an [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) or an available board that meets the required interface and hardware constraints. Record the board revision, SDK version or commit, build/flash commands, and serial log.
2. **Prove product functions.** Follow [Tutorials](../../getting-started/tutorials/overview.md) to validate input/sensor handling, BLE, a simple UI, storage if needed, and the serial recovery path.
3. **Validate system interactions.** Use [Graphics](../../learn/graphics/overview.md), [Bluetooth](../../learn/bluetooth/overview.md), and [Low Power](../../learn/low-power/overview.md) to test display refresh, wireless activity, and sleep/wake together.
4. **Prepare custom hardware.** Use the selected chip's design guide and checklist through [Design for Production](../design-for-production.md); confirm display, storage, battery, antenna/RF, and programming/test assumptions.
5. **Prepare release evidence.** Preserve the board name and revision, SDK version or commit, known-good firmware image, logs, measured power scenarios and their conditions, recovery/OTA behavior, BOM choices, and checklist decisions.

A successful demo alone does not complete this workflow. The build, flashing, and recovery procedures must be repeatable, with measured evidence that the product's defining subsystems work together on representative hardware. Record the operating scenario, supply voltage, and measurement conditions with each power result so another engineer can reproduce the comparison.
