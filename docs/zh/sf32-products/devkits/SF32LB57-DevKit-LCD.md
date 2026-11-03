---
icon: lucide/circuit-board
description: "SF32LB57-DevKit-LCD 开发板：面向 RGB 显示、DVP 摄像头、双 PDM 麦克风、扬声器、SDIO Wi-Fi 和 USB 的模组化评估平台。"
tags:
    - Hardware
    - Development board
    - SF32LB57
---

# SF32LB57-DevKit-LCD { #sf32lb57-devkit-lcd }

## 概览 { #overview }

SF32LB57-DevKit-LCD 是一款基于 **SF32LB57-MOD-WD** 的多媒体评估板（该命名似乎表明思澈科技（SiFli）有意将其作为模组产品；**WD** 可能代表 **Wi-Fi Dual-band（双频 Wi-Fi）**，但这一解读尚未经官方确认）。开发板集成 SF32LB57x MCU、SDIO Wi-Fi、启动 Flash 和多种外设接口，适用于智能 HMI、摄像头终端、可视对讲及联网显示产品，可用于在设计载板前验证图形、图像采集、音频和连接能力。

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_T_Look.png" alt="SF32LB57-DevKit-LCD — 正面" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>正面</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png"><img src="assets/sf32lb57x/57DEVKIT_LCD_B_Look.png" alt="SF32LB57-DevKit-LCD — 背面" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>背面</figcaption></figure>
</div>

## 板载资源 { #board-resources }

源文档列出两颗 240 MHz STAR-MC1 性能核，CoreMark 总分为 1968，并配有 592 KB 保持型 SRAM（HPSYS 512 KB + LPSYS 80 KB）。完整多核架构见 [SF32LB57x](../chips/SF32LB57x.md)。模组包含 QSPI-NOR 启动 Flash、依完整型号配置的 OPI-PSRAM、48 MHz MCU 晶体和 40 MHz Wi-Fi 晶体。选择存储配置前，先核对模组丝印。

原文描述的是采用 3.3 V 供电的 SF32LB57x 型号；模组通过邮票孔/焊盘安装到载板上。OPI-PSRAM 为选配项，是否搭载取决于完整模组料号。

<div align="center"><em>板载资源</em></div>

<div align="center" markdown>

| 组件/连接器 | 实现 |
|:---|:---|
| 1 · SF32LB57-MOD-WD | SF32LB57x; QSPI-NOR; OPI-PSRAM（可选）; SDIO Wi-Fi |
| 2 · USB Type-C | CH343P · USB-to-UART |
| 3 · USB Type-C | USB 2.0 FS · PA35 / PA36 |
| 4 · FPC1 | 40P · 0.5 mm · DPI / RGB888 |
| 5 · FPC4 | 24P · 0.5 mm · DCMI / DVP |
| 6 · J6 | MicroSD / TF · 1-bit SDIO |
| 7 · J3 | 40P · 2 × 20 · 2.54 mm · S-2100S40P-S110 |
| 8 · J7 | MX1.25-2P · 8 Ω |
| 9 · S4 | KEY_RSTN |
| 10 · S1–S3 | PA_34 · GPADC_CH6 |
| 11 · LED1–LED3 | AW9523B · P1_1 / P1_2 / P1_3 |
| 12 · U1 | WS2812B · V1.0: PA_11 · V1.1: PA_08 |
| 13 · ANT | IPEX-1 |
| 14 · U11 | AW9523BTOR · 16 IO · I2C |
| 15 · U8 | NS4150B · Class-D |
| 16 · MIC1 / MIC2 | 2 × PDM · MSM261DGT007 / LMD4020T261-AC23 |

</div>

思澈科技（SiFli）将 Wi-Fi 器件标为 AIC8800D40LS-N，部分描述称其为 Wi-Fi/蓝牙组合器件。应将该器件与 SF32 MCU 自带的蓝牙能力区分开；须核对实际无线器件、RF 开关连接和 SDK 驱动，不能据此认定另有一条可直接使用的蓝牙通路。开发板还提供 IPEX-1 天线座，以及 Wi-Fi 电源、唤醒和天线切换控制信号。

![功能框图](assets/sf32lb57x/57DEVKIT_LCD_Block_Diagram.png){ width="100%" loading="lazy" }
<div align="center"><em>功能框图</em></div>

原始框图仅供了解功能，不能作为接线依据：图中画出 TF 数据线 D0–D3，并将 WS2812B 接入 IO 扩展器；正文则说明 TF 使用 1 位 SDIO，WS2812B 由 MCU 的 PA_11/PA_08 直接控制，具体管脚取决于开发板版本。相关连接须对照对应版本的原理图和 SDK 管脚配置核实。

<div style="display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; width: 100%; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-T-Notes.svg" alt="SF32LB57-DevKit-LCD — 正面组件" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>正面组件</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg"><img src="assets/sf32lb57x/57DEVKIT-LCD-B-Notes.svg" alt="SF32LB57-DevKit-LCD — 背面组件" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>背面组件</figcaption></figure>
</div>

## 首次运行 { #getting-started }

验证显示功能需要开发板、兼容的 40 针/0.5 mm DPI-RGB 屏、支持数据传输的 USB 线，以及运行 Windows、Linux 或 macOS 的电脑。还可选配 IPEX-1 天线、DVP 摄像头、MicroSD/TF 卡、8 Ω 扬声器和 J-Link 或 DAP-Link 调试器。若要同时使用 UART 日志和原生 USB，需准备两根数据线。

1. 断电后核对 FPC 的 1 脚、触点朝向和面板电压，再将屏幕连接至 FPC1。无线测试前先装好天线。
2. 将 USB 线接到 USB-to-UART Type-C 接口，而非原生 USB 接口；随后在 SifliTrace 或 Impeller 中选择对应的 COM 口。
3. 下载时先插上 BOOT MODE 跳线帽 J1，再上电或复位；正常运行和查看串口日志时，拔掉 J1 后复位。
4. 先通过串口 hello-world 确认基本通信，再验证纯色显示和触摸（如面板支持）。然后逐项加入摄像头、音频、存储和无线功能，最后测试并发运行与共存情况。

预烧录了出厂固件的开发板可能在上电后显示默认界面，具体表现取决于固件和面板；不能仅凭黑屏就判断下载失败。工具链、环境配置和烧录流程见 [SiFli-SDK 快速入门](../../getting-started/sifli/getting-started-sifli-sdk.md)。

## SDK 编译目标 { #sdk-build-targets }

当前 SDK 编译配置列出以下目标。这些标识可直接用于编译，但不代表每块 SF32LB57-MOD-WD 开发板都适配所有目标；应结合所用 SDK，核对存储、显示、管脚配置及硬件版本。开发板原文未说明 WD 模组各版本与这些目标名称之间的对应关系。

- `sf32lb57-lcd_n16r16_dpi`
- `sf32lb57-lcd_n16r8_dpi`
- `sf32lb57-lcd_n16r16_qspi`

完成 SDK 环境配置后，以下 hello-world 编译命令**仅适用于硬件与 N16R16 DPI 配置相符的情况**。串口 hello-world 编译成功，不代表显示、摄像头或 Wi-Fi 驱动也已验证通过。

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb57-lcd_n16r16_dpi -j8
```

## 供电与调试 { #power-and-debug }

两个 Type-C 接口均可输入 5 V。U4（ETA3425D2G）生成主电源 `VDD_3V3`；U7（ETA3425D2G）生成 `WF_3V3`，并由 `IOEX_WF_PWREN` 独立使能。USB-to-UART 桥接器为 CH343P；另一个接口通过 `PA35`/`PA36` 提供 USB 2.0 FS。SWD 使用 `PA_43`（SWCLK）、`PA_44`（SWDIO）、3.3 V 目标电压参考和共地连接。不得将调试器的 5 V 输出接到 3.3 V 管脚。

开发板 SWD 接线图标明：J3 的 17 脚为 3.3 V，18 脚为 SWCLK，19 脚为 SWDIO，20 脚为 GND。这些编号对应开发板排针，不是调试器转接头；连接两端时应按信号名称一一对应。

![SWD 接线](assets/sf32lb57x/57DEVKIT-LCD-JLINK-Notes.svg){ width="100%" loading="lazy" }
<div align="center"><em>SWD 接线</em></div>

<div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; max-width: 900px; margin: 1rem auto;">
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-JLINK-Adapter.png" alt="SF32LB57-DevKit-LCD — J-Link 转接器" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>J-Link 转接器</figcaption></figure>
<figure style="margin: 0;"><a href="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png"><img src="assets/sf32lb57x/57DEVKIT-LCD-SWD-Adapter.png" alt="SF32LB57-DevKit-LCD — SWD 转接器" loading="lazy" style="display: block; width: 100%; height: auto;"></a><figcaption>SWD 转接器</figcaption></figure>
</div>

## 显示与摄像头 { #display-and-camera }

FPC1 使用 40 针、0.5 mm 间距的 `FPC-05FB-40PH20` 连接器，线序采用正点原子 RGB 标准。默认格式为 RGB888；若面板和固件支持，改用 RGB565/RGB666 可释放部分数据管脚。借助 FreeIO，也可将该接口转接为 QSPI、MCU8080、EPD 或 JDI 进行测试，但需配套转接板、电源连接和固件；这并不表示该接口原生支持 DSI。

原文指出，完整的 24 位 RGB888 需要采用 QFN80 或 BGA112 芯片的模组，并将 ePicasso 3.0 定义为 2D/2.5D 图形加速器。FPC1 的 1 脚为面板背光或屏驱升压电路提供 5 V，并非 3.3 V GPIO。J3 的 3、5 脚提供摄像头/触摸控制器共用的 I2C 总线，对应 PA_23/PA_22。

!!! warning
    源文档列出 ePicasso 3.0 的 2048 × 2048 处理上限，也提到全屏刷新率可达 60 fps，但后文又说明分辨率和刷新率取决于面板。不能据此承诺在 2048 × 2048 分辨率下达到 60 fps；须核对 LCDC 时序、面板接口、帧缓冲和内存带宽，并通过实际负载测试验证。源文档对 FPC1 的 37–40 脚分配也未明确：四个触点对应五个候选控制信号。连接屏幕前，须核对 `57x LCD-DevKit ioconfig-08192026.xlsx` 及对应原理图。

![RGB 屏连接](assets/sf32lb57x/57DEVKIT-LCD-RGB-Panel-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>RGB 屏连接</em></div>

FPC4 是 24 针、0.5 mm 间距的 DCMI DVP 接口。原文列出 GC032A、OV2640、OV5640 和 OV3660，其中默认适配 OV2640/OV5640；使用其他模组时，可能需要依据原理图注释调整供电。摄像头电源包括 `DVDD_1V5`、`DVDD_2V8` 和 `AVDD_2V8`，应按传感器要求选择，不能仅凭连接器判断。DVP 数据线通过跳线选择，并与 Wi-Fi SDIO 或 TF 卡 SDIO 共用部分管脚；默认配置下，这些存在管脚冲突的功能不能同时使用。

三路摄像头电源分别由独立 LDO 供电。正面组件标注图将摄像头接口标为 22P，但正文和 FPC4 管脚表均列为 24 针。查阅本文时以 24 针管脚表为准；连接摄像头前仍须核对实物连接器和原理图。原文对 FPC4 第 6 脚的复位控制也有歧义（IOEX_DVP_PDN/RESET），应先确认接线，不能直接认定复位和掉电信号可独立控制。

![摄像头连接](assets/sf32lb57x/57DEVKIT-LCD-CAM-MOD-Install.png){ width="100%" loading="lazy" }
<div align="center"><em>摄像头连接</em></div>

## 管脚复用与版本核对 { #shared-pins-and-revisions }

- `PA35`/`PA36` 同时用于 FPC1 和原生 USB FS 通路；若面板接线与 USB 设备功能发生冲突，就不能同时启用。
- `PA_43`/`PA_44` 上的 SWD 与显示/摄像头功能复用，应保留调试恢复通路。
- WS2812B 在 V1.0 上使用 `PA_11`，V1.1 改为 `PA_08`。原文同时将 `PA_11` 分配给 `BL_PWM`，驱动 LED 或背光前必须先解决复用冲突。
- J3 的电源/地位置与树莓派 40 针接口兼容，但这不代表兼容树莓派软件环境或所有 HAT。连接扩展板前应核对电压、管脚复用及共享信号。

## 音频、按键与 IO 扩展 { #audio-controls-and-io-expansion }

原文描述的播放通路采用 24 位 DAC，经 U8（NS4150B）单声道 Class-D 功放连接至 J7（`MX1.25-2P`），默认搭配 8 Ω 扬声器。两颗 PDM 麦克风采用 MSM261DGT007 或同封装兼容型号 LMD4020T261-AC23；`PA_56` 为 PDM 时钟，`PA_55` 为 PDM 数据，`IOEX_PDM_PWREN` 控制麦克风电源，`IOEX_AU_PA_EN` 用于使能功放。用于产品设计前，须确认实际音频格式、增益及扬声器负载限制。

S1–S3 共用 `PA_34`/`GPADC_CH6`，原文给出的按键标称电压依次为 2.97 V、2.58 V 和 2.19 V。S4 为低电平有效的 `KEY_RSTN`。U11（AW9523BTOR）通过连接至 `PA_22`（SCL）和 `PA_23`（SDA）的 I2C 总线提供 16 路 IO。下表保留原文所列的初始状态；复位行为和固件初始化仍须在实际板上验证。原表未规定 P0_2/P0_3。

<div align="center"><em>IO 扩展器初始状态</em></div>

<div align="center" markdown>

| 端口 | 信号/标识 | 默认状态 | 方向 | 功能 |
|:---|:---|:---|:---|:---|
| P1_0 | IOEX_2.4G_RFSW | 3.3 V | 输出 | 2.4 GHz 天线切换 |
| P1_1 | IOEX_LED_R | 3.3 V | 输出 | 红色 LED |
| P1_2 | IOEX_LED_G | 3.3 V | 输出 | 绿色 LED |
| P1_3 | IOEX_LED_B | 3.3 V | 输出 | 蓝色 LED |
| P1_4 | IOEX_WF_PWRKEY | 0 V | 输出 | Wi-Fi 模组电源键 |
| P1_5 | IOEX_WF_PWREN | 0 V | 输出 | Wi-Fi 3.3 V 降压电源使能 |
| P1_6 | IOEX_CTP_RST | 0 V | 输出 | 触摸控制器复位 |
| P1_7 | IOEX_LCD_RESET | 0 V | 输出 | LCD 复位 |
| P0_0 | IOEX_USB_DET | Hi-Z | 输入 | USB 插入检测 |
| P0_1 | IOEX_TF_DET | Hi-Z | 输入 | TF 卡插入检测 |
| P0_4 | IOEX_PDM_PWREN | 0 V | 输出 | PDM 麦克风电源使能 |
| P0_5 | IOEX_AU_PA_EN | 0 V | 输出 | 音频功放使能 |
| P0_6 | IOEX_DVP_PDN | 0 V | 输出 | 摄像头掉电控制 |
| P0_7 | IOEX_HST_WAK_WF | 0 V | 输出 | 主机唤醒 Wi-Fi |

</div>

## 连接器参考 { #connector-reference }

!!! warning
    以下表格转录自源文档中的板级连接信息，不能替代原理图。模组摘要包含未完整列出的条目（`58~?`），并将 `PA_00`/`PA_01` 标为 USB_DP/USB_DM，与明确列出的原生 USB 管脚 `PA35`/`PA36` 冲突。须区分模组焊盘编号与 MCU GPIO；这些尚未确认的条目不能直接作为 PCB 设计依据。

<div align="center"><em>模组焊盘摘要——保留源文档未确认项</em></div>

<div align="center" markdown>

| 管脚 | 信号/标识 | 功能 |
|:---|:---|:---|
| 1 | GND | 地 |
| 2 | VDD_3V3 · 3.3 V | 3.3 V 电源输入 |
| 3 | VDD_1V8 · 1.8 V LDO | 内部 LDO 的 1.8 V 输出 |
| 4 | RSTN | 复位，连接复位按键 |
| 5~22 | PA_41 ~ PA_24 | GPIO/LCDC/SPI/SD/调试复用 |
| 23~36 | PA_23 ~ PA_10 | GPIO/I2C/SD/USB/音频/调试复用 |
| 37 | DAC1P | DAC 差分输出 P |
| 38 | DAC1N | DAC 差分输出 N |
| 39 | MICBIAS_PA56 / PDM_CLK | 麦克风偏置/PDM 时钟 |
| 40 | ADC1P_PA55 / PDM_DAT | 音频 ADC 输入 P/PDM 数据 |
| 41 | GND | 地 |
| 42 | PA_00 / USB_DP | GPIO/USB_DP（源文档有冲突，见警告） |
| 43 | PA_01 / USB_DM | GPIO/USB_DM（源文档有冲突，见警告） |
| 44~53 | PA_07 ~ PA_09, PA_06 | GPIO/SD/触摸/USB 检测 |
| 54 | GND | 地 |
| 55 | PA_42 | GPIO |
| 56 | PA_43 / SWCLK | SWCLK/GPIO |
| 57 | PA_44 / SWDIO | SWDIO/GPIO |
| 58~? | PA_45 ~ PA_57 · QFN80 / BGA112 | DPI-RGB 高位数据/PDM/Wi-Fi 唤醒；是否引出取决于模组封装 |

</div>

<div align="center"><em>J3——40 针扩展排针</em></div>

<div align="center" markdown>

| 管脚 | 信号/标识 | 连接/功能 |
|:---|:---|:---|
| 1 | 3V3 | 3.3 V |
| 2 | 5V | 5 V |
| 3 | IO2 / I2C_SDA | PA_23 · I2C_SDA · DVP / CTP |
| 4 | 5V | 5 V |
| 5 | IO3 / I2C_SCL | PA_22 · I2C_SCL · DVP / CTP |
| 6 | GND | GND |
| 7 | IO4 | PA_27 · DPI_R3 |
| 8 | IO14 | PA_26 · DPI_R2 / DVP_PCLK |
| 9 | GND | GND |
| 10 | IO15 | PA_28 · DPI_R4 / GPADC_CH0 |
| 11 | IO17 | PA_29 · DPI_R5 / GPADC_CH1 |
| 12 | IO18 | PA_30 · DPI_R6 / GPADC_CH2 |
| 13 | IO27 | PA_31 · DPI_R7 |
| 14 | GND | GND |
| 15 | IO22 | PA_32 · DPI_G0 / DVP_D4 |
| 16 | IO23 | PA_33 · DPI_G1 / DVP_D0 / WKUP |
| 17 | 3V3 | 3.3 V |
| 18 | IO24 / SWCLK | PA_43 · DPI_B0 / SWCLK / DVP_D3 |
| 19 | IO10 / SWDIO | PA_44 · DPI_B1 / SWDIO / DVP_D1 |
| 20 | GND | GND |
| 21 | IO9 | PA_38 · DPI_G3 / SPI2_DI |
| 22 | IO25 | PA_37 · DPI_G2 / SPI2_DIO |
| 23 | IO11 | PA_40 · DPI_G5 / SPI2_CS |
| 24 | IO8 | PA_39 · DPI_G4 / SPI2_CLK |
| 25 | GND | GND |
| 26 | IO7 | PA_41 · DPI_G6 |
| 27 | IO0 | PA_45 · DPI_B2 / DVP_D2 |
| 28 | IO1 | PA_42 · DPI_G7 |
| 29 | IO5 | PA_46 · DPI_B6 |
| 30 | GND | GND |
| 31 | IO6 | PA_48 · DPI_CLK / SD2_CMD |
| 32 | IO12 | PA_47 · DPI_B7 / SD2_CLK |
| 33 | IO13 | PA_49 · DPI_HSYNC / SD2_DIO0 |
| 34 | GND | GND |
| 35 | IO19 | PA_50 · DPI_DE / SD2_DIO1 |
| 36 | IO16 | PA_51 · DPI_VSYNC |
| 37 | IO26 | PA_52 · DPI_B3 |
| 38 | IO20 | PA_53 · DPI_B4 |
| 39 | GND | GND |
| 40 | IO21 | PA_54 · DPI_B5 |

</div>

<div align="center"><em>FPC1——RGB 显示接口</em></div>

<div align="center" markdown>

| 管脚 | 信号/标识 |
|:---|:---|
| 1 | 5V |
| 2 | GND |
| 3 | PA_24 · DPI_R0 |
| 4 | PA_25 · DPI_R1 |
| 5 | PA_26 · DPI_R2 |
| 6 | PA_27 · DPI_R3 |
| 7 | PA_28 · DPI_R4 |
| 8 | PA_29 · DPI_R5 |
| 9 | PA_30 · DPI_R6 |
| 10 | PA_31 · DPI_R7 |
| 11 | GND |
| 12 | GND |
| 13 | PA_32 · DPI_G0 |
| 14 | PA_33 · DPI_G1 |
| 15 | PA_34 · PWRKEY / GPADC_CH6 |
| 16 | PA_35 · USB_DP |
| 17 | PA_36 · USB_DM |
| 18 | PA_37 · DPI_G2 |
| 19 | PA_38 · DPI_G3 |
| 20 | GND |
| 21 | PA_39 · DPI_G4 |
| 22 | PA_40 · DPI_G5 |
| 23 | PA_41 · DPI_G6 |
| 24 | PA_42 · DPI_G7 |
| 25 | PA_43 · DPI_B0 |
| 26 | PA_44 · DPI_B1 |
| 27 | PA_45 · DPI_B2 |
| 28 | PA_52 · DPI_B3 |
| 29 | PA_53 · DPI_B4 |
| 30 | PA_54 · DPI_B5 |
| 31 | PA_46 · DPI_B6 |
| 32 | PA_47 · DPI_B7 |
| 33 | PA_48 · DPI_CLK |
| 34 | PA_49 · DPI_HSYNC |
| 35 | PA_50 · DPI_DE |
| 36 | PA_51 · DPI_VSYNC |
| 37~40 | 控制信号——须确认分配： PA_11 / BL_PWM, IOEX_CTP_RST, I2C_SDA / PA_23, I2C_SCL / PA_22, IOEX_LCD_RST |

</div>

<div align="center"><em>FPC4——DVP 摄像头接口</em></div>

<div align="center" markdown>

| 管脚 | 信号/标识 |
|:---|:---|
| 1 | NC |
| 2 | GND |
| 3 | I2C_SDA |
| 4 | VDD_2V8 · 2.8 V |
| 5 | I2C_SCL |
| 6 | RESET · IOEX_DVP_PDN/RESET |
| 7 | VSYNC |
| 8 | PWDN · IOEX_DVP_PDN |
| 9 | HSYNC |
| 10 | NC |
| 11 | D0 |
| 12 | D1 |
| 13 | D2 |
| 14 | D3 |
| 15 | D4 |
| 16 | D5 |
| 17 | D6 |
| 18 | D7 |
| 19 | MCLK |
| 20 | PCLK |
| 21 | GND |
| 22 | AVDD_2V8 · 2.8 V |
| 23 | NC |
| 24 | GND |

</div>

## 来源与后续设计 { #related-documents }

定制电路板请参阅 [SF32LB57x 硬件设计指南](../../hardware/chip-guides/SF32LB57x_hardware_design_guide.md)和[量产设计](../../hardware/design-for-production.md)。子系统开发可继续阅读[图形](../../learn/graphics/overview.md)、[音频](../../learn/audio/overview.md)和[蓝牙](../../learn/bluetooth/overview.md)。

- [SiFli SF32LB57x 产品资料](https://wiki.sifli.com/silicon/product-index.html#sf32lb57x)
- [SiFli 用户手册下载目录](https://downloads.sifli.com/user%20manual/)
- [SF32LB57x 原始硬件设计指南](https://wiki.sifli.com/hardware/SF32LB57x-HW-Application.html)

开发板原文注明 SF32LB57x 用户手册尚待发布；目前是否已可下载，请以下载目录为准。

- [原始中文开发板指南](https://wiki.sifli.com/board/sf32lb57x/SF32LB57-DevKit-LCD.html)
- [Markdown 源文件](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/board/sf32lb57x/SF32LB57-DevKit-LCD.md)
- [SDK 编译配置](https://github.com/OpenSiFli/SiFli-SDK/blob/main/build_config_gcc.yaml)
- [屏幕调试工具](https://wiki.sifli.com/tools/%E5%B1%8F%E5%B9%95%E6%A8%A1%E7%BB%84%E8%B0%83%E8%AF%95.html)
- [Impeller 烧录工具](https://wiki.sifli.com/tools/%E7%83%A7%E5%BD%95%E5%B7%A5%E5%85%B7.html)
- [思澈科技（SiFli）官方店铺](https://sifli.taobao.com/)

思澈科技（SiFli）原文建议通过官方店铺购买样品和小批量产品，批量采购需求可联系 sales@sifli.com；原文还提及开源项目样品申请和 QQ 群 674699679。申请资格及当前供货情况须向思澈科技（SiFli）确认。项目需求也可[联系 μForge.io](../../about/contact.md)。
