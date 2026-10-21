---
icon: lucide/layout-dashboard
title: "LVGL SDK Examples"
description: "Choose the right SiFli-SDK LVGL example for UI bring-up, widgets, design tools, compressed assets, animation, media, and wearable interfaces."
tags:
  - Graphics
  - LVGL
  - Examples
---

# LVGL SDK Examples { #lvgl-sdk-examples }

The SiFli-SDK LVGL examples are starting points for testing a display and UI path, not interchangeable product templates. First establish basic panel and input operation with the appropriate version's demo. Then choose the example that exercises the product's main integration risk, run it unchanged on a documented board configuration, and replace one layer at a time. Check each README's validation status and restrictions before treating the example as a working baseline.

This guide organizes the examples in the [SiFli-SDK LVGL index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) by engineering outcome. Refer to the official source page for the current supported boards, SDK configuration, source path, assets, build command, and version-specific restrictions.

The index is a catalogue, not a board-compatibility matrix. Support is specific to each example, and a family name in a documentation URL does not establish support for that family. Use each example's own **Supported Boards** section. A generic build command or a board listed in the repository's build matrix is not, by itself, evidence of runtime validation. Where those sources differ, keep the distinction explicit and verify the exact SDK revision and board.

## Start with the Right LVGL Baseline { #start-with-the-right-lvgl-baseline }

<div align="center"><em>Table: SiFli-SDK LVGL Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering goal | Start with | What it helps you establish | Move on when |
|:-----------------|:-----------|:----------------------------|:-------------|
| Bring up a standard LVGL application | **[LVGL v8 Demos](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**, **[LVGL v8 Official Examples](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**, **[LVGL v9 Demo](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)**, or **[LVGL v9 Official Examples](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | The selected LVGL version, board display driver, rendering loop, and baseline widgets | The display flush path and input device are stable on the actual panel |
| Evaluate a UI-design workflow | **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**, **[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)**, or **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** examples | How generated UI code fits into an SDK project | Generated code builds cleanly and its LVGL version matches the project |
| Prototype focused UI behavior | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**, **[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**, **[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**, **[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**, **[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**, **[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**, **[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**, **[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**, **[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**, **[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**, **[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**, **[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)**, or **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | A specific interaction, widget, arrangement, or animation pattern | The product needs a composed screen rather than an isolated visual element |
| Validate assets, animation, or media | **[Dynamic eZip v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**, **[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**, **[Local Video File Playback](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)**, or **[streaming_media](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | The storage, decode, rendering, and refresh path for richer content | Asset size, memory placement, update rate, and power consumption are measured on target hardware and fit the product's limits |
| Build a recognizable end-to-end UI | **[Electronic Compass](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**, **[Games index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)** ([Minesweeper README](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)), or **[Watch Interface v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | Screen flow, interaction, and a multi-feature display workload | Product-specific data, lifecycle behavior, and performance limits are ready to replace the demo content |

</div>

The target lists differ by example. The v8 Demos README lists `eh-lb563` and the SF32LB52x, SF32LB56x, and SF32LB58x LCD series. The v8 Official Examples README lists `sf32lb52-lchspi-ulp` and those three LCD series. The v9 Demo README lists the three LCD series; its generic build instructions also show `eh-lb563`, which is not included in its explicit **Supported Development Boards** list. The v9 Official Examples README lists `sf32lb52-lchspi-ulp` and the three LCD series. Treat each README's explicit list as the documented scope; do not add a target from a generic build example alone.

## Confirm the Integration Boundary First { #confirm-the-integration-boundary-first }

Before adapting any LVGL example, establish which layer the sample already proves and which layers remain product work:

<div align="center"><em>Table: LVGL Example Integration Boundaries</em></div>

<div align="center" markdown>

| Boundary | The example can establish | The product must still establish |
|:---------|:--------------------------|:--------------------------------|
| Board and panel | A known SDK board configuration and display route | Exact panel, touch controller, power sequence, pin mux, reset timing, and production test path |
| LVGL | Version-specific initialization and example UI behavior | The product's screen architecture, event ownership, memory limits, and update policy |
| Assets | A supported sample asset path | Asset format, storage size, loading time, cache policy, licensing, and failure handling |
| Rendering | A working draw and flush loop | Dirty-region strategy, buffer count, color format, DMA/cache handling, and UI responsiveness under load |
| Application | Visible demonstration behavior | Sensors, Bluetooth, storage, timekeeping, low-power transitions, recovery, and user data |

</div>

Start by verifying the physical display, its panel interface, and the basic flush path. See [Graphics Overview](overview.md) and [Display Controller](display-controller.md) before treating an LVGL demo as evidence that the final graphics architecture is ready.

## Choose the LVGL Version Deliberately { #choose-the-lvgl-version-deliberately }

The official index includes both LVGL v8 and LVGL v9 examples. Keep a generated UI project, its example baseline, and the SDK configuration on the same LVGL major version. Do not take a generated screen or a custom widget from one major version and drop it into another without an explicit porting review.

For a first board bring-up, use the demo or official-example entry that matches the LVGL version already selected by the SDK board configuration. It provides the cleanest proof of the panel, buffers, input, and scheduling path before application-specific work begins.

!!! warning "Back up the card before using the LVGL v8 SJPG example"
    In the v8 Official Examples project, the optional SJPG-from-TF-card path calls `dfs_mkfs()` on the card's root region if mounting fails, which can erase data. Back up the card before enabling and running that path, and inspect the code in your SDK revision. Do not generalize this warning to every LVGL v8 or v9 example; check each project's own mount and format behavior.

## Generated UI: gui_guider, SquareLine, and EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

Use a UI-design-tool example when the team needs a visual editor to produce a screen hierarchy, styles, and assets. The index includes examples for **gui_guider**, **SquareLine**, and **EEZ Studio**.

For every generator, verify the code version, screen resolution, color depth, asset path, and callback ownership before importing its output into a product.

Both gui_guider and EEZ Studio source examples specify LVGL v8. SquareLine also requires the default theme used by its generated code. Include generated subdirectories in the build and follow the documented optional eZip conversion steps; copying files alone is not sufficient.

Generated code accelerates UI construction; it does not replace the display driver, buffer plan, input drivers, power policy, or integration tests. Keep generated files separate from hand-written application logic so that a re-export does not silently overwrite product changes.

## Widget and Interaction Patterns { #widget-and-interaction-patterns }

Use the focused LVGL v8 samples to investigate a particular UI behavior. Their scope varies; Multlist is a complete application-framework demo rather than a minimal widget test.

- **Basechart** plots data series; **Baselabel** binds data sources to periodically refreshed text.
- **Follow** demonstrates a gravity-driven icon menu; **Select** demonstrates selection state; **Sector** maps a value to an image's visible angular sector.
- **Imgarray** assembles numeric readouts from image glyphs; **Imgbar** crops a foreground image to show progress.
- **Mulroller** is a customizable, callback-driven wheel selector; **Multroller** is a simpler text-option roller.
- **Multlist** covers lists, paging, transitions, resource caching, and page lifecycle; **Multslider** places a value or short label on the slider's knob.
- **Multanim** demonstrates transition effects, some conditional on GPU/VGLite support; **Timeline** coordinates animations on a shared time axis.

Board support is not uniform across these focused examples. For example, the explicit **Supported Boards** lists for Multanim and Multlist name `sf32lb52-lcd_n16r8` and `sf32lb52-lchspi-ulp`, while later generic build instructions mention broader 52x/56x/58x targets and use `eh-lb563` as a build example. Those statements do not establish the same support scope. Verify the specific README and current project configuration; do not infer compatibility for the other widgets from the index or URL.

Use one of these when a particular control is the risk in your product. Keep the first port small: run the original control, substitute product data, then measure redraw cost and memory use before adding it to a larger screen. Combining several visually simple controls can still stress the framebuffer, resource-read bandwidth, or input-event scheduling.

## Asset, Animation, and Media Workloads { #asset-animation-and-media-workloads }

The Dynamic eZip examples are available for both LVGL v8 and LVGL v9. Use the version that matches the application to validate dynamic compressed-asset loading before adopting it broadly. The [eZip](ezip.md) article explains the asset-compression role in the graphics pipeline.

For animated GIF/APNG assets, SiFli also provides [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) and [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html) examples under **Multimedia > AGIF**. Each README names `eh-lb525`; the current [GCC build matrix](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) also registers both project paths under `devkit_lcd_boards`. Matrix registration indicates a build target, not runtime validation across every board in that group. Confirm the exact target and SDK revision before using either example as a product baseline.

Dynamic-eZip samples compare file-path access with preloading into SRAM or PSRAM. Preloading uses additional memory and can reduce repeated file reads. Match assets to LVGL v8/v9; the documented v9 path requires a drive prefix such as `A:/`, unlike v8. Check the actual storage backend and drive-letter configuration. The v9 README explicitly lists `sf32lb52-lcd_n16r8`, `sf32lb52-lcd_a128r16`, `sf32lb52-lchspi-ulp`, `sf32lb52-core_e8r16`, `sf32lb56-lcd_a128r12n1`, `sf32lb56-lcd_n16r12n1`, `sf32lb58-lcd_n16r32n1_dsi`, `sf32lb58-lcd_a128r32n1_qspi`, and `sf32lb58-lcd_n16r32n1_qspi`; do not transpose that list to v8 or infer support for other boards. For SF32LB57 only, the eZip documentation requires the `-winsize 2048` conversion option.

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html), [local video playback](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html), and [streaming media](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html) exercise different content paths, not a fixed ranking of complexity. The Lottie README marks the example **unverified**, lists `eh-lb563` and the SF32LB52x/SF32LB56x series, and the current GCC build matrix comments out its project entry. Treat the board list as unverified documentation, not as a validated target set. The local-video README explicitly lists `eh-lb523` and `sf32lb52-lcd_n16r8`, but also contains broader generic build instructions; its project entry is commented out in the current GCC build matrix. Verify the exact SDK checkout before relying on either statement for another target. The sample plays H.264 video in `disk/video_example.mp4`; if a TF card mounts successfully, it reads `video_example.mp4` from the card root first. The streaming README lists only `sf32lb52-lchspi-ulp`; it obtains network access through a phone's Bluetooth PAN tethering and uses FFmpeg. It is not a BLE video-streaming example.

Evaluate each as a system workload. With Bluetooth, sensors, and the intended display interface active, measure resource or stream storage, decode time, frame-update rate, PSRAM/SRAM use, display bandwidth, and current consumption. Resource complexity, resolution, decoder configuration, and buffering determine the actual cost.

Avoid treating a smooth short demo as proof that the path can sustain a long-running animation. Use realistic content duration and the actual panel refresh policy when validating a product.

## Fonts and Runtime Language Switching { #fonts-and-runtime-language-switching }

The [FreeType example](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html) loads TrueType fonts from the filesystem and switches fonts and sizes at runtime. Its README says it has been verified on `sf32lb52-lchspi-ulp`; other boards need an `FS_REGION` partition and sufficient system heap, so do not treat them as verified by the example. It demonstrates fallback to a built-in font when loading fails, heap checks, and releasing the previous font when switching. Check glyph coverage and heap use with the actual languages and font sizes; subset large CJK fonts rather than assuming the whole font fits. The documented path requires TrueType outlines, not CFF-based OpenType fonts. A font cannot be freed while a widget or style still references it, and font changes must run in the LVGL thread. If packaged fonts change, rebuild and flash the filesystem image `fs_root.bin`; updating the application alone does not update those files.

The multilingual examples for [LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html) and [LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html) cover built-in languages, external language-pack installation, runtime switching, rescanning the installer directory, and saving the selected language through `share_prefs`. The v8 README lists `sf32lb52-lchspi-ulp`; check the v9 README's own target list instead of carrying that board over by assumption. JSON or XLSX inputs generate compiled resources for built-in languages or binary packs for external languages. Keep translation keys consistent across languages and ensure fonts cover the required characters. Test switching, restart persistence, missing resources, and the filesystem update procedure. Follow each version's documented paths and configuration; do not assume they are identical based on the feature name.

## Compass, Games, and Watch Interfaces { #compass-games-and-watch-interfaces }

The electronic-compass and watch-interface examples combine display behavior with application-level concerns. Use them to study screen organization, input and animation timing, and the effects of a richer display workload. The Games index links to a Minesweeper example. Its README lists `eh-lb563` and the SF32LB52x/SF32LB56x series, but not 58x; verify support in your current SDK checkout before using it on 58x.

The documented compass baseline uses an MMC56x3 three-axis magnetometer over I2C on `sf32lb52-lchspi-ulp`. Confirm its driver, wiring, and calibration for the actual product; the displayed heading alone does not establish direction accuracy.

Game and watch-interface examples are useful starting points for screen flow, but the product must still define data ownership, low-power behavior, display wake policy, notifications, and fault recovery.

The v8 watch README lists the SF32LB52x, SF32LB56x, and SF32LB58x LCD series plus `sf32lb52-lchspi-ulp`; the v9 README lists the three LCD series. Both exclude `520-hdk` and state that the 3D-rotation demo is unavailable on SF32LB55x. Check resource-partition sizes when adding fonts; the v8 example can overflow its allocated font region.

## Adapt an Example Without Losing Its Evidence { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Table: Product-Adaptation Checks for LVGL Examples</em></div>

<div align="center" markdown>

| Step | Evidence to keep | Why it matters |
|:-----|:-----------------|:---------------|
| Build the original | SDK revision, board name, configuration, and build log | Preserves a known-good baseline |
| Run on hardware | Photo/video, serial log, panel and touch behavior | Confirms the actual display and input route |
| Add one product element | Change record and measured frame rate and refresh behavior | Makes regressions attributable |
| Exercise product load | UI responsiveness with Bluetooth, sensors, storage, and low-power transitions | Finds integration limits absent from a standalone demo |
| Record final limits | Buffer use, memory placement, frame rate, power, and known failure behavior | Turns the example into maintainable engineering evidence |

</div>

## Related Resources { #related-resources }

- [Graphics Overview](overview.md) for display selection, framebuffer planning, LVGL integration, and system trade-offs.
- [Display Controller](display-controller.md) for the controller, buffers, and flush path.
- [ePicasso](epicasso-gpu.md), [eZip](ezip.md), and [TurboPixel](turbopixel.md) for SF32 graphics acceleration and compression features.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
- [SiFli-SDK LVGL Example Index](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) for the current official list and setup details.
