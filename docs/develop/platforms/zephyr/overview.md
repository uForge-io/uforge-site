---
icon: lucide/layers
description: "OpenSiFli's downstream Zephyr support for SF32LB52 DevKit LCD: board identity, configuration boundaries, driver coverage, and integration risk."
tags:
    - Develop
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli has active Zephyr work in [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) and [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream). The downstream tree includes the `sf32lb52_devkit_lcd` board, SiFli HAL integration, SF32LB52 devicetree files, drivers, tests, and sample overlays.

Use Zephyr when you want Zephyr APIs, devicetree, Kconfig, portable RTOS structure, or a path that connects to ArduinoCore-zephyr. Use SiFli-SDK when you need the most complete vendor feature coverage today.

For workspace setup, the first `hello_world` build, flashing, and console verification, use [Getting Started with Zephyr Downstream](../../../getting-started/zephyr/getting-started-zephyr-upstream.md). This page covers the downstream platform once that baseline is working.

Primary references:

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr project documentation](https://docs.zephyrproject.org/)
- [SF32LB52-DevKit-LCD in the Zephyr board documentation](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## Verified Downstream Board { #verified-downstream-board }

<div align="center"><em>Table: Verified Downstream Board</em></div>

<div align="center" markdown>

| Item | Value |
|:-----|:------|
| Board | `sf32lb52_devkit_lcd` |
| Full name | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| Flash runner | `sftool` |
| Runner argument | `--chip=SF32LB52` |
| Console | `usart1` |
| Console speed | `1000000` baud |
| Display chosen node | `co5300` |

</div>

The downstream board documentation describes the SF32LB52x-MOD-N16R8 module with 8 MB OPI-PSRAM, 128 Mb QSPI-NOR, 48 MHz and 32.768 kHz crystals, display interfaces, audio, USB, and microSD hardware.

## Configuration Boundaries { #configuration-boundaries }

The board target, devicetree, Kconfig configuration, overlays, and downstream HAL revision form one compatibility boundary. Pin the downstream revision in each project and keep application overlays and configuration fragments under source control with the application.

Do not copy a board name, pin mapping, or runner setting from an Arduino or SiFli-SDK project into Zephyr. The three paths use different configuration models even when they run on the same physical board.

## Board Hardware Notes { #board-hardware-notes }

The downstream board documentation lists:

- SF32LB52x-MOD-N16R8 module based on SF32LB525UC6.
- 8 MB OPI-PSRAM.
- 128 Mb QSPI-NOR.
- 48 MHz and 32.768 kHz crystals.
- SPI/DSPI/QSPI and MCU/8080 display interfaces.
- I2C touch support.
- Analog microphone input and analog audio output with onboard Class-D PA.
- USB Type-C ports for USB-to-serial and USB 2.0 FS.
- microSD over SPI.

## Driver Areas Present in the Downstream Tree { #driver-areas-present-in-the-downstream-tree }

The downstream tree contains SF32LB-related drivers, bindings, or board-specific sample configuration for areas including:

- GPIO, pinctrl, UART, I2C, SPI, ADC, PWM, RTC, watchdog.
- Flash, memory controller, OPI PSRAM, QSPI NOR.
- Display/LCDC/MIPI DBI and LVGL sample configuration.
- Bluetooth HCI mailbox and BAP broadcast sink configuration.
- Audio codec, DMA, CRC, crypto, entropy, OTP/eFuse, regulators, reset, and temperature sensor.

Presence in the tree does not mean every product scenario is production-ready. Validate the exact sample and driver combination on the target board.

## Integration Sequence { #integration-sequence }

After the first-run baseline, validate one subsystem at a time: board I/O, UART behavior, display, storage, Bluetooth, audio, and power management. Keep the sample, overlay, Kconfig fragments, downstream revision, and serial log together for each checkpoint. A driver being present in the tree is not evidence that the complete application combination is ready for production.

## Downstream Risk Checklist { #downstream-risk-checklist }

- Are you using OpenSiFli downstream rather than upstream Zephyr?
- Is the HAL revision pinned?
- Does `west flash` use the expected `sftool` runner?
- Is the console configured for `1000000` baud?
- Are required overlays included for the sample?
- Is the driver marked supported by tests or only present in-tree?
