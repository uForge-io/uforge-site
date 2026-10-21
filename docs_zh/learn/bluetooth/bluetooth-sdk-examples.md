---
icon: lucide/bluetooth-connected
title: "蓝牙 SDK 示例"
description: "按 BLE 服务、经典蓝牙应用规范、手机互操作、OTA、数据传输或 LE Audio 广播选择合适的 SiFli-SDK 蓝牙示例。"
tags:
  - 蓝牙
  - 示例
---

# 蓝牙 SDK 示例 { #bluetooth-sdk-examples }

SiFli-SDK 的蓝牙（Bluetooth）示例针对特定蓝牙应用规范（Profile）、设备角色或无线通信流程提供验证起点，并非可直接用于产品的固件。应先选择覆盖产品最严苛技术要求的项目，在目标开发板上跑通未修改的示例，再逐项加入产品需求。

本文按工程任务整理 SF32LB58x 文档栏目中的[经典蓝牙](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/index.html)、[BLE](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/index.html)和 [LE Audio 广播](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/index.html)示例。URL 中的 `sf32lb58x` 表示文档归属，并不承诺每个示例都支持所有 SF32LB58x 开发板或其他 SF32 系列；`latest` 也是滚动版本。针对计划使用的 SDK 版本或提交，应查阅对应项目的“支持的平台”（Supported Platforms）一节，并严格采用其中列出的开发板名称和构建方式。如果没有明确资料能对应到目标开发板和 SDK 版本/提交，应将兼容性标记为“未确认”，不要根据 URL、相邻示例或名称相似的开发板推断。即使页面标注“全平台”，产品开发前仍应在实际 SDK 版本和板级配置下构建验证。项目页面还应作为 `menuconfig` 设置、测试设备和限制条件的依据。

## 从合适的蓝牙路径开始 { #start-with-the-right-bluetooth-path }

<div align="center"><em>表：蓝牙 SDK 示例选型</em></div>

<div align="center" markdown>

| 产品需求 | 建议起点 | 产品集成前应验证的内容 |
|:---------|:---------|:-------------------------|
| 自定义 BLE 服务或配套应用连接 | [BLE 外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html) | 广播、连接、服务接口约定、重连和手机端验证 |
| 设备需要作为外设端（Peripheral）连接手机，同时作为中心端（Central）连接传感器 | [BLE 中心端与外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html) | GAP 双角色并发，以及 GATT 客户端/服务器的职责划分 |
| 可靠的 BLE 数据传输 | [BLE 吞吐量](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html) 或 [BLE 文件传输](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html) | 所需的数据流、连接参数和恢复行为 |
| 通过蓝牙更新固件 | [支持 OTA 的外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html) 或 [中心端与外设端 Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | 升级时的角色分工、升级中断后的恢复、分区和回滚方案 |
| 经典蓝牙串口通信或通过手机接入网络 | [SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) 或 [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html) | 串口 Profile 或手机网络接入方式是否符合产品需求，以及对端兼容性和重连行为 |
| 通过 UART 连接 BT/BLE 主机与控制器 | [UART HCI 传输（BT/BLE）](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html) | 主机/控制器边界、UART 传输，以及目标控制器和板级配置 |
| 经典蓝牙音频或通话 | [音乐接收端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html)、[音乐发送端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) 或 [HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html) | 音频通路、时钟、缓冲、手机互操作性和功耗预算 |
| LE Audio 广播 | [BAP 广播发送端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) 或 [BAP 广播接收端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | 广播角色、音频处理链路、测试接收端或发送端，以及时序裕量 |

</div>

## 启动调试示例并留存证据 { #bring-up-an-example-as-evidence }

修改项目之前，应记录准确的 SDK 版本、开发板名称、配置、对端设备或应用、无线参数和预期日志。建议按以下步骤推进：

1. 按与实际 SDK 版本相对应的项目页面，使用其中列出的准确开发板名称和构建方式，构建并烧录未修改的示例。若无法确认文档与 SDK 版本的对应关系，或页面未明确目标板是否受支持，应先将兼容性标记为“未确认”，再考虑移植。
2. 验证示例的主要无线通信行为：发现、连接、传输、流式传输或接收。
3. 在复位、断连、重连和重新上电后重复测试。
4. 每次只加入一项产品专用服务、交互流程、音频通路或功耗策略。
5. 在产品的组合负载下复测，包括显示、传感器、存储、音频和低功耗状态切换。

成功运行的示例只能证明其覆盖的工作流程可行；不能据此认定产品的安全策略、通信距离、延迟（latency）、功耗或互操作性已达到发布要求。

## BLE 示例 { #ble-examples }

BLE 示例适用于配套应用连接、可互操作的 GATT 服务、信标、数据传输和基于 BLE 的 OTA。应先选择与产品设备角色匹配的示例；只有产品需要标准化服务时，再叠加对应的 Profile 示例。

<div align="center"><em>表：按工程任务划分的 BLE SDK 示例</em></div>

<div align="center" markdown>

| 工程任务 | 官方示例 | 应先验证的内容 |
|:---------|:---------|:-----------------|
| 基本角色与服务访问 | [外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral/README.html)、[中心端与外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral/README.html)、[多连接](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/multi_connection/README.html) | 广播、扫描、连接由哪一端负责管理，以及 Central/Peripheral 角色分工 |
| 手机生态集成 | [AMS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ams/README.html)、[ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs/README.html)、[双核 ANCS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/ancs_dualcore/README.html) | Apple 媒体或通知集成，以及所需的手机端配对流程 |
| 标准 GATT Profile | [BASC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/basc/README.html)、[CPPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cppc/README.html)、[CSCPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/cscpc/README.html)、[DISS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/diss/README.html)、[HRPC](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hrpc/README.html)、[CTS](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/tip_cts/README.html) | 服务角色、GATT 特征定义，以及标准 Profile 与对端设备的互操作性 |
| 人机输入与语音对讲 | [HID](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/hid/README.html)、[BLE 对讲](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/talkback/README.html) | 在加入产品 UI 或语音交互前，先验证交互模型 |
| 配对和重连行为 | [BLE 配对](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/pair/README.html) | 绑定信息、身份管理和产品的重新配对流程 |
| 广播与发现 | [iBeacon](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/iBeacon/README.html)、[周期广播](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv/README.html)、[周期广播同步](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/periodic_adv_sync/README.html) | 所需的广播或同步行为，而不假定必须建立 GATT 连接 |
| 数据传输和 OTA | [文件传输](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/file_transfer/README.html)、[吞吐量](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/throughput/README.html)、[支持 OTA 的外设端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/peripheral_with_ota/README.html)、[中心端与外设端 Pingpong OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/ble/central_and_peripheral_with_pingpong_ota/README.html) | 载荷、链路参数、更新角色、传输中断后的恢复和端到端验证 |

</div>

不能将吞吐量示例的测试结果直接当作产品数据速率。它还取决于所选 PHY、连接参数、对端行为、射频环境、主机侧（Host）活动和载荷模式。同样，ANCS 或 AMS 示例只是手机集成的基线，不能保证在所有 iOS 版本或用户授权状态下都具有相同行为。

## 经典蓝牙示例 { #classic-bluetooth-examples }

经典蓝牙项目适用于需要 BR/EDR Profile、音频、串口式传输或通过手机接入 IP 网络的产品。开发板上的演示成功只是起点；还应针对产品实际使用的对端设备和工作负载验证互操作性。

<div align="center"><em>表：按工程任务划分的经典蓝牙 SDK 示例</em></div>

<div align="center" markdown>

| 工程任务 | 官方示例 | 应先验证的内容 |
|:---------|:---------|:-----------------|
| 主机/控制器传输或经典蓝牙串口 Profile | [UART HCI 传输（BT/BLE）](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/HCI_over_uart/README.html)、[SPP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/spp/README.html) | HCI 的主机/控制器边界和 UART 传输，或 SPP 串口 Profile 的行为 |
| 音频流与媒体控制 | [A2DP 多连接](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_multi_connect/README.html)、[A2DP 共享](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/a2dp_sharing/README.html)、[AVRCP 封面图](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/avrcp_cover_art/README.html)、[音乐接收端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink/README.html)、[带转发的音乐接收端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_sink_with_relay/README.html)、[音乐发送端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/music_source/README.html) | 所需音源端/接收端拓扑、音频通路、媒体控制路径和资源预算 |
| 通话与语音链路 | [3-SCO](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/3sco/README.html)、[HFP](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp/README.html)、[HFP 转发](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/hfp_relay/README.html) | 通话拓扑、音频延迟、麦克风/扬声器通路和手机行为 |
| 通过手机联网与 OTA | [PAN](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan/README.html)、[PAN OTA](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/bt/pan_ota/README.html) | 手机网络共享、IP 流量、重连和 OTA 分发路径 |

</div>

关于 PAN 网络模型和手机端设置，请参阅[蓝牙 PAN](pan.md)。关于音频路由、缓冲区所有权和系统负载验证，请参阅[音频概览](../audio/overview.md)和[音频服务器与缓冲](../audio/audio-server-buffering.md)。

## LE Audio 广播示例 { #le-audio-broadcast-examples }

`sf32lb58x` 文档路径本身不能证明目标开发板受支持；应针对实际 SDK 版本和开发板查阅项目的“支持的平台”（Supported Platforms）一节。经典蓝牙与 BAP 广播桥接示例的 README 标题写的是发送端，路径和概述却描述接收端；[本次核查的 SDK 实现](https://github.com/OpenSiFli/SiFli-SDK/blob/121aa105565ee6bcbab6a15c1cb3b5571f5cc8e5/example/zbt/bap_broadcast_src_with_classic_bt/src/main.c)处理经典蓝牙 A2DP，并启动 BAP 广播发送端。这个结论仅适用于链接中的固定提交，不能直接推及 `latest` 文档所覆盖的其他 SDK 版本。构建前，应针对实际使用的 SDK 版本或提交核对 README、源代码和板级配置；不能依据复制过来的接收端描述判断角色或开发板支持情况。

`zbt` 项目提供基于 LE Audio [基础音频应用规范（Basic Audio Profile，BAP）](https://www.bluetooth.com/specifications/specs/basic-audio-profile-1-0-2/)的广播发送端（Source）和广播接收端（Sink）示例。应将发送端和接收端作为一组进行系统测试：广播配置、音频源、接收端、时钟和射频条件都会影响实际结果。

<div align="center"><em>表：LE Audio 广播 SDK 示例</em></div>

<div align="center" markdown>

| 产品方向 | 官方示例 | 应先验证的内容 |
|:---------|:---------|:-----------------|
| 接收广播音频流 | [BAP 广播接收端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_sink/README.html) | 接收端行为、输出音频通路和测试广播配置 |
| 发送广播音频流 | [BAP 广播发送端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src/README.html) | 发送端音频处理链路、广播配置和已验证的接收端 |
| 桥接经典蓝牙与 LE Audio 广播 | [经典蓝牙与 BAP 广播发送端](https://docs.sifli.com/projects/sdk/latest/sf32lb58x/example/zbt/bap_broadcast_src_with_classic_bt/README.html) | 经典蓝牙与 LE Audio 两个音频域、它们之间的交接边界，以及组合场景下的时序和资源裕量 |

</div>

## 示例之外的产品验证 { #product-validation-beyond-the-example }

<div align="center"><em>表：蓝牙示例产品化检查项</em></div>

<div align="center" markdown>

| 边界 | 保留示例已有的验证依据 | 为产品重新验证的内容 |
|:-----|:-------------------|:---------------------|
| 射频行为 | 支持的开发板，以及示例定义的角色或 Profile | 天线、外壳、距离、射频共存、对端设备和法规符合性测试计划 |
| 连接策略 | 基础广播、扫描或连接流程 | 产品延迟、功耗目标、重连策略和状态转换 |
| 安全 | 示例中的配对或绑定设置 | 身份验证要求、密钥存储、隐私、恢复出厂设置和用户恢复流程 |
| 数据与音频 | 已验证的数据包或音频流 | 数据格式与交互约定、错误恢复、延迟、缓冲、编解码配置和内存余量 |
| 证据 | 构建配置、日志和预期行为 | 可重复的手机/配件矩阵、功耗波形、断连恢复和回归测试 |

</div>

## 相关资源 { #related-resources }

- [蓝牙概览](overview.md)：了解产品级角色、Profile、安全、连接参数和共存决策。
- [蓝牙处理器架构](processor.md)：了解 Host/Controller 边界和功耗行为。
- [蓝牙 PAN](pan.md)：了解通过手机网络共享获得 IP 连接，以及基于 PAN 的 OTA。
- [音频 SDK 示例](../audio/audio-sdk-examples.md)：了解与蓝牙音频开发配合使用的本地采集、编解码和播放示例。
- [示例](../../develop/examples/index.md)：查看跨领域的 SDK 示例目录。
