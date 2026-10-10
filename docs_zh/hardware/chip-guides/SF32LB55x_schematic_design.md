---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB55x MCU 的原理图设计指导：电源系统、启动模式、时钟生成、RF、存储接口、显示与触摸接口，以及唤醒/GPADC/制造接口。"
tags:
    - 硬件
    - 芯片
---

# SF32LB55x 硬件设计指南 — 原理图设计指导 { #sf32lb55x-hardware-design-guide-schematic-design-guidelines }

## 5. 原理图设计指导 { #5-schematic-design-guidelines }

<div align="center"><em>表 5-1：原理图章节导航</em></div>

<div align="center" markdown>

| 分组 | 主题 |
|:---|:---|
| 电源系统 | PMU 电源、其他电源、电容、POR/BOR/复位、BUCK 电感。 |
| 启动模式 | Mode 管脚电压域、上下拉电阻、下载与恢复、量产测试接口。 |
| 时钟生成 | 48 MHz 晶体、32.768 kHz 晶体和匹配电容评审。 |
| RF | RF 匹配、50 Ω 天线路径、AVDD_BRF 滤波和 RF 禁布区。 |
| 存储接口 | OPI PSRAM、QSPI NOR/NAND/PSRAM、SDIO eMMC/Micro SD。 |
| 显示与触摸 | MIPI DSI、SPI/QSPI、MCU8080、JDI、触摸中断、复位、背光和面板电源。 |
| 唤醒、GPADC 与量产接口 | 唤醒源与按键、马达 PWM、GPADC 分压、传感器、蓝牙音频、DBG-UART、SWD、产线烧录与晶体校准。 |

</div>

### 5.1. 电源系统 { #51-power-system }

QFN68L 封装的 SF32LB551 没有 VDD2、BUCK2_VSW、BUCK2_VOUT、LDOVCC2_VOUT 和 AVDD_DSI 管脚。电源和电容表仅适用于所选封装实际提供的管脚。BGA 封装提供两路 BUCK 输出，BUCK2 可配置为 BUCK 或 LDO 模式，推荐使用 BUCK 模式；QFN68L 仅提供一路 BUCK 输出。

<div align="center"><em>表 5.1-1：PMU 电源管脚</em></div>

<div align="center" markdown>

| PMU 电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| VDD1 | 1.71 | 1.8 | 3.6 | 50 | VDD1 电源输入 |
| VDD2 | 1.71 | 1.8 | 3.6 | 50 | VDD2 电源输入 |
| BUCK1_VSW BUCK1_VOUT | - | 1.25 | - | 50 | BUCK1_VSW 为开关输出端，连接电感；BUCK1_VOUT 为内部电源输入端 1，连接电感另一端和外接电容 |
| BUCK2_VSW BUCK2_VOUT LDOVCC2_VOUT | - | 0.9 | - | 50 | BUCK2_VSW 为开关输出端，连接电感；内部电源输入端 2 连接电感另一端和外接电容 |
| LDO_VOUT1 | - | 1.1 | - | 50 | LDO 输出 1，连接外部电容 |
| LDO_VOUT2 | - | 0.9 | - | 20 | LDO 输出 2，连接外部电容 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 输出，连接外部电容 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 输出，连接外部电容 |

</div>

<div align="center"><em>表 5.1-2：其他电源管脚</em></div>

<div align="center" markdown>

| 其他电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AVDD_BRF | 1.71 | 1.8 | 3.63 | 30 | RF 电源输入 |
| AVDD_DSI | 1.71 | 1.8 | 2.75 | 20 | MIPI DSI 电源输入，必须供电 |
| VDD_SIP | 1.71 | 1.8 | 1.98 | 30 | 合封存储芯片电源输入 |
| AVDD33 | 3.15 | 3.3 | 3.63 | 50 | 电源输入 |
| VDDIOA | 1.71 | 1.8 | 3.63 | - | PA I/O 电源输入 |
| VDDIOB | 1.71 | 1.8 | 3.63 | - | PB I/O 电源输入 |

</div>

<div align="center"><em>表 5.1-3：电源电容要求</em></div>

<div align="center" markdown>

| 电源管脚 | 电容 | 说明 |
| :--- | :--- | :--- |
| VDD1 VDD2 | 0.1 μF + 10 μF | VDD1 和 VDD2 短接，至少放置 10 μF 和 0.1 μF 两个电容并靠近管脚 |
| BUCK1_VSW BUCK1_VOUT | 0.1 μF + 4.7 μF | 至少放置 4.7 μF 和 0.1 μF 两个电容并靠近管脚 |
| BUCK2_VSW BUCK2_VOUT | 0.1 μF + 4.7 μF | 至少放置 4.7 μF 和 0.1 μF 两个电容并靠近管脚 |
| LDOVCC2_VOUT | 0.1 μF + 4.7 μF | BUCK2 配置为 BUCK 模式时该脚悬空；BUCK2 配置为 LDO 模式时 BUCK2_VSW 悬空，LDOVCC2_VOUT 与 BUCK2_VOUT 短接，并在管脚附近放置 4.7 μF 和 0.1 μF 电容 |
| LDO_VOUT1 | 4.7 μF | 至少放置一个 4.7 μF 电容并靠近管脚 |
| LDO_VOUT2 | 4.7 μF | 至少放置一个 4.7 μF 电容并靠近管脚 |
| VDD_RET | 0.47 μF | 至少放置一个 0.47 μF 电容并靠近管脚 |
| VDD_RTC | 1 μF | 至少放置一个 1 μF 电容并靠近管脚 |
| VDD_SIP | 1 μF | 至少放置一个 1 μF 电容并靠近管脚 |
| SDMADC_VREF | 4.7 μF | 至少放置一个 4.7 μF 电容并靠近管脚 |
| AVDD_DSI | 0.1 μF + 10 μF | 至少放置 10 μF 和 0.1 μF 两个电容并靠近管脚 |
| AVDD33 | 4.7 μF | 至少放置一个 4.7 μF 电容并靠近管脚 |
| AVDD_BRF | 1 μF | 至少放置一个 1 μF 电容并靠近管脚 |
| VDDIOA VDDIOB | 2 × 0.1 μF + 2 × 1 μF | 每个管脚附近至少放置 1 μF 和 0.1 μF 两个电容 |

</div>

必要电容应靠近对应管脚放置，BUCK 电流回路应紧凑。布局前必须确认 BUCK/LDO 工作模式，并在实测硬件上检查复位电路和 POR/BOR 时序。

资料存在不一致：[思澈科技（SiFli）硬件应用说明](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)表 3-3 和 [V1.0 原理图检查表](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)第 9 项均为 VDD_RTC 指定 1 µF；但[该指南参考原理图中的 C0313](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png)标注为 0.1 µF。现有资料没有说明两种取值各自的适用条件。设计发布前应向思澈科技（SiFli）确认具体器件的要求，不要自行推断。

VDD1 和 VDD2 必须同时上电；SF32LB551 没有 VDD2。RSTN 应上拉至 VDD1 的输入电压域，并接 0.1 μF 电容至地。参考图中上拉电源标为 1.8 V/3.3 V，并采用 10 kΩ 电阻；实际应选择与设计所用 VDD1 电压域相对应的电平。图 5.1-1 标出了 1.50 V 的 POR 电平、2.5 V 至 1.5 V 可配置的 BOR 范围，以及 RSTN 的 0.7 V 标记。图 5.1-3 的实测波形中，从电源上升到复位释放约为 700 μs；这只是该示例的测量结果，不能作为所有设计的复位延时保证值。

![图 5.1-1：上下电时序](../../sf32-products/chips/assets/55x/SF32LB55x-POR-BOR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-1：上下电时序</em></div>

![图 5.1-2：复位电路](../../sf32-products/chips/assets/55x/SF32LB55x-RST-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-2：复位电路</em></div>

![图 5.1-3: 实测上电与复位波形](../../sf32-products/chips/assets/55x/SF32LB55x-RST-Test.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-3: 实测上电与复位波形</em></div>

![图 5.1-4：BGA DC-DC 参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-BGA-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-4：BGA DC-DC 参考电路</em></div>

![图 5.1-5：QFN DC-DC 参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-BUCK-QFN-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-5：QFN DC-DC 参考电路</em></div>

按照思澈科技（SiFli）硬件应用说明，BUCK 电感应选用 4.7 μH，直流电阻 DCR ≤ 0.4 Ω，饱和电流 Isat ≥ 450 mA。

### 5.2. 启动模式 { #52-boot-mode }

<div align="center"><em>表 5.2-1：启动模式配置</em></div>

<div align="center" markdown>

| 模式配置 | 说明 |
| :--- | :--- |
| 高电平 | 芯片上电启动后进入下载模式 |
| 低电平 | 芯片上电启动后跳转到用户程序区启动 |

</div>

高电平模式上电后进入下载模式，低电平模式上电后跳转到用户程序区。量产夹具应能可靠控制启动状态；同时应避免启动相关管脚被整机外壳遮挡，并确保测试时可以访问这些管脚。

Mode 管脚与 VDDIOA 属于同一电压域。外接 10 kΩ 电阻至对应电源或 GND，使电平稳定；不能悬空，也不能受到异常翻转干扰。量产板必须预留 Mode 测试点，供程序下载和晶体校准使用，但不必预留跳线。测试板建议预留跳线，以便程序死机后进入下载模式，重新烧录程序。

### 5.3. 时钟生成 { #53-clock-generation }

<div align="center"><em>表 5.3-1：晶体要求</em></div>

<div align="center" markdown>

| 晶体 | 晶体规格要求 | 说明 |
| :--- | :--- | :--- |
| 48 MHz | 7 pF≦CL≦12 pF（推荐 8.8 pF），△F/F0≦±10 ppm，ESR≦30 Ω（推荐 22 Ω） | 晶体振荡器的功耗与 CL 和 ESR 相关，两者越小，功耗越低。为优化功耗，建议在规格范围内选择 CL 和 ESR 较小的器件，并在晶体旁预留并联匹配电容焊位；当 CL<12 pF 时，无需贴装电容 |
| 32.768 kHz | CL≦12.5 pF（推荐 7 pF），△F/F0≦±20 ppm，ESR≦80 kΩ（推荐 38 kΩ） | 晶体的功耗与 CL 和 ESR 相关，两者越小，功耗越低。为优化功耗，建议在规格范围内选择 CL 和 ESR 较小的器件，并在晶体旁预留并联匹配电容焊位；当 CL<12.5 pF 时，无需贴装电容 |

</div>

两个晶体应靠近芯片放置，走线短且对称，并预留匹配电容焊位。晶体网络应远离 RF、BUCK、显示和马达噪声。

### 5.4. RF { #54-rf }

SF32LB55x 的 RF 前端采用片上宽带匹配滤波技术。RF PCB 走线应按 50 Ω 特征阻抗设计，并预留 π 型匹配网络，用于杂散滤波和天线匹配；最终器件参数需结合实际天线和 PCB 布局测试确定。如果所选天线已经完成匹配，通常不需要在预留网络之外再增加额外 RF 器件。

RF 走线应保持连续参考地，匹配电路尽量靠近芯片端放置，AVDD_BRF 滤波电容应靠近管脚；DC-DC、VBAT、晶体、高频时钟、SPI、SDIO、I2S、UART 等信号应远离 RF 区域。

RF 参考电路在 ANT 路径中串联 C0323（15 pF/50 V），两处对地支路 C0318 和 C0319 不装配（NF）。这些数值仅供示例参考，不能直接作为所有天线的匹配参数。

![图 5.4-1: RF 匹配参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-RF-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.4-1: RF 匹配参考电路</em></div>

### 5.5. 存储接口 { #55-storage-interfaces }

SF32LB55x 支持 OPI PSRAM、QSPI NOR/NAND Flash 与 PSRAM，以及 SDIO eMMC 或 Micro SD。封装会影响可用管脚和接口组合，因此存储方案应在管脚锁定和 PCB 叠层评审前确定。

BGA145 支持一路外接 OPI PSRAM，BGA169 支持两路。表 5.5-1 至表 5.5-3 分别对应 BGA145 配置及 BGA169 的两颗存储器，不表示同一封装具有三路 OPI 接口。QSPI 表分别对应 QSPI2、QSPI3 和 QSPI4；SDIO 表对应 SDIO1 的 4 位/8 位模式，以及 SDIO2 的 4 位模式。

外接 QSPI PSRAM 推荐使用 QSPI2。若通过 HCPU GPIO 控制外接 OPI/QSPI PSRAM 供电，必须选用 HCPU 的 PU 类型管脚，高电平开启、低电平关闭。若对内部 Flash 的 VDD_SIP 供电进行开关控制，必须使用 PA58，同样采用高电平开启、低电平关闭。应请思澈科技（SiFli）FAE 评估 LCPU 加速度与心率算法所需的 Flash 空间，再决定是否增加 QSPI4 外接 NOR Flash。

源文档 OPI 表中的方向标注不一致。[BGA145 参考原理图](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png)、[BGA169 器件 1 参考原理图](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png)和[BGA169 器件 2 参考原理图](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png)显示，MCU 的 PA37/PA20 和 PA07/PA08 分别驱动外接 PSRAM 的 CS# 和 CLK。因此，下表统一以 MCU 为方向参照：CS#、CLK 均为 MCU 输出、PSRAM 输入。原理图未明确标出 DQS/DM 的固定方向；请依据所选 PSRAM 的数据手册确认其功能和方向。

图中每颗 PSRAM 使用 1.8 V 电源、3 颗 0.1 μF 电容及 1 颗 1 μF/6.3 V 电容。RESET# 及 NC/CLK# 等悬空连接仅对应图示存储器型号，应核对所选器件的数据手册，不能一概照搬。

![图 5.5-1: BGA145 OPI PSRAM 参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA145-PSRAM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-1: BGA145 OPI PSRAM 参考电路</em></div>

<div align="center"><em>表 5.5-1: BGA145 OPI PSRAM</em></div>

<div align="center" markdown>

| PSRAM 信号 | MCU 管脚 | 说明 |
| :--- | :--- | :--- |
| CS# | PA37 | MCU 输出；PSRAM 输入 |
| CLK | PA20 | MCU 输出；PSRAM 输入 |
| DQS | PA35 | DQS/DM；功能和方向以所选 PSRAM 数据手册为准 |
| DQ0 | PA28 | 数据输入输出 0 |
| DQ1 | PA29 | 数据输入输出 1 |
| DQ2 | PA30 | 数据输入输出 2 |
| DQ3 | PA31 | 数据输入输出 3 |
| DQ4 | PA34 | 数据输入输出 4 |
| DQ5 | PA36 | 数据输入输出 5 |
| DQ6 | PA38 | 数据输入输出 6 |
| DQ7 | PA42 | 数据输入输出 7 |

</div>

![图 5.5-2: BGA169 OPI PSRAM 存储器 1 参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-1-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-2: BGA169 OPI PSRAM 存储器 1 参考电路</em></div>

<div align="center"><em>表 5.5-2: BGA169 OPI PSRAM 存储器 1</em></div>

<div align="center" markdown>

| PSRAM 信号 | MCU 管脚 | 说明 |
| :--- | :--- | :--- |
| CS# | PA07 | MCU 输出；PSRAM 输入 |
| CLK | PA08 | MCU 输出；PSRAM 输入 |
| DQS | PA15 | DQS/DM；功能和方向以所选 PSRAM 数据手册为准 |
| DQ0 | PA02 | 数据输入输出 0 |
| DQ1 | PA04 | 数据输入输出 1 |
| DQ2 | PA05 | 数据输入输出 2 |
| DQ3 | PA06 | 数据输入输出 3 |
| DQ4 | PA09 | 数据输入输出 4 |
| DQ5 | PA11 | 数据输入输出 5 |
| DQ6 | PA12 | 数据输入输出 6 |
| DQ7 | PA13 | 数据输入输出 7 |

</div>

![图 5.5-3: BGA169 OPI PSRAM 存储器 2 参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-BGA169-PSRAM-2-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-3: BGA169 OPI PSRAM 存储器 2 参考电路</em></div>

<div align="center"><em>表 5.5-3: BGA169 OPI PSRAM 存储器 2</em></div>

<div align="center" markdown>

| PSRAM 信号 | MCU 管脚 | 说明 |
| :--- | :--- | :--- |
| CS# | PA07 | MCU 输出；PSRAM 输入 |
| CLK | PA08 | MCU 输出；PSRAM 输入 |
| DQS | PA26 | DQS/DM；功能和方向以所选 PSRAM 数据手册为准 |
| DQ0 | PA18 | 数据输入输出 0 |
| DQ1 | PA22 | 数据输入输出 1 |
| DQ2 | PA24 | 数据输入输出 2 |
| DQ3 | PA32 | 数据输入输出 3 |
| DQ4 | PA33 | 数据输入输出 4 |
| DQ5 | PA59 | 数据输入输出 5 |
| DQ6 | PA62 | 数据输入输出 6 |
| DQ7 | PA64 | 数据输入输出 7 |

</div>

<div align="center"><em>表 5.5-4: QSPI2 NOR/NAND Flash 或 PSRAM</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CS# | GPIO9 | PA61 | 片选，低有效 |
| SO | GPIO7 | PA65 | 数据输入（数据输入输出 1） |
| WP# | GPIO6 | PA66 | 写保护输出（数据输入输出 2） |
| SI | GPIO8 | PA63 | 数据输出（数据输入输出 0） |
| SCLK | GPIO10 | PA60 | 串行时钟输出 |
| Hold# | GPIO5 | PA68 | 数据输出（数据输入输出 3） |

</div>

<div align="center"><em>表 5.5-5: QSPI3 NOR/NAND Flash 或 PSRAM</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CS# | GPIO16 | PA45 | 片选，低有效 |
| SO | GPIO14 | PA49 | 数据输入（数据输入输出 1） |
| WP# | GPIO13 | PA51 | 写保护输出（数据输入输出 2） |
| SI | GPIO15 | PA47 | 数据输出（数据输入输出 0） |
| SCLK | GPIO17 | PA44 | 串行时钟输出 |
| Hold# | GPIO12 | PA55 | 数据输出（数据输入输出 3） |

</div>

<div align="center"><em>表 5.5-6: QSPI4 NOR/NAND Flash 或 PSRAM</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CS# | - | PB33 | 片选，低有效 |
| SO | - | PB36 | 数据输入（数据输入输出 1） |
| WP# | - | PB37 | 写保护输出（数据输入输出 2） |
| SI | - | PB35 | 数据输出（数据输入输出 0） |
| SCLK | - | PB32 | 串行时钟输出 |
| Hold# | - | PB07 | 数据输出（数据输入输出 3） |

</div>

<div align="center"><em>表 5.5-7: SDIO1 4 位 eMMC/Micro SD</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | 时钟输入 |
| CMD | GPIO9 | PA36 | 命令输入 |
| DATA0 | GPIO8 | PA28 | 数据 0 |
| DATA1 | GPIO7 | PA29 | 数据 1 |
| DATA2 | GPIO6 | PA30 | 数据 2 |
| DATA3 | GPIO5 | PA31 | 数据 3 |

</div>

<div align="center"><em>表 5.5-8: SDIO1 8 位 eMMC</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO10 | PA34 | 时钟输入 |
| CMD | GPIO9 | PA36 | 命令输入 |
| DATA0 | GPIO8 | PA28 | 数据 0 |
| DATA1 | GPIO7 | PA29 | 数据 1 |
| DATA2 | GPIO6 | PA30 | 数据 2 |
| DATA3 | GPIO5 | PA31 | 数据 3 |
| DATA4 | GPIO15 | PA47 | 数据 4 |
| DATA5 | GPIO14 | PA49 | 数据 5 |
| DATA6 | GPIO13 | PA51 | 数据 6 |
| DATA7 | GPIO12 | PA55 | 数据 7 |

</div>

<div align="center"><em>表 5.5-9: SDIO2 4 位 eMMC/Micro SD</em></div>

<div align="center" markdown>

| 接口信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| CLK | GPIO17 | PA44 | 时钟输入 |
| CMD | GPIO16 | PA45 | 命令输入 |
| DATA0 | GPIO15 | PA47 | 数据 0 |
| DATA1 | GPIO14 | PA49 | 数据 1 |
| DATA2 | GPIO13 | PA51 | 数据 2 |
| DATA3 | GPIO12 | PA55 | 数据 3 |

</div>


### 5.6. 显示与触摸接口 { #56-display-and-touch-interfaces }

显示方案包括 MIPI DSI、SPI/QSPI、MCU8080 和 JDI。应在管脚分配和 PCB 布线前确定面板，统一评审接口位宽、时钟、电源控制、触摸中断和背光策略。

并行和串行 JDI 均可通过 PA 侧 LCDC1 或 PB 侧 LCDC2 复用相应信号。下表仅列出 PA/LCDC1 的管脚映射；思澈科技（SiFli）推荐采用 PB/LCDC2。原指南未给出 LCDC2 的逐管脚映射，实际设计应根据芯片复用功能表确认，不应由 LCDC1 表格推断。

<div align="center"><em>表 5.6-1：MIPI DSI 显示接口</em></div>

<div align="center" markdown>

| MIPI DSI 信号 | BGA145/169 管脚 | 说明 |
| :--- | :--- | :--- |
| CLKP | DSI_CLKP | MIPI 时钟信号 + |
| CLKN | DSI_CLKN | MIPI 时钟信号 - |
| D0P | DSI_D0P | MIPI 数据通道 0+ |
| D0N | DSI_D0N | MIPI 数据通道 0- |
| D1P | DSI_D1P | MIPI 数据通道 1+ |
| D1N | DSI_D1N | MIPI 数据通道 1- |
| - | AVDD18_DSI | MIPI 电源输入 |
| - | DSI_REXT | 外接 10 kΩ 电阻至地 |
| - | AVSS_DSI | 接地 |
| TE | PA77 | 发往 MCU 的防撕裂同步（TE）信号 |
| RESET | PB17 | 显示面板复位信号 |

</div>

显示管脚选用建议：

- TE 也可使用 PA 侧的其他 GPIO。
- 如果面板支持通过 DSI 协议传输 TE 信号，则无需另接 TE 管脚。
- RESET 也可使用 PB 侧的其他 GPIO。

<div align="center"><em>表 5.6-2：SPI/QSPI 显示接口</em></div>

<div align="center" markdown>

| SPI 信号 | QFN68 GPIO | BGA145/169 管脚 | 说明 |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | PB33 | 使能信号 |
| WRX_SCL | GPIO23 | PB32 | 时钟信号 |
| DCX | GPIO20 | PB36 | 4 线 SPI 模式下为数据/命令信号，Quad-SPI 模式下为数据 1 |
| SDI_RDX | GPIO21 | PB35 | 3/4 线 SPI 模式下为数据输入信号，Quad-SPI 模式下为数据 0 |
| SDO | GPIO21 | PB35 | 3/4 线 SPI 模式下为数据输出信号，需与 SDI_RDX 短接 |
| D[0] | GPIO19 | PB37 | Quad-SPI 模式下为数据 2 |
| D[1] | GPIO18 | PB07 | Quad-SPI 模式下为数据 3 |
| RESET | GPIO2 | PB17 | 显示面板复位信号 |
| TE | GPIO3 | PB77 | 发往 MCU 的防撕裂同步（TE）信号 |

</div>

显示管脚选用建议：

- TE 可使用 PA77，也可使用 PA 侧的其他 GPIO 模拟该信号。
- RESET 可使用任意 GPIO；如需支持常亮显示（AOD），建议使用 PB 侧的 GPIO。

<div align="center"><em>表 5.6-3：MCU8080 显示接口</em></div>

<div align="center" markdown>

| MCU8080 信号 | QFN68 GPIO | BGA145/169 管脚 | 说明 |
| :--- | :--- | :--- | :--- |
| CSX | GPIO22 | - | 片选 |
| WRX | GPIO23 | - | 向显示屏写入数据的选通信号 |
| DCX | GPIO20 | - | 显示数据/命令选择 |
| RDX | GPIO21 | - | 从显示控制器读取数据的读选通信号 |
| D[0] | GPIO19 | - | 数据 0 |
| D[1] | GPIO18 | - | 数据 1 |
| D[2] | GPIO17 | - | 数据 2 |
| D[3] | GPIO16 | - | 数据 3 |
| D[4] | GPIO15 | - | 数据 4 |
| D[5] | GPIO14 | - | 数据 5 |
| D[6] | GPIO13 | - | 数据 6 |
| D[7] | GPIO12 | - | 数据 7 |
| RESET | GPIO2 | - | 复位 |
| TE | GPIO3 | - | 发往 MCU 的防撕裂同步（TE）信号 |

</div>

显示管脚选用建议：

- TE 可使用 PA77，也可使用 PA 侧的其他 GPIO 模拟该信号。
- RESET 可使用任意 GPIO；如需支持常亮显示（AOD），建议使用 PB 侧的 GPIO。

思澈科技（SiFli）的《[硬件应用指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)》将 RDX 标为读选通信号，但英文说明末尾又写成“to write data”。这与 RDX 信号名及配套的 WRX 写选通信号相矛盾，因此本文将该处的“write”视为原文措辞错误。是否支持读回以及具体时序取决于所选显示控制器，请以该控制器的数据手册为准。

<div align="center"><em>表 5.6-4：JDI 并行显示接口</em></div>

<div align="center" markdown>

| JDI 信号 | MCU 管脚（LCDC1） | 说明 |
| :--- | :--- | :--- |
| JDI_VCK | PA20 | 垂直驱动移位时钟 |
| JDI_VST | PA31 | 垂直驱动启动信号 |
| JDI_XRST | PA34 | 水平/垂直驱动复位信号 |
| JDI_HCK | PA36 | 水平驱动移位时钟 |
| JDI_HST | PA38 | 水平驱动启动信号 |
| JDI_ENB | PA42 | 像素存储器写使能信号 |
| JDI_R1 | PA49 | 红色图像数据（奇数像素） |
| JDI_R2 | PA51 | 红色图像数据（偶数像素） |
| JDI_G1 | PA55 | 绿色图像数据（奇数像素） |
| JDI_G2 | PA77 | 绿色图像数据（偶数像素） |
| JDI_B1 | PA78 | 蓝色图像数据（奇数像素） |
| JDI_B2 | PA79 | 蓝色图像数据（偶数像素） |
| JDI_XFRP | PA45 | 液晶驱动信号（“On” 像素） |
| JDI_VCOM/FRP | PA47 | 公共电极驱动信号/液晶驱动信号（“Off” 像素） |

</div>

<div align="center"><em>表 5.6-5：JDI 串行显示接口</em></div>

<div align="center" markdown>

| JDI 信号 | MCU 管脚（LCDC1） | 说明 |
| :--- | :--- | :--- |
| JDI_SCS | PA31 | 片选信号 |
| JDI_SCLK | PA20 | 串行时钟信号 |
| JDI_SO | PA34 | 串行数据输出信号 |
| JDI_DISP | PA36 | 显示开关信号 |
| JDI_EXTCOMIN | PA38 | COM 反转极性输入 |

</div>

<div align="center"><em>表 5.6-6：触摸与背光接口</em></div>

<div align="center" markdown>

| 触摸屏和背光信号 | QFN68 GPIO | BGA145 管脚 | BGA169 管脚 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| 中断 | GPIO1 | PA79 | PA79 | 触摸状态中断信号（支持唤醒） |
| I2C1_SCL | GPIO25 | PA10 | PA10 | 触摸屏 I2C 时钟信号 |
| I2C1_SDA | GPIO24 | PA14 | PA14 | 触摸屏 I2C 数据信号 |
| BL_PWM | GPIO0 | - | - | 背光 PWM 控制信号 |
| 复位 | GPIO16 | PA00 | PA00 | 触摸复位信号 |
| 电源使能 | GPIO26 | PA06 | PA03 | 触摸屏电源使能信号 |

</div>

BL_PWM 应选择具备 GPTIM1_CHx 功能的 GPIO，并配置合适的上拉或下拉状态，避免冷启动时背光意外开启。

### 5.7. 唤醒、GPADC 与制造接口 { #57-wake-gpadc-and-manufacturing-interfaces }

唤醒、模拟、调试和量产访问需要结合整机结构与夹具设计一起规划。唤醒管脚需要明确默认电平和 ESD 防护；GPADC 分压应兼顾稳定时间和漏电；调试/下载接口在 EVT 和量产阶段都应可访问。

SF32LB55x 提供 4 路 HCPU 唤醒源（WKUP_A0–WKUP_A3）和 6 路 LCPU 唤醒源（WKUP_B0–WKUP_B5），各自只能唤醒对应 CPU。休眠（Hibernate）模式下，仅 LCPU 的 6 路唤醒源支持唤醒开机。这 10 路输入均不能悬空，应按实际功能配置外部上拉或下拉电阻，避免睡眠时漏电。

参考电路中，KEY1 连接 PB48，并通过 10 kΩ 电阻上拉至 VDD_1V8，同时配置了 ESD 保护和电容。KEY2 电路包含 10 kΩ 上拉、ESD 保护，以及可通过跳线选择连接至 PA08、PA77 或 PA78 的方案；其中 C0004 标注为 NF（不贴装）。这些管脚是参考电路示例，并不都具备唤醒功能：PA08 未列入表 5.7-1。应从该表中选择实际支持的唤醒输入，并确保每路输入在空闲时都有确定电平。

![图 5.7-1: 唤醒按键参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-KEY-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.7-1: 唤醒按键参考电路</em></div>

马达 PWM 应选用具备 GPTIM1_CHx 功能的 GPIO，并选择合适的 PU/PD 管脚状态，防止冷启动时误启动马达。参考电路采用 GPIO17（PA44）、低侧晶体管和 1 MΩ 栅极下拉电阻；马达使用 3 V 电源，MCU 使用独立的 3.3 V 电源。

![图 5.7-2: 马达驱动参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-VIB-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.7-2: 马达驱动参考电路</em></div>

<div align="center"><em>表 5.7-1：唤醒中断源</em></div>

<div align="center" markdown>

| 中断源 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| WKUP_A0 | GPIO3 | PA77 | HCPU 中断信号 0 |
| WKUP_A1 | GPIO2 | PA78 | HCPU 中断信号 1 |
| WKUP_A2 | GPIO1 | PA79 | HCPU 中断信号 2 |
| WKUP_A3 | GPIO0 | PA80 | HCPU 中断信号 3 |
| WKUP_B0 | GPIO43 | PB43 | LCPU 中断信号 0 |
| WKUP_B1 | GPIO44 | PB44 | LCPU 中断信号 1 |
| WKUP_B2 | GPIO45 | PB45 | LCPU 中断信号 2 |
| WKUP_B3 | GPIO46 | PB46 | LCPU 中断信号 3 |
| WKUP_B4 | GPIO47 | PB47 | LCPU 中断信号 4 |
| WKUP_B5 | GPIO48 | PB48 | LCPU 中断信号 5 |

</div>

思澈科技（SiFli）硬件应用说明将 GPADC 描述为 5 路、10 位，输入范围为 0–0.9 V。按保守设计处理时，仅当 VIN 低于 0.9 V 时才可直接接入；更高电压应先分压，确保 VADC 低于 0.9 V。电池电压测量可参考源文档约 5:1 的 R1:R2 比例和 MΩ 级电阻；分压静态电流越小，建立时间通常越长。示例在 VADC 与地之间接入 0.1 μF 电容。按 `VADC = VIN × R2 / (R1 + R2)` 核对最高电池电压及电阻容差；表 5.7-2 的静态电流是在 VIN = 4.2 V 下给出的，不能直接用于所有电池工况。

资料存在差异：按资料优先级更高的 [OpenSiFli 硬件应用指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)，GPADC 为 5 通道、10 位，输入范围为 0–0.9 V。本 V1.0 [原理图检查表](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)第 2 项规定最大输入电压为 1.0 V，但未说明通道数。与此不同，[SF32LB55x 规格书 V1.7.2 第 3.2.1 节](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)规定支持 8 路单端输入或 4 对差分输入，单端范围为 0–1.1 V，差分范围为 −0.7–0.7 V；其引脚表列出 GPADC_CH0–CH7。当前 [SDK ADC 指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)同样列出 8 个通道（0–7）和 1.1 V 最大采样电压。思澈科技（SiFli）尚未解释通道数和电压限值的差异。因此，本文暂按优先级更高的硬件应用指南，以 5 通道和 0–0.9 V 作为设计依据，等待思澈科技（SiFli）书面澄清。VADC 应低于 0.9 V；不要把 1.0 V 或 1.1 V 视为已批准的设计上限，并向思澈科技（SiFli）确认所选器件和封装的可用通道。

![图 5.7-3: GPADC 输入与分压参考电路](../../sf32-products/chips/assets/55x/SF32LB55x-GPADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.7-3: GPADC 输入与分压参考电路</em></div>

<div align="center"><em>表 5.7-2：GPADC 分压示例</em></div>

<div align="center" markdown>

| 电阻组合 | R1 (kΩ) ±1% | R2 (kΩ) ±1% | 电压整定时间（ms） | Iq (µA)（VIN = 4.2 V） |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 1000 | 220 | 138 | 3.44 |
| 2 | 2000 | 430 | 250 | 1.73 |
| 3 | 3000 | 680 | 302 | 1.14 |
| 4 | 4300 | 910 | - | 0.81 |
| 5 | 5100 | 1100 | 420 | 0.68 |

</div>

心率和加速度传感器的 I2C/SPI、控制及中断唤醒接口必须接到 LCPU。供电应选用低 Iq 的 DC-DC、LDO 或负载开关，以便按需开关传感器电源。

外接蓝牙（Bluetooth）音频模块通过 HCPU 的 UART1 通信。接口电平必须匹配，否则需增加电平转换器；关闭模块电源时，应同步关闭转换器电源，避免漏电。如果 SF32LB55x 进入待机（Standby）后音频模块仍需供电，且电源使能为低电平有效，必须使用 LCPU 中默认 PD 的 GPIO。

<div align="center"><em>表 5.7-3：调试与烧录接口</em></div>

<div align="center" markdown>

| UART 信号 | QFN68 | BGA145/169 | 说明 |
| :--- | :--- | :--- | :--- |
| TXD1 | GPIO13 | PA19 | UART1 RXD 信号 |
| RXD1 | GPIO14 | PA17 | UART1 TXD 信号 |
| TXD2 | - | PA07 | UART2 RXD 信号 |
| RXD2 | - | PA05 | UART2 TXD 信号 |
| TXD3 | GPIO46 | PB46 | UART3 RXD 信号，系统默认日志端口 |
| RXD3 | GPIO45 | PB45 | UART3 TXD 信号，系统默认日志端口 |
| TXD4 | - | PB14 | UART4 RXD 信号 |
| RXD4 | - | PB12 | UART4 TXD 信号 |
| TXD5 | - | PB11 | UART5 RXD 信号 |
| RXD5 | - | PB06 | UART5 TXD 信号 |
| SWCLK | GPIO41 | PB31 | SWD 时钟信号 |
| SWDIO | GPIO42 | PB34 | SWD 数据信号 |

</div>

UART RXD 不能悬空，固件初始化时应启用内部上拉。UART3 是默认日志接口。思澈科技（SiFli）提供脱机下载器，用于产线烧录和晶体校准。硬件至少预留 VBAT、GND、VDDIOA、VDDIOB、RSTN、Mode、SWDIO、SWCLK、RXD1、TXD1、RXD3 和 TXD3 测试点；产线夹具所需子集为 VBAT、GND、boot_mode、VDDIOB、RXD3 和 TXD3。VBAT 和 boot_mode 是源文档中的夹具信号名称，接线前应核对其对应的实际板级电源及 Mode 连接。

源图将 VDD_1V8 接至连接器第 1 脚（VTref）；SWDIO 和 SWCLK 各经一颗 22 Ω 串联电阻，分别接至第 7 脚和第 9 脚。标准 [J-Link SWD](https://kb.segger.com/20-pin_J-Link_Connector) 也将第 1 脚用作 [VTref](https://kb.segger.com/VTref)，即目标电压参考输入，而非探针电源输出。连接标准线缆前，应确认连接器方向及其与 1.8 V 电平的兼容性。

![图 5.7-4: 源文档 SWD 连接器：需核对转接线](../../sf32-products/chips/assets/55x/SF32LB55x-SWD-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.7-4: 源文档 SWD 连接器：需核对转接线</em></div>
