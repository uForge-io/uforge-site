---
icon: lucide/circuit-board
description: "SF32LB56x MCU 的原理图设计指导：电源系统、工作模式与唤醒源、时钟生成、RF、显示/触摸/背光接口，以及存储、传感器、音频、连接与制造。"
tags:
    - 硬件
    - 芯片
hide:
    - navigation
---

# SF32LB56x 硬件设计指南 — 原理图设计指导 { #sf32lb56x-hardware-design-guide-schematic-design-guidelines }

!!! note "SF32LB56x 硬件设计指南的一部分"
    如需选型和完整设计流程，请从 [SF32LB56x 硬件设计指南概览](SF32LB56x_hardware_design_guide.md) 开始；如需逐项核对，请参见[原理图核对表](SF32LB56x_schematic_checklist.md)，也可直接跳转至[PCB 布局指导](SF32LB56x_pcb_layout.md)。

## 5. 原理图设计指导 { #5-schematic-design-guidelines }

### 5.1. 电源系统 { #51-power-system }

处理器各电源轨、管脚附近所需的电容、PMIC 输出分配、复位时序和充电电路连接应放在一起评审。U 与 V 变体的电源设计方法一致，但电源管脚名称和负载分配不同。

<div align="center"><em>表 5.1-1：SF32LB56xU 处理器电源</em></div>

<div align="center" markdown>

| PMU 电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.7 | 1.8 | 3.6 | 100 | PVDD 电源输入 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX 为输出端，连接电感；内部电源输入连接电感另一端和外部电容 |
| LDO1_VOUT | - | 1.1 | - | 50 | LDO1 输出，外接电容 |
| LDO2_VOUT | - | 0.9 | - | 20 | LDO2 输出，外接电容 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 输出，外接电容 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 输出，外接电容 |
| MIC_BIAS | 1.4 | - | 2.8 | - | MIC 电源输出 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 模拟电源 + RFPA 电源输入 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 模拟音频电源 |
| VDDIO1 | 1.71 | 1.8 | 1.98 | - | 大核内部封装存储器电源输入 |
| VDDIO2 | 1.71 | 1.8 | 3.45 | - | PA GPIO（PA5~11 除外）电源输入 |
| VDDIO3 | 1.71 | 1.8 | 3.45 | - | PA5~11 电源输入 |
| VDDIO4 | 1.71 | 1.8 | 3.45 | - | PB GPIO 与小核内部封装 Flash 电源输入 |
| GPADC_VREF | - | - | - | - | GPADC 参考电压输入；仅外接电容，不需要外部供电 |
| AUD_VREF | - | - | - | - | 音频参考电压输入；仅外接电容，不需要外部供电 |

</div>

<div align="center"><em>表 5.1-2：SF32LB56xV 处理器电源</em></div>

<div align="center" markdown>

| PMU 电源管脚 | 最小电压 (V) | 典型电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| PVDD | 1.71 | 1.8 | 3.6 | 100 | PVDD 电源输入 |
| BUCK_LX BUCK_FB | - | 1.25 | - | 100 | BUCK_LX 为输出端，连接电感；内部电源输入连接电感另一端和外部电容 |
| LDO1_VOUT | - | 1.1 | - | 50 | LDO1 输出，连接外部电容 |
| LDO2_VOUT | - | 0.9 | - | 20 | LDO2 输出，连接外部电容 |
| VDD_RET | - | 0.9 | - | 1 | RET LDO 输出，连接外部电容 |
| VDD_RTC | - | 1.1 | - | 1 | RTC LDO 输出，连接外部电容 |
| MIC_BIAS | 1.4 | - | 2.8 | - | MIC 电源输出 |
| AVDD_BRF | 1.71 | 1.8 | 3.3 | 1 | RF 电源输入 |
| AVDD33_ANA | 3.15 | 3.3 | 3.45 | 50 | 模拟电源 + RFPA 电源输入 |
| AVDD33_AUD | 3.15 | 3.3 | 3.45 | 50 | 模拟音频电源 |
| VDDIOA | 1.71 | 1.8 | 3.45 | - | PA12-PA78 I/O 电源输入 |
| VDDIOA2 | 1.71 | 1.8 | 3.45 | - | PA0-PA11 I/O 电源输入 |
| VDDIOB | 1.71 | 1.8 | 3.45 | - | PB I/O 电源输入 |
| VDDIOSA | 1.71 | 1.8 | 1.98 | - | SIPA 电源输入 |
| VDDIOSB | 1.71 | 1.8 | 1.98 | - | SIPB 电源输入 |
| VDDIOSC | 1.71 | 1.8 | 1.98 | - | SIPC 电源输入 |
| GPADC_VREF | - | - | - | - | GPADC 参考电压输入；仅外接电容，不需要外部供电 |
| AUD_VREF | - | - | - | - | 音频参考电压输入；仅外接电容，不需要外部供电 |

</div>

<div align="center"><em>表 5.1-3：SF32LB56xU 电源电容要求</em></div>

<div align="center" markdown>

| 电源管脚 | 电容 | 说明 |
| :--- | :--- | :--- |
| PVDD | 0.1 µF + 10 µF | 至少放置 10 µF 和 0.1 µF 两个电容并靠近管脚。 |
| BUCK_LX BUCK_FB | 0.1 µF + 4.7 µF | 至少放置 4.7 µF 和 0.1 µF 两个电容并靠近管脚。 |
| LDO1_VOUT | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| LDO2_VOUT | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| VDD_RET | 0.47 µF | 至少放置一个 0.47 µF 电容并靠近管脚。 |
| VDD_RTC | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| AVDD33_ANA | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| GPADC_VREF | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| AVDD33_AUD | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| AUD_VREF | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| MIC_BIAS | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIO1 | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIO2 | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIO3 | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIO4 | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |

</div>

<div align="center"><em>表 5.1-4：SF32LB56xV 电源电容要求</em></div>

<div align="center" markdown>

| 电源管脚 | 电容 | 说明 |
| :--- | :--- | :--- |
| PVDD | 0.1 µF + 10 µF | 至少放置 10 µF 和 0.1 µF 两个电容并靠近管脚。 |
| BUCK_LX BUCK_FB | 0.1 µF + 4.7 µF | 至少放置 4.7 µF 和 0.1 µF 两个电容并靠近管脚。 |
| LDO1_VOUT | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| LDO2_VOUT | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| VDD_RET | 0.47 µF | 至少放置一个 0.47 µF 电容并靠近管脚。 |
| VDD_RTC | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| AVDD_BRF | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| AVDD33_ANA | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| GPADC_VREFP | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| AVDD33_AUD | 4.7 µF | 至少放置一个 4.7 µF 电容并靠近管脚。 |
| AUD_VREF | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| MIC_BIAS | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIOA | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIOA2 | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIOB | 1 µF | 至少放置一个 1 µF 电容并靠近管脚。 |
| VDDIOSA | 0.1 µF | 至少放置一个 0.1 µF 电容并靠近管脚。 |
| VDDIOSB | 0.1 µF | 至少放置一个 0.1 µF 电容并靠近管脚。 |
| VDDIOSC | 0.1 µF | 至少放置一个 0.1 µF 电容并靠近管脚。 |

</div>

<div align="center"><em>表 5.1-5：SF30147C PMIC 输出参数（U 变体示例）</em></div>

<div align="center" markdown>

| SF30147C 电源管脚 | 最小电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | 1.8 V 电源输出；U 变体的具体供电管脚分配请勿按此行推定 |
| LVSW1 | 1.8 | 1.8 | 100 | 1.8 V 电源输出 |
| LVSW2 | 1.8 | 1.8 | 100 | G-sensor 1.8 V 电源输入 |
| LVSW3 | 1.8 | 1.8 | 150 | 心率传感器 1.8 V 电源输入 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8 V 电源输入 |
| LVSW5 | 1.8 | 1.8 | 150 | 1.8 V 电源输出 |
| LDO1 | 2.8 | 3.3 | 100 | 2.8–3.3 V 电源输出；U 变体的具体供电管脚分配请勿按此行推定 |
| LDO2 | 2.8 | 3.3 | 100 | 马达电源输入 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3 V 电源输入 |
| LDO4 | 2.8 | 3.3 | 100 | 心率传感器 3.3 V 电源输入 |
| HVSW1 | 2.8 | 5 | 150 | 模拟 Class-K PA 电源输入 |
| HVSW2 | 2.8 | 5 | 150 | GPS 电源输入 |

</div>

!!! warning "U 变体 PMIC 管脚映射需核实"
    思澈科技（SiFli）针对 U 变体发布的电源分配表列出了 VDDIOA、VDDIOA2、VDDIOB、VDDIOSA/B/C 和 AVDD_BRF，但这些名称与同一指南中的 U 变体处理器电源表不一致。上表保留 PMIC 输出电压和电流限值；不要据此推断 U 变体的芯片电源管脚映射。布局定版前，应以对应版本的原理图和 SF30147C 数据手册核实具体连接。

<div align="center"><em>表 5.1-6：SF30147C PMIC 电源分配示例（V 变体）</em></div>

<div align="center" markdown>

| SF30147C 电源管脚 | 最小电压 (V) | 最大电压 (V) | 最大电流 (mA) | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| VBUCK | 1.8 | 1.8 | 500 | 为 SF32LB56xV 的 PVDD、VDDIOA、VDDIOA2、VDDIOB、VDDIOSA、VDDIOSB、VDDIOSC、AVDD_BRF 等提供 1.8 V 电源输入 |
| LVSW1 | 1.8 | 1.8 | 100 | I2S Class-K PA 逻辑电源输入 |
| LVSW2 | 1.8 | 1.8 | 100 | G-sensor 1.8 V 电源输入 |
| LVSW3 | 1.8 | 1.8 | 150 | 心率传感器 1.8 V 电源输入 |
| LVSW4 | 1.8 | 1.8 | 150 | LCD 1.8 V 电源输入 |
| LVSW5 | 1.8 | 1.8 | 150 | eMMC CORE 电源输入 |
| LDO1 | 2.8 | 3.3 | 100 | 为 SF32LB56xV 的 AVDD33_ANA、AVDD33_AUD、VDDIOA2 等提供 3.3 V 电源输入 |
| LDO2 | 2.8 | 3.3 | 100 | eMMC 或 SD NAND 电源输入 |
| LDO3 | 2.8 | 3.3 | 100 | LCD 3.3 V 电源输入 |
| LDO4 | 2.8 | 3.3 | 100 | 心率传感器 3.3 V 电源输入 |
| HVSW1 | 2.8 | 5 | 150 | 模拟 Class-K PA 电源输入 |
| HVSW2 | 2.8 | 5 | 150 | GPS 电源输入 |

</div>

![图 5.1-1：SF32LB56xU POR/BOR 时序](../../sf32-products/chips/assets/56x/SF32LB56xU-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-1：SF32LB56xU POR/BOR 时序</em></div>

![图 5.1-2：SF32LB56xV POR/BOR 时序](../../sf32-products/chips/assets/56x/sf32lb56xV-PORBOR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-2：SF32LB56xV POR/BOR 时序</em></div>

![图 5.1-3：SF32LB56xU BUCK 参考电路](../../sf32-products/chips/assets/56x/SF32LB56xU-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-3：SF32LB56xU BUCK 参考电路</em></div>

![图 5.1-4：SF32LB56xV BUCK 参考电路](../../sf32-products/chips/assets/56x/sf32lb56xV-BUCK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-4：SF32LB56xV BUCK 参考电路</em></div>

![图 5.1-5：SF32LB56xU LDO 参考电路](../../sf32-products/chips/assets/56x/SF32LB56xU-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-5：SF32LB56xU LDO 参考电路</em></div>

![图 5.1-6：SF32LB56xV LDO 参考电路](../../sf32-products/chips/assets/56x/sf32lb56xV-LDO.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-6：SF32LB56xV LDO 参考电路</em></div>

![图 5.1-7：SF32LB56xU 充电参考电路](../../sf32-products/chips/assets/56x/sf32lb56xU-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-7：SF32LB56xU 充电参考电路</em></div>

![图 5.1-8：SF32LB56xV 充电参考电路](../../sf32-products/chips/assets/56x/sf32lb56xV-CHG-1.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.1-8：SF32LB56xV 充电参考电路</em></div>

充电器不带电源路径管理时，系统与电池直接挂接 VBAT，成本较低，但下游电路无法与电池彻底断开，静态漏电会增加，且不满足 Shipping Mode 的低功耗要求。电池过放时，充电器的涓流电流必须大于系统及漏电负载电流之和（图中 i1+i2）；系统开机运行时，恒流充电电流也必须大于 i1+i2，否则系统负载会分走充电电流，电池可能无法充满。带电源路径管理的充电器将 VSYS 系统供电与 VBAT 电池充电分开，可支持 Shipping Mode；即使电池过放，也可由 VSYS 为系统供电。

U 变体可根据外设 I/O 电压和系统功耗目标选择三种供电拓扑。三种拓扑中，AVDD33_ANA 和 AVDD33_AUD 均由 3.3 V 供电。最低功耗方案为 PVDD、VDDIO1–VDDIO4 均使用 1.8 V，外设也选用 1.8 V I/O；中等功耗方案为 PVDD 和 VDDIO1 使用 1.8 V，VDDIO2–VDDIO4 及外设 I/O 使用 3.3 V；最高功耗方案仅将合封 PSRAM 对应的 VDDIO1 保持在 1.8 V，PVDD、VDDIO2–VDDIO4 及外设 I/O 均使用 3.3 V。建议通过负载开关对外部模块进行动态供电管理，未使用时默认关闭；必须常供电的模块应选择静态电流较低的器件。控制负载开关的 GPIO 硬件默认电平应与开关使能极性匹配，确保上电时开关默认关闭。思澈科技（SiFli）建议在使能端设置 1 MΩ 上拉或下拉电阻。

U 变体的 PMU 在 PVDD 上升至 1.5 V 时完成上电复位；PVDD 下降至 BOR 门限时会触发复位，该门限可在 1.5–2.5 V 范围内配置。

### 5.2. 工作模式与唤醒源 { #52-operating-modes-and-wake-sources }

工作模式、唤醒源、上拉电阻的供电电源和漏电流需要放在一起评审。按键、触摸、传感器中断、充电器事件和其他低功耗唤醒信号应优先使用支持唤醒的管脚。

<div align="center"><em>表 5.2-1：SF32LB56xU 工作模式</em></div>

<div align="center" markdown>

| 工作模式 | CPU | 外设 | SRAM | IO | LPTIM | 唤醒源 | 唤醒时间 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 活动（Active） | 运行 | 运行 | 可访问 | 可翻转 | 运行 |  |  |
| WFI/WFE | 停止 | 运行 | 可访问 | 可翻转 | 运行 | 任意中断 | < 0.5 us |
| DEEPWFI | 停止 | 运行 | 可访问 | 可翻转 | 运行 | 任意中断 | < 5 us |
| 轻度睡眠（Light Sleep） | 停止 | 停止 | 不可访问，全部保持 | 电平保持 | 运行 | RTC、GPIO、LPTIM、跨系统、蓝牙、比较器 | < 100 us |
| 深度睡眠（Deep Sleep） | 停止 | 停止 | 不可访问，全部保持 | 电平保持 | 运行 |  | < 300 us |
| 待机（Standby） | 复位 | 复位 | 不可访问，LP 全部保持，HP 仅保持 160 KB | 电平保持 | 运行 | RTC, 按键, LPTIM, 跨系统中断, 蓝牙 | 1.5 ms + 恢复时间 |
| 休眠（Hibernate，RTC 唤醒） | 复位 | 复位 | 数据不保持 | 高阻 | 复位 | RTC, 按键 | > 2 ms |
| 休眠（Hibernate，管脚唤醒） | 复位 | 复位 | 数据不保持 | 高阻 | 复位 | 按键 | > 2 ms |

</div>

<div align="center"><em>表 5.2-2：SF32LB56xV 工作模式</em></div>

<div align="center" markdown>

| 工作模式 | CPU | 外设 | SRAM | IO | LPTIM | 唤醒源 | 唤醒时间 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 活动（Active） | 运行 | 运行 | 可访问 | 可翻转 | 运行 |  |  |
| WFI/WFE | 停止 | 运行 | 可访问 | 可翻转 | 运行 | 任意中断 | < 0.5 us |
| DEEPWFI | 停止 | 运行 | 可访问 | 可翻转 | 运行 | 任意中断 | < 5 us |
| 轻度睡眠（Light Sleep） | 停止 | 停止 | 不可访问，全部保持 | 电平保持 | 运行 | RTC/GPIO/LPTIM/LPCOMP/跨系统中断/蓝牙 | < 100 us |
| 深度睡眠（Deep Sleep） | 停止 | 停止 | 不可访问，全部保持 | 电平保持 | 运行 | RTC/GPIO/LPTIM/LPCOMP/跨系统中断/蓝牙 | < 300 us |
| 待机（Standby） | 复位 | 复位 | 不可访问，LP 全部保持，HP 仅保持 160 KB | 电平保持 | 运行 | RTC/按键/LPTIM/ 跨系统中断/蓝牙 | 1.5 ms + 恢复时间 |
| 休眠（Hibernate，RTC 唤醒） | 复位 | 复位 | 数据不保持 | 高阻 | 复位 | RTC/按键 | > 2 ms |
| 休眠（Hibernate，管脚唤醒） | 复位 | 复位 | 数据不保持 | 高阻 | 复位 | 按键 | > 2 ms |

</div>

<div align="center"><em>表 5.2-3：SF32LB56xU 唤醒中断源</em></div>

<div align="center" markdown>

| 中断源 | 管脚 | 说明 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 中断信号 0 |
| WKUP_PIN1 | PB33 | 中断信号 1 |
| WKUP_PIN2 | PB34 | 中断信号 2 |
| WKUP_PIN5 | PA50 | 中断信号 5 |
| WKUP_PIN6 | PA51 | 中断信号 6 |
| WKUP_PIN10 | PBR0 | 中断信号 10 |
| WKUP_PIN11 | PBR1 | 中断信号 11 |
| WKUP_PIN12 | PBR2 | 中断信号 12 |

</div>

<div align="center"><em>表 5.2-4：SF32LB56xV 唤醒中断源</em></div>

<div align="center" markdown>

| 中断源 | 管脚 | 说明 |
| :--- | :--- | :--- |
| WKUP_PIN0 | PB32 | 中断信号 0 |
| WKUP_PIN1 | PB33 | 中断信号 1 |
| WKUP_PIN2 | PB34 | 中断信号 2 |
| WKUP_PIN3 | PB35 | 中断信号 3 |
| WKUP_PIN4 | PB36 | 中断信号 4 |
| WKUP_PIN5 | PA50 | 中断信号 5 |
| WKUP_PIN6 | PA51 | 中断信号 6 |
| WKUP_PIN7 | PA52 | 中断信号 7 |
| WKUP_PIN8 | PA53 | 中断信号 8 |
| WKUP_PIN9 | PA54 | 中断信号 9 |
| WKUP_PIN10 | PBR0 | 中断信号 10 |
| WKUP_PIN11 | PBR1 | 中断信号 11 |
| WKUP_PIN12 | PBR2 | 中断信号 12 |
| WKUP_PIN13 | PBR3 | 中断信号 13 |

</div>

启动模式由 Mode 管脚选择：高电平进入下载模式；低电平时 ROM 检查用户程序，若存在则启动用户程序，否则进入下载模式。U 变体 Mode 管脚内部下拉、不使用时可悬空，且与 VDDIO2 同属一个电压域；V 变体 Mode 管脚应通过 10 kΩ 电阻上拉或下拉以保持稳定，不能悬空或受干扰翻转，且与 VDDIOA 同属一个电压域。量产板应预留 Mode 测试点；开发板可预留跳线，便于故障恢复。

低功耗关机设计还需处理存储器 IO 供电。U 变体处于待机（Standby）时，GPIO 电平可保持，VDDIO1 可持续供电；MPI1/MPI2 上的存储器应进入低功耗模式。处于休眠（Hibernate）时，GPIO 电平不保持，应关闭 VDDIO1 以避免合封存储器 IO 漏电。V 变体处于待机时，相关合封存储器 IO 可保持供电；处于休眠时，应关闭 VDDIOSA 和 VDDIOSB（由 PBR0 控制），并在进入休眠前使 NOR Flash 进入 Deep Power-Down；VDDIOSC 需保持供电。

### 5.3. 时钟生成 { #53-clock-generation }

<div align="center"><em>表 5.3-1：晶体要求</em></div>

<div align="center" markdown>

| 晶体 | 晶体规格要求 | 说明 |
| :--- | :--- | :--- |
| 48 MHz | 7 pF ≤ CL ≤ 12 pF（推荐值：8.8 pF）；△F/F0 ≤ ±10 ppm；ESR ≤ 30 Ω（推荐值：22 Ω） | 晶体振荡器的功耗与 CL 和 ESR 有关。CL 和 ESR 越小，功耗越低。为降低功耗，建议在规格范围内选择 CL 和 ESR 相对较小的器件，并在晶体旁预留并联匹配电容的位置；当 CL < 12 pF 时，无需贴装外部电容。 |
| 32.768 kHz | CL ≤ 12.5 pF（推荐值：7 pF）；△F/F0 ≤ ±20 ppm；ESR ≤ 80 kΩ（推荐值：38 kΩ） | 晶体振荡器的功耗与 CL 和 ESR 有关。CL 和 ESR 越小，功耗越低。为降低功耗，建议在规格范围内选择 CL 和 ESR 相对较小的器件，并在晶体旁预留并联匹配电容的位置；当 CL < 12.5 pF 时，无需贴装外部电容。 |

</div>

<div align="center"><em>表 5.3-2：推荐晶体型号</em></div>

<div align="center" markdown>

| 型号 | 厂商 | 参数 |
| :--- | :--- | :--- |
| E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz；△F/F0 = −6～+8 ppm；CL = 8.8 pF；ESR ≤ 22 Ω；TOPR = −30～+85 °C；封装：2016（公制） |
| ETST00327000LE | Hosonic | F0 = 32.768 kHz；△F/F0 = −20～+20 ppm；CL = 7 pF；ESR ≤ 70 kΩ；TOPR = −40～+85 °C；封装：3215（公制） |
| SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz；△F/F0 = −10～+10 ppm；CL = 8.8 pF；ESR ≤ 40 Ω；TOPR = −20～+75 °C；封装：2016（公制） |
| SF32K32768D71T01 | TKD | F0 = 32.768 kHz；△F/F0 = −20～+20 ppm；CL = 7 pF；ESR ≤ 70 kΩ；TOPR = −40～+85 °C；封装：3215（公制） |

</div>

48 MHz 和 32.768 kHz 晶体应靠近芯片，预留匹配电容，并避免 BUCK、RF、显示、马达和充电器噪声耦合到晶体走线。

### 5.4. RF { #54-rf }

SF32LB56xU 和 SF32LB56xV 的 RF 走线均应按 50 Ω 控制阻抗设计。如果所选天线已经完成匹配，通常不需要额外 RF 器件，但设计中仍应预留 π 型匹配网络，用于杂散滤波和最终天线调试。

RF 匹配网络应靠近芯片端放置，而不是靠近天线端。AVDD_BRF 滤波电容应靠近芯片管脚，电容地端应直接连接主地。RF 走线尽量走表层，避免过孔和锐角，走线两侧增加密集屏蔽地孔，并避免 DC-DC、VBAT、晶体、高速时钟、I2C、SPI、SDIO、I2S、UART 等信号穿越 RF 区域。

### 5.5. 显示、触摸与背光接口 { #55-display-touch-and-backlight-interfaces }

显示接口选择是封装级决策。U 变体文档给出 SPI/QSPI 和 JDI 显示选项；V 变体还给出 MCU8080 和 DPI 选项。触摸中断、复位和背光控制应结合唤醒与量产访问一起分配。

<div align="center"><em>表 5.5-1：显示驱动示例</em></div>

<div align="center" markdown>

| 型号 | 厂商 | 分辨率 | 类型 | 接口 |
| :--- | :--- | :--- | :--- | :--- |
| RM69090 | Raydium | 368*448 | AMOLED | 三线 SPI、四线 SPI、双数据线 SPI、四数据线 SPI、MIPI-DSI |
| RM69330 | Raydium | 454*454 | AMOLED | 三线 SPI、四线 SPI、双数据线 SPI、四数据线 SPI、8 位 8080 系列 MCU、MIPI-DSI |
| ILI8688E | ILITEK | 368*448 | AMOLED | 四数据线 SPI、MIPI-DSI |
| SH8601A | Shine World Technology | 454*454 | AMOLED | 三线 SPI、四线 SPI、双数据线 SPI、四数据线 SPI、8 位 8080 系列 MCU、MIPI-DSI |
| SPD2012 | Solomon | 356*400 | TFT | 四数据线 SPI |
| GC9C01 | Galaxycore | 360*360 | TFT | 四数据线 SPI |
| ST77903 | Sitronix | 400*400 | TFT | 四数据线 SPI |

</div>

<div align="center"><em>表 5.5-2：SF32LB56xU SPI/QSPI 显示接口</em></div>

<div align="center" markdown>

| SPI 信号 | SF32LB56xU 管脚 | SS6700A 管脚 | 说明 |
| :--- | :--- | :--- | :--- |
| CSX | PA36 | PA36 | 使能信号 |
| WRX_SCL | PA37 | PA37 | 时钟信号 |
| DCX | PA39 | PA39 | 4 线 SPI 模式下为数据/命令信号，Quad-SPI 模式下为数据 1 |
| SDI_RDX | PA38 | PA38 | 3/4 线 SPI 模式下为数据输入信号，Quad-SPI 模式下为数据 0 |
| SDO | PA38 | PA38 | 3/4 线 SPI 模式下为数据输出信号，需与 SDI_RDX 短接 |
| D0 | PA40 | PA40 | Quad-SPI 模式下的数据 2 |
| D1 | PA41 | PA41 | Quad-SPI 模式下的数据 3 |
| REST | PA05 | PB04 | 显示面板复位信号 |
| TE | PA33 | PA33 | 防撕裂同步（TE）信号，用于 MCU 帧同步 |

</div>

<div align="center"><em>表 5.5-3：SF32LB56xU JDI 显示接口</em></div>

<div align="center" markdown>

| JDI 信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | 片选信号 |
| JDI_SCLK | PA41 | 串行时钟信号 |
| JDI_SO | PA40 | 串行数据输出信号 |
| JDI_DISP | PA36 | 显示开关信号 |
| JDI_EXTCOMIN | PA38 | COM 反转极性输入 |

</div>

<div align="center"><em>表 5.5-4：SF32LB56xU 触摸与背光接口</em></div>

<div align="center" markdown>

| 触摸屏和背光信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| 中断 | PA50 | 触摸状态中断信号（支持唤醒） |
| I2C1_SCL | PA48 | 触摸屏 I2C 时钟信号 |
| I2C1_SDA | PA49 | 触摸屏 I2C 数据信号 |
| BL_PWM | PA31 | 背光 PWM 控制信号 |
| 复位 | PB18 | 触摸复位信号 |

</div>

<div align="center"><em>表 5.5-5：SF32LB56xV SPI/QSPI 显示接口</em></div>

<div align="center" markdown>

| SPI 信号 | I/O | 说明 |
| :--- | :--- | :--- |
| CSX | PA36 | 使能信号 |
| WRX_SCL | PA37 | 时钟信号 |
| DCX | PA39 | 4 线 SPI 模式下为数据/命令信号，Quad-SPI 模式下为数据 1 |
| SDI_RDX | PA38 | 3/4 线 SPI 模式下为数据输入信号，Quad-SPI 模式下为数据 0 |
| SDO | PA38 | 3/4 线 SPI 模式下为数据输出信号，需与 SDI_RDX 短接 |
| D[0] | PA40 | Quad-SPI 模式下的数据 2 |
| D[1] | PA41 | Quad-SPI 模式下的数据 3 |
| REST | PA43 | 显示复位信号 |
| TE | PA33 | 防撕裂同步（TE）信号，用于 MCU 帧同步 |

</div>

<div align="center"><em>表 5.5-6：SF32LB56xV MCU8080 显示接口</em></div>

<div align="center" markdown>

| MCU8080 信号 | I/O | 说明 |
| :--- | :--- | :--- |
| CSX | PA36 | 片选 |
| WRX | PA37 | 写数据选通信号 |
| DCX | PA39 | 显示数据/命令选择 |
| RDX | PA38 | 读数据选通信号 |
| D[0] | PA40 | 数据 0 |
| D[1] | PA41 | 数据 1 |
| D[2] | PA28 | 数据 2 |
| D[3] | PA29 | 数据 3 |
| D[4] | PA30 | 数据 4 |
| D[5] | PA31 | 数据 5 |
| D[6] | PA32 | 数据 6 |
| D[7] | PA34 | 数据 7 |
| REST | PA43 | 复位 |
| TE | PA33 | 防撕裂同步（TE）信号，用于 MCU 帧同步 |

</div>

<div align="center"><em>表 5.5-7：SF32LB56xV DPI 显示接口</em></div>

<div align="center" markdown>

| DPI 信号 | I/O | 说明 |
| :--- | :--- | :--- |
| CLK | PA45 | 时钟信号 |
| DE | PA47 | 数据使能信号 |
| HSYNC | PA44 | 水平同步信号 |
| VSYNC | PA42 | 垂直同步信号 |
| SD | PA50 | 控制显示关闭 |
| CM | PA51 | 在正常色彩模式与低色彩模式之间切换 |
| R0 | PA14 | 像素信号 |
| R1 | PA13 | 像素信号 |
| R2 | PA16 | 像素信号 |
| R3 | PA24 | 像素信号 |
| R4 | PA19 | 像素信号 |
| R5 | PA21 | 像素信号 |
| R6 | PA23 | 像素信号 |
| R7 | PA25 | 像素信号 |
| G0 | PA28 | 像素信号 |
| G1 | PA30 | 像素信号 |
| G2 | PA32 | 像素信号 |
| G3 | PA33 | 像素信号 |
| G4 | PA34 | 像素信号 |
| G5 | PA29 | 像素信号 |
| G6 | PA31 | 像素信号 |
| G7 | PA35 | 像素信号 |
| B0 | PA36 | 像素信号 |
| B1 | PA37 | 像素信号 |
| B2 | PA38 | 像素信号 |
| B3 | PA43 | 像素信号 |
| B4 | PA41 | 像素信号 |
| B5 | PA39 | 像素信号 |
| B6 | PA40 | 像素信号 |
| B7 | PA46 | 像素信号 |

</div>

<div align="center"><em>表 5.5-8：SF32LB56xV JDI 并行显示接口</em></div>

<div align="center" markdown>

| JDI 信号 | I/O | 说明 |
| :--- | :--- | :--- |
| JDI_VCK | PA41 | 垂直驱动移位时钟 |
| JDI_VST | PA40 | 垂直驱动启动信号 |
| JDI_XRST | PA39 | 水平/垂直驱动复位信号 |
| JDI_HCK | PA36 | 水平驱动移位时钟 |
| JDI_HST | PA38 | 水平驱动启动信号 |
| JDI_ENB | PA43 | 像素存储器写使能信号 |
| JDI_R1 | PA29 | 红色图像数据（奇数像素） |
| JDI_R2 | PA31 | 红色图像数据（偶数像素） |
| JDI_G1 | PA34 | 绿色图像数据（奇数像素） |
| JDI_G2 | PA32 | 绿色图像数据（偶数像素） |
| JDI_B1 | PA30 | 蓝色图像数据（奇数像素） |
| JDI_B2 | PA28 | 蓝色图像数据（偶数像素） |
| JDI_XFRP | PBR1 | 液晶驱动信号（“开”像素） |
| JDI_VCOM/FRP | PBR2 | 公共电极驱动信号 / 液晶驱动信号（“关”像素） |

</div>

<div align="center"><em>表 5.5-9：SF32LB56xV JDI 串行显示接口</em></div>

<div align="center" markdown>

| JDI 信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| JDI_SCS | PA39 | 片选信号 |
| JDI_SCLK | PA41 | 串行时钟信号 |
| JDI_SO | PA40 | 串行数据输出信号 |
| JDI_DISP | PA36 | 显示开关信号 |
| JDI_EXTCOMIN | PA38 | COM 反转极性输入 |

</div>

<div align="center"><em>表 5.5-10：SF32LB56xV 触摸与背光接口</em></div>

<div align="center" markdown>

| 触摸屏和背光信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| 中断 | PA50 | 触摸状态中断信号（支持唤醒） |
| I2C1_SCL | PA48 | 触摸屏 I2C 时钟信号 |
| I2C1_SDA | PA49 | 触摸屏 I2C 数据信号 |
| BL_PWM | PA35 | 背光 PWM 控制信号 |
| 复位 | PA44 | 触摸复位信号 |

</div>

### 5.6. 存储、传感器、音频与连接接口 { #56-storage-sensors-audio-and-connectivity }

存储和显示总线不应独立分配，因为二者都会占用关键 GPIO 组，并可能决定 PCB 叠层。原理图冻结前应确认启动存储类型、上拉、电源域、电源开关行为和夹具访问方式。

<div align="center"><em>表 5.6-1：SF32LB56xU QSPI Flash 接口</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 信号 | 说明 |
| :--- | :--- | :--- |
| CS# | PA06 | 片选，低有效 |
| SO | PA07 | 数据输入（数据输入输出 1） |
| WP# | PA08 | 写保护输出（数据输入输出 2） |
| SI | PA09 | 数据输出（数据输入输出 0） |
| SCLK | PA10 | 串行时钟输出 |
| Hold# | PA11 | 数据输出（数据输入输出 3） |

</div>

<div align="center"><em>表 5.6-2：SF32LB56xU SDIO Flash 接口</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 信号 | 说明 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | 命令信号 |
| SD2_D1 | PA11 | 数据 1 |
| SD2_D0 | PA10 | 数据 0 |
| SD2_CLK | PA08 | 时钟信号 |
| SD2_D2 | PA06 | 数据 2 |
| SD2_D3 | PA07 | 数据 3 |

</div>

<div align="center"><em>表 5.6-3：SF32LB56xV QSPI Flash 接口</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 信号 | 说明 |
| :--- | :--- | :--- |
| CS# | PA06 | 片选，低有效 |
| SO | PA07 | 数据输入（数据输入输出 1） |
| WP# | PA08 | 写保护输出（数据输入输出 2） |
| SI | PA09 | 数据输出（数据输入输出 0） |
| SCLK | PA10 | 串行时钟输出 |
| Hold# | PA11 | 数据输出（数据输入输出 3） |

</div>

<div align="center"><em>表 5.6-4：SF32LB56xV SDIO Flash 接口</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 信号 | 说明 |
| :--- | :--- | :--- |
| SD2_CMD | PA09 | 命令信号 |
| SD2_D1 | PA11 | 数据 1 |
| SD2_D0 | PA10 | 数据 0 |
| SD2_CLK | PA08 | 时钟信号 |
| SD2_D2 | PA06 | 数据 2 |
| SD2_D3 | PA07 | 数据 3 |

</div>

<div align="center"><em>表 5.6-5：SF32LB56xV eMMC 接口</em></div>

<div align="center" markdown>

| eMMC 信号 | I/O 信号 | 说明 |
| :--- | :--- | :--- |
| SD1_CMD | PA27 | 命令信号 |
| SD1_CLK | PA26 | 时钟信号 |
| SD1_D0 | PA22 | 数据 0 |
| SD1_D1 | PA15 | 数据 1 |
| SD1_D2 | PA12 | 数据 6 |
| SD1_D3 | PA20 | 数据 3 |
| SD1_D4 | PA21 | 数据 4 |
| SD1_D5 | PA19 | 数据 5 |
| SD1_D6 | PA13 | 数据 6 |
| SD1_D7 | PA14 | 数据 7 |

</div>

!!! warning "核实 SF32LB56xV 的 SD1 数据线映射"
    思澈科技（SiFli）发布的原表将 PA12 标为 SD1_D2，但描述为 `Data 6`；同表还将 SD1_D6 标为 `Data 6`，且没有 `Data 2` 行。布线前请对照正式 pin-mux 文档确认实际信号映射。本文保留了原表中的这些条目。

<div align="center"><em>表 5.6-6：传感器 I2C 接口</em></div>

<div align="center" markdown>

| I2C 信号 | I/O | 说明 |
| :--- | :--- | :--- |
| SDA | PA18 | 追光传感器 I2C 数据信号 |
| SCL | PA17 | 追光传感器 I2C 时钟信号 |

</div>

存储接口的 IO 电源域需与外接存储器的接口电平匹配：U 变体存储 IO 使用 VDDIO3，V 变体使用 VDDIOA2。SPI NAND Flash 的 Hold# 管脚应通过 10 kΩ 电阻上拉至该 Flash 的供电电源。V 变体可通过 SD1 连接 eMMC；U 变体使用 SD2 存储接口，不应套用 V 变体的 SD1/eMMC 管脚表。

<div align="center"><em>表 5.6-7：SF32LB56xU 音频接口</em></div>

<div align="center" markdown>

| 音频信号 | I/O | 说明 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 差分 P 或单端模拟麦克风输入 |
| AU_ADC1N | ADCN | 差分模拟麦克风输入 N 或 GND |
| AU_DAC1P | DACP | 差分模拟输出 P |
| AU_DAC1N | DACN | 差分模拟输出 N |

</div>

<div align="center"><em>表 5.6-8：SF32LB56xV 音频接口</em></div>

<div align="center" markdown>

| 音频信号 | I/O | 说明 |
| :--- | :--- | :--- |
| AU_ADC1P | ADCP | 差分 P 或单端模拟麦克风输入 |
| AU_ADC1N | ADCN | 差分模拟麦克风输入 N 或 GND |
| AU_DAC1P | DACP | 差分模拟输出 P |
| AU_DAC1N | DACN | 差分模拟输出 N |
| I2S1_LRCK | PA71 | I2S2 帧时钟 |
| I2S1_SDI | PA69 | I2S2 数据输入 |
| I2S1_SDO | PA64 | I2S2 数据输出 |
| I2S1_BCK | PA73 | I2S2 位时钟 |

</div>

!!! warning "核实 V 变体的 I2S 实例"
    思澈科技（SiFli）的管脚表和原理图网络名均将这些管脚标为 I2S1_LRCK/SDI/SDO/BCK，但表格说明将其称为 I2S2 信号。目前无法据此确定实际外设实例；分配这些管脚前，请对照正式发布的 pin-mux 文档核实。

外接差分模拟麦克风时，ADC 输入应串联至少 2.2 µF 的隔直电容，麦克风由 MIC_BIAS 供电。U 变体的 MEMS 麦克风参考电路将 MIC_BIAS 经 1 kΩ 电阻供电，并在麦克风侧以 4.7 µF 电容旁路；麦克风输出参考电路另示 0.01 µF 耦合电容。模拟 DAC 输出应按差分对布线并做好包地屏蔽；U 变体参考功放电路包含 33 nF 输入耦合电容，差分低通滤波器应靠近芯片端。走线寄生电容应低于 10 pF，长度应小于 2 cm。V 变体还提供 I2S 接口，其 I2S 功放参考电路通过 I2C3 配置功放寄存器。音频供电与参考电容应靠近对应芯片管脚，模拟音频走线应远离开关电源和高速数字信号。

U/V 变体均提供 PWM，可用于振动马达控制；若马达启动电流不会导致系统不稳定，可直接由 VBAT 供电。启用 `BSP_PM_FREQ_SCALING`（定义为 `1`）时，HCPU 频率调节会改变 PA 管脚输出的 PWM 频率，因此此场景建议改用 PB 管脚。PB32 的开关机/复位输入为高电平有效，长按至少 10 s 触发复位。U 变体参考电路由 VDDIOB 经 1 kΩ 电阻连接按键，配置 10 kΩ 下拉和 0.1 µF 对地电容；V 变体参考电路由 VDD_1V8 经 1 kΩ 电阻连接，并配置 10 kΩ 下拉。普通按键及旋转编码器需按参考电路配置上拉；旋转后不能自行断开的机械编码器，其上拉电源应能在待机时关闭，以免产生漏电。

U 变体提供 PBR0–PBR2，V 变体提供 PBR0–PBR3。PBR0 在启动阶段由低变高，可用于控制外部负载开关；其余 PBR 管脚默认输出低电平。PBR 管脚在待机和休眠模式下仍可输出，也可输出 LPTIM；除 PBR0 外的 PBR 管脚可输出 32 kHz 时钟。PBR 管脚可配置为输入唤醒源，但 MCU 唤醒后不能再通过该输入接收中断。传感器 I2C、SPI、控制及中断唤醒信号优先规划到 LCPU 的 PB 管脚；传感器电源可由 SF30147C 的 LVSW 或 LDO 按需开关。

U/V 变体的所有 PA 管脚均可复用为 UART、I2C 或 GPTIM。U 变体中 PB32/PB33/PB34 和 PBR0/PBR1/PBR2 为例外；V 变体中 PB32–PB36 和 PBR0–PBR3 为例外。应将这些限制与唤醒、按键和 PBR 分配一并核对。

### 5.7. 制造 { #57-manufacturing }

应预留调试/烧录、量产烧录模式、晶体校准、电源测量点、RF 测试和 PMIC 控制状态查看手段。夹具需要能够给板卡供电、强制进入启动/下载模式、与芯片通信并采集校准数据。

U 变体至少预留 VBAT、GND、VDDIO2、Mode、SWDIO、SWCLK、UART4_RXD、UART4_TXD，以及 PB20、PB21、PB25 中的一个测试点。V 变体清单中的电源测试点为 VDDIOB，其余信号相同。连接 J-Link 时，应将调试器供电设为外部输入，由目标板为调试器供电；烧录和晶体校准夹具应能访问上述测试点。

<div align="center"><em>表 5.7-1：SF32LB56xU 调试与烧录接口</em></div>

<div align="center" markdown>

| 信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Link 时钟信号，调试接口 |
| SWDIO | PB13 | J-Link 数据信号，调试接口 |
| UART4_RXD | PB16 | UART 接收信号，下载和日志打印接口 |
| UART4_TXD | PB17 | UART 发送信号，下载和日志打印接口 |

</div>

<div align="center"><em>表 5.7-2：SF32LB56xV 调试与烧录接口</em></div>

<div align="center" markdown>

| 信号 | 管脚 | 说明 |
| :--- | :--- | :--- |
| SWCLK | PB15 | J-Link 时钟信号，调试接口 |
| SWDIO | PB13 | J-Link 数据信号，调试接口 |
| UART4_RXD | PB16 | UART 接收信号，下载和日志打印接口 |
| UART4_TXD | PB17 | UART 发送信号，下载和日志打印接口 |

</div>
