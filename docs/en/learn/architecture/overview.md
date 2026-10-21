---
icon: lucide/network
title: "Architecture Overview"
description: "Architecture choices across SF32 processors, memory, Bluetooth, and hardware offload, with device-specific capability checks."
tags:
    - Architecture
    - Learn
---

# Overview { #architecture-overview }

SF32 devices vary in their processor, memory, and dedicated-hardware configurations. Depending on the blocks implemented in the selected device, a design may delegate timing-sensitive or always-on work to dedicated subsystem hardware. Where a suitable accelerator is present, tasks such as graphics processing can also run in hardware. This section organizes the architecture material around five engineering decisions: where application code runs; where code and buffers reside; which work belongs in a wireless controller; when a dedicated task engine is appropriate; and whether the selected device provides the required architecture blocks and interfaces.

## Start with the Workload { #start-with-the-workload }

<div align="center"><em>Table: Choose the Architectural Detail You Need</em></div>

<div align="center" markdown>

| If you need to decide… | Start here | What it clarifies |
|:----------------------|:-----------|:-----------------|
| How application firmware executes and interacts with the memory system | [STAR-MC1](star-mc1.md) | The Cortex-M33-compatible application-processor model, cache behavior, and workload characteristics on relevant SF32 devices. |
| Where code, assets, and large or latency-sensitive buffers should reside | [PSRAM vs. Other Embedded Memory Types](psram-and-memory-types.md) | The trade-offs between PSRAM, SRAM, DRAM, RRAM, and MRAM, including capacity, latency, persistence, bandwidth, and power. |
| Which Bluetooth work stays in the controller and which belongs to product firmware | [Bluetooth Processor](../bluetooth/processor.md) | The boundary between controller timing, host/application responsibilities, RF considerations, and low-power operation. |
| Whether a custom peripheral workflow needs a programmable task engine | [PTM Parallel Task Machine](ptm-parallel-task-machine.md) | The SF32LB57x hardware design guide documents one PTM block with 16 channels for compact, timing-sensitive peripheral work that does not fit a fixed-function peripheral. |
| Whether the selected device actually provides the required architecture and interfaces | [SF32 Family](../../sf32-products/family/SF32_family.md) | Part selection depends on the complete device, including memory, interfaces, wireless, and accelerator availability. |

</div>

## Practical Decision Rule { #practical-decision-rule }

Work through the architecture in this order:

1. Implement product logic, user-interface behavior, application policy, and ordinary drivers in application firmware. Use the STAR-MC1 article to assess processor and cache behavior for the selected device and workload, rather than assuming that a generic benchmark predicts application performance.
2. Decide early where code and data will reside. Put latency-critical code and data in suitable levels of the selected memory hierarchy, and budget external-memory capacity, interface bandwidth, and power before committing to a UI, audio, AI, or connectivity workload.
3. Keep Bluetooth controller timing and product-level policy separate. The Bluetooth processor material helps identify the controller, host, application, RF, and low-power boundaries that must be designed together.
4. For custom peripheral work, first check whether an existing timer, DMA path, UART, SPI, I2C, audio, display, or Bluetooth mechanism already fits. On SF32LB57x, consider PTM only when the requirement is genuinely timing-sensitive or cannot be expressed cleanly through those standard blocks.

For every decision, verify the selected device's documented capabilities before assuming that an architectural block is present or user-programmable. The SF32LB57x hardware guide documents one PTM block with 16 channels; check the target device's documentation before relying on PTM in any design.
