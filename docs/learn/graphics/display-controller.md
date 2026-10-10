---
icon: lucide/monitor
description: "How the SF32 display controller transfers prepared pixels to a panel, including interface selection, flush paths, partial refresh, and panel bring-up."
tags:
  - Graphics
---

# Display Controller { #display-controller }

## Overview { #overview }

The **display controller** (LCDC) transfers prepared pixels to the panel through the selected interface. On supported devices and configurations, it also decompresses a TurboPixel framebuffer during output. LCDC supports limited alpha blending of its output layers over a single-color background; the documented layer set is layer 0 plus layer 1, with layer 1 unavailable on SF32LB52x. This is not a replacement for general UI rendering or ePicasso composition. eZip asset decoding remains a separate operation.

Primary reference: [SiFli LCDC HAL documentation](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/lcdc.md).

The link above is pinned to a specific SiFli-SDK commit. It documents HAL behavior at that revision; it does not establish that every interface, layer, or feature is available on every SF32 device or package, or in other SDK versions. Verify the exact device, package, and SDK release used by the project.

See [Graphics Overview](overview.md#sf32-graphics-flow) for the complete resource-to-panel flow. This article focuses on the controller, panel connection, and driver integration.

Read this page when choosing a panel interface, defining an LVGL flush path, or bringing a new panel up on hardware. It separates controller-output work from asset decoding and pixel composition, so display problems can be isolated at the right layer.

## Select the Display Interface { #select-the-display-interface }

EPD and Memory-in-Pixel describe panel technologies or update behavior, not interchangeable bus standards. An EPD module may use SPI to an external controller; an LCDC direct-EPD mode is also documented for SF32LB57x. JDI has serial and parallel interface modes with different signals. Match the panel's electrical interface and maintenance requirements, not just its display category.

The panel choice affects bandwidth, buffer strategy, pin use, power, initialization complexity, and PCB risk. Confirm the exact interface list for the selected device and package.

<div align="center"><em>Display Interface and Panel-Technology Options</em></div>

<div align="center" markdown>

| Interface or Panel Type | Typical Use | Design Notes |
|:---|:---|:---|
| **3-line / 4-line SPI** | Small TFT or AMOLED panels, simple HMIs | Low pin count and simple routing, but limited bandwidth for full-screen animation. |
| **Dual-SPI / Quad-SPI** | Wearable AMOLED and compact displays | Better bandwidth than basic SPI while keeping pin count moderate. |
| **8080 MCU interface** | Parallel display panels | Higher bandwidth than serial SPI, but uses more pins. |
| **RGB / DPI** | Larger or higher-refresh displays | Continuous pixel stream, higher bandwidth and pin use, and stricter timing. |
| **MIPI DSI** | High-density AMOLED or advanced panels | High bandwidth with few pins, but more complex initialization and signal integrity. |
| **EPD panel technology** | E-paper and ultra-low-refresh displays | The host interface depends on the module and controller. A static image may be held with low panel power; updates are slow and require panel-specific waveform and power control. |
| **JDI (serial or parallel)** | Low-power reflective panels | JDI modes use different signals; verify the selected panel's electrical interface and maintenance requirements. |
| **Memory-in-Pixel panel technology** | Low-power reflective displays, including always-on or sunlight-readable UI | Pixel memory is integrated into the panel; refresh behavior differs from TFT/AMOLED. Follow the panel datasheet. |

</div>

For example, a small SPI/QSPI panel can favor partial updates, while an RGB/DPI panel needs a sustained scanout bandwidth budget. Do not select an interface from theoretical throughput alone: include pixel format, resolution, refresh behavior, panel GRAM, and other PSRAM users.

## Per-Device Interface Matrix { #per-device-interface-matrix }

The matrix below is a family-selection aid, not a pin-assignment table. It reflects the documented display interfaces for the listed SF32 family or silicon variant. A dash means the interface is not documented for that row; it does not rule out a GPIO-driven external controller or a board-specific implementation. Always confirm the exact order code, package, pin mux, SDK release, and panel driver before committing a schematic.

<div align="center"><em>SF32 Display-Interface Matrix</em></div>

<div align="center" markdown>

| SF32 Family / Variant | Documented LCD / Panel Interfaces | Package or Variant Constraint | Practical Selection Direction |
|:---|:---|:---|:---|
| **SF32LB52x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080 (MIPI DBI), serial/parallel JDI; SPI-connected EPD; an 8-bit parallel EPD signal interface is also documented for SF32LB52B/D/E/G/J | The listed 52x models use QFN68L. The hardware guide lists signal assignments and TPS PMIC control for 52B/D/E/G/J; this does not establish support for the LCDC direct-EPD mode. Verify the driver and exact variant. | Compact SPI/QSPI, 8080, and JDI designs; for parallel EPD, verify the GPIO/timing and TPS power-control implementation for the selected variant. |
| **SF32LB55x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, serial/parallel JDI, MIPI DSI command mode | The documented 2-lane MIPI DSI interface is available on BGA145/169 packages; JDI and MIPI DSI + SPI/DSPI dual-display operation are listed only for 557VD3A6. Command mode requires a panel controller with internal SRAM/GRAM. | Wearable and connected-display products using a compatible BGA package and a MIPI command-mode panel. |
| **SF32LB56xU** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, serial JDI | The listed U variants use QFN68L; confirm the exact order code and pin mux. | Compact serial-panel designs where QSPI bandwidth and lower pin count are priorities. |
| **SF32LB56xV** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, DBI 8080, DPI/RGB, serial/parallel JDI | The listed V variants use WBBGA175 (BGA175 in the chip model guide); confirm the required pins and board routing for the exact order code. | Higher-resolution or higher-refresh designs that need 8080, DPI/RGB, or parallel JDI. |
| **SF32LB57x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, 8-/16-bit 8080/DBI, DPI/RGB, JDI, and direct EPD | Package options include QFN68L, QFN80L, and BGA112; confirm the exact order code, exposed pins, and selected panel-driver path. | Graphics-rich designs with broad parallel, serial, JDI, or EPD display requirements. |
| **SF32LB58x** | 3-/4-wire SPI, Dual-SPI, Quad-SPI, MCU/8080, DPI/RGB, serial/parallel JDI, 2-lane MIPI DSI command and video modes | The listed order codes use BGA256. Command mode uses a panel controller with internal SRAM/GRAM; video mode also supports RAM-less panel controllers. The model guide also lists MIPI DSI + SPI/DSPI/QSPI for dual displays. Confirm the LCD controller and pin mux for the exact design. | High-resolution and bandwidth-demanding UI designs, including dual-display configurations and MIPI DSI panels with or without controller RAM. |

</div>

For **SF32LB56x**, do not treat the U and V entries as interchangeable. For **SF32LB55x** and **SF32LB58x**, do not reserve MIPI DSI in a schematic until the exact package, its DSI pins, and the panel's lane/mode requirements are all confirmed. In particular, SF32LB55x is command-mode only, so a RAM-less video-mode panel is not a valid match. EPD designs also require panel-specific timing, waveform, and power planning; an interface label alone is not a complete EPD design.

The SiFli chip model guide lists DPI/RGB among SF32LB55x family-level interfaces, but its per-order-code table does not assign DPI to the listed SKUs. Treat this as family-level evidence only; confirm DPI support and pin availability for the exact order code before relying on it. The U/V split for SF32LB56x follows the separate hardware application guides rather than the family-wide HAL table.

The two SF32LB52x hardware guides are inconsistent about JDI: their overviews list serial JDI, while their detailed JDI sections show parallel signal mappings. The matrix retains both documented claims, but this is not a pin-level guarantee. Verify the exact variant, LCDC mapping, SDK/driver, and panel signals before committing the design.

For SF32LB52x, distinguish the documented 8-bit parallel EPD signal interface from LCDC direct-EPD mode. The SF32LB52B/D/E/G/J hardware guide lists the parallel EPD signals and TPS PMIC controls; separately, the SiFli SDK v2.5.1 release notes document LCDC direct-EPD support for SF32LB57x. Do not infer that a 52x design can use the 57x LCDC direct-EPD path; verify the driver and timing implementation for the exact variant.

Interface sources: [SiFli chip model guide](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html), [SF32LB52x battery-powered hardware guide](https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html), [SF32LB52B/D/E/G/J hardware guide](https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html), [SF32LB55x](https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html), [SF32LB56xU](https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html), [SF32LB56xV](https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html), [SF32LB58x](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html), and [SF32LB57x SDK support](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1).

## Controller, Buffers, and Flush Paths { #controller-buffers-and-flush-paths }

The LCDC reference diagram distinguishes the visible panel area, refresh window, and source-buffer region. Apply panel column and row offsets consistently. The refresh window may overlap only part of the source-buffer region; pixels in the window that have no source data use the background color. Check window coordinates, buffer origin, and stride together rather than assuming the buffer and refresh window are identical.

The UI framework produces changed pixels; the display driver and controller deliver them to the panel. The appropriate path depends on the panel:

- A SPI/QSPI or 8080 driver usually sets a panel window and transfers only the changed region.
- A controller scanning a framebuffer consumes pixel data from memory according to the display timing.
- A TurboPixel-capable path reads the compressed final bitmap and decompresses it at the display-controller stage.

In an LVGL design, the display flush callback is the boundary between rendering and output. It should be region-aware, start the correct DMA or controller operation, and signal completion only when the framework can safely reuse the draw buffer. Keep cache clean/invalidate rules explicit whenever the CPU and hardware share buffers.

Buffer ownership must follow the actual transfer path. For a panel-memory transfer, release the draw buffer only after the hardware has finished reading it. For continuous scanout, a frame interrupt alone does not release the active framebuffer: wait until a confirmed buffer switch means the controller no longer reads the old buffer. Transfer completion and visible panel refresh are separate events; use the panel's TE or frame timing where required to prevent tearing.

For cacheable shared memory, clean CPU-written source data before a hardware read. Before a hardware write, prepare the destination using the platform's cache-maintenance rules so dirty cache lines cannot later overwrite the result. After hardware completion, invalidate the destination before the CPU reads it. Respect cache-line alignment and ownership, including neighboring data in the same cache line.

<div align="center"><em>Display-Path Decisions</em></div>

<div align="center" markdown>

| Decision | Direction to Validate |
|:---|:---|
| Flush region | Transfer only changed regions where the panel and driver support it. |
| Buffering | Choose partial, full-frame, single, or double buffering from latency and memory requirements. |
| Synchronization | Release or reuse a buffer only when the hardware no longer reads it; confirm the buffer switch for continuous scanout. |
| Pixel format | Match the panel, driver, renderer, and any accelerator path to avoid hot-path conversion. |
| Cache | Clean CPU-written buffers before hardware reads; invalidate hardware-written buffers before CPU reads. |

</div>

## Partial Refresh and Dirty Regions { #partial-refresh-and-dirty-regions }

Partial rendering and partial panel transfer are different optimizations. A continuous RGB/DPI or DSI video stream may still send the full frame even when only a small memory region changes. For EPD, verify waveform support, temperature dependence, ghosting, and required full-refresh intervals; do not assume a smaller update region is always valid.

Most embedded UIs do not need to redraw the full screen every frame. LVGL tracks invalidated regions, and the driver can flush only the changed areas. This is particularly valuable for SPI/QSPI panels, battery-powered wearables, static pages with small changing values, EPD, and JDI displays.

Full-screen refresh is appropriate for animation-heavy screens, transitions, or panels that naturally scan from a full framebuffer. The choice depends on display-interface bandwidth, panel behavior, and the memory budget—not only on the UI framework setting.

## Panel Bring-Up Sequence { #panel-bring-up-sequence }

Bring up the panel in stages before debugging widgets or application behavior:

1. Verify power rails, reset timing, backlight/enable pins, and basic current draw.
2. Send the panel vendor's initialization sequence exactly as supplied.
3. Fill solid colors to expose byte order, pixel format, and interface-wiring errors.
4. Draw simple geometric patterns to check stride, window addressing, and coordinates.
5. Add image assets and text to check color conversion, fonts, and asset placement.
6. Enable partial refresh, DMA, TurboPixel, and graphics acceleration one at a time.
7. Test sleep, display-off, wake, and reinitialization paths.

First validate fills and patterns with a minimal configuration of the intended panel interface. After adding DMA, compression, or acceleration, repeat those tests through each new path before testing the complete LVGL UI.

## Isolate Display-Path Failures { #isolate-display-path-failures }

Treat each stage as a separate boundary. This avoids changing panel commands, LVGL code, buffer placement, and DMA settings at once—an approach that makes a display failure harder to reproduce.

<div align="center"><em>Display-Path Diagnostic Matrix</em></div>

<div align="center" markdown>

| Symptom | First Boundary to Check | Focused Test | Likely Class of Cause |
|:---|:---|:---|:---|
| Panel stays blank | Power, reset, and panel initialization | Measure rails/reset; run the vendor initialization sequence; send a solid fill. | Power sequence, reset polarity, initialization commands, or physical interface connection. |
| Solid fills work but colors are wrong | Renderer-to-panel pixel format | Draw red, green, blue, black, and white test bars. | RGB/BGR order, byte order, color-depth setting, or format conversion. |
| Image is shifted, clipped, or torn | Addressing and synchronization | Draw a grid, then test one fixed update region repeatedly. | Window coordinates, stride, panel timing, buffer reuse, or incomplete DMA synchronization. |
| Static UI works but animation stutters | Render, transfer, and memory boundary | Measure render time and flush-complete time separately. | Excessive redraw area, PSRAM contention, slow interface, or an unsuitable buffer strategy. |
| Artifacts appear only after sleep/wake | Power-state transition | Re-run the fill/grid test after every supported display-off and wake path. | Lost panel state, reset/init omission, rail sequencing, or stale cache/buffer state. |
| A feature fails only when enabled | Specific optional path | Enable DMA, partial refresh, ePicasso, or TurboPixel one at a time. | Unsupported configuration, alignment/cache rule, or driver integration error. |

</div>

## Panel-Specific Guidance { #panel-specific-guidance }

### SPI and QSPI AMOLED/TFT { #spi-and-qspi-amoledtft }

Prefer partial refresh, RGB565 where suitable, and modest animation regions. Avoid full-screen redraws for small changes; render and compose before flushing the changed region.

### RGB / DPI Panels { #rgb-dpi-panels }

Budget sustained scanout bandwidth alongside CPU, ePicasso, DMA, and other memory traffic. Select a framebuffer strategy for the required refresh rate, consider double buffering when memory permits, and account for timing and signal integrity in the PCB design.

### MIPI DSI Panels { #mipi-dsi-panels }

Choose the panel mode before committing the part. **SF32LB55x supports MIPI DSI command mode only**, so the panel controller must provide internal SRAM/GRAM to hold the updated image. **SF32LB58x supports both command and video modes**: command-mode panels need controller RAM, while video mode can drive a RAM-less panel controller from the continuous pixel stream. Validate initialization early, test low-power states and wake timing, and keep the required data rate below the interface's usable throughput, allowing for protocol overhead, timing constraints, and other memory traffic.

### EPD Displays { #epd-displays }

Design for infrequent updates; use partial-update modes only when supported and visually acceptable. Avoid animation assumptions and plan display PMIC, VCOM, and waveform requirements.

### JDI and Memory-in-Pixel Panels { #jdi-memory-in-pixel-displays }

JDI refers here to serial or parallel panel-interface modes; Memory-in-Pixel describes a panel technology. They may be combined in some low-power display designs, but the terms are not interchangeable. For an MIP panel, small update regions and a suitable UI layout can take advantage of pixel-state retention while the panel is powered. This does not imply nonvolatile image storage or zero system standby power. Follow the selected panel's datasheet for COM inversion and other maintenance operations, then measure refresh behavior, outdoor readability, and power under product conditions.

## Production Handoff Checklist { #production-handoff-checklist }

Before treating the display path as complete, record the choices another engineer must reproduce:

- Exact SF32 device, package, SDK release, board revision, panel part number, and panel-controller revision.
- Interface mode, pin assignment, pixel format, byte/color order, target refresh behavior, and panel initialization source.
- Draw-buffer and framebuffer locations, sizes, alignment, cache-maintenance ownership, and DMA/controller completion signal.
- Partial-refresh policy, panel-window rules, and any regions that must be refreshed together to avoid artifacts.
- Measured render time, transfer time, peak/average PSRAM traffic where relevant, and current for representative UI states.
- Sleep, display-off, wake, and recovery test results, including the behavior after a failed or interrupted transfer.

This record turns display support from a one-off bring-up result into a repeatable product integration. Re-validate it whenever the panel, SDK, memory layout, pixel format, or display driver changes.

## Key Takeaways { #key-takeaways }

- The display controller owns panel output; it is separate from ePicasso's pixel composition and eZip's asset decompression.
- Interface choice determines much of the bandwidth, buffer, power, pin, and PCB design.
- Treat the flush path, synchronization, cache maintenance, and panel initialization as first-class firmware work.
- Validate the panel with simple patterns before enabling higher-level UI, DMA, TurboPixel, or acceleration features.
- Diagnose failures one display-path boundary at a time, then preserve the verified configuration and measurements for production handoff.
