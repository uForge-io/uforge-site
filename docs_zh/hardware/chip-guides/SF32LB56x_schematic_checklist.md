---
icon: lucide/list-checks
description: "SF32LB56x MCU 的逐项原理图评审核对表，覆盖封装、电源、时钟、RF、存储、显示与制造检查项。"
tags:
    - 硬件
    - 芯片
    - 核对清单
hide:
    - navigation
---

# SF32LB56x 硬件设计指南 — 原理图核对表 { #sf32lb56x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB56x 硬件设计指南的一部分"
    本页覆盖第 5.8 节，逐项原理图核对表。返回[原理图设计指导](SF32LB56x_schematic_design.md)。

## 5.8. 原理图核对表 { #58-schematic-checklist }

以下各表分别对应原理图中的一个功能模块。若表中包含“适用型号”列，则其中的检查项仅适用于该列所列型号。

### 5.8.1. 封装 { #581-package }

<div align="center"><em>表 5.8.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 所选料号的封装正确，包括引脚名称与引脚编号 | 所有芯片 | 必检 |

</div>

### 5.8.2. 电源 { #582-power-supply }

<div align="center"><em>表 5.8.2-1：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | PVDD 供电电压为 1.8 V-3.3 V；SF32LB56xU/SF32LB56xV 推荐 1.8 V，SS6700A 推荐 3.3 V | 所有芯片 | 必检 |
| 2 | BUCK_LX 与 BUCK_FB 连接正确 | 所有芯片 | 必检 |
| 3 | LDO_VOUT1 输出预留测试点，或预留便于测压的滤波电容 | 所有芯片 | 必检 |
| 4 | LDO_VOUT2 输出预留测试点，或预留便于测压的滤波电容 | 所有芯片 | 必检 |
| 5 | VDD_RET 输出预留测试点，或预留便于测压的滤波电容 | 所有芯片 | 必检 |
| 6 | VDD_RTC 输出预留测试点，或预留便于测压的滤波电容 | 所有芯片 | 必检 |
| 7 | VDDIO1 供电电压为 1.8 V-3.3 V；SF32LB56xU 使用 1.8 V，SS6700A 使用 3.3 V。VDDIO1 可在 PBR0 控制下与外部 Flash 同步开关。若 VDDIO1 不由 PBR0 控制，需确保程序下载期间该电源始终上电。若由 GPIO 控制，推荐使用 PB22，且下载工具必须能使能该电源轨 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 8 | 当 VDDIO1 由 SF30147 供电时，推荐使用 LVSW1；下载工具必须能使能该电源轨 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 9 | VDDIO2 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻（SF32LB56xU 推荐 1.8 V，SS6700A 推荐 3.3 V） | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 10 | VDDIO3 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻（SF32LB56xU 推荐 1.8 V，SS6700A 推荐 3.3 V） | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 11 | VDDIO4 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻（SF32LB56xU 推荐 1.8 V，SS6700A 无该电源轨） | SF32LB560/561/563/56W | 必检 |
| 12 | VDDIOA 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | SF32LB565/567 | 必检 |
| 13 | VDDIOA2 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | SF32LB565/567 | 必检 |
| 14 | VDDIOB 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | SF32LB565/567 | 必检 |
| 15 | VDDIOSA 供电电压为 1.8 V，并提供负载开关进行电源控制 | SF32LB565/567 | 必检 |
| 16 | VDDIOSB 供电电压为 1.8 V，并提供负载开关进行电源控制 | SF32LB565/567 | 必检 |
| 17 | VDDIOSC 供电电压为 1.8 V，且必须始终上电 | SF32LB565/567 | 必检 |
| 18 | AVDD33_ANA 供电电压为 3.3 V | 所有芯片 | 必检 |
| 19 | AVDD33_AUD 供电电压为 3.3 V | 所有芯片 | 必检 |
| 20 | 建议充电电路使用带电源路径管理（power-path management）的充电 IC，以便在电池电压低于开机阈值时，系统仍可由充电器输入供电 | 所有芯片 | 必检 |
| 21 | 若使用不带电源路径管理的充电 IC，则涓流充电电流必须至少为 40 mA | 所有芯片 | 必检 |
| 22 | 在适用情况下，电源设计应兼容 SF32LB56xU 与 SS6700 的硬件需求 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 23 | 当 SF30147 提供电源时，使用 SF32LB56x 专用 TWI 接口进行寄存器控制 | 所有芯片 | 必检 |
| 24 | 若 SF30147 的 TWI 与 G-sensor 的 I2C 总线共用，则 G-sensor I2C 上拉电源必须始终上电，以保证 TWI 正常工作 | 所有芯片 | 必检 |
| 25 | 当 SF30147 提供电源时，可使用 EN 控制的负载开关和 LDO。EN 的供电域必须是 PVDD 或 AVDD；不要用 1.8 V 或 3.3 V 电平的 MCU GPIO 直接控制该开关。或者可将 EN 接地，并通过寄存器控制对应电源轨输出 | 所有芯片 | 必检 |
| 26 | 当 SF30147 提供电源时，BUCK 与 LDO1 只能分别通过 EN_BUCK 与 EN_LDO1 使能信号控制，不支持内部寄存器控制 | 所有芯片 | 必检 |
| 27 | 56x 的 PVDD 必须与 SF32LB56xU 上的 VDDIO3，或 SF32LB56xV 上的 VDDIOB 保持一致。若 PVDD 更低，例如 I/O 电源轨为 3.3 V 而 PVDD 为 1.8 V，则该 I/O 电源轨在待机（Standby）和休眠（Hibernate）下约有 15 μA 漏电流 | 所有芯片 | 必检 |

</div>

### 5.8.3. 电源电容与电感 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>表 5.8.3-1：电源电容与电感核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | PVDD 大电容至少为 10 μF | 所有芯片 | 必检 |
| 2 | BUCK_FB 电容 = 4.7 μF | 所有芯片 | 必检 |
| 3 | LDO_VOUT1 电容为 4.7 μF | 所有芯片 | 必检 |
| 4 | LDO_VOUT2 电容为 4.7 μF | 所有芯片 | 必检 |
| 5 | VDD_RET 电容 = 0.47 μF | 所有芯片 | 必检 |
| 6 | VDD_RTC 电容 = 1 μF | 所有芯片 | 必检 |
| 7 | VDDIO1 电容至少为 1 μF | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 8 | VDDIO2 电容至少为 1 μF | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 9 | VDDIO3 电容至少为 1 μF | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 10 | VDDIO4 电容至少为 1 μF | SF32LB560/561/563/56W | 必检 |
| 11 | VDDIOA 电容至少为 1 μF | SF32LB565/567 | 必检 |
| 12 | VDDIOA2 电容至少为 1 μF | SF32LB565/567 | 必检 |
| 13 | VDDIOB 电容至少为 1 μF | SF32LB565/567 | 必检 |
| 14 | VDDIOSA 电容至少为 0.1 μF | SF32LB565/567 | 必检 |
| 15 | VDDIOSB 电容至少为 0.1 μF | SF32LB565/567 | 必检 |
| 16 | VDDIOSC 电容至少为 0.1 μF | SF32LB565/567 | 必检 |
| 17 | MIC_BIAS 电容为 1 μF | 所有芯片 | 必检 |
| 18 | AVDD33_ANA 电容至少为 4.7 μF | 所有芯片 | 必检 |
| 19 | AVDD33_AUD 电容至少为 4.7 μF | 所有芯片 | 必检 |
| 20 | AVDD33_BRF 电容至少为 4.7 μF | SF32LB565/567 | 必检 |
| 21 | AUD_VREF 电容 = 1 μF | 所有芯片 | 必检 |
| 22 | GPADC VREFP 电容 = 4.7 μF | 所有芯片 | 必检 |
| 23 | BUCK 电感为[思澈科技（SiFli）合格供应商名录（AVL）]中的料号 | 所有芯片 | 必检 |
| 24 | 若 BUCK 电感不是思澈科技（SiFli）推荐料号，则需满足 L = 4.7 μH、DCR ≤ 0.4 Ω、Isat ≥ 450 mA | 所有芯片 | 必检 |
| 25 | 当 PVDD 供电为 1.8 V 时，推荐使用 VBAT 转 1.8 V 的 DCDC | 所有芯片 | 必检 |
| 26 | 若存在 GPS 或其他易受干扰外设，则需在 BUCK_LX 预留对地并联电容焊盘；取值依据实际测试结果确定 | 所有芯片 | 必检 |
| 27 | 已记录所选 DCDC 的静态电流，且满足项目要求 | 所有芯片 | 必检 |
| 28 | 已记录所选 LDO 的静态电流，且满足项目要求 | 所有芯片 | 必检 |

</div>

### 5.8.4. 时钟 { #584-clock }

<div align="center"><em>表 5.8.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 主 48 MHz 晶体为 AVL 清单内料号 | 所有芯片 | 必检 |
| 2 | 若 48 MHz 晶体不在 AVL 清单内，则需满足 7 pF ≤ CL ≤ 12 pF（推荐 8.8 pF）、频偏 ≤±10 ppm、ESR ≤30 Ω（推荐 22 Ω） | 所有芯片 | 必检 |
| 3 | RTC 32.768 kHz 晶体为 AVL 清单内料号 | 所有芯片 | 必检 |
| 4 | 若 32.768 kHz 晶体不在 AVL 清单内，则需满足 CL ≤12.5 pF（推荐 7 pF）、频偏 ≤±20 ppm、ESR ≤80 kΩ（推荐 38 kΩ） | 所有芯片 | 必检 |

</div>

### 5.8.5. 地信号 { #585-ground-signals }

<div align="center"><em>表 5.8.5-1：地信号核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 所有 VSS 信号均连接至 GND | 所有芯片 | 必检 |

</div>

### 5.8.6. 启动模式 { #586-boot-mode }

<div align="center"><em>表 5.8.6-1：启动模式核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | MODE 内部带下拉；预留一个 10 kΩ 上拉到 VDDIOA，并在程序下载时将 MODE 拉高 | 所有芯片 | 必检 |
| 2 | MODE 信号预留测试点，并必须引出到量产编程治具 | 所有芯片 | 必检 |

</div>

### 5.8.7. 射频 { #587-rf }

<div align="center"><em>表 5.8.7-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | ANT 信号已标注单端 50 Ω 特性阻抗要求 | 所有芯片 | 必检 |
| 2 | ANT 信号预留 Pi 型匹配网络：一个并联 NC（不贴装）电容和一个 15 pF 串联电容 | 所有芯片 | 必检 |

</div>

### 5.8.8. I/O 资源分配 { #588-io-resource-allocation }

<div align="center"><em>表 5.8.8-1：I/O 资源分配核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 已提供与原理图一致的 GPIO 资源分配表 | 所有芯片 | 必检 |
| 2 | 资源表中的 GPIO 分配与原理图一致 | 所有芯片 | 必检 |
| 3 | 对于 GPIO 输出控制，需考虑冷启动期间默认 PU/PD 状态，并在需要时提前使能相关外设 | 所有芯片 | 必检 |
| 4 | 实际 GPIO 分配遵循思澈科技（SiFli）的建议；参考 I/O 配置文件 | 所有芯片 | 必检 |

</div>

### 5.8.9. 硬件唤醒 { #589-hardware-wake-up }

<div align="center"><em>表 5.8.9-1：硬件唤醒核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 休眠（Hibernate）/待机（Standby）唤醒中断源使用正确：PA50、PA51、PB32、PB33、PB34、PBR0、PBR1、PBR2，共 8 个引脚 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 2 | 休眠（Hibernate）/待机（Standby）唤醒中断源使用正确：PA50-PA54、PB32-PB36 和 PBR0-PBR3，共 14 个引脚 | SF32LB565/567 | 必检 |
| 3 | 唤醒引脚可根据软件配置唤醒 HCPU 或 LCPU | 所有芯片 | 必检 |
| 4 | G-sensor、心率传感器等 LCPU 侧外设的中断与控制信号必须连接到 PB GPIO | 所有芯片 | 必检 |

</div>

### 5.8.10. 存储 { #5810-storage }

<div align="center"><em>表 5.8.10-1：存储核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | MPI3（SD2）连接 SPI NAND Flash 或 SD NAND Flash；对 SF32LB56xU 外部 Flash，需确保 Flash 供电电压与 VDDIO3 匹配 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 2 | MPI3（SD2）连接 SPI NAND Flash 或 SD NAND Flash，且 Flash 的 I/O 电平与 VDDIOA2 匹配 | SF32LB565/567 | 必检 |
| 3 | SPI NAND Flash 的 HOLD# 引脚通过 10 kΩ 电阻上拉到 SPI NAND Flash 供电 | 所有芯片 | 必检 |
| 4 | MPI3 连接到 NOR Flash（SS6700A 的外部存储必须为 NOR Flash） | 所有芯片 | 必检 |
| 5 | 若量产需要烧录 MPI3（SD2）FLASH，则在程序下载期间必须使能外部 Flash 电源 | 所有芯片 | 必检 |
| 6 | 由 PBR0 或其他 GPIO 控制的电源开关为高电平开、低电平关 | 所有芯片 | 必检 |
| 7 | 若 SD2 接口连接到 SD NAND，则信号连接正确 | 所有芯片 | 必检 |
| 8 | 推荐在 Flash CLK 与数据线上串联 33 Ω 电阻 | 所有芯片 | 可选 |
| 9 | SD NAND 的 I/O 电平与 VDDIO2 匹配 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 10 | Flash CLK 与数据线带 33 Ω 串联电阻 | 所有芯片 | 必检 |
| 11 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 所有芯片 | 必检 |
| 12 | LCPU 共封装 NOR Flash 始终上电，默认由 PBR0 控制外部 Flash 电源。<br>(1) 若 GPIO 资源有限，PBR0 也可控制 561/2/3/W 共封装 PSRAM 的电源（VDDIO1）。若 PSRAM 中存有需要在休眠期间保留的数据，则不要关闭 PSRAM 或外部 Flash 的电源。<br>(2) 若 GPIO 资源充足，可使用 PB22 控制 PSRAM 电源开关 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 13 | <span class="flag-yellow">VDDIOSA 与 VDDIOSB 由 PBR0 控制，VDDIOSC 始终上电，外部 Flash 供电由 PA03 控制</span> | SF32LB565/567 | 必检 |
| 14 | NOR Flash 已在关键器件选型指南中通过验证 | 所有芯片 | 必检 |
| 15 | SPI/SD NAND Flash 已在关键器件选型指南中通过验证 | 所有芯片 | 必检 |

</div>

### 5.8.11. 显示 { #5811-display }

<div align="center"><em>表 5.8.11-1：显示核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SF32LB56xU 或 SS6700A 连接到 QSPI 面板 | 所有芯片 | 必检 |
| 2 | SF32LB56xU 或 SS6700A 连接到串行 JDI 面板 | 所有芯片 | 必检 |
| 3 | LCDC1 QSPI 信号连接正确；推荐在 CLK 和数据线上串联 100 Ω 电阻 | 所有芯片 | 必检 |
| 4 | LCDC1 串行 JDI 信号连接正确 | 所有芯片 | 必检 |
| 5 | LCDC RSTB 连接正确 | 所有芯片 | 必检 |
| 6 | LCDC TE 连接正确（连接到面板的 TE 或 Fmark 信号） | 所有芯片 | 必检 |
| 7 | TP 信号遵循推荐引脚分配（参考 EVB I/O 配置文件） | 所有芯片 | 必检 |
| 8 | LCD 接口支持 3/4 线 SPI、双数据线/四数据线 SPI、串行 JDI 等模式 | 所有芯片 | 可选 |
| 9 | SPI LCD：3 线模式下，CS 接 PA36，CLK 接 PA37，DATA 接 PA38；4 线模式下，CS 接 PA36，CLK 接 PA37，DATA 接 PA38，DC 接 PA39 | 所有芯片 | 可选 |
| 10 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 所有芯片 | 必检 |
| 11 | 若需要 LCD AOD，则需注意 LCD_RST（PA05）由 VDDIO3 供电，必须始终上电，且 VDDIO3 不可与外部 Flash 电源绑定，否则休眠时关闭 Flash 电源可能同时关闭 VDDIO3 和 LCD_RST，导致 AOD 异常 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 12 | 对于 DSI LCD，应连接 DSI 数据与时钟信号。DSI 视频模式面板的工作方式类似 RGB 面板，不带 TE 信号；DSI 命令模式面板带 TE 信号，且 DSI17801 需要 TE。TE 和 RST 均建议使用，具体使用方式取决于所选 LCD | SF32LB565/567 | 必检 |

</div>

### 5.8.12. GPADC { #5812-gpadc }

<div align="center"><em>表 5.8.12-1：GPADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | GPADC 输入连接到对应引脚 | 所有芯片 | 可选 |
| 2 | GPADC 输入范围正确；最大输入电压不得超过 AVDD33_AVA（3.3 V） | 所有芯片 | 可选 |
| 3 | 电池电压分压建议：电源侧使用 470 kΩ 1% 电阻，对地使用 1 MΩ 1% 电阻，并增加 100 nF 滤波电容 | 所有芯片 | 必检 |
| 4 | 对每一路由 GPADC 测量的分压信号，分压电阻均使用 1% 精度；每个 GPADC 通道都必须在靠近芯片引脚处放置 100 nF 滤波电容 | 所有芯片 | 必检 |
| 5 | ADC 可用于按键检测以节省引脚；例如当 PB32 被用作 ADC 按键时，不要使用电池作为其上拉电源 | 所有芯片 | 必检 |

</div>

### 5.8.13. 按键 { #5813-buttons }

<div align="center"><em>表 5.8.13-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 与客户确认按键是否需要唤醒能力 | 所有芯片 | 必检 |
| 2 | 普通按键连接正确（已上拉、阻值正确、上拉电压域正确） | 所有芯片 | 必检 |
| 3 | 电源键必须使用 PB32，高电平有效，长按 10 秒复位，10 kΩ 下拉电阻必须放在主板上 | 所有芯片 | 必检 |
| 4 | 所有按键信号都具备 ESD 保护 | 所有芯片 | 必检 |

</div>

### 5.8.14. EOS 与 ESD 保护 { #5814-eos-and-esd-protection }

<div align="center"><em>表 5.8.14-1：EOS 与 ESD 保护核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 充电接口具备 EOS、ESD 与 OVP 设计 | 所有芯片 | 必检 |
| 2 | 充电器插入检测信号具备 ESD 器件 | 所有芯片 | 必检 |
| 3 | 电池接口具备 ESD 器件 | 所有芯片 | 必检 |
| 4 | 天线接口具备 ESD 器件 | 所有芯片 | 必检 |
| 5 | LCD 与 TP 电源接口具备 ESD 器件 | 所有芯片 | 必检 |
| 6 | TP I2C、RST 与 INT 线路具备 ESD 器件 | 所有芯片 | 必检 |
| 7 | 心率传感器电源接口与信号线具备 ESD 器件 | 所有芯片 | 必检 |

</div>

### 5.8.15. I2C { #5815-i2c }

<div align="center"><em>表 5.8.15-1：I2C 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | I2C 分配已考虑 HCPU/LCPU 分区，以及器件是否必须在低功耗模式下运行 | 所有芯片 | 必检 |
| 2 | I2C 已上拉且阻值正确；若需要 400 kHz 工作，推荐使用 2.2 kΩ 上拉。应使用外设侧电压域，并在外设掉电时同步关闭上拉电源 | 所有芯片 | 必检 |
| 3 | I2C 中断信号在需要时支持硬件唤醒 | 所有芯片 | 必检 |
| 4 | 若多个器件共用一条 I2C 总线，其地址已区分 | 所有芯片 | 必检 |
| 5 | 思澈科技（SiFli）的 SF30147C PMIC 原文写道：“I2C SCL with TWI DAT use PB23; I2C SCL pull-up power supplyalways powered; TWI DATnormal SF30147C。”原文没有说明这些信号之间的关系，也没有解释“normal”的含义。设计定版前，请对照官方原理图和文档确认 PB23 的分配、上拉电源及 TWI DAT 与 SF30147C 的工作情况。 | SF32LB560/561/563/56W 和 SS6700A | 必检 |

</div>

### 5.8.16. 模拟音频 { #5816-analog-audio }

<div align="center"><em>表 5.8.16-1：模拟音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | MEMS 麦克风连接正确 | 所有芯片 | 必检 |
| 2 | MEMS 麦克风由 MIC_BIAS 供电 | 所有芯片 | 必检 |
| 3 | 模拟 ECM 单端麦克风连接正确 | 所有芯片 | 必检 |
| 4 | 模拟 ECM 单端麦克风由 MIC_BIAS 供电 | 所有芯片 | 必检 |
| 5 | 模拟 ECM 差分麦克风连接正确 | 所有芯片 | 必检 |
| 6 | 模拟 ECM 差分麦克风由 MIC_BIAS 供电 | 所有芯片 | 必检 |
| 7 | 所有音频 ADC 输入都带有至少 2.2 μF 的隔直电容 | 所有芯片 | 必检 |
| 8 | 音频 DAC 输出 DACP 与 DACN 在芯片附近各有一个 1 kΩ 串联电阻，并在 DACP 与 DACN 之间并联一个 1.5 nF 电容 | 所有芯片 | 必检 |
| 9 | 推荐使用 AW8155 作为音频功放；使用推荐器件时，在软件中配置为 Mode 4 / Class AB 模式 | 所有芯片 | 必检 |
| 10 | 将音频 PA 输出反馈到 MCU ADC 时，需增加分压与 RC 滤波，或增加数字滤波；分压后的电压必须保持在 ADC 输入范围内，RC 滤波截止频率应为 20 kHz | 所有芯片 | 必检 |
| 11 | 若不使用芯片集成的模拟音频 ADC 通路，建议 ADCP 与 ADCN 各通过一个 0 Ω 串联电阻接地 | 所有芯片 | 必检 |

</div>

### 5.8.17. SPI { #5817-spi }

<div align="center"><em>表 5.8.17-1：SPI 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SPI 连接正确；MCU 与外设之间的 SDO 和 SDI 已正确交叉连接 | 所有芯片 | 可选 |
| 2 | SPI 外设时序要求已确认且受支持 | 所有芯片 | 可选 |
| 3 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 所有芯片 | 可选 |

</div>

### 5.8.18. USART { #5818-usart }

<div align="center"><em>表 5.8.18-1：USART 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | USART4 作为程序下载/调试接口；预留测试点，并增加推荐的 100 Ω 串联电阻，实际阻值可按设计调整 | 所有芯片 | 必检 |
| 2 | <span class="flag-yellow">SF32LB56xU 的 PA17/PA18 复用为 USART1，用于 RF 认证测试；需预留测试点</span> | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 3 | <span class="flag-yellow">SF32LB56xV 的 PA30/PA34 复用为 USART1，用于 RF 认证测试；需预留测试点</span> | SF32LB565/567 | 必检 |
| 4 | 连接外设时，MCU 侧 RXD 连接外设 TXD，MCU 侧 TXD 连接外设 RXD | 所有芯片 | 必检 |
| 5 | 当 PA17/PA18 复用为连接外设的 UART 时，需确保 MCU 复位时外设已掉电，或软件将两个引脚都拉低 | 所有芯片 | 必检 |
| 6 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 所有芯片 | 必检 |
| 7 | 未使用的 USART 测试点已预留，作为备用 | 所有芯片 | 可选 |
| 8 | 建议连接外设的 UART 使用 HCPU 接口，以避免 HCPU 软件占用 LCPU UART 接口 | 所有变体 | 必检 |

</div>

### 5.8.19. PWM { #5819-pwm }

<div align="center"><em>表 5.8.19-1：PWM 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 背光 PWM 引脚分配正确；LCD 背光控制必须使用带 PWM 功能的 PB GPIO | 所有芯片 | 可选 |
| 2 | 马达 PWM 引脚分配正确；马达振动控制必须使用带 PWM 功能的 PB GPIO | 所有芯片 | 可选 |
| 3 | 对于马达 PWM 控制，应选择默认关闭的 GPIO，以避免使用 SMT 马达时在固件编程阶段出现异常 | 所有芯片 | 可选 |
| 4 | 除背光和马达外，其他 PWM 输出也必须使用 PB 接口，并检查冷启动行为 | 所有芯片 | 可选 |

</div>

### 5.8.20. 调试 { #5820-debug }

<div align="center"><em>表 5.8.20-1：调试核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 推荐使用 UART4_TXD/UART4_RXD 作为调试接口；预留测试点，并增加推荐的 100 Ω 串联电阻 | 所有芯片 | 必检 |
| 2 | SWD 信号连接正确 | 所有芯片 | 必检 |
| 3 | J-Link 接口或测试点已正确预留 I/O 供电参考 | 所有芯片 | 必检 |
| 4 | 量产下载期间，需确保 PVDD、SF32LB56xU 上的 VDDIO2 或 SF32LB56xV 上的 VDDIOA、SF32LB56xU 上的 VDDIO3 或 SF32LB56xV 上的 VDDIOA2，以及 SF32LB56xU 上的 VDDIO4 或 SF32LB56xV 上的 VDDIOB 均已上电。561/563/56W 的 VDDIO1 或 565/567 的 VDDIOSB 也必须上电 | 所有芯片 | 必检 |

</div>

### 5.8.21. USB { #5821-usb }

<div align="center"><em>表 5.8.21-1：USB 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | USB 接口连接正确 | 所有芯片 | 可选 |
| 2 | USB 接口具备 ESD 保护 | 所有芯片 | 可选 |
| 3 | 正常非休眠工作时，只要 USB 保持使能，PC/设备端即可感知插拔；<br>若 MCU 进入睡眠且仍需感知插拔，则需增加 VBUS 分压电路，使分压输出与 IO 电压匹配的高电平并送入 MCU 唤醒引脚，推荐与充电器插入检测唤醒引脚共用 | 所有芯片 | 可选 |

</div>

### 5.8.22. PBR { #5822-pbr }

<div align="center"><em>表 5.8.22-1：PBR 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | PBR0 在上电过程中会从 0 变为 1，可用于部分外部负载开关控制；PBR1-PBR2 默认输出低电平 | 所有芯片 | 必检 |
| 2 | PBR0-PBRx 可在待机和休眠模式下作为输出使用 | 所有芯片 | 可选 |
| 3 | PBR0-PBRx 可输出 LPTIM 信号 | 所有芯片 | 可选 |
| 4 | 对 567，推荐使用 LPTIM3：LPTIM3_OUT 与 LPTIM3_OUT_BAR 可从 PBR 引脚输出 21-25 kHz、占空比不同且极性相反的信号 | 所有芯片 | 可选 |
| 5 | 这些 21-25 kHz、极性相反且占空比不同的信号，也可由 HCPU 的 ATIM 输出；需结合 Pin_Config 选择合适的 ATIMx_CHx 与 ATIMx_CHxN 信号，并考虑 HCPU 降频的影响 | 所有芯片 | 可选 |
| 6 | PBR1-PBRx 可输出 32 kHz 时钟信号 | 所有芯片 | 可选 |
| 7 | PBR0-PBRx 可配置为唤醒信号输入 | 所有芯片 | 可选 |
| 8 | 当 PBR 用作唤醒引脚时，MCU 唤醒后软件必须轮询该引脚。它适合按键、充电检测等慢变化电平，但不适合心率中断等快速脉冲；后者必须使用普通可唤醒 GPIO，不要使用 PBR | 所有芯片 | 可选 |

</div>

### 5.8.23. 功耗 { #5823-power-consumption }

<div align="center"><em>表 5.8.23-1：功耗核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 对所有用于电源开关控制的 MOSFET、LDO 和 DCDC 使能引脚，当使能为高电平有效时，预留一个 1 MΩ 对地下拉；实际项目可按需要调整阻值 | 所有芯片 | 必检 |
| 2 | SF32LB56x 的 PVDD 供电为 1.8 V，使用低静态电流 DCDC 输出 1.8 V，并保持始终上电 | 所有芯片 | 必检 |
| 3 | 对 SF32LB56xU 与 SS6700，VDDIO1 需要负载开关控制。使用 PBR0 作为控制信号；若 GPIO 资源足够，也可用 PB22 控制该电源。下载工具必须能使能 VDDIO1 电源 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 4 | 对 SF32LB56xU 与 SS6700，外部 Flash 电源需要由 PBR0 控制的负载开关 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 5 | <span class="flag-yellow">在休眠关断（Hibernate-off）或待机关断（Standby-off）模式下，SF32LB56xV 的 VDDIOSA 与 VDDIOSB 需要由 PBR0 控制负载开关，而 VDDIOSC 必须始终上电</span> | SF32LB565/567 | 必检 |
| 6 | <span class="flag-yellow">SF32LB56xV 的 MPI3 Flash 供电需要由 PA03 控制的负载开关；下载期间必须使能 MPI3 Flash 电源</span> | SF32LB565/567 | 必检 |
| 7 | 已记录深度睡眠（Deep Sleep）的基础电流要求。深度睡眠电流高于待机，适用于唤醒间隔小于 200 ms 的场景；所有 PB 引脚均支持唤醒，基础电流为 90 μA | 所有芯片 | 必检 |
| 8 | 已记录深度睡眠模式下所有已选外设的基础电流总和，且该值满足项目要求 | 所有芯片 | 必检 |
| 9 | 已记录待机基础电流要求。待机适用于唤醒间隔大于 200 ms 的场景；仅 PA50、PA51、PB33 和 PB34 支持唤醒，基础电流为 4-5 μA | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 10 | 已记录待机基础电流要求。待机适用于唤醒间隔大于 200 ms 的场景；仅 PA50、PA51、PA52、PA53、PA54、PB33、PB34、PB35 和 PB36 支持唤醒，基础电流为 4-5 μA | SF32LB565/567 | 必检 |
| 11 | 已记录待机模式下所选外设的电流，并确认其满足项目要求 | 所有芯片 | 必检 |

</div>

### 5.8.24. 下载 { #5824-download }

<div align="center"><em>表 5.8.24-1：下载核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SF32LB56xU：下载测试点预留 VBAT、GND、VDDIO2、VDDIO3 或 VDDIO4、MODE、SWDIO、SWCLK、UART4_RXD、UART4_TXD，以及 PB20/PB21/PB25 中的一个 | SF32LB560/561/563/56W 和 SS6700A | 必检 |
| 2 | SF32LB56xV：下载测试点预留 VBAT、GND、VDDIOA、VDDIOB、MODE、SWDIO、SWCLK、UART4_RXD、UART4_TXD，以及 PB20/PB21/PB25 中的一个 | SF32LB565/567 | 必检 |

</div>

[思澈科技（SiFli）合格供应商名录（AVL）]: ../cad-components/sifli-approved-vendor-list.md
