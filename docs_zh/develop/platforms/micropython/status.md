---
icon: lucide/terminal-square
description: "SF32 上 MicroPython 的现状：目前尚未发现官方移植版本，以及使其成为受支持路径前需要满足的验收标准。"
tags:
    - 开发
    - MicroPython
---

# MicroPython 状态 { #micropython-status }

在已检查的思澈科技（SiFli）文档和 OpenSiFli 仓库中，尚未找到官方 SF32 MicroPython 移植、固件镜像或面向具体开发板的烧录流程。

本次核查范围包括 [OpenSiFli 的公开 GitHub 仓库](https://github.com/OpenSiFli/) 和[思澈科技（SiFli）文档站](https://docs.sifli.com/)。

这不能证明不存在内部或社区实验，但意味着在出现可公开获取的固件镜像或可公开访问的源代码树之前，本站不应将 MicroPython 描述为经过验证的 SF32 开发路径。

## 当前建议 { #current-recommendation }

目前不要面向最终用户将 MicroPython 列为受支持的 SF32 路径。在出现可供开发者烧录并复现的公开产物前，应将本页保留为路线图和状态页面。

## 完整页面所需内容 { #what-a-real-page-needs }

本页升级为常规教程之前，思澈科技（SiFli）应发布：

- 按开发板和内存配置提供的固件镜像。
- 源代码仓库和构建说明。
- 烧录命令和恢复命令。
- REPL UART 和波特率。
- 预期的 MicroPython 启动横幅。
- 受支持的 `machine` API。
- 文件系统行为以及安全模式/恢复行为。
- 显示、蓝牙（Bluetooth）、存储、USB 和低功耗方面的已知限制。

## 建议的首次冒烟测试 { #suggested-first-smoke-test }

固件可用后，首次测试应仅使用串口：

```python
import time

while True:
    print("Hello from SF32 MicroPython")
    time.sleep(1)
```

只有在引脚名称得到明确说明后，再测试 GPIO。

## 最低验收标准 { #minimum-acceptance-criteria }

以下条件全部满足后，MicroPython 才能从“状态”升级为“入门指南”：

- 有公开仓库或发布页面。
- 至少为一款 SF32 开发套件提供面向具体开发板的二进制文件。
- 提供有文档说明的烧录命令。
- 提供有文档说明的 REPL 端口和波特率。
- 提供恢复到 SiFli-SDK 固件的路径。
- 列出受支持的 `machine` API。
- 至少有一个在真实硬件上测试过的 GPIO 示例。

## 为什么重要 { #why-this-matters }

“下载一个 MicroPython 镜像”不是可执行的指导。用户需要准确的镜像、匹配的开发板、烧录工具、REPL 设置和恢复路径。缺少这些信息时，MicroPython 页面只会增加支持负担，无法真正帮助用户。
