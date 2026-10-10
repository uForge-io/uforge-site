---
icon: lucide/circuit-board
description: "SF32LB56-DevKit-LCD development board: an SF32LB56xV module-based display, audio, storage, and peripheral-development platform."
tags:
    - Hardware
    - Development board
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD is a display-oriented development board available with either the SF32LB56-MOD-N16R12N1 or SF32LB56-MOD-A128R12N1 module, both using an SF32LB56xV-series device. Use it to evaluate display interfaces, audio, removable storage, and peripheral drivers before designing a custom SF32LB56x board.

## What It Is Best For { #what-it-is-best-for }

- Display applications using MIPI-DPI (RGB), SPI, DSPI, QSPI, or 8-bit MCU/8080 interfaces.
- Touchscreen integration through I2C.
- Audio experiments with analog microphone input and analog output through the onboard Class-D power amplifier.
- SDIO/TF-card storage and general peripheral-driver development.
- Evaluating an SF32LB56 module-based product architecture before committing to a carrier board.

## Board Resources { #board-resources }

<div align="center"><em>Table: SF32LB56-DevKit-LCD Resources</em></div>

<div align="center" markdown>

| Resource | Board implementation | Practical use |
|:---------|:---------------------|:--------------|
| N16R12N1 configuration | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR, 4 MB + 8 MB OPI-PSRAM, and 1 MB QSPI-NOR; module-based evaluation and carrier-board planning. |
| A128R12N1 configuration | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND, 4 MB + 8 MB OPI-PSRAM, and 1 MB QSPI-NOR; module-based evaluation and carrier-board planning. |
| Board size and temperature | 65 mm × 38 mm; -40 °C to 85 °C per the model guide | Mechanical and environmental planning. |
| Display | 24-bit MIPI-DPI RGB through a 40-pin, 0.5 mm FPC connector using the ALIENTEK pin order; SPI/DSPI/QSPI and 8-bit MCU/8080 signals on the 40-pin, 2 × 20 header | Panel bring-up and display-driver development. |
| Touch | I2C touchscreen support | Interactive-display prototypes. |
| Audio | One analog MEMS microphone input and one onboard Class-D PA channel; speaker output up to 3 W / 4 Ω per the model guide | Recording and local playback experiments; check the speaker load and board revision. |
| Storage | MicroSD slot through SDIO | Media, logging, filesystem, and asset tests. |
| USB and power | Two USB Type-C connectors: one USB-to-UART (CH343K per the model guide) and one USB 2.0 FS; either can power the board | Serial logs, download/debug, USB evaluation, and bench power. |
| Power conversion | Onboard 3.3 V and 1.8 V power-conversion ICs | Verify rail requirements against the schematic before adding loads. |
| Debug and boot | 4-pin, 2.54 mm single-row SWD header; Mode boot jumper; power, function, and reset buttons | Firmware download, SWD debug, and boot-mode selection. |
| Indicators | RGB LED, GPIO-controlled LED, and power LED | Firmware and power-state checks. |
| RF | Onboard antenna by default; IPEX selection through a 0 Ω option | Antenna and enclosure evaluation with the module configuration. |

</div>

**Source note — confirm the board revision:** SiFli's detailed board guide identifies the documented board as carrying the `SF32LB56-MOD-A128R12N1` module, with 4 MB + 8 MB co-packaged OPI-PSRAM and 1 Gb QSPI-NAND; it warns that these memory details may change before official release. The current model guide lists both N16R12N1 and A128R12N1, each with 4 + 8 MB OPI-PSRAM and 1 MB standard QSPI-NOR. For A128R12N1, the model guide's 128 MB QSPI-NAND is capacity-equivalent to the detailed guide's 1 Gb. These capacities therefore align for A128R12N1; however, the detailed guide does not mention the 1 MB standard NOR, and it does not establish the SKU fitted to every board or revision. The model guide specifies two USB-to-UART debug channels on the CH343K, while the detailed guide describes the Type-C roles as USB-to-UART and USB 2.0 FS without documenting the channel-to-connector routing. Check the matching schematic/BOM before relying on a particular UART channel. Confirm the module marking and matching schematic/BOM before using a specific unit as a product baseline.

**USB-to-UART bridge discrepancy — verify the fitted part:** The detailed board guide's block diagram labels the bridge CH342K, while the model guide identifies it as CH343K. Verify the actual part against the schematic/BOM for the board revision.

**Photo/prose SKU discrepancy — verify the fitted module:** The detailed guide's prose identifies the documented board as carrying `SF32LB56-MOD-A128R12N1`, but its annotated front-board photo labels the module `SF32LB56-MOD-N16R12N1`. SiFli does not clarify whether the photo shows another variant or revision. Verify the module marking and board BOM for the unit; do not identify its SKU from the prose or photo alone.

## Programming and Debug { #programming-and-debug }

For download mode, install the Mode jumper before powering or resetting the board; remove it for normal application startup and serial-log operation. Connect the host to the USB-to-UART Type-C port with a data-capable cable. The separate USB 2.0 FS Type-C port is available for native USB testing. The board also provides a 4-pin, 2.54 mm single-row SWD header for a compatible debugger. Both Type-C connectors can power the board; follow the board guide and schematic for the intended power arrangement.

## SDK Build Targets { #sdk-build-targets }

The SiFli SDK uses the following exact board-target names with `scons --board=<board_name>`:

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

These are SDK build-target identifiers, not necessarily the product names printed on a board or module. The [Supported Boards index](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html) and the SDK's [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) may enumerate different sets; confirm the target against the SDK revision in use.

## First Validation Path { #first-validation-path }

1. Connect a compatible 24-bit MIPI-DPI display to the 40-pin FPC connector, and use the USB-to-UART port with a data-capable USB cable.
2. Follow [Getting Started](../../getting-started/index.md) to establish a known-good build, flash, and serial-log baseline.
3. Bring up solid display patterns before debugging a UI framework; see [Graphics Overview](../../learn/graphics/overview.md).
4. Add touch, storage, audio, or wireless one subsystem at a time, then test coexistence and power behavior.
5. Before a custom design, review [SF32LB56-MOD](../modules/SF32LB56-MOD.md) and [Design for Production](../../hardware/design-for-production.md).

## Reference { #reference }

SiFli maintains a [development-board model guide](https://wiki.sifli.com/en/board/devkit_guide.html) with the selectable board/module codes and a detailed [SF32LB56-DevKit-LCD Development Board User Guide](https://wiki.sifli.com/en/board/sf32lb56x/SF32LB56-DevKit-LCD.html) with GPIO assignments, header/interface definitions, power notes, and flash/debug procedures.
