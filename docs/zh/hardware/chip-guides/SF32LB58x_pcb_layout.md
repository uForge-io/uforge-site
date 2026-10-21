---
icon: lucide/layers
hide:
    - navigation
description: "SF32LB58x MCU 的 PCB 布局指导：封装、叠层、扇出，以及时钟/RF/音频/USB/SDIO/DSI/电源走线指导。"
tags:
    - 硬件
    - 芯片
---

# SF32LB58x 硬件设计指南 — PCB 布局指导 { #sf32lb58x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB58x 硬件设计指南的一部分"
    本页覆盖第 6 节，PCB 布局指导。返回[原理图设计指导](SF32LB58x_schematic_design.md)，继续阅读 [PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)，或跳转至[设计评审检查表与参考资料](SF32LB58x_review_and_reference.md)。

## 6. PCB 布局指导 { #6-pcb-layout-guidelines }

### 6.1. PCB 封装设计 { #61-package-footprint-design }

SF32LB58x 系列采用 BGA256 封装，尺寸为 8.5 mm × 6.5 mm × 0.94 mm，焊球间距为 0.4 mm，标称焊球直径为 0.25 mm。完整的封装验证数据请参阅官方数据手册。

!!! warning "源文件中的封装高度不一致"
    思澈科技（SiFli）指南正文给出的封装高度为 0.94 mm，而 BGA256 封装图中 A 尺寸的标称值为 0.91 mm，范围为 0.84–1.04 mm。两处源资料给出的数值不一致。如果封装高度会影响机械间隙或外壳配合，不要自行选定其中一个数值；请向思澈科技（SiFli）确认，并以确认后的封装规格为准。

![图 6.1-1：BGA256 封装尺寸图](../../sf32-products/chips/assets/58x/sf32lb58x-POD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-1：BGA256 封装尺寸图</em></div>

![图 6.1-2：封装形状图](../../sf32-products/chips/assets/58x/sf32lb58x-DECAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-2：封装形状图</em></div>

![图 6.1-3：PCB 焊盘设计参考](../../sf32-products/chips/assets/58x/sf32lb58x-PAD-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-3：PCB 焊盘设计参考</em></div>

![图 6.1-4：封装焊球分布图](../../sf32-products/chips/assets/58x/sf32lb58x-BALLMAP-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-4：封装焊球分布图</em></div>

![图 6.1-5：封装基板焊球信息](../../sf32-products/chips/assets/58x/sf32lb58x-BALL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.1-5：封装基板焊球信息</em></div>

### 6.2. PCB 叠层设计 { #62-pcb-stack-up }

SF32LB58x 系列支持单面或双面组装。PCB 必须采用 HDI 工艺，不支持 PTH 板；推荐采用 6HDI-2 叠层结构。图示参考叠层的完成板厚为 0.8 mm ±10%（标称总厚约 32 mil）。

![图 6.2-1：参考叠层结构图](../../sf32-products/chips/assets/58x/sf32lb58x-STACK-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.2-1：参考叠层结构图</em></div>

### 6.3. PCB 通用设计规则 { #63-general-pcb-design-rules }

PCB 通用设计规则请参考官方数据手册中的附图，尺寸单位为 mm。
图示参考规则为：线宽最小值和推荐值均为 0.075 mm，最大值为 2 mm；走线、过孔、焊盘、SMD、文字及铜箔之间的最小间距为 0.075 mm；距板边的间距为 0.25 mm；钻孔间距和器件本体间距均为 0.1 mm。实际规则应结合板厂能力确认。

![图 6.3-1：通用设计规则](../../sf32-products/chips/assets/58x/sf32lb58x-RULE-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.3-1：通用设计规则</em></div>

#### 6.3.1. 盲孔设计 { #631-blind-via-design }

PCB 盲孔设计（1-2 层和 1-3 层）请参考官方数据手册中的附图，尺寸单位为 mm。图示参考盲孔的直径为 0.23 mm，钻孔直径为 0.10 mm。

![图 6.3-2：1-2 层盲孔设计](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.3-2：1-2 层盲孔设计</em></div>

![图 6.3-3：1-3 层盲孔设计](../../sf32-products/chips/assets/58x/sf32lb58x-VIA1-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.3-3：1-3 层盲孔设计</em></div>

#### 6.3.2. 埋孔设计 { #632-buried-via-design }

PCB 埋孔设计（2-5 层）请参考官方数据手册中的附图，尺寸单位为 mm。图示参考埋孔的直径为 0.40 mm，钻孔直径为 0.20 mm。

![图 6.3-4：2-5 层埋孔设计](../../sf32-products/chips/assets/58x/sf32lb58x-VIA2-5-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.3-4：2-5 层埋孔设计</em></div>

### 6.4. 芯片走线扇出 { #64-trace-fanout }

BGA 前两排焊球从表层扇出，其余焊球通过过孔扇出至内层。

![图 6.4-1：表层扇出参考图](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-T-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.4-1：表层扇出参考图</em></div>

![图 6.4-2：内层扇出参考图](../../sf32-products/chips/assets/58x/sf32lb58x-FANOUT-I-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.4-2：内层扇出参考图</em></div>

### 6.5. 时钟接口走线 { #65-clock-interface-routing }

晶体应放置在屏蔽罩内，距 PCB 板边应大于 1 mm，并尽量远离 PA、充电电路和 PMU 等发热器件；建议间距大于 5 mm，以免热影响造成晶体频率偏移。晶体禁布区与其他金属或器件之间的间距应大于 0.25 mm。

48 MHz 晶体应在表层布线，线长控制在 3–10 mm，线宽为 0.075 mm，并进行完整的立体包地处理。走线应远离 VBAT、DC/DC 及高速信号线；晶体区域下方的顶层和相邻层均不得布置其他走线。

32.768 kHz 晶体应在表层布线，线长不超过 10 mm，线宽为 0.075 mm；32K_XI 与 32K_XO 的平行走线间距应至少为 0.15 mm，并进行完整的立体包地处理。晶体区域下方的顶层和相邻层均不得布置其他走线。

!!! warning "晶体禁布层数请向思澈科技（SiFli）确认"
    布局指南要求在晶体区域的表层及其下方相邻层设置禁布区；核对表工作簿则要求四层 PCB 的第 1、2、3 层均设置铜箔禁布区。两份源资料对是否包含第 3 层的要求不同。不要自行推定最终的第 3 层要求，请向思澈科技（SiFli）确认。

![图 6.5-1：晶体布局图](../../sf32-products/chips/assets/58x/sf32lb58x-CRYSTAL-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-1：晶体布局图</em></div>

![图 6.5-2：48 MHz 晶体原理图](../../sf32-products/chips/assets/58x/sf32lb58x-48M-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-2：48 MHz 晶体原理图</em></div>

![图 6.5-3：48 MHz 晶体走线模型](../../sf32-products/chips/assets/58x/sf32lb58x-48M-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-3：48 MHz 晶体走线模型</em></div>

![图 6.5-4：48 MHz 晶体走线参考](../../sf32-products/chips/assets/58x/sf32lb58x-48M-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-4：48 MHz 晶体走线参考</em></div>

![图 6.5-5：32.768 kHz 晶体原理图](../../sf32-products/chips/assets/58x/sf32lb58x-32K-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-5：32.768 kHz 晶体原理图</em></div>

![图 6.5-6：32.768 kHz 晶体走线模型](../../sf32-products/chips/assets/58x/sf32lb58x-32K-M-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-6：32.768 kHz 晶体走线模型</em></div>

![图 6.5-7：32.768 kHz 晶体走线参考](../../sf32-products/chips/assets/58x/sf32lb58x-32K-REF-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.5-7：32.768 kHz 晶体走线参考</em></div>

### 6.6. 射频接口走线 { #66-rf-interface-routing }

射频匹配电路应尽量靠近芯片，而不是天线端。AVDD_BRF 射频电源的去耦电容应靠近芯片管脚放置，并通过电容接地端的过孔直接连接至主地平面。

射频走线应尽可能布在表层，以减少过孔和换层对射频性能的影响；线宽建议大于 10 mil，并进行完整的立体包地处理。走线应避免锐角和直角，并在两侧增加屏蔽地孔；阻抗应控制为 50 Ω。DC-DC、VBAT 以及晶振、高频时钟和 I2C/SPI/SDIO/I2S/UART 等高速数字信号不得进入射频走线区域。AVSS_RRF、AVSS_TRF、AVSS_TRF2、AVSS_VCO 和 AVSS_BB 是射频电路的接地管脚，必须可靠接地；应在这些焊盘上直接设置盲孔并连接至主地。

![图 6.6-1：π 型网络与电源电路原理图](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-1：π 型网络与电源电路原理图</em></div>

![图 6.6-2：π 型网络与电源电路 PCB 布局](../../sf32-products/chips/assets/58x/sf32lb58x-%CF%80-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-2：π 型网络与电源电路 PCB 布局</em></div>

![图 6.6-3：RF 信号电路原理图](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-3：RF 信号电路原理图</em></div>

![图 6.6-4：RF 信号 PCB 走线](../../sf32-products/chips/assets/58x/sf32lb58x-RF-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-4：RF 信号 PCB 走线</em></div>

![图 6.6-5：RF 电路接地信号原理图](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-5：RF 电路接地信号原理图</em></div>

![图 6.6-6：RF 电路接地信号 PCB 图](../../sf32-products/chips/assets/58x/sf32lb58x-RF-VSS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.6-6：RF 电路接地信号 PCB 图</em></div>

### 6.7. 音频接口走线 { #67-audio-interface-routing }

AVDD33_AUD 为音频电源引脚，其去耦电容应靠近该引脚放置，且电容地端应可靠连接至主地。MIC_BIAS 为麦克风供电，其去耦电容也应靠近对应引脚放置，地端同样应可靠连接至主地。AUD_VREF 的去耦电容应靠近对应引脚放置。

AU_ADC1P/AU_ADC1N 和 AU_ADC2P/AU_ADC2N 是两组模拟输入差分对。相关器件应尽量靠近对应管脚放置；每组 P/N 信号都应按差分对布线，尽可能缩短走线，并进行立体包地处理。其他接口的强干扰信号应远离这些走线。

AU_DAC1P/AU_DAC1N 和 AU_DAC2P/AU_DAC2N 是两组模拟输出差分对。相关器件应尽量靠近对应管脚放置；每组 P/N 信号都应按差分对布线，走线尽可能短且小于 2 mm，寄生电容小于 10 pF，差分线宽为 0.075 mm。差分对应进行立体包地处理，并远离其他接口的强干扰信号。

!!! warning "源资料中的 DAC 走线长度限值不一致"
    布局指南规定 DAC 走线长度小于 2 mm；PCB 布局核对表工作簿规定走线长度小于 2 cm（20 mm），两者相差 10 倍。未经思澈科技（SiFli）确认，不要自行选用或替换其中一个限值。

![图 6.7-1：音频电路电源原理图](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-1：音频电路电源原理图</em></div>

![图 6.7-2：音频电路电源滤波电路 PCB 设计](../../sf32-products/chips/assets/58x/sf32lb58x-AU-PWR-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-2：音频电路电源滤波电路 PCB 设计</em></div>

![图 6.7-3：模拟音频输入原理图](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-3：模拟音频输入原理图</em></div>

![图 6.7-4：模拟音频输入 PCB 设计](../../sf32-products/chips/assets/58x/sf32lb58x-AUADC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-4：模拟音频输入 PCB 设计</em></div>

![图 6.7-5：模拟音频输出原理图](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-5：模拟音频输出原理图</em></div>

![图 6.7-6：模拟音频输出 PCB 设计](../../sf32-products/chips/assets/58x/sf32lb58x-AUDAC-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.7-6：模拟音频输出 PCB 设计</em></div>

### 6.8. USB 接口走线 { #68-usb-interface-routing }

AVDD33_USB 为 USB 接口电源引脚，其去耦电容应靠近该引脚放置；USB2_REXT 校准电阻也应靠近对应引脚放置。USB 信号到达芯片前必须先经过 ESD 保护器件，且该器件的接地引脚应可靠连接至主地。USB DP/DN 应按差分对布线，差分阻抗控制为 90 Ω，并进行立体包地处理。

![图 6.8-1：USB 信号原理图](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-1：USB 信号原理图</em></div>

![图 6.8-2：USB 信号 PCB 设计](../../sf32-products/chips/assets/58x/sf32lb58x-USBS-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-2：USB 信号 PCB 设计</em></div>

![图 6.8-3：USB 信号器件布局参考](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-3：USB 信号器件布局参考</em></div>

![图 6.8-4：USB 信号走线模型](../../sf32-products/chips/assets/58x/sf32lb58x-USBM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.8-4：USB 信号走线模型</em></div>

### 6.9. SDIO 接口走线 { #69-sdio-interface-routing }

SF32LB58x 提供 SDIO1 和 SDIO2 两个 SDIO 接口。每个接口的所有信号应集中布线，不要拆分；走线总长度应 ≤50 mm，组内各信号之间的长度差应 ≤6 mm。SDIO 时钟信号应进行立体包地处理，DATA 和 CMD 信号也应屏蔽。

![图 6.9-1：SDIO1 接口电路图](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-1：SDIO1 接口电路图</em></div>

![图 6.9-2：SDIO1 PCB 走线模型](../../sf32-products/chips/assets/58x/sf32lb58x-SDIOM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.9-2：SDIO1 PCB 走线模型</em></div>

### 6.10. DSI 接口走线 { #610-dsi-interface-routing }

AVDD18_DSI 去耦电容和 DSI_REXT 校准电阻应分别靠近对应管脚放置。DSI 信号应按差分对布线，并将差分阻抗控制为 100 Ω；时钟与数据应进行等长控制：单个差分对内的线长差应 ≤0.5 mm，不同差分对之间的线长差应 ≤2 mm。每对差分线都应进行立体包地处理。

!!! warning "源资料中的 DSI 差分对间限值不一致"
    布局指南规定差分对间的线长差应 ≤2 mm（差分对内应 ≤0.5 mm）；PCB 布局核对表工作簿则要求 DSI 数据差分对与时钟差分对的长度差在 200 mil（5.08 mm）以内。两份源资料的差分对间限值不一致。请把差分对内限值单独列出，并在定版前向思澈科技（SiFli）确认适用的差分对间限值。

![图 6.10-1：DSI 信号电路图](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.10-1：DSI 信号电路图</em></div>

![图 6.10-2：DSI 信号 PCB 走线](../../sf32-products/chips/assets/58x/sf32lb58x-DSIM-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.10-2：DSI 信号 PCB 走线</em></div>

### 6.11. DC-DC 电路走线 { #611-dc-dc-circuit-routing }

DC-DC 电路的功率电感和去耦电容必须靠近芯片管脚放置。BUCK_LX 走线应尽量短而宽，以减小整个 DC-DC 电路的回路电感；所有 DC-DC 输出去耦电容的接地端都应通过多个过孔连接至主地平面。BUCK_FB 反馈线宽度必须大于 0.25 mm。功率电感下方的表层禁止铺铜，紧邻层应保持为完整的参考地平面，且不得有其他走线穿过电感区域。

![图 6.11-1：DC-DC 关键器件电路图](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.11-1：DC-DC 关键器件电路图</em></div>

![图 6.11-2：DC-DC 关键器件 PCB 布局图](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.11-2：DC-DC 关键器件 PCB 布局图</em></div>

### 6.12. 电源供电走线 { #612-power-supply-routing }

PVDD1 和 PVDD2 是芯片内置 PMU 模块的电源输入引脚。去耦电容必须靠近引脚放置，走线应尽量加宽，且不得小于 0.5 mm。PVSS1 和 PVSS2 是 PMU 模块的接地引脚，必须通过过孔连接至主地；不得悬空，以免影响 PMU 的整体性能。

![图 6.12-1：DC-DC 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.12-1：DC-DC 电路图</em></div>

![图 6.12-2：DC-DC PCB 走线](../../sf32-products/chips/assets/58x/sf32lb58x-DCDC-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.12-2：DC-DC PCB 走线</em></div>

### 6.13. LDO 和 IO 电源输入走线 { #613-ldo-and-io-power-input-routing }

所有 LDO 输出和 I/O 电源输入引脚的去耦电容均应靠近对应引脚放置；走线宽度应满足输入电流要求，并尽量短而宽，以减小电源纹波、提高系统稳定性。

![图 6.13-1：LDO 和 IO 输入电源走线示意图](../../sf32-products/chips/assets/58x/sf32lb58x-LDOIO-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.13-1：LDO 和 IO 输入电源走线示意图</em></div>

### 6.14. 其他接口走线 { #614-other-interface-routing }

GPADC 管脚的信号网络应进行完整的立体包地处理，并远离其他干扰源，例如电池电量检测和温度检测电路。

![图 6.14-1：GPADC 电路图](../../sf32-products/chips/assets/58x/sf32lb58x-GPADC-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.14-1：GPADC 电路图</em></div>

时钟输入/输出管脚的信号网络（例如 32 kHz 输出）也应进行完整的立体包地处理，并远离其他干扰源。

![图 6.14-2：32 kHz 时钟输出电路图](../../sf32-products/chips/assets/58x/sf32lb58x-32K-R-SCH.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.14-2：32 kHz 时钟输出电路图</em></div>

### 6.15. 芯片地走线 { #615-chip-ground-routing }

SF32LB58x 芯片中心区域下方的地网络应通过走线保持完整连通，形成足够完整的地平面，并通过盲孔或埋孔连接至主地平面。

![图 6.15-1：芯片下顶层地信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.15-1：芯片下顶层地信号</em></div>

![图 6.15-2：芯片下第二层地信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.15-2：芯片下第二层地信号</em></div>

![图 6.15-3：芯片下第三层地信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-3-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.15-3：芯片下第三层地信号</em></div>

![图 6.15-4：芯片下第四层地信号](../../sf32-products/chips/assets/58x/sf32lb58x-VSS-4-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.15-4：芯片下第四层地信号</em></div>

### 6.16. EMI & ESD { #616-emi-esd }

屏蔽罩外应避免长距离表层走线；时钟、电源等易产生干扰的信号必须走内层，不得布在表层。ESD 保护器件应靠近连接器引脚放置，信号应先经过 ESD 器件再进入后级，避免在器件前分叉。ESD 器件的接地引脚应通过过孔连接至主地；接地焊盘的走线应短而宽，以降低阻抗并改善 ESD 性能。

### 6.17. 其他设计要点 { #617-other-considerations }

USB 充电线路的测试点应设在 TVS 二极管之前。电池座的 TVS 二极管应设在平台连接端之前，确保信号先经过 TVS 再到达芯片。TVS 接地引脚的走线应尽可能短。

!!! note "源文件未说明 TVS 放置位置中的“平台”所指"
    思澈科技（SiFli）中文源文件要求将电池接口的 TVS 放在“平台前面”，但没有说明“平台”具体指哪个节点或连接端。请向思澈科技（SiFli）确认放置位置，不要自行推定。源文件另行要求信号先经过 TVS 再到达芯片，并要求 TVS 接地走线尽可能短。

![图 6.17-1：电源 TVS 布局参考](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-P-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.17-1：电源 TVS 布局参考</em></div>

![图 6.17-2：TVS 走线参考](../../sf32-products/chips/assets/58x/sf32lb58x-TVS-R-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.17-2：TVS 走线参考</em></div>

为避免阻焊层覆盖焊盘并影响焊接可靠性，BGA 焊盘内的过孔应位于对应焊球的中心，避免偏心布置。为提高制造良率，请参考官方数据手册中的 BGA 焊球连接示意图。

![图 6.17-3：BGA 过孔位置参考](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-VIA-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.17-3：BGA 过孔位置参考</em></div>

![图 6.17-4：BGA 焊球连接参考图一](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R1-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.17-4：BGA 焊球连接参考图一</em></div>

![图 6.17-5：BGA 焊球连接参考图二](../../sf32-products/chips/assets/58x/sf32lb58x-BGA-R2-PCB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 6.17-5：BGA 焊球连接参考图二</em></div>
