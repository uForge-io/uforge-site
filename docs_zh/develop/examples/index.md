---
icon: lucide/list-tree
description: "如何按开发板、框架和最难外设选择并改造 SiFli-SDK 或 Zephyr 示例，而不是从零构建 SF32 固件。"
tags:
    - 开发
    - 示例
---

# 示例 { #examples }

先从示例入手。SF32 固件通常在改造一个已经跑通、针对特定开发板的示例时进展更快，而不是从零搭建每个子系统。

合适的示例不一定是最小的示例。应优先选择已经包含产品中最难部分的示例，例如蓝牙（Bluetooth）应用规范（Profile）、显示面板、音频链路、文件系统、OTA、USB、电源模式或 AI 加速器。

## 示例领域 { #example-areas }

<div align="center"><em>表：示例领域</em></div>

<div align="center" markdown>

| 领域 | 建议起点 |
|:-----|:---------|
| 首次运行 | `example/get-started/hello_world/rtt/project` |
| LED 闪烁/GPIO | `example/get-started/blink/rtt` 或 GPIO HAL/RT-Device 示例。 |
| 蓝牙 | BLE、经典蓝牙、LE Audio、吞吐量、信标、OTA 和 Profile 示例。可从[蓝牙 SDK 示例](../../learn/bluetooth/bluetooth-sdk-examples.md)任务索引开始。 |
| 图形 | LVGL 演示、设计工具集成、控件、压缩资源、动画/媒体和面向具体显示屏的示例。可先查看按任务整理的[LVGL SDK 示例](../../learn/graphics/lvgl-sdk-examples.md)。 |
| 音频 | 播放、录音、PDM 采集、编解码器、Opus、MP3、混音，以及受支持情况下的 USB 音频。可先查看按任务整理的[音频 SDK 示例](../../learn/audio/audio-sdk-examples.md)。 |
| 低功耗 | PM 状态、GPIO、处理器、蓝牙、显示、UI 和可穿戴场景示例。可先查看按任务整理的[低功耗 SDK 示例](../../learn/low-power/low-power-sdk-examples.md)。 |
| 存储 | 文件系统、Flash、SD 和分区示例。 |
| USB | CherryUSB 设备端和主机端示例。 |
| AI | NNACC HAL 和 RT-Device 示例。 |

</div>

## 代表性 SDK 示例起点 { #representative-sdk-starting-points }

在确定示例领域后使用下表。所列路径具有代表性，可能随 SDK 版本变化；构建前应确认所选 SDK、目标开发板和配置。

<div align="center"><em>表：代表性 SF32 SDK 示例起点</em></div>

<div align="center" markdown>

| 开发目标 | 代表性 SDK 起点 | 首先需要验证的内容 | 后续阅读 |
|:---|:---|:---|:---|
| GPIO 输出或输入 | `example/hal/gpio`、`example/rt_device/gpio` | 真实开发板上的引脚复用、极性和中断行为。 | [入门教程](../../getting-started/tutorials/beginner.md) |
| 命令行和系统检查 | `example/system/finsh` | 串口控制台、日志和基本运行时检查。 | [入门教程](../../getting-started/tutorials/beginner.md) |
| ADC、PWM 或 RTC | `example/hal/adc`、`example/rt_device/pwm`、`example/rt_device/rtc` | 与具体开发板相关的引脚、时钟和外设配置。 | [入门教程](../../getting-started/tutorials/beginner.md) |
| I2C 传感器 | `example/hal/i2c/master`、`example/rt_device/i2c/eeprom` | 电气连接、总线地址和可靠的重复传输。 | [中级教程](../../getting-started/tutorials/intermediate.md) |
| LVGL 与本地显示屏 | `example/multimedia/lvgl/lvgl_v8_examples` | 在构建复杂页面前，先验证面板初始化、像素格式和稳定的屏幕刷新（flush）路径。 | [图形概览](../../learn/graphics/overview.md)、[显示控制器](../../learn/graphics/display-controller.md) |
| BLE 外设服务 | `example/ble/peripheral`、`example/ble/hrpc` | 广播、连接、一个 GATT 特征以及重连行为。 | [蓝牙概览](../../learn/bluetooth/overview.md) |
| 本地音频播放 | `example/multimedia/audio/local_music`、`mp3_sd_player` | 编解码器与开发板的音频链路、缓冲稳定性和播放结束后的资源释放。 | [音频概览](../../learn/audio/overview.md) |
| Flash 存储 | `example/storage/littlefs/nor`、`example/storage/flashdb` | 挂载、读写行为，以及复位或存储满后的恢复。 | [中级教程](../../getting-started/tutorials/intermediate.md) |
| 低功耗行为 | `example/pm/classical`、`example/pm/raise_wrist` | 已命名状态下的实测电流和正确的唤醒源行为。 | [低功耗概览](../../learn/low-power/overview.md) |
| BLE OTA | `example/ble/peripheral_with_ota` | 在目标硬件上处理更新中断后的恢复和回滚。 | [高级教程](../../getting-started/tutorials/advanced.md) |
| 运行时诊断 | `example/system/cpu_usage_profiler`、`example/system/coredump` | 在优化前获得可复现的 CPU 跟踪记录或崩溃转储。 | [高级教程](../../getting-started/tutorials/advanced.md) |

</div>

## 如何选择示例 { #how-to-choose-an-example }

按以下顺序选择：

1. 匹配开发板。
2. 匹配框架。
3. 匹配最难的外设。
4. 匹配中间件。
5. 匹配功耗或内存约束。

例如，蓝牙音频产品应从更接近目标的音频/蓝牙示例开始，而不是从最简的 `hello_world` 开始，即使后者更容易理解。

## 改造流程 { #adaptation-workflow }

1. 构建并烧录未经修改的示例。
2. 保存成功使用的构建命令、开发板名称、烧录命令、串口和日志。
3. 只进行一项产品改动。
4. 重新构建并测试。
5. 提交或记录该改动，再加入下一个子系统。

这套流程在第一个小时会慢一些，但在遇到第一个棘手故障之后会快得多。

## 应保留的验证证据 { #evidence-to-keep }

对于每个将成为产品开发基础的示例，记录：

- SDK 分支或软件包版本。
- 开发板名称或 FQBN。
- 必需的配置选项。
- 必需的引脚和外设。
- 预期串口输出。
- 已知限制。
- 可获得时记录内存占用。
- 恢复命令。

## 示例选择原则 { #example-selection-rule }

选择与产品中约束最强部分最匹配的示例：

- 蓝牙产品应从最贴近目标功能的蓝牙 Profile 示例开始。
- 带显示屏的产品从显示屏与 LVGL 的实现链路开始。
- 电池供电产品从低功耗示例开始。
- OTA 产品从升级流程和分区布局开始。

然后逐一加入其他子系统。

## 建议学习路径 { #suggested-learning-path }

如果你刚接触 SDK，应从[入门教程](../../getting-started/tutorials/beginner.md)开始；单个外设稳定后，再进入[中级教程](../../getting-started/tutorials/intermediate.md)。[高级教程](../../getting-started/tutorials/advanced.md)涵盖功耗实测、OTA、自定义显示屏的启动调试、故障分析、蓝牙多连接和自定义驱动。各专题概览会进一步解释这些示例背后的架构与取舍。
