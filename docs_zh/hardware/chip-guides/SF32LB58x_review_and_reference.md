---
icon: lucide/clipboard-check
description: "SF32LB58x 硬件设计指南的设计评审检查表、相关文档与参考资料、附录，以及修订历史。"
tags:
    - 硬件
    - 芯片
hide:
    - navigation
---

# SF32LB58x 硬件设计指南 — 设计评审检查表与参考资料 { #sf32lb58x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB58x 硬件设计指南的一部分"
    本页覆盖第 7-10 节：设计评审检查表、相关文档与参考资料、附录，以及修订历史。返回 [PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)。

## 7. 设计评审检查表 { #7-design-review-checklist }

- [ ] 确认所选型号的合封 Flash/PSRAM 配置满足产品需求
- [ ] 确认 PMU 供电（PVDD1/PVDD2/BUCK/LDO）及其他所有电源管脚的电压均在数据手册规定范围内
- [ ] 确认所选 BUCK 电感的标称电感值为 4.7 μH，且 DCR ≤ 0.4 Ω、Isat ≥ 500 mA
- [ ] 确认 48 MHz 和 32.768 kHz 晶体满足推荐规格，且走线和禁布区符合设计要求
- [ ] 确认射频走线按 50 Ω 阻抗控制，并将匹配网络靠近芯片放置
- [ ] 确认所选外部存储接口与预期启动方案兼容；另行确认 Mode 管脚已按预期稳定配置：高电平进入下载模式，低电平启动用户程序区
- [ ] 确认显示接口（MIPI-DSI/SPI-QSPI/MCU8080/DPI/JDI）走线满足各接口对应的阻抗和长度匹配要求；DSI 差分阻抗应为 100 Ω，单个差分对内的线长差应 ≤0.5 mm，不同差分对之间的线长差应 ≤2 mm
- [ ] 确认 USB 走线满足 90 Ω 差分阻抗要求。SDIO 信号应集中布线，整体走线长度 ≤50 mm，组内长度差 ≤6 mm
- [ ] 预留 SWD 调试接口，并从 6 路 UART 中选定调试输出接口及其信号管脚；同时预留量产测试点
- [ ] 确认 BGA 焊盘过孔位于焊盘中心，且芯片下方的地平面连续完整
- [ ] 对照最新版[思澈科技（SiFli）合格供应商名录（AVL）]核对关键器件型号
- [ ] 在评审证据包中附上叠层与工艺能力资料、阻抗和 DRC 结果、AVL，以及重点布局区域的截图
- [ ] 样机发布前关闭所有未解决的原理图、布局和制造问题；如暂时无法关闭，应明确记录并持续跟踪

## 8. 相关文档与参考资料 { #8-related-documents-and-references }

检查电气限制、封装数据、管脚复用、软件配置和器件适用性验证结果时，应以最新官方资料为准。

[SF32LB58x 产品简介]: https://downloads.sifli.com/silicon/PB0058-SF32LB58x-Product%20Brief%20V0p7.pdf
[SF32LB58x 数据手册]: https://downloads.sifli.com/user%20manual/DS5801-SF32LB58x-Datasheet%20V1p8p3.pdf
[SF32LB58x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB58x/UM5801%E2%80%90SF32LB58x%E2%80%90EN.pdf
[SF32LB58x 硬件应用说明]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md
[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB58x 产品简介]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB58x 用户手册]__
- :fontawesome-solid-file-lines: __[SF32LB58x 硬件应用说明]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-brands-wikipedia-w: __[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]__

</div>

第 5.8 节的[原理图核对表](SF32LB58x_schematic_checklist.md)和第 6.18 节的[PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)合起来，逐项复现了思澈科技（SiFli）官方工作簿 *SF32LB58x Schematic & PCB Checklist*（V1.0，2026-01-21）中适用的原理图与 PCB 检查项，并分别配套相应的设计指导。

## 9. 附录 { #9-appendices }

附录汇总应用场景和参考设计相关信息。实际设计时，应先满足第 5 节和第 6 节的原理图与 PCB 设计要求，再参考附录辅助评审。

<div align="center"><em>表 9-1：附录索引</em></div>

<div align="center" markdown>

| 需求 | 从这里开始 |
|:---|:---|
| 功能丰富的可穿戴设备或智能终端应用场景 | 附录 A：典型智能可穿戴设备或智能终端 |
| 原理图截图和电路级示例 | 第 5 节和 SF32LB58x 硬件应用说明 |
| BGA、HDI、RF、DSI、USB、SDIO、音频和电源 PCB 布局截图 | 第 6 节和 SF32LB58x 硬件应用说明 |

</div>

### 9.1. 附录 A. 典型智能可穿戴或智能终端 { #appendix-a-a-typical-smart-wearable-or-smart-terminal }

典型的 SF32LB58x 可穿戴设备或智能终端设计包含 MCU、PMIC、高分辨率显示屏、触摸控制器、启动存储、外部存储或 eMMC、传感器、振动马达、音频输入/输出、蓝牙（Bluetooth）天线、晶体、USB，以及调试和量产测试接口。BGA256 封装和高速显示/存储接口使 HDI 工艺的选择成为系统架构的一部分，而不只是 PCB 布局细节。

## 10. 修订历史 { #10-revision-history }

<div align="center"><em>表 10-1：修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 发布说明 |
|:---|:---|:---|
| 1.0 | 2026-07 | 更新 SF32LB58x 硬件设计指南，补充原理图、PCB、验证和量产评审指导 |
| 0.0.1 | 1/2025 | `SF32LB58x-HW-Application` 官方草案版本 |

</div>

### 10.1. 核对表修订历史 { #101-checklist-revision-history }

[原理图核对表](SF32LB58x_schematic_checklist.md)（第 5.8 节）和 [PCB 布局核对表](SF32LB58x_pcb_layout_checklist.md)（第 6.18 节）中的逐项核对内容独立于设计指南进行版本管理，版本编号沿用思澈科技（SiFli）官方 *SF32LB58x Schematic & PCB Checklist* 工作簿。

<div align="center"><em>表 10.1-1：核对表修订历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 检查表文档首次发布 |

</div>

[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
