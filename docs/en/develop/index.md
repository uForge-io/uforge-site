---
icon: lucide/code-2
title: "Develop Overview"
description: "A task-first map for developing SF32 products with SiFli-SDK: daily workflow, application notes, examples, tools, firmware topics, and community paths."
tags:
    - Develop
    - Software
---

# Develop Overview { #develop }

Develop turns a working SF32 board into maintainable product firmware. Use it after the first successful `hello_world` to select a board configuration, build and flash repeatably, adapt a close example, integrate product features, diagnose failures, and plan updates and recovery.

Use [Getting Started](../getting-started/index.md) for the first board run, [SF32 Products](../sf32-products/index.md) to select the device and development board, [Hardware](../hardware/index.md) for schematics and production hardware, and [Learn](../learn/index.md) for architectural background. Use this section when you need the engineering workflow and task-specific implementation guidance.

!!! info "SiFli-Solution"
    SiFli-Solution is a separate SiFli software package that μForge.io does not currently document. The guidance here is limited to SiFli-SDK and the community paths listed below. If your product needs a more complete display-device solution, consult the official [SiFli Solution Documentation](https://docs.sifli.com/projects/solution/index.html) and engage SiFli directly. A complex product using this route may need deep, direct SiFli involvement.

## Establish a SiFli-SDK Baseline { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) is SiFli's official, RT-Thread-based software package and the reference development path for SF32 firmware. Start there unless you have a deliberate reason to evaluate another ecosystem: it provides the broadest documented baseline for board support, Bluetooth, graphics, audio, storage, power management, and production work.

Before building product features, establish and record one reproducible baseline:

1. Select the exact SDK board configuration in [Board Configuration](platforms/sifli-sdk/board-configuration.md).
2. Run the [Build, Flash, Monitor](platforms/sifli-sdk/build-flash-monitor.md) loop successfully.
3. Save the SDK release or commit, board name, build command, flash command, serial settings, and a boot log.
4. Start from the closest [example](examples/index.md), especially one that already exercises the product's hardest subsystem.

The resulting record is the reference point for later application changes, board ports, test failures, and field recovery.

## Find Guidance by Task { #find-guidance-by-task }

<div align="center"><em>Table: SF32 development tasks</em></div>

<div align="center" markdown>

| Task | Start here | Then use |
|:----------------|:-----------|:---------|
| Build and flash firmware; inspect serial output | [Build, Flash, Monitor](platforms/sifli-sdk/build-flash-monitor.md) | [Tools](tools/index.md) for scripted download, trace, and crash utilities. |
| Match firmware to a development board, module, or custom hardware | [Board Configuration](platforms/sifli-sdk/board-configuration.md) | The relevant Hardware guide and the closest board-specific example. |
| Reuse a driver or middleware layer across projects | [Components and `sf_pkg`](platforms/sifli-sdk/components.md) | A minimal example and a documented configuration boundary. |
| Implement a concrete peripheral or subsystem | [SiFli-SDK App Notes](platforms/sifli-sdk/sdk-application-notes.md) | The linked official SDK usage guide for exact APIs, configuration symbols, and commands. |
| Start product work from code that already runs | [Examples](examples/index.md) | The matching board configuration, then test after each change. |
| Diagnose a failure or collect product evidence | [Debugging and Diagnostics](platforms/sifli-sdk/debugging-diagnostics.md) | [Logging and Crash Analysis](firmware-topics/logging-crash-analysis.md). |
| Change boot layout, storage, updates, USB, or power behavior | [Firmware Topics](firmware-topics/index.md) | The relevant partition, update, USB, power, or logging topic before changing code. |

</div>

## SiFli-SDK Application Notes { #sifli-sdk-application-notes }

The application-note collection is organized by integration task rather than SDK catalogue order. Begin with the immediate subsystem. Before adapting a configuration or command, check the stated chip-family scope, board configuration, SDK release, and hardware prerequisites.

<div align="center"><em>Table: SiFli-SDK application-note paths</em></div>

<div align="center" markdown>

| Engineering area | Application-note starting point |
|:-----------------|:--------------------------------|
| Analog and sensors | [Sample with GPADC](platforms/sifli-sdk/application-notes/adc-sampling.md) · [Integrate and Read Sensors](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| Storage and graphics assets | [Use External Flash](platforms/sifli-sdk/application-notes/external-flash.md) · [Compress Graphics Assets with EZIP](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| Reliability, power, and debugging | [Configure the Watchdog](platforms/sifli-sdk/application-notes/watchdog.md) · [Configure and Measure Low Power](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [Capture Logs and Analyze Crashes](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| RF and Bluetooth validation | [Run SiFli-SDK RF Tests](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [Run Bluetooth Signaling Tests](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [Run Bluetooth Single-Item RF Tests](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## Navigate the Develop Section { #navigate-the-develop-section }

<div align="center"><em>Table: Develop section map</em></div>

<div align="center" markdown>

| Area | Purpose |
|:-----|:--------|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | Establish the supported reference workflow: configuration, build, flashing, reusable components, and diagnostics. |
| [SiFli-SDK App Notes](platforms/sifli-sdk/sdk-application-notes.md) | Apply the SDK to a focused task such as ADC, sensors, external Flash, low power, diagnostics, RF, or Bluetooth testing. |
| [Examples](examples/index.md) | Select and adapt a working implementation for the exact board and hardest product subsystem. |
| [Tools](tools/index.md) | Choose download, monitor, trace, crash, asset, and production tools for the workflow. |
| [Firmware Topics](firmware-topics/index.md) | Make cross-cutting product decisions about partitions, OTA/DFU, USB, power management, and diagnostic evidence. |
| [Experimental / Community](platforms/zephyr/overview.md) | Evaluate Zephyr, Arduino, MicroPython, or Rust with the scope and maturity limits stated on each page. |

</div>

## Evaluate Community Paths Deliberately { #evaluate-community-paths-deliberately }

The [Experimental / Community](platforms/zephyr/overview.md) group is for teams with a reason to work beyond the reference SDK path. It does not imply equivalent production support.

<div align="center"><em>Table: Community-path fit</em></div>

<div align="center" markdown>

| Path | Consider it when | Treat it as |
|:-----|:-----------------|:------------|
| [Zephyr](platforms/zephyr/overview.md) | You need Zephyr APIs, devicetree, Kconfig, or downstream board work. | A downstream, board-specific evaluation path. |
| [Arduino](platforms/arduino/overview.md) | You need sketches or a quick peripheral prototype on its supported board. | A beta, board-scoped path. |
| [MicroPython](platforms/micropython/status.md) | You are assessing future scripting support. | A status page until a reproducible public port exists. |
| [Rust](platforms/rust/overview.md) | You can evaluate HAL/PAC work and contribute upstream fixes. | A community work-in-progress path. |

</div>

Before committing a product to one of these paths, validate every required peripheral, Flash layout, debug method, and recovery procedure on the exact board. Keep the tested revision, configuration, commands, and results with the product source.

## Product-Ready Development Evidence { #product-ready-development-evidence }

Before treating a firmware path as product-ready, make sure you can answer:

- Which chip, board or custom-hardware revision, and configuration were tested?
- Which SDK, package, branch, or commit produced the firmware?
- Which build, flash, monitoring, and full-recovery commands work?
- Which example or test proves each required peripheral and product subsystem?
- Which partition layout, update behavior, power target, and crash-decoding path have been validated?

If an answer is missing, the work may still be a useful prototype, but it is not yet a repeatable product baseline.
