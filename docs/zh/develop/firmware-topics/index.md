---
icon: lucide/blocks
description: "跨平台 SF32 固件主题总览：分区表、OTA/DFU、USB、电源管理与日志/崩溃分析。"
tags:
    - 开发
    - 固件
---

# 固件主题 { #firmware-topics }

这些主题适用于多个平台，涵盖将示例转化为产品所需的固件设计要点：启动布局、分区、OTA、USB、电源管理、日志和崩溃分析。

修改固件布局、升级行为或低功耗策略前，请先阅读这些页面。相关设置有误时，代码仍可能编译通过，但产品可能因此难以恢复、调试或发布。

## 主题 { #topics }

<div align="center"><em>表：固件主题</em></div>

<div align="center" markdown>

| 主题 | 重要性 |
|:-----|:-------|
| [分区表](partition-tables.md) | 定义固件、文件系统、OTA 和存储布局。 |
| [OTA 与 DFU](ota-dfu.md) | 现场升级和恢复方案的基础。 |
| [USB 与 CherryUSB](usb-cherryusb.md) | 说明 USB 设备/主机能力，而不仅是规格表中的接口条目。 |
| [电源管理](power-management.md) | 把可以运行的演示转化为适合电池供电的产品。 |
| [日志与崩溃分析](logging-crash-analysis.md) | 便于定位和分析故障。 |

</div>

## 实用原则 { #practical-rule }

修改启动、OTA、文件系统或存储行为之前，先弄清分区表并确认恢复路径。应用本身出故障固然麻烦；启动或升级布局配置错误，则可能让开发板难以恢复。

## 产品就绪检查表 { #product-readiness-checklist }

- [ ] 在常规 OTA 路径之外，另有一条经过测试的整机烧录命令可用。
- [ ] 分区布局已记录在产品仓库中。
- [ ] 已测试 OTA/DFU 失败时的行为。
- [ ] 如果使用 USB，已记录 USB 描述符以及 VID/PID 的归属。
- [ ] 已在真实硬件上测量各低功耗模式。
- [ ] 可以用已发布的二进制文件解码崩溃日志。
- [ ] 工厂烧录流程与开发者烧录流程相互分离。
