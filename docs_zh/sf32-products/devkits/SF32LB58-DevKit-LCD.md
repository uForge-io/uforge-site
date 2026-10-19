---
icon: lucide/circuit-board
description: "SF32LB58-DevKit-LCD：基于 SF32LB58x 的多接口开发板，可用于 MIPI DSI、RGB 和 QSPI 显示屏启动调试，以及音频、SDIO、CAN 和外设扩展验证。"
tags:
    - 硬件
    - 开发板
---

# SF32LB58-DevKit-LCD { #sf32lb58-devkit-lcd }

## 概览 { #overview }

SF32LB58-DevKit-LCD 是一块基于 SF32LB58-MOD 模组系列的开发板，适合开发使用 DSI、DPI/RGB 或 QSPI 显示接口的产品，可用于验证高分辨率 UI、音频、存储、USB 和外设集成。

板上集成 SF32LB58x 模组、多种显示连接器、模拟麦克风输入、立体声音频输出、MicroSD 卡槽、两个 USB Type-C 接口，以及面向大核和低功耗核的扩展排针；此外还提供 CAN 和 SDIO Wi‑Fi 等扩展接口。

进入定制电路板设计前，可先用这块开发板验证显示、存储、音频、USB 与外接外设的协同工作情况。

![SF32LB58-DevKit-LCD 正面图](assets/sf32lb58x/58KIT-T-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 正面图</em></div>

![SF32LB58-DevKit-LCD 背面图](assets/sf32lb58x/58KIT-B-Look.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 背面图</em></div>

![SF32LB58-DevKit-LCD 功能框图](assets/sf32lb58x/SF32LB58x_DevKit-LCD_Block_Diagram.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 方框图</em></div>

## 开发板与模组版本说明 { #board-and-module-version-notes }

<div align="center"><em>模组版本摘要</em></div>

<div align="center" markdown>

| 模组版本 | 基础配置 | 说明 |
| :--- | :--- | :--- |
| V1.0.1 | SF32LB58-MOD-N16R32N1 和 SF32LB58-MOD-A128R32N1，采用 SF32LB586VDD36 | 当前版本；调整 eMMC 电源控制：PA74 控制 VCC，PA80 控制 VCCQ；新增电阻 R0115 |
| V1.0.0 | SF32LB58-MOD-N16R32N1，采用 SF32LB586VDD36 | 模组版本说明中的初始版本记录 |

</div>

<div align="center"><em>开发板版本摘要</em></div>

<div align="center" markdown>

| 开发板版本 | 基础配置 | 说明 |
| :--- | :--- | :--- |
| V1.0.1 | 搭载 SF32LB58-MOD-N16R32N1-V1.0.1 和 SF32LB58-MOD-A128R32N1-V1.0.1 | 当前版本；新增 PB24 USB 插拔检测；将 PTC 改为 2 A / 6 V，以满足双路音频最大功率输出时的供电需求；因时序不匹配而移除 RGB LED 电平转换级；更换 DCDC 器件以降低输出纹波；移除 USB DP 上拉电阻，修复 USB 设备模式下的中断问题 |
| V1.0.0 | 搭载 SF32LB58-MOD-N16R32N1-V1.0.0，采用 SF32LB587VEE56 | 初始公开版本 |

</div>

思澈科技（SiFli）的资料对 V1.0.0 存在矛盾：模组版本说明将芯片列为 SF32LB586VDD36，而开发板版本说明称，搭载 N16R32N1-V1.0.0 模组的开发板使用 SF32LB587VEE56。确定固件目标或依赖存储配置前，请核对实物上的芯片与模组标识，并查阅对应版本的设计资料。

## 开发板亮点 { #board-highlights }

- 搭载 SF32LB58-MOD-N16R32N1 或 SF32LB58-MOD-A128R32N1 模组
- V1.0.1 使用 SF32LB586VDD36，内置两颗 16 MB HPI-PSRAM 和 1 MB QSPI-NOR；思澈科技（SiFli）资料中 V1.0.0 的芯片型号存在冲突（见上方版本说明）
- 依据模组型号提供 16 MB QSPI-NOR 或 128 MB QSPI-NAND
- 48 MHz 主晶振和 32.768 kHz RTC 晶振
- IPEX 天线座与模组射频匹配网络
- 提供 MIPI DSI / RGB888 显示连接器
- 通过两组 40 针排针提供双路 QSPI / DSPI / SPI 显示通路
- 支持 I2C 触摸面板
- 板载模拟麦克风输入与立体声 Class-D 音频输出
- 双 USB Type-C：一个用于 USB 转 UART 下载 / 调试，另一个用于 USB 2.0 HS
- 板载 MicroSD 卡槽，采用 SDIO 接口
- 通过两组 40 针排针提供大核与低功耗核 GPIO 扩展
- 支持 CAN 与 SDIO Wi‑Fi 扩展

## 何时使用这块开发板 { #when-to-use-this-board }

当项目需要验证高分辨率显示和丰富的外设链路，而非仅用于引出少量信号的简化板卡时，可选择 SF32LB58-DevKit-LCD。

- 启动调试 MIPI DSI、RGB888 或 QSPI 屏幕
- 联合验证触摸、音频、存储和 USB
- 在 SF32LB58x 平台上验证高分辨率 UI 行为
- 评估 CAN 或 SDIO Wi‑Fi 扩展
- 对比 NOR 和 NAND 模组配置
- 在开始定制 PCB 设计前先完成固件验证

如果需要进一步评估模组级集成方案，请同时参考 [SF32LB58-MOD](../modules/SF32LB58-MOD.md)。如需了解芯片家族架构以及显示和存储能力，请参见 [SF32LB58x](../chips/SF32LB58x.md)。

## 硬件配置 { #hardware-configuration }

<div align="center"><em>硬件配置摘要</em></div>

<div align="center" markdown>

| 区域 | 配置 |
| :--- | :--- |
| 核心模组 | SF32LB58-MOD-N16R32N1 或 SF32LB58-MOD-A128R32N1 |
| 按开发板版本区分的 MCU | V1.0.1：SF32LB586VDD36；V1.0.0：思澈科技（SiFli）资料存在冲突（见上方版本说明） |
| 封装内存储（V1.0.1） | 16 MB + 16 MB HPI-PSRAM，外加 1 MB QSPI-NOR |
| 额外存储 | 16 MB QSPI-NOR 或 128 MB QSPI-NAND，取决于模组型号 |
| 显示 | 支持 MIPI DSI、DPI/RGB888 和 QSPI 屏幕 |
| 音频 | 板载模拟麦克风链路和立体声音频输出 |
| USB | USB 转 UART Type-C 与 USB 2.0 HS Type-C |
| USB 转 UART 通道 | 思澈科技（SiFli）开发板型号指南列出 CH343K 提供 2 路 USB 转 UART 调试通道；详细开发板指南未说明各通道分别对应哪个 Type-C 接口 |
| 存储 | MicroSD 卡槽，采用 SDIO |
| 天线 | 模组射频通路与 IPEX 天线座 |
| 扩展 | 两组 40 针排针，适合大核与低功耗核扩展 |
| 按键与测试点 | 两个用户按键（HOME/长按复位键和功能键）、独立复位键、MODE 启动模式跳线，以及 UART/USB/CAN 测试点 |
| 电源转换 | 板载 DC-DC 转换电路；思澈科技（SiFli）V1.0.1 修订记录称更换了 DC-DC 芯片以降低输出纹波，但未列出具体型号。请依据对应版本的原理图/BOM 确认。 |
| 开发板尺寸 / 工作温度 | 65 × 50 mm / −40 至 85 °C |

</div>

## 开始使用 { #getting-started }

### 所需硬件 { #required-hardware }

- SF32LB58-DevKit-LCD 开发板
- 对应的 MIPI DSI、RGB888 或 QSPI 屏幕模组
- USB 2.0 数据线，Type-A 转 Type-C 或等效线缆
- 运行 Windows、Linux 或 macOS 的主机电脑

### 可选硬件 { #optional-hardware }

- 两个扬声器
- TF / MicroSD 卡
- J-Link 或兼容 SWD 调试器
- CAN 收发器模组
- SDIO Wi‑Fi 模组

### 基本连接步骤 { #basic-setup }

1. 将目标显示模组连接到正确的 LCD 接口。
2. 将 USB-to-UART Type-C 端口连接到主机电脑。
3. 打开思澈科技（SiFli）下载工具并选择正确的 COM 口。
4. 根据需要安装或移除 Mode 跳线帽，以选择下载模式或运行模式。
5. 给开发板上电，并下载或运行目标固件。
6. 屏幕启动调试完成后，再根据项目需要验证触摸、音频、存储和扩展外设。

请确保使用真正支持数据传输的 USB 线缆；部分 Type-C 线只能供电，无法提供 UART 或 USB 数据链路。

## 供电 { #power }

SF32LB58-DevKit-LCD 通过 USB Type-C 供电。

- 板上两个 USB Type-C 接口都可以给开发板供电
- 固件下载与串口日志请使用 USB-to-UART Type-C 端口
- 若要验证原生 USB 功能，请单独规划 USB 2.0 HS Type-C 端口的使用

## 下载与调试 { #download-and-debug }

主要的固件下载与串口日志接口是 USB-to-UART Type-C 端口。

- **下载模式**：安装 Mode 跳线帽，然后上电或复位开发板
- **软件调试 / 日志模式**：移除 Mode 跳线帽，然后上电或复位开发板

开发板也支持 J-Link / SWD 调试。

![SF32LB58-DevKit-LCD J-Link 接线参考](assets/sf32lb58x/58KIT-JLINK-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — J-Link 接线参考</em></div>

![J-Link 转接板参考](assets/sf32lb58x/58KIT-JLINK-Adapter.png){ loading="lazy" }
<div align="center"><em>J-Link 转接板参考</em></div>

![SWD 转接板参考](assets/sf32lb58x/swd-adaptor.png){ loading="lazy" }
<div align="center"><em>SWD 调试转接板参考</em></div>

## SDK 构建目标 { #sdk-build-targets }

SiFli-SDK 构建配置中列出的 58 系列开发板目标名如下；构建时将对应名称传给 `scons --board=<board_name>`：

- `sf32lb58-lcd_a128r32n1_dsi`
- `sf32lb58-lcd_a128r32n1_qspi`
- `sf32lb58-lcd_n16r32n1_dpi`
- `sf32lb58-lcd_n16r32n1_dsi`
- `sf32lb58-lcd_n16r32n1_qspi`
- `sf32lb58-lcd_n16r64n4`

这些名称是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 主分支[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)列出的 58 系列目标并不完全一致，请按当前使用的 SDK 版本核实。另请注意，当前[开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)未列出与 `sf32lb58-lcd_n16r64n4` 对应的实体 SKU。

## 关键模组与扩展信号 { #key-module-and-expansion-signals }

开发板同时引出了模组级信号和两组 40 针扩展排针。完整引脚定义请以模组数据手册和原理图为准，下表仅总结板级设计中最关键的信号组。

<div align="center"><em>关键功能信号组</em></div>

<div align="center" markdown>

| 信号组 | 典型引脚 / 信号 | 主要用途 |
| :--- | :--- | :--- |
| 下载与调试 | PB36、PB37、SWDIO、SWCLK、Boot_Mode、RSTN | UART 下载、软件调试和 SWD 启动调试 |
| MicroSD | PA75、PA76、PA77、PA70、PA81、PA79、PB58 | SDIO 卡接口与卡检测 |
| RGB LCDC1 | PA12–PA15、PA22–PA27、PA43–PA48、PA50、PA53–PA58、PA61–PA63、PA65、PA67 | RGB888 显示通路 |
| MIPI DSI LCDC1 | DSI_D0–DSI_D3 和 DSI_CLK 差分信号对 | MIPI DSI 显示通路；资料规定最多支持 2 条数据通道 |
| QSPI LCDC1 | PA82、PA84、PA86、PA88、PA90、PA91、PA51、PA52 | 大核侧 QSPI 显示通路 |
| QSPI LCDC2 | PB02–PB04、PB06、PB08–PB10、PB23、PB27、PB30、PB31、PB34 | 低功耗核侧 QSPI 显示通路 |
| 触摸 | PA16、PA17、PA59、PA60、PA92、PA93 | 触摸复位、中断与 I2C 信号 |
| 音频 | AU_DAC1/2、AU_ADC1/2、MIC_BIAS、PB23 | 模拟音频输入 / 输出与功放使能 |
| CAN / 通用扩展 | PA02、PA11 及排针 GPIO 组 | CAN 与通用外设扩展 |

</div>

## 显示接口 { #display-interfaces }

开发板支持三种主要显示路径：

- **MIPI DSI**：通过 30 针、0.5 mm 间距 FPC 连接器
- **RGB888**：通过 40 针、0.5 mm 间距 FPC 连接器，兼容常见正点原子（ALIENTEK）RGB 线序
- **QSPI / DSPI / SPI**：通过两组 40 针扩展排针引出

思澈科技（SiFli）资料列出的显示规格如下：

- MIPI DSI：最多支持 2 条数据通道，分辨率最高为 1280 × 800
- RGB888：最高支持 1280 × 800
- QSPI：最高支持 512 × 512

!!! warning "MIPI DSI 数据通道数"
    开发板的 30 针连接器定义列出了 D0–D3，但开发板指南和 SDK 资料规定最多支持 2 条数据通道。不能仅凭连接器引脚标记就认定支持 4 通道。连接屏幕前，请核对对应屏幕和开发板版本的通道接线。

![MIPI 显示连接参考](assets/sf32lb58x/58KIT-MIPI-J0202.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — MIPI 屏接线参考</em></div>

![LCDC1 QSPI 显示连接参考](assets/sf32lb58x/58KIT-LCDC1-QSPI-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 大核 QSPI 屏接线参考</em></div>

![LCDC2 QSPI 显示连接参考](assets/sf32lb58x/58KIT-LCDC2-QSPI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 低功耗核 QSPI 屏接线参考</em></div>

## 音频 { #audio }

开发板支持：

- 1 路板载麦克风输入链路
- 2 路音频 ADC 输入；其中一路与板载麦克风通路复用，可通过电阻跳线选择板载麦克风或 40 针排针输入
- 2 路扬声器输出
- 1 路 PDM 信号，但当 RGB 显示路径工作时会与 RGB 信号复用，无法同时使用

思澈科技（SiFli）的[开发板详细指南](https://wiki.sifli.com/en/board/sf32lb58x/SF32LB58-DevKit-LCD.html)将立体声模拟输出标为最高 2.8 W/4 Ω；[开发板型号指南](https://wiki.sifli.com/en/board/devkit_guide.html)则对双路扬声器输出列出 3 W/4 Ω。两份资料均未说明该数值是单路还是两路合计。选型前应结合具体板卡版本、原理图及功放供电和负载条件核实，不要将任一数值直接视为单路保证输出。

![音频连接参考](assets/sf32lb58x/58KIT-AUDIO-CONN2.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — 音频接线参考</em></div>

## CAN 与 SDIO Wi‑Fi 扩展 { #can-and-sdio-wi-fi-expansion }

底层 SF32LB58 模组内置 CAN 控制器，开发板将其引出，可配合外部 CAN 收发器使用。

![CAN 连接参考](assets/sf32lb58x/58KIT-CAN-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — CAN 接线参考</em></div>

![CAN 收发器参考板](assets/sf32lb58x/SN65HVD230-CAN-Board.png){ loading="lazy" }
<div align="center"><em>参考 CAN 收发器板</em></div>

开发板也支持通过排针接口进行 SDIO Wi‑Fi 扩展。

![SDIO Wi-Fi 模组参考图](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-LOOK.png){ loading="lazy" }
<div align="center"><em>参考 SDIO Wi‑Fi 模组</em></div>

![SDIO Wi-Fi 连接参考](assets/sf32lb58x/58KIT-SDIO-WIFI-CONN1.png){ loading="lazy" }
<div align="center"><em>SF32LB58-DevKit-LCD — SDIO Wi‑Fi 接线参考</em></div>

![SDIO Wi-Fi 参考原理图](assets/sf32lb58x/ATK-RTL8189-SDIO-WIFI-SCH.png){ loading="lazy" }
<div align="center"><em>参考 SDIO Wi‑Fi 原理图</em></div>

## 相关文档 { #related-documents }

[SF32LB58x 芯片介绍]: ../chips/SF32LB58x.md
[SF32LB58x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58-MOD]: ../modules/SF32LB58-MOD.md
[SF32LB58-MOD 设计资料包]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-MOD-V1.0.1.zip?
[SF32LB58-DevKit-LCD 设计资料包]: https://downloads.sifli.com/hardware/files/documentation/SF32LB58-DevKit-LCD-V1.0.1.zip?
[SF32LB58-DevKit-LCD 立创 EDA 项目]: https://downloads.sifli.com/hardware/files/documentation/ProPrj_SF32LB58-DevKit-LCD_2025-09-24.epro?
[购买样品]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-microchip: __[SF32LB58x 芯片介绍]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 用户手册]__
- :fontawesome-solid-cubes: __[SF32LB58-MOD]__
- :fontawesome-solid-download: __[SF32LB58-MOD 设计资料包]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD 设计资料包]__
- :fontawesome-solid-download: __[SF32LB58-DevKit-LCD 立创 EDA 项目]__
- :fontawesome-solid-cart-shopping: __[购买样品]__

</div>
