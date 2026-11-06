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
- assert/崩溃输出（如有，应保留日志中的文件/行号、首次故障 PC 和堆栈信息）
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
| [`sftool`](https://github.com/OpenSiFli/sftool) | 串口命令行工具，可对受支持的芯片和存储执行 Flash 读写、擦除及复位操作；具体选项取决于芯片和存储类型。 |
| [`SiFli_Trace`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/SifliTrace/SifliTrace_UM.html) | 按目标平台支持的流程采集并查看开发板日志。 |
| [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/UsartServer/UsartServer_UM.html) | 通过 UART 调试内置 Debug IP 时使用的配套工具。[v2.5.1 指南](https://docs.sifli.com/projects/sdk/v2.5.1/sf32lb52x/tools/UsartServer/UsartServer_UM.html)列出 SF32LB52X 和 SF32LB56X；较新的英文指南还提到 `SF322LB57`。请按目标芯片和 SDK 版本确认支持情况。 |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/tools/AssertDump/AssertDump_UM.html) 和[崩溃分析指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html) | 仅在对应芯片和 SDK 版本提供时使用，并遵循该版本的采集与分析流程。 |
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
| HCPU/LCPU 无日志 | 检查 UART 分配、`ulog`、pinmux 和 LCPU 启动状态。 |

</div>

在 SiFli Wiki 提到的 LB551 示例中，HCPU 使用 UART1，LCPU 使用 PB45/PB46 上的 UART3。请确认 HCPU 未同时占用 UART3，在 `pinmux.c` 中检查 QSPI3 与 UART1 复用脚冲突，并确认 LCPU 已启动；部分示例需发送 `lcpu on` 或调用 `lcpu_power_on()`。

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

## 官方资料 { #official-sources }

- [SiFli-SDK：调试与日志指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/debug_logging.html)
- [SiFli-SDK：崩溃分析指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb58x/app_note/crash_analysis.html)
- [OpenSiFli SiFli-Wiki：日志调试（中文）](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/log.md)
- [OpenSiFli SiFli-Wiki：Dump 内存恢复死机现场（中文）](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/faq/debug/dump.md)
