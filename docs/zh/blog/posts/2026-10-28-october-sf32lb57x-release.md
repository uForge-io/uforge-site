---
icon: lucide/rss
description: "SF32LB57x 现已上线：应用 CPU 算力约为 SF32LB56x 的两倍，搭载 ePicasso 3.0 图形加速，成本结构极具竞争力。"
---

# 十月：SF32LB57x 来了 [2026-10-28] { #october-sf32lb57x-2026-10-28 }

本月，μForge.io 新增了 SF32LB57x 系列。它是 SF32LB52x 和 SF32LB56x 的增强版，CPU 算力和图形能力都有明显提升，同时保持了极具竞争力的成本结构。

### 更强的 CPU 算力 { #more-cpu-power }

SF32LB52x 和 SF32LB56x 都是一个 240 MHz Cortex-M33 应用核心搭配一个低功耗核心。SF32LB57x 则采用两个 240 MHz Cortex-M33 STAR-MC1 高性能核心，外加一个 24 MHz 低功耗核心，该核心同时作为专用蓝牙控制器。两个高性能核心合计为 1968 CoreMark / 740 DMIPS，约为 SF32LB56x 应用核心（984 CoreMark / 370 DMIPS）的两倍。有了这份余量，UI 渲染、应用逻辑以及音频或多媒体处理可以分别运行在不同核心上，而不必争用同一个核心，蓝牙和传感器任务则继续留在低功耗路径上。

### 更强的图形能力 { #more-graphics-capability }

图形部分升级为 ePicasso 3.0，并配备 eZip 3.0 硬件解压缩，而 SF32LB52x 为 ePicasso 2.0 Lite，SF32LB56x 为 ePicasso 2.0。ePicasso 3.0 可加速实时旋转、缩放、投影、镜像和 Alpha 混合，eZip 3.0 则可解压 eZip、JPEG 和 MJPEG 资源，无需占用大量 CPU 进行解码。除内核之外，该系列还新增 DCMI 摄像头输入、部分型号最高 48 MB 封装内 PSRAM 和 32 MB 封装内 NOR Flash、两路音频 ADC、两路 CAN 接口，以及用于卸载时序敏感外设任务的并行任务机 PTM。

### 极具竞争力的成本结构 { #competitive-cost-structure }

性能的提升并没有把 SF32LB57x 推入另一个成本档位。我们认为，就其提供的算力和图形能力而言，它依然保持着极具竞争力的成本结构；紧凑的 QFN68（7 × 7 mm）、QFN80（8 × 8 mm）和 BGA112（5.4 × 4.4 mm）封装也有助于控制板面尺寸和设计复杂度。对于已经超出 SF32LB52x 或 SF32LB56x 能力范围的产品，例如更丰富的智能手表界面、带摄像头的手持设备和以显示为核心的紧凑终端，它是自然的选择，而不必升级到旗舰级平台。

### 资料与上手路径 { #documentation-and-where-to-start }

[SF32LB57x 芯片页面](../../sf32-products/chips/SF32LB57x.md)提供完整介绍，相关料号已收录到[产品选型工具](../../sf32-products/product-selector.md)。[硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)与其他系列一样，按原理图、PCB 布局、检查清单和评审的结构组织。复用原理图之前，请先确定准确的订货料号，因为封装和供电基线会决定可用 GPIO 数量等细节，最终数值请以思澈科技（SiFli）数据手册为准。

### 本月其他更新 { #also-this-month }

韩文作为第九种语言加入，[上一篇文章](2026-10-07-multi-language-translation.md)中介绍的翻译也已正式上线。这些翻译仍为机器辅助，对母语读者来说可能不够自然；如果某个页面需要改进，[欢迎告诉我们](../../about/contact.md)。
