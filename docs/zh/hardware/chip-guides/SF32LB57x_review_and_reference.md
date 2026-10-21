---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB57x 硬件设计指南的客户设计自查表、相关文档与参考资料、附录，以及修订历史。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x 硬件设计指南 — 设计评审核对表与参考资料 { #sf32lb57x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB57x 硬件设计指南的一部分"
    本页覆盖第 7-10 节：客户设计自查表、相关文档与参考资料、附录，以及修订历史。返回 [PCB 布局指导](SF32LB57x_pcb_layout.md)。

## 7. 客户设计自查表 { #7-customer-design-self-check }

申请原理图评审、PCB 布局评审或 EVT 阶段放行前，请完成本节自查。客户设计负责人应记录各项结果和证据；必要时，附上原理图页码、PCB 截图、测量数据或评审记录。

### 7.1. 封装与型号 { #71-package-and-part-number }

- [ ] 订购型号、供电系列、封装和引脚定义已确认。
- [ ] 原理图库符号和 PCB 封装与数据手册一致。
- [ ] QFN<!-- BGA-ONLY -->/BGA<!-- /BGA-ONLY --> 封装焊盘、钢网、裸露焊盘和过孔设计均已评审。

### 7.2. 电源 { #72-power }

- [ ] 所有电源引脚均处于数据手册规定的电压和负载范围内；电容取值与布局符合数据手册要求。
- [ ] BUCK 电感、电容和反馈线满足布局布线要求。
- [ ] 内部 LDO 输出未被误用作大电流外设电源。
- [ ] 电源路径符合所选供电系列；依据准确的封装和型号电源表，核对适用的充电/OVP、VBUS、VBAT、VCC 和/或 PVDD 连接，不要混用电池供电系列与 3.3 V 供电系列的拓扑。
- [ ] 外设电源可关断，且默认状态安全。

### 7.3. 时钟 { #73-clocks }

- [ ] 48 MHz 晶体和 32.768 kHz 晶体参数符合推荐值。
- [ ] 晶体靠近芯片放置，周围留有禁布区。
- [ ] 晶体走线远离电源、RF、USB、SDIO、显示和充电噪声。

### 7.4. 存储与启动 { #74-storage-and-boot }

- [ ] 若所选型号包含合封存储，已针对该封装和型号确认其配置，以及对可用外部存储接口和封装引脚的影响。
- [ ] 外部启动介质类型、上拉、电源控制和默认状态正确。
- [ ] 启动配置和调试下载测试点已预留。

### 7.5. RF { #75-rf }

- [ ] 天线馈线按 50 Ω 特性阻抗设计并完成阻抗控制。
- [ ] π 型匹配网络靠近芯片端。
- [ ] RF 走线具有连续的参考地，并有地过孔屏蔽。
- [ ] RF 区域远离噪声源和高速接口。

### 7.6. 显示与触摸 { #76-display-and-touch }

- [ ] 显示接口、分辨率和引脚组满足目标屏要求。
- [ ] 显示电源、背光、触摸电源可控。
- [ ] 触摸中断如需唤醒，连接到可唤醒 GPIO。
- [ ] FPC 和高速显示线远离 RF。

### 7.7. 音频与模拟 { #77-audio-and-analog }

- [ ] MIC_BIAS、AUD_VREF、AVDD33_AUD 去耦正确。
- [ ] 模拟输入隔直电容和滤波正确。
- [ ] DACP/DACN 差分走线和匹配网络正确。
- [ ] GPADC 输入电压、分压电路、滤波和屏蔽设计均正确。

### 7.8. 通用接口 { #78-general-interfaces }

- [ ] UART、I2C、SPI、SDIO、USB、CAN 接线和 IO 电平匹配。
- [ ] I2C 上拉电源与对应外设的 IO 供电域同步通断，避免该电源域关闭时产生漏电。
- [ ] 按需实现 USB ESD 防护、90 Ω 差分布线和 VBUS 唤醒检测。
- [ ] 外部唤醒信号均使用支持唤醒的引脚。

### 7.9. 量产与可靠性 { #79-production-and-reliability }

- [ ] DBG-UART、SWD、启动模式、PA00、PA01、PA34、电源和地测试点已预留。
- [ ] 测试点满足夹具探针要求。
- [ ] ESD、EOS、OVP、防反接和浪涌策略已评审。
- [ ] 产线烧录、晶体校准和 RF 测试流程可执行。

### 7.10. 设计评审放行标准 { #710-review-release-criteria }

设计冻结前，请按以下标准确认是否可以放行：

- [ ] 所有适用的检查项均已闭环，并附有原理图页码、PCB 截图、测量数据或评审记录等证据；标记为不适用的项目均注明理由。
- [ ] 与数据手册或参考设计不同的地方均有项目级设计理由。
- [ ] RF、晶体、充电、电源、USB、显示、音频和量产测试点已经由对应负责人评审。
- [ ] 低功耗电流预算已包含所有外设待机电流、上拉电流和电源芯片 Iq。
- [ ] EVT 启动调试所需的固件下载、日志获取、电流测量、复位及启动控制接口均可访问。

## 8. 相关文档与参考资料 { #8-related-documents-and-references }

检查电气限制、封装数据、引脚复用、软件配置、元器件适用性验证和制造约束时，应以最新官方资料为准。

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB57x 产品简介]__
- :fontawesome-solid-file-pdf: __[SF32LB57x 数据手册]__
- :fontawesome-solid-file-pdf: __[SF32LB57x 用户手册]__
- :fontawesome-solid-file-lines: __[SF32LB57x 硬件应用说明]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__

</div>

[原理图核对表](SF32LB57x_schematic_checklist.md)（第 5.8 节）与 [PCB 布局核对表](SF32LB57x_pcb_layout_checklist.md)（第 6.10 节）逐项复现了思澈科技（SiFli）官方的 SF32LB57x 设计自查表，并附有与之对应的原理图和 PCB 布局设计指导，可对照查阅。

## 9. 附录 { #9-appendices }

附录汇总应用场景和参考设计相关信息。实际设计时，应先满足第 5 节和第 6 节的原理图与 PCB 设计要求，再参考附录辅助评审。

<div align="center"><em>表 9-1：附录索引</em></div>

<div align="center" markdown>

| 需求 | 从这里开始 |
|:---|:---|
| 最小系统原理图示例 | 第 5.1.2 节 |
| 封装、焊盘、钢网、叠层、扇出、电源、RF、音频、SDIO、USB 和 TVS 参考图 | 第 6.9 节 |
| 客户设计自查表 | 第 7 节 |

</div>

### 9.1. 附录 A. 典型 SF32LB57x 产品 { #appendix-a-a-typical-sf32lb57x-product }

典型 SF32LB57x 产品可包括 MCU、电源系统、48 MHz 和 32.768 kHz 晶体、RF 匹配网络和天线、显示与触摸控制器、启动存储、音频输入/输出、传感器、可选摄像头，以及产品所需的 USB/SDIO/CAN/UART/I2C/SPI 外设，并预留调试和量产测试接口。应根据所选电源架构，评估充电、OVP、负载开关选型及低功耗状态下的漏电流。

## 10. 修订历史 { #10-revision-history }

<div align="center"><em>表 10-1：修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:-----|:-----|:-----|
| 0.5 | 2026-08 | 恢复与官方应用说明一致的完整内容深度：新增按封装/供电系列区分的四张电源引脚参考表、默认调试端口表、RF 原理图、完整的显示信号表（SPI/QSPI、RGB、RGB 模式配置、MCU8080、EPD、并行/串行 JDI、触摸/背光）、模拟麦克风/PDM 麦克风/音频功放参考电路图、完整的芯片专属摄像头信号表、IO MUX 表、矩阵表、LCDC 矩阵子复用表、USB 引脚表、按引脚展开的 GPADC 表，以及电源键/GPADC 按键参考电路图；将官方设计自查表拆分为新增的配套 [原理图核对表](SF32LB57x_schematic_checklist.md)和 [PCB 布局核对表](SF32LB57x_pcb_layout_checklist.md)页面，确保不遗漏任何检查项。 |
| 0.4 | 2026-08 | 依据官方 SF32LB57x 硬件应用说明核对事实：更正 `VCC`/`VBAT` 引脚表最小值（3.0 V，而非 3.2 V）；新增 2.7 V 硬件关断阈值；将 `VDD33_VOUT1` 软启动限流更正为 30 mA；更正 32.768 kHz 晶体负载电容选项（7 pF 或 11.5 pF，芯片默认 11.5 pF）；明确 `PA34` 电源/复位按键电路及 GPADC 分压式按键设计；新增 GPADC 0 V–3.3 V 输入范围及 100 nF 滤波电容要求；新增 `BUCK_FB`/`VDDIOA`/`VBATS`/`AVDD33_ANA` 电容取值；新增 MPI 总线长度/偏斜（skew）及晶体位置间距的 PCB 约束；新增 4 层叠层分配方案。 |
| 0.3 | 2026-07 | 重构原理图设计章节，将最小系统设计、电源系统、时钟生成、RF、用户接口、存储与连接、制造拆分为同级章节。 |
| 0.2 | 2026-07 | 增加设计证据包、启动调试指导、低功耗验证、RF/显示/音频/摄像头验证和 PCB 关键约束速查。 |
| 0.1 | 2026-07 | 基于官方硬件应用说明发布 SF32LB57x 硬件设计指南初版。 |
| 0.0.1 | 2026-06 | 源文件版本 0.0.1：SF32LB57x 硬件应用说明初版；与本指南版本独立。 |

</div>

### 10.1. 核对表修订历史 { #101-checklist-revision-history }

[原理图核对表](SF32LB57x_schematic_checklist.md)和 [PCB 布局核对表](SF32LB57x_pcb_layout_checklist.md)独立于设计指南进行版本管理，版本编号依据思澈科技（SiFli）SF32LB57x 硬件应用说明中的设计自查表确定。

<div align="center"><em>表 10.1-1：核对表修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:-----|:-----|:-----|
| 1.0 | 2026-08 | 初始发布，完整转录自思澈科技（SiFli）官方 SF32LB57x 硬件应用说明（2026-06 版）第 4 节的设计自查表。 |

</div>

[SF32LB57x 产品简介]: https://downloads.sifli.com/silicon/PB0057-SF32LB57x-Product%20Brief.pdf
[SF32LB57x 数据手册]: https://downloads.sifli.com/user%20manual/DS5701-SF32LB57x-Datasheet.pdf
[SF32LB57x 用户手册]: https://downloads.sifli.com/docs/user%20manual/SF32LB57x/UM5701-SF32LB57x-CN.pdf
[SF32LB57x 硬件应用说明]: https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
