---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB57x MCU 的原理图设计指导：存储与连接、制造，覆盖启动介质、GPIO、UART/I2C/SPI/SDIO/USB/CAN/GPADC、产线烧录、校准与治具访问。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x 硬件设计指南 — 存储与制造 { #sf32lb57x-hardware-design-guide-storage-manufacturing }

!!! note "SF32LB57x 硬件设计指南的一部分"
    本页覆盖原理图设计指导的第 5.6-5.7 节：存储与连接、制造。返回[时钟、RF 与用户接口](SF32LB57x_schematic_clock_rf_interfaces.md)，或跳转至 [PCB 布局指导](SF32LB57x_pcb_layout.md)。

### 5.6. 存储与连接 { #56-storage-and-connectivity }

#### 5.6.1. 存储与启动 { #561-storage-and-boot }

存储与启动方案应一并评审。所选启动介质会决定启动配置电阻（strap resistor）、存储器默认供电状态、总线分配和量产恢复访问方式。

内置合封 SPI NOR Flash 的型号默认从合封 Flash 启动；未内置合封 SPI NOR Flash 的型号必须通过外接存储介质启动。外接启动介质的选择由 `PA13`（`Bootstrap[1]`）和 `PA17`（`Bootstrap[0]`）配置。源原理图在每个引脚上各画有一个跳线和一个 7.5 kΩ 上拉电阻位，连接至 `VDD33_VOUT1/VDDIOA`。

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-A-Bootstrap.png" width="80%" alt="PA13 和 PA17 的启动配置跳线及上拉电路" /></div>
<div align="center"><em>图 5.6-1：PA13/PA17 启动配置跳线电路</em></div>

<div align="center"><em>表 5.6-1：外接启动介质选择</em></div>

<div align="center" markdown>

| `PA13`（`Bootstrap[1]`） | `PA17`（`Bootstrap[0]`） | 外接启动介质 |
|:-------------------------|:-------------------------|:-------------|
| L | L | SPI NOR Flash |
| L | H | SPI NAND Flash |
| H | L | SD NAND Flash |
| H | H | eMMC |

</div>

#### 5.6.2. 存储接口 { #562-storage-interfaces }

SF32LB57x 支持外接 SPI NOR Flash、SPI NAND Flash、SD NAND Flash 和 eMMC。只有 `PA12` 至 `PA17` 上的 MPI3 接口支持 SPI NOR 和 SPI NAND；任意一组 SDIO 接口均可连接 SD NAND 或 eMMC。部分可订购型号的合封存储会占用 MPI3。

原理图定版前请确认：

- 合封 Flash / PSRAM 是否占用 MPI 通道。
- 外部启动介质是 SPI NOR、SPI NAND、SD NAND 或 eMMC 中的哪一种。
- IO 电平与存储器工作电压是否一致。
- 上拉电阻、片选、时钟、数据线和电源控制是否满足启动要求。
- 外部启动介质的电源默认状态是否正确。

<div align="center"><em>表 5.6-2：MPI3 推荐存储连接</em></div>

<div align="center" markdown>

| 存储信号 | SPI NOR / SPI NAND | SD NAND / eMMC |
|:---------|:-------------------|:---------------|
| `CS#` / `SD2_D2` | `PA12` | `PA12` |
| `SO` / `SD2_D3` | `PA13` | `PA13` |
| `WP#` / `SD2_CLK` | `PA14` | `PA14` |
| `SI` / `SD2_CMD` | `PA15` | `PA15` |
| `SCLK` / `SD2_D0` | `PA16` | `PA16` |
| `HOLD#` / `SD2_D1` | `PA17` | `PA17` |

</div>

#### 5.6.3. 启动与电源控制 { #563-boot-and-power-control }

eMMC 有 `VCC` 和 `VCCQ` 两个电源域。同时切断两路电源可降低关机功耗，但 eMMC 从睡眠恢复较慢，CPU 平均功耗较高；只切断 `VCC`、保持 `VCCQ` 供电，则关机功耗较高，但 eMMC 恢复较快，CPU 平均功耗较低。

<div align="center"><em>表 5.6-3：MPI3 外接存储上拉要求</em></div>

<div align="center" markdown>

| 外接介质 | `PA13` | `PA15` | `PA17` |
|:---------|:-------|:-------|:-------|
| SPI NOR Flash | MPI `D1`：无需上拉 | 原文未规定 | MPI `D3`：无需上拉 |
| SPI NAND Flash | MPI `D1`：无需上拉 | 原文未规定 | MPI `D3`：7.5 kΩ 上拉 |
| SD NAND Flash | SD `D3`：7.5 kΩ 上拉 | SD `CMD`：7.5 kΩ 上拉 | SD `D1`：无需上拉 |
| eMMC | SD `D3`：7.5 kΩ 上拉 | SD `CMD`：7.5 kΩ 上拉 | SD `D1`：7.5 kΩ 上拉 |

</div>

表中“原文未规定”表示原文自查表没有给出该单元格的要求，不应据此推断无需上拉。

外接启动介质的选择和启动配置见表 5.6-1 及图 5.6-1。电源开关使能固定使用 `PA21`，高电平有效。按供电系列选择存储电源方案：

- 电池供电系列：外接 SPI NOR Flash 可由 `VDD33_VOUT1` 常供电；SPI NAND Flash 应经由接在 `VDD33_VOUT1` 后端的电源开关供电；SD NAND Flash 和 eMMC 应由外部 LDO 供电，并优先用 `PA21` 控制 LDO 使能。没有 `PA21` 的封装型号可改用复位默认上拉的 GPIO 控制。
- 3.3 V 供电系列：外接启动存储介质统一由外部 LDO 供电，推荐用 `PA21` 控制 LDO 使能。
- SPI NOR Flash 可常供电；SPI NAND、SD NAND 和 eMMC 必须增加电源开关。使用外接介质启动时，存储电源必须在启动时默认接通。
- `PA13`、`PA17` 应预留上拉电阻位；按启动介质选配，推荐阻值为 7.5 kΩ。不同介质在 MPI3 上的具体引脚要求见表 5.6-3。
- 若合封存储已经占用 MPI3，外部 MPI3 仅支持 SD NAND/eMMC 启动介质；不要再在该通道外接 SPI NOR 或 SPI NAND。
- 所选存储器的工作电压范围必须与主芯片 IO 供电电平匹配；存储器型号应列入项目的合格供应商名录（AVL）。

#### 5.6.4. GPIO 与引脚复用 { #564-gpio-and-pin-multiplexing }

GPIO 规划应在产品外设完全分配前完成，因为启动、调试、唤醒、USB、模拟、显示、存储和高速信号都会约束看似灵活的矩阵复用。

#### 5.6.5. 引脚规划原则 { #565-pin-planning }

SF32LB57x 支持灵活的引脚复用，但下列信号应尽早固定：

- RF、晶体、电源、USB、模拟音频、GPADC、启动和调试相关引脚。
- 高速显示、SDIO、存储和 DCMI 等对管脚组有要求的接口。
- 唤醒 GPIO、启动配置、SWD 切换和产线测试引脚。

#### 5.6.6. GPIO 设计要点 { #566-gpio-guidelines }

- 未使用 GPIO 应配置为确定状态。
- 外设 IO 电平必须与对应 IO 电源域匹配。
- 应将 GPIO 上拉造成的睡眠漏电计入功耗预算。
- 复用为模拟输入、USB、音频或特殊功能时，应按用户手册配置相应的数字输入/输出路径。
- 灵活的矩阵映射并不能免除高速布线约束，仍须遵守管脚组和 PCB 要求。

每个 GPIO 都可以通过下方的 IO 复用表使用功能 0 到功能 15。IO 复用表中“功能 16-255”一列指向矩阵映射，而随后的矩阵表列出的功能索引为 16-175。冻结原理图前，请结合两张表确认每个外设信号最终可以分配到哪个物理引脚。

<div align="center"><em>表 5.6-4：IO 复用表</em></div>

<div align="center" markdown>

| PAD | PUPD | 功能 0 | 功能 1 | 功能 2 | 功能 3 | 功能 4 | 功能 5 | 功能 6 | 功能 15 | 功能 16-255 |
|:----|:-----|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-----------|:-------------|:-------------------|
| `PA00` | PD | **`GPIO_A0`** | `LCDC1_SPI_RSTB` | - | `SD2_DIO2` | - | - | - | - | 矩阵表 |
| `PA01` | PD | **`GPIO_A1`** | - | - | `SD2_DIO3` | - | - | - | - | 矩阵表 |
| `PA02` | PD | **`GPIO_A2`** | `LCDC1_SPI_TE` | - | `SD2_CLK` | - | - | - | - | 矩阵表 |
| `PA03` | PU | **`GPIO_A3`** | `LCDC1_SPI_CS` | - | `SD2_CMD` | - | - | - | - | 矩阵表 |
| `PA04` | PD | **`GPIO_A4`** | `LCDC1_SPI_CLK` | - | `SD2_DIO0` | - | - | - | - | 矩阵表 |
| `PA05` | PD | **`GPIO_A5`** | `LCDC1_SPI_DIO0` | - | `SD2_DIO1` | - | - | - | - | 矩阵表 |
| `PA06` | PD | **`GPIO_A6`** | `LCDC1_SPI_DIO1` | `SD1_DIO2` | - | - | - | - | - | 矩阵表 |
| `PA07` | PD | **`GPIO_A7`** | `LCDC1_SPI_DIO2` | `SD1_DIO3` | - | - | - | - | - | 矩阵表 |
| `PA08` | PD | **`GPIO_A8`** | `LCDC1_SPI_DIO3` | `SD1_CLK` | - | - | - | - | - | 矩阵表 |
| `PA09` | PD | **`GPIO_A9`** | - | `SD1_CMD` | - | - | - | - | `#ADC1N` | 矩阵表 |
| `PA10` | PD | **`GPIO_A10`** | - | `SD1_DIO0` | - | - | - | - | `#ADC2P` | 矩阵表 |
| `PA11` | PU | **`GPIO_A11`** | `MPI3_CS2` | `SD1_DIO1` | - | - | - | - | `#ADC2N` | 矩阵表 |
| `PA12` | PU | **`GPIO_A12`** | `MPI3_CS` | `SD1_DIO2` | - | - | - | - | - | 矩阵表 |
| `PA13` | PD | **`GPIO_A13`** | `MPI3_DIO1` | `SD1_DIO3` | - | - | - | - | - | 矩阵表 |
| `PA14` | PD | **`GPIO_A14`** | `MPI3_DIO2` | `SD1_CLK` | - | - | - | - | - | 矩阵表 |
| `PA15` | PD | **`GPIO_A15`** | `MPI3_DIO0` | `SD1_CMD` | - | - | - | - | - | 矩阵表 |
| `PA16` | PD | **`GPIO_A16`** | `MPI3_CLK` | `SD1_DIO0` | - | - | - | - | - | 矩阵表 |
| `PA17` | PD | **`GPIO_A17`** | `MPI3_DIO3` | `SD1_DIO1` | - | - | - | - | - | 矩阵表 |
| `PA18` | PU | `GPIO_A18` | **`USART1_RXD`** | `SWCLK` | - | - | - | - | - | 矩阵表 |
| `PA19` | PU | `GPIO_A19` | **`USART1_TXD`** | `SWDIO` | - | - | - | - | - | 矩阵表 |
| `PA20` | PD | **`GPIO_A20`** | `SWO` | - | - | - | - | - | - | 矩阵表 |
| `PA21` | PD | **`GPIO_A21`** | - | - | - | - | - | - | - | 矩阵表 |
| `PA22` | - | **`GPIO_A22`** | - | `SD1_DIO2` | `SD2_DIO2` | - | - | - | `#XTAL32K_XI` | 矩阵表 |
| `PA23` | - | **`GPIO_A23`** | - | `SD1_DIO3` | `SD2_DIO3` | - | - | - | `#XTAL32K_XO` | 矩阵表 |
| `PA24` | PD | **`GPIO_A24`** | `SPI1_DIO` | `SD1_CLK` | `SD2_CLK` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 矩阵表 |
| `PA25` | PD | **`GPIO_A25`** | `SPI1_DI` | `SD1_CMD` | `SD2_CMD` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | `#XTAL32K_EXT` | 矩阵表 |
| `PA26` | PU | **`GPIO_A26`** | - | `SD1_DIO0` | `SD2_DIO0` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 矩阵表 |
| `PA27` | PU | **`GPIO_A27`** | - | `SD1_DIO1` | `SD2_DIO1` | `#RTC_CLK` | `#LPTIM2_OUT` | `#LPTIM2_OUTB` | - | 矩阵表 |
| `PA28` | PD | **`GPIO_A28`** | `SPI1_CLK` | - | `SD2_DIO2` | - | - | - | `#GPADC_CH0` | 矩阵表 |
| `PA29` | PD | **`GPIO_A29`** | `SPI1_CS` | - | `SD2_DIO3` | - | - | - | `#GPADC_CH1` | 矩阵表 |
| `PA30` | PD | **`GPIO_A30`** | - | - | `SD2_CLK` | `#EFUSE_PWR` | - | - | `#GPADC_CH2` | 矩阵表 |
| `PA31` | PD | **`GPIO_A31`** | - | - | `SD2_CMD` | - | - | - | `#GPADC_CH3` | 矩阵表 |
| `PA32` | PD | **`GPIO_A32`** | - | - | `SD2_DIO0` | - | - | - | `#GPADC_CH4` | 矩阵表 |
| `PA33` | PD | **`GPIO_A33`** | - | - | `SD2_DIO1` | `#WKUP_PIN` | - | - | `#GPADC_CH5` | 矩阵表 |
| `PA34` | PD | **`GPIO_A34`** | - | - | - | `#WKUP_PIN` | - | - | `#GPADC_CH6` | 矩阵表 |
| `PA35` | PD | **`GPIO_A35`** | - | - | `USB_DP` | `#WKUP_PIN` | - | - | `#GPADC_CH7` | 矩阵表 |
| `PA36` | PD | **`GPIO_A36`** | - | - | `USB_DM` | `#WKUP_PIN` | - | - | `#GPADC_CH8` | 矩阵表 |
| `PA37` | PD | **`GPIO_A37`** | `SPI2_DIO` | `SD1_DIO2` | - | `#WKUP_PIN` | - | - | `#GPADC_CH9` | 矩阵表 |
| `PA38` | PD | **`GPIO_A38`** | `SPI2_DI` | `SD1_DIO3` | - | `#WKUP_PIN` | - | - | `#GPADC_CH10` | 矩阵表 |
| `PA39` | PU | **`GPIO_A39`** | `SPI2_CLK` | `SD1_CLK` | - | `#WKUP_PIN` | - | - | - | 矩阵表 |
| `PA40` | PU | **`GPIO_A40`** | `SPI2_CS` | `SD1_CMD` | - | `#WKUP_PIN` | - | - | - | 矩阵表 |
| `PA41` | PU | **`GPIO_A41`** | - | `SD1_DIO0` | - | `#WKUP_PIN` | - | - | - | 矩阵表 |
| `PA42` | PU | **`GPIO_A42`** | - | `SD1_DIO1` | - | `#WKUP_PIN` | - | - | - | 矩阵表 |
| `PA43` | PD | `GPIO_A43` | **`SWCLK`** | - | - | - | - | - | - | 矩阵表 |
| `PA44` | PD | `GPIO_A44` | **`SWDIO`** | - | - | - | - | - | - | 矩阵表 |
| `PA45` | PD | **`GPIO_A45`** | - | - | `SD2_DIO2` | - | - | - | - | 矩阵表 |
| `PA46` | PD | **`GPIO_A46`** | - | - | `SD2_DIO3` | - | - | - | - | 矩阵表 |
| `PA47` | PD | **`GPIO_A47`** | - | - | `SD2_CLK` | - | - | - | - | 矩阵表 |
| `PA48` | PD | **`GPIO_A48`** | - | - | `SD2_CMD` | - | - | - | - | 矩阵表 |
| `PA49` | PD | **`GPIO_A49`** | - | - | `SD2_DIO0` | - | - | - | - | 矩阵表 |
| `PA50` | PD | **`GPIO_A50`** | - | - | `SD2_DIO1` | - | - | - | - | 矩阵表 |
| `PA51` | PD | **`GPIO_A51`** | - | - | - | - | - | - | - | 矩阵表 |
| `PA52` | PD | **`GPIO_A52`** | - | - | - | - | - | - | - | 矩阵表 |
| `PA53` | PD | **`GPIO_A53`** | - | - | - | - | - | - | - | 矩阵表 |
| `PA54` | PD | **`GPIO_A54`** | - | - | - | - | - | - | - | 矩阵表 |
| `PA55` | PD | **`GPIO_A55`** | - | - | - | - | - | - | `#ADC1P` | 矩阵表 |
| `PA56` | PD | **`GPIO_A56`** | - | - | - | - | - | - | `#MICBIAS` | 矩阵表 |
| `PA57` | PD | **`GPIO_A57`** | - | - | - | - | - | - | - | 矩阵表 |

</div>

加粗表示该管脚在复位后的默认功能。`PUPD` 表示复位后内部上下拉方向（`PU` 为上拉、`PD` 为下拉、`-` 为无上下拉）。`#` 表示模拟功能。

!!! note
    - 模拟功能只能通过上方 IO 复用表中的功能 0 到功能 15 访问。
    - 只有 `PA11` 到 `PA17` 和 `SB01` 到 `SB09` 支持 MPI 接口。
    - 在睡眠（Sleep）、深度睡眠（DeepSleep）和待机（Standby）模式下，只有 `PA24` 到 `PA27` 仍可输出信号；这些引脚可输出 LPTIM2 生成的 PWM 时钟，最高频率为 16 kHz。
    - `PA18` 和 `PA19` 为专用调试引脚，支持 `DBG-UART` 和 `SWD`。
    - `PA43` 和 `PA44` 为备用调试引脚，仅支持 `SWD`。
    - `PA00` 和 `PA01` 用于配置设备下载模式及 `SWD` 引脚位置切换，详见第 5.7.1 节。
    - 外部硬件唤醒中断只能使用 `PA33` 到 `PA42` 共 10 个 GPIO。

<div align="center"><em>表 5.6-5：矩阵表（功能索引 16-175）</em></div>

<div align="center" markdown>

| 模块 | 位宽 | 索引 | 子索引 | 功能 |
|:-----|:-----|:-----|:-------|:-----|
| I2C | 8 | 16-23 | 0-7 | `I2C1_SCL`, `I2C1_SDA`, `I2C2_SCL`, `I2C2_SDA`, `I2C3_SCL`, `I2C3_SDA`, `I2C4_SCL`, `I2C4_SDA`（按索引顺序排列）。 |
| SPI | 8 | 24-31 | 8-15 | `SPI1_CLK`, `SPI1_CS`, `SPI1_DI`, `SPI1_DIO`, `SPI2_CLK`, `SPI2_CS`, `SPI2_DI`, `SPI2_DIO`（按索引顺序排列）。 |
| UART | 12 | 32-43 | 16-27 | `UART1_TXD`, `UART1_RXD`, `UART1_RTS`, `UART1_CTS`, `UART2_TXD`, `UART2_RXD`, `UART2_RTS`, `UART2_CTS`, `UART3_TXD`, `UART3_RXD`, `UART3_RTS`, `UART3_CTS`（按索引顺序排列）。 |
| CAN | 4 | 44-47 | 28-31 | `CAN1_TXD`, `CAN1_RXD`, `CAN2_TXD`, `CAN2_RXD`（按索引顺序排列）。 |
| PTA/BT | 6 | 48-53 | 32-37 | `BT_ACTIVE`, `BT_PRIORITY`, `BT_COLLISION`, `WLAN_ACTIVE`, `BT_TX`, `BT_RX`（按索引顺序排列）。 |
| GPTIM | 10 | 54-63 | 38-47 | `GPTIM1_CH1`, `GPTIM1_CH2`, `GPTIM1_CH3`, `GPTIM1_CH4`, `GPTIM1_ETR`, `GPTIM2_CH1`, `GPTIM2_CH2`, `GPTIM2_CH3`, `GPTIM2_CH4`, `GPTIM2_ETR`（按索引顺序排列）。 |
| LPTIM | 6 | 64-69 | 48-53 | `LPTIM1_IN`, `LPTIM1_OUT`, `LPTIM1_ETR`, `LPTIM2_IN`, `LPTIM2_OUT`, `LPTIM2_ETR`（按索引顺序排列）。 |
| ATIM | 20 | 70-89 | 54-73 | `ATIM1_CH1`, `ATIM1_CH2`, `ATIM1_CH3`, `ATIM1_CH4`, `ATIM1_ETR`, `ATIM1_CH1N`, `ATIM1_CH2N`, `ATIM1_CH3N`, `ATIM1_BK`, `ATIM1_BK2`, `ATIM2_CH1`, `ATIM2_CH2`, `ATIM2_CH3`, `ATIM2_CH4`, `ATIM2_ETR`, `ATIM2_CH1N`, `ATIM2_CH2N`, `ATIM2_CH3N`, `ATIM2_BK`, `ATIM2_BK2`（按索引顺序排列）。 |
| PWM | 5 | 90-94 | 74-78 | `PWM1_CH1`, `PWM1_CH2`, `PWM1_CH3`, `PWM1_CH4`, `PWM1_CH5`（按索引顺序排列）。 |
| I2S | 10 | 95-104 | 79-88 | `I2S1_MCLK`, `I2S1_SDO`, `I2S1_SDI`, `I2S1_BCK`, `I2S1_LRCK`, `I2S2_MCLK`, `I2S2_SDO`, `I2S2_SDI`, `I2S2_BCK`, `I2S2_LRCK`（按索引顺序排列）。 |
| PTM | 16 | 105-120 | 89-104 | `PTM1_CH0` 至 `PTM1_CH15`（按索引顺序排列）。 |
| LCDC | 30 | 121-150 | 105-134 | `LCDC_IF0` 至 `LCDC_IF29`（按索引顺序排列）；子接口模式的对应关系见表 5.6-6。 |
| PDM | 6 | 151-156 | 135-140 | `PDM1_CLK`, `PDM2_CLK`, `PDM1_DATA`, `PDM1_DATA2`, `PDM2_DATA`, `PDM2_DATA2`（按索引顺序排列）。 |
| DCMI | 19 | 157-175 | 141-159 | `DCMI_CLK`, `DCMI_HSYNC`, `DCMI_VSYNC`, `DCMI_DI0` 至 `DCMI_DI15`（按索引顺序排列）。 |

</div>

任意 GPIO 均可矩阵映射到以上任一功能（需满足本指南其他章节所述的走线与布局约束）；索引和子索引列即为固件中配置矩阵路由器时使用的寄存器字段实际取值。

<div align="center"><em>表 5.6-6：LCDC 矩阵子复用表</em></div>

<div align="center" markdown>

| 矩阵信号 | SPI (`IF_SEL=0`) | JDI (`IF_SEL=0`) | EPD (`IF_SEL=1`) | DBI (`IF_SEL=2`) | DPI (`IF_SEL=3`) |
|:---------------|:--------------------|:---------------------|:---------------------|:---------------------|:---------------------|
| `LCDC_IF0` | `LCDC_SPI_TE` | - | `LCDC_TCON_GDSP` | `LCDC_8080_TE` | `LCDC_DPI_CLK` |
| `LCDC_IF1` | `LCDC_SPI_RSTB` | - | `LCDC_TCON_GDCLK` | `LCDC_8080_RSTB` | `LCDC_DPI_HSYNC` |
| `LCDC_IF2` | `LCDC_SPI_CS` | - | `LCDC_TCON_SDCLK` | `LCDC_8080_CS` | `LCDC_DPI_VSYNC` |
| `LCDC_IF3` | `LCDC_SPI_CLK` | - | `LCDC_TCON_SDSTL` | `LCDC_8080_WR` | `LCDC_DPI_DE` |
| `LCDC_IF4` | - | - | `LCDC_TCON_SDLE` | `LCDC_8080_RD` | `LCDC_DPI_SD` |
| `LCDC_IF5` | - | - | `LCDC_TCON_SDOE` | `LCDC_8080_DC` | `LCDC_DPI_CM` |
| `LCDC_IF6` | `LCDC_SPI_DIO0` | - | `LCDC_TCON_SDAT0` | `LCDC_8080_DIO0` | `LCDC_DPI_R0` |
| `LCDC_IF7` | `LCDC_SPI_DIO1` | - | `LCDC_TCON_SDAT1` | `LCDC_8080_DIO1` | `LCDC_DPI_R1` |
| `LCDC_IF8` | `LCDC_SPI_DIO2` | - | `LCDC_TCON_SDAT2` | `LCDC_8080_DIO2` | `LCDC_DPI_R2` |
| `LCDC_IF9` | `LCDC_SPI_DIO3` | - | `LCDC_TCON_SDAT3` | `LCDC_8080_DIO3` | `LCDC_DPI_R3` |
| `LCDC_IF10` | - | `LCDC_JDI_SCS` | `LCDC_TCON_SDAT4` | `LCDC_8080_DIO4` | `LCDC_DPI_R4` |
| `LCDC_IF11` | - | `LCDC_JDI_SCLK` | `LCDC_TCON_SDAT5` | `LCDC_8080_DIO5` | `LCDC_DPI_R5` |
| `LCDC_IF12` | - | `LCDC_JDI_SO` | `LCDC_TCON_SDAT6` | `LCDC_8080_DIO6` | `LCDC_DPI_R6` |
| `LCDC_IF13` | - | `LCDC_JDI_DISP` | `LCDC_TCON_SDAT7` | `LCDC_8080_DIO7` | `LCDC_DPI_R7` |
| `LCDC_IF14` | - | `LCDC_JDI_EXTCOMIN` | `LCDC_TCON_SDAT8` | `LCDC_8080_DIO8` | `LCDC_DPI_G0` |
| `LCDC_IF15` | - | - | `LCDC_TCON_SDAT9` | `LCDC_8080_DIO9` | `LCDC_DPI_G1` |
| `LCDC_IF16` | - | - | `LCDC_TCON_SDAT10` | `LCDC_8080_DIO10` | `LCDC_DPI_G2` |
| `LCDC_IF17` | - | - | `LCDC_TCON_SDAT11` | `LCDC_8080_DIO11` | `LCDC_DPI_G3` |
| `LCDC_IF18` | - | `LCDC_JDI_VCK` | `LCDC_TCON_SDAT12` | `LCDC_8080_DIO12` | `LCDC_DPI_G4` |
| `LCDC_IF19` | - | `LCDC_JDI_XRST` | `LCDC_TCON_SDAT13` | `LCDC_8080_DIO13` | `LCDC_DPI_G5` |
| `LCDC_IF20` | - | `LCDC_JDI_HCK` | `LCDC_TCON_SDAT14` | `LCDC_8080_DIO14` | `LCDC_DPI_G6` |
| `LCDC_IF21` | - | `LCDC_JDI_HST` | `LCDC_TCON_SDAT15` | `LCDC_8080_DIO15` | `LCDC_DPI_G7` |
| `LCDC_IF22` | - | `LCDC_JDI_ENB` | - | `LCDC_8080_RWN` | `LCDC_DPI_B0` |
| `LCDC_IF23` | - | `LCDC_JDI_VST` | - | `LCDC_8080_CS2` | `LCDC_DPI_B1` |
| `LCDC_IF24` | - | `LCDC_JDI_R1` | - | - | `LCDC_DPI_B2` |
| `LCDC_IF25` | - | `LCDC_JDI_G1` | - | - | `LCDC_DPI_B3` |
| `LCDC_IF26` | - | `LCDC_JDI_B1` | - | - | `LCDC_DPI_B4` |
| `LCDC_IF27` | - | `LCDC_JDI_R2` | - | - | `LCDC_DPI_B5` |
| `LCDC_IF28` | - | `LCDC_JDI_G2` | - | - | `LCDC_DPI_B6` |
| `LCDC_IF29` | - | `LCDC_JDI_B2` | - | - | `LCDC_DPI_B7` |

</div>

!!! warning "LCDC 子复用表中的 IF_SEL 标注"
    思澈科技（SiFli）的原始表格将 SPI 和 JDI 两种模式均标为 `IF_SEL=0`。本文保留原表标注；由于该值存在歧义，配置所选面板前应结合对应型号的 SDK 驱动和参考设计核实，不要据此自行推断寄存器设置。

#### 5.6.7. 通用接口 { #567-general-interfaces }

所有通用接口都应按同一模式评审：电气连接、IO 电压、复位/睡眠默认状态、上拉电源轨、ESD 暴露风险，以及是否与启动、调试、唤醒或高速功能冲突。

`PA34` 可用作开关机按键并支持长按复位：复位高电平有效，需在主板上配置 10 kΩ 下拉，按键按下时将引脚拉高；长按 10 秒可触发硬件复位。GPADC 电阻分压按键参考电路使用 1.1 kΩ、2.8 kΩ 和 5.1 kΩ 三个按键电阻；图中对应电压标注分别为 2.97 V/1.62 V、2.58 V/1.41 V 和 2.19 V/1.19 V。`PA34` 节点另有 10 kΩ 下拉和 100 nF 对地滤波电容。每个外露按键附近都应配置 ESD 防护。

<div align="center"><img src="../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png" width="80%" alt="PA34 开关机按键和 GPADC 电阻分压按键参考电路" /></div>
<div align="center"><em>图 5.6-2：PA34 开关机与 GPADC 按键参考电路</em></div>

!!! warning "GPADC 按键电压标注"
    思澈科技（SiFli）源图对各按键节点使用斜线分隔的双电压标注，但未说明每组数值的对应条件。使用这些电压作为阈值前，应结合目标供电配置和参考设计确认其对应关系。

#### 5.6.8. 接口评审原则 { #568-interface-review-principles }

每个外设接口都应同时评审四件事：

1. 电气连接是否正确，包括交叉接线、上拉/下拉、ESD 和端接。
2. IO 电压域是否匹配，包括外设关断后的倒灌风险。
3. 复位和睡眠默认状态是否安全。
4. 该接口是否占用启动、下载、SWD、USB、唤醒或高速显示等关键复用功能。

#### 5.6.9. UART { #569-uart }

- SF32LB57x 提供 3 路全双工 UART，最高波特率为 6 Mbps；数据格式可配置，信号可使用功能 0 到 15 的引脚或通过矩阵映射到任意 GPIO。
- MCU RXD 接外设 TXD，MCU TXD 接外设 RXD。
- 外设 IO 电压与主控 IO 域匹配。
- 复用 USB、启动、下载或调试功能的 UART 引脚，应评估复位默认状态。
- `PA18`、`PA19` 为默认 `DBG-UART` 引脚；对于需要频繁插拔的 UART 测试接口，源文档推荐使用 `PA18`、`PA19`、`PA43` 或 `PA44`，这组 GPIO 的耐压最高为 5.5 V。测试线较长时，应在信号线上串联 100 Ω 电阻以抑制过冲。

#### 5.6.10. I2C { #5610-i2c }

- SDA/SCL 必须配置上拉电阻。
- SF32LB57x 提供 4 路 I2C，均支持主机和从机模式；可通过矩阵映射到任意 GPIO。
- 源文档推荐：标准模式（100 kHz）用 4.7 kΩ；快速模式（400 kHz）用 2.2 kΩ 至 3.3 kΩ；Fast-mode Plus（1 MHz）用 1 kΩ 至 2.2 kΩ。400 kHz 可先按 2.2 kΩ 设计，再结合总线电容调整。
- 同一 I2C 总线上只需在主控附近配置一组上拉电阻，不必为每个从设备分别配置；上拉电源应随外设电源同步关断，避免睡眠漏电。
- 多设备共总线时必须确认地址不冲突。

#### 5.6.11. SPI { #5611-spi }

- SF32LB57x 提供 2 路 SPI，均支持主机和从机模式；可使用功能 0 到 15 的引脚，也可通过矩阵映射。
- 主控 SDO 接外设 SDI，主控 SDI 接外设 SDO。
- CLK、CS、模式、相位、极性和最高频率必须匹配外设规格。
- 高速 SPI 走线应短、参考地完整，必要时增加串联阻尼。
- SPI 时钟低于 30 MHz 时可通过矩阵表映射到任意 GPIO；高于 30 MHz 时优先使用功能 0 到功能 15 范围内的专用复用引脚。
- 高速 SPI 应在驱动端附近放置 22 ohm 到 27 ohm 串联电阻，并在时钟线上预留对地电容焊位，用于信号完整性调试。

#### 5.6.12. SDIO { #5612-sdio }

- SF32LB57x 内置 2 路 SD/MMC 主机控制器，仅支持主机模式，可连接 SD 卡、SDIO 外设和 eMMC；SDIO 信号由引脚复用器映射到固定 GPIO。
- SDIO 信号应成组走线。
- 在可行时，总线总长度建议控制在约 50 mm 以内，组内长度差控制在约 6 mm 以内。
- CLK、CMD、DATA 走线应位于连续的参考地平面上。
- 应核对 SDIO/eMMC/SD NAND 的上拉、电源控制和电压域。
- 24 MHz 时，芯片 GPIO 内部上拉可能足以满足 CMD 和 Data0 到 Data3 的上拉要求；48 MHz 及以上，应在 CMD 和 Data0 到 Data3 上增加 10 kohm 外部上拉。
- SDIO 信号线上应增加 27 ohm 到 33 ohm 串联电阻，并在时钟线上预留对地电容焊位。
- 外接 TF 卡座时，卡检测 `DET` 引脚应通过 10 kΩ 电阻上拉至 3.3 V，MCU 对应引脚配置为内部上拉输入；SDIO 信号线和供电回路均应增加 ESD 防护。

#### 5.6.13. USB { #5613-usb }

<div align="center"><em>表 5.6-7：USB 管脚分配</em></div>

<div align="center" markdown>

| USB 信号 | GPIO 管脚 |
|:----------|:----------|
| `USB_DP` | `PA35` |
| `USB_DM` | `PA36` |

</div>

- USB DP/DN 按 90 ohm 差分对布线。
- USB DP/DM 常用 `PA35` / `PA36` 复用功能，启用 USB 时应避免外部电路在复位阶段拉出异常电平。
- ESD 器件靠近连接器，信号先经过 ESD 再到芯片。
- 避免出现短桩线（stub），保持差分线等长和参考地连续。
- 若睡眠时需要 USB 插拔唤醒，应通过 VBUS 分压将检测信号接至硬件唤醒 GPIO；建议与充电器插入检测共用该 GPIO。
- `PA35` 固定为 `USB_DP`，`PA36` 固定为 `USB_DM`，不支持重映射；USB2.0 FS 最高 12 Mbps。
- 应在 DP/DM 靠近芯片端预留 22 ohm 或 33 ohm 串联电阻，并预留未贴装的对地电容焊位，用于信号完整性调试。
- USB 接口采用 3.3 V 单端信号。芯片内置识别电阻；软件可配置在 DP 或 DM 上启用 1.5 kΩ 上拉，以识别 Full-Speed 或 Low-Speed 设备。启用 USB 时，将 `PA35` 和 `PA36` 配置为高阻输入，以避免引脚复用冲突。

#### 5.6.14. CAN { #5614-can }

- SF32LB57x 提供 2 路兼容 CAN 2.0B 的 CAN 接口，可通过矩阵映射到任意 GPIO。
- CAN 收发器电源和 IO 电压应与主控匹配。
- 应按系统要求增加终端电阻、共模电感和 ESD 防护。
- 工业或车载环境需额外关注浪涌、EFT、ESD 和地电位差。

#### 5.6.15. GPADC { #5615-gpadc }

- GPADC 输入电压应保持在 0 V 至 3.3 V 的额定范围内。
- 仅 `PA28` 到 `PA38`（共 11 个管脚）通过管脚复用支持 GPADC 功能；不得将该功能分配到其他管脚。
- 分压测量应使用 1% 精度电阻。
- 每路 GPADC 输入都应在芯片管脚附近放置一颗 100 nF（0.1 uF）滤波电容。
- GPADC 走线远离 DC/DC、RF、USB、SDIO、显示时钟和充电回路。

<div align="center"><em>表 5.6-8：GPADC 管脚分配</em></div>

<div align="center" markdown>

| 管脚 | GPADC 功能 |
|:-----|:-----------|
| `PA28` | `GPADC_CH0` |
| `PA29` | `GPADC_CH1` |
| `PA30` | `GPADC_CH2` |
| `PA31` | `GPADC_CH3` |
| `PA32` | `GPADC_CH4` |
| `PA33` | `GPADC_CH5` |
| `PA34` | `GPADC_CH6` |
| `PA35` | `GPADC_CH7` |
| `PA36` | `GPADC_CH8` |
| `PA37` | `GPADC_CH9` |
| `PA38` | `GPADC_CH10` |
| `VBAT` / `VBATS` | `GPADC_CH11`，属于电池电压域，量程与通用 GPADC 管脚不同。 |

</div>

!!! warning "VBATS 管脚电压与采样范围"
    3.3 V 供电系列的电源管脚表将 `VBATS` 范围列为 0 V 至 4.7 V，而原理图自查表规定电池电压采样范围为 0 V 至 4.5 V。对于 GPADC 采样，应遵循 0 V 至 4.5 V 的较窄范围；不要把管脚表中的 4.7 V 上限当作 ADC 的有效测量范围。

### 5.7. 制造 { #57-manufacturing }

#### 5.7.1. 量产启动与下载模式 { #571-production-boot-and-download-modes }

应保持默认调试/下载引脚可供量产夹具访问，并在分配产品 IO 之前预留启动模式控制。源自查表要求在 `PA43` / `PA44` 上提供可焊接的测试点；同时要求在 `PA00` 上提供上拉电阻和测试点，`PA01` 上的电阻和测试点为可选。

<div align="center"><em>表 5.7-1：调试与启动控制测试点</em></div>

<div align="center" markdown>

| 信号 | 管脚 | 量产要求 |
|:-----|:-----|:---------|
| `DBG_UART_RXD` | `PA18` | 预留默认调试 UART 接收引脚；提供夹具访问。 |
| `DBG_UART_TXD` | `PA19` | 预留默认调试 UART 发送引脚；提供夹具访问。 |
| `SWD_CLK` | `PA43` | 提供可焊接测试点。 |
| `SWD_DIO` | `PA44` | 提供可焊接测试点。 |
| 启动模式选择 | `PA00` | 提供上拉电阻和测试点。 |
| SWD 位置切换 | `PA01` | 电阻和测试点可选。 |

</div>

<div align="center"><em>表 5.7-2：启动方式与下载接口</em></div>

<div align="center" markdown>

| `PA00` / Boot 寄存器 | `PA01` | 上位机 BOOT 开关 | 启动分支与可用接口 |
|:-----------------------|:-------|:-------------------|:--------------------|
| L | H | 任意 | 常规启动；`PA19` 不输出启动日志；`PA18` / `PA19` 切换为 SWD，`PA43` / `PA44` 上的 SWD 功能禁用。 |
| L | L | 关闭 | 常规启动；`PA19` 输出启动日志；`PA18` / `PA19` 为 DBG-UART，`PA43` / `PA44` 为 SWD。 |
| L | L | 开启 | 启动模式；支持 DBG-UART、SWD、UART 和 USB 烧录。 |
| PA00 或 Boot 寄存器 = 1 | L | 任意 | 启动模式；支持 DBG-UART、SWD、UART 和 USB 烧录。 |
| PA00 或 Boot 寄存器 = 1 | H | 任意 | 启动模式；`PA19` 不输出启动日志；支持 SWD/USB 烧录，且 `PA18` / `PA19` 切换为 SWD。 |

</div>

!!! warning "源文档中的调试 UART 测试点命名"
    原文第 2.10 节将 `DB_UART_RXD`（缺少 `G`）重复列出两次；调试引脚表和自查表则将 `PA18` 标为 `DBG_UART_RXD`，`PA19` 标为 `DBG_UART_TXD`。发布前应对照量产夹具确认预期的信号名称；不要重复预留 RXD。

<div align="center"><em>表 5.7-3：源文档中的量产测试点清单</em></div>

<div align="center" markdown>

| 源文档清单 | 适用范围 | 列出的测试点 |
|:-----------|:---------|:-------------|
| 第 2.10 节产线烧录/晶体校准清单 | 未说明 | `VBAT`、`PVDD`、`GND`、`AVDD33`、`PA00`、`PA01`，以及两次出现的 `DB_UART_RXD`。 |
| 硬件自查表 4.8，第 1 项 | 电池供电系列 | `VBAT` 或 3.3 V、`GND`、`PA18`（`DBG_UART_RXD`）、`PA19`（`DBG_UART_TXD`）、`VSYS`（3.3 V 供电系列无此项）、`PA34`。 |
| 硬件自查表 4.8，第 3 项 | 所有型号 | `VBAT` 或 3.3 V、`GND`、`PA18`、`PA19`、`VDD33_VOUT1`（3.3 V 供电系列无此项）、`PA00`、`PA01`、`PA34`；焊盘尺寸、间距和方向须与夹具探针匹配。 |

</div>

#### 5.7.2. 产线烧录与校准 { #572-production-programming-and-calibration }

源文档要求使用离线烧录器写入 Flash 并完成晶体校准。本节未说明 RF 校准或电源电流测试。设计量产焊盘时，应遵循源文档对探针尺寸、间距和方向的要求，并与量产夹具负责人确认表 5.7-3 中不同清单的差异。

参见 [思澈科技（SiFli）离线烧录器文档](https://wiki.sifli.com/tools/index.html)。
