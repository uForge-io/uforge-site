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
- Assert/crash output, including the reported file and line, first-fault PC, and stack data when available.
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
| [`sftool`](https://github.com/OpenSiFli/sftool) | Serial command-line utility for supported flash read/write/erase and reset operations; options depend on chip and storage. |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | Capture and inspect target-board log output using the workflow supported by the selected target. |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | Companion for UART debugging through the built-in Debug IP. The [v2.5.1 guide](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html) lists SF32LB52X and SF32LB56X; a newer English guide also mentions `SF322LB57`. Confirm support for the exact chip and SDK rather than assuming every target is covered. |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html) and [crash-analysis tools](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | Use only when provided for the chip and SDK release; follow that release's documented capture and analysis procedure. |
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
| HCPU/LCPU logs missing | Check UART assignment, `ulog`, pinmux, and LCPU startup. |

</div>

For the cited LB551 examples, HCPU uses UART1 and LCPU uses UART3 on PB45/PB46. Check that HCPU does not also claim UART3, inspect the QSPI3/UART1 pin-mux overlap in `pinmux.c`, and confirm the LCPU has started; some examples require `lcpu on` or `lcpu_power_on()`.

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

## Official Sources { #official-sources }

- [SiFli-SDK: Debugging and Logging](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK: Crash Analysis Guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki: Log debugging (Chinese)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki: Dump memory to recover a crash (Chinese)](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
