---
icon: lucide/circuit-board
description: "How the SiFli-SDK --board name ties firmware to real SF32 hardware: flash/PSRAM layout, pin mux, display and audio paths, and a board bring-up checklist."
tags:
    - Develop
    - SiFli-SDK
---

# Board Configuration { #board-configuration }

Board configuration ties firmware to real hardware: flash layout, PSRAM, pins, display interface, audio path, clocking, power rails, and default peripherals.

In SiFli-SDK, the `--board=<board_name>` value is the most important build input. It selects the board support package used by the example.

For dual-core boards, omitting the core suffix selects the HCPU configuration by default. Append `_lcpu` to the board name to build for LCPU; use `_hcpu` to select HCPU explicitly. Confirm that the example supports the selected core.

## What the Selected Board Can Affect { #what-the-board-name-controls }

The selected board can affect:

- Chip and package variant.
- Flash and PSRAM layout.
- HCPU/LCPU build targets.
- Pin mux and peripheral availability.
- UART download settings.
- Display and touch configuration.
- Audio codec routing.
- Bluetooth configuration.
- Partition table and boot assumptions.

## Practical Rules { #practical-rules }

- Do not guess the board name from the marketing name.
- Do not copy a board name from Zephyr or Arduino into SiFli-SDK.
- Keep the board schematic or dev kit page open when choosing GPIO, ADC, PWM, I2C, SPI, or display resources.
- Start from the closest SDK example for the same board.
- Rebuild cleanly after switching boards.

## Board Bring-Up Checklist { #board-bring-up-checklist }

- [ ] Confirm the chip variant and package.
- [ ] Confirm the Flash and PSRAM types, capacities, and configuration.
- [ ] Confirm power source and charger behavior.
- [ ] Confirm the clock sources and frequencies used by this board, including 48 MHz and 32.768 kHz where applicable.
- [ ] Confirm download UART and log UART.
- [ ] Confirm display and touch interface.
- [ ] Confirm audio path if used.
- [ ] Confirm boot pins and reset behavior.
- [ ] Confirm partition layout.

Do not begin application debugging until the board configuration matches the hardware in front of you.

## SDK Board-Name Example { #sdk-board-name-example }

<div align="center"><em>Table: SF32LB52-DevKit-LCD_N16R8 SDK Board Name</em></div>

<div align="center" markdown>

| Name type | Identifier |
|:----------|:-----------|
| Board model | `SF32LB52-DevKit-LCD_N16R8` |
| SiFli-SDK `--board` value | `sf32lb52-lcd_n16r8` |

</div>

Use the SiFli-SDK identifier with `--board`; the product name is not a build identifier.

## When Porting to a Custom Board { #when-porting-to-a-custom-board }

Start from the closest dev kit or module configuration, then change:

1. Flash and PSRAM configuration.
2. Pin mux.
3. Console/download UART.
4. Display/touch/audio resources.
5. Power and charger assumptions.
6. Partition layout.
7. Product-specific peripherals.

Validate each change with the smallest example that exercises it.
