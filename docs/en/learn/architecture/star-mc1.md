---
icon: lucide/cpu
description: "An introduction to Arm China's STAR-MC1 Armv8-M Mainline CPU core, its software-model relationship to Cortex-M33, and its implications for SF32 firmware."
tags:
    - Architecture
---
# STAR-MC1 { #star-mc1 }

## Introduction { #introduction }

**STAR-MC1** is an Arm China CPU IP based on **Armv8-M Mainline**, the architecture profile also used by Cortex-M33. This provides a familiar Armv8-M software model, but does not guarantee that Cortex-M33 firmware can be reused unchanged. Optional architecture extensions, core configuration, SoC peripherals, startup and linker setup, and SDK support can differ. Treat Cortex-M33-targeted software as a porting starting point and validate it on the target device and SDK.

On SF32 devices that use STAR-MC1, SiFli documentation may identify the application CPU as **Arm Cortex-M33**, **Cortex-M33 STAR-MC1**, or simply **STAR-MC1**, depending on context and level of detail. These labels do not, by themselves, confirm optional core features or the exact SoC configuration; check the exact device documentation before selecting a part.

Read this page when you know the Arm Cortex-M family and need to position STAR-MC1 correctly for software, performance, or part selection. It explains what remains familiar, what can differ by SoC implementation, and why STAR-MC1 should not be treated as a fixed Cortex-M7 replacement.

Here, compatibility refers to the shared Armv8-M architectural software model, not to a drop-in firmware image. Check the selected core features, compiler options, startup code, linker layout, interrupt assignments, peripheral drivers and security configuration against the target SoC and SDK before reusing firmware.

## Positioning for Developers { #positioning-for-developers }

The most useful mental model is **not** “a fixed processor between Cortex-M33 and Cortex-M7.” STAR-MC1 is a configurable, Cortex-M33-compatible **Armv8-M Mainline** CPU IP. Its value is the ability to pair that familiar MCU software model with optional memory-system and acceleration features—such as cache, tightly coupled memory (TCM), DSP instructions, a coprocessor interface, and TrustZone—when the final SoC implements them.

<div align="center"><em>Table: Where STAR-MC1 Fits in the Cortex-M Landscape</em></div>

<div align="center" markdown>

| If you know | What remains familiar with STAR-MC1 | The practical difference | Do not assume |
|:------------|:------------------------------------|:-------------------------|:--------------|
| Cortex-M4 | Bare-metal and RTOS development, interrupts, DMA, and peripheral-driver work. | STAR-MC1 uses the newer Armv8-M software model and can expose stronger memory and acceleration options. | Cortex-M4 binaries, Armv7E-M assumptions, or identical debug/security features apply unchanged. |
| Cortex-M33 | The Armv8-M programming, exception, and toolchain model. | The SoC can add memory-system headroom for Flash/PSRAM-heavy, UI, audio, or connected workloads. | Every STAR-MC1-based part has cache, TCM, DSP, FPU, CDE, or TrustZone enabled. |
| Cortex-M7 | The need to manage memory placement, cache behavior, DMA coherency, and real-time latency. | STAR-MC1 keeps an MCU-class Armv8-M foundation and targets flexible, power-conscious IoT designs. | It is a drop-in Cortex-M7 replacement or has the same throughput, memory system, and software ecosystem. |

</div>

For an SF32 project, select the device for its documented memory, peripherals, and SDK support—not for the STAR-MC1 label alone. The public STAR-MC1 material describes Armv8-M and identifies cache, TCM, DSP, coprocessor interfaces, and TrustZone as possible features. Whether a feature is implemented and enabled in a particular product must be confirmed in the SoC documentation.

## Why STAR-MC1 Matters { #why-star-mc1-matters }

Traditional Cortex-M33 MCUs are excellent for secure, low-power embedded control, but modern connected products often need more than control logic. Wearables, smart displays, Bluetooth audio products, and edge-AI devices may also need responsive user interfaces, larger external memory, signal processing, and frequent movement of graphics or audio data.

STAR-MC1 can address these workloads through optional caches, TCM and custom instructions when the SoC implements them and the software uses them effectively. These features can reduce memory stalls or accelerate selected operations while retaining the MCU development model. Confirm the performance and energy benefit on the finished device with representative workloads; neither follows automatically from the core name.

## Cortex-M Family Comparison { #cortex-m-family-comparison }

The following table summarizes where STAR-MC1 fits among common Cortex-M processors. Exact capabilities depend on the final SoC implementation, but the positioning is useful when choosing an architecture for a product.

For compactness, the table uses `CM3`, `CM4`, `CM33`, `CM55`, and `CM7` for the corresponding Cortex-M processors.

<div align="center"><em>Table: Cortex-M Family Comparison</em></div>

<div align="center" markdown>

| Feature | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:--------|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Arm architecture | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| Pipeline | 3-stage, in-order | 3-stage, in-order | 3-stage, in-order | In-order; stage count not specified in the public TRM | 4-stage, in-order; 5-stage with Helium | 6-stage, superscalar |
| Primary system-bus interface | 3 × AMBA AHB-Lite (Harvard) | 3 × AMBA AHB-Lite (Harvard) | 2 × AMBA 5 AHB5 interfaces: C-AHB + S-AHB | 2 × AMBA 5 AHB5 interfaces: C-AHB + S-AHB | 64-bit AMBA 5 AXI5; 32-bit AHB peripheral; 64-bit AHB slave interface for TCM | 64-bit AMBA 4 AXI; 32-bit AHB peripheral; 32-bit AHB slave interface for TCM |
| TrustZone support | No | No | Optional; SoC dependent | Optional; SoC dependent | Optional; SoC dependent | No |
| DSP instructions | No dedicated DSP extension | Native DSP extension | Optional DSP extension | Optional DSP extension | Native DSP extension; optional Helium (MVE) | Native DSP extension |
| Arm Helium (MVE) | Not supported | Not supported | Not supported | Not supported | Optional; integer or floating-point MVE, configuration dependent | Not supported |
| Floating-point unit | No native IP capability | Optional single-precision | Optional single-precision | Optional single-precision | Optional scalar FP16/FP32/FP64; optional vector FP16/FP32 | Optional single/double precision |
| I-cache / D-cache | Not included in processor IP; SoC-level cache may be added | Not included in processor IP; SoC-level cache may be added | Not included in processor IP; SoC-level cache may be added | Optional in processor IP; presence and configuration depend on implementation | Optional in processor IP; presence and configuration depend on implementation | Optional in processor IP; presence and configuration depend on implementation |
| Arm Custom Instructions / CDE | No native IP capability | No native IP capability | Arm-defined CDE encoding; custom operations and datapaths are SoC-defined; optional integer CDE, with floating-point CDE dependent on FPU/configuration | STAR-MC1 TRM describes GPR CDE and FPCDE modules; implemented operations and product availability depend on SoC configuration | Arm-defined CDE encoding; custom operations and datapaths are SoC-defined; optional from r1, unavailable in r0 | No native IP capability |
| Software compatibility | Baseline | CM3-compatible | Armv8-M software model; requires Armv8-M tools | CM33-compatible | CM33-compatible; Helium requires Armv8.1-M toolchain support | CM4-compatible (same Armv7E-M family) |
| CoreMark/MHz reference* | 3.34 | 3.42 | 4.02 | 4.02† | 4.20 | 5.01 |
| Relative power demand (qualitative)‡ | Very low | Low | Low | Low | Medium | High |
| Compute profile (qualitative) | Low-power scalar control | Real-time scalar DSP | Secure, configurable scalar MCU | CM33-compatible scalar CPU; SoC-implemented cache, TCM, and custom instructions can improve system-level performance | Vector DSP/ML when Helium is enabled | High scalar throughput and memory bandwidth |
| Suggested typical applications | Low-complexity control and simple sensor nodes | Motor control, audio DSP, and sensor processing | Secure connected endpoints and IoT control | UI-rich wearables, Bluetooth audio, and Flash/PSRAM-based IoT products | ML sensor fusion, voice/audio, vision, and DSP | Responsive HMI, high-throughput control, and networking |

</div>

\* These reference figures come from Arm's [Cortex-M comparison table, Version 2020](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431). They are not universal current scores or a direct ranking of finished SoCs: compiler, memory system, cache settings and benchmark configuration affect the result.

† STAR-MC1 uses the CM33 reference figure here because it is CM33-compatible. This is a comparison baseline, not an Arm-published or measured STAR-MC1 result.

‡ This is an architectural positioning guide, not measured silicon data. Actual power depends on process technology, voltage, frequency, memory architecture, enabled features, peripherals, firmware duty cycle, and the final SoC implementation.

The pipeline and bus rows summarize each IP's main execution pipeline and system-memory interface. CM33 and STAR-MC1 share the C-AHB/S-AHB bus arrangement; cache and other optional memory features are separate from that bus interface, and their availability depends on SoC configuration and implementation. These are not a statement of the interfaces enabled on every finished SoC. Debug, trace, coprocessor, and other optional ports are not listed.

Processor-IP references: Arm [CM3 datasheet](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14), [CM4 documentation](https://support.arm.com/compute-ip/cortex-m4), [CM33 Technical Reference Manual](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954), [CM55 datasheet](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5), [CM7 datasheet](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf), and the [STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).

## Architectural Enhancements { #architectural-enhancements }

STAR-MC1 builds on Cortex-M33 rather than replacing it. The most important additions are implementation-level improvements that help the core spend less time waiting on memory and more time executing useful work.

### Instruction and Data Caches { #instruction-and-data-caches }

Availability and configuration of the instruction cache (**I-cache**) and data cache (**D-cache**) depend on the SoC implementation. When implemented and enabled, these caches are especially valuable in systems that execute from external Flash, access PSRAM, or run larger user-interface and middleware stacks.

The main benefits are:

- Faster instruction fetch from non-SRAM memory.
- Lower average data access latency.
- Better performance for graphics, audio, protocol stacks, and UI frameworks.
- Reduced pressure on the memory bus when the same code or data is reused.

For cacheable buffers that hardware does not keep coherent, drivers sharing memory with DMA, display controllers, audio interfaces, or other bus masters must follow the SDK or RTOS cache-maintenance rules. Clean CPU-written data before a peripheral reads it; prepare receive buffers before DMA writes, then invalidate stale cache lines after transfer completion and before CPU reads. The CPU must not access a buffer while DMA owns it. Allocate whole cache lines without sharing them with unrelated data, and follow platform completion checks and memory barriers. Non-cacheable or hardware-coherent buffers still require their platform's synchronization rules. See [PSRAM and memory types](psram-and-memory-types.md#caches-and-external-memory-execution) for buffer ownership and dirty-line hazards.

### Armv8-M Custom Datapath Extension { #armv8-m-custom-datapath-extension }

At the IP level, Arm defines the CDE instruction encodings, while the SoC designer defines the custom operations and datapaths. CM33 supports optional integer CDE; floating-point CDE depends on the FPU and configuration. The STAR-MC1 TRM describes GPR CDE and FPCDE modules, but this IP-level description does not establish that CDE is available in a particular SF32 device or SDK. The SiFli SDK [v2.5.1 release notes](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1) record a fix for CDE being enabled by mistake on SF32LB57x; verify support for the exact target and SDK before relying on it. CM55 offers optional CDE from r1 onward, not r0. CP0–CP7 are encoding spaces assigned to coprocessors or CDE; they do not mean eight custom instructions or eight additional accelerators. Confirm the core revision, implemented modules, and compiler/SDK support. See the [CM33 datasheet](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf), [CM55 CDE revision notes](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips), and STAR-MC1 TRM Chapters B7/B8.

This can be useful for workloads such as:

- Digital signal processing.
- Cryptography.
- Computer vision primitives.
- Machine-learning kernels.
- Sensor-fusion math.

CDE does not automatically accelerate every application. Software must use compiler support, libraries, or vendor-provided SDK components that emit the relevant custom instructions. When supported by the SoC and software stack, however, it provides a clean path for application-specific acceleration without moving the workload to a separate application processor.

### Memory-System Optimization { #memory-system-optimization }

Many modern MCU workloads are limited not only by CPU frequency, but also by memory latency and bandwidth. STAR-MC1's memory-system design and any cache features implemented and enabled by the SoC are therefore important for SF32-class devices, where applications may combine internal SRAM, in-package Flash, PSRAM, display buffers, and peripheral DMA.

The largest gains usually appear when:

- Code executes from Flash or external memory instead of tightly coupled SRAM.
- UI frameworks repeatedly access image, font, or layout data.
- Audio, Bluetooth, graphics, and application tasks run concurrently.
- The working set fits well in cache.

Purely CPU-bound loops that already run from fast SRAM may show a smaller improvement.

## Performance Characteristics { #performance-characteristics }

STAR-MC1 should not be described as automatically improving small synthetic CPU benchmark metrics such as **CoreMark/MHz** or **DMIPS/MHz**. Those benchmarks primarily measure compact integer workloads and are often small enough to run from fast local memory. In that situation, instruction and data caches may provide little or no visible improvement over a standard Cortex-M33-class implementation.

STAR-MC1 is a Cortex-M33-compatible core with a configurable memory subsystem and optional workload-specific acceleration. These features can help when an application is limited by memory access, external Flash or PSRAM latency, graphics resources, protocol stacks, or repeated access to larger code and data sets. The benefit depends on the implemented features and how the application uses them.

<div align="center"><em>Table: Performance Characteristics</em></div>

<div align="center" markdown>

| Workload Type | Expected STAR-MC1 Benefit | Why |
|:--------------|:--------------------------|:----|
| Small CoreMark/DMIPS-style loops | Usually limited | The working set is small and may already fit in fast memory. |
| Code executing from Flash or PSRAM | Often improved | When implemented and enabled, I-cache can reduce instruction-fetch stalls. |
| Data-heavy UI, graphics, and middleware | Often improved | When implemented and enabled, D-cache can reduce repeated data-access latency. |
| DMA-heavy peripheral workloads | Depends on software design | Cache maintenance is needed for cacheable, non-coherent buffers; ownership and synchronization remain necessary in every case. |
| CDE-enabled kernels | Potential improvement | Custom instructions can accelerate selected operations. |

</div>

## What This Means for SF32 Developers { #what-this-means-for-sf32-developers }

For SF32 firmware development, treat STAR-MC1 as a Cortex-M33-compatible application processor. Evaluate the implemented memory and acceleration features against the application's code, data and timing requirements.

In practice:

- Treat Cortex-M33 firmware as a source-level porting baseline, not a drop-in image; confirm the target configuration and SDK support before reusing it.
- RTOS, interrupt, privilege, TrustZone, and debug concepts remain familiar to Cortex-M developers.
- Performance-sensitive applications should place critical code and data carefully and use the SDK's cache and memory APIs.
- Cacheable DMA buffers need explicit cache maintenance when hardware does not guarantee coherence; all DMA buffers need safe ownership and synchronization.
- Graphics, audio, AI, and connectivity workloads benefit most when the software stack uses the SoC's hardware accelerators and memory hierarchy effectively.

The core is not intended to replace every Cortex-M7 use case. If an application requires maximum single-core throughput at higher power, Cortex-M7-class devices may still be appropriate. For battery-powered connected products, however, STAR-MC1 provides a useful balance of compatibility, performance, and energy efficiency.

## Good Application Fits { #good-application-fits }

STAR-MC1-based devices are candidates for products that need memory-system or application-specific acceleration while retaining MCU-level power and integration constraints. They are particularly worth evaluating when memory latency matters more than a compact CoreMark/DMIPS score. Select the actual SoC by its implemented features and measured workload performance, not an assumed advantage over every conventional Cortex-M33.

Typical examples include:

- Smartwatches and fitness trackers.
- Bluetooth audio devices.
- Wearable medical and health-monitoring products.
- Smart displays and compact HMI systems.
- Edge-AI sensor devices.
- Products using LVGL or other embedded UI frameworks.
- Devices that execute from large Flash or PSRAM memories.

## Key Takeaways { #key-takeaways }

- STAR-MC1 is Cortex-M33-compatible, so it preserves the familiar Armv8-M embedded software model.
- When the SoC enables instruction and data caches, they can improve real-world performance, especially when code and data live outside fast internal SRAM.
- CDE provides a path for custom instruction acceleration when supported by the SoC and software stack.
- STAR-MC1 combines a CM33-compatible software model with configurable memory and acceleration features; compare finished SoCs and measured workloads, not core labels alone.
- On SF32 devices that use STAR-MC1, the core and the SoC features implemented alongside it can support richer graphics, audio, AIoT, and wearable applications within an MCU-style development model.

---

See also: [SF32 Family Overview](../../sf32-products/family/SF32_family.md) for how STAR-MC1 fits into the broader SF32LB5x chip lineup.

Primary reference: [Arm China STAR-MC1 Technical Reference Manual](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf).
