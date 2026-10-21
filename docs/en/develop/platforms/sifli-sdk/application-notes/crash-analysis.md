---
icon: lucide/file-search-2
title: "Capture Logs and Analyze Crashes"
description: "Capture matching logs and memory, restore a crash context, and analyze assertions or hard faults with SiFli-SDK tools."
tags: [Develop, SiFli-SDK, Application Notes, Debugging]
---

# Capture Logs and Analyze Crashes { #capture-logs-and-analyze-crashes }

The SDK's `debug_logging` and `crash_analysis` guides are complementary: logs explain what the two cores were doing, while a captured memory image lets a debugger recover the failing context. Keep the exact ELF, map/symbol files, SDK revision, chip model, configuration, and board revision with every capture.

## Choose a debug connection { #choose-a-debug-connection }

<div align="center" markdown>

<em>Table: Debug and log connections by SF32 family</em>

| Family | Debug and log behavior |
|---|---|
| SF32LB52x, SF32LB56x, SF32LB58x | The source guide documents UART capture, `SifliUsartServer`/`AssertDumpUart`, and J-Link/Trace32 recovery. Use the transport that remains available in the selected sleep state. |
| SF32LB55x | SWD can be switched between HCPU and LCPU with `$SDK_ROOT/tools/segger/jlink_hcpu_a0.bat` and `jlink_lcpu_a0.bat`. LCPU's ROM console is UART3 at 1,000,000 baud; HCPU can use UART1/2 or SWD. Because SWD uses PB IO, keep LPSYS active or in light sleep while connected. |

</div>

When LPSYS wakes from standby, SWD returns to HCPU. A J-Link reset does not itself switch the selected core. If asynchronous logging is enabled, an assert dump can be truncated; use a synchronous or retained capture for the failure path.

## Capture a live or post-mortem package { #capture-a-live-or-post-mortem-package }

For current SDK releases, capture over UART or J-Link with `sdk.py`:

!!! note "Example scope"
    The command below is an SF32LB52/LB525 example. Keep the command structure, but replace the chip/model, core, transport, and ELF with values supported by the target family and SDK release.

```text
sdk.py crash-dump capture-live --transport uart --probe /dev/ttyUSB0 \
  --chip SF32LB52 --chip-model LB525 \
  --output /tmp/live-crash --elf build_hcpu/main.elf
```

Add `--include-psram --psram-size 8MB` when the target uses PSRAM. A J-Link probe can use `--transport jlink --jlink-ip 127.0.0.1:19025`; select the affected core with `--core hcpu` or `--core lcpu`. The output directory should contain the captured binary, core ELF/AXF, `log.txt`, `manifest.json`, and `sdk_manifest.json`.

For older SDKs, use the family-specific method in the source guide:

- UART: `SifliUsartServer` or `AssertDumpUart` can export an assertion package while the console is available.
- J-Link/SWD: add J-Link to `PATH`, then run the script for the target family; for example, SF32LB55x uses `$SDK_ROOT/tools/crash_dump_analyser/script/save_ram_55x.bat`. The matching script saves RAM, EPIC registers, and PSRAM.
- Ensure `RTOS → RT-Thread Kernel → Memory Management → Enable memory trace` is enabled when heap-leak evidence is needed.

For script-based capture, match the `.jlink` file to both the target family/PSRAM configuration and the connection method. Use an IP-mode script with the `SifliUsartServer` path and a USB-mode script for a direct J-Link connection; a mismatch can cause capture to fail.

![SF32LB52x memory-trace option in menuconfig](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_mem_trace.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — enable memory trace before reproducing a failure when heap evidence is required.</em></div>

UART capture normally requires matching the serial utility, server address, and target core. The following screenshots from the guide are useful connection checks:

![SiFli_Trace and SifliUsartServer tool location](../../../../assets/develop/app-notes/crash-analysis/Sifli_Trace.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — tool directory.</em></div>

![SifliUsartServer SF32LB52x connection settings](../../../../assets/develop/app-notes/crash-analysis/UsartServer52.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — the serial port, baud rate, server address, and debug core must match the captured target.</em></div>

![Crash-dump analyzer RAM-save script](../../../../assets/develop/app-notes/crash-analysis/save_ram_uart_52.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — the directory includes family- and transport-specific scripts such as `save_ram_55x.bat`, `save_ram_58x.bat`, and `save_ram_uart_52x.bat`; choose the one that matches the target and connection.</em></div>

## Restore and analyze the context { #restore-and-analyze-the-context }

Convert a captured package to a debugger-readable core and analyze it with the matching ELF:

```text
sdk.py crash-dump readcore --package /tmp/live-crash \
  --elf build_hcpu/main.elf --output /tmp/live-crash/coredump.elf
sdk.py crash-dump analyze --core /tmp/live-crash/coredump.elf \
  --elf build_hcpu/main.elf
```

The older Trace32 workflow loads an HCPU assertion package with the HCPU assertion (HA) button and `run_next_step`; use the LCPU recovery configuration for an LCPU dump. If no exception stack is displayed, verify the core selection, ELF, and memory ranges before interpreting registers.

![Trace32 capture-script selection example](../../../../assets/develop/app-notes/crash-analysis/dump_select.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — J-Link/Trace32 capture-script selection.</em></div>

![Trace32 HCPU assertion window](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_hcpu_window.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — inspect the call stack, thread list, heap, and error reason together after recovery.</em></div>

## Stop early during boot or a suspected race { #stop-early-during-boot-or-a-suspected-race }

To debug initialization, uncomment the first instruction in the matching `Reset_Handler` so it becomes `B .`:

The startup-file paths below are SF32LB55x source paths; use the corresponding startup files for another family.

- HCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_hcpu.S`
- LCPU: `$SDK_ROOT/drivers/cmsis/sf32lb55x/Templates/arm/startup_bf0_lcpu.S`

Connect J-Link and advance the PC by two bytes to continue. In C, `_asm("B .");` creates the same intentional stop. Do not replace it with `while (1);`; the compiler may optimize away code after the loop.

## Read the evidence { #read-the-evidence }

An assertion dump normally includes the assertion function and line, thread table, mailbox and message-queue state, mutexes, semaphores, heap usage, and CPU registers. Correlate the failing PC with the exact ELF, then check stack headroom, ownership of any resource involved in a blocked wait, queue entries, and the last log entry before the failure. Preserve the raw dump before symbolizing it.

For interactive inspection, Ozone can load the HCPU/LCPU ELF and the matching Cortex-M33-with-FPU SVD from `$SDK_ROOT/tools/svd_external`. Use UART or `SifliUsartServer` when the core is in a state where SWD cannot attach. ULOG can use UART; after enabling RTT support, select `segger` as the RT-Thread log device to use Segger RTT.

## Instrument bus and memory failures { #instrument-bus-and-memory-failures }

The SDK bus monitor can capture accesses that lead to a bus fault. Register a callback with `dbg_busmon_reg_callback`, then use `dbg_busmon_read` and `dbg_busmon_write` from the example in the guide to inspect the relevant address range. Pair this with heap tracing and the crash package; a register dump without symbols or memory context is rarely sufficient.

![Trace32 heap call-stack example](../../../../assets/develop/app-notes/crash-analysis/crash_analysis_heap_callstack.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x guide example — heap call stack and memory windows.</em></div>

Official family sources: [SF32LB52x crash analysis](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/crash_analysis.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/crash_analysis.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/crash_analysis.html), [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/crash_analysis.html), and the matching [debugging and logging guide](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/debug_logging.html).
