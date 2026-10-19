---
icon: lucide/rocket
title: "入门指南概览"
description: "为你的第一块 SF32 开发板选择软件路径——SiFli-SDK、CodeKit、Zephyr、Arduino、Rust 或 MicroPython，附各路径现状与所需硬件。"
tags:
    - 快速开始
    - SF32
---

# 入门指南概览 { #getting-started }

SF32 器件支持多种软件开发路径。目前，SiFli-SDK 和 CodeKit 是官方的首次上手路径。从 Zephyr v4.3.0 开始，SF32LB52 DevKit LCD 已纳入 Zephyr 上游持续维护的支持范围。OpenSiFli 提供 ArduinoCore-zephyr 测试版软件包，并在开发 SF32LB52 的 Rust 支持。MicroPython 仍需提供官方固件镜像和面向特定开发板的操作说明，才能形成经过验证的入门教程。

需要了解参考开发流程和各开发路径的当前范围时，请参阅[开发概览](../develop/index.md)。下方表格仅用于选择起点；各平台页面才是其支持开发板及限制条件的权威参考。

## 选择开发路径 { #choose-your-path }

<div align="center"><em>表：开发路径选择</em></div>

<div align="center" markdown>

| 路径 | 当前状态 | 从这里开始 |
|:-----|:---------|:-----------|
| **SiFli-SDK** | 思澈科技（SiFli）官方的 SF32 参考开发路径，涵盖 RT-Thread、蓝牙（Bluetooth）、图形、音频、低功耗和开发板启动调试。 | [SiFli-SDK](sifli/getting-started-sifli-sdk.md) |
| **SiFli CodeKit** | 思澈科技（SiFli）官方 VS Code 工作流，用于 SDK 配置、创建工程、构建、烧录和串口监视。 | [SiFli CodeKit](sifli/getting-started-sifli-codekit.md) |
| **Zephyr** | 从 Zephyr v4.3.0 起，Zephyr 上游持续维护对 `sf32lb52_devkit_lcd` 的支持。 | [Zephyr 上游版本](zephyr/getting-started-zephyr-upstream.md) |
| **Arduino** | OpenSiFli 已为 SF32LB52 DevKit LCD 提供 ArduinoCore-zephyr 测试版软件包。 | [Arduino](arduino/getting-started-arduino.md) |
| **Rust** | OpenSiFli `sifli-rs` 提供开发中的 Rust 评估路径；尚未达到量产可用状态。 | [Rust](rust/getting-started-rust.md) |
| **MicroPython** | 仍需官方固件镜像、烧录命令、REPL 参数和受支持 API 的明确信息。 | [MicroPython](micropython/getting-started-micropython.md) |

</div>

## 所需准备 { #what-you-need }

首先选择一块受目标软件路径支持的开发板。不同开发板和框架所需的下载接口与串口连接方式可能不同：

- 一块 SF32 开发板，例如 [SF32LB52-DevKit-LCD](../sf32-products/devkits/SF32LB52-DevKit-LCD.md)。
- 一根支持数据传输的线缆，并按照开发板和框架的要求连接到编程或串口接口。对于 SF32LB52-DevKit-LCD，思澈科技（SiFli）的[连接说明](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/get-started.html)要求通过 USB-to-UART 接口进行串口下载；不要将它与专用 USB 功能接口混淆。
- 一台运行 Windows、macOS 或 Linux 的计算机。
- 一个按开发板控制台配置的串口终端，用于查看启动日志和示例输出。

!!! tip "使用支持数据传输的线缆"
    仅支持充电的 USB 线缆是首次运行失败的常见原因。如果开发板可以上电，但系统没有出现串口，请更换一根确认支持数据传输的线缆，并直接连接计算机的 USB 端口。

## 推荐的首次运行路径 { #recommended-first-run }

如果这是你第一次使用 SF32 开发板，建议从 [SiFli-SDK](sifli/getting-started-sifli-sdk.md) 开始。它是 SF32 的参考软件栈，也是验证开发板、线缆、串口、烧录流程和工具链是否正常工作的最可靠基线。

成功运行 `hello_world` 后，再切换到支持目标硬件的其他框架。这样，即使后续实验失败，你仍然拥有一条已经验证的恢复路径。

## 成功标准 { #what-success-looks-like }

完成任一快速开始指南后，你应当已经：

- 构建或加载了第一个示例。
- 将示例烧录到开发板。
- 打开了串口控制台。
- 看到了预期输出，例如启动日志、`hello_world`、Shell 提示符或 REPL 启动提示。
- 记录了已验证的开发板名称、串口和烧录命令。

请将这些信息保存在项目记录中。开始修改示例后，它们能帮助你最快恢复到已知可用的状态。

## 继续学习教程 { #continue-with-tutorials }

能够重复达到首次运行成功标准后，请继续阅读[教程概览](tutorials/overview.md)。教程是这条上手路径的下一阶段：先练习单个外设，再组合多个子系统，最后学习产品开发所需的验证工作。

## 何时转入开发文档 { #when-to-move-to-develop }

当你能够重复完成已知可用的首次运行时，入门指南的任务就已完成。[开发](../develop/index.md)是持续工程工作的参考，涵盖平台成熟度、工具、烧录/调试流程、固件架构和产品集成。首次运行完成后，请使用 [CodeKit 工具参考](../develop/tools/codekit.md)了解 CodeKit 在日常开发工作流中的定位；本页面则只保留首次运行路径。

## 选择开发路径前先核实 { #before-choosing-a-development-path }

确定采用某条软件开发路径前，先核实对应开发板和软件版本的资料是否说明了以下信息：

- 按开发板列出的 SiFli-SDK、CodeKit、Zephyr、Arduino 和 MicroPython 支持状态及成熟度。
- 每条受支持的软件路径所使用的准确开发板标识。
- 适用于 Windows、macOS 和 Linux 的烧录或下载说明。
- 每个首个示例的预期串口输出。
- 烧录失败或固件镜像无效时的恢复步骤。
- 各框架的已知限制，尤其是蓝牙、显示、存储、USB 和低功耗行为方面的限制。
- 能说明 SDK、CodeKit、软件包、固件镜像与开发板支持版本之间兼容关系的版本说明。

不要因为某条开发路径支持一款开发板，就默认它适用于所有 SF32 开发板；请核实你要使用的具体开发板和软件版本。
