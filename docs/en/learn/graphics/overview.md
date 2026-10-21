---
icon: lucide/palette
title: "Graphics Overview"
description: "Overview of building SF32 UIs: display selection, framebuffer strategy, LVGL integration, ePicasso acceleration, and memory placement for smooth graphics."
tags:
  - Graphics
---

# Overview { #graphics-overview }

## Plan the Graphics Architecture { #overview }

This guide explains how to build responsive graphical user interfaces on SF32 devices. It focuses on the practical decisions that affect real products: display selection, framebuffer strategy, LVGL integration, ePicasso hardware acceleration, memory placement, and display refresh behavior.

SF32 devices are designed for compact AIoT and wearable products where the UI must feel smooth while the system still meets strict power, memory, and PCB-area targets. The graphics path separates resource handling, pixel composition, optional framebuffer compression, and panel output. Keeping those roles distinct is the key to choosing the right optimization.

Use this page when making the early UI architecture decisions that are expensive to reverse: panel and interface, framebuffer strategy, color depth, transparency, asset placement, and refresh policy. The linked Graphics articles then provide the implementation detail for a specific block in that flow.

## SF32 Graphics Flow { #sf32-graphics-flow }

The typical display-resource path is:

<div align="center"><em>Diagram: Graphics Resource and Display Flow</em></div>

```text
Source images, fonts, and animations
        │
        ▼
GraphicsTool converts supported resources to eZip or eZip-A
        │
        ▼
Compressed assets in NOR Flash, PSRAM, NAND, or file storage
        │
        ▼
eZip hardware decoder expands an asset when required
        │
        ▼
LVGL or another UI framework + graphics/display driver
        │
        ├── CPU fallback rendering
        │
        └── ePicasso pixel acceleration
        │
        ▼
Final rendered bitmap in a draw buffer or framebuffer
        │
        ├── Uncompressed display path
        │
        └── Optional: extDMA compresses it into TurboPixel
                    │
                    ▼
             TurboPixel framebuffer in PSRAM
        │
        ▼
Display controller transfers pixels to the panel
        │
        ▼
SPI / QSPI / 8080 / RGB / MIPI DSI / EPD / JDI panel
```

The path is configurable rather than mandatory: a product may not use eZip, ePicasso, TurboPixel, or a full framebuffer. Availability and connections depend on the selected device, SDK, display interface, panel, and driver configuration. The current OpenSiFli LCDC header defines `LCDC_SUPPORTED_COMPRESSED_LAYER` only when `HAL_EXTDMA_MODULE_ENABLED` is enabled and the family guard permits it; SF32LB52x and SF32LB57x are excluded. A source comment also notes that the LCPU path is not enabled. The published SDK LCDC capability table marks compressed-layer decompression unsupported on SF32LB55x, so treat 55x as conditional rather than validated end-to-end support. Verify the exact SDK revision, core, build configuration, and target hardware; see [TurboPixel](turbopixel.md#availability-in-the-sf32-family).

<div align="center"><em>Roles in the SF32 Graphics Flow</em></div>

<div align="center" markdown>

| Block | Position in the Flow | Primary Responsibility | It Does Not Replace |
|:---|:---|:---|:---|
| **eZip / eZip-A** | Before rendering, while reading stored resources | Losslessly decompress supported eZip graphics assets, including static images and animation resources. | The renderer, final framebuffer, or display controller. |
| **ePicasso** | During rendering and composition | Accelerate supported copy, fill, blend, transform, and composition work on pixels in memory. | Asset compression or panel transfer. |
| **TurboPixel** | After rendering, before panel output on supported devices | Use extDMA to compress the final bitmap at a fixed ratio with lossy compression, reducing the PSRAM capacity required and display-read traffic. The current header exposes the compressed-layer capability for SF32LB55x, SF32LB56x, and SF32LB58x when extDMA is enabled, and excludes SF32LB52x and SF32LB57x; its comment notes that the LCPU path is not enabled. The published capability table marks SF32LB55x unsupported, so verify the exact core, SDK configuration, and target path before relying on it. | Lossless asset compression or pixel rendering. |
| **Display controller** | Final output stage | Decompress TurboPixel when that path is enabled and transfer prepared pixels through the panel interface. | eZip asset decompression or graphics composition. |

</div>

Application code describes UI state and behavior. The UI framework manages widgets, invalidation, and drawing. The graphics/display driver chooses CPU or ePicasso execution and coordinates buffers; the display controller owns panel transfer. For feature-specific implementation details, see [ePicasso](epicasso-gpu.md), [eZip](ezip.md), and [TurboPixel](turbopixel.md).

## Choose the Display First { #choose-the-display-first }

The display choice affects nearly every graphics decision. Before optimizing code, define the panel requirements clearly:

- Resolution.
- Color depth.
- Refresh rate.
- Interface type.
- Touch controller requirements.
- Backlight or display power rails.
- Whether partial refresh is supported.
- Whether the panel has internal GRAM.
- Whether low-power always-on display behavior is required.

A small SPI or QSPI AMOLED behaves very differently from an RGB panel, MIPI DSI panel, JDI memory display, or EPD panel. The same UI framework can target many display types, but the best buffer strategy and refresh policy will change.

For detailed interface selection, flush-path design, and panel bring-up, see [Display Controller](display-controller.md).

## Start from a Verified LVGL Example { #start-from-a-verified-lvgl-example }

Choose an SDK example that already proves the product's riskiest graphics boundary before composing screens around it. [LVGL SDK Examples](lvgl-sdk-examples.md) organizes the official baseline, design-tool, widget, compressed-asset, animation/media, compass, game, and watch-interface examples by the engineering task they establish. It also makes clear which board, version, display, memory, and performance assumptions must be revalidated during product adaptation.

## Pick the Right SF32 Device { #pick-the-right-sf32-device }

Choose the chip based on the display and UI workload, not just CPU frequency.

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown>

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| Basic Bluetooth product with small UI | SF32LB52x |
| Entry smartwatch, badge, label, simple HMI | SF32LB52x |
| BLE wearable with sensor-rich UI | SF32LB55x |
| RGB display or richer LVGL interface | SF32LB56x |
| Audio/graphics workloads suited to ACPU task offload | SF32LB57x; verify SDK support and task placement |
| High-resolution display or advanced graphics | SF32LB56x or SF32LB58x |
| MIPI DSI display | SF32LB55x or SF32LB58x, depending on panel and product class |
| Flagship UI with graphics, audio, AI, and large memory | SF32LB58x |

</div>

The most important constraints are display interface, resolution, memory capacity, graphics accelerator generation, available pins, and power budget.

## Framebuffer and Bandwidth Calculator { #framebuffer-and-bandwidth-calculator }

Estimate memory and transfer cost before choosing a panel or animation style:

```text
framebuffer bytes = width x height x bytes_per_pixel
raw full-frame bandwidth = framebuffer bytes x frames_per_second
```

Examples:

<div align="center"><em>Table: Framebuffer and Bandwidth Calculator</em></div>

<div align="center" markdown>

| Panel | Format | One Full Buffer | 30 fps Full-Frame Traffic |
|:------|:-------|----------------:|--------------------------:|
| 240 x 240 | RGB565 | ~113 KiB | ~3.46 MB/s |
| 390 x 390 | RGB565 | ~297 KiB | ~9.13 MB/s |
| 454 x 454 | RGB565 | ~403 KiB | ~12.37 MB/s |
| 480 x 480 | RGB888 | ~675 KiB | ~20.74 MB/s |

</div>

Buffer sizes use KiB (1,024 bytes); bandwidth uses decimal MB/s (1,000,000 bytes/s). These are raw pixel numbers before command overhead, alignment, cache maintenance, asset reads, blending, or other system traffic. If the product also runs Bluetooth audio, AI, or external PSRAM traffic, leave margin.

## Understand Your Buffers { #understand-your-buffers }

A UI is ultimately pixels in memory. The main buffer types are:

<div align="center"><em>Table: Understand Your Buffers</em></div>

<div align="center" markdown>

| Buffer Type | Purpose |
|:------------|:--------|
| **Draw buffer** | Temporary area used by LVGL or the graphics driver to render changed regions. |
| **Framebuffer** | Full-screen pixel memory used as the display source. |
| **Partial framebuffer** | Smaller region buffer used when full-screen buffering is too expensive. |
| **Asset buffer** | Image, font, icon, or decoded resource data. |
| **Intermediate layer** | Temporary surface used for blending, animation, or composition. |

</div>

A full-screen framebuffer can be convenient, but it may consume too much SRAM on larger panels. A 454 x 454 RGB565 buffer contains 412,232 bytes (about 412 kB or 403 KiB); two buffers need twice that capacity. Higher color depths and larger displays grow quickly.

When memory is tight, use partial draw buffers and dirty-region updates. When animation is important and memory is available, full-screen or double-buffered strategies may make the UI smoother.

## Choose Color Depth Carefully { #choose-color-depth-carefully }

Color depth affects visual quality, memory use, and bus bandwidth.

<div align="center"><em>Table: Choose Color Depth Carefully</em></div>

<div align="center" markdown>

| Format | Bytes per Pixel | Notes |
|:-------|----------------:|:------|
| **RGB565** | 2 | Common balance for embedded UI; good memory and bandwidth efficiency. |
| **RGB666** | 3 or packed | Better color precision, more bandwidth. |
| **RGB888** | 3 | Higher quality, larger memory and transfer cost. |
| **RGB111 / monochrome-style formats** | Device dependent | Useful for simple or ultra-low-power displays such as EPD/JDI-style applications. |

</div>

For most wearable and compact HMI products, RGB565 is a strong default unless the panel, UI quality target, or product requirements demand more.

## Transparency, Alpha, and Layer Composition { #transparency-alpha-and-layer-composition }

Transparency is represented by an **alpha** factor: a value that specifies how strongly a foreground pixel contributes when it is drawn over a background pixel. Alpha is independent of RGB color channels. An opaque pixel has alpha 1 (or 255 in an 8-bit alpha channel); a fully transparent pixel has alpha 0.

For source-over compositing onto an **opaque background**, with **straight-alpha foreground colors** and alpha normalized to 0–1, each output RGB channel is calculated as follows. This simplified equation does not calculate the output alpha of a transparent destination:

```text
output = foreground × alpha + background × (1 − alpha)
```

For example, an icon pixel with 50% alpha contributes half of its color and leaves half of the background visible. Repeating this operation produces the visual stack of a UI: a background, images, text, translucent controls, shadows, and animation layers. The final composited bitmap then proceeds through the framebuffer and display-controller stages shown above.

<div align="center"><em>Table: Alpha Modes and Their Use</em></div>

<div align="center" markdown>

| Alpha Mode | Meaning | Typical Use | Integration Consideration |
|:-----------|:--------|:------------|:--------------------------|
| **Per-pixel alpha** | Each pixel carries its own alpha value. | Anti-aliased icons and text, soft edges, shadows, PNG-style assets. | Preserves detailed transparency but increases source-data size and blend work. |
| **Global alpha** | One alpha value applies to an entire object or layer. | Fading a screen, dialog, or image. | Efficient for uniform fades; cannot express soft edges within the object. |
| **Binary alpha** | A pixel is fully visible or fully transparent. | Masks and simple glyphs. | Lower complexity, but edges can appear jagged without anti-aliasing. |

</div>

RGB565 contains no alpha channel, so it is normally used for opaque draw targets and final framebuffers. Source assets or intermediate layers that need alpha commonly use a format with an alpha channel, such as ARGB8888, or a color image plus a separate alpha mask. The driver must use the actual formats supported by the SDK, display path, and selected accelerator.

Two alpha representations are common. With **straight alpha**, RGB describes the original color and alpha is applied during blending. With **premultiplied alpha**, RGB has already been multiplied by alpha; the source-over equation becomes `output = premultiplied_foreground + background × (1 − alpha)`. Do not mix the two representations: treating straight-alpha data as premultiplied, or the reverse, causes dark or light halos around edges.

Alpha blending reads both foreground and destination pixels, then writes the result. It therefore increases memory traffic compared with a simple opaque copy or fill. Use ePicasso where the driver supports the selected blend operation and pixel formats; otherwise keep a CPU fallback. Limit full-screen translucent layers, update only invalidated regions, and avoid unnecessary intermediate surfaces when PSRAM bandwidth or power is tight.

## Integrating LVGL { #integrating-lvgl }

LVGL is a practical UI framework for SF32 devices because it provides widgets, styles, input handling, animation, invalidation, and display-driver hooks.

A typical LVGL integration needs:

- A display driver flush callback.
- One or more draw buffers.
- A tick source for LVGL timing.
- Input device drivers for touch, buttons, encoders, or gestures.
- Asset handling for images and fonts.
- Optional hardware acceleration hooks for ePicasso.

The display flush callback is the rendering/output boundary. Its controller and DMA behavior is covered in [Display Controller](display-controller.md#controller-buffers-and-flush-paths).

## LVGL Porting Decisions { #lvgl-porting-decisions }

Lock down these LVGL integration details before polishing screens:

<div align="center"><em>Table: LVGL Porting Decisions</em></div>

<div align="center" markdown>

| Decision | Preferred Direction |
|:---------|:--------------------|
| Tick source | Stable system tick that continues correctly across sleep/wake. |
| Flush callback | Region-aware transfer path, with completion signaling from DMA/display driver. |
| Draw buffer count | One or two buffers depending on latency and memory budget. |
| Invalidated area policy | Merge small regions only when it reduces total transfer cost. |
| Input devices | Touch/buttons/encoder integrated through LVGL input drivers, not app polling loops. |
| Hardware acceleration | Enable only operations supported by the SDK/driver and keep CPU fallback. |
| Cache handling | Clean/invalidate shared buffers at the framework-driver boundary. |

</div>

A good LVGL port should let screen code stay declarative while the driver owns transfer, synchronization, acceleration, and cache behavior.

## Using ePicasso Acceleration { #using-epicasso-acceleration }

ePicasso is useful when the UI contains operations that would otherwise require many repeated pixel calculations. Common candidates include:

- Rectangle fills.
- Image copy and blit operations.
- Alpha blending.
- Image scaling.
- Rotation or transformation of supported image regions.
- Layer composition.
- Pixel format conversion where supported by the driver.

A good port should accelerate common high-volume operations while keeping CPU fallback paths for unsupported cases. Do not assume every LVGL style effect or widget maps to hardware. Measure the actual screens that matter for the product.

### When Acceleration Helps Most { #when-acceleration-helps-most }

ePicasso usually helps most when:

- Large regions are filled, copied, blended, scaled, or transformed.
- The UI uses transparent icons, text masks, shadows, overlays, or animated transitions.
- The CPU would otherwise spend a large part of each frame doing pixel loops.
- Memory placement and pixel formats match what the accelerator can handle efficiently.

### When Acceleration May Not Help Much { #when-acceleration-may-not-help-much }

Hardware acceleration may provide limited benefit when:

- The updated region is very small.
- The bottleneck is panel transfer bandwidth, not rendering.
- Assets require unsupported formats or expensive conversion.
- Buffers are placed in slow memory without enough bandwidth.
- Cache maintenance overhead dominates the operation.

## Memory Placement Strategy { #memory-placement-strategy }

Graphics performance is often limited by memory movement. Place buffers intentionally:

- Put hot draw buffers in fast SRAM when possible.
- Keep large framebuffers in PSRAM only when SRAM is insufficient.
- Store large images and fonts in Flash or PSRAM, but consider access latency.
- Avoid repeatedly converting assets at runtime.
- Keep DMA-accessed buffers aligned according to SDK guidance.
- Use compressed or indexed assets when they reduce total bandwidth and decode cost.

When the CPU and graphics or display hardware share buffers, follow the SDK's cache and buffer-ownership rules. Before hardware reads CPU-written data, clean the relevant cache lines and complete the required synchronization. Before hardware writes a buffer, prepare it so that dirty CPU cache lines cannot later overwrite the hardware result. Wait for the transfer to complete, then invalidate stale cache lines before the CPU reads the result. Respect cache-line alignment and neighboring data, and do not modify a buffer while hardware owns it. Use the SDK's supported routines rather than treating clean and invalidate as interchangeable.

For partial refresh, panel-specific behavior, and the staged bring-up sequence, see [Display Controller](display-controller.md).

## Asset Preparation { #asset-preparation }

Good asset preparation can make a UI faster before any code optimization begins.

Use these rules of thumb:

- Match image dimensions to actual on-screen size.
- Avoid scaling large images every frame.
- Pre-render complex shadows, gradients, or backgrounds when possible.
- Use alpha only where transparency is needed.
- Prefer shared icon sets and font subsets.
- Remove unused glyphs from fonts.
- Keep frequently used assets in formats supported efficiently by the graphics path.

For multilingual products, font memory can dominate the UI budget. Plan font fallback, glyph subsets, and text layout early.

## Animation Strategy { #animation-strategy }

Smooth animation depends on frame budget, panel bandwidth, rendering cost, and power.

A practical approach:

- Animate only what users notice.
- Keep animated regions small.
- Prefer transforms or opacity changes that map well to acceleration.
- Avoid expensive full-screen blur, shadow, or transparency effects on every frame.
- Reduce frame rate for non-critical effects.
- Stop animations when the screen is dimmed, covered, or inactive.

A wearable UI does not need desktop-style animation everywhere. A few fast, clear transitions usually feel better than many effects that drain power or drop frames.

## Graphics Validation Matrix { #graphics-validation-matrix }

Use repeatable screens instead of subjective “smooth enough” checks:

<div align="center"><em>Table: Graphics Validation Matrix</em></div>

<div align="center" markdown>

| Test Screen | What It Stresses |
|:------------|:-----------------|
| Solid fill and color bars | Pixel format, byte order, flush path. |
| Text-heavy screen | Font memory, glyph cache, partial refresh. |
| Icon grid with alpha | Blending, asset bandwidth, ePicasso path. |
| Scrolling list | Invalidated regions, transfer bandwidth, input latency. |
| Full-screen transition | Frame budget, double buffering, panel bandwidth. |
| Dim/idle screen | Animation stop policy, backlight, PM votes. |
| Worst-case coexistence | Bluetooth/audio/AI active while UI updates. |

</div>

Track render time, flush time, CPU load, and power for each screen. If only total frame time is measured, it is hard to know whether the bottleneck is LVGL, ePicasso, memory, or the panel interface.

## Debugging Graphics Performance { #debugging-graphics-performance }

When the UI is slow, identify the bottleneck before changing the design.

<div align="center"><em>Table: Debugging Graphics Performance</em></div>

<div align="center" markdown>

| Symptom | Likely Area to Check |
|:--------|:---------------------|
| High CPU usage while drawing | Missing hardware acceleration, too many software pixel operations, complex widgets. |
| Rendering completes but display updates slowly | Panel interface bandwidth, flush size, display-driver transfer path. |
| Tearing or flicker | Buffering strategy, synchronization, partial update timing. |
| Random artifacts | Cache coherency, buffer lifetime, stride/pixel-format mismatch. |
| Good simple screens, poor animation | Full-screen redraws, large alpha blends, asset scaling, panel bandwidth. |
| High power during idle UI | Unnecessary redraws, timers, animations, display/backlight policy. |

</div>

Measure these separately:

- LVGL render time.
- ePicasso operation time.
- Display flush time.
- CPU load.
- Memory bandwidth pressure.
- Power consumption during active, idle, and sleep states.

## Common Mistakes { #common-mistakes }

Avoid these early; they are expensive to fix late:

- Choosing a panel interface before estimating bandwidth.
- Using full-screen redraws for small UI changes.
- Storing all UI assets in slow memory without profiling.
- Using RGB888 when RGB565 is sufficient.
- Scaling large images every frame.
- Forgetting cache maintenance for hardware-shared buffers.
- Assuming ePicasso accelerates every UI operation automatically.
- Using too many timers or animations that keep the CPU awake.
- Ignoring touch latency while optimizing only frame rate.
- Waiting until PCB bring-up to validate panel initialization.

## Bring-Up Checklist { #bring-up-checklist }

Use this checklist when starting a new SF32 graphics project:

- [ ] Confirm display resolution, color depth, interface, and panel driver IC.
- [ ] Confirm the selected SF32 device supports the required display interface.
- [ ] Estimate framebuffer and draw-buffer memory requirements.
- [ ] Decide full-frame, partial, single-buffer, or double-buffer strategy.
- [ ] Bring up panel reset, power rails, backlight, and initialization sequence.
- [ ] Implement the LVGL tick, display flush, and input drivers.
- [ ] Verify basic fill, image, text, and touch behavior.
- [ ] Enable ePicasso acceleration where supported by the SDK and driver.
- [ ] Validate cache clean/invalidate behavior for shared buffers.
- [ ] Profile render time, flush time, CPU load, and power.
- [ ] Test worst-case screens, animations, Bluetooth activity, and sleep/wake paths.

## Key Takeaways { #key-takeaways }

- Start graphics design from the display interface, resolution, color depth, and refresh requirements.
- Use LVGL or a similar framework to manage widgets, invalidation, drawing, and input.
- Use ePicasso to accelerate common pixel operations, but keep CPU fallback paths.
- Optimize memory placement and buffer strategy as carefully as rendering code.
- Prefer partial refresh for bandwidth-limited panels and static wearable screens.
- Treat UI performance as a system problem involving CPU, ePicasso, memory, display controller, panel interface, touch, and power policy.
