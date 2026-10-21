---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB52x 硬件设计指南的设计评审检查表、相关文档与参考资料、参考原理图/PCB/机械/电源附录，以及修订历史。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x 硬件设计指南 — 设计评审检查表与参考资料 { #sf32lb52x-hardware-design-guide-design-review-checklist-and-references }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页汇总第 7–10 节：设计评审检查表、相关文档与参考资料、附录，以及修订历史。返回 [PCB 布局指导](SF32LB52x_pcb_layout.md)。

## 7. 设计评审检查表 { #7-design-review-checklist }

- [ ] 最小系统评审已完成：具体型号、封装、电源树、启动介质、启动配置管脚、调试/下载接口、时钟和唤醒策略均已记录
- [ ] 已确认具体芯片型号和供电型号，未混用两种供电型号的电源原理图
- [ ] 处理器电源管脚（VBUS/VBAT/VCC，或 PVDD/VDDIOA/VDD_SIP）处于数据手册规定的电压范围内
- [ ] BUCK 电感满足 4.7 μH ±20%、DCR ≤0.4 Ω、Isat ≥450 mA
- [ ] 电池供电型号：充电路径、OVP 器件电压范围和集成 LDO 输出电容已验证
- [ ] 48 MHz 和 32.768 kHz 晶体满足推荐规格，布局和禁布区满足要求
- [ ] RF 走线阻抗为 50 Ω，且匹配网络靠近芯片放置
- [ ] 存储启动配置（包括外部稳压供电型号的 eMMC 选项）与 Bootstrap 管脚设置一致
- [ ] 已按具体型号核对存储电源开关控制管脚；发布前应解决官方核对表与应用说明中 PA11/PA21 的标注差异
- [ ] USB DP/DN 按差分对走线，差分阻抗为 90 Ω
- [ ] SDIO 信号成组走线，总长度 ≤50 mm，组内长度差 ≤6 mm，并做好包地处理
- [ ] 已预留 DBG_UART/SWD 复用管脚和量产测试点
- [ ] 关键元器件型号已按最新[思澈科技（SiFli）合格供应商名录（AVL）][思澈科技（SiFli）合格供应商名录（AVL）]核实

## 8. 相关文档与参考资料 { #8-related-documents-and-references }

[SF32LB52x 数据手册（官方 PDF）]: https://downloads.sifli.com/silicon/DS0052-SF32LB52x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V2p4.pdf?
[SF32LB52x 用户手册（官方 PDF）]: https://downloads.sifli.com/silicon/UM0052-SF32LB52x-%E7%94%A8%E6%88%B7%E6%89%8B%E5%86%8C%20V0p3.pdf?
[SF32LB52 硬件参考设计包]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52-%E7%A1%AC%E4%BB%B6%E5%8F%82%E8%80%83%E8%AE%BE%E8%AE%A1-20250619.zip?
[SF32LB520/3/5/7 硬件应用说明（源文件）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB520-3-5-7-HW-Application.md
[52B/D/E/G/J 硬件应用说明（源文件）]: https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB52B-E-G-J-HW-Application.md
[本站思澈科技（SiFli）合格供应商名录]: ../cad-components/sifli-approved-vendor-list.md
[思澈科技（SiFli）SF32LB52 原理图与 PCB 核对表（XLSX）]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx
[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[SF32LB52x 数据手册（官方 PDF）]__
- :fontawesome-solid-file-pdf: __[SF32LB52x 用户手册（官方 PDF）]__
- :fontawesome-solid-file-zipper: __[SF32LB52 硬件参考设计包]__
- :fontawesome-brands-github: __[SF32LB520/3/5/7 硬件应用说明（源文件）]__
- :fontawesome-brands-github: __[52B/D/E/G/J 硬件应用说明（源文件）]__
- :fontawesome-solid-file-excel: __[本站思澈科技（SiFli）合格供应商名录]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）SF32LB52 原理图与 PCB 核对表（XLSX）]__
- :fontawesome-brands-wikipedia-w: __[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]__

</div>

其他参考资料：

- [SF32LB52x 产品简介](https://downloads.sifli.com/user%20manual/PB5201-SF32LB52x-Product%20Brief.pdf)
- [SF32LB52x 数据手册](https://downloads.sifli.com/user%20manual/DS5201-SF32LB52x-Datasheet%20V2p5p3.pdf)
- [SF32LB52x 参考手册](https://downloads.sifli.com/user%20manual/UM5201-SF32LB52x-User%20Manual%20V0p8p4.pdf)
- [SF32LB520/3/5/7 硬件应用说明](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB520-3-5-7-HW-Application.md)
- [52B/D/E/G/J 硬件应用说明](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB52B-E-G-J-HW-Application.md)

第 5.8 节的[原理图核对表](SF32LB52x_schematic_checklist.md)和第 6.15 节的[PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)，逐项复现了思澈科技（SiFli）官方 *SF32LB52 Schematic & PCB Checklist*（V1.0，2026-01-21）的内容，并分别与相应的原理图和 PCB 布局指导配套使用。

## 9. 附录 { #9-appendices }

思澈科技（SiFli）原始应用说明包含以下原理图、PCB 布局、机械和电源参考图。本附录保留这些原始参考图，供设计评审核对；实际设计仍应以第 5 节和第 6 节为主要依据。

!!! note "如何使用这些图片"
    这些图片来自源应用说明中的参考电路和布局示例。最终实现仍需结合正文规则、表格、数据手册、参考手册、最新参考设计包和 AVL，按具体器件和产品进行确认。

<div align="center"><em>表 9-1：附录索引</em></div>

<div align="center" markdown>

| 需求 | 从这里开始 |
|:---|:---|
| 两个 SF32LB52x 设计分组的智能手表框图示例 | 附录 A：典型智能手表应用 |
| RF、存储/启动、按键、马达、音频、时钟、USB 和 DC/DC 电路级原理图示例 | 附录 B：参考原理图 |
| RF、存储、音频、叠层、扇出、时钟、USB 和 DC/DC PCB 摆放与走线示例 | 附录 C：参考 PCB 布局 |
| 封装外形、形状和推荐焊盘图 | 附录 D：封装与机械结构 |
| 充电、OVP、电源树和 PMU 参考电路与布局 | 附录 E：电源 |

</div>

### 9.1. 附录 A. 典型智能手表应用 { #appendix-a-a-typical-smart-watch-application }

典型 SF32LB52x 智能手表设计包含 MCU、显示屏、触摸控制器、存储器、传感器、振动马达、音频输入/输出、蓝牙（Bluetooth）天线、时钟源、电源管理，以及调试接口和量产测试接口。电池供电设计另含充电管理。
图 9.1-1 和图 9.1-2 展示了 QSPI 显示屏、SPI 加速度计/陀螺仪、I2C 心率模组、模拟麦克风与 DAC 至功放的音频路径、PWM 驱动的振动马达、48 MHz 时钟、蓝牙 RF 路径，以及 SWD/UART 接口。图中的存储示例列出 QSPI NAND、SD NAND 和 NOR Flash，并不是完整的启动介质清单。两张图都画有外部充电器和 Buck/LDO 电源路径；实际电源架构应按第 5.2 节选择，不能把框图当作必须照搬的电路。


![图 9.1-1：SF32LB520/3/5/7 智能手表应用框图](../../sf32-products/chips/assets/52xA/sf32lb52x-A-watch-app-diagram-52x.png){ loading="lazy" }

<div align="center"><em>图 9.1-1：SF32LB520/3/5/7 智能手表应用框图</em></div>

![图 9.1-2：52B/D/E/G/J 智能手表应用框图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-watch-app-diagram-52X.png){ loading="lazy" }

<div align="center"><em>图 9.1-2：52B/D/E/G/J 智能手表应用框图</em></div>

### 9.2. 附录 B. 参考原理图 { #appendix-b-reference-schematics }

**RF**

![图 9.2-1：RF 前端框图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ loading="lazy" }

<div align="center"><em>图 9.2-1：RF 前端框图</em></div>

![图 9.2-2：RF 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF.png){ loading="lazy" }

<div align="center"><em>图 9.2-2：RF 原理图参考</em></div>

![图 9.2-3：RF 原理图走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-RF-2.png){ loading="lazy" }

<div align="center"><em>图 9.2-3：RF 原理图走线参考</em></div>

**存储和启动**

![图 9.2-4：SF32LB520/3/5/7 Bootstrap 参考](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ loading="lazy" }

<div align="center"><em>图 9.2-4：SF32LB520/3/5/7 Bootstrap 参考</em></div>

![图 9.2-5：52B/D/E/G/J Bootstrap 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ loading="lazy" }

<div align="center"><em>图 9.2-5：52B/D/E/G/J Bootstrap 参考</em></div>

![图 9.2-6：SDIO 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-SDIO.png){ loading="lazy" }

<div align="center"><em>图 9.2-6：SDIO 原理图参考</em></div>

**按键、马达和音频**

![图 9.2-7：SF32LB520/3/5/7 振动马达参考](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ loading="lazy" }

<div align="center"><em>图 9.2-7：SF32LB520/3/5/7 振动马达参考</em></div>

![图 9.2-8：52B/D/E/G/J 振动马达参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ loading="lazy" }

<div align="center"><em>图 9.2-8：52B/D/E/G/J 振动马达参考</em></div>

![图 9.2-9：电源键参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ loading="lazy" }

<div align="center"><em>图 9.2-9：电源键参考</em></div>

![图 9.2-10：旋转编码器按键参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ loading="lazy" }

<div align="center"><em>图 9.2-10：旋转编码器按键参考</em></div>

![图 9.2-11：模拟 MEMS 麦克风参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ loading="lazy" }

<div align="center"><em>图 9.2-11：模拟 MEMS 麦克风参考</em></div>

![图 9.2-12：模拟 ECM 麦克风参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ loading="lazy" }

<div align="center"><em>图 9.2-12：模拟 ECM 麦克风参考</em></div>

![图 9.2-13：模拟 DAC 到 PA 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ loading="lazy" }

<div align="center"><em>图 9.2-13：模拟 DAC 到 PA 参考</em></div>

![图 9.2-14：音频电源原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>图 9.2-14：音频电源原理图参考</em></div>

![图 9.2-15：音频 ADC 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>图 9.2-15：音频 ADC 原理图参考</em></div>

![图 9.2-16：音频 DAC 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>图 9.2-16：音频 DAC 原理图参考</em></div>

**时钟**

![图 9.2-17：48 MHz 晶体原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-SCH.png){ loading="lazy" }

<div align="center"><em>图 9.2-17：48 MHz 晶体原理图</em></div>

![图 9.2-18：32.768 kHz 晶体原理图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-SCH.png){ loading="lazy" }

<div align="center"><em>图 9.2-18：32.768 kHz 晶体原理图</em></div>

**USB**

![图 9.2-19：USB 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-USB.png){ loading="lazy" }

<div align="center"><em>图 9.2-19：USB 原理图参考</em></div>

**DC/DC**

![图 9.2-20：DC/DC 原理图参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-SCH-DCDC.png){ loading="lazy" }

<div align="center"><em>图 9.2-20：DC/DC 原理图参考</em></div>

### 9.3. 附录 C. 参考 PCB 布局 { #appendix-c-reference-pcb-layouts }

**RF**

![图 9.3-1：RF PCB 匹配参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF.png){ loading="lazy" }

<div align="center"><em>图 9.3-1：RF PCB 匹配参考</em></div>

![图 9.3-2：RF PCB 走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RF-ROUTE.png){ loading="lazy" }

<div align="center"><em>图 9.3-2：RF PCB 走线参考</em></div>

**存储**

![图 9.3-3：SDIO PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-SDIO.png){ loading="lazy" }

<div align="center"><em>图 9.3-3：SDIO PCB 参考</em></div>

**音频**

![图 9.3-4：音频电源 PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-PWR.png){ loading="lazy" }

<div align="center"><em>图 9.3-4：音频电源 PCB 参考</em></div>

![图 9.3-5：音频 ADC PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-ADC.png){ loading="lazy" }

<div align="center"><em>图 9.3-5：音频 ADC PCB 参考</em></div>

![图 9.3-6：音频 DAC PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-AUDIO-DAC.png){ loading="lazy" }

<div align="center"><em>图 9.3-6：音频 DAC PCB 参考</em></div>

**PCB 基础**

![图 9.3-7：PCB 叠层参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-STACK.png){ loading="lazy" }

<div align="center"><em>图 9.3-7：PCB 叠层参考</em></div>

![图 9.3-8：PCB 设计规则参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-RULE.png){ loading="lazy" }

<div align="center"><em>图 9.3-8：PCB 设计规则参考</em></div>

![图 9.3-9：QFN 扇出参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-FANOUT.png){ loading="lazy" }

<div align="center"><em>图 9.3-9：QFN 扇出参考</em></div>

![图 9.3-10：晶体摆放参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-CRYSTAL.png){ loading="lazy" }

<div align="center"><em>图 9.3-10：晶体摆放参考</em></div>

**时钟走线**

![图 9.3-11：48 MHz 晶体走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-MOD.png){ loading="lazy" }

<div align="center"><em>图 9.3-11：48 MHz 晶体走线模型</em></div>

![图 9.3-12：48 MHz 晶体走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-48M-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>图 9.3-12：48 MHz 晶体走线参考</em></div>

![图 9.3-13：32.768 kHz 晶体走线模型](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-MOD.png){ loading="lazy" }

<div align="center"><em>图 9.3-13：32.768 kHz 晶体走线模型</em></div>

![图 9.3-14：32.768 kHz 晶体走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-32K-ROUTE-REF.png){ loading="lazy" }

<div align="center"><em>图 9.3-14：32.768 kHz 晶体走线参考</em></div>

**USB**

![图 9.3-15：USB PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB.png){ loading="lazy" }

<div align="center"><em>图 9.3-15：USB PCB 参考</em></div>

![图 9.3-16：USB 布局参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-LAYOUT.png){ loading="lazy" }

<div align="center"><em>图 9.3-16：USB 布局参考</em></div>

![图 9.3-17：USB 走线参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-USB-ROUTE.png){ loading="lazy" }

<div align="center"><em>图 9.3-17：USB 走线参考</em></div>

**DC/DC**

![图 9.3-18：DC/DC PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-DCDC.png){ loading="lazy" }

<div align="center"><em>图 9.3-18：DC/DC PCB 参考</em></div>

### 9.4. 附录 D. 封装与机械结构 { #appendix-d-mechanical }

![图 9.4-1：SF32LB520/3/5/7 封装布局](../../sf32-products/chips/assets/52xA/sf32lb52x-A-package-layout.png){ loading="lazy" }

<div align="center"><em>图 9.4-1：SF32LB520/3/5/7 封装布局</em></div>

![图 9.4-2：52B/D/E/G/J 封装布局](../../sf32-products/chips/assets/52xB/sf32lb52X-B-package-layout.png){ loading="lazy" }

<div align="center"><em>图 9.4-2：52B/D/E/G/J 封装布局</em></div>

![图 9.4-3：QFN68L 封装尺寸](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-POD.png){ loading="lazy" }

<div align="center"><em>图 9.4-3：QFN68L 封装尺寸</em></div>

![图 9.4-4：QFN68L 封装形状](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-SHAPE.png){ loading="lazy" }

<div align="center"><em>图 9.4-4：QFN68L 封装形状</em></div>

![图 9.4-5：QFN68L 推荐焊盘](../../sf32-products/chips/assets/52xB/sf32lb52X-B-QFN68L-REF.png){ loading="lazy" }

<div align="center"><em>图 9.4-5：QFN68L 推荐焊盘</em></div>

### 9.5. 附录 E. 电源 { #appendix-e-power }

**SF32LB520/3/5/7（电池供电）**

下图展示了带或不带电源路径管理（PPM）的两种外部充电电路，以及集成充电器电路。

![图 9.5-1：不带 PPM 的外部充电电路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-NPPM.png){ loading="lazy" }

<div align="center"><em>图 9.5-1：不带电源路径管理（PPM）的外部充电电路</em></div>

![图 9.5-2：带 PPM 的外部充电电路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-PPM.png){ loading="lazy" }

<div align="center"><em>图 9.5-2：带电源路径管理（PPM）的外部充电电路</em></div>

![图 9.5-3：集成充电器电路](../../sf32-products/chips/assets/52xA/sf32lb52x-CHG-INNER.png){ loading="lazy" }

<div align="center"><em>图 9.5-3：集成充电器电路</em></div>

![图 9.5-4：OVP 阈值设置](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-SET.png){ loading="lazy" }

<div align="center"><em>图 9.5-4：OVP 阈值设置</em></div>

![图 9.5-5：可调 OVLO OVP 应用](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-OVLO.png){ loading="lazy" }

<div align="center"><em>图 9.5-5：可调 OVLO OVP 应用</em></div>

![图 9.5-6：稳压输出 OVP 应用](../../sf32-products/chips/assets/52xA/sf32lb52x-OVP-REGU.png){ loading="lazy" }

<div align="center"><em>图 9.5-6：稳压输出 OVP 应用</em></div>

![图 9.5-7：SF32LB520/3/5/7 电源结构](../../sf32-products/chips/assets/52xA/sf32lb52x-PWR-diagram.png){ loading="lazy" }

<div align="center"><em>图 9.5-7：SF32LB520/3/5/7 电源结构</em></div>

![图 9.5-8：VCC 原理图参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-VCC.png){ loading="lazy" }

<div align="center"><em>图 9.5-8：VCC 原理图参考</em></div>

![图 9.5-9：VCC PCB 参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-VCC.png){ loading="lazy" }

<div align="center"><em>图 9.5-9：VCC PCB 参考</em></div>

![图 9.5-10：充电原理图参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-CHG.png){ loading="lazy" }

<div align="center"><em>图 9.5-10：充电原理图参考</em></div>

![图 9.5-11：充电 PCB 参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-PCB-CHG.png){ loading="lazy" }

<div align="center"><em>图 9.5-11：充电 PCB 参考</em></div>

![图 9.5-12：PMU TVS 参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-TVS.png){ loading="lazy" }

<div align="center"><em>图 9.5-12：PMU TVS 参考</em></div>

![图 9.5-13：PMU EOS 参考](../../sf32-products/chips/assets/52xA/sf32LB52x-A-SCH-PMU-EOS.png){ loading="lazy" }

<div align="center"><em>图 9.5-13：PMU EOS 参考</em></div>

**52B/D/E/G/J（外部稳压供电）**

![图 9.5-14：52B/D/E/G/J PMU PCB 参考](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PCB-PMU.png){ loading="lazy" }

<div align="center"><em>图 9.5-14：52B/D/E/G/J PMU PCB 参考</em></div>

## 10. 修订历史 { #10-revision-history }

<div align="center"><em>表 10-1：修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:---|:---|:---|
| 1.1 | 2026-07 | 将电源系统提升为同级原理图章节，并将时钟生成和 RF 拆分为独立章节，同时对后续原理图指导章节重新编号。 |
| 1.0 | 本文档 | 合并两份官方硬件应用说明，并使用标签页区分电池供电与外部稳压供电型号内容 |
| 0.0.1 | 10/2024 | `SF32LB520-3-5-7-HW-Application` 原始发布 |
| 0.0.1 | 10/2024 | `SF32LB52B-E-G-J-HW-Application` 原始发布 |

</div>

### 10.1. 核对表修订历史 { #101-checklist-revision-history }

[原理图核对表](SF32LB52x_schematic_checklist.md)和 [PCB 布局核对表](SF32LB52x_pcb_layout_checklist.md)中的逐项核对内容独立于设计指南进行版本管理，版本编号沿用思澈科技（SiFli）官方 *SF32LB52 Schematic & PCB Checklist* 电子表格。

<div align="center"><em>表 10.1-1：核对表修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:---|:---|:---|
| 1.0 | 2026-01-21 | 初始发布，基于思澈科技（SiFli）*SF32LB52 Schematic & PCB Checklist* V1.0 |

</div>

[思澈科技（SiFli）合格供应商名录（AVL）]: https://downloads.sifli.com/hardware/files/documentation/SIFLI-MCU-AVL-%E8%AE%A4%E8%AF%81%E8%A1%A8-V0.3-20260121.xlsx
