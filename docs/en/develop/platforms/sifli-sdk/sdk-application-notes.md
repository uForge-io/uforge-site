---
icon: lucide/notebook-tabs
title: "SDK Application Notes"
description: "A task-oriented, source-linked reading path through the SiFli-SDK usage guides for SF32 development."
tags:
    - Develop
    - SiFli-SDK
    - Application Notes
---

# SDK Application Notes { #sdk-application-notes }

This page organizes SiFli-SDK usage guides by engineering task, so you can quickly find the relevant workflow and see which validation records to retain for the product.

These articles provide practical guidance for understanding and integrating each topic; they do not replace the SDK manual. Before using a configuration, API, example, or test procedure, select the target chip family and SDK release in the official [SiFli SDK Usage Guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html).

## Read by Task { #read-by-task }

<div align="center"><em>Table: SDK application-note reading paths</em></div>

<div align="center" markdown>

| Task | Start here when you need to | Official usage-guide topic |
|:-----|:----------------------------|:--------------------------|
| [Sample with GPADC](application-notes/adc-sampling.md) | Establish a general-purpose ADC measurement path. | ADC Usage Guide (GPADC) |
| [Integrate and Read Sensors](application-notes/sensor-integration.md) | Connect and validate an external sensor. | Sensor Adding Guide |
| [Use External Flash](application-notes/external-flash.md) | Store data, assets, or a filesystem in Flash. | Flash Usage Guide |
| [Configure the Watchdog](application-notes/watchdog.md) | Validate a watchdog recovery path. | Watchdog Usage Guide |
| [Compress Graphics Assets with EZIP](application-notes/ezip-image-assets.md) | Convert and integrate EZIP image resources. | EZIP Image Conversion Tool Usage |
| [Configure and Measure Low Power](application-notes/low-power-measurement.md) | Configure a power state and compare measurements. | Low Power Development Guide |
| [Capture Logs and Analyze Crashes](application-notes/crash-analysis.md) | Preserve matching logs, crash context, and symbols. | Crash Analysis Guide; Debugging and Logging |
| [Run SiFli SDK RF Tests](application-notes/rf-performance-tests.md) | Choose signaling, non-signaling, or individual-item RF validation. | SiFli SDK RF Test Guide |
| [Run Bluetooth Signaling Tests](application-notes/bluetooth-signalling-tests.md) | Perform protocol-based Bluetooth validation. | Bluetooth Signaling Test Guide |
| [Run Bluetooth Individual RF Tests](application-notes/bluetooth-single-tone-tests.md) | Follow the individual Bluetooth RF test procedure for the selected item. | Bluetooth Individual RF Test Guide |

</div>

## How to Use These Articles { #how-to-use-these-articles }

1. Start with the page whose title matches the immediate engineering task.
2. Establish the stated project, board, release, configuration, and hardware prerequisites before adapting an example or command.
3. Use the linked SDK source for exact paths, configuration symbols, commands, APIs, and tool revisions.
4. Record the validated board, SDK release, configuration files, test equipment, and observed result in your project evidence.

For cross-platform architectural decisions, use [Firmware Topics](../../firmware-topics/index.md). For supported example baselines across SDK and community paths, use [Examples](../../examples/index.md).
