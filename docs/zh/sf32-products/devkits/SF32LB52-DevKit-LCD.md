---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-LCD：面向显示应用的 SF32LB52x 开发板，适合快速启动调试 SPI、QSPI 和 MCU/8080 屏幕，并集成触摸、音频、存储和电池支持。"
tags:
    - 硬件
    - 开发板
---

# SF32LB52-DevKit-LCD { #sf32lb52-devkit-lcd }

## 概览 { #overview }

SF32LB52-DevKit-LCD 是一块面向显示应用的 SF32LB52x 家族开发板。它基于 SF32LB52x 模组打造，适合快速开发使用 SPI、DSPI、QSPI 或 MCU/8080 显示接口的产品。

开发板将 MCU 模组、显示连接器、触摸接口、模拟麦克风输入、模拟音频输出、USB-C、USB 转 UART 调试、TF 卡存储和电池支持集成在同一块评估平台上。对于智能手表风格 HMI、紧凑型仪表板、显示外设，以及其他在开发早期就需要屏幕的 SF32LB52x 应用，它是一个很实用的起点。

![SF32LB52-DevKit-LCD 正面图](assets/sf32lb52x/SF32LB52x-DevKit-LCD_Front_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 正面图</em></div>

![SF32LB52-DevKit-LCD 背面图](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Back_Look.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 背面图</em></div>

![SF32LB52-DevKit-LCD 功能框图](assets/sf32lb52x/SF32LB52x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 功能框图</em></div>

## 开发板亮点 { #board-highlights }

- SF32LB52x 模组平台，兼容 SF32LB52-MOD-1、SF32LB52-MOD-A 和 SF32LB52-MOD-B
- 通过 22 针 FPC 连接器支持 QSPI / SPI / DSPI LCD
- 通过 FPC 和 40 针扩展排针支持 8 位 MCU/8080 LCD
- 支持 I2C 触摸面板
- 提供 USB-C 用于 USB 转 UART 下载 / 调试及开发板供电
- 提供独立 USB-C 接口用于 USB 2.0 FS 应用场景
- 板载 MEMS 麦克风和 Class-D 音频功放
- 使用 SPI 的 MicroSD 卡槽
- 电池连接器和 ETA9640P 线性充电器
- 40 针扩展排针引出显示、GPIO、存储、音频和电源信号

## 何时使用这块开发板 { #when-to-use-this-board }

当项目需要现成的显示平台，而不是最小化引出板时，选择 SF32LB52-DevKit-LCD。

- 启动调试 QSPI、SPI、DSPI 或 MCU/8080 LCD 面板
- 验证触摸面板集成
- 在 SF32LB52x 上测试 LVGL 或自定义 UI 应用
- 评估麦克风输入和扬声器输出
- 原型验证 TF 卡存储
- 在最终确定自定义 PCB 前比较不同模组选项

如果需要更小、带半孔边缘的板卡，请使用 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)。如果需要最多的引脚引出和直接的信号访问，请使用 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)。

## 硬件配置 { #hardware-configuration }

<div align="center"><em>硬件配置摘要</em></div>

<div align="center" markdown>

| 项目 | 配置 |
| :--- | :--- |
| SF32LB52-DevKit-LCD-1-N16R8 | SF32LB52-MOD-1-N16R8 / SF32LB525UC6；16 MB QSPI-NOR + 8 MB OPI-PSRAM |
| SF32LB52-DevKit-LCD-1-A128R16 | SF32LB52-MOD-1-A128R16 / SF32LB527UD6；128 MB QSPI-NAND + 16 MB OPI-PSRAM |
| 时钟 | 模组集成 48 MHz 主晶体和 32.768 kHz RTC 晶体 |
| RF | 通过 0 Ω 电阻选择板载天线或 IPEX 连接器 |
| 显示 | QSPI/SPI/DSPI 与 8 位 MCU/8080 |
| 触摸 | I2C 触摸接口 |
| 音频 | MEMS 麦克风输入与 Class-D 扬声器功放 |
| 存储 | 通过 SPI 连接的 MicroSD 卡座 |
| USB | USB 转 UART Type-C 与 USB 2.0 FS Type-C |
| 电池 | 单节锂离子/锂聚合物电池连接器 |
| 充电器 | ETA9640P 线性充电器，默认 450 mA 充电电流 |

</div>

上表中的开发板型号和存储配置依据思澈科技（SiFli）的[开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)整理。将开发板作为设计基线前，请对照板卡丝印和对应的设计资料确认版本。

A128R16 的 Flash 标注在官方资料中存在差异：[OpenSiFli 模组型号指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)将模组列为 128 MB SPI-NAND，而开发板型号指南将对应开发板 SKU 列为 128 MB QSPI-NAND。资料未说明差异是指实装器件还是接口表述。依赖此配置前，请按具体板卡版本核对原理图/BOM 中的 Flash 器件和总线模式。

## 版本说明 { #version-notes }

<div align="center"><em>开发板版本历史</em></div>

<div align="center" markdown>

| 版本 | 模组基础配置 | 说明 |
| :--- | :--- | :--- |
| V1.2.0 | SF32LB52-MOD-1 / SF32LB52-MOD-A / SF32LB52-MOD-B | SD 卡检测信号改为 PA26。思澈科技（SiFli）当前型号指南列出了上方两种 MOD-1 配置。 |
| V1.1.0 | SF32LB52-MOD-A / SF32LB52-MOD-B | 更新充电电路、电源切换、音频 PA 增益、复位行为、RGB LED 电路、模组管脚兼容性、RF 电源滤波、双 Flash 支持、SD 卡检测、可选 SDIO Wi-Fi、天线禁布区和 VBUS 保护 |
| V1.0.0 | 早期 SF32LB52 模组 | 初始公开开发板版本 |

</div>

在将引脚图用于量产载板或测试夹具设计前，请先检查丝印和设计包，确认准确的开发板版本。

![SF32LB52-DevKit-LCD 正面标注图](assets/sf32lb52x/52KIT-LCD-T-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 正面标注图</em></div>

![SF32LB52-DevKit-LCD 背面标注图](assets/sf32lb52x/52KIT-LCD-B-Notes.png){ loading="lazy" }
<div align="center"><em>SF32LB52-DevKit-LCD — 背面标注图</em></div>

## 开始使用 { #getting-started }

### 所需硬件 { #required-hardware }

- SF32LB52-DevKit-LCD 开发板
- 与所选接口兼容的 LCD 模组
- USB 2.0 数据线，Type-A 转 Type-C 或等效线缆
- 运行 Windows、Linux 或 macOS 的主机电脑

### 可选硬件 { #optional-hardware }

- 扬声器
- TF 卡
- 单节锂离子/锂聚合物电池，容量通常为 450 mAh 至 500 mAh
- 当需要同时进行 UART 调试和原生 USB 测试时，第二根 USB 线缆

### 基本连接步骤 { #basic-setup }

1. 将 LCD 模组连接到正确的 LCD 接口。
2. 将 USB 转 UART Type-C 端口连接到主机电脑。
3. 打开 SifliTrace 或思澈科技（SiFli）固件下载工具。
4. 选择检测到的串口。
5. 给开发板上电，并下载或运行目标固件。
6. 显示亮起后，根据应用需求验证触摸、图形、存储和音频功能。

请使用真正支持数据传输的 USB 线缆。仅充电线可以为开发板供电，但不会提供串口或 USB 数据接口。

## 供电 { #power }

SF32LB52-DevKit-LCD 主要支持两种供电方式：

- 来自任一 USB 接口的 USB Type-C 供电
- 通过板载电池连接器进行电池供电

对于固件下载和常规调试，请使用 USB 转 UART Type-C 端口。使用电池供电时，可在不连接 USB 的情况下测试显示、音频和低功耗表现。

开发板集成了 ETA9640P 线性充电器。其最大支持充电电流为 1 A，默认恒流设置为 450 mA。请使用单节锂离子或锂聚合物电池，并在连接电池前根据开发板丝印确认极性。

## 下载与调试 { #download-and-debug }

USB 转 UART 端口是主要的固件下载和日志接口。

- **下载模式**：在下载工具中启用 BOOT 选项，然后给开发板上电或复位。
- **调试 / 日志模式**：禁用 BOOT 选项，然后上电或复位开发板，进入正常串口日志模式。

部分 SF32LB52x 开发板使用 USB 转 UART 的 RTS 信号控制复位。如果首次打开串口时开发板意外复位，请在主机串口设置中关闭调制解调器控制或硬件流控。

![在串口高级设置中关闭调制解调器控制](assets/sf32lb52x/Modem.png){ loading="lazy" }
<div align="center"><em>在串口高级设置中关闭调制解调器控制</em></div>

## LCD 与触摸接口 { #lcd-and-touch-interface }

开发板通过一个 22 针、0.5 mm 间距 FPC 连接器支持 QSPI LCD 面板。该连接器为垂直翻盖锁扣式结构。如果面板的引脚顺序不同，请在连接前使用适配板。

支持的 LCD 和触摸能力包括：

- SPI、DSPI 和 QSPI LCD 信号
- DDR 模式 QSPI LCD 信号
- 8 位 MCU/8080 LCD 信号
- LCD 复位、片选、时钟、数据、TE 和背光 PWM
- I2C 触摸面板的 SDA / SCL、中断和复位信号

思澈科技（SiFli）原始开发板说明中列出的支持显示型号为 `TFT-H043A28WQISTKN22_V0-3`。

### 22 针 QSPI FPC 信号图 { #22-pin-qspi-fpc-signal-map }

<div align="center"><em>22 针 QSPI FPC 信号图</em></div>

<div align="center" markdown>

| 引脚 | 信号 | 功能 |
| :--- | :--- | :--- |
| 1 | LEDK | LCD 背光阴极 |
| 2 | LEDA | LCD 背光阳极 |
| 3 | PA07 | MCU8080 DB0 / QSPI D2 |
| 4 | PA08 | MCU8080 DB1 / QSPI D3 |
| 5 | PA37 | MCU8080 DB2 |
| 6 | PA39 | MCU8080 DB3 |
| 7 | PA40 | MCU8080 DB4 |
| 8 | PA41 | MCU8080 DB5 |
| 9 | PA42 | MCU8080 DB6 |
| 10 | PA43 | MCU8080 DB7 |
| 11 | PA02 | MCU8080 TE / QSPI TE |
| 12 | PA00 | LCD 复位 |
| 13 | PA04 | MCU8080 WR / QSPI CLK / SPI CLK |
| 14 | PA05 | MCU8080 RD / QSPI D0 / SPI SDI |
| 15 | PA03 | MCU8080 CS / QSPI CS / SPI CS |
| 16 | PA06 | MCU8080 DC / QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V 输出 |
| 18 | PA31 | 触摸中断 |
| 19 | PA33 | 触摸 I2C SDA |
| 20 | PA30 | 触摸 I2C SCL |
| 21 | PA09 | 触摸复位 |
| 22 | GND | 接地 |

</div>

**FPC 引脚数资料存在冲突，连接显示屏前须核实：** 思澈科技（SiFli）将该连接器及信号表标为 22 针，但配套连接图将触点编号至 24，并将 22–24 针标为 GND。资料未解释这一差异。选购或连接 FPC 排线前，请核对具体板卡版本的实物连接器和原理图；不要假设 22 针排线适用于 24 针连接器。

## 关键模组引脚分配 { #key-module-pin-assignments }

![SF32LB52-DevKit-LCD 40 针排针定义](assets/sf32lb52x/SF32LB52x_DevKit-40p-define.png){ loading="lazy" }
<div align="center"><em>40 针排针定义</em></div>

<div align="center"><em>关键模组引脚分配</em></div>

<div align="center" markdown>

| 模组引脚 | 信号 | 开发板功能 |
| :--- | :--- | :--- |
| PA44 | VBUS_DET | 充电器插入检测 |
| PA43..PA37 | DB7..DB2 | MCU/8080 LCD 数据 |
| PA08..PA07 | DB1..DB0 / QSPI D3..D2 | LCD 数据 |
| PA06 | DC / QSPI D1 | LCD 数据 / 命令 |
| PA05 | RD / QSPI D0 | LCD 数据 |
| PA04 | WR / QSPI CLK | LCD 时钟 |
| PA03 | CS / QSPI CS | LCD 片选 |
| PA02 | TE / QSPI TE | LCD 防撕裂同步（TE）信号 |
| PA01 | BL_PWM | 背光控制 |
| PA00 | RSTB | LCD 复位 |
| PA33 / PA30 | I2C SDA / SCL | 触摸面板 |
| PA31 / PA09 | 触摸 INT / RST | 触摸面板 |
| PA24, PA25, PA28, PA29 | SPI1 | TF 卡接口 |
| PA26 | 卡检测 / LED | 共用功能 |
| PA20 / PA27 | UART RX/TX | 用户 UART |
| PA18 / PA19 | 调试 UART RX/TX | 下载与软件调试 |
| PA10 | AU_PA_EN | 音频功放使能 |
| MIC_ADC_IN / MIC_BIAS | 模拟麦克风 | 麦克风输入 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | 模拟音频 | 扬声器功放输入 |

</div>

## 模组兼容性说明 { #module-compatibility-notes }

- SF32LB52-MOD-1 使用第 17 号引脚作为 3.3 V 输出，默认关闭，必须通过软件启用。
- SF32LB52-MOD-A / B 使用第 17 号引脚作为 3.3 V 电源输入。
- SF32LB52-MOD-1 使用第 27 号引脚作为 3.2–4.7 V VBAT 输入。
- SF32LB52-MOD-A / B 使用第 27 号引脚作为 3.3 V 电源输入。
- 在 SF32LB52-MOD-1 上，VBAT 上电阈值为 3.58 V，断电阈值为 3.48 V。对于非电池供电测试，建议向 VBAT 提供 3.8 V。
- 模组第 62 号引脚上的 PA21 仅在 SF32LB52-MOD-A / B 上可用，在 SF32LB52-MOD-1 上未连接。
- 模组第 62 至 68 号引脚默认可能在内部连接到 NOR Flash。如需外接 SDIO，请选择这些引脚未连接内部 Flash 的模组变体。

## 音频 { #audio }

开发板集成了 MEMS 麦克风和音频功放。

- 使用板载麦克风链路验证模拟音频输入。
- 使用扬声器连接器进行音频输出测试。
- 根据原始开发板说明，外部扬声器路径在 4 Ω 负载下最高支持 3 W。

## 存储 { #storage }

MicroSD 卡座通过 SPI 连接，适合在转向自定义板之前验证文件系统、图像资源、日志和数据记录等功能。

## SDK 构建目标 { #sdk-build-targets }

使用 SiFli-SDK 编译时，可通过 `scons --board=<board_name>` 指定以下精确的板级目标名：

- `sf32lb52-lcd_52d`
- `sf32lb52-lcd_n16r8`
- `sf32lb52-lcd_a128r16`

这些名称是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 的 [`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)列出的目标集合可能不同；请按当前使用的 SDK 版本核实。

## 相关文档 { #related-documents }

[SF32LB52x 芯片介绍]: ../chips/SF32LB52x.md
[SF32LB52x 硬件设计指南]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[SF32LB52-MOD-1]: ../modules/SF32LB52-MOD-1.md
[原始 SiFli-Wiki 文章]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-DevKit-LCD.md
[设计资料包]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-DevKit-LCD_V1.2.0.zip?
[购买样品]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 芯片介绍]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南]__
- :fontawesome-solid-cubes: __[SF32LB52-MOD-1]__
- :fontawesome-brands-github: __[原始 SiFli-Wiki 文章]__
- :fontawesome-solid-download: __[设计资料包]__
- :fontawesome-solid-cart-shopping: __[购买样品]__

</div>
