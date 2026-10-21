---
icon: lucide/workflow
description: "PTM (Parallel Task Machine) on SF32LB57x: a programmable peripheral task engine that offloads timing-sensitive IO sequences and custom protocols from the Cortex-M33."
tags:
    - Architecture
    - PTM
    - SF32LB57
---

# PTM Parallel Task Machine { #ptm-parallel-task-machine }

## Introduction { #introduction }

**PTM**, short for **Parallel Task Machine**, is a programmable peripheral task engine documented for SF32LB57x. It is intended for work that is too timing-sensitive for ordinary firmware loops, too custom for fixed-function peripherals, and too small to justify keeping the main Cortex-M33 continuously involved.

In practical product terms, PTM lets firmware offload deterministic peripheral behavior: cycle-sensitive IO sequencing, custom protocol handling, sensor collection, PWM-like waveforms, fast trigger responses, and compact register or memory workflows tied to external events.

The useful mental model is simple: the CPU configures and supervises the task; PTM executes the repetitive, timing-critical part near the IO, FIFO/DMA, event, and AHB bus fabric. That makes PTM more than a GPIO waveform helper. It is a small programmable task machine for peripheral automation.

Read this page when a standard peripheral cannot express the required timing or protocol, but dedicating the main CPU to a polling loop would add latency, power, or firmware complexity. It is for engineers designing the hardware/firmware boundary, not for routine GPIO or timer use.

## Why PTM Exists { #why-ptm-exists }

Microcontrollers often face a mismatch between application processing and peripheral timing. The main CPU may have enough performance for the product, but certain low-level behaviors can still make firmware unnecessarily complex:

- bit-level or cycle-sensitive IO sequencing;
- custom serial-style protocols that do not map cleanly onto UART, SPI, I2C, or CAN;
- sensor polling or sampling flows that need quick trigger response;
- PWM-like control patterns beyond standard timer output modes;
- small data movement or register-control workflows tied to peripheral events;
- coordination between multiple peripherals without waking the main application path for every step.

Handling these jobs in interrupts can create latency risk and interrupt load. Handling them in busy-wait loops wastes CPU time and power. Adding external logic increases board complexity. PTM exists to cover the space between those options: compact, deterministic peripheral execution under firmware control.

## PTM in the SF32LB57x Architecture { #ptm-in-the-sf32lb57x-architecture }

PTM can be viewed as a small programmable engine attached to the SF32LB57x SoC's IO, event, FIFO/DMA, and AHB bus infrastructure. Treat it as a capability documented for SF32LB57x: confirm the selected device's documentation before carrying a PTM-based design assumption to another SF32 family.

<div align="center"><em>Figure: PTM Task Execution Flow</em></div>

```text
Application / firmware
        │
        ▼
CPU configures PTM task
        │
        ▼
PTM executes deterministic peripheral sequences
        │
        ├── IO read/write
        ├── FIFO / DMA data movement
        ├── AHB memory or register access
        ├── Event wait / fixed delay
        └── CPU interrupt or internal event notification
```

The key architectural point is that PTM can run a compact custom instruction stream and interact with more than pins. It can read and write IO, wait on events, use FIFO/DMA paths, access AHB memory and peripheral registers, and notify the CPU only when higher-level firmware attention is needed.

This lets the system retain standard peripherals for standard jobs while providing a deterministic implementation path for the custom timing cases that arise in real hardware designs.

## Core Capabilities { #core-capabilities }

The [SF32LB57x hardware design guide](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md) lists **one PTM block with 16 channels**, and its pin-multiplexing table names PTM1_CH0 through PTM1_CH15. Together with the SDK definitions, the documented capabilities include:

- independently controlled PTM execution resources;
- a compact custom instruction set;
- instruction execution from internal TCM or from the system bus;
- bus address reads and writes;
- data operations;
- conditional branches and loops;
- IO reads and writes;
- wait-for-trigger behavior;
- fixed-delay behavior;
- cycle-level timing control when executing from PTM TCM;
- 16 IO channels in the PTM block;
- FIFO support with a DMA interface;
- AHB bus access for memory and peripheral-register operations;
- CPU interrupt generation;
- internal events for coordinating task flows;
- SDK-defined reset, start, pause, and single-step controls for indexed PTM resources.

Taken together, these features make PTM a deterministic peripheral-automation block, not just a pin sequencer.

**Resource configuration:** The [SDK v2.5.1 register definitions](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/cmsis/sf32lb57x/ptm.h) provide indexed control/register groups 0–7, and the [instruction definitions](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h) use corresponding indexes for TCM resources. The available sources do not establish how the SDK indexes map to physical processing cores, so do not infer a core count from the index range. Check the target device documentation and SDK implementation to confirm resource availability.

## Execution Model { #execution-model }

PTM executes custom-format instructions. The instruction set is intentionally compact, but it covers the operations needed to build peripheral task sequences:

- **Control flow**: condition checks, jumps, loops, waits, and delays.
- **IO control**: reading and writing mapped IO channels.
- **Data handling**: simple arithmetic and bit operations.
- **Bus access**: reading or writing memory and peripheral registers through the AHB bus.
- **Synchronization**: waiting for triggers, generating interrupts, and coordinating through internal events.

When a task executes from PTM TCM, timing can be controlled at cycle-level precision. This is the property that matters for custom protocols and IO sequences: the CPU does not need to react to every edge, timing slot, or short peripheral phase.

The best PTM tasks are usually small, explicit, and deterministic. If the logic becomes high-level, branch-heavy, or application-policy driven, it likely belongs back on the CPU.

## IO, FIFO, and DMA { #io-fifo-and-dma }

The SF32LB57x PTM block provides 16 IO channels. These support custom interface timing, monitoring multiple pins, or generating coordinated multi-signal sequences.

PTM also supports a FIFO with a DMA interface. This matters because useful custom protocols are rarely only about toggling pins. They often need to move data between memory and IO-oriented logic without forcing the CPU to intervene for every byte or word.

In practice, PTM can help build workflows such as:

- shifting data through a custom interface;
- capturing or producing repeated IO patterns;
- coordinating data movement with peripheral events;
- buffering small protocol transactions;
- allowing DMA to feed or drain task data while the CPU stays out of the hot path.

## Events and Interrupts { #events-interrupts-and-multicore-coordination }

PTM is event-oriented. It can wait for an event or a fixed delay, and internal events can connect task flows. The available device documentation does not establish a physical PTM core count or the mapping between SDK resource indexes and hardware cores. Some event paths can notify the CPU through interrupts, allowing firmware to wake or respond only when the deterministic phase reaches a meaningful boundary.

This is the core system-level benefit: PTM can absorb the low-level timing work and present firmware with cleaner event boundaries. Instead of polling continuously or serving every timing slot as an interrupt, the CPU can configure the PTM task, let it run, and handle the result.

## Typical PTM Use Cases { #typical-ptm-use-cases }

For an SF32LB57x design, PTM is most useful when the peripheral behavior is too custom for fixed-function blocks and too timing-sensitive for ordinary firmware loops.

Typical use cases include:

- custom interface protocols;
- custom PWM or pulse-generation behavior;
- automatic sensor collection;
- fast trigger-response flows;
- multi-module scheduling;
- batched memory or register operations;
- small deterministic control loops around external devices;
- bridging protocol timing gaps between a sensor, display, actuator, or companion IC and the main application firmware.

### Usage Boundaries { #usage-boundaries }

PTM should not replace standard peripherals when those peripherals already match the job. UART, SPI, I2C, CAN, SDIO, I2S, PDM, timers, and DMA remain the first choice for standard functions. PTM is most valuable when the product needs behavior just outside those fixed blocks.

## PTM and CPU Power { #ptm-and-cpu-power }

PTM can reduce CPU wakeups for short, deterministic peripheral work. The CPU configures a PTM task, reduces its involvement while the task runs, and responds when PTM reaches a boundary that needs firmware-level attention.

This is especially relevant in wearable and AIoT products where the system may need to:

- watch a sensor or GPIO pattern;
- collect short bursts of data;
- service a custom external component;
- maintain timing while the application core is not fully active;
- reduce interrupt frequency during repetitive peripheral work.

The actual energy savings depend on clocking, wake policy, code and data placement, peripheral state, and firmware architecture. PTM can execute small peripheral tasks without waking the CPU for every step.

## PTM, RP2040 PIO, and Nordic PPI/DPPI { #ptm-rp2040-pio-and-nordic-ppidppi }

PTM, RP2040 PIO, and Nordic PPI/DPPI can all reduce CPU involvement in timing-sensitive work, but they operate at different architectural layers and are not interchangeable.

- **PTM** is a programmable peripheral task machine. It executes task instructions and can work with IO, events, FIFO/DMA, and AHB memory and register access.
- **PIO** is a programmable IO state machine. It executes a small instruction program focused on custom GPIO timing and serial-style protocols.
- **PPI/DPPI** are programmable peripheral interconnect mechanisms. They route peripheral events to existing peripheral tasks; they do not execute instructions or process data.

<div align="center"><em>Table: PTM, RP2040 PIO, and Nordic PPI/DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Area | SF32LB57x PTM | RP2040 PIO | Nordic PPI/DPPI |
|:-----|:--------------|:-----------|:-----------|
| Core idea | Programmable peripheral task machine for deterministic IO, custom protocols, sensor collection, and event-driven peripheral workflows. | Programmable IO state machines for deterministic GPIO and custom serial-style protocols. | Hardware interconnect between peripheral events and tasks for CPU-independent coordination where the required endpoints are available. |
| Execution unit | Indexed PTM execution resources; verify availability for the selected device. | Two PIO blocks, each with four state machines, for eight state machines total. | Event channels that propagate triggers; they do not execute programs. |
| Under-the-hood model | PTM executes custom task instructions. | State machines execute PIO instructions cycle by cycle. | PPI connects event and task endpoints; DPPI uses publisher and subscriber peripherals on a shared channel. |
| Timing model | Cycle-level timing control when executing from PTM TCM; supports waits and fixed delays. | Cycle-accurate state-machine execution with delay slots and wait instructions. | An existing peripheral task is triggered by an event; timing depends on the connected peripherals and interconnect implementation. |
| IO model | The SF32LB57x PTM block provides 16 IO channels. | State machines map instructions to selected GPIO pins through pin-control configuration. | Does not generate GPIO waveforms directly; it can use tasks exposed by peripherals such as GPIOTE and timers. |
| Instructions and logic | Custom instruction set for IO, bus reads/writes, data operations, conditional branches, waits, and delays. | Small instruction set focused on pin IO, shifting, waits, jumps, FIFO push/pull, IRQ, and moves. | No instruction execution, loops, branches, or data operations. |
| Memory/register access | Can access AHB memory and peripheral registers. | Primarily GPIO/FIFO/shift-register oriented; CPU or DMA usually supplies data and configuration. | Does not access memory or general peripheral registers; it connects available event and task endpoints only. |
| FIFO/DMA | FIFO support with DMA interface. | TX/RX FIFOs with common DMA usage. | No data path in the interconnect itself; it can trigger tasks in DMA-capable peripherals. |
| CPU interaction | Can generate CPU interrupts and connect task flows through internal events. | Uses IRQ flags, FIFOs, and CPU/DMA interaction. | The CPU configures channels; peripherals can perform event-to-task triggering autonomously at run time. |
| Typical use cases | Custom interface protocols, custom PWM, automatic sensor collection, batched memory/register operations, multi-module scheduling. | UART/SPI/I2S-style custom interfaces, WS2812-style waveforms, pin-level serial protocols, precise GPIO timing. | RTC or timer events that start ADC conversion, counting, or other exposed standard-peripheral tasks. |

</div>

### Under-the-Hood Model { #under-the-hood-model }

These mechanisms can be represented by the following execution paths:

<div align="center"><em>Figure: PPI, DPPI, PIO, and PTM Execution Paths</em></div>

```text
PPI:  Event endpoint ──> PPI channel ──> Task endpoint

DPPI: Publisher peripheral ──> DPPI channel ──> Subscriber peripheral task

PIO: CPU/DMA ──> PIO state-machine instructions ──> GPIO timing and FIFOs

PTM: CPU configuration ──> PTM task instructions ──> IO + events + FIFO/DMA + AHB access
```

PPI and DPPI route events without executing instruction streams, but they can only connect existing events and tasks; they cannot define new protocol logic. PIO defines new pin behavior through state machines, but its scope is primarily GPIO and FIFOs. PTM has a broader task scope: it can organize IO timing, event waits, data movement, register access, and coordination between small tasks into one executable flow.

PIO timing can stall on a wait condition or a full/empty FIFO; system DMA delivery is not an instruction-timing guarantee. Event routing also has implementation-dependent latency. These architectural differences do not establish a universal power ranking. Cross-domain DPPI transfer requires bridges implemented by the selected device; it is not a capability of every DPPI system.

### Nordic PPI and DPPI { #nordic-ppi-and-dppi }

PPI is the legacy Nordic model found on devices such as the nRF52 family. Software configures an event endpoint and a task endpoint for each channel. A channel can also provide a fork task endpoint, but the relationship remains an explicit endpoint connection.

DPPI is the newer Nordic model. A peripheral publishes an event on a channel, and one or more peripheral tasks subscribe to that channel. This decouples publishers from subscribers and suits newer multi-domain Nordic architectures; where a signal must cross power domains, a PPI bridge can carry supported DPPI channels between domains.

<div align="center"><em>Table: Nordic PPI and DPPI</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Area | PPI | DPPI |
| :--- | :--- | :--- |
| Configuration model | Software assigns an event endpoint and one or more task endpoints to a channel. | Peripheral event publishers and task subscribers select a common channel. |
| Connection style | Explicit event-to-task endpoint routing. | Publish/subscribe routing. |
| One event, multiple tasks | Use multiple channels or a channel fork task endpoint. | Multiple subscriber tasks can subscribe to the same published channel. |
| Typical platform context | Legacy Nordic PPI-capable devices, including many nRF52 devices. | Newer Nordic devices that implement the distributed event system. |
| Execution capability | No instruction execution or data processing. | No instruction execution or data processing. |

</div>

### Smartwatch Sensor-Hub Use Cases { #smartwatch-sensor-hub-use-cases }

For an ordinary smartwatch sensor hub, start with standard I2C/SPI peripherals, DMA, timers, and low-power wake behavior. Then classify the need:

- **Routine sampling chain:** For example, an RTC or timer expires, starts a supported standard-peripheral task, then notifies the CPU on completion or threshold detection. On Nordic platforms, this event-to-existing-task pattern is well suited to PPI on legacy devices or DPPI on newer devices; it does not require a PIO or PTM program.
- **Custom electrical protocol:** If a sensor requires a non-standard waveform, bit width, or timing that standard I2C/SPI cannot support, PIO is better suited to implement the pin-level protocol.
- **Custom sensor workflow:** If a transaction must wait for multiple triggers, control several IOs, move short data, access registers, and coordinate several steps, PTM is a better fit on SF32LB57x. It can notify the CPU at defined milestones.

PPI/DPPI, PIO, and PTM are therefore not competing “better or worse” choices. They cover event connection, pin-level protocols, and peripheral-task automation at different layers. On SF32LB57x, start with standard peripherals and use PTM only when the required timing or workflow exceeds their capability.

References: [SiFli PTM instruction definitions](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/ptm_ins.h), [RP2040 Datasheet](https://datasheets.raspberrypi.com/rp2040/rp2040-datasheet.pdf), [Nordic PPI specification](https://docs.nordicsemi.com/r/bundle/ps_nrf52811/page/ppi.html), and [Nordic DPPI event system](https://docs.nordicsemi.com/r/bundle/ps_nrf54lv10a/page/ppi.html).

## Design Guidance { #design-guidance }

**Timing and power limits:** Cycle-level instruction timing does not bound an entire transaction: AHB accesses, DMA completion and external-event waits can add variable delays. Keep the required PTM, memory and peripheral clocks and power domains active. CPU inactivity does not imply that PTM can run in every SoC sleep mode. Measure total energy, including retained clocks and wake-up overhead, against a standard-peripheral implementation.

**Resource ownership:** In SDK v2.5.1, the SF32LB57x [RAMless DPI display driver](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_lcdc_aux.c) uses the execution resource identified in the SDK as “PTM core 0,” its TCM, event 0, the associated interrupt, and an allocated DMA channel. This SDK identifier does not establish the number of physical PTM cores. The driver is a concrete bus-access and DMA-coordination example, not a freely reusable resource allocation. Do not overwrite resources owned by an active driver. Define buffer ownership between CPU and DMA and perform cache maintenance where required.

First confirm that the target is an SF32LB57x device with PTM documented for the intended design. Then consider PTM when a workflow has several of these characteristics:

- it repeats often enough that CPU service would waste power or timing margin;
- it needs deterministic timing around IO edges or trigger response;
- it uses a custom interface not covered cleanly by standard peripherals;
- it benefits from FIFO/DMA-assisted data movement;
- it can be expressed as a compact state machine or task sequence;
- it should notify firmware only at meaningful boundaries.

Avoid PTM when:

- a standard peripheral already implements the protocol cleanly;
- the task is high-level, branch-heavy application logic;
- timing is loose enough that normal interrupts or RTOS tasks are simpler;
- the software team does not yet have SDK support, examples, or tooling for the required PTM program.

Good PTM design starts by drawing the boundary between deterministic work and policy work. Put timing, short data movement, and event reactions into PTM. Keep product decisions, error handling policy, large buffers, and complex state ownership in firmware.

## Key Takeaways { #key-takeaways }

- The SF32LB57x hardware design guide lists one PTM block with 16 channels; use each target device's own documentation for other families.
- Confirm the implemented PTM resources for the selected device and SDK.
- It can execute compact custom instructions from PTM TCM or the system bus.
- It supports IO control, bus/register access, data operations, waits, delays, FIFO/DMA, interrupts, and internal events.
- It is useful for deterministic custom peripheral behavior that sits between fixed-function hardware and ordinary firmware.
- PTM is conceptually adjacent to RP2040 PIO, but broader in system integration and task scope.
- For SF32LB57x designs, PTM can be an architectural differentiator when the selected device documents the required PTM resources, especially for custom sensors, displays, actuators, protocol glue, and low-overhead peripheral automation.
