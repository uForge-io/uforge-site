---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB52x MCU 的存储、外设连接与量产原理图设计指导：启动存储、传感器、调试/下载接口及产线烧录。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x 硬件设计指南 — 存储与量产 { #sf32lb52x-hardware-design-guide-storage-manufacturing }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页介绍原理图设计指导的第 5.6-5.7 节：存储与连接、量产。返回[RF 与用户接口](SF32LB52x_schematic_rf_interfaces.md)，或参见[原理图核对表](SF32LB52x_schematic_checklist.md)进行逐项核对。

### 5.6. 存储与连接 { #56-storage-and-connectivity }

#### 5.6.1. 存储 { #561-storage }

**快速摘要**

- 外部启动介质包括 SPI NOR、SPI NAND 和 SD NAND；支持的外部稳压供电型号还可使用 eMMC。
- Bootstrap 管脚 `PA13` 和 `PA17` 选择启动介质。
- 应用说明和原理图设计指南均指定由 `PA21` 控制启动存储电源开关；官方检查表则将电池供电型号的外部 Flash 电源开关指定为 `PA11`。具体设计应使用哪个管脚，需向思澈科技（SiFli）确认。另需注意：经 MPI 接入、容量为 32 MB 或更大的 NOR Flash，必须由 `PA21` 控制断电重上电，以便 ROM 在复位或进入休眠（Hibernate）后重新识别 Flash；使用合封存储的型号在休眠期间必须关闭 `VDD_SIP`，以避免存储器 I/O 漏电。

**设计目标**

选择合适的启动介质和存储供电方案，满足固件容量、升级策略及低功耗需求，并确保芯片在复位或从休眠唤醒后能够由 ROM 可靠启动。

##### 5.6.1.1. 存储接口说明 { #5611-storage-interface-description }

芯片支持外部 SPI NOR Flash、SPI NAND Flash 和 SD NAND Flash。**eMMC 仅在 52B/D/E/G/J（外部稳压供电）型号上支持。**

<div align="center"><em>表 5.6-1：SPI NOR/NAND Flash 信号连接</em></div>

<div align="center" markdown>

| Flash 信号 | I/O 管脚 | 说明 |
|:---|:---|:---|
| CS# | PA12 | 片选，低有效 |
| SO | PA13 | 数据 IO1 |
| WP# | PA14 | 数据 IO2 / 写保护 |
| SI | PA15 | 数据 IO0 |
| SCLK | PA16 | 串行时钟 |
| Hold# | PA17 | 数据 IO3 / 保持 |

</div>

<div align="center"><em>表 5.6-2：SD NAND Flash 和 eMMC 信号连接</em></div>

<div align="center" markdown>

| SD NAND/eMMC 信号 | I/O 管脚 | 说明 |
|:---|:---|:---|
| SD2_CMD | PA15 | 命令 |
| SD2_D1 | PA17 | 数据 1 |
| SD2_D0 | PA16 | 数据 0 |
| SD2_CLK | PA14 | 时钟 |
| SD2_D2 | PA12 | 数据 2 |
| SD2_D3 | PA13 | 数据 3 |

</div>

!!! note "eMMC 电源域（仅外部稳压供电型号）"
    eMMC 有 VCC 和 VCCQ 两个电源域。方案 1：两个电源域一起开关，关断电流更低，但 eMMC 从低功耗睡眠状态恢复更慢，CPU 平均功耗更高。方案 2：只开关 VCC，VCCQ 保持常供；关断电流高于方案 1，但 eMMC 恢复更快，CPU 平均功耗更低。

!!! important "存储接口的上拉电阻"
    外部稳压供电型号的应用说明规定：NOR Flash 无需外部上拉；SPI NAND 的 PA17（Hold#）需要上拉；SD NAND 的 PA13（D3）和 PA15（CMD）需要上拉；eMMC 的 PA17（D1）、PA13（D3）和 PA15（CMD）需要上拉。推荐阻值为 7.5 kΩ。电池供电型号的应用说明只提到 PA13/PA17 启动配置电阻焊盘，未说明是否也需要 PA15/CMD 上拉。未经确认，不要把外部稳压供电型号的 PA15 要求套用到电池型号；应向思澈科技（SiFli）核实具体型号和启动介质所需的上拉配置。

##### 5.6.1.2. 启动配置 { #5612-boot-configuration }

=== "SF32LB520/3/5/7（电池供电）"

    芯片支持从内部合封 SPI NOR Flash、外部 SPI NOR Flash、外部 SPI NAND Flash 或外部 SD NAND Flash 启动（**不支持 eMMC 启动**）：

    - SF32LB520Ux6 合封 Flash，默认从合封 Flash 启动
    - SF32LB523/5/7Ux6 合封 PSRAM，必须从外部存储启动

    ![图 5.6-1：Bootstrap 管脚推荐电路（电池供电型号）](../../sf32-products/chips/assets/52xA/SF32LB52x-A-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 5.6-1：Bootstrap 管脚推荐电路（电池供电型号）</em></div>

    <div align="center"><em>表 5.6-3：启动选项设置（电池供电型号）</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | 启动介质 |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |

    </div>

=== "52B/D/E/G/J（外部稳压供电）"

    芯片支持从内部合封 SPI NOR Flash、外部 SPI NOR Flash、外部 SPI NAND Flash、外部 SD NAND Flash 或外部 **eMMC** 启动：

    - 合封 Flash 型号（SF32LB52BU36）默认从合封 Flash 启动
    - 合封 PSRAM 型号（SF32LB52DUB6/EUB6/GUC6/JUD6）必须从外部存储启动

    ![图 5.6-2：Bootstrap 管脚推荐电路（外部稳压供电型号）](../../sf32-products/chips/assets/52xB/sf32lb52X-B-Bootstrap.png){ width="100%" loading="lazy" }

    <div align="center"><em>图 5.6-2：Bootstrap 管脚推荐电路（外部稳压供电型号）</em></div>

    <div align="center"><em>表 5.6-4：启动选项设置（外部稳压供电型号）</em></div>

    <div align="center" markdown>

    | Bootstrap[1] (PA13) | Bootstrap[0] (PA17) | 启动介质 |
    |:---|:---|:---|
    | L | L | SPI NOR Flash |
    | L | H | SPI NAND Flash |
    | H | X | SD NAND Flash |
    | H | H | eMMC |

    </div>

    !!! note "思澈科技（SiFli）原始文档中的命名说明"
        思澈科技（SiFli）原始文档在本节使用了“SF32LB52AUx6”和“SF32LB52D/F/HUx6”等型号，与文档开头的 B/D/E/G/J 命名不一致。本指南按实际合封存储类型（Flash 或 PSRAM）区分；如有疑问，应核对具体芯片型号及其数据手册。

!!! important "确认启动选项表中重叠的配置"
    电池供电应用说明和外部稳压供电应用说明将 SD NAND 的配置列为 H/X，而原理图设计指南列为 H/L；外部稳压供电应用说明还将 eMMC 列为 H/H。X 通常表示高、低电平均可，因此外部稳压供电表中的 SD NAND 与 eMMC 配置重叠。源资料没有说明这些差异及选择规则；不能自行判定最终启动电平，定稿前应向思澈科技（SiFli）确认具体型号与 ROM 行为。参考电路使用 7.5 kΩ 上拉电阻：图 5.6-1 接至 3.3 V VDD33_VOUT1，图 5.6-2 接至 3.3 V VDDIOA。

##### 5.6.1.3. 启动存储电源控制 { #5613-boot-storage-power-control }

优先级更高的 OpenSiFli 应用说明和原理图设计指南均指定 `PA21` 控制启动存储电源开关（高电平开启、低电平关闭），因此本文以 `PA21` 作为有源资料支持的设计依据。思澈科技（SiFli）Wiki 链接的检查表工作簿则将电池供电型号的外部 Flash 电源开关指定为 `PA11`。不要仅依据该工作簿改用 `PA11`。工作簿未说明 `PA11` 是另一个板级使能信号还是管脚定义冲突；发布前应向思澈科技（SiFli）确认具体型号和网络。

=== "SF32LB520/3/5/7（电池供电）"

    - SF32LB520Ux6 合封 Flash：VDD18_VOUT 由 VDD33_VOUT1 供电，并关闭内部 VDD18_VOUT LDO
    - SF32LB523/5/7Ux6 合封 PSRAM：使用内部 LDO；VDD18_VOUT 可由外部供电
    - 外部 NOR Flash 从 VDD33_VOUT1 供电，无需额外电源开关
    - 外部 SPI NAND 或 SD NAND 从 VDD33_VOUT1 供电，并增加电源开关
    - 参考设计在 PA13 和 PA17 预留上拉电阻焊盘，应按存储类型选择是否贴装，推荐 7.5 kΩ

=== "52B/D/E/G/J（外部稳压供电）"

    - 合封 Flash 型号（SF32LB52BU36）：在 VDD_SIP 上增加电源开关
    - 合封 PSRAM 型号（SF32LB52DUB6/EUB6/GUC6/JUD6）：若 PVDD = 3.3 V 且 VDD_SIP 使用内部 LDO，VDD_SIP 电源开关可选；若 PVDD = 1.8 V，则必须增加 VDD_SIP 电源开关
    - 外部存储电源独立于 VDD_SIP，应增加独立电源开关
    - eMMC VCC/VCCQ 电源域取舍见第 5.6.1.1 节
    - 对于 52B/D/E/G/J，应用说明要求所有启动相关存储电源开关使用 PA21；但电池供电型号的外部 Flash 电源控制存在 PA11/PA21 源资料差异，需先向思澈科技（SiFli）确认
    - 对于经 MPI（Memory Peripheral Interface，用于连接 SPI-NOR/SPI-NAND）连接且容量为 32 MB 或更大的 NOR Flash，必须能够通过 PA21 断电，使其在 MCU 重启或进入休眠时退出 4 字节地址模式（4-byte mode）；否则 ROM 将无法识别该 Flash。容量为 16 MB 或更小的 NOR Flash 可以保持常供电
    - 参考设计在 PA13 和 PA17 预留上拉电阻焊盘，应按存储类型选择是否贴装，推荐 7.5 kΩ

**常见错误 - 存储**

- 缺少 Bootstrap 电阻，或按错误启动介质贴装。
- 未按具体型号和经思澈科技（SiFli）确认的定义连接启动存储电源开关（PA11/PA21 源资料差异尚未解决）。
- 将 eMMC 误认为所有型号都可用。
- 大容量 NOR Flash 常供电，导致重启后 4 字节地址模式影响 ROM 识别。

**存储检查表**

- [ ] 启动介质已在 PCB 布局前选择并记录
- [ ] `PA13`/`PA17` Bootstrap 上拉选项匹配启动表
- [ ] 已确认 PA11/PA21 的型号适用范围，并按确认后的定义连接所有所需启动存储电源开关
- [ ] 外部稳压供电设计已评审 eMMC VCC/VCCQ 取舍
- [ ] 启动调试计划覆盖启动配置管脚的电平、存储电源时序、ID 读取和固件下载

#### 5.6.2. 传感器 { #562-sensors }

**快速摘要**

- 传感器通常通过 I2C 或 SPI 连接。应关闭未使用传感器的电源以降低待机电流；用于唤醒的传感器则应保持在所需工作模式。
- 具备唤醒能力的传感器中断必须在管脚分配冻结前确定。

**设计目标**

保证传感器电源、中断和总线走线可靠，同时确保未使用传感器可在低功耗模式下彻底关闭。

SF32LB52x 可连接心率、加速度、地磁等传感器。传感器电源开关应选择低 Iq 负载开关。

**传感器检查表**

- [ ] 已分配传感器总线、中断、复位和电源使能管脚
- [ ] 传感器负载开关的静态电流（Iq）和关断电流满足待机目标
- [ ] 上拉电阻连接到正确的传感器 I/O 电源轨
- [ ] 启动调试计划覆盖总线扫描、中断唤醒和传感器断电重上电测试

#### 5.6.3. UART 和 I2C 管脚分配 { #563-uart-and-i2c-pin-assignment }

**快速摘要**

- UART 和 I2C 功能可以映射到任意 PA 管脚。
- 管脚选择仍需考虑启动、唤醒、调试、量产测试和板级走线约束。

**设计目标**

利用灵活的管脚映射简化走线，同时保留启动配置、唤醒、调试接口和量产治具所需的管脚。

SF32LB52x 支持 UART 和 I2C 功能映射到任意 PA 管脚。

**UART/I2C 检查表**

- [ ] 每条 I2C 总线的上拉、电压域和总线电容正确
- [ ] 日志、下载或外部模组所需 UART 管脚可访问
- [ ] 管脚复用未与 Bootstrap、唤醒、显示、存储或调试功能冲突

#### 5.6.4. GPTIM 管脚分配 { #564-gptim-pin-assignment }

**快速摘要**

- GPTIM 功能可以映射到任意 PA 管脚。
- 定时器功能可用于 PWM 输出、输入捕获、马达控制、背光控制及产品所需的其他时序控制。

**设计目标**

尽早预留定时器功能，避免 PWM、捕获和时序功能在设计后期被迫使用走线不佳或与唤醒需求冲突的管脚。

SF32LB52x 支持 GPTIM 功能映射到任意 PA 管脚。

**GPTIM 检查表**

- [ ] 管脚分配表中已列出 PWM、捕获或控制回路所需的定时器通道
- [ ] GPTIM 管脚未与背光、马达、调试或存储需求冲突
- [ ] 启动调试计划包含 PWM 频率、占空比范围和管脚极性检查

### 5.7. 量产 { #57-manufacturing }

#### 5.7.1. 调试与下载接口 { #571-debug-and-download-interface }

**快速摘要**

- `PA18` 和 `PA19` 上电后默认为 DBG_UART，并与 SWD 复用。
- 每块原型板和量产板都应预留可接入的调试/下载测试点或连接器。

**设计目标**

产品外壳和量产治具设计确定后，仍须能够连接调试接口，完成固件下载、日志读取、单步调试和故障恢复。

SF32LB52x 支持通过 DBG_UART 下载固件和调试，可使用 3.3 V USB 转 UART 转接板连接电脑。SWD 和 DBG_UART 复用 PA18 和 PA19；上电后默认为 DBG_UART 功能，支持单步调试和日志输出。

DBG_UART 单步调试和日志输出的具体用法，参见 SFtool 和 Impeller 的使用手册。

<div align="center"><em>表 5.7-1：调试口连接</em></div>

<div align="center" markdown>

| 调试信号 | 管脚 | 说明 |
|:---|:---|:---|
| DBG_UART_RXD | PA18 | 调试 UART 接收 |
| DBG_UART_TXD | PA19 | 调试 UART 发送 |

</div>

**调试检查表**

- [ ] `PA18`/`PA19`、GND 和所需电源参考已引出到测试点或连接器
- [ ] 装入外壳、电池和显示组件后仍可访问调试接口
- [ ] UART 电平为 3.3 V，并兼容所选转接板或治具
- [ ] 已记录应用固件无法启动时的恢复路径

#### 5.7.2. 产线烧录与晶体校准 { #572-production-flashing-and-crystal-calibration }

**快速摘要**

- 产线烧录和晶体校准需要稳定的电源，以及 DBG_UART、PA01 和相关电源/地测试点。
- PCB 外形和外壳设计定稿前，应确定量产治具如何接触这些测试点。

**设计目标**

确保每块量产板无需手工飞线或拆机，即可完成烧录、校准和恢复。

思澈科技（SiFli）提供脱机下载器，用于产线固件烧录和晶体校准。硬件设计至少应预留以下测试点：PVDD/VBAT、GND、AVDD33、DBG_UART_RXD、DBG_UART_TXD 和 PA01。详细流程见开发资料包中的《脱机下载器使用指南》（Offline Downloader User Guide）。

**量产检查表**

- [ ] 已预留 PVDD/VBAT、GND、AVDD33、DBG_UART_RXD、DBG_UART_TXD 和 PA01 测试点
- [ ] 机械装配后，测试点仍可被目标治具触达
- [ ] 已与量产团队确定晶体校准流程及合格判定限值
- [ ] 烧录、校准和功能测试记录可追溯到板卡版本

#### 5.7.3. 原理图和 PCB 图纸检查表 { #573-schematic-and-pcb-drawing-checklists }

正式放行应以思澈科技（SiFli）在 Wiki 发布的[原理图与 PCB 官方检查表][SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]为依据；完整逐项内容见[原理图核对表](SF32LB52x_schematic_checklist.md)。本指南中的检查项用于正式评审前排查常见工程问题。

[SiFli SF32LB52 Schematic & PCB Checklist (XLSX)]: https://downloads.sifli.com/hardware/files/documentation/SF32LB52%20Schematic%26PCB%20checklist_V1.0_20260121.xlsx

**发布检查表**

- [ ] 原理图检查表、PCB 检查表、AVL 检查、DRC 报告和阻抗报告已完成
- [ ] 电源、时钟、RF、显示、存储、音频、USB、SDIO、DC/DC 和量产测试访问的证据截图已归档
- [ ] 型号相关假设已记录在评审备注中
- [ ] 未解决的硬件风险均已指定负责人
