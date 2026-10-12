---
icon: lucide/list-checks
hide:
    - navigation
description: "SF32LB55x MCU 的逐项原理图评审核对表，覆盖封装、电源、时钟、RF、存储、显示与制造检查项。"
tags:
    - 硬件
    - 芯片
    - 核对清单
---

# SF32LB55x 硬件设计指南 — 原理图核对表 { #sf32lb55x-hardware-design-guide-schematic-checklist }

## 5.8. 原理图核对表 { #58-schematic-checklist }

以下各表分别对应一个原理图功能模块。若表中存在“适用型号”列，则仅对该列所列型号应用对应检查项。

红色文字和黄色底色用于保留源工作簿中的审阅强调。工作簿未说明各处高亮的具体原因，因此应将其视为额外的审阅提示，不改变检查项的“必检/可选”类别。

### 5.8.1. 封装 { #581-package }

<div align="center"><em>表 5.8.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 所选料号的封装正确，包括引脚名称与引脚编号 | 全部型号 | 必检 |

</div>

### 5.8.2. 电源 { #582-power-supply }

<div align="center"><em>表 5.8.2-1：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | VDD1 供电电压为 1.8 V-3.3 V | 仅 551/555/557 | 必检 |
| 2 | <span class="flag-red">VDD1 供电电压为 3.3 V</span> | <span class="flag-red">仅 SS6600A8</span> | <span class="flag-red">必检</span> |
| 3 | VDD2 供电电压为 1.8 V-3.3 V | 仅 555/557 | 必检 |
| 4 | BUCK1_VSW 与 BUCK1_VOUT 连接正确 | 全部型号 | 必检 |
| 5 | BUCK2_VSW 与 BUCK2_VOUT 连接正确 | 仅 555/557 | 必检 |
| 6 | LDOVCC2_VOUT 连接正确 | 仅 555/557 | 必检 |
| 7 | AVDD_DSI 供电电压为 1.8 V | 仅 555/557 | 必检 |
| 8 | LDO_VOUT1 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 9 | LDO_VOUT2 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 10 | VDD_RET 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 11 | VDD_RTC 输出预留测试点，或预留便于测压的滤波电容 | 全部型号 | 必检 |
| 12 | VDD_SIP 供电电压为 1.8 V，并提供负载开关以便关断 | 仅 551/555/557 | 必检 |
| 13 | <span class="flag-red">VDD_SIP 供电电压为 3.3 V，并提供负载开关以便关断</span> | <span class="flag-red">仅 SS6600A8</span> | <span class="flag-red">必检</span> |
| 14 | AVDD33 供电电压为 3.3 V | 全部型号 | 必检 |
| 15 | AVDD_BRF 供电电压为 1.8 V-3.3 V，且必须与 VDD1 供电一致 | 仅 551/555/557 | 必检 |
| 16 | <span class="flag-red">AVDD_BRF 供电电压为 3.3 V</span> | <span class="flag-red">仅 SS6600A8</span> | <span class="flag-red">必检</span> |
| 17 | VDDIOA 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | 仅 551/555/557 | 必检 |
| 18 | VDDIOB 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | 仅 551/555/557 | 必检 |
| 19 | <span class="flag-red">VDDIOA 供电电压为 3.3 V；首版 PCB 需预留 0 Ω 串联电阻</span> | <span class="flag-red">仅 SS6600A8</span> | <span class="flag-red">必检</span> |
| 20 | <span class="flag-red">VDDIOA 供电电压为 3.3 V；首版 PCB 需预留 0 Ω 串联电阻</span> | <span class="flag-red">仅 SS6600A8</span> | <span class="flag-red">必检</span> |
| 21 | 当使用 SF30147C 供电时，TWI 控制接口必须使用 MCU 的 PB 引脚，且这些引脚必须是 PD 引脚 | 仅 551/555/557 | 必检 |
| 22 | 当使用 SF30147C 供电时，由 EN 控制的电源轨必须使用 PVDD 或 AVDD 作为 EN 的供电域；不要直接由 MCU GPIO 控制 EN。或者将 EN 接地，并通过寄存器控制对应电源轨输出 | 仅 551/555/557 | 必检 |
| 23 | 当使用 SF30147C 供电时，BUCK 与 LDO1 只能分别通过 EN_BUCK 和 EN_LDO1 使能信号控制，不支持内部寄存器控制 | 仅 551/555/557 | 必检 |
| 24 | 充电电路需具备电源路径管理（power-path management）能力，以便在电池电压过低时，系统仍可由充电器的 5 V 输入端供电 | 全部型号 | 必检 |

</div>

来源存在歧义：原始 V1.0 工作簿中的第 19、20 项完全相同，均要求 SS6600A8 的 VDDIOA 为 3.3 V。[硬件应用指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)将 VDDIOA 定义为 PA I/O 电源、VDDIOB 定义为 PB I/O 电源，但没有说明第 20 项原本是否应为 VDDIOB。上表按原样保留工作簿内容。将第 20 项用于设计签核前，请向思澈科技（SiFli）确认应检查的电源轨。

### 5.8.3. 电源电容与电感 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>表 5.8.3-1：电源电容与电感核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | VDD1 大电容至少为 10 μF | 全部型号 | 必检 |
| 2 | VDD2 电容至少为 10 μF | 仅 555/557 | 必检 |
| 3 | BUCK1_VOUT 电容为 4.7 μF | 全部型号 | 必检 |
| 4 | BUCK2_VOUT 电容为 4.7 μF | 仅 555/557 | 必检 |
| 5 | <span class="flag-red">AVDD_DSI 电容至少为 10 μF</span> | 仅 555/557 | 必检 |
| 6 | LDO_VOUT1 电容为 4.7 μF | 全部型号 | 必检 |
| 7 | LDO_VOUT2 电容为 4.7 μF | 全部型号 | 必检 |
| 8 | VDD_RET 电容 = 0.47 μF | 全部型号 | 必检 |
| 9 | VDD_RTC 电容 = 1 μF | 全部型号 | 必检 |
| 10 | VDD_SIP 电容至少为 1 μF | 全部型号 | 必检 |
| 11 | AVDD33 电容至少为 1 μF | 全部型号 | 必检 |
| 12 | AVDD_BRF 电容至少为 1 μF | 全部型号 | 必检 |
| 13 | VDDIOA 电容至少为 1 μF | 全部型号 | 必检 |
| 14 | VDDIOB 电容至少为 1 μF | 全部型号 | 必检 |
| 15 | VDD1、VDD2（仅 555）、AVDD_BRF 与 RESET 上拉电源必须相同 | 全部型号 | 必检 |
| 16 | BUCK1 电感为思澈科技（SiFli）推荐料号 | 仅 551/555/557 | 必检 |
| 17 | BUCK2 电感为思澈科技（SiFli）推荐料号 | 仅 555/557 | 必检 |
| 18 | 若 BUCK 电感不是思澈科技（SiFli）推荐料号，则需满足 L = 4.7 μH、DCR ≤ 0.4 Ω、Isat ≥ 450 mA | 全部型号 | 必检 |
| 19 | 若存在 GPS 或其他易受干扰外设，则需在 BUCK_LX 预留对地并联电容焊盘；取值依据实际测试结果确定 | 全部型号 | 必检 |
| 20 | <span class="flag-red">当将 VBAT 转换为 1.8 V 给 VDD1 与 VDD2（仅 555）供电时，应使用 DCDC，不要使用 LDO</span> | 仅 551/555/557 | 必检 |
| 21 | <span class="flag-red">已记录所选 DCDC 的静态电流，且满足项目要求</span> | 全部型号 | 必检 |
| 22 | <span class="flag-red">已记录所选 LDO 的静态电流，且满足项目要求</span> | 全部型号 | 必检 |

</div>

资料存在差异：思澈科技（SiFli）《[硬件应用说明](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)》表 3-3 和[原理图检查表 V1.0](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)第 9 项均规定 VDD_RTC 使用 1 µF 电容，但[参考原理图中的 C0313](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/assets/55x/SF32LB55x-LDOIO-SCH.png)标注为 0.1 µF。资料未说明两种取值分别适用于什么情况。定版前请向思澈科技（SiFli）确认具体器件所需的电容值，不要自行推断。

### 5.8.4. 时钟 { #584-clock }

<div align="center"><em>表 5.8.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 主 48 MHz 晶体为 AVL 清单内料号 | 全部型号 | 必检 |
| 2 | 若 48 MHz 晶体不在 AVL 清单内，则需满足 7 pF ≤ CL ≤ 12 pF（推荐 8.8 pF）、频偏 ≤ ±10 ppm、ESR ≤ 30 Ω（推荐 22 Ω） | 全部型号 | 必检 |
| 3 | RTC 32.768 kHz 晶体为 AVL 清单内料号 | 全部型号 | 必检 |
| 4 | 若 32.768 kHz 晶体不在 AVL 清单内，则需满足 CL ≤ 12.5 pF（推荐 7 pF）、频偏 ≤ ±20 ppm、ESR ≤ 80 kΩ（推荐 38 kΩ） | 全部型号 | 必检 |
| 5 | <span class="flag-yellow">若不使用 32.768 kHz 晶体，则 XI 焊盘必须接地</span> | <span class="flag-yellow">全部型号</span> | <span class="flag-yellow">必检</span> |

</div>

### 5.8.5. 复位 { #585-reset }

<div align="center"><em>表 5.8.5-1：复位核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | RSTN 上拉到与 VDD1 相同的电源 | 全部型号 | 必检 |
| 2 | RSTN 预留 0.1 μF 对地电容 | 全部型号 | 必检 |
| 3 | RSTN 具备 ESD 保护 | 全部型号 | 必检 |

</div>

### 5.8.6. 地信号 { #586-ground-signals }

<div align="center"><em>表 5.8.6-1：地信号核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 所有 AVSS 信号均连接至 GND | 仅 555/557 | 必检 |
| 2 | 所有 VSS 信号均连接至 GND | 仅 555/557 | 必检 |
| 3 | EPAD 信号连接至 GND | <span class="flag-red">仅 551/SS6600A8</span> | 必检 |

</div>

### 5.8.7. 启动模式 { #587-boot-mode }

<div align="center"><em>表 5.8.7-1：启动模式核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">MODE 默认通过 10 kΩ 下拉到地，下载/编程时上拉到 VDDIOA</span> | 全部型号 | 必检 |
| 2 | <span class="flag-red">MODE 信号预留测试点</span> | 全部型号 | 必检 |
| 3 | 若 PCB 空间允许，预留 3 针排针，以便通过跳帽选择上拉或下拉 | 全部型号 | 必检 |

</div>

### 5.8.8. 射频 { #588-rf }

<div align="center"><em>表 5.8.8-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | ANT 信号已标注单端 50 Ω 特性阻抗要求 | 全部型号 | 必检 |
| 2 | ANT 信号预留 Pi 型匹配网络：一个并联 NC（不贴装）电容和一个 15 pF 串联电容 | 全部型号 | 必检 |
| 3 | 若需要杂散发射滤波，则预留 Pi 网络，包含 3.0 nH 串联电感和 1.5 pF 对地电容 | 全部型号 |    |
| 4 | <span class="flag-red">若需要控制外部 PA 或 LNA，则将 PB05 连接至 RX_EN，将 PB25 连接至 TX_EN</span> | 全部型号 | 可选 |

</div>

源工作簿未为射频第 3 项填写类别，因此此处保留空白；在思澈科技（SiFli）确认前，不应自行推定为“必检”或“可选”。

### 5.8.9. I/O 资源分配 { #589-io-resource-allocation }

<div align="center"><em>表 5.8.9-1：I/O 资源分配核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 已提供与原理图一致的 GPIO 资源分配表 | 全部型号 | 必检 |
| 2 | 资源表中的 GPIO 分配与原理图一致 | 全部型号 | 必检 |
| 3 | 实际 GPIO 分配遵循思澈科技（SiFli）建议；可参考 EVB I/O 配置文件 | 全部型号 | 必检 |

</div>

### 5.8.10. 硬件唤醒 { #5810-hardware-wake-up }

<div align="center"><em>表 5.8.10-1：硬件唤醒核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | <span class="flag-red">HCPU 唤醒中断源使用正确：PA77、PA78、PA79、PA80；不要用于电源键唤醒</span> | 全部型号 | 必检 |
| 2 | <span class="flag-red">LCPU 唤醒中断源使用正确：PB43、PB44、PB45、PB46、PB47、PB48，共 6 个引脚，可用于电源键唤醒</span> | 全部型号 | 必检 |
| 3 | <span class="flag-red">G-sensor、心率传感器等 LCPU 侧外设的中断与控制信号必须连接到 PB GPIO</span> | 全部型号 | 必检 |
| 4 | <span class="flag-red">与 UART3 对应的 LCPU 中断源使用正确；推荐仅用于按键唤醒</span> | 全部型号 | 必检 |

</div>

### 5.8.11. 存储 { #5811-storage }

<div align="center"><em>表 5.8.11-1：存储核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | QSPI2 按照 PSRAM &gt; NOR Flash &gt; NAND Flash 的优先级进行设计 | 全部型号 | 必检 |
| 2 | 若代码运行于内部 SiP NOR Flash，则 VDD_SIP 电源开关控制为 PA58 | 全部型号 | 必检 |
| 3 | 若代码运行于 QSPI2 外部 NOR Flash，则 QSPI2 电源开关控制为 PA58 | 全部型号 | 必检 |
| 4 | 若 QSPI2 外部 Flash 需要在量产中烧录，则其电源开关必须由 PA58 控制 | 全部型号 | 必检 |
| 5 | <span class="flag-red">PA58 控制的电压开关为高电平开启、低电平关闭</span> | 全部型号 | 必检 |
| 6 | <span class="flag-red">推荐在 Flash CLK 与数据线上串联 33 Ω 电阻</span> | 全部型号 | 必检 |
| 7 | QSPI3 按预期连接至 NAND Flash 或 eMMC | 仅 555/557 | 可选 |
| 8 | QSPI3 电源开关控制为 PA41；<span class="flag-red">QSPI3 默认掉电，若使用高电平开启开关，应利用默认内部下拉</span> | 仅 555/557 | 可选 |
| 9 | <span class="flag-red">若 QSPI3 电源开关控制不是 PA41，则需与软件确认替代 IO</span> | 仅 555/557 | 可选 |
| 10 | 若 QSPI3 外部 Flash 需要在量产中烧录，则其电源开关必须由 PA58 控制 | 仅 555/557 | 必检 |
| 11 | OPI PSRAM 电源开关控制为 PA70；<span class="flag-red">PSRAM 默认上电，若使用高电平开启开关，应利用默认内部上拉</span> | 仅 555/557 | 可选 |
| 12 | <span class="flag-red">OPI PSRAM 型号受支持，并符合关键器件选型指南中的要求</span> | 仅 555/557 | 可选 |
| 13 | OPI PSRAM 信号连接正确 | 仅 555/557 | 可选 |
| 14 | QSPI2 信号连接正确 | 全部型号 | 可选 |
| 15 | QSPI3 信号连接正确 | 全部型号 | 可选 |
| 16 | <span class="flag-yellow">使用 SF32LB555 或 <span class="flag-red">SF32LB557 时，需确认心率算法所需的存储空间；若 LCPU 空间不足，则在 QSPI4 增加外部 1 MB Flash</span></span> | 仅 555/557 | 必检 |
| 17 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |
| 18 | <span class="flag-red">NOR Flash 型号符合关键器件选型指南中的要求</span> | 全部型号 | 必检 |
| 19 | <span class="flag-red">NAND Flash 型号符合关键器件选型指南中的要求</span> | 全部型号 | 必检 |

</div>

### 5.8.12. 显示 { #5812-display }

<div align="center"><em>表 5.8.12-1：显示核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SF32LB555xxxx 按预期通过 DSI + LCDC2 连接显示屏 | 仅 555/557 | 必检 |
| 2 | <span class="flag-red">SF32LB551xxxx 按预期通过 LCDC1 连接显示屏</span> | <span class="flag-red">仅 551/SS6600A8</span> | 必检 |
| 3 | LCDC1 QSPI 信号连接正确；<span class="flag-red">推荐在 CLK 和数据线上串联 100 Ω 电阻</span> | 全部型号 | 必检 |
| 4 | LCDC1 MCU8080 信号连接正确 | 全部型号 | 必检 |
| 5 | DSI 信号连接正确 | 仅 555/557 | 必检 |
| 6 | LCDC2 QSPI 信号连接正确 | 仅 555/557 | 必检 |
| 7 | DSI_REXT 通过 10 kΩ 电阻接地 | 仅 555/557 | 必检 |
| 8 | LCDC RSTB 连接正确 | 全部型号 | 必检 |
| 9 | LCDC TE 连接正确（连接到面板的 TE 或 Fmark 信号） | 全部型号 | 必检 |
| 10 | <span class="flag-red">SPI LCD：3 线模式下，CS 接 GPIO22 或 PA31 或 PB33，CLK 接 GPIO23 或 PA20 或 PB32，DATA 接 GPIO21 或 PA34 或 PB35；<br>4 线模式下，CS 接 GPIO22 或 PA31 或 PB33，CLK 接 GPIO23 或 PA20 或 PB32，DATA 接 GPIO21 或 PA34 或 PB35，DC 接 GPIO20 或 PA36 或 PB36</span> | 全部型号 | 必检 |
| 11 | TP 信号遵循推荐引脚分配（参考 EVB I/O 配置文件） | 全部型号 | 必检 |
| 12 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |
| 13 | 若需支持熄屏显示，LCD QSPI 接口应连接到 MCU 的 PA 管脚；LCD_EN、LCD_RST 等控制信号建议使用 PB GPIO | <span class="flag-red">仅 551/SS6600A8</span> | 必检 |
| 14 | 若需支持熄屏显示，LCD QSPI 接口应连接到 MCU 的 PA 管脚，也可使用 LCD MIPI 接口连接 MCU；LCD_EN、LCD_RST 等控制信号建议使用 PB GPIO | 仅 555/557 | 必检 |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>表 5.8.13-1：GPADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | GPADC 输入连接到对应引脚 | 全部型号 | 可选 |
| 2 | GPADC 输入范围正确；最大输入电压不得超过 1.0 V | 全部型号 | 可选 |
| 3 | 电池电压分压建议：电源侧使用 1 MΩ 1% 电阻，对地使用 220 kΩ 1% 电阻，并增加 100 nF 滤波电容 | 全部型号 | 必检 |
| 4 | 对每一路由 GPADC 测量的分压信号，分压电阻均使用 1% 精度；<span class="flag-red">每个 GPADC 通道都必须在靠近芯片引脚处放置 100 nF 滤波电容</span> | 全部型号 | 必检 |

</div>

资料存在差异：按资料优先级更高的 [OpenSiFli 硬件应用指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB55x-HW-Application.md)，GPADC 为 5 通道、10 位，输入范围为 0–0.9 V。本 V1.0 [源检查表工作簿](https://downloads.sifli.com/hardware/files/documentation/SF32LB55x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)第 2 项规定最大输入电压为 1.0 V，但未说明通道数。与此不同，[SF32LB55x 规格书 V1.7.2 第 3.2.1 节](https://downloads.sifli.com/user%20manual/DS5501-SF32LB55x-%E8%8A%AF%E7%89%87%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V1p7p2.pdf)规定支持 8 路单端输入或 4 对差分输入，单端范围为 0–1.1 V，差分范围为 −0.7–0.7 V；其引脚表列出 GPADC_CH0–CH7。当前 [SDK ADC 指南](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/app_note/adc.html)同样列出 8 个通道（0–7）和 1.1 V 最大采样电压。思澈科技（SiFli）尚未解释通道数和电压限值的差异。因此，核对表第 2 项保留工作簿中的 1.0 V 原值；在获得思澈科技（SiFli）书面澄清前，实际设计应遵循优先级更高的硬件应用指南，将 VADC 控制在 0–0.9 V 范围内。不要将工作簿中的 1.0 V 或规格书和 SDK 中的 1.1 V 视为已批准的设计上限，并向思澈科技（SiFli）确认所选器件和封装的可用通道。

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>表 5.8.14-1：SDMADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SDMADC 输入连接到对应引脚 | 仅 555/557 | 可选 |
| 2 | SDMADC 输入范围正确；最大输入电压不应超过 1.2 V | 仅 555/557 | 可选 |
| 3 | SDMADC_VREF 与 SDMADC_VSS_VREF 连接正确 | 仅 555/557 | 必检 |

</div>

### 5.8.15. 按键 { #5815-buttons }

<div align="center"><em>表 5.8.15-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 与客户确认按键是否需要唤醒能力 | 全部型号 | 必检 |
| 2 | 按键连接正确：已上拉、阻值正确、上拉电压域正确 | 全部型号 | 必检 |
| 3 | <span class="flag-red">电源键必须使用 PB43、PB44、PB45、PB46、PB47 或 PB48</span> | 全部型号 | 必检 |
| 4 | 所有按键信号都具备 ESD 保护 | 全部型号 | 必检 |

</div>

### 5.8.16. EOS 与 ESD 保护 { #5816-eos-and-esd-protection }

<div align="center"><em>表 5.8.16-1：EOS 与 ESD 保护核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 充电接口具备 EOS、ESD 和 OVP 设计 | 全部型号 | 必检 |
| 2 | 充电器插入检测信号具备 ESD 器件 | 全部型号 | 必检 |
| 3 | 电池接口具备 ESD 器件 | 全部型号 | 必检 |
| 4 | 天线接口具备 ESD 器件 | 全部型号 | 必检 |
| 5 | LCD 与 TP 电源接口具备 ESD 器件 | 全部型号 | 必检 |
| 6 | TP I2C、RST 与 INT 线路具备 ESD 器件 | 全部型号 | 必检 |
| 7 | 心率传感器电源接口与信号线具备 ESD 器件 | 全部型号 | 必检 |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>表 5.8.17-1：I2C 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | I2C 分配已考虑 HCPU/LCPU 分区，以及器件是否必须在低功耗模式下运行 | 全部型号 | 必检 |
| 2 | I2C 已上拉且阻值正确；若需要 400 kHz 工作，推荐使用 2.2 kΩ 上拉。应使用外设侧电压域，并在外设下电时同步关闭上拉电源 | 全部型号 | 必检 |
| 3 | I2C 中断信号在需要时支持硬件唤醒 | 全部型号 | 必检 |
| 4 | 若多个器件共用同一 I2C 总线，其地址已区分 | 全部型号 | 必检 |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>表 5.8.18-1：I2S 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | I2S1 仅支持输入；麦克风按预期连接至 I2S1 | 全部型号 | 可选 |
| 2 | I2S2 支持输入与输出；音频解码器或编解码器按预期连接至 I2S2 | 全部型号 | 可选 |
| 3 | I2S 信号连接正确 | 全部型号 | 可选 |
| 4 | I2S 双麦克风连接正确 | 全部型号 | 可选 |
| 5 | 麦克风料号规格已确认，且受芯片支持 | 全部型号 | 可选 |
| 6 | 若需要 MCLK，已确认其连接正确 | 全部型号 | 可选 |
| 7 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 可选 |

</div>

### 5.8.19. PDM { #5819-pdm }

<div align="center"><em>表 5.8.19-1：PDM 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | PDM 连接正确 | 仅 555/557 | 可选 |
| 2 | PDM 接口的双数字麦克风连接正确 | 仅 555/557 | 可选 |
| 3 | 麦克风料号规格已确认，且受芯片支持 | 仅 555/557 | 可选 |
| 4 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 仅 555/557 | 可选 |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>表 5.8.20-1：SPI 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SPI 连接正确：<span class="flag-red">MCU SDO 连接到外设 SDI，MCU SDI 连接到外设 SDO</span> | 全部型号 | 可选 |
| 2 | 已确认 SPI 外设时序要求，且芯片支持 | 全部型号 | 可选 |
| 3 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 可选 |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>表 5.8.21-1：USART 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | USART3 设计为下载与日志接口 | 全部型号 | 必检 |
| 2 | <span class="flag-red">USART3 具备测试点，并在需要时增加上拉电阻；推荐串联 100 Ω 电阻，实际阻值可按设计调整</span> | 全部型号 | 必检 |
| 3 | 必须运行在 HCPU 上的设备连接至 USART1 或 USART2 | 全部型号 | 可选 |
| 4 | 必须运行在 LCPU 上的设备连接至 USART4 或 USART5 | 全部型号 | 可选 |
| 5 | <span class="flag-red">连接外设时，MCU RXD 连接外设 TXD，MCU TXD 连接外设 RXD</span> | 全部型号 | 必检 |
| 6 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 全部型号 | 必检 |
| 7 | 未使用的 USART 测试点已预留，作为备用 | 全部型号 | 可选 |
| 8 | <span class="flag-red">若 UART1 连接器件，则已预留测试点</span> | 全部型号 | 必检 |
| 9 | <span class="flag-red">若 UART 连接 UART-to-USB 芯片，则 RX 与 TX 必须可断开</span> | 全部型号 | 必检 |
| 10 | <span class="flag-red">推荐连接外设的 UART 使用 HCPU 接口，以避免 HCPU 软件占用 LCPU 的 UART 接口</span> | 全部型号 | 必检 |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>表 5.8.22-1：PWM 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 背光 PWM 引脚分配正确；使用与马达不同的 GPTIMx，优先放在 PB 接口上，以避免 HCPU 降频影响背光 | 全部型号 | 可选 |
| 2 | 马达 PWM 引脚分配正确；使用与背光不同的 GPTIMx，优先放在 PB 接口上，以避免 HCPU 降频影响振动 | 全部型号 | 可选 |
| 3 | 马达 PWM 控制引脚推荐放在 PB 接口上，优先 PB24 或 PB25，以避免使用 SMT 马达时在编程阶段出现异常 | 全部型号 | 可选 |
| 4 | 需要 PWM 输出的信号必须使用 PB 接口，同时检查冷启动异常行为 | 全部型号 | 可选 |

</div>

### 5.8.23. 调试 { #5823-debug }

<div align="center"><em>表 5.8.23-1：调试核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | SWD 信号连接正确 | 全部型号 | 可选 |
| 2 | J-Link 连接器或测试点已正确预留 I/O 供电参考 | 全部型号 | 可选 |
| 3 | <span class="flag-yellow">对于 SF32LB555x XXXX 的量产烧录，除 PVDD、VDDIOA、VDDIOB、VDDSIP、AVDD33 和 AVDD_BRF 外，AVDD_DSI 也必须上电</span> | 仅 555/557 | 必检 |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>表 5.8.24-1：USB 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | USB 接口连接正确 | 全部型号 | 可选 |
| 2 | USB 接口具备 ESD 保护 | 全部型号 | 可选 |
| 3 | 正常非睡眠工作时，只要 USB 保持使能，PC/设备端即可感知插拔；<br>若 MCU 进入睡眠且仍需感知插拔，则应增加 VBUS 分压电路，输出与 IO 电压匹配的高电平并送入 MCU 唤醒引脚，推荐与充电器插入检测唤醒引脚共用 | 全部型号 | 可选 |

</div>

### 5.8.25. 功耗 { #5825-power-consumption }

<div align="center"><em>表 5.8.25-1：功耗核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 不推荐将 QFN GPIO27 和 BGA PA01 用作输入，因为内部 20 kΩ 下拉会在外部上拉较大时造成高电平偏低，或在外部上拉较小时造成过大漏电 | 全部型号 | 必检 |
| 2 | 若 QFN GPIO27 或 BGA PA01 用作输出，需确认当 I/O 未驱动时，被控电路默认处于不使能状态。更适合用于大电流工作场景，因为输出 1.8 V 高电平会引入约 90 μA 漏电 | 全部型号 | 必检 |
| 3 | 若 PA01 与 PA03 用作 GPIO，则睡眠期间两路 IO 电平需保持一致，或至少让其中一路处于高阻态且不上拉不下拉 | 全部型号 | 必检 |
| 4 | PA77、PA78、PA79、PA80 以及 PB43-PB48 共 10 个可唤醒引脚。在休眠（Hibernate）断电状态下，它们为高阻态，内部 PU/PD 失效；若无法通过其他方式保证固定电平，则需增加外部上拉或下拉 | 全部型号 | 必检 |
| 5 | 若 PB 唤醒引脚用于波形输出，即使不使用休眠（Hibernate），也需预留外部上拉或下拉 | 全部型号 | 必检 |
| 6 | 对所有 MOSFET、LDO 与 DCDC 的使能引脚，需确保在休眠（Hibernate）状态下，借助默认上拉或下拉电阻仍能维持所需开/关状态 | 全部型号 | 必检 |
| 7 | 对于通过输出高电平控制负载的 GPIO 信号，在不影响功能时使用 1 MΩ 下拉以降低漏电 | 全部型号 | 必检 |
| 8 | 当 PA GPIO 输出在睡眠中必须保持高电平时，应选择 PU 引脚 | 全部型号 | 必检 |
| 9 | 当 PA GPIO 输出在睡眠中必须保持低电平时，应选择 PD 引脚 | 全部型号 | 必检 |
| 10 | 已记录休眠（Hibernate）模式的底电流要求 | 全部型号 | 必检 |
| 11 | <span class="flag-red">已记录休眠（Hibernate）模式下所选外设的底电流总和，且满足项目要求</span> | 全部型号 | 必检 |
| 12 | 已记录待机（Standby）模式的底电流要求 | 全部型号 | 必检 |
| 13 | <span class="flag-red">已记录待机（Standby）模式下所选外设的底电流总和，且满足项目要求</span> | 全部型号 | 必检 |
| 14 | 对于作为输出使用的 PB43-PB48 唤醒引脚，需预留外部上拉或下拉，因为其在待机（Standby）模式下内部上下拉失效 | 全部型号 | 必检 |

</div>

### 5.8.26. 离线下载与晶体校准 { #5826-offline-download-and-crystal-calibration }

<div align="center"><em>表 5.8.26-1：离线下载与晶体校准核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 适用型号 | 类别 |
|:---|:---|:---|:---|
| 1 | 若需要离线下载板进行固件烧录，则预留 VBAT、GND、UART3_TXD、UART3_RXD、MODE 与 RESET 测试点 | 全部型号 | 可选 |
| 2 | 若需要晶体校准，则预留 PB08；若 PB08 连接外设，优先将其用作输出，且外部不得接入电容 | 全部型号 | 可选 |

</div>
