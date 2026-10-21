---
icon: lucide/upload-cloud
description: "Use the SiFli-SDK DFU v2 middleware for USB-CDC, BLE, and Bluetooth PAN firmware updates, with the documented application and loader example pairs."
tags:
    - Develop
    - OTA
    - DFU
---

# OTA and DFU { #ota-and-dfu }

DFU v2 is the SiFli-SDK firmware-update middleware for DFU and OTA workflows. It provides three transport channels: USB-CDC, BLE, and Bluetooth PAN. Each channel includes a user application and a matching loader subproject.

Start by selecting the transport that matches the product's update path. Then begin with the corresponding application example; its matching loader is added to the build automatically.

## DFU v2 Structure { #dfu-v2-structure }

<div align="center"><em>Figure: DFU v2 example structure</em></div>

```text
dfu_v2/
├── cdc/       USB-CDC channel
│   ├── app/       User application and PC update tool
│   └── loader/    CDC DFU loader
├── ble/       BLE channel
│   ├── app/       BLE peripheral application
│   └── loader/    BLE DFU loader
└── bt_pan/    Bluetooth PAN channel
    ├── app/       Application that downloads firmware from a server
    └── loader/    PAN DFU loader
```

The application and loader for a given channel are designed to be used together. When you build an application, the SDK uses the `AddDFU_*` logic in `building.py` to include the matching loader as a subproject; do not build that loader separately. In the BLE example, the running application can update non-HCPU images; updating HCPU requires switching to the loader.

## Compatibility and Configuration { #compatibility-and-configuration }

DFU v2 is disabled by default; explicitly enable `USING_DFU_V2` in the middleware configuration. It is available only on HCPU (`BF0_HCPU`) and cannot be enabled alongside the legacy DFU options `BSP_USING_DFU` or `USING_DFU_PAN`. Enabling DFU v2 selects FlashDB (`PKG_USING_FLASHDB`) to support resumable transfers.

USB CDC and BLE are push transports and are mutually exclusive; select one with `DFU_V2_USE_CDC_TRANSPORT` or `DFU_V2_USE_BLE_TRANSPORT`. Bluetooth PAN uses a pull transport; enable `DFU_V2_USE_PAN_TRANSPORT` with device-initiated mode (`DFU_V2_USE_DEVICE_MODE`) and WebClient. Confirm the available options against the target SDK release before settling the product update architecture.

## Choose an Update Channel { #choose-an-update-channel }

<div align="center"><em>Table: DFU v2 transport selection</em></div>

<div align="center" markdown>

| Channel | Documented update path | Typical fit |
| --- | --- | --- |
| USB-CDC | A PC updates the device through a USB virtual serial port. | Production, lab, and wired service workflows. |
| BLE | A BLE peripheral application receives an update. | A mobile app updates a connected product. |
| Bluetooth PAN | The device uses Bluetooth PAN networking to download an update from an HTTP server. | Connected products that retrieve their own update image. |

</div>

## Product Update Review { #product-update-review }

- [ ] The selected transport matches the product's available connection path.
- [ ] The application and matching loader are built and tested as one update flow.
- [ ] The supported target board is confirmed in that example's README.
- [ ] Update interruption, recovery, and factory-service behavior are defined for the product.
- [ ] Firmware-image authenticity and integrity, version policy, and partition capacity are reviewed for the product release.
- [ ] Failed-update logs can be collected without depending on a healthy application.

## Build a DFU v2 Example { #build-a-dfu-v2-example }

From an example's `project/` directory, build with:

```bash
scons --board=<board-name> -j8
```

Each example README lists its supported boards. The DFU v2 middleware configuration itself is under `middleware/dfu_v2` in SiFli-SDK.

## DFU v2 SDK Examples { #dfu-v2-sdk-examples }

<div align="center"><em>Table: Official SiFli-SDK DFU v2 examples for SF32LB58x</em></div>

<div align="center" markdown>

| Channel | User application | Loader subproject |
| --- | --- | --- |
| USB-CDC | [`cdc/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/app/README.html) | [`cdc/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/cdc/loader/README.html) |
| BLE | [`ble/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/app/README.html) | [`ble/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/ble/loader/README.html) |
| Bluetooth PAN | [`bt_pan/app`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/app/README.html) | [`bt_pan/loader`](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/bt_pan/loader/README.html) |

</div>

For the complete source index and current SDK navigation, see [DFU v2 examples in SiFli-SDK](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/dfu_v2/index.html).
