---
icon: lucide/minimize-2
description: "How TurboPixel's fixed-ratio lossy framebuffer compression reduces buffer storage and display-read traffic on supported SF32 devices."
tags:
  - Graphics
---

# TurboPixel Framebuffer Compression { #turbopixel-framebuffer-compression }

## Overview { #overview }

**TurboPixel** is a fixed-ratio, lossy compression format for the final rendered bitmap on supported SF32 devices. It is part of the display path: **extDMA** compresses the bitmap, and the display controller decompresses TurboPixel as it transfers pixels to the panel.

TurboPixel is not an asset-storage format and does not replace [eZip](ezip.md). eZip losslessly compresses source assets before they are read from storage; TurboPixel compresses the final rendered bitmap to reduce the PSRAM capacity and PSRAM bandwidth required by framebuffer traffic.

For the complete graphics flow and the position of TurboPixel relative to eZip, ePicasso, and the display controller, see [Graphics Overview](overview.md#sf32-graphics-flow). This page focuses on TurboPixel's compression behavior, integration trade-offs, and availability.

Read this page when framebuffer capacity or display-read traffic is the bottleneck on an SF32LB55x, SF32LB56x, or SF32LB58x design. It helps product and firmware engineers weigh predictable PSRAM savings against lossy image quality; it is not a substitute for eZip asset compression.

## Fixed-Ratio and Lossy by Design { #fixed-ratio-and-lossy-by-design }

TurboPixel has two defining properties:

- **Fixed ratio for a selected configuration.** The input pixel format and compression setting determine the nominal factor; it does not vary with image detail. The required allocation also depends on row alignment and chunking. Use the selected chip and SDK's sizing rules rather than a ratio copied from another configuration.
- **Lossy compression.** A TurboPixel-decompressed bitmap is not guaranteed to reproduce every original pixel value. The format trades some image fidelity for predictable reductions in PSRAM use and PSRAM traffic.

Lossy compression is often a sensible trade in a constrained embedded display system, but it is a product decision. Evaluate real screens at the target panel resolution, color depth, viewing distance, and refresh behavior rather than judging quality from a generic test image.

## Framebuffer Measurement Template { #framebuffer-compression-comparison-placeholder }

Use this section to record measured TurboPixel results for one representative display resolution and SDK configuration. Unlike the eZip file-size comparison, this is a **framebuffer allocation and PSRAM-traffic** comparison: TurboPixel operates after rendering, not on the source asset file.

Include both opaque and alpha-blended screens. Alpha blending normally happens before TurboPixel, when the renderer composites foreground and background pixels into the final framebuffer. A screen that contains translucent icons, text, shadows, or layers can still produce an opaque RGB565 final framebuffer; record that distinction rather than treating the presence of alpha in source assets as an alpha channel in the compressed framebuffer.

<div align="center"><em>Representative TurboPixel Framebuffer Measurement Template</em></div>

<div align="center" markdown>

| Scenario | Source / Layer Alpha | Final Framebuffer Format and Alpha State | Uncompressed Allocation / Traffic | TurboPixel Allocation / Traffic | Relative to Uncompressed | Test Settings / Visual Result |
|:---|:---|:---|---:|---:|---:|:---|
| Opaque UI | None | TBD, opaque | TBD | TBD | TBD | Resolution: TBD; refresh policy: TBD; TurboPixel ratio/configuration: TBD |
| Alpha-blended UI, composited before output | Per-pixel and/or global alpha in source layers | TBD, typically opaque after composition | TBD | TBD | TBD | Record blended content: TBD; check edge, shadow, gradient, and text artifacts |
| Alpha-preserving output path, if supported | Alpha retained to the final buffer | TBD | TBD | TBD | TBD | Confirm exact chip, SDK, format, and display path before testing |

</div>

For each valid TurboPixel path, calculate **Relative to Uncompressed** as `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%`. The expected allocation follows the applicable fixed ratio, but the exact ratio, supported formats, alignment, refresh policy, and measured PSRAM traffic must come from the selected chip's documentation, SDK, and target-hardware test. Record visual acceptance separately: a fixed allocation ratio does not guarantee identical artifacts across opaque, text-heavy, gradient, and alpha-blended content.

## Why Use TurboPixel { #why-use-turbopixel }

### Reduce Framebuffer Storage { #reduce-psram-capacity }

A full framebuffer can occupy substantial PSRAM at high resolution or with multiple draw buffers. TurboPixel reduces the allocation for the compressed final bitmap, which can leave more memory for UI assets, audio, application data, or other surfaces.

Budget peak live memory, not just that bitmap. An uncompressed render buffer, compressed display buffer, compression workspace, and double-buffered copies may coexist. Their sizes and lifetimes determine whether the complete design actually needs less PSRAM.

### Reduce Display-Read Traffic { #reduce-psram-bandwidth }

The display controller reads fewer bytes from a compressed framebuffer before decompression, reducing display-read traffic and contention with CPU, ePicasso, DMA, audio, and wireless activity.

That is not the total memory-traffic saving. Rendering still writes pixels, and compression reads its input and writes its output. Measure those transfers and their overlap with display reads. For frequently redrawn screens, compression overhead may offset the read savings; for repeatedly displayed frames, the balance can be different. Measure system energy as well as bandwidth.

### Make Budgeting Predictable { #make-budgeting-predictable }

For a fixed pixel format and compression setting, content changes do not change the nominal ratio. Use the SDK's compressed-row sizing and alignment rules to allocate buffers, then include all render, compression, and display reads/writes in the bandwidth budget. Keep panel-transfer bytes separate: TurboPixel is decompressed before panel output and does not automatically reduce that transfer.

## Quality and Integration Trade-Offs { #quality-and-integration-trade-offs }

TurboPixel should be validated as part of the complete display design:

- Test text, thin lines, gradients, icons, photographs, animations, and high-contrast UI elements for visible artifacts.
- Confirm the color format, buffer alignment, extDMA path, and display-controller configuration supported by the chosen device and SDK.
- Measure frame time, PSRAM bandwidth, UI latency, and power under combined display, Bluetooth, audio, and AI workloads.
- Keep an uncompressed path available during bring-up so that image-quality and driver issues can be isolated.
- Do not present TurboPixel as lossless, even when artifacts are not visible in a particular UI.

## SDK Integration Checks { #sdk-integration-checks }

The referenced extDMA guide lists ten nominal compression levels, while the referenced SDK sizing implementation supports levels 1, 2, and 3. Do not assume all documented levels are accepted by your build. Validate the selected setting and use the matching row-size calculation; an unsupported value can fall back to a different setting in a helper.

The extDMA guide lists RGB565, RGB888, and ARGB8888 inputs. Input support alone does not guarantee an alpha-preserving compressed display path. The LCDC branch without its dedicated layer-0 decompression register accepts RGB565/RGB888 for compressed layers; check the branch used by the selected chip. In the referenced LCDC driver, compression is enabled on layer 0 through `HAL_LCDC_LayerSetCmpr`.

The current OpenSiFli LCDC header defines the compressed-layer support macro only when `HAL_EXTDMA_MODULE_ENABLED` is enabled; its family guard excludes SF32LB52x and SF32LB57x. The header defines maximum compressed-layer widths of 512 pixels for SF32LB55x/SF32LB56x and 1024 pixels for SF32LB58x. These are compressed-layer integration limits, not universal panel-resolution limits. A source comment also notes that the LCPU path is not enabled.

SF32LB55x needs an integration caveat. The current OpenSiFli LCDC header defines the compressed-layer macro when `HAL_EXTDMA_MODULE_ENABLED` is enabled, but its comment notes that the LCPU path is not enabled. The published SDK LCDC capability table marks compressed-layer decompression unsupported on 55x, while the SF32LB55x datasheet describes TurboPixel and LCD-controller decompression. A compile-time macro does not prove that the complete display path has been validated. Treat 55x support as conditional and verify the exact SDK revision, core, build configuration, and target hardware; do not infer runtime support from the macro alone.

Keep renderer, extDMA, and display-controller buffer ownership separate. Wait for rendering before compression, for compression before display use, and for display use to finish before reusing that buffer. With cacheable shared memory, clean CPU-written input before hardware reads, prepare destination cache lines so dirty data cannot overwrite hardware output, and invalidate after completion before CPU reads it. Respect cache-line boundaries and neighboring data. Compression completion is not panel-transfer completion.

The extDMA source address, destination address, and transfer length must be 4-byte aligned. Follow the selected SDK's row stride, chunking, and buffer-sizing rules; dividing raw frame bytes by a nominal ratio is not sufficient.

## Availability in the SF32 Family { #availability-in-the-sf32-family }

TurboPixel is documented for the following SF32 families:

<div align="center"><em>Documented TurboPixel Availability</em></div>

<div align="center" markdown>

| SF32 Family | TurboPixel Status | Integration Context |
|:---|:---|:---|
| **SF32LB52x** | Not available | Use an uncompressed framebuffer or another supported memory/bandwidth strategy. |
| **SF32LB55x** | Conditional in current source; end-to-end support not established | The current LCDC header exposes compressed-layer capability when extDMA is enabled, but notes that the LCPU path is not enabled; the published feature table marks 55x unsupported. Verify the exact core, SDK configuration, and target hardware. |
| **SF32LB56x** | Documented | extDMA fixed-ratio lossy final-framebuffer compression with display-controller decompression. |
| **SF32LB57x** | Not available | Use an uncompressed framebuffer or another supported memory/bandwidth strategy. |
| **SF32LB58x** | Documented | extDMA fixed-ratio lossy final-framebuffer compression with display-controller decompression. |
| **Other SF32 families** | Confirm per device | Do not infer TurboPixel support from eZip, ePicasso, or the presence of PSRAM. Check the exact chip datasheet, reference manual, SDK release, and display driver. |

</div>

This table records documented family-level availability, not a promise for every package, panel interface, pixel format, SDK version, or board configuration. Confirm the exact target before making a memory or bandwidth commitment.

## Key Takeaways { #key-takeaways }

- TurboPixel is a **fixed-ratio, lossy** final-framebuffer compression format.
- extDMA produces TurboPixel from the rendered bitmap; the display controller decompresses it on the panel path.
- Its main purpose is to reduce **framebuffer storage** and **display-read traffic**; confirm the savings for the complete buffer and transfer pipeline.
- TurboPixel is documented for SF32LB55x, SF32LB56x, and SF32LB58x. For 55x, the current header exposes the compressed-layer macro when extDMA is enabled but notes that the LCPU path is not enabled; the published feature table marks 55x unsupported. Treat it as conditional and validate the complete display path. The current source excludes SF32LB52x and SF32LB57x; confirm any other target individually.
- TurboPixel complements eZip: eZip is lossless asset compression, while TurboPixel is lossy compression for the final bitmap.

## Primary References { #primary-references }

- [extDMA guide](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [Compression sizing implementation](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [extDMA API](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [LCDC support guards](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [Current OpenSiFli LCDC compressed-layer guard](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [Generated SDK LCDC capability table](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [LCDC layer implementation](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- Product briefs: [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
