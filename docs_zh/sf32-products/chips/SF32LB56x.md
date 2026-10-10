---
icon: lucide/microchip
description: "SF32LB56x：面向显示、音频和存储需求更高的连接型产品，提供双模蓝牙、超低功耗运行与更强的常开处理能力。"
tags:
    - 硬件
    - 芯片
---

# SF32LB56x { #sf32lb56x }

## 概览 { #overview }

SF32LB56x 系列是高集成度超低功耗 AIoT 微控制器，面向需要双模蓝牙（Bluetooth）、更强图形能力、集成音频、外部存储，以及比 SF32LB 系列低阶型号更灵活的显示和存储接口的产品。

它采用 big.LITTLE 双核架构，由一个最高 240 MHz 的高性能 Arm Cortex-M33 STAR-MC1[^1] 应用处理器和一个最高 96 MHz 的超低功耗 Arm Cortex-M33 STAR-MC1 处理器组成。主核心可处理图形界面、显示、存储和产品逻辑；低功耗核心则以更低的能耗预算承担常开传感任务、待机管理和蓝牙控制。

根据思澈科技（SiFli）官方产品简介和数据手册，SF32LB56x 将双模蓝牙 5.3（含 BLE Audio）、ePicasso 2.0 图形引擎、集成音频 ADC/DAC 功能模块、面向 TinyML 的加速器、封装内 Flash 选项，以及更丰富的显示与外部存储接口整合在同一平台上。对于无线、音频或显示需求已经超出 SF32LB55x、但仍希望维持 MCU 级功耗与集成度的设计，SF32LB56x 是合适的选择。

思澈科技（SiFli）的芯片型号指南还提示了 56x 家族的一个关键选型点：不同封装支持的显示接口组合并不完全相同，因此准确料号和封装选择应被视为前期架构决策，而不是后期 PCB 细节。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

## 应用场景 { #applications }

**SF32LB56x 适用于**需要更高阶显示、音频、外部存储和本地处理能力的双模蓝牙产品，包括：

- 智能手表和智能手环
- 图形化可穿戴产品
- 医疗与健康设备
- 联网型 HMI 产品
- 工业手持终端
- 智能门锁与智能家电
- 低功耗传感器中枢
- 高规格电动自行车和电动滑板车显示设备

当设计具备以下一项或多项需求时，通常应优先考虑 SF32LB56x：

- 双模蓝牙 5.3 与 BLE Audio
- 集成 HiFi 音频 ADC 与 DAC
- 更复杂的显示任务与更高的图形处理负载
- DPI/RGB 显示接口支持
- 通过 SDIO 连接外部 Wi‑Fi；通过 SD/SDIO 或 eMMC 扩展外部存储
- 通过 WBBGA175 获取更高 GPIO 数量
- 同时承载 TinyML、音频与图形界面的更高并发余量

## 开发资源 { #development-resources }

[产品简介]: https://downloads.sifli.com/docs/Product%20Brief/SF32LB56x/PB0056-SF32LB56x-%E4%BA%A7%E5%93%81%E7%AE%80%E4%BB%8B%20V1p2.pdf
[数据手册]: https://downloads.sifli.com/docs/Datasheet/sf32lb56/DS5601-SF32LB56x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p9p3.pdf
[用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB56x/UM5601-SF32LB56x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V1p0p5.pdf
[硬件设计指南（U，wiki.sifli.com）]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[硬件设计指南（V，wiki.sifli.com）]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[硬件应用说明源文件（U）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xU-HW-Application.md
[硬件应用说明源文件（V）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/en/hardware/SF32LB56xV-HW-Application.md
[硬件设计指南（μForge）]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[硬件设计核对表来源]: https://wiki.sifli.com/hardware/index.html
[SDK 文档]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/index.html
[API 参考]: https://docs.sifli.com/projects/sdk/latest/sf32lb56x/api/index.html
[SF32LB56-MOD]: ../modules/SF32LB56-MOD.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[产品简介]__
- :fontawesome-solid-file-pdf: __[数据手册]__
- :fontawesome-solid-file-pdf: __[用户手册]__
- :fontawesome-solid-file-lines: __[硬件设计指南（U，wiki.sifli.com）]__
- :fontawesome-solid-file-lines: __[硬件设计指南（V，wiki.sifli.com）]__
- :fontawesome-brands-github: __[硬件应用说明源文件（U）]__
- :fontawesome-brands-github: __[硬件应用说明源文件（V）]__
- :fontawesome-solid-file-lines: __[硬件设计指南（μForge）]__
- :fontawesome-solid-book: __[SDK 文档]__
- :fontawesome-solid-book-open: __[API 参考]__
- :fontawesome-solid-list-check: __[硬件设计核对表来源]__
- :fontawesome-solid-sim-card: __[SF32LB56-MOD]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与存储 { #compute-and-memory }

- 高性能 Arm Cortex-M33 STAR-MC1 应用处理器（HCPU），最高 240 MHz
- 超低功耗 Arm Cortex-M33 STAR-MC1 处理器（LCPU），最高 96 MHz
- HCPU 最高 370 DMIPS / 984 EEMBC CoreMark
- LCPU 最高 148 DMIPS / 394 EEMBC CoreMark
- HCPU 内存系统：32 KB I-cache + 16 KB D-cache，800 KB SRAM，其中包含 128 KB 保留 SRAM
- LCPU 内存系统：16 KB I-cache + 8 KB D-cache，160 KB 保留 SRAM
- 提供 512 KB 或 1 MB 封装内 QSPI-NOR 选项
- 支持 QSPI-NOR、SPI-NAND、QPI/OPI-PSRAM、SD/SDIO 和 eMMC 外部存储

### 图形、显示与 AI { #graphics-display-and-ai }

- ePicasso 2.0 2D/2.5D 图形加速
- 支持 4 层 Alpha 混合加 1 层背景
- 支持硬件旋转、缩放、镜像与常见格式转换
- 图形处理最高支持 1024 × 1024 的尺寸
- eZip 2.0 无损图形解压，原生支持 eZip-A 动画
- 在支持的型号中，LCD 控制器可支持 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB 与 JDI 接口；具体支持情况取决于封装和准确料号
- TurboPixel：extDMA 以固定压缩比对最终帧缓冲区进行有损压缩，再由显示控制器解压，从而降低 PSRAM 带宽和容量需求
- 面向 TinyML 的神经网络矩阵加速器，最高 1.92 GOPS，效率超过 10 TOPS/W

### 音频与无线连接 { #audio-and-wireless-connectivity }

- 双模蓝牙 5.3，支持 BLE Audio
- 灵敏度：BLE 1 Mbps 为 -100 dBm，BR 为 -96.3 dBm，EDR2 为 -95.5 dBm，EDR3 为 -88.5 dBm
- 最大发射功率：BR/BLE 为 19 dBm，EDR2/EDR3 为 13 dBm
- BR 接收峰值电流：3.3 V 下 2.2 mA
- 1 个 HiFi 24 位音频 DAC 功能模块，信噪比 108 dB
- 1 个 HiFi 24 位音频 ADC 功能模块，信噪比 99 dB
- 2 路 PDM 接口和 1 路 I2S 接口

### 安全 { #security }

- AES、HASH 与 CRC 硬件加速器
- 真随机数发生器（TRNG）
- PSA Certified Level 1

### 外设与 I/O { #peripherals-and-ios }

- 6 路 UART
- 7 路 I2C
- 4 路 SPI
- 1 路 ISO7816
- 1 路 USB 2.0 FS
- 4 路 MPI
- 2 路 SD/SDIO/eMMC，其中 1 路 4-bit、1 路 8-bit
- 1 路 12 位通用 SAR ADC，8 通道
- 温度传感器
- 2 路低功耗电压比较器
- 外设任务控制器（PTC）
- 最多 120 路 GPIO，取决于封装

### 电源与封装 { #power-supply-and-package }

- 供电范围：1.71 V 至 3.63 V
- 工作温度：−40 °C 至 +85 °C
- 集成高效率 BUCK 与低功耗 LDO
- RTC 唤醒下睡眠电流：600 nA
- 引脚唤醒下睡眠电流：300 nA
- 封装选项：QFN68L 与 WBBGA175

## 系列型号 { #family-variants }

SF32LB56x 同时覆盖紧凑型 QFN68L 与高 I/O 的 WBBGA175 料号，并提供不同的合封存储组合。应在项目早期就确定具体料号，因为显示接口支持、GPIO 余量、存储容量、PCB 工艺与模组迁移空间在家族内部差异明显。

表列型号的资料供电范围为 1.71 V 至 3.63 V，工作温度范围为 −40 °C 至 +85 °C。GPIO 供电域支持 1.71 V 至 3.45 V；封装内存储器 I/O 电源轨有独立限制。设定接口电平前，请查阅对应 U 或 V 型号的硬件应用说明。

**`SF32LB566VCB36` 的资料差异：**[思澈科技（SiFli）芯片型号指南](https://wiki.sifli.com/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)将其合封 QSPI-NOR 列为 1 MB；较早版本的 [DS5601 V1.9.2 数据手册](https://downloads.sifli.com/user%20manual/DS5601-SF32LB56x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p9p2.pdf)则在订购信息中列为 4 Mb（0.5 MB）。思澈科技（SiFli）当前的[产品资料索引](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/docs/product-index.rst)已链接到 DS5601 V1.9.3，但本次未能核实该版本的订购信息，因此不能据此判断旧版差异是否仍然存在或已经修正。本表按芯片型号指南列示。定版 BOM 前，请核对 V1.9.3 的对应条目，或向思澈科技（SiFli）确认准确料号及实际供货的存储配置。

<div align="center"><em>SF32LB56x 代表性家族型号</em></div>

<div align="center" markdown>

| 示例料号 | 封装 | HCPU / LCPU GPIO 数量 | 集成存储 | 显示接口 | 典型适用设计 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB560UNN26 | QFN68L | 24 / 20 | 512 KB QSPI-NOR Flash | QSPI | 适合入门级 56 系列可穿戴、电子纸或紧凑型 HMI 设计，存储需求较低且 PCB 引出最简单 |
| SF32LB561UBN26 | QFN68L | 24 / 20 | 4 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | 适合需要比 560 档更大帧缓冲或图形资源空间的紧凑型图形界面设计 |
| SF32LB563UCN26 | QFN68L | 24 / 20 | 8 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | 适合更高分辨率的紧凑型 UI 设计，同时仍希望保留较低成本的 QFN 路线 |
| SF32LB56WUND26 | QFN68L | 24 / 20 | 16 MB OPI-PSRAM + 512 KB QSPI-NOR Flash | QSPI | 适合需要更大本地图形与资源空间、但暂不切换到 BGA 的紧凑型高内存产品 |
| SF32LB566VCB36 | WBBGA175 | 79 / 41 | OPI-PSRAM 8 MB + 4 MB，QSPI-NOR Flash 1 MB | DPI / QSPI / 8080 / JDI | 适合需要更丰富显示接口、更高 I/O 与完整图形能力的可穿戴和 HMI 设计，也是 SF32LB56-MOD 采用的芯片 |
| SF32LB567VND36 | WBBGA175 | 79 / 41 | 16 MB OPI-PSRAM + 1 MB QSPI-NOR Flash | DPI / QSPI / 8080 / JDI | 适合需要更大单一 PSRAM 区域与更复杂显示布线的高 I/O 设计，但不是 56 模组的标准芯片选择 |

</div>

## 集成路径 { #integration-path }

使用以下顺序将 SF32LB56x 的初步选型推进为已验证的设计：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证目标显示、音频、蓝牙和存储路径。
2. **选择集成载体。** 使用 [SF32LB56-MOD](../modules/SF32LB56-MOD.md) 可降低 RF 和高速内存集成工作；使用 [SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) 可完成板级验证。
3. **进行硬件设计与评审。** 在发布原理图或布局前，使用本地[硬件设计指南](../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md)，包括其[原理图核对表](../../hardware/chip-guides/SF32LB56x_schematic_checklist.md)和 PCB 布局核对表。U/V 封装和显示接口选择必须与所选器件保持一致。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对思澈科技（SiFli）的[数据手册][数据手册]、[用户手册][用户手册]、适用的 [U 封装硬件设计指南][硬件设计指南（U，wiki.sifli.com）]或 [V 封装硬件设计指南][硬件设计指南（V，wiki.sifli.com）]，以及相应的[U 封装硬件应用源文件][硬件应用说明源文件（U）]或 [V 封装硬件应用源文件][硬件应用说明源文件（V）]。

## 相关产品 { #related-products }

### 模组 { #module }

[SF32LB56-MOD](../modules/SF32LB56-MOD.md) 将 SF32LB566VCB36 芯片、存储器、RF 设计与天线选项整合在一块可直接集成的模组中。若项目希望在保留 SF32LB56x 能力的同时降低 RF 布局、天线匹配、晶振布局与高速存储集成风险，它是很实用的方案。

### 开发板 { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) 开发板适合作为固件开发、显示验证、音频与存储测试、RF 检查以及功耗剖析的起点，尤其适合在投入芯片级或模组级硬件开发前先完成软件与系统验证。

### 参考产品 { #reference-products }

典型终端产品包括高级智能手表、联网 HMI 面板、医疗与健康设备、工业手持终端、便携式仪器，以及图形能力更强的电动自行车 / 电动滑板车显示设备。

!!! note "自动生成内容"
    本页是在没有现成专用源文档的情况下编写的。依赖其中的技术结论前，请先对照思澈科技（SiFli）的官方文档核实。
