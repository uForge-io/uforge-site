---
icon: lucide/book-check
hide:
    - navigation
description: "Hardware design guide for the SF32LB52-MOD-1 Bluetooth MCU module: power, interfaces, and PCB integration guidance."
tags:
    - Hardware
    - Module
---

# SF32LB52-MOD-1 Hardware Design Guide

## 1. Overview

**SF32LB52-MOD-1** is a certified, general-purpose low-power Bluetooth MCU module built on SiFli's SF32LB525UC6 chip (Arm Cortex-M33 STAR-MC1 dual-core, up to 240MHz). It integrates a 48MHz crystal, an optional 32.768kHz crystal, and an optional in-package 64Mb OPI-PSRAM die into a single 27.9 × 18.0 × 3.1mm surface-mount package with 68 pins.

This guide covers module-level hardware integration: pin definitions, peripheral interfaces, electrical characteristics, power-supply requirements, reference schematics, a schematic design checklist, mechanical dimensions and PCB footprint, and product handling requirements. It is based on SiFli datasheet **DS5203-SF32LB52-MOD-1 V0.3**.

For the underlying chip architecture (cores, graphics, memory subsystem, and peripherals in more depth), see [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) and the [SF32LB52x Hardware Design Guide](../chip-guides/SF32LB52x_hardware_design_guide.md).

!!! note "Source and figure handling"
    This guide follows **DS5203-SF32LB52-MOD-1 V0.3** for module-specific technical data. Some pinout, schematic, and mechanical drawings in the datasheet are raster images and are referenced rather than redrawn here. Figure and table numbers below follow this site's guide-local numbering; captions for non-reproduced diagrams cite the corresponding figure number in the official datasheet.

## 2. Quick Design Summary

### 2.1 Module Variant

<div align="center"><em>Table 2.1-1: Module Variant</em></div>

<div align="center" markdown>

| Module Code | Flash | PSRAM | Temperature | Dimensions (mm) |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16MB QSPI-NOR | 8MB OPI-PSRAM | -40~85°C | 27.9 × 18.0 × 3.1 |

</div>

### 2.2 Key Specifications

<div align="center"><em>Table 2.2-1: Key Specifications</em></div>

<div align="center" markdown>

| Item | Specification |
| :--- | :--- |
| Application core (HCPU) | Arm Cortex-M33 STAR-MC1, up to 240MHz, 512KB SRAM |
| Low-power core (LCPU) | Arm Cortex-M33 STAR-MC1, up to 24MHz, 64KB SRAM |
| Wireless | Dual-mode Bluetooth 5.3 with BLE Audio |
| Graphics | ePicasso 2.0 2D/2.5D engine, up to 512×512, eZip 2.0 lossless decompression |
| Audio | 1x 24-bit audio DAC, 1x 24-bit audio Sigma-Delta ADC |
| Storage | Optional in-package OPI-PSRAM (144MHz); 1x external MPI (QSPI); 1x SD/SDIO/eMMC |
| Package | 68-pin, 27.9 × 18.0 × 3.1mm |
| Power supply | VSYS 3.2–4.7V (Li-ion) or 3.7–4.7V (DCDC/LDO, 3.8V recommended) |
| Antenna | PCB on-board antenna, or external via IPEX connector (per part number) |
| Operating temperature | -40 to 85°C |

</div>

## 3. Functional Block Diagram

The module integrates the SF32LB525UC6 chip, a 48MHz crystal, an optional 32.768kHz crystal, and — on this SKU — an in-package 64Mb OPI-PSRAM die, alongside the RF matching network and antenna feed.

!!! info "Figure 3-1: Functional Block Diagram"
    See Figure 2-1 in the official datasheet for this diagram — not reproduced in this guide.

## 4. Pin Definition

### 4.1 Pinout Diagram

The module exposes 68 pins around its perimeter. Pin 1 is marked at the corner near the antenna zone; pins are numbered counter-clockwise around the package.

!!! info "Figure 4.1-1: Pinout Diagram, Top View"
    See Figure 3-1 in the official datasheet for this diagram — not reproduced in this guide.

### 4.2 Pin Definition Table

The module has 68 pins in total, described in the table below.

<div align="center"><em>Table 4.2-1: Pin Definition Table</em></div>

<div align="center" markdown>

| Name | No. | Type | Default MUX | Default I/O | Function |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | Ground | P | Ground |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44, PA44_I2C_UART, PA44_TIM, #WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43, PA43_I2C_UART, PA43_TIM, LCDC1_JDI_G2, LCDC1_8080_DIO7, #WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42, PA42_I2C_UART, PA42_TIM, LCDC1_JDI_R2, LCDC1_8080_DIO6, #WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_DATA, PA23_I2C_UART, PA23_TIM, #XTAL32K_XO — *if the module's internal 32K crystal is populated, PA23 is not available externally* |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM1_CLK, PA22_I2C_UART, PA22_TIM, #XTAL32K_XI — *if the module's internal 32K crystal is populated, PA22 is not available externally* |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41, PA41_I2C_UART, PA41_TIM, LCDC1_JDI_HCK, LCDC1_8080_DIO5, #WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40, SPI2_CS, PA40_I2C_UART, PA40_TIM, LCDC1_JDI_XRST, LCDC1_8080_DIO4, #WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39, SPI2_CLK, PA39_I2C_UART, PA39_TIM, LCDC1_JDI_VCI, LCDC1_8080_DIO3, #WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38, SPI2_DI, PA38_I2C_UART, PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37, SPI2_DIO, PA37_I2C_UART, PA37_TIM, LCDC1_8080_DIO2, #WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36, #USB11_DM, PA36_I2C_UART, PA36_TIM, #WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35, #USB11_DP, PA35_I2C_UART, PA35_TIM, #WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34, PA34_I2C_UART, PA34_TIM, #GPADC_CH7, #WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33, PA33_I2C_UART, PA33_TIM, #GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32, PA32_I2C_UART, PA32_TIM, #GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | 3.3V power output |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24, SPI1_DI, I2S1_MCLK, PA24_I2C_UART, PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25, SPI1_DI, I2S1_SDO, PA25_I2C_UART, PA25_TIM, #XTAL32K_EXT, #WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26, PA26_I2C_UART, PA26_TIM, #WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27, PA27_I2C_UART, PA27_TIM, #WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28, SPI1_CLK, I2S1_SDI, PA28_I2C_UART, PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29, SPI1_CS, I2S1_BCK, PA29_I2C_UART, PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30, I2S1_LRCK, PA30_I2C_UART, PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31, PA31_I2C_UART, PA31_TIM, #GPADC_CH4 |
| GND | 26 | P | Ground | P | Ground |
| VSYS | 27 | P | VSYS | P | Main power input. Li-ion battery supply range 3.2–4.7V; when supplied through a DCDC/LDO (non-Li-ion), range is 3.7–4.7V, 3.8V recommended |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20, PA20_I2C_UART, PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK, PA19_I2C_UART, PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO, PA18_I2C_UART, PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11, PA11_I2C_UART, PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10, PA10_I2C_UART, PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | Audio DAC differential output, positive |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | Audio DAC differential output, negative |
| GND | 35 | P | Ground | P | Ground |
| MIC_BIAS | 36 | P | MIC_BIAS | P | Microphone bias voltage |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | Analog audio input |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09, PA09_I2C_UART, PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA, PA08_I2C_UART, PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK, PA07_I2C_UART, PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK, PA06_I2C_UART, PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK, PA05_I2C_UART, PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI, PA04_I2C_UART, PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO, PA03_I2C_UART, PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK, PA02_I2C_UART, PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01, PA01_I2C_UART, PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB, PA00_I2C_UART, PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | Ground | P | Ground (13 pins) |
| VBATS | 61 | P | VBAT | P | Battery voltage detection input |
| NC | 62 | — | NC | — | Not connected |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD, PA15_I2C_UART, PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0, PA16_I2C_UART, PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1, PA17_I2C_UART, PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK, PA14_I2C_UART, PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3, PA13_I2C_UART, PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2, PA12_I2C_UART, PA12_TIM |

</div>

*Legend: P = power; I = input; O = output; T = can be configured as high-impedance; AO = audio output; AI = audio input.*

!!! note
    Pin 29 (DBG_UART_TXD) and pin 30 (DBG_UART_RXD) are the default log, program-debug, and program-download port.

### 4.3 Physical Pin Description

The datasheet's physical pin description figure groups pins by function family — SDIO, SPI, I2C, UART, GPTIM, LCD interface, GPADC, MPI, analog audio, external 32K oscillator, external wake-up, and SWD/debug UART — overlaid on the SF32LB525UC6 die outline. Use it alongside the pin definition table above when laying out signal groups on the host PCB.

!!! info "Figure 4.3-1: Physical Pin Description"
    See Figure 3-2 in the official datasheet for this diagram — not reproduced in this guide.

## 5. Peripherals

### 5.1 Communication Interfaces

Any pin marked `PAxx_I2C_UART` in the table above can be configured as either I2C or UART. The datasheet states a configurable maximum of 4 I2C interfaces and 3 UART interfaces.

!!! important "Peripheral-count discrepancy in the datasheet"
    The same datasheet later enumerates I2C1–I2C7 and UART1–UART6. These lists conflict with its stated maxima of 4 I2C and 3 UART interfaces. Confirm the usable peripheral count for the exact module/SoC configuration with SiFli; do not treat the enumerated controller numbers as proof that all are simultaneously available.

**UART** — Full-duplex, up to 6Mbps baud rate, configurable data format, hardware flow control (CTS/RTS), DMA multi-packet TX/RX. UART1–3 are on HPSYS; UART4–6 are on LPSYS.

**I2C** — Master and Slave capable, 8-byte FIFO, DMA support, standard (100kbps), fast (400kbps), fast-mode-plus (1Mbps), and high-speed (3.4Mbps) modes, 7-bit/10-bit addressing as Master, configurable digital de-glitch filter. I2C1–4 are on HPSYS; I2C5–7 are on LPSYS.

**SPI** — Supports SSP/SPI (full duplex, Master or Slave) and Microwire (half duplex, Master only) formats. 4–32-bit data width, configurable clock polarity/phase (SPO/SPH), configurable chip-select polarity, 32-bit × 16-entry FIFO, DMA support, up to 48MHz clock.

**USB2.0 FS** — One full-speed Host/Device port with configurable endpoints, suspend/resume, dynamic FIFO sizing, session request and host negotiation protocol support, and an integrated USB2.0 FS PHY.

**MPI (Memory Peripheral Interface)** — Supports SPI NOR Flash (1/2/4-line) and SPI NAND Flash (1/2/4-line), register-mode and memory-mapped-mode access with automatic hardware switching. The module's MPI2 interface can connect external SPI NOR/NAND Flash. If Flash is already populated inside the module, MPI2's six external signals (PA12, PA13, PA14, PA15, PA16, PA17) are unavailable externally.

**SD/SDIO/eMMC** — Compliant with SD 3.0, SDIO 3.0, and eMMC 4.5.1; supports SDSC/SDHC/SDXC/SDHS cards, SDR12/25/50, single-line and 4-line SDR modes, 2KB FIFO, DMA data movement, up to 48MHz (no DDR). Note: the SDIO interface shares IO with MPI2 — the two cannot be used simultaneously.

**I2S** — Master/Slave, full-duplex, left-justified/right-justified/standard formats, 8-bit and 16-bit mono/stereo, up to 24-bit PCM width.

**LCD Interface** — DBI serial SPI mode (3-line/4-line, dual/quad data line) and parallel 8080 mode (8/16/24-bit bus width). Supports RGB332/RGB444/RGB565/RGB666/RGB888 color formats depending on mode.

### 5.2 Analog Signal Processing

**12-bit GPADC** — SAR ADC, 4MS/s max sample rate, 0–3.3V single-ended / ±2.1V differential input range, 7 single-ended channels + 1 battery-voltage channel (or 3 differential pairs), single/continuous measurement modes, 4 configurable time-slots per measurement, software/hardware trigger, DMA support.

**Temperature Sensor** — 0.2°C resolution, -40°C to 125°C range, ±3°C accuracy, polling or interrupt read-out.

**Audio DAC** — One 24-bit DAC output path, 8kHz–48kHz sample rates, differential output.

**Audio PLL** — Fractional-N clock generation with 48MHz/2^18 resolution, supporting 48MHz, 32.768kHz, and 44.1kHz derived sample rates.

**Audio ADC** — One 24-bit Sigma-Delta ADC input path, 8kHz–48kHz sample rates.

## 6. Electrical Characteristics

### 6.1 Absolute Maximum Ratings

Exceeding the values in the table below may permanently damage the module. These are stress ratings only; functional operation beyond the recommended operating conditions in §6.2 is not implied. Prolonged exposure to absolute-maximum conditions may reduce module reliability.

<div align="center"><em>Table 6.1-1: Absolute Maximum Ratings</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Max | Unit |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | Supply pin voltage | -0.3 | 4.7 | V |
| Tstore | Storage temperature | -40 | 125 | °C |

</div>

### 6.2 Recommended Operating Conditions

<div align="center"><em>Table 6.2-1: Recommended Operating Conditions</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | Li-ion battery supply | 3.2 | - | 4.7 | V |
| VSYS | Non-Li-ion supply via DCDC/LDO | 3.7 | 3.8 | 4.7 | V |
| TA | Operating temperature | -40 | - | 85 | °C |

</div>

### 6.3 DC Electrical Characteristics (3.3V, 25°C)

<div align="center"><em>Table 6.3-1: DC Electrical Characteristics (3.3V, 25°C)</em></div>

<div align="center" markdown>

| Symbol | Parameter | Min | Typ | Max | Unit |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | Pin capacitance | 2.5 | 3 | 3.5 | pF |
| VIH | Input high voltage | 0.7×VDD | - | VDD | V |
| VIL | Input low voltage | VSS | - | 0.3×VDD | V |
| IIH | Input high current | - | 10 | 40 | nA |
| IIL | Input low current | - | 10 | 40 | nA |
| VOH | Output high voltage (high-Z load) | 0.8×VDD | - | VDD | V |
| VOL | Output low voltage (high-Z load) | VSS | - | 0.2×VDD | V |
| IOH | Output high drive current | 24 | 30 | 38 | mA |
| IOL | Output low drive current | 24 | 30 | 38 | mA |
| RPU | Internal pull-up (Vpad=0.8×VDD) | 7 | 10 | 20 | kΩ |
| RPD | Internal pull-down (Vpad=0.2×VDD) | 7 | 10 | 20 | kΩ |
| VIH_nRST | Reset release voltage | 0.7×VDD | - | VDD | V |
| VIL_nRST | Reset assert voltage | VSS | - | 0.3×VDD | V |

</div>

VDD is the I/O supply rail; VOH/VOL are measured under high-impedance load.

### 6.4 Power Consumption

<div align="center"><em>Table 6.4-1: Bluetooth and BLE Average Current (3.8V Supply)</em></div>

<div align="center" markdown>

| Mode | Interval | @0dBm | @4dBm | @10dBm | Unit |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50ms | 129.5 | 135.6 | 160.9 | µA |
| BT Sniff (attempt=1) | 1s | 6.0 | 6.3 | 7.6 | µA |
| BLE ADV | 50ms | 171.6 | 217.6 | 298.3 | µA |
| BLE ADV | 1s | 8.9 | 9.5 | 17.0 | µA |
| BLE Connection | 50ms | 95.0 | 105.0 | 118.7 | µA |
| BLE Connection | 1s | 4.1 | 4.6 | 9.1 | µA |
| Scan (Inquiry or Page) | — | 33.4 | — | — | µA |
| Both Scan | — | 67.3 | — | — | µA |
| Sleep | — | 20.0 | — | — | µA |

</div>

<div align="center"><em>Table 6.4-2: Processor Power Consumption (3.8V Supply)</em></div>

<div align="center" markdown>

| Clock | Current (µA) | Increment (µA/MHz) |
| :--- | :-: | :-: |
| CoreMark @192MHz | 7360 | 35 |
| CoreMark @48MHz | 1550 | 27 |
| WhileLoop @192MHz | 5490 | 27 |
| WhileLoop @48MHz | 1250 | 20 |

</div>

### 6.5 Dual-Mode Bluetooth RF Performance

Supports Bluetooth 5.3, backward compatible with 4.2/4.1/4.0. Operating channel center frequency: 2402–2480 MHz.

**BLE transmitter (1Mbps)**: max power 19dBm, power control range -20 to 19dBm, Δf1avg = 250kHz typ and Δf2max = 210kHz typ. These are frequency-deviation values (the datasheet labels the entries maximum/minimum modulation), not a dimensionless modulation index. Initial carrier frequency tolerance is ±20kHz typ.

**BLE receiver (1Mbps)**: sensitivity -100dBm (dirty off) / -99.3dBm (dirty on) @30.8% PER, co-channel C/I 7dB.

**Classic BT (Basic Data Rate)**: max transmit power 18dBm; receiver sensitivity -96.3dBm (dirty off) / -94dBm (dirty on) @0.1% BER.

**Classic BT (Enhanced Data Rate)**: max transmit power 13dBm; π/4-DQPSK receiver sensitivity -95.5dBm; 8DPSK receiver sensitivity -88.5dBm.

Full min/typ/max tables for all BLE 1Mbps/2Mbps TX/RX performance and Classic BT BR/EDR TX/RX performance are provided in §5.5 of the official datasheet.

## 7. Module Power Supply

The module has a single main power input, **VSYS**, which can be supplied directly from a Li-ion/Li-Po battery (3.2–4.7V) or from a DCDC/LDO regulator (3.7–4.7V, 3.8V recommended).

**VBATS** is the battery-voltage sense pin, sampled internally by an ADC over a 0–4.7V range. Do not use an external resistor divider on VBATS — connect the signal to be measured directly to the pin.

**VDD33_VOUT2** is the output of the module's internal 3.3V LDO and can supply up to 150mA to external peripherals; the total capacitance on this rail must not exceed 7.4µF.

## 8. Reference Schematic and Pin Assignment

The datasheet provides a complete reference schematic for a SF32LB52-MOD-1-based development board, covering power supply, reset, JTAG/SWD, UART, SDIO, LCD, and audio circuits.

!!! info "Figure 8-1: Development Board Reference Schematic"
    See Figures 7-2–7-6 in the official datasheet for this diagram — not reproduced in this guide.

The datasheet also provides a recommended pin-assignment table for that reference board.

!!! info "Figure 8-2: Recommended Pin Assignment for the Reference Board"
    See Figure 7-7 in the official datasheet for this diagram — not reproduced in this guide.

Use these as the starting point for a production schematic and adapt pin selection to your product's specific peripheral mix.

## 9. Schematic Design Checklist

<div align="center"><em>Table 9-1: Schematic Design Checklist</em></div>

<div align="center" markdown>

| # | Check Point |
| :-: | :--- |
| 1 | VSYS can connect directly to a Li-ion battery; if supplied via DCDC/LDO, 3.8V is recommended. VBATS is the battery-voltage sense pin (0–4.7V range) — do not use an external resistor divider; connect the signal to be measured directly to VBATS. |
| 2 | Place one 4.7µF and one 0.1µF capacitor near the VSYS pin. |
| 3 | Place one 0.1µF capacitor near the VBATS pin. |
| 4 | VDD33_VOUT2 is the 3.3V LDO output, max current 150mA — do not exceed this with external load. |
| 5 | Total capacitance on VDD33_VOUT2 must be ≤ 7.4µF. |
| 6 | The module's IO interface level is 3.3V — any peripheral connected must also use 3.3V logic levels. |
| 7 | If the module has an internal 32K crystal populated, PA22 and PA23 are not available externally. |
| 8 | If Flash is already populated inside the module, the 6 MPI2 signals (PA12, PA13, PA14, PA15, PA16, PA17) are not available externally. |
| 9 | The SDIO interface and MPI2 share IO and cannot be used simultaneously. |
| 10 | Pins marked `#GPADC_CHx` in the pin table support analog input in the 0–3.3V range. |
| 11 | Pins marked `PAxx_TIM` in the pin table support PWM output. |
| 12 | PA34 supports a 10-second long-press reset, active high; add a 10kΩ pull-down resistor in the design. |
| 13 | Reserve ESD protection components for the battery and touch-panel (TP) interfaces, and other externally exposed interfaces where needed. |
| 14 | PA18/PA19, multiplexed as DBG_UART for programming/debug, should each have a 100Ω series resistor. |

</div>

## 10. Module Dimensions and PCB Footprint

### 10.1 Module Dimensions

The module measures 27.9 × 18.0 × 3.1mm.

!!! info "Figure 10.1-1: Module Dimensions — Top, Side, and Bottom Views"
    See Figure 8-1 in the official datasheet for this diagram — not reproduced in this guide.

### 10.2 Recommended PCB Footprint

!!! info "Figure 10.2-1: Recommended PCB Footprint"
    See Figure 8-2 in the official datasheet for this diagram — not reproduced in this guide.

### 10.3 External Antenna Connector

For SKUs supporting an external antenna, the module uses a first-generation connector footprint compatible with:

- Hirose U.FL series
- I-PEX MHFI connectors
- Amphenol AMC connectors

!!! info "Figure 10.3-1: External Antenna Connector Dimensions"
    See Figure 8-3 in the official datasheet for this diagram — not reproduced in this guide.

### 10.4 Module Placement in PCB Design

If the end product uses an on-board module design, reserve space so that no other components or metal areas overlap the module's PCB antenna zone, to avoid degrading radiation efficiency. Plan the module's position on the host board to minimize impact on antenna performance.

Recommended practice:

- Extend the module's antenna area past the host board edge, with the feed point close to the board edge.

!!! info "Figure 10.4-1: Recommended Module Placement"
    See Figure 8-4 in the official datasheet for this diagram — not reproduced in this guide.

- If the antenna cannot extend past the board edge, provide a keepout zone of at least 15mm around the PCB antenna — no copper pour, traces, or components — and cut away the host board material beneath the antenna where possible.

!!! info "Figure 10.4-2: Antenna Keepout Zone"
    See Figure 8-5 in the official datasheet for this diagram — not reproduced in this guide.

- Keep the antenna feed point close to the board edge even in the keepout-zone layout.
- For full end-product designs, evaluate the enclosure's effect on the antenna and perform RF validation, including a final communication-range test on the finished product.

## 11. Product Handling

### 11.1 Storage Conditions

- Store products sealed in a moisture barrier bag (MBB) at <40°C / 90%RH, non-condensing.
- Module moisture sensitivity level (MSL): 3.
- After opening the vacuum bag, use the module within 168 hours at 25±5°C / 60%RH; otherwise, bake it before returning it to the production line.

### 11.2 Electrostatic Discharge (ESD)

- Human Body Model (HBM): ±2000V
- Charged Device Model (CDM): ±500V

### 11.3 Reflow Profile

The module is recommended to go through reflow only once.

!!! info "Figure 11.3-1: Recommended Reflow Temperature Profile"
    See Figure 9-1 in the official datasheet for this diagram — not reproduced in this guide.

### 11.4 Ultrasonic Vibration

Avoid exposing SiFli modules to vibration from ultrasonic welding or ultrasonic cleaning equipment. Ultrasonic vibration can resonate with the module's internal crystal oscillators, causing crystal failure or malfunction, and may render the module inoperable or degrade its performance.

## 12. Related Documents

- [DS5203-SF32LB52-MOD-1 Datasheet (V0.3)](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [SF32LB52x Chip Introduction](../../sf32-products/chips/SF32LB52x.md)
- [SF32LB52x Hardware Design Guide](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. Revision History

<div align="center"><em>Table 13-1: Revision History</em></div>

<div align="center" markdown>

| Date | Version | Notes |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | Updated Figure 2-1 |
| 2025-03 | 0.2 | Revised power-related descriptions; updated Figures 3-1 and 6-3 |
| 2024-12 | 0.1 | Draft version |

</div>

This guide is based on the datasheet content above; refer to the official PDF for the authoritative and most current revision.
