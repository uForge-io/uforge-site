---
icon: lucide/list-checks
description: "SF32LB52x 原理图逐项核对表，涵盖封装、供电、时钟、射频、存储、显示及生产测试。"
hide:
    - navigation
tags:
    - 硬件
    - 芯片
    - 核对清单
---

# SF32LB52x 硬件设计指南 — 原理图核对表 { #sf32lb52x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页为第 5.8 节原理图核对表。原理图设计说明分为三页，第一部分[最小系统、电源与时钟](SF32LB52x_schematic_design.md)介绍基础电路及其设计要求。

## 5.8. 原理图核对表 { #58-schematic-checklist }

以下各表分别对应原理图中的一个功能模块。当通用的“全部型号”范围不成立时，“适用型号”列会将检查项限定到特定的 SF32LB52x 供电型号或芯片修订版。

“必检”表示适用的检查项必须核对，并不要求安装表中列出的所有外设。带条件的检查项仅在设计中存在对应电路或功能时适用。保留来源的“必检／可选”分类，同时区分建议做法与强制限值。

### 5.8.1. 封装 { #581-package }

<div align="center"><em>表 5.8.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 所选料号的封装正确，包括管脚名称与管脚编号 | 全部型号 | 必检 |

</div>

### 5.8.2. 电源 { #582-power-supply }

<div align="center"><em>表 5.8.2-1：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | VBUS 供电电压为 <span class="flag-red">4.6 V–5.5 V</span> | 仅 520/3/5/7 | 必检 |
| 2 | 若产品需要在接入充电器后立即点亮屏幕，不推荐使用片内充电器；建议采用支持电源路径管理（power-path management）的外部充电 IC | 仅 520/3/5/7 | 必检 |
| 3 | 仅当允许系统先充电至 3.6 V、再由软件点亮屏幕时，才可使用片内充电器 | 仅 520/3/5/7 | 必检 |
| 4 | 推荐使用带集成 LDO 输出的 OVP 器件（如 LP5305AQVF）：LDO 输出 4.7–5.4 V，带载能力 ≥0.5 A，过流保护阈值 ≥0.7 A | 仅 520/3/5/7 | 必检 |
| 5 | 若使用 OVLO 可调的 OVP 器件，分压电阻的精度为 1%，V_OVLO_TH 误差小于 3%；V_OVP 的最小值和最大值均应落在 5.15–5.55 V 范围内。源表将 5.15 V 标注为充电器最大输入电压，将 5.55 V 标注为 52x 充电器输入上限；相关差异见表后说明 | 仅 520/3/5/7 | 必检 |
| 6 | 若不使用片内充电器，则 VBUS 可悬空，其电容也可省略；但此时 VBAT 将无法作为电源输出端使用，因此需在 VBAT 上增加 1 μF 外部电容 | 仅 520/3/5/7 | 必检 |
| 7 | 电池电压检测：芯片内部已将 GPADC 通道连接到 VBAT（或 VBATS），不要再将 VBAT 额外接到某个 GPADC 管脚 | 全部型号 | 必检 |
| 8 | <span class="flag-red">VCC 与 VBAT 管脚供电电压为 3.2 V–4.7 V</span> | 仅 520/3/5/7 | 必检 |
| 9 | BUCK_LX 与 BUCK_FB 连接正确 | 全部型号 | 必检 |
| 10 | VDD_VOUT1 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 11 | VDD_VOUT2 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 12 | VDD_RET 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 13 | VDD_RTC 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 14 | AVDD_BRF 通过 VSYS 供电 | 仅 520/3/5/7 | 必检 |
| 15 | AVDD33_AUD 通过 LDO2 供电 | 仅 520/3/5/7 | 必检 |
| 16 | VSYS 仅供 MCU 内部使用，不要用它给其他外设供电 | 仅 520/3/5/7 | 必检 |
| 17 | 推荐使用 LDO2_OUT 给存储器、传感器等外设供电；必要时可串入负载开关进行控制 | 仅 520/3/5/7 | 必检 |
| 18 | <span class="flag-red">由 LDO2 供电的所有外设峰值电流总和不得超过 150 mA</span> | 仅 520/3/5/7 | 必检 |
| 19 | 推荐使用 LDO3_OUT 给振动马达供电 | 仅 520/3/5/7 | 必检 |
| 20 | <span class="flag-red">由 LDO3 供电的所有外设峰值电流总和不得超过 150 mA</span> | 仅 520/3/5/7 | 必检 |
| 21 | LCD 需要独立的低静态电流 LDO 供电 | 全部型号 | 必检 |
| 22 | 推荐心率传感器 LED 由 VBAT 供电 | 全部型号 | 必检 |
| 23 | 充电输入需要 OVP 电路 | 全部型号 | 必检 |
| 24 | 当电池电压过低、需要由充电输入端的 5 V 为系统供电时，建议采用支持电源路径管理的充电 IC；<span class="flag-red">输入到 VCC 的电压不得超过 4.7 V</span> | 仅 520/3/5/7 | 必检 |
| 25 | <span class="flag-red">SF32LB52DUB6：PVDD = 1.8 V</span> | 仅 52D | 必检 |
| 26 | <span class="flag-red">SF32LB52B/E/G/JUX6：PVDD = 3.3 V</span> | 52B/E/G/J | 必检 |
| 27 | <span class="flag-red">SF32LB52BU36 与 SF32LB52BU56：VDD_SIP 需要外部 3.3 V 供电</span> | 仅 52B | 必检 |
| 28 | <span class="flag-red">SF32LB52DUB6：VDD_SIP 需要外部 1.8 V 供电</span> | 仅 52D | 必检 |
| 29 | <span class="flag-red">SF32LB52E/G/JUX6：VDD_SIP 不需要外部供电，仅加外部电容即可</span> | 52E/G/J | 必检 |
| 30 | VBATS 是电池电压检测信号；检测范围为 0–4.5 V | 52B/D/E/G/J | 必检 |

</div>

!!! important "OVP 阈值不等于 VBUS 工作电压限值"
    源检查表第 5 项的 5.15–5.55 V 是可调 OVLO 器件的选型范围；第 1 项列出 VBUS 4.6–5.5 V。不得将 5.55 V 解释为 VBUS 的连续工作电压。[电源系统说明](SF32LB52x_schematic_design.md#52-power-system)列出了源资料差异和应用说明中的另一组 OVP 选型值。验收设计前，应向思澈科技（SiFli）确认所选器件的阈值和供电限制。

!!! note "VBUS 数值的来源与适用范围"
    《Electrical Specification-A3》给出的芯片 VBUS 供电范围为 4.5–5.5 V。电池型号应用说明的供电表给出 4.6–5.5 V，并要求最大充电电流下芯片 VBUS 管脚电压不低于 4.6 V。这些数值的适用场景不同；核对芯片管脚的最低电压时，还应计入电源容差和供电路径压降。

### 5.8.3. 电源电容与电感 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>表 5.8.3-1：电源电容与电感核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | VBUS 电容 ≥10 μF | 仅 520/3/5/7 | 必检 |
| 2 | VBAT 电容 ≥4.7 μF | 仅 520/3/5/7 | 必检 |
| 3 | 在 SF32LB523/5/7 上，24 脚为 VCC——外部电容 ≥10 μF | 523/5/7 | 必检 |
| 4 | 在 523/5/7/B/D/E/G/J 型号上，<span class="flag-red">23 脚为 VDD_SIP——外部电容 ≥2.2 μF</span> | 523/5/7/B/D/E/G/J | 必检 |
| 5 | 在 SF32LB520 上，24 脚为 GPIO，即 PA21 | 520/SS6500 | 必检 |
| 6 | 在 SF32LB520 上，23 脚为 VCC——外部电容 ≥10 μF | 520/SS6500 | 必检 |
| 7 | BUCK_FB 电容 = 4.7 μF | 全部型号 | 必检 |
| 8 | VDD_VOUT1 电容 = 4.7 μF | 全部型号 | 必检 |
| 9 | VDD_VOUT2 电容 = 4.7 μF | 全部型号 | 必检 |
| 10 | VDD_RET 电容 = 0.47 μF | 全部型号 | 必检 |
| 11 | VDD_RTC 电容 = 1 μF | 全部型号 | 必检 |
| 12 | <span class="flag-red">VDD33_VOUT1 总电容 ≤9.6 μF</span> | <span class="flag-red">仅 520/3/5/7</span> | 必检 |
| 13 | <span class="flag-red">VDD33_VOUT2 总电容 ≤9.6 μF</span> | <span class="flag-red">仅 520/3/5/7</span> | 必检 |
| 14 | <span class="flag-red">VSYS 总电容 ≤9.6 μF</span> | <span class="flag-red">仅 520/3/5/7</span> | 必检 |
| 15 | MIC_BIAS 电容 = 1 μF | 全部型号 | 必检 |
| 16 | <span class="flag-red">AVDD_BRF 电容 = 4.7 μF</span> | <span class="flag-red">全部型号</span> | 必检 |
| 17 | <span class="flag-red">AVDD33_AUD 电容 = 2.2 μF</span> | <span class="flag-red">全部型号</span> | 必检 |
| 18 | AUD_VREF 电容 = 1 μF | 全部型号 | 必检 |
| 19 | <span class="flag-red flag-yellow">VSYS 电容 = 4.7 μF</span> | <span class="flag-red flag-yellow">仅 520/3/5/7</span> | 必检 |
| 20 | GPADC VREFP 电容 = 4.7 μF | 全部型号 | 必检 |
| 21 | BUCK 电感为[思澈科技（SiFli）合格供应商名录][思澈科技（SiFli）合格供应商名录]（AVL）中的料号 | 全部型号 | 必检 |
| 22 | 若 BUCK 电感不在 AVL 中，则需满足 L = 4.7 μH、DCR ≤0.4 Ω、Isat ≥450 mA | 全部型号 | 必检 |
| 23 | <span class="flag-red">若存在 GPS 或其他易受干扰外设，则需在 BUCK_LX 预留对地并联电容焊盘；取值依据实际测试结果确定</span> | <span class="flag-red">全部型号</span> | 必检 |
| 24 | <span class="flag-red">已记录所选 DCDC 的静态电流，且满足项目要求</span> | <span class="flag-red">全部型号</span> | 必检 |
| 25 | <span class="flag-red">已记录所选 LDO 的静态电流，且满足项目要求</span> | <span class="flag-red">全部型号</span> | 必检 |

</div>

!!! note "源检查表中 24 脚的适用范围"
    电容第 3 项正文列出了 SF32LB520/3/5/7，但其“适用型号”列仅写 523/5/7；第 5、6 项则明确 SF32LB520 的 24 脚为 PA21、23 脚为 VCC。本表按“适用型号”列限定第 3 项的范围，设计验收前仍需核对具体料号的管脚定义。

### 5.8.4. 时钟 { #584-clock }

<div align="center"><em>表 5.8.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 主 48 MHz 晶体为 AVL 清单内料号 | 全部型号 | 必检 |
| 2 | 若 48 MHz 晶体不在 AVL 清单内，则需满足 7 pF ≤ CL ≤ 12 pF（推荐 8.8 pF）、频率容差 ≤ ±10 ppm、ESR ≤30 Ω（推荐 22 Ω） | 全部型号 | 必检 |
| 3 | RTC 32.768 kHz 晶体为 AVL 清单内料号 | 全部型号 | 必检 |
| 4 | 若 32.768 kHz 晶体不在 AVL 清单内，则需满足 CL ≤12.5 pF（推荐 7 pF）、频率容差 ≤±20 ppm、ESR ≤80 kΩ（推荐 38 kΩ） | 全部型号 | 必检 |
| 5 | 在 52x 上，PA24/25/26/27 均可输出 xtal32k 时钟 | 全部型号 | 必检 |

</div>

### 5.8.5. 启动配置 { #585-bootstrap-configuration }

<div align="center"><em>表 5.8.5-1：启动配置核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 若外接 <span class="flag-purple">SPI NOR Flash，则 PA13 与 PA17 均不需要上拉</span> | 全部型号 | 必检 |
| 2 | 若外接 <span class="flag-red">SPI NAND Flash</span>，PA13 不需要上拉；<span class="flag-red">PA17 需通过 7.5 kΩ 电阻上拉</span>至 Flash 的 VDD | 全部型号 | 必检 |
| 3 | 若外接 <span class="flag-blue">SD NAND Flash</span>，PA17 不需要上拉；<span class="flag-blue">PA13 需通过 7.5 kΩ 电阻上拉</span>至 Flash 的 VDD | 全部型号 | 必检 |
| 4 | 若外接 <span class="flag-green">eMMC，PA13 与 PA17 均需通过 7.5 kΩ 电阻上拉</span>至 eMMC 的 VCCQ | <span class="flag-red">52D/E/G/J</span> | 必检 |

</div>

### 5.8.6. 射频 { #586-rf }

<div align="center"><em>表 5.8.6-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | ANT 信号已标注单端 50 Ω 特性阻抗要求 | 全部型号 | 必检 |
| 2 | ANT 信号预留 Pi 型匹配网络：一个并联 NC（不贴装）电容和一个 15 pF 串联电容 | 全部型号 | 必检 |
| 3 | 若需考虑杂散发射滤波，则预留 Pi 型匹配网络，包含 2.7 nH 串联电感和 2 pF 并联电容 | 全部型号 | 可选 |
| 4 | <span class="flag-red">若需要外部 PA/LNA 控制，则 PA00 连接 RX_EN，PA01 连接 TX_EN</span> | 全部型号 | 可选 |

</div>

### 5.8.7. I/O 资源分配 { #587-io-resource-allocation }

<div align="center"><em>表 5.8.7-1：I/O 资源分配核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 已提供与原理图一致的 GPIO 资源分配表 | 全部型号 | 必检 |
| 2 | 资源表中的 GPIO 分配与原理图一致 | 全部型号 | 必检 |
| 3 | 实际 GPIO 分配遵循思澈科技（SiFli）建议（参考 HDK I/O 配置文件） | 全部型号 | 必检 |

</div>

### 5.8.8. 硬件唤醒 { #588-hardware-wake-up }

<div align="center"><em>表 5.8.8-1：硬件唤醒核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">唤醒中断源使用正确（可用唤醒中断源为 PA24–PA27 与 PA34–PA44，共 15 个管脚）</span> | <span class="flag-red">全部型号</span> | 必检 |

</div>

### 5.8.9. 存储 { #589-storage }

<div align="center"><em>表 5.8.9-1：存储核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 若 MPI2（SD1）连接 SPI NOR Flash：<span class="flag-red">PA13（MPI D1）和 PA17（MPI D3）均不需要上拉</span> | 全部型号 | 必检 |
| 2 | 若 MPI2（SD1）连接 SPI NAND Flash：<span class="flag-red">PA13（MPI D1）不需要上拉；PA17（MPI D3）必须加 7.5 kΩ 上拉</span> | 全部型号 | 必检 |
| 3 | 若 MPI2（SD1）连接 SD NAND Flash：<span class="flag-red">PA13（SD D3）必须加 7.5 kΩ 上拉，PA17（SD D1）不需要上拉，PA15（SD CMD）必须加 7.5 kΩ 上拉</span> | 全部型号 | 必检 |
| 4 | 若 MPI2（SD1）连接 eMMC：<span class="flag-red">PA13（SD D3）与 PA17（SD D1）均必须加 7.5 kΩ 上拉，PA15（SD CMD）必须加 7.5 kΩ 上拉</span> | <span class="flag-red">52D/E/G/J</span> | 必检 |
| 5 | SF32LB520 与 SF32LB52B 的外部存储必须为 SPI NOR Flash | 520/B | 必检 |
| 6 | 当关机功耗敏感时，<span class="flag-red">外部 Flash 电源必须由 PA11 控制</span>，高电平开 / 低电平关 | 仅 520/3/5/7 | 必检 |
| 7 | 当关机功耗敏感时，<span class="flag-red">外部 Flash 电源必须由 PA21 控制</span>，高电平开 / 低电平关 | <span class="flag-red">52B/D/E/G/J</span> | 必检 |
| 8 | 当关机功耗敏感时，<span class="flag-red">VDD_SIP 供电必须由 PA21 控制</span>，高电平开 / 低电平关 | <span class="flag-red">52B/D/E/G/J</span> | 必检 |
| 9 | <span class="flag-red">当 MPI 驱动 32 MB 或更大的 NOR Flash 时，Flash 电源必须可通过 PA21 断电</span> | <span class="flag-red">52B/D/E/G/J</span> | 必检 |
| 10 | 若 SD1 连接 SD NAND 器件，则信号连接正确 | 全部型号 | 必检 |
| 11 | <span class="flag-red">Flash CLK 与数据线带 33 Ω 串联电阻</span> | <span class="flag-red">全部型号</span> | 必检 |
| 12 | <span class="flag-red">使用两颗外部 NOR Flash 时，CLK/D0–D3 共用；Flash 1 的 CS 使用 PA12，Flash 2 的 CS 使用 PA26。该管脚带内部上拉，适合作为低有效 CS，复位时默认高电平（未选中）</span> | <span class="flag-red">全部型号</span> | 必检 |
| 13 | <span class="flag-red">使用两颗外部 NOR Flash 时，第一颗必须为 16 MB；第二颗可为 8 MB 或 16 MB</span> | <span class="flag-red">全部型号</span> | 必检 |
| 14 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |
| 15 | <span class="flag-red">所选 NOR Flash 型号符合关键器件选型指南中的要求；否则 ROM 可能无法识别，导致系统无法启动</span> | <span class="flag-red">全部型号</span> | 必检 |
| 16 | <span class="flag-red">所选 SPI/SD NAND Flash 型号符合关键器件选型指南中的要求；否则 ROM 可能无法识别，导致系统无法启动</span> | <span class="flag-red">全部型号</span> | 必检 |

</div>

### 5.8.10. 显示 { #5810-display }

<div align="center"><em>表 5.8.10-1：显示核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 若连接 QSPI 显示屏，则信号连接正确 | 全部型号 | 必检 |
| 2 | 若连接 8080 接口显示屏，则信号连接正确 | 全部型号 | 必检 |
| 3 | 若连接 JDI 显示屏，则信号连接正确 | 全部型号 | 必检 |
| 4 | LCD QSPI 信号连接正确；<span class="flag-red">CLK 和数据线带 100 Ω 串联电阻</span> | 全部型号 | 必检 |
| 5 | LCD RSTB 连接正确（推荐 PA0） | 全部型号 | 必检 |
| 6 | LCDC 防撕裂同步（TE）连接正确（连接到面板的 TE 或 Fmark 信号） | 全部型号 | 必检 |
| 7 | TP 信号遵循推荐管脚分配（参考 EVB I/O 配置文件） | 全部型号 | 必检 |
| 8 | 已确认产品是否需要支持常亮显示（Always-on Display） | 全部型号 | 必检 |
| 9 | 显示屏由低静态电流 LDO 供电；<span class="flag-red">推荐用 PA30 控制该 LDO 的使能</span> | 全部型号 | 必检 |
| 10 | 已确认 TP 与 LCD 的电源需要分别控制还是共同控制 | 全部型号 | 必检 |
| 11 | 若 LCD 集成光传感器，则光传感器电源也已提供 | 全部型号 | 必检 |
| 12 | TFT LCD 背光控制：若高电平开、低电平关（active-high），则使用下拉型（PD）GPIO；若低电平开、高电平关（active-low），则使用上拉型（PU）GPIO | 全部型号 | 必检 |
| 13 | <span class="flag-red">SPI LCD：3 线模式——CS 接 PA03，CLK 接 PA04，DATA 接 PA05；4 线模式——CS 接 PA03，CLK 接 PA04，DATA 接 PA05，DC 接 PA06</span> | 全部型号 | 必检 |
| 14 | MCU 的 JDI 接口连接 Sharp Memory/JDI 显示：VCOM 与 VB 接 MCU PA24，VA 接 MCU PA25，R0/G0/B0 接 MCU R1/G1/B1，R1/G1/B1 接 MCU R2/G2/B2，GSP 接 MCU VST，BSP 接 MCU HST，GCK 接 MCU VCK，BCK 接 MCU HCK，GEN 接 MCU ENB，INTB 接 MCU XRST | 全部型号 | 必检 |
| 15 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |

</div>

### 5.8.11. GPADC { #5811-gpadc }

<div align="center"><em>表 5.8.11-1：GPADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | GPADC 输入连接到对应管脚 <span class="flag-red">（PA28–PA34，共 7 个 GPIO 支持 GPADC 复用）</span> | 全部型号 | 可选 |
| 2 | 输入到 GPADC 的电压保持在 0–3.3 V 范围内 | 全部型号 | 可选 |
| 3 | 对任何由 GPADC 测量的分压输入，分压电阻均使用 1% 精度；<span class="flag-red">每个 GPADC 通道都在靠近芯片管脚处放置 100 nF 滤波电容</span> | 全部型号 | 必检 |

</div>

### 5.8.12. 按键 { #5812-buttons }

<div align="center"><em>表 5.8.12-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 已确认按键是否需要唤醒功能 | 全部型号 | 必检 |
| 2 | 普通按键连接正确（已上拉、阻值正确、上拉电压域正确） | 全部型号 | 必检 |
| 3 | 电源键使用 PA34，高电平有效，长按 10 秒复位；<span class="flag-red">10 kΩ 下拉电阻必须放在主板上</span> | 全部型号 | 必检 |
| 4 | 所有按键信号都具备 ESD 保护 | 全部型号 | 必检 |

</div>

### 5.8.13. EOS 与 ESD 保护 { #5813-eos-and-esd-protection }

<div align="center"><em>表 5.8.13-1：EOS 与 ESD 保护核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 充电接口具备 EOS、ESD 和 OVP 设计 | 全部型号 | 必检 |
| 2 | 电池接口具备 ESD 器件 | 全部型号 | 必检 |
| 3 | 天线接口具备 ESD 器件 | 全部型号 | 必检 |
| 4 | LCD 与 TP 电源接口具备 ESD 器件 | 全部型号 | 必检 |
| 5 | TP I2C、RST 与 INT 线路具备 ESD 器件 | 全部型号 | 必检 |
| 6 | 心率传感器电源接口与信号线具备 ESD 器件 | 全部型号 | 必检 |

</div>

### 5.8.14. I2C { #5814-i2c }

<div align="center"><em>表 5.8.14-1：I2C 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | I2C 已上拉且阻值正确；若需要 400 kHz 工作，推荐 2.2 kΩ 上拉；应使用外设侧电压域，并在外设掉电时同步关闭上拉电源 | 全部型号 | 必检 |
| 2 | I2C 中断信号在需要时支持硬件唤醒 | 全部型号 | 必检 |
| 3 | 加速度传感器（G-sensor）、心率传感器、地磁传感器等 I2C 外设支持一次连续读取（burst read）获取全部数据 | 全部型号 | 必检 |
| 4 | 若多个器件共用一条 I2C 总线，其地址已区分 | 全部型号 | 必检 |

</div>

### 5.8.15. 模拟音频 { #5815-analog-audio }

<div align="center"><em>表 5.8.15-1：模拟音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | MEMS 麦克风连接正确 | 全部型号 | 可选 |
| 2 | MEMS 麦克风由 MIC_BIAS 供电 | 全部型号 | 可选 |
| 3 | 模拟 ECM 单端麦克风连接正确 | 全部型号 | 可选 |
| 4 | 模拟 ECM 单端麦克风由 MIC_BIAS 供电 | 全部型号 | 可选 |
| 5 | 所有音频 ADC 输入均带有至少 2.2 μF 的隔直电容 | 全部型号 | 可选 |
| 6 | 音频 DAC 输出 DACP 与 DACN 在芯片附近各有一个 1 kΩ 串联电阻，并在 DACP 与 DACN 之间并联一个 1.5 nF 电容 | 全部型号 | 可选 |
| 7 | <span class="flag-red">推荐使用 AW8155B 作为音频功放，并在软件中配置为 Class A/B 模式；其他功放器件需经测试验证</span> | 全部型号 | 可选 |
| 8 | <span class="flag-red">若不使用芯片集成的模拟音频 ADC 通路，建议将 ADCP 通过 0 Ω 电阻接地</span> | 全部型号 | 可选 |

</div>

### 5.8.16. SPI { #5816-spi }

<div align="center"><em>表 5.8.16-1：SPI 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SPI 连接正确：MCU 侧 SDO 连接到外设 SDI，MCU 侧 SDI 连接到外设 SDO | 全部型号 | 可选 |
| 2 | SPI 外设时序要求已满足 | 全部型号 | 可选 |
| 3 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 可选 |

</div>

### 5.8.17. USART 与调试接口 { #5817-usart-and-debug-interface }

<div align="center"><em>表 5.8.17-1：USART 与调试接口核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | PA18/PA19（复用为 DBG_UART）构成程序下载与调试接口——已预留测试点，且<span class="flag-red">带 100 Ω 串联电阻</span> | 全部型号 | 必检 |
| 2 | 连接外设时，MCU RXD 连接外设 TXD，MCU TXD 连接外设 RXD | 全部型号 | 必检 |
| 3 | 当 PA35/PA36 复用为连接外设的 UART 时，需确保 MCU 复位时外设处于掉电状态，或软件将这些管脚拉低 | 全部型号 | 必检 |
| 4 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |

</div>

### 5.8.18. PWM { #5818-pwm }

<div align="center"><em>表 5.8.18-1：PWM 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | LCD 背光控制使用 PA1（推荐） | 全部型号 | 可选 |
| 2 | 振动马达 PWM 管脚使用 PA20 | 全部型号 | 必检 |

</div>

### 5.8.19. USB { #5819-usb }

<div align="center"><em>表 5.8.19-1：USB 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | USB 接口连接正确 | 全部型号 | 可选 |
| 2 | USB 接口具备 ESD 保护 | 全部型号 | 可选 |
| 3 | 正常非睡眠工作时，只要 USB 保持使能，主机即可检测插拔；若 MCU 睡眠期间也需要检测，则需增加 VBUS 分压电路，将与 IO 电压匹配的电平送入 MCU 唤醒管脚——推荐与充电器插入检测管脚共用 | 全部型号 | 可选 |

</div>

### 5.8.20. 功耗 { #5820-power-consumption }

<div align="center"><em>表 5.8.20-1：功耗核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | LDO/DCDC 器件为高电平使能；若输出默认关闭，则需在 EN 到地之间增加 1 M–5.1 MΩ 下拉电阻，并结合项目功耗要求选值 | 全部型号 | 必检 |
| 2 | 基于 MOSFET 的电源开关使用 PMOS+NMOS 组合，控制管脚为高电平开 / 低电平关，且控制管脚对地增加 1 MΩ 下拉 | 全部型号 | 必检 |
| 3 | 外部 Flash 电源开关由 PA11 控制 | 仅 520/3/5/7 | 必检 |
| 4 | <span class="flag-red">外部 Flash 电源开关与 VDD_SIP 电源开关均由 PA21 控制</span> | <span class="flag-red">52A/D</span>[^52a-note] | 来源未注明[^52a-category-note] |
| 5 | 当 VSYS 用作 GPIO 上拉电源时，其始终上电；需确认这符合功耗要求 | 仅 520/3/5/7 | 必检 |
| 6 | 当 LDO2 或 LDO3 用作 GPIO 上拉电源时，需确认 LDO2/LDO3 掉电场景仍满足设计要求 | 仅 520/3/5/7 | 必检 |
| 7 | I2C 上拉电源与外设 IO 电源同步开关，以避免漏电 | 全部型号 | 必检 |
| 8 | PA09 使用说明：亮屏时输出高电平使能，睡眠时拉低 | 芯片修订版 A2 及更早 | 必检 |
| 9 | 已定义并记录深度睡眠（Deep Sleep）模式的底电流要求 | 全部型号 | 必检 |
| 10 | <span class="flag-red">已记录深度睡眠（Deep Sleep）模式下所选外设的底电流总和，且满足项目要求</span> | <span class="flag-red">全部型号</span> | 必检 |
| 11 | 已定义并记录待机（Standby）模式的底电流要求 | 全部型号 | 必检 |
| 12 | <span class="flag-red">已记录待机（Standby）模式下所选外设的底电流总和，且满足项目要求</span> | <span class="flag-red">全部型号</span> | 必检 |

[^52a-note]: 源电子表格将该项适用型号写作“52A/52D”。[SF32LB52x 硬件设计指南][SF32LB52x 硬件设计指南] 中介绍的型号为 SF32LB52B/D/E/G/J，表格中的“52A”无法对应其中某一型号。应用该项前，请核对具体型号与数据手册，不要自行将“52A”替换为其他型号。
[^52a-category-note]: 源电子表格未填写该项的检查类别，因此保留为“来源未注明”，不自行归为“必检”或“可选”。请结合所选器件确认适用范围及验收要求。

!!! important "启动存储电源控制管脚存在源资料差异"
    本表保留检查表工作簿中电池供电型号外部 Flash 使用 PA11 的原始记录。按本项目的资料优先级，优先级更高的 OpenSiFli 应用说明和原理图设计指南指定 PA21 控制启动存储电源开关；因此应以 PA21 作为有源资料支持的设计依据，不要仅依据优先级较低的工作簿改用 PA11。工作簿未说明 PA11 是另一个板级使能信号还是管脚定义冲突；发布前应向思澈科技（SiFli）确认具体网络和型号。

</div>

### 5.8.21. 下载与调试测试点 { #5821-download-and-debug-test-points }

<div align="center"><em>表 5.8.21-1：下载与调试测试点核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 程序下载/调试测试点已预留 VBAT、GND、PA18（DBG_UART_RXD）、PA19（DBG_UART_TXD）、VSYS、PA34 等测试点 | 全部型号 | 必检 |

</div>

[SF32LB52x 硬件设计指南]: SF32LB52x_hardware_design_guide.md
[思澈科技（SiFli）合格供应商名录]: ../cad-components/sifli-approved-vendor-list.md
