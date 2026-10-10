---
icon: lucide/waypoints
description: "从 SF32LB52 开发板验证到自定义互联可穿戴产品硬件和固件发布计划的实用 SF32 参考设计路径。"
tags:
    - 硬件
    - 参考设计
---

# 互联可穿戴参考设计路径 { #connected-wearable-reference-design-journey }

本页为配备显示屏、BLE 和传感器、采用电池供电的紧凑型互联产品提供验证流程，并非已发布的原理图、BOM 或通过验证的参考板方案。设计自研硬件之前，你可以按此流程建立适合产品的软硬件基线，再逐项验证。

1. **选型并建立基线。** 参考[SF32 系列](../../sf32-products/family/SF32_family.md)和[SF32 产品选型工具](../../sf32-products/product-selector.md)，筛选适合产品的器件。在 [SF32LB52-DevKit-LCD](../../sf32-products/devkits/SF32LB52-DevKit-LCD.md) 或满足所需接口及硬件约束的现有开发板上运行 SiFli-SDK `hello_world`，记录开发板硬件版本、SDK 版本或提交标识、构建与烧录命令，以及串口日志。
2. **验证产品功能。** 使用[教程](../../getting-started/tutorials/overview.md)验证输入/传感器处理、BLE、简单 UI、必要时的存储，以及串口恢复路径。
3. **验证子系统协同工作。** 参考[图形](../../learn/graphics/overview.md)、[蓝牙](../../learn/bluetooth/overview.md)和[低功耗](../../learn/low-power/overview.md)，联合测试显示刷新、无线通信和睡眠/唤醒，检查它们之间的相互影响。
4. **准备自研硬件。** 从[面向量产的设计](../design-for-production.md)查阅所选芯片的设计指南和检查清单，核对显示、存储、电池、天线/RF、烧录及测试所需满足的条件。
5. **整理发布验证材料。** 归档开发板名称及硬件版本、SDK 版本或提交标识、已验证可用的固件镜像、日志、各场景的实测功耗及测试条件、恢复/OTA 行为、BOM 选型和检查清单结论。

演示成功不等于验证完成。构建、烧录和恢复流程必须能够重复执行，并有实测结果证明产品的关键子系统能在具有代表性的硬件上协同工作。每项功耗结果都应附上运行场景、供电电压和测量条件，便于其他工程师复现并比较。
