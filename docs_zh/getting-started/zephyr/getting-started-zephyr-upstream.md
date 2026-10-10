---
icon: lucide/layers
description: "构建并烧录 Zephyr 上游支持的 SF32LB52 DevKit LCD 开发板目标，然后检查文档记录的控制台设置和受支持功能。"
tags:
    - 入门
    - Zephyr
---

# Zephyr 上游版本 { #zephyr-upstream }

自 Zephyr v4.3.0 起，上游 Zephyr 已提供并持续维护 `sf32lb52_devkit_lcd` 开发板支持。请参阅 [v4.3.0 发布说明](https://docs.zephyrproject.org/4.3.0/releases/release-notes-4.3.html)和 [SF32LB52 DevKit LCD 开发板文档](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)。本指南将创建 v4.3.0 工作区、构建首个示例并烧录开发板。如果需要更完整的 SF32 官方功能支持，请使用 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md)。

!!! note "检查开发板功能列表"
    上游开发板定义本身并不能证明所有外设或工作模式都已启用，或已针对产品完成验证。请查看开发板文档中的受支持功能表，并在目标硬件的具体版本上验证所需行为。

## 所需条件 { #what-youll-need }

**硬件**

- SF32LB52 DevKit LCD，采用 SF32LB52x-MOD-N16R8 模组和 SF32LB525UC6，配备 8 MB OPI-PSRAM 与 128 Mb QSPI-NOR。
- USB Type-C 数据线，通过开发板的 USB 转 UART 链路连接。

**软件**

- Zephyr v4.3.0 支持的主机操作系统，并按其[入门指南](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)进行配置。
- 按该指南为 ARM Cortex-M 目标安装 Zephyr 主机依赖项和 Zephyr SDK。
- Git、Python 3 和 `pip`。

## 准备工具链 { #prepare-the-tooling }

先按照 Zephyr 的 [v4.3.0 入门指南](https://docs.zephyrproject.org/4.3.0/develop/getting_started/index.html)完成主机依赖项和 Zephyr SDK 的安装。然后创建 Python 环境，并从对应的 Zephyr tag 初始化工作区：

```bash
python3 -m venv ~/zephyr-venv
source ~/zephyr-venv/bin/activate
pip install west
west init -m https://github.com/zephyrproject-rtos/zephyr --mr v4.3.0 ~/zephyrproject
cd ~/zephyrproject
west update
west zephyr-export
pip install -r zephyr/scripts/requirements.txt
```

执行下方构建和烧录步骤时，请保持此 Python 环境处于激活状态。

## 确认开发板 { #confirm-the-board }

检查工作区是否包含该目标：

```bash
west boards
```

预期开发板名称：

```text
sf32lb52_devkit_lcd
```

## 构建 Hello World { #build-hello-world }

构建 Zephyr 标准 Hello World 示例：

```bash
west build -b sf32lb52_devkit_lcd samples/hello_world --pristine
```

构建成功表示工作区中已有可用的开发板目标和工具链，但并不代表所有开发板外设都已验证。

## 烧录开发板 { #flash-the-board }

上游开发板默认使用 `sftool` 烧录 runner。请安装 [OpenSiFli sftool](https://github.com/OpenSiFli/sftool)，确保它位于 `PATH` 中，并按照开发板文档所述步骤使开发板进入串口下载模式。然后运行：

```bash
west flash
```

如果烧录失败，请检查串口选择、下载模式，以及[开发板文档](https://docs.zephyrproject.org/4.3.0/boards/sifli/sf32lb52_devkit_lcd/doc/index.html)中的 runner 说明。

## 打开串口控制台 { #open-the-serial-console }

上游开发板配置将 Zephyr 控制台路由到 `usart1`，波特率为 `1000000`。使用串口终端打开该 UART，并检查是否输出：

```text
Hello World! sf32lb52_devkit_lcd
```

## 选择下一个示例 { #choose-a-next-sample }

结合上游开发板文档中的受支持功能表和 [Zephyr 示例目录](https://docs.zephyrproject.org/4.3.0/samples/index.html)，选择接下来要评估的 API 或外设。请先确认该开发板支持相应功能，并启用了所需配置；不要把示例能够运行直接当作产品级验证的依据。

## 故障排查 { #troubleshooting }

<div align="center"><em>表：故障排查</em></div>

<div align="center" markdown>

| 现象 | 检查项 |
|:-----|:-------|
| `west boards` 中未显示 SF32 目标 | 确认工作区使用上游 Zephyr v4.3.0 或更高版本初始化，并且 `west update` 已完成。 |
| 编译开始前构建即失败 | 确认 Python 环境已激活、已为 ARM Cortex-M 安装 Zephyr SDK，并已安装 v4.3.0 所需依赖项。 |
| 开发板构建成功但无法烧录 | 确认已安装 `sftool` 且其位于 `PATH` 中，串口选择正确，并且开发板处于串口下载模式。 |
| 串口没有输出 | 检查 `usart1`、`1000000` 波特率、USB 转 UART 连接，以及该串口是否已被其他终端占用。 |
| 外设示例运行失败 | 查看开发板的受支持功能表和示例配置；不要假设基础开发板目标已启用所有外设。 |

</div>

## 产品集成前的检查 { #before-product-integration }

- 查看上游开发板的受支持功能表，以及计划使用的具体示例配置。
- 在目标开发板和产品配置上验证所需接口、性能、内存用量和功耗表现；Hello World 构建成功仅能作为工具链冒烟测试。
- 如果设计依赖的能力未列出或尚未在该 Zephyr 目标上验证，请将上游功能范围与 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md) 进行比较。
