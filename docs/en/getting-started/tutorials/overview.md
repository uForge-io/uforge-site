---
icon: lucide/map
description: "A practical SF32 tutorial roadmap organized by engineering outcome: first peripherals, connected subsystems, and product validation."
tags:
    - Tutorials
---

# Tutorials Overview { #tutorials-overview }

This series turns a successful first flash into practical SF32 development skills. It is organized by engineering scope: first prove one peripheral, then combine subsystems, then build the evidence needed for a product. The tutorials use SiFli-SDK examples as starting points, but the habits—verify hardware, keep a known-good baseline, and measure the result—apply to every SF32 software path.

Tutorials are the second stage of [Getting Started](../index.md). Complete its first-run success criteria first. If you are choosing a chip, module, or development board, start with the [SF32 Family](../../sf32-products/family/SF32_family.md) before beginning the series.

## What You Need { #what-you-need }

Use an SF32 development board with a working USB data connection and serial console. For example, `sf32lb52-lcd_n16r8` is the SiFli-SDK board name for SF32LB52-DevKit-LCD_N16R8. The series does not assume that one board supports every exercise: check each example's Supported Platforms list, and verify pin, peripheral, display, audio, and storage details in the relevant schematic and board files. For SF32LB52x SDK board identifiers, see the official [Supported Boards](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) list.

<div align="center"><em>Table: Tutorial Prerequisites</em></div>

<div align="center" markdown>

| Item | Minimum readiness check |
|:-----|:------------------------|
| Toolchain | SiFli-SDK can build a known example for your board. |
| Flash flow | You can repeatedly program the board without changing the setup. |
| Serial console | You can see boot logs and access the FinSH `msh>` prompt. |
| Board information | You have the board schematic or support files before assigning pins or peripherals. |
| Measurement tools | Use a multimeter or logic analyzer where useful; use a current-measurement setup for low-power work. |

</div>

## Recommended Learning Path { #recommended-learning-path }

<div align="center"><em>Table: Tutorial Roadmap</em></div>

<div align="center" markdown>

| Outcome track | Start when | You will practice | Continue with |
|:------|:-----------|:------------------|:--------------|
| [First Peripherals](beginner.md) | `hello_world`, flash, and serial output work. | GPIO, FinSH, ADC, PWM, RTC, and a small board-level project. | Move on when you can independently prove an input, output, and basic peripheral. |
| [Connected Subsystems](intermediate.md) | Single peripherals work reliably. | I2C sensors, LVGL, BLE, audio, storage, and deliberate coexistence testing. | Move on when two real subsystems remain stable together. |
| [Product Validation](advanced.md) | You can integrate middleware and diagnose ordinary failures. | Measured power, OTA recovery, custom displays, crash analysis, multi-connection BLE, and reusable drivers. | Use the relevant Develop and Learn articles as ongoing implementation references. |

</div>

The order is deliberate. Do not start with a display, BLE service, or custom driver until the board, flash flow, serial console, and a simple GPIO test are known-good. When a later tutorial fails, return to the last stage whose success criterion you can still reproduce.

## How to Use Each Tutorial { #how-to-use-each-tutorial }

Each exercise identifies a close SDK example, a goal, a success criterion, and likely failure checks. Start from the named example rather than an empty project, change one behavior at a time, and preserve a known-good build before combining features. Record the board revision, SDK version, board name, and observed result for any configuration you expect to reuse.

The tutorials intentionally do not replace the reference material:

- Use [Develop](../../develop/index.md) for platform workflows, tools, firmware topics, and the consolidated SDK example index.
- Use [Learn](../../learn/graphics/overview.md) for architecture and subsystem decisions, such as graphics flow, Bluetooth behavior, and power strategy.
- Use the [SF32 Family](../../sf32-products/family/SF32_family.md) for device selection, board information, hardware design guidance, and production checks.
