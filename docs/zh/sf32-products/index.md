---
icon: lucide/cpu
title: "SF32 产品"
description: "从这里了解 SF32 硬件、规划产品、选择芯片/模组/开发板、复用参考设计，并完成量产硬件设计准备。"
tags:
    - 硬件
    - 概览
---

# SF32 产品 { #sf32-products }

SF32 产品栏目帮助你从产品构想走到可实施的 SF32 设计。你可以在这里了解 SF32 系列、完成硬件选型并进行验证、找到可复用的技术基线，并获取量产设计所需的资料。

## 选择起点 { #choose-your-starting-point }

<div align="center"><em>硬件读者路径</em></div>

<div align="center" markdown>

| 你要完成的任务 | 从这里开始 | 可以获得什么 |
|:---------------|:-----------|:-------------|
| 了解 SF32 系列 | [了解 SF32](family/SF32_family.md) | 系列级对比，以及理解可订购器件型号所需的命名规则。 |
| 将产品构想转化为计划 | [规划产品](family/product-planning.md) | 从需求和器件方向，到开发板验证与量产准备的分阶段路径。 |
| 选择芯片或模组 | [SF32 产品选型工具](product-selector.md) | 芯片和模组交互式筛选工具、选型因素及产品介绍。开发板另行归类，作为验证平台使用。 |
| 复用技术基线 | [参考设计](../hardware/reference-designs/reference-designs.md) | 可复现的软硬件起点、其验证重点和可复用边界。 |
| 发布板级设计 | [面向量产的设计](../hardware/design-for-production.md) | 设计指南、检查清单、接口定义、经认可的元器件和官方 EDA 库。 |

</div>

## 本栏目涵盖的内容 { #what-this-section-covers }

需要了解现有系列及其主要能力差异时，请先阅读 [SF32 系列概览](family/SF32_family.md)。当你已经缩小到某个系列和封装时，可通过[命名规则](family/SF32_namingrule.md)解析完整料号。

当供电架构、封装、显示、音频、内存、GPIO、连接能力或专用硬件会决定选型时，请使用[SF32 产品选型工具](product-selector.md)。它用于建立候选清单；确切料号、封装、电气限制和板级布线要求仍必须根据相关的思澈科技（SiFli）文档确认。

选定方向后，继续进入[参考设计](../hardware/reference-designs/reference-designs.md)和[量产设计路径](../hardware/design-for-production.md)。这些内容将器件选型与参考硬件、设计指导、CAD 库、BOM 决策、评审检查清单以及启动调试记录衔接起来。

## 直接浏览硬件 { #browse-hardware-directly }

如果已经明确所需硬件类型，可直接进入相应目录：

- [芯片](family/SF32_family.md)：了解器件系列和选择料号。
- [模组](modules/SF32LB52-MOD-1.md)：围绕现成 RF 与核心硬件规划载板。
- [开发板](devkits/SF32LB52-DevKit-LCD.md)：使用受支持的硬件验证软件和外设。

硬件文档覆盖实体产品的实现路径。需要了解 SDK 配置、示例、工具链和软件平台支持时，请转到[开发](../develop/index.md)。
