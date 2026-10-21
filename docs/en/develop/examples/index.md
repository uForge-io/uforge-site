---
icon: lucide/list-tree
description: "How to choose and adapt a SiFli-SDK or Zephyr example by board, framework, and hardest peripheral, instead of building SF32 firmware from scratch."
tags:
    - Develop
    - Examples
---

# Examples { #examples }

Start from examples. SF32 firmware usually comes together faster when you adapt a working board-specific example instead of building every subsystem from scratch.

The best example is not always the smallest example. Choose the one that already includes the hardest part of your product: Bluetooth profile, display panel, audio route, filesystem, OTA, USB, power mode, or AI accelerator.

## Example Areas { #example-areas }

<div align="center"><em>Table: Example Areas</em></div>

<div align="center" markdown>

| Area | Start with |
|:-----|:-----------|
| First run | `example/get-started/hello_world/rtt/project` |
| Blink / GPIO | `example/get-started/blink/rtt` or GPIO HAL/device examples. |
| Bluetooth | BLE, BT Classic, LE Audio, throughput, beacon, OTA, and profile examples. Start with the [Bluetooth SDK Examples](../../learn/bluetooth/bluetooth-sdk-examples.md) task map. |
| Graphics | LVGL demos, design-tool integrations, widgets, compressed assets, animation/media, and display-specific examples. Start with the [LVGL SDK Examples](../../learn/graphics/lvgl-sdk-examples.md) task map. |
| Audio | Playback, record, PDM capture, codec, Opus, MP3, mixing, and USB audio where supported. Start with the [Audio SDK Examples](../../learn/audio/audio-sdk-examples.md) task map. |
| Power | PM state, GPIO, processor, Bluetooth, display, UI, and wearable-scenario examples. Start with the [Low-Power SDK Examples](../../learn/low-power/low-power-sdk-examples.md) task map. |
| Storage | Filesystem, flash, SD, and partition examples. |
| USB | CherryUSB device and host examples. |
| AI | NNACC HAL and RT-device examples. |

</div>

## Representative SDK Starting Points { #representative-sdk-starting-points }

Use this table after choosing the relevant area. Paths are representative and can change between SDK releases; verify the selected SDK, target board, and configuration before building.

<div align="center"><em>Representative SF32 SDK Example Starting Points</em></div>

<div align="center" markdown>

| Development Goal | Representative SDK Starting Point | What to Prove First | Continue With |
|:---|:---|:---|:---|
| GPIO output or input | `example/hal/gpio`, `example/rt_device/gpio` | Correct pin mux, polarity, and interrupt behavior on the actual board. | [Beginner Tutorials](../../getting-started/tutorials/beginner.md) |
| Console and system inspection | `example/system/finsh` | Serial console, logs, and basic runtime inspection. | [Beginner Tutorials](../../getting-started/tutorials/beginner.md) |
| ADC, PWM, or RTC | `example/hal/adc`, `example/rt_device/pwm`, `example/rt_device/rtc` | Board-specific pin, clock, and peripheral configuration. | [Beginner Tutorials](../../getting-started/tutorials/beginner.md) |
| I2C sensor | `example/hal/i2c/master`, `example/rt_device/i2c/eeprom` | Electrical connection, bus addressing, and reliable repeated transfers. | [Intermediate Tutorials](../../getting-started/tutorials/intermediate.md) |
| LVGL and local display | `example/multimedia/lvgl/lvgl_v8_examples` | Panel initialization, pixel format, and a stable flush path before complex screens. | [Graphics Overview](../../learn/graphics/overview.md), [Display Controller](../../learn/graphics/display-controller.md) |
| BLE peripheral service | `example/ble/peripheral`, `example/ble/hrpc` | Advertising, connection, one GATT characteristic, and reconnect behavior. | [Bluetooth Overview](../../learn/bluetooth/overview.md) |
| Local audio playback | `example/multimedia/audio/local_music`, `mp3_sd_player` | Codec/board path, buffer stability, and cleanup after playback. | [Audio Overview](../../learn/audio/overview.md) |
| Flash-backed storage | `example/storage/littlefs/nor`, `example/storage/flashdb` | Mount, read/write behavior, and recovery from reset or full storage. | [Intermediate Tutorials](../../getting-started/tutorials/intermediate.md) |
| Low-power behavior | `example/pm/classical`, `example/pm/raise_wrist` | Measured current in named states and correct wake-source behavior. | [Low-Power Overview](../../learn/low-power/overview.md) |
| BLE OTA | `example/ble/peripheral_with_ota` | Interrupted-update recovery and rollback on target hardware. | [Advanced Tutorials](../../getting-started/tutorials/advanced.md) |
| Runtime diagnosis | `example/system/cpu_usage_profiler`, `example/system/coredump` | Reproducible CPU trace or crash capture before optimizing. | [Advanced Tutorials](../../getting-started/tutorials/advanced.md) |

</div>

## How to Choose an Example { #how-to-choose-an-example }

Use this order:

1. Match the board.
2. Match the framework.
3. Match the hardest peripheral.
4. Match the middleware.
5. Match the power or memory constraints.

For example, a Bluetooth audio product should start closer to an audio/Bluetooth example than to a clean `hello_world`, even if the latter is easier to understand.

## Adaptation Workflow { #adaptation-workflow }

1. Build and flash the unmodified example.
2. Save the successful build command, board name, flash command, serial port, and log.
3. Make one product change.
4. Rebuild and retest.
5. Commit or record the change before adding another subsystem.

This workflow is slower for the first hour and much faster after the first hard failure.

## Evidence to Keep { #evidence-to-keep }

For each example that becomes a product base, record:

- SDK branch or package version.
- Board name or FQBN.
- Required configuration options.
- Required pins and peripherals.
- Expected serial output.
- Known limitations.
- Memory footprint if available.
- Recovery command.

## Example Selection Rule { #example-selection-rule }

Choose the example that matches the most constrained part of the product:

- For Bluetooth products, start from the closest profile.
- For display products, start from the display and LVGL path.
- For battery products, start from a power example.
- For OTA products, start from the update flow and partition layout.

Then add the other subsystems one by one.

## Suggested Learning Path { #suggested-learning-path }

If you are new to the SDK, begin with [Beginner Tutorials](../../getting-started/tutorials/beginner.md), then move to [Intermediate Tutorials](../../getting-started/tutorials/intermediate.md) when a single peripheral is stable. Use [Advanced Tutorials](../../getting-started/tutorials/advanced.md) for measured power work, OTA, custom display bring-up, failure analysis, multi-connection Bluetooth, and custom drivers. The topic overviews explain the architecture and trade-offs behind those examples.
