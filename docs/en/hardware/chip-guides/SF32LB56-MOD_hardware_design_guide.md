---
icon: lucide/book-check
description: "Hardware design guide for the SF32LB56-MOD Bluetooth MCU module: power, interfaces, and PCB integration guidance."
tags:
  - Hardware
  - Module
hide:
    - navigation
---

# SF32LB56-MOD Hardware Design Guide

## 1. Introduction

**SF32LB56-MOD** is SiFli's general-purpose low-power Bluetooth MCU module family, built on the SF32LB56xV series.

This guide uses **DS5602-SF32LB56-MOD Technical Specification V0.3** as its source and organizes the module-specific information needed for schematic design, PCB layout, validation, and production release. It covers memory variants, the 89-pin interface, three power rails, display/audio/storage interfaces, antenna-placement rules, handling requirements, and the schematic checklist.

!!! note "Source and recommendations"
    Technical values below follow **DS5602-SF32LB56-MOD Technical Specification V0.3** unless explicitly marked as integration guidance or a design recommendation.

## 2. Device Overview

### 2.1 Architecture

SF32LB56-MOD uses a dual-core MCU platform from the SF32LB56xV series. The HCPU handles application and graphics workloads; the LCPU runs low-power, always-on tasks. The HCPU is an Arm Cortex-M33 STAR-MC1 core operating at up to 240 MHz; the LCPU is the same core type operating at up to 96 MHz. Both support FPU and MPU.

The module supports Bluetooth 5.3 connectivity and provides display acceleration, audio I/O, external-memory interfaces, USB 2.0 FS, SD/SDIO/eMMC, I2S, UART, I2C, SPI, PWM, GPADC, and debug/download access.

### 2.2 Variants

<div align="center"><em>Table 2.2-1: SF32LB56-MOD Series Variants</em></div>

<div align="center" markdown>

| Module Code | Main Flash | PSRAM | Backup Flash | Operating Temperature | Dimensions |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16MB QSPI-NOR | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-A128R12N1 | 128MB QSPI-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |
| SF32LB56-MOD-D128R12N1 | 128MB SD-NAND | 4+8MB OPI-PSRAM | 1MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1mm |

</div>

### 2.3 Major Hardware Features

<div align="center"><em>Table 2.3-1: Major Hardware Features</em></div>

<div align="center" markdown>

| Area | Capability |
| :--- | :--- |
| CPU | HCPU up to 240MHz, LCPU up to 96MHz, both Arm Cortex-M33 STAR-MC1 |
| Wireless | Dual-mode Bluetooth 5.3 with BLE Audio support |
| Graphics | ePicasso 2.0, eZip 2.0, TurboPixel, LCD 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI |
| Audio | 24-bit DAC, 24-bit Sigma-Delta ADC, 2 PDM interfaces (PDM1/PDM2), each supporting two microphones on left/right channels (up to four microphones total), 1x I2S |
| AI/DSP | Matrix accelerator up to 1.92 GOPS, FFT, FIR, CORDIC |
| Storage | Module Flash/PSRAM options, MPI3, SD/SDIO/eMMC support |
| Security | AES, HASH, CRC, TRNG, Secure Boot, 1024-bit eFuse, PSA Certified Level 1 |
| Antenna | PCB on-board antenna or external antenna through IPEX-compatible connector |

</div>

### 2.4 Typical Applications

Typical applications include high-end smartwatches, smart bands, wearable medical equipment, fitness equipment, e-bike control panels, car keys, wearable remote controls for vehicles, smart appliances, smart locks, graphical HMI devices, industrial sensor hubs, industrial monitoring terminals, low-power sensor hubs, and Bluetooth Mesh devices.

## 3. Design at a Glance

### 3.1 One-Page Engineering Summary

<div align="center"><em>Table 3.1-1: Engineering Summary</em></div>

<div align="center" markdown>

| Topic | Design Guidance |
| :--- | :--- |
| Power rails | Provide VDD_3V3, VDD_1V8, and VDDIO. The three rails must power up at the same time. |
| Local decoupling | Place 4.7uF capacitors close to the module pins on VDD_3V3, VDD_1V8, and VDDIO. |
| I/O level | VDDIO supports 1.7–3.6V, but PA00–PA11 are fixed at 3.3V. Check every connected peripheral. |
| Debug/download | UART4_TXD/UART4_RXD are default print/download/debug UART pins; SWDIO/SWCLK support SWD download. |
| Boot mode | BOOT_MODE high selects download mode; BOOT_MODE low selects user mode. |
| Internal Flash conflict | PA06–PA11 are connected to module internal Flash by default and are unavailable externally. |
| SDIO/MPI3 conflict | SDIO and MPI3 share I/O resources and cannot be used simultaneously. |
| Wake sources | PA50, PA51, PB32, and PB35 can receive interrupts during MCU sleep. |
| PWRKEY | PB32 supports active-high 10s long-press reset and requires a 10k pulldown. |
| Antenna | Keep the PCB antenna area free of copper, traces, components, and metal; use at least 15mm clearance if the antenna cannot extend beyond the board edge. |
| Manufacturing | MSL 3; use within 168 hours after opening at 25±5°C/60%RH or bake before reuse. |

</div>

### 3.2 Recommended External Components

<div align="center"><em>Table 3.2-1: Recommended External Components</em></div>

<div align="center" markdown>

| Circuit | Component | Placement / Notes |
| :--- | :--- | :--- |
| VDD_3V3 | 4.7uF capacitor | Place close to the module power pin. |
| VDD_1V8 | 4.7uF capacitor | Place close to the module power pin. |
| VDDIO | 4.7uF capacitor | Place close to the module power pin. |
| PB32/PWRKEY | 10k pulldown | Required for active-high long-press reset behavior. |
| LCD RGB signals | 33–100 ohm series resistors | Add in series on RGB signal lines. |
| PA16/PA17 debug UART | 100 ohm series resistors | Required on the multiplexed program download/debug UART interface. |
| Touch panel / user connectors | ESD protection | Reserve ESD devices on exposed interfaces such as TP. |

</div>

### 3.3 Power Tree

VDD_3V3 powers the MCU PVDD, AVDD33_ANA, AVDD33_AUD, AVDD_BRF, VDDIOA2, and module internal Flash. SiFli recommends using an LDO for this rail. VDD_1V8 powers the MCU co-packaged memory. VDDIO powers the MCU VDDIOA/VDDIOB I/O ports.

!!! info "Figure 3.3-1: SF32LB56-MOD Power Supply Diagram"
    See Figure 7-1 in DS5602 V0.3.

### 3.4 System Block Diagram

The module block diagram shows the SF32LB56xV MCU, memory resources, RF path, antenna option, power inputs, and external interface groups.

!!! info "Figure 3.4-1: SF32LB56-MOD Functional Block Diagram"
    See Figure 2-1 in DS5602 V0.3.

## 4. Hardware Design Flow

### 4.1 Design Sequence

1. Select the memory variant based on firmware size, graphics assets, external storage needs, and cost target.
2. Choose PCB antenna or external antenna variant before mechanical freeze.
3. Define the power architecture for VDD_3V3, VDD_1V8, and VDDIO, and confirm simultaneous power-up.
4. Assign display, storage, USB, audio, sensor, wake, debug, and production-test pins.
5. Resolve shared-resource conflicts, especially SDIO versus MPI3 and the internally used PA06–PA11 Flash pins.
6. Add decoupling, ESD, PWRKEY pulldown, LCD series resistors, and debug UART series resistors.
7. Place the module with the required antenna clearance and keep-out.
8. Review the schematic and PCB against the checklist in Section 7 before release.

### 4.2 Review Sequence

Use a staged review sequence: schematic review, pin-mux review, power-up review, RF/antenna review, layout review, first-article bring-up review, RF validation, environmental/reliability review, and production-test review.

### 4.3 Milestones

<div align="center"><em>Table 4.3-1: Recommended Hardware Milestones</em></div>

<div align="center" markdown>

| Milestone | Required Evidence |
| :--- | :--- |
| Schematic freeze | Variant selected, pin conflicts cleared, power rails checked, checklist complete. |
| Layout freeze | Antenna keep-out checked, power decoupling placed, high-speed interfaces reviewed. |
| EVT bring-up | Rails, boot mode, UART/SWD, Flash, display, USB, audio, and RF smoke tests pass. |
| DVT | RF range, current, thermal, sleep/wake, ESD strategy, and enclosure impact validated. |
| Production release | Programming, test pads, inspection rules, MSL/reflow handling, and revision records complete. |

</div>

## 5. Schematic Design

### 5.1 Power System

#### 5.1.1 Power Supply

<div align="center"><em>Table 5.1-1: Power Rails</em></div>

<div align="center" markdown>

| Rail | Recommended Operating Range | Purpose |
| :--- | :--- | :--- |
| VDD_3V3 | 2.97–3.6V | MCU PVDD, analog 3.3V domains, RF analog domain, VDDIOA2, internal Flash. |
| VDD_1V8 | 1.7–1.95V | MCU co-packaged memory supply. |
| VDDIO | 1.7–3.6V | MCU VDDIOA/VDDIOB I/O supply. |

</div>

VDD_3V3, VDD_1V8, and VDDIO must power up at the same time. Place a 4.7uF capacitor close to each module power pin. Although VDDIO can operate from 1.7V to 3.6V, the datasheet separately notes that PA00–PA11 are fixed at 3.3V and do not follow VDDIO.

#### 5.1.2 Operating Modes

BOOT_MODE selects boot behavior: high for download mode and low for user mode. Keep the BOOT_MODE network deterministic during reset and production programming. PB32/PWRKEY supports active-high 10s long-press reset and requires a 10k pulldown.

### 5.2 Timing and RF

#### 5.2.1 Clock

The module platform uses a 48MHz crystal oscillator and supports low-power RC oscillators at 1MHz/48MHz, an ultra-low-power 10kHz RC oscillator, and an optional 32.768kHz crystal oscillator. Keep clock-related layout and grounding consistent with the module reference design and avoid ultrasonic processes that can mechanically stress the internal crystal.

#### 5.2.2 RF

<div align="center"><em>Table 5.2-1: Bluetooth RF Summary</em></div>

<div align="center" markdown>

| Item | Value |
| :--- | :--- |
| Bluetooth frequency range | 2402–2480MHz |
| BLE maximum transmit power | 19dBm |
| BLE RF power-control range | -20 to 19dBm |
| BLE 1Mbps sensitivity | -100dBm dirty off, -99.3dBm dirty on |
| BLE 2Mbps sensitivity | -97dBm dirty off, -96.5dBm dirty on |
| BR maximum transmit power | 19dBm |
| EDR maximum transmit power | 13dBm |
| BR sensitivity | -96.3dBm dirty off, -94dBm dirty on |
| EDR2 sensitivity | -95.5dBm dirty off, -95dBm dirty on |
| EDR3 sensitivity | -88.5dBm dirty off, -87dBm dirty on |

</div>

The module supports an on-board PCB antenna or an external antenna connected through an IPEX-compatible connector. Validate the communication range and RF performance in the final enclosure, not only on an open bench.

### 5.3 User Interfaces

#### 5.3.1 Display

The LCD controller supports DBI serial SPI mode, Dual-SPI, Quad-SPI, 8080 parallel mode, DPI/RGB, and JDI. The recommended pin-assignment figure in the datasheet maps LCD_DPI_24, LCD_DPI_8, LCD_QSPI, LCD_8080, E-Paper, and Raspberry Pi-style groups to module pins.

Add 33–100 ohm series resistors on LCD RGB signal lines. Keep RGB, SPI display, and touch-panel routing short and consistent, and reserve ESD protection on exposed touch or connector interfaces.

!!! info "Figure 5.3-1: Recommended Development-Board Pin Assignment"
    See Figure 7-6 in DS5602 V0.3.

#### 5.3.2 Audio

The module exposes analog audio DAC outputs, MIC_BIAS, MIC_ADC_IN, I2S, and PDM-capable pins. The audio DAC is a 24-bit output path supporting 8kHz to 48kHz sample rates with 109dB SNR and dynamic range. The audio ADC is a 24-bit Sigma-Delta input path supporting 8kHz to 48kHz sample rates with 99dB SNR and dynamic range.

Route analog audio away from noisy switching nodes, LCD clocks, and antenna feed structures. Keep MIC_BIAS and MIC_ADC_IN filtering close to the attached microphone circuit.

#### 5.3.3 Buttons

PB32 is the PWRKEY input and supports active-high 10s long-press reset. Add the required 10k pulldown and ensure the button circuit cannot float during shipping, deep sleep, or power sequencing.

#### 5.3.4 Motor and PWM Loads

Pins marked GPTIM in the datasheet's recommended pin-assignment figure support PWM output. Use external drivers for motors, backlights, buzzers, or other loads; do not drive inductive or high-current loads directly from module GPIO.

### 5.4 Storage and Connectivity

#### 5.4.1 Storage

The module family provides SKU-dependent main Flash, 4+8MB OPI-PSRAM, and 1MB backup QSPI-NOR Flash. MPI3 can connect SPI NOR or SPI NAND externally, but PA06–PA11 are connected to module internal Flash by default and are unavailable externally. SDIO and MPI3 share I/O resources and cannot be used at the same time.

#### 5.4.2 Sensors

GPADC supports 12-bit conversion, up to 4MS/s sample rate, 0–3.3V single-ended input range, -2.1V to +2.1V differential input range, software/hardware trigger, and DMA. Pins marked GPADC_CHx support analog input; keep analog routes short, filtered, and away from LCD and RF switching noise.

#### 5.4.3 UART/I2C

UART supports full-duplex operation up to 6Mbps. I2C supports standard 100kbps, fast 400kbps, fast-mode plus 1Mbps, and high-speed 3.4Mbps modes. Many GPIOs are multiplexed as `PAxx_I2C_UART` or `PBxx_I2C_UART`; confirm the final mux plan before schematic freeze.

UART4_TXD on pin 6 and UART4_RXD on pin 7 are the default print serial port and support program download/debug. PA16 and PA17 can be multiplexed as DBG_UART and require 100 ohm series resistors when used for program download/debug.

#### 5.4.4 USB, SPI, SDIO, and I2S

USB2.0 FS supports Host/Device mode with integrated PHY. SPI supports SSP/SPI and Microwire formats; HPSYS SPI reaches up to 48MHz and LPSYS SPI up to 24MHz. SDMMC1 supports SD 3.0, SDIO 3.0, and eMMC 4.5.1 with SDR and DDR modes; SDMMC2 supports SD/SDIO/eMMC functions with SDR modes up to 48MHz. I2S supports master/slave, full duplex, left/right/standard formats, and up to 24-bit PCM width.

### 5.5 Manufacturing

#### 5.5.1 Debug

SWDIO on pin 79 and SWCLK on pin 80 are SWD debug/download pins. Keep SWD accessible on early prototypes and production fixtures. Also expose the default UART4 download/debug path unless the product has another approved programming path.

#### 5.5.2 Production

Reserve production access for power, ground, boot mode, reset/PWRKEY, SWD, UART download, and any board-level calibration or RF test interface. Final test software should cover boot, Flash, display, touch, audio, USB, sensors, RF communication, sleep/wake behavior, and current consumption.

## 6. PCB Layout

### 6.1 Mechanical and Footprint

The module measures 18.0 × 32.9 × 3.1 mm. Use the recommended PCB footprint from the datasheet and confirm the land pattern, solder-mask expansion, stencil apertures, keep-out area, and assembly courtyard with the PCB assembler.

!!! info "Figure 6.1-1: SF32LB56-MOD Module Dimensions"
    See Figure 8-1 in DS5602 V0.3.

!!! info "Figure 6.1-2: Recommended PCB Footprint"
    See Figure 8-2 in DS5602 V0.3. Dimensions are in millimeters.

### 6.2 Antenna Placement

If the product uses the PCB on-board antenna, reserve the antenna area with no components or metal. Place the module so the antenna area extends beyond the carrier-board edge when possible, with the feed point close to the board edge.

If the antenna cannot extend beyond the board edge, provide a clearance area of at least 15mm. Do not place copper, traces, or components in that clearance, and cut away the carrier-board material under the PCB antenna as much as practical.

!!! info "Figure 6.2-1: Recommended Module Placement"
    See Figure 8-4 in DS5602 V0.3.

!!! info "Figure 6.2-2: PCB Antenna Clearance Area"
    See Figure 8-5 in DS5602 V0.3.

### 6.3 External Antenna Connector

For external antenna designs, the datasheet describes a first-generation external antenna connector compatible with Hirose U.FL series, I-PEX MHF I, and Amphenol AMC connectors.

!!! info "Figure 6.3-1: External Antenna Connector Dimensions"
    See Figure 8-3 in DS5602 V0.3.

### 6.4 Layout Checklist

<div align="center"><em>Table 6.4-1: PCB Layout Checklist</em></div>

<div align="center" markdown>

| Area | Check |
| :--- | :--- |
| Power | 4.7uF capacitors are close to VDD_3V3, VDD_1V8, and VDDIO pins. |
| Ground | Module ground pins connect to a low-impedance ground system with stitching near high-speed and RF paths. |
| Antenna | Antenna keep-out has no copper, traces, components, screws, shields, battery metal, or enclosure metal intrusion. |
| Display | LCD RGB/SPI lines are short, impedance-conscious, and have required series resistors. |
| USB | USB DP/DM route as a matched differential pair with ESD near the connector. |
| Analog audio | MIC_BIAS, MIC_ADC_IN, and DAC outputs avoid switching regulators, LCD clocks, and RF feed regions. |
| Debug | SWD and UART download/debug access is reachable in prototypes and production fixtures. |

</div>

## 7. Hardware Validation

### 7.1 Electrical Characteristics

<div align="center"><em>Table 7.1-1: Absolute Maximum Ratings</em></div>

<div align="center" markdown>

| Symbol | Description | Min | Max | Unit |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3V power input | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8V power input | -0.3 | 1.95 | V |
| VDDIO | I/O power input | -0.3 | 3.6 | V |
| Tstore | Storage temperature | -40 | 125 | °C |

</div>

<div align="center"><em>Table 7.1-2: Recommended Operating Conditions</em></div>

<div align="center" markdown>

| Symbol | Description | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3V power input | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8V power input | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O power input | 1.7 | - | 3.6 | V |
| TA | Operating temperature | -40 | - | 85 | °C |

</div>

<div align="center"><em>Table 7.1-3: DC Electrical Characteristics at 3.3V, 25°C</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin capacitance | 2.5 | 3 | 3.5 | pF |
| VIH | Input high voltage | 0.7×VDD | - | VDD | V |
| VIL | Input low voltage | VSS | - | 0.3×VDD | V |
| IIH | Input high current | - | 10 | 40 | nA |
| IIL | Input low current | - | 10 | 40 | nA |
| VOH | Output high voltage, high-Z load | 0.8×VDD | - | VDD | V |
| VOL | Output low voltage, high-Z load | VSS | - | 0.2×VDD | V |
| IOH | Output high drive current | 24 | 30 | 38 | mA |
| IOL | Output low drive current | 24 | 30 | 38 | mA |
| RPU | Internal pull-up | 7 | 10 | 20 | kΩ |
| RPD | Internal pull-down | 7 | 10 | 20 | kΩ |
| VIH_nRST | Reset release voltage | 0.7×VDD | - | VDD | V |
| VIL_nRST | Reset assert voltage | VSS | - | 0.3×VDD | V |

</div>

VDD is the I/O supply. VOH and VOL are measured with a high-impedance load.

### 7.2 Power Consumption

<div align="center"><em>Table 7.2-1: Bluetooth and BLE Current at 3.3V, TX Power 0dBm</em></div>

<div align="center" markdown>

| Mode | Condition | Typical Current |
| :--- | :--- | :-: |
| BT Sniff | 50ms interval | 196.0uA |
| BT Sniff | 1s interval | 13.8uA |
| BLE ADV | 50ms interval | 228.7uA |
| BLE ADV | 1s interval | 15.7uA |
| BLE Connection | 50ms interval | 172.8uA |
| BLE Connection | 1s interval | 11.5uA |
| Scan | Inquiry Scan or Page Scan | 36.8uA |
| Both Scan | Inquiry Scan and Page Scan | 64.0uA |
| Standby | - | 4.6uA |

</div>

<div align="center"><em>Table 7.2-2: Processor Current</em></div>

<div align="center" markdown>

| Workload | Domain | Frequency | Current | Efficiency |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240MHz | 9.38mA | 30.92uA/MHz |
| CoreMark | HPSYS | 192MHz | 7.90mA | 30.92uA/MHz |
| CoreMark | HPSYS | 48MHz | 0.92mA | 30.92uA/MHz |
| CoreMark | LPSYS | 24MHz | 0.55mA | 15.13uA/MHz |
| WhileLoop | HPSYS | 240MHz | 7.54mA | 25.75uA/MHz |
| WhileLoop | HPSYS | 192MHz | 6.30mA | 25.75uA/MHz |
| WhileLoop | HPSYS | 48MHz | 0.70mA | 25.75uA/MHz |
| WhileLoop | LPSYS | 24MHz | 0.44mA | 10.63uA/MHz |

</div>

### 7.3 Schematic Checklist

<div align="center"><em>Table 7.3-1: Schematic Design Checklist</em></div>

<div align="center" markdown>

| No. | Checkpoint |
| :-: | :--- |
| 1 | VDD_3V3 input range is 2.97–3.6V; place a 4.7uF capacitor close to the module pin. |
| 2 | VDD_1V8 input range is 1.7–1.95V; place a 4.7uF capacitor close to the module pin. |
| 3 | VDDIO input range is 1.7–3.6V; place a 4.7uF capacitor close to the module pin. |
| 4 | Module I/O interface level is 3.3V where specified; attached peripheral levels must be compatible. |
| 5 | If internal module Flash is populated, PA06, PA07, PA08, PA09, PA10, and PA11 cannot be used externally. |
| 6 | SDIO and MPI3 share I/O resources and cannot be used simultaneously. |
| 7 | PA50, PA51, PB32, and PB35 can receive interrupts while the MCU is sleeping. |
| 8 | PB32 supports active-high 10s long-press reset; add a 10k pulldown. |
| 9 | Pins marked GPADC_CHx support 0–3.3V analog input. |
| 10 | Pins marked GPTIM support PWM output. |
| 11 | Interfaces such as TP need ESD protection devices. |
| 12 | LCD RGB signals need 33–100 ohm series resistors. |
| 13 | PA16 and PA17 multiplexed as DBG_UART are program download/debug pins and need 100 ohm series resistors. |

</div>

### 7.4 Storage, Handling, and Assembly

<div align="center"><em>Table 7.4-1: Storage, Handling, and Assembly Requirements</em></div>

<div align="center" markdown>

| Item | Requirement |
| :--- | :--- |
| Storage in sealed MBB | Non-condensing atmosphere below 40°C / 90%RH. |
| Moisture sensitivity | MSL 3. |
| After vacuum bag opening | Use within 168 hours at 25±5°C / 60%RH, or bake before reuse. |
| ESD HBM | ±2000V. |
| ESD CDM | ±500V. |
| Reflow | SiFli recommends only one reflow pass for the module. |
| Ultrasonic process | Avoid ultrasonic welding or ultrasonic cleaning; vibration can damage or degrade internal crystals. |

</div>

!!! info "Figure 7.4-1: Reflow Temperature Profile"
    See Figure 9-1 in DS5602 V0.3.

## 8. Related Documents

<div align="center"><em>Table 8-1: Related Documents and Products</em></div>

<div align="center" markdown>

| Type | Item |
| :--- | :--- |
| Module datasheet | [DS5602-SF32LB56-MOD 技术规格书 V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| Chip specification | SF32LB56x chip technical specification |
| Development board guide | SF32LB56-DevKit-LCD user guide |
| Chip family | SF32LB56xV series |
| Module | SF32LB56-MOD |
| Development board | SF32LB56-DevKit-LCD |

</div>

## 9. Appendices { #appendices }

### 9.1. Appendix A. Pin Planning Reference { #appendix-a-pin-planning-reference }

DS5602 V0.3 provides the complete 89-pin definition table and top-view pinout. The table below highlights the pins and signal groups that most often affect schematic risk, boot/debug access, or shared-resource planning.

<div align="center"><em>Table 9.1-1: Critical Pin and Signal Groups</em></div>

<div align="center" markdown>

| Pin / Group | Function / Constraint |
| :--- | :--- |
| Pin 6 PB17 | UART4_TXD, default print/download/debug UART TX. |
| Pin 7 PB16 | UART4_RXD, default print/download/debug UART RX. |
| Pin 25 BOOT_MODE | High: download mode; low: user mode. |
| Pin 26 VDD_3V3 | 3.3V rail, 2.97–3.6V operating range. |
| Pin 27 VDD_1V8 | 1.8V rail, 1.7–1.95V operating range. |
| Pin 29 VDDIO | I/O rail, 1.7–3.6V operating range. |
| Pins 43/44 | AU_DACP / AU_DACN differential DAC outputs. |
| Pin 46 MIC_BIAS | Microphone bias output. |
| Pin 47 MIC_ADC_IN | Analog microphone ADC input. |
| Pins 67–72 PA06–PA11 | Connected to internal Flash by default; unavailable externally. |
| Pin 79 PB13 | SWDIO debug/download. |
| Pin 80 PB15 | SWCLK debug/download. |
| PA50, PA51, PB32, PB35 | Sleep interrupt-capable wake pins. |
| PA00–PA11 | Interface level fixed at 3.3V, independent of VDDIO. |

</div>

## 10. Revision History { #appendix-b-revision-history }

### 10.1. Guide Revision History { #guide-revision-history }

<div align="center"><em>Table 10.1-1: Guide Revision History</em></div>

<div align="center" markdown>

| Version | Date | Notes |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | Initial SF32LB56-MOD module hardware design guide based on DS5602-SF32LB56-MOD V0.3. |

</div>

### 10.2. Source Datasheet Revision History { #source-datasheet-revision-history }

<div align="center"><em>Table 10.2-1: Source Datasheet Revision History</em></div>

<div align="center" markdown>

| Date | Version | Release Notes |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | Updated Chapter 4 audio ADC and DAC descriptions. |
| 2025-02 | 0.2 | Updated module pin and related information. |
| 2025-01 | 0.1 | Draft version. |

</div>
