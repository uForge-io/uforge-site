---
icon: lucide/list
description: "Complete AT command reference for the SF32LB57 dual-mode Bluetooth AT command module (SIFLI_AT): command framing, system and device, address and identity, operating mode and visibility, pairing and security, serial port and events, connection management, data transfer, and custom GATT commands, plus unsolicited events (URCs) and PDU-format commands."
tags:
  - Bluetooth
---

# AT Command Set { #at-command-reference }

<div align="center"><em>Table: Document Information</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Version | V1.2.1 |
| Date | 2026-07-28 |
| Applicable module | SF32LB57 dual-mode Bluetooth module (SIFLI_AT) |

</div>

This reference documents the external AT command interface for version V1.2.1 of the SF32LB57 dual-mode Bluetooth module (SIFLI_AT). Commands and response strings are shown in monospace; `\r` denotes a carriage return (0x0D) and `\n` denotes a line feed (0x0A). AT commands are transmitted as ASCII text, while binary fields in PDU frames use little-endian byte order.

This is the complete AT interface specification referenced by the Bluetooth AT Command Module page.

<div align="center"><em>Table: Revision History</em></div>

<div align="center" markdown>

| Version | Changes | Date |
|:--------|:--------|:-----|
| V1.2.1 | SF32LB57 V1.2.1: added `AT+CFGRESET`; updated Classic Bluetooth name synchronization at boot, `CLEARLINKKEY`, connection-handle, and PDU documentation; enabled the BQB build configuration. | 2026-07-28 |

</div>

## Overview

The SF32LB57 dual-mode Bluetooth module provides the host with a UART-based AT command interface for both BLE and Classic Bluetooth (BR/EDR). The host uses AT commands to configure device parameters, manage connections, send and receive data, and receive unsolicited status indications from the module.

### Default Settings

<div align="center"><em>Table: Default Settings</em></div>

<div align="center" markdown>

| Item | Default Value |
|:-----|:----------------|
| Device name | `SIFLI_AT` |
| Serial baud rate | 460800 bps |
| Command/pass-through mode | Pass-through mode |
| Bluetooth operating mode | Dual-mode (BLE+BT) |
| Event reporting | Normal reporting |
| Name with MAC suffix | Off |
| Class of Device (COD) | `000000` |
| BLE MTU ceiling | 247 |
| Multi-connection master switch | On (1) |
| Pass-through idle-disconnect time | 0 (off) |
| GATT auto-load on power-up | On |
| BLE random address | Off (uses public address) |
| Bluetooth address | Auto-generated from chip UID |

</div>

## Command Format

### Syntax Definition

AT commands are transmitted as ASCII text, terminated by a carriage return `\r` (0x0D). The command prefix is `AT+` (AT-format commands) or `AT>` (PDU-format commands). On SF32LB57, the AT port is USART1, using 8N1 framing with no hardware flow control, at a default baud rate of 460800 bps. A single AT frame is limited to 512 bytes.

### AT-Format Commands

<div align="center"><em>Table: AT-Format Command Forms</em></div>

<div align="center" markdown>

| Form | Command | Description |
|:-----|:--------|:-------------|
| Query | `AT+<CMD>?\r` | Read a parameter or status |
| Set | `AT+<CMD>=<param>[,<param>...]\r` | Write a parameter |
| Execute | `AT+<CMD>\r` | Trigger an action |

</div>

<div align="center"><em>Table: AT-Format Responses</em></div>

<div align="center" markdown>

| Result | Response String |
|:-------|:------------------|
| Success | `\r\nOK\r\n` |
| Failure | `\r\nERROR\r\n` or `\r\nFALSE\r\n` |
| Query return value | `\r\n+<CMD>:<value>\r\n\r\nOK\r\n` |

</div>

### PDU-Format Command Framing

PDU commands transfer binary payloads while the module is in command mode. Unless otherwise noted, numeric fields within a frame are little-endian, and `data` is raw binary data.

**Command (host → module)**

```
'A' 'T' '>' <Opcode(2 bytes)> <Total Length(2 bytes)> [Body] '\r'
```

<div align="center"><em>Table: PDU Command Frame Structure</em></div>

<div align="center" markdown>

| Element | Description |
|:--------|:-------------|
| `AT>` | Command prefix, 3-byte ASCII |
| Opcode | 2-byte little-endian operation code. `0x0101`, `0x0102` |
| Total Length | Total byte count of Body, 2-byte little-endian |
| Body | Payload; structure depends on Opcode |
| `\r` | 1-byte command terminator |

</div>

**Report (module → host)**

```
'\r' '\n' '<' <Opcode(2 bytes)> <Total Length(2 bytes)> [Data] '\r' '\n'
```

## Commands and Responses

The commands below are grouped by capability, in the same categories used by the index table on the Bluetooth AT Command Module page.

### System and Device

#### Get Firmware Version

<div align="center"><em>Table: Get Firmware Version</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GFWVER?\r` |
| Response | Success: `\r\n+GFWVER:SIFLI_AT_<version>_<build date>\r\n\r\nOK\r\n`; any set form: `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Query only. The return value always begins with `SIFLI_AT_`, followed by the version number and build date. |

</div>

#### Query Device Name

<div align="center"><em>Table: Query Device Name</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+NAME?\r` |
| Response | `\r\n+NAME:<device name>\r\n\r\nOK\r\n` |
| Parameters | None |
| Notes | Returns the currently configured device name (without the MAC suffix — the MAC suffix only affects the name shown in advertising). |

</div>

#### Set Device Name

<div align="center"><em>Table: Set Device Name</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+NAME=<device name>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | Device name: a string 1–29 bytes long; empty or over 29 bytes returns `ERROR`. Default `SIFLI_AT`. |
| Notes | Updates the device-name configuration and synchronizes it to the local name and BLE scan-response name. `MACNAME` controls the final advertised name. |

</div>

#### Query MAC Name Suffix Switch

<div align="center"><em>Table: Query MAC Name Suffix Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+MACNAME?\r` |
| Response | `\r\n+MACNAME:<value>\r\n\r\nOK\r\n` |
| Parameters | None |
| Notes | Returns the current suffix switch state: 0 = off, 1 = on. |

</div>

#### Set MAC Name Suffix Switch

<div align="center"><em>Table: Set MAC Name Suffix Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+MACNAME=<value>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | Value: 0 = displayed name is the device name as-is; 1 = appends a `-XXXX` suffix to the device name (XXXX is the uppercase hex of the last two bytes of the local BD_ADDR). Range 0–1. Default 0. |
| Notes | Updates the configuration. When on, if the device name plus suffix exceeds the 29-byte display-name limit, the device name portion is truncated to fit the 5-byte suffix. |

</div>

#### Query IEEE 1284 Device ID

<div align="center"><em>Table: Query IEEE 1284 Device ID</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+1284ID?\r` |
| Response | `\r\n+1284ID:<ID string>\r\n\r\nOK\r\n` |
| Parameters | None |
| Notes | Returns the currently configured IEEE 1284 device ID string; empty if not configured. |

</div>

#### Set IEEE 1284 Device ID

<div align="center"><em>Table: Set IEEE 1284 Device ID</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+1284ID=<ID string>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | ID string: the IEEE 1284 device ID string; length must be under the storage buffer's capacity, over-length returns `ERROR`. Default is an empty string. |
| Notes | Updates the configuration. |

</div>

#### Reset Device

<div align="center"><em>Table: Reset Device</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+RESET\r` |
| Response | Success: `\r\nOK\r\n`; query form (`AT+RESET?\r`): `\r\nERROR\r\n` |
| Parameters | None |
| Notes | On receiving the command, the module saves the current AT configuration, replies `OK`, then stops advertising, drops connections, and performs a soft reset. This command does not itself modify the configuration. |

</div>

#### Factory Reset

<div align="center"><em>Table: Factory Reset</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+FACTORYRESET\r` |
| Response | Success: `\r\nOK\r\n`; query form (`AT+FACTORYRESET?\r`): `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Restores AT configuration to defaults, clears custom GATT service configuration, BLE bonding, Classic Bluetooth (BR/EDR) pairing bonds, and the BLE static random address, then replies `OK` and resets. The host should wait for `IM_READY` after the reset. |

</div>

#### Configuration Reset

<div align="center"><em>Table: Configuration Reset</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+CFGRESET\r` |
| Response | Success: `\r\nOK\r\n`; query form (`AT+CFGRESET?\r`): `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Restores AT configuration and saved custom GATT configuration, then replies `OK` and resets; pairing records and the current BLE address are retained. |

</div>

#### Enter OTA Upgrade Mode

<div align="center"><em>Table: Enter OTA Upgrade Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+OTA\r` |
| Response | Success: `\r\nOK\r\n` (then enters DFU mode and resets — no further response); query form (`AT+OTA?\r`): `\r\nERROR\r\n` |
| Parameters | None |
| Notes | First saves the current AT configuration and replies `OK`, then writes a DFU flag and resets into UART DFU upgrade mode. |

</div>

#### Query Frequency Offset Calibration

<div align="center"><em>Table: Query Frequency Offset Calibration</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+TRIM?\r` |
| Response | `\r\n+TRIM:<freq_off>\r\n\r\nOK\r\n` |
| Parameters | `freq_off`: the currently recorded frequency-offset calibration value, in Hz. |
| Notes | Returns the echo value recorded in the AT configuration; the value actually in effect is stored in the `FACTORY_CFG_ID_CRYSTAL` partition. |

</div>

#### Set Frequency Offset Calibration

<div align="center"><em>Table: Set Frequency Offset Calibration</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+TRIM=<freq_off>\r` |
| Response | Success: `\r\nOK\r\n`; out-of-range value or calibration interface failure: `\r\nERROR\r\n` |
| Parameters | `freq_off`: frequency-offset calibration value, in Hz, range -120000 to 120000, default 0. A value of 0 performs a calibration reset (restores the hardware/factory-line original value); a non-zero value sets that value directly. |
| Notes | Setting the value updates the HXT capacitor-bank register and writes the result to the `FACTORY_CFG_ID_CRYSTAL` partition. After a successful calibration, the recorded value in the AT configuration is updated and marked for saving. |

</div>

#### Enter DUT Test Mode

<div align="center"><em>Table: Enter DUT Test Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+DUT\r` |
| Response | Success: `\r\nOK\r\n`; query form (`AT+DUT?\r`): `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Sets the BR/EDR Classic Bluetooth DUT-enable bit and replies `OK`, then waits for test equipment to trigger signaling test over the air via `LMP_test_control`. The AT UART (USART1) remains available. Entering DUT mode is irreversible — it can only be exited by resetting. |

</div>

### Address and Identity

#### Query Bluetooth Address

<div align="center"><em>Table: Query Bluetooth Address</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+LBDADDR?\r` |
| Response | Success: `\r\n+LBDADDR:<addr>\r\n\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `addr`: returns the current public Bluetooth address, 12 hex characters (uppercase, no separators), most-significant byte first, e.g. `001583112233`. |
| Notes | Returns the public address read from firmware; returns `ERROR` on read failure. |

</div>

#### Set Bluetooth Address

<div align="center"><em>Table: Set Bluetooth Address</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+LBDADDR=<addr>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `addr`: the Bluetooth address to set, must be 12 hex characters (no separators), most-significant byte first, e.g. `001583112233`. Length must be exactly 12 hex characters. |
| Notes | The address is written to configuration and saved. Takes effect after a reset. The factory default is all-zero, meaning the address is auto-generated from the chip UID. |

</div>

#### Query BLE Address

<div align="center"><em>Table: Query BLE Address</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BLEADDR?\r` |
| Response | Success: `\r\n+BLEADDR:<addr>\r\n\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `addr`: returns the address currently used by BLE, 12 hex characters (uppercase, no separators), most-significant byte first. |
| Notes | If a BLE-specific static random address has been generated via `AT+RANDOMADDR=1`, that static random address is returned; otherwise the same public address as the Bluetooth address is returned. Returns `ERROR` on read failure. |

</div>

#### Set BLE Address

<div align="center"><em>Table: Set BLE Address</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BLEADDR=<addr>\r` |
| Response | `\r\nERROR\r\n` |
| Parameters | None |
| Notes | This command does not accept directly setting the BLE address — calling it always returns `ERROR`. A BLE static random address is generated via `AT+RANDOMADDR=1`. |

</div>

#### Query BLE Random Address Switch

<div align="center"><em>Table: Query BLE Random Address Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+RANDOMADDR?\r` |
| Response | `\r\n+RANDOMADDR:<n>\r\n\r\nOK\r\n` |
| Parameters | `n`: current switch state, 0 = BLE uses the public address, 1 = BLE uses a static random address. |
| Notes | None |

</div>

#### Set BLE Random Address Switch

<div align="center"><em>Table: Set BLE Random Address Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+RANDOMADDR=<n>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `n`: 0 or 1. 1 = enable a BLE static random address, derived from the public address (setting the top two bits of the public address's most-significant byte to 1 — e.g. public `001583112233` derives BLE `C01583112233`); 0 = BLE reverts to the public address. Other values or extra characters return `ERROR`. Default 0. |
| Notes | The switch state updates the configuration. If set to 1 and reading the public address fails, the switch falls back to 0 and returns `ERROR`. The address change is written to NVDS and takes effect after a reset. Running `AT+RANDOMADDR=1` again re-derives the same random address from the (unchanged) public address. |

</div>

#### Query Class of Device

<div align="center"><em>Table: Query Class of Device</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+CLASS?\r` |
| Response | Success: `\r\n+CLASS:<cod>\r\n\r\nOK\r\n` (`<cod>` is 6 uppercase hex digits) |
| Parameters | `cod`: the current Class of Device, always output as 6 hex digits (low 24 bits, `%06X` format, zero-padded) |
| Notes | Returns the current Class of Device value. |

</div>

#### Set Class of Device

<div align="center"><em>Table: Set Class of Device</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+CLASS=<cod>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `cod`: Class of Device, a hex string (parsed with `%X`). Range 0–FFFFFF (24 bits). Default `000000`. |
| Notes | Sets the Class of Device and updates the configuration; only the low 24 bits are kept when parsing. |

</div>

### Operating Mode and Visibility

#### Query Discoverable State

<div align="center"><em>Table: Query Discoverable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+DISCOVERABLE?\r` |
| Response | Success: `\r\n+DISCOVERABLE:<state>\r\n\r\nOK\r\n` |
| Parameters | `state`: current discoverable state. 0 = not discoverable, 1 = discoverable, 2 = partially discoverable (mixed state). The meaning depends on the operating mode: in BLE mode (`BTMODE=1`), it reflects the BLE advertising setting — 1 = on, 0 = off; in BT mode (`BTMODE=2`), it reflects inquiry scan and page scan — 1 when both are on, 0 when both are off, and 2 otherwise; in dual-mode (`BTMODE=0`), it is 1 when BLE advertising, inquiry scan, and page scan are all on, 0 when all are off, and 2 otherwise. |
| Notes | Only queries the current discoverable state — does not change device state. |

</div>

#### Set Discoverable State

<div align="center"><em>Table: Set Discoverable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+DISCOVERABLE=<mode>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `mode`: 0 = turn discoverability off, 1 = turn discoverability on. |
| Notes | Acts according to the current operating mode: in BLE mode (`BTMODE=1`), turns BLE advertising on or off; in BT mode (`BTMODE=2`), turns inquiry scan and page scan on or off; in dual-mode (`BTMODE=0`), controls BLE advertising, inquiry scan, and page scan together. |

</div>

#### Query GATT Advertising State

<div align="center"><em>Table: Query GATT Advertising State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTDISCOVER?\r` |
| Response | Success: `\r\n+GATTDISCOVER:<state>\r\n\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `state`: the actual over-the-air BLE advertising state. 0 = not advertising, 1 = advertising. |
| Notes | Returns the actual on-air BLE advertising state. Unavailable when the operating mode is BT-only (`BTMODE=2`) — returns `ERROR`. |

</div>

#### Set GATT Advertising

<div align="center"><em>Table: Set GATT Advertising</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTDISCOVER=<value>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `value`: 0 = stop BLE advertising, 1 = start BLE advertising. |
| Notes | Directly controls starting and stopping BLE advertising. Unavailable when the operating mode is BT-only (`BTMODE=2`). |

</div>

#### Query SPP Discoverable State

<div align="center"><em>Table: Query SPP Discoverable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+SPPDISCOVER?\r` |
| Response | `\r\n+SPPDISCOVER:<state>\r\n\r\nOK\r\n` |
| Parameters | `<state>`: current inquiry-scan state, which controls discoverability. 0 = off, 1 = on. |
| Notes | Returns `ERROR` when `AT+BTMODE` is 1 (BLE-only). |

</div>

#### Set SPP Discoverable State

<div align="center"><em>Table: Set SPP Discoverable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+SPPDISCOVER=<state>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `<state>`: inquiry-scan switch, which controls discoverability. 0 = off, 1 = on. |
| Notes | Returns `ERROR` when `AT+BTMODE` is 1 (BLE-only). Changes only the inquiry-scan bit and leaves the page-scan bit unchanged. |

</div>

#### Query SPP Connectable State

<div align="center"><em>Table: Query SPP Connectable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+SPPCONNECT?\r` |
| Response | `\r\n+SPPCONNECT:<state>\r\n\r\nOK\r\n` |
| Parameters | `<state>`: current page-scan state, which controls connectability. 0 = off, 1 = on. |
| Notes | Returns `ERROR` when `AT+BTMODE` is 1 (BLE-only). |

</div>

#### Set SPP Connectable State

<div align="center"><em>Table: Set SPP Connectable State</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+SPPCONNECT=<state>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `<state>`: page-scan switch, which controls connectability. 0 = off, 1 = on. |
| Notes | Returns `ERROR` when `AT+BTMODE` is 1 (BLE-only). Changes only the page-scan bit and leaves the inquiry-scan bit unchanged. |

</div>

#### Query Bluetooth Operating Mode

<div align="center"><em>Table: Query Bluetooth Operating Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BTMODE?\r` |
| Response | `\r\n+BTMODE:<mode>\r\n\r\nOK\r\n` |
| Parameters | `mode`: current Bluetooth operating mode. 0 = dual-mode (BLE+BT), 1 = BLE only, 2 = BT only. |
| Notes | None |

</div>

#### Set Bluetooth Operating Mode

<div align="center"><em>Table: Set Bluetooth Operating Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BTMODE=<mode>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `mode`: Bluetooth operating mode. 0 = dual-mode (BLE+BT), 1 = BLE only, 2 = BT only; range 0–2. Default 0 (dual-mode). |
| Notes | Setting updates the configuration and takes effect after a reset. |

</div>

#### Query Command Mode

<div align="center"><em>Table: Query Command Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+COMMAND?\r` |
| Response | `\r\n+COMMAND:<mode>\r\n\r\nOK\r\n` |
| Parameters | `mode`: current operating mode. 0 = pass-through mode, 1 = command mode. |
| Notes | None |

</div>

#### Set Command Mode

<div align="center"><em>Table: Set Command Mode</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+COMMAND=<mode>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `mode`: operating mode. 0 = pass-through mode, 1 = command mode. The module starts in pass-through mode after power-up. |
| Notes | Takes effect immediately, not persisted — returns to pass-through mode on reset. In pass-through mode, data received on the serial port is forwarded as-is to the connected peer; in command mode, serial data is parsed as AT commands. |

</div>

### Pairing and Security

#### Clear Pairing Information

<div align="center"><em>Table: Clear Pairing Information</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+CLEARLINKKEY\r` |
| Response | Success: `\r\nOK\r\n`; query form `AT+CLEARLINKKEY?\r`: `\r\nERROR\r\n` |
| Parameters | No parameters. |
| Notes | Clears BLE bonding information and the Classic Bluetooth link key. After success, the device resets; AT configuration such as device name, baud rate, and COD is retained. The host should wait for `IM_READY` after the reset. The query form is not supported. |

</div>

### Serial Port and Events

#### Query Serial Baud Rate

<div align="center"><em>Table: Query Serial Baud Rate</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BAUD?\r` |
| Response | `\r\n+BAUD:<baud_rate>\r\n\r\nOK\r\n` |
| Parameters | `baud_rate`: the currently configured baud rate, in bps. |
| Notes | After setting the baud rate the device resets; the new baud rate takes effect after the reset. |

</div>

#### Set Serial Baud Rate

<div align="center"><em>Table: Set Serial Baud Rate</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BAUD=<baud_rate>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `baud_rate`: serial baud rate, in bps. Supported values: 38400, 57600, 115200, 230400, 460800, 921600, 1000000. Default 460800. |
| Notes | Setting updates the configuration. |

</div>

#### Query Event Reporting Switch

<div align="center"><em>Table: Query Event Reporting Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+EVT?\r` |
| Response | `\r\n+EVT:<evt_silent>\r\n\r\nOK\r\n` |
| Parameters | `evt_silent`: current event-reporting state. 0 = normal reporting, 1 = fully silent. |
| Notes | None |

</div>

#### Set Event Reporting Switch

<div align="center"><em>Table: Set Event Reporting Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+EVT=<evt_silent>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `evt_silent`: event-reporting switch. 0 = normally report `IM_CONN`/`IM_DISCONN`/`IM_READY` and other events, 1 = silence all of them (do not report). Default 0 (normal reporting). |
| Notes | Setting updates the configuration. When set to 1, connection-established, disconnect, and ready events are not output over the serial port. |

</div>

#### Query Pass-Through Idle Disconnect Time

<div align="center"><em>Table: Query Pass-Through Idle Disconnect Time</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+IDLE?\r` |
| Response | `\r\n+IDLE:<idle_ms>\r\n\r\nOK\r\n` |
| Parameters | `idle_ms`: current idle-disconnect timeout, in milliseconds. |
| Notes | None |

</div>

#### Set Pass-Through Idle Disconnect Time

<div align="center"><em>Table: Set Pass-Through Idle Disconnect Time</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+IDLE=<idle_ms>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `idle_ms`: pass-through idle-disconnect timeout, in milliseconds, range 0–65535; over 65535 returns `ERROR`. 0 disables the idle-disconnect feature. Default 0 (off). |
| Notes | Setting updates the configuration. Only takes effect in pass-through mode: while in pass-through mode, if more than `idle_ms` milliseconds have elapsed since the serial port last received data, all connections (if any) are disconnected; `idle_ms` = 0 never triggers this. |

</div>

### Connection Management

#### Query Multi-Connection Switch

<div align="center"><em>Table: Query Multi-Connection Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+MULTICONN?\r` |
| Response | `\r\n+MULTICONN:<n>\r\n\r\nOK\r\n` |
| Parameters | `<n>`: multi-connection master switch state. 0 = off (single connection globally); 1 = on (concurrent, up to each transport's limit). |
| Notes | None |

</div>

#### Set Multi-Connection Switch

<div align="center"><em>Table: Set Multi-Connection Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+MULTICONN=<n>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `<n>`: 0 = disable multi-connection; 1 = enable multi-connection. Value is 0 or 1. Default 1. |
| Notes | Setting updates the configuration. When multi-connection is off, concurrent connection capability is restricted; when on, it operates according to the `AT+BLEMULTICONN` and `AT+BTMULTICONN` settings. |

</div>

#### Query Maximum BLE Concurrent Connections

<div align="center"><em>Table: Query Maximum BLE Concurrent Connections</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BLEMULTICONN?\r` |
| Response | Success: `\r\n+BLEMULTICONN:<n>\r\n\r\nOK\r\n`; when multi-connection is off: `\r\nERROR\r\n` |
| Parameters | `<n>`: the currently configured maximum number of concurrent BLE connections, decimal. |
| Notes | Can only be queried when the multi-connection switch is on (`AT+MULTICONN=1`); returns `ERROR` when off. |

</div>

#### Set Maximum BLE Concurrent Connections

<div align="center"><em>Table: Set Maximum BLE Concurrent Connections</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BLEMULTICONN=<n>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `<n>`: maximum number of concurrent BLE connections, decimal, range 1–6. Default 3. |
| Notes | Can only be set when the multi-connection switch is on (`AT+MULTICONN=1`). Setting updates the configuration; once the connection count hits the limit, advertising stops (no longer connectable), and automatically resumes once a link drops back below the limit. |

</div>

#### Query Maximum Classic Bluetooth Concurrent Connections

<div align="center"><em>Table: Query Maximum Classic Bluetooth Concurrent Connections</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BTMULTICONN?\r` |
| Response | Success: `\r\n+BTMULTICONN:<n>\r\n\r\nOK\r\n`; when multi-connection is off: `\r\nERROR\r\n` |
| Parameters | `<n>`: the currently configured maximum number of concurrent Classic Bluetooth (BR/EDR) connections, decimal. |
| Notes | Can only be queried when the multi-connection switch is on (`AT+MULTICONN=1`); returns `ERROR` when off. |

</div>

#### Set Maximum Classic Bluetooth Concurrent Connections

<div align="center"><em>Table: Set Maximum Classic Bluetooth Concurrent Connections</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+BTMULTICONN=<n>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `<n>`: maximum number of concurrent Classic Bluetooth connections, decimal, range 1–7. Default 7. |
| Notes | Can only be set when the multi-connection switch is on (`AT+MULTICONN=1`). Setting updates the configuration. When the connection count reaches the limit, the module stops page scanning and resumes it automatically after the count falls below the limit. |

</div>

#### Disconnect

<div align="center"><em>Table: Disconnect</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | Disconnect one: `AT+DISCONN=<conn_hdl>\r`; disconnect all: `AT+DISCONN\r` |
| Response | Success: `\r\nOK\r\n`; failure or not found: `\r\nERROR\r\n` |
| Parameters | `<conn_hdl>`: connection handle, hex. BLE connection handles are 1-based external handles (matching what `AT+CONNLIST` returns); BT connections use their ACL handle. `<conn_hdl>` = 0 is treated as invalid input and returns `ERROR`. |
| Notes | With no parameter (or an empty parameter), all active links (BLE and BR/EDR) are disconnected and `OK` is returned. With a parameter, the handle is looked up: first matched against the BLE external handle (internal handle = `<conn_hdl>` - 1); if not found, matched against the raw BT ACL handle; if no matching connection is found, returns `ERROR`. The query form `AT+DISCONN?` returns `ERROR`. |

</div>

#### Query Connection List

<div align="center"><em>Table: Query Connection List</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+CONNLIST?\r` or `AT+CONNLIST\r` |
| Response | Each active connection is output as one line: `\r\n+CONNLIST:<conn_hdl>,<type>,<addr>,<extra>\r\n`; followed by `\r\nOK\r\n` after all lines; `\r\nOK\r\n` alone if there are no active connections; a non-empty parameter: `\r\nERROR\r\n` |
| Parameters | Output fields: `<conn_hdl>` — connection handle, 4 hex digits, BLE uses a 1-based external handle; `<type>` — connection type, BLE or BT; `<addr>` — the peer's Bluetooth address, 12 hex digits (most-significant byte first); `<extra>` — the current MTU for BLE connections, or the service channel for BT connections, decimal. |
| Notes | The set form returns `ERROR` when a non-empty parameter is supplied. The module checks every connection slot and outputs each active connection. |

</div>

### Data Transfer

#### Query BLE MTU

<div align="center"><em>Table: Query BLE MTU</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GMTU?\r` |
| Response | Success: `\r\n+GMTU:<mtu>\r\n\r\nOK\r\n` |
| Parameters | `mtu`: the currently configured BLE MTU ceiling, decimal. |
| Notes | None |

</div>

#### Set BLE MTU

<div align="center"><em>Table: Set BLE MTU</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GMTU=<mtu>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nFALSE\r\n` |
| Parameters | `mtu`: BLE MTU ceiling, decimal, range 23–1024; out of range returns `FALSE`. Default 247. |
| Notes | This value sets the ceiling used during MTU negotiation. |

</div>

#### Send SPP Data

<div align="center"><em>Table: Send SPP Data</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+SPPSEND=<conn_hdl>,<data>\r` or `AT+SPPSEND=,<data>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `conn_hdl`: target BT connection handle, hex. May be omitted or set to 0, in which case the currently first active BT connection is used. `data`: the data to send, a hex string, each two characters representing one byte; cannot be empty and the character count must be even. The actual data length carried in an ASCII AT frame is also bounded by the single-AT-frame limit. |
| Notes | `conn_hdl` and `data` are separated by a comma; the comma must still be present even when `conn_hdl` is omitted. The query form is not supported. |

</div>

### Custom GATT

#### Query Custom GATT Service List

<div align="center"><em>Table: Query Custom GATT Service List</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSRV?\r` |
| Response | For each configured service, returns one line `\r\n+GATTSRV:<idx>,<char_count>,<state>\r\n`, followed by `\r\nOK\r\n`. If no services are configured, only `\r\nOK\r\n` is returned |
| Parameters | `idx`: service slot number, 0–5. `char_count`: the number of characteristics configured for that service. `state`: `REG` means registered with the protocol stack, `CFG` means configured in RAM only and not yet registered |
| Notes | Only lists service slots currently in use |

</div>

#### Create Custom GATT Service

<div align="center"><em>Table: Create Custom GATT Service</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSRV=<idx>,<uuid>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `idx`: service slot number, 0–5. `uuid`: the service UUID, entered as a hex string with the MSB first — 4 characters for a 16-bit UUID, 32 characters for a 128-bit UUID |
| Notes | `idx` must be a single digit immediately followed by a comma. UUID length must be exactly 4 or 32 characters — any other length returns `ERROR`. If the slot is already registered with the protocol stack it cannot be reconfigured, and creation returns `ERROR`. Creating a service clears any previous configuration in that slot |

</div>

#### Delete Custom GATT Service

<div align="center"><em>Table: Delete Custom GATT Service</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSRV=<idx>,DEL\r` |
| Response | `\r\nOK\r\n` |
| Parameters | `idx`: service slot number, 0–5 |
| Notes | Clears that slot's configuration in RAM. A service already registered with the protocol stack cannot be revoked at runtime — this command only clears the RAM configuration |

</div>

#### Query Custom GATT Characteristic List

<div align="center"><em>Table: Query Custom GATT Characteristic List</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTCHAR?<svc>\r` |
| Response | For each characteristic of that service, returns one line `\r\n+GATTCHAR:<svc>,<chr>,prop=0x<prop>,len=<max_len>\r\n`, followed by `\r\nOK\r\n`; if the service does not exist: `\r\nERROR\r\n` |
| Parameters | `svc`: service slot number, 0–5. `chr`: characteristic index. `prop`: the characteristic's property bits, in hex. `max_len`: maximum characteristic value length |
| Notes | None |

</div>

#### Add Custom GATT Characteristic

<div align="center"><em>Table: Add Custom GATT Characteristic</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTCHAR=<svc>,<chr>,<uuid>,<prop>,<len>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `svc`: service slot number, 0–5. `chr`: characteristic index, 0–7. `uuid`: characteristic UUID, MSB first, 4 characters for 16-bit, 32 characters for 128-bit. `prop`: a property string composed of the characters R (read), W (write with response), w (write without response), N (notify), I (indicate). `len`: maximum characteristic value length, 1–512 |
| Notes | All five parameters are required — omitting any returns `ERROR`. UUID length must be exactly 4 or 32 characters. `prop` must contain at least one recognized property character; if none is recognized, returns `ERROR` — unrecognized characters within `prop` are simply ignored. `len` of 0 or over 512 returns `ERROR`. The parent service must already be created and not yet registered with the protocol stack |

</div>

#### Start (Register) Custom GATT Services

<div align="center"><em>Table: Start (Register) Custom GATT Services</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSTART\r` |
| Response | `\r\n+GATTSTART:<count>\r\n` followed by `\r\nOK\r\n`; query form `AT+GATTSTART?\r`: `\r\nERROR\r\n` |
| Parameters | `count`: the number of services successfully registered with the protocol stack in this call |
| Notes | Registers with the protocol stack every service that is in use, not yet registered, and has at least one characteristic. Once registered, a service can no longer be revoked or reconfigured at runtime. The query form is not supported |

</div>

#### Send GATT Characteristic Data (Notify/Indicate)

<div align="center"><em>Table: Send GATT Characteristic Data (Notify/Indicate)</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSEND=<svc>,<chr>,<conn_hdl>,<hex>\r`; omitting the connection handle: `AT+GATTSEND=<svc>,<chr>,,<hex>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n`; query form `AT+GATTSEND?\r`: `\r\nERROR\r\n` |
| Parameters | `svc`: service slot number. `chr`: characteristic index. `conn_hdl`: BLE connection handle, hex, 1-based, may be omitted. `hex`: the data to send, a hex string with an even character count; the actual data length carried in an ASCII AT frame is also bounded by the single-AT-frame limit. |
| Notes | When `conn_hdl` is omitted, the current first BLE connection is used. The target service must already be registered and the characteristic index must be valid; if the characteristic's properties include Indicate (I), an indication is used, otherwise a notification. |

</div>

#### Save Custom GATT Configuration to Flash

<div align="center"><em>Table: Save Custom GATT Configuration to Flash</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTSTORE\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n`; query form `AT+GATTSTORE?\r`: `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Persists the current configuration of all services and characteristics to flash. Only configuration data is saved — runtime information such as registration state is not saved. Returns `ERROR` if KVDB is not ready or the write fails. The query form is not supported |

</div>

#### Clear Custom GATT Configuration in Flash

<div align="center"><em>Table: Clear Custom GATT Configuration in Flash</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTCLEAR\r` |
| Response | Success: `\r\nOK\r\n`; query form `AT+GATTCLEAR?\r`: `\r\nERROR\r\n` |
| Parameters | None |
| Notes | Deletes the GATT configuration saved in flash. Does not affect the current configuration in RAM. The query form is not supported. |

</div>

#### Query GATT Auto-Load-on-Power-Up Switch

<div align="center"><em>Table: Query GATT Auto-Load-on-Power-Up Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTAUTOSTART?\r` |
| Response | `\r\n+GATTAUTOSTART:<v>\r\n\r\nOK\r\n` |
| Parameters | `v`: current switch value, 0 = off, 1 = on. Default: 1. |
| Notes | None |

</div>

#### Set GATT Auto-Load-on-Power-Up Switch

<div align="center"><em>Table: Set GATT Auto-Load-on-Power-Up Switch</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+GATTAUTOSTART=<v>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `v`: switch value. 0 = off, 1 = on. Default: 1. |
| Notes | Setting updates the configuration. When enabled, the device automatically loads the saved GATT service configuration on power-up. |

</div>

## Unsolicited Events (URC)

The following are status indications the module reports on its own — the host does not send a command to receive them. Reporting is controlled by the event-reporting switch (`AT+EVT`); nothing is reported while silent mode is on.

### IM_READY Ready Indication

<div align="center"><em>Table: IM_READY Ready Indication</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | None (reported by the firmware on its own, not sent by the user) |
| Response | Report string: `\r\nIM_READY\r\n` |
| Parameters | None |
| Notes | Reported once when the module finishes initialization and enters an available state; also reported again once all connections have dropped and the connection count returns to zero. Whether it is reported is controlled by `AT+EVT`; setting `AT+EVT=1` suppresses it. |

</div>

### IM_CONN Connection Indication

<div align="center"><em>Table: IM_CONN Connection Indication</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | None (reported by the firmware on its own when a connection is established) |
| Response | Command mode: `\r\nIM_CONN <hdl>,<addr>,<mtu>\r\n`; pass-through mode: `\r\nIM_CONN\r\n` |
| Parameters | `hdl`: connection handle, 4 hex digits (uppercase, fixed 4 digits, zero-padded). BLE connections display a 1-based handle (the internal handle plus 1); other types display the raw value. `addr`: the peer's address, 12 hex digits, MSB first. `mtu`: the current connection's MTU, decimal. |
| Notes | In command mode, each connection established is reported once, carrying the handle, peer address, and MTU. In pass-through mode, this is reported only when the connection count is 1 (the first connection), and carries no parameters. Whether it is reported is controlled by `AT+EVT`; setting `AT+EVT=1` suppresses it. |

</div>

### IM_DISCONN Disconnect Indication

<div align="center"><em>Table: IM_DISCONN Disconnect Indication</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | None (reported by the firmware on its own when a connection is dropped) |
| Response | Command mode: `\r\nIM_DISCONN:<hdl>\r\n` |
| Parameters | `hdl`: the disconnected connection's handle, 4 hex digits (uppercase, fixed 4 digits, zero-padded). BLE connections display a 1-based handle (the raw handle plus 1); others display the raw value. |
| Notes | Only carries a handle and is reported in command mode; not reported in pass-through mode. Regardless of mode, once all connections have dropped and the connection count returns to zero, `\r\nIM_READY\r\n` is additionally reported. Whether it is reported is controlled by `AT+EVT`; setting `AT+EVT=1` suppresses it. |

</div>

## PDU-Format Commands

### PDU Data Report (opcode 0x0101)

<div align="center"><em>Table: PDU Data Report (module → host, opcode 0x0101)</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | None (reported by the firmware on its own in command mode) |
| Response | `\r\n< + opcode(2-byte little-endian) + len(2-byte little-endian) + body + \r\n` |
| Parameters | `opcode` is fixed at `0x0101`; `body` = `conn_hdl` (2-byte little-endian) + `data`. BLE connection handles use the 1-based external value; SPP connections use the raw ACL handle. |
| Notes | In command mode, when data is written to a custom BLE characteristic or received over Classic Bluetooth SPP, the module reports it to the host in the format above; in pass-through mode, the data is output directly. |

</div>

### PDU Mode Send Data (Auto-Select Notify Characteristic, opcode 0x0101)

<div align="center"><em>Table: PDU Mode Send Data (Auto-Select Notify Characteristic, opcode 0x0101)</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | A binary frame (not a text AT line): `AT>` + opcode(2-byte little-endian) + len(2-byte little-endian) + body + `\r`. Here opcode = `0x0101` (byte sequence 01 01); len is the byte count of body; body = `conn_hdl`(2-byte little-endian) + `data`. `data` is the payload to send. |
| Response | No text response string. The firmware forwards `data` to the peer according to the connection type, without replying `OK`/`ERROR`. |
| Parameters | `opcode`: fixed `0x0101`. `len`: body length, range 2–508 (frames under 2 or over `AT_RX_BUF_SIZE`-4 are dropped; `AT_RX_BUF_SIZE` = 512). `conn_hdl`: target connection handle; 1-based (external display value) for BLE connections, raw ACL handle for SPP connections. `data`: payload bytes, length = len-2, may be 0. |
| Notes | `conn_hdl` resolution order: first matched against the BLE 1-based handle (i.e., `conn_hdl`-1 hits a BLE slot); if not found, matched against the raw value for an SPP slot; if no connection is found, the frame is dropped. For a BLE target, the firmware iterates the custom GATT services and automatically selects the first characteristic with a Notify or Indicate property to send on; if no such characteristic exists, nothing is sent. For an SPP (BR/EDR) target, `data` is sent over the SPP channel. The frame must be immediately followed by `\r`; if missing, the current frame is dropped. If no new bytes arrive within the PDU timeout threshold between frames, the PDU receive state is reset. |

</div>

### PDU Mode Send Data (Specify Service and Characteristic, opcode 0x0102)

<div align="center"><em>Table: PDU Mode Send Data (Specify Service and Characteristic, opcode 0x0102)</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | A binary frame (not a text AT line): `AT>` + opcode(2-byte little-endian) + len(2-byte little-endian) + body + `\r`. Here opcode = `0x0102` (byte sequence 02 01); len is the byte count of body; body = `conn_hdl`(2-byte little-endian) + `svc_idx`(1 byte) + `char_idx`(1 byte) + `data`. |
| Response | No text response string. The firmware sends `data` to the peer via the specified service/characteristic, without replying `OK`/`ERROR`. |
| Parameters | `opcode`: fixed `0x0102`. `len`: body length, range 4–508 (the receive layer's general floor is 2, but this opcode requires the body to be at least 4 bytes, covering `svc_idx`+`char_idx`) — otherwise dropped. `conn_hdl`: target BLE connection handle, 1-based (external display value). `svc_idx`: the custom GATT service index. `char_idx`: the characteristic index within that service. `data`: payload bytes, length = len-4, may be 0. |
| Notes | BLE connections only; if the resolved connection is of SPP type, the frame is dropped. `svc_idx` must correspond to a registered custom service, and `char_idx` must be less than that service's characteristic count, otherwise dropped. The specified characteristic must have a Notify or Indicate property, otherwise dropped. `conn_hdl` resolution follows the same rule as `0x0101` (1-based BLE handle first, then the raw value). The frame must be immediately followed by `\r`. |

</div>

### PDU Mode Disconnect

<div align="center"><em>Table: PDU Mode Disconnect</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | `AT+DISCONN\r` (no parameter) or `AT+DISCONN=<conn_hdl>\r` |
| Response | Success: `\r\nOK\r\n`; failure: `\r\nERROR\r\n` |
| Parameters | `conn_hdl`: the connection handle to disconnect, hex. BLE connections are 1-based (external display value); the value must not be 0 (0 is treated as invalid input and returns `ERROR`). SPP connections use the raw ACL handle. |
| Notes | With no parameter, all current connections are disconnected and `OK` is returned. With a parameter, resolution order: first matched against the BLE 1-based handle (`conn_hdl`-1 hits a BLE slot); if not found, matched against the raw value for an SPP slot; if no connection is found, returns `ERROR`. For BLE connections, disconnection is initiated with reason code `0x13`; for SPP connections, disconnection is initiated by the peer address. The query form `AT+DISCONN?` returns `ERROR`. |

</div>

### PDU Connection Status Indication (IM_CONN / IM_DISCONN)

<div align="center"><em>Table: PDU Connection Status Indication (IM_CONN / IM_DISCONN)</em></div>

<div align="center" markdown>

| Item | Content |
|:-----|:--------|
| Command | Reported by the module on its own — no command needed from the host. `IM_CONN` is reported when a connection is established, `IM_DISCONN` when one is dropped. |
| Response | Command mode, connection established: `\r\nIM_CONN <hdl>,<mac>,<mtu>\r\n`, where `<hdl>` is a 4-digit hex handle, `<mac>` is a 12-digit hex address (most-significant byte first), and `<mtu>` is a decimal MTU. Command mode, connection dropped: `\r\nIM_DISCONN:<hdl>\r\n` (`<hdl>` is 4 hex digits). Pass-through mode reports `\r\nIM_CONN\r\n` (no parameters) only when the first connection is established, and does not report `IM_DISCONN` on disconnect. Both modes report `\r\nIM_READY\r\n` once all connections have dropped. |
| Parameters | `<hdl>`: connection handle; BLE connections display as 1-based (internal 0-based plus 1), SPP connections display the raw handle. `<mac>`: the peer's Bluetooth address. `<mtu>`: the negotiated MTU. |
| Notes | Reporting is controlled by `AT+EVT`: at 0 (default), notifications are reported normally; at 1, `IM_READY`/`IM_CONN`/`IM_DISCONN` are suppressed. The reporting format and content differ by current operating mode (command mode / pass-through mode), as described above. |

</div>

## Appendix

### Common Class of Device Values

<div align="center"><em>Table: Common Class of Device Values</em></div>

<div align="center" markdown>

| Device Type | Hex Value |
|:-------------|:-----------|
| Computer | `0x000100` |
| Phone | `0x000200` |
| LAN/Network Access Point | `0x000300` |
| Audio/Video | `0x000400` |
| Peripheral (keyboard/mouse, etc.) | `0x000500` |
| Imaging (printer/scanner, etc.) | `0x000600` |

</div>
