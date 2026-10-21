---
icon: lucide/bug
description: "使用 sftool、AssertDump、SiFli_Trace 与 RT-Thread Shell 调试 SF32 固件，包含可复现的排查顺序与崩溃报告检查清单。"
tags:
    - 开发
    - 调试
---

# 调试与诊断 { #debugging-and-diagnostics }

SF32 调试应从串口日志入手。根据芯片、SDK 版本和工程配置，项目还可能提供崩溃转储工具、跟踪采集和 RT-Thread Shell；只使用目标平台文档明确支持的流程。

## 初步排查 { #first-line-debugging }

先通过串口控制台收集：

- 启动日志
- 应用输出
- RT-Thread Shell 输出（如工程已启用）
- 异常信息
- 下载与复位行为

保存日志时，应一并记录开发板硬件版本、SDK 分支、构建命令、烧录命令和串口设置。

## 调试顺序 { #debugging-order }

1. 先在同一份固件上复现问题。
2. 再在复位后复现。
3. 完整重刷固件后再复现。
4. 再用最接近的 SDK 示例复现。
5. 最后把产品改动一项一项加回去。

这样可以避免硬件、开发板支持、中间件和应用层问题相互混杂，便于逐层定位。

## 常用调试工具 { #tools-to-know }

<div align="center"><em>表：常用调试工具</em></div>

<div align="center" markdown>

| 工具 | 用途 |
|:-----|:-----|
| `sftool` | 串口命令行工具，可对受支持的芯片和存储执行 Flash 读写、擦除及复位操作；具体选项取决于芯片和存储类型。 |
| `SiFli_Trace` | 按目标平台支持的流程采集并查看开发板日志。 |
| `UsartServer` | SF32LB52X 和 SF32LB56X 通过 UART 调试内置 Debug IP 时所需的配套工具；不要假定其他目标也适用。 |
| `AssertDump` 和崩溃转储工具 | 仅在对应芯片和 SDK 版本提供时使用，并遵循该版本的采集与分析流程。 |
| RT-Thread Shell | 仅当工程配置启用了 Shell 时，才可用于运行时检查和执行命令。 |

</div>

## 首先该检查什么 { #what-to-inspect-first }

<div align="center"><em>表：首先检查什么</em></div>

<div align="center" markdown>

| 现象 | 第一批检查项 |
|:-----|:-------------|
| 硬故障（Hard fault）或断言（assert） | 栈大小、空指针、DMA 缓冲区、缓存维护。 |
| 外设无响应 | 引脚复用、时钟、电源轨、开发板名称和驱动是否已启用。 |
| 蓝牙（Bluetooth）不稳定 | RF 时钟、天线路径、蓝牙协议栈配置、连接参数。 |
| 显示异常 | 面板时序、缓冲格式、缓存/DMA 同步。 |
| 随机复位 | 看门狗（watchdog）、电源轨、欠压（brownout）、栈溢出。 |

</div>

## 崩溃报告检查清单 { #crash-report-checklist }

报告崩溃问题时，请提供：

- 开发板型号和硬件版本
- 芯片型号
- SDK 分支或 commit
- 具体示例或项目名称
- 构建命令和开发板名称
- 烧录命令
- 从复位开始的串口启动日志
- 崩溃转储或 assert 输出
- 该问题是否能在未经修改的 SDK 示例上复现
