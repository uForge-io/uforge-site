---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB52x MCU 的 PCB 布局指导：封装、叠层、扇出，以及时钟/RF/音频/USB/SDIO 走线、DC-DC 与电源走线、EMI/ESD 及其他布局注意事项。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x 硬件设计指南 — PCB 布局指导 { #sf32lb52x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页介绍第 6 节 PCB 布局指导。可返回[原理图设计指导](SF32LB52x_schematic_design.md)（三页中的第一页），继续阅读 [PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)，或跳转至[设计评审检查表与参考资料](SF32LB52x_review_and_reference.md)。

## 6. PCB 布局指导 { #6-pcb-layout-guidelines }

本章与第 5 节配合使用，用于评审 PCB 布局。开始最终布局前，原理图应已确定芯片型号、电源树、时钟器件、RF 电路预留位置、显示与存储接口管脚，以及测试点的接入方式。

**设计目标**

将原理图转化为可制造的 4 层 PTH PCB，同时保护 RF、晶体、音频、电源、USB 和 SDIO 等敏感路径，避免阻抗、噪声和回流路径问题。

**PCB 评审流程**

1. 核对封装焊盘图形、钢网开口和 PCB 推荐焊盘图形。
2. 与 PCB 厂确认叠层、线宽线距、钻孔和阻抗规则。
3. 摆放芯片、晶体、RF 路径、DC/DC、充电器、显示/存储连接器和音频器件。
4. 先评审扇出和敏感信号走线，再完成优先级较低的 GPIO 走线。
5. 保存 RF、晶体、USB、SDIO、音频、DC/DC、充电电路和电源轨的布局评审截图。

### 6.1. PCB 封装设计 { #61-pcb-footprint-design }

SF32LB52x QFN68L 封装尺寸为 7 mm x 7 mm x 0.85 mm，68 个管脚，0.35 mm 管脚间距。

封装图规定的总高度标称值为 0.85 mm，范围为 0.8–0.9 mm；离板间隙（stand-off）标称值为 0.02 mm，最大值为 0.05 mm。评估装配和外壳间隙时，应核对详细封装图，不能只依据尺寸摘要。

![图 6.1-1：QFN68L 封装尺寸](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-1：QFN68L 封装尺寸</em></div>

![图 6.1-2：QFN68L 封装形状](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-2：QFN68L 封装形状</em></div>

![图 6.1-3：QFN68L PCB 焊盘参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-3：QFN68L PCB 焊盘参考</em></div>

图 6.1-3 的外围焊盘为 0.2 mm x 0.55 mm，间距为 0.35 mm；阻焊开窗为 0.3 mm x 0.65 mm，钢网开口为 0.2 mm x 0.55 mm。这些是参考封装焊盘尺寸，正式发布前还应核对装配工艺要求。

封装图中的裸露焊盘标称尺寸为 5.49 mm x 5.49 mm。扇出示例将中央焊盘连接至 GND，不能把它当作无需连接的机械结构。

### 6.2. PCB 叠层 { #62-pcb-stack-up }

参考设计支持单面或双面摆件。器件可全部放在同一面，也可将电容等无源器件放在芯片背面。推荐使用 4 层 PTH 叠层。

![图 6.2-1：参考叠层结构](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.2-1：参考叠层结构</em></div>

图 6.2-1 为板厚 0.8 mm ±10% 的参考叠层，包含电镀层和阻焊层，计算总厚度为 0.79553 mm。实际成品厚度和介质结构应与 PCB 厂确认，不能把示例视为所有设计都适用的固定叠层。

<div align="center"><em>表 6.2-1：参考叠层参数</em></div>

<div align="center" markdown>

| 层位置 | 材料 | 厚度（mil） | 厚度（mm） | Dk | Df |
|:---|:---|---:|---:|---:|---:|
| 顶层阻焊 | 阻焊 | 1 | 0.0254 | 3.5 | 0.8 |
| L1 | 铜 + 电镀 | 1.81 | 0.045974 | — | — |
| L1–L2 介质 | 1080（66%）x3 半固化片 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L2 | 铜 + 电镀 | 1.4 | 0.03556 | — | — |
| L2–L3 介质 | 芯板 | 5.9 | 0.14986 | 4 | 0.017 |
| L3 | 铜 + 电镀 | 1.4 | 0.03556 | — | — |
| L3–L4 介质 | 1080（66%）x3 半固化片 | 8.5 | 0.2159 | 3.8 | 0.019 |
| L4 | 铜 + 电镀 | 1.81 | 0.045974 | — | — |
| 底层阻焊 | 阻焊 | 1 | 0.0254 | 3.5 | 0.8 |

</div>

半固化片行按 70% 铜面积计算。Dk 和 Df 按参考图原样列出，其中阻焊层 Df 标为 0.8；这些数值不是经过确认的通用材料参数。计算阻抗和损耗时，应向 PCB 厂确认实际材料数据。

### 6.3. 通用 PCB 设计规则 { #63-general-pcb-design-rules }

PCB 设计应遵循参考设计中的 PTH 板通用设计规则。

![图 6.3-1：通用 PCB 设计规则](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.3-1：通用 PCB 设计规则</em></div>

图 6.3-1 中的线宽规则为：最小值和推荐值均为 0.1 mm，最大值为 2.54 mm。图中区分了 0.1 mm 的走线、过孔和焊盘间距，以及 0.127 mm 的铜皮间距规则（铜皮之间为 0.15 mm），板边间距为 0.25 mm。这些是参考 CAD 规则；制造能力和阻抗控制走线要求仍需分别确认。

图 6.3-1 还规定钻孔之间和器件本体之间的间距均为 0.1 mm。部分同网络规则设为 0，但这并不取消不同网络之间的间距要求，也不取消板边和铜皮间距规则。

### 6.4. PCB 走线扇出 { #64-pcb-trace-fanout }

QFN 封装所有信号从表层扇出。

![图 6.4-1：表层扇出参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.4-1：表层扇出参考</em></div>

### 6.5. 时钟接口走线 { #65-clock-interface-routing }

两个设计分组均应遵循以下时钟走线规则：

- 晶体应放在屏蔽罩内，距 PCB 板边大于 1 mm，并尽量远离 PA、充电器、PMU 等发热器件；理想距离大于 5 mm，以避免晶体频率漂移受到影响
- 晶体周围应留出大于 0.25 mm 的禁布间隙，禁止放置其他金属或器件
- 48 MHz 晶体走线应走表层，长度 3–10 mm，线宽 0.1 mm，完整包地，远离 VBAT/VCC、DC/DC 和高速信号线；晶体区域下方表层和相邻层不得有其他走线
- 32.768 kHz 晶体走线应走表层，长度 ≤10 mm，线宽 0.1 mm，32K_XI/32K_XO 平行走线间距 ≥0.15 mm，并完整包地；晶体电路下方的表层及相邻层不得穿过其他走线。

![图 6.5-1：晶体摆放](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-1：晶体摆放</em></div>

![图 6.5-2：48 MHz 晶体原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-2：48 MHz 晶体原理图</em></div>

![图 6.5-3：48 MHz 晶体走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-3：48 MHz 晶体走线模型</em></div>

![图 6.5-4：48 MHz 晶体走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-4：48 MHz 晶体走线参考</em></div>

![图 6.5-5：32.768 kHz 晶体原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-5：32.768 kHz 晶体原理图</em></div>

![图 6.5-6：32.768 kHz 晶体走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-6：32.768 kHz 晶体走线模型</em></div>

![图 6.5-7：32.768 kHz 晶体走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-7：32.768 kHz 晶体走线参考</em></div>

图 6.5-3 和图 6.5-6 对两种晶体的 XI/XO 平行走线都标出了 ≥0.15 mm 的间距。图 6.5-2 使用负载电容为 8.8 pF 的 48 MHz 晶体，外部负载电容标为 NF（不贴装）；图 6.5-5 使用 32.768 kHz、7 pF 晶体，连接 PA22/PA23，这两个管脚还复用为 PDM_CLK/PDM_DATA。

!!! important "晶体区域铜箔处理存在源资料冲突"
    电池供电型号应用说明自身对晶体区域铜箔处理的要求不一致：时钟章节要求去除晶体正下方的 L2 地铜，而 PCB 走线章节禁止顶层及相邻层出现平面挖空或铜箔切除，其走线模型也显示 L2 地铜连续。独立的 PCB 布局指南重复了不得挖空的要求。不要推断统一的 L2 规则，也不要仅按板层数自行决定；发布 PCB 前应向思澈科技（SiFli）确认适用于当前叠层的处理方式。晶体禁布区及器件净空仍需单独检查。

### 6.6. RF 接口走线 { #66-rf-interface-routing }

两个设计分组均应遵循以下 RF 走线规则：

- RF 匹配电路靠近芯片侧放置，而不是靠近天线侧
- AVDD_BRF 滤波电容靠近芯片管脚放置，接地脚通过过孔直接连接主地
- RF 走线尽量走表层，避免使用影响性能的过孔。源资料建议线宽大于 10 mil，实际宽度还应结合叠层确认 50 Ω 阻抗；走线应包地屏蔽，并避免锐角和直角。
- RF 走线阻抗控制为 50 Ω，两侧布置密集地过孔进行屏蔽

![图 6.6-1：π 网络和电源电路原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-1：π 网络和电源电路原理图</em></div>

![图 6.6-2：π 网络和电源电路 PCB 布局](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-2：π 网络和电源电路 PCB 布局</em></div>

![图 6.6-3：RF 信号电路原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-3：RF 信号电路原理图</em></div>

![图 6.6-4：RF 信号 PCB 走线](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-4：RF 信号 PCB 走线</em></div>

RF 参考电路串联了 15 pF/50 V 电容 C0333，C0318/C0319 标为 NF，AVDD_BRF 的滤波电容为 0.47 uF。这些是示例贴装参数，不是所有天线都适用的匹配方案。

### 6.7. 音频接口走线 { #67-audio-interface-routing }

两个设计分组均应遵循以下音频走线规则：

- AVDD33_AUD、MIC_BIAS 和 AUD_VREF 的滤波电容应分别靠近对应管脚放置，电容接地端应可靠连接主地。
- ADCP 模拟输入相关器件应靠近芯片管脚，走线短、完整包地，并远离强干扰源
- DACP/DACN 模拟输出相关器件应靠近芯片管脚，按差分对短距离走线，寄生电容小于 10 pF，并完整包地

![图 6.7-1：音频电源滤波原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-1：音频电源滤波原理图</em></div>

![图 6.7-2：音频电源滤波 PCB 参考走线](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-2：音频电源滤波 PCB 参考走线</em></div>

![图 6.7-3：模拟音频输入原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-3：模拟音频输入原理图</em></div>

![图 6.7-4：模拟音频输入 PCB 设计](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-4：模拟音频输入 PCB 设计</em></div>

![图 6.7-5：模拟音频输出原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-5：模拟音频输出原理图</em></div>

![图 6.7-6：模拟音频输出 PCB 设计](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-6：模拟音频输出 PCB 设计</em></div>

图 6.7-1 的参考滤波电容为：MIC_BIAS 使用 1 uF/6.3 V，AVDD33_AUD 使用 2.2 uF/10 V，AUD_VREF 使用 1 uF/6.3 V。这些数值用于说明图中电路，实际设计仍需确认所需参数。DACP/DACN 除按差分对走线外，也应远离强干扰源。

源资料的原理图指导还要求 DAC 输出走线长度小于 2 cm。

### 6.8. USB 接口走线 { #68-usb-interface-routing }

USB DP (PA35) / DN (PA36) 应先经过 ESD 器件管脚，再连接到芯片，并确保 ESD 器件地与主地可靠连接。DP/DN 按差分对走线，差分阻抗控制为 90 Ω，并完整包地。

![图 6.8-1：USB 信号原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-1：USB 信号原理图</em></div>

![图 6.8-2：USB 信号 PCB 设计](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-2：USB 信号 PCB 设计</em></div>

![图 6.8-3：USB 信号器件摆放参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-3：USB 信号器件摆放参考</em></div>

![图 6.8-4：USB 信号走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-4：USB 信号走线模型</em></div>

图 6.8-3 对比了经过保护器件焊盘的走线与绕过保护的分支；不得让信号通过未经保护的分支直接到达芯片。

### 6.9. SDIO 接口走线 { #69-sdio-interface-routing }

SDIO 信号应成组走线，总长度 ≤50 mm，组内走线长度差 ≤6 mm。时钟信号应完整包地，DATA 和 CMD 信号也应进行地保护。

![图 6.9-1：SDIO 接口电路原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-1：SDIO 接口电路原理图</em></div>

![图 6.9-2：SDIO PCB 走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-2：SDIO PCB 走线模型</em></div>

图 6.9-2 还标出了 CMD 走线与相邻包地之间 ≥0.15 mm 的间距。

SDIO 原理图将 PA11 标为 MPI2_VDD_EN/SD_VDD_EN。优先级更高的 OpenSiFli 应用说明和原理图设计指南指定 PA21 控制启动存储电源开关，因此应以 PA21 作为有源资料支持的设计依据；检查表工作簿中电池供电型号外部 Flash 的 PA11 记录，不能据此判断它是另一控制功能。未经澄清，不要改用 PA11。定稿前应向思澈科技（SiFli）确认具体网络和型号；详见[存储与生产](SF32LB52x_schematic_storage_mfg.md#5613-boot-storage-power-control)。

### 6.10. DC/DC 电路走线 { #610-dcdc-circuit-routing }

电源电感和滤波电容应靠近芯片管脚放置。BUCK_LX 走线应短而宽，BUCK_FB 反馈走线宽度必须大于 0.25 mm。所有 DC/DC 输出滤波电容的接地脚应通过多个过孔连接主地平面。功率电感区域不要铺设表层铜皮，相邻层应保持完整参考地。

![图 6.10-1：DC/DC 关键器件原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.10-1：DC/DC 关键器件原理图</em></div>

![图 6.10-2：DC/DC 关键器件 PCB 布局](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.10-2：DC/DC 关键器件 PCB 布局</em></div>

图 6.10-1 使用 4.7 uH 电感和 4.7 uF/10 V 输出电容。其中 PMU_BUCK_VSW 和 PMU_BUCK_VOUT 分别是开关节点和输出/反馈节点，对应源资料管脚表中的 BUCK_LX 和 BUCK_FB。电感区域内不得穿过其他走线。

### 6.11. 电源走线 { #611-power-supply-routing }

=== "SF32LB520/3/5/7（电池供电）"

    VCC 是芯片内部 PMU 模块输入管脚，电容应靠近管脚放置，走线宽度不小于 0.4 mm。VDD_VOUT1、VDD_VOUT2、VDD_RET、VDD_RTC、VDD18_VOUT、VDD33_VOUT1、VDD33_VOUT2、AVDD33_AUD 和 AVDD_BRF 的滤波电容应靠近对应管脚放置，走线宽度按所需输入电流设计。

    ![图 6.11-1：VCC 电源走线（原理图）](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 6.11-1：VCC 电源走线（原理图）</em></div>

    ![图 6.11-2：VCC 电源走线（PCB）](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 6.11-2：VCC 电源走线（PCB）</em></div>

    **充电电路走线**

    VBUS 和 VBAT 是芯片内部充电模块的输入/输出管脚，滤波电容应靠近管脚放置。充电回路电流较大，走线宽度至少为 16 mil（约 0.41 mm），并避免与敏感信号平行走线。采用星形走线，使充电路径不与敏感电路模块共用走线。应用说明将这一最小宽度约写为 0.4 mm。

    ![图 6.11-3：VBUS 与 VBAT 电源走线（原理图）](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 6.11-3：VBUS 与 VBAT 电源走线（原理图）</em></div>

    ![图 6.11-4：VBUS 与 VBAT 电源走线（PCB）](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 6.11-4：VBUS 与 VBAT 电源走线（PCB）</em></div>

    !!! note "充电电路参考图"
        图 6.11-3 中，VBUS 电容为 10 uF/10 V，VBAT 电容为 4.7 uF/10 V。图中印出的 VBUS 范围为 4.3–5.5 V；《Electrical Specification-A3》列为 4.5–5.5 V，电池型号应用说明对片内充电器则规定为 4.6–5.5 V，并要求最大充电电流下 VBUS 管脚电压不低于 4.6 V。该图用于说明布局，不能把其中的电压标注视为另一个已验证的最低工作电压；详见第 5.2 节的源资料差异说明。

=== "52B/D/E/G/J（外部稳压供电）"

    PVDD 是芯片内部 PMU 模块输入管脚，电容应靠近管脚放置，走线宽度不小于 0.4 mm。AVDD33、VDDIOA、VDD_SIP、AVDD33_AUD 和 AVDD_BRF 的滤波电容应靠近对应管脚放置，走线宽度按所需输入电流设计，并尽量短而宽，以降低电源纹波并提升系统稳定性。

    ![图 6.11-5：PVDD 电源走线](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 6.11-5：PVDD 电源走线</em></div>

    !!! info "不适用"
        该型号没有充电管理电路，因此不需要充电电路走线。

### 6.12. 其他接口走线 { #612-other-interface-routing }

GPADC 输入走线必须完整包地，并与其他可能产生干扰的电路保持距离，包括电池电量检测和温度检测电路。

### 6.13. EMI 与 ESD { #613-emi-esd }

两个设计分组均应遵循以下 EMI 与 ESD 规则：

- 屏蔽罩外容易产生干扰的长距离时钟和电源走线不得走表层，应布置在内层。
- ESD 保护器件靠近连接器管脚放置，信号应先经过 ESD 器件，再连接到其他电路
- ESD 器件接地脚应通过过孔连接主地，接地焊盘走线应短而宽，以降低阻抗并提升 ESD 性能

### 6.14. 其他注意事项 { #614-other-considerations }

USB 充电线测试点应放在连接器侧、TVS 保护接入点之前；电池侧 TVS 应放在板端入口处，位于电源线分支至 MCU 和其他负载之前。电源走线应先经过 TVS 接入点再到芯片；TVS 本身是对地并联保护器件，并非串接在电源线上。其接地连接应尽量短。

![图 6.14-1：电源 TVS 摆放参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.14-1：电源 TVS 摆放参考</em></div>

![图 6.14-2：TVS 走线参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.14-2：TVS 走线参考</em></div>
