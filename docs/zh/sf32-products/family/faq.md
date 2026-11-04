---
icon: lucide/circle-help
description: "SF32 产品选型常见问题：芯片、模组与开发板，存储与接口需求，蓝牙、GPIO、模组合规标识、供货及定制。"
tags:
    - 硬件
    - 常见问题
---

# SF32 常见问题 { #sf32-faq }

## 产品选型 { #choosing-a-product }

### 应该选择哪个 SF32 系列？ { #choosing-a-family }

先明确以下关键选型条件：

- **显示分辨率：** 所需像素数量、显示接口、刷新率和帧缓冲区内存。
- **蓝牙模式：** 仅需 BLE，还是需要同时支持 BLE 和经典蓝牙的双模方案。
- **GPIO 数量：** 扣除接口和存储占用后，实际可用的引脚数量。
- **封装尺寸：** 占板面积、引脚间距和 PCB 装配要求。
- **供电方式：** 电池或稳压电源供电、工作电压范围及 I/O 电平。
- **音频功能：** ADC/DAC、I2S 和 PDM 需求，包括麦克风通道数。

比较具体型号，不要只看系列编号：编号更大不一定更适合你的产品。以上条件均可在[产品选型器](../product-selector.md)中设置，用来筛选具体型号。

[系列对比](SF32_family.md) · [产品选型器](../product-selector.md)

### 应该选择芯片、模组还是开发板？ { #chip-or-modules }

开发板适合评估平台和验证固件。模组可减少产品载板上的射频、晶体和存储布线工作，也有助于降低整体开发成本。对于出货量较小的产品，模组内元器件的供应链可交由模组厂商承担；在某些地区，模组已有的射频认证也会带来帮助。只有当成本、尺寸或硬件灵活性方面的收益足以抵消额外设计工作时，才考虑芯片级方案，并自行负责原理图、布局和射频设计。无论选择哪种方案，都不能省略最终产品验证。后续还会陆续列出更多模组。

[产品规划](product-planning.md)

### 应该从哪款开发板开始？ { #choosing-a-board }

建议从与你所选芯片系列对应的 LCD 显示开发板开始：[SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md)、[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md)、[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md)（N32R16 存储版本）或 [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md)（N16R32N1 版本）。SF32LB52x 还提供几款小型开发板：[SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md)、[SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) 和 [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md)，其中 ULP 适合评估可穿戴设备的低功耗设计。确认开发板的存储版本与目标型号相符；完整列表见思澈科技（SiFli）官方开发板型号指南。

[产品选型器](../product-selector.md) · [官方开发板型号指南](https://wiki.sifli.com/en/board/devkit_guide.html)

### 如何解读芯片和模组料号？ { #reading-part-numbers }

查看完整订购代码，不要只看系列前缀。芯片代码区分器件、封装和存储配置；模组后缀说明实际搭载的存储和内存选项。参照命名指南中的示例和历史例外，再向供应商确认可订购的具体配置。

[SF32 命名规则](SF32_namingrule.md)

## 存储与规格 { #memory-and-specifications }

### SRAM、PSRAM 和 Flash 有什么区别？ { #memory-types }

SRAM 和 PSRAM 用于存放运行数据，属于易失性存储；具体器件支持的数据保持模式有所不同。片内 SRAM 与外接或合封 PSRAM 在访问路径、带宽和功耗方面也有差异。Flash 则用于非易失性地保存固件和资源。增加 Flash 容量不能弥补运行内存不足。

[存储类型](../../learn/architecture/psram-and-memory-types.md)

### 应用需要多少存储容量？ { #sizing-memory }

运行内存预算应覆盖操作系统、栈、堆、图形缓冲区、音频及其他并发任务。基本帧缓冲区容量按“宽度 × 高度 × 每像素字节数 × 缓冲区数量”估算，并计入行跨度对齐和额外渲染缓冲区。固件、字体、图像、音频、文件及 OTA 镜像所需的非易失性存储应另行估算；再以目标负载测量峰值占用。

[图形概览](../../learn/graphics/overview.md) · [产品规划](product-planning.md)

### 什么时候选择 NOR、NAND 或 eMMC？ { #choosing-storage }

应根据启动路径、容量、访问模式和软件支持来选，不要只比较容量。NOR 常用于存放代码和随机读取；NAND 需要相应的擦除块管理、ECC 和坏块管理；eMMC 则集成了存储管理控制器。在本网站的模组说明中，SPI-NAND 和 QSPI-NAND 指同一种存储选项，并不代表产品之间存在差异。还要确认具体器件的启动加载程序、驱动和文件系统支持情况。

[存储类型](../../learn/architecture/psram-and-memory-types.md) · [模组后缀代码](SF32_namingrule.md#module-naming)

### 系列列出的功能是否适用于每个型号？ { #family-versus-sku }

不是。系列概述可能汇总多个型号的能力。存储、供电要求、可用引脚和对外接口可能因 SKU、封装及引脚复用而异。芯片内部集成的外设也不一定会从模组或开发板引出。选型时应核对具体型号对比表、数据手册和引脚定义，并确认 SDK 支持所需功能。

[系列对比](SF32_family.md) · [产品选型器](../product-selector.md)

## 应用适配 { #application-fit }

### 如何为显示屏选择器件？ { #choosing-a-display }

先匹配面板的电气接口和时序，再检查分辨率、像素格式、目标刷新率、帧缓冲区容量和带宽。最高分辨率不代表画面一定流畅。确认所需的图形加速和面板驱动后，再用目标存储配置测试典型界面和动画。

[按器件划分的接口矩阵](../../learn/graphics/display-controller.md#per-device-interface-matrix) · [显示控制器](../../learn/graphics/display-controller.md) · [图形概览](../../learn/graphics/overview.md)

### 如何确认音频和麦克风支持？ { #audio-and-microphones }

模拟音频链路要看 ADC 和 DAC 通道，数字音频器件要看 I2S，数字麦克风则要看 PDM。一个 PDM 接口最多可承载两个麦克风通道，因此接口数量不等于麦克风数量。实际可用通道还取决于引脚是否引出、引脚复用、驱动支持和板级布线。应核实目标配置，不要简单相加各接口的数量。

[音频概览](../../learn/audio/overview.md) · [术语表](../../about/glossary.md)

### 哪些产品支持 BLE、经典蓝牙或双模蓝牙？ { #bluetooth-modes }

SF32LB55x 仅支持 BLE；SF32LB52x、SF32LB56x、SF32LB57x 和 SF32LB58x 系列支持双模蓝牙。具备无线能力不代表每种 SDK 配置都支持所有蓝牙应用规范（Profile）、编解码器或功能。请核对应用所需的 Profile 及已验证示例；仅支持 BLE，并不意味着支持经典蓝牙音频或 BLE Audio。

[系列对比](SF32_family.md) · [蓝牙概览](../../learn/bluetooth/overview.md)

### 设计是否需要外接 Wi-Fi 器件？ { #wifi }

本站收录的 SF32 产品均未集成 Wi-Fi 无线电。选型器中的 Wi-Fi 选项表示可通过 SDIO 外接 Wi-Fi 器件，并非内置 Wi-Fi。外接器件还需要匹配的供电、引脚、驱动和网络软件；仅有 SDIO 并不代表已有可用的完整方案。

[产品选型器](../product-selector.md)

### 实际有多少 GPIO 可用？ { #usable-gpios }

按具体封装和存储配置核算，再扣除所需接口及板级功能占用的引脚。模组只引出了芯片的部分引脚。对于 SF32LB57x BGA112，额外的 MPI3/静态输出引脚属于受限功能引脚，不能自由分配为 GPIO。不要直接把宣传的引脚数量当作应用可用 GPIO 预算。

[系列 GPIO 说明](SF32_family.md) · [SF32LB57x 型号](../chips/SF32LB57x.md)

## 供货与产品规划 { #availability-and-product-planning }

### 模组合规标识对我的产品意味着什么？ { #module-markings }

先查阅模组页面的标识汇总，确认哪些型号带有相关标识，再索取适用的批准文件和集成条件。仅凭印刷的 FCC 编号或 CE 标志，不能认定最终产品也符合相关要求。天线、载板或外壳发生变化时，应根据适用条件重新评审。

[52 模组标识](../modules/SF32LB52-MOD-1.md#regulatory-markings) · [56 模组标识](../modules/SF32LB56-MOD.md#regulatory-markings) · [58 模组标识](../modules/SF32LB58-MOD.md#regulatory-markings)

### 能否申请其他存储或模组配置？ { #custom-configurations }

联系 μForge.io 时，请说明目标芯片或模组、存储和 PSRAM 容量、接口、天线要求、预计用量及项目进度。设计定型前，应确认方案可行性、SDK 支持、最小订购量和交期。旧资料列出的配置不代表目前仍有供货；SF32LB58-MOD-E4R32N1 已因近期存储芯片供应短缺而停售。

[联系 μForge.io](../../about/contact.md) · [58 模组供货情况](../modules/SF32LB58-MOD.md#storage-interfaces-and-module-variants)

### 如何确认供货并获取样品？ { #samples-and-documentation }

通过目标产品页面上的购买及文档链接获取信息。联系供应商时，提供完整订购代码和所需版本，并确认当前供货状态、存储配置、天线选项及交期。条件允许时，先使用受支持的评估板；最终设计应以具体型号的官方文档为准，而非系列概述。

[联系 μForge.io](../../about/contact.md) · [产品选型器](../product-selector.md)
