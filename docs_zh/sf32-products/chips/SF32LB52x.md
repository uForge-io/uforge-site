---
icon: lucide/microchip
description: "SF32LB52x：面向可穿戴与紧凑型 AIoT 产品的高性价比双核 Arm Cortex-M33 MCU 系列，涵盖电池供电的 SF32LB520/3/5/7 和外部供电的 52B/D/E/G/J。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x { #sf32lb52x }

## 概览 { #overview }

SF32LB52x 是思澈科技（SiFli）面向入门级智能可穿戴设备、紧凑型图形 HMI、蓝牙（Bluetooth）外设及其他空间受限 AIoT 产品推出的高性价比 MCU 系列，集成显示、音频、存储和无线连接能力。

平台采用 240 MHz Arm Cortex-M33 STAR-MC1[^1] 应用核心，并集成专用的 24 MHz 低功耗蓝牙控制核心。蓝牙连接和需要持续运行的任务由低功耗核心处理，使应用核心能够流畅运行图形界面和主应用栈。

选型时，可以先按思澈科技（SiFli）芯片型号指南列出的主要型号，区分两类供电方案：

- **SF32LB520/3/5/7**：锂离子电池供电变体，集成充电路径
- **52B/D/E/G/J**：外部稳压供电型号，其中 52B/E/G/J 面向 3.3 V 系统，**52D** 面向特殊 1.8 V 超低功耗系统

这几组型号不能在板级上直接互换。电池供电组与外部供电组之间并不引脚兼容；即使封装布局相近，1.8 V 的 52D 与 3.3 V 的 52B/E/G/J 也因供电条件不同而不能直接替换。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

## 应用场景 { #applications }

**SF32LB52x 适用于**以蓝牙为核心、且成本、集成度与电池续航是主要设计考量的产品，包括：

- 入门级智能手表和运动手环
- 蓝牙模组与无线适配器
- 蓝牙音频配件
- 智能传感器与可穿戴设备
- 电子货架标签与智能徽章
- 便携式标签打印机
- 电动自行车 / 电动滑板车显示屏
- 基于 LVGL 的基础 HMI 设备

## 开发资源 { #development-resources }

[产品简介（SF32LB520/3/5/7）]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5201-SF32LB52x-%E4%BA%A7%E5%93%81%E7%AE%80%E4%BB%8B.pdf
[数据手册（SF32LB520/3/5/7）]: https://downloads.sifli.com/docs/Datasheet/SF32LB52x/DS5201-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p5p5.pdf
[产品简介（SF32LB52X 外部供电家族）]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB52x/PB5202-SF32LB52X-%E4%BA%A7%E5%93%81%E7%AE%80%E4%BB%8B%20V0p1.pdf
[数据手册（SF32LB52X 外部供电家族）]: https://downloads.sifli.com/docs/Datasheet/SF32LB52X/DS5202-SF32LB52X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p6.pdf
[用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB52x/UM5201-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p8p8.pdf
[硬件设计指南(520/3/5/7)]: https://wiki.sifli.com/en/hardware/SF32LB520-3-5-7-HW-Application.html
[硬件设计指南(52B/D/E/G/J)]: https://wiki.sifli.com/en/hardware/SF32LB52B-E-G-J-HW-Application.html

<!--
[KiCad 文件]:
[原理图]:
-->

[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[产品简介（SF32LB520/3/5/7）]__
- :fontawesome-solid-file-pdf: __[数据手册（SF32LB520/3/5/7）]__
- :fontawesome-solid-file-pdf: __[产品简介（SF32LB52X 外部供电家族）]__
- :fontawesome-solid-file-pdf: __[数据手册（SF32LB52X 外部供电家族）]__
- :fontawesome-solid-file-pdf: __[用户手册]__
- :fontawesome-solid-file-lines: __[硬件设计指南(520/3/5/7)]__
- :fontawesome-solid-file-lines: __[硬件设计指南(52B/D/E/G/J)]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与存储 { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1 应用核心，最高 240 MHz，带 DSP 与 MPU
- 专用 Arm Cortex-M33 STAR-MC1 蓝牙控制核心，24 MHz
- 32 KB 指令缓存 + 16 KB 数据缓存
- 512 KB 应用 SRAM + 64 KB 蓝牙控制器 SRAM
- 合封存储随具体型号变化，可从 1 MB QSPI-NOR 到 16 MB OPI-PSRAM

### 图形与音频 { #graphics-and-audio }

- ePicasso 2.0 2D/2.5D 图形加速器
- eZip 2.0 无损图形解压硬件加速器
- 专用 LCD 控制器，支持 SPI/DSPI/QSPI（含墨水屏 SPI）以及 8080-8 bit
- 1 路 24 位音频 ADC，99 dB 信噪比
- 1 路 24 位音频 DAC，109 dB 信噪比

### 无线连接 { #wireless-connectivity }

- 双模蓝牙 5.3（经典蓝牙 + BLE）
- 最大发射功率：
    - BLE/BR 为 19 dBm
    - BT/EDR2 和 BT/EDR3 为 13 dBm
- 灵敏度：-100 dBm @ BLE/1 Mbps
- 专用 Arm Cortex-M33 STAR-MC1 蓝牙控制核心，64 KB SRAM @ 24 MHz
- 产品简介给出的睡眠电流为 2 μA；系统级待机电流还取决于工作模式和板级漏电

### 安全 { #security }

- AES/HASH/CRC 硬件加速器
- TRNG
- PSA Certified Level 1

### 外设与 I/O { #peripherals-and-ios }

- 3 路 UART
- 4 路 I2C
- 2 路 SPI
- 1 路 USB2.0 FS
- 1 路 I2S
- 1 路 PDM 接口（最多可连接 2 个数字麦克风）
- 1 路 SD3.0/SDIO3.0/eMMC
- 1 路 12 位通用 ADC
- 温度传感器
- RTC 与看门狗定时器
- 依据具体家族提供 44 或 45 路 GPIO

### 电源 { #power-supply }

- **电池供电组：SF32LB520/3/5/7** —— 由单节锂离子/锂聚合物电池直接供电，适用于采用集成充电路径的设计。

- **外部稳压供电 3.3 V 组：52B/E/G/J** —— 面向 3.3 V 稳压外部供电系统，组内型号彼此引脚兼容。

- **外部稳压供电 1.8 V 组：SF32LB52D** —— 面向特殊超低功耗 1.8 V 系统，不能与 3.3 V 组直接混用。

电池供电组与外部稳压供电组在芯片实现上相互独立，因此**不可引脚兼容**。

## 系列型号 { #family-variants }

对于思澈科技（SiFli）芯片型号指南列出的主要型号，可按以下方式选型：

- **SF32LB520/3/5/7**：锂电池直供组，组内引脚兼容（pin-to-pin）
- **52B/E/G/J**：3.3 V 外部稳压供电组，组内引脚兼容（pin-to-pin）
- **SF32LB52D**：特殊 1.8 V 外部稳压供电型号

若希望在不同供电组之间寻找最接近的合封存储对应关系，可参考：

- 520 ↔ 52B
- 523 ↔ 52E，52D 为其 1.8 V 对应型号
- 525 ↔ 52G
- 527 ↔ 52J

<div align="center"><em>SF32LB52x 主要型号</em></div>

<div align="center" markdown>

| SF32LB | 520U36 | 523UB6 | 525UC6 | 527UD6 | 52BU36 | 52BU56 | 52DUB6 | 52EUB6 | 52GUC6 | 52JUD6 |
|:-|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|
| 封装 | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L | QFN68L |
| 尺寸 | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm | 7 × 7 × 0.85 mm |
| 引脚间距 | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO 数量 | 44 | 44 | 44 | 44 | 45 | 45 | 45 | 45 | 45 | 45 |
| 合封存储 | 1 MB QSPI-NOR | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 1 MB QSPI-NOR | 4 MB QSPI-NOR | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM |
| 供电电压范围 | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 3.2–4.7 V | 2.97–3.63 V | 2.97–3.63 V | 1.71–1.98 V | 2.97–3.63 V | 2.97–3.63 V | 2.97–3.63 V |
| I/O 电压 | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 工作温度 | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C | -40 至 85°C |

</div>

本表依据思澈科技（SiFli）的[芯片型号指南](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)整理的是主要型号，并非完整的订购型号目录。当前链接的外部供电版数据手册还列有 **SF32LB52HUD6**（1.8 V、QFN68L、128 Mb PSRAM）；硬件设计指南中也使用了 `52AUx6` 和 `52D/F/HUx6` 等后缀写法。现有资料中的型号信息尚未统一，无法整理出一份完整且一致的对照表。设计定型前，任何此类 SKU 的订购状态、供电限制、合封存储接口和 I/O 规格都应以对应的最新版数据手册为准。

## 集成路径 { #integration-path }

使用以下顺序将 SF32LB52x 的初步选型推进为已验证的设计：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证所需外设和蓝牙行为。
2. **选择集成载体。** 如果产品适合使用已集成 RF 的模组，请评估 [SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md)；否则选择最接近的 [SF32LB52 开发板](../devkits/SF32LB52-DevKit-LCD.md)，用于早期固件和外设验证。
3. **进行硬件设计与评审。** 在发布原理图或布局前，使用本地[硬件设计指南](../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md)，包括其[原理图核对表](../../hardware/chip-guides/SF32LB52x_schematic_checklist.md)和 [PCB 布局核对表](../../hardware/chip-guides/SF32LB52x_pcb_layout_checklist.md)。确认正确的供电系列基线：520/3/5/7、52B/E/G/J 或 52D。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对适用的[数据手册](#development-resources)，以及思澈科技（SiFli）的 [520/3/5/7 硬件设计指南]或 [52B/D/E/G/J 硬件设计指南]。

## 相关产品 { #related-products }

### 模组 { #module }

[SF32LB52-MOD-1](../modules/SF32LB52-MOD-1.md) 集成 SF32LB525UC6 芯片及其 RF 匹配网络；标准配置下，芯片还合封 8 MB OPI-PSRAM。模组尺寸为 27.9 × 18.0 × 3.1 mm，适合希望采用 SF32LB52 级方案、同时减少芯片级 RF 布局与验证工作量的项目。

### 开发套件 { #development-kits }

- [SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md) 是面向 SF32LB52 模组生态的主力显示开发板，支持 QSPI 和 MCU/8080 LCD 连接。
- [SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md) 是面向 52B/52J 类外部供电设计的紧凑型核心板，适合快速完成固件、GPIO 与低功耗启动调试。
- [SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) 是 52 系列中尺寸最小的开发板，更接近体积受限产品的开发形态。
- [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) 更偏向低功耗与电池应用评估，适合做紧凑型方案实验。

### 参考产品 { #reference-products }

典型 SF32LB52 终端包括入门级智能手表、运动手环、蓝牙配件、紧凑型图形控制器、电子货架标签、智能徽章、便携式标签打印机，以及成本敏感的电动自行车 / 电动滑板车显示设备。

!!! note "自动生成内容"
    本页是在没有现成专用源文档的情况下编写的。依赖其中的技术结论前，请先对照思澈科技（SiFli）的官方文档核实。
