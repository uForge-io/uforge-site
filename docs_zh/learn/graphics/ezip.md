---
icon: lucide/file-archive
description: "介绍 eZip 和 eZip-A 如何在支持这些功能的 SF32 芯片上减少 UI 资源存储占用、内存访问流量和 CPU 解码负担。"
tags:
  - 图形
---

# eZip 无损压缩与硬件解码 { #ezip-lossless-compression-and-hardware-decoding }

## 简介 { #introduction }

**eZip** 是思澈科技（SiFli）面向图形资源的专有无损压缩格式。在支持相应功能的 SF32 器件上，EZIP 硬件模块可解码 eZip 图形资源；该模块还提供独立的 GZIP 和 LZ4 通用数据模式，解压结果经 AHB 写入内存，而不是直接输出到 EPIC。产品无需将每个显示资源都以未压缩位图形式存放在 NOR Flash、PSRAM 或文件系统中，可改为存储 eZip 压缩资源，在 UI 需要时解码。

**eZip-A** 是对应的动画资源格式。源资源在构建或资源准备阶段完成转换；eZip 并不是可在运行时接收任意文件的通用图像解码器。

对于 OTA 固件镜像等非图形数据，产品必须定义并验证完整的更新流程，包括存储、完整性校验、兼容性以及预期的解压路径。[图形流程](overview.md#sf32-graphics-flow)适用于显示资源，而不适用于这类应用层更新工作流。

对于带图形界面的产品，核心目标是减少从存储器搬运的数据量，并避免应用 CPU 重复解压资源。这样可以降低存储占用和外部存储器访问流量，并为 UI、蓝牙（Bluetooth）、音频和应用逻辑留出更多处理余量。

eZip 相对于 ePicasso、TurboPixel 和显示控制器的位置，请参阅[图形概览](overview.md#sf32-graphics-flow)。本文重点说明 eZip 的资源准备、压缩特性和解码。

当 UI 资源占用过多 Flash 或外部存储器带宽，或需要可重复的资源转换流程时，请阅读本文。本文区分源资源的无损压缩与最终帧缓冲压缩；后者请参阅 [TurboPixel](turbopixel.md)。

## 能力与边界 { #capabilities-and-boundaries }

eZip 适合纳入量产资源生成流程，不宜当作处理任意文件的通用工具：

- **无损图形压缩。** 该格式保留图像数据并支持透明度。思澈科技（SiFli）仅将其典型图形压缩比定性描述为*略高于 PNG*，并未公布一个固定的数值压缩比。
- **静态与动画资源。** GraphicsTool 可将 PNG、GIF 和 APNG 转换为 eZip 静态资源或 eZip-A 动画。
- **支持器件上的硬件辅助解码。** 在选定芯片、SDK、源格式和驱动路径支持时，可减少应用 CPU 的解码负担。
- **图形工具工作流。** 思澈科技（SiFli）的 GraphicsTool 支持常用源格式、尺寸调整、图像转换、批量处理以及 eZip/eZip-A 生成。
- **在支持的器件上与 ePicasso 集成。** 直接输出可省去存放完整解码源图像的缓冲区，减少缓冲区容量需求和内存访问流量。

“无损”指的是压缩过程不丢失编码器输入的像素数据，并不代表此前的转换也无损。缩放图像、将 RGB888 转为 RGB565 或丢弃 alpha 都可能在压缩前造成信息损失。校验时，应将解码结果与尺寸、像素格式相同的编码器输入比较；需要透明度时必须保留 alpha。

## 压缩比与通用用途 { #compression-ratio-and-general-purpose-use }

对于图形资源，应以 PNG 作为实际基线：思澈科技（SiFli）将 eZip 描述为在保持图像无损和透明度支持的同时，压缩比略高于 PNG。实际文件缩减程度仍会受图像尺寸、像素格式、透明度、调色板使用和图像细节影响。应使用已批准的转换配置测量代表性资源，不应依据单一百分比进行容量预算。

思澈科技（SiFli）的 EZIP 工具也支持使用 GZIP 或 LZ4 模式压缩通用文件。这与将图形资源转换为 eZip 格式是不同的处理流程。通用数据的压缩比取决于源数据：重复性或结构化数据可能压缩得较好；已经压缩过的 JPEG 图像、MP4 视频、ZIP 压缩包或加密数据，则可能几乎无法进一步压缩。用于非图形数据前，应验证输出大小以及目标器件支持的解码模式。

EZIP HAL 将图形 eZip、GZIP 和 LZ4 定义为不同工作模式。通用 GZIP/LZ4 解压使用 AHB 内存输出路径，而不是直接向 EPIC 输出。OTA 压缩包必须匹配所选模式及其支持的数据封装和大小限制；图形 `.ezip` 文件不能与任意压缩升级包混用。

## 代表性图像大小实测模板 { #representative-image-size-comparison-placeholder }

本节用于记录代表性**不透明**和**带 Alpha** UI 图像的同条件实测结果。使用已批准的工具版本和配置转换每张源图像后，替换占位符。结果中应保留源图像尺寸、颜色格式、Alpha 处理方式和 JPEG 质量设置。eZip 和 PNG 保留源图像的透明度；JPEG 不携带 alpha，因此其透明图像对比必须使用有记录的预合成背景，且不能表述为等效的 alpha 保留。

<div align="center"><em>代表性图像文件大小实测模板</em></div>

<div align="center" markdown>

| 场景 | 格式 | 编码方式 | 文件大小 | 相对 BMP | 测试配置及说明 |
|:---|:---|:---|---:|---:|:---|
| 不透明 UI 图像 | BMP | 未压缩参考 | 待测 | 100% | 源图像、尺寸和像素格式：待记录 |
| 不透明 UI 图像 | eZip | 无损 | 待测 | 待测 | GraphicsTool 版本和转换配置：待记录 |
| 不透明 UI 图像 | PNG | 无损 | 待测 | 待测 | 编码器和配置：待记录 |
| 不透明 UI 图像 | JPEG | 有损 | 待测 | 待测 | 编码器和质量设置：待记录 |
| 带逐像素 Alpha 的 UI 图像 | BMP | 未压缩参考 | 待测 | 100% | 具体的 BMP 格式或 Alpha 处理方式：待确认 |
| 带逐像素 Alpha 的 UI 图像 | eZip | 带 Alpha 的无损 | 待测 | 待测 | GraphicsTool 版本和转换配置：待记录；验证透明边缘 |
| 带逐像素 Alpha 的 UI 图像 | PNG | 带 Alpha 的无损 | 待测 | 待测 | 编码器和配置：待记录 |
| 带逐像素 Alpha 的 UI 图像 | JPEG | 有损，不含 Alpha | 待测 | 待测 | 记录预合成背景和质量设置；这不是保留 Alpha 的对比 |

</div>

“相对 BMP”按同一场景内的 `file size ÷ BMP file size × 100%` 计算，也就是用文件大小除以 BMP 文件大小后乘以 100%。不要直接比较不透明和带 Alpha 的行，也不要将此表作为通用压缩比结论；这是一份待填写的实测模板，结果会随所选图像、Alpha 通道覆盖情况和转换设置而变化。

## 使用 eZip 的收益 { #why-use-ezip }

### 减少资源存储 { #reduce-asset-storage }

压缩资源相较原始像素缓冲区可占用更少的 NOR Flash、PSRAM、NAND 或可移除存储容量。这对于表盘、多语言字体包、图标集、UI 主题和动画较多的界面尤其有价值。

### 降低内存总线流量 { #reduce-memory-bus-traffic }

当资源存放在外部 NOR Flash 或 PSRAM 中时，未压缩位图会在绘制开始前占用大量总线带宽。先传输压缩资源，再在图形路径附近解码，可以降低该部分流量。实际收益取决于压缩比、源格式、显示更新模式和存储接口速率。

### 释放 CPU 时间 { #preserve-cpu-time }

在支持的硬件解码路径上，应用 CPU 无需为每个资源执行软件解压。腾出的余量可改善 UI 响应速度，或分配给无线、音频、传感器和低功耗调度。

### 让资源交付可复现 { #make-asset-delivery-repeatable }

使用转换工具和受控的资源格式，可以让发布过程更可复现：源美术资源、转换设置、输出资源及其目标分辨率配置能够一起进行版本管理。这比手工转换文件，或依赖 UI 开发者重复配置图像参数更可靠。

## eZip 实现对比 { #ezip-version-comparison }

下表采用产品简介和 SDK 中有依据的名称。版本号不能代表所有芯片都具备相同功能；选型时还需确认所选芯片、SDK 版本、资源格式和板级存储配置。

<div align="center"><em>eZip 实现与独立 JPEG 解码能力</em></div>

<div align="center" markdown>

| 实现 | 代表性 SF32 系列 | 文档记载的能力 | 设计要点 |
|:---|:---|:---|:---|
| **eZip** | SF32LB55x | 无损图像解压，可直接连接 ePicasso；SDK 不为该系列提供原生 eZip-A 支持。 | 使用静态 eZip 资源，不要默认支持原生 eZip-A 动画。 |
| **eZip 2.0** | SF32LB52x、SF32LB56x、SF32LB58x | 无损图像解压和原生 eZip-A 动画支持。SF32LB58x 另有独立的 JPEG 编解码器。 | 核实动画及其存储需求；JPEG/MJPEG 应按独立的媒体处理路径设计。 |
| **EZIP** | SF32LB57x | 支持 eZip/eZip-A 解码，并可直接向 EPIC 输出。JPEGD 是独立的 JPEG 解码器；不要假定它与 EZIP 共用直接输出路径。 | 生成资源时使用 2048 字节压缩窗口。这些信息并不能证明存在完整的 MJPEG 播放链路；请核实具体目标所支持的中间件和解码路径。 |

</div>

直接向 EPIC 输出可省去渲染前存放完整解码 eZip 源图像的缓冲区，但并不意味着无需解码工作内存或最终渲染缓冲区，也不意味着 EZIP 负责 JPEG 解码。独立的 JPEGD 路径应以目标芯片系列的驱动文档为准。

## 准备资源 { #preparing-assets }

建议将可编辑的源资源纳入版本管理，再将 eZip 输出作为构建产物生成：

1. 为所选器件确定目标显示分辨率、像素格式和动画需求。
2. 按目标尺寸准备源图像或动画，避免用运行时缩放弥补尺寸不当的美术资源。
3. 使用思澈科技（SiFli）的 GraphicsTool 转换、调整尺寸并生成 eZip 或 eZip-A 输出。
4. 将工具版本和转换配置与项目一同记录，并在目标硬件上验证生成资源。
5. 将输出放入预定存储位置，并在蓝牙或音频活动期间测试冷启动、反复使用 UI、内存不足时的行为和显示更新。

就源资源而言，GraphicsTool 支持 PNG、JPEG、WebP 和 AVIF 等常见图像格式，并可将 GIF、PNG 和 APNG 处理为 eZip/eZip-A 资源。转换后的资源仅在目标器件和 SDK 支持其配置的解码路径时才能使用。

对于其他静态图像格式，官方流程是先按目标尺寸转换为 PNG，再编码为 eZip。输出的颜色格式、alpha 处理和 LVGL 版本必须与目标匹配。SDK 命令行示例要求为 SF32LB57x 添加 `-winsize 2048`；表中其他系列不需要该参数。使用 `sdk/tools/png2ezip/ezip.exe` 时，应随生成资源保存完整转换参数。

## 集成工具 { #integration-tools }

思澈科技（SiFli）除桌面端 GraphicsTool 工作流外，还提供：

- **命令行开发工具**，可将 eZip 转换集成到脚本化、可复现的资源管线中。可用于本地构建脚本或持续集成任务，使纳入版本管理的源美术资源和生成的 eZip 输出保持可追溯。
- **Android 和 iOS SDK**，支持在移动应用中集成 eZip。当配套应用需要准备、管理、传输或以其他方式处理 eZip 资源以配合设备工作流时，这些 SDK 很有用。

应将转换配置、工具或 SDK 版本、输出校验值和目标器件兼容性要求纳入版本管理。移动端和命令行集成应使用与嵌入式产品相同的已批准资源配置；不要假设为某一芯片或 SDK 配置生成的文件无需调整即可用于每个 SF32 目标器件。

## 设计与调试建议 { #design-and-debugging-guidance }

- **将 eZip 用于资源。** 资源可存放在 NOR Flash、PSRAM、NAND 或文件系统中，但解码器本身不识别文件路径。存储驱动必须通过硬件支持的访问方式提供或加载数据。HAL 要求输入缓冲区和 AHB 输出缓冲区按 4 字节对齐。eZip 不是最终帧缓冲压缩格式。
- **估算资源传输带宽。** eZip 可降低资源传输流量，但解码后的像素仍需经过[图形概览](overview.md#sf32-graphics-flow)所述的渲染和显示路径。
- **保留 CPU 回退路径。** 并非每一种资源类型、像素格式或 UI 操作都能映射到硬件解码或图形路径。
- **验证资源和缓冲区的存放位置。** 测试资源和绘制缓冲区位于内部 SRAM、NOR Flash、PSRAM 或可移除存储时的行为；不同选择会改变访问延迟（latency）和总线争用。
- **测试真实工作负载。** 在蓝牙、音频、传感器和显示刷新同时工作时，测量冷加载时间、动画节奏、UI 延迟和功耗。
- **发布前冻结转换设置。** 工具版本或参数变化会影响输出兼容性、质量、存储占用和解码性能。

## 要点 { #key-takeaways }

- eZip 是思澈科技（SiFli）的无损显示资源压缩格式，可在支持该功能的 SF32 芯片上通过硬件辅助解码。
- 图形资源可使用 eZip；通用数据应使用工具提供的 GZIP/LZ4 模式，压缩比取决于源数据，需实测。
- eZip-A 用于动画资源；GraphicsTool 可将常见格式的源图像和动画转换为 eZip/eZip-A。
- 思澈科技（SiFli）还提供命令行工具和 Android/iOS SDK，便于自动生成资源，或由手机配套应用准备和传输资源。
- eZip 可降低资源存储、外部存储访问和应用 CPU 解码负担，但不能替代 ePicasso 或显示控制器。
- 根据有依据的实现和输出路径选型，不要仅凭版本号推断能力。JPEGD 与 EZIP 应分开考虑，SF32LB57x 资源须使用规定的压缩窗口。
- 用好 eZip，需要建立可追溯的资源生成流程：源图像、转换设置、存储位置、图形引擎集成和目标硬件测试都不可忽略。

## 主要参考资料 { #primary-references }

- [GraphicsTool 与资源准备](https://wiki.sifli.com/tools/图形转换工具.html)
- [EZIP HAL 模式、输出路径、对齐和动画支持](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/hal/ezip.html)
- [EZIP 工具说明](https://docs.sifli.com/projects/solution/2.application-notes/ezip/index.html)
- [EZIP HAL 的模式、对齐及动画支持](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_ezip.h)
- [LVGL eZip 示例与转换参数](https://github.com/OpenSiFli/SiFli-SDK/blob/main/example/multimedia/lvgl/ezip_v9/README_EN.md)
- [移动端 eZip SDK 文档](https://docs.sifli.com/projects/solution/mobile-sdk/ezip/index.html)
- 产品简介：[SF32LB52x](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)、[SF32LB55x](https://downloads.sifli.com/silicon/PB0001-SF32LB55x-Product%20Brief%20V1p3.pdf)、[SF32LB56x](https://downloads.sifli.com/silicon/PB0056-SF32LB56x-Product%20Brief%20V1p1.pdf)、[SF32LB58x](https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf)
- [独立 JPEGD 接口](https://github.com/OpenSiFli/SiFli-SDK/blob/main/drivers/Include/bf0_hal_jpegd.h)
