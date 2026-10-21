---
icon: lucide/book-check
description: "SF32LB56x 硬件设计指南：电源系统、时钟生成、RF 设计、显示、音频及 PCB 布局指导。"
tags:
    - 硬件
    - 芯片
hide:
    - navigation
---

# SF32LB56x 硬件设计指南 { #sf32lb56x-hardware-design-guide }

## 1. 简介 { #1-introduction }

本硬件设计指南为基于 SF32LB56x 系列的产品提供设计建议和参考资料。SF32LB56x 是针对图形处理应用优化的 AIoT 微控制器系列。本指南面向硬件工程师、PCB 设计工程师和产品开发人员，适用于开发智能手表、联网 HMI 系统、医疗健康设备、工业手持设备、便携仪器以及高端电动自行车或电动滑板车显示终端。

本指南覆盖 SF32LB56xU 和 SF32LB56xV 设计的完整硬件开发流程，包括封装选择、PMIC 与处理器供电、复位、启动模式、工作模式、晶体、RF、显示、存储、音频、传感器、UART/I2C/GPTIM 管脚规划、PCB 布局、验证和量产准备。遵循这些建议有助于降低原理图设计和 PCB 布局风险、保持低功耗特性，并在整个设计过程中明确 U/V 变体差异。

本文假定读者具备嵌入式硬件设计、原理图设计和 PCB 布局的基础知识。本文是 SF32LB56xU 与 SF32LB56xV 硬件应用说明、数据手册、用户手册、参考设计和思澈科技（SiFli）合格供应商名录的补充资料；电气规格、管脚复用、封装尺寸、元器件适用性验证、量产限制等，仍应以相应官方资料为准。

## 2. 开发资源 { #2-development-resources }

[SF32LB56xU 硬件应用说明]: https://wiki.sifli.com/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV 硬件应用说明]: https://wiki.sifli.com/hardware/SF32LB56xV-HW-Application.html
[SF32LB56xU 硬件应用源码]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB56xU-HW-Application.md
[SF32LB56xV 硬件应用源码]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB56xV-HW-Application.md
[SF32 系列概览]: ../../sf32-products/family/SF32_family.md
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/
<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB56xU 硬件应用说明]__
- :fontawesome-solid-file-lines: __[SF32LB56xV 硬件应用说明]__
- :fontawesome-brands-github: __[SF32LB56xU 硬件应用源码]__
- :fontawesome-brands-github: __[SF32LB56xV 硬件应用源码]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

## 3. 芯片概览 { #3-device-overview }

### 3.1. 架构 { #31-architecture }

SF32LB56x 面向比仅支持 BLE 的传感器节点更复杂的显示和 HMI 产品。U/V 两类硬件应用说明覆盖相同的工程主题：基于 PMIC 的电源分配、48 MHz 与 32.768 kHz 晶体、RF 设计、显示接口选择、存储接口选择、音频、PBR 管脚、传感器、UART/I2C/GPTIM 规划、调试下载和量产晶体校准。

### 3.2. 型号与封装 { #32-variants-and-packages }

<div align="center"><em>表 3.2-1：SF32LB56x 封装变体</em></div>

<div align="center" markdown>

| 变体 | 封装 | 尺寸 | 管脚间距 | 焊球直径 |
|:---|:---|:---|:---|:---|
| SF32LB56xU | QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| SF32LB56xV | WBBGA175 | 6.5x6.1x0.94 mm | 0.4 mm | 0.25 mm |

</div>

U 变体使用 QFN68L 封装。V 变体使用 WBBGA175 封装，需要更谨慎的扇出、过孔和 HDI 工艺规划。

![图 3.2-1：SF32LB56xU QFN68L 管脚分布](../../sf32-products/chips/assets/56x/sf32lb56xU-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-1：SF32LB56xU QFN68L 管脚分布</em></div>

![图 3.2-2：SF32LB56xV WBBGA175 管脚分布](../../sf32-products/chips/assets/56x/sf32lb56xV-ballmap.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-2：SF32LB56xV WBBGA175 管脚分布</em></div>

### 3.3. 主要硬件特性 { #33-major-hardware-features }

- 以 SF30147C 为例的 PMIC 电源分配方案。
- 48 MHz 与 32.768 kHz 晶体要求及推荐型号。
- 蓝牙 RF 设计和天线匹配要求。
- U 支持 SPI/QSPI 和 JDI 显示；V 支持 SPI/QSPI、MCU8080、DPI 和 JDI 显示。
- 外部存储和启动存储选项，包括 SDIO/eMMC/SD NAND 类接口。
- 按键、振动马达、音频接口、PBR 管脚、传感器、UART/I2C、GPTIM、调试下载和校准。

### 3.4. 应用场景 { #34-typical-applications }

![图 3.4-1：SF32LB56xU 智能手表应用框图](../../sf32-products/chips/assets/56x/sf32lb56xU-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.4-1：SF32LB56xU 智能手表应用框图</em></div>

![图 3.4-2：SF32LB56xV 智能手表应用框图](../../sf32-products/chips/assets/56x/sf32lb56xV-watch-app-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>图 3.4-2：SF32LB56xV 智能手表应用框图</em></div>

SF32LB56x 适用于智能手表、联网 HMI 面板、医疗健康产品、工业手持终端、便携仪器，以及需要蓝牙、音频、传感器、外部存储和复杂 UI 的高级显示产品。

## 4. 设计总览 { #4-design-at-a-glance }

### 4.1. 工程摘要 { #41-engineering-summary }

<div align="center"><em>表 4.1-1：SF32LB56x 设计摘要</em></div>

<div align="center" markdown>

| 主题 | SF32LB56xU | SF32LB56xV |
|:---|:---|:---|
| 封装 | QFN68L，7x7x0.75 mm，0.35 mm 间距 | WBBGA175，6.5x6.1x0.94 mm，0.4 mm 间距 |
| 显示 | 官方资料主要列出 SPI/QSPI 和 JDI 接口 | 官方资料列出 SPI/QSPI、MCU8080、DPI 和 JDI 接口 |
| PCB 工艺 | 紧凑 QFN 走线和扇出 | BGA/HDI 规划、盲埋孔评审和更严格的扇出控制 |
| 电源 | 处理器电源加 SF30147C PMIC 分配 | 处理器电源加 SF30147C PMIC 分配，并包含 V 变体负载分配 |
| 存储 | 按 SF32LB56xU 存储管脚设计外部存储 | 按 SF32LB56xV 存储管脚设计外部存储 |

</div>

### 4.2. 硬件设计流程 { #42-hardware-design-flow }

1. 选择 U 或 V 变体、封装、显示接口、存储方案和目标 PCB 工艺。
2. 定义 PMIC 电源分配、处理器电源、复位、充电和低功耗控制。
3. 选择晶体、RF 匹配、显示、存储、音频、传感器、按键、马达和 PBR 电路。
4. 锁定管脚分配，并检查显示、存储、音频、调试、唤醒和量产功能之间的冲突。
5. 评审 PCB 扇出、叠层、阻抗、RF、时钟、USB/SDIO、音频、DC-DC 和 ESD。
6. 在原理图冻结、布局发布、EVT 和量产夹具发布前分别运行设计检查表。

### 4.3. 评审资料包 { #43-review-evidence-pack }

EVT 前应归档 SF32LB56xU 与 SF32LB56xV 硬件应用说明的版本、数据手册/用户手册版本、原理图 PDF、PCB 叠层、PCB 工艺能力、DRC/ERC 报告、PMIC 配置、电源树、启动/存储配置、显示走线截图、RF/晶体布局截图、音频/模拟截图以及量产烧录/校准计划。

### 4.4. 使用核对表 { #using-the-checklists }

本指南包含两级核对表。第 7 节中的简短核对表用于设计阶段的快速工程自检，只覆盖高风险项目。[原理图核对表](SF32LB56x_schematic_checklist.md)（第 5.8 节）以及 [PCB 布局指导](SF32LB56x_pcb_layout.md) 第 6.3 节，则完整逐项复现了思澈科技（SiFli）的 *SF32LB56x Schematic & PCB Checklist*（V1.0，2026-01-21），该文件与硬件设计资料一同发布于[思澈科技（SiFli）Wiki][思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]，覆盖 SF32LB56xU 系列、SF32LB56xV 系列以及 SS6700A 变体。

每个检查项都标明其适用的芯片分组，以及是“必检”（发布前必须通过）还是“可选”（使用相关功能时建议执行）。带颜色的文字以及带有<span class="flag-yellow">黄色背景</span>的文字，均保留了源电子表格中的审查强调标记；源文件未说明每处高亮的原因，因此这些标记应视为额外的重点审查提示，而不是替代表中未高亮的其他检查项。

原理图评审阶段、PCB 布局开始前，执行[原理图核对表](SF32LB56x_schematic_checklist.md)。布局评审阶段、Gerber 发布前，执行 PCB 布局核对表（第 6.3 节）。实践中，每一轮通常执行两次：先由设计工程师完成初审，再由独立评审人在设计冻结或制造发布前复审。

为了让核对表真正成为签核记录，而不是走读清单，建议按以下方式使用：

1. 先确认准确的目标料号和封装。
2. 评审过程中逐条记录“通过 / 不通过 / 不适用”，而不是只浏览条目。
3. 将显示、存储、唤醒和低功耗相关条目与设计指南对应章节逐项核对。
4. 将封装相关的具体假设——尤其是 56xU 与 56xV 之分、QFN 与 WBBGA 之分、DSI 与 SPI 显示之分，以及 SD2/MPI3 存储用法——记入审查记录。

<div align="center"><em>表 4.4-1：审查记录模板</em></div>

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

<div align="center"><em>表 4.4-2：核对表文档版本历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 核对表文档首次发布 |

</div>

[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

## 继续设计指南 { #continue-the-design-guide }

完整指南在以下页面中继续展开，每页对应设计流程的一个阶段，均可从本页进入。

<div class="grid cards" markdown>

- :fontawesome-solid-bolt: __[原理图设计指导](SF32LB56x_schematic_design.md)__ — 电源系统、工作模式与唤醒源、时钟生成、RF、显示/触摸/背光接口，以及存储、传感器、音频、连接与制造
- :fontawesome-solid-list-check: __[原理图核对表](SF32LB56x_schematic_checklist.md)__ — 逐项原理图评审核对表（第 5.8 节）
- :fontawesome-solid-microchip: __[PCB 布局指导](SF32LB56x_pcb_layout.md)__ — 封装与叠层、关键走线，以及逐项 PCB 布局核对表
- :fontawesome-solid-book-open: __[设计评审检查表与参考资料](SF32LB56x_review_and_reference.md)__ — 发布检查表、相关文档、附录，以及修订历史

</div>
