---
icon: lucide/audio-lines
title: "音频 SDK 示例"
description: "按 PDM 数字麦克风采集、录音、播放、编解码、存储和混音等任务选择合适的 SiFli-SDK 音频示例。"
tags:
  - 音频
  - 示例
---

# 音频 SDK 示例 { #audio-sdk-examples }

SiFli-SDK 的音频示例适合用于验证完整音频链路，但不能直接作为产品固件使用。应选择已经覆盖产品关键难点的示例，例如麦克风采集、扬声器通路、存储、编解码或多路音频并发。先在目标开发板上跑通未经修改的示例，再每次只调整一个子系统。

本文按工程任务整理 SiFli-SDK 中具有代表性的音频示例。官方[音频示例索引](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html)可作为入口。下表列出的开发板范围来自本次核对时思澈科技（SiFli）官方页面明确列出的内容；系列名称不代表该系列的每块开发板或每个 SDK 版本都受支持。构建前应核对对应版本的示例页面和目标开发板配置。

## 选择合适的示例 { #start-with-the-right-example }

<div align="center"><em>表：按开发目标选择 SiFli-SDK 音频示例</em></div>

<div align="center" markdown>

| 目标 | 建议示例 | 可验证的能力 | 官方列出的目标与限制 |
|:---------|:---------|:-------------|:---------------------|
| 使用两路或四路数字麦克风录音 | [PDM 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html) | PDM 采集；支持相应处理模式时进行 WAV 录音和回放 | 当前页面仅列出 `sf32lb56-lcd_a128r12n1`；需确认 PDM 布线和引脚复用。页面的引脚配置说明误将开发板名称写成 `f32lb56-lcd_a128r12n1`（漏掉开头的 `s`）；构建命令中的开发板名称正确。 |
| 使用两路模拟麦克风录音 | [立体声扬声器本地音乐示例（Local Music Example for stereo speaker，双 ADC/DAC）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/dual_adc_dac/README.html) | 同时采集两路麦克风并分别保存为 PCM 文件；可选择一路麦克风送扬声器监听 | 需使用 SF32LB58x 自定义板，不能在思澈科技（SiFli）模组板上运行；需要两路模拟麦克风和两个模拟扬声器。 |
| 验证基本的麦克风到扬声器链路 | [录音示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/record/README.html) | 将麦克风录音 5 秒并存入 PCM 内存缓冲区，然后自动播放 | 官方列出的目标为 `eh-lb525`、`sf32lb52-lcd` 系列、`sf32lb56-lcd` 系列或 `sf32lb58-lcd` 系列；需要扬声器。 |
| 从根文件系统播放预置音频 | [本地音乐示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/local_music/README.html) | 从已挂载的 FAT 根分区播放预置的 `16k.wav`；也可播放预置 MP3，但须符合文件系统容量限制 | 官方列出的目标为 `eh-lb525`、`sf32lb52-lcd` 系列、`sf32lb56-lcd` 系列或 `sf32lb58-lcd` 系列；需要 FAT 根分区和扬声器。 |
| 从 SD 卡播放音乐 | [MP3 本地播放器](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/mp3_sd_player/README.html) | 播放 SD 卡 `music` 目录中的 MP3 或 WAV，并通过 Shell 控制音量 | 当前仅列出 `sf32lb52-lchspi-ulp`；需要 SPI1、FAT/MSD、扬声器；长按检测还需要外接电池。 |
| 录制、无损压缩、解码并播放音频 | [FLAC 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/flac/README.html) | PCM 录音，以及 FLAC 编码、解码和播放 | 官方列出 `sf32lb52-lcd`、`sf32lb56-lcd` 和 `sf32lb58-lcd` 系列；需要 FAT、`libFLAC` 和音频组件。 |
| 录制、压缩、解码并播放语音内容 | [Opus 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/opus/README.html) | 16 kHz 麦克风采集、Opus 编解码和扬声器播放 | 当前仅列出 `eh-lb525`；需要 FAT 和音频组件。栈配置应遵循下文所述的该示例专用建议。 |
| 混合多路本地音频 | [三路音频混音播放器（官方中文页面）](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/example/multimedia/audio/mixer/README.html) | 分别解码三个本地文件、按需重采样并混音输出 | 当前页面列出 `sf32lb52-lcd_n16r8` 和 `sf32lb56-lcd_n16r12n1`；文件系统镜像和样例文件应按示例配置使用。 |

</div>

## 共同的起步条件 { #shared-starting-point }

多数示例有相同的前提条件：开发板具备并正确连接所需的音频硬件，板级配置已使能相应音频模块，而且所选示例支持目标开发板。读写文件的示例还需要先挂载文件系统。复制其他示例中的开发板名称、引脚定义或 `menuconfig` 选项前，务必先核对官方页面和目标开发板的配置文件。

!!! warning "保护已有文件系统数据"
    v2.5.1 的 Opus 示例在根文件系统挂载失败后会调用 `dfs_mkfs()`（[源码](https://github.com/OpenSiFli/SiFli-SDK/blob/v2.5.1/example/multimedia/audio/opus/src/main.c)）。没有明确的数据保留策略时，不应将这种自动格式化恢复逻辑用于产品；挂载失败并不意味着可以擦除用户数据。

首次验证时，应有意缩小测试范围：

1. 针对受支持的开发板构建并烧录未经修改的工程。
2. 使用已确认正常的音频硬件和文件，检查录音或播放行为是否符合预期。
3. 记录 SDK 版本、开发板名称、配置、引脚定义和串口日志。
4. 每次只修改一项产品相关内容，然后重复相同测试。

[音频概览](overview.md)介绍这些示例涉及的接口选择和系统设计。有关缓冲区管理、会话关闭，以及与显示或蓝牙（Bluetooth）任务共存的处理方式，请参阅 [Audio Server 与缓冲](audio-server-buffering.md)。

## 数字麦克风采集：PDM { #digital-microphone-capture-pdm }

当产品需要数字麦克风采集而不是模拟麦克风输入时，应从 PDM 示例开始。官方示例支持两路或四路 PDM 麦克风，但是否生成录音文件、如何回放，取决于所选处理模式。其文档中的拓扑为：两路麦克风使用 `PDM1` 的左、右通道；扩展到四路时再使用 `PDM2`。一个 PDM 接口最多可接入两颗数字麦克风，因此不能把 PDM 接口数量等同于麦克风数量；具体配置应以目标 SoC 的接口和通道映射为准。

当前官方示例页面列出的支持开发板为 `sf32lb56-lcd_a128r12n1`。`pdm open pdm12 4 raw` 模式仅输出日志，不生成录音文件。Anyka 算法模式输出单声道，四麦模式也不例外；四路输入不意味着录音文件有四个声道。用于麦克风阵列验证前，应确认算法依赖和输出格式。

改造前应逐项确认以下边界：

- 目标芯片和开发板是否引出了所需的 PDM 信号。
- 麦克风时钟、数据线、电源和接地是否符合麦克风数据手册。
- 驱动启动前，板级引脚复用是否已将对应引脚配置为 PDM 功能。
- 产品是否确实需要示例中用于录音回放的服务；仅采集 PDM 数据并不一定需要这些服务。

官方 PDM 示例页面给出了其支持的开发板配置和示例引脚映射。可将其作为已验证的参考起点，但必须替换为目标开发板的实际连线，不能假设原配置可直接复用。参见 [PDM 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)。

## 模拟采集和基本录音/回放 { #analog-capture-and-basic-recordplayback }

**录音示例**适合快速验证麦克风采集后再本地播放的链路：录音 5 秒并写入 PCM 内存缓冲区，随后自动通过扬声器播放。官方页面列出的目标为 `eh-lb525`、`sf32lb52-lcd` 系列、`sf32lb56-lcd` 系列和 `sf32lb58-lcd` 系列。可先用它确认基础链路，再加入文件系统、压缩、蓝牙传输或多麦克风支持。

**Local Music Example for stereo speaker（双 ADC/DAC 示例）**面向 SF32LB58x 自定义板；官方页面说明该示例不能在思澈科技（SiFli）模组板上运行，并要求两路模拟麦克风和两个模拟扬声器。`mic2file` 命令会同时录制两路麦克风并分别生成 PCM 文件；`mic2speaker 0` 或 `mic2speaker 1` 则选择一路麦克风进行扬声器监听。只有当产品的模拟硬件拓扑与之相符时，才应以它为基线；否则先从更简单的录音示例开始。

无论选择哪一条路径，都应先验证静音状态下的底噪、增益、削波，以及启动和停止行为，再继续叠加软件功能。稳定的 PCM 采集和回放通路是后续编解码、文件和蓝牙功能的基础。

## 本地播放和存储 { #local-playback-and-storage }

**本地音乐示例**用于验证最基本的文件播放链路。官方页面列出的目标为 `eh-lb525`、`sf32lb52-lcd` 系列、`sf32lb56-lcd` 系列和 `sf32lb58-lcd` 系列。示例会挂载 FAT 根分区并播放预置的 `16k.wav`。也可将 MP3 放入示例的 `disk/` 目录进行预置，但文件大小不能超过配置的文件系统容量。它适用于通知音、内置语音提示，以及本地扬声器通路的初步验证。

**MP3 本地音乐播放器**加入了可移除存储：从 SD 卡的 `music` 目录播放 MP3 或 WAV，并通过 Shell 控制音量。两个本地播放示例都需要文件系统；这个示例还使用 SPI1 和 SPI MSD 驱动。在文档指定的 `sf32lb52-lchspi-ulp` 板上，需要接入电池，否则无法检测按键长按。产品确实使用 SD 卡媒体时，可从这个示例开始。

两者验证的是播放链路，不是完整的媒体播放器架构。在将其改造成面向用户的播放器之前，还需设计文件索引、损坏媒体处理、中断恢复、功耗状态恢复和 UI 行为。

## FLAC 与 Opus 编解码链路 { #flac-and-opus-codec-pipelines }

**FLAC 示例**覆盖完整的无损链路：从麦克风录制 PCM，编码为 FLAC，随后解码并播放。官方页面列出的目标为 `sf32lb52-lcd`、`sf32lb56-lcd` 和 `sf32lb58-lcd` 系列，并要求 FAT 文件系统、音频组件和 `libFLAC`。它适合验证基于文件的采集流程，或比较压缩格式与原始 PCM 的存储开销。

**Opus 示例**用于验证面向语音应用的压缩音频链路。当前官方页面仅列出 `eh-lb525`，并以 16 kHz 采集麦克风数据，使用约 16 kbps 的 10 ms 帧进行 Opus 编码，再解码和播放。官方文档还提示：根据所选编码器模式，任务栈大小要求不同。以它为基线时必须保留这一约束，不能在叠加应用逻辑后仍假定默认任务栈足够。

SiFli-SDK 官方 README 建议根据编码模式设置 `OPUS_STACK_SIZE`：若 `opus_test()` 中调用 `opus_encoder_ctl(encoder, OPUS_SET_FORCE_MODE(MODE_SILK_ONLY))`，设为 20k；未启用该模式时，建议设为 200k。这是针对该示例的配置建议，并非 Opus 的通用要求。移植前应核对所用 SDK 版本和编码路径，并在产品负载下测量栈高水位，再确定任务栈大小。

这两个示例都不能直接证明蓝牙通话或流媒体产品已经完成。应先验证本地编码和解码，再以实测的延迟（latency）和内存余量集成传输、缓冲与会话策略。

## 三路混音 { #three-channel-mixing }

**三路音频混音播放器**当前列出的已验证目标为 `sf32lb52-lcd_n16r8` 和 `sf32lb56-lcd_n16r12n1`。它会读取三个本地音频文件并分别解码；输入并非 48 kHz 时进行重采样，然后将单声道 PCM 混音并播放。官方文档中的样例文件包括两个 MP3 和一个 WAV；应按示例配置使用配套的文件系统镜像和文件名，不要默认镜像包含任意音频文件。

经审阅的混音示例将三路单声道采样值求和后除以三，而不是以满增益直接相加。文档中的示例约运行 50 秒后结束。这种增益策略和有限的演示时长，不应直接当作产品的混音要求。

它适合作为提示音、音效和音乐同时播放场景的基线，此时产品必须决定哪些声音可以叠加。但它不是现成的音频策略，仍需明确流优先级、音量控制、削波处理、内存预算，以及某一路文件或解码器不能按时提供数据时的行为。运行时边界请参阅 [Audio Server 与缓冲](audio-server-buffering.md)。

## 改造示例时保留验证依据 { #adapt-an-example-without-losing-its-evidence }

<div align="center"><em>表：音频示例产品化时的保留项与复核项</em></div>

<div align="center" markdown>

| 项目 | 可沿用的示例基础 | 面向产品重新验证的内容 |
|:-----|:-----------------|:-----------------------|
| 硬件 | 已验证的开发板布线和外设通路 | 麦克风或扬声器型号、增益、电源轨、引脚复用、布局和量产测试接入 |
| 配置 | 最小化的 SDK 使能组件 | 产品实际需要的内存、文件系统、编解码器、Audio Manager 和功能开关 |
| 音频数据 | 音频样本格式和已验证音频文件 | 采样率、通道数、缓冲区大小、延迟目标和错误处理 |
| 运行行为 | 基本采集或播放顺序 | 与 UI、蓝牙、存储、低功耗状态、恢复和关闭流程的并发行为 |
| 验证记录 | 官方文档描述的预期行为 | 串口日志、录音或回放文件、实测电流和可重复的回归测试 |

</div>

## 相关资源 { #related-resources }

- [音频概览](overview.md)：了解接口、会话形态、功耗注意事项和验证方法。
- [Audio Server 与缓冲](audio-server-buffering.md)：了解音频流所有权、DMA 缓冲和产品负载测试。
- [示例](../../develop/examples/index.md)：查看跨领域的 SDK 示例目录。
- [SiFli-SDK 音频示例索引](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/index.html)：查看当前官方示例列表和各示例的具体配置方法。
