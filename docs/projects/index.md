---
icon: lucide/folder-kanban
title: "Projects Overview"
description: "End-to-end μForge projects that combine selected hardware, a software baseline, validation evidence, and a production handoff."
tags:
    - Projects
---

# Projects Overview { #projects-overview }

Projects are application-grounded references that you can duplicate, adapt, and use to explore an SF32 product direction. Rather than trying to demonstrate every feature in isolation, each project shows a focused combination of SF32 capabilities in something a person might actually build and use.

## What Projects Are For { #what-projects-are-for }

Each project should be:

- **Grounded in an application.** It starts with a recognizable product behavior or use case, not an abstract feature demonstration.
- **Complete enough to follow.** It connects the selected hardware, software baseline, dependencies, integration milestones, validation evidence, and an adaptation path, so you can experience a substantial portion of the development flow.
- **Meant to be duplicated.** It provides a practical baseline to reproduce first, then modify for your own hardware, interaction model, or product requirements.
- **Fun to make.** A project should invite experimentation and make visible what SF32 capabilities enable; usefulness and enjoyment belong together here.

Use a project after completing the relevant [Getting Started](../getting-started/index.md) baseline. [Reference Designs](../hardware/reference-designs/reference-designs.md) describes reusable baselines and validation journeys. Its current Connected Wearable entry is a workflow, not a released board package. A project should link to a concrete, applicable baseline when one exists; otherwise, it should identify and validate its own baseline rather than imply that a planning journey is a qualified design.

## SiFli-SDK Projects { #sifli-sdk-projects }

!!! info "Third-party project ownership"
    [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) is maintained by Xinyuan-LilyGO/LilyGO, not by SiFli. Use LilyGO's repository for board-specific hardware and firmware support, and SiFli sources for the underlying SF32 device and SiFli-SDK.

<div align="center"><em>Table: Project Directory</em></div>

<div align="center" markdown>

| Project | Outcome | Hardware and software baseline | Best for |
|:--------|:--------|:-------------------------------|:---------|
| [SF32 Xiaozhi Voice Assistant](sf32-xiaozhi.md) | A connected voice-and-display assistant based on the open-source Xiaozhi SF32 implementation. | Supported SF32LB52 boards, Xiaozhi SF32 source, Bluetooth PAN, and Xiaozhi cloud services. | Evaluating an AI voice-interaction product flow and adapting its hardware or application behavior. |
| [SF32 BLE Talkback Intercom](sf32-ble-talkback.md) | A multi-device BLE push-to-talk intercom with role selection, Opus speech, slave reconnection, state indication, and low-power behavior. | Two or more SF32LB52-DevKit-ULP boards, pinned Talkback source, a pinned SiFli-SDK 2.4-compatible revision, and `talk_back/1.2@sifli`. | Qualifying portable group intercom behavior, acoustics, RF recovery, and power before custom hardware. |
| [SF32 E-Paper EPUB Reader](sf32-epd-reader.md) | A local EPUB reader with library/contents flow, key and touch input, dynamic fonts, full/partial refresh, storage, and low-power states. | SF32-OED-EPD V1.1, YZC085 V1.05 e-paper, pinned EPD Reader and SDK commits, TF storage, and qualified content/fonts. | Evaluating an e-paper reading terminal, EPUB/rendering limits, panel waveforms, storage recovery, and power behavior. |
| [SuperKey Multifunction Macro Keyboard](superkey.md) | A three-display USB HID/CDC desktop controller with keys, encoder, sensing, telemetry, and a companion application. | Open sf32-keyboard hardware, the `sf32lb52-superkey` firmware target, and SuperKeyHub. | Evaluating a desktop HMI, macro keyboard, status panel, or host-connected control surface. |
| [Radiation Monitor](radiation-monitor.md) | A portable 79-point 2.4 GHz signal-strength viewer with smoothing and history playback. | SF32LB52 RF test path, LVGL display, KEY2 control, and a controlled RF comparison setup. | Exploring relative interference trends and deciding whether a calibrated RF instrument path is justified. |
| [Pocket Pi SF32 Handheld Game Console](pocket-pi.md) | A local NES-emulation handheld with game browser, input, audio, save states, and built-in/TF-card storage. | SF32LB52-DevKit-ULP target, PocketPi/Nofrendo source, AW9523 controls, and legally usable NES content. | Testing a game-oriented graphics, input, audio, storage, and power workload before custom hardware. |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | A third-party display-led SF32 development platform with touch, motion, storage, audio, LoRa, and power-management paths. | LilyGO T-Display-SF32 hardware, board-repository and LilyGO SDK-fork revisions selected and recorded for the evaluation, and the `t-display-sf32_hcpu` target. | Evaluating a LilyGO-maintained wearable, handheld, sensor-terminal, or HMI baseline without mistaking it for an official SiFli project. |

</div>

## Zephyr Projects { #zephyr-projects }

This group includes projects built on Zephyr directly or on a documented Zephyr-derived layer, such as OpenSiFli's ArduinoCore-zephyr.

<div align="center"><em>Table: Zephyr Project Directory</em></div>

<div align="center" markdown>

| Project | Outcome | Hardware and software baseline | Best for |
|:--------|:--------|:-------------------------------|:---------|
| [Arduboy2 for SF32LB52](arduboy2-sifli.md) | A reproducible path for evaluating an Arduboy2-style game or interactive demo on SF32LB52. | OpenSiFli Arduboy2-SiFli source, ArduinoCore-Zephyr variant `sf32lb52_devkit_lcd_sf32lb525uc6`, and the documented external display/input/audio path. | Testing local game interaction, graphics, input, audio, and the limits of a portable Arduino-oriented application layer. |
| [ZMK Keyboard Firmware on SF32](zmk-sf32.md) | A reproducible SF32LB52 split-keyboard baseline with matrix scanning, layers, USB HID, BLE split/host links, settings, and ZMK Studio. | OpenSiFli/zmk, the SF32LB52-DevKit-LCD ZMK board variant, and the `urchin_sf32lb52_left/right` shields with pinned manifest dependencies. | Evaluating ZMK-based wireless keyboards, macro pads, or custom HID products while measuring the maturity of the downstream SF32 port. |

</div>

## What Every Project Includes { #what-every-project-includes }

Each μForge project should document its target outcome, intended reader, supported hardware and software versions, prerequisites, source repository, milestone-based build steps, validation criteria, measurements, and product-adaptation handoff. A project is a starting point for engineering work, not a substitute for production validation of the final hardware, service integration, security, privacy, or regulatory requirements.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document. Verify technical claims against SiFli's official documentation before relying on them.
