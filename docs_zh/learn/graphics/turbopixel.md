---
icon: lucide/minimize-2
description: "介绍 TurboPixel 如何通过固定压缩比的有损帧缓冲压缩，减少所支持的 SF32 芯片的缓冲区占用和显示读取流量。"
tags:
  - 图形
---

# TurboPixel 帧缓冲区压缩 { #turbopixel-framebuffer-compression }

## 概述 { #overview }

**TurboPixel** 是一种固定压缩比的有损压缩格式，用于支持该功能的 SF32 芯片上渲染完成后的最终位图，属于显示路径的一部分：**extDMA** 压缩位图，显示控制器在将像素传输到面板时解压 TurboPixel。

TurboPixel 并非源资源存储格式，也不能替代 [eZip](ezip.md)。eZip 对源资源进行无损压缩，再从存储器中读取；TurboPixel 则压缩渲染完成后的最终位图，以减少帧缓冲区流量所需的 PSRAM 容量和 PSRAM 带宽。

TurboPixel 相对于 eZip、ePicasso 和显示控制器的完整图形流程，请参阅[图形概览](overview.md#sf32-graphics-flow)。本文重点说明 TurboPixel 的压缩特性、集成权衡和可用性。

当基于 SF32LB55x、SF32LB56x 或 SF32LB58x 的设计受限于帧缓冲区容量或显示端读取流量时，可参考本文。本文帮助产品和固件工程师评估节省 PSRAM 的可预期收益，以及有损压缩对画质的影响；TurboPixel 不能替代 eZip 资源压缩。

## 固定压缩比与有损特性 { #fixed-ratio-and-lossy-by-design }

TurboPixel 有两项主要特征：

- **压缩比取决于所选配置。** 输入像素格式和压缩档位决定标称压缩比，图像细节不会改变它。实际分配大小还受行对齐和分块方式影响。应按所选芯片和 SDK 的尺寸计算规则分配缓冲区，不要直接套用其他配置的压缩比。
- **有损压缩。** TurboPixel 解压后的位图不能保证逐像素复现原始值。该格式牺牲部分图像保真度，以可估算的比例减少 PSRAM 占用和数据传输量。

在资源受限的嵌入式显示系统中，有损压缩通常是合理取舍，但这是产品层面的决定。应在目标面板分辨率、色深、观看距离和刷新行为下评价真实界面，而不是仅凭通用测试图判断质量。

## 帧缓冲区实测模板 { #framebuffer-compression-comparison-placeholder }

本节用于记录典型显示分辨率和 SDK 配置下的 TurboPixel 实测结果。与 eZip 的文件大小对比不同，这里比较的是**帧缓冲区分配大小和 PSRAM 流量**：TurboPixel 处理的是渲染后的位图，而不是源资源文件。

应同时包含不透明界面和经 Alpha 混合的界面。Alpha 混合通常发生在 TurboPixel 之前，即渲染器将前景和背景像素合成为最终帧缓冲区时。包含半透明图标、文字、阴影或图层的屏幕，仍可能生成不透明 RGB565 最终帧缓冲区；应记录这一区别，而不能因为源资源存在 alpha 就将压缩帧缓冲区视为含 alpha 通道。

<div align="center"><em>代表性 TurboPixel 帧缓冲区实测模板</em></div>

<div align="center" markdown>

| 场景 | 源/图层 Alpha | 最终帧缓冲格式和 Alpha 状态 | 未压缩分配/流量 | TurboPixel 分配/流量 | 相对未压缩 | 测试设置/视觉结果 |
|:---|:---|:---|---:|---:|---:|:---|
| 不透明 UI | 无 | 待确定（通常为不透明） | 待测 | 待测 | 待测 | 分辨率、刷新策略和 TurboPixel 压缩比/配置：待确定 |
| Alpha 混合 UI，在输出前完成合成 | 源图层中的逐像素 alpha 和/或全局 alpha | 待确定（合成后通常为不透明） | 待测 | 待测 | 待测 | 待记录混合内容；检查边缘、阴影、渐变和文字伪影 |
| 保留 Alpha 的输出路径（如支持） | alpha 保留至最终缓冲区 | 待确定 | 待测 | 待测 | 待测 | 测试前确认具体芯片、SDK、格式和显示路径 |

</div>

对于每条有效的 TurboPixel 路径，按 `TurboPixel framebuffer bytes ÷ uncompressed framebuffer bytes × 100%` 计算**相对未压缩**，即 TurboPixel 帧缓冲字节数除以未压缩帧缓冲字节数后乘以 100%。预期分配遵循适用的固定压缩比，但确切压缩比、支持的格式、对齐、刷新策略和实测 PSRAM 流量必须以所选芯片的文档、SDK 和目标硬件测试为准。应单独记录视觉验收结果：固定的分配比例并不意味着不透明界面、文字密集界面、渐变内容和 Alpha 混合内容会出现相同的图像伪影。

## 使用 TurboPixel 的原因 { #why-use-turbopixel }

### 减少帧缓冲存储占用 { #reduce-psram-capacity }

高分辨率或多个绘制缓冲区会占用大量 PSRAM。TurboPixel 可减少最终压缩位图的存储占用，为 UI 资源、音频缓冲、应用数据或其他图形缓冲区留出空间。

但选型时应计算同时存活的缓冲区总量，而不只是压缩位图大小。未压缩的渲染缓冲区、压缩后的显示缓冲区、压缩工作区和双缓冲副本可能同时存在。完整设计是否节省 PSRAM，取决于它们的大小和生命周期。

### 减少显示读取流量 { #reduce-psram-bandwidth }

显示控制器从压缩帧缓冲区读取的数据较少，因此可减少显示读取流量，缓解与 CPU、ePicasso、DMA、音频和无线通信对内存带宽的争用。

这不等于系统总流量按同样比例下降。渲染仍需写入像素，压缩还需读取输入、写入输出。应测量这些传输及其与显示读取的重叠情况。频繁重绘时，压缩开销可能抵消读取收益；同一帧反复显示时，结果则可能不同。除带宽外，还应实测系统能耗。

### 让内存与带宽预算更可预估 { #make-budgeting-predictable }

像素格式和压缩档位固定后，内容变化不会改变标称压缩比。分配缓冲区时，应采用 SDK 的压缩行大小及对齐规则；估算带宽时，应计入渲染、压缩和显示的全部读写。面板传输量要单独计算：TurboPixel 在输出到面板前已解压，并不会自动减少这部分数据。

## 质量与集成权衡 { #quality-and-integration-trade-offs }

应将 TurboPixel 作为完整显示设计的一部分进行验证：

- 针对文字、细线、渐变、图标、照片、动画和高对比度 UI 元素测试可见伪影。
- 确认所选器件和 SDK 支持的颜色格式、缓冲区对齐、extDMA 路径和显示控制器配置。
- 在显示、蓝牙（Bluetooth）、音频和 AI 工作负载同时运行时，测量帧时间、PSRAM 带宽、UI 延迟（latency）和功耗。
- 在硬件与驱动启动调试阶段保留未压缩路径，以便隔离图像质量和驱动问题。
- 即使特定 UI 中没有可见伪影，也不要将 TurboPixel 表述为无损格式。

## SDK 集成检查 { #sdk-integration-checks }

所引用的 extDMA 指南列出了十个标称压缩档位，但所引用的 SDK 尺寸计算实现仅支持档位 1、2、3。不要据此假定所有文档档位都可用于当前工程。应验证所选档位，并使用与之匹配的行大小计算规则；某些辅助函数遇到不支持的值时，可能退回其他档位。

extDMA 指南列出 RGB565、RGB888 和 ARGB8888 输入格式，但支持输入并不代表压缩后的显示路径可以保留 alpha。LCDC 中不使用专用 layer-0 解压寄存器的分支，仅接受 RGB565/RGB888 压缩图层；应确认所选芯片使用哪个分支。所引用的 LCDC 驱动通过 `HAL_LCDC_LayerSetCmpr` 为图层 0 启用压缩。

当前 OpenSiFli LCDC 头文件仅在启用 `HAL_EXTDMA_MODULE_ENABLED` 时定义压缩图层支持宏；系列条件排除了 SF32LB52x 和 SF32LB57x。头文件定义的压缩图层最大宽度为：SF32LB55x/SF32LB56x 为 512 像素，SF32LB58x 为 1024 像素。这是压缩图层的集成限制，不是面板分辨率的通用上限。源码注释还指出 LCPU 路径尚未启用。

SF32LB55x 的集成状态需要特别说明：当前 OpenSiFli LCDC 头文件会在启用 `HAL_EXTDMA_MODULE_ENABLED` 时定义压缩图层宏，但源码注释指出 LCPU 路径尚未启用；已发布的 SDK LCDC 功能表则将 55x 的压缩图层解压标为不支持。与此同时，SF32LB55x 数据手册记载了 TurboPixel 和 LCD 控制器解压功能。头文件中的编译期宏并不能证明完整显示链路已通过验证，因此应将 55x 视为有条件支持，并针对具体 SDK 版本、核心、构建配置和目标硬件验证，不要仅凭宏判断运行时支持。

渲染器、extDMA 和显示控制器之间必须明确缓冲区使用权。渲染完成后才能压缩，压缩完成后才能交给显示控制器，显示读取结束后才能复用该缓冲区。对于可缓存的共享内存，硬件读取前应对源缓冲区执行缓存清理（clean），将 CPU 写入的数据回写到内存；硬件写入前，应妥善处理目标缓冲区的缓存行，避免脏缓存行后续回写时覆盖硬件结果；操作完成后，CPU 读取结果前应使相应缓存行失效。还需保证缓存行边界及相邻数据的安全。压缩完成不等于面板传输完成。

extDMA 的源地址、目标地址和传输长度均须按 4 字节对齐。应遵循所选 SDK 的行跨度、分块及缓冲区大小计算规则，不能仅将原始帧字节数除以标称压缩比。

## SF32 系列中的可用性 { #availability-in-the-sf32-family }

以下 SF32 系列在文档中有 TurboPixel 的记载：

<div align="center"><em>TurboPixel 支持情况（文档记载）</em></div>

<div align="center" markdown>

| SF32 系列 | TurboPixel 状态 | 集成说明 |
|:---|:---|:---|
| **SF32LB52x** | 不支持 | 使用未压缩帧缓冲区，或采用其他已支持的内存/带宽策略。 |
| **SF32LB55x** | 有条件支持；尚未证明端到端可用 | 当前 LCDC 头文件在启用 extDMA 时定义压缩图层能力，但注释指出 LCPU 路径尚未启用；已发布的 SDK 功能表将 55x 标为不支持。请按具体核心、SDK 配置和目标硬件验证。 |
| **SF32LB56x** | 文档已记载 | extDMA 以固定压缩比对最终帧缓冲进行有损压缩，再由显示控制器解压。 |
| **SF32LB57x** | 不支持 | 使用未压缩帧缓冲区，或采用其他已支持的内存/带宽策略。 |
| **SF32LB58x** | 文档已记载 | extDMA 以固定压缩比对最终帧缓冲进行有损压缩，再由显示控制器解压。 |
| **其他 SF32 系列** | 逐器件确认 | 不要根据 eZip、ePicasso 或 PSRAM 的存在推断 TurboPixel 支持。请检查具体芯片的数据手册、技术参考手册、SDK 版本和显示驱动。 |

</div>

此表记录的是文档所确认的系列支持情况，并不保证每种封装、面板接口、像素格式、SDK 版本或板级配置均可使用。确定内存容量和带宽方案前，必须确认具体目标配置。

## 要点 { #key-takeaways }

- TurboPixel 是**固定压缩比、有损**的最终帧缓冲压缩格式。
- extDMA 从渲染后的位图生成 TurboPixel；显示控制器在面板路径上解压。
- 其主要目的在于减少**帧缓冲存储占用**和**显示读取流量**；实际收益应按完整的缓冲区配置和传输流程验证。
- 官方资料记载 SF32LB55x、SF32LB56x 和 SF32LB58x 支持 TurboPixel。当前源码在启用 extDMA 时为 55x 定义压缩图层能力，但注释指出 LCPU 路径尚未启用，已发布的 SDK 功能表也将 55x 标为不支持；因此应将 55x 视为有条件支持，并验证完整显示链路。当前源码排除 SF32LB52x 和 SF32LB57x；其他目标也应逐一确认。
- TurboPixel 与 eZip 相辅相成：eZip 是无损资源压缩，TurboPixel 是最终位图的有损压缩。

## 主要参考资料 { #primary-references }

- [extDMA 指南](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/docs/source/zh_CN/hal/ext_dma.md)
- [压缩大小计算实现](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/sifli_cmpr.h)
- [extDMA API](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_ext_dma.h)
- [LCDC 支持条件](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/Include/bf0_hal_lcdc.h)
- [OpenSiFli 当前 LCDC 压缩图层条件](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_lcdc.h)
- [生成版 SDK LCDC 功能表](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/hal/lcdc.html)
- [LCDC 图层实现](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/drivers/hal/bf0_hal_lcdc.c)
- 产品简介：[SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf)、[SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf)、[SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
