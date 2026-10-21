---
icon: lucide/code
description: "Evaluating community Rust support for SF32 via OpenSiFli's sifli-rs (sifli-hal, sifli-pac): current maturity, good/poor fit scenarios, and a risk checklist."
tags:
    - Develop
    - Rust
---

# Rust { #rust }

OpenSiFli's Rust work is in [OpenSiFli/sifli-rs](https://github.com/OpenSiFli/sifli-rs), which includes HAL, PAC, flash-table crates, examples, and notes on flashing and debugging.

The maintainers describe the project as a work in progress that is not ready for production use. Treat Rust on SF32 as an exploration path unless your team can work close to the hardware and is prepared to contribute fixes upstream.

For initial toolchain setup, an unmodified Blinky build, and flash-runner configuration, see [Getting Started with Rust](../../../getting-started/rust/getting-started-rust.md). Use this page to evaluate current support and decide whether to take Rust beyond that baseline.

## Crates Mentioned by OpenSiFli { #crates-mentioned-by-opensifli }

<div align="center"><em>Table: Crates Mentioned by OpenSiFli</em></div>

<div align="center" markdown>

| Crate | Purpose |
|:------|:--------|
| `sifli-hal` | Hardware abstraction layer. |
| `sifli-pac` | Peripheral access crate. |
| `sifli-flash-table` | Flash table support. |

</div>

## When Rust Makes Sense { #when-rust-makes-sense }

Rust may be a good fit if you want to:

- Experiment with embedded Rust.
- Use strong typing in low-level firmware code.
- Build toward future drivers in the style of `embedded-hal`.
- Contribute to the SF32 Rust ecosystem.

Use SiFli-SDK for production firmware today.

## Evaluation Gates { #evaluation-gates }

Before beginning a product port, verify that the first-run baseline works on the target board. Then validate each required peripheral, flash layout, debug path, and runtime feature independently. Record the upstream commit, Rust target, Cargo configuration, board revision, and recovery procedure for every result.

The repository's use of `sifli-hal`, `sifli-pac`, flash-table tooling, and Embassy-style async examples means that application success depends on how these pieces work together, not just on whether a crate compiles. When investigating a gap, keep the reproducer as small as possible.

## Risk Checklist { #risk-checklist }

- Does the crate support the exact chip?
- Does the HAL cover the needed peripheral?
- Is flash layout compatible with the board?
- Is the debugging flow documented for your probe/tool?
- Can the same board be recovered with SiFli-SDK or `sftool`?
- Is the team comfortable contributing fixes?

## Good Fit / Poor Fit { #good-fit-poor-fit }

<div align="center"><em>Table: Good Fit / Poor Fit</em></div>

<div align="center" markdown>

| Good fit | Poor fit |
|:---------|:---------|
| Experiments and driver exploration. | Production schedule requiring vendor support. |
| Teams already using embedded Rust. | Products needing full Bluetooth/display/audio stacks today. |
| Contributing to HAL/PAC maturity. | One-off prototypes where Arduino or SDK examples are faster. |

</div>
