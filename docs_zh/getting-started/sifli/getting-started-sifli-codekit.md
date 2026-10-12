---
icon: lucide/app-window
description: "介绍如何在 VS Code 中首次使用 SiFli CodeKit：安装扩展、选择 SF32 开发板、构建并烧录 hello_world，再打开串口控制台。"
tags:
    - 快速开始
    - SiFli CodeKit
    - VS Code
---

# SiFli CodeKit { #sifli-codekit }

SiFli CodeKit 是面向 SiFli-SDK 开发的 VS Code 扩展，提供安装 SDK 工具、选择开发板、构建示例、烧录固件和打开串口控制台等引导操作。

如果你更喜欢 IDE 工作流，可以走这条路径；如果你想理解这些按钮背后实际执行的命令，则更适合阅读[手动版 SiFli-SDK 指南](getting-started-sifli-sdk.md)。

本页介绍首次使用流程。`hello_world` 跑通后，可继续阅读 [CodeKit 工具参考](../../develop/tools/codekit.md)，了解 CodeKit 在日常开发中的作用、如何保持开发环境可复现，以及遇到问题时哪些情况可由 CodeKit 处理、哪些需要手动排查。

## 你需要准备什么 { #what-youll-need }

**硬件**

- 一块被 SiFli-SDK 支持的 SF32 开发板。
- 一根连接到开发板 USB-to-UART 端口的 USB Type-C 数据线。
- 一台运行 Windows、macOS 或 Linux 的电脑。

**软件**

- [Visual Studio Code](https://code.visualstudio.com/)
- SiFli CodeKit 扩展
- Git（如果 CodeKit 需要你克隆或导入 SiFli-SDK）

**官方参考资料**

- [SiFli CodeKit 安装指南](https://docs.sifli.com/projects/codekit/get-started/install.html)

## 安装 CodeKit { #install-codekit }

1. 打开 VS Code。
2. 打开 **Extensions**。
3. 搜索 **SiFli-SDK-CodeKit**。
4. 安装该扩展。
5. 如果提示，重新加载 VS Code。

如需打开 SDK 管理，请点击 VS Code 侧边栏中的思澈科技（SiFli）图标，再选择 **SDK Manager（SDK 管理）**。也可以打开 **View > Command Palette（查看 > 命令面板）**（默认快捷键 `F1`），运行 **Manage SiFli SDK installation（管理 SiFli SDK 安装）**。具体菜单名称可能随扩展版本变化；请以上方链接的官方安装指南为准。

!!! tip
    如果一时找不到所需操作，可先打开 Command Palette，搜索 `SiFli`。

## 安装或选择 SiFli-SDK { #install-or-select-sifli-sdk }

使用 CodeKit 的设置流程安装 SiFli-SDK，或者指定已克隆的 SDK 副本。大多数用户应选择经过测试、版本固定的 **发布版本（Release/Tag）**。如果需要较新的功能或修复，也可以选择 **开发分支（Branch）**，但稳定性可能较低。官方文档说明，`release/vX.Y` 分支通常包含对应发布线的最新功能和修复，适合希望跟进更新、又不想使用稳定性较低的 `main` 分支的用户。不过，该分支仍会更新，内容并非固定不变。

如果你在中国大陆使用，官方指南建议将 SDK 来源设为 Gitee，并将工具链下载源设为思澈科技（SiFli）国内镜像。

如果 CodeKit 要求你填写 SDK 路径，建议选一个没有空格的短路径，例如：

=== "macOS / Linux"

    ```text
    ~/OpenSiFli/SiFli-SDK
    ```

=== "Windows"

    ```text
    C:\OpenSiFli\SiFli-SDK
    ```

CodeKit 调用的是 SDK 自己的安装脚本和环境脚本，所以最终结果应与手动安装一致：编译器、Python 环境、构建工具和烧录工具会一起准备好。

## 打开示例工程 { #open-an-example }

建议从 SDK 自带的 `hello_world` 示例开始：

```text
example/get-started/hello_world/rtt/project
```

在 VS Code 中打开这个工程目录。如果 CodeKit 提供项目导入向导，就选择 `hello_world`，并让它自动识别 SDK 根目录。

## 选择开发板 { #select-the-board }

选择与实际硬件相匹配的开发板配置。对于 SF32LB52-DevKit-LCD 这一类开发板，常用的配置名称是：

```text
sf32lb52-lcd_n16r8
```

如果使用其他开发板，请在 CodeKit 列表或 SDK 的支持开发板文档中查找对应名称。SDK 会据此选择内存布局、引脚配置、Flash 设置和默认外设。

## 构建 { #build }

运行 CodeKit 的 **Build** 操作。构建成功后，会生成一个针对开发板的输出目录，例如：

```text
build_sf32lb52-lcd_n16r8_hcpu
```

如果构建一开始就失败，先检查 CodeKit 是否已经知道 SiFli-SDK 的安装位置，以及 SDK 环境是否已经安装完成。

## 烧录 { #flash }

通过 USB-to-UART 端口连接开发板，然后运行 CodeKit 的 **Flash** 或 **Download** 操作。

当工具提示你选择串口时：

- 在 Windows 上，选择对应的 `COM` 口。
- 在 macOS 上，优先选择 `/dev/cu.*`，而不是 `/dev/tty.*`。
- 在 Linux 上，选择对应的 `/dev/ttyUSB*` 或 `/dev/ttyACM*`。

如果下载工具无法让开发板进入 UART 下载模式，请在开始传输前立即复位开发板。如果问题仍未解决，请参照该开发板专用的烧录说明。

## 打开串口控制台 { #open-the-serial-console }

你可以使用 CodeKit 自带的串口监视器、VS Code 的串口工具，或者任何其他串口终端程序。复位之后，控制台应能看到可读的启动日志，以及 `hello_world` 示例的输出。

如果你看到了可读的启动日志，说明开发板和串口设置正确；如果输出是乱码，就先关闭其他串口工具，并确认示例使用的波特率设置。

## 成功标准 { #success-check }

满足以下条件后，就可以继续下一步：

- CodeKit 能正确识别 SDK 路径。
- 选中的开发板和实际硬件一致。
- 构建和烧录动作都能顺利完成。
- 复位后串口控制台能看到 `hello_world` 输出。

## 故障排查 { #troubleshooting }

<div align="center"><em>表：故障排查</em></div>

<div align="center" markdown>

| 现象 | 检查项 |
|:-----|:-------|
| 看不到串口 | 先换一根数据线、一个 USB 口，或确认是否插在开发板的 USB-to-UART 接口上。 |
| CodeKit 找不到 SDK | 重新跑一遍 CodeKit 设置流程，并手动选择 SiFli-SDK 根目录。 |
| 构建时找不到工具 | 让 CodeKit 重新安装工具链，或先手动跑一次 SDK 安装脚本。 |
| 烧录无法启动 | 如果下载工具无法进入 UART 下载模式，请在开始传输前立即复位开发板。问题仍未解决时，请按对应开发板的烧录说明排查。 |
| 串口输出乱码 | 检查波特率，并确认只打开了一个串口监视器。 |

</div>

## 后续步骤 { #where-to-go-next }

- 阅读 [SiFli-SDK](getting-started-sifli-sdk.md)，了解与这些 IDE 操作对应的命令行用法。
- 当 `hello_world` 跑通后，继续阅读[初学者教程](../tutorials/beginner.md)。
- 开始开发实际产品功能时，可查看[蓝牙（Bluetooth）概览](../../learn/bluetooth/overview.md)、[图形概览](../../learn/graphics/overview.md)、[音频概览](../../learn/audio/overview.md)和[低功耗概览](../../learn/low-power/overview.md)。

## 让配置可复现 { #what-sifli-should-add }

请记录 CodeKit 和 SDK 版本、选择的发布 tag 或分支，以及准确的开发板 target。如果菜单或命令名称与本文不同，请查看当前[官方安装指南](https://docs.sifli.com/projects/codekit/get-started/install.html)，并通过 SDK 的[支持开发板列表](https://docs.sifli.com/projects/sdk/latest/sf32lb52x/supported_boards/index.html)核对 target。
