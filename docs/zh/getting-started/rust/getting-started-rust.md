---
icon: lucide/code
description: "在 SF32LB52 上首次评估 OpenSiFli sifli-rs：安装 Rust 编译目标、构建未修改的 Blinky 示例、配置 sftool，并保留 SDK 恢复路径。"
tags:
    - 快速开始
    - Rust
---

# Rust { #rust }

[OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs) 为思澈科技（SiFli）MCU 提供 Rust HAL、PAC 和 Flash 表相关支持。维护者明确将该项目标记为开发中，尚不适合量产使用。因此，本指南仅用于建立**评估基线**，不构成量产固件工作流。

开始前，请先在同一块开发板上完成 [SiFli-SDK 快速开始](../sifli/getting-started-sifli-sdk.md)。这样一来，若 Rust 实验无法烧录或调试，仍可使用已验证的串口和恢复路径。

## 需要准备什么 { #what-you-need }

- 一块 SF32LB52 DevKit LCD，以及一根连接到 USB-to-UART 的 USB Type-C 数据线。
- 具备 Rust、嵌入式开发和命令行的基础知识。
- `git`，以及通过 [rustup](https://rustup.rs/) 安装的当前 Rust 工具链。
- 当前的 [sifli-rs 快速开始](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/get_started.md)和[烧录与调试指南](https://github.com/OpenSiFli/sifli-rs/blob/main/docs/flash_and_debug.md)。

!!! warning "探索性路径"
    本指南不能证明某个芯片、外设、开发板配置或应用栈已达到量产可用状态。在投入移植工作前，请查看仓库中目标芯片和外设的支持状态信息。

## 准备 Rust 编译目标 { #prepare-the-rust-target }

仓库指南使用 Arm Cortex-M Rust 编译目标。请安装文档列出的目标：

```bash
rustup target add thumbv8m.main-none-eabi
rustup target add thumbv8m.main-none-eabihf
```

克隆当前仓库，并进入 SF32LB52 示例目录：

```bash
git clone https://github.com/OpenSiFli/sifli-rs.git
cd sifli-rs/examples/sf32lb52x
```

示例目录包含 Cargo 目标配置、内存布局、构建脚本和示例二进制文件。不要原封不动地将这些文件复制到产品中；其中包含必须结合目标硬件核对的开发板和 Flash 假设。

## 配置烧录执行器（runner） { #configure-the-flash-runner }

仓库将 `sftool` 用作默认烧录执行器（runner）。在 `examples/sf32lb52x/.cargo/config.toml` 中，按照当前烧录与调试指南，将 runner 配置为开发板的 USB-to-UART 端口。文档给出的模式为：

```toml
runner = 'sftool -c SF32LB52 -p <Your_Port> --compat write_flash'
```

首次烧录可能需要 Flash 表、Bootloader 和应用镜像。确切镜像和地址取决于文档中的开发板/Flash 布局。请遵循仓库指南，不要从 Arduino、Zephyr 或 SiFli-SDK 直接套用地址或二进制文件。

## 构建并运行基线 { #build-and-run-the-baseline }

配置 runner 后，构建并烧录未经修改的 Blinky 示例：

```bash
cargo run --bin blinky
```

编译成功只是第一步。请确认开发板呈现预期行为，并保留完整的 `cargo` 和 `sftool` 输出。之后仅做一项小而可逆的改动，例如调整 Blink 延时，再尝试其他外设。

## 基线失败时 { #if-the-baseline-fails }

先确认开发板的 SiFli-SDK 基线仍可运行。然后收集 Rust 编译目标、提交版本、所选示例、Cargo 配置、`sftool` 命令和输出、开发板修订版以及串口或调试日志。上游指南指出，与空闲/WFI 行为相关的调试可能不稳定，且 Flash 表大小必须容纳应用镜像。

关于架构、支持范围和产品适用性，请参阅[开发板块的 Rust 页面](../../develop/platforms/rust/overview.md)。

## 复用示例前的检查 { #what-sifli-should-add }

改造示例前，请确认仓库对目标开发板及所需外设有明确的支持说明，并核对对应的 Rust target、Bootloader、Flash 表布局和调试流程。请保留已验证可用的 SiFli-SDK 基线，作为必要时的恢复路径。
