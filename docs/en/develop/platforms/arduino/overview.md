---
icon: lucide/infinity
description: "ArduinoCore-zephyr for SF32LB52 DevKit LCD: platform fit, board identity, loader and build-mode choices, integration limits, and escalation paths."
tags:
    - Develop
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) is a Zephyr-based Arduino core for SF32. It is a useful path for sketches, peripheral experiments, demonstrations, and early prototypes on the **SiFli SF32LB52 DevKit LCD**.

!!! warning "Beta core"
    OpenSiFli labels this core **BETA**. Features, APIs, package contents, loader behavior, and releases may change. Confirm current behavior in the project README and Releases before committing a product to this path.

For the initial IDE installation, board/port selection, bootloader installation, and Blink check, use [Getting Started with Arduino](../../../getting-started/arduino/getting-started-arduino.md). This page is for deciding whether Arduino is a fit and for maintaining an Arduino-based project after that first run.

## Where Arduino Fits { #where-arduino-fits }

Choose Arduino when fast iteration and the familiar sketch model matter more than complete access to SF32-specific capabilities. It is a good fit for proof-of-concept work, simple peripheral validation, classroom or demonstration projects, and teams with an existing Arduino codebase.

Move to [SiFli-SDK](../sifli-sdk/overview.md) when the product depends on a production firmware baseline, Bluetooth-stack tuning, graphics-heavy applications, low-power optimization, board bring-up, or vendor middleware. Use [Zephyr](../zephyr/overview.md) when you need direct control of devicetree, Kconfig, and Zephyr-native application structure.

<div align="center"><em>Table: Arduino platform fit</em></div>

<div align="center" markdown>

| Choose Arduino for | Prefer another path for |
|:-------------------|:------------------------|
| Short sketches and quick peripheral experiments. | A product with broad, validated SF32 feature requirements. |
| Teams already productive with Arduino IDE or Arduino CLI. | Custom board bring-up or deep control of flash, power, and middleware. |
| Demonstrations and early feasibility prototypes. | Zephyr-native configuration, drivers, and RTOS structure. |

</div>

## Board Identity { #board-identity }

The current public package targets the SF32LB52 DevKit LCD. Keep these values in the project record and in issue reports: they determine how the sketch is built, loaded, and mapped to the board.

<div align="center"><em>Table: Arduino board identity</em></div>

<div align="center" markdown>

| Item | Value |
|:-----|:------|
| Boards Manager title | **SiFli Serial Boards** |
| Arduino platform | `sifli:sf32lb52` |
| Board | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyr target | `sf32lb52_devkit_lcd` |
| Variant | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| Upload tool | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

A similarly named SiFli or Zephyr board identifier is not interchangeable with this FQBN. The board selection controls the build and upload parameters.

## Build and Loader Model { #build-and-loader-model }

ArduinoCore-zephyr combines a sketch-facing Arduino API with a Zephyr loader and board-specific configuration. The two option menus affect startup and linking behavior rather than just compiler flags.

<div align="center"><em>Table: Build and loader choices</em></div>

<div align="center" markdown>

| Option | Behavior | Engineering implication |
|:-------|:---------|:------------------------|
| `Standard` build mode | Starts the sketch after it is loaded. | Use for normal sketch operation. |
| `Debug` build mode | Leaves the Zephyr shell waiting for `sketch`. | Useful only when the shell is part of the debug workflow. |
| `Dynamic` link mode | Packages the sketch for the normal loader-based flow. | Includes the loader in the runtime and memory budget. |
| `Static` link mode | Uses a statically linked image. | Use for loader-related investigation or when its trade-offs are explicitly understood. |

</div>

Start with **Standard** and **Dynamic**. In Debug mode, an uploaded sketch does not begin until `sketch` is run from the Zephyr shell; this is a common source of an apparently successful upload with no application behavior.

The loader is a separate board artifact. Burn Bootloader is normally a first-use, update, or recovery operation, not part of every sketch upload. Record the Arduino package version and any loader update together; mismatched assumptions are difficult to diagnose later.

## Integration Boundaries { #integration-boundaries }

Treat the Arduino core as an integration layer rather than a replacement for the underlying Zephyr platform. A sketch can require Zephyr symbols or subsystems that the loader does not expose or enable. Typical symptoms are an undefined Zephyr symbol, a missing subsystem, or memory pressure from dynamic loading and the shell.

Before adding a library or feature to a product prototype, establish all of the following:

- The exact package version, FQBN, build mode, and link mode.
- The target board revision and its serial-download/recovery procedure.
- A tested example for the required peripheral or library.
- A measurable RAM and flash budget with the intended loader configuration.
- A recovery route using the Arduino loader or SiFli-SDK firmware.

Do not infer library support solely because an Arduino API or a similarly named Zephyr driver exists. Validate the complete sketch, loader, board, and package combination on the target hardware.

## Diagnose and Escalate { #diagnose-and-escalate }

Start with the first-run guide when a board cannot be detected, flashed, or made to run Blink. Once that baseline works, use the following boundary to shorten debugging.

<div align="center"><em>Table: Arduino problem ownership</em></div>

<div align="center" markdown>

| Symptom after the first-run baseline works | First investigation |
|:-------------------------------------------|:--------------------|
| Sketch starts only after `sketch` | Confirm that Debug mode was selected intentionally. |
| Missing Zephyr function or subsystem | Check the Core README and loader exports/configuration. |
| Memory failure or instability | Measure the sketch budget; account for dynamic loading and the Zephyr shell; evaluate Static only with a recovery plan. |
| Library compiles but hardware does not work | Confirm board pin assumptions and test against a minimal, board-specific example. |
| Upload or recovery fails | Re-establish the documented Arduino baseline, then use the board's SiFli-SDK recovery path if needed. |

</div>

For a useful issue report, include the package version, IDE or CLI version, operating system, FQBN, build mode, link mode, board revision, complete upload output, and serial log.

## Related Pages { #related-pages }

- [Getting Started with Arduino](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
