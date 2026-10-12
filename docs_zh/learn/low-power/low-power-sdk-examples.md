---
icon: lucide/battery-charging
title: "低功耗 SDK 示例"
description: "按睡眠、唤醒源、GPIO、CPU、蓝牙（Bluetooth）、显示、UI 和可穿戴场景选择合适的 SiFli-SDK 电源管理示例。"
tags:
  - 低功耗
  - 示例
---

# 低功耗 SDK 示例 { #low-power-sdk-examples }

SiFli-SDK 的电源管理示例可作为测量与集成验证的起点，但不代表所有产品都能达到的电流指标。每个示例都基于特定芯片系列、开发板、供电路径、已启用外设、固件配置和工作负载。先用示例在目标硬件上复现明确的状态或场景，再在相同条件下测量产品自身的电流和电压。

本文按照工程问题整理 [SiFli-SDK PM 示例索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html) 中的项目。开发板支持范围、供电连接、跳帽、SDK 设置、命令和预期行为，应以各示例官方页面为准。

## 从合适的功耗示例开始 { #start-with-the-right-power-example }

<div align="center"><em>表：按工程任务选择 SiFli-SDK PM 示例</em></div>

<div align="center" markdown>

| 工程目标 | 建议起点 | 示例可用于确认的内容 | 面向产品重新核对的内容 |
|:---------|:---------|:-----------------|:-------------------------|
| 验证基本电源管理（PM）状态进入与唤醒行为 | [PM 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html) | SDK 的基础电源管理配置和睡眠/唤醒流程 | 实际唤醒源、时钟依赖、保持状态，以及各驱动对 PM 状态的请求 |
| 表征低功耗下的 GPIO 活动 | [GPIO 功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gpio/README.html) | 定时器周期唤醒、GPIO 访问，以及唤醒、睡眠和 I/O 活动的差异 | 外部上拉/下拉、断电外设、引脚复用、电源轨和非预期漏电路径 |
| 区分计算工作与关机行为 | [处理器功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/coremark/README.html) | CPU 基准/循环工作负载、关机、RTC 唤醒和引脚唤醒 | 内核频率、工作负载、唤醒引脚极性、开发板专用唤醒映射和供电电压 |
| 测量蓝牙场景 | [BLE 广播与连接功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html) 或 [BLE/BT 功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) | 可重复的广播、连接和蓝牙活动场景 | 射频环境、发射功率、广播/连接间隔、对端行为、天线和应用回调 |
| 对比 AMOLED 灭屏和常亮策略 | [AMOLED 功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/AMOLED/README.html) | 显示刷新、灭屏睡眠和常亮屏的对比 | 实际面板、亮度、刷新策略、显示电源轨和实际使用占空比 |
| 测量 JDI 显示路径 | [JDI 功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html) | 文档所述 JDI 配置下的显示专用低功耗行为 | 面板型号、更新区域、控制器配置、电源轨和刷新频率 |
| 集成低功耗图形 UI | [GUI_PM 低功耗示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html) | UI 行为、显示状态和 PM 策略之间的关系 | 产品页面生命周期、动画、触摸或控制器唤醒源和脏区域策略 |
| 表征屏幕刷新工作负载 | [屏幕刷新场景功耗测试示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html) | 产品工作负载中显示刷新的贡献 | 分辨率、像素格式、变化区域、接口速率、缓冲策略和内容更新频率 |
| 构建传感器触发的可穿戴交互 | [抬腕亮屏示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/raise_wrist/README.html) | 传感器唤醒、亮屏工作和重新睡眠 | 传感器选择、手势算法、采样间隔、亮屏超时、电池模型和每日使用实测值 |

</div>

### 核对开发板范围 { #verify-the-board-scope }

下面分别列出示例官方说明页明确列出的开发板，以及当前 SiFli-SDK GCC 构建配置中的目标。构建矩阵包含某个目标，只表示项目配置了该构建目标，并不表示已在该开发板上测得文中功耗数据。下方配置链接对应当前 `main` 分支；如果你使用的是其他 SDK 版本，选择 `scons --board` 目标时应以该版本检出的 `build_config_gcc.yaml` 为准。复现功耗结果时，应遵循示例给出的硬件连接；不能仅凭文档 URL 中的芯片系列推断整个系列均受支持。各示例的官方指南链接见上表。

- **PM 示例**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/classical)）：指南列出 `sf32lb56-devkit-lcd_n16r12n1`、`eh-lb551`、`sf32lb52-lcd_n16r8` 和 `sf32lb58-lcd_n16r64n4`。当前 GCC 配置中的 PM 项目使用 `sf32lb56-lcd_n16r12n1`（标识不同于指南中的 `sf32lb56-devkit-lcd_n16r12n1`）以及 `eh-lb551`、`sf32lb52-lcd_n16r8`、`sf32lb58-lcd_n16r64n4`，并额外包含 `sf32lb52-core_n16r16`。不要未经核实就把不同名称视为同一目标。
- **GPIO 功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gpio)）：指南和当前 GCC 构建配置均列出 `sf32lb52-core_n16r16`。
- **处理器功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/coremark)）：指南列出 `eh-lb551`、`eh-lb555`、`ec-lb583`、`ec-lb587`、`eh-lb561`、`eh-lb563` 和 `eh-lb523`。当前 GCC 构建配置将该项目关联到 `default_boards` 集合；集合的当前构建目标标识见[构建配置](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)。指南中的开发板名称与 `default_boards` 中的构建目标并非一一对应；应根据你使用的 SDK 版本核实板卡映射，不要凭名称推断。构建目标范围也不代表指南中的功耗测量覆盖了集合中的每块开发板。
- **BLE 广播与连接功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/ble)）：指南列出的开发板标识为 `eh-lb551` 和 `eh-lb555`；当前 GCC 构建目标则为 `eh-lb551_hcpu` 和 `eh-lb555_hcpu`。
- **BLE/BT 功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/bt)）：指南列出 `ec-lb583`、`ec-lb587`、`eh-lb561`、`eh-lb563` 和 `eh-lb523`。当前 GCC 构建配置使用 `bt_boards` 集合；其精确构建目标见[构建配置](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)，其中部分目标带有 `_hcpu` 后缀。该项目的另一个独立配置条目还包含 `sf32lb56-wlan-core_a128r12n1` 和 `sf32lb56-wlan-core_n16r12n1`。指南中的开发板名称与构建目标标识并不等同，未经确认板卡映射前不要互换使用。
- **AMOLED 功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/AMOLED)）：指南和当前 GCC 构建配置均列出 `sf32lb52-core_n16r16`。
- **JDI 功耗测试**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/jdi)）：指南和当前 GCC 构建配置均列出 `sf32lb52-core_n16r16`。
- **GUI_PM 低功耗示例**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/gui_pm)）：指南和当前 GCC 构建配置均列出 `sf32lb52-lchspi-ulp`。
- **屏幕刷新场景功耗测试示例**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/lcd_refresh)）：指南给出的构建示例使用 `sf32lb52-core_n16r16`。当前 GCC 构建矩阵未列出此项目；但该示例及其指南仍然公开，不能据此认为示例已不可用。
- **抬腕亮屏示例**（[SDK 源码](https://github.com/OpenSiFli/SiFli-SDK/tree/main/example/pm/raise_wrist)）：指南和当前 GCC 构建配置均列出 `sf32lb52-lchspi-ulp`。

## 对齐电气测量边界 { #measure-at-the-right-electrical-boundary }

比较产品波形与 SDK 示例之前，应确认两次测量涵盖相同的供电范围，即电流测量包含同一组器件和电源轨。例如，GPIO 和抬腕亮屏示例都为低功耗测量给出了开发板专用的供电连接和跳帽调整。USB 供电、已连接的调试器、串口转换器、充电电路或显示模组，都可能明显改变结果。

每次测试都应记录：

1. 供电接入点，以及所有已供电的电源轨。
2. 供电电压、电流仪器的采样模式和量程。
3. 仍连接的外部设备、上拉/下拉电阻、线缆和调试接口。
4. 固件版本、开发板名称、`menuconfig` 配置和 PM 调试开关。
5. 波形中每一段对应的状态切换或工作负载。

应将电压与电流一起测量，使记录包含功率和能量，而不仅是电流。[功耗测量与验证](measurement-and-validation.md)详细说明了器件、场景和每日功耗模型的验证流程。

## 基础 PM、GPIO 和处理器测试 { #baseline-pm-gpio-and-processor-tests }

在加入产品工作负载之前，应先使用 [PM 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/classical/README.html)确认预期的睡眠状态和唤醒源是否有效。记录请求的 PM 状态，并核实系统实际进入的状态；若系统始终未进入请求的深度睡眠状态，应先核查配置，以及 PM 状态请求由哪个驱动或子系统管理，再考虑微调参数。

当某个接口看似没有活动却仍抬高待机电流时，**GPIO 功耗测试**是合适起点。其文档场景会周期性唤醒并读取 GPIO，因此有助于分离睡眠电流、唤醒电流和 I/O 活动电流。产品审查还必须更进一步：检查内部与外部上拉/下拉、高阻状态、跨电源域连接、连到已断电外设的引脚、复位默认状态，以及任何 ESD 或反向供电路径。逻辑状态正确的信号仍可能产生漏电。

**处理器功耗测试**区分了几种本质不同的条件：CPU 计算、简单循环工作负载、关机、定时器唤醒和引脚唤醒。它适合表征活动计算的代价和唤醒机制，但不能直接预测应用能耗。在将其数据纳入功耗预算之前，应以具有代表性的产品固件工作负载替代基准程序或循环。

## 蓝牙和显示场景 { #bluetooth-and-display-scenarios }

应使用专用的 [BLE 广播与连接](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/ble/README.html)、[BLE/BT](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/bt/README.html) 项目，先建立可重复的蓝牙无线场景，再在应用中优化连接参数。最终产品仍必须在自身的广播或连接设置、对端设备、射频环境、天线和回调行为下重新测量。若应用在每个无线事件中都唤醒主 CPU，即使链路层结果很好，实际产品的功耗也可能明显变差。

显示相关示例用于分别验证以下设计选择：

- **AMOLED 功耗测试**对比灭屏睡眠与常亮屏策略。该例程中的模式切换和续航估算仅适用于文档所述的开发板、面板、亮度、刷新时序和使用模型，不能直接套用到所有 AMOLED 产品。
- [JDI 功耗测试](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/jdi/README.html)为 JDI 显示路径提供了对应的平台专用基线。
- [GUI_PM 低功耗示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/gui_pm/README.html)将 UI 生命周期决策与 PM 行为联系起来。
- [屏幕刷新场景](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/pm/lcd_refresh/README.html)专注于显示更新本身的负载。

这些示例共同指向一个产品问题：哪些事件真的需要像素更新，以及每次需要更新面板的多大区域？可结合[图形概览](../graphics/overview.md)和[显示控制器](../graphics/display-controller.md)，将答案落实为缓冲区和局部刷新的策略。

## 将抬腕亮屏视为完整场景 { #raise-to-wake-as-a-complete-scenario }

**抬腕亮屏**项目特别有价值，因为它将传感器采样、手势识别、显示唤醒、有限的交互时长和再次睡眠组合在一个场景中。它验证的是一个产品场景，而不是孤立功耗状态。

SiFli-SDK 示例中的续航估算依赖文档中给出的电池容量、每日抬腕次数、亮屏时长、传感器、采样间隔、开发板和实测电流。改造时应保留其计算结构：测量亮屏状态，测量灭屏状态，说明每日事件次数，并计算组合后的每日能耗。随后必须用产品自身的数值更新模型，而不能直接沿用示例中的数值。

需要查看完整的建模和测量闭环时，请参阅[智能手表功耗建模与分析](smartwatch-power-profiling.md)。

## 用 PM 示例形成产品验证记录 { #adapt-a-pm-example-into-product-evidence }

<div align="center"><em>表：PM 示例产品化改造检查项</em></div>

<div align="center" markdown>

| 步骤 | 需要保留的证据 | 重要性 |
|:-----|:---------------|:-------|
| 建立原始基线 | 开发板、供电连接、跳帽、SDK 版本、配置和预期行为 | 区分例程原有行为与后续产品修改 |
| 定义一个场景 | 明确的 PM 状态、活动组件、唤醒源、时长和结束条件 | 避免得到没有工程含义的平均电流数字 |
| 测量电流和电压 | 波形标记，以及电流、电压、功率和能量 | 使结果可在不同电源轨和固件版本之间比较 |
| 加入产品硬件 | 更新后的外部器件、引脚状态、电源轨和传感器 | 暴露开发板上不存在的漏电和外设功耗 |
| 校准功耗模型 | 场景频率、时长和实测能量 | 让每日能耗估算逐步贴近产品实测结果 |

</div>

## 相关资源 { #related-resources }

- [低功耗概览](overview.md)：了解 PM 管理职责、功耗模式、系统级设计和功耗建模概念。
- [功耗测量与验证](measurement-and-validation.md)：了解器件、场景和产品功耗模型的验证流程。
- [智能手表功耗建模与分析](smartwatch-power-profiling.md)：查看每日使用功耗模型示例。
- [示例](../../develop/examples/index.md)：查看跨领域的 SDK 示例目录。
- [SiFli-SDK PM 示例索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/pm/index.html)：查看当前官方项目和具体配置方式。
