---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB55x 硬件设计指南：电源设计、时钟电路、RF 匹配、存储与显示接口及 PCB 布局指导。"
tags:
    - 硬件
    - 芯片
---

# SF32LB55x 硬件设计指南 { #sf32lb55x-hardware-design-guide }

## 1. 简介 { #1-introduction }

本硬件设计指南为基于 SF32LB55x 系列通用 AIoT 微控制器的产品提供设计建议和参考资料。文档面向硬件工程师、PCB 设计人员和产品开发人员，适用于 BLE 穿戴设备、多传感器电池供电产品、健康监测设备和紧凑型联网系统。

本指南覆盖完整的硬件开发流程，包括封装选择、电源设计、时钟电路、RF 布局、外部存储、显示接口、唤醒源、传感器、音频、调试接口、PCB 布局、硬件验证和量产准备。将这些建议落实到设计中，有助于降低原理图和 PCB 布局风险、保持低功耗特性，并使设计符合 SF32LB55x 对封装、电源、存储、RF 和接口的要求。

本文面向具备嵌入式硬件设计和原理图绘制基础的读者，是 SF32LB55x 数据手册、用户手册、官方硬件应用说明、参考设计和思澈科技（SiFli）合格供应商名录的补充资料。电气规格、管脚复用、封装尺寸、器件适用性验证要求和量产限制仍应以相应官方资料为准。

SF32LB55x 沿用早期的型号后缀规则。确认接口是否可用、封装相关功能及具体存储配置时，应核对完整订购料号和对应封装资料，不能仅凭后缀推断。

## 2. 开发资源 { #2-development-resources }

[SF32LB55x 硬件应用说明]: https://wiki.sifli.com/hardware/SF32LB55x-HW-Application.html
[SF32LB55x 硬件应用说明源文件]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md
[SF32LB55x 数据手册]: https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-Datasheet%20V1p7p2.pdf
[SF32LB55x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501%E2%80%90SF32LB55x%E2%80%90CN.pdf
[SF32LB55x SDK 文档]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[SF32LB55x API 参考]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[SF32 系列概览]: ../../sf32-products/family/SF32_family.md
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x 硬件应用说明]__
- :fontawesome-brands-github: __[SF32LB55x 硬件应用说明源文件]__
- :fontawesome-solid-file-pdf: __[SF32LB55x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB55x 用户手册]__
- :fontawesome-solid-book: __[SF32LB55x SDK 文档]__
- :fontawesome-solid-book-open: __[SF32LB55x API 参考]__
- :fontawesome-solid-microchip: __[SF32 系列概览]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

## 3. 芯片概览 { #3-device-overview }

### 3.1. 架构 { #31-architecture }

SF32LB55x 面向低功耗 AIoT 产品，这类产品既要快速响应用户操作，又要保持较低的待机和睡眠功耗。芯片集成低功耗蓝牙（Bluetooth）5.2 收发机、电源管理，以及存储和显示接口。硬件设计需统筹封装选型、PMU 电源轨、启动模式、两路晶体电路、RF 匹配、外接存储、MIPI/SPI/MCU8080/JDI 显示方案、GPADC 与传感器连接、外接蓝牙音频、调试与烧录接口，以及量产校准。

存储连接包括多路 QSPI、独立 OPI-PSRAM 接口及 SD/eMMC 支持。合封 NOR Flash 和 PSRAM 的配置随具体料号而异。存储和显示接口也与封装有关：BGA145 支持一路外接 OPI-PSRAM，BGA169 支持两路；双通道 MIPI DSI 接口适用于 BGA145 和 BGA169，不适用于 QFN68L。分配外接器件之前，应核对完整料号对应的管脚图和合封存储配置。

### 3.2. 型号与封装 { #32-variants-and-packages }

<div align="center"><em>表 3.2-1：封装选项</em></div>

<div align="center" markdown>

| 封装名称 | 尺寸 | 管脚间距 | 焊球直径 |
| :--- | :--- | :--- | :--- |
| QFN68L | 7x7x0.75 mm | 0.35 mm | - |
| BGA145 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |
| BGA169 | 7x7x0.94 mm | 0.5 mm | 0.25 mm |

</div>

SF32LB55x 提供 QFN68L、BGA145 和 BGA169 三种封装。应尽早确定封装，因为不同封装在存储接口、扇出方式、PCB 工艺要求及可用 GPIO 数量方面存在差异。

![图 3.2-1：QFN68L 管脚分布](../../sf32-products/chips/assets/55x/SF32LB55x-QFN68-Leadmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-1：QFN68L 管脚分布</em></div>

![图 3.2-2：BGA145 管脚分布](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-2：BGA145 管脚分布</em></div>

!!! warning "BGA169 历史型号管脚差异"
    思澈科技（SiFli）已将 SF32LB557V8N6 标为停产（EOL）。下方保留其管脚图供现有设计核对，不作为新设计的选型建议。SF32LB557VD3A6 的 BGA169 管脚图不同：D11、E9、K12、L11、L13 和 M13 为 NC。务必按完整料号核对管脚图；封装尺寸相同并不代表管脚兼容。

![图 3.2-3：BGA169 SF32LB557V8N6 管脚分布](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-1-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-3：BGA169 SF32LB557V8N6 管脚分布</em></div>

![图 3.2-4：BGA169 SF32LB557VD3A6 管脚分布](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-2-Ballmap.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 3.2-4：BGA169 SF32LB557VD3A6 管脚分布</em></div>

### 3.3. 主要硬件特性 { #33-major-hardware-features }

- QFN68L、BGA145 和 BGA169 封装选项。
- 48 MHz 和 32.768 kHz 双晶体设计要求。
- 低功耗蓝牙 5.2 收发机、RF 匹配和天线布局要求。
- OPI PSRAM、QSPI NOR/NAND Flash 和 PSRAM、SDIO eMMC 或 Micro SD 接口；合封存储配置因具体料号而异。
- MIPI DSI、SPI/QSPI、MCU8080 和 JDI 显示选项。
- 唤醒按键、振动马达、唤醒中断、GPADC、传感器和外部蓝牙音频设计指导。
- DBG-UART、SWD、量产烧录和晶体校准支持。

### 3.4. 应用场景 { #34-typical-applications }

典型应用包括腕带类可穿戴设备、智能移动终端、智能家居产品及其他低功耗 AIoT 设计。

## 4. 设计总览 { #4-design-at-a-glance }

### 4.1. 工程摘要 { #41-engineering-summary }

<div align="center"><em>表 4.1-1：SF32LB55x 设计摘要</em></div>

<div align="center" markdown>

| 主题 | 设计重点 |
|:---|:---|
| 封装 | 管脚规划和 PCB 叠层前先确定 QFN68L 或 BGA 封装。 |
| 电源 | 评审 PMU 电源、其他电源脚、必要电容、POR/BOR/复位和 BUCK 模式。 |
| 时钟 | 48 MHz 和 32.768 kHz 晶体必须满足 CL、频率误差（ppm）和 ESR 要求。 |
| RF | 匹配网络靠近芯片，天线路径保持 50 Ω 阻抗且干净。 |
| 存储 | 分别规划易失性 OPI/QSPI PSRAM，以及用于启动和持久存储的 QSPI Flash、SDIO eMMC/Micro SD；核对封装和启动模式支持。 |
| 显示 | 尽早选定 MIPI DSI、SPI/QSPI、MCU8080 或 JDI，因为不同方案的管脚组和布局要求不同。 |
| 量产 | 为 DBG-UART、SWD、启动模式、电源以及 RF/晶体校准预留访问接口。 |

</div>

### 4.2. 硬件设计流程 { #42-hardware-design-flow }

1. 确认封装、存储策略、显示接口和低功耗目标。
2. 定义电源树、PMU 电源、BUCK/LDO 行为和复位电路。
3. 选择晶体、RF 匹配拓扑和天线布局约束。
4. 分配存储、显示、唤醒、传感器、音频、调试和量产测试管脚。
5. 锁定 PCB 叠层、扇出、阻抗、ESD、RF 和高速接口约束。
6. 在原理图冻结、布局发布和 EVT 前执行第 7 节核对表。

### 4.3. 评审资料 { #43-review-evidence-pack }

EVT 前应归档数据手册/用户手册版本、封装图、原理图 PDF、PCB 叠层、阻抗报告、DRC/ERC 报告、电源树、启动模式表、RF 布局截图、晶体布局截图、存储/显示走线截图和量产测试点计划。

### 4.4. 使用核对表 { #using-the-checklists }

本指南包含两级核对表。第 7 节中的简短核对表用于设计阶段的快速工程自检，只覆盖高风险项目。[原理图核对表](SF32LB55x_schematic_checklist.md)（第 5.8 节）以及 [PCB 布局指导](SF32LB55x_pcb_layout.md) 第 6.4 节，逐项复现了思澈科技（SiFli）发布的完整 *SF32LB55x Schematic & PCB Checklist*（V1.0，2026-01-21）。该清单与硬件设计资料一同发布于 [思澈科技（SiFli）芯片硬件设计指南索引（Wiki）][思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]，覆盖 551/555/557 系列器件以及 SS6600A8 变体。

每个检查项都标明其适用的变体分组，以及是“必检”（发布前必须通过）还是“可选”（使用相关功能时建议执行）。带颜色的文字以及带有<span class="flag-yellow">黄色背景</span>的文字，均保留了源电子表格中的审查强调标记；源文件未说明每处高亮的原因，因此这些标记应视为额外的重点审查提示，而不是替代表中未高亮的其他检查项。

在开始 PCB 布局前，使用[原理图核对表](SF32LB55x_schematic_checklist.md)完成原理图评审；在发布 Gerber 文件前，使用 PCB 布局核对表（第 6.4 节）完成布局评审。每项评审通常分两轮进行：先由设计工程师自查，再由独立评审人在设计冻结或量产放行前复审。

为了让核对表真正发挥签核记录的作用，而非仅供浏览，建议按以下方式使用：

1. 先确认目标型号和封装。
2. 评审过程中逐条记录“通过 / 不通过 / 不适用”，而不是只浏览条目。
3. 将显示、存储、唤醒和低功耗相关条目与设计指南对应章节逐项核对。
4. 将封装相关的具体假设——尤其是 BGA 与 QFN 之分、DSI 与 SPI 显示之分，以及 QSPI2/QSPI3 存储用法——记入审查记录。

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

- :fontawesome-solid-bolt: __[原理图设计指导](SF32LB55x_schematic_design.md)__ — 电源系统、启动模式、时钟生成、RF、存储接口、显示与触摸接口，以及唤醒/GPADC/制造接口
- :fontawesome-solid-list-check: __[原理图核对表](SF32LB55x_schematic_checklist.md)__ — 逐项原理图评审核对表（第 5.8 节）
- :fontawesome-solid-microchip: __[PCB 布局指导](SF32LB55x_pcb_layout.md)__ — 封装、叠层、通用 PCB 规则、接口走线，以及逐项 PCB 布局核对表
- :fontawesome-solid-book-open: __[设计评审核对表与参考资料](SF32LB55x_review_and_reference.md)__ — 发布核对表、相关文档、附录，以及修订历史

</div>
