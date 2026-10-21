---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB57x MCU 的原理图设计指导：时钟生成、RF 与用户接口，覆盖 48 MHz/32.768 kHz 晶体、RF 匹配与天线路径、显示、触摸/背光、音频、摄像头、按键与马达。"
tags:
    - 硬件
    - 芯片
---

# SF32LB57x 硬件设计指南 — 时钟、RF 与用户接口 { #sf32lb57x-hardware-design-guide-clock-rf-user-interfaces }

!!! note "SF32LB57x 硬件设计指南的一部分"
    本页覆盖原理图设计指导的第 5.3-5.5 节：时钟生成、RF 与用户接口。返回[最小系统与电源](SF32LB57x_schematic_system_power.md)，或继续阅读[存储与制造](SF32LB57x_schematic_storage_mfg.md)。

### 5.3. 时钟生成 { #53-clock-generation }

时钟生成涵盖 48 MHz 主晶体、32.768 kHz RTC 晶体，以及影响 RF、蓝牙（Bluetooth）、RTC 精度和低功耗表现的校准条件。原理图评审和 PCB 布局阶段都应同步检查晶体选型与布局约束。

#### 5.3.1. 48 MHz 主晶体 { #531-48-mhz-main-crystal }

建议参数：

<div align="center"><em>表 5.3-1：48 MHz 主晶体推荐参数</em></div>

<div align="center" markdown>

| 参数 | 建议 |
|:-----|:-----|
| 负载电容 CL | 7 pF 到 12 pF，推荐约 8.8 pF |
| 频率容差 | <= ±10 ppm |
| ESR | <= 30 Ω，推荐约 22 Ω |

</div>

来源指南指出，`CL` 和 ESR 越小，晶体功耗越低。48 MHz 晶体旁应预留并联匹配电容焊位；来源指南说明，`CL` 小于 12 pF 时无需焊接该电容。

布局布线要求：

- 晶体靠近芯片管脚，建议放在屏蔽罩区域内。
- 远离 PA、充电、PMU、DC/DC、电池和高速数字信号。
- 走线建议布在表层，线宽为 0.1 mm、长度为 3 mm 到 10 mm。按来源布局图，`48M_XI` 与 `48M_XO` 走线之间至少保持 0.15 mm 间距。
- TOP 层晶体禁布区按参考设计执行，晶体下方不要走信号线。来源指南对相邻层地铜的要求存在冲突，见下方说明。
- 对振荡走线做立体包地，但避免地铜过于靠近振荡走线。

48 MHz 晶体的负载电容范围为 7 pF 到 12 pF，推荐值约为 8.8 pF。应在产品硬件上验证所选晶体与振荡电路的匹配，并确认频率误差；量产启动调试流程应包含晶体频率校准，不要假定默认软件设置适用于所有晶体。

#### 5.3.2. 32.768 kHz RTC 晶体 { #532-32768-khz-rtc-crystal }

建议参数：

<div align="center"><em>表 5.3-2：32.768 kHz RTC 晶体推荐参数</em></div>

<div align="center" markdown>

| 参数 | 建议 |
|:-----|:-----|
| 负载电容 CL | 7 pF 或 11.5 pF（芯片默认 11.5 pF，7 pF 需修改寄存器配置）；如需最低功耗，推荐使用 7 pF |
| 频率容差 | <= ±20 ppm |
| ESR | <= 80 kΩ，推荐约 38 kΩ |

</div>

来源指南指出，降低 `CL` 和 ESR 有助于降低晶体功耗。32.768 kHz 晶体可选 7 pF 或 11.5 pF 负载电容；来源指南说明，这两种规格均无需外接匹配电容。若选用其他负载电容规格，则需实测电路并确定所需的匹配电容。

布局布线要求：

- 晶体靠近芯片，走线尽量短。
- 走线线宽为 0.1 mm、长度不超过 10 mm。按来源布局图，`32K_XI` 与 `32K_XO` 走线之间至少保持 0.15 mm 间距，并进行立体包地。
- TOP 层晶体禁布区按参考设计执行，晶体下方不要走信号线。来源指南对相邻层地铜的要求存在冲突，见下方说明。
- 晶体区域应远离电源、RF、USB、SDIO、显示时钟和充电噪声。

<div align="center"><em>表 5.3-3：推荐晶体型号</em></div>

<div align="center" markdown>

| 晶体 | 型号 | 厂商 | 关键参数 |
|:-----|:-----|:-----|:---------|
| 48 MHz | E1SB48E001G00E | Hosonic | F0 = 48.000000 MHz，ΔF/F0 = -6 到 +8 ppm，CL = 8.8 pF，ESR <= 22 Ω，TOPR -30 到 85 °C，2016 封装。 |
| 32.768 kHz | ETST00327000LE | Hosonic | F0 = 32.768 kHz，ΔF/F0 = -20 到 +20 ppm，CL = 7 pF，ESR <= 70 kΩ，TOPR -40 到 85 °C，3215 封装。 |
| 48 MHz | SX20Y048000B31T-8.8 | TKD | F0 = 48.000000 MHz，ΔF/F0 = -10 到 +10 ppm，CL = 8.8 pF，ESR <= 40 Ω，TOPR -20 到 75 °C，2016 封装；ESR 偏高会略增静态功耗。 |
| 32.768 kHz | SF32K32768D71T01 | TKD | F0 = 32.768 kHz，ΔF/F0 = -20 到 +20 ppm，CL = 7 pF，ESR <= 70 kΩ，TOPR -40 到 85 °C，3215 封装。 |
| 32.768 kHz | SF32WK32768D71T005 | TKD | F0 = 32.768 kHz，ΔF/F0 = -20 到 +20 ppm，CL = 7 pF，ESR <= 70 kΩ，TOPR -40 到 85 °C，3215 封装。 |
| 48 MHz | CN4048M000885C822000 | JWT | F0 = 48.000000 MHz，ΔF/F0 = -8 到 +8 ppm，CL = 8.8 pF，ESR <= 22 Ω，TOPR -30 到 85 °C，2016 封装。 |
| 32.768 kHz | DH2032K76807T2719002 | JWT | F0 = 32.768 kHz，ΔF/F0 = -20 到 +20 ppm，CL = 7 pF，ESR <= 70 kΩ，TOPR -40 到 85 °C，3215 封装。 |

</div>

32.768 kHz 晶体的 `CL` 需要与寄存器配置匹配：7 pF 时 `PMUC->LXT_CR->CAP_SEL = 0`，11.5 pF 时 `PMUC->LXT_CR->CAP_SEL = 1`。推荐晶体列表以 7 pF 为主，若固件默认配置采用其他负载电容选项，请在 EVT 前于固件中确认该设置。

!!! warning "来源指南中的晶体铜箔要求存在冲突"
    来源指南对晶体下方的铜箔处理给出了不一致的要求：时钟章节的注释要求至少挖掉第二层地铜；时钟走线章节要求相邻层设置禁布区；晶体剖面图又显示走线下方的 L2 有地铜；叠层章节则要求 L2 保持完整地平面。不要自行从这些说法中推定唯一规则。PCB 发布前，应依据最新批准的 SF32LB57x 参考设计确认布局要求。

#### 5.3.3. 低功耗时钟输出 { #533-low-power-clock-outputs }

在睡眠（Sleep）、深度睡眠（DeepSleep）、待机（Standby）和休眠（Hibernate）模式下，`PA24` 到 `PA27` 可输出 RC10K 时钟或 32.768 kHz 时钟。

在睡眠（Sleep）、深度睡眠（DeepSleep）和待机（Standby）模式下，`PA24` 到 `PA27` 还可输出由 LPTIM2 生成的 PWM 时钟，最高频率为 16 kHz。

### 5.4. RF { #54-rf }

#### 5.4.1. RF 原理图 { #541-rf-schematic }

RF 设计关键要求：

- 天线链路预留 π 型匹配网络焊盘，用于杂散滤波和天线调试。
- 原理图参考电路显示：并联位预留 NC 电容焊盘，串联位为 15 pF / 50 V 电容。来源指南同时说明，若天线已完成阻抗匹配，则无需额外增加匹配器件。应结合天线设计和 RF 实测结果确定哪些焊盘需要装件，不要将图示装配方案视为所有设计的固定要求。
- 匹配网络靠近芯片 RF 管脚端放置，而不是靠近天线端。
- `AVDD_BRF` 滤波电容靠近芯片放置，接地端通过就近过孔直接连到主地。
- 天线、匹配网络、RF ESD 和连接器应整体规划。

![图 5.4-1：RF 原理图参考](../../sf32-products/chips/assets/57x/SF32LB57x-rf-diagram.png){ width="80%" loading="lazy" }

<div align="center"><em>图 5.4-1：RF 原理图参考</em></div>

#### 5.4.2. RF PCB { #542-rf-pcb }

PCB 要求：

- RF 走线按单端 50 Ω 阻抗控制。
- RF 走线优先布在表层，尽量减少过孔和换层。
- 避免锐角和直角。
- 两侧铺地铜，并打地过孔形成隔离带（via fence）。
- RF 走线下方保持连续的参考地。
- 远离 DC/DC、晶体、USB、SDIO、显示时钟、充电大电流线和其他强噪声区域。

#### 5.4.3. RF 启动调试与校准 { #543-rf-bring-up-and-calibration }

RF 性能必须通过实测确认，不能只依赖原理图连接正确。

建议的启动调试项目：

- 确认 48 MHz 晶体频率误差和启动稳定性。
- 使用传导测试确认发射功率、频率误差、接收灵敏度和调制质量。
- 根据整机外壳、电池、屏蔽罩和天线位置调整 π 型匹配网络。
- 验证屏幕点亮、充电、USB、SDIO、显示刷新、马达和音频工作时的 RF 性能。
- 产线夹具应支持晶体校准、基础 RF 测试和固件下载。

!!! note
    天线匹配应在接近最终整机结构的样机上完成。裸板匹配结果通常不能代表整机性能。

### 5.5. 用户接口 { #55-user-interfaces }

#### 5.5.1. 显示、触摸与背光 { #551-display-touch-and-backlight }

显示、触摸与背光应作为一个接口组评审，因为面板时序、电源时序、FPC 走线、触摸唤醒、ESD 和背光噪声在板级启动调试阶段经常相互影响。

#### 5.5.2. 显示接口选择 { #552-display-interface-selection }

SF32LB57x 的显示控制器（LCDC）支持多种显示接口类型，具体支持范围因所选型号而异。

<div align="center"><em>表 5.5-1：显示接口选择指南</em></div>

<div align="center" markdown>

| 接口 | 适用场景 | 硬件注意事项 |
|:-----|:---------|:-------------|
| SPI / QSPI | 小尺寸 TFT/AMOLED、穿戴屏 | 管脚占用少，带宽有限，适合局部刷新。 |
| 8080 MCU | 并口显示屏 | 与串行接口相比带宽更高，但占用的管脚也更多。 |
| RGB / DPI | 中高分辨率屏 | 连续像素流，对带宽和时序要求高。 |
| MIPI DSI | 高密度 AMOLED | 管脚占用少、带宽高，但初始化和信号完整性要求更高。 |
| EPD | 电子纸 | 低刷新率，需关注 VCOM、PMIC 和波形。 |
| JDI | Memory-in-Pixel 低功耗屏 | 适合常显和户外可读产品。 |

</div>

常见显示参数和器件示例：

- 显示控制器支持 3 线 SPI、4 线 SPI、双数据线 SPI、Quad-SPI、16 位 RGB、16 位 MCU 8080、16 位 EPD，以及串行/并行 JDI。
- 显示色彩深度可覆盖 RGB888、RGB666、RGB565、RGB111 等模式，最高分辨率可到 1024 x 1024；请针对所选型号确认实际支持的模式。
- 高分辨率项目应尽早评估接口带宽、显示 RAM、PSRAM 带宽和刷新策略。
- 如果项目不需要自定义管脚分配，建议优先采用 SDK 已适配或参考设计中所选面板接口对应的 IO 组合。矩阵路由灵活性高，但使用软件已支持的 IO 组合可降低驱动开发和启动调试的风险。
- 面板初始化、上电时序和接口模式必须以面板厂商规格书为准。

<div align="center"><em>表 5.5-2：显示 IO 起始建议</em></div>

<div align="center" markdown>

| 显示接口 | 推荐起始方案 |
|:---------|:-------------|
| SPI / QSPI | 优先使用 pinmux 表中的专用 `LCDC1_SPI_*` 管脚。若使用矩阵映射的 LCDC SPI 信号，显示时钟应不超过 50 MHz，并确认驱动能力设置。 |
| RGB / DPI | 信号速率超过 30 MHz 时，矩阵映射的 LCDC 信号应使用 `PA22` 到 `PA50`；`PA52` 到 `PA54` 仅可分配 `B1` 到 `B6`。低速设计可使用矩阵映射，但仍需评审时序。 |
| 8080 MCU | 高速设计按 RGB/DPI 的管脚组规则执行，并结合屏规格书确认总线位宽、时序和驱动能力。 |
| EPD | 当 EPD 并口速率超过 30 MHz 时，按 RGB/DPI 的管脚组规则执行，同时评审 VCOM 与 PMIC 控制脚。 |
| JDI | 按 LCDC JDI 信号映射表分配，优先采用 SDK 已适配的屏配置。 |
| MIPI DSI | 使用所选型号和参考设计定义的固定 DSI 信号，并与软件团队确认 lane 走线和面板初始化。 |

</div>

<div align="center"><em>表 5.5-3：LCD 驱动芯片示例</em></div>

<div align="center" markdown>

| 驱动芯片 | 厂商 | 分辨率 | 类型 | 典型接口 |
|:-------|:-----|:-------|:-----|:---------|
| RM69090 | Raydium | 368 x 448 | AMOLED | SPI、Quad SPI、MIPI-DSI |
| RM69330 | Raydium | 454 x 454 | AMOLED | SPI、Quad SPI、8 位 8080 MCU、MIPI-DSI |
| ILI8688E | ILITEK | 368 x 448 | AMOLED | Quad SPI、MIPI-DSI |
| SH8601A | Shenghe | 454 x 454 | AMOLED | SPI、Quad SPI、8 位 8080 MCU、MIPI-DSI |
| SPD2012 | Solomon | 356 x 400 | TFT | Quad SPI |
| GC9C01 | Galaxycore | 360 x 360 | TFT | Quad SPI |
| GC9B71 | Galaxycore | 320 x 380 | TFT | Quad SPI |
| ST77903 | Sitronix | 400 x 400 | TFT | Quad SPI |
| ICNA3311 | Chipone | 454 x 454 | AMOLED | Quad SPI |
| FT2308 | FocalTech | 410 x 494 | AMOLED | Quad SPI |

</div>

以下各表给出每种显示接口类型的信号与管脚对应关系，请根据所选面板的接口类型查阅对应表格。

<div align="center"><em>表 5.5-4：SPI/QSPI 显示信号连接</em></div>

<div align="center" markdown>

| SPI 面板信号 | 57x 信号 | 说明 |
|:--------------|:---------|:-----|
| `CSx` | `LCDC1_SPI_CS` | 片选信号。 |
| `WRx_SCL` | `LCDC1_SPI_CLK` | 时钟信号。 |
| `DCx` | `LCDC1_SPI_DIO1` | 4 线 SPI 模式下的数据/命令选择信号；Quad-SPI 模式下为 `DATA1`。 |
| `SDI_RDx` | `LCDC1_SPI_DIO0` | 3/4 线 SPI 模式下的数据输入信号；Quad-SPI 模式下为 `DATA0`。 |
| `SDO` | `LCDC1_SPI_DIO0` | 3/4 线 SPI 模式下的数据输出信号，应与 `SDI_RDx` 就近短接。 |
| `D[0]` | `LCDC1_SPI_DIO2` | Quad-SPI 模式下为 `DATA2`。 |
| `D[1]` | `LCDC1_SPI_DIO3` | Quad-SPI 模式下为 `DATA3`。 |
| `RESET` | `LCDC1_SPI_RSTB` | 复位信号。 |
| `TE` | `LCDC1_SPI_TE` | 输出至 MCU 的防撕裂同步（TE）信号。 |

</div>

!!! note
    优先使用专用的 `LCDC1_SPI_*` Function 1 管脚。若改用矩阵映射的 SPI 模式信号（Function index 121-150），时钟应限制在 50 MHz 以内，并将 GPIO 驱动能力配置为 `DS1 = 0, DS0 = 1`。

<div align="center"><em>表 5.5-5：RGB 显示信号连接</em></div>

<div align="center" markdown>

| RGB888 面板信号 | RGB565 面板信号 | 57x 信号 | 说明 |
|:------------------|:------------------|:-----------|:-----|
| CLK | CLK | `LCDC_DPI_CLK` | 时钟信号。 |
| DE | DE | `LCDC_DPI_DE` | DE 模式下的数据使能信号。 |
| HSYNC | HSYNC | `LCDC_DPI_HSYNC` | 行同步信号。 |
| VSYNC | VSYNC | `LCDC_DPI_VSYNC` | 场同步信号。 |
| R0 | - | `LCDC_DPI_R0` | 红色数据 0。 |
| R1 | - | `LCDC_DPI_R1` | 红色数据 1。 |
| R2 | - | `LCDC_DPI_R2` | 红色数据 2。 |
| R3 | R0 | `LCDC_DPI_R3` | 红色数据 3。 |
| R4 | R1 | `LCDC_DPI_R4` | 红色数据 4。 |
| R5 | R2 | `LCDC_DPI_R5` | 红色数据 5。 |
| R6 | R3 | `LCDC_DPI_R6` | 红色数据 6。 |
| R7 | R4 | `LCDC_DPI_R7` | 红色数据 7。 |
| G0 | - | `LCDC_DPI_G0` | 绿色数据 0。 |
| G1 | - | `LCDC_DPI_G1` | 绿色数据 1。 |
| G2 | G0 | `LCDC_DPI_G2` | 绿色数据 2。 |
| G3 | G1 | `LCDC_DPI_G3` | 绿色数据 3。 |
| G4 | G2 | `LCDC_DPI_G4` | 绿色数据 4。 |
| G5 | G3 | `LCDC_DPI_G5` | 绿色数据 5。 |
| G6 | G4 | `LCDC_DPI_G6` | 绿色数据 6。 |
| G7 | G5 | `LCDC_DPI_G7` | 绿色数据 7。 |
| B0 | - | `LCDC_DPI_B0` | 蓝色数据 0。 |
| B1 | - | `LCDC_DPI_B1` | 蓝色数据 1。 |
| B2 | - | `LCDC_DPI_B2` | 蓝色数据 2。 |
| B3 | B0 | `LCDC_DPI_B3` | 蓝色数据 3。 |
| B4 | B1 | `LCDC_DPI_B4` | 蓝色数据 4。 |
| B5 | B2 | `LCDC_DPI_B5` | 蓝色数据 5。 |
| B6 | B3 | `LCDC_DPI_B6` | 蓝色数据 6。 |
| B7 | B4 | `LCDC_DPI_B7` | 蓝色数据 7。 |

</div>

<div align="center"><em>表 5.5-6：RGB 模式配置（各模式下 LCDC_IFx 的信号分配）</em></div>

<div align="center" markdown>

| LCDC 信号 | 模式 0（RGB565 配置 1） | 模式 1（RGB565 配置 2） | 模式 2（RGB565 配置 3） | 模式 3（RGB666 配置 1） | 模式 4（RGB666 配置 2） | 模式 5（RGB888） | 模式 6（8 位总线 RGB666） | 模式 7（8 位总线 RGB888） |
|:------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------------|:------------------|:-----------------------------|:-----------------------------|
| `LCDC_IF0` | B0 | B0 | - | B0 | B0 | B0 | R0/G0/B0 | R0/G0/B0 |
| `LCDC_IF1` | B1 | B1 | B0 | B1 | B1 | B1 | R1/G1/B1 | R1/G1/B1 |
| `LCDC_IF2` | B2 | B2 | B1 | B2 | B2 | B2 | R2/G2/B2 | R2/G2/B2 |
| `LCDC_IF3` | B3 | B3 | B2 | B3 | B3 | B3 | R3/G3/B3 | R3/G3/B3 |
| `LCDC_IF4` | B4 | B4 | B3 | B4 | B4 | B4 | R4/G4/B4 | R4/G4/B4 |
| `LCDC_IF5` | G0 | - | B4 | B5 | B5 | B5 | R5/G5/B5 | R5/G5/B5 |
| `LCDC_IF6` | G1 | - | - | G0 | - | B6 | - | R6/G6/B6 |
| `LCDC_IF7` | G2 | - | - | G1 | - | B7 | - | R7/G7/B7 |
| `LCDC_IF8` | G3 | G0 | G0 | G2 | G0 | G0 | - | - |
| `LCDC_IF9` | G4 | G1 | G1 | G3 | G1 | G1 | - | - |
| `LCDC_IF10` | G5 | G2 | G2 | G4 | G2 | G2 | - | - |
| `LCDC_IF11` | R0 | G3 | G3 | G5 | G3 | G3 | - | - |
| `LCDC_IF12` | R1 | G4 | G4 | R0 | G4 | G4 | - | - |
| `LCDC_IF13` | R2 | G5 | G5 | R1 | G5 | G5 | - | - |
| `LCDC_IF14` | R3 | - | - | R2 | - | G6 | - | - |
| `LCDC_IF15` | R4 | - | - | R3 | - | G7 | - | - |
| `LCDC_IF16` | - | R0 | - | R4 | R0 | R0 | - | - |
| `LCDC_IF17` | - | R1 | R0 | R5 | R1 | R1 | - | - |
| `LCDC_IF18` | - | R2 | R1 | - | R2 | R2 | - | - |
| `LCDC_IF19` | - | R3 | R2 | - | R3 | R3 | - | - |
| `LCDC_IF20` | - | R4 | R3 | - | R4 | R4 | - | - |
| `LCDC_IF21` | - | - | R4 | - | R5 | R5 | - | - |
| `LCDC_IF22` | - | - | - | - | - | R6 | - | - |
| `LCDC_IF23` | - | - | - | - | - | R7 | - | - |

</div>

`LCDC_IF24` 到 `LCDC_IF29` 在所有 RGB 模式下均未使用。

<div align="center"><em>表 5.5-7：MCU8080 显示信号连接</em></div>

<div align="center" markdown>

| MCU8080 16 位面板信号 | MCU8080 8 位面板信号 | 57x 信号 | 说明 |
|:------------------------|:------------------------|:------------|:-----|
| `CSX` | `CSX` | `LCDC_8080_CS` | 片选信号。 |
| `WR` | `WR` | `LCDC_8080_WR` | 写数据选通信号。 |
| `DC` | `DC` | `LCDC_8080_DC` | 显示数据/命令选择信号。 |
| `RD` | `RD` | `LCDC_8080_RD` | 读选通信号。 |
| `D[0]` | `D[0]` | `LCDC_8080_DIO0` | 数据 0。 |
| `D[1]` | `D[1]` | `LCDC_8080_DIO1` | 数据 1。 |
| `D[2]` | `D[2]` | `LCDC_8080_DIO2` | 数据 2。 |
| `D[3]` | `D[3]` | `LCDC_8080_DIO3` | 数据 3。 |
| `D[4]` | `D[4]` | `LCDC_8080_DIO4` | 数据 4。 |
| `D[5]` | `D[5]` | `LCDC_8080_DIO5` | 数据 5。 |
| `D[6]` | `D[6]` | `LCDC_8080_DIO6` | 数据 6。 |
| `D[7]` | `D[7]` | `LCDC_8080_DIO7` | 数据 7。 |
| `D[8]` | - | `LCDC_8080_DIO8` | 数据 8（仅 16 位模式）。 |
| `D[9]` | - | `LCDC_8080_DIO9` | 数据 9（仅 16 位模式）。 |
| `D[10]` | - | `LCDC_8080_DIO10` | 数据 10（仅 16 位模式）。 |
| `D[11]` | - | `LCDC_8080_DIO11` | 数据 11（仅 16 位模式）。 |
| `D[12]` | - | `LCDC_8080_DIO12` | 数据 12（仅 16 位模式）。 |
| `D[13]` | - | `LCDC_8080_DIO13` | 数据 13（仅 16 位模式）。 |
| `D[14]` | - | `LCDC_8080_DIO14` | 数据 14（仅 16 位模式）。 |
| `D[15]` | - | `LCDC_8080_DIO15` | 数据 15（仅 16 位模式）。 |
| `RESET` | `RESET` | `LCDC_8080_RSTB` | 复位信号。 |
| `TE` | `TE` | `LCDC_8080_TE` | 输出至 MCU 的防撕裂同步（TE）信号。 |

</div>

<div align="center"><em>表 5.5-8：EPD 显示信号连接</em></div>

<div align="center" markdown>

| EPD 16 位面板信号 | EPD 8 位面板信号 | 57x 信号 | 说明 |
|:----------------------|:----------------------|:------------|:-----|
| `CLK` | `CLK` | `LCDC_TCON_SDCLK` | 源极驱动时钟信号。 |
| `CKV`/`CPV` | `CKV`/`CPV` | `LCDC_TCON_GDCLK` | 栅极驱动时钟信号。 |
| `SPH` | `SPH` | `LCDC_TCON_SDSTL` | 源极驱动起始脉冲信号。 |
| `SPV`/`STV` | `SPV`/`STV` | `LCDC_TCON_GDSP` | 栅极驱动起始脉冲信号。 |
| `LE` | `LE` | `LCDC_TCON_SDLE` | 源极驱动锁存使能信号。 |
| `OE` | `OE` | `LCDC_TCON_SDOE` | 源极驱动输出使能信号。 |
| `D0` | `D0` | `LCDC_TCON_SDAT0` | 源极驱动数据信号第 0 位。 |
| `D1` | `D1` | `LCDC_TCON_SDAT1` | 源极驱动数据信号第 1 位。 |
| `D2` | `D2` | `LCDC_TCON_SDAT2` | 源极驱动数据信号第 2 位。 |
| `D3` | `D3` | `LCDC_TCON_SDAT3` | 源极驱动数据信号第 3 位。 |
| `D4` | `D4` | `LCDC_TCON_SDAT4` | 源极驱动数据信号第 4 位。 |
| `D5` | `D5` | `LCDC_TCON_SDAT5` | 源极驱动数据信号第 5 位。 |
| `D6` | `D6` | `LCDC_TCON_SDAT6` | 源极驱动数据信号第 6 位。 |
| `D7` | `D7` | `LCDC_TCON_SDAT7` | 源极驱动数据信号第 7 位。 |
| `D8` | `D8` | `LCDC_TCON_SDAT8` | 源极驱动数据信号第 8 位。 |
| `D9` | - | `LCDC_TCON_SDAT9` | 源极驱动数据信号第 9 位（仅 16 位模式）。 |
| `D10` | - | `LCDC_TCON_SDAT10` | 源极驱动数据信号第 10 位（仅 16 位模式）。 |
| `D11` | - | `LCDC_TCON_SDAT11` | 源极驱动数据信号第 11 位（仅 16 位模式）。 |
| `D12` | - | `LCDC_TCON_SDAT12` | 源极驱动数据信号第 12 位（仅 16 位模式）。 |
| `D13` | - | `LCDC_TCON_SDAT13` | 源极驱动数据信号第 13 位（仅 16 位模式）。 |
| `D14` | - | `LCDC_TCON_SDAT14` | 源极驱动数据信号第 14 位（仅 16 位模式）。 |
| `D15` | - | `LCDC_TCON_SDAT15` | 源极驱动数据信号第 15 位（仅 16 位模式）。 |
| `GMODE` | `GMODE` | 任意 GPIO | 栅极驱动输出模式选择。 |
| `VPOS` | `VPOS` | - | EPD PMIC 信号；源极驱动正电源。 |
| `VNEG` | `VNEG` | - | EPD PMIC 信号；源极驱动负电源。 |
| `VGH` | `VGH` | - | EPD PMIC 信号；栅极驱动正电源。 |
| `VGL` | `VGL` | - | EPD PMIC 信号；栅极驱动负电源。 |
| `VCOM` | `VCOM` | - | EPD PMIC 信号；公共电极连接。 |
| `WAKEUP` | `WAKEUP` | 任意 GPIO | EPD PMIC 唤醒信号。 |
| `PWRUP` | `PWRUP` | 任意 GPIO | EPD PMIC 上电信号。 |
| `I2C_SDA` | `I2C_SDA` | 任意 GPIO | EPD PMIC I2C 数据信号。 |
| `I2C_SCL` | `I2C_SCL` | 任意 GPIO | EPD PMIC I2C 时钟信号。 |
| `PWRCOM` | `PWRCOM` | 任意 GPIO | EPD PMIC `VCOM_CTRL`；VCOM 使能信号。 |
| `GOOD` | `GOOD` | 任意 GPIO | EPD PMIC 电源正常（power-good）输出信号。 |

</div>

<div align="center"><em>表 5.5-9：并行 JDI 显示信号连接</em></div>

<div align="center" markdown>

| 并行 JDI 面板信号 | 57x 信号 | 说明 |
|:----------------------|:------------|:-----|
| `VST`/`GSP` | `LCDC_JDI_VST` | 垂直驱动起始信号。 |
| `ENB`/`GEN` | `LCDC_JDI_ENB` | 像素存储器写使能信号。 |
| `FRP`/`VA` | `#LPTIM2_OUTB` | 液晶驱动信号（像素“关”状态）。 |
| `HST`/`BSP` | `LCDC_JDI_HST` | 水平驱动起始信号。 |
| `R1` | `LCDC_JDI_R1` | 红色图像数据（奇数像素）。 |
| `G1` | `LCDC_JDI_G1` | 绿色图像数据（奇数像素）。 |
| `B1` | `LCDC_JDI_B1` | 蓝色图像数据（奇数像素）。 |
| `VCOM` | `#LPTIM2_OUT` | 公共电极驱动信号。 |
| `B2` | `LCDC_JDI_B2` | 蓝色图像数据（偶数像素）。 |
| `G2` | `LCDC_JDI_G2` | 绿色图像数据（偶数像素）。 |
| `R2` | `LCDC_JDI_R2` | 红色图像数据（偶数像素）。 |
| `HCK`/`BCK` | `LCDC_JDI_HCK` | 水平驱动移位时钟。 |
| `XFRP`/`VB` | `#LPTIM2_OUT` | 液晶驱动信号（像素“开”状态）。 |
| `XRST`/`INTB` | `LCDC_JDI_XRST` | 水平和垂直驱动复位信号。 |
| `VCK`/`GCK` | `LCDC_JDI_VCK` | 垂直驱动移位时钟。 |

</div>

<div align="center"><em>表 5.5-10：串行 JDI 显示信号连接</em></div>

<div align="center" markdown>

| 串行 JDI 面板信号 | 57x 信号 | 说明 |
|:----------------------|:------------|:-----|
| `SCLK` | `LCDC_JDI_SCLK` | 串行时钟信号。 |
| `SI` | `LCDC_JDI_SO` | 串行数据输入信号。 |
| `SCS` | `LCDC_JDI_SCS` | 片选信号。 |
| `EXTCOMIN` | `LCDC_JDI_EXTCOMIN` | COM 反相极性输入信号。 |
| `DISP` | `LCDC_JDI_DISP` | 显示开关切换信号。 |

</div>

!!! note
    RGB、MCU8080 和 EPD 的 GPIO 选型规则：信号速率低于 30 MHz 时，任意管脚均可配置为对应的 LCDC 信号；高于 30 MHz 时，矩阵映射的 LCDC 信号必须使用 `PA22` 到 `PA50`，且 `PA52` 到 `PA54` 只能承载 `B1` 到 `B6`。所有情况下 GPIO 驱动能力均应配置为 `DS1 = 0, DS0 = 1`。

<div align="center"><em>表 5.5-11：触摸与背光信号连接</em></div>

<div align="center" markdown>

| CTP 面板信号 | 57x 信号 | 说明 |
|:---------------|:------------|:-----|
| 中断 | 任意 GPIO | 触摸状态中断信号（支持唤醒）。 |
| `I2C1_SCL` | 任意 GPIO | 触摸屏 I2C 时钟信号。 |
| `I2C1_SDA` | 任意 GPIO | 触摸屏 I2C 数据信号。 |
| `BL_PWM` | 任意 GPIO | 背光 PWM 控制信号。 |
| 复位 | 任意 GPIO | 复位信号。 |

</div>

#### 5.5.3. 显示与触摸设计要点 { #553-display-and-touch-guidelines }

- 显示和背光电源应分别控制；除非产品另有要求，上电时默认关闭。
- 高速显示时钟线可预留串联电阻和并联 NC 电容焊位，用于 EMI 调试。
- FPC、显示连接器和触摸走线应远离 RF 天线区域。
- 触摸 INT 若需要唤醒系统，应连接到可唤醒 GPIO。
- 显示屏、触摸 IC 与 MCU 的 IO 电压域应匹配。
- 对暴露在产品外部的显示和触摸接口应配置 ESD 防护。
- SPI/QSPI 显示优先使用专用复用管脚组；RGB、8080、EPD 等高速并行接口应优先选择支持高速输出的管脚组，并在 PCB 布局中保持时序一致。
- SPI/QSPI 使用矩阵映射时，时钟建议限制在 50 MHz 以内；GPIO 驱动能力按 `DS1 = 0, DS0 = 1` 配置。
- RGB、MCU8080、EPD 信号速率超过 30 MHz 时，矩阵映射优先使用 `PA22` 到 `PA50`；`PA52` 到 `PA54` 仅用于 `B1` 到 `B6` 信号。

#### 5.5.4. 显示启动调试顺序 { #554-display-bring-up-sequence }

建议按以下顺序启动调试显示，避免同时引入太多变量：

1. 验证显示电源、复位脚、背光/使能脚和屏 ID 读取。
2. 使用最低稳定接口速率点亮纯色屏，确认 RGB 顺序、颜色深度和扫描方向。
3. 验证局部刷新窗口、TE 信号、帧同步或命令/视频模式行为。
4. 再逐步提高接口速率，加入 LVGL、ePicasso、DMA 和背光调光。
5. 最后验证睡眠、唤醒、灭屏、亮屏、充电器插拔以及蓝牙连接状态下的工作情况。

若出现花屏、撕裂、颜色错误或偶发不刷新，应优先检查面板初始化、接口时序、像素格式、刷新窗口、缓存一致性和 FPC 信号完整性。

#### 5.5.5. 音频 { #555-audio }

音频应作为一个噪声敏感子系统整体评审：MIC_BIAS、音频参考、模拟输入、DAC 输出、数字音频时钟、外部 PA 控制和整机声学结构需要一起检查。

SF32LB57x 提供 2 路模拟 ADC 输入，每路均支持单端或差分输入；提供 1 路差分模拟 DAC 输出，需搭配外部 PA 驱动扬声器或耳机；另有 2 路 PDM 数字麦克风接口，最多可同时连接 4 个数字麦克风。

#### 5.5.6. 模拟音频输入 { #556-analog-audio-input }

设计要点：

- MIC_BIAS、AUD_VREF、AVDD33_AUD 去耦电容靠近芯片。
- 模拟麦克风输入需要隔直电容，推荐容量不小于 2.2 μF。
- 模拟输入器件靠近芯片对应管脚放置。
- ADCP 等模拟输入走线短、远离噪声源，并做接地屏蔽。
- 复用 GPIO 的模拟输入脚启用模拟功能时，应按要求配置高阻。

<div align="center"><em>表 5.5-12：音频信号连接</em></div>

<div align="center" markdown>

| 音频信号 | 57x 信号/管脚 | 说明 |
|:---------|:--------------|:-----|
| `MIC_BIAS` | `PA56` | 麦克风偏置电源。 |
| `ADC1P` | `PA55` | 单端模拟麦克风或差分正端。 |
| `ADC1N` | `PA09` | 差分负端。 |
| `ADC2P` | `PA10` | 单端模拟麦克风或差分正端。 |
| `ADC2N` | `PA11` | 差分负端。 |
| `PDM1_CLK` / `PDM1_DATA` | 任意 GPIO 矩阵映射 | PDM 接口 1 的时钟和数据信号。 |
| `PDM2_CLK` / `PDM2_DATA` | 任意 GPIO 矩阵映射 | PDM 接口 2 的时钟和数据信号。 |
| `DAC1P` | `DACP` | 差分模拟音频输出正端。 |
| `DAC1N` | `DACN` | 差分模拟音频输出负端。 |

</div>

![图 5.5-1：单端模拟麦克风输入参考电路](../../sf32-products/chips/assets/57x/SF32LB57x-Analog-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>图 5.5-1：单端模拟麦克风输入参考电路</em></div>

参考电路中，每路麦克风通过 1 kΩ 电阻接入 MIC_BIAS，并配置 4.7 μF 偏置去耦、2.2 μF 串联输入电容，以及 ADC 输入端对地的 10 nF 电容。这些是图示参考电路中的取值；实际设计应结合所选麦克风和模拟输入电路确认。

![图 5.5-2：PDM 数字麦克风输入参考电路](../../sf32-products/chips/assets/57x/SF32LB57x-PDM-MIC.png){ width="80%" loading="lazy" }

<div align="center"><em>图 5.5-2：PDM 数字麦克风输入参考电路</em></div>

参考图中，每路 PDM 接口连接两个麦克风，共用该接口的时钟和数据线；两个麦克风的 `SELECT` 管脚采用不同电平配置，以区分左、右声道。每个麦克风的电源端附近还配置了 100 nF 旁路电容。图中数据网络标为 `PDM1_DAT` 和 `PDM2_DAT`，而信号表使用 `PDM1_DATA` 和 `PDM2_DATA`；设计时应按所选型号的管脚/矩阵表核对准确名称。

#### 5.5.7. 模拟音频输出 { #557-analog-audio-output }

设计要点：

- DACP/DACN 按差分形式走线。
- 两条线尽量短且等长，远离 RF、DC/DC、USB、SDIO 和显示时钟。
- 输出端阻容匹配网络靠近芯片端放置。
- 寄生电容应满足音频指标要求。
- 音频电源和参考电压路径应保持低噪声，并尽量短。

请参考图 5.5-3 中的推荐电路。虚线框内的差分低通滤波器必须靠近芯片管脚放置，以抑制高频干扰并提升音频输出的信噪比。

![图 5.5-3：模拟音频 PA 输出参考电路](../../sf32-products/chips/assets/57x/SF32LB57x-DAC-PA.png){ width="80%" loading="lazy" }

<div align="center"><em>图 5.5-3：模拟音频 PA 输出参考电路</em></div>

图示 NS4150B 参考级使用 +5 V 供电、100 nF DAC 输入耦合电容、43.2 kΩ 输入电阻，并通过 PA51 控制功放使能，另设 5.1 MΩ 下拉电阻。图中标注功放静态电流为 3 mA、关断电流为 0.1 μA、下拉电阻电流为 0.6 μA。这些数值仅对应图示电路，不代表所有 PA 的通用规格；应结合所选功放和系统要求核验。

#### 5.5.8. 数字音频 { #558-digital-audio }

I2S 和 PDM 接口应关注：

- 外设 IO 电压匹配。
- 时钟线长度、串扰和参考地连续性。
- 麦克风、Codec、PA 和主控之间的电源时序。
- 确保睡眠状态下数字音频外设进入安全状态。

#### 5.5.9. 音频验证建议 { #559-audio-validation }

音频问题常同时涉及硬件、结构、软件增益和电源噪声。建议验证：

- 空闲噪声、录音噪声、播放噪声，以及充电时的噪声。
- 显示刷新、蓝牙发射、马达振动、USB 接入和 SDIO 访问时的串扰。
- 麦克风偏置电压、隔直电容极性/容量和输入共模范围。
- DACP/DACN 差分输出幅度、负载匹配和外部 PA 输入范围。
- PDM/I2S 时钟频率、左右声道映射和采样率配置。

#### 5.5.10. 摄像头 { #5510-camera }

摄像头接口支持最高 16 位 DVP，以及 2 数据线 SPI 或 4 数据线 QSPI。设计要点如下：

- 确认摄像头接口位宽、时钟、同步信号和数据线管脚复用。
- 摄像头电源、复位、PWDN 和时钟应可由主控控制。
- 摄像头数据线和时钟线应保持组内长度一致，远离 RF 和模拟信号。
- 高速摄像头走线应具备完整参考地。
- 摄像头 FPC 和连接器应增加必要 ESD 保护。

建议的摄像头启动调试顺序：

- 先确认摄像头电源、复位、PWDN、MCLK 和 I2C/SPI 控制通路。
- 再读取传感器 ID，确认初始化表和输出格式。
- 使用低分辨率、低帧率模式验证 PCLK、VSYNC、HSYNC/HREF 和数据线映射。
- 基本通路稳定后，再提高分辨率和帧率，并结合显示刷新、存储写入和蓝牙连接一起测试。

<div align="center"><em>表 5.5-13：按示例传感器分类的摄像头信号连接</em></div>

<div align="center" markdown>

| GC032A SPI4 | GC032A DVP8 | GC2145 DVP8 | OV2640 DVP10 | 57x 信号 | 说明 |
|:------------|:------------|:------------|:--------------|:-----------|:-----|
| `SBDA` | `SBDA` | `SIO-D` | `SIO-D` | 任意 GPIO | I2C 数据信号。 |
| `SBCL` | `SBCL` | `SIO-C` | `SIO-C` | 任意 GPIO | I2C 时钟信号。 |
| `RESET` | `RESET` | `RESET` | `RESET` | 任意 GPIO | 复位信号输出。 |
| NC | `VSYNC` | `VSYNC` | `VSYNC` | `DCMI_VSYNC` | 场同步信号输入。 |
| `PWDN` | `PWDN` | `PWDN` | `PWDN` | 任意 GPIO | 掉电信号输出（高电平有效）。 |
| NC | `HSYNC` | `HREF` | `HREF` | `DCMI_HSYNC` | 行同步信号输入。 |
| NC | `D7` | `D7` | `Y9` | `DCMI_DI7` | YUV/RGB 视频端口第 [7] 位输入。 |
| `MCLK` | `MCLK` | `MCLK` | `MCLK` | 任意 GPIO（GPTIM） | 系统时钟输出。 |
| NC | `D6` | `D6` | `Y8` | `DCMI_DI6` | YUV/RGB 视频端口第 [6] 位输入。 |
| NC | `D5` | `D5` | `Y7` | `DCMI_DI5` | YUV/RGB 视频端口第 [5] 位输入。 |
| `SCK` | `PCLK`/`SCK` | `PCLK` | `PCLK` | `DCMI_CLK` | 像素时钟输入。 |
| NC | `D4` | `D4` | `Y6` | `DCMI_DI4` | YUV/RGB 视频端口第 [4] 位输入。 |
| `SD0` | `D0` | `D0` | `Y2` | `DCMI_DI0` | YUV/RGB 视频端口第 [0] 位输入。 |
| `SD3` | `D3` | `D3` | `Y5` | `DCMI_DI3` | YUV/RGB 视频端口第 [3] 位输入。 |
| `SD1` | `D1` | `D1` | `Y3` | `DCMI_DI1` | YUV/RGB 视频端口第 [1] 位输入。 |
| `SD2` | `D2` | `D2` | `Y4` | `DCMI_DI2` | YUV/RGB 视频端口第 [2] 位输入。 |
| NC | NC | NC | `Y1` | NC | 该传感器未连接此信号。 |
| NC | NC | NC | `Y0` | NC | 该传感器未连接此信号。 |

</div>

10 位 DVP 摄像头在 GPIO 紧张时建议按 8 位接线；仅在 GPIO 余量充足时再连接全部数据位。

#### 5.5.11. 按键与马达 { #5511-buttons-and-motor }

- 电源/复位按键必须使用 `PA34`，高电平有效；该管脚默认下拉为低电平，按下后变为高电平。`PA34` 支持 10 秒长按硬件复位，且 10 kΩ 下拉电阻必须放置在主板上。
- 采用分压式 GPADC 按键设计时，通过分压电压区分各按键，并在管脚附近就近放置一颗 0.1 μF 对地滤波电容以提高采样精度。
- 参考电路中的按键电阻为 1.1 kΩ、2.8 kΩ 和 5.1 kΩ，并配置 10 kΩ 下拉电阻与 100 nF 滤波电容。以上为图示参考值；应结合实际供电和电阻误差核验 ADC 按键阈值。
- 外部按键应配置 ESD 防护。

![图 5.5-4：电源按键与 GPADC 按键参考电路](../../sf32-products/chips/assets/57x/SF32LB57x-PWKEY.png){ width="80%" loading="lazy" }

<div align="center"><em>图 5.5-4：电源按键与 GPADC 按键参考电路</em></div>

实现触觉反馈时，应参考 SF32LB57x 振动马达参考电路。低功耗产品中，马达电源应可关断，PWM/控制管脚不得与启动、显示、存储或调试需求冲突。
