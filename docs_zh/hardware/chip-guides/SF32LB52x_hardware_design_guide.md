---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB52x 硬件设计指南：电源架构、时钟与 RF 设计、显示与存储接口及 PCB 布局指导。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x 硬件设计指南 { #sf32lb52x-hardware-design-guide }

## 1. 简介 { #1-introduction }

本硬件设计指南面向基于 SF32LB52x 系列超低功耗 AIoT 微控制器的产品开发，提供设计建议和有来源依据的参考资料。本文面向硬件工程师、PCB 设计人员，以及开发电池供电可穿戴设备和其他紧凑型嵌入式系统的产品开发人员。

本指南覆盖完整的硬件开发流程，包括电源设计、时钟电路、RF 布局、显示与存储接口、音频电路、PCB 设计规则和量产注意事项。按本文建议完成设计和评审，有助于降低开发风险、提升系统可靠性并缩短产品开发周期。

本文档假定读者已具备嵌入式硬件设计和原理图绘制基础。本指南是 SF32LB52x 数据手册、参考手册和 SDK 文档的配套资料；详细电气规格、外设行为和软件开发细节仍以官方数据手册、参考手册和 SDK 文档为准。

本指南将思澈科技（SiFli）针对 SF32LB520/3/5/7 电池供电路径和 52B/D/E/G/J 外部稳压供电路径的两份原始硬件应用说明整合为一套统一的工程设计流程。对于原始资料中表述不一致的地方，本文优先采用准确的可订购型号、明确的电源域行为，以及便于发布前评审的表述。

## 2. 开发资源 { #2-development-resources }

[SF32LB52x 产品简介]: https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf
[SF32LB52x 数据手册]: https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf
[SF32LB52x 参考手册]: https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf
[SF32LB52x 硬件设计指南（520/3/5/7）]: https://wiki.sifli.com/hardware/SF32LB520-3-5-7-HW-Application.html
[SF32LB52x 硬件设计指南（52B/D/E/G/J）]: https://wiki.sifli.com/hardware/SF32LB52B-E-G-J-HW-Application.html
[SF32LB52-MOD-1]: ../../sf32-products/modules/SF32LB52-MOD-1.md
[KiCad 文件]: https://github.com/OpenSiFli/kicad-libraries
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/
[思澈科技（SiFli）合格供应商名录]: ../cad-components/sifli-approved-vendor-list.md
[思澈科技（SiFli）合格供应商名录（AVL）]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x 产品简介]__
- :fontawesome-solid-file-pdf: __[SF32LB52x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB52x 参考手册]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南（520/3/5/7）]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南（52B/D/E/G/J）]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__
- :fontawesome-brands-github: __[KiCad 文件]__
- :fontawesome-solid-sim-card: __[SF32LB52-MOD-1]__

</div>

## 3. 芯片概览 { #3-device-overview }

SF32LB52x 系列在紧凑的 QFN68 封装中集成双核 STAR-MC1 处理器、蓝牙（Bluetooth）连接、图形加速、音频、显示接口、存储控制器和电源管理。该系列适用于 BOM 成本、电池续航和 PCB 面积都较敏感的紧凑型产品。

### 3.1. 主要特性 { #31-features }

该系列集成以下主要功能：

- 双核 Arm China STAR-MC1 处理器，兼容 Arm Cortex-M33，并配有 FPU 和 MPU
- 双模蓝牙 5.3 射频
- ePicasso 2.0 2D/2.5D 图形加速器
- 支持 SPI、QSPI、8080、JDI 和 8-bit EPD 的显示控制器
- USB 2.0 全速设备
- 在支持该功能的型号上提供 SDIO/eMMC 存储接口
- 模拟和数字音频接口
- 集成 PMU、DC/DC 转换器和 LDO 稳压器
- QFN68 封装，最多 44/45 个 GPIO

### 3.2. 型号分组 { #32-variants }

从硬件设计角度看，SF32LB52x 系列可按电源架构分为两个设计分组：电池供电型号和外部稳压供电型号。

=== "SF32LB520/3/5/7（电池供电）"

    该分组集成片内**充电管理模块和 PMU**，可直接连接单节锂电池，也可配合外部充电方案使用。

    <div align="center"><em>表 3.2-1：型号对照表（电池供电型号）</em></div>

    <div align="center" markdown>

    | 型号 | 合封存储器 | 供电方式 | 设计说明 |
    |:---|:---|:---|:---|
    | SF32LB520U36 | 1 MB QSPI-NOR Flash | 锂电池，3.2–4.7 V，可充电 | 默认从合封 Flash 启动；`VDD18_VOUT` 需要外部 3.3 V 供电 |
    | SF32LB523UB6 | 4 MB OPI-PSRAM | 锂电池，3.2–4.7 V，可充电 | 必须从外部存储启动 |
    | SF32LB525UC6 | 8 MB OPI-PSRAM | 锂电池，3.2–4.7 V，可充电 | 必须从外部存储启动 |
    | SF32LB527UD6 | 16 MB OPI-PSRAM | 锂电池，3.2–4.7 V，可充电 | 必须从外部存储启动 |

    </div>

=== "52B/D/E/G/J（外部稳压供电）"

    该分组集成片内 **PMU**，但不包含充电电路，需要由外部稳压电源供电。

    <div align="center"><em>表 3.2-2：型号对照表（外部稳压供电型号）</em></div>

    <div align="center" markdown>

    | 型号 | 合封存储器 | 供电方式 | 设计说明 |
    |:---|:---|:---|:---|
    | SF32LB52BU36 | 1 MB QSPI-NOR Flash | 2.97–3.63 V，不可充电 | `VDD_SIP` 需要外部 1.8 V 或 3.3 V 供电 |
    | SF32LB52BU56 | 4 MB QSPI-NOR Flash | 2.97–3.63 V，不可充电 | `VDD_SIP` 需要外部 3.3 V 供电 |
    | SF32LB52DUB6 | 4 MB OPI-PSRAM | 1.71–1.98 V，不可充电 | `VDD_SIP` 需要外部 1.8 V 供电 |
    | SF32LB52EUB6 | 4 MB OPI-PSRAM | 2.97–3.63 V，不可充电 | `VDD_SIP` 可由内部 LDO 供电 |
    | SF32LB52GUC6 | 8 MB OPI-PSRAM | 2.97–3.63 V，不可充电 | `VDD_SIP` 可由内部 LDO 供电 |
    | SF32LB52JUD6 | 16 MB OPI-PSRAM | 2.97–3.63 V，不可充电 | `VDD_SIP` 可由内部 LDO 供电 |

    </div>

### 3.3. 封装 { #33-packages }

两个设计分组均使用相同的 QFN68 封装。

<div align="center"><em>表 3.3-1：封装信息</em></div>

<div align="center" markdown>

| 封装名称 | 尺寸 | 管脚间距 |
|:---|:---|:---|
| QFN68L | 7 mm x 7 mm x 0.85 mm | 0.35 mm |

</div>

两个设计分组的外设资源略有差异。电池供电型号提供 44 个 GPIO，外部稳压供电型号提供 45 个 GPIO；差异主要来自电池供电型号中保留给充电功能的管脚。

- 44/45 个 GPIO
- 3 路 UART
- 4 路 I2C
- 2 路 GPTIM
- 2 路 SPI
- 1 路 I2S 音频接口
- 1 路 SDIO 存储接口
- 1 路 PDM 音频接口
- 1 路差分模拟音频输出
- 1 路单端模拟音频输入
- 单线/双线/四线 SPI 显示接口、串行 JDI 显示接口
- 支持带 GRAM 和不带 GRAM 的显示屏
- 支持 UART 下载和软件调试

管脚布局如下。两个分组的差异将在原理图设计章节中进一步说明。

![图 3.3-1：SF32LB520/3/5/7 QFN68L 管脚布局](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-1：SF32LB520/3/5/7 QFN68L 管脚布局</em></div>

![图 3.3-2：SF32LB52B/E/G/J QFN68L 管脚布局](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-2：SF32LB52B/E/G/J QFN68L 管脚布局</em></div>

### 3.4. 应用场景 { #34-applications }

典型应用包括对长续航和紧凑尺寸有要求的便携式嵌入式系统：

- 入门级智能手表和运动手环
- 蓝牙模组和无线适配器
- 蓝牙音频配件
- 智能传感器和可穿戴设备
- 电子价签和智能胸牌
- 电子书阅读器
- 便携式标签打印机
- 电动自行车和电动滑板车显示屏
- 联网人机界面 (HMI) 设备
- 便携式工业和医疗设备
- 其他电池供电 AIoT 设备

## 4. 设计总览 { #4-design-at-a-glance }

### 4.1. 硬件架构 { #41-hardware-architecture }

下表汇总了典型 SF32LB52x 应用的推荐硬件架构，可作为阅读后续详细设计章节前的快速参考。

<div align="center"><em>表 4.1-1：设计总览</em></div>

<div align="center" markdown>

| 硬件功能块 | 典型实现方式 |
|:---|:---|
| 封装 | QFN68L，7 mm x 7 mm x 0.85 mm，0.35 mm 管脚间距 |
| PCB | 推荐 4 层 PTH PCB |
| 电源 | 根据具体型号选择单节锂离子/锂聚合物电池或外部稳压供电 |
| 电池充电 | 支持充电的型号可使用片内充电模块，也可外接带电源路径管理（PPM）或不带该功能的充电 IC |
| Buck 电感 | 4.7 μH +/-20%，DCR <= 0.4 Ω，Isat >= 450 mA |
| 晶体 | 48 MHz 主晶体和 32.768 kHz RTC 晶体 |
| RF | 50 Ω 阻抗受控走线，预留 π 型匹配网络 |
| 显示 | 3 线 SPI、4 线 SPI、Dual-SPI、Quad-SPI（最高 512 x 512）、JDI 和 8-bit EPD |
| 触摸 | I2C 电容触摸控制器，支持中断唤醒 |
| 存储 | 根据具体型号使用 SiP Flash/PSRAM、外部 SPI NOR、SPI NAND、SD NAND 或 eMMC |
| 音频 | 模拟麦克风输入、差分 DAC 输出、外部 PA |
| 传感器 | I2C/SPI 传感器，例如加速度计、陀螺仪、地磁传感器、心率传感器、血氧饱和度（SpO2）传感器和心电图（ECG）传感器 |
| 触觉反馈 | PWM 控制振动马达 |
| 调试 | PA18/PA19 上的 DBG_UART，与 SWD 复用 |

</div>

### 4.2. 硬件设计流程 { #42-hardware-design-flow }

建议按照硬件决策逐步固化的顺序使用本指南。下面的流程有助于避免早期架构选择被后续原理图和 PCB 细节掩盖。

<div align="center"><em>表 4.2-1：硬件设计流程</em></div>

<div align="center" markdown>

| 步骤 | 设计决策 | 主要章节 |
|:---|:---|:---|
| 1 | 选择准确的可订购型号和供电分组 | 芯片概览、型号分组 |
| 2 | 确认封装、GPIO 数量和固定功能管脚 | 封装、原理图设计指导 |
| 3 | 固化最小系统：电源树、启动存储、启动配置管脚、调试访问、时钟和唤醒策略 | 最小系统设计、存储、调试、时钟生成 |
| 4 | 选择 RF 拓扑、显示、音频、传感器及其他产品接口 | 时钟生成、RF、用户接口、存储与连接 |
| 5 | 评审 PCB 叠层、扇出、阻抗和敏感走线 | PCB 布局指导 |
| 6 | 对照原始资料中的参考原理图、PCB 布局、机械图和电源图 | 附录 A-E |
| 7 | 预留启动调试、调试、校准和量产测试所需的接口 | 调试、量产、设计评审检查表 |

</div>

**设计决策树**

- 需要 USB 可充电单节电池系统？优先选择 `SF32LB520/3/5/7`。
- 需要外部稳压供电或 eMMC 启动？优先选择 `52B/D/E/G/J`。
- 需要 8-bit 并行 EPD？除非思澈科技（SiFli）针对具体设计确认电池供电路径可行，否则优先采用外部稳压供电设计路径。
- 需要最低待机电流？在 PCB 摆放前确定存储电源开关、传感器负载开关和显示电源隔离方案。

### 4.3. 如何使用本指南 { #43-how-to-use-this-guide }

开始原理图设计前，应先确认准确的可订购型号。SF32LB52x 系列分为两个设计分组：电池供电的 `SF32LB520/3/5/7` 和外部稳压供电的 `52B/D/E/G/J`。使用第 3.2 节选择分组，使用第 5.1 节和第 5.2 节完成最小系统与电源系统评审，使用第 5.6.1 节和第 5.7.1 节确认启动存储与调试访问，使用第 5 节和第 6 节评审原理图与 PCB 设计，使用附录 A-E 对照源参考图，使用第 7 节作为发布检查表。

如果设计复用了较早的 SF32LB52x 原理图，请优先检查供电管脚、SiP 存储器供电、启动存储器供电、DBG_UART/SWD 管脚、晶体负载、RF 匹配网络的预留焊盘和量产测试点。这些项目是启动调试中最常见、也容易被忽视的风险来源。

### 4.4. 评审证据包 { #44-review-evidence-pack }

硬件发布前，应归档原理图 PDF、PCB 叠层、阻抗报告、元器件 AVL 核对、DRC 报告，以及 RF、晶体、USB、SDIO/eMMC、音频、电源和启动存储布局截图。将这些证据与板卡版本一起保存，便于后续固件、RF 和量产问题追溯到已评审的硬件基线。

## 5. 使用核对表 { #using-the-checklists }

本指南包含两级核对表。散布在第 5.1.1.5、5.5.3 和 7 节中的简短核对项，用于设计阶段的快速工程自检，只覆盖高风险项目。[原理图核对表](SF32LB52x_schematic_checklist.md)（第 5.8 节）和 [PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)（第 6.15 节）则完整逐项复现了思澈科技（SiFli）的 [*SF32LB52 Schematic & PCB Checklist*][思澈科技（SiFli）SF32LB52 原理图与 PCB 核对表（XLSX）]（V1.0，2026-01-21），该文件与硬件设计指南一同发布于[思澈科技（SiFli）Wiki][思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]，覆盖 SF32LB520/3/5/7 电池供电型号与 SF32LB52B/D/E/G/J 外部供电型号。

两份核对表中的每个检查项都标明其适用的 SF32LB52x 变体，以及是“必检”（发布前必须通过）还是“可选”（使用相关功能时建议执行）。“全部型号”默认指 SF32LB520/3/5/7 与 SF32LB52B/D/E/G/J，除非条目中进一步限定。带颜色的文字以及带有<span class="flag-red flag-yellow">黄色背景</span>的文字，均保留了源电子表格中的审查强调标记；源文件未说明每处高亮的原因，因此这些标记应视为额外的重点审查提示，而不是替代表中未高亮的其他检查项。核对表格式有意保留电子表格式的结构，但在源表述过于简略、存在歧义或型号标注不一致时，请结合设计指南、数据手册、参考手册以及思澈科技（SiFli）的型号说明一并核对。

原理图评审阶段、PCB 布局开始前，执行 [原理图核对表](SF32LB52x_schematic_checklist.md)。布局评审阶段、Gerber 发布前，执行 [PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)。实践中，每一轮通常执行两次：先由设计工程师完成初审，再由独立评审人在设计冻结或制造发布前复审。

为了让核对表真正成为签核记录，而不是走读清单，建议按以下方式使用：

1. 先确认目标芯片的具体型号，尤其是设计可能在 520/3/5/7 与 52B/D/E/G/J 两组器件之间切换时。
2. 评审过程中逐条记录“通过 / 不通过 / 不适用”，而不是只浏览条目。
3. 凡是涉及启动介质、显示类型或电源开关行为的检查项，都要回到实际原理图和设计指南对应章节逐项核对。
4. 遇到源文件表述不清的条目时，在发布前把实际料号和设计假设写入审查记录。

<div align="center"><em>表 5-1：审查记录模板</em></div>

<div align="center" markdown>

| 字段 | 内容 |
|:---|:---|
| 客户名称 | |
| 客户设计名称 | |
| 送审日期 | |
| 初审人 | |
| 初审日期 | |
| 复审人 | |
| 复审日期 | |

</div>

<div align="center"><em>表 5-2：核对表文档版本历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 核对表文档首次发布 |

</div>

[思澈科技（SiFli）SF32LB52 原理图与 PCB 核对表（XLSX）]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

## 6. 继续阅读设计指南 { #continue-the-design-guide }

完整指南在以下页面中继续展开，每页对应设计流程的一个阶段，均可从本页进入。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[原理图设计指导](SF32LB52x_schematic_design.md)__ — 最小系统、电源系统、时钟生成、RF、用户接口、存储与连接、以及量产所需的接口，共三页
- :fontawesome-solid-list-check: __[原理图核对表](SF32LB52x_schematic_checklist.md)__ — 逐项原理图评审核对表（第 5.8 节）
- :fontawesome-solid-microchip: __[PCB 布局指导](SF32LB52x_pcb_layout.md)__ — 封装焊盘、叠层、扇出，以及时钟、RF、音频、USB、SDIO 和电源走线指导
- :fontawesome-solid-list-check: __[PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)__ — 逐项 PCB 布局评审核对表（第 6.15 节）
- :fontawesome-solid-book-open: __[设计评审检查表与参考资料](SF32LB52x_review_and_reference.md)__ — 发布检查表、相关文档、参考原理图/PCB/机械/电源附录，以及修订历史

</div>
