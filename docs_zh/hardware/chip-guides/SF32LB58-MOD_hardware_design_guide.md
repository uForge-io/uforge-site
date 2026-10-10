---
icon: lucide/book-check
hide:
    - navigation
description: "SF32LB58-MOD 硬件设计指南：低功耗蓝牙（Bluetooth）MCU 模组的电源、接口及 PCB 集成设计指导。"
tags:
    - 硬件
    - 模组
---

# SF32LB58-MOD 硬件设计指南 { #sf32lb58-mod-hardware-design-guide }

## 1. 概述 { #1-overview }

**SF32LB58-MOD** 是一款通用型低功耗蓝牙（Bluetooth）MCU 模组，采用思澈科技（SiFli）SF32LB586VDD36 芯片，搭载三核 Arm Cortex-M33 STAR-MC1 处理器，最高工作频率为 240 MHz。模组内置 48 MHz 晶振，并可选配 32.768 kHz 晶振；不同型号还可配置 HPI-PSRAM、QSPI-NOR/NAND Flash 或 eMMC 存储。该表面贴装模组共有 138 个管脚，尺寸为 24 × 24 × 3.1 mm。

本指南涵盖模组级硬件集成的各个方面：管脚定义、外设接口、电气特性、供电要求、参考原理图、原理图设计检查清单、模组尺寸和 PCB 封装图形，以及产品处理要求。内容基于思澈科技（SiFli）技术规格书 **DS5802-SF32LB58-MOD V0.1**。

关于底层芯片架构（内核、图形、存储子系统与外设的更多细节），请参见 [SF32LB58x](../../sf32-products/chips/SF32LB58x.md) 与 [SF32LB58x 硬件设计指南](../chip-guides/SF32LB58x_hardware_design_guide.md)。

!!! note "来源与图片处理"
    本指南的模组专属技术数据以 **DS5802-SF32LB58-MOD V0.1** 为准。技术规格书中的部分管脚布局图、原理图和机械尺寸图为栅格图像，本指南采用引用而非重绘方式处理。下文图表编号使用本站指南内编号；对于未复现的图片，标题中同时标注其在官方技术规格书中的对应图号，便于对照查阅。

## 2. 快速设计概览 { #2-quick-design-summary }

### 2.1 模组型号 { #21-module-variants }

<div align="center"><em>表 2.1-1：模组型号</em></div>

<div align="center" markdown>

| 模组代码 | Flash 容量 | PSRAM 容量 | 标准 Flash 容量 | 环境温度 | 模组尺寸（mm） |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40∼85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40∼85°C | 24 × 24 × 3.1 |
| SF32LB58-MOD-E4R32N1 | 4GB eMMC | 16+16 MB HPI-PSRAM | 1 MB QSPI-NOR | -40∼85°C | 24 × 24 × 3.1 |

</div>

### 2.2 关键规格 { #22-key-specifications }

<div align="center"><em>表 2.2-1：关键规格</em></div>

<div align="center" markdown>

| 项目 | 规格 |
| :--- | :--- |
| 性能处理器（HCPU/ACPU） | 2× Arm Cortex-M33 STAR-MC1，最高 240 MHz |
| 低功耗处理器（LCPU） | Arm Cortex-M33 STAR-MC1，最高 96 MHz |
| SRAM | 2176 KB（HCPU）+512 KB（ACPU）+1056 KB Retention SRAM（LCPU） |
| 无线连接 | 双模蓝牙 5.3，向下兼容 4.2/4.1/4.0，支持低功耗蓝牙和经典蓝牙 |
| 图形显示 | ePicasso 2.0 + Vivante GCNanoUltraV，最大解析度 1024×1024，eZip 2.0，JPEG 硬件编解码 |
| 音频 | 2× 24-bit 音频 DAC，2× 24-bit 音频 Sigma-Delta ADC |
| 存储 | 5× MPI（合封+外挂），2× SD/SDIO/eMMC |
| 封装 | 138 管脚，24 × 24 × 3.1 mm |
| 供电 | VDD_3V3（2.97~3.6 V）、VDD_1V8（1.7~1.95 V）、VDDIOA/VDDIOA2/VDDIOB（1.7~3.6 V） |
| 天线 | 通过邮票孔 RF 馈点或 IPEX 兼容连接器外接天线（根据型号选配） |
| 工作温度 | -40 到 85°C |

</div>

## 3. 功能框图 { #3-functional-block-diagram }

模组集成了 SF32LB586VDD36 芯片、48 MHz 晶振、可选配的 32.768 kHz 晶振，以及（根据型号）合封的 HPI-PSRAM、QSPI-NOR/NAND Flash 或 eMMC，配合射频匹配网络和天线馈线。

!!! info "图 3-1：功能框图"
    完整图示请参见官方技术规格书图2-1（本指南未复现该图）。

## 4. 管脚定义 { #4-pin-definition }

### 4.1 管脚布局 { #41-pinout-diagram }

模组周边共引出 138 个管脚。

!!! info "图 4-1：管脚布局图（顶视图）"
    完整图示请参见官方技术规格书图3-1（本指南未复现该图）。

### 4.2 管脚定义表 { #42-pin-definition-table }

模组共有 138 个管脚，具体描述如下表所示。

<div align="center"><em>表 4.2-1：管脚定义表</em></div>

<div align="center" markdown>

| 名称 | 序号 | 类型 | 默认 MUX | 默认类型 | 功能 |
| :--- | :-: | :-: | :--- | :-: | :--- |
| VDDIOB | 1 | P | 1.8/3.3 V | P | PB 接口 IO 电源输入 |
| PB36 | 2 | I/O/T | USART4_RXD | I | GPIO_B36, USART4_RXD, GPTIM3_CH1, #GPADC_CH4 |
| PB37 | 3 | I/O/T | USART4_TXD | O | GPIO_B37, USART4_TXD, GPTIM3_CH2,#GPADC_CH5 |
| PB54 | 4 | I/O/T | GPIO_B54 | I | GPIO_B54, #WKUP_PIN0 |
| PA75 | 5 | I/O/T | GPIO_A75 | I/O | GPIO_A75, SD2_DIO1, SPI2_DI |
| PA76 | 6 | I/O/T | GPIO_A76 | I/O | GPIO_A76, SD2_DIO0, SPI2_DO |
| PA77 | 7 | I/O/T | GPIO_A77 | I/O | GPIO_A77, SD2_CLK, SPI2_CLK |
| PA70 | 8 | I/O/T | GPIO_A70 | I/O | GPIO_A70, SD2_CMD, SPI2_CS |
| PA81 | 9 | I/O/T | GPIO_A81 | I/O | GPIO_A81, SD2_DIO3 |
| PA79 | 10 | I/O/T | GPIO_A79 | I/O | GPIO_A79, SD2_DIO2 |
| BOOT_MODE | 11 | I | BOOT_MODE | I | 1：下载模式；0：用户模式 |
| RSTN | 12 | I | RSTN | I | 1：用户模式；0：复位模式 |
| VDD_1V8 | 13 | P | 1.8 V | P | MCU 主电源、合封存储器等电源输入 |
| GND | 14 | P | 接地 | P | 接地 |
| VDDIOA | 15 | P | 1.8/3.3 V | P | PA 接口 IO 电源输入，除 PA00~PA11 |
| VDD_3V3 | 16 | P | 3.3 V | P | MCU 模拟等电源输入 |
| PA13 | 17 | I/O/T | GPIO_A13 | O | GPIO_A13, GPTIM1_CH2, ATIM1_BKIN, LCDC1_DPI_DE |
| PA15 | 18 | I/O/T | GPIO_A15 | O | GPIO_A15, GPTIM1_CH3, ATIM1_BKIN2, LCDC1_DPI_VSYNC |
| PA14 | 19 | I/O/T | GPIO_A14 | O | GPIO_A14, I2S1_LRCK,LCDC1_DPI_HSYNC |
| PA12 | 20 | I/O/T | GPIO_A12 | O | GPIO_A12, GPTIM1_CH1, ATIM1_CH4,LCDC1_DPI_CLK |
| PA67 | 21 | I/O/T | GPIO_A67 | O | GPIO_A67, #WKUP_PIN9, GPTIM2_CH3, ATIM1_CH1N, LCDC1_DPI_B7, LCDC1_JDI_B2 |
| PA65 | 22 | I/O/T | GPIO_A65 | O | GPIO_A65, #WKUP_PIN7, GPTIM2_CH2, ATIM1_CH1, LCDC1_DPI_B6, LCDC1_JDI_B1 |
| PA63 | 23 | I/O/T | GPIO_A63 | O | GPIO_A63, I2C2_SDA, USART1_CTS, #GPCOMP_N, LCDC1_DPI_B5 |
| PA62 | 24 | I/O/T | GPIO_A62 | O | GPIO_A62, I2C2_SCL, USART1_RTS, #GPCOMP_P, LCDC1_DPI_B4 |
| PA61 | 25 | I/O/T | GPIO_A61 | I | GPIO_A61, SPI1_CS, USART2_TXD, LCDC1_DPI_B3 |
| PA58 | 26 | I/O/T | GPIO_A58 | I | GPIO_A58, LPTIM1_ETR, GPTIM2_CH1, ATIM2_ETR, LCDC1_8080_DIO7, LCDC1_DPI_B2 |
| PA57 | 27 | I/O/T | GPIO_A57 | I | GPIO_A57, SPI1_DI, USART2_RXD, LCDC1_DPI_B1 |
| PA56 | 28 | I/O/T | GPIO_A56 | I | GPIO_A56, SPI1_CLK, USART2_CTS, LCDC1_DPI_B0 |
| PA55 | 29 | I/O/T | GPIO_A55 | O | GPIO_A55, GPTIM1_CH4, ATIM2_BKIN2, LCDC1_DPI_G7 |
| PA54 | 30 | I/O/T | GPIO_A54 | O | GPIO_A54, SPI1_DO, SPI1_DIO, USART2_RTS, LCDC1_DPI_G6 |
| PA53 | 31 | I/O/T | GPIO_A53 | I/O | GPIO_A53, LCDC1_DPI_G5 |
| PA50 | 32 | I/O/T | GPIO_A50 | O | GPIO_A50, MPI3_DIO0, LCDC1_8080_RD, LCDC1_SPI_DIO0, LCDC1_DPI_G4, LCDC1_JDI_G2 |
| PA48 | 33 | I/O/T | GPIO_A48 | O | GPIO_A48, MPI3_DIO1, LCDC1_8080_DC, LCDC1_SPI_DIO1, LCDC1_DPI_G3, LCDC1_JDI_G1 |
| PA47 | 34 | I/O/T | GPIO_A47 | O | GPIO_A47, MPI3_DIO2, LCDC1_8080_DIO0, LCDC1_SPI_DIO2, LCDC1_DPI_G2, LCDC1_JDI_R2 |
| PA46 | 35 | I/O/T | GPIO_A46 | O | GPIO_A46, MPI3_CLK, LCDC1_8080_WR, LCDC1_SPI_CLK, LCDC1_DPI_G1, LCDC1_JDI_R1 |
| PA45 | 36 | I/O/T | GPIO_A45 | O | GPIO_A45, MPI3_DIO3, LCDC1_8080_DIO1, LCDC1_SPI_DIO3, LCDC1_DPI_G0, LCDC1_JDI_ENB |
| PA44 | 37 | I/O/T | GPIO_A44 | O | GPIO_A44, MPI3_CS, LCDC1_8080_CS, LCDC1_SPI_CS, LCDC1_DPI_R7, LCDC1_JDI_HST |
| PA43 | 38 | I/O/T | GPIO_A43 | I/O | GPIO_A43, LCDC1_8080_TE, LCDC1_SPI_TE, LCDC1_DPI_R6, LCDC1_JDI_HCK |
| PA27 | 39 | I/O/T | GPIO_A27 | I/O | GPIO_A27, SCI_DIO, GPTIM2_CH3, ATIM2_CH2N, LCDC1_8080_DIO3, LCDC1_DPI_R5, LCDC1_JDI_XRST |
| PA26 | 40 | I/O/T | GPIO_A26 | O | GPIO_A26, SCI_CLK, GPTIM2_CH2, ATIM2_CH2, LCDC1_8080_DIO2, LCDC1_DPI_R4 |
| PA25 | 41 | I/O/T | GPIO_A25 | O | GPIO_A25, PDM2_CLK, SD1_CLKIN, GPTIM2_CH1, ATIM2_CH1N, LCDC1_DPI_R3, LCDC1_JDI_XRST |
| PA24 | 42 | I/O/T | GPIO_A24 | O | GPIO_A24, LCDC1_8080_RSTB, LCDC1_SPI_RSTB, LCDC1_DPI_R2 |
| PA23 | 43 | I/O/T | GPIO_A23 | O | GPIO_A23, PDM1_CLK, I2S1_BCK, USART2_CTS, I2C2_SDA, LCDC1_DPI_R1 |
| PA22 | 44 | I/O/T | GPIO_A22 | O | GPIO_A22, PDM2_DATA, GPTIM1_ETR, ATIM2_CH1, LCDC1_DPI_R0, LCDC1_JDI_VST |
| VDDIOA2 | 45 | P | 1.8/3.3 V | P | PA00~PA11 的 IO 电源输入 |
| GND | 46 | P | 接地 | P | 接地 |
| DSI_D0N | 47 | O | DSI_D0N | O | MIPI DSI 数据通道 0 负极 |
| DSI_D0P | 48 | O | DSI_D0P | P | MIPI DSI 数据通道 0 正极 |
| DSI_CLKN | 49 | O | DSI_CLKN | P | MIPI DSI 时钟通道负极 |
| DSI_CLKP | 50 | O | DSI_CLKP | P | MIPI DSI 时钟通道正极 |
| DSI_D1N | 51 | O | DSI_D1N | P | MIPI DSI 数据通道 1 负极 |
| DSI_D1P | 52 | O | DSI_D1P | P | MIPI DSI 数据通道 1 正极 |
| PA32 | 53 | I/O/T | USART1_RXD | I | GPIO_A32, USART1_RXD, I2C3_SDA |
| PA31 | 54 | I/O/T | USART1_TXD | O | GPIO_A31, USART1_TXD, I2C3_SCL |
| USB2_DN | 55 | I/O | USB2_DN | I/O | USB 差分信号负极 |
| USB2_DP | 56 | I/O | USB2_DP | I/O | USB 差分信号正极 |
| PA17 | 57 | I/O/T | GPIO_A17 | I/O | GPIO_A17, I2C1_SCL, USART2_RXD |
| PA16 | 58 | I/O/T | GPIO_A16 | I/O | GPIO_A16, I2C1_SDA, USART2_TXD |
| PA00 | 59 | I/O/T | GPIO_A00 | I/O | GPIO_A00, SD1_DIO7, CAN1_TXD, I2C1_SCL, ATIM1_CH1, USART3_RXD |
| PA03 | 60 | I/O/T | GPIO_A03 | I/O | GPIO_A03, SD1_DIO5, CAN1_RXD, I2C1_SDA, ATIM1_CH2, USART3_TXD |
| PB17 | 61 | I/O/T | GPIO_B17 | I/O | GPIO_B17, USART5_RXD, SPI3_CLK |
| PB18 | 62 | I/O/T | GPIO_B18 | I/O | GPIO_B18, USART5_TXD, SPI3_DI |
| PB11 | 63 | I/O/T | SWDIO | I/O | SWDIO, GPIO_B11, USART4_TXD, GPTIM5_CH4 |
| PB07 | 64 | I/O/T | SWCLK | O | SWCLK, GPIO_B07, USART4_RXD, GPTIM4_CH4 |
| GND | 65 | P | 接地 | P | 接地 |
| AU_DAC1N_OUT | 66 | AO | AU_DAC1N_OUT | AO | 音频 DAC1 差分输出负极 |
| AU_DAC1P_OUT | 67 | AO | AU_DAC1P_OUT | AO | 音频 DAC1 差分输出正极 |
| MIC_BIAS | 68 | P | MIC_BIAS | P | MIC 偏置电压 |
| AU_ADC1N_IN | 69 | AI | AU_ADC1N_IN | AI | 音频 ADC1 差分输入负极 |
| AU_ADC1P_IN | 70 | AI | AU_ADC1P_IN | AI | 音频 ADC1 差分输入正极 |
| GND | 71 | P | 接地 | P | 接地 |
| BT_ANT | 72 | I/O | BT_ANT | I/O | 蓝牙射频信号输入输出 |
| PB51 | 73 | I/O/T | GPIO_B51 | I/O | GPIO_B51, PMIC_SDA, USART4_CTS, USART5_CTS, LPCOMP1_OUT |
| PB52 | 74 | I/O/T | GPIO_B52 | I/O | GPIO_B52, PMIC_SCLK, USART4_RTS, USART5_RTS, LPCOMP2_OUT |
| PB56 | 75 | I/O/T | GPIO_B56 | I/O | GPIO_B56, USART4_CTS, SPI3_CLK, #WKUP_PIN2 |
| PB57 | 76 | I/O/T | GPIO_B57 | I/O | GPIO_B57, USART4_RTS, SPI3_DO, SPI3_DIO, #WKUP_PIN3 |
| PB58 | 77 | I/O/T | GPIO_B58 | I/O | GPIO_B58, USART6_RXD, SPI3_DI, #WKUP_PIN4 |
| PB59 | 78 | I/O/T | GPIO_B59 | I/O | GPIO_B59, USART6_TXD, SPI3_CS, #WKUP_PIN5 |
| PA93 | 79 | I/O/T | GPIO_A93 | I/O | GPIO_A93, I2C3_SDA, USART3_TXD, USART3_RTS |
| PA92 | 80 | I/O/T | GPIO_A92 | I/O | GPIO_A92, I2C3_SCL, USART3_RXD, USART3_CTS |
| PA91 | 81 | I/O/T | GPIO_A91 | I/O | GPIO_A91, I2S2_BCK, GPTIM1_ETR, ATIM2_CH2N, LCDC1_SPI_DIO0, LCDC1_8080_RD, LCDC1_JDI_EXTCOMIN |
| PA90 | 82 | I/O/T | GPIO_A90 | I/O | GPIO_A90, I2S2_MCLK, GPTIM1_CH4, ATIM2_CH2, LCDC1_SPI_CLK, LCDC1_8080_WR, LCDC1_JDI_DISP |
| PA88 | 83 | I/O/T | GPIO_A88 | I/O | GPIO_A88, LCDC1_SPI_CS, LCDC1_8080_CS |
| PA86 | 84 | I/O/T | GPIO_A86 | I/O | GPIO_A86, I2S2_SDI, GPTIM1_CH3, ATIM2_CH1N, LCDC1_SPI_DIO3, LCDC1_8080_DIO1, LCDC1_JDI_SO |
| PA84 | 85 | I/O/T | GPIO_A84 | I/O | GPIO_A84, I2S2_LRCK, GPTIM1_CH2, ATIM2_CH1, LCDC1_SPI_DIO2, LCDC1_8080_DIO0, LCDC1_JDI_SCLK |
| PA82 | 86 | I/O/T | GPIO_A82 | I/O | GPIO_A82, I2S2_SDO, GPTIM1_CH1, ATIM1_CH3N, LCDC1_SPI_DIO1, LCDC1_8080_DC, LCDC1_JDI_SCS |
| PA60 | 87 | I/O/T | GPIO_A60 | I/O | GPIO_A60, I2C4_SCL, USART1_RXD, USART3_CTS |
| PA59 | 88 | I/O/T | GPIO_A59 | I/O | GPIO_A59, I2C4_SDA, USART1_TXD, USART3_RTS |
| PA52 | 89 | I/O/T | SWDIO | I/O | SWDIO, GPIO_A52, GPTIM1_CH3, ATIM2_BKIN, LCDC1_8080_DIO6 |
| PA51 | 90 | I/O/T | SWCLK | O | SWCLK, GPIO_A51, GPTIM1_CH2, ATIM2_CH4, LCDC1_8080_DIO5 |
| PA42 | 91 | I/O/T | GPIO_A42 | I/O | GPIO_A42, GPTIM2_CH4, ATIM2_CH3, LCDC1_8080_DIO4 |
| PA20 | 92 | I/O/T | GPIO_A20 | I/O | GPIO_A20, USART3_RXD, SPI1_DI, USART2_CTS |
| PA21 | 93 | I/O/T | GPIO_A21 | I/O | GPIO_A21, USART3_TXD, SPI1_DO, USART2_RTS |
| PA29 | 94 | I/O/T | GPIO_A29 | I/O | GPIO_A29, USART2_RXD, SPI1_CS, I2C2_SDA |
| PA28 | 95 | I/O/T | GPIO_A28 | I/O | GPIO_A28, USART2_TXD, SPI1_CLK, I2C2_SCL |
| PA18 | 96 | I/O/T | GPIO_A18 | I/O | GPIO_A18, PDM1_DATA, I2S1_SDI, USART2_RTS, I2C2_SCL, LCDC1_DPI_SD |
| PA02 | 97 | I/O/T | GPIO_A02 | I/O | GPIO_A02, SD1_CLKIN, CAN2_RXD, ATIM1_CH1N, USART3_RXD |
| PA11 | 98 | I/O/T | GPIO_A11 | I/O | GPIO_A11, SCI_RST, CAN2_TXD, I2C1_SDA, ATIM1_CH3N, USART3_TXD |
| PA08 | 99 | I/O/T | GPIO_A08 | I/O | GPIO_A08, SD1_DIO6, SCI_DIO, USART2_RXD, ATIM1_CH3 |
| PA07 | 100 | I/O/T | GPIO_A07 | I/O | GPIO_A07, SD1_DIO4, SCI_CLK, USART2_TXD, ATIM1_CH2N |
| PA10 | 101 | I/O/T | GPIO_A10 | I/O | GPIO_A10, SD1_CMD, MPI4_CS |
| PA09 | 102 | I/O/T | GPIO_A09 | I/O | GPIO_A09, SD1_CLK, MPI4_CLK |
| PA06 | 103 | I/O/T | GPIO_A06 | I/O | GPIO_A06, SD1_DIO3, MPI4_DIO3 |
| PA04 | 104 | I/O/T | GPIO_A04 | I/O | GPIO_A04, SD1_DIO1, MPI4_DIO1 |
| PA05 | 105 | I/O/T | GPIO_A05 | I/O | GPIO_A05, SD1_DIO0, MPI4_DIO0 |
| PA01 | 106 | I/O/T | GPIO_A01 | I/O | GPIO_A01, SD1_DIO2, MPI4_DIO2 |
| PB10 | 107 | I/O/T | GPIO_B10 | I/O | GPIO_B10, LCDC2_JDI_HST, LCDC2_SPI_CLK, USART6_RXD, GPTIM5_CH3 |
| PB09 | 108 | I/O/T | GPIO_B09 | I/O | GPIO_B09, LCDC2_JDI_R1, LCDC2_SPI_DIO0, USART6_TXD, GPTIM5_CH2, WLAN_ACTIVE |
| PB08 | 109 | I/O/T | GPIO_B08 | I/O | GPIO_B08, LCDC2_JDI_G1, LCDC2_SPI_CS, GPTIM5_CH1, BT_ACTIVE |
| PB06 | 110 | I/O/T | GPIO_B06 | I/O | GPIO_B06, LCDC2_JDI_R2, LCDC2_SPI_DIO3, LCDC2_JDI_SO, GPTIM4_CH3, USART6_CTS |
| PB04 | 111 | I/O/T | GPIO_B04 | I/O | GPIO_B04, LCDC2_JDI_G2, LCDC2_SPI_DIO2, LCDC2_JDI_DISP, GPTIM4_CH1, USART4_CTS |
| PB03 | 112 | I/O/T | GPIO_B03 | I/O | GPIO_B03, LCDC2_JDI_B2, LCDC2_SPI_DIO1, LCDC2_JDI_SCS, GPTIM3_CH4, USART4_RTS |
| PB02 | 113 | I/O/T | GPIO_B02 | I/O | GPIO_B02, LCDC2_JDI_B1, LCDC2_SPI_TE, LCDC2_JDI_SCLK, GPTIM3_CH3 |
| PB01 | 114 | I/O/T | GPIO_B01 | I/O | GPIO_B01, I2C7_SCL, USART6_TXD, GPTIM3_CH2, LPTIM3_OUT |
| PB00 | 115 | I/O/T | GPIO_B00 | I/O | GPIO_B00, I2C7_SDA, USART6_RXD, GPTIM3_CH1, LPTIM3_IN |
| PB23 | 116 | I/O/T | GPIO_B23 | I/O | GPIO_B23, USART5_CTS, SPI3_DO, SPI3_DIO, GPTIM4_CH2 |
| PB26 | 117 | I/O/T | GPIO_B26 | I/O | GPIO_B26, USART5_RTS, SPI3_CS, GPTIM5_CH1 |
| PB28 | 118 | I/O/T | GPIO_B28 | I/O | GPIO_B28, I2C6_SCL, USART6_RXD |
| PB29 | 119 | I/O/T | GPIO_B29 | I/O | GPIO_B29, I2C6_SDA, USART6_TXD |
| PB24 | 120 | I/O/T | GPIO_B24 | I/O | GPIO_B24, I2S3_SDO, GPTIM4_CH3 |
| PB27 | 121 | I/O/T | GPIO_B27 | I/O | GPIO_B27, SPI4_CLK, I2S3_SDI, GPTIM5_CH2 |
| PB31 | 122 | I/O/T | GPIO_B31 | I/O | GPIO_B31, SPI4_DI, I2S3_LRCK, AUD_CLK_EXT, GPTIM5_CH4 |
| PB30 | 123 | I/O/T | GPIO_B30 | I/O | GPIO_B30, SPI4_DO, I2S3_BCK, SPI4_DIO, GPTIM5_CH3 |
| PB34 | 124 | I/O/T | GPIO_B34 | I/O | GPIO_B34, SPI4_CS, I2S3_MCLK |
| PB39 | 125 | I/O/T | GPIO_B39 | I/O | GPIO_B39, USART6_RTS, GPTIM3_CH4 |
| PB38 | 126 | I/O/T | GPIO_B38 | I/O | GPIO_B38, USART6_CTS, GPTIM3_CH3 |
| PB47 | 127 | I/O/T | GPIO_B47 | I/O | GPIO_B47, I2C5_SDA, USART6_RXD, GPTIM5_CH2 |
| PB48 | 128 | I/O/T | GPIO_B48 | I/O | GPIO_B48, I2C5_SCL, USART6_TXD, GPTIM5_CH3 |
| AU_DAC2N_OUT | 129 | AO | AU_DAC2N_OUT | AO | 音频 DAC2 差分输出负极 |
| AU_DAC2P_OUT | 130 | AO | AU_DAC2P_OUT | AO | 音频 DAC2 差分输出正极 |
| AU_ADC2N_IN | 131 | AI | AU_ADC2N_IN | AI | 音频 ADC2 差分输入负极 |
| AU_ADC2P_IN | 132 | AI | AU_ADC2P_IN | AI | 音频 ADC2 差分输入正极 |
| GND | 133–138 | P | 接地 | P | 接地（共 6 个管脚） |

</div>

*注：P: 电源；I：输入；O：输出；T：可设置为高阻; AO: 音频输出；AI：音频输入。*

!!! note
    PIN2 (USART_RXD)、PIN3(USART_TXD) 是默认打印口、程序调试接口、程序下载接口。

### 4.3 芯片管脚分布图 { #43-physical-pin-description }

技术规格书图 3-2 按功能分组展示了 SDIO、SPI、I2C、UART、GPTIM、LCD 接口（DPI/8080/SPI/JDI/DSI）、GPADC、MPI、模拟音频、启动模式、电源、蓝牙天线、CAN/USB 以及 SWD/调试 UART 等信号在 SF32LB586VDD36 芯片轮廓上的分布。规划主板信号分组和走线时，应结合上方的管脚定义表一并确认。

!!! info "图 4-2：芯片管脚分布图"
    完整图示请参见官方技术规格书图3-2（本指南未复现该图）。

## 5. 外设 { #5-peripherals }

### 5.1 通信接口 { #51-communication-interfaces }

表 4-1“功能描述”列中标注为 `PAxx_I2C_UART` 或 `PBxx_I2C_UART` 的管脚，均可配置为 I2C 或 UART。整个芯片最多可配置 7 路 I2C 和 6 路 UART。

**UART** — 全双工，波特率高达 6 Mbps，可配置数据格式，支持硬件流控（CTS/RTS）与 DMA 多包收发。UART1、UART2、UART3 位于 HPSYS；UART4、UART5、UART6 位于 LPSYS。

**I2C** — 支持 Master 和 Slave 角色，内置 8 字节 FIFO，支持 DMA 批量读写。支持标准模式（100 kbps）、快速模式（400 kbps）、快速模式+（1 Mbps）和高速模式（3.4 Mbps）；Master 支持 7/10 比特寻址，并支持时钟延展及可配置的数字防抖动滤波。I2C1~4 位于 HPSYS；I2C5~7 位于 LPSYS。

**SPI** — 支持 SSP/SPI（全双工，Master 或 Slave）和 Microwire（半双工，仅 Master）3 种通信格式，支持 4~32 位数据宽度，时钟极性/相位可配，片选极性可配，FIFO 深度 32Bits×16Entry，收发均支持 DMA。SPI1、SPI2 位于 HPSYS（最大时钟 48 MHz）；SPI3、SPI4 位于 LPSYS（最大时钟 24 MHz）。

**USB2.0 HS** — 一路高速 Host/Device 接口，符合 USB2.0 协议规范，软件可配置端点，支持挂起/恢复、会话请求协议和主机协商协议，支持高速及全速模式。

**MPI 接口** — 支持 SPI NOR Flash（1/2/4 线，支持 DTR 模式）和 SPI NAND Flash（1/2/4 线），支持寄存器模式和地址映射模式，硬件自动切换。模组上 MPI4 接口可接外部 SPI NOR Flash 或 SPI NAND Flash。

**SD/SDIO/eMMC** — 支持 SD 协议 3.0 以及 eMMC 标准 4.5.1，作为 HOST 控制器，内置链式 DMA 控制以及 1K 字节 FIFO。支持 SDSC/SDHC/SDXC/SDHS 卡，支持 UHS-1（SDR12/25/50/104/DDR50）、单线、4 线和 8 线模式，以及 4 线和 8 线 DDR 模式。

**I2S** — 仅支持 Master 模式，全双工，支持左对齐/右对齐/标准格式，支持 8-bit 和 16-bit 单声道/立体声，PCM 位宽最高 24-bit。

**LCD 接口** — 支持 DBI 串行 SPI 模式（3 线/4 线，支持双线/四线数据线）和并行 8080 模式（8/16/24-bit 总线位宽），支持 RGB332/RGB444/RGB565/RGB666/RGB888 等色彩格式。管脚 47~52 还提供一组独立的 MIPI DSI 通道（1 组时钟 + 2 组数据）。

### 5.2 模拟信号处理 { #52-analog-signal-processing }

**12 比特 GPADC** — SARADC，最大采样率 4MS/s，单端输入 0~3.3 V / 差分输入 ±2.1 V，支持 8 路单端模拟输入或 4 对差分模拟输入，支持单次/循环测量模式，每次测量可分 4 个可独立配置的时隙，支持软件/硬件触发，支持 DMA。

**温度传感器** — 分辨率 0.2°C，范围 -40°C~125°C，精度 ±3°C，支持轮询或中断读数。

**音频 DAC** — 集成两路 24-bit DAC，采样率 8KHz~48KHz，支持差分输出。

**音频 PLL** — 支持小数分频，精度 48 MHz/2^18，满足 48 MHz、32.768 kHz、44.1 kHz 等采样率需求。

**音频 ADC** — 集成两路 24-bit ADC，采样率 8KHz~48KHz，每路独立增益调节。

## 6. 电气特性 { #6-electrical-characteristics }

### 6.1 绝对最大额定值 { #61-absolute-maximum-ratings }

<div align="center"><em>表 6.1-1：绝对最大额定值</em></div>

<div align="center" markdown>

| 符号 | 描述 | 最小值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V 电源输入 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8 V 电源输入 | -0.3 | 1.95 | V |
| VDDIO | I/O 电源输入 | -0.3 | 3.6 | V |
| Tstore | 存储温度 | -40 | 125 | °C |

</div>

### 6.2 建议工作条件 { #62-recommended-operating-conditions }

<div align="center"><em>表 6.2-1：建议工作条件</em></div>

<div align="center" markdown>

| 符号 | 描述 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V 电源输入 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8 V 电源输入 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O 电源输入 | 1.7 | - | 3.6 | V |
| TA | 工作温度 | -40 | - | 85 | °C |

</div>

### 6.3 基本电气特性 { #63-dc-electrical-characteristics }

<div align="center"><em>表 6.3-1：直流电气特性（3.3 V, 25°C）</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 管脚电容 | 2.5 | 3 | 3.5 | pF |
| VIH | 高电平输入电压 | 0.7×VDD | - | VDD | V |
| VIL | 低电平输入电压 | VSS | - | 0.3×VDD | V |
| VOH | 高电平输出电压（高阻负载） | 0.8×VDD | - | VDD | V |
| VOL | 低电平输出电压（高阻负载） | VSS | - | 0.2×VDD | V |
| IOH | 高电平驱动电流 | 24 | 30 | 38 | mA |
| IOL | 低电平驱动电流 | 24 | 30 | 38 | mA |
| RPU / RPD | 内部上拉/下拉电阻 | 7 | 10 | 20 | kΩ |

</div>

<div align="center"><em>表 6.3-2：直流电气特性（1.8 V, 25°C）</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| IOH | 高电平驱动电流 | 8 | 10 | 13 | mA |
| IOL | 低电平驱动电流 | 8 | 10 | 13 | mA |
| RPU / RPD | 内部上拉/下拉电阻 | 10 | 17 | 30 | kΩ |

</div>

完整表格（含输入漏电流、复位阈值以及两种供电电压下的管脚电容）请参见技术规格书 §5.3。

### 6.4 功耗特性 { #64-power-consumption }

<div align="center"><em>表 6.4-1：BLE 功耗（TX 功率 0 dBm）</em></div>

<div align="center" markdown>

| 符号 | 条件 | 1.8 V 供电 | 3.8 V 供电 | 单位 |
| :--- | :--- | :-: | :-: | :-: |
| I∆TX | TXPOWER=0 dBm | 4.19 | 2.21 | mA |
| I∆RX | — | 4.03 | 2.12 | mA |

</div>

<div align="center"><em>表 6.4-2：BLE、经典蓝牙各种状态下的平均功耗（3.8 V 供电）</em></div>

<div align="center" markdown>

| 模式 | 条件 | @0 dBm | @10 dBm | 单位 |
| :--- | :-: | :-: | :-: | :-: |
| 蓝牙 Sniff 模式（attempt=1） | 50 ms | 146.4 | 178.6 | μA |
| 蓝牙 Sniff 模式（attempt=1） | 1 s | 7.3 | 8.9 | μA |
| BLE 广播 | 50 ms | 166.9 | 251.8 | μA |
| BLE 广播 | 1 s | 8.3 | 12.6 | μA |
| BLE 连接 | 50 ms | 128.8 | 148.4 | μA |
| BLE 连接 | 1 s | 6.4 | 7.4 | μA |
| 待机（Standby） | — | 4.2 | — | μA |

</div>

<div align="center"><em>表 6.4-3：处理器功耗（HPSYS/LPSYS，3.8 V 供电）</em></div>

<div align="center" markdown>

| 符号 | 条件 | 电流（mA） | 电流增量（μA/MHz） |
| :--- | :--- | :-: | :-: |
| ICoreMark | HPSYS@240 MHz | 10.34 | 31.3 |
| ICoreMark | LPSYS@48 MHz | 0.89 | 27.6 |
| IWhileLoop | HPSYS@240 MHz | 7.98 | 21.3 |
| IWhileLoop | LPSYS@48 MHz | 0.67 | 18.7 |

</div>

### 6.5 双模蓝牙射频 { #65-dual-mode-bluetooth-rf-performance }

支持蓝牙协议 V5.3 并向下兼容 V4.2、V4.1、V4.0，包含低功耗蓝牙和经典蓝牙。工作信道中心频率：2402~2480 MHz。

**BLE 发射机（1 Mbps 模式）**：最大发射功率 19 dBm，功率控制范围 -20~19 dBm。

**BLE 接收机**：典型灵敏度为 -100 dBm（1 Mbps）、-97 dBm（2 Mbps）、-104.5 dBm（LR S2/500 kbps）和 -107.5 dBm（LR S8/125 kbps）；测试使用 37 字节数据包，在 PER 为 30.8%、未施加干扰（dirty-off）的条件下进行。

**经典蓝牙（Basic Data Rate）**：最大发射功率 19 dBm；接收机灵敏度 -96.3 dBm（未施加干扰，dirty off）/ -94 dBm（施加干扰，dirty on）@0.1% BER。

**经典蓝牙（Enhanced Data Rate）**：最大发射功率 13 dBm；π/4-DQPSK 接收机灵敏度 -95.5 dBm；8DPSK 接收机灵敏度 -88.5 dBm。

完整的 BLE 1 Mbps/2 Mbps/LR 收发性能表和经典蓝牙 BR/EDR 收发性能表，请参见技术规格书 §5.5。

## 7. 模组供电 { #7-module-power-supply }

模组电源接口有五个，即 **VDD_3V3**、**VDD_1V8**、**VDDIOA**、**VDDIOA2** 和 **VDDIOB**：

- **VDD_3V3** 给 MCU 芯片的 AVDD33_ANA、AVDD33_AUD、AVDD_USB 和模组内部 eMMC VDD（如有配置）供电，推荐使用 LDO 供电。
- **VDD_1V8** 给 MCU 芯片的 PVDD1、PVDD2、AVDD_BRF、AVDD18_DSI 和合封存储器供电。
- **VDDIOA** 给 MCU 的 VDDIOA、模组内部 eMMC VIO（如有配置）和外部 FLASH 供电。
- **VDDIOA2** 给 MCU 的 VDDIOA2 供电（覆盖 PA00~PA11）。
- **VDDIOB** 给 MCU 的 VDDIOB 供电。

!!! info "图 7-1：模组供电示意图"
    完整图示请参见官方技术规格书图7-1（本指南未复现该图）。

## 8. 开发板参考原理图和管脚分配 { #8-reference-schematic-and-pin-assignment }

技术规格书提供了完整的 SF32LB58-MOD 开发板参考原理图，涵盖电源、复位、JTAG/SWD、UART、SDIO、LCD、MIPI DSI 和音频电路。

!!! info "图 8-1：开发板参考原理图"
    完整图示请参见官方技术规格书图7-2至图7-8（本指南未复现该图）。

技术规格书还提供了该开发板的推荐管脚分配表，其中包含针对 LCD_DPI_24、LCD_DSI、LCD_QSPI、LCD_8080 等显示方案的树莓派风格接口映射。

!!! info "图 8-2：开发板推荐管脚分配"
    完整图示请参见官方技术规格书图7-9（本指南未复现该图）。

可将上述资料作为量产原理图设计的起点，并根据产品的实际外设需求调整管脚选择。

## 9. 原理图设计检查清单 { #9-schematic-design-checklist }

<div align="center"><em>表 9-1：原理图设计检查清单</em></div>

<div align="center" markdown>

| 序号 | 检查点 |
| :-: | :--- |
| 1 | VDD_3V3 输入电压范围必须是 2.97 V~3.6 V，靠近模组 PIN 脚放置 4.7 μF 电容。 |
| 2 | VDD_1V8 输入电压范围必须是 1.7 V~1.95 V，靠近模组 PIN 脚放置 4.7 μF 电容。 |
| 3 | VDDIOA、VDDIOA2、VDDIOB 输入电压范围必须是 1.7 V~3.6 V，靠近模组 PIN 脚放置电容。 |

</div>

!!! note
    本指南仅列出以上三项检查内容。定稿量产原理图前，请查阅[官方技术规格书 PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) §7.3 中的完整检查清单。

## 10. 模组尺寸和 PCB 封装图形 { #10-module-dimensions-and-pcb-footprint }

### 10.1 模组尺寸 { #101-module-dimensions }

模组尺寸为 24 × 24 × 3.1 mm。

!!! info "图 10-1：模组尺寸图"
    完整图示请参见官方技术规格书图8-1（本指南未复现该图）。

### 10.2 推荐 PCB 封装图 { #102-recommended-pcb-footprint }

!!! info "图 10-2：推荐 PCB 封装图"
    完整图示请参见官方技术规格书图8-2（本指南未复现该图）。

### 10.3 外部天线连接器尺寸 { #103-external-antenna-connector }

对于支持外部天线的型号，模组可通过邮票孔 RF 馈点或 IPEX 兼容连接器外接天线（根据型号选配）。

!!! info "图 10-3：外部天线连接器尺寸图"
    完整图示请参见官方技术规格书图8-3（本指南未复现该图）。

### 10.4 PCB 设计中的模组位置摆放 { #104-module-placement-in-pcb-design }

需要预留好模组天线区域的位置，确保该区域没有器件、铺铜、走线、机壳金属或其他导电结构。天线净空和验证要求应以官方模组规格书以及最终整机结构为准。

- 尽可能将天线区域伸出板边，馈点靠近板边位置。
- 如果天线无法伸出板边，请给 PCB 天线预留足够大的净空区域（严禁铺铜、走线、摆放元件），并尽可能切割掉天线下方区域的底板材料。
- 涉及整机设计时，应考虑外壳对天线的影响并进行 RF 验证；仍需在最终整机上测试通信距离等指标，以确认射频性能。

## 11. 产品处理 { #11-product-handling }

### 11.1 储存条件 { #111-storage-conditions }

- 密封在防潮袋（MBB）中的产品应储存在 <40°C/90%RH 的非冷凝大气环境中。
- 真空袋拆封后，应在器件湿敏等级（MSL）对应的车间寿命内使用；超出时限后，再次回流焊前须烘烤。

### 11.2 静电放电（ESD） { #112-electrostatic-discharge-esd }

请遵循思澈科技（SiFli）模组标准 ESD 防护规范进行装配和测试。

### 11.3 炉温曲线 { #113-reflow-profile }

建议模组只过一次回流焊。

!!! info "图 11-1：推荐回流焊温度曲线"
    完整图示请参见官方技术规格书图9-1（本指南未复现该图）。

### 11.4 超声波振动 { #114-ultrasonic-vibration }

请避免将思澈科技（SiFli）模组暴露于超声波焊接机或超声波清洗机等超声波设备的振动中。超声波设备的振动可能与模组内部的晶振产生共振，导致晶振故障甚至失灵，进而致使模组无法工作或性能退化。

!!! note
    在定稿量产工艺规范前，请查阅 [官方技术规格书 PDF](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf) §9，确认 SF32LB58-MOD 的最终湿敏等级、车间寿命、ESD 等级和回流焊要求。

## 12. 相关文档 { #12-related-documents }

- [DS5802-SF32LB58-MOD 技术规格书（V0.1）](https://downloads.sifli.com/silicon/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf)
- [SF32LB58x 芯片介绍](../../sf32-products/chips/SF32LB58x.md)
- [SF32LB58x 硬件设计指南](../chip-guides/SF32LB58x_hardware_design_guide.md)
- [SF32LB58-DevKit-LCD](../../sf32-products/devkits/SF32LB58-DevKit-LCD.md)

## 13. 修订历史 { #13-revision-history }

<div align="center"><em>表 13-1：修订历史</em></div>

<div align="center" markdown>

| 日期 | 版本 | 发布说明 |
| :--- | :-: | :--- |
| 2025 | 0.1 | 首个公开发布版本 |

</div>

本指南基于 **DS5802-SF32LB58-MOD V0.1**（首个公开发布版本）整理。请以官方 PDF 的最新版本为准。
