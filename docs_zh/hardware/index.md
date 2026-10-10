---
icon: lucide/cpu
title: 硬件
description: 复用 SF32 参考设计，或基于选定器件开展设计，并为量产做好准备。
---

# 硬件 { #hardware }

确定 SF32 器件方案，并在开发板上验证基本软硬件配置后，你可以按本节指引设计电路板或模组载板，并为量产做好准备。有合适的参考设计时，可以先复用；随后依据所选器件的设计指南完成实现，整理验证证据和设计交付资料，开展量产就绪评审。

## 选择起点 { #choose-a-starting-point }

<div align="center"><em>硬件路径</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 你的任务 | 从这里开始 | 结果 |
|:---------|:-----------|:-----|
| 复用经过验证的软硬件基线 | [参考设计](reference-designs/reference-designs.md) | 可复现的设计起点、验证重点和复用边界。 |
| 不使用模组、直接围绕芯片设计电路板，或设计模组载板 | [查找匹配的设计指南](#find-a-guide) | 对应芯片或模组的实现指南，以及可用的检查清单。 |
| 按 M2 提案规划模组接口 | [M2 模组](m2-modules/interface-standards-overview.md) | M2 命名规则，以及需要针对所选模组核实的引脚接口草案。 |
| 准备 CAD 和 BOM 设计资料 | [CAD 与元器件](cad-components/components-and-cad-libraries.md) | 官方 EDA 库、AVL 资源，以及针对所选器件的核查项目。 |
| 准备设计交付包 | [面向量产的设计](design-for-production.md) | 量产就绪评审、需留存的证据和制造交接。 |

</div>

## 查找设计指南 { #find-a-guide }

先确定设计所用的芯片或模组，再查阅对应的设计资料。如果封装、供电方案、内存规格或集成方式尚未确定，可先阅读产品介绍页。

### 芯片指南和检查清单 { #chip-guides-and-checklists }

<div align="center"><em>表：芯片设计指南和检查清单</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 所选芯片系列 | 硬件设计指南 | 检查清单 | 适用场景 |
|:-------------|:-------------|:---------|:---------|
| SF32LB52x | [设计指南](chip-guides/SF32LB52x_hardware_design_guide.md) | [检查清单](chip-guides/SF32LB52x_hardware_design_guide.md#using-the-checklists) | 直接使用 SF32LB52x 芯片设计电路板，不使用模组。 |
| SF32LB55x | [设计指南](chip-guides/SF32LB55x_hardware_design_guide.md) | [检查清单](chip-guides/SF32LB55x_hardware_design_guide.md#using-the-checklists) | 直接使用 SF32LB55x 芯片设计电路板，不使用模组。 |
| SF32LB56x | [设计指南](chip-guides/SF32LB56x_hardware_design_guide.md) | [检查清单](chip-guides/SF32LB56x_hardware_design_guide.md#using-the-checklists) | 直接使用 SF32LB56x 芯片设计电路板，不使用模组。 |
| SF32LB57x | 设计指南 | 原理图 / PCB 布局 | 直接使用 SF32LB57x 芯片设计电路板，不使用模组。 |
| SF32LB58x | [设计指南](chip-guides/SF32LB58x_hardware_design_guide.md) | [检查清单](chip-guides/SF32LB58x_hardware_design_guide.md#using-the-checklists) | 直接使用 SF32LB58x 芯片设计电路板，不使用模组。 |

</div>

### 模组指南 { #module-guides }

<div align="center"><em>表：模组集成指南</em></div>

<div align="center" markdown style="max-width: 100%; overflow-x: auto;">

| 所选模组 | 模组指南 | 用途 |
|:---------|:---------|:-----|
| SF32LB52-MOD-1 | [模组指南](chip-guides/SF32LB52-MOD-1_hardware_design_guide.md) | 载板供电、引脚规划、天线净空，以及制造过程中的操作要求。 |
| SF32LB56-MOD | [模组指南](chip-guides/SF32LB56-MOD_hardware_design_guide.md) | 载板集成、供电、RF 电路布局、接口和验证。 |
| SF32LB58-MOD | [模组指南](chip-guides/SF32LB58-MOD_hardware_design_guide.md) | 载板供电、引脚规划、天线净空，以及制造过程中的操作要求。 |

</div>

## 按硬件路径推进 { #follow-the-hardware-path }

1. **条件适用时复用参考设计。** 先按原样复现参考设计注明的硬件和软件基线，再进行适配；如果没有合适的参考设计，就直接查阅所选器件的设计指南。
2. **实施并评审。** 绘制原理图前先查阅对应的设计指南；评审原理图和 PCB 布局时，再按指南中的检查清单逐项核查。冻结硬件前，先在最接近目标方案的[开发板](../sf32-products/index.md)上验证所需的软件和外设功能。开发板上的测试不能替代最终电路板上的供电、引脚功能和 RF 验证。
3. **载板拟采用 M2 提案时，查阅 M2 模组资料。** 确定模组接口前，先应用 [M2 接口命名规则](m2-modules/M2%20Interface%20Naming%20Rules.md)，并结合所选模组核对[接口定义](m2-modules/M2-interface-definition.md)；引脚级定义仍是草案。
4. **核实 CAD 资料和元器件选型。** 通过[CAD 与元器件](cad-components/components-and-cad-libraries.md)，针对具体器件型号核对原理图符号、PCB 封装、芯片封装尺寸图、AVL 和关键元器件的设计前提。
5. **完成量产发布评审。** 准备好设计证据、已批准的偏离项、遗留风险和量产测试假设后，进入[面向量产的设计](design-for-production.md)。

## 继续推进开发 { #stay-connected-to-the-platform-path }

如果尚未确定芯片、模组或开发板方案，请返回 [SF32 产品](../sf32-products/index.md)。如需建立可复现的工具链、烧录和串口日志环境，请参阅[入门指南](../getting-started/index.md)。需要了解必须与硬件配合验证的软件实现时，请继续阅读[开发](../develop/index.md)。
