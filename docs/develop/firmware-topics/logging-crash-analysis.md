---
icon: lucide/file-warning
description: "Design SF32 firmware logging and crash-analysis workflows so field failures are diagnosable, covering minimum log data, crash-report flow, and log levels by phase."
tags:
    - Develop
    - Logging
    - Crash Analysis
---

# Logging and Crash Analysis { #logging-and-crash-analysis }

Logs are part of the product, not a temporary debug convenience. Good logs reduce the time needed for board bring-up, field debugging, and factory investigation.

Design logging before the first field test. After a device fails in the field, you only get the data the firmware was already prepared to save or print.

## Minimum Logging Setup { #minimum-logging-setup }

For every firmware build, record:

- Firmware version.
- SDK branch or commit.
- Board name and revision.
- Boot reason.
- Partition layout version.
- Major subsystem initialization results.
- Crash/assert output if boot fails.

## Crash Analysis Flow { #crash-analysis-flow }

1. Reproduce the issue on a board with a verified working baseline.
2. Capture a full boot log from reset.
3. Save the exact binary and symbols.
4. Decode assert or dump output with SiFli tooling.
5. Check stack sizes, memory ownership, DMA buffers, and cache maintenance.
6. Narrow down the issue using the closest matching SDK example.

## Log Levels { #log-levels }

<div align="center"><em>Table: Log Levels</em></div>

<div align="center" markdown>

| Phase | Suggested logging |
|:------|:------------------|
| Board bring-up | Verbose peripheral and boot logs. |
| Feature development | Module-level debug logs around the feature under test. |
| Power tuning | Keep logs minimal; logging itself changes power behavior. |
| Release candidate | Warnings, errors, version, boot reason, and key health checks. |
| Field-diagnostic build | Targeted logs around the suspected subsystem. |

</div>

## What Makes a Good Crash Report { #what-makes-a-good-crash-report }

- It includes the full reset-to-crash log.
- It identifies the exact binary.
- It includes symbol files or a reproducible build.
- It states whether the crash happens on an unmodified SDK example.
- It lists connected peripherals and power source.
- It says whether the crash persists after a full flash erase and reflash.
