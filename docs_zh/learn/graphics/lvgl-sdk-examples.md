---
icon: lucide/layout-dashboard
title: "LVGL SDK 示例"
description: "按 UI 启动调试、控件、设计工具、压缩资源、动画、媒体和可穿戴界面等任务选择合适的 SiFli-SDK LVGL 示例。"
tags:
  - 图形
  - LVGL
  - 示例
---

# LVGL SDK 示例 { #lvgl-sdk-examples }

SiFli-SDK 的 LVGL 示例适合用来验证显示与 UI 链路，但不能直接当作可互换的产品模板。先用版本匹配的演示确认面板和输入设备能正常工作，再选择覆盖产品主要集成风险的示例，按文档说明的开发板配置原样运行，之后逐层替换为产品内容。将示例作为可用基线前，应先查看对应 README 的验证状态和使用限制。

本文按照工程目标整理 [SiFli-SDK LVGL 示例索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html) 中的示例。当前 SDK 版本下的开发板支持范围、配置、源码路径、资源文件、构建命令和版本限制，仍应以思澈科技（SiFli）官方页面为准。

该索引是示例目录，不是开发板兼容性矩阵。每个示例的支持范围都应单独确认，文档 URL 中的芯片系列名称也不能证明该系列的开发板都受支持。请以对应示例 README 的**支持的开发板**章节为准。通用构建命令或仓库构建矩阵中的板名，本身并不能证明该示例已在该板上完成运行验证。如果不同来源给出的范围不一致，应分别说明，并针对具体 SDK 版本和开发板核实。

## 从合适的 LVGL 基线开始 { #start-with-the-right-lvgl-baseline }

<div align="center"><em>表：按工程任务选择 SiFli-SDK LVGL 示例</em></div>

<div align="center" markdown>

| 工程目标 | 建议起点 | 可据此确认的内容 | 进入下一步的条件 |
|:---------|:---------|:-----------------|:-------------|
| 启动标准 LVGL 应用 | **[LVGL v8 演示](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_demos/README.html)**、**[LVGL v8 官方示例](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_examples/README.html)**、**[LVGL v9 演示](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_demos/README.html)** 或 **[LVGL v9 官方示例](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v9_examples/README.html)** | 所选 LVGL 版本、开发板显示驱动、渲染循环和基础控件 | 实际面板上的显示刷新（flush）路径和输入设备已稳定 |
| 评估 UI 设计工作流 | **[gui_guider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/NXP_GUI_guider/README.html)**、**[SquareLine](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/Square_Line/README.html)** 或 **[EEZ Studio](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_tools_example/eez_studio/README.html)** 示例 | 如何将生成的 UI 代码集成到 SDK 工程 | 生成代码可正常构建，且其 LVGL 版本与工程一致 |
| 原型验证特定 UI 行为 | **[Basechart](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_basechart/README.html)**、**[Baselabel](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_baselabel/README.html)**、**[Follow](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_follow/README.html)**、**[Imgarray](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgarray/README.html)**、**[Imgbar](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_imgbar/README.html)**、**[Mulroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_mulroller/README.html)**、**[Multanim](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multanim/README.html)**、**[Multlist](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multlist/README.html)**、**[Multroller](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multroller/README.html)**、**[Multslider](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_multslider/README.html)**、**[Sector](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_sector/README.html)**、**[Select](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_select/README.html)** 或 **[Timeline](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_timeline/README.html)** | 某一种交互、控件、排列或动画模式 | 产品需要由多个元素组成的完整界面，而不只是单个显示元素 |
| 验证资源、动画或媒体 | **[动态 eZip 加载 v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/ezip_v9/README.html)**、**[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)**、**[本地视频播放](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)** 或 **[流媒体播放](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)** | 丰富内容所需的存储、解码、渲染和刷新链路 | 已在目标硬件上测量资源大小、内存布局、更新速率和功耗，并确认符合产品要求 |
| 构建具有完整交互流程的 UI | **[电子罗盘](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/compass/README.html)**、**[游戏索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/games/index.html)**（[扫雷示例 README](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/lvgl/games/minesweeper/README.html)）或 **[手表界面 v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch/README.html)** / **[v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/watch_v9/README.html)** | 多功能显示工作负载下的屏幕流程、交互和视觉节奏 | 可开始用产品数据、生命周期行为和性能约束替换示例内容 |

</div>

不同示例的目标板清单并不相同。v8 Demos README 列出 `eh-lb563` 以及 SF32LB52x、SF32LB56x 和 SF32LB58x LCD 系列；v8 Official Examples README 列出 `sf32lb52-lchspi-ulp` 和这三个 LCD 系列。v9 Demo README 列出这三个 LCD 系列；其通用构建说明中也出现了 `eh-lb563`，但该板不在明确的**支持的开发板**清单中。v9 Official Examples README 列出 `sf32lb52-lchspi-ulp` 和这三个 LCD 系列。应以各 README 明确列出的范围为准，不能仅凭通用构建示例增加目标板。

## 先确认集成边界 { #confirm-the-integration-boundary-first }

改造 LVGL 示例前，应先明确它已经验证了哪一层，而哪些仍是产品工作：

<div align="center"><em>表：LVGL 示例的集成边界</em></div>

<div align="center" markdown>

| 边界 | 示例可以建立的基础 | 产品仍需建立的能力 |
|:-----|:-------------------|:-------------------|
| 开发板和面板 | 已知的 SDK 开发板配置与显示通路 | 具体面板、触摸控制器、电源时序、引脚复用、复位时序和量产测试路径 |
| LVGL | 与版本对应的初始化流程和示例 UI 行为 | 产品的页面架构、事件处理职责、内存上限和刷新策略 |
| 资源 | 已支持的样例资源路径 | 资源格式、存储空间、加载时间、缓存策略、许可和故障处理 |
| 渲染 | 可工作的绘制和显示刷新（flush）循环 | 脏区域策略、缓冲区数量、色彩格式、DMA/缓存处理，以及负载下的 UI 响应性 |
| 应用 | 可见的演示行为 | 传感器、蓝牙（Bluetooth）、存储、计时、低功耗状态切换、恢复逻辑和用户数据 |

</div>

应先验证物理显示屏、面板接口和基本显示刷新（flush）路径，再把 LVGL 演示视作图形架构已经就绪的证据。可先阅读[图形概览](overview.md)和[显示控制器](display-controller.md)。

## 有意识地选择 LVGL 版本 { #choose-the-lvgl-version-deliberately }

官方索引同时包含 LVGL v8 和 LVGL v9 示例。生成的 UI 工程、所用的示例基线和 SDK 配置必须保持同一 LVGL 主版本。没有经过明确的移植评审时，不要把一个主版本生成的页面或自定义控件直接放入另一个主版本的工程。

第一次进行开发板启动调试时，应使用与 SDK 开发板配置中已选 LVGL 版本一致的 Demo 或官方示例。它最适合先验证面板、缓冲区、输入和调度路径，再开始应用相关工作。

!!! warning "运行 LVGL v8 SJPG 示例前先备份存储卡"
    v8 Official Examples 工程中从 TF 卡读取 SJPG 的可选路径，在挂载失败时会对卡的根区域调用 `dfs_mkfs()`，这可能导致数据丢失。启用并运行该路径前，请先备份存储卡，并检查所用 SDK 版本中的代码。不要将此警告扩大到所有 LVGL v8 或 v9 示例；应逐个检查工程自身的挂载和格式化行为。

## UI 代码生成工具：gui_guider、SquareLine 和 EEZ Studio { #generated-ui-gui_guider-squareline-and-eez-studio }

当团队需要使用可视化编辑器生成页面层级、样式和资源时，应选择 UI 设计工具示例。索引提供了 **gui_guider**、**SquareLine** 和 **EEZ Studio** 对应的示例。

将生成代码导入产品前，应核对生成代码的版本、屏幕分辨率、色深、资源路径和回调函数的管理职责。

gui_guider 和 EEZ Studio 的源示例都明确使用 LVGL v8。SquareLine 还要求启用生成代码所用的默认主题。生成的子目录必须纳入构建，可选的 eZip 资源转换也应按官方步骤配置；仅复制文件并不足以完成集成。

生成代码可以加快 UI 构建，但不能取代显示驱动、缓冲策略、输入驱动、功耗策略或集成测试。应将生成文件与手写的应用逻辑分开，避免再次导出时无意覆盖产品修改。

## 控件和交互模式 { #widget-and-interaction-patterns }

这些 LVGL v8 示例适合用来验证特定的 UI 行为，但覆盖范围并不相同。Multlist 是基于应用框架的完整演示，不是单个控件的最小测试。

- **Basechart** 绘制数据序列；**Baselabel** 将数据源绑定到定时刷新的文本。
- **Follow** 演示受重力方向驱动的图标菜单；**Select** 演示选中状态；**Sector** 将数值映射为图片可见扇形的角度。
- **Imgarray** 用图片字形拼出数值；**Imgbar** 通过裁切前景图片显示进度。
- **Mulroller** 是可通过回调深度定制的滚轮选择器；**Multroller** 是更简单的文字选项滚轮。
- **Multlist** 涵盖列表、翻页、转场、资源缓存和页面生命周期；**Multslider** 在滑块手柄上显示数值或短标签。
- **Multanim** 演示多种转场效果，其中部分依赖 GPU/VGLite 支持；**Timeline** 在同一时间轴上编排多段动画。

这些专项示例的开发板支持范围并不统一。例如，Multanim 和 Multlist 的**支持的开发板**章节都列出 `sf32lb52-lcd_n16r8` 和 `sf32lb52-lchspi-ulp`，但后面的通用构建说明又提到更广的 52x/56x/58x 目标，并以 `eh-lb563` 为构建示例。这些说法的支持范围并不等同。请核对具体 README 和当前工程配置；不要根据索引或 URL 推断其他控件示例也兼容这些开发板。

当产品的主要风险集中在某个控件时，可从对应示例开始。首次移植时应控制改动范围：先运行原始示例，再替换为产品数据；测量重绘开销和内存占用后，再将其集成到更复杂的页面中。多个视觉上简单的控件组合在一起，仍可能增加帧缓冲区负载、图形资源读取带宽和输入事件调度的压力。

## 资源、动画和媒体工作负载 { #asset-animation-and-media-workloads }

动态 eZip 加载示例同时提供 LVGL v8 和 LVGL v9 版本。应选择与应用版本匹配的示例，先验证动态加载压缩资源，再在产品中广泛采用。[eZip](ezip.md)文章介绍了资源压缩在图形链路中的职责。

对于 GIF/APNG 动画资源，思澈科技（SiFli）还提供了 [AGIF/APNG + LVGL v8](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl/README.html) 和 [AGIF/APNG + LVGL v9](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/agif/lvgl_v9/README.html) 示例，归在 **多媒体 > AGIF** 分类下。两个 README 都列出 `eh-lb525`；当前 [GCC 构建矩阵](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml) 也将两个工程路径注册在 `devkit_lcd_boards` 下。矩阵注册表示构建目标，不代表该组中的每块开发板都已完成运行验证。将其作为产品基线前，请核实具体目标板和 SDK 版本。

动态 eZip 示例可比较文件路径访问与预加载到 SRAM 或 PSRAM 两种方式。预加载会增加内存占用，但可减少反复读取文件。资源格式必须对应 LVGL v8/v9；官方 v9 路径需要 `A:/` 这类盘符前缀，v8 则不要求该前缀。应核对实际存储后端和盘符配置。v9 README 明确列出以下开发板：`sf32lb52-lcd_n16r8`、`sf32lb52-lcd_a128r16`、`sf32lb52-lchspi-ulp`、`sf32lb52-core_e8r16`、`sf32lb56-lcd_a128r12n1`、`sf32lb56-lcd_n16r12n1`、`sf32lb58-lcd_n16r32n1_dsi`、`sf32lb58-lcd_a128r32n1_qspi` 和 `sf32lb58-lcd_n16r32n1_qspi`。这份清单仅适用于 v9 README，不应直接套用到 v8，也不能据此推断其他开发板受支持。eZip 文档要求仅对 SF32LB57 使用 `-winsize 2048` 转换选项。

[Lottie](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_lottie/README.html)、[本地视频播放](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_media/README.html)和[流媒体播放](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/streaming_media/README.html)验证的是不同的内容处理链路，不能简单按名称判断哪一种负载更重。Lottie README 标注该示例**未经验证**，列出的目标包括 `eh-lb563` 和 SF32LB52x/SF32LB56x 系列；当前 GCC 构建矩阵则将其工程条目注释掉了。因此，README 中的目标清单并不代表这些目标已经通过验证。本地视频 README 明确列出 `eh-lb523` 和 `sf32lb52-lcd_n16r8`，但也包含更宽泛的通用构建说明；当前 GCC 构建矩阵将其工程条目注释掉了。不要据此推断其他目标受支持，使用前应核对具体 SDK 版本。本地视频示例播放 `disk/video_example.mp4` 中的 H.264 视频；如果 TF 卡成功挂载，则优先读取卡根目录下的 `video_example.mp4`。流媒体 README 只列出 `sf32lb52-lchspi-ulp`，并通过手机的蓝牙 PAN 网络共享访问网络、使用 FFmpeg；它不是通过 BLE 传输视频的示例。

应按系统级负载评估这些示例。在蓝牙、传感器和产品实际使用的显示接口同时工作时，测量资源或流媒体的存储需求、解码时间、帧更新频率、PSRAM/SRAM 占用、显示带宽和电流。实际开销取决于内容复杂度、分辨率、解码器配置和缓冲策略。

短时间的流畅演示并不能证明该链路能够长期运行。验证产品时，应使用真实的内容时长和实际面板刷新策略。

## 字体与运行时语言切换 { #fonts-and-runtime-language-switching }

[FreeType 示例](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/lvgl_v8_freetype/README.html)从文件系统加载 TrueType 字体，并支持在运行时切换字体和字号。README 说明该示例已在 `sf32lb52-lchspi-ulp` 上验证；其他开发板还需要分区表中包含 `FS_REGION`，并为所用字体预留足够的系统堆内存，因此不能视为已由该示例验证。它演示了加载失败时回退到内置字体、检查堆内存，以及切换时释放旧字体。应使用产品实际支持的语言和字号检查字符覆盖范围与堆内存占用；大型中日韩字体应按需裁剪，不能默认整套字体都能装入内存。该示例要求 TrueType 轮廓，不支持采用 CFF 轮廓的 OpenType 字体。控件或样式仍引用字体时不能释放它，字体切换也必须在 LVGL 线程中执行。修改打包字体后，需要重新生成并烧录文件系统镜像 `fs_root.bin`；仅更新应用程序不会更新这些文件。

[LVGL v8](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v8/README.html)和[LVGL v9](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/multilingual/multilingual_v9/README.html)的多语言示例涵盖内置语言、外部语言包安装、运行时切换、重新扫描安装目录，以及通过 `share_prefs` 保存所选语言。v8 README 列出 `sf32lb52-lchspi-ulp`；请单独核对 v9 README 的目标清单，不要将 v8 的开发板支持范围直接套用到 v9。JSON 或 XLSX 输入可生成编译进固件的内置语言资源，或供外部安装的二进制语言包。各语言的翻译键必须一致，字体也必须覆盖所需字符。验证语言切换、重启后恢复选择、资源缺失处理和文件系统更新流程。应分别遵循各版本文档中的路径和配置，不要因为功能名称相似就认为两者完全相同。

## 罗盘、游戏和手表界面 { #compass-games-and-watch-interfaces }

电子罗盘和手表界面示例将显示功能与应用逻辑结合在一起，适合用来研究页面组织、输入与动画时序，以及较复杂显示负载的影响。游戏索引链接到扫雷示例；其 README 列出 `eh-lb563` 和 SF32LB52x/SF32LB56x 系列，但未列出 58x。若要在 58x 上使用，应先核对当前 SDK 源码中的支持情况。

官方罗盘示例在 `sf32lb52-lchspi-ulp` 上通过 I2C 读取 MMC56x3 三轴磁力计。用于产品时，应核对驱动、接线并按实际传感器和整机要求完成校准；能显示方位角，并不代表方向测量已经准确。

游戏和手表界面示例适合用来设计页面流程，但产品仍需明确数据管理职责、低功耗行为、屏幕唤醒策略、通知机制和故障恢复。

v8 手表 README 列出 SF32LB52x、SF32LB56x 和 SF32LB58x LCD 系列以及 `sf32lb52-lchspi-ulp`；v9 README 列出这三个 LCD 系列。两个 README 都排除 `520-hdk`，并注明 SF32LB55x 不支持其中的 3D 旋转演示。增加字体时应核对资源分区大小；v8 示例可能超出已分配的字体区域。

## 改造示例时保留验证证据 { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>表：LVGL 示例产品化改造检查项</em></div>

<div align="center" markdown>

| 步骤 | 需要保留的证据 | 重要性 |
|:-----|:---------------|:-------|
| 构建原始示例 | SDK 版本、开发板名称、配置和构建日志 | 保留已知可工作的基线 |
| 在硬件上运行 | 照片或视频、串口日志、面板和触摸行为 | 确认实际显示和输入通路 |
| 加入一项产品元素 | 变更记录及实测帧率和屏幕刷新表现 | 使回归原因可以追溯 |
| 施加产品负载 | 蓝牙、传感器、存储和低功耗状态下的 UI 响应 | 发现独立演示中没有暴露的集成限制 |
| 记录最终限制 | 缓冲区使用、内存布局、帧率、功耗和已知故障行为 | 将示例转化为可长期维护的工程证据 |

</div>

## 相关资源 { #related-resources }

- [图形概览](overview.md)：了解显示屏选型、帧缓冲规划、LVGL 集成和系统取舍。
- [显示控制器](display-controller.md)：了解控制器、缓冲区和显示刷新（flush）路径。
- [ePicasso](epicasso-gpu.md)、[eZip](ezip.md) 和 [TurboPixel](turbopixel.md)：了解 SF32 图形加速和压缩特性。
- [示例](../../develop/examples/index.md)：查看跨领域的 SDK 示例目录。
- [SiFli-SDK LVGL 示例索引](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/multimedia/lvgl/index.html)：查看当前官方示例列表和具体配置方式。
