---
icon: lucide/clipboard-check
description: "SF32 量产硬件设计入口：芯片和模组设计指南、检查清单、接口定义、认可元器件与 EDA 库。"
tags:
    - 硬件
    - 量产
---

# 面向量产的设计 { #design-for-production }

选定芯片或模组之后、发布原理图、PCB 布局、BOM 或生产资料之前，请按本页查阅相关参考。这些实现参考有助于降低首次启动调试和产品验证的风险，包括对应器件的硬件设计指南、检查清单、模组接口定义、认可元器件和 EDA 库。

## 推荐的量产设计顺序 { #recommended-production-sequence }

请把以下流程当作反复评审的顺序，而不是一次性交接。制作样板前应核对原理图符号和 PCB 封装；完成设计评审并验证量产方案对应的硬件后，才能发布量产用 CAD 文件和生产资料。电路板、固件或 BOM 发生变化时，应重新核查受影响的项目。

<div align="center"><em>表：量产设计顺序</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 阶段 | 使用内容 | 应保留的证据 |
|:-----|:---------|:-------------|
| 架构 | 产品介绍和接口要求 | 所选器件、封装、内存、显示、音频和存储方案，以及电源设计前提。 |
| 原理图与布局 | 芯片或模组硬件设计指南 | 已评审的电源、时钟、复位、RF、存储、显示和接口实现。 |
| BOM | 合格供应商名录（AVL）和元器件数据手册 | 每个关键物料均有已认可或经专项验证的替代料。 |
| 设计评审 | 硬件设计检查清单 | 每项适用检查项及例外情况的处理结论。 |
| 启动调试 | 开发板资料、SDK 示例和实测结果 | 可重复的启动、烧录、外设、无线、功耗和恢复结果。 |
| 量产 CAD 发布 | 官方 EDA 库和封装图 | 原理图符号、PCB 封装、引脚分配、焊盘布局和制造文件的核查结果。 |

</div>

## 为所选产品使用正确的参考资料 { #use-the-right-reference-for-the-chosen-product }

开展硬件实现时，可从以下入口查找参考资料：

- **[硬件设计指南](index.md#find-a-guide)**为芯片提供器件专用的原理图、布局、电源、接口和启动调试指引，并为模组提供载板集成指引。适用时请同时使用对应的检查清单，模组请先阅读模组介绍以确认其符合产品架构。
- **[M2 模组](m2-modules/interface-standards-overview.md)**包括 μForge M2 命名规则和引脚级接口定义草案。该接口定义仍为提案，确定量产方案前必须完成验证。
- **[CAD 与元器件](cad-components/components-and-cad-libraries.md)**包括思澈科技（SiFli）的 [AVL](cad-components/sifli-approved-vendor-list.md) 和[官方 EDA 库](cad-components/eda-tool-libraries.md)。两者都不能替代针对具体器件型号、封装图和所选设计指南的最终核实。

## 量产参考资料不能代替验证 { #a-production-reference-is-not-a-substitute-for-validation }

设计指南和经验证的元器件清单能够降低风险，但不能证明成品已经通过验证。请验证最终 PCB 版本、固件镜像、外壳、电池、显示屏、存储器件、RF 性能、工作环境和生产测试流程。对于任何偏离设计指南或检查清单的内容，应作为明确的工程决策记录，而非未记录的例外。
