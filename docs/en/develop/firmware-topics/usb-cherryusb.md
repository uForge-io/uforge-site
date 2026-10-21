---
icon: lucide/usb
description: "Using SF32 USB hardware with CherryUSB: CDC, HID, MSC, audio, and MTP use cases, descriptor checklist, and cross-OS enumeration testing."
tags:
    - Develop
    - USB
---

# USB and CherryUSB { #usb-and-cherryusb }

For SF32 devices and boards with supported USB hardware, SiFli-SDK documentation and examples show CherryUSB integration. Confirm the USB roles and classes supported by the exact chip, board, and SDK release, and treat USB as a full software stack rather than only a hardware feature.

USB work crosses firmware, descriptors, host operating systems, power behavior, and factory tooling. A device that enumerates once on a developer laptop is not finished.

## Use Cases { #use-cases }

- USB CDC serial.
- HID devices.
- MSC storage.
- USB audio microphone/speaker.
- MTP.
- USB host support for CDC, HID, MSC, UVC, and UAC peripherals, where supported by the SDK and board.

## Practical Workflow { #practical-workflow }

1. Confirm the board exposes the required USB connector and power path.
2. Start from the closest SDK USB example.
3. Test enumeration on Windows, macOS, and Linux.
4. Verify suspend/resume and cable reconnect behavior.
5. Record VID/PID, descriptors, and driver expectations.

## What to Test { #what-to-test }

- Connect before power-up; connect and disconnect while the device is running.
- Reset while connected.
- Host sleep/wake.
- Cable disconnect during transfer.
- Windows, macOS, and Linux enumeration.
- Composite device behavior if multiple classes are enabled.
- Tell users that charge-only USB cables do not support data communication.

## Descriptor Checklist { #descriptor-checklist }

- VID/PID ownership is clear.
- Product string is final or versioned.
- Serial number behavior is defined.
- Class/subclass/protocol values match the intended host driver.
- Composite interfaces are stable across firmware updates.

## SDK Examples { #sdk-examples }

The [official SiFli-SDK CherryUSB example index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/index.html) separates USB-device and USB-host work. Start with the example that matches the intended USB role and class, then carry its descriptor, power, and host-compatibility checks into the product implementation.

<div align="center"><em>Table: SiFli-SDK CherryUSB examples for SF32LB58x</em></div>
<div align="center" markdown>

| USB role | Example | Starting point |
| --- | --- | --- |
| Device | [USB microphone](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic/README.html) | USB Audio Class 1 microphone |
| Device | [USB microphone and speaker](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/audio_v1_mic_speaker/README.html) | USB Audio Class 1 duplex audio |
| Device | [CDC ACM](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm/README.html) | USB communications device |
| Device | [CDC ACM UART](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_acm_uart/README.html) | USB-to-UART bridge |
| Device | [CDC + HID + MSC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/cdc_hid_msc/README.html) | Composite USB device |
| Device | [HID mouse](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/hid_mouse/README.html) | USB HID pointing device |
| Device | [MSC with NOR flash](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/nor_flash_disk/README.html) | Mass storage backed by NOR flash |
| Device | [MSC with RAM disk](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk/README.html) | Mass storage backed by RAM |
| Device | [MSC with dual RAM disks](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/ram_disk_dual/README.html) | Two logical units backed by RAM |
| Device | [MSC with SD/eMMC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/msc/sdcard_disk/README.html) | Mass storage backed by SD card or eMMC |
| Device | [MTP with DFS and RAM disk](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/device/mtp/README.html) | Media Transfer Protocol device |
| Host | [CDC ACM host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/cdc_acm_host/README.html) | Communicate with a CDC ACM peripheral |
| Host | [HID host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/hid/README.html) | Attach and read a HID peripheral |
| Host | [MSC host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/msc_host/README.html) | Attach a USB mass-storage peripheral |
| Host | [UVC + UAC host](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/cherryusb/host/uvc_uac_host/README.html) | USB video and audio-class peripherals |

</div>
