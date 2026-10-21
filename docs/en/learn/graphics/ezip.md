---
icon: lucide/file-archive
description: "How SiFli eZip and eZip-A reduce embedded UI asset storage, memory bandwidth, and CPU decode work on supported SF32 devices."
tags:
  - Graphics
---

# eZip Lossless Compression and Hardware Decoding { #ezip-lossless-compression-and-hardware-decoding }

## Introduction { #introduction }

**eZip** is SiFli's proprietary lossless compression format for graphics assets. On SF32 devices that support the relevant functions, the EZIP hardware block decodes eZip graphics assets; it also provides separate GZIP and LZ4 modes for general data, with decompressed output written to memory over AHB rather than sent directly to EPIC. Rather than storing every display asset as an uncompressed bitmap in NOR Flash, PSRAM, or a file system, a product can store eZip output and decode it when the UI needs it.

**eZip-A** is the corresponding animated-asset format. Source assets are converted during the build or asset-preparation flow; eZip is not a general-purpose image decoder that accepts arbitrary files at runtime.

For non-graphics data such as an OTA image, the product must define and validate the complete update flow, including storage, integrity checking, compatibility, and the intended decompression path. The [graphics flow](overview.md#sf32-graphics-flow) applies to display assets, not to that application-level update workflow.

For a graphics product, the objective is to move fewer bytes from storage and avoid spending application-CPU time repeatedly decompressing resources. This can reduce storage use and external-memory traffic while leaving headroom for UI, Bluetooth, audio, and application work.

For the position of eZip relative to ePicasso, TurboPixel, and the display controller, see [Graphics Overview](overview.md#sf32-graphics-flow). This page focuses on eZip asset preparation, compression behavior, and decoding.

Read this page when UI assets are consuming too much Flash or external-memory bandwidth, or when you need a repeatable asset-conversion workflow. It distinguishes lossless source-asset compression from final-framebuffer compression, which is covered by [TurboPixel](turbopixel.md).

## Capabilities and Boundaries { #capabilities-and-boundaries }

eZip is intended for a production asset pipeline, rather than ad hoc file handling:

- **Lossless graphics compression.** The format preserves image data and supports transparency. SiFli describes its typical graphics compression ratio qualitatively as *slightly higher than PNG*; it does not publish one fixed numeric ratio.
- **Static and animated assets.** GraphicsTool can convert PNG, GIF, and APNG assets into eZip static assets or eZip-A animations.
- **Hardware-assisted decoding on supported devices.** This can reduce application-CPU decode work, subject to the selected chip, SDK, source format, and driver path.
- **Graphics-tool workflow.** SiFli's GraphicsTool handles common source formats, resizing, image conversion, batch processing, and eZip/eZip-A generation.
- **ePicasso integration on supported devices.** Direct output can avoid a buffer for the complete decoded source image, reducing buffer capacity and memory traffic.

“Lossless” describes compression of the pixels supplied to the encoder, not every earlier conversion step. Resizing, converting RGB888 to RGB565, or discarding alpha can lose information before compression. Compare decoded pixels with the same-size, same-format encoder input, and retain alpha when it is required.

## Compression Ratio and General-Purpose Use { #compression-ratio-and-general-purpose-use }

For graphics resources, use PNG as the practical baseline: SiFli describes eZip as achieving a compression ratio slightly higher than PNG while retaining lossless image data and transparency support. The actual file-size reduction still varies with image dimensions, pixel format, transparency, palette use, and image detail. Measure representative assets with the approved conversion profile; do not budget capacity from one percentage.

The SiFli EZIP utility can also compress general-purpose files with GZIP or LZ4. This is separate from converting graphics assets to eZip. Compression ratios for general data depend on the source: repetitive or structured data may compress well, while files that are already compressed—such as JPEG images, MP4 video, ZIP archives, or encrypted data—may compress little or not at all. Before using this path for non-graphics data, validate the resulting size and the decode mode supported by the target device.

The EZIP HAL separates graphics eZip from GZIP and LZ4 work modes. General-purpose GZIP/LZ4 decompression uses the AHB memory-output path, not direct EPIC output. An OTA archive must match the selected mode and its supported framing and size constraints; a graphics `.ezip` file is not interchangeable with an arbitrary compressed update package.

## Representative Image Size Measurement Template { #representative-image-size-comparison-placeholder }

Use this section to record like-for-like measurements for representative **opaque** and **alpha-bearing** UI images. Replace the placeholders after converting each source image with approved tool versions and settings. Record source dimensions, color format, alpha treatment, and JPEG quality with the results. eZip and PNG retain source transparency; JPEG does not carry alpha, so its transparent-image comparison must use a documented pre-composited background and must not be presented as equivalent alpha preservation.

<div align="center"><em>Representative Image File-Size Measurement Template</em></div>

<div align="center" markdown>

| Scenario | Format | Encoding | File size | Relative to BMP | Test settings / notes |
|:---|:---|:---|---:|---:|:---|
| Opaque UI image | BMP | Uncompressed reference | TBD | 100% | Source image: TBD; dimensions: TBD; pixel format: TBD |
| Opaque UI image | eZip | Lossless | TBD | TBD | GraphicsTool version and conversion profile: TBD |
| Opaque UI image | PNG | Lossless | TBD | TBD | Encoder and settings: TBD |
| Opaque UI image | JPEG | Lossy | TBD | TBD | Encoder and quality setting: TBD |
| UI image with per-pixel alpha | BMP | Uncompressed reference | TBD | 100% | State the exact BMP variant or alpha treatment: TBD |
| UI image with per-pixel alpha | eZip | Lossless with alpha | TBD | TBD | GraphicsTool version and conversion profile; verify transparent edges: TBD |
| UI image with per-pixel alpha | PNG | Lossless with alpha | TBD | TBD | Encoder and settings: TBD |
| UI image with per-pixel alpha | JPEG | Lossy, no alpha | TBD | TBD | Record the pre-composited background and quality setting; not an alpha-preserving comparison |

</div>

Calculate **Relative to BMP** as `file size ÷ BMP file size × 100%` within the same scenario. Do not compare the opaque and alpha-bearing rows directly, or use this table as a generic compression-ratio claim: it is intentionally a measurement template, and results change with the selected artwork, alpha coverage, and conversion settings.

## Why Use eZip { #why-use-ezip }

### Reduce Asset Storage { #reduce-asset-storage }

Compressed assets can occupy less NOR Flash, PSRAM, NAND, or removable-storage capacity than raw pixel buffers. This is especially valuable for watch faces, multilingual font packs, icon sets, UI themes, and animation-heavy interfaces.

### Reduce Memory-Bus Traffic { #reduce-memory-bus-traffic }

When assets reside in external NOR Flash or PSRAM, uncompressed bitmaps can consume substantial bus bandwidth before drawing begins. Moving a compressed asset and decoding it near the graphics path can reduce that traffic. The actual gain depends on compression ratio, source format, display-update pattern, and storage-interface speed.

### Free CPU Time { #preserve-cpu-time }

On a supported hardware decoding path, the application CPU need not decompress every asset in software. The released headroom can improve UI responsiveness or serve wireless, audio, sensors, and low-power scheduling.

### Make Asset Delivery Repeatable { #make-asset-delivery-repeatable }

Using a conversion tool and controlled asset format makes releases reproducible: source artwork, conversion settings, generated assets, and target-resolution profiles can be versioned together. This is more dependable than manual conversion or relying on UI developers to reproduce image settings.

## eZip Implementation Comparison { #ezip-version-comparison }

The table uses names supported by the primary product briefs and SDK, rather than treating a version number as a universal feature guarantee. Confirm the selected chip, SDK release, asset format, and board-memory configuration.

<div align="center"><em>eZip Implementations and Separate JPEG Support</em></div>

<div align="center" markdown>

| Implementation | Representative SF32 Family | Documented Capability | Practical Implication |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | Lossless graphics decompression with direct ePicasso integration; the SDK excludes this family from native eZip-A support. | Use static eZip assets; do not assume native eZip-A animation support. |
| **eZip 2.0** | SF32LB52x, SF32LB56x, SF32LB58x | Lossless graphics and native eZip-A animation support. SF32LB58x also has a separate JPEG codec. | Validate animation and memory requirements; treat JPEG/MJPEG handling as a separate media path. |
| **EZIP** | SF32LB57x | eZip/eZip-A decoding with direct EPIC output. JPEGD is a separate JPEG decoder; do not assume it shares EZIP's direct-output path. | Generate compatible assets with a 2048-byte compression window. These facts do not establish a complete MJPEG playback path; verify the middleware and decoder support for the exact target. |

</div>

Direct EPIC output avoids storing a complete decoded eZip source image before rendering. It does not eliminate decoder work memory or the final rendering buffer, and it does not make JPEG decoding part of EZIP. Treat the separate JPEGD path according to the target family's documented driver pipeline.

## Preparing Assets { #preparing-assets }

Keep editable source assets under version control, then generate eZip output as a build artifact:

1. Define the target display resolution, pixel format, and animation requirements for the selected device.
2. Prepare source images or animations at the intended dimensions; avoid runtime scaling to compensate for poorly sized artwork.
3. Use SiFli GraphicsTool to convert, resize, and generate eZip or eZip-A output.
4. Record the tool version and conversion profile with the project, then validate generated assets on target hardware.
5. Place output in the intended storage location and test cold boot, repeated UI use, low-memory behavior, and display updates alongside Bluetooth or audio activity.

GraphicsTool supports common image formats such as PNG, JPEG, WebP, and AVIF, and can process GIF, PNG, and APNG into eZip/eZip-A resources. A converted asset is usable only when the target device and SDK support its configured decoding path.

For other static source formats, the documented workflow is to resize and convert to PNG first, then encode eZip. Match the output color/alpha format and LVGL version to the target. The SDK command-line example requires `-winsize 2048` for SF32LB57x; the other listed families do not require that option. Use `sdk/tools/png2ezip/ezip.exe` and record the exact arguments with the generated assets.

## Integration Tools { #integration-tools }

SiFli provides more than the desktop GraphicsTool workflow:

- **Command-line development tools** support integrating eZip conversion into scripted, repeatable asset pipelines. Use them in local build scripts or continuous-integration jobs so the checked-in source artwork and generated eZip output remain traceable.
- **Android and iOS SDKs** support eZip integration in mobile applications. They are useful when a companion app needs to prepare, manage, transfer, or otherwise work with eZip resources as part of a device workflow.

Keep conversion profiles, tool or SDK versions, output checksums, and target-device compatibility requirements under version control. Mobile and command-line integrations should use the same approved asset profile as the embedded product; do not assume that a file generated for one chip or SDK configuration will work unchanged on every SF32 target.

## Design and Debugging Guidance { #design-and-debugging-guidance }

- **Use eZip for assets.** Assets can reside in NOR Flash, PSRAM, NAND, or a file system, but the decoder does not interpret file paths. The storage driver must expose or load data through a supported hardware-accessible path. In the HAL, input and AHB output buffers require 4-byte alignment. eZip is not a final-framebuffer compression format.
- **Budget asset-transfer bandwidth.** eZip can reduce asset-transfer traffic, but decoded pixels still require the rendering and display path described in [Graphics Overview](overview.md#sf32-graphics-flow).
- **Keep CPU fallback paths.** Not every asset type, pixel format, or UI operation maps to a hardware decode or graphics path.
- **Validate memory placement.** Test assets and draw buffers in internal SRAM, NOR Flash, PSRAM, or removable storage; each choice changes latency and bus contention.
- **Test the real workload.** Measure cold-load time, animation cadence, UI latency, and power while Bluetooth, audio, sensors, and display refresh are active together.
- **Freeze conversion settings before release.** Tool-version or parameter changes can affect output compatibility, quality, storage use, and decode performance.

## Key Takeaways { #key-takeaways }

- eZip is SiFli's lossless display-asset compression format and hardware-assisted decode path on supported SF32 devices.
- Use eZip for graphics assets and the utility's GZIP/LZ4 modes for general data; general-data compression ratios depend on the source and must be measured.
- eZip-A carries animated assets; GraphicsTool prepares eZip/eZip-A resources from common source artwork.
- SiFli also provides command-line tools and Android/iOS SDKs for integrating eZip into automated and mobile companion-app workflows.
- eZip can reduce asset storage, external-memory traffic, and application-CPU decode work, but it does not replace ePicasso or the display controller.
- Choose the documented implementation and output path, not an assumed version hierarchy. Keep JPEGD separate from EZIP and use the required SF32LB57x compression window.
- A successful eZip design is a controlled asset pipeline: source artwork, conversion settings, storage placement, graphics integration, and on-target testing all matter.

## Primary References { #primary-references }

- [GraphicsTool and asset preparation](https://wiki.sifli.com/tools/图形转换工具.html)
- [EZIP HAL modes, output paths, alignment, and animation support](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [EZIP utility documentation](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [EZIP HAL modes, alignment, and animation support](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [LVGL eZip example and conversion parameters](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [Mobile eZip SDK documentation](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- Product briefs: [SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf), [SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf), [SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf), [SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [Separate JPEGD interface](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
