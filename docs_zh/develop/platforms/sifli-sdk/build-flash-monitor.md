---
icon: lucide/terminal
description: "SiFli-SDK 的日常开发流程：激活环境、使用 scons 构建、通过 UART 下载脚本或 sftool 烧录，并查看串口输出。"
tags:
    - 开发
    - SiFli-SDK
---

# 构建、烧录与串口监控 { #build-flash-monitor }

本页概述 SiFli-SDK 的日常开发流程：激活环境、使用 `scons` 构建、向开发板烧录固件并查看串口输出。

## 激活 SDK { #activate-the-sdk }

请先按照当前 SDK 版本对应的[官方安装指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/quickstart/install/index.html)安装开发环境。构建前，每次打开新终端都要在 SDK 根目录执行导出脚本，激活该环境：

=== "macOS / Linux"

    ```bash
    cd ~/OpenSiFli/SiFli-SDK
    . ./export.sh
    ```

=== "Windows"

    ```powershell
    cd C:\OpenSiFli\SiFli-SDK
    .\export.ps1
    ```

导出脚本会在当前终端中加载与这份 SDK 工作副本对应的开发环境。安装和环境管理步骤可能因 SDK 版本而异，请以对应版本的官方安装指南为准。

## 构建 { #build }

在示例项目目录中运行：

```bash
scons --board=<board_name> -j8
```

根据主机性能设置合适的 `-j` 值。如果开发板名称未指定核心，SDK 默认以 HCPU 为目标编译。例如，`sf32lb52-lcd_n16r8` 会生成 `build_sf32lb52-lcd_n16r8_hcpu/`。请使用 SDK 最终确定的开发板与核心组合对应的输出目录；如果开发板标识符已经指定核心，不要再次追加 `_hcpu`。

## 清理后重新构建 { #clean-rebuilds }

切换开发板、修改重要配置或排查可疑构建产物时，建议执行清理后重新构建。在示例工程目录中使用 SCons 的清理选项：

```bash
scons -c
```

该命令会清理构建目标以及生成的临时文件和目标文件；随后请使用预期的开发板配置重新构建。

## 烧录 { #flash }

例如，针对 `sf32lb52-lcd_n16r8` 的 HCPU 目标，可使用构建生成的 UART 下载脚本：

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

OpenSiFli 还发布了开源命令行工具 [`sftool`](https://github.com/OpenSiFli/sftool)，可通过串口与思澈科技（SiFli）的 SoC 通信。其文档列出的操作包括写入、读取和擦除 Flash，以及控制芯片复位。支持的芯片、存储类型和具体命令选项，请以该工具的 README 为准。

## 查看串口输出 { #monitor }

使用已按当前开发板和示例配置好的串口终端。串口日志通常应包含启动输出、RT-Thread 启动信息、应用输出或 Shell 提示符。

请记录以下信息：

- 开发板名称
- 串口
- 波特率
- 构建命令
- 烧录命令
- SDK 分支或版本

## 日常开发流程 { #daily-developer-loop }

<div align="center"><em>表：日常开发流程</em></div>

<div align="center" markdown>

| 步骤 | 目标 |
|:-----|:-----|
| 激活 | 将 SDK 环境加载到当前终端。 |
| 配置 | 选择开发板和功能选项。 |
| 构建 | 生成适用于所选开发板的二进制文件。 |
| 烧录 | 将固件镜像烧录到开发板。 |
| 查看输出 | 确认启动过程和应用运行情况。 |
| 记录 | 保存命令和日志细节，保证可复现性。 |

</div>

## 从匹配的示例开始 { #start-from-a-matching-example }

在新建或大幅修改工程前，选择与开发板和关键子系统最匹配的 [SDK 示例](../../examples/index.md)。先用未修改的示例完成构建和烧录，并查看串口输出；随后将开发板名称、SDK 版本、命令和预期输出随改造后的工程一并记录。

如果使用 [CodeKit](../../tools/codekit.md)，仍应保留同样的验证记录，并确认编辑器中的操作能够通过 SDK 命令流程复现。

## 故障排查 { #troubleshooting }

<div align="center"><em>表：故障排查</em></div>

<div align="center" markdown>

| 现象 | 检查项 |
|:-----|:-------|
| 找不到构建工具 | 在当前终端中重新执行 `export.sh` / `export.ps1`。 |
| 无法识别开发板名称 | 查阅 SDK 的支持开发板文档。 |
| 下载脚本无法打开串口 | 关闭所有串口终端，并检查 USB 转 UART 数据线和接口。 |
| 烧录没有开始 | 按照开发板文档规定的下载流程操作。以 `sf32lb52-lcd_n16r8` 为例，先选择串口，再重启开发板，并在 2 秒内按 Enter 键开始下载；其他开发板应遵循各自的操作时序。同时检查供电、所选串口和 UART 连接。 |
| 串口输出乱码 | 检查波特率，并确认使用数据线连接开发板的 UART 接口，而非仅支持充电的 USB 线缆。 |

</div>

## 交接检查清单 { #handoff-checklist }

将项目交接给另一位开发者时，请一并提供：

- SDK 分支或 commit
- 开发板名称
- 安装/设置说明
- 构建命令
- 烧录命令
- 串口终端设置
- 启动时预期出现的首批日志行
- 恢复命令
