---
icon: lucide/microchip
description: "SF32 NNACC operator support, CPU/runtime roles, memory constraints, and how to evaluate latency and energy for embedded AI."
tags:
  - AI
---
# AI Accelerator { #ai-accelerator }

## Introduction { #introduction }

The **AI accelerator**, called NNACC in the SDK, offloads supported neural-network operations on selected SF32 devices. It supports **edge AI**, where inference runs locally rather than depending on a cloud service. Whether acceleration reduces latency, CPU occupancy or energy depends on the model, memory placement, software implementation and complete product workload.

Wearables, health-monitoring devices, smart displays, voice-enabled accessories, sensor-fusion systems and compact AIoT products are potential applications. They often combine Bluetooth, graphics, audio, sensing and user interaction in a battery-powered device. Offloading supported operations can leave more CPU time for other tasks, but the resulting responsiveness and energy savings must be measured.

The exact AI feature set depends on the specific SF32 device and SDK support. Always check the datasheet, reference manual, and SDK documentation for the target chip before committing a model architecture or memory plan.

The CMSIS-NN operator details and per-device NNACC counts below are based on SiFli SDK v2.5.1 documentation. The NNACC guide in that release lists resources for SF32LB55x/56x/58x but does not establish availability for SF32LB52x or SF32LB57x; its omission is not evidence that either family lacks NNACC. The address-window checks, wait behavior, and GC032A configuration are observations from that release's HAL or driver sources, not universal guarantees across silicon revisions or SDK versions. The cited NNACC guide and examples do not establish an end-to-end model converter or graph runtime, automatic CPU fallback, or camera capture support for every part and board. Verify the exact SDK revision and configuration, chip revision, runtime, and board before freezing the design.

Read this page when you are deciding whether a local AI feature fits the selected SF32 device, or when you need to divide an inference pipeline between sensors, the CPU, memory, and the accelerator. For model integration and deployment workflow, start with the companion [AI Overview](overview.md).

## Why On-Device AI Matters { #why-on-device-ai-matters }

Many embedded products need intelligent behavior without continuously streaming raw data to a phone or cloud service. On-device AI can improve a product in several ways:

- Potentially lower latency: local inference can avoid a round trip to a phone or cloud service, but measure sensor-to-decision latency on the complete product.
- Better privacy, because raw biometric, audio, or motion data can remain local.
- Lower wireless traffic, because only events or summaries need to be transmitted.
- Better offline behavior, because core features can work without network access.
- Lower average power only if the complete feature uses less energy over the same use interval at equivalent accuracy and detection coverage, including offload overhead.

For wearables and AIoT devices, these benefits are practical rather than abstract. A watch may classify gestures, detect activity states, monitor health signals, recognize simple voice triggers, or process sensor data while keeping the display, Bluetooth, and application processor responsive.

These benefits are conditional. Local processing reduces wireless traffic only if the product avoids sending the raw data, and privacy still requires appropriate storage, access controls and protection of any transmitted data. The use cases below are design possibilities, not a claim that the SDK ships every model.

## Position in the SF32 System { #position-in-the-sf32-system }

A simplified SF32 edge-AI pipeline looks like this:

<div align="center"><em>Diagram: Processing Stages and Firmware-Controlled Inference</em></div>

```text
Sensors / Audio / Camera
        │
        ▼
Pre-processing
  - filtering
  - framing
  - normalization
  - feature extraction
        │
        ▼
Firmware / Inference Runtime
  - model graph orchestration
  - supported operations on NNACC
  - other operations on CPU, if implemented
        │
        ▼
Post-processing
  - thresholding
  - smoothing
  - event detection
  - application decisions
        │
        ▼
Application, UI, Bluetooth, or Storage
```

The accelerator is one part of the complete AI pipeline. Real products still need data capture, buffering, pre-processing, inference scheduling, post-processing, and application-level decision logic. The best performance usually comes from designing the entire pipeline around the memory hierarchy and available accelerators rather than treating inference as an isolated function call.

## What the AI Accelerator Does { #what-the-ai-accelerator-does }

AI accelerators are useful because many neural-network workloads repeat the same mathematical patterns thousands or millions of times. These patterns may include convolution, matrix multiplication, vector operations, activation functions, pooling, or other fixed-point arithmetic kernels. Dedicated hardware can execute selected kernels with better energy efficiency than a general-purpose CPU.

These are examples of neural-network mathematics, not a list of operations supported by SF32 NNACC. The [SiFli SDK v2.5.1 NNACC guide](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) documents NNACC acceleration for three CMSIS-NN q7 convolution functions, including depthwise convolution, and reports that the NNACC-enabled CMSIS-NN implementation is 8 times faster than the ARM DSP implementation in CMSIS-NN. The guide does not state the benchmark conditions for this figure; treat it as a vendor-reported comparison, not a guarantee of whole-model latency or energy improvement. Check each model operator and its numerical format against the selected implementation; do not assume that matrix multiplication, activation or pooling is independently accelerated. The SDK also provides HAL APIs for direct accelerator control, but do not assume either interface supplies a complete model converter or graph runtime. Firmware or a separate inference runtime must orchestrate layers and manage buffers; CPU fallback also requires an implementation for unsupported operators.

SF32 devices have finite memory and bandwidth, so start with a compact embedded model. Verify NNACC availability and operator support for the exact part, then measure memory use, latency and energy across the complete pipeline; do not infer support from the family name alone.

Common AI-related workloads include:

- Keyword spotting or simple voice-event detection.
- Gesture recognition from accelerometer and gyroscope data.
- Activity classification and motion-state detection.
- Sensor fusion for wearable and health devices.
- Biometric signal analysis, depending on sensor and algorithm support.
- Simple image or camera-based classification on devices with camera input.
- Anomaly detection and local event filtering.

## CPU, Accelerator, and Memory Roles { #cpu-accelerator-and-memory-roles }

A good mental model is that the CPU controls the workflow, while the accelerator handles selected compute-heavy kernels.

<div align="center"><em>Table: CPU, Accelerator, and Memory Roles</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Component | Typical Role |
|:----------|:-------------|
| **Application CPU** | Runs application logic, schedules inference, manages buffers, handles UI, Bluetooth, storage, and system policy. |
| **Low-power processor** | May handle always-on sensing or background tasks on devices where it is user-programmable. |
| **AI accelerator** | Runs supported NNACC operations; compare CPU time and complete-pipeline energy with the software baseline. |
| **DMA / memory system** | Provides memory access and, where configured, data transfers; not every NNACC input or output requires a separate DMA copy. |
| **Other accelerators** | Audio, graphics, crypto, or sensor-processing blocks may support the complete product pipeline. |

</div>

The accelerator does not replace the CPU or execute an arbitrary model by itself. Firmware still prepares inputs, configures supported operations, waits for completion, processes results and controls the application. An unsupported operation can run on the CPU only if the chosen runtime or application actually provides that implementation; otherwise deployment may fail. Hardware support alone does not establish automatic CPU fallback.

## Device-Family Positioning { #device-family-positioning }

Choose the device from the operators, memory budget and complete product workload, rather than from a family-wide performance ranking. The SDK v2.5.1 guide documents one HCPU NNACC on SF32LB55x and SF32LB56x, and an NNACC in each of the HCPU and LCPU subsystems on SF32LB58x. Those resources are selection inputs, not a guarantee that an entire model runs faster or uses less energy. Verify availability, accessible memory and software support for the exact part and configuration.

<div align="center"><em>Table: Device-Family Positioning</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Device Family | AI Positioning |
|:--------------|:---------------|
| **SF32LB52x** | Consider for cost-optimized Bluetooth, audio and basic HMI products; use a lightweight CPU implementation as the baseline unless specific acceleration is verified. |
| **SF32LB55x** | Suitable for BLE wearables and sensor-rich products; useful for low-power sensing and compact algorithms. |
| **SF32LB56x** | Consider for richer UI, connected HMI and sensor or multimedia pipelines; verify the selected configuration and HCPU NNACC operator support. |
| **SF32LB57x** | The cited guide does not establish NNACC availability for this family; verify the exact part, board, and SDK operator, runtime, and memory support before selecting it for AI. |
| **SF32LB58x** | Consider for combined AI, graphics and audio workloads when the selected part's memory and HCPU/LCPU resources meet the product requirements; verify operators, integration costs and measured energy. |

</div>

This table is a product-selection guide, not a substitute for the datasheet. Exact accelerator availability, supported operators, memory limits, and SDK tooling must be verified for the chosen part number.

## Model Development Flow { #model-development-flow }

A typical embedded-AI workflow has several stages:

1. Train or choose a model on a workstation using representative data.
2. Reduce the model to fit embedded constraints through model selection, pruning, quantization, or architecture changes.
3. Choose or implement the inference runtime and model representation, then verify operator coverage and numerical compatibility with the selected SDK kernels. Do not assume that the NNACC HAL includes a whole-model converter.
4. Validate numerical accuracy after conversion and quantization.
5. Integrate pre-processing, inference, and post-processing into firmware.
6. Profile latency, memory use, power, and accuracy on real hardware.
7. Test realistic concurrent Bluetooth, display, audio and sensor workloads, including transitions into and out of the intended low-power states.

The most common mistake is to optimize only the neural network and ignore the rest of the pipeline. In many embedded products, pre-processing, memory movement, sensor timing, and post-processing can be as important as the accelerator itself.

## Quantization and Model Size { #quantization-and-model-size }

Microcontroller-class AI usually depends on compact models and efficient numerical formats. Quantized models, often using 8-bit integer data, can reduce memory footprint, required memory bandwidth, and compute cost compared with floating-point models.

An 8-bit model is not automatically compatible with NNACC. The [SDK v2.5.1 HAL configuration](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) uses `int8_t` buffers and `bias_shift` / `out_shift` fields. Those fields do not establish support for arbitrary zero points, per-channel scales or every modern int8 operator. Check tensor layout, signedness, shifts and bias representation against the exact kernel implementation, then compare its output with a software reference using representative and boundary inputs.

Quantization has tradeoffs:

- It can greatly improve efficiency.
- It can reduce model size and tensor memory.
- It may reduce accuracy if the model is not trained or calibrated carefully.
- Some operators may not map cleanly to the accelerator or runtime.

For production use, measure both accuracy and system performance after conversion. A model that performs well in a desktop training environment may behave differently after quantization, sensor-noise exposure, and embedded pre-processing.

## Memory and Bandwidth Considerations { #memory-and-bandwidth-considerations }

AI workloads can be memory hungry even when the model looks small. The system may need memory for:

- Model weights.
- Input tensors.
- Intermediate activation buffers.
- Output tensors.
- Audio frames, sensor windows, or camera frames.
- Pre-processing and post-processing buffers.
- UI, Bluetooth, and application data running at the same time.

For the internal SRAM, Flash, PSRAM and cache configuration of the selected device, place frequently accessed tensors and intermediate buffers where the CPU and accelerator can reach them efficiently. Budget external storage, staging buffers and copies together rather than optimizing only model size.

First verify that the selected NNACC can access every buffer; external Flash or PSRAM placement is not automatically usable without staging copies. Include copy time, working RAM and energy in the budget. The [SDK v2.5.1 HAL implementation](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) rounds checked buffer sizes to 4 bytes and rejects a buffer when its start and checked end occupy different 1 MiB (1,048,576-byte) address windows. Input and bias must also share a window. An end exactly at the next window boundary fails that check. Plan allocations against these actual checks and check error returns before starting the next operation.

When the CPU shares buffers with DMA or NNACC, assign exclusive ownership during each transfer or operation. Clean CPU-written inputs before the hardware reads them. Prepare the destination's cache lines according to the SDK before hardware writes, so dirty CPU lines cannot later overwrite the result. After confirmed hardware completion, invalidate stale CPU copies before reading the output. Align maintenance ranges to complete cache lines and avoid sharing those lines with unrelated live data. Cleaning stale output after hardware has written it can destroy the result; clean and invalidate are not interchangeable.

## Audio, Sensor, and Camera Pipelines { #audio-sensor-and-camera-pipelines }

AI acceleration rarely works alone. It is usually part of a sensor, audio, or camera pipeline.

### Audio and Voice { #audio-and-voice }

For voice or audio-event detection, the pipeline may include microphone input, DMA buffering, framing, filtering, feature extraction, inference and event smoothing. NNACC can execute supported neural-network operations; firmware or the chosen runtime handles the remaining graph, while the CPU or audio subsystem manages samples and features. The model and its validated software implementation are still required.

Typical examples include:

- Keyword spotting.
- Wake-word detection, depending on software support.
- Audio scene or event classification.
- Voice activity detection.

### Motion and Sensor Fusion { #motion-and-sensor-fusion }

For wearable products, sensor data often comes from accelerometers, gyroscopes, heart-rate sensors, SpO2 sensors, ECG front ends, or other peripherals. AI can classify motion states, gestures, activity patterns, or health-related signal features.

Batch samples and use interrupts where the required detection coverage and latency permit. Moving suitable background processing to a user-programmable low-power processor may reduce application-CPU wakeups, but include that processor's activity, sensor sampling and wake-up costs in the comparison. Do not turn off sensing needed to detect the event.

### Camera and Image Input { #camera-and-image-input }

Camera input depends on the exact chip, package, board and capture driver. The [SDK v2.5.1 GC032A sensor driver](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/customer/peripherals/camera/gc032a/drv_gc032a.c) configures 8-bit DVP or two-bit SPI sensor output; this is not proof that either capture path works on every SF32 device. Verify pins, peripheral or PTM capture support, sensor timing and the driver before selecting the camera. Image workloads often need larger frame buffers and more bandwidth than audio or motion workloads, but compare actual resolutions and rates.

Consider smaller frames, regions of interest, lower frame rates or an embedded-oriented model. Cropping in firmware after capture reduces model input, not necessarily camera-transfer traffic or capture-buffer size; sensor-side cropping or reduced acquisition may be needed to save those costs.

## Scheduling and Power Management { #scheduling-and-power-management }

AI tasks should be scheduled with the rest of the system in mind. A wearable product may need to keep Bluetooth connected, refresh the display, capture audio, read sensors, and run inference without exceeding power or latency targets.

Good scheduling practices include:

- Use periodic or event-gated inference according to detection coverage, missed-event risk and latency requirements.
- Avoid polling loops when interrupts or events can trigger work.
- Batch sensor samples where latency requirements allow.
- Bound input-to-decision latency while retaining the input window needed for reliable detection.
- Coordinate AI workloads with display and Bluetooth activity.
- Return the CPU and accelerator to permitted low-power states after confirmed completion, buffer handoff and release of any power-management locks; keep required sensing and other pending work active.

Measure the complete feature's energy by integrating its measured supply power (supply voltage × current) over time, not by considering inference latency alone. Include sensor acquisition, preprocessing, copies, accelerator work, CPU fallback, postprocessing and idle intervals. Faster execution may reduce active energy without allowing earlier sleep; savings depend on the remaining system load. Compare equivalent detection coverage and accuracy before reducing inference frequency.

In SDK v2.5.1, the blocking HAL start polls for completion without its own explicit timeout. Interrupt-mode operation needs a working IRQ handler and completion notification. Check start errors, bound the application's wait, and define recovery before reusing buffers or releasing power-management locks.

## Accuracy, Latency, and Power Tradeoffs { #accuracy-latency-and-power-tradeoffs }

Embedded AI design is a three-way tradeoff between accuracy, latency, and power.

<div align="center"><em>Table: Accuracy, Latency, and Power Tradeoffs</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Goal | Typical Design Considerations |
|:-----|:------------------------|
| Higher accuracy | May require a larger model, more features or a longer input window; validate the actual accuracy gain and memory cost. |
| Lower latency | Reduce acquisition, queueing and compute delays. Shorter windows may hurt accuracy; a higher inference rate may increase energy. |
| Lower power | Use compact models and efficient placement; reduce inference frequency only if detection coverage permits, and verify sensing and sleep policy. |

</div>

The right balance depends on the product. A gesture detector may tolerate a little delay if it saves power. A voice trigger may require fast response but must avoid false wakeups. A health-monitoring algorithm may prioritize robustness and long-term battery life over instant classification.

## Practical Design Guidance { #practical-design-guidance }

When planning an SF32 AI product, start with the product behavior rather than the model:

- What decision must the device make locally?
- What sensors provide the input data?
- How often must inference run?
- What latency is acceptable?
- What is the maximum memory budget for model weights and tensors?
- Can the model be quantized without losing too much accuracy?
- Which operations are accelerated by the selected chip and SDK?
- What happens when Bluetooth, display, audio, and inference are active together?
- How will model accuracy be validated with real product data?
- How will the firmware update or replace the model in the field, if needed?

A successful embedded-AI product usually combines a compact model, careful data collection, hardware-aware memory placement, realistic profiling, and a power policy that avoids unnecessary wakeups.

## Typical Use Cases { #typical-use-cases }

Consider SF32 AI acceleration for compact local inference in connected, battery-powered products, where supported operators and the measured system budget fit:

- Gesture recognition on watches, bands, and handheld devices.
- Activity classification for fitness and health products.
- Voice-event or keyword detection for audio accessories.
- Sensor-fusion algorithms for wearables.
- Biometric signal analysis where supported by sensors and software.
- Local anomaly detection for smart devices.
- Simple image classification or camera-triggered events on devices with camera input.
- Smart HMI behavior that adapts to user context.

## Key Takeaways { #key-takeaways }

- NNACC can offload supported operations and reduce CPU occupancy; latency and energy benefits must be verified for the complete feature.
- It is part of a complete pipeline that also includes sensors, audio or camera input, pre-processing, memory movement, post-processing, and application logic.
- SDK v2.5.1 documents NNACC resources for SF32LB55x, SF32LB56x and SF32LB58x, but does not establish availability for SF32LB52x or SF32LB57x; verify the exact part and workload rather than inferring support or absence from a family name.
- Real performance depends on model size, quantization, supported operators, memory placement, cache handling, DMA behavior, and SDK runtime support.
- Local inference is useful when it meets the product's response, offline, privacy or wireless-traffic goals; none of those benefits follows from accelerator hardware alone.
