---
icon: lucide/puzzle
description: "Step-by-step first run of OpenSiFli's beta ArduinoCore-zephyr on the SF32LB52 DevKit LCD: install the board package, upload a serial test, and Blink."
tags:
    - Getting started
    - Arduino
---

# Arduino { #arduino }

OpenSiFli has a beta Arduino core for SF32 based on Zephyr: [OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr). It publishes the `sifli:sf32lb52` Arduino package, appears in Boards Manager as **SiFli Serial Boards**, and currently targets the **SiFli SF32LB52 DevKit LCD** board.

This is a good path for sketches, quick peripheral checks, demos, and early prototypes. For production firmware, Bluetooth stack tuning, graphics-heavy applications, low-power optimization, or custom board bring-up, use [SiFli-SDK](../sifli/getting-started-sifli-sdk.md).

!!! warning "Beta core"
    OpenSiFli marks this Arduino core as **BETA** and says to use it for testing only. Features, APIs, loader behavior, package contents, and release mechanics may change. Do not treat it as production-ready.

## What You'll Need { #what-youll-need }

**Hardware**

- SiFli SF32LB52 DevKit LCD.
- A USB Type-C data cable connected to the board's USB-to-UART path.
- A computer running Windows, macOS, or Linux.

**Software**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) or [Arduino CLI](https://docs.arduino.cc/arduino-cli/).
- The OpenSiFli `sifli:sf32lb52` Arduino package.
- A serial monitor.

## Install the Board Package { #install-the-board-package }

Open **Arduino IDE > Settings** and add this URL to **Additional Boards Manager URLs**:

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

For users in mainland China, use the mirrored package index:

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

Then open **Boards Manager**, search for **SiFli Serial Boards**, and install the `sifli:sf32lb52` platform.

With Arduino CLI:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

For the China mirror:

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## Select the Board { #select-the-board }

In Arduino IDE, select:

```text
SiFli SF32LB52 DevKit LCD
```

The board FQBN is:

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

The OpenSiFli board definition maps this Arduino board to the Zephyr target `sf32lb52_devkit_lcd` and the variant `sf32lb52_devkit_lcd_sf32lb525uc6`.

## Choose Build Options { #choose-build-options }

The core exposes two important menus:

<div align="center"><em>Build options</em></div>

<div align="center" markdown>

| Menu | Option | Meaning |
|:-----|:-------|:--------|
| **Mode** | `Standard` | Sketch starts automatically after loading. |
| **Mode** | `Debug` | Zephyr shell waits for the `sketch` command. |
| **Link mode** | `Dynamic` | Sketch is packaged for the Zephyr loader. |
| **Link mode** | `Static` | Sketch is linked into a flashable binary. |

</div>

Choose **Dynamic** for the Zephyr-loader workflow. Choose **Static** when you need the sketch linked into a flashable firmware image.

## Put the Board in Serial Download Mode { #put-the-board-in-serial-download-mode }

OpenSiFli documents that first use requires the board to be in serial download mode. Use the boot/reset sequence for the SF32LB52 DevKit LCD, then upload from Arduino IDE or CLI.

The upload tool is `sftool`.

## Upload a Serial Smoke Test { #upload-a-serial-smoke-test }

Start with serial output. It confirms upload, reset, runtime startup, and console routing without depending on LED polarity:

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

Upload from Arduino IDE, or use Arduino CLI:

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

Replace `/dev/cu.usbserial-XXXX` with your board's serial port. On Windows, use the matching `COM` port. On Linux, use the matching `/dev/ttyUSB*` or `/dev/ttyACM*` port.

Open the Serial Monitor at `115200` baud. In **Standard** build mode, the sketch should print one line per second. In **Debug** build mode, open the Zephyr shell and run:

```text
sketch
```

## Upload Blink { #upload-blink }

Check whether the installed SF32LB52 DevKit LCD variant defines `LED_BUILTIN`; do not assume that an Arduino pin number is universal. If the macro is available and the board's onboard LED is mapped by the variant, try Blink after the serial smoke test succeeds. Otherwise, confirm the LED connection and polarity from the board documentation before selecting a GPIO.

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## Troubleshooting { #troubleshooting }

<div align="center"><em>Table: Troubleshooting</em></div>

<div align="center" markdown>

| Symptom | Check |
|:--------|:------|
| Package does not appear | Confirm the package index URL and use Arduino IDE 2.x. |
| Upload fails | Put the board in serial download mode and make sure no serial monitor is holding the port. |
| Sketch does not start | Confirm **Mode**. In `Debug`, run `sketch` from the Zephyr shell. |
| Undefined Zephyr symbol | The core README says missing Zephyr functions may need to be exported in `loader/llext_exports.c` and the loader rebuilt. |
| Zephyr subsystem missing | Enable the required `CONFIG_` option in the board `.conf`, rebuild the loader, and upload it. |
| Out of memory | Zephyr shell and dynamic sketch loading consume RAM; reduce stack usage or switch build mode where appropriate. |

</div>

## Current Scope { #what-sifli-team-should-finish }

The current published package targets the SF32LB52 DevKit LCD and remains beta for testing. Before trying another board or relying on an API, check the [upstream repository](https://github.com/OpenSiFli/ArduinoCore-zephyr) and the release notes for the exact package version; support in Zephyr or SiFli-SDK does not by itself establish support in this Arduino package.
