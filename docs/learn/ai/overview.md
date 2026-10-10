---
icon: lucide/brain-circuit
title: "AI Overview"
description: "Overview of building on-device AI on SF32: choosing a device, using the NNACC HAL, budgeting memory, and scheduling inference within the power budget."
tags:
  - AI
---

# Overview { #ai-overview }

## Overview { #overview }

This page explains how to deploy on-device AI on SF32: select a device, prepare a model for its execution path, budget memory, and schedule inference within the product's energy budget. It assumes the hardware background in [AI Accelerator Architecture](accelerator.md); read that first for the accelerator's role and limitations.

The SDK exposes accelerator operations through the **NNACC** (neural network accelerator) HAL, with separate [HAL](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/hal/nnacc/README_EN.md) and [RT-Thread driver](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/rt_device/nnacc/README_EN.md) examples. These examples validate an individual depthwise-convolution operation, not a complete trained-model deployment. Use them to establish a working operator baseline; separately select and verify the model runtime, conversion tools, and layer mappings.

Treat implementation details cited below as specific to SDK v2.5.1. Neither those details nor family-level NNACC availability guarantee support for a specific part, a complete-model runtime or converter, operator compatibility, automatic CPU fallback, or camera input. Verify these against the exact SDK revision and configuration, chip revision, runtime, and board.

Use this page when you own the product decision and deployment path for an AI feature: what the device must decide locally, how much memory and energy it may consume, and how the feature should behave when it meets real sensor data. It complements the accelerator article, which explains the hardware boundary.

## Define What the Product Needs to Decide Locally { #define-what-the-product-needs-to-decide-locally }

Start from the product decision, not the model:

- What must the device classify or detect on its own, without a phone or cloud round-trip?
- What sensor(s) feed that decision — motion, audio, biometric, camera, or a combination?
- How often must the decision run, and how quickly must it respond?
- What happens if the on-device model is wrong — is a false positive or false negative more costly?
- Will the model ever need to be updated in the field, and how?

These answers shape everything downstream: model size, memory budget, device selection, and how aggressively you can sleep between inferences.

## Pick the Right SF32 Device { #pick-the-right-sf32-device }

Not every SF32 device targets AI workloads the same way:

<div align="center"><em>Table: Pick the Right SF32 Device</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Requirement | Typical Device Direction |
|:------------|:-------------------------|
| Lightweight, occasional classification on a cost-optimized product | SF32LB52x — keep models small and CPU-oriented. |
| BLE wearable with basic sensor-fusion needs | SF32LB55x |
| Richer sensor or multimedia pipeline alongside UI | SF32LB56x |
| Edge AI as a primary feature — larger models, camera input where supported by the selected device, or tight latency | SF32LB58x |

</div>

Treat this table as an evaluation starting point, not a guarantee that a model will fit or run efficiently. Confirm the selected part's memory, sensor interfaces, accelerator instance, and SDK support against the complete workload. The [SDK v2.5.1 NNACC guide](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/docs/source/en/hal/nnacc.md) identifies one HCPU accelerator on SF32LB55x/56x and separate HCPU/LCPU accelerators on SF32LB58x. It does not establish NNACC availability for SF32LB52x or SF32LB57x; treat those families as undocumented here, not as proof that they lack NNACC. The listed instance counts do not establish model compatibility or energy efficiency. See [Device-Family Positioning](accelerator.md#device-family-positioning) for the broader selection context.

## The Model Development Workflow { #the-model-development-workflow }

At a practical level, getting a model onto SF32 hardware follows the same shape regardless of the specific use case:

1. **Train or select a model** on a workstation, using data that actually resembles what the sensor will see in the field — lab-clean data often behaves very differently from noisy real-world sensor input.
2. **Shrink it for embedded constraints** — through architecture choice, pruning, or quantization — before worrying about accelerator-specific conversion.
3. **Export and map** the model to the chosen inference runtime and the exact operators, layouts, and numeric formats supported by the target SDK. NNACC HAL support alone does not provide a whole-model converter or graph runtime.
4. **Validate numerically** after conversion and quantization; don't assume desktop accuracy carries over unchanged.
5. **Integrate** pre-processing, inference, and post-processing into firmware — the model is one function call inside a larger pipeline.
6. **Profile** latency, memory, power, and accuracy on real hardware, not just in simulation.
7. **Test under realistic combined load** — Bluetooth, display, and sensors active at the same time as inference, not in isolation.

A common integration mistake is optimizing the model while leaving pre-processing, buffering, and post-processing unmeasured. These stages can cost as much as the accelerated inference, so profile the complete path.

## Define the Runtime Contract { #define-the-runtime-contract }

Before converting a model, write down the exact runtime contract firmware must satisfy:

<div align="center"><em>Table: Define the Runtime Contract</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Contract Item | Decision to Lock Down |
|:--------------|:----------------------|
| Input shape | Sample window, image size, channel count, tensor layout. |
| Numeric format | Integer width, scale/zero-point handling, calibration dataset. |
| Operator set | Layers that must run on NNACC vs. allowed CPU fallback. |
| Latency target | End-to-end pipeline latency, not just accelerator time. |
| Memory ceiling | Weights, activations, input/output tensors, pre/post buffers. |
| Update policy | Whether the model can be changed through OTA and how it is validated. |

</div>

This contract should be reviewed by both the ML and firmware owners. If the model changes shape, format, or operator mix without updating firmware, failures often appear as bad accuracy or unstable latency rather than a clean build error.

## Operator and Fallback Review { #operator-and-fallback-review }

Review every operator, its parameters, and its actual execution path before selecting a model. A CPU implementation or automatic fallback must be explicitly provided by the chosen runtime; an unsupported operation may instead prevent deployment. Even a small model can be slow if frequently executed layers use the CPU or require repeated layout conversions.

<div align="center"><em>Table: Operator and Fallback Review</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Class | Meaning | Action |
|:------|:--------|:-------|
| Accelerated | Supported directly by the NNACC path for the target device. | Preferred for hot layers. |
| CPU fallback | A verified CPU implementation is provided by the chosen runtime or firmware. | Measure its cost; accept only if the full pipeline meets its targets. |
| Conversion needed | Requires layout, type, or format conversion. | Include conversion cost in latency and power budget. |
| Unsupported | Not available in the target runtime. | Replace the layer or change the model architecture. |

</div>

The pass criterion is not “the model runs.” The pass criterion is “the full pipeline meets accuracy, latency, memory, and energy targets with the same data distribution the product sees in the field.”

## Quantization and Memory Budgeting { #quantization-and-memory-budgeting }

Compact, quantized models are a common choice for microcontroller AI, often using 8-bit integers instead of floating point. Choose the numeric format supported by the actual execution path. Before committing to a model architecture, budget memory for all of the following, not just the weights:

<div align="center"><em>Table: Quantization and Memory Budgeting</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Memory Consumer | Notes |
|:------------------|:------|
| Model weights | Reduced significantly by quantization, but still the baseline footprint. |
| Input tensors | Sized by sensor window, image resolution, or audio frame length. |
| Intermediate activations | Easy to underestimate; can exceed weight size for some architectures. |
| Output tensors | Usually small, but don't forget them in the budget. |
| Pre/post-processing buffers | Filtering, framing, feature extraction, and thresholding all need working memory. |
| Concurrent system memory | UI, Bluetooth, and audio buffers competing for the same SRAM/PSRAM at the same time. |

</div>

Quantization can reduce memory and compute cost, but recheck accuracy after conversion using representative sensor data. The SDK v2.5.1 guide documents acceleration for `arm_convolve_1x1_HWC_q7_fast_nonsquare`, `arm_convolve_HWC_q7_basic_nonsquare`, and `arm_depthwise_separable_conv_HWC_q7_nonsquare`. The [HAL configuration](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/Include/bf0_hal_nn_acc.h) uses 8-bit buffers and bias/output shifts; this is not proof that any modern int8 model's zero points and per-channel scales are directly compatible. Verify numerical equivalence and the CPU implementation, conversion, or rejection path for every unsupported layer.

## Buffer Placement and the Memory Hierarchy { #buffer-placement-and-the-memory-hierarchy }

Memory bandwidth can limit AI performance even when compute capacity is available. On SF32 devices with SRAM, Flash, PSRAM, and STAR-MC1 instruction/data caches, verify both memory accessibility and the cost of buffer placement:

- Place frequently accessed tensors and intermediate buffers in memory accessible to both the CPU and the selected accelerator instance, with the required alignment and layout.
- Keep large weights or infrequently accessed assets in external memory only when the selected execution path supports that placement. Include any copy to accelerator-accessible memory in the memory, latency, and energy budgets.
- Give each shared buffer exclusive CPU or accelerator/DMA ownership during a transfer. Before hardware access, prepare the full cache-line-aligned range: clean CPU-written inputs and handle dirty output cache lines according to the SDK's device-write rules. Wait for completion before invalidating the output range and returning ownership to the CPU. Do not modify the buffer or unrelated data sharing its cache lines while hardware owns it.

The [v2.5.1 HAL implementation](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/drivers/hal/bf0_hal_nn_acc.c) checks 1 MiB (1,048,576 bytes) address-window boundaries for the buffers and requires input and bias in the same window. Validate actual allocated addresses, not just total free memory. Its blocking start polls for completion; the interrupt path requires correct IRQ handling and completion notification. Check return values and define application-level failure recovery and bounded waiting rather than assuming a model-runtime timeout.

See [STAR-MC1](../architecture/star-mc1.md#memory-system-optimization) for cache and memory-system considerations in this kind of mixed access pattern.

## Memory Sizing Worksheet { #memory-sizing-worksheet }

Use a memory worksheet before firmware integration. Fill it out with worst-case numbers, not average-case estimates:

<div align="center"><em>Table: Memory Sizing Worksheet</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Buffer | Size Driver | Placement Preference |
|:-------|:------------|:---------------------|
| Raw input window | Sample rate x channels x window duration x bytes per sample, plus layout padding | DMA-accessible memory if captured by a peripheral. |
| Pre-processing workspace | Filters, FFT/MFCC, normalization, resize/crop | Fast SRAM when reused every inference. |
| Model weights | Quantized model size | Flash/PSRAM if supported; SRAM for hot sections only. |
| Activations | Largest intermediate tensors | Fast memory accessible to accelerator. |
| Output/post-processing | Classes, boxes, scores, smoothing state | SRAM; usually small but latency-sensitive. |
| Coexistence buffers | Audio, display, Bluetooth, logging | Budget concurrently, not after AI “fits.” |

</div>

Leave headroom for stack, heap, RTOS objects, logging, and OTA. A model that fits only when every other subsystem is disabled is not a product-ready model.

## Building the Full Pipeline { #building-the-full-pipeline }

The accelerator is one stage in a larger sensor-to-decision pipeline. Three common input paths are described below.

### Audio and Voice { #audio-and-voice }

Keyword spotting, wake-word-style triggers, and audio event classification all need microphone capture, framing, and feature extraction before inference even starts. See the [Audio Overview](../audio/overview.md) for the capture and buffering side of this pipeline — the accelerator only helps if the audio feeding it is captured and buffered efficiently in the first place.

### Motion and Sensor Fusion { #motion-and-sensor-fusion }

Gesture recognition, activity classification, and biometric analysis typically consume accelerometer, gyroscope, or other sensor streams. Measure sensor operation, capture, pre-processing, and inference separately before deciding which dominates energy use. Batching and interrupt-driven capture can reduce wakeups when latency and signal coverage permit; they do not universally outweigh model cost. See the [Low-Power Overview](../low-power/overview.md#ai-and-sensor-power-tuning) for scheduling guidance.

### Camera and Image Input { #camera-and-image-input }

Camera input can impose substantial capture, buffering, bandwidth, and inference costs; the actual load depends on resolution, frame rate, sensor operation, and model architecture. Where accuracy permits, reduce frame size or process a region of interest. Select a model for embedded constraints rather than assuming a desktop vision model can be deployed unchanged.

## Power-Aware Inference Scheduling { #power-aware-inference-scheduling }

Choose scheduling to meet detection coverage and response-time requirements. Periodic inference is valid when the product needs regularly sampled decisions; event gating is useful only if it does not miss required signals.

- Trigger inference from useful new data where appropriate, such as a sensor threshold or a complete audio frame. Retain periodic processing when needed, and verify false negatives and worst-case response time after changing the trigger.
- Batch samples where latency requirements allow, instead of running many small inferences.
- Where the device and SDK support it, move lightweight always-on sensing to the low-power processor rather than waking the main application CPU for every sample.
- Measure **energy per inference** by integrating measured supply power (supply voltage × current) over a stated measurement window. Include capture, pre/post-processing, and any wake/sleep transitions in the feature budget. Faster processing may reduce active energy or allow earlier sleep, but the benefit depends on current, memory traffic, and the rest of the system.

Full system-level power guidance lives in the [Low-Power Overview](../low-power/overview.md) — treat that as the companion document for any AI feature that needs to run continuously or near-continuously.

## The Accuracy / Latency / Power Tradeoff { #the-accuracy-latency-power-tradeoff }

The following are common design pressures, not fixed relationships. Measure the actual model accuracy and complete pipeline energy when making these tradeoffs:

<div align="center"><em>Table: The Accuracy / Latency / Power Tradeoff</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Priority | Typical Design Pressure |
|:---------|:--------------------------|
| Higher accuracy | Larger model, more input features, longer window, more memory. |
| Lower latency | Shorter capture windows, faster execution, or more frequent decisions; verify accuracy and energy consequences. |
| Lower power | Less frequent inference, compact model, efficient memory placement, aggressive sleep between runs. |

</div>

Decide which corner of this tradeoff the product actually needs before tuning — a gesture detector can often trade a little latency for battery life, while a voice trigger usually can't tolerate much delay but must also avoid false wakeups that waste power.

## Model Update and Field Validation { #model-update-and-field-validation }

If the AI feature may improve after launch, design model update support early:

- Version the model separately from firmware when possible, and record the expected input contract with the model package.
- Verify package authenticity, integrity, and runtime/input compatibility before activation. Make activation resilient to interrupted updates and keep a known-good rollback path if startup validation fails.
- Store calibration, thresholds, and post-processing constants with the model version that requires them.
- Log enough field statistics to diagnose drift without storing private raw sensor data unnecessarily.
- Re-run power and coexistence tests after every model update; a model accuracy improvement can still be a product regression if it wakes the system more often.

## Debugging AI Performance and Accuracy { #debugging-ai-performance-and-accuracy }

<div align="center"><em>Table: Debugging AI Performance and Accuracy</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| Symptom | Likely Area to Check |
|:--------|:----------------------|
| Model runs but accuracy drops vs. workstation results | Quantization/calibration mismatch, or training data not representative of real sensor noise. |
| Inference is slower than expected | Actual CPU layer execution, layout conversion, memory bandwidth, or scheduling contention. |
| System never reaches expected sleep depth | Unnecessary wakeups, active drivers/clocks, power-management locks, or an unfinished accelerator transaction. |
| Feature works standalone but fails in the full product | Not tested under combined load (Bluetooth + display + sensors active together). |
| High power despite a "fast" model | Measuring latency instead of energy per inference; codec/sensor path left active between runs. |
| Intermittent garbage output on shared buffers | Cache-line preparation, dirty-line hazards, premature reuse, missing completion, or overlapping CPU/hardware ownership. |

</div>

## Common Mistakes { #common-mistakes }

- Choosing a model architecture before checking which operators the target runtime actually accelerates.
- Porting a desktop-scale model instead of designing for embedded constraints from the start.
- Ignoring the memory cost of intermediate activations and only budgeting for model weights.
- Running inference without checking whether its rate and trigger match required input coverage and response time.
- Validating accuracy only on clean lab data, never on realistic field/sensor noise.
- Testing the AI feature in isolation and only discovering coexistence problems after full product integration.
- Optimizing model latency while ignoring the pre- and post-processing stages around it.

## Bring-Up Checklist { #bring-up-checklist }

- [ ] Define the local decision the product needs to make and the acceptable latency/accuracy/power tradeoff.
- [ ] Select the SF32 device based on model size and memory needs, not just cost target.
- [ ] Build and validate the full pipeline (capture -> pre-processing -> inference -> post-processing) with a minimal test model first, then with the production model.
- [ ] Convert and quantize the real model, then validate accuracy against realistic sensor data.
- [ ] Budget memory for weights, input/output tensors, and intermediate activations together.
- [ ] Validate cache-coherency handling for any CPU/accelerator shared buffers.
- [ ] Validate periodic or event-driven scheduling against detection coverage, worst-case latency, and the measured energy budget.
- [ ] Profile energy per inference under combined system load (Bluetooth, display, sensors active).
- [ ] Re-validate accuracy and power after any quantization, model, or scheduling change.

## Key Takeaways { #key-takeaways }

- Start from the product decision and sensor data, not the model architecture — the model is one stage in a larger pipeline.
- Use device-family positioning as a shortlist, then verify the actual part, SDK, operator mapping, memory allocation, and concurrent workload.
- Budget memory for the whole pipeline (weights, tensors, activations, pre/post-processing buffers), not just the model file size.
- Choose periodic or event-driven inference to preserve required detection coverage, and measure full-feature energy rather than treating model speed as a power result.
- Test accuracy on realistic field data and test the full feature under combined system load, not in isolation.
