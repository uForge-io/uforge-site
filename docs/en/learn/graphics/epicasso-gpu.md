---
icon: lucide/layers-3
description: "How SiFli's ePicasso 2D/2.5D graphics engine accelerates embedded UI rendering on SF32, and how it works with LVGL, memory, and the display controller."
tags:
  - Graphics
---
# ePicasso 2D / 2.5D Graphics Engine { #epicasso-2d-25d-graphics-engine }

## Introduction { #introduction }

**ePicasso** is SiFli's 2D/2.5D graphics acceleration engine for the SF32 microcontroller family. It offloads supported, repetitive pixel work from the application CPU so embedded UIs can deliver smooth effects, responsive interaction, and efficient display updates within an MCU-class power budget.

In the SF32 graphics flow, ePicasso operates after resources are available to the renderer and before the final bitmap reaches the display controller. It accelerates pixel-processing work such as image copy, blending, scaling, rotation, and layer composition. eZip performs asset decompression and can feed decoded image data to ePicasso; the display controller transfers the prepared pixels to the panel. See [Graphics Overview](overview.md#sf32-graphics-flow) for the complete resource-to-panel path.

Applications usually do not program individual ePicasso operations directly. Instead, a graphics framework such as **LVGL**, or a vendor graphics library, builds commands for common UI work. The SF32 graphics driver routes supported operations to ePicasso and falls back to CPU rendering when an operation is unsupported.

Read this page when UI profiling shows that copy, fill, alpha blend, scaling, rotation, or composition limits responsiveness or increases power consumption. It helps firmware engineers decide what can be accelerated and what must remain in a correct CPU fallback path.

## Why Hardware Graphics Acceleration Matters { #why-hardware-graphics-acceleration-matters }

Embedded UI performance is often limited by memory movement rather than CPU instruction throughput. Even a simple semi-transparent icon can require a source read, a framebuffer read, pixel blending, and a framebuffer write for every affected pixel.

ePicasso improves this situation by accelerating the repetitive pixel operations that appear throughout a user interface:

- Copying image blocks and framebuffer regions.
- Filling rectangles and UI backgrounds.
- Alpha blending icons, text masks, shadows, and overlays.
- Scaling bitmaps for responsive layouts and animations.
- Rotating or transforming image regions.
- Compositing multiple layers into a final display buffer.
- Converting between common pixel formats when supported by the device and driver.

The benefit is not limited to frame rate: hardware acceleration can reduce CPU utilization, improve touch responsiveness, and leave more opportunity for lower-power states between display updates.

CPU offload does not guarantee lower total system energy. Accelerator clocks, memory traffic, synchronization and driver overhead can offset the CPU savings. Compare energy per completed screen update on the target hardware, including the display and idle interval, rather than judging power efficiency from CPU utilization alone.

## Core Rendering Concepts { #core-rendering-concepts }

### Surfaces and Framebuffers { #surfaces-and-framebuffers }

A **surface** is a rectangular area of pixel memory. It may represent a full screen framebuffer, a partial draw buffer, an image asset, a canvas, or an intermediate layer. ePicasso operations generally read pixels from one or more source surfaces and write pixels to a destination surface.

Place surfaces in memory that matches their access pattern:

- Frequently updated draw buffers often benefit from fast internal SRAM when enough space is available.
- Large images, fonts, and UI assets may live in Flash or PSRAM.
- Full-screen framebuffers for higher-resolution displays may require PSRAM.
- DMA-visible buffers must follow the SDK's memory and cache-coherency rules.

### Blending { #blending }

Blending combines source pixels with destination pixels. This is essential for modern UI elements such as translucent cards, soft shadows, anti-aliased glyphs, overlays, and fading animations.

Common blending cases include:

- Constant-alpha blending for fading an entire layer.
- Per-pixel alpha blending for PNG-like images and anti-aliased icons.
- Mask-based blending for text, shapes, or monochrome assets.

When ePicasso handles blending in hardware, the CPU avoids executing the same arithmetic for every pixel in the affected region.

### Scaling and Rotation { #scaling-and-rotation }

Scaling and rotation are common in animated interfaces and responsive layouts. Hardware scaling can be used for zoom effects, preview thumbnails, resized icons, or adapting assets to different screen densities. Rotation is useful for screen orientation changes, rotating gauges, watch-face elements, and certain transition effects.

These operations are bandwidth-sensitive. Their benefit depends on source and destination formats, memory placement, and whether the graphics driver can express the operation in supported hardware terms.

### Layer Composition { #layer-composition }

Many screens are built from multiple visual layers: a background, image assets, text, status indicators, popups, and animation overlays. Layer composition combines those elements into the final visible result.

ePicasso is designed to accelerate this style of 2D composition. Instead of redrawing the entire screen in software, a UI framework can update only the invalidated regions and use the accelerator to composite the changed pixels efficiently.

## 2D and 2.5D Graphics { #2d-and-25d-graphics }

The term **2D graphics** usually refers to operations performed on flat rectangular images: copy, fill, blend, scale, rotate, and compose.

The term **2.5D graphics** is used for effects that still render into a 2D framebuffer but add transformation or perspective-like behavior. In embedded UI design, this may include transformed image regions, richer transitions, or effects that give a visual sense of depth without requiring a full 3D rendering pipeline.

For SF32 documentation, ePicasso should be understood primarily as a **2D/2.5D UI accelerator**, not as a desktop-class programmable 3D GPU. Its purpose is to make embedded interfaces smoother and more power-efficient, especially on displays used by wearables, smart controls, handheld devices, and compact dashboards.

## ePicasso Implementation Comparison { #epicasso-generation-comparison }

Compare the implementation in each device family, not an engine name alone. Display resolution, layer count, supported formats, eZip features, external-memory bandwidth and driver support also depend on the selected SF32 device, package, SDK and board design. SiFli's [SF32LB52x product brief](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf) names its engine ePicasso 2.0. The [SF32LB56x datasheet](https://downloads.sifli.com/silicon/DS0056-SF32LB56x-Datasheet%20V1p8.pdf) specifies four foreground layers, a dedicated mask layer and a monochrome background layer; it documents TurboPixel separately as an LCD-controller frame-buffer-compression feature. The [SF32LB58x datasheet](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf) documents ePicasso 2.0 and a separate Vivante GCNanoUltraV vector engine.

<div align="center"><em>ePicasso Implementation Comparison</em></div>

<div align="center" markdown>

| Documented Engine | Representative SF32 Family | Graphics Scope | Documented Differentiators | Practical Fit |
|:---|:---|:---|:---|:---|
| **ePicasso** | SF32LB55x | 2.5D UI acceleration | Hardware rotation, scaling, horizontal mirroring, and alpha blending; vertical mirroring is not supported. eZip lossless-asset workflow. | BLE wearables and compact HMIs that need richer UI than an entry-level design |
| **ePicasso 2.0** | SF32LB52x | 2D/2.5D UI acceleration | eZip 2.0 asset decompression in a cost-optimized graphics configuration | Entry-level wearables, Bluetooth products, e-paper, and compact HMIs |
| **ePicasso 2.0** | SF32LB56x | 2D/2.5D UI acceleration | Four alpha-blended foreground layers, one dedicated mask layer, and one monochrome background layer; hardware rotation/scaling and horizontal mirroring (vertical mirroring is not supported); format conversion; eZip 2.0; separate TurboPixel frame-buffer compression | Higher-resolution displays and richer LVGL interfaces; verify operation support for the selected device and SDK |
| **ePicasso 2.0** | SF32LB58x | 2D/2.5D UI acceleration | Includes ePicasso 2.0 and a separate Vivante GCNanoUltraV vector-graphics engine; verify each engine's supported functions independently | High-resolution, graphics-rich products; confirm which functions the target SDK supports on each engine |
| **ePicasso (EPIC)** | SF32LB57x | 2D/2.5D UI acceleration | Rotation, scaling, matrix transforms, horizontal and vertical mirroring, alpha blending, and multi-layer composition; EZIP feeds decoded eZip/eZip-A assets to EPIC. The EPIC format table separately lists JPEG input on SF32LB57x; the SDK also provides a standalone JPEGD HAL decoder, which is a distinct path. | Graphics-rich, camera-capable, and multimedia-oriented connected products |

</div>

This is not a benchmark ranking. For a product design, verify the exact chip's supported pixel formats, layer and resolution limits, eZip capabilities, available framebuffer memory, display-interface bandwidth, and SDK driver coverage.

The SDK EPIC capability table documents horizontal mirroring across the listed families, but vertical mirroring only on SF32LB52x and SF32LB57x. Do not read an unqualified “mirroring” claim as support for both directions. The same table excludes EZIP, JPEG, and YUV input from rotation and matrix transforms.

The EZIP-to-EPIC path avoids storing a complete decompressed source image in an intermediate framebuffer; decoder working memory and the final render buffer are still required. JPEG decoding is not an EZIP function. The SDK lists JPEG as an EPIC input format on SF32LB57x and separately provides a [JPEGD HAL example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/hal/jpegd/README.html) that decodes a JPEG image through HAL_JPEGD. These are distinct documented paths; verify the exact pipeline used by the application.

This still-image example does not establish MJPEG stream decoding through JPEGD. The SDK documents MJPEG separately in its [FFmpeg video middleware guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/video.html), whose MJPEG configuration note says hardware decoding is available only on SF32LB58x.

Also check format-specific restrictions and family differences before selecting an accelerated path. Use the [upstream EPIC capability table](https://github.com/OpenSiFli/SiFli-SDK/blob/main/docs/source/zh_CN/hal/epic.md) and [JPEGD interface](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h).

## ePicasso Across the SF32 Family { #epicasso-across-the-sf32-family }

Different SF32 devices integrate different ePicasso configurations. Use the selected chip's datasheet and reference manual as the authority for the final feature set.

<div align="center"><em>Table: ePicasso Across the SF32 Family</em></div>

<div align="center" markdown>

| Device Family | Graphics Accelerator | Typical Positioning |
|:--------------|:---------------------|:--------------------|
| **SF32LB52x** | ePicasso 2.0 2D/2.5D accelerator | Cost-optimized wearable, Bluetooth, and compact HMI products. |
| **SF32LB55x** | ePicasso 2.5D accelerator | BLE wearables and sensor-rich devices with display needs. |
| **SF32LB56x** | ePicasso 2.0 2D/2.5D accelerator | Higher-resolution display products and richer LVGL-style interfaces. |
| **SF32LB57x** | ePicasso (EPIC) 2D/2.5D accelerator | Graphics-rich, camera-capable, and multimedia-oriented connected products. |
| **SF32LB58x** | ePicasso 2.0 plus the separate Vivante GCNanoUltraV vector engine | Flagship graphics, high-resolution UI, and advanced visual applications. |

</div>

This progression lets developers retain a similar graphics software model across SF32 while selecting the device that fits the required display resolution, memory, graphics complexity, GPIO count, and power budget.

## Integration with LVGL and UI Frameworks { #integration-with-lvgl-and-ui-frameworks }

**LVGL** is a common choice for embedded graphical interfaces on SF32 devices. The application builds screens using widgets, styles, images, fonts and animations. LVGL identifies the regions to redraw, and its software renderer or hardware draw backend produces their pixels. The display driver's flush path transfers those rendered pixels to the panel and signals completion. Keep rendering completion and display-transfer completion distinct.

ePicasso can improve LVGL performance when the SF32 port routes supported draw operations to hardware. The most useful acceleration points are typically:

- Image blits.
- Color fills.
- Alpha blending.
- Image scaling.
- Rotation or transformation of supported image regions.
- Compositing into a draw buffer or framebuffer.

A robust LVGL integration retains CPU fallback paths. Not every LVGL feature, pixel format, style effect, or image layout maps cleanly to a hardware operation. Accelerate common high-volume operations and leave uncommon or complex cases to software.

## Memory and Bandwidth Considerations { #memory-and-bandwidth-considerations }

Graphics acceleration does not remove the need for careful memory design. In many embedded display systems, the memory bus is the limiting resource: ePicasso, the CPU, display controller, DMA engines, Flash, PSRAM, audio, and wireless subsystems can all contend for access.

Good graphics performance depends on several design choices:

- Use display resolutions and color depths that match the product requirement.
- Keep frequently used UI assets in memory locations that provide acceptable access latency.
- Use partial rendering or dirty-region updates when full-screen refresh is unnecessary.
- Avoid unnecessary format conversion in the hot path.
- Align draw buffers and framebuffers according to SDK recommendations.
- Keep DMA and cache coherency rules clear when buffers are shared between CPU, ePicasso, and display controller.

For cacheable buffers shared by the CPU and ePicasso, follow the SDK's cache-maintenance and ownership rules. Clean CPU-written source data before hardware reads it. Before hardware writes a destination buffer, follow the SDK's cache rules so dirty CPU cache lines cannot later overwrite the result; after hardware completion, invalidate stale lines before the CPU reads it. Respect cache-line alignment and neighboring data, and do not modify buffers while hardware owns them. See [Graphics Overview](overview.md#memory-placement-strategy) for the shared-buffer workflow.

The role split in [Graphics Overview](overview.md#sf32-graphics-flow) is central to UI-performance debugging. A slow update can result from rendering time, memory bandwidth, panel-transfer speed, display-interface configuration, or synchronization strategy. ePicasso helps most when rendering is the bottleneck; if panel transfer is limiting, partial refresh, lower color depth, a different buffering strategy, or a faster interface may matter more.

## Typical Use Cases { #typical-use-cases }

ePicasso is most useful in products where the interface contains many visual elements but the system still needs to stay within a microcontroller-level power budget.

Typical use cases include:

- Smartwatch watch faces and app screens.
- Fitness trackers and wearable health displays.
- Bluetooth audio user interfaces.
- eBike, eScooter, and compact vehicle dashboards.
- Smart home controls and small touch panels.
- Portable medical or industrial instruments.
- Label printers, smart badges, and electronic shelf labels.
- LVGL-based HMIs with icons, transparency, and animations.

## Practical Design Guidance { #practical-design-guidance }

Start from the display and user-experience requirements, then work backward to the graphics architecture.

Important questions include:

- What is the display resolution and color depth?
- Is the panel updated through SPI, QSPI, 8080, RGB/DPI, MIPI DSI, EPD, or JDI?
- Does the product need full-screen animation, or mostly partial updates?
- Are UI assets stored in internal SRAM, Flash, or PSRAM?
- How much memory is available for draw buffers or framebuffers?
- Which operations can the graphics driver accelerate through ePicasso?
- Are CPU, ePicasso, and display-controller buffers cache coherent?

For many products, the best result comes from combining several techniques: hardware-accelerated drawing, partial refresh, compressed or optimized assets, careful buffer placement, and a UI design that avoids unnecessary full-screen redraws.

## Key Takeaways { #key-takeaways }

- ePicasso is SiFli's 2D/2.5D graphics accelerator for SF32 microcontrollers.
- It offloads common pixel operations such as fill, copy, blending, scaling, rotation, and layer composition.
- It works alongside the display controller; ePicasso prepares pixel data, while the display controller sends it to the panel.
- Its benefits are strongest in UI-heavy products where memory movement, blending, and repeated pixel processing would otherwise consume significant CPU time.
- LVGL and other UI frameworks can benefit from ePicasso when the SF32 graphics driver maps supported draw operations to hardware.
- Real performance depends on display resolution, memory placement, pixel formats, buffer strategy, cache handling, and panel interface bandwidth.
