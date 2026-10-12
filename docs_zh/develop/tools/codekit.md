---
icon: lucide/app-window
description: "SiFli CodeKit 这一 VS Code 扩展在 SiFli-SDK 开发流程中的定位：创建工程、构建/烧录/监视工作流和故障排查。"
tags:
    - 开发
    - CodeKit
---

# CodeKit { #codekit }

SiFli CodeKit 是用于 SiFli-SDK 开发的 VS Code 扩展，可引导开发者完成 SDK 设置、创建工程、配置、构建、烧录和监视等流程。

首次运行请参阅 [CodeKit 快速开始](../../getting-started/sifli/getting-started-sifli-codekit.md)。本页说明 CodeKit 在开发工作流中的定位。

主要参考资料：

- [SiFli CodeKit 入门](https://docs.sifli.com/projects/codekit/get-started/)

## 适用场景 { #best-use-cases }

在以下情况下使用 CodeKit：

- 希望以 VS Code 为中心使用 SDK。
- 需要引导式项目配置。
- 希望在编辑器中配置开发板和项目。
- 不想记忆所有命令，希望直接执行构建、烧录和监视操作。
- 希望让初次接触 SiFli-SDK 的开发者更顺畅地上手。

编写 CI 脚本、排查工具链路径问题或准备工厂/发布流程时，应使用命令行 SDK 流程。CodeKit 是提升开发效率的工具层，不能替代对 SDK 构建机制的理解。

## 与 SiFli-SDK 的关系 { #relationship-to-sifli-sdk }

CodeKit 封装 SDK 工作流，但不取代 SDK。以下底层概念仍然重要：

- SDK 根目录。
- 开发板名称。
- 项目目录。
- 构建输出。
- 烧录/下载路径。
- 串口监视器。

CodeKit 操作失败时，应尽可能通过底层 SDK 命令复现问题。这样既能让问题报告更清楚，也有助于区分扩展本身的问题和 SDK 的问题。

使用 [SiFli-SDK](../platforms/sifli-sdk/overview.md) 选择受支持的基线，并通过[构建、烧录与监视](../platforms/sifli-sdk/build-flash-monitor.md)保留等效的命令行证据。在改造 CodeKit 工程前，应从匹配的 [SDK 示例](../examples/index.md)开始。

## 运行模型 { #operational-model }

当 CodeKit 的编辑器操作能通过底层 SDK 复现时，它最有用。应将扩展视为操作界面，并以 SiFli-SDK 作为工具链、开发板定义、构建输出和下载产物的权威依据。

[CodeKit 快速开始](../../getting-started/sifli/getting-started-sifli-codekit.md) 介绍扩展安装和 `hello_world` 的首次运行。该基线成功后，可使用 CodeKit 缩短“编辑-构建-烧录-监视”循环；当操作需要自动化、检查或在 VS Code 外复现时，使用 SDK 命令行。

## 应记录的信息 { #what-to-record }

每个 CodeKit 项目都应记录：

- CodeKit 扩展版本。
- SiFli-SDK 路径和 SDK 分支。
- CodeKit 中选择的开发板。
- 对应的 SDK 开发板名称。
- 构建输出目录。
- 烧录/下载行为。
- 串口监视器波特率。

有了这些信息，必要时便可从命令行复现 GUI 操作。

## 故障排查 { #failure-boundaries }

<div align="center"><em>表：故障排查策略</em></div>

<div align="center" markdown>

| 故障 | 建议的下一步 |
|:-----|:-------------|
| 找不到 SDK | 重新选择 SDK 根目录，并确认 SDK 安装已经完成。 |
| 构建失败 | 如可行，使用 `scons` 复现同一项目。 |
| 基准工程首次运行正常，但后续烧录失败 | 将项目的开发板和输出与可用基线对比，再检查端口占用和下载模式。 |
| 监视器显示乱码 | 确认波特率和所选端口。 |
| 找不到界面命令 | 打开命令面板并搜索 `SiFli`。 |

</div>
