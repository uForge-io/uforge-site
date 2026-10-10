---
icon: lucide/bluetooth
title: "Bluetooth Overview"
description: "Overview of Bluetooth on SF32: BLE vs. dual-mode, GATT service design, connection-parameter tuning, pairing/security, LE Audio, and coexistence."
tags:
  - Bluetooth
---

# Bluetooth Overview { #bluetooth-overview }

## Overview { #overview }

This guide explains how to plan and build Bluetooth connectivity for SF32 products. It focuses on the practical decisions that shape real designs: BLE vs. dual-mode Bluetooth, GATT service design, profile selection, connection-parameter tuning, pairing and security, LE Audio, and coexistence with graphics, audio, and sensor workloads.

SF32 separates application processing from time-critical Bluetooth controller work. The application processor normally handles product logic and UI, while a Bluetooth or low-power processor handles link-layer timing and radio scheduling. Host-stack and GATT-service placement depends on the device and SDK configuration; do not assume that every service runs on the application processor. Check the selected example's core configuration and inter-core communication path.

For a deeper explanation of the underlying subsystem, see [Bluetooth Processor Architecture](processor.md).

Use this page when defining the product's wireless behavior: which roles and profiles it needs, what responsiveness and battery life users expect, and how the phone, radio, and application firmware should share responsibility. It is a design guide, not a substitute for validating interoperability on the intended phones and accessories.

## Define the Product's Connectivity Requirements { #define-the-products-connectivity-requirements }

Before writing any GATT code, pin down what the product actually needs:

- BLE only, or dual-mode Bluetooth (BT Classic + BLE)?
- Bluetooth audio — Classic (A2DP/AVRCP/HFP) or LE Audio?
- Typical connection interval, latency, and throughput requirements.
- How often the application processor needs to wake versus stay asleep.
- Whether the product must interoperate with existing phone-side services (notifications, media control, calls) or only with a custom companion app.
- Expected range, antenna/enclosure constraints, and RF certification targets.
- Whether firmware updates will be delivered over Bluetooth.

These answers guide device selection, the SDK examples to start from, and how long the main CPU can remain asleep.

## Choose BLE, Classic, or Dual-Mode { #choose-ble-classic-or-dual-mode }

### Bluetooth Low Energy (BLE) { #bluetooth-low-energy-ble }

BLE is the right default for most connected wearables and sensors: intermittent, event-driven traffic; low average power; broad phone-OS support. Typical BLE-first products include fitness bands, health sensors, beacons, and configuration/control links to a companion app.

### Classic Bluetooth and Dual-Mode { #classic-bluetooth-and-dual-mode }

Add Classic Bluetooth when the product needs audio streaming (A2DP/AVRCP), hands-free calling (HFP), serial-style data links (SPP), or compatibility with existing Classic profiles. Dual-mode designs are more demanding on radio scheduling and coexistence than BLE-only designs, which is exactly the workload the dedicated Bluetooth processor is built to isolate from the rest of the system.

Not every SF32 family member exposes dual-mode Bluetooth — check the [Bluetooth Processor Architecture](processor.md#device-family-differences) device table before committing to a part number.

## Pick the Right SF32 Device { #pick-the-right-sf32-device }

Choose the device based on the connectivity feature set the product needs, not just clock speed.

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| BLE-only wearable or sensor | SF32LB55x |
| Cost-optimized dual-mode Bluetooth (audio accessory, module) | SF32LB52x |
| Dual-mode Bluetooth with richer display/UI | SF32LB56x |
| Dual-mode Bluetooth with two application cores for graphics and local audio | SF32LB57x |
| Flagship product needing Bluetooth + graphics + AI + large memory | SF32LB58x |
| Bluetooth-controller-only low-power core is sufficient | SF32LB52x |
| Need the low-power core for extra user-programmable always-on tasks | SF32LB55x / SF32LB56x / SF32LB58x |

</div>

Cross-check against display, memory, and AI requirements from the [Graphics Overview](../graphics/overview.md) and [AI Accelerator](../ai/accelerator.md) page if the product needs more than connectivity alone.

## GATT Services and the Sibles Framework { #gatt-services-and-the-sibles-framework }

SiFli-SDK provides **Sibles** for registering and using GATT services. GATT defines the service/characteristic hierarchy and attribute access; GAP defines device discovery, advertising, connection establishment, and the associated roles. They are complementary responsibilities, not a GATT layer built on GAP. Start from the closest SDK example rather than building a GATT database from scratch.

The SDK ships example implementations of several standard and vendor profiles, including:

<div align="center"><em>Table: GATT Services and the Sibles Framework</em></div>

<div align="center" markdown>

| Profile / Service | Typical Use |
|:-------------------|:------------|
| **HRPC** (Heart Rate Profile Collector) | Receive heart-rate measurements from an external sensor as a GATT client; useful in fitness and health-monitoring products. |
| **DISS** (Device Information Service) | Exposing manufacturer, model, and firmware version to the phone. |
| **CTS** (Current Time Service) | Time sync from the phone to the device. |
| **BASC** / **CSCPC** / **CPPC** | Battery, cycling speed/cadence, and cycling power collector profiles for fitness use cases. |
| **HID over GATT** | Keyboards, remotes, and other input-device emulation. |
| **ANCS** (Apple Notification Center Service) client | Reading iOS notifications on the device. |
| **AMS** (Apple Media Service) client | Controlling iOS media playback from the device. |
| Serial transfer profile | Custom bidirectional data transport over BLE, similar in spirit to SPP but over GATT. |

</div>

Reuse the closest example's registration, event handling, and security checks. Keep standard profile UUIDs and behavior when implementing that profile; use a custom service and UUIDs when the product's data model requires them. The goal is to reuse tested plumbing, not to force every companion-app protocol into a standard profile.

## Classic Bluetooth Profiles { #classic-bluetooth-profiles }

For dual-mode products, the SDK provides example profile implementations for:

- **SPP** — simple bidirectional serial data, useful for legacy or non-GATT companion apps.
- **A2DP** (sink and source) — Bluetooth audio streaming.
- **AVRCP** — playback control (play/pause/track/volume) alongside an A2DP link.
- **HFP** — hands-free calling, with HF (hands-free device) and AG (audio gateway) roles. The documented [HFP example](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) implements HF; confirm AG support separately in the selected SDK configuration.
- **PAN** — network-over-Bluetooth, including a PAN-based OTA delivery example.

Audio and legacy profiles tend to have tighter timing and throughput requirements than plain BLE links — budget coexistence testing time accordingly (see [Coexistence](#coexistence-with-other-workloads) below).

## Bluetooth Audio and LE Audio { #bluetooth-audio-and-le-audio }

Two distinct paths exist depending on the audio approach:

- **Classic Bluetooth audio** — A2DP for streaming, AVRCP for transport control, HFP for calls. Mature, broadly compatible with existing phones and headsets.
- **LE Audio** — the [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/) defines procedures for managing both unicast and broadcast LE Audio streams. The SDK includes broadcast source and sink examples, including a mixed broadcast-source-with-Classic-BT example for products that need to bridge both worlds during a transition period.

Either path needs stable timing, buffering, and reliable sample movement, typically using DMA. Select SF32LB52x/56x/58x when their supported Bluetooth audio roles and SDK configurations meet the product requirements; SF32LB55x is BLE-only and cannot provide Classic Bluetooth audio. BLE-only does not mean the device has no local audio capability. For DMA and buffering, see [Audio Overview](../audio/overview.md) and [Bluetooth Processor Architecture](processor.md#bluetooth-audio-and-le-audio).

## Implementation Pattern for Sibles Services { #implementation-pattern-for-sibles-services }

A maintainable BLE service usually follows this pattern:

<div align="center"><em>Table: Implementation Pattern for Sibles Services</em></div>

<div align="center" markdown>

| Step | Firmware Responsibility | Review Point |
|:-----|:------------------------|:-------------|
| Define service contract | UUIDs, characteristics, permissions, notification behavior. | Match companion-app and security requirements. |
| Register service | Use the Sibles/GATT framework path used by the closest SDK example. | Avoid one-off service plumbing. |
| Advertise intentionally | Include only the data needed for discovery and reconnection. | Keep advertising payload small and stable. |
| Gate writes | Validate length, state, permissions, and command sequence. | Prevent malformed app traffic from destabilizing firmware. |
| Notify sparingly | Send changes or batched data, not redundant state spam. | Saves airtime and idle power. |
| Persist state | Store bond keys and product settings safely. Keep each client's CCCD subscription state separately: retain it across connections for bonded clients; reset it to the default for non-bonded clients. | Verify reboot/OTA recovery and handle GATT database changes rather than blindly restoring old handles. |

</div>

This keeps the service definition, phone-app contract, security policy, and power behavior aligned.

## Advertising and Connection Parameters { #advertising-and-connection-parameters }

Connection and advertising parameters are the main levers for trading off latency, throughput, and power.

These connection parameters describe BLE ACL links, not every Bluetooth audio transport. Classic audio uses BR/EDR transport timing; LE Audio uses CIS or BIS isochronous timing. Do not apply a BLE GATT connection interval directly to either audio path. The [Bluetooth SIG LE primer](https://www.bluetooth.com/bluetooth-le-primer/) explains these distinct transports.

<div align="center"><em>Table: Advertising and Connection Parameters</em></div>

<div align="center" markdown>

| Parameter | Effect | Guidance |
|:----------|:-------|:---------|
| Advertising interval | Discovery speed vs. advertising power cost | Use a short interval during a bounded fast-discovery window, then lengthen it while waiting for a connection or reconnection. An established connection does not itself require continued advertising. |
| Connection interval | BLE ACL response time vs. power | Longer intervals can reduce average power on low-traffic links; shorter intervals can improve interactive response. Validate the negotiated settings, throughput, and current on the target phone. |
| Peripheral latency (slave latency in older SDKs) | Lets the peripheral skip connection events | Increases battery life for mostly-idle links; set to 0 when low latency matters more than power. |
| Supervision timeout | Maximum time without receiving a valid Link Layer data packet before declaring the link lost | Too short causes drops on marginal RF links; too long delays reconnection after a real loss. |
| TX power | Range vs. power and coexistence | Start with the lowest setting that meets the range requirement. Measure total energy, retransmissions, and coexistence in the final enclosure: a lower setting is not necessarily more efficient if it causes frequent retransmissions. |

</div>

Beacon-style products (iBeacon-compatible advertising) and periodic-advertising use cases (including periodic-advertising sync, for large-scale or unidirectional broadcasts) are supported via dedicated SDK examples rather than requiring a full GATT connection.

Connection interval, peripheral latency, and supervision timeout must form a valid combination accepted by the controller and peer. A requested update is not proof that it took effect: log the negotiated values and test the actual phone or accessory, including rejected updates and transitions back to idle settings.

## Parameter Presets by Product Phase { #parameter-presets-by-product-phase }

Use different Bluetooth parameters for different phases instead of one compromise setting:

<div align="center"><em>Table: Parameter Presets by Product Phase</em></div>

<div align="center" markdown>

| Phase | Typical Goal | Parameter Direction |
|:------|:-------------|:--------------------|
| First-time discovery | Fast UX | Short advertising interval, clear device identity, limited duration. |
| Reconnection | Lower average power | Longer advertising interval after timeout, directed/filtered behavior where appropriate. |
| Interactive control | Low latency | Shorter connection interval, low or zero peripheral latency. |
| Connected idle | Battery life | Longer connection interval, nonzero peripheral latency, minimal notifications. |
| BLE OTA transfer | Throughput and reliability | Short interval, no peripheral latency, conservative supervision timeout. |
| Audio | Stable timing | Parameters chosen around codec frame timing and buffer depth. |

</div>

Document the transitions between phases. Many “random” Bluetooth power or latency bugs are really products staying in the wrong phase after a state change.

## Pairing, Bonding, and Security { #pairing-bonding-and-security }

BLE can establish a connection without pairing. Pairing establishes security keys; bonding retains them for later connections. Decide which services require encryption, authentication, and persistent bonds rather than requiring bonding for every product by default:

- Decide early whether the product needs Just Works, passkey entry, or numeric comparison pairing. Just Works does not provide man-in-the-middle (MITM) protection: an encrypted connection is not necessarily authenticated. Match the association method to both devices' I/O capabilities and the product's security requirements; see the [Bluetooth GAP security requirements](https://www.bluetooth.com/wp-content/uploads/Files/Specification/HTML/Core-60/out/en/host/generic-access-profile.html).
- For [ANCS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleNotificationCenterServiceSpecification/Specification/Specification.html), phone-side authorization is distinct from link encryption and bonding; handle denied or revoked permission. Both ANCS and [AMS](https://developer.apple.com/library/archive/documentation/CoreBluetooth/Reference/AppleMediaService_Reference/Specification/Specification.html) can appear or disappear during a connection. Monitor Service Changed and rediscover the service rather than assuming pairing makes it permanently available.
- Store bonding information according to the SDK's recommended storage/partition approach so bonds survive reboots and OTA updates.
- Define a re-pairing and "forget device" flow for both the product UI and the phone side.
- Treat security policy (encryption requirements, I/O capability, key size) as a product decision, not a default to leave unexamined.

## Multi-Connection and Roles { #multi-connection-and-roles }

The SDK demonstrates **simultaneous central and peripheral roles** and **multiple concurrent connections**. A product can connect to a phone as a BLE peripheral while acting as a central for a sensor, or serve several companion connections. Verify the role combination and connection limit for the selected device, controller firmware, SDK configuration, buffers, and combined radio workload; an example is not a family-wide capacity guarantee.

If the product needs to push the link close to its throughput ceiling, use the SDK's throughput example as a starting baseline before assuming a limitation is in your application code.

## OTA Firmware Updates over Bluetooth { #ota-firmware-updates-over-bluetooth }

Two common delivery paths exist:

- **DFU-style updates over BLE**, integrated with a peripheral connection (see the `peripheral_with_ota` example for how OTA hooks into a normal peripheral GATT role).
- **PAN OTA**, delivering firmware over a Bluetooth PAN network link for dual-mode products already using PAN for data.

For either path, plan and test partition layout, failure recovery, and rollback before release. For BLE OTA, evaluate a shorter connection interval and zero peripheral latency during transfer, then restore the normal power-saving settings. PAN OTA uses Classic Bluetooth transport; tune its throughput and recovery separately rather than applying BLE connection parameters.

## Coexistence with Other Workloads { #coexistence-with-other-workloads }

Bluetooth on SF32 rarely runs alone — it shares the system with graphics, audio, sensors, and sometimes external Wi-Fi. The dedicated Bluetooth processor absorbs most link-timing risk, but application-level coexistence still needs attention:

- Long critical sections or disabled interrupts on the application processor can delay host-side Bluetooth handling.
- Display and PSRAM traffic compete for memory bandwidth with Bluetooth audio buffers.
- Sensor interrupts that wake the application processor too often can erase the energy savings from letting it sleep while the Bluetooth processor handles the link.

See [Coexistence with Other Workloads](processor.md#coexistence-with-other-workloads) for the system-level view, and test under realistic worst-case combinations (e.g., active display + audio + a busy BLE link), not each subsystem in isolation.

## RF, Interoperability, and Certification Readiness { #rf-interoperability-and-certification-readiness }

Bluetooth firmware should be validated with the same discipline as RF hardware:

- Test with multiple phone vendors, OS versions, and reconnection scenarios, not just one development phone.
- Check behavior after stale bonds, phone-side forget-device, device-side factory reset, and OTA.
- Validate range and packet stability in the final enclosure with battery, display, charger, and user-worn/held positions.
- Keep RF test modes, calibration access, and logs available for production and certification support.
- For profile-heavy products, reserve time for qualification/profile testing; passing a demo app is not the same as being interoperable.

## Debugging Bluetooth Issues { #debugging-bluetooth-issues }

<div align="center"><em>Table: Debugging Bluetooth Issues</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Slow or unreliable discovery | Advertising interval/type, RF layout, antenna matching. |
| Frequent disconnects on otherwise good RF | Supervision timeout too short, connection interval mismatch, coexistence interference. |
| High power despite "idle" connection | Peripheral latency not set, application processor woken too often, unnecessary GATT traffic. |
| Audio glitches or dropouts | DMA/buffer underrun, contention with display/PSRAM traffic, transport-specific timing or configuration problems (BR/EDR for Classic audio; CIS/BIS for LE Audio). |
| Pairing fails intermittently | Bonding storage issues, I/O capability mismatch, stale bond on one side. |
| Good bench range, poor in-enclosure range | Antenna detuning from enclosure/battery/PCB, TX power setting, RF matching network. |

</div>

## Common Mistakes { #common-mistakes }

- Choosing BLE-only hardware after the product already needs Classic audio.
- Reimplementing service plumbing unnecessarily, or forcing a custom data model into an unsuitable standard profile.
- Leaving peripheral latency at 0 for links that spend most of their time idle.
- Ignoring coexistence testing until late integration, when display/audio/Bluetooth are combined for the first time.
- Treating pairing/bonding as an afterthought instead of a designed UX flow.
- Skipping RF bring-up validation (antenna, matching network, crystal accuracy) until final PCB revisions.
- Assuming firmware-only tuning can compensate for a poor RF layout.

## Bring-Up Checklist { #bring-up-checklist }

- [ ] Confirm BLE-only vs. dual-mode requirement and select the matching SF32 device.
- [ ] Identify the closest SDK profile/service examples for the product's use case.
- [ ] Define advertising and connection-parameter targets for discovery, active use, and idle states.
- [ ] Design the pairing, bonding, and "forget device" UX.
- [ ] Validate RF layout, antenna matching, and crystal accuracy on real hardware.
- [ ] Bring up the chosen profiles (GATT services, A2DP/AVRCP/HFP, or LE Audio broadcast) against a real phone or reference host.
- [ ] Test coexistence with display, audio, and sensor workloads under realistic combined load.
- [ ] Plan and test the OTA delivery path if firmware updates will ship over Bluetooth.
- [ ] Profile connected-idle power and confirm the application processor sleeps as expected.

## Key Takeaways { #key-takeaways }

- Decide BLE-only vs. dual-mode Bluetooth first — it drives device selection and most of the SDK path you'll follow.
- Start from the SDK's existing GATT services and Classic profile examples (HRPC, DISS, CTS, HID, ANCS/AMS, SPP, A2DP, AVRCP, HFP, PAN) rather than building from scratch.
- Connection interval, peripheral latency, supervision timeout, and TX power are the main levers for balancing latency, throughput, and power.
- For Bluetooth audio, verify the required Classic or LE Audio role on the selected device and SDK configuration, then design and test buffering and coexistence. A family-wide capability claim is not a substitute for that check.
- Bluetooth is a system-level concern: RF layout, clocks, pairing UX, and coexistence with graphics/audio/sensors matter as much as the GATT code itself.

For a task-oriented map of the current Classic Bluetooth, BLE, and LE Audio SDK projects, see [Bluetooth SDK Examples](bluetooth-sdk-examples.md).

For a practical method to determine the actual Bluetooth power consumption of a target device, see [Bluetooth Low-Power Profiling](bluetooth-low-power-profiling.md).
