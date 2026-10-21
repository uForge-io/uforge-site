---
icon: lucide/audio-lines
title: "Audio SDK Examples"
description: "Choose the right SiFli-SDK audio example for PDM microphone capture, recording, playback, codecs, storage, and mixing."
tags:
  - Audio
  - Examples
---

# Audio SDK Examples { #audio-sdk-examples }

The SiFli-SDK audio examples are practical starting points for a complete signal path, not drop-in product firmware. Choose the one that already proves the hardest part of your design: microphone capture, a speaker path, storage, a codec, or multiple concurrent streams. Then make the unmodified example work on your target board before changing one subsystem at a time.

This page groups selected SiFli-SDK audio examples by engineering task. The official [audio index](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) is a starting point. Board targets below are those explicitly listed by the linked SiFli pages at review time; family names do not imply support for every board or SDK release. Check the exact page and target-board files before building.

## Start with the Right Example { #start-with-the-right-example }

<div align="center"><em>Table: SiFli-SDK Audio Examples by Engineering Task</em></div>

<div align="center" markdown>

| Engineering goal | Start with | What it proves | Officially documented target and constraints |
|:-----------------|:-----------|:---------------|:----------------------------|
| Capture from two or four digital microphones | [PDM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | PDM capture; WAV recording and playback in supported processing modes | Only `sf32lb56-lcd_a128r12n1` is listed on the current page. Confirm PDM wiring and pin mux. The pin-configuration caption misspells the board as `f32lb56-lcd_a128r12n1` (missing the initial `s`); the build command uses the correct name. |
| Capture from two analog microphones | [Local Music Example for stereo speaker (dual ADC/DAC)](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | Simultaneous capture to separate PCM files; select either microphone for speaker monitoring | Custom SF32LB58x board, not a SiFli module board; requires two analog microphones and two analog speakers. |
| Prove basic microphone-to-speaker behavior | [Record Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | Five-second microphone capture into a PCM memory buffer, then automatic playback | `eh-lb525`, `sf32lb52-lcd` series, `sf32lb56-lcd` series, or `sf32lb58-lcd` series; a speaker is required. |
| Play a preset file from the root filesystem | [Local Music Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | Playback of the preset `16k.wav` from the mounted FAT root partition; a preset MP3 can also be used if it fits | `eh-lb525`, `sf32lb52-lcd` series, `sf32lb56-lcd` series, or `sf32lb58-lcd` series; FAT root partition and speaker required. |
| Play music from an SD card | [MP3 Local Music Player](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | MP3 or WAV playback from the SD-card `music` directory and shell-controlled volume | Only `sf32lb52-lchspi-ulp` is listed; requires SPI1, FAT/MSD, a speaker, and an external battery for long-button detection. |
| Record, compress, decode, and play lossless audio | [FLAC Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | PCM recording plus FLAC encoding, decoding, and playback | `sf32lb52-lcd`, `sf32lb56-lcd`, or `sf32lb58-lcd` series; FAT, `libFLAC`, and audio components are required. |
| Record, compress, decode, and play speech audio | [Opus Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | 16 kHz microphone capture, Opus encode/decode, and speaker playback | Only `eh-lb525` is listed; FAT and audio components are required. Follow the example-specific stack guidance below. |
| Mix multiple local tracks | [Three-Channel Audio Mixer Player (official page in Chinese)](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | Independent decode of three local files, resampling where needed, and mixed output | The current page lists `sf32lb52-lcd_n16r8` and `sf32lb56-lcd_n16r12n1`; use the example's filesystem image and sample files. |

</div>

## Shared Starting Point { #shared-starting-point }

Most examples rely on the same baseline: the board audio hardware must be present and routed correctly, the board configuration must enable the required audio blocks, and the selected example must support the board you are building for. Examples that read or write files also require a mounted filesystem. Do not copy a board name, pin assignment, or `menuconfig` setting from a different example without checking the upstream page and the target board files.

!!! warning "Protect existing filesystem data"
    The v2.5.1 Opus sample calls `dfs_mkfs()` after a root-filesystem mount failure ([source](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)). Do not copy this automatic-formatting recovery into a product without an explicit data-preservation policy. A mount failure is not permission to erase user data.

For all examples, keep the first validation deliberately narrow:

1. Build and flash the unmodified project for a supported board.
2. Confirm the expected capture or playback behavior using known-good audio hardware and files.
3. Record the SDK revision, board name, configuration, pin assignment, and serial log.
4. Change one product-specific element, then repeat the same test.

The [Audio Overview](overview.md) explains the interface and system choices behind these samples. For buffer ownership, session teardown, and coexistence with display or Bluetooth workloads, continue with [Audio Server and Buffering](audio-server-buffering.md).

## Digital Microphone Capture: PDM { #digital-microphone-capture-pdm }

Use the PDM example when a product needs digital microphone capture rather than an analog microphone input. The official example supports two or four PDM microphones, but recording-file and playback behavior depend on the selected processing mode. Its documented topology uses the left and right channels of `PDM1` for two microphones, then adds `PDM2` to reach four. A single PDM interface can serve up to two digital microphones, so interface count is not microphone count; check the target SoC's interface and channel mapping to determine the supported configuration.

The current upstream page lists `sf32lb56-lcd_a128r12n1` as the supported board. The `pdm open pdm12 4 raw` mode logs data without creating a recording file. Anyka processing modes produce mono output, including the four-microphone mode; four inputs do not imply a four-channel output file. Check the algorithm dependencies and output format before using this as a microphone-array baseline.

Before adapting it, confirm all four boundaries:

- The selected chip and board expose the required PDM signals.
- The microphone clocks, data lines, supply, and grounding match the microphone data sheet.
- The board pin-mux configuration assigns the PDM functions before the driver starts.
- The product needs the recording/playback services enabled by the example; they are not required merely to capture PDM data.

The upstream PDM page currently documents its own supported-board configuration and example pin mapping. Treat those as a verified baseline, then replace them with the target board’s actual wiring rather than assuming they transfer unchanged. See the [PDM Example](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html).

## Analog Capture and Basic Record/Playback { #analog-capture-and-basic-recordplayback }

The **Record Example** is the shortest path to validate microphone capture followed by local playback: it records for five seconds into a PCM memory buffer, then automatically plays the buffer through the speaker. The official page lists `eh-lb525`, the `sf32lb52-lcd` series, the `sf32lb56-lcd` series, and the `sf32lb58-lcd` series. Start here before adding a filesystem, compression, Bluetooth transport, or multiple microphones.

The **Local Music Example for stereo speaker** (the dual ADC/DAC example) is a specialized baseline for a custom SF32LB58x board; the official page says it does not run on SiFli module boards and requires two analog microphones and two analog speakers. Its `mic2file` command records both microphones to separate PCM files; `mic2speaker 0` or `mic2speaker 1` selects a microphone for live speaker monitoring. Use it only when this custom analog topology matches the product; otherwise begin with the simpler Record Example.

For either path, verify the quiet-state noise floor, gain, clipping, and start/stop behavior before investigating software features. A stable PCM capture/playback path is the foundation for codec, file, and Bluetooth work.

## Local Playback and Storage { #local-playback-and-storage }

The **Local Music Example** is the smallest file-backed playback baseline. The official page lists `eh-lb525`, the `sf32lb52-lcd` series, the `sf32lb56-lcd` series, and the `sf32lb58-lcd` series. It mounts the FAT root partition and plays the preset `16k.wav` file. It can also play a preset MP3 placed in the example's `disk/` directory, provided the file fits within the configured filesystem capacity. Use it for notification sounds, bundled prompts, and early validation of the local speaker path.

The **MP3 Local Music Player** adds removable storage: it plays MP3 or WAV files from an SD-card `music` directory and provides shell volume control. Both local-playback examples require a filesystem; this one additionally uses SPI1 and the SPI MSD driver. On the documented `sf32lb52-lchspi-ulp` board, connect a battery or long button presses will not be detected. Choose this example when SD-card media is part of the product.

Both examples prove playback, not a general media-player architecture. Plan file indexing, corrupt-media handling, interruption, power-state recovery, and UI behavior separately before turning either into a user-facing player.

## FLAC and Opus Codec Pipelines { #flac-and-opus-codec-pipelines }

The **FLAC Example** covers the full lossless flow: record PCM from the microphone, encode it as FLAC, decode it, and play it. The official page lists the `sf32lb52-lcd`, `sf32lb56-lcd`, and `sf32lb58-lcd` series and requires the FAT filesystem, audio components, and `libFLAC`. It is appropriate when testing a file-backed capture pipeline or comparing storage cost with uncompressed PCM.

The **Opus Example** covers a compressed audio path designed for speech. The current upstream page lists only `eh-lb525`; it captures at 16 kHz, processes 10 ms frames at approximately 16 kbps, then decodes and plays the resulting stream. Its documentation also calls out a stack-size requirement that changes according to the selected encoder mode. Preserve that constraint when using the example as a baseline; do not assume its default task stack is adequate after adding application work.

The official SiFli-SDK README gives example-specific stack settings: use `OPUS_STACK_SIZE` of 20k when `opus_test()` calls `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))`; without that forced mode, it recommends 200k. These are not universal Opus requirements. Before adapting them, verify the SDK revision and encoder path being built, then measure stack high-water usage under the product workload to size the task stack.

Neither sample establishes an end-to-end Bluetooth call or streaming product. Use them to verify local encoding and decoding first, then integrate transport, buffering, and session policy with measured latency and memory margins.

## Three-Channel Mixing { #three-channel-mixing }

The **Three-Channel Audio Mixer Player** is currently listed as tested on `sf32lb52-lcd_n16r8` and `sf32lb56-lcd_n16r12n1`. It reads three local audio files, decodes each stream, resamples non-48 kHz input where needed, combines the mono PCM streams, and plays the result. The documented sample set contains two MP3 files and one WAV file; use the example's filesystem image and filenames rather than assuming arbitrary files are included.

The reviewed mixer sums the three mono samples and divides by three, rather than summing at full gain. Its documented run lasts about 50 seconds. Keep that gain policy and finite demonstration duration distinct from the product's mixing requirements.

This is the right baseline for simultaneous prompts, effects, and music, where the product must decide which sounds can overlap. It is not a ready-made audio policy: define stream priority, volume control, clipping behavior, memory budget, and what happens when an input file or decoder misses its deadline. Use [Audio Server and Buffering](audio-server-buffering.md) to make those runtime boundaries explicit.

## Adapt an Example Without Losing Its Evidence { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>Table: Product-Adaptation Checks for Audio Examples</em></div>

<div align="center" markdown>

| Boundary | Keep from the example | Re-validate for the product |
|:---------|:----------------------|:----------------------------|
| Hardware | Known-good board routing and supported peripheral path | Microphone or speaker part, gain, rails, pin mux, layout, and production test access |
| Configuration | Minimum enabled SDK components | Memory, filesystem, codecs, Audio Manager, and feature flags actually required by the product |
| Audio data | Sample format and known-good files | Sample rate, channel count, buffer sizes, latency target, and error handling |
| Runtime behavior | Basic capture or playback sequence | Concurrent UI, Bluetooth, storage, low-power transitions, recovery, and teardown |
| Evidence | Upstream expected behavior | Serial log, capture/playback artifacts, measured current, and repeatable regression test |

</div>

## Related Resources { #related-resources }

- [Audio Overview](overview.md) for interfaces, session shapes, power considerations, and validation.
- [Audio Server and Buffering](audio-server-buffering.md) for stream ownership, DMA buffers, and product-load testing.
- [Examples](../../develop/examples/index.md) for the cross-domain SDK example catalogue.
- [SiFli-SDK Audio Example Index](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html) for the current official list and individual setup instructions.
