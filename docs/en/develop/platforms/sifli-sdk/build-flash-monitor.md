---
icon: lucide/terminal
description: "The daily SiFli-SDK developer loop: activate the environment, build with scons, flash via UART download or sftool, and monitor serial output."
tags:
    - Develop
    - SiFli-SDK
---

# Build, Flash, Monitor { #build-flash-monitor }

This page summarizes the daily SiFli-SDK loop: activate the environment, build with `scons`, flash the board, and watch logs.

## Activate the SDK { #activate-the-sdk }

Install the SDK environment using the [official installation guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html) for your SDK version. Before building, activate it in each new terminal by running the export script from the SDK root:

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

The export script loads the environment associated with the current SDK checkout into that terminal. Installation and environment-management steps can vary by SDK version; follow the matching official setup guide.

## Build { #build }

From an example project directory:

```bash
scons --board=<board_name> -j8
```

Set `-j` to suit your host machine. If the board name does not specify a core, the SDK selects HCPU by default. For example, `sf32lb52-lcd_n16r8` produces `build_sf32lb52-lcd_n16r8_hcpu/`. Use the directory reported for the resolved board/core target; do not append `_hcpu` again if the board identifier already specifies a core.

## Clean Rebuilds { #clean-rebuilds }

Use a clean rebuild when switching boards, changing major configuration, or investigating a suspicious build artifact. From the example project directory, run the documented SCons clean option:

```bash
scons -c
```

This cleans build targets and generated temporary/object files; rebuild with the intended board configuration afterward.

## Flash { #flash }

For example, for the `sf32lb52-lcd_n16r8` HCPU target, use the UART download script produced by the build:

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli also publishes [`sftool`](https://github.com/OpenSiFli/sftool), an open-source command-line utility for communicating with SiFli SoCs over a serial interface. Its documented operations include writing, reading, and erasing flash, as well as controlling chip reset. Check the tool's README for supported chips, storage types, and command options.

## Monitor { #monitor }

Use the serial terminal configured for the board and example. The serial log should show boot output, RT-Thread startup messages, application prints, or a shell prompt.

Keep a note of:

- Board name.
- Serial port.
- Baud rate.
- Build command.
- Flash command.
- SDK branch or release.

## Daily Developer Loop { #daily-developer-loop }

<div align="center"><em>Table: Daily Developer Loop</em></div>

<div align="center" markdown>

| Step | Goal |
|:-----|:-----|
| Activate | Load the SDK environment into the current terminal. |
| Configure | Select board and feature options. |
| Build | Produce board-specific binaries. |
| Flash | Put the image on hardware. |
| Monitor | Confirm boot and application behavior. |
| Record | Save command/log details for repeatability. |

</div>

## Start from a Matching Example { #start-from-a-matching-example }

Before creating or heavily modifying a project, choose the closest [SDK example](../../examples/index.md) that matches the board and critical subsystem. Build, flash, and monitor that unmodified baseline first; then keep its board name, SDK release, commands, and expected output with the adapted project.

If you use [CodeKit](../../tools/codekit.md), preserve the same evidence and confirm that its editor actions can be reproduced through the SDK command flow.

## Troubleshooting { #troubleshooting }

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| Build tool not found | Re-run `export.sh` / `export.ps1` in the current terminal. |
| Board name unknown | Check the SDK supported-boards documentation. |
| Download script cannot open port | Close serial terminals and verify the USB-to-UART cable/connector. |
| Flash does not start | Follow the board's documented download sequence. For `sf32lb52-lcd_n16r8`, after selecting the serial port, restart the board and press Enter within 2 seconds to start the download; use the target-specific sequence for other boards. Check board power and the selected port/UART connection. |
| Serial output is unreadable | Check baud rate and use the data UART, not a charge-only cable. |

</div>

## Handoff Checklist { #handoff-checklist }

Before handing a project to another developer, include:

- SDK branch or commit.
- Board name.
- Setup/install notes.
- Build command.
- Flash command.
- Monitor settings.
- Expected first log lines.
- Recovery command.
