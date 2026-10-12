---
icon: lucide/list-checks
description: "SF32LB58x MCU 的逐项原理图评审核对表，覆盖电源、时钟、RF、存储、显示与制造检查项。"
tags:
    - 硬件
    - 芯片
    - 核对清单
hide:
    - navigation
---

# SF32LB58x 硬件设计指南 — 原理图核对表 { #sf32lb58x-hardware-design-guide-schematic-checklist }

!!! note "SF32LB58x 硬件设计指南的一部分"
    本页列出第 5.8 节的原理图逐项核对表。返回[原理图设计指南](SF32LB58x_schematic_design.md)。

## 5.8. 原理图核对表 { #58-schematic-checklist }

以下各表分别对应一个原理图功能模块。请根据每项注明的条件判断其适用范围：满足相应条件时，必须核查“必检”项；只有采用对应功能或设计方案时，才需要核查“可选”项。

### 5.8.1. 封装 { #581-package }

<div align="center"><em>表 5.8.1-1：封装核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 所选料号的封装正确，包括引脚名称与引脚编号 | 必检 |

</div>

### 5.8.2. 电源 { #582-power-supply }

<div align="center"><em>表 5.8.2-1：电源核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PVDD1 供电电压为 1.8 V-3.3 V | 必检 |
| 2 | PVDD2 供电电压为 1.8 V-3.3 V | 必检 |
| 3 | BUCK1_LX 与 BUCK1_FB 连接正确 | 必检 |
| 4 | BUCK2_LX 与 BUCK2_FB 连接正确 | 必检 |
| 5 | LDO_VOUT1 输出预留测试点，或预留便于测压的滤波电容 | 必检 |
| 6 | VDD_RET 输出预留测试点，或预留便于测压的滤波电容 | 必检 |
| 7 | VDD_RTC 输出预留测试点，或预留便于测压的滤波电容 | 必检 |
| 8 | VDDIOA 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | 必检 |
| 9 | VDDIOA2 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | 必检 |
| 10 | VDDIOB 供电电压为 1.8 V-3.3 V；首版 PCB 需预留 0 Ω 串联电阻 | 必检 |
| 11 | VDDIOSA 供电电压为 1.8 V，并提供负载开关以便关断 | 必检 |
| 12 | VDDIOSB 供电电压为 1.8 V，并提供负载开关以便关断 | 必检 |
| 13 | VDDIOSC 供电电压为 1.8 V，且必须始终上电 | 必检 |
| 14 | AVDD33_USB 供电电压为 3.3 V | 必检 |
| 15 | AVDD33_ANA 供电电压为 3.3 V | 必检 |
| 16 | AVDD_BRF 供电电压为 1.8 V-3.3 V，且必须与 VDD1 供电一致 | 必检 |
| 17 | AVDD33_AUD 供电电压为 3.3 V | 必检 |
| 18 | AVDD18_DSI 供电电压为 1.8 V | 必检 |
| 19 | 当 SF30147C 提供电源时，TWI 控制接口必须使用 MCU 的 PB 引脚，且这些引脚必须是 PD 引脚 | 必检 |
| 20 | 充电电路需要具备电源路径管理（power-path management）能力，以便在电池电压过低时，系统可由充电器 5 V 输入供电 | 必检 |
| 21 | 当 SF30147C 提供电源时，使用芯片专用 TWI 控制接口 | 必检 |
| 22 | 当 SF30147C 提供电源时，由 EN 控制的电源轨必须使用 PVDD 或 AVDD 作为 EN 的供电域；不要直接由 MCU GPIO 控制 EN。或者将 EN 接地，并通过寄存器控制对应电源轨输出 | 必检 |
| 23 |  当 SF30147C 提供电源时，<span class="flag-red">BUCK 与 LDO1</span> 只能分别通过 EN_BUCK 与 EN_LDO1 使能信号控制，不支持内部寄存器控制  | 必检 |
| 24 | 58x 的 PVDD 与 VDDIOB 供电必须一致。若 PVDD 低于 VDDIOB，例如 VDDIOB = 3.3 V 而 PVDD = 1.8 V，则 VDDIOB 在待机（Standby）和休眠（Hibernate）下约有 15 μA 漏电 | 必检 |
| 25 | 在 58x 上，B4 脚为 VDD_EXT1，B5 脚为 VDD_EXT2；设计中可不连接 | 必检 |

</div>

!!! note "TWI 接口需向思澈科技（SiFli）确认"
    工作簿“供电”核对表第 19 项要求 TWI 控制接口使用 MCU 的 PB 接口，并要求相关管脚为“PD”管脚；第 21 项又要求使用芯片专用的 TWI 控制接口。工作簿没有解释“PD”的含义，也未说明两项要求应如何同时满足。OpenSiFli 的 SF32LB58x 硬件应用说明则称，通过两路 GPIO 模拟 TWI 信号来控制 SF30147C。原理图定版前，请向思澈科技（SiFli）确认应采用的接口及管脚。

### 5.8.3. 电源电容与电感 { #583-power-supply-capacitors-and-inductors }

<div align="center"><em>表 5.8.3-1：电源电容与电感核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PVDD1 大电容至少为 10 uF | 必检 |
| 2 | PVDD2 电容至少为 10 uF | 必检 |
| 3 | BUCK1_FB 电容 = 4.7 uF | 必检 |
| 4 | BUCK2_FB 电容 = 4.7 uF | 必检 |
| 5 | LDO_VOUT1 电容 = 4.7 uF | 必检 |
| 6 | VDD_RET 电容 = 0.47 uF | 必检 |
| 7 | VDD_RTC 电容 = 1 uF | 必检 |
| 8 | VDDIOA 电容 &gt;= 1 uF | 必检 |
| 9 | VDDIOA2 电容 &gt;= 1 uF | 必检 |
| 10 | VDDIOB 电容 &gt;= 1 uF | 必检 |
| 11 | VDDIOSA 电容 &gt;= 1 uF | 必检 |
| 12 | VDDIOSB 电容 &gt;= 1 uF | 必检 |
| 13 | VDDIOSC 电容 &gt;= 1 uF | 必检 |
| 14 | AVDD33_USB 电容 &gt;= 1 uF | 必检 |
| 15 | AVDD33_ANA 电容 &gt;= 4.7 uF | 必检 |
| 16 | AVDD_BRF 电容 &gt;= 4.7 uF | 必检 |
| 17 | AVDD33_AUD 电容 &gt;= 4.7 uF | 必检 |
| 18 | AUD_VREF 电容 = 1 uF | 必检 |
| 19 | AVDD18_DSI 电容 &gt;= 4.7 uF | 必检 |
| 20 | MIC_BIAS 电容 = 1 uF | 必检 |
| 21 | GPADC VREFP 电容 = 4.7 uF | 必检 |
| 22 | <span class="flag-red">PVDD1、PVDD2、AVDD_BRF 以及 RSTN 上拉电源必须相同</span> | 必检 |
| 23 | BUCK1 与 BUCK2 电感的料号均收录于思澈科技（SiFli）合格供应商名录（AVL） | 必检 |
| 24 | 若 BUCK 电感的料号未收录于思澈科技（SiFli）合格供应商名录（AVL），则需满足 L = 4.7 uH、DCR ≤ 0.4 Ω、Isat ≥ 450 mA | 必检 |
| 25 | <span class="flag-red">当 PVDD1 和 PVDD2 由 VBAT 转 1.8 V 供电时，应使用 DCDC 生成 1.8 V；不要使用 LDO</span> | 必检 |
| 26 | <span class="flag-red">已记录所选 DCDC 的静态电流，且满足项目要求</span> | 必检 |
| 27 | <span class="flag-red">已记录所选 LDO 的静态电流，且满足项目要求</span> | 必检 |

</div>

!!! note "BUCK 电感饱和电流的来源差异"
    工作簿“电源电容-电感”核对表第 24 项规定，非 AVL 推荐电感的 Isat 至少为 450 mA；OpenSiFli 硬件应用说明对 L = 4.7 μH、DCR ≤ 0.4 Ω 的 BUCK 电感规定 Isat 至少为 500 mA。表格保留工作簿中的 450 mA 原值；[原理图设计中的 BUCK 电感选型](SF32LB58x_schematic_design.md#5114-buck-inductor-selection)按 500 mA 执行。在思澈科技（SiFli）澄清前，非 AVL 电感应满足至少 500 mA 的 Isat 要求。

### 5.8.4. 时钟 { #584-clock }

<div align="center"><em>表 5.8.4-1：时钟核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 主 48 MHz 晶体为 AVL 清单内料号 | 必检 |
| 2 | 若 48 MHz 晶体不在 AVL 清单内，则需满足 7 pF ≤ CL ≤ 12 pF（推荐 8.8 pF）、频偏 ≤±10 ppm、ESR ≤30 Ω（推荐 22 Ω） | 必检 |
| 3 | RTC 32.768 kHz 晶体为 AVL 清单内料号 | 必检 |
| 4 | 若 32.768 kHz 晶体不在 AVL 清单内，则需满足 CL ≤12.5 pF（推荐 7 pF）、频偏 ≤±20 ppm、ESR ≤80 kΩ（推荐 38 kΩ） | 必检 |

</div>

### 5.8.5. 复位 { #585-reset }

<div align="center"><em>表 5.8.5-1：复位核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | RSTN 上拉到与 PVDD1 相同的电源 | 必检 |
| 2 | RSTN 预留 0.1 uF 对地电容 | 必检 |
| 3 | RSTN 具备 ESD 保护 | 必检 |

</div>

### 5.8.6. 地信号 { #586-ground-signals }

<div align="center"><em>表 5.8.6-1：地信号核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 所有 AVSS_*** 信号均连接至 GND | 必检 |
| 2 | 所有 VSS 信号均连接至 GND | 必检 |

</div>

### 5.8.7. 启动模式 { #587-boot-mode }

<div align="center"><em>表 5.8.7-1：启动模式核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | MODE 内部带下拉；预留一个 10 kΩ 上拉到 VDDIOA，并在程序下载时将 MODE 拉高 | 必检 |
| 2 | <span class="flag-red">MODE 信号预留测试点，并必须引出到量产编程治具</span> | 必检 |

</div>

### 5.8.8. 射频 { #588-rf }

<div align="center"><em>表 5.8.8-1：射频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | ANT 信号已标注单端 50 Ω 特性阻抗要求 | 必检 |
| 2 | ANT 信号预留 Pi 型匹配网络：一个并联 NC（不贴装）电容和一个 15 pF 串联电容 | 必检 |
| 3 | 若需考虑杂散发射滤波，则预留 Pi 型匹配网络，包含 2.7 nH 串联电感和 2 pF 并联电容 | 可选 |
| 4 | 若外部 RF PA 需要 MCU 控制 RXEN 与 TXEN，则 PA 的 RXEN 仅使用 PB39，PA 的 TXEN 仅使用 PB40 | 可选 |
| 5 | <span class="flag-red">若 Wi-Fi 芯片支持天线共存仲裁：<br> (1) 推荐使用 3 线模式：由 Wi-Fi 芯片控制蓝牙（Bluetooth）与 Wi-Fi 共用的天线 RF 开关并执行仲裁。Wi-Fi 芯片使用 BT_ACTIVE 和 BT_PRIORITY 判断是否授予蓝牙天线所有权，WLAN_ACTIVE 可在 Wi-Fi 工作期间屏蔽蓝牙收发。<br> (2) BT_ACTIVE 必须使用 PB08 或 PB45，WLAN_ACTIVE 必须使用 PB09 或 PB41，BT_PRIORITY 可使用任意 PB GPIO。<br></span> | 可选 |
| 6 | 若 Wi-Fi 芯片不支持天线共存仲裁：<br>(1) 推荐使用 1 线模式，由蓝牙控制蓝牙/Wi-Fi 天线 RF 开关，并通过 BT_ACTIVE 进行仲裁，同时通知 Wi-Fi 芯片。<br> (2) 若 Wi-Fi 可输出运行状态信号，则该方案可升级为 2 线模式：将 Wi-Fi 输出连接到 WLAN_ACTIVE，使蓝牙在 Wi-Fi 活动时屏蔽低优先级蓝牙收发，而在 Wi-Fi 空闲时不影响蓝牙。<br> (3) BT_ACTIVE 必须使用 PB08 或 PB45，WLAN_ACTIVE 必须使用 PB09 或 PB41 | 可选 |

</div>

### 5.8.9. I/O 资源分配 { #589-io-resource-allocation }

<div align="center"><em>表 5.8.9-1：I/O 资源分配核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 已提供与原理图一致的 GPIO 资源分配表 | 必检 |
| 2 | 资源表中的 GPIO 分配与原理图一致 | 必检 |
| 3 | 实际 GPIO 分配遵循思澈科技（SiFli）建议；参考 EVB I/O 配置文件 | 必检 |

</div>

### 5.8.10. 硬件唤醒 { #5810-hardware-wake-up }

<div align="center"><em>表 5.8.10-1：硬件唤醒核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | <span class="flag-red">HCPU 唤醒中断源使用正确：PA64、PA65、PA66、PA67、PA68、PA69，共 6 个引脚</span> | 必检 |
| 2 | <span class="flag-red">LCPU 唤醒中断源使用正确：PB54、PB55、PB56、PB57、PB58、PB59、PBR0、PBR1、PBR2、PBR3，共 10 个引脚。MCU 唤醒后，PBR0-PBR3 无法接收中断信号</span> | 必检 |
| 3 | <span class="flag-red">G-sensor、心率传感器等 LCPU 侧外设的中断与控制信号必须连接到 PB GPIO</span> | 必检 |

</div>

### 5.8.11. 存储 { #5811-storage }

<div align="center"><em>表 5.8.11-1：存储核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | MPI3 按预期连接到 NOR Flash 或 SPI NAND Flash | 必检 |
| 2 | VDDIOSC 始终上电 | 必检 |
| 3 | VDDIOSA 与 VDDIOSB 由 PBR0 使能 | 必检 |
| 4 | MPI3 或 MPI4 可用于外部 NOR Flash 或 SPI NAND Flash | 必检 |
| 5 | SPI NAND Flash 的 HOLD# 引脚通过 10 kΩ 电阻上拉到 SPI NAND Flash 供电 | 必检 |
| 6 | 若量产需要烧录 MPI3 或 MPI4 上的外部 Flash，则下载工具将 PA43 拉高以使能 MPI3 电源 | 必检 |
| 7 | 若量产需要烧录 SDIO1 上的 eMMC 或 SD NAND，则下载工具必须使能对应电源 | 必检 |
| 8 | <span class="flag-red">PBR0/PA43 控制的电压开关为高电平开、低电平关。在休眠（Hibernate）中，PBR0 控制 VDDIOSA/VDDIOSB 电源切换，VDDIOSC 始终上电，PA43 控制外部 Flash 电源切换</span> | 必检 |
| 9 | 若 SD1 接口连接到 eMMC 或 SD NAND，则信号连接正确 | 必检 |
| 10 | eMMC 或 SD NAND 的 I/O 接口电平与 VDDIOA2 匹配 | 必检 |
| 11 | MPI3 或 MPI4 信号连接正确 | 必检 |
| 12 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 必检 |
| 13 | <span class="flag-red">NOR Flash 已在关键器件选型指南中通过验证</span> | 必检 |
| 14 | <span class="flag-red">SPI/SD NAND Flash 已在关键器件选型指南中通过验证</span> | 必检 |
| 15 | <span class="flag-red">eMMC 已在关键器件选型指南中通过验证</span> | 必检 |

</div>

<div align="center"><em>表 5.8.11-2：思澈科技（SiFli）EVB SPI NAND 的 MPI4 参考连接</em></div>

<div align="center" markdown>

| SPI NAND 信号 | SF32LB58x 管脚 | 参考说明 |
|:---|:---|:---|
| CS# | PA10（SD1_CMD） | 片选，低电平有效 |
| SO | PA04（SD1_D1） | 输入到芯片的数据（IO1） |
| WP# | PA01（SD1_D2） | 写保护信号（IO2） |
| SI | PA05（SD1_D0） | 从芯片输出的数据（IO0） |
| SCLK | PA09（SD1_CLK） | 串行时钟 |
| HOLD# | PA06（SD1_D3） | IO3；通过 10 kΩ 电阻上拉到 VDD18_MPI4 |

</div>

EVB 参考原理图中，SPI NAND Flash 的 VCC 接 VDD18_MPI4；该电源上还接有 0.1 µF 和 1 µF（6.3 V）电容。上述管脚映射和元件值仅对应 EVB 参考电路。实际设计前，应根据所选芯片封装、Flash 数据手册及目标板的管脚复用配置进行核对。

SD1 接口的 I/O 电源域为 VDDIOA2，支持 1.8 V 和 3.3 V，应按外设的 I/O 电平设置。思澈科技（SiFli）建议 SPI NAND Flash 和 eMMC 使用 1.8 V 接口电平；SD NAND 颗粒仅支持 3.3 V，因此使用 SD NAND 时，VDDIOA2 必须接 3.3 V。

### 5.8.12. 显示 { #5812-display }

<div align="center"><em>表 5.8.12-1：显示核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | SF32LB58x 按预期通过 DSI + LCDC2 连接显示屏 | 必检 |
| 2 | DSI 信号连接正确 | 必检 |
| 3 | <span class="flag-red">若 LCD 仅使用 QSPI 接口，建议使用 HCPU 的 LCDC1 QSPI 接口，以避免帧率与 RAM 问题</span> | 必检 |
| 4 | DSI_REXT 通过 10 kΩ 电阻接地 | 必检 |
| 5 | LCDC RSTB 连接正确 | 必检 |
| 6 | LCDC TE 连接正确（连接到面板的 TE 或 Fmark 信号） | 必检 |
| 7 | TP 信号遵循推荐引脚分配（参考 EVB I/O 配置文件） | 必检 |
| 8 | LCD 接口支持 MIPI-DSI、3/4 线 SPI、双/四线数据 SPI、DBI 8080、DPI 以及并行/串行 JDI 接口 | 必检 |
| 9 | <span class="flag-red">SPI LCD：3 线模式下，CS 接 PA44 或 PB08，CLK 接 PA46 或 PB10，DATA 接 PA50 或 PB09；<br>4 线模式下，CS 接 PA44 或 PB08，CLK 接 PA46 或 PB10，DATA 接 PA50 或 PB09，DC 接 PA48 或 PB03</span> | 必检 |
| 10 | 确认 LCD 是否必须支持 AOD；若需要，则 QSPI 面板必须连接到 HCPU，而 JDI 面板可连接到 LCPU | 必检 |
| 11 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 必检 |
| 12 | 对于 DSI LCD，应连接 DSI 数据与时钟信号。DSI 视频模式面板类似 RGB 面板，没有 TE 信号；DSI 命令模式面板带 TE 信号，且 DSI17801 需要 TE。建议同时预留 TE 与 RST，最终使用方式取决于所选 LCD | 必检 |

</div>

### 5.8.13. GPADC { #5813-gpadc }

<div align="center"><em>表 5.8.13-1：GPADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | GPADC 输入连接到对应引脚 | 可选 |
| 2 | GPADC 输入范围正确；最大输入电压不得超过 AVDD33_ANA | 可选 |
| 3 | 电池电压分压建议：电源侧使用 470 kΩ 1% 电阻，对地使用 1 MΩ 1% 电阻，并增加 100 nF 滤波电容 | 必检 |
| 4 | <span class="flag-red">对每一路由 GPADC 测量的分压信号，分压电阻均使用 1% 精度；每个 GPADC 通道都必须在靠近芯片引脚处放置 100 nF 滤波电容</span> | 必检 |
| 5 | <span class="flag-red">ADC 可用于检测多个按键，以节省引脚；例如当 PB32 被用作 ADC 按键时，不要使用电池作为其上拉电源</span> | 必检 |

</div>

### 5.8.14. SDMADC { #5814-sdmadc }

<div align="center"><em>表 5.8.14-1：SDMADC 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | SDMADC 输入连接到对应引脚 | 可选 |
| 2 | SDMADC 输入范围正确；建议最大输入电压不超过 AVDD33_ANA | 可选 |
| 3 | SDMADC_VREF 与 SDMADC_VSS_VREF 连接正确 | 必检 |

</div>

### 5.8.15. 按键 { #5815-buttons }

<div align="center"><em>表 5.8.15-1：按键核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 与客户确认按键是否需要唤醒能力 | 必检 |
| 2 | 普通按键连接正确（已上拉、阻值正确、上拉电压域正确） | 必检 |
| 3 | <span class="flag-red">电源键必须使用 PB54，高电平有效，长按 10 秒复位，10 kΩ 下拉电阻必须放在主板上</span> | 必检 |
| 4 | 所有按键信号都具备 ESD 保护 | 必检 |

</div>

### 5.8.16. EOS 与 ESD 保护 { #5816-eos-and-esd-protection }

<div align="center"><em>表 5.8.16-1：EOS 与 ESD 保护核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 充电接口具备 EOS、ESD 与 OVP 设计 | 必检 |
| 2 | 充电器插入检测信号具备 ESD 器件 | 必检 |
| 3 | 电池接口具备 ESD 器件 | 必检 |
| 4 | 天线接口具备 ESD 器件 | 必检 |
| 5 | LCD 与 TP 电源接口具备 ESD 器件 | 必检 |
| 6 | TP I2C、RST 与 INT 线路具备 ESD 器件 | 必检 |
| 7 | 心率传感器电源接口与信号线具备 ESD 器件 | 必检 |

</div>

### 5.8.17. I2C { #5817-i2c }

<div align="center"><em>表 5.8.17-1：I2C 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | I2C 分配已考虑 HCPU/LCPU 分区，以及器件是否必须在低功耗模式下运行 | 必检 |
| 2 | I2C 已上拉且阻值正确；若需要 400 kHz 工作，推荐使用 2.2 kΩ 上拉。应使用外设侧电压域，并在外设掉电时同步关闭上拉电源 | 必检 |
| 3 | I2C 中断信号在需要时支持硬件唤醒 | 必检 |
| 4 | 若多个器件共用一条 I2C 总线，其地址已区分 | 必检 |

</div>

### 5.8.18. I2S { #5818-i2s }

<div align="center"><em>表 5.8.18-1：I2S 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | <span class="flag-red">I2S1 仅支持输入，且仅工作在主模式；麦克风按预期连接到 I2S1</span> | 可选 |
| 2 | <span class="flag-red">I2S2 仅支持主模式下输入与输出，可连接外部 codec DAC/ADC 器件</span> | 可选 |
| 3 | <span class="flag-red">I2S3 仅支持主模式下输入与输出；适用于 HCPU 睡眠、LCPU 通过 I2S3 接收/处理音频的低功耗场景</span> | 可选 |
| 4 | I2S 信号连接正确 | 可选 |
| 5 | <span class="flag-red">I2S1 接口数字麦克风连接正确</span> | 可选 |
| 6 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 可选 |

</div>

### 5.8.19. PDM 与模拟音频 { #5819-pdm-and-analog-audio }

<div align="center"><em>表 5.8.19-1：PDM 与模拟音频核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PDM 双麦连接正确 | 可选 |
| 2 | PDM 麦克风由数字电源供电 | 可选 |
| 3 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 可选 |
| 4 | 模拟双麦连接正确 | 可选 |
| 5 | 模拟麦克风由 MIC_BIAS 输出供电 | 可选 |
| 6 | 两路音频 ADC 输入都必须各自带至少 2.2 uF 隔直电容 | 可选 |
| 7 | DAC 输出 P 路与 N 路各有一个 1 kΩ 串联电阻，并在两者之间并联一个 1.5 nF 电容 | 可选 |
| 8 | 推荐使用 AW8155 作为音频功放；使用推荐器件时，在软件中配置为 Mode 4 / Class AB 模式 | 可选 |
| 9 | <span class="flag-red">将音频 PA 输出反馈到 MCU ADC 时，需增加分压与 RC 滤波，或增加数字滤波；分压后的电压必须保持在 ADC 输入范围内，RC 滤波截止频率应为 20 kHz</span> | 可选 |
| 10 | <span class="flag-red">若不使用芯片集成的模拟音频 ADC 通路，建议 ADC1P/ADC1N 与 ADC2P/ADC2N 各通过一个 0 Ω 串联电阻接地</span> | 可选 |

</div>

### 5.8.20. SPI { #5820-spi }

<div align="center"><em>表 5.8.20-1：SPI 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | SPI 连接正确；MCU 与外设之间的 SDO 和 SDI 已正确交叉连接 | 可选 |
| 2 | SPI 外设时序要求已确认且受支持 | 可选 |
| 3 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 可选 |

</div>

### 5.8.21. USART { #5821-usart }

<div align="center"><em>表 5.8.21-1：USART 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | USART4 设计为下载与日志接口 | 必检 |
| 2 | <span class="flag-red">USART4 已预留测试点；建议在 TXD 与 RXD 上串联 100 Ω 电阻</span> | 必检 |
| 3 | <span class="flag-red">USART1 已预留测试点</span> | 必检 |
| 4 | 必须运行在 HCPU 上的器件连接到 USART2 或 USART3 | 可选 |
| 5 | 必须运行在 LCPU 上的器件连接到 USART5 或 USART6 | 可选 |
| 6 | 连接外设时，RXD 与 TXD 已正确交叉连接 | 必检 |
| 7 | 外设器件的 I/O 逻辑电平与主芯片匹配 | 必检 |
| 8 | 未使用的 USART 测试点已预留，作为备用 | 可选 |
| 9 | <span class="flag-red">建议连接外设的 UART 使用 HCPU 接口，以避免 HCPU 软件占用 LCPU UART 接口</span> | 必检 |

</div>

### 5.8.22. PWM { #5822-pwm }

<div align="center"><em>表 5.8.22-1：PWM 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 背光 PWM 引脚分配正确；使用与马达 PWM 不同的 GPTIMx，优先放在 PB 接口上，以避免 HCPU 降频影响背光 | 必检 |
| 2 | 马达 PWM 引脚分配正确；使用与背光 PWM 不同的 GPTIMx，优先放在 PB 接口上，以避免 HCPU 降频影响振动 | 必检 |
| 3 | 对于马达 PWM 控制，应选择默认关闭的 GPIO，以避免使用 SMT 马达时在固件编程阶段出现异常 | 必检 |
| 4 | 需要 PWM 输出的信号必须使用 PB 接口，同时检查冷启动异常行为 | 必检 |

</div>

### 5.8.23. 调试 { #5823-debug }

<div align="center"><em>表 5.8.23-1：调试核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | SWD 信号连接正确 | 必检 |
| 2 | J-Link 接口或测试点已正确预留 I/O 供电参考 | 必检 |
| 3 | <span class="flag-yellow">程序下载期间，PVDD、VDDIO、VDDSC 等电源轨必须上电，AVDD18_DSI（CAU2 电源）也必须上电</span> | 必检 |

</div>

### 5.8.24. USB { #5824-usb }

<div align="center"><em>表 5.8.24-1：USB 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | USB 接口连接正确 | 可选 |
| 2 | USB 接口具备 ESD 保护 | 可选 |
| 3 | 正常非睡眠工作时，只要 USB 保持使能，PC/设备端即可感知插拔；<br>若 MCU 进入睡眠且仍需感知插拔，则需增加 VBUS 分压电路，使分压输出与 IO 电压匹配的高电平并送入 MCU 唤醒引脚，推荐与充电器插入检测唤醒引脚共用 | 可选 |

</div>

### 5.8.25. PBR { #5825-pbr }

<div align="center"><em>表 5.8.25-1：PBR 核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | PBR0 在上电过程中会从 0 变为 1，可用于部分外部负载开关控制；PBR1-PBR5 默认输出低电平 | 必检 |
| 2 | PBR0-PBR5 可在待机（Standby）和休眠（Hibernate）中作为输出使用 | 可选 |
| 3 | PBR0-PBR5 可输出 LPTIM 信号 | 可选 |
| 4 | <span class="flag-red">对于 SF32LB567，推荐使用 LPTIM3：LPTIM3_OUT 与 LPTIM3_OUT_BAR 可从 PBR 引脚输出 21-25 kHz、占空比不同且极性相反的信号</span> | 可选 |
| 5 | <span class="flag-red">这些 21-25 kHz、极性相反且占空比不同的信号，也可由 HCPU 的 ATIM 输出；需结合 Pin_Config 选择合适的 ATIMx_CHx 与 ATIMx_CHxN 信号，并考虑 HCPU 降频的影响</span> | 可选 |
| 6 | PBR0-PBR5 可输出 32 kHz 时钟信号 | 可选 |
| 7 | <span class="flag-red">PBR0-PBR3 可配置为唤醒输入，但 MCU 唤醒后 PBR0-PBRx 不能接收中断信号，只能检测 0/1 电平，使用时需谨慎</span> | 可选 |

</div>

!!! note "来源适用范围与技术核实"
    [原始核对表工作簿](https://downloads.sifli.com/hardware/files/documentation/SF32LB58x%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx)中，PBR 核对表第 4 项明确提到 SF32LB567，但工作簿并未说明 PBR 核对表第 4、5 项也适用于 SF32LB58x；采用前请向思澈科技（SiFli）确认。

    工作簿“存储”核对表第 6 项写明，量产烧录时将 PA43 拉高以使能“MPI3 电源”。但[思澈科技（SiFli）官方 SF32LB58x 硬件应用说明](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/hardware/SF32LB58x-HW-Application.md)将 PA43 描述为外部 Flash 电源控制脚，并要求拉高 PA43 以接通外部 Flash 电源。清单条目仍保留工作簿中的原文。量产下载方案定版前，请向思澈科技（SiFli）确认该引脚实际控制的电源轨及接口适用范围。

### 5.8.26. 功耗 { #5826-power-consumption }

<div align="center"><em>表 5.8.26-1：功耗核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | 对所有用于电源开关控制的 MOSFET、LDO 和 DCDC 使能引脚，当使能为高电平有效时，预留一个 1 MΩ 对地下拉 | 必检 |
| 2 | 已记录休眠（Hibernate）模式的底电流要求 | 必检 |
| 3 | <span class="flag-red">已记录休眠（Hibernate）模式下所选外设的底电流总和，且满足项目要求</span> | 必检 |
| 4 | 已记录待机（Standby）模式的底电流要求 | 必检 |
| 5 | <span class="flag-red">已记录待机（Standby）模式下所选外设的底电流总和，且满足项目要求</span> | 必检 |

</div>

### 5.8.27. 下载与晶体校准 { #5827-download-and-crystal-calibration }

<div align="center"><em>表 5.8.27-1：下载与晶体校准核对表</em></div>

<div align="center" markdown>

| 序号 | 检查项 | 类别 |
|:---|:---|:---|
| 1 | SWD 下载测试点预留 VBAT、GND、SWDIO、SDCLK、MODE、RSTN、VDDIOA、VDDIOB 测试点 | 必检 |
| 2 | 若需要使用离线下载板烧录固件，则预留 VBAT、GND、UART4_TXD、UART4_RXD、MODE、RSTN 与 VDDIOA 测试点 | 可选 |
| 3 | 若需要晶体校准，则预留晶体校准测试点；推荐使用 PB45 | 可选 |

</div>
