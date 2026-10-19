---
icon: lucide/circuit-board
description: "SF32LB52-DevKit-ULP：面向可穿戴系统验证的 SF32LB52x 开发板，集成 AMOLED、触摸、传感器、音频、电池充电和电流测量能力。"
tags:
    - 硬件
    - 开发板
---

# SF32LB52-DevKit-ULP { #sf32lb52-devkit-ulp }

## 概览 { #overview }

SF32LB52-DevKit-ULP 也被称为 **立创黄山派**、**LCKFB-HSPI-SF32LB52-ULP** 和 **SF32LB52-ULP**。它是一块面向超低功耗可穿戴场景的紧凑型开发板，基于 SF32LB52x 家族打造，其定位更接近智能手表和手环原型平台，而不是单纯的 MCU 引出板。

与 LCD、Nano 和 Core-3p3 开发板相比，这块板的集成度更接近可穿戴产品：除 SF32LB52 模组外，还集成 AMOLED 显示屏、触摸输入、麦克风、扬声器功放、RGB LED、振动马达驱动、运动/磁场/环境光传感器、电池充电电路和电流测量跳线。因此，它不仅可用于验证 MCU 是否正常运行，也适合评估整套可穿戴系统在电池供电下的表现。

思澈科技（SiFli）的 [ULP 开发板指南][原始 SiFli-Wiki 文章]目前仍是占位页。详细板级配置以思澈科技（SiFli）的中文版[黄山派开发板指南][思澈科技黄山派指南]为准；该指南记录的是 V1.0.0，本文据此列出该版本的器件信息。另一个[立创硬件 Wiki]未注明板卡版本，且列出了若干不同的器件型号。这些差异可能与版本或资料更新状态有关，不能据此认为器件可以互换。设计前请核对具体板卡的标识、原理图和 BOM。

**发布状态说明：** 思澈科技（SiFli）的 V1.0.0 指南称，文档所述板卡当时供内部试用，后续修改后再对外发布。该说明仅对应这一版资料，不能据此确定后续板卡的状态或 BOM。请核对实物的准确板卡版本及 BOM。

思澈科技（SiFli）[SDK 板卡页面][思澈科技 SDK ULP 板卡页]将该开发板的构建目标列为 `sf32lb52-lchspi-ulp`。SDK 板卡页面和中文版黄山派指南的套件清单部分写作 `SF32LB52X-MOD-1-N16R8`，而思澈科技（SiFli）[模组型号指南][思澈科技模组型号指南]及 GPIO 表标题使用 `SF32LB52-MOD-1-N16R8`。现有资料没有解释名称中 `X` 的差异。SDK 构建目标明确；实际模组型号应以实物标识和 BOM 为准，不要仅凭这两种写法推断硬件不同。

![SF32LB52-ULP 可穿戴开发板装配参考](assets/sf32lb52x/52-ULP-1p85-install.png){ loading="lazy" }
<div align="center"><em>SF32LB52-ULP — 可穿戴开发板装配参考</em></div>

![黄山派 SF32LB52 功能框图](assets/sf32lb52x/HSP_Block_Diagram.svg){ loading="lazy" }
<div align="center"><em>黄山派 SF32LB52 — 方框图</em></div>

## 命名 { #naming }

<div align="center"><em>开发板命名别名</em></div>

<div align="center" markdown>

| 名称 | 使用场景 |
| :--- | :--- |
| SF32LB52-DevKit-ULP | 思澈科技（SiFli） / OpenSiFli 板卡家族命名 |
| SF32LB52-ULP | 简短硬件 / 产品名称 |
| LCKFB-HSPI-SF32LB52-ULP | LCKFB 项目 / 订货命名 |
| 立创黄山派 / 立创・黄山派 SF32LB52 | 中文产品与文档名称 |

</div>

搜索硬件文档、示例、购买页面或社区资料时，可将这些名称视为同一板卡家族的别名。进行原理图、引脚图或 BOM 工作时，务必确认准确的板卡版本和供应商文档集。

## 开发板亮点 { #board-highlights }

- 基于 SF32LB52-MOD-1-N16R8 模组
- SF32LB525UC6 标准模组配置
- 8 MB OPI-PSRAM，144 MHz 接口
- 128 Mb QSPI-NOR Flash，72 MHz STR 模式
- 48 MHz 主晶振和 32.768 kHz RTC 晶振
- 板载 PCBA 天线
- 1.85 英寸 AMOLED 显示屏，390 × 450 分辨率
- 带触摸支持的 Quad-SPI 显示接口
- 板载 MEMS 麦克风
- 带 Class-D 扬声器功放的模拟音频输出
- 面向 3 W / 4 Ω 或 2 W / 8 Ω 扬声器的外部扬声器接口
- 通过 CH340N 提供 USB Type-C UART 接口，用于下载、调试和供电
- 通过 30 针扩展连接器引出 USB 2.0 FS 信号
- 使用 SPI 的 MicroSD 卡槽
- 一个功能键和一个电源 / 复位键
- SK6812MINI-HS RGB LED（思澈科技（SiFli）V1.0.0 指南；未注明版本的立创页面列为 WS2812B-2020）
- 带外接马达焊盘的振动马达驱动电路
- LSM6DS3TR-C 六轴 IMU
- MMC5603NJ 三轴磁传感器
- LTR-303ALS-01 环境光传感器
- 用于可穿戴设备功耗测试的电池充电和电源管理器件
- 2 × 15 针、1.27 mm 间距扩展排针，支持 GPIO 和电流测量

## 何时使用这块开发板 { #when-to-use-this-board }

当目标是验证完整的可穿戴系统行为时，选择 SF32LB52-DevKit-ULP / 立创黄山派。

- 构建手表、手环等配有多种传感器的可穿戴产品原型
- 评估 SF32LB52x 平台上的 AMOLED UI 表现
- 联调触控、运动/磁场/环境光传感器、音频、振动马达和 RGB LED，验证各功能协同工作时的表现
- 测量睡眠和活跃状态下的电池、系统和 3.3 V 电流路径
- 验证由按键、传感器、触摸或固件定时器驱动的唤醒流程
- 将真实产品级功耗行为与更简单 DevKit 的早期估算进行对比

如果你需要一块偏显示验证的通用评估板，请使用 [SF32LB52-DevKit-LCD](SF32LB52-DevKit-LCD.md)。如果需要紧凑型贴装模组原型方案，请使用 [SF32LB52-DevKit-Nano](SF32LB52-DevKit-Nano.md)。如果在早期台架启动调试阶段需要尽可能直接的引脚访问，请使用 [SF32LB52-DevKit-Core-3p3](SF32LB52-DevKit-Core-3p3.md)。

## 硬件配置 { #hardware-configuration }

<div align="center"><em>硬件配置摘要</em></div>

<div align="center" markdown>

| 项目 | 配置 |
| :--- | :--- |
| 核心模组 | SF32LB52-MOD-1-N16R8 |
| MCU | SF32LB525UC6 |
| PSRAM | 8 MB OPI-PSRAM，接口频率 144 MHz |
| Flash | 128 Mb QSPI-NOR Flash，72 MHz STR 模式 |
| 显示 | 1.85 英寸 AMOLED（ZC-A1D85W-010），390 × 450，亮度 800 cd/m²，Quad-SPI |
| 显示驱动 | CO5300AF-01 |
| 显示电源 IC | BV6802W |
| 触摸控制器 | FT6146-M00 |
| 麦克风 | 板载 MEMS 麦克风 |
| 扬声器输出 | Class-D 功放，通过 GH-1.25 mm 连接器外接扬声器 |
| 存储 | MicroSD 卡，通过 SPI 接口连接 |
| 运动传感器 | LSM6DS3TR-C 六轴 IMU |
| 磁传感器 | MMC5603NJ 三轴磁力计 |
| 环境光传感器 | LTR-303ALS-01 |
| USB-UART | CH340N，通过 USB Type-C 连接 |
| 电池 | 锂离子电池通过 GH1.25 mm 连接器外接 |
| 充电器 | SY6103，最高充电电压 4.5 V，默认恒流设置为 450 mA，最大充电电流为 500 mA |
| 保护/电源器件 | SY5320 过压保护（OVP）、LP5240HVF 负载开关、ETA5055V330DS2F 低压差稳压器（LDO） |

</div>

**器件型号随资料/版本存在差异，设计前须核实：** 思澈科技（SiFli）V1.0.0 [黄山派开发板指南][思澈科技黄山派指南]列出的器件为 SY6103 充电器、SY5320 OVP 和 SK6812MINI-HS RGB LED。未注明版本的[立创硬件 Wiki]则列出 LP5305AQVF OVP、WS2812B-2020 RGB LED，并在特性列表中写 AW32001ECSR、在充电说明中写 AW23001ECSR。现有资料无法确认这些差异是否由板卡改版或资料未同步造成。本文仅以该指南列出的型号作为 V1.0.0 基线；采用器件专属参数进行设计前，请核对具体板卡的器件丝印、原理图和 BOM。

## 套件内容 { #package-contents }

黄山派套件文档标注包含以下内容：

- 核心板
- 屏幕板
- 电池
- 扬声器

准备评估环境前，请先确认实际购买套件的内容，因为不同卖家或不同生产批次的附件组合可能不同。

## 供电与电池 { #power-and-battery }

开发板支持两种主要供电模式：

- USB Type-C 供电
- 独立电池供电

电池输入适用于单节锂离子电池，通过 GH1.25 mm 连接器接入；连接时请遵循文档标明的线序。文档所述充电配置支持最高 500 mA 的充电电流，默认恒流设置为 450 mA。

如果不接电池、改用台式电源为 VBAT 供电，文档规定的 VBAT 输入范围为 3.7 V 至 4.7 V；常规供电测试建议使用 3.8 V。SF32LB52-MOD-1-N16R8 的电源阈值记录为：3.58 V 上电，3.48 V 断电。

立创的硬件指南提示：未接电池时，长按按键功能可能无法使用。请在对应板卡版本和实际供电配置下验证该行为。

## 电流测量跳线 { #power-measurement-jumpers }

开发板为主要电源路径提供了电流测量跳线。

<div align="center"><em>电流测量跳线分配</em></div>

<div align="center" markdown>

| 引脚 | 路径 | 用途 |
| :--- | :--- | :--- |
| 5-6 | VBAT 路径 | 在电池/充电器与后级系统之间串接电流表 |
| 7-8 | VSYS 路径 | 在 VSYS 路径中串接电流表 |
| 11-12 | VCC_3V3 路径 | 在 3.3 V 主电源轨中串接电流表 |

</div>

正常使用时，5-6、7-8 和 11-12 这些引脚必须通过跳线短接。只有在插入电流表或功耗分析仪时，才应移除相应跳线。

## 下载与调试 { #download-and-debug }

在常规开发中，使用 USB Type-C UART 接口进行固件下载、串口日志输出和开发板供电。

首次启动调试所需的硬件：

- SF32LB52-DevKit-ULP / 立创黄山派开发板
- USB 2.0 数据线
- 运行 Windows、Linux 或 macOS 的主机电脑

可选硬件：

- 外部扬声器
- TF 卡
- 450 mAh 或更大容量的锂离子电池
- 当需要同时进行 UART 调试和原生 USB 测试时，第二根 USB 数据线

请使用真正支持数据传输的 USB 线缆。仅充电线可以为开发板供电，但不会提供串口数据接口。

## SDK 构建目标 { #sdk-build-targets }

SiFli-SDK 中该板的精确构建目标名为 `sf32lb52-lchspi-ulp`；请在 `scons --board=<board_name>` 命令中使用该名称。它是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。请根据当前使用的 SDK 版本，核对思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 主分支[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)中的目标名。

## 关键信号分配 { #key-signal-assignments }

<div align="center"><em>关键信号分配</em></div>

<div align="center" markdown>

| 信号 | 功能 |
| :--- | :--- |
| PA44 | VBUS_DET，充电器插入检测 |
| PA43 | KEY2 |
| PA42 | Audio_PA_EN（音频功放使能） |
| PA41 | 触摸中断 |
| PA40 / PA39 | 传感器 I2C1 SCL / SDA（按 GPIO 分配表；排针引脚冲突见下文） |
| PA38 | VSYS 至 VSYS_1 的开关控制 |
| PA37 / PA33 | 触摸 I2C SCL / SDA |
| PA36 / PA35 | USB DM / DP |
| PA34 | HOME 按键与长按 10 s 复位 |
| PA32 | RGB LED 数据 |
| PA31 | 传感器中断 1 |
| PA30 | VSYS_1 至 HR3V3 的开关控制 |
| PA27 | SD 卡检测 |
| PA24、PA25、PA28、PA29 | SPI1 MicroSD 卡接口 |
| PA20 | 振动马达 PWM |
| PA19 / PA18 | 调试 UART TXD / RXD |
| PA11 / PA10 | 充电器 I2C0 SDA / SCL |
| MIC_BIAS / MIC_ADC_IN | 麦克风偏置电压与输入 |
| AU_DAC1P_OUT / AU_DAC1N_OUT | 模拟音频输出 |
| PA08..PA03、PA02、PA01、PA00 | QSPI 显示、TE、背光 PWM 和复位 |
| PA15..PA12、PA16、PA17 | MPI2 / SD1 信号；N16R8 模组已将其用于内部 Flash |

</div>

## 30 针扩展排针 { #30-pin-expansion-header }

30 针排针引出了电源、USB、传感器、显示相关、存储、振动、调试、按键以及充电控制信号。

<div align="center"><em>30 针扩展排针信号表</em></div>

<div align="center" markdown>

| 引脚组 | 信号 | 说明 |
| :--- | :--- | :--- |
| 1-2 | USB_VBUS_5V | 连接 USB 时为 USB 输入的 5 V；未连接 USB 时可作为 5 V 输入 |
| 3-4 | GND | 接地 |
| 5-6 | VBAT_S / VBAT | 正常工作时短接；测量 VBAT 电流时断开 |
| 7-8 | VSYS_S / VSYS | 正常工作时短接；测量 VSYS 电流时断开 |
| 9-10 | GND | 接地 |
| 11-12 | VCC_3V3_S / VCC_3V3 | 正常工作时短接；测量 3.3 V 电流时断开 |
| 13 / 15 | PA36 / PA35 | USB DM / DP |
| 14 / 16 | PB39 / PA40 | 思澈科技（SiFli）V1.0.0 排针表将其标为传感器 I2C1 SDA / SCL；14 脚与 GPIO 分配表存在冲突（见下文） |
| 17 | PA32 | RGB LED 数据，也可作为 GPIO 使用 |
| 18 | PA30 | 传感器电源控制；作为 GPIO 使用可能影响 PA39/PA40 行为 |
| 19-23 | PA29, PA24, PA28, PA25, PA27 | SPI1/SD 卡相关引脚；扩展使用会与板载 TF 卡冲突 |
| 24 | PA20 | 振动 PWM；扩展使用会与马达驱动冲突 |
| 25 / 27 | PA19 / PA18 | 调试 UART TXD / RXD |
| 26 / 28 | PA34 / PA43 | 电源/复位键和功能键 |
| 29 / 30 | PA11 / PA10 | 充电器 I2C0 SDA / SCL |

</div>

**引脚资料存在冲突，接线前须核实：** 思澈科技（SiFli）V1.0.0 的 GPIO 分配表将传感器 I2C1_SDA 映射到 PA39，而 30 针排针表将 14 脚标为 PB39/I2C1_SDA，16 脚标为 PA40/I2C1_SCL。立创资料也存在 PA39/PB39 不一致，且未注明板卡版本或解释差异。因此，排针 14 脚对应的 MCU 管脚及走线尚无法确定。连接外设前，请核对具体板卡的原理图/BOM并测量通断；不要假定 PA39 与 PB39 可以互换。

## 显示与触摸接口 { #display-and-touch-interface }

开发板采用 AMOLED 显示链路，并引出一组 22 针 QSPI FPC 信号。思澈科技（SiFli）V1.0.0 表格将第 5–10 针标为 NC；下表列出全部 22 个位置，并明确标出这些未连接的引脚。

<div align="center"><em>22 针 QSPI 显示与触摸 FPC 信号表</em></div>

<div align="center" markdown>

| 引脚 | 信号 | 功能 |
| :--- | :--- | :--- |
| 1 | VBAT | 显示侧 VBAT 输出 |
| 2 | PA01 | TFT 类显示的背光 PWM |
| 3 | PA07 | QSPI D2 |
| 4 | PA08 | QSPI D3 |
| 5 | NC | 未连接 |
| 6 | NC | 未连接 |
| 7 | NC | 未连接 |
| 8 | NC | 未连接 |
| 9 | NC | 未连接 |
| 10 | NC | 未连接 |
| 11 | PA02 | QSPI TE |
| 12 | PA00 | LCD 复位 |
| 13 | PA04 | QSPI/SPI 时钟 |
| 14 | PB05（思澈科技（SiFli）V1.0.0 FPC 表） | QSPI D0 / SPI SDI；独立的 GPIO 分配表列为 PA05 |
| 15 | PA03 | QSPI/SPI 片选 |
| 16 | PA06 | QSPI D1 / SPI DC |
| 17 | VDD_3V3 | 3.3 V 输出 |
| 18 | PA41 | 触摸中断 |
| 19 | PA33 | 触摸 I2C SDA |
| 20 | PA37 | 触摸 I2C SCL |
| 21 | PA09 | 触摸复位 |
| 22 | GND | 接地 |

</div>

**引脚资料存在冲突，连接显示屏前须核实：** 思澈科技（SiFli）V1.0.0 的 22 针 FPC 表将连接器第 14 针列为 PB05（QSPI D0），而独立的 GPIO 分配表将该信号列为 PA05。立创资料的 FPC 表也列 PB05，GPIO 表则列 PA05。两份资料均未说明模组管脚名称与连接器标注之间的对应关系。在查阅具体板卡版本的原理图/BOM或测量导通关系前，应将实际电气连接视为未确认；不要假定 PA05 与 PB05 可以互换。

## 电流测量建议 { #power-measurement-guidance }

为了得到有参考价值的超低功耗测量结果：

- 尽可能分别测量 VBAT、VSYS 和 VCC_3V3。
- 对于未在测量中的电源轨，保持对应跳线正确短接。
- 在测量睡眠电流前，关闭可避免的负载，例如 RGB LED 效果、调试日志、显示刷新和传感器轮询。
- 每次测量都记录板卡版本、固件提交、电池或供电电压、跳线配置和传感器状态。
- 同时测量稳定睡眠电流，以及触摸、传感器中断、蓝牙（Bluetooth）活动、显示唤醒和振动事件下的事件电流。

## 相关文档 { #related-documents }

[SF32LB52x 芯片介绍]: ../chips/SF32LB52x.md
[SF32LB52x 硬件设计指南]: ../../hardware/chip-guides/SF32LB52x_hardware_design_guide.md
[原始 SiFli-Wiki 文章]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-DevKit-ULP.md
[思澈科技黄山派指南]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb52x/SF32LB52-%E9%BB%84%E5%B1%B1%E6%B4%BE.md
[思澈科技 SDK ULP 板卡页]: https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/supported_boards/boards/sf32lb52-lchspi-ulp/doc/index.html
[思澈科技模组型号指南]: https://wiki.sifli.com/en/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html
[立创开源硬件平台项目页]: https://lckfb.com/project/detail/lckfb-hspi-sf32lb52-ulp?param=baseInfo
[立创硬件 Wiki]: https://wiki.lckfb.com/zh-hans/hspi-sf32lb52/hardware/board.html
[购买样品]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB52x 芯片介绍]__
- :fontawesome-solid-file-lines: __[SF32LB52x 硬件设计指南]__
- :fontawesome-brands-github: __[原始 SiFli-Wiki 文章]__
- :fontawesome-solid-up-right-from-square: __[立创开源硬件平台项目页]__
- :fontawesome-solid-book: __[立创硬件 Wiki]__
- :fontawesome-solid-cart-shopping: __[购买样品]__

</div>
