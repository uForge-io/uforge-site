---
icon: lucide/memory-stick
description: "PSRAM in embedded systems: how pseudo-static RAM extends SRAM, how it differs from DRAM, RRAM, and MRAM, and how to place data across an SF32 memory hierarchy."
tags:
    - Architecture
    - Memory
    - Learn
---

# PSRAM vs. Other Embedded Memory Types { #psram-vs-other-embedded-memory-types }

PSRAM—**pseudo-static RAM**—is the practical capacity tier between scarce on-chip SRAM and non-volatile storage in many embedded products. Use it for a framebuffer, large graphics assets, audio buffers, model data, or an application working set that will not fit in internal SRAM. For some low-power products such as wearables, PSRAM may be a better system-level power fit than a discrete DRAM subsystem, but the result depends on the memory devices, controller, operating states, and workload. It is still volatile working memory: it does not replace Flash, and it is not automatically the right place for latency-critical data.

Use this page to decide what belongs in SRAM, PSRAM, or persistent storage; then use the [SF32 Family](../../sf32-products/family/SF32_family.md) and the exact chip, module, or board documentation to confirm the memory actually present in a selected SKU.

!!! tip "The one-sentence model"
    PSRAM uses dynamic, DRAM-like storage internally, but manages refresh inside the memory device so the host can use it more like static RAM.

The practical rules are simple: use PSRAM for capacity, reserve SRAM for deterministic low-latency work, and treat the external-memory interface as a shared performance and power budget.

## Static vs. Dynamic: Where “Pseudo” Comes From { #static-vs-dynamic-where-pseudo-comes-from }

In this context, **static** and **dynamic** describe how a RAM cell keeps a bit while power remains applied. They do **not** say whether the data survives power loss: both SRAM and DRAM are volatile.

- An **SRAM** bit is held in a static latch. Once written, it remains valid without periodic refresh for as long as the device is powered and operating within specification. The trade-off is a larger memory cell, which limits capacity and raises silicon area and cost per bit.
- A **DRAM** bit is held as charge on a capacitor. That charge leaks over time, so the bit must be read and restored periodically—a **refresh** operation—before the charge falls too far. The smaller cell gives DRAM a density advantage, but normally requires a DRAM-aware controller to schedule refresh and obey timing rules.

PSRAM commonly uses a **dynamic, DRAM-like cell array** internally. The PSRAM device performs the refresh and hides much of the DRAM-specific control behavior inside the package. Its host model is therefore more SRAM-like: the host reads and writes an addressable memory space without managing a visible periodic refresh schedule. This does not mean every PSRAM shares SRAM's electrical interface or timing. It is **pseudo-static** because dynamic RAM is *mimicking the external behavior of static RAM*, not because the storage cell itself has become static.

The simplification is at the interface, not a removal of physical trade-offs. PSRAM still has device-specific command latency, burst behavior, clock limits, sleep modes, access restrictions, and power consumption. Read the selected PSRAM datasheet rather than treating all PSRAM parts as interchangeable.

!!! note "What PSRAM is not"
    PSRAM is not non-volatile storage, a drop-in guarantee of internal-SRAM latency, or a guarantee of enough system bandwidth. It solves a capacity problem; the selected device and workload determine the latency, power, and bandwidth cost.

## Memory-Type Comparison { #memory-type-comparison }

<div align="center"><em>Table: Embedded Memory-Type Comparison</em></div>

<div align="center" markdown>

| Memory type | Retains data without power? | Core characteristic | Typical strength | Main design trade-off | Typical embedded role |
|:------------|:----------------------------|:--------------------|:-----------------|:----------------------|:----------------------|
| **SRAM** | No | Static latch; no refresh | Internal SRAM usually offers low, predictable latency; actual timing depends on the SoC memory path and contention | Area-inefficient, so on-chip capacity is limited; leakage matters in always-on designs | Stacks, hot code/data, DMA descriptors, interrupt-sensitive buffers, tightly coupled memories |
| **DRAM** | No | Capacitor-based storage with externally managed refresh and a DRAM controller | High density and low cost per bit at large capacities | Refresh, controller complexity, row/bank timing, and power-management work | Main memory in application-processor systems and high-capacity embedded systems |
| **PSRAM** | No | DRAM-like storage with refresh/control hidden in the memory device and an SRAM-like host model | Expands working-memory capacity beyond internal SRAM; may simplify integration and reduce system power versus a discrete DRAM subsystem in some low-to-moderate-bandwidth designs | Higher and less predictable latency than internal SRAM; finite interface bandwidth shared with other users | Framebuffers, large UI/audio/AI buffers, decompressed assets, and application working sets |
| **RRAM / ReRAM** | Yes | Resistance of a cell is changed to represent data | Potentially compact non-volatile embedded memory and low standby power | Write behavior, endurance, retention, variability, and availability depend strongly on the process and product | Non-volatile configuration, code/data storage, or specialized embedded-memory uses where a supported technology is available |
| **MRAM** | Yes | Magnetic state represents data | Fast non-volatile access, high endurance, and no refresh | Cost, density, write energy, and available capacity vary by MRAM generation and product | Persistent state, code/data storage, or fast non-volatile working data in supported devices |

</div>

The table is qualitative. “Faster,” “denser,” and “lower power” are useful directions, not a part-selection result. Process node, interface, temperature, access pattern, standby mode, package, and controller configuration can reverse a seemingly obvious comparison.

### Why PSRAM Fits Low-Power Products { #why-psram-fits-low-power-products }

PSRAM often targets a different operating point from conventional discrete DRAM: moderate capacity and bandwidth with a simpler interface, less controller overhead, and low-power device states. In some wearable, portable, and battery-powered designs that do not need DRAM-class bandwidth, this can reduce system-level power. It is not a general guarantee: compare the selected memories, controller, active and sleep states, and representative workload on the target system.

This is not a universal per-byte or per-access promise. An aggressively clocked PSRAM interface, a continuously scanned framebuffer, or heavy display/audio/AI traffic can still dominate the memory-power budget. Compare the selected devices' active, standby, retention, and wake-up current at the actual clock, voltage, temperature, and access pattern—and use modes such as Half-Sleep when supported and beneficial.

## Where Each Memory Fits in a System { #where-each-memory-fits-in-a-system }

Think in terms of data lifetime and access urgency:

1. Put **interrupt-sensitive, frequently accessed, and latency-critical** code or data in internal SRAM or another documented low-latency memory.
2. Put **large, active working sets** in PSRAM when the capacity benefit exceeds the latency and bandwidth cost.
3. Put **data that must survive power loss** in a non-volatile technology: commonly NOR Flash, NAND Flash, eMMC, or—in systems that offer it—RRAM or MRAM.
4. Keep **cold assets** in non-volatile storage and move or decode only the portion needed for the current operation.

A common embedded layout is therefore:

<div align="center"><em>Diagram: Typical Embedded Memory Placement</em></div>

```text
Persistent firmware image, assets, settings -> Non-volatile storage
Active large buffers and framebuffers -> PSRAM
Hot stacks, control state, DMA data  -> Internal SRAM
```

This is a placement policy, not a rule that every buffer must obey. A small, frequently reused image may belong in SRAM; a large model may remain in Flash or PSRAM; a display system may need PSRAM simply because a full framebuffer will not fit internally.

## PSRAM Performance Is an Interface Budget { #psram-performance-is-an-interface-budget }

PSRAM capacity does not make its bandwidth unlimited. The host reaches it through an interface such as OPI or HPI on supported SF32 configurations, and that path can be shared by CPU accesses, caches, DMA, graphics, display scanout, audio, wireless, and storage activity. A product can have enough PSRAM bytes yet still stutter or underrun when several clients demand the interface at the same time.

### Interface Width and Transfer Rate { #interface-width-and-transfer-rate }

The raw payload rate is determined by data-line width, transfers per clock, and the selected interface clock:

`payload rate (MB/s) = data lines × transfers per clock × interface clock (MHz) ÷ 8`

The DTR/DDR rows below assume two transfers per clock, and the dual-channel rows assume both channels can operate concurrently at the listed clock. These are calculation assumptions, not confirmation that every chip, package, memory device, or SDK configuration supports the shown mode or frequency.

<div align="center"><em>Table: Theoretical Serial-Memory Payload Rate</em></div>

<div align="center" markdown>

| Interface and transfer mode | Payload data lines | Transfers per clock | Payload rate per MHz | Representative clock for comparison | Theoretical payload rate |
|:----------------------------|:------------------:|:-------------------:|:-------------------:|:-----------------------------------:|:------------------------:|
| QSPI / STR | 4 | 1 | 0.5 MB/s | 72 MHz | 36 MB/s |
| QSPI / DTR | 4 | 2 | 1 MB/s | 72 MHz | 72 MB/s |
| OPI / DDR | 8 | 2 | 2 MB/s | 144 MHz | 288 MB/s |
| Dual-channel OPI / DDR | 2 × 8 = 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| HPI / DDR | 16 | 2 | 4 MB/s | 144 MHz | 576 MB/s |
| Dual-channel HPI / DDR | 2 × 16 = 32 | 2 | 8 MB/s | 144 MHz | 1,152 MB/s |

</div>

The data-line column counts payload signals, not clock, chip-select, or other control pins. These clock points are documented examples, not family-wide limits. The [SF32LB52-DevKit-LCD guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb52x/SF32LB52-DevKit-LCD.md) lists 144 MHz OPI-PSRAM and 72 MHz QSPI-NOR in STR mode; the [SF32LB58-DevKit-LCD guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/board/sf32lb58x/SF32LB58-DevKit-LCD.md) lists 144 MHz HPI-PSRAM and board variants with external Flash at 72 MHz. The QSPI/DTR row uses 72 MHz only to isolate the effect of double-data-rate transfer. The dual-channel rows assume both channels can be used concurrently; they show aggregate bus width, not a guarantee that one CPU stream receives twice the effective rate. These are **bus payload ceilings**, not measured application throughput. Command/address cycles, dummy cycles, refresh, read/write turnarounds, controller limits, cache misses, DMA arbitration, PCB signal integrity, and concurrent clients reduce the usable rate. The selected chip, package, memory device, and SDK configuration decide what is valid.

The SiFli [chip model guide](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md) lists representative dual-channel configurations: **SF32LB566VCB36** has 8 MB OPI-PSRAM on MPI1 and 4 MB on MPI2; **SF32LB586VDD36** has 16 MB HPI-PSRAM on each interface; and **SF32LB587VEE56** has 32 MB HPI-PSRAM on each interface. These part-number examples describe memory topology, not a guarantee that both channels deliver the table's aggregate payload rate to one client. Confirm the exact orderable part and SDK memory map before sizing a bandwidth-critical design; another package or SKU in the same family can use a different arrangement.

### Why Two Memory Channels Matter { #why-two-memory-channels-matter }

The most valuable benefit of a dual-channel arrangement is not merely a larger aggregate number. When the selected SF32 memory map and display/controller configuration allow independent placement, one channel can be allocated to a bandwidth-critical client while the other serves the rest of the system.

An RGB/DPI display is a common example. Its display controller must read the framebuffer continuously at the pixel-clock rate; a delayed read can cause an underrun, visual artifacts, or unstable refresh. Placing that framebuffer in memory served by one PSRAM channel, while placing UI assets, audio buffers, and other working data accessed by the CPU, ePicasso, or DMA in memory served by the other, can reduce avoidable contention on the display read path.

Use this as a bandwidth-allocation strategy, not an automatic promise. Verify that the selected device exposes the required channel mapping, that the framebuffer base address lands on the intended channel, and that the display controller and other bus masters can use the channels independently. Measure scanout stability, frame time, and concurrent audio/Bluetooth/CPU load; interleaving, shared fabric, or an unsuitable buffer layout can reduce the expected benefit.

### Caches and External-Memory Execution { #caches-and-external-memory-execution }

When code or data resides in external DRAM/PSRAM, **I-cache** and **D-cache** can substantially reduce repeated slow accesses on SF32 devices that implement, enable, and map those regions as cacheable:

- **I-cache** keeps recently fetched instruction lines close to the CPU. Code with locality—such as loops, reused functions, RTOS paths, or UI code—can avoid repeated PSRAM or NOR fetches after a cache fill.
- **D-cache** keeps recently read data lines close to the CPU. It helps repeated CPU reads of tables, assets, and working data, but it does not remove the bandwidth used by a one-pass stream.
- **Non-coherent DMA requires explicit buffer ownership and cache maintenance.** For a cacheable buffer that hardware does not keep coherent, clean CPU-written data before a DMA engine or peripheral reads it. Before a DMA write, follow the platform's receive-buffer preparation procedure so dirty cache lines cannot later overwrite incoming data. After transfer completion, invalidate stale lines before the CPU reads the result. The CPU must not access a buffer while DMA owns it.

Allocate DMA buffers on whole cache-line boundaries without sharing lines with unrelated data. Invalidating a shared dirty line can discard another variable's changes; cleaning it after a DMA write can overwrite new data. Use the selected SDK or RTOS APIs, their cache-line size, completion checks, and required memory barriers. Do not copy another processor's cache API or alignment value blindly. Non-cacheable or hardware-coherent buffers follow their platform's own synchronization rules instead.

Cache is therefore a locality optimization, not a substitute for a bandwidth budget. A streaming framebuffer scanout or one-time buffer transfer can still consume the PSRAM interface at nearly its required data rate.

### Boot-Time Copy to PSRAM (Non-XIP) { #boot-copy-and-execute-in-place-from-psram }

SiFli's startup-flow guides document configurations for both SF32LB52x and SF32LB58x in which an application stored on external NAND Flash is copied into PSRAM for execution; both guides also describe an external SD Flash boot option over SDIO. SiFli calls this **non-XIP**: XIP executes code directly from a NOR Flash address, so the storage and execution addresses match; non-XIP copies code from Flash into RAM, so those addresses differ. See the [SF32LB52x startup-flow guide](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_development/startup_flow.html) and the [SF32LB58x startup-flow guide (Chinese)](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/app_development/startup_flow.html). These are documented configurations, not a guarantee for every SKU or board. Confirm the target's supported boot medium, memory map, linker/partition configuration, and SDK. Moving selected code to PSRAM can reserve scarce on-chip SRAM for other uses, but does not guarantee faster execution; measure representative workloads with the actual cache settings and memory contention.

In representative SiFli configurations, 72 MHz QSPI/STR NOR has a 36 MB/s raw-payload ceiling, while 144 MHz OPI/DDR and HPI/DDR PSRAM reach 288 MB/s and 576 MB/s respectively; the dual-channel variants reach 576 MB/s and 1,152 MB/s in aggregate. These figures are interface payload ceilings, not application-performance results. A higher PSRAM interface ceiling may provide more instruction-fetch bandwidth than QSPI NOR in a supported configuration, but it does not by itself establish that executing from PSRAM will be faster. The result depends on memory-device latency, code locality, cache configuration, PSRAM contention, and whether the application is CPU-, cache-, or bandwidth-bound. Measure boot time, cache-miss behavior, and representative workloads instead of inferring application speedup from a raw bus-rate ratio.

For a PSRAM-heavy design, validate these questions on target hardware:

- What reads and writes PSRAM concurrently during the peak user scenario?
- Is the buffer read sequentially, in bursts, randomly, or repeatedly by the CPU?
- Does cache behavior reduce repeated accesses, and are cache-maintenance steps correct around DMA?
- Can a framebuffer use partial updates, smaller draw buffers, or compression instead of a larger full-framebuffer allocation?
- What happens when display refresh, Bluetooth audio, and application work occur together?
- Does the selected PSRAM's standby or sleep behavior meet the retention and battery-life requirement?

Measure frame time, buffer underruns, CPU stalls, current, and recovery behavior. Do not infer system performance from PSRAM capacity or interface width alone.

## Half-Sleep on Applicable AP Memory PSRAM { #half-sleep-on-applicable-ap-memory-psram }

Some AP Memory PSRAM parts provide **Half-Sleep** mode: an ultra-low-power state that retains the stored data. It is useful when a large buffer must remain valid while the system pauses PSRAM activity, but the product cannot afford to repopulate the buffer from Flash or recompute it after every idle interval.

Half-Sleep is a **device-specific power mode**, not a generic PSRAM feature. The [AP Memory APS6408L-OBMx DDR OPI Xccela PSRAM datasheet](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf) documents one implementation. Its entry and exit timing, mode-register encoding, allowed clock behavior, current, temperature limits, and retention guarantees are **not portable** across PSRAM families or revisions. Use the exact datasheet and SDK support for the fitted part.

### Relative Power Saving { #relative-power-saving }

The comparisons below use AP Memory's Rev. 3.7 datasheet, available from [the manufacturer](https://www.apmemory.com/wp-content/uploads/APS6408L-OBM-BA.pdf). Confirm the revision and fitted part before using its limits.

For the same APS6408L-OBMx reference part with **full-array retention**, AP Memory publishes the following typical-mean standby and Half-Sleep currents. At the same supply voltage, the relative current reduction is also the relative PSRAM power reduction.

<div align="center"><em>Table: APS6408L-OBMx Full-Array Half-Sleep Saving</em></div>

<div align="center" markdown>

| Temperature | Standard standby current | Half-Sleep current | Relative reduction |
|:------------|:------------------------:|:------------------:|:------------------:|
| 25 °C | 66 µA | 20 µA | about 70% |
| 85 °C | 190 µA | 120 µA | about 37% |

</div>

At 25 °C, Half-Sleep therefore uses roughly **30% of the reference part's standard standby current** while retaining the full array. The saving is smaller at 85 °C because retention current rises with temperature. These figures compare two idle/retention states—not Half-Sleep against active read/write current—and are typical values, not design guarantees. Partial-array refresh settings can change current further, but may not retain every memory region; use them only when the data-retention policy permits it.

### Design Rules for Half-Sleep { #design-rules-for-half-sleep }

Do not confuse the 150 ms current qualification with Table 30's 150 µs minimum Half-Sleep duration and 150 µs exit timing for this revision. Low average current can still include refresh-current peaks, so verify regulator and decoupling response. Unlike Half-Sleep, Deep Power Down loses memory contents and resets mode registers on exit.

The reference datasheet's current-table notes specify a 64 Mb device with no clock toggling; the 25 °C slow-refresh figures require enabling Slow Refresh Frequency. VDD and VDDQ are specified at 1.62–1.98 V. The specified Half-Sleep current is guaranteed only after 150 ms in that mode, which does not turn the table's typical values into guaranteed limits. For shorter idle periods, measure the complete entry, retention, and exit waveform rather than applying the settled current to the entire interval.

- Enter Half-Sleep only after all CPU, DMA, display, audio, wireless, and storage clients have stopped accessing the PSRAM region. A transaction during entry or sleep can corrupt the transfer or wake the device unexpectedly.
- Treat exit as a scheduled wake-up cost. The firmware must allow the specified exit timing before code, DMA, or a peripheral controller touches PSRAM again.
- Keep the PSRAM supply and the signals required by the selected device within its retention specification. Half-Sleep retains data only while its documented power conditions are met; it is not a replacement for non-volatile storage.
- Measure the complete system state, not only the PSRAM current. Savings can be lost if the CPU, display, interface clock, or another subsystem remains active.

For short idle intervals, entry/exit overhead may outweigh the saving. For longer pauses, retaining a framebuffer, decoded asset, or model buffer in Half-Sleep can avoid expensive reload or reconstruction work. Define the break-even time from measured active, Half-Sleep, and wake-up energy on the target board.

## PSRAM in SF32 Designs { #psram-in-sf32-designs }

SF32 memory configurations are SKU-, package-, and module-dependent. SiFli module documentation lists OPI-PSRAM and HPI-PSRAM options across the SF32LB5x module range; it also shows that capacity and topology vary by module code. Some configurations co-package PSRAM, while other products expose an external-memory interface. Neither the presence of an SF32 family name nor the presence of an external-memory interface proves that every variant includes PSRAM.

Use the exact product page and design guide to confirm capacity, interface, package constraints, routing requirements, and concurrent-peripheral limitations. For application design, the practical uses are consistent:

- **Graphics:** use PSRAM for large framebuffers, draw buffers, images, or fonts when SRAM is insufficient. The [Graphics Overview](../graphics/overview.md) explains the render-to-display flow and PSRAM bandwidth consequences.
- **Audio and Bluetooth:** use it for larger queues or assets only after testing concurrent traffic; latency-sensitive control structures should stay in appropriate low-latency memory.
- **AI:** use it for large model weights or tensors when needed, while keeping hot or latency-critical buffers in the best documented memory region.
- **Compression:** [eZip](../graphics/ezip.md) can reduce stored asset size and traffic before decode. On supported SF32LB55x, SF32LB56x, and SF32LB58x devices, [TurboPixel](../graphics/turbopixel.md) reduces the PSRAM storage and bandwidth required by the final framebuffer at a fixed lossy compression ratio; it is not an asset-storage format.

## Practical Selection Rules { #practical-selection-rules }

Choose PSRAM when the problem is capacity and the workload can tolerate the selected memory path's latency and bandwidth limits. Prefer more internal SRAM—or redesign the buffering—when the problem is deterministic latency, frequent small random accesses, or a time-critical DMA/control path. Choose non-volatile memory when data must persist across power loss; choose RRAM or MRAM only when the exact SoC or memory product documents their availability and operating limits.

The most robust architecture uses several tiers deliberately: non-volatile storage for persistence, PSRAM for large live data, and SRAM for the work that must happen promptly and predictably.
