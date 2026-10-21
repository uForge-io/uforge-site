---
icon: lucide/terminal
description: "从开箱的 SF32 开发板开始，通过 SiFli-SDK 安装工具链、使用 scons 构建，并经 UART 烧录和运行 hello_world。"
tags:
    - 快速开始
    - SiFli-SDK
---

# SiFli-SDK { #sifli-sdk }

本指南从一块刚拆箱的 SF32 开发板开始，使用面向 SF32 器件的、基于 RT-Thread 的官方 SDK **SiFli-SDK**，通过 UART 跑通 `hello_world` 示例。

即使计划使用 Arduino、Zephyr 或 MicroPython，也建议先完整走一遍本指南。这样可以在引入其他框架前，先确认开发板、数据线、串口、烧录流程和基础工具链都能正常工作。

## 你需要准备什么 { #what-youll-need }

**硬件**

- 一块 SF32 开发板，例如 [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md)，或通过[SF32 系列](../../sf32-products/family/SF32_family.md)确定的其他开发板。
- 一根连接到开发板 USB-to-UART 端口的 USB Type-C **数据线**，不能使用仅支持充电的线，也不要接到另一个 USB 功能端口。
- 一台运行 Windows、macOS 或 Linux 的电脑。

**软件**

- [git](https://git-scm.com/)
- 通过 [`uv`](https://docs.astral.sh/uv/getting-started/installation/) 安装的 C/C++ 工具链（SiFli-SDK 安装脚本会为你获取编译器、调试器和 Python 环境）
- [SiFli-SDK](https://github.com/OpenSiFli/SiFli-SDK) 仓库本身

**官方参考资料**

- [SiFli-SDK 安装指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)
- [SiFli-SDK 支持的开发板](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)
- [OpenSiFli SiFli-SDK 仓库](https://github.com/OpenSiFli/SiFli-SDK)
- [OpenSiFli SiFli-SDK 发布版本](https://github.com/OpenSiFli/SiFli-SDK/releases)

!!! tip "更想用 IDE？"
    思澈科技（SiFli）还提供了 VS Code 扩展 **SiFli-SDK-CodeKit**，把 SDK 安装、构建和烧录流程封装成了引导式操作。如果你更喜欢 IDE 工作流，可以参考 [SiFli CodeKit](getting-started-sifli-codekit.md)。

## 安装工具链 { #install-the-toolchain }

为保证基线可复现，请使用已发布的 tag，而不是 `main`。截至本次核对，最新发布 tag 为 `v2.5.1`；开始前请查看[官方发布列表](https://github.com/OpenSiFli/SiFli-SDK/releases)，确认是否已有更新版本。`release/v2.5` 分支会继续接收该发布线的更新，但分支内容可能变化。

=== "macOS / Linux"

    先安装 `uv`。SiFli-SDK 的脚本基于这个包和环境管理工具运行：

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

    然后克隆 SDK：

    ```bash
    mkdir -p ~/OpenSiFli && cd ~/OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    运行安装脚本，然后在当前 Shell 中加载 SDK 环境：

    ```bash
    cd SiFli-SDK
    ./install.sh
    . ./export.sh
    ```

=== "Windows"

    安装 `uv`（PowerShell）：

    ```powershell
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    克隆 SDK：

    ```powershell
    mkdir C:\OpenSiFli
    cd C:\OpenSiFli
    git clone --recursive -b v2.5.1 https://github.com/OpenSiFli/SiFli-SDK
    ```

    运行安装脚本，然后加载 SDK 环境：

    ```powershell
    cd SiFli-SDK
    .\install.ps1
    .\export.ps1
    ```

!!! info "SiFli-SDK 包含子模块"
    GitHub 的 “Download ZIP” 不包含所需子模块。请使用 `git clone --recursive`。如果已克隆 SDK 但未获取子模块，请在 SDK 根目录运行 `git submodule update --init --recursive`。

!!! note "在中国大陆环境下工作？"
    安装前，请在当前 Shell 中将 `SIFLI_SDK_MIRROR_CHINA` 设为 `1`：macOS/Linux 使用 `export SIFLI_SDK_MIRROR_CHINA=1`，PowerShell 使用 `$env:SIFLI_SDK_MIRROR_CHINA = "1"`。也可以从 [Gitee 镜像](https://gitee.com/SiFli/sifli-sdk)克隆，而不是从 GitHub 克隆。详情请参阅[安装指南](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/quickstart/install/index.html)。

`install.sh` / `install.ps1` 会下载匹配版本的编译器、调试器和 Python 依赖。SDK 版本变化后，建议重新运行。`export.sh` / `export.ps1` 会在当前终端激活该环境；每次新开终端构建前，都需要重新执行。Windows 上请在 PowerShell 中运行 `.ps1` 脚本。

## 选择开发板构建目标 { #choose-the-board-target }

传给 `scons --board` 的值就是 `customer/boards` 下对应的开发板目录名。请按手中开发板实际搭载的存储器和屏幕配置选择目标；以下名称区分大小写。

<div align="center" markdown>

*SiFli-SDK 开发板构建目标*

| 开发板 | 精确的 `scons --board` 目标 |
| --- | --- |
| SF32LB52-DevKit-Core-3p3 | `sf32lb52-core_e8r16`<br>`sf32lb52-core_n16r16` |
| SF32LB52-DevKit-LCD | `sf32lb52-lcd_52d`<br>`sf32lb52-lcd_n16r8`<br>`sf32lb52-lcd_a128r16` |
| SF32LB52-DevKit-Nano | `sf32lb52-nano_n4`<br>`sf32lb52-nano_n16r16`<br>`sf32lb52-nano_a128r16` |
| 黄山派（SF32LB52-LCHSPI-ULP） | `sf32lb52-lchspi-ulp` |
| SF32LB56-DevKit-LCD | `sf32lb56-lcd_a128r12n1`<br>`sf32lb56-lcd_n16r12n1` |
| SF32LB58-DevKit-LCD | `sf32lb58-lcd_a128r32n1_dsi`<br>`sf32lb58-lcd_a128r32n1_qspi`<br>`sf32lb58-lcd_n16r32n1_dpi`<br>`sf32lb58-lcd_n16r32n1_dsi`<br>`sf32lb58-lcd_n16r32n1_qspi`<br>`sf32lb58-lcd_n16r64n4` |

</div>

对于双核开发板，省略内核后缀时默认构建 HCPU 配置。需要时可显式指定 `_hcpu`；如需构建 LCPU 配置，则追加 `_lcpu`，例如 `scons --board=eh-lb551_lcpu`。如果表中没有你的开发板配置，请查阅思澈科技（SiFli）的[支持开发板列表](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)，以获取最新信息。

## 构建“Hello World”示例 { #build-the-hello-world-example }

环境加载完成后，用下面的命令为你的开发板构建 RT-Thread `hello_world` 示例：

```bash
cd example/get-started/hello_world/rtt/project
scons --board=sf32lb52-lcd_n16r8 -j8
```

将 `sf32lb52-lcd_n16r8` 替换为你的开发板名称。可用名称请参考[支持的开发板列表](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)。`-j8` 表示使用 8 个并行任务构建，可按电脑性能调整。本示例未指定内核后缀，因此默认构建 HCPU，生成的二进制文件位于 `build_sf32lb52-lcd_n16r8_hcpu/`。如果在目标名称中显式指定 `_lcpu`，输出目录也会使用 `_lcpu` 后缀。

!!! tip "需要自定义配置？"
    在工程目录下运行 `sdk.py menuconfig --board=<board_name>` 打开交互式配置菜单。按 ++esc++ 两次后，根据提示选择保存配置并退出。

## 给开发板烧录固件 { #flash-the-board }

保持开发板通过 USB 连到电脑，然后运行构建生成的下载脚本：

=== "macOS / Linux"

    ```bash
    ./build_sf32lb52-lcd_n16r8_hcpu/uart_download.sh
    ```

    脚本提示输入串口时，请填写操作系统显示的串口设备路径。macOS 使用 `/dev/cu.*` 设备（例如 `/dev/cu.usbserial-12345678`），不要使用 `/dev/tty.*`；Linux 则填写对应的设备路径，例如 `/dev/ttyUSB0`。

=== "Windows"

    ```powershell
    build_sf32lb52-lcd_n16r8_hcpu\uart_download.bat
    ```

    当提示 `please input serial port number` 时，只输入 COM 口的数字部分即可，例如 `COM19` 就输入 `19`，然后按 Enter。

!!! tip
    如果下载工具无法进入 UART 下载模式，请在开始传输前立即复位开发板。问题仍未解决时，请按对应开发板的烧录说明排查。

## 查看程序运行结果 { #see-it-run }

烧录完成后，手动复位开发板或等待其自动复位。然后使用串口终端以开发板默认波特率连接相应串口。此时应能看到启动日志和 `hello_world` 示例通过 UART 输出的内容。

## 成功判定标准 { #success-check }

满足以下条件后，就可以继续下一步：

- 工程能够无报错构建完成。
- UART 下载脚本执行成功。
- 串口控制台能看到可读的启动输出。
- 开发板复位后能打印 `hello_world` 示例内容。

## 接下来可以做什么 { #where-to-go-next }

- **挑选芯片：** 在 [SF32 系列概览](../../sf32-products/family/SF32_family.md)中比较 LB52、LB55、LB56 和 LB58 系列。
- **探索更多示例：** 除了 `hello_world`，SDK 还自带 BLE、经典蓝牙（Bluetooth）、LVGL 图形、音频和低功耗示例。
- **尝试其他框架：** 接下来可继续看 [Arduino](../arduino/getting-started-arduino.md)、[Zephyr](../zephyr/getting-started-zephyr-upstream.md) 或 [MicroPython](../micropython/getting-started-micropython.md)。
- **遇到问题：** 可以先查 [SiFli FAQ](https://wiki.sifli.com/en/faq/index.html) 中关于工具链、J-Link 和调试的常见问题。

## 让配置可复现 { #what-sifli-should-add }

请记录 SiFli-SDK 的 tag 或分支、准确的 `scons --board` target、主机操作系统、串口端口，以及适用于当前开发板的下载流程。升级 SDK 或更换开发板时，请重新核对官方[支持开发板列表](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)和[发布列表](https://github.com/OpenSiFli/SiFli-SDK/releases)。
