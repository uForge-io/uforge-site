---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB52x MCU 的逐项 PCB 布局评审核对表，覆盖封装、走线、电源与接地检查项。"
tags:
    - 硬件
    - 芯片
    - 核对清单
---

# SF32LB52x 硬件设计指南 — PCB 布局核对表 { #sf32lb52x-hardware-design-guide-pcb-layout-checklist }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页为第 6.15 节 PCB 布局逐项核对表。布局要求见 [PCB 布局指导](SF32LB52x_pcb_layout.md)。

## 6.15. PCB 布局核对表 { #615-pcb-layout-checklist }

源 PCB 核对表没有“适用型号”列。检查时，应先确认所选型号和电路是否包含对应管脚、电源轨或功能；不存在的项目标为“不适用”。保留源表的“必检/可选”分类，但“可选”不代表可以省略器件规格要求的元件。

!!! note "源资料限值与未明确的表述"
    检查表时钟第 3 项没有明确哪些层需要设置铜箔禁布区。电池供电型号应用说明自身存在冲突：时钟章节要求移除晶体下方的 L2 地铜，而 PCB 走线章节禁止顶层和相邻层平面挖空或切除铜箔，且走线模型显示 L2 地铜连续；独立的 PCB 布局指南也重复了不得挖空的要求。发布前应向思澈科技（SiFli）确认所选叠层的处理方式，不要仅凭检查表文字推断。

!!! note "走线宽度核对"
    源表规定 VCC ≥12 mil、BUCK 走线 ≥10 mil、RF ≥10 mil。第 6 节对 VCC 和 BUCK 有更严格的指导，并建议 RF >10 mil。应同时满足两处适用的要求，包括 RF 的 50 Ω 阻抗要求；不能用核对表中的最小值替代详细布局指导。

### 6.15.1. 封装 { #6151-package }

<div align="center"><em>表 6.15.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PCB 焊盘图形（footprint）与芯片封装规格一致 | 必检 |

</div>

### 6.15.2. 电源走线 { #6152-power-supply-routing }

<div align="center"><em>表 6.15.2-1：电源走线核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | <span class="flag-red">VBUS 供电走线宽度 ≥16 mil</span> | 必检 |
| 2 | <span class="flag-red">VBAT 供电走线宽度 ≥16 mil</span> | 必检 |
| 3 | <span class="flag-red">VCC 供电走线宽度 ≥12 mil</span> | 必检 |
| 4 | LDO2_OUT 供电走线宽度 ≥10 mil | 必检 |
| 5 | LDO3_OUT 供电走线宽度 ≥8 mil | 必检 |
| 6 | <span class="flag-red">PMU_BUCK_VSW 与 PMU_BUCK_VOUT 走线宽度 ≥10 mil</span> | 必检 |
| 7 | AVDD_BRF 供电走线宽度 ≥8 mil | 必检 |
| 8 | <span class="flag-red">AVDD33_AUD 供电走线宽度 ≥8 mil</span> | 必检 |

</div>

### 6.15.3. 电源电容与电感摆放 { #6153-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>表 6.15.3-1：电源电容与电感摆放核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | VBUS 电容靠近引脚放置 | 必检 |
| 2 | VBAT 电容靠近引脚放置 | <span class="flag-red">可选</span> |
| 3 | VCC 电容靠近引脚放置 | 必检 |
| 4 | LDO2_OUT 电容靠近引脚放置 | <span class="flag-red">可选</span> |
| 5 | LDO3_OUT 电容靠近引脚放置 | <span class="flag-red">可选</span> |
| 6 | VSYS 电容靠近引脚放置 | 必检 |
| 7 | BUCK 电感靠近芯片放置 | <span class="flag-red">可选</span> |
| 8 | BUCK 去耦电容尽量靠近芯片引脚放置 | 必检 |
| 9 | VDD_HPSYS 电容靠近引脚放置 | 必检 |
| 10 | VDD_LPSYS 电容靠近引脚放置 | 必检 |
| 11 | VDD_RET 电容靠近引脚放置 | 必检 |
| 12 | VDD_RTC 电容靠近引脚放置 | 必检 |
| 13 | AVDD_BRF 电容靠近引脚放置 | 必检 |
| 14 | AVDD<span class="flag-red">33</span>_AUD 电容靠近引脚放置 | 必检 |

</div>

### 6.15.4. 时钟 { #6154-clock }

<div align="center"><em>表 6.15.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 晶体靠近芯片放置 | 必检 |
| 2 | 晶体周围已做 GND 屏蔽 | 必检 |
| 3 | 已针对所选叠层向思澈科技（SiFli）确认晶体区域的铜箔处理方式；参见上方源资料差异说明 | 必检 |
| 4 | 晶体走线与相邻地铜边缘之间的间距大于走线宽度的 1.5 倍 | 必检 |
| 5 | 32.768 kHz 晶体 XI/XO 平行走线间距 ≥0.15 mm | 必检 |

</div>

### 6.15.5. 按键 { #6155-buttons }

<div align="center"><em>表 6.15.5-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 按键 ESD 保护器件靠近按键放置 | 必检 |

</div>

### 6.15.6. 射频 { #6156-rf }

<div align="center"><em>表 6.15.6-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | RF 走线满足单端 50 Ω 特性阻抗要求 | 必检 |
| 2 | RF 走线宽度 ≥10 mil | 必检 |
| 3 | RF 走线两侧各有宽度至少 60 mil 的地铜，并通过足够的地过孔连接主地 | 必检 |
| 4 | 预留的 π 型天线匹配网络靠近芯片侧放置 | 必检 |
| 5 | RF 信号下方为连续 GND 平面 | 必检 |
| 6 | RF 信号下方不得有高速数字信号穿越 | 必检 |
| 7 | RF 信号下方不得有高 di/dt 电源走线穿越 | 必检 |

</div>

### 6.15.7. 音频 { #6157-audio }

<div align="center"><em>表 6.15.7-1：音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | ADCP 已做好立体包地处理 | 必检 |
| 2 | DACP/DACN 采用差分走线，并做好立体包地处理 | 必检 |
| 3 | DACP/DACN 走线足够短，使寄生电容保持在 10 pF 以下 | 必检 |
| 4 | AVDD_BRF/AVDD<span class="flag-red">33</span>_AUD 电源走线已做地保护，并远离大电流和强干扰信号 | 必检 |

</div>

### 6.15.8. ADC { #6158-adc }

<div align="center"><em>表 6.15.8-1：ADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 与 GPADC 信号平行的高速信号走线已做地保护；不得在无地保护的情况下平行走线 | 必检 |

</div>

### 6.15.9. 测试点 { #6159-test-points }

<div align="center"><em>表 6.15.9-1：测试点核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 测试点位置适合探针接触或治具焊接 | 必检 |
| 2 | 程序下载测试点（VBAT、GND、PA18/DBG_UART_RXD、PA19/DBG_UART_TXD、LDO2_OUT、PA0、PA1、PA34 等）满足测试治具的尺寸与位置要求 | 必检 |

</div>

### 6.15.10. 地 { #61510-ground }

<div align="center"><em>表 6.15.10-1：地核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 主芯片相邻层为完整主地平面，并具备足够接地过孔 | 必检 |
| 2 | 裸露焊盘（EPAD）通过过孔连接到主地 | 必检 |
| 3 | 芯片下方区域具备足够接地过孔，并连接至主地平面 | 必检 |
| 4 | <span class="flag-red">板边周围布有一圈接地过孔</span> | 必检 |

</div>
