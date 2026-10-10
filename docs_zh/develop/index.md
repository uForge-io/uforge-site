---
icon: lucide/code-2
title: "开发概览"
description: "以任务为主线梳理 SF32 的开发资源：SiFli-SDK 日常工作流、应用笔记、示例、工具、固件专题和社区路径。"
tags:
    - 开发
    - 软件
---

# 开发概览 { #develop }

本节帮助你把已经能运行的 SF32 开发板推进为可维护的产品固件。完成首个 `hello_world` 后，可在这里选择开发板配置、稳定地构建和烧录、基于最接近的示例开发、集成产品功能、定位故障，以及规划升级和恢复路径。

首次运行开发板请参阅[快速开始](../getting-started/index.md)；选择器件和开发板请参阅[SF32 产品](../sf32-products/index.md)；原理图和量产硬件设计请参阅[硬件](../hardware/index.md)；理解架构背景请参阅[学习](../learn/index.md)。当你需要工程工作流和面向具体任务的实现指导时，请使用本节。

!!! info "SiFli-Solution"
    SiFli-Solution 是思澈科技（SiFli）的另一套软件包，μForge.io 目前尚未收录。本文仅覆盖 SiFli-SDK 和下文列出的社区路径。如果产品需要更完整的显示设备方案，请参阅官方 [SiFli Solution 文档](https://docs.sifli.com/projects/solution/index.html)，并直接联系思澈科技（SiFli）。复杂产品采用这一路线时，可能还需要思澈科技（SiFli）团队直接深入参与。

## 建立 SiFli-SDK 基线 { #establish-a-sifli-sdk-baseline }

[SiFli-SDK](platforms/sifli-sdk/overview.md) 是思澈科技（SiFli）面向 SF32 固件的官方软件包，以 RT-Thread 为基础，也是参考开发路径。除非有明确理由评估其他生态，否则应从这里开始：目前，它在开发板支持、蓝牙（Bluetooth）、图形、音频、存储、电源管理和量产开发方面的文档覆盖范围最广。

在开发产品功能前，先建立并记录一个可复现的基线：

1. 在[开发板配置](platforms/sifli-sdk/board-configuration.md)中选择与目标开发板完全对应的 SDK 配置。
2. 成功运行[构建、烧录和监视](platforms/sifli-sdk/build-flash-monitor.md)日常流程。
3. 保存 SDK 发行版或提交、开发板名称、构建命令、烧录命令、串口设置和启动日志。
4. 从最接近的[示例](examples/index.md)开始，优先选择已经覆盖产品中最难子系统的示例。

这份记录是后续修改应用、移植开发板、分析测试故障和现场恢复时的参照基线。

## 按任务查找指导 { #find-guidance-by-task }

<div align="center"><em>表：SF32 开发任务</em></div>

<div align="center" markdown>

| 任务 | 首先阅读 | 接着使用 |
|:---------------|:---------|:---------|
| 构建并烧录固件，查看串口输出 | [构建、烧录和监视](platforms/sifli-sdk/build-flash-monitor.md) | 使用[工具](tools/index.md)了解脚本化烧录、追踪和崩溃分析工具。 |
| 让固件匹配开发板、模组或自定义硬件 | [开发板配置](platforms/sifli-sdk/board-configuration.md) | 对应的硬件设计指南和最接近的开发板专用示例。 |
| 在多个工程间复用驱动或中间件 | [组件和 `sf_pkg`](platforms/sifli-sdk/components.md) | 最小示例以及已文档化的配置边界。 |
| 实现具体外设或子系统 | [SiFli-SDK 应用笔记](platforms/sifli-sdk/sdk-application-notes.md) | 链接的官方 SDK 使用指南，获取准确 API、配置符号和命令。 |
| 从已运行的代码开始产品开发 | [示例](examples/index.md) | 匹配的开发板配置，并在每次改动后进行测试。 |
| 定位故障或收集产品验证证据 | [调试与诊断](platforms/sifli-sdk/debugging-diagnostics.md) | [日志与崩溃分析](firmware-topics/logging-crash-analysis.md)。 |
| 修改启动布局、存储、升级、USB 或功耗行为 | [固件专题](firmware-topics/index.md) | 修改代码前先阅读对应的分区、升级、USB、电源或日志专题。 |

</div>

## SiFli-SDK 应用笔记 { #sifli-sdk-application-notes }

应用笔记按集成任务组织，而非照搬 SDK 目录顺序。先查阅与当前子系统相关的内容；复用配置或命令前，再确认文中标出的芯片系列范围、开发板配置、SDK 版本和硬件前提条件。

<div align="center"><em>表：SiFli-SDK 应用笔记路径</em></div>

<div align="center" markdown>

| 工程领域 | 应用笔记起点 |
|:---------|:-------------|
| 模拟采样和传感器 | [使用 GPADC 采样](platforms/sifli-sdk/application-notes/adc-sampling.md) · [集成并读取传感器](platforms/sifli-sdk/application-notes/sensor-integration.md) |
| 存储和图形资源 | [使用外部 Flash](platforms/sifli-sdk/application-notes/external-flash.md) · [使用 EZIP 压缩图形资源](platforms/sifli-sdk/application-notes/ezip-image-assets.md) |
| 可靠性、低功耗和调试 | [配置看门狗](platforms/sifli-sdk/application-notes/watchdog.md) · [配置并测量低功耗](platforms/sifli-sdk/application-notes/low-power-measurement.md) · [采集日志并分析崩溃](platforms/sifli-sdk/application-notes/crash-analysis.md) |
| RF 和蓝牙验证 | [执行 SiFli-SDK RF 测试](platforms/sifli-sdk/application-notes/rf-performance-tests.md) · [执行蓝牙信令测试](platforms/sifli-sdk/application-notes/bluetooth-signalling-tests.md) · [执行蓝牙单项 RF 测试](platforms/sifli-sdk/application-notes/bluetooth-single-tone-tests.md) |

</div>

## 浏览开发章节 { #navigate-the-develop-section }

<div align="center"><em>表：开发章节导航</em></div>

<div align="center" markdown>

| 区域 | 用途 |
|:-----|:-----|
| [SiFli-SDK](platforms/sifli-sdk/overview.md) | 建立受支持的参考工作流：配置、构建、烧录、可复用组件和诊断。 |
| [SiFli-SDK 应用笔记](platforms/sifli-sdk/sdk-application-notes.md) | 将 SDK 应用于 GPADC、传感器、外部 Flash、低功耗、诊断、RF 或蓝牙测试等聚焦任务。 |
| [示例](examples/index.md) | 为准确开发板和产品中最难的子系统选择并改造已运行的实现。 |
| [工具](tools/index.md) | 为工作流选择下载、监视、追踪、崩溃、资源转换和量产工具。 |
| [固件专题](firmware-topics/index.md) | 对分区、OTA/DFU、USB、电源管理和诊断证据做跨模块的产品决策。 |
| [实验性 / 社区](platforms/zephyr/overview.md) | 在各页面所述范围和成熟度限制下评估 Zephyr、Arduino、MicroPython 或 Rust。 |

</div>

## 审慎评估社区路径 { #evaluate-community-paths-deliberately }

[实验性 / 社区](platforms/zephyr/overview.md)面向有理由在参考 SDK 路径之外开展工作的团队，并不表示这些路径具有同等的量产支持。

<div align="center"><em>表：社区路径的适用性</em></div>

<div align="center" markdown>

| 路径 | 适用情况 | 应视为 |
|:-----|:---------|:-------|
| [Zephyr](platforms/zephyr/overview.md) | 需要 Zephyr API、设备树（devicetree）、Kconfig，或为下游分支适配开发板。 | 面向特定开发板的下游评估路径。 |
| [Arduino](platforms/arduino/overview.md) | 需要在其支持的开发板上编写 Sketch 或快速完成外设原型。 | BETA 阶段、开发板范围受限的路径。 |
| [MicroPython](platforms/micropython/status.md) | 正在评估未来的脚本支持。 | 在出现可复现的公开移植版本前的状态页。 |
| [Rust](platforms/rust/overview.md) | 能够评估 HAL/PAC 工作并向上游贡献修复。 | 社区进行中的开发路径。 |

</div>

在决定将产品建立在这些路径之一上之前，应在目标开发板上验证每个必需外设、Flash 布局、调试方法和恢复流程。将已测试的版本、配置、命令和结果与产品源代码一同保存。

## 验证固件是否具备产品化条件 { #product-ready-development-evidence }

在将某条固件开发路径视为已具备产品化条件前，应能回答以下问题：

- 测试了哪种芯片、开发板或自定义硬件版本，以及哪项配置？
- 哪个 SDK、软件包、分支或提交生成了固件？
- 哪些构建、烧录、监视和完整恢复流程已经验证可用？
- 哪个示例或测试证明了每个必需外设和产品子系统？
- 已验证哪种分区布局、升级行为、功耗目标和崩溃信息解码流程？

只要有一项无法回答，这项工作仍可能是有价值的原型，但还不是可复现的产品基线。
