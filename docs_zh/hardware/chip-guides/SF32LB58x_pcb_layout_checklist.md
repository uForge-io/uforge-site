---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB58x MCU 的逐项 PCB 布局评审核对表，覆盖封装、电源、时钟、RF、音频、高速信号与叠层检查项。"
tags:
    - 硬件
    - 芯片
    - 核对清单
---

# SF32LB58x 硬件设计指南 — PCB 布局核对表 { #sf32lb58x-hardware-design-guide-pcb-layout-checklist }

!!! note "SF32LB58x 硬件设计指南的一部分"
    本页覆盖第 6.18 节，逐项 PCB 布局核对表。返回 [PCB 布局指导](SF32LB58x_pcb_layout.md)。

## 6.18. PCB 布局核对表 { #618-pcb-layout-checklist }

以下各表分别对应一个 PCB 布局审查区域。若表中未设置“适用型号”列，则表示检查项适用于本核对表涵盖的所有 SF32LB58x PCB 设计。

### 6.18.1. 封装 { #6181-package }

<div align="center"><em>表 6.18.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PCB 焊盘图形与器件封装规格一致 | 必检 |

</div>

### 6.18.2. 电源 { #6182-power-supply }

<div align="center"><em>表 6.18.2-1：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | VDD1 供电走线至少 8 mil | 必检 |
| 2 | VDD2 供电走线至少 8 mil | 必检 |
| 3 | BUCK1_VSW 与 BUCK1_VOUT 走线至少 8 mil | 必检 |
| 4 | BUCK2_VSW 与 BUCK2_VOUT 走线至少 8 mil | 必检 |
| 5 | VDDIOA 供电走线至少 10 mil | 必检 |
| 6 | VDDIOA2 供电走线至少 10 mil | 必检 |
| 7 | VDDIOB 供电走线至少 10 mil | 必检 |
| 8 | VDDIOSA 供电走线至少 6 mil | 必检 |
| 9 | VDDIOSB 供电走线至少 6 mil | 必检 |
| 10 | VDDIOSC 供电走线至少 6 mil | 必检 |
| 11 | AVDD33_USB 供电走线至少 6 mil | 必检 |
| 12 | AVDD33_ANA 供电走线至少 6 mil | 必检 |
| 13 | AVDD_BRF 供电走线宽度至少为 8 mil | 必检 |
| 14 | AVDD33_AUD 供电走线至少 6 mil | 必检 |
| 15 | AVDD33_DSI 供电走线至少 8 mil | 必检 |

</div>

### 6.18.3. 电源电容与电感摆放 { #6183-power-supply-capacitor-and-inductor-placement }

<div align="center"><em>表 6.18.3-1：电源电容与电感摆放核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | VDD1 电容靠近引脚放置 | 必检 |
| 2 | VDD2 电容靠近引脚放置 | 必检 |
| 3 | BUCK1 电感靠近芯片放置 | 必检 |
| 4 | BUCK1 电容尽量靠近芯片引脚放置 | 必检 |
| 5 | BUCK2 电感靠近芯片放置 | 必检 |
| 6 | BUCK2 电容尽量靠近芯片引脚放置 | 必检 |
| 7 | HPSYS_LDO_VOUT 电容靠近引脚放置 | 必检 |
| 8 | LPMU_VDD07_RET 电容靠近引脚放置 | 必检 |
| 9 | LPMU_VDD11_RTC 电容靠近引脚放置 | 必检 |
| 10 | VDDIOA 电容靠近引脚放置 | 必检 |
| 11 | VDDIOA2 电容靠近引脚放置 | 必检 |
| 12 | VDDIOB 电容靠近引脚放置 | 必检 |
| 13 | VDDIOSA 电容靠近引脚放置 | 必检 |
| 14 | VDDIOSB 电容靠近引脚放置 | 必检 |
| 15 | VDDIOSC 电容靠近引脚放置 | 必检 |
| 16 | AVDD33_USB 电容靠近引脚放置 | 必检 |
| 17 | AVDD33_ANA 电容靠近引脚放置 | 必检 |
| 18 | AVDD_BRF 电容靠近引脚放置 | 必检 |
| 19 | AVDD33_AUD 电容靠近引脚放置 | 必检 |
| 20 | AVDD33_DSI 电容靠近引脚放置 | 必检 |

</div>

### 6.18.4. 时钟 { #6184-clock }

<div align="center"><em>表 6.18.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 晶体靠近芯片放置 | 必检 |
| 2 | 晶体周围已做 GND 屏蔽 | 必检 |
| 3 | 晶体下方应设置无铜区；四层板至少应在第 1 层（顶层）、第 2 层和第 3 层设置该禁布区 | 必检 |
| 4 | 晶体走线到 GND 护栏铜皮的间距大于走线宽度的 3 倍 | 必检 |

</div>

!!! warning "晶体禁布层数请向思澈科技（SiFli）确认"
    核对表工作簿要求四层 PCB 的第 1、2、3 层均设置铜箔禁布区；[PCB 布局指南](SF32LB58x_pcb_layout.md#65-clock-interface-routing)则要求在晶体区域的表层及其下方相邻层设置禁布区。两份源资料对是否包含第 3 层的要求不同。未经思澈科技（SiFli）确认，不要自行推定最终的第 3 层要求。

### 6.18.5. 按键 { #6185-buttons }

<div align="center"><em>表 6.18.5-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 按键 ESD 保护器件靠近按键放置 | 必检 |

</div>

### 6.18.6. 射频 { #6186-rf }

<div align="center"><em>表 6.18.6-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | RF 走线满足单端 50 Ω 特性阻抗要求 | 必检 |
| 2 | RF 走线宽度 ≥10 mil | 必检 |
| 3 | 预留的 Pi 型天线匹配网络靠近芯片侧放置 | 必检 |
| 4 | RF 信号下方为连续 GND 平面 | 必检 |
| 5 | RF 信号下方不得有高速数字信号穿越 | 必检 |
| 6 | RF 信号下方不得有高 di/dt 电源走线穿越 | 必检 |

</div>

### 6.18.7. 音频 { #6187-audio }

<div align="center"><em>表 6.18.7-1：音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | AU_ADC1P 与 AU_ADC1N 应平行走线，并做包地处理 | 必检 |
| 2 | AU_ADC2P 与 AU_ADC2N 应平行走线，并做包地处理 | 必检 |
| 3 | AU_DAC1P 与 AU_DAC1N 应平行走线，并做包地处理 | 必检 |
| 4 | AU_DAC2P 与 AU_DAC2N 应平行走线，并做包地处理 | 必检 |
| 5 | AU_DAC1P、AU_DAC1N、AU_DAC2P、AU_DAC2N 走线的电容 &lt; 10 pF，走线长度 &lt; 2 cm | 必检 |

</div>

!!! warning "源资料中的 DAC 走线长度限值不一致"
    本工作簿规定 DAC 走线长度小于 2 cm（20 mm），而 [PCB 布局指南](SF32LB58x_pcb_layout.md#67-audio-interface-routing)规定小于 2 mm。两份源资料的限值相差 10 倍。未经思澈科技（SiFli）确认，不要自行选用其中一个限值。

### 6.18.8. 高速信号 { #6188-high-speed-signals }

<div align="center"><em>表 6.18.8-1：高速信号核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | DSI 差分信号满足 100 Ω 差分阻抗要求 | 必检 |
| 2 | DSI 数据差分对与时钟差分对的长度匹配控制在 200 mil 以内 | 必检 |
| 3 | DSI 信号尽可能在同一层走线 | 必检 |

</div>

!!! warning "源资料中的 DSI 差分对间限值不一致"
    本工作簿要求 DSI 数据差分对与时钟差分对的长度差在 200 mil（5.08 mm）以内；[PCB 布局指南](SF32LB58x_pcb_layout.md#610-dsi-interface-routing)则规定差分对间的线长差应 ≤2 mm、差分对内应 ≤0.5 mm。两份源资料的差分对间限值不一致。请在定版前向思澈科技（SiFli）确认适用限值。

### 6.18.9. ADC { #6189-adc }

<div align="center"><em>表 6.18.9-1：ADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | GPADC 信号应避免与快速变化的信号平行走线；如无法避免，应做包地处理 | 必检 |
| 2 | 电池电压分压电阻靠近芯片输入引脚放置 | 必检 |
| 3 | SDMADC 信号应避免与快速变化的信号平行走线；如无法避免，应做包地处理 | 可选 |

</div>

### 6.18.10. 测试点 { #61810-test-points }

<div align="center"><em>表 6.18.10-1：测试点核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 测试点位置适合探针接触或治具焊接 | 必检 |
| 2 | 程序下载与晶体校准测试点（VBAT、GND、SWDIO、SWCLK、VDDIOB、MODE、RESET、UART4_TXD、UART4_RXD 等）满足治具尺寸与位置要求 | 必检 |

</div>

### 6.18.11. PCB 叠层 { #61811-pcb-stack-up }

<div align="center"><em>表 6.18.11-1：PCB 叠层核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 主芯片相邻层必须为连续主地平面 | 必检 |

</div>
