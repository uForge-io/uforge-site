---
icon: lucide/app-window
description: "First run of SiFli CodeKit in VS Code: install the extension, select an SF32 board, build and flash hello_world, and open the serial console."
tags:
    - Getting started
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit is the VS Code extension for SiFli-SDK development. It provides guided actions for installing SDK tools, selecting a board, building an example, flashing firmware, and opening a serial console.

Use this path if you prefer an IDE workflow. If you want to understand the commands behind the buttons, use the [manual SiFli-SDK guide](getting-started-sifli-sdk.md).

This is the first-run guide. After `hello_world` works, use the canonical [CodeKit tool reference](../../develop/tools/codekit.md) for CodeKit's day-to-day role, reproducibility expectations, and failure boundaries.

## What You'll Need { #what-youll-need }

**Hardware**

- An SF32 development board supported by SiFli-SDK.
- A USB Type-C data cable connected to the board's USB-to-UART port.
- A computer running Windows, macOS, or Linux.

**Software**

- [Visual Studio Code](https://code.visualstudio.com/)
- The SiFli CodeKit extension.
- Git, if CodeKit asks you to clone or import SiFli-SDK.

**Official reference**

- [SiFli CodeKit installation guide](https://docs.sifli.com/projects/codekit/get-started/install.html)

## Install CodeKit { #install-codekit }

1. Open VS Code.
2. Open **Extensions**.
3. Search for **SiFli-SDK-CodeKit**.
4. Install the extension.
5. Reload VS Code if prompted.

To open SDK management, click the SiFli icon in the VS Code sidebar and choose **SDK Manager**. You can also open **View > Command Palette** (default shortcut `F1`) and run **Manage SiFli SDK installation**. The exact labels can vary with the extension version; see the official installation guide linked above.

!!! tip
    If you cannot find the action you need, open the Command Palette and search for `SiFli`.

## Install or Select SiFli-SDK { #install-or-select-sifli-sdk }

Use CodeKit's setup flow to install SiFli-SDK, or point it at an SDK copy you already cloned. For most users, choose a **Release/Tag**: it is a versioned, tested baseline. Choose a **Branch** when you need newer fixes or features and can accept that it may be less stable. The official guide describes `release/vX.Y` as a way to get the latest fixes and features for that release line without using the less-stable `main` branch. Its contents can still change over time.

If you are working from mainland China, the official guide recommends using Gitee as the SDK source and the SiFli domestic mirror for toolchain downloads.

If CodeKit asks for an SDK location, choose a short path without spaces, for example:

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit uses the SDK's own installer and environment scripts. The result should match the manual setup: compiler, Python environment, build tools, and flash tools are prepared together.

## Open an Example { #open-an-example }

Start from the SDK's `hello_world` example:

```text
example/get-started/hello_world/rtt/project
```

Open that project folder in VS Code. If CodeKit offers a project import wizard, choose the `hello_world` project and let it detect the SDK root.

## Select the Board { #select-the-board }

Choose the board configuration that matches your hardware. For an SF32LB52-DevKit-LCD-class board, the common board name is:

```text
sf32lb52-lcd_n16r8
```

If you use a different board, select the matching board name from CodeKit's list or from the SDK's supported board documentation. The board name controls memory layout, pins, flash settings, and default peripherals.

## Build { #build }

Run CodeKit's **Build** action. A successful build creates a board-specific output folder such as:

```text
build_sf32lb52-lcd_n16r8_hcpu
```

If the build fails immediately, check that CodeKit knows where SiFli-SDK is installed and that the SDK environment has finished installing.

## Flash { #flash }

Connect the board through the USB-to-UART port, then run CodeKit's **Flash** or **Download** action.

When prompted for a serial port:

- On Windows, choose the matching `COM` port.
- On macOS, choose the `/dev/cu.*` device rather than `/dev/tty.*`.
- On Linux, choose the matching `/dev/ttyUSB*` or `/dev/ttyACM*` device.

If the download tool does not enter UART download mode, reset the board immediately before starting the transfer. If the problem persists, follow the board-specific flashing instructions.

## Open the Serial Console { #open-the-serial-console }

Use CodeKit's serial monitor, VS Code's serial tooling, or another terminal program. After reset, the console should show readable boot output and the `hello_world` example output.

If you see readable boot logs, the board and serial settings are correct. If the output is garbled, close other serial tools and confirm the baud rate used by the example.

## Success Check { #success-check }

You are ready to move on when:

- CodeKit recognizes the SDK location.
- The selected board matches your hardware.
- Build and flash actions complete.
- The serial console shows `hello_world` output after reset.

## Troubleshooting { #troubleshooting }

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| No serial port appears | Try a data cable, another USB port, or the board's USB-to-UART connector. |
| CodeKit cannot find the SDK | Re-run the CodeKit setup flow and select the SiFli-SDK root folder. |
| Build cannot find tools | Let CodeKit reinstall the toolchain, or run the SDK installer manually once. |
| Flash fails to start | If the tool does not enter UART download mode, reset the board immediately before transfer. If the problem persists, follow the board-specific flashing instructions. |
| Serial output is unreadable | Check baud rate and make sure only one serial monitor is open. |

</div>

## Where to Go Next { #where-to-go-next }

- Use [SiFli-SDK](getting-started-sifli-sdk.md) to understand the equivalent terminal commands.
- Continue with [Beginner Tutorials](../tutorials/beginner.md) after `hello_world` works.
- Review [Bluetooth Overview](../../learn/bluetooth/overview.md), [Graphics Overview](../../learn/graphics/overview.md), [Audio Overview](../../learn/audio/overview.md), and [Low-Power Overview](../../learn/low-power/overview.md) when you start a real product feature.

## Keep the Setup Reproducible { #what-sifli-should-add }

Record the CodeKit and SDK versions, the selected release tag or branch, and the exact board target. If a menu or command label differs from this page, use the current [official installation guide](https://docs.sifli.com/projects/codekit/get-started/install.html) and the SDK's [supported-boards list](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html) as the references for your installed versions.
