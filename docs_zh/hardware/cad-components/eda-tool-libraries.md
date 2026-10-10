---
icon: lucide/library
description: "思澈科技（SiFli）官方提供的 SF32 芯片与模组原理图符号及 PCB 封装库——JLCEDA/LCEDA Pro、PADS、OrCAD 与 KiCad，含下载链接与核对清单。"
tags:
    - 硬件
    - EDA
    - 库文件
---

# SF32 EDA 工具库 { #sf32-eda-tool-libraries }

## 用途 { #purpose }

思澈科技（SiFli）为 SF32 芯片和模组系列提供原理图符号库和 PCB 封装库。进行原理图设计和 PCB 布局时，应优先使用这些文件作为起点，而不是根据数据手册手工重画符号、引脚映射和焊盘图形。

这些库文件有助于降低硬件初次启动调试时的风险，但不能替代数据手册、封装图或器件专用硬件设计指南。在发布前，务必结合实际设计，对照精确料号、封装、引脚定义、焊盘图形和布局要求，逐项核对所选库元件。

<div class="grid cards" markdown>

- :fontawesome-solid-download: __[JLCEDA / LCEDA Pro 库 - 下载 `.epro2` 项目](https://downloads.sifli.com/hardware/files/documentation/ProPrj_sifli-iclib_2026-04-20.epro2)__
- :fontawesome-solid-download: __[PADS 库 - 下载 `.ZIP`](https://downloads.sifli.com/hardware/files/documentation/PADS-SIFLI-IC.ZIP)__
- :fontawesome-solid-download: __[OrCAD 库 - 下载 `.OLB`](https://downloads.sifli.com/hardware/files/documentation/OrCAD-SIFLI-IC.OLB)__
- :fontawesome-brands-github: __[KiCad 库 - OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries)__

</div>

!!! note "来源"
    直链下载地址来自 [思澈科技（SiFli）Wiki 的资源下载区](https://wiki.sifli.com/hardware/index.html)。如果文件地址发生变化，请到该页面查找新的下载地址。

## 库格式概览 { #library-format-at-a-glance }

<div align="center"><em>库格式摘要</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| EDA 工具 | 文件 | 格式 | 内容 | 分发方式 |
|:---|:---|:---|:---|:---|
| JLCEDA / LCEDA Pro | `ProPrj_sifli-iclib_2026-04-20.epro2` | LCEDA Pro 项目压缩包 | 原理图符号和 PCB 封装 | 直接下载 |
| PADS | `PADS-SIFLI-IC.ZIP` | Mentor/Siemens PADS 库压缩包 | 原理图符号和 PCB 封装图形（PADS 中称为 Decal） | 直接下载 |
| OrCAD | `OrCAD-SIFLI-IC.OLB` | Cadence OrCAD Capture 库 | 原理图符号 | 直接下载 |
| KiCad | 发布版本 ZIP 压缩包，或含 `metadata.json` 的包元数据 | KiCad 符号、封装和 3D 模型库 | 原理图符号、PCB 封装和 3D 模型 | [GitHub 仓库](https://github.com/OpenSiFli/kicad-libraries)，提供带版本号的发布版本 |

</div>

JLCEDA / LCEDA Pro 和 PADS 以压缩包形式提供；OrCAD 提供的是独立的 `.OLB` 库文件。Wiki 下载索引没有逐器件支持表，导入目标 EDA 工具后，需要确认所选器件是否包含在库中。

链接中的 KiCad 仓库公开了源文件、带版本号的发布包和支持器件表，便于核对覆盖范围；这不代表库中包含所有 SF32 型号。

## KiCad 库详情 { #kicad-library-detail }

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) 仓库提供思澈科技（SiFli）官方 KiCad 原理图符号库、PCB 封装库和 3D 模型库，采用 CC-BY-SA-4.0 许可证。本次评审于 2026-10-05 核对了[版本 `1.0.0`](https://github.com/OpenSiFli/kicad-libraries/releases/tag/1.0.0)。开始新设计前，请查看仓库是否已有更新版本。

<div align="center"><em>KiCad 库覆盖范围</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 料号 | 封装 | 符号 | PCB 封装 | 3D 模型 |
|:---|:---|:---:|:---:|:---:|
| SF32LB52B/D/E/G/J | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB520/3/5/7 | QFN68 | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-check: |
| SF32LB52-MOD-1 模组 | - | :fontawesome-solid-check: | :fontawesome-solid-check: | :fontawesome-solid-xmark: |

</div>

上表依据 2026-10-05 核对的仓库 README 整理，并不表示已逐引脚审核每个发布包。芯片组的通配符写法也不能证明每个完整订购料号均受支持；请在实际安装的库文件中核对所选原理图符号、PCB 封装及器件封装类型。

!!! note "README 中料号通配符的含义"
    OpenSiFli KiCad 库的 README 将芯片行写作 `SF32LB52XUx` 和 `SF32LB52xUx`。在思澈科技（SiFli）的命名中，大写 `X` 是外部稳压供电型号的通配符，小写 `x` 是电池供电型号的通配符。本页将它们展开为 μForge 文档中统一使用的 SF32LB52B/D/E/G/J 和 SF32LB520/3/5/7。

[OpenSiFli/kicad-libraries](https://github.com/OpenSiFli/kicad-libraries) 仓库的 README 说明，暂不支持从 Package and Content Manager 在线目录自动安装。README 给出的手动安装方法是下载发布版本 ZIP，并在包管理器中选择 **Install from file...**。`1.0.0` 发布页还说明，可以将 ZIP 解压到 KiCad 库目录，或在包管理器中通过 `metadata.json` 安装。请以所用版本随附的说明为准；README 将安装后的符号库和 PCB 封装库标识为 `PCM_SiFli`。

## 核查清单 { #review-checklist }

- [ ] 在原理图发布前，先将库中的料号和封装后缀与 BOM 对齐。
- [ ] 对照芯片数据手册和器件专用硬件设计指南，交叉核对符号引脚名称和引脚编号。
- [ ] 对照官方封装图，检查 PCB 封装的焊盘尺寸、间距、器件占位边界（courtyard）、裸露焊盘处理方式和装配间隙。
- [ ] 3D 模型只能作为摆放和机械配合参考，不应作为制造或装配尺寸依据。
- [ ] 对于 JLCEDA / LCEDA Pro、PADS 和 OrCAD，导入后应确认逐器件覆盖情况；Wiki 下载索引没有列出每个器件的支持状态。
- [ ] 开始新设计前，检查库是否更新，并随工程保存已审核的压缩包或库包版本。思澈科技（SiFli）可能在新芯片或模组通过验证后更新文件。更新可能新增或修改器件；采用替换版本前，需要重新核对。

## 相关页面 { #related-pages }

- [SF32 系列概览](../../sf32-products/family/SF32_family.md)
- [SF32 命名规则](../../sf32-products/family/SF32_namingrule.md)
- [SF32 合格供应商名录](sifli-approved-vendor-list.md)
