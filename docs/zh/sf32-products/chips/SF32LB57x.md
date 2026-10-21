---
icon: lucide/microchip
description: "SF32LB57x：面向图形显示、音频和摄像头应用的超低功耗多核 AIoT MCU 家族，集成双模蓝牙、双 240 MHz 性能核、24 MHz 能效核、ePicasso 3.0 图形引擎、eZip 3.0 解压缩引擎与紧凑 QFN/BGA 封装。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x { #sf32lb57x }

## 概览 { #overview }

SF32LB57x 系列是增强型的高集成度、超低功耗 AIoT MCU 家族，面向可穿戴设备、便携式智能设备、智能家居和紧凑型显示产品。它适用于对图形显示、蓝牙（Bluetooth）音频、摄像头输入、外部存储和常开运行能力要求较高、普通蓝牙 MCU 难以从容胜任的设计，同时又不必承担应用处理器级平台在功耗、成本和集成方面的取舍。

SF32LB57x 采用三核 Arm Cortex-M33 STAR-MC1[^1] 架构：两颗性能核最高运行频率为 240 MHz，另有一颗最高 24 MHz 的低功耗核。思澈科技（SiFli）的 [ACPU 使用指南](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/app_note/acpu.html) 将这三颗核分别称为 HCPU、ACPU 和 LCPU：ACPU 负责音频和图形处理，LCPU 则处理 BLE、传感器数据等低功耗任务。两颗性能核的合计指标为 1968 CoreMark / 740 DMIPS。这种分工可为 UI 渲染、应用代码和多媒体工作负载提供充足余量，同时让蓝牙、传感器中枢及其他常开任务走低功耗路径。

平台集成 592 KB 片上保留 SRAM、ePicasso 3.0 2D/2.5D 图形加速、eZip 3.0 硬件解压缩、专用 LCD 控制器、DCMI 摄像头控制器、双模蓝牙、高保真音频 ADC/DAC、SiP 与外部存储接口、安全加速能力，以及通过 FreeIO 实现的灵活 GPIO 分配。57x 系列的关键差异之一是 PTM（Parallel Task Machine）：它是一个小型并行任务处理器，可将周期敏感的外设时序、自定义 IO 协议、传感器采集、类 PWM 时序和事件驱动协同逻辑从主 CPU 中卸载出来。

从硬件规划角度看，最关键的早期决策是供电与封装基线。SF32LB57x 提供 QFN68、QFN80 和 BGA112 封装；电池供电和外部稳压 3.3 V 基线由料号家族区分。这个选择会影响电源树、可用 GPIO 数量、封装扇出、显示/存储布线、调试接口和启动调试策略，因此应在复用原理图或开始 PCB 布局之前确定准确料号。

[^1]: STAR-MC1 是安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP。思澈科技（SiFli）在兼容的 SF32 器件中，将其标注为 Arm Cortex-M33 STAR-MC1 应用处理器。其 Cortex-M33 级软件模型有助于沿用既有 Cortex-M33 固件、中间件、RTOS 移植和工具链，但仍需完成器件专用的常规集成工作。CU、SP 和 SE 配置主要在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；Arm 自定义指令/CDE 和协处理器接口属于可选能力，具体功能以目标 SF32 料号为准。思澈科技（SiFli）文档会依上下文使用 ***Arm Cortex-M33 STAR-MC1*** 或 ***Arm Cortex-M33***。

[^2]: **仅适用于 BGA112。** SF32LB57x 芯片内部集成 MPI1、MPI2 和 MPI3；各接口对应的合封存储位置见 [SF32 芯片型号命名规则](../family/SF32_namingrule.md)。在以下任一合封存储配置下，MPI2 和 MPI3 引脚均无法从封装外部访问，因此可用 GPIO 固定为 58 路：(1) MPI2 上合封一颗 PSRAM，无论是否同时在 MPI1 上合封另一颗 PSRAM；或 (2) MPI3 上合封 NOR Flash。`SF32LB57GVD776` 属于第 (2) 种情况：其第二个 `7` 表示内部器件使用 MPI3，因此仅有 58 路 GPIO。其余配置下，BGA112 上与 MPI3 关联的 6 路 I/O 可用于 MPI3，或通过上拉或下拉配置为 GP 静态输出；它们并非可自由分配的 GPIO。因此，`SF32LB57ZVN7N6` 的 `58 + 6` 表示 58 路可用 GPIO，加上 6 路可用于 MPI3 或静态输出的引脚，而不是 64 路可自由分配的 GPIO。该限制不适用于 QFN68 或 QFN80 封装；这两种封装仅提供标称 GPIO 路数，没有额外的 MPI3 或静态输出选项。

[^3]: 封装尺寸和厚度依据思澈科技（SiFli）SF32LB57x 数据手册（DS5701 和 DS5702，V0.2.1）中的订购表和封装图纸：QFN68（7 × 7 mm，图纸为 0.9 mm 或 1.1 mm）、QFN80（8 × 8 mm，图纸为 0.9 mm 或 1.1 mm）以及 BGA112（5.4 × 4.4 mm，0.98 mm）。在所列料号中，只有 SF32LB573UB776 采用 1.1 mm 的 QFN68；订购表未列出 SF32LB57ZVN7N6，其 BGA112 厚度取自唯一的 BGA112 图纸。思澈科技（SiFli）的硬件设计指南另给出 1.03 mm 的 BGA112 选项，数据手册中没有对应图纸。SF32LB57x 专用型号编码图中，U 对应 QFN68、Y 对应 QFN80、V 对应 BGA112；不要据此推断其他 SF32 系列也使用相同的 Y 封装代码。具体料号的封装厚度及封装图纸，请向思澈科技（SiFli）确认。

[^4]: 对于电池供电系列，思澈科技（SiFli）的 SF32LB57x 数据手册（DS5701）规定 VBAT 和 VCC 为 3.0–4.7 V，上电电压为 3.5 V ±10 %。思澈科技（SiFli）的硬件设计指南给出的输入范围较窄，为 3.45–4.7 V（QFN68 表 2-1-1、QFN80 表 2-1-3、BGA112 表 2-1-5）；两份文档存在差异，具体型号适用的输入引脚和限制，请以对应数据手册为准。
[^5]: 表中的 I/O 电压是对芯片支持的 I/O 电压域的概括，不表示每个引脚都可任选其中任一电压。VDDIOA（如单独供电）为 GPIO 供电；VDDIOSB（如有）是 SiP 合封存储的 I/O 电源。思澈科技（SiFli）的指南规定合封 PSRAM 时 VDDIOSB 为 1.8 V，合封 NOR Flash 时为 3.3 V。对于 QFN68 3.3 V 供电系列，表 2-1-2 规定 VDDIOA 仅使用 3.3 V。具体引脚和电压域请以封装指南及对应料号数据手册为准。

## 应用场景 { #applications }

**SF32LB57x 非常适合**需要图形显示、蓝牙音频、摄像头输入、外部存储或低功耗常开运行能力的紧凑型联网产品，包括：

- 可穿戴智能手表和手环
- 智能人机交互设备
- 电子纸智能设备
- 中小型智能家电
- 便携式录音与音频产品
- 可穿戴医疗设备和健身器材
- 工业显示、传感、监测和仪器仪表产品
- 带摄像头的可穿戴或手持设备
- 以显示为中心的紧凑型终端和控制面板
- 车载中控设备、无线汽车钥匙和可穿戴车控设备
- 智能门锁
- 蓝牙对讲机和对讲设备
- 电子相框
- 蓝牙 Mesh 与低功耗传感器中枢网络

当设计具备以下一项或多项需求时，SF32LB57x 尤其适合：

- 双 240 MHz 性能核加 24 MHz 能效核，用于 UI/应用处理和低功耗后台任务
- ePicasso 3.0 图形加速，支持实时旋转、缩放、投影、镜像和 alpha 混合
- eZip 3.0 解压缩引擎，支持 eZip/eZip-A、JPEG 与 MJPEG 资源，避免所有素材都走高 CPU 开销的解码路径
- 覆盖 8080、SPI/Dual-SPI/Quad-SPI、DPI/RGB、JDI 与 8/16-bit EPD 的 LCD 接口
- 支持 DVP 或 SPI/Dual-SPI/Quad-SPI 摄像头输入的 DCMI 控制器
- 双模蓝牙 6.3（BR/EDR 与 BLE），支持 BLE Audio 与 LE Long Range
- 高保真 24-bit 音频 ADC/DAC，适合播放、录音和蓝牙通话
- SiP OPI-PSRAM / QSPI-NOR，以及外部 QSPI-NOR/NAND、QPI-PSRAM、SD、SDIO 或 eMMC 存储选择
- PTM 卸载能力，用于自定义外设任务、确定性 IO 时序、快速触发响应，以及低 CPU 开销的传感器或接口自动化

蓝牙 6.3 这一版本依据 SF32LB57x 数据手册（V0.2.1），而 v0.4 产品简介中仍为较早版本。可选功能请以思澈科技（SiFli）针对确切可订购型号发布的最新文档为准。

## 开发资源 { #development-resources }

[产品简介]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[数据手册]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-EN.pdf
[原始设计指南（wiki.sifli.com）]: https://wiki.sifli.com/en/hardware/SF32LB57x-HW-Application.html
[硬件设计指南（μForge）]: ../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md
[合格供应商名录（AVL）]: ../../hardware/cad-components/sifli-approved-vendor-list.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[产品简介]__
- :fontawesome-solid-file-pdf: __[数据手册]__
- :fontawesome-solid-file-pdf: __[用户手册]__
- :fontawesome-solid-file-lines: __[原始设计指南（wiki.sifli.com）]__
- :fontawesome-solid-file-lines: __[硬件设计指南（μForge）]__
- :fontawesome-solid-file-excel: __[合格供应商名录（AVL）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specs }

### 计算与内存 { #compute-and-memory }

- 高性能系统包含两个最高 240 MHz 的 Arm Cortex-M33 STAR-MC1 核
- 低功耗系统包含一个最高 24 MHz 的 Arm Cortex-M33 STAR-MC1 能效核
- 双性能核性能为 1968 CoreMark / 740 DMIPS
- HCPU 缓存：32 KB、2 路组相联指令缓存（I-cache）和 16 KB、4 路组相联数据缓存（D-cache）
- ACPU 配备指令缓存和数据缓存，用于提升 XIP 与应用执行效率
- 512 KB HPSYS 保留 SRAM 加 80 KB LPSYS 保留 SRAM，总计 592 KB 片上 SRAM
- 128 KB 零等待周期 D-TCM，与 HPSYS SRAM 地址空间共享
- 支持单精度 FPU 和 MPU
- GPDMA 支持链表模式

### PTM 并行任务机 { #ptm-peripheral-task-machine }

- 4 核 Parallel Task Machine，用于更适合硬件定时执行、而不是持续占用 CPU 服务的自定义外设任务
- 精简自定义指令集，支持总线读写、数据运算、条件跳转、IO 读写、事件等待和固定延时
- 从 PTM TCM 执行时具备周期级时序控制能力，适合确定性 IO 时序
- 每个 PTM 核最多可处理 16 路 IO，并带 FIFO/DMA 支持，便于构建自定义通信接口
- PTM 核可访问 AHB 总线上的存储器和外设寄存器，可向 CPU 产生中断，也可通过内部事件通知实现多核协同
- 适合自定义接口协议、自定义 PWM、批量内存/数据运算、多模块调度和自动传感器采集

### 无线连接 { #wireless-connectivity }

- 双模蓝牙
- 支持 BLE Audio 与 LE Long Range
- 接收灵敏度：BLE 1 Mbps 为 −100 dBm，BLE 125 kbps 为 −107.5 dBm，BR 为 −96 dBm，EDR2 为 −95 dBm
- 最大发射功率：EDR2/EDR3 为 13 dBm，BR/BLE 为 17 dBm
- BR 接收峰值电流低至 2.0 mA @ 3.8 V

### 图形、显示与摄像头 { #graphics-display-and-camera }

- ePicasso 3.0 2D/2.5D 图形引擎
- 硬件加速旋转、缩放、投影、镜像、alpha 混合和多图层合成
- 最大图形分辨率为 2048 × 2048
- RGB 格式支持 RGB888、RGB565、aRGB8888 和 aRGB8565
- 其他格式支持 L8/L4、G8/G4/G2、A8/A4/A2 和 YUV
- eZip 3.0 解压缩引擎，支持无损 eZip/eZip-A 图片和动画资源
- 支持 JPEG 图片与 MJPEG 动画解压缩
- eZip 可与 ePicasso 联动，无需中间帧缓存
- 专用 LCD 控制器支持 8080、SPI/Dual-SPI/Quad-SPI、DPI/RGB、JDI 和 8/16-bit EPD 显示接口
- 显示子系统支持低功耗息屏常显类应用
- DCMI 摄像头控制器支持 DVP 与 SPI/Dual-SPI/Quad-SPI 摄像头接口

### 音频与模拟 { #audio-and-analog }

- 1 路高保真 24-bit 音频 DAC，109 dB SNR
- 2 路高保真 24-bit 音频 ADC，97 dB SNR
- 音频采样率覆盖 8 kHz 至 96 kHz 等常用语音与音乐采样率
- Micbias LDO 输出范围 1.4 V 至 2.8 V，输出电流最高 2 mA
- 支持音频播放、录音、蓝牙通话和连接耳机的 MP3 播放设计
- 1 路 12-bit 通用 SAR ADC，共 12 通道
- 1 路片上温度传感器

### 存储与安全 { #storage-and-security }

- 支持合封（SiP）OPI-PSRAM，接口频率最高 156 MHz
- 支持合封（SiP）NOR Flash，接口频率最高 104 MHz
- 3 路 MPI（QSPI）接口，支持 NOR、NAND 和 QPI-PSRAM，并支持地址映射 XIP 工作方式
- 2 路 SD/SDIO 接口，支持 SD 3.0、SDIO 3.0 和 eMMC
- 支持 Flash 实时（on-the-fly）解密
- AES、HASH 和 CRC 加速器
- 真随机数发生器（TRNG）
- eShield 安全架构
- PSA Certified Level 1

### 外设与 I/O { #peripherals-and-ios }

- 最多 58 路 GPIO，取决于封装和可订购料号
- FreeIO 灵活 GPIO 分配
- 3 路 UART
- 4 路 I2C
- 2 路 SPI
- 2 路 I2S
- 2 路 PDM 接口（每路最多可连接 2 个数字麦克风）
- 1 路 USB 2.0 Full-Speed
- 2 路 CAN
- PTM 事件集成，用于事件驱动外设流程和多核协同
- 2 路 16-bit GPTIM
- 4 路 32-bit BTIM
- 2 路 32-bit ATIM
- 2 路 24-bit LPTIM
- 1 路 PWM
- 1 路 RTC
- 2 路 24-bit WDT 和 1 路独立 WDT

### 电源管理 { #power-management }

- 集成高效率 Buck 与低功耗 LDO
- 提供两路对外 3.3 V 供电输出，每路最大 150 mA
- 休眠（Hibernate）电流在 3.8 V（电池供电基线）下为 2.8 µA，在 3.3 V（外部供电基线）下为 1 µA
- 电池供电基线集成可配置线性锂离子电池充电电路（充电电流最高 400 mA）
- 满电电压范围 4.2 V 至 4.45 V
- 电池/系统输入范围[^4]：3.0 V 至 4.7 V
- VBUS 范围：4.5 V 至 5.5 V
- 工作温度范围：−40°C 至 +85°C

## 型号与封装 { #family-variants }

SF32LB57x 包括电池供电型号和采用外部稳压 3.3 V 供电的型号。由于封装图、供电脚、可用 GPIO 数量、合封存储和板级约束都会随具体型号变化，应在原理图设计前先确定准确料号。

下表所列料号取自思澈科技（SiFli）SF32LB57x 数据手册（DS5701 和 DS5702，V0.2.1，均为初稿）的订购表，但 `SF32LB57ZVN7N6` 除外，这些订购表中没有该料号。在设计导入前，请依据思澈科技（SiFli）最新的具体料号资料，确认订货编码、合封存储配置、电气限制和封装图纸。

实际的选型分组如下：

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
| 厚度[^3] | 0.9 mm | 0.9 mm | 1.1 mm | 0.9 mm | 0.9 mm | 0.9 mm |
| 引脚间距 | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm | 0.35 mm |
| GPIO | 46 | 46 | 46 | 46 | 46 | 47 |
| 合封存储 | 4 MB OPI-PSRAM + 16 MB QSPI-NOR | 4 MB OPI-PSRAM + 16 MB+8 MB QSPI-NOR（双晶粒） | 4 MB OPI-PSRAM + 16 MB×2 QSPI-NOR（双晶粒） | 8 MB OPI-PSRAM，无 QSPI-NOR | 16 MB OPI-PSRAM，无 QSPI-NOR | 无 PSRAM，仅 1 MB QSPI-NOR |
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
| 厚度[^3] | 0.9 mm | 0.9 mm | 0.98 mm | 0.98 mm |
| 引脚间距 | 0.35 mm | 0.35 mm | 0.4 mm | 0.4 mm |
| GPIO | 58 | 58 | 58 + 6（MPI3 或静态输出）[^2] | 58[^2] |
| 合封存储 | 8 MB（2×4 MB 双晶粒）OPI-PSRAM，无 QSPI-NOR | 16 MB OPI-PSRAM + 16 MB QSPI-NOR | 无 PSRAM + 16 MB QSPI-NOR | 16 MB OPI-PSRAM + 32 MB（2×16 MB 双晶粒）QSPI-NOR |
| 供电电压 | **3.3 V** | **3.3 V** | **3.3 V** | **3.3 V** |
| I/O 电压[^5] | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V | 3.3 V / 1.8 V |
| 工作温度 | −40 至 85°C | −40 至 85°C | −40 至 85°C | −40 至 85°C |

</div>

对 SF32LB57x 而言，封装选择不只是 PCB 成本问题，还会影响显示接口可用性、外部存储布线、GPIO 预算、调试下载保留引脚以及 PCB 扇出难度，因此应与供电架构一起尽早锁定。请以可订购料号而非仅封装名称作为 BOM 和原理图基线——存储后缀会改变 SiP 存储配置，并可能影响启动介质假设、电源时序和外部存储需求。

## 集成路径 { #integration-path }

使用以下顺序将 SF32LB57x 的初步选型推进为已验证的设计：

1. **验证固件路径。** 从 [SiFli-SDK 快速开始](../../getting-started/sifli/getting-started-sifli-sdk.md)开始，再通过 [SiFli-SDK 工作流](../../develop/platforms/sifli-sdk/overview.md)和[示例](../../develop/examples/index.md)验证计划使用的图形、音频、摄像头、蓝牙和存储功能。
2. **规划评估硬件。** μForge 当前未收录 SF32LB57 专用模组或开发板。请使用[SF32 产品选型工具](../product-selector.md)寻找最接近的评估平台，但在将结果用于 57x 设计前必须核对封装、供电、存储器配置和接口覆盖范围。
3. **进行硬件设计与评审。** 在发布原理图或布局前，使用本地[硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)——包括其[客户设计自查表](../../hardware/chip-guides/SF32LB57x_review_and_reference.md#7-customer-design-self-check)——以及[面向量产的设计](../../hardware/design-for-production.md)中的评审顺序；μForge 当前尚未发布该系列专用检查清单。
4. **核对权威来源。** 针对准确的可订购型号和封装，核对思澈科技（SiFli）的[数据手册]、[用户手册]和[原始设计指南（wiki.sifli.com）]；控制关键 BOM 选型时，请使用[合格供应商名录（AVL）]。

<!-- uf-faq:start -->
## 常见问题 { #frequently-asked-questions }

**SF32LB57x 的主要规格是什么？**
SF32LB57x 由应用 CPU（2× Cortex-M33 @240 MHz）与低功耗内核（Cortex-M33 @24 MHz，专用蓝牙控制器）组成，内置 592 KB SRAM，支持双模蓝牙（经典蓝牙 + BLE）。图形：ePicasso 3.0 + eZip 3.0。封装：QFN68 / QFN80 / BGA112（7 × 7 mm (QFN68), 8 × 8 mm (QFN80), 5.4 × 4.4 mm (BGA112)）。USB 2.0 FS。以上为系列级参数，具体以所选型号的数据手册为准。

**SF32LB57x 支持哪些显示接口？**
SPI / DSPI / QSPI / 8080 / EPD / JDI / RGB。具体支持情况因型号和封装而异。

**SF32LB57x 的封装内存储器有多大？**
按型号不同，封装内 PSRAM 最多 48 MB，封装内 NOR Flash 最多 32 MB。

**SF32LB57x 需要什么供电电压？**
按变体不同为 3.0–4.7 V or 2.97–3.63 V，请以数据手册确认具体范围。

**如何开始基于 SF32LB57x 的硬件设计？**
请先阅读 [SF32LB57x 硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)，了解原理图、电源、时钟/RF 和 PCB 布局要求，并在投板前使用原理图与布局检查清单。
<!-- uf-faq:end -->

## 相关产品 { #related-products }

### 硬件设计基线 { #hardware-design-baseline }

请以[硬件设计指南（μForge）](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)、官方硬件应用说明、数据手册和合格供应商名录（AVL）作为设计基线。发布原理图或 PCB 前，请确认电源架构、封装扇出、显示、存储、音频、摄像头、RF 和调试/下载方案。

### 开发板 { #development-kits }

使用官方参考原理图、最小系统连接方式和检查清单资料，规划电源、时钟、RF、显示、存储、音频、摄像头和量产接口。

### 参考产品 { #reference-products }

SF32LB57x 的典型终端产品包括可穿戴智能手表和手环、智能 HMI 设备、电子纸产品、中小型智能家电、便携式录音/音频设备、智能家居面板、紧凑型显示终端，以及带摄像头的蓝牙产品。
