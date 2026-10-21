---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Nano：紧凑型半孔 SF32LB52x 开发板，适合贴装式原型、小型显示模组启动调试和接近成品形态的评估。"
tags:
    - 硬件
    - 开发板
---

# SF32LB52-DevKit-Nano { #sf32lb52-devkit-nano }

## 概览 { #overview }

SF32LB52-DevKit-Nano 是一款小型 SF32LB52x 开发板，适合紧凑型原型和嵌入式评估。它在板边采用半孔（castellated）设计，因此既可作为独立开发板使用，也适合作为早期产品原型中的贴装模组。

开发板尺寸为 51 mm × 20.32 mm，并引出 GPIO、UART、I2C、SPI、LCD、I2S、GPADC、PWM、USB 和模拟音频等接口，可用于相关功能的开发与评估。

![SF32LB52-DevKit-Nano 正面图](assets/sf32lb52x/Nano_Front_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 正面图</em></div>

![SF32LB52-DevKit-Nano 背面图](assets/sf32lb52x/Nano_Back_look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Nano — 背面图</em></div>

## 开发板型号变体 { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Nano 开发板变体</em></div>

<div align="center" markdown>

| 变体 | MCU | 封装内存储 | 外部 Flash |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Nano-N4 | SF32LB52BU56 | 4 MB SPI NOR Flash | 无 |
| SF32LB52-DevKit-Nano-N16R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB QSPI-NOR Flash |
| SF32LB52-DevKit-Nano-A128R16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 128 MB QSPI-NAND Flash |

</div>

N4 变体适合紧凑型控制、蓝牙（Bluetooth）和简单 UI 应用。N16R16 配备 16 MB OPI-PSRAM 和 16 MB QSPI-NOR；A128R16 配备 16 MB OPI-PSRAM 和 128 MB QSPI-NAND。两者都适合需要较大显示资源、外部文件系统，或利用 PSRAM 存放帧缓冲和工作数据的应用。

**来源差异，选型前请核实：** 思澈科技（SiFli）的[详细 Nano 开发板指南](https://wiki.sifli.com/board/sf32lb52x/SF32LB52-DevKit-Nano.html)将其 16 MB OPI-PSRAM + 16 MB NOR 配置称为 `R16N16 V1.0.0`；[当前开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)则将相同存储配置列为 `N16R16`，并单独列出配备 16 MB OPI-PSRAM 和 128 MB QSPI-NAND 的 `A128R16`。详细指南没有具体说明 A128R16；该型号应以型号指南所列信息为准，不要把 N16R16 板卡的其他细节套用于 A128R16。确定固件或存储布局前，请核对实物丝印及当前原理图/BOM。

思澈科技（SiFli）的两份资料对 Nano 尺寸的记载也略有差异：详细指南给出的尺寸为 21 mm × 51 mm，型号指南则为 51 mm × 20.32 mm。两份资料的 51 mm 边长一致，较短边相差 0.68 mm。本文采用型号指南中精度更高的数据；设计外壳或载板前，请以对应板卡版本的机械图纸为准。

## 开发板亮点 { #board-highlights }

- 51 mm × 20.32 mm 紧凑型开发板
- 采用半孔边缘布局，适合焊接到原型板上
- USB Type-C 供电，以及通过 CH340N 实现 USB 转 UART 下载 / 调试
- 引出 GPIO、UART、I2C、SPI、GPADC、PWM、I2S、PDM 和支持唤醒的引脚
- 通过 16 针 FPC 信号组支持 QSPI LCD，通常配合 22 针转 16 针适配线使用
- 支持 I2C 触摸面板
- 提供模拟麦克风输入和差分音频输出引脚
- USB 2.0 FS 信号已引出到板边引脚
- 2 个用户 LED
- 电源键和功能键

## 何时使用这块开发板 { #when-to-use-this-board }

当原型设计需要尽量接近最终产品形态时，可选择 SF32LB52-DevKit-Nano。

- 构建紧凑型蓝牙和显示原型
- 将开发板焊接到载板 PCB 上
- 在自定义板设计前测试接近成品的引脚分配
- 对比仅含 NOR Flash 的配置，以及搭配 PSRAM 的 QSPI-NOR、QSPI-NAND 配置
- 在小尺寸板型中启动调试 LCD、音频、传感器和 USB 功能

如果需要更方便的台式接线和更宽的信号引出，请使用 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)。如果需要带充电器、TF 卡、麦克风和扬声器功放的显示型开发板，请使用 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)。

## 供电 { #power }

开发板支持三种供电方式：

- USB Type-C 供电，推荐用于开发阶段
- 在未连接 USB 时，通过半孔上的 3.3 V 和 GND 引脚输入电源
- 在未连接 USB 时，通过半孔上的 5 V 和 GND 引脚输入电源

当 USB Type-C 已连接时，部分 3.3 V 和 5 V 引脚可作为输出使用。连接外部电路前，请先确认电源方向。

开发板包含一个通过 CH340N RTS# 信号控制的电源开关，从而支持工具控制的复位行为。

## 下载与调试 { #download-and-debug }

使用 USB Type-C UART 接口进行固件下载和串口日志输出。

- **下载模式**：在下载工具中启用 BOOT，然后上电或复位开发板。
- **调试 / 日志模式**：禁用 BOOT，然后上电或复位开发板。
- **RTS 复位行为**：如果打开串口时开发板意外复位或断电，请在主机串口设置中关闭调制解调器控制或硬件流控。

![在串口高级设置中关闭调制解调器控制](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>在串口高级设置中关闭调制解调器控制</em></div>

## 用户控制 { #user-controls }

<div align="center"><em>用户控制信号</em></div>

<div align="center" markdown>

| 功能 | GPIO | 行为 |
| :--- | :--- | :--- |
| LED1 | PA31 | 低电平有效 |
| LED2 | PA32 | 低电平有效 |
| KEY1 | PA34 | 高电平有效，支持长按 10 s 复位 |
| KEY2 | PA33 | 高电平有效 |

</div>

## 半孔引脚摘要 { #castellated-pin-summary }

Nano 开发板引出了两组板边引脚。第一组主要承载音频、SPI1、调试 UART、靠近 USB 的电源，以及支持 GPADC 的引脚；第二组主要承载 SPI2、USB FS、支持唤醒的 GPIO 和电源。

### 正面边缘信号 { #front-side-edge-signals }

<div align="center"><em>正面边缘信号图</em></div>

<div align="center" markdown>

| 引脚 | 信号 | 主要功能 |
| :--- | :--- | :--- |
| 1 | GND | 接地 |
| 2 | DACP | 模拟音频输出 |
| 3 | DACN | 模拟音频输出 |
| 4 | MIC_ADC | 模拟麦克风输入 |
| 5 | MIC_BIAS | 麦克风偏置 |
| 6 | PA30 | I2S1_LRCK / GPADC2 / UART / I2C |
| 7 | GND | 接地 |
| 8 | PA19 | UART0_TXD / SWCLK / 调试 |
| 9 | PA18 | UART0_RXD / SWDIO / 调试 |
| 10 | PA29 | SPI1_CS / I2S1_BCK / GPADC1 |
| 11 | PA28 | SPI1_CLK / I2S1_SDI / GPADC0 |
| 12 | PA25 | SPI1_DI / I2S1_SDO / WKUP1 |
| 13 | 3.3V | 3.3 V 输入/输出 |
| 14 | GND | 接地 |
| 15 | PA24 | SPI1_DIO / I2S1_MCLK / WKUP0 |
| 16 | 5V | 5 V 输入/输出 |

</div>

### 背面边缘信号 { #back-side-edge-signals }

<div align="center"><em>背面边缘信号图</em></div>

<div align="center" markdown>

| 引脚 | 信号 | 主要功能 |
| :--- | :--- | :--- |
| 1 | GND | 接地 |
| 2 | 3.3V | 3.3 V 输入/输出 |
| 3 | PA39 | SPI2_CLK / WKUP15 |
| 4 | PA37 | SPI2_DIO / WKUP13 |
| 5 | PA38 | SPI2_DI / WKUP14 |
| 6 | PA41 | UART / I2C / GPTIM / WKUP17 |
| 7 | PA40 | SPI2_CS / WKUP16 |
| 8 | PA42 | UART / I2C / GPTIM / WKUP18 |
| 9 | GND | 接地 |
| 10 | 3.3V | 3.3 V 输入/输出 |
| 11 | PA43 | UART / I2C / GPTIM / WKUP19 |
| 12 | PA44 | UART / I2C / GPTIM / WKUP20 |
| 13 | PA35 | USB_DP / WKUP11 |
| 14 | PA36 | USB_DM / WKUP12 |
| 15 | 5V | 5 V 输入/输出 |
| 16 | GND | 接地 |

</div>

## LCD 接口 { #lcd-interface }

开发板通过 16 针 FPC 信号组支持 QSPI LCD 面板。原始开发板说明提到，可通过 22 针转 16 针 FPC 线缆连接 Huangshan Pi 1.85 英寸 AMOLED 屏幕。

![22 针转 16 针 FPC 适配线](assets/sf32lb52x/22p-to-16p.png){ loading="lazy" }
<div align="center"><em>22 针转 16 针 FPC 适配线</em></div>

<div align="center"><em>16 针 LCD FPC 信号图</em></div>

<div align="center" markdown>

| 引脚 | 信号 | 功能 |
| :--- | :--- | :--- |
| 1 | GND | 接地 |
| 2 | PA00 | LCD 复位 |
| 3 | PA01 | 背光 PWM |
| 4 | PA02 | LCD TE / I2S1_MCLK |
| 5 | PA03 | LCD CS / I2S1_SDO |
| 6 | PA04 | LCD CLK / I2S1_SDI |
| 7 | PA05 | LCD D0 / I2S1_BCK |
| 8 | PA06 | LCD D1 / I2S1_LRCK |
| 9 | PA07 | LCD D2 / PDM1_CLK |
| 10 | PA08 | LCD D3 / PDM1_DAT |
| 11 | 3.3V | 显示电源输出 |
| 12 | GND | 接地 |
| 13 | PA09 | 触摸中断 |
| 14 | PA11 | 触摸 I2C SDA |
| 15 | PA20 | 触摸 I2C SCL |
| 16 | PA10 | 触摸复位 |

</div>

## 外部 Flash 与 SDIO 引脚 { #external-flash-and-sdio-pins }

N16R16 变体包含外部 16 MB QSPI-NOR Flash。其存储引脚组如下：

<div align="center"><em>外部 Flash 与 SDIO 引脚组</em></div>

<div align="center" markdown>

| MCU GPIO | Flash / SDIO 共用功能 |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

这些引脚可能会因具体变体而被已安装的 Flash 占用。在将其作为扩展引脚使用前，请先核对实物板卡的装配情况。

## 音频扩展 { #audio-expansion }

Nano 开发板引出了模拟麦克风输入、麦克风偏置和差分模拟音频输出。可根据目标产品需求增加外部麦克风电路和音频功放。

## SDK 构建目标 { #sdk-build-targets }

使用 SiFli-SDK 编译时，可通过 `scons --board=<board_name>` 指定以下精确的板级目标名：

- `sf32lb52-nano_n4`
- `sf32lb52-nano_n16r16`
- `sf32lb52-nano_a128r16`

这些名称是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 的 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)列出的目标集合可能不同；请按当前使用的 SDK 版本核实。

## 相关文档 { #related-documents }

[SF32LB52x 芯片介绍]: ../chips/SF32LB52x.md
[SF32LB52x 硬件设计指南]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[原始 SiFli-Wiki 文章]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-DevKit-Nano.md
[设计资料包]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-Nano_V1.0.0.zip?
[购买样品]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 芯片介绍]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南]__
- :fontawesome-brands-github: __[原始 SiFli-Wiki 文章]__
- :fontawesome-solid-download: __[设计资料包]__
- :fontawesome-solid-cart-shopping: __[购买样品]__

</div>
