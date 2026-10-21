---
icon: lucide/braces
description: "MicroPython 尚无经过验证的 SF32 入门流程；可先按 SiFli-SDK 流程完成可复现的首次启动调试，并在 MicroPython 状态页了解支持进展。"
tags:
    - 快速开始
    - MicroPython
---

# MicroPython { #micropython }

MicroPython 目前还没有经过验证的 SF32 入门流程。在已查阅的思澈科技（SiFli）和 OpenSiFli 资料中，均未记载面向特定开发板的官方固件镜像、烧录流程或 REPL 配置。

请先按 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) 流程确认开发板和连接线，识别串口并完成固件烧录，建立可复现的基线环境。不要照搬通用 MicroPython 安装说明，也不要使用为其他 MCU 或开发板准备的镜像。

[MicroPython 状态](../../develop/platforms/micropython/status.md)页面列出了本页转为可操作教程前仍需公开的产物和验收条件。

!!! warning "尚无经过验证的 MicroPython 教程"
    要形成可用的 SF32 MicroPython 指南，还需提供与开发板及其内存配置准确匹配的固件镜像、烧录与恢复命令、REPL 端口和波特率、文件系统行为，以及如实反映实际支持范围的外设支持矩阵。在这些资料公开前，本页暂不提供安装步骤。

## 经过验证的教程需要具备哪些信息 { #what-sifli-should-publish }

在使用未来的 SF32 MicroPython 教程前，请确认其中列明兼容的开发板专用固件镜像、经过测试的烧录与恢复命令、REPL 端口和波特率、文件系统行为，以及持续维护的外设支持矩阵。在[状态页](../../develop/platforms/micropython/status.md)公布这些信息前，请使用上文所述的 SiFli-SDK 路径完成首次启动调试。
