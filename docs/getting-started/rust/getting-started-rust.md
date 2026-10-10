---
icon: lucide/code
description: "First evaluation of OpenSiFli sifli-rs on SF32LB52: install the Rust target, build the unmodified Blinky example, configure sftool, and retain an SDK recovery path."
tags:
    - Getting started
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) provides Rust HAL, PAC, and flash-table work for SiFli MCUs. Its maintainers mark it as work in progress and not ready for production use. This guide therefore establishes an **evaluation baseline**, not a production firmware workflow.

Before starting, complete [SiFli-SDK Getting Started](../sifli/getting-started-sifli-sdk.md) on the same board. That gives you a known-good serial and recovery path if the Rust experiment cannot be flashed or debugged.

## What You Need { #what-you-need }

- An SF32LB52 DevKit LCD and a USB Type-C data cable connected to USB-to-UART.
- Basic Rust, embedded development, and command-line familiarity.
- `git` and a current Rust toolchain installed with [rustup](https://rustup.rs/).
- The current [sifli-rs Get Started guide](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md) and [Flash and Debug Guide](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md).

!!! warning "Exploration path"
    Do not use this guide as evidence that a chip, peripheral, board configuration, or application stack is production-ready. Check the repository's support-status information for the exact target and peripheral before investing in a port.

## Prepare the Rust Target { #prepare-the-rust-target }

The repository's guide uses Arm Cortex-M Rust targets. Install the targets it documents:

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

Clone the current repository, then work from its SF32LB52 example directory:

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

The example directory contains its Cargo target configuration, memory layout, build script, and example binaries. Do not copy these files into a product unchanged: they encode board and flash assumptions that must be reviewed for the target hardware.

## Configure the Flash Runner { #configure-the-flash-runner }

The repository documents `sftool` as the normal flash runner. In `examples/sf32lb52x/.cargo/config.toml`, set the runner to the USB-to-UART port for the board, following the current Flash and Debug Guide. Its documented pattern is:

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

The first flash may require a flash table, bootloader, and application image. The exact images and addresses depend on the documented board/flash arrangement. Follow the repository guide rather than substituting addresses or binaries from Arduino, Zephyr, or SiFli-SDK.

## Build and Run the Baseline { #build-and-run-the-baseline }

With the runner configured, build and flash the unmodified Blinky example:

```bash
cargo run --bin blinky
```

Treat a successful compile as only the first check. Confirm that the board exhibits the expected behavior and retain the full `cargo` and `sftool` output. Then make one small, reversible change—such as the Blink delay—before attempting another peripheral.

## If the Baseline Fails { #if-the-baseline-fails }

First confirm the board's SiFli-SDK baseline still works. Then collect the Rust target, commit, selected example, Cargo configuration, `sftool` command/output, board revision, and serial or debug log. The upstream guide notes that debug behavior can be unstable around idle/WFI behavior, and that flash-table size must accommodate the application image.

For architecture, support scope, and product-fit decisions, see [Rust in Develop](../../develop/platforms/rust/overview.md).

## Before Reusing the Example { #what-sifli-should-add }

Before adapting the example, verify that the repository documents support for your exact board and peripherals, and review the matching Rust target, bootloader, flash-table layout, and debug path. Keep the known-good SiFli-SDK baseline available as a recovery option.
