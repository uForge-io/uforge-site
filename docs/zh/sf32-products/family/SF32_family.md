---
icon: lucide/cpu
description: "SF32LB5xx 系列概览：异构 Cortex-M33 内核、蓝牙、ePicasso 图形和边缘 AI，并提供对比表和快速选型指南。"
tags:
  - 硬件
  - 芯片
---

# SF32 产品系列 { #sf32-family }

## 简介 { #introduction }

**SF32** 系列，尤其是 **SF32LB5xx**，是思澈科技（SiFli）面向电池供电的 AIoT 和可穿戴产品推出的高集成度、超低功耗 32 位微控制器系列。

SF32 旨在填补传统微控制器与应用处理器之间的空档。该系列采用紧凑的系统级封装（System-in-Package，SiP）架构，集成低功耗传感器处理、无线连接、图形加速、多媒体处理和大容量存储，适用于智能手表、健身追踪器、智能显示终端、便携式医疗设备和具备边缘智能的互联配件等产品。

**LB**（Low-Power Bluetooth，低功耗蓝牙）系列是 SF32 产品家族的首个成员；后续还计划推出更多面向特定应用的系列。

## 硬件工作流 { #hardware-workflows }

<div class="grid cards" markdown>

- :lucide-route:{ .uf-hw-icon .uf-hw-blue } **规划产品**

    从产品需求和器件选型开始，依次完成开发板验证和量产准备。

    [规划产品 :material-arrow-right:](product-planning.md){ .uf-hw-link-blue }

- :lucide-list-checks:{ .uf-hw-icon .uf-hw-purple } **SF32 产品选型工具**

    比较 SF32 各系列，选择芯片或模组，并确定适合早期验证的开发板。

    [建立候选清单 :material-arrow-right:](../product-selector.md){ .uf-hw-link-purple }

- :lucide-clipboard-check:{ .uf-hw-icon .uf-hw-green } **面向量产的设计**

    从选定器件推进到原理图、布局、BOM、CAD、检查清单和启动调试记录。

    [规划量产工作 :material-arrow-right:](../../hardware/design-for-production.md){ .uf-hw-link-green }

</div>

## 关键特性 { #key-features }

1. **异构多核架构**

    SF32LB 微控制器采用基于 Arm Cortex-M33 STAR-MC1 的异构多核架构，兼顾高性能应用处理和超低功耗后台运行。根据具体器件，系统可包含一个或多个应用处理器，以及专门负责蓝牙连接、传感器处理和常开系统功能的低功耗处理器。

    !!! info "STAR-MC1 处理器"
        STAR-MC1 是安谋科技（Arm China）提供的可配置 Armv8-M Mainline CPU IP，在兼容的 SF32 器件中用作 Cortex-M33 级应用处理器。面向 Cortex-M33 的固件、中间件、RTOS 移植和工具仍然适用，但需要完成常规的器件专用集成。其 CU、SP 和 SE 配置的主要差异在于缓存、TCM、XIPU 和 TrustZone 能力；Arm 自定义指令/CDE 和协处理器接口属于可选能力。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

        如需了解配置、TCM、缓存、CDE、协处理器和代表性性能测量的器件专用说明，请参阅 [STAR-MC1 架构深度解析](../../learn/architecture/star-mc1.md)。

2. **超低功耗无线连接**

    SF32LB 系列在芯片上集成低功耗蓝牙（Bluetooth Low Energy，BLE）或双模蓝牙（BT/BLE）连接。

    不同型号支持的蓝牙模式和射频性能并不相同。选型时应查阅具体型号的数据手册和已验证的参考设计，确认其支持的蓝牙模式、发射功率配置、接收灵敏度及电流数据；不能仅凭系列定位推断射频性能。

3. **硬件加速图形与显示引擎**

    所有 SF32LB 微控制器均集成 ePicasso 2.5D 图形引擎和独立显示控制器。ePicasso 由思澈科技（SiFli）自主研发。

    硬件加速可显著降低以下常见图形任务的 CPU 负载：

    * Alpha 混合
    * 图像缩放
    * 旋转和变换
    * 图层合成
    * 用户界面渲染

    SF32LB 系列中采用的显示接口和显示类型包括以下各项。具体支持情况因器件而异；请核对具体型号，不要假定每款器件都支持列表中的所有项目。

    * SPI / DSPI / QSPI
    * 8080 MCU 接口
    * RGB / DPI
    * MIPI DSI
    * EPD
    * JDI（适用于像素内存（Memory-in-Pixel，MiP）显示屏）

    对于支持相应显示接口的型号，配合 LVGL 等图形框架使用时，硬件加速可帮助在 TFT、AMOLED、电子纸（e-paper，EPD）和像素内存（MiP）显示屏上实现流畅、响应迅速的用户界面。

4. **边缘 AI 和神经网络加速**

    部分 SF32 器件集成专用硬件加速器，用于机器学习、多媒体处理和传感器融合工作负载。

    相关能力可能包括：

    * 神经网络加速
    * 音频处理
    * 语音识别
    * 摄像头接口（DVP 和 SPI）
    * 传感器融合和生物识别算法

    这些特性可在设备端实现低延迟（latency）AI 推理，同时尽量降低功耗和对云端的依赖。

5. **高密度系统级封装（System-in-Package，SiP）存储**

    为支持图形密集型和 AI 应用，SF32 器件采用指令缓存和数据缓存架构，以提升从外部存储器执行代码时的性能。

    可提供的封装内存储器包括：

    * 最高 256 Mb NOR Flash
    * 最高 512 Mb PSRAM

    只有部分型号在 SiP 中合封 NOR Flash 或 PSRAM。SiP 方案可减少独立存储芯片及相应布线，但存储类型、容量、接口、功耗和可从封装外部访问的引脚均取决于具体 SKU。定板前应核对对应的数据手册和封装引脚定义。

## SF32 微控制器对比 { #sf32-microcontroller-comparison }

<div align="center"><em>SF32 微控制器对比</em></div>

下表汇总的是系列级能力，并不表示每个 SKU 均具备表中所有资源。接口支持和资源数量可能因具体型号、封装或配置而异；选型时请核对目标型号的数据手册。

<div align="center" markdown>

| 特性 | SF32LB52x | SF32LB55x | SF32LB56x | SF32LB57x | SF32LB58x |
|----------|----------|----------|----------|----------|----------|
| 定位 | 入门级 | 主流级（仅 BLE） | 进阶级 | 增强计算 | 旗舰级 |
| 应用 CPU | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz | 2× Cortex-M33 @ 240 MHz |
| 低功耗 CPU | Cortex-M33 @ 24/48 MHz，专用蓝牙控制器 | Cortex-M33 @ 48 MHz，用户可编程 | Cortex-M33 @ 48/96 MHz，用户可编程 | Cortex-M33 @ 24 MHz，专用蓝牙控制器 | Cortex-M33 @ 48/96 MHz，用户可编程 |
| 片上 SRAM | 576 KB | 1312 KB | 960 KB | 592 KB | 3.7 MB |
| 蓝牙 | 经典蓝牙（BT Classic）+ BLE | BLE | 经典蓝牙（BT Classic）+ BLE | 经典蓝牙（BT Classic）+ BLE | 经典蓝牙（BT Classic）+ BLE |
| 图形加速器 | 2.5D<br>ePicasso 2.0 Lite | 2.5D<br>ePicasso 1.0 | 2.5D<br>ePicasso 2.0 | 2.5D<br>ePicasso 3.0 + eZip 3.0 | 2.5D + 矢量图形<br>ePicasso 2.0 + Vivante GCNanoUltraV |
| 显示支持 | SPI / DSPI / QSPI / 8080 / EPD / JDI | SPI / DSPI / QSPI / 8080 / JDI / RGB / MIPI | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB | SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB / MIPI |
| 音频 ADC | 1× | 无 | 1× | 2× | 2× |
| 音频 DAC | 1× | 无 | 1× | 1× | 2× |
| PDM 音频接口 | 1× | 1–2×* | 2× | 2× | 2× |
| I²S 音频接口 | 1× | 1–2×* | 1× | 2× | 3× |
| USB | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 FS | 2.0 HS |
| CAN | 无 | 无 | 1× | 2× | 2× |
| 封装内 PSRAM | 最高 16 MB | 最高 16 MB + 2 MB | 最高 16 MB | 最高 48 MB | 最高 32 MB + 32 MB |
| 封装内 NOR Flash | 最高 4 MB | 最高 8 MB | 最高 1 MB | 最高 32 MB | 最高 8 MB |
| GPIO 数量 | 44 / 45 | 49 / 95 / 113* | 44 / 120 | 46 / 47 / 58；BGA112 另有最多 6 路 I/O* | 154 |
| 封装选项 | QFN68 | QFN68 / BGA145 / BGA169 | QFN68 / BGA175 | QFN68 / QFN80 / BGA112 | BGA256 |
| 封装外形尺寸（长 × 宽） | 7 × 7 mm | 7 × 7 mm | QFN：7 × 7 mm<br>BGA：6.5 × 6.1 mm | QFN68：7 × 7 mm<br>QFN80：8 × 8 mm<br>BGA：5.4 × 4.4 mm | 8.5 × 6.5 mm |
| 供电范围 | 3.2–4.7 V (520/3/5/7)<br>2.97–3.63 V (52B/E/G/J)<br>1.8 V (52D) | 1.71–3.63 V | 1.71–3.63 V | 3.0–4.7 V<br>2.97–3.63 V | 1.71–3.63 V |

</div>

**SF32LB55x 型号差异：**音频接口数量因具体型号而异：SF32LB551/553/555 各有 1 路 PDM 和 1 路 I²S；SF32LB557VD3A6 各有 2 路。[SF32LB55x 数据手册（V1.7.2）](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)的封装概览将 BGA169 列为 119 路 GPIO（71 路 HCPU + 48 路 LCPU），但同一份数据手册的产品系列详细表中，SF32LB557 为 71 路 HCPU + 42 路 LCPU，共 113 路。思澈科技（SiFli）当前的[芯片型号指南](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)对 SF32LB557VD3A6 也列出 71 + 42 = 113 路。思澈科技（SiFli）未说明数据手册内部这两处数据不一致的原因；本对比表采用具体型号对应的 113 路数据。分配引脚前，应核对具体 SKU 的数据手册和引脚表。每个 PDM 接口最多可连接 2 个数字麦克风，因此接口数量不等于麦克风数量。

**SF32LB55x 合封 NOR 说明：**本表的 8 MB 系列上限包含思澈科技（SiFli）另行说明的 SS6600A8 配置：两颗 4 MB QSPI-NOR 配置为单颗 8 MB OSPI-NOR。SF32LB55x 中列出的 SF32 前缀订货型号合封 NOR Flash 容量最高为 4 MB；选型时请核对具体型号。

**SF32LB57x BGA112 说明：**本说明仅适用于 BGA112。SF32LB57x 芯片内部包含 MPI1、MPI2 和 MPI3；它们在型号中的位置见 [SF32 命名规则](SF32_namingrule.md)。以下任一合封存储配置下，MPI2 和 MPI3 管脚均无法从封装外部访问，因此仅提供固定的 58 路 GPIO：(1) 内部 MPI1 和 MPI2 各合封一颗 PSRAM；(2) 内部 MPI2 合封一颗 256 Mb PSRAM；或 (3) 内部 MPI3 合封一颗 NOR Flash。`SF32LB57GVD776` 属于第 (3) 种情况：其末尾代码 `776` 中第二个 `7` 表示内部器件使用 MPI3，因此仅有 58 路 GPIO。其他 BGA112 合封配置下，额外的 6 路 I/O 可用于 MPI3，或通过上拉/下拉配置为 GP 静态输出；这些引脚不能视为可自由复用的 GPIO。例如，`SF32LB57ZVN7N6` 的 `58 + 6` 表示 58 路可用 GPIO，另有 6 路引脚可用于 MPI3 或作为静态输出。QFN68 和 QFN80 不受此 BGA112 限制影响：这两种封装仅提供标称 GPIO 路数，没有额外的 MPI3 或静态输出选项。具体 SKU 请参阅 [SF32LB57x 产品页](../chips/SF32LB57x.md)及其数据手册。

**SF32LB58x GPIO 数量说明：**[DS5801 V1.8.3 数据手册](https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p8p3.pdf)和思澈科技（SiFli）的系列对比资料列出的 GPIO 总数为 154 路（HPSYS：94 路；LPSYS：60 路）。另一份[芯片型号指南](https://wiki.sifli.com/en/silicon/%E8%8A%AF%E7%89%87%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)列出的 HCPU：94 路、LCPU：66 路，相加为 160 路，与数据手册的总数不一致。本文表格采用数据手册给出的总数；分配引脚前，请根据具体 SKU 的封装引脚表确认实际可用管脚。

## 如何选择合适的 SF32 { #choosing-the-right-sf32 }

SF32LB5xx 系列覆盖电池供电的互联设备，从成本优化型蓝牙产品到具备高级图形和 AI 能力的系统。各型号共享 SDK 基础，但处理器配置、外设、存储映射、封装和引脚分配可能不同。跨型号移植时，可能需要调整启动代码、驱动、链接脚本或分区设置、引脚复用和 SDK 配置，并在目标器件上重新验证。

选型时，请重点考虑以下需求：

* 蓝牙连接能力（BLE 或双模 BT/BLE）
* 显示接口和分辨率
* 音频和多媒体能力
* 存储容量
* GPIO 需求
* 图形性能
* AI 和传感器处理工作负载
* 功耗目标

<div align="center"><em>快速选型指南</em></div>

<div align="center" markdown>

| 选择 | 若你的应用需要 | 典型应用 |
| : ---      | : ---  | : --- |
| SF32LB52x  | • 双模蓝牙（BT/BLE）<br> • 集成音频 ADC 和 DAC<br> • 集成锂离子电池充电<br> • 最多 45 个 GPIO<br> • 显示分辨率最高可达 512 × 512<br> • 紧凑且具成本效益的方案<br> | • 入门级智能手表和健身手环<br> • 蓝牙模组和无线适配器<br> • 蓝牙音频配件<br> • 智能传感器和可穿戴设备<br> • 电子货架标签和智能工牌<br> • 便携式标签打印机<br> • 电动自行车和电动滑板车显示终端<br> • 基础的 LVGL HMI 设备 |
| SF32LB55x  | • 低功耗蓝牙（Bluetooth Low Energy，BLE）<br> • MIPI DSI 命令模式显示屏<br> • 用于传感器处理算法的大容量 SRAM<br> • 超过 45 个 GPIO<br> • 扩展的低功耗处理能力 | • 健身手环和活动追踪器<br> • 运动和骑行电脑<br> • 传感器丰富的可穿戴设备<br> • 健康监测设备<br> • 电池供电 BLE 外设 |
| SF32LB56x  | • 双模蓝牙（BT/BLE）<br> • RGB/DPI 显示接口<br> • 集成音频 ADC 和 DAC<br> • 显示分辨率最高可达 1024 × 600<br> • 通过 SDIO 连接外部 Wi-Fi<br> • 更高的 GPIO 容量 | • 具有高级用户界面的智能手表<br> • 互联 HMI 系统<br> • 医疗和健康护理设备<br> • 工业手持设备<br> • 便携式仪器<br> • 高级电动自行车和电动滑板车显示终端 |
| SF32LB57x | • 支持 BLE Audio 和 LE Long Range 的双模蓝牙（BT/BLE）<br> • ePicasso 3.0/eZip 3.0 图形和 RGB 显示接口<br> • DCMI 摄像头输入和集成高保真音频 ADC/DAC<br> • 显示分辨率最高可达 1024 × 600<br> • PTM 任务卸载（offload），用于确定性 I/O 或自定义外设时序<br> • 最多 58 路通用 GPIO；在合封配置允许时，BGA112 另有最多 6 路 I/O，可用于 MPI3 或配置为上拉/下拉型 GP 静态输出<br> • SD/SDIO/eMMC 存储接口 | • 紧凑型高端智能手表<br> • 显示丰富的 HMI 和电子纸设备<br> • 支持摄像头的蓝牙产品<br> • 便携式音频和录音设备<br> • 智能家居控制面板 |
| SF32LB58x  | • 双模蓝牙（BT/BLE）<br> • 包含矢量图形的高级图形渲染<br> • MIPI DSI 命令模式或视频模式显示屏<br> • 显示分辨率最高可达 1280 × 800<br> • 大容量存储配置<br> • GPIO 密度高、数量多<br> • 通过 SDIO 连接外部 Wi-Fi<br> • 边缘 AI 和机器学习工作负载 | • 高端智能手表<br> • 运动和户外可穿戴设备<br> • 高级骑行电脑<br> • 智能显示终端和互联仪表盘<br> • AI 增强型可穿戴设备<br> • 边缘 AI 和传感器融合系统 |

</div>

## 家族内的软件兼容性 { #software-compatibility-across-the-family }

SF32 平台共享软件与 SDK 基础，但处理器配置、外设、存储映射、封装和引脚分配仍可能不同。跨型号移植时，可能需要调整启动代码、驱动、链接脚本或分区设置、引脚复用和 SDK 配置，并在目标硬件上验证。

选型时应将软件复用程度和移植验证成本，与性能、存储、显示及连接需求一并评估。不要仅因器件同属 SF32 系列，就假定它们引脚兼容或固件无需修改即可运行。

## 常见问题 { #frequently-asked-questions }

**哪款 SF32 适合低成本蓝牙智能手表或手环？**
SF32LB52x 是入门之选：双模蓝牙（经典蓝牙 + BLE）、集成音频 ADC/DAC 与锂电池充电、最多 45 个 GPIO，封装为 7 × 7 mm 的 QFN68。

**哪些 SF32 芯片支持经典蓝牙而不仅是 BLE？**
SF32LB52x、SF32LB56x、SF32LB57x 和 SF32LB58x 支持经典蓝牙 + BLE；SF32LB55x 仅支持 BLE。

**哪些 SF32 芯片支持 MIPI DSI 显示屏？**
SF32LB55x 和 SF32LB58x 支持 MIPI 显示。SF32LB52x、56x、57x 使用 SPI、QSPI、8080、JDI/EPD 接口，其中 56x/57x 另支持 RGB。

**哪些 SF32 芯片提供摄像头输入或 CAN？**
SF32LB57x 提供 DCMI 摄像头输入。CAN 方面，SF32LB56x 有 1 路，SF32LB57x 和 SF32LB58x 有 2 路。

**SF32 家族成员之间引脚兼容吗？**
不兼容。它们共用 SDK 基础，但内核、外设、存储映射、封装和引脚分配各不相同，移植需要调整驱动、引脚复用和配置，并在目标器件上验证。

## 参考链接 { #reference-links }

- [思澈科技（SiFli）官网](https://www.sifli.com/)
- [SiFli Wiki](https://wiki.sifli.com/)
- [思澈科技（SiFli）软件文档](https://docs.sifli.com/)
- [OpenSiFli GitHub 仓库](https://github.com/OpenSiFli/)
- [思澈科技（SiFli）官方淘宝店](https://sifli.taobao.com/)
