---
icon: lucide/card-sim
description: "SF32LB56-MOD：基于 SF32LB56xV 的通用低功耗蓝牙（Bluetooth）5.3 MCU 模组系列，标准配置包含合封的 4 MB + 8 MB OPI-PSRAM，并按 SKU 提供不同 Flash 配置。"
tags:
  - 硬件
  - 模组
---

# SF32LB56-MOD { #sf32lb56-mod }

## 概览 { #overview }

SF32LB56-MOD 是思澈科技（SiFli）基于 SF32LB56xV 平台推出的通用低功耗蓝牙（Bluetooth）MCU 模组系列。标准配置采用 SF32LB566VCB36，并合封 4 MB + 8 MB OPI-PSRAM，另配 1 MB QSPI-NOR。模组集成双核 MCU、支持 BLE Audio 的 Bluetooth 5.3、图形加速和音频接口，并提供按 SKU 区分的 Flash 配置；RF 链路也集成在模组中，便于产品设计。

模组集成 RF 链路、晶振和高速存储，并提供两种天线方案：板载 PCB 天线，或通过 IPEX 兼容连接器连接外置天线。整机仍需进行 RF 验证，载板布局也应适配所选方案。模组提供的接口和存储配置可用于满足显示、音频、传感及本地处理需求。

该系列提供多种存储配置，所有型号的尺寸均为 18.0 × 32.9 × 3.1 mm，工作温度范围为 -40 °C 至 +85 °C。[SF32LB56-MOD 硬件设计指南](../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md)以 DS5602 V0.3 为依据，提供了天线与布局方面的详细信息。思澈科技（SiFli）的模组型号指南列出了存储配置，但未说明各 SKU 对应哪种天线方案。确定载板布局前，应向思澈科技（SiFli）确认所选模组的天线配置。

!!! info
    下文中的计算、图形和音频能力描述的是模组采用的 SF32LB56xV 平台；具体功能能否从模组外部使用，取决于 89 引脚接口和引脚复用方案。如需了解芯片家族的架构和完整外设能力，请参见 [SF32LB56x](../chips/SF32LB56x.md)。本页重点介绍模组集成、按 SKU 区分的存储配置、电源轨与产品适配性。

## 应用场景 { #applications }

思澈科技（SiFli）列出的 SF32LB56-MOD 应用场景包括：

- 可穿戴设备：高端智能手表、智能手环、可穿戴医疗器材和健身器材
- 工业领域：高性价比显示方案、图形化人机交互设备、工业传感器控制中心、工业设备监测和仪器仪表
- 车载领域：电动车中控设备、汽车钥匙和可穿戴式车载遥控器
- 家庭自动化：中小型智能家电和智能门锁
- 通用场景：低功耗传感器中枢和蓝牙 Mesh
- AIoT 应用示例：语音命令识别、智能家居、智能钥匙和智能控制面板

如果项目有以下一项或多项需求，可以考虑 SF32LB56-MOD：

- 模组内已集成 RF 链路、天线选项、晶振和高速存储
- 所列 SKU 提供不同的存储配置
- 提供显示、音频、传感和本地处理所需的接口
- 模组尺寸紧凑，适合空间受限的产品

## 开发资源 { #development-resources }

[模组数据手册]: https://downloads.sifli.com/user%20manual/DS5602-SF32LB56-MOD%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[芯片介绍]: ../chips/SF32LB56x.md
[硬件设计指南]: ../../hardware/chip-guides/SF32LB56-MOD_hardware_design_guide.md
[SF32LB56x 硬件设计指南]: ../../hardware/chip-guides/SF32LB56x_hardware_design_guide.md
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[模组数据手册]__
- :fontawesome-solid-microchip: __[芯片介绍]__
- :fontawesome-solid-file-lines: __[硬件设计指南]__
- :fontawesome-solid-file-lines: __[SF32LB56x 硬件设计指南]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specifications }

### 计算与存储 { #compute-and-memory }

- HCPU：Arm Cortex-M33 STAR-MC1，最高 240 MHz，最高 370 DMIPS / 984 EEMBC CoreMark
- LCPU：Arm Cortex-M33 STAR-MC1，最高 96 MHz，最高 148 DMIPS / 394 EEMBC CoreMark
- HCPU 内存系统：32 KB 指令缓存、16 KB 数据缓存和 800 KB SRAM，其中包含 128 KB 保留 SRAM
- LCPU 内存系统：16 KB 指令缓存、8 KB 数据缓存和 160 KB 保留 SRAM
- 两个核心均带单精度 FPU 与 MPU
- 提供神经网络矩阵加速器和信号处理加速器，适合更丰富的本地计算负载

### 无线连接 { #wireless-connectivity }

- 双模蓝牙 5.3，支持 BLE Audio
- 灵敏度：-100 dBm（BLE 1 Mbps）、-96.3 dBm（BR）、-95.5 dBm（EDR2）、-88.5 dBm（EDR3）
- 最大发射功率：19 dBm（BR/BLE）、13 dBm（EDR2/EDR3）
- BR 峰值接收电流：2.2 mA @ 3.3 V

### 图形与显示 { #graphics-and-display }

- ePicasso 2.0 2D/2.5D 图形引擎
- 支持硬件旋转、缩放、镜像和 Alpha 混合
- 图形工作负载最高可达 1024 × 1024
- eZip 2.0 无损图形解压和 eZip-A 动画支持
- 支持 8080、SPI、Dual-SPI、Quad-SPI、DPI/RGB 和 JDI 显示接口
- TurboPixel：extDMA 以固定压缩比对最终帧缓冲区进行有损压缩，再由显示控制器解压，从而降低该工作负载对 PSRAM 带宽和帧缓冲存储容量的需求

### 音频 { #audio }

- 1 路 24 位音频 DAC
- 1 路 24 位 Sigma-Delta 音频 ADC
- 2 路 PDM 接口（PDM1/PDM2），每路支持左、右声道
- 1 路 I2S 接口
- 提供音频采样率转换与 EQ 加速

每路 PDM 接口最多可连接两颗数字麦克风，两路接口合计最多支持四颗。PDM 接口数量不等于麦克风数量；实际连接还受引脚复用和载板布线限制。

### 存储配置与模组型号 { #memory-and-module-variants }

<div align="center"><em>SF32LB56-MOD 存储配置</em></div>

<div align="center" markdown>

| 模组料号 | SKU 对应 Flash | PSRAM | 标准 Flash | 温度 | 尺寸 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB56-MOD-N16R12N1 | 16 MB QSPI-NOR | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-A128R12N1 | 128 MB QSPI-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 18.0 × 32.9 × 3.1 mm |
| SF32LB56-MOD-D128R12N1 | 128 MB SD-NAND | 4 + 8 MB OPI-PSRAM | 1 MB QSPI-NOR | −40 °C 至 +85 °C | 18.0 × 32.9 × 3.1 mm |

</div>

思澈科技（SiFli）的[《模组型号指南》](https://wiki.sifli.com/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.html)列出了上述三种配置，并说明还可按需定制其他型号。选型前，请向思澈科技（SiFli）确认当前可供货的 SKU 及其存储配置。

思澈科技（SiFli）将 SF32LB566VCB36 搭配 4 MB + 8 MB OPI-PSRAM 和 1 MB QSPI-NOR 的方案列为标准配置，其存储组合与 N16R12N1 对应。型号指南未分别标明 A128R12N1 和 D128R12N1 对应的芯片完整料号；选用这两个 SKU 前，请向思澈科技（SiFli）确认所用芯片的准确料号。

### 电源与 I/O { #power-and-io }

- VDD_3V3 推荐工作范围：2.97–3.6 V
- VDD_1V8 推荐工作范围：1.7–1.95 V
- VDDIO 推荐工作范围：1.7–3.6 V
- VDD_3V3、VDD_1V8 与 VDDIO 需同时上电
- PA00–PA11 接口电平固定为 3.3 V，不跟随 VDDIO
- 89 个引脚的模组接口
- 工作温度：−40 °C 至 +85 °C

## 相关产品 { #related-products }

### 芯片 { #chip }

基于 [SF32LB56x](../chips/SF32LB56x.md)，具体对应 SF32LB56xV 平台。若需要查看模组背后的完整架构、显示、音频与封装能力，请转到芯片页面。

### 开发板 { #development-kits }

[SF32LB56-DevKit-LCD](../devkits/SF32LB56-DevKit-LCD.md) 可用于验证显示、音频、存储和外设驱动。开发板文档列出了 N16R12N1 和 A128R12N1 两种配置；在将开发板上的存储配置作为设计基线前，请核对实物模组标识和开发板版本。

### 参考产品 { #reference-products }

思澈科技（SiFli）列出的应用领域包括可穿戴设备、工业显示与 HMI 设备、车载控制产品、智能家电、低功耗传感器中枢和蓝牙 Mesh 产品。
