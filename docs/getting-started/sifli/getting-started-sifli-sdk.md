---
icon: lucide/terminal
description: "From an unboxed SF32 board to a running hello_world over UART with SiFli-SDK: install the toolchain, build with scons, and flash via UART download."
tags:
    - Getting started
    - SiFli SDK
---

# SiFli-SDK { #sifli-sdk }

This guide takes you from an unboxed SF32 development board to a running `hello_world` example over UART using **SiFli-SDK**, the official RT-Thread-based SDK for SF32 devices.

If you plan to use Arduino, Zephyr, or MicroPython, it is still worth running this guide once. It proves that the board, cable, serial port, flash flow, and baseline toolchain are working before you add another framework.

## What You'll Need { #what-youll-need }

**Hardware**

- An SF32 development board, such as the [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md), or another board identified from the [SF32 Family](../../sf32-products/family/SF32_family.md).
- A USB Type-C **data** cable connected to the board's USB-to-UART port, not a charge-only cable or a secondary USB-function port.
- A computer running Windows, macOS, or Linux.

**Software**

- [git](https://git-scm.com/)
- A C/C++ toolchain bootstrapped by [`uv`](https://docs.astral.sh/uv/getting-started/installation/) (SiFli-SDK's installer pulls the compiler, debugger, and Python environment for you)
- The [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK) repository itself

**Official references**

- [SiFli-SDK install guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDK supported boards](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli SiFli-SDK repository](https://github.com/OpenSiFli/SiFli-SDK)
- [OpenSiFli SiFli-SDK releases](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "Prefer an IDE?"
    SiFli also publishes a **SiFli-SDK-CodeKit** extension for VS Code that wraps the SDK setup, build, and flash flow into guided actions. See [SiFli CodeKit](getting-started-sifli-codekit.md) if you prefer that workflow.

## Install the Toolchain { #install-the-toolchain }

For a reproducible baseline, use a published release tag rather than `main`. At the time of this review, `v2.5.1` is the latest published tag; check the [official release list](https://github.com/OpenSiFli/SiFli-SDK/releases) before starting in case a newer tag is available. The `release/v2.5` branch receives updates for that release line but can move over time.

=== "macOS / Linux"

    Install `uv`, the package/environment manager SiFli-SDK's scripts are built on:

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    Clone the SDK:

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Run the installer, then load the SDK environment into your shell:

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    Install `uv` (PowerShell):

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Clone the SDK:

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    Run the installer, then load the SDK environment:

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK contains submodules"
    GitHub's "Download ZIP" option will not include the required submodules. Use `git clone --recursive`. If you already cloned without submodules, run `git submodule update --init --recursive` from the SDK root.

!!! note "Working from mainland China?"
    Before installing, set `SIFLI_SDK_MIRROR_CHINA` to `1` in your shell: use `export SIFLI_SDK_MIRROR_CHINA=1` on macOS/Linux or `$env:SIFLI_SDK_MIRROR_CHINA = "1"` in PowerShell. You can also clone from the [Gitee mirror](https://gitee.com/SiFli/sifli-sdk) instead of GitHub. See the [install guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html) for details.

`install.sh` / `install.ps1` downloads the matching compiler, debugger, and Python dependencies. Re-run it when the SDK version changes. `export.sh` / `export.ps1` activates that environment in your current terminal; run it each time you open a new terminal to build. On Windows, run the `.ps1` scripts from PowerShell.

## Choose the Board Target { #choose-the-board-target }

The value supplied to `scons --board` is the board directory name under `customer/boards`. Choose the target that matches the memory and display configuration fitted to your kit; the names below are case-sensitive.

<div align="center" markdown>

*SiFli-SDK Development Kit Build Targets*

| Development kit | Exact `scons --board` target(s) |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| Huangshan-Pi (SF32LB52-LCHSPI-ULP) | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

For a dual-core board, omitting a core suffix builds the HCPU configuration. Use `_hcpu` explicitly when helpful, or add `_lcpu` to build the LCPU configuration; for example, `scons --board=eh-lb551_lcpu`. If your board configuration is absent from this table, use SiFli's [supported boards list](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) as the current source of truth.

## Build the "Hello World" Example { #build-the-hello-world-example }

With the environment loaded, build the RT-Thread `hello_world` example for your board:

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

Replace `sf32lb52-lcd_n16r8` with your board name. See the [supported boards list](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) for available names. `-j8` builds with 8 parallel jobs; adjust it for your machine. This command omits a core suffix, so it builds HCPU and writes binaries to `build_sf32lb52-lcd_n16r8_hcpu/`. If you specify an `_lcpu` target, the output directory uses the `_lcpu` suffix instead.

!!! tip "Need custom settings?"
    Run `sdk.py menuconfig --board=<board_name>` from the project directory to open the interactive configuration menu. Press ++esc++ twice, then choose to save the configuration when prompted.

## Flash the Board { #flash-the-board }

Keep the board connected via USB, then run the download script produced by the build:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    When prompted, enter the serial-device path shown by your operating system. On macOS, use the `/dev/cu.*` device (for example `/dev/cu.usbserial-12345678`), not `/dev/tty.*`; on Linux, use the matching device path, such as `/dev/ttyUSB0`.

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    When prompted with `please input serial port number`, type just the number from your COM port (e.g. `19` for `COM19`) and press Enter.

!!! tip
    If the download tool does not enter UART download mode, reset the board immediately before starting the transfer. Follow the board-specific flash instructions if the problem persists.

## See It Run { #see-it-run }

Once flashing completes, reset the board or let it reset automatically. Open a serial terminal at the board's default baud rate. You should see boot output and the `hello_world` example output over UART.

## Success Check { #success-check }

You are ready to move on when:

- The project builds without errors.
- The UART download script completes.
- The serial console shows readable boot output.
- The `hello_world` example prints after reset.

## Where to Go Next { #where-to-go-next }

- **Pick your chip:** compare the LB52, LB55, LB56, and LB58 series on the [SF32 Family Overview](../../sf32-products/family/SF32_family.md).
- **Explore more examples:** beyond `hello_world`, the SDK ships examples for BLE, classic Bluetooth, LVGL graphics, audio, and low-power modes.
- **Prefer a different framework:** continue with [Arduino](../arduino/getting-started-arduino.md), [Zephyr](../zephyr/getting-started-zephyr-upstream.md), or [MicroPython](../micropython/getting-started-micropython.md).
- **Stuck:** check the [SiFli FAQ](https://wiki.sifli.com/en/faq/index.html) for common toolchain, J-Link, and debugging issues.

## Record Your Working Baseline { #what-sifli-should-add }

For a repeatable setup, record the SDK tag or branch, exact `scons --board` target, host operating system, serial port, and the download procedure that worked for your board. Recheck the official [supported-boards list](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) and [release list](https://github.com/OpenSiFli/SiFli-SDK/releases) when updating the SDK or switching boards.
