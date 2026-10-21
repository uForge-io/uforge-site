---
icon: lucide/waypoints
description: "Reference-design journeys for μForge: compare reproducible hardware and software validation paths, then follow the one closest to your product."
tags:
    - Hardware
    - Reference design
---

# Reference Designs { #reference-designs }

Reference designs connect product planning with implementation. A reusable hardware and software baseline should identify the starting hardware, software version, available design files, bring-up evidence, and reuse limits. The journeys listed here help you assemble and validate that baseline; their inclusion does not establish a released schematic, BOM, or production qualification package.

Use [Plan a Product](../../sf32-products/family/product-planning.md) to form the initial shortlist, then choose the closest journey below to organize board validation and product-risk reduction.

## Reference Designs and Projects { #reference-designs-and-projects }

Use a reference design to answer, **“What reusable technical baseline can I start from?”** Use a [Project](../../projects/index.md) to answer, **“How do I carry a specific product from that baseline through integration and release decisions?”**

<div align="center"><em>Table: Reference Design and Project Boundary</em></div>

<div align="center" markdown>

| Item | Reference design | Project |
|:-----|:-----------------|:--------|
| Primary role | A reusable technical baseline. | A product-specific path through integration and release decisions. |
| Core evidence | Hardware/software baseline, design files or their availability, bring-up results, and reuse limits. | Product decisions, dependencies, adaptation stages, validation gates, and release evidence. |
| Reuse expectation | A reader may adopt and adapt the baseline for multiple products. | A reader follows one product outcome, then makes controlled product-specific changes. |
| Relationship | Links to projects that adopt it. | Links back to the reference design it starts from, when applicable. |

</div>

## Available Journeys { #available-journeys }

The current Connected Wearable journey is a validation workflow, not a released reference-board package. It does not yet publish a fixed board/SDK revision pair, design-file release, or measured qualification record. Establish and record those baselines for your product before treating the results as reproducible.

<div align="center"><em>Table: Reference-Design Journeys</em></div>

<div align="center" markdown>

| Journey | Product focus | Hardware baseline | Software baseline | Validation emphasis |
|:--------|:--------------|:------------------|:------------------|:--------------------|
| [Connected Wearable](connected-wearable-journey.md) | Compact battery-powered product with a display, BLE, and sensor input. | SF32LB52-DevKit-LCD or a suitable alternative board, followed by a custom board built around the selected chip or module. | SiFli-SDK `hello_world` and product-relevant examples. | Display, Bluetooth, sensor behavior, sleep/wake, recovery, and production-design evidence. |

</div>

## How to Use a Journey { #how-to-use-a-journey }

1. Confirm that the journey's product focus and selected hardware fit your design constraints.
2. Reproduce its software baseline on the stated board before adapting it.
3. Keep the exact board, SDK version, example, build/flash command, and serial log with the project record.
4. Add product-specific validation for every changed display, memory device, battery path, RF design, enclosure, or interface.
5. Use the results as inputs to [Design for Production](../design-for-production.md), including the selected guide, checklist, AVL decisions, recovery approach, and remaining risks.

## Adding a New Journey { #adding-a-new-journey }

Before presenting a journey as a reproducible reference baseline, document its intended product and reader, supported hardware and software versions, prerequisites, source repository, milestones, validation criteria, measurements, and product-adaptation handoff. If it is still a planning workflow, label that status explicitly and list the missing evidence rather than implying the baseline is qualified.

For project-focused, end-to-end builds that go beyond a reusable reference path, use [Projects](../../projects/index.md). A project should cross-link back to the relevant reference design rather than duplicate its hardware baseline, design files, or production material.
