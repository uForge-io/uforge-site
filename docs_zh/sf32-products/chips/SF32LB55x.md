---
icon: lucide/microchip
description: "SF32LB55x：面向可穿戴与紧凑型 HMI 产品的主流超低功耗 BLE MCU 系列，提供比入门级器件更强的图形能力、更大的 SRAM，以及更灵活的封装选择。"
tags:
    - 硬件
    - 芯片
---

# SF32LB55x { #sf32lb55x }

## 概览 { #overview }

SF32LB55x 系列是主流超低功耗 AIoT 微控制器，面向 BLE 连接产品。与入门级蓝牙（Bluetooth）MCU 相比，这类产品通常需要更强的显示能力、更大的内存容量和更多封装选择。

它采用 big.LITTLE 双核架构，由两个 Arm Cortex-M33 STAR-MC1[^1] 处理器组成：高性能应用核最高运行频率为 240 MHz，超低功耗核最高运行频率为 48 MHz。这样，应用核可处理负载较重的 UI，低功耗核则负责传感器处理、待机控制以及需要持续运行的 BLE 任务。

根据思澈科技（SiFli）官方产品简介和数据手册，SF32LB55x 支持 BLE 5.2，集成 ePicasso 2.5D 图形引擎、双 LCD 控制器和面向 TinyML 的神经网络矩阵加速器；片上 SRAM 共 1,312 KB（HCPU 1,088 KB + LCPU 224 KB），并支持 NOR、NAND、eMMC、PSRAM 等外部存储器。因此，对于需要比 SF32LB52x 更充足资源、又无需采用 56/58 系列更高规格器件的可穿戴设备、传感器密集型产品和紧凑型 HMI，SF32LB55x 是值得考虑的选择。

思澈科技（SiFli）的芯片型号指南还指出，SF32LB55x 的定义早于后续的 52/56/58 系列，因此其型号后缀并未完全遵循这些系列采用的编号规则。选型时应以完整的可订购料号和对应封装的能力表为准，不要仅凭后缀推断器件的全部特性。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

## 应用场景 { #applications }

**SF32LB55x 适用于**以 BLE 为核心、但又需要更强图形能力、更大工作内存或更灵活封装方案的产品，包括：

- 智能手表和运动手环
- 健康监测类可穿戴设备
- 智能门锁与智能家居控制器
- 配备多种传感器的联网配件
- 紧凑型图形化 HMI 产品
- 智能触控笔及笔式交互设备配件
- 便携式终端与手持控制设备

若设计需要以下一项或多项能力，可将 SF32LB55x 纳入候选：

- BLE 5.2 连接与极低接收电流
- MIPI DSI 命令模式显示支持
- 面向 LVGL、图形资源、传感器或 TinyML 的更大 SRAM
- 用户可编程的低功耗处理器
- 比 SF32LB52x 更多的 GPIO 或更密集的 BGA 封装
- NOR、NAND、eMMC、QSPI-PSRAM 或 OPI-PSRAM 的外部存储灵活性

## 开发资源 { #development-resources }

[产品简介]: https://downloads.sifli.com/silicon/PB0001-SF32LB55x-%E4%BA%A7%E5%93%81%E7%AE%80%E4%BB%8B%20V1p3.pdf
[数据手册]: https://downloads.sifli.com/docs/Datasheet/sf32lb55/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf
[用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB55x/UM5501-SF32LB55x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3p4.pdf
[原始设计指南（wiki.sifli.com）]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[硬件应用说明（GitHub 源文件）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB55x-HW-Application.md
[思澈科技（SiFli）芯片型号指南]: https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[硬件设计指南（μForge）]: ../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md
[硬件设计核对表来源]: https://wiki.sifli.com/hardware/index.html
[SDK 文档]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/index.html
[API 参考]: https://docs.sifli.com/projects/sdk/latest/sf32lb55x/api/index.html
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[产品简介]__
- :fontawesome-solid-file-pdf: __[数据手册]__
- :fontawesome-solid-file-pdf: __[用户手册]__
- :fontawesome-solid-file-lines: __[原始设计指南（wiki.sifli.com）]__
- :fontawesome-brands-github: __[硬件应用说明（GitHub 源文件）]__
- :fontawesome-solid-list: __[思澈科技（SiFli）芯片型号指南]__
- :fontawesome-solid-file-lines: __[硬件设计指南（μForge）]__
- :fontawesome-solid-book: __[SDK 文档]__
- :fontawesome-solid-book-open: __[API 参考]__
- :fontawesome-solid-list-check: __[硬件设计核对表来源]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与存储 { #compute-and-memory }

- 高性能 Arm Cortex-M33 STAR-MC1 应用处理器，最高 240 MHz
- 超低功耗 Arm Cortex-M33 STAR-MC1 处理器，最高 48 MHz
- 应用处理器最高 360 DMIPS / 965 EEMBC CoreMark
- 低功耗处理器最高 72 DMIPS / 193 EEMBC CoreMark
- 1,088 KB 应用 SRAM，其中包含 64 KB 保留 SRAM
- 224 KB 低功耗 SRAM，全部为保留 SRAM
- 支持 NOR、NAND、eMMC、QSPI-PSRAM 和 OPI-PSRAM 外部存储

### 图形、显示与 AI { #graphics-display-and-ai }

- ePicasso 2.5D 图形引擎，支持硬件旋转、缩放、镜像与 Alpha 混合
- eZip 可对图形进行无损解压，并可与 ePicasso 串联使用
- ePicasso 变换层分辨率最高为 640 × 640；通用图层和显示输出最高支持 1024 × 1024，显示输出最高可达 60 fps
- LCD 控制器支持 8080、SPI、Dual-SPI、Quad-SPI、DPI、MIPI DSI 和 JDI 反射式显示接口；具体接口取决于型号，选型时应逐项确认
- TurboPixel 帧缓冲压缩可让 LCD 控制器直接读取压缩帧数据并在显示时解压，从而减少帧缓冲占用和读取带宽需求
- 双 LCD 控制器；常亮显示接口和双屏能力取决于所选型号与封装
- 面向 TinyML 的神经网络矩阵加速器，最高 1.92 GOPS、5.73 TOPS/W

### 无线连接 { #wireless-connectivity }

- 低功耗蓝牙（Bluetooth Low Energy，BLE）5.2
- 支持 BLE 125 kbps、500 kbps、1 Mbps、2 Mbps 模式
- 1 Mbps 模式下灵敏度低至 -100 dBm
- 最大发射功率 10 dBm
- 接收峰值电流：3.3 V 下 2.0 mA

### 安全 { #security }

- AES 与 CRC 硬件加速器
- 真随机数发生器（TRNG）
- PSA Certified Level 1

### 外设与 I/O { #peripherals-and-ios }

- 全系列最多提供 5 路 UART、6 路 I2C 和 4 路 SPI；各型号的数量不同，见下表
- I2S 和 PDM 接口数量因型号而异，见下表。每路 PDM 接口最多可连接 2 个数字麦克风，因此接口数量不等于麦克风数量；还需核对所选型号的引脚配置。

<div align="center"><em>已公布的型号级外设与 ADC 数量（SS6600A8 未注明）</em></div>

<div align="center" markdown>

| 型号 | UART | I2C | SPI | I2S | PDM | 16 位 Sigma-Delta ADC |
| :--- | ---: | ---: | ---: | ---: | ---: | :--- |
| SS6600A8 | 未注明 | 未注明 | 未注明 | 未注明 | 未注明 | 未注明 |
| SF32LB551U4O5 | 2 | 3 | 2 | 1 | 1 | 不提供 |
| SF32LB555V4O6 / SF32LB555V436 | 5 | 5 | 4 | 1 | 1 | 5 通道 |
| SF32LB557VD3A6 | 5 | 6 | 4 | 2 | 2 | 5 通道 |

</div>

**SS6600A8 的来源说明：**当前[思澈科技（SiFli）芯片型号指南][思澈科技（SiFli）芯片型号指南]列出了该型号的封装、合封存储、GPIO 和显示接口，但没有给出其 UART、I2C、SPI、I2S、PDM 或 Sigma-Delta ADC 的型号级数量。[DS5501 V1.7.2 数据手册][数据手册]表 0-1 也没有单独列出 SS6600A8。因此，表中将这些数量标为“未注明”；不能仅因它与 SF32LB551U4O5 同为 QFN68L 封装，就直接套用后者的数据。分配管脚前，请向思澈科技（SiFli）确认具体配置。

- 1 路 USB 2.0 FS 主机/设备接口
- 1 路 10 位 GPADC（SAR ADC）：数据手册列出最多 8 路单端输入或 4 对差分输入，单端输入范围为 0–1.1 V
- **ADC 资料存在差异：**[DS5501 V1.7.2 数据手册][数据手册]列出最多 8 路单端输入或 4 对差分输入，单端输入范围为 0–1.1 V；[SF32LB55x 硬件应用说明][硬件应用说明（GitHub 源文件）]则记载 5 个通道、输入范围为 0–0.9 V。设计模拟前端前，请结合具体料号和 SDK 版本核实通道映射及输入限制。
- 上表中的 BGA145 和 BGA169 型号提供 1 路 16 位 Sigma-Delta ADC（5 通道）；QFN68L 型号不提供
- 温度传感器
- 2 路低功耗电压比较器
- 外设任务控制器（PTC）
- GPIO 数量因封装而异，详见下方封装表和资料差异说明

### 电源与封装 { #power-supply-and-package }

- 供电范围因型号而异：SS6600A8 为 2.97 V 至 3.63 V；551U4O5 和表列 BGA 型号为 1.71 V 至 3.63 V
- 工作温度因型号而异：资料列出的 QFN 型号为 −20 °C 至 +70 °C；表列 BGA 型号为 −40 °C 至 +85 °C
- 集成两路高效 BUCK 与低功耗 LDO 的电源管理
- RTC 唤醒下睡眠电流：600 nA
- 引脚唤醒下睡眠电流：280 nA
- 封装选项：QFN68L、BGA145、BGA169

## 系列型号 { #family-variants }

SF32LB55x 提供 QFN 与 BGA 封装。由于 GPIO 数量、合封存储、显示接口选择和 PCB 工艺要求都会随封装而变化，应尽早锁定封装方案。

对 55x 而言，封装选择不只是 PCB 成本问题。思澈科技（SiFli）的[芯片型号指南][思澈科技（SiFli）芯片型号指南]明确指出，不同封装支持的显示接口组合并不相同，因此应先确定封装，再敲定显示方案、合封存储和引脚分配。同一封装内的型号引脚兼容（pin-to-pin）；选用替代料时，仍须确认合封存储配置和显示需求。

<div align="center"><em>SF32LB55x 按封装划分的 I/O 选项</em></div>

<div align="center" markdown>

| 封装 | HCPU / LCPU GPIO 数量 | GPIO 总数 | 典型适用设计 |
| :--- | :--- | :--- | :--- |
| QFN68L | 28 / 21 | 49 | 面向紧凑型可穿戴或 BLE 传感器产品，PCB 工艺成本较低 |
| BGA145 | 55 / 40 | 95 | 适合显示、存储、传感器资源更丰富的设计 |
| BGA169 | 71 / 42 | 113 | 适合 I/O 需求最高、合封存储与显示选择最丰富的 SF32LB55x 设计 |

</div>

下表列出思澈科技（SiFli）芯片型号指南当前收录的代表型号，可用于比较封装与合封存储配置。该系列的定义早于思澈科技（SiFli）现行命名规则，因此选型时应以完整可订购料号为准，不要仅凭后缀推断器件特性。

<div align="center"><em>SF32LB55x 代表性型号</em></div>

<div align="center" markdown>

| 料号 | 封装 | 合封存储 | 型号指南列出的显示接口 | 选型要点 |
| :--- | :--- | :--- | :--- | :--- |
| SS6600A8 | QFN68L | 两颗 4 MB QSPI NOR 器件配置为单颗 8 MB OSPI NOR；不含合封 PSRAM | QSPI、8080 | 49 路 GPIO；2.97 V 至 3.63 V；−20 °C 至 +70 °C；紧凑型无合封 PSRAM 方案 |
| SF32LB551U4O5 | QFN68L | 4 MB QSPI NOR 启动 Flash + 4 MB OPI-PSRAM | QSPI、8080 | 49 路 GPIO；1.71 V 至 3.63 V；−20 °C 至 +70 °C；紧凑型合封 PSRAM 方案 |
| SF32LB555V4O6 | BGA145 | 4 MB QSPI NOR 启动 Flash + 4 MB OPI-PSRAM | MIPI DSI 命令模式、QSPI、8080 | 95 路 GPIO；−40 °C 至 +85 °C；适合需要 4 MB PSRAM 的均衡型 BGA145 显示产品 |
| SF32LB555V436 | BGA145 | 4 MB QSPI NOR 启动 Flash + 8 MB OPI-PSRAM | MIPI DSI 命令模式、QSPI、8080 | 95 路 GPIO；−40 °C 至 +85 °C；适合需要 SF32LB555V4O6 两倍合封 PSRAM 容量的 BGA145 设计 |
| SF32LB557VD3A6 | BGA169 | 1 MB QSPI NOR 启动 Flash + 16 MB OPI-PSRAM + 2 MB QPI-PSRAM | MIPI DSI 命令模式、QSPI、8080、JDI/Sharp MIP | 113 路 GPIO；−40 °C 至 +85 °C；支持 MIPI DSI 与 SPI/DSPI 双屏异显 |

</div>

针对 SF32LB557VD3A6，思澈科技（SiFli）当前的芯片型号指南和 DS5501 V1.7.2 数据手册表 0-1 均列出 HCPU 71 路 + LCPU 42 路，共 113 路 GPIO。但该数据手册的特性摘要和封装汇总，以及 PB0001 V1.3 产品简介，又将 BGA169 列为 119 路 GPIO（HCPU 71 路 + LCPU 48 路）。因此，官方资料之间存在冲突，DS5501 数据手册内部也不一致。本页按型号明细表和当前芯片型号指南采用 113 路。分配管脚或定版前，请根据所选封装的球位图核实可用 GPIO，并向思澈科技（SiFli）确认可订购料号；同时核对各型号的供电与温度等级、完整料号及合封存储配置。相关资料见 [DS5501 V1.7.2 数据手册][数据手册]、[PB0001 V1.3 产品简介][产品简介]和[思澈科技（SiFli）芯片型号指南]。BGA145 和 BGA169 封装尺寸均为 7 × 7 × 0.94 mm，球距为 0.5 mm。

## 集成路径 { #integration-path }

可按以下步骤，将 SF32LB55x 的初步选型推进到设计验证：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证所需显示、蓝牙和低功耗行为。
2. **规划评估硬件。** μForge 当前未收录 SF32LB55 专用模组或开发板。请使用[SF32 产品选型工具](../product-selector.md)选择最接近的评估平台，并在将评估结果用于 55x 设计前核对其封装和接口覆盖范围。
3. **进行硬件设计与评审。** 在发布原理图或布局前，请参考 μForge 的[硬件设计指南](../../hardware/chip-guides/SF32LB55x_hardware_design_guide.md)，以及其中的[原理图核对表](../../hardware/chip-guides/SF32LB55x_schematic_checklist.md)和 PCB 布局核对表。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对思澈科技（SiFli）的[数据手册][数据手册]、[用户手册][用户手册]、[原始硬件设计指南][原始设计指南（wiki.sifli.com）]和[硬件应用说明源文件][硬件应用说明（GitHub 源文件）]。

## 相关产品 { #related-products }

### 开发板 { #development-kits }

建议以官方硬件应用说明、参考原理图和核对表作为封装选择、电源树定义、显示接口规划、存储选型、RF 布局以及量产测试规划的起点。

### 参考产品 { #reference-products }

典型终端产品包括智能手表、运动手环、健康监测可穿戴设备、智能门锁、联网配件、智能家居控制器，以及紧凑型图形化 HMI。

!!! note "自动生成内容"
    本页是在没有现成专用源文档的情况下编写的。依赖其中的技术结论前，请先对照思澈科技（SiFli）的官方文档核实。
