---
icon: lucide/bluetooth
title: "Run Bluetooth Signaling Tests"
description: "Connect SF32 DUTs to a Bluetooth tester and perform BLE or Classic Bluetooth signaling measurements."
tags: [Develop, SiFli-SDK, Application Notes, Bluetooth]
---

# Run Bluetooth Signaling Tests { #run-bluetooth-signaling-tests }

Signaling mode establishes a real Bluetooth link between the DUT and a communications tester for protocol-conformant TX/RX testing. The SiFli guide covers manual operation and automated testing controlled by software, such as R&S® CMWrun controlling a CMW tester. This differs from vendor-specific non-signaling and single-item RF tests.

!!! note "Qualification scope"
    For qualification work, follow the path for the specific test type. SiFli's RF test guide lists BT signaling for QDID/protocol-conformance testing and states that BR/EDR BQB RF testing uses BT signaling, while BLE BQB RF testing uses SIG DTM (BLE non-signaling). Do not treat the BLE signaling procedure here as a BLE BQB RF test flow.

## Test setup { #test-setup }

Prepare the DUT, a Bluetooth communications tester (the source guide uses CMW500), a Windows PC, USB-to-UART cable, and an RF coax cable. Expose `VBAT`, `GND`, and UART1 TX/RX on the DUT. Default UART1 pins vary by package:

<div align="center" markdown>

<em>Table: Default UART1 pins listed in the SiFli Bluetooth signaling guide</em>

| Device/package | UART1 TX | UART1 RX |
|---|---|---|
| SF32LB52x | PA19 | PA18 |
| SF32LB551 | PA17 | PA18 |
| SF32LB555/557 | PA34 | PA30 |
| SF32LB56xU (QFN) | PA17 | PA18 |
| SF32LB56xV (BGA) | PA34 | PA30 |
| SF32LB57x | PA19 | PA18 |
| SF32LB58x | PA32 | PA31 |

</div>

!!! warning "SF32LB58x UART1 direction conflict"
    The SiFli Bluetooth signaling guide and the debug-port table in the [SF32LB58x hardware design guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md) map chip UART1 TX/RX to PA32/PA31. However, the [SF32LB58-DevKit-LCD pin table](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb58x/SF32LB58-DevKit-LCD.md) labels PA31 as UART1_TXD and PA32 as UART1_RXD, and the [SiFli RF test guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/rf_test_guide.html) also lists TX=PA31/RX=PA32. Official references conflict. Check the target board schematic and project pin configuration before wiring; do not rely on this consolidated table alone.

Use the project's actual pin configuration when it differs from this default map. BLE signaling needs a serial EUT-control connection to the tester; Classic BT signaling can control the DUT over the air after it enters test mode.

The key distinction is the control topology: BLE connects the UART/HCI control path to the tester, while Classic BT lets the tester discover and connect to the DUT over the air. The source guide's SF32LB52x diagrams are shown below; use the target project's pin table for other families.

!!! note "Family scope"
    The UART pin table is the consolidated family/package comparison. The topology and tester screenshots that follow are SF32LB52x source examples; use them to understand the signal path, not as a package-independent pin or menu reference.

![BLE signaling test topology](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-1.jpg){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x source example — BLE signaling: the PC enters DUT test mode, then the UART/HCI control path moves to the tester.</em></div>

![Classic BT signaling test topology](../../../../assets/develop/app-notes/bluetooth-signalling/figure_1-2.jpg){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x source example — Classic BT signaling: the tester discovers and connects to the DUT over RF.</em></div>

## Put the DUT into test mode { #put-the-dut-into-test-mode }

### BLE { #ble }

1. Boot the DUT and keep DFU/application firmware awake.
2. Connect UART1 to the PC and send the FinSH command `bt_cm uart_dut` with SiFli_Trace or another serial tool.
3. Switch the terminal to hexadecimal display and verify `04 0E 04 XX 03 0C 00`.
4. Disconnect the PC and connect the same UART1 to the tester's USB-to-RS232 EUT-control port.

![BLE test-mode serial response](../../../../assets/develop/app-notes/bluetooth-signalling/figure_2-1.png){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x source example — confirm `04 0E 04 XX 03 0C 00` before moving the UART connection; the example capture shows `04 0E 04 06 03 0C 00`.</em></div>

### Classic Bluetooth { #classic-bluetooth }

1. Boot the DUT and keep the screen/CPU awake.
2. Connect UART1 to the PC and send `bt_cm dut`.
3. Verify the `Write scan enable success` response, then connect the RF coax to the tester. Reboot before entering a different test mode.

## Establish the signaling connection { #establish-the-signaling-connection }

In the tester's `Bluetooth Signaling` application, enable signaling. For BLE, under `EUT Control`, set `HW Interface` to `USB to RS232 adapter`, `EUT Comm Protocol` to `HCI`, and `Baud Rate` to `1000000`; under General Setup, choose `Burst Type: Low Energy`. The shown measurement example uses `PHY=LE1M`. Before the serial cable is connected, `Virtual COM Port` appears as `None` and is disabled. Connect the DUT's UART1 to the tester and its RF coax to the tester's RF input, then toggle Bluetooth Signaling off and on so the tester detects the serial port. Run `Connection Check`; `LE comm test passed` should appear after about 3 seconds. For Classic BT, set `HW Interface` to `None (EUT Control off)`, search for the DUT address with `Inquire`, and select `Connect Test Mode`.

![BLE tester EUT Control settings](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-5.jpg){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x source example — BLE EUT Control, baud-rate, and Low Energy settings.</em></div>

![Classic BT tester settings](../../../../assets/develop/app-notes/bluetooth-signalling/figure_3-7.jpg){ loading="lazy" }
<div align="center"><em>Figure: SF32LB52x source example — Classic BT signaling with EUT Control set to `None (EUT Control off)`.</em></div>

!!! note "Settings shown in the tester screenshots"
    The BLE screenshot also shows `Stop Bits=1`, `Parity=None`, serial `Protocol=None`, `Autoreset EUT` checked, and `Use BR/EDR Settings` unchecked. Its measurement example is `Operating Mode=RF Test`, `Burst Type=Low Energy`, `PHY=LE1M`, `Channel=19`, `Frequency=2440.0 MHz`, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Auto Ranging` and `Dirty Tx` unchecked, `Packet Type=RE_PHY_TestRef`, `Payload Length=37 byte(s)`, and `Pattern Type=PRBS9`. The Classic BT screenshot shows `Operating Mode=RF Test`, `Burst Type=Basic Rate`, UI `Test Mode=Loopback Test`, `Channel` Rx/Tx values 10/39, `Frequency` Rx/Tx values 2412.0/2441.0 MHz, `Tx Level (CMW)=-40.00 dBm`, `Exp. Nom. Power=30.00 dBm`, `Packet Type=DH5`, `Payload Length=339 byte(s)`, and `Pattern Type=10101010`; Hopping, Auto Ranging, Dirty Tx, and Whitening are unchecked. These are screenshot-specific measurement examples, not universal settings. The screenshot's `Loopback Test` field does not change the connection step above, which selects `Connect Test Mode` after `Inquire`.

## Run TX measurements { #run-tx-measurements }

Open `Bluetooth 1 Multi Eval.`; the measurement screen is off by default, so press `ON/OFF` to enable it. To change test parameters, choose `Input Signal` on the right and select `Burst Type` at the bottom; BLE options include 1M/2M and Classic BT options include BR/EDR. Set the channel, packet type, and payload length in the Bluetooth Signaling screen or under `Input Signal`. The same TX screen is used after either BLE or BT signaling connection.

## Run RX sensitivity measurements { #run-rx-sensitivity-measurements }

Disable TX, return to the connection screen using `Bluetooth Signaling` on the right, and open `Bluetooth 1 RX Meas.`. Select BER for Classic BT or PER for BLE, configure the channel, packet type, and payload length, then enable Rx Quality. Reduce the tester's `Tx Level (CMW)` in 0.01 or 0.1 steps. When the BER/PER indicator turns red, the preceding level is the receive sensitivity for that channel. Record whether the result is conducted or radiated and include cable loss.

## Record and reproduce { #record-and-reproduce }

Keep the chip/package, UART pin map, SDK revision, firmware identity, tester model and configuration, RF connection, channel, PHY, packet settings, TX level, BER/PER, and board revision with the result. The official family pages are [SF32LB52x](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB55x](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), [SF32LB56x](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html), and [SF32LB58x](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_note/%E6%80%9D%E6%BE%88SF32LB5xx%E8%8A%AF%E7%89%87%E8%93%9D%E7%89%99%E4%BF%A1%E4%BB%A4%E6%B5%8B%E8%AF%95%E6%8C%87%E5%8D%97.html).
