---
icon: lucide/layers
description: "Build and flash Zephyr's upstream SF32LB52 DevKit LCD board target, then check its documented console and supported features."
tags:
    - Getting started
    - Zephyr
---

# Zephyr Upstream { #zephyr-upstream }

The `sf32lb52_devkit_lcd` board has been supported and maintained in upstream Zephyr since v4.3.0. See the [v4.3.0 release notes](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html) and the [SF32LB52 DevKit LCD board documentation](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html). This guide creates a v4.3.0 workspace, builds a first sample, and flashes the board. Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) when you need the broader official SF32 feature set.

!!! note "Check the board feature list"
    An upstream board definition does not by itself confirm that every peripheral or operating mode is enabled or validated for a product. Check the board documentation's supported-features table and verify the required behavior on your exact board revision.

## What You'll Need { #what-youll-need }

**Hardware**

- SF32LB52 DevKit LCD, based on the SF32LB52x-MOD-N16R8 module with SF32LB525UC6, 8 MB OPI-PSRAM, and 128 Mb QSPI-NOR.
- USB Type-C data cable connected to the board's USB-to-UART path.

**Software**

- A host OS supported by Zephyr v4.3.0 and its [Getting Started instructions](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html).
- Zephyr host dependencies and the Zephyr SDK, installed for the ARM Cortex-M target as described in that guide.
- Git, Python 3, and `pip`.

## Prepare the Tooling { #prepare-the-tooling }

First complete the host-dependency and Zephyr SDK setup in Zephyr's [v4.3.0 Getting Started guide](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html). Then create a Python environment and initialize a workspace at the matching Zephyr tag:

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

Keep this environment active for the build and flash steps below.

## Confirm the Board { #confirm-the-board }

Check that the workspace includes the target:

```bash
west boards
```

The expected board name is:

```text
sf32lb52_devkit_lcd
```

## Build Hello World { #build-hello-world }

Build Zephyr's standard Hello World sample:

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

A successful build confirms that the board target and toolchain are available in the workspace. It does not validate every board peripheral.

## Flash the Board { #flash-the-board }

The upstream board declares `sftool` as its default flash runner. Install [OpenSiFli sftool](https://github.com/OpenSiFli/sftool), make sure it is on `PATH`, and put the board into serial download mode using the board's documented procedure. Then run:

```bash
west flash
```

If flashing fails, check the serial port selection, download mode, and the runner instructions in the [board documentation](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html).

## Open the Serial Console { #open-the-serial-console }

The upstream board configuration routes the Zephyr console to `usart1` at `1000000` baud. Open that UART with a serial terminal and check for:

```text
Hello World! sf32lb52_devkit_lcd
```

## Choose a Next Sample { #choose-a-next-sample }

Use the upstream board documentation's supported-features table together with the [Zephyr sample browser](https://docs.zephyrproject.org/4.3.0/samples/index.html) to choose the next API or peripheral to evaluate. Confirm that the feature is listed for this board and that any required configuration is enabled before treating a sample as evidence of product readiness.

## Troubleshooting { #troubleshooting }

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| `west boards` does not show the SF32 target | Confirm the workspace is initialized from upstream Zephyr v4.3.0 or later and that `west update` completed. |
| Build fails before compiling | Confirm the Python environment is active, the Zephyr SDK is installed for ARM Cortex-M, and the v4.3.0 requirements were installed. |
| Board builds but does not flash | Confirm `sftool` is installed and on `PATH`, the selected serial port is correct, and the board is in serial download mode. |
| No serial output | Check `usart1`, `1000000` baud, the USB-to-UART connection, and whether another terminal has the port open. |
| A peripheral sample fails | Check the board's supported-features table and sample configuration; do not assume every peripheral is enabled by the base board target. |

</div>

## Before Product Integration { #before-product-integration }

- Check the upstream board's supported-features table and the configuration for the exact sample you plan to use.
- Validate required interfaces, performance, memory use, and power behavior on the target board and product configuration; a successful Hello World build is only a toolchain smoke test.
- Compare the upstream feature scope with [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) if your design depends on a capability that is not listed or validated for this Zephyr target.
