---
icon: lucide/code
description: "评估 OpenSiFli 社区维护的 sifli-rs（sifli-hal、sifli-pac）对 SF32 的 Rust 支持：当前成熟度、适用与不适用场景及风险核对清单。"
tags:
    - 开发
    - Rust
---

# Rust { #rust }

OpenSiFli 正在 [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) 开展 Rust 相关工作，仓库包含 HAL、PAC、Flash Table crate、示例以及烧录/调试说明。

维护者说明该项目仍在开发中，尚不适合用于量产。除非团队能够贴近硬件开发，并准备好向上游贡献修复，否则应将 Rust 在 SF32 上的使用限定在探索阶段。

如需搭建初始工具链、原样构建 Blinky 示例并配置烧录 runner，请参阅 [Rust 快速开始](../../../getting-started/rust/getting-started-rust.md)。本页用于评估当前支持范围，并判断是否在该基线之上继续采用 Rust。

## OpenSiFli 提及的 crate { #crates-mentioned-by-opensifli }

<div align="center"><em>表：OpenSiFli 提及的 crate</em></div>

<div align="center" markdown>

| Crate | 用途 |
|:------|:-----|
| `sifli-hal` | 硬件抽象层。 |
| `sifli-pac` | 外设访问 crate。 |
| `sifli-flash-table` | Flash Table 支持。 |

</div>

## 适合使用 Rust 的情况 { #when-rust-makes-sense }

如果你有以下目标，可以考虑使用 Rust：

- 尝试嵌入式 Rust 开发。
- 在底层固件代码中使用强类型。
- 为将来采用 `embedded-hal` 风格的驱动打基础。
- 为 SF32 Rust 生态作出贡献。

当前量产固件应使用 SiFli-SDK。

## 评估检查点 { #evaluation-gates }

开始产品移植前，先确认用于初次上手的基线配置能在目标开发板上正常运行。随后，针对每个所需外设、Flash 布局、调试路径和运行时功能分别进行验证。每项结果都应记录上游 commit、Rust target、Cargo 配置、开发板修订版和恢复流程。

仓库使用 `sifli-hal`、`sifli-pac`、Flash Table 工具以及 Embassy 风格的异步示例，因此应用能否正常运行，不仅取决于某个 crate 能否编译，也取决于这些组件能否协同工作。排查功能缺口时，应尽量保留最小的复现示例。

## 风险检查表 { #risk-checklist }

- crate 是否支持具体的目标芯片型号？
- HAL 是否覆盖所需外设？
- Flash 布局是否与开发板兼容？
- 文档是否说明了适用于所用探针/工具的调试流程？
- 能否使用 SiFli-SDK 或 `sftool` 恢复同一块开发板？
- 团队是否具备贡献修复的能力和意愿？

## 适合与不适合的场景 { #good-fit-poor-fit }

<div align="center"><em>表：适合与不适合的场景</em></div>

<div align="center" markdown>

| 适合 | 不适合 |
|:-----|:-------|
| 实验和驱动探索。 | 量产进度紧迫且需要厂商支持的项目。 |
| 已经使用嵌入式 Rust 的团队。 | 当前就需要完整蓝牙（Bluetooth）、显示或音频栈的产品。 |
| 为提高 HAL/PAC 成熟度作出贡献。 | 使用 Arduino 或 SDK 示例可以更快完成的一次性原型。 |

</div>
