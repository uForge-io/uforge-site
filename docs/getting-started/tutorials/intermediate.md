---
icon: lucide/trending-up
description: "Connected-subsystem SF32 tutorials: I2C sensors, a basic LVGL screen, BLE peripheral service, local audio playback, filesystem storage, and coexistence testing."
tags:
    - Tutorials
---

# Connected Subsystems { #intermediate-tutorials }

These tutorials assume you are comfortable with [First Peripherals](beginner.md): GPIO, the shell, ADC/PWM basics, and the `rt_device_find()` driver pattern. This track moves from single peripherals to middleware and combined workflows: I2C sensors, graphical UI, BLE services, audio playback, persistent storage, and simple coexistence testing.

The goal is not just to make each subsystem work once. The goal is to learn how SF32 firmware is usually assembled: start from a close SDK example, verify the hardware path, connect it to the RT-Thread device or middleware layer, then test it together with the rest of the product.

Use this series when the individual peripherals already work and the integration risks begin: shared memory, timing, power, board-specific wiring, and interactions between middleware. Each exercise is meant to leave you with a testable subsystem boundary, not only a screen-shot demo.

## Before You Start { #before-you-start }

The C listings below are excerpts, not complete source files. Add the headers, declarations, error handling, and resource cleanup required by your project and SDK version.

Example paths and supported boards can vary by SDK release. Before building, check each example's current Supported Platforms list and board-specific hardware and configuration requirements; support for one exercise does not imply support for the others.

<div align="center"><em>Table: Before You Start</em></div>

<div align="center" markdown>

| Requirement | Why It Matters |
|:------------|:---------------|
| Working shell | You need `list_thread`, `list_device`, logs, and quick inspection. |
| Known-good GPIO input/output | Many middleware demos still need buttons, LEDs, or interrupts. |
| Board schematic | I2C pins, display pins, audio path, and storage layout are board-specific. |
| One clean baseline | Keep a known-good build before combining features. |
| A way to measure current | Connected-subsystem features can change idle power even when they appear to work. |

</div>

## Read a Sensor over I2C { #read-a-sensor-over-i2c }

**Goal:** talk to a real I2C peripheral instead of a single GPIO pin.

**Time:** 30-45 minutes

**Start from:** `example/hal/i2c/master` or `example/rt_device/i2c/eeprom`

```c
struct rt_i2c_bus_device *bus = (struct rt_i2c_bus_device *)rt_device_find("i2c1");
struct rt_i2c_msg msgs[2] = { /* write register address, then read result */ };
rt_i2c_transfer(bus, msgs, 2);
```

The `i2c1` name is illustrative. Use the I2C device name registered by your board, and confirm that `rt_device_find()` succeeds before using the bus.

1. Confirm the sensor's I2C address, register map, supply voltage, and required pull-ups from its datasheet.
2. Confirm which `i2cX` bus and pins your board uses.
3. Adapt the I2C EEPROM or master example to communicate with the sensor. If it exposes a device-ID register, read that first; otherwise, start with a register whose expected behavior is known.
4. Decode one real measurement and print it through the shell.
5. If the sensor has an interrupt or data-ready pin, wire it to the GPIO interrupt pattern from First Peripherals, exercise 2.
6. Replace fixed polling with event-driven reads where possible.

**Success criteria:** the firmware reads a known register as expected (a device ID, when available), decodes a plausible sensor value, and does not block the system if the device is absent.

**Troubleshooting:** if reads return all `0xff`, all `0x00`, or time out, check address width, 7-bit vs. 8-bit address notation, pull-ups, power sequencing, and whether another peripheral owns the same pins.

**What you learned:** multi-byte I2C transactions and how to combine an interrupt-driven GPIO pin with a bus peripheral.

## Build a Basic LVGL Screen { #build-a-basic-lvgl-screen }

**Goal:** get a real UI element on the display instead of raw framebuffer writes.

**Time:** 45-60 minutes

**Start from:** `example/multimedia/lvgl/lvgl_v8_examples`

```c
lv_obj_t *label = lv_label_create(lv_scr_act());
lv_label_set_text(label, "Hello, SF32!");
lv_obj_align(label, LV_ALIGN_CENTER, 0, 0);
```

1. Bring up the display driver and confirm solid-color fills before debugging LVGL widgets.
2. Create a label and a button widget.
3. Wire the button callback to change the label text.
4. Add one small animation and watch CPU usage or frame timing through shell tools.
5. Read the [Graphics Overview](../../learn/graphics/overview.md) sections on buffer strategy, partial refresh, and ePicasso before scaling up.

**Success criteria:** the screen initializes consistently after reset; configured touch or button input, when available, changes UI state; and simple animation does not starve shell or Bluetooth activity.

**Troubleshooting:** separate panel issues from LVGL issues. If solid fills fail, check power, reset, init sequence, pixel format, and byte order before touching LVGL code.

**What you learned:** LVGL's object/event model and the display bring-up sequence that every graphics-heavy project starts from.

## Advertise and Connect as a BLE Peripheral { #advertise-and-connect-as-a-ble-peripheral }

**Goal:** connect a phone or BLE central to your board through a working GATT service.

**Time:** 45-60 minutes

**Start from:** `example/ble/peripheral`

1. Start from the plain peripheral example and verify advertising in a BLE scanner app.
2. Connect from the phone and confirm the device remains stable for several minutes.
3. To send sensor data, configure a suitable characteristic in the example's GATT service and update it with a real measurement, such as the ADC reading from First Peripherals, exercise 4, or the I2C sensor reading from this track, exercise 1.
4. Configure the characteristic properties you need. If you use notifications, enable them and confirm the phone receives value changes.
5. Test disconnect/reconnect and reset the board while a connection is active.
6. Read the [Bluetooth Overview](../../learn/bluetooth/overview.md#gatt-services-and-the-sibles-framework) before designing a custom service.

**Success criteria:** the device advertises, connects, exposes the configured GATT service, exchanges data using the selected characteristic properties, and returns to a clean state after disconnect/reconnect.

**Troubleshooting:** test stale bonds, phone-side forget-device, device reboot while connected, and connection parameter changes. Many BLE bugs appear only after the first happy-path connection.

**What you learned:** the advertising -> connection -> GATT notification flow used by most BLE products.

## Play Local Audio from Storage { #play-local-audio-from-storage }

**Goal:** play back an audio file instead of a synthesized tone.

**Time:** 45-60 minutes

**Start from:** `example/multimedia/audio/local_music`

The current documentation lists `sf32lb52-lchspi-ulp` as the supported platform for `example/multimedia/audio/mp3_sd_player`. Do not assume it supports your board; check its [supported platform and hardware requirements](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) before using it.

1. Load a small WAV or MP3 file onto the storage medium expected by the example.
2. Build and flash the example.
3. Confirm playback starts, audio is clean, and the board does not reset when playback begins.
4. Wire playback start/stop to the button handler from First Peripherals, exercise 2.
5. Watch for underruns while shell logging or display updates are active.
6. Read the [Audio Overview](../../learn/audio/overview.md#playback-and-recording-basics) before changing sample rate, format, or buffer size.

**Success criteria:** playback can start, stop, and restart repeatedly without pops, underruns, or leaked active-power state.

**Troubleshooting:** if sound is distorted, check sample rate, bit depth, output path, codec configuration, file format, buffer size, and whether storage reads are starving the decoder.

**What you learned:** how the SDK's audio middleware, buffered playback, and file decoding fit together.

## Store and Retrieve Persistent Data { #store-and-retrieve-data-with-a-filesystem }

**Goal:** persist data across reboots instead of losing it on every reset.

**Time:** 30-45 minutes

**Start from:** `example/storage/littlefs` or `example/storage/flashdb`

Use LittleFS for file-oriented data. FlashDB is an embedded database with key-value (KVDB) and time-series (TSDB) modes; its storage backend and supported boards depend on the example configuration. See the official [LittleFS NOR](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/littlefs/nor/README.html) and [FlashDB](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/storage/flashdb/README.html) example documentation before choosing a target.

The POSIX calls below illustrate access to a mounted filesystem; they are not FlashDB API calls.

```c
int fd = open("/data/log.txt", O_WRONLY | O_CREAT | O_APPEND, 0666);
write(fd, buf, len);
close(fd);
```

1. Choose a filesystem such as LittleFS for file-like logs. For structured settings or time-stamped records, evaluate FlashDB's KVDB or TSDB mode and select the storage backend that matches your board and memory device.
2. Confirm the partition and mount path used by the example.
3. Write one small log entry or setting.
4. Power-cycle the board and confirm the data is still present.
5. Log sensor readings from Tutorial 1 periodically.
6. Add a simple retention policy so logs do not grow forever.

**Success criteria:** data survives reboot and the firmware handles missing, full, or freshly formatted storage gracefully.

**Troubleshooting:** check partition layout, mount path, Flash erase/write errors, file close behavior, and whether writes are happening too frequently for the storage endurance target.

**What you learned:** when to use a filesystem versus an embedded database, and how to preserve product state across resets.

## Combine Two Subsystems on Purpose { #combine-two-subsystems-on-purpose }

**Goal:** run two subsystems at once and learn how they affect each other.

**Time:** 1 hour

**Start from:** whichever two of Tutorials 1-5 are most relevant to your product

1. Pick two subsystems your product will actually need together, such as BLE plus an I2C sensor, or LVGL plus audio playback.
2. Verify each one independently first.
3. Combine them with minimal changes.
4. Exercise both at the same time: BLE notification during I2C read, UI animation during audio playback, storage write during sensor update.
5. Watch CPU usage, logs, memory, and user-visible behavior.
6. Compare what you see with the [Bluetooth Overview](../../learn/bluetooth/overview.md#coexistence-with-other-workloads), [Graphics Overview](../../learn/graphics/overview.md#graphics-validation-matrix), and [Low-Power Overview](../../learn/low-power/overview.md#what-drains-power-on-an-sf32-product).

**Success criteria:** both subsystems keep working under simultaneous activity, and idle current returns to the expected level after the test stops.

**Troubleshooting:** look for long blocking calls, excessive logging, timer storms, storage writes in latency-sensitive paths, and shared-buffer cache mistakes.

**What you learned:** subsystems that work in isolation can still interact badly once they share CPU time, memory bandwidth, interrupts, and power policy.

## Connected-Subsystem Integration Checklist { #intermediate-integration-checklist }

- [ ] Every tutorial starts from a known-good SDK example.
- [ ] Each hardware path is verified first: a known sensor register or value, panel fill, BLE advertising, audio output, or storage mount.
- [ ] The feature survives reset and disconnect/reconnect where applicable.
- [ ] Error paths are tested: missing sensor, missing file, disconnected phone, full storage.
- [ ] At least one combined-load test has been run.
- [ ] Idle behavior has been checked after each feature stops.

## Where to Go Next { #where-to-go-next }

[Product Validation](advanced.md) covers low-power tuning, OTA updates, custom display and driver bring-up, multi-connection Bluetooth, and production debugging. That track turns working demos into product-ready firmware.
