---
icon: lucide/circuit-board
description: "SiFli-SDK 的 --board 名称如何将固件与实际 SF32 硬件关联：Flash/PSRAM 布局、引脚复用、显示和音频路径，以及开发板启动调试清单。"
tags:
    - 开发
    - SiFli-SDK
---

# 开发板配置 { #board-configuration }

开发板配置将固件与实际硬件对应起来，涵盖 Flash 布局、PSRAM、引脚、显示接口、音频路径、时钟、电源轨和默认外设。

在 SiFli-SDK 中，`--board=<board_name>` 是最重要的构建输入。它决定示例使用哪套板级支持包。

对于双核开发板，名称中未指定核时，默认使用 HCPU 配置。要为 LCPU 构建，请在开发板名称后添加 `_lcpu`；添加 `_hcpu` 则可显式指定 HCPU。还需确认所选 SDK 示例支持对应的核。

## 开发板名称会影响哪些配置 { #what-the-board-name-controls }

所选开发板可能影响以下配置：

- 芯片型号和封装变体
- Flash 与 PSRAM 布局
- HCPU / LCPU 构建目标
- 引脚复用与外设可用性
- UART 下载参数
- 显示与触摸配置
- 音频编解码器（codec）路由
- 蓝牙（Bluetooth）配置
- 分区表与启动前提

## 实用规则 { #practical-rules }

- 不要根据营销名称去猜开发板名称。
- 不要把 Zephyr 或 Arduino 的开发板名称直接搬进 SiFli-SDK。
- 选择 GPIO、ADC、PWM、I2C、SPI 或显示资源时，应对照开发板原理图或开发套件页面。
- 从同一块开发板上最接近需求的 SDK 示例出发。
- 切换开发板后，清理旧的构建输出并重新构建。

## 开发板启动调试清单 { #board-bring-up-checklist }

- [ ] 确认芯片型号与封装。
- [ ] 确认 Flash 与 PSRAM 的类型、容量及配置。
- [ ] 确认供电来源与充电器行为。
- [ ] 确认本开发板实际使用的时钟源和频率；如适用，核对 48 MHz 与 32.768 kHz 时钟。
- [ ] 确认下载 UART 和日志 UART。
- [ ] 确认显示与触摸接口。
- [ ] 如果涉及音频，确认音频路径。
- [ ] 确认启动引脚与复位行为。
- [ ] 确认分区布局。

开始排查应用层问题前，先确认开发板配置与手上的实际硬件一致。

## SDK 开发板名称示例 { #sdk-board-name-example }

<div align="center"><em>表：SF32LB52-DevKit-LCD_N16R8 的 SDK 开发板名称</em></div>

<div align="center" markdown>

| 名称类型 | 标识符 |
|:---------|:-------|
| 开发板型号 | `SF32LB52-DevKit-LCD_N16R8` |
| SiFli-SDK 的 `--board` 参数值 | `sf32lb52-lcd_n16r8` |

</div>

使用 SiFli-SDK 时，应将 SDK 标识符传给 `--board`；产品名称不能代替构建标识符。

## 移植到自定义开发板时 { #when-porting-to-a-custom-board }

先从最接近的开发套件或模块配置出发，然后逐项调整：

1. Flash 与 PSRAM 配置
2. 引脚复用
3. 控制台/下载 UART
4. 显示、触摸与音频资源
5. 电源与充电假设
6. 分区布局
7. 产品专用外设

每完成一项改动，都使用可覆盖该功能的最小示例进行验证。
