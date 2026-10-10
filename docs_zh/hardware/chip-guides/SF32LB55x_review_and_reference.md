---
icon: lucide/clipboard-check
hide:
    - navigation
description: "SF32LB55x 硬件设计指南的设计评审检查表、相关文档与参考资料、附录，以及修订历史。"
tags:
    - 硬件
    - 芯片
---

# SF32LB55x 硬件设计指南 — 设计评审检查表与参考资料 { #sf32lb55x-hardware-design-guide-design-review-checklist-and-references }

## 7. 设计评审检查表 { #7-design-review-checklist }

- [ ] 已确认具体封装、引脚定义、焊盘图形和 PCB 制造工艺。
- [ ] PMU 各电源轨及辅助电源轨均符合数据手册规定的电压、电流限制。
- [ ] 必要的去耦电容均已靠近相应引脚放置。
- [ ] POR/BOR/复位时序及启动模式均已验证。
- [ ] 48 MHz 和 32.768 kHz 晶体的 CL、ppm、ESR 以及布局和布线均满足要求。
- [ ] RF 匹配网络、天线及接地层禁布区均已完成评审。
- [ ] 外部存储和显示接口的引脚组与所选封装相匹配。
- [ ] 唤醒、GPADC、传感器、音频、触摸、背光和马达相关电路均满足低功耗要求。
- [ ] 已预留调试、下载、量产烧录、RF 测试和晶体校准所需的接口。

## 8. 相关文档与参考资料 { #8-related-documents-and-references }

检查电气限制、封装数据、管脚复用、软件配置、器件适用性验证和制造约束时，应以最新官方资料为准。

[SF32LB55x 硬件应用说明]: https://wiki.sifli.com/en/hardware/SF32LB55x-HW-Application.html
[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]: https://wiki.sifli.com/hardware/index.html

<div class="grid cards" markdown>

- :fontawesome-solid-file-lines: __[SF32LB55x 硬件应用说明]__
- :fontawesome-solid-file-excel: __[思澈科技（SiFli）合格供应商名录（AVL）]__
- :fontawesome-brands-wikipedia-w: __[思澈科技（SiFli）芯片硬件设计指南索引（Wiki）]__

</div>

第 5.8 节的[原理图核对表](SF32LB55x_schematic_checklist.md)和第 6.4 节[PCB 布局指导](SF32LB55x_pcb_layout.md)中的检查项，逐项对应思澈科技（SiFli）官方 *SF32LB55x Schematic & PCB Checklist*（V1.0，2026-01-21），并分别与相应的设计指导配套使用。

## 9. 附录 { #9-appendices }

### 9.1. 附录 A. 典型 SF32LB55x 产品 { #appendix-a-a-typical-sf32lb55x-product }

典型的 SF32LB55x 产品包含 MCU、电源树、晶体、RF 匹配网络和天线、外部存储器、显示与触摸控制器、传感器、GPADC 输入、振动马达、可选蓝牙音频，以及调试和量产测试接口。电池供电设计还应检查低功耗状态下的漏电流，并提前规划测试夹具的接入方式。

### 9.2. 设计问答 { #91-design-qa }

1. **为什么 Mode = 1 启动时，部分 GPIO 的默认状态与规格书不同？** 下载模式会改变连接外部 Flash 的 QSPI2 和 QSPI3 相关 GPIO 状态。
2. **为什么贴片马达会在程序下载过程中异常振动？** 可能是马达电源或 PWM 控制信号意外打开。若高电平会启动马达，使用默认上拉（PU）的 GPIO 可能导致其上电振动；思澈科技（SiFli）建议使用默认下拉（PD）的 GPIO17 或 GPIO39 输出 PWM。
3. **为什么焊接电池时可能导致芯片死机，如何避免？** 烙铁接地不良可能引入浪涌。可在电池接口增加浪涌和静电保护，并确保烙铁可靠接地。
4. **唤醒按键接到唤醒口后，为什么不能从休眠（Hibernate）模式唤醒 MCU？** 休眠模式下只能使用 LCPU 侧 GPIO43–GPIO48 这 6 路唤醒；不能使用 HCPU 侧 GPIO0–GPIO3。
5. **低功耗调试时，为什么 G-Sensor 或心率传感器功耗偏高或功能异常？** 传感器程序运行在 LCPU 上，因此 I2C、SPI、控制和中断信号都必须使用 LCPU 接口。若信号接到 HCPU 接口，可能导致功耗偏高或功能异常。
6. **所有传感器信号都接到 LCPU 接口后，为什么功耗仍然偏高？** 关闭传感器电源后，如果 I2C、中断等接口的上拉电源仍开启，信号线上仍可能漏电。关闭传感器电源时，也应关闭这些接口的上拉电源。
7. **为什么 GPIO26 和 GPIO27 都用作输出控制时，睡眠功耗偏高？** 进入睡眠时，应使两路 GPIO 电平一致，或至少将其中一路设为无上下拉的高阻态。
8. **SS6600 进入休眠模式后功耗偏高，如何排查？** HCPU 的 GPIO0–GPIO3 和 LCPU 的 GPIO43–GPIO48 共 10 路唤醒输入都必须保持稳定的高电平或低电平，以免漏电。若 10 路唤醒口均使用上拉，上拉电源必须为常供电的 3.3 V。
9. **低功耗调试时功耗偏高，是否可能由电源器件造成？** 静态电流（Iq）较大的 BUCK、LDO 或负载开关都会增加功耗；思澈科技（SiFli）建议选用 Iq 低于 1 µA 的器件。
10. **静电测试后屏幕花屏，如何避免？** 触摸屏的 VDD、SCL、SDA、RESET、INT，以及 LCD 电源和 RESET 等信号都必须配置 ESD 器件。
11. **熄屏显示功能异常，如何避免？** 熄屏显示主要用于功耗低于 TFT 的 AMOLED 屏。LCD_EN、LCD_RST 等控制信号建议使用 PB GPIO。若使用 PA GPIO 控制高电平使能，必须选择默认上拉（PU）的 GPIO；用 PA 侧默认下拉（PD）的 GPIO 控制时，唤醒后可能出现持续超过 10 ms 的异常熄屏。
12. **睡眠期间外部蓝牙音频模块保持供电，唤醒后开关机异常，如何避免？** 应使用 LCPU GPIO 控制模块电源；若开关为低电平有效，应选用默认下拉（PD）的 GPIO。
13. **电池过放后无法正常充电，如何避免？** 电池电压过低时，充电电路应通过电源路径管理（power-path management），确保插入充电器后由充电器为系统供电。若充电电路没有电源路径管理功能，所选充电 IC 的涓流充电电流至少应为 40 mA。
14. **插入充电器后无法开始充电，如何避免？** 充电器插入检测信号必须接到 LCPU 侧支持唤醒的 GPIO43–GPIO48 之一；接到其他 GPIO 可能导致充电流程无法正常启动。
15. **MODE 拉高进入下载模式后电流偏大，如何避免？** 对音频 PA 等耗电外设，若高电平会使其开启，应使用默认下拉（PD）的 GPIO 控制，不能使用带上拉（PU）的 GPIO；否则进入下载模式时外设可能被意外开启，增大电流并影响下载。
16. **MODE 拉高后程序下载异常，如何排查？** 若 G-Sensor 等传感器的中断接到 GPIO46，MODE 拉高进入下载模式时，该脚默认为 UART3_RX，可能干扰下载。将传感器中断改接 GPIO43、GPIO44、GPIO47 或 GPIO48。若 LCPU 唤醒口不足，可通过 0 Ω 电阻将板外按键接到 GPIO45 或 GPIO46。
17. **G-Sensor 和心率算法占用资源较多、存储不足时怎么办？** 先评估分配给 LCPU 的存储空间是否充足；不足时，可在 QSPI4 上外挂 NOR Flash。

## 10. 修订历史 { #10-revision-history }

<div align="center"><em>表 10-1：修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
|:---|:---|:---|
| 0.1 | 2026-07 | 基于思澈科技（SiFli）官方 Wiki 硬件应用说明发布 SF32LB55x 硬件设计指南初版。 |

</div>

### 10.1. 核对表修订历史 { #101-checklist-revision-history }

[原理图核对表](SF32LB55x_schematic_checklist.md)以及 [PCB 布局指导](SF32LB55x_pcb_layout.md) 第 6.4 节中的逐项核对表与设计指南单独维护版本，版本编号沿用思澈科技（SiFli）官方 *SF32LB55x Schematic & PCB Checklist* 电子表格。

<div align="center"><em>表 10.1-1：核对表修订历史</em></div>

<div align="center" markdown>

| 序号 | 版本 | 日期 | 发布说明 |
|:---|:---|:---|:---|
| 1 | V1.0 | 2026-01-21 | 原理图与 PCB 检查表文档首次发布 |

</div>
