---
icon: lucide/blocks
description: "Overview of cross-platform SF32 firmware topics: partition tables, OTA/DFU, USB, power management, and logging/crash analysis."
tags:
    - Develop
    - Firmware
---

# Firmware Topics { #firmware-topics }

These topics apply across platforms. They cover the firmware decisions that turn examples into products: boot layout, partitions, OTA, USB, power management, logging, and crash analysis.

Read these pages before changing firmware layout, update behavior, or low-power policy. These mistakes may not prevent a successful build, but they can make a product difficult to recover, debug, or release.

## Topics { #topics }

<div align="center"><em>Table: Topics</em></div>

<div align="center" markdown>

| Topic | Why it matters |
|:------|:---------------|
| [Partition Tables](partition-tables.md) | Defines firmware, filesystem, OTA, and storage layout. |
| [OTA and DFU](ota-dfu.md) | Required for field updates and recovery plans. |
| [USB and CherryUSB](usb-cherryusb.md) | Covers USB device/host capabilities beyond a spec-sheet checkbox. |
| [Power Management](power-management.md) | Turns a working demo into a battery-ready product. |
| [Logging and Crash Analysis](logging-crash-analysis.md) | Makes failures diagnosable. |

</div>

## Practical Rule { #practical-rule }

Before changing boot, OTA, filesystem, or storage behavior, understand the partition table and verify the recovery path. An application fault is inconvenient; an incorrect boot or update layout can make a board difficult to recover.

## Product Readiness Checklist { #product-readiness-checklist }

- [ ] A tested full-device flash command is available outside the normal OTA path.
- [ ] Partition layout is documented in the product repository.
- [ ] OTA/DFU failure behavior has been tested.
- [ ] USB descriptors and VID/PID ownership are documented if USB is used.
- [ ] Low-power modes are measured on real hardware.
- [ ] Crash logs can be decoded from the released binary.
- [ ] Factory and developer flashing procedures are separate.
