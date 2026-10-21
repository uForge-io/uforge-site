---
icon: lucide/radio-tower
description: "How SF32's dedicated Bluetooth processor offloads radio timing and link control from the application CPU, enabling low-power always-connected products."
tags:
  - Bluetooth
---
# Bluetooth Processor { #bluetooth-processor }

## Introduction { #introduction }

The **Bluetooth processor** is the dedicated wireless-control subsystem inside SF32LB devices. It handles timing-sensitive Bluetooth controller functions, including radio scheduling, link control, maintaining low-power connections, and coordination with the main application processor.

This architecture is useful in battery-powered connected products. Instead of waking the main application CPU for every wireless event, SF32 devices use a heterogeneous multi-core design: the application processor handles product logic and user-facing features, while a low-power Bluetooth or always-on processor keeps the wireless link active.

How much application code can run on this low-power processor varies by family. Use the comparison below, and verify task allocation in the SDK for the exact device you plan to use.

Read this page when you need to understand where Bluetooth timing and controller firmware run, whether the low-power core is programmable on the chosen family, or how a connected product can let its application CPU sleep. For service design and product-level Bluetooth integration, see [Bluetooth Overview](overview.md).

## Why a Dedicated Bluetooth Processor Matters { #why-a-dedicated-bluetooth-processor-matters }

Bluetooth is not just a software protocol running occasionally in the background. A connected device must meet strict radio timing requirements for advertising, scanning, connection events, packet exchange, audio transport, encryption, and coexistence with other system activities.

A dedicated Bluetooth subsystem helps by separating those timing-sensitive wireless responsibilities from the main application workload. This brings several practical advantages:

- Lower average power consumption during connected standby.
- More reliable radio timing under UI, graphics, audio, or AI workloads.
- Controller-side radio events can be handled without waking the application CPU for every event.
- Cleaner separation between application firmware and protocol-control firmware.
- Better support for products that must stay connected while the main CPU sleeps.

For wearable and portable products, this separation is especially valuable. The device may spend most of its life in a low-power connected state, waking only for user input, sensor events, display updates, audio activity, or phone synchronization.

These are architectural opportunities, not guaranteed power or wake-up figures. Host placement, interrupts, clock start-up, sleep policy, and application traffic determine the measured result. Measure current and response time with the intended firmware and workload.

## Position in the SF32 System { #position-in-the-sf32-system }

A simplified SF32 wireless architecture looks like this:

<div align="center"><em>Figure: Simplified SF32 Wireless Architecture</em></div>

```text
Application Processor
  - product firmware
  - UI and graphics
  - audio application logic
  - user services
        │
        ▼
Bluetooth Host / System Services
        │
        ▼
Bluetooth Processor / Controller Firmware
  - link-layer timing
  - radio scheduling
  - low-power connection events
  - controller-side protocol work
        │
        ▼
Bluetooth Radio and RF Front End
```

The exact split between host, controller, and application firmware depends on the SDK, stack configuration, and product requirements. Conceptually, however, the main application processor should not be treated as the only CPU involved in Bluetooth operation. The Bluetooth subsystem has its own execution context and is designed to keep wireless behavior deterministic and power efficient.

## Device-Family Differences { #device-family-differences }

The SF32LB family uses different low-power processor configurations across device classes. Always check the datasheet and SDK documentation for the exact device being used.

<div align="center"><em>Table: Device-Family Differences</em></div>

<div align="center" markdown>

| Device Family | Bluetooth Capability | Low-Power Processor Role | Typical Positioning |
|:--------------|:---------------------|:-------------------------|:--------------------|
| **SF32LB52x** | Dual-mode Bluetooth, BT Classic + BLE | LCPU runs the Bluetooth stack; not exposed to application code | Cost-optimized Bluetooth modules, audio accessories, entry wearables, compact HMIs. |
| **SF32LB55x** | BLE | SDK-supported application tasks can run on LCPU | BLE wearables and sensor-rich low-power products. |
| **SF32LB56x** | Dual-mode Bluetooth, BT Classic + BLE | SDK-supported application tasks can run on LCPU | Richer display products, connected HMIs, and wearable devices. |
| **SF32LB57x** | Dual-mode Bluetooth, BT Classic + BLE | LCPU handles Bluetooth and power-sensitive tasks; confirm the supported task allocation | Products combining graphics and local audio on HCPU/ACPU. |
| **SF32LB58x** | Dual-mode Bluetooth, BT Classic + BLE | SDK-supported application tasks can run on LCPU | Flagship products with graphics, audio, AI, and complex connectivity needs. |

</div>

SiFli's [SF32LB52x HAL guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/index.html) states that its LCPU runs the Bluetooth protocol stack and is not open to applications. The [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/hal/index.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/index.html), and [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/hal/index.html) HAL guides describe placing power-sensitive functions such as BLE and sensor processing on LCPU. For **SF32LB57x**, the SDK's [ACPU guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) identifies an HCPU/ACPU/LCPU design and assigns BLE and sensor-related work to LCPU, but does not define the full scope for arbitrary user tasks. Do not generalize LCPU programmability across families. For the exact part, confirm the core configuration in its datasheet, then check that the SDK release and board configuration you plan to use support the intended application task on LCPU. If that combination is not documented, mark the task placement as unverified; also confirm available memory and scheduling limits before committing to it.

The same ACPU guide distinguishes the application-core roles: SF32LB57x uses ACPU for audio and graphics processing, while SF32LB58x assigns it an audio-DSP role. These responsibilities are separate from Bluetooth controller work; verify task placement for the selected board and SDK.

The Bluetooth capability labels in the table summarize family-level documentation; they do not guarantee support for every profile or SDK build. SiFli's [SF32LB52x datasheet](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5.pdf), [SF32LB55x datasheet](https://downloads.sifli.com/silicon/DS0001-SF32LB55x-Datasheet%20V1p6.pdf), [SF32LB56x datasheet](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf), and [SF32LB58x datasheet](https://downloads.sifli.com/silicon/DS0058-SF32LB58x-Datasheet%20V1p6.pdf) specify the listed BLE or dual-mode capabilities. The SDK's [Bluetooth signaling test guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/bt_signaling_test_guide.html) covers BR/EDR and BLE testing and includes SF32LB57x. Confirm profile, feature, and configuration support for the exact part and SDK release.

### Application Programmability and Controller Firmware { #controller-firmware-programmability }

An application-programmable LCPU does not imply access to the Bluetooth controller's source code or the ability to replace its radio stack. Supported firmware updates, patch mechanisms, memory budgets, and scheduling limits remain specific to the device and SDK.

- **Low-power application development.** Move suitable sensor acquisition, lightweight processing, and system-management tasks to LCPU where supported. Budget stack memory, execution time, and communication with HCPU.
- **Controller maintenance and customization.** Use vendor-supported firmware updates and patch mechanisms for the selected device and SDK. A programmable application core does not prove that proprietary controller source or a replacement radio stack is available. Confirm those capabilities separately with SiFli.

Even a controller-only configuration can receive supported vendor updates; it is not necessarily an immutable controller image. Validate controller changes for Bluetooth qualification, interoperability, host/controller compatibility, and OTA recovery. Distinguish recovery rollback from security policy that prevents installing vulnerable older firmware.

## BLE and Dual-Mode Bluetooth { #ble-and-dual-mode-bluetooth }

SF32 devices may support either **Bluetooth Low Energy (BLE)** only or **dual-mode Bluetooth** with both **Bluetooth Classic** and **BLE**, depending on the family member.

### Bluetooth Low Energy { #bluetooth-low-energy }

BLE is optimized for low-power data exchange. It is commonly used for:

- Fitness bands and smartwatches.
- Health sensors and wearables.
- Phone notifications and companion apps.
- Sensor synchronization.
- Beacons and location-aware devices.
- Low-power control and configuration channels.

BLE connections are often intermittent and event-driven, which makes them a natural fit for a low-power Bluetooth processor.

### Bluetooth Classic and Dual-Mode Designs { #bluetooth-classic-and-dual-mode-designs }

Dual-mode Bluetooth adds support for Bluetooth Classic use cases alongside BLE. This is useful for products such as:

- Bluetooth audio accessories.
- Wireless adapters and modules.
- Devices that need compatibility with existing Classic Bluetooth profiles.
- Products that combine BLE control with Classic audio or data behavior.

Dual-mode operation can be more demanding than BLE-only operation because audio and legacy profiles may have tighter throughput, latency, or coexistence requirements. A dedicated Bluetooth subsystem helps keep those requirements isolated from main CPU workload spikes.

## Bluetooth Audio and LE Audio { #bluetooth-audio-and-le-audio }

Bluetooth audio products place additional pressure on system architecture. Audio workloads involve radio timing, buffering, codec processing, clock synchronization, and sometimes user-interface updates at the same time.

A well-designed SF32 Bluetooth audio system typically separates responsibilities:

- The Bluetooth processor handles controller-side radio and link timing.
- The application processor handles product logic, UI, and higher-level audio behavior.
- Audio interfaces such as I2S, PDM, ADC, or DAC move sample data to and from the rest of the system.
- DMA and buffering reduce CPU overhead during continuous audio streaming.

For LE Audio or other modern Bluetooth audio use cases, firmware architecture, stack support, codec selection, memory bandwidth, and power-management policy are all part of the final result. SiFli's SF32LB56x and SF32LB58x datasheets explicitly list BLE Audio support; BLE or dual-mode support alone does not imply LE Audio support. Availability of particular profiles, codecs, and SDK paths still depends on the exact part and SDK release, so verify these before committing to an LE Audio design. The Bluetooth processor provides the timing foundation, but the full product behavior depends on the SDK and application design.

## Low-Power Operation { #low-power-operation }

The Bluetooth subsystem is most valuable when the main application processor can sleep while the wireless link remains active. In connected standby, the system may only need to wake the application processor for meaningful events such as:

- A received notification or command.
- A connection state change.
- A scheduled synchronization task.
- Audio stream start or stop.
- A sensor or user-input event.
- A firmware update or provisioning operation.

This model keeps the main CPU out of the active power state as much as possible. The Bluetooth processor and radio wake for scheduled connection events, perform the required protocol work, and then allow the system to return to a lower-power state.

The actual power profile depends on connection interval, transmit power, advertising behavior, sleep mode, crystal configuration, RF layout, firmware policy, and how often the application processor is woken.

## Host, Controller, and Application Boundaries { #host-controller-and-application-boundaries }

Bluetooth software is often described in two major layers:

<div align="center"><em>Table: Host, Controller, and Application Boundaries</em></div>

<div align="center" markdown>

| Layer | Main Responsibility |
|:------|:--------------------|
| **Host** | Profiles, services, pairing policy, application-facing APIs, and higher-level protocol behavior. |
| **Controller** | Link layer, radio scheduling, packet timing, encryption support, and low-level Bluetooth procedures. |

</div>

In an SF32 system, the controller-side responsibilities are closely tied to the Bluetooth processor and radio subsystem. The host side may run on the application processor, on system firmware, or across SDK-provided components depending on the stack architecture.

For application developers, the most important point is that Bluetooth behavior crosses CPU boundaries. Shared memory, inter-processor messaging, events, and SDK APIs are part of the product architecture. Treat Bluetooth as a subsystem, not just as a library linked into the main application.

## Interaction with the Application Processor { #interaction-with-the-application-processor }

The application processor usually controls product-level behavior:

- Starting and stopping advertising.
- Creating or accepting connections.
- Managing GATT services and characteristics.
- Handling pairing, bonding, and security policy.
- Exchanging application data with a phone or gateway.
- Updating UI state when Bluetooth status changes.
- Coordinating audio streams, sensors, and power modes.

The Bluetooth processor handles the lower-level work needed to maintain the connection. Communication between the two sides is normally abstracted by SDK APIs, events, queues, or inter-processor communication mechanisms.

Good application design avoids waking the main CPU for unnecessary work. Batch events where possible, choose appropriate connection parameters, and avoid high-frequency application polling when event-driven callbacks are available.

## RF and Clock Considerations { #rf-and-clock-considerations }

The Bluetooth processor cannot deliver good wireless performance by itself; the surrounding hardware design matters. RF layout, antenna tuning, clock accuracy, power integrity, and production calibration all affect range, sensitivity, transmit power, and connection stability.

Important hardware considerations include:

- Use the recommended RF matching network and antenna layout.
- Keep the RF trace short, controlled-impedance, and well isolated from noisy signals.
- Follow the crystal requirements in the hardware design guide.
- Provide clean power rails and local decoupling for RF and clock circuits.
- Keep production test access available for RF calibration and firmware download.
- Avoid routing high-speed display, storage, or switching-power traces near sensitive RF paths.

Software and hardware teams should treat Bluetooth performance as a system property. Firmware parameters cannot fully compensate for poor RF layout or unstable clocks.

## Coexistence with Other Workloads { #coexistence-with-other-workloads }

SF32 devices often run Bluetooth alongside graphics, audio, sensors, storage, and sometimes external Wi-Fi. These subsystems share power, clocks, memory bandwidth, pins, and CPU attention.

Common coexistence concerns include:

- Display refresh or PSRAM traffic affecting available memory bandwidth.
- Audio DMA and Bluetooth audio buffers requiring stable timing.
- Sensor interrupts waking the application processor too often.
- External Wi-Fi or other RF sources affecting Bluetooth performance.
- Long critical sections or disabled interrupts delaying host-side Bluetooth handling.

The Bluetooth processor reduces the risk of timing disruption, but it does not remove every shared-resource bottleneck. Products with audio, rich UI, or external wireless connectivity should be tested under realistic worst-case workloads.

## Typical Use Cases { #typical-use-cases }

The Bluetooth processor is central to many SF32 product categories:

- Bluetooth modules and serial adapters.
- Entry-level smartwatches and fitness bands.
- BLE health sensors and wearable devices.
- Bluetooth audio accessories.
- Smart badges and electronic shelf labels.
- Phone-connected dashboards and HMI devices.
- Smart home controls and companion-app products.
- Sensor synchronization and data-logging devices.

The best SF32 family member depends on whether the product needs BLE only, dual-mode Bluetooth, audio features, display capability, memory capacity, and user-programmable low-power processing.

## Practical Design Guidance { #practical-design-guidance }

When designing Bluetooth firmware for SF32, start by defining the product's connectivity behavior:

- Does the product need BLE only or dual-mode Bluetooth?
- Is Bluetooth audio required?
- What connection interval, latency, and throughput are needed?
- How often should the main application processor wake?
- Which events must wake the system from deep sleep or standby?
- Are sensor or UI tasks competing with Bluetooth timing?
- What RF range and transmit-power targets are required?
- How will production firmware download and RF calibration be handled?

A robust design usually combines the Bluetooth processor with careful connection-parameter selection, event-driven application code, low-power state planning, and good RF hardware layout.

## Key Takeaways { #key-takeaways }

- SF32LB devices use a dedicated Bluetooth or low-power processor subsystem to keep wireless operation reliable and power efficient.
- SF32LB52x keeps LCPU dedicated to the Bluetooth controller. SF32LB55x, SF32LB56x, and SF32LB58x support SDK-defined application tasks on LCPU in documented configurations. SF32LB57x uses LCPU for Bluetooth and power-sensitive work, but verify support for each planned user task on the target SDK and board.
- A programmable LCPU supports application tasks within SDK constraints; controller-stack source access and customization require separate confirmation. Use supported vendor updates and validate controller changes.
- BLE is optimized for low-power connected products; dual-mode Bluetooth adds Classic Bluetooth use cases such as audio and legacy profile support.
- The Bluetooth processor helps the main application CPU sleep while connections, advertising, and scheduled radio events continue.
- Good Bluetooth performance depends on both firmware architecture and hardware design, including RF layout, clocks, power, antenna tuning, and calibration.
- Treat Bluetooth as a subsystem with host/controller boundaries, inter-processor communication, power-policy decisions, and shared-resource constraints.
