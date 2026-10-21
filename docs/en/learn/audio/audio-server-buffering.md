---
icon: lucide/audio-lines
description: "Practical SF32 Audio Server and DMA-buffering guidance for glitch-free playback, recording, and coexistence with Bluetooth and graphics."
tags:
    - Audio
---

# Audio Server and Buffering { #audio-server-and-buffering }

Use this page after choosing the audio interface and product session in the [Audio Overview](overview.md). Its focus is the runtime boundary between application code, Audio Server sessions, DMA buffers, and the hardware audio path.

**Scope of SDK-specific behavior:** The API details below are documented for SF32LB52x in the current SiFli SDK. Confirm them against the `audio_server.h`, implementation, and configuration for the target family and SDK release. Buffer-sizing, scheduling, and cache-maintenance advice is engineering guidance; Audio Server does not guarantee identical behavior or buffer ownership on every target.

## Session Ownership { #session-ownership }

Keep application policy separate from streaming mechanics. The application decides when playback or recording starts, stops, and changes state; Audio Server coordinates the session; DMA moves sample blocks; the driver owns hardware configuration. Avoid making UI, Bluetooth callbacks, or filesystem reads directly manipulate codec registers during an active stream.

<div align="center"><em>Table: Buffer Ownership</em></div>

<div align="center" markdown>

| Boundary | Owner | Review question |
|:---------|:------|:----------------|
| Source data | Application, decoder, or storage task | Can it keep the playback queue supplied before it runs empty? |
| Audio Server write cache, when configured | Audio Server, sized by application configuration | Is `write_cache_size` valid for this SDK, and does the application handle every `audio_write()` result? |
| Active transfer buffer | DMA/audio driver | Is the buffer stable and cache-coherent for the full transfer? |
| Completed buffer | Application or processing task | Is playback data refilled, or captured data processed, before DMA reuses that region? |
| Session state | Audio Server plus application policy | Do repeated start, stop, error, and teardown requests avoid double closing or freeing resources? |

</div>

## Choose a Buffer Strategy { #choose-a-buffer-strategy }

Double buffering is a practical baseline where the driver supports it: DMA transfers one region while software prepares playback data or processes captured data in another. Distinguish the application's PCM queue from the driver's DMA buffer; writing to Audio Server is not itself proof of a zero-copy DMA transfer.

Add queue capacity only when storage latency, decoding time, Bluetooth transport jitter, or scheduling variability requires it. Capacity costs memory; the amount of audio actually queued determines its waiting time. Merely allocating more buffers does not automatically increase latency. Use the frame-based calculations in [Audio Overview](overview.md#buffer-and-latency-budget), accounting for channel count and stored bytes per sample.

Measure block duration, worst-case preparation or processing time, and acceptable end-to-end latency. Derive each deadline from the target driver's buffer-refill and transfer-completion notifications, together with its buffer-reuse sequence. If the driver provides half-transfer and full-transfer callbacks, schedule work around those transitions; do not treat the end of the current transfer as the only deadline. Playback data must be ready before DMA needs it; recorded data must be consumed or copied before DMA overwrites it. Leave scheduling margin and investigate even occasional underruns or overruns.

For memory that the application or driver exposes directly to DMA, follow the target's cache and ownership rules: clean CPU-written playback data before DMA reads it, prepare receive buffers as required, and invalidate completed capture data before CPU access when the target requires it. These steps depend on the SoC, memory region, and driver API; do not manually maintain Audio Server- or driver-owned buffers unless that API requires it. Never modify, free, or reuse a region while DMA owns it.

The [SF32LB52x Audio Server documentation](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/middleware/multimedia.html) states that callbacks run in the Audio Server thread and that an `audio_open()` callback must not call `audio_close()`, because doing so can deadlock. Keep callbacks bounded; send blocking storage or processing work to a worker. The capture callback receives a pointer and length for a frame, but the cited documentation does not define how long that pointer remains valid after the callback. Copy the data before returning unless the target SDK explicitly documents a longer lifetime.

The same SF32LB52x documentation describes these `audio_write()` results:

<div align="center"><em>Table: Documented audio_write() Results (SF32LB52x)</em></div>

<div align="center" markdown>

| Return value | Documented meaning |
|:-------------|:-------------------|
| `> 0` | The value equals `data_len`; the data was accepted into the write cache. |
| `0` | The write cache is full. A request larger than the configured cache is also rejected with `0`. |
| `-1` | The client is paused or suspended; the submitted audio is dropped. |
| `-2` | Invalid parameter. |

</div>

In that API, `write_cache_size` is limited to `0x7FFF` bytes, and the guide recommends at least twice the size of one `audio_write()` payload for its ping-pong write pattern. This is the Audio Server software cache, not a guarantee about the driver's physical DMA buffer layout. Check the exact target SDK before applying these limits. Client priority, mixing, and available audio routes are also configuration-dependent; opening a session does not guarantee every chip interface is exposed through Audio Server.

## Validate Under Product Load { #validate-under-product-load }

Test the audio session with the workloads that will coexist in the product: display refresh, Bluetooth notifications or audio, storage reads/writes, logging, and low-power transitions. Log playback underruns, recording overruns, queue occupancy, callback-to-worker delay, glitches, reconnects, and wake/sleep transitions. Exercise priority interruptions, suspension and resumption, startup failures, and repeated stop requests; verify the intended recovery policy rather than silently losing data.

At shutdown, ensure the driver has stopped transfers and outstanding callbacks can no longer access released buffers. Check that audio-related power requests and external components are released according to the hardware sequence. See [Low-Power Overview](../low-power/overview.md) for system power validation and [Bluetooth Overview](../bluetooth/overview.md) for wireless coexistence.
