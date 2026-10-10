---
icon: lucide/notebook-tabs
title: "SDK 应用笔记"
description: "按工程任务组织的 SiFli-SDK 使用指南阅读路径，帮助 SF32 开发者更快找到可验证的资料。"
tags:
    - 开发
    - SiFli-SDK
    - 应用笔记
---

# SDK 应用笔记 { #sdk-application-notes }

本页按工程任务整理 SiFli-SDK 使用指南，帮助你快速找到对应的操作说明，并了解项目中应保留哪些验证记录。

这些文章侧重实践与集成，不能替代 SDK 手册。使用具体配置、API、示例或测试流程前，请先在官方 [SiFli-SDK 使用指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/app_note/index.html)中选择目标芯片系列和 SDK 版本。

## 按任务阅读 { #read-by-task }

<div align="center"><em>表：SDK 应用笔记阅读路径</em></div>

<div align="center" markdown>

| 任务 | 适用场景 | 对应的官方使用指南主题 |
|:-----|:---------|:---------------------------|
| [使用 GPADC 采样](application-notes/adc-sampling.md) | 建立通用 ADC 测量路径。 | ADC 使用指南（GPADC） |
| [集成并读取传感器](application-notes/sensor-integration.md) | 连接并验证外部传感器。 | 添加传感器指南 |
| [使用外部 Flash](application-notes/external-flash.md) | 在 Flash 中存储数据、资源或文件系统。 | Flash 使用指南 |
| [配置看门狗](application-notes/watchdog.md) | 验证看门狗恢复路径。 | 看门狗使用指南 |
| [使用 EZIP 压缩图形资源](application-notes/ezip-image-assets.md) | 转换并集成 EZIP 图像资源。 | EZIP 图像转换工具使用指南 |
| [配置并测量低功耗](application-notes/low-power-measurement.md) | 配置目标低功耗状态并对比测量结果。 | 低功耗开发指南 |
| [捕获日志并分析崩溃](application-notes/crash-analysis.md) | 保留相互对应的日志、崩溃现场信息和符号文件。 | 崩溃分析指南；调试与日志 |
| [运行 SiFli-SDK 射频测试](application-notes/rf-performance-tests.md) | 选择信令、非信令或单项射频验证路径。 | SiFli SDK 射频测试指南 |
| [执行蓝牙（Bluetooth）信令测试](application-notes/bluetooth-signalling-tests.md) | 执行基于协议的蓝牙验证。 | 蓝牙信令测试指南 |
| [运行蓝牙单项射频测试](application-notes/bluetooth-single-tone-tests.md) | 按官方流程逐项执行蓝牙射频测试。 | 蓝牙单项射频测试指南 |

</div>

## 使用方式 { #how-to-use-these-articles }

1. 从标题与当前工程任务相符的页面开始。
2. 改造示例或执行命令前，先确认项目、开发板、SDK 版本、配置和硬件等前置条件均已满足。
3. 查看文中链接的 SDK 资料，核对具体路径、配置符号、命令、API 和工具版本。
4. 将已验证的开发板、SDK 版本、配置文件、测试设备和实测结果作为项目验证证据留存。

跨平台的架构决策请查阅[固件主题](../../firmware-topics/index.md)；需要在 SDK 与社区路径之间比较可用示例时，请查阅[示例](../../examples/index.md)。
