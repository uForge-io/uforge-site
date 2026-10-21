---
icon: lucide/bug
description: "Debugging SF32 firmware with sftool, AssertDump, SiFli_Trace, and the RT-Thread shell, plus a repeatable reproduction order and crash-report checklist."
tags:
    - Develop
    - Debugging
---

# Debugging and Diagnostics { #debugging-and-diagnostics }

Start SF32 debugging with serial logs. Depending on the chip, SDK release, and project configuration, you may also have crash-dump tools, trace capture, and an RT-Thread shell; use only workflows documented for the target.

## First-Line Debugging { #first-line-debugging }

Use the serial console to collect:

- Boot logs.
- Application prints.
- RT-Thread shell output, if enabled in the project.
- Fault messages.
- Download and reset behavior.

Keep logs with board revision, SDK branch, build command, flash command, and serial settings.

## Debugging Order { #debugging-order }

1. Reproduce with the same firmware.
2. Reproduce after reset.
3. Reproduce after full reflash.
4. Reproduce from the closest SDK example.
5. Add product changes back one at a time.

This helps separate hardware, board-support, middleware, and application issues.

## Tools to Know { #tools-to-know }

<div align="center"><em>Table: Tools to Know</em></div>

<div align="center" markdown>

| Tool | Use |
|:-----|:----|
| `sftool` | Serial command-line utility for supported flash read/write/erase and reset operations; options depend on chip and storage. |
| `SiFli_Trace` | Capture and inspect target-board log output using the workflow supported by the selected target. |
| `UsartServer` | Required companion for the documented UART-debug workflow through the built-in Debug IP on SF32LB52X and SF32LB56X; do not assume it applies to every target. |
| `AssertDump` and crash-dump tools | Use only when provided for the chip and SDK release; follow that release's documented capture and analysis procedure. |
| RT-Thread shell | Runtime inspection and commands only when the project configuration enables the shell. |

</div>

## What to Inspect First { #what-to-inspect-first }

<div align="center"><em>Table: What to Inspect First</em></div>

<div align="center" markdown>

| Symptom | First checks |
|:--------|:-------------|
| Hard fault or assert | Stack size, null pointers, DMA buffers, cache maintenance. |
| Peripheral unresponsive | Pin mux, clock, power rail, board name, driver enable. |
| Bluetooth unstable | RF clock, antenna path, Bluetooth stack configuration, connection parameters. |
| Display artifacts | Panel timing, buffer format, cache/DMA synchronization. |
| Random reset | Watchdog, power rail, brownout, stack overflow. |

</div>

## Crash Report Checklist { #crash-report-checklist }

When reporting a crash, include:

- Board and revision.
- Chip variant.
- SDK branch or commit.
- Exact example or project.
- Build command and board name.
- Flash command.
- Serial boot log from reset.
- Crash dump or assert output.
- Whether the issue reproduces on a clean SDK example.
