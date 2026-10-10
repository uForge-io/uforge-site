---
icon: lucide/circuit-board
hide:
    - navigation
description: "SF32LB52x MCU 的 RF 与用户接口原理图设计指导：天线匹配、显示、音频、按键与振动马达。"
tags:
    - 硬件
    - 芯片
---

# SF32LB52x 硬件设计指南 — RF 与用户接口 { #sf32lb52x-hardware-design-guide-rf-user-interfaces }

!!! note "SF32LB52x 硬件设计指南的一部分"
    本页覆盖原理图设计指导的第 5.4-5.5 节：RF 与用户接口。返回[最小系统、电源与时钟](SF32LB52x_schematic_design.md)，继续阅读[存储与制造](SF32LB52x_schematic_storage_mfg.md)，或参见[原理图核对表](SF32LB52x_schematic_checklist.md)进行逐项核对。

### 5.4. RF { #54-rf }

#### 5.4.1. RF 原理图与天线路径 { #541-rf-schematic-and-antenna-path }

**快速摘要**

- 天线路径按 50 Ω 阻抗受控走线设计。
- 即使所选天线已匹配，也应预留 π 型匹配网络。
- RF 路径应尽量短并做好接地屏蔽，同时远离晶体、DC/DC、显示和充电电路的噪声源。

**设计目标**

控制阻抗，减少 RF 路径上的阻抗不连续，并为匹配调试预留空间，以保证蓝牙（Bluetooth）接收灵敏度和辐射性能。

RF 走线特征阻抗为 50 Ω。如果天线已匹配，可不焊接额外 RF 器件，但仍建议预留 π 型匹配网络，用于杂散抑制或天线调试。

![图 5.4-1：RF 电路图](../../sf32-products/chips/assets/52xB/sf32lb52X-B-rf-diagram.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.4-1：RF 电路图</em></div>

图 5.4-1 的串联电容 C0323 为 15 pF、50 V，两个对地支路 C0318、C0319 标为 NF（不贴装）。这些数值仅用于说明参考设计，不代表所有天线都适用。匹配网络应靠近芯片侧 RF 管脚，最终贴装方案应根据整机实测结果确定。

#### 5.4.2. RF 评审与调试 { #542-rf-review-and-tuning }

**常见错误 - RF**

- 将匹配网络放在天线侧，而不是靠近芯片侧 RF 管脚。
- RF 走线使用不必要过孔或锐角弯折。
- 与 DC/DC、显示、USB 或充电电路共用噪声较大的地回流路径。
- 未预留匹配网络，导致后期缺少可行的天线调试手段。

**RF 检查表**

- [ ] 已与 PCB 厂确认 RF 走线阻抗目标
- [ ] 已预留 π 型匹配网络，并靠近芯片放置
- [ ] 已评审地过孔栅栏和 RF 禁布区
- [ ] 外壳设计定型前，已为天线调试和认证测试预留必要的接入条件

### 5.5. 用户接口 { #55-user-interfaces }

#### 5.5.1. 显示 { #551-display }

**快速摘要**

- 支持 SPI、Dual-SPI、Quad-SPI、串行 JDI；部分外部稳压供电型号还支持 EPD。
- 文档给出的最高显示分辨率为 512 x 512。
- Reset、TE、背光 PWM、触摸 I2C、触摸中断和显示电源时序应一起评审。

**设计目标**

选择满足带宽和功耗目标的显示接口，同时保证正常运行和低功耗状态下的唤醒、复位、背光和触摸行为可靠。

芯片支持 3 线 SPI、4 线 SPI、双数据线 SPI（Dual-data SPI）、四数据线 SPI（Quad-data SPI）和串行 JDI 接口。支持的色深为 16.7M 色（RGB888）、262K 色（RGB666）、65K 色（RGB565）和 8 色（RGB111），最高分辨率为 512 x 512。

支持的 LCD 驱动型号：

<div align="center"><em>表 5.5-1：支持的 LCD 驱动 IC 列表</em></div>

<div align="center" markdown>

| 型号 | 厂商 | 分辨率 | 类型 | 接口 |
|:---|:---|:---|:---|:---|
| RM69090 | Raydium | 368x448 | AMOLED | 3/4 线 SPI、双/四数据线 SPI、MIPI-DSI |
| RM69330 | Raydium | 454x454 | AMOLED | 3/4 线 SPI、双/四数据线 SPI、8 位 8080 MCU 总线、MIPI-DSI |
| ILI8688E | ILITEK | 368x448 | AMOLED | 四数据线 SPI、MIPI-DSI |
| SH8601A | Shine World Technology | 454x454 | AMOLED | 3/4 线 SPI、双/四数据线 SPI、8 位 8080 MCU 总线、MIPI-DSI |
| SPD2012 | Solomon | 356x400 | TFT | 四数据线 SPI |
| GC9C01 | Galaxycore | 360x360 | TFT | 四数据线 SPI |
| GC9B71 | Galaxycore | 320x380 | TFT | 四数据线 SPI |
| ST77903 | Sitronix | 400x400 | TFT | 四数据线 SPI |
| ICNA3311 | Chipone | 454x454 | AMOLED | 四数据线 SPI |
| FT2308 | FocalTech | 410x494 | AMOLED | 四数据线 SPI |

</div>

!!! note "显示驱动芯片的接口不等于 MCU 支持的接口"
    表 5.5-1 列出的是 LCD 驱动芯片提供的接口，并不表示 SF32LB52x 支持表中所有接口。接口列中的 MIPI-DSI 或 8 位 8080 MCU 总线不能作为 MCU 支持该接口的依据。应选择具体 MCU 型号和显示驱动芯片共同支持的接口。

##### 5.5.1.1. SPI/QSPI 显示接口 { #5511-spiqspi-display-interface }

<div align="center"><em>表 5.5-2：SPI/QSPI 信号连接</em></div>

<div align="center" markdown>

| SPI 信号 | 管脚 | 说明 |
|:---|:---|:---|
| CSx | PA03 | 片选 |
| WRx_SCL | PA04 | 时钟 |
| DCx | PA06 | 4 线 SPI 模式下为数据/命令信号；Quad-SPI 模式下为数据 1 |
| SDI_RDx | PA05 | 3/4 线 SPI 模式下为数据输入；Quad-SPI 模式下为数据 0 |
| SDO | PA05 | 3/4 线 SPI 模式下为数据输出；与 SDI_RDx 短接 |
| D[0] | PA07 | Quad-SPI 模式下的数据 2 |
| D[1] | PA08 | Quad-SPI 模式下的数据 3 |
| RESET | PA00 | 显示复位 |
| TE | PA02 | 防撕裂同步（TE）信号，输入到 MCU |

</div>

##### 5.5.1.2. JDI 显示接口 { #5512-jdi-display-interface }

!!! important "源资料中的 JDI 接口名称"
    原始应用说明在功能概述中写的是串行 JDI，但将下方管脚表标为并行 JDI。本页保留源资料中的管脚分配。原理图定稿前，应确认所用 JDI 模式、屏幕要求和具体 MCU 型号的支持情况，不能将串行与并行接口视为可以互换。

<div align="center"><em>表 5.5-3：并行 JDI 信号连接</em></div>

<div align="center" markdown>

| JDI 信号 | I/O | 说明 |
|:---|:---|:---|
| JDI_VCK | PA39 | 垂直驱动移位时钟 |
| JDI_VST | PA08 | 垂直驱动启动信号 |
| JDI_XRST | PA40 | 水平和垂直驱动复位 |
| JDI_HCK | PA41 | 水平驱动移位时钟 |
| JDI_HST | PA06 | 水平驱动启动信号 |
| JDI_ENB | PA07 | 像素存储写使能 |
| JDI_R1 | PA05 | 红色图像数据（奇数像素） |
| JDI_R2 | PA42 | 红色图像数据（偶数像素） |
| JDI_G1 | PA04 | 绿色图像数据（奇数像素） |
| JDI_G2 | PA43 | 绿色图像数据（偶数像素） |
| JDI_B1 | PA03 | 蓝色图像数据（奇数像素） |
| JDI_B2 | PA02 | 蓝色图像数据（偶数像素） |

</div>

##### 5.5.1.3. EPD 显示接口 { #5513-epd-display-interface }

=== "52B/D/E/G/J（外部稳压供电）"

    芯片支持 8 位并行 EPD 显示接口：

    <div align="center"><em>表 5.5-4：EPD 信号连接</em></div>

    <div align="center" markdown>

    | EPD 信号 | I/O | 说明 |
    |:---|:---|:---|
    | CLK | PA04 | 源极驱动时钟 |
    | CKV/CPV | GPIO | 栅极驱动时钟（Gate Driver） |
    | SPH | PA06 | 源极驱动起始脉冲（Source Driver） |
    | SPV/STV | GPIO | 栅极驱动起始脉冲 |
    | LE | GPIO | 源极驱动锁存使能 |
    | OE | GPIO | 源极驱动输出使能 |
    | D0–D7 | PA07/PA08/PA37/PA39/PA40/PA41/PA42/PA43 | 源极驱动数据信号，第 0–7 位 |
    | GMODE | GPIO | 栅极驱动输出模式选择 |
    | VPOS/VNEG | TPS | 源极驱动正/负电源 |
    | VGH/VGL | TPS | 栅极驱动正/负电源 |
    | VCOM | TPS | 公共端 |
    | TPS_WAKEUP/TPS_PWRUP | GPIO | TPS PMIC 唤醒 / 上电控制 |
    | TPS_SDA/TPS_SCL | I2C | TPS PMIC I2C 接口 |
    | TPS_PWRCOM | GPIO | TPS PMIC VCOM_CTRL，VCOM 使能 |
    | TPS_GOOD | GPIO | TPS PMIC 电源正常信号输出 |

    </div>

    !!! note
        标记为“PA**”的信号必须使用表中指定的固定 I/O。标记为 GPIO 的信号可分配到任意 I/O。标记为 TPS 的信号由显示 PMIC（TPS）输出至面板。标记为 I2C 的信号必须分配到具备 I2C 功能的 I/O。

=== "SF32LB520/3/5/7（电池供电）"

    !!! info "不适用"
        思澈科技（SiFli）官方 SF32LB520/3/5/7 硬件应用说明未包含 EPD 并行接口参考设计。如果产品需要 EPD 显示，请参考 52B/D/E/G/J 相关文档，并直接向思澈科技（SiFli）FAE 确认电池供电型号是否可行。

##### 5.5.1.4. 触摸与背光接口 { #5514-touch-and-backlight-interface }

SF32LB52x 支持 I2C 触摸控制器接口、触摸状态中断输入，以及一个用于背光使能和亮度控制的 PWM 信号。

<div align="center"><em>表 5.5-5：触摸与背光连接</em></div>

<div align="center" markdown>

| 触摸/背光信号 | 管脚 | 说明 |
|:---|:---|:---|
| Interrupt | PA43 | 触摸状态中断（可唤醒） |
| I2C1_SCL | PA42 | 触摸 I2C 时钟 |
| I2C1_SDA | PA41 | 触摸 I2C 数据 |
| BL_PWM | PA01 | 背光 PWM 控制 |
| Reset | PA44 | 触摸控制器复位 |

</div>

**常见错误 - 显示**

- 分配管脚时遗漏 Reset、TE、背光 PWM 或触摸中断。
- 未确认具体器件和源设计，就假定电池供电型号支持 EPD。
- 直接使用内部 LDO 给显示屏供电，而没有采用供电能力足够的外部电源轨。
- 将显示时钟和数据线靠近晶体、RF、音频或高阻模拟节点走线。

**显示检查表**

- [ ] 显示接口、色深、分辨率和带宽与所选面板匹配
- [ ] Reset、TE、背光 PWM、触摸 I2C 和触摸中断已分配并记录
- [ ] 显示电源轨和电源时序兼容待机和唤醒行为
- [ ] 启动调试计划覆盖复位、面板 ID/数据读回（如支持）、背光、触摸中断和首帧显示

#### 5.5.2. 音频接口 { #552-audio-interface }

**快速摘要**

- 模拟麦克风采用单端输入，且需要串联隔直电容。
- DAC 输出为差分输出，应采用短距离、带接地屏蔽的差分走线。
- 音频电源滤波和 MIC_BIAS 相关器件的布局会显著影响噪声水平。

**设计目标**

缩短麦克风、DAC、偏置和音频电源路径，做好滤波与接地屏蔽，并使其远离数字电路和开关噪声源，以保证模拟信号质量。

音频接口提供：

1. 一个用于模拟麦克风的单端 ADC 输入，串联至少 2.2 μF 隔直电容；麦克风由芯片的 MIC_BIAS 输出供电。
2. 一个用于外部音频 PA 的差分 DAC 输出；应按差分对走线并做好接地屏蔽，走线寄生电容 < 10 pF、长度 < 2 cm。

<div align="center"><em>表 5.5-6：音频信号连接</em></div>

<div align="center" markdown>

| 音频信号 | 管脚 | 说明 |
|:---|:---|:---|
| BIAS | MIC_BIAS | 麦克风电源 |
| AU_ADC1P | ADCP | 单端模拟麦克风输入 |
| AU_DAC1P | DACP | 差分模拟输出，正端 |
| AU_DAC1N | DACN | 差分模拟输出，负端 |

</div>

![图 5.5-1：模拟 MEMS MIC 单端输入电路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-MEMS-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-1：模拟 MEMS MIC 单端输入电路</em></div>

![图 5.5-2：模拟 ECM MIC 单端输入电路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-ECM-MIC.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-2：模拟 ECM MIC 单端输入电路</em></div>

麦克风参考电路用串联 1 kΩ 电阻和对地 1 uF、6.3 V 电容对 MIC_BIAS 进行滤波，ECM 电路还使用了 4.7 kΩ 麦克风偏置电阻。两种电路都在输入端接有 0.01 uF 对地电容，用于并联滤波，不能替代信号路径中所需的串联隔直电容。修改参考电路时，应明确区分这两类电容。

![图 5.5-3：模拟音频 PA 电路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-DAC-PA.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-3：模拟音频 PA 电路</em></div>

**常见错误 - 音频**

- 将麦克风或 DAC 走线靠近显示时钟、DC/DC、RF、USB 或 SDIO。
- MIC_BIAS 或 AVDD33_AUD 滤波电容距离芯片管脚过远。
- 将 DACP/DACN 当作两个独立单端信号，而不是差分对。
- 模拟输出走线过长或寄生电容过高。

**音频检查表**

- [ ] MIC_BIAS、ADCP、DACP 和 DACN 相关器件摆放已按布局示例评审
- [ ] DACP/DACN 按短距离、带接地屏蔽的差分对走线
- [ ] 音频滤波电容靠近对应管脚，并良好接地
- [ ] 启动调试计划覆盖麦克风偏置、ADC 噪声底、DAC 输出、PA 使能和可闻噪声

!!! important "补齐麦克风和 DAC 信号链"
    源资料将 MEMS_MIC_ADC_IN 和 ECM_MIC_ADC_IN 均接至 ADCP。应按前文要求串联至少 2.2 uF 的隔直电容；麦克风电路中接地的 0.01 uF 电容不能替代隔直电容。图 5.5-3 虚线框内的差分低通滤波器应靠近 MCU 放置，并保证 DAC 输出走线电容小于 10 pF、长度小于 2 cm。

#### 5.5.3. 按键 { #553-buttons }

**快速摘要**

- `PA34` 支持电源键、开关机行为和长按复位。
- 机械旋转编码器按键电路应以参考设计为基础，并结合唤醒、消抖和 ESD 要求进行评审。

**设计目标**

保证用户输入和复位功能可靠，避免误唤醒、持续复位，以及上下拉电路造成的过大待机漏电。

##### 5.5.3.1. 电源键 { #5531-power-button }

PA34 支持长按复位，可设计为开关机和长按复位共用按键。长按复位为高电平有效，因此默认状态应下拉为低，按下按键时变为高电平。

![图 5.5-4：电源 / 长按复位按键电路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-PWKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-4：电源 / 长按复位按键电路</em></div>

参考电路在 VSYS_3V3 与按键之间串联 R0703（5.1 kΩ），由 R0702（100 kΩ）将 PA34 下拉，并将 C0720（0.1 uF）接地；电路还包含 ESD 保护器件。这些是图中参考设计的数值。实际使用时，应核对输入门限、消抖效果、漏电和复位时序。

##### 5.5.3.2. 机械旋转编码器按键 { #5532-mechanical-rotary-encoder-button }

机械旋转编码器按键电路应以参考设计为基础。

![图 5.5-5：机械旋转编码器按键电路](../../sf32-products/chips/assets/52xB/sf32lb52X-B-XNKEY.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-5：机械旋转编码器按键电路</em></div>

编码器的 A、B 信号分别通过 0 Ω 电阻接到 PA35、PA36。两路信号各有一个接至 VDD33_LDO2_VOUT 的 200 kΩ 上拉电阻及 ESD 保护器件，C0703、C0706 标为 NF（不贴装）。信号标签还列出了复用的 USB/UART 功能，采用该管脚分配前，应检查是否存在功能冲突。

**常见错误 - 按键**

- `PA34` 悬空或默认偏置电平错误。
- 忽略按键电路的唤醒、ESD、消抖要求，或未预留量产测试所需的接入点。
- 将按键网络与噪声较大或负载较重的功能复用，且未评估唤醒可靠性。

**按键检查表**

- [ ] 电源/长按复位默认电平正确
- [ ] 已验证目标低功耗状态下的唤醒行为
- [ ] 已评审 ESD 和机械消抖要求
- [ ] 启动调试计划包含短按、长按、唤醒和复位行为

#### 5.5.4. 振动马达 { #554-vibration-motor }

**快速摘要**

- 使用 PWM 输出通过外部驱动级驱动振动马达。
- 对待机电流敏感的设计，应从可开关电源轨给马达供电。

**设计目标**

提供一致的触觉反馈，同时避免马达浪涌电流、开关噪声和待机漏电影响敏感电源轨及唤醒电路。

SF32LB52x 支持通过 PWM 输出配合外部驱动级驱动振动马达。

![图 5.5-6：振动马达驱动电路（SF32LB520/3/5/7 参考；外部稳压供电型号功能等效）](../../sf32-products/chips/assets/52xA/sf32lb52x-A-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-6：振动马达驱动电路（SF32LB520/3/5/7 参考；外部稳压供电型号功能等效）</em></div>

![图 5.5-7：振动马达驱动电路（52B/D/E/G/J 参考）](../../sf32-products/chips/assets/52xB/sf32lb52X-B-VIB.png){ width="100%" loading="lazy" }

<div align="center"><em>图 5.5-7：振动马达驱动电路（52B/D/E/G/J 参考）</em></div>

两种马达参考电路均由 PA20 控制低侧 MOSFET，栅极接有 1 MΩ 下拉电阻。图 5.5-6 从芯片的 3.3 V VDD33_VOUT2 输出给马达供电；图 5.5-7 则从 VSYS/VBAT 输入，通过两个独立的外部 3.3 V LDO 分别给马达和 PVDD 供电。两者的控制功能等效，但供电连接不能直接互换。

**马达检查表**

- [ ] 已评审马达驱动、续流/ESD 保护和电源电流能力
- [ ] 待机和出货状态下马达电源轨默认关闭
- [ ] PWM 管脚分配未与显示、存储或调试管脚冲突
- [ ] 启动调试计划覆盖 PWM 占空比扫描、启动电流、可闻噪声和待机漏电
