---
icon: lucide/package
description: "SiFli-SDK 作为 SF32 的参考开发路径：核心 scons 构建与 sdk.py menuconfig 工作流、开发板命名、项目结构，以及量产前的评估要点。"
tags:
    - 开发
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

SiFli-SDK 是思澈科技（SiFli）面向 SF32 固件的官方开发 SDK，提供基于 RT-Thread 的开发环境；对于受支持的目标，也提供 No-OS 示例。SDK 还包含思澈科技（SiFli）维护的开发板支持、示例和中间件，覆盖蓝牙（Bluetooth）、图形、音频、电源管理、存储及量产流程等领域。具体支持情况取决于芯片、开发板和 SDK 版本。

!!! info "SiFli-Solution"
    SiFli-Solution 是思澈科技（SiFli）的另一套软件包，不属于本页的讨论范围。本页及其链接的开发资料仅覆盖 SiFli-SDK。如需了解 SiFli-Solution 的范围、支持设备和获取方式，请参阅官方 [SiFli Solution 文档](https://docs.sifli.com/projects/solution/index.html)，并直接联系思澈科技（SiFli）。

首次安装并运行 `hello_world`，请参阅 [SiFli-SDK 快速开始](../../../getting-started/sifli/getting-started-sifli-sdk.md)。本页介绍工具链搭建完成后，如何理解和使用 SDK。

主要参考资料：

- [SiFli-SDK 安装指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)
- [SF32LB52x SDK 开发板支持列表](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/index.html)
- [OpenSiFli/SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK)

## 何时使用 SiFli-SDK { #when-to-use-sifli-sdk }

在以下场景中优先选择 SiFli-SDK：

- 需要一条有文档支撑的开发路径，以及思澈科技（SiFli）针对目标芯片和 SDK 版本维护的开发板支持与示例。
- 需要蓝牙、显示、音频、功耗、存储、USB 或 OTA 相关示例和中间件，且所选芯片与 SDK 版本支持这些功能。
- 需要 RT-Thread 集成和 Shell 工具。
- 需要使用 SDK 板名进行板级配置，例如 `sf32lb52-lcd_n16r8`。
- 需要使用思澈科技（SiFli）特有的中间件、工具、分区布局和量产流程。

## 开发模型 { #development-model }

[SiFli-SDK 入门指南](../../../getting-started/sifli/getting-started-sifli-sdk.md) 用于搭建工具链并建立 `hello_world` 基线。之后，请在一份可复现的构建记录中统一记录 SDK 版本、目标开发板、示例/项目目录、配置，以及对应的构建和下载产物。开发板名称未指定核心时，HCPU 输出目录通常遵循 `build_<board_name>_hcpu/` 格式；例如，`sf32lb52-lcd_n16r8` 会生成 `build_sf32lb52-lcd_n16r8_hcpu/`。请使用实际开发板/核心目标生成的目录，不要自行拼接目录名。

为保证开发过程可复现，请固定 SDK 分支并记录开发板名称，将本地板级改动与厂商文件分开管理，并以小而可审查的步骤修改配置。构建、下载和监视的详细流程见[构建、烧录与监视](build-flash-monitor.md)。

## 开发板名称 { #board-names }

SiFli-SDK 的开发板名称是 SDK 专用的，可能与 Zephyr 开发板名称、Arduino FQBN 或营销名称不一致。务必从 SDK 支持的开发板列表或示例文档中直接复制开发板名称。

对于 SF32LB52 DevKit LCD 系列开发板，入门示例中常用的 SDK 板名是：

```text
sf32lb52-lcd_n16r8
```

## 项目结构 { #project-structure }

大多数 SDK 示例遵循以下目录模式：

```text
example/<domain>/<example_name>/<rtos_or_mode>/project
```

例如：

```text
example/get-started/hello_world/rtt/project
```

构建产品固件时，应从最接近目标且可工作的 SDK 示例出发，一次只修改一个子系统。这样可以保持开发板配置、中间件依赖、分区假设和驱动设置的完整性。

## 配置 { #configuration }

在示例工程中，使用 SDK 的 `menuconfig` 命令为指定开发板修改功能配置：

```bash
sdk.py menuconfig --board=<board_name>
```

常见的配置需求包括：

- 启用或禁用中间件。
- 调整蓝牙角色或蓝牙应用规范（Profile）。
- 修改显示、文件系统或音频支持。
- 调整功耗管理策略。
- 选择日志或 Shell 选项。

## 量产前的评估要点 { #production-readiness-questions }

在产品分支中采用 SiFli-SDK 之前，请回答以下问题：

- 产品将固定使用哪个 SDK 发布分支？
- 哪些开发板支持文件归产品团队所有，哪些归厂商所有？
- 哪些示例验证了关键功能？
- 制造和 OTA 使用哪套分区表？
- 工厂烧录批准使用哪些工具？
- 发布版构建中会启用哪些日志？
- 实验室保留哪个恢复镜像？

## 下一步实用页面 { #practical-next-pages }

- [构建、烧录与监视](build-flash-monitor.md)
- [开发板配置](board-configuration.md)
- [组件与 `sf-pkg`](components.md)
- [示例](../../examples/index.md)——在改造子系统前，选择最接近且已确认可用的基线。
- [CodeKit](../../tools/codekit.md)——需要时可使用 VS Code 工作流，同时保持项目中的 SDK 开发板名称和构建记录一致。
- [SDK 应用笔记](sdk-application-notes.md)
- [分区表](../../firmware-topics/partition-tables.md)
- [调试与诊断](debugging-diagnostics.md)
