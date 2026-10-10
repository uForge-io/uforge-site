---
icon: lucide/braces
description: "MicroPython is not yet a verified SF32 getting-started path; use SiFli-SDK for a reproducible first run and follow the MicroPython status page for readiness."
tags:
    - Getting started
    - MicroPython
---

# MicroPython { #micropython }

MicroPython is not yet a verified getting-started path for SF32. No official board-specific firmware image, flash procedure, or REPL configuration is currently documented in the checked SiFli and OpenSiFli sources.

Use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) to establish a reproducible board, cable, serial-port, and flash baseline. Do not follow generic MicroPython installation instructions or use an image intended for a different MCU or board.

The [MicroPython Status](../../develop/platforms/micropython/status.md) page tracks the exact public artifacts and acceptance criteria required before this page can become a tutorial.

!!! warning "No verified MicroPython tutorial yet"
    A usable SF32 MicroPython guide needs an exact board-and-memory image, flash and recovery commands, REPL port and baud rate, filesystem behavior, and an honest peripheral-support matrix. Until those artifacts exist, this page intentionally has no installation steps.

## What a Verified Tutorial Needs { #what-sifli-should-publish }

Before following a future SF32 MicroPython tutorial, confirm that it identifies a compatible board-specific image, tested flash and recovery commands, REPL port and baud rate, filesystem behavior, and a maintained peripheral-support matrix. Until those details are available in the [status page](../../develop/platforms/micropython/status.md), use the SiFli-SDK path above for first bring-up.
