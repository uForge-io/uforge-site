---
icon: lucide/microchip
description: "SF32LB57x：面向图形显示、音频和摄像头应用的超低功耗多核 AIoT MCU 家族，集成双模蓝牙、双 240 MHz 性能核、24 MHz 能效核、ePicasso 3.0 图形引擎、eZip 3.0 解压缩引擎与紧凑 QFN/BGA 封装。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x { #sf32lb57x }

## 概览 { #overview }

SF32LB57x 是增强型超低功耗 AIoT MCU 系列，面向可穿戴设备、便携式智能设备、智能家居和紧凑型显示产品。这些产品通常需要更强的图形处理能力、蓝牙（Bluetooth）音频、摄像头输入、外部存储和常开运行能力，普通蓝牙 MCU 难以兼顾这些需求；同时，SF32LB57x 又避免了应用处理器级平台在功耗、成本和集成方面的负担。作为思澈科技（SiFli）2026 年推出的产品，SF32LB57x 定位为 SF32LB52x 和 SF32LB56x 的升级款，并力求保持成本竞争力。它提升了 CPU 和图形性能，在低成本、易于装配的 QFN 封装中提供更多 GPIO，并支持更灵活的合封存储组合。其图形显示分辨率最高可达 1024 × 600，色彩格式为 RGB888（24 位）。

SF32LB57x 采用三核 Arm Cortex-M33 STAR-MC1[^1] 架构：两颗性能核 HCPU 和 ACPU 的最高频率均为 240 MHz，合计性能为 1968 CoreMark / 740 DMIPS；另有一颗 24 MHz 的低功耗核 LCPU。根据思澈科技（SiFli）的 [ACPU 使用指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html)，ACPU 负责音频和图形处理，LCPU 则以较低功耗处理 BLE 和传感器数据任务。平台还集成 592 KB 保留 SRAM、ePicasso 3.0 图形引擎、eZip 3.0 解压缩引擎、LCD 和 DCMI 摄像头控制器、双模蓝牙、音频 ADC/DAC、SiP 与外部存储接口、安全加速功能，以及 FreeIO 引脚分配。该系列的一项关键差异化能力是 PTM（并行任务机，Parallel Task Machine）：这是一种小型并行任务处理器，可接管对周期敏感的外设时序、自定义 IO 协议、传感器采集、类 PWM 时序和事件处理，减少主 CPU 的持续负担。

复用原理图或开始 PCB 布局前，先确定准确的可订购料号。SF32LB57x 提供 QFN68、QFN80 和 BGA112 封装；不同料号家族分别对应电池供电或外部稳压 3.3 V 供电基线。封装和供电方案会影响电源树、GPIO 数量、封装扇出、显示与存储布线、调试接口及启动调试策略。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

[^2]: **仅适用于 BGA112。** SF32LB57x 芯片内部集成 MPI1、MPI2 和 MPI3；各接口对应的合封存储位置见 [SF32 芯片型号命名规则](../family/SF32_namingrule.md)。在以下任一合封存储配置下，MPI2 和 MPI3 引脚均无法从封装外部访问，因此可用 GPIO 固定为 58 路：(1) MPI2 上合封一颗 PSRAM，无论是否同时在 MPI1 上合封另一颗 PSRAM；或 (2) MPI3 上合封 NOR Flash。`SF32LB57GVD776` 属于第 (2) 种情况：其第二个 `7` 表示内部器件使用 MPI3，因此仅有 58 路 GPIO。其余配置下，BGA112 上与 MPI3 关联的 6 路 I/O 可用于 MPI3，或通过上拉或下拉配置为 GP 静态输出；它们并非可自由分配的 GPIO。因此，`SF32LB57ZVN7N6` 的 `58 + 6` 表示 58 路可用 GPIO，加上 6 路可用于 MPI3 或静态输出的引脚，而不是 64 路可自由分配的 GPIO。该限制不适用于 QFN68 或 QFN80 封装；这两种封装仅提供标称 GPIO 路数，没有额外的 MPI3 或静态输出选项。

[^3]: 封装尺寸和厚度依据思澈科技（SiFli）SF32LB57x 数据手册（DS5701 和 DS5702）中的订购表和封装图纸：QFN68（7 × 7 mm，图纸为 0.9 mm 或 1.1 mm）、QFN80（8 × 8 mm，图纸为 0.9 mm 或 1.1 mm）以及 BGA112（5.4 × 4.4 mm，0.98 mm）。含三颗存储晶粒的型号（一颗 PSRAM 加双晶粒 QSPI-NOR）采用较厚的封装规格：QFN68 为 1.1 mm，BGA112 为 1.03 mm，依据思澈科技（SiFli）硬件应用指南。数据手册订购表未列出 SF32LB57ZVN7N6，其 BGA112 厚度取自数据手册中唯一的 BGA112 图纸（0.98 mm）。SF32LB57x 专用型号编码图中，U 对应 QFN68、Y 对应 QFN80、V 对应 BGA112；不要据此推断其他 SF32 系列也使用相同的 Y 封装代码。具体料号的封装厚度及封装图纸，请向思澈科技（SiFli）确认。

[^4]: 对于电池供电系列，思澈科技（SiFli）的 SF32LB57x 数据手册（DS5701）规定 VBAT 和 VCC 为 3.0–4.7 V，上电电压为 3.5 V ±10 %。思澈科技（SiFli）的硬件设计指南给出的输入范围较窄，为 3.45–4.7 V（QFN68 表 2-1-1、QFN80 表 2-1-3、BGA112 表 2-1-5）；两份文档存在差异，具体型号适用的输入引脚和限制，请以对应数据手册为准。
[^5]: 表中的 I/O 电压是对芯片支持的 I/O 电压域的概括，不表示每个引脚都可任选其中任一电压。VDDIOA（如单独供电）为 GPIO 供电；VDDIOSB（如有）是 SiP 合封存储的 I/O 电源。思澈科技（SiFli）的指南规定合封 PSRAM 时 VDDIOSB 为 1.8 V，合封 NOR Flash 时为 3.3 V。对于 QFN68 3.3 V 供电系列，表 2-1-2 规定 VDDIOA 仅使用 3.3 V。具体引脚和电压域请以封装指南及对应料号数据手册为准。
[^6]: 双晶粒：两颗晶粒是独立的存储器件，分别接在独立的 MPI 接口上，可独立访问。

## 应用场景 { #applications }

**SF32LB57x 非常适合**在低功耗 MCU 平台上组合使用图形界面、蓝牙音频、摄像头、外部存储或常开传感功能的紧凑型联网产品，例如：

- 智能手表、健身手环和可穿戴医疗设备
- 智能人机交互设备、以显示为中心的终端和控制面板
- 电子纸智能设备和电子相框
- 中小型智能家电和智能门锁
- 便携式录音、音频产品，以及蓝牙对讲机和对讲设备
- 带摄像头的可穿戴或手持设备
- 工业显示、传感、监测和仪器仪表产品
- 车载中控设备、无线汽车钥匙和车载遥控器
- 蓝牙 Mesh 与低功耗传感器中枢网络

上述应用所需的图形、摄像头、音频、存储和 PTM 能力，见[特性与规格](#features-and-specs)。蓝牙 6.3 版本依据 SF32LB57x 数据手册；产品简介中仍列有较早版本。可选功能请以思澈科技（SiFli）针对具体可订购型号发布的最新文档为准。

## 开发资源 { #development-resources }

[硬件设计指南（μForge）]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[合格供应商名录（AVL）]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __产品简介（[锂电池供电](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/PB5701-SF32LB57x-Product%20Brief%20v0.4.pdf)，[3.3 V 供电](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/PB5702-SF32LB57X-Product%20Brief%20v0p4.pdf)）__
- :fontawesome-solid-file-pdf: __数据手册（[锂电池供电 / ZH](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/DS5701-SF32LB57x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf)，[3.3 V 供电 / ZH](https://downloads.sifli.com/docs/Datasheet/%E5%B8%B8%E4%BE%9B%E7%94%B5/DS5702-SF32LB57X-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p2p2.pdf)）__
- :fontawesome-solid-file-pdf: __[用户手册（ZH）](https://downloads.sifli.com/docs/Datasheet/%E9%94%82%E7%94%B5/UM5701-SF32LB57x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p1.pdf)__
- :fontawesome-solid-file-lines: __[原始设计指南（wiki.sifli.com，ZH）](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)__
- :fontawesome-solid-file-lines: __[开发板使用指南（wiki.sifli.com，ZH）](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)__
- :fontawesome-solid-file-lines: __[硬件设计指南（μForge）]__
- :fontawesome-solid-file-excel: __[合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与内存 { #compute-and-memory }

- 2 个 Arm Cortex-M33 STAR-MC1 性能核，最高 240 MHz，带 FPU 与 MPU（合计 1968 CoreMark / 740 DMIPS）
- 1 个 Arm Cortex-M33 STAR-MC1 低功耗核，24 MHz
- 32 KB 指令缓存 + 16 KB 数据缓存（HCPU）
- 592 KB 保留 SRAM（512 KB HPSYS + 80 KB LPSYS），含 128 KB 零等待周期 D-TCM
- 合封存储随具体型号变化，最高 48 MB PSRAM 和 32 MB NOR Flash

### PTM 并行任务机 { #ptm-peripheral-task-machine }

- 4 核 Parallel Task Machine，用于自定义外设任务，由硬件定时执行，无需 CPU 持续服务
- 周期级时序控制，适合确定性 IO 时序
- 每核最多 16 路 IO，支持 FIFO/DMA
- 可访问 AHB 总线上的存储器和外设寄存器，并支持 CPU 中断及核间事件

### 无线连接 { #wireless-connectivity }

- 双模蓝牙 6.3（经典蓝牙 + BLE），支持 BLE Audio 与 LE Long Range
- 最大发射功率：
    - BLE/BR 为 17 dBm
    - EDR2 和 EDR3 为 13 dBm
- 灵敏度：-100 dBm @ BLE 1 Mbps

### 图形、显示与摄像头 { #graphics-display-and-camera }

各型号支持的最高分辨率和面板接口，见[按器件划分的接口矩阵](../../learn/graphics/display-controller.md#per-device-interface-matrix)。

- ePicasso 3.0 2D/2.5D 图形加速器，最大 2048 × 2048
- eZip 3.0 硬件解码器，支持无损 eZip/eZip-A，以及 JPEG 和 MJPEG
- 专用 LCD 控制器，支持 8080、SPI/DSPI/QSPI、DPI/RGB、JDI 和 8/16 位 EPD
- DCMI 摄像头控制器，支持 DVP 和 SPI/DSPI/QSPI

### 音频与模拟 { #audio-and-analog }

- 1 路 24 位音频 DAC，109 dB 信噪比
- 2 路 24 位音频 ADC，97 dB 信噪比
- 1 路 12 位通用 ADC（12 通道）
- 温度传感器

### 存储与安全 { #storage-and-security }

- 3 路 MPI（QSPI），支持 NOR、NAND 和 QPI-PSRAM，支持 XIP
- 2 路 SD3.0/SDIO3.0/eMMC
- AES/HASH/CRC 硬件加速器
- TRNG
- Flash 实时解密与 eShield 安全架构
- PSA Certified Level 1

### 外设与 I/O { #peripherals-and-ios }

- 3 路 UART
- 4 路 I2C
- 2 路 SPI
- 2 路 I2S
- 2 路 PDM 接口（每路最多可连接 2 个数字麦克风）
- 1 路 USB 2.0 FS
- 2 路 CAN
- RTC、看门狗和通用定时器（GPTIM、BTIM、ATIM、LPTIM），支持 PWM
- 最多 58 路 GPIO（取决于封装和料号），支持 FreeIO 灵活分配

### 电源管理 { #power-management }

- 集成 Buck 与低功耗 LDO；两路对外 3.3 V 输出，每路最大 150 mA
- 休眠（Hibernate）电流：3.8 V（电池供电基线）下 2.8 µA，或 3.3 V（外部供电基线）下 1 µA
- 电池供电基线集成锂离子充电器，最高 400 mA（4.2 V 至 4.45 V）
- 电池/系统输入范围[^4]：3.0 V 至 4.7 V
- VBUS 范围：4.5 V 至 5.5 V
- 工作温度范围：−40°C 至 +85°C

## 型号与封装 { #family-variants }

SF32LB57x 包括电池供电型号和采用外部稳压 3.3 V 供电的型号。由于封装图、供电脚、可用 GPIO 数量、合封存储和板级约束都会随具体型号变化，应在原理图设计前先确定准确料号。

下表所列料号取自思澈科技（SiFli）SF32LB57x 数据手册（DS5701 和 DS5702，均为初稿）的订购表，但 `SF32LB57ZVN7N6` 除外，这些订购表中没有该料号。在设计导入前，请依据思澈科技（SiFli）最新的具体料号资料，确认订货编码、合封存储配置、电气限制和封装图纸。

按选型可分为以下几组：

- **`SF32LB57xU`**：QFN68，锂离子电池供电组（数字层级，如 `3`/`5`/`7`）
- **`SF32LB57XU`**：QFN68，标准外部 3.3 V 供电组（字母层级，如 `Z`/`C`/`E`/`F`/`G`/`H`/`J`）
- **`SF32LB57XY`** / **`SF32LB57XV`**：QFN80 / BGA112，外部 3.3 V 供电组。

电池供电系列数据手册（DS5701）还列出了电池供电的 QFN80（8 × 8 mm，58 路 GPIO）和电池供电的 BGA112（最多 58 路 GPIO，外加 6 路 GPO 或 MPI 接口 I/O）。但其订购表中没有电池供电 QFN80 或 BGA112 的料号，因此在围绕这两种封装展开设计之前，请向思澈科技（SiFli）确认可订购型号。

<div align="center"><em>SF32LB57x QFN68 型号（57xU / 57XU）</em></div>

<div align="center" markdown>

| SF32LB | 573UB7N6 | 573UB766 | 573UB776 | 575UCNN6 | 577UDNN6 | 57ZUN3N6 |
|:-|-:|-:|-:|-:|-:|-:|
| 封装 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 | QFN68 |
| 平面尺寸[^3] | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm | 7 × 7 mm |
| 厚度[^3] | 0.9 mm | 1.1 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| 引脚间距 | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| 合封 PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 4 MB OPI-PSRAM | 8 MB OPI-PSRAM | 16 MB OPI-PSRAM | 无 |
| 合封 NOR Flash | 16 MB QSPI-NOR | 16 MB+8 MB QSPI-NOR（双晶粒）[^6] | 16 MB×2 QSPI-NOR（双晶粒）[^6] | 无 | 无 | 1 MB QSPI-NOR |
| 供电电压[^4] | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | 3.0–4.7 V | **3.3 V** |
| I/O 电压[^5] | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V | 3.3 V / 1.8 V |
| 工作温度 | −40 至 85°C | −40 至 85°C | −40 至 85°C | −40 至 85°C | −40 至 85°C | −40 至 85°C |

</div>

<div align="center"><em>SF32LB57x QFN80 / BGA112 型号（57XY / 57XV）</em></div>

<div align="center" markdown>

| SF32LB | 57EYBBN6 | 57GYD7N6 | 57ZVN7N6 | 57GVD776 |
|:-|-:|-:|-:|-:|
| 封装 | QFN80 | QFN80 | BGA112 | BGA112 |
| 平面尺寸[^3] | 8 × 8 mm | 8 × 8 mm | 5.4 × 4.4 mm | 5.4 × 4.4 mm |
| 厚度[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 1.03 mm |
| 引脚间距 | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6（MPI3 或静态输出）[^2] | 58[^2] |
| 合封 PSRAM | 8 MB（2×4 MB 双晶粒）OPI-PSRAM[^6] | 16 MB OPI-PSRAM | 无 | 16 MB OPI-PSRAM |
| 合封 NOR Flash | 无 | 16 MB QSPI-NOR | 16 MB QSPI-NOR | 32 MB（2×16 MB 双晶粒）QSPI-NOR[^6] |
| 供电电压 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O 电压[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 工作温度 | −40 至 85°C | −40 至 85°C | −40 至 85°C | −40 至 85°C |

</div>

对 SF32LB57x 而言，封装选择不只是 PCB 成本问题，还会影响显示接口可用性、外部存储布线、GPIO 预算、调试下载保留引脚以及 PCB 扇出难度，因此应与供电架构一起尽早锁定。请以可订购料号而非仅封装名称作为 BOM 和原理图基线——存储后缀会改变 SiP 存储配置，并可能影响启动介质假设、电源时序和外部存储需求。

## 集成路径 { #integration-path }

使用以下顺序将 SF32LB57x 的初步选型推进为已验证的设计：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证计划使用的图形、音频、摄像头、蓝牙和存储功能。
2. **规划评估硬件。** 使用 [SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) 评估显示、摄像头、音频和连接功能。在将其作为 57x 产品设计的参考平台前，先确认模组存储配置、开发板版本及复用引脚配置。
3. **进行硬件设计与评审。** 在发布原理图或布局前，使用本地[硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)——包括其[客户设计自查表](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check)——以及[面向量产的设计](../../hardware/design-for-production.md)中的评审顺序；μForge 当前尚未发布该系列专用检查清单。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对思澈科技（SiFli）的[数据手册]、[用户手册]和[原始设计指南（wiki.sifli.com）]；控制关键 BOM 选型时，请使用[合格供应商名录（AVL）]。

<!-- uf-faq:start -->
## 常见问题 { #frequently-asked-questions }

**SF32LB57x 的主要规格是什么？**
SF32LB57x 配备应用 CPU（2× Cortex-M33 @240 MHz）、低功耗内核（Cortex-M33 @24 MHz，专用蓝牙控制器）和 592 KB SRAM，支持双模蓝牙（经典蓝牙 + BLE）。图形：ePicasso 3.0 + eZip 3.0。封装：QFN68 / QFN80 / BGA112（7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)）。USB 2.0 FS。

**SF32LB57x 支持哪些显示接口？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB。各接口适用型号见[按器件划分的接口矩阵](../../learn/graphics/display-controller.md#per-device-interface-matrix)。

**SF32LB57x 支持的最大显示分辨率是多少？**
通过 DPI/RGB 接口，最高支持 1024 × 600、RGB888。详见[按器件划分的接口矩阵](../../learn/graphics/display-controller.md#per-device-interface-matrix)。

**SF32LB57x 的封装内存储器有多大？**
封装内 PSRAM 最多 48 MB，封装内 NOR Flash 最多 32 MB。

**SF32LB57x 需要什么供电电压？**
3.0–4.7 V 或 2.97–3.63 V。

**如何开始基于 SF32LB57x 的硬件设计？**
请先阅读 [SF32LB57x 硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)，了解原理图、电源、时钟/RF 和 PCB 布局要求；投板前再使用原理图与布局检查清单。
<!-- uf-faq:end -->

## 相关产品 { #related-products }

### 硬件设计基线 { #hardware-design-baseline }

请以[硬件设计指南（μForge）](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)、官方硬件应用说明、数据手册和合格供应商名录（AVL）作为设计基线。发布原理图或 PCB 前，请确认电源架构、封装扇出、显示、存储、音频、摄像头、RF 和调试/下载方案。

### 开发板 { #development-kits }

[SF32LB57-DevKit-LCD](../devkits/SF32LB57-DevKit-LCD.md) 是一款评估板，可用于评估 RGB 显示屏、DVP 摄像头、双 PDM 麦克风、扬声器输出、SDIO Wi-Fi 和 USB。该板基于 SF32LB57 核心板；在 SF32LB57 模组完成射频认证并正式上市前，这块核心板承担模组的角色。

使用官方参考原理图、最小系统连接方式和检查清单资料，规划电源、时钟、RF、显示、存储、音频、摄像头和量产接口。

### 参考产品 { #reference-products }

SF32LB57x 的典型终端产品包括可穿戴智能手表和手环、智能 HMI 设备、电子纸产品、中小型智能家电、便携式录音/音频设备、智能家居面板、紧凑型显示终端，以及带摄像头的蓝牙产品。
