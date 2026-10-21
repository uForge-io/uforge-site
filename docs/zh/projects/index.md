---
icon: lucide/folder-kanban
title: "项目概览"
description: "端到端 μForge 项目：将选定硬件、软件基线、验证证据和量产交接结合在一起。"
tags:
    - 项目
---

# 项目概览 { #projects-overview }

项目提供以实际应用为出发点的参考实现，你可以先复现，再按需调整，用来探索 SF32 能支持哪些产品形态。项目不会逐一孤立地展示各项功能，而是把一组有针对性的 SF32 能力，放进人们可能真正会做、会用的应用里。

## 项目的目的 { #what-projects-are-for }

每个项目都应具备以下特点：

- **面向应用。** 它从可识别的产品行为或使用场景出发，而不是抽象的功能演示。
- **开发流程足够完整。** 它串联选定硬件、软件基线、依赖关系、集成里程碑、验证证据和适配路径，让你能走完开发流程中相当大的一部分。
- **可供复现。** 它提供可先复现、再按自身硬件、交互方式或产品需求进行修改的实用基线。
- **做起来有趣。** 项目应鼓励实验，并清楚展现 SF32 能力可以实现什么；实用性和乐趣在这里同样重要。

完成相关[入门指南](../getting-started/index.md)中的基线验证后，再进入项目。[参考设计](../hardware/reference-designs/reference-designs.md)介绍可复用基线和验证路径。当前的“Connected Wearable”条目属于验证流程，并非已发布的开发板套件。只有存在具体且适用的基线时，项目才应链接到该基线；否则应明确并验证项目自身的基线，而不是把规划路径暗示为经验证的设计。

## SiFli-SDK 项目 { #sifli-sdk-projects }

!!! info "第三方项目归属"
    [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) 由 Xinyuan-LilyGO/LilyGO 维护，并非思澈科技（SiFli）项目。板级硬件与固件支持应以 LilyGO 仓库为准；底层 SF32 芯片和 SiFli-SDK 信息则应以思澈科技（SiFli）资料为准。

<div align="center"><em>表：项目目录</em></div>

<div align="center" markdown>

| 项目 | 成果 | 硬件和软件基线 | 适合场景 |
|:-----|:-----|:---------------|:---------|
| [SF32 小智语音助手](sf32-xiaozhi.md) | 基于开源小智 SF32 实现的联网语音与显示助手。 | 支持的 SF32LB52 开发板、小智 SF32 源码、蓝牙（Bluetooth）PAN 和小智云服务。 | 评估 AI 语音交互产品流程，并适配其硬件或应用行为。 |
| [SF32 BLE 对讲机](sf32-ble-talkback.md) | 支持角色选择、Opus 语音、从机端重连、状态提示和低功耗运行的多设备 BLE 按键对讲系统。 | 至少两台 SF32LB52-DevKit-ULP、固定 Talkback 源码、固定的 SiFli-SDK 2.4 兼容版本和 `talk_back/1.2@sifli`。 | 在定制硬件前验证便携式群组对讲、声学、RF 链路恢复和功耗。 |
| [SF32 墨水屏 EPUB 阅读器](sf32-epd-reader.md) | 带书库/目录、按键/触控、动态字体、全刷/局刷、存储和低功耗状态的本地 EPUB 阅读器。 | SF32-OED-EPD V1.1、YZC085 V1.05 电子纸、固定 EPD Reader/SDK 提交、TF 存储和经过验证的内容和字体。 | 评估墨水屏阅读终端、EPUB/渲染边界、面板波形、存储恢复和功耗。 |
| [SuperKey 多功能宏键盘](superkey.md) | 带三块显示屏、USB HID/CDC、按键、编码器、传感器、遥测数据和配套应用的桌面控制器。 | sf32-keyboard 开源硬件、`sf32lb52-superkey` 固件目标和 SuperKeyHub。 | 评估桌面 HMI、宏键盘、状态面板或连接电脑的控制界面。 |
| [Radiation Monitor](radiation-monitor.md) | 具备平滑和历史回放的便携式 79 点 2.4 GHz 信号强度观察器。 | SF32LB52 RF 测试路径、LVGL 显示、KEY2 控制和受控 RF 对照环境。 | 探索相对干扰趋势，并判断是否有必要采用经校准的射频仪表方案。 |
| [Pocket Pi SF32 掌上游戏机](pocket-pi.md) | 带游戏列表、输入、音频、存档以及内置/TF 卡存储的本地 NES 模拟掌机。 | SF32LB52-DevKit-ULP 目标、PocketPi/Nofrendo 源码、AW9523 输入和合法 NES 内容。 | 在定制硬件前验证游戏型图形、输入、音频、存储和功耗负载。 |
| [LilyGO T-Display-SF32](lilygo-t-display-sf32.md) | 以显示为核心的第三方 SF32 开发平台，涵盖触控、运动感知、存储、音频、LoRa 和电源管理路径。 | LilyGO T-Display-SF32 硬件、评估时选定并记录的板级仓库与 LilyGO SDK 分支版本，以及 `t-display-sf32_hcpu` 目标。 | 评估由 LilyGO 维护的可穿戴设备、手持设备、传感终端或 HMI 基线，同时避免将其误认为思澈科技（SiFli）官方项目。 |

</div>

## Zephyr 项目 { #zephyr-projects }

本分组包括直接构建在 Zephyr 上的项目，以及构建在已有文档记录的 Zephyr 派生层（例如 OpenSiFli 的 ArduinoCore-zephyr）上的项目。

<div align="center"><em>表：Zephyr 项目目录</em></div>

<div align="center" markdown>

| 项目 | 成果 | 硬件和软件基线 | 适合场景 |
|:-----|:-----|:---------------|:---------|
| [Arduboy2 的 SF32LB52 移植版](arduboy2-sifli.md) | 在 SF32LB52 上评估 Arduboy2 风格游戏或交互式演示的可复现路径。 | OpenSiFli Arduboy2-SiFli 源码、ArduinoCore-Zephyr 变体 `sf32lb52_devkit_lcd_sf32lb525uc6`，以及项目文档所述的外接显示 / 输入 / 音频路径。 | 验证本地游戏交互、图形、输入、音频，以及面向 Arduino 的可移植应用层边界。 |
| [SF32 上的 ZMK 键盘固件](zmk-sf32.md) | 可复现的 SF32LB52 分体键盘基线，覆盖矩阵扫描、层、USB HID、BLE 分体/主机链路、设置和 ZMK Studio。 | OpenSiFli/zmk、SF32LB52-DevKit-LCD ZMK 开发板变体，以及固定清单依赖的 `urchin_sf32lb52_left/right` 扩展板配置（shield）。 | 评估基于 ZMK 的无线键盘、宏键盘或定制 HID 产品，同时衡量下游 SF32 移植的成熟度。 |

</div>

## 每个项目应包含什么 { #what-every-project-includes }

每个 μForge 项目都应说明目标成果、目标读者、支持的硬件和软件版本、前置条件、源代码仓库、按里程碑组织的构建步骤、验证标准、测量结果和产品适配交接。项目是工程工作的起点，不能替代针对最终硬件、服务集成、安全、隐私或法规要求所做的量产验证。

!!! note "自动生成内容"
    本页是在没有现成源文档的情况下编写的。依赖其中的技术结论前，请先对照思澈科技（SiFli）的官方文档进行核实。
