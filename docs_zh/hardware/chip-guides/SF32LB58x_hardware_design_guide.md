---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58x 硬件设计指南：电源架构、时钟与 RF 设计、显示、存储、音频及 PCB 布局指导。"
tags:
    - 硬件
    - 芯片
---

# SF32LB58x 硬件设计指南 { #sf32lb58x-hardware-design-guide }

## 1. 简介 { #1-introduction }

本硬件设计指南为基于 SF32LB58x 系列高性能 AIoT 微控制器的产品提供设计建议和参考资料，面向硬件工程师、PCB 设计工程师和产品开发人员，适用于需要功能丰富的人机界面、大容量内存、双模蓝牙、音频、丰富 GPIO 资源和低功耗待机能力的电池供电产品。

本指南覆盖完整硬件开发流程，包括 PMIC 与电源分配、BGA256 扇出、HDI 叠层规划、时钟电路、RF 设计、MIPI-DSI、USB2.0 High-Speed、SDIO/eMMC、音频电路、PCB 布局、硬件验证和量产准备。按照这些建议进行设计，有助于降低高密度 BGA/HDI 设计风险，保障高速接口信号完整性，并确保产品符合 SF32LB58x 的电源、封装和量产要求。

本文假定读者具备基本嵌入式硬件设计、原理图设计和高密度 PCB 布局经验。本文是 SF32LB58x 数据手册、用户手册、官方硬件应用说明、参考设计包和思澈科技（SiFli）合格供应商名录（AVL）的补充资料；最终电气规格、管脚复用、封装尺寸、器件验证结果和量产限制仍以这些官方资料为准。

## 2. 开发资源 { #2-development-resources }

[SF32LB58x 产品简介]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-Product%20Brief%20V0p72.pdf
[SF32LB58x 数据手册]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[SF32LB58x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-User%20mannual%20V0p4p6.pdf
[SF32LB58x 硬件应用说明]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md
[SF32LB58x 原理图与 PCB 核对表工作簿]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x 产品简介]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 用户手册]__
- :fontawesome-solid-file-lines: __[SF32LB58x 硬件应用说明]__
- :fontawesome-solid-file-excel: __[SF32LB58x 原理图与 PCB 核对表工作簿]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

## 3. 芯片概览 { #3-device-overview }

### 3.1. 架构 { #31-architecture }

<div align="center"><em>表 3.1-1：主要硬件特性</em></div>

<div align="center" markdown>

| 特性 | 说明 |
|:---|:---|
| 核心架构 | 异构三核架构：2 个最高 240 MHz 的应用 Arm Cortex-M33 STAR-MC1 核心，1 个最高 96 MHz 的低功耗 Arm Cortex-M33 STAR-MC1 核心 |
| 蓝牙 | 集成低功耗双模蓝牙（Bluetooth）5.3 收发器 |
| 图形 | ePicasso 2.0 2D/2.5D 图形加速和 Vivante GCNanoUltraV 矢量图形 |
| 显示接口 | MIPI-DSI、SPI/QSPI、MCU8080、DPI、并行/串行 JDI |
| 存储 | 随型号变化的合封 NOR Flash/PSRAM；外接 NOR/SPI NAND Flash 可使用 MPI3 或 MPI4；另有 SD1、SD2 两路 SDIO 接口 |
| 音频 | 3 路 I2S、2 路 PDM、差分模拟音频输入/输出，支持外部模拟音频 PA 和 I2S 音频 PA |
| 唤醒中断 | 轻度睡眠（Light Sleep）/深度睡眠（Deep Sleep）模式下所有 GPIO 均支持唤醒；待机（Standby）/休眠（Hibernate）模式下支持 16 个唤醒中断源（PA 侧 6 个，PB 侧 10 个） |
| PBR 接口 | 共 6 个管脚：PBR0 上电时由低变高，可用于控制特定外部 LSW；PBR1-PBR5 默认输出低电平。PBR0-PBR5 均可输出 LPTIM 或 32 kHz 时钟，并可在待机/休眠模式下保持输出；PBR0-PBR3 可配置为唤醒输入，但 MCU 处于运行状态时不会产生中断。 |

</div>

### 3.2. 型号 { #32-variants }

原理图冻结前，应依据最新数据手册和 AVL 确认 SF32LB58x 的具体订购型号及合封存储组合。板级设计应将该系列视为 BGA256、仅支持 HDI 工艺的平台；SiP 合封存储随型号而异。该系列支持通过 MPI3 或 MPI4 外接 NOR Flash 或 SPI NAND Flash。思澈科技（SiFli）EVB 默认通过 MPI4 外接 SPI NAND；SD1 用于 eMMC 或 SD NAND，SD2 用于 SD 卡或 Wi-Fi 器件。定版前还应核对目标型号的管脚分配及目标板的实际走线。

### 3.3. 封装 { #33-packages }
<div align="center"><em>表 3.3-1：封装</em></div>

<div align="center" markdown>

| 封装名称 | 尺寸 | 引脚间距 |
|:---|:---|:---|
| BGA256 | 8.5 mm x 6.5 mm x 0.94 mm | 0.4 mm |

</div>

### 3.4. 主要硬件特性 { #34-major-hardware-features }

- BGA256 封装，间距为 0.4 mm，电源和 GPIO 扇出密集。
- 必须采用 HDI PCB 工艺，不兼容 PTH 工艺。
- 集成 PMU，包含 2 路 BUCK 输出和 3 路内部 LDO 输出。
- 手表类系统可选配 SF30147C 系统 PMIC 完成整机电源分配。
- MIPI-DSI、USB2.0 HS、SDIO/eMMC、RF、音频和 BGA 扇出都需要在设计早期确认叠层和阻抗规则。

### 3.5. 应用场景 { #35-typical-applications }

SF32LB58x 适用于需要将高级图形、大容量内存、多媒体和边缘 AI 工作负载结合起来的联网产品，例如：

- 智能手表、运动手表和户外可穿戴设备
- 高级骑行码表和车载仪表
- 智能显示屏和联网仪表
- AI 可穿戴设备
- 边缘 AI 和传感器融合系统
- 高分辨率 LVGL 人机界面设备
- 便携式医疗和工业终端
- 使用外部 SDIO Wi-Fi 器件的蓝牙 + Wi-Fi 配件

## 4. 设计总览 { #4-design-at-a-glance }

### 4.1. 硬件架构 { #41-hardware-architecture }
<div align="center"><em>表 4.1-1：快速设计概要</em></div>

<div align="center" markdown>

| 设计项目 | 典型实现 |
|:---|:---|
| 封装 | BGA256，8.5 mm x 6.5 mm x 0.94 mm，0.4 mm 间距 |
| PCB | 仅支持 HDI 板，不支持 PTH 板；推荐 6HDI-2 叠层 |
| 电源 | 内置 PMU（2 路 BUCK + 3 路 LDO），可选配思澈科技（SiFli）PMIC SF30147C 为整机供电 |
| BUCK 电感 | 4.7 uH，DCR ≤ 0.4 Ω，Isat ≥ 500 mA |
| 时钟 | 48 MHz 主晶体 + 32.768 kHz RTC 晶体 |
| 射频 | 50 Ω 特征阻抗走线，预留 π 型匹配网络 |
| 显示 | MIPI-DSI（2 通道）、3/4 线 SPI、Quad-SPI、MCU8080、DPI、并行/串行 JDI；双路 LCDC 引脚映射为 LCDC1（PA）/LCDC2（PB） |
| 存储 | 外接 NOR 或 SPI NAND Flash 可使用 MPI3 或 MPI4。思澈科技（SiFli）EVB 通过 MPI4 外接 SPI NAND，SD1 接 eMMC 或 SD NAND，SD2 接 SD 卡或 Wi-Fi 器件 |
| 音频 | 3 路仅支持主模式的 I2S、2 路 PDM、差分模拟音频输入输出 |
| 调试 | 1 路 SWD + 6 路 UART 可选调试输出 |
| USB | USB2.0 HS，支持主机 / 设备模式 |

</div>

### 4.2. 硬件设计流程 { #42-hardware-design-flow }

<div align="center"><em>表 4.2-1：硬件设计流程</em></div>

<div align="center" markdown>

| 步骤 | 设计决策 | 主要章节 |
|:---|:---|:---|
| 1 | 确认可订购型号、SiP 存储配置和 BGA256 封装假设 | 芯片概览、封装 |
| 2 | 在布局前冻结 HDI 叠层、过孔结构、阻抗规则和装配能力 | PCB 布局指导 |
| 3 | 确定是否采用可选的 SF30147C 系统 PMIC，并定义芯片 PMU 电源轨、BUCK 电感、LDO 电容、复位电路和上电时序 | 电源系统 |
| 4 | 选择启动存储、显示接口、USB 角色、SDIO/eMMC 用法、音频拓扑和调试访问 | 存储与连接、用户接口、制造 |
| 5 | 评审时钟、RF、DSI、USB2.0 HS、SDIO/eMMC、音频、DC/DC、BGA 扇出和 ESD 走线截图 | 时钟生成、RF、PCB 布局指导 |
| 6 | 原型发布前归档原理图、叠层、DRC、阻抗、AVL、制造和重点布局证据 | 设计评审检查表 |

</div>

### 4.3. 如何使用本指南 { #43-how-to-use-this-guide }

建议按照板级评审顺序使用本指南：先确认封装和 SiP 存储配置，再锁定 HDI 叠层和 PMIC 方案，随后评审启动存储和显示走线，最后检查时钟、RF、USB、音频、调试和量产测试访问。第 5 节是原理图基线，第 6 节是 PCB 实现基线，第 7 节是发布核对表。

### 4.4. 评审证据包 { #44-review-evidence-pack }

原型发布前，应归档原理图 PDF、PCB 叠层、过孔/工艺能力说明、阻抗报告、DRC 报告、AVL 核对记录，以及 PMIC、BUCK 电感、DSI、USB、SDIO/eMMC、RF、晶体、音频、BGA 扇出、地回流和 ESD 入口的重点布局截图。

### 4.5. 使用核对表 { #using-the-checklists }

本指南包含两级核对表。散布在第 5.2.1.7 和 5.7.3 节中的简短核对项，用于设计阶段的快速工程自检，只覆盖高风险项目。[原理图核对表](SF32LB58x_schematic_checklist.md)（第 5.8 节）和 [PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)（第 6.18 节）则完整逐项复现了思澈科技（SiFli）的 *SF32LB58x Schematic & PCB Checklist*（V1.0，2026-01-21）。

每个检查项分为“必检”（发布前必须通过）和“可选”（使用相关功能时建议执行）两类。彩色文字和带有<span class="flag-yellow">黄色背景</span>的文字均保留了源电子表格中的审查强调标记。源文件未说明每处高亮的原因，因此这些标记应视为额外的重点审查提示，不能替代表中其他未高亮的检查项。

核对表工作簿规定，非 AVL 电感的 Isat 应不低于 450 mA；而思澈科技（SiFli）官方硬件应用说明对 L = 4.7 uH、DCR ≤ 0.4 Ω 的 BUCK 电感要求 Isat 不低于 500 mA。核对表中仍保留工作簿的原值。在思澈科技（SiFli）澄清差异前，选择非 AVL 电感时应按更严格的 500 mA Isat 要求执行。

原理图评审阶段、PCB 布局开始前，执行[原理图核对表](SF32LB58x_schematic_checklist.md)。布局评审阶段、Gerber 发布前，执行 [PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)。实践中，每一轮通常执行两次：先由设计工程师完成初审，再由独立评审人在设计冻结或制造发布前复审。

为了让核对表真正成为签核记录，而不是供阅读的清单，建议按以下方式使用：

1. 先确认目标型号和合封存储配置。
2. 评审过程中逐条记录“通过 / 不通过 / 不适用”，而不是只浏览条目。
3. 将显示、存储、唤醒和低功耗相关条目与设计指南对应章节逐项核对。
4. 发布前在审查记录中记录任何未解决的假设。

<div align="center"><em>表 4.5-1：审查记录模板</em></div>

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

<div align="center"><em>表 4.5-2：核对表文档版本历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 核对表文档首次发布 |

</div>

## 继续设计指南 { #continue-the-design-guide }

完整指南在以下页面中继续展开，每页对应设计流程的一个阶段，均可从本页进入。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[原理图设计指导](SF32LB58x_schematic_design.md)__ — 电源系统、时钟生成、RF、用户接口、存储与连接，以及制造
- :fontawesome-solid-list-check: __[原理图核对表](SF32LB58x_schematic_checklist.md)__ — 逐项原理图评审核对表（第 5.8 节）
- :fontawesome-solid-microchip: __[PCB 布局指导](SF32LB58x_pcb_layout.md)__ — 封装、叠层、扇出，以及时钟/RF/音频/USB/SDIO/DSI/电源走线指导
- :fontawesome-solid-list-check: __[PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)__ — 逐项 PCB 布局评审核对表（第 6.18 节）
- :fontawesome-solid-book-open: __[设计评审检查表与参考资料](SF32LB58x_review_and_reference.md)__ — 发布核对表、相关文档、附录，以及修订历史

</div>
