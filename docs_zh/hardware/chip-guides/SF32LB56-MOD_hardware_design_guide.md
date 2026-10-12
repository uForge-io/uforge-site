---
icon: lucide/book-check
description: "SF32LB56-MOD 硬件设计指南：蓝牙 MCU 模组的电源、接口及 PCB 集成设计指导。"
tags:
  - 硬件
  - 模组
hide:
    - navigation
---

# SF32LB56-MOD 硬件设计指南 { #sf32lb56-mod-hardware-design-guide }

## 1. 引言 { #1-introduction }

**SF32LB56-MOD** 是思澈科技（SiFli）基于 SF32LB56xV 系列芯片推出的通用低功耗 MCU 模组系列，面向蓝牙（Bluetooth）产品应用。

本指南以 **DS5602-SF32LB56-MOD 技术规格书 V0.3** 为依据，梳理原理图设计、PCB 布局、硬件验证和量产准备所需的模组专属信息。内容包括存储型号、89 个接口管脚、三路电源、显示/音频/存储接口、天线摆放要求、存储、搬运与装配要求，以及原理图核对表。

!!! note "来源与设计建议"
    除特别标注为集成指导或设计建议的内容外，本文所有技术参数均来自 **DS5602-SF32LB56-MOD 技术规格书 V0.3**。

## 2. 器件概览 { #2-device-overview }

### 2.1 架构 { #21-architecture }

SF32LB56-MOD 基于 SF32LB56xV 系列双核 MCU 平台：HCPU 负责应用和图形处理，LCPU 负责低功耗常开任务。HCPU 为最高运行频率 240 MHz 的 Arm Cortex-M33 STAR-MC1 内核，LCPU 为最高 96 MHz 的同类型内核。两个内核均支持 FPU 和 MPU。

模组支持 Bluetooth 5.3 无线连接，并提供显示加速、音频输入/输出、外部存储接口、USB 2.0 FS、SD/SDIO/eMMC、I2S、UART、I2C、SPI、PWM、GPADC 以及调试/下载接口。

### 2.2 型号 { #22-variants }

<div align="center"><em>表 2.2-1：SF32LB56-MOD 系列型号</em></div>

<div align="center" markdown>

| 模组代码 | 主 Flash | PSRAM | 备用 Flash | 工作温度 | 模组尺寸 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4+8 MB OPI-PSRAM | 1 MB QSPI-NOR | -40~85°C | 18.0 × 32.9 × 3.1 mm |

</div>

### 2.3 主要硬件特性 { #23-major-hardware-features }

<div align="center"><em>表 2.3-1：主要硬件特性</em></div>

<div align="center" markdown>

| 类别 | 能力 |
| :--- | :--- |
| CPU | HCPU 最高 240 MHz，LCPU 最高 96 MHz，均为 Arm Cortex-M33 STAR-MC1 |
| 无线 | 双模蓝牙 5.3，支持 BLE Audio |
| 图形 | ePicasso 2.0、eZip 2.0、TurboPixel，支持 8080/SPI/Dual-SPI/Quad-SPI/DPI/RGB/JDI LCD 接口 |
| 音频 | 24-bit DAC、24-bit Sigma-Delta ADC、2 路 PDM 接口（PDM1/PDM2），每路通过左右声道接入 2 个数字麦克风，两路合计最多接入 4 个；1 路 I2S |
| AI/DSP | 矩阵加速器最高 1.92 GOPS，FFT、FIR、CORDIC 加速器 |
| 存储 | 模组 Flash/PSRAM 可选，支持 MPI3 和 SD/SDIO/eMMC |
| 安全 | AES、HASH、CRC、TRNG、Secure Boot、1024-bit eFuse、PSA Certified Level 1 |
| 天线 | PCB 板载天线，或通过 IPEX 兼容连接器连接外部天线 |

</div>

### 2.4 典型应用 { #24-typical-applications }

典型应用包括高端智能手表、智能手环、可穿戴医疗设备、健身设备、电动自行车仪表、汽车钥匙、可穿戴式车载遥控器、智能家电、智能门锁、图形化 HMI、工业传感器中枢、工业监测终端、低功耗传感器中枢和蓝牙 Mesh 设备。

## 3. 设计速览 { #3-design-at-a-glance }

### 3.1 一页式工程摘要 { #31-one-page-engineering-summary }

<div align="center"><em>表 3.1-1：工程摘要</em></div>

<div align="center" markdown>

| 主题 | 设计要点 |
| :--- | :--- |
| 电源 | 提供 VDD_3V3、VDD_1V8 和 VDDIO，三路电源必须同时上电。 |
| 去耦 | VDD_3V3、VDD_1V8、VDDIO 靠近模组管脚各放置 4.7 μF 电容。 |
| I/O 电平 | VDDIO 支持 1.7–3.6 V，但 PA00–PA11 固定为 3.3 V，需要逐一检查所连接外设的电平。 |
| 调试/下载 | UART4_TXD/UART4_RXD 是默认打印、下载和调试串口；SWDIO/SWCLK 支持 SWD 下载。 |
| 启动模式 | BOOT_MODE 为高电平进入下载模式，为低电平进入用户模式。 |
| 内部 Flash 冲突 | PA06–PA11 默认连接模组内部 Flash，外部不可用。 |
| SDIO/MPI3 冲突 | SDIO 与 MPI3 共用 I/O，不能同时使用。 |
| 唤醒信号 | PA50、PA51、PB32、PB35 可在 MCU 睡眠时接收中断。 |
| PWRKEY | PB32 支持高有效 10 s 长按复位，需要 10 kΩ 下拉电阻。 |
| 天线 | PCB 天线区域禁止铺铜、走线、放置器件和金属；天线不能伸出板边时，建议至少 15 mm 净空。 |
| 生产 | MSL 3；防潮袋开封后，应在 25 ± 5°C、60% RH 条件下 168 小时内使用；超过时限则需烘烤后再使用。 |

</div>

### 3.2 推荐外设器件 { #32-recommended-external-components }

<div align="center"><em>表 3.2-1：推荐外设器件</em></div>

<div align="center" markdown>

| 电路 | 器件 | 摆放和说明 |
| :--- | :--- | :--- |
| VDD_3V3 | 4.7 μF 电容 | 靠近模组电源管脚。 |
| VDD_1V8 | 4.7 μF 电容 | 靠近模组电源管脚。 |
| VDDIO | 4.7 μF 电容 | 靠近模组电源管脚。 |
| PB32/PWRKEY | 10 kΩ 下拉电阻 | 用于高有效长按复位。 |
| LCD RGB 信号 | 33–100Ω 串联电阻 | 串在 RGB 信号线上。 |
| PA16/PA17 调试 UART | 100Ω 串联电阻 | 用于复用的程序下载和调试接口。 |
| TP 等外部接口 | ESD 器件 | 暴露接口需预留 ESD 防护。 |

</div>

### 3.3 电源树 { #33-power-tree }

VDD_3V3 为 MCU 的 PVDD、AVDD33_ANA、AVDD33_AUD、AVDD_BRF、VDDIOA2 以及模组内部 Flash 供电，官方建议使用 LDO。VDD_1V8 为 MCU 合封存储器供电。VDDIO 为 MCU 的 VDDIOA/VDDIOB I/O 端口供电。

!!! info "图 3.3-1：SF32LB56-MOD 模组供电示意图"
    见 DS5602 V0.3 图 7-1。

### 3.4 系统框图 { #34-system-block-diagram }

模组功能框图展示 SF32LB56xV MCU、存储资源、RF 通道、天线选项、电源输入和外部接口分组。

!!! info "图 3.4-1：SF32LB56-MOD 功能框图"
    见 DS5602 V0.3 图 2-1。

## 4. 硬件设计流程 { #4-hardware-design-flow }

### 4.1 设计顺序 { #41-design-sequence }

1. 根据固件容量、图形资源、外部存储需求和成本目标选择存储型号。
2. 在结构冻结前确认使用 PCB 天线还是外部天线。
3. 定义 VDD_3V3、VDD_1V8、VDDIO 电源架构，并确认三路电源同时上电。
4. 分配显示、存储、USB、音频、传感器、唤醒、调试和量产测试管脚。
5. 解决共享资源冲突，尤其是 SDIO 与 MPI3，以及 PA06–PA11 内部 Flash 占用。
6. 加入去耦、ESD、PWRKEY 下拉、LCD 串联电阻和调试 UART 串联电阻。
7. 按天线净空要求摆放模组。
8. 发布前按第 7 章核对表完成原理图和 PCB 复查。

### 4.2 评审顺序 { #42-review-sequence }

建议按原理图评审、管脚复用评审、电源上电评审、RF/天线评审、PCB 评审、首板启动调试评审、RF 验证、环境/可靠性评审、量产测试评审的顺序推进。

### 4.3 里程碑 { #43-milestones }

<div align="center"><em>表 4.3-1：推荐硬件里程碑</em></div>

<div align="center" markdown>

| 里程碑 | 需要确认的证据 |
| :--- | :--- |
| 原理图冻结 | 型号已选定，管脚冲突已清除，电源检查完成，核对表已完成。 |
| PCB 冻结 | 天线净空、电源去耦、高速接口和生产测试点已检查。 |
| EVT 启动调试 | 电源、启动模式、UART/SWD、Flash、显示、USB、音频和 RF 冒烟测试通过。 |
| DVT | RF 距离、电流、温升、睡眠/唤醒、ESD 策略和外壳影响验证完成。 |
| 量产发布 | 烧录、测试点、检验规则、MSL/回流焊处理和版本记录完成。 |

</div>

## 5. 原理图设计 { #5-schematic-design }

### 5.1 电源系统 { #51-power-system }

#### 5.1.1 电源 { #511-power-supply }

<div align="center"><em>表 5.1-1：电源轨</em></div>

<div align="center" markdown>

| 电源 | 推荐工作范围 | 用途 |
| :--- | :--- | :--- |
| VDD_3V3 | 2.97–3.6 V | MCU PVDD、3.3 V 模拟域、RF 模拟域、VDDIOA2、内部 Flash。 |
| VDD_1V8 | 1.7–1.95 V | MCU 合封存储器供电。 |
| VDDIO | 1.7–3.6 V | MCU VDDIOA/VDDIOB I/O 供电。 |

</div>

VDD_3V3、VDD_1V8 和 VDDIO 必须同时上电。每路电源都需要在靠近模组管脚处放置 4.7 μF 电容。虽然 VDDIO 支持 1.7–3.6 V，规格书同时说明 PA00–PA11 接口电平固定为 3.3 V，不随 VDDIO 变化。

#### 5.1.2 工作模式 { #512-operating-modes }

BOOT_MODE 控制启动行为：高电平为下载模式，低电平为用户模式。复位和量产烧录期间应保证 BOOT_MODE 网络状态明确。PB32/PWRKEY 支持高有效 10 s 长按复位，需增加 10 kΩ 下拉电阻。

### 5.2 时钟与 RF { #52-timing-and-rf }

#### 5.2.1 时钟 { #521-clock }

模组平台使用 48 MHz 晶振，并支持 1 MHz/48 MHz 低功耗 RC、10 kHz 超低功耗 RC，以及可选 32.768 kHz 晶振。时钟相关布局和接地应参考模组参考设计；生产过程中应避免超声波焊接或超声波清洗对内部晶振造成机械应力。

#### 5.2.2 RF { #522-rf }

<div align="center"><em>表 5.2-1：蓝牙 RF 摘要</em></div>

<div align="center" markdown>

| 项目 | 数值 |
| :--- | :--- |
| 蓝牙频率范围 | 2402–2480 MHz |
| BLE 最大发射功率 | 19 dBm |
| BLE 发射功率控制范围 | -20 至 19 dBm |
| BLE 1 Mbps 灵敏度 | dirty off 条件下为 -100 dBm；dirty on 条件下为 -99.3 dBm |
| BLE 2 Mbps 灵敏度 | 未施加干扰（dirty off）时 -97 dBm；施加干扰（dirty on）时 -96.5 dBm |
| BR 最大发射功率 | 19 dBm |
| EDR 最大发射功率 | 13 dBm |
| BR 灵敏度 | 未施加干扰（dirty off）时 -96.3 dBm；施加干扰（dirty on）时 -94 dBm |
| EDR2 灵敏度 | 未施加干扰（dirty off）时 -95.5 dBm；施加干扰（dirty on）时 -95 dBm |
| EDR3 灵敏度 | 未施加干扰（dirty off）时 -88.5 dBm；施加干扰（dirty on）时 -87 dBm |

</div>

模组支持 PCB 板载天线，也支持通过 IPEX 兼容连接器连接外部天线。整机必须在最终外壳中验证通信距离和 RF 性能。

### 5.3 用户接口 { #53-user-interfaces }

#### 5.3.1 显示 { #531-display }

LCD 控制器支持 DBI 串行 SPI、Dual-SPI、Quad-SPI、8080、DPI/RGB 和 JDI。官方推荐管脚分配图给出了 LCD_DPI_24、LCD_DPI_8、LCD_QSPI、LCD_8080、E-Paper 和 Raspberry Pi 风格接口的管脚映射。

LCD RGB 信号线需要串 33–100Ω 电阻。RGB、SPI 显示和触摸接口走线应短而一致，TP 等外部接口需要预留 ESD 防护。

!!! info "图 5.3-1：开发板推荐管脚分配图"
    见 DS5602 V0.3 图 7-6。

#### 5.3.2 音频 { #532-audio }

模组引出模拟 DAC 输出、MIC_BIAS、MIC_ADC_IN、I2S 和 PDM 相关管脚。音频 DAC 为 24-bit 输出，支持 8 kHz 至 48 kHz 采样率，SNR 和动态范围均为 109 dB。音频 ADC 为 24-bit Sigma-Delta 输入，支持 8 kHz 至 48 kHz 采样率，SNR 和动态范围均为 99 dB。

模拟音频走线应远离开关电源、LCD 时钟和天线馈线区域。MIC_BIAS 与 MIC_ADC_IN 的滤波器件应靠近麦克风电路放置。

#### 5.3.3 按键 { #533-buttons }

PB32 是 PWRKEY 输入，支持高有效 10 s 长按复位。设计中必须增加 10 kΩ 下拉电阻，并确保运输、深睡和上电过程中该信号不会悬空。

#### 5.3.4 马达和 PWM 负载 { #534-motor-and-pwm-loads }

官方管脚分配图中标注 GPTIM 的管脚支持 PWM 输出。马达、背光、蜂鸣器和其他负载应使用外部驱动，不应由模组 GPIO 直接驱动电感或大电流负载。

### 5.4 存储与连接 { #54-storage-and-connectivity }

#### 5.4.1 存储 { #541-storage }

模组按型号提供不同主 Flash、4+8 MB OPI-PSRAM 和 1 MB 备用 QSPI-NOR Flash。MPI3 可连接外部 SPI NOR 或 SPI NAND，但 PA06–PA11 默认连接模组内部 Flash，外部不可用。SDIO 与 MPI3 共用 I/O，不能同时使用。

#### 5.4.2 传感器 { #542-sensors }

GPADC 支持 12-bit 转换、最高 4MS/s、0–3.3 V 单端输入、-2.1 V 至 +2.1 V 差分输入、软件/硬件触发和 DMA。标注 GPADC_CHx 的管脚支持模拟输入，走线应尽量短并增加必要滤波，同时远离 LCD 和 RF 开关噪声。

#### 5.4.3 UART/I2C { #543-uarti2c }

UART 支持全双工，最高 6 Mbps。I2C 支持 100 kbps、400 kbps、1 Mbps 和 3.4 Mbps 模式。许多 GPIO 可复用为 `PAxx_I2C_UART` 或 `PBxx_I2C_UART`，原理图冻结前必须完成最终复用表。

管脚 6 UART4_TXD 和管脚 7 UART4_RXD 是默认打印串口，并支持程序下载和调试。PA16、PA17 可复用为 DBG_UART，用作程序下载和调试时需要串 100Ω 电阻。

#### 5.4.4 USB、SPI、SDIO 和 I2S { #544-usb-spi-sdio-and-i2s }

USB2.0 FS 支持 Host/Device 并集成 PHY。SPI 支持 SSP/SPI 与 Microwire，HPSYS SPI 最高 48 MHz，LPSYS SPI 最高 24 MHz。SDMMC1 支持 SD 3.0、SDIO 3.0 和 eMMC 4.5.1，包含 SDR 与 DDR 模式；SDMMC2 支持 SD/SDIO/eMMC 的 SDR 模式，最高 48 MHz。I2S 支持主/从、全双工、左对齐/右对齐/标准格式和最高 24-bit PCM 位宽。

### 5.5 生产相关 { #55-manufacturing }

#### 5.5.1 调试 { #551-debug }

管脚 79 SWDIO 和管脚 80 SWCLK 是 SWD 调试/下载接口。早期样机和量产夹具都应保留 SWD 访问能力。除非已有经过验证的替代烧录路径，也应保留默认 UART4 下载/调试通道。

#### 5.5.2 量产 { #552-production }

设计中应预留电源、地、BOOT_MODE、复位/PWRKEY、SWD、UART 下载以及校准或 RF 测试所需接口。量产测试软件应覆盖启动、Flash、显示、触摸、音频、USB、传感器、RF 通信、睡眠/唤醒和电流测试。

## 6. PCB 布局 { #6-pcb-layout }

### 6.1 机械尺寸与 PCB 封装图 { #61-mechanical-and-footprint }

模组尺寸为 18.0 × 32.9 × 3.1 mm。PCB 应使用规格书推荐的封装，并与贴片厂确认焊盘图形、阻焊扩展、钢网开口、禁布区和器件占位边界（courtyard）。

!!! info "图 6.1-1：SF32LB56-MOD 模组尺寸图"
    见 DS5602 V0.3 图 8-1。

!!! info "图 6.1-2：推荐 PCB 封装图"
    见 DS5602 V0.3 图 8-2，单位为 mm。

### 6.2 天线摆放 { #62-antenna-placement }

如果使用 PCB 板载天线，必须预留天线区域，区域内不得放置器件或金属。优先让模组天线区域伸出底板板边，馈点靠近底板板边。

如果天线不能伸出板边，应提供至少 15 mm 净空区域。净空区禁止铺铜、走线和摆放器件，PCB 天线下方的底板区域应尽量切除，以降低底板材料对天线的影响。

!!! info "图 6.2-1：模组推荐摆放示意图"
    见 DS5602 V0.3 图 8-4。

!!! info "图 6.2-2：PCB 天线净空示意图"
    见 DS5602 V0.3 图 8-5。

### 6.3 外部天线连接器 { #63-external-antenna-connector }

外部天线方案可使用与 Hirose U.FL 系列、I-PEX MHF I、Amphenol AMC 兼容的第一代外部天线连接器。

!!! info "图 6.3-1：外部天线连接器尺寸图"
    见 DS5602 V0.3 图 8-3。

### 6.4 PCB 布局核对表 { #64-layout-checklist }

<div align="center"><em>表 6.4-1：PCB 布局核对表</em></div>

<div align="center" markdown>

| 类别 | 检查项 |
| :--- | :--- |
| 电源 | VDD_3V3、VDD_1V8、VDDIO 的 4.7 μF 电容靠近模组管脚。 |
| 地 | 模组地管脚接入低阻抗地系统，高速和 RF 附近有足够地过孔。 |
| 天线 | 天线禁布区无铜、无走线、无器件、无螺丝、无屏蔽罩和外壳金属侵入。 |
| 显示 | LCD RGB/SPI 走线短且一致，并加入所需串联电阻。 |
| USB | USB DP/DM 按差分对布线，ESD 靠近连接器。 |
| 模拟音频 | MIC_BIAS、MIC_ADC_IN 和 DAC 输出远离开关电源、LCD 时钟和 RF 馈线区域。 |
| 调试 | SWD 和 UART 下载/调试接口在样机和量产夹具上可访问。 |

</div>

## 7. 硬件验证 { #7-hardware-validation }

### 7.1 电气特性 { #71-electrical-characteristics }

<div align="center"><em>表 7.1-1：绝对最大额定值</em></div>

<div align="center" markdown>

| 符号 | 描述 | 最小值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V 电源输入 | -0.3 | 3.6 | V |
| VDD_1V8 | 1.8 V 电源输入 | -0.3 | 1.95 | V |
| VDDIO | I/O 电源输入 | -0.3 | 3.6 | V |
| Tstore | 存储温度 | -40 | 125 | °C |

</div>

<div align="center"><em>表 7.1-2：建议工作条件</em></div>

<div align="center" markdown>

| 符号 | 描述 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| VDD_3V3 | 3.3 V 电源输入 | 2.97 | 3.3 | 3.6 | V |
| VDD_1V8 | 1.8 V 电源输入 | 1.7 | 1.8 | 1.95 | V |
| VDDIO | I/O 电源输入 | 1.7 | - | 3.6 | V |
| TA | 工作温度 | -40 | - | 85 | °C |

</div>

<div align="center"><em>表 7.1-3：3.3 V、25°C 直流电气特性</em></div>

<div align="center" markdown>

| 符号 | 参数 | 最小值 | 典型值 | 最大值 | 单位 |
| :--- | :--- | :-: | :-: | :-: | :-: |
| CIN | 管脚电容 | 2.5 | 3 | 3.5 | pF |
| VIH | 高电平输入电压 | 0.7×VDD | - | VDD | V |
| VIL | 低电平输入电压 | VSS | - | 0.3×VDD | V |
| IIH | 高电平输入电流 | - | 10 | 40 | nA |
| IIL | 低电平输入电流 | - | 10 | 40 | nA |
| VOH | 高电平输出电压，高阻负载 | 0.8×VDD | - | VDD | V |
| VOL | 低电平输出电压，高阻负载 | VSS | - | 0.2×VDD | V |
| IOH | 高电平驱动电流 | 24 | 30 | 38 | mA |
| IOL | 低电平驱动电流 | 24 | 30 | 38 | mA |
| RPU | 内部上拉电阻 | 7 | 10 | 20 | kΩ |
| RPD | 内部下拉电阻 | 7 | 10 | 20 | kΩ |
| VIH_nRST | 复位释放电压 | 0.7×VDD | - | VDD | V |
| VIL_nRST | 复位电压 | VSS | - | 0.3×VDD | V |

</div>

VDD 为 I/O 电源。VOH 和 VOL 的测量条件为高阻负载。

### 7.2 功耗 { #72-power-consumption }

<div align="center"><em>表 7.2-1：3.3 V、发射功率（TX Power）为 0 dBm 时的 BT/BLE 电流</em></div>

<div align="center" markdown>

| 模式 | 条件 | 典型电流 |
| :--- | :--- | :-: |
| BT Sniff | 50 ms 间隔 | 196.0 μA |
| BT Sniff | 1 s 间隔 | 13.8 μA |
| BLE ADV | 50 ms 间隔 | 228.7 μA |
| BLE ADV | 1 s 间隔 | 15.7 μA |
| BLE Connection | 50 ms 间隔 | 172.8 μA |
| BLE Connection | 1 s 间隔 | 11.5 μA |
| Scan | Inquiry Scan 或 Page Scan | 36.8 μA |
| Both Scan | Inquiry Scan 和 Page Scan | 64.0 μA |
| Standby | - | 4.6 μA |

</div>

<div align="center"><em>表 7.2-2：处理器电流</em></div>

<div align="center" markdown>

| 负载 | 域 | 频率 | 电流 | 单位频率电流 |
| :--- | :--- | :-: | :-: | :-: |
| CoreMark | HPSYS | 240 MHz | 9.38 mA | 30.92 μA/MHz |
| CoreMark | HPSYS | 192 MHz | 7.90 mA | 30.92 μA/MHz |
| CoreMark | HPSYS | 48 MHz | 0.92 mA | 30.92 μA/MHz |
| CoreMark | LPSYS | 24 MHz | 0.55 mA | 15.13 μA/MHz |
| WhileLoop | HPSYS | 240 MHz | 7.54 mA | 25.75 μA/MHz |
| WhileLoop | HPSYS | 192 MHz | 6.30 mA | 25.75 μA/MHz |
| WhileLoop | HPSYS | 48 MHz | 0.70 mA | 25.75 μA/MHz |
| WhileLoop | LPSYS | 24 MHz | 0.44 mA | 10.63 μA/MHz |

</div>

### 7.3 原理图核对表 { #73-schematic-checklist }

<div align="center"><em>表 7.3-1：原理图设计核对表</em></div>

<div align="center" markdown>

| 序号 | 检查点 |
| :-: | :--- |
| 1 | VDD_3V3 输入范围为 2.97–3.6 V，靠近模组管脚放置 4.7 μF 电容。 |
| 2 | VDD_1V8 输入范围为 1.7–1.95 V，靠近模组管脚放置 4.7 μF 电容。 |
| 3 | VDDIO 输入范围为 1.7–3.6 V，靠近模组管脚放置 4.7 μF 电容。 |
| 4 | 对于规格书规定接口电平为 3.3 V 的模组 I/O，所连接外设的接口电平必须兼容。 |
| 5 | 若模组已配置内部 Flash，PA06、PA07、PA08、PA09、PA10、PA11 不可外接使用。 |
| 6 | SDIO 和 MPI3 共用 I/O，不能同时使用。 |
| 7 | PA50、PA51、PB32、PB35 可在 MCU 睡眠时接收中断。 |
| 8 | PB32 支持高有效 10 s 长按复位，需要 10 kΩ 下拉电阻。 |
| 9 | 标注 GPADC_CHx 的管脚支持 0–3.3 V 模拟输入。 |
| 10 | 标注 GPTIM 的管脚支持 PWM 输出。 |
| 11 | TP 等接口需要 ESD 防护器件。 |
| 12 | LCD RGB 信号线需要串 33–100Ω 电阻。 |
| 13 | PA16、PA17 复用为 DBG_UART 时是程序下载和调试接口，需要串 100Ω 电阻。 |

</div>

### 7.4 存储、搬运与装配 { #74-storage-handling-and-assembly }

<div align="center"><em>表 7.4-1：存储、搬运与装配要求</em></div>

<div align="center" markdown>

| 项目 | 要求 |
| :--- | :--- |
| 密封防潮袋存储 | 存储环境不得结露，温度应低于 40°C、相对湿度应低于 90% RH。 |
| 潮湿敏感度 | MSL 3。 |
| 真空袋开封后 | 应在 25 ± 5°C、60% RH 条件下 168 小时内使用；超过时限则需烘烤后再使用。 |
| HBM ESD | ±2000 V。 |
| CDM ESD | ±500 V。 |
| 回流焊 | 思澈科技（SiFli）建议模组仅进行一次回流焊。 |
| 超声波工艺 | 避免超声波焊接或清洗；振动可能导致内部晶体失效或性能退化。 |

</div>

!!! info "图 7.4-1：回流焊温度曲线图"
    见 DS5602 V0.3 图 9-1。

## 8. 相关文档 { #8-related-documents }

<div align="center"><em>表 8-1：相关文档和产品</em></div>

<div align="center" markdown>

| 类型 | 项目 |
| :--- | :--- |
| 模组规格书 | [DS5602-SF32LB56-MOD 技术规格书 V0.3](https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf) |
| 芯片规格书 | SF32LB56x 芯片技术规格书 |
| 开发板指南 | SF32LB56-DevKit-LCD 使用指南 |
| 芯片 | SF32LB56xV 系列 |
| 模组 | SF32LB56-MOD |
| 开发板 | SF32LB56-DevKit-LCD |

</div>

## 9. 附录 { #appendices }

### 9.1. 附录 A. 管脚规划参考 { #appendix-a-pin-planning-reference }

DS5602 V0.3 提供了完整的 89 个管脚定义表和顶视图管脚布局。下表重点列出对原理图风险、启动/调试访问和共享资源规划影响最大的管脚和信号组。

<div align="center"><em>表 9.1-1：关键管脚和信号组</em></div>

<div align="center" markdown>

| 管脚 / 分组 | 功能 / 约束 |
| :--- | :--- |
| 管脚 6 PB17 | UART4_TXD，默认打印/下载/调试 UART TX。 |
| 管脚 7 PB16 | UART4_RXD，默认打印/下载/调试 UART RX。 |
| 管脚 25 BOOT_MODE | 高电平为下载模式，低电平为用户模式。 |
| 管脚 26 VDD_3V3 | 3.3 V 电源，工作范围 2.97–3.6 V。 |
| 管脚 27 VDD_1V8 | 1.8 V 电源，工作范围 1.7–1.95 V。 |
| 管脚 29 VDDIO | I/O 电源，工作范围 1.7–3.6 V。 |
| 管脚 43/44 | AU_DACP / AU_DACN 差分 DAC 输出。 |
| 管脚 46 MIC_BIAS | 麦克风偏置。 |
| 管脚 47 MIC_ADC_IN | 模拟麦克风 ADC 输入。 |
| 管脚 67–72 PA06–PA11 | 默认连接模组内部 Flash，不可外接使用。 |
| 管脚 79 PB13 | SWDIO 调试/下载。 |
| 管脚 80 PB15 | SWCLK 调试/下载。 |
| PA50、PA51、PB32、PB35 | 支持睡眠中断唤醒。 |
| PA00–PA11 | 接口电平固定为 3.3 V，与 VDDIO 无关。 |

</div>

## 10. 修订历史 { #appendix-b-revision-history }

### 10.1. 指南修订历史 { #guide-revision-history }

<div align="center"><em>表 10.1-1：本文修订历史</em></div>

<div align="center" markdown>

| 版本 | 日期 | 说明 |
| :--- | :--- | :--- |
| 0.1 | 2026-07 | 基于 DS5602-SF32LB56-MOD V0.3 发布 SF32LB56-MOD 模组硬件设计指南初版。 |

</div>

### 10.2. 源规格书修订历史 { #source-datasheet-revision-history }

<div align="center"><em>表 10.2-1：源规格书修订历史</em></div>

<div align="center" markdown>

| 日期 | 版本 | 发布说明 |
| :--- | :--- | :--- |
| 2025-11 | 0.3 | 修改了第四章关于音频 ADC 和 DAC 的描述。 |
| 2025-02 | 0.2 | 修改了模组的管脚等信息。 |
| 2025-01 | 0.1 | 草稿版。 |

</div>
