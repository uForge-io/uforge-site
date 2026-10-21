---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB57x MCU 的 PCB 布局指导：层叠、关键 PCB 约束、电源/晶体/RF/模拟/音频/高速走线、EMI/ESD/EOS 与参考图。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x 硬件设计指南 — PCB 布局指导 { #sf32lb57x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB57x 硬件设计指南的一部分"
    本页覆盖第 6 节，PCB 布局指导。返回[存储与制造](SF32LB57x_schematic_storage_mfg.md)，或继续阅读[设计评审检查表与参考资料](SF32LB57x_review_and_reference.md)。

## 6. PCB 布局指导 { #6-pcb-layout-guidelines }

### 6.1. 层叠建议 { #61-stack-up }

SF32LB57x 提供 QFN68L（7 × 7 mm、68 引脚、0.35 mm 间距）和 QFN80L（8 × 8 mm、80 引脚、0.35 mm 间距）封装。QFN 设计通常可采用 4 层 PTH PCB，元件可布置在 PCB 单面或双面，例如将电容等元件布置在 PCB 背面。<!-- BGA-ONLY -->BGA112 封装尺寸为 5.4 × 4.4 mm，共 112 个焊球，间距为 0.4 mm。BGA 设计通常至少需要 4 层，视扇出难度可采用一阶 HDI 盲埋孔工艺；器件也可采用单面或双面布局。<!-- /BGA-ONLY -->

良好的层叠设计应满足：

- 顶层便于放置关键器件并布设短连接。
- 内层完整地平面。
- 电源分配网络保持低阻抗。
- 高速、RF、晶体、音频和模拟信号有连续参考地。

以下为参考叠层图中的材料与总厚度范围，实际叠层和成品厚度应与 PCB 制造商确认：

<div align="center"><em>表 6.1-1：QFN 参考叠层材料与厚度</em></div>

<div align="center" markdown>

| 参考叠层 | 芯板 | 半固化片 | 总厚度范围 |
|:-----|:-----|:-----|:-----|
| QFN，1.6 mm | 1.1 mm H/HOZ 含铜芯板 | 7628 RC49%，材料标注 8.6 mil；厚度列为 8.28 mil（0.2104 mm） | 1.43～1.74 mm |
| QFN，0.8 mm | 0.25 mm H/HOZ 不含铜芯板 | 7628 RC49%，材料标注 8.6 mil；厚度列为 8.28 mil（0.2104 mm） | 0.67～0.87 mm |

</div>

!!! warning "原始资料中 QFN 半固化片标注与厚度栏存在冲突"
    原始 PCB 设计指南的 QFN 叠层图 3-1-2-1 和图 3-1-2-2（本文转录为表 6.1-1）将半固化片标为 `7628 RC49%, 8.6 mil`，但厚度栏给出的数值为 `8.28 mil (0.2104 mm)`。原资料没有解释差异原因，也没有指出哪项应作为制造控制值。未经思澈科技（SiFli）确认，不要自行择一或相互替代后用于正式叠层设计或投板。

<!-- BGA-ONLY -->
<div align="center"><em>表 6.1-2：BGA 参考叠层材料与厚度</em></div>

<div align="center" markdown>

| 参考叠层 | 芯板 | 半固化片 | 总厚度范围 |
|:-----|:-----|:-----|:-----|
| BGA，1.6 mm | 1.3 mm H/HOZ 含铜芯板 | 1080 RC67%，材料标注 3.3 mil；厚度列为 3.01 mil（0.0764 mm） | 1.37～1.67 mm |
| BGA，0.8 mm | 0.55 mm H/H 不含铜芯板 | 1080 RC67%，材料标注 3.3 mil；厚度列为 3.01 mil（0.0764 mm） | 0.70～0.90 mm |

</div>

!!! warning "原始资料中 BGA 半固化片标注与厚度栏存在冲突"
    原始 PCB 设计指南的 BGA 叠层图 3-1-2-3 和图 3-1-2-4（本文转录为表 6.1-2）将半固化片标为 `1080 RC67%, 3.3 mil`，但厚度栏给出的数值为 `3.01 mil (0.0764 mm)`。原资料没有解释差异原因，也没有指出哪项应作为制造控制值。未经思澈科技（SiFli）确认，不要自行择一或相互替代后用于正式叠层设计或投板。
<!-- /BGA-ONLY -->

上述四种参考叠层均采用 L1/L4 1 oz 铜箔（1.38 mil，0.0350 mm）；L2/L3 两侧的铜箔厚度均为 0.60 mil（0.0152 mm）。

对于 4 层 QFN 方案，推荐的层分配为：第 1 层（顶层）——铺设接地铜皮，并放置器件、布置信号线；第 2 层——完整地平面，不走线，以保持参考地连续；第 3 层——电源层，可按电源域分割，也可承载信号走线；第 4 层（底层）——铺设接地铜皮并布置信号线。

### 6.2. 关键 PCB 约束速查 { #62-critical-pcb-constraint-quick-reference }

<div align="center"><em>表 6.2-1：关键 PCB 约束速查</em></div>

<div align="center" markdown>

| 对象 | 约束 / 来源说明 | 说明 |
|:-----|:---------|:-----|
| `VBUS` / `VBAT` | 线宽不小于 0.4 mm（约 16 mil） | 充电和电池路径电流较大，走线短而宽，并远离敏感信号线。 |
| `VCC` / `PVDD` | 原始资料要求不一致：PCB 设计指南第 3.2.1 节要求 ≥0.4 mm；自查表 4-2-1-1 第 44 项（电池供电型号）要求 `VCC` ≥12 mil，第 47 项（3.3 V 供电型号）标题为 `PVDD`，核查要点却要求 `VCC` ≥12 mil。 | 须向思澈科技（SiFli）确认适用电源轨、型号范围和线宽；不能仅凭这些条目自行选定。 |
| `VDD33_VOUT1` / `VDD33_VOUT2` | 线宽不小于 10 mil | 仅适用于电池供电系列；需核对软启动限流、浪涌电流和允许负载。 |
| `BUCK_LX` / `BUCK_FB` | `BUCK_LX`：≥ 10 mil；`BUCK_FB`：> 0.25 mm | `BUCK_LX` 走线应短而宽；器件布局和避铜要求见 6.3 节。 |
| `AVDD_BRF` / `AVDD33_AUD` | 线宽不小于 8 mil | 模拟/RF/音频供电走线应短而干净，并分别滤波。 |
| USB DP/DN | 90 Ω 差分 | 应先经过 ESD 防护器件，避免支线（stub），并保持参考地连续。 |
| RF 天线走线 | 50 Ω 单端 | 优先走顶层，尽量少用过孔，保持参考地连续，并用接地过孔屏蔽。 |
| RF 走线两侧接地铜皮宽度 | 每侧不小于 60 mil | 两侧接地铜皮均通过多颗接地过孔可靠连接主地。 |
| 48 MHz 晶体线 | 约 3 mm 到 10 mm | 优先走顶层，进行包地屏蔽，并在晶体下方设置铜箔禁布区。 |
| 32.768 kHz 晶体线 | ≤ 10 mm | 两线之间应保持间距，进行包地屏蔽，并远离噪声源。 |
| 晶体位置 | 距芯片时钟管脚 ≥ 1.5 mm；距板边 > 1 mm；距 PA、充电和 PMU 等发热器件 ≥ 5 mm | 48 MHz 和 32.768 kHz 晶体均适用。 |
| MPI 总线 | 总长 ≤ 20 mm，组内长度偏差 ≤ 3 mm | 时钟、数据和命令信号成组布线，并保持参考地连续。 |
| SDIO 总线 | 总长 ≤ 50 mm，组内长度偏差 ≤ 6 mm | CLK、CMD、DATA 成组布线并保持参考地连续。 |
| `VDDIOA` | 线宽不小于 10 mil | 仅适用于 3.3 V 供电系列。 |

</div>

PTH 与 HDI 的线宽、间距和过孔参数参考图也给出了示例值：PTH 的最小及推荐线宽为 0.10 mm，最大线宽为 2.54 mm；其过孔示例的钻孔直径为 0.25 mm、焊盘直径为 0.45 mm。HDI 的最小及推荐线宽为 0.075 mm，最大线宽为 2.54 mm；微孔示例的钻孔直径为 0.10 mm、焊盘直径为 0.23 mm，通孔示例为 0.25 mm 和 0.45 mm。以上为参考图中的工艺示例，投板前应与 PCB 制造商确认其能力及实际规则。

### 6.3. 电源布局 { #63-power-layout }

- 大电流供电路径应短而宽。
- 充电路径应远离敏感的模拟、RF 和晶体信号走线。
- VCC、PVDD、VBUS 和 VBAT 的配套滤波电容应靠近芯片引脚。PCB 设计指南第 3.2.1 节规定 `VCC` / `PVDD` 线宽不小于 0.4 mm；自查表 4-2-1-1 第 47 项则给出相冲突的 12 mil（标题为 `PVDD`，核查要点为 `VCC`）。在思澈科技（SiFli）确认适用电源轨和线宽前，不要确定 VCC 或 PVDD 的最终线宽。其他电源输出（包括 VDD_VOUT1、VDD_VOUT2、VDD_RET、VDD_RTC、VDD18_VOUT、VDD33_VOUT1、VDD33_VOUT2、AVDD33_AUD 和 AVDD_BRF）的滤波电容也应就近放置，走线则根据输入电流采用短而宽的布线，以降低纹波并提高稳定性。
- 若 PVDD、AVDD_BRF、AVDD33 或 AVDD33_AUD 共用一路电源，应从电源源头分别引出支路，采用星形布线；不得让这些支路共用一段前置电源线。
- VBUS 和 VBAT 充电路径应采用独立的星形布线，不与其他线路共用路径；敏感信号不得与其平行布线。
- BUCK 电感及滤波电容应紧靠芯片引脚。BUCK_LX 走线应短而宽；BUCK_FB 走线宽度应大于 0.25 mm。DC/DC 输出滤波电容的接地端应通过多个接地过孔连接主地平面。电感下方的顶层应保持无铜，相邻层应保持完整参考地，且不得有其他信号穿过电感区域。
- 电容接地端应通过就近的过孔连接主地。
- 3.3 V 供电系列的关键模拟/RF/IO 电源轨应采用星形布线。

!!! warning "原始电源走线要求与电源轨标注存在未解决冲突"
    - **线宽与电源轨标注：** 原始 PCB 设计指南第 3.2.1 节要求 `VCC` 和 `PVDD` 均至少为 0.4 mm（约 15.7 mil）。原始自查表 4-2-1-1 第 44 项（电池供电型号）要求 `VCC` 至少为 12 mil；第 47 项（3.3 V 供电型号）标题为 `PVDD`，核查要点却要求 `VCC` 至少为 12 mil。原资料没有说明这些线宽如何协调，也没有说明第 47 项应以标题还是核查要点确定电源轨。不要推定修正值，也不要把一类供电型号的条目直接套用于另一类；定板前须向思澈科技（SiFli）确认适用电源轨、型号范围和线宽。
    - **输出名称：** 原始 PCB 设计指南第 3.2.1 节使用 `VDD_VOUT1` / `VDD_VOUT2`；原始自查表 4-2-1-1 第 45、46 项及本页 6.2 节速查表使用 `VDD33_VOUT1` / `VDD33_VOUT2`。原资料没有说明这些名称是否为别名或不同电源轨。第 46 项标题重复写成 `VDD33_VOUT1`，核查要点则写 `VDD33_VOUT2`。
    未经思澈科技（SiFli）确认，不要自行选定线宽、为第 47 项指定电源轨，或将两组输出名称视为等同。

### 6.4. 晶体布局 { #64-crystal-layout }

- 射频电路和主控芯片下方应保留完整、连续的参考地，不得分割或开槽。晶体区域的原始指导同时提到连续参考地和晶体下方避铜；详见下方警示。在思澈科技（SiFli）确认实际叠层的边界前，不要确定晶体区域的接地和避铜方案。
- 晶体应距芯片时钟管脚至少 1.5 mm，距板边超过 1 mm，距 PA、充电和 PMU 等发热器件至少 5 mm，以限制温升造成的频率漂移。原始资料给出封装周围顶层避铜至少 0.25 mm，并要求相邻层按参考设计设置禁布区，但未说明该尺寸与封装下方避铜范围的关系；布局放行前须向思澈科技（SiFli）确认适用边界。晶体正下方不得布设高频数字信号；最佳做法是不在该区域布设任何走线。晶体附近不得放置功率电感等磁性器件。
- XI/XO 走线只允许布设在顶层，不得换层。走线应短、对称并进行立体包地；两侧应密集布置接地过孔。晶体两端的对地负载电容应放在晶体两侧、靠近晶体的走线末端，电容接地焊盘应就近连接晶体地焊盘。电源过孔应尽量远离晶体走线。
- 48 MHz 晶体使用顶层走线，长度为 3～10 mm、线宽为 0.1 mm；48M_XI 与 48M_XO 的平行走线间距应至少为 0.15 mm。走线应进行立体包地，并远离 VBAT、DC/DC 和高速信号。晶体所在区域的顶层及相邻层均应设置禁布区。
- 32.768 kHz 晶体使用顶层走线，长度不超过 10 mm、线宽为 0.1 mm。走线模型要求 32K_XI 与 32K_XO 的平行间距至少为 0.15 mm；设计自查表则要求间距大于 2 倍线宽（按 0.1 mm 线宽计算即 >0.2 mm）。在思澈科技（SiFli）确认适用要求前，不要确定最终间距。走线应进行立体包地，晶体所在区域的顶层及相邻层均应设置禁布区。

!!! warning "原始晶体布局指南存在未解决冲突"
    - **接地屏蔽与避铜范围：** PCB 设计指南第 3.3 节要求晶体区域保持连续参考地，并在晶体周边顶层避铜；图 3-3-1（本文图 6.9-30）标注封装周边间距至少为 0.25 mm。原始自查表 4-3-1 第 6 项要求晶体器件及振荡走线区域完整布设 GND 屏蔽；第 7 项则规定 4 层 PTH 板仅在晶体下方顶层避铜，6 层 HDI 板在顶层和第 2 层均避铜。原资料没有界定接地屏蔽区与晶体避铜区的边界，也没有说明连续参考地要求如何适用于这些叠层指定的禁铜层。这是尚未解决的适用范围冲突；不要自行推定逐层的铺铜或接地方式。
    - **32.768 kHz 走线间距：** PCB 设计指南第 3.3 节的走线模型图 3-3-4（本文图 6.9-33）要求平行的 `32K_XI` / `32K_XO` 走线间距至少为 0.15 mm；原始自查表 4-3-1 第 9 项要求间距大于 2 倍基础线宽，按指南给出的 0.1 mm 线宽计算即大于 0.2 mm。两项给出的最小间距要求相互冲突。
    - **封装周边避铜尺寸的适用范围：** 图 3-3-1（本文图 6.9-30）要求封装周边顶层铜箔间距至少为 0.25 mm；原始自查表 4-3-1 第 7 项另行规定了两种叠层在晶体下方的禁铜层，但没有说明 0.25 mm 周边间距与封装下方禁铜区或相邻层禁布区之间的关系。
    以上冲突及范围说明缺失均未在思澈科技（SiFli）的原始资料中解决。布局放行前，须针对实际封装和叠层取得确认；不要在间距要求中自行择一，也不要自行推导逐层接地或避铜边界。

### 6.5. RF 布局 { #65-rf-layout }

- RF 匹配网络应靠近芯片并远离天线；AVDD_BRF 滤波电容应紧靠芯片引脚，其接地端通过过孔直接连接主地平面。
- RF 走线应尽量短，并尽可能减少过孔。
- 优先在顶层布置 RF 走线，避免换层；适用时建议线宽大于 10 mil。应进行立体包地，避免锐角和直角，并根据 PCB 叠层将阻抗控制为 50 Ω；走线两侧应密集布置接地过孔，形成连续的地过孔围栏。
- 天线净空应满足天线厂商要求和产品工业设计约束。
- 匹配器件焊盘与走线宽度不一致可能造成阻抗不连续。可按焊盘尺寸在其下方参考地层开窗，以改善阻抗连续性。
- 若使用 IPEX 天线座，其下方所有 PCB 层均应设置避铜区。PCB 天线应在实际 PCB 上进行仿真和调试；应预留 CLC 匹配网络，并尽量靠近天线布置。
- RF 走线应远离 LCD FPC、USB、SDIO、DC/DC、晶体和充电路径。

### 6.6. 模拟与音频 { #66-analog-and-audio }

- AVDD33_AUD、MIC_BIAS 和 AUD_VREF 的滤波电容应紧靠芯片引脚，电容接地端应可靠连接 PCB 主地。
- 模拟电源的去耦电容应靠近芯片放置。
- 音频差分走线应进行等长处理，RC 网络应靠近芯片放置。
- ADCP 输入端的外围器件应紧靠芯片引脚；走线应尽量短、进行立体包地，并远离强干扰信号。
- DACP/DACN 输出端的外围器件应紧靠芯片引脚；每组 P/N 信号应按差分规则布线，尽量缩短走线，并将寄生电容控制在 10 pF 以下。走线应进行立体包地，并远离强干扰信号。
- GPADC 引脚走线应进行立体包地，并远离电池检测、温度检测等可能造成干扰的电路。
- 避免大电流回流路径穿过音频区域。

### 6.7. 高速接口 { #67-high-speed-interfaces }

- USB DP/DN 应按 90 Ω 差分对布线，并先通过 ESD 防护器件。
- MPI 存储信号应紧密成组布线，总长不超过 20 mm，组内长度偏差不超过 3 mm；时钟、数据和命令信号均应进行立体包地，并保持参考地连续。
- SDIO 信号应集中成组布线，总长不超过 50 mm，组内长度偏差不超过 6 mm；时钟、命令和数据信号均应进行立体包地。
- RGB/DPI、8080、EPD 等并行显示总线应布置在连续的参考地平面上。
- USB PA35（USB_DP）和 PA36（USB_DN）应先经过 ESD 防护器件再接入芯片。USB 信号应按 90 Ω 差分阻抗布线并进行立体包地；ESD 器件的接地引脚应可靠连接主地。
- 高速时钟可预留串联电阻用于 EMI 调试。

### 6.8. EMI、ESD 与 EOS { #68-emi-esd-and-eos }

- 所有外部接口均应评估 ESD 防护。
- 避免在屏蔽罩外的表层对时钟、电源等噪声源进行长距离走线；这类信号应改走内层。
- ESD 防护器件应紧邻连接器对应引脚。信号必须先经过 ESD 器件再进入后级电路，防护器件前不得分支。其接地引脚应通过过孔直接连接主地，接地走线应短而宽。
- USB、充电口、电池座、按键、触摸、显示、心率传感器、天线口是重点保护对象。
- USB 充电线路的测试点应布置在 TVS 防护器件前端；电池座对应的 TVS 应位于芯片电路前端，使信号先经过 TVS 再到达芯片。
- 充电输入保护需同时考虑 OVP、EOS 和 ESD。

### 6.9. PCB 参考图 { #69-pcb-reference-figures }

以下 SF32LB57x 封装、焊盘、叠层、扇出、走线和防护图可作为新设计的主要 PCB 参考资料。

QFN80L 焊盘参考图中的中心裸露焊盘标注为 5.90 mm，而封装尺寸图标注为典型 5.50 mm（5.40～5.60 mm）。两幅图分别描述 PCB 焊盘和封装焊盘，不能当作相同尺寸直接互换；制作封装库前须核对具体封装版本及思澈科技（SiFli）的推荐焊盘。QFN68L/QFN80L 钢网参考图采用 0.125 mm 厚钢网，原图标注的中心焊盘锡膏覆盖率为 60%；开窗尺寸与覆盖率须由钢网厂复核。

<!-- BGA-ONLY -->
BGA112 钢网参考图采用 0.075 mm 厚钢网，112 个开窗为 0.18 mm 方形，圆角 R0.05 mm。
<!-- /BGA-ONLY -->

![图 6.9-1：QFN68L 7 x 7 x 0.9 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-BQFN770E05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-1：QFN68L 7 x 7 x 0.9 mm 封装尺寸</em></div>

![图 6.9-2：QFN68L 7 x 7 x 1.1 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-BQFN770D05-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-2：QFN68L 7 x 7 x 1.1 mm 封装尺寸</em></div>

![图 6.9-3：QFN68L PCB 焊盘图形](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-3：QFN68L PCB 焊盘图形</em></div>

![图 6.9-4：QFN68L 钢网开窗](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-4：QFN68L 钢网开窗</em></div>

![图 6.9-5：QFN80L 8 x 8 x 0.9 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-BQFN880E20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-5：QFN80L 8 x 8 x 0.9 mm 封装尺寸</em></div>

![图 6.9-6：QFN80L 8 x 8 x 1.1 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-BQFN880D20-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-6：QFN80L 8 x 8 x 1.1 mm 封装尺寸</em></div>

![图 6.9-7：QFN80L PCB 焊盘图形](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-7：QFN80L PCB 焊盘图形</em></div>

![图 6.9-8：QFN80L 钢网开窗](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80L-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-8：QFN80L 钢网开窗</em></div>

<!-- BGA-ONLY -->
![图 6.9-9：BGA112 5.4 x 4.4 x 0.98 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-ABGA451X33-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-9：BGA112 5.4 x 4.4 x 0.98 mm 封装尺寸</em></div>

![图 6.9-10：BGA112 5.4 x 4.4 x 1.03 mm 封装尺寸](../../sf32-products/chips/assets/57x/PO-ABGA451X34-A.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-10：BGA112 5.4 x 4.4 x 1.03 mm 封装尺寸</em></div>

![图 6.9-11：BGA112 PCB 焊盘图形](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-LAND-PATTERN.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-11：BGA112 PCB 焊盘图形</em></div>

![图 6.9-12：BGA112 钢网开窗](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PASTE.svg){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-12：BGA112 钢网开窗</em></div>
<!-- /BGA-ONLY -->

![图 6.9-13：QFN 1.6 mm PCB 参考叠层](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-13：QFN 1.6 mm PCB 参考叠层</em></div>

![图 6.9-14：QFN 0.8 mm PCB 参考叠层](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-14：QFN 0.8 mm PCB 参考叠层</em></div>

<!-- BGA-ONLY -->
![图 6.9-15：BGA 1.6 mm PCB 参考叠层](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-1P6-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-15：BGA 1.6 mm PCB 参考叠层</em></div>

![图 6.9-16：BGA 0.8 mm PCB 参考叠层](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-0P8-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-16：BGA 0.8 mm PCB 参考叠层</em></div>
<!-- /BGA-ONLY -->

![图 6.9-17：PTH 板设计规则](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-17：PTH 板设计规则</em></div>

![图 6.9-18：PTH 板过孔设计规则](../../sf32-products/chips/assets/57x/SF32LB57x-PTH-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-18：PTH 板过孔设计规则</em></div>

![图 6.9-19：HDI 板设计规则](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-19：HDI 板设计规则</em></div>

![图 6.9-20：HDI 板过孔设计规则](../../sf32-products/chips/assets/57x/SF32LB57x-HDI-PCB-VIA.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-20：HDI 板过孔设计规则</em></div>

![图 6.9-21：QFN68 顶层扇出参考](../../sf32-products/chips/assets/57x/SF32LB57x-QFN68-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-21：QFN68 顶层扇出参考</em></div>

![图 6.9-22：QFN80 顶层扇出参考](../../sf32-products/chips/assets/57x/SF32LB57x-QFN80-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-22：QFN80 顶层扇出参考</em></div>

<!-- BGA-ONLY -->
![图 6.9-23：BGA112 扇出参考](../../sf32-products/chips/assets/57x/SF32LB57x-BGA112-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-23：BGA112 扇出参考</em></div>
<!-- /BGA-ONLY -->

![图 6.9-24：QFN VCC 电源走线](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-24：QFN VCC 电源走线</em></div>

<!-- BGA-ONLY -->
![图 6.9-25：BGA VCC 电源走线](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-VCC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-25：BGA VCC 电源走线</em></div>
<!-- /BGA-ONLY -->

![图 6.9-26：QFN VBUS 与 VBAT 走线](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-26：QFN VBUS 与 VBAT 走线</em></div>

<!-- BGA-ONLY -->
![图 6.9-27：BGA VBUS 与 VBAT 走线](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-CHG.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-27：BGA VBUS 与 VBAT 走线</em></div>
<!-- /BGA-ONLY -->

![图 6.9-28：QFN DCDC 走线](../../sf32-products/chips/assets/57x/SF32LB57x-QFN-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-28：QFN DCDC 走线</em></div>

<!-- BGA-ONLY -->
![图 6.9-29：BGA DCDC 走线](../../sf32-products/chips/assets/57x/SF32LB57x-BGA-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-29：BGA DCDC 走线</em></div>
<!-- /BGA-ONLY -->

![图 6.9-30：晶体布局禁布区](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-30：晶体布局禁布区</em></div>

![图 6.9-31：48 MHz 晶体走线模型](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-31：48 MHz 晶体走线模型</em></div>

![图 6.9-32：48 MHz 晶体走线参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-32：48 MHz 晶体走线参考</em></div>

![图 6.9-33：32.768 kHz 晶体走线模型](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-33：32.768 kHz 晶体走线模型</em></div>

![图 6.9-34：32.768 kHz 晶体走线参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-34：32.768 kHz 晶体走线参考</em></div>

![图 6.9-35：RF 匹配网络布局](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-35：RF 匹配网络布局</em></div>

![图 6.9-36：RF 信号走线参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-36：RF 信号走线参考</em></div>

![图 6.9-37：音频电源滤波布局](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-37：音频电源滤波布局</em></div>

![图 6.9-38：模拟音频输入布局](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-38：模拟音频输入布局</em></div>

![图 6.9-39：模拟音频输出布局](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-39：模拟音频输出布局</em></div>

![图 6.9-40：SDIO 走线模型](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-40：SDIO 走线模型</em></div>

![图 6.9-41：SDIO PCB 走线参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-41：SDIO PCB 走线参考</em></div>

![图 6.9-42：USB 器件布局参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-42：USB 器件布局参考</em></div>

![图 6.9-43：USB 走线模型](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-43：USB 走线模型</em></div>

![图 6.9-44：USB PCB 走线参考](../../sf32-products/chips/assets/57x/SF32LB57x-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-44：USB PCB 走线参考</em></div>

![图 6.9-45：电源 TVS 布局参考](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-45：电源 TVS 布局参考</em></div>

![图 6.9-46：EOS/TVS 接地参考](../../sf32-products/chips/assets/57x/SF32LB57x-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-46：EOS/TVS 接地参考</em></div>
