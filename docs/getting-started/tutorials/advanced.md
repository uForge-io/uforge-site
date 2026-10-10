---
icon: lucide/rocket
description: "Product-validation SF32 tutorials: measured low-power tuning, recoverable BLE OTA, custom display bring-up, crash/coredump analysis, multi-connection Bluetooth, and custom drivers."
tags:
    - Tutorials
---

# Product Validation { #advanced-tutorials }

These tutorials assume [Connected Subsystems](intermediate.md) is comfortable territory. You can bring up a peripheral, connect it to middleware, and you have already seen at least one coexistence problem firsthand. This track focuses on the work that separates a working demo from a product you can ship: measured power, recoverable OTA, custom hardware bring-up, crash analysis, multi-connection Bluetooth, and reusable drivers.

Product-validation work is less about copying a single example and more about building evidence. For each tutorial, keep notes: board revision, SDK version, example base, test setup, expected result, observed result, and what changed.

Use this series when your responsibility extends beyond a feature working once: you need measurable power behavior, recoverable updates, repeatable custom-hardware bring-up, and evidence for failures that happen outside the happy path.

Example paths and supported boards can vary by SDK release. Before building, check each example's current Supported Platforms list and board-specific hardware and configuration requirements; support for one exercise does not imply support for the others or for every feature combination.

## Tune Low-Power Modes and Wake Sources { #tune-low-power-modes-and-wake-sources }

**Goal:** get real battery-life evidence instead of assuming firmware is low power because it calls a sleep function.

**Time:** 2+ hours, plus measurement setup

**Start from:** `example/pm/classical`, `example/pm/raise_wrist`

1. Set up current measurement as described in the [Low-Power Overview](../../learn/low-power/overview.md#measuring-power-in-practice).
2. Record a baseline for boot, active, connected idle, display-off idle, and deep sleep if available.
3. Start from the classical PM example and find where `rt_pm_request(PM_SLEEP_MODE_IDLE)` blocks entry into modes deeper than IDLE, and where the matching `rt_pm_release(PM_SLEEP_MODE_IDLE)` lifts that restriction. Also check whether the driver framework blocks sleep automatically while a peripheral is active.
4. Move to the raise-to-wake example and examine how it samples the accelerometer, recognizes wrist gestures, wakes the display, and returns to sleep. Verify the example's actual sampling and wake sequence; do not assume it uses an interrupt.
5. Apply the same power-aware principle to your product. Where the hardware and drivers support it, use interrupts or event-driven work to avoid unnecessary timers and polling loops.
6. Re-measure after each change.
7. If deep sleep is not as deep as expected, use `list_thread`, `list_device`, PM logs, and wake-source instrumentation to find the subsystem still active.

**Success criteria:** the firmware reaches the expected low-power state, current is repeatable across runs, and wake sources are intentional rather than accidental.

**Troubleshooting:** if power looks good once and bad later, check error paths, reconnect paths, display teardown, audio session teardown, and any timer created after startup.

**What you learned:** how to move from "should be low power" to measured low power, and how to track down a PM vote that is quietly being left open.

## Add OTA Firmware Updates over BLE { #add-ota-firmware-updates-over-ble }

**Goal:** update firmware in the field without a wired connection.

**Time:** 2 hours

**Start from:** `example/ble/peripheral_with_ota`

1. Build and flash the OTA-enabled peripheral example.
2. Confirm normal BLE peripheral behavior still works before attempting an update.
3. Trigger an OTA update and confirm the device boots the new image.
4. On a test unit with a documented recovery path, exercise one interruption at a time, such as disconnecting during transfer or moving out of range. Do not cut power unless the board documentation and product recovery design explicitly make that test safe.
5. Verify the behavior this product actually implements after an interrupted or rejected update, such as retry, resume, recovery mode, or rollback. Treat rollback as a requirement only when the boot and partition design implements it.
6. Test OTA after stale bond, phone-side forget-device, and device reboot.
7. If your product already uses PAN for data, evaluate the PAN OTA path as a separate design choice.

**Success criteria:** a successful update boots the new image; an interrupted or rejected update follows the product's documented recovery policy; and the user can tell which state the device reached. Do not assume that every OTA design supports rollback.

**Troubleshooting:** check the partition layout, image-signing or integrity checks if used, boot-selection and recovery behavior, rollback support if implemented, connection parameters during transfer, and whether bond or storage changes survive the update.

**What you learned:** how partition layout, image validation, boot selection, and recovery policy determine OTA behavior—and why a successful update alone does not prove that interrupted updates are recoverable.

## Bring Up a Custom Display Module { #bring-up-a-custom-display-module }

**Goal:** port a new LCD, AMOLED, EPD, or memory display instead of using a pre-supported reference panel.

**Time:** 3+ hours

**Start from:** the closest existing display driver in the SDK, adapted for your panel

1. Collect the panel datasheet, initialization sequence, timing parameters, interface type, reset requirements, and power sequence.
2. Confirm the selected SF32 device and package support the required interface and pinout.
3. Copy the closest existing display driver and replace the panel-specific init sequence and register map.
4. Bring up solid-color fills first. Do not debug LVGL widgets until the panel can display simple patterns.
5. Verify color order, byte order, orientation, address window, and partial update behavior.
6. Add LVGL back from Connected Subsystems, exercise 2.
7. Where the selected chip, display path, driver, and SDK support them, enable DMA, partial refresh, and ePicasso acceleration one at a time.
8. Test display-off, sleep, wake, and reinitialization paths.

**Success criteria:** the panel initializes reliably after cold boot and reset, renders known patterns correctly, and survives sleep/wake without corruption.

**Troubleshooting:** if fills are wrong, check pixel format, MADCTL/orientation bits, byte order, command/data wiring, reset timing, and power-rail sequencing before changing UI code.

**What you learned:** how to separate electrical/sequence correctness from UI-framework configuration.

## Profile CPU Usage and Analyze a Crash { #profile-cpu-usage-and-analyze-a-crash }

**Goal:** debug problems that do not reproduce conveniently under a live debugger.

**Time:** 2 hours

**Start from:** `example/system/cpu_usage_profiler`, `example/system/coredump`

1. Run the CPU usage profiler example against one of your Connected Subsystems combined workloads.
2. Identify which task is consuming CPU time and whether it matches your expectation.
3. Add a controlled fault in a practice branch or disposable example and capture a core dump.
4. Use the SDK's dump-analysis tooling to locate the faulting function and call stack.
5. Compare the crash context with `list_thread`, logs, and recent events.
6. Remove the deliberate fault and repeat the flow with a real intermittent issue if you have one.

**Success criteria:** you can explain both a performance problem and a crash using captured evidence rather than guesses.

**Troubleshooting:** make sure symbols match the flashed binary, logs include firmware version, and optimization level is understood before interpreting call stacks.

**What you learned:** proactive profiling for slow paths and postmortem dump analysis for failures that are hard to catch live.

## Build a Multi-Connection BLE Product { #build-a-multi-connection-ble-product }

**Goal:** support more than one simultaneous BLE role or connection.

**Time:** 2 hours

**Start from:** `example/ble/central_and_peripheral`, `example/ble/multi_connection`

1. Start from the peripheral behavior you already have from Connected Subsystems, exercise 3.
2. Add a central role alongside it, such as acting as a peripheral to a phone while acting as a central to a sensor accessory.
3. Extend to multiple concurrent connections.
4. Record connection intervals, slave latency, supervision timeout, and notification rate for each link.
5. Add a throughput baseline using the SDK throughput example before blaming application code.
6. Test reconnect, phone sleep, accessory loss, and simultaneous notification bursts.

**Success criteria:** all intended roles connect, disconnect, and reconnect reliably, and connection-parameter choices remain stable under combined activity.

**Troubleshooting:** look for incompatible parameter requests, too much notification traffic, blocking application callbacks, and power policy that wakes the main CPU for every link event.

**What you learned:** supported SiFli-SDK BLE configurations can combine peripheral and central roles, and some support multiple concurrent links. Confirm role and connection limits for the target chip, stack configuration, and example; connection-parameter tradeoffs compound when links share the radio schedule.

## Write a Custom RT-Thread Device Driver { #write-a-custom-rt-thread-device-driver }

**Goal:** integrate a peripheral that does not have an existing SDK driver as a proper RT-Thread device rather than a one-off application hack.

**Time:** 3+ hours

**Start from:** SDK application-development guidance plus the closest existing driver

1. Review how the SDK organizes board definitions, pin mux, clocks, and peripheral drivers.
2. Start from the existing driver that is architecturally closest to your peripheral.
3. Keep bus access, device registration, configuration, and application logic separated.
4. Register the device and confirm it appears under `list_device`.
5. Exercise it the same way you exercised ADC, PWM, I2C, and storage devices in earlier tutorials.
6. Add error handling for missing hardware, invalid arguments, timeouts, and suspend/resume.
7. If the driver is reusable, package it as an SDK component instead of copy-pasting it between products.

**Success criteria:** application code can find and use the driver through the normal RT-Thread device model, and the driver behaves predictably across init, use, error, and sleep/wake paths.

**Troubleshooting:** if the driver works only from one application file, it is probably bypassing the device model. Refactor until it feels like the built-in devices.

**What you learned:** how to extend the SDK ecosystem cleanly rather than creating a maintenance liability.

## Product-Validation Release Checklist { #advanced-release-checklist }

- [ ] Power numbers are measured, repeatable, and tied to named test scenarios.
- [ ] OTA success, integrity checks, and interruption recovery have been tested against the product's documented policy; rollback is verified only if the design implements it.
- [ ] Custom display bring-up is validated with patterns before LVGL complexity.
- [ ] Profiling and coredump workflows are documented for the team.
- [ ] Multi-connection Bluetooth is tested across reconnect and phone/accessory edge cases.
- [ ] Custom drivers use the RT-Thread device model and handle sleep/wake.
- [ ] Combined-load tests include display, Bluetooth, storage, audio, sensors, and AI as applicable.

## Where to Go Next { #where-to-go-next }

At this point you have the full toolkit: peripherals, middleware, coexistence awareness, power discipline, OTA, custom hardware bring-up, postmortem debugging, and driver integration. From here, the [Examples](../../develop/examples/index.md) catalog and [Graphics Overview](../../learn/graphics/overview.md) are ongoing references. Pull from them per feature rather than working through them linearly.
