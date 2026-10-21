---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB57x 硬件设计指南：最小系统设计、电源、时钟、RF、显示、摄像头、存储及 PCB 布局指导。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x 硬件设计指南 { #sf32lb57x-hardware-design-guide }

## 1. 简介 { #1-introduction }

本硬件设计指南为基于 SF32LB57x 系列高集成 AIoT 微控制器的产品提供硬件设计建议和参考资料。文档面向硬件工程师、PCB 设计工程师以及产品开发人员，适用于穿戴设备、便携智能终端、智能家居设备和低功耗联网产品。

本指南覆盖完整硬件开发流程，包括电源架构、时钟电路、RF 设计、显示与摄像头接口、存储与启动配置、音频电路、PCB 布局、硬件验证和量产准备。按照这些建议进行设计，有助于降低原理图和 PCB 风险，保持低功耗特性，并确保设计符合 SF32LB57x 的封装、电源和接口要求。

本文假定读者具备基本嵌入式硬件设计和原理图设计经验。本文是 SF32LB57x 数据手册、用户手册、官方硬件应用说明、参考设计文件和思澈科技（SiFli）合格供应商名录（AVL）的补充资料；最终电气规格、管脚复用、封装尺寸、器件验证结果和量产限制仍以这些官方资料为准。

## 2. 开发资源 { #2-development-resources }

[SF32LB57x 产品简介]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x 数据手册]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-CN.pdf
[SF32LB57x 硬件应用说明]: https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x 产品简介]__
- :fontawesome-solid-file-pdf: __[SF32LB57x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB57x 用户手册]__
- :fontawesome-solid-file-lines: __[SF32LB57x 硬件应用说明]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

## 3. 芯片概览 { #3-device-overview }

### 3.1. 主要特性 { #31-features }

SF32LB57x 系列常见外设资源包括：

- 最多 58 路 GPIO<!-- BGA-ONLY -->；部分 BGA112 型号可引出额外 6 路 I/O，用于 MPI3 或通过上拉/下拉配置为 GP 静态输出，具体用途见下文封装说明<!-- /BGA-ONLY -->。
- 3 路 UART、4 路 I2C、2 路 SPI、2 路 CAN。
- 2 路 GPTIM（各 4 通道）、2 路 LPTIM、2 路 ATIM（各支持 3 路差分或 4 路单端通道）、1 路 PWM（5 通道）、1 路 PTM（16 通道）。
- 4 路 RTC 时钟输出；睡眠状态下另有 4 路低频时钟输出（最高 16 kHz）。
- 2 路 SDIO 和 3 路 MPI 存储接口。
- 2 路 I2S 和 2 路 PDM 音频接口；1 路差分模拟音频输出和 2 路差分模拟音频输入。
- 1 路 USB 2.0 FS。
- 1 路 GPADC（12 通道）。
- 1 路 LCDC 显示控制器（支持 24 位 DPI、8/16 位 8080、QSPI、8/16 位 EPD 以及串行/并行 JDI 接口）。
- 1 路 DCMI 摄像头接口（最高支持 16 位 DVP、2 数据线 SPI 和 4 数据线 QSPI）。
- 10 路硬件唤醒源。
- DBG-UART 与 SWD 调试；DBG-UART、SWD、UART 与 USB 下载。

!!! note "显示接口范围"
    官方硬件应用说明在 SF32LB57x 的 LCDC 接口概览中列出 SPI/QSPI、24 位 DPI、16 位 8080、16 位 EPD，以及串行/并行 JDI。MIPI-DSI 出现在部分显示驱动 IC 的兼容接口列表中，而不在上述芯片直连接口列表中。不要据此认定芯片原生提供 MIPI-DSI 主机接口；选型前应向思澈科技（SiFli）确认具体显示控制器连接方案。

### 3.2. 型号 { #32-variants }

SF32LB57x 包含两类供电体系：

<div align="center"><em>表 3.2-1：型号与供电系列对照</em></div>

<div align="center" markdown>

| 系列 | 典型型号 | 设计含义 |
|:-----|:---------|:---------|
| 电池供电系列 | 570 / 573 / 575 / 576 / 577 / 578 / 579 | 面向锂离子电池供电产品。设计通常包含 VBAT、VCC、VBUS，并采用片内充电或外部充电。 |
| 3.3 V 供电系列 | 57Z / 57C / 57E / 57F / 57G / 57H / 57J | 面向外部 3.3 V 系统供电，PVDD、AVDD、VDDIO 等电源域由外部电源提供。 |

</div>

!!! warning
    两类供电系列的电源连接、上电行为和部分封装定义不同。复用其他设计前，必须确认准确的订购型号。

### 3.3. 封装 { #33-packages }

SF32LB57x 常见封装包括 QFN68L、QFN80L<!-- BGA-ONLY --> 和 BGA112<!-- /BGA-ONLY -->。SF32LB57x 封装资料列出了每种封装的两个厚度版本，同时电池供电系列和 3.3 V 供电系列使用不同管脚定义。设计时必须按照实际订购型号选择对应的管脚定义、POD、PCB 焊盘和钢网开窗文件。

<div align="center"><em>表 3.3-1：封装选型与设计关注点</em></div>

<div align="center" markdown>

| 封装 | 典型尺寸 | 管脚间距 | 设计关注点 |
|:-----|:---------|:---------|:-----------|
| QFN68L | 7 mm x 7 mm | 0.35 mm | 适合紧凑设计；注意中心焊盘接地、钢网开窗和表层扇出能力。 |
| QFN80L | 8 mm x 8 mm | 0.35 mm | IO 资源更多；注意电源域和显示/存储管脚组差异。 |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.4 mm | 面积更小但扇出难度更高；应尽早与 PCB 厂确认工艺能力。 |
<!-- /BGA-ONLY -->

</div>

QFN68L 和 QFN80L 仅提供订购型号对应的标称 GPIO 数量，不额外提供 MPI3 或静态输出引脚。

<!-- BGA-ONLY -->
!!! note "BGA112 的 GPIO 可用性"
    仅适用于 BGA112。SF32LB57x 芯片内部集成 MPI1、MPI2 和 MPI3；各接口对应的合封存储位置见 [SF32 芯片型号命名规则](../../sf32-products/family/SF32_namingrule.md)。在以下三种合封存储配置下，MPI2 和 MPI3 管脚均无法从封装外部访问，因此可用 GPIO 数量固定为 58 路：(1) MPI1 和 MPI2 上各合封一颗 PSRAM；(2) MPI2 上合封一颗 256 Mb PSRAM；或 (3) MPI3 上合封 NOR Flash。`SF32LB57GVD776` 属于第 (3) 种情况：其第二个 `7` 表示内部器件使用 MPI3，因此仅提供 58 路 GPIO。除这三种配置外，与 MPI3 对应的 6 路 BGA112 I/O 可用于 MPI3，或通过上拉或下拉配置为 GP 静态输出；它们并非可自由分配的 GPIO。因此，`SF32LB57ZVN7N6` 的 `58 + 6` 表示 58 路 GPIO 加 6 路可用于 MPI3 或静态输出的 I/O，并不表示有 64 路可自由分配的 GPIO。
<!-- /BGA-ONLY -->

<div align="center"><em>表 3.3-2：封装尺寸</em></div>

<div align="center" markdown>

| 封装 | 封装体尺寸 | 芯片厚度 | 管脚间距 |
|:-----|:-----|:---------|:---------|
| QFN68L | 7 mm x 7 mm | 0.9 mm | 0.35 mm |
| QFN68L | 7 mm x 7 mm | 1.1 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 0.9 mm | 0.35 mm |
| QFN80L | 8 mm x 8 mm | 1.1 mm | 0.35 mm |
<!-- BGA-ONLY -->
| BGA112 | 5.4 mm x 4.4 mm | 0.98 mm | 0.4 mm |
| BGA112 | 5.4 mm x 4.4 mm | 1.03 mm | 0.4 mm |
<!-- /BGA-ONLY -->

</div>

建议评审要点：

- 管脚编号与芯片管脚定义一致。
- 电源、地、RF、晶体、USB、显示和启动相关管脚无错位。
- QFN 中心散热焊盘接地和过孔处理符合工艺要求。
<!-- BGA-ONLY -->
- BGA 扇出、盲埋孔、阻焊和钢网开窗，以及组装能力已与 PCB 厂确认。
<!-- /BGA-ONLY -->

![图 3.3-1：SF32LB57x 型号命名规则](../../sf32-products/chips/assets/57x/57x-part-numbering.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-1：SF32LB57x 型号命名规则</em></div>

![图 3.3-2：QFN68L 电池供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-2：QFN68L 电池供电系列管脚定义</em></div>

![图 3.3-3：QFN68L 3.3 V 供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-QFN68-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-3：QFN68L 3.3 V 供电系列管脚定义</em></div>

![图 3.3-4：QFN80L 电池供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-4：QFN80L 电池供电系列管脚定义</em></div>

![图 3.3-5：QFN80L 3.3 V 供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-QFN80-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-5：QFN80L 3.3 V 供电系列管脚定义</em></div>

<!-- BGA-ONLY -->
![图 3.3-6：BGA112 电池供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-HV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-6：BGA112 电池供电系列管脚定义</em></div>

![图 3.3-7：BGA112 3.3 V 供电系列管脚定义](../../sf32-products/chips/assets/57x/57x-PKG-BGA112-LV.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.3-7：BGA112 3.3 V 供电系列管脚定义</em></div>
<!-- /BGA-ONLY -->

### 3.4. 主要硬件特性 { #34-major-hardware-features }

- 两类实用供电体系：电池供电系列和外部 3.3 V 稳压供电系列。
- QFN68L、QFN80L<!-- BGA-ONLY --> 和 BGA112<!-- /BGA-ONLY --> 封装，每种封装都有对应的管脚定义、焊盘、钢网和 PCB 工艺要求。
- 显示接口支持 SPI/QSPI、8080、RGB/DPI、EPD 和 JDI，具体能力取决于实际型号和管脚定义；MIPI-DSI 的适用范围见第 3.1 节说明。
- 支持通过合封存储和外部 MPI/SDIO 存储实现存储与启动。
- RF、晶体、音频、摄像头、显示、USB、SDIO 和电源布局需要在原理图和 PCB 阶段联合评审。

### 3.5. 应用场景 { #35-typical-applications }

SF32LB57x 适用于需要 AI、摄像头或高级显示能力，同时需要蓝牙（Bluetooth）连接和紧凑封装的产品：

- 智能手表、运动手表及其他可穿戴设备
- 便携智能终端和智能家居控制器
- AI 传感器和边缘推理设备
- 带摄像头的蓝牙产品
- 使用 SPI/QSPI、RGB/DPI、8080、EPD 或 JDI 接口的高级显示设备，具体取决于所选器件和显示控制器连接方案
- 需要紧凑 QFN<!-- BGA-ONLY --> 或 BGA<!-- /BGA-ONLY --> 封装、丰富 GPIO 和存储选项的产品

## 4. 设计总览 { #4-design-at-a-glance }

### 4.1. 硬件架构 { #41-hardware-architecture }

<div align="center"><em>表 4.1-1：设计总览</em></div>

<div align="center" markdown>

| 设计项目 | 典型实现 |
|:---|:---|
| 供电体系 | 电池供电系列或外部 3.3 V 供电系列；不要混用两类原理图 |
| 封装 | QFN68L、QFN80L<!-- BGA-ONLY -->、BGA112<!-- /BGA-ONLY -->；按准确订购型号选择管脚定义、POD、焊盘和钢网 |
| PCB 工艺 | 与 PCB/组装厂确认 QFN 焊盘、中心焊盘过孔和钢网要求<!-- BGA-ONLY -->；BGA 还需尽早确认扇出和 PCB 制造能力<!-- /BGA-ONLY --> |
| 时钟 | 48 MHz 主晶体和 32.768 kHz RTC 晶体 |
| RF | 50 Ω 天线路径，π 型匹配网络靠近芯片，RF 电源本地滤波 |
| 显示 | SPI/QSPI、8080、RGB/DPI、EPD 或 JDI，取决于器件能力和管脚定义；MIPI-DSI 的适用范围见第 3.1 节说明 |
| 存储 | 合封存储和外部 MPI/SDIO 存储选项；启动介质必须在布局前固定 |
| 音频 | 模拟音频输入/输出、PDM/I2S、麦克风偏置、音频参考和外部 PA 选项 |
| 摄像头 | DCMI 摄像头接口，应按噪声敏感高速接口处理电源和走线 |
| 调试与量产 | DBG-UART、SWD、启动配置、PA00/PA01/PA34、电源轨和量产测试点 |

</div>

### 4.2. 硬件设计流程 { #42-hardware-design-flow }

<div align="center"><em>表 4.2-1：硬件设计流程</em></div>

<div align="center" markdown>

| 步骤 | 设计决策 | 主要章节 |
|:---|:---|:---|
| 1 | 确认准确的可订购型号、供电系列、封装和管脚定义 | 芯片概览 |
| 2 | 确定启动存储、显示接口、摄像头需求、调试访问和低功耗目标 | 设计总览、原理图设计 |
| 3 | 定义电源树、充电/OVP 方案、BUCK/LDO 器件和上电行为 | 电源系统 |
| 4 | 选择时钟源、RF 拓扑、存储、显示、音频、摄像头和通用接口 | 时钟生成、RF、用户接口、存储与连接 |
| 5 | 评审封装焊盘、叠层、扇出、RF、晶体、USB、SDIO、显示、音频和电源布局 | PCB 布局指导 |
| 6 | 完成客户自查，并在 EVT 前归档原理图、布局、AVL、DRC/ERC、阻抗、电源、RF 和量产证据 | 客户设计自查表 |

</div>

### 4.3. 如何使用本指南 { #43-how-to-use-this-guide }

建议按照板级评审顺序使用本指南。首先确认准确的 SF32LB57x 可订购型号和供电系列，选定封装与 PCB 工艺，并结合数据手册和第 5.1 节中匹配的最小系统原理图确认芯片基础连接。随后定义电源树、启动介质和必要的调试/下载访问，再依据产品需求和管脚复用表分配 IO 功能。最小系统方案确定后，再评审时钟、RF、显示、存储、音频、摄像头、通用接口、PCB 布局和量产访问。第 5 节提供原理图设计基准，第 6 节提供 PCB 实施基准，第 7 节用于在发布原理图或 PCB 布局前进行客户自查。

### 4.4. 评审证据包 { #44-review-evidence-pack }

EVT 前应归档数据手册/用户手册/参考设计版本、原理图 PDF、PCB 叠层、阻抗报告、DRC/ERC 报告、电源树、低功耗预算、充电路径、启动路径、量产测试点清单，以及 RF、晶体、USB、SDIO、显示、摄像头、音频、GPADC 和封装扇出的重点截图。

## 继续设计指南 { #continue-the-design-guide }

完整指南在以下页面中继续展开，每页对应设计流程的一个阶段，均可从本页进入。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[最小系统与电源](SF32LB57x_schematic_system_power.md)__ — 封装/供电系列匹配、启动 Strap、启动介质、调试/下载访问、电源树、充电/OVP、BUCK、低功耗电源轨与工作模式
- :fontawesome-solid-wave-square: __[时钟、RF 与用户接口](SF32LB57x_schematic_clock_rf_interfaces.md)__ — 48 MHz 与 32.768 kHz 晶体、RF 匹配与天线路径、显示、触摸/背光、音频、摄像头、按键与马达
- :fontawesome-solid-database: __[存储与制造](SF32LB57x_schematic_storage_mfg.md)__ — 存储、启动、GPIO、IO MUX 与矩阵管脚复用表、UART/I2C/SPI/SDIO/USB/CAN/GPADC、产线烧录、校准与治具访问
- :fontawesome-solid-list-check: __[原理图核对表](SF32LB57x_schematic_checklist.md)__ — 逐项原理图评审核对表（第 5.8 节）
- :fontawesome-solid-microchip: __[PCB 布局指导](SF32LB57x_pcb_layout.md)__ — 层叠、关键 PCB 约束、电源/晶体/RF/模拟/音频/高速走线、EMI/ESD/EOS 与参考图
- :fontawesome-solid-list-check: __[PCB 布局核对表](SF32LB57x_pcb_layout_checklist.md)__ — 逐项 PCB 布局评审核对表（第 6.10 节）
- :fontawesome-solid-book-open: __[设计评审检查表与参考资料](SF32LB57x_review_and_reference.md)__ — 客户设计自查表、相关文档、附录，以及修订历史

</div>
