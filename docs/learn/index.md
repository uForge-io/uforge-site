---
icon: lucide/lightbulb
title: "Learn Overview"
description: "Find the SF32 architecture and subsystem guidance you need: graphics, Bluetooth, AI, audio, low power, and the underlying processor architecture."
tags:
    - Learn
---

# Learn Overview { #learn-overview }

Use **Learn** to make subsystem and architecture decisions before they become hard to reverse in firmware or hardware. These pages explain how SF32 building blocks fit together, including when a general-purpose CPU should hand work to a graphics engine, wireless controller, AI accelerator, or other dedicated hardware. They also identify what to validate when graphics, wireless, audio, AI, memory, and power must coexist in one product.

Use [Getting Started](../getting-started/index.md) for the first successful board run, [Tutorials](../getting-started/tutorials/overview.md) for guided exercises, [Develop](../develop/index.md) for software workflows and examples, and the [SF32 Family](../sf32-products/family/SF32_family.md) for part selection and production design.

## Start with Your Design Question { #start-with-your-design-question }

<div align="center"><em>Table: Find the Right Learning Path</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| If you need to… | Start here | Then explore |
|:----------------|:-----------|:-------------|
| Understand the processor, memory, and hardware-offload model | [Architecture Overview](architecture/overview.md) | [STAR-MC1](architecture/star-mc1.md), [PSRAM vs. Other Embedded Memory Types](architecture/psram-and-memory-types.md), and [PTM](architecture/ptm-parallel-task-machine.md) when they are relevant to the selected device. |
| Build a display UI or choose an asset/framebuffer strategy | [Graphics Overview](graphics/overview.md) | [Display Controller](graphics/display-controller.md), [ePicasso](graphics/epicasso-gpu.md), [eZip](graphics/ezip.md), and [TurboPixel](graphics/turbopixel.md) for the relevant display, rendering, and compression decisions. |
| Connect a phone, accessory, or audio device | [Bluetooth Overview](bluetooth/overview.md) | [Bluetooth Processor](bluetooth/processor.md) for controller/application boundaries, then [Bluetooth PAN](bluetooth/pan.md) when the product needs phone-backed IP transport. |
| Add on-device inference | [AI Overview](ai/overview.md) | [AI Accelerator](ai/accelerator.md), then the memory, latency, and power checks required by the model and pipeline. |
| Capture, play, or process sound | [Audio Overview](audio/overview.md) | [Audio Server and Buffering](audio/audio-server-buffering.md), plus Bluetooth guidance when the product streams audio or carries calls wirelessly. |
| Meet a battery-life target | [Low-Power Overview](low-power/overview.md) | [Power Measurement and Validation](low-power/measurement-and-validation.md), then the Bluetooth, graphics, audio, and AI pages for each subsystem's power behavior. |

</div>

## Use the Pages Together { #use-the-pages-together }

Most real products cross several groups. A wearable with a display, BLE, microphone, and battery budget should not treat those as isolated features: display refresh affects memory traffic and active time; Bluetooth scheduling affects wake frequency; audio and AI affect buffers and latency; each decision changes the power budget.

Use the pages as a design loop:

1. Start from the dominant product requirement and the selected device. Confirm that the required display, Bluetooth, AI, audio, memory, and low-power capabilities are actually documented for that device.
2. Define processor responsibilities and memory allocation before application integration. Plan where the working set, framebuffers, model, and audio buffers will reside; place code and data needed by latency-critical tasks in suitable low-latency memory; and use dedicated hardware only where its capabilities and integration constraints fit the product.
3. Follow the overview for the dominant subsystem into its detailed implementation page. Treat cross-links to Bluetooth, memory, and low power as design dependencies, not optional background reading.
4. Validate the complete combination on the intended hardware. Use the workflows in [Develop](../develop/index.md) and the measurements called out in the relevant Learn pages to test functional behavior, latency, bandwidth, RF behavior, and power together.

!!! note "Auto-generated content"
    This page was compiled/drafted without an existing source document dedicated to its content. Verify technical claims against SiFli's official documentation before relying on them.
