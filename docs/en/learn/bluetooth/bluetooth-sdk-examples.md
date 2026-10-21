---
icon: lucide/bluetooth-connected
title: "Bluetooth SDK Examples"
description: "Choose the right SiFli-SDK Bluetooth example for BLE services, Classic Bluetooth profiles, phone integration, OTA, data transfer, or LE Audio broadcast."
tags:
  - Bluetooth
  - Examples
---

# Bluetooth SDK Examples { #bluetooth-sdk-examples }

The SiFli-SDK Bluetooth examples are focused starting points for a profile, role, or radio workflow; they are not drop-in product firmware. Start with the project that covers the product's most demanding technical requirement, get the unmodified example working on the target board, and then add one product requirement at a time.

This page organizes the [Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html), [BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html), and [LE Audio broadcast](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html) examples listed in the SF32LB58x documentation by engineering task. The `sf32lb58x` path identifies the documentation section; it does not promise that every example supports every SF32LB58x board or another SF32 family. The `latest` URL is rolling. For the SDK release or commit you plan to use, check the matching project's **Supported Platforms** section and follow only its listed board names and build instructions. If the target board or SDK revision is not explicitly established, mark compatibility as **unverified** rather than inferring it from the URL, a neighboring example, or a similarly named board. Even when a page says “all platforms,” verify the example against the actual SDK revision and board configuration before product work. The project page is also the reference for `menuconfig` settings, test equipment, and limitations.

## Start with the Right Bluetooth Path { #start-with-the-right-bluetooth-path }

<div align="center"><em>Table: Bluetooth SDK Example Selection</em></div>

<div align="center" markdown>

| Product need | Start with | Validate before product integration |
|:-------------|:-----------|:-------------------------------------|
| A custom BLE service or companion-app link | [BLE Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | Advertising, connection, the service interface and behavior, reconnection, and phone-side validation |
| The device must act as both a phone peripheral and a sensor central | [BLE Central and Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | Simultaneous GAP roles and GATT client/server ownership |
| Reliable BLE data transfer | [BLE Throughput](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) or [BLE File Transfer](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | The required payload flow, connection settings, and recovery behavior |
| Bluetooth firmware update | [Peripheral with OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) or [Central and Peripheral with Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Update roles, recovery after an interrupted update, partitions, and rollback plan |
| Classic Bluetooth serial or phone-tethered networking | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) or [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | The serial profile or phone-provided network path, peer compatibility, and reconnection behavior |
| Host-to-controller HCI transport over UART for BT/BLE | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | The host/controller boundary, UART transport, and target controller and board configuration |
| Classic Bluetooth audio or calls | [Music Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Music Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html), or [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | Audio route, clocking, buffering, phone interoperability, and power budget |
| LE Audio broadcast | [BAP Broadcast Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) or [BAP Broadcast Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Broadcast role, audio pipeline, test receiver or transmitter, and timing margin |

</div>

## Bring Up an Example as Evidence { #bring-up-an-example-as-evidence }

Before changing the project, record the exact SDK version, board name, configuration, peer device or app, radio settings, and expected log. Then work through this sequence:

1. Build and flash the unmodified example using the exact board name and instructions listed for the matching SDK release. If the release-to-documentation match or board support is not established, treat compatibility as unverified before adapting the example.
2. Prove the defining over-the-air behavior: discover, connect, transfer, stream, or receive as appropriate.
3. Repeat the test after reset, disconnect, reconnect, and power-cycle conditions.
4. Add one product-specific service, user-flow, audio route, or power policy at a time.
5. Retest under the product's combined workload, including display, sensors, storage, audio, and low-power transitions where applicable.

A working example demonstrates only the workflow it covers. It does not establish that the product's security policy, radio range, latency, power consumption, or interoperability is ready for release.

## BLE Examples { #ble-examples }

Use BLE examples for companion-app links, interoperable GATT services, beacons, data transfer, and BLE-based OTA. Select a role-oriented example first, then add a profile example only when the product needs that standardized service.

<div align="center"><em>Table: BLE SDK Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering task | Official examples | Use these projects to establish |
|:-----------------|:------------------|:--------------------------------|
| Foundation roles and service access | [Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html), [Central and Peripheral](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html), [Multi-Connection](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | Advertising, scanning, connection ownership, and the correct central/peripheral split |
| Phone integration | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html), [ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html), [Dual-Core ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Apple media or notification integration and the required phone-side pairing flow |
| Standard GATT profiles | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html), [CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html), [CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html), [DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html), [HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html), [CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | The service role, GATT characteristic definitions, and peer interoperability of a standard profile |
| Input and intercom | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html), [BLE Talkback](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | The interaction model before product UI or voice behavior is added |
| Pairing and reconnect behavior | [BLE Pair](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | Bonding, identity handling, and the product's re-pairing path |
| Advertising and discovery | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html), [Periodic Advertising](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html), [Periodic Advertising Sync](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | The required broadcast or synchronization behavior without assuming a GATT connection |
| Data transfer and OTA | [File Transfer](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html), [Throughput](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html), [Peripheral with OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html), [Central and Peripheral with Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | Payload, link parameters, update roles, interruption recovery, and end-to-end validation |

</div>

Do not treat a throughput result as a product data rate. It depends on the selected PHY, connection settings, peer behavior, RF environment, host activity, and payload pattern. Likewise, an ANCS or AMS example is a phone-integration baseline, not a guarantee for every iOS release or user permission state.

## Classic Bluetooth Examples { #classic-bluetooth-examples }

Classic Bluetooth projects are relevant to products that need BR/EDR profiles, audio, serial-style transport, or IP networking through a phone. A successful development-board demonstration is only a starting point; validate interoperability with the product's actual peer devices and workload.

<div align="center"><em>Table: Classic Bluetooth SDK Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering task | Official examples | Use these projects to establish |
|:-----------------|:------------------|:--------------------------------|
| Host/controller transport or Classic Bluetooth serial profile | [HCI over UART (BT/BLE)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html), [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | The host/controller boundary and UART transport for HCI, or the serial profile behavior for SPP |
| Audio streaming and media control | [A2DP Multi-Connection](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html), [A2DP Sharing](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html), [AVRCP Cover Art](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html), [Music Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html), [Music Sink with Relay](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html), [Music Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | The intended source/sink topology, audio route, media-control path, and resource budget |
| Calls and voice links | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html), [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html), [HFP Relay](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | Call topology, audio latency, microphone/speaker path, and phone behavior |
| Phone-provided networking and OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html), [PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | Phone tethering, IP traffic, reconnection, and the OTA delivery path |

</div>

For the PAN networking model and phone-side setup, see [Bluetooth PAN](pan.md). For audio routing, buffer ownership, and system-load validation, see [Audio Overview](../audio/overview.md) and [Audio Server and Buffering](../audio/audio-server-buffering.md).

## LE Audio Broadcast Examples { #le-audio-broadcast-examples }

The `sf32lb58x` documentation path alone does not establish board compatibility; check the **Supported Platforms** section for the exact SDK revision and target board. In the Classic Bluetooth/BAP bridge example, the README title identifies a source, but its path and overview describe a sink. The [implementation at the reviewed SDK revision](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c) handles Classic A2DP and starts a BAP broadcast source; this finding applies to that pinned revision, not automatically to every release served by `latest`. Before building, check the README, source, and board configuration for the exact SDK release or commit you use. Do not infer the example's role or board support from the copied sink description.

The `zbt` projects provide LE Audio broadcast source and sink examples based on the [Basic Audio Profile (BAP)](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/). Treat the source and sink as a paired system test: the broadcast configuration, audio source, receiver, clocking, and RF conditions all matter to the observed result.

<div align="center"><em>Table: LE Audio Broadcast SDK Examples</em></div>

<div align="center" markdown>

| Product direction | Official example | What to establish first |
|:------------------|:-----------------|:------------------------|
| Receive a broadcast audio stream | [BAP Broadcast Sink](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | Receiver behavior, output audio path, and the test broadcast configuration |
| Transmit a broadcast audio stream | [BAP Broadcast Source](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | Source audio pipeline, broadcast configuration, and a known-good receiver |
| Bridge Classic Bluetooth and LE Audio broadcast | [BAP Broadcast Source with Classic Bluetooth](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | The two audio domains, their handoff boundary, and combined timing/resource margin |

</div>

## Product Validation Beyond the Example { #product-validation-beyond-the-example }

<div align="center"><em>Table: Bluetooth Example Product-Adaptation Checks</em></div>

<div align="center" markdown>

| Boundary | Preserve from the source example | Re-validate for the product |
|:---------|:---------------------------------|:----------------------------|
| Radio behavior | The supported board and the example's intended role or profile | Antenna, enclosure, range, RF coexistence, peer devices, and regulatory test plan |
| Connection policy | The baseline advertising, scan, or connection flow | Product latency, power target, reconnect strategy, and state transitions |
| Security | The example's pairing or bonding setup | Authentication requirements, key storage, privacy, factory reset, and user-facing recovery |
| Data and audio | The demonstrated packet or stream flow | Payload format and exchange rules, error recovery, latency, buffering, codec configuration, and memory margin |
| Evidence | Build settings, logs, and expected behavior | Repeatable phone/accessory matrix, power trace, disconnect recovery, and regression test |

</div>

## Related Resources { #related-resources }

- [Bluetooth Overview](overview.md) for product-level role, profile, security, connection-parameter, and coexistence choices.
- [Bluetooth Processor Architecture](processor.md) for host/controller boundaries and power behavior.
- [Bluetooth PAN](pan.md) for phone-tethered IP networking and PAN-based OTA.
- [Audio SDK Examples](../audio/audio-sdk-examples.md) for local capture, codec, and playback examples that complement Bluetooth audio work.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
