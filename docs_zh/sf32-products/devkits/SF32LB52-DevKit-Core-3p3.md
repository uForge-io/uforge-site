---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-Core-3p3：紧凑型 SF32LB52x 评估板，MCU 供电可通过跳线选择 1.8 V 或 3.3 V，并提供 GPIO、显示、音频、USB 和电源轨的直接访问。"
tags:
    - 硬件
    - 开发板
---

# SF32LB52-DevKit-Core-3p3 { #sf32lb52-devkit-core-3p3 }

## 概览 { #overview }

SF32LB52-DevKit-Core-3p3 是一款用于直接评估 SF32LB52x 芯片的紧凑型开发板，可通过板上跳线选择为 MCU 提供 1.8 V 或 3.3 V 电源。MCU 的主要信号通过板边排针引出；板边采用金属化半孔，排针可免焊插接使用。开发板适合需要直接访问 GPIO、串行总线、显示信号、音频、ADC、PWM 和各路电源轨的工程师。

板卡尺寸为 30.88 mm × 68 mm，适合紧凑型台架原型验证，同时提供一套适用于 SF32LB52x 硬件与固件启动调试的实用接口。

![SF32LB52-DevKit-Core-3p3 正面图](assets/sf32lb52x/Core-3p3_Front_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 正面图</em></div>

![SF32LB52-DevKit-Core-3p3 背面图](assets/sf32lb52x/Core-3p3_Back_look.png){ width="50%" loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 — 背面图</em></div>

## 开发板型号变体 { #board-variants }

<div align="center"><em>SF32LB52-DevKit-Core-3p3 开发板变体</em></div>

<div align="center" markdown>

| 变体 | MCU | 封装内存储 | 板载存储 |
| :--- | :--- | :--- | :--- |
| SF32LB52-DevKit-Core-3p3-N1 | SF32LB52BU36 | 1 MB SPI NOR Flash | 无 |
| SF32LB52-DevKit-Core-3p3-N4 | SF32LB52BU56 | 4 MB SPI NOR Flash | 无 |
| SF32LB52-DevKit-Core-3p3-R4N16 | SF32LB52EUB6 | 4 MB OPI-PSRAM | 16 MB SPI NOR Flash |
| SF32LB52-DevKit-Core-3p3-R8N16 | SF32LB52GUC6 | 8 MB OPI-PSRAM | 16 MB SPI NOR Flash |
| SF32LB52-DevKit-Core-3p3-R16N16 | SF32LB52JUD6 | 16 MB OPI-PSRAM | 16 MB SPI NOR Flash |

</div>

对于紧凑型蓝牙（Bluetooth）产品、控制类产品和简单 HMI 应用，建议使用仅带 NOR 的变体。若应用需要更大的图形资源、帧缓冲、文件系统或应用存储空间，则建议使用带 PSRAM 和外部 NOR 的变体。

**来源记载存在差异，选型前请核对板卡标识：** 思澈科技（SiFli）的[Core-3p3 详细开发板指南](https://wiki.sifli.com/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.html)将 SF32LB52JUD6 配置称为 `R16N16 V1.0.0`（当前版本），而[开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)将同一 JUD6、16 MB PSRAM、16 MB NOR 配置列为 `N16R16`。详细指南的版本信息行写 EUB6 合封 8 MB PSRAM，但其特性列表和板型表均写 4 MB；思澈科技（SiFli）的[SF32LB52 系列芯片概述](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB52/SF32LB52-Overview-B3.md)也注明 EUB6 合封 4 MB，因此本文采用 4 MB。需要确认具体板卡后缀时，请核对实物丝印及对应原理图/BOM。

## 开发板亮点 { #board-highlights }

- 提供仅 NOR 或 PSRAM + NOR 配置的 SF32LB52x MCU 变体
- 48 MHz 主晶振和 32.768 kHz RTC 晶振
- USB Type-C 供电，以及通过 CH340N 实现 USB 转 UART 下载 / 调试
- 板载 PCBA 天线和 I-PEX 天线座
- 通过跳线选择 1.8 V 或 3.3 V 的 MCU 供电电压
- USB 2.0 FS 信号已引出到板边排针
- 开发板共引出 37 路 GPIO；MCU 提供 3 路 UART、4 路 I2C、2 路 GPTIM、2 路 SPI 和 6 路 GPADC
- 所有 GPIO 均可配置为 UART、I2C 或 GPTIM；引脚复用还包括 SPI、PWM、I2S、PDM 和唤醒输入
- 提供 16 针、0.5 mm 间距 FPC 显示连接器；显示接口支持 SPI、DSPI、Quad-SPI 及 DDR 模式 QSPI
- 提供 I2C 触摸面板信号
- 提供模拟麦克风和差分音频输出引脚
- 1 个用户 LED
- 电源键和功能键
- 提供单路电源轨电流测量点；思澈科技（SiFli）还列出单 MCU、最小系统和整板功耗测试

## 何时使用这块开发板 { #when-to-use-this-board }

当你需要最直接地访问 SF32LB52x 各类信号时，可选择 SF32LB52-DevKit-Core-3p3。

- 对自定义子板或传感器板进行启动调试
- 评估 SF32LB52x 的不同存储器变体
- 原型验证 LCD、音频、USB 和 GPIO 功能
- 测量各独立电源轨的电流
- 在设计紧凑型产品 PCB 之前验证固件

如果需要更小的半孔模组式开发板，可使用 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)。如果需要带音频功放、TF 卡槽和电池充电功能的现成显示开发板，可使用 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)。

## 供电 { #power }

开发板支持三种供电方式：

- USB Type-C 供电，推荐用于常规开发和调试
- USB 未连接时，通过板边排针的 5 V 和 GND 引脚输入电源
- USB 未连接时，通过板边排针的 3.3 V 和 GND 引脚输入电源（可使用外部台式电源）

板上另有一个跳线用于选择 MCU 的供电电压（1.8 V 或 3.3 V）。该设置与板边排针上的 1.8 V、3.3 V 电源引脚不同。调整跳线或为外部电路供电前，请根据对应板卡版本核对引脚图和原理图。

测量单路电源轨电流时，请在板上相应测量点将电流表串接到待测电源轨中。

当连接 USB Type-C 时，开发板还可通过指定排针输出 3.3 V、1.8 V 和 5 V。连接外部电路前，请先确认所需的电源方向。

开发板带有电源开关。CH340N 的 RTS# 信号可控制开发板的使能状态，使主机工具能够在下载或调试时复位 MCU。

## 下载与调试 { #download-and-debug }

固件下载和软件调试均使用 USB Type-C UART 端口。

- **下载模式**：在下载工具中启用 BOOT，然后上电或复位开发板。
- **调试 / 日志模式**：禁用 BOOT，然后上电或复位开发板。
- **复位**：使用板上的复位 / 电源键功能，或使用工具控制的 RTS 复位路径。

## 用户控制 { #user-controls }

<div align="center"><em>用户控制信号</em></div>

<div align="center" markdown>

| 功能 | GPIO | 行为 |
| :--- | :--- | :--- |
| LED | PA32 | 高电平有效 |
| KEY1 | PA34 | 高电平有效，支持长按 10 s 复位 |
| KEY2 | PA33 | 高电平有效 |

</div>

## 显示接口 { #display-interface }

开发板通过一个立式 16 针 FPC 连接器支持 SPI、DSPI 和 Quad-SPI LCD 接口（包括 DDR 模式 QSPI），间距为 0.5 mm，配有上翻式锁扣，触点位于下侧。连接器引出 LCD 复位、背光 PWM、TE、片选、时钟、4 条数据线以及 I2C 触摸信号。

![FPC 转接排线](assets/sf32lb52x/FPC-22P.png){ loading="lazy" }
<div align="center"><em>FPC 转接排线</em></div>

### 16 针 LCD FPC 信号定义 { #16-pin-lcd-fpc-signal-map }

<div align="center"><em>16 针 LCD FPC 信号定义</em></div>

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
| 11 | 3.3 V | 显示电源输出 |
| 12 | GND | 接地 |
| 13 | PA09 | 触摸中断 |
| 14 | PA11 | 触摸 I2C SDA |
| 15 | PA20 | 触摸 I2C SCL |
| 16 | PA10 | 触摸复位 |

</div>

思澈科技（SiFli）的中文开发板指南称，1.85 英寸 AMOLED 模组可通过 16 针 FPC 排线直接连接；英文指南则写为 FPC-22p，配图文件名也为 `FPC-22P`。开发板上的连接器本身是 16 针。两份资料未能解释这一差异；连接前请对照显示模组核实排线针数和针脚定义。

## 排针信号摘要 { #header-signal-summary }

开发板引出了两组 24 针板边排针。第一侧主要覆盖通用 GPIO、SPI2、USB、GPADC 和电源；第二侧主要覆盖 LCD、触摸、调试 UART、音频和电源。

![SF32LB52-DevKit-Core-3p3 管脚定义](assets/sf32lb52x/SF32LB52-DevKit-Core-3p3-T-pinout.svg){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-Core-3p3 引脚图</em></div>

### 通用 I/O 排针 { #general-io-header }

<div align="center"><em>通用 I/O 排针引脚分配</em></div>

<div align="center" markdown>

| 引脚范围 | 信号 | 主要功能 |
| :--- | :--- | :--- |
| 2-9 | PA44..PA37 | UART、I2C、GPTIM、SPI2、唤醒输入 |
| 10-11 | PA36 / PA35 | USB DM / USB DP、UART、I2C、GPTIM |
| 12-15 | PA31..PA28 | GPADC3..0、SPI1、I2S1、UART、I2C |
| 17 | 3.3 V | 根据 USB 供电状态用作 3.3 V 输入或输出 |
| 18-21 | PA27..PA24 | 唤醒输入、SPI1、I2S1 |
| 22 | PA34 | UART、I2C、GPTIM、GPADC6、WKUP10 |
| 23-24 | PA33 / PA32 | UART、I2C、GPTIM、GPADC5 / GPADC4 |

</div>

### LCD、音频与调试排针 { #lcd-audio-and-debug-header }

<div align="center"><em>LCD、音频与调试排针引脚分配</em></div>

<div align="center" markdown>

| 引脚范围 | 信号 | 主要功能 |
| :--- | :--- | :--- |
| 2-11 | PA00..PA09 | LCD、触摸、PDM、I2S、UART、I2C |
| 12-15 | MIC_ADC, MIC_BIAS, DACP, DACN | 模拟麦克风与音频输出 |
| 17 | 1.8 V | 根据 USB 供电状态用作 1.8 V 输入或输出 |
| 18-20 | PA10, PA11, PA20 | PA10：CTP_RST；PA11：CTP_SDA；PA20：CTP_SCL；三者均支持 UART、I2C 和 GPTIM |
| 21 | PA21 | UART、I2C、GPTIM |
| 22-23 | PA18 / PA19 | UART0 RX/TX、SWDIO/SWCLK、下载/调试 |
| 24 | 5 V | 根据 USB 供电状态用作 5 V 输入或输出 |

</div>

## 外部 Flash 与 SDIO 引脚 { #external-flash-and-sdio-pins }

部分变体带有外部 16 MB QSPI-NOR Flash。共用的存储 / SDIO 引脚组如下：

<div align="center"><em>外部 Flash 与 SDIO 引脚组</em></div>

<div align="center" markdown>

| MCU GPIO | Flash / SDIO 复用功能 |
| :--- | :--- |
| PA12 | MPI2_CS / SD1_D2 |
| PA13 | MPI2_D1 / SD1_D3 |
| PA14 | MPI2_D2 / SD1_CLK |
| PA15 | MPI2_D0 / SD1_CMD |
| PA16 | MPI2_CLK / SD1_D0 |
| PA17 | MPI2_D3 / SD1_D1 |

</div>

在将这些引脚用于 SDIO 或其他扩展功能之前，请先确认它们是否已被已安装的 Flash 占用。

## 音频扩展 { #audio-expansion }

开发板引出了模拟麦克风偏置和输入，以及差分 DAC 输出。麦克风和用于驱动扬声器的 Class-AB/D 功放均需外接；请根据目标音频路径选择并验证这些器件。

## SDK 构建目标 { #sdk-build-targets }

使用 SiFli-SDK 编译时，可通过 `scons --board=<board_name>` 指定以下精确的板级目标名：

- `sf32lb52-core_n4`
- `sf32lb52-core_n16r16`

这些名称是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 主分支[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)列出的目标可能不同；请按当前使用的 SDK 版本核实。

## 相关文档 { #related-documents }

[SF32LB52x 芯片介绍]: ../chips/SF32LB52x.md
[SF32LB52x 硬件设计指南]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[原始 SiFli-Wiki 文章]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-DevKit-Core-3p3.md
[设计资料包]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB52-DevKit-Core-3p3-V100_2025-06-10.epro?
[购买样品]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 芯片介绍]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南]__
- :fontawesome-brands-github: __[原始 SiFli-Wiki 文章]__
- :fontawesome-solid-download: __[设计资料包]__
- :fontawesome-solid-cart-shopping: __[购买样品]__

</div>
