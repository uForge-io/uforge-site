---
icon: lucide/boxes
description: "将 SiFli-SDK 示例代码转化为可复用组件与 `sf-pkg` 软件包：质量门槛、需要记录的信息，以及常见打包陷阱。"
tags:
    - 开发
    - SiFli-SDK
---

# 组件与 `sf-pkg` { #components-and-sf_pkg }

SiFli-SDK 项目通常会依赖可复用的中间件、驱动和组件。当项目不再只是直接复制单个示例时，就需要把稳定复用的固件模块整理出来并记录清楚；思澈科技（SiFli）的组件包生态可用于分发和管理这些模块。

## 如何理解组件 { #how-to-think-about-components }

当一段代码需要在多个产品或多个示例之间共享时，就该考虑把它整理成组件，例如：

- 外设驱动
- 显示面板支持
- 蓝牙（Bluetooth）服务
- GUI 控件
- 传感器适配层
- 存储辅助模块
- 产品级中间件

仅供单个应用使用的逻辑应留在该应用工程中，直到接口稳定，并且有多个使用方。

## 实际工作流 { #practical-workflow }

1. 从一个已经跑通的 SDK 示例开始。
2. 找出其中真正值得复用的部分。
3. 将可复用功能切分出来，通过职责范围清晰、接口精简的 API 暴露。
4. 通过 SDK 的标准构建和配置机制提供配置选项。
5. 在文档中说明依赖项、内存占用和所需外设。
6. 做到这些之后，再将其打包为可复用组件。

## 使用 `sf-pkg` 分发组件 { #use-sf-pkg-to-distribute-components }

组件是可复用的工程单元。思澈科技（SiFli）的组件注册表基于 Conan；当前 SDK 命令行子命令写作 `sf-pkg`。

使用现有软件包时，在 SDK 工程的 `project` 目录中运行 `sdk.py sf-pkg init`，生成 `conanfile.py`。在 `requires` 字段中按 `package/version@<username>` 的格式添加软件包引用，其中 `<username>` 是软件包注册表用户名。然后仍在该目录中运行 `sdk.py sf-pkg install`。安装后的软件包位于 `project/sf-pkgs`；其中的 Kconfig 文件会并入 `menuconfig`，显示在 `SiFli External Components` 菜单下。

发布组件时，在组件目录中运行 `sdk.py sf-pkg new --name <package_name>`，并检查生成的 `conanfile.py`。如需在创建时设置兼容范围，可追加 `--support-sdk-version <sdk_version_range>`。无论是否使用该选项，都要确认配方通过 `support_sdk_version` 声明了预期的 SDK 版本范围，并在必要时调整。软件包应采用语义化版本号，并补全元数据和依赖项。完成注册表认证后，构建并上传软件包：

```bash
sdk.py sf-pkg build --version <version>
sdk.py sf-pkg upload --name <package_name>/<version>@<username>
```

具体流程可能因 SDK 版本而异。有关环境准备、认证和版本相关命令，请参阅思澈科技（SiFli）的[组件注册表依赖接入指南（中文）](https://docs.sifli.com/projects/sdk/latest/sf32lb55x/sf_pkg/use.html)、[组件包创建与发布指南（英文）](https://docs.sifli.com/projects/sdk/latest/en/sf32lb52x/sf_pkg/create.html)及[中文版](https://docs.sifli.com/projects/sdk/latest/sf32lb56x/sf_pkg/create.html)。

## 组件的质量门槛 { #component-quality-bar }

组件达到可共享的质量要求时，至少应满足：

- 能从全新检出的代码仓库构建，并清楚说明环境准备和依赖要求。
- 至少提供一个最小示例。
- 明确说明需要哪些配置。
- 不依赖未明示的板级假设。
- 能清晰报告错误。
- 明确记录对全局资源的占用情况，以及资源所有权和释放规则。
- 明确说明线程、回调和内存所有权规则。

## 需要记录什么 { #what-to-record }

每个可复用组件都应该记录：

- 支持的芯片和开发板
- 所需 SDK 版本
- 所需外设和引脚
- 所需 RTOS / 中间件配置
- 线程模型与回调行为
- RAM、Flash 和栈空间预期
- 示例工程路径

## 避免这些陷阱 { #avoid-these-traps }

<div align="center"><em>表：避免这些陷阱</em></div>

<div align="center" markdown>

| 陷阱 | 更好的做法 |
|:-----|:-----------|
| 把整个示例复制进每个产品 | 只抽取稳定、可复用的那一层。 |
| 在组件代码里写死引脚名 | 通过配置把开发板资源传进来。 |
| 默认只有一种显示/音频路径 | 在文档中明确说明支持的硬件路径。 |
| 不关注内存占用 | 记录栈、堆、DMA 和缓冲区预期。 |
| 发布组件却没有示例 | 至少附带一个最小集成示例。 |

</div>
