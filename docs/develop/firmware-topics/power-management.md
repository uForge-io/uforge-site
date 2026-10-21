---
icon: lucide/battery-charging
description: "Measure and tune SF32 power across clocks, sleep modes, display, Bluetooth connection intervals, and sensors to turn a prototype into a battery-ready product."
tags:
    - Develop
    - Power
---

# Power Management { #power-management }

Power management turns a working prototype into a wearable-ready product. On SF32, power work spans clock configuration, sleep modes, display behavior, Bluetooth connection intervals, sensor interrupts, and application architecture.

Do not optimize power from isolated code snippets. Measure product scenarios: boot, idle, connected idle, display on, audio active, sensor wake, OTA, and shutdown.

## Practical Workflow { #practical-workflow }

1. Measure the unmodified SDK example.
2. Enable one subsystem at a time.
3. Keep display, Bluetooth, audio, storage, and sensor activity separated during early measurement.
4. Use interrupt-driven wakeups instead of polling.
5. Record current draw by mode and by product scenario.

## Useful Starting Points { #useful-starting-points }

- SDK power examples.
- CPU usage profiling.
- RT-Thread shell inspection.
- Board-level current measurement.

## Measurement Notes { #measurement-notes }

Record every measurement with:

- Board and revision.
- Power source and measurement point.
- Firmware branch and build.
- Display state.
- Bluetooth state.
- Sensor state.
- Logging level.
- Average current, peak current, and measurement window.

## Common Power Problems { #common-power-problems }

<div align="center"><em>Table: Common Power Problems</em></div>

<div align="center" markdown>

| Symptom | Likely cause |
|:--------|:-------------|
| Idle current too high | Polling loop, logging, display rail, or peripheral clock left on. |
| Sleep entry fails | Active timer, open device, pending work, or unhandled wake source. |
| Bluetooth current spikes | Connection interval, scan window, audio path, or retransmissions. |
| Display dominates power consumption | LCD backlight power draw, on-screen AMOLED content, refresh policy, or partial-update strategy. |
| Measurements vary wildly | Test setup, battery state, USB power path, or logging load changed. |

</div>
