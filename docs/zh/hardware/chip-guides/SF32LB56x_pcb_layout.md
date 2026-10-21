---
icon: lucide/layers
description: "SF32LB56x MCU 的 PCB 布局指导：封装与叠层、关键走线，以及逐项 PCB 布局核对表。"
tags:
    - 硬件
    - 芯片
hide:
    - navigation
---

# SF32LB56x 硬件设计指南 — PCB 布局指导 { #sf32lb56x-hardware-design-guide-pcb-layout-guidelines }

!!! note "SF32LB56x 硬件设计指南的一部分"
    本页对应第 6 节“PCB 布局指导”。请返回[原理图设计指导](SF32LB56x_schematic_design.md)，或跳转至[设计评审检查表与参考资料](SF32LB56x_review_and_reference.md)。

## 6. PCB 布局指导 { #6-pcb-layout-guidelines }

### 6.1. 封装与叠层 { #61-footprint-and-stack-up }

U 变体采用 68 引脚 QFN68L，封装尺寸为 7 × 7 × 0.75 mm，引脚间距为 0.35 mm；QFN 可采用 PTH 工艺，思澈科技（SiFli）推荐四层 PTH 叠层，所有引脚均从表层扇出。V 变体采用 175 球 WBBGA，封装尺寸为 6.5 × 6.1 × 0.94 mm，球间距为 0.4 mm、球径为 0.25 mm；不支持 PTH，需采用 HDI。WBBGA 最外侧两排球从表层扇出，其余球从内层扇出。布局发布前应确认 PCB 供应商支持所选叠层、阻焊和扇出策略。

### 6.2. 关键走线 { #62-critical-routing }

#### 6.2.1. 时钟走线 { #621-clock-routing }

晶体应放在屏蔽罩内，距板边大于 1 mm，并尽量与 PA、充电器和 PMU 等发热器件保持至少 5 mm 距离；晶体周围至少 0.25 mm 范围内不得放置其他金属或器件。48 MHz 晶体走线建议位于表层，长度 3–10 mm、线宽 0.075 mm，并做立体包地；远离 VBAT、DC-DC 和高速信号。32.768 kHz 晶体走线建议位于表层，长度不超过 10 mm、线宽 0.075 mm，32K_XI 与 32K_XO 的平行间距至少 0.15 mm。两种晶体下方表层及相邻层均应留空，禁止其他走线穿越。

#### 6.2.2. 射频走线 { #622-rf-routing }

RF 走线采用 50 Ω 单端阻抗，建议线宽大于 10 mil，并尽量保持在表层、避免过孔和锐角。匹配网络靠近芯片端而非天线端；AVDD_BRF 滤波电容靠近芯片管脚，电容地端通过过孔直接连接主地。RF 走线两侧应有连续接地屏蔽并以过孔连接主地；不得在 RF 下方或其区域内布置高 di/dt 电源线、高速时钟或 I2C、SPI、SDIO、I2S、UART 等数字信号。U 变体的 AVSS_RF1/2/3、V 变体的 AVSS_RRF、AVSS_TRF、AVSS_TRF2、AVSS_BB 均应可靠连接主地。

#### 6.2.3. 电源与接地 { #623-power-and-ground }

BUCK 电感和滤波电容靠近芯片引脚放置；BUCK_LX 走线应短且宽，反馈线 BUCK_FB 宽度不小于 0.25 mm。电感下方表层不铺铜，相邻层应为完整参考地，且电感区域内不得穿过其他走线。BUCK 输出电容地端应通过多个过孔接主地。PVDD 电容靠近引脚，PVDD 走线应短而宽；PVSS 通过过孔接主地。LDO 和 I/O 电源的滤波电容应靠近对应引脚，电源走线宽度应满足负载电流要求。

!!! warning "PVDD 走线宽度来源不一致"
    SF32LB56xU/V 硬件应用说明要求 PVDD 走线宽度至少为 0.5 mm；对应 PCB 核对表给出的下限为 8 mil。两者不一致，冻结布局前应向思澈科技（SiFli）或 PCB 设计责任人确认适用要求。

#### 6.2.4. 音频与模拟信号 { #624-audio-and-analog-signals }

AVDD33_ANA 和 AVDD33_AUD 应分别采用星形供电，走线做地保护并远离大电流噪声源；AVDD33_AUD、MIC_BIAS 和 AUD_VREF 的滤波电容靠近各自引脚，电容地端直接接主地。ADCP/ADCN 按差分对布线，相关器件靠近芯片，走线短并做地保护。DACP/DACN 也按差分对布线，寄生电容应低于 10 pF、走线长度小于 2 cm，并远离强干扰信号。GPADC 走线应做地保护，避开电池电量检测、温度检测等噪声源。

#### 6.2.5. USB 与 SDIO { #625-usb-and-sdio }

USB D+/D−（PA17/PA18）按 90 Ω 差分阻抗布线并做地保护。ESD 器件应靠近连接器，信号先经过 ESD 器件再到芯片，避免保护器件前出现支路；器件地端以短而宽的走线和过孔接主地。U 变体有一个 SDIO 接口，V 变体有 SDIO1、SDIO2 两个接口；SDIO 信号应成组布线，总长度不超过 50 mm，组内长度差不超过 6 mm。时钟应做地屏蔽，DATA 和 CMD 也应有地保护。

#### 6.2.6. EMI、ESD 与测试点 { #626-emi-esd-and-test-points }

避免在屏蔽罩外侧表层长距离布置时钟和电源等噪声信号，优先走内层。TVS/ESD 器件应靠近对应连接器；信号先经过保护器件，器件地焊盘以短而宽的走线和过孔连接主地。USB 充电线测试点应放在 TVS 前级，电池座 TVS 应位于电池平台前级，确保外部线路先经过 TVS 再到芯片。芯片下方地网络应充分连接，并通过盲孔/埋孔接入主地平面。

### 6.3. PCB 布局核对表 { #63-pcb-layout-checklist }

以下各表分别对应一个 PCB 布局审查区域。若表中没有“适用型号”列，则该项适用于工作簿所涵盖的全部型号。

#### 6.3.1. 封装 { #631-package }

<div align="center"><em>表 6.3-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PCB 焊盘图形符合器件封装规格 | 必检 |

</div>

#### 6.3.2. 电源 { #632-power-supply }

<div align="center"><em>表 6.3-2：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PVDD 供电走线宽度不小于 8 mil | 必检 |
| 2 | BUCK_LX 与 BUCK_FB 走线宽度不小于 8 mil | 必检 |
| 3 | VDDIO1 供电走线宽度不小于 5 mil | 必检 |
| 4 | VDDIO2 供电走线宽度不小于 8 mil | 必检 |
| 5 | VDDIO3 供电走线宽度不小于 5 mil | 必检 |
| 6 | VDDIO4 供电走线宽度不小于 6 mil | 必检 |
| 7 | VDDIOSC 供电走线宽度不小于 6 mil | 必检 |
| 8 | AVDD33_ANA 供电走线宽度不小于 6 mil | 必检 |
| 9 | AVDD33_AUD 供电走线宽度不小于 5 mil | 必检 |

</div>

#### 6.3.3. 电源电容与电感摆放 { #633-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>表 6.3-3：电源电容与电感摆放核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PVDD 电容靠近引脚放置 | 必检 |
| 2 | BUCK 电感靠近芯片放置 | 必检 |
| 3 | BUCK 去耦电容尽量靠近芯片引脚放置 | 必检 |
| 4 | LDO1_VOUT 电容靠近引脚放置 | 必检 |
| 5 | LDO2_VOUT 电容靠近引脚放置 | 必检 |
| 6 | VDD_RET 电容靠近引脚放置 | 必检 |
| 7 | VDD_RTC 电容靠近引脚放置 | 必检 |
| 8 | VDDIO1 电容靠近引脚放置 | 必检 |
| 9 | VDDIO2 电容靠近引脚放置 | 必检 |
| 10 | VDDIO3 电容靠近引脚放置 | 必检 |
| 11 | VDDIO4 电容靠近引脚放置 | 必检 |
| 12 | AVDD33_ANA 电容靠近引脚放置 | 必检 |
| 13 | AVDD33_AUD 电容靠近引脚放置 | 必检 |

</div>

#### 6.3.4. 时钟 { #634-clock }

<div align="center"><em>表 6.3-4：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 晶体靠近芯片放置 | 必检 |
| 2 | 晶体周围已做 GND 屏蔽 | 必检 |
| 3 | 晶体下方已做铜皮避让（4 层 PTH 板：顶层；6 层 HDI 板：顶层与第 2 层） | 必检 |
| 4 | 沿晶体走线的地铜间距大于走线宽度的 1.5 倍 | 必检 |
| 5 | 32 kHz 晶体并行走线对间距大于走线间距的 2 倍 | 必检 |

</div>

#### 6.3.5. 按键 { #635-buttons }

<div align="center"><em>表 6.3-5：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 按键 ESD 保护器件靠近按键放置 | 必检 |

</div>

#### 6.3.6. 射频 { #636-rf }

<div align="center"><em>表 6.3-6：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | RF 走线满足单端 50 Ω 特性阻抗要求 | 必检 |
| 2 | RF 走线宽度 ≥10 mil | 必检 |
| 3 | RF 走线两侧各预留至少 60 mil 的接地铜皮，并通过足够的接地过孔连接至主地 | 必检 |
| 4 | 预留的 Pi 型天线匹配网络靠近芯片侧放置 | 必检 |
| 5 | RF 信号下方为连续 GND 平面 | 必检 |
| 6 | RF 信号下方不得有高速数字信号穿越 | 必检 |
| 7 | RF 信号下方不得有高 di/dt 电源走线穿越 | 必检 |
| 8 | AVSS_RF1、AVSS_RF2 与 AVSS_RF3 已加强接地，并连接到主地平面 | 必检 |

</div>

#### 6.3.7. 音频 { #637-audio }

<div align="center"><em>表 6.3-7：音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | AU_ADCP/AU_ADCN 采用差分走线，并带地保护 | 必检 |
| 2 | AU_DACP/AU_DACN 采用差分走线，并带地保护 | 必检 |
| 3 | AU_DACP/AU_DACN 走线足够短，使寄生电容低于 10 pF | 必检 |
| 4 | AVDD33_ANA、AVDD33_AUD 电源走线已做地保护，远离大电流噪声信号，采用星形走线，且每条走线长度至少为 5 mm | 必检 |
| 5 | AVSS 通过过孔连接到主地平面 | 必检 |

</div>

#### 6.3.8. ADC { #638-adc }

<div align="center"><em>表 6.3-8：ADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | GPADC 信号旁如有高速信号平行走线，必须设置地保护 | 必检 |
| 2 | 电池电压分压电阻靠近芯片输入引脚放置 | 必检 |

</div>

#### 6.3.9. 测试点 { #639-test-points }

<div align="center"><em>表 6.3-9：测试点核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 测试点位置适合探针接触或治具焊接 | 必检 |
| 2 | 下载和晶体校准测试点包括 VBAT、GND、SWDIO、SWCLK、MODE、UART4_TXD、UART4_RXD，以及 PB20/PB21/PB25 中的一个；U 变体还需包括 VDDIO2 和 VDDIO3 或 VDDIO4，V 变体需包括 VDDIOA 和 VDDIOB，并满足治具的尺寸与位置要求 | 必检 |

</div>

#### 6.3.10. 地 { #6310-ground }

<div align="center"><em>表 6.3-10：地核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 主芯片相邻层为完整主地平面，并具备足够接地过孔 | 必检 |
| 2 | PVSS 通过过孔连接到主地 | 必检 |
| 3 | 芯片下方区域具备足够接地过孔，并连接至主地平面 | 必检 |
| 4 | 板边周围布有一圈接地过孔 | 必检 |

</div>
