---
icon: lucide/wrench
description: "SF32 开发工具地图：sftool、SDK UART 下载脚本、CodeKit 操作，以及按用途分类的崩溃/追踪工具与资产/量产工具。"
tags:
    - 开发
    - 工具
---

# 工具 { #tools }

SF32 开发需要的不止编译器。实用的固件开发流程还会用到烧录、串口监视、崩溃分析、追踪采集、图像转换、射频/音频调试和量产烧录等工具。

下表按常见开发任务列出适用工具，是各工具手册的补充，而非替代。安装步骤、具体命令和工具专用流程请参考对应链接。

## 工具一览 { #tool-map }

<div align="center"><em>表：工具一览</em></div>

<div align="center" markdown>

| 工具 | 用途 |
|:-----|:-----|
| [`sftool`](https://github.com/OpenSiFli/sftool) | OpenSiFli Zephyr 和 Arduino 流程使用的跨平台 SF32 下载/烧录工具。 |
| [SDK UART 下载脚本](../platforms/sifli-sdk/build-flash-monitor.md) | SiFli-SDK 构建生成的首次烧录脚本。 |
| [CodeKit 操作](codekit.md) | 在 VS Code 中配置环境、构建、烧录和监视串口输出。 |
| [`AssertDump`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/AssertDump/AssertDump_UM.html) | 导出目标板崩溃时的内存数据，供后续分析。 |
| [`SiFli_Trace`](https://docs.sifli.com/projects/solution/6.tools/index.html) / [`UsartServer`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/UsartServer/UsartServer_UM.html) | 追踪/日志采集，以及通过 UART 和芯片 Debug IP 进行调试。 |
| [`Impeller`](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/tools/Impeller/Impeller_UM.html) | 面向产线的固件烧录、校准和 PCBA 测试。 |
| [eZip/图像工具](../../learn/graphics/ezip.md) | 压缩图形管线所需的资源转换。 |
| [射频/音频/工厂工具](https://docs.sifli.com/projects/solution/6.tools/index.html) | 量产校准、测试和调试流程。 |

</div>

## 烧录工具 { #flashing-tools }

首次启动调试建议使用 SDK 生成的 UART 脚本，因为它们由刚刚完成的构建直接生成。在以下场景中加入 `sftool`：

- 需要跨工作流保持一致的命令行烧录工具。
- 需要集成 Zephyr `west flash`。
- 需要支持 ArduinoCore-zephyr 上传行为。
- 需要在 CI、工厂或回归测试中实现自动化。

在团队确定统一标准前，应在项目中同时记录这两条路径。

## 日志和追踪工具 { #logging-and-trace-tools }

常规开发使用串口终端即可。遇到复杂故障时，应采集结构化日志和崩溃数据：

- 保存从复位开始的完整启动日志。
- 保存与已烧录镜像完全匹配的 ELF、map 和符号文件。
- 记录当时启用的是 RT-Thread Shell、Zephyr Shell 还是 Arduino 调试模式。
- 在条件允许时，使用思澈科技（SiFli）诊断工具分析断言转储并采集追踪数据。

## 资源和量产工具 { #asset-and-production-tools }

图形显示内容较多的产品应记录资源转换流程，尤其是在使用 eZip 压缩或硬件加速图形时。面向量产的产品还应将射频、音频和工厂测试工具的使用流程与开发者烧录工具分开记录，避免工厂操作人员依赖仅供开发阶段使用的命令。

## 工具选择检查表 { #tool-selection-checklist }

<div align="center"><em>表：工具选择检查表</em></div>

<div align="center" markdown>

| 需求 | 建议工具 |
|:-----|:---------|
| 首次 SDK 烧录 | SDK UART 下载脚本。 |
| 跨平台脚本化烧录 | `sftool`。 |
| VS Code 构建和监视 | CodeKit。 |
| 启动后崩溃 | 串口日志加断言转储工具。 |
| 长时间追踪采集 | 追踪/UART 服务器工具。 |
| 显示资源管线 | eZip/图像工具。 |
| 工厂烧录 | 思澈科技（SiFli）量产/工厂工具以及受控的操作流程。 |

</div>

## 实用建议 { #practical-advice }

- 增加第二条烧录路径前，先熟练掌握一条可靠路径。
- 为每块开发板保存确认正常的串口日志。
- 首次启动调试使用 SDK 生成的脚本。
- 需要在 Zephyr、Arduino 或自动化中实现可重复的命令行烧录时，使用 `sftool`。
- 在首次遇到难以复现的问题之前，就把崩溃分析工具加入工作流。
