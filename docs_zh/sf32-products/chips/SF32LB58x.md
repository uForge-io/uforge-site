---
icon: lucide/microchip
description: "SF32LB58x：SF32LB5x 系列旗舰档 AIoT MCU，面向图形、显示、存储和外设需求较高的连接型产品。"
tags:
    - 硬件
    - 芯片
---

# SF32LB58x { #sf32lb58x }

## 概览 { #overview }

SF32LB58x 系列属于 SF32LB5x 家族中的旗舰级产品，面向需要高级图形、大容量内存、双模蓝牙（Bluetooth）、丰富音频和显示接口以及大量 GPIO 的电池供电 AIoT 产品，同时无需转向规模更大的应用处理器平台。

SF32LB58x 采用由 3 个 Arm Cortex-M33 STAR-MC1[^1] 核心组成的异构架构。HCPU 和 ACPU 是高性能核心，最高运行频率为 240 MHz；LCPU 最高运行频率为 96 MHz，适合处理对功耗敏感的任务。HCPU 负责系统控制、用户界面和通用应用处理；ACPU 可承担音频 DSP 任务；LCPU 适合处理蓝牙 LE、传感器采集等低功耗工作。合理划分任务后，固件可在适用场景下关闭 HCPU；实际节电效果取决于应用负载和固件实现。

思澈科技（SiFli）资料显示，SF32LB58x 片上集成 3,744 KB SRAM；不同 SKU 提供合封 NOR Flash、OPI-PSRAM 和 HPI-PSRAM 的不同组合。该系列还支持 MIPI DSI 等显示接口、矢量图形加速和 USB 2.0 High-Speed，并采用高 I/O 数量的 BGA 封装。若设计需要高分辨率 UI、大量图形资源、通过 SDIO 连接外部 Wi-Fi，或需要足够的计算与内存资源来运行边缘 AI、传感器融合任务，可以评估 SF32LB58x。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

## 应用场景 { #applications }

**SF32LB58x 适用于**需要更大帧缓冲、更强显示能力、更大内存和更多高速 I/O 的高端连接型产品，包括：

- 高端智能手表与运动手表
- 高分辨率可穿戴 HMI
- 骑行码表与智能仪表盘
- 便携式医疗与工业终端
- 蓝牙 + 外部 Wi-Fi 配件
- 边缘 AI 与传感器融合系统
- 以显示为核心的联网控制终端

设计具备以下一项或多项需求时，请选择 SF32LB58x：

- 显示分辨率达到或高于 1024 × 600
- 需要 MIPI DSI 命令模式或视频模式显示
- 需要矢量图形、更复杂动画或更大 UI 资源
- 需要通过 SDIO 连接外部 Wi-Fi
- 需要更大的帧缓冲、音频、图形或 AI 模型内存
- 需要较高 GPIO 数量或多路高速外部接口

## 开发资源 { #development-resources }

[产品简介]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB58x/PB5801-SF32LB58x-%E4%BA%A7%E5%93%81%E7%AE%80%E4%BB%8B%20V0p72.pdf
[数据手册]: https://downloads.sifli.com/docs/Datasheet/sf32lb58/DS5801-SF32LB58x-Datasheet%20V1p8p6.pdf
[用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801-SF32LB58x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p4p6.pdf
[原始设计指南（wiki.sifli.com）]: https://wiki.sifli.com/en/hardware/SF32LB58x-HW-Application.html
[硬件应用说明（GitHub 源文件）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB58x-HW-Application.md
[硬件设计指南（μForge）]: ../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[产品简介]__
- :fontawesome-solid-file-pdf: __[数据手册]__
- :fontawesome-solid-file-pdf: __[用户手册]__
- :fontawesome-solid-file-lines: __[原始设计指南（wiki.sifli.com）]__
- :fontawesome-brands-github: __[硬件应用说明（GitHub 源文件）]__
- :fontawesome-solid-file-lines: __[硬件设计指南（μForge）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与存储 { #compute-and-memory }

- 3 个 Arm Cortex-M33 STAR-MC1 核心：HCPU 和 ACPU 最高 240 MHz，LCPU 最高 96 MHz
- 3,744 KB 片上 SRAM
- 合封 NOR Flash 选项的封装内总容量为 1 MB 至 8 MB，具体取决于 SKU
- 可选合封 OPI-PSRAM 或 HPI-PSRAM；HPI-PSRAM 最高为 2 × 32 MB，具体取决于 SKU
- 外部 NOR 或 SPI NAND Flash 可通过 MPI3/MPI4 连接；SD NAND、eMMC、SD 卡或外部 Wi-Fi 可通过 SDIO 连接。具体可用组合取决于接口选择和引脚分配。

### 图形、显示与 AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5D 图形加速器
- Vivante GCNanoUltraV 矢量图形引擎
- eZip 2.0 无损图形解压缩加速器
- 硬件 JPEG/MJPEG 编解码，并支持图像裁剪与缩放
- 面向 TinyML 工作负载的神经网络矩阵加速器
- 显示分辨率最高支持 1280 × 800
- 支持 MIPI DSI 命令模式与视频模式显示
- 支持 SPI、DSPI、QSPI（包括 SPI 电子纸）、MCU8080、JDI、RGB/DPI（RGB888 或 RGB565）与 MIPI DSI 显示接口
- 支持 MIPI DSI 与 SPI、DSPI 或 QSPI 组合的双屏异显
- 适用于本地边缘 AI、机器学习和传感器融合类任务

### 音频与无线连接 { #audio-and-wireless-connectivity }

- 双模蓝牙 5.3
- 同时支持经典蓝牙（Bluetooth Classic）与低功耗蓝牙（Bluetooth LE）
- 支持通过 SDIO 扩展外部 Wi-Fi
- 2 路集成音频 ADC
- 2 路集成音频 DAC
- 2 路 PDM 接口，每路最多可连接 2 个数字麦克风；PDM 接口数量不等于麦克风数量，实际可接入数量还受引脚复用和 PCB 布线限制
- 3 路 I2S 接口：I2S1 仅支持输入，I2S2 和 I2S3 支持输入与输出；均仅工作于主机模式
- USB 2.0 High-Speed，支持主机和设备模式

### 系统集成 { #system-integration }

- 片上集成 PMU，提供 2 路 BUCK 输出和 3 路 LDO 输出
- 可选用 SF30147C PMIC，为可穿戴设备的电源树设计提供支持
- BGA256 封装适合在单颗 MCU 中集成显示、存储、音频和连接功能的高密度设计
- 片上 SRAM、合封 PSRAM 选项和显示接口适用于图形处理与内存需求较高的设计

### 外设与 I/O { #peripherals-and-ios }

**GPIO 数量说明：**当前[思澈科技（SiFli）芯片型号指南](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)对所列 SF32LB58x 型号标注 HCPU GPIO 94 路、LCPU GPIO 66 路，共 160 路。较早的数据手册将数量拆分为 HPSYS GPIO 94 路、LPSYS GPIO 60 路，另列 6 路 AON GPO（即 154 路 GPIO + 6 路 AON GPO）。两份资料对这 6 路常开输出的分类口径不同，因此不能仅凭分类差异认定封装 I/O 总数不同，也不能把型号指南所列的 160 路都视为可任意分配的 GPIO。思澈科技（SiFli）的[芯片产品目录](https://wiki.sifli.com/silicon/index.html)提供当前 V1.8.6 数据手册的下载链接。布板前，应根据该数据手册和目标可订购型号的引脚功能表核实 GPIO 数量及各引脚功能。思澈科技（SiFli）的 [GPIO FAQ](https://wiki.sifli.com/faq/mcu/gpio.html) 将 PBR 作为独立的低功耗 I/O 组；除非资料明确计入，否则不要将 PBR 加入 HCPU/LCPU GPIO 总数。

- 160 路 GPIO（HCPU 94 路 + LCPU 66 路，依据当前芯片型号指南）
- 2 路 CAN 接口
- 2 路 SDIO 接口
- SWD 调试接口
- 6 路可配置为调试输出的 UART 接口
- RTC、看门狗、GPIO 唤醒、PBR 唤醒、PWM、I2C、SPI 与通用模拟接口
- BGA256 封装，适合高密度设计

### 电源与封装 { #power-supply-and-package }

- 供电范围：1.71 V 至 3.63 V
- BGA256 封装，尺寸 6.5 × 8.5 × 0.94 mm，引脚间距 0.4 mm
- 需要 HDI PCB；量产设计建议采用 6HDI-2 叠层

## 系列型号 { #family-variants }

思澈科技（SiFli）当前芯片型号指南列出了 6 种 SF32LB58x 订购型号，均采用 BGA256 封装，合封存储配置如下表所示。存储组合及供货状态可能变化；确认具体订购型号时，请以当前数据手册和合格供应商名录（AVL）为准。

<div align="center"><em>SF32LB58x 订购型号与合封存储配置</em></div>

<div align="center" markdown>

| 料号 | 封装 | 合封存储 |
| :--- | :--- | :--- |
| SF32LB580VNN36 | BGA256 | 1 MB 启动 NOR Flash；MPI1 和 MPI2 均未合封存储 |
| SF32LB581VCN36 | BGA256 | 1 MB 启动 NOR Flash + MPI1 上的 8 MB OPI-PSRAM |
| SF32LB583VCC36 | BGA256 | 1 MB 启动 NOR Flash + MPI1、MPI2 各 8 MB OPI-PSRAM |
| SF32LB585V5E56 | BGA256 | 4 MB 启动 NOR Flash + MPI1 上的 4 MB NOR Flash + MPI2 上的 32 MB HPI-PSRAM |
| SF32LB586VDD36 | BGA256 | 1 MB 启动 NOR Flash + MPI1、MPI2 各 16 MB HPI-PSRAM |
| SF32LB587VEE56 | BGA256 | 4 MB 启动 NOR Flash + MPI1、MPI2 各 32 MB HPI-PSRAM |

</div>

选择具体型号时，建议优先确认以下内容：

- 帧缓冲、图形资源、音频与模型所需的内存容量
- 显示接口与目标分辨率
- 外部存储与外部 Wi-Fi 接口需求
- BGA256、0.4 mm 间距 HDI 布局对应的 PCB 制造能力

## 集成路径 { #integration-path }

使用以下顺序将 SF32LB58x 的初步选型推进为已验证的设计：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证显示、图形、音频、存储和蓝牙配置。
2. **选择集成载体。** 若要降低 RF、BGA 和内存布局风险，请评估 [SF32LB58-MOD](../modules/SF32LB58-MOD.md)；也可使用 [SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) 进行早期板级验证。
3. **进行硬件设计与评审。** 在发布原理图或布局前，使用本地[硬件设计指南](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md)，包括其[原理图](../../hardware/chip-guides/SF32LB58x_schematic_checklist.md)和 [PCB 布局](../../hardware/chip-guides/SF32LB58x_pcb_layout_checklist.md)核对表。尽早验证 BGA256 HDI 和内存布线假设。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对思澈科技（SiFli）的[数据手册]、[用户手册]、[原始硬件设计指南][原始设计指南（wiki.sifli.com）]和[硬件应用说明源文件][硬件应用说明（GitHub 源文件）]。

<!-- uf-faq:start -->
## 常见问题 { #frequently-asked-questions }

**SF32LB58x 的主要规格是什么？**
SF32LB58x 由应用 CPU（2× Cortex-M33 @240 MHz）与低功耗内核（Cortex-M33 @48/96 MHz，用户可编程内核）组成，内置 3.7 MB SRAM，支持双模蓝牙（经典蓝牙 + BLE）。图形：ePicasso 2.0 + Vivante GCNanoUltraV (vector)。封装：BGA256（8.5 × 6.5 mm）。USB 2.0 HS。以上为系列级参数，具体以所选型号的数据手册为准。

**SF32LB58x 支持哪些显示接口？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI。具体支持情况因型号和封装而异。

**SF32LB58x 的封装内存储器有多大？**
按型号不同，封装内 PSRAM 最多 32 MB + 32 MB，封装内 NOR Flash 最多 8 MB。

**SF32LB58x 需要什么供电电压？**
按变体不同为 1.71–3.63 V，请以数据手册确认具体范围。

**如何开始基于 SF32LB58x 的硬件设计？**
请先阅读 [SF32LB58x 硬件设计指南](../../hardware/chip-guides/SF32LB58x_hardware_design_guide.md)，了解原理图、电源、时钟/RF 和 PCB 布局要求，并在投板前使用原理图与布局检查清单。
<!-- uf-faq:end -->

## 相关产品 { #related-products }

### 模组 { #module }

[SF32LB58-MOD](../modules/SF32LB58-MOD.md) 将 SF32LB586VDD36 芯片、射频匹配网络，以及封装内 HPI-PSRAM 与存储选项整合为可直接导入设计的模组。若项目需要 58 系列的能力，又希望在硬件开发早期降低 RF、BGA 与存储布局风险，可使用该模组。

### 开发板 { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) 是电源树、显示、存储、音频、RF、USB 和 SDIO 设计决策的起点。

### 参考产品 { #reference-products }

SF32LB58x 的典型终端产品包括高端手表平台、高分辨率可穿戴 HMI、智能仪表盘、便携式联网终端，以及兼具蓝牙、显示、音频、存储和本地 AI 负载的设备。
