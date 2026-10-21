---
icon: lucide/cpu
description: "介绍 Arm China STAR-MC1 CPU IP 的 Armv8-M Mainline 架构、与 Cortex-M33 的软件模型关系，以及对 SF32 固件开发的影响。"
tags:
    - 架构
---
# STAR-MC1 { #star-mc1 }

## 简介 { #introduction }

**STAR-MC1** 是 Arm China 设计的 **Armv8-M Mainline** CPU IP，Cortex-M33 采用的也是这一架构规范。它因而提供熟悉的 Armv8-M 软件模型，但并不保证 Cortex-M33 固件可以不经修改直接复用。可选架构扩展、内核配置、SoC 外设、启动与链接配置以及 SDK 支持都可能不同。应将面向 Cortex-M33 的软件作为移植起点，并在目标器件和 SDK 上验证。

在采用 STAR-MC1 的 SF32 器件上，思澈科技（SiFli）的资料可能根据语境和描述粒度，将应用 CPU 标为 **Arm Cortex-M33**、**Cortex-M33 STAR-MC1** 或 **STAR-MC1**。这些名称本身并不能确认可选内核功能或确切的 SoC 配置；选型时应以目标器件资料为准。

如果你熟悉 Arm Cortex-M 系列，并需要从软件、性能或选型角度正确理解 STAR-MC1，请阅读本文。它说明哪些部分仍然熟悉、哪些能力会随 SoC 实现而变化，以及为什么不应把 STAR-MC1 简单视为 Cortex-M7 的直接替代品。

本文所说的兼容性，是指共享 Armv8-M 架构级软件模型，并不意味着固件镜像可以直接替换。复用固件前，需要根据目标 SoC 和 SDK 核对内核功能配置、编译选项、启动代码、链接布局、中断分配、外设驱动和安全配置。

## 面向开发者的定位 { #positioning-for-developers }

最有用的理解方式**不是**“STAR-MC1 固定介于 Cortex-M33 和 Cortex-M7 之间”。STAR-MC1 是一种可配置、与 Cortex-M33 兼容的 **Armv8-M Mainline** CPU IP。它的价值在于：最终 SoC 可在熟悉的 MCU 软件模型之上，提供缓存、紧耦合存储器（TCM）、DSP 指令、协处理器接口和 TrustZone 等可选的内存系统与加速能力。

<div align="center"><em>表：STAR-MC1 在 Cortex-M 系列中的定位</em></div>

<div align="center" markdown>

| 你熟悉的内核 | STAR-MC1 中仍然熟悉的部分 | 实际差异 | 不应假定 |
|:-------------|:---------------------------|:---------|:---------|
| Cortex-M4 | 裸机和 RTOS 开发、中断、DMA，以及外设驱动开发。 | STAR-MC1 使用更新的 Armv8-M 软件模型，并可提供更丰富的内存与加速选项。 | Cortex-M4 二进制、Armv7E-M 假设或相同的调试/安全特性可直接沿用。 |
| Cortex-M33 | Armv8-M 的编程、异常和工具链模型。 | SoC 实现可为依赖 Flash/PSRAM、UI、音频或网络连接的工作负载提供更充足的内存系统资源。 | 每个 STAR-MC1 器件都启用了缓存、TCM、DSP、FPU、CDE 或 TrustZone。 |
| Cortex-M7 | 需要管理内存布局、缓存行为、DMA 一致性和实时延迟（latency）。 | STAR-MC1 保持 MCU 级 Armv8-M 基础，面向灵活、注重功耗的 IoT 设计。 | 它是 Cortex-M7 的直接替代，或具有相同的吞吐量、内存系统和软件生态。 |

</div>

开展 SF32 项目时，应根据器件文档中的存储器、外设和 SDK 支持来选型，而不能只根据 STAR-MC1 标签判断。公开的 STAR-MC1 资料介绍了 Armv8-M，并将缓存、TCM、DSP、协处理器接口和 TrustZone 列为可能具备的功能。具体产品是否实现并启用这些功能，应以 SoC 文档为准。

## 为什么 STAR-MC1 很重要 { #why-star-mc1-matters }

传统 Cortex-M33 MCU 非常适合安全、低功耗的嵌入式控制，但现代联网产品往往不只需要控制逻辑。可穿戴设备、智能显示、蓝牙（Bluetooth）音频产品和边缘 AI 设备，通常还需要响应灵敏的用户界面、更大的外部存储、信号处理能力，以及频繁搬运图形或音频数据。

如果 SoC 实现了可选的缓存、TCM 和自定义指令，且软件能够有效利用这些功能，STAR-MC1 就可以在保留 MCU 开发模型的同时减少存储器等待或加速特定运算，从而满足这些应用需求。性能和能耗收益需要在实际器件上用有代表性的负载验证，不能仅凭内核名称作出判断。

## Cortex-M 系列对比 { #cortex-m-family-comparison }

下表总结了 STAR-MC1 在常见 Cortex-M 处理器中的位置。精确能力仍取决于最终 SoC 的具体实现，但这一定位对于产品架构选型很有参考价值。

为便于阅读，表中使用 `CM3`、`CM4`、`CM33`、`CM55` 和 `CM7` 分别表示对应的 Cortex-M 处理器。

<div align="center"><em>表：Cortex-M 系列对比</em></div>

<div align="center" markdown>

| 特性 | CM3 | CM4 | CM33 | STAR-MC1 | CM55 | CM7 |
|:-----|:---------:|:---------:|:----------:|:--------:|:----------:|:---------:|
| Arm 架构 | Armv7-M | Armv7E-M | Armv8-M Mainline | Armv8-M Mainline | Armv8.1-M Mainline | Armv7E-M |
| 流水线 | 3 级，顺序执行 | 3 级，顺序执行 | 3 级，顺序执行 | 顺序执行；公开技术参考手册未注明级数 | 4 级，顺序执行；启用 Helium 时为 5 级 | 6 级，超标量 |
| 主系统总线接口 | 3 × AMBA AHB-Lite（哈佛架构） | 3 × AMBA AHB-Lite（哈佛架构） | 2 个 AMBA 5 AHB5 接口：C-AHB + S-AHB | 2 个 AMBA 5 AHB5 接口：C-AHB + S-AHB | 64 位 AMBA 5 AXI5；32 位 AHB 外设接口；64 位 TCM AHB 从接口 | 64 位 AMBA 4 AXI；32 位 AHB 外设接口；32 位 TCM AHB 从接口 |
| TrustZone 支持 | 否 | 否 | 可选；由 SoC 实现决定 | 可选；由 SoC 实现决定 | 可选；由 SoC 实现决定 | 否 |
| DSP 指令 | 无专用 DSP 扩展 | 原生 DSP 扩展 | 可选 DSP 扩展 | 可选 DSP 扩展 | 原生 DSP 扩展；可选 Helium（MVE） | 原生 DSP 扩展 |
| Arm Helium（MVE） | 不支持 | 不支持 | 不支持 | 不支持 | 可选；整数或浮点 MVE，取决于配置 | 不支持 |
| 浮点单元 | 无原生 IP 能力 | 可选单精度 | 可选单精度 | 可选单精度 | 可选标量 FP16/FP32/FP64；可选向量 FP16/FP32 | 可选单精度/双精度 |
| I-cache / D-cache | 不包含在处理器 IP 中；SoC 层级可另行加入缓存 | 不包含在处理器 IP 中；SoC 层级可另行加入缓存 | 不包含在处理器 IP 中；SoC 层级可另行加入缓存 | 处理器 IP 可选；是否实现及其配置取决于具体实现 | 处理器 IP 可选；是否实现及其配置取决于具体实现 | 处理器 IP 可选；是否实现及其配置取决于具体实现 |
| Arm Custom Instructions / CDE | 无原生 IP 能力 | 无原生 IP 能力 | Arm 定义 CDE 指令编码；自定义运算和数据通路由 SoC 定义；整数 CDE 可选，浮点 CDE 取决于 FPU 和配置 | STAR-MC1 技术参考手册记载了 GPR CDE 和 FPCDE 模块；实际实现及产品可用性取决于 SoC 配置 | Arm 定义 CDE 指令编码；自定义运算和数据通路由 SoC 定义；r1 及以后版本可选，r0 不支持 | 无原生 IP 能力 |
| 软件兼容性 | 基线 | 与 CM3 兼容 | Armv8-M 软件模型；需要 Armv8-M 工具链 | 与 CM33 兼容 | 与 CM33 兼容；Helium 需工具链支持 Armv8.1-M | 与 CM4 兼容（同属 Armv7E-M） |
| CoreMark/MHz 参考值* | 3.34 | 3.42 | 4.02 | 4.02† | 4.20 | 5.01 |
| 相对功耗水平（定性）‡ | 很低 | 低 | 低 | 低 | 中 | 高 |
| 计算能力定位（定性） | 低功耗标量控制 | 实时标量 DSP | 安全、可配置的标量 MCU | CM33 兼容的标量 CPU；由 SoC 实现的缓存、TCM 和自定义指令可提升系统级性能 | 启用 Helium 时适合向量 DSP/ML | 高标量吞吐和存储器带宽 |
| 建议的典型应用 | 低复杂度控制和简单传感器节点 | 电机控制、音频 DSP 和传感器处理 | 安全联网终端和 IoT 控制 | 具备丰富 UI 的可穿戴设备、蓝牙音频和基于 Flash/PSRAM 的 IoT 产品 | ML 传感器融合、语音/音频、视觉和 DSP | 高响应 HMI、高吞吐控制和网络处理 |

</div>

\* 这些参考数值来自 Arm 的 [2020 版 Cortex-M 对比表](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Cortex-A%20R%20M%20datasheets/Arm%20Cortex-M%20Comparison%20Table_v3.pdf?revision=077cd073-b4ff-4193-8a26-5e854aa6e431)，不是通用于当前所有配置的分数，也不能用于直接排列最终 SoC 的性能。编译器、内存系统、缓存设置和基准测试配置都会影响结果。

† 由于 STAR-MC1 与 CM33 兼容，此处使用 CM33 的参考数值。该数值仅用于比较基线，不是 Arm 公布或实测的 STAR-MC1 结果。

‡ 本行用于说明内核架构层面的相对定位，并非实测芯片功耗数据。实际功耗受工艺制程、电压、频率、存储器架构、启用的功能、外设、固件占空比和最终 SoC 实现等因素共同影响。

流水线和总线两行仅概述各 IP 的主要执行流水线和系统存储器接口。CM33 和 STAR-MC1 共享 C-AHB/S-AHB 总线安排；缓存和其他可选存储器功能独立于该总线接口，其可用性取决于 SoC 配置和实现。这些描述并不表示每颗最终 SoC 都启用了相应接口；表中未列出调试、跟踪、协处理器及其他可选端口。

处理器 IP 参考资料：Arm [CM3 数据手册](https://documentation-service.arm.com/static/62053c120ca305732a3a5c14)、[CM4 文档](https://support.arm.com/compute-ip/cortex-m4)、[CM33 技术参考手册](https://documentation-service.arm.com/static/66be1ce8882fec713ef49954)、[CM55 数据手册](https://documentation-service.arm.com/static/6205407494e7af28dd7c9cb5)、[CM7 数据手册](https://developer.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M7-Processor-Datasheet.pdf)和 [STAR-MC1 技术参考手册](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf)。

## 架构增强点 { #architectural-enhancements }

STAR-MC1 是在 Cortex-M33 基础上的增强，而不是替代。最关键的改进来自实现层面的优化，它们让内核少花时间等待存储器，多花时间完成有效执行。

### 指令缓存与数据缓存 { #instruction-and-data-caches }

I-cache 和 D-cache 是否可用以及如何配置，取决于 SoC 实现。只有在 SoC 实现并启用这些缓存时，它们才尤其适合从外部 Flash 执行代码、访问 PSRAM，或运行较大的 UI 与中间件栈。

主要收益包括：

- 从非 SRAM 存储器取指更快。
- 平均数据访问延迟更低。
- 图形、音频、协议栈和 UI 框架的性能更好。
- 当相同代码或数据被反复使用时，内存总线压力更小。

对于可缓存且硬件不保证一致性的缓冲区，与 DMA、显示控制器、音频接口或其他总线主设备共享内存的驱动，必须遵循 SDK 或 RTOS 的缓存维护规则。外设读取 CPU 写入的数据前，应将修改后的缓存内容写回内存；DMA 写入前应按平台要求准备接收缓冲区，传输完成后、CPU 读取前再使过期缓存行失效。DMA 占用缓冲区期间，CPU 不得访问它。缓冲区应按完整缓存行分配，不能与无关数据共用缓存行，并应执行平台要求的完成检查和内存屏障。不可缓存或硬件保证一致性的缓冲区，仍需遵循各自的同步规则。具体的缓冲区使用权交接和脏缓存行风险，见 [PSRAM 与其他存储器](psram-and-memory-types.md#caches-and-external-memory-execution)。

### Armv8-M 自定义数据通路扩展 { #armv8-m-custom-datapath-extension }

在处理器 IP 层面，Arm 定义 CDE 指令编码，SoC 设计者定义自定义运算和数据通路。CM33 可选支持整数 CDE；浮点 CDE 取决于 FPU 和具体配置。STAR-MC1 技术参考手册记载了 GPR CDE 和 FPCDE 模块，但这只能说明 IP 层面的能力，不能据此认定某个 SF32 器件或 SDK 已提供可用的 CDE。思澈科技（SiFli）的 SiFli-SDK [v2.5.1 发布说明](https://github.com/OpenSiFli/SiFli-SDK/releases/tag/v2.5.1)记录了修复 SF32LB57x 上 CDE 被误启用的问题；实际使用前，应确认目标器件和 SDK 的支持情况。CM55 从 r1 开始可选支持 CDE，r0 不支持。CP0–CP7 是分配给协处理器或 CDE 的编码空间，并不代表有八条自定义指令或八个额外加速器。使用前应核对内核版本、已实现模块，以及编译器和 SDK 的支持。详情见 [CM33 数据手册](https://www.arm.com/-/media/Arm%20Developer%20Community/PDF/Processor%20Datasheets/Arm-Cortex-M33-Processor-Datasheet.pdf)、[CM55 CDE 版本说明](https://developer.arm.com/community/arm-community-blogs/b/architectures-and-processors-blog/posts/armv8_2d00_m-based-processor-software-development-hints-and-tips)和 STAR-MC1 技术参考手册 B7、B8 章。

CDE 可用于如下工作负载：

- 数字信号处理。
- 密码学。
- 计算机视觉基础算子。
- 机器学习内核。
- 传感器融合运算。

CDE 不会自动加速所有应用。只有借助受支持的编译器、相关库或厂商提供的 SDK 组件，在代码中生成并使用相应的自定义指令，应用才能获得加速。在 SoC 和软件栈均支持 CDE 的前提下，无需将工作负载迁移到独立的应用处理器，也能为特定应用提供加速路径。

### 内存系统优化 { #memory-system-optimization }

许多现代 MCU 工作负载的瓶颈不仅在 CPU 频率，也在内存延迟和带宽。因此，STAR-MC1 的内存系统设计，以及 SoC 实现并启用的缓存功能，对 SF32 这一类器件尤为重要，因为应用可能同时用到内部 SRAM、封装内 Flash、PSRAM、显示缓冲区和外设 DMA。

通常在以下场景下收益最大：

- 代码从 Flash 或外部存储器执行，而不是从紧耦合 SRAM 执行。
- UI 框架反复访问图像、字体或布局数据。
- 音频、蓝牙、图形和应用任务并发运行。
- 工作集能够较好地装入缓存。

如果是完全 CPU 受限、且已经从高速 SRAM 运行的紧凑循环，提升可能就不那么明显。

## 性能特征 { #performance-characteristics }

不应把 STAR-MC1 描述成会自动提升小型合成 CPU 基准指标，例如 **CoreMark/MHz** 或 **DMIPS/MHz**。这些基准主要衡量紧凑整数工作负载，而且规模往往小到足以完全在本地高速存储器中运行。在这种情况下，指令缓存和数据缓存可能相较标准 Cortex-M33 级实现并不会带来明显提升。

STAR-MC1 是兼容 Cortex-M33 的内核，提供可配置的内存子系统和面向特定负载的可选加速功能。当应用的瓶颈在于存储器访问、外部 Flash 或 PSRAM 延迟、图形资源、协议栈，或对大规模代码和数据的反复访问时，这些功能可能带来收益。具体收益取决于器件实现了哪些功能，以及应用是否有效利用了它们。

<div align="center"><em>表：性能特征</em></div>

<div align="center" markdown>

| 工作负载类型 | 预期 STAR-MC1 收益 | 原因 |
|:-------------|:-------------------|:-----|
| 小型 CoreMark / DMIPS 类循环 | 通常有限 | 工作集很小，往往已经适合高速存储器。 |
| 从 Flash 或 PSRAM 执行代码 | 往往有提升 | 若 SoC 实现并启用 I-cache，可减少取指停顿。 |
| 数据密集型 UI、图形和中间件 | 往往有提升 | 若 SoC 实现并启用 D-cache，可降低重复数据访问延迟。 |
| DMA 密集型外设工作负载 | 取决于软件设计 | 可缓存且硬件不保证一致性的缓冲区需要缓存维护；所有缓冲区均需正确交接使用权并同步。 |
| 使用 CDE 的计算例程 | 可能改善 | 自定义指令可加速特定操作。 |

</div>

## 这对 SF32 开发者意味着什么 { #what-this-means-for-sf32-developers }

开发 SF32 固件时，可以将 STAR-MC1 视为兼容 Cortex-M33 的应用处理器。需要结合应用的代码、数据和时序要求，评估具体器件实现的存储器和加速功能。

在实践中：

- 应将 Cortex-M33 固件视为源码移植的起点，而非可直接替换的镜像；复用前应确认目标器件配置和 SDK 支持。
- RTOS、中断、特权、TrustZone 和调试概念，对 Cortex-M 开发者仍然是熟悉的。
- 对性能敏感的应用需要谨慎放置关键代码和数据，并正确使用 SDK 的缓存与内存 API。
- 对可缓存且硬件不保证一致性的 DMA 缓冲区，应显式维护缓存；所有 DMA 缓冲区均需正确交接使用权并同步。
- 图形、音频、AI 和连接类工作负载，最能从对 SoC 硬件加速器和内存层级的有效利用中获益。

STAR-MC1 并非为了替代 Cortex-M7 的所有应用场景。如果应用需要在更高功耗下追求极致单核吞吐，Cortex-M7 级器件仍可能更合适。对于电池供电的联网产品，STAR-MC1 则在兼容性、性能和能效之间提供了很好的平衡。

## 适合的应用类型 { #good-application-fits }

对于需要存储器系统或特定应用加速，同时又受 MCU 级功耗和集成条件约束的产品，可以考虑采用 STAR-MC1 的器件。当存储器延迟比紧凑的 CoreMark/DMIPS 分数更重要时，尤其值得评估。选型应依据具体 SoC 的功能配置和实测负载表现，而不是假定它一定优于所有传统 Cortex-M33 器件。

典型例子包括：

- 智能手表和健身追踪器。
- 蓝牙音频设备。
- 可穿戴医疗和健康监测产品。
- 智能显示和紧凑型 HMI 系统。
- 边缘 AI 传感设备。
- 使用 LVGL 或其他嵌入式 UI 框架的产品。
- 从大容量 Flash 或 PSRAM 执行代码的设备。

## 要点 { #key-takeaways }

- STAR-MC1 与 Cortex-M33 兼容，因此保留了熟悉的 Armv8-M 嵌入式软件模型。
- 当 SoC 启用指令缓存和数据缓存时，它们可提升真实工作负载表现，尤其是在代码和数据位于快速内部 SRAM 之外时。
- 当 SoC 和软件栈支持时，CDE 提供了自定义指令加速路径。
- STAR-MC1 将 CM33 兼容的软件模型与可配置的存储器和加速功能结合起来；应比较具体 SoC 和实测工作负载，不能仅凭内核名称判断性能。
- 对采用 STAR-MC1 的 SF32 器件而言，内核与 SoC 实际实现的配套功能可共同支持更丰富的图形、音频、AIoT 和可穿戴应用，同时保留 MCU 式开发模式。

---

另见：[SF32 系列概览](../../sf32-products/family/SF32_family.md)，了解 STAR-MC1 在更广泛的 SF32LB5x 芯片谱系中的定位。

主要参考资料：[Arm China STAR-MC1 技术参考手册](https://www.armchina.com/webarm/arm/common/download/profile/resource/file/Documents/Application-Notes/Technical-Reference-Manual/Star_Technical_Reference_Manual_00903001_0100_00_en.pdf)。
