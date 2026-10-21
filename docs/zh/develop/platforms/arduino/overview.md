---
icon: lucide/infinity
description: "面向 SF32LB52 DevKit LCD 的 ArduinoCore-zephyr：平台适用性、开发板标识、loader 与构建模式取舍、集成限制和问题定位路径。"
tags:
    - 开发
    - Arduino
---

# Arduino { #arduino }

[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr) 是面向 SF32 的 Zephyr Arduino Core。它适合在 **SiFli SF32LB52 DevKit LCD** 上编写 sketch、开展外设实验、制作演示和验证早期原型。

!!! warning "测试版核心"
    OpenSiFli 将此 Core 标记为 **BETA**。功能、API、软件包内容、loader 行为和发布版本均可能变化。将此路径用于产品前，请对照项目 README 和 Releases 确认当前行为。

首次安装 IDE、选择开发板和端口、烧录 Bootloader，以及验证 Blink，请参阅[Arduino 快速开始](../../../getting-started/arduino/getting-started-arduino.md)。本页用于评估 Arduino 是否适合项目，以及在完成首次运行后维护 Arduino 项目。

## Arduino 的适用范围 { #where-arduino-fits }

当快速迭代和熟悉的 sketch 模型比完整访问 SF32 专有能力更重要时，可选择 Arduino。它适合概念验证、简单外设检查、课堂或演示项目，以及已有 Arduino 代码库的团队。

若产品依赖量产固件基线、蓝牙（Bluetooth）协议栈调优、图形密集型应用、低功耗优化、开发板启动调试或厂商中间件，请转用 [SiFli-SDK](../sifli-sdk/overview.md)。若需要直接控制设备树（devicetree）、Kconfig 和 Zephyr 原生应用结构，请使用 [Zephyr](../zephyr/overview.md)。

<div align="center"><em>表：Arduino 平台适用性</em></div>

<div align="center" markdown>

| 适合选择 Arduino 的场景 | 更适合其他路径的场景 |
|:-------------------------|:---------------------|
| 短小 sketch 和快速外设实验。 | 对广泛且经过验证的 SF32 功能有要求的产品。 |
| 已熟悉 Arduino IDE 或 Arduino CLI 的团队。 | 自定义开发板的硬件启动调试，或需要深入控制 Flash、电源和中间件。 |
| 演示和早期可行性原型。 | 需要 Zephyr 原生配置、驱动和 RTOS 结构。 |

</div>

## 开发板标识 { #board-identity }

当前公开软件包面向 SF32LB52 DevKit LCD。请在项目记录和问题报告中保存以下值；它们决定 sketch 的构建、加载和开发板映射方式。

<div align="center"><em>表：Arduino 开发板标识</em></div>

<div align="center" markdown>

| 项目 | 数值 |
|:-----|:-----|
| Boards Manager 标题 | **SiFli Serial Boards** |
| Arduino 平台 | `sifli:sf32lb52` |
| 开发板 | **SiFli SF32LB52 DevKit LCD** |
| FQBN | `sifli:sf32lb52:sf32lb52devkitlcd` |
| Zephyr target | `sf32lb52_devkit_lcd` |
| 变体 | `sf32lb52_devkit_lcd_sf32lb525uc6` |
| 上传工具 | `sftool` |
| `LED_BUILTIN` | `13` |

</div>

名称相近的思澈科技（SiFli）或 Zephyr 开发板标识，不能与此 FQBN 互换使用。所选开发板决定构建和上传参数。

## 构建与 Loader 模型 { #build-and-loader-model }

ArduinoCore-zephyr 将面向 sketch 的 Arduino API、Zephyr 加载器（loader）和开发板专用配置组合在一起。构建模式和链接模式这两组设置会影响启动和链接行为，而不只是编译器选项。

<div align="center"><em>表：构建与 loader 选项</em></div>

<div align="center" markdown>

| 选项 | 行为 | 工程含义 |
|:-----|:-----|:---------|
| `Standard` 构建模式 | 加载后启动 sketch。 | 用于正常运行 sketch。 |
| `Debug` 构建模式 | Zephyr shell 停留等待 `sketch` 命令。 | 仅在调试流程需要 shell 时使用。 |
| `Dynamic` 链接模式 | 将 sketch 打包，走常规的基于加载器的流程。 | 运行时和内存预算中需要计入加载器。 |
| `Static` 链接模式 | 使用静态链接镜像。 | 用于排查加载器问题，或在充分了解其权衡后使用。 |

</div>

建议从 **Standard** 和 **Dynamic** 开始。在 Debug 模式下，上传后的 sketch 要等到在 Zephyr shell 中运行 `sketch` 才会启动；这是“上传看似成功、应用却毫无动作”的常见原因。

加载器是独立的开发板产物。Burn Bootloader 通常只用于首次使用、更新或恢复，而不是每次上传 sketch 的步骤。请将 Arduino 软件包版本与加载器的任何更新一并记录；前提假设不一致，后续很难定位问题。

## 集成边界 { #integration-boundaries }

应将 Arduino Core 视为集成层，而不是底层 Zephyr 平台的替代品。sketch 可能需要 loader 尚未导出或启用的 Zephyr 符号或子系统，常见现象包括 Zephyr 符号未定义、子系统缺失，以及动态加载和 shell 带来的内存压力。

在向产品原型加入库或功能前，应逐项明确：

- 软件包版本、FQBN、构建模式和链接模式。
- 目标开发板修订版及其串口下载/恢复流程。
- 所需外设或库的已验证示例。
- 采用目标加载器配置后的 RAM 与 Flash 预算，并通过测量加以确认。
- 使用 Arduino 加载器或 SiFli-SDK 固件恢复的路径。

不要只因存在 Arduino API 或名称相近的 Zephyr 驱动就推断库已受支持。请在目标硬件上验证完整的 sketch、loader、开发板和软件包组合。

## 定位与升级 { #diagnose-and-escalate }

若开发板未被识别、无法烧录或无法运行 Blink，请先完成快速开始中的基线检查。该基线跑通后，可按下表划分问题边界，缩短调试时间。

<div align="center"><em>表：Arduino 问题归属</em></div>

<div align="center" markdown>

| 首次运行基线成功后出现的现象 | 首先检查 |
|:-------------------------------|:---------|
| sketch 仅在运行 `sketch` 后启动 | 确认是否有意选择 Debug 模式。 |
| 缺少 Zephyr 函数或子系统 | 检查 Core README，以及加载器的导出项和配置。 |
| 内存失败或运行不稳定 | 测量 sketch 预算；计入动态加载和 Zephyr shell；只有具备恢复方案时才评估 Static。 |
| 库能编译但硬件不工作 | 确认开发板引脚假设，并用最小的开发板专用示例测试。 |
| 上传或恢复失败 | 重新建立文档化的 Arduino 基线；必要时使用开发板的 SiFli-SDK 恢复路径。 |

</div>

提交问题时，请提供软件包版本、IDE 或 CLI 版本、操作系统、FQBN、构建模式、链接模式、开发板修订版、完整上传输出和串口日志。

## 相关页面 { #related-pages }

- [Arduino 快速开始](../../../getting-started/arduino/getting-started-arduino.md)
- [Zephyr](../zephyr/overview.md)
- [SiFli-SDK](../sifli-sdk/overview.md)
- [SF32LB52 DevKit LCD](../../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)
