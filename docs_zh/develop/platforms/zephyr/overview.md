---
icon: lucide/layers
description: "OpenSiFli 针对 SF32LB52 DevKit LCD 的下游 Zephyr 支持：开发板标识、配置边界、驱动覆盖范围和集成风险。"
tags:
    - 开发
    - Zephyr
---

# Zephyr { #zephyr }

OpenSiFli 正在 [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream) 和 [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream) 中持续推进 Zephyr 支持。下游代码树包含 `sf32lb52_devkit_lcd` 开发板、思澈科技（SiFli） HAL 集成、SF32LB52 设备树（devicetree）文件、驱动、测试和示例 overlay 配置。

如果你希望使用 Zephyr API、设备树（devicetree）、Kconfig 和可移植的 RTOS 架构，或希望采用可与 ArduinoCore-zephyr 衔接的开发路径，可以选择 Zephyr。若当前优先考虑更完整的厂商功能支持，应选择 SiFli-SDK。

工作区设置、首次构建 `hello_world`、烧录和串口验证请参阅 [Zephyr 下游版本快速开始](../../../getting-started/zephyr/getting-started-zephyr-upstream.md)。本页介绍首次运行基线成功后的下游平台。

主要参考资料：

- [OpenSiFli/zephyr-downstream](https://github.com/OpenSiFli/zephyr-downstream)
- [OpenSiFli/zephyr-hal_sifli-downstream](https://github.com/OpenSiFli/zephyr-hal_sifli-downstream)
- [Zephyr project documentation](https://docs.zephyrproject.org/)
- [Zephyr 开发板文档中的 SF32LB52-DevKit-LCD](https://docs.zephyrproject.org/latest/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)

## 已验证的下游开发板 { #verified-downstream-board }

<div align="center"><em>表：已验证的下游开发板</em></div>

<div align="center" markdown>

| 项目 | 数值 |
|:-----|:-----|
| 开发板 | `sf32lb52_devkit_lcd` |
| 全名 | SF32LB52-DevKit-LCD |
| SoC | `sf32lb525uc6` |
| 烧录工具（runner） | `sftool` |
| runner 参数 | `--chip=SF32LB52` |
| 串口控制台 | `usart1` |
| 串口控制台波特率 | `1000000` baud |
| 所选显示设备树节点 | `co5300` |

</div>

下游开发板文档将其描述为采用 SF32LB52x-MOD-N16R8 模块，配备 8 MB OPI-PSRAM、128 Mb QSPI-NOR、48 MHz 和 32.768 kHz 晶振，并支持显示、音频、USB 和 microSD 等硬件功能。

## 配置边界 { #configuration-boundaries }

开发板目标（target）、设备树（devicetree）、Kconfig 配置、覆盖层（overlay）和下游 HAL 修订版共同构成兼容性边界。请为每个项目固定下游修订版，并将应用的覆盖层和配置片段与应用源码一同纳入版本控制。

不要把 Arduino 或 SiFli-SDK 项目的开发板名称、引脚映射或 runner 设置直接复制到 Zephyr。即使运行在同一块物理开发板上，三条路径也使用不同的配置模型。

## 开发板硬件说明 { #board-hardware-notes }

下游开发板文档列出了以下硬件特征：

- 基于 SF32LB525UC6 的 SF32LB52x-MOD-N16R8 模组
- 8 MB OPI-PSRAM
- 128 Mb QSPI-NOR
- 48 MHz 和 32.768 kHz 晶振
- SPI/DSPI/QSPI 和 MCU/8080 显示接口
- I2C 触摸支持
- 模拟麦克风输入，以及带板载 Class-D PA 的模拟音频输出
- 用于 USB-to-serial 和 USB 2.0 FS 的 USB Type-C 接口
- 通过 SPI 连接的 microSD

## 下游仓库中已有的驱动领域 { #driver-areas-present-in-the-downstream-tree }

下游代码树包含 SF32LB 相关驱动、设备树绑定和开发板专用示例配置，涉及以下领域：

- GPIO、pinctrl、UART、I2C、SPI、ADC、PWM、RTC、watchdog
- Flash、内存控制器、OPI PSRAM、QSPI NOR
- 显示、LCDC、MIPI DBI 及 LVGL 示例配置
- 蓝牙（Bluetooth）HCI 邮箱和 BAP 广播接收端配置
- 音频编解码器、DMA、CRC、加密、熵源、OTP / eFuse、稳压器、复位和温度传感器

代码树中存在相关驱动、绑定或示例配置，并不代表每种产品场景都已具备量产条件。请在目标开发板上验证具体的示例与驱动组合。

## 集成顺序 { #integration-sequence }

首次启动验证通过后，应一次验证一个子系统：开发板 I/O、UART 行为、显示、存储、蓝牙、音频和电源管理。每个检查点都应保留示例、overlay、Kconfig 片段、下游修订版和串口日志。代码树中存在相关驱动，并不代表完整应用组合已达到量产就绪状态。

## 下游仓库风险检查清单 { #downstream-risk-checklist }

- 你当前使用的是 OpenSiFli 下游仓库，而不是上游 Zephyr 吗？
- HAL 版本是否已经固定？
- `west flash` 是否确实调用了预期的 `sftool` runner？
- 控制台是否按 `1000000` baud 配置？
- 示例需要的 overlay 是否已经包含？
- 相关驱动是“已有测试支持”，还是只是“代码存在于树中”？
