---
icon: lucide/card-sim
description: "SF32LB58-MOD：基于 SF32LB586VDD36 的低功耗蓝牙（Bluetooth）MCU 模组，标准配置为 16 + 16 MB HPI-PSRAM 和 1 MB QSPI-NOR，并提供 NOR、NAND 或 eMMC 存储配置。"
tags:
  - 硬件
  - 模组
---

# SF32LB58-MOD { #sf32lb58-mod }

## 概览 { #overview }

SF32LB58-MOD 是思澈科技（SiFli）基于 SF32LB586VDD36 推出的低功耗蓝牙（Bluetooth）MCU 模组。标准配置采用 16 + 16 MB HPI-PSRAM 合封存储，并配有 1 MB QSPI-NOR。模组尺寸为 24 × 24 × 3.1 mm，集成三核平台、RF 链路、晶振和多种存储配置，并提供显示、音频、存储与控制所需的外部接口。

该模组将 BGA256 芯片、RF 链路、晶振和高速存储集成在模组上，可减少产品载板上的相关布线。整机仍需进行 RF 性能验证，并满足适用的法规审批要求。确定载板设计前，应确认所选 SKU 的天线选项和存储配置。

根据所选 SKU，模组可采用 HPI-PSRAM 搭配 QSPI-NOR、QSPI-NAND 或 eMMC 的存储组合。它提供的接口适用于既需要显示、音频、存储和连接能力，又希望采用 MCU 级平台的产品。

DS5802 V0.1 列出了模组板载 PCB 天线和外接天线方案。外接天线可通过邮票孔引出，也可连接第一代外部天线连接器；该连接器兼容 Hirose U.FL、I-PEX MHFI 和 Amphenol AMC 连接器。规格书未注明各 SKU 分别采用哪种方案；确定载板布局前，请向思澈科技（SiFli）确认所选模组的天线配置。

!!! info
    如需了解底层芯片家族、架构和外设能力，请参见 [SF32LB58x](../chips/SF32LB58x.md)。本页重点介绍模组级集成、存储配置、电源轨与产品适配性。

## 应用场景 { #applications }

思澈科技（SiFli）列出的 SF32LB58-MOD 应用场景包括：

- 可穿戴设备：高端智能手表、智能手环、可穿戴医疗器材和健身器材
- 工业领域：高性价比显示方案、图形化人机交互设备、工业传感器控制中心、工业设备监测和仪器仪表
- 车载领域：电动车中控设备、汽车钥匙和可穿戴式车载遥控器
- 家庭自动化：中小型智能家电和智能门锁
- 通用场景：低功耗传感器中枢和蓝牙 Mesh
- AIoT 应用示例：语音命令识别、智能家居、智能钥匙和智能控制面板

如果项目需要以下一项或多项能力，可将 SF32LB58-MOD 纳入选型：

- 模组内已集成 BGA256 芯片、RF 链路、晶振和高速存储
- 提供板载 PCB 天线或外接天线方案；外接天线可通过邮票孔或兼容 Hirose U.FL、I-PEX MHFI 和 Amphenol AMC 连接器的接口接入，具体配置需按 SKU 确认
- 不同 SKU 提供 QSPI-NOR、QSPI-NAND 或 eMMC 存储配置
- 提供显示、音频、存储与控制所需的外部接口

## 开发资源 { #development-resources }

[模组数据手册]: https://downloads.sifli.com/user%20manual/DS5802-SF32LB58-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p1.pdf
[芯片介绍]: ../chips/SF32LB58x.md
[硬件设计指南]: ../../hardware/chip-guides/SF32LB58-MOD_hardware_design_guide.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[模组数据手册]__
- :fontawesome-solid-microchip: __[芯片介绍]__
- :fontawesome-solid-file-lines: __[硬件设计指南]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specifications }

### 计算与存储 { #compute-and-memory }

- 2 个 Arm Cortex-M33 STAR-MC1 应用核心，最高 240 MHz
- 1 个用户可编程 Arm Cortex-M33 STAR-MC1 低功耗核心，最高 96 MHz
- 每个应用核心最高 370 DMIPS / 984 EEMBC CoreMark
- 低功耗核心最高 148 DMIPS / 394 EEMBC CoreMark
- 2176 KB SRAM（HCPU）+ 512 KB SRAM（ACPU）+ 1056 KB 保留 SRAM（LCPU）
- 所有核心均带单精度 FPU 与 MPU

### 无线连接 { #wireless-connectivity }

- 双模蓝牙 5.3，支持 BLE Audio
- BLE Long Range 125 kbps 模式下灵敏度低至 -107.5 dBm
- 最大发射功率：19 dBm（BR/BLE）、13 dBm（EDR2/EDR3）
- BR/EDR2/EDR3 峰值接收电流：2.2 mA @ 3.3 V

### 图形、显示与多媒体 { #graphics-display-and-multimedia }

- ePicasso 2.0 2D/2.5D 图形引擎
- Vivante GCNanoUltraV 矢量图形引擎
- 硬件 JPEG 编解码器
- 双 LCD 控制器，支持 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB、MIPI DSI 和 JDI
- TurboPixel：extDMA 以固定压缩比对最终帧缓冲区进行有损压缩，再由显示控制器解压，从而降低该工作负载对 PSRAM 带宽和帧缓冲存储容量的需求
- 两个 LCD 控制器均支持常亮显示（Always-on-display）

### 音频 { #audio }

- 2 路 24 位音频 DAC
- 2 路 24 位 Sigma-Delta 音频 ADC
- 2 路 PDM 接口（PDM1/PDM2）
- 3 路 I2S 接口，均工作于主模式；I2S1 仅支持输入，I2S2 和 I2S3 支持输入与输出
- 模组接口对外提供模拟音频输入 / 输出能力

思澈科技（SiFli）的 [SF32LB58x 硬件设计指南](https://wiki.sifli.com/hardware/SF32LB58x-HW-Application.html)列出两路 PDM 麦克风输入（PDM1、PDM2）。PDM 接口数不等于麦克风数：思澈科技（SiFli）的 [PDM SDK 示例](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/example/multimedia/audio/4pdm/README.html)演示了单路 PDM 通过左右声道接入两颗麦克风，以及使用 PDM1 和 PDM2 接入四颗麦克风。不过，该示例的支持平台列表不包含 SF32LB58-MOD，因此不能据此确认本模组支持四麦克风配置。实际设计时，请核对目标 SDK 支持的麦克风及声道配置、引脚复用和载板布线；不要仅凭两路 PDM 接口推断本模组支持四颗麦克风。

### 存储接口与模组型号 { #storage-interfaces-and-module-variants }

<div align="center"><em>SF32LB58-MOD 模组型号</em></div>

<div align="center" markdown>

| 模组料号 | 可选存储配置 | PSRAM | 标准 Flash | 温度 | 尺寸 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB58-MOD-N16R32N1 | 16 MB QSPI-NOR | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-A128R32N1 | 128 MB QSPI-NAND | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 24 × 24 × 3.1 mm |
| SF32LB58-MOD-E4R32N1 | 4 GB eMMC | 16 + 16 MB HPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 24 × 24 × 3.1 mm |

</div>


思澈科技（SiFli）的[《模组型号指南》](https://wiki.sifli.com/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)列出了上述型号，并说明可按需在模组内贴装 eMMC，也可定制其他配置。请根据所需的存储介质和容量选择 SKU，并向思澈科技（SiFli）确认当前可供货的型号及存储配置；定型前还应确认目标 SDK 和固件支持相应器件及启动/存储路径。

### 电源、封装与 I/O { #power-package-and-io }

- 模组尺寸：24 × 24 × 3.1 mm
- 工作温度：−40 °C 至 +85 °C
- VDD_3V3：2.97–3.6 V
- VDD_1V8：1.7–1.95 V
- VDDIOA / VDDIOA2 / VDDIOB：1.7–3.6 V
- VDD_3V3 为 AVDD33_ANA、AVDD33_AUD 和 AVDD_USB 供电；若模组内贴装 eMMC，也为其 VDD 引脚供电。思澈科技（SiFli）建议该电源轨采用 LDO。
- VDD_1V8 为 PVDD1、PVDD2、AVDD_BRF、AVDD18_DSI 以及合封存储器供电。
- VDDIOA 为除 PA00–PA11 以外的 PA I/O、外部 Flash 以及（若模组内贴装 eMMC）其 VIO 供电；VDDIOA2 为 PA00–PA11 供电；VDDIOB 为 PB I/O 供电。
- 138 引脚模组接口；复用引脚可提供 GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 HS 和音频功能

## 相关产品 { #related-products }

### 芯片 { #chip }

本模组基于 [SF32LB58x](../chips/SF32LB58x.md)。如需了解相关芯片更完整的图形、存储和显示架构，请参见芯片页面。

### 开发板 { #development-kits }

[SF32LB58-DevKit-LCD](../devkits/SF32LB58-DevKit-LCD.md) 是一个实用的起点，可用于固件验证、显示启动调试和音频/存储链路检查，之后再转向围绕该模组的自定义载板设计。

### 参考产品 { #reference-products }

思澈科技（SiFli）列出的应用领域包括可穿戴设备、工业显示与 HMI 设备、车载控制产品、智能家电、低功耗传感器中枢和蓝牙 Mesh 产品。
