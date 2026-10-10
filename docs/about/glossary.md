---
icon: lucide/book-a
description: "Quick-reference glossary of embedded, wireless, graphics, and SiFli-specific terms and acronyms used across the μForge.io SF32 documentation."
tags:
    - About
---
# Glossary { #glossary }

Quick reference for acronyms and terms used across the μForge.io site — both general embedded/wireless terminology and SiFli-specific names for the SF32 platform. Entries link to the page where a term is explained in depth; this page is a lookup aid, not a replacement for that context.

## Architecture and Processing { #architecture-and-processing }

* **MCU** — **Microcontroller Unit.** An integrated circuit combining a CPU core, memory, and programmable input/output peripherals, optimized to run dedicated, low-overhead firmware rather than a general-purpose operating system.
* **SoC** — **System on Chip.** An integrated circuit that consolidates all necessary electronic circuits and components of a computer system onto a single substrate. On this site, SF32 parts are categorized as MCUs since they target microcontroller-class firmware rather than a full application-processor OS envelope.
* **Arm Cortex-M33** — A 32-bit Armv8-M mainline processor architecture that SF32 application and Bluetooth cores are built on. Armv8-M mainline supports an optional TrustZone security extension (isolating trusted from non-trusted code/data at the hardware level) versus earlier Cortex-M3/M4 cores, but TrustZone is a configuration choice made per silicon implementation, not a guaranteed feature of every Cortex-M33 — it is not configured on the current SF32LB52x through SF32LB58x parts. See STAR-MC1, below, and the [SF32LB52x chip page](../sf32-products/chips/SF32LB52x.md) for more.
* **STAR-MC1** — A configurable Armv8-M Mainline embedded CPU IP from Arm China, used as the Cortex-M33-class application processor in compatible SF32 devices. Its CU, SP, and SE configurations vary in cache, TCM, XIPU, and TrustZone capability; the feature set exposed by an SF32 part is device-specific. SiFli documentation may use "Arm Cortex-M33 STAR-MC1" or "Arm Cortex-M33" according to context. See the [STAR-MC1 architecture page](../learn/architecture/star-mc1.md).
* **CDE** — **Custom Datapath Extension.** An Arm Custom Instruction mechanism for selected acceleration. Arm China's STAR-MC1 material uses CRC32 as a CDE example; actual SF32 availability and software support must be verified per device.
* **DSP** — **Digital Signal Processor / digital signal processing.** Extensions built into the Cortex-M33 core, used for math-heavy workloads like audio and sensor fusion.
* **MPU** — **Memory Protection Unit.** Hardware that restricts which memory regions code can access, used for fault isolation and security.
* **HAL** — **Hardware Abstraction Layer.** The SDK layer that exposes peripherals through a consistent API independent of the exact chip variant.
* **AI / ML accelerator** — Hardware that accelerates artificial-intelligence or machine-learning workloads, such as inference over a compact neural-network model. Availability is device-specific; use the product selector and target datasheet to confirm the selected part.

## Wireless Connectivity { #wireless-connectivity }

* **BLE** — **Bluetooth Low Energy.** The low-power Bluetooth radio mode most SF32 wearable and IoT products build on.
* **Wi-Fi** — A wireless local-area-network technology. Where an SF32 product documents external Wi-Fi support, the connection is made through its SDIO interface; confirm the exact part, board-level routing, power, and software support before design freeze.
* **Dual-mode Bluetooth** — Support for both BLE and Classic Bluetooth (BR/EDR) on the same radio, used when a product needs both, e.g. audio streaming (Classic or LE Audio) alongside a low-power control channel. Supported on SF32LB52x/56x/57x/58x; SF32LB55x is BLE-only.
* **GAP** — **Generic Access Profile.** The Bluetooth layer governing device roles, advertising, and connection establishment — the foundation every BLE application sits on top of.
* **GATT** — **Generic Attribute Profile.** The Bluetooth layer defining how services and characteristics (the actual data a BLE device exposes) are structured and exchanged.
* **Sibles** — SiFli-SDK's GATT service framework, sitting on top of the standard GAP layer. Most SF32 Bluetooth products start from an existing Sibles-based example rather than building a GATT database from scratch. See the [Bluetooth overview](../learn/bluetooth/overview.md).
* **LE Audio** — The newer Bluetooth Low Energy audio standard, including the LC3 codec and Auracast broadcast-audio modes, as opposed to Classic Bluetooth audio profiles. Supported on SF32LB52x/56x/57x/58x; not supported on SF32LB55x. See [Bluetooth Audio and LE Audio](../learn/bluetooth/processor.md).
* **OTA** — **Over-The-Air** (firmware update). Updating device firmware via a wireless link (typically BLE) instead of a wired connection.
* **DFU** — **Device Firmware Update.** The general mechanism/protocol category that OTA updates over Bluetooth typically implement.

## Graphics and Display { #graphics-and-display }

* **ePicasso** — SiFli's in-house 2D/2.5D graphics acceleration engine for the SF32 family, offloading pixel operations like image copy, blending, scaling, rotation, and layer composition from the application CPU. See the [ePicasso architecture page](../learn/graphics/epicasso-gpu.md).
* **eZip** — SiFli's lossless graphics and general-purpose compression format, with hardware decoding on supported SF32 devices. For graphics, SiFli describes its compression ratio as slightly higher than PNG; for general-purpose data, the ratio varies with the source. Because compressed assets move over the bus before decoding, eZip can reduce external-memory bandwidth from PSRAM and NOR Flash.
* **TurboPixel** — A fixed-ratio lossy final-framebuffer format on supported SF32 parts. extDMA compresses the rendered bitmap into TurboPixel, and the display controller decompresses it to reduce PSRAM bandwidth and PSRAM capacity. See the [TurboPixel framebuffer compression page](../learn/graphics/turbopixel.md).
* **LVGL** — **Light and Versatile Graphics Library.** The open-source embedded UI framework most SF32 products use for their application-level UI, running on top of ePicasso-accelerated rendering.
* **HMI** — **Human-Machine Interface.** Shorthand for the on-device user interface (screen, touch, buttons) as a design category.
* **RGB / DPI display interface** — A parallel display interface that carries pixel color components directly to a compatible panel or display controller. Its formal name is **DPI (Display Pixel Interface)**; “RGB interface” is the common board-design shorthand. It typically uses a pixel clock, horizontal and vertical synchronization signals, and multiple parallel color-data lines. Compared with a serial display interface, DPI uses more GPIOs and requires more careful parallel-trace routing, so confirm the target package’s pin budget and the panel timing requirements.
* **MIPI display interface** — A display interface specified by MIPI Alliance standards, used by compatible higher-bandwidth panels.
* **EPD** — **Electronic Paper Display.** A display technology commonly used for low-power, reflective screens.
* **JDI display interface** — Support for compatible JDI / Sharp Memory-in-Pixel displays, where documented for the selected SF32 device.

## Audio { #audio }

* **ADC / DAC** — **Analog-to-Digital / Digital-to-Analog Converter.** The audio front-end and output paths on SF32 parts with integrated audio capability. Dedicated audio ADC/DAC is available on SF32LB52x/56x/57x/58x; SF32LB55x lacks a dedicated audio ADC/DAC.
* **PDM** — **Pulse-Density Modulation.** A common digital microphone interface format supported alongside I2S on SF32 audio-capable parts. A PDM interface is not the same thing as one microphone: one interface can normally connect up to two digital microphones, which share the clock and use opposite clock edges to identify their left and right channels. Specify and compare PDM interface counts rather than microphone counts.
* **I2S** — **Inter-IC Sound.** A standard digital audio interface for connecting codecs, DACs, or other audio peripherals.

## Power and Reliability { #power-and-reliability }

* **PMU** — **Power Management Unit.** The integrated block handling voltage regulation (BUCK/LDO outputs) inside SF32 chips; some designs pair it with an external SiFli PMIC (e.g. SF30147C) for additional power rails.
* **PMIC** — **Power Management IC.** A dedicated external chip providing additional regulated power rails beyond what the MCU's internal PMU supplies.
* **LDO** — **Low-Dropout regulator.** A linear voltage regulator type, one of the internal PMU output stages on SF32 parts.
* **BUCK** — A switching (non-linear) voltage regulator topology, more efficient than an LDO at higher current, also integrated into the SF32 PMU.
* **TRNG** — **True Random Number Generator.** A hardware entropy source, drawing on physical thermal noise, used for cryptographic key generation and security features.
* **PSA** — **Platform Security Architecture.** Arm's security framework and certification scheme. Some SF32 chip pages list **PSA Certified Level 1**; verify the certification status and level for the exact part in its official documentation rather than assuming they apply uniformly across the family.

## Storage and Memory { #storage-and-memory }

* **SRAM** — **Static RAM.** The fast on-chip working memory used for running application code and data.
* **PSRAM** — **Pseudo-Static RAM.** Higher-capacity external memory (often System-in-Package on SF32 modules) used to extend beyond on-chip SRAM for graphics buffers and larger applications.
* **NOR / NAND Flash** — Two non-volatile flash memory types used for firmware and asset storage; NOR supports fast random reads and is common for direct code execution (XiP, Execute-in-Place), while NAND/SD-NAND trades random-access speed for much higher density, suited to bulk storage of images, fonts, and logs.
* **OPI / QPI / QSPI** — **Octal/Quad Peripheral (or Serial Peripheral) Interface.** The pin-count/bandwidth class of the flash or PSRAM interface (Quad = 4 data lines, Octal = 8), affecting achievable memory bandwidth.
* **eMMC** — **Embedded MultiMediaCard.** A managed NAND flash storage interface used on higher-storage SF32 designs.

## Peripherals and Interfaces { #peripherals-and-interfaces }

* **GPIO** — **General-Purpose Input/Output.** Configurable digital pins used for simple signaling, buttons, LEDs, and bit-banged interfaces.
* **I/O** — **Input/Output.** A general term for the pins and peripheral signals through which a device exchanges data or control signals with the rest of a system.
* **UART** — **Universal Asynchronous Receiver/Transmitter.** The standard serial interface used for console/debug output and simple point-to-point communication.
* **SPI** — **Serial Peripheral Interface.** A synchronous serial bus used for displays, flash, sensors, and other high-speed peripherals.
* **I2C** — **Inter-Integrated Circuit.** A synchronous, multi-drop serial bus commonly used for sensors and low-speed peripheral configuration.
* **SDIO** — **Secure Digital Input Output.** A host interface used by documented SF32 designs to connect an external Wi-Fi device.
* **DCMI** — **Digital Camera Module Interface.** A parallel camera interface for connecting a compatible image sensor.
* **FreeIO** — SiFli's flexible GPIO-assignment capability, which allows supported signals to be mapped to suitable GPIOs within the device's documented constraints.
* **PTM** — **Peripheral Task Machine.** A SiFli hardware feature for deterministic peripheral-task handling on supported devices.
* **RTC** — **Real-Time Clock.** A timekeeping peripheral that can keep running (or wake the system) independent of the main application clock domains.

## Hardware and Manufacturing { #hardware-and-manufacturing }

* **QFN** — **Quad Flat No-lead package.** The chip package type SF32 parts ship in, described by pin count and body size (e.g. QFN68).
* **BGA** — **Ball Grid Array package.** A package with solder balls arranged beneath the device, enabling a compact footprint and higher pin count but requiring BGA-capable PCB escape routing and assembly.
* **BOM** — **Bill of Materials.** A formal, itemized list of components, passives, and mechanical hardware required to manufacture a printed circuit board assembly (PCBA); a major reason to prefer SiFli-recommended parts and modules is BOM complexity reduction.
* **EDA** — **Electronic Design Automation.** Schematic-capture, SPICE-simulation, and PCB-layout software category. [See the EDA tool libraries page](../hardware/cad-components/eda-tool-libraries.md) for SF32-specific footprints/symbols.
* **AVL** — **Approved Vendor List.** SiFli's qualified second-source component list (crystals, regulators, flash, etc.) verified against SF32 hardware designs' electrical tolerances. [See the approved vendor list page](../hardware/cad-components/sifli-approved-vendor-list.md).
* **EVB** — **Evaluation Board.** A SiFli-issued SF32 reference/development board used to bring up and validate designs before custom hardware exists.
* **FAE** — **Field Application Engineer.** SiFli's technical support contact for hardware design questions beyond what public documentation covers.

## Software and Tools { #software-and-tools }

* **SiFli-SDK** — SiFli's primary firmware development kit for SF32 parts; the reference/vendor SDK most production firmware is built on.
* **SiFli CodeKit** — A VS Code extension for SiFli-SDK development, guiding project creation, configuration, build, flash, and monitor workflows without requiring the raw command-line toolchain.
* **RTOS** — **Real-Time Operating System.** The class of OS (deterministic scheduling, low overhead) SF32 firmware typically runs, whether via SiFli-SDK's own RTOS integration or Zephyr.
* **sftool** — SiFli's command-line flashing/recovery utility for SF32 boards, including brick recovery for boards that fail to boot.
