---
icon: lucide/puzzle
description: "在 SF32LB52 DevKit LCD 上首次运行 OpenSiFli 的测试版 ArduinoCore-zephyr：安装开发板包、上传串口测试程序，并运行 Blink。"
tags:
    - 快速开始
    - Arduino
---

# Arduino { #arduino }

OpenSiFli 提供基于 Zephyr 的 SF32 BETA 版 Arduino Core：[OpenSiFli/ArduinoCore-zephyr](https://github.com/OpenSiFli/ArduinoCore-zephyr)。它发布 `sifli:sf32lb52` Arduino 软件包，在 Boards Manager 中显示为 **SiFli Serial Boards**；当前目标开发板为 **SiFli SF32LB52 DevKit LCD**。

这套 Arduino Core 适合编写和验证 Arduino 程序（sketch）、快速检查外设、制作演示及开发早期原型。若要开发量产固件、调优蓝牙（Bluetooth）协议栈、实现图形密集型应用、优化功耗或调试自定义开发板，请使用 [SiFli-SDK](../sifli/getting-started-sifli-sdk.md)。

!!! warning "测试版核心"
    OpenSiFli 将这个 Arduino Core 标记为 **BETA**，并明确说明目前仅供测试。功能、API、加载器（loader）行为、软件包内容和发布机制都可能变化，不要将其视为已达到量产就绪状态。

## 你需要准备什么 { #what-youll-need }

**硬件**

- SiFli SF32LB52 DevKit LCD。
- 一根 USB Type-C 数据线，连接到开发板的 USB-to-UART 接口。
- 一台运行 Windows、macOS 或 Linux 的电脑。

**软件**

- [Arduino IDE 2.x](https://www.arduino.cc/en/software) 或 [Arduino CLI](https://docs.arduino.cc/arduino-cli/)。
- OpenSiFli 的 `sifli:sf32lb52` Arduino 软件包。
- 一个串口监视器。

## 安装开发板软件包 { #install-the-board-package }

打开 **Arduino IDE > Settings**，把下面这个 URL 加入 **Additional Boards Manager URLs**：

```text
https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

中国大陆用户可使用镜像包索引：

```text
https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

然后打开 **Boards Manager**，搜索 **SiFli Serial Boards**，并安装 `sifli:sf32lb52` 平台。

使用 Arduino CLI 时：

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://github.com/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index.json
```

使用中国镜像时：

```bash
arduino-cli core install sifli:sf32lb52 \
  --additional-urls https://downloads.sifli.com/github_assets/OpenSiFli/ArduinoCore-zephyr/releases/latest/download/package_sifli_index_cn.json
```

## 选择开发板 { #select-the-board }

在 Arduino IDE 中选择：

```text
SiFli SF32LB52 DevKit LCD
```

对应的开发板 FQBN 为：

```text
sifli:sf32lb52:sf32lb52devkitlcd
```

OpenSiFli 的开发板定义会把这个 Arduino 开发板映射到 Zephyr 目标 `sf32lb52_devkit_lcd`，以及变体 `sf32lb52_devkit_lcd_sf32lb525uc6`。

## 选择构建选项 { #choose-build-options }

该 Core 提供两个重要菜单：

<div align="center"><em>构建选项</em></div>

<div align="center" markdown>

| 菜单 | 选项 | 含义 |
|:-----|:-----|:-----|
| **Mode** | `Standard` | 程序加载后自动启动。 |
| **Mode** | `Debug` | Zephyr Shell 等待 `sketch` 命令。 |
| **Link mode** | `Dynamic` | 程序会打包为供 Zephyr 加载器动态加载的文件。 |
| **Link mode** | `Static` | 程序会链接为可烧录的二进制文件。 |

</div>

如果要通过 Zephyr 加载器动态加载程序，选择 **Dynamic**；如果要将程序链接进可烧录的固件镜像，选择 **Static**。

## 让开发板进入串口下载模式 { #put-the-board-in-serial-download-mode }

根据 OpenSiFli 文档，首次使用前需要让开发板进入串口下载模式。请按 SF32LB52 DevKit LCD 对应的 Boot/Reset 操作顺序执行，再从 Arduino IDE 或 CLI 发起上传。

上传工具是 `sftool`。

## 上传串口冒烟测试 { #upload-a-serial-smoke-test }

建议先做串口输出测试。它能同时验证上传、复位、运行时启动和控制台输出路由，无需依赖 LED 极性是否正确：

```cpp
void setup() {
  Serial.begin(115200);
}

void loop() {
  Serial.println("Hello from SF32 Arduino");
  delay(1000);
}
```

你可以在 Arduino IDE 中上传，也可以使用 Arduino CLI：

```bash
arduino-cli compile \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch

arduino-cli upload \
  -p /dev/cu.usbserial-XXXX \
  --fqbn sifli:sf32lb52:sf32lb52devkitlcd:link_mode=dynamic \
  /path/to/YourSketch
```

把 `/dev/cu.usbserial-XXXX` 替换成你的开发板串口。在 Windows 上使用对应的 `COM` 口；在 Linux 上使用对应的 `/dev/ttyUSB*` 或 `/dev/ttyACM*`。

把串口监视器设置为 `115200` 波特率。在 **Standard** 构建模式下，示例程序应每秒输出一行。在 **Debug** 构建模式下，先进入 Zephyr shell，然后运行：

```text
sketch
```

## 上传 Blink { #upload-blink }

请先检查已安装的 SF32LB52 DevKit LCD 开发板变体（variant）是否定义了 `LED_BUILTIN`；不要假定 Arduino 引脚编号在不同开发板上通用。如果该宏已定义，且这个变体将它映射到板载 LED，可在串口测试通过后再运行 Blink。否则，请先根据开发板文档确认 LED 的连接方式和有效电平，再选择 GPIO。

```cpp
void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(500);
  digitalWrite(LED_BUILTIN, LOW);
  delay(500);
}
```

## 故障排查 { #troubleshooting }

<div align="center"><em>表：故障排查</em></div>

<div align="center" markdown>

| 现象 | 检查项 |
|:-----|:-------|
| 看不到软件包 | 确认 package index URL 正确，并使用 Arduino IDE 2.x。 |
| 上传失败 | 确认开发板已进入串口下载模式，并且没有串口监视器占用端口。 |
| 程序没有启动 | 检查 **Mode**。如果是 `Debug`，需要在 Zephyr Shell 中运行 `sketch`。 |
| Zephyr 符号未定义 | Core 的 README 提示：缺失的 Zephyr 函数可能需要在 `loader/llext_exports.c` 中导出，并重新构建加载器。 |
| 缺少 Zephyr 子系统 | 在开发板 `.conf` 中启用所需 `CONFIG_` 选项，重新构建加载器，再重新上传。 |
| 内存不足 | Zephyr Shell 和动态加载程序都会占用 RAM；可视情况减少栈占用，或切换构建模式。 |

</div>

## 当前支持范围 { #what-sifli-team-should-finish }

当前发布的软件包面向 SF32LB52 DevKit LCD，且仍处于测试用 Beta 阶段。尝试其他开发板或依赖某项 API 前，请先查看对应软件包版本的[上游仓库](https://github.com/OpenSiFli/ArduinoCore-zephyr)和发布说明；Zephyr 或 SiFli-SDK 支持某项功能，并不代表该 Arduino 软件包也已支持。
