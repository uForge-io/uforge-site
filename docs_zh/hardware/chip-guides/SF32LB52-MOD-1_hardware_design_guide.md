---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB52-MOD-1 硬件设计指南：蓝牙（Bluetooth）MCU 模组的电源、接口及 PCB 集成设计指导。"
tags:
    - 硬件
    - 模组
---

# SF32LB52-MOD-1 硬件设计指南 { #sf32lb52-mod-1-hardware-design-guide }

## 1. 概述 { #1-overview }

**SF32LB52-MOD-1** 是一款经认证的通用低功耗蓝牙（Bluetooth）MCU 模组，采用思澈科技（SiFli）的 SF32LB525UC6 芯片（双核 Arm Cortex-M33 STAR-MC1，最高主频 240 MHz）。模组采用 68 引脚表面贴装封装，尺寸为 27.9 × 18.0 × 3.1 mm；集成 48 MHz 晶振，并可选配 32.768 kHz 晶振和合封的 64 Mb OPI-PSRAM 晶粒。

本指南介绍模组硬件集成所需的引脚定义、外设接口、电气特性、供电要求、参考原理图和原理图检查清单，以及模组尺寸、PCB 封装图形和存储与装配注意事项。内容基于思澈科技（SiFli）技术规格书 **DS5203-SF32LB52-MOD-1 V0.3**。

关于芯片底层架构（内核、图形、存储子系统和外设）的更多信息，请参见 [SF32LB52x](../../sf32-products/chips/SF32LB52x.md) 与 [SF32LB52x 硬件设计指南](../chip-guides/SF32LB52x_hardware_design_guide.md)。

!!! note "来源与图片处理"
    本指南的模组专属技术数据以 **DS5203-SF32LB52-MOD-1 V0.3** 为准。技术规格书中的部分引脚布局图、原理图和机械尺寸图为栅格图片，本指南采用引用而非重绘方式处理。下文图表编号使用本站指南内编号；对于未复现的图片，标题中同时标注其在官方技术规格书中的对应图号，便于对照查阅。

## 2. 快速设计概览 { #2-quick-design-summary }

### 2.1 模组型号 { #21-module-variant }

<div align="center"><em>表 2.1-1：模组型号</em></div>

<div align="center" markdown>

| 模组代码 | Flash 容量 | PSRAM 容量 | 环境温度 | 模组尺寸（mm） |
| :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | -40∼85°C | 27.9×18.0×3.1 |

</div>

### 2.2 关键规格 { #22-key-specifications }

<div align="center"><em>表 2.2-1：关键规格</em></div>

<div align="center" markdown>

| 项目 | 规格 |
| :--- | :--- |
| 应用处理器（HCPU） | Arm Cortex-M33 STAR-MC1，最高 240 MHz，512 KB SRAM |
| 低功耗处理器（LCPU） | Arm Cortex-M33 STAR-MC1，最高 24 MHz，64 KB SRAM |
| 无线连接 | 双模蓝牙 5.3，支持 BLE Audio |
| 图形显示 | ePicasso 2.0 2D/2.5D 图形引擎，最高分辨率 512×512，eZip 2.0 无损解压缩 |
| 音频 | 1× 24-bit 音频 DAC，1× 24-bit 音频 Sigma-Delta ADC |
| 存储 | 可选合封 OPI-PSRAM（144 MHz）；1 路外部 MPI（QSPI）接口；1× SD/SDIO/eMMC |
| 封装 | 68 引脚，27.9×18.0×3.1 mm |
| 供电 | VSYS 3.2~4.7 V（锂离子电池）或 3.7~4.7 V（DCDC/LDO，推荐 3.8 V） |
| 天线 | PCB 板载天线，或通过 IPEX 连接器外接天线（根据型号选配） |
| 工作温度 | -40 到 85°C |

</div>

## 3. 功能框图 { #3-functional-block-diagram }

模组集成 SF32LB525UC6 芯片、48 MHz 晶振、可选配的 32.768 kHz 晶振，以及该型号合封的 64 Mb OPI-PSRAM 晶粒；此外还包含射频匹配网络和天线馈线。

!!! info "图 3-1：功能框图"
    完整图示请参见官方技术规格书图2-1（本指南未复现该图）。

## 4. 引脚定义 { #4-pin-definition }

### 4.1 引脚布局 { #41-pinout-diagram }

模组周边共引出 68 个引脚。引脚 1 标记在靠近天线区域的一角，引脚编号沿封装逆时针排列。

!!! info "图 4.1-1：引脚布局图（顶视图）"
    完整图示请参见官方技术规格书图3-1（本指南未复现该图）。

### 4.2 引脚定义表 { #42-pin-definition-table }

模组共有 68 个引脚，具体描述如下表所示。

<div align="center"><em>表 4.2-1：引脚定义表</em></div>

<div align="center" markdown>

| 名称 | 序号 | 类型 | 默认 MUX | 默认 I/O | 功能 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| GND | 1 | P | 接地 | P | 接地 |
| PA44 | 2 | I/O/T | GPIO_A44 | O | GPIO_A44,PA44_I2C_UART,PA44_TIM,#WKUP_PIN20 |
| PA43 | 3 | I/O/T | GPIO_A43 | O | GPIO_A43,PA43_I2C_UART,PA43_TIM,LCDC1_JDI_G2, LCDC1_8080_DIO7,#WKUP_PIN19 |
| PA42 | 4 | I/O/T | GPIO_A42 | O | GPIO_A42,PA42_I2C_UART,PA42_TIM,LCDC1_JDI_R2, LCDC1_8080_DIO6,#WKUP_PIN18 |
| PA23 | 5 | I/O/T | GPIO_A23 | O | GPIO_A23,PDM1_DATA,PA23_I2C_UART,PA23_TIM, #XTAL32K_XO — 注意：模组内部有 32K 晶体时，PA23 模组外部无法使用 |
| PA22 | 6 | I/O/T | GPIO_A22 | O | GPIO_A22,PDM1_CLK,PA22_I2C_UART,PA22_TIM, #XTAL32K_XI — 注意：模组内部有 32K 晶体时，PA22 模组外部无法使用 |
| PA41 | 7 | I/O/T | GPIO_A41 | I | GPIO_A41,PA41_I2C_UART,PA41_TIM,LCDC1_JDI_HCK, LCDC1_8080_DIO5,#WKUP_PIN17 |
| PA40 | 8 | I/O/T | GPIO_A40 | O | GPIO_A40,SPI2_CS,PA40_I2C_UART,PA40_TIM, LCDC1_JDI_XRST,LCDC1_8080_DIO4,#WKUP_PIN16 |
| PA39 | 9 | I/O/T | GPIO_A39 | O | GPIO_A39,SPI2_CLK,PA39_I2C_UART,PA39_TIM, LCDC1_JDI_VCI,LCDC1_8080_DIO3,#WKUP_PIN15 |
| PA38 | 10 | I/O/T | GPIO_A38 | I/O | GPIO_A38,SPI2_DI,PA38_I2C_UART,PA38_TIM, #WKUP_PIN14 |
| PA37 | 11 | I/O/T | GPIO_A37 | I/O | GPIO_A37,SPI2_DIO,PA37_I2C_UART,PA37_TIM, LCDC1_8080_DIO2,#WKUP_PIN13 |
| PA36 | 12 | I/O/T | GPIO_A36 | O | GPIO_A36,#USB11_DM,PA36_I2C_UART,PA36_TIM,#WKUP_PIN12 |
| PA35 | 13 | I/O/T | GPIO_A35 | O | GPIO_A35,#USB11_DP,PA35_I2C_UART,PA35_TIM,#WKUP_PIN11 |
| PA34 | 14 | I/O/T | GPIO_A34 | I | GPIO_A34,PA34_I2C_UART,PA34_TIM,#GPADC_CH7,#WKUP_PIN10 |
| PA33 | 15 | I/O/T | GPIO_A33 | I | GPIO_A33,PA33_I2C_UART,PA33_TIM,#GPADC_CH6 |
| PA32 | 16 | I/O/T | GPIO_A32 | O | GPIO_A32,PA32_I2C_UART,PA32_TIM,#GPADC_CH5 |
| VDD33_VOUT2 | 17 | P | VDD33_VOUT2 | P | 3.3 V 电源输出 |
| PA24 | 18 | I/O/T | GPIO_A24 | O | GPIO_A24,SPI1_DI,I2S1_MCLK,PA24_I2C_UART,PA24_TIM, #WKUP_PIN0 |
| PA25 | 19 | I/O/T | GPIO_A25 | O | GPIO_A25,SPI1_DI,I2S1_SDO,PA25_I2C_UART,PA25_TIM, #XTAL32K_EXT,#WKUP_PIN1 |
| PA26 | 20 | I/O/T | GPIO_A26 | O | GPIO_A26,PA26_I2C_UART,PA26_TIM,#WKUP_PIN2 |
| PA27 | 21 | I/O/T | GPIO_A27 | O | GPIO_A27,PA27_I2C_UART,PA27_TIM,#WKUP_PIN3 |
| PA28 | 22 | I/O/T | GPIO_A28 | O | GPIO_A28,SPI1_CLK,I2S1_SDI,PA28_I2C_UART,PA28_TIM, #GPADC_CH1 |
| PA29 | 23 | I/O/T | GPIO_A29 | O | GPIO_A29,SPI1_CS,I2S1_BCK,PA29_I2C_UART,PA29_TIM, #GPADC_CH2 |
| PA30 | 24 | I/O/T | GPIO_A30 | O | GPIO_A30,I2S1_LRCK,PA30_I2C_UART,PA30_TIM, #GPADC_CH3 |
| PA31 | 25 | I/O/T | GPIO_A31 | I | GPIO_A31,PA31_I2C_UART,PA31_TIM,#GPADC_CH4 |
| GND | 26 | P | 接地 | P | 接地 |
| VSYS | 27 | P | VSYS | P | 锂离子电池供电时，供电范围 3.2~4.7 V；非锂离子电池供电（DCDC/LDO 等）时，供电范围 3.7~4.7 V，推荐使用 3.8 V |
| PA20 | 28 | I/O/T | GPIO_A20 | I | GPIO_A20,PA20_I2C_UART,PA20_TIM |
| PA19 | 29 | I/O/T | GPIO_A19 | O | GPIO_A19, SWCLK,PA19_I2C_UART,PA19_TIM |
| PA18 | 30 | I/O/T | GPIO_A18 | O | GPIO_A18, SWDIO,PA18_I2C_UART,PA18_TIM |
| PA11 | 31 | I/O/T | GPIO_A11 | I/O | GPIO_A11,PA11_I2C_UART,PA11_TIM |
| PA10 | 32 | I/O/T | GPIO_A10 | O | GPIO_A10,PA10_I2C_UART,PA10_TIM |
| AU_DAC1P_OUT | 33 | AO | AU_DAC1P_OUT | AO | 音频 DAC 差分输出正极 |
| AU_DAC1N_OUT | 34 | AO | AU_DAC1N_OUT | AO | 音频 DAC 差分输出负极 |
| GND | 35 | P | 接地 | P | 接地 |
| MIC_BIAS | 36 | P | MIC_BIAS | P | MIC 偏置电压 |
| MIC_ADC_IN | 37 | AI | MIC_ADC_IN | AI | 模拟音频输入 |
| PA09 | 38 | I/O/T | GPIO_A09 | I/O | GPIO_A09,PA09_I2C_UART,PA09_TIM |
| PA08 | 39 | I/O/T | GPIO_A08 | I/O | GPIO_A08, LCDC1_SPI_DIO3, PDM1_DATA,PA08_I2C_UART,PA08_TIM, LCDC1_JDI_VST, LCDC1_8080_DIO1 |
| PA07 | 40 | I/O/T | GPIO_A07 | O | GPIO_A07, LCDC1_SPI_DIO2, PDM1_CLK,PA07_I2C_UART,PA07_TIM, LCDC1_JDI_ENB, LCDC1_8080_DIO0 |
| PA06 | 41 | I/O/T | GPIO_A06 | O | GPIO_A06, LCDC1_SPI_DIO1, I2S1_LRCK,PA06_I2C_UART,PA06_TIM, LCDC1_JDI_HST, LCDC1_8080_DC |
| PA05 | 42 | I/O/T | GPIO_A05 | O | GPIO_A05, LCDC1_SPI_DIO0, I2S1_BCK,PA05_I2C_UART,PA05_TIM, LCDC1_JDI_R1, LCDC1_8080_RD |
| PA04 | 43 | I/O/T | GPIO_A04 | O | GPIO_A04, LCDC1_SPI_CLK, I2S1_SDI,PA04_I2C_UART,PA04_TIM, LCDC1_JDI_G1, LCDC1_8080_WR |
| PA03 | 44 | I/O/T | GPIO_A03 | O | GPIO_A03, LCDC1_SPI_CS, I2S1_SDO,PA03_I2C_UART,PA03_TIM, LCDC1_JDI_B1, LCDC1_8080_CS |
| PA02 | 45 | I/O/T | GPIO_A02 | O | GPIO_A02, LCDC1_SPI_TE, I2S1_MCLK,PA02_I2C_UART,PA02_TIM, LCDC1_JDI_B2, LCDC1_8080_TE |
| PA01 | 46 | I/O/T | GPIO_A01 | O | GPIO_A01,PA01_I2C_UART,PA01_TIM |
| PA00 | 47 | I/O/T | GPIO_A00 | O | GPIO_A00, LCDC1_SPI_RSTB,PA00_I2C_UART,PA00_TIM, LCDC1_8080_RSTB |
| GND | 48–60 | P | 接地 | P | 接地（共 13 个引脚） |
| VBATS | 61 | P | VBAT | P | 电池电压检测输入 |
| NC | 62 | — | NC | — | 未连接 |
| PA15 | 63 | I/O/T | GPIO_A15 | I/O | GPIO_A15, MPI2_DIO0, SD1_CMD,PA15_I2C_UART,PA15_TIM |
| PA16 | 64 | I/O/T | GPIO_A16 | O | GPIO_A16, MPI2_CLK, SD1_DIO0,PA16_I2C_UART,PA16_TIM |
| PA17 | 65 | I/O/T | GPIO_A17 | I/O | GPIO_A17, MPI2_DIO3, SD1_DIO1,PA17_I2C_UART,PA17_TIM |
| PA14 | 66 | I/O/T | GPIO_A14 | I/O | GPIO_A14, MPI2_DIO2, SD1_CLK,PA14_I2C_UART,PA14_TIM |
| PA13 | 67 | I/O/T | GPIO_A13 | I/O | GPIO_A13, MPI2_DIO1, SD1_DIO3,PA13_I2C_UART,PA13_TIM |
| PA12 | 68 | I/O/T | GPIO_A12 | O | GPIO_A12, MPI2_CS, SD1_DIO2,PA12_I2C_UART,PA12_TIM |

</div>

*注：P: 电源；I：输入；O：输出；T：可设置为高阻; AO: 音频输出；AI：音频输入。*

!!! note
    引脚 29（DBG_UART_TXD）和引脚 30（DBG_UART_RXD）是默认的日志输出、程序调试和下载接口。

### 4.3 实物引脚描述 { #43-physical-pin-description }

技术规格书图3-2按功能分组展示了 SDIO、SPI、I2C、UART、GPTIM、LCD 接口、GPADC、MPI、模拟音频、外部 32K 晶振、外部唤醒以及 SWD/调试 UART 等信号在 SF32LB525UC6 芯片轮廓上的分布。请结合上方的引脚定义表，用于规划主板上的信号分组走线。

!!! info "图 4.3-1：实物引脚描述图"
    完整图示请参见官方技术规格书图3-2（本指南未复现该图）。

## 5. 外设 { #5-peripherals }

### 5.1 通信接口 { #51-communication-interfaces }

上方引脚定义表中，功能描述含 `PAxx_I2C_UART` 的引脚均可配置为 I2C 或 UART。数据手册称最多可配置 4 路 I2C 和 3 路 UART。

!!! important "数据手册中的外设数量不一致"
    同一份数据手册在后续外设说明中又列出了 I2C1–I2C7 和 UART1–UART6，与前述最多 4 路 I2C、3 路 UART 的描述不一致。请向思澈科技（SiFli）核实具体模组/SoC 配置下实际可用的外设数量；不要将控制器编号列表直接理解为这些接口均可同时使用。

**UART** — 全双工，波特率高达 6 Mbps，可配置数据格式，支持硬件流控（CTS/RTS）与 DMA 多包收发。UART1、UART2、UART3 位于 HPSYS；UART4、UART5、UART6 位于 LPSYS。

**I2C** — 支持主机和从机模式，内置 8 字节 FIFO，并支持 DMA。支持标准模式（100 kbps）、快速模式（400 kbps）、快速模式增强版（1 Mbps）和高速模式（3.4 Mbps）；主机模式支持 7 位和 10 位寻址，并提供可配置的数字毛刺滤波。I2C1–4 位于 HPSYS，I2C5–7 位于 LPSYS。

**SPI** — 支持 SSP/SPI（全双工，可作主机或从机）和 Microwire（半双工，仅主机）两类通信格式。数据宽度为 4–32 位；时钟极性和相位（SPO/SPH）、片选极性均可配置；FIFO 深度为 32 位 × 16 个条目，收发均支持 DMA，最高时钟频率为 48 MHz。

**USB2.0 FS** — 一路全速 Host/Device 接口，符合 USB2.0 协议规范，软件可配置端点，支持挂起/恢复、FIFO 大小动态配置、会话请求协议和主机协商协议，片内集成 USB2.0 FS PHY。

**存储器外设接口（MPI）** — 支持 SPI NOR Flash（1/2/4 线）和 SPI NAND Flash（1/2/4 线），支持寄存器模式和地址映射模式，并由硬件自动切换。模组的 MPI2 接口可外接 SPI NOR/NAND Flash；若模组已内置 Flash，则 MPI2 的 6 个外部信号（PA12、PA13、PA14、PA15、PA16、PA17）无法从模组外部使用。

**SD/SDIO/eMMC** — 符合 SD 3.0、SDIO 3.0 和 eMMC 4.5.1 标准；支持 SDSC/SDHC/SDXC/SDHS 卡、SDR12/25/50，以及单线和 4 线 SDR 模式。接口内置 2 KB FIFO，支持 DMA 数据传输，最高频率为 48 MHz（不支持 DDR）。SDIO 与 MPI2 共用 IO，因此两者不能同时使用。

**I2S** — 支持主机和从机模式、全双工，以及左对齐、右对齐和标准格式；支持 8 位或 16 位单声道/立体声，PCM 位宽最高为 24 位。

**LCD 接口** — 支持 DBI 串行 SPI 模式（3 线/4 线，支持双线/四线数据线）和并行 8080 模式（8/16/24-bit 总线位宽），支持 RGB332/RGB444/RGB565/RGB666/RGB888 等色彩格式。

### 5.2 模拟信号处理 { #52-analog-signal-processing }

**12 位 GPADC** — 采用 SAR ADC，最高采样率为 4 MS/s；单端输入范围为 0–3.3 V，差分输入范围为 ±2.1 V。支持 7 路单端输入和 1 路电池电压测量（或 3 对差分输入），提供单次和连续测量模式；每次测量可配置 4 个独立时隙，并支持软件/硬件触发和 DMA。

**温度传感器** — 分辨率为 0.2°C，测量范围为 -40°C 至 125°C，精度为 ±3°C；支持轮询或中断方式读取。

**音频 DAC** — 集成 1 路 24 位 DAC 输出通道，采样率为 8–48 kHz，支持差分输出。

**音频 PLL** — 支持小数分频时钟生成，分辨率为 48 MHz/2^18；支持 48 MHz、32.768 kHz 和 44.1 kHz 等派生采样率。

**音频 ADC** — 集成 1 路 24 位 Sigma-Delta ADC 输入通道，采样率为 8–48 kHz。

## 6. 电气特性 { #6-electrical-characteristics }

### 6.1 绝对最大额定值 { #61-absolute-maximum-ratings }

超过下表给出的数值可能导致模组永久损坏。这些数值仅为应力额定值；在 §6.2 所列的建议工作条件之外，不能据此认为模组仍可正常工作。长期处于绝对最大额定值条件下还可能降低模组可靠性。

<div align="center"><em>表 6.1-1：绝对最大额定值</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: |
| VSYS | 电源引脚电压 | -0.3 | 4.7 | V |
| Tstore | 储存温度 | -40 | 125 | °C |

</div>

### 6.2 建议工作条件 { #62-recommended-operating-conditions }

<div align="center"><em>表 6.2-1：建议工作条件</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VSYS | 锂离子电池供电 | 3.2 | - | 4.7 | V |
| VSYS | 非锂离子供电（经 DCDC/LDO） | 3.7 | 3.8 | 4.7 | V |
| TA | 工作温度 | -40 | - | 85 | °C |

</div>

### 6.3 直流电气特性（3.3 V, 25°C） { #63-dc-electrical-characteristics-33v-25c }

<div align="center"><em>表 6.3-1：直流电气特性（3.3 V, 25°C）</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 引脚电容 | 2.5 | 3 | 3.5 | pF |
| VIH | 高电平输入电压 | 0.7×VDD | - | VDD | V |
| VIL | 低电平输入电压 | VSS | - | 0.3×VDD | V |
| IIH | 高电平输入电流 | - | 10 | 40 | nA |
| IIL | 低电平输入电流 | - | 10 | 40 | nA |
| VOH | 高电平输出电压（高阻负载） | 0.8×VDD | - | VDD | V |
| VOL | 低电平输出电压（高阻负载） | VSS | - | 0.2×VDD | V |
| IOH | 高电平驱动电流 | 24 | 30 | 38 | mA |
| IOL | 低电平驱动电流 | 24 | 30 | 38 | mA |
| RPU | 内部上拉电阻（Vpad=0.8×VDD） | 7 | 10 | 20 | kΩ |
| RPD | 内部下拉电阻（Vpad=0.2×VDD） | 7 | 10 | 20 | kΩ |
| VIH_nRST | 芯片复位释放电压 | 0.7×VDD | - | VDD | V |
| VIL_nRST | 芯片复位电压 | VSS | - | 0.3×VDD | V |

</div>

VDD 为 I/O 供电电源；VOH 和 VOL 均在高阻负载条件下测得。

### 6.4 功耗特性 { #64-power-consumption }

<div align="center"><em>表 6.4-1：BT 和 BLE 各状态平均电流（3.8 V 供电）</em></div>

<div align="center" markdown>

| 模式 | 间隔 | @0 dBm | @4 dBm | @10 dBm | 单位 |
| :--- | :-: | :-: | :-: | :-: | :-: |
| BT Sniff (attempt=1) | 50 ms | 129.5 | 135.6 | 160.9 | μA |
| BT Sniff (attempt=1) | 1 s | 6.0 | 6.3 | 7.6 | μA |
| BLE ADV | 50 ms | 171.6 | 217.6 | 298.3 | μA |
| BLE ADV | 1 s | 8.9 | 9.5 | 17.0 | μA |
| BLE 连接状态 | 50 ms | 95.0 | 105.0 | 118.7 | μA |
| BLE 连接状态 | 1 s | 4.1 | 4.6 | 9.1 | μA |
| Scan（Inquiry 或 Page） | — | 33.4 | — | — | μA |
| Both Scan | — | 67.3 | — | — | μA |
| Sleep | — | 20.0 | — | — | μA |

</div>

<div align="center"><em>表 6.4-2：处理器功耗（3.8 V 供电）</em></div>

<div align="center" markdown>

| 时钟频率 | 电流（μA） | 电流增量（μA/MHz） |
| :--- | :-: | :-: |
| CoreMark @192 MHz | 7360 | 35 |
| CoreMark @48 MHz | 1550 | 27 |
| WhileLoop @192 MHz | 5490 | 27 |
| WhileLoop @48 MHz | 1250 | 20 |

</div>

### 6.5 双模蓝牙射频 { #65-dual-mode-bluetooth-rf-performance }

支持蓝牙 5.3，并向下兼容 4.2/4.1/4.0。工作信道中心频率：2402–2480 MHz。

**BLE 发射机（1 Mbps 模式）**：最大发射功率 19 dBm，功率控制范围 -20~19 dBm。Δf1avg 的典型值为 250 kHz，Δf2max 的典型值为 210 kHz；它们是以 kHz 表示的频偏值（数据手册将对应项目标为“最大/最小调制”），不是无量纲的调制指数。初始载波频率容差典型值为 ±20 kHz。

**BLE 接收机（1 Mbps 模式）**：灵敏度 -100 dBm（dirty off）/ -99.3 dBm（dirty on）@30.8% PER，同信道 C/I 为 7 dB。

**经典蓝牙（Basic Data Rate）**：最大发射功率 18 dBm；接收机灵敏度 -96.3 dBm（dirty off）/ -94 dBm（dirty on）@0.1% BER。

**经典蓝牙（Enhanced Data Rate）**：最大发射功率 13 dBm；π/4-DQPSK 接收机灵敏度 -95.5 dBm；8DPSK 接收机灵敏度 -88.5 dBm。

完整的 BLE 1 Mbps/2 Mbps 和经典蓝牙 BR/EDR 收发性能表（含最小值、典型值和最大值），请参见技术规格书 §5.5。

## 7. 模组供电 { #7-module-power-supply }

模组只有一个主电源输入 **VSYS**。可由锂离子/锂聚合物电池直接供电（3.2–4.7 V），也可经 DCDC/LDO 稳压器供电（3.7–4.7 V，推荐 3.8 V）。

**VBATS** 是电池电压检测接口，内部通过 ADC 采样，输入范围 0~4.7 V。外部不可以用电阻分压，需要把待测信号直接接到 VBATS 引脚上。

**VDD33_VOUT2** 是内部 LDO 的输出，可输出 3.3 V 电源给外设供电，最大电流 150 mA；该引脚上的电容容值之和不应超过 7.4 μF。

## 8. 开发板参考原理图和引脚分配 { #8-reference-schematic-and-pin-assignment }

技术规格书提供了完整的 SF32LB52-MOD-1 开发板参考原理图，涵盖电源、复位、JTAG/SWD、UART、SDIO、LCD 和音频电路。

!!! info "图 8-1：开发板参考原理图"
    完整图示请参见官方技术规格书图7-2至图7-6（本指南未复现该图）。

技术规格书还提供了该开发板的推荐引脚分配表。

!!! info "图 8-2：开发板推荐引脚分配"
    完整图示请参见官方技术规格书图7-7（本指南未复现该图）。

可以此作为量产原理图设计的起点，并根据产品实际外设需求调整引脚选型。

## 9. 原理图设计检查清单 { #9-schematic-design-checklist }

<div align="center"><em>表 9-1：原理图设计检查清单</em></div>

<div align="center" markdown>

| 序号 | 检查点 |
| :-: | :--- |
| 1 | VSYS 可直接连接锂离子电池；若经 DCDC/LDO 供电，推荐电压为 3.8 V。VBATS 是电池电压检测引脚，输入范围为 0~4.7 V。不得使用外部电阻分压，应将待测信号直接接到 VBATS。 |
| 2 | VSYS 接口附近需要放置 1 个 4.7 μF 和 1 个 0.1 μF 电容。 |
| 3 | VBATS 接口附近需要放置 1 个 0.1 μF 电容。 |
| 4 | VDD33_VOUT2 是 3.3 V LDO 输出，最大电流 150 mA，外接负载不要超过它的输出能力。 |
| 5 | VDD33_VOUT2 上的总电容不得超过 7.4 μF。 |
| 6 | 模组的 IO 接口电平是 3.3 V，所接外设的接口电平也必须是 3.3 V。 |
| 7 | 模组内部有 32K 晶体时，PA22 和 PA23 模组外部无法使用。 |
| 8 | 若模组已内置 Flash，则 MPI2 的 6 个信号（PA12、PA13、PA14、PA15、PA16、PA17）无法从模组外部使用。 |
| 9 | SDIO 接口和 MPI2 共用 IO，两者无法同时使用。 |
| 10 | 引脚配置表中标注 `#GPADC_CHx` 的 IO 支持模拟信号输入，范围为 0~3.3 V。 |
| 11 | 引脚配置表中标注 `PAxx_TIM` 的 IO 支持 PWM 输出。 |
| 12 | PA34 支持长按 10 s 复位，高有效，设计时需要增加 10 kΩ 下拉电阻。 |
| 13 | 电池接口、触摸屏（TP）接口及其他需要保护的对外接口应预留 ESD 器件。 |
| 14 | PA18/PA19 复用为 DBG_UART、用于程序下载和调试时，建议分别串联一个 100 Ω 电阻。 |

</div>

## 10. 模组尺寸和 PCB 封装图形 { #10-module-dimensions-and-pcb-footprint }

### 10.1 模组尺寸 { #101-module-dimensions }

模组尺寸为 27.9×18.0×3.1 mm。

!!! info "图 10.1-1：模组尺寸图——顶视图、侧视图、底视图"
    完整图示请参见官方技术规格书图8-1（本指南未复现该图）。

### 10.2 推荐 PCB 封装图 { #102-recommended-pcb-footprint }

!!! info "图 10.2-1：推荐 PCB 封装图"
    完整图示请参见官方技术规格书图8-2（本指南未复现该图）。

### 10.3 外部天线连接器尺寸 { #103-external-antenna-connector }

对于支持外部天线的型号，模组采用第一代外部天线连接器，兼容：

- 广濑（Hirose）的 U.FL 系列
- I-PEX 的 MHFI 连接器
- 安费诺（Amphenol）的 AMC 连接器

!!! info "图 10.3-1：外部天线连接器尺寸图"
    完整图示请参见官方技术规格书图8-3（本指南未复现该图）。

### 10.4 PCB 设计中的模组位置摆放 { #104-module-placement-in-pcb-design }

若产品以该模组安装在底板上，应为模组 PCB 天线预留净空区域，避免天线附近出现其他器件或金属结构。布局时还应评估底板对天线效率的影响，并尽可能减小耦合和遮挡。

建议做法：

- 将模组天线区域伸出板边，馈点靠近底板板边位置。

!!! info "图 10.4-1：模组推荐摆放示意图"
    完整图示请参见官方技术规格书图8-4（本指南未复现该图）。

- 如果天线无法伸出板边，请保证给 PCB 天线一个足够大的净空区域（严禁铺铜、走线、摆放元件），建议至少 15 mm，并将 PCB 天线下方区域的底板切割掉，以尽可能减少底板板材对 PCB 天线的影响。

!!! info "图 10.4-2：模组天线区域净空示意图"
    完整图示请参见官方技术规格书图8-5（本指南未复现该图）。

- 即使采用净空区方案，馈点也应尽量靠近板边位置。
- 涉及整机设计时，应考虑外壳对天线的影响并进行 RF 验证；仍需在最终整机上测试通信距离等指标，以确认射频性能。

## 11. 储存与装配注意事项 { #11-product-handling }

### 11.1 储存条件 { #111-storage-conditions }

- 密封在防潮袋（MBB）中的产品应储存在 <40°C/90%RH 的非冷凝大气环境中。
- 模组的潮湿敏感度等级 MSL 为 3 级。
- 真空袋拆封后，在 25±5°C、60%RH 环境下，应在 168 小时内使用；超时后需先按要求烘烤，再重新上线生产。

### 11.2 静电放电（ESD） { #112-electrostatic-discharge-esd }

- 人体放电模式（HBM）：±2000 V
- 充电器件模式（CDM）：±500 V

### 11.3 回流焊温度曲线 { #113-reflow-profile }

建议模组只过一次回流焊。

!!! info "图 11.3-1：推荐回流焊温度曲线"
    完整图示请参见官方技术规格书图9-1（本指南未复现该图）。

### 11.4 超声波振动 { #114-ultrasonic-vibration }

请避免将思澈科技（SiFli）模组暴露于超声波焊接机或超声波清洗机等超声波设备的振动中。超声波设备的振动可能与模组内部的晶振产生共振，导致晶振故障甚至失灵，进而致使模组无法工作或性能退化。

## 12. 相关文档 { #12-related-documents }

- [DS5203-SF32LB52-MOD-1 技术规格书（V0.3）](https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf)
- [SF32LB52x 芯片介绍](../../sf32-products/chips/SF32LB52x.md)
- [SF32LB52x 硬件设计指南](../chip-guides/SF32LB52x_hardware_design_guide.md)
- [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)

## 13. 修订历史 { #13-revision-history }

<div align="center"><em>表 13-1：修订历史</em></div>

<div align="center" markdown>

| 日期 | 版本 | 发布说明 |
| :--- | :-: | :--- |
| 2025-09 | 0.3 | 更新了图 2-1 |
| 2025-03 | 0.2 | 修改了电源相关的描述，更新了图 3-1 以及图 6-3 |
| 2024-12 | 0.1 | 初稿 |

</div>

本指南基于以上技术规格书内容整理，请以官方 PDF 的最新版本为准。
