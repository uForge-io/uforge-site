---
icon: lucide/card-sim
description: "SF32LB52-MOD-1：基于 SF32LB52x 平台的低功耗蓝牙（Bluetooth）5.3 MCU 模组系列，集成 RF 电路和 48 MHz 晶振，天线配置因料号而异。"
tags:
  - 硬件
  - 模组
---

# SF32LB52-MOD-1 { #sf32lb52-mod-1 }

## 概览 { #overview }

SF32LB52-MOD-1 是面向 SF32LB52x 平台的低功耗 MCU 模组，支持蓝牙（Bluetooth）5.3。标准型号 N16R8 采用 SF32LB525UC6。模组尺寸为 27.9 × 18.0 × 3.1 mm，集成双核 Arm Cortex-M33 STAR-MC1 平台、RF 电路和 48 MHz 晶振。天线形式因料号而异：可采用模组板载 PCB 天线，也可通过 IPEX 接口连接外置天线。

DS5203 V0.3 说明模组采用板载 PCB 天线，也说明另有型号支持通过 IPEX 外接天线；但规格书未将天线方案与已列出的存储 SKU 一一对应。确定载板布局前，应向思澈科技（SiFli）确认所选模组的天线配置。整机仍需进行 RF 性能验证，并满足适用的法规审批要求。模组接口可用于实现紧凑型联网产品所需的蓝牙、图形和音频功能。

根据具体料号，模组所采用的芯片还可能合封 OPI-PSRAM。模组引出了 GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO 和 USB 2.0 FS 等接口，并提供模拟音频通路。

!!! info
    如需了解底层芯片家族、架构和外设能力，请参见 [SF32LB52x](../chips/SF32LB52x.md)。本页重点介绍模组级集成、电源、封装与型号选择。

## 应用场景 { #applications }

**SF32LB52-MOD-1 适用于**需要蓝牙、图形与音频能力，同时希望降低 RF 与布局风险的产品，包括：

- 智能手表、运动手环和可穿戴医疗设备
- 蓝牙传感器中枢与联网配件
- 智能门锁、智能家居设备和紧凑型家电
- 小型图形化 HMI 产品
- 车钥匙及可穿戴式遥控设备
- 对成本敏感的联网显示设备

如果项目有以下一项或多项需求，可以考虑 SF32LB52-MOD-1：

- 模组已集成 RF 电路，并提供板载 PCB 天线和 IPEX 外接天线选项
- 可通过模组接口使用芯片平台的蓝牙、图形和音频能力
- 可沿用 SF32LB52x 软件与外设能力
- 采用紧凑的模组形态，适合空间受限的可穿戴设备或 HMI 产品

## 开发资源 { #development-resources }

[模组数据手册]: https://downloads.sifli.com/user%20manual/DS5203-SF32LB52-MOD-1%E6%8A%80%E6%9C%AF%E8%A7%84%E6%A0%BC%E4%B9%A6%20V0p3.pdf
[芯片介绍]: ../chips/SF32LB52x.md
[硬件设计指南]: ../../hardware/chip-guides/SF32LB52-MOD-1_hardware_design_guide.md
[原始设计指南（wiki.sifli.com，EPD 版本）]: https://wiki.sifli.com/hardware/SF32LB52-MOD-1-EPD-HW-Application.html
[购买样品]: https://sifli.taobao.com/
[购买开发板]: https://sifli.taobao.com/

<div class="grid cards" markdown>

- :fontawesome-solid-file-pdf: __[模组数据手册]__
- :fontawesome-solid-microchip: __[芯片介绍]__
- :fontawesome-solid-file-lines: __[硬件设计指南]__
- :fontawesome-solid-file-lines: __[原始设计指南（wiki.sifli.com，EPD 版本）]__
- :fontawesome-solid-cart-shopping: __[购买样品]__
- :fontawesome-solid-cart-shopping: __[购买开发板]__

</div>

---

## 特性与规格 { #features-and-specifications }

### 计算与存储 { #compute-and-memory }

- Arm Cortex-M33 STAR-MC1 应用核心（HCPU），最高 240 MHz，最高 370 DMIPS / 984 EEMBC CoreMark
- 32 KB 指令缓存和 16 KB 数据缓存
- 512 KB 保留 SRAM
- 专用超低功耗 Arm Cortex-M33 STAR-MC1 核心（LCPU），最高 24 MHz，带 64 KB 保留 SRAM
- 两个核心均带单精度 FPU 与 MPU
- 部分模组 SKU 所采用的芯片提供合封 OPI-PSRAM

### 无线连接 { #wireless-connectivity }

- 双模蓝牙 5.3，支持 BLE Audio
- 灵敏度：-100 dBm（BLE/1 Mbps）、-96.3 dBm（BR）、-95.5 dBm（EDR2）
- 最大发射功率：19 dBm（BR/BLE）、13 dBm（EDR2/EDR3）
- BR 峰值接收电流：2.4 mA @ 3.8 V

### 图形与显示 { #graphics-and-display }

- ePicasso 2.0 2D/2.5D 图形引擎
- eZip 2.0 无损图形解压加速器
- LCD 控制器支持 8080、SPI、Dual-SPI 与 Quad-SPI 接口
- 适合手表式或小型 HMI 显示产品

### 音频 { #audio }

- 1 路 24 位音频 DAC
- 1 路 24 位 Sigma-Delta 音频 ADC
- 1 路 I2S 接口
- 1 路 PDM 接口
- 模组接口对外提供模拟音频输入 / 输出能力

1 路 PDM 接口最多可连接两颗数字麦克风，因此 PDM 接口数量不等于麦克风数量。实际连接方式取决于引脚复用和载板布线。对于该模组，若选配的 32.768 kHz 晶体已贴装，PA22/PA23 将无法从模组外部访问；硬件设计指南中还列出了另一组可复用为 PDM 的引脚。

### 存储接口 { #storage-interfaces }

- 部分 SKU 所采用的芯片提供合封 OPI-PSRAM
- 1 路 MPI（QSPI），用于连接外部 SPI NOR 或 SPI NAND Flash
- 1 路 SD/SDIO，支持 SD 3.0、SDIO 3.0 与 eMMC

### 安全 { #security }

- AES、HASH 与 CRC 硬件加速器
- 真随机数发生器（TRNG）
- 通过 PSA Certified Level 1 认证

### 电源、封装与 I/O { #power-package-and-io }

- 模组尺寸：27.9 × 18.0 × 3.1 mm
- 工作温度：−40 °C 至 +85 °C
- VSYS：锂离子电池直接供电时为 3.2–4.7 V；使用稳压电源时为 3.7–4.7 V，推荐 3.8 V。
- IO 电压：3.3 V
- VBATS：电池电压检测/ADC 输入，范围为 0–4.7 V。待测电压应直接接入 VBATS，不要使用外部分压电阻。
- VDD33_VOUT2：模组内 3.3 V LDO 输出，可为外设供电；默认无输出，需经软件配置后启用。最大输出电流为 150 mA，电源轨总电容不得超过 7.4 µF。
- 68 引脚模组接口；信号引脚可复用为 GPIO、SPI、LCD、MPI、UART、I2C、PWM、SDIO、USB 2.0 FS 以及数字和模拟音频功能

## 模组型号 { #module-variants }

<div align="center"><em>SF32LB52-MOD-1 模组型号</em></div>

<div align="center" markdown>

| 模组料号 | 芯片 | Flash | PSRAM | 温度 | 尺寸 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SF32LB52-MOD-1-N16R8 | SF32LB525UC6 | 16 MB QSPI-NOR | 8 MB OPI-PSRAM | −40 °C 至 +85 °C | 27.9 × 18.0 × 3.1 mm |
| SF32LB52-MOD-1-A128R16 | SF32LB527UD6 | 128 MB SPI-NAND | 16 MB OPI-PSRAM | −40 °C 至 +85 °C | 27.9 × 18.0 × 3.1 mm |

</div>

思澈科技（SiFli）的[模组型号指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)和电子纸应用指南也列出了 A128R16，但本页链接的 DS5203 V0.3 技术规格书仅列出 N16R8。选择 A128R16 前，请向思澈科技（SiFli）确认当前供货状态及存储配置。

A128R16 的 Flash 标注在官方资料中存在差异：[OpenSiFli 模组型号指南](https://github.com/OpenSiFli/SiFli-Wiki/blob/main/source/zh_CN/silicon/%E6%A8%A1%E7%BB%84%E5%9E%8B%E5%8F%B7%E6%8C%87%E5%8D%97.md)将其列为 128 MB SPI-NAND，而思澈科技（SiFli）的[开发板型号指南](https://wiki.sifli.com/board/devkit_guide.html)将对应开发板 SKU 列为 128 MB QSPI-NAND。资料未说明差异是指实装器件还是接口表述。将开发板配置作为模组设计依据前，请按具体板卡版本核对原理图/BOM 中的 Flash 器件和总线模式。

## 相关产品 { #related-products }

### 芯片 { #chip }

如需了解 [SF32LB52x](../chips/SF32LB52x.md) 家族的架构与外设，请参见芯片页面；各模组料号对应的芯片和存储配置见上方型号表。

### 开发板 { #development-kits }

[SF32LB52-DevKit-LCD](../devkits/SF32LB52-DevKit-LCD.md)、[SF32LB52-DevKit-Core-3p3](../devkits/SF32LB52-DevKit-Core-3p3.md)、[SF32LB52-DevKit-Nano](../devkits/SF32LB52-DevKit-Nano.md) 和 [SF32LB52-DevKit-ULP](../devkits/SF32LB52-DevKit-ULP.md) 都适合作为固件验证与功能评估的起点，然后再转入基于模组的载板设计。

### 参考产品 { #reference-products }

典型终端产品包括入门级至中端智能手表、运动手环、蓝牙传感器中枢、智能门锁和紧凑型图形化 HMI 设备。
