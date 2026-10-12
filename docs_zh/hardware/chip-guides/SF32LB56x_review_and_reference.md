---
icon: lucide/clipboard-check
description: "SF32LB56x 硬件设计指南的设计评审检查表、相关文档与参考资料、附录，以及修订历史。"
tags:
    - 硬件
    - 芯片
hide:
    - navigation
---

# SF32LB56x 硬件设计指南 — 设计评审检查表与参考资料 { #sf32lb56x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB56x 硬件设计指南的一部分"
    本页覆盖第 7 至 10 节：设计评审检查表、相关文档与参考资料、附录，以及修订历史。返回 [PCB 布局指导](SF32LB56x_pcb_layout.md)。

## 7. 设计评审检查表 { #7-design-review-checklist }

- [ ] U/V 型号、封装、管脚定义和 PCB 工艺均已确认。
- [ ] 芯片各电源轨、PMIC 输出、电容、复位、充电器及低功耗开关均已完成评审。
- [ ] 工作模式、唤醒源、上拉电源轨及睡眠期间的漏电情况均已完成评审。
- [ ] 48 MHz 和 32.768 kHz 晶体参数、布局和走线已评审。
- [ ] RF 匹配网络、天线布局及调谐方案均已完成。
- [ ] 显示、存储、音频、传感器、PBR、UART/I2C、GPTIM、调试及量产相关管脚的分配均无冲突。
- [ ] QFN 或 BGA 扇出、叠层、阻抗、DRC 和 ESD 策略已完成。
- [ ] 量产烧录和晶体校准流程已测试。

## 8. 相关文档与参考资料 { #8-related-documents-and-references }

检查电气限制、封装数据、管脚复用、软件配置、元器件适用性验证和制造约束时，应以最新官方资料为准。

[SF32LB56xU 硬件应用说明]: https://wiki.sifli.com/en/hardware/SF32LB56xU-HW-Application.html
[SF32LB56xV 硬件应用说明]: https://wiki.sifli.com/en/hardware/SF32LB56xV-HW-Application.html
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB56xU 硬件应用说明]__
- :fontawesome-solid-file-lines: __[SF32LB56xV 硬件应用说明]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-brands-wikipedia-w: __[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]__

</div>

第 5.8 节的[原理图核对表](SF32LB56x_schematic_checklist.md)和第 6.3 节[PCB 布局指导](SF32LB56x_pcb_layout.md)均逐项复现思澈科技（SiFli）官方 *SF32LB56x Schematic & PCB Checklist*（V1.0，2026-01-21），并配有对应的原理图和 PCB 布局指导。

## 9. 附录 { #9-appendices }

### 9.1. 附录 A. 典型 SF32LB56x 产品 { #appendix-a-a-typical-sf32lb56x-product }

典型 SF32LB56x 产品包含 MCU、PMIC、显示和触摸控制器、启动存储、可选外部存储、传感器、振动马达、音频输入/输出、蓝牙（Bluetooth）天线、晶体，以及调试和量产测试接口。U 封装适合紧凑的 QFN 实现；V 封装支持更多接口，但需要规划 BGA/HDI 布局。

## 10. 修订历史 { #10-revision-history }

<div align="center"><em>表 10-1：修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:---|:---|:---|
| 0.1 | 2026-07 | 基于思澈科技（SiFli）官方 Wiki 中 SF32LB56xU 和 SF32LB56xV 硬件应用说明发布 SF32LB56x 硬件设计指南初版。 |

</div>

### 10.1. 核对表修订历史 { #101-checklist-revision-history }

[原理图核对表](SF32LB56x_schematic_checklist.md)以及 [PCB 布局指导](SF32LB56x_pcb_layout.md) 第 6.3 节中的逐项核对内容均独立于设计指南进行版本管理，版本号以思澈科技（SiFli）官方 *SF32LB56x Schematic & PCB Checklist* 工作簿为准。

<div align="center"><em>表 10.1-1：核对表修订历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 检查表文档首次发布 |

</div>
