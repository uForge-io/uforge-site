---
icon: lucide/book-a
description: "μForge.io SF32 文档中常用的嵌入式、无线、图形与思澈科技（SiFli）专有术语速查表。"
tags:
    - 关于
---
# 术语表 { #glossary }

本页汇总 μForge.io 文档中常见的缩写和术语，包括通用嵌入式/无线术语，以及 SF32 平台使用的思澈科技（SiFli）专有名称。各条目均链接至对应的详细说明页面；本页仅供快速查阅，不能替代完整上下文。

## 架构与处理 { #architecture-and-processing }

* **MCU** —— **Microcontroller Unit，微控制器。** 将 CPU 核心、存储器与可编程输入/输出外设集成在单颗芯片上，专为运行专用、低开销的固件而优化，区别于运行通用操作系统的场景。
* **SoC** —— **System on Chip，片上系统。** 将计算机系统所需的全部电子电路与元件整合到单一芯片上的集成电路。本站中的 SF32 芯片一般归类为 MCU，因为它们面向的是微控制器级固件开发，而非完整应用处理器操作系统的运行场景。
* **Arm Cortex-M33** —— SF32 应用核心和蓝牙（Bluetooth）核心所采用的 32 位 Armv8-M Mainline 处理器架构。相较于较早的 Cortex-M3/M4，Armv8-M Mainline 可选配 TrustZone 安全扩展，以在硬件层面隔离可信和非可信代码/数据；但是否启用由具体芯片实现决定，并非每颗 Cortex-M33 都具备。当前 SF32LB52x 至 SF32LB58x 均未配置这项功能。更多信息请参见下方 STAR-MC1 词条和 [SF32LB52x 芯片页面](../sf32-products/chips/SF32LB52x.md)。
* **STAR-MC1** —— 安谋科技（Arm China）的可配置 Armv8-M Mainline 嵌入式 CPU IP，在兼容的 SF32 器件中作为 Cortex-M33 级应用处理器使用。CU、SP 和 SE 配置在缓存、TCM、XIPU 和 TrustZone 能力上有所不同；具体 SF32 料号实际提供哪些功能，需要逐一核对。思澈科技（SiFli）文档会随上下文使用“Arm Cortex-M33 STAR-MC1”或“Arm Cortex-M33”。[详见 STAR-MC1 架构页面](../learn/architecture/star-mc1.md)。
* **CDE** —— **Custom Datapath Extension，自定义数据路径扩展。** 一种用于特定加速的 Arm 自定义指令机制。安谋科技的 STAR-MC1 资料以 CRC32 作为 CDE 示例；实际 SF32 是否提供该能力及软件支持，均需逐颗核对。
* **DSP** —— **Digital Signal Processor，数字信号处理器/数字信号处理扩展。** Cortex-M33 核心提供的相关扩展，适用于音频、传感器融合等计算密集型任务。
* **MPU** —— **Memory Protection Unit，内存保护单元。** 限制代码可访问的内存区域的硬件机制，用于故障隔离与安全防护。
* **HAL** —— **Hardware Abstraction Layer，硬件抽象层。** SDK 中通过统一 API 暴露外设的层，与具体芯片型号无关。
* **AI / ML 加速器** —— 用于加速人工智能或机器学习工作负载的硬件，例如对小型神经网络模型进行推理。该能力因器件而异；请通过产品选型工具和目标芯片的数据手册确认。

## 无线连接 { #wireless-connectivity }

* **BLE** —— **Bluetooth Low Energy，低功耗蓝牙。** 大多数 SF32 可穿戴和物联网产品所采用的低功耗蓝牙无线模式。
* **Wi-Fi** —— 一种无线局域网技术。如果 SF32 产品文档明确说明支持外接 Wi-Fi，通过 SDIO 接口连接；设计定版前，仍应核对具体料号、板级布线、供电和软件支持。
* **双模蓝牙** —— 在同一射频上同时支持 BLE 与经典蓝牙（BR/EDR），适用于产品需要两者兼备的场景，例如音频流传输（经典蓝牙或 LE Audio）与低功耗控制通道并存。SF32LB52x/56x/57x/58x 支持；SF32LB55x 仅支持 BLE。
* **GAP** —— **Generic Access Profile，通用访问规范。** 定义设备角色、广播和连接建立方式的蓝牙层，是所有 BLE 应用的基础。
* **GATT** —— **Generic Attribute Profile，通用属性规范。** 定义服务及特征（即 BLE 设备对外提供的实际数据）如何组织和交换的蓝牙层。
* **Sibles** —— SiFli-SDK 的 GATT 服务框架，构建在标准 GAP 层之上。大多数 SF32 蓝牙产品都从现有的基于 Sibles 的示例起步，而不是从零构建 GATT 数据库。参见[蓝牙概览](../learn/bluetooth/overview.md)。
* **LE Audio** —— 较新的蓝牙低功耗音频标准，包含 LC3 编解码器与 Auracast 广播音频模式，区别于经典蓝牙音频规范。SF32LB52x/56x/57x/58x 支持；SF32LB55x 不支持。参见[蓝牙音频与 LE Audio](../learn/bluetooth/processor.md)。
* **OTA** —— **Over-The-Air，空中固件升级。** 通过无线链路（通常是 BLE）而非有线连接更新设备固件。
* **DFU** —— **Device Firmware Update，设备固件更新。** 蓝牙 OTA 升级通常实现的通用机制/协议类别。

## 图形与显示 { #graphics-and-display }

* **ePicasso** —— 思澈科技（SiFli）面向 SF32 系列的自研 2D/2.5D 图形加速引擎，将图像拷贝、混合、缩放、旋转、图层合成等像素级运算从应用 CPU 中卸载出来。参见 [ePicasso 架构页面](../learn/graphics/epicasso-gpu.md)。
* **eZip** —— 思澈科技（SiFli）的无损图形与通用数据压缩格式，支持的 SF32 器件可通过硬件解码。对于图形资源，思澈科技（SiFli）将其压缩比描述为略高于 PNG；对于通用数据，压缩比取决于源数据。压缩资源先经过总线传输再解码，因此 eZip 可降低 PSRAM、NOR Flash 等外部存储器的带宽需求。
* **TurboPixel** —— 部分 SF32 芯片采用的固定压缩比有损最终帧缓冲格式。extDMA 将渲染后的位图压缩为 TurboPixel，显示控制器负责解压，以降低 PSRAM 的带宽占用和容量占用。参见 [TurboPixel 帧缓冲压缩页面](../learn/graphics/turbopixel.md)。
* **LVGL** —— **Light and Versatile Graphics Library，轻量通用图形库。** 大多数 SF32 产品用于应用层 UI 的开源嵌入式框架，运行在 ePicasso 加速渲染之上。
* **HMI** —— **Human-Machine Interface，人机交互界面。** 作为设计类别的统称，指代设备上的用户界面（屏幕、触控、按键）。
* **RGB / DPI 显示接口** —— 将像素颜色分量直接传送到兼容面板或显示控制器的并行显示接口。其正式名称为 **DPI（Display Pixel Interface，显示像素接口）**；“RGB 接口”是板级设计中常用的简称。它通常使用像素时钟、水平和垂直同步信号，以及多根并行颜色数据线。相较串行显示接口，DPI 占用更多 GPIO，对并行走线要求更高，因此应结合目标封装的引脚预算和面板时序要求确认。
* **MIPI 显示接口** —— 由 MIPI Alliance 标准规定的显示接口，用于兼容的高带宽显示面板。
* **EPD** —— **Electronic Paper Display，电子纸显示屏。** 常用于低功耗、反射式屏幕的显示技术。
* **JDI 显示接口** —— 针对已记录的目标 SF32 器件，对兼容的 JDI / Sharp Memory-in-Pixel 显示屏提供的支持。

## 音频 { #audio }

* **ADC / DAC** —— **Analog-to-Digital / Digital-to-Analog Converter，模数/数模转换器。** 在具备集成音频功能的 SF32 器件中，ADC 和 DAC 分别对应音频输入前端和输出通路。SF32LB52x/56x/57x/58x 具备专用音频 ADC/DAC；SF32LB55x 不具备专用音频 ADC/DAC。
* **PDM** —— **Pulse-Density Modulation，脉冲密度调制。** SF32 音频器件支持的常见数字麦克风接口，与 I2S 并列。PDM 接口数量不等于麦克风数量：一个接口通常最多可连接两个数字麦克风，它们共用时钟，并分别利用时钟的上升沿和下降沿区分左右声道。选型和对比时应按 PDM 接口数量，而非可连接麦克风数量理解。
* **I2S** —— **Inter-IC Sound，芯片间音频总线。** 用于连接编解码器、DAC 或其他音频外设的标准数字音频接口。

## 电源与可靠性 { #power-and-reliability }

* **PMU** —— **Power Management Unit，电源管理单元。** SF32 芯片内置的电压调节模块，提供 BUCK/LDO 输出；部分设计会搭配外部思澈科技（SiFli）PMIC（如 SF30147C）提供额外电源轨。
* **PMIC** —— **Power Management IC，电源管理芯片。** 为 MCU 内置 PMU 之外的电源需求提供额外稳压电源轨的专用外部芯片。
* **LDO** —— **Low-Dropout regulator，低压差线性稳压器。** SF32 PMU 内置输出级之一的线性稳压器类型。
* **BUCK** —— 一种开关（非线性）稳压拓扑，在较大电流下比 LDO 更高效，同样集成于 SF32 PMU 中。
* **TRNG** —— **True Random Number Generator，真随机数发生器。** 基于物理热噪声的硬件熵源，用于密钥生成和安全功能。
* **PSA** —— **Platform Security Architecture，平台安全架构。** Arm 的安全框架及其认证体系。部分 SF32 芯片资料列出 **PSA Certified Level 1**；具体料号是否已获认证及其等级，应以对应官方资料为准，不应据此推断整个系列均已认证。

## 存储与内存 { #storage-and-memory }

* **SRAM** —— **Static RAM，静态随机存取存储器。** 用于运行应用代码和数据的片上高速工作内存。
* **PSRAM** —— **Pseudo-Static RAM，伪静态随机存取存储器。** 容量更大的外部工作存储器（SF32 模组通常以 System-in-Package 形式集成），用于在片上 SRAM 之外扩展图形缓冲区和大型应用的工作空间。
* **NOR / NAND Flash** —— 两种非易失性闪存类型，用于固件与素材存储；NOR 支持快速随机读取，常用于直接代码执行（XiP，Execute-in-Place）；NAND/SD-NAND 则以随机访问速度换取更高密度，适合图像、字体、日志等批量存储。
* **OPI / QPI / QSPI** —— **Octal/Quad Peripheral（或 Serial Peripheral）Interface，八线/四线（外设）串行接口。** 指闪存或 PSRAM 接口的引脚数/带宽等级（Quad = 4 条数据线，Octal = 8 条），会直接影响可达到的存储器带宽。
* **eMMC** —— **Embedded MultiMediaCard，嵌入式多媒体卡。** 用于存储容量较高的 SF32 设计的托管式 NAND 闪存接口。

## 外设与接口 { #peripherals-and-interfaces }

* **GPIO** —— **General-Purpose Input/Output，通用输入/输出。** 可配置的数字引脚，用于简单信号、按键、LED 及软件模拟接口（bit-banging）。
* **I/O** —— **Input/Output，输入/输出。** 泛指器件与系统其他部分交换数据或控制信号所使用的引脚和外设信号。
* **UART** —— **Universal Asynchronous Receiver/Transmitter，通用异步收发器。** 用于控制台/调试输出及简单点对点通信的标准串行接口。
* **SPI** —— **Serial Peripheral Interface，串行外设接口。** 用于显示屏、闪存、传感器等高速外设的同步串行总线。
* **I2C** —— **Inter-Integrated Circuit，集成电路间总线。** 常用于传感器和低速外设配置的同步多点串行总线。
* **SDIO** —— **Secure Digital Input Output，安全数字输入/输出接口。** 已记录的 SF32 设计使用该主机接口连接外部 Wi-Fi 器件。
* **DCMI** —— **Digital Camera Module Interface，数字摄像头模组接口。** 用于连接兼容图像传感器的并行摄像头接口。
* **FreeIO** —— 思澈科技（SiFli）的灵活 GPIO 分配能力，可在器件已记录的约束范围内将支持的信号映射到合适的 GPIO。
* **PTM** —— **Peripheral Task Machine，外设任务机。** 思澈科技（SiFli）在部分器件中提供的硬件能力，用于确定性处理外设任务。
* **RTC** —— **Real-Time Clock，实时时钟。** 可独立于主应用时钟域持续运行（或唤醒系统）的计时外设。

## 硬件与制造 { #hardware-and-manufacturing }

* **QFN** —— **Quad Flat No-lead package，四方扁平无引脚封装。** SF32 芯片所采用的封装类型，以引脚数和封装尺寸描述（如 QFN68）。
* **BGA** —— **Ball Grid Array package，球栅阵列封装。** 焊球排列在器件底部，可获得紧凑尺寸和更高引脚数，但需要支持 BGA 的 PCB 扇出布线和组装工艺。
* **BOM** —— **Bill of Materials，物料清单。** 制造一块印刷电路板组件（PCBA）所需元件、被动件与结构件的正式明细清单；优先选用思澈科技（SiFli）推荐的部件和模组，主要原因之一就是降低 BOM 复杂度。
* **EDA** —— **Electronic Design Automation，电子设计自动化。** 原理图设计、SPICE 仿真与 PCB 布局软件类别。[SF32 专属的封装/符号库见 EDA 工具库页面](../hardware/cad-components/eda-tool-libraries.md)。
* **AVL** —— **Approved Vendor List，合格供应商名录。** 思澈科技（SiFli）依据 SF32 硬件设计的电气容差验证过的合格二供元器件清单，涵盖晶振、稳压器、Flash 等。[见合格供应商名录页面](../hardware/cad-components/sifli-approved-vendor-list.md)。
* **EVB** —— **Evaluation Board，评估板。** 思澈科技（SiFli）发布的 SF32 参考/开发板，在定制硬件就绪之前用于验证设计并启动调试。
* **FAE** —— **Field Application Engineer，现场应用工程师。** 当公开文档无法覆盖硬件设计问题时，思澈科技（SiFli）的技术支持联系人。

## 软件与工具 { #software-and-tools }

* **SiFli-SDK** —— 思澈科技（SiFli）面向 SF32 芯片的主要固件开发套件；大多数量产固件都基于这一参考/厂商 SDK 构建。
* **SiFli CodeKit** —— 面向 SiFli-SDK 开发的 VS Code 扩展，可引导完成项目创建、配置、构建、烧录和监视流程，无需直接操作底层命令行工具链。
* **RTOS** —— **Real-Time Operating System，实时操作系统。** SF32 固件通常运行的操作系统类别（确定性调度、低开销），既可以通过 SiFli-SDK 自带的 RTOS 集成实现，也可以通过 Zephyr 实现。
* **sftool** —— 思澈科技（SiFli）面向 SF32 开发板的命令行烧录/恢复工具，也可恢复无法启动（变砖）的开发板。
