---
icon: lucide/circuit-board
description: "SF32LB56-DevKit-LCD 开发板：基于 SF32LB56xV 模组的显示、音频、存储和外设开发平台。"
tags:
    - 硬件
    - 开发板
    - SF32LB56
---

# SF32LB56-DevKit-LCD { #sf32lb56-devkit-lcd }

SF32LB56-DevKit-LCD 是一块面向显示应用的开发板，可选配 SF32LB56-MOD-N16R12N1 或 SF32LB56-MOD-A128R12N1 模组，两种模组均采用 SF32LB56xV 系列器件。可在设计自定义 SF32LB56x 电路板前，用它评估显示接口、音频、可移动存储和外设驱动。

## 适用场景 { #what-it-is-best-for }

- 使用 MIPI-DPI（RGB）、SPI、DSPI、QSPI 或 8 位 MCU/8080 接口的显示应用。
- 通过 I2C 集成触摸屏。
- 使用模拟麦克风输入和经板载 Class-D 功率放大器驱动的模拟音频输出进行实验。
- SDIO/TF 卡存储和通用外设驱动开发。
- 在确定载板设计前，评估基于 SF32LB56 模组的产品架构。

## 板级资源 { #board-resources }

<div align="center"><em>表：SF32LB56-DevKit-LCD 资源</em></div>

<div align="center" markdown>

| 资源 | 板级实现 | 实际用途 |
|:-----|:---------|:---------|
| N16R12N1 配置 | SF32LB56-DevKit-LCD-N16R12N1 / SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR、4 + 8 MB OPI-PSRAM 和 1 MB QSPI-NOR；用于基于模组的评估和载板规划。 |
| A128R12N1 配置 | SF32LB56-DevKit-LCD-A128R12N1 / SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND、4 + 8 MB OPI-PSRAM 和 1 MB QSPI-NOR；用于基于模组的评估和载板规划。 |
| 板卡尺寸与温度 | 65 mm × 38 mm；型号指南标注的工作温度为 -40 °C 至 85 °C | 机构设计和环境条件评估。 |
| 显示 | 24 位 MIPI-DPI RGB 信号通过 40 针、0.5 mm 间距 FPC 连接器引出，采用正点原子线序；40 针（2 × 20）排针引出 SPI/DSPI/QSPI 和 8 位 MCU/8080 信号 | 面板启动调试和显示驱动开发。 |
| 触摸 | 支持 I2C 触摸屏 | 交互式显示原型。 |
| 音频 | 1 路模拟 MEMS 麦克风输入和 1 路板载 Class-D 功放；型号指南标注扬声器输出最高 3 W / 4 Ω | 录音和本地播放测试；请核对扬声器负载及板卡版本。 |
| 存储 | 通过 SDIO 的 MicroSD 卡槽 | 媒体、日志、文件系统和资源测试。 |
| USB 与供电 | 2 个 USB Type-C 连接器：一个用于 USB 转 UART（型号指南标为 CH343K），另一个用于 USB 2.0 FS；两个接口均可为开发板供电 | 串口日志、下载/调试、USB 评估和台架供电。 |
| 电源转换 | 板载 3.3 V 和 1.8 V 电源转换芯片 | 增加负载前，请根据原理图核对电源轨要求。 |
| 调试与启动 | 4 针、2.54 mm 间距单排 SWD 接口；Mode 启动跳线；电源键、功能键和复位键各 1 个 | 固件下载、SWD 调试和启动模式选择。 |
| 指示灯 | RGB LED、GPIO 控制 LED 和电源指示灯 | 验证固件状态和供电状态。 |
| RF | 默认板载天线；通过 0 Ω 选项选择 IPEX | 结合模组配置进行天线和外壳评估。 |

</div>

**资料说明，选型前请核对板卡版本：** 思澈科技（SiFli）的详细开发板指南明确记载，该指南所述开发板搭载 `SF32LB56-MOD-A128R12N1` 模组，其中合封 OPI-PSRAM 为 4 MB + 8 MB，QSPI-NAND 为 1 Gb；同时注明这些存储参数可能在正式发布前调整。当前开发板型号指南列出 N16R12N1 和 A128R12N1 两种型号，均配备 4 + 8 MB OPI-PSRAM 和 1 MB 标准 QSPI-NOR。对于 A128R12N1，型号指南所列 128 MB QSPI-NAND 与详细指南中的 1 Gb 容量相当，因此两份资料对该型号的 PSRAM 和主 NAND 容量并不矛盾。不过，详细指南未提及这 1 MB 标准 NOR，也不能证明所有板卡或版本都搭载相同 SKU。型号指南称 CH343K 提供 2 路 USB 转 UART 调试通道；详细指南则将两个 Type-C 接口分别描述为 USB 转 UART 和 USB 2.0 FS，但没有说明各 UART 通道与连接器的对应关系。依赖特定 UART 通道前，请查阅对应版本的原理图/BOM。将某块板作为产品基线前，请核对模组丝印及对应版本的原理图/BOM。

**USB 转 UART 芯片标记存在差异，选用前请核实：** 详细开发板指南的功能框图将该芯片标为 CH342K，而型号指南标为 CH343K。请根据对应版本的原理图/BOM确认实装器件。

**照片与正文中的模组型号不一致，选型前须核实：** 详细指南正文称所述开发板搭载 `SF32LB56-MOD-A128R12N1`，但标注的正面照片将模组标为 `SF32LB56-MOD-N16R12N1`。思澈科技（SiFli）未说明照片是否展示了另一种型号或版本。请核对实物模组标识和板卡 BOM；不要仅凭正文或照片判断实际 SKU。

## 烧录与调试 { #programming-and-debug }

进入下载模式前，先插上 Mode 跳线，再给开发板上电或复位；运行用户程序并输出串口日志时，移除该跳线。使用支持数据传输的 USB 线将主机连接到用于 USB 转 UART 的 Type-C 接口。另一个 USB 2.0 FS Type-C 接口可用于原生 USB 测试。开发板还提供 4 针、2.54 mm 间距的单排 SWD 接口，可连接兼容的调试器。两个 Type-C 接口均可为开发板供电；具体供电连接方式请遵循开发板指南和对应原理图。

## SDK 构建目标 { #sdk-build-targets }

使用 SiFli-SDK 编译时，可通过 `scons --board=<board_name>` 指定以下精确的板级目标名：

- `sf32lb56-lcd_a128r12n1`
- `sf32lb56-lcd_n16r12n1`

这些名称是 SDK 构建目标标识，不一定等同于开发板或模组上的产品型号。思澈科技（SiFli）的[开发板支持索引](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)与 SDK 主分支[`build_config_gcc.yaml`](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)列出的目标可能不同；请按当前使用的 SDK 版本核实。

## 首次验证路径 { #first-validation-path }

1. 将兼容的 24 位 MIPI-DPI 显示屏连接到 40 针 FPC 接口，并使用支持数据传输的 USB 线连接用于 USB 转 UART 的 Type-C 接口。
2. 按照[入门指南](../../getting-started/index.md)建立已知可用的构建、烧录和串口日志基线。
3. 在调试 UI 框架前，先启动调试纯色显示图案；参阅[图形概览](../../learn/graphics/overview.md)。
4. 每次只增加触摸、存储、音频或无线中的一个子系统，再测试系统共存表现和功耗情况。
5. 在开始自定义设计前，审阅[SF32LB56-MOD](../modules/SF32LB56-MOD.md)和[面向量产的设计](../../hardware/design-for-production.md)。

## 参考资料 { #reference }

思澈科技（SiFli）的[开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)列出了可选开发板/模组型号；详细的[SF32LB56-DevKit-LCD 开发板使用指南](https://wiki.sifli.com/board/sf32lb56x/SF32LB56-DevKit-LCD.html)则提供 GPIO 分配、排针和接口定义、供电说明以及烧录与调试流程。
