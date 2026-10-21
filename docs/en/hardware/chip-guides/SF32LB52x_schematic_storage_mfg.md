---
icon: lucide/circuit-board
hide:
    - navigation
description: "Schematic guidelines for SF32LB52x storage, connectivity, and manufacturing access: boot storage, sensors, debug/download interface, and production flashing."
tags:
    - Hardware
    - Chip
---

# SF32LB52x Hardware Design Guide — Storage & Manufacturing { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "Part of the SF32LB52x Hardware Design Guide"
    This page covers Sections 5.6-5.7 of Schematic Design Guidelines: Storage and Connectivity, and Manufacturing. Return to [RF & User Interfaces](SF32LB52x_schematic_rf_interfaces.md), or see the [Schematic Checklist](SF32LB52x_schematic_checklist.md) for the item-by-item review.

### 5.6. Storage and Connectivity { #56-storage-and-connectivity }

#### 5.6.1. Storage { #561-storage }

**Quick Summary**

- External boot options include SPI NOR, SPI NAND, and SD NAND; eMMC is available on supported externally regulated variants.
- Bootstrap pins `PA13` and `PA17` select the boot medium.
- The application notes and schematic-design guide specify `PA21` for boot-storage power switching, whereas the official checklist specifies `PA11` for external Flash on battery-powered variants. Confirm the applicable control pin with SiFli for the exact design. Separately, PA21 must power-cycle MPI-attached NOR Flash of 32 MB or larger so ROM can recognize it after reset or Hibernate entry; during Hibernate, VDD_SIP must be off to avoid leakage through co-packaged-memory I/O.

**Design Goal**

Choose a boot medium and storage power architecture that support firmware size, update strategy, low-power states, and reliable ROM boot after reset or Hibernate.

##### 5.6.1.1. Storage Interface Description { #5611-storage-interface-description }

The chip supports external SPI NOR Flash, SPI NAND Flash, and SD NAND Flash. **eMMC is supported only on the 52B/D/E/G/J regular-powered variant.**

<div align="center"><em>Table 5.6-1: SPI NOR/NAND Flash Signal Connections</em></div>

<div align="center" markdown>

| Flash Signal | I/O Pin | Description |
|:---|:---|:---|
| CS# | PA12 | Chip select, active low |
| SO | PA13 | Data IO1 |
| WP# | PA14 | Data IO2 / write protect |
| SI | PA15 | Data IO0 |
| SCLK | PA16 | Serial clock |
| Hold# | PA17 | Data IO3 / hold |

</div>

<div align="center"><em>Table 5.6-2: SD NAND Flash and eMMC Signal Connections</em></div>

<div align="center" markdown>

| SD NAND/eMMC Signal | I/O Pin | Description |
|:---|:---|:---|
| SD2_CMD | PA15 | Command |
| SD2_D1 | PA17 | Data 1 |
| SD2_D0 | PA16 | Data 0 |
| SD2_CLK | PA14 | Clock |
| SD2_D2 | PA12 | Data 2 |
| SD2_D3 | PA13 | Data 3 |

</div>

!!! note "eMMC power domains (regular-powered variant only)"
    eMMC chips have two power domains, VCC and VCCQ. Option 1: switch both together — lower shutdown current, but slower eMMC sleep recovery and higher average CPU power. Option 2: switch VCC only, keep VCCQ always on — higher shutdown current than option 1, but faster eMMC sleep recovery and lower average CPU power.

!!! important "Storage-interface pull-ups"
    The application note for externally regulated variants specifies no external pull-up for NOR Flash; a pull-up on PA17 (Hold#) for SPI NAND; pull-ups on PA13 (D3) and PA15 (CMD) for SD NAND; and pull-ups on PA17 (D1), PA13 (D3), and PA15 (CMD) for eMMC. It recommends 7.5 kΩ. The battery-variant application note only identifies PA13/PA17 bootstrap footprints and does not say whether the PA15/CMD pull-up also applies there. Do not transfer the externally regulated variant's PA15 requirement to battery-powered designs without confirmation; verify pull-ups for the exact variant and boot medium with SiFli.

##### 5.6.1.2. Boot Configuration { #5612-boot-configuration }

=== "SF32LB520/3/5/7 (Battery-Powered)"

    The chip supports booting from internal co-packaged SPI NOR Flash, external SPI NOR Flash, external SPI NAND Flash, or external SD NAND Flash (**eMMC boot is not supported**):

    - SF32LB520Ux6 has co-packaged Flash and boots from it by default
    - SF32LB523/5/7Ux6 have co-packaged PSRAM and must boot from external storage

    ![Figure 5.6-1: Bootstrap Pin Recommended Circuit (Battery-Powered Variant)](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.6-1: Bootstrap Pin Recommended Circuit (Battery-Powered Variant)</em></div>

    <div align="center"><em>Table 5.6-3: Boot Option Settings (Battery-Powered Variant)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Boot Medium |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |

    </div>

=== "52B/D/E/G/J (Regular-Powered)"

    The chip supports booting from internal co-packaged SPI NOR Flash, external SPI NOR Flash, external SPI NAND Flash, external SD NAND Flash, or external **eMMC**:

    - The model with co-packaged Flash (SF32LB52BU36) boots from it by default
    - Models with co-packaged PSRAM (SF32LB52DUB6/EUB6/GUC6/JUD6) must boot from external storage

    ![Figure 5.6-2: Bootstrap Pin Recommended Circuit (Regular-Powered Variant)](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>Figure 5.6-2: Bootstrap Pin Recommended Circuit (Regular-Powered Variant)</em></div>

    <div align="center"><em>Table 5.6-4: Boot Option Settings (Regular-Powered Variant)</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | Boot Medium |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |
    | H | H | eMMC |

    </div>

    !!! note "Naming note in the original SiFli documentation"
        SiFli's original source document uses suffix letters "SF32LB52AUx6" and "SF32LB52D/F/HUx6" in this section, which do not match the B/D/E/G/J model naming used at the start of the same source document. This guide restates the distinction by actual co-packaged memory type (Flash vs. PSRAM); if in doubt, verify against the exact chip model and datasheet.

!!! important "Confirm the overlapping boot-table entries"
    The application notes list H/X for SD NAND, while the separate SF32LB52x schematic-design guide lists H/L; the regular-powered application note also lists H/H for eMMC. Since X normally means either logic level, the regular-powered entries overlap and the sources do not explain the difference. Do not infer the final strap levels from these tables alone; confirm the exact variant and ROM behavior with SiFli. The reference circuits use 7.5 kΩ pull-ups: Figure 5.6-1 connects them to the 3.3 V VDD33_VOUT1 rail, and Figure 5.6-2 to 3.3 V VDDIOA.

##### 5.6.1.3. Boot Storage Power Control { #5613-boot-storage-power-control }

The higher-priority OpenSiFli application guides and schematic-design guide specify `PA21` for boot-storage power switching, active high (on) and low (off); use `PA21` as the source-supported design basis. The checklist workbook linked from the SiFli Wiki instead lists `PA11` for external-Flash switching on battery-powered variants. Do not substitute `PA11` based only on that workbook. It does not say whether `PA11` is a separate board-level enable or a pin-assignment conflict, so confirm the exact net and variant with SiFli before release.

=== "SF32LB520/3/5/7 (Battery-Powered)"

    - SF32LB520Ux6 has co-packaged Flash — power VDD18_VOUT from VDD33_VOUT1 and disable the internal VDD18_VOUT LDO
    - SF32LB523/5/7Ux6 have co-packaged PSRAM — use the internal LDO; VDD18_VOUT can be externally supplied
    - For external NOR Flash, power it from VDD33_VOUT1 with no extra power switch needed
    - For external SPI NAND or SD NAND, power it from VDD33_VOUT1 and add a power switch
    - The reference design reserves pull-up resistor footprints at PA13 and PA17 — populate based on the storage type, 7.5 kΩ recommended

=== "52B/D/E/G/J (Regular-Powered)"

    - The model with co-packaged Flash (SF32LB52BU36) — add a power switch on VDD_SIP
    - Models with co-packaged PSRAM (SF32LB52DUB6/EUB6/GUC6/JUD6) — if PVDD = 3.3 V and VDD_SIP uses the internal LDO, a VDD_SIP power switch is optional; if PVDD = 1.8 V, a VDD_SIP power switch is required
    - External storage power is independent of VDD_SIP — add a separate power switch
    - See Section 5.6.1.1 for the eMMC VCC/VCCQ power-domain tradeoffs
    - The application note specifies **PA21** for boot-related storage power switches; the source discrepancy for battery-powered external Flash is called out above
    - For a NOR Flash of 32 MB or larger attached via the MPI (Memory Peripheral Interface, which connects to SPI-NOR/SPI-NAND), the Flash must be power-switchable via PA21 so it exits 4-byte mode on MCU restart or Hibernate entry — otherwise ROM won't recognize the Flash. NOR Flash of 16 MB or smaller can remain always powered
    - The reference design reserves pull-up resistor footprints at PA13 and PA17 — populate based on the storage type, 7.5 kΩ recommended

**Common Mistakes - Storage**

- Missing bootstrap resistors or populating them for the wrong boot medium.
- Leaving the source-confirmed boot-storage power-switch control disconnected.
- Treating eMMC as available on all variants.
- Keeping large NOR Flash always powered when 4-byte mode can break ROM recognition after restart.

**Storage Checklist**

- [ ] Boot medium is selected and documented before PCB layout.
- [ ] `PA13`/`PA17` bootstrap pull options match the boot table.
- [ ] The source-confirmed, variant-specific pin controls all required boot-storage power switches; the PA11/PA21 discrepancy has been resolved with SiFli.
- [ ] eMMC VCC/VCCQ tradeoff is reviewed for regular-powered designs.
- [ ] Bring-up plan covers boot-mode strapping, storage rail timing, ID read, and firmware download.

#### 5.6.2. Sensors { #562-sensors }

**Quick Summary**

- Sensors typically connect through I2C or SPI. Power-gate unused sensors to reduce standby current; keep sensors needed for wake-up in the required operating mode.
- Wake-capable sensor interrupts must be assigned before pinout freeze.

**Design Goal**

Keep sensor power, interrupt, and bus routing reliable while allowing unused sensors to shut down cleanly in low-power modes.

The SF32LB52x can connect to heart-rate, accelerometer, geomagnetic, and similar sensors. Choose a load switch with low Iq for sensor power switching.

**Sensor Checklist**

- [ ] Sensor bus, interrupt, reset, and power-enable pins are assigned.
- [ ] The sensor load switch's quiescent current (Iq) and shutdown current meet the standby target.
- [ ] Pull-ups are placed on the correct sensor I/O voltage rail.
- [ ] Bring-up plan covers bus scan, interrupt wake, and sensor power cycling.

#### 5.6.3. UART and I2C Pin Assignment { #563-uart-and-i2c-pin-assignment }

**Quick Summary**

- UART and I2C functions can be mapped to arbitrary PA pins.
- Pin choices should still account for boot, wake, debug, production test, and board routing constraints.

**Design Goal**

Use flexible pin mapping to simplify routing without blocking required boot straps, wake pins, debug access, or production fixtures.

The SF32LB52x supports UART and I2C function mapping on arbitrary PA pins.

**UART/I2C Checklist**

- [ ] Pull-ups, voltage domains, and bus capacitance are correct for every I2C bus.
- [ ] UART pins needed for logs, download, or external modules are accessible.
- [ ] Pin multiplexing does not conflict with bootstrap, wake, display, storage, or debug functions.

#### 5.6.4. GPTIM Pin Assignment { #564-gptim-pin-assignment }

**Quick Summary**

- GPTIM functions can be mapped to arbitrary PA pins.
- Timer functions support PWM outputs, input capture, motor control, backlight control, and product-specific timing.

**Design Goal**

Reserve timer-capable functions early enough that PWM, capture, and timing features are not forced onto poor routing or wake-conflicting pins late in the design.

The SF32LB52x supports GPTIM function mapping on arbitrary PA pins.

**GPTIM Checklist**

- [ ] Timer channels required for PWM, capture, or control loops are listed in the pinout table.
- [ ] GPTIM pins do not conflict with backlight, motor, debug, or storage requirements.
- [ ] Bring-up plan includes checking PWM frequency, duty range, and pin polarity.

### 5.7. Manufacturing { #57-manufacturing }

#### 5.7.1. Debug and Download Interface { #571-debug-and-download-interface }

**Quick Summary**

- `PA18` and `PA19` default to DBG_UART after power-up and are multiplexed with SWD.
- Reserve physical access to the debug/download pins on every prototype and production board.

**Design Goal**

Guarantee firmware download, debug logs, single-step debug, and failure recovery access even after the product enclosure and production fixture are defined.

The SF32LB52x supports a DBG_UART interface for download and debug, connected to a PC through a 3.3 V UART-to-USB dongle board. SWD and DBG_UART are multiplexed on PA18 and PA19; the default power-on configuration is DBG_UART, which supports single-step debugging as well as log output.

For DBG_UART single-step debugging and log output, consult the SFtool and Impeller manuals.

<div align="center"><em>Table 5.7-1: Debug Port Connections</em></div>

<div align="center" markdown>

| Debug Signal | Pin | Description |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | Debug UART receive |
| DBG_UART_TXD | PA19 | Debug UART transmit |

</div>

**Debug Checklist**

- [ ] `PA18`/`PA19`, ground, and the required power reference are exposed on test pads or connector pins.
- [ ] Debug access remains available after enclosure, battery, and display assembly.
- [ ] UART voltage level is 3.3 V compatible with the selected adapter or fixture.
- [ ] Recovery path is documented for a board that cannot boot application firmware.

#### 5.7.2. Production Flashing and Crystal Calibration { #572-production-flashing-and-crystal-calibration }

**Quick Summary**

- Production programming and crystal calibration require stable power, DBG_UART access, PA01, and the required power/ground test points.
- Fixture access should be designed before the PCB mechanical outline and enclosure are frozen.

**Design Goal**

Make every production board programmable, calibratable, and recoverable without manual soldering or product disassembly.

SiFli provides an offline downloader for production firmware flashing and crystal calibration. Reserve at least these test points in the hardware design: PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD, and PA01. See the "Offline Downloader User Guide" document included in the development package for the detailed flashing and calibration process.

**Production Checklist**

- [ ] PVDD/VBAT, GND, AVDD33, DBG_UART_RXD, DBG_UART_TXD, and PA01 test points are reserved.
- [ ] Test pads are reachable by the intended fixture after mechanical assembly.
- [ ] Crystal calibration flow and pass/fail limits are defined with manufacturing.
- [ ] Programming, calibration, and functional-test records can be tied back to the board revision.

#### 5.7.3. Schematic and PCB Drawing Checklists { #573-schematic-and-pcb-drawing-checklists }

Use the official [schematic and PCB checklist][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)] published on SiFli's wiki as the formal release gate — see the [Schematic Checklist](SF32LB52x_schematic_checklist.md) for the complete, item-by-item version. The local checklists in this guide are intended to catch common engineering issues before the formal checklist review.

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**Release Checklist**

- [ ] Schematic checklist, PCB checklist, AVL check, DRC report, and impedance report are complete.
- [ ] Evidence screenshots are archived for power, clock, RF, display, storage, audio, USB, SDIO, DC/DC, and production-test access.
- [ ] Variant-specific assumptions are documented in the review notes.
- [ ] Open hardware risks are assigned to an owner before release.
