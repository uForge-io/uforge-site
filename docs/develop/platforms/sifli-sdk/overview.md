---
icon: lucide/package
description: "SiFli-SDK as the reference SF32 development path: scons build and menuconfig workflows, board naming, project structure, and production readiness."
tags:
    - Develop
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK is SiFli's official development SDK for SF32 firmware. It provides an RT-Thread-based development environment and, on supported targets, No-OS examples, along with SiFli-maintained board support and middleware for areas such as Bluetooth, graphics, audio, power management, storage, and production workflows. Availability depends on the chip, board, and SDK release.

!!! info "SiFli-Solution"
    SiFli-Solution is a separate SiFli software package and is outside the scope of this page. This page and the linked Develop material document SiFli-SDK only. For SiFli-Solution's scope, supported devices, and access requirements, consult the official [SiFli Solution Documentation](https://docs.sifli.com/projects/solution/index.html) and contact SiFli directly.

Use the [SiFli-SDK Getting Started](../../../getting-started/sifli/getting-started-sifli-sdk.md) page for first installation and `hello_world`. This page explains how to think about the SDK once the toolchain already works.

Primary references:

- [SiFli-SDK install guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [SF32LB52x SDK supported-board list](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## When to Use SiFli-SDK { #when-to-use-sifli-sdk }

Choose SiFli-SDK when you need:

- A documented development path with SiFli-maintained board support and examples for your target chip and SDK release.
- Examples and middleware for Bluetooth, display, audio, power, storage, USB, and OTA where supported by the selected target and release.
- RT-Thread integration and shell tooling.
- Board-level configuration through SDK board names such as `sf32lb52-lcd_n16r8`.
- Access to SiFli-specific middleware, tools, partition layouts, and production flows.

## Development Model { #development-model }

The [SiFli-SDK Getting Started](../../../getting-started/sifli/getting-started-sifli-sdk.md) page establishes the toolchain and a `hello_world` baseline. After that, keep the SDK revision, selected board, example/project directory, configuration, and corresponding build/download artifacts together in a reproducible build record. When the board name omits a core suffix, the HCPU output commonly follows `build_<board_name>_hcpu/`; for example, `sf32lb52-lcd_n16r8` produces `build_sf32lb52-lcd_n16r8_hcpu/`. Use the actual directory generated for the resolved board/core target rather than constructing its name manually.

For repeatable development, pin an SDK branch, record the board name, keep local board changes separate from vendor files, and make configuration changes in small, reviewable steps. The detailed build, download, and monitoring workflow is in [Build, Flash, Monitor](build-flash-monitor.md).

## Board Names { #board-names }

SiFli-SDK board names are SDK-specific and may not match Zephyr board names, Arduino FQBNs, or marketing board names. Always copy the board name from the SDK supported-boards list or from the example documentation.

For SF32LB52 DevKit LCD boards, a common SDK board name used in quick-start examples is:

```text
sf32lb52-lcd_n16r8
```

## Project Structure { #project-structure }

Most SDK examples follow the pattern:

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

For example:

```text
example/get-started/hello_world/rtt/project
```

When building product firmware, start from the closest working SDK example and change one subsystem at a time. That keeps board configuration, middleware dependencies, partition assumptions, and driver setup intact.

## Configuration { #configuration }

For an example project, use the SDK's `menuconfig` command to change its feature configuration for a selected board:

```bash
sdk.py menuconfig --board=<board_name>
```

Common reasons to enter configuration:

- Enable or disable middleware.
- Change Bluetooth roles or profiles.
- Adjust display, filesystem, or audio support.
- Tune power management.
- Select logging or shell options.

## Production Readiness Questions { #production-readiness-questions }

Before committing to SiFli-SDK for a product branch, answer:

- Which SDK release branch is frozen for the product?
- Which board support files are product-owned vs. vendor-owned?
- Which examples prove the critical features?
- Which partition table is used for manufacturing and OTA?
- Which tools are approved for factory flashing?
- Which logs are enabled in release builds?
- Which recovery image is kept for lab use?

## Practical Next Pages { #practical-next-pages }

- [Build, Flash, Monitor](build-flash-monitor.md)
- [Board Configuration](board-configuration.md)
- [Components and `sf-pkg`](components.md)
- [Examples](../../examples/index.md) — choose the closest known-good baseline before adapting a subsystem.
- [CodeKit](../../tools/codekit.md) — use the VS Code workflow when useful, while keeping the SDK board name and build records consistent with the rest of the project.
- [SDK Application Notes](sdk-application-notes.md)
- [Partition Tables](../../firmware-topics/partition-tables.md)
- [Debugging and Diagnostics](debugging-diagnostics.md)
