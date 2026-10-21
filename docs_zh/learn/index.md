---
icon: lucide/lightbulb
title: "学习概览"
description: "查找所需的 SF32 架构和子系统指引：图形、蓝牙（Bluetooth）、AI、音频、低功耗以及底层处理器架构。"
tags:
    - 学习
---

# 学习概览 { #learn-overview }

在固件或硬件方案尚未定型时，你可以通过**学习**章节明确子系统方案和架构。这些页面说明 SF32 各模块如何协同：何时应将通用 CPU 的任务交给图形引擎、无线控制器、AI 加速器或其他专用硬件处理；以及图形、无线、音频、AI、内存和功耗必须在同一产品中共存时，需要验证哪些内容。

要在开发板上完成首次运行，请从[入门指南](../getting-started/index.md)开始；需要循序渐进的练习，请看[教程](../getting-started/tutorials/overview.md)；需要了解软件工作流和示例，请看[开发](../develop/index.md)；需要进行器件选型和量产设计，请看 [SF32 系列](../sf32-products/family/SF32_family.md)。

## 从设计问题开始 { #start-with-your-design-question }

<div align="center"><em>表：找到合适的学习路径</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 如果需要…… | 请从这里开始 | 然后了解 |
|:------------|:-------------|:---------|
| 理解处理器、存储器以及将任务交给专用硬件的方式 | [架构概览](architecture/overview.md) | 根据所选器件的情况，继续阅读 [STAR-MC1](architecture/star-mc1.md)、[PSRAM 与其他嵌入式存储器的比较](architecture/psram-and-memory-types.md)和 [PTM](architecture/ptm-parallel-task-machine.md)。 |
| 构建显示 UI，或选择资源和帧缓冲策略 | [图形概览](graphics/overview.md) | 根据需要继续阅读[显示控制器](graphics/display-controller.md)、[ePicasso](graphics/epicasso-gpu.md)、[eZip](graphics/ezip.md)和[TurboPixel](graphics/turbopixel.md)，完成显示、渲染和压缩相关决策。 |
| 连接手机、配件或音频设备 | [蓝牙概览](bluetooth/overview.md) | 先阅读[蓝牙处理器](bluetooth/processor.md)，了解控制器与应用之间的边界；产品需要借助手机接入 IP 网络时，再阅读[蓝牙 PAN](bluetooth/pan.md)。 |
| 增加端侧推理 | [AI 概览](ai/overview.md) | 继续阅读[AI 加速器](ai/accelerator.md)，并检查模型和处理链路对内存、延迟（latency）与功耗的要求。 |
| 采集、播放或处理声音 | [音频概览](audio/overview.md) | 继续阅读[音频服务与缓冲](audio/audio-server-buffering.md)；产品需要无线传输音频或通话时，再查看蓝牙指引。 |
| 达到续航目标 | [低功耗概览](low-power/overview.md) | 继续阅读[功耗测量与验证](low-power/measurement-and-validation.md)，并查看蓝牙、图形、音频和 AI 页面中的各子系统功耗行为。 |

</div>

## 组合使用这些页面 { #use-the-pages-together }

实际产品通常涉及多个子系统。以带显示屏、BLE 和麦克风、且有电池预算限制的可穿戴设备为例，不能把这些功能孤立看待：显示刷新会影响内存访问量和工作时间；蓝牙调度会影响唤醒频率；音频和 AI 会影响缓冲区需求与延迟；每一项决策都会改变功耗预算。

你可以按以下流程，结合这些页面反复验证和调整设计：

1. 从产品的主要需求和所选器件开始，确认该器件的文档确实列出了所需的显示、蓝牙、AI、音频、存储器和低功耗能力。
2. 在集成应用前明确各处理器的职责和内存分配。规划工作集、帧缓冲区、模型和音频缓冲区的存储位置；将延迟敏感任务所需的代码和数据放入合适的低延迟存储器；只有当能力和集成约束都符合产品需求时，才使用专用硬件。
3. 从主要子系统的概览页进入详细实现页面。应把指向蓝牙、存储器和低功耗内容的交叉链接视为设计依赖，而不是可选的背景阅读。
4. 在目标硬件上验证完整组合。使用[开发](../develop/index.md)中的工作流以及相关学习页面所述的测量方法，同时测试功能、延迟、带宽、RF 行为和功耗。

!!! note "自动生成内容"
    本页在没有现成专属源文档的情况下整理和撰写。依赖其中的技术信息前，请先对照思澈科技（SiFli）官方文档进行核实。
