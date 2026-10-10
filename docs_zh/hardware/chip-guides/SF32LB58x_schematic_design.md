---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB58x MCU 原理图设计指南，涵盖电源、时钟生成、RF、用户接口、存储与连接，以及制造。"
tags:
    - 硬件
    - 芯片
---

# SF32LB58x 硬件设计指南 — 原理图设计 {#sf32lb58x-hardware-design-guide-schematic-design-guidelines}

!!! note "SF32LB58x 硬件设计指南的一部分"
    本页介绍第 5 节“原理图设计指南”。如需了解器件选型和完整设计流程，请先阅读 [SF32LB58x 硬件设计指南概览](SF32LB58x_hardware_design_guide.md)，再查看[原理图检查表](SF32LB58x_schematic_checklist.md)，或直接跳转到 [PCB 布局指南](SF32LB58x_pcb_layout.md)。

## 5. 原理图设计指南 {#5-schematic-design-guidelines}

本章按原理图设计流程组织 SF32LB58x 的设计内容，从最小系统开始，依次展开电源、时钟生成、RF、用户接口、存储与连接，以及制造相关设计。各小节先说明设计目标，再列出电路要求、常见风险和发布前检查项。

<div align="center"><em>表 5-1：原理图章节导航</em></div>

<div align="center" markdown>

| 分组 | 主要决策 | 发布前验证材料 |
|:---|:---|:---|
| 最小系统设计 | 准确型号和封装、电源与复位、时钟、启动与存储、调试与恢复访问 | 首次上电调试评审、启动与恢复方案 |
| 电源系统 | 系统 PMIC、芯片 PMU 电源轨、BUCK 电感、LDO 电容、复位、低功耗唤醒源 | 电源树、PMIC 设置、电源轨实测、POR/BOR/复位评审 |
| 时钟生成 | 48 MHz 和 32.768 kHz 晶体 | 晶体规格检查、匹配电容方案、晶体布局截图 |
| RF | RF 匹配和天线路径 | 阻抗方案、RF 匹配网络、天线禁布区、布局截图 |
| 用户接口 | 显示、触摸/背光、音频、按键、马达、PBR 控制 | 接口原理图、管脚分配、电源时序、模拟/音频评审 |
| 存储与连接 | 启动模式、MPI4、SD1/SD2、eMMC/SD NAND/SD 卡、USB 2.0 HS | 启动配置、存储电源方案、差分/高速走线证据 |
| 制造 | SWD、UART 调试输出、产测访问、原理图/PCB 检查表 | 测试点图、恢复路径、产线烧录/校准计划 |

</div>

### 5.1. 最小系统设计 {#51-minimum-system-design}

将最小系统作为原理图评审的首个关口。在加入产品专用外设前，应先确认准确的器件型号和封装、所需电源轨与时钟、复位行为、启动配置与存储器，以及可实际使用的调试和恢复路径。这些决策决定了电路板能否可靠上电、启动并完成调试。

<div align="center"><em>表 5.1-1：最小系统设计检查项</em></div>

<div align="center" markdown>

| 模块 | SF32LB58x 设计检查项 | 详细说明 |
|:---|:---|:---|
| 器件与封装 | 确认准确型号和封装，并核实其管脚分配及合封存储配置能够满足计划使用的接口。 | [器件型号与封装](SF32LB58x_hardware_design_guide.md#32-variants) |
| 电源 | 提供所需的 PMU 与外部电源轨、BUCK 元件和就近去耦电容。 | [电源系统](#51-power-system) |
| 时钟 | 配置 48 MHz 主晶体和 32.768 kHz RTC 晶体，并满足规定的负载和布局要求。 | [时钟生成](#52-clock-generation) |
| 复位 | 按 `PVDD1` 电源域实现外部 `RSTN` RC 复位电路。 | [上电时序和复位](#5115-power-up-sequencing-and-reset) |
| 启动模式 | 使用 10 kΩ 电阻将 `Mode` 管脚稳定上拉或下拉；量产板预留测试点，测试板建议预留恢复跳线。 | [启动配置](#551-boot-configuration) |
| 启动存储 | 选择支持的存储接口，并根据所选器件核实管脚分配、I/O 电压和供电方案。 | [存储](#552-storage) |
| 上电调试 | 预留 SWD 和所需 UART 调试信号的板级访问，并为调试器提供所需的电源和地参考。 | [调试与下载接口](#561-debug-and-download-interface) |
| 低功耗行为 | 根据目标睡眠模式确认所需唤醒源和外部电源控制方式。 | [工作模式与唤醒源](#512-operating-modes-and-wake-sources) |

</div>

### 5.2. 电源系统 {#51-power-system}

#### 5.2.1. 电源设计 {#511-power-supply}
SF32LB58x 系列内置 PMU，提供 2 路 BUCK 输出和 3 路 LDO 输出。BUCK 输出需要外接电感和电容，并连接至芯片内部对应的电源输入；LDO 输出则需要外接电容。智能手表设计可搭配思澈科技（SiFli）的 PMIC SF30147C，为 SF32LB58x 及其外围器件供电。

##### 5.2.1.1. 思澈科技（SiFli） PMIC 芯片电源分配 {#5111-sifli-pmic-power-distribution}

SF30147C 面向超低功耗可穿戴产品，是一款高集成度、高效率的电源管理芯片。它集成 4 路 LDO，各路均支持较宽的输入、输出电压范围，最大负载电流为 100 mA。芯片还集成 7 路低漏电、低导通电阻的负载开关：其中 2 路为高压开关，可直接由电池电压为外设供电（例如音频功放）；另 5 路为低压开关，用于为 1.8 V 外设供电。SF32LB58x 通过两个 GPIO 模拟 TWI 信号，控制 SF30147C。

<div align="center"><em>表 5.2-1：SF30147C 电源分配表</em></div>

<div align="center" markdown>

| SF30147C 电源管脚 | 最小电压 (V) | 最大电压 (V) | 最大电流 (mA) | 详细描述 |
|:---|:---|:---|:---|:---|
| VBUCK | 1.8 | 1.8 | 500 | SF32LB58x 的 PVDD1、PVDD2、VDDIOA、VDDIOA2、VDDIOB、AVDD_BRF、AVDD18_DSI 等 1.8 V 电源 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PA 逻辑供电 |
| LVSW2 | 1.8 | 1.8 | 100 | G-sensor 1.8 V 供电 |
| LVSW3 | 1.8 | 1.8 | 150 | 心率 1.8 V 供电 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8 V 供电 |
| LVSW5 | 1.8 | 1.8 | 150 | EMMC CORE 供电 |
| LDO1 | 2.8 | 3.3 | 100 | SF32LB58x 的 AVDD33_USB、AVDD33_ANA、AVDD33_AUD、AVDDIOA2 等 3.3 V 电源 |
| LDO2 | 2.8 | 3.3 | 100 | EMMC 或 SD NAND 供电 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3 V 供电 |
| LDO4 | 2.8 | 3.3 | 100 | 心率 3.3 V 供电 |
| HVSW1 | 2.8 | 5 | 150 | 模拟 Class-K PA 供电 |
| HVSW2 | 2.8 | 5 | 150 | GPS 供电 |

</div>

该芯片的详细情况请参见 SF30147C 的芯片技术规格书。

##### 5.2.1.2. SF32LB58x 供电要求 {#5112-sf32lb58x-power-requirements}

SF32LB58x 系列的 PMU 电源规格如下表所示。

<div align="center"><em>表 5.2-2：PMU 供电规格</em></div>

<div align="center" markdown>

| PMU 电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 详细描述 |
|:---|:---|:---|:---|:---|:---|
| PVDD1 | 1.71 | 1.8 | 3.6 | 100 | PVDD1 电源输入 |
| PVDD2 | 1.71 | 1.8 | 3.6 | 50 | PVDD2 电源输入 |
| BUCK1_LX / BUCK1_FB | - | 1.25 | - | 100 | BUCK1_LX 输出连接电感及内部电源输入 1；电感另一端连接外部电容 |
| BUCK2_LX / BUCK2_FB | - | 0.9 | - | 50 | BUCK2_LX 输出连接电感及内部电源输入 2；电感另一端连接外部电容 |
| LDO_VOUT1 | - | 1.1 | - | 100 | LDO 输出，外接电容 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 输出，外接电容 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 输出，外接电容 |
| MIC_BIAS | 1.4 | - | 2.8 | - | MIC 电源输出 |

</div>

SF32LB58x 系列芯片其他需要外部供电的电源规格如下表所示。

<div align="center"><em>表 5.2-3：其他电源供电规格</em></div>

<div align="center" markdown>

| 其它电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 详细描述 |
|:---|:---|:---|:---|:---|:---|
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | 射频电源输入 |
| AVDD18_DSI | 1.71 | 1.8 | 2.5 | 20 | MIPI DSI 电源输入；不使用时应悬空（保持未连接） |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 模拟电源 + 射频 PA 电源输入 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 模拟音频电源输入 |
| AVDD33_USB | 3.15 | 3.3 | 3.45 | 50 | USB 电源输入 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA93 I/O 电源输入 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11 I/O 电源输入 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PB I/O 电源输入 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA 电源输入 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB 电源输入 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC 电源输入 |
| GPADC_VREFP | - | - | - | - | GPADC 参考电压输入，只外接电容，不用外供电 |
| AUD_VREF | - | - | - | - | 音频参考电压输入，只外接电容，不用外供电 |

</div>

##### 5.2.1.3. 电容推荐值 {#5113-recommended-capacitor-values}

<div align="center"><em>表 5.2-4：电容推荐值</em></div>

<div align="center" markdown>

| 电源管脚 | 电容 | 详细描述 |
|:---|:---|:---|
| PVDD1 | 0.1 uF + 10 uF | 靠近管脚放置至少 10 uF 和 0.1 uF 共 2 颗电容 |
| PVDD2 | 0.1 uF + 10 uF | 靠近管脚放置至少 10 uF 和 0.1 uF 共 2 颗电容 |
| BUCK1_LX / BUCK1_FB | 0.1 uF + 4.7 uF | 靠近管脚放置至少 4.7 uF 和 0.1 uF 共 2 颗电容 |
| BUCK2_LX / BUCK2_FB | 0.1 uF + 4.7 uF | 靠近管脚放置至少 4.7 uF 和 0.1 uF 共 2 颗电容 |
| LDO_VOUT1 | 4.7 uF | 靠近管脚放置至少 1 颗 4.7 uF 电容 |
| VDD_RET | 0.47 uF | 靠近管脚放置至少 1 颗 0.47 uF 电容 |
| VDD_RTC | 0.1 uF | 靠近管脚放置至少 1 颗 0.1 uF 电容 |
| AVDD_BRF | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |
| AVDD18_DSI | 4.7 uF | 靠近管脚放置至少 1 颗 4.7 uF 电容 |
| AVDD33_ANA | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |
| AVDD33_AUD | 4.7 uF | 靠近管脚放置至少 1 颗 4.7 uF 电容 |
| AVDD33_USB | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |
| MIC_BIAS | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |
| VDDIOA / VDDIOA2 / VDDIOB | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |
| VDDIOSA / VDDIOSB / VDDIOSC | 1 uF | 靠近管脚放置至少 1 颗 1 uF 电容 |

</div>

##### 5.2.1.4. BUCK 电感选择要求 {#5114-buck-inductor-selection}

!!! important "功率电感关键参数"
    L（电感量）= 4.7 uH，DCR（直流电阻）≤ 0.4 Ω，Isat（饱和电流）≥ 500 mA

##### 5.2.1.5. 上电时序和复位 {#5115-power-up-sequencing-and-reset}

SF32LB58x 系列芯片内置上电复位（POR，Power-On Reset）和欠压复位（BOR，Brownout Reset）功能，同时支持外部硬件复位信号 RSTN。

RSTN 复位信号应上拉至 PVDD1 输入电源域，并通过 0.1 uF 电容接地，构成 RC 延迟复位电路。

![图 5.2-1：上/下电时序图](../../sf32-products/chips/assets/58x/sf32lb58x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.2-1：上/下电时序图</em></div>

![图 5.2-2：复位电路图](../../sf32-products/chips/assets/58x/sf32lb58x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.2-2：复位电路图</em></div>

##### 5.2.1.6. 典型电源电路 {#5116-typical-power-circuit}

SF32LB58x 系列可使用思澈科技（SiFli）的 PMIC SF30147C 为各电源轨供电，具体分配见表 5.2-1。芯片内部还集成 2 路 BUCK 输出和 3 路 LDO 输出。

![图 5.2-3：SF30147C 供电图](../../sf32-products/chips/assets/58x/sf32lb58x-30147-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.2-3：SF30147C 供电图</em></div>

![图 5.2-4：内置 DCDC 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-BUCK-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.2-4：内置 DCDC 电路图</em></div>

![图 5.2-5：内置 LDO 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-LDO-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.2-5：内置 LDO 电路图</em></div>

##### 5.2.1.7. 电源设计检查清单 {#5117-power-design-checklist}

- [ ] 明确所选型号的 PVDD1/PVDD2 供电范围（1.71 V–3.6 V）与实际供电方案匹配
- [ ] BUCK 电感满足 4.7 uH，DCR ≤ 0.4 Ω，Isat ≥ 500 mA
- [ ] PVDD1/PVDD2、BUCK1/2_LX/FB、LDO_VOUT1、VDD_RET、VDD_RTC 各管脚外接电容满足本节列出的推荐值
- [ ] 若使用 SF30147C，7 路负载开关的电压/电流分配与外设需求一致
- [ ] RSTN 复位电路的 RC 延迟满足器件复位时序要求

#### 5.2.2. 工作模式与唤醒源 {#512-operating-modes-and-wake-sources}

低功耗方案应结合 PBR 功能、可唤醒中断、存储器电源开关、传感器供电，以及外部 PMIC 的负载开关一并评审。

SF32LB58x 系列芯片提供 6 个 PBR 接口，其主要特点：

1. PBR0 在开机阶段会从 0 变 1，用来做某些外部 LSW 控制，PBR1-PBR5 都是默认输出 0；
2. PBR0-PBR5 在待机（Standby）和休眠（Hibernate）模式下均可用作输出；
3. PBR0-PBR5 可以输出 LPTIM 信号；
4. PBR0-PBR5 可以输出 32 kHz 时钟信号；
5. PBR0-PBR3 可配置为唤醒信号输入；MCU 处于运行状态时，这些输入不会产生中断。

SF32LB58x 系列的所有 GPIO 均可配置为轻度睡眠（Light Sleep）和深度睡眠（Deep Sleep）模式下的唤醒源。在待机（Standby）和休眠（Hibernate）模式下，芯片支持 16 个可唤醒中断源：PA 上有 6 个，PB 上有 10 个。

<div align="center"><em>表 5.2-5：中断源连接方式</em></div>

<div align="center" markdown>

| 中断源 | I/O | 详细描述 |
|:---|:---|:---|
| WKUP_PIN0 | PB54 | 中断信号 0 |
| WKUP_PIN1 | PB55 | 中断信号 1 |
| WKUP_PIN2 | PB56 | 中断信号 2 |
| WKUP_PIN3 | PB57 | 中断信号 3 |
| WKUP_PIN4 | PB58 | 中断信号 4 |
| WKUP_PIN5 | PB59 | 中断信号 5 |
| WKUP_PIN6 | PA64 | 中断信号 6 |
| WKUP_PIN7 | PA65 | 中断信号 7 |
| WKUP_PIN8 | PA66 | 中断信号 8 |
| WKUP_PIN9 | PA67 | 中断信号 9 |
| WKUP_PIN10 | PA68 | 中断信号 10 |
| WKUP_PIN11 | PA69 | 中断信号 11 |
| WKUP_PIN12 | PBR0 | 中断信号 12 |
| WKUP_PIN13 | PBR1 | 中断信号 13 |
| WKUP_PIN14 | PBR2 | 中断信号 14 |
| WKUP_PIN15 | PBR3 | 中断信号 15 |

</div>

!!! note "唤醒源数量需向原厂确认"
    原资料称共有 16 个可唤醒中断源，其中 PA 有 6 个、PB 有 10 个；但表格列出 PB 引脚 6 个、PA 引脚 6 个，以及 PBR 引脚 4 个。原资料未说明 PBR 是否计入 PB 的数量。依据 PA/PB 数量进行设计前，请向 SiFli 确认统计口径。

### 5.3. 时钟生成 {#52-clock-generation}
SF32LB58x 系列芯片需要外部提供 2 个时钟源：48 MHz 主晶体和 32.768 kHz RTC 晶体。

<div align="center"><em>表 5.3-1：晶体规格要求</em></div>

<div align="center" markdown>

| 晶体 | 晶体规格要求 | 详细描述 |
|:---|:---|:---|
| 48 MHz | 7 pF ≤ CL ≤ 12 pF（推荐值 8.8 pF），ΔF/F0 ≤ ±10 ppm，ESR ≤ 30 Ω（推荐值 22 Ω） | 晶体功耗与 CL、ESR 有关，二者数值越小，功耗越低。应在晶体附近预留并联匹配电容；CL < 12 pF 时无需安装 |
| 32.768 kHz | CL ≤ 12.5 pF（推荐值 7 pF），ΔF/F0 ≤ ±20 ppm，ESR ≤ 80 kΩ（推荐值 38 kΩ） | 晶体功耗与 CL、ESR 有关，二者数值越小，功耗越低。应在晶体附近预留并联匹配电容；CL < 12.5 pF 时无需安装 |

</div>

<div align="center"><em>表 5.3-2：AVL 收录晶体型号</em></div>

<div align="center" markdown>

| 型号 | 厂家 | 参数 |
|:---|:---|:---|
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz，ΔF/F0 = -6～8 ppm，CL = 8.8 pF，ESR ≤ 22 Ω（最大值），TOPR = -30～85 °C，封装 2016（公制） |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz，ΔF/F0 = -20～20 ppm，CL = 7 pF，ESR ≤ 70 kΩ（最大值），TOPR = -40～85 °C，封装 3215（公制） |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz，ΔF/F0 = -10～10 ppm，CL = 8.8 pF，ESR ≤ 40 Ω（最大值），TOPR = -20～75 °C，封装 2016（公制） |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz，ΔF/F0 = -20～20 ppm，CL = 7 pF，ESR ≤ 70 kΩ（最大值），TOPR = -40～85 °C，封装 3215（公制） |

</div>

!!! note
    通用的 48 MHz 晶体规格要求 ESR ≤ 30 Ω（推荐 22 Ω），而表中列出的 SX20Y048000B31T-8.8 型号标注为 ESR ≤ 40 Ω。源资料同时列出这两项数据，但未说明其关系；选用该型号前，请向思澈科技（SiFli）确认其适用性。该型号较高的 ESR 也可能导致静态功耗增加。PCB 布线时，应移除晶体正下方第二层的 GND 铜箔，以降低时钟信号的寄生负载电容。

如需查询 AVL 收录器件的详细信息，请参阅[思澈科技（SiFli）合格供应商名录（AVL）][思澈科技（SiFli）合格供应商名录（AVL）]。

### 5.4. RF {#53-rf}

SF32LB58x 系列芯片的射频本身采用了片上集成宽带匹配滤波技术，只需保证射频 PCB 走线为 50 Ω 特征阻抗即可。设计时建议预留 π 型匹配网络用来做杂散滤波和天线匹配。

![图 5.4-1：射频电路图](../../sf32-products/chips/assets/58x/sf32lb58x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.4-1：射频电路图</em></div>

!!! note "注意"
    匹配网络的器件参数值需根据实际天线和 PCB 布局进行测试来确定。

### 5.5. 用户接口 {#54-user-interfaces}

#### 5.5.1. 显示 {#541-display}
##### 5.5.1.1. MIPI DSI 显示接口 {#5411-mipi-dsi-display-interface}

SF32LB58x 系列支持双通道 MIPI DSI 显示接口。

<div align="center"><em>表 5.5-1：MIPI-DSI 信号连接</em></div>

<div align="center" markdown>

| MIPI DSI 信号 | I/O | 说明 |
|:---|:---|:---|
| CLKP | DSI_CLKP | MIPI 时钟信号+ |
| CLKN | DSI_CLKN | MIPI 时钟信号- |
| D0P | DSI_D0P | MIPI 数据通道0+ |
| D0N | DSI_D0N | MIPI 数据通道0- |
| D1P | DSI_D1P | MIPI 数据通道1+ |
| D1N | DSI_D1N | MIPI 数据通道1- |
| - | AVDD18_DSI | MIPI 电源输入 |
| - | DSI_REXT | 外接 10 kΩ 电阻到地 |
| - | AVSS_DSI | 接地 |
| TE | PB2 | 防撕裂同步（TE）信号，用于向 MCU 提供帧同步信息 |
| RESET | PB5 | 复位显示屏信号 |

</div>

##### 5.5.1.2. SPI/QSPI 显示接口 {#5412-spiqspi-display-interface}

SF32LB58x 系列支持 3 线/4 线 SPI 和 Quad-SPI 接口连接 LCD。HCPU（大核）使用 PA 上的 LCDC1，LCPU（小核）使用 PB 上的 LCDC2。

<div align="center"><em>表 5.5-2：SPI/QSPI 信号连接方式</em></div>

<div align="center" markdown>

| SPI 信号 | I/O（LCDC1） | I/O（LCDC2） | 详细描述 |
|:---|:---|:---|:---|
| CSX | PA44 | PB08 | 使能信号 |
| WRX_SCL | PA46 | PB10 | 时钟信号 |
| DCX | PA48 | PB03 | 4 线 SPI 模式下的数据/命令信号；Quad-SPI 模式下的数据 1 |
| SDI_RDX | PA50 | PB09 | 3 线/4 线 SPI 模式下的数据输入；Quad-SPI 模式下的数据 0 |
| SDO | PA50 | PB09 | 3 线/4 线 SPI 模式下的数据输出；与 SDI_RDX 短接 |
| D[0] | PA47 | PB04 | Quad-SPI 模式下的数据 2 |
| D[1] | PA45 | PB06 | Quad-SPI 模式下的数据 3 |
| REST | PA74 | PB05 | 复位显示屏信号 |
| TE | PA43 | PB02 | 向 MCU 提供帧同步信息的防撕裂同步（TE）信号 |

</div>

##### 5.5.1.3. MCU8080 显示接口 {#5413-mcu8080-display-interface}

SF32LB58x 系列芯片支持 MCU8080 接口来连接 LCD 显示屏。

<div align="center"><em>表 5.5-3：MCU8080 屏信号连接方式</em></div>

<div align="center" markdown>

| MCU8080 信号 | I/O | 详细描述 |
|:---|:---|:---|
| CSX | PA44 | 片选信号 |
| WRX | PA46 | 写数据选通信号 |
| DCX | PA48 | 显示数据/命令选择 |
| RDX | PA50 | 读选通信号 |
| D[0] | PA47 | 数据 0 |
| D[1] | PA45 | 数据 1 |
| D[2] | PA26 | 数据 2 |
| D[3] | PA27 | 数据 3 |
| D[4] | PA42 | 数据 4 |
| D[5] | PA51 | 数据 5 |
| D[6] | PA52 | 数据 6 |
| D[7] | PA58 | 数据 7 |
| REST | PA24 | 复位信号 |
| TE | PA43 | 防撕裂同步（TE）信号，用于向 MCU 提供帧同步信息 |

</div>

!!! note "RDX 信号说明"
    源资料将 RDX 描述为“读选通信号，用于写数据”，两者表述存在内在矛盾。本文表格暂以“读选通信号”表述；发布前请向思澈科技（SiFli）确认 RDX 的预期功能。

##### 5.5.1.4. DPI 显示接口 {#5414-dpi-display-interface}

SF32LB58x 系列芯片支持 DPI 接口来连接 LCD 显示屏。

<div align="center"><em>表 5.5-4：DPI 屏信号连接方式</em></div>

<div align="center" markdown>

| DPI 信号 | I/O | 详细描述 |
|:---|:---|:---|
| CLK | PA12 | 时钟信号 |
| DE | PA13 | 数据有效信号 |
| HSYNC | PA14 | 行同步信号 |
| VSYNC | PA15 | 垂直同步信号 |
| SD | PA18 | 显示屏关断控制 |
| CM | PA19 | 在普通色彩模式和减色色彩模式之间切换 |
| R0-R7 | PA22/PA23/PA24/PA25/PA26/PA27/PA43/PA44 | 像素信号（红色 R0-R7） |
| G0-G7 | PA45/PA46/PA47/PA48/PA50/PA53/PA54/PA55 | 像素信号（绿色 G0-G7） |
| B0-B7 | PA56/PA57/PA58/PA61/PA62/PA63/PA65/PA67 | 像素信号（蓝色 B0-B7） |

</div>

##### 5.5.1.5. JDI 显示接口 {#5415-jdi-display-interface}

SF32LB58x 系列芯片支持并行和串行的 JDI 接口来连接 LCD 显示屏，支持 PA 的 LCDC1 或 PB 的 LCDC2 复用相应的信号，推荐使用 PB 接口的 LCDC2。

<div align="center"><em>表 5.5-5：并行 JDI 屏信号连接方式</em></div>

<div align="center" markdown>

| JDI 信号 | I/O（LCDC1） | I/O（LCDC2） | 详细描述 |
|:---|:---|:---|:---|
| JDI_VCK | PA19 | PB15 | 垂直驱动器移位时钟 |
| JDI_VST | PA22 | PB19 | 垂直驱动器起始信号 |
| JDI_XRST | PA25 | PB16 | 水平和垂直驱动器复位信号 |
| JDI_HCK | PA43 | PB05 | 水平驱动器移位时钟 |
| JDI_HST | PA44 | PB10 | 水平驱动器起始信号 |
| JDI_ENB | PA45 | PB12 | 像素存储器写使能信号 |
| JDI_R1 | PA46 | PB09 | 红色图像数据（奇数像素） |
| JDI_R2 | PA47 | PB06 | 红色图像数据（偶数像素） |
| JDI_G1 | PA48 | PB08 | 绿色图像数据（奇数像素） |
| JDI_G2 | PA50 | PB04 | 绿色图像数据（偶数像素） |
| JDI_B1 | PA65 | PB02 | 蓝色图像数据（奇数像素） |
| JDI_B2 | PA67 | PB03 | 蓝色图像数据（偶数像素） |
| JDI_XFRP | PBR1 | PBR1 | 液晶驱动信号（“开”像素） |
| JDI_VCOM/FRP | PBR2 | PBR2 | 公共电极驱动信号 / 液晶驱动信号（“关”像素） |

</div>

<div align="center"><em>表 5.5-6：串行 JDI 屏信号连接方式</em></div>

<div align="center" markdown>

| JDI 信号 | I/O（LCDC1） | I/O（LCDC2） | 详细描述 |
|:---|:---|:---|:---|
| JDI_SCS | PA82 | PB03 | 片选信号 |
| JDI_SCLK | PA84 | PB02 | 串行时钟信号 |
| JDI_SO | PA86 | PB06 | 串行数据输出信号 |
| JDI_DISP | PA90 | PB04 | 显示开关控制信号 |
| JDI_EXTCOMIN | PA91 | PB05 | 公共电极反相极性输入 |

</div>

#### 5.5.2. 触摸和背光 {#542-touch-and-backlight}

SF32LB58x 系列支持 I2C 触摸控制器接口和触摸状态中断输入，并提供 1 路 PWM 信号，用于控制背光驱动器的使能和亮度。

<div align="center"><em>表 5.5-7：触摸和背光控制连接方式</em></div>

<div align="center" markdown>

| 触摸屏和背光信号 | I/O | 详细描述 |
|:---|:---|:---|
| Interrupt | PA69 | 触摸状态中断信号（可唤醒） |
| I2C1_SCL | PA17 | 触摸屏 I2C 的时钟信号 |
| I2C1_SDA | PA16 | 触摸屏 I2C 的数据信号 |
| BL_PWM | PB44 | 背光 PWM 控制信号 |
| 复位 | PA15 | 触摸复位信号 |
| 电源使能 | PA12 | 触摸屏电源使能信号 |

</div>

#### 5.5.3. 音频 {#543-audio}

SF32LB58x 系列提供多种音频接口，主要特性如下：

1. 芯片提供 3 路 I2S 接口：I2S1 仅支持输入，I2S2 和 I2S3 支持输入和输出。3 路接口均仅支持主机模式（Master），不支持从机模式（Slave）；
2. 推荐将 I2S1 用于 I2S 麦克风输入；
3. 推荐将 I2S2 用于音频 DAC；
4. 推荐将 I2S3 用于音频编解码器（Codec）；
5. 提供两路 PDM 数字麦克风输入接口。每路 PDM 接口最多可连接两只数字麦克风，因此 PDM 接口数量不等同于麦克风数量；
6. 支持 2 路模拟麦克风输入。每路均需串联至少 2.2 uF 的隔直电容，模拟麦克风由 SF32LB58x 的 MIC_BIAS 供电；
7. 支持外接模拟音频功率放大器。两个 DAC 通道各自的 P/N 走线均应按差分对布线并做好接地屏蔽，走线寄生电容须小于 10 pF。源资料对走线长度的要求不一致，详见下方说明。
8. 支持立体声模拟耳机接入。

!!! note "源资料中 DAC 走线长度要求不一致"
    思澈科技（SiFli）的硬件应用说明给出了两种不同的 DAC 走线长度限值：音频概述中规定 `<2 cm`，详细的 DAC PCB 布线章节则规定 `<2 mm`。源资料未解释两者差异。定板前请向思澈科技（SiFli）确认适用的限值；不要自行假定其中一个数值可以取代另一个。

![图 5.5-1：差分模拟音频输入电路图](../../sf32-products/chips/assets/58x/sf32lb58x-DIFAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-1：差分模拟音频输入电路图</em></div>

![图 5.5-2：单端模拟音频输入电路图](../../sf32-products/chips/assets/58x/sf32lb58x-SIGLEAU-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-2：单端模拟音频输入电路图</em></div>

![图 5.5-3：模拟音频输出电路图](../../sf32-products/chips/assets/58x/sf32lb58x-DAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-3：模拟音频输出电路图</em></div>

![图 5.5-4：模拟 MIC 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-MIC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-4：模拟 MIC 电路图</em></div>

![图 5.5-5：立体声耳机电路图](../../sf32-products/chips/assets/58x/sf32lb58x-PHONE-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-5：立体声耳机电路图</em></div>

![图 5.5-6：模拟音频 PA 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-AUPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-6：模拟音频 PA 电路图</em></div>

![图 5.5-7：I2S 音频 PA 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-I2SPA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-7：I2S 音频 PA 电路图</em></div>

<div align="center"><em>表 5.5-8：音频信号连接方式</em></div>

<div align="center" markdown>

| 音频信号 | I/O | 详细描述 |
|:---|:---|:---|
| I2S1_LRCK | PA14 | I2S1 帧时钟 |
| I2S1_SDI | PA18 | I2S1 数据输入 |
| I2S1_BCK | PA23 | I2S1 位时钟 |
| I2S2_LRCK | PA84 | I2S2 帧时钟 |
| I2S2_SDI | PA86 | I2S2 数据输入 |
| I2S2_SDO | PA82 | I2S2 数据输出 |
| I2S2_BCK | PA91 | I2S2 位时钟 |
| I2S3_LRCK | PB31 | I2S3 帧时钟 |
| I2S3_SDI | PB27 | I2S3 数据输入 |
| I2S3_SDO | PB24 | I2S3 数据输出 |
| I2S3_BCK | PB30 | I2S3 位时钟 |
| I2S3_MCLK | PB34 | I2S3 主时钟 |
| PDM1_CLK | PA23 | PDM1 时钟 |
| PDM1_DATA | PA18 | PDM1 数据 |
| PDM2_CLK | PA25 | PDM2 时钟 |
| PDM2_DATA | PA22 | PDM2 数据 |
| AU_ADC1P/AU_ADC1N | ADC1P/ADC1N | 模拟输入 1P/1N |
| AU_ADC2P/AU_ADC2N | ADC2P/ADC2N | 模拟输入 2P/2N |
| AU_DAC1P/AU_DAC1N | DAC1P/DAC1N | 模拟输出 1P/1N |
| AU_DAC2P/AU_DAC2N | DAC2P/DAC2N | 模拟输出 2P/2N |

</div>

!!! note "复用说明"
    I2S1_SDI 与 PDM1_DATA 共用 PA18，I2S1_BCK 与 PDM1_CLK 共用 PA23。I2S1_LRCK 使用 PA14，PDM2_DATA 使用 PA22。原理图冻结前，应根据软件接口配置确认实际启用的音频功能。

SF32LB58x 的模拟 MIC 输入支持单端和差分模式，两种模式均需串联 2.2 uF 电容。AU_ADC1P/AU_ADC1N/AU_ADC2P/AU_ADC2N 应连接至 SF32LB58x 一侧。模拟音频输出端 AU_DAC1P/AU_DAC1N/AU_DAC2P/AU_DAC2N 是芯片的输出，可连接立体声耳机功放或外置模拟音频功放的输入。模拟音频功放和 I2S 音频功放均通过 I2C3 配置。

#### 5.5.4. 按键 {#544-buttons}

##### 5.5.4.1. 开关机和长按复位按键 {#5441-power-and-long-press-reset-button}

SF32LB58x 系列建议使用 PB54 作为开关机信号，将短按开关机和长按复位合并到一个按键上。该电路为高电平有效；按住按键超过 10 s，芯片会自动复位。

![图 5.5-8：开关机按键电路图](../../sf32-products/chips/assets/58x/sf32lb58x-PWRKEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-8：开关机按键电路图</em></div>

##### 5.5.4.2. 功能按键或旋钮 {#5442-function-button-or-rotary-encoder}

SF32LB58x 系列支持功能按键和旋转编码器输入，两者均需上拉。芯片也支持光学跟踪传感器，推荐通过 I2C4 接口连接。

![图 5.5-9：功能按键或旋钮电路图](../../sf32-products/chips/assets/58x/sf32lb58x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-9：功能按键或旋钮电路图</em></div>

<div align="center"><em>表 5.5-9：光学跟踪传感器信号</em></div>

<div align="center" markdown>

| I2C 信号 | I/O | 详细描述 |
|:---|:---|:---|
| INT | PA58 | 光学跟踪传感器中断输入 |
| SDA | PA59 | 光学跟踪传感器 I2C 数据 |
| SCL | PA60 | 光学跟踪传感器 I2C 时钟 |

</div>

#### 5.5.5. 振动马达 {#545-vibration-motor}

SF32LB58x 系列支持多路 PWM 输出，可用作振动马达的驱动信号。

!!! important
    如果软件启用了 HCPU 主频动态调节宏 `#define BSP_PM_FREQ_SCALING 1`，HCPU 进入 idle 线程后主频会降低，相应 PA 管脚输出的 PWM 频率也会变化。因此，建议使用 PB 管脚输出 PWM 信号。

![图 5.5-10：振动马达电路图](../../sf32-products/chips/assets/58x/sf32lb58x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-10：振动马达电路图</em></div>

### 5.6. 存储与连接 {#55-storage-and-connectivity}

#### 5.6.1. 启动配置 {#551-boot-configuration}
SF32LB58x 系列通过 `Mode` 管脚配置启动模式。

<div align="center"><em>表 5.6-1：Mode 管脚配置</em></div>

<div align="center" markdown>

| `Mode` 配置 | 详细说明 |
|:---|:---|
| 高 | 芯片上电启动后，进入下载模式 |
| 低 | 芯片上电后进入用户程序区 |

</div>

!!! note "注意事项"
    1. `Mode` 与 VDDIOA 属于同一电压域；
    2. 使用 10 kΩ 电阻将 `Mode` 上拉至电源或下拉至 GND，以保持电平稳定；该管脚不得悬空，也应避免电平切换；
    3. 量产板必须为 `Mode` 预留测试点，以供程序下载和晶体校准使用；无需预留跳线；
    4. 测试板建议为 `Mode` 预留跳线，以便程序异常时从下载模式启动并重新烧录。

#### 5.6.2. 存储 {#552-storage}

SF32LB58x 系列支持通过 MPI3 或 MPI4 接口连接外置 NOR Flash 和 SPI NAND Flash，并通过 SD1 接口连接外置 SD NAND 和 eMMC。

##### 5.6.2.1. QSPI NAND Flash 接口 {#5521-qspi-nand-flash-interface}

SF32LB58x EVB 默认通过 MPI4 接口连接外置 SPI NAND Flash，信号连接如下表所示。

![图 5.6-1：SPI NAND Flash 连接参考电路](../../sf32-products/chips/assets/58x/sf32lb58x-SPINAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.6-1：SPI NAND Flash 连接参考电路</em></div>

<div align="center"><em>表 5.6-2：MPI4 信号连接</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 信号（MPI4） | 详细描述 |
|:---|:---|:---|
| CS# | PA10 | 片选，低电平有效 |
| SO | PA04 | 数据输入（数据输入输出 1） |
| WP# | PA01 | 写保护输出（数据输入输出 2） |
| SI | PA05 | 数据输出（数据输入输出 0） |
| SCLK | PA09 | 串行时钟输出 |
| Hold# | PA06 | 数据输出（数据输入输出 3） |

</div>

!!! note "注意"
    1. 如果产线需要下载程序到外置 FLASH 中，需要在下载工具软件中，将外部 FLASH 的电源控制脚 PA43 置高，打开外置 FLASH 的电源。
    2. SPI NAND Flash 的 Hold# 管脚需要通过 10 kΩ 电阻上拉至 SPI NAND Flash 的供电电源。

##### 5.6.2.2. SDIO、eMMC 与 Micro SD 接口 {#5522-sdio-emmc-micro-sd-interface}

SF32LB58x 系列芯片支持 2 路 SDIO 接口，EVB 板默认 SD1 接 eMMC 或 SD NAND，SD2 接 SD 卡或 WIFI 芯片。

SD1 使用 12 个 GPIO（PA00–PA11），其电源域为 VDDIOA2，支持 1.8 V 或 3.3 V，可根据外设的接口电平选择。SPI NAND Flash 和 eMMC 推荐使用 1.8 V 接口电平；SD NAND Flash 器件仅支持 3.3 V 接口电平，因此使用这类器件时，VDDIOA2 必须设为 3.3 V。

![图 5.6-2：eMMC 连接参考电路](../../sf32-products/chips/assets/58x/sf32lb58x-EMMC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.6-2：eMMC 连接参考电路</em></div>

![图 5.6-3：SD NAND 连接参考电路](../../sf32-products/chips/assets/58x/sf32lb58x-SDNAND-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.6-3：SD NAND 连接参考电路</em></div>

![图 5.6-4：SD 卡连接参考电路](../../sf32-products/chips/assets/58x/sf32lb58x-TF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.6-4：SD 卡连接参考电路</em></div>

<div align="center"><em>表 5.6-3：SD1 信号连接</em></div>

<div align="center" markdown>

| SD1 信号 | I/O 信号 | 详细描述 |
|:---|:---|:---|
| SD1_D7 | PA00 | 数据 7 |
| SD1_D2 | PA01 | 数据 6 |
| SD1_D5 | PA03 | 数据 5 |
| SD1_D1 | PA04 | 数据 1 |
| SD1_D0 | PA05 | 数据 0 |
| SD1_D3 | PA06 | 数据 3 |
| SD1_D4 | PA07 | 数据 4 |
| SD1_D6 | PA08 | 数据 6 |
| SD1_CLK | PA09 | 时钟信号 |
| SD1_CMD | PA10 | 命令信号 |

</div>

!!! note "SD1 标注核查"
    源资料称 SD1 使用 PA00–PA11 共 12 路 GPIO，但信号表仅列出 10 个信号（SD1_D[7:0]、CLK 和 CMD）。此外，表中 SD1_D2 和 SD1_D6 的详细描述均为“Data 6”。源资料既未说明未列出的两路 GPIO，也未解释重复标注。定稿原理图前，请依据芯片数据手册确认完整的 SD1 管脚映射。

<div align="center"><em>表 5.6-4：SD2 信号连接</em></div>

<div align="center" markdown>

| SD2 信号 | I/O 信号 | 详细描述 |
|:---|:---|:---|
| SD2_CMD | PA70 | 命令信号 |
| SD2_D1 | PA75 | 数据 1 |
| SD2_D0 | PA76 | 数据 0 |
| SD2_CLK | PA77 | 时钟信号 |
| SD2_D2 | PA79 | 数据 2 |
| SD2_D3 | PA81 | 数据 3 |

</div>

#### 5.6.3. USB {#553-usb}

SF32LB58x 系列的 USB 支持 USB 2.0 HS 主机（Host）和设备（Device）模式。USB DP 和 DM 均应通过 TVS 接地保护，TVS 结电容须小于 5 pF。PCB 上 DP/DM 差分走线的阻抗应控制为 90 Ω。

![图 5.6-5：USB 接口电路图](../../sf32-products/chips/assets/58x/sf32lb58x-USB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.6-5：USB 接口电路图</em></div>

### 5.7. 制造 {#56-manufacturing}

#### 5.7.1. 调试和下载接口 {#561-debug-and-download-interface}
SF32LB58x 系列芯片支持 Arm® 标准的 SWD 调试接口，可以连接到 EDA 工具上进行单步运行调试。连接 SEGGER® J-Link® 工具时，需要把调试工具的电源修改为外置接口输入，通过 SF32LB58x 电路板给 J-Link 工具供电。

![图 5.7-1：SWD 调试接口电路图](../../sf32-products/chips/assets/58x/sf32lb58x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.7-1：SWD 调试接口电路图</em></div>

SF32LB58x 提供 1 路 SWD 接口和 6 路可选 UART 接口，用于输出调试信息。

<div align="center"><em>表 5.7-1：调试口连接方式</em></div>

<div align="center" markdown>

| UART 信号 | I/O | 详细描述 |
|:---|:---|:---|
| TXD1 | PA31 | UART1 的 RXD 信号，HCPU 默认打印口 |
| RXD1 | PA32 | UART1 的 TXD 信号，HCPU 默认打印口 |
| TXD2 | PA28 | UART2 的 RXD 信号 |
| RXD2 | PA29 | UART2 的 TXD 信号 |
| TXD3 | PA21 | UART3 的 RXD 信号 |
| RXD3 | PA20 | UART3 的 TXD 信号 |
| TXD4 | PB37 | UART4 的 RXD 信号，LCPU 默认打印口 |
| RXD4 | PB36 | UART4 的 TXD 信号，LCPU 默认打印口 |
| TXD5 | PB18 | UART5 的 RXD 信号 |
| RXD5 | PB17 | UART5 的 TXD 信号 |
| TXD6 | PB14 | UART6 的 RXD 信号 |
| RXD6 | PB13 | UART6 的 TXD 信号 |
| SWCLK | PB07 | J-Link 时钟信号 |
| SWDIO | PB11 | J-Link 数据信号 |

</div>

!!! note "注意"
    UARTx RXD 信号不得悬空；软件初始化时应启用内部上拉。

#### 5.7.2. 产线烧录与硬件访问 {#562-production-flashing-and-hardware-access}

应在外壳和治具冻结前规划产线烧录、故障恢复和校准访问。至少应保留电源、地、SWD、所需 UART 调试输出、启动/配置管脚，以及恢复无法启动固件时需要的板级复位或 PMIC 控制点。

#### 5.7.3. 原理图和 PCB 图纸检查表 {#563-schematic-and-pcb-drawing-checklists}

- [ ] 电源方案（内置 PMU 直接供电或外搭 SF30147C）与整机功耗预算匹配
- [ ] Mode 启动配置管脚外接 10 kΩ 电阻，量产板预留测试点
- [ ] 48 MHz/32.768 kHz 晶体规格与推荐值一致，晶体下方已挖空第二层 GND
- [ ] 存储接口（MPI4/SD1/SD2）选型与启动配置一致，PA43 外部 Flash 电源控制已确认
- [ ] 显示接口（MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI）选型与 LCDC1/LCDC2 引脚分配一致
- [ ] 调试口（SWD + 6 路 UART）已按需分配，UART RXD 内部上拉已启用
- [ ] 已核实 I2S/PDM 与模拟音频接口的复用关系，且差分走线预算符合要求
- [ ] USB DP 和 DM 均已采取接地 TVS 保护，TVS 结电容 < 5 pF

[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
